---
title: Sam's Gen Writing
description: Draft, review, or plan AI-assisted web content for Google Search using Google's published policy and attributed Search Relations guidance.
---

Sam's Gen Writing helps you publish AI-assisted pages that readers value and that stay inside Google Search policy. It judges a page by its purpose and added value, not by whether a model wrote it. It never invents the human parts of a page, and it does not promise rankings.

## Install

```bash
npx skills add thatguysam/skills --skill sams-gen-writing
```

The canonical directory is [`skills/sams-gen-writing`](https://github.com/ThatGuySam/skills/tree/main/skills/sams-gen-writing). Invoke a standalone installation as `/sams-gen-writing` in Claude Code or `$sams-gen-writing` in Codex. The collection bundle uses `/sam:sams-gen-writing`.

## Modes

| Mode | Use it when | You get |
| --- | --- | --- |
| Draft | You want a page written or rewritten from your material. | The page plus a review sheet of `[NEEDS: …]` gaps, claims to verify, metadata to check, and byline and disclosure notes. |
| Review | You have a page, draft, or set of pages to assess. | Findings ordered by policy risk, reader value, trust signals, then polish, each with its source and a fix. |
| Plan | You want AI to produce many pages. | A per-page value gate, human review step, audit sampling, exclusion rule, and authorship plan. |
| Question | You want to know what Google says about a practice. | A direct answer with the evidence tier and date for each claim. |

Every result ends with a status: `ready-for-human-review`, `needs-user-material`, `do-not-publish-as-is`, or `policy-unverified`.

## What it enforces

- **Value over method.** Google's spam policy targets unoriginal pages made to manipulate rankings, however they are made.
- **Write for people, not models.** No LLM-specific page versions, machine-sized chunks, word-count targets, or fake freshness.
- **Add what a model can't.** First-hand experience, original data, testing, and expert judgment come from you. Missing material gets a `[NEEDS: …]` marker.
- **No fabricated people or proof.** The skill will not invent authors, credentials, headshots, reviews, quotes, statistics, or test results.
- **Human review covers metadata.** Titles, meta descriptions, structured data, and alt text are checked along with the body.
- **Scale raises the bar.** Templated, scraped, stitched, or translated pages each need an answer to "what does this page add?"
- **Who and How.** Real bylines where readers expect them, and a short note on how automation was used where readers would ask.
- **Merchant Center labels.** AI-generated images need IPTC `DigitalSourceType` `TrainedAlgorithmicMedia`, and AI-generated product data must be labeled separately.

## Evidence it uses

The skill ranks evidence as formal Search Central documentation, then Search Relations remarks on the Search Off the Record podcast, then guests, then practitioners. It labels inference and treats older remarks (2021–2022) that made human supervision the line as superseded by Google's February 2023 guidance.

- [Using generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) (Google, updated 2026-10-01)
- [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) (Google, updated 2026-10-05)
- [Spam policies for Google web search](https://developers.google.com/search/docs/essentials/spam-policies) (Google, updated 2026-08-28)
- Search Off the Record episodes from 2021 through July 2026, attributed by speaker and date in the skill's [podcast reference](https://github.com/ThatGuySam/skills/blob/main/skills/sams-gen-writing/references/search-off-the-record.md)

Sources were checked on October 7, 2026. The skill re-checks the formal pages when it has web access and reports `policy-unverified` when it cannot.

## Limits

- It covers Google Search only. Other search engines and AI assistants may behave differently.
- It cannot detect AI text and does not claim Google does.
- Podcast remarks are commentary, not policy. Most are short asides; no transcript of a full episode on AI-written content was available, and the December 2025 "Thoughts on SEO & SEO for AI, part 1" episode had no transcript.
- No behavioral pass rate has been measured. See [verification](/sams-gen-writing/verification/).

## Example requests

```text
Use $sams-gen-writing to review this AI-assisted product roundup before I
publish it. Give findings by severity and tell me what first-hand material
I still need.
```

```text
Use $sams-gen-writing to plan how we use AI for 200 location pages without
running into scaled content abuse.
```

```text
Use $sams-gen-writing to draft a how-to post from my notes and photos.
Mark anything you need from me instead of filling it in.
```
