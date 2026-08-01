import * as n from "react";
import { u as h } from "./index-CCKe-Mpx.js";
var O = Object.defineProperty, T = (e, t) => O(e, "name", { value: t, configurable: !0 }), g = n[" useEffectEvent ".trim().toString()], b = n[" useInsertionEffect ".trim().toString()];
function y(e) {
  if (typeof g == "function")
    return g(e);
  const t = n.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return typeof b == "function" ? b(() => {
    t.current = e;
  }) : h(() => {
    t.current = e;
  }), n.useMemo(() => ((...o) => t.current?.(...o)), []);
}
T(y, "useEffectEvent");
var w = Object.defineProperty, l = (e, t) => w(e, "name", { value: t, configurable: !0 }), A = n[" useInsertionEffect ".trim().toString()] || h;
function U({
  prop: e,
  defaultProp: t,
  onChange: o = /* @__PURE__ */ l(() => {
  }, "onChange"),
  caller: a
}) {
  const [r, u, d] = P({
    defaultProp: t,
    onChange: o
  }), v = e !== void 0, c = v ? e : r, E = n.useCallback(
    (f) => {
      if (v) {
        const s = I(f) ? f(e) : f;
        s !== e && d.current?.(s);
      } else
        u(f);
    },
    [v, e, u, d]
  );
  return [c, E];
}
l(U, "useControllableState");
function P({
  defaultProp: e,
  onChange: t
}) {
  const [o, a] = n.useState(e), r = n.useRef(o), u = n.useRef(t);
  return A(() => {
    u.current = t;
  }, [t]), n.useEffect(() => {
    r.current !== o && (u.current?.(o), r.current = o);
  }, [o, r]), [o, a, u];
}
l(P, "useUncontrolledState");
function I(e) {
  return typeof e == "function";
}
l(I, "isFunction");
var _ = Symbol("RADIX:SYNC_STATE");
function F(e, t, o, a) {
  const { prop: r, defaultProp: u, onChange: d, caller: v } = t, c = r !== void 0, E = y(d), f = [{ ...o, state: u }];
  a && f.push(a);
  const [s, p] = n.useReducer(
    (S, R) => {
      if (R.type === _)
        return { ...S, state: R.state };
      const m = e(S, R);
      return c && !Object.is(m.state, S.state) && E(m.state), m;
    },
    ...f
  ), i = s.state, C = n.useRef(i);
  n.useEffect(() => {
    C.current !== i && (C.current = i, c || E(i));
  }, [i, C, c]);
  const j = n.useMemo(() => r !== void 0 ? { ...s, state: r } : s, [s, r]);
  return n.useEffect(() => {
    c && !Object.is(r, s.state) && p({ type: _, state: r });
  }, [r, s.state, c]), [j, p];
}
l(F, "useControllableStateReducer");
export {
  U as u
};
