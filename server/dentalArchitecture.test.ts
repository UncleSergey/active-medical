import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const app = readFileSync("client/src/App.tsx", "utf8");
const dentalPage = readFileSync("client/src/pages/DentalLandingPage.tsx", "utf8");
const home = readFileSync("client/src/pages/Home.tsx", "utf8");
const servicePage = readFileSync("client/src/pages/ServicePage.tsx", "utf8");
const css = readFileSync("client/src/index.css", "utf8");
const articles = readFileSync("client/src/pages/ArticlesPage.tsx", "utf8");

describe("Active Medical dental architecture", () => {
  it("keeps dedicated overview and branches routes", () => {
    expect(app).toContain('path="/stomatologiya"');
    expect(app).toContain('path="/stomatolohiya"');
    expect(app).toContain('path="/viddilennia"');
  });

  it("links the overview to every existing dental service route", () => {
    expect(dentalPage).toContain("servicePages.map");
    for (const slug of [
      "dityacha-stomatolohiya",
      "terapevtychna-stomatolohiya",
      "ortodontiya",
      "implantatsiya",
      "protezyvannya",
      "likuvannya-kanaliv",
      "profesiyna-hihiyena",
      "khirurhichna-stomatolohiya",
    ]) expect(servicePage).toContain(`slug: "${slug}"`);
    expect(dentalPage).not.toMatch(/відгук|рейтинг|testimonial/i);
  });

  it("keeps the signature doctor carousel accessible and motion-aware", () => {
    expect(home).toContain("doctorTrackRef");
    expect(home).toContain("hero-hotspot");
    expect(home).toContain('aria-label="Попередній лікар"');
    expect(home).toContain('aria-label="Наступний лікар"');
    expect(home).toContain("const [doctorInView, setDoctorInView] = useState(false)");
    expect(home).toContain('track.scrollTo({ left: 0, behavior: "auto" })');
    expect(home).toContain("doctorWasInView");
    expect(home).toContain('if (id === "team")');
    expect(home).toContain("!doctorInView");
    expect(home).toContain("setTimeout(() => moveDoctors(1), 30000)");
    expect(home).toContain("track.scrollWidth <= track.clientWidth + 2");
    expect(home.indexOf('name: "Мезінова Аліна Віталіївна"')).toBeLessThan(home.indexOf('name: "Диченко Юлія Андріївна"'));
    expect(home).toContain("alina-mezinova-natural-gaze-2026-08-27_d1dbc079.png");
    expect(home).toContain("selectedDoctor");
    expect(home).toContain('aria-haspopup="dialog"');
    expect(home).toContain("<Dialog open={Boolean(selectedDoctor)}");
    expect(home).toContain("doctorTriggerRefs");
    expect(home).toContain("trigger?.focus()");
    expect(home).toContain("goToBookingFromDoctor");
    expect(home).toContain("#booking input");
    expect(home).not.toContain('href={`/likari/${doctor.slug}`}');
    expect(css).toContain(".doctor-carousel-track");
    expect(css).toContain(".doctor-dialog-content");
    expect(css).toContain(".doctor-carousel-card:focus-visible");
    expect(css).toContain("flex: 0 0 calc((100% - 3rem) / 4)");
    expect(css).toContain("@media (max-width: 1100px)");
    expect(css).toContain("prefers-reduced-motion: reduce");
  });

  it("adds a source-aware article hub and verified social CTA", () => {
    expect(app).toContain('path="/statti"');
    expect(app).toContain('path="/statti/:slug"');
    expect(articles).toContain("export const dentalArticles");
    expect(articles).toContain("не є діагнозом");
    expect(articles).toContain("www.nhs.uk");
    expect(articles).toContain("www.nidcr.nih.gov");
    expect(articles).toContain("www.who.int");
    expect(articles).toContain("61558068189082");
    expect(articles).toContain("facebook.com");
    expect(css).toContain(".article-grid");
    expect(css).toContain(".article-detail-layout");
  });

  it("uses only the approved core colors plus the restricted contact blue", () => {
    expect(css).toContain(".dental-shell");
    expect(css).toContain("#8f1f31");
    expect(css).toContain("#86a8d8");
    expect(css).toContain(".dental-header-phone");
    expect(css).toContain(".branches-map-card");
  });
});
