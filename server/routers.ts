import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { ENV } from "./_core/env";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

const leadInput = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(40),
  service: z.string().trim().max(120),
  preferredTime: z.string().trim().max(80).optional(),
  consent: z.boolean().refine(Boolean, "Потрібна згода на обробку персональних даних"),
});

async function sendTelegramLead(input: z.infer<typeof leadInput>) {
  if (!ENV.telegramBotToken || !ENV.telegramChatId) throw new Error("Telegram delivery is not configured");
  const text = [
    "Нова заявка з сайту Active Medical",
    "",
    `Ім'я: ${input.name}`,
    `Телефон: ${input.phone}`,
    `Напрямок: ${input.service || "Не вказано"}`,
    `Бажаний час: ${input.preferredTime || "Не вказано"}`,
  ].join("\n");
  const response = await fetch(`https://api.telegram.org/bot${ENV.telegramBotToken}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: ENV.telegramChatId, text }),
  });
  if (!response.ok) throw new Error(`Telegram delivery failed with ${response.status}`);
}

async function sendEmailLead(input: z.infer<typeof leadInput>) {
  if (!ENV.resendApiKey || !ENV.leadEmailTo) throw new Error("Email delivery is not configured");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${ENV.resendApiKey}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: "Active Medical <onboarding@resend.dev>",
      to: [ENV.leadEmailTo],
      subject: `Нова заявка з сайту: ${input.name}`,
      text: [
        "Нова заявка з сайту Active Medical",
        "",
        `Ім'я: ${input.name}`,
        `Телефон: ${input.phone}`,
        `Напрямок: ${input.service || "Не вказано"}`,
        `Бажаний час: ${input.preferredTime || "Не вказано"}`,
      ].join("\n"),
    }),
  });
  if (!response.ok) throw new Error(`Email delivery failed with ${response.status}`);
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  leads: router({
    submit: publicProcedure.input(leadInput).mutation(async ({ input }) => {
      await Promise.all([sendTelegramLead(input), sendEmailLead(input)]);
      return { success: true } as const;
    }),
  }),
});

export type AppRouter = typeof appRouter;
