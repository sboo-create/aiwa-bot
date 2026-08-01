import { jsx as o } from "react/jsx-runtime";
import { L as i } from "../../icons-DUsO7wRs.js";
import { c as n } from "../../utils-TrrhThB-.js";
function m({ className: r, ...a }) {
  return /* @__PURE__ */ o(
    i,
    {
      role: "status",
      "aria-label": "Loading",
      className: n("size-4 animate-spin", r),
      ...a
    }
  );
}
export {
  m as Spinner
};
