import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3, Facebook, Search } from "lucide-react";
import { useState } from "react";
import { Link, useRoute } from "wouter";
import CalmAssistant from "@/components/CalmAssistant";

export type DentalArticle = {
  slug: string;
  category: string;
  title: string;
  lead: string;
  readTime: string;
  date: string;
  accent: "red" | "gray" | "sage";
  sections: { heading: string; paragraphs: string[] }[];
  sources: { label: string; href: string }[];
};

export const dentalArticles: DentalArticle[] = [
  {
    slug: "pershyi-vizyt-dytyny",
    category: "Дітям",
    title: "Перший візит дитини до стоматолога: як зробити його спокійним",
    lead: "Підготовка починається не в кабінеті, а вдома — з чесної розмови, гри та права дитини ставити запитання.",
    readTime: "4 хв читання",
    date: "27 серпня 2026",
    accent: "red",
    sections: [
      { heading: "Не обіцяйте «зовсім не буде боляче»", paragraphs: ["Дитині важливо почути просте й правдиве пояснення: лікар подивиться зуби, розповість, що бачить, і пояснить кожен наступний крок. Так формується довіра без зайвих обіцянок.", "Перед візитом можна пограти в стоматолога, почитати книжку про огляд або разом вибрати маленьку річ, яку дитина візьме із собою."] },
      { heading: "Дайте лікарю знайомитися у своєму темпі", paragraphs: ["На першому прийомі не обов’язково одразу проводити всі процедури. Спокійна розмова, знайомство з кабінетом і поступове звикання можуть бути важливою частиною візиту.", "Якщо дитина має попередній складний досвід, розкажіть про це адміністратору під час запису. Команді буде легше підготувати уважний маршрут зустрічі."] },
    ],
    sources: [
      { label: "NHS: Taking care of children’s teeth", href: "https://www.nhs.uk/live-well/healthy-teeth-and-gums/taking-care-of-childrens-teeth/" },
      { label: "NIDCR: Children’s Oral Health", href: "https://www.nidcr.nih.gov/health-info/childrens-oral-health" },
    ],
  },
  {
    slug: "shchodennyi-dohliad",
    category: "Профілактика",
    title: "Щоденний догляд за зубами: що справді має значення",
    lead: "Регулярні прості дії працюють краще за рідкісні «ідеальні» ритуали. Розбираємо базу без складних слів.",
    readTime: "5 хв читання",
    date: "27 серпня 2026",
    accent: "gray",
    sections: [
      { heading: "М’яко, уважно, регулярно", paragraphs: ["NIDCR радить чистити зуби фторвмісною пастою, приділяючи увагу всім поверхням зубів і лінії ясен. Надмірний тиск не робить чистку ефективнішою: рухи мають бути делікатними.", "Міжзубні проміжки також потребують регулярного очищення. Конкретний інструмент — нитка, йоршик або інший варіант — краще підібрати з лікарем з урахуванням анатомії та стану ясен."] },
      { heading: "Коли потрібна консультація", paragraphs: ["Якщо ясна кровоточать, з’явилася чутливість, біль або змінився стан зубів, домашній догляд не замінює огляд. Лікар допоможе зрозуміти причину та скласти персональний план.", "Ця стаття має інформаційний характер і не є діагнозом або індивідуальною рекомендацією."] },
    ],
    sources: [
      { label: "NIDCR: Oral Hygiene", href: "https://www.nidcr.nih.gov/health-info/oral-hygiene" },
      { label: "NHS: How to keep your teeth clean", href: "https://www.nhs.uk/live-well/healthy-teeth-and-gums/how-to-keep-your-teeth-clean/" },
    ],
  },
  {
    slug: "plan-likuvannya",
    category: "Лікування",
    title: "Як читати план лікування і які питання поставити лікарю",
    lead: "Зрозумілий план — це не лише перелік процедур, а послідовність рішень, пріоритетів і контрольних точок.",
    readTime: "4 хв читання",
    date: "27 серпня 2026",
    accent: "sage",
    sections: [
      { heading: "Попросіть пояснити послідовність", paragraphs: ["На консультації варто запитати, що потрібно зробити в першу чергу, які є варіанти та як змінюється план у кожному з них. Корисно попросити пояснити незнайомі терміни звичайною мовою.", "Остаточний обсяг і вартість лікування визначаються після огляду та необхідної діагностики. Онлайн-стаття не може замінити цей етап."] },
      { heading: "Підготуйте власний список", paragraphs: ["Перед візитом запишіть, що саме вас турбує, коли це почалося та які питання не хочеться забути. Такий список допомагає зробити розмову спокійнішою й предметнішою.", "У Active Medical адміністратор може допомогти зорієнтуватися за напрямком і записати вас на консультацію, а медичні рішення приймаються разом із лікарем після огляду."] },
    ],
    sources: [
      { label: "WHO: Oral health", href: "https://www.who.int/news-room/fact-sheets/detail/oral-health" },
      { label: "ADA: Oral Health Topics", href: "https://www.ada.org/resources/ada-library/oral-health-topics" },
    ],
  },
];

