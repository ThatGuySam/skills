# Annotated Example

This newly authored synthetic example demonstrates the supported static annotation subset. It is not an existing env file or a working GitHub integration. The hypothetical process requires a token; its API operations and permission scopes remain unspecified. Keep the token blank.

```dotenv
# SYNTHETIC EXAMPLE. Node.js dotenv values with @env-spec comments.

# Inspect listeners: lsof -nP -iTCP:3000 -sTCP:LISTEN
# @type=port(min=1)
PORT=3000

# @type=enum(debug, info, warn, error)
LOG_LEVEL=info

# Create or inspect: https://github.com/settings/personal-access-tokens
# @docs(https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token)
# @required @sensitive
GITHUB_TOKEN=
```

Expected template result: three declarations, valid supported syntax and defaults, `complete: false`, and `GITHUB_TOKEN` listed as missing. In values mode, the blank required token fails. Neither mode verifies provider access or application behavior.

The prior five-variable fixture remains historical. This is a separate three-variable annotation fixture. Existing untracked env files are not read or overwritten.
