# Destination delivery

Identify both where files live and which runtime loads them. Honor the user's explicit destination and repository instructions. Do not assume a cloud filesystem is the user's Mac.

## Local agent

Read the installed agent's guidance or current official documentation for discovery paths. Codex documentation checked on 2026-10-01 lists `~/.agents/skills/<name>/` for user skills and `.agents/skills/<name>/` for repository skills. Other agents may use different locations; do not silently install into all of them.

Inspect existing same-name skills before writing. Update deliberately, preserving user modifications; do not make duplicate installations. Use portable relative references. Verify the actual files, run the available skill validator, and check discovery when the runtime exposes it. If only a cloud workspace is available, report that local-machine installation is still pending and provide the exact copy or install command for the selected runtime.

## ChatGPT desktop and Web

Current [OpenAI guidance](https://learn.chatgpt.com/docs/build-skills) distinguishes standalone skills in desktop/CLI/IDE from skills bundled in plugins, which can run in Chat and Work on Web. Use the host's skill-creator workflow for personal authoring when available; verify the saved skill by name. Do not promise that uploading a ZIP or saving a GitHub folder installs it in ChatGPT Web.

For an eligible published GPT, the [hosted migration flow](https://learn.chatgpt.com/docs/migrate-custom-gpts) is My GPTs → Created by me → Migrate to plugin. Confirm creator/admin access and enabled plugins, back up first, and obtain authorization for the consequence: the original becomes read-only. The replacement starts private. Review and install it through Customize → Plugins, then test it in a new chat. Missing migration controls require checking account/workspace eligibility, not changing plan or publishing a draft without permission.

For a converted skill folder, package it with the current [plugin-creator workflow](https://developers.openai.com/plugins/build/plugins) when available in the target account. Review the proposed package and install through that account's supported flow. Keep a missing account-specific install route explicit; a valid manifest is not proof of Web installation.

The documented [GitHub marketplace import](https://learn.chatgpt.com/docs/enterprise/plugin-management) is an Enterprise admin route: Admin → Plugins → Add → Import marketplace; supply the repository URL, optional marketplace directory, and an explicit branch/tag/commit when needed. Review import results and installation policy. Do not imply a personal Pro account has this admin control. New authentication/access grants require their normal user approvals.

## GitHub repository

Resolve the repository, visibility, default branch, skill layout, and applicable AGENTS.md. Inspect the current tree before selecting a path. Use the repository's collection layout, such as `skills/<name>/`, or its runtime discovery layout. A generic skills collection may need a separate installation step.

Honor an explicitly requested branch or PR flow. Otherwise use the repository's contribution convention, with a scoped branch and reviewable PR when direct writes are not clearly intended. Adding a skill does not authorize changing repository visibility, creating a public repository, or merging a protected branch.

For public repositories, publish only the authorized portable workflow. Exclude original backups, personal provenance, private knowledge, credentials, and customer examples; report any resulting dependency gaps. Stage only the intended files. Follow required manifest, documentation, and validation gates. Never force-push or include unrelated working-tree changes.

Verify the committed files on the remote branch and return the commit or PR URL. If authentication or remote access fails, retain the prepared change and report which delivery step failed. Do not describe a local commit as published.

## Plugin packaging

A skill folder is sufficient for portable instruction delivery. The portable plugin format uses root `plugin.json` with the Agent Plugins schema and `skills/<name>/SKILL.md`; `.codex-plugin/plugin.json` remains a compatibility fallback. Follow current official packaging guidance rather than inventing a manifest schema. If the user needs an installable ChatGPT plugin or bundled MCP integration, use current plugin documentation and an available plugin-creator workflow. Verify the manifest and connections separately. Do not rename a skill folder to a plugin or claim plugin distribution from a GitHub upload alone.
