# Synthetic Requests

These invented fixtures test behavior; they are not real project evidence. The example.com URLs are supplied synthetic references, not verified live tracker pages. Evaluate each request independently with only `sams-status` installed and no network or tracker access.

## Review Phase

Use $sams-status for our current project. We are getting the Billing screen ready for review, not shipping to production. Navigation is Settings -> Billing -> Payment methods and Settings -> Billing -> Invoices; Account -> Profile is unrelated today.

- BILL-1, add card, Payment methods: ready for review on dev; https://example.com/issues/BILL-1
- BILL-2, remove card, Payment methods: implementation underway; https://example.com/issues/BILL-2
- BILL-3, invoice download, Invoices: no status supplied; https://example.com/issues/BILL-3
- ACCT-1, avatar upload, Profile: not started; https://example.com/issues/ACCT-1

We have no other sources available. Show where the work stands.

## Conflicting Sources and Missing Access

Use $sams-status. Current conversation phase is production delivery. The team uses Basecamp groups Launch and Operations; no product navigation is available. Sources are provided snapshots. Live tracker access is unavailable.

- Launch -> Checkout: SHIP-1 tracker snapshot says Done from a previous dev-review phase. A newer release note says production deployment failed and remains unresolved. https://example.com/issues/SHIP-1
- Launch -> Receipts: SHIP-2 tracker says In progress, but a newer release record says it reached production and passed CI. https://example.com/issues/SHIP-2
- Operations -> Backup policy: OPS-1 accepted and completed months ago, with no evidence of subsequent change. https://example.com/issues/OPS-1
- Operations -> Retention settings: OPS-2 has no owner response or status. https://example.com/issues/OPS-2

Focus on Launch. Then explain the stale markers and expand Operations.

## Pass Conditions

Check phase-relative Done, missing information as Needs Info, evidence-sensitive freshness, correct parent summaries including collapsed work, navigation-first or team-hierarchy fallback, three displayed levels without project root, source IDs with external links, and no source mutations. Unavailable access is a gap, not proof of no work. Freshness must not be assigned solely because a completed task is old.
