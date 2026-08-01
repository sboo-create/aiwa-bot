import { jsx as t } from "react/jsx-runtime";
import { c as s } from "../../utils-TrrhThB-.js";
function l({ className: e, ...a }) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-slot": "message-group",
      className: s("flex min-w-0 flex-col gap-2", e),
      ...a
    }
  );
}
function m({
  className: e,
  align: a = "start",
  ...r
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-slot": "message",
      "data-align": a,
      className: s(
        "group/message relative flex w-full min-w-0 gap-2 text-sm data-[align=end]:flex-row-reverse",
        e
      ),
      ...r
    }
  );
}
function d({ className: e, ...a }) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-slot": "message-avatar",
      className: s(
        "flex w-fit min-w-8 shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-muted group-has-data-[slot=message-footer]/message:-translate-y-8",
        e
      ),
      ...a
    }
  );
}
function g({ className: e, ...a }) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-slot": "message-content",
      className: s(
        "flex w-full min-w-0 flex-col gap-2.5 wrap-break-word group-data-[align=end]/message:*:data-slot:self-end",
        e
      ),
      ...a
    }
  );
}
function i({ className: e, ...a }) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-slot": "message-header",
      className: s(
        "flex max-w-full min-w-0 items-center px-3 text-xs font-medium text-muted-foreground group-has-data-[variant=ghost]/message:px-0",
        e
      ),
      ...a
    }
  );
}
function u({ className: e, ...a }) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-slot": "message-footer",
      className: s(
        "flex max-w-full min-w-0 items-center px-3 text-xs font-medium text-muted-foreground group-has-data-[variant=ghost]/message:px-0 group-data-[align=end]/message:justify-end",
        e
      ),
      ...a
    }
  );
}
export {
  m as Message,
  d as MessageAvatar,
  g as MessageContent,
  u as MessageFooter,
  l as MessageGroup,
  i as MessageHeader
};
