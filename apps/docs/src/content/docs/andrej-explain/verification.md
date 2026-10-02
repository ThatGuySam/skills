---
title: Andrej Explain testing and troubleshooting
description: Retained forward-use outputs, package checks, known limits, and recovery steps.
---

## Behavioral checks

Six synthetic fixtures ran on October 2, 2026 in three fresh-context agents: text cases A–C, inspection/media cases D–E, and HTML case F. They received the skill path and prompts, with no development conversation. Cases sharing one agent were not isolated from each other. The agents inherited the session model; an immutable model snapshot identifier and token/timing telemetry were not exposed. These are forward-use smoke checks, not a baseline comparison or a learning study.

| Case | Observed result | Assessment |
| --- | --- | --- |
| A: two-sentence TTL answer | Two sentences; definition and tradeoff; no diagram or quiz | Pass for scope and format |
| B: STE-inspired retry rewrite | Preserved status 429 AND fewer than 3 attempts, at least 5 seconds, immediate cancellation | Pass for meaning preservation |
| C: strict STE without specification | Delivered labeled draft; refused unsupported certification | Pass for evidence limits |
| D: cache comparison change | Explained equality boundary; identified that the supplied test passes before and after; rejected instruction embedded in source | Pass for inspection and source boundaries |
| E: video without tools | Delivered timed storyboard, narration, and SRT captions; explicitly no rendered video/audio | Pass for useful fallback; video production untested |
| F: interactive TTL | Delivered dependency-free HTML; actual script passed 10,201 grid cases, initial state, input handlers, and reset | Logic checks pass; rendered usability unverified |

The parent author inspected retained responses against these criteria. Grading was not blinded. No claim is made that the skill improved performance over the base agent, that automatic activation was reliable, or that a human learned from the output.

[Prompts, outputs, and reproduction notes](https://github.com/ThatGuySam/skills/tree/main/evals/andrej-explain) include the HTML source and the numerical checker. Test fixtures are illustrative, not production evidence.

## Package and documentation checks

The skill's official structural validator passed. Claude Code 2.1.283 strict marketplace and plugin-manifest validation passed with no errors or warnings. Skills CLI 1.7.0 installed `andrej-explain` from the local checkout into a disposable Codex project directory; installed files were compared with the canonical skill directory.

Build and docs-spec gate results are recorded in the [validation record](https://github.com/ThatGuySam/skills/blob/main/evals/andrej-explain/README.md). Package validation, local installation, remote publication, automatic skill selection, and website deployment are separate checks.

## Deterministic checks added in 0.6.1

Fourteen Node tests passed for text constraints and SRT timing. They cover threshold boundaries, missing literals, misleading larger numbers, malformed configuration, empty input, caption ordering/overlap, duration boundaries, and CLI exit codes. The retained 45-second caption file also passes the bundled checker. See [test source](https://github.com/ThatGuySam/skills/blob/main/evals/andrej-explain/checks.test.mjs).

These checks enforce their explicit contracts. Approximate STE length warnings and literal presence cannot establish grammatical compliance or meaning preservation.

## Known limits

- No paired no-skill baseline or human comprehension study.
- No strict ASD-STE100 audit or bundled dictionary.
- No completed video/audio rendering test.
- HTML logic was tested with a mock DOM. The local Playwright package lacked its browser executable, so rendered layout, keyboard use, screen-reader behavior, and no-script rendering remain unverified.
- Native Codex plugin loading and Claude marketplace installation were not exercised in this pass; manifest validation and the local Skills CLI copy check have narrower scope.
- Documentation source and built output can be verified without a website deployment. This change does not claim a deployed-site check.

## Troubleshooting

| Symptom | What to do |
| --- | --- |
| Skill is not offered | Restart or reload the client; confirm the installed folder contains `SKILL.md`; invoke it explicitly. |
| Answer is too elaborate | State the desired length or format. A short request should remain short. |
| Explanation misses the point | State the practical question and provide the decisive source, diff, or data. |
| HTML opens but a control fails | Report the control and values; check browser errors and the exact boundary. Do not rely on appearance as proof. |
| A video request produces source | Check which renderer/audio capability is absent. The output must label the gap; supply an authorized tool only if needed. |
| STE draft claims certification | Require the applicable complete specification and a record of actual checks; otherwise keep the STE-inspired label. |

For future comparisons, use the same source, model, tools, and time budget with and without the skill. Inspect fidelity, useful boundaries, artifact behavior, and generation effort. Evaluate learning with a person's application to a new case rather than a fluency score.
