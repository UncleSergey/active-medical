import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const assets = [
  ["active-medical-hero-reference-body_cc501cac.png", "active-medical-hero-reference-body.png"],
  ["active-medical-interior_58fbcb9b.jpg", "active-medical-interior.jpg"],
  ["active-medical-team-realistic-proportions_a0b90a6e.png", "active-medical-team-realistic-proportions.png"],
  ["alina-mezinova-color-scrubs-new_5b789463.png", "alina-mezinova-color-scrubs-new.png"],
  ["yuliia-standing-option-balanced-head_f0170033.png", "yuliia-standing-option-balanced-head.png"],
  ["pohulych-yaroslav-color-scrubs-new_fe42c9e5.png", "pohulych-yaroslav-color-scrubs-new.png"],
  ["fedorov-ivan-light-gray-scrubs_a3681cf7.png", "fedorov-ivan-light-gray-scrubs.png"],
  ["active-medical-official-logo_2840a822.png", "active-medical-official-logo.png"],
  ["active-medical-instagram-qr_16ab140c.png", "active-medical-instagram-qr.png"],
  ["active-medical-marko-rosso-before-after_7bfe3b81.png", "active-medical-marko-rosso-before-after.png"],
  ["active-medical-case1-before_0701fe75.webp", "active-medical-case1-before.webp"],
  ["active-medical-case1-after_efa7455a.webp", "active-medical-case1-after.webp"],
  ["active-medical-case2-before_61c1884e.webp", "active-medical-case2-before.webp"],
  ["active-medical-case2-after_4cac5683.webp", "active-medical-case2-after.webp"],
  ["kids-clean-clinical-01_bf0a66eb.png", "kids-clean-clinical-01.png"],
  ["kids-pediatric-care-photo_d0e7e541.jpg", "kids-pediatric-care-photo.jpg"],
  ["kids-caries-stages_1ab96c96.png", "kids-caries-stages.png"],
  ["kids-clean-clinical-02_9b327ec5.png", "kids-clean-clinical-02.png"],
  ["kids-clean-clinical-03_eef8c1b0.png", "kids-clean-clinical-03.png"],
  ["kids-visit-preparation_dcfcc29c.png", "kids-visit-preparation.png"],
  ["active-medical-license_0c964282.pdf", "active-medical-license.pdf"],
  ["active-medical-company-extract_0a229816.pdf", "active-medical-company-extract.pdf"],
  ["active-medical-vat-extract_e1f5d394.webp", "active-medical-vat-extract.webp"],
];

const forgeUrl = (process.env.BUILT_IN_FORGE_API_URL ?? "").replace(/\/+$/, "");
const forgeKey = process.env.BUILT_IN_FORGE_API_KEY ?? "";
const outputDir = "/home/ubuntu/webdev-static-assets/active-medical";
if (!forgeUrl || !forgeKey) throw new Error("Missing Forge storage configuration");
await mkdir(outputDir, { recursive: true });

for (const [key, filename] of assets) {
  const presign = new URL("v1/storage/presign/get", `${forgeUrl}/`);
  presign.searchParams.set("path", key);
  const presignResponse = await fetch(presign, { headers: { Authorization: `Bearer ${forgeKey}` } });
  if (!presignResponse.ok) throw new Error(`Presign failed for ${key}: ${presignResponse.status}`);
  const { url } = await presignResponse.json();
  if (!url) throw new Error(`Empty URL for ${key}`);
  const assetResponse = await fetch(url);
  if (!assetResponse.ok) throw new Error(`Download failed for ${key}: ${assetResponse.status}`);
  const bytes = Buffer.from(await assetResponse.arrayBuffer());
  const target = path.join(outputDir, filename);
  await writeFile(target, bytes);
  console.log(`${key}\t${bytes.length}\t${target}`);
}
