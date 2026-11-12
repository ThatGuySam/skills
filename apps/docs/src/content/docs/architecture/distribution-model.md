---
title: Distribution model
description: How canonical skill directories reach the Skills CLI, Codex, Claude Code, and manual consumers.
---

The repository keeps each skill in `skills/<name>/`. The Skills CLI installs those directories directly. The Codex and Claude Code bundle installs generated copies in `bundle/`, rebuilt from `skills/` so the instructions are maintained in one place.


## Canonical sources

<!-- skills:start:distribution-tree -->
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
├── htma-measure/
├── agent-verify/
├── activity-monitor/
└── emily/
```
<!-- skills:end:distribution-tree -->

Each folder contains discovery metadata, instructions, supporting resources, and UI metadata. Installers use these directories.

## Open Skills CLI

The CLI clones or reads the repository, discovers every `skills/*/SKILL.md`, and lets the user select one skill. It copies or links only the selected directory into the target agent's skill location and records the source, skill path, and content hash in a lock file.

This is the narrowest installation route when only one skill is needed.

## Generated bundle

The marketplace installs `bundle/`, not the repository root. `node scripts/skill-catalog.mjs` copies each canonical skill into `bundle/skills/<name>/`. The copy drops a leading `sams-` or `sam-` from the folder and frontmatter `name`, and adds `metadata.internal: true`. Both agents name bundled skills `<plugin>:<name>`, so this gives `sams:tree` instead of `sams:sams-tree`. The internal flag keeps the Skills CLI from offering the copies alongside the canonical skills. The docs build fails if the bundle is stale.

The plugin manifests live in `bundle/` as well. A `.codex-plugin/plugin.json` at the repository root would make Codex prefix every canonical skill, even a standalone symlink into a clone.

## Codex marketplace bundle

Codex clones the repository as a marketplace snapshot. `.agents/plugins/marketplace.json` points at `./bundle`, where `.codex-plugin/plugin.json` names the plugin `sams` and presents the collection as Sam's Skills. Installing it exposes every skill as `$sams:<name>`.

## Claude Code marketplace bundle

Claude clones the repository as a marketplace. The plugin entry uses `"source": "./bundle"`, so Claude copies the plugin from the same checkout instead of cloning the public repository a second time. Claude always discovers the plugin root's `skills/` folder, which is why the bundle is its own plugin root. Bundled commands use `/sams:<name>`, such as `/sams:tree` and `/sams:htma-measure`.

## Manual consumers

Any compatible agent can load a chosen `SKILL.md` directly and resolve its relative `references/`, `assets/`, and `agents/` paths.

## Versioning

- The portable, Codex, and Claude manifests in `bundle/` carry the same collection version.
- `bundle/plugin.json` declares the portable Agent Plugins schema; the Codex overlay supplies compatible presentation metadata.
- Bump all three versions for package changes so cached installations can update.
- The Open Skills CLI tracks each selected skill folder's content hash independently.
- Documentation deploys do not duplicate or rewrite canonical skill content.
