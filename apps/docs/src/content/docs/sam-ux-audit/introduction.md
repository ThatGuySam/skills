---
title: Sam UX Audit
description: Audit websites and GitHub repositories using locked review skills and observable evidence.
---

```bash
npx skills add ThatGuySam/skills --skill sam-ux-audit
```

```text title="Example prompt" wrap
Use $sam-ux-audit to audit [website URL] for a first-time visitor trying to [task]. Return prioritized findings with evidence and acceptance checks.
```

## Why use it

**One prioritized UX report, backed by evidence you can check.**

- **Use it when:** you want a website or GitHub repository reviewed for accessibility, platform fit, motion, and performance in one pass.
- **You get:** findings ranked by impact, each with evidence, confidence, and an acceptance check, plus the versions of the review skills used.
- **Limit:** without browser access it reviews artifacts only and says so. Source code alone cannot prove runtime contrast, focus, or timing.

Invoke it as `$sam-ux-audit` in Codex, `/sam-ux-audit` in Claude Code, or `/sams:ux-audit` with the collection bundle. First use restores its locked review skills with Node.js 18+, npm, and Git.

## Go deeper

- [Reference](/sam-ux-audit/reference/): behavior, inputs and outputs, edge cases, and the dependency lock.
- [Verification](/sam-ux-audit/verification/): the smoke checks that ran and their limits.
