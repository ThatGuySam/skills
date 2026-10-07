# Sam's Gen Writing smoke scenarios

`evals.json` contains authored synthetic prompts and review criteria. They are not client records, measured outcomes, or evidence that the skill passes.

Install the skill in a disposable project. Start a fresh agent conversation for each prompt, explicitly invoke `sams-gen-writing`, and record the agent and model, date, whether web access was available, the output, and whether each expectation was met.

The five scenarios cover programmatic location pages, a fabricated reviewer persona, a commodity finance post, LLM-specific chunking, and Merchant Center AI product data. For a sixth check, disable web access and ask a current-policy question. The answer should give the reference date or the `policy-unverified` status rather than present stale policy as current.

No behavioral pass rate has been measured yet. Treat the skill as `awaiting-evals` until these runs are recorded.
