# Agent Verify step: matched comparison, November 5, 2026

This change adds a required "Verify with Agent Verify" step: created skills, and updates that can change behavior, are tested by fresh workers and graded by a separate QA agent before the creator calls them working. The creator's delivery status now follows Agent Verify's verdict. Agent Verify is locked as a seventh dependency at `thatguysam/skills` commit `a2948b3`.

## Method

The previous package (6 locked sources) and the candidate ran the creator's own three acceptance cases from [cases.json](cases.json): create, review-only, and preferences. Each version ran each case once, so there were six runs, each a fresh Claude Code Opus 5.5 subagent with its own run directory. Both variants sat at opaque paths, and both were allowed to start subagents. The [contract](agent-verify-step/contract.md) froze the criteria before any run.

A fresh QA agent graded the actual files, not the reports. Two constructed controls were mixed in with the real runs: one self-graded skill and one empty output with a "validated" claim. QA did not know which runs were controls. It graded both as expected: the self-graded run failed V1–V4, and the empty run failed A1 and V1–V4. Grades are in [qa-grades.json](agent-verify-step/qa-grades.json), and the revealed run labels are in [run-map.json](agent-verify-step/run-map.json).

## Results

| Case | Version | Original assertions (A1) | No forbidden side effects (A2) | Fresh worker (V1) | Separate QA (V2) | Evidence + verdict (V3) | Honest label (V4) | Review-only respected (R1) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| create | previous | pass | pass | pass | **fail** | pass | **fail** | – |
| create | candidate | pass | pass | pass | pass | pass | pass | – |
| preferences | previous | pass | pass | pass | **fail** | pass | **fail** | – |
| preferences | candidate | pass | pass | pass | pass | pass | pass | – |
| review | previous | pass | pass | – | – | – | – | pass |
| review | candidate | pass | pass | – | – | – | – | pass |

The previous creator already ran fresh-worker trials, but its author graded them and still labeled the results `validated`. The candidate added a separate QA agent with criteria frozen in advance. In the create case, that QA caught a real defect: a trial had accepted blank phone screenshots. The candidate fixed it and reran the affected case. The candidate skipped trials on the review-only request, as the new step says; the previous version ran one there anyway.

Verdict: **improved on tested cases** for independent verification of created skills, with no regression on the original acceptance assertions. This is a pilot with one run per cell.

## Costs and issues

- Observed top-level agent tokens and wall time:
  - create: 132k tokens / 12.6 min (previous) vs 162k / 45.5 min (candidate)
  - preferences: 107k / 4.9 min vs 126k / 11.4 min
  - review: 72k / 3.2 min vs 60k / 1.7 min
- Nested subagent tokens were not measured. Verification makes creation noticeably slower.
- The candidate's create-run QA agent left scratch files in `/private/tmp/qa-r4b-scripts/`, outside its run directory, and did not report them. The next revision should tell the creator to give every worker and QA agent a scratch directory inside the evidence directory. That revision has not been tested.
- The candidate's preferences skill used Claude's `disable-model-invocation` key, which the Codex validator rejects. The run disclosed this. It reflects one authoring choice, not the verification step.
- Weaker evidence:
  - The create runs ran at the same time and hit local port conflicts.
  - Preflight receipts partly revealed the variant.
  - Workers and QA came from the same vendor.
  - No run tested automatic skill selection or a Codex executor.
- Raw run directories are not bundled; the contract, grades, and run map above are.
