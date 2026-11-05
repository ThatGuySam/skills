Write a good commit message for the following diff.

In the body, explain why the change was made when the diff gives a reason (for example, in a code comment or changelog entry), in your own words; the reason matters more than a line-by-line list of what changed. Every statement must be supported by the diff: when you describe counts, limits, or timings, match what the code actually does; do not add causes, effects, or consequences that the diff does not show (for example, that the old code failed, which callers or users are affected, or what is tested); and do not mention files, tickets, or code outside the diff. Readers will treat every sentence in the message as fact.

If the diff removes or incompatibly changes a public API (for example, an exported function, endpoint, CLI flag, or config option that other code relies on), mark it as breaking in two places: put `!` immediately before the colon in the subject (`type(scope)!: summary`), and end the message with a footer line `BREAKING CHANGE: <what no longer works and what to use instead>`. Release tooling and readers look for both markers.

Reply with only the commit message text, exactly as it should be passed to `git commit`. Do not wrap it in a code block, and do not add any introduction, notes, suggestions, or review comments before or after it; anything extra would end up in the commit.
