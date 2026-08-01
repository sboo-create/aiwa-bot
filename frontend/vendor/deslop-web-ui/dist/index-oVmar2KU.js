import * as p from "react";
import { jsx as P } from "react/jsx-runtime";
var h = Object.defineProperty, r = (e, c) => h(e, "name", { value: c, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function b(e, c) {
  const s = p.createContext(c);
  s.displayName = e + "Context";
  const a = /* @__PURE__ */ r((u) => {
    const { children: t, ...o } = u, n = p.useMemo(() => o, Object.values(o));
    return /* @__PURE__ */ P(s.Provider, { value: n, children: t });
  }, "Provider");
  a.displayName = e + "Provider";
  function i(u, t = {}) {
    const { optional: o = !1 } = t, n = p.useContext(s);
    if (n) return n;
    if (c !== void 0) return c;
    if (!o)
      throw new Error(`\`${u}\` must be used within \`${e}\``);
  }
  return r(i, "useContext"), [a, i];
}
r(b, "createContext");
// @__NO_SIDE_EFFECTS__
function $(e, c = []) {
  let s = [];
  function a(u, t) {
    const o = p.createContext(t);
    o.displayName = u + "Context";
    const n = s.length;
    s = [...s, t];
    const d = /* @__PURE__ */ r((x) => {
      const { scope: m, children: S, ...f } = x, l = m?.[e]?.[n] || o, v = p.useMemo(() => f, Object.values(f));
      return /* @__PURE__ */ P(l.Provider, { value: v, children: S });
    }, "Provider");
    d.displayName = u + "Provider";
    function C(x, m, S = {}) {
      const { optional: f = !1 } = S, l = m?.[e]?.[n] || o, v = p.useContext(l);
      if (v) return v;
      if (t !== void 0) return t;
      if (!f)
        throw new Error(`\`${x}\` must be used within \`${u}\``);
    }
    return r(C, "useContext"), [d, C];
  }
  r(a, "createContext");
  const i = /* @__PURE__ */ r(() => {
    const u = s.map((t) => p.createContext(t));
    return /* @__PURE__ */ r(function(o) {
      const n = o?.[e] || u;
      return p.useMemo(
        () => ({ [`__scope${e}`]: { ...o, [e]: n } }),
        [o, n]
      );
    }, "useScope");
  }, "createScope");
  return i.scopeName = e, [a, _(i, ...c)];
}
r($, "createContextScope");
function _(...e) {
  const c = e[0];
  if (e.length === 1) return c;
  const s = /* @__PURE__ */ r(() => {
    const a = e.map((i) => ({
      useScope: i(),
      scopeName: i.scopeName
    }));
    return /* @__PURE__ */ r(function(u) {
      const t = a.reduce((o, { useScope: n, scopeName: d }) => {
        const x = n(u)[`__scope${d}`];
        return { ...o, ...x };
      }, {});
      return p.useMemo(() => ({ [`__scope${c.scopeName}`]: t }), [t]);
    }, "useComposedScopes");
  }, "createScope");
  return s.scopeName = c.scopeName, s;
}
r(_, "composeContextScopes");
export {
  $ as c
};
