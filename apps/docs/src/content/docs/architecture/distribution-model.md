---
title: Distribution model
description: How one canonical skill reaches the Skills CLI, Codex, Claude Code, and manual consumers.
---

HTMA Measure publishes one source directory and points every installer at it.

## Canonical source

```text
skills/htma-measure/
```

The folder contains the discovery metadata, core instructions, conditional references, output template, and UI metadata.

## Open Skills CLI

The CLI clones the repository, discovers `skills/htma-measure/SKILL.md`, and copies or links that directory into the selected agent’s skill location. It records the source, skill path, and content hash in a lock file.

## Codex

Codex first clones the repository as a marketplace snapshot. The marketplace catalog exposes `htma-measure`, and `.codex-plugin/plugin.json` points the installed plugin at `./skills/`.

## Claude Code

Claude clones the repository as a marketplace. The plugin entry uses `"source": "./"`, so Claude copies the plugin from the same checkout instead of cloning the public repository a second time.

## Manual consumers

Any compatible agent can load `SKILL.md` directly and resolve its relative `references/`, `assets/`, and `agents/` paths.

## Versioning

- Codex and root plugin metadata currently report `0.1.1`.
- Plugin metadata changes bump the version so cached installations can update.
- The Open Skills CLI tracks the skill folder’s content hash independently.
- Documentation deploys do not duplicate or rewrite the canonical skill.
