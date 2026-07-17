---
title: Skill and instruction system audit — 2026-07-17
description: A full custom-skill and instruction review found a healthy structure but eight contract-level improvement areas; HTMA data integrity was fixed first.
sidebar:
  badge:
    text: Research
    variant: tip
---

- `Tease:` The structure is healthy; the remaining risk lives in behavioral contracts.
- `Lede:` A Zach Prompting review of the custom skill system found eight focused improvement areas. The first fix makes HTMA value-of-information and calibration tooling fail closed instead of manufacturing decision-looking conclusions from missing or insufficient data.
- `Why it matters:`
  - Valid frontmatter and links do not prevent unsafe defaults, stale runtime assumptions, or unclear authority boundaries.
  - A deterministic before/after check now protects the highest-priority data-integrity behavior.
- `Go deeper:`
  - Review the eight findings below.
  - Compare the measured before/after behavior.
  - Follow the remaining sequence on the [roadmap](/project/roadmap/).

**Checked:** 2026-07-17

**Method:** Static inventory, direct source inspection, runtime-topology checks, focused script execution, and a fresh-context verification pass.
**Scope:** 123 custom or repository-packaged skills; 23 scoped and root agent-instruction files; the active Claude, Cursor, and Codex instruction bridges; and managed skill installation topology.

## What was already strong

- All 123 skill frontmatter blocks parsed and supplied a name and description.
- No genuine broken relative skill links remained after illustrative code and dynamic paths were excluded.
- The managed-link check passed all 49 registered packages.
- The strongest governing contracts—no fabricated data, durable evidence, narrow validation, sensitive-data handling, and protected-skill ownership—are worth preserving.

These checks establish structural health. They do not prove that every instruction produces the intended behavior.

## Findings

| Priority | Contract area | Finding | Disposition |
| ---: | --- | --- | --- |
| 1 | Data integrity | HTMA helper scripts substituted numerical defaults, interpreted one calibration observation, shipped realistic-looking seed rows, and omitted required memo status fields. | Fixed first; evidence below. |
| 2 | Authority | Some wrappers treated chat, ticket, PR, push, and account changes as implicitly authorized. | Route through explicit task-scoped authorization and owned bridges. |
| 3 | Runtime discovery | Instructions named unavailable models, stale tool semantics, and a missing commit-workflow skill. | Discover current capabilities and keep supported fallbacks. |
| 4 | Toolchain precedence | A generic Bun rule conflicted with applications that declare pnpm, Vite, Vitest, or `dotenvx` workflows. | Defer to the nearest app contract; keep Bun as an unopinionated default. |
| 5 | Docs verification | Content checks were described as broader than they are, while live authentication and secret-transfer behavior lacked a separate proof contract. | Split local preflight from live verification and secure secret handling. |
| 6 | Internal consistency | Some output shapes contradicted their validators; other instructions promised secret safety while reading complete configuration files. | Keep one rule per behavior and fail closed around secrets. |
| 7 | Skill routing | Production and experimental HTMA families had indistinguishable triggers; several research skills overlapped. | Make experiments explicit-only and add positive plus negative trigger boundaries. |
| 8 | Scoped freshness and topology | Several dated instructions, cwd assumptions, canonical-source claims, and runtime links had drifted. | Refresh scoped facts and record ownership for every custom package. |

The public memo intentionally omits private workspace paths, sensitive context, and protected third-party source details. Protected packages are integration targets, not direct edit targets.

## First fix: HTMA data integrity

The before/after checks use explicitly synthetic fixtures. The values below are observed program output, not real estimates or calibration evidence.

| Case | Before | After |
| --- | --- | --- |
| Structured VOI item with only a synthetic name | Exited `0`, silently produced expected value `0.25`, invented a measurement, and recommended `measure now`. | Exits `2`, keeps expected value `unknown`, and names the missing measurement, decision-change chance or sensitivity, cost of being wrong, information quality, and measurement cost. |
| One synthetic calibration observation | Reported that coverage was “broadly consistent” with stated confidence. | Reports `insufficient_history` and descriptive counts only. Pattern interpretation begins at five comparable estimates by default. |
| VOI and calibration CSV templates | Included plausible-looking example rows that could be mistaken for observations. | Contain headers only. |
| Measurement memo template | Omitted `estimate_status`, `blocking_missing_inputs`, `assumed_target`, and `next_measurement_step` despite requiring them in the skill contract. | Includes all four fields in both production and experimental templates. |

The five-estimate calibration threshold is an operational guardrail against single-case conclusions. It is not presented as proof of statistical power, and callers can raise it when the decision requires more history.

## Verification

The private canonical workspace contains a deterministic regression that checks both production and experimental HTMA packages. That validator and the experimental companion packages are not bundled in this public repository. The recorded run verifies missing-input behavior, a complete synthetic VOI calculation, the calibration sample gate, header-only templates, and all required memo fields.

```text
python3 scripts/check-htma-data-integrity.py
OK: HTMA data-integrity checks passed
```

Public readers can inspect the shipped HTMA Measure contract and documentation here; reproducing the cross-family helper test requires the canonical workspace artifacts named above.

The public HTMA Measure contract now states the same fail-closed rule: missing VOI inputs remain unknown or explicitly qualitative; they never become numerical assumptions.

## Limits

- The audit did not modify protected third-party packages; their fixes belong in owned bridges or upstream patches.
- Structural checks and deterministic helper tests do not replace representative model evaluations.
- Only the first improvement area is implemented here. The remaining ordered work stays visible on the [roadmap](/project/roadmap/).
