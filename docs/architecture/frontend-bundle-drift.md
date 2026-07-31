# Дрейф продового бандла от исходников фронта

Продовый `deslop-main-aiwa-v177.js` = Сонина сборка (`BhPcPXDn`, sha256
`e3d836d9…`) + **63 фрагмента ручных правок Кодекса** в минифицированном
коде (серия v163→v177). Исходники в `frontend/` соответствуют базовой
сборке БЕЗ этих правок.

**Правило: пересобирать и катить бандл из исходников НЕЛЬЗЯ, пока все
фрагменты ниже не портированы в JSX** (иначе регрессии: Пилатес, выписка,
fallback картинок еды и др.). После порта — семантическое сравнение и
выкат через staging.

Полный список фрагментов (усечённые до 220 символов, старое → новое):

## 1. replace
- было: ` ], ax = [[1, "Низкая"], [2, "Средняя"], [3, "Высокая"]], ix = [[1, "Плохое"], [2, "Нормальное"], [3, "Хорошее"]], cj = "/assets/food/pancakes.png", lx = [   {`
- стало: ` ], ax = [[1, "Низкая"], [2, "Средняя"], [3, "Высокая"]], ix = [[1, "Плохое"], [2, "Нормальное"], [3, "Хорошее"]], cj = "/assets/food/meal-placeholder.svg", lx = [   {`

## 2. replace
- было: `), dj = ["Силовая", "Кардио", "Йога", "Ходьба", "Плавание", "Своё"], Za = {`
- стало: `), dj = ["Силовая", "Кардио", "Пилатес", "Йога", "Ходьба", "Плавание", "Своё"], Za = {`

## 3. replace
- было: `   Силовая: [],   Кардио: ["Бег", "Велотренажёр", "Эллипс", "Гребля", "Скакалка"],   Йога: ["Виньяса", "Хатха", "Растяжка", "Пилатес", "Дыхание"],   Ходьба: ["Прогулка", "Скандинавская", "Быстрая ходьба"],   Плавание: ["`
- стало: `   Силовая: [],   Кардио: ["Бег", "Велотренажёр", "Эллипс", "Гребля", "Скакалка"],   Пилатес: ["Мат", "Реформер", "Мобилити", "Кор"],   Йога: ["Виньяса", "Хатха", "Растяжка", "Дыхание"],   Ходьба: ["Прогулка", "Скандинав`

## 4. replace
- было: `   const [s, r] = E.useState(0);   return E.useEffect(() => {     if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;     let f = !1, h = 0, y = 0;     const p = () => {       let g = 0;       r(g)`
- стало: `   return /* @__PURE__ */ m.jsx(     "span",     {`

## 5. replace
- было: `,       "data-aiwa-sequence": "true",       "data-sequence": e === $h ? "card" : "default",       "data-pause-ms": l,       "data-frame": s,       "aria-hidden": "true",       children: /* @__PURE__ */ m.jsx("img", { src`
- стало: `,       "data-aiwa-sequence": "true",       "data-sequence": e === $h ? "card" : "default",       "data-pause-ms": l,       "data-frame": 0,       "aria-hidden": "true",       children: /* @__PURE__ */ m.jsx("img", { src`

## 6. replace
- было: ` const Aj = E.lazy(() => import("./AiwaWebUiChart-sx8eqQoP.js").then((a) => ({`
- стало: ` const Aj = E.lazy(() => import("./AiwaWebUiChart-aiwa-v177.js?v=r25").then((a) => ({`

## 7. insert
- было: ``
- стало: ` function aiwaConfirmReportDelivered() {   const a = window.Telegram?.WebApp, e = "Выписка готова и отправлена в чат бота.";   Ot(e, { type: "success" });   if (typeof a?.showPopup == "function") {     try {       a.show`

## 8. replace
- было: `         y?.ok ? Ot("Выписка отправлена в чат бота", { type: "success" }) : Ot(y?.text || "Выписка временно недоступна", {`
- стало: `         y?.ok && y?.delivered ? aiwaConfirmReportDelivered() : Ot(y?.text || "Выписка временно недоступна", {`

## 9. replace
- было: ` src: f, alt: "", loading: "lazy" }`
- стало: ` src: f, alt: "", loading: "lazy", onError: (g) => {     const v = "/assets/food/meal-placeholder.svg";     g.currentTarget.getAttribute("src") === v ? g.currentTarget.style.display = "none" : g.currentTarget.src = v;   `

## 10. replace
- было: `);`
- стало: `), [reportBusy, setReportBusy] = E.useState(!1);`

