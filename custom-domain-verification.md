# Custom domain verification

Checked `https://active-medical.pp.ua/` directly after checkpoint `e3104842` on 2026-08-26. The public page renders the current Active Medical hero, header, booking content, children section, doctors, documents, before/after content and contact section. The domain is not serving a blank page; real hero and logo images are visible.

The live HTML references the real `/manus-storage/...` assets. A prior direct resource audit showed the known image URLs returning HTTP 200. The current browser check confirms the page-level deployment is serving the current content; a resource-level DOM attribute check should be repeated after cache propagation to confirm the latest lazy-loading attributes on this host.

## Vercel domain settings — resumed session

Vercel now reports `active-medical.pp.ua` as **Valid Configuration** and keeps a 308 redirect to `www.active-medical.pp.ua`. The `www` hostname remains **Invalid Configuration** and Vercel requests the CNAME target `b6caefe85787226d.vercel-dns-017.com`. The project deployment hostname `active-medical-six.vercel.app` is **Valid Configuration**. DNS must be updated at NIC.UA for `www`; root `@` should not be changed further.

## Final Vercel verification — 2026-08-27

After Vercel DNS became valid and checkpoint `5fa5c70d` was published, `https://www.active-medical.pp.ua/` redirects with HTTP 308 to `www`, and `www` returns HTTP 200 from Vercel with built HTML and `/assets/index-BTua5fAV.js`. The live bundle contains the confirmed map coordinates `46.94455,31.93783` and the OpenStreetMap fallback. `/api/maps-sdk` returns HTTP 200 JavaScript. The full source-referenced audit found 23 storage files (20 images plus 3 documents), all returning HTTP 200 with expected image/document content types through the custom domain. Browser verification at `https://www.active-medical.pp.ua/?final=5fa5c70d#contacts` shows the real OpenStreetMap map centered at the Riviera/Lazurna area with the clinic marker; the decorative grid is not visible.

External address sources used for the coordinate confirmation:
- https://active-medical.ua/contacts/
- https://maps.visicom.ua/c/31.93783,46.94455,17/f/ADR3K7ZJTTG91822SS?lang

## Live DOM verification — 2026-08-27

Browser console inspection on `https://www.active-medical.pp.ua/?final=5fa5c70d#contacts` found the production DOM from the Vercel bundle. The hero image has `loading="eager"`, `decoding="async"`, and `fetchpriority="high"`. The team portrait, all child gallery images, before/after cases, and doctor portraits have `loading="lazy"` and `decoding="async"`. The map fallback element is present as `.map-embed-fallback` and is not hidden, matching the visible real OpenStreetMap layer in the browser screenshot; `/api/maps-sdk` is independently HTTP 200.

The live browser DOM contains an OpenStreetMap iframe with `src=https://www.openstreetmap.org/export/embed.html?bbox=31.929830000000003%2C46.93655%2C31.94583%2C46.95255&layer=mapnik&marker=46.94455%2C31.93783`, title `Карта розташування Active Medical`. This is direct DOM evidence that the visible map layer is centered around the confirmed clinic coordinate and uses the marker `46.94455,31.93783`; the previous decorative `.map-fallback` is not the visible map layer.
