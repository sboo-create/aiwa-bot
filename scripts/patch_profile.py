"""Правки экрана профиля поверх собранного бандла мини-аппа.

1. Пилюли выбора режима → строка CellStack со значением справа плюс отдельный
   вид со списком режимов. Строка видна и в мужском режиме, иначе из него
   нельзя выйти.
2. Аватар 60x60 над списком настроек.

Правки идут по собранному файлу, потому что исходников v177 в репозитории нет:
они остались на ветке origin/redesign от 27 июля и отстали от main на 153
строки интерфейса. Каждый шаг под своим guard-ом, скрипт идемпотентный.
Когда появятся настоящие исходники — переносить в
src/aiwa/panels/ProfilePanel.jsx, а скрипт удалять.
"""
import pathlib

BUNDLE = pathlib.Path("webapp2/assets/deslop/deslop-main-aiwa-v177.js")
js = BUNDLE.read_text(encoding="utf-8")
done = []

# --- 1. Режим: ячейка со значением вместо пилюль -------------------------
if "aiwa-mode-value" not in js:
    start = js.index('r.mode === "male" ? null : /* @__PURE__ */ m.jsxs("div", { className: "aiwa-profile-modes"')
    end = js.index('/* @__PURE__ */ m.jsx(yt, { className: "aiwa-tma-blocks"', start)
    js = js[:start] + "null,\n          " + js[end:]

    anchor = ('m.jsxs(yt.Item, { children: [\n'
              '            /* @__PURE__ */ m.jsx(Yt, { title: r.mode === "male" ? "Выписка по самочувствию"')
    assert js.count(anchor) == 1
    js = js.replace(anchor, (
        'm.jsxs(yt.Item, { children: [\n'
        '            /* @__PURE__ */ m.jsx(Yt, {\n'
        '              title: "Режим",\n'
        '              trailing: /* @__PURE__ */ m.jsxs("span", { className: "aiwa-mode-value", children: [\n'
        '                /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: (mj.find((A) => A.value === r.mode) || mj[0]).label }),\n'
        '                /* @__PURE__ */ m.jsx(pt.Part, { type: "Chevron" })\n'
        '              ] }),\n'
        '              onClick: () => s("mode")\n'
        '            }),\n'
        '            /* @__PURE__ */ m.jsx(Yt, { title: r.mode === "male" ? "Выписка по самочувствию"'
    ), 1)

    # Список режимов. Текущий помечен акцентным заголовком: CellPart умеет
    # только Chevron/Picker/Dropdown/ColorPicker, галочки в нём нет.
    anchor = '        l === "data" ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-stack", children: ['
    assert js.count(anchor) == 1
    js = js.replace(anchor, (
        '        l === "mode" ? /* @__PURE__ */ m.jsx(yt, { className: "aiwa-tma-blocks", children: /* @__PURE__ */ m.jsx(yt.Item, { header: "Режим", children: mj.map((A) => /* @__PURE__ */ m.jsx(\n'
        '          pt,\n'
        '          {\n'
        '            as: "button",\n'
        '            type: "button",\n'
        '            onClick: () => j(A.value),\n'
        '            children: /* @__PURE__ */ m.jsx(pt.Text, { type: r.mode === A.value ? "Accent" : void 0, title: A.label })\n'
        '          },\n'
        '          A.value\n'
        '        )) }) }) : null,\n'
    ) + anchor, 1)
    done.append("режим")

# --- 2. Аватар 60x60 над списком настроек --------------------------------
if "aiwa-profile-avatar" not in js:
    # Fj — компонент аватара с главной: инициал и фото из Telegram поверх него.
    anchor = ('        l === "main" ? /* @__PURE__ */ m.jsxs(m.Fragment, { children: [\n'
              '          null,\n')
    assert js.count(anchor) == 1, js.count(anchor)
    js = js.replace(anchor, (
        '        l === "main" ? /* @__PURE__ */ m.jsxs(m.Fragment, { children: [\n'
        '          /* @__PURE__ */ m.jsx("div", { className: "aiwa-profile-avatar", children: /* @__PURE__ */ m.jsx(Fj, {}) }),\n'
    ), 1)
    done.append("аватар")

BUNDLE.write_text(js, encoding="utf-8")
print("применено:", ", ".join(done) if done else "нечего, всё уже на месте")
