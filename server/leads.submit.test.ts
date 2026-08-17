import { afterEach, describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("leads.submit", () => {
  afterEach(() => vi.restoreAllMocks());

  it("sends one validated lead to Telegram and email", async () => {
    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue(new Response("{}", { status: 200 }));
    const caller = appRouter.createCaller(createContext());

    await expect(caller.leads.submit({
      name: "Олена",
      phone: "+380 97 000 00 00",
      service: "Консультація",
      preferredTime: "10:00–13:00",
      consent: true,
    })).resolves.toEqual({ success: true });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls.map(([url]) => String(url))).toEqual(expect.arrayContaining([
      expect.stringContaining("api.telegram.org/bot"),
      "https://api.resend.com/emails",
    ]));
  });

  it("rejects an invalid phone number before delivery", async () => {
    const fetchMock = vi.spyOn(global, "fetch");
    const caller = appRouter.createCaller(createContext());

    await expect(caller.leads.submit({ name: "Олена", phone: "123", service: "", consent: true })).rejects.toThrow();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("requires consent before delivery", async () => {
    const fetchMock = vi.spyOn(global, "fetch");
    const caller = appRouter.createCaller(createContext());

    await expect(caller.leads.submit({ name: "Олена", phone: "+380 97 000 00 00", service: "" })).rejects.toThrow();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
