# Sources and Optional Skill Routing

Source check, September 11, 2026: retrieved the Motion and Onboarding article bodies through Apple's official JSON endpoints, Apple subscriptions, WCAG, both YC articles, and Stripe Customer Management. The HIG index is a discovery link; local research leads were inspected as dated background. Short paraphrases and audit implications below are a synthesis, not universal laws. Refresh precise platform, accessibility, and billing requirements during an audit. Do not bulk-load this catalog's linked material.

## Official Grounding

| Source | What It Supports | Applicability and Limits |
| --- | --- | --- |
| [Apple HIG: Motion](https://developer.apple.com/design/human-interface-guidelines/motion) | Purposeful, optional, brief feedback; restraint on frequent interactions; cancellation and spatial expectations. | Apple guidance with useful cross-platform principles. Does not mandate a spring library, iOS appearance, or fixed timing on every platform. |
| [Apple HIG: Onboarding](https://developer.apple.com/design/human-interface-guidelines/onboarding) | Learning through interaction and contextual guidance; quick, optional onboarding when appropriate. | Necessary setup and domain safeguards may remain. |
| [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/) | Find the target platform's layout, navigation, input, accessibility, and component guidance. | Retrieve the relevant topic before asserting a platform-specific rule. |
| [Apple: Auto-renewable Subscriptions](https://developer.apple.com/app-store/subscriptions/) | Clear duration, renewal price, billed amount, trial terms, and restoration. | App Store subscription guidance. Billing clarity generalizes; store-specific requirements do not automatically govern web checkout. |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Testable accessibility criteria, levels, and exceptions. | Web standard; report exact criterion/level and evidence. A partial audit is not a conformance assessment. |
| [YC: Essential Startup Advice](https://www.ycombinator.com/blog/ycs-essential-startup-advice/) | Useful early releases, user contact, focused solutions, iteration, and caution about premature growth. | Startup advice, especially early-stage. Does not justify unsafe launches or impose venture-growth objectives on every product. |
| [YC: Kevin Hale on Conversion and Pricing](https://www.ycombinator.com/blog/startup-school-week-7-recap-kevin-hale-on-conversion-rates-and-pricing/) | Product comprehension, fit, credibility, price/catch/help questions; value and cost in pricing. | Use as product questions and pricing hypotheses. Do not reuse historic benchmarks, multiplier claims, or blanket price increases as audit requirements. |
| [Stripe: Customer Management](https://docs.stripe.com/customer-management) | Examples of subscription changes, cancellation, payment updates, and invoice access through a customer portal. | Provider capabilities, not evidence that a particular app has enabled them. Use the actual provider's docs when auditing implementation. |

Apple's page bodies may require JavaScript. Official structured article content was retrieved for [Motion](https://developer.apple.com/tutorials/data/design/human-interface-guidelines/motion.json) and [Onboarding](https://developer.apple.com/tutorials/data/design/human-interface-guidelines/onboarding.json). Use the article's official data endpoint or an approved browser when a rendered fetch is empty; an empty response is not evidence that guidance is absent.

The YC pricing recap and Essential Advice article were retrieved directly. A separate YC “How to Talk to Users” library fetch failed; it is not required evidence for this skill. Customer-discovery methods can use the available mom-test skill without claiming that failed page was read.
