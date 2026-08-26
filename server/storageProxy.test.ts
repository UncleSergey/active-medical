import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./_core/env", () => ({
  ENV: {
    forgeApiUrl: "",
    forgeApiKey: "",
  },
}));

const { getFallbackStorageUrl, registerStorageProxy } = await import("./_core/storageProxy");

type RouteHandler = (req: { params: Record<string, string> }, res: {
  status: (code: number) => any;
  send: (body: unknown) => any;
  set: (name: string, value: string) => any;
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

describe("storage proxy", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("builds a stable fallback URL on the project's working storage host", () => {
    expect(getFallbackStorageUrl("folder/asset image.png")).toBe(
      "https://activemedic-rcveslat.manus.space/manus-storage/folder/asset%20image.png",
    );
  });

  it("serves the original asset through the custom-domain process without Forge secrets", async () => {
    const assetBytes = new Uint8Array([137, 80, 78, 71]);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
      new Response(assetBytes, {
        status: 200,
        headers: { "content-type": "image/png", "cache-control": "public, max-age=3600" },
      }),
    ));

    let handler: RouteHandler | undefined;
    registerStorageProxy({
      get(_path: string, route: RouteHandler) {
        handler = route;
      },
    } as never);

    const response = createResponse();
    await handler?.({ params: { 0: "active-medical-hero-reference-body_fda89e6a.png" } }, response);

    expect(response.statusCode).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("image/png");
    expect(Buffer.from(response.body as Buffer)).toEqual(Buffer.from(assetBytes));
    expect(fetch).toHaveBeenCalledWith(
      "https://activemedic-rcveslat.manus.space/manus-storage/active-medical-hero-reference-body_fda89e6a.png",
    );
  });
});
