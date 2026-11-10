# Issue: Checkout timeout on slow networks (synthetic demo input)

This issue is invented for a skill demo. The product, people, and numbers are not real.

Background: Over the last two sprints we have received a number of reports, mostly from the support
queue and a couple from the sales team, that customers on slower mobile connections sometimes see the
checkout spinner run for a long time and then get a generic "Something went wrong" message. Support
logged 23 tickets in October. Some of those customers retried and were charged twice, which created
refund work (11 refunds so far, all processed manually by Priya on the billing team).

Investigation so far: Dev looked at the logs and the payment request itself usually succeeds, but our
client gives up after 8 seconds and shows the error, even though the server finishes around 9 to 14
seconds on slow connections. Then the user taps Pay again. We do not currently send an idempotency key,
so the second tap creates a second charge. There was a discussion about raising the timeout to 30
seconds, but design pushed back because a 30 second spinner feels broken. Another option discussed was
polling the order status after the timeout instead of showing an error.

Proposal (not yet approved): add an idempotency key to every payment request (backend change, Dev
estimates 2 days), and change the client so that after 8 seconds it switches to "Still confirming your
payment..." and polls order status for up to 30 seconds before showing an error (frontend, 3 days).
QA needs a throttled-network test plan. Legal asked that any customer-facing copy about charges be
reviewed by them first. Release target is the 2.14 build on Dec 3 if approved by Friday.

Open question: should we proactively email the 11 refunded customers? Support thinks yes, marketing
wants to wait until the fix ships. Decision owner is Morgan (product).
