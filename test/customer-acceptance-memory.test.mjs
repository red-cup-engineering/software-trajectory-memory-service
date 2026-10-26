import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { createSemanticRecordJournal } from "@red-cup-engineering/semantic-record-journal-service";
import { EMPTY_WITNESS_ROOT, identifyJsonSemanticContent } from "@red-cup-engineering/semantic-content-identify-service";
import {
  admitCustomerTrajectoryFoldback,
  appendTrajectoryRecord,
  deriveInducedTrajectoryResolver,
  missionMemoryContext,
  recallTrajectories,
  trajectoryFingerprint,
  trajectoryRecipeFingerprint,
  MISSION_EXECUTION_ACTOR,
} from "../src/memory.mjs";

const CUSTOMER = "urn:test:software-customer";
const SUPPLIER = "urn:test:software-supplier";
const TASK_CLASS = "repair-source-contract";
const OBJECTIVE = "repair software contract";
const AT = "2026-10-26T15:00:00.000Z";
const identify = body => Object.freeze({
  id: identifyJsonSemanticContent({
    objectKind: "software-trajectory-memory.record", value: body, witnessRoot: EMPTY_WITNESS_ROOT,
  }).id,
  ...body,
});

function trajectory(name, { verified = true, promotable = false, replacement = "correct" } = {}) {
  const selectedActions = [{ action: "edit", args: { path: "src/contract.mjs", replacement } }];
  const shape = trajectoryFingerprint(selectedActions), recipe = trajectoryRecipeFingerprint(selectedActions);
  return {
    type: "SoftwareMissionTrajectory", id: "urn:test:trajectory:" + name,
    missionId: "urn:test:mission:" + name, objective: OBJECTIVE, taskClass: TASK_CLASS,
    finishedAt: AT,
    outcome: {
      verified, promotable, changedPaths: ["src/contract.mjs"], summary: name,
      selectedActions,
      trajectoryFingerprint: shape,
      trajectoryRecipeFingerprint: recipe,
      proposal: {
        proposalOnly: true, customerMutation: false,
        trajectoryFingerprint: shape,
        trajectoryRecipeFingerprint: recipe,
      },
    },
    metrics: { inferenceContacts: 1, usefulCompletions: verified ? 1 : 0 },
    processNode: verified ? null : { refusal: { type: "source-unavailable", reason: "no admitted source" }, providers: [] },
  };
}

function acceptance(row, { accepted = true, actor = CUSTOMER } = {}) {
  const foldback = identify({
    type: "ImprovementFoldback", customer: CUSTOMER, supplier: SUPPLIER,
    candidate: "urn:test:candidate:" + row.id, acceptedAt: AT, customerReplay: { verified: true },
    routePolicy: "enterprise-memory-pulse-only",
    route: {
      executionProvider: MISSION_EXECUTION_ACTOR, supplierTrajectory: row.id,
      trajectoryFingerprint: row.outcome.proposal.trajectoryFingerprint,
      trajectoryRecipeFingerprint: row.outcome.proposal.trajectoryRecipeFingerprint,
    },
  });
  const decision = identify({
    type: "ImprovementCustomerDecision", customer: CUSTOMER, supplier: SUPPLIER,
    accepted, candidate: foldback.candidate, foldback: foldback.id, foldbackSnapshot: foldback,
  });
  return { "@context": "https://www.w3.org/ns/activitystreams", type: "Accept", actor, target: SUPPLIER, object: decision };
}

async function admit(row, rows = [row]) {
  const activity = acceptance(row);
  let recorded;
  const result = await admitCustomerTrajectoryFoldback(activity, {
    expectedCustomer: CUSTOMER, expectedSupplier: SUPPLIER, rows,
    append: async (record, at) => { assert.equal(at, AT); recorded = record; },
  });
  assert.equal(result.status, "admitted");
  assert.strictEqual(result.record, recorded);
  return { record: recorded, activity };
}

