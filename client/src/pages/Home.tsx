// Design reminder: quiet clinical poetry — editorial asymmetry, warm milk surfaces, blush/sky/sage pastels, coral actions, Cormorant Garamond + Manrope.
import { useEffect, useMemo, useState } from "react";
import { ArrowUp, ArrowUpRight, CalendarDays, Check, ChevronDown, Clock3, HeartPulse, Instagram, MapPin, Menu, MessageCircle, Phone, ShieldCheck, Sparkles, Stethoscope, X } from "lucide-react";
import { priceCategories } from "@/data/pricelist";
import { trpc } from "@/lib/trpc";
import { MapView } from "@/components/Map";

const heroImage = "/manus-storage/active-medical-hero-reference-body_cc501cac.png";
const interiorImage = "/manus-storage/active-medical-interior_58fbcb9b.jpg";
const teamImage = "/manus-storage/active-medical-team-realistic-proportions_a0b90a6e.png";
const doctorPortraits = [
  "/manus-storage/alina-mezinova-color-scrubs-new_5b789463.png",
  "/manus-storage/yuliia-standing-option-balanced-head_f0170033.png",
  "/manus-storage/pohulych-yaroslav-color-scrubs-new_fe42c9e5.png",
  "/manus-storage/fedorov-ivan-light-gray-scrubs_a3681cf7.png",
];
const brandMark = "/manus-storage/active-medical-official-logo_2840a822.png";
const instagramQr = "/manus-storage/active-medical-instagram-qr_16ab140c.png";
const markoRossoCaseImage = "/manus-storage/active-medical-marko-rosso-before-after_7bfe3b81.png";
const case1BeforeImage = "/manus-storage/active-medical-case1-before_0701fe75.webp";
const case1AfterImage = "/manus-storage/active-medical-case1-after_efa7455a.webp";
const case2BeforeImage = "/manus-storage/active-medical-case2-before_61c1884e.webp";
const case2AfterImage = "/manus-storage/active-medical-case2-after_4cac5683.webp";
const licenseDocument = "/manus-storage/active-medical-license_0c964282.pdf";
const companyExtractDocument = "/manus-storage/active-medical-company-extract_0a229816.pdf";
const vatDocument = "/manus-storage/active-medical-vat-extract_e1f5d394.webp";

const services = [
  { number: "01", title: "Терапія без поспіху", text: "Лікуємо причину, пояснюємо кожен крок і зберігаємо природність усмішки.", tone: "blush", icon: HeartPulse },
  { number: "02", title: "Хірургія з турботою", text: "Сучасні протоколи, точна діагностика та делікатне відновлення.", tone: "blue", icon: ShieldCheck },
  { number: "03", title: "Усмішка на роки", text: "Ортопедія, імплантація та ортодонтія — в одному продуманому плані.", tone: "sage", icon: Sparkles },
];

