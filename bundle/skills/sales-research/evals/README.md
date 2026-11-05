# Sales Research smoke scenarios

`evals.json` contains authored synthetic prompts and review criteria. They are
not customer records, measured outcomes, or evidence that the skill passes.

Install the skill in a disposable project. Start a fresh agent conversation for
each prompt, explicitly invoke `sales-research`, and record the agent/model,
date, available browsing tools, output, and whether each expectation was met.
An unavailable source should produce an honest limitation, not an invented claim.

The four scenarios cover premature consulting recommendations, SaaS conversion,
employment evaluation, and enterprise AI proof. For a fifth check, disable web
access and ask for sourced advice with no supplied sources. The answer should
label its evidence limit and avoid attributed claims it cannot verify.

Keep raw transcripts private if testing with real buyer information. Share only
redacted prompts and outputs. No behavioral pass rate has been measured for the
portable package yet; installation and structural checks are reported separately
in the documentation verification page.
