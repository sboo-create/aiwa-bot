import * as l from "react";
import "react/jsx-runtime";
var O = Object.defineProperty, g = (e, t) => O(e, "name", { value: t, configurable: !0 });
function b(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
g(b, "setRef");
function v(...e) {
  return (t) => {
    let o = !1;
    const n = e.map((i) => {
      const r = b(i, t);
      return !o && typeof r == "function" && (o = !0), r;
    });
    if (o)
      return () => {
        for (let i = 0; i < n.length; i++) {
          const r = n[i];
          typeof r == "function" ? r() : b(e[i], null);
        }
      };
  };
}
g(v, "composeRefs");
function R(...e) {
  return l.useCallback(v(...e), e);
}
g(R, "useComposedRefs");
var F = Object.defineProperty, a = (e, t) => F(e, "name", { value: t, configurable: !0 }), V = /* @__PURE__ */ a(((e, t) => {
  const o = { ...t };
  for (const n in t) {
    const i = e[n], r = t[n];
    if (/^on[A-Z]/.test(n))
      if (i && r) {
        const y = typeof i == "function", s = typeof r == "function";
        o[n] = (...c) => {
          const f = s ? r(...c) : void 0;
          return y && i(...c), f;
        };
      } else i && (o[n] = i);
    else n === "style" ? o[n] = {
      ...typeof i == "object" ? i : null,
      ...typeof r == "object" ? r : null
    } : n === "className" ? o[n] = [i, r].filter(Boolean).join(" ") : n === "aria-describedby" && (o[n] = P(r, i));
  }
  return { ...e, ...o };
}), "mergeProps");
function P(...e) {
  const t = /* @__PURE__ */ new Set();
  for (const o of e)
    if (typeof o == "string")
      for (const n of String(o).trim().split(/\s+/))
        n && t.add(n);
  return t.size > 0 ? Array.from(t).join(" ") : void 0;
}
a(P, "concatAriaDescribedby");
var C = l.createContext(V);
C.displayName = "SlotContext";
// @__NO_SIDE_EFFECTS__
function x(e) {
  const t = l.forwardRef((o, n) => {
    const i = l.useContext(C);
    let { children: r, mergeProps: E = i, ...y } = o, s = null, c = !1;
    const f = [];
    S(r) && typeof d == "function" && (r = d(r._payload)), l.Children.forEach(r, (m) => {
      if (I(m)) {
        c = !0;
        const p = m;
        let u = "child" in p.props ? p.props.child : p.props.children;
        S(u) && typeof d == "function" && (u = d(u._payload)), s = T(p, u), f.push(s?.props?.children);
      } else
        f.push(m);
    }), s ? s = l.cloneElement(s, void 0, f) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !c && l.Children.count(r) === 1 && l.isValidElement(r) && (s = r)
    );
    const h = s ? $(s) : void 0, L = R(n, h);
    if (!s) {
      if (r || r === 0)
        throw new Error(
          c ? z(e) : w(e)
        );
      return r;
    }
    const _ = E(
      y,
      s.props ?? {}
    );
    return s.type !== l.Fragment && (_.ref = n ? L : h), l.cloneElement(s, _);
  });
  return t.displayName = `${e}.Slot`, t;
}
a(x, "createSlot");
var k = /* @__PURE__ */ x("Slot"), j = Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function D(e) {
  const t = /* @__PURE__ */ a((o) => "child" in o ? o.children(o.child) : o.children, "Slottable");
  return t.displayName = `${e}.Slottable`, t.__radixId = j, t;
}
a(D, "createSlottable");
var T = /* @__PURE__ */ a((e, t) => {
  if ("child" in e.props) {
    const o = e.props.child;
    return l.isValidElement(o) ? l.cloneElement(o, void 0, e.props.children(o.props.children)) : null;
  }
  return l.isValidElement(t) ? t : null;
}, "getSlottableElementFromSlottable");
function $(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, o = t && "isReactWarning" in t && t.isReactWarning;
  return o ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, o = t && "isReactWarning" in t && t.isReactWarning, o ? e.props.ref : e.props.ref || e.ref);
}
a($, "getElementRef");
function I(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === j;
}
a(I, "isSlottable");
var W = Symbol.for("react.lazy");
function S(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === W && "_payload" in e && A(e._payload);
}
a(S, "isLazyComponent");
function A(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
a(A, "isPromiseLike");
var w = /* @__PURE__ */ a((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), z = /* @__PURE__ */ a((e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), d = l[" use ".trim().toString()];
export {
  k as S,
  D as a,
  x as b,
  v as c,
  R as u
};
