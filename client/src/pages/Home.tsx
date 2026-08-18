// Design reminder: quiet clinical poetry — editorial asymmetry, warm milk surfaces, blush/sky/sage pastels, coral actions, Cormorant Garamond + Manrope.
import { useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays, Check, ChevronDown, Clock3, HeartPulse, Instagram, MapPin, Menu, MessageCircle, Phone, ShieldCheck, Sparkles, Stethoscope, X } from "lucide-react";
import { priceCategories } from "@/data/pricelist";
import { trpc } from "@/lib/trpc";
import { MapView } from "@/components/Map";

const heroImage = "/manus-storage/active-medical-hero_bfed7fc9.jpg";
const interiorImage = "/manus-storage/active-medical-interior_58fbcb9b.jpg";
const teamImage = "/manus-storage/active-medical-four-doctors-final-color-team_ef7604a3.png";
const doctorImage = "/manus-storage/alina-mezinova-color-scrubs-new_8225399f.png";
const doctorImageSecondary = "/manus-storage/yuliia-diachenko-standing-white-uniform_ddbd040f.png";
const doctorImageTertiary = "/manus-storage/pohulych-yaroslav-color-scrubs-new_900b5f28.png";
const doctorImageQuaternary = "/manus-storage/fedorov-ivan-color-scrubs-new_b63e6af8.png";
const brandMark = "/manus-storage/active-medical-logo_2d7c215b.png";
const instagramQr = "/manus-storage/active-medical-instagram-qr_16ab140c.png";

const services = [
  { number: "01", title: "Терапія без поспіху", text: "Лікуємо причину, пояснюємо кожен крок і зберігаємо природність усмішки.", tone: "blush", icon: HeartPulse },
  { number: "02", title: "Хірургія з турботою", text: "Сучасні протоколи, точна діагностика та делікатне відновлення.", tone: "blue", icon: ShieldCheck },
  { number: "03", title: "Усмішка на роки", text: "Ортопедія, імплантація та ортодонтія — в одному продуманому плані.", tone: "sage", icon: Sparkles },
];

