---
title: Migrate Custom GPTs
description: Convert Custom GPT workflows into portable skills with explicit knowledge and integration gaps.
---

`migrate-cgpt` converts a user-owned Custom GPT into a skill for a local agent, ChatGPT personal skills, or a GitHub repository. It preserves required behavior and reports anything the destination cannot yet do.

## Install and invoke

```bash
npx skills add thatguysam/skills --skill migrate-cgpt
```

```text
Use $migrate-cgpt to convert these GPT instructions and reference files into a local Codex skill.
Use $migrate-cgpt to migrate this authorized GPT configuration into my GitHub skills repository.
```

Claude Code uses `/migrate-cgpt` for a standalone installation and `/sam:migrate-cgpt` in the collection bundle.

## Behavior

The skill inventories the source, preserves the task's output and permission requirements, maps dependencies, writes the replacement, and checks the actual destination. It keeps the original GPT intact during portable conversion. An integration schema does not count as a working Action.

The authoring method uses Zach Prompting's requirement-preservation rules and [Matt Pocock's writing-for-agents guidance](https://www.aihero.dev/skills-writing-for-agents). It removes behavior-neutral instructions and puts conditional details behind clear reference links.

## Inputs & outputs

Supply instructions or authorized editor access, available knowledge files, relevant Action configuration without credentials, and a target runtime or repository. Familiar requests and good outputs make comparison stronger.

The result contains SKILL.md and only the references, assets, metadata, or scripts the workflow needs. The migration report gives the destination, component mapping, actual checks, unresolved dependencies, and an invocation example.

Verification has two parts: compare the converted files with the source
requirements, then run the generated skill with representative inputs. Keep
expected requirements separate from the runners and retain their actual
responses. A correctly reported missing integration can pass this evaluation
while the replacement remains partial.

## States & edge cases

- `ready`: required behavior and delivery verified.
- `partial`: useful conversion delivered with named missing dependencies.
- `awaiting-evals`: packaging checked, required execution evidence still missing.
- `blocked`: source access or another essential input prevents a useful conversion.

A public GPT URL does not expose its configuration. A missing roster or knowledge file must remain missing, not be reconstructed from guesses. Authentication must be configured separately. A cloud file is not an installation on your computer.

Built-in ChatGPT migration is a separate operation. Check the [official retirement FAQ](https://help.openai.com/en/articles/20001519-custom-gpt-retirement-and-migration-faq) for account-specific availability and effects before using it.

## Data shape

Each source component has a destination and a status: preserved, adapted, missing, or intentionally excluded with a reason. Each evaluation records its input, expected behavior, observed result, and pass/fail/blocked outcome. The skill does not require a new database or proprietary export schema.

## Verification

See [recorded checks and limits](/migrate-cgpt/verification/). Portable conversion does not establish identical output from another model or restore an absent API connection.