## 11. replace
- было: `       height: String(A.profile?.height || ""),       weight: String(A.profile?.weight || ""),       age: String(A.profile?.age || ""),       cycle_len: String(A.cycle_len || ""),       diet_note: A.profile?.diet_note ||`
- стало: `       height: String(A.profile?.height || ""),       weight: String(A.profile?.weight || ""),       age: String(A.profile?.age || ""),       cycle_len: String(A.cycle_len || ""),       diet_note: A.profile?.diet_note ||`

## 12. replace
- было: `       height: g.height,       weight: g.weight,       age: g.age,       cycle_len: g.cycle_len     }`
- стало: `       height: g.height,       weight: g.weight,       age: g.age,       ...r.mode === "cycle" ? { cycle_len: g.cycle_len } : {}     }`

## 13. replace
- было: `     const A = await qt("/api/report", {`
- стало: `     if (reportBusy)       return;     setReportBusy(!0);     try {       const A = await qt("/api/report", {`

## 14. replace
- было: `     A?.ok ? (Ot("Выписка отправлена в чат бота", { type: "success" }), s("main")) : Ot(A?.text || "Выписка временно недоступна", {`
- стало: `       A?.ok && A?.delivered ? aiwaConfirmReportDelivered() : Ot(A?.text || "Выписка временно недоступна", {`

## 15. insert
- было: ``
- стало: `     } finally {       setReportBusy(!1);     }`

## 16. insert
- было: ``
- стало: `)), Ot("Не получилось изменить настройку", { type: "error" }));   }, P = async (A) => {     const R = g.daily_summary_enabled !== !1;     v((U) => ({ ...U, daily_summary_enabled: A })), (await qt("/api/daily-summary", { `

## 17. replace
- было: ` children: [             r.mode === "male" ? null : /* @__PURE__ */ m.jsx(Yt, { title: "Выписка для врача", description: "PDF в чат бота", onClick: () => s("report") }`
- стало: ` children: [             /* @__PURE__ */ m.jsx(Yt, { title: r.mode === "male" ? "Выписка по самочувствию" : "Выписка для врача", description: "PDF в чат бота", onClick: () => s("report") }`

## 18. replace
- было: ` title: "Мои данные", description: "рост · вес · возраст · цикл", onClick: () => s("data") }`
- стало: ` title: "Мои данные", description: r.mode === "male" ? "рост · вес · возраст" : "рост · вес · возраст · цикл", onClick: () => s("data") }`

