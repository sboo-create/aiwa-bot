import { jsx as n } from "react/jsx-runtime";
import { c as o } from "../../utils-TrrhThB-.js";
function a({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "kbd",
    {
      "data-slot": "kbd",
      className: o(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm bg-muted px-1 font-sans text-xs font-medium text-muted-foreground select-none",
        "[&_svg:not([class*='size-'])]:size-3",
        "[[data-slot=tooltip-content]_&]:bg-card [[data-slot=tooltip-content]_&]:text-background",
        t
      ),
      ...e
    }
  );
}
function i({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: o("inline-flex items-center gap-1", t),
      ...e
    }
  );
}
export {
  a as Kbd,
  i as KbdGroup
};
