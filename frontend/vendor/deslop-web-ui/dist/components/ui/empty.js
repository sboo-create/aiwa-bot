import { jsx as a } from "react/jsx-runtime";
import { c as m } from "../../index-D6rtmMCZ.js";
import { c as n } from "../../utils-TrrhThB-.js";
import { IconAvatar as s } from "./avatar.js";
function f({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty",
      className: n(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
        e
      ),
      ...t
    }
  );
}
function p({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty-header",
      className: n(
        "flex max-w-sm flex-col items-center gap-2 text-center",
        e
      ),
      ...t
    }
  );
}
const i = m(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: ""
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function u({
  className: e,
  variant: t = "default",
  ...r
}) {
  return t === "icon" ? /* @__PURE__ */ a(
    s,
    {
      "data-slot": "empty-icon",
      "data-variant": "icon",
      className: n(i({ variant: t }), e),
      ...r
    }
  ) : /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": t,
      className: n(i({ variant: t, className: e })),
      ...r
    }
  );
}
function x({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty-title",
      className: n("text-lg font-medium tracking-tight", e),
      ...t
    }
  );
}
function y({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty-description",
      className: n(
        "text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        e
      ),
      ...t
    }
  );
}
function v({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "empty-content",
      className: n(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
        e
      ),
      ...t
    }
  );
}
export {
  f as Empty,
  v as EmptyContent,
  y as EmptyDescription,
  p as EmptyHeader,
  u as EmptyMedia,
  x as EmptyTitle
};
