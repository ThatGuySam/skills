---
title: Task-focused docs and a checked skill catalog
description: Stripe, Cloudflare, and Google documentation practices applied to Skill Creator and collection listings.
sidebar:
  badge:
    text: Research
    variant: tip
---

Research date: October 20, 2026. Scope: make Skill Creator usable from a first install, then keep complete collection listings aligned with the published skills.

## Local findings

The published repository contains twelve independently installable skills. Skill Creator has one combined introduction. The homepage, collection table, installation names, and invocation table omit different skills. Plugin manifests discover `skills/` automatically; human lists are maintained separately. There is no GitHub Actions workflow.

Readers need a direct path to a checked result. Maintainers need one catalog and an automated failure when a skill or guide disappears from that path.

## Evidence and application

| Source | Supported practice | Application |
| --- | --- | --- |
| [Stripe's Markdoc engineering article](https://stripe.com/blog/markdoc), Ryan Paul, September 13, 2022 | Reusable presentation separates code from prose. Schemas and link checks run in CI. | Shared catalog data generates lists and supplies sidebar navigation. CI rejects drift and missing routes. |
| [Stripe Checkout quickstarts](https://docs.stripe.com/payments/checkout/quickstarts) | Task choices lead to focused integrations. | One installation path and a concrete first task, with separate examples for other tasks. |
| [Cloudflare tutorial guidance](https://developers.cloudflare.com/style-guide/documentation-content-strategy/content-types/tutorial/) | A tutorial builds a working result through visible steps. Conceptual detail belongs elsewhere. | Prerequisites, commands, a request, and expected artifacts appear in the quickstart. Reference and evaluation limits have linked pages. |
| [Google's procedure guidance](https://developers.google.com/style/procedures) | State context before an action, order steps, describe results, and avoid repeating procedures. | Setup names its working directory and success receipt. Other examples link to setup. |
| [Markdoc validation documentation](https://markdoc.dev/docs/validation) and its [source](https://github.com/markdoc/docs/blob/main/pages/docs/validation.md) | Syntax and custom document constraints can be checked before rendering. | Deterministic collection checks run before the Astro build. |

These patterns do not require migrating Starlight to Markdoc. The current framework already supports Markdown, navigation, search, and full text exports.

## Source ranking and limits

The [2022 HN discussion](https://news.ycombinator.com/item?id=31341083) and [Lobsters discussion](https://lobste.rs/s/errk9j/markdoc_stripe_s_documentation_system_is) helped identify authoring and maintenance questions. They are anecdotal discovery sources. Implementation decisions rely on the primary documentation and source code in the table.

Stripe's article is older but remains a direct account of its documentation design. Google's and Cloudflare's guides were checked for this pass. We infer that these patterns fit this collection because the local failures concern repeated lists and first-use guidance. No usability study or comparative documentation performance measurement was conducted.

## Selected design

The central JSON catalog stores titles, summaries, guide routes, and navigation groups. Canonical `skills/*/SKILL.md` files retain portable runtime instructions. Independent filesystem discovery checks exact membership, so a new skill cannot silently disappear from the website.

Two designs were compared. Distributed documentation frontmatter could derive a catalog, but shared Tree and Status pages and HTMA's multi-directory navigation make one explicit registry easier to inspect. Both designs need filesystem validation. That check is retained in the selected design.

Generated Markdown keeps lists visible in GitHub source and the agent corpus. The sidebar reads the same catalog. Check mode rejects stale generated regions without rewriting files. Tests exercise missing and removed skills, route failures, and stale outputs. The [catalog maintenance guide](https://github.com/ThatGuySam/skills/blob/main/CONTRIBUTING.md#update-the-skill-catalog) gives the contributor workflow.

## Avoid

Do not add personalized client logic merely to resemble Stripe's docs. Keep required setup visible. Label illustrative outputs separately from measured results. A passing docs build does not establish skill behavior.

The creator docs preserve dated evaluation claims and identify untested discovery and business-execution cases. Production verification checks changed pages and `llms-full.txt`; a successful deployment response alone does not prove the intended content shipped.
