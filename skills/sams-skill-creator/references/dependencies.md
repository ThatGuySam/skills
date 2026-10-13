# Dependency operations

Run these commands in this skill's directory, never in the project being worked on:

```sh
npm ci --ignore-scripts
npm run skills:install
npm run preflight --silent
```

`package.json` declares the sources and private destination. `package-lock.json` pins the installer. `skills-lock.json` records each upstream commit and skill-tree integrity. Installed copies live in `.runtime/skills/`. Internal skill trees stay in hidden directories so they are not exposed as duplicate top-level skills. The Codex adapter is a bundled, content-locked snapshot under `.sources/codex-creator/`; it is not an Anthropic skill and has no invented Git version. `.sources/origins.json` records its provenance. Poteto's support package supplies relative runtime-mapping references used by Automate Me, not another automatically invoked workflow.

Preflight verifies installed trees, bundled local source, critical supporting files, and manifest/lock agreement. Its receipt identifies the mixer instructions as well as the ingredients. Compare starting and ending receipts when a run needs reproducibility; timestamps may differ, hashes may not. Installation integrity alone does not prove trustworthy instructions or behavioral quality.

## Check freshness without changing pins

```sh
npm run skills:outdated --silent
```

The command checks configured upstream default-branch heads and the current installed Codex creator, when accessible. It makes no file changes. `update-available`, `unknown`, and `local-update-available` are distinct from current. “Current” means checked against that upstream at the reported time, not permanently latest. A pinned run remains reproducible when a newer upstream exists.

## Adopt a refresh

Refresh when the user requests updates or maintenance, before starting the next authoring run. First preserve the old manifest, locks, source snapshots, and installed copies in task evidence. Then:

```sh
npm run skills:update
npm run preflight --silent
```

This re-resolves remote default branches and updates pins. It does not refresh the bundled Codex snapshot from the host. To refresh that adapter, inspect the current runtime-provided creator, replace only `.sources/codex-creator/` with its complete skill directory, record its origin, then run `npm run skills:update -- codex-creator`. Review the diff before using it.

Review changed entrypoints and affected references for altered scope, tools, approvals, output contracts, and completion criteria. Reconcile the mixer adapters and rerun affected tests before accepting the set. Restore the prior snapshots and perform a frozen install if rejecting the refresh. Keep the originals rather than hand-editing hashes to accept unexpected bytes.

The installer is the same prototype used by Sam UX Audit, pinned to `luisalima/skills-lock` commit `4e37719a163b6022d4a2828850567421f9de7825`. It does not resolve transitive skill dependencies. Its frozen install can replace earlier copies before a later dependency fails, so run preflight after any install attempt. Optional external pointers do not silently install or execute additional workflows. Preserve package/network release-age controls; unavailable upstream checks mean freshness is unknown. Never replace a locked dependency with a similarly named global skill during an active run.

The bundled Codex creator snapshot retains its Apache-2.0 license at `.sources/codex-creator/license.txt`. Upstream methods retain their own licenses and authorship; this mixer does not relicense them. Downloaded runtime copies are restored from their source repositories rather than included in this public package.
