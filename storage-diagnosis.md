# Диагностика изображений Active Medical

Проверка 26 августа 2026 показала, что все 23 текущих ключа ассетов существуют в Manus Forge storage: presign GET возвращает HTTP 200, а подписанные объекты открываются HTTP 200 с корректными типами `image/png`, `image/webp`, `application/pdf`.

Контрольная проверка на `https://activemedic-rcveslat.manus.space/manus-storage/...` возвращает HTTP 200 и редиректит на CloudFront. Проверка тех же ключей на `https://active-medical.pp.ua/manus-storage/...` возвращает HTTP 500 с телом `Storage proxy not configured`. Корень `https://active-medical.pp.ua/` отдаёт HTML HTTP 200 через Express/Render, то есть проблема не в самих объектах и не в React-разметке, а в окружении/маршруте storage proxy кастомного домена.

Текущий `server/_core/storageProxy.ts` отдаёт 500, когда в окружении нет `BUILT_IN_FORGE_API_URL` или `BUILT_IN_FORGE_API_KEY`. `active-medical.pp.ua` сейчас не отображается как подключённый домен проекта: инициализация проекта сообщает доступный домен `activemedic-rcveslat.manus.space`, а в SEO-коде активным доменом также указан Manus-домен.

Все реальные ссылки, которые нужно сохранить: hero, interior, team, 4 портрета врачей, logo, Instagram QR, Marko Rosso before/after, 4 before/after пары, 6 детских изображений и 1 дополнительный интерьерный asset на service pages. Документы используют тот же storage proxy и тоже должны продолжить работать.
