---
title: Installation
description: Install HTMA Measure with npx skills, Codex plugins, Claude Code plugins, or a manual copy.
---

Every installation path below uses `skills/htma-measure`. The Skills CLI installs HTMA Measure alone; the marketplace bundle installs all published skills.

The Skills CLI can install only HTMA Measure. The Codex and Claude marketplace bundle installs as `sams@thatguysam-skills` and loads every skill currently published in this repository. Both agents list bundled skills as `sams:<name>`.

## Open Skills CLI

Use the plural command, `npx skills`.

List the skills found in the repository without installing:

```bash
npx skills add thatguysam/skills --list
```

Install only HTMA Measure into the current project:

```bash
npx skills add thatguysam/skills --skill htma-measure
```

Install non-interactively for Codex:

```bash
npx skills add thatguysam/skills \
  --skill htma-measure \
  --agent codex \
  --yes
```

Install globally instead of in one project:

```bash
npx skills add thatguysam/skills \
  --skill htma-measure \
  --agent codex \
  --global \
  --yes
```

A project-scoped Codex install lands at:

```text
.agents/skills/htma-measure/
```

To disable the Skills CLI's anonymous telemetry for an install:

```bash
DISABLE_TELEMETRY=1 npx skills add thatguysam/skills \
  --skill htma-measure \
  --agent codex \
  --yes
```

## Codex plugin

Register the public marketplace, then install the plugin:

```bash
codex plugin marketplace add thatguysam/skills
codex plugin add sams@thatguysam-skills
```

Verify that it is installed and enabled:

```bash
codex plugin list --json
```

The plugin reports its version and marketplace source. The repository is public; any authentication or workspace approval requirements depend on the selected host. Check the current package version rather than assuming a cached release is current.

## Claude Code plugin

Add the marketplace and install the plugin:

```bash
claude plugin marketplace add thatguysam/skills
claude plugin install sams@thatguysam-skills
```

Verify the installation:

```bash
claude plugin list --json
```

The marketplace uses a same-repository relative source. Claude clones the public marketplace over HTTPS and copies the plugin from that checkout, so installing it does not require a GitHub SSH key.

The bundle invokes this skill as `/sams:htma-measure` in Claude Code and `$sams:htma-measure` in Codex. A standalone installation invokes it as `/htma-measure` or `$htma-measure`.

## Manual installation

Clone the repository:

```bash
git clone https://github.com/ThatGuySam/skills.git
cd skills
```

Copy the skill directory into the location your agent discovers:

```bash
mkdir -p .agents/skills
cp -R skills/htma-measure .agents/skills/htma-measure
```

Run that command from the cloned repository. To install from another directory, use absolute source and destination paths instead.

```bash
cp -R /path/to/skills/skills/htma-measure /path/to/project/.agents/skills/htma-measure
```

## Verify the files

A complete installation contains:

```text
htma-measure/
├── SKILL.md
├── agents/openai.yaml
├── assets/measurement-brief-template.md
└── references/
    ├── local-paid-quote-adjustment.md
    ├── method-map.md
    └── output-rubric.md
```

Next: [run your first measurement](/guides/first-measurement/).
