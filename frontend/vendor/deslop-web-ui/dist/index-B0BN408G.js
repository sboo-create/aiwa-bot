import * as t from "react";
import { jsx as a } from "react/jsx-runtime";
var c = Object.defineProperty, o = (r, e) => c(r, "name", { value: e, configurable: !0 }), i = t.createContext(void 0), v = /* @__PURE__ */ o((r) => {
  const { dir: e, children: n } = r;
  return /* @__PURE__ */ a(i.Provider, { value: e, children: n });
}, "DirectionProvider");
function u(r) {
  const e = t.useContext(i);
  return r || e || "ltr";
}
o(u, "useDirection");
export {
  v as D,
  u
};
