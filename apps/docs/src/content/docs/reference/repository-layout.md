---
title: Repository layout
description: The public skill package, plugin manifests, docs app, and progressive-disclosure boundaries.
---

The repository keeps one canonical skill directory and several distribution surfaces.

```text
skills/
├── .agents/plugins/marketplace.json
├── .claude-plugin/
│   ├── marketplace.json
│   └── plugin.json
├── .codex-plugin/plugin.json
├── apps/docs/
│   ├── src/content/docs/
│   ├── astro.config.mjs
│   └── wrangler.jsonc
├── skills/htma-measure/
│   ├── SKILL.md
│   ├── agents/openai.yaml
│   ├── assets/measurement-brief-template.md
│   └── references/
│       ├── local-paid-quote-adjustment.md
│       ├── method-map.md
│       └── output-rubric.md
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── plugin.json
```

## Progressive disclosure

### Level 1: discovery metadata

Agents read the `name` and `description` in `SKILL.md` to decide whether the skill applies.

### Level 2: core workflow

When activated, the agent reads `SKILL.md`. It contains the sequence, output contract, stop conditions, and verification gate.

### Level 3: conditional resources

The agent reads only the resource needed for the current step:

- `method-map.md` selects the smallest useful measurement technique;
- `local-paid-quote-adjustment.md` handles local/community paid-price scenarios;
- `output-rubric.md` validates the final memo; and
- `measurement-brief-template.md` provides the durable output frame.

## Distribution manifests

- `.agents/plugins/marketplace.json` exposes the repository to Codex’s plugin marketplace.
- `.codex-plugin/plugin.json` declares the Codex plugin and version.
- `.claude-plugin/marketplace.json` exposes the same repository as a Claude marketplace.
- `.claude-plugin/plugin.json` points Claude to the canonical `skills/` directory.
- `plugin.json` supplies portable root metadata.

No distribution surface duplicates the skill content.
