# Match the reader's task

These are information priorities, not mandatory templates. Combine fields into natural sentences. Keep material caveats beside the claims they qualify.

| Content | First screen | Deeper content |
| --- | --- | --- |
| Delivery task | Requested change, affected person or behavior, observable done condition, real dependency or scope boundary | Implementation requirements, full acceptance matrix, source material |
| Bug | Concrete symptom and trigger, expected behavior, shortest useful reproduction, what success looks like | Environment and frequency, full repro, labeled hypotheses, logs and media |
| Decision | Recommendation or current lean, alternatives and their consequential tradeoffs, uncertainty, exact decision needed | Actual option values, analysis, rejected paths, primary evidence |
| Research | Supported conclusion, strongest evidence, limits that affect interpretation, next decision if any | Methods, counterevidence, comparisons and sources |
| Progress update | What changed since the relevant checkpoint, actual state, remaining work and genuine user decisions | Work log, detailed proof, historical context |
| Completed work / PR | Observable result, scope, verification actually run, unverified behavior and remaining authority | Diffs, test output, measurements, revision identity, rollback details |
| Failure / blocker | What failed, consequence, recovery attempted, exact intervention needed | Error evidence, attempted remedies, diagnosis |

For bugs, a title names the area and symptom; keep an unconfirmed root cause out of it. Use native task properties for assignee, priority and status rather than repeating them in prose. A dependency on one check must not block unrelated safe work. Shared policies can have one project-level home, but issue-specific limits remain visible.

For decisions, do not compress away the options the reader must compare. Preserve actual prices, dates, thresholds or commitments in the brief or a directly named option section. Keep a material risk visible even if it makes the brief longer. If the choices cannot fit, provide a short decision entry and an honest linked comparison rather than pretending the decision is fully reviewable in one screen.

For research, preserve causal and population limits. A small sample, correlation or early observation does not establish a general improvement. A draft, simulation or historical receipt is not fresh deployed proof.

For updates, use meaningful changes rather than repeated status narratives. Describe no-answer consequences only when established. Do not invent urgency, a deadline, or an approval gate to fill the format.

## Synthetic example

Source: a task contains old meeting notes, setup instructions and later corrections. The current requirement is to preserve the selected filters when returning from a result. It is implemented on a preview but keyboard verification remains open. Production release is separate.

Brief:

> **Keep filters when returning to results**
>
> Visitors should return to the same filtered list after opening a result. The preview change is implemented; keyboard verification remains open.
>
> Done when Back restores the selected filters and list position, including the keyboard path. Production release is separate.

Supporting destinations: "Expected navigation and checks" and "Preview evidence and earlier decisions". These are proposed labels, not fake links or toggle controls. In the real result, attach them to actual supported destinations.
