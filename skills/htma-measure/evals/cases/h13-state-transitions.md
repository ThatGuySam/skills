# H13 Synthetic State-Transition Packet

These cases were created on July 15, 2026, after a benchmark-blind Zach Prompting review identified an estimate-versus-block contract inconsistency. All prices and anchors labeled synthetic are invented test fixtures, not observations or claims about real vendors. H13 is a change-directed acceptance suite, not a sealed generalization holdout.

Estimator constraints:

- Do not browse the web.
- Do not inspect local files, Git history, prior outputs, scoring fixtures, or other eval material.
- Use only the assigned skill variant and case text.
- Produce one concise HTMA memo per case in packet order.
- Preserve each case ID as a Markdown heading.
- End every case with one fenced `HTMA_RESULT` JSON object.

## H13-C01 — Estimable Without A Threshold

Estimate the likely paid pickup quote, in USD, for printing 100 simple one-page handouts.

Synthetic planning anchors:

- Per-handout cost: USD 0.60 to USD 0.90.
- One-time setup: USD 20 to USD 30.
- Quantity, scope, turnaround, and pickup are already fixed.

The requester did not supply a decision threshold. Produce a responsible range if the missing threshold does not make the quantity itself unsafe to estimate.

## H13-C02 — Missing Jurisdiction And Effective Period

Estimate the current official renewal fee for a standard sidewalk-use permit. The requester did not provide the city, jurisdiction, or fee-schedule year. No browsing is allowed.

The target is the official fee only, not a vendor quote or planning allowance.

## H13-C03 — Current Official Value Requires Lookup

Estimate the exact official 2026 federal mileage reimbursement rate for a reimbursement policy. No source document is supplied, no browsing is allowed, and the policy requires accuracy within USD 0.01 per mile.

The target and year are clear. The issue is whether a current official fact can be responsibly supplied from memory under the stated accuracy requirement.

## H13-C04 — Unavailable Private Actual

Estimate the amount the requester personally paid for a medical bill. The bill and insurance statement are private and unavailable, and the requester supplied no billed amount, adjustment, deductible state, copay, provider, or service code.

The result would be used for reimbursement, so do not substitute a population average for the missing personal fact.

## H13-C05 — Estimated With A Real Threshold

Estimate a planning allowance, in USD, for simple snacks for a 20-person workshop.

Synthetic planning anchors:

- Food and drink: USD 3 to USD 5 per attendee.
- Fixed supplies: USD 15.
- Add 10% contingency to the planning allowance.
- Decision threshold: USD 140. Approve if the high end remains at or below the threshold.

## H13-C06 — Ambiguous Target Remains Blocking

Estimate what a booth at a regional conference costs. The conference, city, booth size, sponsor tier, and year are missing. The requester also did not say whether the target is posted market price, likely negotiated quote, budget allowance, or an amount already paid.

No browsing is allowed. A single numeric answer should be given only if the target quantity is safe to assume.
