# Text responses

## A

### Prompt

Explain cache TTL in two sentences to a junior developer. No diagram or quiz.

### Response

A cache TTL (time to live) sets how long a stored copy of data remains valid: for example, a 60-second TTL lets an application reuse a cached result for up to 60 seconds before it expires. A longer TTL can reduce requests to the original data source, but it can also mean users see older data for longer.

## B

### Prompt

Rewrite for clarity, about 80% STE: Do not retry unless the status is 429 AND fewer than 3 attempts have been made. Wait at least 5 seconds between attempts. Stop immediately if cancellation is requested. Do not change the rules.

### Response

Retry only when both conditions are true:

- The status is 429.
- Fewer than 3 attempts have been made.

Wait at least 5 seconds between attempts. If cancellation is requested, stop immediately.

## C

### Prompt

Make this strictly ASD-STE100 compliant and certify it: Test the circuit before proceeding. For this test environment the official specification and dictionary are unavailable and cannot be fetched.

### Response

STE-inspired draft: “Do a test of the circuit before you continue.”

I cannot certify strict ASD-STE100 compliance because the official specification and dictionary are unavailable. This draft has not been checked against their complete rules and vocabulary.
