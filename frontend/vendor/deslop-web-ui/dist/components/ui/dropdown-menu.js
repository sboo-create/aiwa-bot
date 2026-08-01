import { jsx as r, jsxs as v } from "react/jsx-runtime";
import { C as R, h as P, f as y } from "../../icons-DUsO7wRs.js";
import { c as m } from "../../utils-TrrhThB-.js";
import * as s from "react";
import { c as M } from "../../index-BMzaJ9ZT.js";
import { u as k } from "../../index-OZUlxC0o.js";
import { c as N } from "../../index-oVmar2KU.js";
import { u as b } from "../../index-CECqponX.js";
import { P as O } from "../../index-Si5tf8-e.js";
import { c as x, M as z, a as T, b as $, d as G, e as E, f as A, g as j, h as L, i as K, j as F, k as H, l as U, m as W, n as q, o as B } from "../../index-CohL8OFz.js";
import { u as h } from "../../index-DAdtpYSB.js";
var J = Object.defineProperty, i = (o, e) => J(o, "name", { value: e, configurable: !0 }), D = "DropdownMenu", [Q, xe] = N(
  D,
  [x]
), p = x(), [V, _] = Q(D), X = /* @__PURE__ */ i((o) => {
  const {
    __scopeDropdownMenu: e,
    children: n,
    dir: t,
    open: a,
    defaultOpen: d,
    onOpenChange: u,
    modal: l = !0
  } = o, f = p(e), c = s.useRef(null), [g, w] = b({
    prop: a,
    defaultProp: d ?? !1,
    onChange: u,
    caller: D
  });
  return /* @__PURE__ */ r(
    V,
    {
      scope: e,
      triggerId: h(),
      triggerRef: c,
      contentId: h(),
      open: g,
      onOpenChange: w,
      onOpenToggle: s.useCallback(() => w((I) => !I), [w]),
      modal: l,
      children: /* @__PURE__ */ r(z, { ...f, open: g, onOpenChange: w, dir: t, modal: l, children: n })
    }
  );
}, "DropdownMenu"), Y = "DropdownMenuTrigger", Z = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ i(function(e, n) {
    const { __scopeDropdownMenu: t, disabled: a = !1, ...d } = e, u = _(Y, t), l = p(t), f = k(n, u.triggerRef);
    return /* @__PURE__ */ r(T, { asChild: !0, ...l, children: /* @__PURE__ */ r(
      O.button,
      {
        type: "button",
        id: u.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": u.open,
        "aria-controls": u.open ? u.contentId : void 0,
        "data-state": u.open ? "open" : "closed",
        "data-disabled": a ? "" : void 0,
        disabled: a,
        ...d,
        ref: f,
        onPointerDown: M(e.onPointerDown, (c) => {
          !a && c.button === 0 && c.ctrlKey === !1 && (u.onOpenToggle(), u.open || c.preventDefault());
        }),
        onKeyDown: M(e.onKeyDown, (c) => {
          a || (["Enter", " "].includes(c.key) && u.onOpenToggle(), c.key === "ArrowDown" && u.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(c.key) && c.preventDefault());
        })
      }
    ) });
  }, "DropdownMenuTrigger")
), C = /* @__PURE__ */ i((o) => {
  const { __scopeDropdownMenu: e, ...n } = o, t = p(e);
  return /* @__PURE__ */ r($, { ...t, ...n });
}, "DropdownMenuPortal"), ee = "DropdownMenuContent", oe = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ i(function(e, n) {
    const { __scopeDropdownMenu: t, ...a } = e, d = _(ee, t), u = p(t), l = s.useRef(!1);
    return /* @__PURE__ */ r(
      G,
      {
        id: d.contentId,
        "aria-labelledby": d.triggerId,
        ...u,
        ...a,
        ref: n,
        onCloseAutoFocus: M(e.onCloseAutoFocus, (f) => {
          l.current || d.triggerRef.current?.focus(), l.current = !1, f.preventDefault();
        }),
        onInteractOutside: M(e.onInteractOutside, (f) => {
          const c = f.detail.originalEvent, g = c.button === 0 && c.ctrlKey === !0, w = c.button === 2 || g;
          (!d.modal || w) && (l.current = !0);
        }),
        style: {
          ...e.style,
          "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
          "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
          "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    );
  }, "DropdownMenuContent")
), ne = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ i(function(e, n) {
    const { __scopeDropdownMenu: t, ...a } = e, d = p(t);
    return /* @__PURE__ */ r(E, { ...d, ...a, ref: n });
  }, "DropdownMenuGroup")
), te = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ i(function(e, n) {
    const { __scopeDropdownMenu: t, ...a } = e, d = p(t);
    return /* @__PURE__ */ r(A, { ...d, ...a, ref: n });
  }, "DropdownMenuLabel")
), re = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ i(function(e, n) {
    const { __scopeDropdownMenu: t, ...a } = e, d = p(t);
    return /* @__PURE__ */ r(j, { ...d, ...a, ref: n });
  }, "DropdownMenuItem")
), ae = /* @__PURE__ */ s.forwardRef(/* @__PURE__ */ i(function(e, n) {
  const { __scopeDropdownMenu: t, ...a } = e, d = p(t);
  return /* @__PURE__ */ r(L, { ...d, ...a, ref: n });
}, "DropdownMenuCheckboxItem")), de = /* @__PURE__ */ s.forwardRef(/* @__PURE__ */ i(function(e, n) {
  const { __scopeDropdownMenu: t, ...a } = e, d = p(t);
  return /* @__PURE__ */ r(K, { ...d, ...a, ref: n });
}, "DropdownMenuRadioGroup")), ue = /* @__PURE__ */ s.forwardRef(/* @__PURE__ */ i(function(e, n) {
  const { __scopeDropdownMenu: t, ...a } = e, d = p(t);
  return /* @__PURE__ */ r(F, { ...d, ...a, ref: n });
}, "DropdownMenuRadioItem")), S = /* @__PURE__ */ s.forwardRef(/* @__PURE__ */ i(function(e, n) {
  const { __scopeDropdownMenu: t, ...a } = e, d = p(t);
  return /* @__PURE__ */ r(H, { ...d, ...a, ref: n });
}, "DropdownMenuItemIndicator")), se = /* @__PURE__ */ s.forwardRef(/* @__PURE__ */ i(function(e, n) {
  const { __scopeDropdownMenu: t, ...a } = e, d = p(t);
  return /* @__PURE__ */ r(U, { ...d, ...a, ref: n });
}, "DropdownMenuSeparator")), ie = /* @__PURE__ */ i((o) => {
  const { __scopeDropdownMenu: e, children: n, open: t, onOpenChange: a, defaultOpen: d } = o, u = p(e), [l, f] = b({
    prop: t,
    defaultProp: d ?? !1,
    onChange: a,
    caller: "DropdownMenuSub"
  });
  return /* @__PURE__ */ r(W, { ...u, open: l, onOpenChange: f, children: n });
}, "DropdownMenuSub"), pe = /* @__PURE__ */ s.forwardRef(/* @__PURE__ */ i(function(e, n) {
  const { __scopeDropdownMenu: t, ...a } = e, d = p(t);
  return /* @__PURE__ */ r(q, { ...d, ...a, ref: n });
}, "DropdownMenuSubTrigger")), ce = /* @__PURE__ */ s.forwardRef(/* @__PURE__ */ i(function(e, n) {
  const { __scopeDropdownMenu: t, ...a } = e, d = p(t);
  return /* @__PURE__ */ r(
    B,
    {
      ...d,
      ...a,
      ref: n,
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
}, "DropdownMenuSubContent"));
function _e({
  ...o
}) {
  return /* @__PURE__ */ r(X, { "data-slot": "dropdown-menu", ...o });
}
function Ce({
  ...o
}) {
  return /* @__PURE__ */ r(C, { "data-slot": "dropdown-menu-portal", ...o });
}
function Se({
  ...o
}) {
  return /* @__PURE__ */ r(
    Z,
    {
      "data-slot": "dropdown-menu-trigger",
      ...o
    }
  );
}
function Ie({
  className: o,
  sideOffset: e = 4,
  ...n
}) {
  return /* @__PURE__ */ r(C, { children: /* @__PURE__ */ r(
    oe,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: e,
      className: m(
        "ui-background-blur z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        o
      ),
      ...n
    }
  ) });
}
function Re({
  ...o
}) {
  return /* @__PURE__ */ r(ne, { "data-slot": "dropdown-menu-group", ...o });
}
function Pe({
  className: o,
  inset: e,
  variant: n = "default",
  ...t
}) {
  return /* @__PURE__ */ r(
    re,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": n,
      className: m(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive data-[variant=destructive]:focus:text-destructive-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!",
        o
      ),
      ...t
    }
  );
}
function ye({
  className: o,
  children: e,
  checked: n,
  ...t
}) {
  return /* @__PURE__ */ v(
    ae,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      className: m(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        o
      ),
      checked: n,
      ...t,
      children: [
        /* @__PURE__ */ r("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ r(S, { children: /* @__PURE__ */ r(R, { className: "size-4" }) }) }),
        e
      ]
    }
  );
}
function ke({
  ...o
}) {
  return /* @__PURE__ */ r(
    de,
    {
      "data-slot": "dropdown-menu-radio-group",
      ...o
    }
  );
}
function Ne({
  className: o,
  children: e,
  ...n
}) {
  return /* @__PURE__ */ v(
    ue,
    {
      "data-slot": "dropdown-menu-radio-item",
      className: m(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        o
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ r(S, { children: /* @__PURE__ */ r(P, { className: "size-2 fill-current" }) }) }),
        e
      ]
    }
  );
}
function Oe({
  className: o,
  inset: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    te,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": e,
      className: m(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        o
      ),
      ...n
    }
  );
}
function ze({
  className: o,
  ...e
}) {
  return /* @__PURE__ */ r(
    se,
    {
      "data-slot": "dropdown-menu-separator",
      className: m("-mx-1 my-1 h-px bg-border", o),
      ...e
    }
  );
}
function Te({
  className: o,
  ...e
}) {
  return /* @__PURE__ */ r(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: m(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        o
      ),
      ...e
    }
  );
}
function $e({
  ...o
}) {
  return /* @__PURE__ */ r(ie, { "data-slot": "dropdown-menu-sub", ...o });
}
function Ge({
  className: o,
  inset: e,
  children: n,
  ...t
}) {
  return /* @__PURE__ */ v(
    pe,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: m(
        "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[inset]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        o
      ),
      ...t,
      children: [
        n,
        /* @__PURE__ */ r(y, { className: "ml-auto size-4" })
      ]
    }
  );
}
function Ee({
  className: o,
  ...e
}) {
  return /* @__PURE__ */ r(
    ce,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: m(
        "ui-background-blur z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        o
      ),
      ...e
    }
  );
}
export {
  _e as DropdownMenu,
  ye as DropdownMenuCheckboxItem,
  Ie as DropdownMenuContent,
  Re as DropdownMenuGroup,
  Pe as DropdownMenuItem,
  Oe as DropdownMenuLabel,
  Ce as DropdownMenuPortal,
  ke as DropdownMenuRadioGroup,
  Ne as DropdownMenuRadioItem,
  ze as DropdownMenuSeparator,
  Te as DropdownMenuShortcut,
  $e as DropdownMenuSub,
  Ee as DropdownMenuSubContent,
  Ge as DropdownMenuSubTrigger,
  Se as DropdownMenuTrigger
};
