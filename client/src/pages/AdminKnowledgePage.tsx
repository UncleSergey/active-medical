import { useMemo, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";
import { Check, Edit3, Eye, LockKeyhole, Plus, Search, Archive, Save, X } from "lucide-react";

type EntryForm = {
  id?: number;
  slug: string;
  title: string;
  category: string;
  content: string;
  sourceUrl: string;
  sourceLabel: string;
  status: "draft" | "published" | "archived";
  sortOrder: number;
};

const emptyForm: EntryForm = { slug: "", title: "", category: "Загальне", content: "", sourceUrl: "", sourceLabel: "", status: "draft", sortOrder: 0 };

export default function AdminKnowledgePage() {
  const { user, loading } = useAuth();
  const utils = trpc.useUtils();
  const entriesQuery = trpc.assistant.adminList.useQuery(undefined, { enabled: user?.role === "admin", retry: false });
  const createMutation = trpc.assistant.adminCreate.useMutation({ onSuccess: () => { utils.assistant.adminList.invalidate(); setForm(emptyForm); setEditing(false); } });
  const updateMutation = trpc.assistant.adminUpdate.useMutation({ onSuccess: () => { utils.assistant.adminList.invalidate(); setForm(emptyForm); setEditing(false); } });
  const statusMutation = trpc.assistant.adminSetStatus.useMutation({ onSuccess: () => utils.assistant.adminList.invalidate() });
  const previewMutation = trpc.assistant.adminPreview.useMutation();
  const [form, setForm] = useState<EntryForm>(emptyForm);
  const [editing, setEditing] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | EntryForm["status"]>("all");
  const [previewQuestion, setPreviewQuestion] = useState("Що важливо знати пацієнту з цього питання?");

  const entries = useMemo(() => (entriesQuery.data ?? []).filter((entry) => {
    const haystack = `${entry.title} ${entry.category} ${entry.content}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (statusFilter === "all" || entry.status === statusFilter);
  }), [entriesQuery.data, query, statusFilter]);

  const preview = () => {
    if (!form.title.trim() || !form.category.trim() || form.content.trim().length < 10) return;
    previewMutation.mutate({ title: form.title, category: form.category, content: form.content, question: previewQuestion });
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const payload = { ...form, sourceUrl: form.sourceUrl || undefined, sourceLabel: form.sourceLabel || undefined, sortOrder: Number(form.sortOrder) || 0 };
    if (editing && form.id) updateMutation.mutate({ ...payload, id: form.id });
    else createMutation.mutate(payload);
  };

  if (loading) return <main className="admin-knowledge-shell"><div className="admin-state">Перевіряємо доступ…</div></main>;
  if (!user) return <main className="admin-knowledge-shell"><div className="admin-state"><LockKeyhole size={22} /><h1>Вхід адміністратора</h1><p>Панель бази знань доступна лише авторизованим користувачам.</p><button className="button button-coral" onClick={() => startLogin()}>Увійти</button></div></main>;
  if (user.role !== "admin") return <main className="admin-knowledge-shell"><div className="admin-state"><LockKeyhole size={22} /><h1>Доступ обмежено</h1><p>Ваш обліковий запис не має прав адміністратора.</p><a className="text-button" href="/">Повернутися на сайт</a></div></main>;

  return <main className="admin-knowledge-shell">
    <header className="admin-knowledge-header"><div><div className="section-kicker">12 / Admin</div><h1>База знань<br /><em>без коду.</em></h1><p>Оновлюйте факти для AI-помічника. У відповіді потрапляють лише записи зі статусом «Опубліковано».</p></div><a className="text-button" href="/">На сайт <X size={15} /></a></header>
    <section className="admin-knowledge-layout">
      <form className="admin-knowledge-editor" onSubmit={submit}>
        <div className="admin-panel-heading"><div><span className="admin-panel-kicker">{editing ? "Редагування" : "Нова відповідь"}</span><h2>{editing ? "Змінити запис" : "Додати факт"}</h2></div>{editing && <button type="button" className="icon-button" aria-label="Скасувати редагування" onClick={() => { setForm(emptyForm); setEditing(false); }}><X size={16} /></button>}</div>
        <label>Короткий slug<input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="implantatsiya" pattern="[a-z0-9-]+" /></label>
        <label>Заголовок<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Імплантація зубів" /></label>
        <div className="admin-form-row"><label>Категорія<input required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Послуги" /></label><label>Порядок<input type="number" min="0" max="9999" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} /></label></div>
        <label>Текст для AI<textarea required minLength={10} maxLength={12000} rows={8} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Тільки перевірений факт, який можна безпечно повідомити пацієнту…" /></label>
        <label>URL джерела<input type="url" value={form.sourceUrl} onChange={(e) => setForm({ ...form, sourceUrl: e.target.value })} placeholder="https://..." /></label>
        <label>Назва джерела<input value={form.sourceLabel} onChange={(e) => setForm({ ...form, sourceLabel: e.target.value })} placeholder="Офіційний сайт Active Medical" /></label>
        <label>Статус<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as EntryForm["status"] })}><option value="draft">Чернетка</option><option value="published">Опубліковано</option><option value="archived">Архів</option></select></label>
        <div className="admin-editor-actions"><button className="button button-outline" type="button" onClick={preview} disabled={previewMutation.isPending || !form.title.trim() || !form.category.trim() || form.content.trim().length < 10}><Eye size={16} /> {previewMutation.isPending ? "Готуємо preview…" : "Предпросмотр ответа AI"}</button><button className="button button-coral" type="submit" disabled={createMutation.isPending || updateMutation.isPending}><Save size={16} /> {editing ? "Зберегти зміни" : "Створити запис"}</button></div>
        <label>Тестове питання для preview<input value={previewQuestion} onChange={(e) => setPreviewQuestion(e.target.value)} maxLength={600} /></label>
        {(createMutation.isError || updateMutation.isError) && <p className="admin-error">Не вдалося зберегти запис. Перевірте поля та спробуйте ще раз.</p>}
        {previewMutation.isError && <p className="admin-error">Не вдалося підготувати preview. Запис не змінено.</p>}
        {previewMutation.data && <div className="admin-preview-card" aria-live="polite"><div className="admin-preview-label"><Eye size={14} /> Preview · не публікує запис</div><p>{previewMutation.data.text}</p></div>}
      </form>
      <section className="admin-knowledge-list"><div className="admin-list-toolbar"><div><span className="admin-panel-kicker">{entries.length} записів</span><h2>Контент AI</h2></div><button type="button" className="button button-outline" onClick={() => { setForm(emptyForm); setEditing(false); }}><Plus size={16} /> Новий</button></div><div className="admin-filters"><label className="admin-search"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Пошук у базі…" aria-label="Пошук у базі знань" /></label><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)} aria-label="Фільтр за статусом"><option value="all">Усі статуси</option><option value="published">Опубліковані</option><option value="draft">Чернетки</option><option value="archived">Архів</option></select></div><div className="admin-entry-list">{entriesQuery.isLoading ? <div className="admin-empty">Завантаження…</div> : entries.length === 0 ? <div className="admin-empty">Записів не знайдено.</div> : entries.map((entry) => <article className="admin-entry-card" key={entry.id}><div className="admin-entry-top"><span className={`admin-status status-${entry.status}`}>{entry.status === "published" ? "Опубліковано" : entry.status === "draft" ? "Чернетка" : "Архів"}</span><span>#{entry.sortOrder}</span></div><h3>{entry.title}</h3><p className="admin-entry-category">{entry.category} · {entry.slug}</p><p>{entry.content}</p>{entry.sourceUrl && <a href={entry.sourceUrl} target="_blank" rel="noreferrer">{entry.sourceLabel || entry.sourceUrl}</a>}<div className="admin-entry-actions"><button type="button" className="text-button" onClick={() => { setForm({ ...entry, sourceUrl: entry.sourceUrl ?? "", sourceLabel: entry.sourceLabel ?? "" }); setEditing(true); }}><Edit3 size={14} /> Редагувати</button>{entry.status !== "published" && <button type="button" className="text-button" disabled={statusMutation.isPending} onClick={() => statusMutation.mutate({ id: entry.id, status: "published" })}><Check size={14} /> Опублікувати</button>}{entry.status !== "archived" && <button type="button" className="text-button text-button-danger" disabled={statusMutation.isPending} onClick={() => statusMutation.mutate({ id: entry.id, status: "archived" })}><Archive size={14} /> Архівувати</button>}</div></article>)}</div></section>
    </section>
  </main>;
}
