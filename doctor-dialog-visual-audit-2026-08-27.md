# Doctor dialog visual audit — 2026-08-27

## Scope

The current dev preview was checked after replacing doctor-card navigation with the inline accessible dialog and after switching Alina Mezinova's portrait reference to the natural-gaze asset.

## Desktop — 1280×900

The first viewport renders the Active Medical white clinical header, real logo, red consultation CTA, supplied hero artwork, and the single visible branded CTA pair without a doubled green button. The hero remains within the current layout and the new doctor-card button reset does not affect the first viewport.

## Mobile — 390×844

The mobile header collapses to the real logo plus menu button. The hero, red CTA, secondary text action, marquee, and first content section render without visible horizontal overflow in the captured viewport. The CSS keeps doctor dialog content bounded to the viewport and scrollable on small screens.

## Automated checks

`pnpm vitest run server/dentalArchitecture.test.ts` passed 4/4. `pnpm check` passed with TypeScript 0 errors. The regression suite now verifies the natural-gaze portrait asset, `aria-haspopup="dialog"`, the `selectedDoctor` state, Dialog rendering, absence of the old `/likari/...` card link, and dialog/button CSS hooks.

## Remaining QA before checkpoint

Use the live preview interaction path to click a doctor card, confirm the dialog opens with the matching real name/role/detail and portrait, confirm Escape closes it and focus returns to the triggering card, and confirm the booking CTA closes the dialog and scrolls to `#booking`. Then read the session todo and save a checkpoint.

## Interactive click — first doctor

In the preview, the first doctor card is a real `button` and opens the dialog in place. The dialog rendered the expected `01 / КОМАНДА ACTIVE MEDICAL` kicker, `Мезінова Аліна Віталіївна`, role `Лікар-стоматолог`, the natural-gaze portrait, the existing factual detail, and the red booking CTA. The URL stayed on `/#team`; no empty `/likari/...` page was opened. The overlay close button was present and the page remained visible behind the dialog.

## Escape/focus QA finding

Escape successfully closed the dialog and returned the page to the team section. A direct `document.activeElement` check after close reported `BODY`, not the triggering doctor card. Because the dialog is controlled and does not use a built-in DialogTrigger, explicit trigger ref restoration is required before publication. This is a follow-up fix, not a release-blocking data issue.

## Escape after focus-fix

After reopening the first card and pressing Escape, the Dialog closed and the team section remained in place. The next check reads `document.activeElement` after the scheduled focus restoration; the implementation now stores the triggering button per real doctor name and calls `.focus()` in `requestAnimationFrame` after closing.

## Focus restoration result

The post-Escape `document.activeElement` check passed: it returned a `BUTTON` with class `doctor-carousel-card`, containing `01 Мезінова Аліна Віталіївна Лікар-стоматолог`. The Dialog can be reopened from that same card, preserving keyboard continuity.

## Booking CTA result

Clicking the red booking CTA inside the doctor Dialog closed the overlay, kept the URL at `#team` (the page-level route did not change), scrolled the existing `#booking` section to the viewport top, and focused the real `name` input with placeholder `Як до вас звертатися?`. The first console probe used TypeScript-only syntax and was rejected; the equivalent plain JavaScript probe then passed with `bookingTop: 0` and `activeTag: INPUT`.

## Fresh mount after MapView guard

After a full navigation reload, the page rendered the doctor carousel with the four real cards and Alina as card 01. The map rendered native Google Maps controls in the preview. No Dialog or route dead-end appeared during the fresh mount. A fresh console tail check remains the final runtime verification before checkpoint.

## Final responsive captures

The final desktop capture at 1280×900 keeps the single red hero CTA, real logo, clinical white header, and the current Active Medical composition intact. The final mobile capture at 390×844 keeps the logo/menu, hero CTA pair, marquee, and first section readable with no visible horizontal overflow. The interactive desktop checks above cover Dialog open, Escape focus restoration, and booking CTA focus/scroll behavior.

## Runtime note

After the MapView constructor guard, a fresh browser console tail returned no output, while a fresh mount still showed native Google Maps controls. The known full-suite exceptions remain the two pre-existing Telegram credential checks returning HTTP 401; all target tests, TypeScript, and production build pass.
