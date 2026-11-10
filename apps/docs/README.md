# Sam's Skills documentation

This Astro Starlight app documents Sam's public skills and generates `llms-full.txt` for agents.

- Live site: https://skills.samcarlton.com
- Complete documentation: https://skills.samcarlton.com/llms-full.txt
- Source: `src/content/docs/`

## How we write docs

Read this before writing, editing, reviewing, or planning any page. Every section should earn its place: know who reads it and what it lets them do.

### Skill introduction pages

On a 375 by 667 phone screen, a reader should see the page title, the install command, and the best example prompt, each in its own copyable box. Nothing else comes first.

1. **Install command.** The first content after the frontmatter is a `bash` block with `npx skills add ThatGuySam/skills --skill <id>`. The install picker turns it into a runner menu and a Copy button.
2. **Example prompt.** Next is a ` ```text title="Example prompt" wrap ` block with the single best prompt for the skill. Make it concrete, keep it to about five lines on a phone, and put the user's own facts in `[brackets]`.
3. **`## Why use it`.** A phone-size brief: a bold one-line outcome, then **Use it when**, **You get**, and **Limit**. Aim for 60–90 words.
4. **Invocation line.** `$<id>` in Codex, `/<id>` in Claude Code, and `/sam:<id>` with the collection bundle.
5. **Then only what a person needs.** Optional `## More prompts`, sections that help someone read the output (screenshots, a status legend), and `## Go deeper` links to the skill's other pages.

The **See it run** demo video is generated. Edit the recording under `demos/<id>/` and run `node scripts/demo.mjs embed` rather than editing between its `demo:` markers. See [`demos/README.md`](../../demos/README.md).

Keep page titles short enough to fit on one line on a phone.

### Where detail goes

Behavior, inputs and outputs, states and edge cases, data shape, install variants, and maintainer setup belong on a reference, setup, or design page in the skill's sidebar group. That material serves agents and careful readers, and `llms-full.txt` still includes it. Move detail there rather than deleting it.

### Writing

- Say what the reader can do and what they get. Cut background that does not change a decision.
- Use plain sentences. Label synthetic examples, unverified claims, and limits.
- Add a section only when you can say why a reader needs it on that page.

### Check it

- `bun run test` enforces the intro-page opening for every skill in the catalog.
- Render changed intro pages at 375 by 667 and confirm the install command and example prompt are fully visible. Check one page at desktop width too.

## Develop

From `apps/docs`:

```bash
bun install --frozen-lockfile
bun run dev
```

The development server runs at `http://localhost:4321`.

## Build and verify

The docs-spec gate is an external prerequisite. Its documented locations are
`~/.claude/skills/docs-spec` and `~/.codex/skills/docs-spec`; use the existing
installation if it contains `scripts/check.sh`. Obtain the complete checker
through an authorized installation source, read its setup instructions, and
install it at the documented location. The Codex location may link to the Claude installation.
The checker needs Bash, Perl, and standard shell utilities, and reads the built
site rather than building it. If the original checker cannot be obtained,
report this gate as unavailable. A build or link scan does not replace it.

```bash
node ../../scripts/skill-catalog.mjs --check
node --test ../../scripts/skill-catalog.test.mjs
node --test ../../scripts/demo.test.mjs
bun run test
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

- `sales-research/` covers installation, usage examples, source selection, and tester feedback.
- `collection/` explains what belongs here and how to install one skill or the full bundle.
- `zach-prompting/` documents the prompt and instruction improvement skill.
- `overview/`, `guides/`, `features/`, and `design/` document HTMA Measure, alongside its output and data-model references.
- Collection-level packaging pages document repository layout, compatibility, and distribution.
- `project/` records the shared roadmap, open questions, decisions, and changes.
- `research/` carries source-backed evidence when published.

## Maintain skill listings

Edit the root `skill-catalog.json` for skill titles, summaries, guide routes, and navigation. Run `node scripts/skill-catalog.mjs` from the repository root, then commit the catalog and generated changes together. Do not edit text between `skills:start` and `skills:end` markers by hand.

The homepage, collection table, installation commands and invocation names, README, and repository trees come from that catalog. Astro consumes its navigation groups directly. The build checks that the catalog matches every canonical `skills/*/SKILL.md` and that generated listings are current.

The Documentation workflow runs the catalog checks, catalog tests, docs tests, and production build on every push and pull request. It has read-only permissions and no deployment credentials. See the root [contribution guide](../../CONTRIBUTING.md#update-the-skill-catalog) for the full update workflow.
