# Project TODO

- [x] Диагностировать причины ошибок 500 для запросов к `/manus-storage/...` на active-medical.pp.ua
- [x] Найти полный список реальных изображений сайта и их текущие источники: hero, logo, interior, team, фотографии врачей, детские изображения, блок «До / После», QR-код
- [x] Восстановить или заново загрузить реальные изображения в поддерживаемое хранилище без использования заглушек
- [x] Переподключить все изображения в коде сайта к рабочим URL
- [x] Проверить, что изображения корректно открываются на кастомном домене active-medical.pp.ua, а не только на manus.space (20/20 URL — HTTP 200)
- [x] Запустить проверку сборки, TypeScript и тестов после изменений (TypeScript/build прошли; storageProxy.test прошёл 2/2; полный набор — 10/12, два старых Telegram credential-теста получают HTTP 401 Unauthorized от Telegram)
- [x] Сохранить checkpoint с исправлениями и зафиксировать опубликованную версию (checkpoint 7b490803)
- [x] Исправить ошибку `Failed to load Google Maps script` на странице `/?from_webdev=1`
- [x] Сохранить рабочий fallback карты и не показывать ошибку в консоли при недоступном Google Maps API
- [x] Добавить или обновить Vitest-проверку для исправленной логики карты (mapsSdkProxy.test.ts: 2/2)
- [x] Проверить preview, TypeScript, тесты и production build, затем сохранить опубликованный checkpoint (preview и `/api/maps-sdk` HTTP 200; TypeScript/build и целевые тесты прошли)
- [x] Шаг 1: обновить Telegram bot token через защищённую конфигурацию и подтвердить `getMe`/credential-тест (пропущен по решению пользователя: заявки работают)
- [x] Шаг 2: добавить автоматический мониторинг доступности всех storage-ассетов с уведомлением о сбоях (20 ассетов каждые 15 минут; task UID `gtLgq7UYjNEcNAftzTFp2Y`)
- [x] Шаг 3: настроить lazy-loading для тяжёлых командных фотографий и проверить загрузку изображений (team portraits lazy + async decoding; hero eager/high priority; тесты прошли)
- [x] Проверить и опубликовать каждый шаг отдельным checkpoint (monitor code checkpoint `f2292b9d`)
- [x] Проверить, какой deployment фактически обслуживает active-medical.pp.ua (Render за Cloudflare; `x-render-origin-server: Render`)
- [x] Синхронизировать текущие изменения с deployment active-medical.pp.ua (Vercel Production через user_github)
- [x] Проверить lazy-loading, Maps и storage-ассеты непосредственно на active-medical.pp.ua (HTML production, bundle markers, Maps 200, ключевые assets 200)
- [x] Устранить оставшийся 503/недоступность `/api/maps-sdk` на фактическом Render deployment active-medical.pp.ua (домен переведён на Vercel; custom `/api/maps-sdk` отвечает 200)
- [x] Подтвердить на active-medical.pp.ua, что Google Maps загружается, а lazy-loading и storage-ассеты работают после redeploy
- [x] Убедиться, что на active-medical.pp.ua вместо декоративной сетки отображается реальная карта с корректной геопозицией клиники
- [x] Проверить, что Render-сервис, к которому привязан active-medical.pp.ua, действительно собран из commit `e18911a9`/актуального checkpoint (не применяется: домен переведён на Vercel Production)
- [x] Устранить причину, по которой custom domain продолжает показывать декоративную карту вместо реальной карты (Vercel deployment + OSM fallback)
- [x] Согласовать единый production host для active-medical.pp.ua: сейчас GitHub/Vercel и DNS/Render расходятся (Vercel выбран единым production host)
- [x] После переключения проверить карту, изображения и lazy-loading непосредственно на active-medical.pp.ua
- [x] Исправить неверную геопозицию карты: текущий marker показывает не клинику на вул. Лазурна, 5, корпус 10/1 (подтверждённая точка 46.94455, 31.93783)
- [x] Проверить новую точку на active-medical.pp.ua и опубликовать checkpoint (checkpoint 5fa5c70d)
- [x] Проверить на active-medical.pp.ua полный список всех 20 storage URL после переключения на Vercel и зафиксировать HTTP 200/content-type для каждого (23 source-referenced files: 20 images + 3 documents; all HTTP 200)
- [x] Открыть active-medical.pp.ua в браузере после последнего deploy и подтвердить фактическое отображение карты с правильной геопозицией клиники
- [x] Проверить в браузере на custom domain, загрузился ли именно Google Maps SDK или сработал OSM fallback, без декоративной сетки (реальная OSM-карта отображается без декоративной сетки; `/api/maps-sdk` HTTP 200)
- [x] Отдельно подтвердить lazy-loading на live-домене по финальному DOM/HTML для вторичных изображений после переключения (live bundle содержит lazy-loading атрибуты)
- [x] Проверить в браузерном DOM active-medical.pp.ua фактический центр карты и marker для Лазурной 5/10 (OSM iframe marker=46.94455,31.93783; bbox подтверждён)
- [x] Проверить в браузерном DOM active-medical.pp.ua `loading="lazy"` и `decoding="async"` у вторичных изображений (team, children, cases, doctors подтверждены)
- [x] Проверить на active-medical.pp.ua полный DOM-список doctor portrait `<img>` и подтвердить `loading="lazy"`/`decoding="async"` для каждого (5 live DOM elements, including 2 Alina instances)

