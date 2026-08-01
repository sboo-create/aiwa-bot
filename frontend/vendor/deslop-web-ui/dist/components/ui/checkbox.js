import { jsx as i, jsxs as L, Fragment as H } from "react/jsx-runtime";
import { C as G } from "../../icons-DUsO7wRs.js";
import { c as K } from "../../utils-TrrhThB-.js";
import * as n from "react";
import { u as q } from "../../index-OZUlxC0o.js";
import { c as X } from "../../index-oVmar2KU.js";
import { c as S } from "../../index-BMzaJ9ZT.js";
import { u as $ } from "../../index-CECqponX.js";
import { u as J } from "../../index-113zfjwf.js";
import { P as Q } from "../../index-KdL-eaFo.js";
import { P as w } from "../../index-Si5tf8-e.js";
var V = Object.defineProperty, k = (e, c) => V(e, "name", { value: c, configurable: !0 }), B = "Checkbox", [W, Ce] = X(B), [Y, N] = W(B);
function A(e) {
  const {
    __scopeCheckbox: c,
    checked: f,
    children: a,
    defaultChecked: s,
    disabled: p,
    form: r,
    name: d,
    onCheckedChange: t,
    required: u,
    value: v = "on",
    // @ts-expect-error
    internal_do_not_use_render: C
  } = e, [b, m] = $({
    prop: f,
    defaultProp: s ?? !1,
    onChange: t,
    caller: B
  }), [g, I] = n.useState(null), [R, P] = n.useState(null), _ = n.useRef(!1), [o, l] = n.useReducer(
    (x) => x + 1,
    0
  ), y = g ? !!r || !!g.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), E = {
    checked: b,
    disabled: p,
    setChecked: m,
    control: g,
    setControl: I,
    name: d,
    form: r,
    value: v,
    hasConsumerStoppedPropagationRef: _,
    userInteractionCount: o,
    onUserInteraction: l,
    required: u,
    defaultChecked: h(s) ? !1 : s,
    isFormControl: y,
    bubbleInput: R,
    setBubbleInput: P
  };
  return /* @__PURE__ */ i(
    Y,
    {
      scope: c,
      ...E,
      children: F(C) ? C(E) : a
    }
  );
}
k(A, "CheckboxProvider");
var Z = "CheckboxTrigger", ee = /* @__PURE__ */ n.forwardRef(
  /* @__PURE__ */ k(function({ __scopeCheckbox: c, onKeyDown: f, onClick: a, ...s }, p) {
    const {
      control: r,
      value: d,
      disabled: t,
      checked: u,
      required: v,
      setControl: C,
      setChecked: b,
      hasConsumerStoppedPropagationRef: m,
      onUserInteraction: g,
      isFormControl: I,
      bubbleInput: R
    } = N(Z, c), P = q(p, C), _ = n.useRef(u);
    return n.useEffect(() => {
      const o = r?.form;
      if (o) {
        const l = /* @__PURE__ */ k(() => b(_.current), "reset");
        return o.addEventListener("reset", l), () => o.removeEventListener("reset", l);
      }
    }, [r, b]), /* @__PURE__ */ i(
      w.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": h(u) ? "mixed" : u,
        "aria-required": v,
        "data-state": T(u),
        "data-disabled": t ? "" : void 0,
        disabled: t,
        value: d,
        ...s,
        ref: P,
        onKeyDown: S(f, (o) => {
          o.key === "Enter" && o.preventDefault();
        }),
        onClick: S(a, (o) => {
          g(), b((l) => h(l) ? !0 : !l), R && I && (m.current = o.isPropagationStopped(), m.current || o.stopPropagation());
        })
      }
    );
  }, "CheckboxTrigger")
), te = /* @__PURE__ */ n.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ k(function(c, f) {
    const {
      __scopeCheckbox: a,
      name: s,
      checked: p,
      defaultChecked: r,
      required: d,
      disabled: t,
      value: u,
      onCheckedChange: v,
      form: C,
      ...b
    } = c;
    return /* @__PURE__ */ i(
      A,
      {
        __scopeCheckbox: a,
        checked: p,
        defaultChecked: r,
        disabled: t,
        required: d,
        onCheckedChange: v,
        name: s,
        form: C,
        value: u,
        internal_do_not_use_render: ({ isFormControl: m }) => /* @__PURE__ */ L(H, { children: [
          /* @__PURE__ */ i(
            ee,
            {
              ...b,
              ref: f,
              __scopeCheckbox: a
            }
          ),
          m && /* @__PURE__ */ i(
            ce,
            {
              __scopeCheckbox: a
            }
          )
        ] })
      }
    );
  }, "Checkbox")
), re = "CheckboxIndicator", oe = /* @__PURE__ */ n.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ k(function(c, f) {
    const { __scopeCheckbox: a, forceMount: s, ...p } = c, r = N(re, a);
    return /* @__PURE__ */ i(
      Q,
      {
        present: s || h(r.checked) || r.checked === !0,
        children: /* @__PURE__ */ i(
          w.span,
          {
            "data-state": T(r.checked),
            "data-disabled": r.disabled ? "" : void 0,
            ...p,
            ref: f,
            style: { pointerEvents: "none", ...c.style }
          }
        )
      }
    );
  }, "CheckboxIndicator")
), ne = "CheckboxBubbleInput", ce = /* @__PURE__ */ n.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ k(function({ __scopeCheckbox: c, onClick: f, ...a }, s) {
    const {
      control: p,
      hasConsumerStoppedPropagationRef: r,
      userInteractionCount: d,
      checked: t,
      defaultChecked: u,
      required: v,
      disabled: C,
      name: b,
      value: m,
      form: g,
      bubbleInput: I,
      setBubbleInput: R
    } = N(ne, c), P = q(s, R), _ = J(p), o = n.useRef(!1), l = n.useRef(t), y = n.useRef(d);
    n.useEffect(() => {
      const x = I;
      if (!x) return;
      const O = window.HTMLInputElement.prototype, M = Object.getOwnPropertyDescriptor(
        O,
        "checked"
      ).set, U = d !== y.current;
      y.current = d;
      const j = l.current !== t;
      l.current = t;
      const z = !(U && r.current);
      if (j && M) {
        o.current = !U;
        const D = new Event("click", { bubbles: z });
        x.indeterminate = h(t), M.call(x, h(t) ? !1 : t), x.dispatchEvent(D), o.current = !1;
      }
    }, [I, t, r, d]);
    const E = n.useRef(h(t) ? !1 : t);
    return /* @__PURE__ */ i(
      w.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: u ?? E.current,
        required: v,
        disabled: C,
        name: b,
        value: m,
        form: g,
        ...a,
        tabIndex: -1,
        ref: P,
        onClick: S(f, (x) => {
          o.current && x.stopPropagation();
        }),
        style: {
          ...a.style,
          ..._,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }, "CheckboxBubbleInput")
);
function F(e) {
  return typeof e == "function";
}
k(F, "isFunction");
function h(e) {
  return e === "indeterminate";
}
k(h, "isIndeterminate");
function T(e) {
  return h(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
k(T, "getState");
function me({
  className: e,
  ...c
}) {
  return /* @__PURE__ */ i(
    te,
    {
      "data-slot": "checkbox",
      className: K(
        "peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input dark:data-[state=checked]:bg-primary",
        e
      ),
      ...c,
      children: /* @__PURE__ */ i(
        oe,
        {
          "data-slot": "checkbox-indicator",
          className: "grid place-content-center text-current transition-none",
          children: /* @__PURE__ */ i(G, { className: "size-3.5" })
        }
      )
    }
  );
}
export {
  me as Checkbox
};
