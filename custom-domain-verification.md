# Custom domain verification

Checked `https://active-medical.pp.ua/` directly after checkpoint `e3104842` on 2026-08-26. The public page renders the current Active Medical hero, header, booking content, children section, doctors, documents, before/after content and contact section. The domain is not serving a blank page; real hero and logo images are visible.

The live HTML references the real `/manus-storage/...` assets. A prior direct resource audit showed the known image URLs returning HTTP 200. The current browser check confirms the page-level deployment is serving the current content; a resource-level DOM attribute check should be repeated after cache propagation to confirm the latest lazy-loading attributes on this host.

## Vercel domain settings — resumed session

Vercel now reports `active-medical.pp.ua` as **Valid Configuration** and keeps a 308 redirect to `www.active-medical.pp.ua`. The `www` hostname remains **Invalid Configuration** and Vercel requests the CNAME target `b6caefe85787226d.vercel-dns-017.com`. The project deployment hostname `active-medical-six.vercel.app` is **Valid Configuration**. DNS must be updated at NIC.UA for `www`; root `@` should not be changed further.
