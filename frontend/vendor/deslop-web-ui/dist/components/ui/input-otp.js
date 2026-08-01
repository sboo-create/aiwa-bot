import { jsx as F, jsxs as Re } from "react/jsx-runtime";
import * as t from "react";
import { i as Oe } from "../../icons-DUsO7wRs.js";
import { c as K } from "../../utils-TrrhThB-.js";
var je = Object.defineProperty, De = Object.defineProperties, Ae = Object.getOwnPropertyDescriptors, Q = Object.getOwnPropertySymbols, ve = Object.prototype.hasOwnProperty, ge = Object.prototype.propertyIsEnumerable, me = (n, a, l) => a in n ? je(n, a, { enumerable: !0, configurable: !0, writable: !0, value: l }) : n[a] = l, Ie = (n, a) => {
  for (var l in a || (a = {})) ve.call(a, l) && me(n, l, a[l]);
  if (Q) for (var l of Q(a)) ge.call(a, l) && me(n, l, a[l]);
  return n;
}, We = (n, a) => De(n, Ae(a)), Be = (n, a) => {
  var l = {};
  for (var u in n) ve.call(n, u) && a.indexOf(u) < 0 && (l[u] = n[u]);
  if (n != null && Q) for (var u of Q(n)) a.indexOf(u) < 0 && ge.call(n, u) && (l[u] = n[u]);
  return l;
};
function _e(n) {
  let a = setTimeout(n, 0), l = setTimeout(n, 10), u = setTimeout(n, 50);
  return [a, l, u];
}
function Fe(n) {
  let a = t.useRef();
  return t.useEffect(() => {
    a.current = n;
  }), a.current;
}
var Ne = 18, he = 40, He = `${he}px`, Le = ["[data-lastpass-icon-root]", "com-1password-button", "[data-dashlanecreated]", '[style$="2147483647 !important;"]'].join(",");
function Ge({ containerRef: n, inputRef: a, pushPasswordManagerStrategy: l, isFocused: u }) {
  let [S, d] = t.useState(!1), [M, k] = t.useState(!1), [A, N] = t.useState(!1), H = t.useMemo(() => l === "none" ? !1 : (l === "increase-width" || l === "experimental-no-flickering") && S && M, [S, M, l]), I = t.useCallback(() => {
    let m = n.current, y = a.current;
    if (!m || !y || A || l === "none") return;
    let h = m, E = h.getBoundingClientRect().left + h.offsetWidth, W = h.getBoundingClientRect().top + h.offsetHeight / 2, i = E - Ne, L = W;
    document.querySelectorAll(Le).length === 0 && document.elementFromPoint(i, L) === m || (d(!0), N(!0));
  }, [n, a, A, l]);
  return t.useEffect(() => {
    let m = n.current;
    if (!m || l === "none") return;
    function y() {
      let E = window.innerWidth - m.getBoundingClientRect().right;
      k(E >= he);
    }
    y();
    let h = setInterval(y, 1e3);
    return () => {
      clearInterval(h);
    };
  }, [n, l]), t.useEffect(() => {
    let m = u || document.activeElement === a.current;
    if (l === "none" || !m) return;
    let y = setTimeout(I, 0), h = setTimeout(I, 2e3), E = setTimeout(I, 5e3), W = setTimeout(() => {
      N(!0);
    }, 6e3);
    return () => {
      clearTimeout(y), clearTimeout(h), clearTimeout(E), clearTimeout(W);
    };
  }, [a, u, l, I]), { hasPWMBadge: S, willPushPWMBadge: H, PWM_BADGE_SPACE_WIDTH: He };
}
var be = t.createContext({}), we = t.forwardRef((n, a) => {
  var l = n, { value: u, onChange: S, maxLength: d, textAlign: M = "left", pattern: k, placeholder: A, inputMode: N = "numeric", onComplete: H, pushPasswordManagerStrategy: I = "increase-width", pasteTransformer: m, containerClassName: y, noScriptCSSFallback: h = $e, render: E, children: W } = l, i = Be(l, ["value", "onChange", "maxLength", "textAlign", "pattern", "placeholder", "inputMode", "onComplete", "pushPasswordManagerStrategy", "pasteTransformer", "containerClassName", "noScriptCSSFallback", "render", "children"]), L, ne, re, ae, le;
  let [Se, Ee] = t.useState(typeof i.defaultValue == "string" ? i.defaultValue : ""), s = u ?? Se, T = Fe(s), G = t.useCallback((e) => {
    S?.(e), Ee(e);
  }, [S]), w = t.useMemo(() => k ? typeof k == "string" ? new RegExp(k) : k : null, [k]), c = t.useRef(null), U = t.useRef(null), X = t.useRef({ value: s, onChange: G, isIOS: typeof window < "u" && ((ne = (L = window?.CSS) == null ? void 0 : L.supports) == null ? void 0 : ne.call(L, "-webkit-touch-callout", "none")) }), Z = t.useRef({ prev: [(re = c.current) == null ? void 0 : re.selectionStart, (ae = c.current) == null ? void 0 : ae.selectionEnd, (le = c.current) == null ? void 0 : le.selectionDirection] });
  t.useImperativeHandle(a, () => c.current, []), t.useEffect(() => {
    let e = c.current, r = U.current;
    if (!e || !r) return;
    X.current.value !== e.value && X.current.onChange(e.value), Z.current.prev = [e.selectionStart, e.selectionEnd, e.selectionDirection];
    function p() {
      if (document.activeElement !== e) {
        z(null), V(null);
        return;
      }
      let o = e.selectionStart, f = e.selectionEnd, J = e.selectionDirection, b = e.maxLength, O = e.value, x = Z.current.prev, P = -1, C = -1, j;
      if (O.length !== 0 && o !== null && f !== null) {
        let Me = o === f, ke = o === O.length && O.length < b;
        if (Me && !ke) {
          let D = o;
          if (D === 0) P = 0, C = 1, j = "forward";
          else if (D === b) P = D - 1, C = D, j = "backward";
          else if (b > 1 && O.length > 1) {
            let te = 0;
            if (x[0] !== null && x[1] !== null) {
              j = D < x[1] ? "backward" : "forward";
              let Te = x[0] === x[1] && x[0] < b;
              j === "backward" && !Te && (te = -1);
            }
            P = te + D, C = te + D + 1;
          }
        }
        P !== -1 && C !== -1 && P !== C && c.current.setSelectionRange(P, C, j);
      }
      let pe = P !== -1 ? P : o, fe = C !== -1 ? C : f, Ce = j ?? J;
      z(pe), V(fe), Z.current.prev = [pe, fe, Ce];
    }
    if (document.addEventListener("selectionchange", p, { capture: !0 }), p(), document.activeElement === e && Y(!0), !document.getElementById("input-otp-style")) {
      let o = document.createElement("style");
      if (o.id = "input-otp-style", document.head.appendChild(o), o.sheet) {
        let f = "background: transparent !important; color: transparent !important; border-color: transparent !important; opacity: 0 !important; box-shadow: none !important; -webkit-box-shadow: none !important; -webkit-text-fill-color: transparent !important;";
        q(o.sheet, "[data-input-otp]::selection { background: transparent !important; color: transparent !important; }"), q(o.sheet, `[data-input-otp]:autofill { ${f} }`), q(o.sheet, `[data-input-otp]:-webkit-autofill { ${f} }`), q(o.sheet, "@supports (-webkit-touch-callout: none) { [data-input-otp] { letter-spacing: -.6em !important; font-weight: 100 !important; font-stretch: ultra-condensed; font-optical-sizing: none !important; left: -1px !important; right: 1px !important; } }"), q(o.sheet, "[data-input-otp] + * { pointer-events: all !important; }");
      }
    }
    let v = () => {
      r && r.style.setProperty("--root-height", `${e.clientHeight}px`);
    };
    v();
    let g = new ResizeObserver(v);
    return g.observe(e), () => {
      document.removeEventListener("selectionchange", p, { capture: !0 }), g.disconnect();
    };
  }, []);
  let [oe, ie] = t.useState(!1), [$, Y] = t.useState(!1), [R, z] = t.useState(null), [B, V] = t.useState(null);
  t.useEffect(() => {
    _e(() => {
      var e, r, p, v;
      (e = c.current) == null || e.dispatchEvent(new Event("input"));
      let g = (r = c.current) == null ? void 0 : r.selectionStart, o = (p = c.current) == null ? void 0 : p.selectionEnd, f = (v = c.current) == null ? void 0 : v.selectionDirection;
      g !== null && o !== null && (z(g), V(o), Z.current.prev = [g, o, f]);
    });
  }, [s, $]), t.useEffect(() => {
    T !== void 0 && s !== T && T.length < d && s.length === d && H?.(s);
  }, [d, H, T, s]);
  let _ = Ge({ containerRef: U, inputRef: c, pushPasswordManagerStrategy: I, isFocused: $ }), ue = t.useCallback((e) => {
    let r = e.currentTarget.value.slice(0, d);
    if (r.length > 0 && w && !w.test(r)) {
      e.preventDefault();
      return;
    }
    typeof T == "string" && r.length < T.length && document.dispatchEvent(new Event("selectionchange")), G(r);
  }, [d, G, T, w]), se = t.useCallback(() => {
    var e;
    if (c.current) {
      let r = Math.min(c.current.value.length, d - 1), p = c.current.value.length;
      (e = c.current) == null || e.setSelectionRange(r, p), z(r), V(p);
    }
    Y(!0);
  }, [d]), ce = t.useCallback((e) => {
    var r, p;
    let v = c.current;
    if (!m && (!X.current.isIOS || !e.clipboardData || !v)) return;
    let g = e.clipboardData.getData("text/plain"), o = m ? m(g) : g;
    e.preventDefault();
    let f = (r = c.current) == null ? void 0 : r.selectionStart, J = (p = c.current) == null ? void 0 : p.selectionEnd, b = (f !== J ? s.slice(0, f) + o + s.slice(J) : s.slice(0, f) + o + s.slice(f)).slice(0, d);
    if (b.length > 0 && w && !w.test(b)) return;
    v.value = b, G(b);
    let O = Math.min(b.length, d - 1), x = b.length;
    v.setSelectionRange(O, x), z(O), V(x);
  }, [d, G, w, s]), xe = t.useMemo(() => ({ position: "relative", cursor: i.disabled ? "default" : "text", userSelect: "none", WebkitUserSelect: "none", pointerEvents: "none" }), [i.disabled]), de = t.useMemo(() => ({ position: "absolute", inset: 0, width: _.willPushPWMBadge ? `calc(100% + ${_.PWM_BADGE_SPACE_WIDTH})` : "100%", clipPath: _.willPushPWMBadge ? `inset(0 ${_.PWM_BADGE_SPACE_WIDTH} 0 0)` : void 0, height: "100%", display: "flex", textAlign: M, opacity: "1", color: "transparent", pointerEvents: "all", background: "transparent", caretColor: "transparent", border: "0 solid transparent", outline: "0 solid transparent", boxShadow: "none", lineHeight: "1", letterSpacing: "-.5em", fontSize: "var(--root-height)", fontFamily: "monospace", fontVariantNumeric: "tabular-nums" }), [_.PWM_BADGE_SPACE_WIDTH, _.willPushPWMBadge, M]), ye = t.useMemo(() => t.createElement("input", We(Ie({ autoComplete: i.autoComplete || "one-time-code" }, i), { "data-input-otp": !0, "data-input-otp-placeholder-shown": s.length === 0 || void 0, "data-input-otp-mss": R, "data-input-otp-mse": B, inputMode: N, pattern: w?.source, "aria-placeholder": A, style: de, maxLength: d, value: s, ref: c, onPaste: (e) => {
    var r;
    ce(e), (r = i.onPaste) == null || r.call(i, e);
  }, onChange: ue, onMouseOver: (e) => {
    var r;
    ie(!0), (r = i.onMouseOver) == null || r.call(i, e);
  }, onMouseLeave: (e) => {
    var r;
    ie(!1), (r = i.onMouseLeave) == null || r.call(i, e);
  }, onFocus: (e) => {
    var r;
    se(), (r = i.onFocus) == null || r.call(i, e);
  }, onBlur: (e) => {
    var r;
    Y(!1), (r = i.onBlur) == null || r.call(i, e);
  } })), [ue, se, ce, N, de, d, B, R, i, w?.source, s]), ee = t.useMemo(() => ({ slots: Array.from({ length: d }).map((e, r) => {
    var p;
    let v = $ && R !== null && B !== null && (R === B && r === R || r >= R && r < B), g = s[r] !== void 0 ? s[r] : null, o = s[0] !== void 0 ? null : (p = A?.[r]) != null ? p : null;
    return { char: g, placeholderChar: o, isActive: v, hasFakeCaret: v && g === null };
  }), isFocused: $, isHovering: !i.disabled && oe }), [$, oe, d, B, R, i.disabled, s]), Pe = t.useMemo(() => E ? E(ee) : t.createElement(be.Provider, { value: ee }, W), [W, ee, E]);
  return t.createElement(t.Fragment, null, h !== null && t.createElement("noscript", null, t.createElement("style", null, h)), t.createElement("div", { ref: U, "data-input-otp-container": !0, style: xe, className: y }, Pe, t.createElement("div", { style: { position: "absolute", inset: 0, pointerEvents: "none" } }, ye)));
});
we.displayName = "Input";
function q(n, a) {
  try {
    n.insertRule(a);
  } catch {
    console.error("input-otp could not insert CSS rule:", a);
  }
}
var $e = `
[data-input-otp] {
  --nojs-bg: white !important;
  --nojs-fg: black !important;

  background-color: var(--nojs-bg) !important;
  color: var(--nojs-fg) !important;
  caret-color: var(--nojs-fg) !important;
  letter-spacing: .25em !important;
  text-align: center !important;
  border: 1px solid var(--nojs-fg) !important;
  border-radius: 4px !important;
  width: 100% !important;
}
@media (prefers-color-scheme: dark) {
  [data-input-otp] {
    --nojs-bg: black !important;
    --nojs-fg: white !important;
  }
}`;
function Ze({
  className: n,
  containerClassName: a,
  ...l
}) {
  return /* @__PURE__ */ F(
    we,
    {
      "data-slot": "input-otp",
      containerClassName: K(
        "flex items-center gap-2 has-disabled:opacity-50",
        a
      ),
      className: K("disabled:cursor-not-allowed", n),
      ...l
    }
  );
}
function Je({ className: n, ...a }) {
  return /* @__PURE__ */ F(
    "div",
    {
      "data-slot": "input-otp-group",
      className: K("flex items-center", n),
      ...a
    }
  );
}
function Ke({
  index: n,
  className: a,
  ...l
}) {
  const u = t.useContext(be), { char: S, hasFakeCaret: d, isActive: M } = u?.slots[n] ?? {};
  return /* @__PURE__ */ Re(
    "div",
    {
      "data-slot": "input-otp-slot",
      "data-active": M,
      className: K(
        "relative flex size-12 items-center justify-center border-y border-r border-input text-sm shadow-xs transition-all outline-none first:rounded-l-text-field first:border-l last:rounded-r-text-field aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-[3px] data-[active=true]:ring-ring data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive dark:bg-input",
        a
      ),
      ...l,
      children: [
        S,
        d && /* @__PURE__ */ F("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ F("div", { className: "h-4 w-px animate-caret-blink bg-foreground duration-1000" }) })
      ]
    }
  );
}
function Qe({ ...n }) {
  return /* @__PURE__ */ F("div", { "data-slot": "input-otp-separator", role: "separator", ...n, children: /* @__PURE__ */ F(Oe, {}) });
}
export {
  Ze as InputOTP,
  Je as InputOTPGroup,
  Qe as InputOTPSeparator,
  Ke as InputOTPSlot
};
