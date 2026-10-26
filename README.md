# software-trajectory-memory-service

<!-- 561-group-standards:badges:start -->
[![Red Cup Engineering](https://img.shields.io/badge/561%20Group-Red%20Cup%20Engineering-c0392b)](https://github.com/red-cup-engineering)
[![License: MIT](https://img.shields.io/badge/license-MIT-c0392b)](LICENSE)
[![Indigenous data: CARE](https://img.shields.io/badge/Indigenous%20data-CARE-4b6f44)](https://github.com/red-cup-engineering/.github/blob/main/GOVERNANCE.md)
[![Tips welcome](https://img.shields.io/badge/tips-welcome-d4a017)](https://github.com/561-group/.github/blob/main/TIPS.md)
<!-- 561-group-standards:badges:end -->

Sovereign stateful die for the append, recall, induction, and customer foldback ports of software trajectory memory.

## Customer acceptance and reusable experience

The original `admitCustomerTrajectoryFoldback` boundary binds an authenticated
customer's accepted decision to one verified proposal-only supplier trajectory.
The caller owns authentication and supplies the expected customer and supplier;
a content hash or an ActivityStreams `Accept` label does not authenticate them.
The existing semantic-record journal owns storage and independent support and
refutation charges. Its public package is `semantic-record-journal-service`;
the retired SEAVT `record-semantic-record` export is not a journal provider.

Recall and deterministic recipe induction now use the same admitted foldback
reading. A verified proposal becomes useful memory after its customer accepts
it, even when the original proposal remains `promotable: false`. Each recalled
success retains its original trajectory ID and its `customerAcceptances`
(record, decision, foldback, customer, supplier, candidate and acceptance time).
The existing directly promotable trajectory path remains available and carries
an empty customer-acceptance list unless an actual receipt exists.
Both admission and later reads recompute the selected actions' recipe using
the same `trajectoryRecipeFingerprint` exported to the mission producer.
Changed actions cannot inherit acceptance by keeping old proposal strings.

Opposing accepted recipes remain separate remembered experiences. Induction
withholds executable actions when there is no unique accepted recipe and
retains the original customer receipt references for review. Local test success,
unaccepted proposals, rejected decisions, unverified trajectories and malformed
or mismatched foldback records do not create customer acceptance. These are
source-qualified experience readings, not a general truth or payment ledger.

`rows` and injected `journal` inputs are trusted, already-admitted memory-owner
snapshots for composing and testing the existing service; they are not public
customer-submission interfaces. Keep transport authentication at the original
host and use the foldback admission boundary before appending customer evidence.

Run `npm ci --ignore-scripts --no-audit --no-fund` followed by `npm run verify`.
The standalone manifest and native npm lock select the verified published
identity provider 0.2.5 and semantic-record journal 0.1.2. The scoped registry
configuration uses the existing Group registry; public development tools use
their original npm registry.
The test command uses the declared `tsx` loader for published suppliers that
export TypeScript source; it runs the eleven named cases, including real journal
append/reopen/recall, without replacing their implementation.
Plain Node cannot type-strip those suppliers from inside `node_modules`.
Production hosts consuming that published closure must provide their supported
TypeScript loader as well. The tests use Node 24 and `tsx` 4.20.6; source and
local integration qualification do not establish an installed production host.
