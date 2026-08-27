// Design reminder: quiet clinical poetry — editorial asymmetry, warm milk surfaces, blush/sky/sage pastels, coral actions, Cormorant Garamond + Manrope.
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, CalendarDays, Check, ChevronDown, Clock3, HeartPulse, Instagram, MapPin, Menu, MessageCircle, Phone, ShieldCheck, Sparkles, Stethoscope, X } from "lucide-react";
import { priceCategories } from "@/data/pricelist";
import { trpc } from "@/lib/trpc";
import { MapView } from "@/components/Map";

const heroImage = "/manus-storage/active-medical-hero-reference-body_fda89e6a.png";
const interiorImage = "/manus-storage/active-medical-interior_10802c60.jpg";
const teamImage = "/manus-storage/active-medical-team-realistic-proportions_23ae09e7.png";
const doctorPortraits = [
  "/manus-storage/alina-mezinova-color-scrubs-new_22ddf932.png",
  "/manus-storage/yuliia-standing-option-balanced-head_4c568e66.png",
  "/manus-storage/pohulych-yaroslav-color-scrubs-new_e4e3f887.png",
  "/manus-storage/fedorov-ivan-light-gray-scrubs_b178ecf8.png",
];
const brandMark = "/manus-storage/active-medical-official-logo_c0e6b7c3.png";
const instagramQr = "/manus-storage/active-medical-instagram-qr_102f54b1.png";
const markoRossoCaseImage = "/manus-storage/active-medical-marko-rosso-before-after_7073d9f2.png";
const case1BeforeImage = "/manus-storage/active-medical-case1-before_c2a0444e.webp";
const case1AfterImage = "/manus-storage/active-medical-case1-after_23d01b9d.webp";
const case2BeforeImage = "/manus-storage/active-medical-case2-before_5ca610e9.webp";
const case2AfterImage = "/manus-storage/active-medical-case2-after_f7eb8c92.webp";
const licenseDocument = "/manus-storage/active-medical-license_a18c773c.pdf";
const companyExtractDocument = "/manus-storage/active-medical-company-extract_1ae0a500.pdf";
const vatDocument = "/manus-storage/active-medical-vat-extract_b12736c5.webp";

const services = [
  { number: "01", title: "Терапія без поспіху", text: "Лікуємо причину, пояснюємо кожен крок і зберігаємо природність усмішки.", tone: "blush", icon: HeartPulse },
  { number: "02", title: "Хірургія з турботою", text: "Сучасні протоколи, точна діагностика та делікатне відновлення.", tone: "blue", icon: ShieldCheck },
  { number: "03", title: "Усмішка на роки", text: "Ортопедія, імплантація та ортодонтія — в одному продуманому плані.", tone: "sage", icon: Sparkles },
];

const kidsDentistryPrices = [
  { name: "Діагностичний прийом дитячого стоматолога", price: "800" },
  { name: "Чистка зубів професійна дитяча", price: "1 800" },
  { name: "Лікування карієсу молочного зуба: початковий карієс", price: "1 800" },
  { name: "Видалення уламків молочного зуба", price: "800" },
  { name: "Видалення молочного зуба просте", price: "1 200" },
  { name: "Відновлення молочного зуба за допомогою металевої коронки", price: "2 500" },
  { name: "Надання стоматологічних послуг під загальною анестезією (1 година)", price: "5 500" },
];

const kidsOrthoPrices = [
  { name: "Встановлення апарату Marco Rosa (молочні зуби)", price: "13 000" },
  { name: "Встановлення апарату для утримання місця", price: "3 500" },
  { name: "Встановлення ортодонтичної пластини", price: "6 500" },
  { name: "Брекет-система металева (одна щелепа)", price: "13 000" },
  { name: "Брекет-система металева самолігуюча (одна щелепа)", price: "18 000" },
  { name: "Встановлення капи ретенційної", price: "2 800" },
];

