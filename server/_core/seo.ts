import type { Request } from "express";

const CURRENT_ORIGIN = "https://activemedic-rcveslat.manus.space";
const FUTURE_ORIGIN = "https://active-dent.mk.ua";
const heroImage = "/manus-storage/active-medical-hero-reference-body_cc501cac.png";
const logoImage = "/manus-storage/active-medical-official-logo_2840a822.png";

const services: Record<string, { title: string; description: string; h1: string }> = {
  "/dityacha-stomatolohiya": { title: "Дитяча стоматологія у Миколаєві | Active Medical", description: "Дитяча стоматологія у Миколаєві: спокійний прийом, лікування молочних зубів, профілактика та ортодонтичний супровід у Active Medical.", h1: "Дитяча стоматологія у Миколаєві" },
  "/terapevtychna-stomatolohiya": { title: "Терапевтична стоматологія у Миколаєві | Active Medical", description: "Терапевтична стоматологія у Миколаєві: діагностика, лікування карієсу, відновлення зубів і зрозумілий план лікування в Active Medical.", h1: "Терапевтична стоматологія у Миколаєві" },
  "/ortodontiya": { title: "Ортодонт у Миколаєві | Брекети та ортодонтичні апарати | Active Medical", description: "Ортодонт у Миколаєві: брекети, ортодонтичні апарати, пластинки та ретенційний етап лікування в Active Medical.", h1: "Ортодонтія у Миколаєві" },
  "/implantatsiya": { title: "Імплантація зубів у Миколаєві | Active Medical", description: "Імплантація зубів у Миколаєві: консультація, планування та хірургічний етап за показаннями в Active Medical.", h1: "Імплантація зубів у Миколаєві" },
  "/protezyvannya": { title: "Протезування зубів у Миколаєві | Active Medical", description: "Протезування зубів у Миколаєві: ортопедична консультація, коронки, конструкції та відновлення функції зубів в Active Medical.", h1: "Протезування зубів у Миколаєві" },
  "/likuvannya-kanaliv": { title: "Лікування каналів зуба у Миколаєві | Ендодонтія | Active Medical", description: "Лікування каналів зуба у Миколаєві: ендодонтична допомога при пульпіті та періодонтиті в Active Medical.", h1: "Лікування каналів зуба у Миколаєві" },
  "/profesiyna-hihiyena": { title: "Професійна гігієна зубів у Миколаєві | Active Medical", description: "Професійна гігієна зубів у Миколаєві: AirFlow, ультразвук, полірування та фторування в Active Medical.", h1: "Професійна гігієна зубів у Миколаєві" },
  "/khirurhichna-stomatolohiya": { title: "Хірургічна стоматологія у Миколаєві | Active Medical", description: "Хірургічна стоматологія у Миколаєві: видалення зубів, зубів мудрості та втручання за показаннями в Active Medical.", h1: "Хірургічна стоматологія у Миколаєві" },
};

const doctors: Record<string, { title: string; description: string; h1: string }> = {
  "/likari/mezinova-alina-vitaliyivna": { title: "Мезінова Аліна Віталіївна | Дитяча стоматологія та ортодонтія | Active Medical", description: "Мезінова Аліна Віталіївна — лікар-стоматолог Active Medical у Миколаєві: дитяча стоматологія, ортодонтія та лікування дітей з особливим підходом.", h1: "Мезінова Аліна Віталіївна — дитяча стоматологія та ортодонтія" },
  "/likari/dyachenko-yuliya-andriyivna": { title: "Диченко Юлія Андріївна | Щелепно-лицевий хірург | Active Medical", description: "Диченко Юлія Андріївна — щелепно-лицевий хірург Active Medical у Миколаєві: хірургічна та реконструктивна стоматологія.", h1: "Диченко Юлія Андріївна — щелепно-лицевий хірург" },
  "/likari/pohulych-yaroslav-yevhenovych": { title: "Погулич Ярослав Євгенович | Імплантолог, хірург, ортопед | Active Medical", description: "Погулич Ярослав Євгенович — імплантолог, хірург і ортопед Active Medical у Миколаєві: імплантація та протезування.", h1: "Погулич Ярослав Євгенович — імплантолог, хірург, ортопед" },
  "/likari/fedorov-ivan-mykhaylovych": { title: "Федоров Іван Михайлович | Терапевтична стоматологія та ендодонтія | Active Medical", description: "Федоров Іван Михайлович — лікар-стоматолог Active Medical у Миколаєві: терапевтична стоматологія, ендодонтія та ортопедичне відновлення.", h1: "Федоров Іван Михайлович — терапевтична стоматологія та ендодонтія" },
};

