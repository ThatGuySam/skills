---
title: Sam's Action Items
description: Turn a meeting into a compact, copyable tree of what remains, with your own notes kept word for word.
---

```bash
npx skills add ThatGuySam/skills --skill sams-action-items
```

```text title="Example prompt" wrap
Use $sams-action-items to pull the follow-ups
from this meeting. Keep my notes word for word
and give me one copyable tree. Meeting:
[meeting name, transcript, or notes]
```

## Why use it

**Get the real follow-ups from a meeting, not a summary of it.**

- **Use it when:** a meeting just ended and you want every commitment, request, and follow-up, with owners and what each one depends on, in a list you can copy into a task tool.
- **You get:** one short tree per meeting in the chat. Your own action notes stay first and word for word. Actions found only in the transcript are added in the same tree and marked "(meeting)". Each action keeps its owner, recipient, channel, purpose, and dependency when the meeting gave them.
- **Limit:** speaker labels and transcription errors limit what can be attributed. Unclear ownership is labeled, not guessed. Making the list does not send messages, create tasks, or carry out the actions.

It works with any transcript or notes source your agent can read: Granola, Google Meet notes, Docs, Notion, or pasted text. It uses [Phone Size](/phone-size/introduction/) and [Sam's Tree](/tree-status/introduction/) for the output; install them too for the best result.

Invoke it as `$sams-action-items` in Codex, `/sams-action-items` in Claude Code, or `/sams:action-items` with the collection bundle.

## Go deeper

- [Reference](/action-items/reference/) explains the workflow and the output modes.
- [Verification](/action-items/verification/) records what has and has not been tested.
