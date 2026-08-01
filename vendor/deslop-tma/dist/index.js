import { c as I } from "react/compiler-runtime";
import * as ae from "react";
import { useContext as Ne, createContext as ye, useEffect as H, useState as $, useRef as X, forwardRef as qe, Children as xe, useLayoutEffect as Te, Component as Ti, useEffectEvent as xt, Activity as no, isValidElement as oo, useId as io } from "react";
import { useHashLocation as ro } from "wouter/use-hash-location";
import { jsx as C, jsxs as j, Fragment as ge } from "react/jsx-runtime";
import * as ie from "motion/react-m";
import { useSmoothCorners as so } from "@lisse/react";
import { Calligraph as lo } from "calligraph";
import { createPortal as it } from "react-dom";
import { AnimatePresence as Ee, useMotionValue as Et, animate as Oe, useReducedMotion as Ve, useDragControls as ao, useTransform as Tt, LazyMotion as Li, domMax as Ui, useIsPresent as wi } from "motion/react";
import { Link as xi, useLocation as Ei } from "wouter";
import Ri from "markdown-to-jsx";
import { getLayoutSize as Wi, generateClipPath as Fi } from "@lisse/core";
const Ki = Object.freeze({
  2: "2px",
  4: "4px",
  6: "6px",
  8: "8px",
  10: "10px",
  12: "12px",
  14: "14px",
  16: "16px",
  20: "20px",
  24: "24px"
}), Di = Object.freeze({
  4: "4px",
  6: "6px",
  8: "8px",
  10: "10px",
  12: "12px",
  16: "16px",
  18: "18px",
  20: "20px",
  26: "26px",
  34: "34px",
  full: "9999px"
}), Bi = Object.freeze({
  "content-inset": "16px",
  "section-gap": "24px",
  "control-gap": "8px",
  "compact-gap": "4px"
}), Ii = Object.freeze({
  "cell-body-block-end": "9px",
  "dropdown-item-block": "11px",
  "markdown-list-inset": "22px",
  "snackbar-block": "9px",
  "start-view-inline": "32px",
  "start-view-block": "44px",
  "tab-glass-inset": "3px",
  "tab-glass-block": "7px"
}), Mi = Object.freeze({
  badge: "6px",
  "badge-footnote": "4px",
  "badge-circled-footnote": "11px",
  "badge-circled-text": "13px",
  "button-regular": "25px",
  "button-multiline": "16px",
  "dropdown-menu": "36px",
  "header-action": "22px",
  "markdown-inline-code": "5px",
  modal: "34px",
  section: "26px",
  "segmented-circled": "18px",
  "segmented-circled-indicator": "16px",
  snackbar: "26px",
  "story-badge": "11px",
  tab: "16px",
  "tab-compact": "14px",
  "tab-glass": "18px",
  "tab-bar": "9999px",
  "text-field": "12px",
  "tooltip-surface": "12px",
  "tooltip-badge": "5px"
}), fu = Object.freeze({
  2: 2,
  4: 4,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
  14: 14,
  16: 16,
  20: 20,
  24: 24
}), Rt = Object.freeze({
  4: 4,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
  16: 16,
  18: 18,
  20: 20,
  26: 26,
  34: 34,
  full: 9999
}), pu = Object.freeze({
  "content-inset": 16,
  "section-gap": 24,
  "control-gap": 8,
  "compact-gap": 4
}), mu = Object.freeze({
  "cell-body-block-end": 9,
  "dropdown-item-block": 11,
  "markdown-list-inset": 22,
  "snackbar-block": 9,
  "start-view-inline": 32,
  "start-view-block": 44,
  "tab-glass-inset": 3,
  "tab-glass-block": 7
}), rt = Object.freeze({
  badge: 6,
  "badge-footnote": 4,
  "badge-circled-footnote": 11,
  "badge-circled-text": 13,
  "button-regular": 25,
  "button-multiline": 16,
  "dropdown-menu": 36,
  "header-action": 22,
  "markdown-inline-code": 5,
  modal: 34,
  section: 26,
  "segmented-circled": 18,
  "segmented-circled-indicator": 16,
  snackbar: 26,
  "story-badge": 11,
  tab: 16,
  "tab-compact": 14,
  "tab-glass": 18,
  "tab-bar": 9999,
  "text-field": 12,
  "tooltip-surface": 12,
  "tooltip-badge": 5
}), hu = Object.freeze({
  spacing: Ki,
  radius: Di,
  semanticSpacing: Bi,
  componentSpacing: Ii,
  componentRadius: Mi
}), ki = "_root_xunnd_1", _t = "_glassBackground_xunnd_5", Ht = "_glassShadow_xunnd_25", qi = "_glassBorder_1y4zy_1", Pi = "_muted_1y4zy_15", ke = (n) => {
  const e = I(2), {
    className: t,
    muted: o
  } = n, s = `${qi} ${(o === void 0 ? !1 : o) ? Pi : ""} ${t === void 0 ? "" : t}`;
  let c;
  return e[0] !== s ? (c = /* @__PURE__ */ C("div", {
    className: s,
    "aria-hidden": "true"
  }), e[0] = s, e[1] = c) : c = e[1], c;
}, co = (n) => {
  const e = I(16);
  let t, o, i, r;
  e[0] !== n ? ({
    children: t,
    className: i,
    style: r,
    ...o
  } = n, e[0] = n, e[1] = t, e[2] = o, e[3] = i, e[4] = r) : (t = e[1], o = e[2], i = e[3], r = e[4]);
  const s = i === void 0 ? "" : i;
  let c;
  e[5] !== r ? (c = r === void 0 ? {} : r, e[5] = r, e[6] = c) : c = e[6];
  const a = c;
  if (!t) {
    let h;
    return e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (h = /* @__PURE__ */ j(ge, {
      children: [/* @__PURE__ */ C("div", {
        className: _t,
        "aria-hidden": "true"
      }), /* @__PURE__ */ C("div", {
        className: Ht,
        "aria-hidden": "true"
      }), /* @__PURE__ */ C(ke, {})]
    }), e[7] = h) : h = e[7], h;
  }
  const l = `${ki} ${s}`;
  let u, f, d;
  e[8] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (u = /* @__PURE__ */ C("div", {
    className: _t,
    "aria-hidden": "true"
  }), f = /* @__PURE__ */ C("div", {
    className: Ht,
    "aria-hidden": "true"
  }), d = /* @__PURE__ */ C(ke, {}), e[8] = u, e[9] = f, e[10] = d) : (u = e[8], f = e[9], d = e[10]);
  let m;
  return e[11] !== t || e[12] !== o || e[13] !== a || e[14] !== l ? (m = /* @__PURE__ */ j("div", {
    className: l,
    style: a,
    ...o,
    children: [u, f, d, t]
  }), e[11] = t, e[12] = o, e[13] = a, e[14] = l, e[15] = m) : m = e[15], m;
}, Yi = (n) => /* @__PURE__ */ ae.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ ae.createElement("g", { id: "24_icon-fill/arrow-down" }, /* @__PURE__ */ ae.createElement("path", { id: "Vector", d: "M11.2482 20.3129C11.6466 20.7682 12.3556 20.7682 12.7541 20.3129L17.5499 14.8314C18.1155 14.1849 17.6561 13.1732 16.797 13.1732H13.5011V5.67324C13.5011 4.84481 12.8295 4.17324 12.0011 4.17324C11.1727 4.17324 10.5011 4.84481 10.5011 5.67324V13.1732H7.20522C6.34614 13.1732 5.88678 14.1849 6.45229 14.8314L11.2482 20.3129Z", fill: "#3D3C3A" }))), Qi = (n) => /* @__PURE__ */ ae.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ ae.createElement("g", { id: "24_icon-fill/arrow-up" }, /* @__PURE__ */ ae.createElement("path", { id: "Vector", d: "M11.2483 3.85905C11.6467 3.40376 12.3558 3.40375 12.7542 3.85905L17.5501 9.3405C18.1158 9.98708 17.6563 10.9997 16.7971 10.9997H13.5012V18.4997C13.501 19.3279 12.8295 19.9997 12.0012 19.9997C11.1729 19.9997 10.5014 19.3279 10.5012 18.4997V10.9997H7.20535C6.34619 10.9997 5.88666 9.98708 6.45242 9.3405L11.2483 3.85905Z", fill: "#3D3C3A" }))), Oi = (n) => /* @__PURE__ */ ae.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ ae.createElement("g", { id: "24_icon-fill/star" }, /* @__PURE__ */ ae.createElement("path", { id: "Vector 234255911", d: "M11 16L15 12L11 8", stroke: "#3D3C3A", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }))), uo = "_redaction_dcm1f_1", fo = "_active_dcm1f_19", Gi = "_sized_dcm1f_29", pt = 1800, Vi = 1.3, po = /* @__PURE__ */ ye(null), Pe = () => Ne(po);
let nt = [];
const Zi = () => {
  const n = nt;
  nt = [];
  const e = performance.now(), t = n.map((o) => {
    const i = o.getBoundingClientRect().top + window.scrollY;
    return -(((e - i * Vi) % pt + pt) % pt);
  });
  n.forEach((o, i) => {
    o.style.setProperty("--wave-phase", `${Math.round(t[i])}ms`);
  });
}, Ye = (n) => {
  n && (nt.length === 0 && requestAnimationFrame(Zi), nt.push(n));
}, Ze = (n) => n ? `${uo} ${fo}` : "", zi = 10, Ji = (n) => {
  const e = I(7), {
    active: t,
    width: o,
    children: i
  } = n, r = i != null && i !== "", s = o ?? (!r && t ? zi : void 0), c = t ? Ye : void 0, a = `
                ${uo}
                ${t ? fo : ""}
                ${s ? Gi : ""}`;
  let l;
  e[0] !== s ? (l = s ? {
    width: `${s}ch`
  } : void 0, e[0] = s, e[1] = l) : l = e[1];
  const u = r ? i : " ";
  let f;
  return e[2] !== c || e[3] !== a || e[4] !== l || e[5] !== u ? (f = /* @__PURE__ */ C("span", {
    ref: c,
    className: a,
    style: l,
    children: u
  }), e[2] = c, e[3] = a, e[4] = l, e[5] = u, e[6] = f) : f = e[6], f;
}, Au = (n) => {
  const e = I(6), {
    className: t,
    as: o,
    active: i
  } = n, r = t === void 0 ? "" : t, s = o === void 0 ? "div" : o, c = Pe(), a = i ?? c ?? !0, l = Ze(a), u = a ? Ye : void 0, f = `${r} ${l}`;
  let d;
  e[0] !== f ? (d = f.trim(), e[0] = f, e[1] = d) : d = e[1];
  let m;
  return e[2] !== s || e[3] !== u || e[4] !== d ? (m = /* @__PURE__ */ C(s, {
    ref: u,
    className: d
  }), e[2] = s, e[3] = u, e[4] = d, e[5] = m) : m = e[5], m;
}, Wt = (n) => {
  const e = I(3), {
    active: t,
    children: o
  } = n, r = !!(t === void 0 ? !0 : t);
  let s;
  return e[0] !== o || e[1] !== r ? (s = /* @__PURE__ */ C(po.Provider, {
    value: r,
    children: o
  }), e[0] = o, e[1] = r, e[2] = s) : s = e[2], s;
}, Ft = "_text_9l4iv_1", ot = "_icon_9l4iv_28", mo = "_title32_9l4iv_34", ho = "_title24_9l4iv_35", Ao = "_title20_9l4iv_36", go = "_body_9l4iv_56", yo = "_subtitle_9l4iv_63", vo = "_caption_9l4iv_70", ji = {
  text: Ft,
  icon: ot,
  title32: mo,
  title24: ho,
  title20: Ao,
  body: go,
  subtitle: yo,
  caption: vo
}, Xi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  body: go,
  caption: vo,
  default: ji,
  icon: ot,
  subtitle: yo,
  text: Ft,
  title20: Ao,
  title24: ho,
  title32: mo
}, Symbol.toStringTag, { value: "Module" })), _i = {
  title1: "title32",
  title2: "title24",
  title3: "title20",
  body: "body",
  callout: "body",
  subheadline1: "subtitle",
  subheadline2: "subtitle",
  footnote: "subtitle",
  caption1: "caption",
  caption2: "caption",
  overline: "caption"
}, te = (n) => {
  const e = I(34);
  let t, o, i, r, s, c, a, l, u, f, d;
  e[0] !== n ? ({
    as: t,
    variant: f,
    weight: d,
    rounded: l,
    skeleton: u,
    caps: i,
    chevron: r,
    arrow: o,
    children: s,
    className: c,
    ...a
  } = n, e[0] = n, e[1] = t, e[2] = o, e[3] = i, e[4] = r, e[5] = s, e[6] = c, e[7] = a, e[8] = l, e[9] = u, e[10] = f, e[11] = d) : (t = e[1], o = e[2], i = e[3], r = e[4], s = e[5], c = e[6], a = e[7], l = e[8], u = e[9], f = e[10], d = e[11]);
  const m = f === void 0 ? "body" : f, h = Pe(), A = t || "div", p = u !== void 0 ? !!u : !!h, v = u !== void 0 || h !== null, b = typeof u == "number" ? u : void 0;
  let y;
  e[12] !== p || e[13] !== s || e[14] !== v || e[15] !== b ? (y = v ? /* @__PURE__ */ C(Ji, {
    active: p,
    width: b,
    children: s
  }) : s, e[12] = p, e[13] = s, e[14] = v, e[15] = b, e[16] = y) : y = e[16];
  const S = y, g = o?.direction === "down" ? Yi : Qi, T = `${Ft} ${Xi[_i[m] || "body"]} ${c || ""}`, N = l || void 0, L = i || void 0, w = p || void 0;
  let x;
  e[17] !== g || e[18] !== o?.direction ? (x = o?.direction && /* @__PURE__ */ C(g, {
    className: ot
  }), e[17] = g, e[18] = o?.direction, e[19] = x) : x = e[19];
  let F;
  e[20] !== r ? (F = r && /* @__PURE__ */ C(Oi, {
    className: ot
  }), e[20] = r, e[21] = F) : F = e[21];
  let W;
  return e[22] !== A || e[23] !== S || e[24] !== a || e[25] !== T || e[26] !== N || e[27] !== L || e[28] !== w || e[29] !== x || e[30] !== F || e[31] !== m || e[32] !== d ? (W = /* @__PURE__ */ j(A, {
    ...a,
    className: T,
    "data-variant": m,
    "data-weight": d,
    "data-rounded": N,
    "data-caps": L,
    "data-skeleton": w,
    children: [x, S, F]
  }), e[22] = A, e[23] = S, e[24] = a, e[25] = T, e[26] = N, e[27] = L, e[28] = w, e[29] = x, e[30] = F, e[31] = m, e[32] = d, e[33] = W) : W = e[33], W;
}, Kt = {
  skin: "apple",
  isApple: !0,
  isMaterial: !1,
  setSkin: () => {
  }
}, bo = /* @__PURE__ */ ye(Kt), Ce = () => Ne(bo) || Kt;
function Hi(n) {
  const e = I(3), {
    children: t
  } = n;
  let o;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (o = [], e[0] = o) : o = e[0], H($i, o);
  let i;
  return e[1] !== t ? (i = /* @__PURE__ */ C(bo.Provider, {
    value: Kt,
    children: t
  }), e[1] = t, e[2] = i) : i = e[2], i;
}
function $i() {
  document.body.classList.remove("material", "skin-switcher-active"), document.body.classList.add("apple");
}
const Dt = "_button_1d7yf_1", Co = "_regular_1d7yf_21", So = "_overlay_1d7yf_35", No = "_secondary_1d7yf_42", To = "_accent_1d7yf_47", Bt = "_icon_1d7yf_53", It = "_label_1d7yf_57", Mt = "_content_1d7yf_61", er = {
  button: Dt,
  regular: Co,
  overlay: So,
  secondary: No,
  accent: To,
  icon: Bt,
  label: It,
  content: Mt
}, tr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accent: To,
  button: Dt,
  content: Mt,
  default: er,
  icon: Bt,
  label: It,
  overlay: So,
  regular: Co,
  secondary: No
}, Symbol.toStringTag, { value: "Module" })), $t = (n) => {
  const e = I(16), {
    children: t,
    onClick: o,
    variant: i,
    ariaLabel: r,
    title: s
  } = n, c = i === void 0 ? "regular" : i, a = typeof t == "string", l = c === "regular" || c === "overlay", u = `${Dt} ${tr[c]} ${a ? It : Bt}`;
  let f, d;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (f = {
    scale: 1.1
  }, d = {
    scale: {
      type: "spring",
      stiffness: 800,
      damping: 40
    }
  }, e[0] = f, e[1] = d) : (f = e[0], d = e[1]);
  let m;
  e[2] !== l ? (m = l && /* @__PURE__ */ C(ke, {
    muted: !0
  }), e[2] = l, e[3] = m) : m = e[3];
  let h;
  e[4] !== t || e[5] !== a ? (h = a ? /* @__PURE__ */ C(te, {
    variant: "body",
    weight: "medium",
    children: t
  }) : t, e[4] = t, e[5] = a, e[6] = h) : h = e[6];
  let A;
  e[7] !== h ? (A = /* @__PURE__ */ C("span", {
    className: Mt,
    children: h
  }), e[7] = h, e[8] = A) : A = e[8];
  let p;
  return e[9] !== r || e[10] !== o || e[11] !== u || e[12] !== m || e[13] !== A || e[14] !== s ? (p = /* @__PURE__ */ j(ie.button, {
    type: "button",
    className: u,
    onClick: o,
    "aria-label": r,
    title: s,
    whileTap: f,
    transition: d,
    children: [m, A]
  }), e[9] = r, e[10] = o, e[11] = u, e[12] = m, e[13] = A, e[14] = s, e[15] = p) : p = e[15], p;
}, Lo = /* @__PURE__ */ ye(!1), nr = "_root_125i3_1", en = "_side_125i3_9", or = "_trailing_125i3_18", ir = "_middle_125i3_22", rr = "_middleOverlay_125i3_31", sr = "_titlePill_125i3_35", lr = "_titleContent_125i3_45", ar = "_inModal_125i3_59", cr = (n) => {
  const e = I(32), {
    left: t,
    onLeft: o,
    leftVariant: i,
    leftAriaLabel: r,
    leftTitle: s,
    right: c,
    onRight: a,
    rightVariant: l,
    rightAriaLabel: u,
    rightTitle: f,
    overlay: d,
    titleGlass: m,
    children: h
  } = n, A = d === void 0 ? !1 : d, p = m === void 0 ? !1 : m, {
    isApple: v
  } = Ce(), b = Ne(Lo), y = A ? "overlay" : "regular";
  let S;
  e[0] !== h ? (S = /* @__PURE__ */ C(te, {
    variant: "body",
    weight: "semibold",
    children: h
  }), e[0] = h, e[1] = S) : S = e[1];
  const g = S, T = `${nr} ${b ? ar : ""}`;
  let N;
  e[2] !== y || e[3] !== t || e[4] !== r || e[5] !== s || e[6] !== i || e[7] !== o ? (N = t != null && /* @__PURE__ */ C($t, {
    onClick: o,
    variant: i ?? y,
    ariaLabel: r,
    title: s,
    children: t
  }), e[2] = y, e[3] = t, e[4] = r, e[5] = s, e[6] = i, e[7] = o, e[8] = N) : N = e[8];
  let L;
  e[9] !== N ? (L = /* @__PURE__ */ C("div", {
    className: en,
    children: N
  }), e[9] = N, e[10] = L) : L = e[10];
  let w;
  e[11] !== y || e[12] !== a || e[13] !== c || e[14] !== u || e[15] !== f || e[16] !== l ? (w = c != null && /* @__PURE__ */ C($t, {
    onClick: a,
    variant: l ?? y,
    ariaLabel: u,
    title: f,
    children: c
  }), e[11] = y, e[12] = a, e[13] = c, e[14] = u, e[15] = f, e[16] = l, e[17] = w) : w = e[17];
  let x;
  e[18] !== w ? (x = /* @__PURE__ */ C("div", {
    className: `${en} ${or}`,
    children: w
  }), e[18] = w, e[19] = x) : x = e[19];
  const F = `${ir} ${A ? rr : ""}`;
  let W;
  e[20] !== v || e[21] !== g || e[22] !== p ? (W = v && p ? /* @__PURE__ */ j("div", {
    className: sr,
    children: [/* @__PURE__ */ C(co, {}), /* @__PURE__ */ C("span", {
      className: lr,
      children: g
    })]
  }) : g, e[20] = v, e[21] = g, e[22] = p, e[23] = W) : W = e[23];
  let E;
  e[24] !== W || e[25] !== F ? (E = /* @__PURE__ */ C("div", {
    className: F,
    children: W
  }), e[24] = W, e[25] = F, e[26] = E) : E = e[26];
  let k;
  return e[27] !== E || e[28] !== T || e[29] !== L || e[30] !== x ? (k = /* @__PURE__ */ j("div", {
    className: T,
    "data-modal-drag": "",
    children: [L, x, E]
  }), e[27] = E, e[28] = T, e[29] = L, e[30] = x, e[31] = k) : k = e[31], k;
}, Uo = /* @__PURE__ */ ye({
  inDetailPane: !1
}), kt = () => Ne(Uo), re = () => {
}, je = () => ({
  show: re,
  hide: re,
  enable: re,
  disable: re,
  showProgress: re,
  hideProgress: re,
  setParams: re,
  setText: re,
  onClick: re,
  offClick: re
}), dr = {
  initData: "",
  themeParams: {},
  viewportHeight: 0,
  BackButton: je(),
  SettingsButton: je(),
  MainButton: je(),
  SecondaryButton: je(),
  HapticFeedback: {
    impactOccurred: re,
    notificationOccurred: re,
    selectionChanged: re
  },
  onEvent: re,
  offEvent: re,
  expand: re,
  setHeaderColor: re,
  setBackgroundColor: re,
  setBottomBarColor: re,
  disableVerticalSwipes: re,
  enableVerticalSwipes: re,
  requestFullscreen: re,
  exitFullscreen: re,
  shareToStory: re
}, ce = globalThis.Telegram?.WebApp ?? dr, ur = () => !!ce.initData;
function fr(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Xe = { exports: {} }, _e = { exports: {} }, ne = {};
var tn;
function pr() {
  if (tn) return ne;
  tn = 1;
  var n = typeof Symbol == "function" && Symbol.for, e = n ? /* @__PURE__ */ Symbol.for("react.element") : 60103, t = n ? /* @__PURE__ */ Symbol.for("react.portal") : 60106, o = n ? /* @__PURE__ */ Symbol.for("react.fragment") : 60107, i = n ? /* @__PURE__ */ Symbol.for("react.strict_mode") : 60108, r = n ? /* @__PURE__ */ Symbol.for("react.profiler") : 60114, s = n ? /* @__PURE__ */ Symbol.for("react.provider") : 60109, c = n ? /* @__PURE__ */ Symbol.for("react.context") : 60110, a = n ? /* @__PURE__ */ Symbol.for("react.async_mode") : 60111, l = n ? /* @__PURE__ */ Symbol.for("react.concurrent_mode") : 60111, u = n ? /* @__PURE__ */ Symbol.for("react.forward_ref") : 60112, f = n ? /* @__PURE__ */ Symbol.for("react.suspense") : 60113, d = n ? /* @__PURE__ */ Symbol.for("react.suspense_list") : 60120, m = n ? /* @__PURE__ */ Symbol.for("react.memo") : 60115, h = n ? /* @__PURE__ */ Symbol.for("react.lazy") : 60116, A = n ? /* @__PURE__ */ Symbol.for("react.block") : 60121, p = n ? /* @__PURE__ */ Symbol.for("react.fundamental") : 60117, v = n ? /* @__PURE__ */ Symbol.for("react.responder") : 60118, b = n ? /* @__PURE__ */ Symbol.for("react.scope") : 60119;
  function y(g) {
    if (typeof g == "object" && g !== null) {
      var T = g.$$typeof;
      switch (T) {
        case e:
          switch (g = g.type, g) {
            case a:
            case l:
            case o:
            case r:
            case i:
            case f:
              return g;
            default:
              switch (g = g && g.$$typeof, g) {
                case c:
                case u:
                case h:
                case m:
                case s:
                  return g;
                default:
                  return T;
              }
          }
        case t:
          return T;
      }
    }
  }
  function S(g) {
    return y(g) === l;
  }
  return ne.AsyncMode = a, ne.ConcurrentMode = l, ne.ContextConsumer = c, ne.ContextProvider = s, ne.Element = e, ne.ForwardRef = u, ne.Fragment = o, ne.Lazy = h, ne.Memo = m, ne.Portal = t, ne.Profiler = r, ne.StrictMode = i, ne.Suspense = f, ne.isAsyncMode = function(g) {
    return S(g) || y(g) === a;
  }, ne.isConcurrentMode = S, ne.isContextConsumer = function(g) {
    return y(g) === c;
  }, ne.isContextProvider = function(g) {
    return y(g) === s;
  }, ne.isElement = function(g) {
    return typeof g == "object" && g !== null && g.$$typeof === e;
  }, ne.isForwardRef = function(g) {
    return y(g) === u;
  }, ne.isFragment = function(g) {
    return y(g) === o;
  }, ne.isLazy = function(g) {
    return y(g) === h;
  }, ne.isMemo = function(g) {
    return y(g) === m;
  }, ne.isPortal = function(g) {
    return y(g) === t;
  }, ne.isProfiler = function(g) {
    return y(g) === r;
  }, ne.isStrictMode = function(g) {
    return y(g) === i;
  }, ne.isSuspense = function(g) {
    return y(g) === f;
  }, ne.isValidElementType = function(g) {
    return typeof g == "string" || typeof g == "function" || g === o || g === l || g === r || g === i || g === f || g === d || typeof g == "object" && g !== null && (g.$$typeof === h || g.$$typeof === m || g.$$typeof === s || g.$$typeof === c || g.$$typeof === u || g.$$typeof === p || g.$$typeof === v || g.$$typeof === b || g.$$typeof === A);
  }, ne.typeOf = y, ne;
}
var oe = {};
var nn;
function mr() {
  return nn || (nn = 1, process.env.NODE_ENV !== "production" && (function() {
    var n = typeof Symbol == "function" && Symbol.for, e = n ? /* @__PURE__ */ Symbol.for("react.element") : 60103, t = n ? /* @__PURE__ */ Symbol.for("react.portal") : 60106, o = n ? /* @__PURE__ */ Symbol.for("react.fragment") : 60107, i = n ? /* @__PURE__ */ Symbol.for("react.strict_mode") : 60108, r = n ? /* @__PURE__ */ Symbol.for("react.profiler") : 60114, s = n ? /* @__PURE__ */ Symbol.for("react.provider") : 60109, c = n ? /* @__PURE__ */ Symbol.for("react.context") : 60110, a = n ? /* @__PURE__ */ Symbol.for("react.async_mode") : 60111, l = n ? /* @__PURE__ */ Symbol.for("react.concurrent_mode") : 60111, u = n ? /* @__PURE__ */ Symbol.for("react.forward_ref") : 60112, f = n ? /* @__PURE__ */ Symbol.for("react.suspense") : 60113, d = n ? /* @__PURE__ */ Symbol.for("react.suspense_list") : 60120, m = n ? /* @__PURE__ */ Symbol.for("react.memo") : 60115, h = n ? /* @__PURE__ */ Symbol.for("react.lazy") : 60116, A = n ? /* @__PURE__ */ Symbol.for("react.block") : 60121, p = n ? /* @__PURE__ */ Symbol.for("react.fundamental") : 60117, v = n ? /* @__PURE__ */ Symbol.for("react.responder") : 60118, b = n ? /* @__PURE__ */ Symbol.for("react.scope") : 60119;
    function y(O) {
      return typeof O == "string" || typeof O == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      O === o || O === l || O === r || O === i || O === f || O === d || typeof O == "object" && O !== null && (O.$$typeof === h || O.$$typeof === m || O.$$typeof === s || O.$$typeof === c || O.$$typeof === u || O.$$typeof === p || O.$$typeof === v || O.$$typeof === b || O.$$typeof === A);
    }
    function S(O) {
      if (typeof O == "object" && O !== null) {
        var se = O.$$typeof;
        switch (se) {
          case e:
            var le = O.type;
            switch (le) {
              case a:
              case l:
              case o:
              case r:
              case i:
              case f:
                return le;
              default:
                var fe = le && le.$$typeof;
                switch (fe) {
                  case c:
                  case u:
                  case h:
                  case m:
                  case s:
                    return fe;
                  default:
                    return se;
                }
            }
          case t:
            return se;
        }
      }
    }
    var g = a, T = l, N = c, L = s, w = e, x = u, F = o, W = h, E = m, k = t, B = r, q = i, P = f, V = !1;
    function Y(O) {
      return V || (V = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), U(O) || S(O) === a;
    }
    function U(O) {
      return S(O) === l;
    }
    function R(O) {
      return S(O) === c;
    }
    function K(O) {
      return S(O) === s;
    }
    function M(O) {
      return typeof O == "object" && O !== null && O.$$typeof === e;
    }
    function D(O) {
      return S(O) === u;
    }
    function Q(O) {
      return S(O) === o;
    }
    function G(O) {
      return S(O) === h;
    }
    function Z(O) {
      return S(O) === m;
    }
    function J(O) {
      return S(O) === t;
    }
    function _(O) {
      return S(O) === r;
    }
    function z(O) {
      return S(O) === i;
    }
    function ee(O) {
      return S(O) === f;
    }
    oe.AsyncMode = g, oe.ConcurrentMode = T, oe.ContextConsumer = N, oe.ContextProvider = L, oe.Element = w, oe.ForwardRef = x, oe.Fragment = F, oe.Lazy = W, oe.Memo = E, oe.Portal = k, oe.Profiler = B, oe.StrictMode = q, oe.Suspense = P, oe.isAsyncMode = Y, oe.isConcurrentMode = U, oe.isContextConsumer = R, oe.isContextProvider = K, oe.isElement = M, oe.isForwardRef = D, oe.isFragment = Q, oe.isLazy = G, oe.isMemo = Z, oe.isPortal = J, oe.isProfiler = _, oe.isStrictMode = z, oe.isSuspense = ee, oe.isValidElementType = y, oe.typeOf = S;
  })()), oe;
}
var on;
function wo() {
  return on || (on = 1, process.env.NODE_ENV === "production" ? _e.exports = pr() : _e.exports = mr()), _e.exports;
}
var mt, rn;
function hr() {
  if (rn) return mt;
  rn = 1;
  var n = Object.getOwnPropertySymbols, e = Object.prototype.hasOwnProperty, t = Object.prototype.propertyIsEnumerable;
  function o(r) {
    if (r == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(r);
  }
  function i() {
    try {
      if (!Object.assign)
        return !1;
      var r = new String("abc");
      if (r[5] = "de", Object.getOwnPropertyNames(r)[0] === "5")
        return !1;
      for (var s = {}, c = 0; c < 10; c++)
        s["_" + String.fromCharCode(c)] = c;
      var a = Object.getOwnPropertyNames(s).map(function(u) {
        return s[u];
      });
      if (a.join("") !== "0123456789")
        return !1;
      var l = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(u) {
        l[u] = u;
      }), Object.keys(Object.assign({}, l)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return mt = i() ? Object.assign : function(r, s) {
    for (var c, a = o(r), l, u = 1; u < arguments.length; u++) {
      c = Object(arguments[u]);
      for (var f in c)
        e.call(c, f) && (a[f] = c[f]);
      if (n) {
        l = n(c);
        for (var d = 0; d < l.length; d++)
          t.call(c, l[d]) && (a[l[d]] = c[l[d]]);
      }
    }
    return a;
  }, mt;
}
var ht, sn;
function qt() {
  if (sn) return ht;
  sn = 1;
  var n = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return ht = n, ht;
}
var At, ln;
function xo() {
  return ln || (ln = 1, At = Function.call.bind(Object.prototype.hasOwnProperty)), At;
}
var gt, an;
function Ar() {
  if (an) return gt;
  an = 1;
  var n = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var e = /* @__PURE__ */ qt(), t = {}, o = /* @__PURE__ */ xo();
    n = function(r) {
      var s = "Warning: " + r;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {
      }
    };
  }
  function i(r, s, c, a, l) {
    if (process.env.NODE_ENV !== "production") {
      for (var u in r)
        if (o(r, u)) {
          var f;
          try {
            if (typeof r[u] != "function") {
              var d = Error(
                (a || "React class") + ": " + c + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof r[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw d.name = "Invariant Violation", d;
            }
            f = r[u](s, u, a, c, null, e);
          } catch (h) {
            f = h;
          }
          if (f && !(f instanceof Error) && n(
            (a || "React class") + ": type specification of " + c + " `" + u + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof f + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), f instanceof Error && !(f.message in t)) {
            t[f.message] = !0;
            var m = l ? l() : "";
            n(
              "Failed " + c + " type: " + f.message + (m ?? "")
            );
          }
        }
    }
  }
  return i.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (t = {});
  }, gt = i, gt;
}
var yt, cn;
function gr() {
  if (cn) return yt;
  cn = 1;
  var n = wo(), e = hr(), t = /* @__PURE__ */ qt(), o = /* @__PURE__ */ xo(), i = /* @__PURE__ */ Ar(), r = function() {
  };
  process.env.NODE_ENV !== "production" && (r = function(c) {
    var a = "Warning: " + c;
    typeof console < "u" && console.error(a);
    try {
      throw new Error(a);
    } catch {
    }
  });
  function s() {
    return null;
  }
  return yt = function(c, a) {
    var l = typeof Symbol == "function" && Symbol.iterator, u = "@@iterator";
    function f(U) {
      var R = U && (l && U[l] || U[u]);
      if (typeof R == "function")
        return R;
    }
    var d = "<<anonymous>>", m = {
      array: v("array"),
      bigint: v("bigint"),
      bool: v("boolean"),
      func: v("function"),
      number: v("number"),
      object: v("object"),
      string: v("string"),
      symbol: v("symbol"),
      any: b(),
      arrayOf: y,
      element: S(),
      elementType: g(),
      instanceOf: T,
      node: x(),
      objectOf: L,
      oneOf: N,
      oneOfType: w,
      shape: W,
      exact: E
    };
    function h(U, R) {
      return U === R ? U !== 0 || 1 / U === 1 / R : U !== U && R !== R;
    }
    function A(U, R) {
      this.message = U, this.data = R && typeof R == "object" ? R : {}, this.stack = "";
    }
    A.prototype = Error.prototype;
    function p(U) {
      if (process.env.NODE_ENV !== "production")
        var R = {}, K = 0;
      function M(Q, G, Z, J, _, z, ee) {
        if (J = J || d, z = z || Z, ee !== t) {
          if (a) {
            var O = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw O.name = "Invariant Violation", O;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var se = J + ":" + Z;
            !R[se] && // Avoid spamming the console because they are often not actionable except for lib authors
            K < 3 && (r(
              "You are manually calling a React.PropTypes validation function for the `" + z + "` prop on `" + J + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), R[se] = !0, K++);
          }
        }
        return G[Z] == null ? Q ? G[Z] === null ? new A("The " + _ + " `" + z + "` is marked as required " + ("in `" + J + "`, but its value is `null`.")) : new A("The " + _ + " `" + z + "` is marked as required in " + ("`" + J + "`, but its value is `undefined`.")) : null : U(G, Z, J, _, z);
      }
      var D = M.bind(null, !1);
      return D.isRequired = M.bind(null, !0), D;
    }
    function v(U) {
      function R(K, M, D, Q, G, Z) {
        var J = K[M], _ = q(J);
        if (_ !== U) {
          var z = P(J);
          return new A(
            "Invalid " + Q + " `" + G + "` of type " + ("`" + z + "` supplied to `" + D + "`, expected ") + ("`" + U + "`."),
            { expectedType: U }
          );
        }
        return null;
      }
      return p(R);
    }
    function b() {
      return p(s);
    }
    function y(U) {
      function R(K, M, D, Q, G) {
        if (typeof U != "function")
          return new A("Property `" + G + "` of component `" + D + "` has invalid PropType notation inside arrayOf.");
        var Z = K[M];
        if (!Array.isArray(Z)) {
          var J = q(Z);
          return new A("Invalid " + Q + " `" + G + "` of type " + ("`" + J + "` supplied to `" + D + "`, expected an array."));
        }
        for (var _ = 0; _ < Z.length; _++) {
          var z = U(Z, _, D, Q, G + "[" + _ + "]", t);
          if (z instanceof Error)
            return z;
        }
        return null;
      }
      return p(R);
    }
    function S() {
      function U(R, K, M, D, Q) {
        var G = R[K];
        if (!c(G)) {
          var Z = q(G);
          return new A("Invalid " + D + " `" + Q + "` of type " + ("`" + Z + "` supplied to `" + M + "`, expected a single ReactElement."));
        }
        return null;
      }
      return p(U);
    }
    function g() {
      function U(R, K, M, D, Q) {
        var G = R[K];
        if (!n.isValidElementType(G)) {
          var Z = q(G);
          return new A("Invalid " + D + " `" + Q + "` of type " + ("`" + Z + "` supplied to `" + M + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return p(U);
    }
    function T(U) {
      function R(K, M, D, Q, G) {
        if (!(K[M] instanceof U)) {
          var Z = U.name || d, J = Y(K[M]);
          return new A("Invalid " + Q + " `" + G + "` of type " + ("`" + J + "` supplied to `" + D + "`, expected ") + ("instance of `" + Z + "`."));
        }
        return null;
      }
      return p(R);
    }
    function N(U) {
      if (!Array.isArray(U))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? r(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : r("Invalid argument supplied to oneOf, expected an array.")), s;
      function R(K, M, D, Q, G) {
        for (var Z = K[M], J = 0; J < U.length; J++)
          if (h(Z, U[J]))
            return null;
        var _ = JSON.stringify(U, function(ee, O) {
          var se = P(O);
          return se === "symbol" ? String(O) : O;
        });
        return new A("Invalid " + Q + " `" + G + "` of value `" + String(Z) + "` " + ("supplied to `" + D + "`, expected one of " + _ + "."));
      }
      return p(R);
    }
    function L(U) {
      function R(K, M, D, Q, G) {
        if (typeof U != "function")
          return new A("Property `" + G + "` of component `" + D + "` has invalid PropType notation inside objectOf.");
        var Z = K[M], J = q(Z);
        if (J !== "object")
          return new A("Invalid " + Q + " `" + G + "` of type " + ("`" + J + "` supplied to `" + D + "`, expected an object."));
        for (var _ in Z)
          if (o(Z, _)) {
            var z = U(Z, _, D, Q, G + "." + _, t);
            if (z instanceof Error)
              return z;
          }
        return null;
      }
      return p(R);
    }
    function w(U) {
      if (!Array.isArray(U))
        return process.env.NODE_ENV !== "production" && r("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var R = 0; R < U.length; R++) {
        var K = U[R];
        if (typeof K != "function")
          return r(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + V(K) + " at index " + R + "."
          ), s;
      }
      function M(D, Q, G, Z, J) {
        for (var _ = [], z = 0; z < U.length; z++) {
          var ee = U[z], O = ee(D, Q, G, Z, J, t);
          if (O == null)
            return null;
          O.data && o(O.data, "expectedType") && _.push(O.data.expectedType);
        }
        var se = _.length > 0 ? ", expected one of type [" + _.join(", ") + "]" : "";
        return new A("Invalid " + Z + " `" + J + "` supplied to " + ("`" + G + "`" + se + "."));
      }
      return p(M);
    }
    function x() {
      function U(R, K, M, D, Q) {
        return k(R[K]) ? null : new A("Invalid " + D + " `" + Q + "` supplied to " + ("`" + M + "`, expected a ReactNode."));
      }
      return p(U);
    }
    function F(U, R, K, M, D) {
      return new A(
        (U || "React class") + ": " + R + " type `" + K + "." + M + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + D + "`."
      );
    }
    function W(U) {
      function R(K, M, D, Q, G) {
        var Z = K[M], J = q(Z);
        if (J !== "object")
          return new A("Invalid " + Q + " `" + G + "` of type `" + J + "` " + ("supplied to `" + D + "`, expected `object`."));
        for (var _ in U) {
          var z = U[_];
          if (typeof z != "function")
            return F(D, Q, G, _, P(z));
          var ee = z(Z, _, D, Q, G + "." + _, t);
          if (ee)
            return ee;
        }
        return null;
      }
      return p(R);
    }
    function E(U) {
      function R(K, M, D, Q, G) {
        var Z = K[M], J = q(Z);
        if (J !== "object")
          return new A("Invalid " + Q + " `" + G + "` of type `" + J + "` " + ("supplied to `" + D + "`, expected `object`."));
        var _ = e({}, K[M], U);
        for (var z in _) {
          var ee = U[z];
          if (o(U, z) && typeof ee != "function")
            return F(D, Q, G, z, P(ee));
          if (!ee)
            return new A(
              "Invalid " + Q + " `" + G + "` key `" + z + "` supplied to `" + D + "`.\nBad object: " + JSON.stringify(K[M], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(U), null, "  ")
            );
          var O = ee(Z, z, D, Q, G + "." + z, t);
          if (O)
            return O;
        }
        return null;
      }
      return p(R);
    }
    function k(U) {
      switch (typeof U) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !U;
        case "object":
          if (Array.isArray(U))
            return U.every(k);
          if (U === null || c(U))
            return !0;
          var R = f(U);
          if (R) {
            var K = R.call(U), M;
            if (R !== U.entries) {
              for (; !(M = K.next()).done; )
                if (!k(M.value))
                  return !1;
            } else
              for (; !(M = K.next()).done; ) {
                var D = M.value;
                if (D && !k(D[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function B(U, R) {
      return U === "symbol" ? !0 : R ? R["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && R instanceof Symbol : !1;
    }
    function q(U) {
      var R = typeof U;
      return Array.isArray(U) ? "array" : U instanceof RegExp ? "object" : B(R, U) ? "symbol" : R;
    }
    function P(U) {
      if (typeof U > "u" || U === null)
        return "" + U;
      var R = q(U);
      if (R === "object") {
        if (U instanceof Date)
          return "date";
        if (U instanceof RegExp)
          return "regexp";
      }
      return R;
    }
    function V(U) {
      var R = P(U);
      switch (R) {
        case "array":
        case "object":
          return "an " + R;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + R;
        default:
          return R;
      }
    }
    function Y(U) {
      return !U.constructor || !U.constructor.name ? d : U.constructor.name;
    }
    return m.checkPropTypes = i, m.resetWarningCache = i.resetWarningCache, m.PropTypes = m, m;
  }, yt;
}
var vt, dn;
function yr() {
  if (dn) return vt;
  dn = 1;
  var n = /* @__PURE__ */ qt();
  function e() {
  }
  function t() {
  }
  return t.resetWarningCache = e, vt = function() {
    function o(s, c, a, l, u, f) {
      if (f !== n) {
        var d = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw d.name = "Invariant Violation", d;
      }
    }
    o.isRequired = o;
    function i() {
      return o;
    }
    var r = {
      array: o,
      bigint: o,
      bool: o,
      func: o,
      number: o,
      object: o,
      string: o,
      symbol: o,
      any: o,
      arrayOf: i,
      element: o,
      elementType: o,
      instanceOf: i,
      node: o,
      objectOf: i,
      oneOf: i,
      oneOfType: i,
      shape: i,
      exact: i,
      checkPropTypes: t,
      resetWarningCache: e
    };
    return r.PropTypes = r, r;
  }, vt;
}
var un;
function vr() {
  if (un) return Xe.exports;
  if (un = 1, process.env.NODE_ENV !== "production") {
    var n = wo(), e = !0;
    Xe.exports = /* @__PURE__ */ gr()(n.isElement, e);
  } else
    Xe.exports = /* @__PURE__ */ yr()();
  return Xe.exports;
}
var br = /* @__PURE__ */ vr();
const Ae = /* @__PURE__ */ fr(br), Eo = (n) => {
  const e = I(4), {
    onClick: t
  } = n, [, o] = ro();
  let i, r;
  return e[0] !== o || e[1] !== t ? (i = () => {
    const s = t ?? (() => o("/"));
    return ce.BackButton.onClick(s), ce.BackButton.show(), () => {
      ce.BackButton.offClick(s), ce.BackButton.hide();
    };
  }, r = [t, o], e[0] = o, e[1] = t, e[2] = i, e[3] = r) : (i = e[2], r = e[3]), H(i, r), null;
};
Eo.propTypes = {
  onClick: Ae.func
};
const Cr = (n) => /* @__PURE__ */ ae.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ ae.createElement("g", { id: "24_icon-fill/chevron-left" }, /* @__PURE__ */ ae.createElement("path", { id: "Vector", transform: "translate(2)", d: "M11.1483 3.15225C11.617 2.68362 12.377 2.68362 12.8456 3.15225C13.3142 3.62088 13.3142 4.38089 12.8456 4.84952L5.69425 12.0009L12.8456 19.1523C13.3142 19.6209 13.3142 20.3809 12.8456 20.8495C12.377 21.3181 11.617 21.3181 11.1483 20.8495L3.14835 12.8495C2.67972 12.3809 2.67972 11.6209 3.14835 11.1523L11.1483 3.15225Z", fill: "#3D3C3A" }))), Sr = "_bar_y4u9b_1", Nr = "_scrolled_y4u9b_21", Tr = (n) => {
  let e = n?.parentElement;
  for (; e; ) {
    const t = getComputedStyle(e).overflowY;
    if (t === "auto" || t === "scroll") return e;
    e = e.parentElement;
  }
  return null;
}, gu = (n) => {
  const e = I(19), {
    title: t,
    header: o,
    back: i,
    right: r,
    onRight: s,
    rightVariant: c,
    rightAriaLabel: a,
    rightTitle: l
  } = n, u = o === void 0 ? !0 : o, f = i === void 0 ? !0 : i, [, d] = ro(), {
    inDetailPane: m
  } = kt(), [h, A] = $(!1), p = X(null);
  let v;
  e[0] !== u ? (v = u !== !1 && !ur(), e[0] = u, e[1] = v) : v = e[1];
  const b = v, y = f && !m;
  let S, g;
  if (e[2] !== b ? (S = () => {
    if (!b)
      return;
    const x = Tr(p.current);
    if (!x)
      return;
    let F = 0;
    const W = () => {
      F || (F = requestAnimationFrame(() => {
        F = 0, A(x.scrollTop > 2);
      }));
    };
    return W(), x.addEventListener("scroll", W, {
      passive: !0
    }), () => {
      x.removeEventListener("scroll", W), F && cancelAnimationFrame(F);
    };
  }, g = [b], e[2] = b, e[3] = S, e[4] = g) : (S = e[3], g = e[4]), H(S, g), !b)
    return null;
  const T = `${Sr} ${h ? Nr : ""}`;
  let N;
  e[5] !== d || e[6] !== y ? (N = y && {
    left: /* @__PURE__ */ C(Cr, {}),
    onLeft: () => d("/"),
    leftAriaLabel: "Back",
    leftTitle: "Back"
  }, e[5] = d, e[6] = y, e[7] = N) : N = e[7];
  let L;
  e[8] !== s || e[9] !== r || e[10] !== a || e[11] !== l || e[12] !== c || e[13] !== N || e[14] !== t ? (L = /* @__PURE__ */ C(cr, {
    ...N,
    right: r,
    onRight: s,
    rightVariant: c,
    rightAriaLabel: a,
    rightTitle: l,
    children: t
  }), e[8] = s, e[9] = r, e[10] = a, e[11] = l, e[12] = c, e[13] = N, e[14] = t, e[15] = L) : L = e[15];
  let w;
  return e[16] !== T || e[17] !== L ? (w = /* @__PURE__ */ C("div", {
    ref: p,
    className: T,
    children: L
  }), e[16] = T, e[17] = L, e[18] = w) : w = e[18], w;
}, Pt = "_button_124dm_1", Ro = "_filled_124dm_9", Wo = "_tinted_124dm_14", Fo = "_plain_124dm_19", Ko = "_outlined_124dm_24", Do = "_gray_124dm_28", Bo = "_disabled_124dm_33", Yt = "_skeleton_124dm_38", Io = "_wave_124dm_1", Lr = {
  button: Pt,
  filled: Ro,
  tinted: Wo,
  plain: Fo,
  outlined: Ko,
  gray: Do,
  disabled: Bo,
  skeleton: Yt,
  wave: Io
}, Ur = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  button: Pt,
  default: Lr,
  disabled: Bo,
  filled: Ro,
  gray: Do,
  outlined: Ko,
  plain: Fo,
  skeleton: Yt,
  tinted: Wo,
  wave: Io
}, Symbol.toStringTag, { value: "Module" })), yu = (n) => {
  const e = I(34);
  let t, o, i, r, s;
  e[0] !== n ? ({
    variant: s,
    label: t,
    isShine: i,
    isFill: r,
    ...o
  } = n, e[0] = n, e[1] = t, e[2] = o, e[3] = i, e[4] = r, e[5] = s) : (t = e[1], o = e[2], i = e[3], r = e[4], s = e[5]);
  const c = i === void 0 ? !1 : i, a = r === void 0 ? !1 : r, {
    isApple: l
  } = Ce(), u = !!Pe(), f = Ze(u);
  let d;
  e[6] !== a ? (d = a && {
    "data-fill": !0
  }, e[6] = a, e[7] = d) : d = e[7];
  let m;
  e[8] !== c || e[9] !== u || e[10] !== s ? (m = s === "filled" && c && !u && {
    "data-shine": !0
  }, e[8] = c, e[9] = u, e[10] = s, e[11] = m) : m = e[11];
  let h;
  e[12] !== d || e[13] !== m ? (h = {
    ...d,
    ...m
  }, e[12] = d, e[13] = m, e[14] = h) : h = e[14];
  const A = h;
  let p;
  e[15] !== t ? (p = /* @__PURE__ */ C(te, {
    variant: "body",
    weight: "semibold",
    children: t
  }), e[15] = t, e[16] = p) : p = e[16];
  const v = p, b = u ? Ye : void 0, y = `${Pt} ${Ur[s]} ${u ? Yt : ""} ${f}`;
  let S;
  e[17] !== l || e[18] !== u ? (S = l && !u && {
    whileTap: {
      scale: 1.02
    }
  }, e[17] = l, e[18] = u, e[19] = S) : S = e[19];
  let g;
  e[20] !== u || e[21] !== s ? (g = s === "filled" && !u && /* @__PURE__ */ C(ke, {}), e[20] = u, e[21] = s, e[22] = g) : g = e[22];
  let T;
  e[23] !== v || e[24] !== u ? (T = u ? /* @__PURE__ */ C(Wt, {
    active: !1,
    children: v
  }) : v, e[23] = v, e[24] = u, e[25] = T) : T = e[25];
  let N;
  return e[26] !== A || e[27] !== o || e[28] !== g || e[29] !== T || e[30] !== b || e[31] !== y || e[32] !== S ? (N = /* @__PURE__ */ j(ie.div, {
    ref: b,
    className: y,
    ...S,
    ...A,
    ...o,
    children: [g, T]
  }), e[26] = A, e[27] = o, e[28] = g, e[29] = T, e[30] = b, e[31] = y, e[32] = S, e[33] = N) : N = e[33], N;
}, Qt = "_button_p0j3d_1", Mo = "_filled_p0j3d_17", ko = "_tinted_p0j3d_22", qo = "_plain_p0j3d_27", Po = "_gray_p0j3d_32", Yo = "_disabled_p0j3d_37", Ot = "_skeleton_p0j3d_42", wr = {
  button: Qt,
  filled: Mo,
  tinted: ko,
  plain: qo,
  gray: Po,
  disabled: Yo,
  skeleton: Ot
}, xr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  button: Qt,
  default: wr,
  disabled: Yo,
  filled: Mo,
  gray: Po,
  plain: qo,
  skeleton: Ot,
  tinted: ko
}, Symbol.toStringTag, { value: "Module" }));
function vu(n) {
  const e = I(18);
  let t, o, i, r, s;
  e[0] !== n ? ({
    variant: s,
    icon: t,
    label: o,
    style: r,
    ...i
  } = n, e[0] = n, e[1] = t, e[2] = o, e[3] = i, e[4] = r, e[5] = s) : (t = e[1], o = e[2], i = e[3], r = e[4], s = e[5]);
  const c = !!Pe(), a = Ze(c);
  let l;
  e[6] !== o ? (l = /* @__PURE__ */ C(te, {
    variant: "footnote",
    weight: "semibold",
    children: o
  }), e[6] = o, e[7] = l) : l = e[7];
  const u = l, f = c ? Ye : void 0, d = `${Qt} ${xr[s]} ${c ? Ot : ""} ${a}`;
  let m;
  e[8] !== u || e[9] !== c ? (m = c ? /* @__PURE__ */ C(Wt, {
    active: !1,
    children: u
  }) : u, e[8] = u, e[9] = c, e[10] = m) : m = e[10];
  let h;
  return e[11] !== t || e[12] !== i || e[13] !== r || e[14] !== f || e[15] !== d || e[16] !== m ? (h = /* @__PURE__ */ j("div", {
    ref: f,
    className: d,
    style: r,
    ...i,
    children: [t, m]
  }), e[11] = t, e[12] = i, e[13] = r, e[14] = f, e[15] = d, e[16] = m, e[17] = h) : h = e[17], h;
}
function Qo(n) {
  var e, t, o = "";
  if (typeof n == "string" || typeof n == "number") o += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var i = n.length;
    for (e = 0; e < i; e++) n[e] && (t = Qo(n[e])) && (o && (o += " "), o += t);
  } else for (t in n) n[t] && (o && (o += " "), o += t);
  return o;
}
function Er() {
  for (var n, e, t = 0, o = "", i = arguments.length; t < i; t++) (n = arguments[t]) && (e = Qo(n)) && (o && (o += " "), o += e);
  return o;
}
const st = (...n) => Er(...n);
function bu(n) {
  const e = I(10);
  let t, o, i;
  e[0] !== n ? ({
    children: t,
    className: o,
    ...i
  } = n, e[0] = n, e[1] = t, e[2] = o, e[3] = i) : (t = e[1], o = e[2], i = e[3]);
  let r;
  e[4] !== o ? (r = st("[&:last-child]:[--cell-separator-height:0px]", o), e[4] = o, e[5] = r) : r = e[5];
  let s;
  return e[6] !== t || e[7] !== i || e[8] !== r ? (s = /* @__PURE__ */ C("div", {
    className: r,
    ...i,
    children: t
  }), e[6] = t, e[7] = i, e[8] = r, e[9] = s) : s = e[9], s;
}
const lt = {
  MATERIAL_STANDARD: [0.26, 0.08, 0.25, 1],
  QUINT_OUT: [0.23, 1, 0.32, 1]
}, Rr = {
  NORMAL: 200
}, be = {
  APPLE: {
    type: "spring",
    stiffness: 640,
    damping: 40
  },
  MATERIAL: {
    type: "spring",
    stiffness: 800,
    damping: 60,
    mass: 1
  },
  DROPDOWN: {
    type: "spring",
    stiffness: 500,
    damping: 32
  },
  SNAP: {
    type: "spring",
    stiffness: 120,
    damping: 20
  },
  GENTLE: {
    type: "spring",
    stiffness: 500,
    damping: 40
  },
  SNACKBAR: {
    type: "spring",
    stiffness: 280,
    damping: 26
  },
  MODAL: {
    type: "spring",
    stiffness: 250,
    damping: 30
  }
}, Oo = {
  hidden: {
    scale: 0,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: be.DROPDOWN
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.25
    }
  }
}, Go = {
  MATERIAL_STANDARD: {
    ease: lt.MATERIAL_STANDARD,
    duration: Rr.NORMAL / 1e3
  },
  MORPH: {
    duration: 0.25,
    type: "spring",
    bounce: 0,
    opacity: {
      duration: 0.35,
      type: "spring",
      bounce: 0
    }
  }
}, Vo = /* @__PURE__ */ ye(!1), Wr = () => Ne(Vo), Zo = "_overlay_qo6yx_1", zo = "_opacity_qo6yx_2", Gt = "_fadeIn_qo6yx_6", Vt = "_fadeOut_qo6yx_10", Fr = {
  overlay: Zo,
  opacity: zo,
  fadeIn: Gt,
  fadeOut: Vt,
  "overlay-out": "_overlay-out_qo6yx_1",
  "opacity-out": "_opacity-out_qo6yx_1"
}, Kr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fr,
  fadeIn: Gt,
  fadeOut: Vt,
  opacity: zo,
  overlay: Zo
}, Symbol.toStringTag, { value: "Module" })), Dr = typeof window < "u" && "ontouchstart" in window, Br = 250;
function Ir(n) {
  const e = I(21);
  let t;
  e[0] !== n ? (t = n === void 0 ? {} : n, e[0] = n, e[1] = t) : t = e[1];
  const {
    onTap: o,
    onTapOut: i,
    mode: r,
    disabled: s
  } = t, a = Kr[r === void 0 ? "overlay" : r], [l, u] = $(!1);
  let f;
  e[2] !== a ? (f = [a], e[2] = a, e[3] = f) : f = e[3];
  const [d, m] = $(f), h = X();
  let A;
  e[4] !== a || e[5] !== i ? (A = () => {
    u(!1), m([a, Vt]), i?.(), h.current = window.setTimeout(() => {
      m([a]);
    }, Br);
  }, e[4] = a, e[5] = i, e[6] = A) : A = e[6];
  const p = A;
  let v;
  e[7] !== a || e[8] !== o ? (v = (L) => {
    clearTimeout(h.current), u(!0), m([a, Gt]), o?.(L);
  }, e[7] = a, e[8] = o, e[9] = v) : v = e[9];
  const b = v;
  let y, S;
  e[10] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (y = () => () => clearTimeout(h.current), S = [], e[10] = y, e[11] = S) : (y = e[10], S = e[11]), H(y, S);
  let g;
  e[12] !== s || e[13] !== b || e[14] !== p || e[15] !== l ? (g = Dr ? {
    onTouchStart: (L) => {
      s || (L.touches.length === 1 ? b({
        target: L.currentTarget,
        clientX: L.touches[0].clientX,
        clientY: L.touches[0].clientY
      }) : p());
    },
    onTouchEnd: () => {
      s || l && p();
    },
    onPointerMove: (L) => {
      l && L.pointerType === "touch" && (L.movementY !== 0 || L.movementX !== 0) && p();
    },
    onTouchCancel: () => {
      l && p();
    }
  } : {
    onMouseLeave: () => {
      l && p();
    },
    onMouseDown: (L) => {
      s || b({
        target: L.currentTarget,
        clientX: L.clientX,
        clientY: L.clientY
      });
    },
    onMouseUp: () => {
      s || l && p();
    },
    onContextMenu: () => {
      l && p();
    }
  }, e[12] = s, e[13] = b, e[14] = p, e[15] = l, e[16] = g) : g = e[16];
  const T = g;
  let N;
  return e[17] !== T || e[18] !== l || e[19] !== d ? (N = [l, T, d], e[17] = T, e[18] = l, e[19] = d, e[20] = N) : N = e[20], N;
}
const Mr = "_root_1oiyj_1", kr = "_fade_1oiyj_22", qr = "_ripples_1oiyj_30", Pr = "_ripple_1oiyj_30", Yr = "_tapped_1oiyj_47", He = (...n) => n.filter(Boolean).join(" "), Qr = (n, e) => {
  const t = {
    ...n
  };
  for (const o of Object.keys(e)) {
    const i = n[o], r = e[o];
    t[o] = i ? (s) => {
      i(s), r(s);
    } : r;
  }
  return t;
}, Or = ({
  as: n = "div",
  children: e,
  className: t = "",
  mode: o = "overlay",
  disabled: i = !1,
  ...r
}) => {
  const {
    isApple: s,
    isMaterial: c
  } = Ce(), [a, l] = $({}), [u, f, d] = Ir({
    mode: o,
    disabled: i,
    onTap: ({
      target: A,
      clientX: p,
      clientY: v
    }) => {
      if (!c || !A) return;
      const {
        x: b,
        y,
        width: S,
        height: g
      } = A.getBoundingClientRect(), T = Math.max(S * 2, g * 2);
      l((N) => ({
        ...N,
        [`${performance.now()}`]: [p - b - T / 2, v - y - T / 2, T]
      }));
    }
  }), m = o === "opacity", h = Qr(r, f);
  return /* @__PURE__ */ j(n, {
    ...h,
    disabled: i || void 0,
    className: He(Mr, t, m && He(...d)),
    children: [e, s && !m && /* @__PURE__ */ C("div", {
      className: He(kr, ...d)
    }), c && /* @__PURE__ */ C("div", {
      className: qr,
      children: Object.entries(a).map(([A, p]) => /* @__PURE__ */ C("span", {
        className: He(Pr, u && Yr),
        style: {
          left: p[0],
          top: p[1],
          width: p[2],
          height: p[2]
        },
        onAnimationEnd: () => {
          u || l((v) => {
            const b = {
              ...v
            };
            return delete b[A], b;
          });
        }
      }, A))
    })]
  });
}, Gr = "_label_1w5sq_1", Vr = "_accent_1w5sq_6", Zr = "_description_1w5sq_10", fn = "_caption_1w5sq_14", zr = (n) => {
  const e = I(15), {
    type: t,
    title: o,
    description: i,
    caption: r,
    bold: s
  } = n, c = s ? "medium" : "regular", a = `${Gr} ${t === "Accent" ? Vr : ""}`;
  let l;
  e[0] !== o || e[1] !== c ? (l = /* @__PURE__ */ C(te, {
    variant: "body",
    weight: c,
    children: o
  }), e[0] = o, e[1] = c, e[2] = l) : l = e[2];
  let u;
  e[3] !== a || e[4] !== l ? (u = /* @__PURE__ */ C("div", {
    className: a,
    children: l
  }), e[3] = a, e[4] = l, e[5] = u) : u = e[5];
  let f;
  e[6] !== r || e[7] !== i ? (f = i && /* @__PURE__ */ C("div", {
    className: r ? Zr : fn,
    children: /* @__PURE__ */ C(te, {
      variant: r ? "subheadline1" : "subheadline2",
      weight: "regular",
      children: i
    })
  }), e[6] = r, e[7] = i, e[8] = f) : f = e[8];
  let d;
  e[9] !== r ? (d = r && /* @__PURE__ */ C("div", {
    className: fn,
    children: /* @__PURE__ */ C(te, {
      variant: "subheadline2",
      weight: "regular",
      children: r
    })
  }), e[9] = r, e[10] = d) : d = e[10];
  let m;
  return e[11] !== u || e[12] !== f || e[13] !== d ? (m = /* @__PURE__ */ j(ge, {
    children: [u, f, d]
  }), e[11] = u, e[12] = f, e[13] = d, e[14] = m) : m = e[14], m;
}, Jo = "_chevron_en74z_1", jo = "_dropdown_en74z_8", Zt = "_colorpicker_en74z_12", zt = "_picker_en74z_63", Jr = {
  chevron: Jo,
  dropdown: jo,
  colorpicker: Zt,
  picker: zt
}, pn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  chevron: Jo,
  colorpicker: Zt,
  default: Jr,
  dropdown: jo,
  picker: zt
}, Symbol.toStringTag, { value: "Module" })), jr = (n) => {
  const e = I(21), {
    type: t,
    className: o,
    children: i,
    value: r,
    onChange: s,
    inputRef: c,
    id: a,
    name: l,
    showValue: u
  } = n, f = l === void 0 ? "color" : l, d = u === void 0 ? !0 : u;
  if (t === "Picker") {
    let b;
    return e[0] !== i ? (b = /* @__PURE__ */ C("div", {
      className: zt,
      children: /* @__PURE__ */ C(te, {
        variant: "body",
        weight: "regular",
        children: i
      })
    }), e[0] = i, e[1] = b) : b = e[1], b;
  }
  if (t === "ColorPicker") {
    const b = a || f;
    let y;
    e[2] !== b || e[3] !== c || e[4] !== f || e[5] !== s || e[6] !== r ? (y = /* @__PURE__ */ C("input", {
      ref: c,
      type: "color",
      value: r,
      onChange: s,
      name: f,
      id: b
    }), e[2] = b, e[3] = c, e[4] = f, e[5] = s, e[6] = r, e[7] = y) : y = e[7];
    let S;
    e[8] !== b || e[9] !== d || e[10] !== r ? (S = d && /* @__PURE__ */ C("label", {
      htmlFor: b,
      children: /* @__PURE__ */ C(te, {
        variant: "body",
        weight: "regular",
        children: r
      })
    }), e[8] = b, e[9] = d, e[10] = r, e[11] = S) : S = e[11];
    let g;
    return e[12] !== y || e[13] !== S ? (g = /* @__PURE__ */ j("div", {
      className: Zt,
      children: [y, S]
    }), e[12] = y, e[13] = S, e[14] = g) : g = e[14], g;
  }
  const m = pn[t.toLowerCase()], h = pn[o];
  let A;
  e[15] !== m || e[16] !== h ? (A = [m, h].filter(Boolean), e[15] = m, e[16] = h, e[17] = A) : A = e[17];
  const p = A.join(" ");
  let v;
  return e[18] !== i || e[19] !== p ? (v = /* @__PURE__ */ C("div", {
    className: p,
    children: i
  }), e[18] = i, e[19] = p, e[20] = v) : v = e[20], v;
}, Xo = (n) => /* @__PURE__ */ ae.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ ae.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ ae.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5ZM15.1016 9.01953C14.7891 8.70711 14.2821 8.70711 13.9697 9.01953L12.001 10.9873L10.0342 9.02051C9.72176 8.70809 9.21574 8.70809 8.90332 9.02051C8.5909 9.33293 8.5909 9.83895 8.90332 10.1514L10.8701 12.1191L9.02051 13.9697C8.70809 14.2821 8.70809 14.7882 9.02051 15.1006C9.33293 15.413 9.83895 15.413 10.1514 15.1006L12.001 13.25L13.8525 15.1016C14.165 15.414 14.672 15.414 14.9844 15.1016C15.2968 14.7891 15.2968 14.2821 14.9844 13.9697L13.1328 12.1182L15.1016 10.1514C15.414 9.83895 15.414 9.33195 15.1016 9.01953Z", fill: "#3D3C3A" }))), Xr = "_root_9aal5_1", _r = "_input_9aal5_5", Hr = "_inputWithClearButton_9aal5_25", $r = "_clearButtonIcon_9aal5_29", es = "_empty_9aal5_49", ts = "_icon_9aal5_61", ns = /* @__PURE__ */ qe((n, e) => {
  const t = I(24);
  let o, i, r, s, c, a;
  t[0] !== n ? ({
    label: o,
    value: a,
    onChange: i,
    onClear: r,
    ...s
  } = n, c = (b) => {
    i(b.target.value);
  }, t[0] = n, t[1] = o, t[2] = i, t[3] = r, t[4] = s, t[5] = c, t[6] = a) : (o = t[1], i = t[2], r = t[3], s = t[4], c = t[5], a = t[6]);
  const l = c, u = !a && es;
  let f;
  t[7] !== u ? (f = [Xr, u].filter(Boolean), t[7] = u, t[8] = f) : f = t[8];
  const d = f.join(" "), m = `${_r} ${r ? Hr : ""}`, h = !i;
  let A;
  t[9] !== l || t[10] !== o || t[11] !== e || t[12] !== s || t[13] !== m || t[14] !== h || t[15] !== a ? (A = /* @__PURE__ */ C("input", {
    "aria-label": o,
    onChange: l,
    type: "text",
    className: m,
    placeholder: o,
    value: a,
    readOnly: h,
    ref: e,
    ...s
  }), t[9] = l, t[10] = o, t[11] = e, t[12] = s, t[13] = m, t[14] = h, t[15] = a, t[16] = A) : A = t[16];
  let p;
  t[17] !== o || t[18] !== r ? (p = r && /* @__PURE__ */ C("button", {
    type: "button",
    className: [ts, $r].filter(Boolean).join(" "),
    onClick: r,
    "aria-label": `Clear ${o}`,
    children: /* @__PURE__ */ C(Xo, {})
  }), t[17] = o, t[18] = r, t[19] = p) : p = t[19];
  let v;
  return t[20] !== d || t[21] !== A || t[22] !== p ? (v = /* @__PURE__ */ j(te, {
    variant: "body",
    weight: "regular",
    className: d,
    children: [A, p]
  }), t[20] = d, t[21] = A, t[22] = p, t[23] = v) : v = t[23], v;
}), mn = "_root_1aqfj_1";
function os(n) {
  const e = I(15), {
    value: t,
    defaultValue: o,
    onChange: i,
    disabled: r,
    className: s
  } = n, c = o === void 0 ? !1 : o, a = r === void 0 ? !1 : r, l = t !== void 0, [u, f] = $(c), d = l ? t : u;
  let m;
  e[0] !== i ? (m = (N) => {
    i && i(N);
  }, e[0] = i, e[1] = m) : m = e[1];
  const h = m;
  let A;
  e[2] !== d || e[3] !== h || e[4] !== l ? (A = () => {
    if (ce.HapticFeedback.selectionChanged(), l) {
      h(!d);
      return;
    }
    f((N) => {
      const L = !N;
      return h(L), L;
    });
  }, e[2] = d, e[3] = h, e[4] = l, e[5] = A) : A = e[5];
  const p = A;
  let v;
  e[6] !== a || e[7] !== p ? (v = (N) => {
    N.stopPropagation(), !a && p();
  }, e[6] = a, e[7] = p, e[8] = v) : v = e[8];
  const b = v, y = s ? `${mn} ${s}` : mn, S = a || void 0, g = a || void 0;
  let T;
  return e[9] !== d || e[10] !== y || e[11] !== b || e[12] !== S || e[13] !== g ? (T = /* @__PURE__ */ C("div", {
    className: y,
    "data-state": d,
    "data-disabled": S,
    onClick: b,
    role: "switch",
    "aria-checked": d,
    "aria-disabled": g
  }), e[9] = d, e[10] = y, e[11] = b, e[12] = S, e[13] = g, e[14] = T) : T = e[14], T;
}
const is = (n) => {
  const e = I(29);
  let t, o, i, r, s, c, a;
  e[0] !== n ? ({
    start: r,
    children: t,
    value: a,
    defaultValue: s,
    onChange: o,
    disabled: c,
    ...i
  } = n, e[0] = n, e[1] = t, e[2] = o, e[3] = i, e[4] = r, e[5] = s, e[6] = c, e[7] = a) : (t = e[1], o = e[2], i = e[3], r = e[4], s = e[5], c = e[6], a = e[7]);
  const l = s === void 0 ? !1 : s, u = c === void 0 ? !1 : c, f = a !== void 0, [d, m] = $(l), h = f ? a : d;
  let A;
  e[8] !== o ? (A = (N) => {
    o && o(N);
  }, e[8] = o, e[9] = A) : A = e[9];
  const p = A;
  let v;
  e[10] !== p || e[11] !== f ? (v = (N) => {
    f || m(N), p(N);
  }, e[10] = p, e[11] = f, e[12] = v) : v = e[12];
  const b = v;
  let y;
  e[13] !== h || e[14] !== u || e[15] !== p || e[16] !== b || e[17] !== f ? (y = () => {
    if (!u) {
      if (ce.HapticFeedback.selectionChanged(), f) {
        b(!h);
        return;
      }
      m((N) => {
        const L = !N;
        return p(L), L;
      });
    }
  }, e[13] = h, e[14] = u, e[15] = p, e[16] = b, e[17] = f, e[18] = y) : y = e[18];
  const S = y;
  let g;
  e[19] !== h || e[20] !== u || e[21] !== b ? (g = /* @__PURE__ */ C(Se.Part, {
    type: "Switch",
    children: /* @__PURE__ */ C(os, {
      value: h,
      onChange: b,
      disabled: u
    })
  }), e[19] = h, e[20] = u, e[21] = b, e[22] = g) : g = e[22];
  let T;
  return e[23] !== t || e[24] !== S || e[25] !== i || e[26] !== r || e[27] !== g ? (T = /* @__PURE__ */ C(Se, {
    start: r,
    end: g,
    onClick: S,
    ...i,
    children: t
  }), e[23] = t, e[24] = S, e[25] = i, e[26] = r, e[27] = g, e[28] = T) : T = e[28], T;
}, hn = "_root_146xt_10", rs = "_start_146xt_32", ss = "_image_146xt_37", ls = "_icon_146xt_45", as = "_body_146xt_57", cs = "_end_146xt_65", ds = "_caption_146xt_76", us = "_label_146xt_80", fs = (n) => {
  const e = I(28);
  let t, o, i, r, s, c, a;
  e[0] !== n ? ({
    as: c,
    start: s,
    children: t,
    end: o,
    onClick: i,
    tappable: a,
    ...r
  } = n, e[0] = n, e[1] = t, e[2] = o, e[3] = i, e[4] = r, e[5] = s, e[6] = c, e[7] = a) : (t = e[1], o = e[2], i = e[3], r = e[4], s = e[5], c = e[6], a = e[7]);
  const l = c === void 0 ? "div" : c, u = a ?? (i != null || l !== "div");
  let f;
  e[8] !== s ? (f = s && /* @__PURE__ */ C("div", {
    className: rs,
    children: s
  }), e[8] = s, e[9] = f) : f = e[9];
  let d;
  e[10] !== t ? (d = /* @__PURE__ */ C("div", {
    className: as,
    children: t
  }), e[10] = t, e[11] = d) : d = e[11];
  let m;
  e[12] !== o ? (m = o && /* @__PURE__ */ C("div", {
    className: cs,
    children: o
  }), e[12] = o, e[13] = m) : m = e[13];
  let h;
  e[14] !== f || e[15] !== d || e[16] !== m ? (h = /* @__PURE__ */ j(ge, {
    children: [f, d, m]
  }), e[14] = f, e[15] = d, e[16] = m, e[17] = h) : h = e[17];
  const A = h;
  if (!u) {
    let v;
    return e[18] !== l || e[19] !== A || e[20] !== i || e[21] !== r ? (v = /* @__PURE__ */ C(l, {
      className: hn,
      onClick: i,
      ...r,
      children: A
    }), e[18] = l, e[19] = A, e[20] = i, e[21] = r, e[22] = v) : v = e[22], v;
  }
  let p;
  return e[23] !== l || e[24] !== A || e[25] !== i || e[26] !== r ? (p = /* @__PURE__ */ C(Or, {
    as: l,
    className: hn,
    onClick: i,
    ...r,
    children: A
  }), e[23] = l, e[24] = A, e[25] = i, e[26] = r, e[27] = p) : p = e[27], p;
}, ps = (n) => {
  const e = I(6), {
    type: t,
    src: o,
    iconType: i
  } = n, r = o === void 0 ? null : o, s = i === void 0 ? null : i;
  let c;
  e: switch (t) {
    case "Image": {
      let l;
      e[0] !== r ? (l = /* @__PURE__ */ C("img", {
        src: r,
        alt: "",
        className: ss
      }), e[0] = r, e[1] = l) : l = e[1], c = l;
      break e;
    }
    case "Icon": {
      let l;
      e[2] !== s ? (l = /* @__PURE__ */ C("div", {
        className: ls,
        children: s
      }), e[2] = s, e[3] = l) : l = e[3], c = l;
      break e;
    }
    default:
      c = null;
  }
  let a;
  return e[4] !== c ? (a = /* @__PURE__ */ C(ge, {
    children: c
  }), e[4] = c, e[5] = a) : a = e[5], a;
}, ms = (n) => {
  const e = I(7), {
    label: t,
    caption: o
  } = n;
  let i;
  e[0] !== t ? (i = /* @__PURE__ */ C("div", {
    className: us,
    children: /* @__PURE__ */ C(te, {
      variant: "body",
      weight: "regular",
      children: t
    })
  }), e[0] = t, e[1] = i) : i = e[1];
  let r;
  e[2] !== o ? (r = o && /* @__PURE__ */ C("div", {
    className: ds,
    children: /* @__PURE__ */ C(te, {
      variant: "subheadline2",
      weight: "regular",
      children: o
    })
  }), e[2] = o, e[3] = r) : r = e[3];
  let s;
  return e[4] !== i || e[5] !== r ? (s = /* @__PURE__ */ j(ge, {
    children: [i, r]
  }), e[4] = i, e[5] = r, e[6] = s) : s = e[6], s;
}, Se = Object.assign(fs, {
  Start: ps,
  End: ms,
  Part: jr,
  Text: zr,
  Editable: ns,
  Switch: is
}), hs = "_root_f541i_1", As = "_card_f541i_14", gs = "_fill_f541i_32", ys = "_content_f541i_39", An = "_morphLine_f541i_43", vs = "_logoStack_f541i_47", bs = "_logoFront_f541i_51", Cs = "_logoBehind_f541i_56", $e = Go.MATERIAL_STANDARD, Ss = 10, Ns = {
  collapsed: {
    scale: 0.6,
    x: -6,
    y: -6
  },
  expanded: {
    scale: 1,
    x: 0,
    y: 0
  }
}, Ts = {
  collapsed: {
    scale: 0.6,
    x: 6,
    y: 6,
    opacity: 1
  },
  expanded: {
    scale: 0,
    x: 0,
    y: 0,
    opacity: 0
  }
}, Ls = (n) => {
  const {
    start: e,
    end: t,
    children: o
  } = n.props;
  return {
    start: e,
    title: o?.props?.title,
    description: o?.props?.description,
    bold: o?.props?.bold,
    value: t?.props?.title
  };
}, bt = (n, e = "text") => typeof n == "string" ? /* @__PURE__ */ C(lo, {
  variant: e,
  animation: "smooth",
  children: n
}) : n;
function Us(n) {
  const e = I(21), {
    children: t
  } = n, o = Wr();
  let i, r, s, c, a, l, u;
  if (e[0] !== t || e[1] !== o) {
    const [m, h] = xe.toArray(t).map(Ls), A = o ? "expanded" : "collapsed";
    s = o ? h : m;
    const p = !!(m.description && h.description), v = s.description ?? h.description ?? m.description, b = v && !s.description ? Ss : 0;
    r = Se, l = /* @__PURE__ */ j("div", {
      className: vs,
      children: [/* @__PURE__ */ C(ie.div, {
        className: bs,
        variants: Ns,
        animate: A,
        transition: $e,
        children: h.start
      }), /* @__PURE__ */ C(ie.div, {
        className: Cs,
        variants: Ts,
        animate: A,
        transition: $e,
        children: m.start
      })]
    }), u = s.value && /* @__PURE__ */ C(Se.Text, {
      title: bt(s.value, "number")
    }), i = Se.Text;
    let y;
    e[9] !== b ? (y = {
      y: b
    }, e[9] = b, e[10] = y) : y = e[10], c = /* @__PURE__ */ C(ie.span, {
      className: An,
      animate: y,
      transition: $e,
      children: bt(s.title)
    }), a = v && /* @__PURE__ */ C(ie.span, {
      className: An,
      animate: {
        y: b,
        opacity: s.description ? 1 : 0
      },
      transition: $e,
      children: p ? bt(s.description) : v
    }), e[0] = t, e[1] = o, e[2] = i, e[3] = r, e[4] = s, e[5] = c, e[6] = a, e[7] = l, e[8] = u;
  } else
    i = e[2], r = e[3], s = e[4], c = e[5], a = e[6], l = e[7], u = e[8];
  let f;
  e[11] !== i || e[12] !== s.bold || e[13] !== c || e[14] !== a ? (f = /* @__PURE__ */ C(i, {
    title: c,
    description: a,
    bold: s.bold
  }), e[11] = i, e[12] = s.bold, e[13] = c, e[14] = a, e[15] = f) : f = e[15];
  let d;
  return e[16] !== r || e[17] !== l || e[18] !== u || e[19] !== f ? (d = /* @__PURE__ */ C(r, {
    start: l,
    end: u,
    children: f
  }), e[16] = r, e[17] = l, e[18] = u, e[19] = f, e[20] = d) : d = e[20], d;
}
const ws = rt.section, xs = Rt[16], Es = 0.6, gn = {
  ease: "linear",
  duration: 0.15
}, Rs = 13, Ws = 0.09, Fs = 0.1, Ks = {
  1: 0.28,
  2: 0.68
}, Ds = ({
  depth: n,
  expanded: e
}) => e || n < 1 ? {
  y: 0,
  scale: 1,
  opacity: 1
} : {
  y: n * Rs,
  scale: 1 - n * Ws,
  opacity: n > 2 ? 0 : 1 - n * Fs
}, Bs = (n) => {
  const e = I(18), {
    children: t,
    depth: o,
    expanded: i,
    spring: r,
    isApple: s,
    total: c
  } = n, a = X(null), l = s ? ws : xs;
  let u;
  e[0] !== l ? (u = {
    radius: l,
    smoothing: Es
  }, e[0] = l, e[1] = u) : u = e[1];
  let f;
  e[2] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (f = {
    autoEffects: !1
  }, e[2] = f) : f = e[2], so(a, u, f);
  const d = o >= 1, m = c - o;
  let h;
  e[3] !== m ? (h = {
    zIndex: m
  }, e[3] = m, e[4] = h) : h = e[4];
  let A;
  e[5] !== o || e[6] !== i ? (A = Ds({
    depth: o,
    expanded: i
  }), e[5] = o, e[6] = i, e[7] = A) : A = e[7];
  let p;
  e[8] !== d || e[9] !== t || e[10] !== o || e[11] !== i ? (p = d ? /* @__PURE__ */ j(ge, {
    children: [/* @__PURE__ */ C(ie.div, {
      className: gs,
      animate: {
        opacity: i ? 0 : Ks[o] ?? 0
      },
      transition: gn
    }), /* @__PURE__ */ C(ie.div, {
      className: ys,
      animate: {
        opacity: i ? 1 : 0
      },
      transition: gn,
      children: t
    })]
  }) : t, e[8] = d, e[9] = t, e[10] = o, e[11] = i, e[12] = p) : p = e[12];
  let v;
  return e[13] !== r || e[14] !== h || e[15] !== A || e[16] !== p ? (v = /* @__PURE__ */ C(ie.div, {
    ref: a,
    layout: !0,
    className: As,
    style: h,
    animate: A,
    transition: r,
    children: p
  }), e[13] = r, e[14] = h, e[15] = A, e[16] = p, e[17] = v) : v = e[17], v;
};
function Is(n) {
  const e = I(20), {
    children: t,
    defaultExpanded: o
  } = n, i = o === void 0 ? !1 : o, {
    isApple: r
  } = Ce(), [s, c] = $(i), a = r ? be.APPLE : be.MATERIAL;
  let l, u, f, d, m, h;
  if (e[0] !== t || e[1] !== s || e[2] !== r || e[3] !== a) {
    const v = xe.toArray(t);
    l = Vo.Provider, h = s, u = hs, f = s, e[10] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (d = () => c(Ms), e[10] = d) : d = e[10], m = v.map((b, y) => /* @__PURE__ */ C(Bs, {
      depth: y,
      expanded: s,
      spring: a,
      isApple: r,
      total: v.length,
      children: b
    }, b.key ?? y)), e[0] = t, e[1] = s, e[2] = r, e[3] = a, e[4] = l, e[5] = u, e[6] = f, e[7] = d, e[8] = m, e[9] = h;
  } else
    l = e[4], u = e[5], f = e[6], d = e[7], m = e[8], h = e[9];
  let A;
  e[11] !== u || e[12] !== f || e[13] !== d || e[14] !== m ? (A = /* @__PURE__ */ C("div", {
    className: u,
    "data-expanded": f,
    onClick: d,
    children: m
  }), e[11] = u, e[12] = f, e[13] = d, e[14] = m, e[15] = A) : A = e[15];
  let p;
  return e[16] !== l || e[17] !== h || e[18] !== A ? (p = /* @__PURE__ */ C(l, {
    value: h,
    children: A
  }), e[16] = l, e[17] = h, e[18] = A, e[19] = p) : p = e[19], p;
}
function Ms(n) {
  return !n;
}
Is.Morph = Us;
function at(n, e, t) {
  const o = I(8);
  let i;
  o[0] !== t ? (i = t === void 0 ? {} : t, o[0] = t, o[1] = i) : i = o[1];
  const {
    enabled: r
  } = i, s = r === void 0 ? !0 : r, c = X(e);
  let a;
  o[2] !== e ? (a = () => {
    c.current = e;
  }, o[2] = e, o[3] = a) : a = o[3], H(a);
  let l, u;
  o[4] !== s || o[5] !== n ? (l = () => {
    if (!s)
      return;
    const f = n.current;
    if (!f)
      return;
    const d = new ResizeObserver((m) => {
      c.current(m[0]);
    });
    return d.observe(f), () => d.disconnect();
  }, u = [n, s], o[4] = s, o[5] = n, o[6] = l, o[7] = u) : (l = o[6], u = o[7]), H(l, u);
}
const Cu = (n) => {
  const e = I(19), {
    open: t,
    children: o,
    duration: i,
    easing: r
  } = n, s = i === void 0 ? 200 : i, c = r === void 0 ? "ease" : r, a = X(null), [l, u] = $(t ? "auto" : 0), [f, d] = $(t), m = t ? !0 : f;
  let h;
  e[0] !== t ? (h = (W) => {
    if (W.propertyName === "height") {
      if (t) {
        u("auto");
        return;
      }
      d(!1);
    }
  }, e[0] = t, e[1] = h) : h = e[1];
  const A = h;
  let p, v;
  e[2] !== l || e[3] !== t ? (p = () => {
    const W = a.current;
    if (W) {
      if (t) {
        const E = W.scrollHeight;
        u(E);
        return;
      }
      if (l === "auto") {
        const E = W.scrollHeight;
        u(E), requestAnimationFrame(() => u(0));
        return;
      }
      u(0);
    }
  }, v = [t, l], e[2] = l, e[3] = t, e[4] = p, e[5] = v) : (p = e[4], v = e[5]), Te(p, v);
  let b;
  e[6] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (b = () => {
    const W = a.current;
    W && u(W.scrollHeight);
  }, e[6] = b) : b = e[6];
  let y;
  e[7] !== t ? (y = {
    enabled: t
  }, e[7] = t, e[8] = y) : y = e[8], at(a, b, y);
  const S = l === "auto" ? "auto" : `${l}px`, g = l === "auto" ? void 0 : `height ${s}ms ${c}`;
  let T;
  e[9] !== S || e[10] !== g ? (T = {
    width: "100%",
    overflow: "hidden",
    height: S,
    transition: g,
    willChange: "height"
  }, e[9] = S, e[10] = g, e[11] = T) : T = e[11];
  const N = T, L = !t && !m, w = m ? o : null;
  let x;
  e[12] !== w ? (x = /* @__PURE__ */ C("div", {
    ref: a,
    children: w
  }), e[12] = w, e[13] = x) : x = e[13];
  let F;
  return e[14] !== A || e[15] !== N || e[16] !== L || e[17] !== x ? (F = /* @__PURE__ */ C("div", {
    style: N,
    onTransitionEnd: A,
    "aria-hidden": L,
    children: x
  }), e[14] = A, e[15] = N, e[16] = L, e[17] = x, e[18] = F) : F = e[18], F;
}, pe = (n, e, t) => Math.min(Math.max(n, e), t), ks = (n, e) => {
  if (n === e) return !0;
  if (!n || !e) return !1;
  const t = Object.keys(n);
  if (t.length !== Object.keys(e).length) return !1;
  for (const o of t) if (n[o] !== e[o]) return !1;
  return !0;
};
function _o(n) {
  const e = I(32), {
    isOpen: t,
    triggerRef: o,
    contentRef: i,
    initialPosition: r,
    calculate: s,
    deps: c,
    equals: a
  } = n;
  let l;
  e[0] !== c ? (l = c === void 0 ? [] : c, e[0] = c, e[1] = l) : l = e[1];
  const u = l, f = a === void 0 ? ks : a, [d, m] = $(r), [h, A] = $(!1), p = X(null);
  let v;
  e[2] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = () => {
    A(!1), p.current = null;
  }, e[2] = v) : v = e[2];
  const b = v;
  let y;
  e[3] !== s || e[4] !== i || e[5] !== t || e[6] !== h || e[7] !== o ? (y = () => {
    if (!t || h || !o.current || !i.current)
      return;
    const L = o.current.getBoundingClientRect(), {
      width: w,
      height: x
    } = i.current.getBoundingClientRect();
    p.current = {
      width: w,
      height: x
    }, m(s(L, {
      width: w,
      height: x
    })), A(!0);
  }, e[3] = s, e[4] = i, e[5] = t, e[6] = h, e[7] = o, e[8] = y) : y = e[8];
  let S;
  e[9] !== s || e[10] !== i || e[11] !== u || e[12] !== t || e[13] !== h || e[14] !== o ? (S = [t, h, o, i, s, ...u], e[9] = s, e[10] = i, e[11] = u, e[12] = t, e[13] = h, e[14] = o, e[15] = S) : S = e[15], Te(y, S);
  let g;
  e[16] !== s || e[17] !== f || e[18] !== t || e[19] !== h || e[20] !== o ? (g = () => {
    if (!t || !h)
      return;
    let L = null;
    const w = () => {
      if (L = null, !o.current || !p.current)
        return;
      const F = o.current.getBoundingClientRect(), W = s(F, p.current);
      m((E) => f(E, W) ? E : W);
    }, x = () => {
      L === null && (L = requestAnimationFrame(w));
    };
    return window.addEventListener("scroll", x, !0), window.addEventListener("resize", x), () => {
      L !== null && cancelAnimationFrame(L), window.removeEventListener("scroll", x, !0), window.removeEventListener("resize", x);
    };
  }, e[16] = s, e[17] = f, e[18] = t, e[19] = h, e[20] = o, e[21] = g) : g = e[21];
  let T;
  e[22] !== s || e[23] !== u || e[24] !== f || e[25] !== t || e[26] !== h || e[27] !== o ? (T = [t, h, o, s, f, ...u], e[22] = s, e[23] = u, e[24] = f, e[25] = t, e[26] = h, e[27] = o, e[28] = T) : T = e[28], H(g, T);
  let N;
  return e[29] !== h || e[30] !== d ? (N = {
    position: d,
    isPositioned: h,
    resetPosition: b
  }, e[29] = h, e[30] = d, e[31] = N) : N = e[31], N;
}
const Ho = (n, e, ...t) => {
  const o = I(6), i = t, r = X(e);
  let s;
  o[0] !== e ? (s = () => {
    r.current = e;
  }, o[0] = e, o[1] = s) : s = o[1], H(s);
  let c, a;
  o[2] !== n || o[3] !== i ? (c = () => {
    if (!n)
      return;
    const l = (u) => {
      i.every((d) => !d.current || !d.current.contains(u.target)) && r.current();
    };
    return document.addEventListener("mousedown", l), () => document.removeEventListener("mousedown", l);
  }, a = [n, ...i], o[2] = n, o[3] = i, o[4] = c, o[5] = a) : (c = o[4], a = o[5]), H(c, a);
}, yn = 1, et = 8, qs = {
  top: 0,
  left: 0,
  openUpwards: !1,
  originX: "100%",
  originY: "0%"
}, $o = () => ({
  left: 0,
  top: 0,
  right: window.innerWidth,
  bottom: window.innerHeight
}), Ps = (n, e, t) => {
  const o = t.bottom - n.bottom, i = n.top - t.top, r = o < e.height && i > o, s = t.left + et, c = t.top + et, a = n.left + n.width / 2, l = a - e.width / 2, u = pe(l, s, Math.max(s, t.right - e.width - et)), f = r ? n.top - e.height - yn : n.bottom + yn, d = pe(f, c, Math.max(c, t.bottom - e.height - et)), h = `${pe(a - u, 0, e.width) / e.width * 100}%`;
  return {
    top: d,
    left: u,
    openUpwards: r,
    originX: h,
    originY: r ? "100%" : "0%"
  };
}, Ys = (n, e, t, o) => {
  const i = I(7), r = o === void 0 ? $o : o;
  let s;
  i[0] !== r ? (s = (a, l) => Ps(a, l, r()), i[0] = r, i[1] = s) : s = i[1];
  let c;
  return i[2] !== e || i[3] !== t || i[4] !== n || i[5] !== s ? (c = {
    isOpen: n,
    triggerRef: e,
    contentRef: t,
    initialPosition: qs,
    calculate: s
  }, i[2] = e, i[3] = t, i[4] = n, i[5] = s, i[6] = c) : c = i[6], _o(c);
}, Qs = "_container_3v9lg_1", ei = "_selected_3v9lg_6", Os = "_trigger_3v9lg_11", vn = "_root_3v9lg_18", Gs = "_item_3v9lg_24", ti = (n) => {
  const e = I(8), {
    item: t,
    isSelected: o,
    onClick: i,
    onMouseEnter: r,
    itemRef: s
  } = n, c = `${Gs} ${o ? ei : ""}`;
  let a;
  e[0] !== t ? (a = /* @__PURE__ */ C(te, {
    variant: "body",
    children: t
  }), e[0] = t, e[1] = a) : a = e[1];
  let l;
  return e[2] !== s || e[3] !== i || e[4] !== r || e[5] !== c || e[6] !== a ? (l = /* @__PURE__ */ C("div", {
    ref: s,
    role: "menuitem",
    tabIndex: -1,
    onClick: i,
    onMouseEnter: r,
    className: c,
    children: a
  }), e[2] = s, e[3] = i, e[4] = r, e[5] = c, e[6] = a, e[7] = l) : l = e[7], l;
}, Su = (n) => {
  const e = I(59), {
    items: t,
    trigger: o
  } = n, [i, r] = $(!1), [s, c] = $(t[0]), [a, l] = $(-1), u = X(null), f = X(null), d = X(null);
  let m;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (m = [], e[0] = m) : m = e[0];
  const h = X(m), A = X(a), {
    paneRef: p
  } = kt();
  let v;
  e[1] !== p ? (v = () => {
    const z = p?.current;
    if (!z)
      return $o();
    const {
      left: ee,
      top: O,
      right: se,
      bottom: le
    } = z.getBoundingClientRect();
    return {
      left: ee,
      top: O,
      right: se,
      bottom: le
    };
  }, e[1] = p, e[2] = v) : v = e[2];
  const b = v, {
    position: y,
    isPositioned: S,
    resetPosition: g
  } = Ys(i, u, f, b);
  let T, N;
  e[3] !== a ? (T = () => {
    A.current = a;
  }, N = [a], e[3] = a, e[4] = T, e[5] = N) : (T = e[4], N = e[5]), H(T, N);
  let L, w;
  e[6] !== t || e[7] !== s ? (L = () => {
    t.includes(s) || c(t[0]);
  }, w = [t, s], e[6] = t, e[7] = s, e[8] = L, e[9] = w) : (L = e[8], w = e[9]), H(L, w);
  let x;
  e[10] !== g ? (x = () => {
    r(!1), g(), l(-1);
  }, e[10] = g, e[11] = x) : x = e[11];
  const F = x;
  let W;
  e[12] !== g ? (W = () => {
    r(Vs), g(), l(-1);
  }, e[12] = g, e[13] = W) : W = e[13];
  const E = W;
  let k;
  e[14] !== g ? (k = (z) => {
    c(z), r(!1), g(), l(-1), u.current?.focus();
  }, e[14] = g, e[15] = k) : k = e[15];
  const B = k;
  Ho(i, F, u, f, d);
  let q;
  e[16] !== i || e[17] !== S || e[18] !== t || e[19] !== s ? (q = () => {
    if (!i || !S)
      return;
    const z = Math.max(0, t.indexOf(s));
    l(z), h.current[z]?.focus();
  }, e[16] = i, e[17] = S, e[18] = t, e[19] = s, e[20] = q) : q = e[20];
  let P;
  e[21] !== i || e[22] !== S ? (P = [i, S], e[21] = i, e[22] = S, e[23] = P) : P = e[23], H(q, P);
  let V, Y;
  e[24] !== F || e[25] !== B || e[26] !== i || e[27] !== t ? (V = () => {
    if (!i)
      return;
    const z = (ee) => {
      if (ee.key === "Escape") {
        ee.preventDefault(), F(), u.current?.focus();
        return;
      }
      if (ee.key === "ArrowDown") {
        ee.preventDefault(), l((O) => {
          const le = ((O < 0 ? -1 : O) + 1 + t.length) % t.length;
          return h.current[le]?.focus(), le;
        });
        return;
      }
      if (ee.key === "ArrowUp") {
        ee.preventDefault(), l((O) => {
          const le = ((O < 0 ? 0 : O) - 1 + t.length) % t.length;
          return h.current[le]?.focus(), le;
        });
        return;
      }
      if (ee.key === "Enter" || ee.key === " ") {
        const O = A.current;
        if (O < 0)
          return;
        ee.preventDefault(), B(t[O]);
      }
    };
    return document.addEventListener("keydown", z), () => document.removeEventListener("keydown", z);
  }, Y = [i, t, F, B], e[24] = F, e[25] = B, e[26] = i, e[27] = t, e[28] = V, e[29] = Y) : (V = e[28], Y = e[29]), H(V, Y);
  let U;
  e[30] !== i || e[31] !== E ? (U = (z) => {
    (z.key === "Enter" || z.key === " " || z.key === "ArrowDown") && (z.preventDefault(), i || E());
  }, e[30] = i, e[31] = E, e[32] = U) : U = e[32];
  const R = U, K = o ? Os : ei, M = o ?? s;
  let D;
  e[33] !== R || e[34] !== i || e[35] !== K || e[36] !== M || e[37] !== E ? (D = /* @__PURE__ */ C("div", {
    className: K,
    onClick: E,
    onKeyDown: R,
    ref: u,
    role: "button",
    tabIndex: 0,
    "aria-haspopup": "menu",
    "aria-expanded": i,
    children: M
  }), e[33] = R, e[34] = i, e[35] = K, e[36] = M, e[37] = E, e[38] = D) : D = e[38];
  let Q;
  e[39] !== i || e[40] !== S || e[41] !== t || e[42] !== y ? (Q = i && !S && /* @__PURE__ */ C("div", {
    ref: f,
    className: vn,
    style: {
      position: "fixed",
      top: y.top,
      left: y.left,
      visibility: "hidden",
      pointerEvents: "none",
      zIndex: 1e3
    },
    children: t.map(Zs)
  }), e[39] = i, e[40] = S, e[41] = t, e[42] = y, e[43] = Q) : Q = e[43];
  let G;
  e[44] !== B || e[45] !== i || e[46] !== S || e[47] !== t || e[48] !== y || e[49] !== s ? (G = i && S && /* @__PURE__ */ j(ie.div, {
    ref: d,
    role: "menu",
    className: vn,
    initial: "hidden",
    animate: "visible",
    exit: "exit",
    variants: Oo,
    style: {
      position: "fixed",
      top: y.top,
      left: y.left,
      transformOrigin: `${y.originX} ${y.originY}`,
      zIndex: 1e3
    },
    children: [/* @__PURE__ */ C(ke, {
      muted: !0
    }), t.map((z, ee) => /* @__PURE__ */ C(ti, {
      item: z,
      isSelected: z === s,
      onClick: () => B(z),
      onMouseEnter: () => l(ee),
      itemRef: (O) => {
        h.current[ee] = O;
      }
    }, ee))]
  }), e[44] = B, e[45] = i, e[46] = S, e[47] = t, e[48] = y, e[49] = s, e[50] = G) : G = e[50];
  let Z;
  e[51] !== G ? (Z = /* @__PURE__ */ C(Ee, {
    children: G
  }), e[51] = G, e[52] = Z) : Z = e[52];
  let J;
  e[53] !== Q || e[54] !== Z ? (J = /* @__PURE__ */ it(/* @__PURE__ */ j(ge, {
    children: [Q, Z]
  }), document.body), e[53] = Q, e[54] = Z, e[55] = J) : J = e[55];
  let _;
  return e[56] !== D || e[57] !== J ? (_ = /* @__PURE__ */ j("div", {
    className: Qs,
    children: [D, J]
  }), e[56] = D, e[57] = J, e[58] = _) : _ = e[58], _;
};
function Vs(n) {
  return !n;
}
function Zs(n, e) {
  return /* @__PURE__ */ C(ti, {
    item: n,
    isSelected: !1
  }, e);
}
class Nu extends Ti {
  constructor(e) {
    super(e), this.state = {
      hasError: !1
    };
  }
  static getDerivedStateFromError() {
    return {
      hasError: !0
    };
  }
  static getDerivedStateFromProps(e, t) {
    if (!t.hasError) return null;
    const o = t.resetKeys || [], i = e.resetKeys || [];
    if (o.length !== i.length)
      return {
        hasError: !1,
        resetKeys: i
      };
    for (let r = 0; r < i.length; r++)
      if (o[r] !== i[r])
        return {
          hasError: !1,
          resetKeys: i
        };
    return null;
  }
  componentDidCatch(e, t) {
    console.error("ErrorBoundary caught an error:", e, t);
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
const zs = "_outer_dl6lc_1", Js = "_inner_dl6lc_9";
function Tu(n) {
  const e = I(22), {
    children: t,
    minScale: o,
    fitHeight: i,
    fill: r,
    className: s,
    innerClassName: c
  } = n, a = o === void 0 ? 0.4 : o, l = i === void 0 ? !1 : i, u = r === void 0 ? 1 : r, f = X(null), d = X(null), [m, h] = $(1);
  let A;
  e[0] !== u || e[1] !== l || e[2] !== a ? (A = () => {
    const w = f.current, x = d.current;
    if (!w || !x)
      return;
    const F = () => {
      const E = w.clientWidth, k = x.offsetWidth;
      if (!E || !k)
        return;
      let B = u * E / k;
      if (l) {
        const P = w.clientHeight, V = x.offsetHeight;
        P && V && (B = Math.min(B, u * P / V));
      }
      const q = Math.max(a, Math.min(1, B));
      h((P) => Math.abs(P - q) < 2e-3 ? P : q);
    };
    F();
    const W = new ResizeObserver(F);
    return W.observe(w), W.observe(x), () => W.disconnect();
  }, e[0] = u, e[1] = l, e[2] = a, e[3] = A) : A = e[3];
  let p;
  e[4] !== t || e[5] !== u || e[6] !== l || e[7] !== a ? (p = [a, l, u, t], e[4] = t, e[5] = u, e[6] = l, e[7] = a, e[8] = p) : p = e[8], Te(A, p);
  let v;
  e[9] !== s ? (v = [zs, s].filter(Boolean), e[9] = s, e[10] = v) : v = e[10];
  const b = v.join(" ");
  let y;
  e[11] !== c ? (y = [Js, c].filter(Boolean), e[11] = c, e[12] = y) : y = e[12];
  const S = y.join(" "), g = `scale(${m})`;
  let T;
  e[13] !== g ? (T = {
    transform: g
  }, e[13] = g, e[14] = T) : T = e[14];
  let N;
  e[15] !== t || e[16] !== T || e[17] !== S ? (N = /* @__PURE__ */ C("div", {
    ref: d,
    className: S,
    style: T,
    children: t
  }), e[15] = t, e[16] = T, e[17] = S, e[18] = N) : N = e[18];
  let L;
  return e[19] !== N || e[20] !== b ? (L = /* @__PURE__ */ C("div", {
    ref: f,
    className: b,
    children: N
  }), e[19] = N, e[20] = b, e[21] = L) : L = e[21], L;
}
const js = "_root_16a8i_1", Xs = "_page_16a8i_13", Lu = (n) => {
  const e = I(10), {
    children: t,
    onPageChange: o,
    onScrollProgress: i
  } = n, r = X(null);
  let s;
  e[0] !== o || e[1] !== i ? (s = () => {
    if (r.current) {
      const d = r.current.scrollLeft, m = r.current.offsetWidth, h = Math.round(d / m), A = d % m / m;
      o?.(h), i?.(A);
    }
  }, e[0] = o, e[1] = i, e[2] = s) : s = e[2];
  const c = xt(s);
  let a;
  e[3] !== c ? (a = () => {
    const d = r.current;
    if (d)
      return d.addEventListener("scroll", c), () => d.removeEventListener("scroll", c);
  }, e[3] = c, e[4] = a) : a = e[4];
  let l;
  e[5] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (l = [], e[5] = l) : l = e[5], H(a, l);
  let u;
  e[6] !== t ? (u = xe.map(t, _s), e[6] = t, e[7] = u) : u = e[7];
  let f;
  return e[8] !== u ? (f = /* @__PURE__ */ C("div", {
    className: js,
    ref: r,
    children: u
  }), e[8] = u, e[9] = f) : f = e[9], f;
};
function _s(n) {
  return /* @__PURE__ */ C("div", {
    className: Xs,
    children: n
  });
}
const ni = /* @__PURE__ */ ye({
  colorScheme: "light",
  setColorScheme: () => {
  },
  toggleColorScheme: () => {
  }
}), Hs = ["light", "dark"], Lt = (n) => Hs.includes(n), Ut = () => {
  if (typeof window > "u" || typeof document > "u")
    return null;
  const n = window.getComputedStyle(document.documentElement).getPropertyValue("--tg-color-scheme").trim();
  return Lt(n) ? n : null;
}, oi = () => typeof window > "u" || !window.matchMedia ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light", $s = () => Ut() ?? oi(), el = typeof window > "u" ? H : Te, tl = (n) => {
  const e = I(20), {
    children: t,
    defaultColorScheme: o,
    onColorSchemeChange: i
  } = n, [r, s] = $($s);
  let c;
  e[0] !== o ? (c = () => Lt(o) ? o : null, e[0] = o, e[1] = c) : c = e[1];
  const [a, l] = $(c), u = a ?? r;
  let f;
  e[2] !== u || e[3] !== i ? (f = (T) => {
    const N = typeof T == "function" ? T(u) : T;
    Lt(N) && (l(N), i?.(N));
  }, e[2] = u, e[3] = i, e[4] = f) : f = e[4];
  const d = f;
  let m;
  e[5] !== u || e[6] !== d ? (m = () => {
    d(u === "dark" ? "light" : "dark");
  }, e[5] = u, e[6] = d, e[7] = m) : m = e[7];
  const h = m;
  let A, p;
  e[8] !== u ? (A = () => {
    document.documentElement.dataset.colorScheme = u, document.body.dataset.colorScheme = u;
  }, p = [u], e[8] = u, e[9] = A, e[10] = p) : (A = e[9], p = e[10]), el(A, p);
  let v, b;
  e[11] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = () => {
    const T = () => {
      const w = Ut();
      if (w) {
        s(w);
        return;
      }
      s(oi());
    }, N = (w) => {
      Ut() || s(w.matches ? "dark" : "light");
    };
    T();
    const L = window.matchMedia("(prefers-color-scheme: dark)");
    return ce.onEvent("themeChanged", T), L.addEventListener("change", N), () => {
      ce.offEvent("themeChanged", T), L.removeEventListener("change", N);
    };
  }, b = [], e[11] = v, e[12] = b) : (v = e[11], b = e[12]), H(v, b);
  let y;
  e[13] !== u || e[14] !== d || e[15] !== h ? (y = {
    colorScheme: u,
    setColorScheme: d,
    toggleColorScheme: h
  }, e[13] = u, e[14] = d, e[15] = h, e[16] = y) : y = e[16];
  const S = y;
  let g;
  return e[17] !== t || e[18] !== S ? (g = /* @__PURE__ */ C(ni.Provider, {
    value: S,
    children: t
  }), e[17] = t, e[18] = S, e[19] = g) : g = e[19], g;
};
function nl() {
  return Ne(ni);
}
function ii(n) {
  const {
    colorScheme: e
  } = nl();
  return n || e;
}
const bn = [
  {
    x: 0.5,
    y: 0.75
  },
  // topRight (позиция для colors[0])
  {
    x: 0.35,
    y: 0.75
  },
  // bottomRight (позиция для colors[1])
  {
    x: 0.25,
    y: 0.4
  },
  // bottomLeft (позиция для colors[2])
  {
    x: 0.6,
    y: 0
  }
  // topLeft (позиция для colors[3])
], ol = 1920 * 1080, il = 150, rl = 300, sl = 2, Qe = (n) => {
  if (!n) return [0, 0, 0];
  if (n.startsWith("#")) {
    const t = n.slice(1), o = parseInt(t.slice(0, 2), 16), i = parseInt(t.slice(2, 4), 16), r = parseInt(t.slice(4, 6), 16);
    return [o, i, r];
  }
  const e = n.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  return e ? [parseInt(e[1], 10), parseInt(e[2], 10), parseInt(e[3], 10)] : [0, 0, 0];
}, Cn = (n) => {
  if (!n) return null;
  const e = n.toString().match(/^(\d+(?:\.\d+)?)(px)?$/);
  return e ? parseFloat(e[1]) : null;
}, ri = (n) => {
  const e = n.getBoundingClientRect(), t = n.style?.height, o = n.style?.width, i = e.width || Cn(o) || window.innerWidth, r = e.height || Cn(t) || window.innerHeight || 100;
  return {
    width: i,
    height: r
  };
}, ll = (n) => (n || bn).map((t, o) => !t || typeof t.x != "number" || typeof t.y != "number" ? (console.warn(`Invalid position at index ${o}, using default`), bn[o]) : {
  x: Math.max(0, Math.min(1, t.x)),
  y: Math.max(0, Math.min(1, t.y))
});
function Sn({
  scaledWidth: n,
  scaledHeight: e,
  colors: t,
  positions: o,
  rotation: i
}) {
  const r = Qe(t[0]), s = Qe(t[1]), c = Qe(t[2]), a = Qe(t[3]), l = ll(o), u = i * Math.PI / 180, f = 0.5, d = 0.5, m = l.map((p) => {
    if (u === 0) return p;
    const v = p.x - f, b = p.y - d, y = Math.cos(u), S = Math.sin(u);
    return {
      x: v * y - b * S + f,
      y: v * S + b * y + d
    };
  }), h = new Uint8ClampedArray(n * e * 4), A = [r, s, c, a];
  for (let p = 0; p < e; p++) {
    const b = p / e - 0.5, y = b * b;
    for (let S = 0; S < n; S++) {
      const g = (p * n + S) * 4, N = S / n - 0.5, w = 0.35 * Math.sqrt(N * N + y), x = w * w * 0.8 * 8, F = Math.sin(x), W = Math.cos(x), E = Math.max(0, Math.min(1, 0.5 + N * W - b * F)), k = Math.max(0, Math.min(1, 0.5 + N * F + b * W));
      let B = 0, q = 0, P = 0, V = 0;
      for (let Y = 0; Y < 4; Y++) {
        const U = E - m[Y].x, R = k - m[Y].y;
        let K = Math.max(0, 0.9 - Math.sqrt(U * U + R * R));
        K = K * K * K * K, B += K, q += K * A[Y][0], P += K * A[Y][1], V += K * A[Y][2];
      }
      h[g] = Math.round(q / B), h[g + 1] = Math.round(P / B), h[g + 2] = Math.round(V / B), h[g + 3] = 255;
    }
  }
  return h;
}
const al = () => {
  if (typeof Worker > "u") return null;
  try {
    return new Worker(new URL(
      /* @vite-ignore */
      "/assets/gradientWorker-DECQ8m0k.js",
      import.meta.url
    ), {
      type: "module"
    });
  } catch {
    return null;
  }
}, cl = (n, e, t) => new Promise((o, i) => {
  const r = (c) => {
    c.data?.id === e && (n.removeEventListener("message", r), n.removeEventListener("error", s), o(c.data.pixels));
  }, s = (c) => {
    n.removeEventListener("message", r), n.removeEventListener("error", s), i(c);
  };
  n.addEventListener("message", r), n.addEventListener("error", s), n.postMessage({
    id: e,
    ...t
  });
}), dl = (n, e) => {
  const t = n.getContext("2d");
  if (!t) return;
  const [o, i, r] = Qe(e);
  t.fillStyle = `rgb(${o}, ${i}, ${r})`, t.fillRect(0, 0, n.width, n.height);
}, ul = (n, e, t, o, i) => {
  (!n._tempCanvas || n._tempCanvas.width !== t.width || n._tempCanvas.height !== t.height) && (n._tempCanvas = document.createElement("canvas"), n._tempCanvas.width = t.width, n._tempCanvas.height = t.height), n._tempCanvas.getContext("2d").putImageData(t, 0, 0), e.clearRect(0, 0, o, i), e.drawImage(n._tempCanvas, 0, 0, o, i);
}, fl = (n, e, t, o, i) => {
  (!n._intensityCanvas || n._intensityCanvas.width !== t || n._intensityCanvas.height !== o) && (n._intensityCanvas = document.createElement("canvas"), n._intensityCanvas.width = t, n._intensityCanvas.height = o);
  const r = n._intensityCanvas.getContext("2d");
  r.globalAlpha = i, r.drawImage(n, 0, 0), e.clearRect(0, 0, t, o), e.drawImage(n._intensityCanvas, 0, 0);
};
function pl(n) {
  const e = I(18), {
    canvasRef: t,
    containerRef: o,
    activeColors: i,
    positions: r,
    rotation: s,
    intensity: c
  } = n, a = X(null), l = X(0);
  let u, f;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (u = () => (a.current = al(), () => {
    a.current?.terminate(), a.current = null;
  }), f = [], e[0] = u, e[1] = f) : (u = e[0], f = e[1]), H(u, f);
  let d;
  e[2] !== i || e[3] !== t || e[4] !== o || e[5] !== c || e[6] !== r || e[7] !== s ? (d = async () => {
    const p = t.current, v = o.current;
    if (!p || !v || !i || i.length !== 4)
      return;
    const {
      width: b,
      height: y
    } = ri(v);
    if (b <= 0 || y <= 0 || !isFinite(b) || !isFinite(y)) {
      p.width = 100, p.height = 100, dl(p, i[0]);
      return;
    }
    p.width = b, p.height = y;
    const S = p.getContext("2d");
    if (!S)
      return;
    const g = b * y > ol ? 0.5 : 1, T = Math.floor(b * g), N = Math.floor(y * g), L = l.current = l.current + 1, w = {
      scaledWidth: T,
      scaledHeight: N,
      colors: i,
      positions: r,
      rotation: s
    };
    let x;
    if (a.current)
      try {
        x = await cl(a.current, L, w);
      } catch {
        x = Sn(w);
      }
    else
      x = Sn(w);
    if (L !== l.current || !p.isConnected)
      return;
    const F = new ImageData(x, T, N);
    g !== 1 ? ul(p, S, F, b, y) : S.putImageData(F, 0, 0), c !== 1 && fl(p, S, b, y, c);
  }, e[2] = i, e[3] = t, e[4] = o, e[5] = c, e[6] = r, e[7] = s, e[8] = d) : d = e[8];
  const m = xt(d);
  let h;
  e[9] !== o || e[10] !== m ? (h = () => {
    let p = null, v = null;
    ((g) => {
      const T = g;
      p && clearTimeout(p), p = setTimeout(() => {
        m(), p = null;
      }, T);
    })(0);
    const y = () => {
      v && clearTimeout(v), v = setTimeout(() => {
        m(), v = null;
      }, il);
    };
    window.addEventListener("resize", y);
    const S = new ResizeObserver(() => y());
    return o.current && S.observe(o.current), () => {
      p && clearTimeout(p), v && clearTimeout(v), window.removeEventListener("resize", y), S.disconnect();
    };
  }, e[9] = o, e[10] = m, e[11] = h) : h = e[11];
  let A;
  e[12] !== i || e[13] !== o || e[14] !== c || e[15] !== r || e[16] !== s ? (A = [i, s, c, r, o], e[12] = i, e[13] = o, e[14] = c, e[15] = r, e[16] = s, e[17] = A) : A = e[17], H(h, A);
}
const ml = (n, e, t, o, i, r) => {
  let s = t.width, c = t.height;
  const l = (500 + i / e.dpr / 2.5) * e.dpr, u = l / c;
  s *= u, c = l, n.clearRect(0, 0, o, i), r ? (n.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--ui-static-black").trim(), n.fillRect(0, 0, o, i), n.globalCompositeOperation = "destination-out") : n.globalCompositeOperation = "source-over";
  const f = (h) => {
    for (let A = 0; A < o; A += s)
      n.drawImage(t, A, h, s, c);
  }, d = (i - c) / 2;
  if (f(d), d > 0) {
    let h = d;
    do
      h -= c, f(h);
    while (h >= 0);
  }
  const m = i - 1;
  for (let h = d + c; h < m; h += c)
    f(h);
  n.globalCompositeOperation = "source-over";
}, hl = "_root_1x3mi_1", Nn = "_canvas_1x3mi_13", Al = "_patternCanvas_1x3mi_28", gl = "_patternReady_1x3mi_35", yl = "_blend_1x3mi_39";
function vl(n) {
  const e = I(14), {
    patternCanvasRef: t,
    containerRef: o,
    patternUrl: i,
    activeIsDarkPattern: r
  } = n, s = X(null);
  let c;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (c = {
    width: 0,
    height: 0
  }, e[0] = c) : c = e[0];
  const a = X(c);
  let l;
  e[1] !== r || e[2] !== o || e[3] !== t || e[4] !== i ? (l = (m) => {
    const h = m === void 0 ? !1 : m, A = t.current, p = o.current;
    if (!A || !p || !i || !A.isConnected)
      return;
    const {
      width: v,
      height: b
    } = ri(p);
    if (v <= 0 || b <= 0 || !isFinite(v) || !isFinite(b))
      return;
    const y = Math.min(sl, window.devicePixelRatio || 1), S = Math.round(v * y), g = Math.round(b * y), T = a.current, N = Math.abs(S - T.width) > 1, L = Math.abs(g - T.height) > 1;
    if (!h && !N && !L)
      return;
    a.current = {
      width: S,
      height: g
    }, A.dpr = y, (N || L) && (A.width = S, A.height = g);
    const w = A.getContext("2d"), x = s.current;
    !w || !x || !x.complete || x.naturalWidth === 0 || (ml(w, A, x, S, g, r), A.classList.add(gl));
  }, e[1] = r, e[2] = o, e[3] = t, e[4] = i, e[5] = l) : l = e[5];
  const u = xt(l);
  let f;
  e[6] !== o || e[7] !== i || e[8] !== u ? (f = () => {
    if (s.current = null, a.current = {
      width: 0,
      height: 0
    }, !i)
      return;
    const m = new Image();
    m.crossOrigin = "anonymous", m.onload = () => u(!0), m.onerror = (v) => {
      console.warn("Failed to load pattern image:", i, v);
    }, m.src = i, s.current = m, u(!0);
    let h = null;
    const A = () => {
      h && clearTimeout(h), h = setTimeout(() => {
        requestAnimationFrame(() => {
          u();
        }), h = null;
      }, rl);
    };
    window.addEventListener("resize", A);
    const p = new ResizeObserver(() => {
      A();
    });
    return o.current && p.observe(o.current), () => {
      h && clearTimeout(h), m.onload = null, m.onerror = null, window.removeEventListener("resize", A), p.disconnect(), s.current = null, a.current = {
        width: 0,
        height: 0
      };
    };
  }, e[6] = o, e[7] = i, e[8] = u, e[9] = f) : f = e[9];
  let d;
  e[10] !== r || e[11] !== o || e[12] !== i ? (d = [i, r, o], e[10] = r, e[11] = o, e[12] = i, e[13] = d) : d = e[13], H(f, d);
}
function Uu(n) {
  const e = I(46);
  let t, o, i, r, s, c, a, l, u, f;
  e[0] !== n ? ({
    colors: t,
    colorsDark: i,
    className: r,
    rotation: s,
    intensity: c,
    positions: a,
    patternUrl: l,
    patternIntensity: u,
    isDarkPattern: f,
    ...o
  } = n, e[0] = n, e[1] = t, e[2] = o, e[3] = i, e[4] = r, e[5] = s, e[6] = c, e[7] = a, e[8] = l, e[9] = u, e[10] = f) : (t = e[1], o = e[2], i = e[3], r = e[4], s = e[5], c = e[6], a = e[7], l = e[8], u = e[9], f = e[10]);
  const d = i === void 0 ? null : i, m = r === void 0 ? "" : r, h = s === void 0 ? 0 : s, A = c === void 0 ? 1 : c, p = a === void 0 ? null : a, v = l === void 0 ? null : l, b = u === void 0 ? null : u, y = f === void 0 ? void 0 : f, S = X(null), g = X(null), T = X(null), N = ii(), L = N === "dark" && d ? d : t, w = y !== void 0 ? y : N === "dark";
  let x;
  e[11] !== L || e[12] !== A || e[13] !== p || e[14] !== h ? (x = {
    canvasRef: S,
    containerRef: T,
    activeColors: L,
    positions: p,
    rotation: h,
    intensity: A
  }, e[11] = L, e[12] = A, e[13] = p, e[14] = h, e[15] = x) : x = e[15], pl(x);
  let F;
  e[16] !== w || e[17] !== v ? (F = {
    patternCanvasRef: g,
    containerRef: T,
    patternUrl: v,
    activeIsDarkPattern: w
  }, e[16] = w, e[17] = v, e[18] = F) : F = e[18], vl(F);
  let W, E;
  e[19] !== o ? ({
    style: E,
    ...W
  } = o, e[19] = o, e[20] = W, e[21] = E) : (W = e[20], E = e[21]);
  let k;
  e[22] !== w || e[23] !== b ? (k = b !== null && w ? (() => {
    const Z = Math.abs(b);
    return Math.max(0.3, Z * 0.5);
  })() : null, e[22] = w, e[23] = b, e[24] = k) : k = e[24];
  const B = k;
  let q;
  e[25] !== w || e[26] !== b ? (q = b !== null && !w ? Math.abs(b) * 1 : null, e[25] = w, e[26] = b, e[27] = q) : q = e[27];
  const P = q, V = `${hl} ${m}`;
  let Y;
  e[28] !== B ? (Y = B !== null ? {
    "--opacity-max": B,
    opacity: "var(--opacity-max)"
  } : void 0, e[28] = B, e[29] = Y) : Y = e[29];
  let U;
  e[30] !== Y ? (U = /* @__PURE__ */ C("canvas", {
    ref: S,
    className: Nn,
    style: Y,
    "aria-hidden": "true"
  }), e[30] = Y, e[31] = U) : U = e[31];
  const R = v ? "visible" : "hidden", K = `${Nn} ${Al} ${w ? "" : yl}`;
  let M;
  e[32] !== P ? (M = P !== null ? {
    "--opacity-max": P
  } : void 0, e[32] = P, e[33] = M) : M = e[33];
  let D;
  e[34] !== K || e[35] !== M ? (D = /* @__PURE__ */ C("canvas", {
    ref: g,
    className: K,
    style: M,
    "aria-hidden": "true"
  }), e[34] = K, e[35] = M, e[36] = D) : D = e[36];
  let Q;
  e[37] !== R || e[38] !== D ? (Q = /* @__PURE__ */ C(no, {
    mode: R,
    children: D
  }), e[37] = R, e[38] = D, e[39] = Q) : Q = e[39];
  let G;
  return e[40] !== W || e[41] !== E || e[42] !== V || e[43] !== U || e[44] !== Q ? (G = /* @__PURE__ */ j("div", {
    ref: T,
    className: V,
    style: E,
    ...W,
    children: [U, Q]
  }), e[40] = W, e[41] = E, e[42] = V, e[43] = U, e[44] = Q, e[45] = G) : G = e[45], G;
}
const bl = ({
  src: n,
  srcSet: e
}) => {
  if (!n && !e) return !1;
  const t = new window.Image();
  n && (t.src = n), e && (t.srcset = e);
  const {
    complete: o
  } = t;
  return t.src = "", t.srcset = "", o;
}, Cl = (n) => {
  const e = I(15);
  let t, o, i;
  e[0] !== n ? ({
    className: t,
    onLoad: o,
    ...i
  } = n, e[0] = n, e[1] = t, e[2] = o, e[3] = i) : (t = e[1], o = e[2], i = e[3]);
  let r;
  e[4] !== i ? (r = () => bl(i), e[4] = i, e[5] = r) : r = e[5];
  const [s, c] = $(r);
  let a;
  e[6] !== o ? (a = (d) => {
    c(!0), o?.(d);
  }, e[6] = o, e[7] = a) : a = e[7];
  const l = s && "opacity-100";
  let u;
  e[8] !== t || e[9] !== l ? (u = st("rounded-[inherit] opacity-0 transition-opacity duration-250 ease-[cubic-bezier(0.23,1,0.32,1)]", l, t), e[8] = t, e[9] = l, e[10] = u) : u = e[10];
  let f;
  return e[11] !== i || e[12] !== a || e[13] !== u ? (f = /* @__PURE__ */ C("img", {
    onLoad: a,
    className: u,
    ...i
  }), e[11] = i, e[12] = a, e[13] = u, e[14] = f) : f = e[14], f;
}, Sl = "_img_95uc6_1", Nl = "_imgRedacted_95uc6_9", Tl = "_shapeCircle_95uc6_13", Ll = "_shapeRounded_95uc6_21", Ul = /* @__PURE__ */ qe((n, e) => {
  const t = I(14), {
    size: o,
    className: i,
    style: r,
    src: s,
    shape: c
  } = n;
  let a = o === void 0 ? 40 : o;
  const l = c === void 0 ? "circle" : c, {
    isMaterial: u
  } = Ce(), f = !!Pe(), d = Ze(f);
  u && (a = 42);
  let m;
  t[0] !== f || t[1] !== e ? (m = (y) => {
    f && Ye(y), typeof e == "function" ? e(y) : e && (e.current = y);
  }, t[0] = f, t[1] = e, t[2] = m) : m = t[2];
  const h = `
                    ${l === "circle" ? Tl : ""}
                    ${l === "rounded" ? Ll : ""}
                    ${d}
                    ${i || ""}`;
  let A;
  t[3] !== a || t[4] !== r ? (A = {
    width: a,
    height: a,
    ...r
  }, t[3] = a, t[4] = r, t[5] = A) : A = t[5];
  const p = `${Sl} ${f ? Nl : ""}`;
  let v;
  t[6] !== s || t[7] !== p ? (v = /* @__PURE__ */ C(Cl, {
    src: s,
    className: p
  }), t[6] = s, t[7] = p, t[8] = v) : v = t[8];
  let b;
  return t[9] !== m || t[10] !== h || t[11] !== A || t[12] !== v ? (b = /* @__PURE__ */ C("div", {
    ref: m,
    className: h,
    style: A,
    children: v
  }), t[9] = m, t[10] = h, t[11] = A, t[12] = v, t[13] = b) : b = t[13], b;
});
function Tn(n) {
  return /^[\p{L}\p{N}]*$/u.test(n);
}
const Ln = (n, e = "string") => {
  n = n.replace(/^#/, "");
  let t, o, i;
  if (n.length === 3)
    t = parseInt(n[0] + n[0], 16), o = parseInt(n[1] + n[1], 16), i = parseInt(n[2] + n[2], 16);
  else if (n.length === 6)
    t = parseInt(n.slice(0, 2), 16), o = parseInt(n.slice(2, 4), 16), i = parseInt(n.slice(4, 6), 16);
  else
    throw new Error("Invalid hex color format");
  if (isNaN(t) || isNaN(o) || isNaN(i))
    throw new Error("Invalid hex color");
  switch (e) {
    case "string":
      return `${t}, ${o}, ${i}`;
    case "css":
      return `rgb(${t}, ${o}, ${i})`;
    case "object":
      return {
        r: t,
        g: o,
        b: i
      };
    case "array":
      return [t, o, i];
    default:
      return `${t}, ${o}, ${i}`;
  }
};
function wl(n, e, t) {
  const [o, i, r] = Ln(n, "array"), [s, c, a] = Ln(e, "array"), l = Math.round(o * (1 - t) + s * t), u = Math.round(i * (1 - t) + c * t), f = Math.round(r * (1 - t) + a * t);
  return ((1 << 24) + (l << 16) + (u << 8) + f).toString(16).slice(1).toUpperCase();
}
const Un = [{
  name: "Red",
  top: "#FF885E",
  bottom: "#FF516A"
}, {
  name: "Orange",
  top: "#FFCD6A",
  bottom: "#FFA85C"
}, {
  name: "Purple",
  top: "#82B1FF",
  bottom: "#665FFF"
}, {
  name: "Green",
  top: "#A0DE7E",
  bottom: "#54CB68"
}, {
  name: "Cyan",
  top: "#53EDD6",
  bottom: "#28C9B7"
}, {
  name: "Blue",
  top: "#72D5FD",
  bottom: "#2A9EF1"
}, {
  name: "Pink",
  top: "#E0A2F3",
  bottom: "#D669ED"
}], xl = "_root_uifsa_1", El = "_initials_uifsa_17", Rl = "_hiddenInitials_uifsa_21", wu = (n) => {
  const e = I(27), {
    size: t,
    userId: o,
    name: i
  } = n, r = t === void 0 ? 40 : t, s = !!Pe(), c = Ze(s), a = Un[o % Un.length];
  let l, u, f, d, m, h;
  if (e[0] !== a.bottom || e[1] !== a.top || e[2] !== i || e[3] !== s || e[4] !== c || e[5] !== r) {
    const [v, b] = i.split(" "), y = v === void 0 ? "" : v, S = b === void 0 ? "" : b, g = `linear-gradient(180deg, ${a.top} 0%, ${a.bottom} 100%)`;
    d = s ? Ye : void 0, m = `${xl} ${c}`;
    const T = s ? void 0 : g;
    let N;
    e[12] !== r ? (N = Math.round(r / 2.2), e[12] = r, e[13] = N) : N = e[13];
    const L = `${N}px`;
    e[14] !== r || e[15] !== T || e[16] !== L ? (h = {
      width: r,
      height: r,
      background: T,
      "--font_size": L
    }, e[14] = r, e[15] = T, e[16] = L, e[17] = h) : h = e[17], l = `${El} ${s ? Rl : ""}`, u = Tn(y.charAt(0)) && y.charAt(0).toLocaleUpperCase(), f = Tn(S.charAt(0)) && S.charAt(0).toLocaleUpperCase(), e[0] = a.bottom, e[1] = a.top, e[2] = i, e[3] = s, e[4] = c, e[5] = r, e[6] = l, e[7] = u, e[8] = f, e[9] = d, e[10] = m, e[11] = h;
  } else
    l = e[6], u = e[7], f = e[8], d = e[9], m = e[10], h = e[11];
  let A;
  e[18] !== l || e[19] !== u || e[20] !== f ? (A = /* @__PURE__ */ j("div", {
    className: l,
    children: [u, f]
  }), e[18] = l, e[19] = u, e[20] = f, e[21] = A) : A = e[21];
  let p;
  return e[22] !== d || e[23] !== m || e[24] !== h || e[25] !== A ? (p = /* @__PURE__ */ C("div", {
    ref: d,
    className: m,
    style: h,
    children: A
  }), e[22] = d, e[23] = m, e[24] = h, e[25] = A, e[26] = p) : p = e[26], p;
}, Wl = /* @__PURE__ */ qe((n, e) => {
  const t = I(11);
  let o, i, r, s;
  if (t[0] !== n) {
    const {
      to: l,
      onClick: u,
      children: f,
      ...d
    } = n;
    s = l, o = f, i = d, r = (m) => {
      u && u(m), m.defaultPrevented;
    }, t[0] = n, t[1] = o, t[2] = i, t[3] = r, t[4] = s;
  } else
    o = t[1], i = t[2], r = t[3], s = t[4];
  const c = r;
  let a;
  return t[5] !== o || t[6] !== c || t[7] !== i || t[8] !== e || t[9] !== s ? (a = /* @__PURE__ */ C(xi, {
    ref: e,
    href: s,
    onClick: c,
    ...i,
    children: o
  }), t[5] = o, t[6] = c, t[7] = i, t[8] = e, t[9] = s, t[10] = a) : a = t[10], a;
});
Wl.displayName = "TransitionLink";
const Fl = "_wrap_1vro0_1", Kl = "_scroll_1vro0_22", Dl = "_table_1vro0_26", wn = "_cell_1vro0_32", Bl = "_body_1vro0_47", Il = "_head_1vro0_51", Ml = (n) => {
  const e = I(22), {
    head: t,
    rows: o,
    align: i,
    className: r
  } = n, s = t === void 0 ? null : t;
  let c;
  e[0] !== i ? (c = i === void 0 ? [] : i, e[0] = i, e[1] = c) : c = e[1];
  const a = c;
  let l;
  e[2] !== a ? (l = (b) => a[b] ? {
    textAlign: a[b]
  } : void 0, e[2] = a, e[3] = l) : l = e[3];
  const u = l;
  let f;
  e[4] !== r ? (f = [Fl, r].filter(Boolean), e[4] = r, e[5] = f) : f = e[5];
  const d = f.join(" ");
  let m;
  e[6] !== u || e[7] !== s ? (m = s ? /* @__PURE__ */ C("thead", {
    className: Il,
    children: /* @__PURE__ */ C("tr", {
      children: s.map((b, y) => /* @__PURE__ */ C(te, {
        as: "th",
        variant: "subheadline1",
        weight: "semibold",
        className: wn,
        style: u(y),
        children: b
      }, y))
    })
  }) : null, e[6] = u, e[7] = s, e[8] = m) : m = e[8];
  let h;
  if (e[9] !== u || e[10] !== o) {
    let b;
    e[12] !== u ? (b = (y, S) => /* @__PURE__ */ C("tr", {
      children: y.map((g, T) => /* @__PURE__ */ C(te, {
        as: "td",
        variant: "subheadline1",
        className: wn,
        style: u(T),
        children: g
      }, T))
    }, S), e[12] = u, e[13] = b) : b = e[13], h = o.map(b), e[9] = u, e[10] = o, e[11] = h;
  } else
    h = e[11];
  let A;
  e[14] !== h ? (A = /* @__PURE__ */ C("tbody", {
    className: Bl,
    children: h
  }), e[14] = h, e[15] = A) : A = e[15];
  let p;
  e[16] !== m || e[17] !== A ? (p = /* @__PURE__ */ C("div", {
    className: Kl,
    children: /* @__PURE__ */ j("table", {
      className: Dl,
      children: [m, A]
    })
  }), e[16] = m, e[17] = A, e[18] = p) : p = e[18];
  let v;
  return e[19] !== p || e[20] !== d ? (v = /* @__PURE__ */ C("div", {
    className: d,
    children: p
  }), e[19] = p, e[20] = d, e[21] = v) : v = e[21], v;
}, kl = "_root_h61rj_1", Ie = "_heading_h61rj_22", ql = "_blockquote_h61rj_30", xn = "_list_h61rj_52", Pl = "_inlineCode_h61rj_60", Yl = "_codeBlock_h61rj_68", Ql = "_unsupported_h61rj_82", Ol = "_link_h61rj_87", Gl = "_hr_h61rj_96", Vl = "_table_h61rj_102", si = /* @__PURE__ */ ye(!1);
function Le(n, e, t) {
  return (i) => {
    const r = I(10);
    let s, c, a;
    r[0] !== i ? ({
      children: s,
      className: c,
      ...a
    } = i, r[0] = i, r[1] = s, r[2] = c, r[3] = a) : (s = r[1], c = r[2], a = r[3]);
    let l;
    r[4] !== c ? (l = [t, c].filter(Boolean).join(" ") || void 0, r[4] = c, r[5] = l) : l = r[5];
    let u;
    return r[6] !== s || r[7] !== a || r[8] !== l ? (u = /* @__PURE__ */ C(te, {
      as: n,
      ...e,
      className: l,
      ...a,
      children: s
    }), r[6] = s, r[7] = a, r[8] = l, r[9] = u) : u = r[9], u;
  };
}
function Ct(n, e) {
  return (o) => {
    const i = I(10);
    let r, s, c;
    i[0] !== o ? ({
      children: r,
      className: s,
      ...c
    } = o, i[0] = o, i[1] = r, i[2] = s, i[3] = c) : (r = i[1], s = i[2], c = i[3]);
    let a;
    i[4] !== s ? (a = [e, s].filter(Boolean).join(" ") || void 0, i[4] = s, i[5] = a) : a = i[5];
    let l;
    return i[6] !== r || i[7] !== c || i[8] !== a ? (l = /* @__PURE__ */ C(n, {
      className: a,
      ...c,
      children: r
    }), i[6] = r, i[7] = c, i[8] = a, i[9] = l) : l = i[9], l;
  };
}
const Zl = (n) => {
  const e = I(3), {
    children: t,
    className: o
  } = n, i = o || Pl;
  let r;
  return e[0] !== t || e[1] !== i ? (r = /* @__PURE__ */ C("code", {
    className: i,
    children: t
  }), e[0] = t, e[1] = i, e[2] = r) : r = e[2], r;
}, zl = (n) => {
  const e = I(6);
  let t, o;
  e[0] !== n ? ({
    children: t,
    ...o
  } = n, e[0] = n, e[1] = t, e[2] = o) : (t = e[1], o = e[2]);
  let i;
  return e[3] !== t || e[4] !== o ? (i = /* @__PURE__ */ C(te, {
    as: "strong",
    weight: "semibold",
    ...o,
    children: t
  }), e[3] = t, e[4] = o, e[5] = i) : i = e[5], i;
}, Jl = (n) => {
  const e = I(3), {
    children: t,
    href: o
  } = n;
  let i;
  return e[0] !== t || e[1] !== o ? (i = /* @__PURE__ */ C("a", {
    href: o,
    className: Ol,
    target: "_blank",
    rel: "noopener noreferrer",
    children: t
  }), e[0] = t, e[1] = o, e[2] = i) : i = e[2], i;
}, En = (n) => xe.toArray(n.props.children), jl = (n) => {
  const e = I(8), {
    children: t
  } = n;
  let o, i, r;
  e[0] !== t ? (i = null, r = [], o = [], xe.forEach(t, (c) => {
    if (!/* @__PURE__ */ oo(c))
      return;
    const a = xe.toArray(c.props.children);
    if (c.type === "thead") {
      const l = En(a[0]);
      i = l.map(ta), l.forEach((u, f) => {
        o[f] = u.props.style?.textAlign || "left";
      });
    } else
      a.forEach((l) => {
        r.push(En(l).map(na));
      });
  }), e[0] = t, e[1] = o, e[2] = i, e[3] = r) : (o = e[1], i = e[2], r = e[3]);
  let s;
  return e[4] !== o || e[5] !== i || e[6] !== r ? (s = /* @__PURE__ */ C(Ml, {
    head: i,
    rows: r,
    align: o,
    className: Vl
  }), e[4] = o, e[5] = i, e[6] = r, e[7] = s) : s = e[7], s;
}, Xl = () => {
  const n = I(1);
  let e;
  return n[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (e = /* @__PURE__ */ C("em", {
    className: Ql,
    children: "unsupported image"
  }), n[0] = e) : e = n[0], e;
}, _l = (n) => {
  const e = I(10);
  let t, o, i;
  e[0] !== n ? ({
    children: t,
    className: o,
    ...i
  } = n, e[0] = n, e[1] = t, e[2] = o, e[3] = i) : (t = e[1], o = e[2], i = e[3]);
  const r = Ne(si), s = r ? "subheadline1" : "callout", c = r ? void 0 : "regular", a = o || void 0;
  let l;
  return e[4] !== t || e[5] !== i || e[6] !== s || e[7] !== c || e[8] !== a ? (l = /* @__PURE__ */ C(te, {
    as: "p",
    variant: s,
    weight: c,
    className: a,
    ...i,
    children: t
  }), e[4] = t, e[5] = i, e[6] = s, e[7] = c, e[8] = a, e[9] = l) : l = e[9], l;
}, Hl = (n) => {
  const e = I(2), {
    children: t
  } = n;
  let o;
  return e[0] !== t ? (o = /* @__PURE__ */ C("blockquote", {
    className: ql,
    children: /* @__PURE__ */ C(si.Provider, {
      value: !0,
      children: t
    })
  }), e[0] = t, e[1] = o) : o = e[1], o;
}, $l = {
  h1: Le("h1", {
    variant: "title1",
    weight: "bold"
  }, Ie),
  h2: Le("h2", {
    variant: "title2",
    weight: "bold"
  }, Ie),
  h3: Le("h3", {
    variant: "title3",
    weight: "semibold"
  }, Ie),
  h4: Le("h4", {
    variant: "body",
    weight: "semibold"
  }, Ie),
  h5: Le("h5", {
    variant: "subheadline1",
    weight: "semibold"
  }, Ie),
  h6: Le("h6", {
    variant: "footnote",
    weight: "semibold"
  }, Ie),
  p: _l,
  li: Le("li", {
    variant: "callout",
    weight: "regular"
  }),
  ul: Ct("ul", xn),
  ol: Ct("ol", xn),
  blockquote: Hl,
  pre: Ct("pre", Yl),
  hr: () => /* @__PURE__ */ C("hr", {
    className: Gl
  }),
  code: Zl,
  a: Jl,
  strong: zl,
  table: jl,
  img: Xl
}, ea = {
  overrides: $l,
  disableParsingRawHTML: !0,
  forceWrapper: !0,
  wrapper: "div"
}, xu = (n) => {
  const e = I(5), {
    children: t,
    className: o
  } = n;
  let i;
  e[0] !== o ? (i = [kl, o].filter(Boolean), e[0] = o, e[1] = i) : i = e[1];
  const r = i.join(" "), s = t || "";
  let c;
  return e[2] !== r || e[3] !== s ? (c = /* @__PURE__ */ C(Ri, {
    options: ea,
    className: r,
    children: s
  }), e[2] = r, e[3] = s, e[4] = c) : c = e[4], c;
};
function ta(n) {
  return n.props.children;
}
function na(n) {
  return n.props.children;
}
const oa = "_overlay_19n61_1", ia = "_sheet_19n61_11", ra = "_centered_19n61_15", sa = "_panel_19n61_19", la = "_bottomSheet_19n61_32", aa = "_dialog_19n61_43", ca = "_plain_19n61_53", da = "_blurWarmup_19n61_57", ua = "_trayViewport_19n61_69", fa = "_measure_19n61_74", pa = "_page_19n61_78", ma = "_content_19n61_89", Jt = ({
  children: n
}) => n;
Jt.isModalPage = !0;
Jt.propTypes = {
  id: Ae.string.isRequired,
  children: Ae.node
};
function ha(n) {
  const e = xe.toArray(n), t = e.filter((o) => /* @__PURE__ */ oo(o) && o.type?.isModalPage);
  return t.length ? t.length !== e.length ? (console.warn("ModalView: mix of ModalView.Page and other children; falling back to plain mode"), null) : t.map((o) => ({
    id: o.props.id,
    element: o.props.children
  })) : null;
}
const Aa = /* @__PURE__ */ ye(null), Rn = 0.95, Wn = 1.05, Fn = "blur(4px)", ga = {
  enter: (n) => ({
    opacity: 0,
    scale: n > 0 ? Rn : Wn,
    filter: Fn
  }),
  center: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)"
  },
  exit: (n) => ({
    opacity: 0,
    scale: n > 0 ? Wn : Rn,
    filter: Fn
  })
}, ya = {
  duration: 0.3,
  ease: lt.QUINT_OUT
}, va = {
  duration: 0.3,
  ease: lt.QUINT_OUT
}, ba = (n) => {
  const e = I(35), {
    pages: t,
    activeId: o,
    depth: i,
    direction: r,
    nav: s
  } = n, c = X(null), a = Et("auto"), l = X(null), u = X(null);
  let f;
  e[0] !== a ? (f = (W, E) => {
    l.current !== W && (l.current = W, u.current?.stop(), E ? u.current = Oe(a, W, va) : a.set(W));
  }, e[0] = a, e[1] = f) : f = e[1];
  const d = f;
  let m;
  e[2] !== d || e[3] !== a ? (m = () => {
    const W = c.current;
    W && d(W.offsetHeight, a.get() !== "auto");
  }, e[2] = d, e[3] = a, e[4] = m) : m = e[4];
  let h;
  e[5] !== o || e[6] !== d || e[7] !== i || e[8] !== a ? (h = [o, i, d, a], e[5] = o, e[6] = d, e[7] = i, e[8] = a, e[9] = h) : h = e[9], Te(m, h);
  let A, p;
  e[10] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (A = () => () => u.current?.stop(), p = [], e[10] = A, e[11] = p) : (A = e[10], p = e[11]), H(A, p);
  let v;
  e[12] !== d ? (v = () => {
    const W = c.current;
    W && d(W.offsetHeight, !0);
  }, e[12] = d, e[13] = v) : v = e[13], at(c, v);
  let b;
  if (e[14] !== o || e[15] !== t) {
    let W;
    e[17] !== o ? (W = (E) => E.id === o, e[17] = o, e[18] = W) : W = e[18], b = t.find(W), e[14] = o, e[15] = t, e[16] = b;
  } else
    b = e[16];
  const y = b;
  let S;
  e[19] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (S = /* @__PURE__ */ C("div", {
    className: da,
    "aria-hidden": "true"
  }), e[19] = S) : S = e[19];
  let g;
  e[20] !== a ? (g = {
    height: a
  }, e[20] = a, e[21] = g) : g = e[21];
  const T = `${i}-${o}`, N = y ? y.element : null;
  let L;
  e[22] !== r || e[23] !== T || e[24] !== N ? (L = /* @__PURE__ */ C(ie.div, {
    className: pa,
    custom: r,
    variants: ga,
    initial: "enter",
    animate: "center",
    exit: "exit",
    transition: ya,
    children: N
  }, T), e[22] = r, e[23] = T, e[24] = N, e[25] = L) : L = e[25];
  let w;
  e[26] !== r || e[27] !== L ? (w = /* @__PURE__ */ C("div", {
    ref: c,
    className: fa,
    children: /* @__PURE__ */ C(Ee, {
      mode: "popLayout",
      initial: !1,
      custom: r,
      children: L
    })
  }), e[26] = r, e[27] = L, e[28] = w) : w = e[28];
  let x;
  e[29] !== w || e[30] !== g ? (x = /* @__PURE__ */ C(ie.div, {
    className: ua,
    style: g,
    children: w
  }), e[29] = w, e[30] = g, e[31] = x) : x = e[31];
  let F;
  return e[32] !== s || e[33] !== x ? (F = /* @__PURE__ */ j(Aa.Provider, {
    value: s,
    children: [S, x]
  }), e[32] = s, e[33] = x, e[34] = F) : F = e[34], F;
}, Ca = (n) => {
  const e = I(13);
  let t, o, i, r;
  e[0] !== n ? ({
    panelRef: i,
    corners: o,
    children: t,
    ...r
  } = n, e[0] = n, e[1] = t, e[2] = o, e[3] = i, e[4] = r) : (t = e[1], o = e[2], i = e[3], r = e[4]);
  let s, c;
  e[5] !== o || e[6] !== i ? (s = () => {
    const l = i.current;
    if (!l)
      return;
    const u = () => {
      const {
        width: d,
        height: m
      } = Wi(l);
      d <= 0 || m <= 0 || (l.style.clipPath = Fi(d, m, o));
    };
    u();
    const f = new ResizeObserver(u);
    return f.observe(l), () => {
      f.disconnect(), l.style.clipPath = "";
    };
  }, c = [i, o], e[5] = o, e[6] = i, e[7] = s, e[8] = c) : (s = e[7], c = e[8]), Te(s, c);
  let a;
  return e[9] !== t || e[10] !== i || e[11] !== r ? (a = /* @__PURE__ */ C(ie.div, {
    ref: i,
    ...r,
    children: t
  }), e[9] = t, e[10] = i, e[11] = r, e[12] = a) : a = e[12], a;
}, Sa = 100, Na = 500, tt = 6, Ta = (n, e) => {
  let t = n instanceof Element ? n : null;
  for (; t; ) {
    if (t.scrollHeight > t.clientHeight) {
      const {
        overflowY: o
      } = getComputedStyle(t);
      if (o === "auto" || o === "scroll") return t;
    }
    if (t === e) return null;
    t = t.parentElement;
  }
  return null;
};
function La(n) {
  const e = I(22), {
    onClose: t,
    panelRef: o
  } = n, i = Ve(), r = ao(), s = Et(window.innerHeight), c = Tt(s, xa), a = X(null);
  let l;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (l = () => {
    a.current?.(), a.current = null;
  }, e[0] = l) : l = e[0];
  const u = l;
  let f, d;
  e[1] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (f = () => () => a.current?.(), d = [], e[1] = f, e[2] = d) : (f = e[1], d = e[2]), H(f, d);
  let m;
  e[3] !== r ? (m = (w) => {
    r.start(w);
    const x = w.clientX, F = w.clientY;
    let W = !1;
    const E = (q) => {
      (Math.abs(q.clientX - x) > tt || Math.abs(q.clientY - F) > tt) && (W = !0);
    }, k = wa;
    window.addEventListener("touchmove", k, {
      passive: !1
    }), window.addEventListener("pointermove", E);
    const B = () => {
      if (window.removeEventListener("touchmove", k), window.removeEventListener("pointermove", E), window.removeEventListener("pointerup", B), window.removeEventListener("pointercancel", B), W) {
        const q = Ua;
        window.addEventListener("click", q, {
          capture: !0,
          once: !0
        }), setTimeout(() => window.removeEventListener("click", q, {
          capture: !0
        }), 250);
      }
    };
    window.addEventListener("pointerup", B), window.addEventListener("pointercancel", B);
  }, e[3] = r, e[4] = m) : m = e[4];
  const h = m;
  let A;
  e[5] !== h || e[6] !== o || e[7] !== i ? (A = (w) => {
    if (i || w.pointerType === "mouse" && w.button !== 0)
      return;
    const x = o.current;
    if (!x)
      return;
    if (w.target.closest?.("[data-modal-drag]")) {
      h(w);
      return;
    }
    const F = Ta(w.target, x);
    if (F && F.scrollTop > 0)
      return;
    u();
    const W = w.clientX, E = w.clientY, k = (q) => {
      const P = q.clientX - W, V = q.clientY - E;
      Math.abs(P) < tt && Math.abs(V) < tt || (u(), V > 0 && Math.abs(V) > Math.abs(P) && h(q));
    }, B = () => u();
    window.addEventListener("pointermove", k), window.addEventListener("pointerup", B), window.addEventListener("pointercancel", B), a.current = () => {
      window.removeEventListener("pointermove", k), window.removeEventListener("pointerup", B), window.removeEventListener("pointercancel", B);
    };
  }, e[5] = h, e[6] = o, e[7] = i, e[8] = A) : A = e[8];
  const p = A;
  let v;
  e[9] !== t ? (v = (w, x) => {
    (x.offset.y > Sa || x.velocity.y > Na) && t();
  }, e[9] = t, e[10] = v) : v = e[10];
  const b = v, y = i ? !1 : "y";
  let S, g;
  e[11] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (S = {
    top: 0
  }, g = {
    top: 0.05
  }, e[11] = S, e[12] = g) : (S = e[11], g = e[12]);
  let T;
  e[13] !== r || e[14] !== b || e[15] !== y ? (T = {
    drag: y,
    dragListener: !1,
    dragControls: r,
    dragConstraints: S,
    dragElastic: g,
    dragMomentum: !1,
    dragSnapToOrigin: !0,
    onDragEnd: b
  }, e[13] = r, e[14] = b, e[15] = y, e[16] = T) : T = e[16];
  const N = T;
  let L;
  return e[17] !== N || e[18] !== p || e[19] !== c || e[20] !== s ? (L = {
    y: s,
    overlayOpacity: c,
    dragProps: N,
    onPanelPointerDown: p
  }, e[17] = N, e[18] = p, e[19] = c, e[20] = s, e[21] = L) : L = e[21], L;
}
function Ua(n) {
  n.stopPropagation(), n.preventDefault();
}
function wa(n) {
  n.cancelable && n.preventDefault();
}
function xa(n) {
  const e = window.innerHeight || 1;
  return 1 - Math.min(Math.max(n / e, 0), 1);
}
const Ea = ["a[href]:not([disabled])", "button:not([disabled])", "textarea:not([disabled])", "input:not([disabled]):not([type='hidden'])", "select:not([disabled])", "[tabindex]:not([tabindex='-1'])"].join(","), Kn = (n) => n ? Array.from(n.querySelectorAll(Ea)).filter((e) => e.offsetParent !== null || e === document.activeElement) : [];
function Ra(n, e) {
  const t = I(4);
  let o, i;
  t[0] !== e || t[1] !== n ? (o = () => {
    if (!e)
      return;
    const r = n.current;
    if (!r)
      return;
    const s = document.activeElement;
    r.hasAttribute("tabindex") || r.setAttribute("tabindex", "-1"), (Kn(r)[0] || r).focus({
      preventScroll: !0
    });
    const l = (u) => {
      if (u.key !== "Tab")
        return;
      const f = Kn(r);
      if (!f.length) {
        u.preventDefault();
        return;
      }
      const d = f[0], m = f[f.length - 1], h = document.activeElement;
      u.shiftKey ? (h === d || !r.contains(h)) && (u.preventDefault(), m.focus()) : (h === m || !r.contains(h)) && (u.preventDefault(), d.focus());
    };
    return r.addEventListener("keydown", l), () => {
      r.removeEventListener("keydown", l), s && typeof s.focus == "function" && s.focus({
        preventScroll: !0
      });
    };
  }, i = [n, e], t[0] = e, t[1] = n, t[2] = o, t[3] = i) : (o = t[2], i = t[3]), H(o, i);
}
const Wa = (n) => typeof window > "u" || !window.matchMedia ? !1 : window.matchMedia(n).matches;
function Fa(n) {
  const e = I(5);
  let t;
  e[0] !== n ? (t = () => Wa(n), e[0] = n, e[1] = t) : t = e[1];
  const [o, i] = $(t);
  let r, s;
  return e[2] !== n ? (r = () => {
    if (typeof window > "u" || !window.matchMedia)
      return;
    const c = window.matchMedia(n), a = () => i(c.matches);
    return a(), c.addEventListener("change", a), () => c.removeEventListener("change", a);
  }, s = [n], e[2] = n, e[3] = r, e[4] = s) : (r = e[3], s = e[4]), H(r, s), o;
}
const Ka = "(min-width: 900px)";
function Da() {
  return Fa(Ka);
}
const jt = (n) => typeof document > "u" ? "" : getComputedStyle(document.documentElement).getPropertyValue(`--ui-${n}`).trim(), li = () => ce.themeParams.secondary_bg_color || jt("background-secondary"), Ba = rt.modal, Ia = Rt[16], Ma = 0.6, ka = {
  hidden: () => ({
    y: window.innerHeight
  }),
  visible: {
    y: 0,
    transition: be.MODAL
  },
  exit: () => ({
    y: window.innerHeight,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  })
}, qa = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "linear"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "linear"
    }
  }
}, Pa = (n) => {
  const e = I(60);
  let t, o, i, r, s, c;
  e[0] !== n ? ({
    isOpen: i,
    onClose: r,
    initialPage: o,
    style: c,
    children: t,
    ...s
  } = n, e[0] = n, e[1] = t, e[2] = o, e[3] = i, e[4] = r, e[5] = s, e[6] = c) : (t = e[1], o = e[2], i = e[3], r = e[4], s = e[5], c = e[6]);
  const a = X(null), l = Da(), {
    isApple: u
  } = Ce();
  let f;
  e[7] !== t ? (f = ha(t), e[7] = t, e[8] = f) : f = e[8];
  const d = f, m = d !== null, h = o ?? d?.[0]?.id;
  let A;
  e[9] !== h ? (A = [h], e[9] = h, e[10] = A) : A = e[10];
  let p;
  e[11] !== i || e[12] !== A ? (p = {
    stack: A,
    direction: 0,
    wasOpen: i
  }, e[11] = i, e[12] = A, e[13] = p) : p = e[13];
  const [v, b] = $(p);
  i !== v.wasOpen && b(i ? {
    stack: [h],
    direction: 0,
    wasOpen: !0
  } : {
    ...v,
    wasOpen: !1
  });
  const y = v.stack.length > 1, S = v.stack[v.stack.length - 1];
  let g;
  e[14] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (g = (le) => b((fe) => ({
    ...fe,
    stack: [...fe.stack, le],
    direction: 1
  })), e[14] = g) : g = e[14];
  const T = g;
  let N;
  e[15] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (N = () => b(Ya), e[15] = N) : N = e[15];
  const L = N;
  let w;
  e[16] !== r ? (w = {
    onClose: r,
    panelRef: a
  }, e[16] = r, e[17] = w) : w = e[17];
  const {
    y: x,
    overlayOpacity: F,
    dragProps: W,
    onPanelPointerDown: E
  } = La(w);
  Ra(a, i);
  let k, B;
  e[18] !== i ? (k = () => {
    if (!i)
      return;
    const le = li();
    return document.body.style.overflow = "hidden", ce.disableVerticalSwipes?.(), ce.setHeaderColor(`#${wl(le, jt("static-black"), 0.5)}`), Qa;
  }, B = [i], e[18] = i, e[19] = k, e[20] = B) : (k = e[19], B = e[20]), H(k, B);
  let q, P;
  e[21] !== y || e[22] !== i || e[23] !== r ? (P = () => {
    if (!i)
      return;
    const le = (fe) => {
      fe.key === "Escape" && (y ? L() : r());
    };
    return window.addEventListener("keydown", le), () => window.removeEventListener("keydown", le);
  }, q = [i, y, L, r], e[21] = y, e[22] = i, e[23] = r, e[24] = q, e[25] = P) : (q = e[24], P = e[25]), H(P, q);
  const V = l ? ra : ia;
  let Y;
  e[26] !== V ? (Y = [oa, V], e[26] = V, e[27] = Y) : Y = e[27];
  const U = Y.join(" ");
  let R;
  e[28] !== l || e[29] !== F ? (R = l ? {
    style: {
      opacity: F
    }
  } : {
    variants: qa,
    initial: "hidden",
    animate: "visible",
    exit: "exit"
  }, e[28] = l, e[29] = F, e[30] = R) : R = e[30];
  const K = R, M = l ? aa : la, D = !m && ca;
  let Q;
  e[31] !== M || e[32] !== D ? (Q = [sa, M, D].filter(Boolean), e[31] = M, e[32] = D, e[33] = Q) : Q = e[33];
  const G = Q.join(" "), Z = u ? Ba : Ia;
  let J;
  e[34] !== Z ? (J = {
    radius: Z,
    smoothing: Ma
  }, e[34] = Z, e[35] = J) : J = e[35];
  const _ = J;
  let z;
  e[36] !== _ || e[37] !== l ? (z = l ? _ : {
    topLeft: _,
    topRight: _,
    bottomLeft: 0,
    bottomRight: 0
  }, e[36] = _, e[37] = l, e[38] = z) : z = e[38];
  const ee = z;
  let O;
  e[39] !== S || e[40] !== y || e[41] !== t || e[42] !== ee || e[43] !== W || e[44] !== i || e[45] !== m || e[46] !== v.direction || e[47] !== v.stack.length || e[48] !== r || e[49] !== E || e[50] !== U || e[51] !== K || e[52] !== d || e[53] !== G || e[54] !== s || e[55] !== c || e[56] !== x ? (O = i && /* @__PURE__ */ j(ge, {
    children: [/* @__PURE__ */ C(Eo, {
      onClick: y ? L : r
    }), /* @__PURE__ */ C(ie.div, {
      className: U,
      ...K,
      onClick: r,
      children: /* @__PURE__ */ C(Ca, {
        panelRef: a,
        corners: ee,
        role: "dialog",
        "aria-modal": "true",
        className: G,
        variants: ka,
        initial: "hidden",
        animate: "visible",
        exit: "exit",
        style: {
          ...c,
          y: x
        },
        ...W,
        onPointerDown: E,
        onClick: Oa,
        ...s,
        children: /* @__PURE__ */ C(Lo.Provider, {
          value: !0,
          children: m ? /* @__PURE__ */ C(ba, {
            pages: d,
            activeId: S,
            depth: v.stack.length,
            direction: v.direction,
            nav: {
              push: T,
              pop: L,
              canPop: y,
              activeId: S,
              close: r
            }
          }) : /* @__PURE__ */ C("div", {
            className: ma,
            children: t
          })
        })
      })
    })]
  }), e[39] = S, e[40] = y, e[41] = t, e[42] = ee, e[43] = W, e[44] = i, e[45] = m, e[46] = v.direction, e[47] = v.stack.length, e[48] = r, e[49] = E, e[50] = U, e[51] = K, e[52] = d, e[53] = G, e[54] = s, e[55] = c, e[56] = x, e[57] = O) : O = e[57];
  let se;
  return e[58] !== O ? (se = /* @__PURE__ */ it(/* @__PURE__ */ C(Ee, {
    children: O
  }), document.body), e[58] = O, e[59] = se) : se = e[59], se;
};
Pa.Page = Jt;
function Ya(n) {
  return n.stack.length > 1 ? {
    ...n,
    stack: n.stack.slice(0, -1),
    direction: -1
  } : n;
}
function Qa() {
  document.body.style.overflow = "auto", ce.enableVerticalSwipes?.(), ce.setHeaderColor(li());
}
function Oa(n) {
  return n.stopPropagation();
}
function Eu(n) {
  const e = I(11), {
    children: t
  } = n;
  let o;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (o = function(f) {
    const d = {};
    return f.split("").map((m, h) => {
      d[m] || (d[m] = 0);
      const A = `${m}-${d[m]}-${h}`;
      return d[m] = d[m] + 1, {
        char: m,
        key: A
      };
    });
  }, e[0] = o) : o = e[0];
  const i = o;
  let r, s, c, a;
  if (e[1] !== t) {
    const u = i(t);
    r = Ee, s = "popLayout", c = !1, a = u.map(Ga), e[1] = t, e[2] = r, e[3] = s, e[4] = c, e[5] = a;
  } else
    r = e[2], s = e[3], c = e[4], a = e[5];
  let l;
  return e[6] !== r || e[7] !== s || e[8] !== c || e[9] !== a ? (l = /* @__PURE__ */ C(r, {
    mode: s,
    initial: c,
    children: a
  }), e[6] = r, e[7] = s, e[8] = c, e[9] = a, e[10] = l) : l = e[10], l;
}
function Ga(n) {
  const {
    char: e,
    key: t
  } = n;
  return /* @__PURE__ */ C(ie.span, {
    layoutId: t,
    style: {
      display: "inline-block"
    },
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
    },
    exit: {
      opacity: 0
    },
    transition: Go.MORPH,
    children: e === " " ? " " : e
  }, t);
}
const Va = (n) => {
  const e = I(2), {
    children: t
  } = n;
  let o;
  return e[0] !== t ? (o = /* @__PURE__ */ C(Li, {
    features: Ui,
    strict: !0,
    children: t
  }), e[0] = t, e[1] = o) : o = e[1], o;
}, {
  setHeaderColor: Za,
  setBackgroundColor: za
} = ce, ai = (n) => {
  const e = I(18), {
    children: t,
    mode: o,
    headerColor: i,
    backgroundColor: r,
    expandOnMount: s
  } = n, c = o === void 0 ? "secondary" : o, {
    inDetailPane: a,
    setPaneBackground: l
  } = kt();
  let u;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (u = {
    primary: "bg_color",
    secondary: "secondary_bg_color"
  }, e[0] = u) : u = e[0];
  const f = u;
  let d;
  e[1] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (d = {
    primary: "--tg-theme-bg-color",
    secondary: "--tg-theme-secondary-bg-color"
  }, e[1] = d) : d = e[1];
  const m = d, h = i ? `#${i}` : f[c], A = r ? `#${r}` : f[c], p = r ? `#${r}` : `var(${m[c]})`;
  let v, b;
  e[2] !== s ? (v = () => {
    s && ce.expand();
  }, b = [s], e[2] = s, e[3] = v, e[4] = b) : (v = e[3], b = e[4]), H(v, b);
  let y, S;
  e[5] !== p || e[6] !== a || e[7] !== A || e[8] !== h ? (y = () => {
    a || (ce.initData ? (za(A), Za(h)) : document.body.style.backgroundColor = p, document.body.style.setProperty("--page-background", p));
  }, S = [A, h, p, a], e[5] = p, e[6] = a, e[7] = A, e[8] = h, e[9] = y, e[10] = S) : (y = e[9], S = e[10]), H(y, S);
  let g, T;
  e[11] !== p || e[12] !== a || e[13] !== l ? (g = () => {
    !a || !l || l(p);
  }, T = [a, l, p], e[11] = p, e[12] = a, e[13] = l, e[14] = g, e[15] = T) : (g = e[14], T = e[15]), H(g, T);
  let N;
  return e[16] !== t ? (N = /* @__PURE__ */ C(ge, {
    children: t
  }), e[16] = t, e[17] = N) : N = e[17], N;
};
ai.propTypes = {
  children: Ae.node,
  mode: Ae.oneOf(["primary", "secondary"]),
  headerColor: Ae.string,
  backgroundColor: Ae.string,
  expandOnMount: Ae.bool
};
const Ja = "_root_125s3_1", ja = "_card_125s3_16", Xa = "_container_125s3_22", St = "flex justify-between gap-compact px-content py-10 text-section";
function Dn(n) {
  const e = I(27);
  let t, o, i, r;
  switch (e[0] !== n ? ({
    type: i,
    title: o,
    value: r,
    ...t
  } = n, e[0] = n, e[1] = t, e[2] = o, e[3] = i, e[4] = r) : (t = e[1], o = e[2], i = e[3], r = e[4]), i) {
    case "Headline": {
      let s;
      e[5] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (s = st(St, "text-foreground"), e[5] = s) : s = e[5];
      let c;
      e[6] !== o ? (c = /* @__PURE__ */ C(te, {
        variant: "title3",
        weight: "bold",
        children: o
      }), e[6] = o, e[7] = c) : c = e[7];
      let a;
      e[8] !== r ? (a = r && /* @__PURE__ */ C(te, {
        variant: "title3",
        weight: "bold",
        children: r
      }), e[8] = r, e[9] = a) : a = e[9];
      let l;
      return e[10] !== t || e[11] !== c || e[12] !== a ? (l = /* @__PURE__ */ j("div", {
        className: s,
        ...t,
        children: [c, a]
      }), e[10] = t, e[11] = c, e[12] = a, e[13] = l) : l = e[13], l;
    }
    case "Footer": {
      let s;
      e[14] !== o ? (s = /* @__PURE__ */ C(te, {
        variant: "footnote",
        children: o
      }), e[14] = o, e[15] = s) : s = e[15];
      let c;
      return e[16] !== t || e[17] !== s ? (c = /* @__PURE__ */ C("div", {
        className: St,
        ...t,
        children: s
      }), e[16] = t, e[17] = s, e[18] = c) : c = e[18], c;
    }
    default: {
      let s;
      e[19] !== o ? (s = /* @__PURE__ */ C(te, {
        variant: "body",
        weight: "semibold",
        children: o
      }), e[19] = o, e[20] = s) : s = e[20];
      let c;
      e[21] !== r ? (c = r && /* @__PURE__ */ C(te, {
        variant: "footnote",
        children: r
      }), e[21] = r, e[22] = c) : c = e[22];
      let a;
      return e[23] !== t || e[24] !== s || e[25] !== c ? (a = /* @__PURE__ */ j("div", {
        className: St,
        ...t,
        children: [s, c]
      }), e[23] = t, e[24] = s, e[25] = c, e[26] = a) : a = e[26], a;
    }
  }
}
const _a = rt.section, Ha = Rt[16], $a = 0.6, wt = (n) => {
  const e = I(6);
  let t, o;
  e[0] !== n ? ({
    children: t,
    ...o
  } = n, e[0] = n, e[1] = t, e[2] = o) : (t = e[1], o = e[2]);
  let i;
  return e[3] !== t || e[4] !== o ? (i = /* @__PURE__ */ C("section", {
    className: Ja,
    ...o,
    children: t
  }), e[3] = t, e[4] = o, e[5] = i) : i = e[5], i;
}, ec = (n) => {
  const e = I(21);
  let t, o, i, r;
  e[0] !== n ? ({
    children: t,
    header: i,
    description: o,
    ...r
  } = n, e[0] = n, e[1] = t, e[2] = o, e[3] = i, e[4] = r) : (t = e[1], o = e[2], i = e[3], r = e[4]);
  const {
    isApple: s
  } = Ce(), c = X(null), a = X(null), l = s ? _a : Ha;
  let u;
  e[5] !== l ? (u = {
    radius: l,
    smoothing: $a
  }, e[5] = l, e[6] = u) : u = e[6];
  let f;
  e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (f = {
    autoEffects: !1
  }, e[7] = f) : f = e[7], so(s ? a : c, u, f);
  let d;
  e[8] !== i ? (d = i && /* @__PURE__ */ C(Dn, {
    title: i
  }), e[8] = i, e[9] = d) : d = e[9];
  let m;
  e[10] !== t ? (m = /* @__PURE__ */ C("div", {
    ref: a,
    className: Xa,
    children: t
  }), e[10] = t, e[11] = m) : m = e[11];
  let h;
  e[12] !== d || e[13] !== m ? (h = /* @__PURE__ */ j("div", {
    ref: c,
    className: ja,
    children: [d, m]
  }), e[12] = d, e[13] = m, e[14] = h) : h = e[14];
  let A;
  e[15] !== o ? (A = o && /* @__PURE__ */ C(Dn, {
    type: "Footer",
    title: o
  }), e[15] = o, e[16] = A) : A = e[16];
  let p;
  return e[17] !== r || e[18] !== h || e[19] !== A ? (p = /* @__PURE__ */ j("section", {
    ...r,
    children: [h, A]
  }), e[17] = r, e[18] = h, e[19] = A, e[20] = p) : p = e[20], p;
};
wt.Item = ec;
const Bn = [{
  title: "Toncoin",
  sub: "TON",
  value: "1,024.50"
}, {
  title: "Bitcoin",
  sub: "BTC",
  value: "64,120"
}, {
  title: "Ethereum",
  sub: "ETH",
  value: "3,180"
}, {
  title: "Solana",
  sub: "SOL",
  value: "142.60"
}, {
  title: "Notcoin",
  sub: "NOT",
  value: "0.0091"
}, {
  title: "Tether",
  sub: "USDT",
  value: "1.00"
}, {
  title: "Dogecoin",
  sub: "DOGE",
  value: "0.121"
}, {
  title: "Polygon",
  sub: "MATIC",
  value: "0.72"
}], Ru = (n) => {
  const e = I(6), {
    rows: t,
    media: o,
    trailing: i
  } = n, r = t === void 0 ? 7 : t, s = o === void 0 ? !0 : o, c = i === void 0 ? !0 : i;
  let a;
  e[0] !== r ? (a = Array.from({
    length: r
  }), e[0] = r, e[1] = a) : a = e[1];
  let l;
  return e[2] !== s || e[3] !== a || e[4] !== c ? (l = /* @__PURE__ */ C(ai, {
    children: /* @__PURE__ */ C(wt, {
      children: /* @__PURE__ */ C(wt.Item, {
        children: /* @__PURE__ */ C(Wt, {
          active: !0,
          children: a.map((u, f) => {
            const d = Bn[f % Bn.length];
            return /* @__PURE__ */ C(Se, {
              start: s ? /* @__PURE__ */ C(Ul, {}) : void 0,
              end: c ? /* @__PURE__ */ C(Se.Text, {
                title: d.value
              }) : void 0,
              children: /* @__PURE__ */ C(Se.Text, {
                title: d.title,
                description: d.sub,
                bold: !0
              })
            }, f);
          })
        })
      })
    })
  }), e[2] = s, e[3] = a, e[4] = c, e[5] = l) : l = e[5], l;
}, tc = 50, we = /* @__PURE__ */ new Map(), ci = (n) => {
  const e = we.get(n);
  return e && (we.delete(n), we.set(n, e)), e;
}, nc = (n, e) => ci(n)?.get(e), oc = (n, e, t) => {
  let o = ci(n);
  o || (o = /* @__PURE__ */ new Map(), we.set(n, o), we.size > tc && we.delete(we.keys().next().value)), o.set(e, t);
}, ic = () => "/" + window.location.hash.replace(/^#?\/?/, ""), rc = 1e3;
function sc(n, e, t) {
  const o = I(8), i = e;
  let r;
  o[0] !== t ? (r = t === void 0 ? {} : t, o[0] = t, o[1] = r) : r = o[1];
  const {
    enabled: s
  } = r, c = s === void 0 ? !0 : s, [a] = $(ic);
  let l, u;
  o[2] !== c || o[3] !== a || o[4] !== n || o[5] !== i ? (l = () => {
    const f = n.current;
    if (!f || !c)
      return;
    const d = () => oc(a, i, {
      top: f.scrollTop,
      left: f.scrollLeft
    });
    f.addEventListener("scroll", d, {
      passive: !0
    });
    let m = 0;
    const h = () => cancelAnimationFrame(m), A = nc(a, i);
    if (A && (A.top > 0 || A.left > 0)) {
      const p = () => f.scrollHeight - f.clientHeight >= A.top && f.scrollWidth - f.clientWidth >= A.left, v = () => {
        f.scrollTop = A.top, f.scrollLeft = A.left;
      }, b = performance.now() + rc, y = () => {
        if (p() || performance.now() > b) {
          v();
          return;
        }
        m = requestAnimationFrame(y);
      };
      y(), f.addEventListener("pointerdown", h, {
        passive: !0
      }), f.addEventListener("wheel", h, {
        passive: !0
      });
    }
    return () => {
      h(), f.removeEventListener("scroll", d), f.removeEventListener("pointerdown", h), f.removeEventListener("wheel", h);
    };
  }, u = [n, a, i, c], o[2] = c, o[3] = a, o[4] = n, o[5] = i, o[6] = l, o[7] = u) : (l = o[6], u = o[7]), Te(l, u);
}
const lc = /* @__PURE__ */ ye(null), In = "_root_1d6zg_1", ac = "_contained_1d6zg_7", cc = "_scroll_1d6zg_14", dc = "_withBottomInset_1d6zg_20", uc = {
  initial: {
    opacity: 0,
    scale: 1.006
  },
  animate: {
    opacity: 1,
    scale: 1
  },
  exit: {
    opacity: 0,
    scale: 1.01
  }
}, fc = {
  duration: 0.3,
  ease: lt.MATERIAL_STANDARD
}, pc = (n) => {
  const e = I(11), {
    ref: t,
    location: o,
    className: i,
    children: r
  } = n, s = X(null), c = wi();
  let a;
  e[0] !== c ? (a = {
    enabled: c
  }, e[0] = c, e[1] = a) : a = e[1], sc(s, "page", a);
  let l;
  e[2] !== t ? (l = (d) => {
    s.current = d, typeof t == "function" ? t(d) : t && (t.current = d);
  }, e[2] = t, e[3] = l) : l = e[3];
  let u;
  e[4] !== r || e[5] !== o ? (u = /* @__PURE__ */ C(lc.Provider, {
    value: o,
    children: r
  }), e[4] = r, e[5] = o, e[6] = u) : u = e[6];
  let f;
  return e[7] !== i || e[8] !== l || e[9] !== u ? (f = /* @__PURE__ */ C(ie.div, {
    ref: l,
    className: i,
    variants: uc,
    initial: "initial",
    animate: "animate",
    exit: "exit",
    transition: fc,
    children: u
  }), e[7] = i, e[8] = l, e[9] = u, e[10] = f) : f = e[10], f;
}, Wu = (n) => {
  const e = I(7), {
    children: t,
    bottomInset: o,
    contained: i
  } = n, r = o === void 0 ? !1 : o, s = i === void 0 ? !1 : i, [c] = Ei(), a = s ? `${In} ${ac}` : In, l = `${cc} ${r ? dc : ""}`;
  let u;
  e[0] !== t || e[1] !== c || e[2] !== l ? (u = /* @__PURE__ */ C(Ee, {
    mode: "popLayout",
    children: /* @__PURE__ */ C(pc, {
      location: c,
      className: l,
      children: t
    }, c)
  }), e[0] = t, e[1] = c, e[2] = l, e[3] = u) : u = e[3];
  let f;
  return e[4] !== a || e[5] !== u ? (f = /* @__PURE__ */ C("div", {
    className: a,
    children: u
  }), e[4] = a, e[5] = u, e[6] = f) : f = e[6], f;
}, mc = `#version 300 es

precision highp float;

layout(location = 0) in vec2 inPosition;
layout(location = 1) in vec2 inVelocity;
layout(location = 2) in float inTime;
layout(location = 3) in float inDuration;
layout(location = 4) in float inAlpha;

out vec2 outPosition;
out vec2 outVelocity;
out float outTime;
out float outDuration;
out float outAlpha;
out float alpha;

uniform float reset;
uniform float time;
uniform float deltaTime;
uniform vec2 size;
uniform float r;
uniform float seed;
uniform float noiseScale;
uniform float noiseSpeed;
uniform float noiseMovement;
uniform float dampingMult;
uniform float forceMult;
uniform float velocityMult;
uniform float longevity;
uniform float maxVelocity;

uniform float fadeOut;
uniform vec2 fadeOutXY;

uniform float text;
uniform sampler2D textTexture;

float rand(vec2 n) {
	return fract(sin(dot(n,vec2(12.9898,4.1414-seed*.42)))*43758.5453);
}
vec4 loop(vec4 p) {
  p.xy = fract(p.xy / noiseScale) * noiseScale;
  p.zw = fract(p.zw / noiseScale) * noiseScale;
  return p;
}
vec3 loop(vec3 p) {
  p.xy = fract(p.xy / noiseScale) * noiseScale;
  return p;
}
float mod289(float x){return x-floor(x*(1./(289.+seed)))*(289.+seed);}
vec4 mod289(vec4 x){return x-floor(x*(1./(289.+seed)))*(289.0+seed);}
vec4 perm(vec4 x){return mod289(((x*34.)+1.)*x);}
float noise(vec3 p){

  vec3 a = floor(p);
  vec3 d = p - a;
  d = d * d * (3. - 2. * d);

  vec4 b = a.xxyy + vec4(0., 1., 0., 1.);
  vec4 k1 = perm(loop(b.xyxy));
  vec4 k2 = perm(loop(k1.xyxy + b.zzww));

  vec4 c = k2 + a.zzzz;
  vec4 k3 = perm(c);
  vec4 k4 = perm(c + 1.0);

  vec4 o3 = fract(k4 / 41.0) * d.z + fract(k3 / 41.0) * (1.0 - d.z);
  vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

  return o4.y * d.y + o4.x * (1.0 - d.y);
}
vec3 grad(vec3 p) {
  const vec2 e = vec2(.1, .0);
  return vec3(
    noise(loop(p + e.xyy)) - noise(loop(p - e.xyy)),
    noise(loop(p + e.yxy)) - noise(loop(p - e.yxy)),
    noise(loop(p + e.yyx)) - noise(loop(p - e.yyx))
  ) / (2.0 * e.x);
}
vec3 curlNoise(vec3 p) {
  p.xy /= size;
  p.x *= (size.x / size.y);
  p.xy = fract(p.xy);
  p.xy *= noiseScale;

  const vec2 e = vec2(.01, .0);
  return grad(loop(p)).yzx - vec3(
    grad(loop(p + e.yxy)).z,
    grad(loop(p + e.yyx)).x,
    grad(loop(p + e.xyy)).y
  );
}

float textAlpha(vec2 pos) {
  vec2 uv = pos / size;
  uv.y = 1. - uv.y;
  return texture(textTexture, uv).a;
}

vec2 genpos() {
  float t = fract(time / 50.) * 50.;
  if (text > 0.) {
    vec2 pos = vec2(-10., -10.);
    int i = 0;
    for (; i < 4 && textAlpha(pos * size) < .3; ++i) {
      pos = vec2(
        rand(vec2(42., -3.) * vec2(cos(float(gl_VertexID + i) - seed), gl_VertexID + i)),
        rand(vec2(-3., 42.) * vec2(t * (t + float(i)), sin(float(gl_VertexID + i) + seed)))
      );
    }
    return pos * size;
  }
  return size * vec2(
    rand(vec2(42., -3.) * vec2(cos(float(gl_VertexID) - seed), gl_VertexID)),
    rand(vec2(-3., 42.) * vec2(t * t, sin(float(gl_VertexID) + seed)))
  );
}

void main() {
  vec2 position = inPosition;
  vec2 velocity = inVelocity;
  float particleDuration = inDuration;
  float particleTime = inTime + deltaTime * particleDuration / longevity;
  float particleAlpha = inAlpha;

  if (reset > 0.) {
    particleTime = rand(vec2(-94.3, 83.9) * vec2(gl_VertexID, gl_VertexID));
    particleDuration = .5 + 2. * rand(vec2(gl_VertexID) + seed * 32.4);
    position = genpos();
    velocity = vec2(0.);
    particleAlpha = text > .5 ? particleAlpha = textAlpha(position) : 1.;
  } else if (particleTime >= 1.) {
    particleTime = 0.0;
    particleDuration = .5 + 2. * rand(vec2(gl_VertexID) + position);
    if (text > .5) {
      position = genpos();
      particleAlpha = textAlpha(position);
    } else {
      particleAlpha = 1.;
    }
    velocity = vec2(0.);
  }

  float textVelocityMult = 1.;
  if (text > .5) {
    float insideText = textVelocityMult = textAlpha(position);
    particleAlpha = min(max(particleAlpha + (insideText - .75) * deltaTime * 3., 0.), 1.);
    if (fadeOut > 0.) {
      particleAlpha *= mix(1., insideText, fadeOut);
    }
  }

  float msz = min(size.x, size.y);
  vec2 force = normalize(curlNoise(
    vec3(
      position + time * (noiseMovement / 100. * msz),
      time * noiseSpeed + rand(position) * 2.5
    )
  ).xy);

  velocity += force * forceMult * deltaTime * msz * .1;
  velocity *= dampingMult;
  float vlen = length(velocity);
  float maxVelocityPx = maxVelocity / 100. * msz;
  if (vlen > maxVelocityPx) {
    velocity = velocity / vlen * maxVelocityPx;
  }

  float fadeOutAlpha = 1.;
  if (fadeOut > 0.) {
    vec2 vector = position - fadeOutXY;
    float dist = length(vector);
    vec2 dir = normalize(vector);
    float dst = .9 * max(0., 1. - max(0., dist / (max(size.x, size.y) * fadeOut) - 1.));
    position += dir * deltaTime * 1000. * dst;
    fadeOutAlpha = 1. - fadeOut;
  }
  position += velocity * velocityMult * textVelocityMult * deltaTime;

  if ((
    position.x < 0. ||
    position.y < 0. ||
    position.x > size.x ||
    position.y > size.y
  ) && fadeOut < .1) {
    particleTime = 0.0;
    position = genpos();
    particleDuration = .5 + 2. * rand(vec2(gl_VertexID) + position);
    velocity = vec2(0.);
  }

  outPosition = position;
  outVelocity = velocity;
  outTime = particleTime;
  outDuration = particleDuration;
  outAlpha = particleAlpha;

  gl_PointSize = r;
  gl_Position = vec4((position / size * 2.0 - vec2(1.0)), 0.0, 1.0);

  alpha = sin(particleTime * 3.14) * fadeOutAlpha * particleAlpha * (.6 + .4 * rand(vec2(gl_VertexID)));
}

// @dkaraush
`, hc = `#version 300 es

precision highp float;

in float alpha;
out vec4 fragColor;

uniform vec3 color;

void main() {
  vec2 c = 2.0 * gl_PointCoord - 1.0;
  if (dot(c, c) > 1.0) {
    discard;
  }
  fragColor = vec4(color, alpha);
}`, Ac = ["outPosition", "outVelocity", "outTime", "outDuration", "outAlpha"];
function Mn(n, e, t) {
  const o = n.createShader(e);
  if (n.shaderSource(o, t), n.compileShader(o), !n.getShaderParameter(o, n.COMPILE_STATUS))
    throw new Error(n.getShaderInfoLog(o));
  return o;
}
function gc(n) {
  const e = Mn(n, n.VERTEX_SHADER, mc), t = Mn(n, n.FRAGMENT_SHADER, hc), o = n.createProgram();
  if (n.attachShader(o, e), n.attachShader(o, t), n.transformFeedbackVaryings(o, Ac, n.INTERLEAVED_ATTRIBS), n.linkProgram(o), !n.getProgramParameter(o, n.LINK_STATUS))
    throw new Error(n.getProgramInfoLog(o));
  return n.deleteShader(e), n.deleteShader(t), o;
}
function yc(n, e, t) {
  const o = n.createTexture();
  return n.activeTexture(n.TEXTURE0), n.bindTexture(n.TEXTURE_2D, o), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MAG_FILTER, n.LINEAR), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_MIN_FILTER, n.LINEAR_MIPMAP_NEAREST), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_S, n.CLAMP_TO_EDGE), n.texParameteri(n.TEXTURE_2D, n.TEXTURE_WRAP_T, n.CLAMP_TO_EDGE), n.useProgram(e), n.uniform1i(t.textTexture, 0), n.clearColor(0, 0, 0, 0), n.enable(n.BLEND), n.blendFunc(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA), o;
}
function vc(n, e) {
  const t = n || (e ? getComputedStyle(e).color : jt("static-white")), o = document.createElement("canvas");
  o.width = o.height = 1;
  const i = o.getContext("2d");
  i.fillStyle = t, i.fillRect(0, 0, 1, 1);
  const [r, s, c] = i.getImageData(0, 0, 1, 1).data;
  return [r / 255, s / 255, c / 255];
}
function bc(n, e, t, o = 0, i = 0) {
  const r = n.getBoundingClientRect();
  e.clearRect(0, 0, e.canvas.width, e.canvas.height), e.save(), e.scale(t, t), e.beginPath(), e.rect(o, o, r.width, r.height), e.clip();
  const s = getComputedStyle(n).color;
  e.fillStyle = s, e.strokeStyle = s, e.lineJoin = "round", e.textBaseline = "top";
  const c = document.createTreeWalker(n, NodeFilter.SHOW_TEXT), a = document.createRange();
  let l = 0, u;
  for (; u = c.nextNode(); ) {
    const f = u.nodeValue;
    if (!f || !f.trim()) continue;
    const d = u.parentElement;
    if (!d) continue;
    const m = getComputedStyle(d);
    if (m.visibility === "hidden" || m.display === "none" || m.opacity === "0")
      continue;
    a.selectNodeContents(u);
    const h = a.getBoundingClientRect();
    if (h.width === 0 && h.height === 0) continue;
    e.font = `${m.fontStyle} ${m.fontWeight} ${m.fontSize} ${m.fontFamily}`;
    const A = parseFloat(m.fontSize) || h.height, p = h.left - r.left + o, v = h.top - r.top + o + (h.height - A) / 2;
    i > 0 && (e.lineWidth = A * i, e.strokeText(f, p, v)), e.fillText(f, p, v), l++;
  }
  return e.restore(), l;
}
const Nt = {
  noiseScale: 22,
  noiseSpeed: 0.6,
  forceMult: 0.6,
  velocityMult: 1,
  dampingMult: 0.9999,
  maxVelocity: 6,
  longevity: 1.4,
  noiseMovement: 4,
  timeScale: 1
}, Cc = 2, Sc = 400, Nc = 0.028, Tc = 300, Lc = 8e3, kn = 28, Uc = [[0, 2, 0], [1, 2, 8], [2, 1, 16], [3, 1, 20], [4, 1, 24]], wc = ["time", "deltaTime", "size", "reset", "r", "seed", "noiseScale", "noiseSpeed", "dampingMult", "velocityMult", "forceMult", "longevity", "maxVelocity", "noiseMovement", "color", "fadeOut", "fadeOutXY", "text", "textTexture"];
function xc({
  gl: n,
  canvas: e,
  content: t,
  color: o,
  radius: i,
  padding: r,
  maskDilation: s = 0.3
}) {
  const c = gc(n), a = {};
  for (const y of wc) a[y] = n.getUniformLocation(c, y);
  const l = document.createElement("canvas"), u = l.getContext("2d"), f = yc(n, c, a), d = {
    buffer: null,
    bufferIndex: 0,
    count: 0,
    w: 0,
    h: 0,
    dpr: 1,
    radius: 0,
    color: [1, 1, 1],
    seed: Math.random() * 10,
    time: 0,
    lastDraw: 0,
    reset: !1,
    fadeOut: !1,
    fadeOutTime: 0,
    fadeOutXY: [0, 0],
    covered: !1,
    text: 1,
    // 1 = particles spawn on the glyph mask, 0 = block fallback
    pad: 0,
    active: !1,
    // covering or mid-reveal (the loop should run)
    onscreen: !0,
    // paused by an IntersectionObserver when scrolled away
    raf: 0
  }, m = () => {
    d.buffer && (n.deleteBuffer(d.buffer[0]), n.deleteBuffer(d.buffer[1])), d.buffer = [n.createBuffer(), n.createBuffer()];
    for (let y = 0; y < 2; ++y)
      n.bindBuffer(n.ARRAY_BUFFER, d.buffer[y]), n.bufferData(n.ARRAY_BUFFER, d.count * kn, n.DYNAMIC_DRAW);
    d.bufferIndex = 0;
  }, h = () => {
    d.w <= 0 || d.h <= 0 || (l.width = d.w, l.height = d.h, d.text = bc(t, u, d.dpr, d.pad, s) > 0 ? 1 : 0, n.activeTexture(n.TEXTURE0), n.bindTexture(n.TEXTURE_2D, f), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, l), n.generateMipmap(n.TEXTURE_2D));
  }, A = () => {
    for (const [y, S, g] of Uc)
      n.vertexAttribPointer(y, S, n.FLOAT, !1, kn, g), n.enableVertexAttribArray(y);
  }, p = () => {
    const y = t.getBoundingClientRect();
    if (y.width <= 0 || y.height <= 0) return;
    d.dpr = Math.min(window.devicePixelRatio || 1, Cc), d.pad = r ?? Math.round(y.height);
    const S = y.width + 2 * d.pad, g = y.height + 2 * d.pad;
    e.style.left = e.style.top = `${-d.pad}px`, e.style.width = `${S}px`, e.style.height = `${g}px`, d.w = e.width = Math.floor(S * d.dpr), d.h = e.height = Math.floor(g * d.dpr), d.radius = (i || 1.6) * d.dpr, d.count = Math.max(Tc, Math.min(Lc, Math.round(S * g * Nc))), d.color = vc(o, t), m(), h(), d.reset = !0;
  }, v = () => {
    const y = window.performance.now(), S = Math.min((y - d.lastDraw) / 1e3, 1) * Nt.timeScale;
    d.lastDraw = y, d.time += S, d.fadeOut && (d.fadeOutTime += S * 1e3 / Sc);
    const g = Math.min(d.fadeOutTime, 1);
    if (n.viewport(0, 0, d.w, d.h), n.clear(n.COLOR_BUFFER_BIT), g >= 1) {
      d.raf = 0, d.active = !1;
      return;
    }
    n.useProgram(c), n.uniform1f(a.reset, d.reset ? 1 : 0), d.reset && (d.time = 0, d.reset = !1), n.uniform1f(a.time, d.time), n.uniform1f(a.deltaTime, S), n.uniform2f(a.size, d.w, d.h), n.uniform1f(a.seed, d.seed), n.uniform1f(a.r, d.radius);
    for (const T in Nt) a[T] && n.uniform1f(a[T], Nt[T]);
    n.uniform3f(a.color, d.color[0], d.color[1], d.color[2]), n.uniform1f(a.fadeOut, g), n.uniform2f(a.fadeOutXY, d.fadeOutXY[0], d.fadeOutXY[1]), n.uniform1f(a.text, d.text), n.activeTexture(n.TEXTURE0), n.bindTexture(n.TEXTURE_2D, f), n.bindBuffer(n.ARRAY_BUFFER, d.buffer[d.bufferIndex]), A(), n.bindBufferBase(n.TRANSFORM_FEEDBACK_BUFFER, 0, d.buffer[1 - d.bufferIndex]), A(), n.beginTransformFeedback(n.POINTS), n.drawArrays(n.POINTS, 0, d.count), n.endTransformFeedback(), n.bindBuffer(n.ARRAY_BUFFER, null), n.bindBufferBase(n.TRANSFORM_FEEDBACK_BUFFER, 0, null), d.bufferIndex = 1 - d.bufferIndex, d.raf = requestAnimationFrame(v);
  }, b = () => {
    d.raf || !d.onscreen || (d.lastDraw = window.performance.now(), d.raf = requestAnimationFrame(v));
  };
  return {
    resize: p,
    cover() {
      d.covered = !0, d.active = !0, d.fadeOut = !1, d.fadeOutTime = 0, h(), d.reset = !0, b();
    },
    reveal(y) {
      d.covered && (d.covered = !1, d.active = !0, d.fadeOut = !0, d.fadeOutTime = 0, d.fadeOutXY = y ? [(y.x + d.pad) * d.dpr, d.h - (y.y + d.pad) * d.dpr] : [d.w / 2, d.h / 2], b());
    },
    // Pause the loop while scrolled off-screen, resume if still active.
    setOnscreen(y) {
      y !== d.onscreen && (d.onscreen = y, y ? d.active && b() : d.raf && (cancelAnimationFrame(d.raf), d.raf = 0));
    },
    destroy() {
      d.raf && cancelAnimationFrame(d.raf), d.buffer && (n.deleteBuffer(d.buffer[0]), n.deleteBuffer(d.buffer[1])), n.deleteTexture(f), n.deleteProgram(c);
    }
  };
}
function Ec(n) {
  const e = I(13), {
    canvasRef: t,
    contentRef: o,
    hidden: i,
    color: r,
    radius: s,
    padding: c,
    maskDilation: a
  } = n, [l, u] = $(!0), f = X(null), d = X(null);
  let m, h;
  e[0] !== t || e[1] !== r || e[2] !== o || e[3] !== a || e[4] !== c || e[5] !== s ? (m = () => {
    const b = t.current, y = o.current;
    if (!b || !y)
      return;
    const S = b.getContext("webgl2", {
      premultipliedAlpha: !1
    });
    if (!S) {
      u(!1);
      return;
    }
    const g = xc({
      gl: S,
      canvas: b,
      content: y,
      color: r,
      radius: s,
      padding: c,
      maskDilation: a
    });
    d.current = g;
    const T = new ResizeObserver(() => g.resize());
    T.observe(y), g.resize();
    const N = new IntersectionObserver((L) => {
      const [w] = L;
      g.setOnscreen(w.isIntersecting);
    });
    return N.observe(y), () => {
      T.disconnect(), N.disconnect(), g.destroy(), d.current = null;
    };
  }, h = [t, o, r, s, c, a], e[0] = t, e[1] = r, e[2] = o, e[3] = a, e[4] = c, e[5] = s, e[6] = m, e[7] = h) : (m = e[6], h = e[7]), H(m, h);
  let A, p;
  e[8] !== i ? (A = () => {
    const b = d.current;
    b && (i ? b.cover() : b.reveal(f.current));
  }, p = [i], e[8] = i, e[9] = A, e[10] = p) : (A = e[9], p = e[10]), H(A, p);
  let v;
  return e[11] !== l ? (v = {
    supported: l,
    revealOriginRef: f
  }, e[11] = l, e[12] = v) : v = e[12], v;
}
const Rc = "_root_c5uou_1", Wc = "_content_c5uou_7", Fc = "_hidden_c5uou_13", Kc = "_canvas_c5uou_17", Dc = "_fallback_c5uou_22";
function Fu(n) {
  const e = I(32);
  let t, o, i, r, s, c, a, l, u;
  e[0] !== n ? ({
    children: t,
    hidden: u,
    onClick: s,
    className: o,
    color: i,
    radius: a,
    padding: c,
    maskDilation: r,
    ...l
  } = n, e[0] = n, e[1] = t, e[2] = o, e[3] = i, e[4] = r, e[5] = s, e[6] = c, e[7] = a, e[8] = l, e[9] = u) : (t = e[1], o = e[2], i = e[3], r = e[4], s = e[5], c = e[6], a = e[7], l = e[8], u = e[9]);
  const f = u === void 0 ? !1 : u, d = X(null), m = X(null), h = X(null);
  let A;
  e[10] !== i || e[11] !== f || e[12] !== r || e[13] !== c || e[14] !== a ? (A = {
    canvasRef: h,
    contentRef: m,
    hidden: f,
    color: i,
    radius: a,
    padding: c,
    maskDilation: r
  }, e[10] = i, e[11] = f, e[12] = r, e[13] = c, e[14] = a, e[15] = A) : A = e[15];
  const {
    supported: p,
    revealOriginRef: v
  } = Ec(A);
  let b;
  e[16] !== s || e[17] !== v ? (b = (F) => {
    const W = d.current;
    if (W) {
      const E = W.getBoundingClientRect();
      v.current = {
        x: F.clientX - E.left,
        y: F.clientY - E.top
      };
    }
    s?.(F);
  }, e[16] = s, e[17] = v, e[18] = b) : b = e[18];
  const y = b, S = f && Fc, g = !p && Dc;
  let T;
  e[19] !== o || e[20] !== S || e[21] !== g ? (T = [Rc, S, g, o].filter(Boolean), e[19] = o, e[20] = S, e[21] = g, e[22] = T) : T = e[22];
  const N = T.join(" ");
  let L;
  e[23] !== t || e[24] !== f ? (L = /* @__PURE__ */ C("span", {
    ref: m,
    className: Wc,
    "aria-hidden": f,
    children: t
  }), e[23] = t, e[24] = f, e[25] = L) : L = e[25];
  let w;
  e[26] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (w = /* @__PURE__ */ C("canvas", {
    ref: h,
    className: Kc,
    "aria-hidden": "true"
  }), e[26] = w) : w = e[26];
  let x;
  return e[27] !== y || e[28] !== l || e[29] !== N || e[30] !== L ? (x = /* @__PURE__ */ j("span", {
    ref: d,
    className: N,
    onClick: y,
    ...l,
    children: [L, w]
  }), e[27] = y, e[28] = l, e[29] = N, e[30] = L, e[31] = x) : x = e[31], x;
}
const Bc = "_root_132ti_7", Ic = "_selected_132ti_17", qn = 1e3;
function di(n, e, t = "vertical") {
  const o = n / e;
  if (Math.abs(o) >= Math.PI / 2) return null;
  const i = (e * Math.sin(o) - n).toFixed(2), r = (e * (Math.cos(o) - 1)).toFixed(2), s = (o * 180 / Math.PI).toFixed(2);
  return t === "horizontal" ? `perspective(${qn}px) translateX(${i}px) translateZ(${r}px) rotateY(${s}deg)` : `perspective(${qn}px) translateY(${i}px) translateZ(${r}px) rotateX(${-s}deg)`;
}
const Ku = (n) => {
  const e = I(33), {
    items: t,
    onPickerIndex: o
  } = n, i = X(null), [r, s] = $(0), [c, a] = $(0), [l, u] = $(34), [f, d] = $(100), [m, h] = $(0), [A, p] = $(!1), v = X(!1), b = X(null);
  let y, S;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (y = () => {
    i.current?.children.length > 0 && (u(i.current.children[0].offsetHeight), d(i.current.clientHeight / 2), h(i.current.scrollTop));
  }, S = [], e[0] = y, e[1] = S) : (y = e[0], S = e[1]), H(y, S);
  let g, T;
  e[2] !== l || e[3] !== t.length || e[4] !== o || e[5] !== r ? (g = () => {
    const Y = () => {
      v.current || (v.current = !0, requestAnimationFrame(() => {
        if (!i.current) {
          v.current = !1;
          return;
        }
        const R = i.current.scrollTop, K = Math.min(t.length - 1, Math.max(0, Math.round(R / l) - 1));
        a(R), r !== K && (s(K), o?.(K)), v.current = !1;
      }));
    }, U = i.current;
    if (U)
      return U.addEventListener("scroll", Y), () => U.removeEventListener("scroll", Y);
  }, T = [l, t.length, r, o], e[2] = l, e[3] = t.length, e[4] = o, e[5] = r, e[6] = g, e[7] = T) : (g = e[6], T = e[7]), H(g, T);
  let N, L;
  e[8] !== t.length || e[9] !== r ? (N = () => {
    r >= 0 && r < t.length && ce.HapticFeedback.selectionChanged();
  }, L = [r, t.length], e[8] = t.length, e[9] = r, e[10] = N, e[11] = L) : (N = e[10], L = e[11]), H(N, L);
  let w;
  e[12] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (w = (Y) => {
    Y.pointerType === "touch" || Y.button !== 0 || (b.current = {
      pointerId: Y.pointerId,
      startY: Y.clientY,
      startScrollTop: Y.currentTarget.scrollTop
    }, Y.currentTarget.setPointerCapture(Y.pointerId), p(!0));
  }, e[12] = w) : w = e[12];
  const x = w;
  let F;
  e[13] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (F = (Y) => {
    const U = b.current;
    !U || U.pointerId !== Y.pointerId || (Y.preventDefault(), Y.currentTarget.scrollTop = U.startScrollTop + U.startY - Y.clientY);
  }, e[13] = F) : F = e[13];
  const W = F;
  let E;
  e[14] !== m || e[15] !== l ? (E = (Y) => {
    const U = b.current;
    if (!U || U.pointerId !== Y.pointerId)
      return;
    const R = Y.currentTarget;
    b.current = null, p(!1), R.hasPointerCapture(Y.pointerId) && R.releasePointerCapture(Y.pointerId);
    const K = Math.round((R.scrollTop - m) / l), M = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    R.scrollTo({
      top: m + K * l,
      behavior: M ? "auto" : "smooth"
    });
  }, e[14] = m, e[15] = l, e[16] = E) : E = e[16];
  const k = E;
  let B;
  e[17] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (B = /* @__PURE__ */ C("div", {
    className: Ic
  }), e[17] = B) : B = e[17];
  const q = A || void 0;
  let P;
  if (e[18] !== m || e[19] !== l || e[20] !== t || e[21] !== f || e[22] !== c) {
    let Y;
    e[24] !== m || e[25] !== l || e[26] !== f || e[27] !== c ? (Y = (U, R) => {
      const K = -c + m + R * l, M = di(K, f);
      return /* @__PURE__ */ C("li", {
        style: {
          transform: M ?? void 0,
          visibility: M ? void 0 : "hidden",
          height: `${l}px`
        },
        children: U
      }, R);
    }, e[24] = m, e[25] = l, e[26] = f, e[27] = c, e[28] = Y) : Y = e[28], P = t.map(Y), e[18] = m, e[19] = l, e[20] = t, e[21] = f, e[22] = c, e[23] = P;
  } else
    P = e[23];
  let V;
  return e[29] !== k || e[30] !== q || e[31] !== P ? (V = /* @__PURE__ */ j("div", {
    className: Bc,
    children: [B, /* @__PURE__ */ C("ul", {
      ref: i,
      "data-pointer-dragging": q,
      onPointerDown: x,
      onPointerMove: W,
      onPointerUp: k,
      onPointerCancel: k,
      children: P
    })]
  }), e[29] = k, e[30] = q, e[31] = P, e[32] = V) : V = e[32], V;
}, Mc = "_root_avzg7_1", kc = "_segment_avzg7_13", qc = "_active_avzg7_25", Pc = "_activeIndicator_avzg7_30", Du = (n) => {
  const e = I(23);
  let t, o, i, r, s;
  e[0] !== n ? ({
    segments: r,
    onChange: o,
    defaultIndex: s,
    colorScheme: t,
    ...i
  } = n, e[0] = n, e[1] = t, e[2] = o, e[3] = i, e[4] = r, e[5] = s) : (t = e[1], o = e[2], i = e[3], r = e[4], s = e[5]);
  const c = s === void 0 ? 0 : s, [a, l] = $(c), u = ii(t);
  let f;
  e[6] !== o ? (f = (b) => {
    l(b), o && o(b);
  }, e[6] = o, e[7] = f) : f = e[7];
  const d = f;
  let m;
  if (e[8] !== a || e[9] !== d || e[10] !== r) {
    let b;
    e[12] !== a || e[13] !== d ? (b = (y, S) => /* @__PURE__ */ C("button", {
      className: `${kc} ${S === a ? qc : ""}`,
      onClick: () => d(S),
      children: /* @__PURE__ */ C(te, {
        variant: "footnote",
        weight: "semibold",
        children: y
      })
    }, S), e[12] = a, e[13] = d, e[14] = b) : b = e[14], m = r.map(b), e[8] = a, e[9] = d, e[10] = r, e[11] = m;
  } else
    m = e[11];
  const h = `calc(${100 / r.length}% - var(--ui-space-4))`, A = `translateX(calc(${a} * (100% + var(--ui-space-4))))`;
  let p;
  e[15] !== h || e[16] !== A ? (p = /* @__PURE__ */ C("div", {
    className: Pc,
    style: {
      width: h,
      transform: A,
      marginLeft: "var(--ui-space-2)",
      marginRight: "var(--ui-space-2)"
    }
  }), e[15] = h, e[16] = A, e[17] = p) : p = e[17];
  let v;
  return e[18] !== u || e[19] !== i || e[20] !== m || e[21] !== p ? (v = /* @__PURE__ */ j("div", {
    className: Mc,
    "data-color-scheme": u,
    ...i,
    children: [m, p]
  }), e[18] = u, e[19] = i, e[20] = m, e[21] = p, e[22] = v) : v = e[22], v;
}, Yc = "_root_cnxqv_1", Qc = "_icon_cnxqv_17", Oc = "_content_cnxqv_42", Gc = "_title_cnxqv_55", Vc = "_description_cnxqv_56", Zc = "_action_cnxqv_61", zc = "_link_cnxqv_61", Jc = "_host_cnxqv_92", jc = "_host_top_cnxqv_105", Xc = "_host_bottom_cnxqv_109", _c = "_item_cnxqv_114", Hc = (n) => {
  const e = I(19), {
    icon: t,
    title: o,
    description: i,
    link: r,
    action: s
  } = n, c = !!i;
  let a;
  e[0] !== t ? (a = t ? /* @__PURE__ */ C("div", {
    className: Qc,
    "aria-hidden": "true",
    children: t
  }) : null, e[0] = t, e[1] = a) : a = e[1];
  const l = c ? "semibold" : void 0;
  let u;
  e[2] !== l || e[3] !== o ? (u = /* @__PURE__ */ C(te, {
    as: "p",
    className: Gc,
    variant: "subheadline2",
    weight: l,
    children: o
  }), e[2] = l, e[3] = o, e[4] = u) : u = e[4];
  let f;
  e[5] !== i ? (f = i ? /* @__PURE__ */ C(te, {
    as: "p",
    className: Vc,
    variant: "subheadline2",
    children: i
  }) : null, e[5] = i, e[6] = f) : f = e[6];
  let d;
  e[7] !== r ? (d = r ? /* @__PURE__ */ C("button", {
    type: "button",
    className: zc,
    onClick: r.onClick,
    children: /* @__PURE__ */ C(te, {
      as: "span",
      variant: "subheadline2",
      children: r.label
    })
  }) : null, e[7] = r, e[8] = d) : d = e[8];
  let m;
  e[9] !== u || e[10] !== f || e[11] !== d ? (m = /* @__PURE__ */ j("div", {
    className: Oc,
    children: [u, f, d]
  }), e[9] = u, e[10] = f, e[11] = d, e[12] = m) : m = e[12];
  let h;
  e[13] !== s ? (h = s ? /* @__PURE__ */ C("button", {
    type: "button",
    className: Zc,
    onClick: s.onClick,
    children: /* @__PURE__ */ C(te, {
      as: "span",
      variant: "body",
      children: s.label
    })
  }) : null, e[13] = s, e[14] = h) : h = e[14];
  let A;
  return e[15] !== a || e[16] !== m || e[17] !== h ? (A = /* @__PURE__ */ j("div", {
    className: Yc,
    role: "status",
    "aria-live": "polite",
    children: [a, m, h]
  }), e[15] = a, e[16] = m, e[17] = h, e[18] = A) : A = e[18], A;
};
Ae.shape({
  label: Ae.node.isRequired,
  onClick: Ae.func
});
const $c = 4e3, e1 = 100, t1 = 500, n1 = (n) => {
  if (n)
    try {
      ce.HapticFeedback?.notificationOccurred(n);
    } catch {
    }
}, o1 = (n) => {
  const e = I(45), {
    item: t,
    onDismiss: o
  } = n, {
    id: i,
    icon: r,
    title: s,
    description: c,
    link: a,
    action: l,
    position: u,
    duration: f,
    type: d
  } = t, m = u === void 0 ? "bottom" : u, h = f === void 0 ? $c : f, A = Ve(), [p, v] = $(!1), [b, y] = $(0);
  let S;
  e[0] !== i || e[1] !== o ? (S = () => o(i), e[0] = i, e[1] = o, e[2] = S) : S = e[2];
  const g = S;
  let T, N;
  e[3] !== d ? (T = () => {
    n1(d);
  }, N = [d], e[3] = d, e[4] = T, e[5] = N) : (T = e[4], N = e[5]), H(T, N);
  let L, w;
  e[6] !== g || e[7] !== h || e[8] !== p ? (L = () => {
    if (!h || p)
      return;
    const J = setTimeout(g, h);
    return () => clearTimeout(J);
  }, w = [h, p, g], e[6] = g, e[7] = h, e[8] = p, e[9] = L, e[10] = w) : (L = e[9], w = e[10]), H(L, w);
  const x = m === "top" ? -32 : 32, F = d === "error";
  let W;
  e[11] !== A || e[12] !== x ? (W = A ? {
    opacity: 0
  } : {
    opacity: 0,
    y: x,
    scale: 0.96
  }, e[11] = A, e[12] = x, e[13] = W) : W = e[13];
  const E = W;
  let k;
  e[14] !== F || e[15] !== A ? (k = A ? {
    opacity: 1
  } : {
    opacity: 1,
    y: 0,
    scale: 1,
    x: F ? [0, -10, 10, -7, 7, -3, 3, 0] : 0,
    transition: {
      default: be.SNACKBAR,
      ...F && {
        x: {
          duration: 0.45,
          ease: "easeOut",
          delay: 0.18
        }
      }
    }
  }, e[14] = F, e[15] = A, e[16] = k) : k = e[16];
  const B = k;
  let q;
  e[17] !== b || e[18] !== A || e[19] !== x ? (q = A ? {
    opacity: 0,
    transition: {
      duration: 0.15
    }
  } : {
    opacity: 0,
    x: b * 400,
    y: b === 0 ? x : 0,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }, e[17] = b, e[18] = A, e[19] = x, e[20] = q) : q = e[20];
  const P = q;
  let V;
  e[21] !== g ? (V = (J, _) => {
    v(!1);
    const z = _.offset.x, ee = _.velocity.x;
    (Math.abs(z) > e1 || Math.abs(ee) > t1) && (y(z >= 0 ? 1 : -1), g());
  }, e[21] = g, e[22] = V) : V = e[22];
  const Y = V;
  let U;
  e[23] !== g ? (U = (J) => {
    if (J)
      return {
        ...J,
        onClick: () => {
          J.onClick?.(), g();
        }
      };
  }, e[23] = g, e[24] = U) : U = e[24];
  const R = U, K = A ? !1 : "x";
  let M;
  e[25] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (M = () => v(!0), e[25] = M) : M = e[25];
  let D;
  e[26] !== a || e[27] !== R ? (D = R(a), e[26] = a, e[27] = R, e[28] = D) : D = e[28];
  let Q;
  e[29] !== l || e[30] !== R ? (Q = R(l), e[29] = l, e[30] = R, e[31] = Q) : Q = e[31];
  let G;
  e[32] !== c || e[33] !== r || e[34] !== D || e[35] !== Q || e[36] !== s ? (G = /* @__PURE__ */ C(Hc, {
    icon: r,
    title: s,
    description: c,
    link: D,
    action: Q
  }), e[32] = c, e[33] = r, e[34] = D, e[35] = Q, e[36] = s, e[37] = G) : G = e[37];
  let Z;
  return e[38] !== B || e[39] !== P || e[40] !== Y || e[41] !== E || e[42] !== K || e[43] !== G ? (Z = /* @__PURE__ */ C(ie.div, {
    className: _c,
    initial: E,
    animate: B,
    exit: P,
    layout: !0,
    drag: K,
    dragSnapToOrigin: !0,
    dragElastic: 0.6,
    dragMomentum: !1,
    onDragStart: M,
    onDragEnd: Y,
    children: G
  }), e[38] = B, e[39] = P, e[40] = Y, e[41] = E, e[42] = K, e[43] = G, e[44] = Z) : Z = e[44], Z;
}, ui = {
  top: jc,
  bottom: Xc
}, i1 = Object.keys(ui), r1 = (n) => {
  const e = I(5), {
    snackbars: t,
    onDismiss: o
  } = n;
  let i;
  e[0] !== o || e[1] !== t ? (i = i1.map((s) => {
    const c = t.filter((a) => (a.position ?? "bottom") === s);
    return /* @__PURE__ */ C("div", {
      className: `${Jc} ${ui[s]}`,
      children: /* @__PURE__ */ C(Ee, {
        initial: !1,
        children: c.map((a) => /* @__PURE__ */ C(o1, {
          item: a,
          onDismiss: o
        }, a.id))
      })
    }, s);
  }), e[0] = o, e[1] = t, e[2] = i) : i = e[2];
  let r;
  return e[3] !== i ? (r = /* @__PURE__ */ it(/* @__PURE__ */ C(ge, {
    children: i
  }), document.body), e[3] = i, e[4] = r) : r = e[4], r;
}, fi = /* @__PURE__ */ ye(null), Bu = () => {
  const n = Ne(fi);
  if (!n)
    throw new Error("useSnackbar must be used inside <SnackbarProvider>");
  return n;
}, s1 = (n) => {
  const e = I(9), {
    children: t
  } = n;
  let o;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (o = [], e[0] = o) : o = e[0];
  const [i, r] = $(o), s = X(0);
  let c;
  e[1] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (c = (h) => {
    r((A) => A.filter((p) => p.id !== h));
  }, e[1] = c) : c = e[1];
  const a = c;
  let l;
  e[2] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (l = (h) => {
    s.current = s.current + 1;
    const A = s.current;
    return r((p) => [...p, {
      id: A,
      ...h
    }]), A;
  }, e[2] = l) : l = e[2];
  const u = l;
  let f;
  e[3] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (f = {
    show: u,
    dismiss: a
  }, e[3] = f) : f = e[3];
  let d;
  e[4] !== i ? (d = /* @__PURE__ */ C(r1, {
    snackbars: i,
    onDismiss: a
  }), e[4] = i, e[5] = d) : d = e[5];
  let m;
  return e[6] !== t || e[7] !== d ? (m = /* @__PURE__ */ j(fi.Provider, {
    value: f,
    children: [t, d]
  }), e[6] = t, e[7] = d, e[8] = m) : m = e[8], m;
}, l1 = (n) => /* @__PURE__ */ ae.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ ae.createElement("g", { id: "24_icon-fill/loader" }, /* @__PURE__ */ ae.createElement("path", { id: "Vector", d: "M12 3.02148C16.9704 3.02148 20.9997 7.07957 21 12.0859C21 17.0925 16.9706 21.1514 12 21.1514C7.02944 21.1514 3 17.0925 3 12.0859C3.00026 11.5299 3.44787 11.0791 4 11.0791C4.55213 11.0791 4.99974 11.5299 5 12.0859C5 15.9799 8.13401 19.1367 12 19.1367C15.866 19.1367 19 15.9799 19 12.0859C18.9997 8.19215 15.8658 5.03613 12 5.03613C9.64439 5.03613 7.56033 6.20674 6.29004 8.00684C5.97018 8.46016 5.34566 8.56708 4.89551 8.24512C4.44533 7.92286 4.33924 7.29328 4.65918 6.83984C6.28848 4.53074 8.96935 3.02148 12 3.02148Z", fill: "#3D3C3A" }))), a1 = "_centered_1ma1e_1", c1 = "_spinner_1ma1e_8", Iu = (n) => {
  const e = I(15);
  let t, o, i, r;
  e[0] !== n ? ({
    centered: t,
    className: o,
    size: r,
    ...i
  } = n, e[0] = n, e[1] = t, e[2] = o, e[3] = i, e[4] = r) : (t = e[1], o = e[2], i = e[3], r = e[4]);
  let s;
  e[5] !== o ? (s = [c1, o].filter(Boolean), e[5] = o, e[6] = s) : s = e[6];
  const c = s.join(" ");
  let a;
  e[7] !== r ? (a = r ? {
    width: r,
    height: r
  } : void 0, e[7] = r, e[8] = a) : a = e[8];
  const l = a;
  let u;
  e[9] !== c || e[10] !== i || e[11] !== l ? (u = /* @__PURE__ */ C(l1, {
    ...i,
    className: c,
    style: l
  }), e[9] = c, e[10] = i, e[11] = l, e[12] = u) : u = e[12];
  const f = u;
  if (t) {
    let d;
    return e[13] !== f ? (d = /* @__PURE__ */ C("div", {
      className: a1,
      children: f
    }), e[13] = f, e[14] = d) : d = e[14], d;
  }
  return f;
}, d1 = "_root_11c9c_1", u1 = "_sidebar_11c9c_11", f1 = "_sidebarScroll_11c9c_21", p1 = "_detail_11c9c_28", pi = (n) => {
  const e = I(2), {
    children: t
  } = n;
  let o;
  return e[0] !== t ? (o = /* @__PURE__ */ C("div", {
    className: d1,
    children: t
  }), e[0] = t, e[1] = o) : o = e[1], o;
}, m1 = (n) => {
  const e = I(2), {
    children: t
  } = n;
  let o;
  return e[0] !== t ? (o = /* @__PURE__ */ C("aside", {
    className: u1,
    children: /* @__PURE__ */ C("div", {
      className: f1,
      children: t
    })
  }), e[0] = t, e[1] = o) : o = e[1], o;
}, h1 = (n) => {
  const e = I(8), {
    children: t
  } = n, [o, i] = $(null), [r, s] = $(null), c = X(null);
  let a;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (a = (d) => s(d.contentRect.width), e[0] = a) : a = e[0], at(c, a);
  let l;
  e[1] !== o || e[2] !== r ? (l = {}, o && (l.background = o, l["--page-background"] = o), r != null && (l["--split-pane-width"] = `${r}px`), e[1] = o, e[2] = r, e[3] = l) : l = e[3];
  let u;
  e[4] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (u = {
    inDetailPane: !0,
    setPaneBackground: i,
    paneRef: c
  }, e[4] = u) : u = e[4];
  let f;
  return e[5] !== t || e[6] !== l ? (f = /* @__PURE__ */ C(Uo.Provider, {
    value: u,
    children: /* @__PURE__ */ C("main", {
      ref: c,
      className: p1,
      style: l,
      children: t
    })
  }), e[5] = t, e[6] = l, e[7] = f) : f = e[7], f;
};
pi.Sidebar = m1;
pi.Detail = h1;
const Mu = (n) => {
  const e = I(7), {
    title: t,
    description: o
  } = n;
  let i;
  e[0] !== t ? (i = /* @__PURE__ */ C(te, {
    variant: "title1",
    weight: "bold",
    children: t
  }), e[0] = t, e[1] = i) : i = e[1];
  let r;
  e[2] !== o ? (r = o && /* @__PURE__ */ C(te, {
    variant: "body",
    weight: "regular",
    children: o
  }), e[2] = o, e[3] = r) : r = e[3];
  let s;
  return e[4] !== i || e[5] !== r ? (s = /* @__PURE__ */ j("div", {
    className: "flex flex-col items-center justify-center gap-12 px-start-view-inline py-start-view-block text-center text-foreground",
    children: [i, r]
  }), e[4] = i, e[5] = r, e[6] = s) : s = e[6], s;
}, A1 = "_card_dbtdh_1", g1 = "_bg_dbtdh_13", y1 = "_coinIcon_dbtdh_22", v1 = "_timestamp_dbtdh_32", b1 = "_train_dbtdh_48", C1 = "_coinName_dbtdh_57", S1 = "_badge_dbtdh_64", N1 = "_pnl_dbtdh_90", T1 = "_prices_dbtdh_109", L1 = "_priceCol_dbtdh_117", U1 = "_priceLabel_dbtdh_123", w1 = "_priceValue_dbtdh_131", ue = {
  card: A1,
  bg: g1,
  coinIcon: y1,
  timestamp: v1,
  train: b1,
  coinName: C1,
  badge: S1,
  pnl: N1,
  prices: T1,
  priceCol: L1,
  priceLabel: U1,
  priceValue: w1
};
function Pn(n) {
  const e = I(2), {
    children: t
  } = n;
  let o;
  return e[0] !== t ? (o = /* @__PURE__ */ C("span", {
    className: ue.badge,
    children: t
  }), e[0] = t, e[1] = o) : o = e[1], o;
}
const x1 = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0
});
function Yn(n) {
  const e = typeof n == "string" ? parseFloat(n) : n;
  return `$${x1.format(Math.round(e))}`;
}
const E1 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAICAgICAgICAgIDAwMDAwQEBAQEBAcFBQUFBQcKBgcGBgcGCgkLCQgJCwkQDQsLDRATEA8QExcUFBcdGx0lJTIBAgICAgICAgICAgMDAwMDBAQEBAQEBwUFBQUFBwoGBwYGBwYKCQsJCAkLCRANCwsNEBMQDxATFxQUFx0bHSUlMv/CABEIB4AEOAMBIgACEQEDEQH/xAA4AAEBAQEBAAIDAQAAAAAAAAAAAQIEAwUGBwgJCgEBAQEAAwEBAQAAAAAAAAAAAAECAwQFBgcI/9oADAMBAAIQAxAAAAD+KaX2OrUFsJbCaQWwWyluaVKWylsFsu11m01KlKzbCXUo3mmku2rm1rWaWyprWaxdSmrm6a1m1qy1qzSXWdM3eNWa1jW2rNGtZ0asprWN3GtZ1qa1m1reaa3nRd51yce7nRfTGjWs6N6xreN7xqze/P0Naxutbzred6zpnes6N7xa9NZ3ua3jTG942a3jfI9NY24978/Q3vz9OSa3jbPpvz2npvz3tveN2b3jbHprG9vTfn6Vv08vRx+m/O6ezDT9DafD/YgtBbCUJSgpUpQWylstVLpbKUtWyuNqUtlLZS2Xa6zqrZTSaLZXHdQa1nWl1m1rWbWrKmtZ0l1nTOrLyNazo1ZTWs6TWs6uNaxrTdmq1c6N3OjdzreN6xqzes6Nb89m7nW8b1nVmt50b1jda3je863jTPprGzesbresb3N6xtje/P0Nbxvkm9Y2z6axtN+nnut78/TeN789pv0891v0897m/Ty2z6b892em/PW3rrz0nrry0x6PMfoqPi/sqEoLYS2UWCg0CgqaNJaazdLZatlLZWGpUtlLc6LZdLrN01c6LZTRWLrOkus2tWXTVzqtazTWsbZtlZ3c65GtZ0XWdF3nRrWN3F1nWprWdVrWNm7nRvWbvOtZ1c7udmtY0m9Z1ub1m3O940b3jRvfn6bzrWdXO9Y2a3jdb3i6nprOrje/PZ6a897em/Pdzvfntn0357r035b3PTfntj0356PXWNbem/Ldz6b8ts+m/LW3rry1XpcD0YH6OU+L+uWChKmkFALZRZSg0lKC2a2WWqDVlYoTVg1ZS6zdrrOqtlLZU1c1NhnWs2tXOtm86LrOxvGmdWVnWs621c6rWs6NazU1rNud6zrUu8brVzo3rGjes61nWs61nWsbNaxs3c7udazred6xo9NY2a3571N6zrWN6xs3rGj01jW3prG7x63jR6b89aeuvPWp6789M+m/PSem/Pe3pvz3cemvPSeuvPWnrrz1p63z0z668tM+t8tV6vNXowP0jL8b9cA1BQzQWwaIaZ0KFso1BbG2rKWxWg49JVtlTSU1ZdLZdNWC6hNppLc6Z1c6q2XbdzTWsbLZpNXNY1vN23c2t3OjWsbLvGmdazredazqtazTes6NaxvWdazdZ3rGj0udG9Y1qb357uNbxqt7xo3vGtTesb1nW8aTe/PZ6a89bemsbuN789J6bxqt78t6euvPdxvfnpPXfluvTflvc9NeemPXXno9N+V09teV09mDPrfOp6XzHq8x+lcX4760KqUUShKUpC2ClKlNAtl2airZS2aYWUtlS2U0l21YrYNJTWs1nSaZus01ZdrqWtXOi6lZ1rNZ1rOtLrOtNaxs1rG0us1nes3U3rF03rOjW/PZreLqbsusb1jRvWdG9Y0b1m7zveNXO9Y2b35emmt+e9Z3rG2d3NPTeNV6axrc3rNY9N+ej035609NYus+uvPTPrrz0euvLW3rrz1c+uvLSeuvLSemvLVemvLWnpfLR6POp6PMfpiPkPrKEqVFlKEoNTWS2UWUWUoNJdtJYtjTVlZtlSppLc6NJdLZdNoTWsaXQTaaYtzouo21ZotlrdzpNXNZ1rOtTWsa01rNN6xtNXOi7xq53c63N6xo1rGzWsbLvN3x71jda1jR6a89mtZ1cb1jW56a89m9+ezW8a3N6xq49Neeze/PR6a896b3i6x6axpPW40b1jWnprz3qelxpj0156PXXndPW4temvO3HrfOp6a86ejzp6XzVtgfpxU+P+rtjcoKlRRKDedZKlLZRZS2C2WrZdGpS3NudFShLrOi2Utl5G5YmgurnSasrFudludaaubWtRW7mprWdM3eKm7LyNag36ee0usaNaxq53rGtTWs6rWsaN6xo1vGtY1vGtTdzT01jRvfnqzesb1jW/PVem/P0NXOq3vz1vPprz2zvWNG9+eq9NYunprGrx7356PTWNVvXnvb0uKx668tJ668tnpcWt78rp6a87Z6XBPS+dT0edTbA/T5XyP1QaWKLCaCKG86yVKW5pbBoFsujUVbLVspbK47ZTSU1c00l5HpLEus1bZpLc1ndxpNWXTVlrVzqrrOk1c6TVzq51rN23c03vz9BrOjWsVn01jes3WNabudGtY2a3571nWs61nWs03rGjes03rGt43rG7N+nls1vz0emvPW56axq53rGk9LjZvXnqvTXnrc9NeemPW+ej1uLXrfPW3przrPprz0z6sU9L56PS+d09L509GFejzpt5j9RafIfTUcioKVlYLZTeN4LZSpS2C2UtgtNrZS2K1ZWGoTQNWDVl22RNXNrVlLrG2Gs6NXOqus3TWs2tWU1rGk1ZWNWXbWs6re/L0Gs01vFTes243c603rGq1rGjdzpN689bxvWbXpcaN6zTesas3vz1rG/Tz3WteezdzrTevPep6a89MemvPR6a89Hpcar0153WfW4tz6a89Hpry1XprzunprFs9WDPpryqet8x6a8x6vOm2B6PMfqZY+U+mqNqChNJUFPTz9ME1KVKVKWylsFudbWy0oXWazbKlsJqyl1m1651ncpVtlS7xo0hjWpS6zdNay03c6NXOk1ZWdXOrNazdtenn6DWNGtZ0a1jTGtZvJN3OjevPZrWNG9ee9Z1vz1rO9ZpvWNG9Y0b1jWs79PH11m6xo3rFPW41W9Y1vO9Y0zvWKemvPR6a87XprF3PTXnpjevOnpry2b152vW4am9edN6ws9HnTdwT0YJtgfqkPk/p6l2CygoZqU9fP08ygoNJSpS2Uo0tlq2Wrc6S3NZus00mktlPTO8baS1q5qauaaqs2ypdZumrFbudVrWNGtY0zdS3OrnW2/Tx9Sazo1rGjWs1jdxrbesas3c6Naxo3rGk3rF5Mb1jRu5pvWab1jVm/Xx9NZusas3rz2buaelzdN789ax6Xz2m9eej015aPTXna9b563N686z6axU3fPR6sU3fO1vXnTd87Xo87W751NsF/Vey/KfRrLYGywaCVKnr5e3kLKNQUFso1mlsuludVbBbLZbKw1KW50Wynrj089rZqqUusaTVzpLc1nWs6q6xqrvF01rNNazU3YZ1rOrL7ePrtLmm9Y0b1jRrWNXG7m7m9Y0a1mm9eejesaresa3x7uNHpcU9NYpv18fWxrz1rG94temvPRvXno9NYu56a89XO9eek9L56PTXnT0uKb353T0vnqzd89XPqwTdwPRino86ejA2wNsD9X0vzH0agS7gFsqH5J/1FcWv8mXn/ALkfTg3/AIar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";
function R1(n) {
  const e = new Date(n), t = String(e.getHours()).padStart(2, "0"), o = String(e.getMinutes()).padStart(2, "0"), i = -e.getTimezoneOffset() / 60, r = i >= 0 ? "+" : "", s = `${t}:${o} (UTC ${r}${i})`, c = e.getDate(), a = e.toLocaleString("en", {
    month: "short"
  }), l = e.getFullYear();
  return {
    time: s,
    date: `${c} ${a}, ${l}`
  };
}
function ku(n) {
  const e = I(48), {
    coinIcon: t,
    coinName: o,
    direction: i,
    leverage: r,
    pnlPercent: s,
    entryPrice: c,
    closePrice: a,
    timestamp: l
  } = n, u = s >= 0;
  let f;
  e[0] !== l ? (f = R1(l), e[0] = l, e[1] = f) : f = e[1];
  const d = f;
  let m;
  e[2] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (m = /* @__PURE__ */ C("img", {
    className: ue.bg,
    src: E1,
    width: 360,
    height: 640,
    alt: "",
    "aria-hidden": "true"
  }), e[2] = m) : m = e[2];
  let h;
  e[3] !== t || e[4] !== o ? (h = t && /* @__PURE__ */ C("img", {
    className: ue.coinIcon,
    src: t,
    width: 40,
    height: 40,
    alt: o
  }), e[3] = t, e[4] = o, e[5] = h) : h = e[5];
  let A;
  e[6] !== d.time ? (A = /* @__PURE__ */ C("p", {
    children: d.time
  }), e[6] = d.time, e[7] = A) : A = e[7];
  let p;
  e[8] !== d.date ? (p = /* @__PURE__ */ C("p", {
    children: d.date
  }), e[8] = d.date, e[9] = p) : p = e[9];
  let v;
  e[10] !== A || e[11] !== p ? (v = /* @__PURE__ */ j("div", {
    className: ue.timestamp,
    children: [A, p]
  }), e[10] = A, e[11] = p, e[12] = v) : v = e[12];
  let b;
  e[13] !== o ? (b = /* @__PURE__ */ C("span", {
    className: ue.coinName,
    children: o
  }), e[13] = o, e[14] = b) : b = e[14];
  let y;
  e[15] !== i ? (y = /* @__PURE__ */ C(Pn, {
    children: i
  }), e[15] = i, e[16] = y) : y = e[16];
  let S;
  e[17] !== r ? (S = /* @__PURE__ */ j(Pn, {
    children: [r, "×"]
  }), e[17] = r, e[18] = S) : S = e[18];
  let g;
  e[19] !== b || e[20] !== y || e[21] !== S ? (g = /* @__PURE__ */ j("div", {
    className: ue.train,
    children: [b, y, S]
  }), e[19] = b, e[20] = y, e[21] = S, e[22] = g) : g = e[22];
  const T = u ? "+" : "";
  let N;
  e[23] !== s ? (N = s.toFixed(2), e[23] = s, e[24] = N) : N = e[24];
  let L;
  e[25] !== u || e[26] !== T || e[27] !== N ? (L = /* @__PURE__ */ j("div", {
    className: ue.pnl,
    "data-positive": u,
    children: [T, N, "%"]
  }), e[25] = u, e[26] = T, e[27] = N, e[28] = L) : L = e[28];
  let w;
  e[29] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (w = /* @__PURE__ */ C("span", {
    className: ue.priceLabel,
    children: "Entry Price"
  }), e[29] = w) : w = e[29];
  let x;
  e[30] !== c ? (x = Yn(c), e[30] = c, e[31] = x) : x = e[31];
  let F;
  e[32] !== x ? (F = /* @__PURE__ */ j("div", {
    className: ue.priceCol,
    children: [w, /* @__PURE__ */ C("span", {
      className: ue.priceValue,
      children: x
    })]
  }), e[32] = x, e[33] = F) : F = e[33];
  let W;
  e[34] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (W = /* @__PURE__ */ C("span", {
    className: ue.priceLabel,
    children: "Close Price"
  }), e[34] = W) : W = e[34];
  let E;
  e[35] !== a ? (E = Yn(a), e[35] = a, e[36] = E) : E = e[36];
  let k;
  e[37] !== E ? (k = /* @__PURE__ */ j("div", {
    className: ue.priceCol,
    children: [W, /* @__PURE__ */ C("span", {
      className: ue.priceValue,
      children: E
    })]
  }), e[37] = E, e[38] = k) : k = e[38];
  let B;
  e[39] !== F || e[40] !== k ? (B = /* @__PURE__ */ j("div", {
    className: ue.prices,
    children: [F, k]
  }), e[39] = F, e[40] = k, e[41] = B) : B = e[41];
  let q;
  return e[42] !== g || e[43] !== L || e[44] !== B || e[45] !== h || e[46] !== v ? (q = /* @__PURE__ */ j("div", {
    className: ue.card,
    "data-story-card": !0,
    children: [m, h, v, g, L, B]
  }), e[42] = g, e[43] = L, e[44] = B, e[45] = h, e[46] = v, e[47] = q) : q = e[47], q;
}
const mi = "_root_txkpd_1", hi = "_line_txkpd_5", Ai = "_token_txkpd_10", W1 = "_typewriter_txkpd_14", gi = "_typewriterGhost_txkpd_23", F1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  line: hi,
  root: mi,
  token: Ai,
  typewriter: W1,
  typewriterGhost: gi
}, Symbol.toStringTag, { value: "Module" })), Qn = {
  slow: 0.08,
  normal: 0.035,
  fast: 0.015
}, On = {
  slow: 0.02,
  normal: 7e-3,
  fast: 7e-3 / 1.5
}, K1 = new Intl.Segmenter(), D1 = (n) => Array.from(K1.segment(n), (e) => e.segment), B1 = (n) => n.split(`
`).map((e) => e.split(/(\s+)/).filter(Boolean).map((t) => ({
  content: t,
  animated: !/^\s+$/.test(t)
}))), I1 = {
  hidden: {
    opacity: 0,
    y: 6
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1]
    }
  }
}, M1 = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.15
    }
  }
}, k1 = (n) => {
  const e = I(12), {
    children: t,
    speed: o,
    delay: i,
    onComplete: r
  } = n, s = Ve(), c = Qn[o] ?? Qn.normal;
  let a;
  if (e[0] !== t || e[1] !== i || e[2] !== r || e[3] !== s || e[4] !== c) {
    const l = B1(t);
    let u;
    e[6] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (u = {}, e[6] = u) : u = e[6];
    const f = s ? 0 : c, d = i / 1e3;
    let m;
    e[7] !== f || e[8] !== d ? (m = {
      hidden: u,
      visible: {
        transition: {
          staggerChildren: f,
          delayChildren: d
        }
      }
    }, e[7] = f, e[8] = d, e[9] = m) : m = e[9];
    const h = m, A = s ? M1 : I1;
    let p;
    e[10] !== A ? (p = (v, b) => /* @__PURE__ */ C("span", {
      className: hi,
      children: v.map((y, S) => y.animated ? /* @__PURE__ */ C(ie.span, {
        className: Ai,
        variants: A,
        children: y.content
      }, S) : /* @__PURE__ */ C("span", {
        children: y.content
      }, S))
    }, b), e[10] = A, e[11] = p) : p = e[11], a = /* @__PURE__ */ C(ie.span, {
      className: mi,
      initial: "hidden",
      animate: "visible",
      variants: h,
      onAnimationComplete: r,
      children: l.map(p)
    }), e[0] = t, e[1] = i, e[2] = r, e[3] = s, e[4] = c, e[5] = a;
  } else
    a = e[5];
  return a;
}, q1 = (n) => {
  const e = I(26), {
    children: t,
    speed: o,
    delay: i,
    onComplete: r
  } = n, s = Ve(), c = On[o] ?? On.normal, a = D1(t), l = a.length;
  let u;
  e[0] !== s || e[1] !== l ? (u = () => s ? {
    whole: l,
    frac: 0
  } : {
    whole: 0,
    frac: 0
  }, e[0] = s, e[1] = l, e[2] = u) : u = e[2];
  const [f, d] = $(u);
  let m;
  e[3] !== i || e[4] !== r || e[5] !== c || e[6] !== s || e[7] !== l ? (m = () => {
    if (s) {
      d({
        whole: l,
        frac: 0
      }), r?.();
      return;
    }
    const L = performance.now() + i, w = c * 1e3;
    let x;
    const F = (W) => {
      const E = W - L;
      if (E < 0) {
        x = requestAnimationFrame(F);
        return;
      }
      const k = E / w, B = Math.min(l, Math.floor(k)), q = B < l ? Math.min(1, k - B) : 0;
      d({
        whole: B,
        frac: q
      }), B < l ? x = requestAnimationFrame(F) : r?.();
    };
    return x = requestAnimationFrame(F), () => cancelAnimationFrame(x);
  }, e[3] = i, e[4] = r, e[5] = c, e[6] = s, e[7] = l, e[8] = m) : m = e[8];
  let h;
  e[9] !== t || e[10] !== i || e[11] !== c || e[12] !== s ? (h = [t, c, i, s], e[9] = t, e[10] = i, e[11] = c, e[12] = s, e[13] = h) : h = e[13], H(m, h);
  const {
    whole: A,
    frac: p
  } = f, v = A < l ? a[A] : null, b = F1;
  let y;
  e[14] !== t ? (y = /* @__PURE__ */ C("span", {
    className: gi,
    "aria-hidden": "true",
    children: t
  }), e[14] = t, e[15] = y) : y = e[15];
  const S = a.slice(0, A).join("");
  let g;
  e[16] !== p || e[17] !== v ? (g = v !== null && /* @__PURE__ */ C("span", {
    style: {
      opacity: p
    },
    children: v
  }), e[16] = p, e[17] = v, e[18] = g) : g = e[18];
  let T;
  e[19] !== S || e[20] !== g ? (T = /* @__PURE__ */ j("span", {
    children: [S, g]
  }), e[19] = S, e[20] = g, e[21] = T) : T = e[21];
  let N;
  return e[22] !== b.typewriter || e[23] !== y || e[24] !== T ? (N = /* @__PURE__ */ j("span", {
    className: b.typewriter,
    children: [y, T]
  }), e[22] = b.typewriter, e[23] = y, e[24] = T, e[25] = N) : N = e[25], N;
}, qu = (n) => {
  const e = I(7), {
    children: t,
    speed: o,
    mode: i,
    delay: r,
    replayKey: s,
    onComplete: c
  } = n, a = o === void 0 ? "fast" : o, l = i === void 0 ? "word" : i, u = r === void 0 ? 0 : r, f = l === "char" ? q1 : k1;
  let d;
  return e[0] !== f || e[1] !== t || e[2] !== u || e[3] !== c || e[4] !== s || e[5] !== a ? (d = /* @__PURE__ */ C(f, {
    speed: a,
    delay: u,
    onComplete: c,
    children: t
  }, s), e[0] = f, e[1] = t, e[2] = u, e[3] = c, e[4] = s, e[5] = a, e[6] = d) : d = e[6], d;
}, P1 = "_root_warzp_1", Y1 = "_gradient_warzp_71", Q1 = "_clipPathContainer_warzp_113", O1 = "_tab_1mynw_1", G1 = "_icon_1mynw_37", V1 = "_active_1mynw_62", yi = (n) => {
  const e = I(21);
  let t, o, i, r, s, c;
  e[0] !== n ? ({
    isActive: o,
    onClick: r,
    label: i,
    icon: t,
    className: c,
    ...s
  } = n, e[0] = n, e[1] = t, e[2] = o, e[3] = i, e[4] = r, e[5] = s, e[6] = c) : (t = e[1], o = e[2], i = e[3], r = e[4], s = e[5], c = e[6]);
  const a = c === void 0 ? "" : c;
  let l;
  e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (l = {
    type: "spring",
    stiffness: 800,
    damping: 50
  }, e[7] = l) : l = e[7];
  const u = `${O1} ${o ? V1 : ""} ${a}`;
  let f;
  e[8] !== u ? (f = u.trim(), e[8] = u, e[9] = f) : f = e[9];
  let d;
  e[10] !== t ? (d = /* @__PURE__ */ C(ie.div, {
    layout: !0,
    className: G1,
    children: t
  }), e[10] = t, e[11] = d) : d = e[11];
  let m;
  e[12] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (m = {
    display: "inline-block"
  }, e[12] = m) : m = e[12];
  let h;
  e[13] !== i ? (h = /* @__PURE__ */ C(ie.span, {
    layout: !0,
    style: m,
    children: i
  }), e[13] = i, e[14] = h) : h = e[14];
  let A;
  return e[15] !== r || e[16] !== s || e[17] !== f || e[18] !== d || e[19] !== h ? (A = /* @__PURE__ */ j(ie.div, {
    layout: !0,
    transition: l,
    ...s,
    className: f,
    onClick: r,
    children: [d, h]
  }), e[15] = r, e[16] = s, e[17] = f, e[18] = d, e[19] = h, e[20] = A) : A = e[20], A;
};
function Z1({
  tabsLength: n,
  activeIndex: e,
  onSnapToSame: t,
  onSnapToNew: o,
  spring: i
}) {
  const r = X(null), [s, c] = $(!1), [a, l] = $(null), u = X(null), f = X(!1), d = X(null), m = X(0), h = 6, A = 100 / n, p = `calc(${A}% + 7.33px - 4px)`, v = `calc(${A * e}% - ${3.67 * e}px)`, b = v, y = `calc(100% - (${v} + ${p}) - 2.33px * ${e})`, S = s && a != null ? `inset(0 ${100 - (a + A)}% 0 ${a}% round 100px)` : `inset(0 ${y} 0 ${b} round 100px)`, g = s ? {
    clipPath: {
      duration: 0
    }
  } : {
    clipPath: i
  }, T = (E) => {
    const k = r.current;
    if (!k) return;
    const B = k.getBoundingClientRect(), q = E - B.left, P = B.width;
    if (P <= 0) return;
    const V = q / P * 100, Y = pe(V - A / 2, 0, 100 - A);
    l(Y);
  }, N = (E) => {
    f.current = !0, d.current = E.pointerId, m.current = E.clientX;
  }, L = (E) => {
    if (!(d.current != null && E.pointerId !== d.current)) {
      if (!s) {
        if (!f.current) return;
        if (Math.abs(E.clientX - m.current) >= h) {
          try {
            E.currentTarget.setPointerCapture?.(E.pointerId), u.current = E.pointerId;
          } catch {
          }
          c(!0), T(E.clientX), E.preventDefault();
        }
        return;
      }
      u.current != null && E.pointerId !== u.current || (T(E.clientX), E.preventDefault());
    }
  }, w = (E) => {
    const k = r.current;
    let B = e;
    if (k && typeof E == "number") {
      const q = k.getBoundingClientRect(), P = E - q.left, V = q.width;
      if (V > 0) {
        const Y = V / n;
        B = pe(Math.round(P / Y - 0.5), 0, n - 1);
      }
    } else if (a != null) {
      const q = 100 / n;
      B = pe(Math.round(a / q), 0, n - 1);
    }
    B === e ? t?.() : o?.(B), c(!1), l(null), u.current = null;
  }, x = (E) => {
    if (f.current = !1, d.current = null, !!s && !(u.current != null && E.pointerId !== u.current)) {
      try {
        E.currentTarget.releasePointerCapture?.(E.pointerId);
      } catch {
      }
      w(E.clientX), E.preventDefault();
    }
  }, F = (E) => {
    f.current = !1, d.current = null, s && (w(E?.clientX), E.preventDefault?.());
  }, W = (E) => {
    s && w(E?.clientX);
  };
  return H(() => {
    const E = () => {
      c(!1), l(null), u.current = null, f.current = !1, d.current = null;
    };
    return window.addEventListener("blur", E), () => window.removeEventListener("blur", E);
  }, []), {
    overlayRef: r,
    isDragging: s,
    animate: {
      clipPath: S
    },
    transition: g,
    handlers: {
      onPointerDown: N,
      onPointerMove: L,
      onPointerUp: x,
      onPointerCancel: F,
      onPointerLeave: W
    }
  };
}
function z1(n) {
  const e = I(40), {
    width: t,
    height: o,
    insets: i,
    innerHeight: r,
    className: s
  } = n;
  let c;
  e[0] !== i ? (c = i === void 0 ? {
    top: 21,
    right: 21,
    bottom: 21,
    left: 21
  } : i, e[0] = i, e[1] = c) : c = e[1];
  const a = c, l = r === void 0 ? 64 : r, u = io();
  if (!t || !o)
    return null;
  const {
    top: f,
    right: d,
    bottom: m,
    left: h
  } = a, A = t + h + d, p = l + f + m, v = Math.max(0, A - h - d), b = Math.min(l / 2, v / 2, 999), y = `grad-${u}`, S = `mask-${u}`, g = Math.max(h, d), T = Math.max(f, m), N = `0 0 ${A} ${p}`;
  let L;
  e[2] !== s ? (L = [Y1, s].filter(Boolean), e[2] = s, e[3] = L) : L = e[3];
  const w = L.join(" "), x = `${g}px`, F = `${T}px`;
  let W;
  e[4] !== x || e[5] !== F ? (W = {
    "--overlay-padding-x": x,
    "--overlay-padding-y": F
  }, e[4] = x, e[5] = F, e[6] = W) : W = e[6];
  let E, k;
  e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (E = /* @__PURE__ */ C("stop", {
    offset: "0%",
    stopColor: "var(--mask-color)",
    stopOpacity: "var(--mask-opacity-top)"
  }), k = /* @__PURE__ */ C("stop", {
    offset: "100%",
    stopColor: "var(--mask-color)",
    stopOpacity: "var(--mask-opacity-bottom)"
  }), e[7] = E, e[8] = k) : (E = e[7], k = e[8]);
  let B;
  e[9] !== y ? (B = /* @__PURE__ */ j("linearGradient", {
    id: y,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1",
    children: [E, k]
  }), e[9] = y, e[10] = B) : B = e[10];
  let q;
  e[11] !== p || e[12] !== A ? (q = /* @__PURE__ */ C("rect", {
    x: "0",
    y: "0",
    width: A,
    height: p,
    fill: "var(--ui-static-white)"
  }), e[11] = p, e[12] = A, e[13] = q) : q = e[13];
  let P;
  e[14] !== l || e[15] !== v || e[16] !== h || e[17] !== b || e[18] !== f ? (P = /* @__PURE__ */ C("rect", {
    x: h,
    y: f,
    width: v,
    height: l,
    rx: b,
    ry: b,
    fill: "var(--ui-static-black)"
  }), e[14] = l, e[15] = v, e[16] = h, e[17] = b, e[18] = f, e[19] = P) : P = e[19];
  let V;
  e[20] !== S || e[21] !== q || e[22] !== P ? (V = /* @__PURE__ */ j("mask", {
    id: S,
    maskUnits: "userSpaceOnUse",
    children: [q, P]
  }), e[20] = S, e[21] = q, e[22] = P, e[23] = V) : V = e[23];
  let Y;
  e[24] !== B || e[25] !== V ? (Y = /* @__PURE__ */ j("defs", {
    children: [B, V]
  }), e[24] = B, e[25] = V, e[26] = Y) : Y = e[26];
  const U = `url(#${y})`, R = `url(#${S})`;
  let K;
  e[27] !== p || e[28] !== A || e[29] !== U || e[30] !== R ? (K = /* @__PURE__ */ C("rect", {
    width: A,
    height: p,
    fill: U,
    mask: R
  }), e[27] = p, e[28] = A, e[29] = U, e[30] = R, e[31] = K) : K = e[31];
  let M;
  return e[32] !== p || e[33] !== A || e[34] !== Y || e[35] !== K || e[36] !== N || e[37] !== w || e[38] !== W ? (M = /* @__PURE__ */ j("svg", {
    width: A,
    height: p,
    viewBox: N,
    preserveAspectRatio: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: w,
    style: W,
    "aria-hidden": !0,
    children: [Y, K]
  }), e[32] = p, e[33] = A, e[34] = Y, e[35] = K, e[36] = N, e[37] = w, e[38] = W, e[39] = M) : M = e[39], M;
}
const J1 = (n) => {
  const e = I(24), {
    tabs: t,
    activeIndex: o,
    onChange: i
  } = n;
  let r;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (r = {
    type: "spring",
    stiffness: 800,
    damping: 50
  }, e[0] = r) : r = e[0];
  let s;
  e[1] !== o || e[2] !== i || e[3] !== t.length ? (s = {
    tabsLength: t.length,
    activeIndex: o,
    spring: r,
    onSnapToNew: i
  }, e[1] = o, e[2] = i, e[3] = t.length, e[4] = s) : s = e[4];
  const {
    overlayRef: c,
    animate: a,
    transition: l,
    handlers: u
  } = Z1(s);
  let f;
  e[5] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (f = {
    opacity: 0
  }, e[5] = f) : f = e[5];
  let d;
  e[6] !== a ? (d = {
    opacity: 1,
    ...a
  }, e[6] = a, e[7] = d) : d = e[7];
  let m;
  e[8] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (m = {
    duration: 0.2
  }, e[8] = m) : m = e[8];
  let h;
  e[9] !== l.clipPath ? (h = {
    default: m,
    clipPath: l.clipPath
  }, e[9] = l.clipPath, e[10] = h) : h = e[10];
  let A;
  if (e[11] !== o || e[12] !== i || e[13] !== t) {
    let v;
    e[15] !== o || e[16] !== i ? (v = (b, y) => /* @__PURE__ */ C(yi, {
      isActive: y === o,
      onClick: () => i(y),
      "data-overlay": !0,
      ...b
    }, y), e[15] = o, e[16] = i, e[17] = v) : v = e[17], A = t.map(v), e[11] = o, e[12] = i, e[13] = t, e[14] = A;
  } else
    A = e[14];
  let p;
  return e[18] !== u || e[19] !== c || e[20] !== d || e[21] !== h || e[22] !== A ? (p = /* @__PURE__ */ C(ie.div, {
    className: Q1,
    ref: c,
    ...u,
    initial: f,
    animate: d,
    transition: h,
    children: A
  }), e[18] = u, e[19] = c, e[20] = d, e[21] = h, e[22] = A, e[23] = p) : p = e[23], p;
}, Pu = (n) => {
  const e = I(43), {
    tabs: t,
    onChange: o,
    defaultIndex: i
  } = n, r = i === void 0 ? 0 : i, {
    isApple: s
  } = Ce(), [c, a] = $(r);
  let l, u;
  e[0] !== r ? (l = () => {
    a(r);
  }, u = [r], e[0] = r, e[1] = l, e[2] = u) : (l = e[1], u = e[2]), H(l, u);
  let f, d;
  e[3] !== t.length ? (f = () => {
    a((U) => Math.min(U, t.length - 1));
  }, d = [t.length], e[3] = t.length, e[4] = f, e[5] = d) : (f = e[4], d = e[5]), H(f, d);
  let m;
  e[6] !== c || e[7] !== o ? (m = (U) => {
    U !== c && (a(U), o?.(U));
  }, e[6] = c, e[7] = o, e[8] = m) : m = e[8];
  const h = m, A = X(null), [p, v] = $(0);
  let b;
  e[9] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (b = (U) => {
    v(U.contentRect.width);
  }, e[9] = b) : b = e[9], at(A, b);
  const S = t.length === 3 ? 54 : 21;
  let g;
  e[10] !== s || e[11] !== S ? (g = s ? {
    left: S,
    right: S,
    width: `calc(100% - ${S * 2}px)`
  } : {}, e[10] = s, e[11] = S, e[12] = g) : g = e[12];
  const T = g;
  let N;
  e[13] !== S ? (N = {
    top: 21,
    bottom: 21,
    left: S,
    right: S
  }, e[13] = S, e[14] = N) : N = e[14];
  const L = N;
  let w, x;
  e[15] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (w = {
    scale: 1.02
  }, x = {
    scale: {
      type: "spring",
      stiffness: 800,
      damping: 40
    }
  }, e[15] = w, e[16] = x) : (w = e[15], x = e[16]);
  let F;
  e[17] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (F = {
    display: "flex",
    width: "100%",
    position: "relative",
    zIndex: 1
  }, e[17] = F) : F = e[17];
  let W;
  if (e[18] !== c || e[19] !== h || e[20] !== t) {
    let U;
    e[22] !== c || e[23] !== h ? (U = (R, K) => /* @__PURE__ */ C(yi, {
      isActive: K === c,
      onClick: () => h(K),
      ...R
    }, K), e[22] = c, e[23] = h, e[24] = U) : U = e[24], W = t.map(U), e[18] = c, e[19] = h, e[20] = t, e[21] = W;
  } else
    W = e[21];
  let E;
  e[25] !== W ? (E = /* @__PURE__ */ C("div", {
    style: F,
    children: W
  }), e[25] = W, e[26] = E) : E = e[26];
  let k;
  e[27] !== c || e[28] !== h || e[29] !== t ? (k = /* @__PURE__ */ C(J1, {
    tabs: t,
    activeIndex: c,
    onChange: h
  }), e[27] = c, e[28] = h, e[29] = t, e[30] = k) : k = e[30];
  const B = s ? "visible" : "hidden";
  let q;
  e[31] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (q = /* @__PURE__ */ C(ke, {}), e[31] = q) : q = e[31];
  let P;
  e[32] !== L || e[33] !== p ? (P = /* @__PURE__ */ C(z1, {
    width: p,
    height: 64,
    insets: L
  }), e[32] = L, e[33] = p, e[34] = P) : P = e[34];
  let V;
  e[35] !== B || e[36] !== P ? (V = /* @__PURE__ */ j(no, {
    mode: B,
    children: [q, P]
  }), e[35] = B, e[36] = P, e[37] = V) : V = e[37];
  let Y;
  return e[38] !== T || e[39] !== E || e[40] !== k || e[41] !== V ? (Y = /* @__PURE__ */ j(ie.div, {
    ref: A,
    className: P1,
    whileTap: w,
    transition: x,
    style: T,
    layout: !0,
    children: [E, k, V]
  }), e[38] = T, e[39] = E, e[40] = k, e[41] = V, e[42] = Y) : Y = e[42], Y;
}, j1 = "_list_gxlsj_1", X1 = "_scrollable_gxlsj_15", _1 = "_compact_gxlsj_31", H1 = "_glassList_gxlsj_35", $1 = "_glassRoot_gxlsj_51", ed = "_tab_gxlsj_59", td = "_active_gxlsj_85", nd = "_indicator_gxlsj_105", od = "_label_gxlsj_119", Yu = (n) => {
  const e = I(55);
  let t, o, i, r, s, c, a;
  e[0] !== n ? ({
    tabs: c,
    activeTabIndex: r,
    onChange: o,
    scrollable: s,
    variant: a,
    className: t,
    ...i
  } = n, e[0] = n, e[1] = t, e[2] = o, e[3] = i, e[4] = r, e[5] = s, e[6] = c, e[7] = a) : (t = e[1], o = e[2], i = e[3], r = e[4], s = e[5], c = e[6], a = e[7]);
  const l = r === void 0 ? 0 : r, u = s === void 0 ? !1 : s, f = `tabs-indicator-${io()}`, d = Ve(), m = X(null);
  let h;
  e[8] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (h = [], e[8] = h) : h = e[8];
  const A = X(h), p = a === "compact", v = a === "glass";
  let b, y;
  e[9] !== l || e[10] !== d || e[11] !== u || e[12] !== c.length ? (b = () => {
    if (!u)
      return;
    const K = m.current;
    if (!K)
      return;
    const M = K.scrollWidth - K.clientWidth;
    if (M <= 0)
      return;
    const Q = (c.length > 1 ? l / (c.length - 1) : 0) * M;
    if (Math.abs(K.scrollLeft - Q) < 0.5)
      return;
    if (d) {
      K.scrollLeft = Q;
      return;
    }
    const G = Oe(K.scrollLeft, Q, {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (Z) => {
        K.scrollLeft = Z;
      }
    });
    return () => G.stop();
  }, y = [l, u, c.length, d], e[9] = l, e[10] = d, e[11] = u, e[12] = c.length, e[13] = b, e[14] = y) : (b = e[13], y = e[14]), H(b, y);
  let S;
  e[15] !== l || e[16] !== o ? (S = (K) => {
    K !== l && o?.(K);
  }, e[15] = l, e[16] = o, e[17] = S) : S = e[17];
  const g = S;
  let T;
  e[18] !== l || e[19] !== o || e[20] !== c.length ? (T = (K) => {
    const M = c.length;
    if (!M)
      return;
    let D = null;
    K.key === "ArrowRight" ? D = (l + 1) % M : K.key === "ArrowLeft" ? D = (l - 1 + M) % M : K.key === "Home" ? D = 0 : K.key === "End" && (D = M - 1), D != null && (K.preventDefault(), o?.(D), A.current[D]?.focus());
  }, e[18] = l, e[19] = o, e[20] = c.length, e[21] = T) : T = e[21];
  const N = T, L = u ? X1 : "", w = p ? _1 : "", x = v ? H1 : "";
  let F;
  e[22] !== x || e[23] !== L || e[24] !== w ? (F = [j1, L, w, x].filter(Boolean), e[22] = x, e[23] = L, e[24] = w, e[25] = F) : F = e[25];
  const W = F.join(" ");
  let E;
  e[26] !== d ? (E = d ? {
    duration: 0
  } : be.GENTLE, e[26] = d, e[27] = E) : E = e[27];
  const k = E;
  let B;
  e[28] !== v ? (B = v ? {
    apple: {
      variant: "subheadline1",
      weight: "semibold"
    },
    material: {
      variant: "subheadline1",
      weight: "medium"
    }
  } : {
    apple: {
      variant: "subheadline2",
      weight: "semibold"
    },
    material: {
      variant: "subheadline2",
      weight: "medium"
    }
  }, e[28] = v, e[29] = B) : B = e[29];
  const q = B;
  let P;
  e[30] !== l || e[31] !== g || e[32] !== f || e[33] !== c || e[34] !== q || e[35] !== k ? (P = c.map((K, M) => {
    const D = M === l;
    return /* @__PURE__ */ j("button", {
      type: "button",
      role: "tab",
      "aria-selected": D,
      tabIndex: D ? 0 : -1,
      ref: (Q) => {
        A.current[M] = Q;
      },
      className: `${ed} ${D ? td : ""}`,
      onClick: () => g(M),
      children: [D && /* @__PURE__ */ C(ie.span, {
        "aria-hidden": "true",
        layoutId: f,
        className: nd,
        transition: k
      }), /* @__PURE__ */ C(te, {
        ...q,
        className: od,
        children: K
      })]
    }, M);
  }), e[30] = l, e[31] = g, e[32] = f, e[33] = c, e[34] = q, e[35] = k, e[36] = P) : P = e[36];
  const V = P;
  if (v) {
    const K = `${$1} ${t || ""}`;
    let M;
    e[37] !== K ? (M = K.trim(), e[37] = K, e[38] = M) : M = e[38];
    let D;
    e[39] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (D = /* @__PURE__ */ C(co, {}), e[39] = D) : D = e[39];
    let Q;
    e[40] !== N || e[41] !== W || e[42] !== V ? (Q = /* @__PURE__ */ C("div", {
      ref: m,
      role: "tablist",
      className: W,
      onKeyDown: N,
      children: V
    }), e[40] = N, e[41] = W, e[42] = V, e[43] = Q) : Q = e[43];
    let G;
    return e[44] !== i || e[45] !== M || e[46] !== Q ? (G = /* @__PURE__ */ j("div", {
      className: M,
      ...i,
      children: [D, Q]
    }), e[44] = i, e[45] = M, e[46] = Q, e[47] = G) : G = e[47], G;
  }
  const Y = `${W} ${t || ""}`;
  let U;
  e[48] !== Y ? (U = Y.trim(), e[48] = Y, e[49] = U) : U = e[49];
  let R;
  return e[50] !== N || e[51] !== i || e[52] !== U || e[53] !== V ? (R = /* @__PURE__ */ C("div", {
    ref: m,
    role: "tablist",
    className: U,
    onKeyDown: N,
    ...i,
    children: V
  }), e[50] = N, e[51] = i, e[52] = U, e[53] = V, e[54] = R) : R = e[54], R;
}, Xt = "_badge_dqs9c_1", vi = "_filled_dqs9c_19", bi = "_tinted_dqs9c_24", Ci = "_gray_dqs9c_29", Si = "_media_dqs9c_34", Ni = "_outlined_dqs9c_39", id = {
  badge: Xt,
  filled: vi,
  tinted: bi,
  gray: Ci,
  media: Si,
  outlined: Ni
}, rd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  badge: Xt,
  default: id,
  filled: vi,
  gray: Ci,
  media: Si,
  outlined: Ni,
  tinted: bi
}, Symbol.toStringTag, { value: "Module" })), Qu = (n) => {
  const e = I(35);
  let t, o, i, r, s, c, a, l;
  e[0] !== n ? ({
    variant: r,
    textVariant: s,
    circled: c,
    squared: a,
    style: i,
    className: o,
    children: t,
    ...l
  } = n, e[0] = n, e[1] = t, e[2] = o, e[3] = i, e[4] = r, e[5] = s, e[6] = c, e[7] = a, e[8] = l) : (t = e[1], o = e[2], i = e[3], r = e[4], s = e[5], c = e[6], a = e[7], l = e[8]);
  const u = r === void 0 ? "filled" : r, f = s === void 0 ? "body" : s, d = c === void 0 ? !1 : c, m = a === void 0 ? !1 : a;
  let h;
  e[9] !== d ? (h = d && {
    "data-circled": !0
  }, e[9] = d, e[10] = h) : h = e[10];
  let A;
  e[11] !== m ? (A = m && {
    "data-squared": !0
  }, e[11] = m, e[12] = A) : A = e[12];
  let p;
  e[13] !== h || e[14] !== A ? (p = {
    ...h,
    ...A
  }, e[13] = h, e[14] = A, e[15] = p) : p = e[15];
  const v = p, b = i?.background || i?.backgroundColor || null;
  let y = i;
  if (u === "filled") {
    const T = b || "var(--tg-theme-button-color)";
    let N;
    e[16] !== i ? (N = i?.color && {
      "--badge-text-color": i.color
    }, e[16] = i, e[17] = N) : N = e[17];
    let L;
    e[18] !== i || e[19] !== T || e[20] !== N ? (L = {
      ...i,
      "--badge-background": T,
      ...N
    }, e[18] = i, e[19] = T, e[20] = N, e[21] = L) : L = e[21], y = L;
  } else if (u === "tinted") {
    const T = i.color || b || "var(--tg-theme-button-color)";
    let N;
    e[22] !== i.color ? (N = i?.color && {
      "--badge-text-color": i.color
    }, e[22] = i.color, e[23] = N) : N = e[23];
    let L;
    e[24] !== i || e[25] !== N || e[26] !== T ? (L = {
      ...i,
      "--badge-background": T,
      ...N
    }, e[24] = i, e[25] = N, e[26] = T, e[27] = L) : L = e[27], y = L;
  }
  const S = `${Xt} ${rd[u]} ${o || ""}`;
  let g;
  return e[28] !== y || e[29] !== t || e[30] !== v || e[31] !== S || e[32] !== l || e[33] !== f ? (g = /* @__PURE__ */ C(te, {
    variant: f,
    className: S,
    style: y,
    ...v,
    ...l,
    children: t
  }), e[28] = y, e[29] = t, e[30] = v, e[31] = S, e[32] = l, e[33] = f, e[34] = g) : g = e[34], g;
}, Gn = "_textarea_13knb_1", sd = /* @__PURE__ */ qe((n, e) => {
  const t = I(16);
  let o;
  t[0] !== n ? (o = n || {}, t[0] = n, t[1] = o) : o = t[1];
  let i, r, s;
  t[2] !== o ? ({
    value: s,
    className: i,
    ...r
  } = o, t[2] = o, t[3] = i, t[4] = r, t[5] = s) : (i = t[3], r = t[4], s = t[5]);
  const c = X(null);
  let a;
  t[6] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (a = () => {
    if (c.current) {
      c.current.style.height = "0px";
      const h = c.current.scrollHeight;
      c.current.style.height = h + "px";
    }
  }, t[6] = a) : a = t[6];
  let l;
  t[7] !== s ? (l = [s], t[7] = s, t[8] = l) : l = t[8], H(a, l);
  let u;
  t[9] !== e ? (u = (h) => {
    if (c.current = h, !!e)
      if (typeof e == "function")
        e(h);
      else
        try {
          e.current = h;
        } catch {
        }
  }, t[9] = e, t[10] = u) : u = t[10];
  const f = u, d = i ? Gn + " " + i : Gn;
  let m;
  return t[11] !== d || t[12] !== f || t[13] !== r || t[14] !== s ? (m = /* @__PURE__ */ C("textarea", {
    ...r,
    className: d,
    ref: f,
    value: s,
    rows: 1
  }), t[11] = d, t[12] = f, t[13] = r, t[14] = s, t[15] = m) : m = t[15], m;
}), ld = (n) => /* @__PURE__ */ ae.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ ae.createElement("g", { id: "24_icon-fill/magnify-old" }, /* @__PURE__ */ ae.createElement("path", { id: "Vector", d: "M10 3C13.866 3 17 6.13401 17 10C17 11.5723 16.4807 13.0228 15.6055 14.1914L19.707 18.293C20.0976 18.6835 20.0976 19.3165 19.707 19.707C19.3165 20.0976 18.6835 20.0976 18.293 19.707L14.1914 15.6055C13.0228 16.4807 11.5723 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3ZM10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15C12.7614 15 15 12.7614 15 10C15 7.23858 12.7614 5 10 5Z", fill: "#3D3C3A" }))), ad = "_root_1tmig_1", Vn = "_input_1tmig_5", Zn = "_icon_1tmig_25", cd = "_searchIcon_1tmig_32", dd = "_clearButtonIcon_1tmig_36", ud = "_empty_1tmig_46", fd = "_text_1tmig_53", pd = "_search_1tmig_32", md = {
  tertiaryFill: "var(--tertiary-fill-background)",
  section: "var(--tg-theme-section-bg-color)"
}, zn = /* @__PURE__ */ qe((n, e) => {
  const t = I(35);
  let o, i, r, s, c, a, l, u;
  t[0] !== n ? ({
    type: c,
    className: o,
    label: i,
    onClear: r,
    onChange: a,
    value: u,
    backgroundColor: l,
    ...s
  } = n, t[0] = n, t[1] = o, t[2] = i, t[3] = r, t[4] = s, t[5] = c, t[6] = a, t[7] = l, t[8] = u) : (o = t[1], i = t[2], r = t[3], s = t[4], c = t[5], a = t[6], l = t[7], u = t[8]);
  const f = c === void 0 ? "text" : c, d = a === void 0 ? hd : a, m = l === void 0 ? "tertiaryFill" : l;
  let h;
  t[9] !== d ? (h = (F) => {
    d(F.target.value);
  }, t[9] = d, t[10] = h) : h = t[10];
  const A = h, p = (f === "text" || f === "password") && fd, v = f === "search" && pd, b = !u && ud;
  let y;
  t[11] !== o || t[12] !== p || t[13] !== v || t[14] !== b ? (y = [ad, o, p, v, b].filter(Boolean), t[11] = o, t[12] = p, t[13] = v, t[14] = b, t[15] = y) : y = t[15];
  const S = y.join(" "), g = md[m];
  let T;
  t[16] !== g ? (T = {
    "--input-bg-color": g
  }, t[16] = g, t[17] = T) : T = t[17];
  let N;
  t[18] !== A || t[19] !== i || t[20] !== e || t[21] !== s || t[22] !== f || t[23] !== u ? (N = s.multiline ? /* @__PURE__ */ C(sd, {
    ...s,
    "aria-label": i,
    onChange: A,
    className: Vn,
    value: u,
    placeholder: i,
    ref: e
  }) : /* @__PURE__ */ C("input", {
    ...s,
    "aria-label": i,
    onChange: A,
    type: f === "password" ? "password" : f === "search" ? "search" : "text",
    className: Vn,
    placeholder: i,
    value: u,
    ref: e
  }), t[18] = A, t[19] = i, t[20] = e, t[21] = s, t[22] = f, t[23] = u, t[24] = N) : N = t[24];
  let L;
  t[25] !== f ? (L = f === "search" && /* @__PURE__ */ C(ld, {
    className: [Zn, cd].filter(Boolean).join(" ")
  }), t[25] = f, t[26] = L) : L = t[26];
  let w;
  t[27] !== r ? (w = r && /* @__PURE__ */ C("button", {
    type: "button",
    className: [Zn, dd].filter(Boolean).join(" "),
    onClick: r,
    children: /* @__PURE__ */ C(Xo, {})
  }), t[27] = r, t[28] = w) : w = t[28];
  let x;
  return t[29] !== T || t[30] !== N || t[31] !== L || t[32] !== w || t[33] !== S ? (x = /* @__PURE__ */ j(te, {
    variant: "body",
    weight: "regular",
    className: S,
    style: T,
    children: [N, L, w]
  }), t[29] = T, t[30] = N, t[31] = L, t[32] = w, t[33] = S, t[34] = x) : x = t[34], x;
});
function hd() {
}
const Ou = /* @__PURE__ */ qe((n, e) => {
  const t = I(6), {
    isApple: o
  } = Ce();
  if (o) {
    let r;
    return t[0] !== n || t[1] !== e ? (r = /* @__PURE__ */ C(zn, {
      ...n,
      ref: e
    }), t[0] = n, t[1] = e, t[2] = r) : r = t[2], r;
  }
  let i;
  return t[3] !== n || t[4] !== e ? (i = /* @__PURE__ */ C(zn, {
    ...n,
    ref: e
  }), t[3] = n, t[4] = e, t[5] = i) : i = t[5], i;
}), Ad = "_container_1e3rp_1", gd = "_trigger_1e3rp_6", Jn = "_shell_1e3rp_20", yd = "_body_1e3rp_28", vd = "_compact_1e3rp_36", bd = "_withBadge_1e3rp_40", Cd = "_badge_1e3rp_44", jn = (n) => {
  const e = I(14), {
    content: t,
    badge: o,
    compact: i
  } = n, r = i ? vd : "", s = o && !i ? bd : "";
  let c;
  e[0] !== r || e[1] !== s ? (c = [yd, r, s].filter(Boolean), e[0] = r, e[1] = s, e[2] = c) : c = e[2];
  const a = c.join(" ");
  let l;
  e[3] !== o || e[4] !== i ? (l = o && !i && /* @__PURE__ */ C("span", {
    className: Cd,
    children: /* @__PURE__ */ C(te, {
      variant: "caption2",
      rounded: !0,
      caps: !0,
      weight: "semibold",
      children: o
    })
  }), e[3] = o, e[4] = i, e[5] = l) : l = e[5];
  const u = i ? "caption2" : "subheadline2", f = i ? "medium" : "regular";
  let d;
  e[6] !== t || e[7] !== u || e[8] !== f ? (d = /* @__PURE__ */ C(te, {
    variant: u,
    weight: f,
    children: t
  }), e[6] = t, e[7] = u, e[8] = f, e[9] = d) : d = e[9];
  let m;
  return e[10] !== a || e[11] !== l || e[12] !== d ? (m = /* @__PURE__ */ j("div", {
    className: a,
    children: [l, d]
  }), e[10] = a, e[11] = l, e[12] = d, e[13] = m) : m = e[13], m;
}, Me = 8, he = 8, Sd = (n, e) => n.top === e.top && n.left === e.left && n.width === e.width && n.height === e.height && n.placement === e.placement && n.shape === e.shape && n.tailOffsetX === e.tailOffsetX && n.tailOffsetY === e.tailOffsetY && n.tailProtrusion === e.tailProtrusion && n.originX === e.originX && n.originY === e.originY, Nd = (n, e) => n.reduce((t, o) => t === null || e[o] > e[t] ? o : t, null), Td = (n, e, t) => {
  if (["top", "bottom", "left", "right"].includes(t))
    return t;
  const o = e.left !== e.right, i = Math.max(n.top, n.bottom), r = Math.min(n.top, n.bottom), s = i > 0 && (i - r) / i < 0.4;
  return o && s ? e.left ? "left" : "right" : e.bottom && e.top ? n.bottom >= n.top ? "bottom" : "top" : e.bottom ? "bottom" : e.top ? "top" : e.right && e.left ? n.right >= n.left ? "right" : "left" : e.right ? "right" : e.left ? "left" : Nd(["bottom", "top", "right", "left"], n);
}, Ld = (n, e, t, o, i, r) => {
  const {
    innerHeight: s,
    innerWidth: c
  } = window, a = {
    top: n.top,
    bottom: s - n.bottom,
    left: n.left,
    right: c - n.right
  }, l = e.height + i + Me + he, u = e.width + i + Me + he, f = {
    top: a.top >= l,
    bottom: a.bottom >= l,
    left: a.left >= u,
    right: a.right >= u
  }, d = Td(a, f, r), m = d === "left" || d === "right", h = m ? o : t, A = Math.round(i * 0.8);
  if (m) {
    const x = e.height, F = n.top + n.height / 2, W = Math.max(he, s - x - he);
    let E = pe(F - x / 2, he, W), k = F - E, B = "full";
    k < h / 2 ? (B = "half-start", E = pe(F, he, W), k = 0) : k > x - h / 2 && (B = "half-end", E = pe(F - x, he, W), k = x);
    const q = B === "full" ? i : A, P = e.width + q, V = d === "left" ? n.left - Me - P : n.right + Me, Y = B === "full" ? k - h / 2 : 0;
    return {
      top: Math.round(E),
      left: Math.round(V),
      width: Math.round(P),
      height: Math.round(x),
      placement: d,
      shape: B,
      tailOffsetX: 0,
      tailOffsetY: Math.round(Y),
      tailProtrusion: q,
      originX: d === "left" ? "100%" : "0%",
      originY: `${pe(k / x * 100, 0, 100)}%`
    };
  }
  const p = e.width, v = n.left + n.width / 2, b = Math.max(he, c - p - he);
  let y = pe(v - p / 2, he, b), S = v - y, g = "full";
  S < h / 2 ? (g = "half-start", y = pe(v, he, b), S = 0) : S > p - h / 2 && (g = "half-end", y = pe(v - p, he, b), S = p);
  const T = g === "full" ? i : A, N = e.height + T, L = d === "top" ? n.top - Me - N : n.bottom + Me, w = g === "full" ? S - h / 2 : 0;
  return {
    top: Math.round(L),
    left: Math.round(y),
    width: Math.round(p),
    height: Math.round(N),
    placement: d,
    shape: g,
    tailOffsetX: Math.round(w),
    tailOffsetY: 0,
    tailProtrusion: T,
    originX: `${pe(S / p * 100, 0, 100)}%`,
    originY: d === "top" ? "100%" : "0%"
  };
}, Ud = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  placement: "bottom",
  shape: "full",
  tailOffsetX: 0,
  tailOffsetY: 0,
  tailProtrusion: 0,
  originX: "50%",
  originY: "0%"
}, wd = (n, e, t, o, i, r, s) => {
  const c = I(10);
  let a;
  c[0] !== s || c[1] !== i || c[2] !== r || c[3] !== o ? (a = (f, d) => Ld(f, d, o, i, r, s), c[0] = s, c[1] = i, c[2] = r, c[3] = o, c[4] = a) : a = c[4];
  const l = a;
  let u;
  return c[5] !== l || c[6] !== n || c[7] !== t || c[8] !== e ? (u = {
    isOpen: n,
    triggerRef: e,
    contentRef: t,
    initialPosition: Ud,
    calculate: l,
    equals: Sd
  }, c[5] = l, c[6] = n, c[7] = t, c[8] = e, c[9] = u) : u = c[9], _o(u);
}, xd = 80, Ed = 120, Rd = (n) => {
  const e = I(15), {
    onOpen: t,
    onClose: o
  } = n, i = X(null), r = X(null);
  let s;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (s = () => {
    i.current && (clearTimeout(i.current), i.current = null);
  }, e[0] = s) : s = e[0];
  const c = s;
  let a;
  e[1] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (a = () => {
    r.current && (clearTimeout(r.current), r.current = null);
  }, e[1] = a) : a = e[1];
  const l = a;
  let u, f;
  e[2] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (u = () => () => {
    c(), l();
  }, f = [c, l], e[2] = u, e[3] = f) : (u = e[2], f = e[3]), H(u, f);
  let d;
  e[4] !== t ? (d = () => {
    l(), !i.current && (i.current = setTimeout(() => {
      i.current = null, t();
    }, xd));
  }, e[4] = t, e[5] = d) : d = e[5];
  const m = d;
  let h;
  e[6] !== o ? (h = () => {
    c(), !r.current && (r.current = setTimeout(() => {
      r.current = null, o();
    }, Ed));
  }, e[6] = o, e[7] = h) : h = e[7];
  const A = h;
  let p;
  e[8] !== m ? (p = (g) => {
    g.pointerType !== "touch" && m();
  }, e[8] = m, e[9] = p) : p = e[9];
  const v = p;
  let b;
  e[10] !== A ? (b = (g) => {
    g.pointerType !== "touch" && A();
  }, e[10] = A, e[11] = b) : b = e[11];
  const y = b;
  let S;
  return e[12] !== v || e[13] !== y ? (S = {
    onPointerEnter: v,
    onPointerLeave: y,
    clearOpenTimer: c,
    clearCloseTimer: l
  }, e[12] = v, e[13] = y, e[14] = S) : S = e[14], S;
}, Xn = 32, _n = 24, Wd = 9, Fd = 7, Kd = rt["tooltip-surface"], Dd = (n, e, t, o, i, r, s) => {
  const c = Kd, a = [c, c, c, c];
  if (n !== "full") {
    const l = {
      "bottom:half-start": 0,
      "bottom:half-end": 1,
      "top:half-start": 2,
      "top:half-end": 3,
      "right:half-start": 0,
      "right:half-end": 2,
      "left:half-start": 1,
      "left:half-end": 3
    }[`${e}:${n}`];
    return a[l] = 0, a;
  }
  return e === "bottom" ? (a[0] = Math.min(c, i), a[1] = Math.min(c, t - (i + s))) : e === "top" ? (a[2] = Math.min(c, i), a[3] = Math.min(c, t - (i + s))) : e === "right" ? (a[0] = Math.min(c, r), a[2] = Math.min(c, o - (r + s))) : (a[1] = Math.min(c, r), a[3] = Math.min(c, o - (r + s))), a;
}, Bd = ({
  width: n,
  height: e,
  tailOffsetX: t,
  tailOffsetY: o,
  tailBreadth: i,
  tailProtrusion: r,
  placement: s,
  shape: c
}) => {
  const [a, l, u, f] = Dd(c, s, n, e, t, o, i), d = c === "full" ? i : Math.round(i * 0.85), m = Math.min(2, Math.max(1, Math.floor(d / 10))), h = (p) => [p, p + i / 4, p + i * 3 / 8, p + i / 2, p + i * 5 / 8, p + i * 3 / 4, p + i];
  if (s === "bottom") {
    const p = r;
    if (c === "full") {
      const [v, b, y, S, g, T, N] = h(t);
      return `path("M ${a} ${p} L ${v} ${p} C ${b} ${p} ${y} 0 ${S} 0 C ${g} 0 ${T} ${p} ${N} ${p} L ${n - l} ${p} Q ${n} ${p} ${n} ${p + l} L ${n} ${e - f} Q ${n} ${e} ${n - f} ${e} L ${u} ${e} Q 0 ${e} 0 ${e - u} L 0 ${p + a} Q 0 ${p} ${a} ${p} Z")`;
    }
    return c === "half-end" ? `path("M ${a} ${p} L ${n - d / 2} ${p} C ${n - d / 4} ${p} ${n - d / 8 - m} 0 ${n - m} 0 Q ${n} 0 ${n} ${m} L ${n} ${e - f} Q ${n} ${e} ${n - f} ${e} L ${u} ${e} Q 0 ${e} 0 ${e - u} L 0 ${p + a} Q 0 ${p} ${a} ${p} Z")` : `path("M ${m} 0 C ${d / 8 + m} 0 ${d / 4} ${p} ${d / 2} ${p} L ${n - l} ${p} Q ${n} ${p} ${n} ${p + l} L ${n} ${e - f} Q ${n} ${e} ${n - f} ${e} L ${u} ${e} Q 0 ${e} 0 ${e - u} L 0 ${m} Q 0 0 ${m} 0 Z")`;
  }
  if (s === "top") {
    const p = e - r;
    if (c === "full") {
      const [v, b, y, S, g, T, N] = h(t);
      return `path("M ${a} 0 L ${n - l} 0 Q ${n} 0 ${n} ${l} L ${n} ${p - f} Q ${n} ${p} ${n - f} ${p} L ${N} ${p} C ${T} ${p} ${g} ${e} ${S} ${e} C ${y} ${e} ${b} ${p} ${v} ${p} L ${u} ${p} Q 0 ${p} 0 ${p - u} L 0 ${a} Q 0 0 ${a} 0 Z")`;
    }
    return c === "half-end" ? `path("M ${a} 0 L ${n - l} 0 Q ${n} 0 ${n} ${l} L ${n} ${e - m} Q ${n} ${e} ${n - m} ${e} C ${n - d / 8 - m} ${e} ${n - d / 4} ${p} ${n - d / 2} ${p} L ${u} ${p} Q 0 ${p} 0 ${p - u} L 0 ${a} Q 0 0 ${a} 0 Z")` : `path("M ${a} 0 L ${n - l} 0 Q ${n} 0 ${n} ${l} L ${n} ${p - f} Q ${n} ${p} ${n - f} ${p} L ${d / 2} ${p} C ${d / 4} ${p} ${d / 8 + m} ${e} ${m} ${e} Q 0 ${e} 0 ${e - m} L 0 ${a} Q 0 0 ${a} 0 Z")`;
  }
  if (s === "right") {
    const p = r;
    if (c === "full") {
      const [v, b, y, S, g, T, N] = h(o);
      return `path("M ${p + a} 0 L ${n - l} 0 Q ${n} 0 ${n} ${l} L ${n} ${e - f} Q ${n} ${e} ${n - f} ${e} L ${p + u} ${e} Q ${p} ${e} ${p} ${e - u} L ${p} ${N} C ${p} ${T} 0 ${g} 0 ${S} C 0 ${y} ${p} ${b} ${p} ${v} L ${p} ${a} Q ${p} 0 ${p + a} 0 Z")`;
    }
    return c === "half-end" ? `path("M ${p + a} 0 L ${n - l} 0 Q ${n} 0 ${n} ${l} L ${n} ${e - f} Q ${n} ${e} ${n - f} ${e} L ${m} ${e} Q 0 ${e} 0 ${e - m} C 0 ${e - m - d / 8} ${p} ${e - d / 4} ${p} ${e - d / 2} L ${p} ${a} Q ${p} 0 ${p + a} 0 Z")` : `path("M ${m} 0 L ${n - l} 0 Q ${n} 0 ${n} ${l} L ${n} ${e - f} Q ${n} ${e} ${n - f} ${e} L ${p + u} ${e} Q ${p} ${e} ${p} ${e - u} L ${p} ${d / 2} C ${p} ${d / 4} 0 ${d / 8 + m} 0 ${m} Q 0 0 ${m} 0 Z")`;
  }
  const A = n - r;
  if (c === "full") {
    const [p, v, b, y, S, g, T] = h(o);
    return `path("M ${a} 0 L ${A - l} 0 Q ${A} 0 ${A} ${l} L ${A} ${p} C ${A} ${v} ${n} ${b} ${n} ${y} C ${n} ${S} ${A} ${g} ${A} ${T} L ${A} ${e - f} Q ${A} ${e} ${A - f} ${e} L ${u} ${e} Q 0 ${e} 0 ${e - u} L 0 ${a} Q 0 0 ${a} 0 Z")`;
  }
  return c === "half-end" ? `path("M ${a} 0 L ${A - l} 0 Q ${A} 0 ${A} ${l} L ${A} ${e - d / 2} C ${A} ${e - d / 4} ${n} ${e - d / 8 - m} ${n} ${e - m} Q ${n} ${e} ${n - m} ${e} L ${u} ${e} Q 0 ${e} 0 ${e - u} L 0 ${a} Q 0 0 ${a} 0 Z")` : `path("M ${a} 0 L ${n - m} 0 Q ${n} 0 ${n} ${m} C ${n} ${m + d / 8} ${A} ${d / 4} ${A} ${d / 2} L ${A} ${e - f} Q ${A} ${e} ${A - f} ${e} L ${u} ${e} Q 0 ${e} 0 ${e - u} L 0 ${a} Q 0 0 ${a} 0 Z")`;
}, Gu = (n) => {
  const e = I(61), {
    content: t,
    badge: o,
    type: i,
    placement: r,
    children: s
  } = n, c = i === void 0 ? "regular" : i, a = r === void 0 ? "auto" : r, [l, u] = $(!1), f = X(null), d = X(null), m = X(null), h = c === "compact", A = h ? Fd : Wd, {
    position: p,
    isPositioned: v,
    resetPosition: b
  } = wd(l, f, d, Xn, _n, A, a);
  let y;
  e[0] !== b ? (y = () => {
    u(!0), b();
  }, e[0] = b, e[1] = y) : y = e[1];
  const S = y;
  let g;
  e[2] !== b ? (g = () => {
    u(!1), b();
  }, e[2] = b, e[3] = g) : g = e[3];
  const T = g;
  let N;
  e[4] !== T || e[5] !== S ? (N = {
    onOpen: S,
    onClose: T
  }, e[4] = T, e[5] = S, e[6] = N) : N = e[6];
  const {
    onPointerEnter: L,
    onPointerLeave: w,
    clearOpenTimer: x,
    clearCloseTimer: F
  } = Rd(N);
  let W;
  e[7] !== F || e[8] !== x || e[9] !== b ? (W = () => {
    x(), F(), u(Id), b();
  }, e[7] = F, e[8] = x, e[9] = b, e[10] = W) : W = e[10];
  const E = W;
  Ho(l, T, f, d, m);
  let k, B;
  e[11] !== T || e[12] !== l ? (k = () => {
    if (!l)
      return;
    const J = (_) => {
      _.key === "Escape" && (_.preventDefault(), T(), f.current?.focus());
    };
    return document.addEventListener("keydown", J), () => document.removeEventListener("keydown", J);
  }, B = [l, T], e[11] = T, e[12] = l, e[13] = k, e[14] = B) : (k = e[13], B = e[14]), H(k, B);
  let q;
  e[15] !== E ? (q = (J) => {
    (J.key === "Enter" || J.key === " ") && (J.preventDefault(), E());
  }, e[15] = E, e[16] = q) : q = e[16];
  const P = q, Y = p.placement === "left" || p.placement === "right" ? _n : Xn;
  let U;
  e[17] !== v || e[18] !== p.height || e[19] !== p.left || e[20] !== p.originX || e[21] !== p.originY || e[22] !== p.placement || e[23] !== p.shape || e[24] !== p.tailOffsetX || e[25] !== p.tailOffsetY || e[26] !== p.tailProtrusion || e[27] !== p.top || e[28] !== p.width || e[29] !== Y ? (U = v ? {
    position: "fixed",
    top: p.top,
    left: p.left,
    transformOrigin: `${p.originX} ${p.originY}`,
    zIndex: 1e3,
    paddingTop: p.placement === "bottom" ? p.tailProtrusion : 0,
    paddingBottom: p.placement === "top" ? p.tailProtrusion : 0,
    paddingLeft: p.placement === "right" ? p.tailProtrusion : 0,
    paddingRight: p.placement === "left" ? p.tailProtrusion : 0,
    clipPath: Bd({
      width: p.width,
      height: p.height,
      tailOffsetX: p.tailOffsetX,
      tailOffsetY: p.tailOffsetY,
      tailBreadth: Y,
      tailProtrusion: p.tailProtrusion,
      placement: p.placement,
      shape: p.shape
    })
  } : null, e[17] = v, e[18] = p.height, e[19] = p.left, e[20] = p.originX, e[21] = p.originY, e[22] = p.placement, e[23] = p.shape, e[24] = p.tailOffsetX, e[25] = p.tailOffsetY, e[26] = p.tailProtrusion, e[27] = p.top, e[28] = p.width, e[29] = Y, e[30] = U) : U = e[30];
  const R = U;
  let K;
  e[31] !== s || e[32] !== P || e[33] !== l || e[34] !== L || e[35] !== w || e[36] !== E ? (K = /* @__PURE__ */ C("span", {
    className: gd,
    onClick: E,
    onKeyDown: P,
    onPointerEnter: L,
    onPointerLeave: w,
    ref: f,
    role: "button",
    tabIndex: 0,
    "aria-expanded": l,
    "aria-haspopup": "dialog",
    children: s
  }), e[31] = s, e[32] = P, e[33] = l, e[34] = L, e[35] = w, e[36] = E, e[37] = K) : K = e[37];
  let M;
  e[38] !== o || e[39] !== h || e[40] !== t || e[41] !== l || e[42] !== v ? (M = l && !v && /* @__PURE__ */ C("div", {
    ref: d,
    className: Jn,
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      visibility: "hidden",
      zIndex: 1e3
    },
    children: /* @__PURE__ */ C(jn, {
      content: t,
      badge: o,
      compact: h
    })
  }), e[38] = o, e[39] = h, e[40] = t, e[41] = l, e[42] = v, e[43] = M) : M = e[43];
  let D;
  e[44] !== o || e[45] !== h || e[46] !== t || e[47] !== l || e[48] !== v || e[49] !== L || e[50] !== w || e[51] !== R ? (D = l && v && /* @__PURE__ */ C(ie.div, {
    ref: m,
    role: "tooltip",
    className: Jn,
    initial: "hidden",
    animate: "visible",
    exit: "exit",
    variants: Oo,
    onPointerEnter: L,
    onPointerLeave: w,
    style: R,
    children: /* @__PURE__ */ C(jn, {
      content: t,
      badge: o,
      compact: h
    })
  }), e[44] = o, e[45] = h, e[46] = t, e[47] = l, e[48] = v, e[49] = L, e[50] = w, e[51] = R, e[52] = D) : D = e[52];
  let Q;
  e[53] !== D ? (Q = /* @__PURE__ */ C(Ee, {
    children: D
  }), e[53] = D, e[54] = Q) : Q = e[54];
  let G;
  e[55] !== M || e[56] !== Q ? (G = /* @__PURE__ */ it(/* @__PURE__ */ j(ge, {
    children: [M, Q]
  }), document.body), e[55] = M, e[56] = Q, e[57] = G) : G = e[57];
  let Z;
  return e[58] !== K || e[59] !== G ? (Z = /* @__PURE__ */ j("span", {
    className: Ad,
    children: [K, G]
  }), e[58] = K, e[59] = G, e[60] = Z) : Z = e[60], Z;
};
function Id(n) {
  return !n;
}
const Md = {
  space: "gap-8",
  dot: "gap-0 [&>*:not(:first-child)::before]:mx-[3px] [&>*:not(:first-child)::before]:inline-block [&>*:not(:first-child)::before]:content-['·']"
};
function Vu(n) {
  const e = I(12);
  let t, o, i, r;
  e[0] !== n ? ({
    divider: r,
    children: t,
    className: o,
    ...i
  } = n, e[0] = n, e[1] = t, e[2] = o, e[3] = i, e[4] = r) : (t = e[1], o = e[2], i = e[3], r = e[4]);
  const c = Md[r === void 0 ? "space" : r];
  let a;
  e[5] !== o || e[6] !== c ? (a = st("flex items-center", c, o), e[5] = o, e[6] = c, e[7] = a) : a = e[7];
  let l;
  return e[8] !== t || e[9] !== i || e[10] !== a ? (l = /* @__PURE__ */ C("div", {
    className: a,
    ...i,
    children: t
  }), e[8] = t, e[9] = i, e[10] = a, e[11] = l) : l = e[11], l;
}
const Hn = "_root_tgfxm_8", kd = "_header_tgfxm_22", $n = "_button_tgfxm_30", qd = "_wheelContainer_tgfxm_55", Pd = "_centerIndicator_tgfxm_81", Yd = "_currentValue_tgfxm_112", Qd = "_ticksContainer_tgfxm_123", Od = "_tick_tgfxm_123", Gd = "_tickNumber_tgfxm_154", Vd = "_tickMark_tgfxm_164", Zd = 32, zd = 8, Ue = Zd + zd, Jd = 0.6, Ge = 1;
function eo(n, e) {
  const t = Math.round(-n / Ue);
  return t < 0 ? Ge : t + 1 > e ? e : t + 1;
}
function to(n, e) {
  return Math.min(e, Math.max(Ge, n));
}
const jd = (n) => {
  const e = I(41), {
    value: t,
    defaultValue: o,
    onChange: i,
    max: r,
    disabled: s,
    enableHaptic: c
  } = n, a = o === void 0 ? 1 : o, l = r === void 0 ? 40 : r, u = s === void 0 ? !1 : s, f = c === void 0 ? !0 : c, d = t !== void 0, [m, h] = $(a), A = d ? t : m, [p, v] = $(A), b = X(A), y = X(A), S = Et(-(A - 1) * Ue), g = p !== A;
  g && v(A);
  let T, N;
  e[0] !== A ? (T = () => {
    b.current = A;
  }, N = [A], e[0] = A, e[1] = T, e[2] = N) : (T = e[1], N = e[2]), H(T, N);
  let L;
  e[3] !== f || e[4] !== d || e[5] !== l || e[6] !== i ? (L = (D) => {
    const Q = to(D, l);
    f && Q !== b.current && ce.HapticFeedback.selectionChanged(), y.current = Q, d || h(Q), i?.(Q);
  }, e[3] = f, e[4] = d, e[5] = l, e[6] = i, e[7] = L) : L = e[7];
  const w = L;
  let x;
  e[8] !== u || e[9] !== w || e[10] !== S ? (x = (D, Q) => {
    const G = Q === void 0 ? be.GENTLE : Q;
    u || (Oe(S, -(D - 1) * Ue, G), w(D));
  }, e[8] = u, e[9] = w, e[10] = S, e[11] = x) : x = e[11];
  const F = x;
  let W;
  e[12] !== u || e[13] !== l || e[14] !== w || e[15] !== S ? (W = () => {
    if (u)
      return;
    const D = eo(S.get(), l);
    D !== b.current && w(D);
  }, e[12] = u, e[13] = l, e[14] = w, e[15] = S, e[16] = W) : W = e[16];
  const E = W;
  let k;
  e[17] !== u || e[18] !== l || e[19] !== w || e[20] !== S ? (k = (D, Q) => {
    if (u)
      return;
    const G = S.get(), Z = Q.velocity.x, J = G + Z * Jd, _ = eo(J, l), z = -(_ - 1) * Ue;
    Oe(S, z, {
      ...be.SNAP,
      velocity: Z
    }), w(_);
  }, e[17] = u, e[18] = l, e[19] = w, e[20] = S, e[21] = k) : k = e[21];
  const B = k;
  let q, P;
  e[22] !== d || e[23] !== l || e[24] !== t || e[25] !== S ? (q = () => {
    !d || t === void 0 || t !== y.current && (y.current = t, Oe(S, -(to(t, l) - 1) * Ue, be.GENTLE));
  }, P = [t, d, l, S], e[22] = d, e[23] = l, e[24] = t, e[25] = S, e[26] = q, e[27] = P) : (q = e[26], P = e[27]), H(q, P);
  const V = -(l - 1) * Ue;
  let Y;
  e[28] !== V ? (Y = {
    left: V,
    right: 0
  }, e[28] = V, e[29] = Y) : Y = e[29];
  const U = Y;
  let R;
  e[30] !== l ? (R = Array.from({
    length: l - Ge + 1
  }, Xd), e[30] = l, e[31] = R) : R = e[31];
  const K = R;
  let M;
  return e[32] !== F || e[33] !== A || e[34] !== U || e[35] !== E || e[36] !== B || e[37] !== g || e[38] !== K || e[39] !== S ? (M = {
    currentValue: A,
    shouldAnimate: g,
    x: S,
    handleDrag: E,
    handleDragEnd: B,
    animateToValue: F,
    dragConstraints: U,
    ticks: K,
    min: Ge
  }, e[32] = F, e[33] = A, e[34] = U, e[35] = E, e[36] = B, e[37] = g, e[38] = K, e[39] = S, e[40] = M) : M = e[40], M;
};
function Xd(n, e) {
  return Ge + e;
}
const _d = (n) => {
  const e = I(16), {
    value: t,
    label: o,
    index: i,
    x: r,
    radius: s,
    onSelect: c
  } = n;
  let a;
  e[0] !== i || e[1] !== s ? (a = (v) => di(i * Ue + v, s, "horizontal"), e[0] = i, e[1] = s, e[2] = a) : a = e[2];
  const l = Tt(r, a), u = Tt(l, Hd);
  let f;
  e[3] !== l || e[4] !== u ? (f = {
    transform: l,
    visibility: u
  }, e[3] = l, e[4] = u, e[5] = f) : f = e[5];
  let d;
  e[6] !== c || e[7] !== t ? (d = () => c(t), e[6] = c, e[7] = t, e[8] = d) : d = e[8];
  const m = o ?? t;
  let h;
  e[9] !== m ? (h = /* @__PURE__ */ C("span", {
    className: Gd,
    children: m
  }), e[9] = m, e[10] = h) : h = e[10];
  let A;
  e[11] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (A = /* @__PURE__ */ C("span", {
    className: Vd
  }), e[11] = A) : A = e[11];
  let p;
  return e[12] !== f || e[13] !== d || e[14] !== h ? (p = /* @__PURE__ */ j(ie.div, {
    className: Od,
    style: f,
    onClick: d,
    children: [h, A]
  }), e[12] = f, e[13] = d, e[14] = h, e[15] = p) : p = e[15], p;
};
function Hd(n) {
  return n ? "visible" : "hidden";
}
const $d = /* @__PURE__ */ C("div", {
  className: Pd
}), eu = 5, Zu = (n) => {
  const e = I(75), {
    value: t,
    defaultValue: o,
    onChange: i,
    max: r,
    prefix: s,
    suffix: c,
    disabled: a,
    enableHaptic: l,
    className: u,
    formatTick: f,
    showValue: d,
    showLimits: m,
    indicator: h,
    ariaLabel: A,
    dragAreaRef: p
  } = n, v = o === void 0 ? 1 : o, b = r === void 0 ? 40 : r, y = s === void 0 ? "" : s, S = c === void 0 ? "×" : c, g = a === void 0 ? !1 : a, T = l === void 0 ? !0 : l, N = d === void 0 ? !0 : d, L = m === void 0 ? !0 : m, w = h === void 0 ? "track" : h, x = A === void 0 ? "Value selector" : A, F = X(null), W = X(!1), [E, k] = $(250), B = ao();
  let q;
  e[0] !== v || e[1] !== g || e[2] !== T || e[3] !== b || e[4] !== i || e[5] !== t ? (q = {
    value: t,
    defaultValue: v,
    onChange: i,
    max: b,
    disabled: g,
    enableHaptic: T
  }, e[0] = v, e[1] = g, e[2] = T, e[3] = b, e[4] = i, e[5] = t, e[6] = q) : q = e[6];
  const {
    currentValue: P,
    x: V,
    handleDrag: Y,
    handleDragEnd: U,
    animateToValue: R,
    dragConstraints: K,
    ticks: M,
    min: D
  } = jd(q);
  let Q, G;
  e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (Q = () => {
    const de = F.current;
    if (!de)
      return;
    const me = () => {
      de.clientWidth > 0 && k(de.clientWidth / 2);
    };
    me();
    const ve = new ResizeObserver(me);
    return ve.observe(de), () => ve.disconnect();
  }, G = [], e[7] = Q, e[8] = G) : (Q = e[7], G = e[8]), Te(Q, G);
  let Z, J;
  e[9] !== g || e[10] !== p || e[11] !== B ? (Z = () => {
    const de = p?.current;
    if (!de || g)
      return;
    const me = (ve) => B.start(ve);
    return de.addEventListener("pointerdown", me), () => de.removeEventListener("pointerdown", me);
  }, J = [p, B, g], e[9] = g, e[10] = p, e[11] = B, e[12] = Z, e[13] = J) : (Z = e[12], J = e[13]), H(Z, J);
  let _;
  e[14] !== R || e[15] !== g ? (_ = (de) => {
    g || W.current || R(de);
  }, e[14] = R, e[15] = g, e[16] = _) : _ = e[16];
  const z = _;
  let ee;
  e[17] !== R || e[18] !== P || e[19] !== g || e[20] !== b || e[21] !== D ? (ee = (de) => {
    if (g)
      return;
    const ve = {
      ArrowLeft: () => R(Math.max(D, P - 1)),
      ArrowDown: () => R(Math.max(D, P - 1)),
      ArrowRight: () => R(Math.min(b, P + 1)),
      ArrowUp: () => R(Math.min(b, P + 1)),
      Home: () => R(D),
      End: () => R(b)
    }[de.key];
    ve && (de.preventDefault(), ve());
  }, e[17] = R, e[18] = P, e[19] = g, e[20] = b, e[21] = D, e[22] = ee) : ee = e[22];
  const O = ee, se = u ? `${Hn} ${u}` : Hn, le = g || void 0;
  let fe;
  e[23] !== R || e[24] !== g || e[25] !== b || e[26] !== D || e[27] !== L ? (fe = L ? /* @__PURE__ */ j("div", {
    className: kd,
    children: [/* @__PURE__ */ C(ie.button, {
      className: $n,
      onClick: () => R(D),
      disabled: g,
      whileTap: g ? void 0 : {
        scale: 0.95
      },
      children: "Min"
    }), /* @__PURE__ */ C(ie.button, {
      className: $n,
      onClick: () => R(b),
      disabled: g,
      whileTap: g ? void 0 : {
        scale: 0.95
      },
      children: "Max"
    })]
  }) : null, e[23] = R, e[24] = g, e[25] = b, e[26] = D, e[27] = L, e[28] = fe) : fe = e[28];
  let Re;
  e[29] !== P || e[30] !== y || e[31] !== N || e[32] !== S ? (Re = N ? /* @__PURE__ */ j("div", {
    className: Yd,
    children: [y, /* @__PURE__ */ C(lo, {
      variant: "number",
      animation: "snappy",
      style: {
        color: "inherit",
        fontSize: "inherit"
      },
      children: P
    }), S]
  }) : null, e[29] = P, e[30] = y, e[31] = N, e[32] = S, e[33] = Re) : Re = e[33];
  const ct = g || void 0, dt = g ? -1 : 0;
  let We;
  e[34] !== V ? (We = {
    x: V
  }, e[34] = V, e[35] = We) : We = e[35];
  const ut = g ? !1 : "x", ft = !p;
  let ze;
  e[36] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (ze = () => {
    W.current = !1;
  }, e[36] = ze) : ze = e[36];
  let Fe;
  e[37] !== Y ? (Fe = (de, me) => {
    Math.abs(me.offset.x) > eu && (W.current = !0), Y();
  }, e[37] = Y, e[38] = Fe) : Fe = e[38];
  let Ke;
  if (e[39] !== f || e[40] !== z || e[41] !== E || e[42] !== M || e[43] !== V) {
    let de;
    e[45] !== f || e[46] !== z || e[47] !== E || e[48] !== V ? (de = (me, ve) => /* @__PURE__ */ C(_d, {
      value: me,
      label: f ? f(me) : me,
      index: ve,
      x: V,
      radius: E,
      onSelect: z
    }, me), e[45] = f, e[46] = z, e[47] = E, e[48] = V, e[49] = de) : de = e[49], Ke = M.map(de), e[39] = f, e[40] = z, e[41] = E, e[42] = M, e[43] = V, e[44] = Ke;
  } else
    Ke = e[44];
  let De;
  e[50] !== K || e[51] !== B || e[52] !== U || e[53] !== We || e[54] !== ut || e[55] !== ft || e[56] !== Fe || e[57] !== Ke ? (De = /* @__PURE__ */ C(ie.div, {
    className: Qd,
    style: We,
    drag: ut,
    dragControls: B,
    dragListener: ft,
    dragConstraints: K,
    dragElastic: 0.1,
    dragMomentum: !1,
    onPointerDown: ze,
    onDrag: Fe,
    onDragEnd: U,
    children: Ke
  }), e[50] = K, e[51] = B, e[52] = U, e[53] = We, e[54] = ut, e[55] = ft, e[56] = Fe, e[57] = Ke, e[58] = De) : De = e[58];
  let Be;
  e[59] !== x || e[60] !== P || e[61] !== O || e[62] !== b || e[63] !== D || e[64] !== ct || e[65] !== dt || e[66] !== De ? (Be = /* @__PURE__ */ j("div", {
    ref: F,
    className: qd,
    role: "slider",
    "aria-label": x,
    "aria-valuemin": D,
    "aria-valuemax": b,
    "aria-valuenow": P,
    "aria-disabled": ct,
    tabIndex: dt,
    onKeyDown: O,
    children: [$d, De]
  }), e[59] = x, e[60] = P, e[61] = O, e[62] = b, e[63] = D, e[64] = ct, e[65] = dt, e[66] = De, e[67] = Be) : Be = e[67];
  let Je;
  return e[68] !== se || e[69] !== w || e[70] !== le || e[71] !== fe || e[72] !== Re || e[73] !== Be ? (Je = /* @__PURE__ */ j("div", {
    className: se,
    "data-disabled": le,
    "data-indicator": w,
    children: [fe, Re, Be]
  }), e[68] = se, e[69] = w, e[70] = le, e[71] = fe, e[72] = Re, e[73] = Be, e[74] = Je) : Je = e[74], Je;
}, zu = (n) => {
  const e = I(2), {
    children: t
  } = n;
  let o;
  return e[0] !== t ? (o = /* @__PURE__ */ C(Va, {
    children: /* @__PURE__ */ C(Hi, {
      children: /* @__PURE__ */ C(tl, {
        children: /* @__PURE__ */ C(s1, {
          children: t
        })
      })
    })
  }), e[0] = t, e[1] = o) : o = e[1], o;
};
export {
  gu as AppBar,
  tl as AppearanceProvider,
  Qu as Badge,
  bu as Card,
  Se as Cell,
  Is as CellStack,
  Se as Cells,
  Cu as Collapsible,
  Hi as DeviceProvider,
  Su as DropdownMenu,
  Nu as ErrorBoundary,
  Tu as FitText,
  Lu as Gallery,
  ke as GlassBorder,
  co as GlassContainer,
  Uu as GradientBackground,
  Cl as Image,
  Ul as ImageAvatar,
  wu as InitialsAvatar,
  Wl as Link,
  xu as Markdown,
  Pa as ModalView,
  Eu as Morph,
  Va as MotionProvider,
  vu as MultilineButton,
  ai as Page,
  Ru as PageSkeleton,
  Wu as PageTransition,
  cr as PanelHeader,
  Fu as ParticleEffect,
  Ku as Picker,
  Ji as Redaction,
  yu as RegularButton,
  Dn as SectionHeader,
  wt as SectionList,
  Du as SegmentedControl,
  Wt as Skeleton,
  Au as SkeletonBlock,
  Hc as Snackbar,
  r1 as SnackbarHost,
  s1 as SnackbarProvider,
  Iu as Spinner,
  pi as SplitView,
  Mu as StartView,
  ku as StoryCard,
  qu as StreamingText,
  os as Switch,
  zu as TMAProvider,
  Pu as TabBar,
  Ml as Table,
  Yu as Tabs,
  Or as Tappable,
  te as Text,
  Ou as TextField,
  Gu as Tooltip,
  Vu as Train,
  Zu as Wheel,
  rt as componentRadiusPixels,
  Mi as componentRadiusTokens,
  mu as componentSpacingPixels,
  Ii as componentSpacingTokens,
  hu as layoutTokens,
  Rt as radiusPixels,
  Di as radiusTokens,
  pu as semanticSpacingPixels,
  Bi as semanticSpacingTokens,
  fu as spacingPixels,
  Ki as spacingTokens,
  nl as useAppearance,
  ii as useColorScheme,
  Ze as useRedactionClassName,
  Pe as useSkeletonContext,
  Ce as useSkin,
  Bu as useSnackbar
};
