import { ArrowLeft, ArrowUpRight, MapPin, Phone } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useEffect } from "react";
import { priceCategories } from "@/data/pricelist";

export type ServicePageData = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  points: string[];
  categoryTitles: string[];
};

export const servicePages: ServicePageData[] = [
  {
    slug: "dityacha-stomatolohiya",
    title: "Дитяча стоматологія в Миколаєві",
    shortTitle: "Дитяча стоматологія",
    description: "Дитяча стоматологія Active Medical у Миколаєві: консультація, лікування молочних зубів, профілактика та ортодонтичний супровід.",
    intro: "Допомагаємо дитині знайомитися зі стоматологією спокійно: пояснюємо кожен крок, працюємо у комфортному темпі та залучаємо батьків до зрозумілого плану.",
    points: ["Діагностичний прийом дитячого стоматолога", "Професійна дитяча гігієна", "Лікування карієсу молочних зубів", "Підтримка дітей, яким потрібен особливий підхід"],
    categoryTitles: ["Дитяча стоматологія", "Наркоз загальний"]
  },
  {
    slug: "terapevtychna-stomatolohiya",
    title: "Терапевтична стоматологія в Миколаєві",
    shortTitle: "Терапевтична стоматологія",
    description: "Терапевтична стоматологія Active Medical у Миколаєві: діагностика та лікування карієсу, відновлення зубів і зрозумілий план лікування.",
    intro: "Терапевтичне лікування починається з діагностики та розмови. Ми пояснюємо варіанти й погоджуємо план до початку роботи.",
    points: ["Первинна консультація лікаря-стоматолога", "Лікування поверхневого, середнього та глибокого карієсу", "Відновлення анатомії та функції зуба", "Профілактика повторних проблем"],
    categoryTitles: ["Консультаційно-діагностичні послуги", "Терапевтичне лікування"]
  },
  {
    slug: "ortodontiya",
    title: "Ортодонтія в Миколаєві",
    shortTitle: "Ортодонтія",
    description: "Ортодонтія Active Medical у Миколаєві: брекет-системи, ортодонтичні апарати, пластинки та ретенційний етап лікування.",
    intro: "Ортодонтичний план формується після огляду та діагностики. Ми підбираємо рішення відповідно до віку, клінічної ситуації та цілей пацієнта.",
    points: ["Металеві брекет-системи", "Самолігуючі брекет-системи", "Ортодонтичні пластини та апарати", "Ретенційний етап після активного лікування"],
    categoryTitles: ["Ортодонтія"]
  },
  {
    slug: "implantatsiya",
    title: "Імплантація зубів у Миколаєві",
    shortTitle: "Імплантація",
    description: "Імплантація зубів Active Medical у Миколаєві: консультація імплантолога, планування та хірургічний етап за показаннями.",
    intro: "Імплантація потребує індивідуального планування. На консультації лікар оцінює ситуацію та пояснює можливі етапи лікування.",
    points: ["Первинна консультація лікаря-імплантолога", "Планування імплантації", "Імплантаційні системи з чинного прайсу", "За потреби — підготовка кісткової тканини"],
    categoryTitles: ["Імплантологія", "Хірургічна щелепно-лицьова"]
  },
  {
    slug: "protezyvannya",
    title: "Протезування зубів у Миколаєві",
    shortTitle: "Протезування",
    description: "Протезування зубів Active Medical у Миколаєві: ортопедична консультація, коронки, конструкції та відновлення функції зубів.",
    intro: "Ортопедичне лікування починається з оцінки стану зубів і узгодження цілей. Лікар пояснює варіанти конструкцій і послідовність етапів.",
    points: ["Первинна консультація лікаря-стоматолога-ортопеда", "Коронки та ортопедичні конструкції", "Відновлення функції зубів", "Протезування на імплантах за показаннями"],
    categoryTitles: ["Ортопедія"]
  },
  {
    slug: "likuvannya-kanaliv",
    title: "Лікування кореневих каналів у Миколаєві",
    shortTitle: "Лікування каналів",
    description: "Лікування та переліковування кореневих каналів у Active Medical у Миколаєві: ендодонтична допомога при пульпіті та періодонтиті.",
    intro: "Ендодонтичне лікування потребує точної діагностики та послідовної роботи з каналами. Остаточний план визначається після огляду.",
    points: ["Зняття гострого болю", "Первинне ендодонтичне лікування одноканального зуба", "Лікування періодонтиту", "Переліковування кореневих каналів"],
    categoryTitles: ["Лікування та переліковування кореневих каналів"]
  },
  {
    slug: "profesiyna-hihiyena",
    title: "Професійна гігієна зубів у Миколаєві",
    shortTitle: "Професійна гігієна",
    description: "Професійна гігієна зубів Active Medical у Миколаєві: комплексне видалення відкладень, AirFlow, ультразвук, полірування та фторування.",
    intro: "Професійна гігієна допомагає підтримувати чистоту зубів і ясен. Конкретний обсяг процедури лікар визначає після огляду.",
    points: ["Комплексне видалення зубних відкладень", "AirFlow", "Ультразвуковий скейлер", "Полірування та фторування"],
    categoryTitles: ["Професійна гігієна порожнини рота"]
  },
  {
    slug: "khirurhichna-stomatolohiya",
    title: "Хірургічна стоматологія в Миколаєві",
    shortTitle: "Хірургічна стоматологія",
    description: "Хірургічна стоматологія Active Medical у Миколаєві: видалення зубів, зубів мудрості та щелепно-лицеві хірургічні втручання за показаннями.",
    intro: "Хірургічне лікування починається з огляду та діагностики. Лікар пояснює показання, варіанти втручання та подальший догляд.",
    points: ["Просте видалення зуба", "Видалення зуба мудрості", "Атипове видалення зуба мудрості", "Кісткова пластика та інші втручання за показаннями"],
    categoryTitles: ["Хірургічна стоматологія", "Хірургічна щелепно-лицьова"]
  }
];

