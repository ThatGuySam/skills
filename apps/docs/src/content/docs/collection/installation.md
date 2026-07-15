---
title: Install Sam's Skills
description: Install one skill or the full collection in Codex, Claude Code, and compatible agents.
---

- `Tease:` Install one workflow or bring in Sam's whole collection.
- `Lede:` The open Skills CLI installs one canonical skill at a time; the marketplace bundle installs every skill currently published here.
- `Why it matters:` The narrow path keeps agent context small, while the bundle makes Sam's full toolkit available under one collection namespace.
- `Go deeper:` Use the real commands below, then invoke the skill by its standalone or bundled name.

## See what is available

```bash
npx skills add thatguysam/skills --list
```

The current repository publishes `zach-prompting` and `htma-measure`.

## Install one skill

```bash
npx skills add thatguysam/skills --skill zach-prompting
```

```bash
npx skills add thatguysam/skills --skill htma-measure
```

## Install the collection in Codex

```bash
codex plugin marketplace add thatguysam/skills
codex plugin add htma-measure@thatguysam-skills
```

The stable plugin install key predates the multi-skill collection. Installing it loads every canonical directory under `skills/`; individual Codex skill selectors remain `$zach-prompting` and `$htma-measure`.

## Install the collection in Claude Code

```bash
claude plugin marketplace add https://github.com/ThatGuySam/skills.git
claude plugin install htma-measure@thatguysam-skills
```

The HTTPS repository URL avoids depending on a configured GitHub SSH key. The stable install key and the command namespace serve different purposes: installation stays compatible, while skills inside the bundle use the `sam` prefix.

| Skill | Standalone Claude Code | Bundled Claude Code | Codex |
| --- | --- | --- | --- |
| Zach Prompting | `/zach-prompting` | `/sam:zach-prompting` | `$zach-prompting` |
| HTMA Measure | `/htma-measure` | `/sam:htma-measure` | `$htma-measure` |

After updating an existing Claude installation, run `/reload-plugins` or begin a new session before using the new namespace.

## Verify the installation

```bash
claude plugin list --json
```

```bash
codex plugin list --json
```

For file-level verification, each installed skill should contain the same `SKILL.md` and supporting resources as its canonical directory in the public repository.
