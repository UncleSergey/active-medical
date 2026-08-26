import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const mapSourcePath = new URL("../client/src/components/Map.tsx", import.meta.url);

describe("MapView fallback", () => {
  it("renders a keyless OpenStreetMap fallback and hides it only after Google is ready", async () => {
    const source = await readFile(mapSourcePath, "utf8");

    expect(source).toContain("https://www.openstreetmap.org/export/embed.html");
    expect(source).toMatch(/className=\{cn\("map-embed-fallback", mapReady && "map-embed-fallback-hidden"\)\}/);
    expect(source).toMatch(/loading="lazy"/);
  });
});
