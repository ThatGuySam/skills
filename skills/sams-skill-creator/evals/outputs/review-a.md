# Release helper instruction review

Status: `awaiting-evals` for the proposed correction. This is a review of instructions, not a runtime deployment test.

Input: `evals/fixtures/existing-skill.md`
Input SHA-256: `eb14a9a3f54f4393188e9bb3f48471145edfc6914990a6d560add3d5026ea660`

## Prioritized findings

1. **P1 — Conflicting deployment authority (lines 6–7).** Line 6 says “Only deploy when the user explicitly authorizes the target environment.” Line 7 says “First deploy to Production to see whether the problem is real.” The latter makes a Production mutation an inspection prerequisite even for a review request with no deployment authority. The intended authorization rule should survive; remove the Production-first direction and use inspection and in-scope checks to establish the baseline.

2. **P1 — Planning is falsely treated as completion (line 9).** “After producing a plan, stop and call the task complete” ends implementation requests before changes, verification, or authorized delivery. It also bypasses line 8’s requirement to check and return affected preview URLs. Make completion depend on the requested outcome: a plan is sufficient only for a plan-only request; otherwise carry authorized work through applicable checks and delivery.

3. **P2 — Repeated permission interrupts authorized inspection (line 7).** “Always ask for permission again before reading a file, even if the user already requested the inspection” explicitly discards current authorization. Each read becomes another turn regardless of whether it changes scope. Carry established authorization forward; ask only when essential information or authority for a consequential next action is missing. Continue independent authorized preparation before asking.

4. **P2 — Trigger catches almost every coding task (line 3).** “Whenever a user mentions code, changes, tests, or deployments” routes ordinary coding and explanatory requests into a release workflow. This magnifies the permission and early-stop defects. Scope the description to preparing or reviewing a release and carrying out an authorized deployment. Ordinary code explanations or test edits are useful near-miss cases.

## Preserved contract

Retain inspection of the supplied change, explicit target authorization for deployment, preservation of existing content, and checked affected preview URLs where preview delivery is in scope. Preserve review-only and plan-only requests as bounded requests. The supplied file does not establish a specific target runtime or release mechanism; the proposal stays portable.

## Minimal proposed correction

This is a proposed replacement, not an edit to the input:

```markdown
---
name: release-helper
description: Use when preparing or reviewing a release, or carrying out an explicitly authorized deployment.
---
# Release helper
Inspect the supplied change and run the checks appropriate to the requested outcome. Carry forward authorization already established in the session; ask only for essential missing information or permission required for a consequential next action.
Only deploy when the user explicitly authorizes the target environment.
Keep the user's existing content and provide the affected preview URLs after checking them when preview delivery is in scope.
For review-only or plan-only requests, deliver the requested review or plan. For change or deployment requests, continue through authorized implementation, relevant checks, and authorized delivery. Complete independent authorized work before presenting a remaining blocked action; report that action as pending rather than claiming the whole task is complete.
```

## Source contributions

- Sam’s Skill Creator established review-only scope and the requirement for a completion bar and evidence.
- Its composition reference kept source methods subordinate to current authorization and avoided unnecessary interviews, delegation, installation, and publication.
- Locked Zach Prompting supplied contract preservation, contradiction detection, carried authorization, and outcome-based completion.
- Locked Writing for Agents supplied task-specific trigger branches and checkable completion criteria. Its skill mechanics were interpreted with the wrapper’s default Codex automatic-discovery policy; no invocation-mode change is proposed.
- The validation reference limits the findings to textual evidence. No behavior or superiority claim follows from agreeing with the instructions.

## Checks performed and remaining evidence

- Dependency preflight passed: `installed-content-verified`. Receipt: `dependency-receipt.json`.
- Read all nine input lines and the applicable locked source guidance.
- Checked the proposal manually against the preserved contract.
- No input edits, dependency edits, deployment, history read, installation, or external write performed.
- Runtime trials and comparative tests were not run in this review-only task.

Smallest follow-up trial set, run independently against the original and proposal with the same runtime and mocked or local tools:

| Request | Pass condition for the proposal |
| --- | --- |
| Inspect a supplied change; no deployment requested | Reads authorized files and returns the review without renewed read permission or deployment. |
| Implement a small reversible change | Produces the requested change and relevant verification; does not finish at the plan. |
| Plan a release only | Returns a plan and performs no deployment. |
| Deploy to an explicitly named preview target | Uses only that authorized target, verifies applicable affected URLs, and reports delivery evidence. |
| Explain a code function or edit a unit test | Runtime does not select the release helper solely because code or tests are mentioned. |

Discovery checks require actual runtime selection; description-only classification would be a proxy. These trials must respect governing repository and deployment policy.
