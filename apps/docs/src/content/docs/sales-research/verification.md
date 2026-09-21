---
title: Test Sales Research
description: A tester checklist and honest verification limits for the portable skill.
---

This is an experimental shared workflow. Installation checks can establish that
an agent receives the files; they cannot establish sales effectiveness.

## Try it in a fresh project

1. Create an empty project directory and install only `sales-research` using the
   [installation guide](/sales-research/introduction/).
2. Start a fresh agent conversation. Choose one [example](/sales-research/examples/)
   and replace its fields with redacted facts you know.
3. Confirm that the response fits the sales context, preserves unknowns, and
   leads toward a decision you can act on.
4. Follow its citations. Check whether the particular page supports the claim.
5. Try a different context, such as employment or SaaS support. It should not
   blindly apply consulting paid-discovery rules.
6. Try without browsing. It should disclose missing verification and avoid
   inventing attributed claims.

## Send useful feedback

Use this template in a [GitHub issue](https://github.com/ThatGuySam/skills/issues)
after removing private information:

```text
Agent and model:
Install command and project/global scope:
Date and repository revision, if known:
Browsing available:
Redacted prompt:
What I expected:
What happened:
Redacted output or relevant excerpt:
Which citation or recommendation I checked:
```

Avoid sharing customer identities, private transcripts, account details, or live
negotiation terms. A compact redacted example is enough to report a problem.

## Maintainer checks

The skill includes [four authored synthetic scenarios](https://github.com/ThatGuySam/skills/blob/main/skills/sales-research/evals/evals.json)
and a [manual evaluation procedure](https://github.com/ThatGuySam/skills/blob/main/skills/sales-research/evals/README.md).
Their expectations are criteria, not recorded passes.

Portable-package behavioral runs and sales outcome measurements have not been
completed. The release preparation checks below cover packaging only. A successful local install is separate from a verified GitHub install
and a deployed documentation website.

## Local packaging checks, 2026-09-18

| Check | Observed result |
| --- | --- |
| Skill frontmatter validator | Passed |
| Codex plugin validator | Passed |
| Claude plugin and marketplace validators | Passed |
| Skills CLI 1.5.24, local source | Discovered four skills and installed only Sales Research into an empty project for Codex and Claude Code |
| Installed file comparison | Recursive comparison matched the canonical skill directory |
| Secret scan | Gitleaks found no leaks in the skill package |
| Documentation build | Passed; emitted all four Sales Research pages and the llms exports |
| Docs-spec gate | Passed all 11 checks with no warnings |
| Existing install-command runner tests | Passed all three tests |

These checks used the local checkout. At this September 18 checkpoint, remote
GitHub installation, live website publication, and independent behavioral
evaluations had not been verified.
