# Research basis and design limits

Reviewed October 28, 2026. This skill is an evidence-informed workflow, not a demonstrated guarantee that fresh agents or model escalation improve every result. Recheck model/runtime capabilities when executing; the sources below are methods, not runtime instructions.

| Source | Finding used | Limit and design inference |
| --- | --- | --- |
| [OpenAI evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices) | Task-specific criteria, executable checks, pairwise grading, human calibration and order/verbosity bias matter. The current guide recommends a strong judge before optimizing judging cost. | Terra-first QA is a budget-sensitive pilot, not an equivalent replacement for a calibrated strong judge. Escalate or retain uncertainty when anchors fail. |
| [Anthropic, Demystifying evals for AI agents](https://www.anthropic.com/research/demystifying-evals-for-ai-agents), Jan 9, 2026 | Actual environment outcomes differ from agent claims; multiple trials and combined check types reveal failures. | Check relevant artifacts and tool events; do not certify actions from a final answer alone. One cheap layer cannot prove every property. |
| [Zheng et al., MT-Bench and Chatbot Arena](https://arxiv.org/abs/2306.05685), 2023 | Studied position, verbosity and self-enhancement bias in model judgments alongside agreement with human preferences. | Randomize/blind labels and check reversed order for material subjective differences. Older-model task results are not Terra/Astra calibration. |
| [Panickssery et al., Self-preference](https://arxiv.org/abs/2404.13076), 2024 | Models can recognize and favor their own generations in studied tasks. | A fresh QA conversation reduces author-context leakage but does not erase same-model bias. Independent context is not statistical independence. |
| [Xiong et al., Confidence elicitation](https://arxiv.org/abs/2306.13063), ICLR 2024 | Verbal confidence can be overconfident; studied methods do not uniformly solve difficult-task uncertainty. | Confidence is optional evidence to calibrate, never a universal approval threshold. |
| [Apple, Learning to Route LLMs with Confidence Tokens](https://machinelearning.apple.com/research/learning-to-route), ICML 2025 | A trained confidence-token method improved routing/rejection over conventional confidence signals in the authors' experiments. | This does not establish that asking an unmodified model for a number supplies that signal. |
| [RouteLLM](https://arxiv.org/abs/2406.18665), revised Feb 23, 2025 | Learned routing uses preference data to select stronger/weaker models. | Supports investigating adaptive routing, not a universal Terra-to-Astra threshold or guaranteed transfer. |

The coordinator/worker/fresh-QA/adjudicator separation is our design synthesis. The coordinator retains task ownership and checks evidence; fresh QA supplies the first interpretive verdict. Objective checks can be decisive without another model. A different grader model is useful only if permitted and capable on the rubric; it is not a substitute for labels and artifact verification. Human judgment remains necessary for user values and some domain decisions.

Practical defaults such as one repair, one escalation and small category-based pilots are budgeting choices. Their adequacy must be established for the workload. Improvement evidence must allow no-change and regression outcomes, retain failures, and avoid grading answers against the author's desired conclusion.

## Google provider extension

The [provider reference](model-providers.md) records the October 29, 2026 Google endpoints, thinking controls and Carbon access limitation with primary links. Google support adds executor selection and an optional Flash/Argon/Carbon ladder. The same evidence/QA rules apply; no Gemini inference was used to validate these routing instructions. Provider positioning is not a comparative grader benchmark.
