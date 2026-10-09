# Synthetic Environment Template Test

This is a deliberately synthetic configuration contract, created for testing the drafting skill. It is not a production application, and no provider connection is implemented. Values below are test inputs chosen for this fixture, not measurements or personal configuration.

## Input Contract

The hypothetical process loads an env file once at startup using Node.js dotenv syntax. Use Node.js 22 or newer for the parsing check. All values remain strings until the process validates them.

| Variable | Contract |
| --- | --- |
| PORT | Optional integer from 1 through 65535. Missing defaults to 3000. Empty is invalid. |
| REQUEST_TIMEOUT_MS | Optional positive integer in milliseconds. Missing defaults to 5000. Empty is invalid. |
| ENABLE_GITHUB | Optional literal `true` or `false`. Missing defaults to `false`. Empty is invalid. |
| GITHUB_TOKEN | Required and nonempty only when ENABLE_GITHUB is `true`. Server-only. Unused when disabled. |
| BANNER | Optional display text. Missing defaults to `Local # demo`. Empty intentionally hides the banner. |

There are no browser variables or build-time settings. Changes take effect on the next process start. The hypothetical GitHub integration has no defined API operation, so its required permissions remain unknown. Do not guess scopes or claim provider readiness. The example should leave it disabled and explain the unresolved permission requirement.

The original test targeted `.env.example`; a developer's local copy would be `.env.local`. Do not overwrite an existing copy. No local copy or real token is needed for this test.

Use these public references for acquisition and parser behavior:

- [GitHub token creation](https://github.com/settings/personal-access-tokens/new). Requires login; authenticated behavior is not tested.
- [GitHub token documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).
- [Node.js dotenv grammar](https://nodejs.org/api/environment_variables.html).
- [Node.js parseEnv](https://nodejs.org/api/util.html#utilparseenvcontent).

## Drafting Evaluation

Give an independent agent this contract and the skill, without the authored example. Ask it to return newly authored template text in a Markdown artifact and validate the candidate string in memory. Do not read untracked env outputs. Do not grant access to live env files or allow provider calls.

Pass conditions:

- It preserves all five variables and the documented missing/empty distinction.
- The default example parses to PORT `3000`, REQUEST_TIMEOUT_MS `5000`, ENABLE_GITHUB `false`, an empty GITHUB_TOKEN, and BANNER `Local # demo`.
- It includes relevant docs and dashboard links and restart guidance. Add variable-specific one-liners only for useful operations supported by the input; no command quota.
- It explains conditional requiredness and unknown permissions without inventing scopes.
- It clearly labels the fixture synthetic and does not imply an actual integration works.
- It does not overwrite an existing local env file, populate credentials, or make provider calls.

The parsing check demonstrates loader behavior only. No runnable application schema or provider integration exists in this fixture. A reviewer must also inspect the newly authored candidate text and report execution limits. Existing env input is restricted to committed regular files named exactly `.env.example`, verified with Git before reading.
