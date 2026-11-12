---
title: Emily Verification
description: Retrieval and behavior results for the Emily skill, the held-out gate it missed, and the limits of the evidence.
---

The eval suites, rubric, and raw results are kept in the maintainer's private repository. This page gives the method and scores only.

## Retrieval, measured November 12, 2026

The retrieval benchmark scores the skill's search against exact passage judgments: a result counts only when its full chunk ID is listed as relevant for that query. Being in the right book or chapter does not count. Each suite is compared with a plain TF-IDF search over the same text. The pass gate is hit@5 of 0.80 for every suite.

| Suite | Queries | Skill hit@5 | Baseline hit@5 | Gate |
| --- | ---: | ---: | ---: | --- |
| Development | 22 | 0.9545 | 0.8182 | Passed |
| Paraphrase | 10 | 1.0000 | 0.9000 | Passed |
| Sealed holdout | 14 | 0.5714 | 0.5000 | **Failed** |

The development suite guided changes to the search, so its score is diagnostic. The paraphrase suite rewords the behavior scenarios and overlaps them, so it measures robustness to rewording. Only the sealed holdout is evidence of how the search does on unseen questions: it was designed from source passages by evaluators who had not seen the search code or earlier results, and it was not used for tuning.

**The skill did not pass its retrieval gate.** On the holdout, a relevant passage was in the top five for 8 of 14 queries. Treat a citation as a lead to check, not a guarantee that the best passage was found.

No advice-mode query returned a style-only passage, corpus metadata coverage was complete, and the corpus boundary checks were clean. This run used the published search code and corpus with Bun 1.4.4 on macOS. It reproduced the scores first recorded on August 9, 2026.

## Behavior, recorded August 9, 2026

Ten scenarios cover source fidelity, historical-to-modern reasoning, inclusion, boundaries, corpus silence, and labeled pastiche. Ten isolated runs each answered one scenario with access to the skill but not to the rubric or earlier outputs. A separate grader then scored each assertion.

The run passed 10 of 10 scenarios and 41 of 41 assertions.

## Limits

- The behavior run is a single trial per scenario. The exact generator and grader model IDs were not recorded, and it has not been repeated on current models.
- No etiquette expert has reviewed the scenarios or the answers.
- Retrieval scores measure the search script, not the quality of the final advice.
- Automatic skill selection is untested.
