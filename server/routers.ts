import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { ENV } from "./_core/env";
import { systemRouter } from "./_core/systemRouter";
import { invokeLLM } from "./_core/llm";
import { assistantKnowledge } from "./assistantKnowledge";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { createAssistantKnowledgeEntry, listAssistantKnowledgeEntries, listPublishedAssistantKnowledgeEntries, updateAssistantKnowledgeEntry, updateAssistantKnowledgeStatus } from "./db";

const assistantKnowledgeInput = z.object({
  slug: z.string().trim().min(2).max(160).regex(/^[a-z0-9-]+$/),
  title: z.string().trim().min(2).max(240),
  category: z.string().trim().min(2).max(80),
  content: z.string().trim().min(10).max(12000),
  sourceUrl: z.string().trim().url().max(500).optional().or(z.literal("")),
  sourceLabel: z.string().trim().max(240).optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  sortOrder: z.number().int().min(0).max(9999).default(0),
});

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
    adminList: adminProcedure.query(() => listAssistantKnowledgeEntries()),
    adminCreate: adminProcedure.input(assistantKnowledgeInput).mutation(async ({ input, ctx }) => createAssistantKnowledgeEntry({ ...input, sourceUrl: input.sourceUrl || null, updatedBy: ctx.user.email ?? ctx.user.openId })),
    adminUpdate: adminProcedure.input(assistantKnowledgeInput.partial().extend({ id: z.number().int().positive() })).mutation(async ({ input, ctx }) => {
      const { id, ...values } = input;
      return updateAssistantKnowledgeEntry(id, { ...values, sourceUrl: values.sourceUrl || null, updatedBy: ctx.user.email ?? ctx.user.openId });
    }),
    adminSetStatus: adminProcedure.input(z.object({ id: z.number().int().positive(), status: z.enum(["draft", "published", "archived"]) })).mutation(({ input, ctx }) => updateAssistantKnowledgeStatus(input.id, input.status, ctx.user.email ?? ctx.user.openId)),
    ask: publicProcedure.input(z.object({
      message: z.string().trim().min(2).max(600),
      history: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().trim().min(1).max(1200) })).max(8).default([]),
    })).mutation(async ({ input }) => {
      const publishedEntries = await listPublishedAssistantKnowledgeEntries();
      const databaseContext = publishedEntries.map((entry) => `${entry.title} (${entry.category}): ${entry.content}${entry.sourceUrl ? ` Джерело: ${entry.sourceUrl}` : ""}`).join("\n");
      const knowledgeContext = databaseContext ? `${assistantKnowledge}\n\nДодаткові опубліковані записи з адмін-панелі:\n${databaseContext}` : assistantKnowledge;
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `Ти — спокійний навігатор стоматології Active Medical у Миколаєві. Відповідай українською, коротко й доброзичливо. Допомагай зорієнтуватися в послугах, сторінках сайту, підготовці до візиту та записі. Не став діагнозів, не визначай терміновість як лікар, не призначай ліків і не обіцяй результатів. Якщо користувач описує сильний біль, набряк, кровотечу, травму або інший гострий стан — порадь звернутися до стоматолога/невідкладної допомоги та запропонуй записатися в клініку. Завжди нагадуй, що відповідь загальна і не замінює огляд лікаря. Не вигадуй ціни, графік, адреси чи факти про клініку; для запису направляй до форми або телефону +38 (0512) 777-888.\n\nЗатверджений контекст сайту:\n${knowledgeContext}` ,
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
