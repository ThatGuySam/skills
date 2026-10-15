---
name: sams-tree
description: Organize supplied or established material into a familiar, scannable plain-text tree. Use for tree views of notes, topics, plans, or work, without adding project-status investigation.
---

# Sam's Tree

Make a large amount of information easy to scan without making the reader learn a new organization. Every tree must combine branch connectors, short labels, and a meaningful emoji or visual marker on each row; plain unmarked labels are not the default.

Use the subject and scope established by the prompt and conversation. Read [the tree format](references/tree-format.md), which this skill owns. Render the tree directly when the material is sufficient; ask only when an essential scope or relationship cannot be inferred.

## Organize Familiar Material

- Keep known names and groupings. Infer obvious relationships from the supplied material, but do not silently invent categories or factual relationships.
- Preserve an explicitly requested hierarchy. Otherwise choose the structure the reader is most likely to recognize.
- For interactive products, prefer known navigation and screens. If those are unavailable, use the team's familiar internal work hierarchy. For other subjects, use their established organization.
- When useful, suggest up to three simple new grouping names after the tree. Show names only, separately from the existing structure. Zero suggestions is valid.

## Scope and Detail

Default to three displayed levels beneath an implied subject or project. Collapse non-relevant branches, retaining their names so the reader can ask to expand them. Compress deeper familiar paths with `->`, preserving the original names and order.

The user may request more levels or expand a branch. Keep the rest of the view stable unless the new request changes its scope.

Work from available material. A tree request does not require searching connected trackers, assigning work statuses, or changing source records. For a project status request, use `sams-status` when available; this skill remains usable on its own.
