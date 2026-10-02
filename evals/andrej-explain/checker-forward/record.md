# Checker-forward record

The requested STE-inspired rewrite is in `evals/andrej-explain/checker-forward/final.txt`. The explicit text contract is in `evals/andrej-explain/checker-forward/contract.json`. Its required literals come from the request. The semicolon restriction comes from the skill's procedure guidance.

Commands run for guidance and checking, shown relative to the repository root:

```bash
cat skills/andrej-explain/SKILL.md
cat skills/andrej-explain/references/writing.md skills/andrej-explain/references/checks.md
cat README.md
mkdir -p evals/andrej-explain/checker-forward
node skills/andrej-explain/scripts/check-text.mjs evals/andrej-explain/checker-forward/final.txt --profile procedure --contract evals/andrej-explain/checker-forward/contract.json > evals/andrej-explain/checker-forward/checker-result.json
cat evals/andrej-explain/checker-forward/checker-result.json
```

The first skill read ran from the parent directory with the repository prefix. The commands above normalize that path to the repository root. Shell heredocs wrote the contract before the final prose, then this record. Repository instructions were also inspected before writing.

The checker exited 0. The saved JSON reports pass, no errors, and no warnings. It detected three sentences with 15, 7, and 6 approximate words. Node was 24.19.0 and ICU was 78.3.

Manual source comparison retained every condition. Retry requires both status 429 and fewer than 3 attempts already made. The wait is a minimum of 5 seconds between attempts. Cancellation requires an immediate stop, including during the wait. The rewrite does not convert the necessary retry conditions into an unconditional command to retry. It retains attempts rather than changing the limit to retries.

The automated result checks mechanical properties and exact literal presence. It does not prove preservation of logic or full ASD-STE100 compliance. This is an STE-inspired rewrite. No full specification or dictionary audit was performed. The caption checker is inapplicable because there are no captions. No skill files were edited, and nothing was installed or published.

## Task supplied to the fresh-context agent

Use andrej-explain to rewrite this procedure in STE-inspired English while preserving every condition: “Retry only if the status is 429 and fewer than 3 attempts have been made; wait at least 5 seconds between attempts. Stop immediately when cancellation is requested.” Keep the exact phrases “429”, “fewer than 3 attempts”, and “at least 5 seconds”. Run available bundled checks on the final prose. Save the final plain text, explicit contract, JSON checker result, and a short record of actual commands and limitations. Do not edit the skill or install/publish anything.

The agent was given the skill and output locations, not the author's expected answer or regression tests. This is one forward-use check, not evidence of general reliability.
