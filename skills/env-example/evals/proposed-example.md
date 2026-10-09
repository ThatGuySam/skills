# Proposed Concise Example

This is newly authored synthetic test text, not content read from an env file.
The existing `.env.example` remains untouched because it is not Git-tracked.
The draft below is the proposed replacement after the file-input boundary is resolved.

```dotenv
# SYNTHETIC FIXTURE. No application or provider connection. Contract: contract.md.
# Node.js dotenv syntax; settings take effect at the next process start.
# Port, timeout, and enable flag use these defaults when absent; empty is invalid.

# Integer 1-65535.
# Inspect listeners (macOS/Linux with lsof): lsof -nP -iTCP:3000 -sTCP:LISTEN
PORT=3000

# Positive milliseconds; 1000 = 1 second.
REQUEST_TIMEOUT_MS=5000

# Missing uses this text; empty hides the banner. Quotes preserve #.
BANNER="Local # demo"

# Optional GitHub integration: true or false. Leave disabled for this fixture.
ENABLE_GITHUB=false

# Required only when enabled; server-only. Leave blank for this test.
# Create or inspect: https://github.com/settings/personal-access-tokens
# Docs: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token
# Permissions: unresolved until the API operation is defined. Do not guess scopes.
GITHUB_TOKEN=
```

The port-listener command is a real local inspection operation, not a simulated provider request. Validation commands and results belong in the verification record.
