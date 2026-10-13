---
name: sams-skill-creator
description: Create or improve agent skills, turn evidenced workflows or working preferences into skills, and diagnose weak triggers or incomplete execution. Combines authoring, instruction design, preference evidence, and behavioral validation using locked sources. For standalone prompt reviews, use zach-prompting.
---

# Sam's Skill Creator

Deliver a usable skill or the requested review, with a clear completion bar and evidence appropriate to its claims. Keep one owner and one working artifact throughout. Consult multiple sources at the decision that needs them, then synthesize their contributions into that artifact. The sources are ingredients, not separate jobs to hand off.

## Establish the working set

Resolve this directory from the path used to load the skill. Run `npm run preflight --silent` here and save the receipt with the task evidence. If dependencies are absent, read [dependency operations](references/dependencies.md) and restore the frozen lock. A requested refresh checks current sources once, reviews changes, and freezes the resulting set for the run. An integrity check proves the installed versions, not that upstream has no newer release.

Read [composition and runtime boundaries](references/composition.md) before applying a source. Use the private paths below rather than a global skill with the same name. Missing required material blocks that contribution; complete independent preparation and state the limitation instead of silently substituting another version.

## Work on the next decision

Enter at the user's current point. A small correction may need only a focused edit and check; a new workflow needs intent, a draft, and a meaningful trial. At each step, ask which unresolved decision would change with another source. Consult its relevant section, apply what helps, and continue. Sources can contribute at several steps or together at one step. Keep earlier findings available instead of rereading them.

**Recover intent.** Establish the artifact, intended user task, target runtime, destination, triggering situations, exclusions, success evidence, and current authorization from supplied material first. Apply [Zach's contract-preservation method](.runtime/skills/zach-prompting/SKILL.md) when an existing artifact or observed failure defines requirements that must survive. For new capability or uncertain outputs, consult [Anthropic's intent and example-driven authoring](.runtime/skills/anthropic-creator/SKILL.md). Ask only for consequential information the evidence cannot supply. Finish this step when the desired behavior and its completion evidence are concrete enough to draft and test.

**Ground preferences when they matter.** If the skill encodes how the user works, consult [Automate Me's history and clustering methods](.runtime/skills/automate-me/SKILL.md). Separate explicit current instructions from inferred recurring habits and one-off anecdotes. Read only authorized, relevant history; supplied excerpts can be enough. Ordinary task-specific skills do not need personal-history mining or a personal-mode format. Finish when retained preferences have evidence and unresolved contradictions are visible.

**Design the instructions and their pointers.** Consult [Writing for Agents](.runtime/skills/writing-for-agents/SKILL.md) and its [skill mechanics](.runtime/skills/writing-for-agents/SKILL-MECHANICS.md) for the entrypoint, triggers, information hierarchy, and completion criteria. Give each conditional reference a concrete decision or condition that makes reading it useful. Keep instructions needed on every path in the entrypoint. A pointer is not a keyword shortcut, and using several methods does not require several public skills. Finish when the likely requests can reach the right guidance without importing unrelated workflows.

**Build the artifact.** Use [Codex Skill Creator](.runtime/skills/codex-creator/SKILL.md) for Codex packaging, metadata, validation, and proportionate scaffolding. Consult [Anthropic Skill Creator](.runtime/skills/anthropic-creator/SKILL.md) for concrete examples, reusable resources, and evaluation design when those improve the task. Preserve the chosen runtime and format. Add scripts for genuinely repeated or fragile mechanics, not to manufacture a large package. Revisit Writing for Agents when the draft sprawls; revisit Zach when requirements conflict. Finish when the requested files exist, references resolve, and the skill can be attempted in its intended environment.

**Exercise and refine.** Review the draft through [Zach's preservation and friction checks](.runtime/skills/zach-prompting/SKILL.md) and Writing for Agents' pruning and completion criteria. Run structural validation. For a new or consequential workflow, use Anthropic's realistic-task and comparison methods plus Codex's independent forward-testing guidance. Read [validation choices](references/validation.md) for proportional tests, trigger cases, and reporting limits. Repair demonstrated failures; repeat affected checks. Expand coverage for an unresolved risk, not merely because another method is available. Finish when scoped acceptance checks pass or a specific external dependency prevents them.

## Deliver

Carry the artifact through the authorized destination and relevant checks. Creating a skill does not authorize performing the skill's future business actions. For review-only requests, return findings without editing the target.

Return the artifact path, the behavior it enables, a compact account of consequential source contributions or disagreements, the dependency receipt, and actual validation results. Use `validated` only for the behavior tested; otherwise use `awaiting-evals`, `no-change-needed`, or `blocked` with the specific gap. Present performance or “better than baseline” claims only with comparative evidence. Stop when the requested delivery and acceptance checks are complete.
