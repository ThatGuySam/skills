---
title: Roadmap
description: What is available now and the evidence required before expanding the public skill collection.
---

Maintain the published skills, improve their evidence, and automate installation checks before adding more skills.

## Available now

- Public `ThatGuySam/skills` repository.
- Independently installable skills listed in the [collection catalog](/collection/about/#current-skills).
- Open Skills CLI discovery and installation.
- Codex marketplace and plugin installation.
- Claude Code marketplace and plugin installation.
- Calibrated memo template and JSON output contract.
- Public documentation and machine-readable `llms*.txt` files.

## Next

1. Collect real-world HTMA Measure memos and calibration outcomes.
2. Review whether repeated HTMA Measure failure modes belong in its core skill or a reference.
3. Extend clean-room installer smoke tests beyond the catalog and docs checks in continuous integration.
4. Publish versioned releases when a published skill's contract changes.
5. Consider publishing more skills only when each works independently and has a clear public use case.

## Expansion gate

A new public skill belongs in this repository only when it is:

- specific enough to trigger reliably;
- self-contained or honest about optional dependencies;
- verified on realistic tasks;
- free of private workspace context;
- documented with install and use examples; and
- licensed for public reuse.
