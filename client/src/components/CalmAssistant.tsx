import { MessageCircle, Send, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";

type ChatMessage = { role: "user" | "assistant"; content: string };

const starterMessage: ChatMessage = {
  role: "assistant",
  content: "Вітаю. Я допоможу зорієнтуватися в послугах Active Medical, підготуватися до візиту або знайти сторінку для запису. Я не ставлю діагнозів і не замінюю лікаря.",
};

const suggestions = ["Як підготувати дитину до першого візиту?", "Які є напрямки стоматології?", "Як записатися на консультацію?"];

export default function CalmAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([starterMessage]);
  const askMutation = trpc.assistant.ask.useMutation({
    onSuccess: ({ text }, variables) => setMessages((current) => [...current, { role: "user", content: variables.message }, { role: "assistant", content: text }]),
  });

  const send = (value = input) => {
    const message = value.trim();
    if (!message || askMutation.isPending) return;
    setInput("");
    askMutation.mutate({ message, history: messages.slice(-8) });
  };

  return <>
    {open && <section id="calm-assistant-panel" className="calm-assistant-panel" aria-label="AI-помічник Active Medical">
      <div className="calm-assistant-head"><div><span className="calm-assistant-kicker"><Sparkles size={13} /> Active Medical</span><strong>Спокійний навігатор</strong></div><button type="button" className="calm-assistant-close" onClick={() => setOpen(false)} aria-label="Закрити AI-помічник"><X size={17} /></button></div>
      <div className="calm-assistant-messages" aria-live="polite">{messages.map((message, index) => <div className={`calm-assistant-message ${message.role}`} key={`${message.role}-${index}`}>{message.content}</div>)}{askMutation.isPending && <div className="calm-assistant-message assistant">Думаю над відповіддю…</div>}{askMutation.isError && <div className="calm-assistant-error">Не вдалося отримати відповідь. Спробуйте ще раз або зателефонуйте +38 (0512) 777-888.</div>}</div>
      {messages.length === 1 && <div className="calm-assistant-suggestions">{suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => send(suggestion)}>{suggestion}</button>)}</div>}
      <form className="calm-assistant-form" onSubmit={(event) => { event.preventDefault(); send(); }}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Напишіть запитання…" aria-label="Запитання для AI-помічника" maxLength={600} /><button type="submit" aria-label="Надіслати запитання" disabled={!input.trim() || askMutation.isPending}><Send size={16} /></button></form>
      <p className="calm-assistant-disclaimer">Загальна інформація, не діагноз і не заміна консультації лікаря.</p>
    </section>}
    <button type="button" className={`calm-assistant-trigger ${open ? "is-open" : ""}`} onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="calm-assistant-panel"><MessageCircle size={19} /><span>{open ? "Закрити" : "Поставити запитання"}</span></button>
  </>;
}
