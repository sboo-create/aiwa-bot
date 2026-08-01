import { jsx as s } from "react/jsx-runtime";
import * as l from "react";
import { c as g } from "../../utils-TrrhThB-.js";
import { c as _ } from "../../index-oVmar2KU.js";
import { u as C } from "../../index-CRNjeP0c.js";
import { u as h } from "../../index-CCKe-Mpx.js";
import { P as z } from "../../index-Si5tf8-e.js";
var S = Object.defineProperty, c = (a, e) => S(a, "name", { value: e, configurable: !0 }), b = "Avatar", [w, V] = _(b), y = [
  0,
  () => {
  }
], [E, I] = w(b), R = /* @__PURE__ */ l.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ c(function(e, t) {
    const { __scopeAvatar: o, ...n } = e, [r, i] = l.useState("idle"), [u, d] = k();
    return /* @__PURE__ */ s(
      E,
      {
        scope: o,
        imageLoadingStatus: r,
        setImageLoadingStatus: i,
        imageCount: u,
        setImageCount: d,
        children: /* @__PURE__ */ s(z.span, { ...n, ref: t })
      }
    );
  }, "Avatar")
), j = "AvatarImage", P = /* @__PURE__ */ l.forwardRef(
  /* @__PURE__ */ c(function(e, t) {
    const { __scopeAvatar: o, src: n, onLoadingStatusChange: r, ...i } = e, u = I(j, o);
    u.setImageCount;
    const d = x(n, {
      referrerPolicy: i.referrerPolicy,
      crossOrigin: i.crossOrigin,
      loadingStatus: u.imageLoadingStatus,
      setLoadingStatus: u.setImageLoadingStatus
    }), v = C((f) => {
      r?.(f);
    }), A = l.useRef(d);
    return h(() => {
      const f = A.current;
      A.current = d, d !== f && v(d);
    }, [d, v]), d === "loaded" ? /* @__PURE__ */ s(z.img, { ...i, ref: t, src: n }) : null;
  }, "AvatarImage")
), T = "AvatarFallback", F = /* @__PURE__ */ l.forwardRef(
  /* @__PURE__ */ c(function(e, t) {
    const { __scopeAvatar: o, delayMs: n, ...r } = e, i = I(T, o), [u, d] = l.useState(n === void 0);
    return l.useEffect(() => {
      if (n !== void 0) {
        const v = window.setTimeout(() => d(!0), n);
        return () => window.clearTimeout(v);
      }
    }, [n]), u && i.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ s(z.span, { ...r, ref: t }) : null;
  }, "AvatarFallback")
);
function x(a, {
  loadingStatus: e,
  setLoadingStatus: t,
  referrerPolicy: o,
  crossOrigin: n
}) {
  return h(() => {
    if (!a) {
      t("error");
      return;
    }
    const r = new window.Image(), i = /* @__PURE__ */ c((d) => {
      const v = d.currentTarget;
      t(p(v));
    }, "handleLoad"), u = /* @__PURE__ */ c(() => t("error"), "handleError");
    return r.addEventListener("load", i), r.addEventListener("error", u), o && (r.referrerPolicy = o), r.crossOrigin = n ?? null, r.src = a, t(p(r)), () => {
      r.removeEventListener("load", i), r.removeEventListener("error", u), t("idle");
    };
  }, [a, n, o, t]), e;
}
c(x, "useImageLoadingStatus");
function p(a) {
  return a.complete ? a.naturalWidth > 0 ? "loaded" : "error" : "loading";
}
c(p, "getImageLoadingStatus");
function k() {
  return y;
}
c(k, "useImageCount");
function M(a) {
}
c(M, "useUpdateImageCount");
const m = [
  "red",
  "orange",
  "purple",
  "green",
  "cyan",
  "blue",
  "pink"
];
function L(a) {
  const t = ((Number.isFinite(a) ? Math.trunc(a) : 0) % m.length + m.length) % m.length;
  return `var(--avatar-${m[t]}-gradient)`;
}
function N(a) {
  const e = a.trim().split(/\s+/u).filter(Boolean), t = e.at(0)?.charAt(0) ?? "", o = e.length > 1 ? e.at(-1)?.charAt(0) ?? "" : "", n = (r) => /[\p{L}\p{N}]/u.test(r);
  return [t, o].filter(n).join("").toLocaleUpperCase();
}
function W({
  className: a,
  size: e = "default",
  ...t
}) {
  return /* @__PURE__ */ s(
    R,
    {
      "data-slot": "avatar",
      "data-size": e,
      className: g(
        "group/avatar relative flex size-10 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-14 data-[size=sm]:size-6",
        a
      ),
      ...t
    }
  );
}
function D({
  className: a,
  ...e
}) {
  return /* @__PURE__ */ s(
    P,
    {
      "data-slot": "avatar-image",
      className: g("aspect-square size-full object-cover", a),
      ...e
    }
  );
}
function J({
  children: a,
  className: e,
  name: t,
  style: o,
  userId: n = 0,
  ...r
}) {
  return /* @__PURE__ */ s(
    F,
    {
      "data-slot": "avatar-fallback",
      className: g(
        "flex size-full items-center justify-center rounded-full font-sans text-sm font-bold text-avatar-foreground group-data-[size=lg]/avatar:text-xl group-data-[size=sm]/avatar:text-xs",
        e
      ),
      style: { backgroundImage: L(n), ...o },
      ...r,
      children: t ? N(t) : a
    }
  );
}
const G = l.forwardRef(
  ({
    children: a,
    className: e,
    shape: t = "circle",
    size: o = "default",
    ...n
  }, r) => /* @__PURE__ */ s(
    "div",
    {
      ref: r,
      "data-slot": "icon-avatar",
      "data-shape": t,
      "data-size": o,
      className: g(
        "flex aspect-square size-10 shrink-0 items-center justify-center overflow-hidden bg-muted text-foreground select-none data-[size=lg]:size-14 data-[size=sm]:size-6 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-6 data-[size=lg]:[&_svg:not([class*='size-'])]:size-8 data-[size=sm]:[&_svg:not([class*='size-'])]:size-4",
        t === "circle" ? "rounded-full" : "rounded-lg",
        e
      ),
      ...n,
      children: a
    }
  )
);
G.displayName = "IconAvatar";
const O = l.forwardRef(
  ({
    alt: a = "",
    className: e,
    shape: t = "circle",
    size: o = 40,
    src: n,
    style: r,
    ...i
  }, u) => /* @__PURE__ */ s(
    "div",
    {
      ref: u,
      "data-slot": "image-avatar",
      "data-shape": t,
      className: g(
        "relative shrink-0 overflow-hidden bg-muted",
        t === "circle" ? "rounded-full" : "rounded-md",
        e
      ),
      style: { width: o, height: o, ...r },
      ...i,
      children: n ? /* @__PURE__ */ s(
        "img",
        {
          alt: a,
          src: n,
          className: "block size-full rounded-[inherit] object-cover"
        }
      ) : null
    }
  )
);
O.displayName = "ImageAvatar";
function Q({
  className: a,
  name: e,
  size: t = 40,
  style: o,
  userId: n,
  ...r
}) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "initials-avatar",
      role: "img",
      "aria-label": e,
      className: g(
        "flex shrink-0 items-center justify-center rounded-full font-sans font-bold text-avatar-foreground select-none",
        a
      ),
      style: {
        width: t,
        height: t,
        backgroundImage: L(n),
        fontSize: Math.round(t / 2.2),
        lineHeight: 1,
        ...o
      },
      ...r,
      children: N(e)
    }
  );
}
function X({ className: a, ...e }) {
  return /* @__PURE__ */ s(
    "span",
    {
      "data-slot": "avatar-badge",
      className: g(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-3 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3.5 group-data-[size=lg]/avatar:[&>svg]:size-2",
        a
      ),
      ...e
    }
  );
}
function Y({ className: a, ...e }) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "avatar-group",
      className: g(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        a
      ),
      ...e
    }
  );
}
function Z({
  className: a,
  ...e
}) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "avatar-group-count",
      className: g(
        "relative flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-14 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        a
      ),
      ...e
    }
  );
}
export {
  W as Avatar,
  X as AvatarBadge,
  J as AvatarFallback,
  Y as AvatarGroup,
  Z as AvatarGroupCount,
  D as AvatarImage,
  G as IconAvatar,
  O as ImageAvatar,
  Q as InitialsAvatar
};