const doctors = [
  { name: "Мезінова Аліна Віталіївна", role: "Лікар-стоматолог", detail: "Дитяча стоматологія · Ортодонтія · високохудожня фронтальна реставрація" },
  { name: "Диченко Юлія Андріївна", role: "Щелепно-лицевий хірург", detail: "Хірургічна стоматологія · кісткова пластика · синус-ліфтинг · складні видалення · лікування кіст та новоутворень · щелепно-лицеві травми · запальні захворювання щелепно-лицевої ділянки · реконструктивна хірургія" },
  { name: "Погулич Ярослав Євгенович", role: "Імплантолог · хірург · ортопед", detail: "Ортопедична та хірургічна стоматологія · імплантація · протезування на імплантах · коронки та мостоподібні конструкції · видалення зубів" },
  { name: "Федоров Іван Михайлович", role: "Лікар-стоматолог", detail: "Терапевтична стоматологія · ендодонтія · ортопедична стоматологія · лікування карієсу та його ускладнень · ендодонтичне лікування складних випадків, пульпітів і періодонтитів · відновлення анатомії та функції зубів · ортопедичне протезування" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
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
          <button onClick={() => scrollTo("team")}>Команда</button>
          <button onClick={() => scrollTo("contacts")}>Контакти</button>
          <button className="nav-book" onClick={() => scrollTo("booking")}>Записатися <ArrowUpRight size={15} /></button>
        </nav>
        <div className="topbar-actions">
          <a href="tel:+380512777888" className="phone-link"><Phone size={15} /> +380 512 777 888</a>
          <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Меню">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow"><span className="rule" /> Стоматологія нового відчуття</p>
          <h1>Турбота,<br /><em>яку видно</em><br />в деталях.</h1>
          <p className="hero-lead">Спокійна атмосфера, точна медицина та чесний діалог. Для здорової усмішки, яка залишається вашою.</p>
          <div className="hero-actions"><button className="button button-coral" onClick={() => scrollTo("booking")}>Обрати час <ArrowUpRight size={17} /></button><button className="text-button" onClick={() => scrollTo("about")}>Дізнатися більше <span>↓</span></button></div>
          <div className="hero-notes"><span><Check size={14} /> Понад 15 років досвіду</span><span><Check size={14} /> Делікатний підхід</span></div>
        </div>
        <div className="hero-visual"><img src={heroImage} alt="Світлий кабінет стоматологічної клініки" /><div className="hero-caption"><span>Миколаїв · ЖК Рів'єра</span><span>Пн–Пт / 10:00–18:00</span></div><div className="hero-stamp">AM<br /><small>care first</small></div></div>
      </section>

      <section className="marquee"><div>точність <span>·</span> людяність <span>·</span> довіра <span>·</span> точність <span>·</span> людяність <span>·</span> довіра</div></section>

      <section id="about" className="about-section section-pad">
        <div className="section-kicker">01 / Про нас</div>
        <div className="about-grid"><div className="about-statement"><h2>Ми лікуємо<br /><em>не лише зуби.</em></h2><p>Ми створили місце, де можна видихнути. Де лікар слухає, а план лікування зрозумілий. Де сучасна технологія працює тихо — на ваше самопочуття.</p><button className="text-button" onClick={() => scrollTo("booking")}>Познайомитися ближче <ArrowUpRight size={16} /></button></div><div className="about-image-wrap"><img src={teamImage} alt="Команда лікарів Active Medical у клініці" /><div className="side-note">Піклуємося<br />про ваш<br /><em>спокій.</em></div></div></div>
        <div className="values-row"><div><strong>01</strong><span>Діагностика<br />без припущень</span></div><div><strong>02</strong><span>План лікування<br />без сюрпризів</span></div><div><strong>03</strong><span>Результат,<br />який хочеться показати</span></div></div>
      </section>

      <section id="services" className="services-section section-pad"><div className="section-kicker">02 / Напрямки</div><div className="section-heading"><h2>Все необхідне<br /><em>в одному місці.</em></h2><p>Від першої консультації до комплексного відновлення. Працюємо командою, щоб ви отримали цілісний результат.</p></div><div className="service-cards">{services.map(({ number, title, text, tone, icon: Icon }) => <article key={number} className={`service-card ${tone}`}><div className="service-top"><span>{number}</span><Icon size={22} strokeWidth={1.5} /></div><h3>{title}</h3><p>{text}</p><button className="round-arrow" onClick={() => scrollTo("prices")} aria-label={`Дізнатися більше: ${title}`}><ArrowUpRight size={18} /></button></article>)}</div></section>

      <section id="prices" className="prices-section section-pad"><div className="section-kicker">03 / Прайс</div><div className="price-intro"><div><h2>Прозорі ціни<br /><em>на вашу усмішку.</em></h2></div><p>Остаточна вартість залежить від індивідуального плану лікування. На консультації ми все пояснюємо до початку роботи.</p></div><div className="price-list">{visibleCategories.map((category, index) => <div className={`price-category ${openCategory === index ? "is-open" : ""}`} key={category.title}><button className="category-trigger" onClick={() => setOpenCategory(openCategory === index ? -1 : index)}><span className="category-index">{String(index + 1).padStart(2, "0")}</span><strong>{category.title}</strong><span className="category-count">{category.items.length} позицій</span><ChevronDown size={19} /></button>{openCategory === index && <div className="price-items">{category.items.map((item, itemIndex) => <div className="price-item" key={`${item.name}-${itemIndex}`}><span>{item.name}</span><b>{item.price ? `${item.price} грн` : "уточнюйте"}</b></div>)}</div>}</div>)}</div></section>

      <section id="team" className="team-section section-pad"><div className="team-photo"><img src={doctorImage} alt="Мезінова Аліна Віталіївна — лікар-стоматолог Active Medical" /><div className="team-photo-secondary"><img src={doctorImageSecondary} alt="Диченко Юлія Андріївна — щелепно-лицевий хірург Active Medical" /></div><div className="team-photo-tertiary"><img src={doctorImageTertiary} alt="Погулич Ярослав Євгенович — імплантолог, хірург, ортопед Active Medical" /></div><div className="team-photo-quaternary"><img src={doctorImageQuaternary} alt="Федоров Іван Михайлович — лікар-стоматолог Active Medical" /></div><div className="photo-label">Люди<br /><em>поруч</em></div></div><div className="team-copy"><div className="section-kicker">04 / Команда</div><h2>Ваші лікарі —<br /><em>ваші союзники.</em></h2><p>Ми не ховаємося за білими халатами. Говоримо просто, працюємо уважно і завжди залишаємо вам право на запитання.</p><div className="doctor-list">{doctors.map((doctor, index) => <div className="doctor-row" key={doctor.name}><span className="doctor-number">0{index + 1}</span><div><strong>{doctor.name}</strong><span>{doctor.role} · {doctor.detail}</span></div><ArrowUpRight size={17} /></div>)}</div></div></section>

      <section className="quote-section section-pad"><div className="quote-mark">“</div><blockquote>Найкраще лікування — це коли вам спокійно, зрозуміло і хочеться повернутися.</blockquote><p>— команда Active Medical</p></section>

      <section id="booking" className="booking-section section-pad"><div className="booking-aside"><div className="section-kicker">05 / Запис</div><h2>Почнемо<br /><em>з розмови.</em></h2><p>Залиште контакти — адміністратор зателефонує, відповість на запитання та підбере зручний час.</p><div className="booking-contact"><span><Clock3 size={17} /> Пн–Пт, 10:00–18:00</span><span><MessageCircle size={17} /> Viber / Telegram: +380 73 300 77 88</span><a href="tel:+380973201527" className="booking-phone"><Phone size={17} /> +380 97 320 15 27</a></div></div><form className="booking-form" onSubmit={async (event) => { event.preventDefault(); setSubmitError(""); const form = new FormData(event.currentTarget); try { await leadMutation.mutateAsync({ name: String(form.get("name") ?? ""), phone: String(form.get("phone") ?? ""), service: String(form.get("service") ?? ""), preferredTime: String(form.get("preferredTime") ?? ""), consent: form.get("consent") === "on" }); setSubmitted(true); event.currentTarget.reset(); } catch { setSubmitError("Не вдалося відправити заявку. Спробуйте ще раз або зателефонуйте нам."); } }}><label>Ваше ім'я<input name="name" required placeholder="Як до вас звертатися?" /></label><label>Номер телефону<input name="phone" required type="tel" placeholder="+380 00 000 00 00" /></label><label>Що вас цікавить?<select name="service" defaultValue=""><option value="" disabled>Оберіть напрямок</option><option>Консультація</option><option>Терапія</option><option>Імплантація</option><option>Ортодонтія</option><option>Дитяча стоматологія</option></select></label><label>Коли вам зручно?<select name="preferredTime" defaultValue=""><option value="" disabled>Оберіть час</option><option>Будь-який час</option><option>10:00–13:00</option><option>13:00–16:00</option><option>16:00–18:00</option></select></label><label className="consent-row"><input type="checkbox" name="consent" required /><span>Погоджуюся на обробку персональних даних</span></label><button className="button button-coral" type="submit" disabled={leadMutation.isPending}>{submitted ? <><Check size={17} /> Дякуємо, ми зателефонуємо</> : leadMutation.isPending ? <>Відправляємо…</> : <>Записатися на консультацію <ArrowUpRight size={17} /></>}</button>{submitError && <small role="alert" className="form-error">{submitError}</small>}<small>Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних.</small></form></section>

      <section id="contacts" className="contacts-section section-pad"><div className="section-kicker">06 / Контакти</div><div className="contacts-grid"><div><h2>Зустрінемося<br /><em>у Рів'єрі.</em></h2><address><span><MapPin size={17} /> вулиця Лазурна, 5,<br />корпус 10/1</span><a href="tel:+380512777888"><Phone size={17} /> +380 512 777 888</a><a href="tel:+380973201527"><Phone size={17} /> +38 097 320 15 27</a><span><MessageCircle size={17} /> Листування Viber/Telegram: +380 73 300 77 88</span></address><div className="contact-links"><a href="https://www.google.com/maps/search/?api=1&query=вулиця+Лазурна+5+корпус+10%2F1" target="_blank" rel="noreferrer">Відкрити маршрут <ArrowUpRight size={15} /></a><a href="https://www.instagram.com/stomatologactive/" target="_blank" rel="noreferrer"><Instagram size={16} /> Instagram @stomatologactive</a></div><div className="contact-actions"><a className="contact-action primary" href="tel:+380973201527"><Phone size={16} /> Зателефонувати</a><a className="contact-action" href="viber://chat?number=%2B380733007788"><MessageCircle size={16} /> Написати у Viber</a><a className="contact-action" href="https://t.me/active_medical_bot" target="_blank" rel="noreferrer"><MessageCircle size={16} /> Написати у Telegram</a></div></div><div className="map-card real-map-card"><div className="map-fallback" aria-hidden="true"><div className="map-grid" /><div className="map-pin"><MapPin size={22} fill="currentColor" /><span>Active Medical</span></div></div><MapView className="contact-map" initialCenter={{ lat: 46.9391, lng: 32.0527 }} initialZoom={16} onMapReady={(map) => { const geocoder = new google.maps.Geocoder(); geocoder.geocode({ address: "вулиця Лазурна, 5, корпус 10/1, Миколаїв, Україна" }, (results, status) => { const location = results?.[0]?.geometry.location; if (status === "OK" && location) { map.setCenter(location); new google.maps.marker.AdvancedMarkerElement({ map, position: location, title: "Active Medical" }); } }); }} /><div className="map-label map-label-overlay">Active Medical<br /><small>вулиця Лазурна, 5, корпус 10/1</small></div></div><a className="instagram-qr-card" href="https://www.instagram.com/stomatologactive/" target="_blank" rel="noreferrer"><img src={instagramQr} alt="QR-код Instagram Active Medical" /><span>Скануйте, щоб перейти<br /><b>@stomatologactive</b></span></a></div></section>

      <footer className="footer"><div className="footer-brand"><img src={brandMark} alt="Актив Медікал" /><div><b>Актив</b><span>Медікал</span></div></div><p>Стоматологія, в якій<br />вам спокійно.</p><span className="footer-copy">© 2026 Active Medical</span></footer>
    </main>
  );
}
