import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./_core/env", () => ({
  ENV: {
    frontendForgeApiUrl: "https://forge.example.test/",
    frontendForgeApiKey: "frontend-key",
  },
}));

const { buildMapsSdkUrl, registerMapsSdkProxy, resolveMapsConfig } = await import("./_core/mapsSdkProxy");

type RouteHandler = (req: unknown, res: {
  status: (code: number) => any;
  type: (value: string) => any;
  set: (name: string, value: string) => any;
  send: (body: unknown) => any;
}) => Promise<void>;

function createResponse() {
  const response = {
    statusCode: 0,
    headers: new Map<string, string>(),
    body: undefined as unknown,
    status(code: number) {
      response.statusCode = code;
      return response;
    },
    type(value: string) {
      response.headers.set("Content-Type", value);
      return response;
    },
    set(name: string, value: string) {
      response.headers.set(name, value);
      return response;
    },
    send(body: unknown) {
      response.body = body;
      return response;
    },
  };
  return response;
}

describe("Maps SDK proxy", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("builds the SDK URL with the required Maps libraries", () => {
    const url = buildMapsSdkUrl("https://forge.example.test/", "frontend-key");

    expect(url.toString()).toBe(
      "https://forge.example.test/v1/maps/proxy/maps/api/js?key=frontend-key&v=weekly&libraries=marker%2Cplaces%2Cgeocoding%2Cgeometry&loading=async",
    );
  });

  it("falls back to server-side Forge configuration for custom deployments", () => {
    expect(resolveMapsConfig({
      frontendForgeApiUrl: "",
      frontendForgeApiKey: "",
      forgeApiUrl: "https://server-forge.example.test/",
      forgeApiKey: "server-key",
    })).toEqual({
      baseUrl: "https://server-forge.example.test/",
      apiKey: "server-key",
    });
  });

  it("relays the SDK through the allowed project origin", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
      new Response("window.google = window.google || {};", {
        status: 200,
        headers: { "content-type": "text/javascript; charset=UTF-8" },
      }),
    ));

    let handler: RouteHandler | undefined;
    registerMapsSdkProxy({
      get(_path: string, route: RouteHandler) {
        handler = route;
      },
    } as never);

    const response = createResponse();
    await handler?.({}, response);

    expect(response.statusCode).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("text/javascript; charset=UTF-8");
    expect(response.body).toContain("window.google");
    expect(fetch).toHaveBeenCalledWith(
      expect.objectContaining({
        href: "https://forge.example.test/v1/maps/proxy/maps/api/js?key=frontend-key&v=weekly&libraries=marker%2Cplaces%2Cgeocoding%2Cgeometry&loading=async",
      }),
      { headers: { Origin: "https://activemedic-rcveslat.manus.space" } },
    );
  });
});
