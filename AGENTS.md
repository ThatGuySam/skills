# Sam's Skills repository

This repository contains the agent skills Sam uses and publishes.

## Start here

- Read `README.md` for the collection and installation paths.
- Read `skills/<name>/SKILL.md` before changing a skill.
- Read `apps/docs/README.md` and `apps/docs/AGENTS.md` before changing or deploying the documentation site.

## Contribution workflow

- Use trunk-based development in this repository. For ordinary changes the user has authorized publishing, commit and push directly to the current `main` branch by default; a pull request is not required.
- Honor an explicit request for a branch, pull request, review gate, or draft-only work. This default does not authorize publication when the task only asks for investigation or a draft.
- Start from the latest remote `main`, keep changes small and focused, preserve unrelated work, and run the applicable validation gates before pushing.
- Never force-push shared history. If `main` advances, reconcile and rerun affected checks before publishing.
- Respect required repository rules and checks. If they block direct publication, report the blocker rather than disabling protection, changing permissions, or bypassing checks.

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
