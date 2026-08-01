import { jsx as r } from "react/jsx-runtime";
import * as s from "react";
import { P as n } from "../../index-Si5tf8-e.js";
var c = Object.defineProperty, d = (t, o) => c(t, "name", { value: o, configurable: !0 }), f = /* @__PURE__ */ s.forwardRef(
  /* @__PURE__ */ d(function(o, e) {
    const { ratio: a = 1 / 1, style: i, ...p } = o;
    return /* @__PURE__ */ r(
      "div",
      {
        style: {
          // ensures inner element is contained
          position: "relative",
          // ensures padding bottom trick maths works
          width: "100%",
          paddingBottom: `${100 / a}%`
        },
        "data-radix-aspect-ratio-wrapper": "",
        children: /* @__PURE__ */ r(
          n.div,
          {
            ...p,
            ref: e,
            style: {
              ...i,
              // ensures children expand in ratio
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            }
          }
        )
      }
    );
  }, "AspectRatio")
);
function u({
  ...t
}) {
  return /* @__PURE__ */ r(f, { "data-slot": "aspect-ratio", ...t });
}
export {
  u as AspectRatio
};
