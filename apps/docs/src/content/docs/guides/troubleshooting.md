---
title: Troubleshooting
description: Fix discovery, installation, invocation, missing-input, and source-quality problems.
---

## “npx skill” does not work

The package and executable are plural:

```bash
npx skills add thatguysam/skills --skill htma-measure
```

## The Skills CLI finds no skill

Confirm discovery first:

```bash
npx skills add thatguysam/skills --list
```

It should report exactly:

```text
htma-measure
```

The canonical file path is `skills/htma-measure/SKILL.md`.

## Codex knows the marketplace but not the plugin

Adding a marketplace does not install its plugins. Run both commands:

```bash
codex plugin marketplace add thatguysam/skills
codex plugin add htma-measure@thatguysam-skills
```

Then check:

```bash
codex plugin list --json
```

## Claude attempts a GitHub SSH clone

Release `0.1.1` changed the Claude marketplace entry to a same-repository relative source, so the plugin no longer needs a second SSH clone.

Refresh and update:

```bash
claude plugin marketplace update thatguysam-skills
claude plugin update htma-measure@thatguysam-skills
```

If a stale cache persists, remove and reinstall the plugin.

## The skill asks for clarification instead of estimating

That is expected when the decision, quantity, unit, time horizon, threshold, identifier, jurisdiction, effective period, or necessary private fact is missing.

Supply the missing input named in `blocking_missing_inputs`. Do not ask the agent to fill a private or current fact with a guess.

## The range is wide

A wide interval is information. Ask for value-of-information ranking:

```text
Which remaining unknown could most change the decision?
What is the cheapest credible way to measure it?
When does further measurement stop mattering?
```

## The result cites stale or indirect evidence

Ask the agent to rank each source against the exact estimate target for:

- directness;
- authority;
- freshness;
- geographic or market fit; and
- whether it supports a fact or only an inference.

For official fees, statutory rates, and current public benchmarks, require a current direct source and do not apply a local paid-quote discount.

## The JSON disagrees with the prose

Treat the memo as incomplete. The verification gate requires `low_90`, `central`, `high_90`, confidence, threshold implication, and status fields to match the written estimate.
