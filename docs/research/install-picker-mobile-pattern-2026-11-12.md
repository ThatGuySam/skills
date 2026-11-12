# Install Picker on Phones: Tabs or a Bottom Sheet

Research memo, 2026-11-12. Sam asked for the docs site's install box to offer six choices in one group (Prompt, npx, bunx, pnx, mise, Yarn dlx) as tabs, and asked when tabs are the wrong control on a phone and what should replace them. He suggested a bottom sheet built with the Vaul library.

## Scope

- The install box on `skills.samcarlton.com`, an Astro Starlight site whose client code is plain JavaScript with no React.
- Six short options that swap one block of text. Not navigation, and not long content.
- Evidence: platform design guidelines, Nielsen Norman Group articles, the Vaul repository and npm registry, and measurements of the site's own layout.

## Short Answer

Keep tabs where they fit and replace them below about 37rem of box width. On a phone, show one button with the current choice and open the options in a modal bottom sheet. Build the sheet on the native `<dialog>` element with Vaul's motion, not on Vaul itself.

## What the Evidence Says

| Claim | Source and what it observed | How it applies here |
| --- | --- | --- |
| Six options are too many for a phone-width segmented control. | Apple's Human Interface Guidelines: "Aim for no more than about five to seven segments in a wide interface and no more than about five segments on iPhone." Read 2026-11-12 from Apple's page data. | Six segments exceed the iPhone guidance. Measured locally: the six tabs are 350px wide. At a 375px viewport the toolbar has about 311px, and the Copy button needs 54px of that. |
| Overflowing tabs hide choices. | NN/g, "Tabs, Used Right" (2024-08-02, reviewed 2026-09-02): "The fewer tabs, the better." When tabs overflow into a carousel, "the hidden tabs become less discoverable, and the interaction cost needed to access them increases." | Rules out horizontally scrolling tabs as the phone layout: by the widths above, the last two options would start off screen. |
| Scrollable tabs exist as a pattern. | Material 3 tabs guidelines say tab contents "can be fixed or scrollable" and that scrollable tabs allow room for longer titles. Read in a browser 2026-11-12. | A credible alternative that disagrees with NN/g on cost. NN/g's objection is about discoverability, which matters more here because the runner names are unfamiliar to some readers. |
| A modal bottom sheet is the phone alternative to a menu. | Material 3 bottom sheets guidelines: "Use a modal bottom sheet as an alternative to inline menus or simple dialogs on mobile, especially when offering a long list of action items, or when items require longer descriptions and icons." | The picker is a menu of six items, and each benefits from a one-line description. |
| Sheets suit a few options and short interactions. | NN/g, "Bottom Sheets: Definition and UX Guidelines" (2023-06-11): suited to a few options or supplementary information; avoid them for lengthy content and for page-to-page flows. | Choosing one of six is a short interaction that keeps the page in view. |
| A sheet needs a visible Close control and should close on Back. | Same NN/g article: "We recommend providing a clear Close button", and it suggests supporting Back for dismissal. It also reports stacked sheets as a common problem. | The sheet has a Close button besides the grab handle, opens one level only, and closes on the platform's close requests. |
| Vaul is unmaintained and needs React. | The Vaul README, read 2026-11-12: "This repo is unmaintained. I might come back to it at some point, but not in the near future." npm: version 1.1.2, published 2024-12-14, depends on `@radix-ui/react-dialog` with `react` and `react-dom` as peers. Bundlephobia reports 18.5 kB gzipped for Vaul with Radix, before React. | The site ships no React. Adding it would load a framework on every docs page for a six-item picker. |
| A native modal dialog supplies most of what a sheet needs. | Chrome's modern web guidance (retrieved 2026-11-12): `showModal()` puts the dialog in the top layer and traps focus; modal dialogs respond to Esc and, where `closedby` is supported, the mobile back gesture; `closedby="any"` adds light dismiss with a click fallback for Safari; `overscroll-behavior: contain` on the dialog and its backdrop stops the page scrolling underneath, as a progressive enhancement. | Focus trap, Esc, back gesture, and scroll containment come from the platform. Only the motion and the drag are hand-written. |

Emil Kowalski's gesture guidance, bundled in Sam's `emil-gesture-ui` skill, says to default to Vaul for a drawer because the gesture is hard to hand-roll. That advice disagrees with the choice here. The inference that justifies departing from it: the hard cases it lists are scrollable content inside the sheet, snap points, and keyboard handling, and this sheet has none of them. It holds six buttons.

## What Works

- Tabs on wide boxes: six one-word labels fit, the choice is visible, and one click switches.
- A single button plus a modal sheet on narrow boxes. Each option gets a full-width row at least 44px tall with a one-line description.
- Vaul's motion without Vaul: one `cubic-bezier(0.32, 0.72, 0, 1)` curve over 500ms as CSS transitions, the sheet tracking the finger 1:1, backdrop opacity tied to drag progress, and dismissal on distance or speed.

## What to Avoid

- Scrolling the tab row on phones.
- A native `<select>`: it cannot show the descriptions and looks unlike the rest of the box.
- Adding React for this one control.
- Relying on the grab handle alone to close the sheet.

## Recommendation

Use a container query on the install box, not a viewport query, so the layout follows the room the box has. Above 37rem show the tab group. Below it show the button and sheet. The threshold was 30rem before each tab gained a mark, which widened the row from 350px to 484px. One selection drives both, is saved to local storage, and is written to the address for sharing.

What would change this: if the sheet later needs scrollable content, snap points, or a text field, the hand-written gesture stops being small and a maintained sheet library becomes the better choice. If the site adopts React for other reasons, Vaul's cost drops to its own 18.5 kB.

## Checks Made on the Build

Installed Chrome, 2026-11-12, at 375 by 667 with real pointer input: a 40px drag snapped back, a 260px drag dismissed, a drag that began on an option did not select it, and focus returned to the button. Not checked: a physical phone, iOS Safari, and a screen reader.

## Source Links

- [Apple HIG: Segmented controls](https://developer.apple.com/design/human-interface-guidelines/segmented-controls)
- [NN/g: Tabs, Used Right](https://www.nngroup.com/articles/tabs-used-right/) (2024-08-02, reviewed 2026-09-02)
- [NN/g: Bottom Sheets: Definition and UX Guidelines](https://www.nngroup.com/articles/bottom-sheet/) (2023-06-11)
- [Material 3: Bottom sheets guidelines](https://m3.material.io/components/bottom-sheets/guidelines)
- [Material 3: Tabs guidelines](https://m3.material.io/components/tabs/guidelines)
- [Vaul repository](https://github.com/emilkowalski/vaul)
- [Vaul on npm](https://www.npmjs.com/package/vaul) and [Bundlephobia size](https://bundlephobia.com/package/vaul)
- [GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance): guides `light-dismiss-a-dialog`, `platform-controls-dismiss-dialog`, and `prevent-page-scroll-under-modal-dialog`

## Research Receipt

- Run ID: `ipm-20261112-a`
- Skill: `sams-research`, SKILL.md SHA-256 prefix `4249735c7353`
- Category: product and interface decision
- Research date: 2026-11-12
- Source-access gaps: Material 2 pages returned no text to a static fetch, so Material 3 was read in a browser instead. Apple's page was read from its JSON data, not the rendered page. The Material quotes were matched by pattern from page text, not read in full context.
- Unresolved checks: behavior on a physical iPhone and with VoiceOver or TalkBack; whether Safari runs the exit transition as Chrome does.
