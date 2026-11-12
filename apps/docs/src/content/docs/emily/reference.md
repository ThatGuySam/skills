---
title: Emily reference
description: Modes, bundled sources, the modernity check, inputs and outputs, edge cases, and rights for the Emily skill.
---

Emily answers etiquette questions from a bundled corpus of Emily Post's public-domain books. It separates what the source says from what the skill infers, and it checks each historical rule before recommending it.

## Behavior

The skill picks one of four modes.

| Mode | What it does |
| --- | --- |
| Guide (default) | Recommends what to do now. |
| Historical | Explains what the original publication says and how its setting shaped the rule. |
| Apprentice | Shows the reasoning so you can learn the underlying principle. |
| Voice | Writes a labeled pastiche. It never claims the words are Emily Post's. |

Before answering, it runs a local search over the corpus, usually twice: once for the concrete situation and once for the principle behind it. It cites the chunk ID, book, year, chapter, and section of each passage it uses.

Each historical rule is then sorted into one of three classes.

| Class | Meaning |
| --- | --- |
| Durable principle | Protects someone's dignity, time, comfort, privacy, or ability to choose. It can carry over. |
| Contextual convention | May still help in a formal setting, but is optional or depends on culture. |
| Historical-only rule | Depends on rigid class, race, gender, marital, religious, labor, disability, or rank assumptions. It is described, not prescribed. |

Safety, consent, accessibility, honest boundaries, and anti-harassment norms override ceremony. For current, digital, cross-cultural, or identity questions that the 1922 text does not cover, the skill reasons from short original summaries of current Emily Post Institute pages and labels that reasoning as modern.

## Inputs & outputs

Describe the situation: who is involved, how you know them, and what was asked or offered. The skill asks one clarifying question only when a missing fact would change the answer.

A Guide answer has these parts, combined when the situation is simple:

1. **Recommendation.** The clearest next step.
2. **Why.** Who is affected and which principle controls.
3. **Historical evidence.** Citations labeled `direct` or `inference`.
4. **Present-day adaptation.** What changed and why.
5. **Wording you can use.** Exact language when useful.
6. **Confidence.** High, medium, or low, with the fact most likely to change the answer.

The search script runs on Node 24 or later, or on Bun. Without either, the skill searches the bundled text files directly.

## Sources

| Work | Year | Role |
| --- | --- | --- |
| *Etiquette: In Society, in Business, in Politics and at Home* | 1922 | Primary advice. Treated as Emily Post evidence. |
| *The Personality of a House* | 1930 | Adjacent context for homes and hospitality. Lower authority. |
| *By Motor to the Golden Gate* | 1916 | Style only. Used in Voice mode. |
| *The Title Market* | 1909 | Style only. Used in Voice mode. |

The texts come from Project Gutenberg and the Internet Archive at pinned hashes. The skill's [source map](https://github.com/ThatGuySam/skills/blob/main/skills/emily/references/source-map.md) lists the links, hashes, and exclusions. Later editions, columns, and Institute articles are not bundled as full text.

## States & edge cases

| Situation | Response |
| --- | --- |
| The corpus has no rule on the topic | Says so plainly, then gives a labeled modern recommendation. |
| You ask what Emily Post herself said and there is no direct match | Leads with that fact. It does not substitute a quotation from the Institute, a later edition, or itself. |
| A modern channel such as email or group chat | The link from the historical passage to the modern channel is labeled `inference`. |
| A passage from the 1930 book | Paraphrased by default. The text is uncorrected OCR, so an exact quotation needs checking against the page scan. |
| The 1922 introduction, "Manners and Morals" | Excluded. Richard Duffy wrote it, not Emily Post. |
| Paid household work | Rejects the historical servant hierarchy and states the present-day baseline: fair pay, a realistic workload, rest, privacy, safety, and current labor law. |
| Names and pronouns | Sharing your own pronouns is optional. Using the name and pronouns someone asks for is the default. |
| Sources conflict | Says so and explains which principle carries more weight now. |

## Data shape

There is no output schema. The search index is `references/corpus/chunks.jsonl`, with 1,619 chunks across the four sources. Each chunk has an ID, source, year, chapter, section, role (`primary-advice`, `adjacent-advice`, or `style-only`), and a chapter-level modernity label. That label is a starting point for triage, not a verdict on the passage.

## Rights and identity

The skill's instructions and scripts are MIT licensed. The bundled books are included on the basis that they are in the public domain in the United States. Copyright status varies by country: Emily Post died in 1960, so some life-plus-70 jurisdictions may protect her writing through the end of 2030. See the skill's [license](https://github.com/ThatGuySam/skills/blob/main/skills/emily/LICENSE.md) before redistributing the texts outside the United States.

This independent skill is not affiliated with or endorsed by the Emily Post Institute.
