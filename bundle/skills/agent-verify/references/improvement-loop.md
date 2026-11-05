# Red-green-refactor improvement loop

Use this when the user asks to improve a prompt, skill, or agent instruction step by step until the obvious gains run out. Each round is a matched comparison between a candidate and the current best version, so [comparison design](comparison.md), [improvement design](improvement.md), and [QA roles and grading](qa.md) still apply. The loop adds a gate before editing begins, a one-change-per-round rule, and a stop rule.

## Default policy

These defaults come from Sam's chosen policy (2026-11-05). Values the user supplies take precedence; record the policy that was used in the contract.

| Decision | Default |
| --- | --- |
| Score | Ten frozen binary criteria. A trial scores the number that pass. A failed critical criterion caps that trial at 4/10. `unknown` counts as not passed and is reported separately. |
| Case score | The median of three fresh trials. The suite score is the mean of the dev-case medians. The capped score is the reported /10 and decides red and the ≥9 target. Keep and plateau decisions also use the uncapped pass count, because fixing one of several critical failures does not move a capped score. |
| Red | The unchanged artifact scores ≤6/10 on at least one realistic dev case in at least 2 of 3 trials, and the failing criteria are named. |
| Keep | A green candidate raises the capped or uncapped dev mean, lowers no dev case's uncapped median, breaks no criterion that passed in most of a case's trials, and adds no critical failure that holds in most of a case's trials. A refactor candidate may tie but meets the same per-case conditions. A round's gain is the larger of the capped and uncapped changes. |
| Stop | Every dev case reaches ≥9 with no critical failure, or five rounds have run (rejected rounds count), or two consecutive rounds each gain less than 1 point after every still-failing criterion has been targeted at least once or recorded as not fixable in the prompt. |

The score counts binary checks; it is not a percentage of quality. Report it as `k/10`, with the failing criteria named.

## 0. Find failures, then freeze the checklist

Run error analysis before writing criteria. Run the unchanged artifact on development cases, read the actual outputs and traces, write a short critique of each problem, and group the critiques into recurring failure modes. Criteria come from those observed failures and from the user's explicit requirements, not from a generic quality list. These exploratory runs do not count as the red proof.

Write ten criteria. Each must be binary, observable in the output or resulting state, and stated with the evidence that decides it. Mark the critical ones. Split a graded property into separate checks; for example, "four of five required facts" becomes five fact checks. Prefer deterministic checks and use an interpretive QA check only for what code cannot decide. Do not pad the list with easy checks to reach ten. If fewer genuine requirements exist, use the real count, scale it to /10, and report the raw `k/n`.

Present the checklist and case split for approval before the red run. In a non-interactive run, record it as proposed and continue under that label.

Split the cases:

- **Dev cases** are what the refactorer studies and tunes against. Use at least an ordinary case, an edge case, and a likely failure or near-miss.
- **Holdout cases** are at least two realistic cases that the refactorer never sees. If the coordinator must read every case to split them, delegate edits to a fresh editor that receives only dev cases and their failures. Score them only at red and at final confirmation. Keep related or transformed cases on the same side of the split.

Validate the QA grader on focused controls before the red run. Freeze the checklist, cases, grader instructions, model and reasoning settings, trials per case, and budget. A rough trial count is `3 × (dev + holdout)` for red, plus `3 × dev` for each measured version, plus `3 × holdout` for confirmation. If the budget cannot cover at least one green round, say so before spending.

## 1. Red: prove the poor score

Snapshot and hash the unchanged artifact. Run three fresh worker trials per case, each in its own context and output directory. Match the deployment's context. When an agent CLI serves as the model runner, check a pilot output for leaked global instructions or memory files, disable unrelated ones, and record the exact command. Fresh QA scores every output against the frozen checklist without seeing which version produced it. Red is proven only when the policy's red rule holds on a dev case.

If red is not proven, stop and report the baseline scores as no demonstrated headroom: the loop has nothing to fix on these cases. Use **meets checked criteria** only if every required check passed. Do not weaken the baseline, rerun only the strong trials, or loosen a criterion to manufacture a failure. You may propose harder cases that are still realistic. They need approval and a new red run, and the earlier result is kept.

A red result caused by a broken grader, invalid fixture, or unavailable tool is a measurement defect, not a prompt failure. Repair it, keep the failed run on record, and rerun red before any refactoring. A red that appears only on holdout cases means the dev cases do not represent the failure; revise the dev split, not the prompt.

## 2. Green: the smallest change that fixes one failure

Target one failing criterion per round: critical failures first, then the failure that is most frequent across dev cases. Read the failing transcripts and name the cause before editing. Common causes are a missing or buried requirement, conflicting rules, an undefined term, an unclear output contract, a rule that gets over-applied, or a missing general example. If the cause lies outside the prompt, such as model capacity, a missing tool, or inaccessible data, record it as not fixable by the prompt and move to the next criterion.

Make one hypothesis-driven edit and record the criterion it targets. Use Zach Prompting when it is available for the rewrite method. Put the reason beside a new requirement, resolve conflicts instead of stacking rules, and generalize any example so it does not copy a dev case. Snapshot the candidate and run three fresh trials on every dev case. Apply the keep rule. Revert a rejected candidate, but keep its scores and the reason it was rejected.

