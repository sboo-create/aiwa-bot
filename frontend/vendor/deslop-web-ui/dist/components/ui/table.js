import { jsx as a } from "react/jsx-runtime";
import { c as r } from "../../utils-TrrhThB-.js";
function b({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto rounded-2xl border border-separator",
      children: /* @__PURE__ */ a(
        "table",
        {
          "data-slot": "table",
          className: r(
            "w-full border-separate border-spacing-0 caption-bottom text-sm",
            t
          ),
          ...e
        }
      )
    }
  );
}
function d({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "thead",
    {
      "data-slot": "table-header",
      className: r("bg-accent [&_tr]:border-0", t),
      ...e
    }
  );
}
function s({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "tbody",
    {
      "data-slot": "table-body",
      className: r("[&_tr:last-child>td]:border-b-0", t),
      ...e
    }
  );
}
function n({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: r(
        "bg-accent font-medium [&>tr:last-child>td]:border-b-0",
        t
      ),
      ...e
    }
  );
}
function c({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "tr",
    {
      "data-slot": "table-row",
      className: r("border-0 data-[state=selected]:bg-accent", t),
      ...e
    }
  );
}
function i({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "th",
    {
      "data-slot": "table-head",
      className: r(
        "border-r border-b border-separator px-3 py-2.5 text-left align-top font-semibold whitespace-nowrap text-foreground last:border-r-0 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        t
      ),
      ...e
    }
  );
}
function p({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "td",
    {
      "data-slot": "table-cell",
      className: r(
        "border-r border-b border-separator px-3 py-2.5 align-top whitespace-nowrap last:border-r-0 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        t
      ),
      ...e
    }
  );
}
function u({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    "caption",
    {
      "data-slot": "table-caption",
      className: r("mt-4 text-sm text-muted-foreground", t),
      ...e
    }
  );
}
export {
  b as Table,
  s as TableBody,
  u as TableCaption,
  p as TableCell,
  n as TableFooter,
  i as TableHead,
  d as TableHeader,
  c as TableRow
};
