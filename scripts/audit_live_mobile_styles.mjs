import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";

const port = 9223;
const url = "https://www.active-medical.pp.ua/?brand-audit=3815bf4f";
const chromium = spawn("chromium", [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  "--enable-unsafe-swiftshader",
  `--remote-debugging-port=${port}`,
  "--window-size=390,844",
  "--hide-scrollbars",
  "--user-data-dir=/tmp/active-medical-mobile-audit",
  url,
], { stdio: "ignore" });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let debugTarget;
for (let attempt = 0; attempt < 30; attempt += 1) {
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
  socket.send(JSON.stringify({ id, method: "Runtime.evaluate", params: { expression, returnByValue: true, awaitPromise: true } }));
});

await call("Page.enable");
await call("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true, screenWidth: 390, screenHeight: 844 });
await call("Page.navigate", { url });
await sleep(7000);
const result = await evaluate(`(() => {
  const pick = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return null;
    const s = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return {
      selector,
      exists: true,
      background: s.backgroundColor,
      color: s.color,
      fontFamily: s.fontFamily,
      fontSize: s.fontSize,
      display: s.display,
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      left: Math.round(rect.left),
      top: Math.round(rect.top),
    };
  };
  return {
    viewport: { width: window.innerWidth, height: window.innerHeight },
    documentWidth: document.documentElement.scrollWidth,
    horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
    logoSrc: document.querySelector('.brand-mark')?.getAttribute('src') ?? null,
    heroSrc: document.querySelector('.hero-reference-image')?.getAttribute('src') ?? null,
    lazyImageCount: document.querySelectorAll('img[loading="lazy"]').length,
    primaryActionText: document.querySelector('.hero-hotspot-primary')?.textContent?.trim() ?? null,
    elements: [pick('.topbar'), pick('.brand-mark'), pick('.menu-toggle'), pick('.hero-reference'), pick('.hero-hotspot-primary'), pick('.hero-hotspot-secondary'), pick('.about-section')],
  };
})()`);

const report = `# Live mobile computed-style audit\n\nURL: ${url}\nViewport: 390×844 requested; measured viewport: ${result.viewport.width}×${result.viewport.height}\n\n\`json\n${JSON.stringify(result, null, 2)}\n\`\n`;
await writeFile("/home/ubuntu/active-medical/live-mobile-style-audit.md", report);
console.log(report);
socket.close();
chromium.kill("SIGTERM");
