---
title: Roadmap
description: What is available now and the evidence required before expanding the public skill collection.
---

- `Tease:` Maintain the skills Sam uses before expanding the catalog.
- `Lede:` The collection already ships two independently installable skills, shared marketplace packaging, and public human and machine documentation.
- `Why it matters:` Growth is useful only when each addition remains focused, portable, and verified.
- `Go deeper:` Finish the evidence and automation work below before treating collection size as progress.

## Available now

- Public `ThatGuySam/skills` repository.
- Standalone `htma-measure` skill.
- Standalone `zach-prompting` skill.
- Open Skills CLI discovery and installation.
- Codex marketplace and plugin installation.
- Claude Code marketplace and plugin installation.
- Calibrated memo template and JSON output contract.
- Public documentation and machine-readable `llms*.txt` surfaces.

## Next

1. Collect real-world HTMA Measure memos and calibration outcomes.
2. Review whether repeated HTMA Measure failure modes belong in its core skill or a reference.
3. Add installation smoke tests to continuous integration.
4. Publish versioned releases when a published skill's contract changes.
5. Consider publishing more skills only when each works independently and has a clear public use case.

## Instruction-system audit follow-up

The [2026-07-17 instruction-system audit](/research/instruction-system-audit-2026-07-17/) found eight contract-level improvement areas. HTMA data integrity is complete. The remaining sequence is:

1. Make external-write and destructive-action authorization explicit across wrappers and protected-plugin bridges.
2. Replace stale model, tool, and missing-skill assumptions with runtime discovery and supported fallbacks.
3. Make package-manager and framework guidance defer to each application's declared stack.
4. Separate docs content preflight from live authentication and deployment verification.
5. Resolve contradictory output shapes, secret-handling instructions, and unsupported local-state fallbacks.
6. Remove ambiguous production/experimental triggers and narrow overlapping research-skill descriptions.
7. Refresh stale scoped instructions and document every custom skill's canonical ownership topology.

## Expansion gate

A new public skill belongs in this repository only when it is:

- specific enough to trigger reliably;
- self-contained or honest about optional dependencies;
- verified on realistic tasks;
- free of private workspace context;
- documented with install and use examples; and
- licensed for public reuse.
