---
name: sams-env
description: Draft or improve .env.example files from project code and Git-tracked examples, with concise setup links, commands, and value guidance.
---

# Sam's Env

Write a `.env.example` that helps developers configure the project with minimal searching. Keep comments that help them choose, obtain, set, inspect, or troubleshoot a value.

## Inspect Safely

Read project instructions, code, configuration schemas, and package scripts. Restrict searches to relevant code and docs; exclude actual env and secret files.

Read existing env content only from Git-tracked files named exactly `.env.example`. Verify the path with `git ls-files --error-unmatch -- <path>`, then read its committed regular-file blob with `git show HEAD:<path>`. Skip untracked, uncommitted-only, or symlink examples. Never read `.env`, `.env.local`, other actual env files, or their history. Tracking does not guarantee secret-free content; do not reproduce apparent credentials.

Identify the loader, destination filename, consumed variables, requiredness, defaults, and missing/empty behavior. Check build-time versus runtime use and browser exposure. Flag unknown or stale settings; do not invent them or silently remove supported ones.

## Write Useful Comments

Group related variables. Put core settings first and optional integrations afterward. Give simple settings little or no commentary; expand where a developer would otherwise need to search or guess.

Include whichever details help that variable:

- Exact documentation URLs, preferably the relevant section.
- The exact dashboard page for creating, setting, or inspecting that value. A provider dashboard homepage is not enough. Resolve the value's owner first: an app-owned ADMIN_TOKEN stored as a Worker secret belongs in that Worker's settings, while a Cloudflare API token belongs on the API Tokens page. Use verified deep links or documented account-selector routes without private identifiers. If a precise URL is unavailable, state that and give the exact navigation path; do not guess a route or present a homepage as the answer.
- Verified single-line commands for useful set, get, generate, or check operations. State prerequisites and consequential effects. For secrets, prefer presence checks over commands that print values.
- Non-obvious accepted values or examples, including units, format, and meaningful defaults.
- Required permissions, dependencies, missing/empty behavior, or restart/rebuild rules when they prevent likely mistakes.

Write direct instructions with the project's actual names. Delete comments that merely restate the variable name or visible assignment. Put shared guidance once above its group. Keep URLs and command syntax intact; move long procedures and test reports into linked docs. Use no fixed comment quota, universal checklist block, or telegraphic prose.

Use safe defaults supported by code. Leave secrets blank with acquisition guidance. Comment out optional assignments when an active blank would override the intended default. Label any necessary placeholders unmistakably. Derive permissions and example values from source or provider docs, not guesswork.

Match the loader's quoting, comments, and expansion rules. Keep command snippets as comments. Documenting commands does not authorize executing them.

## Space Variable Blocks

Add a blank line before each new explanatory comment block, with its variable directly below. Apply the same rule to commented-out assignments such as `# FEATURE_FLAG=`. Keep consecutive comment lines together; never add blank lines inside an annotation block or between annotations and their variable.

Keep short related groups compact when they share one explanation. Annotation-only lines do not force a blank between neighboring assignments. Split long optional lists by purpose during drafting; the formatter cannot infer those groups. Put explanations above their variable or group, including fallback-alias notes.

Run the bundled `scripts/format-env-example.mjs --check --stdin` on newly authored text. Use `--format --stdin` to insert missing block spacing. It preserves assignment text, values, order, commented state, and newline style. It refuses ambiguous or multiline syntax. This layout check complements the static annotation checker; neither verifies dashboard destinations or live credentials.

## Use @env-spec Annotations

Use standard `# @...` comments for types, requiredness, sensitivity, and documentation. Keep ordinary dotenv assignments so existing loaders can ignore the annotations. Put item annotations directly above their assignment without a blank line. Use `@type=number(isInt=true)` for integers, `@type=port(...)` for ports, and `@type=enum(...)` for choices. String is the default type.

Use `@docs(URL)` for exact documentation and ordinary comments for dashboard links and one-line commands. Mark optional variables explicitly with `@optional` when appropriate; Varlock treats unmarked items as required by default. Annotations document a contract; they do not make an ordinary dotenv loader enforce it.

Read [checker usage and limits](references/checker.md) before using the bundled dependency-free Node.js checker. It supports a static subset and rejects everything outside that subset. Keep cross-variable requirements in prose and application validation unless the checker explicitly supports them. Do not simplify a real requirement just to obtain a passing check.

## Check and Deliver

Check coverage, duplicate assignments, documented commands, and ignore rules without opening local env files. Validate newly authored text in memory with the actual parser; do not reread an untracked output or stage it to satisfy the input restriction. Existing-file validation follows the same tracked-example rule. Use the parser directly; avoid application commands that auto-load local env files. Never source env text as shell code.

Preserve unrelated files. If updating an untracked example would require inspecting it, leave it untouched and return a proposed draft instead. Complete independent sections when a requirement is unknown; ask only when the gap prevents a correct result.

Report changes, checks, and unresolved inputs briefly. Distinguish parsing, application-schema validation, and provider verification. Commit, push, installation, publication, and provider mutations require separate authorization.

For the current annotation style, read the [annotated example](evals/annotated-example.md). For the earlier drafting evaluation, read the [synthetic contract](evals/contract.md). Its example is usable as an input only after it satisfies the tracked-example rule; it is not a universal starter.