export function originForRequest(req: Request) {
  const host = (req.get("host") ?? req.hostname ?? "").split(":")[0].toLowerCase();
  return host === "active-dent.mk.ua" ? FUTURE_ORIGIN : CURRENT_ORIGIN;
}

export function metaForPath(pathname: string) {
  return services[pathname] ?? doctors[pathname] ?? { title: "Стоматологія Active Medical у Миколаєві | Лікування зубів", description: "Стоматологія Active Medical у Миколаєві на Намиві, ЖК «Рів'єра». Лікування зубів для дорослих і дітей, імплантація, протезування, ортодонтія, хірургія та професійна гігієна.", h1: "Стоматологія Active Medical у Миколаєві" };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char] as string));
}

export function seoHtml(template: string, req: Request) {
  const rawPath = (req.originalUrl || "/").split("?")[0];
  const pathname = (rawPath.replace(/\/$/, "") || "/");
  const origin = originForRequest(req);
  const meta = metaForPath(pathname);
  const canonical = `${origin}${pathname === "/" ? "/" : pathname}`;
  const image = `${origin}${heroImage}`;
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Dentist", "@id": `${origin}/#dentist`, name: "Active Medical", url: `${origin}/`, logo: `${origin}${logoImage}`, image, description: "Стоматологічна клініка Active Medical у Миколаєві для дорослих і дітей.", telephone: ["+380512777888", "+380973201527", "+380951123195", "+380938818409"], address: { "@type": "PostalAddress", streetAddress: "вулиця Лазурна, 5, корпус 10/1", addressLocality: "Миколаїв", addressCountry: "UA" }, openingHoursSpecification: { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "18:00" }, medicalSpecialty: ["Dentistry", "PediatricDentistry", "Orthodontics"], sameAs: ["https://www.instagram.com/stomatologactive/"], areaServed: { "@type": "City", name: "Миколаїв" } },
      { "@type": "WebSite", "@id": `${origin}/#website`, url: `${origin}/`, name: "Active Medical — стоматологія в Миколаєві", inLanguage: "uk-UA", publisher: { "@id": `${origin}/#dentist` } },
      { "@type": "WebPage", "@id": `${canonical}#webpage`, url: canonical, name: meta.title, description: meta.description, isPartOf: { "@id": `${origin}/#website` }, inLanguage: "uk-UA" }
    ]
  });
  const replacements: Array<[RegExp, string]> = [
    [/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`],
    [/<meta name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(meta.description)}" />`],
    [/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonical}" />`],
    [/<meta property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapeHtml(meta.title)}" />`],
    [/<meta property="og:description"[^>]*>/i, `<meta property="og:description" content="${escapeHtml(meta.description)}" />`],
    [/<meta property="og:url"[^>]*>/i, `<meta property="og:url" content="${canonical}" />`],
    [/<meta property="og:image"[^>]*>/i, `<meta property="og:image" content="${image}" />`],
    [/<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`],
    [/<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`],
    [/<meta name="twitter:image"[^>]*>/i, `<meta name="twitter:image" content="${image}" />`],
    [/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, `<script type="application/ld+json">${jsonLd}</script>`],
    [/<div id="root">/i, `<div id="root"><h1 class="sr-only">${escapeHtml(meta.h1)}</h1>`]
  ];
  return replacements.reduce((html, [pattern, replacement]) => html.replace(pattern, replacement), template);
}

export function sitemapForOrigin(origin: string) {
  const paths = ["/", ...Object.keys(services), ...Object.keys(doctors)];
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${origin}${path}</loc><changefreq>${path === "/" ? "weekly" : "monthly"}</changefreq><priority>${path === "/" ? "1.0" : "0.9"}</priority></url>`).join("")}</urlset>`;
}

export function robotsForOrigin(origin: string) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;
}
