---
title: Phone Size reference
description: Behavior, inputs and outputs, edge cases, data shape, verification limits, and phone-roll migration for Phone Size.
---

Phone Size puts the outcome, completion condition and material caveat on the first screen, with requirements and evidence easy to reach. It supersedes phone-roll's fixed card format. No companion skills or runtime packages are required.

## Behavior

The skill adapts to tasks, bugs, decisions, research, updates and completed work. It uses real native disclosure when supported, or descriptive links and clearly labeled scrolling detail. It preserves current scope, evidence, uncertainty and authority. Drafting does not authorize publishing or changing tracker status.

A reply shown in a terminal, such as a Claude Code or Codex CLI session, is sized for a phone terminal unless you say you are at a desk or give a size. The assumed grid is 40 columns with a 2-column gutter, so 38 usable, and 20 rows. Fenced blocks, trees and tables must fit the columns. Prose is left to reflow. A long quoted label in a tree wraps onto continuation rows that keep the branch lines, a long URL goes whole on its own line, and a table too wide to draw becomes short records. Code, commands and logs are never re-wrapped.

## Inputs & outputs

Supply the complete source, reader and destination when known. You receive a short brief plus the appropriate supporting sections or artifact. Missing facts and unsupported layout claims stay explicit. About 80–120 visible words is a starting editing budget, not a fit guarantee.

For a terminal reply you can set `PHONE_SIZE_COLUMNS` and `PHONE_SIZE_ROWS` to your phone terminal's real size; `stty size` in a shell tab on the phone prints rows, then columns. The bundled `scripts/terminal_fit.py check` counts display columns in a draft and exits 1 when a fixed-width line is too wide. The reply ends with a fit line such as `Fit: counted, 35 of 38 columns, 12 rows; assumed 40-column phone terminal, not seen.`

## States & edge cases

The result distinguishes content checked, rendered fit checked, and saved/reopened verification. If the target cannot be inspected, it says phone fit is unverified. A terminal reply states the counted columns and whether the grid was assumed, recorded or measured. Rows are a budget: required wording may run past one screen, and the fit line then says it scrolls. At enlarged text sizes it allows scrolling instead of cutting content. Full contracts and tutorials retain a continuous source behind an entry brief.

## Data shape

There is no required JSON schema. The conceptual shape is a complete first-screen brief plus named supporting destinations. Title, current outcome, done condition, material caveat and next action appear only as needed for the reader's task. Requirements may not be silently removed to fit.

## Verification limits

See the [recorded trials](https://github.com/ThatGuySam/skills/blob/main/skills/phone-size/evals/results.md). Browser viewport emulation is not physical-device testing. Native Linear saving and automatic skill discovery have not been validated. The standalone HTML result does not prove fit inside another application's controls.

The terminal grid is an assumption: no phone terminal was measured or seen. On the two tested terminal cases every fixed-width line fit 38 columns, and both replies ran about 41 rows against the 20-row budget. Codex CLI and real phone clients are untested.

## Migrating from phone-roll

Use phone-size for new work. Keep old scripts and saved JSON for legacy callers. The old discovery entry can become an explicit-only alias to phone-size after installation. No migration requires deleting old artifacts or uploading private source material.
