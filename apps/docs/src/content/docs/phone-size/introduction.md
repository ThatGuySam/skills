---
title: Phone Size
description: Turn dense content into a readable phone-screen brief with optional depth.
---

Phone Size puts the outcome, completion condition and material caveat on the first screen, with requirements and evidence easy to reach. It supersedes phone-roll's fixed card format.

## Install

```bash
npx skills add ThatGuySam/skills --skill phone-size -g
```

Use `$phone-size` in Codex, `/phone-size` as a standalone Claude skill, or `/sam:phone-size` in the collection bundle. No companion skills or runtime packages are required.

## Behavior

The skill adapts to tasks, bugs, decisions, research, updates and completed work. It uses real native disclosure when supported, or descriptive links and clearly labeled scrolling detail. It preserves current scope, evidence, uncertainty and authority. Drafting does not authorize publishing or changing tracker status.

## Inputs & outputs

Supply the complete source, reader and destination when known. You receive a short brief plus the appropriate supporting sections or artifact. Missing facts and unsupported layout claims stay explicit. About 80–120 visible words is a starting editing budget, not a fit guarantee.

## States & edge cases

The result distinguishes content checked, rendered fit checked, and saved/reopened verification. If the target cannot be inspected, it says phone fit is unverified. At enlarged text sizes it allows scrolling instead of cutting content. Full contracts and tutorials retain a continuous source behind an entry brief.

## Data shape

There is no required JSON schema. The conceptual shape is a complete first-screen brief plus named supporting destinations. Title, current outcome, done condition, material caveat and next action appear only as needed for the reader's task. Requirements may not be silently removed to fit.

## Example

`Use $phone-size to turn this long issue into a clear mobile brief. Keep its acceptance criteria and unresolved dependency visible, and put implementation detail below.`

The screenshots below are from a synthetic standalone HTML decision trial, not Linear or a real customer decision.

![Collapsed synthetic decision brief at a 375 by 667 CSS-pixel viewport](/phone-size/brief-context.png)

The initial view includes the recommendation, both prices, the evidence limit and the decision deadline.

![Expanded synthetic decision brief showing costs and study limitations](/phone-size/brief-detail.png)

The same artifact exposes its supporting content through native HTML disclosures.

## Verification limits

See the [recorded trials](https://github.com/ThatGuySam/skills/blob/main/skills/phone-size/evals/results.md). Browser viewport emulation is not physical-device testing. Native Linear saving and automatic skill discovery have not been validated. The standalone HTML result does not prove fit inside another application's controls.

## Migrating from phone-roll

Use phone-size for new work. Keep old scripts and saved JSON for legacy callers. The old discovery entry can become an explicit-only alias to phone-size after installation. No migration requires deleting old artifacts or uploading private source material.
