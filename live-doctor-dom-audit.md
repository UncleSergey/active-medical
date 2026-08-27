# Live doctor portrait DOM audit

Date: 2026-08-27
URL: https://www.active-medical.pp.ua/?audit=doctor-dom#team

The live browser DOM returned 5 doctor portrait `<img>` elements. Every element had `loading="lazy"` and `decoding="async"`; none had a fetch-priority override.

| Doctor | Live asset | loading | decoding |
|---|---|---|---|
| Мезінова Аліна Віталіївна | `/manus-storage/alina-mezinova-color-scrubs-new_22ddf932.png` (2 DOM instances) | lazy | async |
| Диченко Юлія Андріївна | `/manus-storage/yuliia-standing-option-balanced-head_4c568e66.png` | lazy | async |
| Погулич Ярослав Євгенович | `/manus-storage/pohulych-yaroslav-color-scrubs-new_e4e3f887.png` | lazy | async |
| Федоров Іван Михайлович | `/manus-storage/fedorov-ivan-light-gray-scrubs_b178ecf8.png` | lazy | async |

This confirms the complete doctor portrait category on the custom domain, including the duplicate Alina portrait instance used in separate sections.
