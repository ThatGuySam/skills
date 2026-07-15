---
title: About this collection
description: What Sam publishes here, what earns a place, and how the collection stays portable and trustworthy.
---

- `Tease:` These are skills Sam uses, not a catalog filled for its own sake.
- `Lede:` Sam's Skills is a public collection of focused agent workflows that have earned a place in Sam's own toolkit and are packaged so other people can use them too.
- `Why it matters:` A smaller, maintained collection is easier to trust, install, and improve than a pile of overlapping prompts with unclear provenance.
- `Go deeper:` Choose a skill for one workflow, install the full bundle when you want the collection, and use each skill's verification page to see what has actually been checked.

## What earns a place

A skill belongs here when it is:

- used in real work rather than published as speculative inventory;
- specific enough for an agent to trigger reliably;
- independently useful and honest about optional dependencies;
- portable outside Sam's private workspace;
- free of private information and fabricated evidence;
- documented with real installation and usage examples; and
- validated on representative tasks with limitations recorded.

## Current skills

| Skill | Use it for | Start here |
| --- | --- | --- |
| Zach Prompting | Improve prompts, skills, agent definitions, tool descriptions, and repository instructions without weakening their contract. | [Read the guide](/zach-prompting/introduction/) |
| HTMA Measure | Turn uncertain costs, risks, ROI, market size, and other quantities into calibrated, decision-ready estimates. | [Read the guide](/overview/introduction/) |

Each skill remains canonical in its own `skills/<name>/` directory. Collection packaging points to those directories instead of copying their instructions.

## Names you will see

- **Repository:** `ThatGuySam/skills`
- **Standalone skills:** `zach-prompting` and `htma-measure`
- **Marketplace:** `thatguysam-skills`
- **Stable plugin install key:** `htma-measure@thatguysam-skills`
- **Claude Code bundle namespace:** `/sam:<skill>`

The install key is retained so existing marketplace users keep working. The `sam` namespace is the human-facing prefix for skills inside the collection.

## Publishing contract

The public repository, this site, and the machine-readable corpus should describe the same collection. A change is not presented as shipped until its source is committed, its relevant checks pass, and the deployed content is verified.
