---
title: Verification
description: Structural and packaging checks run for Sam's Gen Writing on October 7, 2026, and the checks still outstanding.
---

On October 7, 2026, Sam's Gen Writing passed the structural and manifest checks below. Network-dependent installation, the docs build, and the docs-spec gate could not run in the publishing environment. No behavioral evaluation has been run, so the skill's status is `awaiting-evals`.

## Results

| Surface | Check | Result |
| --- | --- | --- |
| Skill structure | Official `quick_validate.py` against `skills/sams-gen-writing` | Passed: `Skill is valid!` |
| Agent metadata | YAML parse of `agents/openai.yaml` | Passed |
| Smoke scenarios | JSON parse of `evals/evals.json` | Passed; five scenarios |
| Distribution manifests | JSON parsing plus `claude plugin validate . --strict` | Passed |
| Docs config | `node --check astro.config.mjs` and internal-link scan of `src/content/docs` | Passed |
| Docs scripts | `node --test src/scripts/*.test.mjs` | Passed: 3 tests |
| Portable install | Skills CLI install into a clean target | Not run: the npm registry was unreachable |
| Docs build | `bun run build` | Not run: dependencies could not be downloaded |
| Docs-spec gate | Canonical `docs-spec/scripts/check.sh` | Unavailable: the checker is not installed in the publishing environment |
| Forward use | Fresh-context runs of the smoke scenarios | Not run |

## Source review

The formal policy reference was read directly from Search Central on October 7, 2026. The podcast reference was built from Google's published Search Off the Record transcripts, with each finding checked against its speaker label and linked to the public episode page. The February 2023 and March 2024 Search Central blog posts could not be retrieved, so the skill cites them by title and date and relies on the current documentation for requirements.

## To finish verification

1. Run `bun run build` and the docs-spec gate in `apps/docs`, then confirm the new route appears in `dist/llms-full.txt`.
2. Install the skill with the Skills CLI into a clean target and compare it with `skills/sams-gen-writing`.
3. Run the five [smoke scenarios](https://github.com/ThatGuySam/skills/blob/main/skills/sams-gen-writing/evals/README.md) in fresh conversations and record the model, date, web access, and which expectations passed.
