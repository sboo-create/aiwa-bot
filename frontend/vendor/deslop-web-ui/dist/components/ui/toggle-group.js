import { jsx as o } from "react/jsx-runtime";
import { c as h } from "../../utils-TrrhThB-.js";
import * as i from "react";
import { c as y } from "../../index-oVmar2KU.js";
import { P as T } from "../../index-Si5tf8-e.js";
import { c as P, R as V, a as M } from "../../index-JYieXO2U.js";
import { T as F } from "../../index-DI-Iigq5.js";
import { u as _ } from "../../index-CECqponX.js";
import { u as k } from "../../index-B0BN408G.js";
var A = Object.defineProperty, p = (g, e) => A(g, "name", { value: e, configurable: !0 }), v = "ToggleGroup", [b, Q] = y(v, [
  P
]), C = P(), D = /* @__PURE__ */ i.forwardRef(/* @__PURE__ */ p(function(e, t) {
  const { type: l, ...n } = e;
  if (l === "single")
    return /* @__PURE__ */ o(E, { role: "radiogroup", ...n, ref: t });
  if (l === "multiple")
    return /* @__PURE__ */ o(N, { role: "toolbar", ...n, ref: t });
  throw new Error(`Missing prop \`type\` expected on \`${v}\``);
}, "ToggleGroup")), [x, w] = b(v), E = /* @__PURE__ */ i.forwardRef(/* @__PURE__ */ p(function(e, t) {
  const {
    value: l,
    defaultValue: n,
    onValueChange: a = /* @__PURE__ */ p(() => {
    }, "onValueChange"),
    ...u
  } = e, [s, r] = _({
    prop: l,
    defaultProp: n ?? "",
    onChange: a,
    caller: v
  });
  return /* @__PURE__ */ o(
    x,
    {
      scope: e.__scopeToggleGroup,
      type: "single",
      value: i.useMemo(() => s ? [s] : [], [s]),
      onItemActivate: r,
      onItemDeactivate: i.useCallback(() => r(""), [r]),
      children: /* @__PURE__ */ o(R, { ...u, ref: t })
    }
  );
}, "ToggleGroupImplSingle")), N = /* @__PURE__ */ i.forwardRef(/* @__PURE__ */ p(function(e, t) {
  const {
    value: l,
    defaultValue: n,
    onValueChange: a = /* @__PURE__ */ p(() => {
    }, "onValueChange"),
    ...u
  } = e, [s, r] = _({
    prop: l,
    defaultProp: n ?? [],
    onChange: a,
    caller: v
  }), c = i.useCallback(
    (m) => r((d = []) => [...d, m]),
    [r]
  ), f = i.useCallback(
    (m) => r((d = []) => d.filter((S) => S !== m)),
    [r]
  );
  return /* @__PURE__ */ o(
    x,
    {
      scope: e.__scopeToggleGroup,
      type: "multiple",
      value: s,
      onItemActivate: c,
      onItemDeactivate: f,
      children: /* @__PURE__ */ o(R, { ...u, ref: t })
    }
  );
}, "ToggleGroupImplMultiple")), [j, O] = b(v), R = /* @__PURE__ */ i.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ p(function(e, t) {
    const {
      __scopeToggleGroup: l,
      disabled: n = !1,
      rovingFocus: a = !0,
      orientation: u,
      dir: s,
      loop: r = !0,
      ...c
    } = e, f = C(l), m = k(s), d = { dir: m, ...c };
    return /* @__PURE__ */ o(j, { scope: l, rovingFocus: a, disabled: n, children: a ? /* @__PURE__ */ o(
      V,
      {
        asChild: !0,
        ...f,
        orientation: u,
        dir: m,
        loop: r,
        children: /* @__PURE__ */ o(T.div, { ...d, ref: t })
      }
    ) : /* @__PURE__ */ o(T.div, { ...d, ref: t }) });
  }, "ToggleGroupImpl")
), G = "ToggleGroupItem", $ = /* @__PURE__ */ i.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ p(function(e, t) {
    const l = w(G, e.__scopeToggleGroup), n = O(G, e.__scopeToggleGroup), a = C(e.__scopeToggleGroup), u = l.value.includes(e.value), s = n.disabled || e.disabled, r = { ...e, pressed: u, disabled: s }, c = i.useRef(null);
    return n.rovingFocus ? /* @__PURE__ */ o(
      M,
      {
        asChild: !0,
        ...a,
        focusable: !s,
        active: u,
        ref: c,
        children: /* @__PURE__ */ o(I, { ...r, ref: t })
      }
    ) : /* @__PURE__ */ o(I, { ...r, ref: t });
  }, "ToggleGroupItem")
), I = /* @__PURE__ */ i.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ p(function(e, t) {
    const { __scopeToggleGroup: l, value: n, ...a } = e, u = w(G, l), s = { role: "radio", "aria-checked": e.pressed, "aria-pressed": void 0 }, r = u.type === "single" ? s : void 0;
    return /* @__PURE__ */ o(
      F,
      {
        ...r,
        ...a,
        ref: t,
        onPressedChange: (c) => {
          c ? u.onItemActivate(n) : u.onItemDeactivate(n);
        }
      }
    );
  }, "ToggleGroupItemImpl")
);
function W({
  className: g,
  ...e
}) {
  return /* @__PURE__ */ o(
    D,
    {
      "data-slot": "toggle-group",
      className: h(
        "inline-flex w-fit items-center gap-1 overflow-hidden rounded-segmented bg-accent p-0.5",
        g
      ),
      ...e
    }
  );
}
function X({
  className: g,
  ...e
}) {
  return /* @__PURE__ */ o(
    $,
    {
      "data-slot": "toggle-group-item",
      className: h(
        "relative inline-flex min-w-0 flex-1 shrink-0 items-center justify-center gap-1.5 rounded-segmented-indicator border-0 bg-transparent px-4 py-1.5 text-xs font-semibold whitespace-nowrap text-foreground shadow-none transition-colors outline-none hover:bg-transparent focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-card data-[state=on]:text-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        g
      ),
      ...e
    }
  );
}
export {
  W as ToggleGroup,
  X as ToggleGroupItem
};
