import { jsx as S, jsxs as se, Fragment as Ee } from "react/jsx-runtime";
import * as u from "react";
import { c as $ } from "../../utils-TrrhThB-.js";
import { c as G } from "../../index-BdrERefj.js";
import { c as T } from "../../index-BMzaJ9ZT.js";
import { u as V } from "../../index-OZUlxC0o.js";
import { c as Ce } from "../../index-oVmar2KU.js";
import { u as De } from "../../index-CECqponX.js";
import { u as Me } from "../../index-B0BN408G.js";
import { u as Te } from "../../index-kQnlviVU.js";
import { u as Ve } from "../../index-113zfjwf.js";
import { P as k } from "../../index-Si5tf8-e.js";
import { c as Ae } from "../../index-CxcvVwJj.js";
var Be = Object.defineProperty, c = (i, e) => Be(i, "name", { value: e, configurable: !0 }), le = ["PageUp", "PageDown"], ce = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], de = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
}, z = "Slider", [X, Ie, Ke] = Ae(z), [W, lt] = Ce(z, [
  Ke
]), [Ne, H] = W(z), ke = /* @__PURE__ */ u.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ c(function(e, n) {
    const {
      name: o,
      min: r = 0,
      max: t = 100,
      step: s = 1,
      orientation: l = "horizontal",
      disabled: d = !1,
      minStepsBetweenThumbs: m = 0,
      preserveThumbOrder: h = !1,
      defaultValue: g = [r],
      value: a,
      onValueChange: f = /* @__PURE__ */ c(() => {
      }, "onValueChange"),
      onValueCommit: b = /* @__PURE__ */ c(() => {
      }, "onValueCommit"),
      inverted: P = !1,
      form: p,
      ...y
    } = e, x = u.useRef(/* @__PURE__ */ new Set()), _ = u.useRef(0), v = u.useRef(!1), A = l === "horizontal" ? ze : He, [F, O] = u.useState(null), xe = V(n, O), [D = [], U] = De({
      prop: a,
      defaultProp: g,
      onChange: /* @__PURE__ */ c((w) => {
        [...x.current][_.current]?.focus({
          preventScroll: !0,
          focusVisible: v.current
        }), v.current = !1, f(w);
      }, "onChange")
    }), Q = u.useRef(D), _e = u.useRef(D);
    u.useEffect(() => {
      const w = p ? F?.ownerDocument.getElementById(p) : F?.closest("form");
      if (w instanceof HTMLFormElement) {
        const R = /* @__PURE__ */ c(() => U(_e.current), "reset");
        return w.addEventListener("reset", R), () => w.removeEventListener("reset", R);
      }
    }, [F, p, U]);
    function Z(w) {
      const R = be(D, w);
      M(w, R);
    }
    c(Z, "handleSlideStart");
    function ee(w) {
      M(w, _.current);
    }
    c(ee, "handleSlideMove");
    function te() {
      String(D) !== String(Q.current) && b(D);
    }
    c(te, "handleSlideEnd");
    function M(w, R, { commit: ne } = { commit: !1 }) {
      const oe = J(s), Y = N(Math.round((w - r) / s) * s + r, oe), B = G(Y, [r, t]);
      U((E = []) => {
        const I = m * s, re = h ? G(B, [
          E[R - 1] === void 0 ? r : E[R - 1] + I,
          E[R + 1] === void 0 ? t : E[R + 1] - I
        ]) : B, K = pe(E, re, R);
        if (Pe(K, I)) {
          _.current = h ? R : K.indexOf(re);
          const ie = String(K) !== String(E);
          return ie && ne && b(K), ie ? K : E;
        } else
          return E;
      });
    }
    return c(M, "updateValues"), /* @__PURE__ */ S(
      Ne,
      {
        scope: e.__scopeSlider,
        name: o,
        disabled: d,
        min: r,
        max: t,
        valueIndexToChangeRef: _,
        thumbs: x.current,
        values: D,
        orientation: l,
        form: p,
        children: /* @__PURE__ */ S(X.Provider, { scope: e.__scopeSlider, children: /* @__PURE__ */ S(X.Slot, { scope: e.__scopeSlider, children: /* @__PURE__ */ S(
          A,
          {
            "aria-disabled": d,
            "data-disabled": d ? "" : void 0,
            ...y,
            ref: xe,
            onPointerDown: T(y.onPointerDown, () => {
              d || (Q.current = D, v.current = !1);
            }),
            min: r,
            max: t,
            inverted: P,
            onSlideStart: d ? void 0 : Z,
            onSlideMove: d ? void 0 : ee,
            onSlideEnd: d ? void 0 : te,
            onHomeKeyDown: () => {
              d || (v.current = !0, M(r, 0, { commit: !0 }));
            },
            onEndKeyDown: () => {
              d || (v.current = !0, M(t, D.length - 1, { commit: !0 }));
            },
            onStepKeyDown: ({ event: w, direction: R }) => {
              if (!d) {
                v.current = !0;
                const Y = le.includes(w.key) || w.shiftKey && ce.includes(w.key) ? 10 : 1, B = _.current, E = D[B], I = ye(E, {
                  min: r,
                  step: s,
                  direction: R,
                  multiplier: Y
                });
                M(I, B, { commit: !0 });
              }
            }
          }
        ) }) })
      }
    );
  }, "Slider")
), [ue, fe] = W(z, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
}), ze = /* @__PURE__ */ u.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ c(function(e, n) {
    const {
      min: o,
      max: r,
      dir: t,
      inverted: s,
      onSlideStart: l,
      onSlideMove: d,
      onSlideEnd: m,
      onStepKeyDown: h,
      ...g
    } = e, [a, f] = u.useState(null), b = V(n, f), P = u.useRef(void 0), p = Me(t), y = p === "ltr", x = y && !s || !y && s;
    function _(v) {
      const C = P.current || a.getBoundingClientRect(), A = [0, C.width], O = L(A, x ? [o, r] : [r, o]);
      return P.current = C, O(v - C.left);
    }
    return c(_, "getValueFromPointer"), /* @__PURE__ */ S(
      ue,
      {
        scope: e.__scopeSlider,
        startEdge: x ? "left" : "right",
        endEdge: x ? "right" : "left",
        direction: x ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ S(
          me,
          {
            dir: p,
            "data-orientation": "horizontal",
            ...g,
            ref: b,
            style: {
              ...g.style,
              "--radix-slider-thumb-transform": "translateX(-50%)"
            },
            onSlideStart: (v) => {
              const C = _(v.clientX);
              l?.(C);
            },
            onSlideMove: (v) => {
              const C = _(v.clientX);
              d?.(C);
            },
            onSlideEnd: () => {
              P.current = void 0, m?.();
            },
            onStepKeyDown: (v) => {
              const A = de[x ? "from-left" : "from-right"].includes(v.key);
              h?.({ event: v, direction: A ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderHorizontal")
), He = /* @__PURE__ */ u.forwardRef(
  /* @__PURE__ */ c(function(e, n) {
    const {
      min: o,
      max: r,
      inverted: t,
      onSlideStart: s,
      onSlideMove: l,
      onSlideEnd: d,
      onStepKeyDown: m,
      ...h
    } = e, g = u.useRef(null), a = V(n, g), f = u.useRef(void 0), b = !t;
    function P(p) {
      const y = f.current || g.current.getBoundingClientRect(), x = [0, y.height], v = L(x, b ? [r, o] : [o, r]);
      return f.current = y, v(p - y.top);
    }
    return c(P, "getValueFromPointer"), /* @__PURE__ */ S(
      ue,
      {
        scope: e.__scopeSlider,
        startEdge: b ? "bottom" : "top",
        endEdge: b ? "top" : "bottom",
        size: "height",
        direction: b ? 1 : -1,
        children: /* @__PURE__ */ S(
          me,
          {
            "data-orientation": "vertical",
            ...h,
            ref: a,
            style: {
              ...h.style,
              "--radix-slider-thumb-transform": "translateY(50%)"
            },
            onSlideStart: (p) => {
              const y = P(p.clientY);
              s?.(y);
            },
            onSlideMove: (p) => {
              const y = P(p.clientY);
              l?.(y);
            },
            onSlideEnd: () => {
              f.current = void 0, d?.();
            },
            onStepKeyDown: (p) => {
              const x = de[b ? "from-bottom" : "from-top"].includes(p.key);
              m?.({ event: p, direction: x ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderVertical")
), me = /* @__PURE__ */ u.forwardRef(
  /* @__PURE__ */ c(function(e, n) {
    const {
      __scopeSlider: o,
      onSlideStart: r,
      onSlideMove: t,
      onSlideEnd: s,
      onHomeKeyDown: l,
      onEndKeyDown: d,
      onStepKeyDown: m,
      ...h
    } = e, g = H(z, o);
    return /* @__PURE__ */ S(
      k.span,
      {
        ...h,
        ref: n,
        onKeyDown: T(e.onKeyDown, (a) => {
          a.key === "Home" ? (l(a), a.preventDefault()) : a.key === "End" ? (d(a), a.preventDefault()) : le.concat(ce).includes(a.key) && (m(a), a.preventDefault());
        }),
        onPointerDown: T(e.onPointerDown, (a) => {
          const f = a.target;
          f.setPointerCapture(a.pointerId), a.preventDefault(), g.thumbs.has(f) ? f.focus({ preventScroll: !0, focusVisible: !1 }) : r(a);
        }),
        onPointerMove: T(e.onPointerMove, (a) => {
          a.target.hasPointerCapture(a.pointerId) && t(a);
        }),
        onPointerUp: T(e.onPointerUp, (a) => {
          const f = a.target;
          f.hasPointerCapture(a.pointerId) && (f.releasePointerCapture(a.pointerId), s(a));
        })
      }
    );
  }, "SliderImpl")
), Fe = "SliderTrack", Le = /* @__PURE__ */ u.forwardRef(
  /* @__PURE__ */ c(function(e, n) {
    const { __scopeSlider: o, ...r } = e, t = H(Fe, o);
    return /* @__PURE__ */ S(
      k.span,
      {
        "data-disabled": t.disabled ? "" : void 0,
        "data-orientation": t.orientation,
        ...r,
        ref: n
      }
    );
  }, "SliderTrack")
), ae = "SliderRange", Oe = /* @__PURE__ */ u.forwardRef(
  /* @__PURE__ */ c(function(e, n) {
    const { __scopeSlider: o, ...r } = e, t = H(ae, o), s = fe(ae, o), l = u.useRef(null), d = V(n, l), m = t.values.length, h = t.values.map(
      (f) => q(f, t.min, t.max)
    ), g = m > 1 ? Math.min(...h) : 0, a = 100 - Math.max(...h);
    return /* @__PURE__ */ S(
      k.span,
      {
        "data-orientation": t.orientation,
        "data-disabled": t.disabled ? "" : void 0,
        ...r,
        ref: d,
        style: {
          ...e.style,
          [s.startEdge]: g + "%",
          [s.endEdge]: a + "%"
        }
      }
    );
  }, "SliderRange")
), Ue = "SliderThumb", [Ye, Se] = W(Ue), $e = "SliderThumbProvider";
function he(i) {
  const {
    __scopeSlider: e,
    name: n,
    children: o,
    // @ts-expect-error internal render prop
    internal_do_not_use_render: r
  } = i, t = H($e, e), s = Ie(e), [l, d] = u.useState(null), m = u.useMemo(
    () => l ? s().findIndex((p) => p.ref.current === l) : -1,
    [s, l]
  ), h = Ve(l), g = l ? !!t.form || !!l.closest("form") : !0, a = t.values[m], f = n ?? (t.name ? t.name + (t.values.length > 1 ? "[]" : "") : void 0), b = a === void 0 ? 0 : q(a, t.min, t.max);
  u.useEffect(() => {
    if (l)
      return t.thumbs.add(l), () => {
        t.thumbs.delete(l);
      };
  }, [l, t.thumbs]);
  const P = {
    value: a,
    name: f,
    form: t.form,
    isFormControl: g,
    index: m,
    thumb: l,
    onThumbChange: d,
    percent: b,
    size: h
  };
  return /* @__PURE__ */ S(Ye, { scope: e, ...P, children: Re(r) ? r(P) : o });
}
c(he, "SliderThumbProvider");
var j = "SliderThumbTrigger", je = /* @__PURE__ */ u.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ c(function(e, n) {
    const { __scopeSlider: o, ...r } = e, t = H(j, o), s = fe(j, o), { index: l, value: d, percent: m, size: h, onThumbChange: g } = Se(
      j,
      o
    ), a = V(n, g), f = ge(l, t.values.length), b = h?.[s.size], P = b ? ve(b, m, s.direction) : 0;
    return /* @__PURE__ */ S(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [s.startEdge]: `calc(${m}% + ${P}px)`
        },
        children: /* @__PURE__ */ S(X.ItemSlot, { scope: o, children: /* @__PURE__ */ S(
          k.span,
          {
            role: "slider",
            "aria-label": e["aria-label"] || f,
            "aria-valuemin": t.min,
            "aria-valuenow": d,
            "aria-valuemax": t.max,
            "aria-orientation": t.orientation,
            "data-orientation": t.orientation,
            "data-disabled": t.disabled ? "" : void 0,
            tabIndex: t.disabled ? void 0 : 0,
            ...r,
            ref: a,
            style: d === void 0 ? { display: "none" } : e.style,
            onFocus: T(e.onFocus, () => {
              t.valueIndexToChangeRef.current = l;
            })
          }
        ) })
      }
    );
  }, "SliderThumbTrigger")
), Ge = /* @__PURE__ */ u.forwardRef(
  /* @__PURE__ */ c(function(e, n) {
    const { __scopeSlider: o, name: r, ...t } = e;
    return /* @__PURE__ */ S(
      he,
      {
        __scopeSlider: o,
        name: r,
        internal_do_not_use_render: ({ index: s, isFormControl: l }) => /* @__PURE__ */ se(Ee, { children: [
          /* @__PURE__ */ S(
            je,
            {
              ...t,
              ref: n,
              __scopeSlider: o
            }
          ),
          l ? /* @__PURE__ */ S(
            We,
            {
              __scopeSlider: o
            },
            s
          ) : null
        ] })
      }
    );
  }, "SliderThumb")
), Xe = "SliderBubbleInput", We = /* @__PURE__ */ u.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ c(function({ __scopeSlider: e, ...n }, o) {
    const { value: r, name: t, form: s } = Se(Xe, e), l = u.useRef(null), d = V(l, o), m = Te(r);
    return u.useEffect(() => {
      const h = l.current;
      if (!h) return;
      const g = window.HTMLInputElement.prototype, f = Object.getOwnPropertyDescriptor(g, "value").set;
      if (m !== r && f) {
        const b = new Event("input", { bubbles: !0 });
        f.call(h, r), h.dispatchEvent(b);
      }
    }, [m, r]), /* @__PURE__ */ S(
      k.input,
      {
        style: { display: "none" },
        name: t,
        form: s,
        ...n,
        ref: d,
        defaultValue: r
      }
    );
  }, "SliderBubbleInput")
);
function pe(i = [], e, n) {
  const o = [...i];
  return o[n] = e, o.sort((r, t) => r - t);
}
c(pe, "getNextSortedValues");
function q(i, e, n) {
  const t = 100 / (n - e) * (i - e);
  return G(t, [0, 100]);
}
c(q, "convertValueToPercentage");
function ge(i, e) {
  return e > 2 ? `Value ${i + 1} of ${e}` : e === 2 ? ["Minimum", "Maximum"][i] : void 0;
}
c(ge, "getLabel");
function be(i, e) {
  if (i.length === 1) return 0;
  const n = i.map((r) => Math.abs(r - e)), o = Math.min(...n);
  return n.indexOf(o);
}
c(be, "getClosestValueIndex");
function ve(i, e, n) {
  const o = i / 2, t = L([0, 50], [0, o]);
  return (o - t(e) * n) * n;
}
c(ve, "getThumbInBoundsOffset");
function we(i) {
  return i.slice(0, -1).map((e, n) => i[n + 1] - e);
}
c(we, "getStepsBetweenValues");
function Pe(i, e) {
  if (e > 0) {
    const n = we(i);
    return Math.min(...n) >= e;
  }
  return !0;
}
c(Pe, "hasMinStepsBetweenValues");
function L(i, e) {
  return (n) => {
    if (i[0] === i[1] || e[0] === e[1]) return e[0];
    const o = (e[1] - e[0]) / (i[1] - i[0]);
    return e[0] + o * (n - i[0]);
  };
}
c(L, "linearScale");
function J(i) {
  if (!Number.isFinite(i)) return 0;
  const e = i.toString();
  if (e.includes("e")) {
    const [o, r] = e.split("e"), t = o.split(".")[1] || "", s = Number(r);
    return Math.max(0, t.length - s);
  }
  const n = e.split(".")[1];
  return n ? n.length : 0;
}
c(J, "getDecimalCount");
function N(i, e) {
  const n = Math.pow(10, e);
  return Math.round(i * n) / n;
}
c(N, "roundValue");
function ye(i, {
  min: e,
  step: n,
  direction: o,
  multiplier: r
}) {
  const t = J(n), s = (i - e) / n, l = Math.round(s), d = N(l * n + e, t) === N(i, t);
  let m;
  return d ? m = l + r * o : o > 0 ? m = Math.ceil(s) : m = Math.floor(s), N(m * n + e, t);
}
c(ye, "getNextStepValue");
function Re(i) {
  return typeof i == "function";
}
c(Re, "isFunction");
function ct({
  className: i,
  defaultValue: e,
  value: n,
  min: o = 0,
  max: r = 100,
  ...t
}) {
  const s = u.useMemo(
    () => Array.isArray(n) ? n : Array.isArray(e) ? e : [o, r],
    [n, e, o, r]
  );
  return /* @__PURE__ */ se(
    ke,
    {
      "data-slot": "slider",
      defaultValue: e,
      value: n,
      min: o,
      max: r,
      className: $(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        i
      ),
      ...t,
      children: [
        /* @__PURE__ */ S(
          Le,
          {
            "data-slot": "slider-track",
            className: $(
              "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ S(
              Oe,
              {
                "data-slot": "slider-range",
                className: $(
                  "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: s.length }, (l, d) => /* @__PURE__ */ S(
          Ge,
          {
            "data-slot": "slider-thumb",
            className: "block size-11 shrink-0 rounded-full border border-primary bg-background shadow-sm ring-ring transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          },
          d
        ))
      ]
    }
  );
}
export {
  ct as Slider
};