function SiteHeader() {
  return <header className="topbar article-topbar"><Link className="brand" href="/" aria-label="Актив Медікал — на головну"><img src="/manus-storage/active-medical-official-logo_c0e6b7c3.png" alt="Логотип Active Medical" className="brand-mark" width="128" height="64" /><span className="brand-copy"><b>Актив</b><span>Медікал</span></span></Link><nav className="nav-links dental-nav" aria-label="Навігація медіа-розділу"><Link href="/stomatologiya">Стоматологія</Link><Link href="/statti">Статті</Link><Link href="/viddilennia">Відділення</Link><Link className="nav-book" href="/#booking">Записатись на прийом <ArrowUpRight size={15} /></Link></nav><div className="dental-header-phone"><a href="tel:+380512777888">+38 (0512) 777-888</a></div></header>;
}

function ArticleCard({ article, index }: { article: DentalArticle; index: number }) {
  return <Link className={`article-card article-card-${article.accent}`} href={`/statti/${article.slug}`}><div className="article-card-top"><span>0{index + 1}</span><span>{article.category}</span></div><h2>{article.title}</h2><p>{article.lead}</p><div className="article-card-meta"><span><Clock3 size={14} />{article.readTime}</span><ArrowUpRight size={18} /></div></Link>;
}

export default function ArticlesPage() {
  const [, params] = useRoute<{ slug?: string }>("/statti/:slug?");
  const [activeCategory, setActiveCategory] = useState("Усі");
  const selected = params?.slug ? dentalArticles.find((article) => article.slug === params.slug) : undefined;

  if (selected) return <ArticleDetail article={selected} />;

  return <main className="site-shell articles-shell"><SiteHeader /><section className="articles-hero"><div><div className="section-kicker">11 / Медиа</div><h1>Зуби без<br /><em>складних слів.</em></h1><p>Короткі пояснення від команди Active Medical про профілактику, дитячу стоматологію та підготовку до консультації.</p><div className="articles-hero-actions"><a className="button button-coral" href="/#booking">Поставити запитання лікарю <ArrowUpRight size={16} /></a><span><Search size={17} /> Без діагнозів і залякування</span></div></div><div className="articles-hero-note"><span>✦</span><b>Редакційний принцип</b><p>Пояснювати складне спокійно, перевіряти джерела й завжди залишати місце для особистої консультації.</p></div></section><section className="articles-list section-pad"><div className="section-kicker">01 / Обрані матеріали</div><div className="section-heading"><h2>Корисне,<br /><em>коли потрібно.</em></h2><p>Матеріали мають інформаційний характер. Остаточні рішення щодо лікування приймаються після огляду лікаря.</p></div><div className="article-filters" role="tablist" aria-label="Фільтр статей">{["Усі", ...Array.from(new Set(dentalArticles.map((article) => article.category)))].map((category) => <button type="button" role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? "is-active" : ""} onClick={() => setActiveCategory(category)} key={category}>{category}</button>)}</div><div className="article-grid">{dentalArticles.filter((article) => activeCategory === "Усі" || article.category === activeCategory).map((article, index) => <ArticleCard key={article.slug} article={article} index={index} />)}</div></section><section className="articles-social section-pad"><div><div className="section-kicker">02 / Життя клініки</div><h2>Більше відповідей<br /><em>у Facebook.</em></h2><p>Дивіться новини, відео та пояснення команди на офіційній сторінці стоматології Active Medical у Миколаєві.</p></div><a className="button button-coral" href="https://www.facebook.com/p/%D0%A1%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%8F-%D0%90%D0%BA%D1%82%D0%B8%D0%B2-%D0%9C%D0%B5%D0%B4%D1%96%D0%BA%D0%B0%D0%BB-%D0%9C%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D1%97%D0%B2-61558068189082/" target="_blank" rel="noreferrer"><Facebook size={17} /> Відкрити Facebook <ArrowUpRight size={16} /></a></section><footer className="footer"><Link className="footer-brand" href="/"><img src="/manus-storage/active-medical-official-logo_c0e6b7c3.png" alt="Актив Медікал" /><div><b>Актив</b><span>Медікал</span></div></Link><p>Стоматологія, в якій<br />вам спокійно.</p><span className="footer-copy">© 2026 Active Medical</span></footer><CalmAssistant /></main>;
}

function ArticleDetail({ article }: { article: DentalArticle }) {
  return <main className="site-shell article-detail-shell"><SiteHeader /><article className={`article-detail article-detail-${article.accent}`}><Link className="article-back" href="/statti"><ArrowLeft size={16} /> Усі статті</Link><div className="article-detail-kicker"><span>{article.category}</span><span><CalendarDays size={14} />{article.date}</span></div><h1>{article.title}</h1><p className="article-detail-lead">{article.lead}</p><div className="article-detail-meta"><Clock3 size={15} />{article.readTime}<span>·</span> Інформаційний матеріал Active Medical</div><div className="article-detail-layout"><div className="article-body">{article.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}<aside className="article-disclaimer">Матеріал не є діагнозом і не замінює консультацію лікаря. Якщо вас турбує біль, набряк, кровотеча або інша зміна стану, зверніться до стоматолога.</aside><h2>Джерела для самостійного читання</h2><div className="article-sources">{article.sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer">{source.label} <ArrowUpRight size={14} /></a>)}</div></div><aside className="article-detail-aside"><div className="article-aside-mark">✦</div><b>Залишились питання?</b><p>Запишіть їх перед консультацією — так розмова з лікарем буде спокійнішою та змістовнішою.</p><a className="button button-coral" href="/#booking">Записатись <ArrowUpRight size={16} /></a></aside></div></article></main>;
}
