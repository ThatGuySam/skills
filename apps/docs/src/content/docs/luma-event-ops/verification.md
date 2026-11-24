---
title: Luma Event Operations verification
description: Offline synthetic pilot method, measured results, and limits.
---

Luma Event Operations passed a small offline synthetic pilot.

## Method and scores

In the initial pilot, fresh Codex workers handled a listing draft, a two-turn fixture reschedule, and a webinar request. Independent QA passed all six criteria across those three tasks.

After review, a focused follow-up used four tasks. Each worker received a synthetic fixture or catalog excerpt. Independent QA inspected the responses and compared the simulated reschedule log with saved state. The first pass met five of six criteria. A fresh worker and reviewer reran the outreach case after a repair.

| Follow-up check | First pass | After repair |
| --- | --- | --- |
| Reschedule with explicit approval of the automatic calendar update | 3 of 3 | Reschedule instructions preserved |
| Terse date change pauses for notification approval | 1 of 1 | Reschedule instructions preserved |
| Webinar production routes away from the Luma skill | 1 of 1 | Catalog description preserved |
| Under-scoped outreach asks for recipients, wording, and timing for each action | 0 of 1 | 1 of 1 on rerun |

## Limits

The reschedule used an offline host fixture. The outreach response was graded against a static snapshot. The webinar task measured a routing decision from the visible catalog description. Each case had one trial on the relevant instructions, and the exact model settings were unavailable.

Live Luma use, including invites, blasts, guest approvals, and publishing, remains untested. Claude Code runtime behavior and automatic skill selection also remain untested.
