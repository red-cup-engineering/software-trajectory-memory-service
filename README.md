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

Run `npm ci --ignore-scripts` and `npm run verify` from the package root.
The lockfile selects the published identity and journal providers. The native
suite runs in Node with the installed dependency closure and exercises actual
journal append, reopen, recall and independent support and refutation charges.
Package qualification repeats the suite against the packed service and imports
its declared entry points.
