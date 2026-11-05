# Tree Format

This presentation contract is owned by `sams-tree`. An identical bundled copy in `sams-status` lets either skill install independently. Keep both copies aligned when changing the collection.

- Use a fenced `text` block with Unicode branches such as `├──`, `│`, and `└──`. Keep one short item per line and align connector columns.
- Prefix every item label with a meaningful emoji or visual marker so branches and leaves are easy to scan. Use consistent category markers such as 📁 for groups and 📄 for items when no more useful subject-specific marker is evident.
- For work-status trees, use the established status symbol as the row marker rather than stacking decorative icons. For ordinary trees, category markers do not imply progress or completion.
- If the user requests no emoji or the output medium cannot render them, use compact text markers such as `[group]` and `[item]`, retaining the branching and indentation. An explicit request for a different format takes precedence.
- Leave the subject or project implied, outside the tree's counted levels. A short introductory line may disambiguate it.
- Show at most three displayed levels by default. The first visible items are level one. Honor requests for more detail.
- Use known or easily inferred names and groupings. Combine deeper known paths with `->`, retaining their names and order.
- Collapse non-relevant branches by showing their name followed by `…`. The ellipsis means hidden detail, not missing or completed work. Expand on request.
- Preserve sibling order from the familiar source hierarchy when known. Prefer short labels over sentence-length descriptions.
- Put helpful source IDs beside the items they support. Below the block, provide clickable links keyed by those IDs. Reuse one link per source; keep URLs outside the tree. Never invent IDs or links.
- If useful, add up to three simple proposed grouping names outside the tree. Do not apply those new groupings without a user request.

`sams-status` defines the work-status and freshness vocabulary. Add a compact legend only when a marker’s meaning is not obvious or already established.
