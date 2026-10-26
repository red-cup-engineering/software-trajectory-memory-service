# Customer acceptance memory receiving — 26 October 2026

## Original failure and source boundary

Base: `red-cup-engineering/software-trajectory-memory-service` at
`63affc14e293ea9137b7fa754e43d21e008b6448`. Its 15 original files were received
from that immutable GitHub revision and each file's Git blob identity matched.
The repository had no open issues or pull requests and only `main` when inspected.

Recipe induction accepted a verified proposal after the original customer
foldback, while recall excluded the same proposal unless its original
`promotable` flag was true. Thus a customer-accepted result could become a
deterministic recipe while disappearing from the next mission's experience.
Recall also omitted the originating trajectory and acceptance identifiers.

The package imported `semiotic-eavt-services-section/record-semantic-record`,
which is absent from the current SEAVT export map. The existing independent
`semantic-record-journal-service` owns the actual operation and requires
`charge: { support, refutation }`. The old `told` input was incompatible.

## Received change

Recall and induction share one reading of the original admitted customer
foldbacks. The reading checks original content identity and the proposal's
existing coordinates, recomputes the recipe from selected actions, and retains trajectory, local foldback record, customer
decision, original foldback, customer, supplier, candidate and time. It does
not authenticate an arbitrary submitted JSON record or turn an `Accept` label
into a source grant. Authentication remains the original host's responsibility.

The original mission producer at
[`software-mission-execution-service@4515e421ee26d8732b308d8ba30272137e852434`](https://github.com/red-cup-engineering/software-mission-execution-service/blob/4515e421ee26d8732b308d8ba30272137e852434/src/mission-runtime.mjs)
imports `trajectoryRecipeFingerprint` from this memory service's client and
uses it on `selected.actions` for both the proposal and outcome. Admission
and recall use that same existing recipe contract. Changing selected actions
while retaining the trajectory ID and proposal strings fails admission and
cannot reuse an already admitted acceptance. Trajectory IDs remain the
producer's original manifest IDs; the projected trajectory is not rehashed
as a foreign record type.

Different accepted recipes remain separately visible. Induction withholds
actions when they disagree and returns their original acceptance references.
Local promotability keeps its previous meaning without inventing a customer
receipt. Rejected or unverified work retains its existing refusal-memory path.
The mission's resolver and promotion reuse one result from its single journal
snapshot. The original journal remains the only custody owner.

## Exact local qualification

Toolchain: Node `24.22.1`, npm `11.9.0`, `tsx` `4.20.6`.
Package version `1.0.5` and its native lock were advanced together with
`npm version 1.0.5 --no-git-tag-version --ignore-scripts`. The original
repository manifest now pins identity `0.2.5` and journal `0.1.2`;
the regenerated native npm lock preserves their complete importer-relative
published dependencies. The journal itself selects identity `0.2.3` internally;
that legitimate separate dependency slot was not overwritten.

Verified direct archive SHA-256 values:

| Published supplier | SHA-256 |
| --- | --- |
| semantic-content-identify-service 0.2.5 | `71d93805a6ba7680933b2cafa857285b43014d95d8d7715d71adf89992a12676` |
| semantic-record-journal-service 0.1.2 | `e31f19d0f345864f14cb25c71eb6f1d852ee256a3f83a277936a1fb5c0af2a4e` |

Archive SHA-512 values were checked against the registry metadata before use.
These are exact published artifacts. Their metadata's historical gitHead was
not resolvable in the current split repositories, so no equality to current
GitHub source is asserted.

Commands received:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm run verify
git diff --check
```

The fresh frozen install received 31 packages. A second frozen install from
that verified npm cache received the same 31 packages after the version bump.
Verification executed **11 tests, 11 passed, 0 failed, 0 skipped, 0 cancelled**,
plus both source syntax checks. The two changed-actions regression tests were
first observed failing on the earlier implementation before the binding fix.
Cases cover accepted proposal reuse, original promotable behavior, rejected
and wrong-customer decisions, unverified outcomes, altered or mismatched
foldbacks, altered selected actions at admission and later reading,
incompatible accepted recipes, one snapshot, native journal charge
inputs, missing customer identity, and real journal append/reopen/recall.

Source SHA-256 at this receiving:

| File | SHA-256 |
| --- | --- |
| src/memory.mjs | `600f76a615eb8a21f269732c697a515528ef5ede7f3eb7668bddd601c4630d36` |
| test/customer-acceptance-memory.test.mjs | `34bdc458e546a06c3138f3beb282591d06ee46d5436e6dcf52e1e4371d2f1440` |
| package.json | `bd9775ee292859e31afc1c9e2ad2937e519dfc998d8ea15dd3786c3b728a7933` |
| package-lock.json | `45412fb2a66174275a58b2dfcd796bab2acd971dde11cfb3ddb29d647b31942e` |

## Runtime requirement and remaining receiving

An initial plain Node invocation stopped before test enrollment because the
published `json-codec-service@0.1.3` exports `.mts` files inside `node_modules`.
Node's built-in type stripping refuses that location. The declared standard
`tsx` loader executes those exact supplier bytes unchanged; the working test
script and CI use it. A production host using this published closure must
provide its supported loader. This does not prove a repaired supplier build.

This receipt establishes local source and real journal integration. It does
not establish release publication, installed mission-worker selection,
authenticated external customer delivery, bounty receipt, payment or revenue.
Those remain with the original source release, host, customer and payment
owners. The repair creates no new knowledge store or L-Space index.
