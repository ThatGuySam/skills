---
title: Zach Prompting
description: Improve prompts, skills, agent instructions, and AGENTS.md files with lean, outcome-first, evidence-backed contracts.
---

Zach Prompting edits prompts, skills, tool descriptions, and repository instructions. It preserves the task's requirements while removing repetition and conflicting directions. Model-specific advice stays in a separate reference; claims of improvement require representative evaluations.

## Quick start

```bash
npx skills add thatguysam/skills --skill zach-prompting
```

```text
Use $zach-prompting to tighten this AGENTS.md without weakening its safety,
permission, validation, or repository-boundary rules. Return the revised file
and a short change map.
```

Use `$zach-prompting` in Codex, `/zach-prompting` as a standalone Claude Code skill, or `/sam:zach-prompting` in the collection bundle. The canonical directory is [`skills/zach-prompting`](https://github.com/ThatGuySam/skills/tree/main/skills/zach-prompting).

## The short version

Use Zach Prompting when instructions have accumulated over time or need adapting to a newer model.

The workflow has four steps:

1. **Preserve the contract.** Keep the user-visible outcome, success criteria, invariants, evidence rules, permissions, required output, and stop conditions.
2. **Prune the noise.** Remove repetition, outdated instructions, behavior-neutral examples, irrelevant tools, contradictions, and workarounds written for older models.
3. **Clarify judgment.** Replace unnecessary absolutes and keyword shortcuts with contextual decision rules. State what the agent may do, when it must pause, and what proof completion requires.
4. **Verify the change.** Test representative tasks, compare against the prior artifact, and make one targeted change at a time when causal attribution matters.

This is an editing workflow, not a promise that every shorter prompt is better. A compact prompt still needs enough context to make the right decision.

## What it improves

- user and developer prompts;
- `SKILL.md` files and reusable prompt modules;
- `AGENTS.md`, `CLAUDE.md`, and repository instruction files;
- system prompts and agent definitions;
- tool descriptions and routing rules;
- long-running agent, subagent, memory, and progress-update instructions; and
- prompt migrations between model generations.

The skill preserves the artifact's native format and scope. It does not silently turn a review into an implementation, add unsupported product claims, or apply vendor-specific settings to unrelated models.

## What the instructions need to define

For a complex artifact, make these decisions visible when they materially change behavior:

| Contract field | Question to answer |
| --- | --- |
| Context | Why does this task exist, who is it for, and what does the output enable? |
| Outcome | What user-visible result should exist? |
| Success | What must be true before the work is complete, and which check proves it? |
| Evidence | Which claims require support, and what happens when evidence is missing or stale? |
| Boundaries | What is in scope, which content is untrusted, and which actions require approval? |
| Tools | Which tools apply, what prerequisites come first, and how should failures be handled? |
| Output | What shape, length, tone, formatting, and preserved content does the reader need? |
| Stop rules | When should the agent retry, fall back, ask, abstain, or finish? |

Do not force every small prompt into eight headings. Add structure only where it changes behavior.

## Shared guidance from the model vendors

The source guides converge on several practical ideas:

- lead with the intended outcome rather than an exhaustive procedure, and explain the reason behind non-obvious constraints;
- keep true invariants, but express judgment calls as compact decision rules;
- state authorization and scope boundaries once, and treat the request as the scope to deliver in full;
- remove workarounds written for older models, such as "think harder" lines, blanket thoroughness pushes, and bans on formatting or progress updates;
- control thinking depth with the runtime's effort setting rather than prompt wording;
- ground research, progress, and completion claims in evidence, and count only checks that exercise the change;
- keep pasted or retrieved content separate from instructions;
- expose only relevant tools and distinguish independent work from dependent sequences; and
- revise working prompts surgically, then test them on representative work.

These are cross-source editorial conclusions, not claims that the vendors use identical wording or defaults.

## Keep model-specific advice conditional

### OpenAI GPT-6 family

GPT-6 Astra is the highest-intelligence model. GPT-6.1 Sol balances speed and cost near Astra, GPT-6.1 Terra targets visual reasoning, computer use, and writing, and GPT-6 Luna handles focused, high-volume work. Effort support differs: 6.1 Sol and Astra do not accept `none`, while 6.1 Terra, GPT-6 Sol, and Luna do. Tool calling with reasoning requires the Responses API. Reusable prompt objects shut down November 30, 2026.

OpenAI's observed prompting behaviors come from Astra. It asks more clarifying questions, reacts strongly to conflicting skill files, favors lists and tables, delegates less than some workflows want, and tests thoroughly. The guide recommends auditing loaded instructions, requesting approval only after preparing reviewable work, specifying prose where needed, and skipping tests for low-impact changes. Test these candidates separately on each target model.

### OpenAI GPT-5.6

OpenAI recommends simplifying a working prompt one instruction group at a time, preserving the current reasoning effort as a migration baseline, and testing the same tasks after each change. GPT-5.6 is more concise by default than GPT-5.5; do not carry that concision assumption to GPT-6 Astra.

### Claude 5.x family

On Claude Fable 5.1, Fable 5, and Opus 5.5, thinking is always on and effort is the main control. Defaults differ: Fable 5.1 `high`, Opus 5.5 `medium`, Sonnet 5.5 `high` on the API, and Haiku 5.5 `medium`. Thinking counts toward `max_tokens`, and on Claude 5.1 and later models editing earlier turns invalidates thinking blocks. Prompts that ask the model to reproduce its reasoning can be refused.

Anthropic's guides address unattended runs that stop early, quiet tool-calling turns, scope creep and unrequested tests, unverified coding claims, instructions hidden in pasted text, and stale facts at low effort. Their sample prompts are measured on named models; Zach Prompting keeps them in scoped runtime sections rather than portable boilerplate.

The [vendor reference](https://github.com/ThatGuySam/skills/blob/main/skills/zach-prompting/references/vendor-guidance.md) records the details, a comparison set with pass conditions, and the source-review dates. These are proposed checks, not measured improvements.

## Example requests

```text
Use $zach-prompting to review this skill for repeated rules, contradictions,
over-prescription, vague success criteria, and missing stop conditions. Do not
edit it; give me a minimal patch plan and a representative eval set.
```

```text
Use $zach-prompting to migrate this working agent prompt to Claude Opus 5.5.
Establish the baseline first, keep effort settings out of the portable prompt,
and change one instruction group at a time so regressions remain attributable.
```

```text
Use $zach-prompting to audit this skill for instructions that make GPT-6 Astra
pause unnecessarily. Name each rule that causes a pause and preserve the real
approval gates.
```

## What a good revision returns

1. The revised artifact or a focused patch, according to the user's requested mode.
2. A compact change map that names what was preserved, removed, clarified, or made conditional.
3. Material conflicts or missing context that could not be resolved safely.
4. A validation plan using realistic tasks and observable pass conditions.
5. An honest result: validated improvement, plausible improvement awaiting evals, no change needed, or blocked.

Do not claim a rewrite is better merely because it is shorter or cleaner. Report what was actually checked.

## Sources and origin

The OpenAI GPT-6 and Anthropic Claude 5.x sources were checked November 4, 2026. The GPT-5.6 guide was rechecked September 22, 2026.

- OpenAI, [Using GPT-6](https://developers.openai.com/api/docs/guides/latest-model), [API changelog](https://developers.openai.com/api/docs/changelog), and [Deprecations](https://developers.openai.com/api/docs/deprecations).
- OpenAI, [Rethinking skills and prompts](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra).
- OpenAI, [Prompting guidance for GPT-5.6 Sol](https://developers.openai.com/api/docs/guides/prompt-guidance-gpt-5p6).
- Anthropic, [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices).
- Anthropic, [Prompting Claude Fable 5.1](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1), [Opus 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5), [Sonnet 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5-5), [Haiku 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-haiku-5-5), and [Fable 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5).

The name and original spark were inspired by [Zach Miles and his site, *An Option — with Zach*](https://zachmil.es/). The implementation is an independent synthesis of the cited vendor guidance and is not affiliated with or endorsed by Zach Miles, OpenAI, or Anthropic.