# Новая итерация: фирменный стиль и домен

- [x] Провести аудит официального сайта active-medical.ua: логотип, палитра, типографика, навигация, композиция, CTA и мобильная версия (результаты сохранены в brand-audit-2026-08-27.md)
- [x] Провести аудит текущего active-medical.pp.ua и составить список визуальных и технических замечаний (результаты сохранены в brand-audit-2026-08-27.md)
- [x] Сформировать согласованную бренд-систему для текущего сайта на основе официального Active Medical без замены реальных фото заглушками (белая клиническая база, Active Medical red #b51f32, Manrope/Cormorant, реальные фото сохранены)
- [x] Подготовить варианты доменного имени со словом `denta` и проверить риски/доступность перед сменой домена (NIC.UA показал все 4 кандидата available for registration; рекомендация active-denta.pp.ua; регистрация/активация не выполнялась)
- [x] Обновить визуальный слой сайта: корпоративные цвета, логотип, шапка, типографика, кнопки, секции и адаптивные состояния (первая итерация реализована в index.css, включая red hero CTA overlay)
- [x] Исправить накопившиеся замечания после аудита и добавить необходимые Vitest-проверки (brandIdentity.test.ts: 3/3; Maps 200; transient upstream 502 остаётся покрыт fallback)
- [x] Проверить desktop/mobile preview и live custom domain перед публикацией новой версии (preview 1280×720 и 390×844; live DOM/computed styles подтверждены после checkpoint 3815bf4f)
- [x] Сохранить отдельный checkpoint после согласованной первой итерации редизайна (checkpoint 3815bf4f опубликован; последующая live-проверка сохранена в brand-audit-2026-08-27.md)
- [x] Провести и зафиксировать полный список замечаний редизайна по итогам аудита official/current site и отметить, какие исправлены в коде (issue register в brand-audit-2026-08-27.md)
- [x] Проверить первую бренд-итерацию на live custom domain и подтвердить desktop/mobile и ключевые бренд-элементы (live DOM: logo, red CTA, white header, clinical surfaces; mobile preview отдельно подтверждён)
- [x] Повторно запустить релевантный набор проверок после финальных правок и отдельно задокументировать два сознательно оставшихся Telegram credential test failures (HTTP 401) (релевантные тесты 15/15, TypeScript OK; полный suite 20/22)
- [x] Проверить реальную registrar availability и ownership flow для выбранного `denta`-домена, а не только DNS, и задокументировать итог (NIC.UA availability flow подтверждён; ownership/activation intentionally not initiated)
- [x] Проверить mobile-вариант первой бренд-итерации непосредственно на live custom domain и зафиксировать ключевые элементы/стили (headless Chromium 390×844: logo, menu, hero, red CTA, marquee and first section rendered)
- [x] Уточнить формулировку публикационной проверки: live desktop/mobile проверяются после checkpoint, поскольку checkpoint является публикацией в этом проекте (добавлено в audit-документ)
- [x] Проверить mobile-версию active-medical.pp.ua на live custom domain с явным viewport 390×844 и сохранить computed styles/DOM для header, logo, red CTA, hero и first section (CDP: viewport 390×844, overflow false, all key styles confirmed)
- [x] Добавить и перечитать явное примечание в brand-audit.md о том, что checkpoint является публикацией, поэтому live desktop/mobile verification выполняется сразу после checkpoint (explicit workflow clarification added and mobile report saved)
- [x] Перечитать brand-audit-2026-08-27.md после добавления workflow clarification и зафиксировать точные строки о post-checkpoint live verification (строки 59–63: checkpoint is publication; live checks follow immediately)

# Исправление hero CTA

- [x] Убрать задвоение CTA в hero: исключить пересечение интерактивных кнопок с кнопкой, уже встроенной в реальное изображение (final mask + aspect-ratio fix; live desktop/mobile confirmed)
- [x] Проверить hero CTA на desktop/mobile и сохранить checkpoint с исправлением (checkpoint e123f589; live desktop 1280×900 and mobile 390×844 reviewed)
- [x] Проверить hero после маскировки на desktop и mobile с явным визуальным подтверждением отсутствия встроенной зелёной CTA-зоны и пересечения с красной CTA (content-reviewed live captures saved in hero-cta-fix-2026-08-27.md)
- [x] Проверить исправленный hero непосредственно на live custom domain после публикации и сохранить checkpoint с результатом (e123f589; live custom domain captures and DOM confirmed)
- [x] Если нужно, скорректировать размеры/позицию CTA-mask отдельно для desktop и mobile по результатам QA (top 76% / height 24% / width 51%; content-reviewed live QA confirms no further adjustment required)
- [x] Проверить hero после финальной mask-корректировки с содержательным визуальным подтверждением на desktop и mobile, что встроенная зелёная CTA-зона больше не видна (live e123f589 captures reviewed at 1280×900 and 390×844)
- [x] Опубликовать текущий hero-fix checkpoint и отдельно перепроверить active-medical.pp.ua после публикации (e123f589 published; live captures reviewed)
- [x] При необходимости скорректировать `.hero-reference-hotspots::before` отдельно для desktop/mobile и повторно задокументировать результат (mask and aspect-ratio documented in hero-cta-fix-2026-08-27.md)
- [x] Синхронизировать высоту hero-контейнера с реальным aspect ratio изображения на desktop/tablet, чтобы mask и интерактивные CTA находились поверх встроенной зоны, а не ниже неё (aspect-ratio 1536/924; live desktop/mobile confirmed)
- [x] Сделать воспроизводимый post-fix аудит hero после e123f589 с измерениями hero/image/hotspots/mask на desktop и mobile (live-отчёт PASS для 1280×900 и 390×844 в live-hero-geometry-audit.md)
- [x] Добавить автоматизированную viewport-проверку DOM/CSS для hero, подтверждающую, что CTA и mask находятся внутри границ изображения (scripts/audit_live_hero_geometry.mjs; all assertions PASS)
- [x] Проверить, доступна ли безопасная версия hero-asset без встроенной CTA-графики; если нет, оставить реальный asset и mask как документированное решение (альтернативная версия не найдена; исходный PNG сохранён)

# Галерея «Стоматологія, яку люблять діти»

- [x] Завершить воспроизводимый post-fix hero audit и сохранить baseline геометрии после e123f589 (PASS, desktop/mobile, сохранён отчёт)
- [x] Провести аудит текущей разметки и CSS детской фотогалереи, включая причины пустых мест и несбалансированной высоты (dense grid, grid-auto-flow and aspect-safe image sizing documented)
- [x] Пересобрать детскую галерею из существующих реальных изображений в плотную responsive-композицию с разными весёлыми рамочками без placeholders (6 real images, red/burgundy frame accents, no placeholders)
- [x] Добавить регрессионную Vitest-проверку структуры/классов детской галереи (dentalArchitecture.test.ts palette/route contract plus existing image loading checks)
- [x] Проверить новую галерею на desktop/mobile, доступность alt-текстов и отсутствие горизонтального overflow (full-page 1280×720 and 390×844 captures; alt text present; grid uses bounded columns)
- [ ] Сохранить checkpoint опубликованной версии новой детской галереи

# Блок врачей: горизонтальная лента

- [x] Провести аудит текущей разметки карточек врачей и доступных реальных портретов (Home.tsx, doctorPortraits and live DOM: 4 doctors)
- [x] Реализовать горизонтальную ленту врачей в стиле медицинского центра: автопрокрутка, стрелки, свайп и видимая следующая карточка (4-card scroll track, interval and partial next card)
- [x] Остановить автодвижение при hover/focus и уважать prefers-reduced-motion (pause handlers + media query)
- [x] Сохранить реальные имена, специализации, портреты и alt-тексты без вымышленных отзывов/рейтингов (4 real doctor records; no reviews/ratings added)
- [x] Добавить Vitest-проверки механики и доступности doctor carousel (dentalArchitecture.test.ts, 4/4 pass)
- [ ] Проверить doctor carousel и детскую галерею на desktop/mobile и опубликовать единый checkpoint (preview проверен; checkpoint pending)

# Фирменный львиный фон в блоке врачей

- [x] Проверить доступность и формат фирменного светло-серого lion-pattern asset без использования портрета доктора из референса (оригинальный standalone asset не найден; использован реальный logo mark без чужого доктора)
- [x] Встроить lion-pattern как спокойный фон секции врачей с достаточным контрастом текста и реальными портретами Active Medical (repeated real logo mark at low opacity)
- [x] Проверить, что lion-pattern не ухудшает читаемость, мобильную композицию и производительность изображений (low-opacity background, no layout shift; desktop/mobile preview checked)

# Страница «Наши отделения»

- [x] Изучить официальный раздел https://active-medical.ua/contacts/ и выписать фактические отделения, адреса, телефоны, графики, ссылки маршрутов и карту (branches-audit-2026-08-27.md)
- [x] Проверить текущие маршруты приложения и выбрать URL страницы отделений без поломки существующих страниц врачей/услуг (`/viddilennia` + `/viddilennya`)
- [x] Реализовать страницу «Наши отделения» в фирменном стиле Active Medical: карточки отделений, контакты, график, CTA, карта и адаптивная мобильная версия (BranchesPage + MapView)
- [x] Добавить навигационные ссылки на страницу отделений в header/footer и необходимые Vitest-проверки (header links + dentalArchitecture.test.ts)
- [x] Проверить страницу отделений desktop/mobile, ссылки, карту и отсутствие горизонтального overflow (preview 1280×720 and 390×844)
- [ ] Сохранить checkpoint опубликованной страницы отделений (pending unified checkpoint)

# Раздел «Стоматологія» и подразделы

- [x] Изучить официальный раздел стоматологии Active Medical и выписать фактические пункты меню/подразделы без копирования неактуального контента (dental-structure-audit-2026-08-27.md)
- [x] Сопоставить официальную структуру с текущими servicePages и определить отсутствующие маршруты (8 existing service routes reused)
- [x] Спроектировать страницу-обзор «Стоматологія» с понятной картой подразделов и подготовить модель данных для постепенного заполнения (servicePages-driven overview)
- [x] Реализовать обзорную страницу стоматологии в фирменном стиле Active Medical (DentalLandingPage)
- [x] Реализовать вложенные подразделы как отдельные маршруты с честными состояниями «контент будет заполнен» там, где фактов ещё нет (existing service routes linked; no invented facts added)
- [x] Добавить ссылку «Стоматологія» и подразделы в навигацию/страницу отделений, не ломая текущие маршруты (home + dental + branches navigation)
- [x] Добавить Vitest-проверки карты маршрутов и доступных CTA (4/4 dentalArchitecture tests)
- [ ] Проверить раздел и подразделы на desktop/mobile и сохранить опубликованный checkpoint (preview done; unified checkpoint pending)

# Цветовой контракт Active Medical

- [x] Зафиксировать palette contract: white, red, burgundy and neutral gray shades only for new branded blocks (CSS contract documented by dentalArchitecture test)
- [x] Убрать из новых страниц лишние голубые/розовые/зелёные заливки, заменив их оттенками белого, серого, красного и бордового (blue retained only for contact/map icons)
- [x] Проверить контраст текста/CTA и добавить Vitest-регрессию палитры для страниц стоматологии и отделений (preview + test contract)
- [x] Зафиксировать голубой как ограниченный functional accent только для телефона/контактов, не использовать его как общий фон новых разделов (CSS uses #86a8d8 only in contact/map elements)

# Собственная фишка стоматологии

- [x] Сформулировать критерии фишки: узнаваемость, связь со стоматологией, совместимость с львиным паттерном, полезность для пациента и отсутствие выдуманных обещаний (concepts doc)
- [x] Разработать минимум три концепции и выбрать одну для Active Medical Dental (Левова лінія selected)
- [x] Подготовить короткий бренд-текст и визуальный приём выбранной фишки («маршрут спокійної усмішки»)
- [x] Встроить выбранную фишку в hero, блок врачей, детскую галерею и страницу стоматологии (line marker, carousel label, photo frames, dental overview)
- [x] Проверить, что фишка понятна с первого экрана и не мешает записи, телефону и доступности (preview/DOM checks)

# Внедрение «Левової лінії» — рабочая итерация

- [x] Добавить фирменный маршрут «Познайомитись → Спланувати → Лікувати → Підтримувати» на странице стоматологии (approach steps)
- [x] Пересобрать блок врачей в горизонтальную ленту с автодвижением, стрелками, свайпом, паузой при hover/focus и prefers-reduced-motion (4 real cards, scroll track, interval, pause handlers)
- [x] Использовать доступный lion-pattern как спокойный светло-серый фон секции врачей, не перенося чужого доктора (real logo mark repeated at low opacity)
- [x] Пересобрать детскую галерею в плотную композицию с рамками/линиями без лишних цветовых заливок и пустых провалов (dense CSS grid + red/burgundy frame accents)
- [x] Добавить Vitest-проверки для dental route, doctor carousel и palette contract (4/4 pass)
- [ ] Проверить новые блоки на desktop/mobile и сохранить рабочий preview/checkpoint (preview done; checkpoint pending)
