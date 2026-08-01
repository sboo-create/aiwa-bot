import { jsx as a } from "react/jsx-runtime";
import { c as i } from "../../index-D6rtmMCZ.js";
import { c as o } from "../../utils-TrrhThB-.js";
import { T as s } from "../../index-DI-Iigq5.js";
const c = i(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "h-9 min-w-9 px-2",
        sm: "h-8 min-w-8 px-1.5",
        lg: "h-10 min-w-10 px-2.5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function v({
  className: e,
  variant: t,
  size: n,
  ...r
}) {
  return /* @__PURE__ */ a(
    s,
    {
      "data-slot": "toggle",
      className: o(c({ variant: t, size: n, className: e })),
      ...r
    }
  );
}
export {
  v as Toggle,
  c as toggleVariants
};
