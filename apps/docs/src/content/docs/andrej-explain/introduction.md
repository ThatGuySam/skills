---
title: Andrej Explain
description: Install the skill and turn complex material into an explanation you can inspect.
---

Use `andrej-explain` to understand an idea, inspect an agent's work, or make a technical explanation easier to follow. It chooses text, diagrams, interactive HTML, or video according to the question. An explicit format request takes priority when the tools support it.

## Install

You need an agent that supports Agent Skills. The core workflow needs no API key or companion skill. Browsing, file creation, rendering, and narration depend on the host agent's tools.

```bash
npx skills add thatguysam/skills --skill andrej-explain
```

In Codex, use `$andrej-explain`. In standalone Claude Code, use `/andrej-explain`; in the collection bundle, use `/sam:andrej-explain`. See [collection installation](/collection/installation/) for the bundle.

## Try it

```text
Use $andrej-explain to explain this change to a junior developer.
Read the diff and tests. Show what changed, why, the important boundary
case, and what the tests do not establish. Keep it under 300 words.

[Attach the diff and relevant files.]
```

Expect an explanation grounded in the actual code, with an example and a clear distinction between tested behavior and inference. The agent should not invent successful tests or create an interactive page merely because it can.

For a quick smoke check, use this self-contained example:

```text
Use $andrej-explain to explain cache TTL in two sentences.
No diagram or quiz.
```

A successful response explains how long a cached value can be reused before it becomes stale, stays within two sentences, and respects the requested format.

## Choose the next step

- [Examples](/andrej-explain/examples/) has copyable prompts for rewriting, diagrams, HTML, and video.
- [Behavior and formats](/andrej-explain/reference/) describes inputs, output checks, and tool limitations.
- [Verification](/andrej-explain/verification/) records the checks and their limits.
- [Merged research](/research/andrej-explain-2026-10-01/) explains the sources and design decisions.

The name is inspired by [Andrej Karpathy's post](https://x.com/karpathy/status/2105819303471976479) about understanding language-model outputs. This independently authored skill is not affiliated with or endorsed by him.
