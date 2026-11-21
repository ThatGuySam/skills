# Recorded skill demos

Recorded Codex demos for all 14 skills are built, committed, and live; this note is the place to start if you re-record or extend them.

Parked: 2026-11-21

## Where things stand

As of 2026-11-21, commits `705456f` (tooling, 14 recordings, embeds) and `afb03e5` (skip the account-name check in CI) are on `main`. `node scripts/demo.mjs` records each skill's default prompt in `codex exec` inside a throwaway home holding only that skill, renders a GIF, MP4 and poster, and embeds them: MP4 under **See it run** on every docs intro page, GIF in the two existing skill READMEs (htma-measure, sales-research), and the Agent Verify GIF in the root README. The live `llms-full.txt` at skills.samcarlton.com contains the **See it run** sections. Recordings are single pilot runs on `gpt-6.1-sol` with Codex CLI 0.166.0, not evaluations.

## Read next

- [demos/README.md](../../demos/README.md): fixtures, `demo.json` options, record/render/embed/check commands, what the privacy check catches. Read before re-recording.
- [scripts/demo.mjs](../../scripts/demo.mjs) and [scripts/demo.test.mjs](../../scripts/demo.test.mjs): the pipeline and its tests (run in CI).
- [Agent-skill demo research memo](../research/agent-skill-x-video-demo-2026-11-05.md): editing a demo for X; separate from the docs demos.

## Threads

- **Skill demo tooling** (Claude Code, `697ce5a7-4a06-49a5-beb4-94857ebb7fbf`; reopen with `claude --resume 697ce5a7-4a06-49a5-beb4-94857ebb7fbf`): the design reasoning and the review of all 14 transcripts.

## Not written down elsewhere

- Open question, unanswered: add READMEs to the other 12 skills so they get the GIF too. It conflicts with CONTRIBUTING's "add only files the skill uses", and READMEs ship with every install. Today only the docs pages carry those demos.
- Long answers (for example phone-size) scroll their start off the 34-row terminal, so the final frame shows only the end. A taller window (about 44 rows) fixes it but needs a re-record.
- Codex isolation recipe and the ChatGPT-login refresh-token handling are in Sam's shared memory note `tools/codex-exec-isolated-runs`.
- The recorder redacts the macOS account name to `demo`; casts recorded before that were redacted and re-rendered.

## Next

1. Re-record with `node scripts/demo.mjs record <id>` when a skill's behavior or default prompt changes, then `render`, `embed`, and commit the cast, metadata, media, and embeds together.
- Needs: Sam's answer on the skill-README question before adding any.
