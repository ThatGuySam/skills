# Validation record

The checks in the first table ran on 2026-09-26 against the candidate containing
the revised skill and documentation. The two revised-run skill snapshots matched
the canonical skill file hashes recorded in `revised.json` for that candidate.
The checker repair and recheck on 2026-10-01 are recorded separately below.

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
bash "$DOCS_SPEC_DIR/scripts/check.sh" "$(pwd)"
```

The install added 395 dependencies without changing the tracked lockfile.
The build retains nonfatal notices for deprecated Markdown processor options
and a missing custom 404 entry. No dependency upgrade or deployment occurred.

## Docs-spec gate

To repeat the documentation gate, use an authorized installation of the full
`docs-spec` skill and set `DOCS_SPEC_DIR` to its root before running the command
above. Build the site first. The checker uses Bash, Perl, and standard shell
utilities. A replacement smoke check does not reproduce this gate.

The recorded 2026-09-26 run produced:

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

No auth Worker, gated routes, or other docs-spec scaffold behavior was added
to the public site.

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

## Checker repair and recheck, 2026-10-01

The checker now raises validation errors unconditionally. Python's `-O` mode
no longer removes integrity or response-contract checks. A failing revised-run
check also exits before printing any `PASS` line.

`run.json` now records `expected_sha256` for the retained `expected.json`:

```text
4362cf7ac0abf119f39983e87641746e919dd0f49ce4a846d46d06c0a4e60cd7
```

This hash was added retrospectively on 2026-10-01. It detects subsequent edits
to the retained requirements, including changes that keep all case IDs the
same. It does not prove which requirements existed before the 2026-09-26 run
or independently establish when they were written. The historical account of
requirements being withheld from runners remains an account of that run.

The following commands passed on 2026-10-01:

```bash
python3 evals/migrate-cgpt/check.py
python3 -O evals/migrate-cgpt/check.py
python3 -m unittest discover -s evals/migrate-cgpt -p 'test_check.py'
python3 -O -m unittest discover -s evals/migrate-cgpt -p 'test_check.py'
git diff --check
```

Both checker modes passed the six baseline cases, nine retained files, eight
baseline responses, and eleven revised-run responses. All 27 regression tests
passed in both normal and optimized test runs. The CLI tests use disposable
copies and exercise corruption, missing requirements hashes, duplicate and
missing cases, path escapes including symlinks, missing resources, and invalid
responses with updated hashes. Each CLI case runs the checker both normally
and with `-O`.

These checks replay retained evidence. They do not rerun a model, establish
semantic correctness, or repeat the packaging and documentation checks from
the historical table.
