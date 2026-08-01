import { jsx as i } from "react/jsx-runtime";
import { c as P } from "../../index-D6rtmMCZ.js";
import { c as m } from "../../utils-TrrhThB-.js";
import * as b from "react";
import { c as h } from "../../index-BMzaJ9ZT.js";
import { c as R } from "../../index-oVmar2KU.js";
import { c as I, R as k, a as A } from "../../index-JYieXO2U.js";
import { P as F } from "../../index-KdL-eaFo.js";
import { P as T } from "../../index-Si5tf8-e.js";
import { u as S } from "../../index-B0BN408G.js";
import { u as M } from "../../index-CECqponX.js";
import { u as N } from "../../index-DAdtpYSB.js";
var z = Object.defineProperty, g = (a, t) => z(a, "name", { value: t, configurable: !0 }), x = "Tabs", [E, et] = R(x, [
  I
]), w = I(), [V, C] = E(x), G = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ g(function(t, s) {
    const {
      __scopeTabs: d,
      value: e,
      onValueChange: n,
      defaultValue: u,
      orientation: r = "horizontal",
      dir: l,
      activationMode: p = "automatic",
      ...v
    } = t, c = S(l), [o, f] = M({
      prop: e,
      onChange: n,
      defaultProp: u ?? "",
      caller: x
    });
    return /* @__PURE__ */ i(
      V,
      {
        scope: d,
        baseId: N(),
        value: o,
        onValueChange: f,
        orientation: r,
        dir: c,
        activationMode: p,
        children: /* @__PURE__ */ i(
          T.div,
          {
            dir: c,
            "data-orientation": r,
            ...v,
            ref: s
          }
        )
      }
    );
  }, "Tabs")
), $ = "TabsList", D = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ g(function(t, s) {
    const { __scopeTabs: d, loop: e = !0, ...n } = t, u = C($, d), r = w(d);
    return /* @__PURE__ */ i(
      k,
      {
        asChild: !0,
        ...r,
        orientation: u.orientation,
        dir: u.dir,
        loop: e,
        children: /* @__PURE__ */ i(
          T.div,
          {
            role: "tablist",
            "aria-orientation": u.orientation,
            ...n,
            ref: s
          }
        )
      }
    );
  }, "TabsList")
), L = "TabsTrigger", j = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ g(function(t, s) {
    const { __scopeTabs: d, value: e, disabled: n = !1, ...u } = t, r = C(L, d), l = w(d), p = _(r.baseId, e), v = y(r.baseId, e), c = e === r.value;
    return /* @__PURE__ */ i(
      A,
      {
        asChild: !0,
        ...l,
        focusable: !n,
        active: c,
        children: /* @__PURE__ */ i(
          T.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": c,
            "aria-controls": v,
            "data-state": c ? "active" : "inactive",
            "data-disabled": n ? "" : void 0,
            disabled: n,
            id: p,
            ...u,
            ref: s,
            onMouseDown: h(t.onMouseDown, (o) => {
              !n && o.button === 0 && o.ctrlKey === !1 ? r.onValueChange(e) : o.preventDefault();
            }),
            onKeyDown: h(t.onKeyDown, (o) => {
              n || o.target !== o.currentTarget || [" ", "Enter"].includes(o.key) && r.onValueChange(e);
            }),
            onFocus: h(t.onFocus, () => {
              const o = r.activationMode !== "manual";
              !c && !n && o && r.onValueChange(e);
            })
          }
        )
      }
    );
  }, "TabsTrigger")
), K = "TabsContent", B = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ g(function(t, s) {
    const { __scopeTabs: d, value: e, forceMount: n, children: u, ...r } = t, l = C(K, d), p = _(l.baseId, e), v = y(l.baseId, e), c = e === l.value, o = b.useRef(c);
    return b.useEffect(() => {
      const f = requestAnimationFrame(() => o.current = !1);
      return () => cancelAnimationFrame(f);
    }, []), /* @__PURE__ */ i(F, { present: n || c, children: ({ present: f }) => /* @__PURE__ */ i(
      T.div,
      {
        "data-state": c ? "active" : "inactive",
        "data-orientation": l.orientation,
        role: "tabpanel",
        "aria-labelledby": p,
        hidden: !f,
        id: v,
        tabIndex: 0,
        ...r,
        ref: s,
        style: {
          ...t.style,
          animationDuration: o.current ? "0s" : void 0
        },
        children: f && u
      }
    ) });
  }, "TabsContent")
);
function _(a, t) {
  return `${a}-trigger-${t}`;
}
g(_, "makeTriggerId");
function y(a, t) {
  return `${a}-content-${t}`;
}
g(y, "makeContentId");
function rt({
  className: a,
  orientation: t = "horizontal",
  ...s
}) {
  return /* @__PURE__ */ i(
    G,
    {
      "data-slot": "tabs",
      "data-orientation": t,
      orientation: t,
      className: m(
        "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
        a
      ),
      ...s
    }
  );
}
const O = P(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function ot({
  className: a,
  variant: t = "default",
  ...s
}) {
  return /* @__PURE__ */ i(
    D,
    {
      "data-slot": "tabs-list",
      "data-variant": t,
      className: m(O({ variant: t }), a),
      ...s
    }
  );
}
function nt({
  className: a,
  ...t
}) {
  return /* @__PURE__ */ i(
    j,
    {
      "data-slot": "tabs-trigger",
      className: m(
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-muted-foreground transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent",
        "data-[state=active]:bg-card data-[state=active]:text-foreground dark:data-[state=active]:bg-input dark:data-[state=active]:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
        a
      ),
      ...t
    }
  );
}
function it({
  className: a,
  ...t
}) {
  return /* @__PURE__ */ i(
    B,
    {
      "data-slot": "tabs-content",
      className: m("flex-1 outline-none", a),
      ...t
    }
  );
}
export {
  rt as Tabs,
  it as TabsContent,
  ot as TabsList,
  nt as TabsTrigger,
  O as tabsListVariants
};
