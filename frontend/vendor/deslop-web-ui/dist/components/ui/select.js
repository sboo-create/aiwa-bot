import { jsx as n, jsxs as re, Fragment as Ce } from "react/jsx-runtime";
import { C as ze, c as Le, l as Ke } from "../../icons-DUsO7wRs.js";
import { c as q } from "../../utils-TrrhThB-.js";
import * as o from "react";
import * as Ae from "react-dom";
import { c as Re } from "../../index-BdrERefj.js";
import { c as E } from "../../index-BMzaJ9ZT.js";
import { c as Ge } from "../../index-CxcvVwJj.js";
import { u as U, b as $e } from "../../index-OZUlxC0o.js";
import { c as je } from "../../index-oVmar2KU.js";
import { u as Ye } from "../../index-B0BN408G.js";
import { D as qe } from "../../index-CXD0mMyT.js";
import { h as Xe, u as Ze, R as Je, F as Qe } from "../../index-Cb-eNU_M.js";
import { u as Ie } from "../../index-DAdtpYSB.js";
import { c as ke, a as et, b as tt, P as ot } from "../../index-CBZsXggQ.js";
import { P as nt } from "../../index-BVuqQyzd.js";
import { P as rt } from "../../index-KdL-eaFo.js";
import { P as O } from "../../index-Si5tf8-e.js";
import { u as be } from "../../index-CRNjeP0c.js";
import { u as Ee } from "../../index-CECqponX.js";
import { u as X } from "../../index-CCKe-Mpx.js";
import { u as lt } from "../../index-kQnlviVU.js";
import { a as ct } from "../../index-L6XBO05c.js";
var st = Object.defineProperty, g = (s, e) => st(s, "name", { value: e, configurable: !0 }), at = [" ", "Enter", "ArrowUp", "ArrowDown"], it = [" ", "Enter"], de = "Select", [he, ge, dt] = Ge(de), [le, So] = je(de, [
  dt,
  ke
]), ye = ke(), [ut, Z] = le(de), [pt, ft] = le(de);
function Be(s) {
  const {
    __scopeSelect: e,
    children: r,
    open: t,
    defaultOpen: u,
    onOpenChange: a,
    value: f,
    defaultValue: i,
    onValueChange: l,
    dir: c,
    name: v,
    autoComplete: x,
    disabled: C,
    required: P,
    form: I,
    // @ts-expect-error internal render prop used by `Select` to compose its default parts
    internal_do_not_use_render: T
  } = s, d = ye(e), [S, w] = o.useState(null), [h, p] = o.useState(null), [L, N] = o.useState(!1), J = Ye(c), [A, B] = Ee({
    prop: t,
    defaultProp: u ?? !1,
    onChange: a,
    caller: de
  }), [Q, G] = Ee({
    prop: f,
    defaultProp: i,
    onChange: l,
    caller: de
  }), W = o.useRef(null), z = o.useRef(Q);
  o.useEffect(() => {
    const M = I ? S?.ownerDocument.getElementById(I) : S?.form;
    if (M instanceof HTMLFormElement) {
      const F = /* @__PURE__ */ g(() => G(z.current), "reset");
      return M.addEventListener("reset", F), () => M.removeEventListener("reset", F);
    }
  }, [I, S, G]);
  const ee = S ? !!I || !!S.closest("form") : !0, [K, V] = o.useState(/* @__PURE__ */ new Set()), $ = Ie(), j = Array.from(K).map((M) => M.props.value).join(";"), Y = o.useCallback((M) => {
    V((F) => new Set(F).add(M));
  }, []), H = o.useCallback((M) => {
    V((F) => {
      const ae = new Set(F);
      return ae.delete(M), ae;
    });
  }, []), se = {
    required: P,
    trigger: S,
    onTriggerChange: w,
    valueNode: h,
    onValueNodeChange: p,
    valueNodeHasChildren: L,
    onValueNodeHasChildrenChange: N,
    contentId: $,
    value: Q,
    onValueChange: G,
    open: A,
    onOpenChange: B,
    dir: J,
    triggerPointerDownPosRef: W,
    disabled: C,
    name: v,
    autoComplete: x,
    form: I,
    nativeOptions: K,
    nativeSelectKey: j,
    isFormControl: ee
  };
  return /* @__PURE__ */ n(ot, { ...d, children: /* @__PURE__ */ n(ut, { scope: e, ...se, children: /* @__PURE__ */ n(he.Provider, { scope: e, children: /* @__PURE__ */ n(
    pt,
    {
      scope: e,
      onNativeOptionAdd: Y,
      onNativeOptionRemove: H,
      children: Ue(T) ? T(se) : r
    }
  ) }) }) });
}
g(Be, "SelectProvider");
var mt = /* @__PURE__ */ g((s) => {
  const { __scopeSelect: e, children: r, ...t } = s;
  return /* @__PURE__ */ n(
    Be,
    {
      __scopeSelect: e,
      ...t,
      internal_do_not_use_render: ({ isFormControl: u }) => /* @__PURE__ */ re(Ce, { children: [
        r,
        u ? /* @__PURE__ */ n(
          $t,
          {
            __scopeSelect: e
          }
        ) : null
      ] })
    }
  );
}, "Select"), ht = "SelectTrigger", gt = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ g(function(e, r) {
    const { __scopeSelect: t, disabled: u = !1, ...a } = e, f = ye(t), i = Z(ht, t), l = i.disabled || u, c = U(r, i.onTriggerChange), v = ge(t), x = o.useRef("touch"), [C, P, I] = Te((d) => {
      const S = v().filter((p) => !p.disabled), w = S.find((p) => p.value === i.value), h = _e(S, d, w);
      h !== void 0 && i.onValueChange(h.value);
    }), T = /* @__PURE__ */ g((d) => {
      l || (i.onOpenChange(!0), I()), d && (i.triggerPointerDownPosRef.current = {
        x: Math.round(d.pageX),
        y: Math.round(d.pageY)
      });
    }, "handleOpen");
    return /* @__PURE__ */ n(et, { asChild: !0, ...f, children: /* @__PURE__ */ n(
      O.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": i.open ? i.contentId : void 0,
        "aria-expanded": i.open,
        "aria-required": i.required,
        "aria-autocomplete": "none",
        dir: i.dir,
        "data-state": i.open ? "open" : "closed",
        disabled: l,
        "data-disabled": l ? "" : void 0,
        "data-placeholder": pe(i.value) ? "" : void 0,
        ...a,
        ref: c,
        onClick: E(a.onClick, (d) => {
          d.currentTarget.focus(), x.current !== "mouse" && T(d);
        }),
        onPointerDown: E(a.onPointerDown, (d) => {
          x.current = d.pointerType;
          const S = d.target;
          S.hasPointerCapture(d.pointerId) && S.releasePointerCapture(d.pointerId), d.button === 0 && d.ctrlKey === !1 && d.pointerType === "mouse" && (T(d), d.preventDefault());
        }),
        onKeyDown: E(a.onKeyDown, (d) => {
          const S = C.current !== "";
          !(d.ctrlKey || d.altKey || d.metaKey) && d.key.length === 1 && P(d.key), !(S && d.key === " ") && at.includes(d.key) && (T(), d.preventDefault());
        })
      }
    ) });
  }, "SelectTrigger")
), St = "SelectValue", vt = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ g(function(e, r) {
    const { __scopeSelect: t, className: u, style: a, children: f, placeholder: i = "", ...l } = e, c = Z(St, t), { onValueNodeHasChildrenChange: v } = c, x = f !== void 0, C = U(r, c.onValueNodeChange);
    X(() => {
      v(x);
    }, [v, x]);
    const P = pe(c.value);
    return /* @__PURE__ */ n(
      O.span,
      {
        ...l,
        asChild: P ? !1 : l.asChild,
        ref: C,
        style: { pointerEvents: "none" },
        children: /* @__PURE__ */ n(o.Fragment, { children: P ? i : f }, P ? "placeholder" : "value")
      }
    );
  }, "SelectValue")
), wt = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ g(function(e, r) {
    const { __scopeSelect: t, children: u, ...a } = e;
    return /* @__PURE__ */ n(O.span, { "aria-hidden": !0, ...a, ref: r, children: u || "▼" });
  }, "SelectIcon")
), xt = "SelectPortal", [Ct, It] = le(xt, {
  forceMount: void 0
}), bt = /* @__PURE__ */ g((s) => {
  const { __scopeSelect: e, forceMount: r, ...t } = s;
  return /* @__PURE__ */ n(Ct, { scope: s.__scopeSelect, forceMount: r, children: /* @__PURE__ */ n(nt, { asChild: !0, ...t }) });
}, "SelectPortal"), ne = "SelectContent", yt = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ g(function(e, r) {
    const t = It(ne, e.__scopeSelect), { forceMount: u = t.forceMount, ...a } = e, f = Z(ne, e.__scopeSelect), [i, l] = o.useState();
    return X(() => {
      l(new DocumentFragment());
    }, []), /* @__PURE__ */ n(rt, { present: u || f.open, children: ({ present: c }) => c ? /* @__PURE__ */ n(_t, { ...a, ref: r }) : /* @__PURE__ */ n(Pt, { ...a, fragment: i }) });
  }, "SelectContent")
), Pt = /* @__PURE__ */ o.forwardRef(/* @__PURE__ */ g(function(e, r) {
  const { __scopeSelect: t, children: u, fragment: a } = e;
  return a ? Ae.createPortal(
    /* @__PURE__ */ n(Ve, { scope: t, children: /* @__PURE__ */ n(he.Slot, { scope: t, children: /* @__PURE__ */ n("div", { ref: r, children: u }) }) }),
    a
  ) : null;
}, "SelectContentFragment")), k = 10, [Ve, ce] = le(ne), Tt = $e("SelectContent.RemoveScroll"), _t = /* @__PURE__ */ o.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ g(function(e, r) {
    const { __scopeSelect: t } = e, {
      position: u = "item-aligned",
      onCloseAutoFocus: a,
      onEscapeKeyDown: f,
      onPointerDownOutside: i,
      //
      // PopperContent props
      side: l,
      sideOffset: c,
      align: v,
      alignOffset: x,
      arrowPadding: C,
      collisionBoundary: P,
      collisionPadding: I,
      sticky: T,
      hideWhenDetached: d,
      avoidCollisions: S,
      //
      ...w
    } = e, h = Z(ne, t), [p, L] = o.useState(null), [N, J] = o.useState(null), A = U(r, L), [B, Q] = o.useState(null), [G, W] = o.useState(
      null
    ), z = ge(t), [ee, K] = o.useState(!1), V = o.useRef(!1);
    o.useEffect(() => {
      if (p) return Xe(p);
    }, [p]), Ze();
    const $ = o.useCallback(
      (m) => {
        const [_, ...D] = z().map((R) => R.ref.current), [b] = D.slice(-1), y = document.activeElement;
        for (const R of m)
          if (R === y || (R?.scrollIntoView({ block: "nearest" }), R === _ && N && (N.scrollTop = 0), R === b && N && (N.scrollTop = N.scrollHeight), R?.focus(), document.activeElement !== y)) return;
      },
      [z, N]
    ), j = o.useCallback(
      () => $([B, p]),
      [$, B, p]
    );
    o.useEffect(() => {
      ee && j();
    }, [ee, j]);
    const { onOpenChange: Y, triggerPointerDownPosRef: H } = h;
    o.useEffect(() => {
      if (p) {
        let m = { x: 0, y: 0 };
        const _ = /* @__PURE__ */ g((b) => {
          m = {
            x: Math.abs(Math.round(b.pageX) - (H.current?.x ?? 0)),
            y: Math.abs(Math.round(b.pageY) - (H.current?.y ?? 0))
          };
        }, "handlePointerMove"), D = /* @__PURE__ */ g((b) => {
          m.x <= 10 && m.y <= 10 ? b.preventDefault() : b.composedPath().includes(p) || Y(!1), document.removeEventListener("pointermove", _), H.current = null;
        }, "handlePointerUp");
        return H.current !== null && (document.addEventListener("pointermove", _), document.addEventListener("pointerup", D, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", _), document.removeEventListener("pointerup", D, { capture: !0 });
        };
      }
    }, [p, Y, H]), o.useEffect(() => {
      const m = /* @__PURE__ */ g(() => Y(!1), "close");
      return window.addEventListener("blur", m), window.addEventListener("resize", m), () => {
        window.removeEventListener("blur", m), window.removeEventListener("resize", m);
      };
    }, [Y]);
    const [se, M] = Te((m) => {
      const _ = z().filter((y) => !y.disabled), D = _.find((y) => y.ref.current === document.activeElement), b = _e(_, m, D);
      b && setTimeout(() => b.ref.current?.focus());
    }), F = o.useCallback(
      (m, _, D) => {
        const b = !V.current && !D;
        (h.value !== void 0 && h.value === _ || b) && (Q(m), b && (V.current = !0));
      },
      [h.value]
    ), ae = o.useCallback(() => p?.focus(), [p]), ie = o.useCallback(
      (m, _, D) => {
        const b = !V.current && !D;
        (h.value !== void 0 && h.value === _ || b) && W(m);
      },
      [h.value]
    ), fe = u === "popper" ? Ne : Rt, ue = fe === Ne ? {
      side: l,
      sideOffset: c,
      align: v,
      alignOffset: x,
      arrowPadding: C,
      collisionBoundary: P,
      collisionPadding: I,
      sticky: T,
      hideWhenDetached: d,
      avoidCollisions: S
    } : {};
    return /* @__PURE__ */ n(
      Ve,
      {
        scope: t,
        content: p,
        viewport: N,
        onViewportChange: J,
        itemRefCallback: F,
        selectedItem: B,
        onItemLeave: ae,
        itemTextRefCallback: ie,
        focusSelectedItem: j,
        selectedItemText: G,
        position: u,
        isPositioned: ee,
        searchRef: se,
        children: /* @__PURE__ */ n(Je, { as: Tt, allowPinchZoom: !0, children: /* @__PURE__ */ n(
          Qe,
          {
            asChild: !0,
            trapped: h.open,
            onMountAutoFocus: (m) => {
              m.preventDefault();
            },
            onUnmountAutoFocus: E(a, (m) => {
              h.trigger?.focus({ preventScroll: !0 }), m.preventDefault();
            }),
            children: /* @__PURE__ */ n(
              qe,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: f,
                onPointerDownOutside: i,
                onFocusOutside: (m) => m.preventDefault(),
                onDismiss: () => h.onOpenChange(!1),
                children: /* @__PURE__ */ n(
                  fe,
                  {
                    role: "listbox",
                    id: h.contentId,
                    "data-state": h.open ? "open" : "closed",
                    dir: h.dir,
                    onContextMenu: (m) => m.preventDefault(),
                    ...w,
                    ...ue,
                    onPlaced: () => K(!0),
                    ref: A,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...w.style
                    },
                    onKeyDown: E(w.onKeyDown, (m) => {
                      const _ = m.ctrlKey || m.altKey || m.metaKey;
                      if (m.key === "Tab" && m.preventDefault(), !_ && m.key.length === 1 && M(m.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(m.key)) {
                        let b = z().filter((y) => !y.disabled).map((y) => y.ref.current);
                        if (["ArrowUp", "End"].includes(m.key) && (b = b.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(m.key)) {
                          const y = m.target, R = b.indexOf(y);
                          b = b.slice(R + 1);
                        }
                        setTimeout(() => $(b)), m.preventDefault();
                      }
                    })
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }, "SelectContentImpl")
), Rt = /* @__PURE__ */ o.forwardRef(/* @__PURE__ */ g(function(e, r) {
  const { __scopeSelect: t, onPlaced: u, ...a } = e, f = Z(ne, t), i = ce(ne, t), [l, c] = o.useState(null), [v, x] = o.useState(null), C = U(r, x), P = ge(t), I = o.useRef(!1), T = o.useRef(!0), { viewport: d, selectedItem: S, selectedItemText: w, focusSelectedItem: h } = i, p = o.useCallback(() => {
    if (f.trigger && f.valueNode && l && v && d && S && w) {
      const A = f.trigger.getBoundingClientRect(), B = v.getBoundingClientRect(), Q = f.valueNode.getBoundingClientRect(), G = w.getBoundingClientRect();
      if (f.dir !== "rtl") {
        const y = G.left - B.left, R = Q.left - y, te = A.left - R, oe = A.width + te, Se = Math.max(oe, B.width), ve = window.innerWidth - k, we = Re(R, [
          k,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(k, ve - Se)
        ]);
        l.style.minWidth = oe + "px", l.style.left = we + "px";
      } else {
        const y = B.right - G.right, R = window.innerWidth - Q.right - y, te = window.innerWidth - A.right - R, oe = A.width + te, Se = Math.max(oe, B.width), ve = window.innerWidth - k, we = Re(R, [
          k,
          Math.max(k, ve - Se)
        ]);
        l.style.minWidth = oe + "px", l.style.right = we + "px";
      }
      const W = P(), z = window.innerHeight - k * 2, ee = d.scrollHeight, K = window.getComputedStyle(v), V = parseInt(K.borderTopWidth, 10), $ = parseInt(K.paddingTop, 10), j = parseInt(K.borderBottomWidth, 10), Y = parseInt(K.paddingBottom, 10), H = V + $ + ee + Y + j, se = Math.min(S.offsetHeight * 5, H), M = window.getComputedStyle(d), F = parseInt(M.paddingTop, 10), ae = parseInt(M.paddingBottom, 10), ie = A.top + A.height / 2 - k, fe = z - ie, ue = S.offsetHeight / 2, m = S.offsetTop + ue, _ = V + $ + m, D = H - _;
      if (_ <= ie) {
        const y = W.length > 0 && S === W[W.length - 1].ref.current;
        l.style.bottom = "0px";
        const R = v.clientHeight - d.offsetTop - d.offsetHeight, te = Math.max(
          fe,
          ue + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (y ? ae : 0) + R + j
        ), oe = _ + te;
        l.style.height = oe + "px";
      } else {
        const y = W.length > 0 && S === W[0].ref.current;
        l.style.top = "0px";
        const te = Math.max(
          ie,
          V + d.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (y ? F : 0) + ue
        ) + D;
        l.style.height = te + "px", d.scrollTop = _ - ie + d.offsetTop;
      }
      l.style.margin = `${k}px 0`, l.style.minHeight = se + "px", l.style.maxHeight = z + "px", u?.(), requestAnimationFrame(() => I.current = !0);
    }
  }, [
    P,
    f.trigger,
    f.valueNode,
    l,
    v,
    d,
    S,
    w,
    f.dir,
    u
  ]);
  X(() => p(), [p]);
  const [L, N] = o.useState();
  X(() => {
    v && N(window.getComputedStyle(v).zIndex);
  }, [v]);
  const J = o.useCallback(
    (A) => {
      A && T.current === !0 && (p(), h?.(), T.current = !1);
    },
    [p, h]
  );
  return /* @__PURE__ */ n(
    Et,
    {
      scope: t,
      contentWrapper: l,
      shouldExpandOnScrollRef: I,
      onScrollButtonChange: J,
      children: /* @__PURE__ */ n(
        "div",
        {
          ref: c,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: L
          },
          children: /* @__PURE__ */ n(
            O.div,
            {
              ...a,
              ref: C,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...a.style
              }
            }
          )
        }
      )
    }
  );
}, "SelectItemAlignedPosition")), Ne = /* @__PURE__ */ o.forwardRef(/* @__PURE__ */ g(function(e, r) {
  const {
    __scopeSelect: t,
    align: u = "start",
    collisionPadding: a = k,
    ...f
  } = e, i = ye(t);
  return /* @__PURE__ */ n(
    tt,
    {
      ...i,
      ...f,
      ref: r,
      align: u,
      collisionPadding: a,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...f.style,
        "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width": "var(--radix-popper-available-width)",
        "--radix-select-content-available-height": "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
}, "SelectPopperPosition")), [Et, Pe] = le(ne, {}), Me = "SelectViewport", Nt = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ g(function(e, r) {
    const { __scopeSelect: t, nonce: u, ...a } = e, f = ce(Me, t), i = Pe(Me, t), l = U(r, f.onViewportChange), c = o.useRef(0);
    return /* @__PURE__ */ re(Ce, { children: [
      /* @__PURE__ */ n(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: u
        }
      ),
      /* @__PURE__ */ n(he.Slot, { scope: t, children: /* @__PURE__ */ n(
        O.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...a,
          ref: l,
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: "hidden auto",
            ...a.style
          },
          onScroll: E(a.onScroll, (v) => {
            const x = v.currentTarget, { contentWrapper: C, shouldExpandOnScrollRef: P } = i;
            if (P?.current && C) {
              const I = Math.abs(c.current - x.scrollTop);
              if (I > 0) {
                const T = window.innerHeight - k * 2, d = parseFloat(C.style.minHeight), S = parseFloat(C.style.height), w = Math.max(d, S);
                if (w < T) {
                  const h = w + I, p = Math.min(T, h), L = h - p;
                  C.style.height = p + "px", C.style.bottom === "0px" && (x.scrollTop = L > 0 ? L : 0, C.style.justifyContent = "flex-end");
                }
              }
            }
            c.current = x.scrollTop;
          })
        }
      ) })
    ] });
  }, "SelectViewport")
), Mt = "SelectGroup", [Dt, Ot] = le(Mt), Lt = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ g(function(e, r) {
    const { __scopeSelect: t, ...u } = e, a = Ie();
    return /* @__PURE__ */ n(Dt, { scope: t, id: a, children: /* @__PURE__ */ n(O.div, { role: "group", "aria-labelledby": a, ...u, ref: r }) });
  }, "SelectGroup")
), At = "SelectLabel", kt = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ g(function(e, r) {
    const { __scopeSelect: t, ...u } = e, a = Ot(At, t);
    return /* @__PURE__ */ n(O.div, { id: a.id, ...u, ref: r });
  }, "SelectLabel")
), xe = "SelectItem", [Bt, He] = le(xe), Vt = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ g(function(e, r) {
    const {
      __scopeSelect: t,
      value: u,
      disabled: a = !1,
      textValue: f,
      ...i
    } = e, l = Z(xe, t), c = ce(xe, t), v = l.value === u, [x, C] = o.useState(f ?? ""), [P, I] = o.useState(!1), T = be(
      (p) => c.itemRefCallback?.(p, u, a)
    ), d = U(r, T), S = Ie(), w = o.useRef("touch"), h = /* @__PURE__ */ g(() => {
      a || (l.onValueChange(u), l.onOpenChange(!1));
    }, "handleSelect");
    return /* @__PURE__ */ n(
      Bt,
      {
        scope: t,
        value: u,
        disabled: a,
        textId: S,
        isSelected: v,
        onItemTextChange: o.useCallback((p) => {
          C((L) => L || (p?.textContent ?? "").trim());
        }, []),
        children: /* @__PURE__ */ n(
          he.ItemSlot,
          {
            scope: t,
            value: u,
            disabled: a,
            textValue: x,
            children: /* @__PURE__ */ n(
              O.div,
              {
                role: "option",
                "aria-labelledby": S,
                "data-highlighted": P ? "" : void 0,
                "aria-selected": v && P,
                "data-state": v ? "checked" : "unchecked",
                "aria-disabled": a || void 0,
                "data-disabled": a ? "" : void 0,
                tabIndex: a ? void 0 : -1,
                ...i,
                ref: d,
                onFocus: E(i.onFocus, () => I(!0)),
                onBlur: E(i.onBlur, () => I(!1)),
                onClick: E(i.onClick, () => {
                  w.current !== "mouse" && h();
                }),
                onPointerUp: E(i.onPointerUp, () => {
                  w.current === "mouse" && h();
                }),
                onPointerDown: E(i.onPointerDown, (p) => {
                  w.current = p.pointerType;
                }),
                onPointerMove: E(i.onPointerMove, (p) => {
                  w.current = p.pointerType, a ? c.onItemLeave?.() : w.current === "mouse" && p.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: E(i.onPointerLeave, (p) => {
                  p.currentTarget === document.activeElement && c.onItemLeave?.();
                }),
                onKeyDown: E(i.onKeyDown, (p) => {
                  a || p.target !== p.currentTarget || c.searchRef?.current !== "" && p.key === " " || (it.includes(p.key) && h(), p.key === " " && p.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }, "SelectItem")
), me = "SelectItemText", Ht = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ g(function(e, r) {
    const { __scopeSelect: t, className: u, style: a, ...f } = e, i = Z(me, t), l = ce(me, t), c = He(me, t), v = ft(me, t), [x, C] = o.useState(null), P = be(
      (h) => l.itemTextRefCallback?.(h, c.value, c.disabled)
    ), I = U(
      r,
      C,
      c.onItemTextChange,
      P
    ), T = x?.textContent, d = o.useMemo(
      () => /* @__PURE__ */ n("option", { value: c.value, disabled: c.disabled, children: T }, c.value),
      [c.disabled, c.value, T]
    ), { onNativeOptionAdd: S, onNativeOptionRemove: w } = v;
    return X(() => (S(d), () => w(d)), [S, w, d]), /* @__PURE__ */ re(Ce, { children: [
      /* @__PURE__ */ n(O.span, { id: c.textId, ...f, ref: I }),
      c.isSelected && i.valueNode && !i.valueNodeHasChildren && !pe(i.value) ? Ae.createPortal(f.children, i.valueNode) : null
    ] });
  }, "SelectItemText")
), Ft = "SelectItemIndicator", Ut = /* @__PURE__ */ o.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ g(function(e, r) {
    const { __scopeSelect: t, ...u } = e;
    return He(Ft, t).isSelected ? /* @__PURE__ */ n(O.span, { "aria-hidden": !0, ...u, ref: r }) : null;
  }, "SelectItemIndicator")
), De = "SelectScrollUpButton", Wt = /* @__PURE__ */ o.forwardRef(/* @__PURE__ */ g(function(e, r) {
  const t = ce(De, e.__scopeSelect), u = Pe(De, e.__scopeSelect), [a, f] = o.useState(!1), i = U(r, u.onScrollButtonChange);
  return X(() => {
    if (t.viewport && t.isPositioned) {
      let l = function() {
        const v = c.scrollTop > 0;
        f(v);
      };
      g(l, "handleScroll");
      const c = t.viewport;
      return l(), c.addEventListener("scroll", l), () => c.removeEventListener("scroll", l);
    }
  }, [t.viewport, t.isPositioned]), a ? /* @__PURE__ */ n(
    Fe,
    {
      ...e,
      ref: i,
      onAutoScroll: () => {
        const { viewport: l, selectedItem: c } = t;
        l && c && (l.scrollTop = l.scrollTop - c.offsetHeight);
      }
    }
  ) : null;
}, "SelectScrollUpButton")), Oe = "SelectScrollDownButton", zt = /* @__PURE__ */ o.forwardRef(/* @__PURE__ */ g(function(e, r) {
  const t = ce(Oe, e.__scopeSelect), u = Pe(Oe, e.__scopeSelect), [a, f] = o.useState(!1), i = U(r, u.onScrollButtonChange);
  return X(() => {
    if (t.viewport && t.isPositioned) {
      let l = function() {
        const v = c.scrollHeight - c.clientHeight, x = Math.ceil(c.scrollTop) < v;
        f(x);
      };
      g(l, "handleScroll");
      const c = t.viewport;
      return l(), c.addEventListener("scroll", l), () => c.removeEventListener("scroll", l);
    }
  }, [t.viewport, t.isPositioned]), a ? /* @__PURE__ */ n(
    Fe,
    {
      ...e,
      ref: i,
      onAutoScroll: () => {
        const { viewport: l, selectedItem: c } = t;
        l && c && (l.scrollTop = l.scrollTop + c.offsetHeight);
      }
    }
  ) : null;
}, "SelectScrollDownButton")), Fe = /* @__PURE__ */ o.forwardRef(/* @__PURE__ */ g(function(e, r) {
  const { __scopeSelect: t, onAutoScroll: u, ...a } = e, f = ce("SelectScrollButton", t), i = o.useRef(null), l = ge(t), c = o.useCallback(() => {
    i.current !== null && (window.clearInterval(i.current), i.current = null);
  }, []);
  return o.useEffect(() => () => c(), [c]), X(() => {
    l().find((x) => x.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
  }, [l]), /* @__PURE__ */ n(
    O.div,
    {
      "aria-hidden": !0,
      ...a,
      ref: r,
      style: { flexShrink: 0, ...a.style },
      onPointerDown: E(a.onPointerDown, () => {
        i.current === null && (i.current = window.setInterval(u, 50));
      }),
      onPointerMove: E(a.onPointerMove, () => {
        f.onItemLeave?.(), i.current === null && (i.current = window.setInterval(u, 50));
      }),
      onPointerLeave: E(a.onPointerLeave, () => {
        c();
      })
    }
  );
}, "SelectScrollButtonImpl")), Kt = /* @__PURE__ */ o.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ g(function(e, r) {
    const { __scopeSelect: t, ...u } = e;
    return /* @__PURE__ */ n(O.div, { "aria-hidden": !0, ...u, ref: r });
  }, "SelectSeparator")
), Gt = "SelectBubbleInput", $t = /* @__PURE__ */ o.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ g(function({ __scopeSelect: e, ...r }, t) {
    const u = Z(Gt, e), { value: a, onValueChange: f, required: i, disabled: l, name: c, autoComplete: v, form: x } = u, { nativeOptions: C, nativeSelectKey: P } = u, I = o.useRef(null), T = U(t, I), d = a ?? "", S = lt(d), w = Array.from(C).some(
      (h) => (h.props.value ?? "") === ""
    );
    return o.useEffect(() => {
      const h = I.current;
      if (!h) return;
      const p = window.HTMLSelectElement.prototype, N = Object.getOwnPropertyDescriptor(
        p,
        "value"
      ).set;
      if (S !== d && N) {
        const J = new Event("change", { bubbles: !0 });
        N.call(h, d), h.dispatchEvent(J);
      }
    }, [S, d]), /* @__PURE__ */ re(
      O.select,
      {
        "aria-hidden": !0,
        required: i,
        tabIndex: -1,
        name: c,
        autoComplete: v,
        disabled: l,
        form: x,
        onChange: (h) => f(h.target.value),
        ...r,
        style: { ...ct, ...r.style },
        ref: T,
        defaultValue: d,
        children: [
          pe(a) && !w ? /* @__PURE__ */ n("option", { value: "" }) : null,
          Array.from(C)
        ]
      },
      P
    );
  }, "SelectBubbleInput")
);
function Ue(s) {
  return typeof s == "function";
}
g(Ue, "isFunction");
function pe(s) {
  return s === "" || s === void 0;
}
g(pe, "shouldShowPlaceholder");
function Te(s) {
  const e = be(s), r = o.useRef(""), t = o.useRef(0), u = o.useCallback(
    (f) => {
      const i = r.current + f;
      e(i), (/* @__PURE__ */ g((function l(c) {
        r.current = c, window.clearTimeout(t.current), c !== "" && (t.current = window.setTimeout(() => l(""), 1e3));
      }), "updateSearch"))(i);
    },
    [e]
  ), a = o.useCallback(() => {
    r.current = "", window.clearTimeout(t.current);
  }, []);
  return o.useEffect(() => () => window.clearTimeout(t.current), []), [r, u, a];
}
g(Te, "useTypeaheadSearch");
function _e(s, e, r) {
  const u = e.length > 1 && Array.from(e).every((c) => c === e[0]) ? e[0] : e, a = r ? s.indexOf(r) : -1;
  let f = We(s, Math.max(a, 0));
  u.length === 1 && (f = f.filter((c) => c !== r));
  const l = f.find(
    (c) => c.textValue.toLowerCase().startsWith(u.toLowerCase())
  );
  return l !== r ? l : void 0;
}
g(_e, "findNextItem");
function We(s, e) {
  return s.map((r, t) => s[(e + t) % s.length]);
}
g(We, "wrapArray");
function vo({
  ...s
}) {
  return /* @__PURE__ */ n(mt, { "data-slot": "select", ...s });
}
function wo({
  ...s
}) {
  return /* @__PURE__ */ n(Lt, { "data-slot": "select-group", ...s });
}
function xo({
  ...s
}) {
  return /* @__PURE__ */ n(vt, { "data-slot": "select-value", ...s });
}
function Co({
  className: s,
  size: e = "default",
  children: r,
  ...t
}) {
  return /* @__PURE__ */ re(
    gt,
    {
      "data-slot": "select-trigger",
      "data-size": e,
      className: q(
        "flex w-fit items-center justify-between gap-2 rounded-text-field border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none hover:bg-accent focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive data-[placeholder]:text-muted-foreground data-[size=default]:h-12 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        s
      ),
      ...t,
      children: [
        r,
        /* @__PURE__ */ n(wt, { asChild: !0, children: /* @__PURE__ */ n(Le, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function Io({
  className: s,
  children: e,
  position: r = "item-aligned",
  align: t = "center",
  ...u
}) {
  return /* @__PURE__ */ n(bt, { children: /* @__PURE__ */ re(
    yt,
    {
      "data-slot": "select-content",
      className: q(
        "ui-background-blur relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-text-field border bg-popover text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        r === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        s
      ),
      position: r,
      align: t,
      ...u,
      children: [
        /* @__PURE__ */ n(jt, {}),
        /* @__PURE__ */ n(
          Nt,
          {
            className: q(
              "p-1",
              r === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children: e
          }
        ),
        /* @__PURE__ */ n(Yt, {})
      ]
    }
  ) });
}
function bo({
  className: s,
  ...e
}) {
  return /* @__PURE__ */ n(
    kt,
    {
      "data-slot": "select-label",
      className: q("px-2 py-1.5 text-xs text-muted-foreground", s),
      ...e
    }
  );
}
function yo({
  className: s,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ re(
    Vt,
    {
      "data-slot": "select-item",
      className: q(
        "relative flex min-h-12 w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        s
      ),
      ...r,
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            "data-slot": "select-item-indicator",
            className: "absolute right-2 flex size-3.5 items-center justify-center",
            children: /* @__PURE__ */ n(Ut, { children: /* @__PURE__ */ n(ze, { className: "size-4" }) })
          }
        ),
        /* @__PURE__ */ n(Ht, { children: e })
      ]
    }
  );
}
function Po({
  className: s,
  ...e
}) {
  return /* @__PURE__ */ n(
    Kt,
    {
      "data-slot": "select-separator",
      className: q("pointer-events-none -mx-1 my-1 h-px bg-border", s),
      ...e
    }
  );
}
function jt({
  className: s,
  ...e
}) {
  return /* @__PURE__ */ n(
    Wt,
    {
      "data-slot": "select-scroll-up-button",
      className: q(
        "flex cursor-default items-center justify-center py-1",
        s
      ),
      ...e,
      children: /* @__PURE__ */ n(Ke, { className: "size-4" })
    }
  );
}
function Yt({
  className: s,
  ...e
}) {
  return /* @__PURE__ */ n(
    zt,
    {
      "data-slot": "select-scroll-down-button",
      className: q(
        "flex cursor-default items-center justify-center py-1",
        s
      ),
      ...e,
      children: /* @__PURE__ */ n(Le, { className: "size-4" })
    }
  );
}
export {
  vo as Select,
  Io as SelectContent,
  wo as SelectGroup,
  yo as SelectItem,
  bo as SelectLabel,
  Yt as SelectScrollDownButton,
  jt as SelectScrollUpButton,
  Po as SelectSeparator,
  Co as SelectTrigger,
  xo as SelectValue
};
