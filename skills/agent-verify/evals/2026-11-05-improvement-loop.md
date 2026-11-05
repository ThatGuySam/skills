# Improvement loop forward tests, November 5, 2026

Two fresh Opus 5.5 coordinators loaded Agent Verify from its working tree and ran the improvement loop on a synthetic task. They had no expected answers and no knowledge of the skill's revision history. The task was to improve a one-line commit-message prompt deployed on Claude Haiku 5.5 against seven team requirements. The inputs are bundled in [`fixtures/loop-forward/`](fixtures/loop-forward/): the request, the original prompt, five diffs, both ledgers as recorded, and run 2's final prompt. Raw worker outputs and grades are not bundled.

Workers were fresh `claude -p --model claude-haiku-5-5` calls, one diff per call. QA used fresh Opus 5.5 subagents with opaque trial IDs, which the coordinators validated on constructed controls before grading. Each coordinator wrote its own ten criteria; IDs differ between runs. No human labels exist; workers and reviewers share a model vendor.

## Run 1: the first draft's rules deadlocked

- **Red:** proven. The original prompt scored 4/10 in all 15 trials. Every case had two or three critical failures: code fences and chat text, invented consequences, and a missing `!` on the breaking change.
- **Rounds:** two attempts at "output only the message" removed the fences in 17 of 18 trials. Both were rejected because the breaking-change diff lost its `BREAKING CHANGE:` footer. The original prompt had produced that footer only by accident, while dressing up a fenced reply.
- **Stop:** plateau after two rejected rounds, with five failing criteria never targeted.
- **Verdict:** no demonstrated improvement.

Run 1 exposed three defects in the rules. The coordinator followed them correctly.

1. With a 4/10 critical cap, fixing one of several critical failures never moved the score.
2. Linked criteria blocked each other under one-change rounds.
3. Rejected rounds triggered the plateau before most failures had been tried.

The repair added uncapped keep and gain decisions, linked changes, and a plateau that waits until every still-failing criterion has been targeted. `run1-ledger.json` predates the required `targets` field, so the current helper rejects it with exit 1. Adding `targets: ["C1"]` to both candidates and replaying gives `continue: target an untried failing criterion`.

## Run 2: the revised rules reached a verdict

| Round | Change | Dev mean, capped / uncapped | Outcome as run |
| --- | --- | --- | --- |
| Red | Original prompt | 4.0 / 6–8 per case | Proven on all dev cases |
| 1 | Output only the raw message | 5.33 / 7.67 | Kept |
| 2 | Breaking change needs `!` and a footer | 8.0 / 9.33 | Rejected: new critical invented detail on the typo case |
| 3 | Round 2's rule plus an explicit no-invention rule | 7.33 / 8.67 | Kept, although "body explains why" broke on two cases |
| 4 | Restore the reason requirement; match counts and timings to the code | 9.33 / 9.33 | Kept; `target` stop |

On holdout confirmation, the original and final prompts ran 3 trials each on two unseen diffs, graded blind in one batch. The original scored 4, 4, 4 on both diffs; the final prompt scored 10, 10, 10 on both. Reported verdict: **improved on tested cases**, labeled a pilot. 63 Haiku calls cost about US$0.30, observed; reviewer cost was unavailable.

Still failing: the typo fix keeps a one-line body, and the breaking-change subject drops its scope (`feat!:`). Requirements that Haiku met without being told (allowed types, 72 characters, imperative mood) need harder cases in a new loop.

## Defects found in run 2 and their repair

- **Round 3 traded one check for others.** The helper compared per-case totals only, so a broken criterion could hide behind fixes elsewhere. That contradicted the reference's rule against fixing one check by breaking another. The helper now rejects any candidate that breaks a criterion passing in most of a case's trials. Replaying the recorded run 2 trials, round 3 is now rejected. With round 4's text re-parented to round 1 as a linked change, it is kept and the stop is again `target`. This is a replay of recorded statuses, not a fresh run under the tightened rule.
- **Runner contamination.** The machine's global agent instructions leaked into the `claude -p` workers until the coordinator disabled them. The reference now asks for a pilot check of runner context.
- **Holdout exposure.** The coordinator read every diff in order to split them. The reference now says to delegate edits to a fresh editor in that situation.

## Limits

This is one synthetic task, with three trials per cell and a coordinator, QA, and worker setup from a single vendor. It shows that the loop's gates, rejections, stops, and holdout confirmation work end to end. It does not show that the loop improves other prompts, or improves this one more than unstructured editing would. The final prompt's 10/10 holdout result comes from run 2 as executed.
