# Review of release-helper

Reviewed `evals/fixtures/existing-skill.md` directly. The input was not edited. Findings are static instruction analysis, not observed execution results.

## Prioritized findings

1. **P0. The first required action contradicts deployment authorization.** Line 6 says, "Only deploy when the user explicitly authorizes the target environment." Line 7 then says, "First deploy to Production to see whether the problem is real." This makes a Production mutation a prerequisite for diagnosis and supplies no authorization check at that step. It can also turn an inspection request into an attempted deployment. Replace the latter sentence with: "Inspect the supplied change and reproduce the problem through read-only checks or an authorized test environment before deployment."

2. **P1. The skill requires redundant permission for authorized inspection.** Line 7 says, "Always ask for permission again before reading a file, even if the user already requested the inspection." Every file read becomes a user dependency, even when the request already authorizes the read. This directly explains excessive questions. Replace that sentence with: "Read files needed for the requested inspection without renewed confirmation. Ask only when required information or authorization is missing, and continue independent authorized work."

3. **P1. Planning is incorrectly treated as task completion.** Line 9 says, "After producing a plan, stop and call the task complete." For an implementation or release request, this ends the task before changes, verification, or the authorized deployment. Replace it with: "For a planning-only request, finish with the plan. Otherwise, continue through the requested work and verification. If a deployment still needs authorization, prepare a concrete, reviewable result before asking, and report the remaining deployment as pending."

4. **P2. The trigger applies release constraints to unrelated work.** Line 3 says, "Use whenever a user mentions code, changes, tests, or deployments." Generic mentions of code or tests do not establish a release task. This broad trigger exposes routine work to the unnecessary pauses and Production prerequisite above. Replace the description with: "Inspect and verify a supplied change for release, or deploy that change when the user authorizes the target environment."

## Minimal proposed correction

Preserve the existing content-preservation and checked-preview-URL requirements. Replace only the broad trigger, contradictory diagnosis instruction, repeated-read approval instruction, and premature completion rule:

```markdown
---
name: release-helper
description: Inspect and verify a supplied change for release, or deploy that change when the user authorizes the target environment.
---
# Release helper
Inspect the supplied change. Read files needed for the requested inspection without renewed confirmation.
Reproduce the problem through read-only checks or an authorized test environment before deployment. Deploy only when the user explicitly authorizes the target environment.
Ask only when required information or authorization is missing, and continue independent authorized work. Prepare a concrete, reviewable result before requesting deployment authorization.
Keep the user's existing content and provide the affected preview URLs after checking them.
For a planning-only request, finish with the plan. Otherwise, continue through the requested work and verification. Call the task complete only when its requested outcome is verified; report any unresolved blocker or pending deployment accurately.
```

## Suggested behavior checks

- An authorized inspection proceeds through necessary file reads without another permission question.
- An implementation request continues beyond planning to the change and its verification.
- A planning-only request ends with a plan without claiming implementation occurred.
- A release without target authorization reaches a reviewable result before asking about deployment, and performs no Production mutation.
- A release with explicit authorization for a named target uses that authorization without asking again and verifies the affected URLs.
