---
title: Fable 5.2 Prompting Guidance
description: What Anthropic's Claude Fable 5.2 guidance and a recheck of OpenAI's GPT-6 guidance change in Zach Prompting.
sidebar:
  badge:
    text: Research
    variant: tip
---

Research memo, 2026-11-11. Anthropic released Claude Fable 5.2 on November 9, 2026 with its own prompting guide. This memo records what that guide and a recheck of OpenAI's GPT-6 pages change in Zach Prompting, whose vendor reference was last checked on November 4.

## Scope

The question is which official vendor guidance published or changed since November 4, 2026 should alter Zach Prompting's portable editing rules or its vendor reference. The skill covers OpenAI and Anthropic models, so this pass covers those two vendors. Guidance for other vendors is outside the question. Community commentary was not used as evidence, because the claims here are about each vendor's own specified and reported behavior.

## Short answer

- Anthropic's [Prompting Claude Fable 5.2](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2) guide is new and changes several things the skill said or left out. Most of it belongs in the vendor reference, scoped to Fable 5.2 and Mythos 5.2.
- Five ideas have support from both vendors and moved into the skill's portable rules: precise approval rules, pruning stale cautions, separating ordinary obstacles from deliberate blockers, cost-aware delegation, and reports that stand on their own. A sixth, checking for a runtime cause before rewording a prompt, is an editorial rule drawn from Anthropic's guidance.
- OpenAI published no new prompting guidance between November 4 and November 11. Two new models, GPT-6 Rosalind and GPT-6 Cyber, have no prompting guidance on the Using GPT-6 page.

## What the skill already knew

The November 4 reference covered Claude Fable 5.1, Opus 5.5, Sonnet 5.5, Haiku 5.5, and Fable 5, plus the GPT-6 family. It already told agents to control thinking with the effort setting, keep conversation history append-only on Claude 5.1 and later, render progress updates with `display: "updates"`, and avoid asking a model to reproduce its reasoning. Those points still hold. The recorded verification for that refresh was structural only; its behavioral status was `awaiting-evals`.

## What the evidence says

Each row names the source observation and the edit it supports. Numbers are Anthropic's reported results on its own test tasks. They are not measurements of any other workload.

| Claim | Source observation | Change in the skill |
| --- | --- | --- |
| Prompt lines that ask for less thinking stop working | Anthropic: "answer directly without deliberating" did not stop Fable 5.2 from thinking at `medium` effort and above; Fable 5.1 usually follows it | Vendor reference. The portable rule to use the effort setting already covered this |
| Fable 5.2 thinks before almost every reply at `high` and above | Anthropic prompting guide and best-practices page | Vendor reference: use a lower effort level for easy turns |
| Long tasks can end early | Anthropic: turns end with a list of what remains, an offer to continue, or a stop at an ordinary obstacle, more often at `low` and `medium`. Its finishing text halved sessions that ended with doable work left in replayed coding sessions at `medium`, and raised output tokens about 30 percent | Vendor reference, plus a portable rule to separate ordinary obstacles from deliberate blockers |
| Approval rules are applied as written | Anthropic: a rule listing "sending messages to people outside this conversation" held back about half of routine requests to colleagues. OpenAI: unclear or conflicting skill guidance makes GPT-6 Astra pause early | Portable rule: name the exact actions a rule covers |
| Exceptions belong inside the rule | Anthropic: an approved step was taken in about one try in ten under a separate "never" rule, and in about nine in ten when the rule itself said to get a go-ahead first | Portable rule, single-vendor measurement |
| Cautions pile up in carried context | Anthropic: stale notes, "never" rules, and reviewer conditions made Fable 5.2 hold back routine work; a general instruction to act more freely changed nothing | Portable rule: check memory, notes, and messages between agents, and delete cautions whose reason no longer holds |
| Code ownership wording changes behavior | Anthropic: a sentence saying the codebase is the model's own raised merging of repeated code from under a tenth of tries to about half, with about 1.5 times the output tokens and unrequested changes | Vendor reference only |
| Silent long turns can be a client problem | Anthropic: progress updates arrive as `thinking` blocks that are empty at the default display | Portable debug rule: rule out a runtime cause first |
| Delegation defaults point in opposite directions | Anthropic: Fable 5.2 delegates readily where prompts invite it. OpenAI: GPT-6 Astra may delegate less than a workflow wants | Portable rule: say when delegation is worth its cost; details in the vendor reference |
| Some carried-over instructions now cost money or cause harm | Anthropic: a large prompt-written token budget raised cost; Opus 5.5's "treat that answer as done" lines made Fable 5.2 far less likely to point out its own mistakes; hard sentence-length limits make prose choppy | Vendor reference |
| Reports should stand on their own | Anthropic's report text asks for a low-context reader, key points first, and no coined terms. OpenAI's Astra writing guidance asks for the main point early, language matched to the reader, and no invented labels | Portable rule |
| Editing a live prompt can break stored conversations | Anthropic: Fable 5.2 enforces the prefix check on every account, so a request that returns thinking blocks after `system`, `tools`, or an earlier message changed gets a 400 error | Vendor reference: apply changed text in new conversations |
| Forced tool use is unsupported on Fable 5.2 | Anthropic What's new and migration guide: `tool_choice` of `any` or `tool` returns a 400 error | Vendor reference: name the tool in the instruction |
| No new OpenAI prompting guidance | OpenAI changelog entries from October 20 to November 5 and the Using GPT-6 page | A dated recheck note |

