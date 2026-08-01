import { jsx as l } from "react/jsx-runtime";
import { c as f } from "../../utils-TrrhThB-.js";
import * as m from "react";
import { P as v } from "../../index-Si5tf8-e.js";
var u = Object.defineProperty, c = (r, a) => u(r, "name", { value: a, configurable: !0 }), e = "horizontal", O = ["horizontal", "vertical"], h = /* @__PURE__ */ m.forwardRef(
  /* @__PURE__ */ c(function(a, t) {
    const { decorative: o, orientation: n = e, ...p } = a, i = s(n) ? n : e, d = o ? { role: "none" } : { "aria-orientation": i === "vertical" ? i : void 0, role: "separator" };
    return /* @__PURE__ */ l(
      v.div,
      {
        "data-orientation": i,
        ...d,
        ...p,
        ref: t
      }
    );
  }, "Separator")
);
function s(r) {
  return O.includes(r);
}
c(s, "isValidOrientation");
function T({
  className: r,
  orientation: a = "horizontal",
  decorative: t = !0,
  ...o
}) {
  return /* @__PURE__ */ l(
    h,
    {
      "data-slot": "separator",
      decorative: t,
      orientation: a,
      className: f(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        r
      ),
      ...o
    }
  );
}
export {
  T as Separator
};
