# Google policy on AI-generated content

Formal Google Search Central documentation, paraphrased. Pages checked 2026-10-07; each entry gives the page's own last-updated date. Re-check before relying on any requirement for a consequential decision.

## Guidance on using generative AI content

Source: [Google Search's guidance on using generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) (page updated 2026-10-01).

- Generative AI can help research a topic and add structure to original content.
- AI-assisted content must meet Search Essentials and the spam policies.
- Generating many pages without adding user value may violate the scaled content abuse policy.
- The Search Quality Rater Guidelines cover scaled content abuse (section 4.6.5) and main content made with little effort, originality, or added value (section 4.6.6). Rater guidelines do not directly influence ranking.
- Models predict likely text and can produce inaccuracies, so fact-check and review content before publishing. This includes title elements, meta descriptions, structured data, and image alt text.
- Follow general and feature-specific structured data guidelines and validate markup.
- Give readers context on how content was created, in a way that suits the audience, and add image metadata where relevant.
- Google Merchant Center: AI-generated images need IPTC `DigitalSourceType` set to `TrainedAlgorithmicMedia`. AI-generated product data such as titles and descriptions must be specified separately and labeled as AI-generated.

## Creating helpful, reliable, people-first content

Source: [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) (page updated 2026-10-05).

- **Who:** Readers should be able to tell who made the content. Use bylines where readers expect them, linked to author information. Fabricated creator profiles, including AI-generated headshots, invented names, or false credentials, are deceptive.
- **How:** Explaining how content was produced, including automated or AI-assisted production, builds trust. Disclose where a reader might wonder how it was created, and consider explaining why automation helped.
- **Why:** Google calls this the most important question. Content should exist mainly to help people. Using automation mainly to manipulate rankings violates the spam policies.
- Self-assessment questions ask whether content offers original information, research, or analysis; first-hand expertise; review by someone who knows the topic; and insight beyond the obvious.
- Warning signs of search-engine-first content include mainly summarizing others without adding value, extensive automation across many topics, changing dates without substantive change, entering a niche only for traffic, and writing to a word count. Google says it has no preferred word count.
- E-E-A-T means experience, expertise, authoritativeness, and trustworthiness. Trust matters most. E-E-A-T is not a specific ranking factor; systems weigh it more for "Your Money or Your Life" topics.

## Spam policies

Source: [Spam policies for Google web search](https://developers.google.com/search/docs/essentials/spam-policies) (page updated 2026-08-28).

**Scaled content abuse:** many pages generated mainly to manipulate rankings rather than help users, usually unoriginal and low-value, no matter how they are created. Listed examples include:

- generative AI or similar tools producing many pages without user value;
- scraping feeds, search results, or other content into many pages, including through synonymizing, translating, or other obfuscation;
- stitching content from several pages without adding value;
- creating multiple sites to hide the scale; and
- pages that make little sense to readers but contain search keywords.

The page advises excluding such content from Search if a site hosts it.

**Site reputation policy:** third-party content published mainly to exploit a host site's ranking signals. Third-party content alone is not a violation; editorial columns, syndication, user-generated content, and ordinary advertorials are listed as acceptable.

**Thin affiliation:** affiliate pages copying merchant descriptions without original content or added value. Good affiliate pages add price information, original reviews, testing, navigation, or comparisons.

## History

Google published its general AI-content stance in [Google Search's guidance about AI-generated content](https://developers.google.com/search/blog/2023/02/google-search-and-ai-content) (Search Central Blog, February 2023). That post framed AI content under the existing helpful-content approach. Earlier public remarks, including a widely discussed 2022 statement that auto-generated content was against guidelines ([Hacker News discussion, April 2022](https://news.ycombinator.com/item?id=30969620)), predate it. The [March 2024 core update and spam policies post](https://developers.google.com/search/blog/2024/03/core-update-spam-policies) introduced the scaled content abuse policy, which broadened the earlier policy on spammy automatically generated content. The blog bodies could not be retrieved on 2026-10-07, so the March 2024 change is from prior knowledge, not a fresh read; the current requirements above were read directly.
