import { jsx as s } from "react/jsx-runtime";
import { c as L } from "../../utils-TrrhThB-.js";
import * as t from "react";
import { c as p } from "../../index-BMzaJ9ZT.js";
import { c as k } from "../../index-oVmar2KU.js";
import { u as A } from "../../index-CECqponX.js";
import { u as F } from "../../index-OZUlxC0o.js";
import { c as E, P as I, a as M, b as U } from "../../index-CBZsXggQ.js";
import { P as z } from "../../index-BVuqQyzd.js";
import { P as O } from "../../index-KdL-eaFo.js";
import { P as B } from "../../index-Si5tf8-e.js";
import { D as W } from "../../index-CXD0mMyT.js";
var $ = Object.defineProperty, f = (o, e) => $(o, "name", { value: e, configurable: !0 }), T, R = "HoverCard", [_, le] = k(R, [
  E
]), w = E(), [j, S] = _(R), G = /* @__PURE__ */ f((o) => {
  const {
    __scopeHoverCard: e,
    children: n,
    open: a,
    defaultOpen: u,
    onOpenChange: i,
    openDelay: d = 700,
    closeDelay: C = 300
  } = o, h = w(e), c = t.useRef(0), P = t.useRef(0), v = t.useRef(!1), b = t.useRef(!1), [m, l] = A({
    prop: a,
    defaultProp: u ?? !1,
    onChange: i,
    caller: R
  }), r = t.useCallback(() => {
    clearTimeout(P.current), c.current = window.setTimeout(() => l(!0), d);
  }, [d, l]), H = t.useCallback(() => {
    clearTimeout(c.current), !v.current && !b.current && (P.current = window.setTimeout(() => l(!1), C));
  }, [C, l]), N = t.useCallback(() => l(!1), [l]);
  return t.useEffect(() => () => {
    clearTimeout(c.current), clearTimeout(P.current);
  }, []), /* @__PURE__ */ s(
    j,
    {
      scope: e,
      open: m,
      onOpenChange: l,
      onOpen: r,
      onClose: H,
      onDismiss: N,
      hasSelectionRef: v,
      isPointerDownOnContentRef: b,
      children: /* @__PURE__ */ s(I, { ...h, children: n })
    }
  );
}, "HoverCard"), K = "HoverCardTrigger", V = /* @__PURE__ */ t.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, n) {
    const { __scopeHoverCard: a, ...u } = e, i = S(K, a), d = w(a);
    return /* @__PURE__ */ s(M, { asChild: !0, ...d, children: /* @__PURE__ */ s(
      B.a,
      {
        "data-state": i.open ? "open" : "closed",
        ...u,
        ref: n,
        onPointerEnter: p(e.onPointerEnter, g(i.onOpen)),
        onPointerLeave: p(e.onPointerLeave, g(i.onClose)),
        onFocus: p(e.onFocus, i.onOpen),
        onBlur: p(e.onBlur, i.onClose),
        onTouchStart: p(e.onTouchStart, (C) => C.preventDefault())
      }
    ) });
  }, "HoverCardTrigger")
), D = "HoverCardPortal", [q, J] = _(D, {
  forceMount: void 0
}), Q = /* @__PURE__ */ f((o) => {
  const { __scopeHoverCard: e, forceMount: n, children: a, container: u } = o, i = S(D, e);
  return /* @__PURE__ */ s(q, { scope: e, forceMount: n, children: /* @__PURE__ */ s(O, { present: n || i.open, children: /* @__PURE__ */ s(z, { asChild: !0, container: u, children: a }) }) });
}, "HoverCardPortal"), x = "HoverCardContent", X = /* @__PURE__ */ t.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, n) {
    const a = J(x, e.__scopeHoverCard), { forceMount: u = a.forceMount, ...i } = e, d = S(x, e.__scopeHoverCard);
    return /* @__PURE__ */ s(O, { present: u || d.open, children: /* @__PURE__ */ s(
      Y,
      {
        "data-state": d.open ? "open" : "closed",
        ...i,
        onPointerEnter: p(e.onPointerEnter, g(d.onOpen)),
        onPointerLeave: p(e.onPointerLeave, g(d.onClose)),
        ref: n
      }
    ) });
  }, "HoverCardContent")
), Y = /* @__PURE__ */ t.forwardRef(/* @__PURE__ */ f(function(e, n) {
  const {
    __scopeHoverCard: a,
    onEscapeKeyDown: u,
    onPointerDownOutside: i,
    onFocusOutside: d,
    onInteractOutside: C,
    ...h
  } = e, c = S(x, a), P = w(a), v = t.useRef(null), b = F(n, v), [m, l] = t.useState(!1);
  return t.useEffect(() => {
    if (m) {
      const r = document.body;
      return T = r.style.userSelect || r.style.webkitUserSelect, r.style.userSelect = "none", r.style.webkitUserSelect = "none", () => {
        r.style.userSelect = T, r.style.webkitUserSelect = T;
      };
    }
  }, [m]), t.useEffect(() => {
    if (v.current) {
      const r = /* @__PURE__ */ f(() => {
        l(!1), c.isPointerDownOnContentRef.current = !1, setTimeout(() => {
          document.getSelection()?.toString() !== "" && (c.hasSelectionRef.current = !0);
        });
      }, "handlePointerUp");
      return document.addEventListener("pointerup", r), () => {
        document.removeEventListener("pointerup", r), c.hasSelectionRef.current = !1, c.isPointerDownOnContentRef.current = !1;
      };
    }
  }, [c.isPointerDownOnContentRef, c.hasSelectionRef]), t.useEffect(() => {
    v.current && y(v.current).forEach((H) => H.setAttribute("tabindex", "-1"));
  }), /* @__PURE__ */ s(
    W,
    {
      asChild: !0,
      disableOutsidePointerEvents: !1,
      onInteractOutside: C,
      onEscapeKeyDown: u,
      onPointerDownOutside: i,
      onFocusOutside: p(d, (r) => {
        r.preventDefault();
      }),
      onDismiss: c.onDismiss,
      children: /* @__PURE__ */ s(
        U,
        {
          ...P,
          ...h,
          onPointerDown: p(h.onPointerDown, (r) => {
            r.currentTarget.contains(r.target) && l(!0), c.hasSelectionRef.current = !1, c.isPointerDownOnContentRef.current = !0;
          }),
          ref: b,
          style: {
            ...h.style,
            userSelect: m ? "text" : void 0,
            // Safari requires prefix
            WebkitUserSelect: m ? "text" : void 0,
            "--radix-hover-card-content-transform-origin": "var(--radix-popper-transform-origin)",
            "--radix-hover-card-content-available-width": "var(--radix-popper-available-width)",
            "--radix-hover-card-content-available-height": "var(--radix-popper-available-height)",
            "--radix-hover-card-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-hover-card-trigger-height": "var(--radix-popper-anchor-height)"
          }
        }
      )
    }
  );
}, "HoverCardContentImpl"));
function g(o) {
  return (e) => e.pointerType === "touch" ? void 0 : o();
}
f(g, "excludeTouch");
function y(o) {
  const e = [], n = document.createTreeWalker(o, NodeFilter.SHOW_ELEMENT, {
    acceptNode: /* @__PURE__ */ f((a) => a.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP, "acceptNode")
  });
  for (; n.nextNode(); ) e.push(n.currentNode);
  return e;
}
f(y, "getTabbableNodes");
function ue({
  ...o
}) {
  return /* @__PURE__ */ s(G, { "data-slot": "hover-card", ...o });
}
function pe({
  ...o
}) {
  return /* @__PURE__ */ s(V, { "data-slot": "hover-card-trigger", ...o });
}
function fe({
  className: o,
  align: e = "center",
  sideOffset: n = 4,
  ...a
}) {
  return /* @__PURE__ */ s(Q, { "data-slot": "hover-card-portal", children: /* @__PURE__ */ s(
    X,
    {
      "data-slot": "hover-card-content",
      align: e,
      sideOffset: n,
      className: L(
        "ui-background-blur z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        o
      ),
      ...a
    }
  ) });
}
export {
  ue as HoverCard,
  fe as HoverCardContent,
  pe as HoverCardTrigger
};
