# Installation and Discovery

Use this branch for claims about installation, selector names, discovery or reload behavior.
Keep installation changes within the user's authorization. Verification alone does not authorize an install.

## Inspect the Installation

1. Record the target runtime, version, process/session state and expected selector.
2. Inspect the logical installation path, symlink target and resolved real path.
3. Walk ancestors of both paths for plugin manifests, including `.codex-plugin/plugin.json`.
   Record manifest names and duplicate installations that could affect selection.
4. Compare the installed package with the canonical source, including bundled references and scripts.
   Matching bytes establish source equality. They do not establish runtime discoverability or selector names.

A link into a checkout can inherit packaging from an ancestor manifest.
A Codex runtime check observed `htma-measure:agent-verify` for a direct link into a checkout
whose ancestor `.codex-plugin/plugin.json` named `htma-measure`.
A copy outside that plugin ancestry appeared as `agent-verify`.
Treat this as an observed installation-dependent result, not a naming guarantee for every runtime.

## Check the Target Runtime

Inspect the actual target runtime's skill list or selector and invoke the expected skill when possible.
Reading `SKILL.md` directly tests loaded instructions, not discovery through the runtime.
A fresh CLI process tests that process. An already-open app or conversation may retain an earlier catalog.
Check existing-process reload separately; restart the target app if its supported refresh does not expose the change.
If target-runtime inspection is unavailable, report discovery or reload as unverified.
Record the observed selector, process state and check time with the result.

## Repair and Maintain Within Scope

When authorized, use the existing Skills CLI's `--copy` option to install outside plugin ancestry.
Inspect its current help and destination first. Preserve unrelated installations and user changes.
Keep one canonical authoring source. An independently copied installation is a runtime consumer,
not another maintained source; source edits require an authorized update or reinstall of that copy.
Record the update/reinstall command and recheck package equality, runtime discovery and reload afterward.
A symlink target may update immediately while an existing runtime still holds old discovery state.

Coordinate ownership before changing shared installations when concurrent agents may write them.
Capture links, hashes and manifests before and after the runtime check.
If another writer restores links or changes the package, preserve the evidence and report the race.
Recheck after writers stop; a transient copy does not establish durable installation state.