## 19. replace
- было: ` title: "Утренняя сводка", description: `${`
- стало: ` title: "Утренняя сводка", description: g.daily_summary_enabled === !1 ? "выключена" : `${`

## 20. replace
- было: `),             /* @__PURE__ */ m.jsx(ie, {`
- стало: `),             r.mode === "cycle" ? /* @__PURE__ */ m.jsx(ie, {`

## 21. replace
- было: `)           ] }`
- стало: `) : null           ] }`

## 22. replace
- было: `),           /* @__PURE__ */ m.jsx(ie, {`
- стало: `),           /* @__PURE__ */ m.jsx(             pt.Switch,             {               value: g.daily_summary_enabled !== !1,               onChange: P,               children: /* @__PURE__ */ m.jsx(                 pt.T`

## 23. replace
- было: ` variant: "body", weight: "regular", children: "Циклы, динамика и дневник симптомов придут PDF-файлом в чат бота." }`
- стало: ` variant: "body", weight: "regular", children: r.mode === "male" ? "Динамика энергии и дневник самочувствия придут PDF-файлом в чат бота." : "Циклы, динамика и дневник симптомов придут PDF-файлом в чат бота." }`

## 24. replace
- было: ` variant: "filled", label: "Собрать выписку", isFill: !0, ...se("Собрать выписку", S) }`
- стало: ` variant: "filled", label: reportBusy ? "Собираю…" : "Собрать выписку", isFill: !0, disabled: reportBusy, ...se("Собрать выписку", S) }`

## 25. replace
- было: `           label: "Что съела?",           value: f,           onChange: h,           placeholder: "Например: 200 г творога и банан",           multiline: !0         }`
- стало: `           label: "Что было в приёме пищи?",           value: f,           onChange: h,           placeholder: "Например: 200 г творога и банан",           multiline: !0         }`

## 26. replace
- было: ` isOpen: a, onClose: e, diary: l, onAdd: s, onEdit: r, onDelete: c, onReco: f }`
- стало: ` isOpen: a, onClose: e, diary: l, onAdd: s, onEdit: r, onDelete: c, onReco: f, canAdd: aiwaCanAdd = !0 }`

## 27. replace
- было: `,         b.id       )) : /* @__PURE__ */ m.jsx(pt, {`
- стало: `,         b.id       )) : aiwaCanAdd ? /* @__PURE__ */ m.jsx(pt, {`

## 28. insert
- было: ``
- стало: `) }) : /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsx(pt.Text, { title: "Нет записей" }`

## 29. replace
- было: ` className: "aiwa-cell-actions", children: [       /* @__PURE__ */ m.jsx(Wt, {`
- стало: ` className: "aiwa-cell-actions", children: [       aiwaCanAdd ? /* @__PURE__ */ m.jsx(Wt, {`

## 30. replace
- было: `),       /* @__PURE__ */ m.jsx(Wt, {`
- стало: `) : null,       /* @__PURE__ */ m.jsx(Wt, {`

## 31. replace
- было: `, Zi = /* @__PURE__ */ new Map(), sr = /* @__PURE__ */ new Map(), or = (a) => Object.fromEntries(a.map((e) => [e, Zi.get(e) ?? null])), Od = (a, { force: e = !1 }`
- стало: `, Zi = /* @__PURE__ */ new Map(), sr = /* @__PURE__ */ new Map(), aiwaCacheTs = /* @__PURE__ */ new Map(), or = (a) => Object.fromEntries(a.map((e) => [e, Zi.get(e) ?? null])), Od = (a, { force: e = !1, maxAgeMs: l = 150`

## 32. replace
- было: `   if (!e) {     if (Zi.has(a)) return Promise.resolve(Zi.get(a));     const s = sr.get(a);     if (s) return s;   }   const l = mx[a]().catch(() => null).then((s) => (s && Zi.set(a, s), sr.get(a) === l && sr.delete(a), `
- стало: `   const s = sr.get(a);   if (s) return s;   if (!e && Zi.has(a) && Date.now() - (aiwaCacheTs.get(a) || 0) <= l)     return Promise.resolve(Zi.get(a));   const r = mx[a]().catch(() => null).then((c) => (c && (Zi.set(a, c`

## 33. replace
- было: `     Zi.set(h, y), s(or(a));`
- стало: `     Zi.set(h, y), aiwaCacheTs.set(h, Date.now()), s(or(a));`

## 34. replace
- было: ` const oA = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"], yx = (a = 30) => {`
- стало: ` const aiwaTodayIso = () => {   const a = typeof window.aiwaData == "function" ? window.aiwaData() : window.aiwaData, e = String(a?.today || "");   if (/^\d{4}-\d{2}-\d{2}$/.test(e)) return e;   const l = Object.fromEntr`

## 35. replace
- было: `     const s = /* @__PURE__ */ new Date();`
- стало: `     const s = /* @__PURE__ */ new Date(`${aiwaTodayIso()}T12:00:00`);`

## 36. replace
- было: `, rA = ["foodSection", "diary"], uA = "/assets/paper-food-placeholder.png", zd = (a) => String(a || "").toLowerCase().replace(/ё/g, "е"), Xf = "?v=2", nv = (a) => zd(a).split(/[^а-яa-z0-9]+/).filter((e) => e.length >= 3)`
- стало: `, rA = ["foodSection", "diary"], uA = "/assets/food/meal-placeholder.svg", zd = (a) => String(a || "").toLowerCase().replace(/ё/g, "е").replace(/\s+/g, " ").trim(), Xf = "?v=2", av = (a, e) => {`

## 37. delete
- было: `   const r = nv(e);   if (!r.length) return null;   let c = null, f = 0, h = 0;`
- стало: ``

## 38. delete
- было: `     const v = nv(y);     if (!v.length) continue;     const b = v.filter((S) => r.some((w) => cA(S, w))).length, T = b / v.length;     b > 0 && (T > h || T === h && b > f) && (h = T, f = b, c = p);`
- стало: ``

## 39. replace
- было: `   return h >= 0.5 ? c + Xf : null;`
- стало: `   return null; }, foodFallbackImage = (a) => {   const e = zd([a?.title, ...Array.isArray(a?.items) ? a.items.map((l) => l?.name) : []].filter(Boolean).join(" "));   return zd(a?.fclass) === "напиток" || /(кофе|чай|кака`

## 40. replace
- было: `), [v, b] = E.useState(""), [T, S] = E.useState(null), [w, j] = E.useState(null), [M, D] = E.useState(!1), [A, R] = E.useState(null), [B, U] = E.useState(!1), [_, H] = E.useState(""), [P, K] = E.useState(null), [it, at] `
- стало: `), [v, b] = E.useState(""), [T, S] = E.useState(null), [selectedDayRevision, setSelectedDayRevision] = E.useState(0), [w, j] = E.useState(null), [M, D] = E.useState(!1), [A, R] = E.useState(null), [B, U] = E.useState(!1)`

## 41. replace
- было: `     if (!F) {`
- стало: `     if (!Q) {`

## 42. replace
- было: `     if (et.current >= 5) return;     const rt = [1500, 3e3, 5e3, 9e3, 15e3][et.current], Kt = setTimeout(() => {`
- стало: `     if (et.current >= 3) return;     const rt = Math.max(5e3, Number(l.foodSection?.retry_after_ms || 8e3)) + Math.floor(Math.random() * 2500), Kt = setTimeout(() => {       if (document.visibilityState !== "visible") r`

## 43. replace
- было: `, [F, l.foodSection]), E.useEffect(() => {     fetch("/assets/food/manifest.json?v=2").then((rt) => rt.ok ? rt.json() : {`
- стало: `, [Q, l.foodSection]), E.useEffect(() => {     if (!aiwaAssetRefreshNeeded) {       aiwaAssetPoll.current = { revision: null, attempts: 0 };       return;     }     if (aiwaAssetPoll.current.revision === null)       aiwa`

## 44. replace
- было: `, []);   const N = () => s("diary");`
- стало: `, []), E.useEffect(() => {     if (!l.diary) return;     const rt = ++selectedDayRequest.current, Kt = v;     if (!Kt || Kt === aiwaTodayIso()) {       S(null);       return;     }     const ii = selectedDayRevision ? nu`

## 45. replace
- было: `, Ea = async (rt) => {`
- стало: `, Ea = (rt) => {`

## 46. replace
- было: `     if (b(Kt), !Kt || Kt === _t) {       S(null);       return;     }     S(null);     const ii = await qt("/api/diary", { d: Kt }).catch(() => null);     S(ii || { meals: [] });`
- стало: `     setSelectedDayRevision(0), b(Kt);`

## 47. insert
- было: ``
- стало: `     const selectedAtRequest = selectedDayRef.current;`

## 48. replace
- было: `     Kt && !Kt.error && (r("diary", { meals: Kt.meals || [], totals: Kt.totals || {}, target: Kt.target || st }), Ot("Приём удалён", {`
- стало: `     if (Kt && !Kt.error) {       if (selectedAtRequest === selectedDayRef.current) {         !selectedAtRequest || selectedAtRequest === aiwaTodayIso() ? r("diary", { ...l.diary, ...Kt }) : setSelectedDayRevision((ii) =`

## 49. replace
- было: `));`
- стало: `);     }`

## 50. replace
- было: `           type: "button",           className: "aiwa-avatar-initial aiwa-screen-profile",           "aria-label": "Открыть профиль",           onClick: () => y(!0),           children: (c?.name || "•").trim()[0]?.toUppe`
- стало: `           type: "button",           className: "aiwa-avatar-initial aiwa-screen-profile",           "aria-label": "Открыть профиль",           onClick: () => y(!0),           children: /* @__PURE__ */ m.jsx(Fj, {})     `

## 51. replace
- было: `           image: rt.meal.image || av(p, rt.meal.dish) || uA,           title: rt.meal.dish || "Рекомендация Айвы",           description: [rt.label, rt.meal.kcal, rt.meal.note].filter(Boolean).join(" · "),           onC`
- стало: `           image: rt.meal.image_url || rt.meal.image || av(p, rt.meal.dish) || uA,           title: rt.meal.dish || "Рекомендация Айвы",           description: [rt.label, rt.meal.kcal, rt.meal.note].filter(Boolean).join(`

## 52. replace
- было: `             image: av(p, rt.title) || cj,             title: rt.title,             description: `${`
- стало: `             image: rt.image_url || av(p, rt.title) || foodFallbackImage(rt) || cj,             title: rt.title,             description: `${`

## 53. replace
- было: ``,             onClick: wt ? void 0 : () => H("diary")           }`
- стало: ``,             onClick: () => H("diary")           }`

## 54. replace
- было: `         isOpen: _ === "diary",         onClose: () => H(""),         diary: Z,         onAdd: Aa,         onEdit: (rt) => {`
- стало: `         isOpen: _ === "diary",         onClose: () => H(""),         diary: wt ? T || { meals: [], totals: {}, target: st } : Z,         canAdd: !wt,         onAdd: Aa,         onEdit: (rt) => {`

## 55. replace
- было: `   const r = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), [c, f] = E.useState(r), [h, y] = E.useState("Силовая"), [p, g] = E.useState("45 мин"), [v, b] = E.useState("Нормально"), [T, S] = E.useState([]), [w, `
- стало: `   const r = aiwaTodayIso(), [c, f] = E.useState(r), [h, y] = E.useState("Силовая"), [p, g] = E.useState("45 мин"), [v, b] = E.useState("Нормально"), [T, S] = E.useState([]), [w, j] = E.useState({`

## 56. replace
- было: `     const N = s?.name || "", V = (s?.exercises || []).filter((st) => st?.name), Z = /ход|прогул/i.test(N) ? "Ходьба" : /йог|мобил|релиз|растяж/i.test(N) ? "Йога" : /кардио|бег|вело/i.test(N) ? "Кардио" : /плав/i.test(N)`
- стало: `     const N = s?.name || "", V = (s?.exercises || []).filter((st) => st?.name), Z = /ход|прогул/i.test(N) ? "Ходьба" : /пилатес/i.test(N) ? "Пилатес" : /йог|мобил|релиз|растяж/i.test(N) ? "Йога" : /кардио|бег|вело/i.tes`

## 57. replace
- было: `, bA = [   ["силов", "Силовая"],   ["ходь", "Ходьба"],   ["прогул", "Прогулка"],   ["шаг", "Ходьба"],   ["бег", "Бег"],   ["кардио", "Кардио"],   ["велос", "Велотренажёр"],   ["велотрен", "Велотренажёр"],   ["эллипс", "Э`
- стало: `, bA = [   ["силов", "Силовая"],   ["ходь", "Ходьба"],   ["прогул", "Прогулка"],   ["шаг", "Ходьба"],   ["бег", "Бег"],   ["кардио", "Кардио"],   ["велос", "Велотренажёр"],   ["велотрен", "Велотренажёр"],   ["эллипс", "Э`

## 58. replace
- было: `     fetch("/assets/train/manifest.json?v=1").then((V) => V.ok ? V.json() : {`
- стало: `     fetch("/assets/train/manifest.json?v=2").then((V) => V.ok ? V.json() : {`

## 59. replace
- было: `, at = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), I = !!(S && S !== at), F = async (V) => {`
- стало: `, at = aiwaTodayIso(), I = !!(S && S !== at), F = async (V) => {`

## 60. replace
- было: `           type: "button",           className: "aiwa-avatar-initial aiwa-screen-profile",           "aria-label": "Открыть профиль",           onClick: () => h(!0),           children: (r?.name || "•").trim()[0]?.toUppe`
- стало: `           type: "button",           className: "aiwa-avatar-initial aiwa-screen-profile",           "aria-label": "Открыть профиль",           onClick: () => h(!0),           children: /* @__PURE__ */ m.jsx(Fj, {})     `

## 61. replace
- было: `))), [s, r] = E.useState(""), [c, f] = E.useState(!1), [h, y] = E.useState(!1), p = Jf.useRef(null), g = Jf.useRef(null);`
- стало: `))), [s, r] = E.useState(""), [c, f] = E.useState(!1), [h, y] = E.useState(!1), p = Jf.useRef(null), g = Jf.useRef(null), A = (typeof window.aiwaData == "function" ? window.aiwaData() : window.aiwaData)?.mode === "male";`

## 62. replace
- было: `       id: "hello",       role: "assistant",       text: "Привет! Спроси меня о цикле, питании, тренировках или самочувствии. Я отвечу с учётом твоих данных.",       suggestions: ["Можно ли тренироваться?", "Что съесть с`
- стало: `       id: "hello",       role: "assistant",       text: A ? "Привет! Спроси меня о питании, тренировках или самочувствии. Я отвечу с учётом твоих данных." : "Привет! Спроси меня о цикле, питании, тренировках или самочув`

## 63. replace
- было: `   const s = (typeof window.aiwaData == "function" ? window.aiwaData() : window.aiwaData)?.mode === "male" ? sv.filter((f) => f.id !== "today") : sv, r = a === "stats" ? "today" : a, c = Math.max(0, s.findIndex((f) => f.`
- стало: `   const s = sv, r = a === "stats" ? "today" : a, c = Math.max(0, s.findIndex((f) => f.id === r));`
