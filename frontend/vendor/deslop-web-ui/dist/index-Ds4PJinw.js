import * as o from "react";
import { c as T } from "./index-BMzaJ9ZT.js";
import { c as w } from "./index-oVmar2KU.js";
import { u as A } from "./index-CECqponX.js";
import { u as S } from "./index-CCKe-Mpx.js";
import { u as D } from "./index-OZUlxC0o.js";
import { P as h } from "./index-Si5tf8-e.js";
import { P as M } from "./index-KdL-eaFo.js";
import { u as L } from "./index-DAdtpYSB.js";
import { jsx as p } from "react/jsx-runtime";
var k = Object.defineProperty, u = (r, t) => k(r, "name", { value: t, configurable: !0 }), R = "Collapsible", [F, W] = w(R), [j, P] = F(R), X = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ u(function(t, i) {
    const {
      __scopeCollapsible: s,
      open: a,
      defaultOpen: e,
      disabled: c,
      onOpenChange: l,
      ...b
    } = t, [f, d] = A({
      prop: a,
      defaultProp: e ?? !1,
      onChange: l,
      caller: R
    });
    return /* @__PURE__ */ p(
      j,
      {
        scope: s,
        disabled: c,
        contentId: L(),
        open: f,
        onOpenToggle: o.useCallback(() => d((g) => !g), [d]),
        children: /* @__PURE__ */ p(
          h.div,
          {
            "data-state": C(f),
            "data-disabled": c ? "" : void 0,
            ...b,
            ref: i
          }
        )
      }
    );
  }, "Collapsible")
), B = "CollapsibleTrigger", Y = /* @__PURE__ */ o.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ u(function(t, i) {
    const { __scopeCollapsible: s, ...a } = t, e = P(B, s);
    return /* @__PURE__ */ p(
      h.button,
      {
        type: "button",
        "aria-controls": e.open ? e.contentId : void 0,
        "aria-expanded": e.open || !1,
        "data-state": C(e.open),
        "data-disabled": e.disabled ? "" : void 0,
        disabled: e.disabled,
        ...a,
        ref: i,
        onClick: T(t.onClick, e.onOpenToggle)
      }
    );
  }, "CollapsibleTrigger")
), O = "CollapsibleContent", Z = /* @__PURE__ */ o.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ u(function(t, i) {
    const { forceMount: s, ...a } = t, e = P(O, t.__scopeCollapsible);
    return /* @__PURE__ */ p(M, { present: s || e.open, children: ({ present: c }) => /* @__PURE__ */ p(G, { ...a, ref: i, present: c }) });
  }, "CollapsibleContent")
), G = /* @__PURE__ */ o.forwardRef(/* @__PURE__ */ u(function(t, i) {
  const { __scopeCollapsible: s, present: a, children: e, ...c } = t, l = P(O, s), [b, f] = o.useState(a), d = o.useRef(null), g = D(i, d), _ = o.useRef(0), x = _.current, y = o.useRef(0), I = y.current, v = l.open || b, N = o.useRef(v), m = o.useRef(void 0);
  return o.useEffect(() => {
    const n = requestAnimationFrame(() => N.current = !1);
    return () => cancelAnimationFrame(n);
  }, []), S(() => {
    const n = d.current;
    if (n) {
      m.current = m.current || {
        transitionDuration: n.style.transitionDuration,
        animationName: n.style.animationName
      }, n.style.transitionDuration = "0s", n.style.animationName = "none";
      const E = n.getBoundingClientRect();
      _.current = E.height, y.current = E.width, N.current || (n.style.transitionDuration = m.current.transitionDuration, n.style.animationName = m.current.animationName), f(a);
    }
  }, [l.open, a]), /* @__PURE__ */ p(
    h.div,
    {
      "data-state": C(l.open),
      "data-disabled": l.disabled ? "" : void 0,
      id: l.contentId,
      hidden: !v,
      ...c,
      ref: g,
      style: {
        "--radix-collapsible-content-height": x ? `${x}px` : void 0,
        "--radix-collapsible-content-width": I ? `${I}px` : void 0,
        ...t.style
      },
      children: v && e
    }
  );
}, "CollapsibleContentImpl"));
function C(r) {
  return r ? "open" : "closed";
}
u(C, "getState");
export {
  X as C,
  Y as a,
  Z as b,
  W as c
};
