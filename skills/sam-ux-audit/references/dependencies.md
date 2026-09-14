# Dependency Operations

## SBC4

- `Tease:` Update deliberately; restore exactly.
- `Lede:` This package uses skills-lock for Git/content pins and npm for the package-manager dependency. Dependencies install privately inside this suite.
- `Why it matters:` Existing global skills remain untouched, and a report can identify its exact instruction set.
- `Go deeper:` Run the commands below from this skill's directory.

## Commands

```sh
npm ci --ignore-scripts
npm run skills:install
npm run audit:preflight --silent
```

`package.json` declares source intent. `package-lock.json` pins the installer. `skills-lock.json` pins remote commits and skill-tree hashes. `.runtime/skills/` contains disposable installed copies. Keep manifests and locks; restore ignored installation directories. Never run these commands from the repository root.

For an explicitly requested refresh:

```sh
npm run skills:update
npm run audit:preflight --silent
```

Review changed source commits and instruction diffs before applying them to a site. Reject newly introduced scope expansion, incompatible tools, or unsupported authority. Record changed pins and the review result in the audit report or update handoff. Restore the prior lock and perform a frozen install if a candidate is rejected. Updates are never scheduled implicitly.

“Latest” means the configured upstream default branch at refresh time, subject to applicable release-age policy. Skill repositories often lack semantic releases; this is Git commit pinning, not npm semver resolution. Do not edit hashes by hand to silence failures.

The base audit method ships inside `references/`; there is no dependency on a private workspace or sibling skill. The five upstream packages are independently locked.

## Boundaries and Known Limits

The installer is [skills-lock](https://github.com/luisalima/skills-lock), pinned to `4e37719a163b6022d4a2828850567421f9de7825`. It is a prototype with no transitive skill-dependency resolver or semver ranges. Do not add a package whose required references live outside its copied skill directory without addressing that packaging dependency first.

The suite overrides the install destination to `.runtime/skills`; aliases such as `hig` prevent collisions with globally installed names. `install --frozen` verifies source hashes and restores copies, but can change some copies before a later dependency fails. A failed install blocks the audit. Preflight separately verifies every installed tree before use.

An integrity hash proves byte consistency, not trustworthy advice. Keep upstream files unchanged. User instructions and applicable standards determine scope and interpretation. Browser tools and the LLM runtime are separate dependencies; this package installs instructions and does not create a headless audit service.

If npm or Git cannot reach the source, preserve the lock and report the failed dependency. If the existing install passes preflight it can support a pinned audit, but cannot be called freshly updated. Do not bypass release-age settings or replace the installer with an unpinned `npx` invocation.
