---
title: Sam's Tree and Sam's Status
description: Scan large amounts of material or project work through familiar plain-text trees.
---

Use Sam's Tree to organize material you already have. Use Sam's Status to see where the current project's work stands, using the conversation and relevant available trackers.

## Install

Install either skill independently, or install both:

```bash
npx skills add ThatGuySam/skills --skill sams-tree sams-status
```

| Skill | Codex | Standalone Claude | Collection bundle |
| --- | --- | --- | --- |
| Sam's Tree | `$sams-tree` | `/sams-tree` | `/sam:sams-tree` |
| Sam's Status | `$sams-status` | `/sams-status` | `/sam:sams-status` |

## Make Your First Tree

Supply the subject or use material already in the conversation:

```text
Use $sams-tree to organize these notes. Focus on the algebra exercises.
```

Every tree uses a meaningful emoji or visual marker on each row. Category markers describe what an item is, without inventing work status. If you ask for no emoji, compact text markers preserve scanability.

The tree uses familiar names, at most three displayed levels by default, and `->` to combine deeper paths. An ellipsis marks collapsed detail. Ask to expand a branch or show more levels when useful. The subject or project stays implied rather than taking a level.

This is historical output from the October 10 synthetic evaluation, not a real course record. It predates the October 14 requirement for visual markers on every row:

```text
├── Mathematics
│   ├── Algebra -> Equations
│   │   ├── Linear equations -> Practice
│   │   └── Quadratics …
│   └── Geometry …
└── Writing …
```

The skill can suggest up to three simple grouping names outside the tree. It keeps the main view familiar until you request a new grouping.

## Read Project Status

```text
Use $sams-status to show where the current project stands.
We are preparing the Billing screen for review.
```

The skill follows known navigation and screens where available. Otherwise it uses the team's familiar work hierarchy. It starts with the conversation's relevant tasks and searches relevant linked sources and connected trackers within the current project.

| Symbol | Meaning |
| --- | --- |
| ⚪️ | Not started |
| 🟡 | In progress |
| 🔵 | Needs Info |
| 🟢 | Done for the current phase |
| 🐌 | Information is likely stale |

Done depends on the phase, such as on dev, ready for review, or in production. The snail is a separate freshness judgment and can appear alongside a work status. Missing information uses blue so you can supply the detail or point to a source.

Tracker IDs appear beside relevant items, with clickable links below the tree. Parent summaries stay brief and account for collapsed child work. Status reading does not change tasks or send messages.

## Follow Up

```text
Expand Operations, keeping the current context.
What information is missing for invoice download?
Why does Checkout look stale?
Show four levels this time.
```

No particular connector is required. With no tracker access, provide excerpts or use conversation context. The skill will state material gaps rather than inventing status or sources.

See the [design](/tree-status/design/), [glossary](/tree-status/glossary/), and [verification record](/tree-status/verification/).


## Develop From a Repository Checkout

The repository is the source of truth for local edits. Link local installations to its skill directories so edits take effect without maintaining separate copies.

From the repository root, when the destination paths do not already exist:

```bash
mkdir -p "$HOME/.agents/skills"
ln -s "$PWD/skills/sams-tree" "$HOME/.agents/skills/sams-tree"
ln -s "$PWD/skills/sams-status" "$HOME/.agents/skills/sams-status"
```

For an existing copied installation, compare it with the repository first and preserve any differences before replacing the copy with a link. Keep the checkout at a stable location. The standalone packages remain self-contained for other users.
