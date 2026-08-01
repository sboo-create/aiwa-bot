import { jsx as e } from "react/jsx-runtime";
import { c } from "../../index-D6rtmMCZ.js";
import { c as n } from "../../utils-TrrhThB-.js";
import { IconAvatar as m } from "./avatar.js";
import { Button as d } from "./button.js";
import { S as l } from "../../index-OZUlxC0o.js";
const u = c(
  "group/attachment relative flex w-fit max-w-full min-w-0 shrink-0 flex-wrap rounded-xl border bg-card text-card-foreground transition-colors focus-within:ring-1 focus-within:ring-ring has-[>a,>button]:hover:bg-accent data-[state=error]:border-destructive data-[state=idle]:border-dashed",
  {
    variants: {
      size: {
        default: "gap-2 text-sm has-data-[slot=attachment-content]:px-2.5 has-data-[slot=attachment-content]:py-2 has-data-[slot=attachment-media]:p-2",
        sm: "gap-2.5 text-xs has-data-[slot=attachment-content]:px-2 has-data-[slot=attachment-content]:py-1.5 has-data-[slot=attachment-media]:p-1.5",
        xs: "gap-1.5 rounded-lg text-xs has-data-[slot=attachment-content]:px-1.5 has-data-[slot=attachment-content]:py-1 has-data-[slot=attachment-media]:p-1"
      },
      orientation: {
        horizontal: "min-w-40 items-center",
        vertical: "w-24 flex-col has-data-[slot=attachment-content]:w-30"
      }
    }
  }
);
function w({
  className: a,
  state: t = "done",
  size: o = "default",
  orientation: r = "horizontal",
  ...i
}) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "attachment",
      "data-state": t,
      "data-size": o,
      "data-orientation": r,
      className: n(u({ size: o, orientation: r }), a),
      ...i
    }
  );
}
const s = c(
  "relative aspect-square size-10 shrink-0 overflow-hidden group-data-[orientation=vertical]/attachment:size-auto group-data-[orientation=vertical]/attachment:w-full group-data-[size=sm]/attachment:size-8 group-data-[size=xs]/attachment:size-7 group-data-[state=error]/attachment:bg-destructive group-data-[state=error]/attachment:text-destructive-foreground group-data-[orientation=vertical]/attachment:*:data-[slot=spinner]:size-6! group-data-[size=sm]/attachment:[&_svg:not([class*='size-'])]:size-5 group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        icon: "",
        image: "flex items-center justify-center rounded-lg bg-muted text-foreground opacity-60 group-data-[state=done]/attachment:opacity-100 group-data-[state=idle]/attachment:opacity-100 *:[img]:aspect-square *:[img]:w-full *:[img]:object-cover"
      }
    },
    defaultVariants: {
      variant: "icon"
    }
  }
);
function z({
  className: a,
  variant: t = "icon",
  ...o
}) {
  return t === "icon" ? /* @__PURE__ */ e(
    m,
    {
      "data-slot": "attachment-media",
      "data-variant": "icon",
      className: n(s({ variant: t }), a),
      ...o
    }
  ) : /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "attachment-media",
      "data-variant": t,
      className: n(s({ variant: t }), a),
      ...o
    }
  );
}
function b({
  className: a,
  ...t
}) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "attachment-content",
      className: n(
        "max-w-full min-w-0 flex-1 leading-tight group-data-[orientation=vertical]/attachment:px-1",
        a
      ),
      ...t
    }
  );
}
function A({
  className: a,
  ...t
}) {
  return /* @__PURE__ */ e(
    "span",
    {
      "data-slot": "attachment-title",
      className: n(
        "block max-w-full min-w-0 truncate font-medium group-data-[state=processing]/attachment:shimmer group-data-[state=uploading]/attachment:shimmer",
        a
      ),
      ...t
    }
  );
}
function y({
  className: a,
  ...t
}) {
  return /* @__PURE__ */ e(
    "span",
    {
      "data-slot": "attachment-description",
      className: n(
        "mt-0.5 block min-w-0 truncate text-xs text-muted-foreground group-data-[state=error]/attachment:text-destructive",
        "max-w-full",
        a
      ),
      ...t
    }
  );
}
function N({
  className: a,
  ...t
}) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "attachment-actions",
      className: n(
        "relative z-20 flex shrink-0 items-center group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:top-3 group-data-[orientation=vertical]/attachment:right-3 group-data-[orientation=vertical]/attachment:gap-1",
        a
      ),
      ...t
    }
  );
}
function k({
  className: a,
  variant: t,
  size: o = "icon-sm",
  ...r
}) {
  return /* @__PURE__ */ e(
    d,
    {
      "data-slot": "attachment-action",
      variant: t ?? "ghost",
      size: o,
      className: n(a),
      ...r
    }
  );
}
function j({
  className: a,
  asChild: t = !1,
  type: o,
  ...r
}) {
  return /* @__PURE__ */ e(
    t ? l : "button",
    {
      "data-slot": "attachment-trigger",
      type: t ? void 0 : o ?? "button",
      className: n("absolute inset-0 z-10 outline-none", a),
      ...r
    }
  );
}
function V({ className: a, ...t }) {
  return /* @__PURE__ */ e(
    "div",
    {
      "data-slot": "attachment-group",
      className: n(
        "flex min-w-0 scroll-fade-x snap-x snap-mandatory scroll-px-1 scrollbar-none gap-3 overflow-x-auto overscroll-x-contain py-1 *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start",
        a
      ),
      ...t
    }
  );
}
export {
  w as Attachment,
  k as AttachmentAction,
  N as AttachmentActions,
  b as AttachmentContent,
  y as AttachmentDescription,
  V as AttachmentGroup,
  z as AttachmentMedia,
  A as AttachmentTitle,
  j as AttachmentTrigger
};
