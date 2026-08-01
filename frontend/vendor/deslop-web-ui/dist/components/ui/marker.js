import { jsx as a } from "react/jsx-runtime";
import { c as s } from "../../index-D6rtmMCZ.js";
import { c as t } from "../../utils-TrrhThB-.js";
import { S as f } from "../../index-OZUlxC0o.js";
const i = s(
  "group/marker relative flex min-h-4 w-full items-center gap-2 text-left text-sm text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [a]:underline [a]:underline-offset-3 [a]:hover:text-foreground",
  {
    variants: {
      variant: {
        default: "",
        separator: "before:mr-1 before:h-px before:min-w-0 before:flex-1 before:bg-border after:ml-1 after:h-px after:min-w-0 after:flex-1 after:bg-border",
        border: "border-b border-border pb-2"
      }
    }
  }
);
function c({
  className: e,
  variant: r = "default",
  asChild: o = !1,
  ...n
}) {
  return /* @__PURE__ */ a(
    o ? f : "div",
    {
      "data-slot": "marker",
      "data-variant": r,
      className: t(i({ variant: r, className: e })),
      ...n
    }
  );
}
function b({ className: e, ...r }) {
  return /* @__PURE__ */ a(
    "span",
    {
      "data-slot": "marker-icon",
      "aria-hidden": "true",
      className: t(
        "size-4 shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...r
    }
  );
}
function x({ className: e, ...r }) {
  return /* @__PURE__ */ a(
    "span",
    {
      "data-slot": "marker-content",
      className: t(
        "min-w-0 wrap-break-word group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        e
      ),
      ...r
    }
  );
}
export {
  c as Marker,
  x as MarkerContent,
  b as MarkerIcon,
  i as markerVariants
};
