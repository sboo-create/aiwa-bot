"""Заменяет пилюли выбора режима в профиле на ячейку со значением + шторку списка.

Правка идёт по собранному бандлу: исходников v177 в репозитории нет (они
остались на ветке origin/redesign от 27 июля и отстали на 153 строки UI).
Скрипт идемпотентный — проверяет, что правка ещё не применена.
"""
import pathlib
import sys

BUNDLE = pathlib.Path("webapp2/assets/deslop/deslop-main-aiwa-v177.js")
js = BUNDLE.read_text(encoding="utf-8")

if "aiwa-mode-value" in js:
    print("уже применено")
    sys.exit(0)

# 1. Вырезаем блок пилюль из главного вида профиля.
start = js.index('r.mode === "male" ? null : /* @__PURE__ */ m.jsxs("div", { className: "aiwa-profile-modes"')
end_marker = '/* @__PURE__ */ m.jsx(yt, { className: "aiwa-tma-blocks"'
end = js.index(end_marker, start)
js = js[:start] + "null,\n          " + js[end:]

# 2. Ячейка «Режим» со значением справа — первой строкой того же CellStack.
anchor = ('m.jsxs(yt.Item, { children: [\n'
          '            /* @__PURE__ */ m.jsx(Yt, { title: r.mode === "male" ? "Выписка по самочувствию"')
assert js.count(anchor) == 1, js.count(anchor)
mode_row = ('m.jsxs(yt.Item, { children: [\n'
            '            r.mode === "male" ? null : /* @__PURE__ */ m.jsx(Yt, {\n'
            '              title: "Режим",\n'
            '              trailing: /* @__PURE__ */ m.jsxs("span", { className: "aiwa-mode-value", children: [\n'
            '                /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: (mj.find((A) => A.value === r.mode) || mj[0]).label }),\n'
            '                /* @__PURE__ */ m.jsx(pt.Part, { type: "Chevron" })\n'
            '              ] }),\n'
            '              onClick: () => s("mode")\n'
            '            }),\n'
            '            /* @__PURE__ */ m.jsx(Yt, { title: r.mode === "male" ? "Выписка по самочувствию"')
js = js.replace(anchor, mode_row, 1)

# 3. Отдельный вид со списком режимов. Текущий помечен акцентным заголовком —
#    CellPart умеет только Chevron/Picker/Dropdown/ColorPicker, галочки в нём нет.
anchor2 = '        l === "data" ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-stack", children: ['
assert js.count(anchor2) == 1
mode_view = ('        l === "mode" ? /* @__PURE__ */ m.jsx(yt, { className: "aiwa-tma-blocks", children: /* @__PURE__ */ m.jsx(yt.Item, { header: "Режим", children: mj.map((A) => /* @__PURE__ */ m.jsx(\n'
             '          pt,\n'
             '          {\n'
             '            as: "button",\n'
             '            type: "button",\n'
             '            onClick: () => j(A.value),\n'
             '            children: /* @__PURE__ */ m.jsx(pt.Text, { type: r.mode === A.value ? "Accent" : void 0, title: A.label })\n'
             '          },\n'
             '          A.value\n'
             '        )) }) }) : null,\n') + anchor2
js = js.replace(anchor2, mode_view, 1)

BUNDLE.write_text(js, encoding="utf-8")
print("готово")
