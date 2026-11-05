---
name: agent-verify
description: Use fresh subagents to verify new work, compare before/after improvements, or improve a prompt or skill step by step in red-green-refactor rounds, in code, skills, prompts, documents, or agent behavior. Inspect real artifacts and test results with independent QA, matched trials, and regression checks.
metadata:
  internal: true
---

# Agent Verify

Use fresh subagents to establish whether work meets its requirements and whether a change improves the result. Apply this to code, skills, prompts, documents, and agent behavior. A valid outcome may be no improvement, a regression, or insufficient evidence. This is a standalone skill with no HTMA dependency.

## Choose the mode and contract

- **Verify new or existing work:** inspect the actual artifact against the request and run representative checks. For a skill or agent, execute realistic tasks. This establishes scoped behavior, not improvement over an absent baseline.
- **Compare an update:** default to the actual previous version versus the candidate when the request asks whether a change helps. For a new capability, compare against no skill or the existing workflow only when added value is the question. Read [improvement design](references/improvement.md) before selecting cases or spending on repeated trials, then [comparison design](references/comparison.md).
- **Progressive audit:** use cheap checks first and escalate only unresolved issues. Read [progressive audit](references/progressive-audit.md). This mode can wrap either verify or compare.
- **Improvement loop:** use this when the user wants a prompt, skill, or instruction improved incrementally until the obvious gains run out. First prove a poor score out of 10 on the unchanged artifact. Then keep only single-change rounds that raise it without breaking a passing check, stop on a target, plateau, or round cap, and confirm on holdout cases. Read [improvement loop](references/improvement-loop.md) before writing criteria or scoring the baseline. The user's request to improve the artifact authorizes edits between measurements, not installation or publication.

When verifying skill installation, discovery, naming or reload behavior, read [installation and discovery](references/installation.md) before testing the runtime.

Read [QA roles and grading](references/qa.md) before dispatching reviewers. Read [evidence records](references/evidence.md) when preparing the run directory. For source basis or methodological disputes, read [research basis](references/research-basis.md).

Infer the requested mode, target artifacts, runtime and authorized actions from the conversation. Inspect applicable local instructions and existing verification evidence. Record before running: the question/claim, user-visible benefit, observed shortfall or uncertainty, what result would change a decision, primary outcome and minimum useful change when justified, required criteria, critical failures, case selection, baseline if any, provider, executor, exact model and native reasoning/thinking settings per role, model ceiling, run/repair limits and side-effect boundaries. A concise contract in the evidence directory is enough. Label judgment-based targets and unknown baselines; do not manufacture a threshold or defect. Resolve missing user-only choices only when they change scope or spend.

Prefer a small pilot covering an ordinary case, an edge case and a likely failure or near-miss. These are starting categories, not a universal sample-size guarantee. Include home-repo and standalone cases when portability is the claim. Define outcomes and observable evidence, not matching your preferred prose. Before freezing criteria, identify which evidence can actually be observed. Separate output quality, fidelity to provided references, truth of original sources, runtime actions, and model-transfer claims. Unavailable traces limit action claims; they do not automatically make an otherwise observable output-quality comparison impossible. Do not silently drop a user-required critical criterion. Freeze the criteria before inspecting the outputs. Keep holdout cases separate from cases used to tune the skill.

## Execute the work

The launching agent coordinates the run and reconciles evidence. Independent subagent verification is required for a completed Agent Verify verdict. Spawn fresh workers for executable tasks or version/case trials, and a fresh QA subagent that did not author the work to inspect the actual artifacts and check results. For an existing artifact, QA can inspect and run checks directly without recreating the artifact. Use the runtime's native subagent tools, such as Codex `spawn_agent` or Claude Code `Agent`; inherit the current model unless the user or applicable policy selects another. Keep model diversity optional and disclose shared-model limitations. Keep their prompts natural, with only the real task, target skill, required inputs, environment and output boundary. Do not expose expected answers, variant identities, evaluation labels or the author's proposed fix. Real user requirements must remain visible.

Use independent output directories and fresh context per trial. Match the real task unit: a system that handles one request at a time gets one case per context, unless batch equivalence has been checked or batching is the behavior under test. Freeze shared inputs or record why that was impossible. Keep the reviewed skill read-only during measurement; in the improvement loop, edit only between measured versions and snapshot each version. Capture artifacts and tool-event logs available from this runtime; do not ask for private chain-of-thought. A worker's claim of having checked something is not a tool trace or proof of the resulting state. When subagents are unavailable or disallowed, run useful deterministic checks, record the limitation, and return **inconclusive** for independent verification. Self-review cannot satisfy the subagent requirement.

Start with deterministic checks and source inspection that directly establish criteria. Validate a new or changed interpretive grader on focused controls before relying on its verdicts; follow [QA roles and grading](references/qa.md). Give fresh QA the original task, actual output, fixed criteria, check results and necessary reference evidence. For comparisons, supply anonymous outputs from both versions. QA independently runs or inspects the checks that decide objective criteria and assesses subjective or ambiguous behavior against the rubric. QA must inspect the artifact, not just the worker summary. Follow the progressive mode's escalation rules if enabled. A completed file or high confidence does not by itself pass.

## Reconcile and report

Preserve original outputs, failures, grades and later adjudications separately. Investigate discrepancies against source evidence, actual state or executable checks; correct a broken grader without erasing its earlier result. Distinguish a worker error, an invalid fixture, a grader error, tool/environment failure and unresolved judgment. Retain a contrary supported finding rather than voting it away.

A critical failure blocks acceptance of that result even when other scores improve. Missing mandatory evidence is unknown, not pass. Report comparative outcomes by case and important task category; do not average away regressions or turn ordinal scores into a quality-percentage claim. Separate required-check success, challenge-case gains, regression preservation and demonstrated user benefit. Passing easy checks or moving a secondary score alone does not establish meaningful improvement. Stronger-model review does not establish ground truth or transfer success to another deployment model.

Finish with one scoped verdict: **meets checked criteria**, **improved on tested cases**, **mixed**, **regressed**, **no demonstrated improvement**, or **inconclusive**. Name the baseline/model/setting, number of trials, decisive evidence, unresolved failures, actual escalation use, and untested branches. One run per cell is a pilot. Report costs/tokens only when observed, otherwise unavailable. Link the evidence directory and identify the smallest next check if inconclusive.

## Completion

Finish only after independent QA findings have been reconciled against the actual artifacts, mandatory checks have evidence or explicit unknowns, and comparison claims name a real baseline. For code, check resulting behavior with the relevant executable tests or runtime. For documents, inspect factual and requirement fidelity against available sources. Treat new work that meets its requirements separately from measured improvement. For the improvement loop, also finish with the red evidence, every kept and rejected round, the stop reason, and holdout confirmation or its explicit absence. Verification authorizes only the checks and temporary artifacts within the user's scope, not installation, publication, deployment, or external messages.

## With a skill creator

Accept a creator's draft path, preserved requirements, intended tasks, previous snapshot and allowed model budget. Return the evidence and verdict to that same owner. For a new skill, use a no-skill baseline only when evaluating added value; for an update, prefer the actual previous version. If it cannot be recovered, verify the current artifact and state that improvement is unmeasured. Do not invent a baseline, edit locked creator dependencies, recursively invoke skill creators or silently promote/install a tested version. Verification does not authorize the skill's future business actions.
