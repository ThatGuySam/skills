# Audit Lenses

Use the applicable questions, not a mandatory feature inventory. These are Sam's audit synthesis; specific external support and scope limits are in [grounding.md](grounding.md).

## Product Value and First Useful Result

Can the intended person explain what this is, whether it fits their need, and what to do next? Does the core journey deliver a useful result before asking for avoidable setup or commitments? Are claims backed by the actual product? Is help available when the person needs it?

Separate a usability failure from a demand hypothesis. Observe behavior and past attempts where available; compliments, waitlists, or a heuristic audit do not prove willingness to pay. Prefer a focused useful workflow over adding features as a default response. Preserve onboarding necessary for safety, permissions, complex setup, or irreversible work; test whether it can be contextual or deferred.

## Navigation, Content, and Control

Assess information hierarchy, consistent vocabulary, discoverable actions, search/browse/filter paths where relevant, readable content, and a useful next step. Check whether Back, navigation, reload, and mode switches preserve the context needed for the task. Distinguish missing data from empty results and show uncertainty when it changes a user's decision.

Evaluate density for the intended user: an expert workbench may need more visible information than a first-use mobile screen. Do not prescribe minimalism, one CTA, pagination, or a particular navigation pattern without explaining the task benefit.

## States, Feedback, and Recovery

Trace the meaningful states: idle, loading, empty, success, failure, interrupted/offline, permission denied, stale/unsaved, and recovery as applicable. Does the person know what happened, what persists, and what they can do next? Can they retry without duplicate consequences? Are expensive/destructive actions explained and recoverable when feasible? Preserve work on errors and avoid success messages before success is established.

Do not infer runtime durability or retry correctness from visual labels alone. Separate source concerns from reproduced failures.

## Accessibility and Platform Fit

Check keyboard/focus order and restoration, visible focus, meaningful labels and semantics, screen-reader announcements, non-color cues, contrast, zoom/reflow and text resizing, target sizes, and alternatives to gestures or drag where applicable. Evaluate authentication, form errors, and help as part of the journey. Use platform-appropriate assistive technology and conventions.

An automated accessibility result is one evidence source, not proof of WCAG conformance. Cite the exact success criterion and level when alleging a violation. Keep CSS pixels, native points, exceptions, and platform recommendations distinct; do not universalize numeric touch-target or timing defaults.

## Motion and Responsiveness

Ask what motion communicates: orientation, progress, feedback, a relationship, or occasional delight. Review frequency, start/finish feedback, interruptibility, direction/origin, waiting time, and large-area/autoplay movement. Try repeated and keyboard-driven use. Keep useful state feedback; reduce or remove decorative motion that competes with the task.

Test reduced-motion behavior without losing information or operability. Zero spatial movement, an instant state change, or a simple fade may each be appropriate. Do not require fades or springs everywhere, ban all CSS animation, or impose a universal 300 ms threshold. Distinguish visual jank, measured frame/latency problems, and source-level performance risks. No motion is an acceptable outcome.

## Pricing, Billing, and Exit (When Applicable)

Follow the lifecycle from offer and purchase through ongoing use, changes, failed payment, and exit. Ask whether the person can understand:
- What they get, the actual charge and currency, billing unit/cadence, required fees and limits, and whether the offer fits them.
- Trial duration, what happens afterward, renewal terms, and any recurring commitment before agreeing.
- Usage/seat limits and overages where relevant; timing and financial effect of upgrades, downgrades, and prorations.
- Purchase pending/failure/success, receipt/history, payment-method updates, and recovery without duplicate charges.
- How cancellation works, when it takes effect, what access/data remains, and how to obtain help or restore purchases where relevant.

Inspect consistency across pricing copy, checkout, account state, and actual entitlements when access permits. Do not optimize conversion by hiding terms, obstructing cancellation, adding deceptive urgency, or making decline choices misleading. Do not assume subscriptions, a free trial, a price increase, or a specific payment provider is best. Sales-assisted procurement may be appropriate; assess clarity of that path instead of demanding public prices for every product.

## Evidence and Learning

Recommend the smallest observation that resolves the most important uncertainty: a task walkthrough with an intended user, a failure-path check, or an instrumented pilot. Name the question, behavior to observe, and decision it informs. Use measured completion/errors/time-to-value only when captured. Retention, revenue, and satisfaction improvements remain hypotheses until evaluated. Avoid universal conversion benchmarks and invented ROI.
