---
title: Verification and troubleshooting
description: Diagnose setup failures and distinguish installation checks from behavioral evidence.
---

Use this page when [setup](/sams-skill-creator/introduction/#2-restore-the-locked-methods) fails or you need to assess a validation report.

## Troubleshoot setup

| Symptom | Action | Check before continuing |
| --- | --- | --- |
| npm cannot find `package.json` or a script | Change to the installed creator directory. | Its manifest declares `skills:install` and `preflight`. |
| A source cannot be downloaded | Restore source access, then repeat `npm run skills:install`. | Run preflight after every install attempt; a failed install can leave partial sources. |
| Preflight reports content mismatch | Preserve changed files as evidence, then restore frozen sources with `npm run skills:install`. | Preflight returns `installed-content-verified`. Do not edit hashes to accept unexpected content. |
| A support reference is missing | Restore the complete locked set. | Preflight passes without substituting global skills. |
| Python reports `No module named 'yaml'` | Provide PyYAML in a task-local environment. | The named Codex validator runs. Alternate YAML parsing is a different check. |
| Freshness is `unknown` | Check source access and retain the dated result. | A locked run can remain reproducible while freshness is unknown. |
| The agent returns a plan without files | Restate the destination and acceptance check, then inspect the files. | The artifact exists and affected behavior has been tried or explicitly remains untested. |

Create a task-local validator environment outside locked source directories:

```sh
python3 -m venv /tmp/skill-creator-validation
/tmp/skill-creator-validation/bin/python -m pip install PyYAML==6.0.3
```

From the installed creator directory, validate a generated skill:

```sh
PYTHONDONTWRITEBYTECODE=1 /tmp/skill-creator-validation/bin/python \
  .runtime/skills/codex-creator/scripts/quick_validate.py \
  /absolute/path/to/generated-skill
```

Replace the last path with your generated skill directory. A successful structural check reports `Skill is valid!`. Keep trial outputs outside locked dependency directories.

## Recorded release evidence

The [October 12 evaluation record](https://github.com/ThatGuySam/skills/blob/main/skills/sams-skill-creator/evals/results.md) reports these checks:

| Check | Recorded outcome | Limit |
| --- | --- | --- |
| Three creator tasks and three matching baseline tasks | Both variants satisfied artifact assertions. | No demonstrated superiority, token saving, or latency improvement. |
| Structural validation | Creator and generated structures passed the named Codex validator. | Structure does not establish behavior. |
| Seven integrity tests | Passed receipt, tampering, local drift, missing source, missing reference, escaping symlink, and manifest mismatch cases. | Integrity does not establish instruction quality or freshness. |
| Clean-room public installation | Skills CLI 1.7.2 discovered the intended entrypoint and restored six dependencies. | Dated installation evidence. |

Automatic discovery through each runtime and generated skills acting on live business systems were not established. Description-only trigger judgments are proxies.

### November 5: Agent Verify step

The previous and new creator each ran the three acceptance cases once, with fresh Claude Code subagents. A fresh QA agent graded the actual files without knowing which version produced them. It also correctly failed two planted control runs.

| Case | Previous | With the Agent Verify step |
| --- | --- | --- |
| Create a skill | Fresh trials, but the author graded them and called the result validated | Fresh trials, separate QA, a caught and fixed defect, and the verdict "meets checked criteria" |
| Preferences skill | Same: graded by the author | Separate QA, a fix found by review, and a rerun |
| Review only | Ran an extra trial | Structural checks only, as the new step says |

Both versions passed all original acceptance assertions and side-effect checks. Verdict: **improved on tested cases** for independent verification, as a pilot with one run per cell.

The cost is time: the create case took about 45 minutes instead of 13. One QA agent left scratch files outside its run directory; the record names this as the next fix. See the [comparison record](https://github.com/ThatGuySam/skills/blob/main/skills/sams-skill-creator/evals/2026-11-05-agent-verify-step.md).

## Check a new skill before relying on it

Choose a representative task and a nearby request outside scope. Preserve raw inputs, the artifact, receipt, and observed results. Test helpers against real temporary fixtures, including a relevant failure.

The creator now runs [Agent Verify](/agent-verify/introduction/) on every created skill and every behavior-changing update. It compares against the previous skill, or against no skill only when added value is the claim. Report unavailable telemetry and missing execution as gaps.

See [validation choices](https://github.com/ThatGuySam/skills/blob/main/skills/sams-skill-creator/references/validation.md) for the canonical guidance.
