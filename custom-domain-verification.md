# Custom domain verification

Checked `https://active-medical.pp.ua/` directly after checkpoint `e3104842` on 2026-08-26. The public page renders the current Active Medical hero, header, booking content, children section, doctors, documents, before/after content and contact section. The domain is not serving a blank page; real hero and logo images are visible.

The live HTML references the real `/manus-storage/...` assets. A prior direct resource audit showed the known image URLs returning HTTP 200. The current browser check confirms the page-level deployment is serving the current content; a resource-level DOM attribute check should be repeated after cache propagation to confirm the latest lazy-loading attributes on this host.