After a rejection, read the regressed outputs before the next attempt. Do not retry the same hypothesis in new words. If the candidate fixed its target but exposed a requirement the parent met only by accident, because no instruction asked for it, the next round may make a linked change. Keep the target fix, add the exposed requirement explicitly, record both as targets, and note the link. A linked change is one round. Two unrelated fixes bundled together are not a linked change.

Workers never see the checklist, the variant labels, or the edit's intent. The coordinator edits the artifact; fresh workers and fresh QA measure it. The coordinator does not grade its own edits.

## 3. Refactor: simplify while staying green

After a kept green change, run a refactor pass when the artifact grew, repeats itself, or now contains wording specific to a case. Remove duplicated or obsolete instructions, generalize phrasing tied to a case, and remove examples to test whether the gain depends on them. Measure the refactor like a candidate and keep it only if it ties or beats the dev mean with no per-case regression. When there is nothing to prune, record the refactor as skipped. An artifact that quotes facts from dev cases is overfitting; generalize it before continuing.

## 4. Repeat or stop

A round's gain is the change in the current best's dev mean across that round; a rejected round gains 0. Continue until the stop rule fires. While a failing criterion has never been targeted, the plateau rule does not apply: move to that criterion next, within the round cap. Before you declare improvements exhausted, list every criterion still failing with the fix that was tried or why it cannot be fixed in the prompt. When every dev case reaches ≥9, promote those cases to regression checks. Further improvement then needs new, harder, realistic cases and a new loop, not more rounds on a saturated suite.

Do not change the checklist or grader during the loop. If criteria drift is real (reading outputs exposed a requirement that matters), freeze a new checklist version, rescore the baseline and the current best under it, and keep both histories. Earlier rounds then count as development, not confirmation.

## 5. Confirm on holdout cases

Run the baseline snapshot and the final best on the holdout cases: three trials each, launched close together in time. One fresh QA batch grades all of them in randomized order without version labels. Report dev and holdout trajectories by case.

Choose the verdict from the skill's vocabulary. **Improved on tested cases** requires a holdout gain with no holdout regression and no critical failure. A gain on dev cases that does not carry over to holdout cases is **no demonstrated improvement** or **mixed**, labeled as a dev-only result. A small holdout set is a pilot. Three trials do not support a significance claim; if you make a statistical claim, use paired differences and grouping by case.

## Ledger helper

`scripts/score_loop.py RUN/loop-ledger.json` applies the policy arithmetic to statuses that QA has already recorded. It computes capped and uncapped trial scores, case medians, red proof, keep or reject for each candidate, round gains, untargeted failing criteria, the stop decision, and holdout changes. It refuses a ledger that records rounds without a proven red. It does not grade outputs or decide the verdict. Pair it with `check_receipt.py` when evidence hashes matter.

The ledger format, version 1:

- `version`: `1`; optional `policy` overrides such as `critical_cap`, `red_threshold`, `trials_per_case`, `plateau_gain`, `plateau_rounds`, `max_rounds`, and `done_score`.
- `not_prompt_fixable`: optional criterion IDs recorded as outside the prompt's reach, with the reason kept in the run notes.
- `criteria`: 1–10 entries of `{id, critical}`.
- `versions`: ordered entries of `{id, kind, parent, round, trials}`. The first entry is `kind: baseline` with `parent: null` and `round: 0`. Later entries are `green` or `refactor`, have an earlier parent, and use rounds 1 and up. A green entry lists its `targets` as criterion IDs.
- `trials`: `{case, split, results}`, where split is `dev` or `holdout` and results maps every criterion ID to `pass`, `fail`, or `unknown`. Add holdout trials to the final best version for confirmation.

## Optional tooling

The loop needs only subagents. These tools can help when the task fits them. Their output is a candidate version subject to the same keep rule and holdout confirmation.

| Tool | Use it when | Caution |
| --- | --- | --- |
| [promptfoo](https://github.com/promptfoo/promptfoo) | An API prompt has deterministic assertions you want to run as a prompt × case matrix or a CI regression gate | Its README says it is now part of OpenAI and remains MIT-licensed open source |
| [DSPy GEPA](https://dspy.ai/api/optimizers/GEPA/overview/) | You have dozens of labeled examples and a programmatic metric, and want automated reflective search | Optimizes whatever the metric rewards; ablate examples from the result and confirm on holdout cases |
| [Inspect AI](https://inspect.aisi.org.uk/) | Agent tasks need repeated trials and logs, or bridges to Claude Code or Codex | Built for eval harnesses, not prompt editing |
| [AI Evals skills](https://github.com/ai-evals-course/evals-skills) | You need guided error analysis or judge validation against human labels | Judge targets such as TPR and TNR above 90% need roughly 100 labeled examples |

Do not plan around the Anthropic Workbench prompt improver or `improve_prompt` API, which were retired on 2026-08-17. Do not plan around OpenAI's dataset-backed prompt optimizer either. OpenAI Evals became read-only on 2026-10-31 and is scheduled to shut down on 2026-11-30.

## Measurement don'ts

- Do not edit before red is proven, and do not merge red and green into one step.
- Do not tune against holdout cases or show them to the refactorer.
- Do not rerun only failing trials until they pass. Every attempt stays in the denominator.
- Do not average away a per-case regression, or keep a change that fixes one check by breaking another.
- Do not let a holistic 1–10 judge stand in for the binary checklist, or reward length and formatting.
- Do not change the model, tools, or settings partway through the loop. That confounds every later round.
