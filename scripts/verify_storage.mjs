const keys = [
  "active-medical-hero-reference-body_cc501cac.png",
  "active-medical-interior_58fbcb9b.jpg",
  "active-medical-team-realistic-proportions_a0b90a6e.png",
  "alina-mezinova-color-scrubs-new_5b789463.png",
  "yuliia-standing-option-balanced-head_f0170033.png",
  "pohulych-yaroslav-color-scrubs-new_fe42c9e5.png",
  "fedorov-ivan-light-gray-scrubs_a3681cf7.png",
  "active-medical-official-logo_2840a822.png",
  "active-medical-instagram-qr_16ab140c.png",
  "active-medical-marko-rosso-before-after_7bfe3b81.png",
  "active-medical-case1-before_0701fe75.webp",
  "active-medical-case1-after_efa7455a.webp",
  "active-medical-case2-before_61c1884e.webp",
  "active-medical-case2-after_4cac5683.webp",
  "kids-clean-clinical-01_bf0a66eb.png",
  "kids-pediatric-care-photo_d0e7e541.jpg",
  "kids-caries-stages_1ab96c96.png",
  "kids-clean-clinical-02_9b327ec5.png",
  "kids-clean-clinical-03_eef8c1b0.png",
  "kids-visit-preparation_dcfcc29c.png",
  "active-medical-license_0c964282.pdf",
  "active-medical-company-extract_0a229816.pdf",
  "active-medical-vat-extract_e1f5d394.webp",
];

const forgeUrl = (process.env.BUILT_IN_FORGE_API_URL ?? "").replace(/\/+$/, "");
const forgeKey = process.env.BUILT_IN_FORGE_API_KEY ?? "";
if (!forgeUrl || !forgeKey) throw new Error("Missing Forge storage configuration");

for (const key of keys) {
  const presign = new URL("v1/storage/presign/get", `${forgeUrl}/`);
  presign.searchParams.set("path", key);
  const response = await fetch(presign, { headers: { Authorization: `Bearer ${forgeKey}` } });
  let signedStatus = "n/a";
  let contentType = "";
  let body = "";
  if (response.ok) {
    const payload = await response.json();
    if (payload.url) {
      const asset = await fetch(payload.url, { method: "HEAD" });
      signedStatus = String(asset.status);
      contentType = asset.headers.get("content-type") ?? "";
    } else {
      body = "empty signed url";
    }
  } else {
    body = (await response.text()).slice(0, 160);
  }
  console.log(JSON.stringify({ key, forgeStatus: response.status, signedStatus, contentType, body }));
}
