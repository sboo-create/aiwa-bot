# AIWA UI

The local Storybook in `src/storybook` is the product UI source of truth.
Use only components and patterns represented there unless the user explicitly
requests an exception.

## Шапка (не трогать без явного запроса)

Верх экрана **до контентных блоков** — product/paper layout:

| Экран | Шапка (leave as-is) |
|-------|---------------------|
| Главная | PanelHeader + week/countdown/journal + AI + delay **до «Статистика»** |
| Питание | title + gauge + macros + primary CTA |
| Нагрузка | title + week/тренировки за неделю/primary CTA |
| Полноэкранные страницы | нативная шапка Telegram + BackButton (без in-app navbar) |

## Блоки (канон TMA)

Всё **ниже шапки**:

```jsx
<SectionList className="aiwa-tma-blocks">
  <SectionList.Item header="…">
    <Cell as="button" onClick={…} end={<Cell.Part type="Chevron" />}>
      <Cell.Text title="…" description="…" />
    </Cell>
  </SectionList.Item>
</SectionList>
```

- Только локальный gateway `../lib/tma` + компоненты из `src/aiwa/components`
- Не импортировать `@deslop/tma` напрямую вне `src/aiwa/lib/tma.js`
- Если компонента нет, сначала добавить его в gateway и локальный Storybook
- Не paper-card / aiwa-paper-row / ArrowRight
- CSS: `theme.css` (accent), tabbar, calendar domain; **не** ломать `.aiwa-tma-blocks`

## Кастом глобально

1. Цвета — `styles/theme.css`
2. TabBar + mascot — `Navigation.jsx`
3. Fonts — Deslop `--ui-font-interface`

Перед завершением любого UI-изменения запускать `npm run verify`.