test("the original admitted customer foldback makes a verified proposal available to both recall and induction", async () => {
  const row = trajectory("accepted");
  assert.deepEqual(await recallTrajectories(OBJECTIVE, { taskClass: TASK_CLASS, rows: [row] }), []);
  assert.equal(deriveInducedTrajectoryResolver([row], TASK_CLASS).eligible, false);
  const { record, activity } = await admit(row);
  const rows = [row, record];
  const memories = await recallTrajectories(OBJECTIVE, { taskClass: TASK_CLASS, rows });
  const resolver = deriveInducedTrajectoryResolver(rows, TASK_CLASS);
  assert.equal(memories.length, 1);
  assert.equal(memories[0].trajectory, row.id);
  assert.deepEqual(memories[0].verifiedActions, row.outcome.selectedActions);
  assert.deepEqual(memories[0].customerAcceptances, [{
    record: record.id, decision: activity.object.id, foldback: activity.object.foldback,
    customer: CUSTOMER, supplier: SUPPLIER, candidate: activity.object.candidate, acceptedAt: AT,
  }]);
  assert.equal(resolver.eligible, true);
  assert.deepEqual(resolver.witnesses, [row.id]);
  assert.deepEqual(resolver.customerAcceptances, [{
    trajectory: row.id, ...memories[0].customerAcceptances[0],
  }]);
});

test("the existing promotable trajectory path stays useful without inventing a customer receipt", async () => {
  const row = trajectory("promotable", { promotable: true });
  const memories = await recallTrajectories(OBJECTIVE, { rows: [row] });
  assert.equal(memories.length, 1);
  assert.equal(memories[0].trajectory, row.id);
  assert.deepEqual(memories[0].customerAcceptances, []);
  assert.equal(deriveInducedTrajectoryResolver([row], TASK_CLASS).eligible, true);
});

test("unaccepted, rejected, wrong-customer and unverified work cannot become a learned success", async () => {
  const row = trajectory("unaccepted");
  for (const activity of [
    acceptance(row, { accepted: false }), acceptance(row, { actor: "urn:test:another-customer" }),
    { ...acceptance(row), type: "Reject" },
  ]) {
    let appends = 0;
    await assert.rejects(admitCustomerTrajectoryFoldback(activity, {
      expectedCustomer: CUSTOMER, expectedSupplier: SUPPLIER, rows: [row],
      append: async () => { appends += 1; },
    }), /customer-authored accepted/);
    assert.equal(appends, 0);
  }
  const failed = trajectory("failed", { verified: false });
  await assert.rejects(admit(failed), /verified proposal-only/);
  const memories = await recallTrajectories(OBJECTIVE, { rows: [row, failed] });
  assert.equal(memories.length, 1);
  assert.equal(memories[0].type, "SoftwareTrajectoryResidueKnowledge");
  assert.deepEqual(memories[0].witnesses, [failed.id]);
  assert.equal(deriveInducedTrajectoryResolver([row, failed], TASK_CLASS).eligible, false);
});

test("an admitted-looking label or a foldback for different proposal coordinates is not acceptance evidence", async () => {
  const row = trajectory("bound");
  const { record } = await admit(row);
  for (const misleading of [
    { type: record.type, trajectory: row.id },
    { ...record, trajectoryRecipeFingerprint: "urn:test:unrelated-recipe" },
    { ...record, customerDecision: "urn:test:changed-decision" },
  ]) {
    const rows = [row, misleading];
    assert.deepEqual(await recallTrajectories(OBJECTIVE, { rows }), []);
    assert.equal(deriveInducedTrajectoryResolver(rows, TASK_CLASS).eligible, false);
  }
});

test("changed actions cannot inherit an admitted recipe's customer acceptance", async () => {
  const row = trajectory("changed-after-acceptance");
  const { record } = await admit(row);
  const changed = {
    ...row,
    outcome: { ...row.outcome, selectedActions: [{ action: "edit", args: { path: "src/contract.mjs", replacement: "unaccepted" } }] },
  };
  assert.equal(changed.id, row.id);
  assert.strictEqual(changed.outcome.proposal, row.outcome.proposal);
  const rows = [changed, record];
  assert.deepEqual(await recallTrajectories(OBJECTIVE, { rows }), []);
  const resolver = deriveInducedTrajectoryResolver(rows, TASK_CLASS);
  assert.equal(resolver.eligible, false);
  assert.deepEqual(resolver.actions, []);
  assert.deepEqual(resolver.customerAcceptances, []);
  const context = await missionMemoryContext(OBJECTIVE, TASK_CLASS, row.missionId, "urn:test:source", {
    journal: { query: () => rows.map(record => ({ record })) },
  });
  assert.deepEqual(context.memories, []);
  assert.equal(context.resolver.eligible, false);
});