function setMeta(name: string, content: string) {
  const attribute = name.startsWith("og:") ? "property" : "name";
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export default function ServicePage({ page }: { page: ServicePageData }) {
  const [, navigate] = useLocation();
  const canonical = `${window.location.origin}/${page.slug}`;
  const categories = page.categoryTitles.flatMap((title) => {
    const category = priceCategories.find((item) => item.title === title);
    return category ? [{ title: category.title, items: category.items.slice(0, 6) }] : [];
  });

  useEffect(() => {
    document.title = `${page.title} | Active Medical`;
    setMeta("description", page.description);
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonical);
    setMeta("og:title", `${page.title} | Active Medical`);
    setMeta("og:description", page.description);
    setMeta("og:url", canonical);
    return () => {
      document.title = "Стоматологія Active Medical у Миколаєві | Лікування зубів";
    };
  }, [canonical, page.description, page.title]);

  return (
    <main className="service-page">
      <header className="service-page-header">
        <Link href="/" className="service-page-brand">Active Medical</Link>
        <Link href="/" className="service-page-back"><ArrowLeft size={16} /> На головну</Link>
      </header>
      <article className="service-page-content">
        <div className="section-kicker">Active Medical / Миколаїв / Намив</div>
        <h1>{page.title}</h1>
        <p className="service-page-lead">{page.intro}</p>
        <div className="service-page-grid">
          <section>
            <h2>Що входить у напрямок</h2>
            <ul>{page.points.map((point) => <li key={point}>{point}</li>)}</ul>
          </section>
          <aside className="service-page-contact">
            <MapPin size={20} />
            <strong>Ми на Намиві</strong>
            <span>ЖК «Рів'єра», вул. Лазурна, 5, корпус 10/1, Миколаїв</span>
            <a href="tel:+380973201527"><Phone size={16} /> +38 097 320 15 27</a>
            <button className="button button-coral" onClick={() => navigate("/#booking")}>Записатись на консультацію <ArrowUpRight size={16} /></button>
          </aside>
        </div>
        {categories.length > 0 && <section className="service-page-prices">
          <h2>Позиції з актуального прайсу</h2>
          <p>Ціни наведені для орієнтації. Остаточний план і вартість лікар визначає після огляду та консультації.</p>
          {categories.map((category) => <div className="service-page-price-group" key={category.title}><h3>{category.title}</h3>{category.items.map((item) => <div className="service-page-price-row" key={item.name}><span>{item.name}</span><b>{item.price ? `${item.price} грн` : "уточнюйте"}</b></div>)}</div>)}
        </section>}
        <section className="service-page-final-cta">
          <h2>{page.shortTitle} в Active Medical</h2>
          <p>Залиште заявку — адміністратор відповість на запитання та підбере зручний час.</p>
          <button className="button button-coral" onClick={() => navigate("/#booking")}>Залишити заявку <ArrowUpRight size={16} /></button>
        </section>
      </article>
    </main>
  );
}
