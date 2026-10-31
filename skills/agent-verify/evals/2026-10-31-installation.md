# Standalone Installation Regression Check

On 2026-10-31, a direct local installation link into this collection checkout caused Codex CLI 0.166.0 to insert `$htma-measure:agent-verify` when Agent Verify was selected. The checkout's ancestor `.codex-plugin/plugin.json` declares the collection's compatibility name `htma-measure`. The skill's own frontmatter remained `name: agent-verify`.

An earlier standalone-copy fix had passed fresh discovery. A concurrent agent subsequently replaced that copy with direct checkout links. Recorded tool calls and successful command output established that replacement; no automatic installer or sync daemon was responsible for the observed reversion.

## Actual Selector Check

A separate interactive `codex --no-alt-screen` process was opened before the repair. Typing `$agent-verify` and selecting the matching skill inserted:

```text
$htma-measure:agent-verify
```

The existing Skills CLI 1.7.4 installed a standalone copy outside plugin ancestry. A legacy Codex path was repointed to that installed copy, keeping both paths on the same runtime package. In the same still-running CLI process, clearing the input, typing `$agent-verify` and selecting it again inserted:

```text
$agent-verify
```

No model request was submitted. This check observed automatic selector refresh in that specific CLI process. It does not establish refresh behavior for every app, existing session, symlink layout or runtime version. No user session was reset. The test process was closed after inspection.

The canonical authoring source remains this public repository. Runtime copies require explicit update or reinstall. See [installation and discovery](../references/installation.md) for the verification branch and authorization boundary.
