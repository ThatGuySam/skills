---
title: Zach Prompting
description: Improve prompts, skills, agent instructions, and AGENTS.md files without weakening their intent or safeguards.
---

```bash
npx skills add ThatGuySam/skills --skill zach-prompting
```

```text title="Example prompt" wrap
Use $zach-prompting to tighten this AGENTS.md without weakening its safety, permission, or validation rules. Return the revised file and a short change map.
```

## Why use it

**Cleaner instructions that still say everything they must.**

- **Use it when:** a prompt, skill, or `AGENTS.md` has piled up rules over time, or needs moving to a newer model.
- **You get:** the revised artifact, a map of what was kept, removed, or clarified, and the checks that actually ran.
- **Limit:** shorter is not automatically better. It calls a change an improvement only after representative tests.

Invoke it as `$zach-prompting` in Codex, `/zach-prompting` in Claude Code, or `/sams:zach-prompting` with the collection bundle.

## More prompts

```text wrap
Use $zach-prompting to review this skill for contradictions, over-prescription, and missing stop conditions. Don't edit it; give me a patch plan and a small eval set.
```

```text wrap
Use $zach-prompting to migrate this working agent prompt to Claude Opus 5.5. Establish a baseline first and change one instruction group at a time.
```

## Go deeper

- [How it works](/zach-prompting/reference/): the preserved contract, current OpenAI and Anthropic guidance, and sources.
- [Verification](/zach-prompting/verification/): what has been checked and what remains untested.
- [Source](https://github.com/ThatGuySam/skills/tree/main/skills/zach-prompting): the canonical skill directory.

The name was inspired by [Zach Miles and his site, *An Option — with Zach*](https://zachmil.es/). The skill is an independent synthesis of vendor guidance and is not affiliated with or endorsed by Zach Miles, OpenAI, or Anthropic.
