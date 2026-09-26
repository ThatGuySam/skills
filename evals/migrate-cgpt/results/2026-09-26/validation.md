# Validation record

All checks below ran on 2026-09-26 against the candidate containing the revised
skill and documentation. The two revised-run skill snapshots match the final
canonical skill file hashes in `revised.json`.

| Check | Observed result |
| --- | --- |
| Official skill-creator quick validator | Five canonical skills passed. |
| Migration SKILL/reference links | 16 relative links checked, none missing. |
| YAML and distribution manifests | Skill frontmatter accepted; JSON manifests parsed and strict validations passed. |
| Claude strict marketplace | Exit 0, `success: true`, zero errors/warnings. |
| Claude strict plugin manifest | Exit 0, `success: true`, zero errors/warnings. |
| Codex app-server plugin/read | Exit 0, all five canonical skill paths loaded, including migrate-cgpt. |
| Skills CLI discovery | Found exactly five skills; eval evidence was not discovered as installable skills. |
| Clean Skills CLI project installation | Only migrate-cgpt selected; installed files match canonical source recursively. |
| Recorded migration evidence | Six baseline cases/eight responses and two reruns/eleven responses pass integrity and exact-constraint replay. Semantic review is in assessment.md. |
| Checker regression tests | Three tests pass, including rejection of malformed/extra JSON and three-question briefs with alternate markers. |
| Documentation unit tests | 3/3 passed. |
| Astro build | Exit 0, 37 pages, llms.txt, llms-full.txt, and llms-small.txt. |
| Original docs-spec checker | Exit 0, 11 passed, zero warnings, zero failures. |
| Built corpus | Contains the changed migration guide and `19 observed responses`. |
| Whitespace/conflict checks | git diff --check passes; no merge-conflict markers. |

## Tool versions and setup

Python 3.12.14, Node 24.19.0, npm 11.9.0, Bun 1.4.2, Skills CLI 1.7.0,
Claude Code 2.1.283, Codex 0.154.0-alpha.3. Codex was already available in the
host. Missing CLI tools were installed into disposable tooling directories:

```bash
npm install --prefix "$TOOLING" --no-save skills@1.7.0 @anthropic-ai/claude-code@2.1.283
npm install --prefix "$BUN_TOOLING" --no-save bun@1.4.2
```

The commands below show the corresponding binary names; the run used their
absolute paths in those tooling directories. The documentation dependency setup
followed `apps/docs/README.md`:

```bash
cd apps/docs
bun install --minimum-release-age 604800
bun run test
bun run build
bash "$HOME/.codex/skills/docs-spec/scripts/check.sh" "$(pwd)"
```

The install added 395 dependencies without changing the tracked lockfile.
The build retains nonfatal notices for deprecated Markdown processor options
and a missing custom 404 entry. No dependency upgrade or deployment occurred.

## Canonical docs-spec source

The checker was missing from the initial host. Authorized repository access
recovered the original full skill from `ThatGuySam/notes-search`, revision
`e80f979305d203a6c5e2797c82ec4ba2b4a596d1`, under
`.agents/skills/docs-spec/`. Its SKILL.md documents the global Claude/Codex
locations and the build-then-check command. The full directory was copied to
`~/.claude/skills/docs-spec`; `~/.codex/skills/docs-spec` links there. The checker
uses Bash, Perl, and standard shell utilities. The current tree contains the
full skill even though an older setup note calls that repo path a thin bridge.

- Script path: `.agents/skills/docs-spec/scripts/check.sh`
- Git blob: `a40e496f40115fe1dc6eeb510c54028845ad0675`
- SHA-256: `9c6e7d2ee7da230bd28cd059512857ce008ddac7ccc292afe075399e1d6a5b7a`

The installed script's checksum matched before and after both runs. Its output:

```text
build output present (dist/)
llms.txt generated
llms-full.txt generated (optional cross-cutting export)
human tier present (overview/ or design/)
machine tier present (features/, architecture/, or reference/)
open-questions page present (records what's undecided)
research section present (the source-backed memos behind the spec)
every active sidebar entry resolves to a file
feature spec complete: features/calibrated-estimates.md
feature spec complete: features/measurement-memos.md
feature spec complete: features/sources-and-voi.md
summary: 11 passed, 0 warnings, 0 failures; gate passed
```

This is the original gate, not a replacement check. No auth Worker, gated
routes, or other docs-spec scaffold behavior was added to the public site.

## Package commands

From repository root, with the official skill-creator path resolved:

```bash
for skill in skills/*/SKILL.md; do
  python3 "$SKILL_CREATOR_DIR/scripts/quick_validate.py" "$(dirname "$skill")"
done
claude plugin validate . --strict --json
claude plugin validate .claude-plugin/plugin.json --strict --json
node evals/migrate-cgpt/plugin-read.mjs .
python3 evals/migrate-cgpt/check.py
python3 -m unittest discover -s evals/migrate-cgpt -p 'test_*.py'
git diff --check
```

`codex plugin validate .` was attempted and exited 2 because this Codex version
has no such subcommand. The recorded Codex check is the actual read-only
`plugin/read` app-server RPC, using that installed version's local API types.
The retained `plugin-read.mjs` reproduces it and accepts `CODEX_BIN` if the
executable is outside PATH. It makes no installation or automatic-trigger claim.
Claude's strict validator is separate and passed both manifests.

From a new disposable project, with `REPO` pointing to the candidate checkout:

```bash
DISABLE_TELEMETRY=1 skills add "$REPO" --list
DISABLE_TELEMETRY=1 skills add "$REPO" --skill migrate-cgpt --agent codex --yes --copy --json
diff -r "$REPO/skills/migrate-cgpt" .agents/skills/migrate-cgpt
```

`--list --json` was unsupported and was retried using the supported `--list`.
This checks local candidate packaging, not the published default branch,
ChatGPT personal installation, or a disconnected Mac. No live integrations,
hosted migration, original-GPT comparison, or automatic trigger was exercised.
