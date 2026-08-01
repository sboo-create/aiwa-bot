import { jsxs as r, jsx as e } from "react/jsx-runtime";
import { ChartAreaInteractive as b } from "../charts/area.js";
import { Badge as u } from "../components/ui/badge.js";
import { Button as p } from "../components/ui/button.js";
import { Card as s, CardHeader as c, CardDescription as o, CardTitle as t, CardContent as h } from "../components/ui/card.js";
import { SidebarProvider as f, Sidebar as g, SidebarHeader as v, SidebarContent as S, SidebarGroup as C, SidebarGroupLabel as N, SidebarGroupContent as w, SidebarMenu as x, SidebarMenuItem as d, SidebarMenuButton as n, SidebarInset as I, SidebarTrigger as y } from "../components/ui/sidebar.js";
import { Table as P, TableHeader as T, TableRow as m, TableHead as l, TableBody as B, TableCell as i } from "../components/ui/table.js";
import { C as D, a as A, B as R, P as k } from "../icons-DUsO7wRs.js";
const H = [
  { label: "Revenue", value: "$45,231", change: "+20.1%" },
  { label: "Subscriptions", value: "+2,350", change: "+12.2%" },
  { label: "Active users", value: "12,234", change: "+8.4%" }
], M = [
  { name: "Web UI", status: "Ready", owner: "Design Systems" },
  { name: "Mini App", status: "In progress", owner: "Product" },
  { name: "Primitives", status: "Ready", owner: "Platform" }
];
function $() {
  return /* @__PURE__ */ r(
    f,
    {
      className: "relative min-h-[760px] overflow-hidden rounded-section border",
      style: { "--sidebar-width": "14rem", "--sidebar": "var(--background)" },
      children: [
        /* @__PURE__ */ r(g, { collapsible: "offcanvas", className: "absolute h-full border-r", children: [
          /* @__PURE__ */ e(v, { className: "p-4 font-semibold", children: "Deslop" }),
          /* @__PURE__ */ e(S, { children: /* @__PURE__ */ r(C, { children: [
            /* @__PURE__ */ e(N, { children: "Dashboard" }),
            /* @__PURE__ */ e(w, { children: /* @__PURE__ */ r(x, { children: [
              /* @__PURE__ */ e(d, { children: /* @__PURE__ */ r(n, { isActive: !0, children: [
                /* @__PURE__ */ e(D, {}),
                /* @__PURE__ */ e("span", { children: "Overview" })
              ] }) }),
              /* @__PURE__ */ e(d, { children: /* @__PURE__ */ r(n, { children: [
                /* @__PURE__ */ e(A, {}),
                /* @__PURE__ */ e("span", { children: "Projects" })
              ] }) }),
              /* @__PURE__ */ e(d, { children: /* @__PURE__ */ r(n, { children: [
                /* @__PURE__ */ e(R, {}),
                /* @__PURE__ */ e("span", { children: "Notifications" })
              ] }) })
            ] }) })
          ] }) })
        ] }),
        /* @__PURE__ */ r(I, { className: "min-w-0 bg-card", children: [
          /* @__PURE__ */ r("header", { className: "flex h-14 items-center gap-3 border-b px-4", children: [
            /* @__PURE__ */ e(y, {}),
            /* @__PURE__ */ e("span", { className: "font-medium", children: "Dashboard" }),
            /* @__PURE__ */ r(p, { size: "sm", className: "ml-auto", children: [
              /* @__PURE__ */ e(k, {}),
              " Add project"
            ] })
          ] }),
          /* @__PURE__ */ r("div", { className: "flex flex-col gap-5 p-4 [&_[data-slot=card]]:border-0 [&_[data-slot=card]]:bg-accent [&_[data-slot=card]]:shadow-none lg:p-6", children: [
            /* @__PURE__ */ e("div", { className: "grid gap-4 md:grid-cols-3", children: H.map((a) => /* @__PURE__ */ r(s, { children: [
              /* @__PURE__ */ r(c, { children: [
                /* @__PURE__ */ e(o, { children: a.label }),
                /* @__PURE__ */ e(t, { className: "text-2xl", children: a.value })
              ] }),
              /* @__PURE__ */ e(h, { children: /* @__PURE__ */ r("span", { className: "text-sm text-muted-foreground", children: [
                a.change,
                " from last month"
              ] }) })
            ] }, a.label)) }),
            /* @__PURE__ */ e(b, {}),
            /* @__PURE__ */ r(s, { children: [
              /* @__PURE__ */ r(c, { children: [
                /* @__PURE__ */ e(t, { children: "Projects" }),
                /* @__PURE__ */ e(o, { children: "Current design-system workspaces." })
              ] }),
              /* @__PURE__ */ e(h, { children: /* @__PURE__ */ r(P, { children: [
                /* @__PURE__ */ e(T, { children: /* @__PURE__ */ r(m, { children: [
                  /* @__PURE__ */ e(l, { children: "Name" }),
                  /* @__PURE__ */ e(l, { children: "Status" }),
                  /* @__PURE__ */ e(l, { children: "Owner" })
                ] }) }),
                /* @__PURE__ */ e(B, { children: M.map((a) => /* @__PURE__ */ r(m, { children: [
                  /* @__PURE__ */ e(i, { className: "font-medium", children: a.name }),
                  /* @__PURE__ */ e(i, { children: /* @__PURE__ */ e(
                    u,
                    {
                      variant: a.status === "Ready" ? "filled" : "gray",
                      children: a.status
                    }
                  ) }),
                  /* @__PURE__ */ e(i, { children: a.owner })
                ] }, a.name)) })
              ] }) })
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  $ as DashboardBlock
};
