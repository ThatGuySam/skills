---
title: Agent Verify verification
description: What has actually been checked about this skill's packaging, and what remains unverified.
---

This publication moved Agent Verify's working instructions into this repository unchanged and added its documentation and distribution metadata. It is a packaging and docs migration, not a new behavioral audit of the skill's own judgment — the honest state to report is what that migration actually checked.

## What was checked

The optional receipt checker, `scripts/check_receipt.py`, was run against two synthetic fixtures:

| Fixture | Result |
| --- | --- |
| `valid-receipt.json`, pointing at a fixture artifact with its real SHA-256 hash | `receipt_valid: true`, exit `0` |
| `tampered-receipt.json`, same artifact with a corrupted hash | `artifact worker-output hash mismatch`, exit `1` |

This confirms the checker actually verifies artifact hashes rather than trusting a receipt's self-reported status — a structural guarantee, not a judgment of any skill's output quality. Replay it from [the evals directory](https://github.com/ThatGuySam/skills/blob/main/skills/agent-verify/evals/README.md).

## What remains unverified

No fresh multi-agent trial of Agent Verify's own verify/compare/progressive-audit workflow accompanied this publication — doing so would itself require the coordinator/worker/QA dispatch the skill describes, which is outside the scope of a packaging change. There is no cross-model comparison, no calibration of its QA role against independently labeled cases, and no measurement of escalation accuracy in the progressive-audit ladder. Treat its guidance as instructions to follow, and verify its output the way the skill itself prescribes: with fresh, blinded QA against the actual artifact, not against this page.
