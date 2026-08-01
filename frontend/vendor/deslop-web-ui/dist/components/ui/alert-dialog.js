import { jsx as a, jsxs as C } from "react/jsx-runtime";
import { c as s } from "../../utils-TrrhThB-.js";
import { IconAvatar as x } from "./avatar.js";
import { Button as D } from "./button.js";
import * as n from "react";
import { c as w } from "../../index-oVmar2KU.js";
import { u as m } from "../../index-OZUlxC0o.js";
import { c as A, D as z, a as P, b as R, d as h, e as N, f as S, g as O, h as v } from "../../index-nWX1xMwe.js";
import { c as T } from "../../index-BMzaJ9ZT.js";
var b = Object.defineProperty, c = (e, t) => b(e, "name", { value: t, configurable: !0 }), y = "AlertDialog", [$, ot] = w(y, [
  A
]), d = A(), E = /* @__PURE__ */ c((e) => {
  const { __scopeAlertDialog: t, ...o } = e, r = d(t);
  return /* @__PURE__ */ a(z, { ...r, ...o, modal: !0 });
}, "AlertDialog"), j = n.forwardRef(
  /* @__PURE__ */ c(function(t, o) {
    const { __scopeAlertDialog: r, ...i } = t, l = d(r);
    return /* @__PURE__ */ a(P, { ...l, ...i, ref: o });
  }, "AlertDialogTrigger")
), M = /* @__PURE__ */ c((e) => {
  const { __scopeAlertDialog: t, ...o } = e, r = d(t);
  return /* @__PURE__ */ a(R, { ...r, ...o });
}, "AlertDialogPortal"), F = n.forwardRef(
  /* @__PURE__ */ c(function(t, o) {
    const { __scopeAlertDialog: r, ...i } = t, l = d(r);
    return /* @__PURE__ */ a(h, { ...l, ...i, ref: o });
  }, "AlertDialogOverlay")
), k = "AlertDialogContent", [H, I] = $(k), B = n.forwardRef(
  /* @__PURE__ */ c(function(t, o) {
    const { __scopeAlertDialog: r, children: i, ...l } = t, u = d(r), f = n.useRef(null), _ = m(o, f), p = n.useRef(null);
    return /* @__PURE__ */ a(H, { scope: r, cancelRef: p, children: /* @__PURE__ */ a(
      N,
      {
        role: "alertdialog",
        ...u,
        ...l,
        ref: _,
        onOpenAutoFocus: T(l.onOpenAutoFocus, (g) => {
          g.preventDefault(), p.current?.focus({ preventScroll: !0 });
        }),
        onPointerDownOutside: (g) => g.preventDefault(),
        onInteractOutside: (g) => g.preventDefault(),
        children: i
      }
    ) });
  }, "AlertDialogContent")
), L = n.forwardRef(
  /* @__PURE__ */ c(function(t, o) {
    const { __scopeAlertDialog: r, ...i } = t, l = d(r);
    return /* @__PURE__ */ a(S, { ...l, ...i, ref: o });
  }, "AlertDialogTitle")
), q = n.forwardRef(/* @__PURE__ */ c(function(t, o) {
  const { __scopeAlertDialog: r, ...i } = t, l = d(r);
  return /* @__PURE__ */ a(O, { ...l, ...i, ref: o });
}, "AlertDialogDescription")), G = n.forwardRef(
  /* @__PURE__ */ c(function(t, o) {
    const { __scopeAlertDialog: r, ...i } = t, l = d(r);
    return /* @__PURE__ */ a(v, { ...l, ...i, ref: o });
  }, "AlertDialogAction")
), J = "AlertDialogCancel", K = n.forwardRef(
  /* @__PURE__ */ c(function(t, o) {
    const { __scopeAlertDialog: r, ...i } = t, { cancelRef: l } = I(J, r), u = d(r), f = m(o, l);
    return /* @__PURE__ */ a(v, { ...u, ...i, ref: f });
  }, "AlertDialogCancel")
);
function rt({
  ...e
}) {
  return /* @__PURE__ */ a(E, { "data-slot": "alert-dialog", ...e });
}
function lt({
  ...e
}) {
  return /* @__PURE__ */ a(j, { "data-slot": "alert-dialog-trigger", ...e });
}
function Q({
  ...e
}) {
  return /* @__PURE__ */ a(M, { "data-slot": "alert-dialog-portal", ...e });
}
function U({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ a(
    F,
    {
      "data-slot": "alert-dialog-overlay",
      className: s(
        "fixed inset-0 z-50 bg-transparent backdrop-brightness-50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        e
      ),
      ...t
    }
  );
}
function it({
  className: e,
  size: t = "default",
  ...o
}) {
  return /* @__PURE__ */ C(Q, { children: [
    /* @__PURE__ */ a(U, {}),
    /* @__PURE__ */ a(
      B,
      {
        "data-slot": "alert-dialog-content",
        "data-size": t,
        className: s(
          "ui-background-blur group/alert-dialog-content fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-popover p-6 shadow-lg duration-200 data-[size=sm]:max-w-xs data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[size=default]:sm:max-w-lg",
          e
        ),
        ...o
      }
    )
  ] });
}
function nt({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: s(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        e
      ),
      ...t
    }
  );
}
function st({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: s(
        "flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        e
      ),
      ...t
    }
  );
}
function ct({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ a(
    L,
    {
      "data-slot": "alert-dialog-title",
      className: s(
        "text-lg font-semibold sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        e
      ),
      ...t
    }
  );
}
function dt({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ a(
    q,
    {
      "data-slot": "alert-dialog-description",
      className: s("text-sm text-muted-foreground", e),
      ...t
    }
  );
}
function gt({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ a(
    x,
    {
      "data-slot": "alert-dialog-media",
      className: s(
        "mb-2 size-16 sm:group-data-[size=default]/alert-dialog-content:row-span-2 [&_svg:not([class*='size-'])]:size-8",
        e
      ),
      ...t
    }
  );
}
function ut({
  className: e,
  variant: t = "default",
  size: o = "default",
  ...r
}) {
  return /* @__PURE__ */ a(D, { variant: t, size: o, asChild: !0, children: /* @__PURE__ */ a(
    G,
    {
      "data-slot": "alert-dialog-action",
      className: s(e),
      ...r
    }
  ) });
}
function ft({
  className: e,
  variant: t = "outline",
  size: o = "default",
  ...r
}) {
  return /* @__PURE__ */ a(D, { variant: t, size: o, asChild: !0, children: /* @__PURE__ */ a(
    K,
    {
      "data-slot": "alert-dialog-cancel",
      className: s(e),
      ...r
    }
  ) });
}
export {
  rt as AlertDialog,
  ut as AlertDialogAction,
  ft as AlertDialogCancel,
  it as AlertDialogContent,
  dt as AlertDialogDescription,
  st as AlertDialogFooter,
  nt as AlertDialogHeader,
  gt as AlertDialogMedia,
  U as AlertDialogOverlay,
  Q as AlertDialogPortal,
  ct as AlertDialogTitle,
  lt as AlertDialogTrigger
};
