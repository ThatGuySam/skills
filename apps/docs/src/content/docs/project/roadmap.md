---
title: Roadmap
description: What is available now and the evidence required before expanding the public skill collection.
---

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

1. Collect real-world measurement memos and calibration outcomes.
2. Review whether repeated failure modes belong in the core skill or a reference.
3. Add installation smoke tests to continuous integration.
4. Publish versioned releases when the skill contract changes.
5. Consider publishing more skills only when each works independently and has a clear public use case.

## Expansion gate

A new public skill belongs in this repository only when it is:

- specific enough to trigger reliably;
- self-contained or honest about optional dependencies;
- verified on realistic tasks;
- free of private workspace context;
- documented with install and use examples; and
- licensed for public reuse.
