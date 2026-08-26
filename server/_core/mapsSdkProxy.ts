import type { Express, Request, Response } from "express";
import { ENV } from "./env";

const PROJECT_ORIGIN = "https://activemedic-rcveslat.manus.space";
const MAPS_PATH = "/v1/maps/proxy/maps/api/js";
const MAP_LIBRARIES = "marker,places,geocoding,geometry";

type MapsConfigEnv = Pick<typeof ENV, "frontendForgeApiUrl" | "frontendForgeApiKey" | "forgeApiUrl" | "forgeApiKey">;

export function resolveMapsConfig(env: MapsConfigEnv) {
  return {
    baseUrl: env.frontendForgeApiUrl || env.forgeApiUrl,
    apiKey: env.frontendForgeApiKey || env.forgeApiKey,
  };
}

export function buildMapsSdkUrl(baseUrl: string, apiKey: string) {
  const url = new URL(MAPS_PATH, `${baseUrl.replace(/\/+$/, "")}/`);
  url.searchParams.set("key", apiKey);
  url.searchParams.set("v", "weekly");
  url.searchParams.set("libraries", MAP_LIBRARIES);
  url.searchParams.set("loading", "async");
  return url;
}

export function registerMapsSdkProxy(app: Express) {
  app.get("/api/maps-sdk", async (_req: Request, res: Response) => {
    const { baseUrl, apiKey } = resolveMapsConfig(ENV);
    if (!baseUrl || !apiKey) {
      res.status(503).type("text/plain").send("Maps SDK is not configured");
      return;
    }

    try {
      const upstream = await fetch(buildMapsSdkUrl(baseUrl, apiKey), {
        headers: { Origin: PROJECT_ORIGIN },
      });
      if (!upstream.ok) {
        const body = await upstream.text().catch(() => "");
        console.error(`[MapsSdkProxy] upstream error: ${upstream.status} ${body.slice(0, 200)}`);
        res.status(502).type("text/plain").send("Maps SDK backend error");
        return;
      }

      res.set("Content-Type", upstream.headers.get("content-type") ?? "text/javascript; charset=utf-8");
      res.set("Cache-Control", "public, max-age=600");
      res.status(200).send(await upstream.text());
    } catch (error) {
      console.error("[MapsSdkProxy] request failed:", error);
      res.status(502).type("text/plain").send("Maps SDK proxy error");
    }
  });
}
