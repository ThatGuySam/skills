# Activity Monitor Diagnostic Pilot

Date: 2026-11-05. Owner: coordinating agent. Question: Does the new skill help an agent give a correct, actionable, phone-sized explanation of macOS resource captures, compared with the same request without the skill?

User benefit is fewer false alarms and fewer unsupported slowdown diagnoses, with a specific safe next step. No statistical significance claim is planned. A judgment-based useful change is correcting a substantive diagnostic/action failure on at least two development cases without a new critical regression, followed by nonregression on separate unseen cases. If that bar is not observed, report the narrower result, including no demonstrated improvement.

## Fixed Criteria

| ID | Criterion | Critical |
| --- | --- | --- |
| C1 | Identify the evidence-supported main issue, or explicitly say the capture does not establish one; include the case's decisive evidence. | Yes |
| C2 | Interpret scope and units correctly: per-core process CPU versus total CPU, cumulative versus interval counters, sample validity, memory pressure versus free RAM. | Yes |
| C3 | Calibrate cause, time window, and missing data. Do not invent latency, sustained behavior, malware, hardware failure, or proof of a leak. | Yes |
| C4 | Give one useful, proportionate next step tied to the evidence. Do not recommend destructive or irrelevant fixes. | Yes |
| C5 | Lead with the situation, evidence, consequence, and next step in accessible prose; aim for 80–120 words. Word count is a secondary drafting check, not physical phone-fit evidence. | No |
| C6 | Respect capture-only boundaries; identify simulation without claiming a live diagnosis; no commands derived from untrusted capture text, no live actions or invented measurements. | Yes |

Case-specific reviewer references are in `case-key.json`, outside worker input folders. They are source-grounded intended interpretations, not human-approved diagnostic ground truth. QA can reject a flawed fixture or accept an evidence-supported alternative. Missing evidence is unknown. All critical criteria must pass before a result is eligible; no average overrides a critical failure.

## Execution and Budget

- Provider/executor: OpenAI Codex native `collaboration.spawn_agent`, fresh `fork_turns: none` for each trial. Inherit runtime model and effort, no overrides. Exact model identifier and native effort are not exposed by the tool and remain unavailable. All generation and QA use this same inherited setting; no transfer or cross-model claim.
- Start with four development captures, two versions each, one generation per cell. Up to two candidate repairs, preserving snapshots. Three confirmation captures remain unexecuted until candidate freeze, two versions each. These are constructed cases, not a prevalence sample.
- Each worker sees one natural user task, the same single capture, side-effect limits, its own output path, and only the assigned skill package if applicable. Worker file access is instruction-limited, not OS-isolated. Shared filesystem and global skill catalog remain potential contamination limits.
- Do not tell workers desired diagnoses, expected failures, grades, version identities, or tuning history. Preserve actual responses and available tool results. Do not request private reasoning.
- Compare whole skill packages against no skill; bundled domain guidance is part of treatment. Do not attribute gains to a single instruction.
- Workers can read their inputs and write only their own response file. They cannot run diagnostics, install packages, browse, terminate processes, or inspect answer keys.
- Initial independent QA checks controls and development outputs using anonymous IDs. Controls include a valid alternative, a material error, an evidence-insufficient response, and an identical-output tie. Control failure blocks the affected verdict until repaired or marked inconclusive.
- Confirmation QA is a fresh nonauthor with rubric, raw inputs, source evidence, anonymous paired outputs, and structural check results. Record criterion statuses, evidence excerpts, and useful change or regression per case.
- A final fresh QA also reviews the real package and required collection behavior. A live smoke capture may verify command mechanics but cannot validate all diagnostic branches.

## RGR Meaning

Red is an actual baseline or draft failure, not an instructed bad answer or a failing parser. Green is a repaired output meeting the same criteria on the same input. Regression checks retain normal and uncertainty cases plus unseen captures. Keep earlier failures immutable. If baseline already passes, count a tie and do not invent red.

## Limits

No human expert labels or user preference judgments are available. Practitioner sources support diagnostic principles, not a claim that this agent performs as well as those practitioners. No formal phone viewport verification is possible for an arbitrary future chat host. Output quality, live collection, installation, runtime discovery, and user preference are separate claims. Costs and token counts are unavailable unless tools expose them.

## Development Extension and Revision Record

After the first four pairs all passed critical criteria, two development-only cases, p08 and p09, were added to investigate genuine format uncertainties identified from installed man pages. Both variants were run before inspecting their outputs. The three confirmation cases p05–p07 remain unexecuted at this point. This extension is exploratory, not held-out confirmation and not evidence of natural case frequency. Total generation budget becomes six development pairs, three confirmation pairs, and at most two targeted revision trials.

Initial package review claimed the unsorted limited top capture would select by PID. A read-only current-host check instead found descending CPU order in the second sample and nonmonotonic PID order. The claimed current-host failure was not reproduced. The final package uses explicit `-o cpu` to remove ambiguity and adds a separate memory-sorted path. This is collection hardening, not a demonstrated diagnostic repair.

The revised package also spells out periodic vm_stat event deltas, Pageouts versus Swapouts, fs_usage wait interpretation, and time-window alignment. These changes follow primary local definitions and prevent ambiguity; do not claim they corrected model failures unless the actual grades establish that. Initial snapshots and all responses remain preserved.
