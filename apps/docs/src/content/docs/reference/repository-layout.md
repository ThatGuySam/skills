---
title: Repository layout
description: The public skill collection, plugin manifests, docs app, and progressive-disclosure boundaries.
---

Each skill has one directory under `skills/`. Root manifests package the collection, and `apps/docs` contains the public guide. Keep reusable skill instructions in the skill directory.

<!-- skills:start:repository-tree -->
Collection files include `skill-catalog.json`, `scripts/skill-catalog.mjs`, the plugin manifests, and `apps/docs/`. Canonical skill directories are:

```text
skills/
├── phone-size/
├── sams-tree/
├── sams-status/
├── sams-env/
├── andrej-explain/
├── migrate-cgpt/
├── sales-research/
├── sams-gen-writing/
├── sams-skill-creator/
├── sam-ux-audit/
├── zach-prompting/
└── htma-measure/
```
<!-- skills:end:repository-tree -->

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
- `measurement-brief-template.md` provides the memo template;
- `README.md` gives humans a concise use-case and installation guide; and
- `vendor-guidance.md` provides conditional GPT-6 Astra, Sol, Luna, and Claude Fable 5 guidance.

## Distribution manifests

- `.agents/plugins/marketplace.json` exposes the repository to Codex's plugin marketplace.
- `.codex-plugin/plugin.json` declares the Codex plugin and version.
- `.claude-plugin/marketplace.json` exposes the same repository as a Claude marketplace.
- `.claude-plugin/plugin.json` points Claude to the canonical `skills/` directory.
- `plugin.json` supplies portable root metadata.

The distribution manifests reference the skill directories without duplicating their content.

Sam’s Tree owns the shared tree-format reference. Sam’s Status bundles an identical copy so either skill installs independently. Both include synthetic evaluation requests and optional Codex UI metadata.
