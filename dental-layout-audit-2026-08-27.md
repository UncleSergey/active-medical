# Dental layout preview audit — 2026-08-27

В preview проверены обзорная страница `/stomatologiya`, страница `/viddilennia`, домашняя секция детей и секция команды.

## Doctor carousel

DOM содержит 4 реальные карточки врачей. Контейнер имеет `overflow-x: auto`, `clientWidth: 646` и `scrollWidth: 1328`, то есть горизонтальное движение действительно доступно. Карусель подписана `Лікарі Active Medical`, имеет отдельные кнопки «Попередній лікар» и «Наступний лікар», автодвижение на interval и остановку при hover/focus. Секция использует реальный logo asset Active Medical как очень мягкий repeated background pattern.

## Dental and branches pages

Desktop и mobile preview показывают бело-красно-бордовую систему с нейтральными серыми поверхностями. Голубой используется только в телефонном маркере и иконках карты. Страницы подключены отдельными маршрутами `/stomatologiya`, `/stomatolohiya`, `/viddilennia` и `/viddilennya`.

## Constraints

Референсное фото доктора с внешнего медицинского сайта не использовалось. Реальные портреты Active Medical сохранены. Проверка live custom domain и публикационный checkpoint остаются отдельными действиями после финального тестового прогона.
