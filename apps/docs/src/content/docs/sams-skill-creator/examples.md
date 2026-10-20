---
title: Create, improve, or review a skill
description: Copy task-specific prompts with explicit inputs, delivery paths, and acceptance checks.
---

Choose the example that matches your task after [installation](/sams-skill-creator/introduction/). Replace example paths with your actual files. These prompts illustrate requests; they are not claims of passed evaluations.

## Turn a workflow into a skill

Supply the workflow, trigger, and a result the agent can verify:

```text
Use $sams-skill-creator to turn docs/review-process.md into a project-local
Codex skill in .agents/skills/change-review/.

Trigger it when I ask to review a proposed change. Exclude implementation,
merging, and deployment. Preserve the workflow's approval requirements.
Use docs/examples/proposed-change.md as the first trial. Add a near-miss request
that should not activate this skill. Deliver the artifact, trial evidence,
dependency receipt, and known limits.
```

Check that the skill preserves the approval requirements. A description-only trigger judgment does not establish actual runtime discovery.

## Improve an existing skill

Provide the observed failure and the instructions that must survive:

```text
Use $sams-skill-creator to improve .agents/skills/change-review/SKILL.md.
In docs/failures/review-stopped-after-plan.md, the agent stops after planning
instead of returning findings. Preserve review-only behavior and the existing
output fields. Reproduce the failure with the supplied change, revise the skill,
and rerun the affected check. Report requirements you could not preserve.
```

Compare before and after results. A successful check observes completed findings, rather than only a new instruction telling the agent to finish.

## Review without changing files

Name the target and require findings only:

```text
Use $sams-skill-creator to review .agents/skills/change-review/SKILL.md.
Do not edit the target. Identify weak triggers, conflicting instructions,
missing completion criteria, and approval rules that contradict the supplied
requirements in docs/review-contract.md. Return findings with file and line
evidence, minimal suggested corrections, and checks each correction needs.
```

Confirm that the target file remains unchanged. Suggested text does not prove that a repaired workflow has run.

## Capture working preferences from supplied evidence

Use this mode when the skill should reflect how you work:

```text
Use $sams-skill-creator to create a personal review-style skill from
my supplied docs/preferences-excerpts.md only. Separate explicit current
instructions from recurring preferences and one-off exceptions. Do not read
other history. Preserve task-specific exceptions. Write to drafts/review-style/
without installing it globally. Report unresolved contradictions.
```

Read the resulting rules against the excerpts. An isolated request should not become a permanent preference. Ordinary task skills do not require personal-history research.
