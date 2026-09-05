# Sam's Skills documentation

This Astro Starlight app documents Sam's public skills and generates `llms-full.txt` for agents.

- Live site: https://skills.samcarlton.com
- Complete documentation: https://skills.samcarlton.com/llms-full.txt
- Source: `src/content/docs/`

## Develop

From `apps/docs`:

```bash
bun install --minimum-release-age 604800
bun run dev
```

The development server runs at `http://localhost:4321`.

## Build and verify

```bash
bun run build
bash "$HOME/.codex/skills/docs-spec/scripts/check.sh" "$(pwd)"
```

A successful build emits:

- `dist/llms.txt`
- `dist/llms-full.txt`
- `dist/llms-small.txt`

## Deploy

The site is a fully public Cloudflare Workers static-assets deployment. It has no auth Worker and no private routes.

With `CLOUDFLARE_API_TOKEN` available:

```bash
./node_modules/.bin/wrangler deploy
```

The custom-domain route is declared in `wrangler.jsonc`:

```text
https://skills.samcarlton.com
```

## Content layout

- `collection/` explains what belongs here and how to install one skill or the full bundle.
- `zach-prompting/` documents the prompt and instruction improvement skill.
- `overview/`, `guides/`, `features/`, and `design/` document HTMA Measure, alongside its output and data-model references.
- Collection-level packaging pages document repository layout, compatibility, and distribution.
- `project/` records the shared roadmap, open questions, decisions, and changes.
- `research/` carries source-backed evidence when published.
