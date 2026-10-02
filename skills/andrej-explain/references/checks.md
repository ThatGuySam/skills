# Mechanical checks

Read when checking a controlled-language rewrite, a text output with explicit constraints, or SRT captions. Both scripts run locally with Node.js 18+ and no packages, network access, or edits to the input. Use absolute paths to the scripts inside this skill when running from another directory.

## Text

Prepare a plain-text copy of the actual final prose. Omit only presentation markup, code, and metadata that are outside the requested prose scope. Do not omit difficult sentences to obtain a pass. For mixed procedures and descriptions, check each section under its corresponding profile.

```bash
node scripts/check-text.mjs explanation.txt --profile procedure
node scripts/check-text.mjs explanation.txt --profile description --contract contract.json
```

Profiles:

- `plain` (default): measurements and any explicit contract only.
- `procedure`: flag semicolons as errors; flag sentences over 20 approximate words for review.
- `description`: flag semicolons as errors; flag sentences over 25 approximate words and paragraphs over six sentences for review.

Length warnings use English `Intl.Segmenter`, not the STE counting algorithm. Blank lines separate paragraphs. The JSON includes each detected sentence and its count, plus Node and ICU versions for reproducibility. Abbreviations, headings, vertical lists, and soft line breaks can affect segmentation. STE additionally groups parentheses, quoted text, quantities with units, proper names, and other elements under special counting rules. Inspect those cases against the applicable standard. A profile is a linting aid, not a compliance mode.

For user-approved exact wording or project limits, create a JSON contract. Derive it from the request and source before checking the draft; do not weaken it just to make the draft pass.

```json
{
  "maxWordsPerSentence": 20,
  "maxSentencesPerParagraph": 6,
  "requiredLiterals": ["429", "fewer than 3 attempts", "at least 5 seconds"],
  "forbiddenLiterals": ["guaranteed"],
  "forbidSemicolons": true
}
```

Only include relevant keys. `exactSentences` is also supported. Counts in explicit contracts are hard requirements under the documented segmentation method, not proof of STE compliance. All limits must be positive integers. Unknown keys, malformed JSON, and invalid types fail rather than being ignored.

Literals are case-sensitive exact strings with letter/number/underscore boundaries at word-like ends. `5 seconds` will not match inside `15 seconds`. Whitespace and punctuation within a literal must match exactly. Use full quantities and units, not bare digits. Literal presence does not prove a condition's meaning: “Do not wait 5 seconds” still contains “5 seconds.” Check negation, logic, units, relationships, and source fidelity yourself. A meaningful paraphrase may require human review instead of an exact-literal contract.

## Captions

```bash
node scripts/check-captions.mjs captions.srt --duration-ms 45000
```

The SRT checker requires sequential cue numbers starting at 1, nonempty caption text, valid timestamps, positive intervals, and no overlaps or out-of-order cues. Gaps are allowed. The optional positive integer duration rejects cues ending after that limit; equality passes. BOM and CRLF input are accepted. Cue positioning extensions are not supported. This is a deliberately nonoverlapping SRT subset for these explainers, not every legal subtitle format.

The result does not verify narration speed, coverage of the full video, caption readability, transcript accuracy, audio presence, synchronization, or rendered output. A 45-second caption timeline is not a rendered 45-second video.

## Handle the result

Both scripts print JSON. Exit `0` means implemented checks passed, `1` means a check failed, and `2` means input, configuration, or invocation failed. Read `warnings` even after exit `0`. Empty input fails. No script rewrites the explanation.

Fix applicable errors, inspect warnings, and rerun after changing the draft. Preserve meaning during fixes. If a requirement conflicts with the source or the requested format, explain the conflict instead of silently disabling it. If Node is unavailable, do the manual checks and state that automated checking was not run. Never present script success as full STE compliance, semantic verification, or demonstrated learning.

The [official Issue 9 specification](https://www.asd-ste100.org/assets/files/ASD-STE100_ISSUE9.pdf) supplies the STE rule context. [Boeing's checker overview](https://www.boeing.com/company/simplified-english-checker) also lists the sentence and paragraph limits. Official indexed excerpts for punctuation and counting rules were checked on October 2, 2026; the complete dictionary remains outside these scripts.
