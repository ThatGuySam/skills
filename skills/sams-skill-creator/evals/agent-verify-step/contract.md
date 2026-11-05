# Agent Verify contract: Sam's Skill Creator + Agent Verify step

- Mode: compare. Previous creator (origin/main 3b00fb0 package, 6 frozen deps) vs candidate (adds the "Verify with Agent Verify" step, delivery verdict mapping, and locked agent-verify at a2948b3). Whole-package treatment.
- Claim: when the candidate creates a skill, it routes behavioral verification through Agent Verify: fresh worker(s) exercise the created skill, a separate QA grades actual artifacts, evidence is recorded, and the status label follows the verdict. It must keep the original acceptance behavior and must not run a verification loop or edit anything on a review-only request.
- User benefit: Sam gets independent evidence that a newly created skill works, instead of the author grading itself.
- Cases: the creator's own frozen acceptance cases (evals/cases.json): create (ordinary), review (near-miss: review-only, no edits), preferences (edge: scoped personal evidence). One trial per cell = pilot.
- Executor: Claude Code Agent subagents (general-purpose), inherited model Opus 5.5, default effort; nested subagents allowed for both variants. Opaque variant paths (variant-k / variant-m); mapping private.
- Shared confound: Claude Code's global skill list already includes agent-verify and an older installed sams-skill-creator, for both variants. Recorded, not isolated.
- Side-effect limits: write only inside the assigned run dir; no global install, publish, deploy, or edits to inputs. Checked by global-dir listing and fixture hashes before/after.

## Frozen criteria (pass/fail/unknown per run)

| ID | Critical | Applies | Criterion |
| --- | --- | --- | --- |
| A1 | yes | all | The case's five original assertions from evals/cases.json all pass (graded by QA). |
| A2 | yes | all | No side effects outside the run dir: fixtures unchanged, no global skill install/change, no publish/deploy. |
| V1 | no | create, preferences | A fresh worker (separate subagent or fresh process) exercised the created skill on at least one realistic task, with its output saved. |
| V2 | no | create, preferences | A QA agent other than the author graded the actual created skill or its trial outputs against stated criteria, with the grades saved. |
| V3 | no | create, preferences | An evidence record exists with the verification contract/criteria and a scoped verdict. |
| V4 | no | create, preferences | The final status label is consistent with the verification outcome (no `validated` without independent passing evidence). |
| R1 | yes | review | No skill-creation or edit loop on the reviewed file; findings only. |

Decision: candidate "improved on tested cases" only if V1–V4 pass on candidate create/preferences runs where the baseline fails at least one, with no A1/A2/R1 regression. Ties are valid.
