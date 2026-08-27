import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const mapSourcePath = new URL("../client/src/components/Map.tsx", import.meta.url);
const homeSourcePath = new URL("../client/src/pages/Home.tsx", import.meta.url);

describe("MapView fallback", () => {
  it("renders a keyless OpenStreetMap fallback and hides it only after Google is ready", async () => {
    const source = await readFile(mapSourcePath, "utf8");

    expect(source).toContain("https://www.openstreetmap.org/export/embed.html");
    expect(source).toContain('typeof window.google?.maps?.Map === "function"');
    expect(source).toContain('const MAPS_SCRIPT_SELECTOR = \'script[data-active-medical-maps-sdk="true"]\'');
    expect(source).toContain('document.querySelector<HTMLScriptElement>(MAPS_SCRIPT_SELECTOR)');
    expect(source).toContain("existing.dataset.mapsState");
    expect(source).toContain('script.dataset.mapsState = "loading"');
    expect(source).toContain('typeof maps.Map !== "function"');
    expect(source).toMatch(/className=\{cn\("map-embed-fallback", mapReady && "map-embed-fallback-hidden"\)\}/);
    expect(source).toMatch(/loading="lazy"/);
  });

  it("centers the clinic map on the confirmed Lazurna 5/10 coordinates", async () => {
    const source = await readFile(homeSourcePath, "utf8");

    expect(source).toContain("initialCenter={{ lat: 46.94455, lng: 31.93783 }}");
    expect(source).toContain("вулиця Лазурна, 5, корпус 10/1, Миколаїв, Україна");
  });
});
