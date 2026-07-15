# Documentation handoff — ThatGuySam Skills

This app is the public documentation and specification surface for the skills in this repository.

## Read the docs first

- Authoritative working source: `apps/docs/src/content/docs/`
- Built corpus: build the app and read `dist/llms-full.txt`
- Deployed production snapshot: `https://skills.samcarlton.com/llms-full.txt`

## Editing rules

- Keep installation commands aligned with commands actually supported by the current CLIs.
- Keep feature pages' **Behavior**, **Inputs & outputs**, **States & edge cases**, and **Data shape** sections complete when those contracts apply.
- Keep each skill's examples, source references, and installation command aligned with its canonical directory under `skills/`.
- Record unresolved forks in `project/open-questions.md`; move resolved items to **Decided**.
- Update `project/changelog.md` with public behavior, packaging, or documentation changes.
- Keep the site fully public. Do not add the docs-spec auth Worker, `AUTH_SECRET`, private frontmatter, or gated `llms*.txt` routes.
- Never include credentials, private financial facts, client information, or machine-specific secrets.

## Verification

From `apps/docs`:

```bash
bun run build
bash "$HOME/.codex/skills/docs-spec/scripts/check.sh" "$(pwd)"
```

After a deployment, verify both availability and the changed content rather than relying on headers alone:

```bash
curl -I https://skills.samcarlton.com/
curl -I https://skills.samcarlton.com/llms-full.txt
curl -fsS https://skills.samcarlton.com/llms-full.txt | rg 'PLACEHOLDER_UNIQUE_CHANGED_TEXT'
```

Docs are not runtime tests for the skill. When distribution metadata changes, run and record clean-room installer checks.
