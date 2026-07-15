---
title: Verification
description: The structural, installation, and forward-use checks run for Zach Prompting on July 15, 2026.
---

- `Tease:` The package, docs, and review modes were exercised before publication; live model behavior still needs task-specific evals.
- `Lede:` Zach Prompting passed structural validation, a clean local Skills CLI install, and the documentation gate, then completed four fresh-context forward uses on July 15, 2026.
- `Why it matters:`
  - The checks prove the public package is discoverable and that the workflow can preserve boundaries across rewrite, migration, and assessment-only requests.
  - They do not prove that every rewritten prompt will outperform its baseline.
- `Go deeper:`
  - Review the exact checks and limitations below.
  - Keep future model and prompt comparisons tied to representative evals.

## Results

| Surface | Check | Result |
| --- | --- | --- |
| Skill structure | Official `quick_validate.py` against `skills/zach-prompting` | Passed: `Skill is valid!` |
| Agent metadata | YAML parse of `agents/openai.yaml` | Passed |
| Portable install | Skills CLI `1.5.14` selected `zach-prompting` from two discovered skills and installed it into a clean temporary Codex target | Passed |
| Installed content | Recursive comparison of the installed directory with the canonical source | Passed: no differences |
| Distribution manifests | JSON parsing plus `claude plugin validate . --strict` | Passed |
| Claude marketplace bundle | Clean temporary marketplace add and install with the stable `htma-measure` install ID | Passed; the installed bundle contained both canonical `SKILL.md` files with no differences |
| Remote GitHub publication | Compare `refs/heads/main` with publication commit [`54ac5d4`](https://github.com/ThatGuySam/skills/commit/54ac5d427ee94efec808d39e0d4af5f3a7ea312d) | Passed |
| Remote Skills CLI install | Install `zach-prompting` from `thatguysam/skills` into a second clean temporary Codex target | Passed; two skills were discovered, one was selected, and the installed directory matched the source |
| Remote Claude install | Add `thatguysam/skills` as a fresh marketplace and install the collection bundle | Passed at version `54ac5d427ee9`; both installed skill directories matched the source |
| Docs build | `bun run build` in `apps/docs` | Passed; generated the Zach Prompting route and all three `llms*.txt` files |
| Docs-spec gate | Canonical `docs-spec/scripts/check.sh` | Passed: 11 checks, 0 warnings, 0 failures |
| Forward use | Four fresh-context agent runs described below | Passed for workflow adherence; behavioral superiority remains awaiting evals |

## Collection namespace verification

After the collection namespace changed to `sam`, a fresh remote Claude marketplace install at public commit [`8405b24`](https://github.com/ThatGuySam/skills/commit/8405b244fc09) retained the existing install key, loaded the plugin as `sam`, listed both published skills in `claude plugin details`, and matched both canonical skill directories without differences.

This verifies the packaging behind `/sam:zach-prompting`. It does not replace a behavioral model eval of a prompt revised with the skill.

## Forward-use cases

### Rewrite a contradictory `AGENTS.md`

A synthetic fixture mixed incompatible rules about approvals, diagnosis versus implementation, tool use, response length, and test frequency. The skill produced a smaller instruction file that preserved safe read authority, diagnosis-only behavior, relevant-tool selection, targeted tests, secret protection, sensitive-action approval, and the user-only-input stop rule.

Static scenario checks covered diagnosis, authorized changes, destructive or external actions, and missing user input. No executable model-eval harness was available, so the output correctly reported `awaiting-evals`.

### Review without editing

A synthetic release skill asked for immediate deployment and prior approval, required every tool, promised never to fail, and lacked measurable completion criteria. In assessment-only mode, Zach Prompting did not rewrite or modify the artifact. It identified the contradictions and returned a minimal patch plan plus eight representative eval scenarios.

### Migrate a legacy prompt to Claude Fable 5

A synthetic legacy prompt required private chain-of-thought disclosure, every tool, endless searching, repository edits for every request, false completion after failed tests, and maximum effort for all work. The migration read the conditional vendor reference, removed those directives, preserved the coding-assistant purpose, and separated portable instructions from runtime effort configuration.

The result statically covered read-only explanation, authorized edits, failing tests, user-only missing information, and destructive or external actions. It remained `awaiting-evals` because a live Fable 5 comparison was not available.

### Review a real repository instruction file

The skill reviewed `apps/docs/AGENTS.md` without editing it. It found that the file listed the deployed corpus before the authoritative working source and relied on header-only checks, even though the live deployment did not yet contain the new Zach Prompting page. It recommended distinguishing source, build artifact, and production snapshot, then checking changed content after deployment. That narrow correction was applied separately after the review.

## Limitations

- The forward uses validate workflow adherence and reveal whether the skill produces useful, bounded outputs; they are not controlled comparisons of downstream model quality.
- No live GPT-5.6 or Claude Fable 5 API eval suite was available in this repository.
- Production documentation is a separate deployment state and must be verified against changed page content and the live machine corpus.
- Future claims of improved task performance require a baseline, representative cases, explicit pass conditions, and the same evals after each targeted prompt change.
