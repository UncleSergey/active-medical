import type { Express, Request, Response } from "express";
import { notifyOwner } from "./_core/notification";
import { sdk } from "./_core/sdk";

export const STORAGE_ASSET_ORIGIN = "https://active-medical.pp.ua";

export const STORAGE_ASSET_KEYS = [
  "active-medical-hero-reference-body_fda89e6a.png",
  "active-medical-interior_10802c60.jpg",
  "active-medical-team-realistic-proportions_23ae09e7.png",
  "alina-mezinova-color-scrubs-new_22ddf932.png",
  "yuliia-standing-option-balanced-head_4c568e66.png",
  "pohulych-yaroslav-color-scrubs-new_e4e3f887.png",
  "fedorov-ivan-light-gray-scrubs_b178ecf8.png",
  "active-medical-official-logo_c0e6b7c3.png",
  "active-medical-instagram-qr_102f54b1.png",
  "active-medical-marko-rosso-before-after_7073d9f2.png",
  "active-medical-case1-before_c2a0444e.webp",
  "active-medical-case1-after_23d01b9d.webp",
  "active-medical-case2-before_5ca610e9.webp",
  "active-medical-case2-after_f7eb8c92.webp",
  "kids-clean-clinical-01_42ec865a.png",
  "kids-pediatric-care-photo_98070c4a.jpg",
  "kids-caries-stages_0a2edca0.png",
  "kids-clean-clinical-02_a82db344.png",
  "kids-clean-clinical-03_713b9081.png",
  "kids-visit-preparation_3f08866a.png",
] as const;

type StorageFetcher = typeof fetch;

export type StorageAssetCheck = {
  key: string;
  url: string;
  status: number;
  contentType: string;
  ok: boolean;
  error?: string;
};

export type StorageMonitorReport = {
  checkedAt: string;
  checked: number;
  passed: number;
  failed: StorageAssetCheck[];
};

export async function checkStorageAssets(
  fetcher: StorageFetcher = fetch,
): Promise<StorageMonitorReport> {
  const results = await Promise.all(
    STORAGE_ASSET_KEYS.map(async (key): Promise<StorageAssetCheck> => {
      const url = `${STORAGE_ASSET_ORIGIN}/manus-storage/${encodeURIComponent(key)}`;
      try {
        const response = await fetcher(url, {
          method: "HEAD",
          redirect: "follow",
        });
        const contentType = response.headers.get("content-type") ?? "";
        const ok = response.ok && contentType.toLowerCase().startsWith("image/");
        return {
          key,
          url,
          status: response.status,
          contentType,
          ok,
          ...(ok ? {} : { error: response.ok ? "unexpected-content-type" : "http-error" }),
        };
      } catch (error) {
        return {
          key,
          url,
          status: 0,
          contentType: "",
          ok: false,
          error: String(error),
        };
      }
    }),
  );

  const failed = results.filter((result) => !result.ok);
  return {
    checkedAt: new Date().toISOString(),
    checked: results.length,
    passed: results.length - failed.length,
    failed,
  };
}

export function registerStorageMonitor(app: Express) {
  app.post("/api/scheduled/check-storage-assets", async (req: Request, res: Response) => {
    try {
      const user = await sdk.authenticateRequest(req);
      if (!user.isCron || !user.taskUid) {
        res.status(403).json({ error: "cron-only" });
        return;
      }

      const report = await checkStorageAssets();
      if (report.failed.length > 0) {
        const failedSummary = report.failed
          .map((asset) => `${asset.key} (${asset.status || asset.error})`)
          .join(", ");
        await notifyOwner({
          title: "Active Medical: storage asset failure",
          content: `Storage monitor found ${report.failed.length} failed asset(s) out of ${report.checked}: ${failedSummary}`,
        });
      }

      res.json({ ok: report.failed.length === 0, report });
    } catch (error) {
      res.status(500).json({
        error: String(error),
        context: { url: req.originalUrl },
        timestamp: new Date().toISOString(),
      });
    }
  });
}
