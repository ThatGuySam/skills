# Custom Runner Menu Verification

Date: 2026-09-14. Replaces the native select with a styled popover menu. Recommended choices are npx, bunx, pnx; mise and Yarn dlx follow. One spelling per runner family is shown. This is a compatibility/workflow recommendation, not a measured popularity ranking.

## Checks

- Node tests pass command preservation, newline decoding and preference fallback. Saved pnpx/pnpm aliases resolve to pnx; npm exec resolves to npx.
- Chrome browser test: click opens five menuitemradio options with correct checked state. No native select remains inside the install command block.
- ArrowDown twice then Enter selected pnx, closed the menu and restored focus to its trigger. Reload retained pnx and the matching command.
- End focused Yarn; Home returned to the first item. Escape closed and restored trigger focus. Tab closed the menu and moved to Copy command. Outside click dismissed it.
- At 390 × 844, the menu flipped above the trigger and remained inside the viewport: x 99.9375, right 355.9375, top 46.9765625, bottom 464.1953125. Screenshots are adjacent to this report.
- The in-app browser was unavailable for this pass, so verification used a dedicated agent-created Chrome tab. Existing user tabs were not claimed. Firefox/Safari and full screen-reader behavior remain untested.

Implementation uses the Popover API for top-layer rendering and light dismissal, explicit menu keyboard handling, and measured positioning for browsers without CSS anchor positioning. Older browsers without Popover retain the original copyable command block. No UI framework or additional dependency was installed.
