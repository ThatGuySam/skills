---
title: Andrej Explain
description: Install the skill and turn complex material into an explanation you can inspect.
---

```bash
npx skills add ThatGuySam/skills --skill andrej-explain
```

```text title="Example prompt" wrap
Use $andrej-explain to explain this diff to a junior developer: what changed, why, the important edge case, and what the tests don't prove. Keep it under 300 words.
```

## Why use it

**Understand an idea or an agent's work without taking it on faith.**

- **Use it when:** a concept, change, or agent result is hard to follow.
- **You get:** an explanation grounded in the actual material, as text, a diagram, interactive HTML, or video, whichever fits the question.
- **Limit:** it separates what was tested from what is inferred, and does not build an interactive page just because it can.

Invoke it as `$andrej-explain` in Codex, `/andrej-explain` in Claude Code, or `/sam:andrej-explain` with the collection bundle. The core workflow needs no API key; diagrams, rendering, and narration depend on your agent's tools.

## Go deeper

- [Examples](/andrej-explain/examples/): copyable prompts for rewriting, diagrams, HTML, and video.
- [Behavior and formats](/andrej-explain/reference/): inputs, output checks, and tool limitations.
- [Testing and troubleshooting](/andrej-explain/verification/): a quick smoke check, recorded checks, and limits.
- [Research](/research/andrej-explain-2026-10-01/): the sources and design decisions.

The name is inspired by [Andrej Karpathy's post](https://x.com/karpathy/status/2105819303471976479) about understanding language-model outputs. This independently authored skill is not affiliated with or endorsed by him.
