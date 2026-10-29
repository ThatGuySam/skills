# Static Env-Spec Checker

This dependency-free checker validates a deliberately bounded subset of the [Env-Spec reference](https://varlock.dev/env-spec/reference/). It uses Node's `util.parseEnv` after a lexical gate. Run with Node 22 or newer. It never executes annotations, resolves configuration functions, loads an environment automatically, or validates the process environment.

## API

```js
import { checkEnvText } from './check-env-example.mjs';
const report = checkEnvText(newlyAuthoredText, { mode: 'template' });
```

Reports contain `ok`, `complete`, `mode`, `count`, `missingRequired` (key names), and `diagnostics` (line, key, code, message). Reports omit values, source excerpts, documentation URLs, enum members, and raw exceptions. Key names are intentionally visible. Invalid/unsupported input sets `ok=false`. A required blank is valid in template mode but sets `complete=false`. Values mode rejects required blanks. Optional blanks skip type checks.

## CLI

Run these commands from the skill's `scripts/` directory. File mode also requires Git. Paths supplied to `--file` are relative to the current working directory.

```sh
node check-env-example.mjs --stdin --mode template
node check-env-example.mjs --file path/to/.env.example --mode template
node --test check-env-example.test.mjs
```

Use stdin only for newly authored text. The CLI cannot establish the provenance of piped input. Do not pipe existing private env files into it.

File mode accepts only the exact basename `.env.example`. It checks Git tracking and requires a regular blob committed at HEAD (mode 100644 or 100755). It reads that committed blob by object ID, never the working-tree env file. Consequently, uncommitted edits do not affect the check. A committed symlink is refused; a working-tree symlink replacing a committed regular file cannot redirect the blob read. The containing directory must exist and identify a Git repository. Input is capped at 1 MiB.

Exit statuses are 0 for a supported valid result, 1 for invalid/unsupported content, and 2 for command or input refusal. Importing the module does not run the CLI.

## Supported Syntax

Preceding comment blocks support actual `@required`, `@optional`, `@sensitive`, and `@public` decorators, either bare or with `=true`/`=false`. Required/optional and sensitive/public pairs cannot be combined, even when one is false. Root `@defaultRequired` and `@defaultSensitive` accept explicit booleans in the header. Their defaults are both true. Every assignment defaults to string type and needs no annotation.

Types are `@type=string`, `@type=boolean`, `@type=enum(debug, info)`, `@type=number(min=1, max=10, isInt=true)`, and `@type=port(min=1, max=65535)`. Number bounds must be finite decimals. Integer numbers must fit JavaScript's safe integer range. Ports always stay within 0 through 65535. Boolean values use the exact spellings `t,true,yes,on,1,f,false,no,off,0`. Enum members may be simple tokens or quoted static strings, including quoted commas or brackets.

Repeated `@docs(https://docs.example.org/)` or `@docs("Label", https://docs.example.org/)` annotations are accepted. URLs must use HTTP or HTTPS and contain no username/password. No URL is fetched. `@example="clearly synthetic"` is accepted as metadata. Ordinary prose comments may interleave; an at-sign within prose is ignored. Blank lines and divider comments starting with `---` or `===` break attachment. Detached item annotations produce errors.

Assignments support a single line with plain, single-quoted, or double-quoted values. Plain inline comments and quoted hash characters are supported. Escapes, multiline values, interpolation, backticks, function expressions, inline decorators, unquoted arrays/objects, and unquoted `undefined`/`null` are refused. Quoted bracket characters remain literal strings. Unsupported decorators, types, and options fail closed. This is a static subset checker, not a full Varlock evaluator. Plain annotations do not enforce types in an ordinary dotenv loader. Cross-variable conditions are not checked. A variable omitted entirely cannot be detected without a separate inventory of the application's configuration consumers.

## Verification Scope

Tests use only newly authored synthetic strings and a temporary synthetic Git repository. They cover type failures, required/optional behavior, roots, metadata attachment, duplicates, unsupported syntax, sanitized output, command errors, and committed blob isolation. The checker was tested with Node v26.6.0; compatibility with older supported Node versions was not separately executed.

## Sources

Supported annotation spelling and semantics were checked on 2026-10-09 against the [syntax reference](https://varlock.dev/env-spec/reference/), [item decorators](https://varlock.dev/reference/item-decorators/), [types](https://varlock.dev/reference/data-types/), and [root defaults](https://varlock.dev/reference/root-decorators/). This is a local static checker, not an upstream conformance implementation.

## Layout Check and Formatter

Run from the skill's `scripts/` directory with newly authored text on stdin:

```sh
node format-env-example.mjs --check --stdin
node format-env-example.mjs --format --stdin
node --test format-env-example.test.mjs
```

Check mode exits 0 for clean spacing, 1 for missing block spacing, and 2 for unsupported input. Diagnostics contain line numbers and fixed messages, never source text. Format mode prints the revised candidate; it has no file-reading or file-writing mode. Never pipe an actual runtime env file into it.

The rule separates a new prose-comment block from an immediately preceding active or commented assignment when another assignment follows the block. Annotation-only groups stay compact. Existing whitespace and nonblank text remain unchanged; formatting is idempotent. Shared group design and trailing-note placement remain editorial decisions. Multiline, escaped, and dynamic assignment syntax is refused conservatively.

Dashboard review is separate: check that a link targets the right credential or setting, not merely the provider's home page. Public documentation can establish the route pattern; it does not prove an authenticated page was opened. The formatter does not invent or verify URLs.
