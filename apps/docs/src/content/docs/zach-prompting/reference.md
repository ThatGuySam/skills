---
title: How Zach Prompting works
description: The contract Zach Prompting preserves, the vendor guidance it applies, what a revision returns, and its sources.
---

Zach Prompting works in four steps:

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
- name the exact actions an approval rule covers, keep its exception in the same rule, and delete cautions whose reason no longer holds, including those carried in memory, notes, and messages between agents;
- separate ordinary obstacles to work through, such as errors and timeouts, from deliberate blockers to leave alone and report;
- remove workarounds written for older models, such as "think harder" lines, blanket thoroughness pushes, and bans on formatting or progress updates;
- control thinking depth with the runtime's effort setting rather than prompt wording, and rule out a runtime cause before rewording a prompt;
- say when delegation is worth its cost, because model defaults differ;
- ask for final reports that make sense to a reader who has not seen the work;
- ground research, progress, and completion claims in evidence, and count only checks that exercise the change;
- keep pasted or retrieved content separate from instructions;
- expose only relevant tools and distinguish independent work from dependent sequences; and
- revise working prompts surgically, then test them on representative work.

These are cross-source editorial conclusions, not claims that the vendors use identical wording or defaults.

## Keep model-specific advice conditional

### OpenAI GPT-6 family

GPT-6 Astra is the highest-intelligence model. GPT-6.1 Sol balances speed and cost near Astra, GPT-6.1 Terra targets visual reasoning, computer use, and writing, and GPT-6 Luna handles focused, high-volume work. Effort support differs: 6.1 Sol and Astra do not accept `none`, while 6.1 Terra, GPT-6 Sol, and Luna do. Tool calling with reasoning requires the Responses API. Reusable prompt objects shut down November 30, 2026.

A November 11, 2026 recheck found no new OpenAI prompting guidance. GPT-6 Rosalind and GPT-6 Cyber are new, and the Using GPT-6 page gives no prompting guidance for either.

OpenAI's observed prompting behaviors come from Astra. It asks more clarifying questions, reacts strongly to conflicting skill files, favors lists and tables, delegates less than some workflows want, and tests thoroughly. The guide recommends auditing loaded instructions, requesting approval only after preparing reviewable work, specifying prose where needed, and skipping tests for low-impact changes. Test these candidates separately on each target model.

### OpenAI GPT-5.6

OpenAI recommends simplifying a working prompt one instruction group at a time, preserving the current reasoning effort as a migration baseline, and testing the same tasks after each change. GPT-5.6 is more concise by default than GPT-5.5; do not carry that concision assumption to GPT-6 Astra.

### Claude 5.x family

On Claude Fable 5.2, Fable 5.1, Fable 5, and Opus 5.5, thinking is always on and effort is the main control. Defaults differ: Fable 5.2 and Fable 5.1 `high`, Opus 5.5 `medium`, Sonnet 5.5 `high` on the API, and Haiku 5.5 `medium`. Thinking counts toward `max_tokens`, and on Claude 5.1 and later models editing earlier turns invalidates thinking blocks. Prompts that ask the model to reproduce its reasoning can be refused.

Claude Fable 5.2 and Mythos 5.2 launched November 9, 2026. Fable 5.2 enforces the history check on every account, so a changed system prompt, tool description, or skill should apply to new conversations. It rejects forced tool use. A prompt line asking for less thinking does not stop it from thinking at `medium` effort and above. Anthropic's guide covers turns that end early, approval rules applied as written, code ownership wording, quiet tool-calling turns, subagent cost, cautions that pile up in memory and notes, and final reports for readers who did not see the work. Several of its sample prompts raise output tokens, so the skill adds one only for an observed behavior and records the cost. The [research memo](/research/zach-prompting-fable-5-2-guidance-2026-11-11/) lists each finding and its source.

Anthropic's guides address unattended runs that stop early, quiet tool-calling turns, scope creep and unrequested tests, unverified coding claims, instructions hidden in pasted text, and stale facts at low effort. Their sample prompts are measured on named models; Zach Prompting keeps them in scoped runtime sections rather than portable boilerplate.

The [vendor reference](https://github.com/ThatGuySam/skills/blob/main/skills/zach-prompting/references/vendor-guidance.md) records the details, a comparison set with pass conditions, and the source-review dates. These are proposed checks, not measured improvements.

## What a good revision returns

1. The revised artifact or a focused patch, according to the user's requested mode.
2. A compact change map that names what was preserved, removed, clarified, or made conditional.
3. Material conflicts or missing context that could not be resolved safely.
4. A validation plan using realistic tasks and observable pass conditions.
5. An honest result: validated improvement, plausible improvement awaiting evals, no change needed, or blocked.

Do not claim a rewrite is better merely because it is shorter or cleaner. Report what was actually checked.

## Sources

The Claude Fable 5.2 sources were checked November 11, 2026, and OpenAI's changelog and Using GPT-6 page were rechecked the same day. The other OpenAI GPT-6 and Anthropic Claude 5.x sources were checked November 4, 2026. The GPT-5.6 guide was rechecked September 22, 2026.

- OpenAI, [Using GPT-6](https://developers.openai.com/api/docs/guides/latest-model), [API changelog](https://developers.openai.com/api/docs/changelog), and [Deprecations](https://developers.openai.com/api/docs/deprecations).
- OpenAI, [Rethinking skills and prompts](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra).
- OpenAI, [Prompting guidance for GPT-5.6 Sol](https://developers.openai.com/api/docs/guides/prompt-guidance-gpt-5p6).
- Anthropic, [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices).
- Anthropic, [Prompting Claude Fable 5.2](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2), [What's new in Claude Fable 5.2](https://platform.claude.com/docs/en/models/fable-5-2/whats-new-fable-5-2), and the [migration guide](https://platform.claude.com/docs/en/models/fable-5-2/migration-guide).
- Anthropic, [Prompting Claude Fable 5.1](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1), [Opus 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5-5), [Sonnet 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-sonnet-5-5), [Haiku 5.5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-haiku-5-5), and [Fable 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5).
