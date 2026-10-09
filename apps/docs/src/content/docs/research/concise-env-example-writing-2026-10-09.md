---
title: Concise, Useful Environment Examples
description: Practical writing rules from poteto, Matt Pocock, Google, Laravel, and Next.js.
sidebar:
  badge:
    text: Research
    variant: tip
---

Date: 2026-10-09. Research for the Env Example skill.

Keep a comment when it helps a developer choose, obtain, set, inspect, or troubleshoot a value. Remove explanations already obvious from the assignment. This is our synthesis, not a measured claim that one prompting style performs best.

## Scope and Local Findings

The previous draft required too much setup and verification narration in its synthetic example. Its contract even required a parser command regardless of whether that command helped with a specific variable. The revision removes that quota and keeps verification details in the verification record.

The user explicitly chose code inspection, existing env input restricted to Git-tracked `.env.example` files, and pragmatic detail per variable. Useful content includes exact doc URLs, dashboard/admin links, one-line operations, non-obvious possible values, and other details that save development work. These are user decisions, not inferences from file authorship.

The earlier personal-history audit remains incomplete. This pass does not retry it. Local env discovery checked tracked status without reading env content. Public examples below are repository-tracked files viewed through GitHub source pages, not deployed configuration.

## What the Sources Say

| Source | Observed Guidance or Practice | Application Here |
| --- | --- | --- |
| Poteto's pstack `unslop` | Use concrete actions and plain language; remove filler and repetitive framing; avoid compression that makes prose harder to decode. | Delete generic setup narration. Preserve conditions that change what the developer should do. |
| Pstack `technical-writing` | Use real code names, put conditions before instructions, and preserve clarity rather than optimizing word count alone. | Put a short instruction beside the actual variable. Keep units and conditional requiredness. |
| Matt Pocock's `writing-for-agents` | Remove instructions that do not change behavior, keep information in one place, and disclose conditional detail only when needed. | One compact drafting rule instead of a mandatory comment schema; move research and evals out of routine instructions. |
| Matt Pocock's repository rationale | Shared domain terminology can replace repeated explanations. | Use consistent existing names; do not invent jargon to shorten a small env file. |
| Google technical writing | Replace wordy constructions with direct verbs and split sentences that carry several ideas. | Prefer `Generate: <command>` or one clear sentence over a paragraph about the operation. |
| Laravel 13.x template | Mostly assignments, blank-line groups, and commented alternatives, including database settings behind the SQLite default. | Preserve scanability and optional settings. The template itself supplies little link or command guidance. |
| Next.js Supabase example | One shared instruction and a direct project settings URL precede two assignments. | A single useful link can document a whole related group. |
| Vercel Postgres auth starter | Short acquisition links sit beside database and auth settings, including a local-development condition. | Keep the pattern of task-specific guidance; independently verify its destinations before reusing them. |

Sources are linked individually below. These are primary instructions and source-code observations, not controlled studies of model behavior. We did not treat third-party skill summaries, repository popularity, or broad community sentiment as proof.

## The Differences Matter

Laravel's sparse template depends on framework conventions and external documentation. It demonstrates readable grouping, but does not satisfy the user's request for useful links and commands by itself. The Next.js Supabase example more closely demonstrates the desired compact link placement. Neither sample establishes a single framework-wide rule for every integration.

Pocock's shared vocabulary helps when concepts recur. This skill has no new domain-specific concepts that justify a standalone glossary. Its words should remain familiar to developers. The upstream domain-modeling guidance also limits glossaries to domain-specific terms and recommends ADRs only for consequential, surprising trade-offs. These reversible drafting choices belong in the existing decision record.

Google's general code-sample guidance suggests line wrapping, but the user explicitly wants single-line commands. Keep runnable command syntax and exact URLs intact; wrap explanatory prose instead. Do not shorten a useful link to a provider homepage to meet a line-length target.

## Recommended Skill Instruction

> Keep comments that help a developer choose, obtain, set, inspect, or troubleshoot a value. Delete comments that restate the variable name or visible assignment. Put shared guidance once above its group. Keep exact URLs and useful one-line commands. Expand only for non-obvious behavior.

This is newly authored synthesis. It deliberately uses no fixed line count or comment budget. Count retained developer decisions and correct operations, not just fewer words.

## Input Boundary

Read existing env content only from tracked files named exactly `.env.example`. The implementation chooses the committed regular-file blob, not a potentially modified working copy or symlink target. Tracking reduces the input scope; it does not certify that content is secret-free.

Read code and schemas without searching actual env files. Validate newly authored candidate text in memory. If an existing example is untracked, leave it untouched and provide a proposed draft. Do not stage files just to pass this input rule.

The earlier local fixture is untracked. Its concise replacement therefore lives as proposed text in the skill's eval docs. The docs page imports that proposal, preserving the input boundary during builds.

## Source Links

All sources were accessed on 2026-10-09. Branch links reflect the observed branch state and may change; they are not immutable version pins.

- [Poteto's original pstack repository](https://github.com/cursor/plugins/tree/main/pstack), authorship and workflow context.
- [Pstack Unslop](https://github.com/cursor/plugins/blob/main/pstack/skills/unslop/SKILL.md), prose editing rules.
- [Pstack Technical Writing](https://github.com/cursor/plugins/blob/main/pstack/skills/technical-writing/SKILL.md), instruction and reference writing.
- [Matt Pocock's Writing for Agents](https://github.com/mattpocock/skills/blob/main/skills/productivity/writing-for-agents/SKILL.md), current source located after older skill paths returned 404.
- [Matt Pocock's repository rationale](https://github.com/mattpocock/skills#2-the-agent-is-way-too-verbose), shared language.
- [Domain Modeling](https://github.com/mattpocock/skills/blob/main/skills/engineering/domain-modeling/SKILL.md) and [glossary format](https://github.com/mattpocock/skills/blob/main/skills/engineering/domain-modeling/GLOSSARY-FORMAT.md), found upstream after the local dependency was missing.
- [Google: Short Sentences](https://developers.google.com/tech-writing/one/short-sentences), concrete editing methods.
- [Google: Code Samples](https://developers.google.com/style/code-samples), formatting guidance and project-specific conventions.
- [Laravel 13.x tracked template](https://github.com/laravel/laravel/blob/13.x/.env.example) and [configuration docs](https://laravel.com/framework/docs/13.x/configuration).
- [Next.js Supabase tracked template](https://github.com/vercel/next.js/blob/canary/examples/with-supabase/.env.example).
- [Vercel Postgres auth starter tracked template](https://github.com/vercel/nextjs-postgres-auth-starter/blob/main/.env.example), an observed example, not an endorsement of its linked secret generator or current service setup.

See the [revised skill and proposed example](/env-example/introduction/) and [verification record](/env-example/verification/). Source-backed editorial rationale and observed eval results remain separate.
