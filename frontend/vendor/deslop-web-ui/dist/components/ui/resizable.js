import { jsx as A } from "react/jsx-runtime";
import { G as gt } from "../../icons-DUsO7wRs.js";
import { createContext as vt, useState as de, useRef as F, useEffect as pe, useSyncExternalStore as mt, useMemo as bt, useId as yt, useContext as zt, useLayoutEffect as St, useCallback as He, useImperativeHandle as Ue } from "react";
import { c as Ye } from "../../utils-TrrhThB-.js";
function wt(e, t) {
  const n = getComputedStyle(e), o = parseFloat(n.fontSize);
  return t * o;
}
function xt(e, t) {
  const n = getComputedStyle(e.ownerDocument.documentElement), o = parseFloat(n.fontSize);
  return t * o;
}
function Ct(e) {
  return e / 100 * window.innerHeight;
}
function Pt(e) {
  return e / 100 * window.innerWidth;
}
function Lt(e) {
  switch (typeof e) {
    case "number":
      return [e, "px"];
    case "string": {
      const t = parseFloat(e);
      return e.endsWith("%") ? [t, "%"] : e.endsWith("px") ? [t, "px"] : e.endsWith("rem") ? [t, "rem"] : e.endsWith("em") ? [t, "em"] : e.endsWith("vh") ? [t, "vh"] : e.endsWith("vw") ? [t, "vw"] : [t, "%"];
    }
  }
}
function re({
  groupSize: e,
  panelElement: t,
  styleProp: n
}) {
  let o;
  const [r, a] = Lt(n);
  switch (a) {
    case "%": {
      o = r / 100 * e;
      break;
    }
    case "px": {
      o = r;
      break;
    }
    case "rem": {
      o = xt(t, r);
      break;
    }
    case "em": {
      o = wt(t, r);
      break;
    }
    case "vh": {
      o = Ct(r);
      break;
    }
    case "vw": {
      o = Pt(r);
      break;
    }
  }
  return o;
}
function I(e) {
  return parseFloat(e.toFixed(3));
}
function te({
  group: e
}) {
  const { orientation: t, panels: n } = e;
  return n.reduce((o, r) => (o += t === "horizontal" ? r.element.offsetWidth : r.element.offsetHeight, o), 0);
}
function ve(e) {
  const { panels: t } = e, n = te({ group: e });
  return n === 0 ? t.map((o) => ({
    groupResizeBehavior: o.panelConstraints.groupResizeBehavior,
    collapsedSize: 0,
    collapsible: o.panelConstraints.collapsible === !0,
    defaultSize: void 0,
    disabled: o.panelConstraints.disabled,
    minSize: 0,
    maxSize: 100,
    panelId: o.id
  })) : t.map((o) => {
    const { element: r, panelConstraints: a } = o;
    let c = 0;
    if (a.collapsedSize !== void 0) {
      const u = re({
        groupSize: n,
        panelElement: r,
        styleProp: a.collapsedSize
      });
      c = I(u / n * 100);
    }
    let s;
    if (a.defaultSize !== void 0) {
      const u = re({
        groupSize: n,
        panelElement: r,
        styleProp: a.defaultSize
      });
      s = I(u / n * 100);
    }
    let i = 0;
    if (a.minSize !== void 0) {
      const u = re({
        groupSize: n,
        panelElement: r,
        styleProp: a.minSize
      });
      i = I(u / n * 100);
    }
    let l = 100;
    if (a.maxSize !== void 0) {
      const u = re({
        groupSize: n,
        panelElement: r,
        styleProp: a.maxSize
      });
      l = I(u / n * 100);
    }
    return {
      groupResizeBehavior: a.groupResizeBehavior,
      collapsedSize: c,
      collapsible: a.collapsible === !0,
      defaultSize: s,
      disabled: a.disabled,
      minSize: i,
      maxSize: l,
      panelId: o.id
    };
  });
}
function P(e, t = "Assertion error") {
  if (!e)
    throw Error(t);
}
function me(e, t) {
  return Array.from(t).sort(
    e === "horizontal" ? kt : Mt
  );
}
function kt(e, t) {
  const n = e.element.offsetLeft - t.element.offsetLeft;
  return n !== 0 ? n : e.element.offsetWidth - t.element.offsetWidth;
}
function Mt(e, t) {
  const n = e.element.offsetTop - t.element.offsetTop;
  return n !== 0 ? n : e.element.offsetHeight - t.element.offsetHeight;
}
function Xe(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.ELEMENT_NODE;
}
function _e(e, t) {
  return {
    x: e.x >= t.left && e.x <= t.right ? 0 : Math.min(
      Math.abs(e.x - t.left),
      Math.abs(e.x - t.right)
    ),
    y: e.y >= t.top && e.y <= t.bottom ? 0 : Math.min(
      Math.abs(e.y - t.top),
      Math.abs(e.y - t.bottom)
    )
  };
}
function Et({
  orientation: e,
  rects: t,
  targetRect: n
}) {
  const o = {
    x: n.x + n.width / 2,
    y: n.y + n.height / 2
  };
  let r, a = Number.MAX_VALUE;
  for (const c of t) {
    const { x: s, y: i } = _e(o, c), l = e === "horizontal" ? s : i;
    l < a && (a = l, r = c);
  }
  return P(r, "No rect found"), r;
}
let ue;
function Rt() {
  return ue === void 0 && (typeof matchMedia == "function" ? ue = !!matchMedia("(pointer:coarse)").matches : ue = !1), ue;
}
function Je(e) {
  const { element: t, orientation: n, panels: o, separators: r } = e, a = me(
    n,
    Array.from(t.children).filter(Xe).map((m) => ({ element: m }))
  ).map(({ element: m }) => m), c = [];
  let s = !1, i = !1, l = -1, u = -1, h = 0, d, S = [];
  {
    let m = -1;
    for (const f of a)
      f.hasAttribute("data-panel") && (m++, f.hasAttribute("data-disabled") || (h++, l === -1 && (l = m), u = m));
  }
  if (h > 1) {
    let m = -1;
    for (const f of a)
      if (f.hasAttribute("data-panel")) {
        m++;
        const g = o.find(
          (p) => p.element === f
        );
        if (g) {
          if (d) {
            const p = d.element.getBoundingClientRect(), y = f.getBoundingClientRect();
            let z;
            if (i) {
              const b = n === "horizontal" ? new DOMRect(
                p.right,
                p.top,
                0,
                p.height
              ) : new DOMRect(
                p.left,
                p.bottom,
                p.width,
                0
              ), v = n === "horizontal" ? new DOMRect(y.left, y.top, 0, y.height) : new DOMRect(y.left, y.top, y.width, 0);
              switch (S.length) {
                case 0: {
                  z = [
                    b,
                    v
                  ];
                  break;
                }
                case 1: {
                  const L = S[0], k = Et({
                    orientation: n,
                    rects: [p, y],
                    targetRect: L.element.getBoundingClientRect()
                  });
                  z = [
                    L,
                    k === p ? v : b
                  ];
                  break;
                }
                default: {
                  z = S;
                  break;
                }
              }
            } else
              S.length ? z = S : z = [
                n === "horizontal" ? new DOMRect(
                  p.right,
                  y.top,
                  y.left - p.right,
                  y.height
                ) : new DOMRect(
                  y.left,
                  p.bottom,
                  y.width,
                  y.top - p.bottom
                )
              ];
            for (const b of z) {
              let v = "width" in b ? b : b.element.getBoundingClientRect();
              const L = Rt() ? e.resizeTargetMinimumSize.coarse : e.resizeTargetMinimumSize.fine;
              if (v.width < L) {
                const E = L - v.width;
                v = new DOMRect(
                  v.x - E / 2,
                  v.y,
                  v.width + E,
                  v.height
                );
              }
              if (v.height < L) {
                const E = L - v.height;
                v = new DOMRect(
                  v.x,
                  v.y - E / 2,
                  v.width,
                  v.height + E
                );
              }
              const k = m <= l || m > u;
              !s && !k && c.push({
                group: e,
                groupSize: te({ group: e }),
                panels: [d, g],
                separator: "width" in b ? void 0 : b,
                rect: v
              }), s = !1;
            }
          }
          i = !1, d = g, S = [];
        }
      } else if (f.hasAttribute("data-separator")) {
        f.ariaDisabled !== null && (s = !0);
        const g = r.find(
          (p) => p.element === f
        );
        g ? S.push(g) : (d = void 0, S = []);
      } else
        i = !0;
  }
  return c;
}
class qe {
  #e = {};
  addListener(t, n) {
    const o = this.#e[t];
    return o === void 0 ? this.#e[t] = [n] : o.includes(n) || o.push(n), () => {
      this.removeListener(t, n);
    };
  }
  emit(t, n) {
    const o = this.#e[t];
    if (o !== void 0)
      if (o.length === 1)
        o[0].call(null, n);
      else {
        let r = !1, a = null;
        const c = Array.from(o);
        for (let s = 0; s < c.length; s++) {
          const i = c[s];
          try {
            i.call(null, n);
          } catch (l) {
            a === null && (r = !0, a = l);
          }
        }
        if (r)
          throw a;
      }
  }
  removeAllListeners() {
    this.#e = {};
  }
  removeListener(t, n) {
    const o = this.#e[t];
    if (o !== void 0) {
      const r = o.indexOf(n);
      r >= 0 && o.splice(r, 1);
    }
  }
}
let Q = {
  cursorFlags: 0,
  state: "inactive"
};
const be = new qe();
function U() {
  return Q;
}
function Dt(e) {
  return be.addListener("change", e);
}
function It(e) {
  const t = Q, n = { ...Q };
  n.cursorFlags = e, Q = n, be.emit("change", {
    prev: t,
    next: n
  });
}
function ee(e) {
  const t = Q;
  Q = e, be.emit("change", {
    prev: t,
    next: e
  });
}
const Tt = (e) => e, ge = () => {
}, Ke = 1, Ze = 2, Qe = 4, et = 8, ke = 3, Me = 12;
let ce;
function Ee() {
  return ce === void 0 && (ce = !1, typeof window < "u" && (window.navigator.userAgent.includes("Chrome") || window.navigator.userAgent.includes("Firefox")) && (ce = !0)), ce;
}
function Nt({
  cursorFlags: e,
  groups: t,
  state: n
}) {
  let o = 0, r = 0;
  switch (n) {
    case "active":
    case "hover":
      t.forEach((a) => {
        if (!a.mutableState.disableCursor)
          switch (a.orientation) {
            case "horizontal": {
              o++;
              break;
            }
            case "vertical": {
              r++;
              break;
            }
          }
      });
  }
  if (!(o === 0 && r === 0)) {
    switch (n) {
      case "active": {
        if (e && Ee()) {
          const a = (e & Ke) !== 0, c = (e & Ze) !== 0, s = (e & Qe) !== 0, i = (e & et) !== 0;
          if (a)
            return s ? "se-resize" : i ? "ne-resize" : "e-resize";
          if (c)
            return s ? "sw-resize" : i ? "nw-resize" : "w-resize";
          if (s)
            return "s-resize";
          if (i)
            return "n-resize";
        }
        break;
      }
    }
    return Ee() ? o > 0 && r > 0 ? "move" : o > 0 ? "ew-resize" : "ns-resize" : o > 0 && r > 0 ? "grab" : o > 0 ? "col-resize" : "row-resize";
  }
}
const Re = /* @__PURE__ */ new WeakMap();
function ye(e) {
  if (e.defaultView === null || e.defaultView === void 0)
    return;
  let { prevStyle: t, styleSheet: n } = Re.get(e) ?? {};
  n === void 0 && (n = new e.defaultView.CSSStyleSheet(), e.adoptedStyleSheets && (Object.isExtensible(e.adoptedStyleSheets) ? e.adoptedStyleSheets.push(n) : e.adoptedStyleSheets = [
    ...e.adoptedStyleSheets,
    n
  ]));
  const o = U();
  switch (o.state) {
    case "active":
    case "hover": {
      const r = Nt({
        cursorFlags: o.cursorFlags,
        groups: o.hitRegions.map((c) => c.group),
        state: o.state
      }), a = `*, *:hover {cursor: ${r} !important; }`;
      if (t === a)
        return;
      t = a, r ? n.cssRules.length === 0 ? n.insertRule(a) : n.replaceSync(a) : n.cssRules.length === 1 && n.deleteRule(0);
      break;
    }
    case "inactive": {
      t = void 0, n.cssRules.length === 1 && n.deleteRule(0);
      break;
    }
  }
  Re.set(e, {
    prevStyle: t,
    styleSheet: n
  });
}
let G = /* @__PURE__ */ new Map();
const tt = new qe();
function Ot(e) {
  G = new Map(G), G.delete(e);
}
function De(e, t) {
  for (const [n] of G)
    if (n.id === e)
      return n;
}
function V(e, t) {
  for (const [n, o] of G)
    if (n.id === e)
      return o;
  if (t)
    throw Error(`Could not find data for Group with id ${e}`);
}
function _() {
  return G;
}
function ze(e, t) {
  return tt.addListener("groupChange", (n) => {
    n.group.id === e && t(n);
  });
}
function W(e, t, n) {
  const o = G.get(e);
  G = new Map(G), G.set(e, t), tt.emit("groupChange", {
    group: e,
    isUserInteraction: n?.isUserInteraction === !0,
    prev: o,
    next: t
  });
}
function nt(e) {
  const t = U();
  let n = !1;
  switch (t.state) {
    case "active":
      ee({
        cursorFlags: 0,
        state: "inactive"
      }), t.hitRegions.length > 0 && (ye(e), n = !0, t.hitRegions.forEach((o) => {
        const r = V(o.group.id, !0);
        W(o.group, r, {
          isUserInteraction: !0
        });
      }));
  }
  return n;
}
function Ie(e) {
  e.defaultPrevented || nt(e.currentTarget);
}
function Ft(e, t, n) {
  let o, r = {
    x: 1 / 0,
    y: 1 / 0
  };
  for (const a of t) {
    const c = _e(n, a.rect);
    switch (e) {
      case "horizontal": {
        c.x <= r.x && (o = a, r = c);
        break;
      }
      case "vertical": {
        c.y <= r.y && (o = a, r = c);
        break;
      }
    }
  }
  return o ? {
    distance: r,
    hitRegion: o
  } : void 0;
}
function Gt(e) {
  return e !== null && typeof e == "object" && "nodeType" in e && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}
