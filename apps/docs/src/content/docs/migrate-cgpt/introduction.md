---
title: Migrate Custom GPTs
description: Convert Custom GPT workflows into portable skills with explicit knowledge and integration gaps.
---

```bash
npx skills add ThatGuySam/skills --skill migrate-cgpt
```

```text title="Example prompt" wrap
Use $migrate-cgpt to back up this Custom GPT and convert it into a local Codex skill. List anything that didn't carry over.
```

## Why use it

**Your Custom GPT becomes a portable skill, with the original kept safe.**

- **Use it when:** you want a GPT workflow to run in Codex, Claude Code, a Git repository, or a ChatGPT plugin.
- **You get:** a private backup, the converted skill, and a report mapping each part of the GPT to preserved, adapted, or missing.
- **Limit:** a missing knowledge file or Action stays missing. It is reported, not reconstructed from guesses.

Invoke it as `$migrate-cgpt` in Codex, `/migrate-cgpt` in Claude Code, or `/sam:migrate-cgpt` with the collection bundle.

## More prompts

```text wrap
Use $migrate-cgpt to migrate this authorized GPT configuration into my GitHub skills repository.
```

## Go deeper

- [Backup and install](/migrate-cgpt/backup-and-install/): the source snapshot, skill schema, ChatGPT Web options, and a hand-test checklist.
- [Reference](/migrate-cgpt/reference/): behavior, inputs and outputs, result states, and data shape.
- [Verification](/migrate-cgpt/verification/): recorded checks and limits.
