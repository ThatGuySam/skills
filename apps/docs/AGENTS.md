# Documentation handoff — HTMA Measure

This app is the public documentation and specification surface for the HTMA Measure skill.

## Read the docs first

- Deployed corpus: `https://skills.samcarlton.com/llms-full.txt`
- Local corpus: build the app and read `dist/llms-full.txt`
- Source pages: `apps/docs/src/content/docs/`

## Editing rules

- Keep installation commands aligned with commands actually supported by the current CLIs.
- Keep feature pages’ **Behavior**, **Inputs & outputs**, **States & edge cases**, and **Data shape** sections complete.
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

Then verify the public deployment:

```bash
curl -I https://skills.samcarlton.com/
curl -I https://skills.samcarlton.com/llms-full.txt
```

Docs are not runtime tests for the skill. Preserve the existing installation smoke tests or run clean-room installer checks when distribution metadata changes.