function At(e, t) {
  if (e === t) throw new Error("Cannot compare node with itself");
  const n = {
    a: Oe(e),
    b: Oe(t)
  };
  let o;
  for (; n.a.at(-1) === n.b.at(-1); )
    o = n.a.pop(), n.b.pop();
  P(
    o,
    "Stacking order can only be calculated for elements with a common ancestor"
  );
  const r = {
    a: Ne(Te(n.a)),
    b: Ne(Te(n.b))
  };
  if (r.a === r.b) {
    const a = o.childNodes, c = {
      a: n.a.at(-1),
      b: n.b.at(-1)
    };
    let s = a.length;
    for (; s--; ) {
      const i = a[s];
      if (i === c.a) return 1;
      if (i === c.b) return -1;
    }
  }
  return Math.sign(r.a - r.b);
}
const jt = /\b(?:position|zIndex|opacity|transform|webkitTransform|mixBlendMode|filter|webkitFilter|isolation)\b/;
function Bt(e) {
  const t = getComputedStyle(ot(e) ?? e).display;
  return t === "flex" || t === "inline-flex";
}
function $t(e) {
  const t = getComputedStyle(e);
  return !!(t.position === "fixed" || t.zIndex !== "auto" && (t.position !== "static" || Bt(e)) || +t.opacity < 1 || "transform" in t && t.transform !== "none" || "webkitTransform" in t && t.webkitTransform !== "none" || "mixBlendMode" in t && t.mixBlendMode !== "normal" || "filter" in t && t.filter !== "none" || "webkitFilter" in t && t.webkitFilter !== "none" || "isolation" in t && t.isolation === "isolate" || jt.test(t.willChange) || t.webkitOverflowScrolling === "touch");
}
function Te(e) {
  let t = e.length;
  for (; t--; ) {
    const n = e[t];
    if (P(n, "Missing node"), $t(n)) return n;
  }
  return null;
}
function Ne(e) {
  return e && Number(getComputedStyle(e).zIndex) || 0;
}
function Oe(e) {
  const t = [];
  for (; e; )
    t.push(e), e = ot(e);
  return t;
}
function ot(e) {
  const { parentNode: t } = e;
  return Gt(t) ? t.host : t;
}
function Wt(e, t) {
  return e.x < t.x + t.width && e.x + e.width > t.x && e.y < t.y + t.height && e.y + e.height > t.y;
}
function Vt({
  groupElement: e,
  hitRegion: t,
  pointerEventTarget: n
}) {
  if (!Xe(n) || n.contains(e) || e.contains(n))
    return !0;
  if (At(n, e) > 0) {
    let o = n;
    for (; o; ) {
      if (o.contains(e))
        return !0;
      if (Wt(o.getBoundingClientRect(), t))
        return !1;
      o = o.parentElement;
    }
  }
  return !0;
}
function Se(e, t) {
  const n = [];
  return t.forEach((o, r) => {
    if (r.disabled)
      return;
    const a = Je(r), c = Ft(r.orientation, a, {
      x: e.clientX,
      y: e.clientY
    });
    c && c.distance.x <= 0 && c.distance.y <= 0 && Vt({
      groupElement: r.element,
      hitRegion: c.hitRegion.rect,
      pointerEventTarget: e.target
    }) && n.push(c.hitRegion);
  }), n;
}
function Ht(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (e[n] != t[n])
      return !1;
  return !0;
}
function D(e, t, n = 0) {
  return Math.abs(I(e) - I(t)) <= n;
}
function O(e, t) {
  return D(e, t) ? 0 : e > t ? 1 : -1;
}
function Z({
  overrideDisabledPanels: e,
  panelConstraints: t,
  prevSize: n,
  size: o
}) {
  const {
    collapsedSize: r = 0,
    collapsible: a,
    disabled: c,
    maxSize: s = 100,
    minSize: i = 0
  } = t;
  if (c && !e)
    return n;
  if (O(o, i) < 0)
    if (a) {
      const l = (r + i) / 2;
      O(o, l) < 0 ? o = r : o = i;
    } else
      o = i;
  return o = Math.min(s, o), o = I(o), o;
}
function ie({
  delta: e,
  initialLayout: t,
  panelConstraints: n,
  pivotIndices: o,
  prevLayout: r,
  trigger: a
}) {
  if (D(e, 0))
    return t;
  const c = a === "imperative-api", s = Object.values(t), i = Object.values(r), l = [...s], [u, h] = o;
  P(u != null, "Invalid first pivot index"), P(h != null, "Invalid second pivot index");
  let d = 0;
  switch (a) {
    case "keyboard": {
      {
        const f = e < 0 ? h : u, g = n[f];
        P(
          g,
          `Panel constraints not found for index ${f}`
        );
        const {
          collapsedSize: p = 0,
          collapsible: y,
          minSize: z = 0
        } = g;
        if (y) {
          const b = s[f];
          if (P(
            b != null,
            `Previous layout not found for panel index ${f}`
          ), D(b, p)) {
            const v = z - b;
            O(v, Math.abs(e)) > 0 && (e = e < 0 ? 0 - v : v);
          }
        }
      }
      {
        const f = e < 0 ? u : h, g = n[f];
        P(
          g,
          `No panel constraints found for index ${f}`
        );
        const {
          collapsedSize: p = 0,
          collapsible: y,
          minSize: z = 0
        } = g;
        if (y) {
          const b = s[f];
          if (P(
            b != null,
            `Previous layout not found for panel index ${f}`
          ), D(b, z)) {
            const v = b - p;
            O(v, Math.abs(e)) > 0 && (e = e < 0 ? 0 - v : v);
          }
        }
      }
      break;
    }
    default: {
      const f = e < 0 ? h : u, g = n[f];
      P(
        g,
        `Panel constraints not found for index ${f}`
      );
      const p = s[f], { collapsible: y, collapsedSize: z, minSize: b } = g;
      if (y && O(p, b) < 0)
        if (e > 0) {
          const v = b - z, L = v / 2, k = p + e;
          O(k, b) < 0 && (e = O(e, L) <= 0 ? 0 : v);
        } else {
          const v = b - z, L = 100 - v / 2, k = p - e;
          O(k, b) < 0 && (e = O(100 + e, L) > 0 ? 0 : -v);
        }
      break;
    }
  }
  {
    const f = e < 0 ? 1 : -1;
    let g = e < 0 ? h : u, p = 0;
    for (; ; ) {
      const z = s[g];
      P(
        z != null,
        `Previous layout not found for panel index ${g}`
      );
      const b = Z({
        overrideDisabledPanels: c,
        panelConstraints: n[g],
        prevSize: z,
        size: 100
      }) - z;
      if (p += b, g += f, g < 0 || g >= n.length)
        break;
    }
    const y = Math.min(Math.abs(e), Math.abs(p));
    e = e < 0 ? 0 - y : y;
  }
  {
    let f = e < 0 ? u : h;
    for (; f >= 0 && f < n.length; ) {
      const g = Math.abs(e) - Math.abs(d), p = s[f];
      P(
        p != null,
        `Previous layout not found for panel index ${f}`
      );
      const y = p - g, z = Z({
        overrideDisabledPanels: c,
        panelConstraints: n[f],
        prevSize: p,
        size: y
      });
      if (!D(p, z) && (d += p - z, l[f] = z, d.toFixed(3).localeCompare(Math.abs(e).toFixed(3), void 0, {
        numeric: !0
      }) >= 0))
        break;
      e < 0 ? f-- : f++;
    }
  }
  if (Ht(i, l))
    return r;
  {
    const f = e < 0 ? h : u, g = s[f];
    P(
      g != null,
      `Previous layout not found for panel index ${f}`
    );
    const p = g + d, y = Z({
      overrideDisabledPanels: c,
      panelConstraints: n[f],
      prevSize: g,
      size: p
    });
    if (l[f] = y, !D(y, p)) {
      let z = p - y, b = e < 0 ? h : u;
      for (; b >= 0 && b < n.length; ) {
        const v = l[b];
        P(
          v != null,
          `Previous layout not found for panel index ${b}`
        );
        const L = v + z, k = Z({
          overrideDisabledPanels: c,
          panelConstraints: n[b],
          prevSize: v,
          size: L
        });
        if (D(v, k) || (z -= k - v, l[b] = k), D(z, 0))
          break;
        e > 0 ? b-- : b++;
      }
    }
  }
  const S = Object.values(l).reduce(
    (f, g) => g + f,
    0
  );
  if (!D(S, 100, 0.1))
    return r;
  const m = Object.keys(r);
  return l.reduce((f, g, p) => (f[m[p]] = g, f), {});
}
function Y(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (t[n] === void 0 || O(e[n], t[n]) !== 0)
      return !1;
  return !0;
}
function X({
  layout: e,
  panelConstraints: t
}) {
  const n = Object.values(e), o = [...n], r = o.reduce(
    (s, i) => s + i,
    0
  );
  if (o.length !== t.length)
    throw Error(
      `Invalid ${t.length} panel layout: ${o.map((s) => `${s}%`).join(", ")}`
    );
  if (!D(r, 100) && o.length > 0)
    for (let s = 0; s < t.length; s++) {
      const i = o[s];
      P(i != null, `No layout data found for index ${s}`);
      const l = 100 / r * i;
      o[s] = l;
    }
  let a = 0;
  for (let s = 0; s < t.length; s++) {
    const i = n[s];
    P(i != null, `No layout data found for index ${s}`);
    const l = o[s];
    P(l != null, `No layout data found for index ${s}`);
    const u = Z({
      overrideDisabledPanels: !0,
      panelConstraints: t[s],
      prevSize: i,
      size: l
    });
    l != u && (a += l - u, o[s] = u);
  }
  if (!D(a, 0))
    for (let s = 0; s < t.length; s++) {
      const i = o[s];
      P(i != null, `No layout data found for index ${s}`);
      const l = i + a, u = Z({
        overrideDisabledPanels: !0,
        panelConstraints: t[s],
        prevSize: i,
        size: l
      });
      if (i !== u && (a -= u - i, o[s] = u, D(a, 0)))
        break;
    }
  const c = Object.keys(e);
  return o.reduce((s, i, l) => (s[c[l]] = i, s), {});
}
function rt({
  groupId: e,
  panelId: t
}) {
  const n = () => {
    const i = _();
    for (const [
      l,
      {
        defaultLayoutDeferred: u,
        derivedPanelConstraints: h,
        layout: d,
        groupSize: S,
        separatorToPanels: m
      }
    ] of i)
      if (l.id === e)
        return {
          defaultLayoutDeferred: u,
          derivedPanelConstraints: h,
          group: l,
          groupSize: S,
          layout: d,
          separatorToPanels: m
        };
    throw Error(`Group ${e} not found`);
  }, o = () => {
    const i = n().derivedPanelConstraints.find(
      (l) => l.panelId === t
    );
    if (i !== void 0)
      return i;
    throw Error(`Panel constraints not found for Panel ${t}`);
  }, r = () => {
    const i = n().group.panels.find((l) => l.id === t);
    if (i !== void 0)
      return i;
    throw Error(`Layout not found for Panel ${t}`);
  }, a = () => {
    const i = n().layout[t];
    if (i !== void 0)
      return i;
    throw Error(`Layout not found for Panel ${t}`);
  }, c = ({
    nextSize: i,
    panels: l,
    prevLayout: u,
    derivedPanelConstraints: h
  }) => {
    const d = a(), S = l.findIndex((g) => g.id === t), m = S === 0, f = S === l.length - 1;
    if (f && i < d && (m || l.slice(0, S).every((g, p) => {
      const y = h[p];
      return y?.collapsible && D(y.collapsedSize, u[y.panelId]);
    }))) {
      const g = l.slice(0, S).reduce((p, y) => p + u[y.id], 0);
      return {
        ...u,
        [t]: I(100 - g)
      };
    }
    return ie({
      delta: f ? d - i : i - d,
      initialLayout: u,
      panelConstraints: h,
      pivotIndices: f ? [S - 1, S] : [S, S + 1],
      prevLayout: u,
      trigger: "imperative-api"
    });
  }, s = (i) => {
    const l = a();
    if (i === l)
      return;
    const {
      defaultLayoutDeferred: u,
      derivedPanelConstraints: h,
      group: d,
      groupSize: S,
      layout: m,
      separatorToPanels: f
    } = n(), g = c({
      nextSize: i,
      panels: d.panels,
      prevLayout: m,
      derivedPanelConstraints: h
    }), p = X({
      layout: g,
      panelConstraints: h
    });
    Y(m, p) || W(d, {
      defaultLayoutDeferred: u,
      derivedPanelConstraints: h,
      groupSize: S,
      layout: p,
      separatorToPanels: f
    });
  };
  return {
    collapse: () => {
      const { collapsible: i, collapsedSize: l } = o(), { mutableValues: u } = r(), h = a();
      i && h !== l && (u.expandToSize = h, s(l));
    },
    expand: () => {
      const { collapsible: i, collapsedSize: l, minSize: u } = o(), { mutableValues: h } = r(), d = a();
      if (i && d === l) {
        let S = h.expandToSize ?? u;
        S === 0 && (S = 1), s(S);
      }
    },
    getSize: () => {
      const { group: i } = n(), l = a(), { element: u } = r(), h = i.orientation === "horizontal" ? u.offsetWidth : u.offsetHeight;
      return {
        asPercentage: l,
        inPixels: h
      };
    },
    isCollapsed: () => {
      const { collapsible: i, collapsedSize: l } = o(), u = a();
      return i && D(l, u);
    },
    resize: (i) => {
      const { group: l } = n(), { element: u } = r(), h = te({ group: l }), d = re({
        groupSize: h,
        panelElement: u,
        styleProp: i
      }), S = I(d / h * 100);
      s(S);
    }
  };
}
function Fe(e) {
  if (e.defaultPrevented)
    return;
  const t = _();
  Se(e, t).forEach((n) => {
    if (n.separator && !n.separator.disableDoubleClick) {
      const o = n.panels.find(
        (r) => r.panelConstraints.defaultSize !== void 0
      );
      if (o) {
        const r = o.panelConstraints.defaultSize, a = rt({
          groupId: n.group.id,
          panelId: o.id
        });
        a && r !== void 0 && (a.resize(r), e.preventDefault());
      }
    }
  });
}
function fe(e) {
  const t = _();
  for (const [n] of t)
    if (n.separators.some(
      (o) => o.element === e
    ))
      return n;
  throw Error("Could not find parent Group for separator element");
}
function at({
  groupId: e
}) {
  const t = () => {
    const n = _();
    for (const [o, r] of n)
      if (o.id === e)
        return { group: o, ...r };
    throw Error(`Could not find Group with id "${e}"`);
  };
  return {
    getLayout() {
      const { defaultLayoutDeferred: n, layout: o } = t();
      return n ? {} : o;
    },
    setLayout(n) {
      const {
        defaultLayoutDeferred: o,
        derivedPanelConstraints: r,
        group: a,
        groupSize: c,
        layout: s,
        separatorToPanels: i
      } = t(), l = X({
        layout: n,
        panelConstraints: r
      });
      return o ? s : (Y(s, l) || W(a, {
        defaultLayoutDeferred: o,
        derivedPanelConstraints: r,
        groupSize: c,
        layout: l,
        separatorToPanels: i
      }), l);
    }
  };
}
function H(e, t) {
  const n = fe(e), o = V(n.id, !0), r = n.separators.find(
    (u) => u.element === e
  );
  P(r, "Matching separator not found");
  const a = o.separatorToPanels.get(r);
  P(a, "Matching panels not found");
  const c = a.map((u) => n.panels.indexOf(u)), s = at({ groupId: n.id }).getLayout(), i = ie({
    delta: t,
    initialLayout: s,
    panelConstraints: o.derivedPanelConstraints,
    pivotIndices: c,
    prevLayout: s,
    trigger: "keyboard"
  }), l = X({
    layout: i,
    panelConstraints: o.derivedPanelConstraints
  });
  Y(s, l) || W(
    n,
    {
      defaultLayoutDeferred: o.defaultLayoutDeferred,
      derivedPanelConstraints: o.derivedPanelConstraints,
      groupSize: o.groupSize,
      layout: l,
      separatorToPanels: o.separatorToPanels
    },
    // Keyboard resizes (arrow keys, Home/End, Enter collapse/expand) originate
    // from a real DOM event on the separator, so they are user interactions
    // just like pointer drags. This function is only reached from
    // onDocumentKeyDown. See #716.
    { isUserInteraction: !0 }
  );
}
function Ge(e) {
  if (e.defaultPrevented)
    return;
  const t = e.currentTarget, n = fe(t);
  if (!n.disabled)
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault(), n.orientation === "vertical" && H(t, 5);
        break;
      }
      case "ArrowLeft": {
        e.preventDefault(), n.orientation === "horizontal" && H(t, -5);
        break;
      }
      case "ArrowRight": {
        e.preventDefault(), n.orientation === "horizontal" && H(t, 5);
        break;
      }
      case "ArrowUp": {
        e.preventDefault(), n.orientation === "vertical" && H(t, -5);
        break;
      }
      case "End": {
        e.preventDefault(), H(t, 100);
        break;
      }
      case "Enter": {
        e.preventDefault();
        const o = fe(t), r = V(o.id, !0), { derivedPanelConstraints: a, layout: c, separatorToPanels: s } = r, i = o.separators.find(
          (d) => d.element === t
        );
        P(i, "Matching separator not found");
        const l = s.get(i);
        P(l, "Matching panels not found");
        const u = l[0], h = a.find(
          (d) => d.panelId === u.id
        );
        if (P(h, "Panel metadata not found"), h.collapsible) {
          const d = c[u.id], S = h.collapsedSize === d ? o.mutableState.expandedPanelSizes[u.id] ?? h.minSize : h.collapsedSize;
          H(t, S - d);
        }
        break;
      }
      case "F6": {
        e.preventDefault();
        const o = fe(t).separators.map(
          (c) => c.element
        ), r = Array.from(o).findIndex(
          (c) => c === e.currentTarget
        );
        P(r !== null, "Index not found");
        const a = e.shiftKey ? r > 0 ? r - 1 : o.length - 1 : r + 1 < o.length ? r + 1 : 0;
        o[a].focus({
          preventScroll: !0
        });
        break;
      }
      case "Home": {
        e.preventDefault(), H(t, -100);
        break;
      }
    }
}
function Ae(e) {
  if (e.defaultPrevented || e.pointerType === "mouse" && e.button > 0)
    return;
  const t = _(), n = Se(e, t), o = /* @__PURE__ */ new Map();
  let r = !1;
  n.forEach((a) => {
    a.separator && (r || (r = !0, a.separator.element.focus({
      // @ts-expect-error https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#browser_compatibility
      focusVisible: !1,
      preventScroll: !0
    })));
    const c = t.get(a.group);
    c && o.set(a.group, c.layout);
  }), ee({
    cursorFlags: 0,
    hitRegions: n,
    initialLayoutMap: o,
    pointerDownAtPoint: { x: e.clientX, y: e.clientY },
    state: "active"
  }), n.length && e.preventDefault();
}
function it({
  document: e,
  event: t,
  hitRegions: n,
  initialLayoutMap: o,
  mountedGroups: r,
  pointerDownAtPoint: a,
  prevCursorFlags: c
}) {
  let s = 0;
  n.forEach((l) => {
    const { group: u, groupSize: h } = l, { orientation: d, panels: S } = u, { disableCursor: m } = u.mutableState;
    let f = 0;
    a ? d === "horizontal" ? f = (t.clientX - a.x) / h * 100 : f = (t.clientY - a.y) / h * 100 : d === "horizontal" ? f = t.clientX < 0 ? -100 : 100 : f = t.clientY < 0 ? -100 : 100;
    const g = o.get(u), p = r.get(u);
    if (!g || !p)
      return;
    const {
      defaultLayoutDeferred: y,
      derivedPanelConstraints: z,
      groupSize: b,
      layout: v,
      separatorToPanels: L
    } = p;
    if (z && v && L) {
      const k = ie({
        delta: f,
        initialLayout: g,
        panelConstraints: z,
        pivotIndices: l.panels.map((E) => S.indexOf(E)),
        prevLayout: v,
        trigger: "mouse-or-touch"
      });
      if (Y(k, v)) {
        if (f !== 0 && !m)
          switch (d) {
            case "horizontal": {
              s |= f < 0 ? Ke : Ze;
              break;
            }
            case "vertical": {
              s |= f < 0 ? Qe : et;
              break;
            }
          }
      } else
        W(l.group, {
          defaultLayoutDeferred: y,
          derivedPanelConstraints: z,
          groupSize: b,
          layout: k,
          separatorToPanels: L
        });
    }
  });
  let i = 0;
  t.movementX === 0 ? i |= c & ke : i |= s & ke, t.movementY === 0 ? i |= c & Me : i |= s & Me, It(i), ye(e);
}
function je(e) {
  const t = _(), n = U();
  switch (n.state) {
    case "active":
      it({
        document: e.currentTarget,
        event: e,
        hitRegions: n.hitRegions,
        initialLayoutMap: n.initialLayoutMap,
        mountedGroups: t,
        prevCursorFlags: n.cursorFlags
      });
  }
}
function Be(e) {
  if (e.defaultPrevented)
    return;
  const t = U(), n = _();
  switch (t.state) {
    case "active": {
      if (
        // Skip this check for "pointerleave" events, else Firefox triggers a false positive (see #514)
        e.buttons === 0
      ) {
        ee({
          cursorFlags: 0,
          state: "inactive"
        }), t.hitRegions.forEach((o) => {
          const r = V(o.group.id, !0);
          W(o.group, r, {
            isUserInteraction: !0
          });
        });
        return;
      }
      for (const o of t.hitRegions)
        if (o.separator) {
          const { element: r } = o.separator;
          r.hasPointerCapture?.(e.pointerId) || r.setPointerCapture?.(e.pointerId);
        }
      it({
        document: e.currentTarget,
        event: e,
        hitRegions: t.hitRegions,
        initialLayoutMap: t.initialLayoutMap,
        mountedGroups: n,
        pointerDownAtPoint: t.pointerDownAtPoint,
        prevCursorFlags: t.cursorFlags
      });
      break;
    }
    default: {
      const o = Se(e, n);
      o.length === 0 ? t.state !== "inactive" && ee({
        cursorFlags: 0,
        state: "inactive"
      }) : ee({
        cursorFlags: 0,
        hitRegions: o,
        state: "hover"
      }), ye(e.currentTarget);
      break;
    }
  }
}
function $e(e) {
  if (e.relatedTarget instanceof HTMLIFrameElement)
    switch (U().state) {
      case "hover":
        ee({
          cursorFlags: 0,
          state: "inactive"
        });
    }
}
function We(e) {
  e.defaultPrevented || e.pointerType === "mouse" && e.button > 0 || nt(e.currentTarget) && e.preventDefault();
}
function Ve(e) {
  let t = 0, n = 0;
  const o = {};
  for (const a of e)
    if (a.defaultSize !== void 0) {
      t++;
      const c = I(a.defaultSize);
      n += c, o[a.panelId] = c;
    } else
      o[a.panelId] = void 0;
  const r = e.length - t;
  if (r !== 0) {
    const a = I((100 - n) / r);
    for (const c of e)
      c.defaultSize === void 0 && (o[c.panelId] = a);
  }
  return o;
}
function Ut(e, t, n) {
  if (!n[0])
    return;
  const o = e.panels.find((i) => i.element === t);
  if (!o || !o.onResize)
    return;
  const r = te({ group: e }), a = e.orientation === "horizontal" ? o.element.offsetWidth : o.element.offsetHeight, c = o.mutableValues.prevSize, s = {
    asPercentage: I(a / r * 100),
    inPixels: a
  };
  o.mutableValues.prevSize = s, o.onResize(s, o.id, c);
}
function Yt(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function Xt({
  group: e,
  nextGroupSize: t,
  prevGroupSize: n,
  prevLayout: o
}) {
  if (n <= 0 || t <= 0 || n === t)
    return o;
  let r = 0, a = 0, c = !1;
  const s = /* @__PURE__ */ new Map(), i = [];
  for (const h of e.panels) {
    const d = o[h.id] ?? 0;
    switch (h.panelConstraints.groupResizeBehavior) {
      case "preserve-pixel-size": {
        c = !0;
        const S = d / 100 * n, m = I(
          S / t * 100
        );
        s.set(h.id, m), r += m;
        break;
      }
      case "preserve-relative-size":
      default: {
        i.push(h.id), a += d;
        break;
      }
    }
  }
  if (!c || i.length === 0)
    return o;
  const l = 100 - r, u = { ...o };
  if (s.forEach((h, d) => {
    u[d] = h;
  }), a > 0)
    for (const h of i) {
      const d = o[h] ?? 0;
      u[h] = I(
        d / a * l
      );
    }
  else {
    const h = I(
      l / i.length
    );
    for (const d of i)
      u[d] = h;
  }
  return u;
}
function _t(e, t) {
  const n = e.map((r) => r.id), o = Object.keys(t);
  if (n.length !== o.length)
    return !1;
  for (const r of n)
    if (!o.includes(r))
      return !1;
  return !0;
}
const K = /* @__PURE__ */ new Map();
function Jt(e) {
  let t = !0;
  P(
    e.element.ownerDocument.defaultView,
    "Cannot register an unmounted Group"
  );
  const n = e.element.ownerDocument.defaultView.ResizeObserver, o = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set(), a = new n((m) => {
    for (const f of m) {
      const { borderBoxSize: g, target: p } = f;
      if (p === e.element) {
        if (t) {
          const y = te({ group: e });
          if (y === 0)
            return;
          const z = V(e.id);
          if (!z)
            return;
          const b = ve(e), v = z.defaultLayoutDeferred ? Ve(b) : z.layout, L = Xt({
            group: e,
            nextGroupSize: y,
            prevGroupSize: z.groupSize,
            prevLayout: v
          }), k = X({
            layout: L,
            panelConstraints: b
          });
          if (!z.defaultLayoutDeferred && Y(z.layout, k) && Yt(
            z.derivedPanelConstraints,
            b
          ) && z.groupSize === y)
            return;
          W(e, {
            defaultLayoutDeferred: !1,
            derivedPanelConstraints: b,
            groupSize: y,
            layout: k,
            separatorToPanels: z.separatorToPanels
          });
        }
      } else
        Ut(e, p, g);
    }
  });
  a.observe(e.element), e.panels.forEach((m) => {
    P(
      !o.has(m.id),
      `Panel ids must be unique; id "${m.id}" was used more than once`
    ), o.add(m.id), m.onResize && a.observe(m.element);
  });
  const c = te({ group: e }), s = ve(e), i = e.panels.map(({ id: m }) => m).join(",");
  let l = e.mutableState.defaultLayout;
  l && (_t(e.panels, l) || (l = void 0));
  const u = e.mutableState.layouts[i] ?? l ?? Ve(s), h = X({
    layout: u,
    panelConstraints: s
  }), d = e.element.ownerDocument;
  K.set(
    d,
    (K.get(d) ?? 0) + 1
  );
  const S = /* @__PURE__ */ new Map();
  return Je(e).forEach((m) => {
    m.separator && S.set(m.separator, m.panels);
  }), W(e, {
    defaultLayoutDeferred: c === 0,
    derivedPanelConstraints: s,
    groupSize: c,
    layout: h,
    separatorToPanels: S
  }), e.separators.forEach((m) => {
    P(
      !r.has(m.id),
      `Separator ids must be unique; id "${m.id}" was used more than once`
    ), r.add(m.id), m.element.addEventListener("keydown", Ge);
  }), K.get(d) === 1 && (d.addEventListener("contextmenu", Ie, !0), d.addEventListener("dblclick", Fe, !0), d.addEventListener("pointerdown", Ae, !0), d.addEventListener("pointerleave", je), d.addEventListener("pointermove", Be), d.addEventListener("pointerout", $e), d.addEventListener("pointerup", We, !0)), function() {
    t = !1, K.set(
      d,
      Math.max(0, (K.get(d) ?? 0) - 1)
    ), Ot(e), e.separators.forEach((m) => {
      m.element.removeEventListener("keydown", Ge);
    }), K.get(d) || (d.removeEventListener(
      "contextmenu",
      Ie,
      !0
    ), d.removeEventListener(
      "dblclick",
      Fe,
      !0
    ), d.removeEventListener(
      "pointerdown",
      Ae,
      !0
    ), d.removeEventListener("pointerleave", je), d.removeEventListener("pointermove", Be), d.removeEventListener("pointerout", $e), d.removeEventListener("pointerup", We, !0)), a.disconnect();
  };
}
function qt() {
  const [e, t] = de({}), n = He(() => t({}), []);
  return [e, n];
}
function we(e) {
  const t = yt();
  return `${e ?? t}`;
}
const J = typeof window < "u" ? St : pe;
function ae(e) {
  const t = F(e);
  return J(() => {
    t.current = e;
  }, [e]), He(
    (...n) => t.current?.(...n),
    [t]
  );
}
function xe(...e) {
  return ae((t) => {
    e.forEach((n) => {
      if (n)
        switch (typeof n) {
          case "function": {
            n(t);
            break;
          }
          case "object": {
            n.current = t;
            break;
          }
        }
    });
  });
}
function Ce(e) {
  const t = F({ ...e });
  return J(() => {
    for (const n in e)
      t.current[n] = e[n];
  }, [e]), t.current;
}
const st = vt(null);
function Kt(e, t) {
  const n = F({
    getLayout: () => ({}),
    setLayout: Tt
  });
  Ue(t, () => n.current, []), J(() => {
    Object.assign(
      n.current,
      at({ groupId: e })
    );
  });
}
function lt({
  children: e,
  className: t,
  defaultLayout: n,
  disableCursor: o,
  disabled: r,
  elementRef: a,
  groupRef: c,
  id: s,
  onLayoutChange: i,
  onLayoutChanged: l,
  orientation: u = "horizontal",
  resizeTargetMinimumSize: h = {
    coarse: 20,
    fine: 10
  },
  style: d,
  ...S
}) {
  const m = F({
    onLayoutChange: {},
    onLayoutChanged: {}
  }), f = ae((w) => {
    Y(m.current.onLayoutChange, w) || (m.current.onLayoutChange = w, i?.(w));
  }), g = ae(
    (w, x) => {
      Y(m.current.onLayoutChanged, w) || (m.current.onLayoutChanged = w, l?.(w, { isUserInteraction: x }));
    }
  ), p = we(s), y = F(null), [z, b] = qt(), v = F({
    lastExpandedPanelSizes: {},
    layouts: {},
    panels: [],
    resizeTargetMinimumSize: h,
    separators: []
  }), L = xe(y, a);
  Kt(p, c);
  const k = ae(
    (w, x) => {
      const M = U(), C = De(w), R = V(w);
      if (R) {
        let T = !1;
        switch (M.state) {
          case "active": {
            T = M.hitRegions.some(
              (ne) => ne.group === C
            );
            break;
          }
        }
        return {
          flexGrow: R.layout[x] ?? 1,
          pointerEvents: T ? "none" : void 0
        };
      }
      if (n?.[x])
        return {
          flexGrow: n?.[x]
        };
    }
  ), E = Ce({
    defaultLayout: n,
    disableCursor: o
  }), N = bt(
    () => ({
      get disableCursor() {
        return !!E.disableCursor;
      },
      getPanelStyles: k,
      id: p,
      orientation: u,
      registerPanel: (w) => {
        const x = v.current;
        return x.panels = me(u, [
          ...x.panels,
          w
        ]), b(), () => {
          x.panels = x.panels.filter(
            (M) => M !== w
          ), b();
        };
      },
      registerSeparator: (w) => {
        const x = v.current;
        return x.separators = me(u, [
          ...x.separators,
          w
        ]), b(), () => {
          x.separators = x.separators.filter(
            (M) => M !== w
          ), b();
        };
      },
      updatePanelProps: (w, { disabled: x }) => {
        const M = v.current.panels.find(
          (T) => T.id === w
        );
        M && (M.panelConstraints.disabled = x);
        const C = De(p), R = V(p);
        C && R && W(C, {
          ...R,
          derivedPanelConstraints: ve(C)
        });
      },
      updateSeparatorProps: (w, {
        disabled: x,
        disableDoubleClick: M
      }) => {
        const C = v.current.separators.find(
          (R) => R.id === w
        );
        C && (C.disabled = x, C.disableDoubleClick = M);
      }
    }),
    [k, p, b, u, E]
  ), j = F(null);
  return J(() => {
    const w = y.current;
    if (w === null)
      return;
    const x = v.current;
    let M;
    if (E.defaultLayout !== void 0 && Object.keys(E.defaultLayout).length === x.panels.length) {
      M = {};
      for (const B of x.panels) {
        const q = E.defaultLayout[B.id];
        q !== void 0 && (M[B.id] = q);
      }
    }
    const C = {
      disabled: !!r,
      element: w,
      id: p,
      mutableState: {
        defaultLayout: M,
        disableCursor: !!E.disableCursor,
        expandedPanelSizes: v.current.lastExpandedPanelSizes,
        layouts: v.current.layouts
      },
      orientation: u,
      panels: x.panels,
      resizeTargetMinimumSize: x.resizeTargetMinimumSize,
      separators: x.separators
    };
    j.current = C;
    const R = Jt(C), { defaultLayoutDeferred: T, derivedPanelConstraints: ne, layout: se } = V(C.id, !0);
    !T && ne.length > 0 && (f(se), g(se, !1));
    const oe = ze(p, (B) => {
      const { defaultLayoutDeferred: q, derivedPanelConstraints: Le, layout: le } = B.next;
      if (q || Le.length === 0)
        return;
      const dt = C.panels.map(({ id: $ }) => $).join(",");
      C.mutableState.layouts[dt] = le, Le.forEach(($) => {
        if ($.collapsible) {
          const { layout: he } = B.prev ?? {};
          if (he) {
            const pt = D(
              $.collapsedSize,
              le[$.panelId]
            ), ht = D(
              $.collapsedSize,
              he[$.panelId]
            );
            pt && !ht && (C.mutableState.expandedPanelSizes[$.panelId] = he[$.panelId]);
          }
        }
      });
      const ft = U().state !== "active";
      f(le), ft && g(le, B.isUserInteraction);
    });
    return () => {
      j.current = null, R(), oe();
    };
  }, [
    r,
    p,
    g,
    f,
    u,
    z,
    E
  ]), pe(() => {
    const w = j.current;
    w && (w.mutableState.defaultLayout = n, w.mutableState.disableCursor = !!o);
  }), /* @__PURE__ */ A(st.Provider, { value: N, children: /* @__PURE__ */ A(
    "div",
    {
      ...S,
      className: t,
      "data-group": !0,
      "data-testid": p,
      id: p,
      ref: L,
      style: {
        height: "100%",
        width: "100%",
        overflow: "hidden",
        ...d,
        display: "flex",
        flexDirection: u === "horizontal" ? "row" : "column",
        flexWrap: "nowrap",
        // Inform the browser that the library is handling touch events for this element
        // but still allow users to scroll content within panels in the non-resizing direction
        // NOTE This is not an inherited style
        // See github.com/bvaughn/react-resizable-panels/issues/662
        touchAction: u === "horizontal" ? "pan-y" : "pan-x"
      },
      children: e
    }
  ) });
}
lt.displayName = "Group";
function Pe() {
  const e = zt(st);
  return P(
    e,
    "Group Context not found; did you render a Panel or Separator outside of a Group?"
  ), e;
}
function Zt(e, t) {
  const { id: n } = Pe(), o = F({
    collapse: ge,
    expand: ge,
    getSize: () => ({
      asPercentage: 0,
      inPixels: 0
    }),
    isCollapsed: () => !1,
    resize: ge
  });
  Ue(t, () => o.current, []), J(() => {
    Object.assign(
      o.current,
      rt({ groupId: n, panelId: e })
    );
  });
}
function ut({
  children: e,
  className: t,
  collapsedSize: n = "0%",
  collapsible: o = !1,
  defaultSize: r,
  disabled: a,
  elementRef: c,
  groupResizeBehavior: s = "preserve-relative-size",
  id: i,
  maxSize: l = "100%",
  minSize: u = "0%",
  onResize: h,
  panelRef: d,
  style: S,
  ...m
}) {
  const f = !!i, g = we(i), p = Ce({
    disabled: a
  }), y = F(null), z = xe(y, c), {
    getPanelStyles: b,
    id: v,
    orientation: L,
    registerPanel: k,
    updatePanelProps: E
  } = Pe(), N = h !== null, j = ae(
    (C, R, T) => {
      h?.(C, i, T);
    }
  );
  J(() => {
    const C = y.current;
    if (C !== null) {
      const R = {
        element: C,
        id: g,
        idIsStable: f,
        mutableValues: {
          expandToSize: void 0,
          prevSize: void 0
        },
        onResize: N ? j : void 0,
        panelConstraints: {
          groupResizeBehavior: s,
          collapsedSize: n,
          collapsible: o,
          defaultSize: r,
          disabled: p.disabled,
          maxSize: l,
          minSize: u
        }
      };
      return k(R);
    }
  }, [
    s,
    n,
    o,
    r,
    N,
    g,
    f,
    l,
    u,
    j,
    k,
    p
  ]), pe(() => {
    E(g, { disabled: a });
  }, [a, g, E]), Zt(g, d);
  const w = () => {
    const C = b(v, g);
    if (C)
      return JSON.stringify(C);
  }, x = mt(
    (C) => ze(v, C),
    w,
    w
  );
  let M;
  return x ? M = JSON.parse(x) : r !== void 0 ? M = {
    flexGrow: void 0,
    flexShrink: void 0,
    flexBasis: r
  } : M = { flexGrow: 1 }, /* @__PURE__ */ A(
    "div",
    {
      ...m,
      "data-disabled": a || void 0,
      "data-panel": !0,
      "data-testid": g,
      id: g,
      ref: z,
      style: {
        ...Qt,
        display: "flex",
        flexBasis: 0,
        flexShrink: 1,
        overflow: "visible",
        ...M
      },
      children: /* @__PURE__ */ A(
        "div",
        {
          className: t,
          style: {
            maxHeight: "100%",
            maxWidth: "100%",
            flexGrow: 1,
            overflow: "auto",
            ...S,
            // Inform the browser that the library is handling touch events for this element
            // but still allow users to scroll content within panels in the non-resizing direction
            // NOTE This is not an inherited style
            // See github.com/bvaughn/react-resizable-panels/issues/662
            touchAction: L === "horizontal" ? "pan-y" : "pan-x"
          },
          children: e
        }
      )
    }
  );
}
ut.displayName = "Panel";
const Qt = {
  minHeight: 0,
  maxHeight: "100%",
  height: "auto",
  minWidth: 0,
  maxWidth: "100%",
  width: "auto",
  border: "none",
  borderWidth: 0,
  padding: 0,
  margin: 0
};
function en({
  layout: e,
  panelConstraints: t,
  panelId: n,
  panelIndex: o
}) {
  let r, a;
  const c = e[n], s = t.find(
    (i) => i.panelId === n
  );
  if (s) {
    const i = s.maxSize, l = s.collapsible ? s.collapsedSize : s.minSize, u = [o, o + 1];
    a = X({
      layout: ie({
        delta: l - c,
        initialLayout: e,
        panelConstraints: t,
        pivotIndices: u,
        prevLayout: e
      }),
      panelConstraints: t
    })[n], r = X({
      layout: ie({
        delta: i - c,
        initialLayout: e,
        panelConstraints: t,
        pivotIndices: u,
        prevLayout: e
      }),
      panelConstraints: t
    })[n];
  }
  return {
    valueControls: n,
    valueMax: r,
    valueMin: a,
    valueNow: c
  };
}
function ct({
  children: e,
  className: t,
  disabled: n,
  disableDoubleClick: o,
  elementRef: r,
  id: a,
  style: c,
  ...s
}) {
  const i = we(a), l = Ce({
    disabled: n,
    disableDoubleClick: o
  }), [u, h] = de({}), [d, S] = de("inactive"), [m, f] = de(!1), g = F(null), p = xe(g, r), {
    disableCursor: y,
    id: z,
    orientation: b,
    registerSeparator: v,
    updateSeparatorProps: L
  } = Pe(), k = b === "horizontal" ? "vertical" : "horizontal";
  J(() => {
    const j = g.current;
    if (j !== null) {
      const w = {
        disabled: l.disabled,
        disableDoubleClick: l.disableDoubleClick,
        element: j,
        id: i
      }, x = v(w), M = Dt(
        (R) => {
          S(
            R.next.state !== "inactive" && R.next.hitRegions.some(
              (T) => T.separator === w
            ) ? R.next.state : "inactive"
          );
        }
      ), C = ze(
        z,
        (R) => {
          const { derivedPanelConstraints: T, layout: ne, separatorToPanels: se } = R.next, oe = se.get(w);
          if (oe) {
            const B = oe[0], q = oe.indexOf(B);
            h(
              en({
                layout: ne,
                panelConstraints: T,
                panelId: B.id,
                panelIndex: q
              })
            );
          }
        }
      );
      return () => {
        M(), C(), x();
      };
    }
  }, [z, i, v, l]), pe(() => {
    L(i, { disabled: n, disableDoubleClick: o });
  }, [n, o, i, L]);
  let E;
  n && !y && (E = "not-allowed");
  let N;
  if (n)
    N = "disabled";
  else
    switch (d) {
      case "active": {
        N = "active";
        break;
      }
      default:
        m ? N = "focus" : N = d;
    }
  return /* @__PURE__ */ A(
    "div",
    {
      ...s,
      "aria-controls": u.valueControls,
      "aria-disabled": n || void 0,
      "aria-orientation": k,
      "aria-valuemax": u.valueMax,
      "aria-valuemin": u.valueMin,
      "aria-valuenow": u.valueNow,
      children: e,
      className: t,
      "data-separator": N,
      "data-testid": i,
      id: i,
      onBlur: () => f(!1),
      onFocus: () => f(!0),
      ref: p,
      role: "separator",
      style: {
        flexBasis: "auto",
        cursor: E,
        ...c,
        flexGrow: 0,
        flexShrink: 0,
        // Inform the browser that the library is handling touch events for this element
        // See github.com/bvaughn/react-resizable-panels/issues/662
        touchAction: "none"
      },
      tabIndex: n ? void 0 : 0
    }
  );
}
ct.displayName = "Separator";
function an({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ A(
    lt,
    {
      "data-slot": "resizable-panel-group",
      className: Ye(
        "flex h-full w-full aria-[orientation=vertical]:flex-col",
        e
      ),
      ...t
    }
  );
}
function sn({ ...e }) {
  return /* @__PURE__ */ A(ut, { "data-slot": "resizable-panel", ...e });
}
function ln({
  withHandle: e,
  className: t,
  ...n
}) {
  return /* @__PURE__ */ A(
    ct,
    {
      "data-slot": "resizable-handle",
      className: Ye(
        "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-hidden aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90",
        t
      ),
      ...n,
      children: e && /* @__PURE__ */ A("div", { className: "z-10 flex h-4 w-3 items-center justify-center rounded-xs border bg-border", children: /* @__PURE__ */ A(gt, { className: "size-2.5" }) })
    }
  );
}
export {
  ln as ResizableHandle,
  sn as ResizablePanel,
  an as ResizablePanelGroup
};
