---
title: Agent Verify
description: Verify new work and compare before/after improvements with fresh subagents and independent QA.
---

```bash
npx skills add ThatGuySam/skills --skill agent-verify
```

```text title="Example prompt" wrap
Use $agent-verify to compare this update with the previous version on realistic tasks and tell me whether it actually improved.
```

## Why use it

**An independent answer to "did this actually work, or get better?"**

- **Use it when:** you need to check new work against its requirements, or compare a change with the version before it.
- **You get:** one scoped verdict, such as improved, mixed, regressed, or inconclusive, with the baseline, settings, trial count, and evidence behind it.
- **Limit:** it needs a runtime that can start fresh subagents. Without them, independent verification is reported as inconclusive.

Invoke it as `$agent-verify` in Codex, `/agent-verify` in Claude Code, or `/sam:agent-verify` with the collection bundle.

## More prompts

```text wrap
Use $agent-verify to verify this new feature against its requirements.
Use $agent-verify to check this document against its source material.
```

## Go deeper

- [Reference](/agent-verify/reference/): requirements, global Codex installation, modes, verdicts, and package layout.
- [Verification](/agent-verify/verification/): what has actually been checked about this skill.
