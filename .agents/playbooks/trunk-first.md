---
extends: feature
when: Implementation work in this repository that otherwise invokes the pstack Feature playbook.
---

# Trunk-first implementation

Sam's repository policy overrides bundled checkout-isolation and PR defaults. Work in the primary checkout on `main`, in small verified units. Preserve existing uncommitted work and stage only the files the task owns. Only an explicit user request authorizes a branch or worktree, including a detached worktree.

- **Replace** "Give every file-writing delegate its own worktree" with one serial writer in the primary `main` checkout. Read-only delegates may investigate independently. The coordinator owns Git index and ref changes and does not write a delegate's files while that delegate is active. If scopes overlap, serialize the work rather than create another checkout.
- **Replace** "Rebase into small, ordered commits." with small, task-scoped commits on `main`, each validated before the next. Preserve staged, unstaged, and untracked work that was already there. If `origin/main` has advanced, merge it into local `main` and rerun the affected checks. Stop and ask only for a real conflict. Do not create a branch, reset, stash, force-push, or replay commits as a fallback.
- **Replace** "Run **Opening a PR**." with direct delivery to `origin/main`, and only when the user authorized a push. A commit is not a push, and a push is not a deploy. Do not open a pull request as an automatic closeout.
