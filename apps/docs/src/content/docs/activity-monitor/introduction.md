---
title: Activity Monitor
description: Understand Mac resource activity and likely slowdowns in a short actionable brief.
---

```bash
npx skills add ThatGuySam/skills --skill activity-monitor
```

```text title="Example prompt" wrap
Use $activity-monitor to explain why my Mac
feels slow during [app or task]. Give me a
short summary and the most useful next step.
```

## Why use it

**Find the strongest resource lead and what to check next.**

- **Use it when:** your Mac feels slow, hot, or unusually busy, or you have captured resource output to interpret.
- **You get:** a short summary of what is happening, why it may matter, what remains unknown, and one practical next step.
- **Limit:** a short sample can miss a stall. Missing readings remain unknown. Inspection does not authorize closing apps, deleting files, or changing settings.

Invoke it as `$activity-monitor` in Codex, `/activity-monitor` in Claude Code, or `/sams:activity-monitor` with the collection bundle.

## Go deeper

- [Reference](/activity-monitor/reference/) explains collection, evidence, and boundaries.
- [Verification](/activity-monitor/verification/) records the synthetic cases and comparative limits.
- [Practitioner research](/research/macos-resource-diagnosis-2026-11-05/) explains the diagnostic methods and real incidents behind them.
