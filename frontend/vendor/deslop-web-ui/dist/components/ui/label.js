import { jsx as r } from "react/jsx-runtime";
import { c as n } from "../../utils-TrrhThB-.js";
import * as i from "react";
import { P as l } from "../../index-Si5tf8-e.js";
var s = Object.defineProperty, d = (a, e) => s(a, "name", { value: e, configurable: !0 }), u = /* @__PURE__ */ i.forwardRef(
  /* @__PURE__ */ d(function(e, o) {
    return /* @__PURE__ */ r(
      l.label,
      {
        ...e,
        ref: o,
        onMouseDown: (t) => {
          t.target.closest("button, input, select, textarea") || (e.onMouseDown?.(t), !t.defaultPrevented && t.detail > 1 && t.preventDefault());
        }
      }
    );
  }, "Label")
);
function b({
  className: a,
  ...e
}) {
  return /* @__PURE__ */ r(
    u,
    {
      "data-slot": "label",
      className: n(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        a
      ),
      ...e
    }
  );
}
export {
  b as Label
};
