import { ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";
import { MapView } from "@/components/Map";

const branches = [
  {
    number: "01",
    name: "Відділення №1",
    address: "Миколаїв, пр. Центральний, 71-А (по вулиці Соборній)",
    hours: ["Понеділок–п’ятниця: 09:00–18:00", "За попереднім записом"],
    query: "проспект Центральний 71-А Миколаїв Україна",
  },
  {
    number: "02",
    name: "Відділення №2",
    address: "Миколаїв, вул. Галини Петрової, 2/1",
    hours: ["Понеділок–п’ятниця: 09:00–19:00", "Субота: 09:00–14:00"],
    query: "вулиця Галини Петрової 2/1 Миколаїв Україна",
  },
  {
    number: "03",
    name: "Стоматологія",
    address: "Миколаїв, вул. Лазурна, 5, корпус 10/1, ЖК «Рив’єра»",
    hours: ["Понеділок–п’ятниця: 10:00–18:00", "За попереднім записом"],
    query: "вулиця Лазурна 5 корпус 10/1 Миколаїв Україна",
  },
];

export default function BranchesPage() {
  return (
    <main className="site-shell branches-shell">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="Актив Медікал — на головну">
          <img src="/manus-storage/active-medical-official-logo_c0e6b7c3.png" alt="Логотип Active Medical" className="brand-mark" width="128" height="64" />
          <span className="brand-copy"><b>Актив</b><span>Медікал</span></span>
        </Link>
        <nav className="nav-links dental-nav" aria-label="Навігація сторінки відділень">
          <Link href="/stomatologiya">Стоматологія</Link>
          <a href="#branches">Відділення</a>
          <a href="#map">Карта</a>
          <Link className="nav-book" href="/#booking">Записатись на прийом <ArrowUpRight size={15} /></Link>
        </nav>
        <a className="dental-header-phone" href="tel:+380512777888"><span>+38 (0512) 777-888</span></a>
      </header>

      <section className="branches-hero">
        <div className="branches-hero-copy"><div className="section-kicker">10 / Відділення</div><h1>Active Medical<br /><em>поруч.</em></h1><p>Три відділення в Миколаєві, щоб отримувати медичну допомогу в зручному для вас місці. Оберіть адресу та зв’яжіться з адміністратором.</p><a className="button button-coral" href="tel:+380512777888"><Phone size={16} /> Гаряча лінія</a></div><div className="branches-hero-mark" aria-hidden="true"><img src="/manus-storage/active-medical-official-logo_c0e6b7c3.png" alt="" /><b>03</b><small>локації<br />Active Medical</small></div>
      </section>

      <section id="branches" className="branches-list section-pad"><div className="section-kicker">01 / Адреси</div><div className="section-heading"><h2>Оберіть<br /><em>своє відділення.</em></h2><p>Актуальні адреси та графіки роботи з офіційної сторінки Active Medical.</p></div><div className="branch-card-grid">{branches.map((branch) => <article className={`branch-card branch-card-${branch.number}`} key={branch.number}><div className="branch-card-top"><span>{branch.number}</span><MapPin size={20} /></div><h3>{branch.name}</h3><p className="branch-address">{branch.address}</p><div className="branch-hours">{branch.hours.map((hour) => <span key={hour}><Clock3 size={15} />{hour}</span>)}</div><a className="text-button" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.query)}`} target="_blank" rel="noreferrer">Прокласти маршрут <ArrowUpRight size={16} /></a></article>)}</div></section>

      <section id="map" className="branches-map-section section-pad"><div className="section-kicker">02 / Карта</div><div className="branches-map-grid"><div><h2>Знайти<br /><em>Active Medical.</em></h2><p>На карті показано стоматологічне відділення на Лазурній. Для інших адрес відкрийте маршрут у потрібній картографічній службі з картки відділення.</p><a className="text-button" href="tel:+380512777888"><Phone size={16} /> +38 (0512) 777-888</a></div><div className="branches-map-card"><MapView className="branches-map" initialCenter={{ lat: 46.94455, lng: 31.93783 }} initialZoom={15} /><div className="branches-map-label"><b>Стоматологія</b><span>Лазурна, 5 · корпус 10/1</span></div></div></div></section>

      <footer className="footer"><Link className="footer-brand" href="/"><img src="/manus-storage/active-medical-official-logo_c0e6b7c3.png" alt="Актив Медікал" /><div><b>Актив</b><span>Медікал</span></div></Link><p>Стоматологія, в якій<br />вам спокійно.</p><span className="footer-copy">© 2026 Active Medical</span></footer>
    </main>
  );
}
