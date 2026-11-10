---
title: Phone Size
description: Turn dense content into a readable phone-screen brief with optional depth.
---

```bash
npx skills add ThatGuySam/skills --skill phone-size
```

```text title="Example prompt" wrap
Use $phone-size to turn this long issue into a phone-sized brief. Keep the acceptance criteria and open dependency visible, and put implementation detail below.
```

## Why use it

**The decision fits on one phone screen, and the detail stays one tap away.**

- **Use it when:** a task, bug, decision, or update is too long to read on a phone.
- **You get:** a short brief with the outcome, done condition, and main caveat first, plus the supporting detail below or behind disclosures.
- **Limit:** it never drops a requirement to fit, and says when phone fit was not actually checked.

Invoke it as `$phone-size` in Codex, `/phone-size` in Claude Code, or `/sams:phone-size` with the collection bundle. Add `-g` to the install command to install it globally.

<!-- demo:start:phone-size -->
## See it run

<video src="/demos/phone-size.mp4" poster="/demos/phone-size.png" aria-label="Codex running Phone Size with the prompt: Use $phone-size to condense this content into a readable phone-screen brief with progressively disclosed detail." autoplay loop muted playsinline controls preload="metadata" width="100%"><a href="/demos/phone-size.gif">Watch the Phone Size demo</a></video>

A real Codex run of the default prompt on [synthetic input](https://github.com/ThatGuySam/skills/tree/main/demos/phone-size/workspace), recorded 2026-11-05 with Codex CLI 0.166.0. Waits are shortened.
<!-- demo:end:phone-size -->

## What it looks like

These screenshots come from a synthetic decision brief at a 375 by 667 CSS-pixel viewport, not a real customer decision.

![Collapsed synthetic decision brief at a 375 by 667 CSS-pixel viewport](/phone-size/brief-context.png)

The first screen shows the recommendation, both prices, the evidence limit, and the decision deadline.

![Expanded synthetic decision brief showing costs and study limitations](/phone-size/brief-detail.png)

The supporting detail opens through native HTML disclosures.

## Go deeper

- [Reference](/phone-size/reference/): behavior, inputs and outputs, edge cases, verification limits, and migrating from phone-roll.
- [Recorded trials](https://github.com/ThatGuySam/skills/blob/main/skills/phone-size/evals/results.md): the evaluation evidence.
