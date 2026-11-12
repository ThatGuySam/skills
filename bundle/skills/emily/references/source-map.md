# Corpus source map

## Rights boundary

This bundle contains only original U.S. publications from 1930 or earlier. The U.S. Copyright Office states that works published in the United States before 1931 are in the U.S. public domain because their terms have expired: https://copyright.gov/what-is-copyright/ . Duke Law confirms that 1930 works entered the U.S. public domain on 2026-01-01: https://web.law.duke.edu/cspd/publicdomainday/2026/ .

Public-domain status is jurisdiction-specific. Emily Post died in 1960, so some life-plus-70 jurisdictions may protect her writing through the end of 2030. This full-text bundle is intended for U.S. distribution and for redistribution only where lawful; remove its full texts and text-bearing index where the works remain protected. See [../LICENSE.md](../LICENSE.md). The bundled corpus and advice are not legal advice.

This independent skill is not affiliated with, endorsed by, or produced by the Emily Post Institute. “Emily Post” identifies the historical author and source tradition; do not use Institute logos or imply institutional identity.

## Included sources

| ID | Work | Year | Corpus role | Stable source | Upstream SHA-256 |
|---|---|---:|---|---|---|
| `etiquette-1922` | *Etiquette: In Society, in Business, in Politics and at Home* | 1922 | `primary-advice` | https://www.gutenberg.org/ebooks/14314 | `e8a6668eafc4177158621a205c34f22db6d509508195aca74e65157a1911ccc3` |
| `personality-house-1930` | *The Personality of a House* | 1930 | `adjacent-advice` | https://archive.org/details/personalityofhou0000post | `bd567f5c6af97d5f4166237833d68a3f43e16c4da8d7ba39774ffcd5ea483fab` |
| `by-motor-1916` | *By Motor to the Golden Gate* | 1916 | `style-only` nonfiction | https://www.gutenberg.org/ebooks/73784 | `6aad6ca9908b5a2a71f99eec539e24568f724b1f955124ff45d602ee616b3649` |
| `title-market-1909` | *The Title Market* | 1909 | `style-only` fiction | https://www.gutenberg.org/ebooks/17680 | `23d23539bd8a697ebaf31d497216e7a6ed3623c1e677d884c787cd55db8742b0` |

The build script downloads the exact pinned source, verifies this hash, removes repository boilerplate, and bundles normalized public-domain text plus a generated provenance manifest. It stops both advice books before their indexes, the 1930 scan before publisher advertisements, and the 1909 Gutenberg text before transcriber notes, so those other-authored materials cannot be attributed to Post. Project Gutenberg landing pages are the permanent citations; its terms and license are at https://www.gutenberg.org/policy/terms_of_use.html and https://www.gutenberg.org/policy/license.html .

The 1930 Internet Archive source is uncorrected OCR and contains recognition errors. It is useful for discovery and paraphrase, but it is not quote-safe on its own. Verify any exact quotation against the page image in the linked scan and decline to present uncertain OCR as verbatim text.

## Authorship caveat

Richard Duffy—not Emily Post—wrote the “Manners and Morals” introduction printed in the 1922 book. The builder deliberately begins at Chapter I so the introduction cannot be retrieved or attributed to Post.

## Excluded sources

- Later editions of *Etiquette*, including the 2022 Centennial Edition by Lizzie Post and Daniel Post Senning
- Post-1930 columns, radio scripts, books, podcasts, transcripts, and Institute pages as full text
- *How to Behave—Though a Débutante* (1928) until a stable library full-text source is verified
- The duplicated 1923 *Etiquette* edition from default retrieval; it may be useful later for edition-change research
- Other novels whose OCR would add more retrieval noise than useful style signal

Modern Institute pages appear only as original summaries and links in `modern-bridge.md`. Never present those summaries as Emily Post quotations.

## Generated provenance

`corpus/manifest.json` records retrieval time, source and cleaned hashes, byte/word counts, chunk counts, authorship boundaries, and build parameters. `corpus/chunks.jsonl` is the search index. Its modernity labels are chapter-level triage defaults, not passage-level judgments. `corpus/text/` contains normalized, header- and back-matter-free public-domain text for direct inspection.
