---
title: Installation
description: Install HTMA Measure with npx skills, Codex plugins, Claude Code plugins, or a manual copy.
---

Choose one installation path. They all expose the same canonical `skills/htma-measure` content.

The Skills CLI can install only HTMA Measure. The Codex and Claude marketplace bundle keeps the stable install ID `htma-measure` and loads every skill currently published in this repository. Claude Code uses the collection-level `sam` namespace after installation.

## Open Skills CLI

This is the most portable path. The command is `npx skills`—plural.

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

To disable the Skills CLI’s anonymous telemetry for an install:

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
codex plugin add htma-measure@thatguysam-skills
```

Verify that it is installed and enabled:

```bash
codex plugin list --json
```

The plugin reports its version and marketplace source. Release `0.2.0` installs without additional authentication because the repository is public.

## Claude Code plugin

Add the marketplace and install the plugin:

```bash
claude plugin marketplace add thatguysam/skills
claude plugin install htma-measure@thatguysam-skills
```

Verify the installation:

```bash
claude plugin list --json
```

The marketplace uses a same-repository relative source. Claude clones the public marketplace over HTTPS and copies the plugin from that checkout, so installing it does not require a GitHub SSH key.

The bundle invokes this skill as `/sam:htma-measure`. A standalone Claude Code installation invokes it as `/htma-measure`.

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
