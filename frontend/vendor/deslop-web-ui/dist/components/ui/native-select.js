import { jsxs as r, jsx as a } from "react/jsx-runtime";
import { c as i } from "../../icons-DUsO7wRs.js";
import { c as o } from "../../utils-TrrhThB-.js";
function d({
  className: e,
  size: t = "default",
  ...n
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: "group/native-select relative w-fit has-[select:disabled]:opacity-50",
      "data-slot": "native-select-wrapper",
      children: [
        /* @__PURE__ */ a(
          "select",
          {
            "data-slot": "native-select",
            "data-size": t,
            className: o(
              "h-9 w-full min-w-0 appearance-none rounded-md border border-input bg-transparent px-3 py-2 pr-9 text-sm shadow-xs transition-[color,box-shadow] outline-none hover:bg-accent selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed data-[size=sm]:h-8 data-[size=sm]:py-1 dark:bg-input",
              "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring",
              "aria-invalid:border-destructive aria-invalid:ring-destructive",
              e
            ),
            ...n
          }
        ),
        /* @__PURE__ */ a(
          i,
          {
            className: "pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground opacity-50 select-none",
            "aria-hidden": "true",
            "data-slot": "native-select-icon"
          }
        )
      ]
    }
  );
}
function p({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ a(
    "option",
    {
      "data-slot": "native-select-option",
      className: o("bg-[Canvas] text-[CanvasText]", e),
      ...t
    }
  );
}
function u({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ a(
    "optgroup",
    {
      "data-slot": "native-select-optgroup",
      className: o("bg-[Canvas] text-[CanvasText]", e),
      ...t
    }
  );
}
export {
  d as NativeSelect,
  u as NativeSelectOptGroup,
  p as NativeSelectOption
};
