---
title: Zach Prompting
description: Improve prompts, skills, agent instructions, and AGENTS.md files with lean, outcome-first, evidence-backed contracts.
---

- `Tease:` Make agent instructions clearer by preserving the contract and removing the clutter.
- `Lede:` Zach Prompting improves prompts, skills, system instructions, tool descriptions, agent definitions, and `AGENTS.md` files with current guidance from OpenAI and Anthropic.
- `Why it matters:`
  - Capable models can become less reliable when old scaffolding, repeated rules, and contradictory instructions accumulate.
  - Good agent instructions define the outcome, evidence, authorization boundary, output, and completion bar without micromanaging every step.
- `Go deeper:`
  - Use the contract-first workflow below.
  - Keep model-specific controls conditional.
  - Validate changes on representative tasks before calling them improvements.

## The short version

Use Zach Prompting when an instruction artifact has grown by accretion or when a newer model needs a cleaner contract.

The skill follows four moves:

1. **Preserve the contract.** Keep the user-visible outcome, success criteria, invariants, evidence rules, permissions, required output, and stop conditions.
2. **Prune the noise.** Remove repetition, obsolete scaffolding, behavior-neutral examples, irrelevant tools, and contradictions.
3. **Clarify judgment.** Replace unnecessary absolutes and keyword shortcuts with contextual decision rules. State what the agent may do, when it must pause, and what proof completion requires.
4. **Verify the change.** Test representative tasks, compare against the prior artifact, and make one targeted change at a time when causal attribution matters.

This is an editing workflow, not a promise that every shorter prompt is better. A compact prompt still needs enough context to make the right decision.

## Install

Install only this skill with the open Skills CLI:

```bash
npx skills add thatguysam/skills --skill zach-prompting
```

The canonical directory is [`skills/zach-prompting`](https://github.com/ThatGuySam/skills/tree/main/skills/zach-prompting). Hosts that use Codex-style skill invocation can call it as `$zach-prompting`.

## What it improves

- user and developer prompts;
- `SKILL.md` files and reusable prompt modules;
- `AGENTS.md`, `CLAUDE.md`, and repository instruction files;
- system prompts and agent definitions;
- tool descriptions and routing rules;
- long-running agent, subagent, memory, and progress-update instructions; and
- prompt migrations between model generations.

The skill preserves the artifact's native format and scope. It does not silently turn a review into an implementation, add unsupported product claims, or apply vendor-specific settings to unrelated models.

## A useful prompt contract

For a complex artifact, make these decisions visible when they materially change behavior:

| Contract field | Question to answer |
| --- | --- |
| Context | Why does this task exist, who is it for, and what does the output enable? |
| Outcome | What user-visible result should exist? |
| Success | What must be true before the work is complete? |
| Evidence | Which claims require support, and what happens when evidence is missing? |
| Boundaries | What is in scope, what is forbidden, and which actions require approval? |
| Tools | Which tools apply, what prerequisites come first, and how should failures be handled? |
| Output | What shape, length, tone, and preserved content does the reader need? |
| Stop rules | When should the agent retry, fall back, ask, abstain, or finish? |

Do not force every small prompt into eight headings. Add structure only where it changes behavior.

## Shared guidance from the model vendors

The two source guides converge on several practical ideas:

- lead with the intended outcome rather than an exhaustive procedure;
- keep true invariants, but express judgment calls as compact decision rules;
- state authorization and scope boundaries once;
- ground research, progress, and completion claims in retrieved evidence or tool results;
- expose only relevant tools and distinguish independent work from dependent sequences;
- preserve readability by removing low-value detail instead of compressing prose into shorthand;
- give agents access to the checks that determine whether the work is complete; and
- revise working prompts surgically, then test them on representative work.

These are cross-source editorial conclusions, not claims that the vendors use identical wording or defaults.

## Keep model-specific advice conditional

### GPT-5.6

OpenAI recommends simplifying a working prompt one instruction group at a time, preserving the current reasoning effort as a migration baseline, and testing the same tasks after each change. Its guide also emphasizes explicit success and stopping conditions, contextual tool routing, retrieval budgets, citation behavior, approval boundaries, and targeted validation.

GPT-5.6 is more concise by default than GPT-5.5, so broad brevity instructions may over-compress an answer. Use API-level verbosity controls for the default detail level when available, then keep task-specific preservation and output rules in the prompt.

### Claude Fable 5

Anthropic recommends revisiting older prompts because stronger instruction following can make symptom-by-symptom rules unnecessary. For long or high-effort work, its guide emphasizes acting once enough information exists, preventing unrequested scope expansion, grounding progress claims in tool evidence, using parallel subagents for independent work, and ending only at completion or a genuine user-only-input blocker.

Fable-specific controls should not become universal prompt boilerplate. In particular, effort defaults, long-run harness behavior, memory scaffolding, fallback behavior, and instructions related to reasoning-extraction refusals belong only where that model and runtime require them.

## Example requests

```text
Use $zach-prompting to tighten this AGENTS.md without weakening its safety,
permission, validation, or repository-boundary rules. Return the revised file
and a short change map.
```

```text
Use $zach-prompting to review this skill for repeated rules, contradictions,
over-prescription, vague success criteria, and missing stop conditions. Do not
edit it; give me a minimal patch plan and a representative eval set.
```

```text
Use $zach-prompting to migrate this working agent prompt to GPT-5.6. Preserve
the current reasoning setting, establish the baseline first, and change one
instruction group at a time so regressions remain attributable.
```

## What a good revision returns

1. The revised artifact or a focused patch, according to the user's requested mode.
2. A compact change map that names what was preserved, removed, clarified, or made conditional.
3. Material conflicts or missing context that could not be resolved safely.
4. A validation plan using realistic tasks and observable pass conditions.
5. An honest result: validated improvement, plausible improvement awaiting evals, no change needed, or blocked.

Do not claim a rewrite is better merely because it is shorter or cleaner. Report what was actually checked.

## Sources and origin

The skill's prompting techniques are based on the official vendor guidance available on July 15, 2026:

- OpenAI, [Prompting guidance for GPT-5.6 Sol](https://developers.openai.com/api/docs/guides/prompt-guidance-gpt-5p6).
- Anthropic, [Prompting Claude Fable 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5).

The name and original spark were inspired by [Zach Miles and his site, *An Option — with Zach*](https://zachmil.es/). The implementation is an independent synthesis of the cited vendor guidance and is not affiliated with or endorsed by Zach Miles, OpenAI, or Anthropic.
