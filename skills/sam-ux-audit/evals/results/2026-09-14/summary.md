# Sam UX Audit Smoke Results

Run date: September 14, 2026. Model: GPT-6 Astra in Codex. Website cases were performed by the authoring agent with real browser access; repository cases used a separate agent inheriting the same model. These are bounded workflow checks, not controlled benchmarks.

| Case | Result | What the Run Established |
| --- | --- | --- |
| W3C inaccessible home and tickets | Passed with limits | Reported unnamed navigation, missing ticket-number text alternative, and missing semantic headings using captured evidence. |
| W3C corrected home and tickets | Passed with limits | Recognized corrected navigation, text and headings; did not claim full conformance. |
| GOV.UK bank holidays | Passed with limits | Regional tab selection and keyboard switching worked; mobile contents link reached the intended region without horizontal overflow. No blocking defect invented. |
| TodoMVC JavaScript ES6 source | Passed with runtime limits | Identified source risks in keyboard editing, names and retention with pinned file citations. |
| Express source | Passed | Recognized backend scope; reviewed documentation clarity without inventing a frontend audit. |

Reports: [websites](web-report.md), [TodoMVC](repos/todomvc-report.md), [Express](repos/express-report.md), and [independent repository outcomes](repos/evaluation-results.json). Captures and receipts are adjacent to the reports. W3C Citylights is an intentionally synthetic demonstration.

## Checks and Limitations

The dependency test suite passed installed tampering, manifest drift, symlink rejection, frozen restoration from cached sources, unchanged lock bytes, and cache tampering rejection. A separate Skills CLI 1.5.24 installation selected only Sam UX Audit from a clean source export. Its first dependency install restored all five locked upstream packages from empty caches, and both integrity tests passed in that independent installation. Version 1.5.24 was chosen because later releases had not met the local seven-day release-age policy.

The initial local-source install included ignored runtime files because the Skills CLI copies a local working folder. That was not accepted as a clean-room result. The replacement test exported only publishable source files; generated dependencies and caches remain excluded from Git publication.

No blinded comparison, no-skill baseline, Anthropic run, full screen-reader test, field-performance measurement, private-site login or target-code fix was performed. Source findings need browser reproduction before being presented as runtime failures. The smoke results show that this version can follow the intended audit workflow on these cases; they do not establish universal accuracy or superiority.

Publication checks: Skill Creator validation passed; Codex plugin schema validation passed using the bundled strict-field validator. The installed Codex CLI lacks `plugin validate`, so that obsolete command was not counted as a pass. The docs build passed after the verification page was added.

The release applies one trailing-blank-line cleanup to the bundled grounding reference after the smoke run. Historical start/end receipts remain unchanged; `release-versions.json` records the final package fingerprints. AX captures are JSON-wrapped without changing their text, with a SHA-256 of the captured string.
