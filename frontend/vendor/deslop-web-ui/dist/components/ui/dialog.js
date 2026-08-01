import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { X as r } from "../../icons-DUsO7wRs.js";
import { c as e } from "../../utils-TrrhThB-.js";
import { Button as d } from "./button.js";
import { D as g, h as s, e as c, g as u, d as f, b as m, f as p, a as D } from "../../index-nWX1xMwe.js";
function C({
  ...a
}) {
  return /* @__PURE__ */ t(g, { "data-slot": "dialog", ...a });
}
function w({
  ...a
}) {
  return /* @__PURE__ */ t(D, { "data-slot": "dialog-trigger", ...a });
}
function x({
  ...a
}) {
  return /* @__PURE__ */ t(m, { "data-slot": "dialog-portal", ...a });
}
function z({
  ...a
}) {
  return /* @__PURE__ */ t(s, { "data-slot": "dialog-close", ...a });
}
function h({
  className: a,
  ...o
}) {
  return /* @__PURE__ */ t(
    f,
    {
      "data-slot": "dialog-overlay",
      className: e(
        "fixed inset-0 z-50 bg-transparent backdrop-brightness-50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        a
      ),
      ...o
    }
  );
}
function k({
  className: a,
  children: o,
  showCloseButton: i = !0,
  ...l
}) {
  return /* @__PURE__ */ n(x, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ t(h, {}),
    /* @__PURE__ */ n(
      c,
      {
        "data-slot": "dialog-content",
        className: e(
          "ui-background-blur fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-popover p-6 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg",
          a
        ),
        ...l,
        children: [
          o,
          i && /* @__PURE__ */ n(
            s,
            {
              "data-slot": "dialog-close",
              className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ t(r, {}),
                /* @__PURE__ */ t("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function T({ className: a, ...o }) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-slot": "dialog-header",
      className: e("flex flex-col gap-2 text-center sm:text-left", a),
      ...o
    }
  );
}
function j({
  className: a,
  showCloseButton: o = !1,
  children: i,
  ...l
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "dialog-footer",
      className: e(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        a
      ),
      ...l,
      children: [
        i,
        o && /* @__PURE__ */ t(s, { asChild: !0, children: /* @__PURE__ */ t(d, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function _({
  className: a,
  ...o
}) {
  return /* @__PURE__ */ t(
    p,
    {
      "data-slot": "dialog-title",
      className: e("text-lg leading-none font-semibold", a),
      ...o
    }
  );
}
function O({
  className: a,
  ...o
}) {
  return /* @__PURE__ */ t(
    u,
    {
      "data-slot": "dialog-description",
      className: e("text-sm text-muted-foreground", a),
      ...o
    }
  );
}
export {
  C as Dialog,
  z as DialogClose,
  k as DialogContent,
  O as DialogDescription,
  j as DialogFooter,
  T as DialogHeader,
  h as DialogOverlay,
  x as DialogPortal,
  _ as DialogTitle,
  w as DialogTrigger
};
