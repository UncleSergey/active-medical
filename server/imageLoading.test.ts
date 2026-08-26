import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const homeSourcePath = new URL("../client/src/pages/Home.tsx", import.meta.url);
const doctorSourcePath = new URL("../client/src/pages/DoctorPage.tsx", import.meta.url);

describe("image loading strategy", () => {
  it("prioritizes the hero image without eagerly loading secondary photos", async () => {
    const source = await readFile(homeSourcePath, "utf8");

    expect(source).toMatch(
      /className="hero-reference-image"[\s\S]*loading="eager"[\s\S]*fetchPriority="high"[\s\S]*decoding="async"/,
    );
    expect(source).toMatch(
      /src=\{teamImage\}[\s\S]*loading="lazy"[\s\S]*decoding="async"/,
    );
    expect(source).toMatch(
      /src=\{doctorPortraits\[index\]\}[\s\S]*loading="lazy"[\s\S]*decoding="async"/,
    );
  });

  it("keeps doctor-page hero portraits prioritized while decoding asynchronously", async () => {
    const source = await readFile(doctorSourcePath, "utf8");

    expect(source).toMatch(
      /src=\{doctor\.image\}[\s\S]*loading="eager"[\s\S]*fetchPriority="high"[\s\S]*decoding="async"/,
    );
  });

  it("keeps below-the-fold galleries lazy", async () => {
    const source = await readFile(homeSourcePath, "utf8");
    const lazyImages = source.match(/loading="lazy"/g) ?? [];

    expect(lazyImages.length).toBeGreaterThanOrEqual(10);
    expect(source).toMatch(/src=\{markoRossoCaseImage\}[\s\S]*loading="lazy"/);
    expect(source).toMatch(/src=\{case1BeforeImage\}[\s\S]*loading="lazy"/);
    expect(source).toMatch(/src=\{case2AfterImage\}[\s\S]*loading="lazy"/);
  });
});
