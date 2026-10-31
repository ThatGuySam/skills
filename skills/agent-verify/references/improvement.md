# Design for Useful Improvement

Start with the decision the evidence should change. Name the intended user, the practical benefit and an observed shortfall or genuine uncertainty. Examples of useful outcomes include fewer substantive corrections, better task completion, fewer unsupported claims, or lower measured cost at an unchanged quality bar. Do not select a proxy merely because it is easy to score.

## Establish That the Test Can Discriminate

Inspect representative baseline artifacts before choosing an optimization target. Use development examples to identify recurring failures and their consequence. A challenge case should expose a behavior the proposed change can plausibly improve. Do not weaken a capable baseline or manufacture a failure to create headroom.

Keep two purposes separate:

- Regression cases preserve behavior that already works.
- Improvement cases test an observed shortfall, a harder relevant task or a meaningful efficiency opportunity.

A ceiling result can be valid evidence of no demonstrated advantage. If the cases cannot distinguish useful success from the failure of interest, refine the measurement on development data before generating more answers. Preserve the earlier result. Harder cases must still represent authorized, plausible use; novelty and difficulty alone do not make them useful.

## Choose Criteria That Reflect the Benefit

Separate required conditions from compensating preferences. Use pass/fail/unknown checks for discrete requirements and report their conjunction plus each failure category. A higher total cannot excuse a failed requirement. Continuous measures or rankings remain appropriate when the actual outcome is continuous or comparative; define the tradeoff rather than forcing everything into binary labels.

Keep a requested numerical rating as a secondary summary when useful. Predeclare what change would matter, using user requirements or observed correction burden where possible. Label a convenience threshold as a proposed judgment, not a research-established optimum. When no meaningful effect size can yet be justified, run a diagnostic pilot and report that limitation.

## Validate the Measurement Before Optimizing It

Follow the grader controls and preference-calibration requirements in [QA roles and grading](qa.md). Check that the grader catches the material defect, accepts valid alternatives and leaves missing evidence unknown. Agreement between models does not establish the user's preferences. Missing human labels can limit a preference claim while deterministic compliance remains measurable; continue independent checks rather than inventing labels or blocking all work.

Keep known, inferred and unknown reference labels distinct. A current title, a prior answer or a polished example is not automatically human-approved ground truth. Inventory the information available to the worker. A reference that depends on later state, unseen attachments or private context cannot require recovery of that hidden fact. Distinguish a flawed fixture from an output failure.

## Freeze the Confirmation

Let exploratory review refine criteria on development cases. Then freeze the rubric, grading controls, inputs, versions, runtime settings and analysis before confirmation. Cases used to revise instructions, choose a model or repair a grader are exposed development cases, even if they were once held out. Keep related tasks and transformed copies together when splitting data.

Match the deployment context and unit of work. Shared output directories, prior histories and concatenated unrelated cases can change the task. State the actual isolation boundary. Compare any validator, retry or context-profile addition as part of the pipeline treatment; do not attribute its benefit solely to instruction text.

## Spend the Next Trial on an Uncertainty

Use cheap observable checks first. Add repetitions to examine stochastic variation, new cases to extend coverage, and independent adjudication to resolve a specific supported dispute. These solve different problems. Do not substitute repeated votes for missing labels or keep rerunning only failures until a favorable outcome appears.

Keep constructed controls separate from natural task frequencies and real model outcomes. Record each control's source, transformation and expected relationship. Useful types include an identical-output tie, a known material defect, an irrelevant input change that should preserve behavior, and a decisive change that should alter it.

Count unique task units, generation attempts, repairs and grader votes separately. If reporting uncertainty, use the task's grouping structure; repeated votes about the same output are not new user tasks. Do not infer actual spend or savings from word count or unavailable telemetry.

Finish with the supported conclusion, including no useful advantage. Report whether gains crossed the declared decision boundary, which categories regressed, and what remains unverified. A diagnostic pilot can identify the next useful experiment without claiming reliable user preference prediction.
