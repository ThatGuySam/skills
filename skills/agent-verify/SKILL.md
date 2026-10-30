---
name: agent-verify
description: Verify agent or skill behavior with isolated subagents, artifact checks, and independent QA; compare skill versions or run a progressive audit that escalates unresolved judgments within a model budget. Use for evidence of skill effectiveness or regressions, not ordinary code testing alone.
---

# Agent Verify

Produce evidence of what an agent or skill actually does and whether a change helps. A valid outcome may be no improvement, a regression, or insufficient evidence. This skill works independently of a particular repo or skill creator.

## Choose the mode and contract

- **Verify:** assess an existing output, or run a skill on representative tasks. This establishes scoped behavior, not improvement over an absent baseline.
- **Compare:** compare frozen versions, or a skill against no skill. Read [comparison design](references/comparison.md).
- **Progressive audit:** use cheap checks first and escalate only unresolved issues. Read [progressive audit](references/progressive-audit.md). This mode can wrap either verify or compare.

Read [QA roles and grading](references/qa.md) before dispatching reviewers. Read [evidence records](references/evidence.md) when preparing the run directory. For source basis or methodological disputes, read [research basis](references/research-basis.md).

Infer the requested mode, target artifacts, runtime and authorized actions from the conversation. Inspect applicable local instructions and existing verification evidence. Record before running: the question/claim, meaningful success criteria, critical failures, case selection, baseline if any, provider, executor, exact model and native reasoning/thinking settings per role, model ceiling, run/repair limits and side-effect boundaries. A concise contract in the evidence directory is enough. Resolve missing user-only choices only when they change scope or spend.

Prefer a small pilot covering an ordinary case, an edge case and a likely failure or near-miss. These are starting categories, not a universal sample-size guarantee. Include home-repo and standalone cases when portability is the claim. Define outcomes and observable evidence, not matching your preferred prose. Before freezing criteria, identify which evidence can actually be observed. Separate output quality, fidelity to provided references, truth of original sources, runtime actions, and model-transfer claims. Unavailable traces limit action claims; they do not automatically make an otherwise observable output-quality comparison impossible. Do not silently drop a user-required critical criterion. Freeze the criteria before inspecting the outputs. Keep holdout cases separate from cases used to tune the skill.

## Execute the work

The launching agent is coordinator and final evidence reconciler, not the sole subjective grader of its own work. Spawn fresh workers for independent tasks or version/case trials when the runtime and user's scope permit. Keep their prompts natural, with only the real task, target skill, required inputs, environment and output boundary. Do not expose expected answers, variant identities, evaluation labels or the author's proposed fix. Real user requirements must remain visible.

Use independent output directories and fresh context per trial. Freeze shared inputs or record why that was impossible. Keep the reviewed skill read-only during measurement. Capture artifacts and tool-event logs available from this runtime; do not ask for private chain-of-thought. A worker's claim of having checked something is not a tool trace or proof of the resulting state. When subagents are unavailable, run the checks possible and label sequential/self-review limitations.

Start with deterministic checks and source inspection that directly establish criteria. For subjective or ambiguous behavior, dispatch fresh blinded QA with the original task, actual output, rubric and necessary reference evidence. QA must inspect the artifact, not just the worker summary. Follow the progressive mode's escalation rules if enabled. A completed file or high confidence does not by itself pass.

## Reconcile and report

Preserve original outputs, failures, grades and later adjudications separately. Investigate discrepancies against source evidence, actual state or executable checks; correct a broken grader without erasing its earlier result. Distinguish a worker error, an invalid fixture, a grader error, tool/environment failure and unresolved judgment. Retain a contrary supported finding rather than voting it away.

A critical failure blocks acceptance of that result even when other scores improve. Missing mandatory evidence is unknown, not pass. Report comparative outcomes by case and important task category; do not average away regressions or turn ordinal scores into a quality-percentage claim. Stronger-model review does not establish ground truth or transfer success to another deployment model.

Finish with one scoped verdict: **meets checked criteria**, **improved on tested cases**, **mixed**, **regressed**, **no demonstrated improvement**, or **inconclusive**. Name the baseline/model/setting, number of trials, decisive evidence, unresolved failures, actual escalation use, and untested branches. One run per cell is a pilot. Report costs/tokens only when observed, otherwise unavailable. Link the evidence directory and identify the smallest next check if inconclusive.

## With a skill creator

Accept a creator's draft path, preserved requirements, intended tasks, previous snapshot and allowed model budget. Return the evidence and verdict to that same owner. For a new skill, use a no-skill baseline only when evaluating added value; for an update, prefer the actual previous version. If it cannot be recovered, verify the current artifact and state that improvement is unmeasured. Do not invent a baseline, edit locked creator dependencies, recursively invoke skill creators or silently promote/install a tested version. Verification does not authorize the skill's future business actions.
