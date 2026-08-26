import type { Express, Request, Response as ExpressResponse } from "express";
import { ENV } from "./env";

const FALLBACK_STORAGE_ORIGIN = "https://activemedic-rcveslat.manus.space";

function encodeStorageKey(key: string) {
  return key.split("/").map(encodeURIComponent).join("/");
}

export function getFallbackStorageUrl(key: string) {
  return `${FALLBACK_STORAGE_ORIGIN}/manus-storage/${encodeStorageKey(key)}`;
}

function sendStorageResponse(res: ExpressResponse, upstream: globalThis.Response, bytes: Buffer) {
  const contentType = upstream.headers.get("content-type");
  const cacheControl = upstream.headers.get("cache-control") ?? "public, max-age=3600";
  if (contentType) res.set("Content-Type", contentType);
  res.set("Cache-Control", cacheControl);
  res.set("Content-Length", String(bytes.byteLength));
  res.status(200).send(bytes);
}

async function proxyFallbackAsset(key: string, res: ExpressResponse) {
  const upstream = await fetch(getFallbackStorageUrl(key));
  if (!upstream.ok) {
    const body = await upstream.text().catch(() => "");
    console.error(`[StorageProxy] fallback error: ${upstream.status} ${body.slice(0, 200)}`);
    res.status(502).send("Storage backend error");
    return;
  }
  sendStorageResponse(res, upstream, Buffer.from(await upstream.arrayBuffer()));
}

export function registerStorageProxy(app: Express) {
  app.get("/manus-storage/*", async (req: Request, res: ExpressResponse) => {
    const key = (req.params as Record<string, string>)[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }

    // The custom-domain deployment may not have Manus Forge credentials. In that
    // environment, relay the same original object from the project's live storage
    // endpoint so the browser still receives it from active-medical.pp.ua.
    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      try {
        await proxyFallbackAsset(key, res);
      } catch (err) {
        console.error("[StorageProxy] fallback failed:", err);
        res.status(502).send("Storage proxy error");
      }
      return;
    }

    try {
      const forgeUrl = new URL(
        "v1/storage/presign/get",
        ENV.forgeApiUrl.replace(/\/+$/, "") + "/",
      );
      forgeUrl.searchParams.set("path", key);

      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${ENV.forgeApiKey}` },
      });

      if (!forgeResp.ok) {
        const body = await forgeResp.text().catch(() => "");
        console.error(`[StorageProxy] forge error: ${forgeResp.status} ${body}`);
        res.status(502).send("Storage backend error");
        return;
      }

      const { url } = (await forgeResp.json()) as { url: string };
      if (!url) {
        res.status(502).send("Empty signed URL from backend");
        return;
      }

      res.set("Cache-Control", "no-store");
      res.redirect(307, url);
    } catch (err) {
      console.error("[StorageProxy] failed:", err);
      res.status(502).send("Storage proxy error");
    }
  });
}
