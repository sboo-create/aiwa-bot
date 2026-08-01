import { jsx as t, jsxs as P } from "react/jsx-runtime";
import { C as B, h as U, f as H } from "../../icons-DUsO7wRs.js";
import { c as h } from "../../utils-TrrhThB-.js";
import * as s from "react";
import { c as Y } from "../../index-CxcvVwJj.js";
import { u as q } from "../../index-B0BN408G.js";
import { c as C } from "../../index-BMzaJ9ZT.js";
import { u as J } from "../../index-OZUlxC0o.js";
import { c as Q } from "../../index-oVmar2KU.js";
import { u as R } from "../../index-DAdtpYSB.js";
import { c as W, M as X, a as Z, b as ee, d as re, e as ne, f as te, g as ae, h as oe, i as ue, j as se, k as ie, l as ce, m as de, n as le, o as be } from "../../index-CohL8OFz.js";
import { c as E, R as pe, a as fe } from "../../index-JYieXO2U.js";
import { P as z } from "../../index-Si5tf8-e.js";
import { u as D } from "../../index-CECqponX.js";
var me = Object.defineProperty, l = (r, e) => me(r, "name", { value: e, configurable: !0 }), I = "Menubar", [y, ge, Me] = Y(I), [F, We] = Q(I, [
  Me,
  E
]), b = W(), $ = E(), [ve, T] = F(I), he = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ l(function(e, a) {
    const {
      __scopeMenubar: n,
      value: o,
      onValueChange: u,
      defaultValue: M,
      loop: f = !0,
      dir: c,
      ...i
    } = e, m = q(c), d = $(n), [x, g] = D({
      prop: o,
      onChange: u,
      defaultProp: M ?? "",
      caller: I
    }), [v, p] = s.useState(null);
    return /* @__PURE__ */ t(
      ve,
      {
        scope: n,
        value: x,
        onMenuOpen: s.useCallback(
          (S) => {
            g(S), p(S);
          },
          [g]
        ),
        onMenuClose: s.useCallback(() => g(""), [g]),
        onMenuToggle: s.useCallback(
          (S) => {
            g((N) => N ? "" : S), p(S);
          },
          [g]
        ),
        dir: m,
        loop: f,
        children: /* @__PURE__ */ t(y.Provider, { scope: n, children: /* @__PURE__ */ t(y.Slot, { scope: n, children: /* @__PURE__ */ t(
          pe,
          {
            asChild: !0,
            ...d,
            orientation: "horizontal",
            loop: f,
            dir: m,
            currentTabStopId: v,
            onCurrentTabStopIdChange: p,
            children: /* @__PURE__ */ t(z.div, { role: "menubar", ...i, ref: a })
          }
        ) }) })
      }
    );
  }, "Menubar")
), K = "MenubarMenu", [xe, L] = F(K), Se = /* @__PURE__ */ l((r) => {
  const { __scopeMenubar: e, value: a, ...n } = r, o = R(), u = a || o || "LEGACY_REACT_AUTO_VALUE", M = T(K, e), f = b(e), c = s.useRef(null), i = s.useRef(!1), m = M.value === u;
  return s.useEffect(() => {
    m || (i.current = !1);
  }, [m]), /* @__PURE__ */ t(
    xe,
    {
      scope: e,
      value: u,
      triggerId: R(),
      triggerRef: c,
      contentId: R(),
      wasKeyboardTriggerOpenRef: i,
      children: /* @__PURE__ */ t(
        X,
        {
          ...f,
          open: m,
          onOpenChange: (d) => {
            d || M.onMenuClose();
          },
          modal: !1,
          dir: M.dir,
          ...n
        }
      )
    }
  );
}, "MenubarMenu"), A = "MenubarTrigger", Ce = /* @__PURE__ */ s.forwardRef(
  /* @__PURE__ */ l(function(e, a) {
    const { __scopeMenubar: n, disabled: o = !1, ...u } = e, M = $(n), f = b(n), c = T(A, n), i = L(A, n), m = s.useRef(null), d = J(a, m, i.triggerRef), [x, g] = s.useState(!1), v = c.value === i.value;
    return /* @__PURE__ */ t(y.ItemSlot, { scope: n, value: i.value, disabled: o, children: /* @__PURE__ */ t(
      fe,
      {
        asChild: !0,
        ...M,
        focusable: !o,
        tabStopId: i.value,
        children: /* @__PURE__ */ t(Z, { asChild: !0, ...f, children: /* @__PURE__ */ t(
          z.button,
          {
            type: "button",
            role: "menuitem",
            id: i.triggerId,
            "aria-haspopup": "menu",
            "aria-expanded": v,
            "aria-controls": v ? i.contentId : void 0,
            "data-highlighted": x ? "" : void 0,
            "data-state": v ? "open" : "closed",
            "data-disabled": o ? "" : void 0,
            disabled: o,
            ...u,
            ref: d,
            onPointerDown: C(e.onPointerDown, (p) => {
              !o && p.button === 0 && p.ctrlKey === !1 && (c.onMenuOpen(i.value), v || p.preventDefault());
            }),
            onPointerEnter: C(e.onPointerEnter, () => {
              !!c.value && !v && (c.onMenuOpen(i.value), m.current?.focus());
            }),
            onKeyDown: C(e.onKeyDown, (p) => {
              o || (["Enter", " "].includes(p.key) && c.onMenuToggle(i.value), p.key === "ArrowDown" && c.onMenuOpen(i.value), ["Enter", " ", "ArrowDown"].includes(p.key) && (i.wasKeyboardTriggerOpenRef.current = !0, p.preventDefault()));
            }),
            onFocus: C(e.onFocus, () => g(!0)),
            onBlur: C(e.onBlur, () => g(!1))
          }
        ) })
      }
    ) });
  }, "MenubarTrigger")
), _e = /* @__PURE__ */ l((r) => {
  const { __scopeMenubar: e, ...a } = r, n = b(e);
  return /* @__PURE__ */ t(ee, { ...n, ...a });
}, "MenubarPortal"), G = "MenubarContent", Ie = /* @__PURE__ */ s.forwardRef(
  /* @__PURE__ */ l(function(e, a) {
    const { __scopeMenubar: n, align: o = "start", ...u } = e, M = b(n), f = T(G, n), c = L(G, n), i = ge(n), m = s.useRef(!1);
    return /* @__PURE__ */ t(
      re,
      {
        id: c.contentId,
        "aria-labelledby": c.triggerId,
        "data-radix-menubar-content": "",
        ...M,
        ...u,
        ref: a,
        align: o,
        onCloseAutoFocus: C(e.onCloseAutoFocus, (d) => {
          !!!f.value && !m.current && c.triggerRef.current?.focus(), m.current = !1, d.preventDefault();
        }),
        onFocusOutside: C(e.onFocusOutside, (d) => {
          const x = d.target;
          i().some((v) => v.ref.current?.contains(x)) && d.preventDefault();
        }),
        onInteractOutside: C(e.onInteractOutside, () => {
          m.current = !0;
        }),
        onEntryFocus: (d) => {
          c.wasKeyboardTriggerOpenRef.current || d.preventDefault();
        },
        onKeyDown: C(
          e.onKeyDown,
          (d) => {
            if (["ArrowRight", "ArrowLeft"].includes(d.key)) {
              const x = d.target, g = x.hasAttribute("data-radix-menubar-subtrigger"), v = x.closest("[data-radix-menubar-content]") !== d.currentTarget, S = (f.dir === "rtl" ? "ArrowRight" : "ArrowLeft") === d.key;
              if (!S && g || v && S) return;
              let _ = i().filter((w) => !w.disabled).map((w) => w.value);
              S && _.reverse();
              const O = _.indexOf(c.value);
              _ = f.loop ? j(_, O + 1) : _.slice(O + 1);
              const [k] = _;
              k && f.onMenuOpen(k);
            }
          },
          { checkForDefaultPrevented: !1 }
        ),
        style: {
          ...e.style,
          "--radix-menubar-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-menubar-content-available-width": "var(--radix-popper-available-width)",
          "--radix-menubar-content-available-height": "var(--radix-popper-available-height)",
          "--radix-menubar-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-menubar-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    );
  }, "MenubarContent")
), we = /* @__PURE__ */ s.forwardRef(
  /* @__PURE__ */ l(function(e, a) {
    const { __scopeMenubar: n, ...o } = e, u = b(n);
    return /* @__PURE__ */ t(ne, { ...u, ...o, ref: a });
  }, "MenubarGroup")
), Re = /* @__PURE__ */ s.forwardRef(
  /* @__PURE__ */ l(function(e, a) {
    const { __scopeMenubar: n, ...o } = e, u = b(n);
    return /* @__PURE__ */ t(te, { ...u, ...o, ref: a });
  }, "MenubarLabel")
), ye = /* @__PURE__ */ s.forwardRef(
  /* @__PURE__ */ l(function(e, a) {
    const { __scopeMenubar: n, ...o } = e, u = b(n);
    return /* @__PURE__ */ t(ae, { ...u, ...o, ref: a });
  }, "MenubarItem")
), Pe = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ l(function(e, a) {
    const { __scopeMenubar: n, ...o } = e, u = b(n);
    return /* @__PURE__ */ t(oe, { ...u, ...o, ref: a });
  }, "MenubarCheckboxItem")
), Te = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ l(function(e, a) {
    const { __scopeMenubar: n, ...o } = e, u = b(n);
    return /* @__PURE__ */ t(ue, { ...u, ...o, ref: a });
  }, "MenubarRadioGroup")
), Ne = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ l(function(e, a) {
    const { __scopeMenubar: n, ...o } = e, u = b(n);
    return /* @__PURE__ */ t(se, { ...u, ...o, ref: a });
  }, "MenubarRadioItem")
), V = /* @__PURE__ */ s.forwardRef(/* @__PURE__ */ l(function(e, a) {
  const { __scopeMenubar: n, ...o } = e, u = b(n);
  return /* @__PURE__ */ t(ie, { ...u, ...o, ref: a });
}, "MenubarItemIndicator")), Oe = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ l(function(e, a) {
    const { __scopeMenubar: n, ...o } = e, u = b(n);
    return /* @__PURE__ */ t(ce, { ...u, ...o, ref: a });
  }, "MenubarSeparator")
), ke = "MenubarSub", Ae = /* @__PURE__ */ l((r) => {
  const { __scopeMenubar: e, children: a, open: n, onOpenChange: o, defaultOpen: u } = r, M = b(e), [f, c] = D({
    prop: n,
    defaultProp: u ?? !1,
    onChange: o,
    caller: ke
  });
  return /* @__PURE__ */ t(de, { ...M, open: f, onOpenChange: c, children: a });
}, "MenubarSub"), Ge = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ l(function(e, a) {
    const { __scopeMenubar: n, ...o } = e, u = b(n);
    return /* @__PURE__ */ t(
      le,
      {
        "data-radix-menubar-subtrigger": "",
        ...u,
        ...o,
        ref: a
      }
    );
  }, "MenubarSubTrigger")
), Ee = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ l(function(e, a) {
    const { __scopeMenubar: n, ...o } = e, u = b(n);
    return /* @__PURE__ */ t(
      be,
      {
        ...u,
        "data-radix-menubar-content": "",
        ...o,
        ref: a,
        style: {
          ...e.style,
          "--radix-menubar-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-menubar-content-available-width": "var(--radix-popper-available-width)",
          "--radix-menubar-content-available-height": "var(--radix-popper-available-height)",
          "--radix-menubar-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-menubar-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    );
  }, "MenubarSubContent")
);
function j(r, e) {
  return r.map((a, n) => r[(e + n) % r.length]);
}
l(j, "wrapArray");
function Xe({
  className: r,
  ...e
}) {
  return /* @__PURE__ */ t(
    he,
    {
      "data-slot": "menubar",
      className: h(
        "flex h-9 items-center gap-1 rounded-md border bg-background p-1 shadow-xs",
        r
      ),
      ...e
    }
  );
}
function Ze({
  ...r
}) {
  return /* @__PURE__ */ t(Se, { "data-slot": "menubar-menu", ...r });
}
function er({
  ...r
}) {
  return /* @__PURE__ */ t(we, { "data-slot": "menubar-group", ...r });
}
function ze({
  ...r
}) {
  return /* @__PURE__ */ t(_e, { "data-slot": "menubar-portal", ...r });
}
function rr({
  ...r
}) {
  return /* @__PURE__ */ t(Te, { "data-slot": "menubar-radio-group", ...r });
}
function nr({
  className: r,
  ...e
}) {
  return /* @__PURE__ */ t(
    Ce,
    {
      "data-slot": "menubar-trigger",
      className: h(
        "flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        r
      ),
      ...e
    }
  );
}
function tr({
  className: r,
  align: e = "start",
  alignOffset: a = -4,
  sideOffset: n = 8,
  ...o
}) {
  return /* @__PURE__ */ t(ze, { children: /* @__PURE__ */ t(
    Ie,
    {
      "data-slot": "menubar-content",
      align: e,
      alignOffset: a,
      sideOffset: n,
      className: h(
        "ui-background-blur z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        r
      ),
      ...o
    }
  ) });
}
function ar({
  className: r,
  inset: e,
  variant: a = "default",
  ...n
}) {
  return /* @__PURE__ */ t(
    ye,
    {
      "data-slot": "menubar-item",
      "data-inset": e,
      "data-variant": a,
      className: h(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive data-[variant=destructive]:focus:text-destructive-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!",
        r
      ),
      ...n
    }
  );
}
function or({
  className: r,
  children: e,
  checked: a,
  ...n
}) {
  return /* @__PURE__ */ P(
    Pe,
    {
      "data-slot": "menubar-checkbox-item",
      className: h(
        "relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        r
      ),
      checked: a,
      ...n,
      children: [
        /* @__PURE__ */ t("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ t(V, { children: /* @__PURE__ */ t(B, { className: "size-4" }) }) }),
        e
      ]
    }
  );
}
function ur({
  className: r,
  children: e,
  ...a
}) {
  return /* @__PURE__ */ P(
    Ne,
    {
      "data-slot": "menubar-radio-item",
      className: h(
        "relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        r
      ),
      ...a,
      children: [
        /* @__PURE__ */ t("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ t(V, { children: /* @__PURE__ */ t(U, { className: "size-2 fill-current" }) }) }),
        e
      ]
    }
  );
}
function sr({
  className: r,
  inset: e,
  ...a
}) {
  return /* @__PURE__ */ t(
    Re,
    {
      "data-slot": "menubar-label",
      "data-inset": e,
      className: h(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        r
      ),
      ...a
    }
  );
}
function ir({
  className: r,
  ...e
}) {
  return /* @__PURE__ */ t(
    Oe,
    {
      "data-slot": "menubar-separator",
      className: h("-mx-1 my-1 h-px bg-border", r),
      ...e
    }
  );
}
function cr({
  className: r,
  ...e
}) {
  return /* @__PURE__ */ t(
    "span",
    {
      "data-slot": "menubar-shortcut",
      className: h(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        r
      ),
      ...e
    }
  );
}
function dr({
  ...r
}) {
  return /* @__PURE__ */ t(Ae, { "data-slot": "menubar-sub", ...r });
}
function lr({
  className: r,
  inset: e,
  children: a,
  ...n
}) {
  return /* @__PURE__ */ P(
    Ge,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": e,
      className: h(
        "flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none focus:bg-accent focus:text-accent-foreground data-[inset]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        r
      ),
      ...n,
      children: [
        a,
        /* @__PURE__ */ t(H, { className: "ml-auto h-4 w-4" })
      ]
    }
  );
}
function br({
  className: r,
  ...e
}) {
  return /* @__PURE__ */ t(
    Ee,
    {
      "data-slot": "menubar-sub-content",
      className: h(
        "ui-background-blur z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        r
      ),
      ...e
    }
  );
}
export {
  Xe as Menubar,
  or as MenubarCheckboxItem,
  tr as MenubarContent,
  er as MenubarGroup,
  ar as MenubarItem,
  sr as MenubarLabel,
  Ze as MenubarMenu,
  ze as MenubarPortal,
  rr as MenubarRadioGroup,
  ur as MenubarRadioItem,
  ir as MenubarSeparator,
  cr as MenubarShortcut,
  dr as MenubarSub,
  br as MenubarSubContent,
  lr as MenubarSubTrigger,
  nr as MenubarTrigger
};
