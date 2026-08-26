# Custom domain verification

Checked `https://active-medical.pp.ua/` directly on 2026-08-26. The public page title is `Стоматологія Active Medical у Миколаєві | Лікування зубів`; the rendered page includes the current hero image, team image, children gallery, doctor portraits, before/after gallery, QR code, and contact/map sections. The browser viewport rendered the hero image successfully rather than the previous blank/error state. The page HTML references the real `/manus-storage/...` assets.

The current Manus checkpoint domain remains `activemedic-rcveslat.manus.space`; the custom domain is visibly serving the same current page content, so deployment propagation is confirmed at the page level. A follow-up resource-level check should verify the lazy-loading attributes and status of each image URL directly on this host.
