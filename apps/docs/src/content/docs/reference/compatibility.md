---
title: Compatibility
description: Verified installation paths and the boundaries of current compatibility claims.
---

The repository uses the standard `skills/<name>/SKILL.md` layout and contains no runtime code or platform-specific dependency.

## Verified matrix

Verified on **2026-07-11** against public commit `6989b11` or a later documentation-only commit:

| Surface | Result | Evidence |
| --- | --- | --- |
| Open Skills CLI `1.5.14` | Passed | Found exactly one skill, copied all six files, and produced a source/hash lock record. |
| Codex plugin `0.1.1` | Passed | Marketplace add, plugin add, installed/enabled listing, and cached skill files all succeeded from a clean `CODEX_HOME`. |
| Claude Code plugin `0.1.1` | Passed | Marketplace add and plugin install both succeeded from a clean `CLAUDE_CONFIG_DIR`. |
| Manual copy | Compatible by format | The skill is a self-contained directory with relative resource paths. |

The Open Skills CLI’s [documented discovery locations](https://github.com/vercel-labs/skills#skill-discovery) include the root `skills/` directory. Its [CLI reference](https://www.skills.sh/docs/cli) supports repository shorthand, `--list`, `--skill`, agent targeting, global installs, updates, and removal.

Claude’s [marketplace documentation](https://code.claude.com/docs/en/plugin-marketplaces) supports same-repository relative plugin sources. Version `0.1.1` uses that pattern to avoid a second GitHub SSH clone.

## Compatibility boundaries

- The core skill works without the optional HTMA companion skills.
- Clients must support Agent Skills-style Markdown discovery or allow the instructions to be loaded manually.
- A successful install proves packaging and discovery, not the quality of every future estimate.
- Current-source research still requires network access and appropriate browsing tools.
- Private inputs remain the user’s responsibility; the skill does not fetch or infer inaccessible financial facts.