## What works

- Treat Anthropic's sample texts as fixes for observed behaviors. Its own migration order is to set effort explicitly, review carried-over instructions, run the longest tasks, and then apply one piece of guidance per observed behavior while measuring token cost.
- Keep the Fable 5.2 material in a scoped section. Several findings were measured only on Fable 5.2, and Anthropic's general page says to re-check a technique measured on one model before applying it to another.
- Put only two-vendor ideas, or plain instruction hygiene, into portable rules.

## What to avoid

- Pasting the finishing, progress, or ownership texts into a portable skill. Each trades tokens for behavior, and the ownership sentence causes unrequested changes.
- Treating the reported percentages as guarantees. They come from Anthropic's simulated and replayed tasks.
- Assuming GPT-6.1 Sol, GPT-6.1 Terra, GPT-6 Luna, Rosalind, or Cyber share Astra's prompting behavior. OpenAI's prompting section describes Astra only.

## Disagreements and limits

The vendors disagree on delegation defaults, as the table shows, so a single portable instruction to delegate more or less would be wrong for one of them. Anthropic's general best-practices page still offers a sample prompt that reduces thinking on other Claude models, while its Fable 5.2 guide says such lines do not work on Fable 5.2. The skill keeps that difference in the vendor reference.

The OpenAI pages were read through a fetch tool that summarizes page text, so exact OpenAI wording was not confirmed in this pass. The recheck confirmed which GPT-6 models accept `none` effort, the endpoint rules, and the parameter changes. It did not show default effort levels, so those still rest on the November 4 check. The Fable 5.1, Opus 5.5, Sonnet 5.5, Haiku 5.5, and Fable 5 prompting pages were not reread.

## Recommendation

Update the vendor reference with a Fable 5.2 section and corrected API facts, add the portable rules above to the skill, and compare the new version against the November 4 version on a Fable 5.2 migration, a review-only request on a portable instruction file, and a debug case. The observation that would change this recommendation is a regression on the review-only or portable case, which would mean the new rules leak model-specific advice into general artifacts.

Outcome, 2026-11-11: the comparison ran and returned a mixed verdict. The migration gain held in two gradings. One of two review-case trials added an unscoped rule worded from Anthropic's guide, so the portable rule about ordinary obstacles and deliberate blockers is the item to watch. See [Zach Prompting verification](/zach-prompting/verification/).

## Source links

Anthropic, read November 11, 2026:

- [Prompting Claude Fable 5.2](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2)
- [What's new in Claude Fable 5.2](https://platform.claude.com/docs/en/models/fable-5-2/whats-new-fable-5-2)
- [Claude Fable 5.2 and Claude Mythos 5.2 migration guide](https://platform.claude.com/docs/en/models/fable-5-2/migration-guide)
- [Prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- [Release notes](https://platform.claude.com/docs/en/release-notes/overview), November 9, 2026 entry

OpenAI, read November 11, 2026:

- [Using GPT-6](https://developers.openai.com/api/docs/guides/latest-model) and its [GPT-6 Astra prompting section](https://developers.openai.com/api/docs/guides/latest-model/gpt-6-astra.md)
- [API changelog](https://developers.openai.com/api/docs/changelog), entries from October 20 to November 5, 2026

Local:

- [Vendor reference](https://github.com/ThatGuySam/skills/blob/main/skills/zach-prompting/references/vendor-guidance.md)
- [Zach Prompting verification](/zach-prompting/verification/)

## Research receipt

- Run ID: `zp-fable52-20261111`
- Research skill file hash (SHA-256, first 16 characters): `4249735c7353b55c`
- Question category: capability and vendor-specified behavior
- Research date: 2026-11-11
- Source-access gaps: OpenAI pages read through a summarizing fetch; five older Anthropic model pages not reread
- Unresolved checks: default effort levels for the GPT-6 family; whether any Fable 5.2 finding transfers to Opus 5.5 or Sonnet 5.5
