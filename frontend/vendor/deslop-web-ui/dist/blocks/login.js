import { jsx as e, jsxs as r } from "react/jsx-runtime";
import { useId as l } from "react";
import { Button as n } from "../components/ui/button.js";
import { Card as u, CardHeader as h, CardTitle as p, CardDescription as f, CardContent as x } from "../components/ui/card.js";
import { FieldGroup as g, Field as i, FieldLabel as d, FieldDescription as w } from "../components/ui/field.js";
import { Input as c } from "../components/ui/input.js";
import { c as y } from "../utils-TrrhThB-.js";
function I({ className: a, ...m }) {
  const t = l(), o = l();
  return /* @__PURE__ */ e(
    "div",
    {
      className: y("flex w-full items-center justify-center p-6 md:p-10", a),
      ...m,
      children: /* @__PURE__ */ r(u, { className: "w-full max-w-sm", children: [
        /* @__PURE__ */ r(h, { children: [
          /* @__PURE__ */ e(p, { className: "text-2xl", children: "Login to your account" }),
          /* @__PURE__ */ e(f, { children: "Enter your email below to login to your account." })
        ] }),
        /* @__PURE__ */ e(x, { children: /* @__PURE__ */ e("form", { onSubmit: (s) => s.preventDefault(), children: /* @__PURE__ */ r(g, { children: [
          /* @__PURE__ */ r(i, { children: [
            /* @__PURE__ */ e(d, { htmlFor: t, children: "Email" }),
            /* @__PURE__ */ e(c, { id: t, type: "email", placeholder: "m@example.com", required: !0 })
          ] }),
          /* @__PURE__ */ r(i, { children: [
            /* @__PURE__ */ r("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ e(d, { htmlFor: o, children: "Password" }),
              /* @__PURE__ */ e("a", { href: "#", className: "ml-auto text-sm underline-offset-4 hover:underline", children: "Forgot your password?" })
            ] }),
            /* @__PURE__ */ e(c, { id: o, type: "password", required: !0 })
          ] }),
          /* @__PURE__ */ r(i, { children: [
            /* @__PURE__ */ e(n, { type: "submit", children: "Login" }),
            /* @__PURE__ */ e(n, { variant: "outline", type: "button", children: "Login with Google" }),
            /* @__PURE__ */ r(w, { className: "text-center", children: [
              "Don't have an account? ",
              /* @__PURE__ */ e("a", { href: "#", children: "Sign up" })
            ] })
          ] })
        ] }) }) })
      ] })
    }
  );
}
export {
  I as LoginBlock
};
