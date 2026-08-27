import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

const baseUrl = "https://3000-idn21isrvpfqddcv9uagz-033a6ce6.us2.manus.computer/?doctor-fix=fresh-context";
const port = 9224;
const profile = `/tmp/active-medical-doctor-audit-${Date.now()}`;
const chromium = spawn("chromium", [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  "--window-size=1280,1100",
  `${baseUrl}#team`,
], { stdio: ["ignore", "ignore", "ignore"] });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getTarget() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`);
      const targets = await response.json();
      const page = targets.find((target) => target.type === "page" && target.webSocketDebuggerUrl);
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error("Chrome DevTools target was not available");
}

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(wsUrl);
    const pending = new Map();
    let id = 0;
    socket.addEventListener("open", () => resolve({
      socket,
      command(method, params = {}) {
        return new Promise((commandResolve, commandReject) => {
          const commandId = ++id;
          pending.set(commandId, { commandResolve, commandReject });
          socket.send(JSON.stringify({ id: commandId, method, params }));
        });
      },
    }));
    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (!message.id || !pending.has(message.id)) return;
      const { commandResolve, commandReject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) commandReject(new Error(message.error.message));
      else commandResolve(message.result);
    });
    socket.addEventListener("error", reject);
  });
}

async function main() {
  const socket = await connect(await getTarget());
  const { command } = socket;
  await command("Page.enable");
  await command("Runtime.enable");

  const scenarios = [
    { name: "desktop", width: 1280, height: 1100 },
    { name: "mobile", width: 390, height: 844 },
  ];
  const results = [];

  for (const scenario of scenarios) {
    await command("Emulation.setDeviceMetricsOverride", {
      width: scenario.width,
      height: scenario.height,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await command("Page.navigate", { url: `${baseUrl}&viewport=${scenario.name}#team` });
    await sleep(1800);
    const evaluation = await command("Runtime.evaluate", {
      expression: `(() => {
        const track = document.querySelector('.doctor-carousel-track');
        const cards = [...document.querySelectorAll('.doctor-carousel-card')];
        const bounds = track?.getBoundingClientRect();
        const visible = cards.filter((card) => {
          const rect = card.getBoundingClientRect();
          return bounds && rect.right > bounds.left && rect.left < bounds.right;
        });
        return {
          viewport: [window.innerWidth, window.innerHeight],
          scrollLeft: track?.scrollLeft ?? null,
          scrollWidth: track?.scrollWidth ?? null,
          clientWidth: track?.clientWidth ?? null,
          firstDomCard: cards[0]?.innerText?.split('\\n').slice(0, 3).join(' / ') ?? null,
          visibleCards: visible.map((card) => card.innerText.split('\\n').slice(0, 3).join(' / ')),
          teamFound: Boolean(track),
        };
      })()`,
      returnByValue: true,
      awaitPromise: true,
    });
    results.push({ name: scenario.name, initial: evaluation.result.value });
  }

  const report = [
    "# Fresh doctor carousel start audit",
    "",
    `Date: ${new Date().toISOString()}`,
    `URL: ${baseUrl}#team` ,
    "",
    ...results.map(({ name, initial }) => [
      `## ${name}`,
      "",
      `- viewport: ${initial.viewport.join("×")}`,
      `- team found: ${initial.teamFound}`,
      `- initial scrollLeft: ${initial.scrollLeft}`,
      `- scrollWidth/clientWidth: ${initial.scrollWidth}/${initial.clientWidth}`,
      `- first DOM card: ${initial.firstDomCard}`,
      `- visible cards: ${initial.visibleCards.join(" | ")}`,
      `- PASS: ${initial.teamFound && initial.scrollLeft === 0 && initial.firstDomCard?.startsWith("01 / Мезінова") && initial.visibleCards.some((card) => card.startsWith("01 / Мезінова"))}`,
      "",
    ].join("\\n")),
  ].join("\\n");
  writeFileSync("fresh-doctor-start-audit.md", report);
  console.log(report);
  socket.socket.close();
  chromium.kill("SIGTERM");
}

main().catch((error) => {
  console.error(error);
  chromium.kill("SIGTERM");
  process.exitCode = 1;
});
