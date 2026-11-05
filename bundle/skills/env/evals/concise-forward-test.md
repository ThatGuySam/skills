# Independent Draft Evaluation

Newly authored synthetic template:

```dotenv
# Synthetic configuration fixture; no provider integration is implemented.
# Save as .env.example. For local use, copy to .env.local only if it does not exist.
# The process loads .env.local once at startup; restart it after changes.
# Node.js dotenv syntax: https://nodejs.org/api/environment_variables.html

# Integer 1–65535. Missing defaults to 3000; empty is invalid.
PORT=3000

# Positive integer in milliseconds. Missing defaults to 5000; empty is invalid.
REQUEST_TIMEOUT_MS=5000

# Missing uses "Local # demo"; empty intentionally hides the banner.
# Keep quotes around text containing # so it is not parsed as a comment.
BANNER="Local # demo"

# GitHub integration: literal true or false. Missing defaults to false; empty is invalid.
# Leave disabled: no API operation is defined, so required permissions are unknown.
ENABLE_GITHUB=false

# Server-only. Required and nonempty when enabled; unused when disabled.
# Create a token after the required permissions are defined (login required):
# https://github.com/settings/personal-access-tokens/new
# Token guidance: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
GITHUB_TOKEN=
```

## Checks and Limits

- Read only the supplied skill and its Markdown contract as drafting inputs. No existing env files or prior examples were read.
- Parsed the candidate string in memory using Node.js v26.6.0 and node:util parseEnv. All five parsed values matched the contract, including the empty token and literal # in the banner. Parser reference: https://nodejs.org/api/util.html#utilparseenvcontent.
- Checked assignment coverage and uniqueness in memory: five assignments, five unique names.
- Reviewed the candidate against the supplied contract: all missing/empty distinctions, conditional token requirement, server-only scope, acquisition links, unknown permissions, and restart guidance are present.
- No command snippets were necessary for this fixture. Ignore rules were not inspected because this test permits only the Markdown contract as project input; local-copy ignore status remains unverified.
- No application schema or provider verification ran; neither exists in this fixture. Public references were reproduced from the contract without opening them. Authenticated token creation was not tested.
- Wrote only this report. No local env copy or credential was created, and no provider, staging, commit, or provisioning action ran.
