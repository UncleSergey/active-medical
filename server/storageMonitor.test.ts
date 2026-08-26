import { describe, expect, it, vi } from "vitest";
import { checkStorageAssets, STORAGE_ASSET_KEYS } from "./storageMonitor";

const imageResponse = (contentType = "image/png", status = 200) =>
  new Response(null, { status, headers: { "content-type": contentType } });

describe("storage asset monitor", () => {
  it("checks every known asset and accepts image responses", async () => {
    const fetcher = vi.fn().mockResolvedValue(imageResponse());

    const report = await checkStorageAssets(fetcher);

    expect(fetcher).toHaveBeenCalledTimes(STORAGE_ASSET_KEYS.length);
    expect(fetcher).toHaveBeenCalledWith(
      expect.stringContaining("/manus-storage/"),
      { method: "HEAD", redirect: "follow" },
    );
    expect(report.checked).toBe(STORAGE_ASSET_KEYS.length);
    expect(report.passed).toBe(STORAGE_ASSET_KEYS.length);
    expect(report.failed).toHaveLength(0);
  });

  it("reports HTTP and content-type failures without aborting the whole check", async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce(imageResponse("image/png"))
      .mockResolvedValueOnce(imageResponse("text/html"))
      .mockResolvedValueOnce(imageResponse("image/png", 500))
      .mockResolvedValue(imageResponse("image/jpeg"));

    const report = await checkStorageAssets(fetcher);

    expect(report.checked).toBe(STORAGE_ASSET_KEYS.length);
    expect(report.passed).toBe(STORAGE_ASSET_KEYS.length - 2);
    expect(report.failed.map((asset) => asset.error)).toEqual([
      "unexpected-content-type",
      "http-error",
    ]);
  });
});
