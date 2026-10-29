---
title: Sam's Env Verification
description: Checks and limits for the environment-template drafting skill.
---

## Collection 0.12.0 checks, October 28, 2026

The renamed `sams-env` package passed 11 annotation-checker tests and 15 formatter tests. Skills CLI 1.7.2 discovered twelve skills in the release checkout and installed only `sams-env` into an isolated temporary Codex project. The installed package matched the source directory exactly. No global installation changed.

The formatter checks spacing around explanatory comment blocks while preserving assignments and newline style. These tests do not verify live credentials, provider access, or the quality of generated templates in real projects. Earlier evaluation results below describe their original release state.


Date: 2026-10-09. Status: two bounded drafting evaluations passed. The second uses the accepted tracked-example boundary and pragmatic comment style.

## Package Installation

The Skills CLI 1.7.2 installed `env-example` from the release checkout into an isolated temporary Codex project. It discovered eight collection skills and installed only the requested skill. Package files were compared against the source. The installed Node checker was exercised separately. No global skill installation was changed.

## Static Annotation Checker

The dependency-free checker and 11 `node:test` tests passed on Node.js v26.6.0. Tests cover supported types, required/optional values, numeric bounds, repeated docs links, duplicate keys and annotations, orphan comments, unsupported syntax, and value-free reports.

Synthetic Git tests confirm that file input refuses actual env names, untracked or uncommitted examples, and committed symlinks. A modified working copy or replacement symlink cannot redirect the committed-blob read. The tests create their own temporary repository and delete it afterward; user repository history is untouched.

The primary reviewer added probes for labeled dividers, unsupported enum literals, credential-bearing docs URLs, integer limits, and the exact three-variable example. Template mode passes with `complete: false` and `missingRequired: ["GITHUB_TOKEN"]`. Values mode rejects that blank. Node's native dotenv parser also reads the annotated example as the expected three assignments. All checks use newly authored strings or test-created Git blobs.

The checker supports a static subset, not the full Env-Spec language or Varlock runtime. It does not fetch secrets, execute expressions, enforce cross-variable conditions, or verify provider access. Older Node versions were not exercised. Read its [usage and limits](/env-example/checker/).

The bundled skill validator passed after integration. The installed checker passed the same 11 tests. The docs build passed, and the docs-spec gate reported 11 passes and no gate failures. Generated HTML and `llms-full.txt` include the annotated example and checker reference. The build retained the previously observed Markdown deprecation and missing custom 404 notices. These checks establish local behavior; live publication is verified separately.

## Concise Revision

After the user restricted existing env input to Git-tracked `.env.example` files, Git confirmed that the earlier fixture was untracked. It was not reread or modified. The new proposed text is stored in `skills/sams-env/evals/proposed-example.md`; docs import that text instead of opening an untracked env file.

Node.js v26.6.0 parsed the newly authored candidate string in memory. All five expected values matched. The `lsof -nP -iTCP:3000 -sTCP:LISTEN` one-liner also executed without option errors; process output was suppressed. This verifies the local inspection operation, not application readiness.

A fresh independent agent received the revised skill and Markdown contract, without prior examples. Its output is retained in `skills/sams-env/evals/concise-forward-test.md`. It preserved all five variables, missing/empty behavior, quoted hash, conditional credential, restart note, and unresolved permissions. In-memory parsing and duplicate checks passed. The primary reviewer inspected and independently parsed the candidate text. No env files were read or created in that evaluation.

The bundled skill validator passed for this revision. The docs build passed, and the docs-spec gate reported 11 passes with no gate warnings or failures. The build emitted the previously observed Markdown deprecation and custom 404 notices. Direct inspection confirmed the revised skill, port one-liner, and research page in `llms-full.txt`. Filename-only inspection found no env files in the docs build directory; the page no longer imports the untracked env fixture. Broader loader coverage and live provider behavior remain untested.

## Earlier Fixture Checks

These checks predate the stricter input rule and concern the earlier draft.

### Synthetic Fixture

The test contract defines five variables, including a conditional credential and a literal hash character. No application or provider integration exists. The skill and example are displayed directly in the [draft guide](/env-example/introduction/).

Node.js v26.6.0 parsed the canonical example and all five values matched the explicit fixture contract. The first assertion compared the parser's null-prototype object with a plain object and failed on prototype identity. Comparing their key/value data passed without changing the fixture.

### Structural Checks

The bundled `quick_validate.py` passed using an offline cached PyYAML dependency. Initial attempts with Python alone lacked that dependency; no package download was needed.

Strict validation passed for both the marketplace manifest and the Claude plugin manifest. The Astro docs build passed, and the docs-spec gate reported 11 passes, no warnings, and no failures. The build itself emitted a Markdown deprecation warning and a missing custom 404-entry notice.

Direct inspection confirmed that the generated HTML and `llms-full.txt` contain the canonical skill and example text. `git diff --check` passed for the tracked changes.

A docs build or metadata check does not establish provider connectivity or general skill reliability.

### Behavioral Evaluation

An independent agent receives only the skill and synthetic contract, then writes a separate example in a temporary directory. The authored example is withheld. Its output must satisfy the contract's pass conditions, including unknown-permission handling and non-disclosure of values during verification.

The original independent draft was retained locally as `forward-test.env.example`; it is not distributed in this package.

SHA-256: `c29222daeae2de94d0c56bf8a514c3e637fa66513bd8d25397b3835c41313dde`

The evaluating agent reported Node.js v26.3.0; the primary reviewer reran its documented parsing check with Node.js v26.6.0 and observed `Template parsing passed`. All five values matched the contract. The primary reviewer also inspected the comments for requiredness, missing/empty distinctions, restart guidance, links, and unknown-permission handling.

No live env files, provider calls, application startup, or authenticated dashboard checks were part of this evaluation. Both drafts correctly left the unspecified GitHub permissions unresolved. This one fixture supports a bounded drafting result, not reliability across all frameworks or loaders.

## Draft Change Map

Preserved: documentation links, dashboard links, and example commands from the explicit request.

Clarified: missing versus empty values, conditional credentials, loader-specific syntax, and distinct levels of verification.

Conditional: comment detail follows the complexity of each variable; the synthetic fixture is a reference, not a universal starter.

Unresolved: personal-history attribution and broader behavioral evaluation. The user settled source scope and comment detail; these decisions are recorded in the project docs. Those drafting evaluations did not include publication or provider verification.
