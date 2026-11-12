---
title: Activity Monitor
description: Understand Mac slowdowns, freezes, and hung apps with a short evidence-backed brief.
---

```bash
npx skills add ThatGuySam/skills --skill activity-monitor
```

```text title="Example prompt" wrap
Use $activity-monitor to explain why my Mac
feels slow. Give me a short summary and the
most useful next step. It happens during
[app or task]
```

## Why use it

**Find the culprit, what it is doing, and what set it off.**

- **Use it when:** your Mac feels slow, hot, or unusually busy, apps are not responding or froze after wake, or you have captured resource output or an Activity Monitor screenshot to interpret.
- **You get:** a brief that names the culprit and its owning app, lists affected apps with their status, explains the mechanism with cited sources, and gives a next step that depends on whether the trigger is still active.
- **Limit:** a short sample can miss a stall. Missing readings remain unknown. Inspection does not authorize closing apps, deleting files, or changing settings.

Invoke it as `$activity-monitor` in Codex, `/activity-monitor` in Claude Code, or `/sams:activity-monitor` with the collection bundle.

<!-- demo:start:activity-monitor -->
## See it run

<video src="/demos/activity-monitor.mp4" poster="/demos/activity-monitor.png" aria-label="Codex running Activity Monitor with the prompt: Use $activity-monitor to check my Mac's resource activity and explain what may be slowing it down." autoplay loop muted playsinline controls preload="metadata" width="100%"><a href="/demos/activity-monitor.gif">Watch the Activity Monitor demo</a></video>

A real Codex run of the default prompt on [synthetic input](https://github.com/ThatGuySam/skills/tree/main/demos/activity-monitor/workspace), recorded 2026-11-05 with Codex CLI 0.166.0. Waits are shortened.
<!-- demo:end:activity-monitor -->

## Go deeper

- [Reference](/activity-monitor/reference/) explains collection, evidence, and boundaries.
- [Verification](/activity-monitor/verification/) records the synthetic cases and comparative limits.
- [Practitioner research](/research/macos-resource-diagnosis-2026-11-05/) explains the diagnostic methods and real incidents behind them.
