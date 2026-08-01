import { jsx as e, jsxs as n } from "react/jsx-runtime";
import { X as d } from "../../icons-DUsO7wRs.js";
import { c as o } from "../../utils-TrrhThB-.js";
import { D as c, h as r, e as u, g as f, f as h, a as m, b as g, d as p } from "../../index-nWX1xMwe.js";
function v({ ...t }) {
  return /* @__PURE__ */ e(c, { "data-slot": "sheet", ...t });
}
function w({
  ...t
}) {
  return /* @__PURE__ */ e(m, { "data-slot": "sheet-trigger", ...t });
}
function C({
  ...t
}) {
  return /* @__PURE__ */ e(r, { "data-slot": "sheet-close", ...t });
}
function b({
  ...t
}) {
  return /* @__PURE__ */ e(g, { "data-slot": "sheet-portal", ...t });
}
function x({
  className: t,
  ...a
}) {
  return /* @__PURE__ */ e(
    p,
    {
      "data-slot": "sheet-overlay",
      className: o(
        "fixed inset-0 z-50 bg-transparent backdrop-brightness-50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        t
      ),
      ...a
    }
  );
}
function T({
  className: t,
  children: a,
  side: s = "right",
  showCloseButton: i = !0,
  ...l
}) {
  return /* @__PURE__ */ n(b, { children: [
    /* @__PURE__ */ e(x, {}),
    /* @__PURE__ */ n(
      u,
      {
        "data-slot": "sheet-content",
        className: o(
          "ui-background-blur fixed z-50 flex flex-col gap-4 bg-popover shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-500",
          s === "right" && "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
          s === "left" && "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
          s === "top" && "inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
          s === "bottom" && "inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          t
        ),
        ...l,
        children: [
          a,
          i && /* @__PURE__ */ n(r, { className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
            /* @__PURE__ */ e(d, { className: "size-4" }),
            /* @__PURE__ */ e("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function k({ className: t, ...a }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "sheet-header",
      className: o("flex flex-col gap-1.5 p-4", t),
      ...a
    }
  );
}
function z({ className: t, ...a }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "sheet-footer",
      className: o("mt-auto flex flex-col gap-2 p-4", t),
      ...a
    }
  );
}
function j({
  className: t,
  ...a
}) {
  return /* @__PURE__ */ e(
    h,
    {
      "data-slot": "sheet-title",
      className: o("font-semibold text-foreground", t),
      ...a
    }
  );
}
function O({
  className: t,
  ...a
}) {
  return /* @__PURE__ */ e(
    f,
    {
      "data-slot": "sheet-description",
      className: o("text-sm text-muted-foreground", t),
      ...a
    }
  );
}
export {
  v as Sheet,
  C as SheetClose,
  T as SheetContent,
  O as SheetDescription,
  z as SheetFooter,
  k as SheetHeader,
  j as SheetTitle,
  w as SheetTrigger
};