const doctors = [
  { name: "Мезінова Аліна Віталіївна", role: "Лікар-стоматолог", detail: "Дитяча стоматологія · Ортодонтія — лікування складних випадків, знімні та функціональні ортодонтичні апарати, пластинки, брекет-системи · Лікування карієсу та його ускладнень · Високохудожня реставрація зубів · Лікування дітей, які потребують особливого підходу · Стоматологічне лікування під медикаментозним сном" },
  { name: "Диченко Юлія Андріївна", role: "Щелепно-лицевий хірург", detail: "Хірургічна стоматологія · кісткова пластика · синус-ліфтинг · складні видалення · лікування кіст та новоутворень · щелепно-лицеві травми · запальні захворювання щелепно-лицевої ділянки · реконструктивна хірургія" },
  { name: "Погулич Ярослав Євгенович", role: "Імплантолог · хірург · ортопед", detail: "Ортопедична та хірургічна стоматологія · імплантація · протезування на імплантах · коронки та мостоподібні конструкції · видалення зубів" },
  { name: "Федоров Іван Михайлович", role: "Лікар-стоматолог", detail: "Терапевтична стоматологія · ендодонтія · ортопедична стоматологія · лікування карієсу та його ускладнень · ендодонтичне лікування складних випадків, пульпітів і періодонтитів · відновлення анатомії та функції зубів · ортопедичне протезування" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTop] = useState(true);
  const [openCategory, setOpenCategory] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const leadMutation = trpc.leads.submit.useMutation();
  const visibleCategories = useMemo(() => priceCategories.map((category) => ({ ...category, items: category.items.filter((item) => item.name !== "Послуга") })), []);


  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="site-shell">
      <header className="topbar">
        <button className="brand" onClick={() => scrollTo("top")} aria-label="Актив Медікал — на головну">
          <img src={brandMark} alt="" className="brand-mark" />
          <span className="brand-copy"><b>Актив</b><span>Медікал</span></span>
        </button>
        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Основна навігація">
          <button onClick={() => scrollTo("about")}>Про нас</button>
          <button onClick={() => scrollTo("services")}>Послуги</button>
          <button onClick={() => scrollTo("promotions")}>Акції</button>
          <button onClick={() => scrollTo("documents")}>Документи</button>
          <button onClick={() => scrollTo("results")}>До / Після</button><button onClick={() => scrollTo("team")}>Команда</button>
          <button onClick={() => scrollTo("contacts")}>Контакти</button>
          <button className="nav-book" onClick={() => scrollTo("booking")}>Записатись на прийом <ArrowUpRight size={15} /></button>
        </nav>
        <div className="topbar-actions">
          <div className="phone-links"><a href="tel:+380512777888" className="phone-link"><Phone size={15} /> +380 512 777 888</a><a href="tel:+380951123195" className="phone-link">+38 095 112 31 95</a><a href="tel:+380938818409" className="phone-link">+38 093 881 84 09</a></div>
          <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Меню">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <section id="top" className="hero-reference">
        <img className="hero-reference-image" src={heroImage} alt="Стоматолог Active Medical у світлому клінічному інтер’єрі" /><span className="hero-badge-cover" aria-hidden="true" />
        <h1 className="sr-only">Турбота, яку видно в деталях</h1>
        <div className="hero-reference-hotspots" aria-label="Дії першого екрану">
          <button className="hero-hotspot hero-hotspot-primary" onClick={() => scrollTo("booking")} aria-label="Записатись на консультацію">Записатись на консультацію</button>
          <a className="hero-hotspot hero-hotspot-secondary" href="#about" onClick={(event) => { event.preventDefault(); scrollTo("about"); }} aria-label="Дізнатися більше про клініку">Дізнатися більше</a>
        </div>
      </section>

      <section className="marquee"><div>точність <span>·</span> людяність <span>·</span> довіра <span>·</span> точність <span>·</span> людяність <span>·</span> довіра</div></section>

      <section id="about" className="about-section section-pad">
        <div className="section-kicker">01 / Про нас</div>
        <div className="about-grid"><div className="about-statement"><h2>Ми лікуємо<br /><em>не лише зуби.</em></h2><p>Ми створили місце, де можна видихнути. Де лікар слухає, а план лікування зрозумілий. Де сучасна технологія працює тихо — на ваше самопочуття.</p><button className="text-button" onClick={() => scrollTo("booking")}>Познайомитися ближче <ArrowUpRight size={16} /></button></div><div className="about-image-wrap"><img src={teamImage} alt="Команда лікарів Active Medical у клініці" /></div></div>
        <div className="values-row"><div><strong>01</strong><span>Діагностика<br />без припущень</span></div><div><strong>02</strong><span>План лікування<br />без сюрпризів</span></div><div><strong>03</strong><span>Результат,<br />який хочеться показати</span></div></div>
      </section>

      <section id="services" className="services-section section-pad"><div className="section-kicker">02 / Напрямки</div><div className="section-heading"><h2>Все необхідне<br /><em>в одному місці.</em></h2><p>Від першої консультації до комплексного відновлення. Працюємо командою, щоб ви отримали цілісний результат.</p></div><div className="service-cards">{services.map(({ number, title, text, tone, icon: Icon }) => <article key={number} className={`service-card ${tone}`}><div className="service-top"><span>{number}</span><Icon size={22} strokeWidth={1.5} /></div><h3>{title}</h3><p>{text}</p><button className="round-arrow" onClick={() => scrollTo("prices")} aria-label={`Дізнатися більше: ${title}`}><ArrowUpRight size={18} /></button></article>)}</div></section>

      <section id="promotions" className="promotions-section section-pad"><div className="section-kicker">03 / Акції</div><div className="section-heading"><h2>Особливі умови<br /><em>для вашої усмішки.</em></h2><p>Актуальні пропозиції Active Medical діють обмежений час. Показання та план процедури лікар визначає на консультації.</p></div><div className="promo-layout"><div className="promo-offers"><article className="promo-offer promo-offer-blue"><div className="promo-offer-top"><span>01</span><b>АКТУАЛЬНО</b></div><h3>Професійна<br /><em>чистка зубів.</em></h3><p>Глибокий рівень: комплексне видалення відкладень, AirFlow, ультразвук-скейлер, полірування та фторування.</p><div className="promo-price"><strong>1 800 <small>грн</small></strong><del>2 500 грн</del></div><button className="button button-coral" onClick={() => scrollTo("booking")}>Скористатись <ArrowUpRight size={16} /></button></article><article className="promo-offer promo-offer-pink"><div className="promo-offer-top"><span>02</span><b>АКТУАЛЬНО</b></div><h3>Апаратне<br /><em>відбілювання.</em></h3><p>Освітлення на кілька відтінків за одну процедуру — після огляду та професійної консультації.</p><div className="promo-price"><strong>4 500 <small>грн</small></strong><del>5 500 грн</del></div><button className="button button-coral" onClick={() => scrollTo("booking")}>Записатись <ArrowUpRight size={16} /></button></article></div><div className="promo-gallery promo-cases-gallery" aria-label="Реальні клінічні кейси у хронологічному порядку"><figure className="promo-tile promo-case-tile"><img src={case1BeforeImage} alt="Кейс 1 — стан зубів до процедури" /><figcaption><b>01 · До</b><span>кейс 1 · початковий стан</span></figcaption></figure><figure className="promo-tile promo-case-tile"><img src={case1AfterImage} alt="Кейс 1 — стан зубів після процедури" /><figcaption><b>01 · Після</b><span>кейс 1 · результат процедури</span></figcaption></figure><figure className="promo-tile promo-case-tile"><img src={case2BeforeImage} alt="Кейс 2 — стан зубів до процедури" /><figcaption><b>02 · До</b><span>кейс 2 · початковий стан</span></figcaption></figure><figure className="promo-tile promo-case-tile"><img src={case2AfterImage} alt="Кейс 2 — стан зубів після процедури" /><figcaption><b>02 · Після</b><span>кейс 2 · результат процедури</span></figcaption></figure></div></div></section>

      <section id="prices" className="prices-section section-pad"><div className="section-kicker">04 / Прайс</div><div className="price-intro"><div><h2>Прозорі ціни<br /><em>на вашу усмішку.</em></h2></div><p>Остаточна вартість залежить від індивідуального плану лікування. На консультації ми все пояснюємо до початку роботи.</p></div><div className="price-list">{visibleCategories.map((category, index) => <div className={`price-category ${openCategory === index ? "is-open" : ""}`} key={category.title}><button className="category-trigger" onClick={() => setOpenCategory(openCategory === index ? -1 : index)}><span className="category-index">{String(index + 1).padStart(2, "0")}</span><strong>{category.title}</strong><span className="category-count">{category.items.length} позицій</span><ChevronDown size={19} /></button>{openCategory === index && <div className="price-items">{category.items.map((item, itemIndex) => <div className="price-item" key={`${item.name}-${itemIndex}`}><span>{item.name}</span><b>{item.price ? `${item.price} грн` : "уточнюйте"}</b></div>)}</div>}</div>)}</div></section>

      <section id="results" className="results-section section-pad"><div className="section-kicker">05 / До / Після</div><div className="results-grid"><div className="results-copy"><h2>Результат,<br /><em>який видно.</em></h2><p>Показуємо реальні клінічні приклади з профілю Active Medical. Кожен випадок потребує індивідуальної консультації та плану лікування.</p><a className="text-button" href="https://www.instagram.com/stomatologactive/" target="_blank" rel="noreferrer">Більше прикладів в Instagram <Instagram size={16} /></a></div><figure className="before-after-card before-after-card-feature"><img src={markoRossoCaseImage} alt="Реальний клінічний образец до та після за апаратом Марко Россо" /><figcaption><span>До / Після</span><small>Апарат Марко Россо · реальний клінічний кейс</small></figcaption></figure></div></section>

      <section id="team" className="team-section section-pad"><div className="team-copy team-copy-full"><div className="section-kicker">06 / Команда</div><h2>Ваші лікарі —<br /><em>ваші союзники.</em></h2><p>Ми не ховаємося за білими халатами. Говоримо просто, працюємо уважно і завжди залишаємо вам право на запитання.</p><div className="doctor-list doctor-list-with-photos">{doctors.map((doctor, index) => <div className="doctor-row doctor-row-with-photo" key={doctor.name}><div className="doctor-row-photo"><img src={doctorPortraits[index]} alt={`${doctor.name} — ${doctor.role} Active Medical`} /></div><span className="doctor-number">0{index + 1}</span><div className="doctor-row-copy"><strong>{doctor.name}</strong><span>{doctor.role} · {doctor.detail}</span></div><ArrowUpRight size={17} /></div>)}</div></div></section>

      <section className="quote-section section-pad"><div className="quote-mark">“</div><blockquote>Найкраще лікування — це коли вам спокійно, зрозуміло і хочеться повернутися.</blockquote><p>— команда Active Medical</p></section>

      <section id="booking" className="booking-section section-pad"><div className="booking-aside"><div className="section-kicker">07 / Запис</div><h2>Почнемо<br /><em>з розмови.</em></h2><p>Залиште контакти — адміністратор зателефонує, відповість на запитання та підбере зручний час.</p><div className="booking-contact"><span><Clock3 size={17} /> Пн–Пт, 10:00–18:00</span><span><MessageCircle size={17} /> Viber / Telegram: +380 73 300 77 88</span><a href="tel:+380973201527" className="booking-phone"><Phone size={17} /> +380 97 320 15 27</a><a href="tel:+380951123195" className="booking-phone"><Phone size={17} /> +38 095 112 31 95</a><a href="tel:+380938818409" className="booking-phone"><Phone size={17} /> +38 093 881 84 09</a></div></div><form className="booking-form" onSubmit={async (event) => { event.preventDefault(); setSubmitError(""); const form = new FormData(event.currentTarget); try { await leadMutation.mutateAsync({ name: String(form.get("name") ?? ""), phone: String(form.get("phone") ?? ""), service: String(form.get("service") ?? ""), preferredTime: String(form.get("preferredTime") ?? ""), consent: form.get("consent") === "on" }); setSubmitted(true); event.currentTarget.reset(); } catch { setSubmitError("Не вдалося відправити заявку. Спробуйте ще раз або зателефонуйте нам."); } }}><label>Ваше ім'я<input name="name" required placeholder="Як до вас звертатися?" /></label><label>Номер телефону<input name="phone" required type="tel" placeholder="+380 00 000 00 00" /></label><label>Що вас цікавить?<select name="service" defaultValue=""><option value="" disabled>Оберіть напрямок</option><option>Консультація</option><option>Терапія</option><option>Імплантація</option><option>Ортодонтія</option><option>Дитяча стоматологія</option></select></label><label>Коли вам зручно?<select name="preferredTime" defaultValue=""><option value="" disabled>Оберіть час</option><option>Будь-який час</option><option>10:00–13:00</option><option>13:00–16:00</option><option>16:00–18:00</option></select></label><label className="consent-row"><input type="checkbox" name="consent" required /><span>Погоджуюся на обробку персональних даних</span></label><button className="button button-coral" type="submit" disabled={leadMutation.isPending}>{submitted ? <><Check size={17} /> Дякуємо, ми зателефонуємо</> : leadMutation.isPending ? <>Відправляємо…</> : <>Записатись на консультацію <ArrowUpRight size={17} /></>}</button>{submitError && <small role="alert" className="form-error">{submitError}</small>}<small>Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних.</small></form></section>

      <section id="documents" className="documents-section section-pad"><div className="section-kicker">08 / Документи</div><div className="documents-grid"><div className="documents-intro"><h2>Відкрита<br /><em>медицина.</em></h2><p>Медична практика Active Medical здійснюється на підставі ліцензії Міністерства охорони здоров’я України. Реєстраційні та податкові документи доступні для перегляду за посиланнями нижче.</p><div className="documents-note"><ShieldCheck size={18} /><span>Офіційні документи<br /><b>без зайвих слів.</b></span></div></div><div className="document-cards"><a className="document-card document-card-featured" href={licenseDocument} target="_blank" rel="noreferrer"><span className="document-card-index">01</span><div><strong>Ліцензія на медичну практику</strong><small>Документ МОЗ України · PDF</small></div><ArrowUpRight size={18} /></a><a className="document-card" href={companyExtractDocument} target="_blank" rel="noreferrer"><span className="document-card-index">02</span><div><strong>Витяг з державного реєстру</strong><small>Реєстраційні відомості · PDF</small></div><ArrowUpRight size={18} /></a><a className="document-card" href={vatDocument} target="_blank" rel="noreferrer"><span className="document-card-index">03</span><div><strong>Реєстрація платника ПДВ</strong><small>Офіційний витяг · WEBP</small></div><ArrowUpRight size={18} /></a></div></div></section>

      <section id="contacts" className="contacts-section section-pad"><div className="section-kicker">09 / Контакти</div><div className="contacts-grid"><div><h2>Зустрінемося<br /><em>у Рів'єрі.</em></h2><address><span><MapPin size={17} /> вулиця Лазурна, 5,<br />корпус 10/1</span><a href="tel:+380512777888"><Phone size={17} /> +380 512 777 888</a><a href="tel:+380973201527"><Phone size={17} /> +38 097 320 15 27</a><a href="tel:+380951123195"><Phone size={17} /> +38 095 112 31 95</a><a href="tel:+380938818409"><Phone size={17} /> +38 093 881 84 09</a><span><MessageCircle size={17} /> Листування Viber/Telegram: +380 73 300 77 88</span></address><div className="contact-links"><a href="https://www.google.com/maps/search/?api=1&query=вулиця+Лазурна+5+корпус+10%2F1" target="_blank" rel="noreferrer">Відкрити маршрут <ArrowUpRight size={15} /></a><a href="https://www.instagram.com/stomatologactive/" target="_blank" rel="noreferrer"><Instagram size={16} /> Instagram @stomatologactive</a></div><div className="contact-actions"><a className="contact-action primary" href="tel:+380973201527"><Phone size={16} /> Зателефонувати</a><a className="contact-action" href="viber://chat?number=%2B380733007788"><MessageCircle size={16} /> Написати у Viber</a><a className="contact-action" href="https://t.me/active_medical_bot" target="_blank" rel="noreferrer"><MessageCircle size={16} /> Написати у Telegram</a></div></div><div className="map-card real-map-card"><div className="map-fallback" aria-hidden="true"><div className="map-grid" /><div className="map-pin"><MapPin size={22} fill="currentColor" /><span>Active Medical</span></div></div><MapView className="contact-map" initialCenter={{ lat: 46.9391, lng: 32.0527 }} initialZoom={16} onMapReady={(map) => { const geocoder = new google.maps.Geocoder(); geocoder.geocode({ address: "вулиця Лазурна, 5, корпус 10/1, Миколаїв, Україна" }, (results, status) => { const location = results?.[0]?.geometry.location; if (status === "OK" && location) { map.setCenter(location); new google.maps.marker.AdvancedMarkerElement({ map, position: location, title: "Active Medical" }); } }); }} /><div className="map-label map-label-overlay">Active Medical<br /><small>вулиця Лазурна, 5, корпус 10/1</small></div></div><a className="instagram-qr-card" href="https://www.instagram.com/stomatologactive/" target="_blank" rel="noreferrer"><img src={instagramQr} alt="QR-код Instagram Active Medical" /><span>Скануйте, щоб перейти<br /><b>@stomatologactive</b></span></a></div></section>

      <footer className="footer"><div className="footer-brand"><img src={brandMark} alt="Актив Медікал" /><div><b>Актив</b><span>Медікал</span></div></div><p>Стоматологія, в якій<br />вам спокійно.</p><span className="footer-copy">© 2026 Active Medical</span></footer>
      <button className={`back-to-top ${showBackToTop ? "is-visible" : ""}`} onClick={() => scrollTo("top")} aria-label="Повернутися вгору"><ArrowUp size={19} /></button>
    </main>
  );
}
