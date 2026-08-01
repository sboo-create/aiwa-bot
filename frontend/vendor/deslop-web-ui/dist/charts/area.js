import { jsx as I, jsxs as we } from "react/jsx-runtime";
import * as d from "react";
import { forwardRef as V, useMemo as Ke, createContext as _e, useContext as ct, isValidElement as Ee, cloneElement as st, createElement as mn, useRef as H, useLayoutEffect as Z, memo as Rt, useEffect as je, useState as ee, useImperativeHandle as yn, useCallback as D, PureComponent as gn, useId as bn } from "react";
import { Button as er } from "../components/ui/button.js";
import { Card as xn, CardHeader as Pn, CardTitle as wn, CardDescription as On, CardAction as An, CardContent as En, CardFooter as kn } from "../components/ui/card.js";
import { s as Fe, G as Bt, i as Ot, r as he, a as At, b as Se, c as T, d as U, e as Wt, f as tr, g as rr, u as Sn, D as pe, Z as me, h as L, j as Xr, k as Gt, p as Qe, m as Vr, l as Et, n as Yr, o as ye, q as re, t as _, v as X, w as q, x as Cn, y as jn, z as In, A as Tn, B as Dn, C as Nn, E as K, F as Oe, H as Ln, I as ce, J as Zr, K as $n, L as _n, M as zn, N as kt, O as Kt, P as ar, Q as Ur, R as Mn, S as qr, T as Jr, U as Qr, V as Rn, W as nr, X as et, Y as ir, _ as ea, $ as ta, a0 as Bn, a1 as Wn, a2 as z, a3 as M, a4 as ut, a5 as Gn, a6 as Kn, a7 as ra, a8 as aa, a9 as Fn, aa as na, ab as or, ac as Hn, ad as Xn, ae as dt, af as Vn, ag as ia, ah as Yn, ai as Zn, aj as lr, ak as Un, al as Ft, am as qn, an as Te, ao as mt, ap as oa, aq as la, ar as Jn, as as Qn, at as ei, au as ca, av as ti, aw as ri, ax as ai, ay as ni, az as ii, aA as sa, aB as oi, aC as li, aD as Ie, aE as He, aF as ci, aG as ua, aH as da, aI as va, aJ as St, aK as tt, aL as si, aM as ui, aN as di, aO as vi, aP as fi, aQ as hi, aR as pi, aS as mi, aT as yi, aU as gi, aV as bi, aW as xi, aX as Pi, aY as wi, aZ as Oi, a_ as Ai, a$ as Ei, b0 as ki, b1 as Si, b2 as Ci, b3 as ji, b4 as Ii, b5 as Ti, b6 as Di, b7 as Ni, b8 as Li, b9 as $i, ba as _i, bb as zi, bc as Mi, bd as Ri, be as fa, bf as Bi, bg as Wi, bh as Gi, bi as Ki, bj as Fi, bk as Hi, bl as Xi, bm as Xe, bn as Vi, bo as Yi, bp as Zi, bq as Ui, br as qi, bs as Ji } from "../chart-DeSlgJxZ.js";
import { b as Qi, a as eo } from "../icons-DUsO7wRs.js";
import { a as F } from "../utils-TrrhThB-.js";
var to = ["children", "className"];
function Ct() {
  return Ct = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var a in r) ({}).hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
  }, Ct.apply(null, arguments);
}
function ro(e, t) {
  if (e == null) return {};
  var r, a, n = ao(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++) r = i[a], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function ao(e, t) {
  if (e == null) return {};
  var r = {};
  for (var a in e) if ({}.hasOwnProperty.call(e, a)) {
    if (t.indexOf(a) !== -1) continue;
    r[a] = e[a];
  }
  return r;
}
var te = /* @__PURE__ */ d.forwardRef((e, t) => {
  var {
    children: r,
    className: a
  } = e, n = ro(e, to), i = F("recharts-layer", a);
  return /* @__PURE__ */ d.createElement("g", Ct({
    className: i
  }, Fe(n), {
    ref: t
  }), r);
});
function no(e, t, r) {
  return (t = io(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function io(e) {
  var t = oo(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function oo(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var a = r.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
class lo {
  constructor(t) {
    no(this, "cache", /* @__PURE__ */ new Map()), this.maxSize = t;
  }
  get(t) {
    var r = this.cache.get(t);
    return r !== void 0 && (this.cache.delete(t), this.cache.set(t, r)), r;
  }
  set(t, r) {
    if (this.cache.has(t))
      this.cache.delete(t);
    else if (this.cache.size >= this.maxSize) {
      var a = this.cache.keys().next().value;
      a != null && this.cache.delete(a);
    }
    this.cache.set(t, r);
  }
  clear() {
    this.cache.clear();
  }
  size() {
    return this.cache.size;
  }
}
function cr(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(n) {
      return Object.getOwnPropertyDescriptor(e, n).enumerable;
    })), r.push.apply(r, a);
  }
  return r;
}
function co(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? cr(Object(r), !0).forEach(function(a) {
      so(e, a, r[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : cr(Object(r)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(r, a));
    });
  }
  return e;
}
function so(e, t, r) {
  return (t = uo(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function uo(e) {
  var t = vo(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function vo(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var a = r.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var fo = {
  cacheSize: 2e3,
  enableCache: !0
}, ha = co({}, fo), sr = new lo(ha.cacheSize), ho = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
}, ur = "recharts_measurement_span";
function po(e, t) {
  var r = t.fontSize || "", a = t.fontFamily || "", n = t.fontWeight || "", i = t.fontStyle || "", l = t.letterSpacing || "", o = t.textTransform || "";
  return "".concat(e, "|").concat(r, "|").concat(a, "|").concat(n, "|").concat(i, "|").concat(l, "|").concat(o);
}
var dr = (e, t) => {
  try {
    var r = document.getElementById(ur);
    r || (r = document.createElement("span"), r.setAttribute("id", ur), r.setAttribute("aria-hidden", "true"), document.body.appendChild(r)), Object.assign(r.style, ho, t), r.textContent = "".concat(e);
    var a = r.getBoundingClientRect();
    return {
      width: a.width,
      height: a.height
    };
  } catch {
    return {
      width: 0,
      height: 0
    };
  }
}, We = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (t == null || Bt.isSsr)
    return {
      width: 0,
      height: 0
    };
  if (!ha.enableCache)
    return dr(t, r);
  var a = po(t, r), n = sr.get(a);
  if (n)
    return n;
  var i = dr(t, r);
  return sr.set(a, i), i;
}, pa;
function mo(e, t, r) {
  return (t = yo(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function yo(e) {
  var t = go(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function go(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var a = r.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var vr = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, fr = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, bo = /^(px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q)$/, xo = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, Po = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  in: 96,
  Q: 96 / (2.54 * 40),
  px: 1
}, wo = ["cm", "mm", "pt", "pc", "in", "Q", "px"];
function Oo(e) {
  return wo.includes(e);
}
var Le = "NaN";
function Ao(e, t) {
  return e * Po[t];
}
class B {
  static parse(t) {
    var r, [, a, n] = (r = xo.exec(t)) !== null && r !== void 0 ? r : [];
    return a == null ? B.NaN : new B(parseFloat(a), n ?? "");
  }
  constructor(t, r) {
    this.num = t, this.unit = r, this.num = t, this.unit = r, Ot(t) && (this.unit = ""), r !== "" && !bo.test(r) && (this.num = NaN, this.unit = ""), Oo(r) && (this.num = Ao(t, r), this.unit = "px");
  }
  add(t) {
    return this.unit !== t.unit ? new B(NaN, "") : new B(this.num + t.num, this.unit);
  }
  subtract(t) {
    return this.unit !== t.unit ? new B(NaN, "") : new B(this.num - t.num, this.unit);
  }
  multiply(t) {
    return this.unit !== "" && t.unit !== "" && this.unit !== t.unit ? new B(NaN, "") : new B(this.num * t.num, this.unit || t.unit);
  }
  divide(t) {
    return this.unit !== "" && t.unit !== "" && this.unit !== t.unit ? new B(NaN, "") : new B(this.num / t.num, this.unit || t.unit);
  }
  toString() {
    return "".concat(this.num).concat(this.unit);
  }
  isNaN() {
    return Ot(this.num);
  }
}
pa = B;
mo(B, "NaN", new pa(NaN, ""));
function ma(e) {
  if (e == null || e.includes(Le))
    return Le;
  for (var t = e; t.includes("*") || t.includes("/"); ) {
    var r, [, a, n, i] = (r = vr.exec(t)) !== null && r !== void 0 ? r : [], l = B.parse(a ?? ""), o = B.parse(i ?? ""), c = n === "*" ? l.multiply(o) : l.divide(o);
    if (c.isNaN())
      return Le;
    t = t.replace(vr, c.toString());
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t); ) {
    var u, [, s, v, f] = (u = fr.exec(t)) !== null && u !== void 0 ? u : [], p = B.parse(s ?? ""), h = B.parse(f ?? ""), y = v === "+" ? p.add(h) : p.subtract(h);
    if (y.isNaN())
      return Le;
    t = t.replace(fr, y.toString());
  }
  return t;
}
var hr = /\(([^()]*)\)/;
function Eo(e) {
  for (var t = e, r; (r = hr.exec(t)) != null; ) {
    var [, a] = r;
    t = t.replace(hr, ma(a));
  }
  return t;
}
function ko(e) {
  var t = e.replace(/\s+/g, "");
  return t = Eo(t), t = ma(t), t;
}
function So(e) {
  try {
    return ko(e);
  } catch {
    return Le;
  }
}
function yt(e) {
  var t = So(e.slice(5, -1));
  return t === Le ? "" : t;
}
var Co = ["x", "y", "lineHeight", "capHeight", "fill", "scaleToFit", "textAnchor", "verticalAnchor"], jo = ["dx", "dy", "angle", "className", "breakAll"];
function jt() {
  return jt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var a in r) ({}).hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
  }, jt.apply(null, arguments);
}
function pr(e, t) {
  if (e == null) return {};
  var r, a, n = Io(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++) r = i[a], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Io(e, t) {
  if (e == null) return {};
  var r = {};
  for (var a in e) if ({}.hasOwnProperty.call(e, a)) {
    if (t.indexOf(a) !== -1) continue;
    r[a] = e[a];
  }
  return r;
}
var ya = /[ \f\n\r\t\v\u2028\u2029]+/, ga = (e) => {
  var {
    children: t,
    breakAll: r,
    style: a
  } = e;
  try {
    var n = [];
    U(t) || (r ? n = t.toString().split("") : n = t.toString().split(ya));
    var i = n.map((o) => ({
      word: o,
      width: We(o, a).width
    })), l = r ? 0 : We(" ", a).width;
    return {
      wordsWithComputedWidth: i,
      spaceWidth: l
    };
  } catch {
    return null;
  }
};
function ba(e) {
  return e === "start" || e === "middle" || e === "end" || e === "inherit";
}
function To(e) {
  return U(e) || typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
var xa = (e, t, r, a) => e.reduce((n, i) => {
  var {
    word: l,
    width: o
  } = i, c = n[n.length - 1];
  if (c && o != null && (t == null || a || c.width + o + r < Number(t)))
    c.words.push(l), c.width += o + r;
  else {
    var u = {
      words: [l],
      width: o
    };
    n.push(u);
  }
  return n;
}, []), Pa = (e) => e.reduce((t, r) => t.width > r.width ? t : r), Do = "…", mr = (e, t, r, a, n, i, l, o) => {
  var c = e.slice(0, t), u = ga({
    breakAll: r,
    style: a,
    children: c + Do
  });
  if (!u)
    return [!1, []];
  var s = xa(u.wordsWithComputedWidth, i, l, o), v = s.length > n || Pa(s).width > Number(i);
  return [v, s];
}, No = (e, t, r, a, n) => {
  var {
    maxLines: i,
    children: l,
    style: o,
    breakAll: c
  } = e, u = T(i), s = String(l), v = xa(t, a, r, n);
  if (!u || n)
    return v;
  var f = v.length > i || Pa(v).width > Number(a);
  if (!f)
    return v;
  for (var p = 0, h = s.length - 1, y = 0, m; p <= h && y <= s.length - 1; ) {
    var g = Math.floor((p + h) / 2), P = g - 1, [w, x] = mr(s, P, c, o, i, a, r, n), [b] = mr(s, g, c, o, i, a, r, n);
    if (!w && !b && (p = g + 1), w && b && (h = g - 1), !w && b) {
      m = x;
      break;
    }
    y++;
  }
  return m || v;
}, yr = (e) => {
  var t = U(e) ? [] : e.toString().split(ya);
  return [{
    words: t,
    width: void 0
  }];
}, Lo = (e) => {
  var {
    width: t,
    scaleToFit: r,
    children: a,
    style: n,
    breakAll: i,
    maxLines: l
  } = e;
  if ((t || r) && !Bt.isSsr) {
    var o, c, u = ga({
      breakAll: i,
      children: a,
      style: n
    });
    if (u) {
      var {
        wordsWithComputedWidth: s,
        spaceWidth: v
      } = u;
      o = s, c = v;
    } else
      return yr(a);
    return No({
      breakAll: i,
      children: a,
      maxLines: l,
      style: n
    }, o, c, t, !!r);
  }
  return yr(a);
}, wa = "#808080", $o = {
  angle: 0,
  breakAll: !1,
  // Magic number from d3
  capHeight: "0.71em",
  fill: wa,
  lineHeight: "1em",
  scaleToFit: !1,
  textAnchor: "start",
  // Maintain compat with existing charts / default SVG behavior
  verticalAnchor: "end",
  x: 0,
  y: 0
}, Ht = /* @__PURE__ */ V((e, t) => {
  var r = he(e, $o), {
    x: a,
    y: n,
    lineHeight: i,
    capHeight: l,
    fill: o,
    scaleToFit: c,
    textAnchor: u,
    verticalAnchor: s
  } = r, v = pr(r, Co), f = Ke(() => Lo({
    breakAll: v.breakAll,
    children: v.children,
    maxLines: v.maxLines,
    scaleToFit: c,
    style: v.style,
    width: v.width
  }), [v.breakAll, v.children, v.maxLines, c, v.style, v.width]), {
    dx: p,
    dy: h,
    angle: y,
    className: m,
    breakAll: g
  } = v, P = pr(v, jo);
  if (!At(a) || !At(n) || f.length === 0)
    return null;
  var w = Number(a) + (T(p) ? p : 0), x = Number(n) + (T(h) ? h : 0);
  if (!Se(w) || !Se(x))
    return null;
  var b;
  switch (s) {
    case "start":
      b = yt("calc(".concat(l, ")"));
      break;
    case "middle":
      b = yt("calc(".concat((f.length - 1) / 2, " * -").concat(i, " + (").concat(l, " / 2))"));
      break;
    default:
      b = yt("calc(".concat(f.length - 1, " * -").concat(i, ")"));
      break;
  }
  var O = [], A = f[0];
  if (c && A != null) {
    var E = A.width, {
      width: S
    } = v;
    O.push("scale(".concat(T(S) && T(E) ? S / E : 1, ")"));
  }
  return y && O.push("rotate(".concat(y, ", ").concat(w, ", ").concat(x, ")")), O.length && (P.transform = O.join(" ")), /* @__PURE__ */ d.createElement("text", jt({}, Fe(P), {
    ref: t,
    x: w,
    y: x,
    className: F("recharts-text", m),
    textAnchor: u,
    fill: o.includes("url") ? wa : o
  }), f.map(($, j) => {
    var k = $.words.join(g ? "" : " ");
    return (
      // duplicate words will cause duplicate keys which is why we add the array index here
      /* @__PURE__ */ d.createElement("tspan", {
        x: w,
        dy: j === 0 ? b : i,
        key: "".concat(k, "-").concat(j)
      }, k)
    );
  }));
});
Ht.displayName = "Text";
function gr(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(n) {
      return Object.getOwnPropertyDescriptor(e, n).enumerable;
    })), r.push.apply(r, a);
  }
  return r;
}
function Q(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gr(Object(r), !0).forEach(function(a) {
      _o(e, a, r[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : gr(Object(r)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(r, a));
    });
  }
  return e;
}
function _o(e, t, r) {
  return (t = zo(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function zo(e) {
  var t = Mo(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Mo(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var a = r.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Ro = (e) => {
  var {
    viewBox: t,
    position: r,
    offset: a = 0,
    parentViewBox: n
  } = e, {
    x: i,
    y: l,
    height: o,
    upperWidth: c,
    lowerWidth: u
  } = Wt(t), s = i, v = i + (c - u) / 2, f = (s + v) / 2, p = (c + u) / 2, h = s + c / 2, y = o >= 0 ? 1 : -1, m = y * a, g = y > 0 ? "end" : "start", P = y > 0 ? "start" : "end", w = c >= 0 ? 1 : -1, x = w * a, b = w > 0 ? "end" : "start", O = w > 0 ? "start" : "end", A = n;
  if (r === "top") {
    var E = {
      x: s + c / 2,
      y: l - m,
      horizontalAnchor: "middle",
      verticalAnchor: g
    };
    return A && (E.height = Math.max(l - A.y, 0), E.width = c), E;
  }
  if (r === "bottom") {
    var S = {
      x: v + u / 2,
      y: l + o + m,
      horizontalAnchor: "middle",
      verticalAnchor: P
    };
    return A && (S.height = Math.max(A.y + A.height - (l + o), 0), S.width = u), S;
  }
  if (r === "left") {
    var $ = {
      x: f - x,
      y: l + o / 2,
      horizontalAnchor: b,
      verticalAnchor: "middle"
    };
    return A && ($.width = Math.max($.x - A.x, 0), $.height = o), $;
  }
  if (r === "right") {
    var j = {
      x: f + p + x,
      y: l + o / 2,
      horizontalAnchor: O,
      verticalAnchor: "middle"
    };
    return A && (j.width = Math.max(A.x + A.width - j.x, 0), j.height = o), j;
  }
  var k = A ? {
    width: p,
    height: o
  } : {};
  return r === "insideLeft" ? Q({
    x: f + x,
    y: l + o / 2,
    horizontalAnchor: O,
    verticalAnchor: "middle"
  }, k) : r === "insideRight" ? Q({
    x: f + p - x,
    y: l + o / 2,
    horizontalAnchor: b,
    verticalAnchor: "middle"
  }, k) : r === "insideTop" ? Q({
    x: s + c / 2,
    y: l + m,
    horizontalAnchor: "middle",
    verticalAnchor: P
  }, k) : r === "insideBottom" ? Q({
    x: v + u / 2,
    y: l + o - m,
    horizontalAnchor: "middle",
    verticalAnchor: g
  }, k) : r === "insideTopLeft" ? Q({
    x: s + x,
    y: l + m,
    horizontalAnchor: O,
    verticalAnchor: P
  }, k) : r === "insideTopRight" ? Q({
    x: s + c - x,
    y: l + m,
    horizontalAnchor: b,
    verticalAnchor: P
  }, k) : r === "insideBottomLeft" ? Q({
    x: v + x,
    y: l + o - m,
    horizontalAnchor: O,
    verticalAnchor: g
  }, k) : r === "insideBottomRight" ? Q({
    x: v + u - x,
    y: l + o - m,
    horizontalAnchor: b,
    verticalAnchor: g
  }, k) : r && typeof r == "object" && (T(r.x) || tr(r.x)) && (T(r.y) || tr(r.y)) ? Q({
    x: i + rr(r.x, p),
    y: l + rr(r.y, o),
    horizontalAnchor: "end",
    verticalAnchor: "end"
  }, k) : Q({
    x: h,
    y: l + o / 2,
    horizontalAnchor: "middle",
    verticalAnchor: "middle"
  }, k);
}, Bo = ["labelRef"], Wo = ["content"];
function br(e, t) {
  if (e == null) return {};
  var r, a, n = Go(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++) r = i[a], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Go(e, t) {
  if (e == null) return {};
  var r = {};
  for (var a in e) if ({}.hasOwnProperty.call(e, a)) {
    if (t.indexOf(a) !== -1) continue;
    r[a] = e[a];
  }
  return r;
}
function xr(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(n) {
      return Object.getOwnPropertyDescriptor(e, n).enumerable;
    })), r.push.apply(r, a);
  }
  return r;
}
function Be(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? xr(Object(r), !0).forEach(function(a) {
      Ko(e, a, r[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : xr(Object(r)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(r, a));
    });
  }
  return e;
}
function Ko(e, t, r) {
  return (t = Fo(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Fo(e) {
  var t = Ho(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Ho(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var a = r.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function oe() {
  return oe = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var a in r) ({}).hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
  }, oe.apply(null, arguments);
}
var Oa = /* @__PURE__ */ _e(null), Xo = (e) => {
  var {
    x: t,
    y: r,
    upperWidth: a,
    lowerWidth: n,
    width: i,
    height: l,
    children: o
  } = e, c = Ke(() => ({
    x: t,
    y: r,
    upperWidth: a,
    lowerWidth: n,
    width: i,
    height: l
  }), [t, r, a, n, i, l]);
  return /* @__PURE__ */ d.createElement(Oa.Provider, {
    value: c
  }, o);
}, Aa = () => {
  var e = ct(Oa), t = Sn();
  return e || (t ? Wt(t) : void 0);
}, Vo = /* @__PURE__ */ _e(null), Yo = () => {
  var e = ct(Vo), t = L(Xr);
  return e || t;
}, Zo = (e) => {
  var {
    value: t,
    formatter: r
  } = e, a = U(e.children) ? t : e.children;
  return typeof r == "function" ? r(a) : a;
}, Xt = (e) => e != null && typeof e == "function", Uo = (e, t) => {
  var r = Vr(t - e), a = Math.min(Math.abs(t - e), 360);
  return r * a;
}, qo = (e, t, r, a, n) => {
  var {
    offset: i,
    className: l
  } = e, {
    cx: o,
    cy: c,
    innerRadius: u,
    outerRadius: s,
    startAngle: v,
    endAngle: f,
    clockWise: p
  } = n, h = (u + s) / 2, y = Uo(v, f), m = y >= 0 ? 1 : -1, g, P;
  switch (t) {
    case "insideStart":
      g = v + m * i, P = p;
      break;
    case "insideEnd":
      g = f - m * i, P = !p;
      break;
    case "end":
      g = f + m * i, P = p;
      break;
    default:
      throw new Error("Unsupported position ".concat(t));
  }
  P = y <= 0 ? P : !P;
  var w = Qe(o, c, h, g), x = Qe(o, c, h, g + (P ? 1 : -1) * 359), b = "M".concat(w.x, ",").concat(w.y, `
    A`).concat(h, ",").concat(h, ",0,1,").concat(P ? 0 : 1, `,
    `).concat(x.x, ",").concat(x.y), O = U(e.id) ? Gt("recharts-radial-line-") : e.id;
  return /* @__PURE__ */ d.createElement("text", oe({}, a, {
    dominantBaseline: "central",
    className: F("recharts-radial-bar-label", l)
  }), /* @__PURE__ */ d.createElement("defs", null, /* @__PURE__ */ d.createElement("path", {
    id: O,
    d: b
  })), /* @__PURE__ */ d.createElement("textPath", {
    xlinkHref: "#".concat(O)
  }, r));
}, Jo = (e, t, r) => {
  var {
    cx: a,
    cy: n,
    innerRadius: i,
    outerRadius: l,
    startAngle: o,
    endAngle: c
  } = e, u = (o + c) / 2;
  if (r === "outside") {
    var {
      x: s,
      y: v
    } = Qe(a, n, l + t, u);
    return {
      x: s,
      y: v,
      textAnchor: s >= a ? "start" : "end",
      verticalAnchor: "middle"
    };
  }
  if (r === "center")
    return {
      x: a,
      y: n,
      textAnchor: "middle",
      verticalAnchor: "middle"
    };
  if (r === "centerTop")
    return {
      x: a,
      y: n,
      textAnchor: "middle",
      verticalAnchor: "start"
    };
  if (r === "centerBottom")
    return {
      x: a,
      y: n,
      textAnchor: "middle",
      verticalAnchor: "end"
    };
  var f = (i + l) / 2, {
    x: p,
    y: h
  } = Qe(a, n, f, u);
  return {
    x: p,
    y: h,
    textAnchor: "middle",
    verticalAnchor: "middle"
  };
}, qe = (e) => e != null && "cx" in e && T(e.cx), Qo = {
  angle: 0,
  offset: 5,
  zIndex: pe.label,
  position: "middle",
  textBreakAll: !1
};
function el(e) {
  if (!qe(e))
    return e;
  var {
    cx: t,
    cy: r,
    outerRadius: a
  } = e, n = a * 2;
  return {
    x: t - a,
    y: r - a,
    width: n,
    upperWidth: n,
    lowerWidth: n,
    height: n
  };
}
function ve(e) {
  var t = he(e, Qo), {
    viewBox: r,
    parentViewBox: a,
    position: n,
    value: i,
    children: l,
    content: o,
    className: c = "",
    textBreakAll: u,
    labelRef: s
  } = t, v = Yo(), f = Aa(), p = n === "center" ? f : v ?? f, h, y, m;
  r == null ? h = p : qe(r) ? h = r : h = Wt(r);
  var g = el(h);
  if (!h || U(i) && U(l) && !/* @__PURE__ */ Ee(o) && typeof o != "function")
    return null;
  var P = Be(Be({}, t), {}, {
    viewBox: h
  });
  if (/* @__PURE__ */ Ee(o)) {
    var {
      labelRef: w
    } = P, x = br(P, Bo);
    return /* @__PURE__ */ st(o, x);
  }
  if (typeof o == "function") {
    var {
      content: b
    } = P, O = br(P, Wo);
    if (y = /* @__PURE__ */ mn(o, O), /* @__PURE__ */ Ee(y))
      return y;
  } else
    y = Zo(t);
  var A = Fe(t);
  if (qe(h)) {
    if (n === "insideStart" || n === "insideEnd" || n === "end")
      return qo(t, n, y, A, h);
    m = Jo(h, t.offset, t.position);
  } else {
    if (!g)
      return null;
    var E = Ro({
      viewBox: g,
      position: n,
      offset: t.offset,
      parentViewBox: qe(a) ? void 0 : a
    });
    m = Be(Be({
      x: E.x,
      y: E.y,
      textAnchor: E.horizontalAnchor,
      verticalAnchor: E.verticalAnchor
    }, E.width !== void 0 ? {
      width: E.width
    } : {}), E.height !== void 0 ? {
      height: E.height
    } : {});
  }
  return /* @__PURE__ */ d.createElement(me, {
    zIndex: t.zIndex
  }, /* @__PURE__ */ d.createElement(Ht, oe({
    ref: s,
    className: F("recharts-label", c)
  }, A, m, {
    /*
     * textAnchor is decided by default based on the `position`
     * but we allow overriding via props for precise control.
     */
    textAnchor: ba(A.textAnchor) ? A.textAnchor : m.textAnchor,
    breakAll: u
  }), y));
}
ve.displayName = "Label";
var tl = (e, t, r) => {
  if (!e)
    return null;
  var a = {
    viewBox: t,
    labelRef: r
  };
  return e === !0 ? /* @__PURE__ */ d.createElement(ve, oe({
    key: "label-implicit"
  }, a)) : At(e) ? /* @__PURE__ */ d.createElement(ve, oe({
    key: "label-implicit",
    value: e
  }, a)) : /* @__PURE__ */ Ee(e) ? e.type === ve ? /* @__PURE__ */ st(e, Be({
    key: "label-implicit"
  }, a)) : /* @__PURE__ */ d.createElement(ve, oe({
    key: "label-implicit",
    content: e
  }, a)) : Xt(e) ? /* @__PURE__ */ d.createElement(ve, oe({
    key: "label-implicit",
    content: e
  }, a)) : e && typeof e == "object" ? /* @__PURE__ */ d.createElement(ve, oe({}, e, {
    key: "label-implicit"
  }, a)) : null;
};
function rl(e) {
  var {
    label: t,
    labelRef: r
  } = e, a = Aa();
  return tl(t, a, r) || null;
}
var al = ["valueAccessor"], nl = ["dataKey", "clockWise", "id", "textBreakAll", "zIndex"];
function rt() {
  return rt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var a in r) ({}).hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
  }, rt.apply(null, arguments);
}
function Pr(e, t) {
  if (e == null) return {};
  var r, a, n = il(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++) r = i[a], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function il(e, t) {
  if (e == null) return {};
  var r = {};
  for (var a in e) if ({}.hasOwnProperty.call(e, a)) {
    if (t.indexOf(a) !== -1) continue;
    r[a] = e[a];
  }
  return r;
}
var ol = (e) => {
  var t = Array.isArray(e.value) ? e.value[e.value.length - 1] : e.value;
  if (To(t))
    return t;
}, Ea = /* @__PURE__ */ _e(void 0), ll = Ea.Provider, ka = /* @__PURE__ */ _e(void 0);
ka.Provider;
function cl() {
  return ct(Ea);
}
function sl() {
  return ct(ka);
}
function Je(e) {
  var {
    valueAccessor: t = ol
  } = e, r = Pr(e, al), {
    dataKey: a,
    clockWise: n,
    id: i,
    textBreakAll: l,
    zIndex: o
  } = r, c = Pr(r, nl), u = cl(), s = sl(), v = u || s;
  return !v || !v.length ? null : /* @__PURE__ */ d.createElement(me, {
    zIndex: o ?? pe.label
  }, /* @__PURE__ */ d.createElement(te, {
    className: "recharts-label-list"
  }, v.map((f, p) => {
    var h, y = U(a) ? t(f, p) : Et(f.payload, a), m = U(i) ? {} : {
      id: "".concat(i, "-").concat(p)
    };
    return /* @__PURE__ */ d.createElement(ve, rt({
      key: "label-".concat(p)
    }, Fe(f), c, m, {
      /*
       * Prefer to use the explicit fill from LabelList props.
       * Only in an absence of that, fall back to the fill of the entry.
       * The entry fill can be quite difficult to see especially in Bar, Pie, RadialBar in inside positions.
       * On the other hand it's quite convenient in Scatter, Line, or when the position is outside the Bar, Pie filled shapes.
       */
      fill: (h = r.fill) !== null && h !== void 0 ? h : f.fill,
      parentViewBox: f.parentViewBox,
      value: y,
      textBreakAll: l,
      viewBox: f.viewBox,
      index: p,
      zIndex: 0
    }));
  })));
}
Je.displayName = "LabelList";
function ul(e) {
  var {
    label: t
  } = e;
  return t ? t === !0 ? /* @__PURE__ */ d.createElement(Je, {
    key: "labelList-implicit"
  }) : /* @__PURE__ */ d.isValidElement(t) || Xt(t) ? /* @__PURE__ */ d.createElement(Je, {
    key: "labelList-implicit",
    content: t
  }) : typeof t == "object" ? /* @__PURE__ */ d.createElement(Je, rt({
    key: "labelList-implicit"
  }, t, {
    type: String(t.type)
  })) : null : null;
}
function It() {
  return It = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var a in r) ({}).hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
  }, It.apply(null, arguments);
}
var Sa = (e) => {
  var {
    cx: t,
    cy: r,
    r: a,
    className: n
  } = e, i = F("recharts-dot", n);
  return T(t) && T(r) && T(a) ? /* @__PURE__ */ d.createElement("circle", It({}, ye(e), Yr(e), {
    className: i,
    cx: t,
    cy: r,
    r: a
  })) : null;
}, dl = {
  radiusAxis: {},
  angleAxis: {}
}, Ca = re({
  name: "polarAxis",
  initialState: dl,
  reducers: {
    addRadiusAxis(e, t) {
      e.radiusAxis[t.payload.id] = _(t.payload);
    },
    removeRadiusAxis(e, t) {
      delete e.radiusAxis[t.payload.id];
    },
    addAngleAxis(e, t) {
      e.angleAxis[t.payload.id] = _(t.payload);
    },
    removeAngleAxis(e, t) {
      delete e.angleAxis[t.payload.id];
    }
  }
}), {
  addRadiusAxis: sd,
  removeRadiusAxis: ud,
  addAngleAxis: dd,
  removeAngleAxis: vd
} = Ca.actions, vl = Ca.reducer;
function fl(e) {
  return e && typeof e == "object" && "className" in e && typeof e.className == "string" ? e.className : "";
}
var ja = (e) => e && typeof e == "object" && "clipDot" in e ? !!e.clipDot : !0;
function hl(e) {
  var {
    tooltipEntrySettings: t
  } = e, r = X(), a = q(), n = H(null);
  return Z(() => {
    a || (n.current === null ? r(Cn(t)) : n.current !== t && r(jn({
      prev: n.current,
      next: t
    })), n.current = t);
  }, [t, r, a]), Z(() => () => {
    n.current && (r(In(n.current)), n.current = null);
  }, [r]), null;
}
function pl(e) {
  var {
    legendPayload: t
  } = e, r = X(), a = q(), n = H(null);
  return Z(() => {
    a || (n.current === null ? r(Tn(t)) : n.current !== t && r(Dn({
      prev: n.current,
      next: t
    })), n.current = t);
  }, [r, a, t]), Z(() => () => {
    n.current && (r(Nn(n.current)), n.current = null);
  }, [r]), null;
}
var gt, ml = () => {
  var [e] = d.useState(() => Gt("uid-"));
  return e;
}, yl = (gt = d.useId) !== null && gt !== void 0 ? gt : ml;
function gl(e, t) {
  var r = yl();
  return t || (e ? "".concat(e, "-").concat(r) : r);
}
var bl = /* @__PURE__ */ _e(void 0), xl = (e) => {
  var {
    id: t,
    type: r,
    children: a
  } = e, n = gl("recharts-".concat(r), t);
  return /* @__PURE__ */ d.createElement(bl.Provider, {
    value: n
  }, a(n));
}, Pl = {
  cartesianItems: [],
  polarItems: []
}, Ia = re({
  name: "graphicalItems",
  initialState: Pl,
  reducers: {
    addCartesianGraphicalItem: {
      reducer(e, t) {
        e.cartesianItems.push(_(t.payload));
      },
      prepare: K()
    },
    replaceCartesianGraphicalItem: {
      reducer(e, t) {
        var {
          prev: r,
          next: a
        } = t.payload, n = Oe(e).cartesianItems.indexOf(_(r));
        n > -1 && (e.cartesianItems[n] = _(a));
      },
      prepare: K()
    },
    removeCartesianGraphicalItem: {
      reducer(e, t) {
        var r = Oe(e).cartesianItems.indexOf(_(t.payload));
        r > -1 && e.cartesianItems.splice(r, 1);
      },
      prepare: K()
    },
    addPolarGraphicalItem: {
      reducer(e, t) {
        e.polarItems.push(_(t.payload));
      },
      prepare: K()
    },
    removePolarGraphicalItem: {
      reducer(e, t) {
        var r = Oe(e).polarItems.indexOf(_(t.payload));
        r > -1 && e.polarItems.splice(r, 1);
      },
      prepare: K()
    },
    replacePolarGraphicalItem: {
      reducer(e, t) {
        var {
          prev: r,
          next: a
        } = t.payload, n = Oe(e).polarItems.indexOf(_(r));
        n > -1 && (e.polarItems[n] = _(a));
      },
      prepare: K()
    }
  }
}), {
  addCartesianGraphicalItem: wl,
  replaceCartesianGraphicalItem: Ol,
  removeCartesianGraphicalItem: Al,
  addPolarGraphicalItem: fd,
  removePolarGraphicalItem: hd,
  replacePolarGraphicalItem: pd
} = Ia.actions, El = Ia.reducer, kl = (e) => {
  var t = X(), r = H(null);
  return Z(() => {
    r.current === null ? t(wl(e)) : r.current !== e && t(Ol({
      prev: r.current,
      next: e
    })), r.current = e;
  }, [t, e]), Z(() => () => {
    r.current && (t(Al(r.current)), r.current = null);
  }, [t]), null;
}, Sl = /* @__PURE__ */ Rt(kl), Cl = ["points"];
function wr(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(n) {
      return Object.getOwnPropertyDescriptor(e, n).enumerable;
    })), r.push.apply(r, a);
  }
  return r;
}
function bt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wr(Object(r), !0).forEach(function(a) {
      jl(e, a, r[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : wr(Object(r)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(r, a));
    });
  }
  return e;
}
function jl(e, t, r) {
  return (t = Il(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Il(e) {
  var t = Tl(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Tl(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var a = r.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function at() {
  return at = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var a in r) ({}).hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
  }, at.apply(null, arguments);
}
function Dl(e, t) {
  if (e == null) return {};
  var r, a, n = Nl(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++) r = i[a], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Nl(e, t) {
  if (e == null) return {};
  var r = {};
  for (var a in e) if ({}.hasOwnProperty.call(e, a)) {
    if (t.indexOf(a) !== -1) continue;
    r[a] = e[a];
  }
  return r;
}
function Ll(e) {
  var {
    option: t,
    dotProps: r,
    className: a
  } = e;
  if (/* @__PURE__ */ Ee(t))
    return /* @__PURE__ */ st(t, r);
  if (typeof t == "function")
    return t(r);
  var n = F(a, typeof t != "boolean" ? t.className : ""), i = r ?? {}, {
    points: l
  } = i, o = Dl(i, Cl);
  return /* @__PURE__ */ d.createElement(Sa, at({}, o, {
    className: n
  }));
}
function $l(e, t) {
  return e == null ? !1 : t ? !0 : e.length === 1;
}
function _l(e) {
  var {
    points: t,
    dot: r,
    className: a,
    dotClassName: n,
    dataKey: i,
    baseProps: l,
    needClip: o,
    clipPathId: c,
    zIndex: u = pe.scatter
  } = e;
  if (!$l(t, r))
    return null;
  var s = ja(r), v = Ln(r), f = t.map((h, y) => {
    var m, g, P = bt(bt(bt({
      r: 3
    }, l), v), {}, {
      index: y,
      cx: (m = h.x) !== null && m !== void 0 ? m : void 0,
      cy: (g = h.y) !== null && g !== void 0 ? g : void 0,
      dataKey: i,
      value: h.value,
      payload: h.payload,
      points: t
    });
    return /* @__PURE__ */ d.createElement(Ll, {
      key: "dot-".concat(y),
      option: r,
      dotProps: P,
      className: n
    });
  }), p = {};
  return o && c != null && (p.clipPath = "url(#clipPath-".concat(s ? "" : "dots-").concat(c, ")")), /* @__PURE__ */ d.createElement(me, {
    zIndex: u
  }, /* @__PURE__ */ d.createElement(te, at({
    className: a
  }, p), f));
}
function Or(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(n) {
      return Object.getOwnPropertyDescriptor(e, n).enumerable;
    })), r.push.apply(r, a);
  }
  return r;
}
function Ar(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Or(Object(r), !0).forEach(function(a) {
      zl(e, a, r[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Or(Object(r)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(r, a));
    });
  }
  return e;
}
function zl(e, t, r) {
  return (t = Ml(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Ml(e) {
  var t = Rl(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Rl(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var a = r.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Ta = 0, Bl = {
  xAxis: {},
  yAxis: {},
  zAxis: {}
}, Da = re({
  name: "cartesianAxis",
  initialState: Bl,
  reducers: {
    addXAxis: {
      reducer(e, t) {
        e.xAxis[t.payload.id] = _(t.payload);
      },
      prepare: K()
    },
    replaceXAxis: {
      reducer(e, t) {
        var {
          prev: r,
          next: a
        } = t.payload;
        e.xAxis[r.id] !== void 0 && (r.id !== a.id && delete e.xAxis[r.id], e.xAxis[a.id] = _(a));
      },
      prepare: K()
    },
    removeXAxis: {
      reducer(e, t) {
        delete e.xAxis[t.payload.id];
      },
      prepare: K()
    },
    addYAxis: {
      reducer(e, t) {
        e.yAxis[t.payload.id] = _(t.payload);
      },
      prepare: K()
    },
    replaceYAxis: {
      reducer(e, t) {
        var {
          prev: r,
          next: a
        } = t.payload;
        e.yAxis[r.id] !== void 0 && (r.id !== a.id && delete e.yAxis[r.id], e.yAxis[a.id] = _(a));
      },
      prepare: K()
    },
    removeYAxis: {
      reducer(e, t) {
        delete e.yAxis[t.payload.id];
      },
      prepare: K()
    },
    addZAxis: {
      reducer(e, t) {
        e.zAxis[t.payload.id] = _(t.payload);
      },
      prepare: K()
    },
    replaceZAxis: {
      reducer(e, t) {
        var {
          prev: r,
          next: a
        } = t.payload;
        e.zAxis[r.id] !== void 0 && (r.id !== a.id && delete e.zAxis[r.id], e.zAxis[a.id] = _(a));
      },
      prepare: K()
    },
    removeZAxis: {
      reducer(e, t) {
        delete e.zAxis[t.payload.id];
      },
      prepare: K()
    },
    updateYAxisWidth(e, t) {
      var {
        id: r,
        width: a
      } = t.payload, n = e.yAxis[r];
      if (n) {
        var i, l = n.widthHistory || [];
        if (l.length === 3 && l[0] === l[2] && a === l[1] && a !== n.width && Math.abs(a - ((i = l[0]) !== null && i !== void 0 ? i : 0)) <= 1)
          return;
        var o = [...l, a].slice(-3);
        e.yAxis[r] = Ar(Ar({}, n), {}, {
          width: a,
          widthHistory: o
        });
      }
    }
  }
}), {
  addXAxis: Wl,
  replaceXAxis: Gl,
  removeXAxis: Kl,
  addYAxis: Fl,
  replaceYAxis: Hl,
  removeYAxis: Xl,
  addZAxis: md,
  replaceZAxis: yd,
  removeZAxis: gd,
  updateYAxisWidth: Vl
} = Da.actions, Yl = Da.reducer, Zl = ce([Zr], (e) => ({
  top: e.top,
  bottom: e.bottom,
  left: e.left,
  right: e.right
})), Ul = ce([Zl, $n, _n], (e, t, r) => {
  if (!(!e || t == null || r == null))
    return {
      x: e.left,
      y: e.top,
      width: Math.max(0, t - e.left - e.right),
      height: Math.max(0, r - e.top - e.bottom)
    };
}), Vt = () => L(Ul), ql = () => L(zn);
function Er(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(n) {
      return Object.getOwnPropertyDescriptor(e, n).enumerable;
    })), r.push.apply(r, a);
  }
  return r;
}
function xt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Er(Object(r), !0).forEach(function(a) {
      Jl(e, a, r[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Er(Object(r)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(r, a));
    });
  }
  return e;
}
function Jl(e, t, r) {
  return (t = Ql(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Ql(e) {
  var t = ec(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function ec(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var a = r.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var tc = (e) => {
  var {
    point: t,
    childIndex: r,
    mainColor: a,
    activeDot: n,
    dataKey: i,
    clipPath: l
  } = e;
  if (n === !1 || t.x == null || t.y == null)
    return null;
  var o = {
    index: r,
    dataKey: i,
    cx: t.x,
    cy: t.y,
    r: 4,
    fill: a ?? "none",
    strokeWidth: 2,
    stroke: "#fff",
    payload: t.payload,
    value: t.value
  }, c = xt(xt(xt({}, o), Kt(n)), Yr(n)), u;
  return /* @__PURE__ */ Ee(n) ? u = /* @__PURE__ */ st(n, c) : typeof n == "function" ? u = n(c) : u = /* @__PURE__ */ d.createElement(Sa, c), /* @__PURE__ */ d.createElement(te, {
    className: "recharts-active-dot",
    clipPath: l
  }, u);
};
function kr(e) {
  var {
    points: t,
    mainColor: r,
    activeDot: a,
    itemDataKey: n,
    clipPath: i,
    zIndex: l = pe.activeDot
  } = e, o = L(kt), c = ql();
  if (t == null || c == null)
    return null;
  var u = t.find((s) => c.includes(s.payload));
  return U(u) ? null : /* @__PURE__ */ d.createElement(me, {
    zIndex: l
  }, /* @__PURE__ */ d.createElement(tc, {
    point: u,
    childIndex: Number(o),
    mainColor: r,
    dataKey: n,
    activeDot: a,
    clipPath: i
  }));
}
var rc = (e) => {
  var {
    chartData: t
  } = e, r = X(), a = q();
  return je(() => a ? () => {
  } : (r(ar(t)), () => {
    r(ar(void 0));
  }), [t, r, a]), null;
}, Sr = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
}, Na = re({
  name: "brush",
  initialState: Sr,
  reducers: {
    setBrushSettings(e, t) {
      return t.payload == null ? Sr : t.payload;
    }
  }
}), {
  setBrushSettings: bd
} = Na.actions, ac = Na.reducer;
function nc(e) {
  return (e % 180 + 180) % 180;
}
var ic = function(t) {
  var {
    width: r,
    height: a
  } = t, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, i = nc(n), l = i * Math.PI / 180, o = Math.atan(a / r), c = l > o && l < Math.PI - o ? a / Math.sin(l) : r / Math.cos(l);
  return Math.abs(c);
}, oc = {
  dots: [],
  areas: [],
  lines: []
}, La = re({
  name: "referenceElements",
  initialState: oc,
  reducers: {
    addDot: (e, t) => {
      e.dots.push(t.payload);
    },
    removeDot: (e, t) => {
      var r = Oe(e).dots.findIndex((a) => a === t.payload);
      r !== -1 && e.dots.splice(r, 1);
    },
    addArea: (e, t) => {
      e.areas.push(t.payload);
    },
    removeArea: (e, t) => {
      var r = Oe(e).areas.findIndex((a) => a === t.payload);
      r !== -1 && e.areas.splice(r, 1);
    },
    addLine: (e, t) => {
      e.lines.push(_(t.payload));
    },
    removeLine: (e, t) => {
      var r = Oe(e).lines.findIndex((a) => a === t.payload);
      r !== -1 && e.lines.splice(r, 1);
    }
  }
}), {
  addDot: xd,
  removeDot: Pd,
  addArea: wd,
  removeArea: Od,
  addLine: Ad,
  removeLine: Ed
} = La.actions, lc = La.reducer, cc = /* @__PURE__ */ _e(void 0), sc = (e) => {
  var {
    children: t
  } = e, [r] = ee("".concat(Gt("recharts"), "-clip")), a = Vt();
  if (a == null)
    return null;
  var {
    x: n,
    y: i,
    width: l,
    height: o
  } = a;
  return /* @__PURE__ */ d.createElement(cc.Provider, {
    value: r
  }, /* @__PURE__ */ d.createElement("defs", null, /* @__PURE__ */ d.createElement("clipPath", {
    id: r
  }, /* @__PURE__ */ d.createElement("rect", {
    x: n,
    y: i,
    height: o,
    width: l
  }))), t);
};
function $a(e, t) {
  if (t < 1)
    return [];
  if (t === 1)
    return e;
  for (var r = [], a = 0; a < e.length; a += t) {
    var n = e[a];
    n !== void 0 && r.push(n);
  }
  return r;
}
function uc(e, t, r) {
  var a = {
    width: e.width + t.width,
    height: e.height + t.height
  };
  return ic(a, r);
}
function dc(e, t, r) {
  var a = r === "width", {
    x: n,
    y: i,
    width: l,
    height: o
  } = e;
  return t === 1 ? {
    start: a ? n : i,
    end: a ? n + l : i + o
  } : {
    start: a ? n + l : i + o,
    end: a ? n : i
  };
}
function Ge(e, t, r, a, n) {
  if (e * t < e * a || e * t > e * n)
    return !1;
  var i = r();
  return e * (t - e * i / 2 - a) >= 0 && e * (t + e * i / 2 - n) <= 0;
}
function vc(e, t) {
  return $a(e, t + 1);
}
function fc(e, t, r, a, n) {
  for (var i = (a || []).slice(), {
    start: l,
    end: o
  } = t, c = 0, u = 1, s = l, v = function() {
    var h = a?.[c];
    if (h === void 0)
      return {
        v: $a(a, u)
      };
    var y = c, m, g = () => (m === void 0 && (m = r(h, y)), m), P = h.coordinate, w = c === 0 || Ge(e, P, g, s, o);
    w || (c = 0, s = l, u += 1), w && (s = P + e * (g() / 2 + n), c += u);
  }, f; u <= i.length; )
    if (f = v(), f) return f.v;
  return [];
}
function hc(e, t, r, a, n) {
  var i = (a || []).slice(), l = i.length;
  if (l === 0)
    return [];
  for (var {
    start: o,
    end: c
  } = t, u = 1; u <= l; u++) {
    for (var s = (l - 1) % u, v = o, f = !0, p = function() {
      var x = a[y];
      if (x == null)
        return 0;
      var b = y, O, A = () => (O === void 0 && (O = r(x, b)), O), E = x.coordinate, S = y === s || Ge(e, E, A, v, c);
      if (!S)
        return f = !1, 1;
      S && (v = E + e * (A() / 2 + n));
    }, h, y = s; y < l && (h = p(), !(h !== 0 && h === 1)); y += u)
      ;
    if (f) {
      for (var m = [], g = s; g < l; g += u) {
        var P = a[g];
        P != null && m.push(P);
      }
      return m;
    }
  }
  return [];
}
function Cr(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(n) {
      return Object.getOwnPropertyDescriptor(e, n).enumerable;
    })), r.push.apply(r, a);
  }
  return r;
}
function W(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Cr(Object(r), !0).forEach(function(a) {
      pc(e, a, r[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Cr(Object(r)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(r, a));
    });
  }
  return e;
}
function pc(e, t, r) {
  return (t = mc(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function mc(e) {
  var t = yc(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function yc(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var a = r.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function gc(e, t, r, a, n) {
  for (var i = (a || []).slice(), l = i.length, {
    start: o
  } = t, {
    end: c
  } = t, u = function(f) {
    var p = i[f];
    if (p == null)
      return 1;
    var h = p, y, m = () => (y === void 0 && (y = r(p, f)), y);
    if (f === l - 1) {
      var g = e * (h.coordinate + e * m() / 2 - c);
      i[f] = h = W(W({}, h), {}, {
        tickCoord: g > 0 ? h.coordinate - g * e : h.coordinate
      });
    } else
      i[f] = h = W(W({}, h), {}, {
        tickCoord: h.coordinate
      });
    if (h.tickCoord != null) {
      var P = Ge(e, h.tickCoord, m, o, c);
      P && (c = h.tickCoord - e * (m() / 2 + n), i[f] = W(W({}, h), {}, {
        isShow: !0
      }));
    }
  }, s = l - 1; s >= 0; s--)
    u(s);
  return i;
}
function bc(e, t, r, a, n, i) {
  var l = (a || []).slice(), o = l.length, {
    start: c,
    end: u
  } = t;
  if (i) {
    var s = a[o - 1];
    if (s != null) {
      var v = r(s, o - 1), f = e * (s.coordinate + e * v / 2 - u);
      if (l[o - 1] = s = W(W({}, s), {}, {
        tickCoord: f > 0 ? s.coordinate - f * e : s.coordinate
      }), s.tickCoord != null) {
        var p = Ge(e, s.tickCoord, () => v, c, u);
        p && (u = s.tickCoord - e * (v / 2 + n), l[o - 1] = W(W({}, s), {}, {
          isShow: !0
        }));
      }
    }
  }
  for (var h = i ? o - 1 : o, y = function(P) {
    var w = l[P];
    if (w == null)
      return 1;
    var x = w, b, O = () => (b === void 0 && (b = r(w, P)), b);
    if (P === 0) {
      var A = e * (x.coordinate - e * O() / 2 - c);
      l[P] = x = W(W({}, x), {}, {
        tickCoord: A < 0 ? x.coordinate - A * e : x.coordinate
      });
    } else
      l[P] = x = W(W({}, x), {}, {
        tickCoord: x.coordinate
      });
    if (x.tickCoord != null) {
      var E = Ge(e, x.tickCoord, O, c, u);
      E && (c = x.tickCoord + e * (O() / 2 + n), l[P] = W(W({}, x), {}, {
        isShow: !0
      }));
    }
  }, m = 0; m < h; m++)
    y(m);
  return l;
}
function Yt(e, t, r) {
  var {
    tick: a,
    ticks: n,
    viewBox: i,
    minTickGap: l,
    orientation: o,
    interval: c,
    tickFormatter: u,
    unit: s,
    angle: v
  } = e;
  if (!n || !n.length || !a)
    return [];
  if (T(c) || Bt.isSsr) {
    var f;
    return (f = vc(n, T(c) ? c : 0)) !== null && f !== void 0 ? f : [];
  }
  var p = [], h = o === "top" || o === "bottom" ? "width" : "height", y = s && h === "width" ? We(s, {
    fontSize: t,
    letterSpacing: r
  }) : {
    width: 0,
    height: 0
  }, m = (b, O) => {
    var A = typeof u == "function" ? u(b.value, O) : b.value;
    return h === "width" ? uc(We(A, {
      fontSize: t,
      letterSpacing: r
    }), y, v) : We(A, {
      fontSize: t,
      letterSpacing: r
    })[h];
  }, g = n[0], P = n[1], w = n.length >= 2 && g != null && P != null ? Vr(P.coordinate - g.coordinate) : 1, x = dc(i, w, h);
  return c === "equidistantPreserveStart" ? fc(w, x, m, n, l) : c === "equidistantPreserveEnd" ? hc(w, x, m, n, l) : (c === "preserveStart" || c === "preserveStartEnd" ? p = bc(w, x, m, n, l, c === "preserveStartEnd") : p = gc(w, x, m, n, l), p.filter((b) => b.isShow));
}
var xc = (e) => {
  var {
    ticks: t,
    label: r,
    labelGapWithTick: a = 5,
    // Default gap between label and tick
    tickSize: n = 0,
    tickMargin: i = 0
  } = e, l = 0;
  if (t) {
    Array.from(t).forEach((s) => {
      if (s) {
        var v = s.getBoundingClientRect();
        v.width > l && (l = v.width);
      }
    });
    var o = r ? r.getBoundingClientRect().width : 0, c = n + i, u = l + c + o + (r ? a : 0);
    return Math.round(u);
  }
  return 0;
}, Pc = {
  xAxis: {},
  yAxis: {}
}, _a = re({
  name: "renderedTicks",
  initialState: Pc,
  reducers: {
    setRenderedTicks: (e, t) => {
      var {
        axisType: r,
        axisId: a,
        ticks: n
      } = t.payload;
      e[r][a] = _(n);
    },
    removeRenderedTicks: (e, t) => {
      var {
        axisType: r,
        axisId: a
      } = t.payload;
      delete e[r][a];
    }
  }
}), {
  setRenderedTicks: wc,
  removeRenderedTicks: Oc
} = _a.actions, Ac = _a.reducer, Ec = ["axisLine", "width", "height", "className", "hide", "ticks", "axisType", "axisId"];
function kc(e, t) {
  if (e == null) return {};
  var r, a, n = Sc(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++) r = i[a], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Sc(e, t) {
  if (e == null) return {};
  var r = {};
  for (var a in e) if ({}.hasOwnProperty.call(e, a)) {
    if (t.indexOf(a) !== -1) continue;
    r[a] = e[a];
  }
  return r;
}
function Ce() {
  return Ce = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var a in r) ({}).hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
  }, Ce.apply(null, arguments);
}
function jr(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(n) {
      return Object.getOwnPropertyDescriptor(e, n).enumerable;
    })), r.push.apply(r, a);
  }
  return r;
}
function N(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? jr(Object(r), !0).forEach(function(a) {
      Cc(e, a, r[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : jr(Object(r)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(r, a));
    });
  }
  return e;
}
function Cc(e, t, r) {
  return (t = jc(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function jc(e) {
  var t = Ic(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Ic(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var a = r.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var le = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  // The orientation of axis
  orientation: "bottom",
  // The ticks
  ticks: [],
  stroke: "#666",
  tickLine: !0,
  axisLine: !0,
  tick: !0,
  mirror: !1,
  minTickGap: 5,
  // The width or height of tick
  tickSize: 6,
  tickMargin: 2,
  interval: "preserveEnd",
  zIndex: pe.axis
};
function Tc(e) {
  var {
    x: t,
    y: r,
    width: a,
    height: n,
    orientation: i,
    mirror: l,
    axisLine: o,
    otherSvgProps: c
  } = e;
  if (!o)
    return null;
  var u = N(N(N({}, c), ye(o)), {}, {
    fill: "none"
  });
  if (i === "top" || i === "bottom") {
    var s = +(i === "top" && !l || i === "bottom" && l);
    u = N(N({}, u), {}, {
      x1: t,
      y1: r + s * n,
      x2: t + a,
      y2: r + s * n
    });
  } else {
    var v = +(i === "left" && !l || i === "right" && l);
    u = N(N({}, u), {}, {
      x1: t + v * a,
      y1: r,
      x2: t + v * a,
      y2: r + n
    });
  }
  return /* @__PURE__ */ d.createElement("line", Ce({}, u, {
    className: F("recharts-cartesian-axis-line", Ur(o, "className"))
  }));
}
function Dc(e, t, r, a, n, i, l, o, c) {
  var u, s, v, f, p, h, y = o ? -1 : 1, m = e.tickSize || l, g = T(e.tickCoord) ? e.tickCoord : e.coordinate;
  switch (i) {
    case "top":
      u = s = e.coordinate, f = r + +!o * n, v = f - y * m, h = v - y * c, p = g;
      break;
    case "left":
      v = f = e.coordinate, s = t + +!o * a, u = s - y * m, p = u - y * c, h = g;
      break;
    case "right":
      v = f = e.coordinate, s = t + +o * a, u = s + y * m, p = u + y * c, h = g;
      break;
    default:
      u = s = e.coordinate, f = r + +o * n, v = f + y * m, h = v + y * c, p = g;
      break;
  }
  return {
    line: {
      x1: u,
      y1: v,
      x2: s,
      y2: f
    },
    tick: {
      x: p,
      y: h
    }
  };
}
function Nc(e, t) {
  switch (e) {
    case "left":
      return t ? "start" : "end";
    case "right":
      return t ? "end" : "start";
    default:
      return "middle";
  }
}
function Lc(e, t) {
  switch (e) {
    case "left":
    case "right":
      return "middle";
    case "top":
      return t ? "start" : "end";
    default:
      return t ? "end" : "start";
  }
}
function $c(e) {
  var {
    option: t,
    tickProps: r,
    value: a
  } = e, n, i = F(r.className, "recharts-cartesian-axis-tick-value");
  if (/* @__PURE__ */ d.isValidElement(t))
    n = /* @__PURE__ */ d.cloneElement(t, N(N({}, r), {}, {
      className: i
    }));
  else if (typeof t == "function")
    n = t(N(N({}, r), {}, {
      className: i
    }));
  else {
    var l = "recharts-cartesian-axis-tick-value";
    typeof t != "boolean" && (l = F(l, fl(t))), n = /* @__PURE__ */ d.createElement(Ht, Ce({}, r, {
      className: l
    }), a);
  }
  return n;
}
function _c(e) {
  var {
    ticks: t,
    axisType: r,
    axisId: a
  } = e, n = X();
  return je(() => {
    if (a == null || r == null)
      return qr;
    var i = t.map((l) => ({
      value: l.value,
      coordinate: l.coordinate,
      offset: l.offset,
      index: l.index
    }));
    return n(wc({
      ticks: i,
      axisId: a,
      axisType: r
    })), () => {
      n(Oc({
        axisId: a,
        axisType: r
      }));
    };
  }, [n, t, a, r]), null;
}
var zc = /* @__PURE__ */ V((e, t) => {
  var {
    ticks: r = [],
    tick: a,
    tickLine: n,
    stroke: i,
    tickFormatter: l,
    unit: o,
    padding: c,
    tickTextProps: u,
    orientation: s,
    mirror: v,
    x: f,
    y: p,
    width: h,
    height: y,
    tickSize: m,
    tickMargin: g,
    fontSize: P,
    letterSpacing: w,
    getTicksConfig: x,
    events: b,
    axisType: O,
    axisId: A
  } = e, E = Yt(N(N({}, x), {}, {
    ticks: r
  }), P, w), S = ye(x), $ = Kt(a), j = ba(S.textAnchor) ? S.textAnchor : Nc(s, v), k = Lc(s, v), R = {};
  typeof n == "object" && (R = n);
  var ae = N(N({}, S), {}, {
    fill: "none"
  }, R), J = E.map((ue) => N({
    entry: ue
  }, Dc(ue, f, p, h, y, s, m, v, g))), Ve = J.map((ue) => {
    var {
      entry: ne,
      line: ge
    } = ue;
    return /* @__PURE__ */ d.createElement(te, {
      className: "recharts-cartesian-axis-tick",
      key: "tick-".concat(ne.value, "-").concat(ne.coordinate, "-").concat(ne.tickCoord)
    }, n && /* @__PURE__ */ d.createElement("line", Ce({}, ae, ge, {
      className: F("recharts-cartesian-axis-tick-line", Ur(n, "className"))
    })));
  }), Ye = J.map((ue, ne) => {
    var ge, ze, {
      entry: ie,
      tick: ft
    } = ue, ht = N(N(N(N({
      verticalAnchor: k
    }, S), {}, {
      textAnchor: j,
      stroke: "none",
      fill: i
    }, ft), {}, {
      index: ne,
      payload: ie,
      visibleTicksCount: E.length,
      tickFormatter: l,
      padding: c
    }, u), {}, {
      angle: (ge = (ze = u?.angle) !== null && ze !== void 0 ? ze : S.angle) !== null && ge !== void 0 ? ge : 0
    }), pt = N(N({}, ht), $);
    return /* @__PURE__ */ d.createElement(te, Ce({
      className: "recharts-cartesian-axis-tick-label",
      key: "tick-label-".concat(ie.value, "-").concat(ie.coordinate, "-").concat(ie.tickCoord)
    }, Mn(b, ie, ne)), a && /* @__PURE__ */ d.createElement($c, {
      option: a,
      tickProps: pt,
      value: "".concat(typeof l == "function" ? l(ie.value, ne) : ie.value).concat(o || "")
    }));
  });
  return /* @__PURE__ */ d.createElement("g", {
    className: "recharts-cartesian-axis-ticks recharts-".concat(O, "-ticks")
  }, /* @__PURE__ */ d.createElement(_c, {
    ticks: E,
    axisId: A,
    axisType: O
  }), Ye.length > 0 && /* @__PURE__ */ d.createElement(me, {
    zIndex: pe.label
  }, /* @__PURE__ */ d.createElement("g", {
    className: "recharts-cartesian-axis-tick-labels recharts-".concat(O, "-tick-labels"),
    ref: t
  }, Ye)), Ve.length > 0 && /* @__PURE__ */ d.createElement("g", {
    className: "recharts-cartesian-axis-tick-lines recharts-".concat(O, "-tick-lines")
  }, Ve));
}), Mc = /* @__PURE__ */ V((e, t) => {
  var {
    axisLine: r,
    width: a,
    height: n,
    className: i,
    hide: l,
    ticks: o,
    axisType: c,
    axisId: u
  } = e, s = kc(e, Ec), [v, f] = ee(""), [p, h] = ee(""), y = H(null);
  yn(t, () => ({
    getCalculatedWidth: () => {
      var g;
      return xc({
        ticks: y.current,
        label: (g = e.labelRef) === null || g === void 0 ? void 0 : g.current,
        labelGapWithTick: 5,
        tickSize: e.tickSize,
        tickMargin: e.tickMargin
      });
    }
  }));
  var m = D((g) => {
    if (g) {
      var P = g.getElementsByClassName("recharts-cartesian-axis-tick-value");
      y.current = P;
      var w = P[0];
      if (w) {
        var x = window.getComputedStyle(w), b = x.fontSize, O = x.letterSpacing;
        (b !== v || O !== p) && (f(b), h(O));
      }
    }
  }, [v, p]);
  return l || a != null && a <= 0 || n != null && n <= 0 ? null : /* @__PURE__ */ d.createElement(me, {
    zIndex: e.zIndex
  }, /* @__PURE__ */ d.createElement(te, {
    className: F("recharts-cartesian-axis", i)
  }, /* @__PURE__ */ d.createElement(Tc, {
    x: e.x,
    y: e.y,
    width: a,
    height: n,
    orientation: e.orientation,
    mirror: e.mirror,
    axisLine: r,
    otherSvgProps: ye(e)
  }), /* @__PURE__ */ d.createElement(zc, {
    ref: m,
    axisType: c,
    events: s,
    fontSize: v,
    getTicksConfig: e,
    height: e.height,
    letterSpacing: p,
    mirror: e.mirror,
    orientation: e.orientation,
    padding: e.padding,
    stroke: e.stroke,
    tick: e.tick,
    tickFormatter: e.tickFormatter,
    tickLine: e.tickLine,
    tickMargin: e.tickMargin,
    tickSize: e.tickSize,
    tickTextProps: e.tickTextProps,
    ticks: o,
    unit: e.unit,
    width: e.width,
    x: e.x,
    y: e.y,
    axisId: u
  }), /* @__PURE__ */ d.createElement(Xo, {
    x: e.x,
    y: e.y,
    width: e.width,
    height: e.height,
    lowerWidth: e.width,
    upperWidth: e.width
  }, /* @__PURE__ */ d.createElement(rl, {
    label: e.label,
    labelRef: e.labelRef
  }), e.children)));
}), Zt = /* @__PURE__ */ d.forwardRef((e, t) => {
  var r = he(e, le);
  return /* @__PURE__ */ d.createElement(Mc, Ce({}, r, {
    ref: t
  }));
});
Zt.displayName = "CartesianAxis";
var Rc = ["x1", "y1", "x2", "y2", "key"], Bc = ["offset"], Wc = ["xAxisId", "yAxisId"], Gc = ["xAxisId", "yAxisId"];
function Ir(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(n) {
      return Object.getOwnPropertyDescriptor(e, n).enumerable;
    })), r.push.apply(r, a);
  }
  return r;
}
function G(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ir(Object(r), !0).forEach(function(a) {
      Kc(e, a, r[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ir(Object(r)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(r, a));
    });
  }
  return e;
}
function Kc(e, t, r) {
  return (t = Fc(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Fc(e) {
  var t = Hc(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Hc(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var a = r.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ae() {
  return Ae = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var a in r) ({}).hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
  }, Ae.apply(null, arguments);
}
function nt(e, t) {
  if (e == null) return {};
  var r, a, n = Xc(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++) r = i[a], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Xc(e, t) {
  if (e == null) return {};
  var r = {};
  for (var a in e) if ({}.hasOwnProperty.call(e, a)) {
    if (t.indexOf(a) !== -1) continue;
    r[a] = e[a];
  }
  return r;
}
var Vc = (e) => {
  var {
    fill: t
  } = e;
  if (!t || t === "none")
    return null;
  var {
    fillOpacity: r,
    x: a,
    y: n,
    width: i,
    height: l,
    ry: o
  } = e;
  return /* @__PURE__ */ d.createElement("rect", {
    x: a,
    y: n,
    ry: o,
    width: i,
    height: l,
    stroke: "none",
    fill: t,
    fillOpacity: r,
    className: "recharts-cartesian-grid-bg"
  });
};
function za(e) {
  var {
    option: t,
    lineItemProps: r
  } = e, a;
  if (/* @__PURE__ */ d.isValidElement(t))
    a = /* @__PURE__ */ d.cloneElement(t, r);
  else if (typeof t == "function")
    a = t(r);
  else {
    var n, {
      x1: i,
      y1: l,
      x2: o,
      y2: c,
      key: u
    } = r, s = nt(r, Rc), v = (n = ye(s)) !== null && n !== void 0 ? n : {}, {
      offset: f
    } = v, p = nt(v, Bc);
    a = /* @__PURE__ */ d.createElement("line", Ae({}, p, {
      x1: i,
      y1: l,
      x2: o,
      y2: c,
      fill: "none",
      key: u
    }));
  }
  return a;
}
function Yc(e) {
  var {
    x: t,
    width: r,
    horizontal: a = !0,
    horizontalPoints: n
  } = e;
  if (!a || !n || !n.length)
    return null;
  var {
    xAxisId: i,
    yAxisId: l
  } = e, o = nt(e, Wc), c = n.map((u, s) => {
    var v = G(G({}, o), {}, {
      x1: t,
      y1: u,
      x2: t + r,
      y2: u,
      key: "line-".concat(s),
      index: s
    });
    return /* @__PURE__ */ d.createElement(za, {
      key: "line-".concat(s),
      option: a,
      lineItemProps: v
    });
  });
  return /* @__PURE__ */ d.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, c);
}
function Zc(e) {
  var {
    y: t,
    height: r,
    vertical: a = !0,
    verticalPoints: n
  } = e;
  if (!a || !n || !n.length)
    return null;
  var {
    xAxisId: i,
    yAxisId: l
  } = e, o = nt(e, Gc), c = n.map((u, s) => {
    var v = G(G({}, o), {}, {
      x1: u,
      y1: t,
      x2: u,
      y2: t + r,
      key: "line-".concat(s),
      index: s
    });
    return /* @__PURE__ */ d.createElement(za, {
      option: a,
      lineItemProps: v,
      key: "line-".concat(s)
    });
  });
  return /* @__PURE__ */ d.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, c);
}
function Uc(e) {
  var {
    horizontalFill: t,
    fillOpacity: r,
    x: a,
    y: n,
    width: i,
    height: l,
    horizontalPoints: o,
    horizontal: c = !0
  } = e;
  if (!c || !t || !t.length || o == null)
    return null;
  var u = o.map((v) => Math.round(v + n - n)).sort((v, f) => v - f);
  n !== u[0] && u.unshift(0);
  var s = u.map((v, f) => {
    var p = u[f + 1], h = p == null, y = h ? n + l - v : p - v;
    if (y <= 0)
      return null;
    var m = f % t.length;
    return /* @__PURE__ */ d.createElement("rect", {
      key: "react-".concat(f),
      y: v,
      x: a,
      height: y,
      width: i,
      stroke: "none",
      fill: t[m],
      fillOpacity: r,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ d.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, s);
}
function qc(e) {
  var {
    vertical: t = !0,
    verticalFill: r,
    fillOpacity: a,
    x: n,
    y: i,
    width: l,
    height: o,
    verticalPoints: c
  } = e;
  if (!t || !r || !r.length)
    return null;
  var u = c.map((v) => Math.round(v + n - n)).sort((v, f) => v - f);
  n !== u[0] && u.unshift(0);
  var s = u.map((v, f) => {
    var p = u[f + 1], h = p == null, y = h ? n + l - v : p - v;
    if (y <= 0)
      return null;
    var m = f % r.length;
    return /* @__PURE__ */ d.createElement("rect", {
      key: "react-".concat(f),
      x: v,
      y: i,
      width: y,
      height: o,
      stroke: "none",
      fill: r[m],
      fillOpacity: a,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ d.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, s);
}
var Jc = (e, t) => {
  var {
    xAxis: r,
    width: a,
    height: n,
    offset: i
  } = e;
  return ea(Yt(G(G(G({}, le), r), {}, {
    ticks: ta(r),
    viewBox: {
      x: 0,
      y: 0,
      width: a,
      height: n
    }
  })), i.left, i.left + i.width, t);
}, Qc = (e, t) => {
  var {
    yAxis: r,
    width: a,
    height: n,
    offset: i
  } = e;
  return ea(Yt(G(G(G({}, le), r), {}, {
    ticks: ta(r),
    viewBox: {
      x: 0,
      y: 0,
      width: a,
      height: n
    }
  })), i.top, i.top + i.height, t);
}, es = {
  horizontal: !0,
  vertical: !0,
  // The ordinates of horizontal grid lines
  horizontalPoints: [],
  // The abscissas of vertical grid lines
  verticalPoints: [],
  stroke: "#ccc",
  fill: "none",
  // The fill of colors of grid lines
  verticalFill: [],
  horizontalFill: [],
  xAxisId: 0,
  yAxisId: 0,
  syncWithTicks: !1,
  zIndex: pe.grid
};
function Ma(e) {
  var t = Jr(), r = Qr(), a = Rn(), n = G(G({}, he(e, es)), {}, {
    x: T(e.x) ? e.x : a.left,
    y: T(e.y) ? e.y : a.top,
    width: T(e.width) ? e.width : a.width,
    height: T(e.height) ? e.height : a.height
  }), {
    xAxisId: i,
    yAxisId: l,
    x: o,
    y: c,
    width: u,
    height: s,
    syncWithTicks: v,
    horizontalValues: f,
    verticalValues: p
  } = n, h = q(), y = L((S) => nr(S, "xAxis", i, h)), m = L((S) => nr(S, "yAxis", l, h));
  if (!et(u) || !et(s) || !T(o) || !T(c))
    return null;
  var g = n.verticalCoordinatesGenerator || Jc, P = n.horizontalCoordinatesGenerator || Qc, {
    horizontalPoints: w,
    verticalPoints: x
  } = n;
  if ((!w || !w.length) && typeof P == "function") {
    var b = f && f.length, O = P({
      yAxis: m ? G(G({}, m), {}, {
        ticks: b ? f : m.ticks
      }) : void 0,
      width: t ?? u,
      height: r ?? s,
      offset: a
    }, b ? !0 : v);
    ir(Array.isArray(O), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(typeof O, "]")), Array.isArray(O) && (w = O);
  }
  if ((!x || !x.length) && typeof g == "function") {
    var A = p && p.length, E = g({
      xAxis: y ? G(G({}, y), {}, {
        ticks: A ? p : y.ticks
      }) : void 0,
      width: t ?? u,
      height: r ?? s,
      offset: a
    }, A ? !0 : v);
    ir(Array.isArray(E), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(typeof E, "]")), Array.isArray(E) && (x = E);
  }
  return /* @__PURE__ */ d.createElement(me, {
    zIndex: n.zIndex
  }, /* @__PURE__ */ d.createElement("g", {
    className: "recharts-cartesian-grid"
  }, /* @__PURE__ */ d.createElement(Vc, {
    fill: n.fill,
    fillOpacity: n.fillOpacity,
    x: n.x,
    y: n.y,
    width: n.width,
    height: n.height,
    ry: n.ry
  }), /* @__PURE__ */ d.createElement(Uc, Ae({}, n, {
    horizontalPoints: w
  })), /* @__PURE__ */ d.createElement(qc, Ae({}, n, {
    verticalPoints: x
  })), /* @__PURE__ */ d.createElement(Yc, Ae({}, n, {
    offset: a,
    horizontalPoints: w,
    xAxis: y,
    yAxis: m
  })), /* @__PURE__ */ d.createElement(Zc, Ae({}, n, {
    offset: a,
    verticalPoints: x,
    xAxis: y,
    yAxis: m
  }))));
}
Ma.displayName = "CartesianGrid";
var ts = {}, Ra = re({
  name: "errorBars",
  initialState: ts,
  reducers: {
    addErrorBar: (e, t) => {
      var {
        itemId: r,
        errorBar: a
      } = t.payload;
      e[r] || (e[r] = []), e[r].push(a);
    },
    replaceErrorBar: (e, t) => {
      var {
        itemId: r,
        prev: a,
        next: n
      } = t.payload;
      e[r] && (e[r] = e[r].map((i) => i.dataKey === a.dataKey && i.direction === a.direction ? n : i));
    },
    removeErrorBar: (e, t) => {
      var {
        itemId: r,
        errorBar: a
      } = t.payload;
      e[r] && (e[r] = e[r].filter((n) => n.dataKey !== a.dataKey || n.direction !== a.direction));
    }
  }
}), {
  addErrorBar: kd,
  replaceErrorBar: Sd,
  removeErrorBar: Cd
} = Ra.actions, rs = Ra.reducer;
function Ba(e, t) {
  var r, a, n = L((u) => Bn(u, e)), i = L((u) => Wn(u, t)), l = (r = n?.allowDataOverflow) !== null && r !== void 0 ? r : z.allowDataOverflow, o = (a = i?.allowDataOverflow) !== null && a !== void 0 ? a : M.allowDataOverflow, c = l || o;
  return {
    needClip: c,
    needClipX: l,
    needClipY: o
  };
}
function as(e) {
  var {
    xAxisId: t,
    yAxisId: r,
    clipPathId: a
  } = e, n = Vt(), {
    needClipX: i,
    needClipY: l,
    needClip: o
  } = Ba(t, r);
  if (!o || !n)
    return null;
  var {
    x: c,
    y: u,
    width: s,
    height: v
  } = n;
  return /* @__PURE__ */ d.createElement("clipPath", {
    id: "clipPath-".concat(a)
  }, /* @__PURE__ */ d.createElement("rect", {
    x: i ? c : c - s / 2,
    y: l ? u : u - v / 2,
    width: i ? s : s * 2,
    height: l ? v : v * 2
  }));
}
function ns(e) {
  var t = Kt(e), r = 3, a = 2;
  if (t != null) {
    var {
      r: n,
      strokeWidth: i
    } = t, l = Number(n), o = Number(i);
    return (Number.isNaN(l) || l < 0) && (l = r), (Number.isNaN(o) || o < 0) && (o = a), {
      r: l,
      strokeWidth: o
    };
  }
  return {
    r,
    strokeWidth: a
  };
}
function Ut(e, t) {
  var r, a;
  return (r = (a = e.graphicalItems.cartesianItems.find((n) => n.id === t)) === null || a === void 0 ? void 0 : a.xAxisId) !== null && r !== void 0 ? r : Ta;
}
function qt(e, t) {
  var r, a;
  return (r = (a = e.graphicalItems.cartesianItems.find((n) => n.id === t)) === null || a === void 0 ? void 0 : a.yAxisId) !== null && r !== void 0 ? r : Ta;
}
var Wa = (e, t, r) => ra(e, "xAxis", Ut(e, t), r), Ga = (e, t, r) => aa(e, "xAxis", Ut(e, t), r), Ka = (e, t, r) => ra(e, "yAxis", qt(e, t), r), Fa = (e, t, r) => aa(e, "yAxis", qt(e, t), r), is = ce([ut, Wa, Ka, Ga, Fa], (e, t, r, a, n) => na(e, "xAxis") ? or(t, a, !1) : or(r, n, !1)), os = (e, t) => t, Ha = ce([Hn, os], (e, t) => e.filter((r) => r.type === "area").find((r) => r.id === t)), Xa = (e) => {
  var t = ut(e), r = na(t, "xAxis");
  return r ? "yAxis" : "xAxis";
}, ls = (e, t) => {
  var r = Xa(e);
  return r === "yAxis" ? qt(e, t) : Ut(e, t);
}, cs = (e, t, r) => Xn(e, Xa(e), ls(e, t), r), ss = ce([Ha, cs], (e, t) => {
  var r;
  if (!(e == null || t == null)) {
    var {
      stackId: a
    } = e, n = Fn(e);
    if (!(a == null || n == null)) {
      var i = (r = t[a]) === null || r === void 0 ? void 0 : r.stackedData, l = i?.find((o) => o.key === n);
      if (l != null)
        return l.map((o) => [o[0], o[1]]);
    }
  }
}), us = ce([ut, Wa, Ka, Ga, Fa, ss, Gn, is, Ha, Kn], (e, t, r, a, n, i, l, o, c, u) => {
  var {
    chartData: s,
    dataStartIndex: v,
    dataEndIndex: f
  } = l;
  if (!(c == null || e !== "horizontal" && e !== "vertical" || t == null || r == null || a == null || n == null || a.length === 0 || n.length === 0 || o == null)) {
    var {
      data: p
    } = c, h;
    if (p && p.length > 0 ? h = p : h = s?.slice(v, f + 1), h != null)
      return Is({
        layout: e,
        xAxis: t,
        yAxis: r,
        xAxisTicks: a,
        yAxisTicks: n,
        dataStartIndex: v,
        areaSettings: c,
        stackedData: i,
        displayedData: h,
        chartBaseValue: u,
        bandSize: o
      });
  }
}), ds = ["id"], vs = ["activeDot", "animationBegin", "animationDuration", "animationEasing", "connectNulls", "dot", "fill", "fillOpacity", "hide", "isAnimationActive", "legendType", "stroke", "xAxisId", "yAxisId"];
function ke() {
  return ke = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var a in r) ({}).hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
  }, ke.apply(null, arguments);
}
function Va(e, t) {
  if (e == null) return {};
  var r, a, n = fs(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++) r = i[a], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function fs(e, t) {
  if (e == null) return {};
  var r = {};
  for (var a in e) if ({}.hasOwnProperty.call(e, a)) {
    if (t.indexOf(a) !== -1) continue;
    r[a] = e[a];
  }
  return r;
}
function Tr(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(n) {
      return Object.getOwnPropertyDescriptor(e, n).enumerable;
    })), r.push.apply(r, a);
  }
  return r;
}
function $e(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Tr(Object(r), !0).forEach(function(a) {
      hs(e, a, r[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Tr(Object(r)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(r, a));
    });
  }
  return e;
}
function hs(e, t, r) {
  return (t = ps(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function ps(e) {
  var t = ms(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function ms(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var a = r.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function it(e, t) {
  return e && e !== "none" ? e : t;
}
var ys = (e) => {
  var {
    dataKey: t,
    name: r,
    stroke: a,
    fill: n,
    legendType: i,
    hide: l
  } = e;
  return [{
    inactive: l,
    dataKey: t,
    type: i,
    color: it(a, n),
    value: ia(r, t),
    payload: e
  }];
}, gs = /* @__PURE__ */ d.memo((e) => {
  var {
    dataKey: t,
    data: r,
    stroke: a,
    strokeWidth: n,
    fill: i,
    name: l,
    hide: o,
    unit: c,
    tooltipType: u,
    id: s
  } = e, v = {
    dataDefinedOnItem: r,
    getPosition: qr,
    settings: {
      stroke: a,
      strokeWidth: n,
      fill: i,
      dataKey: t,
      nameKey: void 0,
      name: ia(l, t),
      hide: o,
      type: u,
      color: it(a, i),
      unit: c,
      graphicalItemId: s
    }
  };
  return /* @__PURE__ */ d.createElement(hl, {
    tooltipEntrySettings: v
  });
});
function bs(e) {
  var {
    clipPathId: t,
    points: r,
    props: a
  } = e, {
    needClip: n,
    dot: i,
    dataKey: l
  } = a, o = ye(a);
  return /* @__PURE__ */ d.createElement(_l, {
    points: r,
    dot: i,
    className: "recharts-area-dots",
    dotClassName: "recharts-area-dot",
    dataKey: l,
    baseProps: o,
    needClip: n,
    clipPathId: t
  });
}
function xs(e) {
  var {
    showLabels: t,
    children: r,
    points: a
  } = e, n = a.map((i) => {
    var l, o, c = {
      x: (l = i.x) !== null && l !== void 0 ? l : 0,
      y: (o = i.y) !== null && o !== void 0 ? o : 0,
      width: 0,
      lowerWidth: 0,
      upperWidth: 0,
      height: 0
    };
    return $e($e({}, c), {}, {
      value: i.value,
      payload: i.payload,
      parentViewBox: void 0,
      viewBox: c,
      fill: void 0
    });
  });
  return /* @__PURE__ */ d.createElement(ll, {
    value: t ? n : void 0
  }, r);
}
function Dr(e) {
  var {
    points: t,
    baseLine: r,
    needClip: a,
    clipPathId: n,
    props: i
  } = e, {
    layout: l,
    type: o,
    stroke: c,
    connectNulls: u,
    isRange: s
  } = i, {
    id: v
  } = i, f = Va(i, ds), p = ye(f), h = Fe(f);
  return /* @__PURE__ */ d.createElement(d.Fragment, null, t?.length > 1 && /* @__PURE__ */ d.createElement(te, {
    clipPath: a ? "url(#clipPath-".concat(n, ")") : void 0
  }, /* @__PURE__ */ d.createElement(mt, ke({}, h, {
    id: v,
    points: t,
    connectNulls: u,
    type: o,
    baseLine: r,
    layout: l,
    stroke: "none",
    className: "recharts-area-area"
  })), c !== "none" && /* @__PURE__ */ d.createElement(mt, ke({}, p, {
    className: "recharts-area-curve",
    layout: l,
    type: o,
    connectNulls: u,
    fill: "none",
    points: t
  })), c !== "none" && s && Array.isArray(r) && /* @__PURE__ */ d.createElement(mt, ke({}, p, {
    className: "recharts-area-curve",
    layout: l,
    type: o,
    connectNulls: u,
    fill: "none",
    points: r
  }))), /* @__PURE__ */ d.createElement(bs, {
    points: t,
    props: f,
    clipPathId: n
  }));
}
function Ps(e) {
  var t, r, {
    alpha: a,
    baseLine: n,
    points: i,
    strokeWidth: l
  } = e, o = (t = i[0]) === null || t === void 0 ? void 0 : t.y, c = (r = i[i.length - 1]) === null || r === void 0 ? void 0 : r.y;
  if (!Se(o) || !Se(c))
    return null;
  var u = a * Math.abs(o - c), s = Math.max(...i.map((v) => v.x || 0));
  return T(n) ? s = Math.max(n, s) : n && Array.isArray(n) && n.length && (s = Math.max(...n.map((v) => v.x || 0), s)), T(s) ? /* @__PURE__ */ d.createElement("rect", {
    x: 0,
    y: o < c ? o : o - u,
    width: s + (l ? parseInt("".concat(l), 10) : 1),
    height: Math.floor(u)
  }) : null;
}
function ws(e) {
  var t, r, {
    alpha: a,
    baseLine: n,
    points: i,
    strokeWidth: l
  } = e, o = (t = i[0]) === null || t === void 0 ? void 0 : t.x, c = (r = i[i.length - 1]) === null || r === void 0 ? void 0 : r.x;
  if (!Se(o) || !Se(c))
    return null;
  var u = a * Math.abs(o - c), s = Math.max(...i.map((v) => v.y || 0));
  return T(n) ? s = Math.max(n, s) : n && Array.isArray(n) && n.length && (s = Math.max(...n.map((v) => v.y || 0), s)), T(s) ? /* @__PURE__ */ d.createElement("rect", {
    x: o < c ? o : o - u,
    y: 0,
    width: u,
    height: Math.floor(s + (l ? parseInt("".concat(l), 10) : 1))
  }) : null;
}
function Os(e) {
  var {
    alpha: t,
    layout: r,
    points: a,
    baseLine: n,
    strokeWidth: i
  } = e;
  return r === "vertical" ? /* @__PURE__ */ d.createElement(Ps, {
    alpha: t,
    points: a,
    baseLine: n,
    strokeWidth: i
  }) : /* @__PURE__ */ d.createElement(ws, {
    alpha: t,
    points: a,
    baseLine: n,
    strokeWidth: i
  });
}
function As(e) {
  var {
    needClip: t,
    clipPathId: r,
    props: a,
    previousPointsRef: n,
    previousBaselineRef: i
  } = e, {
    points: l,
    baseLine: o,
    isAnimationActive: c,
    animationBegin: u,
    animationDuration: s,
    animationEasing: v,
    onAnimationStart: f,
    onAnimationEnd: p
  } = a, h = Ke(() => ({
    points: l,
    baseLine: o
  }), [l, o]), y = Un(h, "recharts-area-"), m = Ft(), [g, P] = ee(!1), w = !g, x = D(() => {
    typeof p == "function" && p(), P(!1);
  }, [p]), b = D(() => {
    typeof f == "function" && f(), P(!0);
  }, [f]);
  if (m == null)
    return null;
  var O = n.current, A = i.current;
  return /* @__PURE__ */ d.createElement(xs, {
    showLabels: w,
    points: l
  }, a.children, /* @__PURE__ */ d.createElement(qn, {
    animationId: y,
    begin: u,
    duration: s,
    isActive: c,
    easing: v,
    onAnimationEnd: x,
    onAnimationStart: b,
    key: y
  }, (E) => {
    if (O) {
      var S = O.length / l.length, $ = (
        /*
         * Here it is important that at the very end of the animation, on the last frame,
         * we render the original points without any interpolation.
         * This is needed because the code above is checking for reference equality to decide if the animation should run
         * and if we create a new array instance (even if the numbers were the same)
         * then we would break animations.
         */
        E === 1 ? l : l.map((k, R) => {
          var ae = Math.floor(R * S);
          if (O[ae]) {
            var J = O[ae];
            return $e($e({}, k), {}, {
              x: Te(J.x, k.x, E),
              y: Te(J.y, k.y, E)
            });
          }
          return k;
        })
      ), j;
      return T(o) ? j = Te(A, o, E) : U(o) || Ot(o) ? j = Te(A, 0, E) : j = o.map((k, R) => {
        var ae = Math.floor(R * S);
        if (Array.isArray(A) && A[ae]) {
          var J = A[ae];
          return $e($e({}, k), {}, {
            x: Te(J.x, k.x, E),
            y: Te(J.y, k.y, E)
          });
        }
        return k;
      }), E > 0 && (n.current = $, i.current = j), /* @__PURE__ */ d.createElement(Dr, {
        points: $,
        baseLine: j,
        needClip: t,
        clipPathId: r,
        props: a
      });
    }
    return E > 0 && (n.current = l, i.current = o), /* @__PURE__ */ d.createElement(te, null, c && /* @__PURE__ */ d.createElement("defs", null, /* @__PURE__ */ d.createElement("clipPath", {
      id: "animationClipPath-".concat(r)
    }, /* @__PURE__ */ d.createElement(Os, {
      alpha: E,
      points: l,
      baseLine: o,
      layout: m,
      strokeWidth: a.strokeWidth
    }))), /* @__PURE__ */ d.createElement(te, {
      clipPath: "url(#animationClipPath-".concat(r, ")")
    }, /* @__PURE__ */ d.createElement(Dr, {
      points: l,
      baseLine: o,
      needClip: t,
      clipPathId: r,
      props: a
    })));
  }), /* @__PURE__ */ d.createElement(ul, {
    label: a.label
  }));
}
function Es(e) {
  var {
    needClip: t,
    clipPathId: r,
    props: a
  } = e, n = H(null), i = H();
  return /* @__PURE__ */ d.createElement(As, {
    needClip: t,
    clipPathId: r,
    props: a,
    previousPointsRef: n,
    previousBaselineRef: i
  });
}
class ks extends gn {
  render() {
    var {
      hide: t,
      dot: r,
      points: a,
      className: n,
      top: i,
      left: l,
      needClip: o,
      xAxisId: c,
      yAxisId: u,
      width: s,
      height: v,
      id: f,
      baseLine: p,
      zIndex: h
    } = this.props;
    if (t)
      return null;
    var y = F("recharts-area", n), m = f, {
      r: g,
      strokeWidth: P
    } = ns(r), w = ja(r), x = g * 2 + P, b = o ? "url(#clipPath-".concat(w ? "" : "dots-").concat(m, ")") : void 0;
    return /* @__PURE__ */ d.createElement(me, {
      zIndex: h
    }, /* @__PURE__ */ d.createElement(te, {
      className: y
    }, o && /* @__PURE__ */ d.createElement("defs", null, /* @__PURE__ */ d.createElement(as, {
      clipPathId: m,
      xAxisId: c,
      yAxisId: u
    }), !w && /* @__PURE__ */ d.createElement("clipPath", {
      id: "clipPath-dots-".concat(m)
    }, /* @__PURE__ */ d.createElement("rect", {
      x: l - x / 2,
      y: i - x / 2,
      width: s + x,
      height: v + x
    }))), /* @__PURE__ */ d.createElement(Es, {
      needClip: o,
      clipPathId: m,
      props: this.props
    })), /* @__PURE__ */ d.createElement(kr, {
      points: a,
      mainColor: it(this.props.stroke, this.props.fill),
      itemDataKey: this.props.dataKey,
      activeDot: this.props.activeDot,
      clipPath: b
    }), this.props.isRange && Array.isArray(p) && /* @__PURE__ */ d.createElement(kr, {
      points: p,
      mainColor: it(this.props.stroke, this.props.fill),
      itemDataKey: this.props.dataKey,
      activeDot: this.props.activeDot,
      clipPath: b
    }));
  }
}
var Ss = {
  activeDot: !0,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  connectNulls: !1,
  dot: !1,
  fill: "#3182bd",
  fillOpacity: 0.6,
  hide: !1,
  isAnimationActive: "auto",
  legendType: "line",
  stroke: "#3182bd",
  strokeWidth: 1,
  type: "linear",
  label: !1,
  xAxisId: 0,
  yAxisId: 0,
  zIndex: pe.area
};
function Cs(e) {
  var t, {
    activeDot: r,
    animationBegin: a,
    animationDuration: n,
    animationEasing: i,
    connectNulls: l,
    dot: o,
    fill: c,
    fillOpacity: u,
    hide: s,
    isAnimationActive: v,
    legendType: f,
    stroke: p,
    xAxisId: h,
    yAxisId: y
  } = e, m = Va(e, vs), g = Yn(), P = Zn(), {
    needClip: w
  } = Ba(h, y), x = q(), {
    points: b,
    isRange: O,
    baseLine: A
  } = (t = L((R) => us(R, e.id, x))) !== null && t !== void 0 ? t : {}, E = Vt();
  if (g !== "horizontal" && g !== "vertical" || E == null || P !== "AreaChart" && P !== "ComposedChart")
    return null;
  var {
    height: S,
    width: $,
    x: j,
    y: k
  } = E;
  return !b || !b.length ? null : /* @__PURE__ */ d.createElement(ks, ke({}, m, {
    activeDot: r,
    animationBegin: a,
    animationDuration: n,
    animationEasing: i,
    baseLine: A,
    connectNulls: l,
    dot: o,
    fill: c,
    fillOpacity: u,
    height: S,
    hide: s,
    layout: g,
    isAnimationActive: v,
    isRange: O,
    legendType: f,
    needClip: w,
    points: b,
    stroke: p,
    width: $,
    left: j,
    top: k,
    xAxisId: h,
    yAxisId: y
  }));
}
var js = (e, t, r, a, n) => {
  var i = r ?? t;
  if (T(i))
    return i;
  var l = e === "horizontal" ? n : a, o = l.scale.domain();
  if (l.type === "number") {
    var c = Math.max(o[0], o[1]), u = Math.min(o[0], o[1]);
    return i === "dataMin" ? u : i === "dataMax" || c < 0 ? c : Math.max(Math.min(o[0], o[1]), 0);
  }
  return i === "dataMin" ? o[0] : i === "dataMax" ? o[1] : o[0];
};
function Is(e) {
  var {
    areaSettings: {
      connectNulls: t,
      baseValue: r,
      dataKey: a
    },
    stackedData: n,
    layout: i,
    chartBaseValue: l,
    xAxis: o,
    yAxis: c,
    displayedData: u,
    dataStartIndex: s,
    xAxisTicks: v,
    yAxisTicks: f,
    bandSize: p
  } = e, h = n && n.length, y = js(i, l, r, o, c), m = i === "horizontal", g = !1, P = u.map((x, b) => {
    var O, A, E, S;
    if (h)
      S = n[s + b];
    else {
      var $ = Et(x, a);
      Array.isArray($) ? (S = $, g = !0) : S = [y, $];
    }
    var j = (O = (A = S) === null || A === void 0 ? void 0 : A[1]) !== null && O !== void 0 ? O : null, k = j == null || h && !t && Et(x, a) == null;
    if (m) {
      var R;
      return {
        x: lr({
          axis: o,
          ticks: v,
          bandSize: p,
          entry: x,
          index: b
        }),
        y: k ? null : (R = c.scale.map(j)) !== null && R !== void 0 ? R : null,
        value: S,
        payload: x
      };
    }
    return {
      x: k ? null : (E = o.scale.map(j)) !== null && E !== void 0 ? E : null,
      y: lr({
        axis: c,
        ticks: f,
        bandSize: p,
        entry: x,
        index: b
      }),
      value: S,
      payload: x
    };
  }), w;
  return h || g ? w = P.map((x) => {
    var b, O = Array.isArray(x.value) ? x.value[0] : null;
    if (m) {
      var A;
      return {
        x: x.x,
        y: O != null && x.y != null && (A = c.scale.map(O)) !== null && A !== void 0 ? A : null,
        payload: x.payload
      };
    }
    return {
      x: O != null && (b = o.scale.map(O)) !== null && b !== void 0 ? b : null,
      y: x.y,
      payload: x.payload
    };
  }) : w = m ? c.scale.map(y) : o.scale.map(y), {
    points: P,
    baseLine: w ?? 0,
    isRange: g
  };
}
function Ts(e) {
  var t = he(e, Ss), r = q();
  return /* @__PURE__ */ d.createElement(xl, {
    id: t.id,
    type: "area"
  }, (a) => /* @__PURE__ */ d.createElement(d.Fragment, null, /* @__PURE__ */ d.createElement(pl, {
    legendPayload: ys(t)
  }), /* @__PURE__ */ d.createElement(gs, {
    dataKey: t.dataKey,
    data: t.data,
    stroke: t.stroke,
    strokeWidth: t.strokeWidth,
    fill: t.fill,
    name: t.name,
    hide: t.hide,
    unit: t.unit,
    tooltipType: t.tooltipType,
    id: a
  }), /* @__PURE__ */ d.createElement(Sl, {
    type: "area",
    id: a,
    data: t.data,
    dataKey: t.dataKey,
    xAxisId: t.xAxisId,
    yAxisId: t.yAxisId,
    zAxisId: 0,
    stackId: Vn(t.stackId),
    hide: t.hide,
    barSize: void 0,
    baseValue: t.baseValue,
    isPanorama: r,
    connectNulls: t.connectNulls
  }), /* @__PURE__ */ d.createElement(Cs, ke({}, t, {
    id: a
  }))));
}
var Tt = /* @__PURE__ */ d.memo(Ts, dt);
Tt.displayName = "Area";
var Ds = ["domain", "range"], Ns = ["domain", "range"];
function Nr(e, t) {
  if (e == null) return {};
  var r, a, n = Ls(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++) r = i[a], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Ls(e, t) {
  if (e == null) return {};
  var r = {};
  for (var a in e) if ({}.hasOwnProperty.call(e, a)) {
    if (t.indexOf(a) !== -1) continue;
    r[a] = e[a];
  }
  return r;
}
function Lr(e, t) {
  return e === t ? !0 : Array.isArray(e) && e.length === 2 && Array.isArray(t) && t.length === 2 ? e[0] === t[0] && e[1] === t[1] : !1;
}
function Ya(e, t) {
  if (e === t)
    return !0;
  var {
    domain: r,
    range: a
  } = e, n = Nr(e, Ds), {
    domain: i,
    range: l
  } = t, o = Nr(t, Ns);
  return !Lr(r, i) || !Lr(a, l) ? !1 : dt(n, o);
}
var $s = ["type"], _s = ["dangerouslySetInnerHTML", "ticks", "scale"], zs = ["id", "scale"];
function Dt() {
  return Dt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var a in r) ({}).hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
  }, Dt.apply(null, arguments);
}
function $r(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(n) {
      return Object.getOwnPropertyDescriptor(e, n).enumerable;
    })), r.push.apply(r, a);
  }
  return r;
}
function _r(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? $r(Object(r), !0).forEach(function(a) {
      Ms(e, a, r[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : $r(Object(r)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(r, a));
    });
  }
  return e;
}
function Ms(e, t, r) {
  return (t = Rs(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Rs(e) {
  var t = Bs(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Bs(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var a = r.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Nt(e, t) {
  if (e == null) return {};
  var r, a, n = Ws(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++) r = i[a], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Ws(e, t) {
  if (e == null) return {};
  var r = {};
  for (var a in e) if ({}.hasOwnProperty.call(e, a)) {
    if (t.indexOf(a) !== -1) continue;
    r[a] = e[a];
  }
  return r;
}
function Gs(e) {
  var t = X(), r = H(null), a = Ft(), {
    type: n
  } = e, i = Nt(e, $s), l = ca(a, "xAxis", n), o = Ke(() => {
    if (l != null)
      return _r(_r({}, i), {}, {
        type: l
      });
  }, [i, l]);
  return Z(() => {
    o != null && (r.current === null ? t(Wl(o)) : r.current !== o && t(Gl({
      prev: r.current,
      next: o
    })), r.current = o);
  }, [o, t]), Z(() => () => {
    r.current && (t(Kl(r.current)), r.current = null);
  }, [t]), null;
}
var Ks = (e) => {
  var {
    xAxisId: t,
    className: r
  } = e, a = L(oa), n = q(), i = "xAxis", l = L((g) => la(g, i, t, n)), o = L((g) => Jn(g, t)), c = L((g) => Qn(g, t)), u = L((g) => ei(g, t));
  if (o == null || c == null || u == null)
    return null;
  var {
    dangerouslySetInnerHTML: s,
    ticks: v,
    scale: f
  } = e, p = Nt(e, _s), {
    id: h,
    scale: y
  } = u, m = Nt(u, zs);
  return /* @__PURE__ */ d.createElement(Zt, Dt({}, p, m, {
    x: c.x,
    y: c.y,
    width: o.width,
    height: o.height,
    className: F("recharts-".concat(i, " ").concat(i), r),
    viewBox: a,
    ticks: l,
    axisType: i,
    axisId: t
  }));
}, Fs = {
  allowDataOverflow: z.allowDataOverflow,
  allowDecimals: z.allowDecimals,
  allowDuplicatedCategory: z.allowDuplicatedCategory,
  angle: z.angle,
  axisLine: le.axisLine,
  height: z.height,
  hide: !1,
  includeHidden: z.includeHidden,
  interval: z.interval,
  label: !1,
  minTickGap: z.minTickGap,
  mirror: z.mirror,
  orientation: z.orientation,
  padding: z.padding,
  reversed: z.reversed,
  scale: z.scale,
  tick: z.tick,
  tickCount: z.tickCount,
  tickLine: le.tickLine,
  tickSize: le.tickSize,
  type: z.type,
  niceTicks: z.niceTicks,
  xAxisId: 0
}, Hs = (e) => {
  var t = he(e, Fs);
  return /* @__PURE__ */ d.createElement(d.Fragment, null, /* @__PURE__ */ d.createElement(Gs, {
    allowDataOverflow: t.allowDataOverflow,
    allowDecimals: t.allowDecimals,
    allowDuplicatedCategory: t.allowDuplicatedCategory,
    angle: t.angle,
    dataKey: t.dataKey,
    domain: t.domain,
    height: t.height,
    hide: t.hide,
    id: t.xAxisId,
    includeHidden: t.includeHidden,
    interval: t.interval,
    minTickGap: t.minTickGap,
    mirror: t.mirror,
    name: t.name,
    orientation: t.orientation,
    padding: t.padding,
    reversed: t.reversed,
    scale: t.scale,
    tick: t.tick,
    tickCount: t.tickCount,
    tickFormatter: t.tickFormatter,
    ticks: t.ticks,
    type: t.type,
    unit: t.unit,
    niceTicks: t.niceTicks
  }), /* @__PURE__ */ d.createElement(Ks, t));
}, Za = /* @__PURE__ */ d.memo(Hs, Ya);
Za.displayName = "XAxis";
var Xs = ["type"], Vs = ["dangerouslySetInnerHTML", "ticks", "scale"], Ys = ["id", "scale"];
function Lt() {
  return Lt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var a in r) ({}).hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
  }, Lt.apply(null, arguments);
}
function zr(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(n) {
      return Object.getOwnPropertyDescriptor(e, n).enumerable;
    })), r.push.apply(r, a);
  }
  return r;
}
function Mr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zr(Object(r), !0).forEach(function(a) {
      Zs(e, a, r[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : zr(Object(r)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(r, a));
    });
  }
  return e;
}
function Zs(e, t, r) {
  return (t = Us(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Us(e) {
  var t = qs(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function qs(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var a = r.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function $t(e, t) {
  if (e == null) return {};
  var r, a, n = Js(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++) r = i[a], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Js(e, t) {
  if (e == null) return {};
  var r = {};
  for (var a in e) if ({}.hasOwnProperty.call(e, a)) {
    if (t.indexOf(a) !== -1) continue;
    r[a] = e[a];
  }
  return r;
}
function Qs(e) {
  var t = X(), r = H(null), a = Ft(), {
    type: n
  } = e, i = $t(e, Xs), l = ca(a, "yAxis", n), o = Ke(() => {
    if (l != null)
      return Mr(Mr({}, i), {}, {
        type: l
      });
  }, [l, i]);
  return Z(() => {
    o != null && (r.current === null ? t(Fl(o)) : r.current !== o && t(Hl({
      prev: r.current,
      next: o
    })), r.current = o);
  }, [o, t]), Z(() => () => {
    r.current && (t(Xl(r.current)), r.current = null);
  }, [t]), null;
}
function eu(e) {
  var {
    yAxisId: t,
    className: r,
    width: a,
    label: n
  } = e, i = H(null), l = H(null), o = L(oa), c = q(), u = X(), s = "yAxis", v = L((O) => ti(O, t)), f = L((O) => ri(O, t)), p = L((O) => la(O, s, t, c)), h = L((O) => ai(O, t));
  if (Z(() => {
    if (!(a !== "auto" || !v || Xt(n) || /* @__PURE__ */ Ee(n) || h == null)) {
      var O = i.current;
      if (O) {
        var A = O.getCalculatedWidth();
        Math.round(v.width) !== Math.round(A) && u(Vl({
          id: t,
          width: A
        }));
      }
    }
  }, [
    // The dependency on cartesianAxisRef.current is not needed because useLayoutEffect will run after every render.
    // The ref will be populated by then.
    // To re-run this effect when ticks change, we can depend on the ticks array from the store.
    p,
    v,
    u,
    n,
    t,
    a,
    h
  ]), v == null || f == null || h == null)
    return null;
  var {
    dangerouslySetInnerHTML: y,
    ticks: m,
    scale: g
  } = e, P = $t(e, Vs), {
    id: w,
    scale: x
  } = h, b = $t(h, Ys);
  return /* @__PURE__ */ d.createElement(Zt, Lt({}, P, b, {
    ref: i,
    labelRef: l,
    x: f.x,
    y: f.y,
    tickTextProps: a === "auto" ? {
      width: void 0
    } : {
      width: a
    },
    width: v.width,
    height: v.height,
    className: F("recharts-".concat(s, " ").concat(s), r),
    viewBox: o,
    ticks: p,
    axisType: s,
    axisId: t
  }));
}
var tu = {
  allowDataOverflow: M.allowDataOverflow,
  allowDecimals: M.allowDecimals,
  allowDuplicatedCategory: M.allowDuplicatedCategory,
  angle: M.angle,
  axisLine: le.axisLine,
  hide: !1,
  includeHidden: M.includeHidden,
  interval: M.interval,
  label: !1,
  minTickGap: M.minTickGap,
  mirror: M.mirror,
  orientation: M.orientation,
  padding: M.padding,
  reversed: M.reversed,
  scale: M.scale,
  tick: M.tick,
  tickCount: M.tickCount,
  tickLine: le.tickLine,
  tickSize: le.tickSize,
  type: M.type,
  niceTicks: M.niceTicks,
  width: M.width,
  yAxisId: 0
}, ru = (e) => {
  var t = he(e, tu);
  return /* @__PURE__ */ d.createElement(d.Fragment, null, /* @__PURE__ */ d.createElement(Qs, {
    interval: t.interval,
    id: t.yAxisId,
    scale: t.scale,
    type: t.type,
    domain: t.domain,
    allowDataOverflow: t.allowDataOverflow,
    dataKey: t.dataKey,
    allowDuplicatedCategory: t.allowDuplicatedCategory,
    allowDecimals: t.allowDecimals,
    tickCount: t.tickCount,
    padding: t.padding,
    includeHidden: t.includeHidden,
    reversed: t.reversed,
    ticks: t.ticks,
    width: t.width,
    orientation: t.orientation,
    mirror: t.mirror,
    hide: t.hide,
    unit: t.unit,
    name: t.name,
    angle: t.angle,
    minTickGap: t.minTickGap,
    tick: t.tick,
    tickFormatter: t.tickFormatter,
    niceTicks: t.niceTicks
  }), /* @__PURE__ */ d.createElement(eu, t));
}, Ua = /* @__PURE__ */ d.memo(ru, Ya);
Ua.displayName = "YAxis";
var au = (e, t) => t, Jt = ce([au, ut, Xr, ni, ii, sa, oi, Zr], li);
function nu(e) {
  return "getBBox" in e.currentTarget && typeof e.currentTarget.getBBox == "function";
}
function Qt(e) {
  var t = e.currentTarget.getBoundingClientRect(), r, a;
  if (nu(e)) {
    var n = e.currentTarget.getBBox();
    r = n.width > 0 ? t.width / n.width : 1, a = n.height > 0 ? t.height / n.height : 1;
  } else {
    var i = e.currentTarget;
    r = i.offsetWidth > 0 ? t.width / i.offsetWidth : 1, a = i.offsetHeight > 0 ? t.height / i.offsetHeight : 1;
  }
  var l = (o, c) => ({
    /*
     * Here it's important to use:
     * - event.clientX and event.clientY to get the mouse position relative to the viewport, including scroll.
     * - pageX and pageY are not used because they are relative to the whole document, and ignore scroll.
     * - rect.left and rect.top are used to get the position of the chart relative to the viewport.
     * - offsetX and offsetY are not used because they are relative to the offset parent
     *  which may or may not be the same as the clientX and clientY, depending on the position of the chart in the DOM
     *  and surrounding element styles. CSS position: relative, absolute, fixed, will change the offset parent.
     * - scaleX and scaleY are necessary for when the chart element is scaled using CSS `transform: scale(N)`.
     */
    relativeX: Math.round((o - t.left) / r),
    relativeY: Math.round((c - t.top) / a)
  });
  return "touches" in e ? Array.from(e.touches).map((o) => l(o.clientX, o.clientY)) : l(e.clientX, e.clientY);
}
var qa = Ie("mouseClick"), Ja = He();
Ja.startListening({
  actionCreator: qa,
  effect: (e, t) => {
    var r = e.payload, a = Jt(t.getState(), Qt(r));
    a?.activeIndex != null && t.dispatch(ci({
      activeIndex: a.activeIndex,
      activeDataKey: void 0,
      activeCoordinate: a.activeCoordinate
    }));
  }
});
var _t = Ie("mouseMove"), Qa = He(), De = null, be = null, Pt = null;
Qa.startListening({
  actionCreator: _t,
  effect: (e, t) => {
    var r = e.payload, a = t.getState(), {
      throttleDelay: n,
      throttledEvents: i
    } = a.eventSettings, l = i === "all" || i?.includes("mousemove");
    De !== null && (cancelAnimationFrame(De), De = null), be !== null && (typeof n != "number" || !l) && (clearTimeout(be), be = null), Pt = Qt(r);
    var o = () => {
      var c = t.getState(), u = ua(c, c.tooltip.settings.shared);
      if (!Pt) {
        De = null, be = null;
        return;
      }
      if (u === "axis") {
        var s = Jt(c, Pt);
        s?.activeIndex != null ? t.dispatch(da({
          activeIndex: s.activeIndex,
          activeDataKey: void 0,
          activeCoordinate: s.activeCoordinate
        })) : t.dispatch(va());
      }
      De = null, be = null;
    };
    if (!l) {
      o();
      return;
    }
    n === "raf" ? De = requestAnimationFrame(o) : typeof n == "number" && be === null && (be = setTimeout(o, n));
  }
});
function iu(e, t) {
  return t instanceof HTMLElement ? "HTMLElement <".concat(t.tagName, ' class="').concat(t.className, '">') : t === window ? "global.window" : e === "children" && typeof t == "object" && t !== null ? "<<CHILDREN>>" : t;
}
var Rr = {
  accessibilityLayer: !0,
  barCategoryGap: "10%",
  barGap: 4,
  barSize: void 0,
  className: void 0,
  maxBarSize: void 0,
  stackOffset: "none",
  syncId: void 0,
  syncMethod: "index",
  baseValue: void 0,
  reverseStackOrder: !1
}, en = re({
  name: "rootProps",
  initialState: Rr,
  reducers: {
    updateOptions: (e, t) => {
      var r;
      e.accessibilityLayer = t.payload.accessibilityLayer, e.barCategoryGap = t.payload.barCategoryGap, e.barGap = (r = t.payload.barGap) !== null && r !== void 0 ? r : Rr.barGap, e.barSize = t.payload.barSize, e.maxBarSize = t.payload.maxBarSize, e.stackOffset = t.payload.stackOffset, e.syncId = t.payload.syncId, e.syncMethod = t.payload.syncMethod, e.className = t.payload.className, e.baseValue = t.payload.baseValue, e.reverseStackOrder = t.payload.reverseStackOrder;
    }
  }
}), ou = en.reducer, {
  updateOptions: lu
} = en.actions, cu = null, su = {
  updatePolarOptions: (e, t) => e === null ? t.payload : (e.startAngle = t.payload.startAngle, e.endAngle = t.payload.endAngle, e.cx = t.payload.cx, e.cy = t.payload.cy, e.innerRadius = t.payload.innerRadius, e.outerRadius = t.payload.outerRadius, e)
}, tn = re({
  name: "polarOptions",
  initialState: cu,
  reducers: su
}), {
  updatePolarOptions: jd
} = tn.actions, uu = tn.reducer, rn = Ie("keyDown"), an = Ie("focus"), nn = Ie("blur"), vt = He(), Ne = null, xe = null, Ze = null;
vt.startListening({
  actionCreator: rn,
  effect: (e, t) => {
    Ze = e.payload, Ne !== null && (cancelAnimationFrame(Ne), Ne = null);
    var r = t.getState(), {
      throttleDelay: a,
      throttledEvents: n
    } = r.eventSettings, i = n === "all" || n.includes("keydown");
    xe !== null && (typeof a != "number" || !i) && (clearTimeout(xe), xe = null);
    var l = () => {
      try {
        var o = t.getState(), c = o.rootProps.accessibilityLayer !== !1;
        if (!c)
          return;
        var {
          keyboardInteraction: u
        } = o.tooltip, s = Ze;
        if (s !== "ArrowRight" && s !== "ArrowLeft" && s !== "Enter")
          return;
        var v = si(u, ui(o), di(o), vi(o)), f = v == null ? -1 : Number(v);
        if (!Number.isFinite(f) || f < 0)
          return;
        var p = sa(o);
        if (s === "Enter") {
          var h = St(o, "axis", "hover", String(u.index));
          t.dispatch(tt({
            active: !u.active,
            activeIndex: u.index,
            activeCoordinate: h
          }));
          return;
        }
        var y = fi(o), m = y === "left-to-right" ? 1 : -1, g = s === "ArrowRight" ? 1 : -1, P = f + g * m;
        if (p == null || P >= p.length || P < 0)
          return;
        var w = St(o, "axis", "hover", String(P));
        t.dispatch(tt({
          active: !0,
          activeIndex: P.toString(),
          activeCoordinate: w
        }));
      } finally {
        Ne = null, xe = null;
      }
    };
    if (!i) {
      l();
      return;
    }
    a === "raf" ? Ne = requestAnimationFrame(l) : typeof a == "number" && xe === null && (l(), Ze = null, xe = setTimeout(() => {
      Ze ? l() : (xe = null, Ne = null);
    }, a));
  }
});
vt.startListening({
  actionCreator: an,
  effect: (e, t) => {
    var r = t.getState(), a = r.rootProps.accessibilityLayer !== !1;
    if (a) {
      var {
        keyboardInteraction: n
      } = r.tooltip;
      if (!n.active && n.index == null) {
        var i = "0", l = St(r, "axis", "hover", String(i));
        t.dispatch(tt({
          active: !0,
          activeIndex: i,
          activeCoordinate: l
        }));
      }
    }
  }
});
vt.startListening({
  actionCreator: nn,
  effect: (e, t) => {
    var r = t.getState(), a = r.rootProps.accessibilityLayer !== !1;
    if (a) {
      var {
        keyboardInteraction: n
      } = r.tooltip;
      n.active && t.dispatch(tt({
        active: !1,
        activeIndex: n.index,
        activeCoordinate: n.coordinate
      }));
    }
  }
});
function on(e) {
  e.persist();
  var {
    currentTarget: t
  } = e;
  return new Proxy(e, {
    get: (r, a) => {
      if (a === "currentTarget")
        return t;
      var n = Reflect.get(r, a);
      return typeof n == "function" ? n.bind(r) : n;
    }
  });
}
var Y = Ie("externalEvent"), ln = He(), Ue = /* @__PURE__ */ new Map(), Me = /* @__PURE__ */ new Map(), wt = /* @__PURE__ */ new Map();
ln.startListening({
  actionCreator: Y,
  effect: (e, t) => {
    var {
      handler: r,
      reactEvent: a
    } = e.payload;
    if (r != null) {
      var n = a.type, i = on(a);
      wt.set(n, {
        handler: r,
        reactEvent: i
      });
      var l = Ue.get(n);
      l !== void 0 && (cancelAnimationFrame(l), Ue.delete(n));
      var o = t.getState(), {
        throttleDelay: c,
        throttledEvents: u
      } = o.eventSettings, s = u, v = s === "all" || s?.includes(n), f = Me.get(n);
      f !== void 0 && (typeof c != "number" || !v) && (clearTimeout(f), Me.delete(n));
      var p = () => {
        var m = wt.get(n);
        try {
          if (!m)
            return;
          var {
            handler: g,
            reactEvent: P
          } = m, w = t.getState(), x = {
            activeCoordinate: yi(w),
            activeDataKey: mi(w),
            activeIndex: kt(w),
            activeLabel: pi(w),
            activeTooltipIndex: kt(w),
            isTooltipActive: hi(w)
          };
          g && g(x, P);
        } finally {
          Ue.delete(n), Me.delete(n), wt.delete(n);
        }
      };
      if (!v) {
        p();
        return;
      }
      if (c === "raf") {
        var h = requestAnimationFrame(p);
        Ue.set(n, h);
      } else if (typeof c == "number") {
        if (!Me.has(n)) {
          p();
          var y = setTimeout(p, c);
          Me.set(n, y);
        }
      } else
        p();
    }
  }
});
var du = ce([gi], (e) => e.tooltipItemPayloads), vu = ce([du, (e, t) => t, (e, t, r) => r], (e, t, r) => {
  if (t != null) {
    var a = e.find((i) => i.settings.graphicalItemId === r);
    if (a != null) {
      var {
        getPosition: n
      } = a;
      if (n != null)
        return n(t);
    }
  }
}), cn = Ie("touchMove"), sn = He(), Pe = null, de = null, Br = null, Re = null;
sn.startListening({
  actionCreator: cn,
  effect: (e, t) => {
    var r = e.payload;
    if (!(r.touches == null || r.touches.length === 0)) {
      Re = on(r);
      var a = t.getState(), {
        throttleDelay: n,
        throttledEvents: i
      } = a.eventSettings, l = i === "all" || i.includes("touchmove");
      Pe !== null && (cancelAnimationFrame(Pe), Pe = null), de !== null && (typeof n != "number" || !l) && (clearTimeout(de), de = null), Br = Array.from(r.touches).map((c) => Qt({
        clientX: c.clientX,
        clientY: c.clientY,
        currentTarget: r.currentTarget
      }));
      var o = () => {
        if (Re != null) {
          var c = t.getState(), u = ua(c, c.tooltip.settings.shared);
          if (u === "axis") {
            var s, v = (s = Br) === null || s === void 0 ? void 0 : s[0];
            if (v == null) {
              Pe = null, de = null;
              return;
            }
            var f = Jt(c, v);
            f?.activeIndex != null && t.dispatch(da({
              activeIndex: f.activeIndex,
              activeDataKey: void 0,
              activeCoordinate: f.activeCoordinate
            }));
          } else if (u === "item") {
            var p, h = Re.touches[0];
            if (document.elementFromPoint == null || h == null)
              return;
            var y = document.elementFromPoint(h.clientX, h.clientY);
            if (!y || !y.getAttribute)
              return;
            var m = y.getAttribute(bi), g = (p = y.getAttribute(xi)) !== null && p !== void 0 ? p : void 0, P = Pi(c).find((b) => b.id === g);
            if (m == null || P == null || g == null)
              return;
            var {
              dataKey: w
            } = P, x = vu(c, m, g);
            t.dispatch(wi({
              activeDataKey: w,
              activeIndex: m,
              activeCoordinate: x,
              activeGraphicalItemId: g
            }));
          }
          Pe = null, de = null;
        }
      };
      if (!l) {
        o();
        return;
      }
      n === "raf" ? Pe = requestAnimationFrame(o) : typeof n == "number" && de === null && (o(), Re = null, de = setTimeout(() => {
        Re ? o() : (de = null, Pe = null);
      }, n));
    }
  }
});
var un = {
  throttleDelay: "raf",
  throttledEvents: ["mousemove", "touchmove", "pointermove", "scroll", "wheel"]
}, dn = re({
  name: "eventSettings",
  initialState: un,
  reducers: {
    setEventSettings: (e, t) => {
      t.payload.throttleDelay != null && (e.throttleDelay = t.payload.throttleDelay), t.payload.throttledEvents != null && (e.throttledEvents = _(t.payload.throttledEvents));
    }
  }
}), {
  setEventSettings: fu
} = dn.actions, hu = dn.reducer, pu = Ai({
  brush: ac,
  cartesianAxis: Yl,
  chartData: Ii,
  errorBars: rs,
  eventSettings: hu,
  graphicalItems: El,
  layout: ji,
  legend: Ci,
  options: Si,
  polarAxis: vl,
  polarOptions: uu,
  referenceElements: lc,
  renderedTicks: Ac,
  rootProps: ou,
  tooltip: ki,
  zIndex: Ei
}), mu = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Chart";
  return Oi({
    reducer: pu,
    // redux-toolkit v1 types are unhappy with the preloadedState type. Remove the `as any` when bumping to v2
    preloadedState: t,
    // @ts-expect-error redux-toolkit v1 types are unhappy with the middleware array. Remove this comment when bumping to v2
    middleware: (a) => {
      var n;
      return a({
        serializableCheck: !1,
        immutableCheck: !["commonjs", "es6", "production"].includes((n = "es6") !== null && n !== void 0 ? n : "")
      }).concat([Ja.middleware, Qa.middleware, vt.middleware, ln.middleware, sn.middleware]);
    },
    /*
     * I can't find out how to satisfy typescript here.
     * We return `EnhancerArray<[StoreEnhancer<{}, {}>, StoreEnhancer]>` from this function,
     * but the types say we should return `EnhancerArray<StoreEnhancer<{}, {}>`.
     * Looks like it's badly inferred generics, but it won't allow me to provide the correct type manually either.
     * So let's just ignore the error for now.
     */
    // @ts-expect-error mismatched generics
    enhancers: (a) => {
      var n = a;
      return typeof a == "function" && (n = a()), n.concat(Ti({
        type: "raf"
      }));
    },
    devTools: {
      serialize: {
        replacer: iu
      },
      name: "recharts-".concat(r)
    }
  });
};
function yu(e) {
  var {
    preloadedState: t,
    children: r,
    reduxStoreName: a
  } = e, n = q(), i = H(null);
  if (n)
    return r;
  i.current == null && (i.current = mu(t, a));
  var l = Ni;
  return /* @__PURE__ */ d.createElement(Di, {
    context: l,
    store: i.current
  }, r);
}
function gu(e) {
  var {
    layout: t,
    margin: r
  } = e, a = X(), n = q();
  return je(() => {
    n || (a(Li(t)), a($i(r)));
  }, [a, n, t, r]), null;
}
var bu = /* @__PURE__ */ Rt(gu, dt);
function xu(e) {
  var t = X();
  return je(() => {
    t(lu(e));
  }, [t, e]), null;
}
var Pu = (e) => {
  var t = X();
  return je(() => {
    t(fu(e));
  }, [t, e]), null;
}, wu = /* @__PURE__ */ Rt(Pu, dt);
function Wr(e) {
  var {
    zIndex: t,
    isPanorama: r
  } = e, a = H(null), n = X();
  return Z(() => (a.current && n(zi({
    zIndex: t,
    element: a.current,
    isPanorama: r
  })), () => {
    n(Mi({
      zIndex: t,
      isPanorama: r
    }));
  }), [n, t, r]), /* @__PURE__ */ d.createElement("g", {
    tabIndex: -1,
    ref: a,
    className: "recharts-zIndex-layer_".concat(t)
  });
}
function Gr(e) {
  var {
    children: t,
    isPanorama: r
  } = e, a = L(_i);
  if (!a || a.length === 0)
    return t;
  var n = a.filter((l) => l < 0), i = a.filter((l) => l > 0);
  return /* @__PURE__ */ d.createElement(d.Fragment, null, n.map((l) => /* @__PURE__ */ d.createElement(Wr, {
    key: l,
    zIndex: l,
    isPanorama: r
  })), t, i.map((l) => /* @__PURE__ */ d.createElement(Wr, {
    key: l,
    zIndex: l,
    isPanorama: r
  })));
}
var Ou = ["children"];
function Au(e, t) {
  if (e == null) return {};
  var r, a, n = Eu(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++) r = i[a], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Eu(e, t) {
  if (e == null) return {};
  var r = {};
  for (var a in e) if ({}.hasOwnProperty.call(e, a)) {
    if (t.indexOf(a) !== -1) continue;
    r[a] = e[a];
  }
  return r;
}
function ot() {
  return ot = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var a in r) ({}).hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
  }, ot.apply(null, arguments);
}
var ku = {
  width: "100%",
  height: "100%",
  /*
   * display: block is necessary here because the default for an SVG is display: inline,
   * which in some browsers (Chrome) adds a little bit of extra space above and below the SVG
   * to make space for the descender of letters like "g" and "y". This throws off the height calculation
   * and causes the container to grow indefinitely on each render with responsive=true.
   * Display: block removes that extra space.
   *
   * Interestingly, Firefox does not have this problem, but it doesn't hurt to add the style anyway.
   */
  display: "block"
}, Su = /* @__PURE__ */ V((e, t) => {
  var r = Jr(), a = Qr(), n = Bi();
  if (!et(r) || !et(a))
    return null;
  var {
    children: i,
    otherAttributes: l,
    title: o,
    desc: c
  } = e, u, s;
  return l != null && (typeof l.tabIndex == "number" ? u = l.tabIndex : u = n ? 0 : void 0, typeof l.role == "string" ? s = l.role : s = n ? "application" : void 0), /* @__PURE__ */ d.createElement(fa, ot({}, l, {
    title: o,
    desc: c,
    role: s,
    tabIndex: u,
    width: r,
    height: a,
    style: ku,
    ref: t
  }), i);
}), Cu = (e) => {
  var {
    children: t
  } = e, r = L(Ri);
  if (!r)
    return null;
  var {
    width: a,
    height: n,
    y: i,
    x: l
  } = r;
  return /* @__PURE__ */ d.createElement(fa, {
    width: a,
    height: n,
    x: l,
    y: i
  }, t);
}, Kr = /* @__PURE__ */ V((e, t) => {
  var {
    children: r
  } = e, a = Au(e, Ou), n = q();
  return n ? /* @__PURE__ */ d.createElement(Cu, null, /* @__PURE__ */ d.createElement(Gr, {
    isPanorama: !0
  }, r)) : /* @__PURE__ */ d.createElement(Su, ot({
    ref: t
  }, a), /* @__PURE__ */ d.createElement(Gr, {
    isPanorama: !1
  }, r));
});
function ju() {
  var e = X(), [t, r] = ee(null), a = L(Wi);
  return je(() => {
    if (t != null) {
      var n = t.getBoundingClientRect(), i = n.width / t.offsetWidth;
      Se(i) && i !== a && e(Gi(i));
    }
  }, [t, e, a]), r;
}
function Fr(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(n) {
      return Object.getOwnPropertyDescriptor(e, n).enumerable;
    })), r.push.apply(r, a);
  }
  return r;
}
function Iu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Fr(Object(r), !0).forEach(function(a) {
      Tu(e, a, r[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Fr(Object(r)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(r, a));
    });
  }
  return e;
}
function Tu(e, t, r) {
  return (t = Du(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Du(e) {
  var t = Nu(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Nu(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var a = r.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function fe() {
  return fe = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var a in r) ({}).hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
  }, fe.apply(null, arguments);
}
var Lu = () => (Xi(), null);
function lt(e) {
  if (typeof e == "number")
    return e;
  if (typeof e == "string") {
    var t = parseFloat(e);
    if (!Number.isNaN(t))
      return t;
  }
  return 0;
}
var $u = /* @__PURE__ */ V((e, t) => {
  var r, a, n = H(null), [i, l] = ee({
    containerWidth: lt((r = e.style) === null || r === void 0 ? void 0 : r.width),
    containerHeight: lt((a = e.style) === null || a === void 0 ? void 0 : a.height)
  }), o = D((u, s) => {
    l((v) => {
      var f = Math.round(u), p = Math.round(s);
      return v.containerWidth === f && v.containerHeight === p ? v : {
        containerWidth: f,
        containerHeight: p
      };
    });
  }, []), c = D((u) => {
    if (typeof t == "function" && t(u), u != null && typeof ResizeObserver < "u") {
      var {
        width: s,
        height: v
      } = u.getBoundingClientRect();
      o(s, v);
      var f = (h) => {
        var y = h[0];
        if (y != null) {
          var {
            width: m,
            height: g
          } = y.contentRect;
          o(m, g);
        }
      }, p = new ResizeObserver(f);
      p.observe(u), n.current = p;
    }
  }, [t, o]);
  return je(() => () => {
    var u = n.current;
    u?.disconnect();
  }, [o]), /* @__PURE__ */ d.createElement(d.Fragment, null, /* @__PURE__ */ d.createElement(Xe, {
    width: i.containerWidth,
    height: i.containerHeight
  }), /* @__PURE__ */ d.createElement("div", fe({
    ref: c
  }, e)));
}), _u = /* @__PURE__ */ V((e, t) => {
  var {
    width: r,
    height: a
  } = e, [n, i] = ee({
    containerWidth: lt(r),
    containerHeight: lt(a)
  }), l = D((c, u) => {
    i((s) => {
      var v = Math.round(c), f = Math.round(u);
      return s.containerWidth === v && s.containerHeight === f ? s : {
        containerWidth: v,
        containerHeight: f
      };
    });
  }, []), o = D((c) => {
    if (typeof t == "function" && t(c), c != null) {
      var {
        width: u,
        height: s
      } = c.getBoundingClientRect();
      l(u, s);
    }
  }, [t, l]);
  return /* @__PURE__ */ d.createElement(d.Fragment, null, /* @__PURE__ */ d.createElement(Xe, {
    width: n.containerWidth,
    height: n.containerHeight
  }), /* @__PURE__ */ d.createElement("div", fe({
    ref: o
  }, e)));
}), zu = /* @__PURE__ */ V((e, t) => {
  var {
    width: r,
    height: a
  } = e;
  return /* @__PURE__ */ d.createElement(d.Fragment, null, /* @__PURE__ */ d.createElement(Xe, {
    width: r,
    height: a
  }), /* @__PURE__ */ d.createElement("div", fe({
    ref: t
  }, e)));
}), Mu = /* @__PURE__ */ V((e, t) => {
  var {
    width: r,
    height: a
  } = e;
  return typeof r == "string" || typeof a == "string" ? /* @__PURE__ */ d.createElement(_u, fe({}, e, {
    ref: t
  })) : typeof r == "number" && typeof a == "number" ? /* @__PURE__ */ d.createElement(zu, fe({}, e, {
    width: r,
    height: a,
    ref: t
  })) : /* @__PURE__ */ d.createElement(d.Fragment, null, /* @__PURE__ */ d.createElement(Xe, {
    width: r,
    height: a
  }), /* @__PURE__ */ d.createElement("div", fe({
    ref: t
  }, e)));
});
function Ru(e) {
  return e ? $u : Mu;
}
var Bu = /* @__PURE__ */ V((e, t) => {
  var {
    children: r,
    className: a,
    height: n,
    onClick: i,
    onContextMenu: l,
    onDoubleClick: o,
    onMouseDown: c,
    onMouseEnter: u,
    onMouseLeave: s,
    onMouseMove: v,
    onMouseUp: f,
    onTouchEnd: p,
    onTouchMove: h,
    onTouchStart: y,
    style: m,
    width: g,
    responsive: P,
    dispatchTouchEvents: w = !0
  } = e, x = H(null), b = X(), [O, A] = ee(null), [E, S] = ee(null), $ = ju(), j = Ki(), k = j?.width > 0 ? j.width : g, R = j?.height > 0 ? j.height : n, ae = D((C) => {
    $(C), typeof t == "function" && t(C), A(C), S(C), C != null && (x.current = C);
  }, [$, t, A, S]), J = D((C) => {
    b(qa(C)), b(Y({
      handler: i,
      reactEvent: C
    }));
  }, [b, i]), Ve = D((C) => {
    b(_t(C)), b(Y({
      handler: u,
      reactEvent: C
    }));
  }, [b, u]), Ye = D((C) => {
    b(va()), b(Y({
      handler: s,
      reactEvent: C
    }));
  }, [b, s]), ue = D((C) => {
    b(_t(C)), b(Y({
      handler: v,
      reactEvent: C
    }));
  }, [b, v]), ne = D(() => {
    b(an());
  }, [b]), ge = D(() => {
    b(nn());
  }, [b]), ze = D((C) => {
    b(rn(C.key));
  }, [b]), ie = D((C) => {
    b(Y({
      handler: l,
      reactEvent: C
    }));
  }, [b, l]), ft = D((C) => {
    b(Y({
      handler: o,
      reactEvent: C
    }));
  }, [b, o]), ht = D((C) => {
    b(Y({
      handler: c,
      reactEvent: C
    }));
  }, [b, c]), pt = D((C) => {
    b(Y({
      handler: f,
      reactEvent: C
    }));
  }, [b, f]), vn = D((C) => {
    b(Y({
      handler: y,
      reactEvent: C
    }));
  }, [b, y]), fn = D((C) => {
    w && b(cn(C)), b(Y({
      handler: h,
      reactEvent: C
    }));
  }, [b, w, h]), hn = D((C) => {
    b(Y({
      handler: p,
      reactEvent: C
    }));
  }, [b, p]), pn = Ru(P);
  return /* @__PURE__ */ d.createElement(Fi.Provider, {
    value: O
  }, /* @__PURE__ */ d.createElement(Hi.Provider, {
    value: E
  }, /* @__PURE__ */ d.createElement(pn, {
    width: k ?? m?.width,
    height: R ?? m?.height,
    className: F("recharts-wrapper", a),
    style: Iu({
      position: "relative",
      cursor: "default",
      width: k,
      height: R
    }, m),
    onClick: J,
    onContextMenu: ie,
    onDoubleClick: ft,
    onFocus: ne,
    onBlur: ge,
    onKeyDown: ze,
    onMouseDown: ht,
    onMouseEnter: Ve,
    onMouseLeave: Ye,
    onMouseMove: ue,
    onMouseUp: pt,
    onTouchEnd: hn,
    onTouchMove: fn,
    onTouchStart: vn,
    ref: ae
  }, /* @__PURE__ */ d.createElement(Lu, null), r)));
}), Wu = ["width", "height", "responsive", "children", "className", "style", "compact", "title", "desc"];
function Gu(e, t) {
  if (e == null) return {};
  var r, a, n = Ku(e, t);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (a = 0; a < i.length; a++) r = i[a], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Ku(e, t) {
  if (e == null) return {};
  var r = {};
  for (var a in e) if ({}.hasOwnProperty.call(e, a)) {
    if (t.indexOf(a) !== -1) continue;
    r[a] = e[a];
  }
  return r;
}
var Fu = /* @__PURE__ */ V((e, t) => {
  var {
    width: r,
    height: a,
    responsive: n,
    children: i,
    className: l,
    style: o,
    compact: c,
    title: u,
    desc: s
  } = e, v = Gu(e, Wu), f = ye(v);
  return c ? /* @__PURE__ */ d.createElement(d.Fragment, null, /* @__PURE__ */ d.createElement(Xe, {
    width: r,
    height: a
  }), /* @__PURE__ */ d.createElement(Kr, {
    otherAttributes: f,
    title: u,
    desc: s
  }, i)) : /* @__PURE__ */ d.createElement(Bu, {
    className: l,
    style: o,
    width: r,
    height: a,
    responsive: n ?? !1,
    onClick: e.onClick,
    onMouseLeave: e.onMouseLeave,
    onMouseEnter: e.onMouseEnter,
    onMouseMove: e.onMouseMove,
    onMouseDown: e.onMouseDown,
    onMouseUp: e.onMouseUp,
    onContextMenu: e.onContextMenu,
    onDoubleClick: e.onDoubleClick,
    onTouchStart: e.onTouchStart,
    onTouchMove: e.onTouchMove,
    onTouchEnd: e.onTouchEnd
  }, /* @__PURE__ */ d.createElement(Kr, {
    otherAttributes: f,
    title: u,
    desc: s,
    ref: t
  }, /* @__PURE__ */ d.createElement(sc, null, i)));
});
function zt() {
  return zt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var a in r) ({}).hasOwnProperty.call(r, a) && (e[a] = r[a]);
    }
    return e;
  }, zt.apply(null, arguments);
}
function Hr(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    t && (a = a.filter(function(n) {
      return Object.getOwnPropertyDescriptor(e, n).enumerable;
    })), r.push.apply(r, a);
  }
  return r;
}
function Hu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Hr(Object(r), !0).forEach(function(a) {
      Xu(e, a, r[a]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Hr(Object(r)).forEach(function(a) {
      Object.defineProperty(e, a, Object.getOwnPropertyDescriptor(r, a));
    });
  }
  return e;
}
function Xu(e, t, r) {
  return (t = Vu(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Vu(e) {
  var t = Yu(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Yu(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var a = r.call(e, t);
    if (typeof a != "object") return a;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Zu = {
  top: 5,
  right: 5,
  bottom: 5,
  left: 5
}, Uu = Hu({
  accessibilityLayer: !0,
  barCategoryGap: "10%",
  barGap: 4,
  layout: "horizontal",
  margin: Zu,
  responsive: !1,
  reverseStackOrder: !1,
  stackOffset: "none",
  syncMethod: "index"
}, un), qu = /* @__PURE__ */ V(function(t, r) {
  var a, n = he(t.categoricalChartProps, Uu), {
    chartName: i,
    defaultTooltipEventType: l,
    validateTooltipEventTypes: o,
    tooltipPayloadSearcher: c,
    categoricalChartProps: u
  } = t, s = {
    chartName: i,
    defaultTooltipEventType: l,
    validateTooltipEventTypes: o,
    tooltipPayloadSearcher: c,
    eventEmitter: void 0
  };
  return /* @__PURE__ */ d.createElement(yu, {
    preloadedState: {
      options: s
    },
    reduxStoreName: (a = u.id) !== null && a !== void 0 ? a : i
  }, /* @__PURE__ */ d.createElement(rc, {
    chartData: u.data
  }), /* @__PURE__ */ d.createElement(bu, {
    layout: n.layout,
    margin: n.margin
  }), /* @__PURE__ */ d.createElement(wu, {
    throttleDelay: n.throttleDelay,
    throttledEvents: n.throttledEvents
  }), /* @__PURE__ */ d.createElement(xu, {
    baseValue: n.baseValue,
    accessibilityLayer: n.accessibilityLayer,
    barCategoryGap: n.barCategoryGap,
    maxBarSize: n.maxBarSize,
    stackOffset: n.stackOffset,
    barGap: n.barGap,
    barSize: n.barSize,
    syncId: n.syncId,
    syncMethod: n.syncMethod,
    className: n.className,
    reverseStackOrder: n.reverseStackOrder
  }), /* @__PURE__ */ d.createElement(Fu, zt({}, n, {
    ref: r
  })));
}), Ju = ["axis"], Qu = /* @__PURE__ */ V((e, t) => /* @__PURE__ */ d.createElement(qu, {
  chartName: "AreaChart",
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: Ju,
  tooltipPayloadSearcher: Vi,
  categoricalChartProps: e,
  ref: t
}));
const Mt = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 }
], ed = {
  desktop: {
    label: "Desktop",
    color: "var(--accent-blue)"
  },
  mobile: {
    label: "Mobile",
    color: "var(--accent-cyan)"
  }
}, td = {
  desktop: {
    label: "Desktop",
    color: "var(--accent-blue)",
    icon: eo
  },
  mobile: {
    label: "Mobile",
    color: "var(--accent-cyan)",
    icon: Qi
  }
};
function se({
  title: e,
  description: t,
  curve: r = "natural",
  legend: a = !1,
  stacked: n = !1,
  expanded: i = !1,
  gradient: l = !1,
  icons: o = !1,
  data: c = Mt,
  action: u
}) {
  const s = bn().replaceAll(":", "");
  return /* @__PURE__ */ we(xn, { className: "h-full", children: [
    /* @__PURE__ */ we(Pn, { children: [
      /* @__PURE__ */ I(wn, { children: e }),
      /* @__PURE__ */ I(On, { children: t }),
      u ? /* @__PURE__ */ I(An, { children: u }) : null
    ] }),
    /* @__PURE__ */ I(En, { children: /* @__PURE__ */ I(Yi, { config: o ? td : ed, className: "h-64 w-full", children: /* @__PURE__ */ we(
      Qu,
      {
        accessibilityLayer: !0,
        data: c,
        margin: { left: 4, right: 12 },
        stackOffset: i ? "expand" : void 0,
        children: [
          l ? /* @__PURE__ */ we("defs", { children: [
            /* @__PURE__ */ we("linearGradient", { id: `${s}-desktop`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ I("stop", { offset: "5%", stopColor: "var(--color-desktop)", stopOpacity: 0.35 }),
              /* @__PURE__ */ I("stop", { offset: "95%", stopColor: "var(--color-desktop)", stopOpacity: 0.06 })
            ] }),
            /* @__PURE__ */ we("linearGradient", { id: `${s}-mobile`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ I("stop", { offset: "5%", stopColor: "var(--color-mobile)", stopOpacity: 0.28 }),
              /* @__PURE__ */ I("stop", { offset: "95%", stopColor: "var(--color-mobile)", stopOpacity: 0.04 })
            ] })
          ] }) : null,
          /* @__PURE__ */ I(Ma, { vertical: !1 }),
          /* @__PURE__ */ I(
            Za,
            {
              dataKey: "month",
              tickLine: !1,
              axisLine: !1,
              tickMargin: 8,
              tickFormatter: (f) => f.slice(0, 3)
            }
          ),
          i ? /* @__PURE__ */ I(
            Ua,
            {
              tickLine: !1,
              axisLine: !1,
              tickFormatter: (f) => `${Math.round(f * 100)}%`
            }
          ) : null,
          /* @__PURE__ */ I(Zi, { cursor: !1, content: /* @__PURE__ */ I(Ui, { indicator: "line" }) }),
          a ? /* @__PURE__ */ I(qi, { content: /* @__PURE__ */ I(Ji, {}) }) : null,
          /* @__PURE__ */ I(
            Tt,
            {
              dataKey: "mobile",
              type: r,
              fill: l ? `url(#${s}-mobile)` : "var(--color-mobile)",
              fillOpacity: l ? 1 : 0.16,
              stroke: "var(--color-mobile)",
              strokeOpacity: 0.55,
              stackId: n ? "visitors" : void 0
            }
          ),
          /* @__PURE__ */ I(
            Tt,
            {
              dataKey: "desktop",
              type: r,
              fill: l ? `url(#${s}-desktop)` : "var(--color-desktop)",
              fillOpacity: l ? 1 : 0.24,
              stroke: "var(--color-desktop)",
              strokeOpacity: 0.55,
              stackId: n ? "visitors" : void 0
            }
          )
        ]
      }
    ) }) }),
    /* @__PURE__ */ I(kn, { className: "text-sm text-muted-foreground", children: "January – June 2024" })
  ] });
}
function Id() {
  const [e, t] = ee("six"), r = e === "six" ? Mt : Mt.slice(-3);
  return /* @__PURE__ */ I(
    se,
    {
      title: "Area Chart — Interactive",
      description: "Switch between three and six months.",
      data: r,
      gradient: !0,
      action: /* @__PURE__ */ we("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ I(
          er,
          {
            size: "sm",
            variant: e === "three" ? "secondary" : "ghost",
            onClick: () => t("three"),
            children: "3M"
          }
        ),
        /* @__PURE__ */ I(
          er,
          {
            size: "sm",
            variant: e === "six" ? "secondary" : "ghost",
            onClick: () => t("six"),
            children: "6M"
          }
        )
      ] })
    }
  );
}
function Td() {
  return /* @__PURE__ */ I(se, { title: "Area Chart", description: "A simple natural area chart." });
}
function Dd() {
  return /* @__PURE__ */ I(se, { title: "Area Chart — Linear", description: "Straight segments between values.", curve: "linear" });
}
function Nd() {
  return /* @__PURE__ */ I(se, { title: "Area Chart — Step", description: "Stepped transitions between values.", curve: "step" });
}
function Ld() {
  return /* @__PURE__ */ I(se, { title: "Area Chart — Legend", description: "A chart with a series legend.", legend: !0 });
}
function $d() {
  return /* @__PURE__ */ I(se, { title: "Area Chart — Stacked", description: "Two visitor series stacked together.", stacked: !0 });
}
function _d() {
  return /* @__PURE__ */ I(se, { title: "Area Chart — Stacked Expanded", description: "Series shown as a percentage of the total.", stacked: !0, expanded: !0 });
}
function zd() {
  return /* @__PURE__ */ I(se, { title: "Area Chart — Icons", description: "Legend items use icons from Primitives.", legend: !0, icons: !0 });
}
function Md() {
  return /* @__PURE__ */ I(se, { title: "Area Chart — Gradient", description: "Token-based gradient fills.", gradient: !0 });
}
export {
  Td as ChartAreaDefault,
  Md as ChartAreaGradient,
  zd as ChartAreaIcons,
  Id as ChartAreaInteractive,
  Ld as ChartAreaLegend,
  Dd as ChartAreaLinear,
  $d as ChartAreaStacked,
  _d as ChartAreaStackedExpand,
  Nd as ChartAreaStep
};
