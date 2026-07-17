---
title: Distribution model
description: How canonical skill directories reach the Skills CLI, Codex, Claude Code, and manual consumers.
---

- `Tease:` One canonical skill directory can travel through several installation surfaces.
- `Lede:` Sam's Skills keeps workflow content under `skills/` and uses shared manifests only to package, discover, and namespace the collection.
- `Why it matters:` Separating content from distribution prevents copied instructions from drifting and keeps each skill independently installable.
- `Go deeper:` Follow the surface-specific behavior and versioning rules below.

The repository publishes one canonical directory per skill and keeps distribution metadata at the root.

## Canonical sources

```text
skills/
├── htma-measure/
└── zach-prompting/
```

Each folder contains its own discovery metadata, core instructions, conditional resources, and UI metadata. Distribution surfaces point to these directories rather than duplicating their content.

## Open Skills CLI

The CLI clones or reads the repository, discovers every `skills/*/SKILL.md`, and lets the user select one skill. It copies or links only the selected directory into the target agent's skill location and records the source, skill path, and content hash in a lock file.

This is the narrowest installation route for Zach Prompting or HTMA Measure.

## Codex marketplace bundle

Codex first clones the repository as a marketplace snapshot. The marketplace catalog retains the stable install ID `htma-measure`, while `.codex-plugin/plugin.json` points release `0.2.1` at `./skills/` and presents the collection as **Sam's Skills**.

Installing that plugin exposes every current skill. The stable install ID avoids breaking existing marketplace installations; it does not control a skill's name or Claude command prefix.

## Claude Code marketplace bundle

Claude clones the repository as a marketplace. The plugin entry uses `"source": "./"`, so Claude copies the plugin from the same checkout instead of cloning the public repository a second time. Claude automatically discovers the skill directories under the plugin root's `skills/` folder.

The marketplace install ID remains `htma-measure`, but the plugin manifest sets the collection namespace to `sam`. Bundled Claude Code commands therefore use `/sam:<skill>`, including `/sam:zach-prompting` and `/sam:htma-measure`. A standalone Skills CLI installation uses the unbundled skill name.

## Manual consumers

Any compatible agent can load a chosen `SKILL.md` directly and resolve its relative `references/`, `assets/`, and `agents/` paths.

## Versioning

- Codex and root plugin metadata report `0.2.1` for the two-skill collection.
- Claude uses the repository commit when the plugin manifest omits an explicit version.
- Plugin metadata changes bump the root and Codex versions so cached installations can update.
- The Open Skills CLI tracks each selected skill folder's content hash independently.
- Documentation deploys do not duplicate or rewrite canonical skill content.
