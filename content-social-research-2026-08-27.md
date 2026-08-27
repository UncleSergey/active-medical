# Content and social research — 2026-08-27

## Official Facebook

The public Facebook page found for the dental clinic is [Стоматологія Актив Медікал Миколаїв](https://www.facebook.com/p/%D0%A1%D1%82%D0%BE%D0%BC%D0%B0%D1%82%D0%BE%D0%BB%D0%BE%D0%B3%D1%96%D1%8F-%D0%90%D0%BA%D1%82%D0%B8%D0%B2-%D0%9C%D0%B5%D0%B4%D1%96%D0%BA%D0%B0%D0%BB-%D0%9C%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D1%97%D0%B2-61558068189082/) with numeric page ID `61558068189082`. The page title is “Стоматологія Актив Медікал Миколаїв”; the public view showed approximately 1.1K followers and 10 following. It lists the dental address as Лазурная, 5, корпус 10/1, ЖК «Ривьера», and public phone contacts including +380 512 777 888 and +380 73 300 7788. Facebook also displayed “Not yet rated (0 Reviews)”; this must not be converted into a rating or testimonial on the clinic website.

## Official Active Medical website

The official contacts page is [active-medical.ua/contacts](https://active-medical.ua/contacts/). Its public social links include [facebook.com/activemedical.ua](https://www.facebook.com/activemedical.ua/), [Instagram](https://www.instagram.com/activemedical.mk), and [YouTube](https://www.youtube.com/channel/UCpIetBid1-e4kU1exQkBiYQ). The official contacts page lists the hotline +38 (0512) 777-888, three Mykolaiv locations, weekday/weekend hours, and info@active-medical.ua.

## Product implication

The website should use the exact dental Facebook page as the primary CTA for the dental microsite, while optionally showing the broader Active Medical corporate page as a secondary link. A static social card with verified name, location, phone, and “Відкрити Facebook” is safer than embedding a dynamic Facebook feed, because Facebook login/privacy restrictions can make embedded feeds unreliable and the site should not fabricate post counts, reviews, or ratings.

## Initial editorial direction

Start with evergreen, reviewed-by-a-dentist explainers: preparation for a first visit, children’s adaptation, professional hygiene, what an orthodontic consultation includes, when a tooth needs urgent attention, and how treatment plans and costs are determined. Each article needs an author/reviewer label, publication/update date, sources where applicable, and a clear “інформація не замінює консультацію лікаря” notice.

## Source verification

The NHS children’s-teeth page and the U.S. National Institute of Dental and Craniofacial Research oral-hygiene page were opened directly for source verification. NIDCR explains that plaque is a bacterial film associated with tooth decay and gum disease, recommends fluoride toothpaste and gentle brushing of all tooth surfaces, and discusses cleaning between teeth. The NHS child-care page is the source candidate for age-appropriate children’s brushing guidance. These recommendations should be paraphrased carefully in Ukrainian, linked to the original sources, and presented as general education rather than personal treatment advice.

References:

1. [NHS — Children's teeth](https://www.nhs.uk/live-well/healthy-teeth-and-gums/taking-care-of-childrens-teeth/)
2. [NIDCR — Oral Hygiene](https://www.nidcr.nih.gov/health-info/oral-hygiene)
3. [WHO — Oral health](https://www.who.int/news-room/fact-sheets/detail/oral-health)

## AI and article UX QA

The preview at `/statti` shows the new “Поставити запитання” assistant trigger, the category tablist (`Усі`, `Дітям`, `Профілактика`, `Лікування`), three article cards, and the verified Facebook CTA. The assistant is positioned as a utility layer and does not display fabricated chat answers; it starts with a clearly labelled informational greeting and disclaimer. Target assistant/article tests pass 7/7 together, TypeScript passes, and the production build passes.

A browser DOM check located `.calm-assistant-trigger` on `/statti` and dispatched its click handler. The immediate same-tick result reported `open: false`, which is expected to be inconclusive for a React state update before the next render; no runtime exception occurred. A delayed DOM check is still needed if interactive assistant opening is required before the next checkpoint.

Delayed browser QA confirmed the assistant opens correctly after the React state update: `#calm-assistant-panel` is present, its heading is “Спокійний навігатор”, and the input field is rendered. No runtime exception occurred.

Interactive smoke-test: selecting the quick prompt “Як підготувати дитину до першого візиту?” kept the user on `/statti` and rendered the assistant loading state “Думаю над відповіддю…”. The request was sent through the tRPC assistant endpoint; the panel remained accessible and showed its disclaimer.

Final interactive smoke-test: the quick prompt returned an Ukrainian answer in the assistant panel, kept the user on `/statti`, and preserved the medical disclaimer. The response is clearly informational and includes a pointer to the clinic booking path/phone rather than a diagnosis.

## Smart assistant knowledge-context QA

After the server-side knowledge context was added, the preview `/statti?assistant=knowledge` opened the existing assistant panel successfully. The accurate DOM probe confirmed the title `Спокійний навігатор`, `#calm-assistant-panel`, and the accessible input label `Запитання для AI-помічника`. The earlier failed probe used an uppercase-only selector and did not represent a product error.

Final smart-bot smoke-test: on `/statti?assistant=knowledge`, the assistant opened successfully and the quick prompt “Які є напрямки стоматології?” returned the approved eight service directions, a general-information disclaimer, and the real booking phone/form handoff. The response stayed inside the panel and did not navigate away.

## Knowledge admin QA

The `/admin/knowledge` route is protected before data loading: an unauthenticated preview shows only the Ukrainian administrator login state and no editor/list content. Desktop 1280×900 and mobile 390×844 captures both remain readable with no horizontal overflow. The six initial published knowledge entries are stored in the database and are available for future admin editing.

## AI preview QA

The admin route after the preview update remains protected: desktop 1280×900 and mobile 390×844 show only the administrator login state without editor, knowledge entries, or preview data when no session is present. The editor contains a preview action that calls a separate admin-only procedure and is disabled until the draft has a valid title, category, and content.
