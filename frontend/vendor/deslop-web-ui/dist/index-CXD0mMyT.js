import * as s from "react";
import { c as S } from "./index-BMzaJ9ZT.js";
import { P as K, d as M } from "./index-Si5tf8-e.js";
import { u as X } from "./index-OZUlxC0o.js";
import { u as F } from "./index-CRNjeP0c.js";
import { jsx as q } from "react/jsx-runtime";
var G = Object.defineProperty, a = (u, n) => G(u, "name", { value: n, configurable: !0 }), g = "dismissableLayer.update", J = "dismissableLayer.pointerDownOutside", Q = "dismissableLayer.focusOutside", _, N = s.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set(),
  // Outside elements that belong to a layer's own dismiss affordance (eg, a
  // dialog overlay). Pressing them should dismiss the layer regardless of
  // whether or not they stop propagation.
  //
  // See https://github.com/radix-ui/primitives/issues/3346
  dismissableSurfaces: /* @__PURE__ */ new Set()
}), se = /* @__PURE__ */ s.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ a(function(n, t) {
    const {
      disableOutsidePointerEvents: c = !1,
      deferPointerDownOutside: d = !1,
      onEscapeKeyDown: f,
      onPointerDownOutside: b,
      onFocusOutside: y,
      onInteractOutside: E,
      onDismiss: m,
      ...D
    } = n, e = s.useContext(N), [o, w] = s.useState(null), l = o?.ownerDocument ?? globalThis?.document, [, O] = s.useState({}), P = X(t, w), h = Array.from(e.layers), [C] = [
      ...e.layersWithOutsidePointerEventsDisabled
    ].slice(-1), r = C ? h.indexOf(C) : -1, v = o ? h.indexOf(o) : -1, L = e.layersWithOutsidePointerEventsDisabled.size > 0, p = v >= r, B = s.useRef(!1), z = A(
      (i) => {
        b?.(i), E?.(i), i.defaultPrevented || m?.();
      },
      {
        ownerDocument: l,
        deferPointerDownOutside: d,
        isDeferredPointerDownOutsideRef: B,
        dismissableSurfaces: e.dismissableSurfaces,
        shouldHandlePointerDownOutside: s.useCallback(
          (i) => {
            if (!(i instanceof Node))
              return !1;
            const R = [...e.branches].some(
              (U) => U.contains(i)
            );
            return p && !R;
          },
          [e.branches, p]
        )
      }
    ), x = H((i) => {
      if (d && B.current)
        return;
      const R = i.target;
      [...e.branches].some((j) => j.contains(R)) || (y?.(i), E?.(i), i.defaultPrevented || m?.());
    }, l), W = o ? v === h.length - 1 : !1, I = F((i) => {
      i.key === "Escape" && (f?.(i), !i.defaultPrevented && m && (i.preventDefault(), m()));
    });
    return s.useEffect(() => {
      if (W)
        return l.addEventListener("keydown", I, { capture: !0 }), () => l.removeEventListener("keydown", I, { capture: !0 });
    }, [l, W, I]), s.useEffect(() => {
      if (o)
        return c && (e.layersWithOutsidePointerEventsDisabled.size === 0 && (_ = l.body.style.pointerEvents, l.body.style.pointerEvents = "none"), e.layersWithOutsidePointerEventsDisabled.add(o)), e.layers.add(o), T(), () => {
          c && (e.layersWithOutsidePointerEventsDisabled.delete(o), e.layersWithOutsidePointerEventsDisabled.size === 0 && (l.body.style.pointerEvents = _));
        };
    }, [o, l, c, e]), s.useEffect(() => () => {
      o && (e.layers.delete(o), e.layersWithOutsidePointerEventsDisabled.delete(o), T());
    }, [o, e]), s.useEffect(() => {
      const i = /* @__PURE__ */ a(() => O({}), "handleUpdate");
      return document.addEventListener(g, i), () => document.removeEventListener(g, i);
    }, []), /* @__PURE__ */ q(
      K.div,
      {
        ...D,
        ref: P,
        style: {
          pointerEvents: L ? p ? "auto" : "none" : void 0,
          ...n.style
        },
        onFocusCapture: S(n.onFocusCapture, x.onFocusCapture),
        onBlurCapture: S(n.onBlurCapture, x.onBlurCapture),
        onPointerDownCapture: S(
          n.onPointerDownCapture,
          z.onPointerDownCapture
        )
      }
    );
  }, "DismissableLayer")
);
function V() {
  const u = s.useContext(N), [n, t] = s.useState(null);
  return s.useEffect(() => {
    if (n)
      return u.dismissableSurfaces.add(n), () => {
        u.dismissableSurfaces.delete(n);
      };
  }, [n, u.dismissableSurfaces]), t;
}
a(V, "useDismissableLayerSurface");
var Y = /* @__PURE__ */ a(() => !0, "IS_TRUE");
function A(u, n) {
  const {
    ownerDocument: t = globalThis?.document,
    deferPointerDownOutside: c = !1,
    isDeferredPointerDownOutsideRef: d,
    dismissableSurfaces: f,
    shouldHandlePointerDownOutside: b = Y
  } = n, y = F(u), E = s.useRef(!1), m = s.useRef(!1), D = s.useRef(/* @__PURE__ */ new Map()), e = s.useRef(() => {
  });
  return s.useEffect(() => {
    function o() {
      m.current = !1, d.current = !1, D.current.clear();
    }
    a(o, "resetOutsideInteraction");
    function w() {
      return Array.from(D.current.values()).some(Boolean);
    }
    a(w, "isOutsideInteractionIntercepted");
    function l(r) {
      if (!m.current)
        return;
      const v = r.target;
      v instanceof Node && [...f].some((p) => p.contains(v)) || D.current.set(r.type, !0), r.type === "click" && window.setTimeout(() => {
        m.current && e.current();
      }, 0);
    }
    a(l, "handleInteractionCapture");
    function O(r) {
      m.current && D.current.set(r.type, !1);
    }
    a(O, "handleInteractionBubble");
    const P = /* @__PURE__ */ a((r) => {
      if (r.target && !E.current) {
        let v = function() {
          t.removeEventListener("click", e.current);
          const p = w();
          o(), p || k(
            J,
            y,
            L,
            { discrete: !0 }
          );
        };
        if (a(v, "handleAndDispatchPointerDownOutsideEvent"), !b(r.target)) {
          t.removeEventListener("click", e.current), o(), E.current = !1;
          return;
        }
        const L = { originalEvent: r };
        m.current = !0, d.current = c && r.button === 0, D.current.clear(), !c || r.button !== 0 ? v() : (t.removeEventListener("click", e.current), e.current = v, t.addEventListener("click", e.current, { once: !0 }));
      } else
        t.removeEventListener("click", e.current), o();
      E.current = !1;
    }, "handlePointerDown"), h = [
      "pointerup",
      "mousedown",
      "mouseup",
      "touchstart",
      "touchend",
      "click"
    ];
    for (const r of h)
      t.addEventListener(r, l, !0), t.addEventListener(r, O);
    const C = window.setTimeout(() => {
      t.addEventListener("pointerdown", P);
    }, 0);
    return () => {
      window.clearTimeout(C), t.removeEventListener("pointerdown", P), t.removeEventListener("click", e.current);
      for (const r of h)
        t.removeEventListener(r, l, !0), t.removeEventListener(r, O);
    };
  }, [
    t,
    y,
    c,
    d,
    f,
    b
  ]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: /* @__PURE__ */ a(() => E.current = !0, "onPointerDownCapture")
  };
}
a(A, "usePointerDownOutside");
function H(u, n = globalThis?.document) {
  const t = F(u), c = s.useRef(!1);
  return s.useEffect(() => {
    const d = /* @__PURE__ */ a((f) => {
      f.target && !c.current && k(Q, t, { originalEvent: f }, {
        discrete: !1
      });
    }, "handleFocus");
    return n.addEventListener("focusin", d), () => n.removeEventListener("focusin", d);
  }, [n, t]), {
    onFocusCapture: /* @__PURE__ */ a(() => c.current = !0, "onFocusCapture"),
    onBlurCapture: /* @__PURE__ */ a(() => c.current = !1, "onBlurCapture")
  };
}
a(H, "useFocusOutside");
function T() {
  const u = new CustomEvent(g);
  document.dispatchEvent(u);
}
a(T, "dispatchUpdate");
function k(u, n, t, { discrete: c }) {
  const d = t.originalEvent.target, f = new CustomEvent(u, { bubbles: !1, cancelable: !0, detail: t });
  n && d.addEventListener(u, n, { once: !0 }), c ? M(d, f) : d.dispatchEvent(f);
}
a(k, "handleAndDispatchCustomEvent");
export {
  se as D,
  V as u
};
