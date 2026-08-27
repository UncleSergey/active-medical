import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";

const port = 9224;
const url = "https://www.active-medical.pp.ua/?hero-fix=e123f589";
const viewports = [
  { name: "desktop", width: 1280, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const chromium = spawn("chromium", [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  "--enable-unsafe-swiftshader",
  `--remote-debugging-port=${port}`,
  "--window-size=1280,900",
  "--hide-scrollbars",
  "--user-data-dir=/tmp/active-medical-hero-geometry-audit",
  "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let debugTarget;
for (let attempt = 0; attempt < 40; attempt += 1) {
  try {
    const response = await fetch(`http://127.0.0.1:${port}/json/list`);
    const targets = await response.json();
    debugTarget = targets.find((target) => target.type === "page" && target.webSocketDebuggerUrl);
    if (debugTarget) break;
  } catch {
    // Chromium is still starting.
  }
  await sleep(250);
}

if (!debugTarget) {
  chromium.kill("SIGTERM");
  throw new Error("Could not connect to Chromium DevTools target");
}

const socket = new WebSocket(debugTarget.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let nextId = 1;
const pending = new Map();
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  const resolver = pending.get(message.id);
  if (!resolver) return;
  pending.delete(message.id);
  resolver(message);
});

const call = (method, params = {}) => new Promise((resolve, reject) => {
  const id = nextId;
  nextId += 1;
  pending.set(id, (message) => {
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  });
  socket.send(JSON.stringify({ id, method, params }));
});

const evaluate = (expression) => new Promise((resolve, reject) => {
  const id = nextId;
  nextId += 1;
  pending.set(id, (message) => {
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result?.result?.value);
  });
  socket.send(JSON.stringify({
    id,
    method: "Runtime.evaluate",
    params: { expression, returnByValue: true, awaitPromise: true },
  }));
});

await call("Page.enable");

const results = [];
for (const viewport of viewports) {
  await call("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.name === "mobile",
    screenWidth: viewport.width,
    screenHeight: viewport.height,
  });
  await call("Page.navigate", { url: `${url}&auditViewport=${viewport.name}` });
  await sleep(7000);
  const result = await evaluate(`(async () => {
    await document.fonts.ready;
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const hero = document.querySelector(".hero-reference");
    const image = document.querySelector(".hero-reference-image");
    const hotspots = document.querySelector(".hero-reference-hotspots");
    const primary = document.querySelector(".hero-hotspot-primary");
    const secondary = document.querySelector(".hero-hotspot-secondary");
    const rect = (element) => {
      if (!element) return null;
      const box = element.getBoundingClientRect();
      return { left: box.left, top: box.top, right: box.right, bottom: box.bottom, width: box.width, height: box.height };
    };
    const heroRect = rect(hero);
    const imageRect = rect(image);
    const hotspotRect = rect(hotspots);
    const primaryRect = rect(primary);
    const secondaryRect = rect(secondary);
    const pseudo = hotspots ? getComputedStyle(hotspots, "::before") : null;
    const parse = (value) => Number.parseFloat(value || "0");
    const maskRect = pseudo && hotspotRect ? {
      left: hotspotRect.left + parse(pseudo.left),
      top: hotspotRect.top + parse(pseudo.top),
      right: hotspotRect.left + parse(pseudo.left) + parse(pseudo.width),
      bottom: hotspotRect.top + parse(pseudo.top) + parse(pseudo.height),
      width: parse(pseudo.width),
      height: parse(pseudo.height),
    } : null;
    const contains = (outer, inner) => Boolean(outer && inner && inner.left >= outer.left - 1 && inner.top >= outer.top - 1 && inner.right <= outer.right + 1 && inner.bottom <= outer.bottom + 1);
    const expectedRatio = 1536 / 924;
    const naturalRatio = image?.naturalWidth && image?.naturalHeight ? image.naturalWidth / image.naturalHeight : null;
    const measuredRatio = heroRect?.width && heroRect?.height ? heroRect.width / heroRect.height : null;
    return {
      viewport: { requestedWidth: ${viewport.width}, requestedHeight: ${viewport.height}, measuredWidth: window.innerWidth, measuredHeight: window.innerHeight },
      document: { scrollWidth: document.documentElement.scrollWidth, overflowX: document.documentElement.scrollWidth > window.innerWidth },
      asset: { src: image?.getAttribute("src") ?? null, naturalWidth: image?.naturalWidth ?? null, naturalHeight: image?.naturalHeight ?? null, expectedRatio, naturalRatio, measuredHeroRatio: measuredRatio },
      counts: { primary: document.querySelectorAll(".hero-hotspot-primary").length, secondary: document.querySelectorAll(".hero-hotspot-secondary").length },
      rects: { hero: heroRect, image: imageRect, hotspots: hotspotRect, mask: maskRect, primary: primaryRect, secondary: secondaryRect },
      computed: { heroAspectRatio: getComputedStyle(hero).aspectRatio, heroMinHeight: getComputedStyle(hero).minHeight, imageHeight: getComputedStyle(image).height, maskBackground: pseudo?.backgroundColor ?? null },
      assertions: {
        heroMatchesArtworkRatio: Boolean(measuredRatio && Math.abs(expectedRatio - measuredRatio) < 0.01),
        maskInsideImage: contains(imageRect, maskRect),
        primaryInsideImage: contains(imageRect, primaryRect),
        secondaryInsideImage: contains(imageRect, secondaryRect),
        oneAccessiblePrimary: document.querySelectorAll(".hero-hotspot-primary").length === 1,
        oneAccessibleSecondary: document.querySelectorAll(".hero-hotspot-secondary").length === 1,
        noHorizontalOverflow: document.documentElement.scrollWidth <= window.innerWidth,
      },
    };
  })()`);
  results.push({ name: viewport.name, ...result });
}

const pass = results.every(({ assertions }) => Object.values(assertions).every(Boolean));
const report = `# Live hero geometry audit — 2026-08-27\n\nURL: ${url}\n\nOverall result: **${pass ? "PASS" : "FAIL"}**\n\n\\\`json\n${JSON.stringify({ pass, results }, null, 2)}\n\\\`\n`;
await writeFile("/home/ubuntu/active-medical/live-hero-geometry-audit.md", report);
console.log(report);
socket.close();
chromium.kill("SIGTERM");
if (!pass) process.exitCode = 1;
