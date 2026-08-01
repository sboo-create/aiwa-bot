import { jsx as n, jsxs as Y } from "react/jsx-runtime";
import { c as q } from "../../icons-DUsO7wRs.js";
import { c as E } from "../../utils-TrrhThB-.js";
import * as d from "react";
import { c as B } from "../../index-oVmar2KU.js";
import { c as F } from "../../index-CxcvVwJj.js";
import { u as J } from "../../index-OZUlxC0o.js";
import { c as Q } from "../../index-BMzaJ9ZT.js";
import { u as H } from "../../index-CECqponX.js";
import { P as j } from "../../index-Si5tf8-e.js";
import { c as K, C as W, a as X, b as Z } from "../../index-Ds4PJinw.js";
import { u as oo } from "../../index-DAdtpYSB.js";
import { u as eo } from "../../index-B0BN408G.js";
var ro = Object.defineProperty, p = (i, o) => ro(i, "name", { value: o, configurable: !0 }), u = "Accordion", no = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [k, to, co] = F(u), [I, Do] = B(u, [
  co,
  K
]), D = K(), io = /* @__PURE__ */ d.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ p(function(o, t) {
    const { type: e, ...c } = o, a = c, r = c;
    return /* @__PURE__ */ n(k.Provider, { scope: o.__scopeAccordion, children: e === "multiple" ? /* @__PURE__ */ n(po, { ...r, ref: t }) : /* @__PURE__ */ n(so, { ...a, ref: t }) });
  }, "Accordion")
), [$, ao] = I(u), [z, lo] = I(
  u,
  { collapsible: !1 }
), so = /* @__PURE__ */ d.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ p(function(o, t) {
    const {
      value: e,
      defaultValue: c,
      onValueChange: a = /* @__PURE__ */ p(() => {
      }, "onValueChange"),
      collapsible: r = !1,
      ...s
    } = o, [l, f] = H({
      prop: e,
      defaultProp: c ?? "",
      onChange: a,
      caller: u
    });
    return /* @__PURE__ */ n(
      $,
      {
        scope: o.__scopeAccordion,
        value: d.useMemo(() => l ? [l] : [], [l]),
        onItemOpen: f,
        onItemClose: d.useCallback(() => r && f(""), [r, f]),
        children: /* @__PURE__ */ n(z, { scope: o.__scopeAccordion, collapsible: r, children: /* @__PURE__ */ n(L, { ...s, ref: t }) })
      }
    );
  }, "AccordionImplSingle")
), po = /* @__PURE__ */ d.forwardRef(/* @__PURE__ */ p(function(o, t) {
  const {
    value: e,
    defaultValue: c,
    onValueChange: a = /* @__PURE__ */ p(() => {
    }, "onValueChange"),
    ...r
  } = o, [s, l] = H({
    prop: e,
    defaultProp: c ?? [],
    onChange: a,
    caller: u
  }), f = d.useCallback(
    (g) => l((A = []) => [...A, g]),
    [l]
  ), v = d.useCallback(
    (g) => l((A = []) => A.filter((x) => x !== g)),
    [l]
  );
  return /* @__PURE__ */ n(
    $,
    {
      scope: o.__scopeAccordion,
      value: s,
      onItemOpen: f,
      onItemClose: v,
      children: /* @__PURE__ */ n(z, { scope: o.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ n(L, { ...r, ref: t }) })
    }
  );
}, "AccordionImplMultiple")), [uo, h] = I(u), L = /* @__PURE__ */ d.forwardRef(
  /* @__PURE__ */ p(function(o, t) {
    const { __scopeAccordion: e, disabled: c, dir: a, orientation: r = "vertical", ...s } = o, l = d.useRef(null), f = J(l, t), v = to(e), A = eo(a) === "ltr", x = Q(o.onKeyDown, (C) => {
      if (!no.includes(C.key)) return;
      const G = C.target, _ = v().filter((N) => !N.ref.current?.disabled), b = _.findIndex((N) => N.ref.current === G), T = _.length;
      if (b === -1) return;
      C.preventDefault();
      let m = b;
      const w = 0, P = T - 1, R = /* @__PURE__ */ p(() => {
        m = b + 1, m > P && (m = w);
      }, "moveNext"), S = /* @__PURE__ */ p(() => {
        m = b - 1, m < w && (m = P);
      }, "movePrev");
      switch (C.key) {
        case "Home":
          m = w;
          break;
        case "End":
          m = P;
          break;
        case "ArrowRight":
          r === "horizontal" && (A ? R() : S());
          break;
        case "ArrowDown":
          r === "vertical" && R();
          break;
        case "ArrowLeft":
          r === "horizontal" && (A ? S() : R());
          break;
        case "ArrowUp":
          r === "vertical" && S();
          break;
      }
      const U = m % T;
      _[U].ref.current?.focus();
    });
    return /* @__PURE__ */ n(
      uo,
      {
        scope: e,
        disabled: c,
        direction: a,
        orientation: r,
        children: /* @__PURE__ */ n(k.Slot, { scope: e, children: /* @__PURE__ */ n(
          j.div,
          {
            ...s,
            "data-orientation": r,
            ref: f,
            onKeyDown: c ? void 0 : x
          }
        ) })
      }
    );
  }, "AccordionImpl")
), y = "AccordionItem", [fo, M] = I(y), mo = /* @__PURE__ */ d.forwardRef(
  /* @__PURE__ */ p(function(o, t) {
    const { __scopeAccordion: e, value: c, ...a } = o, r = h(y, e), s = ao(y, e), l = D(e), f = oo(), v = c && s.value.includes(c) || !1, g = r.disabled || o.disabled;
    return /* @__PURE__ */ n(
      fo,
      {
        scope: e,
        open: v,
        disabled: g,
        triggerId: f,
        children: /* @__PURE__ */ n(
          W,
          {
            "data-orientation": r.orientation,
            "data-state": O(v),
            ...l,
            ...a,
            ref: t,
            disabled: g,
            open: v,
            onOpenChange: (A) => {
              A ? s.onItemOpen(c) : s.onItemClose(c);
            }
          }
        )
      }
    );
  }, "AccordionItem")
), Ao = "AccordionHeader", vo = /* @__PURE__ */ d.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ p(function(o, t) {
    const { __scopeAccordion: e, ...c } = o, a = h(u, e), r = M(Ao, e);
    return /* @__PURE__ */ n(
      j.h3,
      {
        "data-orientation": a.orientation,
        "data-state": O(r.open),
        "data-disabled": r.disabled ? "" : void 0,
        ...c,
        ref: t
      }
    );
  }, "AccordionHeader")
), V = "AccordionTrigger", go = /* @__PURE__ */ d.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ p(function(o, t) {
    const { __scopeAccordion: e, ...c } = o, a = h(u, e), r = M(V, e), s = lo(V, e), l = D(e);
    return /* @__PURE__ */ n(k.ItemSlot, { scope: e, children: /* @__PURE__ */ n(
      X,
      {
        "aria-disabled": r.open && !s.collapsible || void 0,
        "data-orientation": a.orientation,
        id: r.triggerId,
        ...l,
        ...c,
        ref: t
      }
    ) });
  }, "AccordionTrigger")
), Co = "AccordionContent", bo = /* @__PURE__ */ d.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ p(function(o, t) {
    const { __scopeAccordion: e, ...c } = o, a = h(u, e), r = M(Co, e), s = D(e);
    return /* @__PURE__ */ n(
      Z,
      {
        role: "region",
        "aria-labelledby": r.triggerId,
        "data-orientation": a.orientation,
        ...s,
        ...c,
        ref: t,
        style: {
          "--radix-accordion-content-height": "var(--radix-collapsible-content-height)",
          "--radix-accordion-content-width": "var(--radix-collapsible-content-width)",
          ...o.style
        }
      }
    );
  }, "AccordionContent")
);
function O(i) {
  return i ? "open" : "closed";
}
p(O, "getState");
function Mo({
  ...i
}) {
  return /* @__PURE__ */ n(io, { "data-slot": "accordion", ...i });
}
function Oo({
  className: i,
  ...o
}) {
  return /* @__PURE__ */ n(
    mo,
    {
      "data-slot": "accordion-item",
      className: E("border-b last:border-b-0", i),
      ...o
    }
  );
}
function To({
  className: i,
  children: o,
  ...t
}) {
  return /* @__PURE__ */ n(vo, { className: "flex", children: /* @__PURE__ */ Y(
    go,
    {
      "data-slot": "accordion-trigger",
      className: E(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        i
      ),
      ...t,
      children: [
        o,
        /* @__PURE__ */ n(q, { className: "pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" })
      ]
    }
  ) });
}
function Vo({
  className: i,
  children: o,
  ...t
}) {
  return /* @__PURE__ */ n(
    bo,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ...t,
      children: /* @__PURE__ */ n("div", { className: E("pt-0 pb-4", i), children: o })
    }
  );
}
export {
  Mo as Accordion,
  Vo as AccordionContent,
  Oo as AccordionItem,
  To as AccordionTrigger
};
