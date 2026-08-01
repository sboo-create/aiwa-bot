import { jsx as n } from "react/jsx-runtime";
import { c as b } from "../../utils-TrrhThB-.js";
import * as c from "react";
import { c as C } from "../../index-BMzaJ9ZT.js";
import { u as w, b as z } from "../../index-OZUlxC0o.js";
import { c as H } from "../../index-oVmar2KU.js";
import { D as $ } from "../../index-CXD0mMyT.js";
import { h as j, R as G, u as L, F as K } from "../../index-Cb-eNU_M.js";
import { u as _ } from "../../index-DAdtpYSB.js";
import { c as E, P as U, a as F, b as V } from "../../index-CBZsXggQ.js";
import { P as Z } from "../../index-BVuqQyzd.js";
import { P as I } from "../../index-KdL-eaFo.js";
import { P as q } from "../../index-Si5tf8-e.js";
import { u as B } from "../../index-CECqponX.js";
var J = Object.defineProperty, d = (o, e) => J(o, "name", { value: e, configurable: !0 }), D = "Popover", [y, Ae] = H(D, [
  E
]), R = E(), [Q, f] = y(D), W = /* @__PURE__ */ d((o) => {
  const {
    __scopePopover: e,
    children: s,
    open: t,
    defaultOpen: p,
    onOpenChange: a,
    modal: r = !1
  } = o, i = R(e), u = c.useRef(null), [P, v] = c.useState(!1), [A, g] = c.useState(0), [h, l] = c.useState(0), [x, O] = B({
    prop: t,
    defaultProp: p ?? !1,
    onChange: a,
    caller: D
  });
  return /* @__PURE__ */ n(U, { ...i, children: /* @__PURE__ */ n(
    Q,
    {
      scope: e,
      contentId: _(),
      titleId: _(),
      descriptionId: _(),
      titlePresent: A > 0,
      descriptionPresent: h > 0,
      setTitleCount: g,
      setDescriptionCount: l,
      triggerRef: u,
      open: x,
      onOpenChange: O,
      onOpenToggle: c.useCallback(() => O((k) => !k), [O]),
      hasCustomAnchor: P,
      onCustomAnchorAdd: c.useCallback(() => v(!0), []),
      onCustomAnchorRemove: c.useCallback(() => v(!1), []),
      modal: r,
      children: s
    }
  ) });
}, "Popover"), X = "PopoverAnchor", Y = /* @__PURE__ */ c.forwardRef(
  /* @__PURE__ */ d(function(e, s) {
    const { __scopePopover: t, ...p } = e, a = f(X, t), r = R(t), { onCustomAnchorAdd: i, onCustomAnchorRemove: u } = a;
    return c.useEffect(() => (i(), () => u()), [i, u]), /* @__PURE__ */ n(F, { ...r, ...p, ref: s });
  }, "PopoverAnchor")
), ee = "PopoverTrigger", oe = /* @__PURE__ */ c.forwardRef(
  /* @__PURE__ */ d(function(e, s) {
    const { __scopePopover: t, ...p } = e, a = f(ee, t), r = R(t), i = w(s, a.triggerRef), u = /* @__PURE__ */ n(
      q.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": a.open,
        "aria-controls": a.open ? a.contentId : void 0,
        "data-state": S(a.open),
        ...p,
        ref: i,
        onClick: C(e.onClick, a.onOpenToggle)
      }
    );
    return a.hasCustomAnchor ? u : /* @__PURE__ */ n(F, { asChild: !0, ...r, children: u });
  }, "PopoverTrigger")
), M = "PopoverPortal", [te, re] = y(M, {
  forceMount: void 0
}), ne = /* @__PURE__ */ d((o) => {
  const { __scopePopover: e, forceMount: s, children: t, container: p } = o, a = f(M, e);
  return /* @__PURE__ */ n(te, { scope: e, forceMount: s, children: /* @__PURE__ */ n(I, { present: s || a.open, children: /* @__PURE__ */ n(Z, { asChild: !0, container: p, children: t }) }) });
}, "PopoverPortal"), m = "PopoverContent", ae = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ d(function(e, s) {
    const t = re(m, e.__scopePopover), { forceMount: p = t.forceMount, ...a } = e, r = f(m, e.__scopePopover);
    return /* @__PURE__ */ n(I, { present: p || r.open, children: r.modal ? /* @__PURE__ */ n(ie, { ...a, ref: s }) : /* @__PURE__ */ n(ce, { ...a, ref: s }) });
  }, "PopoverContent")
), se = z("PopoverContent.RemoveScroll"), ie = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ d(function(e, s) {
    const t = f(m, e.__scopePopover), p = c.useRef(null), a = w(s, p), r = c.useRef(!1);
    return c.useEffect(() => {
      const i = p.current;
      if (i) return j(i);
    }, []), /* @__PURE__ */ n(G, { as: se, allowPinchZoom: !0, children: /* @__PURE__ */ n(
      T,
      {
        ...e,
        ref: a,
        trapFocus: t.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: C(e.onCloseAutoFocus, (i) => {
          i.preventDefault(), r.current || t.triggerRef.current?.focus();
        }),
        onPointerDownOutside: C(
          e.onPointerDownOutside,
          (i) => {
            const u = i.detail.originalEvent, P = u.button === 0 && u.ctrlKey === !0, v = u.button === 2 || P;
            r.current = v;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: C(
          e.onFocusOutside,
          (i) => i.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }, "PopoverContentModal")
), ce = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ d(function(e, s) {
    const t = f(m, e.__scopePopover), p = c.useRef(!1), a = c.useRef(!1);
    return /* @__PURE__ */ n(
      T,
      {
        ...e,
        ref: s,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (r) => {
          e.onCloseAutoFocus?.(r), r.defaultPrevented || (p.current || t.triggerRef.current?.focus(), r.preventDefault()), p.current = !1, a.current = !1;
        },
        onInteractOutside: (r) => {
          e.onInteractOutside?.(r), r.defaultPrevented || (p.current = !0, r.detail.originalEvent.type === "pointerdown" && (a.current = !0));
          const i = r.target;
          t.triggerRef.current?.contains(i) && r.preventDefault(), r.detail.originalEvent.type === "focusin" && a.current && r.preventDefault();
        }
      }
    );
  }, "PopoverContentNonModal")
), T = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ d(function(e, s) {
    const {
      __scopePopover: t,
      trapFocus: p,
      onOpenAutoFocus: a,
      onCloseAutoFocus: r,
      disableOutsidePointerEvents: i,
      onEscapeKeyDown: u,
      onPointerDownOutside: P,
      onFocusOutside: v,
      onInteractOutside: A,
      "aria-describedby": g,
      ...h
    } = e, l = f(m, t), x = R(t);
    return L(), /* @__PURE__ */ n(
      K,
      {
        asChild: !0,
        loop: !0,
        trapped: p,
        onMountAutoFocus: a,
        onUnmountAutoFocus: r,
        children: /* @__PURE__ */ n(
          $,
          {
            asChild: !0,
            disableOutsidePointerEvents: i,
            onInteractOutside: A,
            onEscapeKeyDown: u,
            onPointerDownOutside: P,
            onFocusOutside: v,
            onDismiss: () => l.onOpenChange(!1),
            deferPointerDownOutside: !0,
            children: /* @__PURE__ */ n(
              V,
              {
                "data-state": S(l.open),
                role: "dialog",
                id: l.contentId,
                "aria-labelledby": l.titlePresent ? l.titleId : void 0,
                "aria-describedby": l.descriptionPresent ? N(g, l.descriptionId) : g,
                ...x,
                ...h,
                ref: s,
                style: {
                  ...h.style,
                  "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                  "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                  "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                  "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                  "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                }
              }
            )
          }
        )
      }
    );
  }, "PopoverContentImpl")
);
function S(o) {
  return o ? "open" : "closed";
}
d(S, "getState");
function N(...o) {
  const e = /* @__PURE__ */ new Set();
  for (const s of o)
    if (typeof s == "string")
      for (const t of String(s).trim().split(/\s+/))
        t && e.add(t);
  return e.size > 0 ? Array.from(e).join(" ") : void 0;
}
d(N, "concatAriaDescribedby");
function xe({
  ...o
}) {
  return /* @__PURE__ */ n(W, { "data-slot": "popover", ...o });
}
function Oe({
  ...o
}) {
  return /* @__PURE__ */ n(oe, { "data-slot": "popover-trigger", ...o });
}
function _e({
  className: o,
  align: e = "center",
  sideOffset: s = 4,
  ...t
}) {
  return /* @__PURE__ */ n(ne, { children: /* @__PURE__ */ n(
    ae,
    {
      "data-slot": "popover-content",
      align: e,
      sideOffset: s,
      className: b(
        "ui-background-blur z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        o
      ),
      ...t
    }
  ) });
}
function De({
  ...o
}) {
  return /* @__PURE__ */ n(Y, { "data-slot": "popover-anchor", ...o });
}
function Se({ className: o, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-header",
      className: b("flex flex-col gap-1 text-sm", o),
      ...e
    }
  );
}
function we({ className: o, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-title",
      className: b("font-medium", o),
      ...e
    }
  );
}
function Ee({
  className: o,
  ...e
}) {
  return /* @__PURE__ */ n(
    "p",
    {
      "data-slot": "popover-description",
      className: b("text-muted-foreground", o),
      ...e
    }
  );
}
export {
  xe as Popover,
  De as PopoverAnchor,
  _e as PopoverContent,
  Ee as PopoverDescription,
  Se as PopoverHeader,
  we as PopoverTitle,
  Oe as PopoverTrigger
};
