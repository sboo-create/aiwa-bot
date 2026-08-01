import { jsx as t, jsxs as p } from "react/jsx-runtime";
import * as d from "react";
import { c as I } from "../../index-D6rtmMCZ.js";
import { b as z } from "../../icons-DUsO7wRs.js";
import { c as i } from "../../utils-TrrhThB-.js";
import { Button as E } from "./button.js";
import { Input as T } from "./input.js";
import { Separator as B } from "./separator.js";
import { Sheet as D, SheetContent as O, SheetHeader as A, SheetTitle as R, SheetDescription as L } from "./sheet.js";
import { Skeleton as M } from "./skeleton.js";
import { Tooltip as K, TooltipTrigger as H, TooltipContent as j, TooltipProvider as G } from "./tooltip.js";
import { S as h } from "../../index-OZUlxC0o.js";
const N = 768;
function W() {
  const [a, e] = d.useState(void 0);
  return d.useEffect(() => {
    const r = window.matchMedia(`(max-width: ${N - 1}px)`), n = () => {
      e(window.innerWidth < N);
    };
    return r.addEventListener("change", n), e(window.innerWidth < N), () => r.removeEventListener("change", n);
  }, []), !!a;
}
const $ = "sidebar_state", P = 3600 * 24 * 7, q = "16rem", V = "18rem", F = "3rem", U = "b", C = d.createContext(null);
function S() {
  const a = d.useContext(C);
  if (!a)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return a;
}
function de({
  defaultOpen: a = !0,
  open: e,
  onOpenChange: r,
  className: n,
  style: o,
  children: c,
  ...m
}) {
  const l = W(), [f, u] = d.useState(!1), [v, _] = d.useState(a), g = e ?? v, x = d.useCallback(
    (s) => {
      const b = typeof s == "function" ? s(g) : s;
      r ? r(b) : _(b), document.cookie = `${$}=${b}; path=/; max-age=${P}`;
    },
    [r, g]
  ), w = d.useCallback(() => l ? u((s) => !s) : x((s) => !s), [l, x, u]);
  d.useEffect(() => {
    const s = (b) => {
      b.key === U && (b.metaKey || b.ctrlKey) && (b.preventDefault(), w());
    };
    return window.addEventListener("keydown", s), () => window.removeEventListener("keydown", s);
  }, [w]);
  const y = g ? "expanded" : "collapsed", k = d.useMemo(
    () => ({
      state: y,
      open: g,
      setOpen: x,
      isMobile: l,
      openMobile: f,
      setOpenMobile: u,
      toggleSidebar: w
    }),
    [y, g, x, l, f, u, w]
  );
  return /* @__PURE__ */ t(C.Provider, { value: k, children: /* @__PURE__ */ t(G, { delayDuration: 0, children: /* @__PURE__ */ t(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: {
        "--sidebar-width": q,
        "--sidebar-width-icon": F,
        ...o
      },
      className: i(
        "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar-surface",
        n
      ),
      ...m,
      children: c
    }
  ) }) });
}
function se({
  side: a = "left",
  variant: e = "sidebar",
  collapsible: r = "offcanvas",
  className: n,
  children: o,
  ...c
}) {
  const { isMobile: m, state: l, openMobile: f, setOpenMobile: u } = S();
  return r === "none" ? /* @__PURE__ */ t(
    "div",
    {
      "data-slot": "sidebar",
      className: i(
        "flex h-full w-(--sidebar-width) flex-col bg-sidebar-surface text-sidebar-foreground",
        n
      ),
      ...c,
      children: o
    }
  ) : m ? /* @__PURE__ */ t(D, { open: f, onOpenChange: u, ...c, children: /* @__PURE__ */ p(
    O,
    {
      "data-sidebar": "sidebar",
      "data-slot": "sidebar",
      "data-mobile": "true",
      className: "w-(--sidebar-width) bg-sidebar-surface p-0 text-sidebar-foreground [&>button]:hidden",
      style: {
        "--sidebar-width": V
      },
      side: a,
      children: [
        /* @__PURE__ */ p(A, { className: "sr-only", children: [
          /* @__PURE__ */ t(R, { children: "Sidebar" }),
          /* @__PURE__ */ t(L, { children: "Displays the mobile sidebar." })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex h-full w-full flex-col", children: o })
      ]
    }
  ) }) : /* @__PURE__ */ p(
    "div",
    {
      className: "group peer hidden text-sidebar-foreground md:block",
      "data-state": l,
      "data-collapsible": l === "collapsed" ? r : "",
      "data-variant": e,
      "data-side": a,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ t(
          "div",
          {
            "data-slot": "sidebar-gap",
            className: i(
              "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              e === "floating" || e === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            "data-slot": "sidebar-container",
            className: i(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
              a === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              e === "floating" || e === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              n
            ),
            ...c,
            children: /* @__PURE__ */ t(
              "div",
              {
                "data-sidebar": "sidebar",
                "data-slot": "sidebar-inner",
                className: "flex h-full w-full flex-col bg-sidebar-surface group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm",
                children: o
              }
            )
          }
        )
      ]
    }
  );
}
function le({
  className: a,
  onClick: e,
  ...r
}) {
  const { toggleSidebar: n } = S();
  return /* @__PURE__ */ p(
    E,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon",
      className: i("size-7", a),
      onClick: (o) => {
        e?.(o), n();
      },
      ...r,
      children: [
        /* @__PURE__ */ t(z, {}),
        /* @__PURE__ */ t("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function ce({ className: a, ...e }) {
  const { toggleSidebar: r } = S();
  return /* @__PURE__ */ t(
    "button",
    {
      "data-sidebar": "rail",
      "data-slot": "sidebar-rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: r,
      title: "Toggle Sidebar",
      className: i(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full hover:group-data-[collapsible=offcanvas]:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        a
      ),
      ...e
    }
  );
}
function ue({ className: a, ...e }) {
  return /* @__PURE__ */ t(
    "main",
    {
      "data-slot": "sidebar-inset",
      className: i(
        "relative flex w-full flex-1 flex-col bg-card",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        a
      ),
      ...e
    }
  );
}
function be({
  className: a,
  ...e
}) {
  return /* @__PURE__ */ t(
    T,
    {
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: i("h-8 w-full bg-background shadow-none", a),
      ...e
    }
  );
}
function fe({ className: a, ...e }) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: i("flex flex-col gap-2 p-2", a),
      ...e
    }
  );
}
function pe({ className: a, ...e }) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      className: i("flex flex-col gap-2 p-2", a),
      ...e
    }
  );
}
function me({
  className: a,
  ...e
}) {
  return /* @__PURE__ */ t(
    B,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: i("mx-2 w-auto bg-sidebar-border", a),
      ...e
    }
  );
}
function ge({ className: a, ...e }) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: i(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        a
      ),
      ...e
    }
  );
}
function he({ className: a, ...e }) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: i("relative flex w-full min-w-0 flex-col p-2", a),
      ...e
    }
  );
}
function ve({
  className: a,
  asChild: e = !1,
  ...r
}) {
  return /* @__PURE__ */ t(
    e ? h : "div",
    {
      "data-slot": "sidebar-group-label",
      "data-sidebar": "group-label",
      className: i(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-muted-foreground ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        a
      ),
      ...r
    }
  );
}
function xe({
  className: a,
  asChild: e = !1,
  ...r
}) {
  return /* @__PURE__ */ t(
    e ? h : "button",
    {
      "data-slot": "sidebar-group-action",
      "data-sidebar": "group-action",
      className: i(
        "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        a
      ),
      ...r
    }
  );
}
function we({
  className: a,
  ...e
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-slot": "sidebar-group-content",
      "data-sidebar": "group-content",
      className: i("w-full text-sm", a),
      ...e
    }
  );
}
function Se({ className: a, ...e }) {
  return /* @__PURE__ */ t(
    "ul",
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: i("flex w-full min-w-0 flex-col gap-1", a),
      ...e
    }
  );
}
function Ne({ className: a, ...e }) {
  return /* @__PURE__ */ t(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: i("group/menu-item relative", a),
      ...e
    }
  );
}
const X = I(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function ye({
  asChild: a = !1,
  isActive: e = !1,
  variant: r = "default",
  size: n = "default",
  tooltip: o,
  className: c,
  ...m
}) {
  const l = a ? h : "button", { isMobile: f, state: u } = S(), v = /* @__PURE__ */ t(
    l,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": n,
      "data-active": e,
      className: i(X({ variant: r, size: n }), c),
      ...m
    }
  );
  return o ? (typeof o == "string" && (o = {
    children: o
  }), /* @__PURE__ */ p(K, { children: [
    /* @__PURE__ */ t(H, { asChild: !0, children: v }),
    /* @__PURE__ */ t(
      j,
      {
        side: "right",
        align: "center",
        hidden: u !== "collapsed" || f,
        ...o
      }
    )
  ] })) : v;
}
function Me({
  className: a,
  asChild: e = !1,
  showOnHover: r = !1,
  ...n
}) {
  return /* @__PURE__ */ t(
    e ? h : "button",
    {
      "data-slot": "sidebar-menu-action",
      "data-sidebar": "menu-action",
      className: i(
        "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground ring-sidebar-ring outline-hidden transition-transform peer-hover/menu-button:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        r && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:opacity-100 md:opacity-0",
        a
      ),
      ...n
    }
  );
}
function Ce({
  className: a,
  ...e
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      "data-slot": "sidebar-menu-badge",
      "data-sidebar": "menu-badge",
      className: i(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        a
      ),
      ...e
    }
  );
}
function _e({
  className: a,
  showIcon: e = !1,
  ...r
}) {
  const n = d.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ p(
    "div",
    {
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: i("flex h-8 items-center gap-2 rounded-md px-2", a),
      ...r,
      children: [
        e && /* @__PURE__ */ t(
          M,
          {
            className: "size-4 rounded-md",
            "data-sidebar": "menu-skeleton-icon"
          }
        ),
        /* @__PURE__ */ t(
          M,
          {
            className: "h-4 max-w-(--skeleton-width) flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: {
              "--skeleton-width": n
            }
          }
        )
      ]
    }
  );
}
function ke({ className: a, ...e }) {
  return /* @__PURE__ */ t(
    "ul",
    {
      "data-slot": "sidebar-menu-sub",
      "data-sidebar": "menu-sub",
      className: i(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        a
      ),
      ...e
    }
  );
}
function Ie({
  className: a,
  ...e
}) {
  return /* @__PURE__ */ t(
    "li",
    {
      "data-slot": "sidebar-menu-sub-item",
      "data-sidebar": "menu-sub-item",
      className: i("group/menu-sub-item relative", a),
      ...e
    }
  );
}
function ze({
  asChild: a = !1,
  size: e = "md",
  isActive: r = !1,
  className: n,
  ...o
}) {
  return /* @__PURE__ */ t(
    a ? h : "a",
    {
      "data-slot": "sidebar-menu-sub-button",
      "data-sidebar": "menu-sub-button",
      "data-size": e,
      "data-active": r,
      className: i(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground ring-sidebar-ring outline-hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        e === "sm" && "text-xs",
        e === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        n
      ),
      ...o
    }
  );
}
export {
  se as Sidebar,
  ge as SidebarContent,
  pe as SidebarFooter,
  he as SidebarGroup,
  xe as SidebarGroupAction,
  we as SidebarGroupContent,
  ve as SidebarGroupLabel,
  fe as SidebarHeader,
  be as SidebarInput,
  ue as SidebarInset,
  Se as SidebarMenu,
  Me as SidebarMenuAction,
  Ce as SidebarMenuBadge,
  ye as SidebarMenuButton,
  Ne as SidebarMenuItem,
  _e as SidebarMenuSkeleton,
  ke as SidebarMenuSub,
  ze as SidebarMenuSubButton,
  Ie as SidebarMenuSubItem,
  de as SidebarProvider,
  ce as SidebarRail,
  me as SidebarSeparator,
  le as SidebarTrigger,
  S as useSidebar
};
