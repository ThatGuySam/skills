---
title: Compatibility
description: Verified installation paths and the boundaries of current compatibility claims.
---

- `Tease:` The collection installs through the documented paths, with evidence kept separate from model-quality claims.
- `Lede:` Each canonical skill uses the standard `skills/<name>/SKILL.md` layout, and the shared marketplace bundle exposes the same source directories.
- `Why it matters:` Installation success proves packaging and discovery; it does not prove that every future output will be correct or better.
- `Go deeper:` Review the dated checks, then keep the compatibility boundaries attached to any downstream claim.

## HTMA Measure baseline

Verified on **2026-07-11** against public commit `6989b11` or a later documentation-only commit:

| Surface | Result | Evidence |
| --- | --- | --- |
| Open Skills CLI `1.5.14` | Passed | Found exactly one skill, copied all six files, and produced a source/hash lock record. |
| Codex plugin `0.1.1` | Passed | Marketplace add, plugin add, installed/enabled listing, and cached skill files all succeeded from a clean `CODEX_HOME`. |
| Claude Code plugin `0.1.1` | Passed | Marketplace add and plugin install both succeeded from a clean `CLAUDE_CONFIG_DIR`. |
| Manual copy | Compatible by format | The skill is a self-contained directory with relative resource paths. |

The Open Skills CLI’s [documented discovery locations](https://github.com/vercel-labs/skills#skill-discovery) include the root `skills/` directory. Its [CLI reference](https://www.skills.sh/docs/cli) supports repository shorthand, `--list`, `--skill`, agent targeting, global installs, updates, and removal.

Claude’s [marketplace documentation](https://code.claude.com/docs/en/plugin-marketplaces) supports same-repository relative plugin sources. Version `0.1.1` uses that pattern to avoid a second GitHub SSH clone.

## Two-skill collection checks

Verified on **2026-07-15** against the local publication candidate:

| Surface | Result | Evidence |
| --- | --- | --- |
| Open Skills CLI `1.5.14` | Passed | Discovered two skills, selected only `zach-prompting`, copied its three files into a clean temporary Codex target, and produced a source/hash lock record. The installed directory matched the canonical source. |
| Claude marketplace bundle | Passed | Strict manifest validation, local marketplace add, and clean plugin install all succeeded. The stable `htma-measure` install key loaded both canonical `SKILL.md` files without differences. |
| JSON and YAML metadata | Passed | All distribution JSON parsed; `agents/openai.yaml` parsed; the official skill validator reported `Skill is valid!`. |
| Docs and machine corpus | Passed | Starlight built 26 pages and all three `llms*.txt` outputs; the docs-spec gate passed 11 checks with no warnings or failures. |

Post-push verification also passed at skill publication commit [`54ac5d4`](https://github.com/ThatGuySam/skills/commit/54ac5d427ee94efec808d39e0d4af5f3a7ea312d): GitHub `main` matched the commit, the Skills CLI installed only `zach-prompting` from the remote repository with no content differences, and a fresh Claude marketplace installation resolved version `54ac5d427ee9` with both skill directories intact.

## Sam namespace check

Verified on **2026-07-15** against public commit [`8405b24`](https://github.com/ThatGuySam/skills/commit/8405b244fc09):

| Surface | Result | Evidence |
| --- | --- | --- |
| Remote marketplace install | Passed | A fresh Claude configuration added the public repository over HTTPS and installed the stable key `htma-measure@thatguysam-skills`. |
| Collection namespace | Passed | The installed `.claude-plugin/plugin.json` reported `name: sam` and `skills: ./skills`. |
| Component inventory | Passed | `claude plugin details` identified the plugin as `sam` and listed exactly `htma-measure` and `zach-prompting`. |
| Installed content | Passed | Recursive comparison found no differences between either cached skill directory and the public commit's canonical source. |
| Manifest validation | Passed | `claude plugin validate . --strict` accepted the marketplace and plugin structure. |

Claude's official [plugin marketplace documentation](https://code.claude.com/docs/en/plugin-marketplaces) distinguishes the stable marketplace entry used by install commands from the plugin name used to namespace bundled skills. A fresh interactive invocation was not run during this packaging check; the verified manifest and component inventory are the basis for the `/sam:<skill>` compatibility claim.

## Compatibility boundaries

- Each published skill works independently of the other published skills; HTMA Measure may still use optional companion skills when they are available.
- Clients must support Agent Skills-style Markdown discovery or allow the instructions to be loaded manually.
- A successful install proves packaging and discovery, not the quality of every future estimate or prompt revision.
- Current-source research still requires network access and appropriate browsing tools.
- Private inputs remain the user's responsibility. HTMA Measure does not fetch or infer inaccessible financial facts.
