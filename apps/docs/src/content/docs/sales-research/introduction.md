---
title: Sales Research
description: Install and use a portable skill for evidence-backed sales decisions and buyer communication.
---

```bash
npx skills add ThatGuySam/skills --skill sales-research
```

```text title="Example prompt" wrap
Use $sales-research to draft my reply. Give me the reply first, then the assumptions behind it. Draft only.
I sell: [offer and buyer]
I need to decide: [decision]
They wrote: [redacted message]
```

## Why use it

**A clear next move in a sales conversation, backed by practitioners who fit your situation.**

- **Use it when:** you have real buyer context but an unclear next step, in consulting, SaaS, enterprise buying, recruiting, or partnerships.
- **You get:** the draft or recommendation first, then the one to three practitioner sources it relied on and any assumptions that matter.
- **Limit:** drafts only. Installing it does not authorize sending messages or changing a CRM, and its sales results have not been measured.

Invoke it as `$sales-research` in Codex, `/sales-research` in Claude Code, or `/sams:sales-research` with the collection bundle. Replace the bracketed fields with your own redacted facts.

<!-- demo:start:sales-research -->
## See it run

<video src="/demos/sales-research.mp4" poster="/demos/sales-research.png" aria-label="Codex running Sales Research with the prompt: Use $sales-research to research this sales situation and recommend the next decision." autoplay loop muted playsinline controls preload="metadata" width="100%"><a href="/demos/sales-research.gif">Watch the Sales Research demo</a></video>

A real Codex run of the default prompt on [synthetic input](https://github.com/ThatGuySam/skills/tree/main/demos/sales-research/workspace), recorded 2026-11-05 with Codex CLI 0.166.0. Waits are shortened.
<!-- demo:end:sales-research -->

## Go deeper

- [Examples](/sales-research/examples/): prompts for specific sales situations.
- [Setup and limits](/sales-research/setup/): agent-specific installs, useful context, requirements, and removal.
- [Sources](/sales-research/sources/): how practitioners are selected.
- [Testing and verification](/sales-research/verification/): how to try it and send feedback.
