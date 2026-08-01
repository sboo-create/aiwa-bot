import { jsx as e } from "react/jsx-runtime";
import { c as n } from "../../index-D6rtmMCZ.js";
import { c as a } from "../../utils-TrrhThB-.js";
import { Separator as s } from "./separator.js";
import { S as i } from "../../index-OZUlxC0o.js";
const l = n(
  "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal: "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical: "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
);
function h({
  className: o,
  orientation: t,
  ...r
}) {
  return /* @__PURE__ */ e(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": t,
      className: a(l({ orientation: t }), o),
      ...r
    }
  );
}
function g({
  className: o,
  asChild: t = !1,
  ...r
}) {
  return /* @__PURE__ */ e(
    t ? i : "div",
    {
      className: a(
        "flex items-center gap-2 rounded-md border bg-muted px-4 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        o
      ),
      ...r
    }
  );
}
function v({
  className: o,
  orientation: t = "vertical",
  ...r
}) {
  return /* @__PURE__ */ e(
    s,
    {
      "data-slot": "button-group-separator",
      orientation: t,
      className: a(
        "relative m-0! self-stretch bg-input data-[orientation=vertical]:h-auto",
        o
      ),
      ...r
    }
  );
}
export {
  h as ButtonGroup,
  v as ButtonGroupSeparator,
  g as ButtonGroupText,
  l as buttonGroupVariants
};
