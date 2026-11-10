---
title: Tree and Status
description: Scan large amounts of material or project work through familiar plain-text trees.
---

```bash
npx skills add ThatGuySam/skills --skill sams-tree sams-status
```

```text title="Example prompts" wrap
Use $sams-tree to organize these notes. Focus on the algebra exercises.
Use $sams-status to show where the current project stands.
```

## Why use it

**See a lot of material, or a whole project, in one scannable tree.**

- **Use it when:** notes pile up (Sam's Tree) or you need to know where project work stands (Sam's Status).
- **You get:** a plain-text tree with familiar names, a marker on every row, and at most three levels until you ask for more.
- **Limit:** status reads your conversation and connected trackers but never changes tasks or sends messages. Missing information is marked, not invented.

Install either skill alone or both together. Invoke them as `$sams-tree` and `$sams-status` in Codex, `/sams-tree` and `/sams-status` in Claude Code, or `/sams:tree` and `/sams:status` with the collection bundle.

<!-- demo:start:sams-tree -->
## See Sam's Tree run

<video src="/demos/sams-tree.mp4" poster="/demos/sams-tree.png" aria-label="Codex running Sam's Tree with the prompt: Use $sams-tree to organize this material into a scannable tree." autoplay loop muted playsinline controls preload="metadata" width="100%"><a href="/demos/sams-tree.gif">Watch the Sam's Tree demo</a></video>

A real Codex run of the default prompt on [synthetic input](https://github.com/ThatGuySam/skills/tree/main/demos/sams-tree/workspace), recorded 2026-11-05 with Codex CLI 0.166.0. Waits are shortened.
<!-- demo:end:sams-tree -->

<!-- demo:start:sams-status -->
## See Sam's Status run

<video src="/demos/sams-status.mp4" poster="/demos/sams-status.png" aria-label="Codex running Sam's Status with the prompt: Use $sams-status to show the current project's relevant work and status." autoplay loop muted playsinline controls preload="metadata" width="100%"><a href="/demos/sams-status.gif">Watch the Sam's Status demo</a></video>

A real Codex run of the default prompt on a [synthetic workspace](https://github.com/ThatGuySam/skills/tree/main/demos/sams-status), recorded 2026-11-05 with Codex CLI 0.166.0. Waits are shortened.
<!-- demo:end:sams-status -->

## Reading status

| Symbol | Meaning |
| --- | --- |
| ⚪️ | Not started |
| 🟡 | In progress |
| 🔵 | Needs Info |
| 🟢 | Done for the current phase |
| 🐌 | Information is likely stale |

## Follow up

```text wrap
Expand Operations, keeping the current context.
What information is missing for invoice download?
Why does Checkout look stale?
Show four levels this time.
```

## Go deeper

- [Design](/tree-status/design/): the agreed behavior, output rules, status vocabulary, and local development setup.
- [Glossary](/tree-status/glossary/): the terms the trees use.
- [Verification](/tree-status/verification/): the checks that ran and their limits.
