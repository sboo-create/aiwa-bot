import { jsx as I, jsxs as fe, Fragment as Ne } from "react/jsx-runtime";
import * as n from "react";
import { j as Ve } from "../../icons-DUsO7wRs.js";
import { c as te } from "../../utils-TrrhThB-.js";
import { Button as je } from "./button.js";
function De({ defaultTagName: e, props: t, render: r, state: l = {}, stateAttributesMapping: o }) {
  let s = ce(qe(l, o), t);
  if (!r) return n.createElement(e, s);
  if (typeof r == "function") return r(s, l);
  if (!n.isValidElement(r)) return null;
  let a = r.props, u = { ...ce(s, a), ref: re(s.ref, a.ref) };
  return n.cloneElement(r, u);
}
function ce(...e) {
  let t = {};
  for (let r of e) {
    if (!r) continue;
    let l = r;
    for (let o of Object.keys(l)) {
      let s = l[o];
      if (s === void 0) continue;
      let a = t[o];
      o === "className" ? t[o] = [a, s].filter(Boolean).join(" ") : o === "style" ? t[o] = { ...a, ...s } : o === "ref" ? t[o] = re(a, s) : $e(o) && typeof a == "function" && typeof s == "function" ? t[o] = Ge(s, a) : t[o] = s;
    }
  }
  return t;
}
function qe(e, t) {
  let r = {};
  for (let l of Object.keys(e)) {
    let o = e[l], s = t?.[l]?.(o);
    if (s) {
      Object.assign(r, s);
      continue;
    }
    if (l === "slot") {
      r["data-slot"] = o;
      continue;
    }
    let a = `data-${String(l).replace(/[A-Z]/g, (u) => `-${u.toLowerCase()}`)}`;
    typeof o == "boolean" ? r[a] = o ? "" : void 0 : o != null && (r[a] = String(o));
  }
  return r;
}
function Ge(e, t) {
  return function(r) {
    e(r), r.defaultPrevented || t(r);
  };
}
function $e(e) {
  return /^on[A-Z]/.test(e);
}
function re(...e) {
  let t = e.filter(Boolean);
  if (t.length !== 0) return (r) => {
    for (let l of t) typeof l == "function" ? l(r) : l && (l.current = r);
  };
}
var Ue = 8, _e = 64, We = 0, ue = 0.5, Ke = 180, Ye = /* @__PURE__ */ new Set(["ArrowDown", "ArrowUp", "End", "Home", "PageDown", "PageUp", " "]), Ae = { start: !1, end: !1 }, Ze = [], ae = { currentAnchorId: null, visibleMessageIds: Ze };
function Je({ content: e, scrollEdgeThreshold: t, spacer: r, viewport: l }) {
  if (!l || !e) return Ae;
  let o = de({ content: e, spacer: r, viewport: l });
  return { start: l.scrollTop > t, end: o - l.scrollTop - l.clientHeight > t };
}
function Qe({ content: e, scrollMargin: t, scrollPreviousItemPeek: r, spacer: l, viewport: o, visibleMessageIds: s }) {
  if (!e || !o) return ae;
  let a = o.getBoundingClientRect(), u = a.top + t + r, h = typeof IntersectionObserver > "u", w = [], v = null;
  for (let T of ee(e, l)) {
    let m = T.dataset.messageId;
    if (!m) continue;
    let b = T.dataset.scrollAnchor === "true", C = b || h ? T.getBoundingClientRect() : null;
    (h && C ? C.bottom > u && C.top < a.bottom : s.has(m)) && w.push(m), b && C && C.top <= u + ue && (v = m);
  }
  return w.length === 0 && v === null ? ae : { currentAnchorId: v, visibleMessageIds: w };
}
function ee(e, t) {
  return Array.from(e.children).filter((r) => r instanceof HTMLElement && r !== t);
}
function Xe(e, t) {
  for (let r = t; r < e.length; r++) {
    let l = e[r];
    if (l?.dataset.scrollAnchor === "true") return l;
  }
  return null;
}
function et(e, t) {
  for (let r of e) if (r.dataset.scrollAnchor === "true" && !t.has(r)) return r;
  return null;
}
function tt(e, t) {
  let r = 0;
  for (let l = t; l < e.length; l++) if (e[l]?.dataset.scrollAnchor === "true" && (r += 1, r > 1)) return !0;
  return !1;
}
function rt(e) {
  for (let t = e.length - 1; t >= 0; t--) {
    let r = e[t];
    if (r?.dataset.scrollAnchor === "true") return r;
  }
  return null;
}
function nt({ content: e, spacer: t, viewport: r }) {
  let l = r.getBoundingClientRect();
  for (let o of ee(e, t)) {
    if (!o.dataset.messageId) continue;
    let s = o.getBoundingClientRect();
    if (s.bottom > l.top && s.top < l.bottom) return o;
  }
  return null;
}
function lt({ align: e, element: t, scrollMargin: r, spacer: l, viewport: o }) {
  let s = xe(t, o), a = t.getBoundingClientRect().height, u = ut(l);
  if (e === "center") {
    let h = Math.max(0, o.clientHeight - u.start - u.end);
    return s - u.start - (h - a) / 2 - r;
  }
  if (e === "end") return s - o.clientHeight + a + u.end + r;
  if (e === "nearest") {
    let h = s + a, w = o.scrollTop + u.start, v = o.scrollTop + o.clientHeight - u.end;
    return s >= w && h <= v ? o.scrollTop : s < w ? s - u.start - r : h - o.clientHeight + u.end + r;
  }
  return s - u.start - r;
}
function xe(e, t) {
  let r = e.getBoundingClientRect(), l = t.getBoundingClientRect();
  return r.top - l.top + t.scrollTop;
}
function se(e, t) {
  return e.getBoundingClientRect().top - t.getBoundingClientRect().top;
}
function ot({ content: e, scrollTop: t, spacer: r, viewport: l }) {
  let o = de({ content: e, spacer: r, viewport: l });
  return t + l.clientHeight - o;
}
function de({ content: e, spacer: t, viewport: r }) {
  let l = ee(e, t), o = Oe(e), s = r.getBoundingClientRect(), a = r.scrollTop, u = o.start + o.end;
  for (let h of l) {
    let w = h.getBoundingClientRect();
    u = Math.max(u, w.bottom - s.top + a + o.end);
  }
  return u;
}
function st(e) {
  return Math.max(0, e.scrollHeight - e.clientHeight);
}
function Oe(e) {
  let t = window.getComputedStyle(e);
  return { end: ie(t.paddingBlockEnd || t.paddingBottom), start: ie(t.paddingBlockStart || t.paddingTop) };
}
function ut(e) {
  let t = e?.parentElement;
  return t ? Oe(t) : { end: 0, start: 0 };
}
function at(e) {
  if (!e) return 0;
  let t = window.getComputedStyle(e), r = t.rowGap === "normal" ? t.gap : t.rowGap;
  return ie(r);
}
function ie(e) {
  if (!e) return 0;
  let t = Number.parseFloat(e);
  return Number.isFinite(t) ? t : 0;
}
function ct({ refs: e, commitScrollState: t, scheduleStateCommit: r, scheduleVisibilitySync: l }) {
  let { streamingTurnRef: o, autoScrollRef: s, autoscrollingRef: a, autoscrollingTimeoutRef: u, contentRef: h, defaultScrollPositionAppliedRef: w, itemCountRef: v, messageElementsRef: T, modeRef: m, pendingScrollToMessageRef: b, prependRestoreRef: C, scrollMarginRef: A, scrollPreviousItemPeekRef: d, spacerGapRef: O, spacerHeightRef: G, spacerRef: L, viewportRef: F } = e, j = n.useCallback((f) => {
    u.current !== null && (window.clearTimeout(u.current), u.current = null), a.current !== f && (a.current = f, t()), f && (u.current = window.setTimeout(() => {
      u.current = null, a.current = !1, t();
    }, Ke));
  }, [t]), S = n.useCallback((f) => {
    let g = L.current;
    if (!g) return;
    let R = Math.max(0, Math.ceil(f));
    G.current !== R && (G.current = R, g.hidden = R === 0, g.style.height = `${R}px`, g.style.marginTop = R > 0 ? `${-O.current}px` : "");
  }, []), E = n.useCallback((f, { behavior: g = "auto", autoscrolling: R = !1 } = {}) => {
    let M = F.current;
    if (!M) return;
    let k = Math.max(0, f);
    if (Math.abs(M.scrollTop - k) <= ue) {
      M.scrollTop = k, t();
      return;
    }
    R && j(!0), M.scrollTo({ top: k, behavior: g }), r();
  }, [t, r, j]), D = n.useCallback(({ behavior: f = "auto" } = {}) => F.current ? (S(0), o.current = null, m.current = "free-scrolling", E(0, { behavior: f }), l(), !0) : !1, [l, E, S]), Y = n.useCallback(({ behavior: f = "auto" } = {}) => {
    let g = F.current;
    return g ? (S(0), o.current = null, m.current = s.current ? "following-bottom" : "free-scrolling", E(st(g), { autoscrolling: !0, behavior: f }), l(), !0) : !1;
  }, [l, E, S]), x = n.useCallback((f, { align: g = "start", behavior: R = "auto", scrollMargin: M = A.current } = {}, { keepPreviousPeek: k = !1 } = {}) => {
    let q = h.current, $ = F.current;
    if (!q || !$ || !q.contains(f)) return !1;
    let Z = lt({ align: g, element: f, scrollMargin: k ? M + d.current : M, spacer: L.current, viewport: $ }), _ = ot({ content: q, scrollTop: Z, spacer: L.current, viewport: $ });
    return S(_), C.current = { element: f, viewportTop: se(f, $) }, m.current = k ? "anchored-to-message" : "settling-jump", o.current = k ? f : null, E(Z, { behavior: R }), l(), !0;
  }, [l, E, S]), z = n.useCallback(() => {
    let f = o.current;
    return !f || !f.isConnected || m.current !== "anchored-to-message" ? !1 : x(f, { align: "start" }, { keepPreviousPeek: !0 });
  }, [x]), N = n.useCallback((f, g) => {
    let R = T.current.get(f);
    return R ? (w.current = !0, x(R, g) ? (b.current = null, !0) : (b.current = { messageId: f, options: g }, !0)) : v.current === 0 ? (b.current = { messageId: f, options: g }, w.current = !0, !0) : !1;
  }, [x]);
  return { flushPendingScrollToMessage: n.useCallback(() => {
    let f = b.current;
    if (!f) return !1;
    let g = T.current.get(f.messageId);
    return !g || !x(g, f.options) ? !1 : (b.current = null, w.current = !0, !0);
  }, [x]), reanchorToAnchoredMessage: z, scrollToElement: x, scrollToEnd: Y, scrollToMessage: N, scrollToStart: D };
}
function Be(e, t) {
  let r = e, l = /* @__PURE__ */ new Set();
  return { getSnapshot: () => r, hasListeners: () => l.size > 0, setSnapshot: (o) => {
    t(r, o) || (r = o, l.forEach((s) => s()));
  }, subscribe: (o, s, a) => {
    let u = l.size === 0;
    return l.add(o), u && s?.(), () => {
      l.delete(o), l.size === 0 && a?.();
    };
  } };
}
function it(e, t) {
  return Be(e, t);
}
function ft() {
  return Be(ae, gt);
}
function dt(e, t) {
  return e.start === t.start && e.end === t.end;
}
function gt(e, t) {
  return e.currentAnchorId !== t.currentAnchorId || e.visibleMessageIds.length !== t.visibleMessageIds.length ? !1 : e.visibleMessageIds.every((r, l) => r === t.visibleMessageIds[l]);
}
function pt({ autoScroll: e, scrollEdgeThreshold: t, scrollMargin: r, scrollPreviousItemPeek: l }) {
  let o = n.useRef(e), s = n.useRef(!1), a = n.useRef(null), u = n.useRef(!1), h = n.useRef(t), w = n.useRef(0), v = n.useRef(null), T = n.useRef(0), m = n.useRef(e ? "following-bottom" : "free-scrolling"), b = n.useRef(/* @__PURE__ */ new Map()), C = n.useRef(null), A = n.useRef(null), d = n.useRef(null), O = n.useRef(l), G = n.useRef(!0), L = n.useRef(null), F = n.useRef(r), j = n.useRef(null), S = n.useRef(0), E = n.useRef(0), D = n.useRef(null), Y = n.useRef(null), x = n.useRef(null), z = n.useRef(null), N = n.useRef(null), f = n.useRef(null), g = n.useRef(null), R = n.useRef(null), M = n.useRef(/* @__PURE__ */ new Set()), k = n.useRef(/* @__PURE__ */ new WeakSet());
  return x.current === null && (x.current = it(Ae, dt)), R.current === null && (R.current = ft()), o.current = e, h.current = t, F.current = r, O.current = l, { autoScrollRef: o, autoscrollingRef: s, autoscrollingTimeoutRef: z, streamingTurnRef: d, contentRef: a, defaultScrollPositionAppliedRef: u, firstItemRef: v, itemCountRef: w, lastScrollTopRef: T, messageElementsRef: b, modeRef: m, pendingScrollFrameRef: j, pendingScrollToMessageRef: C, prependRestoreRef: A, preserveScrollOnPrependRef: G, rootRef: L, scrollEdgeThresholdRef: h, scrollMarginRef: F, scrollPreviousItemPeekRef: O, spacerGapRef: S, spacerHeightRef: E, spacerRef: D, stateFrameRef: Y, stateStore: x.current, viewportRef: N, visibilityFrameRef: f, visibilityObserverRef: g, visibilityStore: R.current, visibleMessageIdsRef: M, handledScrollAnchorsRef: k };
}
function Ie(e, t) {
  return n.useCallback((r) => {
    e.current = r, r && t();
  }, [e, t]);
}
function mt({ autoScroll: e = !1, defaultScrollPosition: t = "end", scrollEdgeThreshold: r = Ue, scrollPreviousItemPeek: l = _e, scrollMargin: o = We }) {
  let s = pt({ autoScroll: e, scrollEdgeThreshold: r, scrollMargin: o, scrollPreviousItemPeek: l }), { streamingTurnRef: a, autoScrollRef: u, autoscrollingRef: h, autoscrollingTimeoutRef: w, contentRef: v, defaultScrollPositionAppliedRef: T, firstItemRef: m, itemCountRef: b, lastScrollTopRef: C, messageElementsRef: A, modeRef: d, pendingScrollFrameRef: O, pendingScrollToMessageRef: G, prependRestoreRef: L, preserveScrollOnPrependRef: F, rootRef: j, scrollEdgeThresholdRef: S, scrollMarginRef: E, scrollPreviousItemPeekRef: D, spacerGapRef: Y, spacerHeightRef: x, spacerRef: z, stateFrameRef: N, stateStore: f, viewportRef: g, visibilityFrameRef: R, visibilityObserverRef: M, visibilityStore: k, visibleMessageIdsRef: q, handledScrollAnchorsRef: $ } = s, Z = n.useRef(t);
  Z.current !== t && (Z.current = t, T.current = !1);
  let _ = n.useCallback((c) => {
    let i = j.current, p = g.current, B = [c.start && "start", c.end && "end"].filter(Boolean).join(" "), X = h.current;
    for (let H of [i, p]) H && (B ? H.setAttribute("data-scrollable", B) : H.removeAttribute("data-scrollable"), H.toggleAttribute("data-autoscrolling", X));
  }, []), ge = n.useCallback((c) => {
    let i = g.current?.scrollTop ?? 0, p = i < C.current - ue;
    C.current = i, u.current && !c.end && d.current !== "settling-jump" && d.current !== "anchored-to-message" ? d.current = "following-bottom" : d.current === "following-bottom" && c.end && p && !h.current && (d.current = "free-scrolling");
  }, []), V = n.useCallback(() => {
    let c = Je({ content: v.current, scrollEdgeThreshold: S.current, spacer: z.current, viewport: g.current });
    ge(c);
    let i = d.current === "following-bottom" ? { ...c, end: !1 } : c;
    _(i), f.setSnapshot(i);
  }, [ge, f, _]), J = n.useCallback(() => {
    N.current === null && (N.current = window.requestAnimationFrame(() => {
      N.current = null, V();
    }));
  }, [V]), y = n.useCallback(() => {
    k.hasListeners() && R.current === null && (R.current = window.requestAnimationFrame(() => {
      R.current = null, k.hasListeners() && k.setSnapshot(Qe({ content: v.current, scrollMargin: E.current, scrollPreviousItemPeek: D.current, spacer: z.current, viewport: g.current, visibleMessageIds: q.current }));
    }));
  }, [k]), { flushPendingScrollToMessage: ne, reanchorToAnchoredMessage: pe, scrollToElement: Q, scrollToEnd: P, scrollToMessage: me, scrollToStart: le } = ct({ refs: s, commitScrollState: V, scheduleStateCommit: J, scheduleVisibilitySync: y }), be = n.useCallback(() => {
    let c = L.current, i = g.current;
    if (!c || !i || !c.element.isConnected) return !1;
    let p = se(c.element, i) - c.viewportTop;
    return Math.abs(p) <= ue ? !1 : (i.scrollTop += p, c.viewportTop = se(c.element, i), J(), y(), !0);
  }, [J, y]), W = n.useCallback(() => {
    let c = v.current, i = g.current;
    if (!c || !i) {
      L.current = null;
      return;
    }
    let p = nt({ content: c, spacer: z.current, viewport: i });
    L.current = p ? { element: p, viewportTop: se(p, i) } : null;
  }, []), he = n.useCallback(() => {
    O.current === null && (O.current = window.requestAnimationFrame(() => {
      O.current = null, ne() && W();
    }));
  }, [W, ne]), oe = n.useCallback(() => {
    if (!t || T.current || b.current === 0) return !1;
    let c = !1;
    if (t === "last-anchor") {
      let i = v.current, p = g.current, B = i && p ? rt(ee(i, z.current)) : null;
      if (!i || !p || !B) c = P({ behavior: "auto" });
      else {
        let X = xe(B, p);
        c = de({ content: i, spacer: z.current, viewport: p }) - X <= p.clientHeight ? P({ behavior: "auto" }) : Q(B, { align: "start" }, { keepPreviousPeek: !0 });
      }
    } else c = t === "end" ? P({ behavior: "auto" }) : le({ behavior: "auto" });
    return c ? (T.current = !0, !0) : !1;
  }, [t, Q, P, le]), ve = n.useCallback(() => {
    let c = v.current;
    if (!c) return;
    let i = ee(c, z.current), p = b.current, B = m.current;
    b.current = i.length, m.current = i[0] ?? null, (() => {
      if (ne()) return;
      if (p === 0) {
        if (oe() || i.length > 0 && u.current && P({ behavior: "auto" })) return;
        V(), y();
        return;
      }
      let X = B ? i.indexOf(B) : -1;
      if (F.current && X > 0) {
        be();
        return;
      }
      if (i.length > p) {
        let H = Xe(i, p);
        if (H) {
          if (u.current && d.current === "following-bottom" && tt(i, p)) {
            P({ behavior: "auto" });
            return;
          }
          Q(H, { align: "start" }, { keepPreviousPeek: !0 }), $.current.add(H);
          return;
        }
      }
      if (i.length === p) {
        let H = et(i, $.current);
        if (H) {
          Q(H, { align: "start" }, { keepPreviousPeek: !0 }), $.current.add(H);
          return;
        }
      }
      d.current === "following-bottom" && u.current ? P({ behavior: "auto" }) : (V(), y());
    })(), W();
  }, [oe, W, V, ne, be, y, Q, P]), Re = n.useCallback(() => {
    if (d.current === "following-bottom" && u.current) {
      P({ behavior: "auto" });
      return;
    }
    let c = x.current;
    if (pe()) {
      u.current && c > 0 && x.current === 0 && P({ behavior: "auto" });
      return;
    }
    J(), y();
  }, [pe, J, y, P]), we = n.useCallback(() => {
    let c = g.current;
    if (!(!c || !k.hasListeners())) {
      if (typeof IntersectionObserver > "u") {
        y();
        return;
      }
      M.current || (M.current = new IntersectionObserver((i) => {
        for (let p of i) {
          let B = p.target.dataset.messageId;
          B && (p.isIntersecting ? q.current.add(B) : q.current.delete(B));
        }
        y();
      }, { root: c, rootMargin: `${-(E.current + D.current)}px 0px 0px 0px`, threshold: [0, 0.01, 0.5, 1] })), A.current.forEach((i) => {
        M.current?.observe(i);
      }), y();
    }
  }, [y, k]), Se = n.useCallback(() => {
    R.current !== null && (window.cancelAnimationFrame(R.current), R.current = null), M.current?.disconnect(), M.current = null, q.current.clear(), k.setSnapshot(ae);
  }, [k]), Le = n.useCallback((c, i, p) => {
    if (i) {
      A.current.set(c, i), M.current?.observe(i), y(), G.current?.messageId === c && he();
      return;
    }
    p && A.current.get(c) === p && (A.current.delete(c), q.current.delete(c), M.current?.unobserve(p), y());
  }, [he, y]), Ce = n.useCallback(() => {
    (d.current === "following-bottom" || d.current === "anchored-to-message" || d.current === "settling-jump") && (a.current = null, d.current = "free-scrolling");
  }, []), Te = n.useCallback(() => _(f.getSnapshot()), [f, _]), ke = Ie(j, Te), Me = Ie(g, Te), ye = n.useCallback((c) => {
    v.current = c;
  }, []), Ee = n.useCallback((c) => {
    z.current = c, Y.current = at(c?.parentElement ?? null);
  }, []), Pe = n.useCallback(() => {
    V(), y(), W();
  }, [W, V, y]), ze = n.useMemo(() => ({ handleContentChange: ve, handleResize: Re, observeVisibility: we, preserveScrollOnPrependRef: F, scrollToEnd: P, scrollToMessage: me, scrollToStart: le, setContentElement: ye, setRootElement: ke, setSpacerElement: Ee, setViewportElement: Me, stateStore: f, syncAfterScroll: Pe, unobserveVisibility: Se, userScrollIntent: Ce, viewportRef: g, visibilityStore: k }), [ve, Re, we, P, me, le, ye, ke, Ee, Me, f, Pe, Se, Ce, k]);
  return n.useLayoutEffect(() => {
    oe();
  }, [oe]), n.useEffect(() => () => {
    N.current !== null && (window.cancelAnimationFrame(N.current), N.current = null), R.current !== null && (window.cancelAnimationFrame(R.current), R.current = null), w.current !== null && (window.clearTimeout(w.current), w.current = null), O.current !== null && (window.cancelAnimationFrame(O.current), O.current = null), M.current?.disconnect(), M.current = null;
  }, []), n.useLayoutEffect(() => {
    if (e && d.current === "following-bottom" && b.current > 0) {
      P({ behavior: "auto" });
      return;
    }
    V();
  }, [e, V, P]), { context: ze, registerMessage: Le };
}
function bt(e) {
  let t = n.useRef(e);
  return t.current = e, t;
}
var Fe = n.createContext(null), He = n.createContext(null);
function U() {
  let e = n.useContext(Fe);
  if (!e) throw new Error("useMessageScroller must be used within a MessageScroller.");
  return e;
}
function ht() {
  let e = n.useContext(He);
  if (!e) throw new Error("MessageScrollerItem must be used within a MessageScroller.");
  return e;
}
function Pt() {
  let { scrollToEnd: e, scrollToMessage: t, scrollToStart: r } = U();
  return n.useMemo(() => ({ scrollToEnd: e, scrollToMessage: t, scrollToStart: r }), [e, t, r]);
}
function It() {
  let { stateStore: e } = U();
  return n.useSyncExternalStore(e.subscribe, e.getSnapshot, e.getSnapshot);
}
function At() {
  let { observeVisibility: e, unobserveVisibility: t, visibilityStore: r } = U(), l = n.useCallback((o) => r.subscribe(o, e, t), [e, t, r]);
  return n.useSyncExternalStore(l, r.getSnapshot, r.getSnapshot);
}
function vt({ autoScroll: e = !1, children: t, defaultScrollPosition: r = "end", scrollEdgeThreshold: l, scrollPreviousItemPeek: o, scrollMargin: s }) {
  let { context: a, registerMessage: u } = mt({ autoScroll: e, defaultScrollPosition: r, scrollEdgeThreshold: l, scrollPreviousItemPeek: o, scrollMargin: s });
  return I(Fe.Provider, { value: a, children: I(He.Provider, { value: u, children: t }) });
}
function Rt({ children: e, ...t }) {
  let { setRootElement: r } = U();
  return I("div", { ref: r, ...t, children: e });
}
function wt({ "aria-label": e, children: t, onKeyDown: r, onScroll: l, onTouchMove: o, onWheel: s, preserveScrollOnPrepend: a = !0, ref: u, role: h, tabIndex: w, ...v }) {
  let { handleResize: T, preserveScrollOnPrependRef: m, setViewportElement: b, syncAfterScroll: C, userScrollIntent: A, viewportRef: d } = U();
  m.current = a;
  let O = n.useCallback((S) => {
    b(S), re(u)?.(S);
  }, [u, b]);
  function G(S) {
    C(), l?.(S);
  }
  function L(S) {
    A(), s?.(S);
  }
  function F(S) {
    A(), o?.(S);
  }
  function j(S) {
    Ye.has(S.key) && A(), r?.(S);
  }
  return n.useEffect(() => {
    let S = d.current;
    if (!S || typeof ResizeObserver > "u") return;
    let E = 0, D = new ResizeObserver(() => {
      window.cancelAnimationFrame(E), E = window.requestAnimationFrame(T);
    });
    return D.observe(S), () => {
      window.cancelAnimationFrame(E), D.disconnect();
    };
  }, [T, d]), I("div", { ref: O, role: h ?? "region", "aria-label": e ?? "Messages", tabIndex: w ?? 0, onKeyDown: j, onScroll: G, onTouchMove: F, onWheel: L, ...v, children: t });
}
function St({ "aria-relevant": e, children: t, ref: r, role: l, spacerClassName: o, ...s }) {
  let { handleContentChange: a, handleResize: u, setContentElement: h, setSpacerElement: w } = U(), v = n.useRef(null), T = n.useCallback((m) => {
    v.current = m, h(m), re(r)?.(m);
  }, [r, h]);
  return n.useLayoutEffect(() => {
    let m = v.current;
    if (!m || (a(), typeof MutationObserver > "u")) return;
    let b = new MutationObserver(() => {
      a();
    });
    return b.observe(m, { childList: !0 }), () => b.disconnect();
  }, [a]), n.useEffect(() => {
    let m = v.current;
    if (!m || typeof ResizeObserver > "u") return;
    let b = 0, C = new ResizeObserver(() => {
      window.cancelAnimationFrame(b), b = window.requestAnimationFrame(u);
    });
    return C.observe(m), () => {
      window.cancelAnimationFrame(b), C.disconnect();
    };
  }, [u]), fe("div", { ref: T, role: l ?? "log", "aria-relevant": e ?? "additions", ...s, children: [t, I("div", { ref: w, "aria-hidden": "true", "data-message-scroller-spacer": "", hidden: !0, className: o })] });
}
function Ct({ messageId: e, ref: t, scrollAnchor: r = !1, ...l }) {
  let o = ht(), s = n.useRef(null), a = n.useCallback((u) => {
    let h = s.current;
    s.current = u, e && o(e, u, h), re(t)?.(u);
  }, [e, t, o]);
  return I("div", { ref: a, "data-message-id": e, "data-scroll-anchor": r ? "true" : "false", ...l });
}
function Tt({ behavior: e = "smooth", children: t, direction: r = "end", onClick: l, render: o, tabIndex: s, type: a = "button", ...u }) {
  let { scrollToEnd: h, scrollToStart: w, stateStore: v } = U(), T = bt(l), m = n.useCallback((d) => v.subscribe(d), [v]), b = n.useCallback(() => {
    let d = v.getSnapshot();
    return r === "start" ? d.start : d.end;
  }, [r, v]), C = n.useSyncExternalStore(m, b, b), A = n.useCallback((d) => {
    C && (T.current?.(d), d.defaultPrevented || (d.currentTarget.blur(), r === "start" ? w({ behavior: e }) : h({ behavior: e })));
  }, [e, r, C, T, h, w]);
  return De({ defaultTagName: "button", props: ce({ type: a, inert: !C, tabIndex: C ? s : -1, children: t ?? fe("span", { children: ["Scroll to ", r] }), onClick: A }, u), render: o, state: { active: C, direction: r }, stateAttributesMapping: { active: (d) => ({ "data-active": d ? "true" : "false" }) } });
}
var K = { Provider: vt, Root: Rt, Viewport: wt, Content: St, Item: Ct, Button: Tt };
function xt(e) {
  return /* @__PURE__ */ I(K.Provider, { ...e });
}
function Ot({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ I(
    K.Root,
    {
      "data-slot": "message-scroller",
      className: te(
        "group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden",
        e
      ),
      ...t
    }
  );
}
function Bt({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ I(
    K.Viewport,
    {
      "data-slot": "message-scroller-viewport",
      className: te(
        "size-full min-h-0 min-w-0 scroll-fade-b scrollbar-thin scrollbar-gutter-stable overflow-y-auto overscroll-contain contain-content data-autoscrolling:scrollbar-none",
        e
      ),
      ...t
    }
  );
}
function Ft({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ I(
    K.Content,
    {
      "data-slot": "message-scroller-content",
      className: te("flex h-max min-h-full flex-col gap-8", e),
      ...t
    }
  );
}
function Ht({
  className: e,
  scrollAnchor: t = !1,
  ...r
}) {
  return /* @__PURE__ */ I(
    K.Item,
    {
      "data-slot": "message-scroller-item",
      scrollAnchor: t,
      className: te(
        "min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]",
        e
      ),
      ...r
    }
  );
}
function Lt({
  direction: e = "end",
  className: t,
  children: r,
  render: l,
  variant: o = "secondary",
  size: s = "icon-sm",
  ...a
}) {
  return /* @__PURE__ */ I(
    K.Button,
    {
      "data-slot": "message-scroller-button",
      "data-direction": e,
      "data-variant": o,
      "data-size": s,
      direction: e,
      className: te(
        "absolute inset-s-1/2 -translate-x-1/2 border-border bg-background text-foreground transition-[translate,scale,opacity] duration-200 hover:bg-accent hover:text-foreground data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-400 data-[active=false]:ease-[cubic-bezier(0.7,0,0.84,0)] data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:ease-[cubic-bezier(0.23,1,0.32,1)] data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-full data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-full rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180",
        t
      ),
      render: l ?? /* @__PURE__ */ I(je, { variant: o, size: s }),
      ...a,
      children: r ?? /* @__PURE__ */ fe(Ne, { children: [
        /* @__PURE__ */ I(Ve, {}),
        /* @__PURE__ */ I("span", { className: "sr-only", children: e === "end" ? "Scroll to end" : "Scroll to start" })
      ] })
    }
  );
}
export {
  Ot as MessageScroller,
  Lt as MessageScrollerButton,
  Ft as MessageScrollerContent,
  Ht as MessageScrollerItem,
  xt as MessageScrollerProvider,
  Bt as MessageScrollerViewport,
  Pt as useMessageScroller,
  It as useMessageScrollerScrollable,
  At as useMessageScrollerVisibility
};
