# AIWA interface patterns

## Direction and feel

AIWA is a calm, supportive health journal. Screens should feel like a personal
record: a quiet gray canvas, white grouped records, restrained hierarchy, and a
single orange accent reserved for the primary action or menstrual state.

Use the local Storybook and `src/aiwa/AGENTS.md` as the product source of truth.
Reuse existing TMA components and product tokens before introducing new visual
language.

## Depth and surfaces

- Use surface color shifts as the primary depth strategy.
- The page canvas is `--aiwa-screen-bg`; grouped records use `--aiwa-surface`.
- Use existing subtle shadows only for established raised elements. Do not add a
  shadow to a standalone page action.
- Controls placed inside a white section inherit that section's inset control
  treatment. A secondary action on the canvas uses a white surface, dark text,
  and no border or shadow.

## Spacing

- Use the Deslop/TMA spacing tokens and the existing section rhythm.
- `SectionList.aiwa-tma-blocks` owns the page inset, section gap, and bottom safe
  area. Children must not recreate those margins.
- Treat 4px as the base unit; prefer the existing 8/16/24px progression.

## Pattern: final page action

Use a final page action when a secondary command applies to the accumulated page
or section history rather than to one specific row. Examples are «Изменить
предпочтения» on Activity and «Сформировать выписку» after the symptom journal.

Implementation contract:

```jsx
<SectionList className="aiwa-tma-blocks">
  {/* grouped white sections */}
  <div className="aiwa-page-action">
    <AiwaButton variant="secondaryCanvas" label="…" isFill {...actionProps("…", onClick)} />
  </div>
</SectionList>
```

- Place the wrapper after the final `SectionList.Item`, never inside an
  `AiwaCell` or another white section.
- Keep it as the final content element so the SectionList controls its width,
  vertical rhythm, and tab-bar safe area.
- Use `AiwaButton`, `variant="secondaryCanvas"`, and `isFill`; keep loading and
  disabled states on the same button. Inside a white section, use the existing
  `variant="secondary"` muted-fill treatment instead.
- Reuse `.aiwa-page-action`. The legacy `.aiwa-activity-preferences` selector is
  compatible with the same layout while older call sites are migrated.
- Do not create an extra card, border, shadow, icon, or accent color for this
  action.
- Hide the action together with its source content when the command would have
  no meaningful input, such as an empty symptom history.
