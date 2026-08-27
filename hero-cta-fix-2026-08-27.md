# Hero CTA fix QA — 2026-08-27

## Scope

The supplied hero image remains unchanged. The static green appointment button and static “ДІЗНАТИСЯ БІЛЬШЕ” artwork are covered only in the lower-left action zone; the accessible React controls remain above the image and keep their booking/anchor behavior.

## Preview evidence

| Viewport | Result |
|---|---|
| Desktop 1280×900 | Hero shows one solid Active Medical red primary button and one red underlined secondary link. The supplied green button and its static duplicate link are not visible. There is no text overlap; the mask follows the lower-left action area and does not cover the doctor, proof badge, or hero headline. |
| Mobile 390×844 | Hero shows one red primary CTA and one secondary “ДІЗНАТИСЯ БІЛЬШЕ” link at the bottom of the image. The green artwork CTA is not visible, the actions do not overlap, the menu/logo remain intact, and the next section begins normally. |

## Implementation

The final mask override is `.hero-reference-hotspots::before` with `top: 76%`, `height: 24%`, `left: 0`, and `width: 51%`. The accessible buttons remain `.hero-hotspot-primary` and `.hero-hotspot-secondary`. The regression test `server/brandIdentity.test.ts` now asserts one occurrence of each CTA class and the presence of the static artwork mask contract.

## Verification

`pnpm vitest run server/brandIdentity.test.ts` passed 4/4. `pnpm check` passed with no TypeScript errors. The next publication smoke test must confirm the same result on `active-medical.pp.ua`; no domain or real image asset was changed.

## Final preview review

After the mask was expanded to begin at `top: 76%` and cover `height: 24%` of the hero, a content-reviewed desktop capture and a mobile capture were inspected. Both show the supplied hero artwork with the green static CTA fully covered. The only visible lower-left actions are the red React primary button and the red underlined React secondary link; neither intersects the other, the doctor portrait, or the proof badge. No further desktop/mobile mask adjustment is indicated by this QA pass.

## Live desktop smoke test after checkpoint 473e434c

A fresh 1280×900 headless Chromium capture of `https://www.active-medical.pp.ua/?hero-fix=473e434c` shows the real hero image, white branded header, one red primary appointment button and one red underlined secondary link. The original green static CTA and duplicate static link are fully covered in the live custom-domain render. The hero image, doctor portrait, proof badge and headline remain visible and undisturbed.

## Live mobile smoke test after checkpoint 473e434c

A fresh 390×844 headless Chromium capture of `https://www.active-medical.pp.ua/?hero-fix=473e434c` shows the real hero image, mobile logo/menu header, one red primary appointment button and one secondary “ДІЗНАТИСЯ БІЛЬШЕ” link. The green static CTA is not visible, the secondary text appears once, and the action row does not overlap the hero image or the following marquee/section.
