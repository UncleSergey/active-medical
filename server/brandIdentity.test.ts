import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const css = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");
const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

describe("Active Medical brand identity contract", () => {
  it("keeps the official red and clinical neutral palette", () => {
    expect(css).toContain("--brand-red: #b51f32");
    expect(css).toContain("--brand-red-dark: #92182a");
    expect(css).toContain("--milk: #ffffff");
    expect(css).toContain("--ink: #20262b");
  });

  it("keeps the real logo asset in the header and the real hero eager", () => {
    expect(home).toContain("active-medical-official-logo_c0e6b7c3.png");
    expect(home).toContain('loading="eager" fetchPriority="high" decoding="async"');
  });

  it("preserves the dental-first navigation and official brand wording", () => {
    expect(home).toContain("Стоматологія Active Medical у Миколаєві");
    expect(home).toContain("Послуги");
    expect(home).toContain("Записатись на прийом");
  });
});
