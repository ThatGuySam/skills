---
title: Agent Verify
description: Verify new work, compare before/after changes, or improve a prompt step by step with fresh subagents and independent QA.
---

```bash
npx skills add ThatGuySam/skills --skill agent-verify
```

```text title="Example prompt" wrap
Use $agent-verify to improve [prompts/reply.md] with red-green-refactor. Prove its score out of 10 on [my examples], then show before and after on unseen cases.
```

## Why use it

**Independent proof that work meets its requirements, or that a prompt actually got better.**

- **Use it when:** you need to check new work, compare a change with the version before it, or improve a prompt or skill step by step.
- **You get:** a scoped verdict with its evidence. In the improvement loop, you also get the starting score, every kept and rejected change, and a check on cases the editor never saw.
- **Limit:** it needs fresh subagents. Without them, independent verification is inconclusive.

Invoke it as `$agent-verify` in Codex, `/agent-verify` in Claude Code, or `/sams:agent-verify` with the collection bundle.

## More prompts

```text wrap
Use $agent-verify to compare this update with the previous version on realistic tasks and tell me whether it actually improved.
Use $agent-verify to verify this new feature against its requirements.
Use $agent-verify to check this document against its source material.
```

## Go deeper

- [Reference](/agent-verify/reference/): requirements, global Codex installation, modes, verdicts, and package layout.
- [Verification](/agent-verify/verification/): what has actually been checked about this skill.
