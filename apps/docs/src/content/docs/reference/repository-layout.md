---
title: Repository layout
description: The public skill collection, plugin manifests, docs app, and progressive-disclosure boundaries.
---

- `Tease:` Every skill has one canonical directory; shared surfaces package and explain the collection.
- `Lede:` The repository separates independently installable skills from marketplace manifests and the public documentation site.
- `Why it matters:` A clear boundary prevents collection branding from leaking into a skill's workflow or creating duplicate sources of truth.
- `Go deeper:` Follow the tree and progressive-disclosure levels below when adding or changing a skill.

The repository keeps one canonical directory per skill and several distribution surfaces.

```text
./
├── .agents/plugins/marketplace.json
├── .claude-plugin/
│   ├── marketplace.json
│   └── plugin.json
├── .codex-plugin/plugin.json
├── apps/docs/
│   ├── src/content/docs/
│   ├── astro.config.mjs
│   └── wrangler.jsonc
├── skills/
│   ├── htma-measure/
│   │   ├── README.md
│   │   ├── SKILL.md
│   │   ├── agents/openai.yaml
│   │   ├── assets/measurement-brief-template.md
│   │   └── references/
│   │       ├── local-paid-quote-adjustment.md
│   │       ├── method-map.md
│   │       └── output-rubric.md
│   └── zach-prompting/
│       ├── SKILL.md
│       ├── agents/openai.yaml
│       └── references/vendor-guidance.md
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

The agent reads only the resource needed for the current step. For example:

- `method-map.md` selects the smallest useful measurement technique;
- `local-paid-quote-adjustment.md` handles local/community paid-price scenarios;
- `output-rubric.md` validates the final memo; and
- `measurement-brief-template.md` provides the durable output frame;
- `README.md` gives humans a concise use-case and installation guide; and
- `vendor-guidance.md` provides conditional GPT-5.6 and Claude Fable 5 guidance.

## Distribution manifests

- `.agents/plugins/marketplace.json` exposes the repository to Codex’s plugin marketplace.
- `.codex-plugin/plugin.json` declares the Codex plugin and version.
- `.claude-plugin/marketplace.json` exposes the same repository as a Claude marketplace.
- `.claude-plugin/plugin.json` points Claude to the canonical `skills/` directory.
- `plugin.json` supplies portable root metadata.

No distribution surface duplicates canonical skill content.
