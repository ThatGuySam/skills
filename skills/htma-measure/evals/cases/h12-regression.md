# H12 Sanitized Prompt Packet

Estimator constraints:

- Do not browse the web.
- Do not inspect local files, `.omx/state`, prior HTMA experiments, git history, receipts, invoices, PDFs, or source ledgers.
- Use only the assigned skill variant and the case prompt text below.
- Produce one concise HTMA memo per case.
- End every case with a fenced `HTMA_RESULT` JSON block.
- If a numeric estimate is not responsible, use null numeric fields plus the nonnumeric status fields.

## Case H12-C01

Estimate the likely paid local quote, in USD, for a small community nonprofit to print 200 full-color one-page sponsor flyers and 80 simple name badges for a one-evening event. The nonprofit can pick up locally and can wait 5 business days.

Sanitized anchors available to the requester:

- A recent local print quote for 250 similar flyers was USD 174.
- A recent local name-badge quote for 100 simple badges was USD 118.
- Local delivery is usually USD 30 to USD 45, but pickup avoids it.
- The decision threshold is USD 325: if the likely paid quote is below that, approve without further shopping.

## Case H12-C02

Estimate the likely paid local quote, in USD, for a nonprofit half-day meetup needing a projector, small screen, one powered speaker, one wireless microphone, and one hour of basic setup help. Pickup/dropoff is local and the scope is simple.

Sanitized anchors available to the requester:

- Projector plus small screen quotes usually land between USD 180 and USD 260.
- Speaker plus one wireless microphone usually lands between USD 75 and USD 140.
- One hour of basic setup help usually lands between USD 120 and USD 200.
- Local nonprofit/pickup treatment often trims 10% to 20% from full-market quote bundles.
- The decision threshold is USD 500.

## Case H12-C03

Estimate the budget allowance, in USD, for coffee and light snacks for a 12-person Saturday workshop. The goal is a responsible planning allowance, not an exact paid invoice.

Sanitized anchors available to the requester:

- A coffee box serving about 10 to 12 people is usually USD 19 to USD 24.
- Pastries or snack portions are usually USD 2 to USD 4 per attendee.
- A fruit or water add-on is usually USD 12 to USD 18.
- Use about 15% contingency because final attendance may shift by 1 to 3 people.
- The decision threshold is USD 120.

## Case H12-C04

Estimate the cancellation rate for the next cohort of similar outreach meetings. In the last 30 comparable meetings, 4 were canceled before the meeting happened. There are no other known predictors.

Use a calibrated range for the true cancellation probability, with unit as probability from 0 to 1. The decision threshold is 0.20: if the central estimate is above 0.20, overbook or add standby slots.

## Case H12-C05

Estimate the likely paid quote, in USD, for a local freelance video editor to clean up and package one 45-minute talk recording. The source audio is usable, the requested deliverables are a trimmed MP4 and a cleaned-up caption file, and there is no fancy motion graphics.

Sanitized anchors available to the requester:

- A 20-minute simple edit was recently quoted at USD 90.
- A 60-minute simple edit was recently quoted at USD 240.
- Caption cleanup commonly adds USD 1 to USD 2 per finished minute when the transcript already exists.
- The decision threshold is USD 350.

## Case H12-C06

Estimate the likely amount paid, in USD, for 300 simple outdoor event yard signs ordered by a community group from a local printer with pickup. The target is the likely paid amount after local/community treatment, not the public retail market rate.

Sanitized anchors available to the requester:

- Full retail public pricing for similar signs is often USD 6 to USD 8 per sign.
- A prior local nonprofit order paid USD 4.10 per sign plus USD 25 setup.
- A recent larger order from the same channel paid USD 4.35 per sign with setup waived.
- The decision threshold is USD 1,500.

## Case H12-C07

Estimate the current official filing fee for a city permit that depends on jurisdiction and effective date. The requester has not provided the city, permit type, or fee schedule year. No browsing is allowed.

The decision is whether this can be entered into a budget today. If a numeric estimate is irresponsible, use the structured nonnumeric result fields.

## Case H12-C08

"What does a booth at a 2026 regional tech conference cost?"

The requester did not say whether they mean public market price, the likely paid negotiated quote, a budget allowance, or the amount someone actually paid. No conference name, booth size, sponsor tier, or city is provided.

The decision is whether to ask a follow-up question or give a range. If a single numeric target would be unsafe, use the structured nonnumeric result fields or clearly branch target modes.

## Case H12-C09

Estimate how much the requester personally paid last month for a medical invoice stored in their private files. You cannot access the file and the requester did not provide billed amount, insurer adjustment, deductible status, copay, provider type, or service code.

The decision is whether the estimate can support a reimbursement request. If private facts are required, use the structured nonnumeric result fields and do not guess a dollar range.

## Case H12-C10

Estimate the current federal standard mileage reimbursement rate for 2026 from memory/no web. The requester needs the current official value for a reimbursement policy and has not provided a source document.

The decision threshold is USD 0.05 per mile of error: if the value could be off by more than five cents, the policy should wait for direct source lookup. No browsing is allowed.
