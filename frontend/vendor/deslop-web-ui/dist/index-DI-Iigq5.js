import * as l from "react";
import { c as f } from "./index-BMzaJ9ZT.js";
import { u as m } from "./index-CECqponX.js";
import { P as p } from "./index-Si5tf8-e.js";
import { jsx as c } from "react/jsx-runtime";
var g = Object.defineProperty, u = (o, e) => g(o, "name", { value: e, configurable: !0 }), P = "Toggle", _ = /* @__PURE__ */ l.forwardRef(
  /* @__PURE__ */ u(function(e, a) {
    const { pressed: t, defaultPressed: s, onPressedChange: d, ...n } = e, [r, i] = m({
      prop: t,
      onChange: d,
      defaultProp: s ?? !1,
      caller: P
    });
    return /* @__PURE__ */ c(
      p.button,
      {
        type: "button",
        "aria-pressed": r,
        "data-state": r ? "on" : "off",
        "data-disabled": e.disabled ? "" : void 0,
        ...n,
        ref: a,
        onClick: f(e.onClick, () => {
          e.disabled || i(!r);
        })
      }
    );
  }, "Toggle")
);
export {
  _ as T
};
