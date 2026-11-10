---
title: Install Sam's Skills
description: Install one skill or the full collection in Codex, Claude Code, and compatible agents.
---

Use the Skills CLI to install one skill. The marketplace bundle installs every skill in the collection. The commands and invocation names for each client are below.

Use **Run with** to choose npx, bunx, pnx, mise, or Yarn dlx. Your latest choice is remembered across pages and visits on this device. Copy command copies the selected version, including its flags.

Yarn dlx requires modern Yarn (2+); pnx requires pnpm 12+. The mise command provisions Node LTS and the Skills CLI as needed while respecting your mise policies. If JavaScript or browser storage is unavailable, the original npx command remains usable.

The menu shows one spelling per runner family. Saved pnpx or pnpm dlx choices map to pnx; npm exec maps to npx. Use arrow keys, Home/End, or type a runner name to move through the menu. Escape dismisses it; Enter selects.

## See what is available

```bash
npx skills add thatguysam/skills --list
```

<!-- skills:start:installation-names -->
The repository publishes `phone-size`, `sams-tree`, `sams-status`, `sams-env`, `andrej-explain`, `migrate-cgpt`, `sales-research`, `sams-gen-writing`, `sams-skill-creator`, `sam-ux-audit`, `zach-prompting`, `htma-measure`, `agent-verify`, `activity-monitor`.
<!-- skills:end:installation-names -->

## Install one skill

Choose a command below. Add `-g` to install globally. Each guide explains the skill's first task and requirements.

<!-- skills:start:installation-commands -->
### Phone Size

Condense tasks, decisions, research, and updates into a phone-screen brief with supporting detail. [Read the guide](/phone-size/introduction/).

```bash
npx skills add ThatGuySam/skills --skill phone-size
```

### Sam's Tree

Organize notes and other material into familiar, scannable trees. [Read the guide](/tree-status/introduction/).

```bash
npx skills add ThatGuySam/skills --skill sams-tree
```

### Sam's Status

Show project work as a status tree with sources, progress, and missing information. [Read the guide](/tree-status/introduction/).

```bash
npx skills add ThatGuySam/skills --skill sams-status
```

### Sam's Env

Draft environment examples with setup links, value guidance, annotation checks, and consistent spacing. [Read the guide](/env-example/introduction/).

```bash
npx skills add ThatGuySam/skills --skill sams-env
```

### Andrej Explain

Explain complex material and agent work through useful text, diagrams, HTML, or video. [Read the guide](/andrej-explain/introduction/).

```bash
npx skills add ThatGuySam/skills --skill andrej-explain
```

### Migrate Custom GPTs

Back up GPT workflows privately and convert them to portable skills while tracking migration gaps. [Read the guide](/migrate-cgpt/introduction/).

```bash
npx skills add ThatGuySam/skills --skill migrate-cgpt
```

### Sales Research

Research sales decisions and draft buyer communication using relevant practitioner sources. [Read the guide](/sales-research/introduction/).

```bash
npx skills add ThatGuySam/skills --skill sales-research
```

### Sam's Gen Writing

Draft, review, or plan AI-assisted pages using Google's published Search guidance. [Read the guide](/sams-gen-writing/introduction/).

```bash
npx skills add ThatGuySam/skills --skill sams-gen-writing
```

### Sam's Skill Creator

Create and improve agent skills with locked authoring sources and behavioral validation. [Read the guide](/sams-skill-creator/introduction/).

```bash
npx skills add ThatGuySam/skills --skill sams-skill-creator
```

### Sam UX Audit

Audit websites and repository UX with locked review dependencies and evidence-backed findings. [Read the guide](/sam-ux-audit/introduction/).

```bash
npx skills add ThatGuySam/skills --skill sam-ux-audit
```

### Zach Prompting

Improve prompts and agent instructions while preserving their intent and safeguards. [Read the guide](/zach-prompting/introduction/).

```bash
npx skills add ThatGuySam/skills --skill zach-prompting
```

### HTMA Measure

Estimate uncertain quantities with ranges, sources, and decision recommendations. [Read the guide](/overview/introduction/).

```bash
npx skills add ThatGuySam/skills --skill htma-measure
```

### Agent Verify

Verify new work and compare before/after improvements with fresh subagents and independent QA. [Read the guide](/agent-verify/introduction/).

```bash
npx skills add ThatGuySam/skills --skill agent-verify
```

### Activity Monitor

Explain Mac slowdowns, freezes, and hung apps with a short evidence-backed brief. [Read the guide](/activity-monitor/introduction/).

```bash
npx skills add ThatGuySam/skills --skill activity-monitor
```
<!-- skills:end:installation-commands -->

## Install the collection in Codex

```bash
codex plugin marketplace add thatguysam/skills
codex plugin add sams@thatguysam-skills
```

Installing the `sams` plugin loads every published skill as `sams:<name>`. See the invocation table below for each skill's name.

## Install the collection in Claude Code

```bash
claude plugin marketplace add https://github.com/ThatGuySam/skills.git
claude plugin install sams@thatguysam-skills
```

The HTTPS repository URL avoids depending on a configured GitHub SSH key. Skills inside the bundle use the `sams:` command prefix.

<!-- skills:start:installation-invocations -->
| Skill | Standalone Claude Code | Bundled Claude Code | Standalone Codex | Bundled Codex |
| --- | --- | --- | --- | --- |
| Phone Size | `/phone-size` | `/sams:phone-size` | `$phone-size` | `$sams:phone-size` |
| Sam's Tree | `/sams-tree` | `/sams:tree` | `$sams-tree` | `$sams:tree` |
| Sam's Status | `/sams-status` | `/sams:status` | `$sams-status` | `$sams:status` |
| Sam's Env | `/sams-env` | `/sams:env` | `$sams-env` | `$sams:env` |
| Andrej Explain | `/andrej-explain` | `/sams:andrej-explain` | `$andrej-explain` | `$sams:andrej-explain` |
| Migrate Custom GPTs | `/migrate-cgpt` | `/sams:migrate-cgpt` | `$migrate-cgpt` | `$sams:migrate-cgpt` |
| Sales Research | `/sales-research` | `/sams:sales-research` | `$sales-research` | `$sams:sales-research` |
| Sam's Gen Writing | `/sams-gen-writing` | `/sams:gen-writing` | `$sams-gen-writing` | `$sams:gen-writing` |
| Sam's Skill Creator | `/sams-skill-creator` | `/sams:skill-creator` | `$sams-skill-creator` | `$sams:skill-creator` |
| Sam UX Audit | `/sam-ux-audit` | `/sams:ux-audit` | `$sam-ux-audit` | `$sams:ux-audit` |
| Zach Prompting | `/zach-prompting` | `/sams:zach-prompting` | `$zach-prompting` | `$sams:zach-prompting` |
| HTMA Measure | `/htma-measure` | `/sams:htma-measure` | `$htma-measure` | `$sams:htma-measure` |
| Agent Verify | `/agent-verify` | `/sams:agent-verify` | `$agent-verify` | `$sams:agent-verify` |
| Activity Monitor | `/activity-monitor` | `/sams:activity-monitor` | `$activity-monitor` | `$sams:activity-monitor` |
<!-- skills:end:installation-invocations -->

After updating an existing Claude installation, run `/reload-plugins` or begin a new session before using the new namespace.

## Verify the installation

```bash
claude plugin list --json
```

```bash
codex plugin list --json
```

For file-level verification, each installed skill should contain the same `SKILL.md` and supporting resources as its canonical directory in the public repository.
