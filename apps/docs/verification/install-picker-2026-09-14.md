# Install Command Picker Verification

Date: 2026-09-14. Scope: Skills CLI command blocks throughout the docs site, remembered runner choice, copy behavior, and code whitespace.

## Changes

The shared Footer override progressively enhances existing Expressive Code blocks. It reads the original copy payload, preserving environment assignments and flags, and offers npx, bunx, pnpx, pnpm dlx, Yarn dlx, npm exec, mise and pnx. The canonical Markdown and no-JavaScript fallback remain npx commands.

Preference key: `sam-skills:install-runner`. Valid choices are restored from local storage; blocked storage and obsolete values fall back to npx. Changes update all current-page controls and other tabs through the storage event. The copy action uses the displayed command and reports clipboard failures with a manual-selection fallback.

Code ligatures are disabled, word spacing is explicit, and inline whitespace is preserved. The original HTML already contained an ASCII space before `--skill`; no command content was repaired by inserting hidden characters. Long commands scroll within the code block on narrow screens instead of splitting flag tokens.

## Actual Checks

- Three Node test cases passed: all eight command substitutions and the flag separator; environment/multiline preservation including Expressive Code's DEL newline encoding; latest preference, invalid storage values and storage failures.
- Real Codex in-app browser checks passed: all eight choices rendered their expected command; bunx copied exactly; reload preserved bunx; another page initialized with the saved choice; three controls on the collection page updated together; an already open second tab synchronized a later pnpx selection.
- Multiline copy was inspected from the browser clipboard and retained actual newline characters, continuation backslashes, and flags. The first integration check exposed Expressive Code's DEL encoding; decoding was added and covered by the regression test.
- At 390 × 844, the document remained 390 CSS pixels wide and the command kept its tokens intact in a horizontally scrollable block. Desktop and mobile screenshots are adjacent to this report.
- The native selector exposes an accessible name and native keyboard behavior. Full assistive-technology and Firefox/Safari device testing were not performed.

## Command Sources

- [Bun bunx](https://bun.sh/docs/pm/bunx)
- [pnpm pnx and its pnpx/pnpm dlx aliases](https://pnpm.io/cli/pnx)
- [Yarn dlx](https://yarnpkg.com/cli/dlx)
- [mise exec](https://mise.jdx.dev/cli/exec.html) and [npm backend](https://mise.jdx.dev/dev-tools/backends/npm.html)

Commands were checked against the runners' syntax and as rendered/copied strings. This pass did not install every package manager or rerun the underlying skill install with all eight tools. No package-release security setting was weakened.
