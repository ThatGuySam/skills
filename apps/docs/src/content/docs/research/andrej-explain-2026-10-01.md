---
title: Research behind Andrej Explain
description: Merged Karpathy research, explainer design evidence, skill-authoring practices, and implementation decisions.
---

Research initiated October 1, 2026; implementation and follow-up checks October 2, 2026 UTC. This memo merges two research threads and records the decisions used to build `andrej-explain`. It supersedes the earlier working names `build-understanding` and `explain`.

The recommendation is a bounded explanation workflow: inspect the source, establish the question, select the simplest useful format, preserve meaning, and verify the delivered artifact. Richer presentation does not by itself establish better understanding.

## Originating post and reconciliation

The earlier thread found [Karpathy's original post](https://x.com/karpathy/status/2105819303471976479) through a matching [mirror](https://twstalker.com/karpathy/status/2105819303471976479). This resolves the missing-permalink item in the first memo. Direct X retrieval remained blocked, and the mirror could not be retrieved again during this implementation pass. The match is carried-forward evidence from that thread, supported by the user-supplied text and screenshot; an absolute publication date is not independently verified here.

The post proposes STE-inspired writing, diagrams, HTML pages, and custom narrated videos as ways to understand increasingly autonomous model work. Its ordering is an invitation to experiment, not comparative learning evidence.

The [earlier HTML post](https://x.com/karpathy/status/2053872850101285137) is distinct. A [third-party captured thread](https://github.com/huajuan404/md2html/blob/main/karpathy-x-2053872850101285137-thread.md) corroborates that earlier link; it must not be substituted for the screenshot's post.

The other thread also corrected the supplied STE chart: its TEST verb entry conflicts with the official Issue 9 dictionary, which lists TEST as a noun. Official indexed PDF excerpts were checked again during implementation. The complete PDF was not retrieved, so this is a specific correction, not an audit of every rule in the chart.

## Karpathy's related writing

| Source | What it contributes | Evidence limit |
| --- | --- | --- |
| [2025 LLM Year in Review](https://karpathy.bearblog.dev/year-in-review-2025/), December 19, 2025 | Sections on disposable software and interfaces beyond chat explain why bespoke artifacts can be economical. | A forecast and design argument, not an evaluation of this skill. |
| [Sequoia Ascent 2026](https://karpathy.bearblog.dev/sequoia-ascent-2026/), April 30, 2026 | Understanding remains necessary to direct agents, assess suspicious outputs, and choose tradeoffs. | The page discloses an AI-generated summary and cleaned transcript reviewed by the author. The thinking/understanding phrase is quoted by him. |
| [Thinking versus understanding post](https://x.com/karpathy/status/2049907410303865030) | Related expression of the oversight problem. | Content/link corroborated through Eidhof's essay; X itself unavailable. |
| [microgpt](https://karpathy.github.io/2026/02/12/microgpt/) and [implementation](https://karpathy.ai/microgpt.html), February 12, 2026 | A small complete mechanism can be more revealing than a production-sized implementation. | A craft example, not an automatic recipe for every domain. |
| [LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) | Keep raw evidence distinguishable from synthesis and conventions. | Useful architecture pattern; a wiki is not required for a one-off explanation. Comments are not treated as Karpathy's writing. |

## Writing, visuals, and learning

| Primary source or implementation | Decision informed | Limit |
| --- | --- | --- |
| [ASD-STE100 official site](https://www.asd-ste100.org/), [FAQ](https://www.asd-ste100.org/faq.html), [Issue 9 PDF](https://www.asd-ste100.org/assets/files/ASD-STE100_ISSUE9.pdf) | Stable terminology and simple sentences; strict compliance requires the complete rules and dictionary. | Official site/search excerpts available; full specification retrieval blocked. Issue 9 dated January 15, 2025. No dictionary bundled. |
| [Bret Victor, Explorable Explanations](https://worrydream.com/ExplorableExplanations/), 2011 with 2024 postscript | Give controls a real explanatory purpose and preserve a coherent reading path without interaction. | Design demonstrations, not a universal effectiveness estimate. |
| [Mayer and Moreno, Nine Ways to Reduce Cognitive Load in Multimedia Learning](https://doi.org/10.1207/S15326985EP3801_6), 2003; [paper copy](https://www.uky.edu/~gmswan3/544/9_ways_to_reduce_CL.pdf) | Segment, coordinate words and visuals, place labels nearby, remove distractions. | Specific experimental conditions; not a guarantee for arbitrary generated media. Captions remain available for accessibility. |
| [Mayer, Using multimedia for e-learning](https://onlinelibrary.wiley.com/doi/abs/10.1111/jcal.12197), 2017 | Further support for signaling, coherence, and manageable pacing. | Do not generalize beyond the studied tasks and populations. |
| [Animation composition principle](https://doi.org/10.1017/9781108894333.033), 2021 | Motion must explain something; animation is not automatically better than static graphics. | Publisher summary inspected, full chapter not inspected. |
| [Andy Matuschak, Why books don't work](https://andymatuschak.org/books/) | Reading fluent exposition does not demonstrate durable understanding. | Essay with research references; optional application checks do not establish efficacy. |
| [Olah and Carter, Research Debt](https://distill.pub/2017/research-debt/) | Clarify the conceptual mechanism before polishing presentation. | Research communication argument. |
| [Grant Sanderson, Taylor series](https://www.3blue1brown.com/lessons/taylor-series/) | Motivate a concrete problem and build the representation gradually. | Use original explanatory craft, not branding or voice impersonation. |
| [Chris Eidhof, Learning in the age of LLMs](https://chris.eidhof.nl/post/learning-in-the-age-of-llms/), June 2, 2026 | Small manual examples exposed a problem that repeated generation did not resolve. | Practitioner counterexample, not evidence against all AI teaching. |
| [Simon Willison's HTML experiment](https://simonwillison.net/2026/May/8/unreasonable-effectiveness-of-html/), May 8, 2026 | Specify the explanatory target: an attractive page can explain the wrong part. | One documented experiment. |
| [Thariq Shihipar's HTML examples](https://github.com/ThariqS/html-effectiveness) | Standalone, dependency-free pages can cover many one-off explanation tasks. | Twenty samples with fictional scenarios/data; repository says not maintained. No source copied. |

## Skill-authoring and documentation practices

The [Agent Skills authoring guide](https://agentskills.io/skill-creation/best-practices) recommends grounded, focused workflows, moderate detail, clear defaults, and conditional resources. Its [evaluation guide](https://agentskills.io/skill-creation/evaluating-skills) recommends representative prompts, fresh contexts, concrete assertions, and baseline comparisons for improvement claims. Applied here: a small core contract, two conditional operating references, provenance separate from runtime instructions, and retained forward-use outputs. These initial tests do not establish superiority over an ordinary explanation prompt.

[Matt Pocock's writing-for-agents skill](https://github.com/mattpocock/skills/blob/main/skills/productivity/writing-for-agents/SKILL.md) makes reference pointers explicit about what they contain and when to read them. His [teach skill](https://github.com/mattpocock/skills/blob/main/skills/productivity/teach/SKILL.md) provides a useful deeper-learning comparison: mission-led interactive sessions and learning records. `andrej-explain` stays bounded to the current explanation; it does not silently create a curriculum or learner database.

[PStack's teach skill](https://github.com/cursor/plugins/blob/main/pstack/skills/teach/SKILL.md) preserves uncertainty and builds diagrams progressively, but explicitly avoids quizzes. We resolve that difference by allowing a small application question only for a learning request. Quick answers and review tasks do not need a quiz.

[Zach Prompting](https://github.com/ThatGuySam/skills/blob/main/skills/zach-prompting/SKILL.md) governed the authoring pass: preserve evidence and permissions, use observable instructions, make optional tools conditional, and define completion. It is an authoring aid, not an installation dependency.

[Stripe's payments quickstart](https://docs.stripe.com/payments/quickstart) pairs executable setup steps with an observable try-it result. [Stripe's Markdoc article](https://stripe.dev/blog/markdoc) describes interactive documentation. Our adaptation is an installation-to-first-result guide, copyable prompts, explicit prerequisites, expected outcomes, separate behavior reference, and verification/troubleshooting. These are design choices informed by Stripe's docs, not a claim that Stripe prescribes this exact skill structure. The existing Starlight application stays in place; no payments integration or Markdoc migration is needed.

## Preserved contract and changes from the drafts

| Zach Prompting check | Applied decision |
| --- | --- |
| Preserve | Source fidelity, meaningful media, accessible fallbacks, privacy, authorized autonomy, artifact verification |
| Clarify | Smallest useful format; actual source inspection; strict STE versus adapted prose; storyboard versus video |
| Remove | Working names; mandatory closing “Compression Check”; a fixed media escalation ladder |
| Conditionalize | STE rule lookup, rendering, narration, interactive pages, learning questions, background sources |
| Stop | Deliver and check the explanation, or complete useful work and name the remaining blocker |

The compulsory closing check in the earlier blueprint became an internal fidelity check plus disclosure only when a material omission affects use. This keeps a two-sentence request possible without weakening the evidence contract.

## Confidence and remaining research

Confidence is high in the relevance of the cited primary sources, moderate in the suitability of the combined workflow for the requested use, and unmeasured for human learning outcomes. The permalink has a documented indirect verification path; no absolute date is invented.

Next evidence should come from real uses and, if claiming improvement, paired baseline comparisons. Useful future cases include an unfamiliar PR with a hidden state bug, a misleading causal claim, dense mobile diagrams, a completed narrated render, and a learner applying the explanation to a new problem. Measure factual fidelity and task success separately from appearance. Human learning claims need human evidence.

See [verification](/andrej-explain/verification/) for the actual implementation checks and current gaps. Repository publication and website deployment are separate states.
