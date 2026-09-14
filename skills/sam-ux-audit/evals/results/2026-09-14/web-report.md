# Website Smoke Audits

Date: 2026-09-14. Evaluator: authoring GPT-6 Astra agent. Browser: Codex in-app browser, desktop viewport 1280 × 720; GOV.UK also tested at 390 × 844. The screenshot and AX/DOM files in this directory are the primary observations. Dependency receipt: [skill-versions.json](skill-versions.json). No site changes or feedback submissions occurred.

## W3C Inaccessible Demo: Home to Tickets

Targets: [home](https://www.w3.org/WAI/demos/bad/before/home.html) and [tickets](https://www.w3.org/WAI/demos/bad/before/tickets.html). Citylights is a deliberately synthetic teaching fixture. Its historical dates and invented commercial content are not defects in a live business.

1. **High; high confidence; observed:** Four image-only demo navigation links expose empty text and images without alt text. The accessibility tree identifies them by JavaScript destinations rather than Home, News, Tickets and Survey. See `w3-before.dom.json`, `w3-before.ax.json` and `w3-before.png`. Clicking the ticket control reaches the ticket page, so the observed defect is naming, not a broken destination. Give each link a meaningful name. Acceptance: the demo navigation exposes its visible labels in the accessibility tree. Relevant guidance: [WCAG 4.1.2](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html).
2. **High; high confidence; observed:** Ticket purchase information gives its phone number as an image whose accessible name is merely “music line phone number.” The digits are absent from that accessible description. See `w3-before-tickets.ax.json` and `w3-before-tickets.png`. Provide the number as text or an equivalent alternative. Acceptance: the same number visible to sighted users is available in text. Relevant guidance: [WCAG 1.1.1](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html).
3. **Medium; high confidence; observed:** The demo home content visually presents titles but exposes no h1–h3 headings inside `#main`. The surrounding W3C demonstration header is separate. See `w3-before.dom.json` and screenshot. Encode the content hierarchy with headings. Acceptance: heading navigation reaches the demo title and story sections. Relevant guidance: [WCAG 1.3.1](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html).

The accessibility and HIG clarity lenses converge on the same navigation issue; it is one finding, not two votes or two defects. Base/accessibility/HIG lenses reviewed. Motion and performance are not applicable to this bounded information-access comparison; no frame-rate, Core Web Vitals or contrast measurements are claimed. Actual screen-reader speech and full keyboard traversal remain untested.

## W3C Corrected Demo: Same Journey

Targets: [home](https://www.w3.org/WAI/demos/bad/after/home.html) and [tickets](https://www.w3.org/WAI/demos/bad/after/tickets.html). The corrected ticket page exposes named navigation, a ticket heading, and phone digits as text. Returning through HOME reaches the corrected home page, which exposes content headings and specific story links. See `w3-after-tickets.ax.json`, `w3-after-tickets.png`, `w3-after.ax.json` and `w3-after.dom.json`.

Those selected before-page defects are absent in the inspected corrected states. Preserve these improvements. No additional high-severity finding is justified by this bounded check; this is not a complete conformance result. A targeted Enter activation of the skip-content link changed the fragment to `#content`, but activeElement remained BODY, so this run does not claim programmatic focus transfer was verified.

## GOV.UK: Select a Region and Find the Next Holiday

Target: https://www.gov.uk/bank-holidays . Rejected optional cookies and hid the acknowledgement. Selecting Scotland updated the selected tab, URL fragment and regional content. Pressing ArrowRight on the Scotland tab moved selection and focus to Northern Ireland. See `gov-scotland.ax.json`, `gov-scotland.png`, and `gov-keyboard.json`.

At 390 × 844, tabs become in-page contents links and all regional sections are shown. The first screenshot after resizing showed England and Wales at the top despite the retained Northern Ireland fragment. This alone was insufficient to report broken mobile selection. Clicking the visible Northern Ireland contents link scrolled its heading to the top of the viewport. The measured document width equaled 390 CSS pixels. See `gov-mobile.json`, `gov-mobile-navigation.json` and `gov-mobile-destination.png`.

**Scoped result:** no blocking defect reproduced for selecting a region and reading the next holiday. Named controls, visible focus, regional feedback, and mobile in-page navigation are strengths. No redesign, new onboarding, animation, or paywall is warranted. Base/accessibility/HIG principles reviewed; motion and performance not applicable to the requested bounded check. Broader screen-reader behavior, color contrast, zoom, error recovery, download/calendar import and performance remain unverified. Holiday values are recorded page content, not independently researched calendar advice.

## Evaluation Limits

The before/after fixture supplies known contrasting designs, so it is useful for a smoke check but not a blind benchmark. The authoring agent performed these cases; source reviews were independently delegated. No measured improvement over a baseline model, aggregate UX score, user-satisfaction outcome, or compliance certification is claimed.
