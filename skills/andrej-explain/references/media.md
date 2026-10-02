# Choosing and checking explainer media

Read before producing a diagram, interactive page, animation, or video. Use only the section for the chosen format plus the shared checks.

## Shared checks

- Name the relationship the artifact must reveal before designing it.
- Use accurate labels, units, scales, and direction. Mark synthetic data, simplifications, and assumptions where the reader encounters them.
- Remove decorative content that competes with the explanation. Place labels near the objects they describe and reveal complexity in a useful sequence.
- Provide a text explanation or transcript and a usable static state. Do not rely on color alone. Respect reduced-motion preferences when the environment supports motion.
- Keep source links and material caveats with the artifact. Keep secrets and private source content out of public artifacts and client-side code.
- Use the available tools to inspect the real artifact. State specific checks omitted because a tool is unavailable; never substitute “should work” for a test result.

## Diagrams and plots

Use a diagram for relationships and a plot for quantitative behavior. Prefer a precise native diagram or plotting tool when labels and values must be exact. Use generated raster imagery when illustration serves the topic rather than as the authority for exact data.

Check that every arrow means what the prose says it means. Separate sequence, dependency, and causation. Verify labels and boundaries after rendering, including narrow screens or export sizes relevant to delivery. Do not call a rendered image verified if only its source was inspected.

## Interactive HTML

Build around one useful question. Give the reader a meaningful control, an observable result, and a sentence explaining the relationship. Include a sensible initial example, limits, and reset where useful. Do not add sliders that merely decorate a static answer.

Prefer a self-contained page without external dependencies for a small disposable explainer. Use a larger application only when the task requires it. Label illustrative models as such; do not imply that a toy simulation predicts real outcomes.

Use semantic controls, visible labels, keyboard access, readable contrast, and responsive layout. The main conclusion and important caveats must remain understandable if scripts fail. Put sources in an accessible section.

Test the initial state, each meaningful control, reset, and decisive boundaries. Compare computed values with independent expected values. Inspect the rendered page and check errors when browser tooling is available. A numerical smoke test alone does not establish visual or keyboard usability.

## Animation and narrated video

Use animation when motion or time explains the mechanism. For a requested video, check rendering, audio, and file-delivery capabilities before promising the output. Draft the script and storyboard around the actual question, then render when possible.

A “3Blue1Brown-style” request can mean geometric intuition, worked examples, gradual construction, and synchronized explanation. Use original visuals and narration; do not present the result as affiliated with the creator or clone a person's voice.

Separate explanatory beats and allow the viewer to pause or revisit them. Synchronize narration with the visible step. Provide captions or a transcript; advice against redundant screen text is not a reason to remove accessibility support.

Inspect the resulting video for correct labels, readable timing, and matching narration. Verify duration, audio presence when requested, and the actual delivered file. If rendering or narration is unavailable, provide the useful script, storyboard, or animation source and label exactly what it is. A storyboard is not a completed video.

Use an already authorized narration service or an available local option. Never put an API key into the delivered HTML, repository, script example, or transcript. Explain a tool limitation before asking for access that is genuinely required.
