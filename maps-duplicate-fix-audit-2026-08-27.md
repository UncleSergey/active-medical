# Google Maps duplicate SDK audit — 2026-08-27

## Scope

The reported issue was: “You have included the Google Maps JavaScript API multiple times on this page” on `/?from_webdev=1`.

## Findings

The project has no Google Maps script in `client/index.html` or `client/src/main.tsx`. The SDK is loaded only by `client/src/components/Map.tsx`, while the page uses the shared `MapView` component. The previous loader guarded only an in-module promise; that did not cover a module reload/HMR or a remount after the promise had settled, so a second script tag could be appended.

## Fix under verification

`Map.tsx` now uses the stable selector `script[data-active-medical-maps-sdk="true"]`, reuses an existing loading script, tracks `loading`/`ready`/`invalid` states, and only treats the SDK as ready when `google.maps.Map` is a function. The OSM iframe remains visible whenever the SDK is unavailable.

## Browser QA

A clean preview reload at `/?from_webdev=1` rendered the home page and the real map area. The browser console tail after reload returned no output, so no duplicate Maps warning was observed in this fresh run. The visible page retained the real hero, branded CTA, and doctor carousel.

## Automated QA

`server/mapFallback.test.ts` and `server/mapsSdkProxy.test.ts` pass 5/5. TypeScript passes. A production build remains the final pre-checkpoint command.
