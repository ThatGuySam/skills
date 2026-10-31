---
title: Agent Verify verification
description: Packaging checks, the bounded old-versus-updated pilot, and remaining verification limits.
---

The October 30 publication checked packaging and receipt integrity. The October 31 update adds a bounded old-versus-updated behavioral pilot. Neither the structural checks nor the small pilot establish general reliability.

## What was checked

The optional receipt checker, `scripts/check_receipt.py`, was run against two synthetic fixtures:

| Fixture | Result |
| --- | --- |
| `valid-receipt.json`, pointing at a fixture artifact with its real SHA-256 hash | `receipt_valid: true`, exit `0` |
| `tampered-receipt.json`, same artifact with a corrupted hash | `artifact worker-output hash mismatch`, exit `1` |

This confirms the checker actually verifies artifact hashes rather than trusting a receipt's self-reported status — a structural guarantee, not a judgment of any skill's output quality. Replay it from [the evals directory](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/evals/README.md).

## October 31 behavioral pilot

The complete previous and updated runtime packages were compared using the frozen previous verification workflow. Four tasks received two repetitions per version, producing 16 verifier outputs. Three initially frozen tasks yielded six paired ties. A separately frozen, adaptively added experiment-design task yielded one tie and one updated-version win after bounded adjudication.

| Outcome | Previous | Updated |
|---|---:|---:|
| Outputs judged usable without material repair | 7/8 | 8/8 |

The updated version's one win supplied concrete grader-control fixtures where the old protocol left the operator to create them. Both versions handled the evidence-audit and executable representation-check tasks. The scoped verdict was **improved on tested cases**, limited to this protocol-completeness gain. This is not a percentage-quality or broad reliability claim.

Generation requested GPT-6.1 Terra with high reasoning; launches accepted that setting, but native executed-model telemetry and actual token/cost data were unavailable. Two blinded review orders were used for each stage, with constructed calibration controls. One adjudication resolved a targeted-versus-broader task-coverage disagreement as a tie and preserved the supported narrower-coverage argument. There was no model escalation or human preference calibration.

The study included exposed development diagnostics, an explicitly constructed representation control around a real report, and an adaptively selected design case. Raw source material and worker artifacts remain private and are not bundled here. Public readers cannot independently replay the behavioral study from this repository. See the [sanitized study record](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/evals/2026-10-31-comparison.md) for scope and limitations.

## Required Subagent Pilot

A separate bounded pilot explicitly loaded the revised skill in two fresh coordinators. Each spawned a fresh executor and independent QA. New-work verification passed its checked word-count requirements. The update comparison reported a comment-filtering gain together with a critical literal-text regression, yielding **mixed** and blocking candidate acceptance. See the [public synthetic fixtures and sanitized record](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/evals/2026-10-31-subagent-verification.md). This tests the two execution paths, not improvement over the previous verifier.

## Standalone Installation Check

A separate Codex CLI 0.166.0 process reproduced the HTMA-prefixed skill insertion before repair. After standalone copy installation, the same running selector inserted `$agent-verify` without a restart or model request. See the [installation regression record](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/evals/2026-10-31-installation.md). This result is limited to that runtime and process, not a guarantee for every already-open app.

## What remains unverified

There is no broad cross-model comparison, measured real-world time saving, calibration against independently submitted human preferences, automatic skill-selection test, or measurement of escalation accuracy. The actual proposed research experiment was not executed. Full native worker tool traces were unavailable. Treat the instructions as a workflow to apply and verify, rather than relying on this page as a guarantee.
