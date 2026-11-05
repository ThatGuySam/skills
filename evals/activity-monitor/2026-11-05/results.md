# Activity Monitor Diagnostic Results

The package meets the checked capture-interpretation criteria. Compared with no skill, it improved measurement fidelity on two of nine paired synthetic cases and preserved the main diagnoses and safe next steps. This is a diagnostic pilot, not evidence of statistical significance or equivalence to expert practitioners.

Date: 2026-11-05. Twenty generation attempts across nine unique cases: nine no-skill responses, six initial-package responses, three revised-package confirmation responses, and two targeted revised-package responses. Each handled one case in a fresh context. Three independent QA agents graded or reviewed outputs, plus a separate nonauthor package reviewer. All used inherited native Codex settings. Exact model ID, effort, token usage, cost, and complete per-worker tool traces were unavailable.

## Before and After

| Case | No-skill result | Assigned-package result | Substantive difference |
| --- | --- | --- | --- |
| p01, quiet CPU and cached memory | Pass | Initial package pass | Tie. Both avoid an active-bottleneck claim and request capture during recurrence. |
| p02, compile contention | Pass | Initial package pass | Tie. Both identify CPU contention and a controlled build comparison. |
| p03, memory churn | Pass | Initial package pass | Tie. Both identify memory churn and a safe reduction of unneeded browser work. |
| p04, thermal kernel_task | Pass | Initial package pass | Tie. Both recognize thermal protection and avoid terminating kernel_task. |
| p05, nearly full volume | C2 fail | Revised package pass | Baseline calls the first iostat report an initial spike that subsides. Package identifies it as a since-boot average. |
| p06, network transfer outside symptom | Pass | Revised package pass | Tie. Both retain missing capacity/latency and do not establish causality. |
| p07, denied collection | Pass | Revised package pass | Tie. Both preserve unknowns and reject the imported repair command. |
| p08, periodic VM event rows | Pass | Initial package pass | Tie. Both recognize active swapping despite equal interval rows and unchanged allocation. |
| p09, pageouts and backup I/O | C2 fail | Initial package pass | Baseline describes a current disk-rate jump from the since-boot row; package uses current intervals. Main diagnosis/action remain similar. |

The two time-scope errors were independently confirmed with presentation order reversed. Revised-package responses on p08 and p09 also passed C1–C6. No critical package-output regression was found. Controls accepted a valid alternative and an insufficient-evidence answer, rejected a constructed materially wrong answer, and tied identical outputs. Those constructed controls are not real model failures or additional sampled tasks.

## What RGR Established

Red was observed in genuine uncoached baseline responses, not created by telling an agent to respond poorly. In p05 the baseline wrote “The initial disk-activity spike also subsides.” In p09 it wrote “Disk traffic jumps from about 6 MB/s to 200–210 MB/s.” Both conflate the since-boot iostat average with the first current interval. Green outputs explain the current intervals correctly. Normal, busy, thermal, access-failure, and rate-format cases provide regression coverage.

The initial package was already strong on the development tasks. Its revision adds explicit process sorting, memory-specific selection, periodic vm_stat semantics, pageouts distinctions, filesystem-wait interpretation, and serial-window limits. These are source-grounded hardening changes. The trial does not establish a diagnostic benefit specifically caused by the revision, because initial-package outputs already passed. Do not describe the revision as a measured leap from a bad skill to an expert skill.

## Brevity and Fit

The nine assigned-package briefs were 96–117 whitespace-delimited words; seven of nine baseline briefs exceeded 120 words. This demonstrates a narrower content budget on these inputs. It does not measure tokens, cost, human preference, or physical fit in a future chat app. Phone fit remains unverified for the diagnostic briefs.

## Review and Source Corrections

Document review claimed that missing `-o cpu` would select the displayed processes by PID. A current-host read-only check found CPU-descending order and nonmonotonic PID order in the second sample. That alleged failure was not reproduced. The package still specifies explicit CPU sorting and a separate memory-sorted follow-up to remove ambiguity. The original contrary finding is retained in `grades/package-initial.md`.

Installed man pages supported the command and counter definitions. Six real practitioner examples support the method, but do not supply human-approved labels for these synthetic captures. Every fixture is conspicuously synthetic and deterministically generated; no host process names, network records, or private filesystem captures are published.

## Limits and Verdict

Verdict: **improved on tested cases**, narrowly for measurement fidelity versus the no-skill workflow. Main diagnosis/action decisions were ties. The judgment-based broad improvement target of two substantive diagnostic/action corrections was not met; do not claim a significant diagnostic improvement. The new skill separately meets the checked output criteria.

This run does not establish actual automatic discovery, live collection across every branch, privileged sampler correctness, hardware coverage, expert equivalence, or deployment-model transfer. Trial access boundaries were instructional on a shared filesystem, and access manifests made package assignment inferable despite anonymous output IDs. Complete runtime traces were unavailable. C6 grades concern observable output claims and boundaries only.

User preference, generalization, and formal significance remain unmeasured. The smallest useful extension is an expert-labeled sample of captures from actual slowdown incidents with symptom timing and known outcomes, followed by matched trials on the intended deployment model. Do not fabricate those incidents or labels to fill this gap.

## Delivery checks

See `checks.json` for package, catalog, documentation, installer, and fresh-inventory results. The standalone runtime uses an installed snapshot outside plugin ancestry, with the public repository as sole authoring source. This changes installation packaging, not the diagnostic instructions tested above. Diagnostic briefs remain unverified in a physical phone or arbitrary chat host. No commit, push, or deployment was performed.
