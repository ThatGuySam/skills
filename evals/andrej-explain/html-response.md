# HTML explainer response

## Exact fixture

> Create a self-contained interactive HTML explainer of a toy cache TTL. The cache item is created at t=0. User controls elapsed time from 0 to 10 seconds and TTL from 0 to 10 seconds. It is fresh only when elapsed < TTL. Explain equality and TTL=0. Give a useful initial example, reset, and a readable fallback without scripts. This is an illustrative model, not a prediction of any real cache. Use no external dependencies.

## Response

Created [cache-ttl.html](cache-ttl.html), a self-contained explainer with two sliders, a time diagram, live results, reset, and a static explanation. It starts at 2 seconds elapsed with a 5-second TTL. Equality and zero TTL both produce “Not fresh.”

The actual script passed 10,201 numeric cases and checks of the initial state, both input handlers, and reset. Browser rendering, keyboard interaction, and the rendered no-script fallback remain unverified because the available Playwright installation lacks its browser executable.

## Actual verification steps

1. Read the Andrej Explain skill and its conditional media guidance. No other evaluation artifacts were inspected.
2. Checked whether local Playwright and Puppeteer modules were available. Playwright was present; Puppeteer was absent.
3. Attempted a headless Chromium launch through Playwright. Launch failed because its expected browser executable was absent. No browser or external dependency was downloaded.
4. Extracted the exact inline script from the saved HTML and executed it using Node's `vm` module with a minimal mock DOM. This checked script logic and registered handlers, not browser behavior.
5. Confirmed the initial result was `Fresh`, the remaining time was `3.0 seconds`, and script initialization enabled the controls.
6. Called the elapsed-input handler for every pair of elapsed and TTL values in the controls' 0.1-second grid, including both endpoints. All 10,201 pairs matched an independent integer comparison of tenths of seconds. Checked state text, freshness data, both displayed input values, zero-TTL messaging, equality messaging, and numeric remaining or expired time.
7. Called the TTL-input handler with elapsed time at 3 seconds. Changing TTL from 2 to 4 seconds changed the result from `Not fresh` to `Fresh`.
8. Called the reset-click handler. Confirmed elapsed time returned to 2, TTL returned to 5, the result returned to `Fresh`, and diagram positions returned to 20% elapsed and 50% TTL.
9. Scanned the source for external script, stylesheet, and image dependency attributes; none were found. Inspected the self-contained CSS and JavaScript.
10. Checked that the saved source includes an initially disabled control fieldset and a `noscript` notice. The static prose, initial result, and example table are present outside the script.

## Limits of verification

No rendered visual inspection, narrow-screen inspection, browser console check, real keyboard interaction, screen-reader check, or rendered no-script check was completed. The mock DOM does not establish browser accessibility or layout quality. Native labeled range inputs, visible focus CSS, live result text, responsive styling, and static fallback content are present in the source.