test("foldback admission rejects selected actions that differ from the customer's accepted recipe", async () => {
  const row = trajectory("changed-before-acceptance");
  const changed = {
    ...row,
    outcome: { ...row.outcome, selectedActions: [{ action: "edit", args: { path: "src/contract.mjs", replacement: "unaccepted" } }] },
  };
  await assert.rejects(admitCustomerTrajectoryFoldback(acceptance(row), {
    expectedCustomer: CUSTOMER, expectedSupplier: SUPPLIER, rows: [changed],
    append: async () => assert.fail("must not append an acceptance for different actions"),
  }), /verified proposal-only/);
});

test("two accepted incompatible recipes retain their sources while refusing deterministic promotion", async () => {
  const one = trajectory("one", { replacement: "one" });
  const two = trajectory("two", { replacement: "two" });
  const first = await admit(one), second = await admit(two);
  const rows = [one, first.record, two, second.record];
  const memories = await recallTrajectories(OBJECTIVE, { rows });
  assert.equal(memories.length, 2);
  assert.deepEqual(new Set(memories.map(value => value.trajectory)), new Set([one.id, two.id]));
  const resolver = deriveInducedTrajectoryResolver(rows, TASK_CLASS);
  assert.equal(resolver.eligible, false);
  assert.deepEqual(resolver.actions, []);
  assert.equal(resolver.customerAcceptances.length, 2);
  assert.deepEqual(new Set(resolver.customerAcceptances.map(value => value.record)),
    new Set([first.record.id, second.record.id]));
});

test("one native category read supplies the mission checkpoint, recall, resolver and promotion", async () => {
  const row = trajectory("mission");
  const { record } = await admit(row);
  let reads = 0;
  const result = await missionMemoryContext(OBJECTIVE, TASK_CLASS, row.missionId, "urn:test:source", {
    journal: { query: ({ category }) => {
      assert.equal(category, "software-trajectory-memory.transition"); reads += 1;
      return [row, record].map(record => ({ record }));
    } },
  });
  assert.equal(reads, 1);
  assert.equal(result.memories[0].trajectory, row.id);
  assert.strictEqual(result.resolver, result.promotion);
  assert.equal(result.resolver.eligible, true);
});

test("the existing journal receives independent support/refutation through its current charge contract", async () => {
  for (const verified of [true, false]) {
    const row = trajectory("journal-" + verified, { verified });
    let input;
    const result = await appendTrajectoryRecord(row, AT, {
      journal: { record: value => { input = value; return { id: "urn:test:journal-receipt" }; } },
    });
    assert.deepEqual(input.charge, { support: verified, refutation: !verified });
    assert.equal(Object.hasOwn(input, "told"), false);
    assert.equal(input.record, row);
    assert.equal(input.recordedAt, AT);
    assert.equal(result.documentNi, "urn:test:journal-receipt");
  }
});

test("foldback admission requires a nonempty expected customer as well as supplier", async () => {
  const row = trajectory("customer-bound");
  const activity = acceptance(row);
  await assert.rejects(admitCustomerTrajectoryFoldback(activity, {
    expectedSupplier: SUPPLIER, rows: [row], append: async () => assert.fail("must not append"),
  }), /customer-authored accepted/);
});

test("the real journal appends, reopens and recalls a customer-accepted proposal through the public service", async () => {
  const dataRoot = mkdtempSync(join(tmpdir(), "trajectory-memory-receiving-"));
  try {
    const row = trajectory("durable");
    await appendTrajectoryRecord(row, AT, { dataRoot });
    const admitted = await admitCustomerTrajectoryFoldback(acceptance(row), {
      expectedCustomer: CUSTOMER, expectedSupplier: SUPPLIER, dataRoot,
    });
    assert.equal(admitted.status, "admitted");
    const memories = await recallTrajectories(OBJECTIVE, { taskClass: TASK_CLASS, dataRoot });
    assert.equal(memories.length, 1);
    assert.equal(memories[0].trajectory, row.id);
    assert.equal(memories[0].customerAcceptances[0].record, admitted.record.id);
    const failed = trajectory("durable-failed", { verified: false });
    await appendTrajectoryRecord(failed, AT, { dataRoot });
    const journal = createSemanticRecordJournal({ root: dataRoot, objectKind: "software-trajectory-memory.record" });
    assert.equal(journal.query({ category: "software-trajectory-memory.transition" }).length, 3);
    assert.ok(journal.claims().some(claim => claim.a === "charge:support"));
    assert.ok(journal.claims().some(claim => claim.a === "charge:refutation"));
  } finally {
    rmSync(dataRoot, { recursive: true, force: true });
  }
});
