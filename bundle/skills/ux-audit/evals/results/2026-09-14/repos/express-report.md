# Express Repository UX Audit

## SBC4

- `Tease:` This repository supports a developer journey, not a single consumer interface.
- `Lede:` A bounded README onboarding review identified a version ambiguity in the quick start. A visual site audit is not applicable to the framework source itself.
- `Why it matters:` Inventing screens or requiring frontend performance metrics would misrepresent this target.
- `Go deeper:` The evidence and lens dispositions below show what was reviewed and what needs a separate frontend URL.

## Scope and Evidence

Date: 2026-09-14. Target: [expressjs/express](https://github.com/expressjs/express), commit `3ce6d0eb86e9d93529ff3191c6bb5db8ce6e72c8`. Evidence mode: artifact-limited repository review. Intended user: a developer trying to start a first Express application from this checkout's README. Inspected `Readme.md`, `package.json`, and the repository file inventory. No AGENTS.md was found in the checked-out scope. No dependencies, examples, install hooks, or servers were executed. The documentation website and example applications were not audited as rendered interfaces.

The package identifies itself as Express 5.2.1, requires Node 18 or newer, and distributes framework code under `lib/`. README examples describe several possible application types. That establishes a backend framework target; it does not establish a particular app's navigation, appearance, or accessibility.

Dependency versions: [skill-versions.json](skill-versions.json). Before/after preflight comparison: [evaluation-results.json](evaluation-results.json).

## Finding: Quick Start Version Guidance Conflicts with the Checkout Version

**Medium severity; high confidence in the text inconsistency; source-observed, execution unverified.** A developer choosing a first project sees a claim that the generator executable's major version matches Express's, followed by `express-generator@4`. This checkout declares Express 5.2.1 and links to a v5 migration guide nearby.

Evidence: [`Readme.md`, lines 87–97](https://github.com/expressjs/express/blob/3ce6d0eb86e9d93529ff3191c6bb5db8ce6e72c8/Readme.md#L87) and [`package.json`, line 4](https://github.com/expressjs/express/blob/3ce6d0eb86e9d93529ff3191c6bb5db8ce6e72c8/package.json#L4).

Impact: a newcomer cannot tell from this text whether the quick start targets Express 4, targets Express 5 through a separately versioned generator, or requires a migration step. This can cause avoidable setup and documentation confusion. The review does not claim the command fails or assert which dependency version the generator currently emits.

Recommendation: state the generator's supported output version and provide a clearly labeled route for the current Express major. Do not blindly change `@4` to `@5` without verifying that package exists and is appropriate. Acceptance check: in an authorized clean environment, follow the documented steps, inspect the generated dependency version, start the app, and verify that the instructions accurately describe the result.

## Lens Dispositions

| Lens | Disposition | Reason |
| --- | --- | --- |
| Base audit | Reviewed | Developer first-use documentation journey; one directly evidenced ambiguity. |
| Accessibility | Not applicable | No rendered frontend or specific documentation-site interface in scope; Markdown alone cannot establish its host's accessibility. |
| HIG | Not applicable | No Apple application surface or concrete web screen; general clarity was reviewed using the base method. |
| Motion | Not applicable | No selected animated user journey. |
| Performance | Not applicable | Framework performance was not requested and cannot establish an application's perceived performance. |
| Core Web Vitals | Not applicable | No deployed page or browser measurement target. |

## Strengths, Limits, and Next Action

Preserve the short Hello World example (`Readme.md:36–48`), explicit Node requirement and package initialization instructions (`Readme.md:50–66`), and direct links to documentation and community help (`Readme.md:81–87`). The documented example workflow identifies install and run commands (`Readme.md:130–149`); they were not executed.

First reconcile quick-start version guidance. A subsequent visual audit needs a concrete Express application URL or the separately maintained documentation website as its explicit target. No browser task completion, contrast, focus, latency, or user-study outcomes were inferred. There were no conflicting lens findings to reconcile and no skill-driven scope expansion into implementation or security review.
