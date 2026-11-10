# Workflow to turn into a skill (synthetic demo input)

This workflow is invented for a skill demo.

Every Friday I write release notes for our app from the week's merged pull requests.
1. I list merged PRs since last Friday with `git log --merges --since="last friday" --oneline`.
2. I skip PRs labeled chore, ci, or deps.
3. I group the rest under New, Improved, and Fixed, one line each, written for customers, not engineers.
4. I never mention internal ticket numbers or teammate names.
5. I paste the result into RELEASE_NOTES.md under a heading with the date.
Done means every customer-visible PR appears once and nothing internal leaks.
