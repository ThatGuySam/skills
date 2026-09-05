---
title: Install Sam's Skills
description: Install one skill or the full collection in Codex, Claude Code, and compatible agents.
---

Use the Skills CLI to install one skill. The marketplace bundle installs every skill in the collection. The commands and invocation names for each client are below.

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

The HTTPS repository URL avoids depending on a configured GitHub SSH key. The stable install key preserves compatibility. Skills inside the bundle use the `sam` command prefix.

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
