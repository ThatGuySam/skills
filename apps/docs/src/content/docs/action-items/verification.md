---
title: Sam's Action Items verification
description: What has been tested for this skill, and what has not.
---

## Where it came from

The skill was written in October 2026 from a ledger of real corrections Sam made to meeting follow-up work done by agents. The ledger and the meetings are private and are not in this repository. The skill's [preference provenance](https://github.com/ThatGuySam/skills/blob/main/skills/sams-action-items/references/preference-provenance.md) summarizes each behavior and the kind of evidence behind it.

## What was tested

In October 2026, a blind subagent trial on one private meeting compared the revised instructions with the earlier version. An email action had lost a requirement: the message needed to document access limits so its recipient could pursue support. The revised version kept that requirement; the earlier version lost it, including at similar output lengths. The extracting agents were not told what had been missed.

## Limits

- That is one meeting and one requirement. It supports that recovery, not general reliability.
- There is no public eval with synthetic meetings yet. Results on other meeting sources, languages, and agents are untested.
- Phone fit of the chat output depends on the host app and is reported as unverified unless the skill can measure it.
- Publishing this skill was a packaging change. Its instructions match the version Sam used privately, with personal paths and client names removed.
