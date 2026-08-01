import * as e from "react";
import * as s from "react-dom";
import { P as c } from "./index-Si5tf8-e.js";
import { u } from "./index-CCKe-Mpx.js";
import { jsx as l } from "react/jsx-runtime";
var p = Object.defineProperty, P = (o, r) => p(o, "name", { value: r, configurable: !0 }), _ = /* @__PURE__ */ e.forwardRef(
  /* @__PURE__ */ P(function(r, a) {
    const { container: n, ...i } = r, [f, m] = e.useState(!1);
    u(() => m(!0), []);
    const t = n || f && globalThis?.document?.body;
    return t ? s.createPortal(/* @__PURE__ */ l(c.div, { ...i, ref: a }), t) : null;
  }, "Portal")
);
export {
  _ as P
};
