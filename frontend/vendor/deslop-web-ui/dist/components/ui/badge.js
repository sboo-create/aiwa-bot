import { jsx as s } from "react/jsx-runtime";
import { c as l } from "../../index-D6rtmMCZ.js";
import { c as b } from "../../utils-TrrhThB-.js";
import { S as g } from "../../index-OZUlxC0o.js";
const c = l(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-sm px-2 py-1 font-sans text-base font-normal whitespace-nowrap tabular-nums outline-none transition-[color,background-color,border-color,box-shadow] focus-visible:ring-[3px] focus-visible:ring-ring [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        filled: "bg-badge-accent text-badge-on-accent",
        tinted: "bg-badge-fill text-badge-accent",
        gray: "bg-badge-fill text-badge-foreground",
        media: "bg-badge-media text-badge-foreground",
        outlined: "border-[0.5px] border-badge-border bg-transparent text-badge-foreground",
        default: "bg-badge-accent text-badge-on-accent",
        secondary: "bg-badge-fill text-badge-foreground",
        outline: "border-[0.5px] border-badge-border bg-transparent text-badge-foreground"
      },
      textVariant: {
        title1: "px-3 py-1.5 text-3xl font-bold tracking-tight",
        title2: "px-3 py-1.5 text-2xl font-bold tracking-tight",
        title3: "px-3 py-1.5 text-xl font-bold tracking-tight",
        body: "text-base",
        callout: "text-base",
        subheadline1: "text-sm",
        subheadline2: "text-sm",
        footnote: "rounded-xs text-sm",
        caption1: "font-caps text-xs uppercase",
        caption2: "font-caps text-xs uppercase",
        overline: "font-caps text-xs uppercase"
      },
      weight: {
        regular: "font-normal",
        medium: "font-semibold",
        semibold: "font-semibold",
        bold: "font-bold"
      },
      shape: {
        default: "",
        circled: "rounded-full p-1",
        squared: "rounded-sm p-1"
      }
    },
    defaultVariants: {
      variant: "filled",
      textVariant: "caption1",
      weight: "semibold",
      shape: "default"
    }
  }
);
function v({
  className: n,
  variant: e = "filled",
  textVariant: t = "caption1",
  weight: r = "semibold",
  circled: a = !1,
  squared: o = !1,
  asChild: d = !1,
  ...i
}) {
  return /* @__PURE__ */ s(
    d ? g : "span",
    {
      "data-slot": "badge",
      "data-variant": e,
      "data-text-variant": t,
      "data-circled": a || void 0,
      "data-squared": o || void 0,
      className: b(
        c({ variant: e, textVariant: t, weight: r, shape: o ? "squared" : a ? "circled" : "default" }),
        n
      ),
      ...i
    }
  );
}
export {
  v as Badge,
  c as badgeVariants
};
