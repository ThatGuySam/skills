Our team pastes `prompt.md` into a small model (Claude Haiku 5.5) to draft commit messages from a diff. The drafts keep needing edits. What we actually need from every message:

- Conventional Commits subject: `type(scope): summary`, using feat, fix, docs, refactor, test, or chore.
- Subject line of 72 characters or fewer, imperative mood, no trailing period.
- A body that explains why the change was made when the diff shows a reason, not just what lines changed.
- No invented details: don't mention files, tickets, or behavior that are not in the diff.
- Breaking changes (removed or incompatible public API) must use `!` after the type/scope and include a `BREAKING CHANGE:` footer.
- Output only the commit message — no preamble, no code fences.
- Trivial changes (typos) get a subject only, no padded body.

Please improve `prompt.md` with red-green-refactor rounds: first prove how poorly the current prompt scores out of 10, then improve it step by step until there are no obvious improvements left.
