import * as o from "react";
import { c as v } from "./index-BMzaJ9ZT.js";
import { c as Ge } from "./index-CxcvVwJj.js";
import { u as k, b as Ke } from "./index-OZUlxC0o.js";
import { c as Ne } from "./index-oVmar2KU.js";
import { u as Ue } from "./index-B0BN408G.js";
import { D as Ve } from "./index-CXD0mMyT.js";
import { h as Be, u as Ye, R as je, F as Xe } from "./index-Cb-eNU_M.js";
import { u as ie } from "./index-DAdtpYSB.js";
import { c as de, P as fe, a as He, b as We } from "./index-CBZsXggQ.js";
import { P as ze } from "./index-BVuqQyzd.js";
import { P as j } from "./index-KdL-eaFo.js";
import { P as L, d as Ze } from "./index-Si5tf8-e.js";
import { c as pe, R as qe, a as Je } from "./index-JYieXO2U.js";
import { u as ee } from "./index-CRNjeP0c.js";
import { jsx as a } from "react/jsx-runtime";
var Qe = Object.defineProperty, f = (c, e) => Qe(c, "name", { value: e, configurable: !0 }), Q = ["Enter", " "], $e = ["ArrowDown", "PageUp", "Home"], me = ["ArrowUp", "PageDown", "End"], en = [...$e, ...me], nn = {
  ltr: [...Q, "ArrowRight"],
  rtl: [...Q, "ArrowLeft"]
}, tn = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, X = "Menu", [A, on, rn] = Ge(X), [E, Ln] = Ne(X, [
  rn,
  de,
  pe
]), H = de(), Me = pe(), [he, I] = E(X), [cn, G] = E(X), Gn = /* @__PURE__ */ f((c) => {
  const { __scopeMenu: e, open: t = !1, children: n, dir: r, onOpenChange: s, modal: u = !0 } = c, p = H(e), [M, m] = o.useState(null), C = o.useRef(!1), h = ee(s), l = Ue(r);
  return o.useEffect(() => {
    const d = /* @__PURE__ */ f(() => {
      C.current = !0, document.addEventListener("pointerdown", g, { capture: !0, once: !0 }), document.addEventListener("pointermove", g, { capture: !0, once: !0 });
    }, "handleKeyDown"), g = /* @__PURE__ */ f(() => C.current = !1, "handlePointer");
    return document.addEventListener("keydown", d, { capture: !0 }), () => {
      document.removeEventListener("keydown", d, { capture: !0 }), document.removeEventListener("pointerdown", g, { capture: !0 }), document.removeEventListener("pointermove", g, { capture: !0 });
    };
  }, []), o.useEffect(() => {
    if (!t)
      return;
    const d = /* @__PURE__ */ f(() => h(!1), "handleBlur");
    return window.addEventListener("blur", d), () => window.removeEventListener("blur", d);
  }, [t, h]), /* @__PURE__ */ a(fe, { ...p, children: /* @__PURE__ */ a(
    he,
    {
      scope: e,
      open: t,
      onOpenChange: h,
      content: M,
      onContentChange: m,
      children: /* @__PURE__ */ a(
        cn,
        {
          scope: e,
          onClose: o.useCallback(() => h(!1), [h]),
          isUsingKeyboardRef: C,
          dir: l,
          modal: u,
          children: n
        }
      )
    }
  ) });
}, "Menu"), un = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ f(function(e, t) {
    const { __scopeMenu: n, ...r } = e, s = H(n);
    return /* @__PURE__ */ a(He, { ...s, ...r, ref: t });
  }, "MenuAnchor")
), Ce = "MenuPortal", [an, ge] = E(Ce, {
  forceMount: void 0
}), Kn = /* @__PURE__ */ f((c) => {
  const { __scopeMenu: e, forceMount: t, children: n, container: r } = c, s = I(Ce, e);
  return /* @__PURE__ */ a(an, { scope: e, forceMount: t, children: /* @__PURE__ */ a(j, { present: t || s.open, children: /* @__PURE__ */ a(ze, { asChild: !0, container: r, children: n }) }) });
}, "MenuPortal"), P = "MenuContent", [sn, ne] = E(P), Nn = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ f(function(e, t) {
    const n = ge(P, e.__scopeMenu), { forceMount: r = n.forceMount, ...s } = e, u = I(P, e.__scopeMenu), p = G(P, e.__scopeMenu);
    return /* @__PURE__ */ a(A.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ a(j, { present: r || u.open, children: /* @__PURE__ */ a(A.Slot, { scope: e.__scopeMenu, children: p.modal ? /* @__PURE__ */ a(ln, { ...s, ref: t }) : /* @__PURE__ */ a(dn, { ...s, ref: t }) }) }) });
  }, "MenuContent")
), ln = /* @__PURE__ */ o.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, t) {
    const n = I(P, e.__scopeMenu), r = o.useRef(null), s = k(t, r);
    return o.useEffect(() => {
      const u = r.current;
      if (u) return Be(u);
    }, []), /* @__PURE__ */ a(
      te,
      {
        ...e,
        ref: s,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: v(
          e.onFocusOutside,
          (u) => u.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }, "MenuRootContentModal")
), dn = /* @__PURE__ */ o.forwardRef(/* @__PURE__ */ f(function(e, t) {
  const n = I(P, e.__scopeMenu);
  return /* @__PURE__ */ a(
    te,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}, "MenuRootContentNonModal")), fn = Ke("MenuContent.ScrollLock"), te = /* @__PURE__ */ o.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, t) {
    const {
      __scopeMenu: n,
      loop: r = !1,
      trapFocus: s,
      onOpenAutoFocus: u,
      onCloseAutoFocus: p,
      disableOutsidePointerEvents: M,
      onEntryFocus: m,
      onEscapeKeyDown: C,
      onPointerDownOutside: h,
      onFocusOutside: l,
      onInteractOutside: d,
      onDismiss: g,
      disableOutsideScroll: _,
      ...S
    } = e, K = I(P, n), b = G(P, n), N = H(n), ye = Me(n), re = on(n), [ke, ce] = o.useState(null), U = o.useRef(null), De = k(t, U, K.onContentChange), V = o.useRef(0), B = o.useRef(""), Oe = o.useRef(0), z = o.useRef(null), ue = o.useRef("right"), Z = o.useRef(0), Ae = _ ? je : o.Fragment, Fe = _ ? { as: fn, allowPinchZoom: !0 } : void 0, Le = /* @__PURE__ */ f((i) => {
      const T = B.current + i, w = re().filter((R) => !R.disabled), D = document.activeElement, q = w.find((R) => R.ref.current === D)?.textValue, J = w.map((R) => R.textValue), ae = be(J, T, q), O = w.find((R) => R.textValue === ae)?.ref.current;
      (/* @__PURE__ */ f((function R(se) {
        B.current = se, window.clearTimeout(V.current), se !== "" && (V.current = window.setTimeout(() => R(""), 1e3));
      }), "updateSearch"))(T), O && setTimeout(() => O.focus());
    }, "handleTypeaheadSearch");
    o.useEffect(() => () => window.clearTimeout(V.current), []), Ye();
    const x = o.useCallback((i) => ue.current === z.current?.side && Te(i, z.current?.area), []);
    return /* @__PURE__ */ a(
      sn,
      {
        scope: n,
        searchRef: B,
        onItemEnter: o.useCallback(
          (i) => {
            x(i) && i.preventDefault();
          },
          [x]
        ),
        onItemLeave: o.useCallback(
          (i) => {
            x(i) || (U.current?.focus(), ce(null));
          },
          [x]
        ),
        onTriggerLeave: o.useCallback(
          (i) => {
            x(i) && i.preventDefault();
          },
          [x]
        ),
        pointerGraceTimerRef: Oe,
        onPointerGraceIntentChange: o.useCallback((i) => {
          z.current = i;
        }, []),
        children: /* @__PURE__ */ a(Ae, { ...Fe, children: /* @__PURE__ */ a(
          Xe,
          {
            asChild: !0,
            trapped: s,
            onMountAutoFocus: v(u, (i) => {
              i.preventDefault(), U.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: p,
            children: /* @__PURE__ */ a(
              Ve,
              {
                asChild: !0,
                disableOutsidePointerEvents: M,
                onEscapeKeyDown: C,
                onPointerDownOutside: h,
                onFocusOutside: l,
                onInteractOutside: d,
                onDismiss: g,
                children: /* @__PURE__ */ a(
                  qe,
                  {
                    asChild: !0,
                    ...ye,
                    dir: b.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: ke,
                    onCurrentTabStopIdChange: ce,
                    onEntryFocus: v(m, (i) => {
                      b.isUsingKeyboardRef.current || i.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ a(
                      We,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": oe(K.open),
                        "data-radix-menu-content": "",
                        dir: b.dir,
                        ...N,
                        ...S,
                        ref: De,
                        style: { outline: "none", ...S.style },
                        onKeyDown: v(S.onKeyDown, (i) => {
                          const w = i.target.closest("[data-radix-menu-content]") === i.currentTarget, D = i.ctrlKey || i.altKey || i.metaKey, q = i.key.length === 1;
                          w && (i.key === "Tab" && i.preventDefault(), !D && q && Le(i.key));
                          const J = U.current;
                          if (i.target !== J || !en.includes(i.key)) return;
                          i.preventDefault();
                          const O = re().filter((R) => !R.disabled).map((R) => R.ref.current);
                          me.includes(i.key) && O.reverse(), we(O);
                        }),
                        onBlur: v(e.onBlur, (i) => {
                          i.currentTarget.contains(i.target) || (window.clearTimeout(V.current), B.current = "");
                        }),
                        onPointerMove: v(
                          e.onPointerMove,
                          y((i) => {
                            const T = i.target, w = Z.current !== i.clientX;
                            if (i.currentTarget.contains(T) && w) {
                              const D = i.clientX > Z.current ? "right" : "left";
                              ue.current = D, Z.current = i.clientX;
                            }
                          })
                        )
                      }
                    )
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }, "MenuContentImpl")
), pn = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ f(function(e, t) {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ a(L.div, { role: "group", ...r, ref: t });
  }, "MenuGroup")
), Un = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ f(function(e, t) {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ a(L.div, { ...r, ref: t });
  }, "MenuLabel")
), $ = "MenuItem", le = "menu.itemSelect", ve = /* @__PURE__ */ o.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, t) {
    const { disabled: n = !1, onSelect: r, ...s } = e, u = o.useRef(null), p = G($, e.__scopeMenu), M = ne($, e.__scopeMenu), m = k(t, u), C = o.useRef(!1), h = /* @__PURE__ */ f(() => {
      const l = u.current;
      if (!n && l) {
        const d = new CustomEvent(le, { bubbles: !0, cancelable: !0 });
        l.addEventListener(le, (g) => r?.(g), { once: !0 }), Ze(l, d), d.defaultPrevented ? C.current = !1 : p.onClose();
      }
    }, "handleSelect");
    return /* @__PURE__ */ a(
      _e,
      {
        ...s,
        ref: m,
        disabled: n,
        onClick: v(e.onClick, h),
        onPointerDown: (l) => {
          e.onPointerDown?.(l), C.current = !0;
        },
        onPointerUp: v(e.onPointerUp, (l) => {
          C.current || l.currentTarget?.click();
        }),
        onKeyDown: v(e.onKeyDown, (l) => {
          n || l.target !== l.currentTarget || M.searchRef.current !== "" && l.key === " " || Q.includes(l.key) && (l.currentTarget.click(), l.preventDefault());
        })
      }
    );
  }, "MenuItem")
), _e = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ f(function(e, t) {
    const { __scopeMenu: n, disabled: r = !1, textValue: s, ...u } = e, p = ne($, n), M = Me(n), m = o.useRef(null), C = k(t, m), [h, l] = o.useState(!1), [d, g] = o.useState("");
    return o.useEffect(() => {
      const _ = m.current;
      _ && g((_.textContent ?? "").trim());
    }, [u.children]), /* @__PURE__ */ a(
      A.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: s ?? d,
        children: /* @__PURE__ */ a(Je, { asChild: !0, ...M, focusable: !r, children: /* @__PURE__ */ a(
          L.div,
          {
            role: "menuitem",
            "data-highlighted": h ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...u,
            ref: C,
            onPointerMove: v(
              e.onPointerMove,
              y((_) => {
                r ? p.onItemLeave(_) : (p.onItemEnter(_), _.defaultPrevented || _.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: v(
              e.onPointerLeave,
              y((_) => p.onItemLeave(_))
            ),
            onFocus: v(e.onFocus, () => l(!0)),
            onBlur: v(e.onBlur, () => l(!1))
          }
        ) })
      }
    );
  }, "MenuItemImpl")
), Vn = /* @__PURE__ */ o.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, t) {
    const { checked: n = !1, onCheckedChange: r, ...s } = e;
    return /* @__PURE__ */ a(Pe, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ a(
      ve,
      {
        role: "menuitemcheckbox",
        "aria-checked": F(n) ? "mixed" : n,
        ...s,
        ref: t,
        "data-state": W(n),
        onSelect: v(
          s.onSelect,
          () => r?.(F(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }, "MenuCheckboxItem")
), mn = "MenuRadioGroup", [Mn, hn] = E(
  mn,
  { value: void 0, onValueChange: /* @__PURE__ */ f(() => {
  }, "onValueChange") }
), Bn = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ f(function(e, t) {
    const { value: n, onValueChange: r, ...s } = e, u = ee(r);
    return /* @__PURE__ */ a(Mn, { scope: e.__scopeMenu, value: n, onValueChange: u, children: /* @__PURE__ */ a(pn, { ...s, ref: t }) });
  }, "MenuRadioGroup")
), Cn = "MenuRadioItem", Yn = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ f(function(e, t) {
    const { value: n, ...r } = e, s = hn(Cn, e.__scopeMenu), u = n === s.value;
    return /* @__PURE__ */ a(Pe, { scope: e.__scopeMenu, checked: u, children: /* @__PURE__ */ a(
      ve,
      {
        role: "menuitemradio",
        "aria-checked": u,
        ...r,
        ref: t,
        "data-state": W(u),
        onSelect: v(
          r.onSelect,
          () => s.onValueChange?.(n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }, "MenuRadioItem")
), Re = "MenuItemIndicator", [Pe, gn] = E(
  Re,
  { checked: !1 }
), jn = /* @__PURE__ */ o.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, t) {
    const { __scopeMenu: n, forceMount: r, ...s } = e, u = gn(Re, n);
    return /* @__PURE__ */ a(
      j,
      {
        present: r || F(u.checked) || u.checked === !0,
        children: /* @__PURE__ */ a(
          L.span,
          {
            ...s,
            ref: t,
            "data-state": W(u.checked)
          }
        )
      }
    );
  }, "MenuItemIndicator")
), Xn = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ f(function(e, t) {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ a(
      L.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...r,
        ref: t
      }
    );
  }, "MenuSeparator")
), Se = "MenuSub", [vn, Ie] = E(Se), Hn = /* @__PURE__ */ f((c) => {
  const { __scopeMenu: e, children: t, open: n = !1, onOpenChange: r } = c, s = I(Se, e), u = H(e), [p, M] = o.useState(null), [m, C] = o.useState(null), h = ee(r);
  return o.useEffect(() => (s.open === !1 && h(!1), () => h(!1)), [s.open, h]), /* @__PURE__ */ a(fe, { ...u, children: /* @__PURE__ */ a(
    he,
    {
      scope: e,
      open: n,
      onOpenChange: h,
      content: m,
      onContentChange: C,
      children: /* @__PURE__ */ a(
        vn,
        {
          scope: e,
          contentId: ie(),
          triggerId: ie(),
          trigger: p,
          onTriggerChange: M,
          children: t
        }
      )
    }
  ) });
}, "MenuSub"), Y = "MenuSubTrigger", Wn = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ f(function(e, t) {
    const n = I(Y, e.__scopeMenu), r = G(Y, e.__scopeMenu), s = Ie(Y, e.__scopeMenu), u = ne(Y, e.__scopeMenu), p = o.useRef(null), { pointerGraceTimerRef: M, onPointerGraceIntentChange: m } = u, C = { __scopeMenu: e.__scopeMenu }, h = o.useCallback(() => {
      p.current && window.clearTimeout(p.current), p.current = null;
    }, []);
    o.useEffect(() => h, [h]), o.useEffect(() => {
      const d = M.current;
      return () => {
        window.clearTimeout(d), m(null);
      };
    }, [M, m]);
    const l = k(t, s.onTriggerChange);
    return /* @__PURE__ */ a(un, { asChild: !0, ...C, children: /* @__PURE__ */ a(
      _e,
      {
        id: s.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": n.open ? s.contentId : void 0,
        "data-state": oe(n.open),
        ...e,
        ref: l,
        onClick: (d) => {
          e.onClick?.(d), !(e.disabled || d.defaultPrevented) && (d.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: v(
          e.onPointerMove,
          y((d) => {
            u.onItemEnter(d), !d.defaultPrevented && !e.disabled && !n.open && !p.current && (u.onPointerGraceIntentChange(null), p.current = window.setTimeout(() => {
              n.onOpenChange(!0), h();
            }, 100));
          })
        ),
        onPointerLeave: v(
          e.onPointerLeave,
          y((d) => {
            h();
            const g = n.content?.getBoundingClientRect();
            if (g) {
              const _ = n.content?.dataset.side, S = _ === "right", K = S ? -5 : 5, b = g[S ? "left" : "right"], N = g[S ? "right" : "left"];
              u.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: d.clientX + K, y: d.clientY },
                  { x: b, y: g.top },
                  { x: N, y: g.top },
                  { x: N, y: g.bottom },
                  { x: b, y: g.bottom }
                ],
                side: _
              }), window.clearTimeout(M.current), M.current = window.setTimeout(
                () => u.onPointerGraceIntentChange(null),
                300
              );
            } else {
              if (u.onTriggerLeave(d), d.defaultPrevented) return;
              u.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: v(e.onKeyDown, (d) => {
          e.disabled || d.target !== d.currentTarget || u.searchRef.current !== "" && d.key === " " || nn[r.dir].includes(d.key) && (n.onOpenChange(!0), n.content?.focus(), d.preventDefault());
        })
      }
    ) });
  }, "MenuSubTrigger")
), _n = "MenuSubContent", zn = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ f(function(e, t) {
    const n = ge(P, e.__scopeMenu), { forceMount: r = n.forceMount, align: s = "start", ...u } = e, p = I(P, e.__scopeMenu), M = G(P, e.__scopeMenu), m = Ie(_n, e.__scopeMenu), C = o.useRef(null), h = k(t, C);
    return /* @__PURE__ */ a(A.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ a(j, { present: r || p.open, children: /* @__PURE__ */ a(A.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ a(
      te,
      {
        id: m.contentId,
        "aria-labelledby": m.triggerId,
        ...u,
        ref: h,
        align: s,
        side: M.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        trapFocus: !1,
        onOpenAutoFocus: (l) => {
          M.isUsingKeyboardRef.current && C.current?.focus(), l.preventDefault();
        },
        onCloseAutoFocus: (l) => l.preventDefault(),
        onFocusOutside: v(e.onFocusOutside, (l) => {
          l.target !== m.trigger && p.onOpenChange(!1);
        }),
        onEscapeKeyDown: v(e.onEscapeKeyDown, (l) => {
          M.onClose(), l.preventDefault();
        }),
        onKeyDown: v(e.onKeyDown, (l) => {
          const d = l.currentTarget.contains(l.target), g = tn[M.dir].includes(l.key);
          d && g && (p.onOpenChange(!1), m.trigger?.focus(), l.preventDefault());
        })
      }
    ) }) }) });
  }, "MenuSubContent")
);
function oe(c) {
  return c ? "open" : "closed";
}
f(oe, "getOpenState");
function F(c) {
  return c === "indeterminate";
}
f(F, "isIndeterminate");
function W(c) {
  return F(c) ? "indeterminate" : c ? "checked" : "unchecked";
}
f(W, "getCheckedState");
function we(c) {
  const e = document.activeElement;
  for (const t of c)
    if (t === e || (t.focus(), document.activeElement !== e)) return;
}
f(we, "focusFirst");
function Ee(c, e) {
  return c.map((t, n) => c[(e + n) % c.length]);
}
f(Ee, "wrapArray");
function be(c, e, t) {
  const r = e.length > 1 && Array.from(e).every((m) => m === e[0]) ? e[0] : e, s = t ? c.indexOf(t) : -1;
  let u = Ee(c, Math.max(s, 0));
  r.length === 1 && (u = u.filter((m) => m !== t));
  const M = u.find(
    (m) => m.toLowerCase().startsWith(r.toLowerCase())
  );
  return M !== t ? M : void 0;
}
f(be, "getNextMatch");
function xe(c, e) {
  const { x: t, y: n } = c;
  let r = !1;
  for (let s = 0, u = e.length - 1; s < e.length; u = s++) {
    const p = e[s], M = e[u], m = p.x, C = p.y, h = M.x, l = M.y;
    C > n != l > n && t < (h - m) * (n - C) / (l - C) + m && (r = !r);
  }
  return r;
}
f(xe, "isPointInPolygon");
function Te(c, e) {
  if (!e) return !1;
  const t = { x: c.clientX, y: c.clientY };
  return xe(t, e);
}
f(Te, "isPointerInGraceArea");
function y(c) {
  return (e) => e.pointerType === "mouse" ? c(e) : void 0;
}
f(y, "whenMouse");
export {
  Gn as M,
  un as a,
  Kn as b,
  Ln as c,
  Nn as d,
  pn as e,
  Un as f,
  ve as g,
  Vn as h,
  Bn as i,
  Yn as j,
  jn as k,
  Xn as l,
  Hn as m,
  Wn as n,
  zn as o
};
