import * as P from "react";
import { useLayoutEffect as Yt } from "react";
import * as qt from "react-dom";
const Kt = ["top", "right", "bottom", "left"], Y = Math.min, H = Math.max, rt = Math.round, ot = Math.floor, B = (t) => ({
  x: t,
  y: t
}), Ut = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function kt(t, e, n) {
  return H(t, Y(e, n));
}
function z(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function q(t) {
  return t.split("-")[0];
}
function Z(t) {
  return t.split("-")[1];
}
function yt(t) {
  return t === "x" ? "y" : "x";
}
function vt(t) {
  return t === "y" ? "height" : "width";
}
function W(t) {
  const e = t[0];
  return e === "t" || e === "b" ? "y" : "x";
}
function bt(t) {
  return yt(W(t));
}
function Gt(t, e, n) {
  n === void 0 && (n = !1);
  const o = Z(t), i = bt(t), r = vt(i);
  let s = i === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return e.reference[r] > e.floating[r] && (s = st(s)), [s, st(s)];
}
function Jt(t) {
  const e = st(t);
  return [wt(t), e, wt(e)];
}
function wt(t) {
  return t.includes("start") ? t.replace("start", "end") : t.replace("end", "start");
}
const Ct = ["left", "right"], St = ["right", "left"], Qt = ["top", "bottom"], Zt = ["bottom", "top"];
function te(t, e, n) {
  switch (t) {
    case "top":
    case "bottom":
      return n ? e ? St : Ct : e ? Ct : St;
    case "left":
    case "right":
      return e ? Qt : Zt;
    default:
      return [];
  }
}
function ee(t, e, n, o) {
  const i = Z(t);
  let r = te(q(t), n === "start", o);
  return i && (r = r.map((s) => s + "-" + i), e && (r = r.concat(r.map(wt)))), r;
}
function st(t) {
  const e = q(t);
  return Ut[e] + t.slice(e.length);
}
function ne(t) {
  var e, n, o, i;
  return {
    top: (e = t.top) != null ? e : 0,
    right: (n = t.right) != null ? n : 0,
    bottom: (o = t.bottom) != null ? o : 0,
    left: (i = t.left) != null ? i : 0
  };
}
function Wt(t) {
  return typeof t != "number" ? ne(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function ct(t) {
  const {
    x: e,
    y: n,
    width: o,
    height: i
  } = t;
  return {
    width: o,
    height: i,
    top: n,
    left: e,
    right: e + o,
    bottom: n + i,
    x: e,
    y: n
  };
}
function Et(t, e, n) {
  let {
    reference: o,
    floating: i
  } = t;
  const r = W(e), s = bt(e), c = vt(s), l = q(e), a = r === "y", u = o.x + o.width / 2 - i.width / 2, m = o.y + o.height / 2 - i.height / 2, d = o[c] / 2 - i[c] / 2;
  let f;
  switch (l) {
    case "top":
      f = {
        x: u,
        y: o.y - i.height
      };
      break;
    case "bottom":
      f = {
        x: u,
        y: o.y + o.height
      };
      break;
    case "right":
      f = {
        x: o.x + o.width,
        y: m
      };
      break;
    case "left":
      f = {
        x: o.x - i.width,
        y: m
      };
      break;
    default:
      f = {
        x: o.x,
        y: o.y
      };
  }
  const g = Z(e);
  return g && (f[s] += d * (g === "end" ? 1 : -1) * (n && a ? -1 : 1)), f;
}
async function oe(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: o,
    y: i,
    platform: r,
    rects: s,
    elements: c,
    strategy: l
  } = t, {
    boundary: a = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: m = "floating",
    altBoundary: d = !1,
    padding: f = 0
  } = z(e, t), g = Wt(f), w = c[d ? m === "floating" ? "reference" : "floating" : m], p = ct(await r.getClippingRect({
    element: (n = await (r.isElement == null ? void 0 : r.isElement(w))) == null || n ? w : w.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(c.floating)),
    boundary: a,
    rootBoundary: u,
    strategy: l
  })), x = m === "floating" ? {
    x: o,
    y: i,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, b = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(c.floating)), v = await (r.isElement == null ? void 0 : r.isElement(b)) && await (r.getScale == null ? void 0 : r.getScale(b)) || {
    x: 1,
    y: 1
  }, R = ct(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: c,
    rect: x,
    offsetParent: b,
    strategy: l
  }) : x);
  return {
    top: (p.top - R.top + g.top) / v.y,
    bottom: (R.bottom - p.bottom + g.bottom) / v.y,
    left: (p.left - R.left + g.left) / v.x,
    right: (R.right - p.right + g.right) / v.x
  };
}
const ie = 50, re = async (t, e, n) => {
  const {
    placement: o = "bottom",
    strategy: i = "absolute",
    middleware: r = [],
    platform: s
  } = n, c = s.detectOverflow ? s : {
    ...s,
    detectOverflow: oe
  }, l = await (s.isRTL == null ? void 0 : s.isRTL(e));
  let a = await s.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: u,
    y: m
  } = Et(a, o, l), d = o, f = 0;
  const g = {};
  for (let h = 0; h < r.length; h++) {
    const w = r[h];
    if (!w)
      continue;
    const {
      name: p,
      fn: x
    } = w, {
      x: b,
      y: v,
      data: R,
      reset: y
    } = await x({
      x: u,
      y: m,
      initialPlacement: o,
      placement: d,
      strategy: i,
      middlewareData: g,
      rects: a,
      platform: c,
      elements: {
        reference: t,
        floating: e
      }
    });
    u = b ?? u, m = v ?? m, g[p] = {
      ...g[p],
      ...R
    }, y && f < ie && (f++, typeof y == "object" && (y.placement && (d = y.placement), y.rects && (a = y.rects === !0 ? await s.getElementRects({
      reference: t,
      floating: e,
      strategy: i
    }) : y.rects), {
      x: u,
      y: m
    } = Et(a, d, l)), h = -1);
  }
  return {
    x: u,
    y: m,
    placement: d,
    strategy: i,
    middlewareData: g
  };
}, se = (t) => ({
  name: "arrow",
  options: t,
  async fn(e) {
    const {
      x: n,
      y: o,
      placement: i,
      rects: r,
      platform: s,
      elements: c,
      middlewareData: l
    } = e, {
      element: a,
      padding: u = 0
    } = z(t, e) || {};
    if (a == null)
      return {};
    const m = Wt(u), d = {
      x: n,
      y: o
    }, f = bt(i), g = vt(f), h = await s.getDimensions(a), w = f === "y", p = w ? "top" : "left", x = w ? "bottom" : "right", b = w ? "clientHeight" : "clientWidth", v = r.reference[g] + r.reference[f] - d[f] - r.floating[g], R = d[f] - r.reference[f], y = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a));
    let A = y ? y[b] : 0;
    (!A || !await (s.isElement == null ? void 0 : s.isElement(y))) && (A = c.floating[b] || r.floating[g]);
    const S = v / 2 - R / 2, F = A / 2 - h[g] / 2 - 1, C = Y(m[p], F), V = Y(m[x], F), I = A - h[g] - V, L = A / 2 - h[g] / 2 + S, T = kt(C, L, I), $ = !l.arrow && Z(i) != null && L !== T && r.reference[g] / 2 - (L < C ? C : V) - h[g] / 2 < 0, E = $ ? L < C ? L - C : L - I : 0;
    return {
      [f]: d[f] + E,
      data: {
        [f]: T,
        centerOffset: L - T - E,
        ...$ && {
          alignmentOffset: E
        }
      },
      reset: $
    };
  }
}), ce = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, o;
      const {
        placement: i,
        middlewareData: r,
        rects: s,
        initialPlacement: c,
        platform: l,
        elements: a
      } = e, {
        mainAxis: u = !0,
        crossAxis: m = !0,
        fallbackPlacements: d,
        fallbackStrategy: f = "bestFit",
        fallbackAxisSideDirection: g = "none",
        flipAlignment: h = !0,
        ...w
      } = z(t, e);
      if ((n = r.arrow) != null && n.alignmentOffset)
        return {};
      const p = q(i), x = W(c), b = q(c) === c, v = await (l.isRTL == null ? void 0 : l.isRTL(a.floating)), R = d || (b || !h ? [st(c)] : Jt(c)), y = g !== "none";
      !d && y && R.push(...ee(c, h, g, v));
      const A = [c, ...R], S = await l.detectOverflow(e, w), F = [];
      let C = ((o = r.flip) == null ? void 0 : o.overflows) || [];
      if (u && F.push(S[p]), m) {
        const T = Gt(i, s, v);
        F.push(S[T[0]], S[T[1]]);
      }
      if (C = [...C, {
        placement: i,
        overflows: F
      }], !F.every((T) => T <= 0)) {
        var V, I;
        const T = (((V = r.flip) == null ? void 0 : V.index) || 0) + 1, $ = A[T];
        if ($ && (!(m === "alignment" ? x !== W($) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        C.every((O) => W(O.placement) === x ? O.overflows[0] > 0 : !0)))
          return {
            data: {
              index: T,
              overflows: C
            },
            reset: {
              placement: $
            }
          };
        let E = (I = C.filter((k) => k.overflows[0] <= 0).sort((k, O) => k.overflows[1] - O.overflows[1])[0]) == null ? void 0 : I.placement;
        if (!E)
          switch (f) {
            case "bestFit": {
              var L;
              const k = (L = C.filter((O) => {
                if (y) {
                  const M = W(O.placement);
                  return M === x || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  M === "y";
                }
                return !0;
              }).map((O) => [O.placement, O.overflows.filter((M) => M > 0).reduce((M, X) => M + X, 0)]).sort((O, M) => O[1] - M[1])[0]) == null ? void 0 : L[0];
              k && (E = k);
              break;
            }
            case "initialPlacement":
              E = c;
              break;
          }
        if (i !== E)
          return {
            reset: {
              placement: E
            }
          };
      }
      return {};
    }
  };
};
function Lt(t, e) {
  return {
    top: t.top - e.height,
    right: t.right - e.width,
    bottom: t.bottom - e.height,
    left: t.left - e.width
  };
}
function Pt(t) {
  return Kt.some((e) => t[e] >= 0);
}
const le = function(t) {
  return t === void 0 && (t = {}), {
    name: "hide",
    options: t,
    async fn(e) {
      const {
        rects: n,
        platform: o
      } = e, {
        strategy: i = "referenceHidden",
        ...r
      } = z(t, e);
      switch (i) {
        case "referenceHidden": {
          const s = await o.detectOverflow(e, {
            ...r,
            elementContext: "reference"
          }), c = Lt(s, n.reference);
          return {
            data: {
              referenceHiddenOffsets: c,
              referenceHidden: Pt(c)
            }
          };
        }
        case "escaped": {
          const s = await o.detectOverflow(e, {
            ...r,
            altBoundary: !0
          }), c = Lt(s, n.floating);
          return {
            data: {
              escapedOffsets: c,
              escaped: Pt(c)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, _t = /* @__PURE__ */ new Set(["left", "top"]);
async function fe(t, e) {
  const {
    placement: n,
    platform: o,
    elements: i
  } = t, r = await (o.isRTL == null ? void 0 : o.isRTL(i.floating)), s = q(n), c = Z(n), l = W(n) === "y", a = _t.has(s) ? -1 : 1, u = r && l ? -1 : 1, m = z(e, t);
  let {
    mainAxis: d,
    crossAxis: f,
    alignmentAxis: g
  } = typeof m == "number" ? {
    mainAxis: m,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: m.mainAxis || 0,
    crossAxis: m.crossAxis || 0,
    alignmentAxis: m.alignmentAxis
  };
  return c && typeof g == "number" && (f = c === "end" ? g * -1 : g), l ? {
    x: f * u,
    y: d * a
  } : {
    x: d * a,
    y: f * u
  };
}
const ae = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      var n, o;
      const {
        x: i,
        y: r,
        placement: s,
        middlewareData: c
      } = e, l = await fe(e, t);
      return s === ((n = c.offset) == null ? void 0 : n.placement) && (o = c.arrow) != null && o.alignmentOffset ? {} : {
        x: i + l.x,
        y: r + l.y,
        data: {
          ...l,
          placement: s
        }
      };
    }
  };
}, ue = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: o,
        placement: i,
        platform: r
      } = e, {
        mainAxis: s = !0,
        crossAxis: c = !1,
        limiter: l = {
          fn: (x) => {
            let {
              x: b,
              y: v
            } = x;
            return {
              x: b,
              y: v
            };
          }
        },
        ...a
      } = z(t, e), u = {
        x: n,
        y: o
      }, m = await r.detectOverflow(e, a), d = W(i), f = yt(d);
      let g = u[f], h = u[d];
      const w = (x, b) => kt(b + m[x === "y" ? "top" : "left"], b, b - m[x === "y" ? "bottom" : "right"]);
      s && (g = w(f, g)), c && (h = w(d, h));
      const p = l.fn({
        ...e,
        [f]: g,
        [d]: h
      });
      return {
        ...p,
        data: {
          x: p.x - n,
          y: p.y - o,
          enabled: {
            [f]: s,
            [d]: c
          }
        }
      };
    }
  };
}, de = function(t) {
  return t === void 0 && (t = {}), {
    options: t,
    fn(e) {
      var n, o;
      const {
        x: i,
        y: r,
        placement: s,
        rects: c,
        middlewareData: l
      } = e, {
        offset: a = 0,
        mainAxis: u = !0,
        crossAxis: m = !0
      } = z(t, e), d = {
        x: i,
        y: r
      }, f = W(s), g = yt(f);
      let h = d[g], w = d[f];
      const p = z(a, e), x = typeof p == "number" ? {
        mainAxis: p,
        crossAxis: 0
      } : {
        mainAxis: (n = p.mainAxis) != null ? n : 0,
        crossAxis: (o = p.crossAxis) != null ? o : 0
      };
      if (u) {
        const R = g === "y" ? "height" : "width", y = c.reference[g] - c.floating[R] + x.mainAxis, A = c.reference[g] + c.reference[R] - x.mainAxis;
        h < y ? h = y : h > A && (h = A);
      }
      if (m) {
        var b, v;
        const R = g === "y" ? "width" : "height", y = _t.has(q(s)), A = c.reference[f] - c.floating[R] + (y && ((b = l.offset) == null ? void 0 : b[f]) || 0) + (y ? 0 : x.crossAxis), S = c.reference[f] + c.reference[R] + (y ? 0 : ((v = l.offset) == null ? void 0 : v[f]) || 0) - (y ? x.crossAxis : 0);
        w < A ? w = A : w > S && (w = S);
      }
      return {
        [g]: h,
        [f]: w
      };
    }
  };
}, me = function(t) {
  return t === void 0 && (t = {}), {
    name: "size",
    options: t,
    async fn(e) {
      const {
        placement: n,
        rects: o,
        platform: i,
        elements: r
      } = e, {
        apply: s = () => {
        },
        ...c
      } = z(t, e), l = await i.detectOverflow(e, c), a = q(n), u = Z(n), m = W(n) === "y", {
        width: d,
        height: f
      } = o.floating;
      let g, h;
      a === "top" || a === "bottom" ? (g = a, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(r.floating)) ? "start" : "end") ? "left" : "right") : (h = a, g = u === "end" ? "top" : "bottom");
      const w = f - l.top - l.bottom, p = d - l.left - l.right, x = Y(f - l[g], w), b = Y(d - l[h], p), v = e.middlewareData.shift, R = !v;
      let y = x, A = b;
      v != null && v.enabled.x && (A = p), v != null && v.enabled.y && (y = w), R && !u && (m ? A = d - 2 * H(l.left, l.right) : y = f - 2 * H(l.top, l.bottom)), await s({
        ...e,
        availableWidth: A,
        availableHeight: y
      });
      const S = await i.getDimensions(r.floating);
      return d !== S.width || f !== S.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function ft() {
  return typeof window < "u";
}
function tt(t) {
  return Nt(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function D(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function j(t) {
  var e;
  return (e = (Nt(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function Nt(t) {
  return ft() ? t instanceof Node || t instanceof D(t).Node : !1;
}
function _(t) {
  return ft() ? t instanceof Element || t instanceof D(t).Element : !1;
}
function K(t) {
  return ft() ? t instanceof HTMLElement || t instanceof D(t).HTMLElement : !1;
}
function Tt(t) {
  return !ft() || typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof D(t).ShadowRoot;
}
function at(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: o,
    display: i
  } = N(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + o + n) && i !== "inline" && i !== "contents";
}
function ge(t) {
  return /^(table|td|th)$/.test(tt(t));
}
function ut(t) {
  try {
    if (t.matches(":popover-open"))
      return !0;
  } catch {
  }
  try {
    return t.matches(":modal");
  } catch {
    return !1;
  }
}
const he = /transform|translate|scale|rotate|perspective|filter/, pe = /paint|layout|strict|content/, U = (t) => !!t && t !== "none";
let gt;
function Rt(t) {
  const e = _(t) ? N(t) : t;
  return U(e.transform) || U(e.translate) || U(e.scale) || U(e.rotate) || U(e.perspective) || !At() && (U(e.backdropFilter) || U(e.filter)) || he.test(e.willChange || "") || pe.test(e.contain || "");
}
function we(t) {
  let e = G(t);
  for (; K(e) && !et(e); ) {
    if (Rt(e))
      return e;
    if (ut(e))
      return null;
    e = G(e);
  }
  return null;
}
function At() {
  return gt == null && (gt = typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none")), gt;
}
function et(t) {
  return /^(html|body|#document)$/.test(tt(t));
}
function N(t) {
  return D(t).getComputedStyle(t);
}
function dt(t) {
  return _(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.scrollX,
    scrollTop: t.scrollY
  };
}
function G(t) {
  if (tt(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    Tt(t) && t.host || // Fallback.
    j(t)
  );
  return Tt(e) ? e.host : e;
}
function Vt(t) {
  const e = G(t);
  return et(e) ? (t.ownerDocument || t).body : K(e) && at(e) ? e : Vt(e);
}
function nt(t, e, n) {
  var o;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = Vt(t), r = i === ((o = t.ownerDocument) == null ? void 0 : o.body), s = D(i);
  if (r) {
    const c = xt(s);
    return e.concat(s, s.visualViewport || [], at(i) ? i : [], c && n ? nt(c) : []);
  } else
    return e.concat(i, nt(i, [], n));
}
function xt(t) {
  return t.parent && Object.getPrototypeOf(t.parent) ? t.frameElement : null;
}
function Ht(t) {
  const e = N(t);
  let n = parseFloat(e.width) || 0, o = parseFloat(e.height) || 0;
  const i = K(t), r = i ? t.offsetWidth : n, s = i ? t.offsetHeight : o, c = rt(n) !== r || rt(o) !== s;
  return c && (n = r, o = s), {
    width: n,
    height: o,
    $: c
  };
}
function Ot(t) {
  return _(t) ? t : t.contextElement;
}
function Q(t) {
  const e = Ot(t);
  if (!K(e))
    return B(1);
  const n = e.getBoundingClientRect(), {
    width: o,
    height: i,
    $: r
  } = Ht(e);
  let s = (r ? rt(n.width) : n.width) / o, c = (r ? rt(n.height) : n.height) / i;
  return (!s || !Number.isFinite(s)) && (s = 1), (!c || !Number.isFinite(c)) && (c = 1), {
    x: s,
    y: c
  };
}
const xe = /* @__PURE__ */ B(0);
function Bt(t) {
  const e = D(t);
  return !At() || !e.visualViewport ? xe : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function ye(t, e, n) {
  return e === void 0 && (e = !1), !!n && e && n === D(t);
}
function J(t, e, n, o) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), r = Ot(t);
  let s = B(1);
  e && (o ? _(o) && (s = Q(o)) : s = Q(t));
  const c = ye(r, n, o) ? Bt(r) : B(0);
  let l = (i.left + c.x) / s.x, a = (i.top + c.y) / s.y, u = i.width / s.x, m = i.height / s.y;
  if (r && o) {
    const d = D(r), f = _(o) ? D(o) : o;
    let g = d, h = xt(g);
    for (; h && f !== g; ) {
      const w = Q(h), p = h.getBoundingClientRect(), x = N(h), b = p.left + (h.clientLeft + parseFloat(x.paddingLeft)) * w.x, v = p.top + (h.clientTop + parseFloat(x.paddingTop)) * w.y;
      l *= w.x, a *= w.y, u *= w.x, m *= w.y, l += b, a += v, g = D(h), h = xt(g);
    }
  }
  return ct({
    width: u,
    height: m,
    x: l,
    y: a
  });
}
function mt(t, e) {
  const n = dt(t).scrollLeft;
  return e ? e.left + n : J(j(t)).left + n;
}
function zt(t, e) {
  const n = t.getBoundingClientRect(), o = n.left + e.scrollLeft - mt(t, n), i = n.top + e.scrollTop;
  return {
    x: o,
    y: i
  };
}
function ve(t) {
  let {
    elements: e,
    rect: n,
    offsetParent: o,
    strategy: i
  } = t;
  const r = i === "fixed", s = j(o), c = e ? ut(e.floating) : !1;
  if (o === s || c && r)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = B(1);
  const u = B(0), m = K(o);
  if ((m || !r) && ((tt(o) !== "body" || at(s)) && (l = dt(o)), m)) {
    const f = J(o);
    a = Q(o), u.x = f.x + o.clientLeft, u.y = f.y + o.clientTop;
  }
  const d = s && !m && !r ? zt(s, l) : B(0);
  return {
    width: n.width * a.x,
    height: n.height * a.y,
    x: n.x * a.x - l.scrollLeft * a.x + u.x + d.x,
    y: n.y * a.y - l.scrollTop * a.y + u.y + d.y
  };
}
function be(t) {
  return t.getClientRects ? Array.from(t.getClientRects()) : [];
}
function Re(t) {
  const e = dt(t), n = t.ownerDocument.body, o = H(t.scrollWidth, t.clientWidth, n.scrollWidth, n.clientWidth), i = H(t.scrollHeight, t.clientHeight, n.scrollHeight, n.clientHeight);
  let r = -e.scrollLeft + mt(t);
  const s = -e.scrollTop;
  return N(n).direction === "rtl" && (r += H(t.clientWidth, n.clientWidth) - o), {
    width: o,
    height: i,
    x: r,
    y: s
  };
}
const Ae = 25;
function Oe(t, e, n) {
  n === void 0 && (n = "viewport");
  const o = n === "layoutViewport", i = D(t), r = j(t), s = i.visualViewport;
  let c = r.clientWidth, l = r.clientHeight, a = 0, u = 0;
  if (s) {
    const d = !At() || e === "fixed";
    o ? d || (a = -s.offsetLeft, u = -s.offsetTop) : (c = s.width, l = s.height, d && (a = s.offsetLeft, u = s.offsetTop));
  }
  if (mt(r) <= 0) {
    const d = r.ownerDocument, f = d.body, g = getComputedStyle(f), h = d.compatMode === "CSS1Compat" && parseFloat(g.marginLeft) + parseFloat(g.marginRight) || 0, w = Math.abs(r.clientWidth - f.clientWidth - h), p = getComputedStyle(r).scrollbarGutter === "stable both-edges" ? w / 2 : w;
    p <= Ae && (c -= p);
  }
  return {
    width: c,
    height: l,
    x: a,
    y: u
  };
}
function Ce(t, e) {
  const n = J(t, !0, e === "fixed"), o = n.top + t.clientTop, i = n.left + t.clientLeft, r = Q(t), s = t.clientWidth * r.x, c = t.clientHeight * r.y, l = i * r.x, a = o * r.y;
  return {
    width: s,
    height: c,
    x: l,
    y: a
  };
}
function Dt(t, e, n) {
  let o;
  if (e === "viewport" || e === "layoutViewport")
    o = Oe(t, n, e);
  else if (e === "document")
    o = Re(j(t));
  else if (_(e))
    o = Ce(e, n);
  else {
    const i = Bt(t);
    o = {
      x: e.x - i.x,
      y: e.y - i.y,
      width: e.width,
      height: e.height
    };
  }
  return ct(o);
}
function Se(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let o = nt(t, [], !1).filter((c) => _(c) && tt(c) !== "body"), i = null;
  const r = N(t).position === "fixed";
  let s = r ? G(t) : t;
  for (; _(s) && !et(s); ) {
    const c = N(s), l = Rt(s), a = i ? i.position : r ? "fixed" : "";
    !l && (a === "fixed" || a === "absolute" && c.position === "static") ? o = o.filter((m) => m !== s) : i = c, s = G(s);
  }
  return e.set(t, o), o;
}
function Ee(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: o,
    strategy: i
  } = t;
  const s = [...n === "clippingAncestors" ? ut(e) ? [] : Se(e, this._c) : [].concat(n), o], c = Dt(e, s[0], i);
  let l = c.top, a = c.right, u = c.bottom, m = c.left;
  for (let d = 1; d < s.length; d++) {
    const f = Dt(e, s[d], i);
    l = H(f.top, l), a = Y(f.right, a), u = Y(f.bottom, u), m = H(f.left, m);
  }
  return {
    width: a - m,
    height: u - l,
    x: m,
    y: l
  };
}
function Le(t) {
  const {
    width: e,
    height: n
  } = Ht(t);
  return {
    width: e,
    height: n
  };
}
function Pe(t, e, n) {
  const o = K(e), i = j(e), r = n === "fixed", s = J(t, !0, r, e);
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = B(0);
  if ((o || !r) && ((tt(e) !== "body" || at(i)) && (c = dt(e)), o)) {
    const d = J(e, !0, r, e);
    l.x = d.x + e.clientLeft, l.y = d.y + e.clientTop;
  }
  !o && i && (l.x = mt(i));
  const a = i && !o && !r ? zt(i, c) : B(0), u = s.left + c.scrollLeft - l.x - a.x, m = s.top + c.scrollTop - l.y - a.y;
  return {
    x: u,
    y: m,
    width: s.width,
    height: s.height
  };
}
function ht(t) {
  return N(t).position === "static";
}
function Mt(t, e) {
  if (!K(t) || N(t).position === "fixed")
    return null;
  if (e)
    return e(t);
  let n = t.offsetParent;
  return j(t) === n && (n = n.ownerDocument.body), n;
}
function jt(t, e) {
  const n = D(t);
  if (ut(t))
    return n;
  if (!K(t)) {
    let i = G(t);
    for (; i && !et(i); ) {
      if (_(i) && !ht(i))
        return i;
      i = G(i);
    }
    return n;
  }
  let o = Mt(t, e);
  for (; o && ge(o) && ht(o); )
    o = Mt(o, e);
  return o && et(o) && ht(o) && !Rt(o) ? n : o || we(t) || n;
}
const Te = async function(t) {
  const e = this.getOffsetParent || jt, n = this.getDimensions, o = await n(t.floating);
  return {
    reference: Pe(t.reference, await e(t.floating), t.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function De(t) {
  return N(t).direction === "rtl";
}
const Me = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ve,
  getDocumentElement: j,
  getClippingRect: Ee,
  getOffsetParent: jt,
  getElementRects: Te,
  getClientRects: be,
  getDimensions: Le,
  getScale: Q,
  isElement: _,
  isRTL: De
};
function It(t, e) {
  return t.x === e.x && t.y === e.y && t.width === e.width && t.height === e.height;
}
function Fe(t, e, n) {
  let o = null, i;
  const r = j(t);
  function s() {
    var u;
    clearTimeout(i), (u = o) == null || u.disconnect(), o = null;
  }
  function c(u, m) {
    u === void 0 && (u = !1), m === void 0 && (m = 1), s();
    const d = t.getBoundingClientRect(), {
      left: f,
      top: g,
      width: h,
      height: w
    } = d;
    if (u || e(), !h || !w)
      return;
    const p = ot(g), x = ot(r.clientWidth - (f + h)), b = ot(r.clientHeight - (g + w)), v = ot(f), y = {
      rootMargin: -p + "px " + -x + "px " + -b + "px " + -v + "px",
      threshold: H(0, Y(1, m)) || 1
    };
    let A = !0;
    function S(F) {
      const C = F[0].intersectionRatio;
      if (!It(d, t.getBoundingClientRect()))
        return c();
      if (C !== m) {
        if (!A)
          return c();
        C ? c(!1, C) : i = setTimeout(() => {
          c(!1, 1e-7);
        }, 1e3);
      }
      A = !1;
    }
    try {
      o = new IntersectionObserver(S, {
        ...y,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      o = new IntersectionObserver(S, y);
    }
    o.observe(t);
  }
  const l = D(t), a = () => c(n);
  return l.addEventListener("resize", a), c(!0), () => {
    l.removeEventListener("resize", a), s();
  };
}
function Xe(t, e, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: r = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: c = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = o, a = Ot(t), u = i || r ? [...a ? nt(a) : [], ...e ? nt(e) : []] : [];
  u.forEach((p) => {
    i && p.addEventListener("scroll", n), r && p.addEventListener("resize", n);
  });
  const m = a && c ? Fe(a, n, r) : null;
  let d = -1, f = null;
  s && (f = new ResizeObserver((p) => {
    let [x] = p;
    x && x.target === a && f && e && (f.unobserve(e), cancelAnimationFrame(d), d = requestAnimationFrame(() => {
      var b;
      (b = f) == null || b.observe(e);
    })), n();
  }), a && !l && f.observe(a), e && f.observe(e));
  let g, h = l ? J(t) : null;
  l && w();
  function w() {
    const p = J(t);
    h && !It(h, p) && n(), h = p, g = requestAnimationFrame(w);
  }
  return n(), () => {
    var p;
    u.forEach((x) => {
      i && x.removeEventListener("scroll", n), r && x.removeEventListener("resize", n);
    }), m?.(), (p = f) == null || p.disconnect(), f = null, l && cancelAnimationFrame(g);
  };
}
const $e = ae, ke = ue, We = ce, _e = me, Ne = le, Ft = se, Ve = de, He = (t, e, n) => {
  const o = /* @__PURE__ */ new Map(), i = n ?? {}, r = {
    ...Me,
    ...i.platform,
    _c: o
  };
  return re(t, e, {
    ...i,
    platform: r
  });
};
var Be = typeof document < "u", ze = function() {
}, it = Be ? Yt : ze;
function lt(t, e) {
  if (t === e)
    return !0;
  if (typeof t != typeof e)
    return !1;
  if (typeof t == "function" && t.toString() === e.toString())
    return !0;
  let n, o, i;
  if (t && e && typeof t == "object") {
    if (Array.isArray(t)) {
      if (n = t.length, n !== e.length) return !1;
      for (o = n; o-- !== 0; )
        if (!lt(t[o], e[o]))
          return !1;
      return !0;
    }
    if (i = Object.keys(t), n = i.length, n !== Object.keys(e).length)
      return !1;
    for (o = n; o-- !== 0; )
      if (!{}.hasOwnProperty.call(e, i[o]))
        return !1;
    for (o = n; o-- !== 0; ) {
      const r = i[o];
      if (!(r === "_owner" && t.$$typeof) && !lt(t[r], e[r]))
        return !1;
    }
    return !0;
  }
  return t !== t && e !== e;
}
function Xt(t) {
  return typeof window > "u" ? 1 : (t.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function $t(t, e) {
  const n = Xt(t);
  return Math.round(e * n) / n;
}
function pt(t) {
  const e = P.useRef(t);
  return it(() => {
    e.current = t;
  }), e;
}
function Ye(t) {
  t === void 0 && (t = {});
  const {
    placement: e = "bottom",
    strategy: n = "absolute",
    middleware: o = [],
    platform: i,
    elements: {
      reference: r,
      floating: s
    } = {},
    transform: c = !0,
    whileElementsMounted: l,
    open: a
  } = t, [u, m] = P.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: e,
    middlewareData: {},
    isPositioned: !1
  }), [d, f] = P.useState(o);
  lt(d, o) || f(o);
  const [g, h] = P.useState(null), [w, p] = P.useState(null), x = P.useCallback((O) => {
    O !== y.current && (y.current = O, h(O));
  }, []), b = P.useCallback((O) => {
    O !== A.current && (A.current = O, p(O));
  }, []), v = r || g, R = s || w, y = P.useRef(null), A = P.useRef(null), S = P.useRef(u), F = l != null, C = pt(l), V = pt(i), I = pt(a), L = P.useCallback(() => {
    if (!y.current || !A.current)
      return;
    const O = {
      placement: e,
      strategy: n,
      middleware: d
    };
    V.current && (O.platform = V.current), He(y.current, A.current, O).then((M) => {
      const X = {
        ...M,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: I.current !== !1
      };
      T.current && !lt(S.current, X) && (S.current = X, qt.flushSync(() => {
        m(X);
      }));
    });
  }, [d, e, n, V, I]);
  it(() => {
    a === !1 && S.current.isPositioned && (S.current.isPositioned = !1, m((O) => ({
      ...O,
      isPositioned: !1
    })));
  }, [a]);
  const T = P.useRef(!1);
  it(() => (T.current = !0, () => {
    T.current = !1;
  }), []), it(() => {
    if (v && (y.current = v), R && (A.current = R), v && R) {
      if (C.current)
        return C.current(v, R, L);
      L();
    }
  }, [v, R, L, C, F]);
  const $ = P.useMemo(() => ({
    reference: y,
    floating: A,
    setReference: x,
    setFloating: b
  }), [x, b]), E = P.useMemo(() => ({
    reference: v,
    floating: R
  }), [v, R]), k = P.useMemo(() => {
    const O = {
      position: n,
      left: 0,
      top: 0
    };
    if (!E.floating)
      return O;
    const M = $t(E.floating, u.x), X = $t(E.floating, u.y);
    return c ? {
      ...O,
      transform: "translate(" + M + "px, " + X + "px)",
      ...Xt(E.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: M,
      top: X
    };
  }, [n, c, E.floating, u.x, u.y]);
  return P.useMemo(() => ({
    ...u,
    update: L,
    refs: $,
    elements: E,
    floatingStyles: k
  }), [u, L, $, E, k]);
}
const je = (t) => {
  function e(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return {
    name: "arrow",
    options: t,
    fn(n) {
      const {
        element: o,
        padding: i
      } = typeof t == "function" ? t(n) : t;
      return o && e(o) ? o.current != null ? Ft({
        element: o.current,
        padding: i
      }).fn(n) : {} : o ? Ft({
        element: o,
        padding: i
      }).fn(n) : {};
    }
  };
}, qe = (t, e) => {
  const n = $e(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, Ke = (t, e) => {
  const n = ke(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, Ue = (t, e) => ({
  fn: Ve(t).fn,
  options: [t, e]
}), Ge = (t, e) => {
  const n = We(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, Je = (t, e) => {
  const n = _e(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, Qe = (t, e) => {
  const n = Ne(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
}, Ze = (t, e) => {
  const n = je(t);
  return {
    name: n.name,
    fn: n.fn,
    options: [t, e]
  };
};
export {
  Ue as A,
  Ze as B,
  at as a,
  Tt as b,
  N as c,
  tt as d,
  Nt as e,
  ot as f,
  D as g,
  _ as h,
  K as i,
  et as j,
  G as k,
  z as l,
  Wt as m,
  bt as n,
  Z as o,
  vt as p,
  kt as q,
  Qe as r,
  Ge as s,
  Je as t,
  Ye as u,
  q as v,
  W as w,
  Xe as x,
  qe as y,
  Ke as z
};
