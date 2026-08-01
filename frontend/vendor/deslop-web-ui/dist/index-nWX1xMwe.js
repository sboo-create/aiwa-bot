import * as s from "react";
import { c as p } from "./index-BMzaJ9ZT.js";
import { u as _, b as N } from "./index-OZUlxC0o.js";
import { c as k } from "./index-oVmar2KU.js";
import { u as R } from "./index-DAdtpYSB.js";
import { u as L } from "./index-CECqponX.js";
import { u as G, D as j } from "./index-CXD0mMyT.js";
import { R as z, h as H, u as K, F as U } from "./index-Cb-eNU_M.js";
import { P as V } from "./index-BVuqQyzd.js";
import { P as O } from "./index-KdL-eaFo.js";
import { P as m } from "./index-Si5tf8-e.js";
import { u as b } from "./index-CCKe-Mpx.js";
import { jsx as l, Fragment as Y } from "react/jsx-runtime";
var Z = Object.defineProperty, u = (c, o) => Z(c, "name", { value: o, configurable: !0 }), h = "Dialog", [y, de] = k(h), [q, f] = y(h), pe = /* @__PURE__ */ u((c) => {
  const {
    __scopeDialog: o,
    children: r,
    open: n,
    defaultOpen: a,
    onOpenChange: t,
    modal: e = !0
  } = c, i = s.useRef(null), d = s.useRef(null), [g, v] = L({
    prop: n,
    defaultProp: a ?? !1,
    onChange: t,
    caller: h
  }), [M, T] = s.useState(0), [F, S] = s.useState(0);
  return /* @__PURE__ */ l(
    q,
    {
      scope: o,
      triggerRef: i,
      contentRef: d,
      contentId: R(),
      titleId: R(),
      descriptionId: R(),
      titlePresent: M > 0,
      descriptionPresent: F > 0,
      setTitleCount: T,
      setDescriptionCount: S,
      open: g,
      onOpenChange: v,
      onOpenToggle: s.useCallback(() => v((w) => !w), [v]),
      modal: e,
      children: r
    }
  );
}, "Dialog"), B = "DialogTrigger", De = /* @__PURE__ */ s.forwardRef(
  /* @__PURE__ */ u(function(o, r) {
    const { __scopeDialog: n, ...a } = o, t = f(B, n), e = _(r, t.triggerRef);
    return /* @__PURE__ */ l(
      m.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": t.open,
        "aria-controls": t.open ? t.contentId : void 0,
        "data-state": C(t.open),
        ...a,
        ref: e,
        onClick: p(o.onClick, t.onOpenToggle)
      }
    );
  }, "DialogTrigger")
), I = "DialogPortal", [J, x] = y(I, {
  forceMount: void 0
}), me = /* @__PURE__ */ u((c) => {
  const { __scopeDialog: o, forceMount: r, children: n, container: a } = c, t = f(I, o);
  return /* @__PURE__ */ l(J, { scope: o, forceMount: r, children: s.Children.map(n, (e) => /* @__PURE__ */ l(O, { present: r || t.open, children: /* @__PURE__ */ l(V, { asChild: !0, container: a, children: e }) })) });
}, "DialogPortal"), P = "DialogOverlay", Ce = /* @__PURE__ */ s.forwardRef(
  /* @__PURE__ */ u(function(o, r) {
    const n = x(P, o.__scopeDialog), { forceMount: a = n.forceMount, ...t } = o, e = f(P, o.__scopeDialog);
    return e.modal ? /* @__PURE__ */ l(O, { present: a || e.open, children: /* @__PURE__ */ l(W, { ...t, ref: r }) }) : null;
  }, "DialogOverlay")
), Q = N("DialogOverlay.RemoveScroll"), W = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ u(function(o, r) {
    const { __scopeDialog: n, ...a } = o, t = f(P, n), e = G(), i = _(r, e);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ l(z, { as: Q, allowPinchZoom: !0, shards: [t.contentRef], children: /* @__PURE__ */ l(
        m.div,
        {
          "data-state": C(t.open),
          ...a,
          ref: i,
          style: { pointerEvents: "auto", ...a.style }
        }
      ) })
    );
  }, "DialogOverlayImpl")
), D = "DialogContent", ve = /* @__PURE__ */ s.forwardRef(
  /* @__PURE__ */ u(function(o, r) {
    const n = x(D, o.__scopeDialog), { forceMount: a = n.forceMount, ...t } = o, e = f(D, o.__scopeDialog);
    return /* @__PURE__ */ l(O, { present: a || e.open, children: e.modal ? /* @__PURE__ */ l(X, { ...t, ref: r }) : /* @__PURE__ */ l($, { ...t, ref: r }) });
  }, "DialogContent")
), X = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ u(function(o, r) {
    const n = f(D, o.__scopeDialog), a = s.useRef(null), t = _(r, n.contentRef, a);
    return s.useEffect(() => {
      const e = a.current;
      if (e) return H(e);
    }, []), /* @__PURE__ */ l(
      A,
      {
        ...o,
        ref: t,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        onCloseAutoFocus: p(o.onCloseAutoFocus, (e) => {
          e.preventDefault(), n.triggerRef.current?.focus();
        }),
        onPointerDownOutside: p(o.onPointerDownOutside, (e) => {
          const i = e.detail.originalEvent, d = i.button === 0 && i.ctrlKey === !0;
          (i.button === 2 || d) && e.preventDefault();
        }),
        onFocusOutside: p(
          o.onFocusOutside,
          (e) => e.preventDefault()
        )
      }
    );
  }, "DialogContentModal")
), $ = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ u(function(o, r) {
    const n = f(D, o.__scopeDialog), a = s.useRef(!1), t = s.useRef(!1);
    return /* @__PURE__ */ l(
      A,
      {
        ...o,
        ref: r,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (e) => {
          o.onCloseAutoFocus?.(e), e.defaultPrevented || (a.current || n.triggerRef.current?.focus(), e.preventDefault()), a.current = !1, t.current = !1;
        },
        onInteractOutside: (e) => {
          o.onInteractOutside?.(e), e.defaultPrevented || (a.current = !0, e.detail.originalEvent.type === "pointerdown" && (t.current = !0));
          const i = e.target;
          n.triggerRef.current?.contains(i) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && t.current && e.preventDefault();
        }
      }
    );
  }, "DialogContentNonModal")
), A = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ u(function(o, r) {
    const {
      __scopeDialog: n,
      trapFocus: a,
      onOpenAutoFocus: t,
      onCloseAutoFocus: e,
      "aria-describedby": i,
      ...d
    } = o, g = f(D, n);
    return K(), /* @__PURE__ */ l(Y, { children: /* @__PURE__ */ l(
      U,
      {
        asChild: !0,
        loop: !0,
        trapped: a,
        onMountAutoFocus: t,
        onUnmountAutoFocus: e,
        children: /* @__PURE__ */ l(
          j,
          {
            role: "dialog",
            id: g.contentId,
            "aria-labelledby": g.titlePresent ? g.titleId : void 0,
            "aria-describedby": g.descriptionPresent ? E(i, g.descriptionId) : i,
            "data-state": C(g.open),
            ...d,
            ref: r,
            deferPointerDownOutside: !0,
            onDismiss: () => g.onOpenChange(!1)
          }
        )
      }
    ) });
  }, "DialogContentImpl")
), Re = /* @__PURE__ */ s.forwardRef(
  /* @__PURE__ */ u(function(o, r) {
    const { __scopeDialog: n, ...a } = o, t = f("DialogTitle", n), { setTitleCount: e } = t;
    return b(() => (e((i) => i + 1), () => e((i) => i - 1)), [e]), /* @__PURE__ */ l(m.h2, { id: t.titleId, ...a, ref: r });
  }, "DialogTitle")
), Pe = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ u(function(o, r) {
    const { __scopeDialog: n, ...a } = o, t = f("DialogDescription", n), { setDescriptionCount: e } = t;
    return b(() => (e((i) => i + 1), () => e((i) => i - 1)), [e]), /* @__PURE__ */ l(m.p, { id: t.descriptionId, ...a, ref: r });
  }, "DialogDescription")
), ee = "DialogClose", _e = /* @__PURE__ */ s.forwardRef(
  /* @__PURE__ */ u(function(o, r) {
    const { __scopeDialog: n, ...a } = o, t = f(ee, n);
    return /* @__PURE__ */ l(
      m.button,
      {
        type: "button",
        ...a,
        ref: r,
        onClick: p(o.onClick, () => t.onOpenChange(!1))
      }
    );
  }, "DialogClose")
);
function E(...c) {
  const o = /* @__PURE__ */ new Set();
  for (const r of c)
    if (typeof r == "string")
      for (const n of String(r).trim().split(/\s+/))
        n && o.add(n);
  return o.size > 0 ? Array.from(o).join(" ") : void 0;
}
u(E, "concatAriaDescribedby");
function C(c) {
  return c ? "open" : "closed";
}
u(C, "getState");
export {
  pe as D,
  De as a,
  me as b,
  de as c,
  Ce as d,
  ve as e,
  Re as f,
  Pe as g,
  _e as h
};
