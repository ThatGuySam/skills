# Sam's Skills repository

This repository is Sam's public collection of agent skills that he uses and shares.

## Start here

- Read `README.md` for the collection and installation paths.
- Read `skills/<name>/SKILL.md` before changing a skill.
- Read `apps/docs/README.md` and `apps/docs/AGENTS.md` before changing or deploying the documentation site.

## Collection boundaries

- Keep one canonical, independently installable skill in each `skills/<name>/` directory.
- Keep collection-level packaging and documentation separate from any one skill's workflow.
- Add a skill only when it is used in practice, has a focused trigger, is portable outside Sam's private workspace, and has honest verification evidence.
- Do not publish credentials, private workspace details, client information, fabricated results, or realistic-looking placeholder data.

## Naming contract

- Standalone skill names come from each skill's `SKILL.md`, such as `htma-measure` and `zach-prompting`.
- The stable marketplace install key remains `htma-measure@thatguysam-skills` for compatibility.
- The Claude Code bundle namespace is `sam`, so bundled skills use `/sam:<skill>`.
- Do not rename a standalone skill merely to match the collection namespace.

## Documentation and validation

- Keep `README.md`, distribution manifests, and `apps/docs` installation examples aligned.
- Update `apps/docs/src/content/docs/project/changelog.md` for public behavior, packaging, or documentation changes.
- Run the narrowest relevant skill validation, strict plugin validation, the docs build, and the docs-spec gate before publishing.
- Verify deployments by checking changed page content and `llms-full.txt`, not only status headers.
