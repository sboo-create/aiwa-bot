import { jsx as b, jsxs as G, Fragment as ne } from "react/jsx-runtime";
import { c as J } from "../../utils-TrrhThB-.js";
import * as c from "react";
import { P as W } from "../../index-Si5tf8-e.js";
import { P as Y } from "../../index-KdL-eaFo.js";
import { c as ce } from "../../index-oVmar2KU.js";
import { u as x } from "../../index-OZUlxC0o.js";
import { u as R } from "../../index-CRNjeP0c.js";
import { u as ae } from "../../index-B0BN408G.js";
import { u as ie } from "../../index-CCKe-Mpx.js";
import { c as se } from "../../index-BdrERefj.js";
import { c as E } from "../../index-BMzaJ9ZT.js";
var ue = Object.defineProperty, f = (l, e) => ue(l, "name", { value: e, configurable: !0 });
function K(l, e) {
  return c.useReducer((o, t) => e[o][t] ?? o, l);
}
f(K, "useStateMachine");
var Q = "ScrollArea", [Z, Ye] = ce(Q), [de, w] = Z(Q), fe = /* @__PURE__ */ c.forwardRef(
  /* @__PURE__ */ f(function(e, o) {
    const {
      __scopeScrollArea: t,
      type: u = "hover",
      dir: r,
      scrollHideDelay: n = 600,
      ...a
    } = e, [i, s] = c.useState(null), [S, h] = c.useState(null), [m, d] = c.useState(null), [p, A] = c.useState(null), [y, M] = c.useState(null), [C, I] = c.useState(0), [U, O] = c.useState(0), [N, _] = c.useState(!1), [V, L] = c.useState(!1), v = x(o, s), g = ae(r);
    return /* @__PURE__ */ b(
      de,
      {
        scope: t,
        type: u,
        dir: g,
        scrollHideDelay: n,
        scrollArea: i,
        viewport: S,
        onViewportChange: h,
        content: m,
        onContentChange: d,
        scrollbarX: p,
        onScrollbarXChange: A,
        scrollbarXEnabled: N,
        onScrollbarXEnabledChange: _,
        scrollbarY: y,
        onScrollbarYChange: M,
        scrollbarYEnabled: V,
        onScrollbarYEnabledChange: L,
        onCornerWidthChange: I,
        onCornerHeightChange: O,
        children: /* @__PURE__ */ b(
          W.div,
          {
            dir: g,
            ...a,
            ref: v,
            style: {
              position: "relative",
              // Pass corner sizes as CSS vars to reduce re-renders of context consumers
              "--radix-scroll-area-corner-width": C + "px",
              "--radix-scroll-area-corner-height": U + "px",
              ...e.style
            }
          }
        )
      }
    );
  }, "ScrollArea")
), he = "ScrollAreaViewport", Se = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, o) {
    const { __scopeScrollArea: t, children: u, nonce: r, ...n } = e, a = w(he, t), i = c.useRef(null), s = x(o, i, a.onViewportChange);
    return /* @__PURE__ */ G(ne, { children: [
      /* @__PURE__ */ b(be, { nonce: r }),
      /* @__PURE__ */ b(
        W.div,
        {
          "data-radix-scroll-area-viewport": "",
          ...n,
          ref: s,
          style: {
            /**
             * We don't support `visible` because the intention is to have at least one scrollbar
             * if this component is used and `visible` will behave like `auto` in that case
             * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
             *
             * We don't handle `auto` because the intention is for the native implementation
             * to be hidden if using this component. We just want to ensure the node is scrollable
             * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
             * the browser from having to work out whether to render native scrollbars or not,
             * we tell it to with the intention of hiding them in CSS.
             */
            overflowX: a.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: a.scrollbarYEnabled ? "scroll" : "hidden",
            ...e.style
          },
          children: /* @__PURE__ */ b("div", { ref: a.onContentChange, style: { minWidth: "100%", display: "table" }, children: u })
        }
      )
    ] });
  }, "ScrollAreaViewport")
), be = /* @__PURE__ */ c.memo(
  /* @__PURE__ */ f(function({ nonce: e }) {
    return /* @__PURE__ */ b(
      "style",
      {
        dangerouslySetInnerHTML: {
          __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"
        },
        nonce: e
      }
    );
  }, "ScrollAreaViewportStyle"),
  (l, e) => l.nonce === e.nonce
), P = "ScrollAreaScrollbar", me = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, o) {
    const { forceMount: t, ...u } = e, r = w(P, e.__scopeScrollArea), { onScrollbarXEnabledChange: n, onScrollbarYEnabledChange: a } = r, i = e.orientation === "horizontal";
    return c.useEffect(() => (i ? n(!0) : a(!0), () => {
      i ? n(!1) : a(!1);
    }), [i, n, a]), r.type === "hover" ? /* @__PURE__ */ b(pe, { ...u, ref: o, forceMount: t }) : r.type === "scroll" ? /* @__PURE__ */ b(ve, { ...u, ref: o, forceMount: t }) : r.type === "auto" ? /* @__PURE__ */ b(ee, { ...u, ref: o, forceMount: t }) : r.type === "always" ? /* @__PURE__ */ b(F, { ...u, ref: o, "data-state": "visible" }) : null;
  }, "ScrollAreaScrollbar")
), pe = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ f(function(e, o) {
  const { forceMount: t, ...u } = e, r = w(P, e.__scopeScrollArea), [n, a] = c.useState(!1);
  return c.useEffect(() => {
    const i = r.scrollArea;
    let s = 0;
    if (i) {
      const S = /* @__PURE__ */ f(() => {
        window.clearTimeout(s), a(!0);
      }, "handlePointerEnter"), h = /* @__PURE__ */ f(() => {
        s = window.setTimeout(() => a(!1), r.scrollHideDelay);
      }, "handlePointerLeave");
      return i.addEventListener("pointerenter", S), i.addEventListener("pointerleave", h), () => {
        window.clearTimeout(s), i.removeEventListener("pointerenter", S), i.removeEventListener("pointerleave", h);
      };
    }
  }, [r.scrollArea, r.scrollHideDelay]), /* @__PURE__ */ b(Y, { present: t || n, children: /* @__PURE__ */ b(
    ee,
    {
      "data-state": n ? "visible" : "hidden",
      ...u,
      ref: o
    }
  ) });
}, "ScrollAreaScrollbarHover")), ve = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ f(function(e, o) {
  const { forceMount: t, ...u } = e, r = w(P, e.__scopeScrollArea), n = e.orientation === "horizontal", a = z(() => s("SCROLL_END"), 100), [i, s] = K("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle"
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  return c.useEffect(() => {
    if (i === "idle") {
      const S = window.setTimeout(() => s("HIDE"), r.scrollHideDelay);
      return () => window.clearTimeout(S);
    }
  }, [i, r.scrollHideDelay, s]), c.useEffect(() => {
    const S = r.viewport, h = n ? "scrollLeft" : "scrollTop";
    if (S) {
      let m = S[h];
      const d = /* @__PURE__ */ f(() => {
        const p = S[h];
        m !== p && (s("SCROLL"), a()), m = p;
      }, "handleScroll");
      return S.addEventListener("scroll", d), () => S.removeEventListener("scroll", d);
    }
  }, [r.viewport, n, s, a]), /* @__PURE__ */ b(Y, { present: t || i !== "hidden", children: /* @__PURE__ */ b(
    F,
    {
      "data-state": i === "hidden" ? "hidden" : "visible",
      ...u,
      ref: o,
      onPointerEnter: E(e.onPointerEnter, () => s("POINTER_ENTER")),
      onPointerLeave: E(e.onPointerLeave, () => s("POINTER_LEAVE"))
    }
  ) });
}, "ScrollAreaScrollbarScroll")), ee = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ f(function(e, o) {
  const t = w(P, e.__scopeScrollArea), { forceMount: u, ...r } = e, [n, a] = c.useState(!1), i = e.orientation === "horizontal", s = z(() => {
    if (t.viewport) {
      const S = t.viewport.offsetWidth < t.viewport.scrollWidth, h = t.viewport.offsetHeight < t.viewport.scrollHeight;
      a(i ? S : h);
    }
  }, 10);
  return T(t.viewport, s), T(t.content, s), /* @__PURE__ */ b(Y, { present: u || n, children: /* @__PURE__ */ b(
    F,
    {
      "data-state": n ? "visible" : "hidden",
      ...r,
      ref: o
    }
  ) });
}, "ScrollAreaScrollbarAuto")), F = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ f(function(e, o) {
  const { orientation: t = "vertical", ...u } = e, r = w(P, e.__scopeScrollArea), n = c.useRef(null), a = c.useRef(0), [i, s] = c.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  }), S = j(i.viewport, i.content), h = {
    ...u,
    sizes: i,
    onSizesChange: s,
    hasThumb: S > 0 && S < 1,
    onThumbChange: /* @__PURE__ */ f((d) => n.current = d, "onThumbChange"),
    onThumbPointerUp: /* @__PURE__ */ f(() => a.current = 0, "onThumbPointerUp"),
    onThumbPointerDown: /* @__PURE__ */ f((d) => a.current = d, "onThumbPointerDown")
  };
  function m(d, p) {
    return le(d, a.current, i, p);
  }
  return f(m, "getScrollPosition"), t === "horizontal" ? /* @__PURE__ */ b(
    we,
    {
      ...h,
      ref: o,
      onThumbPositionChange: () => {
        if (r.viewport && n.current) {
          const d = r.viewport.scrollLeft, p = B(d, i, r.dir);
          n.current.style.transform = `translate3d(${p}px, 0, 0)`;
        }
      },
      onWheelScroll: (d) => {
        r.viewport && (r.viewport.scrollLeft = d);
      },
      onDragScroll: (d) => {
        r.viewport && (r.viewport.scrollLeft = m(d, r.dir));
      }
    }
  ) : t === "vertical" ? /* @__PURE__ */ b(
    ge,
    {
      ...h,
      ref: o,
      onThumbPositionChange: () => {
        if (r.viewport && n.current) {
          const d = r.viewport.scrollTop, p = B(d, i);
          n.current.style.transform = `translate3d(0, ${p}px, 0)`;
        }
      },
      onWheelScroll: (d) => {
        r.viewport && (r.viewport.scrollTop = d);
      },
      onDragScroll: (d) => {
        r.viewport && (r.viewport.scrollTop = m(d));
      }
    }
  ) : null;
}, "ScrollAreaScrollbarVisible")), we = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ f(function(e, o) {
  const { sizes: t, onSizesChange: u, ...r } = e, n = w(P, e.__scopeScrollArea), [a, i] = c.useState(), s = c.useRef(null), S = x(o, s, n.onScrollbarXChange);
  return c.useEffect(() => {
    s.current && i(getComputedStyle(s.current));
  }, [s]), /* @__PURE__ */ b(
    oe,
    {
      "data-orientation": "horizontal",
      ...r,
      ref: S,
      sizes: t,
      style: {
        bottom: 0,
        left: n.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: n.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        "--radix-scroll-area-thumb-width": H(t) + "px",
        ...e.style
      },
      onThumbPointerDown: (h) => e.onThumbPointerDown(h.x),
      onDragScroll: (h) => e.onDragScroll(h.x),
      onWheelScroll: (h, m) => {
        if (n.viewport) {
          const d = n.viewport.scrollLeft + h.deltaX;
          e.onWheelScroll(d), q(d, m) && h.preventDefault();
        }
      },
      onResize: () => {
        s.current && n.viewport && a && u({
          content: n.viewport.scrollWidth,
          viewport: n.viewport.offsetWidth,
          scrollbar: {
            size: s.current.clientWidth,
            paddingStart: D(a.paddingLeft),
            paddingEnd: D(a.paddingRight)
          }
        });
      }
    }
  );
}, "ScrollAreaScrollbarX")), ge = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ f(function(e, o) {
  const { sizes: t, onSizesChange: u, ...r } = e, n = w(P, e.__scopeScrollArea), [a, i] = c.useState(), s = c.useRef(null), S = x(o, s, n.onScrollbarYChange);
  return c.useEffect(() => {
    s.current && i(getComputedStyle(s.current));
  }, [s]), /* @__PURE__ */ b(
    oe,
    {
      "data-orientation": "vertical",
      ...r,
      ref: S,
      sizes: t,
      style: {
        top: 0,
        right: n.dir === "ltr" ? 0 : void 0,
        left: n.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        "--radix-scroll-area-thumb-height": H(t) + "px",
        ...e.style
      },
      onThumbPointerDown: (h) => e.onThumbPointerDown(h.y),
      onDragScroll: (h) => e.onDragScroll(h.y),
      onWheelScroll: (h, m) => {
        if (n.viewport) {
          const d = n.viewport.scrollTop + h.deltaY;
          e.onWheelScroll(d), q(d, m) && h.preventDefault();
        }
      },
      onResize: () => {
        s.current && n.viewport && a && u({
          content: n.viewport.scrollHeight,
          viewport: n.viewport.offsetHeight,
          scrollbar: {
            size: s.current.clientHeight,
            paddingStart: D(a.paddingTop),
            paddingEnd: D(a.paddingBottom)
          }
        });
      }
    }
  );
}, "ScrollAreaScrollbarY")), [Ae, re] = Z(P), oe = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ f(function(e, o) {
  const {
    __scopeScrollArea: t,
    sizes: u,
    hasThumb: r,
    onThumbChange: n,
    onThumbPointerUp: a,
    onThumbPointerDown: i,
    onThumbPositionChange: s,
    onDragScroll: S,
    onWheelScroll: h,
    onResize: m,
    ...d
  } = e, p = w(P, t), [A, y] = c.useState(null), M = x(o, y), C = c.useRef(null), I = c.useRef(""), U = p.viewport, O = u.content - u.viewport, N = R(h), _ = R(s), V = z(m, 10);
  function L(v) {
    if (C.current) {
      const g = v.clientX - C.current.left, X = v.clientY - C.current.top;
      S({ x: g, y: X });
    }
  }
  return f(L, "handleDragScroll"), c.useEffect(() => {
    const v = /* @__PURE__ */ f((g) => {
      const X = g.target;
      A?.contains(X) && N(g, O);
    }, "handleWheel");
    return document.addEventListener("wheel", v, { passive: !1 }), () => document.removeEventListener("wheel", v, { passive: !1 });
  }, [U, A, O, N]), c.useEffect(_, [u, _]), T(A, V), T(p.content, V), /* @__PURE__ */ b(
    Ae,
    {
      scope: t,
      scrollbar: A,
      hasThumb: r,
      onThumbChange: R(n),
      onThumbPointerUp: R(a),
      onThumbPositionChange: _,
      onThumbPointerDown: R(i),
      children: /* @__PURE__ */ b(
        W.div,
        {
          ...d,
          ref: M,
          style: { position: "absolute", ...d.style },
          onPointerDown: E(e.onPointerDown, (v) => {
            v.button === 0 && (v.target.setPointerCapture(v.pointerId), C.current = A.getBoundingClientRect(), I.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", p.viewport && (p.viewport.style.scrollBehavior = "auto"), L(v));
          }),
          onPointerMove: E(e.onPointerMove, L),
          onPointerUp: E(e.onPointerUp, (v) => {
            const g = v.target;
            g.hasPointerCapture(v.pointerId) && g.releasePointerCapture(v.pointerId), document.body.style.webkitUserSelect = I.current, p.viewport && (p.viewport.style.scrollBehavior = ""), C.current = null;
          })
        }
      )
    }
  );
}, "ScrollAreaScrollbarImpl")), k = "ScrollAreaThumb", Pe = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, o) {
    const { forceMount: t, ...u } = e, r = re(k, e.__scopeScrollArea);
    return /* @__PURE__ */ b(Y, { present: t || r.hasThumb, children: /* @__PURE__ */ b(Ce, { ref: o, ...u }) });
  }, "ScrollAreaThumb")
), Ce = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, o) {
    const { __scopeScrollArea: t, style: u, ...r } = e, n = w(k, t), a = re(k, t), { onThumbPositionChange: i } = a, s = x(o, a.onThumbChange), S = c.useRef(void 0), h = z(() => {
      S.current && (S.current(), S.current = void 0);
    }, 100);
    return c.useEffect(() => {
      const m = n.viewport;
      if (m) {
        const d = /* @__PURE__ */ f(() => {
          if (h(), !S.current) {
            const p = Te(m, i);
            S.current = p, i();
          }
        }, "handleScroll");
        return i(), m.addEventListener("scroll", d), () => m.removeEventListener("scroll", d);
      }
    }, [n.viewport, h, i]), /* @__PURE__ */ b(
      W.div,
      {
        "data-state": a.hasThumb ? "visible" : "hidden",
        ...r,
        ref: s,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...u
        },
        onPointerDownCapture: E(e.onPointerDownCapture, (m) => {
          const p = m.target.getBoundingClientRect(), A = m.clientX - p.left, y = m.clientY - p.top;
          a.onThumbPointerDown({ x: A, y });
        }),
        onPointerUp: E(e.onPointerUp, a.onThumbPointerUp)
      }
    );
  }, "ScrollAreaThumbImpl")
), te = "ScrollAreaCorner", Re = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, o) {
    const t = w(te, e.__scopeScrollArea), u = !!(t.scrollbarX && t.scrollbarY);
    return t.type !== "scroll" && u ? /* @__PURE__ */ b(Ee, { ...e, ref: o }) : null;
  }, "ScrollAreaCorner")
), Ee = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ f(function(e, o) {
  const { __scopeScrollArea: t, ...u } = e, r = w(te, t), [n, a] = c.useState(0), [i, s] = c.useState(0), S = !!(n && i), { onCornerWidthChange: h, onCornerHeightChange: m } = r;
  return T(r.scrollbarX, () => {
    const d = r.scrollbarX?.offsetHeight || 0;
    r.onCornerHeightChange(d), s(d);
  }), T(r.scrollbarY, () => {
    const d = r.scrollbarY?.offsetWidth || 0;
    r.onCornerWidthChange(d), a(d);
  }), c.useEffect(() => () => {
    h(0), m(0);
  }, [h, m]), S ? /* @__PURE__ */ b(
    W.div,
    {
      ...u,
      ref: o,
      style: {
        width: n,
        height: i,
        position: "absolute",
        right: r.dir === "ltr" ? 0 : void 0,
        left: r.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...e.style
      }
    }
  ) : null;
}, "ScrollAreaCornerImpl"));
function D(l) {
  return l ? parseInt(l, 10) : 0;
}
f(D, "toInt");
function j(l, e) {
  const o = l / e;
  return isNaN(o) ? 0 : o;
}
f(j, "getThumbRatio");
function H(l) {
  const e = j(l.viewport, l.content), o = l.scrollbar.paddingStart + l.scrollbar.paddingEnd, t = (l.scrollbar.size - o) * e;
  return Math.max(t, 18);
}
f(H, "getThumbSize");
function le(l, e, o, t = "ltr") {
  const u = H(o), r = u / 2, n = e || r, a = u - n, i = o.scrollbar.paddingStart + n, s = o.scrollbar.size - o.scrollbar.paddingEnd - a, S = o.content - o.viewport, h = t === "ltr" ? [0, S] : [S * -1, 0];
  return $([i, s], h)(l);
}
f(le, "getScrollPositionFromPointer");
function B(l, e, o = "ltr") {
  const t = H(e), u = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, r = e.scrollbar.size - u, n = e.content - e.viewport, a = r - t, i = o === "ltr" ? [0, n] : [n * -1, 0], s = se(l, i);
  return $([0, n], [0, a])(s);
}
f(B, "getThumbOffsetFromScroll");
function $(l, e) {
  return (o) => {
    if (l[0] === l[1] || e[0] === e[1]) return e[0];
    const t = (e[1] - e[0]) / (l[1] - l[0]);
    return e[0] + t * (o - l[0]);
  };
}
f($, "linearScale");
function q(l, e) {
  return l > 0 && l < e;
}
f(q, "isScrollingWithinScrollbarBounds");
var Te = /* @__PURE__ */ f((l, e = () => {
}) => {
  let o = { left: l.scrollLeft, top: l.scrollTop }, t = 0;
  return (/* @__PURE__ */ f((function u() {
    const r = { left: l.scrollLeft, top: l.scrollTop }, n = o.left !== r.left, a = o.top !== r.top;
    (n || a) && e(), o = r, t = window.requestAnimationFrame(u);
  }), "loop"))(), () => window.cancelAnimationFrame(t);
}, "addUnlinkedScrollListener");
function z(l, e) {
  const o = R(l), t = c.useRef(0);
  return c.useEffect(() => () => window.clearTimeout(t.current), []), c.useCallback(() => {
    window.clearTimeout(t.current), t.current = window.setTimeout(o, e);
  }, [o, e]);
}
f(z, "useDebounceCallback");
function T(l, e) {
  const o = R(e);
  ie(() => {
    let t = 0;
    if (l) {
      const u = new ResizeObserver(() => {
        cancelAnimationFrame(t), t = window.requestAnimationFrame(o);
      });
      return u.observe(l), () => {
        window.cancelAnimationFrame(t), u.unobserve(l);
      };
    }
  }, [l, o]);
}
f(T, "useResizeObserver");
function Me({
  className: l,
  children: e,
  ...o
}) {
  return /* @__PURE__ */ G(
    fe,
    {
      "data-slot": "scroll-area",
      className: J("relative", l),
      ...o,
      children: [
        /* @__PURE__ */ b(
          Se,
          {
            "data-slot": "scroll-area-viewport",
            className: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:outline-1",
            children: e
          }
        ),
        /* @__PURE__ */ b(xe, {}),
        /* @__PURE__ */ b(Re, {})
      ]
    }
  );
}
function xe({
  className: l,
  orientation: e = "vertical",
  ...o
}) {
  return /* @__PURE__ */ b(
    me,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation: e,
      className: J(
        "flex touch-none p-px transition-colors select-none",
        e === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        e === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        l
      ),
      ...o,
      children: /* @__PURE__ */ b(
        Pe,
        {
          "data-slot": "scroll-area-thumb",
          className: "relative flex-1 rounded-full bg-border"
        }
      )
    }
  );
}
export {
  Me as ScrollArea,
  xe as ScrollBar
};
