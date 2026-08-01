import { jsx as r } from "react/jsx-runtime";
import { c as o } from "../../utils-TrrhThB-.js";
function n({ className: t, ...a }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "card",
      className: o(
        "flex flex-col gap-6 rounded-section border bg-card py-6 text-card-foreground shadow-sm",
        t
      ),
      ...a
    }
  );
}
function s({ className: t, ...a }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "card-header",
      className: o(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        t
      ),
      ...a
    }
  );
}
function c({ className: t, ...a }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "card-title",
      className: o("leading-none font-semibold", t),
      ...a
    }
  );
}
function i({ className: t, ...a }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "card-description",
      className: o("text-sm text-muted-foreground", t),
      ...a
    }
  );
}
function l({ className: t, ...a }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "card-action",
      className: o(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        t
      ),
      ...a
    }
  );
}
function u({ className: t, ...a }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "card-content",
      className: o("px-6", t),
      ...a
    }
  );
}
function f({ className: t, ...a }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "card-footer",
      className: o("flex items-center px-6 [.border-t]:pt-6", t),
      ...a
    }
  );
}
export {
  n as Card,
  l as CardAction,
  u as CardContent,
  i as CardDescription,
  f as CardFooter,
  s as CardHeader,
  c as CardTitle
};
