---
name: sams-gen-writing
description: Draft, review, or plan AI-generated or AI-assisted web content meant to appear in Google Search. Applies Google's published policy and Search Relations guidance on value, human review, scale, disclosure, and authorship without inventing experience or ranking claims.
---

# Sam's Gen Writing

## Goal

Help the user publish AI-assisted pages that a reader would value and that stay inside Google Search policy. The test is the page's purpose and value, not whether a model wrote it.

Done means the user has a draft, review, or plan that:

- adds something a reader cannot get from a generic model answer;
- has every factual claim and every piece of search-visible metadata marked as checked or still to check;
- names who is responsible for the page and, where readers would ask, how it was made; and
- separates Google's formal policy from Search Relations commentary and from your own inference.

## Select the mode

- **Draft:** Write or rewrite a page with the user's material. Return the draft and its review sheet.
- **Review:** Assess an existing page, draft, or set of pages. Report findings; do not rewrite unless asked.
- **Plan:** Design a workflow or program that uses AI to produce many pages. Gate it on per-page value before volume.
- **Question:** Answer what Google says about a specific practice, with the evidence tier for each claim.

Infer the mode from the request. Ask only when a wrong guess would change what gets published.

## Rules

1. **Judge purpose and value, not production method.** Google's spam policy targets unoriginal pages made mainly to manipulate rankings, however they are made. AI use is neither a violation nor a defense.
2. **Write for readers who would arrive directly.** Do not produce a separate version for LLMs or AI features, split pages into "bite-sized chunks" for machines, chase word counts, or change dates without substantive changes.
3. **Add what the model cannot.** Ask the user for first-hand experience, original data, photos, testing, local knowledge, or expert judgment. Apply the "anyone could have written this" test to every section. If the user has none, say the page is a commodity summary and recommend not publishing it or merging it.
4. **Never fabricate the human layer.** Do not invent experience, test results, quotes, customer reviews, statistics, credentials, author names, or headshots. Insert `[NEEDS: …]` markers for material only the user can supply. Fabricated creator profiles are deceptive under Google's guidance; decline that part and offer the honest version.
5. **Require human review before publishing.** Every claim needs a source or a named human check. Review title elements, meta descriptions, structured data, and image alt text as well as body text, because they can appear in Search results.
6. **Treat scale as the main risk multiplier.** Many pages from templates, feeds, scraped or stitched sources, translations, or synonym swaps need a per-page answer to "what does this page add?" Prefer fewer, better pages. Recommend excluding low-value generated sections from Search.
7. **Make Who and How visible.** Use real bylines where readers expect them, linked to author information. Add a short, audience-appropriate note on how automation was used where a reader might ask "How was this created?"
8. **Apply feature-specific requirements when they apply.** For Google Merchant Center, AI-generated images need IPTC `DigitalSourceType` `TrainedAlgorithmicMedia`, and AI-generated product titles and descriptions must be labeled separately. Validate structured data against Google's guidelines.
9. **Use AI where it helps the writer.** Brainstorming, outlines, a first draft to react against, and wording variations are reasonable uses. The human rewrite carries the voice, judgment, and experience.

## Evidence

Read [Google policy](references/google-policy.md) for formal requirements and [Search Off the Record findings](references/search-off-the-record.md) for attributed commentary and history.

- Rank evidence: formal Search Central documentation, then Search Relations statements on the podcast, then guests, then practitioners. Label the tier when it matters.
- Re-check the formal pages when the answer depends on current policy and you have web access. Report the date checked; if you cannot check, give the reference date.
- Do not promise rankings, traffic, or penalty outcomes. Google does not publish a ranking effect for disclosure, bylines, or E-E-A-T, and raters' guidelines do not directly affect ranking.
- Do not claim AI-detection results or that Google "detects AI." Google's documents talk about value, effort, originality, and purpose.
- Mark generalization from podcast remarks or practitioner anecdotes as inference. Treat 2021–2022 remarks requiring human supervision as superseded by the February 2023 guidance unless the user asks about history.
- This skill covers Google Search. Do not assume the same rules for other search engines or AI assistants.

## Output

Match the mode and the user's format. Include only what helps:

- **Draft:** the page; then a review sheet listing `[NEEDS: …]` gaps, claims to verify with suggested sources, metadata to check, the byline and How note, and any scale or feature-specific requirement.
- **Review:** findings ordered by severity: policy risk (spam policies, deception), then reader value, then trust signals, then polish. Each finding gives the evidence, the rule, its source tier, and a concrete fix.
- **Plan:** the per-page value gate, human review step, sampling rate for audits, exclusion rule for low-value pages, and how disclosure and authorship work.
- **Question:** a short answer, then the supporting evidence with tiers and dates.

End with a status:

- `ready-for-human-review`: no known gaps beyond final human checks;
- `needs-user-material`: `[NEEDS: …]` gaps remain;
- `do-not-publish-as-is`: policy risk or no added value; or
- `policy-unverified`: the answer depends on current pages you could not check.
