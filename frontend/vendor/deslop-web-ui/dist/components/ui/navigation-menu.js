import { jsx as r, jsxs as G, Fragment as ee } from "react/jsx-runtime";
import { c as me } from "../../index-D6rtmMCZ.js";
import { c as pe } from "../../icons-DUsO7wRs.js";
import { c as k } from "../../utils-TrrhThB-.js";
import * as i from "react";
import * as we from "react-dom";
import { c as he } from "../../index-oVmar2KU.js";
import { c as T } from "../../index-BMzaJ9ZT.js";
import { P, d as te } from "../../index-Si5tf8-e.js";
import { u as Me } from "../../index-CECqponX.js";
import { u as L } from "../../index-OZUlxC0o.js";
import { u as Ce } from "../../index-B0BN408G.js";
import { P as H } from "../../index-KdL-eaFo.js";
import { u as ie } from "../../index-DAdtpYSB.js";
import { c as re } from "../../index-CxcvVwJj.js";
import { D as Ne } from "../../index-CXD0mMyT.js";
import { u as be } from "../../index-kQnlviVU.js";
import { u as Y } from "../../index-CCKe-Mpx.js";
import { u as D } from "../../index-CRNjeP0c.js";
import { V as Re } from "../../index-L6XBO05c.js";
var xe = Object.defineProperty, g = (t, e) => xe(t, "name", { value: e, configurable: !0 }), A = "NavigationMenu", [X, se, Ie] = re(A), [q, Ee, Te] = re(A), [J, mt] = he(
  A,
  [Ie, Te]
), [ye, y] = J(A), [Pe, _e] = J(A), ke = /* @__PURE__ */ i.forwardRef(
  /* @__PURE__ */ g(function(e, a) {
    const {
      __scopeNavigationMenu: o,
      value: u,
      onValueChange: s,
      defaultValue: n,
      delayDuration: c = 200,
      skipDelayDuration: f = 300,
      orientation: d = "horizontal",
      dir: N,
      ...l
    } = e, [h, R] = i.useState(null), b = L(a, R), p = Ce(N), M = i.useRef(0), C = i.useRef(0), I = i.useRef(0), [_, v] = i.useState(!0), [m, w] = Me({
      prop: u,
      onChange: /* @__PURE__ */ g((x) => {
        const O = x !== "", B = f > 0;
        O ? (window.clearTimeout(I.current), B && v(!1)) : (window.clearTimeout(I.current), I.current = window.setTimeout(
          () => v(!0),
          f
        )), s?.(x);
      }, "onChange"),
      defaultProp: n ?? "",
      caller: A
    }), E = i.useCallback(() => {
      window.clearTimeout(C.current), C.current = window.setTimeout(() => w(""), 150);
    }, [w]), F = i.useCallback(
      (x) => {
        window.clearTimeout(C.current), w(x);
      },
      [w]
    ), S = i.useCallback(
      (x) => {
        m === x ? window.clearTimeout(C.current) : M.current = window.setTimeout(() => {
          window.clearTimeout(C.current), w(x);
        }, c);
      },
      [m, w, c]
    );
    return i.useEffect(() => () => {
      window.clearTimeout(M.current), window.clearTimeout(C.current), window.clearTimeout(I.current);
    }, []), /* @__PURE__ */ r(
      Fe,
      {
        scope: o,
        isRootMenu: !0,
        value: m,
        dir: p,
        orientation: d,
        rootNavigationMenu: h,
        onTriggerEnter: (x) => {
          window.clearTimeout(M.current), _ ? S(x) : F(x);
        },
        onTriggerLeave: () => {
          window.clearTimeout(M.current), E();
        },
        onContentEnter: () => window.clearTimeout(C.current),
        onContentLeave: E,
        onItemSelect: (x) => {
          w((O) => O === x ? "" : x);
        },
        onItemDismiss: () => w(""),
        children: /* @__PURE__ */ r(
          P.nav,
          {
            "aria-label": "Main",
            "data-orientation": d,
            dir: p,
            ...l,
            ref: b
          }
        )
      }
    );
  }, "NavigationMenu")
), Fe = /* @__PURE__ */ g((t) => {
  const {
    scope: e,
    isRootMenu: a,
    rootNavigationMenu: o,
    dir: u,
    orientation: s,
    children: n,
    value: c,
    onItemSelect: f,
    onItemDismiss: d,
    onTriggerEnter: N,
    onTriggerLeave: l,
    onContentEnter: h,
    onContentLeave: R
  } = t, [b, p] = i.useState(null), [M, C] = i.useState(/* @__PURE__ */ new Map()), [I, _] = i.useState(null);
  return /* @__PURE__ */ r(
    ye,
    {
      scope: e,
      isRootMenu: a,
      rootNavigationMenu: o,
      value: c,
      previousValue: be(c),
      baseId: ie(),
      dir: u,
      orientation: s,
      viewport: b,
      onViewportChange: p,
      indicatorTrack: I,
      onIndicatorTrackChange: _,
      onTriggerEnter: D(N),
      onTriggerLeave: D(l),
      onContentEnter: D(h),
      onContentLeave: D(R),
      onItemSelect: D(f),
      onItemDismiss: D(d),
      onViewportContentChange: i.useCallback((v, m) => {
        C((w) => (w.set(v, m), new Map(w)));
      }, []),
      onViewportContentRemove: i.useCallback((v) => {
        C((m) => m.has(v) ? (m.delete(v), new Map(m)) : m);
      }, []),
      children: /* @__PURE__ */ r(X.Provider, { scope: e, children: /* @__PURE__ */ r(Pe, { scope: e, items: M, children: n }) })
    }
  );
}, "NavigationMenuProvider"), Oe = "NavigationMenuList", Se = /* @__PURE__ */ i.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ g(function(e, a) {
    const { __scopeNavigationMenu: o, ...u } = e, s = y(Oe, o), n = /* @__PURE__ */ r(P.ul, { "data-orientation": s.orientation, ...u, ref: a });
    return /* @__PURE__ */ r(P.div, { style: { position: "relative" }, ref: s.onIndicatorTrackChange, children: /* @__PURE__ */ r(X.Slot, { scope: o, children: s.isRootMenu ? /* @__PURE__ */ r(ve, { asChild: !0, children: n }) : n }) });
  }, "NavigationMenuList")
), De = "NavigationMenuItem", [Le, ue] = J(De), Ae = /* @__PURE__ */ i.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ g(function(e, a) {
    const { __scopeNavigationMenu: o, value: u, ...s } = e, n = ie(), c = u || n || "LEGACY_REACT_AUTO_VALUE", f = i.useRef(null), d = i.useRef(null), N = i.useRef(null), l = i.useRef(() => {
    }), h = i.useRef(!1), R = i.useCallback((p = "start") => {
      if (f.current) {
        l.current();
        const M = $(f.current);
        M.length && j(p === "start" ? M : M.reverse());
      }
    }, []), b = i.useCallback(() => {
      if (f.current) {
        const p = $(f.current);
        p.length && (l.current = ge(p));
      }
    }, []);
    return /* @__PURE__ */ r(
      Le,
      {
        scope: o,
        value: c,
        triggerRef: d,
        contentRef: f,
        focusProxyRef: N,
        wasEscapeCloseRef: h,
        onEntryKeyDown: R,
        onFocusProxyEnter: R,
        onRootContentClose: b,
        onContentFocusOutside: b,
        children: /* @__PURE__ */ r(P.li, { ...s, ref: a })
      }
    );
  }, "NavigationMenuItem")
), ne = "NavigationMenuTrigger", Ve = /* @__PURE__ */ i.forwardRef(/* @__PURE__ */ g(function(e, a) {
  const { __scopeNavigationMenu: o, disabled: u, ...s } = e, n = y(ne, e.__scopeNavigationMenu), c = ue(ne, e.__scopeNavigationMenu), f = i.useRef(null), d = L(f, c.triggerRef, a), N = Q(n.baseId, c.value), l = Z(n.baseId, c.value), h = i.useRef(!1), R = i.useRef(!1), b = c.value === n.value;
  return /* @__PURE__ */ G(ee, { children: [
    /* @__PURE__ */ r(X.ItemSlot, { scope: o, value: c.value, children: /* @__PURE__ */ r(fe, { asChild: !0, children: /* @__PURE__ */ r(
      P.button,
      {
        id: N,
        disabled: u,
        "data-disabled": u ? "" : void 0,
        "data-state": W(b),
        "aria-expanded": b,
        "aria-controls": b ? l : void 0,
        ...s,
        ref: d,
        onPointerEnter: T(e.onPointerEnter, () => {
          R.current = !1, c.wasEscapeCloseRef.current = !1;
        }),
        onPointerMove: T(
          e.onPointerMove,
          K(() => {
            u || R.current || c.wasEscapeCloseRef.current || h.current || (n.onTriggerEnter(c.value), h.current = !0);
          })
        ),
        onPointerLeave: T(
          e.onPointerLeave,
          K(() => {
            u || (n.onTriggerLeave(), h.current = !1);
          })
        ),
        onClick: T(e.onClick, () => {
          n.onItemSelect(c.value), R.current = b;
        }),
        onKeyDown: T(e.onKeyDown, (p) => {
          const C = { horizontal: "ArrowDown", vertical: n.dir === "rtl" ? "ArrowLeft" : "ArrowRight" }[n.orientation];
          b && p.key === C && (c.onEntryKeyDown(), p.preventDefault());
        })
      }
    ) }) }),
    b && /* @__PURE__ */ G(ee, { children: [
      /* @__PURE__ */ r(
        Re,
        {
          "aria-hidden": !0,
          tabIndex: 0,
          ref: c.focusProxyRef,
          onFocus: (p) => {
            const M = c.contentRef.current, C = p.relatedTarget, I = C === f.current, _ = M?.contains(C);
            (I || !_) && c.onFocusProxyEnter(I ? "start" : "end");
          }
        }
      ),
      n.viewport && /* @__PURE__ */ r("span", { "aria-owns": l })
    ] })
  ] });
}, "NavigationMenuTrigger")), oe = "navigationMenu.linkSelect", Ke = /* @__PURE__ */ i.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ g(function(e, a) {
    const { __scopeNavigationMenu: o, active: u, onSelect: s, ...n } = e;
    return /* @__PURE__ */ r(fe, { asChild: !0, children: /* @__PURE__ */ r(
      P.a,
      {
        "data-active": u ? "" : void 0,
        "aria-current": u ? "page" : void 0,
        ...n,
        ref: a,
        onClick: T(
          e.onClick,
          (c) => {
            const f = c.target, d = new CustomEvent(oe, {
              bubbles: !0,
              cancelable: !0
            });
            if (f.addEventListener(oe, (N) => s?.(N), { once: !0 }), te(f, d), !d.defaultPrevented && !c.metaKey) {
              const N = new CustomEvent(z, {
                bubbles: !0,
                cancelable: !0
              });
              te(f, N);
            }
          },
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }, "NavigationMenuLink")
), ce = "NavigationMenuIndicator", ze = /* @__PURE__ */ i.forwardRef(/* @__PURE__ */ g(function(e, a) {
  const { forceMount: o, ...u } = e, s = y(ce, e.__scopeNavigationMenu), n = !!s.value;
  return s.indicatorTrack ? we.createPortal(
    /* @__PURE__ */ r(H, { present: o || n, children: /* @__PURE__ */ r(Ge, { ...u, ref: a }) }),
    s.indicatorTrack
  ) : null;
}, "NavigationMenuIndicator")), Ge = /* @__PURE__ */ i.forwardRef(/* @__PURE__ */ g(function(e, a) {
  const { __scopeNavigationMenu: o, ...u } = e, s = y(ce, o), n = se(o), [c, f] = i.useState(
    null
  ), [d, N] = i.useState(null), l = s.orientation === "horizontal", h = !!s.value;
  i.useEffect(() => {
    const p = n().find((M) => M.value === s.value)?.ref.current;
    p && f(p);
  }, [n, s.value]);
  const R = /* @__PURE__ */ g(() => {
    c && N({
      size: l ? c.offsetWidth : c.offsetHeight,
      offset: l ? c.offsetLeft : c.offsetTop
    });
  }, "handlePositionChange");
  return U(c, R), U(s.indicatorTrack, R), d ? /* @__PURE__ */ r(
    P.div,
    {
      "aria-hidden": !0,
      "data-state": h ? "visible" : "hidden",
      "data-orientation": s.orientation,
      ...u,
      ref: a,
      style: {
        position: "absolute",
        ...l ? {
          left: 0,
          width: d.size + "px",
          transform: `translateX(${d.offset}px)`,
          "--radix-navigation-menu-indicator-translate-x": `${d.offset}px`
        } : {
          top: 0,
          height: d.size + "px",
          transform: `translateY(${d.offset}px)`,
          "--radix-navigation-menu-indicator-translate-y": `${d.offset}px`
        },
        ...u.style
      }
    }
  ) : null;
}, "NavigationMenuIndicatorImpl")), V = "NavigationMenuContent", $e = /* @__PURE__ */ i.forwardRef(/* @__PURE__ */ g(function(e, a) {
  const { forceMount: o, ...u } = e, s = y(V, e.__scopeNavigationMenu), n = ue(V, e.__scopeNavigationMenu), c = L(n.contentRef, a), f = n.value === s.value, d = {
    value: n.value,
    triggerRef: n.triggerRef,
    focusProxyRef: n.focusProxyRef,
    wasEscapeCloseRef: n.wasEscapeCloseRef,
    onContentFocusOutside: n.onContentFocusOutside,
    onRootContentClose: n.onRootContentClose,
    ...u
  };
  return s.viewport ? /* @__PURE__ */ r(Ue, { forceMount: o, ...d, ref: c }) : /* @__PURE__ */ r(H, { present: o || f, children: /* @__PURE__ */ r(
    le,
    {
      "data-state": W(f),
      ...d,
      ref: c,
      onPointerEnter: T(e.onPointerEnter, s.onContentEnter),
      onPointerLeave: T(
        e.onPointerLeave,
        K(s.onContentLeave)
      ),
      style: {
        // Prevent interaction when animating out
        pointerEvents: !f && s.isRootMenu ? "none" : void 0,
        ...d.style
      }
    }
  ) });
}, "NavigationMenuContent")), Ue = /* @__PURE__ */ i.forwardRef(/* @__PURE__ */ g(function(e, a) {
  const o = y(V, e.__scopeNavigationMenu), { onViewportContentChange: u, onViewportContentRemove: s } = o;
  return Y(() => {
    u(e.value, {
      ref: a,
      ...e
    });
  }, [e, a, u]), Y(() => () => s(e.value), [e.value, s]), null;
}, "ViewportContentMounter")), z = "navigationMenu.rootContentDismiss", le = /* @__PURE__ */ i.forwardRef(/* @__PURE__ */ g(function(e, a) {
  const {
    __scopeNavigationMenu: o,
    value: u,
    triggerRef: s,
    focusProxyRef: n,
    wasEscapeCloseRef: c,
    onRootContentClose: f,
    onContentFocusOutside: d,
    ...N
  } = e, l = y(V, o), h = i.useRef(null), R = L(h, a), b = Q(l.baseId, u), p = Z(l.baseId, u), M = se(o), C = i.useRef(null), { onItemDismiss: I } = l;
  i.useEffect(() => {
    const v = h.current;
    if (l.isRootMenu && v) {
      const m = /* @__PURE__ */ g(() => {
        I(), f(), v.contains(document.activeElement) && s.current?.focus();
      }, "handleClose");
      return v.addEventListener(z, m), () => v.removeEventListener(z, m);
    }
  }, [l.isRootMenu, e.value, s, I, f]);
  const _ = i.useMemo(() => {
    const m = M().map((O) => O.value);
    l.dir === "rtl" && m.reverse();
    const w = m.indexOf(l.value), E = m.indexOf(l.previousValue), F = u === l.value, S = E === m.indexOf(u);
    if (!F && !S) return C.current;
    const x = (() => {
      if (w !== E) {
        if (F && E !== -1) return w > E ? "from-end" : "from-start";
        if (S && w !== -1) return w > E ? "to-start" : "to-end";
      }
      return null;
    })();
    return C.current = x, x;
  }, [l.previousValue, l.value, l.dir, M, u]);
  return /* @__PURE__ */ r(ve, { asChild: !0, children: /* @__PURE__ */ r(
    Ne,
    {
      id: p,
      "aria-labelledby": b,
      "data-motion": _,
      "data-orientation": l.orientation,
      ...N,
      ref: R,
      disableOutsidePointerEvents: !1,
      onDismiss: () => {
        const v = new Event(z, {
          bubbles: !0,
          cancelable: !0
        });
        h.current?.dispatchEvent(v);
      },
      onFocusOutside: T(e.onFocusOutside, (v) => {
        d();
        const m = v.target;
        l.rootNavigationMenu?.contains(m) && v.preventDefault();
      }),
      onPointerDownOutside: T(e.onPointerDownOutside, (v) => {
        const m = v.target, w = M().some((F) => F.ref.current?.contains(m)), E = l.isRootMenu && l.viewport?.contains(m);
        (w || E || !l.isRootMenu) && v.preventDefault();
      }),
      onKeyDown: T(e.onKeyDown, (v) => {
        const m = v.altKey || v.ctrlKey || v.metaKey;
        if (v.key === "Tab" && !m) {
          const E = $(v.currentTarget), F = document.activeElement, S = E.findIndex((B) => B === F), O = v.shiftKey ? E.slice(0, S).reverse() : E.slice(S + 1, E.length);
          j(O) ? v.preventDefault() : n.current?.focus();
        }
      }),
      onEscapeKeyDown: T(e.onEscapeKeyDown, (v) => {
        c.current = !0;
      })
    }
  ) });
}, "NavigationMenuContentImpl")), de = "NavigationMenuViewport", He = /* @__PURE__ */ i.forwardRef(/* @__PURE__ */ g(function(e, a) {
  const { forceMount: o, ...u } = e, n = !!y(de, e.__scopeNavigationMenu).value;
  return /* @__PURE__ */ r(H, { present: o || n, children: /* @__PURE__ */ r(je, { ...u, ref: a }) });
}, "NavigationMenuViewport")), je = /* @__PURE__ */ i.forwardRef(/* @__PURE__ */ g(function(e, a) {
  const { __scopeNavigationMenu: o, children: u, ...s } = e, n = y(de, o), c = L(a, n.onViewportChange), f = _e(
    V,
    e.__scopeNavigationMenu
  ), [d, N] = i.useState(null), [l, h] = i.useState(null), R = d ? d?.width + "px" : void 0, b = d ? d?.height + "px" : void 0, p = !!n.value, M = p ? n.value : n.previousValue;
  return U(l, /* @__PURE__ */ g(() => {
    l && N({ width: l.offsetWidth, height: l.offsetHeight });
  }, "handleSizeChange")), /* @__PURE__ */ r(
    P.div,
    {
      "data-state": W(p),
      "data-orientation": n.orientation,
      ...s,
      ref: c,
      style: {
        // Prevent interaction when animating out
        pointerEvents: !p && n.isRootMenu ? "none" : void 0,
        "--radix-navigation-menu-viewport-width": R,
        "--radix-navigation-menu-viewport-height": b,
        ...s.style
      },
      onPointerEnter: T(e.onPointerEnter, n.onContentEnter),
      onPointerLeave: T(e.onPointerLeave, K(n.onContentLeave)),
      children: Array.from(f.items).map(([I, { ref: _, forceMount: v, ...m }]) => {
        const w = M === I;
        return /* @__PURE__ */ r(H, { present: v || w, children: /* @__PURE__ */ r(
          We,
          {
            ...m,
            contentRef: _,
            isActive: w,
            onActiveContentChange: h
          }
        ) }, I);
      })
    }
  );
}, "NavigationMenuViewportImpl")), We = /* @__PURE__ */ g(({
  contentRef: t,
  isActive: e,
  onActiveContentChange: a,
  ...o
}) => {
  const u = i.useCallback(
    (n) => {
      e && n && a(n);
    },
    [e, a]
  ), s = L(t, u);
  return /* @__PURE__ */ r(le, { ...o, ref: s });
}, "NavigationMenuViewportItem"), Be = "FocusGroup", ve = /* @__PURE__ */ i.forwardRef(
  /* @__PURE__ */ g(function(e, a) {
    const { __scopeNavigationMenu: o, ...u } = e, s = y(Be, o);
    return /* @__PURE__ */ r(q.Provider, { scope: o, children: /* @__PURE__ */ r(q.Slot, { scope: o, children: /* @__PURE__ */ r(P.div, { dir: s.dir, ...u, ref: a }) }) });
  }, "FocusGroup")
), ae = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"], Ye = "FocusGroupItem", fe = /* @__PURE__ */ i.forwardRef(
  /* @__PURE__ */ g(function(e, a) {
    const { __scopeNavigationMenu: o, ...u } = e, s = Ee(o), n = y(Ye, o);
    return /* @__PURE__ */ r(q.ItemSlot, { scope: o, children: /* @__PURE__ */ r(
      P.button,
      {
        ...u,
        ref: a,
        onKeyDown: T(e.onKeyDown, (c) => {
          if (["Home", "End", ...ae].includes(c.key)) {
            let d = s().map((h) => h.ref.current);
            if ([n.dir === "rtl" ? "ArrowRight" : "ArrowLeft", "ArrowUp", "End"].includes(c.key) && d.reverse(), ae.includes(c.key)) {
              const h = d.indexOf(c.currentTarget);
              d = d.slice(h + 1);
            }
            setTimeout(() => j(d)), c.preventDefault();
          }
        })
      }
    ) });
  }, "FocusGroupItem")
);
function $(t) {
  const e = [], a = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT, {
    acceptNode: /* @__PURE__ */ g((o) => {
      const u = o.tagName === "INPUT" && o.type === "hidden";
      return o.disabled || o.hidden || u ? NodeFilter.FILTER_SKIP : o.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }, "acceptNode")
  });
  for (; a.nextNode(); ) e.push(a.currentNode);
  return e;
}
g($, "getTabbableCandidates");
function j(t) {
  const e = document.activeElement;
  return t.some((a) => a === e ? !0 : (a.focus(), document.activeElement !== e));
}
g(j, "focusFirst");
function ge(t) {
  return t.forEach((e) => {
    e.dataset.tabindex = e.getAttribute("tabindex") || "", e.setAttribute("tabindex", "-1");
  }), () => {
    t.forEach((e) => {
      const a = e.dataset.tabindex;
      e.setAttribute("tabindex", a);
    });
  };
}
g(ge, "removeFromTabOrder");
function U(t, e) {
  const a = D(e);
  Y(() => {
    let o = 0;
    if (t) {
      const u = new ResizeObserver(() => {
        cancelAnimationFrame(o), o = window.requestAnimationFrame(a);
      });
      return u.observe(t), () => {
        window.cancelAnimationFrame(o), u.unobserve(t);
      };
    }
  }, [t, a]);
}
g(U, "useResizeObserver");
function W(t) {
  return t ? "open" : "closed";
}
g(W, "getOpenState");
function Q(t, e) {
  return `${t}-trigger-${e}`;
}
g(Q, "makeTriggerId");
function Z(t, e) {
  return `${t}-content-${e}`;
}
g(Z, "makeContentId");
function K(t) {
  return (e) => e.pointerType === "mouse" ? t(e) : void 0;
}
g(K, "whenMouse");
function pt({
  className: t,
  children: e,
  viewport: a = !0,
  ...o
}) {
  return /* @__PURE__ */ G(
    ke,
    {
      "data-slot": "navigation-menu",
      "data-viewport": a,
      className: k(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        t
      ),
      ...o,
      children: [
        e,
        a && /* @__PURE__ */ r(Xe, {})
      ]
    }
  );
}
function wt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    Se,
    {
      "data-slot": "navigation-menu-list",
      className: k(
        "group flex flex-1 list-none items-center justify-center gap-1",
        t
      ),
      ...e
    }
  );
}
function ht({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    Ae,
    {
      "data-slot": "navigation-menu-item",
      className: k("relative", t),
      ...e
    }
  );
}
const qe = me(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-[color,box-shadow] outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent"
);
function Mt({
  className: t,
  children: e,
  ...a
}) {
  return /* @__PURE__ */ G(
    Ve,
    {
      "data-slot": "navigation-menu-trigger",
      className: k(qe(), "group", t),
      ...a,
      children: [
        e,
        " ",
        /* @__PURE__ */ r(
          pe,
          {
            className: "relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180",
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function Ct({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    $e,
    {
      "data-slot": "navigation-menu-content",
      className: k(
        "top-0 left-0 w-full p-2 pr-2.5 data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out md:absolute md:w-auto",
        "ui-background-blur group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95",
        t
      ),
      ...e
    }
  );
}
function Xe({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: k(
        "absolute top-full left-0 isolate z-50 flex justify-center"
      ),
      children: /* @__PURE__ */ r(
        He,
        {
          "data-slot": "navigation-menu-viewport",
          className: k(
            "ui-background-blur origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
            t
          ),
          ...e
        }
      )
    }
  );
}
function Nt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    Ke,
    {
      "data-slot": "navigation-menu-link",
      className: k(
        "flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:outline-1 data-[active=true]:bg-accent data-[active=true]:text-accent-foreground data-[active=true]:hover:bg-accent data-[active=true]:focus:bg-accent [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function bt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    ze,
    {
      "data-slot": "navigation-menu-indicator",
      className: k(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in",
        t
      ),
      ...e,
      children: /* @__PURE__ */ r("div", { className: "relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" })
    }
  );
}
export {
  pt as NavigationMenu,
  Ct as NavigationMenuContent,
  bt as NavigationMenuIndicator,
  ht as NavigationMenuItem,
  Nt as NavigationMenuLink,
  wt as NavigationMenuList,
  Mt as NavigationMenuTrigger,
  Xe as NavigationMenuViewport,
  qe as navigationMenuTriggerStyle
};
