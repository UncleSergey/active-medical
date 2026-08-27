import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const router = readFileSync("server/routers.ts", "utf8");
const knowledge = readFileSync("server/assistantKnowledge.ts", "utf8");
const component = readFileSync("client/src/components/CalmAssistant.tsx", "utf8");
const css = readFileSync("client/src/index.css", "utf8");

describe("Active Medical calm assistant", () => {
  it("keeps the LLM call server-side with medical guardrails", () => {
    expect(router).toContain('assistant: router({');
    expect(router).toContain("invokeLLM");
    expect(router).toContain("Не став діагнозів");
    expect(router).toContain("не замінює огляд лікаря");
    expect(router).toContain("max(600)");
    expect(router).toContain("max(8)");
    expect(router).toContain("+38 (0512) 777-888");
    expect(router).toContain("assistantKnowledge");
    expect(knowledge).toContain("Лазурна, 5");
    expect(knowledge).toContain("Мезінова Аліна Віталіївна");
    expect(knowledge).toContain("/statti");
    expect(knowledge).toContain("Не вигадуй ціни");
  });

  it("provides accessible UI states and does not fabricate social proof", () => {
    expect(component).toContain('aria-label="AI-помічник Active Medical"');
    expect(component).toContain('aria-live="polite"');
    expect(component).toContain("askMutation.isPending");
    expect(component).toContain("askMutation.isError");
    expect(component).toContain("не діагноз і не заміна консультації лікаря");
    expect(css).toContain(".calm-assistant-panel");
    expect(css).toContain(".calm-assistant-trigger");
  });
});
