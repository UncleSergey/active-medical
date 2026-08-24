import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("./_core/env", () => ({
  ENV: {
    telegramBotToken: "test-token",
    telegramChatId: "test-chat",
    resendApiKey: "test-resend-key",
    leadEmailTo: "test@example.com",
  },
}));

const { appRouter } = await import("./routers");

describe("leads.submit delivery fallback", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const input = {
    name: "Тестова заявка",
    phone: "+380971234567",
    service: "Консультація",
    preferredTime: "Будь-який час",
    consent: true,
  };

  const caller = () =>
    appRouter.createCaller({
      user: null,
      req: { protocol: "https", headers: {} } as never,
      res: {} as never,
    });

  it("returns success when Telegram works but email fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) => {
        if (url.includes("api.resend.com")) return new Response("bad", { status: 401 });
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
      }),
    );

    await expect(caller().leads.submit(input)).resolves.toMatchObject({
      success: true,
      delivery: { telegram: true, email: false },
    });
  });

  it("returns success when email works but Telegram fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) => {
        if (url.includes("api.telegram.org")) return new Response("bad", { status: 500 });
        return new Response(JSON.stringify({ id: "email-id" }), { status: 200 });
      }),
    );

    await expect(caller().leads.submit(input)).resolves.toMatchObject({
      success: true,
      delivery: { telegram: false, email: true },
    });
  });

  it("fails only when both channels fail", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("bad", { status: 500 })));

    await expect(caller().leads.submit(input)).rejects.toThrow("Lead delivery failed through all configured channels");
  });
});
