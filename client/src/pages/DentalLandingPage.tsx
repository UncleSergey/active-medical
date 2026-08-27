import { ArrowUpRight, Check, MapPin } from "lucide-react";
import { Link } from "wouter";
import { servicePages } from "@/pages/ServicePage";
import CalmAssistant from "@/components/CalmAssistant";

const dentalHighlights = [
  "Діагностика та зрозумілий план лікування",
  "Сучасна стоматологія для дорослих і дітей",
  "Команда лікарів різних стоматологічних напрямків",
];

export default function DentalLandingPage() {
  return (
    <main className="site-shell dental-shell">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="Актив Медікал — на головну">
          <img src="/manus-storage/active-medical-official-logo_c0e6b7c3.png" alt="Логотип Active Medical" className="brand-mark" width="128" height="64" />
          <span className="brand-copy"><b>Актив</b><span>Медікал</span></span>
        </Link>
        <nav className="nav-links dental-nav" aria-label="Навігація сторінки стоматології">
          <a href="#directions">Напрямки</a>
          <a href="#approach">Підхід</a>
          <a href="#contacts">Контакти</a>
          <Link className="nav-book" href="/#booking">Записатись на прийом <ArrowUpRight size={15} /></Link>
        </nav>
        <div className="dental-header-phone"><a href="tel:+380512777888">+38 (0512) 777-888</a></div>
      </header>

      <section className="dental-page-hero">
        <div className="dental-page-hero-copy">
          <div className="section-kicker">09 / Стоматологія</div>
          <h1>Стоматологія,<br /><em>у якій спокійно.</em></h1>
          <p>Від першої консультації до комплексного відновлення усмішки. Пояснюємо кожен етап і підбираємо план лікування після огляду.</p>
          <div className="dental-hero-actions">
            <Link className="button button-coral" href="/#booking">Записатись на консультацію <ArrowUpRight size={16} /></Link>
            <a className="text-button" href="#directions">Переглянути напрямки <ArrowUpRight size={16} /></a>
          </div>
          <div className="dental-highlight-list" aria-label="Переваги стоматологічного напрямку">
            {dentalHighlights.map((highlight) => <span key={highlight}><Check size={16} />{highlight}</span>)}
          </div>
          <Link className="text-button dental-articles-link" href="/statti">Зуби без складних слів <ArrowUpRight size={16} /></Link>
        </div>
        <div className="dental-page-hero-art" aria-hidden="true">
          <img className="dental-lion-pattern" src="/manus-storage/active-medical-official-logo_c0e6b7c3.png" alt="" aria-hidden="true" />
          <span className="dental-hero-label">Active Medical<br /><small>стоматологія</small></span>
          <div className="dental-hero-paper"><b>Точність</b><span>у кожному рішенні</span></div>
        </div>
      </section>

      <section id="directions" className="dental-directions section-pad">
        <div className="section-kicker">01 / Напрямки</div>
        <div className="section-heading"><h2>Все необхідне<br /><em>для усмішки.</em></h2><p>Оберіть напрямок, щоб познайомитися з послугами, лікарями та актуальними позиціями прайсу.</p></div>
        <div className="dental-direction-grid">
          {servicePages.map((service, index) => <Link className="dental-direction-card" href={`/${service.slug}`} key={service.slug}>
            <span className="dental-direction-number">{String(index + 1).padStart(2, "0")}</span>
            <div><h3>{service.shortTitle}</h3><p>{service.description}</p></div>
            <ArrowUpRight className="dental-direction-arrow" size={20} />
          </Link>)}
        </div>
      </section>

      <section id="approach" className="dental-approach section-pad">
        <div className="section-kicker">02 / Підхід</div>
        <div className="dental-approach-grid">
          <div><h2>План лікування,<br /><em>який зрозумілий.</em></h2><p>Стоматологічна допомога починається з огляду, діагностики та розмови. Остаточний план і вартість лікар визначає індивідуально після консультації.</p></div>
          <div className="dental-approach-steps"><article><strong>01</strong><h3>Познайомитись</h3><p>Розповідаємо, що бачимо та які є варіанти.</p></article><article><strong>02</strong><h3>Спланувати</h3><p>Узгоджуємо послідовність і пріоритети лікування.</p></article><article><strong>03</strong><h3>Рухатись разом</h3><p>Працюємо уважно, залишаючи місце для запитань.</p></article></div>
        </div>
      </section>

      <section id="contacts" className="dental-contact-banner section-pad">
        <div><div className="section-kicker">03 / Де ми</div><h2>Зустрінемося<br /><em>у Миколаєві.</em></h2><p>Стоматологія Active Medical працює на Намиві, у ЖК «Рив'єра».</p></div>
          <div className="dental-contact-actions"><span><MapPin size={18} /> вул. Лазурна, 5, корпус 10/1</span><div className="dental-contact-links"><Link className="text-button" href="/statti">Корисні статті <ArrowUpRight size={16} /></Link><Link className="button button-coral" href="/viddilennia">Усі відділення <ArrowUpRight size={16} /></Link></div></div>
      </section>

      <footer className="footer"><Link className="footer-brand" href="/"><img src="/manus-storage/active-medical-official-logo_c0e6b7c3.png" alt="Актив Медікал" /><div><b>Актив</b><span>Медікал</span></div></Link><p>Стоматологія, в якій<br />вам спокійно.</p><span className="footer-copy">© 2026 Active Medical</span></footer>
      <CalmAssistant />
    </main>
  );
}
