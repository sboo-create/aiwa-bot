import { jsx as e, jsxs as r } from "react/jsx-runtime";
import { useId as i } from "react";
import { Button as m } from "../components/ui/button.js";
import { Card as f, CardHeader as w, CardTitle as x, CardDescription as y, CardContent as C } from "../components/ui/card.js";
import { FieldGroup as F, Field as t, FieldLabel as n, FieldDescription as s } from "../components/ui/field.js";
import { Input as l } from "../components/ui/input.js";
import { c as b } from "../utils-TrrhThB-.js";
function j({ className: h, ...u }) {
  const o = i(), d = i(), c = i(), a = i();
  return /* @__PURE__ */ e(
    "div",
    {
      className: b("flex w-full items-center justify-center p-6 md:p-10", h),
      ...u,
      children: /* @__PURE__ */ r(f, { className: "w-full max-w-sm", children: [
        /* @__PURE__ */ r(w, { children: [
          /* @__PURE__ */ e(x, { className: "text-2xl", children: "Create an account" }),
          /* @__PURE__ */ e(y, { children: "Enter your information below to create your account." })
        ] }),
        /* @__PURE__ */ e(C, { children: /* @__PURE__ */ e("form", { onSubmit: (p) => p.preventDefault(), children: /* @__PURE__ */ r(F, { children: [
          /* @__PURE__ */ r(t, { children: [
            /* @__PURE__ */ e(n, { htmlFor: o, children: "Full name" }),
            /* @__PURE__ */ e(l, { id: o, placeholder: "John Doe", required: !0 })
          ] }),
          /* @__PURE__ */ r(t, { children: [
            /* @__PURE__ */ e(n, { htmlFor: d, children: "Email" }),
            /* @__PURE__ */ e(l, { id: d, type: "email", placeholder: "m@example.com", required: !0 })
          ] }),
          /* @__PURE__ */ r(t, { children: [
            /* @__PURE__ */ e(n, { htmlFor: c, children: "Password" }),
            /* @__PURE__ */ e(l, { id: c, type: "password", required: !0 }),
            /* @__PURE__ */ e(s, { children: "Must be at least 8 characters long." })
          ] }),
          /* @__PURE__ */ r(t, { children: [
            /* @__PURE__ */ e(n, { htmlFor: a, children: "Confirm password" }),
            /* @__PURE__ */ e(l, { id: a, type: "password", required: !0 })
          ] }),
          /* @__PURE__ */ r(t, { children: [
            /* @__PURE__ */ e(m, { type: "submit", children: "Create account" }),
            /* @__PURE__ */ e(m, { variant: "outline", type: "button", children: "Sign up with Google" }),
            /* @__PURE__ */ r(s, { className: "text-center", children: [
              "Already have an account? ",
              /* @__PURE__ */ e("a", { href: "#", children: "Sign in" })
            ] })
          ] })
        ] }) }) })
      ] })
    }
  );
}
export {
  j as SignupBlock
};
