import { jsx as a } from "react/jsx-runtime";
import { c as o } from "../../index-D6rtmMCZ.js";
import { c as i } from "../../utils-TrrhThB-.js";
import { IconAvatar as m } from "./avatar.js";
import { Separator as d } from "./separator.js";
import { S as u } from "../../index-OZUlxC0o.js";
function N({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      role: "list",
      "data-slot": "item-group",
      className: i("group/item-group flex flex-col", e),
      ...t
    }
  );
}
function h({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ a(
    d,
    {
      "data-slot": "item-separator",
      orientation: "horizontal",
      className: i("my-0", e),
      ...t
    }
  );
}
const c = o(
  "group/item flex flex-wrap items-center rounded-md border border-transparent text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring [a]:transition-colors [a]:hover:bg-accent",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted"
      },
      size: {
        default: "gap-4 p-4",
        sm: "gap-2.5 px-4 py-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function z({
  className: e,
  variant: t = "default",
  size: r = "default",
  asChild: s = !1,
  ...l
}) {
  return /* @__PURE__ */ a(
    s ? u : "div",
    {
      "data-slot": "item",
      "data-variant": t,
      "data-size": r,
      className: i(c({ variant: t, size: r, className: e })),
      ...l
    }
  );
}
const n = o(
  "flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-8 [&_svg:not([class*='size-'])]:size-4",
        image: "size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function y({
  className: e,
  variant: t = "default",
  ...r
}) {
  return t === "icon" ? /* @__PURE__ */ a(
    m,
    {
      "data-slot": "item-media",
      "data-variant": "icon",
      className: i(n({ variant: t }), e),
      ...r
    }
  ) : /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "item-media",
      "data-variant": t,
      className: i(n({ variant: t, className: e })),
      ...r
    }
  );
}
function j({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "item-content",
      className: i(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none",
        e
      ),
      ...t
    }
  );
}
function w({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "item-title",
      className: i(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium",
        e
      ),
      ...t
    }
  );
}
function S({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "p",
    {
      "data-slot": "item-description",
      className: i(
        "line-clamp-2 text-sm leading-normal font-normal text-balance text-muted-foreground",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        e
      ),
      ...t
    }
  );
}
function V({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "item-actions",
      className: i("flex items-center gap-2", e),
      ...t
    }
  );
}
function _({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "item-header",
      className: i(
        "flex basis-full items-center justify-between gap-2",
        e
      ),
      ...t
    }
  );
}
function C({ className: e, ...t }) {
  return /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "item-footer",
      className: i(
        "flex basis-full items-center justify-between gap-2",
        e
      ),
      ...t
    }
  );
}
export {
  z as Item,
  V as ItemActions,
  j as ItemContent,
  S as ItemDescription,
  C as ItemFooter,
  N as ItemGroup,
  _ as ItemHeader,
  y as ItemMedia,
  h as ItemSeparator,
  w as ItemTitle
};
