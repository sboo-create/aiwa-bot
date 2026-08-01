import { jsx as a, jsxs as f } from "react/jsx-runtime";
import { useMemo as u } from "react";
import { c } from "../../index-D6rtmMCZ.js";
import { c as l } from "../../utils-TrrhThB-.js";
import { Label as m } from "./label.js";
import { Separator as p } from "./separator.js";
function F({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "fieldset",
    {
      "data-slot": "field-set",
      className: l(
        "flex flex-col gap-6",
        "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        t
      ),
      ...e
    }
  );
}
function k({
  className: t,
  variant: e = "legend",
  ...o
}) {
  return /* @__PURE__ */ a(
    "legend",
    {
      "data-slot": "field-legend",
      "data-variant": e,
      className: l(
        "mb-3 font-medium",
        "data-[variant=legend]:text-base",
        "data-[variant=label]:text-sm",
        t
      ),
      ...o
    }
  );
}
function y({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "field-group",
      className: l(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        t
      ),
      ...e
    }
  );
}
const g = c(
  "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
        horizontal: [
          "flex-row items-center",
          "[&>[data-slot=field-label]]:flex-auto",
          "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
        ],
        responsive: [
          "flex-col @md/field-group:flex-row @md/field-group:items-center [&>*]:w-full @md/field-group:[&>*]:w-auto [&>.sr-only]:w-auto",
          "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
          "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
        ]
      }
    },
    defaultVariants: {
      orientation: "vertical"
    }
  }
);
function L({
  className: t,
  orientation: e = "vertical",
  ...o
}) {
  return /* @__PURE__ */ a(
    "div",
    {
      role: "group",
      "data-slot": "field",
      "data-orientation": e,
      className: l(g({ orientation: e }), t),
      ...o
    }
  );
}
function S({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "field-content",
      className: l(
        "group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
        t
      ),
      ...e
    }
  );
}
function j({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ a(
    m,
    {
      "data-slot": "field-label",
      className: l(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
        "has-data-[state=checked]:border-primary has-data-[state=checked]:bg-accent",
        t
      ),
      ...e
    }
  );
}
function z({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "field-label",
      className: l(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",
        t
      ),
      ...e
    }
  );
}
function E({ className: t, ...e }) {
  return /* @__PURE__ */ a(
    "p",
    {
      "data-slot": "field-description",
      className: l(
        "text-sm leading-normal font-normal text-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance",
        "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        t
      ),
      ...e
    }
  );
}
function M({
  children: t,
  className: e,
  ...o
}) {
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "field-separator",
      "data-content": !!t,
      className: l(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        e
      ),
      ...o,
      children: [
        /* @__PURE__ */ a(p, { className: "absolute inset-0 top-1/2" }),
        t && /* @__PURE__ */ a(
          "span",
          {
            className: "relative mx-auto block w-fit bg-background px-2 text-muted-foreground",
            "data-slot": "field-separator-content",
            children: t
          }
        )
      ]
    }
  );
}
function V({
  className: t,
  children: e,
  errors: o,
  ...n
}) {
  const r = u(() => {
    if (e)
      return e;
    if (!o?.length)
      return null;
    const i = [
      ...new Map(o.map((d) => [d?.message, d])).values()
    ];
    return i?.length == 1 ? i[0]?.message : /* @__PURE__ */ a("ul", { className: "ml-4 flex list-disc flex-col gap-1", children: i.map(
      (d, s) => d?.message && /* @__PURE__ */ a("li", { children: d.message }, s)
    ) });
  }, [e, o]);
  return r ? /* @__PURE__ */ a(
    "div",
    {
      role: "alert",
      "data-slot": "field-error",
      className: l("text-sm font-normal text-destructive", t),
      ...n,
      children: r
    }
  ) : null;
}
export {
  L as Field,
  S as FieldContent,
  E as FieldDescription,
  V as FieldError,
  y as FieldGroup,
  j as FieldLabel,
  k as FieldLegend,
  M as FieldSeparator,
  F as FieldSet,
  z as FieldTitle
};
