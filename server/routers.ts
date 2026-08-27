import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { ENV } from "./_core/env";
import { systemRouter } from "./_core/systemRouter";
import { invokeLLM } from "./_core/llm";
import { assistantKnowledge } from "./assistantKnowledge";
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
  const payload = (await response.json().catch(() => null)) as { ok?: boolean; description?: string } | null;
  if (!response.ok || payload?.ok === false) {
    throw new Error(`Telegram delivery failed with ${response.status}${payload?.description ? `: ${payload.description}` : ""}`);
  }
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
  const payload = (await response.json().catch(() => null)) as { message?: string; error?: { message?: string } } | null;
  if (!response.ok) {
    const description = payload?.message || payload?.error?.message;
    throw new Error(`Email delivery failed with ${response.status}${description ? `: ${description}` : ""}`);
  }
}

async function deliverLead(input: z.infer<typeof leadInput>) {
  const results = await Promise.allSettled([sendTelegramLead(input), sendEmailLead(input)]);
  const [telegramResult, emailResult] = results;
  const telegram = telegramResult?.status === "fulfilled";
  const email = emailResult?.status === "fulfilled";

  if (!telegram && telegramResult?.status === "rejected") {
    console.error("[Lead] Telegram delivery failed", telegramResult.reason);
  }
  if (!email && emailResult?.status === "rejected") {
    console.error("[Lead] Email delivery failed", emailResult.reason);
  }
  if (!telegram && !email) {
    throw new Error("Lead delivery failed through all configured channels");
  }
  return { telegram, email } as const;
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
      const delivery = await deliverLead(input);
      return { success: true, delivery } as const;
    }),
  }),
  assistant: router({
    ask: publicProcedure.input(z.object({
      message: z.string().trim().min(2).max(600),
      history: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().trim().min(1).max(1200) })).max(8).default([]),
    })).mutation(async ({ input }) => {
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `Ти — спокійний навігатор стоматології Active Medical у Миколаєві. Відповідай українською, коротко й доброзичливо. Допомагай зорієнтуватися в послугах, сторінках сайту, підготовці до візиту та записі. Не став діагнозів, не визначай терміновість як лікар, не призначай ліків і не обіцяй результатів. Якщо користувач описує сильний біль, набряк, кровотечу, травму або інший гострий стан — порадь звернутися до стоматолога/невідкладної допомоги та запропонуй записатися в клініку. Завжди нагадуй, що відповідь загальна і не замінює огляд лікаря. Не вигадуй ціни, графік, адреси чи факти про клініку; для запису направляй до форми або телефону +38 (0512) 777-888.\n\nЗатверджений контекст сайту:\n${assistantKnowledge}` ,
          },
          ...input.history,
          { role: "user" as const, content: input.message },
        ],
      });
      const content = response.choices[0]?.message?.content;
      const text = typeof content === "string" ? content : "Будь ласка, зверніться до адміністратора Active Medical для уточнення цього питання.";
      return { text } as const;
    }),
  }),
});

export type AppRouter = typeof appRouter;
