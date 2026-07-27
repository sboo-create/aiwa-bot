# AIWA: Paper/Figma ↔ code

The code component library is the implementation source of truth. Paper/Figma
is the visual editing and review surface. The two are linked by stable component
names from `src/aiwa/design-system/registry.json`.

## Non-negotiable rule

A reusable visual decision is never fixed on one screen.

- Token change: update `src/aiwa/styles/theme.css`, then review every Storybook
  story that consumes the token.
- Component change: update the registered component, its complete Storybook
  states, then let all screens receive the change through imports.
- Composition change: update the shared section or panel and its composition
  story.
- One-screen exception: only add it when the user explicitly asks for an
  exception. Document the reason next to the code and in the handoff notes.

Product screens must not import the raw TMA `Cell`. `AiwaCell` is the only owner
of that primitive, so a change to `AIWA/Cell` propagates everywhere.
The same rule applies to full-height sheets: `AiwaModalView` owns the shared
surface and raw `ModalView` stays behind that wrapper.

## Code → Paper/Figma

1. Run `npm run storybook`.
2. Export the relevant Storybook component states before exporting product
   screens.
3. Keep the component names exactly as registered, for example `AIWA/Cell`,
   `AIWA/Cell/Metric`, and `AIWA/Card/Insight`.
4. Use component instances on screens. Do not detach an instance to make a
   visual correction.
5. Record the Storybook route and code component name in the Paper/Figma frame
   description.

## Paper/Figma → code

For every edited object, classify the change before implementation:

| Change in the design | Code owner |
| --- | --- |
| Color, type, radius, spacing, elevation | semantic token in `styles/theme.css` |
| Cell, field, card, header, control | registered component |
| Repeated group of components | shared section/panel |
| Content or order unique to one screen | screen composition |

Then:

1. Compare the edited master component with its Storybook route.
2. Update the smallest shared owner from the table above.
3. Add every meaningful state to Storybook: default, pressed/selected,
   disabled, loading, empty, error, and long content where applicable.
4. Search all usages of the changed export with `rg`.
5. Run `npm run verify`.
6. Review the affected Storybook page and all screens that use the component.

## Handoff format

Use this short note when returning an edited design:

```text
Object: AIWA/Cell/Metric
Storybook: /showcase/cell
Scope: component
Changed: padding, value typography, warning icon
States touched: default, warning
Exception: none
```

If `Scope` is not stated, it is treated as a shared component change. A visual
edit on a detached or unnamed layer is not implemented until it is mapped to a
registered component or explicitly approved as a screen exception.

## Adding a component

1. Add the component under `src/aiwa/components`.
2. Export it from `src/aiwa/index.js`.
3. Add a Storybook page or state.
4. Register a stable `AIWA/*` design name in
   `src/aiwa/design-system/registry.json`.
5. Only then use it in a screen, section, or panel.

`npm run check:design-system` enforces the registry, exports, Storybook routes,
and the single-owner rule for cells.
