import { ArrowLeft, ArrowUpRight, MapPin, Phone } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useEffect } from "react";

export type DoctorPageData = {
  slug: string;
  name: string;
  role: string;
  image: string;
  description: string;
  areas: string[];
  related: Array<{ label: string; href: string }>;
};

export const doctorPages: DoctorPageData[] = [
  {
    slug: "mezinova-alina-vitaliyivna",
    name: "Мезінова Аліна Віталіївна",
    role: "Лікар-стоматолог · дитяча стоматологія · ортодонтія",
    image: "/manus-storage/alina-mezinova-color-scrubs-new_22ddf932.png",
    description: "Мезінова Аліна Віталіївна — лікар-стоматолог Active Medical у Миколаєві. Дитяча стоматологія, ортодонтія та лікування дітей, яким потрібен особливий підхід.",
    areas: ["Дитяча стоматологія", "Ортодонтія та ортодонтичні апарати", "Лікування карієсу та його ускладнень", "Високохудожня реставрація зубів", "Лікування дітей, які потребують особливого підходу", "Стоматологічне лікування під медикаментозним сном"],
    related: [{ label: "Дитяча стоматологія", href: "/dityacha-stomatolohiya" }, { label: "Ортодонтія", href: "/ortodontiya" }]
  },
  {
    slug: "dyachenko-yuliya-andriyivna",
    name: "Диченко Юлія Андріївна",
    role: "Щелепно-лицевий хірург",
    image: "/manus-storage/yuliia-standing-option-balanced-head_4c568e66.png",
    description: "Диченко Юлія Андріївна — щелепно-лицевий хірург Active Medical у Миколаєві. Хірургічна стоматологія та реконструктивні втручання за показаннями.",
    areas: ["Хірургічна стоматологія", "Кісткова пластика та синус-ліфтинг", "Складні видалення", "Лікування кіст та новоутворень", "Щелепно-лицеві травми", "Реконструктивна хірургія"],
    related: [{ label: "Хірургічна стоматологія", href: "/khirurhichna-stomatolohiya" }, { label: "Імплантація", href: "/implantatsiya" }]
  },
  {
    slug: "pohulych-yaroslav-yevhenovych",
    name: "Погулич Ярослав Євгенович",
    role: "Імплантолог · хірург · ортопед",
    image: "/manus-storage/pohulych-yaroslav-color-scrubs-new_e4e3f887.png",
    description: "Погулич Ярослав Євгенович — імплантолог, хірург і ортопед Active Medical у Миколаєві. Імплантація, протезування та хірургічна стоматологія.",
    areas: ["Імплантація", "Протезування на імплантах", "Коронки та мостоподібні конструкції", "Видалення зубів", "Ортопедична та хірургічна стоматологія"],
    related: [{ label: "Імплантація", href: "/implantatsiya" }, { label: "Протезування", href: "/protezyvannya" }]
  },
  {
    slug: "fedorov-ivan-mykhaylovych",
    name: "Федоров Іван Михайлович",
    role: "Лікар-стоматолог · терапевтична, ендодонтична та ортопедична стоматологія",
    image: "/manus-storage/fedorov-ivan-light-gray-scrubs_b178ecf8.png",
    description: "Федоров Іван Михайлович — лікар-стоматолог Active Medical у Миколаєві. Лікування карієсу, ендодонтичне лікування та ортопедичне відновлення зубів.",
    areas: ["Терапевтична стоматологія", "Ендодонтія", "Лікування карієсу та його ускладнень", "Лікування пульпітів і періодонтитів", "Відновлення анатомії та функції зубів", "Ортопедичне протезування"],
    related: [{ label: "Терапевтична стоматологія", href: "/terapevtychna-stomatolohiya" }, { label: "Лікування каналів", href: "/likuvannya-kanaliv" }, { label: "Протезування", href: "/protezyvannya" }]
  }
];

export default function DoctorPage({ doctor }: { doctor: DoctorPageData }) {
  const [, navigate] = useLocation();
  const canonical = `${window.location.origin}/likari/${doctor.slug}`;

  useEffect(() => {
    document.title = `${doctor.name} | ${doctor.role} | Active Medical`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", doctor.description);
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonical);
    const setMeta = (attribute: "name" | "property", key: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      if (!element) { element = document.createElement("meta"); element.setAttribute(attribute, key); document.head.appendChild(element); }
      element.setAttribute("content", content);
    };
    const title = `${doctor.name} | ${doctor.role} | Active Medical`;
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", doctor.description);
    setMeta("property", "og:url", canonical);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", doctor.description);
    setMeta("name", "twitter:url", canonical);
    return () => { document.title = "Стоматологія Active Medical у Миколаєві | Лікування зубів"; };
  }, [canonical, doctor.description, doctor.name]);

  return (
    <main className="doctor-page service-page">
      <header className="service-page-header"><Link href="/" className="service-page-brand">Active Medical</Link><Link href="/" className="service-page-back"><ArrowLeft size={16} /> На головну</Link></header>
      <article className="doctor-page-content service-page-content">
        <div className="section-kicker">Active Medical / Команда / Миколаїв</div>
        <div className="doctor-page-hero"><div><h1>{doctor.name}</h1><p className="service-page-lead">{doctor.role}</p><p>{doctor.description}</p><button className="button button-coral" onClick={() => navigate("/#booking")}>Записатись на консультацію <ArrowUpRight size={16} /></button></div><img src={doctor.image} alt={`${doctor.name} — ${doctor.role} в Active Medical`} loading="eager" /></div>
        <section className="doctor-page-grid"><div><h2>Напрями роботи</h2><ul>{doctor.areas.map((area) => <li key={area}>{area}</li>)}</ul></div><aside className="service-page-contact"><MapPin size={20} /><strong>Прийом у Миколаєві</strong><span>Намив, ЖК «Рів'єра», вул. Лазурна, 5, корпус 10/1</span><a href="tel:+380973201527"><Phone size={16} /> +38 097 320 15 27</a><button className="button button-coral" onClick={() => navigate("/#booking")}>Залишити заявку <ArrowUpRight size={16} /></button></aside></section>
        <section className="doctor-page-related"><h2>Пов’язані напрямки</h2><div>{doctor.related.map((item) => <Link key={item.href} href={item.href}>{item.label} <ArrowUpRight size={15} /></Link>)}</div></section>
      </article>
    </main>
  );
}
