---
title: Activity Monitor Verification
description: Synthetic diagnostic trials, independent QA, and the limits of the comparative evidence.
---

## Checked behavior

On November 5, 2026, fresh Codex subagents produced twenty responses across nine clearly labeled synthetic macOS captures. Nine matched pairs used the same request and input, with or without the skill; two additional responses exercised the revised package on periodic VM and file-backed pageout cases.

The cases cover quiet cached memory, build CPU contention, active swapping, thermal protection, scarce storage capacity, unrelated network activity, permission failures, periodic VM event counts, and pageouts without new swap traffic. The cases are constructed challenges, not a representative frequency sample or measurements of a user's computer.

## Comparative evidence

Independent QA accepted the first four pairs as substantive ties. On a separate five-pair review, it found two baseline time-scope errors: answers treated iostat's initial since-boot report as an earlier current rate. Skill outputs preserved that distinction. The main diagnoses and safe actions were sound on both sides. This is a narrow measurement-fidelity gain, not a claim of general expert-level diagnosis or statistical significance.

The final package adds explicit CPU and memory sorting, serial-window limits, periodic vm_stat semantics, Pageouts versus Swapouts, and filesystem-wait interpretation. The sorting concern from document review was not reproduced as a current-host defect; explicit sorting removes ambiguity.

## Replay evaluation, November 8–9, 2026

A real freeze-and-recovery session on the maintainer's Mac was turned into a replay: agents received the user's original requests and a command that answers only from data recorded on that Mac that evening, including the process table, unified log, DiagnosticReports, and a privileged sample. Commands that were not recorded say so; nothing is synthesized. Four cases covered apps frozen after wake, busy efficiency cores, finding the process that leaked helpers while its state changed, and checking whether a daemon restart would hold. The recorded data contains private details, so the fixture and cases are kept outside this repository.

Claude Sonnet 5.5 and GPT-6-Luna each ran three fresh trials per case and version. Fresh QA agents graded anonymous, shuffled outputs against ten frozen binary criteria per case, with a failed critical criterion capping a trial at 4/10; the grader was first checked against controls taken from the original session's own answers. Five improvement rounds were measured. Fresh editors saw only the two development cases.

On the development cases, the unchanged skill scored median 2–4 capped. The current version scored 10/10 in all six Sonnet trials; GPT-6-Luna reached a median of 7 on the busy-core case and stayed capped at 4 on the frozen-apps case. On the two holdout cases, run with the unchanged and current versions side by side, the current version improved in all four model and case cells (Sonnet 4 to 9 on both; Luna 3 to 8 on one, 4 to 4 on the other with a higher uncapped count) with no regression.

With web search available, the first lookup wording produced no lookups because the models felt certain; requiring a retrieved source before explaining a component's role produced cited lookups. One retrieved community report showed that a trigger the original session had only inferred could equally be explained by process count, and the criteria were corrected and the affected trials regraded. In two of twelve current-version trials a citation did not support its claim. Three trials per cell is a pilot, not a significance claim.

## Evidence and limits

The collection source includes `evals/activity-monitor/2026-11-05/` with the frozen contract, deterministic fixture generator, raw simulated inputs, preserved responses, package snapshots, grades, and dependency receipt. Every synthetic capture is labeled, and the generator collects no host data.

Agents inherited the same model and reasoning configuration. Exact IDs, costs, token counts, and per-worker tool traces were unavailable. Access isolation was instruction-based on a shared filesystem. QA was independent and outputs used anonymous labels, but reference-access manifests made package assignment inferable. No human expert has labeled these responses, and human preference alignment remains unmeasured.

The tested unit is interpreting supplied captures after loading the package. This does not establish automatic skill selection, full live collection, every privileged or hardware-specific branch, or physical phone fit in a user's chat app. Structural and documentation checks are reported separately from diagnosis quality. Local source, installation, pushed source, deployment, and live verification are distinct states.

## Installation and documentation checks

The cached Skills CLI 1.7.4 installed only this package into an empty temporary project. All four installed files matched the authoring source. A direct global source link was observed as `htma-measure:activity-monitor`; a matching snapshot outside plugin ancestry was then observed as enabled `activity-monitor` in a fresh Codex app-server inventory. Six additional runtime directories linked to the shared snapshot. Filesystem installation is checked; invocation in every agent and reload of an existing app session remain untested.

The Codex package validator passed with PyYAML 6.0.3 in a temporary environment. Collection catalog checks and 15 catalog tests passed, as did 16 documentation tests, strict plugin/marketplace manifest validation, and the production docs build. The docs-spec gate passed with no failures; its static sidebar heuristic emitted warnings for catalog-driven navigation, whose actual generated links were checked.

The guide's install command and example prompt were inspected at 375 by 667 CSS pixels in a dedicated headless installed Chrome session. The prompt ended around pixel 637, and the page had no horizontal overflow. A 1440 by 900 desktop view was also inspected. This is documentation-page layout evidence, not physical-phone or future chat-host verification of diagnostic briefs. Nothing was pushed or deployed by these checks.
