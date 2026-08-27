# Brand and current-site audit — 2026-08-27

## Official site: active-medical.ua

The official site presents Active Medical as a broad multidisciplinary medical center in Mykolaiv. Its information architecture is extensive: company information, doctors, news, gallery, Q&A, departments, reviews, adult care, diagnostics, surgery, pediatric care, and dentistry. The visible brand uses the existing red Active Medical logo in the header, a white header/navigation area, compact utility contacts and social links, a large welcome hero, a dense mega-navigation, and prominent appointment/contact actions. The official site is primarily Russian-language and medically broad rather than dentistry-only.

The official homepage communicates trust through institutional scale and proof points, including diagnostics, surgeries, doctors, and satisfied patients. It also uses large editorial sections for departments, specialists, promotions, and news. The official logo asset is available at `https://active-medical.ua/wp-content/uploads/2018/11/logo.png`.

## Current site: active-medical.pp.ua

The current site is a focused Ukrainian-language dentistry landing page. Its primary navigation is `ПРО НАС`, `ПОСЛУГИ`, `ДІТЯМ`, `АКЦІЇ`, `ДОКУМЕНТИ`, `ДО / ПІСЛЯ`, `КОМАНДА`, `КОНТАКТИ`, and `ЗАПИСАТИСЬ НА ПРИЙОМ`. It already contains real hero, team, children, before/after, doctor, document, map, and contact content. The four doctors are present in the live DOM, and the working map/asset monitoring changes are already published.

## Initial design gap to address

The current site has a more editorial, boutique dentistry presentation, while the official site is an institutional Active Medical system with a red logo-led identity, white navigation, dense service taxonomy, utility contact links, and proof-oriented content. The safest direction is not to copy the old site's code or replace real dental content; it is to align the current site’s header, brand colors, logo treatment, typography hierarchy, contact affordances, trust/proof blocks, and navigation logic with the official system while preserving the dental specialization and existing real assets.

## Domain note

The request for a domain containing `denta` should be handled as a separate naming and DNS decision. No domain should be changed until the preferred name, registrar availability, ownership, redirects, SSL, and the continued use of `active-medical.pp.ua` as a transition/redirect domain are confirmed.

## First brand iteration visual check

The updated preview now uses the official red-and-white Active Medical system for the header, logo treatment, primary appointment button, thin rules, section markers, and footer. The warm editorial mood remains through the real hero image, quiet neutral surfaces, sage/cool sections, and restrained blush accents. Desktop verification at 1280×720 shows the logo, navigation, phone block, appointment CTA, and hero composition aligned without overflow. Mobile verification at 390×844 shows the compact logo header, menu trigger, correctly scaled real hero, readable first section heading, and visible appointment affordance without horizontal overflow.

The visual refinement also restores Cormorant Garamond as the display face for major editorial statements and softens the quote/results surfaces so red functions as a deliberate brand signal rather than a dominant background.

## CTA overlay verification

Desktop and mobile preview checks confirm that the appointment CTA is now rendered in the official Active Medical red above the supplied hero artwork. On mobile at 390×844 both primary and secondary hero actions are readable, the real hero image remains visible, the logo/menu header is intact, and the first content section begins without horizontal overflow. A transient local Maps upstream 502 appeared in the dev log during the screenshot; the previously implemented OSM fallback remains the intended resilience path and is not part of the brand CSS change.

## Redesign issue register

| Observation from the audit | Action in this iteration | Status |
|---|---|---|
| Current header felt more editorial than the official institutional Active Medical header | Kept the real Active Medical logo, moved the header to a white clinical surface, strengthened navigation weight, contacts, and appointment CTA | Fixed |
| Palette was too pastel and coral was used broadly | Added official Active Medical red `#b51f32` with darker hover red, white/clinical neutral base, cool mist and sage surfaces; reserved red for key signal areas | Fixed |
| Major headings risked reading like a repeated dental marketing template | Restored Cormorant Garamond for major editorial headings, numerals and quote treatment; retained Manrope for structured utility text | Fixed |
| Cards could read as generic UI rectangles | Added consistent fine borders, low-contrast paper-like shadows, compact radii, and a shared neutral surface system | Fixed in first pass |
| Hero artwork contained a green appointment button that conflicted with the official red brand | Added a red accessible CTA overlay while preserving the original hero image and the secondary action | Fixed |
| Clinical before/after photos could dominate the calm mood | Preserved real evidence images but kept them in framed gallery tiles with white/neutral surfaces and restrained captions | Fixed in first pass |
| Official site has broader institutional proof/navigation than the dental site | Preserved the dental-first scope and real content; the current page already has services, price, doctors, documents, map, and booking sections. A future content phase can add verified parent-clinic proof blocks if the clinic supplies approved figures | Partially addressed by scope decision |
| Official and current sites use different language/content scope | Kept Ukrainian dentistry content rather than copying the Russian multidisciplinary homepage; language migration is a content decision, not a CSS change | Deliberately unchanged |
| Domain with `denta` has no confirmed candidate yet | No DNS/domain switch made; candidate names, ownership, redirects, SSL, and availability remain a separate decision | Pending |

The two full-suite Telegram credential tests still fail with HTTP 401 because the configured bot token was intentionally not rotated. This is an existing integration credential issue, unrelated to the redesign CSS and source-contract test; the Resend credential and all other previously passing tests remain unchanged.
