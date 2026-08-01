import { jsx as Y, jsxs as Xt } from "react/jsx-runtime";
import * as $ from "react";
import { useRef as qt, useState as $t, useCallback as dn, useEffect as Tt } from "react";
import { A as pn, g as mn } from "../../icons-DUsO7wRs.js";
import { c as gt } from "../../utils-TrrhThB-.js";
import { Button as Yt } from "./button.js";
function gn(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
function Kt(t) {
  return gn(t) || Array.isArray(t);
}
function hn() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
function Dt(t, n) {
  const o = Object.keys(t), i = Object.keys(n);
  if (o.length !== i.length) return !1;
  const c = JSON.stringify(Object.keys(t.breakpoints || {})), s = JSON.stringify(Object.keys(n.breakpoints || {}));
  return c !== s ? !1 : o.every((e) => {
    const a = t[e], r = n[e];
    return typeof a == "function" ? `${a}` == `${r}` : !Kt(a) || !Kt(r) ? a === r : Dt(a, r);
  });
}
function Ut(t) {
  return t.concat().sort((n, o) => n.name > o.name ? 1 : -1).map((n) => n.options);
}
function Sn(t, n) {
  if (t.length !== n.length) return !1;
  const o = Ut(t), i = Ut(n);
  return o.every((c, s) => {
    const e = i[s];
    return Dt(c, e);
  });
}
function Pt(t) {
  return typeof t == "number";
}
function wt(t) {
  return typeof t == "string";
}
function bt(t) {
  return typeof t == "boolean";
}
function Qt(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
function P(t) {
  return Math.abs(t);
}
function Ot(t) {
  return Math.sign(t);
}
function ft(t, n) {
  return P(t - n);
}
function yn(t, n) {
  if (t === 0 || n === 0 || P(t) <= P(n)) return 0;
  const o = ft(P(t), P(n));
  return P(o / t);
}
function bn(t) {
  return Math.round(t * 100) / 100;
}
function dt(t) {
  return pt(t).map(Number);
}
function V(t) {
  return t[ht(t)];
}
function ht(t) {
  return Math.max(0, t.length - 1);
}
function Mt(t, n) {
  return n === ht(t);
}
function Jt(t, n = 0) {
  return Array.from(Array(t), (o, i) => n + i);
}
function pt(t) {
  return Object.keys(t);
}
function _t(t, n) {
  return [t, n].reduce((o, i) => (pt(i).forEach((c) => {
    const s = o[c], e = i[c], a = Qt(s) && Qt(e);
    o[c] = a ? _t(s, e) : e;
  }), o), {});
}
function At(t, n) {
  return typeof n.MouseEvent < "u" && t instanceof n.MouseEvent;
}
function xn(t, n) {
  const o = {
    start: i,
    center: c,
    end: s
  };
  function i() {
    return 0;
  }
  function c(r) {
    return s(r) / 2;
  }
  function s(r) {
    return n - r;
  }
  function e(r, u) {
    return wt(t) ? o[t](r) : t(n, r, u);
  }
  return {
    measure: e
  };
}
function mt() {
  let t = [];
  function n(c, s, e, a = {
    passive: !0
  }) {
    let r;
    if ("addEventListener" in c)
      c.addEventListener(s, e, a), r = () => c.removeEventListener(s, e, a);
    else {
      const u = c;
      u.addListener(e), r = () => u.removeListener(e);
    }
    return t.push(r), i;
  }
  function o() {
    t = t.filter((c) => c());
  }
  const i = {
    add: n,
    clear: o
  };
  return i;
}
function En(t, n, o, i) {
  const c = mt(), s = 1e3 / 60;
  let e = null, a = 0, r = 0;
  function u() {
    c.add(t, "visibilitychange", () => {
      t.hidden && f();
    });
  }
  function h() {
    y(), c.clear();
  }
  function d(g) {
    if (!r) return;
    e || (e = g, o(), o());
    const l = g - e;
    for (e = g, a += l; a >= s; )
      o(), a -= s;
    const S = a / s;
    i(S), r && (r = n.requestAnimationFrame(d));
  }
  function p() {
    r || (r = n.requestAnimationFrame(d));
  }
  function y() {
    n.cancelAnimationFrame(r), e = null, a = 0, r = 0;
  }
  function f() {
    e = null, a = 0;
  }
  return {
    init: u,
    destroy: h,
    start: p,
    stop: y,
    update: o,
    render: i
  };
}
function vn(t, n) {
  const o = n === "rtl", i = t === "y", c = i ? "y" : "x", s = i ? "x" : "y", e = !i && o ? -1 : 1, a = h(), r = d();
  function u(f) {
    const {
      height: m,
      width: g
    } = f;
    return i ? m : g;
  }
  function h() {
    return i ? "top" : o ? "right" : "left";
  }
  function d() {
    return i ? "bottom" : o ? "left" : "right";
  }
  function p(f) {
    return f * e;
  }
  return {
    scroll: c,
    cross: s,
    startEdge: a,
    endEdge: r,
    measureSize: u,
    direction: p
  };
}
function et(t = 0, n = 0) {
  const o = P(t - n);
  function i(u) {
    return u < t;
  }
  function c(u) {
    return u > n;
  }
  function s(u) {
    return i(u) || c(u);
  }
  function e(u) {
    return s(u) ? i(u) ? t : n : u;
  }
  function a(u) {
    return o ? u - o * Math.ceil((u - n) / o) : u;
  }
  return {
    length: o,
    max: n,
    min: t,
    constrain: e,
    reachedAny: s,
    reachedMax: c,
    reachedMin: i,
    removeOffset: a
  };
}
function Zt(t, n, o) {
  const {
    constrain: i
  } = et(0, t), c = t + 1;
  let s = e(n);
  function e(p) {
    return o ? P((c + p) % c) : i(p);
  }
  function a() {
    return s;
  }
  function r(p) {
    return s = e(p), d;
  }
  function u(p) {
    return h().set(a() + p);
  }
  function h() {
    return Zt(t, a(), o);
  }
  const d = {
    get: a,
    set: r,
    add: u,
    clone: h
  };
  return d;
}
function Ln(t, n, o, i, c, s, e, a, r, u, h, d, p, y, f, m, g, l, S) {
  const {
    cross: x,
    direction: L
  } = t, A = ["INPUT", "SELECT", "TEXTAREA"], I = {
    passive: !1
  }, E = mt(), v = mt(), C = et(50, 225).constrain(y.measure(20)), O = {
    mouse: 300,
    touch: 400
  }, T = {
    mouse: 500,
    touch: 600
  }, F = f ? 43 : 25;
  let j = !1, R = 0, G = 0, W = !1, _ = !1, K = !1, U = !1;
  function it(b) {
    if (!S) return;
    function w(k) {
      (bt(S) || S(b, k)) && ut(k);
    }
    const M = n;
    E.add(M, "dragstart", (k) => k.preventDefault(), I).add(M, "touchmove", () => {
    }, I).add(M, "touchend", () => {
    }).add(M, "touchstart", w).add(M, "mousedown", w).add(M, "touchcancel", N).add(M, "contextmenu", N).add(M, "click", J, !0);
  }
  function H() {
    E.clear(), v.clear();
  }
  function ot() {
    const b = U ? o : n;
    v.add(b, "touchmove", z, I).add(b, "touchend", N).add(b, "mousemove", z, I).add(b, "mouseup", N);
  }
  function rt(b) {
    const w = b.nodeName || "";
    return A.includes(w);
  }
  function Q() {
    return (f ? T : O)[U ? "mouse" : "touch"];
  }
  function ct(b, w) {
    const M = d.add(Ot(b) * -1), k = h.byDistance(b, !f).distance;
    return f || P(b) < C ? k : g && w ? k * 0.5 : h.byIndex(M.get(), 0).distance;
  }
  function ut(b) {
    const w = At(b, i);
    U = w, K = f && w && !b.buttons && j, j = ft(c.get(), e.get()) >= 2, !(w && b.button !== 0) && (rt(b.target) || (W = !0, s.pointerDown(b), u.useFriction(0).useDuration(0), c.set(e), ot(), R = s.readPoint(b), G = s.readPoint(b, x), p.emit("pointerDown")));
  }
  function z(b) {
    if (!At(b, i) && b.touches.length >= 2) return N(b);
    const M = s.readPoint(b), k = s.readPoint(b, x), q = ft(M, R), X = ft(k, G);
    if (!_ && !U && (!b.cancelable || (_ = q > X, !_)))
      return N(b);
    const tt = s.pointerMove(b);
    q > m && (K = !0), u.useFriction(0.3).useDuration(0.75), a.start(), c.add(L(tt)), b.preventDefault();
  }
  function N(b) {
    const M = h.byDistance(0, !1).index !== d.get(), k = s.pointerUp(b) * Q(), q = ct(L(k), M), X = yn(k, q), tt = F - 10 * X, Z = l + X / 50;
    _ = !1, W = !1, v.clear(), u.useDuration(tt).useFriction(Z), r.distance(q, !f), U = !1, p.emit("pointerUp");
  }
  function J(b) {
    K && (b.stopPropagation(), b.preventDefault(), K = !1);
  }
  function B() {
    return W;
  }
  return {
    init: it,
    destroy: H,
    pointerDown: B
  };
}
function In(t, n) {
  let i, c;
  function s(d) {
    return d.timeStamp;
  }
  function e(d, p) {
    const f = `client${(p || t.scroll) === "x" ? "X" : "Y"}`;
    return (At(d, n) ? d : d.touches[0])[f];
  }
  function a(d) {
    return i = d, c = d, e(d);
  }
  function r(d) {
    const p = e(d) - e(c), y = s(d) - s(i) > 170;
    return c = d, y && (i = d), p;
  }
  function u(d) {
    if (!i || !c) return 0;
    const p = e(c) - e(i), y = s(d) - s(i), f = s(d) - s(c) > 170, m = p / y;
    return y && !f && P(m) > 0.1 ? m : 0;
  }
  return {
    pointerDown: a,
    pointerMove: r,
    pointerUp: u,
    readPoint: e
  };
}
function Cn() {
  function t(o) {
    const {
      offsetTop: i,
      offsetLeft: c,
      offsetWidth: s,
      offsetHeight: e
    } = o;
    return {
      top: i,
      right: c + s,
      bottom: i + e,
      left: c,
      width: s,
      height: e
    };
  }
  return {
    measure: t
  };
}
function Tn(t) {
  function n(i) {
    return t * (i / 100);
  }
  return {
    measure: n
  };
}
function wn(t, n, o, i, c, s, e) {
  const a = [t].concat(i);
  let r, u, h = [], d = !1;
  function p(g) {
    return c.measureSize(e.measure(g));
  }
  function y(g) {
    if (!s) return;
    u = p(t), h = i.map(p);
    function l(S) {
      for (const x of S) {
        if (d) return;
        const L = x.target === t, A = i.indexOf(x.target), I = L ? u : h[A], E = p(L ? t : i[A]);
        if (P(E - I) >= 0.5) {
          g.reInit(), n.emit("resize");
          break;
        }
      }
    }
    r = new ResizeObserver((S) => {
      (bt(s) || s(g, S)) && l(S);
    }), o.requestAnimationFrame(() => {
      a.forEach((S) => r.observe(S));
    });
  }
  function f() {
    d = !0, r && r.disconnect();
  }
  return {
    init: y,
    destroy: f
  };
}
function An(t, n, o, i, c, s) {
  let e = 0, a = 0, r = c, u = s, h = t.get(), d = 0;
  function p() {
    const I = i.get() - t.get(), E = !r;
    let v = 0;
    return E ? (e = 0, o.set(i), t.set(i), v = I) : (o.set(t), e += I / r, e *= u, h += e, t.add(e), v = h - d), a = Ot(v), d = h, A;
  }
  function y() {
    const I = i.get() - n.get();
    return P(I) < 1e-3;
  }
  function f() {
    return r;
  }
  function m() {
    return a;
  }
  function g() {
    return e;
  }
  function l() {
    return x(c);
  }
  function S() {
    return L(s);
  }
  function x(I) {
    return r = I, A;
  }
  function L(I) {
    return u = I, A;
  }
  const A = {
    direction: m,
    duration: f,
    velocity: g,
    seek: p,
    settled: y,
    useBaseFriction: S,
    useBaseDuration: l,
    useFriction: L,
    useDuration: x
  };
  return A;
}
function Dn(t, n, o, i, c) {
  const s = c.measure(10), e = c.measure(50), a = et(0.1, 0.99);
  let r = !1;
  function u() {
    return !(r || !t.reachedAny(o.get()) || !t.reachedAny(n.get()));
  }
  function h(y) {
    if (!u()) return;
    const f = t.reachedMin(n.get()) ? "min" : "max", m = P(t[f] - n.get()), g = o.get() - n.get(), l = a.constrain(m / e);
    o.subtract(g * l), !y && P(g) < s && (o.set(t.constrain(o.get())), i.useDuration(25).useBaseFriction());
  }
  function d(y) {
    r = !y;
  }
  return {
    shouldConstrain: u,
    constrain: h,
    toggleActive: d
  };
}
function Pn(t, n, o, i, c) {
  const s = et(-n + t, 0), e = d(), a = h(), r = p();
  function u(f, m) {
    return ft(f, m) <= 1;
  }
  function h() {
    const f = e[0], m = V(e), g = e.lastIndexOf(f), l = e.indexOf(m) + 1;
    return et(g, l);
  }
  function d() {
    return o.map((f, m) => {
      const {
        min: g,
        max: l
      } = s, S = s.constrain(f), x = !m, L = Mt(o, m);
      return x ? l : L || u(g, S) ? g : u(l, S) ? l : S;
    }).map((f) => parseFloat(f.toFixed(3)));
  }
  function p() {
    if (n <= t + c) return [s.max];
    if (i === "keepSnaps") return e;
    const {
      min: f,
      max: m
    } = a;
    return e.slice(f, m);
  }
  return {
    snapsContained: r,
    scrollContainLimit: a
  };
}
function On(t, n, o) {
  const i = n[0], c = o ? i - t : V(n);
  return {
    limit: et(c, i)
  };
}
function Mn(t, n, o, i) {
  const s = n.min + 0.1, e = n.max + 0.1, {
    reachedMin: a,
    reachedMax: r
  } = et(s, e);
  function u(p) {
    return p === 1 ? r(o.get()) : p === -1 ? a(o.get()) : !1;
  }
  function h(p) {
    if (!u(p)) return;
    const y = t * (p * -1);
    i.forEach((f) => f.add(y));
  }
  return {
    loop: h
  };
}
function Nn(t) {
  const {
    max: n,
    length: o
  } = t;
  function i(s) {
    const e = s - n;
    return o ? e / -o : 0;
  }
  return {
    get: i
  };
}
function kn(t, n, o, i, c) {
  const {
    startEdge: s,
    endEdge: e
  } = t, {
    groupSlides: a
  } = c, r = d().map(n.measure), u = p(), h = y();
  function d() {
    return a(i).map((m) => V(m)[e] - m[0][s]).map(P);
  }
  function p() {
    return i.map((m) => o[s] - m[s]).map((m) => -P(m));
  }
  function y() {
    return a(u).map((m) => m[0]).map((m, g) => m + r[g]);
  }
  return {
    snaps: u,
    snapsAligned: h
  };
}
function Fn(t, n, o, i, c, s) {
  const {
    groupSlides: e
  } = c, {
    min: a,
    max: r
  } = i, u = h();
  function h() {
    const p = e(s), y = !t || n === "keepSnaps";
    return o.length === 1 ? [s] : y ? p : p.slice(a, r).map((f, m, g) => {
      const l = !m, S = Mt(g, m);
      if (l) {
        const x = V(g[0]) + 1;
        return Jt(x);
      }
      if (S) {
        const x = ht(s) - V(g)[0] + 1;
        return Jt(x, V(g)[0]);
      }
      return f;
    });
  }
  return {
    slideRegistry: u
  };
}
function zn(t, n, o, i, c) {
  const {
    reachedAny: s,
    removeOffset: e,
    constrain: a
  } = i;
  function r(f) {
    return f.concat().sort((m, g) => P(m) - P(g))[0];
  }
  function u(f) {
    const m = t ? e(f) : a(f), g = n.map((S, x) => ({
      diff: h(S - m, 0),
      index: x
    })).sort((S, x) => P(S.diff) - P(x.diff)), {
      index: l
    } = g[0];
    return {
      index: l,
      distance: m
    };
  }
  function h(f, m) {
    const g = [f, f + o, f - o];
    if (!t) return f;
    if (!m) return r(g);
    const l = g.filter((S) => Ot(S) === m);
    return l.length ? r(l) : V(g) - o;
  }
  function d(f, m) {
    const g = n[f] - c.get(), l = h(g, m);
    return {
      index: f,
      distance: l
    };
  }
  function p(f, m) {
    const g = c.get() + f, {
      index: l,
      distance: S
    } = u(g), x = !t && s(g);
    if (!m || x) return {
      index: l,
      distance: f
    };
    const L = n[l] - S, A = f + h(L, 0);
    return {
      index: l,
      distance: A
    };
  }
  return {
    byDistance: p,
    byIndex: d,
    shortcut: h
  };
}
function Bn(t, n, o, i, c, s, e) {
  function a(d) {
    const p = d.distance, y = d.index !== n.get();
    s.add(p), p && (i.duration() ? t.start() : (t.update(), t.render(1), t.update())), y && (o.set(n.get()), n.set(d.index), e.emit("select"));
  }
  function r(d, p) {
    const y = c.byDistance(d, p);
    a(y);
  }
  function u(d, p) {
    const y = n.clone().set(d), f = c.byIndex(y.get(), p);
    a(f);
  }
  return {
    distance: r,
    index: u
  };
}
function Vn(t, n, o, i, c, s, e, a) {
  const r = {
    passive: !0,
    capture: !0
  };
  let u = 0;
  function h(y) {
    if (!a) return;
    function f(m) {
      if ((/* @__PURE__ */ new Date()).getTime() - u > 10) return;
      e.emit("slideFocusStart"), t.scrollLeft = 0;
      const S = o.findIndex((x) => x.includes(m));
      Pt(S) && (c.useDuration(0), i.index(S, 0), e.emit("slideFocus"));
    }
    s.add(document, "keydown", d, !1), n.forEach((m, g) => {
      s.add(m, "focus", (l) => {
        (bt(a) || a(y, l)) && f(g);
      }, r);
    });
  }
  function d(y) {
    y.code === "Tab" && (u = (/* @__PURE__ */ new Date()).getTime());
  }
  return {
    init: h
  };
}
function lt(t) {
  let n = t;
  function o() {
    return n;
  }
  function i(r) {
    n = e(r);
  }
  function c(r) {
    n += e(r);
  }
  function s(r) {
    n -= e(r);
  }
  function e(r) {
    return Pt(r) ? r : r.get();
  }
  return {
    get: o,
    set: i,
    add: c,
    subtract: s
  };
}
function Wt(t, n) {
  const o = t.scroll === "x" ? e : a, i = n.style;
  let c = null, s = !1;
  function e(p) {
    return `translate3d(${p}px,0px,0px)`;
  }
  function a(p) {
    return `translate3d(0px,${p}px,0px)`;
  }
  function r(p) {
    if (s) return;
    const y = bn(t.direction(p));
    y !== c && (i.transform = o(y), c = y);
  }
  function u(p) {
    s = !p;
  }
  function h() {
    s || (i.transform = "", n.getAttribute("style") || n.removeAttribute("style"));
  }
  return {
    clear: h,
    to: r,
    toggleActive: u
  };
}
function jn(t, n, o, i, c, s, e, a, r) {
  const h = dt(c), d = dt(c).reverse(), p = l().concat(S());
  function y(E, v) {
    return E.reduce((C, O) => C - c[O], v);
  }
  function f(E, v) {
    return E.reduce((C, O) => y(C, v) > 0 ? C.concat([O]) : C, []);
  }
  function m(E) {
    return s.map((v, C) => ({
      start: v - i[C] + 0.5 + E,
      end: v + n - 0.5 + E
    }));
  }
  function g(E, v, C) {
    const O = m(v);
    return E.map((T) => {
      const F = C ? 0 : -o, j = C ? o : 0, R = C ? "end" : "start", G = O[T][R];
      return {
        index: T,
        loopPoint: G,
        slideLocation: lt(-1),
        translate: Wt(t, r[T]),
        target: () => a.get() > G ? F : j
      };
    });
  }
  function l() {
    const E = e[0], v = f(d, E);
    return g(v, o, !1);
  }
  function S() {
    const E = n - e[0] - 1, v = f(h, E);
    return g(v, -o, !0);
  }
  function x() {
    return p.every(({
      index: E
    }) => {
      const v = h.filter((C) => C !== E);
      return y(v, n) <= 0.1;
    });
  }
  function L() {
    p.forEach((E) => {
      const {
        target: v,
        translate: C,
        slideLocation: O
      } = E, T = v();
      T !== O.get() && (C.to(T), O.set(T));
    });
  }
  function A() {
    p.forEach((E) => E.translate.clear());
  }
  return {
    canLoop: x,
    clear: A,
    loop: L,
    loopPoints: p
  };
}
function Rn(t, n, o) {
  let i, c = !1;
  function s(r) {
    if (!o) return;
    function u(h) {
      for (const d of h)
        if (d.type === "childList") {
          r.reInit(), n.emit("slidesChanged");
          break;
        }
    }
    i = new MutationObserver((h) => {
      c || (bt(o) || o(r, h)) && u(h);
    }), i.observe(t, {
      childList: !0
    });
  }
  function e() {
    i && i.disconnect(), c = !0;
  }
  return {
    init: s,
    destroy: e
  };
}
function Gn(t, n, o, i) {
  const c = {};
  let s = null, e = null, a, r = !1;
  function u() {
    a = new IntersectionObserver((f) => {
      r || (f.forEach((m) => {
        const g = n.indexOf(m.target);
        c[g] = m;
      }), s = null, e = null, o.emit("slidesInView"));
    }, {
      root: t.parentElement,
      threshold: i
    }), n.forEach((f) => a.observe(f));
  }
  function h() {
    a && a.disconnect(), r = !0;
  }
  function d(f) {
    return pt(c).reduce((m, g) => {
      const l = parseInt(g), {
        isIntersecting: S
      } = c[l];
      return (f && S || !f && !S) && m.push(l), m;
    }, []);
  }
  function p(f = !0) {
    if (f && s) return s;
    if (!f && e) return e;
    const m = d(f);
    return f && (s = m), f || (e = m), m;
  }
  return {
    init: u,
    destroy: h,
    get: p
  };
}
function Hn(t, n, o, i, c, s) {
  const {
    measureSize: e,
    startEdge: a,
    endEdge: r
  } = t, u = o[0] && c, h = f(), d = m(), p = o.map(e), y = g();
  function f() {
    if (!u) return 0;
    const S = o[0];
    return P(n[a] - S[a]);
  }
  function m() {
    if (!u) return 0;
    const S = s.getComputedStyle(V(i));
    return parseFloat(S.getPropertyValue(`margin-${r}`));
  }
  function g() {
    return o.map((S, x, L) => {
      const A = !x, I = Mt(L, x);
      return A ? p[x] + h : I ? p[x] + d : L[x + 1][a] - S[a];
    }).map(P);
  }
  return {
    slideSizes: p,
    slideSizesWithGaps: y,
    startGap: h,
    endGap: d
  };
}
function qn(t, n, o, i, c, s, e, a, r) {
  const {
    startEdge: u,
    endEdge: h,
    direction: d
  } = t, p = Pt(o);
  function y(l, S) {
    return dt(l).filter((x) => x % S === 0).map((x) => l.slice(x, x + S));
  }
  function f(l) {
    return l.length ? dt(l).reduce((S, x, L) => {
      const A = V(S) || 0, I = A === 0, E = x === ht(l), v = c[u] - s[A][u], C = c[u] - s[x][h], O = !i && I ? d(e) : 0, T = !i && E ? d(a) : 0, F = P(C - T - (v + O));
      return L && F > n + r && S.push(x), E && S.push(l.length), S;
    }, []).map((S, x, L) => {
      const A = Math.max(L[x - 1] || 0);
      return l.slice(A, S);
    }) : [];
  }
  function m(l) {
    return p ? y(l, o) : f(l);
  }
  return {
    groupSlides: m
  };
}
function $n(t, n, o, i, c, s, e) {
  const {
    align: a,
    axis: r,
    direction: u,
    startIndex: h,
    loop: d,
    duration: p,
    dragFree: y,
    dragThreshold: f,
    inViewThreshold: m,
    slidesToScroll: g,
    skipSnaps: l,
    containScroll: S,
    watchResize: x,
    watchSlides: L,
    watchDrag: A,
    watchFocus: I
  } = s, E = 2, v = Cn(), C = v.measure(n), O = o.map(v.measure), T = vn(r, u), F = T.measureSize(C), j = Tn(F), R = xn(a, F), G = !d && !!S, W = d || !!S, {
    slideSizes: _,
    slideSizesWithGaps: K,
    startGap: U,
    endGap: it
  } = Hn(T, C, O, o, W, c), H = qn(T, F, g, d, C, O, U, it, E), {
    snaps: ot,
    snapsAligned: rt
  } = kn(T, R, C, O, H), Q = -V(ot) + V(K), {
    snapsContained: ct,
    scrollContainLimit: ut
  } = Pn(F, Q, rt, S, E), z = G ? ct : rt, {
    limit: N
  } = On(Q, z, d), J = Zt(ht(z), h, d), B = J.clone(), D = dt(o), b = ({
    dragHandler: st,
    scrollBody: It,
    scrollBounds: Ct,
    options: {
      loop: St
    }
  }) => {
    St || Ct.constrain(st.pointerDown()), It.seek();
  }, w = ({
    scrollBody: st,
    translate: It,
    location: Ct,
    offsetLocation: St,
    previousLocation: on,
    scrollLooper: rn,
    slideLooper: sn,
    dragHandler: cn,
    animation: un,
    eventHandler: Bt,
    scrollBounds: an,
    options: {
      loop: Vt
    }
  }, jt) => {
    const Rt = st.settled(), ln = !an.shouldConstrain(), Gt = Vt ? Rt : Rt && ln, Ht = Gt && !cn.pointerDown();
    Ht && un.stop();
    const fn = Ct.get() * jt + on.get() * (1 - jt);
    St.set(fn), Vt && (rn.loop(st.direction()), sn.loop()), It.to(St.get()), Ht && Bt.emit("settle"), Gt || Bt.emit("scroll");
  }, M = En(i, c, () => b(Lt), (st) => w(Lt, st)), k = 0.68, q = z[J.get()], X = lt(q), tt = lt(q), Z = lt(q), nt = lt(q), at = An(X, Z, tt, nt, p, k), Et = zn(d, z, Q, N, nt), vt = Bn(M, J, B, at, Et, nt, e), kt = Nn(N), Ft = mt(), nn = Gn(n, o, e, m), {
    slideRegistry: zt
  } = Fn(G, S, z, ut, H, D), en = Vn(t, o, zt, vt, at, Ft, e, I), Lt = {
    ownerDocument: i,
    ownerWindow: c,
    eventHandler: e,
    containerRect: C,
    slideRects: O,
    animation: M,
    axis: T,
    dragHandler: Ln(T, t, i, c, nt, In(T, c), X, M, vt, at, Et, J, e, j, y, f, l, k, A),
    eventStore: Ft,
    percentOfView: j,
    index: J,
    indexPrevious: B,
    limit: N,
    location: X,
    offsetLocation: Z,
    previousLocation: tt,
    options: s,
    resizeHandler: wn(n, e, c, o, T, x, v),
    scrollBody: at,
    scrollBounds: Dn(N, Z, nt, at, j),
    scrollLooper: Mn(Q, N, Z, [X, Z, tt, nt]),
    scrollProgress: kt,
    scrollSnapList: z.map(kt.get),
    scrollSnaps: z,
    scrollTarget: Et,
    scrollTo: vt,
    slideLooper: jn(T, F, Q, _, K, ot, z, Z, o),
    slideFocus: en,
    slidesHandler: Rn(n, e, L),
    slidesInView: nn,
    slideIndexes: D,
    slideRegistry: zt,
    slidesToScroll: H,
    target: nt,
    translate: Wt(T, n)
  };
  return Lt;
}
function Kn() {
  let t = {}, n;
  function o(u) {
    n = u;
  }
  function i(u) {
    return t[u] || [];
  }
  function c(u) {
    return i(u).forEach((h) => h(n, u)), r;
  }
  function s(u, h) {
    return t[u] = i(u).concat([h]), r;
  }
  function e(u, h) {
    return t[u] = i(u).filter((d) => d !== h), r;
  }
  function a() {
    t = {};
  }
  const r = {
    init: o,
    emit: c,
    off: e,
    on: s,
    clear: a
  };
  return r;
}
const Un = {
  align: "center",
  axis: "x",
  container: null,
  slides: null,
  containScroll: "trimSnaps",
  direction: "ltr",
  slidesToScroll: 1,
  inViewThreshold: 0,
  breakpoints: {},
  dragFree: !1,
  dragThreshold: 10,
  loop: !1,
  skipSnaps: !1,
  duration: 25,
  startIndex: 0,
  active: !0,
  watchDrag: !0,
  watchResize: !0,
  watchSlides: !0,
  watchFocus: !0
};
function Qn(t) {
  function n(s, e) {
    return _t(s, e || {});
  }
  function o(s) {
    const e = s.breakpoints || {}, a = pt(e).filter((r) => t.matchMedia(r).matches).map((r) => e[r]).reduce((r, u) => n(r, u), {});
    return n(s, a);
  }
  function i(s) {
    return s.map((e) => pt(e.breakpoints || {})).reduce((e, a) => e.concat(a), []).map(t.matchMedia);
  }
  return {
    mergeOptions: n,
    optionsAtMedia: o,
    optionsMediaQueries: i
  };
}
function Jn(t) {
  let n = [];
  function o(s, e) {
    return n = e.filter(({
      options: a
    }) => t.optionsAtMedia(a).active !== !1), n.forEach((a) => a.init(s, t)), e.reduce((a, r) => Object.assign(a, {
      [r.name]: r
    }), {});
  }
  function i() {
    n = n.filter((s) => s.destroy());
  }
  return {
    init: o,
    destroy: i
  };
}
function yt(t, n, o) {
  const i = t.ownerDocument, c = i.defaultView, s = Qn(c), e = Jn(s), a = mt(), r = Kn(), {
    mergeOptions: u,
    optionsAtMedia: h,
    optionsMediaQueries: d
  } = s, {
    on: p,
    off: y,
    emit: f
  } = r, m = T;
  let g = !1, l, S = u(Un, yt.globalOptions), x = u(S), L = [], A, I, E;
  function v() {
    const {
      container: D,
      slides: b
    } = x;
    I = (wt(D) ? t.querySelector(D) : D) || t.children[0];
    const M = wt(b) ? I.querySelectorAll(b) : b;
    E = [].slice.call(M || I.children);
  }
  function C(D) {
    const b = $n(t, I, E, i, c, D, r);
    if (D.loop && !b.slideLooper.canLoop()) {
      const w = Object.assign({}, D, {
        loop: !1
      });
      return C(w);
    }
    return b;
  }
  function O(D, b) {
    g || (S = u(S, D), x = h(S), L = b || L, v(), l = C(x), d([S, ...L.map(({
      options: w
    }) => w)]).forEach((w) => a.add(w, "change", T)), x.active && (l.translate.to(l.location.get()), l.animation.init(), l.slidesInView.init(), l.slideFocus.init(B), l.eventHandler.init(B), l.resizeHandler.init(B), l.slidesHandler.init(B), l.options.loop && l.slideLooper.loop(), I.offsetParent && E.length && l.dragHandler.init(B), A = e.init(B, L)));
  }
  function T(D, b) {
    const w = H();
    F(), O(u({
      startIndex: w
    }, D), b), r.emit("reInit");
  }
  function F() {
    l.dragHandler.destroy(), l.eventStore.clear(), l.translate.clear(), l.slideLooper.clear(), l.resizeHandler.destroy(), l.slidesHandler.destroy(), l.slidesInView.destroy(), l.animation.destroy(), e.destroy(), a.clear();
  }
  function j() {
    g || (g = !0, a.clear(), F(), r.emit("destroy"), r.clear());
  }
  function R(D, b, w) {
    !x.active || g || (l.scrollBody.useBaseFriction().useDuration(b === !0 ? 0 : x.duration), l.scrollTo.index(D, w || 0));
  }
  function G(D) {
    const b = l.index.add(1).get();
    R(b, D, -1);
  }
  function W(D) {
    const b = l.index.add(-1).get();
    R(b, D, 1);
  }
  function _() {
    return l.index.add(1).get() !== H();
  }
  function K() {
    return l.index.add(-1).get() !== H();
  }
  function U() {
    return l.scrollSnapList;
  }
  function it() {
    return l.scrollProgress.get(l.offsetLocation.get());
  }
  function H() {
    return l.index.get();
  }
  function ot() {
    return l.indexPrevious.get();
  }
  function rt() {
    return l.slidesInView.get();
  }
  function Q() {
    return l.slidesInView.get(!1);
  }
  function ct() {
    return A;
  }
  function ut() {
    return l;
  }
  function z() {
    return t;
  }
  function N() {
    return I;
  }
  function J() {
    return E;
  }
  const B = {
    canScrollNext: _,
    canScrollPrev: K,
    containerNode: N,
    internalEngine: ut,
    destroy: j,
    off: y,
    on: p,
    emit: f,
    plugins: ct,
    previousScrollSnap: ot,
    reInit: m,
    rootNode: z,
    scrollNext: G,
    scrollPrev: W,
    scrollProgress: it,
    scrollSnapList: U,
    scrollTo: R,
    selectedScrollSnap: H,
    slideNodes: J,
    slidesInView: rt,
    slidesNotInView: Q
  };
  return O(n, o), setTimeout(() => r.emit("init"), 0), B;
}
yt.globalOptions = void 0;
function Nt(t = {}, n = []) {
  const o = qt(t), i = qt(n), [c, s] = $t(), [e, a] = $t(), r = dn(() => {
    c && c.reInit(o.current, i.current);
  }, [c]);
  return Tt(() => {
    Dt(o.current, t) || (o.current = t, r());
  }, [t, r]), Tt(() => {
    Sn(i.current, n) || (i.current = n, r());
  }, [n, r]), Tt(() => {
    if (hn() && e) {
      yt.globalOptions = Nt.globalOptions;
      const u = yt(e, o.current, i.current);
      return s(u), () => u.destroy();
    } else
      s(void 0);
  }, [e, s]), [a, c];
}
Nt.globalOptions = void 0;
const tn = $.createContext(null);
function xt() {
  const t = $.useContext(tn);
  if (!t)
    throw new Error("useCarousel must be used within a <Carousel />");
  return t;
}
function te({
  orientation: t = "horizontal",
  opts: n,
  setApi: o,
  plugins: i,
  className: c,
  children: s,
  ...e
}) {
  const [a, r] = Nt(
    {
      ...n,
      axis: t === "horizontal" ? "x" : "y"
    },
    i
  ), [u, h] = $.useState(!1), [d, p] = $.useState(!1), y = $.useCallback((l) => {
    l && (h(l.canScrollPrev()), p(l.canScrollNext()));
  }, []), f = $.useCallback(() => {
    r?.scrollPrev();
  }, [r]), m = $.useCallback(() => {
    r?.scrollNext();
  }, [r]), g = $.useCallback(
    (l) => {
      l.key === "ArrowLeft" ? (l.preventDefault(), f()) : l.key === "ArrowRight" && (l.preventDefault(), m());
    },
    [f, m]
  );
  return $.useEffect(() => {
    !r || !o || o(r);
  }, [r, o]), $.useEffect(() => {
    if (r)
      return y(r), r.on("reInit", y), r.on("select", y), () => {
        r?.off("select", y);
      };
  }, [r, y]), /* @__PURE__ */ Y(
    tn.Provider,
    {
      value: {
        carouselRef: a,
        api: r,
        opts: n,
        orientation: t || (n?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev: f,
        scrollNext: m,
        canScrollPrev: u,
        canScrollNext: d
      },
      children: /* @__PURE__ */ Y(
        "div",
        {
          onKeyDownCapture: g,
          className: gt("relative", c),
          role: "region",
          "aria-roledescription": "carousel",
          "data-slot": "carousel",
          ...e,
          children: s
        }
      )
    }
  );
}
function ne({ className: t, ...n }) {
  const { carouselRef: o, orientation: i } = xt();
  return /* @__PURE__ */ Y(
    "div",
    {
      ref: o,
      className: "overflow-hidden",
      "data-slot": "carousel-content",
      children: /* @__PURE__ */ Y(
        "div",
        {
          className: gt(
            "flex",
            i === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            t
          ),
          ...n
        }
      )
    }
  );
}
function ee({ className: t, ...n }) {
  const { orientation: o } = xt();
  return /* @__PURE__ */ Y(
    "div",
    {
      role: "group",
      "aria-roledescription": "slide",
      "data-slot": "carousel-item",
      className: gt(
        "min-w-0 shrink-0 grow-0 basis-full",
        o === "horizontal" ? "pl-4" : "pt-4",
        t
      ),
      ...n
    }
  );
}
function oe({
  className: t,
  variant: n = "outline",
  size: o = "icon",
  ...i
}) {
  const { orientation: c, scrollPrev: s, canScrollPrev: e } = xt();
  return /* @__PURE__ */ Xt(
    Yt,
    {
      "data-slot": "carousel-previous",
      variant: n,
      size: o,
      className: gt(
        "absolute size-8 rounded-full",
        c === "horizontal" ? "top-1/2 -left-12 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        t
      ),
      disabled: !e,
      onClick: s,
      ...i,
      children: [
        /* @__PURE__ */ Y(mn, {}),
        /* @__PURE__ */ Y("span", { className: "sr-only", children: "Previous slide" })
      ]
    }
  );
}
function re({
  className: t,
  variant: n = "outline",
  size: o = "icon",
  ...i
}) {
  const { orientation: c, scrollNext: s, canScrollNext: e } = xt();
  return /* @__PURE__ */ Xt(
    Yt,
    {
      "data-slot": "carousel-next",
      variant: n,
      size: o,
      className: gt(
        "absolute size-8 rounded-full",
        c === "horizontal" ? "top-1/2 -right-12 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        t
      ),
      disabled: !e,
      onClick: s,
      ...i,
      children: [
        /* @__PURE__ */ Y(pn, {}),
        /* @__PURE__ */ Y("span", { className: "sr-only", children: "Next slide" })
      ]
    }
  );
}
export {
  te as Carousel,
  ne as CarouselContent,
  ee as CarouselItem,
  re as CarouselNext,
  oe as CarouselPrevious
};
