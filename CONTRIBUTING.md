# Contributing

Contributions should improve a published skill's behavior, evidence, or portability. Keep changes focused and preserve independent installation for each skill.

## Trunk-based workflow

Ordinary authorized changes go directly to `main`; a pull request is optional,
not the default. Sync the latest remote `main`, make a small focused change, run
the relevant checks, and publish only within the task's authorization. Preserve
unrelated work and never force-push shared history.

Use a branch or pull request when explicitly requested, when a contributor lacks
direct write access, or when repository rules require it. Required checks and
protections still apply; this workflow does not authorize weakening them. If
`main` changes while you work, reconcile the new commits and repeat affected
checks before pushing.

## Guidelines

- Make instructions actionable and outcome-relevant.
- Preserve each skill's outcome, evidence, permission, and validation contract.
- Never add fabricated measurements, realistic-looking placeholders, private data, credentials, or machine-specific paths.
- Keep `SKILL.md` concise and put conditional detail in `references/`.
- Add only files the affected skills actually use.
- Propose a new skill only with a focused trigger, a real use case, and representative validation evidence.
- Verify YAML frontmatter, JSON manifests, links, and every changed output field before publishing a change.

By contributing, you agree that your contribution will be licensed under the MIT License.
