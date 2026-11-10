---
title: Sam's Gen Writing
description: Draft, review, or plan AI-assisted web content for Google Search using Google's published policy and attributed Search Relations guidance.
---

```bash
npx skills add ThatGuySam/skills --skill sams-gen-writing
```

```text title="Example prompt" wrap
Use $sams-gen-writing to review this AI-assisted product roundup before I publish it. Give findings by severity and tell me what first-hand material I still need.
```

## Why use it

**AI-assisted pages that add real value and stay inside Google Search policy.**

- **Use it when:** you draft, review, or plan web pages written with AI help.
- **You get:** a draft or findings tied to Google's published guidance, with `[NEEDS: …]` markers for experience, data, or bylines only you can supply.
- **Limit:** it covers Google Search only, never invents authors, reviews, or test results, and does not promise rankings.

Invoke it as `$sams-gen-writing` in Codex, `/sams-gen-writing` in Claude Code, or `/sams:gen-writing` with the collection bundle.

<!-- demo:start:sams-gen-writing -->
## See it run

<video src="/demos/sams-gen-writing.mp4" poster="/demos/sams-gen-writing.png" aria-label="Codex running Sam's Gen Writing with the prompt: Use $sams-gen-writing to review this AI-assisted page against Google's guidance and tell me what it needs before publishing." autoplay loop muted playsinline controls preload="metadata" width="100%"><a href="/demos/sams-gen-writing.gif">Watch the Sam's Gen Writing demo</a></video>

A real Codex run of the default prompt on [synthetic input](https://github.com/ThatGuySam/skills/tree/main/demos/sams-gen-writing/workspace), recorded 2026-11-05 with Codex CLI 0.166.0. Waits are shortened.
<!-- demo:end:sams-gen-writing -->

## More prompts

```text wrap
Use $sams-gen-writing to plan how we use AI for 200 location pages without running into scaled content abuse.
```

```text wrap
Use $sams-gen-writing to draft a how-to post from my notes and photos. Mark anything you need from me instead of filling it in.
```

## Go deeper

- [Reference](/sams-gen-writing/reference/): modes, enforced rules, evidence sources, and limits.
- [Verification](/sams-gen-writing/verification/): what has been checked.
