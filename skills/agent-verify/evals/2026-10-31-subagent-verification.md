# Required Subagent Verification Pilot

On 2026-10-31, two fresh coordinator subagents explicitly loaded the revised Agent Verify skill and exercised its new-work and update-comparison paths. Each coordinator spawned one fresh executor and one fresh independent QA agent. All agents inherited the runtime model. Exact child model/effort telemetry, tokens and costs were unavailable. No model-diversity claim is made.

## Constructed Inputs

The coordinating agent generated these synthetic Python fixtures for this pilot. They are test inputs, not production code or user observations.

New work, `word_count(text)`, had to return an exact integer count of whitespace-separated words, including empty and whitespace-only input:

```python
def word_count(text):
    return len(text.split())
```

An update to `parse_items(text)` had to preserve stripped nonblank lines in order and skip only lines whose first non-whitespace character was `#`. The previous fixture was:

```python
def parse_items(text):
    return [line.strip() for line in text.splitlines() if line.strip()]
```

The candidate fixture was:

```python
def parse_items(text):
    return [line.strip() for line in text.splitlines() if line.strip() and "#" not in line]
```

## Observed Results

The new-work executor ran five cases. Independent QA inspected the source and actual executor script, output and exit status, then ran six separate checks with twelve assertions. Both executions exited zero. Empty input, whitespace-only input, mixed separators and exact integer results passed. The scoped verdict was **meets checked criteria**.

The comparison executor ran the same six cases on both anonymous variants. Independent QA inspected both artifacts and reran both with a separate suite. These were four suite executions, two executor executions and two QA executions. Ordinary items, blank inputs and other literal text passed in both versions. The candidate gained comment skipping but discarded literal hash-bearing text such as `C#` and `hello # world`. A mixed case also lost `second#literal`. The scoped verdict was **mixed**, with a critical preservation regression blocking candidate acceptance.

The QA suites returned nonzero for both comparison fixtures because each violated a requirement. Successful function execution alone did not count as acceptance. There were no fixture repairs or model escalations.

## Evidence and Limits

The authoring session retained frozen inputs and hashes, criteria, prompts, executor artifacts, QA scripts, stdout/stderr, exit statuses and reconciled reports in its local evidence directory. The root coordinator inspected the actual output and QA artifacts. This public record includes the synthetic source fixtures and a sanitized summary, rather than raw agent transcripts or machine-specific paths.

These were bounded, explicitly invoked behavioral pilots, not automatic selection trials or a comparison of old versus revised Agent Verify. They establish that these runs used subagents, verified a new artifact and reported a mixed update without averaging away its regression. They do not establish broad verifier accuracy, improvement over the previous skill, document-review quality, cross-model transfer, unavailable-subagent behavior or human preference calibration.
