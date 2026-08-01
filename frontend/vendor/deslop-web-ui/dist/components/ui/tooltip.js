import { jsx as p, jsxs as j } from "react/jsx-runtime";
import { c as Q } from "../../utils-TrrhThB-.js";
import * as i from "react";
import { c as w } from "../../index-BMzaJ9ZT.js";
import { u as G, a as W } from "../../index-OZUlxC0o.js";
import { c as Z } from "../../index-oVmar2KU.js";
import { D as ee } from "../../index-CXD0mMyT.js";
import { u as te } from "../../index-DAdtpYSB.js";
import { c as F, P as oe, a as re, b as ne, d as ie } from "../../index-CBZsXggQ.js";
import { P as ae } from "../../index-BVuqQyzd.js";
import { P as z } from "../../index-KdL-eaFo.js";
import { P as se } from "../../index-Si5tf8-e.js";
import { u as ce } from "../../index-CECqponX.js";
import { u as le } from "../../index-CCKe-Mpx.js";
import { V as ue } from "../../index-L6XBO05c.js";
var pe = Object.defineProperty, f = (o, e) => pe(o, "name", { value: e, configurable: !0 }), [I, ze] = Z("Tooltip", [
  F
]), D = F(), de = "TooltipProvider", fe = 700, k = "tooltip.open", [me, S] = I(de), ge = /* @__PURE__ */ f((o) => {
  const {
    __scopeTooltip: e,
    delayDuration: t = fe,
    skipDelayDuration: r = 300,
    disableHoverableContent: a = !1,
    children: s
  } = o, n = i.useRef(!0), g = i.useRef(!1), l = i.useRef(0);
  return i.useEffect(() => {
    const u = l.current;
    return () => window.clearTimeout(u);
  }, []), /* @__PURE__ */ p(
    me,
    {
      scope: e,
      isOpenDelayedRef: n,
      delayDuration: t,
      onOpen: i.useCallback(() => {
        r <= 0 || (window.clearTimeout(l.current), n.current = !1);
      }, [r]),
      onClose: i.useCallback(() => {
        r <= 0 || (window.clearTimeout(l.current), l.current = window.setTimeout(
          () => n.current = !0,
          r
        ));
      }, [r]),
      isPointerInTransitRef: g,
      onPointerInTransitChange: i.useCallback((u) => {
        g.current = u;
      }, []),
      disableHoverableContent: a,
      children: s
    }
  );
}, "TooltipProvider"), A = "Tooltip", [ve, _] = I(A), Te = /* @__PURE__ */ f((o) => {
  const {
    __scopeTooltip: e,
    children: t,
    open: r,
    defaultOpen: a,
    onOpenChange: s,
    disableHoverableContent: n,
    delayDuration: g
  } = o, l = S(A, o.__scopeTooltip), u = D(e), [m, v] = i.useState(null), [d, T] = i.useState(void 0), h = te(), c = i.useRef(0), b = n ?? l.disableHoverableContent, C = g ?? l.delayDuration, y = i.useRef(!1), [P, x] = ce({
    prop: r,
    defaultProp: a ?? !1,
    onChange: /* @__PURE__ */ f((H) => {
      H ? (l.onOpen(), document.dispatchEvent(new CustomEvent(k))) : l.onClose(), s?.(H);
    }, "onChange"),
    caller: A
  }), L = i.useMemo(() => P ? y.current ? "delayed-open" : "instant-open" : "closed", [P]), E = i.useCallback(() => {
    window.clearTimeout(c.current), c.current = 0, y.current = !1, x(!0);
  }, [x]), O = i.useCallback(() => {
    window.clearTimeout(c.current), c.current = 0, x(!1);
  }, [x]), M = i.useCallback(() => {
    window.clearTimeout(c.current), c.current = window.setTimeout(() => {
      y.current = !0, x(!0), c.current = 0;
    }, C);
  }, [C, x]);
  return i.useEffect(() => () => {
    c.current && (window.clearTimeout(c.current), c.current = 0);
  }, []), /* @__PURE__ */ p(oe, { ...u, children: /* @__PURE__ */ p(
    ve,
    {
      scope: e,
      contentId: d ?? h,
      setContentId: T,
      open: P,
      stateAttribute: L,
      trigger: m,
      onTriggerChange: v,
      onTriggerEnter: i.useCallback(() => {
        l.isOpenDelayedRef.current ? M() : E();
      }, [l.isOpenDelayedRef, M, E]),
      onTriggerLeave: i.useCallback(() => {
        b ? O() : (window.clearTimeout(c.current), c.current = 0);
      }, [O, b]),
      onOpen: E,
      onClose: O,
      disableHoverableContent: b,
      children: t
    }
  ) });
}, "Tooltip"), N = "TooltipTrigger", he = /* @__PURE__ */ i.forwardRef(
  /* @__PURE__ */ f(function(e, t) {
    const { __scopeTooltip: r, "aria-describedby": a, ...s } = e, n = _(N, r), g = S(N, r), l = D(r), u = i.useRef(null), m = G(t, u, n.onTriggerChange), v = i.useRef(!1), d = i.useRef(!1), T = i.useCallback(() => v.current = !1, []);
    return i.useEffect(() => () => document.removeEventListener("pointerup", T), [T]), /* @__PURE__ */ p(re, { asChild: !0, ...l, children: /* @__PURE__ */ p(
      se.button,
      {
        "aria-describedby": n.open ? J(a, n.contentId) : a,
        "data-state": n.stateAttribute,
        ...s,
        ref: m,
        onPointerMove: w(e.onPointerMove, (h) => {
          h.pointerType !== "touch" && !d.current && !g.isPointerInTransitRef.current && (n.onTriggerEnter(), d.current = !0);
        }),
        onPointerLeave: w(e.onPointerLeave, () => {
          n.onTriggerLeave(), d.current = !1;
        }),
        onPointerDown: w(e.onPointerDown, () => {
          n.open && n.onClose(), v.current = !0, document.addEventListener("pointerup", T, { once: !0 });
        }),
        onFocus: w(e.onFocus, () => {
          v.current || n.onOpen();
        }),
        onBlur: w(e.onBlur, n.onClose),
        onClick: w(e.onClick, n.onClose)
      }
    ) });
  }, "TooltipTrigger")
), B = "TooltipPortal", [be, Ce] = I(B, {
  forceMount: void 0
}), xe = /* @__PURE__ */ f((o) => {
  const { __scopeTooltip: e, forceMount: t, children: r, container: a } = o, s = _(B, e);
  return /* @__PURE__ */ p(be, { scope: e, forceMount: t, children: /* @__PURE__ */ p(z, { present: t || s.open, children: /* @__PURE__ */ p(ae, { asChild: !0, container: a, children: r }) }) });
}, "TooltipPortal"), R = "TooltipContent", ye = /* @__PURE__ */ i.forwardRef(
  /* @__PURE__ */ f(function(e, t) {
    const r = Ce(R, e.__scopeTooltip), { forceMount: a = r.forceMount, side: s = "top", ...n } = e, g = _(R, e.__scopeTooltip);
    return /* @__PURE__ */ p(z, { present: a || g.open, children: g.disableHoverableContent ? /* @__PURE__ */ p($, { side: s, ...n, ref: t }) : /* @__PURE__ */ p(Pe, { side: s, ...n, ref: t }) });
  }, "TooltipContent")
), Pe = /* @__PURE__ */ i.forwardRef(/* @__PURE__ */ f(function(e, t) {
  const r = _(R, e.__scopeTooltip), a = S(R, e.__scopeTooltip), s = i.useRef(null), n = G(t, s), [g, l] = i.useState(null), { trigger: u, onClose: m } = r, v = s.current, { onPointerInTransitChange: d } = a, T = i.useCallback(() => {
    l(null), d(!1);
  }, [d]), h = i.useCallback(
    (c, b) => {
      const C = c.currentTarget, y = { x: c.clientX, y: c.clientY }, P = U(y, C.getBoundingClientRect()), x = V(y, P), L = Y(b.getBoundingClientRect()), E = X([...x, ...L]);
      l(E), d(!0);
    },
    [d]
  );
  return i.useEffect(() => () => T(), [T]), i.useEffect(() => {
    if (u && v) {
      const c = /* @__PURE__ */ f((C) => h(C, v), "handleTriggerLeave"), b = /* @__PURE__ */ f((C) => h(C, u), "handleContentLeave");
      return u.addEventListener("pointerleave", c), v.addEventListener("pointerleave", b), () => {
        u.removeEventListener("pointerleave", c), v.removeEventListener("pointerleave", b);
      };
    }
  }, [u, v, h, T]), i.useEffect(() => {
    if (g) {
      const c = /* @__PURE__ */ f((b) => {
        const C = b.target, y = { x: b.clientX, y: b.clientY }, P = u?.contains(C) || v?.contains(C), x = !q(y, g);
        P ? T() : x && (T(), m());
      }, "handleTrackPointerGrace");
      return document.addEventListener("pointermove", c), () => document.removeEventListener("pointermove", c);
    }
  }, [u, v, g, m, T]), /* @__PURE__ */ p($, { ...e, ref: n });
}, "TooltipContentHoverable")), we = W("TooltipContent"), $ = /* @__PURE__ */ i.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, t) {
    const {
      __scopeTooltip: r,
      children: a,
      "aria-label": s,
      id: n,
      onEscapeKeyDown: g,
      onPointerDownOutside: l,
      ...u
    } = e, m = _(R, r), v = D(r), { onClose: d } = m;
    i.useEffect(() => (document.addEventListener(k, d), () => document.removeEventListener(k, d)), [d]), i.useEffect(() => {
      if (m.trigger) {
        const h = /* @__PURE__ */ f((c) => {
          c.target instanceof Node && c.target.contains(m.trigger) && d();
        }, "handleScroll");
        return window.addEventListener("scroll", h, { capture: !0 }), () => window.removeEventListener("scroll", h, { capture: !0 });
      }
    }, [m.trigger, d]);
    const { setContentId: T } = m;
    return le(() => (T(n), () => {
      T(void 0);
    }), [n, T]), /* @__PURE__ */ p(
      ee,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: g,
        onPointerDownOutside: l,
        onFocusOutside: (h) => h.preventDefault(),
        onDismiss: d,
        children: /* @__PURE__ */ j(
          ne,
          {
            "data-state": m.stateAttribute,
            role: s ? void 0 : "tooltip",
            id: s ? void 0 : m.contentId,
            ...v,
            ...u,
            ref: t,
            style: {
              ...u.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ p(we, { children: a }),
              s ? /* @__PURE__ */ p(ue, { id: m.contentId, role: "tooltip", children: s }) : null
            ]
          }
        )
      }
    );
  }, "TooltipContentImpl")
), Ee = /* @__PURE__ */ i.forwardRef(
  /* @__PURE__ */ f(function(e, t) {
    const { __scopeTooltip: r, ...a } = e, s = D(r);
    return /* @__PURE__ */ p(ie, { ...s, ...a, ref: t });
  }, "TooltipArrow")
);
function U(o, e) {
  const t = Math.abs(e.top - o.y), r = Math.abs(e.bottom - o.y), a = Math.abs(e.right - o.x), s = Math.abs(e.left - o.x);
  switch (Math.min(t, r, a, s)) {
    case s:
      return "left";
    case a:
      return "right";
    case t:
      return "top";
    case r:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
f(U, "getExitSideFromRect");
function V(o, e, t = 5) {
  const r = [];
  switch (e) {
    case "top":
      r.push(
        { x: o.x - t, y: o.y + t },
        { x: o.x + t, y: o.y + t }
      );
      break;
    case "bottom":
      r.push(
        { x: o.x - t, y: o.y - t },
        { x: o.x + t, y: o.y - t }
      );
      break;
    case "left":
      r.push(
        { x: o.x + t, y: o.y - t },
        { x: o.x + t, y: o.y + t }
      );
      break;
    case "right":
      r.push(
        { x: o.x - t, y: o.y - t },
        { x: o.x - t, y: o.y + t }
      );
      break;
  }
  return r;
}
f(V, "getPaddedExitPoints");
function Y(o) {
  const { top: e, right: t, bottom: r, left: a } = o;
  return [
    { x: a, y: e },
    { x: t, y: e },
    { x: t, y: r },
    { x: a, y: r }
  ];
}
f(Y, "getPointsFromRect");
function q(o, e) {
  const { x: t, y: r } = o;
  let a = !1;
  for (let s = 0, n = e.length - 1; s < e.length; n = s++) {
    const g = e[s], l = e[n], u = g.x, m = g.y, v = l.x, d = l.y;
    m > r != d > r && t < (v - u) * (r - m) / (d - m) + u && (a = !a);
  }
  return a;
}
f(q, "isPointInPolygon");
function X(o) {
  const e = o.slice();
  return e.sort((t, r) => t.x < r.x ? -1 : t.x > r.x ? 1 : t.y < r.y ? -1 : t.y > r.y ? 1 : 0), K(e);
}
f(X, "getHull");
function K(o) {
  if (o.length <= 1) return o.slice();
  const e = [];
  for (let r = 0; r < o.length; r++) {
    const a = o[r];
    for (; e.length >= 2; ) {
      const s = e[e.length - 1], n = e[e.length - 2];
      if ((s.x - n.x) * (a.y - n.y) >= (s.y - n.y) * (a.x - n.x)) e.pop();
      else break;
    }
    e.push(a);
  }
  e.pop();
  const t = [];
  for (let r = o.length - 1; r >= 0; r--) {
    const a = o[r];
    for (; t.length >= 2; ) {
      const s = t[t.length - 1], n = t[t.length - 2];
      if ((s.x - n.x) * (a.y - n.y) >= (s.y - n.y) * (a.x - n.x)) t.pop();
      else break;
    }
    t.push(a);
  }
  return t.pop(), e.length === 1 && t.length === 1 && e[0].x === t[0].x && e[0].y === t[0].y ? e : e.concat(t);
}
f(K, "getHullPresorted");
function J(...o) {
  const e = /* @__PURE__ */ new Set();
  for (const t of o)
    if (typeof t == "string")
      for (const r of String(t).trim().split(/\s+/))
        r && e.add(r);
  return e.size > 0 ? Array.from(e).join(" ") : void 0;
}
f(J, "concatAriaDescribedby");
function Be({
  delayDuration: o = 0,
  ...e
}) {
  return /* @__PURE__ */ p(
    ge,
    {
      "data-slot": "tooltip-provider",
      delayDuration: o,
      ...e
    }
  );
}
function $e({
  ...o
}) {
  return /* @__PURE__ */ p(Te, { "data-slot": "tooltip", ...o });
}
function Ue({
  ...o
}) {
  return /* @__PURE__ */ p(he, { "data-slot": "tooltip-trigger", ...o });
}
function Ve({
  className: o,
  sideOffset: e = 0,
  children: t,
  ...r
}) {
  return /* @__PURE__ */ p(xe, { children: /* @__PURE__ */ j(
    ye,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      className: Q(
        "ui-background-blur z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in rounded-md bg-foreground px-4 py-2.5 text-xs text-balance text-background fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        o
      ),
      ...r,
      children: [
        t,
        /* @__PURE__ */ p(Ee, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" })
      ]
    }
  ) });
}
export {
  $e as Tooltip,
  Ve as TooltipContent,
  Be as TooltipProvider,
  Ue as TooltipTrigger
};
