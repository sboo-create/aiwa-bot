import { jsxs as r, jsx as e } from "react/jsx-runtime";
import { Button as d } from "../components/ui/button.js";
import { SidebarProvider as n, Sidebar as c, SidebarHeader as l, SidebarContent as o, SidebarGroup as s, SidebarGroupLabel as t, SidebarGroupContent as m, SidebarMenu as b, SidebarMenuItem as h, SidebarMenuButton as p, SidebarFooter as u, SidebarInset as f, SidebarTrigger as v } from "../components/ui/sidebar.js";
import { C as N, a as x, B as S, P as g } from "../icons-DUsO7wRs.js";
const w = [
  { label: "Overview", icon: N },
  { label: "Projects", icon: x },
  { label: "Notifications", icon: S }
];
function C() {
  return /* @__PURE__ */ r(
    n,
    {
      className: "relative min-h-[560px] overflow-hidden rounded-section border",
      style: { "--sidebar-width": "14rem", "--sidebar": "var(--background)" },
      children: [
        /* @__PURE__ */ r(c, { collapsible: "offcanvas", className: "absolute h-full border-r", children: [
          /* @__PURE__ */ r(l, { className: "p-4", children: [
            /* @__PURE__ */ e("div", { className: "font-semibold", children: "Deslop" }),
            /* @__PURE__ */ e("div", { className: "text-xs text-muted-foreground", children: "Product workspace" })
          ] }),
          /* @__PURE__ */ e(o, { children: /* @__PURE__ */ r(s, { children: [
            /* @__PURE__ */ e(t, { children: "Workspace" }),
            /* @__PURE__ */ e(m, { children: /* @__PURE__ */ e(b, { children: w.map((i, a) => /* @__PURE__ */ e(h, { children: /* @__PURE__ */ r(p, { isActive: a === 0, children: [
              /* @__PURE__ */ e(i.icon, {}),
              /* @__PURE__ */ e("span", { children: i.label })
            ] }) }, i.label)) }) })
          ] }) }),
          /* @__PURE__ */ e(u, { className: "p-3", children: /* @__PURE__ */ r(d, { className: "w-full", children: [
            /* @__PURE__ */ e(g, {}),
            " New project"
          ] }) })
        ] }),
        /* @__PURE__ */ r(f, { className: "min-w-0 bg-card", children: [
          /* @__PURE__ */ r("header", { className: "flex h-14 items-center gap-3 border-b px-4", children: [
            /* @__PURE__ */ e(v, {}),
            /* @__PURE__ */ e("span", { className: "font-medium", children: "Overview" })
          ] }),
          /* @__PURE__ */ r("div", { className: "grid flex-1 gap-4 p-4 [&>div]:border-0 [&>div]:bg-accent [&>div]:shadow-none sm:grid-cols-2", children: [
            /* @__PURE__ */ r("div", { className: "rounded-section border p-5", children: [
              /* @__PURE__ */ e("p", { className: "font-medium", children: "Active projects" }),
              /* @__PURE__ */ e("p", { className: "mt-2 text-3xl font-semibold", children: "12" })
            ] }),
            /* @__PURE__ */ r("div", { className: "rounded-section border p-5", children: [
              /* @__PURE__ */ e("p", { className: "font-medium", children: "Team members" }),
              /* @__PURE__ */ e("p", { className: "mt-2 text-3xl font-semibold", children: "24" })
            ] }),
            /* @__PURE__ */ r("div", { className: "min-h-64 rounded-section border p-5 sm:col-span-2", children: [
              /* @__PURE__ */ e("p", { className: "font-medium", children: "Workspace activity" }),
              /* @__PURE__ */ e("p", { className: "mt-2 text-sm text-muted-foreground", children: "Select an item in the sidebar to open its content." })
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  C as SidebarBlock
};
