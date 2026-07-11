---
title: Command reference
description: Copyable commands to discover, install, inspect, update, and remove HTMA Measure.
---

## Open Skills CLI

Discover:

```bash
npx skills add thatguysam/skills --list
```

Install in the current project:

```bash
npx skills add thatguysam/skills --skill htma-measure
```

Install for Codex without prompts:

```bash
npx skills add thatguysam/skills --skill htma-measure --agent codex --yes
```

List installed Codex skills:

```bash
npx skills list --agent codex
```

Update the skill:

```bash
npx skills update htma-measure --yes
```

Remove it from Codex:

```bash
npx skills remove htma-measure --agent codex --yes
```

## Codex plugin

Add and install:

```bash
codex plugin marketplace add thatguysam/skills
codex plugin add htma-measure@thatguysam-skills
```

Inspect:

```bash
codex plugin marketplace list --json
codex plugin list --json
```

Refresh the marketplace:

```bash
codex plugin marketplace upgrade thatguysam-skills --json
```

Remove the plugin:

```bash
codex plugin remove htma-measure@thatguysam-skills --json
```

## Claude Code plugin

Add and install:

```bash
claude plugin marketplace add thatguysam/skills
claude plugin install htma-measure@thatguysam-skills
```

Inspect:

```bash
claude plugin list --json
```

Update:

```bash
claude plugin update htma-measure@thatguysam-skills
```

Remove:

```bash
claude plugin uninstall htma-measure@thatguysam-skills --yes
```

## Repository

Clone:

```bash
git clone https://github.com/ThatGuySam/skills.git
cd skills
```

Validate the skill frontmatter with the OpenAI skill-creator validator when available:

```bash
python3 /path/to/skill-creator/scripts/quick_validate.py skills/htma-measure
```

The validator requires PyYAML. If that dependency is not installed, parse the YAML with another standards-compliant YAML parser and apply the same name/description checks.
