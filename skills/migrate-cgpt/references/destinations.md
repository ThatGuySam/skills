# Destination delivery

Identify both where files live and which runtime loads them. Honor the user's explicit destination and repository instructions. Do not assume a cloud filesystem is the user's Mac.

## Local agent

Read the installed agent's guidance or current official documentation for discovery paths. Codex documentation checked on 2026-09-17 lists `~/.agents/skills/<name>/` for user skills and `.agents/skills/<name>/` for repository skills. Other agents may use different locations; do not silently install into all of them.

Inspect existing same-name skills before writing. Update deliberately, preserving user modifications; do not make duplicate installations. Use portable relative references. Verify the actual files, run the available skill validator, and check discovery when the runtime exposes it. If only a cloud workspace is available, report that local-machine installation is still pending and provide the exact copy or install command for the selected runtime.

## ChatGPT personal skills

Use the host's skill-creator workflow when available. Its managed checkout, save, and reconciliation procedure takes precedence over generic filesystem paths. Verify the saved skill by its frontmatter name. A scratch folder or GitHub copy does not prove personal installation.

## GitHub repository

Resolve the repository, visibility, default branch, skill layout, and applicable AGENTS.md. Inspect the current tree before selecting a path. Use the repository's collection layout, such as `skills/<name>/`, or its runtime discovery layout. A generic skills collection may need a separate installation step.

Honor an explicitly requested branch or PR flow. Otherwise use the repository's contribution convention, with a scoped branch and reviewable PR when direct writes are not clearly intended. Adding a skill does not authorize changing repository visibility, creating a public repository, or merging a protected branch.

For public repositories, publish only the authorized portable workflow. Exclude private knowledge, credentials, and customer examples; report any resulting dependency gaps. Stage only the intended files. Follow required manifest, documentation, and validation gates. Never force-push or include unrelated working-tree changes.

Verify the committed files on the remote branch and return the commit or PR URL. If authentication or remote access fails, retain the prepared change and report which delivery step failed. Do not describe a local commit as published.

## Plugin packaging

A skill folder is sufficient for portable instruction delivery. If the user needs an installable ChatGPT plugin or bundled MCP integration, use current plugin documentation and an available plugin-creator workflow. Verify the manifest and connections separately. Do not rename a skill folder to a plugin or claim plugin distribution from a GitHub upload alone.
