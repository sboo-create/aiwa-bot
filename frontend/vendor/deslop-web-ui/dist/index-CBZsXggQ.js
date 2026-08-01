import * as p from "react";
import { u as le, y as de, z as fe, A as ue, s as me, t as he, B as ge, r as we, x as Pe } from "./floating-ui.react-dom-D2Sfx2pi.js";
import { P as N } from "./index-Si5tf8-e.js";
import { jsx as u } from "react/jsx-runtime";
import { u as j } from "./index-OZUlxC0o.js";
import { c as Ae } from "./index-oVmar2KU.js";
import { u as xe } from "./index-CRNjeP0c.js";
import { u as E } from "./index-CCKe-Mpx.js";
import { u as ye } from "./index-113zfjwf.js";
var ve = Object.defineProperty, Ce = (r, e) => ve(r, "name", { value: e, configurable: !0 }), Se = /* @__PURE__ */ p.forwardRef(
  /* @__PURE__ */ Ce(function(e, a) {
    const { children: i, width: o = 10, height: n = 5, ...t } = e;
    return /* @__PURE__ */ u(
      N.svg,
      {
        ...t,
        ref: a,
        width: o,
        height: n,
        viewBox: "0 0 30 10",
        preserveAspectRatio: "none",
        children: e.asChild ? i : /* @__PURE__ */ u("polygon", { points: "0,0 30,0 15,10" })
      }
    );
  }, "Arrow")
), be = Object.defineProperty, m = (r, e) => be(r, "name", { value: e, configurable: !0 }), D = "Popper", [T, Xe] = Ae(D), [_e, Z] = T(D), je = /* @__PURE__ */ m((r) => {
  const { __scopePopper: e, children: a } = r, [i, o] = p.useState(null), [n, t] = p.useState(void 0);
  return /* @__PURE__ */ u(
    _e,
    {
      scope: e,
      anchor: i,
      onAnchorChange: o,
      placementState: n,
      setPlacementState: t,
      children: a
    }
  );
}, "Popper"), Oe = "PopperAnchor", De = /* @__PURE__ */ p.forwardRef(
  /* @__PURE__ */ m(function(e, a) {
    const { __scopePopper: i, virtualRef: o, ...n } = e, t = Z(Oe, i), A = p.useRef(null), l = t.onAnchorChange, d = p.useCallback(
      (c) => {
        A.current = c, c && l(c);
      },
      [l]
    ), h = j(a, d), s = p.useRef(null);
    p.useEffect(() => {
      if (!o)
        return;
      const c = s.current;
      s.current = o.current, c !== s.current && l(s.current);
    });
    const g = t.placementState && C(t.placementState), w = g?.[0], f = g?.[1];
    return o ? null : /* @__PURE__ */ u(
      N.div,
      {
        "data-radix-popper-side": w,
        "data-radix-popper-align": f,
        ...n,
        ref: h
      }
    );
  }, "PopperAnchor")
), L = "PopperContent", [Re, $e] = T(L), Te = /* @__PURE__ */ p.forwardRef(
  /* @__PURE__ */ m(function(e, a) {
    const {
      __scopePopper: i,
      side: o = "bottom",
      sideOffset: n = 0,
      align: t = "center",
      alignOffset: A = 0,
      arrowPadding: l = 0,
      avoidCollisions: d = !0,
      collisionBoundary: h = [],
      collisionPadding: s = 0,
      sticky: g = "partial",
      hideWhenDetached: w = !1,
      updatePositionStrategy: f = "optimized",
      onPlaced: c,
      ...S
    } = e, H = Z(L, i), [b, q] = p.useState(null), G = j(a, q), [_, J] = p.useState(null), z = ye(_), K = z?.width ?? 0, W = z?.height ?? 0, Q = o + (t !== "center" ? "-" + t : ""), V = typeof s == "number" ? s : { top: 0, right: 0, bottom: 0, left: 0, ...s }, I = Array.isArray(h) ? h : [h], M = I.length > 0, x = {
      padding: V,
      boundary: I.filter(U),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: M
    }, { refs: ee, floatingStyles: Y, placement: O, isPositioned: y, middlewareData: P } = le({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: Q,
      whileElementsMounted: /* @__PURE__ */ m((...$) => Pe(...$, {
        animationFrame: f === "always"
      }), "whileElementsMounted"),
      elements: {
        reference: H.anchor
      },
      middleware: [
        de({ mainAxis: n + W, alignmentAxis: A }),
        d && fe({
          mainAxis: !0,
          crossAxis: !1,
          limiter: g === "partial" ? ue() : void 0,
          ...x
        }),
        d && me({ ...x }),
        he({
          ...x,
          apply: /* @__PURE__ */ m(({ elements: $, rects: X, availableWidth: ie, availableHeight: se }) => {
            const { width: ce, height: pe } = X.reference, v = $.floating.style;
            v.setProperty("--radix-popper-available-width", `${ie}px`), v.setProperty("--radix-popper-available-height", `${se}px`), v.setProperty("--radix-popper-anchor-width", `${ce}px`), v.setProperty("--radix-popper-anchor-height", `${pe}px`);
          }, "apply")
        }),
        _ && ge({ element: _, padding: l }),
        He({ arrowWidth: K, arrowHeight: W }),
        w && we({
          strategy: "referenceHidden",
          ...x,
          // `hide` detects whether the anchor (reference) is clipped, so when
          // no explicit `collisionBoundary` is set we fall back to Floating
          // UI's default clipping ancestors (e.g. a scrollable menu). This
          // lets an occluded submenu hide once its anchor scrolls out of view
          // (#3237). The collision/size middlewares deliberately keep the
          // viewport-based default to avoid clamping content rendered inside
          // transformed or overflow-clipping portal containers.
          boundary: M ? x.boundary : void 0
        })
      ]
    }), R = H.setPlacementState;
    E(() => (R(O), () => {
      R(void 0);
    }), [O, R]);
    const [k, B] = C(O), F = xe(c);
    E(() => {
      y && F?.();
    }, [y, F]);
    const te = P.arrow?.x, re = P.arrow?.y, oe = P.arrow?.centerOffset !== 0, [ne, ae] = p.useState();
    return E(() => {
      b && ae(window.getComputedStyle(b).zIndex);
    }, [b]), /* @__PURE__ */ u(
      "div",
      {
        ref: ee.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...Y,
          transform: y ? Y.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: ne,
          "--radix-popper-transform-origin": [
            P.transformOrigin?.x,
            P.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...P.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ u(
          Re,
          {
            scope: i,
            placedSide: k,
            placedAlign: B,
            onArrowChange: J,
            arrowX: te,
            arrowY: re,
            shouldHideArrow: oe,
            children: /* @__PURE__ */ u(
              N.div,
              {
                "data-side": k,
                "data-align": B,
                ...S,
                ref: G,
                style: {
                  ...S.style,
                  // if the PopperContent hasn't been placed yet (not all
                  // measurements done) we prevent animations so that users'
                  // animations don't kick in too early from the wrong sides.
                  animation: y ? S.style?.animation : "none"
                }
              }
            )
          }
        )
      }
    );
  }, "PopperContent")
), Ee = "PopperArrow", Ne = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Ze = /* @__PURE__ */ p.forwardRef(
  /* @__PURE__ */ m(function(e, a) {
    const { __scopePopper: i, ...o } = e, n = $e(Ee, i), t = Ne[n.placedSide];
    return (
      // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
      // doesn't report size as we'd expect on SVG elements.
      // it reports their bounding box which is effectively the largest path inside the SVG.
      /* @__PURE__ */ u(
        "span",
        {
          ref: n.onArrowChange,
          style: {
            position: "absolute",
            left: n.arrowX,
            top: n.arrowY,
            [t]: 0,
            transformOrigin: {
              top: "",
              right: "0 0",
              bottom: "center 0",
              left: "100% 0"
            }[n.placedSide],
            transform: {
              top: "translateY(100%)",
              right: "translateY(50%) rotate(90deg) translateX(-50%)",
              bottom: "rotate(180deg)",
              left: "translateY(50%) rotate(-90deg) translateX(50%)"
            }[n.placedSide],
            visibility: n.shouldHideArrow ? "hidden" : void 0
          },
          children: /* @__PURE__ */ u(
            Se,
            {
              ...o,
              ref: a,
              style: {
                ...o.style,
                // ensures the element can be measured correctly (mostly for if SVG)
                display: "block"
              }
            }
          )
        }
      )
    );
  }, "PopperArrow")
);
function U(r) {
  return r !== null;
}
m(U, "isNotNull");
var He = /* @__PURE__ */ m((r) => ({
  name: "transformOrigin",
  options: r,
  fn(e) {
    const { placement: a, rects: i, middlewareData: o } = e, t = o.arrow?.centerOffset !== 0, A = t ? 0 : r.arrowWidth, l = t ? 0 : r.arrowHeight, [d, h] = C(a), s = { start: "0%", center: "50%", end: "100%" }[h], g = (o.arrow?.x ?? 0) + A / 2, w = (o.arrow?.y ?? 0) + l / 2;
    let f = "", c = "";
    return d === "bottom" ? (f = t ? s : `${g}px`, c = `${-l}px`) : d === "top" ? (f = t ? s : `${g}px`, c = `${i.floating.height + l}px`) : d === "right" ? (f = `${-l}px`, c = t ? s : `${w}px`) : d === "left" && (f = `${i.floating.width + l}px`, c = t ? s : `${w}px`), { data: { x: f, y: c } };
  }
}), "transformOrigin");
function C(r) {
  const [e, a = "center"] = r.split("-");
  return [e, a];
}
m(C, "getSideAndAlignFromPlacement");
export {
  je as P,
  De as a,
  Te as b,
  Xe as c,
  Ze as d
};
