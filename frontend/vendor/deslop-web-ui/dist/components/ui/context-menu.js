import { jsx as r, jsxs as v, Fragment as N } from "react/jsx-runtime";
import { C as O, h as T, f as k } from "../../icons-DUsO7wRs.js";
import { c as f } from "../../utils-TrrhThB-.js";
import * as s from "react";
import { c as C } from "../../index-BMzaJ9ZT.js";
import { c as z } from "../../index-oVmar2KU.js";
import { P as $ } from "../../index-Si5tf8-e.js";
import { c as S, M as G, a as E, b as A, d as j, e as D, f as L, g as U, h as B, i as F, j as X, k as H, l as W, m as Y, n as q, o as J } from "../../index-CohL8OFz.js";
import { u as w } from "../../index-CECqponX.js";
var K = Object.defineProperty, i = (t, e) => K(t, "name", { value: e, configurable: !0 }), b = "ContextMenu", [Q, Pe] = z(b, [
  S
]), c = S(), [V, R] = Q(b), Z = /* @__PURE__ */ i((t) => {
  const { __scopeContextMenu: e, children: n, onOpenChange: o, open: a, dir: u, modal: l = !0 } = t, x = s.useRef(!1), [d, M] = w({
    prop: a,
    defaultProp: !1,
    onChange: o,
    caller: b
  }), h = c(e);
  return /* @__PURE__ */ r(
    V,
    {
      scope: e,
      open: d,
      onOpenChange: M,
      modal: l,
      hasInteractedRef: x,
      children: /* @__PURE__ */ r(G, { ...h, dir: u, open: d, onOpenChange: M, modal: l, children: n })
    }
  );
}, "ContextMenu"), ee = "ContextMenuTrigger", te = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ i(function(e, n) {
    const { __scopeContextMenu: o, disabled: a = !1, ...u } = e, l = R(ee, o), x = c(o), [d, M] = s.useState({ x: 0, y: 0 }), h = s.useMemo(
      () => ({
        current: {
          getBoundingClientRect: /* @__PURE__ */ i(() => DOMRect.fromRect({ width: 0, height: 0, ...d }), "getBoundingClientRect")
        }
      }),
      [d]
    ), _ = s.useRef(0), p = s.useCallback(
      () => window.clearTimeout(_.current),
      []
    ), P = /* @__PURE__ */ i((m) => {
      l.hasInteractedRef.current = !0, M({ x: m.clientX, y: m.clientY }), l.onOpenChange(!0);
    }, "handleOpen");
    return s.useEffect(() => p, [p]), s.useEffect(() => void (a && p()), [a, p]), /* @__PURE__ */ v(N, { children: [
      /* @__PURE__ */ r(E, { ...x, virtualRef: h }),
      /* @__PURE__ */ r(
        $.span,
        {
          "data-state": l.open ? "open" : "closed",
          "data-disabled": a ? "" : void 0,
          ...u,
          ref: n,
          style: { WebkitTouchCallout: "none", ...e.style },
          onContextMenu: a ? e.onContextMenu : C(e.onContextMenu, (m) => {
            p(), P(m), m.preventDefault();
          }),
          onPointerDown: a ? e.onPointerDown : C(
            e.onPointerDown,
            g((m) => {
              p(), l.open && l.onOpenChange(!1), _.current = window.setTimeout(() => P(m), 700);
            })
          ),
          onPointerMove: a ? e.onPointerMove : C(e.onPointerMove, g(p)),
          onPointerCancel: a ? e.onPointerCancel : C(e.onPointerCancel, g(p)),
          onPointerUp: a ? e.onPointerUp : C(e.onPointerUp, g(p))
        }
      )
    ] });
  }, "ContextMenuTrigger")
), I = /* @__PURE__ */ i((t) => {
  const { __scopeContextMenu: e, ...n } = t, o = c(e);
  return /* @__PURE__ */ r(A, { ...o, ...n });
}, "ContextMenuPortal"), ne = "ContextMenuContent", oe = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ i(function(e, n) {
    const { __scopeContextMenu: o, ...a } = e, u = R(ne, o), l = c(o), x = s.useRef(!1);
    return /* @__PURE__ */ r(
      j,
      {
        ...l,
        ...a,
        ref: n,
        side: "right",
        sideOffset: 2,
        align: "start",
        onCloseAutoFocus: (d) => {
          e.onCloseAutoFocus?.(d), !d.defaultPrevented && x.current && d.preventDefault(), x.current = !1;
        },
        onInteractOutside: (d) => {
          e.onInteractOutside?.(d), !d.defaultPrevented && !u.modal && (x.current = !0);
        },
        style: {
          ...e.style,
          "--radix-context-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-context-menu-content-available-width": "var(--radix-popper-available-width)",
          "--radix-context-menu-content-available-height": "var(--radix-popper-available-height)",
          "--radix-context-menu-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-context-menu-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    );
  }, "ContextMenuContent")
), re = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ i(function(e, n) {
    const { __scopeContextMenu: o, ...a } = e, u = c(o);
    return /* @__PURE__ */ r(D, { ...u, ...a, ref: n });
  }, "ContextMenuGroup")
), ae = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ i(function(e, n) {
    const { __scopeContextMenu: o, ...a } = e, u = c(o);
    return /* @__PURE__ */ r(L, { ...u, ...a, ref: n });
  }, "ContextMenuLabel")
), ue = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ i(function(e, n) {
    const { __scopeContextMenu: o, ...a } = e, u = c(o);
    return /* @__PURE__ */ r(U, { ...u, ...a, ref: n });
  }, "ContextMenuItem")
), se = /* @__PURE__ */ s.forwardRef(/* @__PURE__ */ i(function(e, n) {
  const { __scopeContextMenu: o, ...a } = e, u = c(o);
  return /* @__PURE__ */ r(B, { ...u, ...a, ref: n });
}, "ContextMenuCheckboxItem")), ie = /* @__PURE__ */ s.forwardRef(/* @__PURE__ */ i(function(e, n) {
  const { __scopeContextMenu: o, ...a } = e, u = c(o);
  return /* @__PURE__ */ r(F, { ...u, ...a, ref: n });
}, "ContextMenuRadioGroup")), ce = /* @__PURE__ */ s.forwardRef(/* @__PURE__ */ i(function(e, n) {
  const { __scopeContextMenu: o, ...a } = e, u = c(o);
  return /* @__PURE__ */ r(X, { ...u, ...a, ref: n });
}, "ContextMenuRadioItem")), y = /* @__PURE__ */ s.forwardRef(/* @__PURE__ */ i(function(e, n) {
  const { __scopeContextMenu: o, ...a } = e, u = c(o);
  return /* @__PURE__ */ r(H, { ...u, ...a, ref: n });
}, "ContextMenuItemIndicator")), de = /* @__PURE__ */ s.forwardRef(/* @__PURE__ */ i(function(e, n) {
  const { __scopeContextMenu: o, ...a } = e, u = c(o);
  return /* @__PURE__ */ r(W, { ...u, ...a, ref: n });
}, "ContextMenuSeparator")), le = "ContextMenuSub", xe = /* @__PURE__ */ i((t) => {
  const { __scopeContextMenu: e, children: n, onOpenChange: o, open: a, defaultOpen: u } = t, l = c(e), [x, d] = w({
    prop: a,
    defaultProp: u ?? !1,
    onChange: o,
    caller: le
  });
  return /* @__PURE__ */ r(Y, { ...l, open: x, onOpenChange: d, children: n });
}, "ContextMenuSub"), pe = /* @__PURE__ */ s.forwardRef(/* @__PURE__ */ i(function(e, n) {
  const { __scopeContextMenu: o, ...a } = e, u = c(o);
  return /* @__PURE__ */ r(q, { ...u, ...a, ref: n });
}, "ContextMenuSubTrigger")), fe = /* @__PURE__ */ s.forwardRef(/* @__PURE__ */ i(function(e, n) {
  const { __scopeContextMenu: o, ...a } = e, u = c(o);
  return /* @__PURE__ */ r(
    J,
    {
      ...u,
      ...a,
      ref: n,
      style: {
        ...e.style,
        "--radix-context-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-context-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-context-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-context-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-context-menu-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
}, "ContextMenuSubContent"));
function g(t) {
  return (e) => e.pointerType !== "mouse" ? t(e) : void 0;
}
i(g, "whenTouchOrPen");
function Se({
  ...t
}) {
  return /* @__PURE__ */ r(Z, { "data-slot": "context-menu", ...t });
}
function we({
  ...t
}) {
  return /* @__PURE__ */ r(te, { "data-slot": "context-menu-trigger", ...t });
}
function Re({
  ...t
}) {
  return /* @__PURE__ */ r(re, { "data-slot": "context-menu-group", ...t });
}
function Ie({
  ...t
}) {
  return /* @__PURE__ */ r(I, { "data-slot": "context-menu-portal", ...t });
}
function ye({
  ...t
}) {
  return /* @__PURE__ */ r(xe, { "data-slot": "context-menu-sub", ...t });
}
function Ne({
  ...t
}) {
  return /* @__PURE__ */ r(
    ie,
    {
      "data-slot": "context-menu-radio-group",
      ...t
    }
  );
}
function Oe({
  className: t,
  inset: e,
  children: n,
  ...o
}) {
  return /* @__PURE__ */ v(
    pe,
    {
      "data-slot": "context-menu-sub-trigger",
      "data-inset": e,
      className: f(
        "flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[inset]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        t
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(k, { className: "ml-auto" })
      ]
    }
  );
}
function Te({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    fe,
    {
      "data-slot": "context-menu-sub-content",
      className: f(
        "ui-background-blur z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        t
      ),
      ...e
    }
  );
}
function ke({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(I, { children: /* @__PURE__ */ r(
    oe,
    {
      "data-slot": "context-menu-content",
      className: f(
        "ui-background-blur z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        t
      ),
      ...e
    }
  ) });
}
function ze({
  className: t,
  inset: e,
  variant: n = "default",
  ...o
}) {
  return /* @__PURE__ */ r(
    ue,
    {
      "data-slot": "context-menu-item",
      "data-inset": e,
      "data-variant": n,
      className: f(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive data-[variant=destructive]:focus:text-destructive-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!",
        t
      ),
      ...o
    }
  );
}
function $e({
  className: t,
  children: e,
  checked: n,
  ...o
}) {
  return /* @__PURE__ */ v(
    se,
    {
      "data-slot": "context-menu-checkbox-item",
      className: f(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        t
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ r(y, { children: /* @__PURE__ */ r(O, { className: "size-4" }) }) }),
        e
      ]
    }
  );
}
function Ge({
  className: t,
  children: e,
  ...n
}) {
  return /* @__PURE__ */ v(
    ce,
    {
      "data-slot": "context-menu-radio-item",
      className: f(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ r(y, { children: /* @__PURE__ */ r(T, { className: "size-2 fill-current" }) }) }),
        e
      ]
    }
  );
}
function Ee({
  className: t,
  inset: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    ae,
    {
      "data-slot": "context-menu-label",
      "data-inset": e,
      className: f(
        "px-2 py-1.5 text-sm font-medium text-foreground data-[inset]:pl-8",
        t
      ),
      ...n
    }
  );
}
function Ae({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    de,
    {
      "data-slot": "context-menu-separator",
      className: f("-mx-1 my-1 h-px bg-border", t),
      ...e
    }
  );
}
function je({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    "span",
    {
      "data-slot": "context-menu-shortcut",
      className: f(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
export {
  Se as ContextMenu,
  $e as ContextMenuCheckboxItem,
  ke as ContextMenuContent,
  Re as ContextMenuGroup,
  ze as ContextMenuItem,
  Ee as ContextMenuLabel,
  Ie as ContextMenuPortal,
  Ne as ContextMenuRadioGroup,
  Ge as ContextMenuRadioItem,
  Ae as ContextMenuSeparator,
  je as ContextMenuShortcut,
  ye as ContextMenuSub,
  Te as ContextMenuSubContent,
  Oe as ContextMenuSubTrigger,
  we as ContextMenuTrigger
};
