import { jsx as i } from "react/jsx-runtime";
import { c as t } from "../../utils-TrrhThB-.js";
function n({ className: e, ...r }) {
  return /* @__PURE__ */ i(
    "textarea",
    {
      "data-slot": "textarea",
      className: t(
        "flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive md:text-sm dark:bg-input",
        e
      ),
      ...r
    }
  );
}
export {
  n as Textarea
};
