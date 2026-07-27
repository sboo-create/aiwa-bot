# AIWA interface system

## Direction

Calm daily health companion: warm, direct, lightweight and medically careful.
The UI should feel like one continuous product surface, not a collection of
generic cards.

## Source of truth

- Local Storybook: `src/storybook`
- Approved TMA gateway: `src/aiwa/lib/tma.js`
- Product components: `src/aiwa/components`
- Product tokens: `src/aiwa/styles/theme.css`
- Composition rules: `src/aiwa/styles/composition.css`

Only components and patterns represented in the local Storybook may be used,
unless the user explicitly requests an exception.

## Visual system

- Brand accent: `#FF7C3D` in light and dark themes.
- Semantic status colors remain independent from the brand accent.
- Typography: SB Sans through `--ui-font-interface`.
- Spacing base: 4 px, using Deslop/TMA layout tokens.
- Depth: quiet TMA surface shifts and separators; no new decorative shadows.
- Main signature: animated AIWA mascot, weekly cycle context, and AI insight
  composed into a calm health timeline.

## Reusable patterns

- Product page: `Page` + `SectionList` + `AiwaCell`.
- Interactive row: `PaperRow` or `AiwaCell` with TMA Chevron.
- Full-screen page: `AiwaModalView` (native Telegram header + BackButton).
- Main content block: `SectionList` with `aiwa-tma-blocks`.
- Navigation: local `Navigation` over TMA `TabBar`.
- Data trend: `AiwaAreaChart` inside `SectionList.Item`; orange is the primary
  series, semantic green is reserved for a meaningful comparison, and empty or
  loading data uses the component's built-in states.
