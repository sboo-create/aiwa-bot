# AIWA UI contract

The local Storybook is the source of truth for every product interface change.

## Mandatory workflow

1. Open `http://127.0.0.1:5173/storybook/#/ui-kit/colors` or read
   `src/storybook/config.js` before changing UI.
2. Use product components from `src/aiwa` and TMA primitives only through
   `src/aiwa/lib/tma.js`.
3. Use only components and patterns represented in the local Storybook.
4. Preserve the stable Paper/Figma component names from
   `src/aiwa/design-system/registry.json`.
5. If the required component is missing, add it to the local gateway and
   Storybook first, then use it in the product.
6. Do not import product UI directly from `@deslop/tma`, add another UI library,
   or create a parallel visual primitive.
7. Product modules use `AiwaCell`, not raw `Cell`.
8. Colours, shadows and separators come from the `--aiwa-*` tokens in
   `src/aiwa/styles/theme.css` — that file is the only place a literal colour is
   allowed. Every level maps onto a Deslop role, so light and dark come as a
   pair; a literal anywhere else is a colour that cannot follow the theme.
9. A direct user instruction may override this contract for that request only.

## Required checks

Run `npm run verify` after every UI change. It validates the local UI contract,
builds Storybook, builds the application bundle, and runs the existing AIWA
integration checks.

See `UI_COMPONENTS.md` for the approved surface and Storybook routes.
See `DESIGN_SYNC.md` for the Paper/Figma round-trip workflow.

<!-- deslop-web-ui:rules:start -->
## Web UI

- Перед любой работой с интерфейсом прочитай `.deslop/web-ui/COMPONENTS.md` и выбери существующий компонент по назначению.
- Собирай интерфейс только из локальных компонентов `src/components/web-ui`. Не импортируй продуктовые компоненты напрямую из `@deslop/web-ui`, не создавай их аналоги и не подключай другие UI-библиотеки.
- Если нужно понять устройство компонента, читай его исходники в `.deslop/web-ui/source`. Не импортируй код из этой справочной папки.
- Для кнопок, полей, переключателей, таблиц, меню, модалок, навигации, обратной связи и готовых экранов всегда используй соответствующий компонент Web UI, а не сырой HTML-контрол.
- Используй только стили, токены, шрифты и иконки Deslop. Не добавляй хардкод цветов, размеров, отступов, радиусов, теней, локальные SVG, inline styles или Tailwind arbitrary values.
- Если нужного компонента нет, остановись и сообщи, какой компонент нужно добавить в Web UI. Не создавай замену внутри продукта без прямого запроса пользователя.
- Отступать от этих правил можно только по прямому запросу пользователя. Исключение нужно явно назвать в результате работы.
- Перед завершением изменений интерфейса запускай `npm run check:web-ui` и исправляй нарушения, а не отключай проверку.
<!-- deslop-web-ui:rules:end -->
