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

- [ ] Провести аудит официального сайта active-medical.ua: логотип, палитра, типографика, навигация, композиция, CTA и мобильная версия
- [ ] Провести аудит текущего active-medical.pp.ua и составить список визуальных и технических замечаний
- [x] Сформировать согласованную бренд-систему для текущего сайта на основе официального Active Medical без замены реальных фото заглушками (белая клиническая база, Active Medical red #b51f32, Manrope/Cormorant, реальные фото сохранены)
- [ ] Подготовить варианты доменного имени со словом `denta` и проверить риски/доступность перед сменой домена
- [x] Обновить визуальный слой сайта: корпоративные цвета, логотип, шапка, типографика, кнопки, секции и адаптивные состояния (первая итерация реализована в index.css, включая red hero CTA overlay)
- [x] Исправить накопившиеся замечания после аудита и добавить необходимые Vitest-проверки (brandIdentity.test.ts: 3/3; Maps 200; transient upstream 502 остаётся покрыт fallback)
- [ ] Проверить desktop/mobile preview и live custom domain перед публикацией новой версии
- [ ] Сохранить отдельный checkpoint после согласованной первой итерации редизайна
- [ ] Провести и зафиксировать полный список замечаний редизайна по итогам аудита official/current site и отметить, какие исправлены в коде
- [ ] Проверить первую бренд-итерацию на live custom domain и подтвердить desktop/mobile и ключевые бренд-элементы
- [ ] Повторно запустить релевантный набор проверок после финальных правок и отдельно задокументировать два сознательно оставшихся Telegram credential test failures (HTTP 401)
