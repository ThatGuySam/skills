# HTMA Measure documentation

- `Tease:` Public instructions for installing and using the skill live beside its source.
- `Lede:` This Astro Starlight app documents HTMA Measure for humans and emits a complete machine-readable corpus for agents.
- `Why it matters:`
  - Installation examples are verified against the public repository.
  - Feature pages preserve the behavior, edge cases, and data contracts behind the user guides.
  - `/llms-full.txt` lets an agent read the complete documentation in one request.
- `Go deeper:`
  - Live site: https://skills.samcarlton.com
  - Machine corpus: https://skills.samcarlton.com/llms-full.txt
  - Source: `apps/docs/src/content/docs/`

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

- `overview/` and `design/` explain the product and its rationale.
- `guides/` contains task-oriented installation and usage instructions.
- `features/` and `architecture/` are the machine-tier behavior contracts.
- `reference/` contains stable schemas and compatibility details.
- `project/` records roadmap, open questions, decisions, and changes.
- `research/` carries source-backed evidence when published.