const kidsClinicalGallery = [
  { src: "/manus-storage/kids-clean-clinical-01_42ec865a.png", alt: "Клінічний результат дитячої ортодонтії — фронтальний ракурс", label: "Фронтальний ракурс" },
  { src: "/manus-storage/kids-pediatric-care-photo_98070c4a.jpg", alt: "Дружня консультація з дитячої стоматології", label: "Дбайливий візит" },
  { src: "/manus-storage/kids-caries-stages_0a2edca0.png", alt: "Стадії карієсу у дитини — навчальна схема", label: "Стадії карієсу" },
  { src: "/manus-storage/kids-clean-clinical-02_a82db344.png", alt: "Клінічний результат ортодонтичного лікування з брекетами", label: "Ортодонтичне лікування" },
  { src: "/manus-storage/kids-clean-clinical-03_713b9081.png", alt: "Клінічний ракурс зубного ряду з ортодонтичною системою", label: "Деталі лікування" },
  { src: "/manus-storage/kids-visit-preparation_3f08866a.png", alt: "Як підготувати дитину до візиту до стоматолога — книжка та зубна щітка", label: "Підготовка до візиту" },
];

const doctors = [
  { name: "Мезінова Аліна Віталіївна", slug: "mezinova-alina-vitaliyivna", role: "Лікар-стоматолог", detail: "Дитяча стоматологія · Ортодонтія — лікування складних випадків, знімні та функціональні ортодонтичні апарати, пластинки, брекет-системи · Лікування карієсу та його ускладнень · Високохудожня реставрація зубів · Лікування дітей, які потребують особливого підходу · Стоматологічне лікування під медикаментозним сном" },
  { name: "Диченко Юлія Андріївна", slug: "dyachenko-yuliya-andriyivna", role: "Щелепно-лицевий хірург", detail: "Хірургічна стоматологія · кісткова пластика · синус-ліфтинг · складні видалення · лікування кіст та новоутворень · щелепно-лицеві травми · запальні захворювання щелепно-лицевої ділянки · реконструктивна хірургія" },
  { name: "Погулич Ярослав Євгенович", slug: "pohulych-yaroslav-yevhenovych", role: "Імплантолог · хірург · ортопед", detail: "Ортопедична та хірургічна стоматологія · імплантація · протезування на імплантах · коронки та мостоподібні конструкції · видалення зубів" },
  { name: "Федоров Іван Михайлович", slug: "fedorov-ivan-mykhaylovych", role: "Лікар-стоматолог", detail: "Терапевтична стоматологія · ендодонтія · ортопедична стоматологія · лікування карієсу та його ускладнень · ендодонтичне лікування складних випадків, пульпітів і періодонтитів · відновлення анатомії та функції зубів · ортопедичне протезування" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTop] = useState(true);
  const [openCategory, setOpenCategory] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [doctorPaused, setDoctorPaused] = useState(false);
  const [doctorInView, setDoctorInView] = useState(false);
  const doctorTrackRef = useRef<HTMLDivElement>(null);
  const doctorWasInView = useRef(false);
  const leadMutation = trpc.leads.submit.useMutation();
  const visibleCategories = useMemo(() => priceCategories.map((category) => ({ ...category, items: category.items.filter((item) => item.name !== "Послуга") })), []);

  useEffect(() => {
    const title = "Стоматологія Active Medical у Миколаєві | Лікування зубів";
    const description = "Стоматологія Active Medical у Миколаєві на Намиві, ЖК «Рів'єра». Лікування зубів для дорослих і дітей, імплантація, протезування, ортодонтія, хірургія та професійна гігієна.";
    const canonical = `${window.location.origin}/`;
    document.title = title;
    const setMeta = (selector: string, attribute: string, name: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) { element = document.createElement("meta"); element.setAttribute(attribute, name); document.head.appendChild(element); }
      element.setAttribute("content", content);
    };
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonical);
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) { canonicalLink = document.createElement("link"); canonicalLink.setAttribute("rel", "canonical"); document.head.appendChild(canonicalLink); }
    canonicalLink.setAttribute("href", canonical);

    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash))?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const scrollTo = (id: string) => {
    if (id === "team") doctorTrackRef.current?.scrollTo({ left: 0, behavior: "auto" });
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const track = doctorTrackRef.current;
    if (!track) return;
    track.scrollTo({ left: 0, behavior: "auto" });
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !doctorWasInView.current) {
        track.scrollTo({ left: 0, behavior: "auto" });
      }
      doctorWasInView.current = entry.isIntersecting;
      setDoctorInView(entry.isIntersecting);
    }, { threshold: 0.45 });
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const moveDoctors = (direction: number) => {
    const track = doctorTrackRef.current;
    const card = track?.querySelector<HTMLElement>(".doctor-carousel-card");
    if (!track || !card || track.scrollWidth <= track.clientWidth + 2) return;
    track.scrollBy({ left: direction * (card.offsetWidth + 16), behavior: "smooth" });
  };

  useEffect(() => {
    if (doctorPaused || !doctorInView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const firstStep = window.setTimeout(() => moveDoctors(1), 30000);
    const timer = window.setInterval(() => moveDoctors(1), 5200);
    return () => {
      window.clearTimeout(firstStep);
      window.clearInterval(timer);
    };
  }, [doctorPaused, doctorInView]);

  return (
    <main className="site-shell">
      <header className="topbar">
        <button className="brand" onClick={() => scrollTo("top")} aria-label="Актив Медікал — на головну">
          <img src={brandMark} alt="Логотип Active Medical" className="brand-mark" width="128" height="64" />
          <span className="brand-copy"><b>Актив</b><span>Медікал</span></span>
        </button>
        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Основна навігація">
          <button onClick={() => scrollTo("about")}>Про нас</button>
          <button onClick={() => scrollTo("services")}>Послуги</button><button onClick={() => scrollTo("kids")}>Дітям</button>
          <button onClick={() => scrollTo("promotions")}>Акції</button>
          <button onClick={() => scrollTo("documents")}>Документи</button>
          <button onClick={() => scrollTo("results")}>До / Після</button><button onClick={() => scrollTo("team")}>Команда</button>
          <button onClick={() => scrollTo("contacts")}>Контакти</button>
          <a className="nav-page-link" href="/stomatologiya">Стоматологія</a>
          <a className="nav-page-link" href="/viddilennia">Відділення</a>
          <button className="nav-book" onClick={() => scrollTo("booking")}>Записатись на прийом <ArrowUpRight size={15} /></button>
        </nav>
        <div className="topbar-actions">
          <div className="phone-links"><a href="tel:+380512777888" className="phone-link"><Phone size={15} /> +380 512 777 888</a><a href="tel:+380951123195" className="phone-link">+38 095 112 31 95</a><a href="tel:+380938818409" className="phone-link">+38 093 881 84 09</a></div>
          <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Меню">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <section id="top" className="hero-reference">
        <img className="hero-reference-image" src={heroImage} alt="Стоматолог Active Medical у світлому клінічному інтер’єрі" loading="eager" fetchPriority="high" decoding="async" /><span className="hero-badge-cover" aria-hidden="true" />
        <h1 className="sr-only">Стоматологія Active Medical у Миколаєві</h1>
        <div className="hero-reference-hotspots" aria-label="Дії першого екрану">
          <button className="hero-hotspot hero-hotspot-primary" onClick={() => scrollTo("booking")} aria-label="Записатись на консультацію">Записатись на консультацію</button>
          <a className="hero-hotspot hero-hotspot-secondary" href="#about" onClick={(event) => { event.preventDefault(); scrollTo("about"); }} aria-label="Дізнатися більше про клініку">Дізнатися більше</a>
        </div>
      </section>

      <section className="marquee"><div>точність <span>·</span> людяність <span>·</span> довіра <span>·</span> точність <span>·</span> людяність <span>·</span> довіра</div></section>

      <section id="about" className="about-section section-pad">
        <div className="section-kicker">01 / Про нас</div>
        <div className="about-grid"><div className="about-statement"><h2>Ми лікуємо<br /><em>не лише зуби.</em></h2><p>Ми створили місце, де можна видихнути. Де лікар слухає, а план лікування зрозумілий. Де сучасна технологія працює тихо — на ваше самопочуття.</p><p className="local-seo-copy">Стоматологія Active Medical у Миколаєві працює на Намиві, у ЖК «Рів'єра»: вул. Лазурна, 5, корпус 10/1.</p><button className="text-button" onClick={() => scrollTo("booking")}>Познайомитися ближче <ArrowUpRight size={16} /></button></div><div className="about-image-wrap"><img src={teamImage} alt="Команда лікарів стоматологічної клініки Active Medical у Миколаєві" loading="lazy" decoding="async" /></div></div>
        <div className="values-row"><div><strong>01</strong><span>Діагностика<br />без припущень</span></div><div><strong>02</strong><span>План лікування<br />без сюрпризів</span></div><div><strong>03</strong><span>Результат,<br />який хочеться показати</span></div></div>
      </section>

      <section id="services" className="services-section section-pad"><div className="section-kicker">02 / Напрямки</div><div className="section-heading"><h2>Все необхідне<br /><em>в одному місці.</em></h2><p>Від першої консультації до комплексного відновлення. Працюємо командою, щоб ви отримали цілісний результат.</p></div><div className="service-cards">{services.map(({ number, title, text, tone, icon: Icon }) => <article key={number} className={`service-card ${tone}`}><div className="service-top"><span>{number}</span><Icon size={22} strokeWidth={1.5} /></div><h3>{title}</h3><p>{text}</p><button className="round-arrow" onClick={() => scrollTo("prices")} aria-label={`Дізнатися більше: ${title}`}><ArrowUpRight size={18} /></button></article>)}</div><nav className="service-detail-links" aria-label="Окремі сторінки стоматологічних послуг"><span>Окремі напрямки:</span><a href="/dityacha-stomatolohiya">Дитяча стоматологія</a><a href="/terapevtychna-stomatolohiya">Терапевтична стоматологія</a><a href="/ortodontiya">Ортодонтія</a><a href="/implantatsiya">Імплантація</a><a href="/protezyvannya">Протезування</a><a href="/likuvannya-kanaliv">Лікування каналів</a><a href="/profesiyna-hihiyena">Професійна гігієна</a><a href="/khirurhichna-stomatolohiya">Хірургічна стоматологія</a></nav></section>

      <section id="kids" className="kids-section section-pad"><div className="kids-sparkle kids-sparkle-one">✦</div><div className="kids-sparkle kids-sparkle-two">✦</div><div className="kids-hero"><div className="kids-hero-copy"><div className="section-kicker">03 / Дітям</div><h2>Стоматологія,<br /><em>яку люблять діти.</em></h2><p>Тут можна дивитися мультфільми, знайомитися з лікарем у своєму темпі й отримувати маленький подарунок після візиту.</p><div className="kids-actions"><button className="button button-coral" onClick={() => scrollTo("booking")}>Записати дитину <ArrowUpRight size={16} /></button><span className="kids-age">Приймаємо дітей<br /><b>з особливим підходом</b></span></div></div><div className="kids-photo-gallery-wrap" aria-label="Реальні клінічні фото дитячої ортодонтії">{kidsClinicalGallery.map((photo) => <figure className="kids-clinical-photo" key={photo.src}><img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" /><figcaption>{photo.label}</figcaption></figure>)}</div></div><div className="kids-benefits"><article><span className="kids-benefit-icon">▶</span><strong>Мультфільм під час візиту</strong><p>Знайомий сюжет допомагає відволіктися й освоїтися в кабінеті.</p></article><article><span className="kids-benefit-icon">★</span><strong>Маленький подарунок</strong><p>Після прийому дитина обирає приємний сюрприз — за сміливість і довіру.</p></article><article><span className="kids-benefit-icon">♥</span><strong>Лікарка, яка слухає</strong><p>Аліна Віталіївна пояснює кожен крок дитині та батькам.</p></article></div><div className="kids-doctor-card"><div className="kids-doctor-photo"><img src={doctorPortraits[0]} alt="Мезінова Аліна Віталіївна — дитяча стоматологія та ортодонтія в Active Medical" loading="lazy" decoding="async" /></div><div className="kids-doctor-copy"><div className="section-kicker">Наш дитячий лікар</div><h3>Мезінова Аліна<br /><em>Віталіївна</em></h3><p>Лікар-стоматолог · дитяча стоматологія · ортодонтія. Лікування дітей, які потребують особливого підходу, знімні та функціональні апарати, пластинки, брекет-системи й високохудожня реставрація.</p><button className="text-button" onClick={() => scrollTo("booking")}>Познайомитися на консультації <ArrowUpRight size={16} /></button></div></div><div className="kids-prices"><div className="kids-price-panel"><div className="kids-price-heading"><span>01</span><h3>Дитяча стоматологія</h3></div>{kidsDentistryPrices.map((item) => <div className="kids-price-row" key={item.name}><span>{item.name}</span><b>{item.price} грн</b></div>)}</div><div className="kids-price-panel kids-price-panel-ortho"><div className="kids-price-heading"><span>02</span><h3>Ортодонтія</h3></div>{kidsOrthoPrices.map((item) => <div className="kids-price-row" key={item.name}><span>{item.name}</span><b>{item.price} грн</b></div>)}</div></div><p className="kids-price-note">Остаточний план і вартість лікар визначає після огляду та консультації. Прайс містить актуальні позиції Active Medical.</p></section>

      <section id="promotions" className="promotions-section section-pad"><div className="section-kicker">04 / Акції</div><div className="section-heading"><h2>Особливі умови<br /><em>для вашої усмішки.</em></h2><p>Актуальні пропозиції Active Medical діють обмежений час. Показання та план процедури лікар визначає на консультації.</p></div><div className="promo-layout"><div className="promo-offers"><article className="promo-offer promo-offer-blue"><div className="promo-offer-top"><span>01</span><b>АКТУАЛЬНО</b></div><h3>Професійна<br /><em>чистка зубів.</em></h3><p>Глибокий рівень: комплексне видалення відкладень, AirFlow, ультразвук-скейлер, полірування та фторування.</p><div className="promo-price"><strong>1 800 <small>грн</small></strong><del>2 500 грн</del></div><button className="button button-coral" onClick={() => scrollTo("booking")}>Скористатись <ArrowUpRight size={16} /></button></article><article className="promo-offer promo-offer-pink"><div className="promo-offer-top"><span>02</span><b>АКТУАЛЬНО</b></div><h3>Апаратне<br /><em>відбілювання.</em></h3><p>Освітлення на кілька відтінків за одну процедуру — після огляду та професійної консультації.</p><div className="promo-price"><strong>4 500 <small>грн</small></strong><del>5 500 грн</del></div><button className="button button-coral" onClick={() => scrollTo("booking")}>Записатись <ArrowUpRight size={16} /></button></article></div><div className="promo-gallery promo-cases-gallery" aria-label="Реальні клінічні кейси у хронологічному порядку"><figure className="promo-tile promo-case-tile"><img src={case1BeforeImage} alt="Кейс 1 — стан зубів до стоматологічної процедури" loading="lazy" decoding="async" /><figcaption><b>01 · До</b><span>кейс 1 · початковий стан</span></figcaption></figure><figure className="promo-tile promo-case-tile"><img src={case1AfterImage} alt="Кейс 1 — стан зубів після стоматологічної процедури" loading="lazy" decoding="async" /><figcaption><b>01 · Після</b><span>кейс 1 · результат процедури</span></figcaption></figure><figure className="promo-tile promo-case-tile"><img src={case2BeforeImage} alt="Кейс 2 — стан зубів до стоматологічної процедури" loading="lazy" decoding="async" /><figcaption><b>02 · До</b><span>кейс 2 · початковий стан</span></figcaption></figure><figure className="promo-tile promo-case-tile"><img src={case2AfterImage} alt="Кейс 2 — стан зубів після стоматологічної процедури" loading="lazy" decoding="async" /><figcaption><b>02 · Після</b><span>кейс 2 · результат процедури</span></figcaption></figure></div></div></section>

      <section id="prices" className="prices-section section-pad"><div className="section-kicker">05 / Прайс</div><div className="price-intro"><div><h2>Прозорі ціни<br /><em>на вашу усмішку.</em></h2></div><p>Остаточна вартість залежить від індивідуального плану лікування. На консультації ми все пояснюємо до початку роботи.</p></div><div className="price-list">{visibleCategories.map((category, index) => <div className={`price-category ${openCategory === index ? "is-open" : ""}`} key={category.title}><button className="category-trigger" onClick={() => setOpenCategory(openCategory === index ? -1 : index)}><span className="category-index">{String(index + 1).padStart(2, "0")}</span><strong>{category.title}</strong><span className="category-count">{category.items.length} позицій</span><ChevronDown size={19} /></button>{openCategory === index && <div className="price-items">{category.items.map((item, itemIndex) => <div className="price-item" key={`${item.name}-${itemIndex}`}><span>{item.name}</span><b>{item.price ? `${item.price} грн` : "уточнюйте"}</b></div>)}</div>}</div>)}</div></section>

      <section id="results" className="results-section section-pad"><div className="section-kicker">06 / До / Після</div><div className="results-grid"><div className="results-copy"><h2>Результат,<br /><em>який видно.</em></h2><p>Показуємо реальні клінічні приклади з профілю Active Medical. Кожен випадок потребує індивідуальної консультації та плану лікування.</p><a className="text-button" href="https://www.instagram.com/stomatologactive/" target="_blank" rel="noreferrer">Більше прикладів в Instagram <Instagram size={16} /></a></div><figure className="before-after-card before-after-card-feature"><img src={markoRossoCaseImage} alt="Реальний клінічний кейс до та після лікування апаратом Марко Россо" loading="lazy" decoding="async" /><figcaption><span>До / Після</span><small>Апарат Марко Россо · реальний клінічний кейс</small></figcaption></figure></div></section>

      <section id="team" className="team-section team-section-carousel section-pad"><div className="team-carousel-intro"><div className="section-kicker">07 / Команда</div><h2>Ваші лікарі —<br /><em>ваші союзники.</em></h2><p>Познайомтеся з командою Active Medical. Відкрийте картку лікаря, щоб дізнатися більше про його напрямок.</p><div className="team-carousel-line" aria-hidden="true"><span>маршрут спокійної усмішки</span><i /></div><div className="team-carousel-controls"><button type="button" className="carousel-arrow" onClick={() => moveDoctors(-1)} aria-label="Попередній лікар">←</button><button type="button" className="carousel-arrow" onClick={() => moveDoctors(1)} aria-label="Наступний лікар">→</button></div></div><div className="doctor-carousel" role="region" aria-roledescription="carousel" aria-label="Лікарі Active Medical" onMouseEnter={() => setDoctorPaused(true)} onMouseLeave={() => setDoctorPaused(false)} onFocus={() => setDoctorPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setDoctorPaused(false); }}><div className="doctor-carousel-track" ref={doctorTrackRef}>{doctors.map((doctor, index) => <a className="doctor-carousel-card" href={`/likari/${doctor.slug}`} key={doctor.name}><div className="doctor-carousel-photo"><img src={doctorPortraits[index]} alt={`${doctor.name} — ${doctor.role} Active Medical`} loading="lazy" decoding="async" /></div><div className="doctor-carousel-meta"><span className="doctor-number">0{index + 1}</span><div><strong>{doctor.name}</strong><span>{doctor.role}</span></div><ArrowUpRight size={17} /></div></a>)}</div></div></section>

      <section className="quote-section section-pad"><div className="quote-mark">“</div><blockquote>Найкраще лікування — це коли вам спокійно, зрозуміло і хочеться повернутися.</blockquote><p>— команда Active Medical</p></section>

      <section id="booking" className="booking-section section-pad"><div className="booking-aside"><div className="section-kicker">08 / Запис</div><h2>Почнемо<br /><em>з розмови.</em></h2><p>Залиште контакти — адміністратор зателефонує, відповість на запитання та підбере зручний час.</p><div className="booking-contact"><span><Clock3 size={17} /> Пн–Пт, 10:00–18:00</span><span><MessageCircle size={17} /> Viber / Telegram: +380 73 300 77 88</span><a href="tel:+380973201527" className="booking-phone"><Phone size={17} /> +380 97 320 15 27</a><a href="tel:+380951123195" className="booking-phone"><Phone size={17} /> +38 095 112 31 95</a><a href="tel:+380938818409" className="booking-phone"><Phone size={17} /> +38 093 881 84 09</a></div></div><form className="booking-form" onSubmit={async (event) => { event.preventDefault(); setSubmitError(""); const form = new FormData(event.currentTarget); try { await leadMutation.mutateAsync({ name: String(form.get("name") ?? ""), phone: String(form.get("phone") ?? ""), service: String(form.get("service") ?? ""), preferredTime: String(form.get("preferredTime") ?? ""), consent: form.get("consent") === "on" }); setSubmitted(true); event.currentTarget.reset(); } catch { setSubmitError("Не вдалося відправити заявку. Спробуйте ще раз або зателефонуйте нам."); } }}><label>Ваше ім'я<input name="name" required placeholder="Як до вас звертатися?" /></label><label>Номер телефону<input name="phone" required type="tel" placeholder="+380 00 000 00 00" /></label><label>Що вас цікавить?<select name="service" defaultValue=""><option value="" disabled>Оберіть напрямок</option><option>Консультація</option><option>Терапія</option><option>Імплантація</option><option>Ортодонтія</option><option>Дитяча стоматологія</option></select></label><label>Коли вам зручно?<select name="preferredTime" defaultValue=""><option value="" disabled>Оберіть час</option><option>Будь-який час</option><option>10:00–13:00</option><option>13:00–16:00</option><option>16:00–18:00</option></select></label><label className="consent-row"><input type="checkbox" name="consent" required /><span>Погоджуюся на обробку персональних даних</span></label><button className="button button-coral" type="submit" disabled={leadMutation.isPending}>{submitted ? <><Check size={17} /> Дякуємо, ми зателефонуємо</> : leadMutation.isPending ? <>Відправляємо…</> : <>Записатись на консультацію <ArrowUpRight size={17} /></>}</button>{submitError && <small role="alert" className="form-error">{submitError}</small>}<small>Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних.</small></form></section>

      <section id="documents" className="documents-section section-pad"><div className="section-kicker">09 / Документи</div><div className="documents-grid"><div className="documents-intro"><h2>Відкрита<br /><em>медицина.</em></h2><p>Медична практика Active Medical здійснюється на підставі ліцензії Міністерства охорони здоров’я України. Реєстраційні та податкові документи доступні для перегляду за посиланнями нижче.</p><div className="documents-note"><ShieldCheck size={18} /><span>Офіційні документи<br /><b>без зайвих слів.</b></span></div></div><div className="document-cards"><a className="document-card document-card-featured" href={licenseDocument} target="_blank" rel="noreferrer"><span className="document-card-index">01</span><div><strong>Ліцензія на медичну практику</strong><small>Документ МОЗ України · PDF</small></div><ArrowUpRight size={18} /></a><a className="document-card" href={companyExtractDocument} target="_blank" rel="noreferrer"><span className="document-card-index">02</span><div><strong>Витяг з державного реєстру</strong><small>Реєстраційні відомості · PDF</small></div><ArrowUpRight size={18} /></a><a className="document-card" href={vatDocument} target="_blank" rel="noreferrer"><span className="document-card-index">03</span><div><strong>Реєстрація платника ПДВ</strong><small>Офіційний витяг · WEBP</small></div><ArrowUpRight size={18} /></a></div></div></section>

      <section id="contacts" className="contacts-section section-pad"><div className="section-kicker">10 / Контакти</div><div className="contacts-grid"><div><h2>Зустрінемося<br /><em>у Рів'єрі.</em></h2><address><span><MapPin size={17} /> вулиця Лазурна, 5,<br />корпус 10/1</span><a href="tel:+380512777888"><Phone size={17} /> +380 512 777 888</a><a href="tel:+380973201527"><Phone size={17} /> +38 097 320 15 27</a><a href="tel:+380951123195"><Phone size={17} /> +38 095 112 31 95</a><a href="tel:+380938818409"><Phone size={17} /> +38 093 881 84 09</a><span><MessageCircle size={17} /> Листування Viber/Telegram: +380 73 300 77 88</span></address><div className="contact-links"><a href="https://www.google.com/maps/search/?api=1&query=вулиця+Лазурна+5+корпус+10%2F1" target="_blank" rel="noreferrer">Відкрити маршрут <ArrowUpRight size={15} /></a><a href="https://www.instagram.com/stomatologactive/" target="_blank" rel="noreferrer"><Instagram size={16} /> Instagram @stomatologactive</a></div><div className="contact-actions"><a className="contact-action primary" href="tel:+380973201527"><Phone size={16} /> Зателефонувати</a><a className="contact-action" href="viber://chat?number=%2B380733007788"><MessageCircle size={16} /> Написати у Viber</a><a className="contact-action" href="https://t.me/active_medical_bot" target="_blank" rel="noreferrer"><MessageCircle size={16} /> Написати у Telegram</a></div></div><div className="map-card real-map-card"><div className="map-fallback" aria-hidden="true"><div className="map-grid" /><div className="map-pin"><MapPin size={22} fill="currentColor" /><span>Active Medical</span></div></div><MapView className="contact-map" initialCenter={{ lat: 46.94455, lng: 31.93783 }} initialZoom={16} onMapReady={(map) => { const geocoder = new google.maps.Geocoder(); geocoder.geocode({ address: "вулиця Лазурна, 5, корпус 10/1, Миколаїв, Україна" }, (results, status) => { const location = results?.[0]?.geometry.location; if (status === "OK" && location) { map.setCenter(location); new google.maps.marker.AdvancedMarkerElement({ map, position: location, title: "Active Medical" }); } }); }} /><div className="map-label map-label-overlay">Active Medical<br /><small>вулиця Лазурна, 5, корпус 10/1</small></div></div><a className="instagram-qr-card" href="https://www.instagram.com/stomatologactive/" target="_blank" rel="noreferrer"><img src={instagramQr} alt="QR-код для переходу в Instagram Active Medical" loading="lazy" decoding="async" /><span>Скануйте, щоб перейти<br /><b>@stomatologactive</b></span></a></div></section>

      <footer className="footer"><div className="footer-brand"><img src={brandMark} alt="Актив Медікал" /><div><b>Актив</b><span>Медікал</span></div></div><p>Стоматологія, в якій<br />вам спокійно.</p><span className="footer-copy">© 2026 Active Medical</span></footer>
      <button className={`back-to-top ${showBackToTop ? "is-visible" : ""}`} onClick={() => scrollTo("top")} aria-label="Повернутися вгору"><ArrowUp size={19} /></button>
    </main>
  );
}
