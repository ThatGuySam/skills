# Sam UX Audit Evals

These are small smoke evaluations, not a model leaderboard or usability study. The checked-in results record actual browser observations and an independent agent's source reviews on September 14, 2026.

## Replay

1. Install this skill, run `npm ci --ignore-scripts`, then `npm run skills:install` from its directory.
2. Run `npm test` for dependency restoration, integrity, manifest drift, symlink rejection, and cache-tampering checks.
3. Start a fresh agent session for the requests in [cases.json](cases.json), supplying the installed SKILL.md. Use approved browser tools for URLs and isolated read-only checkouts for repositories.
4. Record model, date, exact commit or page state, start/end preflight receipts, actions, screenshots/source citations, findings and limitations in a new results directory. Evaluate against the listed acceptance conditions. Do not overwrite the historical run.
5. Have a separate reviewer check evidence and unsupported claims. One convincing report is not proof that the skill improves a model over a no-skill baseline.

## Recorded Run

See [results](results/2026-09-14/summary.md). Browser cases were performed by the authoring agent using GPT-6 Astra and the Codex in-app browser. Repository cases were performed by an independent subagent inheriting that model. No cross-model comparison, real-user study, full assistive-technology test, or field-performance measurement was run.

Public page captures retain source attribution. W3C Citylights is an intentionally synthetic accessibility demonstration; its prices, dates, names and contact details are not real service data. GOV.UK content is Crown copyright and available under its Open Government Licence terms. Source snippets remain attributed to their repositories. Do not interpret these bounded findings as comprehensive audits of either organization.
