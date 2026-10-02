---
title: Andrej Explain examples
description: Copyable prompts for text, diagrams, interactive HTML, and video explainers.
---

Replace bracketed fields with your material. Include the practical question when it is not obvious. You can request a format directly or let the skill select one.

## Make a procedure clearer

```text
Use $andrej-explain to rewrite this in STE-inspired English.
Keep every condition, exception, number, unit, and warning.
Do not claim strict ASD-STE100 compliance.

[Paste the procedure.]
```

Expect clearer language with unchanged meaning. Strict STE is a different request: it requires the applicable complete specification and dictionary. “80% STE” is a style preference, not a compliance score.

## Reveal a relationship

```text
Use $andrej-explain to show how requests flow through this system.
Read [files or architecture source]. Create a compact diagram with
clear arrow meanings and explain the failure branch. Flag unknowns.
```

Expect a diagram that separates flow, dependency, and causation. The explanation should identify missing evidence rather than fill gaps with plausible architecture.

## Explore a model

```text
Use $andrej-explain to create a self-contained HTML explanation of a
toy cache. An item starts at t=0 and is fresh only while elapsed < TTL.
Let me vary elapsed time and TTL from 0 to 10 seconds. Explain equality
and TTL=0, include reset, and keep the main lesson readable without JS.
Label this as an illustration rather than a real cache specification.
```

Expect controls that change the result, a useful starting example, visible units and limits, and checked boundary behavior. HTML source alone does not establish that the page renders or works with a keyboard. See the [retained evaluation artifact](https://github.com/ThatGuySam/skills/blob/main/evals/andrej-explain/cache-ttl.html).

## Inspect a claim

```text
Use $andrej-explain to explain this research result for a product decision.
Separate the measured association from any causal interpretation.
Preserve the study's limitations. Include a visual only if it helps.

[Attach the paper or relevant passage.]
```

Expect claims traceable to the source and uncertainty that survives simplification.

## Request a video

```text
Use $andrej-explain to create a 45-second narrated explainer showing
why binary search halves the search space. Build one worked example.
Use original visuals, synchronized narration, and captions or a transcript.
Check available rendering and audio tools first. If a finished video is
not possible, deliver the useful source or storyboard and label the gap.
```

Expect an actual checked video when the tools permit it. If they do not, expect an honestly labeled fallback. No particular paid narration service is required.
