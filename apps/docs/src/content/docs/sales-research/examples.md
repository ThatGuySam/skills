---
title: Sales Research examples
description: Copyable prompts for consulting, discovery, pricing, SaaS, AI proof, sales-call review, and employment evaluation.
---

These are prompt templates, not customer stories or measured results. Replace
bracketed fields with real facts. Leave unknowns explicit. The examples use
Codex's `$sales-research` selector; use `/sales-research` in standalone Claude Code.

## A prospect wants recommendations before hiring you

```text
Use $sales-research to draft a reply to this prospect: [redacted message].
I sell [service]. We have not agreed to a paid engagement. They want me to
recommend which changes to make. Help me distinguish a fit conversation from
actual diagnosis, and propose a useful next step without sounding defensive.
Give me the copy first. Do not invent a price or promise outcomes.
```

Look for a useful, respectful next step with room to decline. The answer should
adapt to the request instead of insisting every conversation must be paid.

## Prepare a discovery call

```text
Use $sales-research to prepare a discovery call with [buyer type].
Their stated problem is [their words]. My offer is [offer]. We know [facts]
and do not yet know [gaps]. Choose the questions that would change whether
we proceed. Suggest an agenda and the decision to reach at the end.
```

Look for questions about stakes, fit, authority, constraints, and readiness.
The agent should use what you already know instead of repeating a generic script.

## Respond to a request for a lower price

```text
Use $sales-research to review this request for a discount: [redacted message].
Here is the agreed scope and the terms I can actually offer: [facts].
Compare holding the price, reducing scope, and changing commitment or timing.
Recommend a response. Keep unsupported assumptions about their budget explicit.
```

Look for a trade tied to value, scope, risk, or commitment. The agent should
avoid making up market rates or deciding that every concession is wrong.

## Investigate SaaS conversion

```text
Use $sales-research to investigate why people try [product] but do not buy.
Here is our actual funnel evidence and customer feedback: [attach or paste].
Separate observations from hypotheses. Select relevant sales and positioning
sources, then recommend the next customer question or experiment that could
change our decision. Do not assume missing conversion numbers.
```

Look for product-specific reasoning. A paid consulting diagnostic is not the
default answer to a self-serve product's conversion problem.

## Bound an enterprise AI proof of concept

```text
Use $sales-research to help scope a proof of concept for [AI use case].
The prospect says success means [their criteria or unknown]. Available data,
evaluation access, procurement requirements, and sponsor authority are [facts].
Recommend the smallest proof that supports a buying decision, the evidence
needed to evaluate it, and the next commercial step. Cite relevant primary sources.
```

Look for success criteria, data readiness, a bounded scope, and a decision owner.
The agent should flag missing buying criteria before prescribing a large build.

## Review a sales call

```text
Use $sales-research to review this redacted call transcript: [attach transcript].
Our intended outcome was [decision]. Identify what I did well, where I missed
important evidence, and what I should change on the next call. Tie each finding
to a passage or timestamp. Draft a follow-up, but do not send it.
```

Look for feedback grounded in the actual transcript and a short practice plan.
Missing transcript evidence should stay missing.

## Assess an interview request

```text
Use $sales-research to assess this interview exercise: [redacted request].
They ask me to explain how I would approach [problem]. The expected time and
deliverables are [facts or unknown]. Is this a reasonable evaluation or a
material unpaid deliverable? Help me clarify the scope without accusing them.
```

Look for a distinction between explaining your approach and producing a usable
client deliverable. Consulting boundaries should not override the interview context.
