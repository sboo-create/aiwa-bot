import { jsx as p, jsxs as z, Fragment as D } from "react/jsx-runtime";
import { c as M } from "../../utils-TrrhThB-.js";
import * as e from "react";
import { c as N } from "../../index-BMzaJ9ZT.js";
import { u as U } from "../../index-OZUlxC0o.js";
import { c as G } from "../../index-oVmar2KU.js";
import { u as W } from "../../index-CECqponX.js";
import { u as X } from "../../index-113zfjwf.js";
import { P as x } from "../../index-Si5tf8-e.js";
var $ = Object.defineProperty, w = (t, r) => $(t, "name", { value: r, configurable: !0 }), E = "Switch", [J, fe] = G(E), [K, T] = J(E);
function q(t) {
  const {
    __scopeSwitch: r,
    checked: d,
    children: o,
    defaultChecked: a,
    disabled: c,
    form: i,
    name: u,
    onCheckedChange: n,
    required: l,
    value: S = "on",
    // @ts-expect-error
    internal_do_not_use_render: m
  } = t, [f, b] = W({
    prop: d,
    defaultProp: a ?? !1,
    onChange: n,
    caller: E
  }), [g, C] = e.useState(null), [v, R] = e.useState(null), _ = e.useRef(!1), [s, h] = e.useReducer(
    (k) => k + 1,
    0
  ), I = g ? !!i || !!g.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), P = {
    checked: f,
    setChecked: b,
    disabled: c,
    control: g,
    setControl: C,
    name: u,
    form: i,
    value: S,
    hasConsumerStoppedPropagationRef: _,
    userInteractionCount: s,
    onUserInteraction: h,
    required: l,
    defaultChecked: a,
    isFormControl: I,
    bubbleInput: v,
    setBubbleInput: R
  };
  return /* @__PURE__ */ p(K, { scope: r, ...P, children: H(m) ? m(P) : o });
}
w(q, "SwitchProvider");
var Q = "SwitchTrigger", V = /* @__PURE__ */ e.forwardRef(
  /* @__PURE__ */ w(function({ __scopeSwitch: r, onClick: d, ...o }, a) {
    const {
      control: c,
      form: i,
      value: u,
      disabled: n,
      checked: l,
      required: S,
      setControl: m,
      setChecked: f,
      hasConsumerStoppedPropagationRef: b,
      onUserInteraction: g,
      isFormControl: C,
      bubbleInput: v
    } = T(Q, r), R = U(a, m), _ = e.useRef(l);
    return e.useEffect(() => {
      const s = i ? c?.ownerDocument.getElementById(i) : c?.form;
      if (s instanceof HTMLFormElement) {
        const h = /* @__PURE__ */ w(() => f(_.current), "reset");
        return s.addEventListener("reset", h), () => s.removeEventListener("reset", h);
      }
    }, [c, i, f]), /* @__PURE__ */ p(
      x.button,
      {
        type: "button",
        role: "switch",
        "aria-checked": l,
        "aria-required": S,
        "data-state": y(l),
        "data-disabled": n ? "" : void 0,
        disabled: n,
        value: u,
        ...o,
        ref: R,
        onClick: N(d, (s) => {
          g(), f((h) => !h), v && C && (b.current = s.isPropagationStopped(), b.current || s.stopPropagation());
        })
      }
    );
  }, "SwitchTrigger")
), Y = /* @__PURE__ */ e.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ w(function(r, d) {
    const {
      __scopeSwitch: o,
      name: a,
      checked: c,
      defaultChecked: i,
      required: u,
      disabled: n,
      value: l,
      onCheckedChange: S,
      form: m,
      ...f
    } = r;
    return /* @__PURE__ */ p(
      q,
      {
        __scopeSwitch: o,
        checked: c,
        defaultChecked: i,
        disabled: n,
        required: u,
        onCheckedChange: S,
        name: a,
        form: m,
        value: l,
        internal_do_not_use_render: ({ isFormControl: b }) => /* @__PURE__ */ z(D, { children: [
          /* @__PURE__ */ p(
            V,
            {
              ...f,
              ref: d,
              __scopeSwitch: o
            }
          ),
          b && /* @__PURE__ */ p(
            re,
            {
              __scopeSwitch: o
            }
          )
        ] })
      }
    );
  }, "Switch")
), Z = "SwitchThumb", ee = /* @__PURE__ */ e.forwardRef(
  /* @__PURE__ */ w(function(r, d) {
    const { __scopeSwitch: o, ...a } = r, c = T(Z, o);
    return /* @__PURE__ */ p(
      x.span,
      {
        "data-state": y(c.checked),
        "data-disabled": c.disabled ? "" : void 0,
        ...a,
        ref: d
      }
    );
  }, "SwitchThumb")
), te = "SwitchBubbleInput", re = /* @__PURE__ */ e.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ w(function({ __scopeSwitch: r, onClick: d, ...o }, a) {
    const {
      control: c,
      hasConsumerStoppedPropagationRef: i,
      userInteractionCount: u,
      checked: n,
      defaultChecked: l,
      required: S,
      disabled: m,
      name: f,
      value: b,
      form: g,
      bubbleInput: C,
      setBubbleInput: v
    } = T(te, r), R = U(a, v), _ = X(c), s = e.useRef(!1), h = e.useRef(n), I = e.useRef(u);
    e.useEffect(() => {
      const k = C;
      if (!k) return;
      const L = window.HTMLInputElement.prototype, B = Object.getOwnPropertyDescriptor(
        L,
        "checked"
      ).set, F = u !== I.current;
      I.current = u;
      const j = h.current !== n;
      h.current = n;
      const A = !(F && i.current);
      if (j && B) {
        s.current = !F;
        const O = new Event("click", { bubbles: A });
        B.call(k, n), k.dispatchEvent(O), s.current = !1;
      }
    }, [C, n, i, u]);
    const P = e.useRef(n);
    return /* @__PURE__ */ p(
      x.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: l ?? P.current,
        required: S,
        disabled: m,
        name: f,
        value: b,
        form: g,
        ...o,
        tabIndex: -1,
        ref: R,
        onClick: N(d, (k) => {
          s.current && k.stopPropagation();
        }),
        style: {
          ...o.style,
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
  }, "SwitchBubbleInput")
);
function H(t) {
  return typeof t == "function";
}
w(H, "isFunction");
function y(t) {
  return t ? "checked" : "unchecked";
}
w(y, "getState");
function he({
  className: t,
  ...r
}) {
  return /* @__PURE__ */ p(
    Y,
    {
      "data-slot": "switch",
      className: M(
        "peer inline-flex h-7 w-16 shrink-0 items-center rounded-2xl bg-background p-0.5 transition-colors duration-250 outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary",
        t
      ),
      ...r,
      children: /* @__PURE__ */ p(
        ee,
        {
          "data-slot": "switch-thumb",
          className: M(
            "pointer-events-none block h-6 w-[39px] rounded-xl bg-card ring-0 transition-transform duration-250 data-[state=checked]:translate-x-[21px] data-[state=unchecked]:translate-x-0 dark:bg-foreground"
          )
        }
      )
    }
  );
}
export {
  he as Switch
};
