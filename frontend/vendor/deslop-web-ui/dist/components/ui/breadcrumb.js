import { jsx as a, jsxs as n } from "react/jsx-runtime";
import { M as o, d as i } from "../../icons-DUsO7wRs.js";
import { c as t } from "../../utils-TrrhThB-.js";
import { S as l } from "../../index-OZUlxC0o.js";
function p({ ...r }) {
  return /* @__PURE__ */ a("nav", { "aria-label": "breadcrumb", "data-slot": "breadcrumb", ...r });
}
function f({ className: r, ...e }) {
  return /* @__PURE__ */ a(
    "ol",
    {
      "data-slot": "breadcrumb-list",
      className: t(
        "flex flex-wrap items-center gap-1.5 text-sm break-words text-muted-foreground sm:gap-2.5",
        r
      ),
      ...e
    }
  );
}
function g({ className: r, ...e }) {
  return /* @__PURE__ */ a(
    "li",
    {
      "data-slot": "breadcrumb-item",
      className: t("inline-flex items-center gap-1.5", r),
      ...e
    }
  );
}
function x({
  asChild: r,
  className: e,
  ...s
}) {
  return /* @__PURE__ */ a(
    r ? l : "a",
    {
      "data-slot": "breadcrumb-link",
      className: t("transition-colors hover:text-foreground", e),
      ...s
    }
  );
}
function h({ className: r, ...e }) {
  return /* @__PURE__ */ a(
    "span",
    {
      "data-slot": "breadcrumb-page",
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: t("font-normal text-foreground", r),
      ...e
    }
  );
}
function N({
  children: r,
  className: e,
  ...s
}) {
  return /* @__PURE__ */ a(
    "li",
    {
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      "aria-hidden": "true",
      className: t("[&>svg]:size-3.5", e),
      ...s,
      children: r ?? /* @__PURE__ */ a(i, {})
    }
  );
}
function B({
  className: r,
  ...e
}) {
  return /* @__PURE__ */ n(
    "span",
    {
      "data-slot": "breadcrumb-ellipsis",
      role: "presentation",
      "aria-hidden": "true",
      className: t("flex size-9 items-center justify-center", r),
      ...e,
      children: [
        /* @__PURE__ */ a(o, { className: "size-4" }),
        /* @__PURE__ */ a("span", { className: "sr-only", children: "More" })
      ]
    }
  );
}
export {
  p as Breadcrumb,
  B as BreadcrumbEllipsis,
  g as BreadcrumbItem,
  x as BreadcrumbLink,
  f as BreadcrumbList,
  h as BreadcrumbPage,
  N as BreadcrumbSeparator
};
