---
title: Sam UX Audit verification
description: Actual installation, integrity, browser and repository smoke checks with explicit limits.
---

The September 14, 2026 run used GPT-6 Astra in Codex. The authoring agent tested public URLs through the in-app browser. A separate agent performed read-only repository audits. This verifies bounded workflow behavior, not improvement over another model or a no-skill baseline.

| Target | Result |
| --- | --- |
| W3C inaccessible home-to-tickets demo | Found unnamed links, missing ticket-number text alternative, and missing semantic headings. |
| W3C corrected version | Recognized the selected corrections without claiming full WCAG conformance. |
| GOV.UK bank holidays | Exercised regional tabs with pointer and keyboard, then mobile in-page navigation. No blocking defect was reproduced in that scope. |
| TodoMVC JavaScript ES6 example | Found source-inferred keyboard-edit, naming, and retention risks with pinned citations. |
| Express | Recognized backend-only scope and reviewed a concrete developer onboarding ambiguity. |

The dependency tests cover installed tampering, manifest path drift, symlink rejection, unchanged frozen locks, restoration, and corrupted cache rejection. Skills CLI 1.5.24 selected the standalone skill from a clean source export. It was chosen under a seven-day release-age policy. Browser/device tools remain separately supplied by the host.

Read the [full recorded results](https://github.com/ThatGuySam/skills/blob/main/skills/sam-ux-audit/evals/results/2026-09-14/summary.md) and [replay instructions](https://github.com/ThatGuySam/skills/blob/main/skills/sam-ux-audit/evals/README.md).

## What remains unverified

There was no cross-model comparison, real-user study, private-site session, comprehensive screen-reader test, or field-performance measurement. The repository examples were not executed. Site and repository sources change; replay against a new snapshot and retain a new version receipt. A screenshot, source review, or passing install test alone does not establish a complete usability audit.
