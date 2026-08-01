import { jsx as H, jsxs as lt } from "react/jsx-runtime";
import * as i from "react";
import { createElement as vr } from "react";
import { X as os, C as Wi, c as Ki } from "../../icons-DUsO7wRs.js";
import { c as ct } from "../../utils-TrrhThB-.js";
import { InputGroupButton as _o, InputGroup as zi, InputGroupInput as qi, InputGroupAddon as Yi } from "./input-group.js";
import { i as Je, g as Gt, a as Lo, b as Wn, c as Bo, f as bo, d as xt, e as ji, h as it, j as yo, k as Xi, u as Qi, l as Ji, m as Zi, n as ec, o as Ho, p as tc, q as nc, r as oc, s as rc, t as sc, v as Vn, w as Sr, x as Or, y as ic, z as cc, A as uc } from "../../floating-ui.react-dom-D2Sfx2pi.js";
import * as pn from "react-dom";
import { r as lc, w as ac } from "../../with-selector-CpkHbNSv.js";
let Oo;
process.env.NODE_ENV !== "production" && (Oo = /* @__PURE__ */ new Set());
function Fn(...e) {
  if (process.env.NODE_ENV !== "production") {
    const t = e.join(" ");
    Oo.has(t) || (Oo.add(t), console.error(`Base UI: ${t}`));
  }
}
function xo({
  controlled: e,
  default: t,
  name: n,
  state: o = "value"
}) {
  const {
    current: r
  } = i.useRef(e !== void 0), [s, c] = i.useState(t), u = r ? e : s;
  if (process.env.NODE_ENV !== "production") {
    i.useEffect(() => {
      r !== (e !== void 0) && Fn([`A component is changing the ${r ? "" : "un"}controlled ${o} state of ${n} to be ${r ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [o, n, e]);
    const {
      current: l
    } = i.useRef(t);
    i.useEffect(() => {
      !r && Pr(l) !== Pr(t) && Fn([`A component is changing the default ${o} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [t]);
  }
  const y = i.useCallback((l) => {
    r || c(l);
  }, []);
  return [u, y];
}
function Pr(e) {
  let t = 0;
  const n = /* @__PURE__ */ new WeakMap();
  try {
    return JSON.stringify(e, function(s, c) {
      if (!(s === "_owner" && this != null && typeof this == "object" && "$$typeof" in this)) {
        if (typeof c == "bigint")
          return `__bigint__:${c}`;
        if (c !== null && typeof c == "object") {
          const u = n.get(c);
          if (u !== void 0)
            return `__object__:${u}`;
          n.set(c, t), t += 1;
        }
        return c;
      }
    }) ?? `__top__:${typeof e}`;
  } catch {
    return "__unserializable__";
  }
}
const rn = {
  ...i
}, Nr = {};
function at(e, t) {
  const n = i.useRef(Nr);
  return n.current === Nr && (n.current = e(t)), n;
}
const Eo = rn.useInsertionEffect, fc = (
  // React 17 doesn't have useInsertionEffect.
  Eo && // Preact replaces useInsertionEffect with useLayoutEffect and fires too late.
  Eo !== rn.useLayoutEffect ? Eo : (e) => e()
);
function ee(e) {
  const t = at(dc).current;
  return t.next = e, fc(t.effect), t.trampoline;
}
function dc() {
  const e = {
    next: void 0,
    callback: pc,
    trampoline: (...t) => e.callback?.(...t),
    effect: () => {
      e.callback = e.next;
    }
  };
  return e;
}
function pc() {
  if (process.env.NODE_ENV !== "production")
    throw (
      /* minify-error-disabled */
      new Error("Base UI: Cannot call an event handler while rendering.")
    );
}
const mc = () => {
}, Y = typeof document < "u" ? i.useLayoutEffect : mc;
let Po;
process.env.NODE_ENV !== "production" && (Po = /* @__PURE__ */ new Set());
function hc(...e) {
  if (process.env.NODE_ENV !== "production") {
    const t = e.join(" ");
    Po.has(t) || (Po.add(t), console.warn(`Base UI: ${t}`));
  }
}
const $o = /* @__PURE__ */ i.createContext({
  register: () => {
  },
  unregister: () => {
  },
  subscribeMapChange: () => () => {
  },
  elementsRef: {
    current: []
  },
  nextIndexRef: {
    current: 0
  }
});
process.env.NODE_ENV !== "production" && ($o.displayName = "CompositeListContext");
function gc() {
  return i.useContext($o);
}
function rs(e) {
  const {
    children: t,
    elementsRef: n,
    labelsRef: o,
    onMapChange: r
  } = e, s = ee(r), c = i.useRef(0), u = at(yc).current, y = at(bc).current, [l, a] = i.useState(0), b = i.useRef(l), d = ee((m, I) => {
    y.set(m, I ?? null), b.current += 1, a(b.current);
  }), C = ee((m) => {
    y.delete(m), b.current += 1, a(b.current);
  }), g = i.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    return Array.from(y.keys()).filter((f) => f.isConnected).sort(xc).forEach((f, h) => {
      const w = y.get(f) ?? {};
      m.set(f, {
        ...w,
        index: h
      });
    }), m;
  }, [y, l]);
  Y(() => {
    if (typeof MutationObserver != "function" || g.size === 0)
      return;
    const m = new MutationObserver((I) => {
      const f = /* @__PURE__ */ new Set(), h = (w) => f.has(w) ? f.delete(w) : f.add(w);
      I.forEach((w) => {
        w.removedNodes.forEach(h), w.addedNodes.forEach(h);
      }), f.size === 0 && (b.current += 1, a(b.current));
    });
    return g.forEach((I, f) => {
      f.parentElement && m.observe(f.parentElement, {
        childList: !0
      });
    }), () => {
      m.disconnect();
    };
  }, [g]), Y(() => {
    b.current === l && (n.current.length !== g.size && (n.current.length = g.size), o && o.current.length !== g.size && (o.current.length = g.size), c.current = g.size), s(g);
  }, [s, g, n, o, l]), Y(() => () => {
    n.current = [];
  }, [n]), Y(() => () => {
    o && (o.current = []);
  }, [o]);
  const x = ee((m) => (u.add(m), () => {
    u.delete(m);
  }));
  Y(() => {
    u.forEach((m) => m(g));
  }, [u, g]);
  const E = i.useMemo(() => ({
    register: d,
    unregister: C,
    subscribeMapChange: x,
    elementsRef: n,
    labelsRef: o,
    nextIndexRef: c
  }), [d, C, x, n, o, c]);
  return /* @__PURE__ */ H($o.Provider, {
    value: E,
    children: t
  });
}
function bc() {
  return /* @__PURE__ */ new Map();
}
function yc() {
  return /* @__PURE__ */ new Set();
}
function xc(e, t) {
  const n = e.compareDocumentPosition(t);
  return n & Node.DOCUMENT_POSITION_FOLLOWING || n & Node.DOCUMENT_POSITION_CONTAINED_BY ? -1 : n & Node.DOCUMENT_POSITION_PRECEDING || n & Node.DOCUMENT_POSITION_CONTAINS ? 1 : 0;
}
const ss = /* @__PURE__ */ i.createContext(void 0);
process.env.NODE_ENV !== "production" && (ss.displayName = "DirectionContext");
function Kn() {
  return i.useContext(ss)?.direction ?? "ltr";
}
function Ec(e, t) {
  return function(o, ...r) {
    const s = new URL(e);
    return s.searchParams.set("code", o.toString()), r.forEach((c) => s.searchParams.append("args[]", c)), `${t} error #${o}; visit ${s} for the full message.`;
  };
}
const ft = Ec("https://base-ui.com/production-error", "Base UI");
function Ut(e, t, n, o) {
  const r = at(is).current;
  return Rc(r, e, t, n, o) && cs(r, [e, t, n, o]), r.callback;
}
function Cc(e) {
  const t = at(is).current;
  return Ic(t, e) && cs(t, e), t.callback;
}
function is() {
  return {
    callback: null,
    cleanup: null,
    refs: []
  };
}
function Rc(e, t, n, o, r) {
  return e.refs[0] !== t || e.refs[1] !== n || e.refs[2] !== o || e.refs[3] !== r;
}
function Ic(e, t) {
  return e.refs.length !== t.length || e.refs.some((n, o) => n !== t[o]);
}
function cs(e, t) {
  if (e.refs = t, t.every((n) => n == null)) {
    e.callback = null;
    return;
  }
  e.callback = (n) => {
    if (e.cleanup && (e.cleanup(), e.cleanup = null), n != null) {
      const o = Array(t.length).fill(null);
      for (let r = 0; r < t.length; r += 1) {
        const s = t[r];
        if (s != null)
          switch (typeof s) {
            case "function": {
              const c = s(n);
              typeof c == "function" && (o[r] = c);
              break;
            }
            case "object": {
              s.current = n;
              break;
            }
          }
      }
      e.cleanup = () => {
        for (let r = 0; r < t.length; r += 1) {
          const s = t[r];
          if (s != null)
            switch (typeof s) {
              case "function": {
                const c = o[r];
                typeof c == "function" ? c() : s(null);
                break;
              }
              case "object": {
                s.current = null;
                break;
              }
            }
        }
      };
    }
  };
}
const wc = parseInt(i.version, 10);
function Uo(e) {
  return wc >= e;
}
function Tr(e) {
  if (!/* @__PURE__ */ i.isValidElement(e))
    return null;
  const t = e, n = t.props;
  return (Uo(19) ? n?.ref : t.ref) ?? null;
}
function No(e, t) {
  if (e && !t)
    return e;
  if (!e && t)
    return t;
  if (e || t)
    return {
      ...e,
      ...t
    };
}
function ve() {
}
const en = Object.freeze([]), nt = Object.freeze({});
function vc(e, t) {
  const n = {};
  for (const o in e) {
    const r = e[o];
    if (t?.hasOwnProperty(o)) {
      const s = t[o](r);
      s != null && Object.assign(n, s);
      continue;
    }
    r === !0 ? n[`data-${o.toLowerCase()}`] = "" : r && (n[`data-${o.toLowerCase()}`] = r.toString());
  }
  return n;
}
function Sc(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Oc(e, t) {
  return typeof e == "function" ? e(t) : e;
}
const Go = {};
function sn(e, t, n, o, r) {
  if (!n && !o && !r && !e)
    return _n(t);
  let s = _n(e);
  return t && (s = tn(s, t)), n && (s = tn(s, n)), o && (s = tn(s, o)), r && (s = tn(s, r)), s;
}
function Pc(e) {
  if (e.length === 0)
    return Go;
  if (e.length === 1)
    return _n(e[0]);
  let t = _n(e[0]);
  for (let n = 1; n < e.length; n += 1)
    t = tn(t, e[n]);
  return t;
}
function _n(e) {
  return Wo(e) ? {
    ...ls(e, Go)
  } : Nc(e);
}
function tn(e, t) {
  return Wo(t) ? ls(t, e) : Tc(e, t);
}
function Nc(e) {
  const t = {
    ...e
  };
  for (const n in t) {
    const o = t[n];
    us(n, o) && (t[n] = as(o));
  }
  return t;
}
function Tc(e, t) {
  if (!t)
    return e;
  for (const n in t) {
    const o = t[n];
    switch (n) {
      case "style": {
        e[n] = No(e.style, o);
        break;
      }
      case "className": {
        e[n] = fs(e.className, o);
        break;
      }
      default:
        us(n, o) ? e[n] = kc(e[n], o) : e[n] = o;
    }
  }
  return e;
}
function us(e, t) {
  const n = e.charCodeAt(0), o = e.charCodeAt(1), r = e.charCodeAt(2);
  return n === 111 && o === 110 && r >= 65 && r <= 90 && (typeof t == "function" || typeof t > "u");
}
function Wo(e) {
  return typeof e == "function";
}
function ls(e, t) {
  return Wo(e) ? e(t) : e ?? Go;
}
function kc(e, t) {
  return t ? e ? (...n) => {
    const o = n[0];
    if (ds(o)) {
      const s = o;
      Ln(s);
      const c = t(...n);
      return s.baseUIHandlerPrevented || e?.(...n), c;
    }
    const r = t(...n);
    return e?.(...n), r;
  } : as(t) : e;
}
function as(e) {
  return e && ((...t) => {
    const n = t[0];
    return ds(n) && Ln(n), e(...t);
  });
}
function Ln(e) {
  return e.preventBaseUIHandler = () => {
    e.baseUIHandlerPrevented = !0;
  }, e;
}
function fs(e, t) {
  return t ? e ? t + " " + e : t : e;
}
function ds(e) {
  return e != null && typeof e == "object" && "nativeEvent" in e;
}
function Ye(e, t, n = {}) {
  const o = t.render, r = Ac(t, n);
  if (n.enabled === !1)
    return null;
  const s = n.state ?? nt;
  return _c(e, o, r, s);
}
function Ac(e, t = {}) {
  const {
    className: n,
    style: o,
    render: r
  } = e, {
    state: s = nt,
    ref: c,
    props: u,
    stateAttributesMapping: y,
    enabled: l = !0
  } = t, a = l ? Sc(n, s) : void 0, b = l ? Oc(o, s) : void 0, d = l ? vc(s, y) : nt, C = l && u ? Mc(u) : void 0, g = l ? No(d, C) ?? {} : nt;
  return typeof document < "u" && (l ? Array.isArray(c) ? g.ref = Cc([g.ref, Tr(r), ...c]) : g.ref = Ut(g.ref, Tr(r), c) : Ut(null, null)), l ? (a !== void 0 && (g.className = fs(g.className, a)), b !== void 0 && (g.style = No(g.style, b)), g) : nt;
}
function Mc(e) {
  return Array.isArray(e) ? Pc(e) : sn(void 0, e);
}
const Vc = Symbol.for("react.lazy"), Dc = /^[A-Z][A-Za-z0-9$]*$/, Fc = /[a-z]/;
function _c(e, t, n, o) {
  if (t) {
    if (typeof t == "function")
      return process.env.NODE_ENV !== "production" && Lc(t), t(n, o);
    const r = sn(n, t.props);
    r.ref = n.ref;
    let s = t;
    if (s?.$$typeof === Vc && (s = i.Children.toArray(t)[0]), process.env.NODE_ENV !== "production" && !/* @__PURE__ */ i.isValidElement(s))
      throw new Error(["Base UI: The `render` prop was provided an invalid React element as `React.isValidElement(render)` is `false`.", "A valid React element must be provided to the `render` prop because it is cloned with props to replace the default element.", "https://base-ui.com/r/invalid-render-prop"].join(`
`));
    return /* @__PURE__ */ i.cloneElement(s, r);
  }
  if (e && typeof e == "string")
    return Bc(e, n);
  throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: Render element or function are not defined." : ft(8));
}
function Lc(e) {
  const t = e.name;
  t.length !== 0 && Dc.test(t) && Fc.test(t) && hc(`The \`render\` prop received a function named \`${t}\` that starts with an uppercase letter.`, "This usually means a React component was passed directly as `render={Component}`.", "Base UI calls `render` as a plain function, which can break the Rules of Hooks during reconciliation.", "If this is an intentional render callback, rename it to start with a lowercase letter.", "Use `render={<Component />}` or `render={(props) => <Component {...props} />}` instead.", "https://base-ui.com/r/invalid-render-prop");
}
function Bc(e, t) {
  return e === "button" ? /* @__PURE__ */ vr("button", {
    type: "button",
    ...t,
    key: t.key
  }) : e === "img" ? /* @__PURE__ */ vr("img", {
    alt: "",
    ...t,
    key: t.key
  }) : /* @__PURE__ */ i.createElement(e, t);
}
let kr = 0;
function Hc(e, t = "mui") {
  const [n, o] = i.useState(e), r = e || n;
  return i.useEffect(() => {
    n == null && (kr += 1, o(`${t}-${kr}`));
  }, [n, t]), r;
}
const Ar = rn.useId;
function Ko(e, t) {
  if (Ar !== void 0) {
    const n = Ar();
    return e ?? (t ? `${t}-${n}` : n);
  }
  return Hc(e, t);
}
function zo(e) {
  return Ko(e, "base-ui");
}
const yt = "none", ps = "trigger-press", $c = "trigger-hover", qo = "outside-press", Uc = "item-press", Gc = "close-press", Mr = "clear-press", Wc = "chip-remove-press", Bt = "input-change", vt = "input-clear", ms = "input-press", zn = "focus-out", hs = "escape-key", Bn = "list-navigation";
function ae(e, t, n, o) {
  let r = !1, s = !1;
  const c = nt;
  return {
    reason: e,
    event: t ?? new Event("base-ui"),
    cancel() {
      r = !0;
    },
    allowPropagation() {
      s = !0;
    },
    get isCanceled() {
      return r;
    },
    get isPropagationAllowed() {
      return s;
    },
    trigger: n,
    ...c
  };
}
function Xt(e, t, n) {
  const o = n ?? nt;
  return {
    reason: e,
    event: t ?? new Event("base-ui"),
    ...o
  };
}
const Kc = [];
function gs(e) {
  i.useEffect(e, Kc);
}
const On = null;
let Vr = globalThis.requestAnimationFrame;
class zc {
  /* This implementation uses an array as a backing data-structure for frame callbacks.
   * It allows `O(1)` callback cancelling by inserting a `null` in the array, though it
   * never calls the native `cancelAnimationFrame` if there are no frames left. This can
   * be much more efficient if there is a call pattern that alterns as
   * "request-cancel-request-cancel-…".
   * But in the case of "request-request-…-cancel-cancel-…", it leaves the final animation
   * frame to run anyway. We turn that frame into a `O(1)` no-op via `callbacksCount`. */
  callbacks = [];
  callbacksCount = 0;
  nextId = 1;
  startId = 1;
  isScheduled = !1;
  tick = (t) => {
    this.isScheduled = !1;
    const n = this.callbacks, o = this.callbacksCount;
    if (this.callbacks = [], this.callbacksCount = 0, this.startId = this.nextId, o > 0)
      for (let r = 0; r < n.length; r += 1)
        n[r]?.(t);
  };
  request(t) {
    const n = this.nextId;
    this.nextId += 1, this.callbacks.push(t), this.callbacksCount += 1;
    const o = process.env.NODE_ENV !== "production" && Vr !== requestAnimationFrame && (Vr = requestAnimationFrame, !0);
    return (!this.isScheduled || o) && (requestAnimationFrame(this.tick), this.isScheduled = !0), n;
  }
  cancel(t) {
    const n = t - this.startId;
    n < 0 || n >= this.callbacks.length || (this.callbacks[n] = null, this.callbacksCount -= 1);
  }
}
const Pn = new zc();
class Rt {
  static create() {
    return new Rt();
  }
  static request(t) {
    return Pn.request(t);
  }
  static cancel(t) {
    return Pn.cancel(t);
  }
  currentId = On;
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  request(t) {
    this.cancel(), this.currentId = Pn.request(() => {
      this.currentId = On, t();
    });
  }
  cancel = () => {
    this.currentId !== On && (Pn.cancel(this.currentId), this.currentId = On);
  };
  disposeEffect = () => this.cancel;
}
function cn() {
  const e = at(Rt.create).current;
  return gs(e.disposeEffect), e;
}
function Yo(e, t = !1, n = !1) {
  const [o, r] = i.useState(e && t ? "idle" : void 0), [s, c] = i.useState(e);
  return e && !s && (c(!0), r("starting")), !e && s && o !== "ending" && !n && r("ending"), !e && !s && o === "ending" && r(void 0), Y(() => {
    if (!e && s && o !== "ending" && n) {
      const u = Rt.request(() => {
        r("ending");
      });
      return () => {
        Rt.cancel(u);
      };
    }
  }, [e, s, o, n]), Y(() => {
    if (!e || t)
      return;
    const u = Rt.request(() => {
      r(void 0);
    });
    return () => {
      Rt.cancel(u);
    };
  }, [t, e]), Y(() => {
    if (!e || !t)
      return;
    e && s && o !== "idle" && r("starting");
    const u = Rt.request(() => {
      r("idle");
    });
    return () => {
      Rt.cancel(u);
    };
  }, [t, e, s, o]), {
    mounted: s,
    setMounted: c,
    transitionStatus: o
  };
}
let bs = /* @__PURE__ */ (function(e) {
  return e[e.None = 0] = "None", e[e.GuessFromOrder = 1] = "GuessFromOrder", e;
})({});
function ys(e = {}) {
  const {
    label: t,
    metadata: n,
    textRef: o,
    indexGuessBehavior: r,
    index: s
  } = e, {
    register: c,
    unregister: u,
    subscribeMapChange: y,
    elementsRef: l,
    labelsRef: a,
    nextIndexRef: b
  } = gc(), d = i.useRef(-1), [C, g] = i.useState(s ?? (r === bs.GuessFromOrder ? () => {
    if (d.current === -1) {
      const m = b.current;
      b.current += 1, d.current = m;
    }
    return d.current;
  } : -1)), x = i.useRef(null), E = i.useCallback((m) => {
    if (x.current = m, C !== -1 && m !== null && (l.current[C] = m, a)) {
      const I = t !== void 0;
      a.current[C] = I ? t : o?.current?.textContent ?? m.textContent;
    }
  }, [C, l, a, t, o]);
  return Y(() => {
    if (s != null)
      return;
    const m = x.current;
    if (m)
      return c(m, n), () => {
        u(m);
      };
  }, [s, c, u, n]), Y(() => {
    if (s == null)
      return y((m) => {
        const I = x.current ? m.get(x.current)?.index : null;
        I != null && g(I);
      });
  }, [s, y, g]), {
    ref: E,
    index: C
  };
}
let un = /* @__PURE__ */ (function(e) {
  return e.startingStyle = "data-starting-style", e.endingStyle = "data-ending-style", e;
})({});
const qc = {
  [un.startingStyle]: ""
}, Yc = {
  [un.endingStyle]: ""
}, jo = {
  transitionStatus(e) {
    return e === "starting" ? qc : e === "ending" ? Yc : null;
  }
}, xs = /* @__PURE__ */ i.createContext(void 0);
process.env.NODE_ENV !== "production" && (xs.displayName = "CompositeRootContext");
function jc(e = !1) {
  const t = i.useContext(xs);
  if (t === void 0 && !e)
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: CompositeRootContext is missing. Composite parts must be placed within <Composite.Root>." : ft(16));
  return t;
}
function Xc(e) {
  const {
    focusableWhenDisabled: t,
    disabled: n,
    composite: o = !1,
    tabIndex: r = 0,
    isNativeButton: s
  } = e, c = o && t !== !1, u = o && t === !1;
  return {
    props: i.useMemo(() => {
      const l = {
        // allow Tabbing away from focusableWhenDisabled elements
        onKeyDown(a) {
          n && t && a.key !== "Tab" && a.preventDefault();
        }
      };
      return o || (l.tabIndex = r, !s && n && (l.tabIndex = t ? r : -1)), (s && (t || c) || !s && n) && (l["aria-disabled"] = n), s && (!t || u) && (l.disabled = n), l;
    }, [o, n, t, c, u, s, r])
  };
}
function mn(e = {}) {
  const {
    disabled: t = !1,
    focusableWhenDisabled: n,
    tabIndex: o = 0,
    native: r = !0,
    composite: s
  } = e, c = i.useRef(null), u = jc(!0), y = s ?? u !== void 0, {
    props: l
  } = Xc({
    focusableWhenDisabled: n,
    disabled: t,
    composite: y,
    tabIndex: o,
    isNativeButton: r
  });
  process.env.NODE_ENV !== "production" && i.useEffect(() => {
    if (!c.current)
      return;
    const C = Nn(c.current);
    if (r) {
      if (!C) {
        const g = rn.captureOwnerStack?.() || "";
        Fn(`A component that acts as a button expected a native <button> because the \`nativeButton\` prop is true. Rendering a non-<button> removes native button semantics, which can impact forms and accessibility. Use a real <button> in the \`render\` prop, or set \`nativeButton\` to \`false\`.${g}`);
      }
    } else if (C) {
      const g = rn.captureOwnerStack?.() || "";
      Fn(`A component that acts as a button expected a non-<button> because the \`nativeButton\` prop is false. Rendering a <button> keeps native behavior while Base UI applies non-native attributes and handlers, which can add unintended extra attributes (such as \`role\` or \`aria-disabled\`). Use a non-<button> in the \`render\` prop, or set \`nativeButton\` to \`true\`.${g}`);
    }
  }, [r]);
  const a = i.useCallback(() => {
    const C = c.current;
    Nn(C) && y && t && l.disabled === void 0 && C.disabled && (C.disabled = !1);
  }, [t, l.disabled, y]);
  Y(a, [a]);
  const b = i.useCallback((C = {}) => {
    const {
      onClick: g,
      onMouseDown: x,
      onKeyUp: E,
      onKeyDown: m,
      onPointerDown: I,
      ...f
    } = C;
    return sn({
      onClick(h) {
        if (t) {
          h.preventDefault();
          return;
        }
        g?.(h);
      },
      onMouseDown(h) {
        t || x?.(h);
      },
      onKeyDown(h) {
        if (t || (Ln(h), m?.(h), h.baseUIHandlerPrevented))
          return;
        const w = h.target === h.currentTarget, D = h.currentTarget, M = Nn(D), N = !r && Qc(D), P = w && (r ? M : !N), V = h.key === "Enter", B = h.key === " ", T = D.getAttribute("role"), v = T?.startsWith("menuitem") || T === "option" || T === "gridcell";
        if (w && y && B) {
          if (h.defaultPrevented && v)
            return;
          h.preventDefault(), N || r && M ? (D.click(), h.preventBaseUIHandler()) : P && (g?.(h), h.preventBaseUIHandler());
          return;
        }
        P && (!r && (B || V) && h.preventDefault(), !r && V && g?.(h));
      },
      onKeyUp(h) {
        if (!t) {
          if (Ln(h), E?.(h), h.target === h.currentTarget && r && y && Nn(h.currentTarget) && h.key === " ") {
            h.preventDefault();
            return;
          }
          h.baseUIHandlerPrevented || h.target === h.currentTarget && !r && !y && h.key === " " && g?.(h);
        }
      },
      onPointerDown(h) {
        if (t) {
          h.preventDefault();
          return;
        }
        I?.(h);
      }
    }, r ? {
      type: "button"
    } : {
      role: "button"
    }, l, f);
  }, [t, l, y, r]), d = ee((C) => {
    c.current = C, a();
  });
  return {
    getButtonProps: b,
    buttonRef: d
  };
}
function Nn(e) {
  return Je(e) && e.tagName === "BUTTON";
}
function Qc(e) {
  return !!(e?.tagName === "A" && e?.href);
}
function Pe(e, t, n, o) {
  return e.addEventListener(t, n, o), () => {
    e.removeEventListener(t, n, o);
  };
}
function tt(e) {
  const t = at(Jc, e).current;
  return t.next = e, Y(t.effect), t;
}
function Jc(e) {
  const t = {
    current: e,
    next: e,
    effect: () => {
      t.current = t.next;
    }
  };
  return t;
}
function Te(e) {
  return e?.ownerDocument || document;
}
function wt(e) {
  return e == null ? e : "current" in e ? e.current : e;
}
function Zc(e, t = !1, n = !0) {
  const o = cn();
  return ee((r, s = null) => {
    o.cancel();
    const c = wt(e);
    if (c == null)
      return;
    const u = c, y = () => {
      pn.flushSync(r);
    };
    if (typeof u.getAnimations != "function" || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
      r();
      return;
    }
    function l() {
      Promise.all(u.getAnimations().map((a) => a.finished)).then(() => {
        s?.aborted || y();
      }).catch(() => {
        if (n) {
          s?.aborted || y();
          return;
        }
        const a = u.getAnimations();
        !s?.aborted && a.length > 0 && a.some((b) => b.pending || b.playState !== "finished") && l();
      });
    }
    if (t) {
      const a = un.startingStyle;
      if (!u.hasAttribute(a)) {
        o.request(l);
        return;
      }
      const b = new MutationObserver(() => {
        u.hasAttribute(a) || (b.disconnect(), l());
      });
      b.observe(u, {
        attributes: !0,
        attributeFilter: [a]
      }), s?.addEventListener("abort", () => b.disconnect(), {
        once: !0
      });
      return;
    }
    o.request(l);
  });
}
function qn(e) {
  const {
    enabled: t = !0,
    open: n,
    ref: o,
    onComplete: r
  } = e, s = ee(r), c = Zc(o, n, !1);
  i.useEffect(() => {
    if (!t)
      return;
    const u = new AbortController();
    return c(s, u.signal), () => {
      u.abort();
    };
  }, [t, n, s, c]);
}
function eu(e) {
  const t = i.useRef(!0);
  t.current && (t.current = !1, e());
}
function tu() {
  if (typeof navigator > "u")
    return {
      userAgent: "",
      platform: "",
      maxTouchPoints: 0
    };
  if (process.env.NODE_ENV !== "production") {
    const e = navigator.userAgentData;
    if (e && Array.isArray(e.brands))
      return {
        userAgent: e.brands.map(({
          brand: t,
          version: n
        }) => `${t}/${n}`).join(" "),
        platform: e.platform ?? navigator.platform ?? "",
        maxTouchPoints: navigator.maxTouchPoints ?? 0
      };
  }
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform ?? "",
    maxTouchPoints: navigator.maxTouchPoints ?? 0
  };
}
const {
  userAgent: nu,
  platform: ou,
  maxTouchPoints: ru
} = tu(), Yn = nu.toLowerCase(), ln = ou.toLowerCase(), hn = /^i(os$|p)/.test(ln) || ln === "macintel" && ru > 1, Dr = "android", Hn = ln === Dr || Yn.includes(Dr), su = !hn && ln.startsWith("mac");
ln.startsWith("win");
const iu = su || hn, Wt = typeof CSS < "u" && !!CSS.supports?.("-webkit-backdrop-filter:none"), Fr = !Wt && Yn.includes("firefox");
!Wt && Yn.includes("chrom");
const cu = iu, Es = /jsdom|happydom/.test(Yn), Qt = 0;
class Ft {
  static create() {
    return new Ft();
  }
  currentId = Qt;
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(t, n) {
    this.clear(), this.currentId = setTimeout(() => {
      this.currentId = Qt, n();
    }, t);
  }
  isStarted() {
    return this.currentId !== Qt;
  }
  clear = () => {
    this.currentId !== Qt && (clearTimeout(this.currentId), this.currentId = Qt);
  };
  disposeEffect = () => this.clear;
}
function Pt() {
  const e = at(Ft.create).current;
  return gs(e.disposeEffect), e;
}
let _r = {}, Lr = {}, Br = "";
function uu(e) {
  if (typeof document > "u")
    return !1;
  const t = Te(e);
  return Gt(t).innerWidth - t.documentElement.clientWidth > 0;
}
function lu(e) {
  if (!(typeof CSS < "u" && CSS.supports && CSS.supports("scrollbar-gutter", "stable")) || typeof document > "u")
    return !1;
  const n = Te(e), o = n.documentElement, r = n.body, s = Lo(o) ? o : r, c = s.style.overflowY, u = o.style.scrollbarGutter;
  o.style.scrollbarGutter = "stable", s.style.overflowY = "scroll";
  const y = s.offsetWidth;
  s.style.overflowY = "hidden";
  const l = s.offsetWidth;
  return s.style.overflowY = c, o.style.scrollbarGutter = u, y === l;
}
function au(e) {
  const t = Te(e), n = t.documentElement, o = t.body, r = Lo(n) ? n : o, s = {
    overflowY: r.style.overflowY,
    overflowX: r.style.overflowX
  };
  return Object.assign(r.style, {
    overflowY: "hidden",
    overflowX: "hidden"
  }), () => {
    Object.assign(r.style, s);
  };
}
function fu(e) {
  const t = Te(e), n = t.documentElement, o = t.body, r = Gt(n);
  let s = 0, c = 0, u = !1;
  const y = Rt.create();
  if (Wt && (r.visualViewport?.scale ?? 1) !== 1)
    return () => {
    };
  function l() {
    const C = r.getComputedStyle(n), g = r.getComputedStyle(o), m = (C.scrollbarGutter || "").includes("both-edges") ? "stable both-edges" : "stable";
    s = n.scrollTop, c = n.scrollLeft, _r = {
      scrollbarGutter: n.style.scrollbarGutter,
      overflowY: n.style.overflowY,
      overflowX: n.style.overflowX
    }, Br = n.style.scrollBehavior, Lr = {
      position: o.style.position,
      height: o.style.height,
      width: o.style.width,
      boxSizing: o.style.boxSizing,
      overflowY: o.style.overflowY,
      overflowX: o.style.overflowX,
      scrollBehavior: o.style.scrollBehavior
    };
    const I = n.scrollHeight > n.clientHeight, f = n.scrollWidth > n.clientWidth, h = C.overflowY === "scroll" || g.overflowY === "scroll", w = C.overflowX === "scroll" || g.overflowX === "scroll", D = Math.max(0, r.innerWidth - o.clientWidth), M = Math.max(0, r.innerHeight - o.clientHeight), N = parseFloat(g.marginTop) + parseFloat(g.marginBottom), P = parseFloat(g.marginLeft) + parseFloat(g.marginRight), V = Lo(n) ? n : o;
    if (u = lu(e), u) {
      n.style.scrollbarGutter = m, V.style.overflowY = "hidden", V.style.overflowX = "hidden";
      return;
    }
    Object.assign(n.style, {
      scrollbarGutter: m,
      overflowY: "hidden",
      overflowX: "hidden"
    }), (I || h) && (n.style.overflowY = "scroll"), (f || w) && (n.style.overflowX = "scroll"), Object.assign(o.style, {
      position: "relative",
      height: N || M ? `calc(100dvh - ${N + M}px)` : "100dvh",
      width: P || D ? `calc(100vw - ${P + D}px)` : "100vw",
      boxSizing: "border-box",
      overflow: "hidden",
      scrollBehavior: "unset"
    }), o.scrollTop = s, o.scrollLeft = c, n.setAttribute("data-base-ui-scroll-locked", ""), n.style.scrollBehavior = "unset";
  }
  function a() {
    Object.assign(n.style, _r), Object.assign(o.style, Lr), u || (n.scrollTop = s, n.scrollLeft = c, n.removeAttribute("data-base-ui-scroll-locked"), n.style.scrollBehavior = Br);
  }
  function b() {
    a(), y.request(l);
  }
  l();
  const d = Pe(r, "resize", b);
  return () => {
    y.cancel(), a(), typeof r.removeEventListener == "function" && d();
  };
}
class du {
  lockCount = 0;
  restore = null;
  timeoutLock = Ft.create();
  timeoutUnlock = Ft.create();
  acquire(t) {
    return this.lockCount += 1, this.lockCount === 1 && this.restore === null && this.timeoutLock.start(0, () => this.lock(t)), this.release;
  }
  release = () => {
    this.lockCount -= 1, this.lockCount === 0 && this.restore && this.timeoutUnlock.start(0, this.unlock);
  };
  unlock = () => {
    this.lockCount === 0 && this.restore && (this.restore?.(), this.restore = null);
  };
  lock(t) {
    if (this.lockCount === 0 || this.restore !== null)
      return;
    const o = Te(t).documentElement, r = Gt(o).getComputedStyle(o).overflowY;
    if (r === "hidden" || r === "clip") {
      this.restore = ve;
      return;
    }
    const s = hn || !uu(t);
    this.restore = s ? au(t) : fu(t);
  }
}
const pu = new du();
function mu(e = !0, t = null) {
  Y(() => {
    if (e)
      return pu.acquire(t);
  }, [e, t]);
}
function Fe(e) {
  e.preventDefault(), e.stopPropagation();
}
function hu(e) {
  return "nativeEvent" in e;
}
function Cs(e) {
  return e.pointerType === "" && e.isTrusted ? !0 : Hn && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function Rs(e) {
  return Es ? !1 : !Hn && e.width === 0 && e.height === 0 || Hn && e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "touch";
}
function Hr(e, t) {
  return ["mouse", "pen"].includes(e);
}
function gu(e) {
  const t = e.type;
  return t === "click" || t === "mousedown" || t === "keydown" || t === "keyup";
}
const To = "data-base-ui-focusable", Is = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])", Vt = "ArrowLeft", Dt = "ArrowRight", Xo = "ArrowUp", jn = "ArrowDown";
function ut(e) {
  let t = e.activeElement;
  for (; t?.shadowRoot?.activeElement != null; )
    t = t.shadowRoot.activeElement;
  return t;
}
function ue(e, t) {
  if (!e || !t)
    return !1;
  const n = t.getRootNode?.();
  if (e.contains(t))
    return !0;
  if (n && Wn(n)) {
    let o = t;
    for (; o; ) {
      if (e === o)
        return !0;
      o = o.parentNode || o.host;
    }
  }
  return !1;
}
function ot(e) {
  return "composedPath" in e ? e.composedPath()[0] : e.target;
}
function Co(e, t) {
  if (t == null)
    return !1;
  if ("composedPath" in e)
    return e.composedPath().includes(t);
  const n = e;
  return n.target != null && t.contains(n.target);
}
function bu(e) {
  return e.matches("html,body");
}
function Qo(e) {
  return Je(e) && e.matches(Is);
}
function yu(e) {
  return e?.closest(`button,a[href],[role="button"],select,[tabindex]:not([tabindex="-1"]),${Is}`) != null;
}
function ko(e) {
  return e ? e.getAttribute("role") === "combobox" && Qo(e) : !1;
}
function Ao(e) {
  return e ? e.hasAttribute(To) ? e : e.querySelector(`[${To}]`) || e : null;
}
function $t(...e) {
  return () => {
    for (let t = 0; t < e.length; t += 1) {
      const n = e[t];
      n && n();
    }
  };
}
const ws = {
  clipPath: "inset(50%)",
  overflow: "hidden",
  whiteSpace: "nowrap",
  border: 0,
  padding: 0,
  width: 1,
  height: 1,
  margin: -1
}, vs = {
  ...ws,
  position: "fixed",
  top: 0,
  left: 0
}, Ss = {
  ...ws,
  position: "absolute"
}, an = /* @__PURE__ */ i.forwardRef(function(t, n) {
  const [o, r] = i.useState();
  return Y(() => {
    cu && Wt && r("button");
  }, []), /* @__PURE__ */ H("span", {
    ...t,
    ref: n,
    style: vs,
    "aria-hidden": o ? void 0 : !0,
    ...{
      tabIndex: 0,
      // Role is only for VoiceOver
      role: o
    },
    "data-base-ui-focus-guard": ""
  });
});
process.env.NODE_ENV !== "production" && (an.displayName = "FocusGuard");
function Tn(e, t, n) {
  return Math.floor(e / t) !== n;
}
function fn(e, t) {
  return t < 0 || t >= e.length;
}
function Ro(e, t) {
  return Xe(e.current, {
    disabledIndices: t
  });
}
function $r(e, t) {
  return Xe(e.current, {
    decrement: !0,
    startingIndex: e.current.length,
    disabledIndices: t
  });
}
function Xe(e, {
  startingIndex: t = -1,
  decrement: n = !1,
  disabledIndices: o,
  amount: r = 1
} = {}) {
  let s = t;
  do
    s += n ? -r : r;
  while (s >= 0 && s <= e.length - 1 && $n(e, s, o));
  return s;
}
function xu(e, {
  event: t,
  orientation: n,
  loopFocus: o,
  onLoop: r,
  rtl: s,
  cols: c,
  disabledIndices: u,
  minIndex: y,
  maxIndex: l,
  prevIndex: a,
  stopEvent: b = !1
}) {
  let d = a, C;
  if (t.key === Xo ? C = "up" : t.key === jn && (C = "down"), C) {
    const g = [], x = [];
    let E = !1, m = 0;
    {
      let P = null, V = -1;
      e.forEach((B, T) => {
        if (B == null)
          return;
        m += 1;
        const v = B.closest('[role="row"]');
        v && (E = !0), (v !== P || V === -1) && (P = v, V += 1, g[V] = []), g[V].push(T), x[T] = V;
      });
    }
    let I = !1, f = 0;
    if (E)
      for (const P of g) {
        const V = P.length;
        V > f && (f = V), V !== c && (I = !0);
      }
    const h = I && m < e.length, w = f || c, D = (P) => {
      if (!I || a === -1)
        return;
      const V = x[a];
      if (V == null)
        return;
      const B = g[V].indexOf(a), T = P === "up" ? -1 : 1;
      for (let v = V + T, k = 0; k < g.length; k += 1, v += T) {
        if (v < 0 || v >= g.length) {
          if (!o || h)
            return;
          if (v = v < 0 ? g.length - 1 : 0, r) {
            const te = Math.min(B, g[v].length - 1), G = g[v][te] ?? g[v][0], _ = r(t, a, G);
            v = x[_] ?? v;
          }
        }
        const X = g[v];
        for (let te = Math.min(B, X.length - 1); te >= 0; te -= 1) {
          const G = X[te];
          if (!$n(e, G, u))
            return G;
        }
      }
    }, M = (P) => {
      if (!h || a === -1)
        return;
      const V = a % w, B = P === "up" ? -w : w, T = l - l % w, v = bo(l / w) + 1;
      for (let k = a - V + B, X = 0; X < v; X += 1, k += B) {
        if (k < 0 || k > l) {
          if (!o)
            return;
          k = k < 0 ? T : 0;
        }
        const te = Math.min(k + w - 1, l);
        for (let G = Math.min(k + V, te); G >= k; G -= 1)
          if (!$n(e, G, u))
            return G;
      }
    };
    b && Fe(t);
    const N = D(C) ?? M(C);
    if (N !== void 0)
      d = N;
    else if (a === -1)
      d = C === "up" ? l : y;
    else if (d = Xe(e, {
      startingIndex: a,
      amount: w,
      decrement: C === "up",
      disabledIndices: u
    }), o) {
      if (C === "up" && (a - w < y || d < 0)) {
        const P = a % w, V = l % w, B = l - (V - P);
        V === P ? d = l : d = V > P ? B : B - w, r && (d = r(t, a, d));
      }
      C === "down" && a + w > l && (d = Xe(e, {
        startingIndex: a % w - w,
        amount: w,
        disabledIndices: u
      }), r && (d = r(t, a, d)));
    }
    fn(e, d) && (d = a);
  }
  if (n === "both") {
    const g = bo(a / c);
    t.key === (s ? Vt : Dt) && (b && Fe(t), a % c !== c - 1 ? (d = Xe(e, {
      startingIndex: a,
      disabledIndices: u
    }), o && Tn(d, c, g) && (d = Xe(e, {
      startingIndex: a - a % c - 1,
      disabledIndices: u
    }), r && (d = r(t, a, d)))) : o && (d = Xe(e, {
      startingIndex: a - a % c - 1,
      disabledIndices: u
    }), r && (d = r(t, a, d))), Tn(d, c, g) && (d = a)), t.key === (s ? Dt : Vt) && (b && Fe(t), a % c !== 0 ? (d = Xe(e, {
      startingIndex: a,
      decrement: !0,
      disabledIndices: u
    }), o && Tn(d, c, g) && (d = Xe(e, {
      startingIndex: a + (c - a % c),
      decrement: !0,
      disabledIndices: u
    }), r && (d = r(t, a, d)))) : o && (d = Xe(e, {
      startingIndex: a + (c - a % c),
      decrement: !0,
      disabledIndices: u
    }), r && (d = r(t, a, d))), Tn(d, c, g) && (d = a));
    const x = bo(l / c) === g;
    fn(e, d) && (o && x ? (d = t.key === (s ? Dt : Vt) ? l : Xe(e, {
      startingIndex: a - a % c - 1,
      disabledIndices: u
    }), r && (d = r(t, a, d))) : d = a);
  }
  return d;
}
function $n(e, t, n) {
  if (typeof n == "function" ? n(t) : n?.includes(t) ?? !1)
    return !0;
  const r = e[t];
  return r ? Xn(r) ? !n && (r.hasAttribute("disabled") || r.getAttribute("aria-disabled") === "true") : !0 : !1;
}
function Eu(e) {
  return e.visibility === "hidden" || e.visibility === "collapse";
}
function Xn(e, t = e ? Bo(e) : null) {
  return !e || !e.isConnected || !t || Eu(t) ? !1 : typeof e.checkVisibility == "function" ? e.checkVisibility() : t.display !== "none" && t.display !== "contents";
}
const Cu = 'a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable="false"]),audio[controls],video[controls]';
function Ru(e) {
  const t = e.assignedSlot;
  if (t)
    return t;
  if (e.parentElement)
    return e.parentElement;
  const n = e.getRootNode();
  return Wn(n) ? n.host : null;
}
function Mo(e) {
  for (const t of Array.from(e.children))
    if (xt(t) === "summary")
      return t;
  return null;
}
function Iu(e, t) {
  const n = Mo(t);
  return !!n && (e === n || ue(n, e));
}
function Os(e) {
  const t = e ? xt(e) : "";
  return e != null && e.matches(Cu) && (t !== "summary" || e.parentElement != null && xt(e.parentElement) === "details" && Mo(e.parentElement) === e) && (t !== "details" || Mo(e) == null) && (t !== "input" || e.type !== "hidden");
}
function Ps(e) {
  if (!Os(e) || !e.isConnected || e.matches(":disabled"))
    return !1;
  for (let t = e; t; t = Ru(t)) {
    const n = t !== e, o = xt(t) === "slot";
    if (t.hasAttribute("inert") || n && xt(t) === "details" && !t.open && !Iu(e, t) || t.hasAttribute("hidden") || !o && !wu(t, n))
      return !1;
  }
  return !0;
}
function wu(e, t) {
  const n = Bo(e);
  return t ? n.display !== "none" : Xn(e, n);
}
function Ns(e) {
  const t = e.tabIndex;
  if (t < 0) {
    const n = xt(e);
    if (n === "details" || n === "audio" || n === "video" || Je(e) && e.isContentEditable)
      return 0;
  }
  return t;
}
function Io(e) {
  if (xt(e) !== "input")
    return null;
  const t = e;
  return t.type === "radio" && t.name !== "" ? t : null;
}
function vu(e, t) {
  const n = Io(e);
  if (!n)
    return !0;
  const o = t.find((r) => {
    const s = Io(r);
    return s?.name === n.name && s.form === n.form && s.checked;
  });
  return o ? o === n : t.find((r) => {
    const s = Io(r);
    return s?.name === n.name && s.form === n.form;
  }) === n;
}
function Ts(e) {
  if (Je(e) && xt(e) === "slot") {
    const t = e.assignedElements({
      flatten: !0
    });
    if (t.length > 0)
      return t;
  }
  return Je(e) && e.shadowRoot ? Array.from(e.shadowRoot.children) : Array.from(e.children);
}
function ks(e, t) {
  Ts(e).forEach((n) => {
    Os(n) && t.push(n), ks(n, t);
  });
}
function As(e, t, n) {
  Ts(e).forEach((o) => {
    Je(o) && o.matches(t) && n.push(o), As(o, t, n);
  });
}
function Jo(e) {
  return Ps(e) && Ns(e) >= 0;
}
function Ms(e) {
  const t = [];
  return ks(e, t), t.filter(Ps);
}
function Qn(e) {
  const t = Ms(e);
  return t.filter((n) => Ns(n) >= 0 && vu(n, t));
}
function Vs(e, t) {
  const n = Qn(e), o = n.length;
  if (o === 0)
    return;
  const r = ut(Te(e)), s = n.indexOf(r), c = s === -1 ? t === 1 ? 0 : o - 1 : s + t;
  return n[c];
}
function Ds(e) {
  return Vs(Te(e).body, 1) || e;
}
function Fs(e) {
  return Vs(Te(e).body, -1) || e;
}
function on(e, t) {
  const n = t || e.currentTarget, o = e.relatedTarget;
  return !o || !ue(n, o);
}
function Su(e) {
  Qn(e).forEach((n) => {
    n.dataset.tabindex = n.getAttribute("tabindex") || "", n.setAttribute("tabindex", "-1");
  });
}
function Ur(e) {
  const t = [];
  As(e, "[data-tabindex]", t), t.forEach((n) => {
    const o = n.dataset.tabindex;
    delete n.dataset.tabindex, o ? n.setAttribute("tabindex", o) : n.removeAttribute("tabindex");
  });
}
function dn(e, t, n = !0) {
  return e.filter((r) => r.parentId === t).flatMap((r) => [...!n || r.context?.open ? [r] : [], ...dn(e, r.id, n)]);
}
function Gr(e, t) {
  let n = [], o = e.find((r) => r.id === t)?.parentId;
  for (; o; ) {
    const r = e.find((s) => s.id === o);
    o = r?.parentId, r && (n = n.concat(r));
  }
  return n;
}
function Un(e) {
  return `data-base-ui-${e}`;
}
let kn = 0;
function Dn(e, t = {}) {
  const {
    preventScroll: n = !1,
    sync: o = !1,
    shouldFocus: r
  } = t;
  cancelAnimationFrame(kn);
  function s() {
    r && !r() || e?.focus({
      preventScroll: n
    });
  }
  if (o)
    return s(), ve;
  const c = requestAnimationFrame(s);
  return kn = c, () => {
    kn === c && (cancelAnimationFrame(c), kn = 0);
  };
}
const wo = {
  inert: /* @__PURE__ */ new WeakMap(),
  "aria-hidden": /* @__PURE__ */ new WeakMap()
}, Wr = "data-base-ui-inert", Vo = {
  inert: /* @__PURE__ */ new WeakSet(),
  "aria-hidden": /* @__PURE__ */ new WeakSet()
};
let Jt = /* @__PURE__ */ new WeakMap(), vo = 0;
function Ou(e) {
  return Vo[e];
}
function _s(e) {
  return e ? Wn(e) ? e.host : _s(e.parentNode) : null;
}
const Kr = (e, t) => t.map((n) => {
  if (e.contains(n))
    return n;
  const o = _s(n);
  return e.contains(o) ? o : null;
}).filter((n) => n != null), zr = (e) => {
  const t = /* @__PURE__ */ new Set();
  return e.forEach((n) => {
    let o = n;
    for (; o && !t.has(o); )
      t.add(o), o = o.parentNode;
  }), t;
}, qr = (e, t, n) => {
  const o = [], r = (s) => {
    !s || n.has(s) || Array.from(s.children).forEach((c) => {
      xt(c) !== "script" && (t.has(c) ? r(c) : o.push(c));
    });
  };
  return r(e), o;
};
function Pu(e, t, n, o, {
  mark: r = !0
}) {
  let s = null;
  o ? s = "inert" : n && (s = "aria-hidden");
  let c = null, u = null;
  const y = Kr(t, e), l = r ? qr(t, zr(y), new Set(y)) : [], a = [], b = [];
  if (s) {
    const d = wo[s], C = Ou(s);
    u = C, c = d;
    const g = Kr(t, Array.from(t.querySelectorAll("[aria-live]"))), x = y.concat(g);
    qr(t, zr(x), new Set(x)).forEach((m) => {
      const I = m.getAttribute(s), f = I !== null && I !== "false", h = (d.get(m) || 0) + 1;
      d.set(m, h), a.push(m), h === 1 && f && C.add(m), f || m.setAttribute(s, s === "inert" ? "" : "true");
    });
  }
  return r && l.forEach((d) => {
    const C = (Jt.get(d) || 0) + 1;
    Jt.set(d, C), b.push(d), C === 1 && d.setAttribute(Wr, "");
  }), vo += 1, () => {
    c && a.forEach((d) => {
      const g = (c.get(d) || 0) - 1;
      c.set(d, g), g || (!u?.has(d) && s && d.removeAttribute(s), u?.delete(d));
    }), r && b.forEach((d) => {
      const C = (Jt.get(d) || 0) - 1;
      Jt.set(d, C), C || d.removeAttribute(Wr);
    }), vo -= 1, vo || (wo.inert = /* @__PURE__ */ new WeakMap(), wo["aria-hidden"] = /* @__PURE__ */ new WeakMap(), Vo.inert = /* @__PURE__ */ new WeakSet(), Vo["aria-hidden"] = /* @__PURE__ */ new WeakSet(), Jt = /* @__PURE__ */ new WeakMap());
  };
}
function Yr(e, t = {}) {
  const {
    ariaHidden: n = !1,
    inert: o = !1,
    mark: r = !0
  } = t, s = Te(e[0]).body;
  return Pu(e, s, n, o, {
    mark: r
  });
}
const Nu = {
  style: {
    transition: "none"
  }
}, Tu = "data-base-ui-click-trigger", ku = {
  fallbackAxisSide: "none"
}, Au = {
  clipPath: "inset(50%)",
  position: "fixed",
  top: 0,
  left: 0
}, Zo = /* @__PURE__ */ i.createContext(null);
process.env.NODE_ENV !== "production" && (Zo.displayName = "PortalContext");
const Ls = () => i.useContext(Zo), Mu = Un("portal");
function Vu(e = {}) {
  const {
    ref: t,
    container: n,
    componentProps: o = nt,
    elementProps: r
  } = e, s = Ko(), u = Ls()?.portalNode, [y, l] = i.useState(null), [a, b] = i.useState(null), d = ee((E) => {
    E !== null && b(E);
  }), C = i.useRef(null);
  Y(() => {
    if (n === null) {
      C.current && (C.current = null, b(null), l(null));
      return;
    }
    if (s == null)
      return;
    const E = (n && (ji(n) ? n : n.current)) ?? u ?? document.body;
    if (E == null) {
      C.current && (C.current = null, b(null), l(null));
      return;
    }
    C.current !== E && (C.current = E, b(null), l(E));
  }, [n, u, s]);
  const g = Ye("div", o, {
    ref: [t, d],
    props: [{
      id: s,
      [Mu]: ""
    }, r]
  });
  return {
    portalNode: a,
    portalSubtree: y && g ? /* @__PURE__ */ pn.createPortal(g, y) : null
  };
}
const Bs = /* @__PURE__ */ i.forwardRef(function(t, n) {
  const {
    render: o,
    className: r,
    style: s,
    children: c,
    container: u,
    renderGuards: y,
    ...l
  } = t, {
    portalNode: a,
    portalSubtree: b
  } = Vu({
    container: u,
    ref: n,
    componentProps: t,
    elementProps: l
  }), d = i.useRef(null), C = i.useRef(null), g = i.useRef(null), x = i.useRef(null), [E, m] = i.useState(null), I = i.useRef(!1), f = E?.modal, h = E?.open, w = typeof y == "boolean" ? y : !!E && !E.modal && E.open && !!a;
  i.useEffect(() => {
    if (!a || f)
      return;
    function M(N) {
      a && N.relatedTarget && on(N) && (N.type === "focusin" ? I.current && (Ur(a), I.current = !1) : (Su(a), I.current = !0));
    }
    return $t(Pe(a, "focusin", M, !0), Pe(a, "focusout", M, !0));
  }, [a, f]), Y(() => {
    !a || h !== !0 || !I.current || (Ur(a), I.current = !1);
  }, [h, a]);
  const D = i.useMemo(() => ({
    beforeOutsideRef: d,
    afterOutsideRef: C,
    beforeInsideRef: g,
    afterInsideRef: x,
    portalNode: a,
    setFocusManagerState: m
  }), [a]);
  return /* @__PURE__ */ lt(i.Fragment, {
    children: [b, /* @__PURE__ */ lt(Zo.Provider, {
      value: D,
      children: [w && a && /* @__PURE__ */ H(an, {
        "data-type": "outside",
        ref: d,
        onFocus: (M) => {
          if (on(M, a))
            g.current?.focus();
          else {
            const N = E ? E.domReference : null;
            Fs(N)?.focus();
          }
        }
      }), w && a && /* @__PURE__ */ H("span", {
        "aria-owns": a.id,
        style: Au
      }), a && /* @__PURE__ */ pn.createPortal(c, a), w && a && /* @__PURE__ */ H(an, {
        "data-type": "outside",
        ref: C,
        onFocus: (M) => {
          if (on(M, a))
            x.current?.focus();
          else {
            const N = E ? E.domReference : null;
            Ds(N)?.focus(), E?.closeOnFocusOut && E?.onOpenChange(!1, ae(zn, M.nativeEvent));
          }
        }
      })]
    })]
  });
});
process.env.NODE_ENV !== "production" && (Bs.displayName = "FloatingPortal");
function Du() {
  const e = /* @__PURE__ */ new Map();
  return {
    emit(t, n) {
      e.get(t)?.forEach((o) => o(n));
    },
    on(t, n) {
      e.has(t) || e.set(t, /* @__PURE__ */ new Set()), e.get(t).add(n);
    },
    off(t, n) {
      e.get(t)?.delete(n);
    }
  };
}
const Hs = /* @__PURE__ */ i.createContext(null);
process.env.NODE_ENV !== "production" && (Hs.displayName = "FloatingNodeContext");
const $s = /* @__PURE__ */ i.createContext(null);
process.env.NODE_ENV !== "production" && ($s.displayName = "FloatingTreeContext");
const Us = () => i.useContext(Hs)?.id || null, Jn = (e) => {
  const t = i.useContext($s);
  return e ?? t;
};
function Fu(e, t) {
  const n = Gt(ot(e));
  return e instanceof n.KeyboardEvent ? "keyboard" : e instanceof n.FocusEvent ? t || "keyboard" : "pointerType" in e ? e.pointerType || "keyboard" : "touches" in e ? "touch" : e instanceof n.MouseEvent ? t || (e.detail === 0 ? "keyboard" : "mouse") : "";
}
const jr = 20;
let Ot = [];
function er() {
  Ot = Ot.filter((e) => e.deref()?.isConnected);
}
function Xr(e) {
  er(), e && xt(e) !== "body" && (Ot.push(new WeakRef(e)), Ot.length > jr && (Ot = Ot.slice(-jr)));
}
function Qr() {
  return er(), Ot[Ot.length - 1]?.deref();
}
function _u(e) {
  return e ? Jo(e) ? e : Qn(e)[0] || e : null;
}
function Jr(e) {
  if (e.hasAttribute("tabindex") && !e.hasAttribute("data-tabindex") || !e.getAttribute("role")?.includes("dialog"))
    return;
  const n = Ms(e).filter((r) => {
    const s = r.getAttribute("data-tabindex") || "";
    return Jo(r) || r.hasAttribute("data-tabindex") && !s.startsWith("-");
  }), o = e.getAttribute("tabindex");
  n.length === 0 ? o !== "0" && (e.setAttribute("tabindex", "0"), e.setAttribute("data-tabindex", "0")) : (o !== "-1" || e.hasAttribute("data-tabindex") && e.getAttribute("data-tabindex") !== "-1") && (e.setAttribute("tabindex", "-1"), e.setAttribute("data-tabindex", "-1"));
}
function Lu(e) {
  const {
    context: t,
    children: n,
    disabled: o = !1,
    initialFocus: r = !0,
    returnFocus: s = !0,
    restoreFocus: c = !1,
    modal: u = !0,
    closeOnFocusOut: y = !0,
    openInteractionType: l = "",
    nextFocusableElement: a,
    previousFocusableElement: b,
    beforeContentFocusGuardRef: d,
    externalTree: C,
    getInsideElements: g
  } = e, x = "rootStore" in t ? t.rootStore : t, E = x.useState("open"), m = x.useState("domReferenceElement"), I = x.useState("floatingElement"), {
    events: f,
    dataRef: h
  } = x.context, w = ee(() => h.current.floatingContext?.nodeId), D = r === !1, M = ko(m) && D, N = tt(r), P = tt(s), V = tt(l), B = tt(E), T = Jn(C), v = Ls(), k = i.useRef(!1), X = i.useRef(!1), te = i.useRef(!1), G = i.useRef(null), _ = i.useRef(""), me = i.useRef(""), J = i.useRef(null), ie = i.useRef(null), K = Ut(J, d, v?.beforeInsideRef), Re = Ut(ie, v?.afterInsideRef), Q = Pt(), fe = Pt(), we = cn(), Be = v != null, j = Ao(I), Se = ee((W = j) => W ? Qn(W) : []), ke = ee(() => g?.().filter((W) => W != null) ?? []);
  i.useEffect(() => {
    if (o || !u)
      return;
    function W(de) {
      de.key === "Tab" && ue(j, ut(Te(j))) && Se().length === 0 && !M && Fe(de);
    }
    const he = Te(j);
    return Pe(he, "keydown", W);
  }, [o, j, u, M, Se]), i.useEffect(() => {
    if (o || !E)
      return;
    const W = Te(j);
    function he() {
      te.current = !1;
    }
    function de(Ee) {
      const $ = ot(Ee), re = ke(), U = ue(I, $) || ue(m, $) || ue(v?.portalNode, $) || re.some((ge) => ge === $ || ue(ge, $));
      te.current = !U, me.current = Ee.pointerType || "keyboard", $?.closest(`[${Tu}]`) && (X.current = !0, fe.start(0, () => {
        X.current = !1;
      }));
    }
    function ye() {
      me.current = "keyboard";
    }
    return $t(
      Pe(W, "pointerdown", de, !0),
      Pe(W, "pointerup", he, !0),
      Pe(W, "pointercancel", he, !0),
      Pe(W, "keydown", ye, !0),
      // Avoid a stale `true` leaking into the next open (e.g. keep-mounted popups)
      // if the popup dismissed between pointerdown and pointerup.
      he
    );
  }, [o, I, m, j, E, v, fe, ke]), i.useEffect(() => {
    if (o || !y)
      return;
    const W = Te(j);
    function he() {
      X.current = !0, fe.start(0, () => {
        X.current = !1;
      });
    }
    function de(re) {
      const U = ot(re);
      Jo(U) && (G.current = U);
    }
    function ye(re) {
      const U = re.relatedTarget, ge = re.currentTarget, se = ot(re);
      u && U == null && se != null && ue(I, se) && Xr(se), queueMicrotask(() => {
        const Z = w(), Ce = x.context.triggerElements, R = ke(), p = U?.hasAttribute(Un("focus-guard")) && [J.current, ie.current, v?.beforeInsideRef.current, v?.afterInsideRef.current, v?.beforeOutsideRef.current, v?.afterOutsideRef.current, wt(b), wt(a)].includes(U), L = !(ue(m, U) || ue(I, U) || ue(U, I) || ue(v?.portalNode, U) || R.some((A) => A === U || ue(A, U)) || U != null && Ce.hasElement(U) || Ce.hasMatchingElement((A) => ue(A, U)) || p || T && (dn(T.nodesRef.current, Z).find((A) => ue(A.context?.elements.floating, U) || ue(A.context?.elements.domReference, U)) || Gr(T.nodesRef.current, Z).find((A) => [A.context?.elements.floating, Ao(A.context?.elements.floating)].includes(U) || A.context?.elements.domReference === U)));
        if (ge === m && j && Jr(j), c && ge !== m && !Xn(se) && ut(W) === W.body) {
          if (Je(j) && (j.focus(), c === "popup")) {
            we.request(() => {
              j.focus();
            });
            return;
          }
          const A = Se(), z = G.current, Ae = (z && A.includes(z) ? z : null) || A[A.length - 1] || j;
          Je(Ae) && Ae.focus();
        }
        if (h.current.insideReactTree) {
          h.current.insideReactTree = !1;
          return;
        }
        (M || !u) && U && L && !X.current && // Fix React 18 Strict Mode returnFocus due to double rendering.
        // For an "untrapped" typeable combobox (input role=combobox with
        // initialFocus=false), re-opening the popup and tabbing out should still close it even
        // when the previously focused element (e.g. the next tabbable outside the popup) is
        // focused again. Otherwise, the popup remains open on the second Tab sequence:
        // click input -> Tab (closes) -> click input -> Tab.
        // Allow closing when `isUntrappedTypeableCombobox` regardless of the previously focused element.
        (M || U !== Qr()) && (k.current = !0, x.setOpen(!1, ae(zn, re)));
      });
    }
    function Ee() {
      te.current || (h.current.insideReactTree = !0, Q.start(0, () => {
        h.current.insideReactTree = !1;
      }));
    }
    const $ = Je(m) ? m : null;
    if (!(!I && !$))
      return $t($ && Pe($, "focusout", ye), $ && Pe($, "pointerdown", he), I && Pe(I, "focusin", de), I && Pe(I, "focusout", ye), I && v && Pe(I, "focusout", Ee, !0));
  }, [o, m, I, j, u, T, v, x, y, c, Se, M, w, h, Q, fe, we, a, b, ke]), i.useEffect(() => {
    if (o || !I || !E)
      return;
    const W = Array.from(v?.portalNode?.querySelectorAll(`[${Un("portal")}]`) || []), de = (T ? Gr(T.nodesRef.current, w()) : []).find((ge) => ko(ge.context?.elements.domReference || null))?.context?.elements.domReference, Ee = [...[I, ...W, J.current, ie.current, v?.beforeOutsideRef.current, v?.afterOutsideRef.current, ...ke()], de, wt(b), wt(a), M ? m : null].filter((ge) => ge != null), $ = Yr(Ee, {
      ariaHidden: u || M,
      mark: !1
    }), re = [I, ...W].filter((ge) => ge != null), U = Yr(re);
    return () => {
      U(), $();
    };
  }, [E, o, m, I, u, v, M, T, w, a, b, ke]), Y(() => {
    if (!E || o || !Je(j))
      return;
    const W = Te(j), he = ut(W);
    queueMicrotask(() => {
      const de = N.current, ye = typeof de == "function" ? de(V.current || "") : de;
      if (ye === void 0 || ye === !1 || ue(j, he))
        return;
      let $ = null;
      const re = () => ($ == null && ($ = Se(j)), $[0] || j);
      let U;
      ye === !0 || ye === null ? U = re() : U = wt(ye), U = U || re();
      const ge = ue(j, ut(W));
      Dn(U, {
        preventScroll: U === j,
        shouldFocus() {
          if (!B.current)
            return !1;
          if (ge)
            return !0;
          const se = ut(W);
          return !(se !== U && ue(j, se));
        }
      });
    });
  }, [o, E, j, Se, N, V, B]), Y(() => {
    if (o || !j)
      return;
    const W = Te(j), he = ut(W), de = V.current == null;
    Xr(he);
    function ye($) {
      if ($.open || (_.current = Fu($.nativeEvent, me.current)), $.reason === $c && $.nativeEvent.type === "mouseleave" && (k.current = !0), $.reason === qo)
        if ($.nested)
          k.current = !1;
        else if (Cs($.nativeEvent) || Rs($.nativeEvent))
          k.current = !1;
        else {
          let re = !1;
          Te(j).createElement("div").focus({
            get preventScroll() {
              return re = !0, !1;
            }
          }), re ? k.current = !1 : k.current = !0;
        }
    }
    f.on("openchange", ye);
    function Ee() {
      const $ = P.current;
      let re = typeof $ == "function" ? $(_.current) : $;
      if (re === void 0 || re === !1)
        return null;
      re === null && (re = !0);
      const U = m?.isConnected ? m : null, ge = he?.isConnected && xt(he) !== "body" ? he : null;
      let se = de ? ge || U : U || ge;
      return se || (se = Qr() || null), typeof re == "boolean" ? se : wt(re) || se || null;
    }
    return () => {
      f.off("openchange", ye);
      const $ = ut(W), re = ke(), U = ue(I, $) || re.some((Z) => Z === $ || ue(Z, $)) || T && dn(T.nodesRef.current, w(), !1).some((Z) => ue(Z.context?.elements.floating, $)), ge = P.current, se = Ee();
      queueMicrotask(() => {
        const Z = _u(se), Ce = typeof ge != "boolean";
        ge && !k.current && Je(Z) && // If the focus moved somewhere else after mount, avoid returning focus
        // since it likely entered a different element which should be
        // respected: https://github.com/floating-ui/floating-ui/issues/2607
        (!(!Ce && Z !== $ && $ !== W.body) || U) && Z.focus({
          preventScroll: !0
        }), k.current = !1;
      });
    };
  }, [o, I, j, P, V, f, T, m, w, ke]), Y(() => {
    if (!Wt || E || !I)
      return;
    const W = ut(Te(I));
    !Je(W) || !Qo(W) || ue(I, W) && W.blur();
  }, [E, I]), Y(() => {
    if (!(o || !v))
      return v.setFocusManagerState({
        modal: u,
        closeOnFocusOut: y,
        open: E,
        onOpenChange: x.setOpen,
        domReference: m
      }), () => {
        v.setFocusManagerState(null);
      };
  }, [o, v, u, E, x, y, m]), Y(() => {
    if (!(o || !j))
      return Jr(j), () => {
        queueMicrotask(er);
      };
  }, [o, j]);
  const $e = !o && (u ? !M : !0) && (Be || u);
  return /* @__PURE__ */ lt(i.Fragment, {
    children: [$e && /* @__PURE__ */ H(an, {
      "data-type": "inside",
      ref: K,
      onFocus: (W) => {
        if (u) {
          const he = Se();
          Dn(he[he.length - 1]);
        } else v?.portalNode && (k.current = !1, on(W, v.portalNode) ? Ds(m)?.focus() : wt(b ?? v.beforeOutsideRef)?.focus());
      }
    }), n, $e && /* @__PURE__ */ H(an, {
      "data-type": "inside",
      ref: Re,
      onFocus: (W) => {
        u ? Dn(Se()[0]) : v?.portalNode && (y && (k.current = !0), on(W, v.portalNode) ? Fs(m)?.focus() : wt(a ?? v.afterOutsideRef)?.focus());
      }
    })]
  });
}
function Gs(e, t = {}) {
  const {
    enabled: n = !0,
    event: o = "click",
    toggle: r = !0,
    ignoreMouse: s = !1,
    stickIfOpen: c = !0,
    touchOpenDelay: u = 0,
    reason: y = ps
  } = t, l = "rootStore" in e ? e.rootStore : e, a = l.context.dataRef, b = i.useRef(void 0), d = cn(), C = Pt(), g = i.useMemo(() => {
    function x(m, I, f, h) {
      const w = ae(y, I, f);
      m && h === "touch" && u > 0 ? C.start(u, () => {
        l.setOpen(!0, w);
      }) : l.setOpen(m, w);
    }
    function E(m, I, f) {
      const h = a.current.openEvent, w = l.select("domReferenceElement") !== I;
      return m && w || !m || !r ? !0 : h && c ? !f(h.type) : !1;
    }
    return {
      onPointerDown(m) {
        b.current = m.pointerType;
      },
      onMouseDown(m) {
        const I = b.current, f = m.nativeEvent, h = l.select("open");
        if (m.button !== 0 || o === "click" || Hr(I) && s)
          return;
        const w = E(h, m.currentTarget, (N) => N === "click" || N === "mousedown"), D = ot(f);
        if (Qo(D)) {
          x(w, f, D, I);
          return;
        }
        const M = m.currentTarget;
        d.request(() => {
          x(w, f, M, I);
        });
      },
      onClick(m) {
        if (o === "mousedown-only")
          return;
        const I = b.current;
        if (o === "mousedown" && I) {
          b.current = void 0;
          return;
        }
        if (Hr(I) && s)
          return;
        const f = l.select("open"), h = E(f, m.currentTarget, (w) => w === "click" || w === "mousedown" || w === "keydown" || w === "keyup");
        x(h, m.nativeEvent, m.currentTarget, I);
      },
      onKeyDown() {
        b.current = void 0;
      }
    };
  }, [a, o, s, y, l, c, r, d, C, u]);
  return i.useMemo(() => n ? {
    reference: g
  } : nt, [n, g]);
}
function Bu() {
  return !1;
}
function Hu(e) {
  return {
    escapeKey: typeof e == "boolean" ? e : e?.escapeKey ?? !1,
    outsidePress: typeof e == "boolean" ? e : e?.outsidePress ?? !0
  };
}
function $u(e, t = {}) {
  const {
    enabled: n = !0,
    escapeKey: o = !0,
    outsidePress: r = !0,
    outsidePressEvent: s = "sloppy",
    referencePress: c = Bu,
    bubbles: u,
    externalTree: y
  } = t, l = "rootStore" in e ? e.rootStore : e, a = l.useState("open"), b = l.useState("floatingElement"), {
    dataRef: d
  } = l.context, C = Jn(y), g = ee(typeof r == "function" ? r : () => !1), x = typeof r == "function" ? g : r, E = x !== !1, m = ee(() => s), {
    escapeKey: I,
    outsidePress: f
  } = Hu(u), h = i.useRef(!1), w = i.useRef(!1), D = i.useRef(!1), M = i.useRef(!1), N = i.useRef(""), P = i.useRef(null), V = Pt(), B = Pt(), T = ee(() => {
    B.clear(), d.current.insideReactTree = !1;
  }), v = ee((K) => {
    const Re = d.current.floatingContext?.nodeId;
    return (C ? dn(C.nodesRef.current, Re) : []).some((fe) => fe.context?.open && !fe.context.dataRef.current[K]);
  }), k = ee((K) => Co(K, l.select("floatingElement")) || Co(K, l.select("domReferenceElement"))), X = ee((K) => {
    c() && l.setOpen(!1, ae(ps, K.nativeEvent));
  }), te = ee((K) => {
    if (!a || !n || !o || K.key !== "Escape" || M.current || !I && v("__escapeKeyBubbles"))
      return;
    const Re = hu(K) ? K.nativeEvent : K, Q = ae(hs, Re);
    l.setOpen(!1, Q), Q.isCanceled || K.preventDefault(), !I && !Q.isPropagationAllowed && K.stopPropagation();
  }), G = ee(() => {
    d.current.insideReactTree = !0, B.start(0, T);
  }), _ = ee((K) => {
    if (!a || !n || K.button !== 0)
      return;
    const Re = ot(K.nativeEvent);
    ue(l.select("floatingElement"), Re) && (h.current || (h.current = !0, w.current = !1));
  }), me = ee((K) => {
    !a || !n || (K.defaultPrevented || K.nativeEvent.defaultPrevented) && h.current && (w.current = !0);
  });
  i.useEffect(() => {
    if (!a || !n)
      return;
    d.current.__escapeKeyBubbles = I, d.current.__outsidePressBubbles = f;
    const K = new Ft(), Re = new Ft();
    function Q() {
      K.clear(), M.current = !0;
    }
    function fe() {
      K.start(
        // 0ms or 1ms don't work in Safari. 5ms appears to consistently work.
        // Only apply to WebKit for the test to remain 0ms.
        Wt ? 5 : 0,
        () => {
          M.current = !1;
        }
      );
    }
    function we() {
      D.current = !0, Re.start(0, () => {
        D.current = !1;
      });
    }
    function Be() {
      h.current = !1, w.current = !1;
    }
    function j() {
      const R = N.current, p = R === "pen" || !R ? "mouse" : R, L = m(), A = typeof L == "function" ? L() : L;
      return typeof A == "string" ? A : A[p];
    }
    function Se(R) {
      const p = j();
      return p === "intentional" && R.type !== "click" || p === "sloppy" && R.type === "click";
    }
    function ke(R) {
      const p = d.current.floatingContext?.nodeId, L = C && dn(C.nodesRef.current, p).some((A) => Co(R, A.context?.elements.floating));
      return k(R) || L;
    }
    function $e(R) {
      if (Se(R)) {
        R.type !== "click" && !k(R) && (Re.clear(), D.current = !1), T();
        return;
      }
      if (d.current.insideReactTree) {
        T();
        return;
      }
      const p = ot(R), L = `[${Un("inert")}]`, A = it(p) ? p.getRootNode() : null, z = Array.from((Wn(A) ? A : Te(l.select("floatingElement"))).querySelectorAll(L)), Ae = l.context.triggerElements;
      if (p && (Ae.hasElement(p) || Ae.hasMatchingElement((pe) => ue(pe, p))))
        return;
      let Oe = it(p) ? p : null;
      for (; Oe && !yo(Oe); ) {
        const pe = Xi(Oe);
        if (yo(pe) || !it(pe))
          break;
        Oe = pe;
      }
      if (!(z.length && it(p) && !bu(p) && // Clicked on a direct ancestor (e.g. FloatingOverlay).
      !ue(p, l.select("floatingElement")) && // If the target root element contains none of the markers, then the
      // element was injected after the floating element rendered.
      z.every((pe) => !ue(Oe, pe)))) {
        if (Je(p) && !("touches" in R)) {
          const pe = yo(p), xe = Bo(p), Ne = /auto|scroll/, Ue = pe || Ne.test(xe.overflowX), dt = pe || Ne.test(xe.overflowY), Ge = Ue && p.clientWidth > 0 && p.scrollWidth > p.clientWidth, Ze = dt && p.clientHeight > 0 && p.scrollHeight > p.clientHeight, He = xe.direction === "rtl", ce = Ze && (He ? R.offsetX <= p.offsetWidth - p.clientWidth : R.offsetX > p.clientWidth), De = Ge && R.offsetY > p.clientHeight;
          if (ce || De)
            return;
        }
        if (!ke(R)) {
          if (j() === "intentional" && D.current) {
            Re.clear(), D.current = !1;
            return;
          }
          typeof x == "function" && !x(R) || v("__outsidePressBubbles") || (l.setOpen(!1, ae(qo, R)), T());
        }
      }
    }
    function W(R) {
      j() !== "sloppy" || R.pointerType === "touch" || !l.select("open") || !n || k(R) || $e(R);
    }
    function he(R) {
      if (j() !== "sloppy" || !l.select("open") || !n || k(R))
        return;
      const p = R.touches[0];
      p && (P.current = {
        startTime: Date.now(),
        startX: p.clientX,
        startY: p.clientY,
        dismissOnTouchEnd: !1,
        dismissOnMouseDown: !0
      }, V.start(1e3, () => {
        P.current && (P.current.dismissOnTouchEnd = !1, P.current.dismissOnMouseDown = !1);
      }));
    }
    function de(R, p) {
      const L = ot(R);
      if (!L)
        return;
      const A = Pe(L, R.type, () => {
        p(R), A();
      });
    }
    function ye(R) {
      N.current = "touch", de(R, he);
    }
    function Ee(R) {
      V.clear(), R.type === "pointerdown" && (N.current = R.pointerType), !(R.type === "mousedown" && P.current && !P.current.dismissOnMouseDown) && de(R, (p) => {
        p.type === "pointerdown" ? W(p) : $e(p);
      });
    }
    function $(R) {
      if (!h.current)
        return;
      const p = w.current;
      if (Be(), j() === "intentional") {
        if (R.type === "pointercancel") {
          p && we();
          return;
        }
        if (!ke(R)) {
          if (p) {
            we();
            return;
          }
          typeof x == "function" && !x(R) || (Re.clear(), D.current = !0, T());
        }
      }
    }
    function re(R) {
      if (j() !== "sloppy" || !P.current || k(R))
        return;
      const p = R.touches[0];
      if (!p)
        return;
      const L = Math.abs(p.clientX - P.current.startX), A = Math.abs(p.clientY - P.current.startY), z = Math.sqrt(L * L + A * A);
      z > 5 && (P.current.dismissOnTouchEnd = !0), z > 10 && ($e(R), V.clear(), P.current = null);
    }
    function U(R) {
      de(R, re);
    }
    function ge(R) {
      j() !== "sloppy" || !P.current || k(R) || (P.current.dismissOnTouchEnd && $e(R), V.clear(), P.current = null);
    }
    function se(R) {
      de(R, ge);
    }
    const Z = Te(b), Ce = $t(o && $t(Pe(Z, "keydown", te), Pe(Z, "compositionstart", Q), Pe(Z, "compositionend", fe)), E && $t(Pe(Z, "click", Ee, !0), Pe(Z, "pointerdown", Ee, !0), Pe(Z, "pointerup", $, !0), Pe(Z, "pointercancel", $, !0), Pe(Z, "mousedown", Ee, !0), Pe(Z, "mouseup", $, !0), Pe(Z, "touchstart", ye, !0), Pe(Z, "touchmove", U, !0), Pe(Z, "touchend", se, !0)));
    return () => {
      Ce(), K.clear(), Re.clear(), Be(), D.current = !1;
    };
  }, [d, b, o, E, x, a, n, I, f, te, T, m, v, k, C, l, V]), i.useEffect(T, [x, T]);
  const J = i.useMemo(() => ({
    onKeyDown: te,
    onPointerDown: X,
    onClick: X
  }), [te, X]), ie = i.useMemo(() => ({
    onKeyDown: te,
    // `onMouseDown` may be blocked if `event.preventDefault()` is called in
    // `onPointerDown`, such as with <NumberField.ScrubArea>.
    // See https://github.com/mui/base-ui/pull/3379
    onPointerDown: me,
    onMouseDown: me,
    onClickCapture: G,
    onMouseDownCapture(K) {
      G(), _(K);
    },
    onPointerDownCapture(K) {
      G(), _(K);
    },
    onMouseUpCapture: G,
    onTouchEndCapture: G,
    onTouchMoveCapture: G
  }), [te, G, _, me]);
  return i.useMemo(() => n ? {
    reference: J,
    floating: ie,
    trigger: J
  } : {}, [n, J, ie]);
}
const oe = (e, t, n, o, r, s, ...c) => {
  if (c.length > 0)
    throw new Error(process.env.NODE_ENV !== "production" ? "Unsupported number of selectors" : ft(1));
  let u;
  if (e)
    u = e;
  else
    throw (
      /* minify-error-disabled */
      new Error("Missing arguments")
    );
  return u;
};
var Uu = lc();
const Gu = Uo(19), Wu = Gu ? zu : qu;
function S(e, t, n, o, r) {
  return Wu(e, t, n, o, r);
}
function Ku(e, t, n, o, r) {
  const s = i.useCallback(() => t(e.getSnapshot(), n, o, r), [e, t, n, o, r]);
  return Uu.useSyncExternalStore(e.subscribe, s, s);
}
function zu(e, t, n, o, r) {
  return Ku(e, t, n, o, r);
}
function qu(e, t, n, o, r) {
  return ac.useSyncExternalStoreWithSelector(e.subscribe, e.getSnapshot, e.getSnapshot, (s) => t(s, n, o, r));
}
class Ws {
  /**
   * The current state of the store.
   * This property is updated immediately when the state changes as a result of calling {@link setState}, {@link update}, or {@link set}.
   * To subscribe to state changes, use the {@link useState} method. The value returned by {@link useState} is updated after the component renders (similarly to React's useState).
   * The values can be used directly (to avoid subscribing to the store) in effects or event handlers.
   *
   * Do not modify properties in state directly. Instead, use the provided methods to ensure proper state management and listener notification.
   */
  // Internal state to handle recursive `setState()` calls
  constructor(t) {
    this.state = t, this.listeners = /* @__PURE__ */ new Set(), this.updateTick = 0;
  }
  /**
   * Registers a listener that will be called whenever the store's state changes.
   *
   * @param fn The listener function to be called on state changes.
   * @returns A function to unsubscribe the listener.
   */
  subscribe = (t) => (this.listeners.add(t), () => {
    this.listeners.delete(t);
  });
  /**
   * Returns the current state of the store.
   */
  getSnapshot = () => this.state;
  /**
   * Updates the entire store's state and notifies all registered listeners.
   *
   * @param newState The new state to set for the store.
   */
  setState(t) {
    if (this.state === t)
      return;
    this.state = t, this.updateTick += 1;
    const n = this.updateTick;
    for (const o of this.listeners) {
      if (n !== this.updateTick)
        return;
      o(t);
    }
  }
  /**
   * Merges the provided changes into the current state and notifies listeners if there are changes.
   *
   * @param changes An object containing the changes to apply to the current state.
   */
  update(t) {
    for (const n in t)
      if (!Object.is(this.state[n], t[n])) {
        this.setState({
          ...this.state,
          ...t
        });
        return;
      }
  }
  /**
   * Sets a specific key in the store's state to a new value and notifies listeners if the value has changed.
   *
   * @param key The key in the store's state to update.
   * @param value The new value to set for the specified key.
   */
  set(t, n) {
    Object.is(this.state[t], n) || this.setState({
      ...this.state,
      [t]: n
    });
  }
  /**
   * Gives the state a new reference and updates all registered listeners.
   */
  notifyAll() {
    const t = {
      ...this.state
    };
    this.setState(t);
  }
  use(t, n, o, r) {
    return S(this, t, n, o, r);
  }
}
class Yu extends Ws {
  /**
   * Creates a new ReactStore instance.
   *
   * @param state Initial state of the store.
   * @param context Non-reactive context values.
   * @param selectors Optional selectors for use with `useState`.
   */
  constructor(t, n = {}, o) {
    super(t), this.context = n, this.selectors = o;
  }
  /**
   * Non-reactive values such as refs, callbacks, etc.
   */
  /**
   * Synchronizes a single external value into the store.
   *
   * Note that the while the value in `state` is updated immediately, the value returned
   * by `useState` is updated before the next render (similarly to React's `useState`).
   */
  useSyncedValue(t, n) {
    i.useDebugValue(t);
    const o = this;
    Y(() => {
      o.state[t] !== n && o.set(t, n);
    }, [o, t, n]);
  }
  /**
   * Synchronizes a single external value into the store and
   * cleans it up (sets to `undefined`) on unmount.
   *
   * Note that the while the value in `state` is updated immediately, the value returned
   * by `useState` is updated before the next render (similarly to React's `useState`).
   */
  useSyncedValueWithCleanup(t, n) {
    const o = this;
    Y(() => (o.state[t] !== n && o.set(t, n), () => {
      o.set(t, void 0);
    }), [o, t, n]);
  }
  /**
   * Synchronizes multiple external values into the store.
   *
   * Note that the while the values in `state` are updated immediately, the values returned
   * by `useState` are updated before the next render (similarly to React's `useState`).
   */
  useSyncedValues(t) {
    const n = this;
    if (process.env.NODE_ENV !== "production") {
      i.useDebugValue(t, (c) => Object.keys(c));
      const r = i.useRef(Object.keys(t)).current, s = Object.keys(t);
      (r.length !== s.length || r.some((c, u) => c !== s[u])) && console.error("ReactStore.useSyncedValues expects the same prop keys on every render. Keys should be stable.");
    }
    const o = Object.values(t);
    Y(() => {
      n.update(t);
    }, [n, ...o]);
  }
  /**
   * Registers a controllable prop pair (`controlled`, `defaultValue`) for a specific key. If `controlled`
   * is non-undefined, the store's state at `key` is updated to match `controlled`.
   */
  useControlledProp(t, n) {
    i.useDebugValue(t);
    const o = this, r = n !== void 0;
    if (Y(() => {
      r && !Object.is(o.state[t], n) && o.setState({
        ...o.state,
        [t]: n
      });
    }, [o, t, n, r]), process.env.NODE_ENV !== "production") {
      const s = this.controlledValues ??= /* @__PURE__ */ new Map();
      s.has(t) || s.set(t, r);
      const c = s.get(t);
      c !== void 0 && c !== r && console.error(`A component is changing the ${r ? "" : "un"}controlled state of ${t.toString()} to be ${r ? "un" : ""}controlled. Elements should not switch from uncontrolled to controlled (or vice versa).`);
    }
  }
  /** Gets the current value from the store using a selector with the provided key.
   *
   * @param key Key of the selector to use.
   */
  select(t, n, o, r) {
    const s = this.selectors[t];
    return s(this.state, n, o, r);
  }
  /**
   * Returns a value from the store's state using a selector function.
   * Used to subscribe to specific parts of the state.
   * This methods causes a rerender whenever the selected state changes.
   *
   * @param key Key of the selector to use.
   */
  useState(t, n, o, r) {
    return i.useDebugValue(t), S(this, this.selectors[t], n, o, r);
  }
  /**
   * Wraps a function with `useStableCallback` to ensure it has a stable reference
   * and assigns it to the context.
   *
   * @param key Key of the event callback. Must be a function in the context.
   * @param fn Function to assign.
   */
  useContextCallback(t, n) {
    i.useDebugValue(t);
    const o = ee(n ?? ve);
    this.context[t] = o;
  }
  /**
   * Returns a stable setter function for a specific key in the store's state.
   * It's commonly used to pass as a ref callback to React elements.
   *
   * @param key Key of the state to set.
   */
  useStateSetter(t) {
    const n = i.useRef(void 0);
    return n.current === void 0 && (n.current = (o) => {
      this.set(t, o);
    }), n.current;
  }
  /**
   * Observes changes derived from the store's selectors and calls the listener when the selected value changes.
   *
   * @param key Key of the selector to observe.
   * @param listener Listener function called when the selector result changes.
   */
  observe(t, n) {
    let o;
    typeof t == "function" ? o = t : o = this.selectors[t];
    let r = o(this.state);
    return n(r, r, this), this.subscribe((s) => {
      const c = o(s);
      if (!Object.is(r, c)) {
        const u = r;
        r = c, n(c, u, this);
      }
    });
  }
}
const ju = {
  open: oe((e) => e.open),
  transitionStatus: oe((e) => e.transitionStatus),
  domReferenceElement: oe((e) => e.domReferenceElement),
  referenceElement: oe((e) => e.positionReference ?? e.referenceElement),
  floatingElement: oe((e) => e.floatingElement),
  floatingId: oe((e) => e.floatingId)
};
class Xu extends Yu {
  constructor(t) {
    const {
      syncOnly: n,
      nested: o,
      onOpenChange: r,
      triggerElements: s,
      ...c
    } = t;
    super({
      ...c,
      positionReference: c.referenceElement,
      domReferenceElement: c.referenceElement
    }, {
      onOpenChange: r,
      dataRef: {
        current: {}
      },
      events: Du(),
      nested: o,
      triggerElements: s
    }, ju), this.syncOnly = n;
  }
  /**
   * Syncs the event used by hover logic to distinguish hover-open from click-like interaction.
   */
  syncOpenEvent = (t, n) => {
    (!t || !this.state.open || // Prevent a pending hover-open from overwriting a click-open event, while allowing
    // click events to upgrade a hover-open.
    n != null && gu(n)) && (this.context.dataRef.current.openEvent = t ? n : void 0);
  };
  /**
   * Runs the root-owned side effects for an open state change.
   */
  dispatchOpenChange = (t, n) => {
    this.syncOpenEvent(t, n.event);
    const o = {
      open: t,
      reason: n.reason,
      nativeEvent: n.event,
      nested: this.context.nested,
      triggerElement: n.trigger
    };
    this.context.events.emit("openchange", o);
  };
  /**
   * Emits the `openchange` event through the internal event emitter and calls the `onOpenChange` handler with the provided arguments.
   *
   * @param newOpen The new open state.
   * @param eventDetails Details about the event that triggered the open state change.
   */
  setOpen = (t, n) => {
    if (this.syncOnly) {
      this.context.onOpenChange?.(t, n);
      return;
    }
    this.dispatchOpenChange(t, n), this.context.onOpenChange?.(t, n);
  };
}
const Qu = {
  tabIndex: -1,
  [To]: ""
};
class Ju {
  constructor() {
    this.elementsSet = /* @__PURE__ */ new Set(), this.idMap = /* @__PURE__ */ new Map();
  }
  /**
   * Adds a trigger element with the given ID.
   *
   * Note: The provided element is assumed to not be registered under multiple IDs.
   */
  add(t, n) {
    const o = this.idMap.get(t);
    if (o !== n && (o !== void 0 && this.elementsSet.delete(o), this.elementsSet.add(n), this.idMap.set(t, n), process.env.NODE_ENV !== "production" && this.elementsSet.size !== this.idMap.size))
      throw new Error("Base UI: A trigger element cannot be registered under multiple IDs in PopupTriggerMap.");
  }
  /**
   * Removes the trigger element with the given ID.
   */
  delete(t) {
    const n = this.idMap.get(t);
    n && (this.elementsSet.delete(n), this.idMap.delete(t));
  }
  /**
   * Whether the given element is registered as a trigger.
   */
  hasElement(t) {
    return this.elementsSet.has(t);
  }
  /**
   * Whether there is a registered trigger element matching the given predicate.
   */
  hasMatchingElement(t) {
    for (const n of this.elementsSet)
      if (t(n))
        return !0;
    return !1;
  }
  /**
   * Returns the trigger element associated with the given ID, or undefined if no such element exists.
   */
  getById(t) {
    return this.idMap.get(t);
  }
  /**
   * Returns an iterable of all registered trigger entries, where each entry is a tuple of [id, element].
   */
  entries() {
    return this.idMap.entries();
  }
  /**
   * Returns an iterable of all registered trigger elements.
   */
  elements() {
    return this.elementsSet.values();
  }
  /**
   * Returns the number of registered trigger elements.
   */
  get size() {
    return this.idMap.size;
  }
}
function Ks(e) {
  const {
    open: t = !1,
    onOpenChange: n,
    elements: o = {}
  } = e, r = Ko(), s = Us() != null;
  if (process.env.NODE_ENV !== "production") {
    const u = o.reference;
    u && !it(u) && console.error("Cannot pass a virtual element to the `elements.reference` option,", "as it must be a real DOM element. Use `context.setPositionReference()`", "instead.");
  }
  const c = at(() => new Xu({
    open: t,
    transitionStatus: void 0,
    onOpenChange: n,
    referenceElement: o.reference ?? null,
    floatingElement: o.floating ?? null,
    triggerElements: new Ju(),
    floatingId: r,
    syncOnly: !1,
    nested: s
  })).current;
  return Y(() => {
    const u = {
      open: t,
      floatingId: r
    };
    o.reference !== void 0 && (u.referenceElement = o.reference, u.domReferenceElement = it(o.reference) ? o.reference : null), o.floating !== void 0 && (u.floatingElement = o.floating), c.update(u);
  }, [t, r, o.reference, o.floating, c]), c.context.onOpenChange = n, c.context.nested = s, c;
}
function Zu(e = {}) {
  const {
    nodeId: t,
    externalTree: n
  } = e, o = Ks(e), r = e.rootContext || o, s = r.useState("referenceElement"), c = r.useState("floatingElement"), u = r.useState("domReferenceElement"), y = r.useState("open"), l = r.useState("floatingId"), [a, b] = i.useState(null), [d, C] = i.useState(void 0), [g, x] = i.useState(void 0), E = i.useRef(null), m = Jn(n), I = i.useMemo(() => ({
    reference: s,
    floating: c,
    domReference: u
  }), [s, c, u]), f = Qi({
    ...e,
    elements: {
      ...I,
      ...a && {
        reference: a
      }
    }
  }), h = it(d) ? d : null, w = g === void 0 ? r.state.floatingElement : g;
  r.useSyncedValue("referenceElement", d ?? null), r.useSyncedValue("domReferenceElement", d === void 0 ? u : h), r.useSyncedValue("floatingElement", w);
  const D = i.useCallback((T) => {
    const v = it(T) ? {
      getBoundingClientRect: () => T.getBoundingClientRect(),
      getClientRects: () => T.getClientRects(),
      contextElement: T
    } : T;
    b(v), f.refs.setReference(v);
  }, [f.refs]), M = i.useCallback((T) => {
    (it(T) || T === null) && (E.current = T, C(T)), (it(f.refs.reference.current) || f.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    T !== null && !it(T)) && f.refs.setReference(T);
  }, [f.refs, C]), N = i.useCallback((T) => {
    x(T), f.refs.setFloating(T);
  }, [f.refs]), P = i.useMemo(() => ({
    ...f.refs,
    setReference: M,
    setFloating: N,
    setPositionReference: D,
    domReference: E
  }), [f.refs, M, N, D]), V = i.useMemo(() => ({
    ...f.elements,
    domReference: u
  }), [f.elements, u]), B = i.useMemo(() => ({
    ...f,
    dataRef: r.context.dataRef,
    open: y,
    onOpenChange: r.setOpen,
    events: r.context.events,
    floatingId: l,
    refs: P,
    elements: V,
    nodeId: t,
    rootStore: r
  }), [f, P, V, t, r, y, l]);
  return Y(() => {
    u && (E.current = u);
  }, [u]), Y(() => {
    r.context.dataRef.current.floatingContext = B;
    const T = m?.nodesRef.current.find((v) => v.id === t);
    T && (T.context = B);
  }), i.useMemo(() => ({
    ...f,
    context: B,
    refs: P,
    elements: V,
    rootStore: r
  }), [f, P, V, B, r]);
}
const el = "Escape";
function Zn(e, t, n) {
  switch (e) {
    case "vertical":
      return t;
    case "horizontal":
      return n;
    default:
      return t || n;
  }
}
function An(e, t) {
  return Zn(t, e === Xo || e === jn, e === Vt || e === Dt);
}
function So(e, t, n) {
  return Zn(t, e === jn, n ? e === Vt : e === Dt) || e === "Enter" || e === " " || e === "";
}
function tl(e, t, n) {
  return Zn(t, n ? e === Vt : e === Dt, e === jn);
}
function nl(e, t, n, o) {
  const r = n ? e === Dt : e === Vt, s = e === Xo;
  return t === "both" || t === "horizontal" && o ? e === el : Zn(t, r, s);
}
function ol(e, t) {
  const {
    listRef: n,
    activeIndex: o,
    onNavigate: r = () => {
    },
    enabled: s = !0,
    selectedIndex: c = null,
    allowEscape: u = !1,
    loopFocus: y = !1,
    nested: l = !1,
    rtl: a = !1,
    virtual: b = !1,
    focusItemOnOpen: d = "auto",
    focusItemOnHover: C = !0,
    openOnArrowKeyDown: g = !0,
    disabledIndices: x = void 0,
    orientation: E = "vertical",
    parentOrientation: m,
    id: I,
    resetOnPointerLeave: f = !0,
    externalTree: h,
    grid: w
  } = t, D = w != null;
  process.env.NODE_ENV !== "production" && (u && (y || console.warn("`useListNavigation` looping must be enabled to allow escaping."), b || console.warn("`useListNavigation` must be virtual to allow escaping.")), E === "vertical" && D && console.warn("In grid list navigation mode, the `orientation` should", 'be either "horizontal" or "both".'));
  const M = "rootStore" in e ? e.rootStore : e, N = M.useState("open"), P = M.useState("floatingElement"), V = M.useState("domReferenceElement"), B = M.context.dataRef, T = Ao(P), v = ko(V), k = tt(T), X = Us(), te = Jn(h), G = i.useRef(d), _ = i.useRef(c ?? -1), me = i.useRef(null), J = i.useRef(!0), ie = ee((R) => {
    r(_.current === -1 ? null : _.current, R);
  }), K = i.useRef(!!P), Re = i.useRef(N), Q = i.useRef(!1), fe = i.useRef(!1), we = i.useRef(null), Be = tt(x), j = tt(N), Se = tt(c), ke = tt(f), $e = cn(), W = cn(), he = ee(() => {
    function R(z) {
      b ? te?.events.emit("virtualfocus", z) : we.current = Dn(z, {
        sync: Q.current,
        preventScroll: !0
      });
    }
    const p = n.current[_.current], L = fe.current;
    p && R(p), (Q.current ? (z) => z() : (z) => $e.request(z))(() => {
      const z = n.current[_.current] || p;
      if (!z)
        return;
      p || R(z), // eslint-disable-next-line @typescript-eslint/no-use-before-define
      U && (L || !J.current) && z.scrollIntoView?.({
        block: "nearest",
        inline: "nearest"
      });
    });
  });
  Y(() => {
    B.current.orientation = E;
  }, [B, E]), Y(() => {
    s && (N && P ? (_.current = c ?? -1, G.current && c != null && (fe.current = !0, ie())) : K.current && (_.current = -1, ie()));
  }, [s, N, P, c, ie]), Y(() => {
    if (s) {
      if (!N) {
        Q.current = !1;
        return;
      }
      if (P)
        if (o == null) {
          if (Q.current = !1, Se.current != null)
            return;
          if (K.current && (_.current = -1, he()), (!Re.current || !K.current) && G.current && (me.current != null || G.current === !0 && me.current == null)) {
            let R = 0;
            const p = () => {
              n.current[0] == null ? (R < 2 && (R ? (A) => W.request(A) : queueMicrotask)(p), R += 1) : (_.current = me.current == null || So(me.current, E, a) || l ? Ro(n) : $r(n), me.current = null, ie());
            };
            p();
          }
        } else fn(n.current, o) || (_.current = o, he(), fe.current = !1);
    }
  }, [s, N, P, o, Se, l, n, E, a, ie, he, W]), Y(() => {
    if (!s || P || !te || b || !K.current)
      return;
    const R = te.nodesRef.current, p = R.find((z) => z.id === X)?.context?.elements.floating, L = ut(Te(V ?? p ?? null)), A = R.some((z) => z.context && ue(z.context.elements.floating, L));
    p && !A && J.current && p.focus({
      preventScroll: !0
    });
  }, [s, P, V, te, X, b]), Y(() => {
    Re.current = N, K.current = !!P;
  }), Y(() => {
    N || (me.current = null, G.current = d);
  }, [N, d]);
  const de = o != null, ye = ee((R) => {
    if (!j.current)
      return;
    const p = n.current.indexOf(R.currentTarget);
    p !== -1 && (_.current !== p || o !== p) && (_.current = p, ie(R));
  }), Ee = ee(() => m ?? te?.nodesRef.current.find((R) => R.id === X)?.context?.dataRef?.current.orientation), $ = ee(() => Ro(n, Be.current)), re = ee((R) => {
    if (J.current = !1, Q.current = !0, R.which === 229 || !j.current && R.currentTarget === k.current)
      return;
    if (l && nl(R.key, E, a, D)) {
      An(R.key, Ee()) || Fe(R), M.setOpen(!1, ae(Bn, R.nativeEvent)), Je(V) && (b ? te?.events.emit("virtualfocus", V) : V.focus());
      return;
    }
    const p = _.current, L = Ro(n, x), A = $r(n, x);
    if (v || (R.key === "Home" && (Fe(R), _.current = L, ie(R)), R.key === "End" && (Fe(R), _.current = A, ie(R))), w != null) {
      const z = w(R, _.current, n, E, y, a, x, L, A);
      if (z != null && (_.current = z, ie(R)), E === "both")
        return;
    }
    if (An(R.key, E)) {
      if (Fe(R), N && !b && ut(R.currentTarget.ownerDocument) === R.currentTarget) {
        _.current = So(R.key, E, a) ? L : A, ie(R);
        return;
      }
      So(R.key, E, a) ? y ? p >= A ? u && p !== n.current.length ? _.current = -1 : (Q.current = !1, _.current = L) : _.current = Xe(n.current, {
        startingIndex: p,
        disabledIndices: x
      }) : _.current = Math.min(A, Xe(n.current, {
        startingIndex: p,
        disabledIndices: x
      })) : y ? p <= L ? u && p !== -1 ? _.current = n.current.length : (Q.current = !1, _.current = A) : _.current = Xe(n.current, {
        startingIndex: p,
        decrement: !0,
        disabledIndices: x
      }) : _.current = Math.max(L, Xe(n.current, {
        startingIndex: p,
        decrement: !0,
        disabledIndices: x
      })), fn(n.current, _.current) && (_.current = -1), ie(R);
    }
  }), U = i.useMemo(() => ({
    onFocus(p) {
      Q.current = !0, ye(p);
    },
    onClick: ({
      currentTarget: p
    }) => p.focus({
      preventScroll: !0
    }),
    // Safari
    onMouseMove(p) {
      Q.current = !0, fe.current = !1, C && ye(p);
    },
    onPointerLeave(p) {
      if (!j.current || !J.current || p.pointerType === "touch")
        return;
      Q.current = !0;
      const L = p.relatedTarget;
      if (!(!C || n.current.includes(L)) && ke.current && (we.current?.(), we.current = null, _.current = -1, ie(p), !b)) {
        const A = k.current, z = ut(Te(A));
        A && ue(A, z) && A.focus({
          preventScroll: !0
        });
      }
    }
  }), [ye, j, k, C, n, ie, ke, b]), ge = i.useMemo(() => b && N && de && {
    "aria-activedescendant": `${I}-${o}`
  }, [b, N, de, I, o]), se = i.useMemo(() => ({
    "aria-orientation": E === "both" ? void 0 : E,
    ...v ? {} : ge,
    onKeyDown(R) {
      if (R.key === "Tab" && R.shiftKey && N && !b) {
        const p = ot(R.nativeEvent);
        if (p && !ue(k.current, p))
          return;
        Fe(R), M.setOpen(!1, ae(zn, R.nativeEvent)), Je(V) && V.focus();
        return;
      }
      re(R);
    },
    onPointerMove() {
      J.current = !0;
    }
  }), [ge, re, k, E, v, M, N, b, V]), Z = i.useMemo(() => {
    function R(A) {
      M.setOpen(!0, ae(Bn, A.nativeEvent, A.currentTarget));
    }
    function p(A) {
      d === "auto" && Cs(A.nativeEvent) && (G.current = !b);
    }
    function L(A) {
      G.current = d, d === "auto" && Rs(A.nativeEvent) && (G.current = !0);
    }
    return {
      onKeyDown(A) {
        const z = M.select("open");
        J.current = !1;
        const Ae = A.key.startsWith("Arrow"), Oe = tl(A.key, Ee(), a), pe = An(A.key, E), xe = (l ? Oe : pe) || A.key === "Enter" || A.key.trim() === "";
        if (b && z)
          return re(A);
        if (!(!z && !g && Ae)) {
          if (xe) {
            const Ne = An(A.key, Ee());
            me.current = l && Ne ? null : A.key;
          }
          if (l) {
            Oe && (Fe(A), z ? (_.current = $(), ie(A)) : R(A));
            return;
          }
          pe && (Se.current != null && (_.current = Se.current), Fe(A), !z && g ? R(A) : re(A), z && ie(A));
        }
      },
      onFocus(A) {
        M.select("open") && !b && (_.current = -1, ie(A));
      },
      onPointerDown: L,
      onPointerEnter: L,
      onMouseDown: p,
      onClick: p
    };
  }, [re, d, $, l, ie, M, g, E, Ee, a, Se, b]), Ce = i.useMemo(() => ({
    ...ge,
    ...Z
  }), [ge, Z]);
  return i.useMemo(() => s ? {
    reference: Ce,
    floating: se,
    item: U,
    trigger: Z
  } : {}, [s, Ce, se, Z, U]);
}
function rl(e, t) {
  const {
    listRef: n,
    elementsRef: o,
    activeIndex: r,
    onMatch: s,
    disabledIndices: c,
    onTyping: u,
    enabled: y = !0,
    resetMs: l = 750,
    selectedIndex: a = null
  } = t, b = "rootStore" in e ? e.rootStore : e, d = b.useState("open"), C = Pt(), g = i.useRef(""), x = i.useRef(a ?? r ?? -1), E = i.useRef(null), m = ee((h) => {
    function w(k) {
      const X = o?.current[k];
      return !X || Xn(X);
    }
    function D(k) {
      return w(k) ? c == null || !$n(en, k, c) : !1;
    }
    function M(k, X, te = 0) {
      if (k.length === 0)
        return -1;
      const G = (te % k.length + k.length) % k.length, _ = X.toLowerCase();
      for (let me = 0; me < k.length; me += 1) {
        const J = (G + me) % k.length;
        if (!(!k[J]?.toLowerCase().startsWith(_) || !D(J)))
          return J;
      }
      return -1;
    }
    const N = n.current;
    if (g.current.length > 0 && h.key === " " && (Fe(h), u?.(!0)), g.current.length > 0 && g.current[0] !== " " && M(N, g.current) === -1 && h.key !== " " && u?.(!1), N == null || // Character key.
    h.key.length !== 1 || // Modifier key.
    h.ctrlKey || h.metaKey || h.altKey)
      return;
    d && h.key !== " " && (Fe(h), u?.(!0));
    const P = g.current === "";
    P && (x.current = a ?? r ?? -1), N.every((k, X) => k && D(X) ? k[0]?.toLowerCase() !== k[1]?.toLowerCase() : !0) && g.current === h.key && (g.current = "", x.current = E.current), g.current += h.key, C.start(l, () => {
      g.current = "", x.current = E.current, u?.(!1);
    });
    const T = ((P ? a ?? r ?? -1 : x.current) ?? 0) + 1, v = M(N, g.current, T);
    v !== -1 ? (s?.(v), E.current = v) : h.key !== " " && (g.current = "", u?.(!1));
  }), I = ee((h) => {
    const w = h.relatedTarget, D = b.select("domReferenceElement"), M = b.select("floatingElement");
    ue(D, w) || ue(M, w) || (C.clear(), g.current = "", x.current = E.current, u?.(!1));
  });
  Y(() => {
    !d && a !== null || (C.clear(), E.current = null, g.current !== "" && (g.current = ""));
  }, [d, a, C]), Y(() => {
    d && g.current === "" && (x.current = a ?? r ?? -1);
  }, [d, a, r]);
  const f = i.useMemo(() => ({
    onKeyDown: m,
    onBlur: I
  }), [m, I]);
  return i.useMemo(() => y ? {
    reference: f,
    floating: f
  } : {}, [y, f]);
}
let tr = (function(e) {
  return e.open = "data-open", e.closed = "data-closed", e[e.startingStyle = un.startingStyle] = "startingStyle", e[e.endingStyle = un.endingStyle] = "endingStyle", e.anchorHidden = "data-anchor-hidden", e.side = "data-side", e.align = "data-align", e;
})({}), Do = /* @__PURE__ */ (function(e) {
  return e.popupOpen = "data-popup-open", e.pressed = "data-pressed", e;
})({});
const sl = {
  [Do.popupOpen]: ""
}, il = {
  [Do.popupOpen]: "",
  [Do.pressed]: ""
}, cl = {
  [tr.open]: ""
}, ul = {
  [tr.closed]: ""
}, ll = {
  [tr.anchorHidden]: ""
}, al = {
  open(e) {
    return e ? sl : null;
  }
}, fl = {
  open(e) {
    return e ? il : null;
  }
}, zs = {
  open(e) {
    return e ? cl : ul;
  },
  anchorHidden(e) {
    return e ? ll : null;
  }
};
function dl(e) {
  return Uo(19) ? e : e ? "true" : void 0;
}
const qs = /* @__PURE__ */ i.forwardRef(function(t, n) {
  const {
    cutout: o,
    ...r
  } = t;
  let s;
  if (o) {
    const c = o.getBoundingClientRect();
    s = `polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${c.left}px ${c.top}px,${c.left}px ${c.bottom}px,${c.right}px ${c.bottom}px,${c.right}px ${c.top}px,${c.left}px ${c.top}px)`;
  }
  return /* @__PURE__ */ H("div", {
    ref: n,
    role: "presentation",
    "data-base-ui-inert": "",
    ...r,
    style: {
      position: "fixed",
      inset: 0,
      userSelect: "none",
      WebkitUserSelect: "none",
      clipPath: s
    }
  });
});
process.env.NODE_ENV !== "production" && (qs.displayName = "InternalBackdrop");
function pl(e) {
  const t = i.useRef(""), n = i.useCallback((r) => {
    r.defaultPrevented || (t.current = r.pointerType, e(r, r.pointerType));
  }, [e]);
  return {
    onClick: i.useCallback((r) => {
      if (r.detail === 0) {
        e(r, "keyboard");
        return;
      }
      "pointerType" in r ? e(r, r.pointerType) : e(r, t.current), t.current = "";
    }, [e]),
    onPointerDown: n
  };
}
function nn(e, t) {
  const n = i.useRef(e), o = ee(t);
  Y(() => {
    n.current !== e && o(n.current);
  }, [e, o]), Y(() => {
    n.current = e;
  }, [e]);
}
function ml(e, t) {
  const n = ee((s, c) => {
    (typeof e == "function" ? e() : e) || t(c || // On iOS Safari, the hitslop around touch targets means tapping outside an element's
    // bounds does not fire `pointerdown` but does fire `mousedown`. The `interactionType`
    // will be "" in that case.
    (hn ? "touch" : ""));
  }), {
    onClick: o,
    onPointerDown: r
  } = pl(n);
  return i.useMemo(() => ({
    onClick: o,
    onPointerDown: r
  }), [o, r]);
}
function hl(e) {
  const [t, n] = i.useState(null), o = ml(e, n);
  return nn(e, (r) => {
    r && !e && n(null);
  }), i.useMemo(() => ({
    openMethod: t,
    triggerProps: o
  }), [t, o]);
}
function gl(e, t, n, o, r, s, c, u, y, l = 2) {
  const a = xu(n.current, {
    event: e,
    orientation: o,
    loopFocus: r,
    rtl: s,
    cols: l,
    disabledIndices: c,
    minIndex: u,
    maxIndex: y,
    // An out-of-range previous index falls back to the first enabled item.
    prevIndex: t > y ? u : t,
    stopEvent: !0
  });
  return fn(n.current, a) ? void 0 : a;
}
const nr = /* @__PURE__ */ i.createContext(void 0);
process.env.NODE_ENV !== "production" && (nr.displayName = "ComboboxRootContext");
const or = /* @__PURE__ */ i.createContext(void 0);
process.env.NODE_ENV !== "production" && (or.displayName = "ComboboxFloatingContext");
const rr = /* @__PURE__ */ i.createContext(void 0);
process.env.NODE_ENV !== "production" && (rr.displayName = "ComboboxDerivedItemsContext");
const sr = /* @__PURE__ */ i.createContext(!1);
process.env.NODE_ENV !== "production" && (sr.displayName = "ComboboxHasItemsContext");
const ir = /* @__PURE__ */ i.createContext("");
process.env.NODE_ENV !== "production" && (ir.displayName = "ComboboxInputValueContext");
function je() {
  const e = i.useContext(nr);
  if (!e)
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: ComboboxRootContext is missing. Combobox parts must be placed within <Combobox.Root>." : ft(22));
  return e;
}
function eo() {
  const e = i.useContext(or);
  if (!e)
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: ComboboxFloatingContext is missing. Combobox parts must be placed within <Combobox.Root>." : ft(23));
  return e;
}
function Tt() {
  const e = i.useContext(rr);
  if (!e)
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: ComboboxItemsContext is missing. Combobox parts must be placed within <Combobox.Root>." : ft(24));
  return e;
}
function cr() {
  return i.useContext(ir);
}
function bl() {
  return i.useContext(sr);
}
const yl = (e, t) => Object.is(e, t);
function Nt(e, t, n) {
  return e == null || t == null ? Object.is(e, t) : n(e, t);
}
function xl(e, t, n) {
  return !e || e.length === 0 ? !1 : e.some((o) => o === void 0 ? !1 : Nt(t, o, n));
}
function Gn(e, t, n) {
  return !e || e.length === 0 ? -1 : e.findIndex((o) => o === void 0 ? !1 : Nt(o, t, n));
}
function El(e, t, n) {
  return e.filter((o) => !Nt(t, o, n));
}
function Fo(e) {
  if (e == null)
    return "";
  if (typeof e == "string")
    return e;
  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
}
function ur(e) {
  return e != null && e.length > 0 && typeof e[0] == "object" && e[0] != null && "items" in e[0];
}
function Cl(e) {
  if (!Array.isArray(e))
    return e != null && "null" in e;
  const t = e;
  if (ur(t)) {
    for (const n of t)
      for (const o of n.items)
        if (o && o.value == null && o.label != null)
          return !0;
    return !1;
  }
  for (const n of t)
    if (n && n.value == null && n.label != null)
      return !0;
  return !1;
}
function Qe(e, t) {
  if (t && e != null)
    return t(e) ?? "";
  if (e && typeof e == "object") {
    if ("label" in e && e.label != null)
      return String(e.label);
    if ("value" in e)
      return String(e.value);
  }
  return Fo(e);
}
function Zt(e, t) {
  return t && e != null ? t(e) ?? "" : e && typeof e == "object" && "value" in e && "label" in e ? Fo(e.value) : Fo(e);
}
function Ys(e, t, n) {
  function o() {
    return Qe(e, n);
  }
  if (n && e != null)
    return n(e);
  if (e && typeof e == "object" && "label" in e && e.label != null)
    return e.label;
  if (t && !Array.isArray(t))
    return t[e] ?? o();
  if (Array.isArray(t)) {
    const r = t, s = ur(r) ? r.flatMap((c) => c.items) : r;
    if (e == null || typeof e != "object") {
      const c = s.find((u) => u.value === e);
      return c && c.label != null ? c.label : o();
    }
    if ("value" in e) {
      const c = s.find((u) => u && u.value === e.value);
      if (c && c.label != null)
        return c.label;
    }
  }
  return o();
}
function Rl(e, t, n) {
  return e.reduce((o, r, s) => (s > 0 && o.push(", "), o.push(/* @__PURE__ */ H(i.Fragment, {
    children: Ys(r, t, n)
  }, s)), o), []);
}
const O = {
  id: oe((e) => e.id),
  labelId: oe((e) => e.labelId),
  items: oe((e) => e.items),
  selectedValue: oe((e) => e.selectedValue),
  hasSelectionChips: oe((e) => {
    const t = e.selectedValue;
    return Array.isArray(t) && t.length > 0;
  }),
  hasSelectedValue: oe((e) => {
    const {
      selectedValue: t,
      selectionMode: n
    } = e;
    return t == null ? !1 : n === "multiple" && Array.isArray(t) ? t.length > 0 : !0;
  }),
  hasNullItemLabel: oe((e, t) => t ? Cl(e.items) : !1),
  open: oe((e) => e.open),
  mounted: oe((e) => e.mounted),
  forceMounted: oe((e) => e.forceMounted),
  inline: oe((e) => e.inline),
  activeIndex: oe((e) => e.activeIndex),
  selectedIndex: oe((e) => e.selectedIndex),
  isActive: oe((e, t) => e.activeIndex === t),
  isSelected: oe((e, t) => {
    const n = e.isItemEqualToValue, o = e.selectedValue;
    return Array.isArray(o) ? o.some((r) => Nt(t, r, n)) : Nt(t, o, n);
  }),
  transitionStatus: oe((e) => e.transitionStatus),
  popupProps: oe((e) => e.popupProps),
  inputProps: oe((e) => e.inputProps),
  triggerProps: oe((e) => e.triggerProps),
  itemProps: oe((e) => e.itemProps),
  positionerElement: oe((e) => e.positionerElement),
  listElement: oe((e) => e.listElement),
  popupId: oe((e) => e.popupId),
  triggerElement: oe((e) => e.triggerElement),
  inputElement: oe((e) => e.inputElement),
  inputGroupElement: oe((e) => e.inputGroupElement),
  popupSide: oe((e) => e.popupSide),
  openMethod: oe((e) => e.openMethod),
  inputInsidePopup: oe((e) => e.inputInsidePopup),
  inputOwnsFormValue: oe((e) => e.inputOwnsFormValue),
  selectionMode: oe((e) => e.selectionMode),
  name: oe((e) => e.name),
  form: oe((e) => e.form),
  disabled: oe((e) => e.disabled),
  readOnly: oe((e) => e.readOnly),
  required: oe((e) => e.required),
  grid: oe((e) => e.grid),
  virtualized: oe((e) => e.virtualized),
  itemToStringLabel: oe((e) => e.itemToStringLabel),
  isItemEqualToValue: oe((e) => e.isItemEqualToValue),
  modal: oe((e) => e.modal),
  autoHighlight: oe((e) => e.autoHighlight),
  submitOnItemClick: oe((e) => e.submitOnItemClick)
};
let Zr = /* @__PURE__ */ (function(e) {
  return e.disabled = "data-disabled", e.valid = "data-valid", e.invalid = "data-invalid", e.touched = "data-touched", e.dirty = "data-dirty", e.filled = "data-filled", e.focused = "data-focused", e;
})({});
const Il = {
  badInput: !1,
  customError: !1,
  patternMismatch: !1,
  rangeOverflow: !1,
  rangeUnderflow: !1,
  stepMismatch: !1,
  tooLong: !1,
  tooShort: !1,
  typeMismatch: !1,
  valid: null,
  valueMissing: !1
}, Ht = {
  valid: null,
  touched: !1,
  dirty: !1,
  filled: !1,
  focused: !1
}, wl = {
  disabled: !1,
  ...Ht
}, vl = {
  valid(e) {
    return e === null ? null : e ? {
      [Zr.valid]: ""
    } : {
      [Zr.invalid]: ""
    };
  }
}, js = {
  invalid: void 0,
  name: void 0,
  validityData: {
    state: Il,
    errors: [],
    error: "",
    value: "",
    initialValue: null
  },
  setValidityData: ve,
  disabled: void 0,
  touched: Ht.touched,
  setTouched: ve,
  dirty: Ht.dirty,
  setDirty: ve,
  filled: Ht.filled,
  setFilled: ve,
  focused: Ht.focused,
  setFocused: ve,
  validate: () => null,
  validationMode: "onSubmit",
  validationDebounceTime: 0,
  shouldValidateOnChange: () => !1,
  state: wl,
  markedDirtyRef: {
    current: !1
  },
  registerFieldControl: ve,
  validation: {
    getValidationProps: (e, t = nt) => t,
    inputRef: {
      current: null
    },
    registerInput: ve,
    commit: async () => {
    },
    change: ve
  }
}, lr = /* @__PURE__ */ i.createContext(js);
process.env.NODE_ENV !== "production" && (lr.displayName = "FieldRootContext");
function gn(e = !0) {
  const t = i.useContext(lr);
  if (t.setValidityData === ve && !e)
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: FieldRootContext is missing. Field parts must be placed within <Field.Root>." : ft(28));
  return t;
}
function Sl(e, t, n, o, r = !0, s) {
  const {
    registerFieldControl: c
  } = gn(), u = i.useRef(null);
  u.current || (u.current = Symbol()), Y(() => {
    const y = u.current;
    return !y || !r ? void 0 : (c(y, {
      controlRef: e,
      getValue: o,
      id: t,
      name: s,
      value: n
    }), () => {
      c(y, void 0);
    });
  }, [e, r, o, t, s, c, n]);
}
const Xs = /* @__PURE__ */ i.createContext({
  formRef: {
    current: {
      fields: /* @__PURE__ */ new Map()
    }
  },
  errors: {},
  clearErrors: ve,
  validationMode: "onSubmit",
  submitAttemptedRef: {
    current: !1
  }
});
process.env.NODE_ENV !== "production" && (Xs.displayName = "FormContext");
function Ol() {
  return i.useContext(Xs);
}
const Qs = /* @__PURE__ */ i.createContext({
  controlId: void 0,
  registerControlId: ve,
  labelId: void 0,
  setLabelId: ve,
  messageIds: [],
  setMessageIds: ve,
  getDescriptionProps: (e) => e
});
process.env.NODE_ENV !== "production" && (Qs.displayName = "LabelableContext");
function ar() {
  return i.useContext(Qs);
}
function Js(e = {}) {
  const {
    id: t,
    implicit: n = !1,
    controlRef: o
  } = e, {
    controlId: r,
    registerControlId: s
  } = ar(), c = zo(t), u = n ? r : void 0, y = at(() => Symbol("labelable-control")), l = i.useRef(!1), a = i.useRef(t != null), b = ee(() => {
    !l.current || s === ve || (l.current = !1, s(y.current, void 0));
  });
  return Y(() => {
    if (s === ve)
      return;
    let d;
    if (n) {
      const C = o?.current;
      it(C) && C.closest("label") != null ? d = t ?? null : d = u ?? c;
    } else if (t != null)
      a.current = !0, d = t;
    else if (a.current)
      d = c;
    else {
      b();
      return;
    }
    if (d === void 0) {
      b();
      return;
    }
    l.current = !0, s(y.current, d);
  }, [t, o, u, s, n, c, y, b]), i.useEffect(() => b, [b]), r ?? c;
}
function Zs(e) {
  return e == null ? void 0 : `${e}-popup`;
}
function Pl(e, t) {
  return (n, o) => {
    if (n == null)
      return !1;
    const r = Qe(n, t);
    return e.contains(r, o);
  };
}
function Nl(e, t, n) {
  return (o, r) => {
    if (o == null)
      return !1;
    if (!r)
      return !0;
    const s = Qe(o, t), c = n != null ? Qe(n, t) : "";
    return c && e.contains(c, r) && c.length === r.length ? !0 : e.contains(s, r);
  };
}
function ei(e) {
  return Array.isArray(e) ? e.map((t) => ei(t)).join(",") : e == null ? "" : String(e);
}
const es = /* @__PURE__ */ new Map();
function Tl(e = {}) {
  const t = {
    usage: "search",
    sensitivity: "base",
    ignorePunctuation: !0,
    ...e
  }, n = `${ei(e.locale)}|${JSON.stringify(t)}`, o = es.get(n);
  if (o)
    return o;
  const r = new Intl.Collator(e.locale, t), s = {
    contains(c, u, y) {
      if (!u)
        return !0;
      const l = Qe(c, y);
      for (let a = 0; a <= l.length - u.length; a += 1)
        if (r.compare(l.slice(a, a + u.length), u) === 0)
          return !0;
      return !1;
    },
    startsWith(c, u, y) {
      if (!u)
        return !0;
      const l = Qe(c, y);
      return r.compare(l.slice(0, u.length), u) === 0;
    },
    endsWith(c, u, y) {
      if (!u)
        return !0;
      const l = Qe(c, y), a = u.length;
      return l.length >= a && r.compare(l.slice(l.length - a), u) === 0;
    }
  };
  return es.set(n, s), s;
}
const kl = Tl;
function Al(e, t, n = (o, r) => o === r) {
  return e.length === t.length && e.every((o, r) => n(o, t[r]));
}
const ti = Symbol("none"), Mt = {
  value: ti,
  index: -1
};
function Ml(e) {
  const {
    id: t,
    onOpenChangeComplete: n,
    defaultSelectedValue: o = null,
    selectedValue: r,
    onSelectedValueChange: s,
    defaultInputValue: c,
    inputValue: u,
    open: y,
    defaultOpen: l = !1,
    selectionMode: a = "none",
    onItemHighlighted: b,
    name: d,
    form: C,
    disabled: g = !1,
    readOnly: x = !1,
    required: E = !1,
    inputRef: m,
    grid: I = !1,
    items: f,
    filteredItems: h,
    filter: w,
    openOnInputClick: D = !0,
    autoHighlight: M = !1,
    keepHighlight: N = !1,
    highlightItemOnHover: P = !0,
    loopFocus: V = !0,
    itemToStringLabel: B,
    itemToStringValue: T,
    isItemEqualToValue: v = yl,
    virtualized: k = !1,
    inline: X = !1,
    fillInputOnItemPress: te = !0,
    modal: G = !1,
    limit: _ = -1,
    autoComplete: me = "list",
    formAutoComplete: J,
    locale: ie,
    submitOnItemClick: K = !1
  } = e, {
    clearErrors: Re
  } = Ol(), {
    setDirty: Q,
    validityData: fe,
    setFilled: we,
    name: Be,
    disabled: j,
    setTouched: Se,
    setFocused: ke,
    validationMode: $e,
    validation: W
  } = gn(), he = Kn(), de = Js({
    id: t
  }), ye = kl({
    locale: ie
  }), [Ee, $] = i.useState(!1), [re, U] = i.useState(null), ge = i.useRef([]), se = i.useRef([]), Z = i.useRef(null), Ce = i.useRef(null), R = i.useRef(null), p = i.useRef(null), L = i.useRef(null), A = i.useRef(!0), z = i.useRef(!1), Ae = i.useRef(null), Oe = i.useRef(null), pe = i.useRef(null), xe = i.useRef(Mt), Ne = i.useRef(null), Ue = i.useRef([]), dt = i.useRef([]), Ge = j || g, Ze = Be ?? d, He = a === "multiple", ce = a === "single", De = u !== void 0 || c !== void 0, _e = f !== void 0, ze = h !== void 0;
  let Me;
  M === "always" ? Me = "always" : Me = M ? "input-change" : !1;
  const [ne, It] = xo({
    controlled: r,
    default: He ? o ?? en : o,
    name: "Combobox",
    state: "selectedValue"
  }), pt = i.useMemo(() => w === null ? () => !0 : w !== void 0 ? w : ce && !Ee ? Nl(ye, B, ne) : Pl(ye, B), [w, ce, ne, Ee, ye, B]), kt = at(() => De ? c ?? "" : ce ? Qe(ne, B) : "").current, [We, Kt] = xo({
    controlled: u,
    default: kt,
    name: "Combobox",
    state: "inputValue"
  }), [Ve, to] = xo({
    controlled: y,
    default: l,
    name: "Combobox",
    state: "open"
  }), rt = ur(f), Ke = re ?? (We === "" ? "" : String(We).trim()), zt = ce ? Qe(ne, B) : "", bn = ce && !Ee && Ke !== "" && zt !== "" && zt.length === Ke.length && ye.contains(zt, Ke), mt = bn ? "" : Ke, yn = _e && ze && bn, St = i.useMemo(() => f ? rt ? f.flatMap((F) => F.items) : f : en, [f, rt]), At = i.useMemo(() => {
    if (h && !yn)
      return h;
    if (!f)
      return en;
    if (rt) {
      const q = f, be = [];
      let Ie = 0;
      for (const qe of q) {
        if (_ > -1 && Ie >= _)
          break;
        const Le = mt === "" ? qe.items : qe.items.filter((jt) => pt(jt, mt, B));
        if (Le.length === 0)
          continue;
        const et = _ > -1 ? _ - Ie : 1 / 0, Ct = Le.slice(0, et);
        if (Ct.length > 0) {
          const jt = {
            ...qe,
            items: Ct
          };
          be.push(jt), Ie += Ct.length;
        }
      }
      return be;
    }
    if (mt === "")
      return _ > -1 ? St.slice(0, _) : (
        // The cast here is done as `flatItems` is readonly.
        // valuesRef.current, a mutable ref, can be set to `flatFilteredItems`, which may
        // reference this exact readonly value, creating a mutation risk.
        // However, <Combobox.Item> can never mutate this value as the mutating effect
        // bails early when `items` is provided, and this is only ever returned
        // when `items` is provided due to the early return at the top of this hook.
        St
      );
    const F = [];
    for (const q of St) {
      if (_ > -1 && F.length >= _)
        break;
      pt(q, mt, B) && F.push(q);
    }
    return F;
  }, [h, yn, f, rt, mt, _, pt, B, St]), ht = i.useMemo(() => rt ? At.flatMap((q) => q.items) : At, [At, rt]), le = at(() => new Ws({
    id: de,
    labelId: void 0,
    selectedValue: ne,
    open: Ve,
    filter: pt,
    query: Ke,
    items: f,
    selectionMode: a,
    listRef: ge,
    labelsRef: se,
    popupRef: Z,
    emptyRef: L,
    inputRef: Ce,
    startDismissRef: R,
    endDismissRef: p,
    keyboardActiveRef: A,
    chipsContainerRef: Ae,
    clearRef: Oe,
    valuesRef: Ue,
    allValuesRef: dt,
    selectionEventRef: pe,
    name: Ze,
    form: C,
    disabled: Ge,
    readOnly: x,
    required: E,
    grid: I,
    isGrouped: rt,
    virtualized: k,
    openOnInputClick: D,
    itemToStringLabel: B,
    isItemEqualToValue: v,
    modal: G,
    autoHighlight: Me,
    submitOnItemClick: K,
    hasInputValue: De,
    mounted: !1,
    forceMounted: !1,
    transitionStatus: "idle",
    inline: X,
    activeIndex: null,
    selectedIndex: null,
    popupProps: {},
    inputProps: {},
    triggerProps: {},
    itemProps: nt,
    positionerElement: null,
    listElement: null,
    popupId: void 0,
    triggerElement: null,
    inputElement: null,
    inputGroupElement: null,
    popupSide: null,
    openMethod: null,
    inputInsidePopup: !0,
    // Avoid duplicate names in the server HTML. Popup inputs aren't rendered
    // until after hydration, so the hidden input takes over then if needed.
    inputOwnsFormValue: a === "none",
    onOpenChangeComplete: n || ve,
    // Placeholder callbacks replaced on first render
    setOpen: ve,
    setInputValue: ve,
    setSelectedValue: ve,
    setIndices: ve,
    onItemHighlighted: ve,
    handleSelection: ve,
    forceMount: ve,
    requestSubmit: ve
  })).current, _t = a === "none" ? We : ne, Oi = i.useMemo(() => a === "none" ? _t : Array.isArray(ne) ? ne.map((F) => Zt(F, T)) : Zt(ne, T), [_t, T, a, ne]), no = ee(b), oo = ee(n), xn = S(le, O.activeIndex), Pi = S(le, O.selectedIndex), En = S(le, O.positionerElement), Cr = S(le, O.listElement), qt = S(le, O.triggerElement), Cn = S(le, O.inputElement), Ni = S(le, O.inputGroupElement), st = S(le, O.inline), Et = S(le, O.inputInsidePopup), Ti = S(le, O.inputOwnsFormValue), ki = tt(qt), {
    mounted: Rr,
    setMounted: Ai,
    transitionStatus: ro
  } = Yo(Ve), {
    openMethod: Ir,
    triggerProps: so
  } = hl(Ve), Mi = ee(() => Oi);
  Sl(Et ? ki : Ce, de, _t, Mi, !Ge, d);
  const Rn = ee(() => {
    f ? se.current = ht.map((F) => Qe(F, B)) : le.set("forceMounted", !0);
  }), Vi = i.useRef(ne);
  Y(() => {
    ne !== Vi.current && Rn();
  }, [Rn, ne]);
  const gt = ee((F) => {
    le.update(F);
    const q = F.type || "none";
    if (F.activeIndex !== void 0)
      if (F.activeIndex === null)
        xe.current !== Mt && (xe.current = Mt, no(void 0, Xt(q, void 0, {
          index: -1
        })));
      else {
        const be = Ue.current[F.activeIndex];
        xe.current = {
          value: be,
          index: F.activeIndex
        }, no(be, Xt(q, void 0, {
          index: F.activeIndex
        }));
      }
  }), bt = ee((F, q) => {
    if (z.current = q.reason === vt, e.onInputValueChange?.(F, q), !q.isCanceled) {
      if (q.reason === Bt) {
        const be = q.event, Ie = be.inputType;
        if (be.type === "compositionend" || Ie != null && Ie !== "" && Ie !== "insertReplacementText") {
          const Le = F.trim() !== "";
          Le && $(!0), Ne.current = {
            hasQuery: Le
          }, Le && Me && le.state.activeIndex == null && le.set("activeIndex", 0);
        }
      }
      Kt(F);
    }
  }), Yt = ee((F, q) => {
    if (Ve !== F && (q.reason === "escape-key" && _e && ht.length === 0 && !le.state.emptyRef.current && q.allowPropagation(), e.onOpenChange?.(F, q), !q.isCanceled && (F && He && Et && !st && re !== null && ($(!1), U(null), We !== "" && bt("", ae(vt, q.event))), !F && Ee && (ce ? (st || U(Ke), Ke === "" && $(!1)) : He && (st || U(Ke), Et && gt({
      activeIndex: null
    }), (!Et || st) && bt("", ae(vt, q.event)))), to(F), !F && Et && (q.reason === zn || q.reason === qo) && (Se(!0), ke(!1), $e === "onBlur")))) {
      const be = a === "none" ? We : ne;
      W.commit(be);
    }
  }), In = ee((F, q) => {
    if (s?.(F, q), q.isCanceled)
      return;
    It(F), (a === "none" && Z.current && te || ce && !le.state.inputInsidePopup) && bt(Qe(F, B), ae(q.reason, q.event)), ce && F != null && q.reason !== Bt && Ee && !st && U(Ke);
  }), Di = ee((F, q) => {
    let be = q;
    if (be === void 0) {
      if (xn === null)
        return;
      be = Ue.current[xn];
    }
    const Ie = ot(F), qe = pe.current ?? F;
    pe.current = null;
    const Le = ae(Uc, qe), et = Ie?.closest("a")?.getAttribute("href");
    if (et) {
      et.startsWith("#") && Yt(!1, Le);
      return;
    }
    if (He) {
      const Ct = Array.isArray(ne) ? ne : [], ho = xl(Ct, be, le.state.isItemEqualToValue) ? El(Ct, be, le.state.isItemEqualToValue) : [...Ct, be];
      if (In(ho, Le), Le.isCanceled || !(Ce.current ? Ce.current.value.trim() !== "" : !1))
        return;
      le.state.inputInsidePopup ? bt("", ae(vt, Le.event)) : Yt(!1, Le);
    } else {
      if (In(be, Le), Le.isCanceled)
        return;
      Yt(!1, Le);
    }
  }), io = ee(() => {
    if (!le.state.submitOnItemClick)
      return;
    const F = W.inputRef.current?.form ?? le.state.inputElement?.form;
    F && typeof F.requestSubmit == "function" && F.requestSubmit();
  }), co = ee(() => {
    if (Ai(!1), oo?.(!1), $(!1), U(null), gt(a === "none" ? {
      activeIndex: null,
      selectedIndex: null
    } : {
      activeIndex: null
    }), He && Ce.current && Ce.current.value !== "" && !z.current && bt("", ae(vt)), ce)
      if (le.state.inputInsidePopup)
        Ce.current && Ce.current.value !== "" && bt("", ae(vt));
      else {
        const F = Qe(ne, B);
        Ce.current && Ce.current.value !== F && bt(F, ae(F === "" ? vt : yt));
      }
  }), Fi = i.useMemo(() => st && En ? {
    current: En.closest('[role="dialog"]')
  } : Z, [st, En]);
  qn({
    enabled: !e.actionsRef,
    open: Ve,
    ref: Fi,
    onComplete() {
      Ve || co();
    }
  }), i.useImperativeHandle(e.actionsRef, () => ({
    unmount: co
  }), [co]), Y(function() {
    if (Ve || a === "none")
      return;
    const q = f ? St : dt.current;
    if (He) {
      const be = Array.isArray(ne) ? ne : [], Ie = be[be.length - 1], qe = Gn(q, Ie, v);
      gt({
        selectedIndex: qe === -1 ? null : qe
      });
    } else {
      const be = Gn(q, ne, v);
      gt({
        selectedIndex: be === -1 ? null : be
      });
    }
  }, [Ve, ne, f, a, St, He, v, gt]), Y(() => {
    f && (Ue.current = ht, ge.current.length = ht.length);
  }, [f, ht]), Y(() => {
    const F = Ne.current;
    if (F && (F.hasQuery ? Me && le.set("activeIndex", 0) : Me === "always" && le.set("activeIndex", 0), Ne.current = null), !Ve && !st)
      return;
    const be = _e || ze ? ht : Ue.current, Ie = le.state.activeIndex;
    if (Ie == null) {
      if (Me === "always" && be.length > 0) {
        le.set("activeIndex", 0);
        return;
      }
      xe.current !== Mt && (xe.current = Mt, le.state.onItemHighlighted(void 0, Xt(yt, void 0, {
        index: -1
      })));
      return;
    }
    if (Ie >= be.length) {
      xe.current !== Mt && (xe.current = Mt, le.state.onItemHighlighted(void 0, Xt(yt, void 0, {
        index: -1
      }))), le.set("activeIndex", null);
      return;
    }
    const qe = be[Ie], Le = xe.current.value, et = Le !== ti && Nt(qe, Le, le.state.isItemEqualToValue);
    (xe.current.index !== Ie || !et) && (xe.current = {
      value: qe,
      index: Ie
    }, le.state.onItemHighlighted(qe, Xt(yt, void 0, {
      index: Ie
    })));
  }, [xn, Me, ze, _e, ht, st, Ve, le]), Y(() => {
    if (a === "none") {
      we(String(We) !== "");
      return;
    }
    we(He ? Array.isArray(ne) && ne.length > 0 : ne != null);
  }, [we, a, We, ne, He]), i.useEffect(() => {
    _e && Me && ht.length === 0 && gt({
      activeIndex: null
    });
  }, [_e, Me, ht.length, gt]);
  function _i(F) {
    const q = fe.initialValue;
    return Array.isArray(F) && Array.isArray(q) ? !Al(F, q, (be, Ie) => Nt(be, Ie, v)) : F !== q;
  }
  nn(Ke, () => {
    !Ve || Ke === "" || Ke === String(kt) || $(!0);
  }), nn(ne, () => {
    if (a !== "none" && (Re(Ze), Q(_i(ne)), W.change(ne), ce && !De && !Et)) {
      const F = Qe(ne, B);
      We !== F && bt(F, ae(yt));
    }
  }), nn(We, () => {
    a === "none" && (Re(Ze), Q(We !== fe.initialValue), W.change(We));
  }), nn(f, () => {
    if (!ce || De || Et || Ee)
      return;
    const F = Qe(ne, B);
    We !== F && bt(F, ae(yt));
  });
  const wn = Ks({
    open: st ? !0 : Ve,
    onOpenChange: Yt,
    elements: {
      reference: Et ? qt : Cn,
      floating: En
    }
  });
  let uo, lo;
  st || (uo = I ? "grid" : "listbox", lo = Ve ? "true" : "false");
  const vn = i.useMemo(() => {
    const F = Cn?.tagName === "INPUT", q = Cn == null || F, be = q || Ve, Ie = q ? {
      autoComplete: "off",
      spellCheck: "false",
      autoCorrect: "off",
      autoCapitalize: "none"
    } : {};
    return be && (Ie.role = "combobox", Ie["aria-expanded"] = lo, Ie["aria-haspopup"] = uo, Ie["aria-controls"] = Ve ? Cr?.id : void 0, Ie["aria-autocomplete"] = me), {
      reference: Ie,
      floating: {
        role: "presentation"
      }
    };
  }, [Cn, Ve, lo, uo, Cr?.id, me]), wr = Gs(wn, {
    enabled: !x && !Ge && D,
    event: "mousedown-only",
    toggle: !1,
    // Apply a small delay for touch to let mobile viewport/keyboard positioning settle.
    // This avoids top-bottom flip flickers if the preferred position is "top" when first tapping.
    touchOpenDelay: Et ? 0 : 100,
    reason: ms
  }), Sn = $u(wn, {
    enabled: !x && !Ge && !st,
    outsidePressEvent: {
      mouse: "sloppy",
      // The visual viewport (affected by the mobile software keyboard) can be
      // somewhat small. The user may want to scroll the screen to see more of
      // the popup.
      touch: "intentional"
    },
    // Without a popup, let the Escape key bubble the event up to other popups' handlers.
    bubbles: st ? !0 : void 0,
    outsidePress(F) {
      const q = ot(F);
      return !ue(qt, q) && !ue(Oe.current, q) && !ue(Ae.current, q) && !ue(Ni, q);
    }
  }), Lt = ol(wn, {
    enabled: !x && !Ge,
    id: de,
    listRef: ge,
    activeIndex: xn,
    selectedIndex: Pi,
    virtual: !0,
    loopFocus: V,
    allowEscape: V && !Me,
    focusItemOnOpen: Ee || a === "none" && !Me ? !1 : "auto",
    focusItemOnHover: P,
    resetOnPointerLeave: !N,
    orientation: I ? "horizontal" : void 0,
    rtl: he === "rtl",
    disabledIndices: en,
    grid: I ? gl : void 0,
    onNavigate(F, q) {
      !q && !Ve || ro === "ending" || gt(q ? {
        activeIndex: F,
        type: A.current ? "keyboard" : "pointer"
      } : {
        activeIndex: F
      });
    }
  }), ao = i.useMemo(() => sn(Lt.reference, {
    onKeyDown(F) {
      I && le.state.activeIndex == null && (F.key === "ArrowLeft" || F.key === "ArrowRight") && F.preventBaseUIHandler();
    }
  }, Sn.reference, wr.reference, vn.reference), [Lt.reference, Sn.reference, wr.reference, vn.reference, I, le]), fo = i.useMemo(() => sn(Qu, Lt.floating, Sn.floating, vn.floating), [Lt.floating, Sn.floating, vn.floating]), po = i.useMemo(() => {
    const F = Lt.item;
    return F ? {
      ...F,
      onFocus: void 0
    } : nt;
  }, [Lt.item]);
  eu(() => {
    le.update({
      inline: X,
      popupProps: fo,
      inputProps: ao,
      triggerProps: so,
      itemProps: po,
      setOpen: Yt,
      setInputValue: bt,
      setSelectedValue: In,
      setIndices: gt,
      onItemHighlighted: no,
      handleSelection: Di,
      forceMount: Rn,
      requestSubmit: io
    });
  }), Y(() => {
    le.update({
      id: de,
      selectedValue: ne,
      open: Ve,
      mounted: Rr,
      transitionStatus: ro,
      items: f,
      inline: X,
      popupProps: fo,
      inputProps: ao,
      triggerProps: so,
      openMethod: Ir,
      itemProps: po,
      selectionMode: a,
      name: Ze,
      form: C,
      disabled: Ge,
      readOnly: x,
      required: E,
      grid: I,
      isGrouped: rt,
      virtualized: k,
      onOpenChangeComplete: oo,
      openOnInputClick: D,
      itemToStringLabel: B,
      modal: G,
      autoHighlight: Me,
      isItemEqualToValue: v,
      submitOnItemClick: K,
      hasInputValue: De,
      requestSubmit: io,
      inputOwnsFormValue: a === "none" && (X || !le.state.inputInsidePopup)
    });
  }, [le, de, ne, Ve, Rr, ro, f, fo, ao, po, Ir, so, a, Ze, Ge, x, E, W, I, rt, k, oo, D, B, G, v, K, De, X, io, Me, C]);
  const Li = Ut(m, W.inputRef), Bi = i.useMemo(() => ({
    query: Ke,
    hasItems: _e,
    filteredItems: At,
    flatFilteredItems: ht
  }), [Ke, _e, At, ht]), Hi = i.useMemo(() => Array.isArray(_t) ? "" : Zt(_t, T), [_t, T]), $i = He && Array.isArray(ne) && ne.length > 0, mo = He || a === "none" && Ti ? void 0 : Ze, Ui = i.useMemo(() => !He || !Array.isArray(ne) || !Ze ? null : ne.map((F) => {
    const q = Zt(F, T);
    return /* @__PURE__ */ H("input", {
      type: "hidden",
      form: C,
      name: Ze,
      value: q,
      disabled: Ge
    }, q);
  }), [He, ne, C, Ze, T, Ge]), Gi = /* @__PURE__ */ lt(i.Fragment, {
    children: [e.children, /* @__PURE__ */ H("input", {
      ...W.getValidationProps(Ge, {
        // Move focus when the hidden input is focused.
        onFocus() {
          if (Et) {
            qt?.focus();
            return;
          }
          (Ce.current || qt)?.focus();
        },
        // Handle browser autofill.
        onChange(F) {
          if (F.nativeEvent.defaultPrevented || Ge || x)
            return;
          const q = F.currentTarget.value, be = q.toLowerCase(), Ie = ae(yt, F.nativeEvent), qe = () => Ue.current.findIndex((et) => Zt(et, T).toLowerCase() === be || Qe(et, B).toLowerCase() === be);
          function Le() {
            if (He)
              return;
            if (a === "none") {
              bt(q, Ie);
              return;
            }
            let et = qe();
            et === -1 && (et = Ue.current.findIndex((jt, ho) => {
              const go = se.current[ho];
              return go != null && go.toLowerCase() === be;
            }));
            const Ct = et === -1 ? void 0 : Ue.current[et];
            Ct != null && In?.(Ct, Ie);
          }
          ce && (Rn(), f && qe() === -1 && le.set("forceMounted", !0)), queueMicrotask(Le);
        }
      }),
      id: de && mo == null ? `${de}-hidden-input` : void 0,
      form: C,
      name: mo,
      autoComplete: J,
      disabled: Ge,
      required: E && !$i,
      readOnly: x,
      value: Hi,
      ref: Li,
      style: mo ? Ss : vs,
      tabIndex: -1,
      "aria-hidden": !0,
      suppressHydrationWarning: !0
    }), Ui]
  });
  return /* @__PURE__ */ H(nr.Provider, {
    value: le,
    children: /* @__PURE__ */ H(or.Provider, {
      value: wn,
      children: /* @__PURE__ */ H(sr.Provider, {
        value: _e,
        children: /* @__PURE__ */ H(rr.Provider, {
          value: Bi,
          children: /* @__PURE__ */ H(ir.Provider, {
            value: We,
            children: Gi
          })
        })
      })
    })
  });
}
const ni = {
  ...fl,
  ...vl,
  popupSide: (e) => e ? {
    "data-popup-side": e
  } : null,
  listEmpty: (e) => e ? {
    "data-list-empty": ""
  } : null
};
function Vl(e) {
  const t = e.getBoundingClientRect(), n = Gt(e);
  if (Es)
    return t;
  const o = n.getComputedStyle(e, "::before"), r = n.getComputedStyle(e, "::after");
  if (!(o.content !== "none" || r.content !== "none"))
    return t;
  const c = parseFloat(o.width) || 0, u = parseFloat(o.height) || 0, y = parseFloat(r.width) || 0, l = parseFloat(r.height) || 0, a = Math.max(t.width, c, y), b = Math.max(t.height, u, l), d = a - t.width, C = b - t.height;
  return {
    left: t.left - d / 2,
    right: t.right + d / 2,
    top: t.top - C / 2,
    bottom: t.bottom + C / 2
  };
}
function oi(e, t) {
  return e ?? t;
}
const Mn = 2, ri = /* @__PURE__ */ i.forwardRef(function(t, n) {
  const {
    render: o,
    className: r,
    nativeButton: s = !0,
    disabled: c = !1,
    id: u,
    style: y,
    ...l
  } = t, {
    state: a,
    disabled: b,
    setTouched: d,
    setFocused: C,
    validationMode: g,
    validation: x
  } = gn(), {
    labelId: E
  } = ar(), m = je(), {
    filteredItems: I
  } = Tt(), f = S(m, O.selectionMode), h = S(m, O.disabled), w = S(m, O.readOnly), D = S(m, O.required), M = S(m, O.mounted), N = S(m, O.popupSide), P = S(m, O.positionerElement), V = S(m, O.listElement), B = S(m, O.popupId), T = S(m, O.triggerProps), v = S(m, O.triggerElement), k = S(m, O.inputInsidePopup), X = S(m, O.id), te = S(m, O.labelId), G = S(m, O.open), _ = S(m, O.selectedValue), me = S(m, O.activeIndex), J = S(m, O.selectedIndex), ie = S(m, O.hasSelectedValue), K = eo(), Re = cr(), Q = Pt(), fe = b || h || c, we = I.length === 0, Be = M && P ? N : null;
  Js({
    id: k ? u : void 0
  });
  const j = k ? u ?? X : u, Se = oi(E, te);
  let ke;
  G && k ? ke = B ?? Zs(X) : G && (ke = V?.id);
  const $e = i.useRef("");
  function W(se) {
    $e.current = se.pointerType;
  }
  const he = K.useState("domReferenceElement");
  i.useEffect(() => {
    k && v && v !== he && K.set("domReferenceElement", v);
  }, [v, he, K, k]);
  const {
    reference: de
  } = rl(K, {
    enabled: !G && !w && !h && f === "single",
    listRef: m.state.labelsRef,
    activeIndex: me,
    selectedIndex: J,
    onMatch(se) {
      const Z = m.state.valuesRef.current[se];
      Z !== void 0 && m.state.setSelectedValue(Z, ae("none"));
    }
  }), {
    reference: ye
  } = Gs(K, {
    enabled: !w && !h,
    event: "mousedown"
  }), {
    buttonRef: Ee,
    getButtonProps: $
  } = mn({
    native: s,
    disabled: fe
  }), re = {
    ...a,
    open: G,
    disabled: fe,
    popupSide: Be,
    listEmpty: we,
    placeholder: f === "none" ? !1 : !ie
  }, U = ee((se) => {
    m.set("triggerElement", se);
  });
  return Ye("button", t, {
    ref: [n, Ee, U],
    state: re,
    props: [T, ye, de, {
      id: j,
      tabIndex: k ? 0 : -1,
      role: k ? "combobox" : void 0,
      "aria-expanded": G ? "true" : "false",
      "aria-haspopup": k ? "dialog" : "listbox",
      "aria-controls": ke,
      "aria-required": k && D || void 0,
      "aria-labelledby": Se,
      onPointerDown: W,
      onPointerEnter: W,
      onFocus() {
        C(!0), !(fe || w) && Q.start(0, m.state.forceMount);
      },
      onBlur(se) {
        if (!ue(P, se.relatedTarget) && (d(!0), C(!1), g === "onBlur")) {
          const Z = f === "none" ? Re : _;
          x.commit(Z);
        }
      },
      onMouseDown(se) {
        if (fe || w || (k || K.set("domReferenceElement", se.currentTarget), m.state.forceMount(), $e.current !== "touch" && (m.state.inputRef.current?.focus(), k || se.preventDefault()), G))
          return;
        const Z = Te(se.currentTarget);
        function Ce(R) {
          if (!v)
            return;
          const p = ot(R), L = m.state.positionerElement, A = m.state.listElement;
          if (ue(v, p) || ue(L, p) || ue(A, p) || p === v)
            return;
          const z = Vl(v), Ae = R.clientX >= z.left - Mn && R.clientX <= z.right + Mn, Oe = R.clientY >= z.top - Mn && R.clientY <= z.bottom + Mn;
          Ae && Oe || m.state.setOpen(!1, ae("cancel-open", R));
        }
        k && Z.addEventListener("mouseup", Ce, {
          once: !0
        });
      },
      onKeyDown(se) {
        fe || w || (se.key === "ArrowDown" || se.key === "ArrowUp") && (Fe(se), m.state.setOpen(!0, ae(Bn, se.nativeEvent)), m.state.inputRef.current?.focus());
      }
    }, x ? x.getValidationProps(fe, l) : l, $],
    stateAttributesMapping: ni
  });
});
process.env.NODE_ENV !== "production" && (ri.displayName = "ComboboxTrigger");
const fr = /* @__PURE__ */ i.createContext(void 0);
process.env.NODE_ENV !== "production" && (fr.displayName = "ComboboxChipsContext");
function si() {
  return i.useContext(fr);
}
const dr = /* @__PURE__ */ i.createContext(void 0);
process.env.NODE_ENV !== "production" && (dr.displayName = "ComboboxPositionerContext");
function pr(e) {
  const t = i.useContext(dr);
  if (t === void 0 && !e)
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: <Combobox.Popup> and <Combobox.Arrow> must be used within the <Combobox.Positioner> component" : ft(21));
  return t;
}
const mr = /* @__PURE__ */ i.forwardRef(function(t, n) {
  const o = je(), {
    buttonRef: r,
    getButtonProps: s
  } = mn({
    native: !1
  }), c = Ut(n, r);
  function u(l) {
    o.state.setOpen(!1, ae(Gc, l.nativeEvent, l.currentTarget));
  }
  const y = s({
    onClick: u
  });
  return /* @__PURE__ */ H("span", {
    ref: c,
    ...y,
    "aria-label": "Dismiss",
    tabIndex: void 0,
    style: Ss
  });
});
process.env.NODE_ENV !== "production" && (mr.displayName = "ComboboxInternalDismissButton");
const hr = /* @__PURE__ */ i.forwardRef(function(t, n) {
  const {
    render: o,
    className: r,
    disabled: s = !1,
    id: c,
    style: u,
    ...y
  } = t, {
    state: l,
    disabled: a,
    setTouched: b,
    setFocused: d,
    validationMode: C,
    validation: g
  } = gn(), {
    labelId: x
  } = ar(), E = si(), I = !!pr(!0), f = je(), {
    filteredItems: h
  } = Tt(), w = cr(), D = Kn(), M = S(f, O.required), N = S(f, O.disabled), P = S(f, O.readOnly), V = S(f, O.name), B = S(f, O.form), T = S(f, O.selectionMode), v = S(f, O.autoHighlight), k = S(f, O.inputProps), X = S(f, O.triggerProps), te = S(f, O.open), G = S(f, O.mounted), _ = S(f, O.selectedValue), me = S(f, O.popupSide), J = S(f, O.positionerElement), ie = S(f, O.id), K = S(f, O.inline), Re = S(f, O.modal), Q = !!v, fe = G && J ? me : null, we = a || N || s, Be = h.length === 0, j = I || K, Se = !j || Re, ke = zo(c ?? (j ? void 0 : ie)), $e = oi(x, void 0), W = I ? Ht : l, [he, de] = i.useState(null), ye = i.useRef(!1), Ee = i.useRef(null), $ = i.useRef(!1), re = T === "none" && !I, U = ee((p) => {
    const L = I || f.state.inline;
    L && !f.state.hasInputValue && f.state.setInputValue("", ae(yt)), f.update({
      inputElement: p,
      inputInsidePopup: L,
      inputOwnsFormValue: re
    });
  }), ge = I || !g ? y : g.getValidationProps(we, y), se = {
    ...W,
    open: te,
    disabled: we,
    readOnly: P,
    popupSide: fe,
    listEmpty: Be
  };
  function Z(p) {
    if (!E)
      return;
    let L;
    const {
      highlightedChipIndex: A
    } = E, z = E.chipsRef.current.length, Ae = D === "rtl", Oe = Ae ? "ArrowRight" : "ArrowLeft", pe = Ae ? "ArrowLeft" : "ArrowRight";
    if (A !== void 0) {
      if (p.key === Oe)
        p.preventDefault(), A > 0 ? L = A - 1 : L = void 0;
      else if (p.key === pe)
        p.preventDefault(), A < z - 1 ? L = A + 1 : L = void 0;
      else if (p.key === "Backspace" || p.key === "Delete") {
        p.preventDefault();
        const xe = A >= _.length - 1 ? _.length - 2 : A;
        L = xe >= 0 ? xe : void 0, f.state.setIndices({
          activeIndex: null,
          selectedIndex: null,
          type: "keyboard"
        });
      }
      return L;
    }
    return p.key === Oe && (p.currentTarget.selectionStart ?? 0) === 0 && _.length > 0 ? (p.preventDefault(), L = z > 0 ? z - 1 : void 0) : p.key === "Backspace" && p.currentTarget.value === "" && _.length > 0 && (f.state.setIndices({
      activeIndex: null,
      selectedIndex: null,
      type: "keyboard"
    }), p.preventDefault()), L;
  }
  const Ce = Ye("input", t, {
    state: se,
    ref: [n, f.state.inputRef, U],
    props: [k, X, {
      type: "text",
      value: t.value ?? he ?? w,
      "aria-readonly": P || void 0,
      "aria-required": M || void 0,
      "aria-labelledby": $e,
      disabled: we,
      readOnly: P,
      required: T === "none" ? M : void 0,
      form: B,
      ...re && V && {
        name: V
      },
      id: ke,
      onFocus() {
        if (d(!0), !K || !$.current)
          return;
        $.current = !1;
        const p = Ee.current;
        p == null || // `valuesRef` can be sparse, so guard against restoring a removed slot.
        !Object.hasOwn(f.state.valuesRef.current, p) || f.state.setIndices({
          activeIndex: p
        });
      },
      onBlur() {
        b(!0), d(!1);
        const p = f.state.activeIndex;
        if (K && p !== null && v !== "always" && (Ee.current = p, $.current = !0, f.state.setIndices({
          activeIndex: null
        })), C === "onBlur") {
          const L = T === "none" ? w : _;
          g.commit(L);
        }
      },
      onCompositionStart(p) {
        Hn || (ye.current = !0, de(p.currentTarget.value));
      },
      onCompositionEnd(p) {
        ye.current = !1;
        const L = p.currentTarget.value;
        de(null), f.state.setInputValue(L, ae(Bt, p.nativeEvent));
      },
      onChange(p) {
        const L = p.nativeEvent.inputType, A = !L || L === "insertReplacementText", z = ye.current || !A;
        if (ye.current) {
          const Ne = p.currentTarget.value;
          de(Ne), Ne === "" && !f.state.openOnInputClick && !f.state.inputInsidePopup && f.state.setOpen(!1, ae(vt, p.nativeEvent));
          const Ue = Ne.trim(), dt = Q && Ue !== "";
          !P && !we && Ue && z && (f.state.setOpen(!0, ae(Bt, p.nativeEvent)), Q || f.state.setIndices({
            activeIndex: null,
            selectedIndex: null,
            type: f.state.keyboardActiveRef.current ? "keyboard" : "pointer"
          })), te && f.state.activeIndex !== null && !dt && f.state.setIndices({
            activeIndex: null,
            selectedIndex: null,
            type: f.state.keyboardActiveRef.current ? "keyboard" : "pointer"
          });
          return;
        }
        const Ae = ae(Bt, p.nativeEvent);
        if (f.state.setInputValue(p.currentTarget.value, Ae), Ae.isCanceled)
          return;
        const Oe = p.currentTarget.value === "", pe = ae(vt, p.nativeEvent);
        Oe && !f.state.inputInsidePopup && (T === "single" && f.state.setSelectedValue(null, pe), f.state.openOnInputClick || f.state.setOpen(!1, pe));
        const xe = p.currentTarget.value.trim();
        !P && !we && xe && z && (f.state.setOpen(!0, ae(Bt, p.nativeEvent)), Q || f.state.setIndices({
          activeIndex: null,
          selectedIndex: null,
          type: f.state.keyboardActiveRef.current ? "keyboard" : "pointer"
        })), te && f.state.activeIndex !== null && !Q && f.state.setIndices({
          activeIndex: null,
          selectedIndex: null,
          type: f.state.keyboardActiveRef.current ? "keyboard" : "pointer"
        });
      },
      onKeyDown(p) {
        if (we || P || p.ctrlKey || p.shiftKey || p.altKey || p.metaKey)
          return;
        f.state.keyboardActiveRef.current = !0;
        const L = p.currentTarget, A = L.scrollWidth - L.clientWidth, z = D === "rtl";
        if (p.key === "Home") {
          Fe(p);
          const pe = Fr && z ? L.value.length : 0;
          L.setSelectionRange(pe, pe), L.scrollLeft = 0;
          return;
        }
        if (p.key === "End") {
          Fe(p);
          const pe = Fr && z ? 0 : L.value.length;
          L.setSelectionRange(pe, pe), L.scrollLeft = z ? -A : A;
          return;
        }
        if (!G && p.key === "Escape") {
          const pe = T === "multiple" && Array.isArray(_) ? _.length === 0 : _ === null, xe = ae(hs, p.nativeEvent), Ne = T === "multiple" ? [] : null;
          f.state.setInputValue("", xe), f.state.setSelectedValue(Ne, xe), !pe && !f.state.inline && !xe.isPropagationAllowed && p.stopPropagation();
          return;
        }
        if (E && p.key === "Backspace" && L.value === "" && E.highlightedChipIndex === void 0 && Array.isArray(_) && _.length > 0) {
          const pe = E.chipsRef.current.length, xe = pe > 0 ? pe - 1 : _.length - 1, Ne = _.filter((Ue, dt) => dt !== xe);
          f.state.setIndices({
            activeIndex: null,
            selectedIndex: null,
            type: f.state.keyboardActiveRef.current ? "keyboard" : "pointer"
          }), f.state.setSelectedValue(Ne, ae(yt, p.nativeEvent));
          return;
        }
        const Ae = E?.highlightedChipIndex !== void 0, Oe = Z(p);
        if (E?.setHighlightedChipIndex(Oe), Oe !== void 0 ? E?.chipsRef.current[Oe]?.focus() : Ae && f.state.inputRef.current?.focus(), p.which !== 229 && p.key === "Enter" && te) {
          const pe = f.state.activeIndex, xe = p.nativeEvent;
          if (pe === null) {
            if (K)
              return;
            f.state.setOpen(!1, ae(yt, xe));
            return;
          }
          Fe(p);
          const Ne = f.state.listRef.current[pe];
          Ne && (f.state.selectionEventRef.current = xe, Ne.click(), f.state.selectionEventRef.current = null);
        }
      },
      onPointerMove() {
        f.state.keyboardActiveRef.current = !1;
      },
      onPointerDown() {
        f.state.keyboardActiveRef.current = !1;
      }
    }, ge],
    stateAttributesMapping: ni
  }), R = I ? /* @__PURE__ */ H(lr.Provider, {
    value: js,
    children: Ce
  }) : Ce;
  return /* @__PURE__ */ lt(i.Fragment, {
    children: [te && Se && /* @__PURE__ */ H(mr, {
      ref: f.state.startDismissRef
    }), R]
  });
});
process.env.NODE_ENV !== "production" && (hr.displayName = "ComboboxInput");
function Dl(e, t, n, o, r) {
  if (e.baseUIHandlerPrevented || o)
    return;
  const s = ot(e.nativeEvent), c = it(s) ? s : null;
  c !== e.currentTarget && yu(c) || (e.preventDefault(), !n && (t.state.inputRef.current?.focus(), t.state.openOnInputClick && t.state.setOpen(!0, ae(ms, e.nativeEvent))));
}
const Fl = {
  ...jo,
  ...al
}, ii = /* @__PURE__ */ i.forwardRef(function(t, n) {
  const {
    render: o,
    className: r,
    disabled: s = !1,
    nativeButton: c = !0,
    keepMounted: u = !1,
    style: y,
    ...l
  } = t, {
    disabled: a
  } = gn(), b = je(), d = S(b, O.selectionMode), C = S(b, O.disabled), g = S(b, O.readOnly), x = S(b, O.open), E = S(b, O.selectedValue), m = S(b, O.hasSelectionChips), I = cr();
  let f = !1;
  d === "none" ? f = I !== "" : d === "single" ? f = E != null : f = m;
  const h = a || C || s, {
    buttonRef: w,
    getButtonProps: D
  } = mn({
    native: c,
    disabled: h
  }), {
    mounted: M,
    transitionStatus: N,
    setMounted: P
  } = Yo(f), V = {
    disabled: h,
    visible: f,
    open: x,
    transitionStatus: N
  };
  qn({
    open: f,
    ref: b.state.clearRef,
    onComplete() {
      f || P(!1);
    }
  });
  const B = Ye("button", t, {
    state: V,
    ref: [n, w, b.state.clearRef],
    props: [{
      tabIndex: -1,
      children: "x",
      // Avoid stealing focus from the input.
      onMouseDown(v) {
        v.preventDefault();
      },
      onClick(v) {
        if (h || g)
          return;
        const k = b.state.keyboardActiveRef;
        b.state.setInputValue("", ae(Mr, v.nativeEvent)), d !== "none" ? (b.state.setSelectedValue(Array.isArray(E) ? [] : null, ae(Mr, v.nativeEvent)), b.state.setIndices({
          activeIndex: null,
          selectedIndex: null,
          type: k.current ? "keyboard" : "pointer"
        })) : b.state.setIndices({
          activeIndex: null,
          type: k.current ? "keyboard" : "pointer"
        }), b.state.inputRef.current?.focus();
      }
    }, l, D],
    stateAttributesMapping: Fl
  });
  return u || M ? B : null;
});
process.env.NODE_ENV !== "production" && (ii.displayName = "ComboboxClear");
const gr = /* @__PURE__ */ i.createContext(null);
process.env.NODE_ENV !== "production" && (gr.displayName = "GroupCollectionContext");
function _l() {
  return i.useContext(gr);
}
function Ll(e) {
  const {
    children: t,
    items: n
  } = e, o = i.useMemo(() => ({
    items: n
  }), [n]);
  return /* @__PURE__ */ H(gr.Provider, {
    value: o,
    children: t
  });
}
function ci(e) {
  const {
    children: t
  } = e, {
    filteredItems: n
  } = Tt(), o = _l(), r = o ? o.items : n;
  return r ? /* @__PURE__ */ H(i.Fragment, {
    children: r.map(t)
  }) : null;
}
const ui = /* @__PURE__ */ i.forwardRef(function(t, n) {
  var o;
  const {
    render: r,
    className: s,
    style: c,
    children: u,
    ...y
  } = t, l = je(), a = eo(), b = !!pr(!0), {
    filteredItems: d,
    hasItems: C
  } = Tt(), g = S(l, O.selectionMode), x = S(l, O.grid), E = S(l, O.popupProps), m = S(l, O.virtualized), I = S(l, O.forceMounted), f = g === "multiple", h = d.length === 0, w = ee((T) => {
    l.set("positionerElement", T);
  }), D = ee((T) => {
    l.set("listElement", T);
  }), M = i.useMemo(() => typeof u == "function" ? o || (o = /* @__PURE__ */ H(ci, {
    children: u
  })) : u, [u]), N = {
    empty: h
  }, P = a.useState("floatingId"), V = Ye("div", t, {
    state: N,
    ref: [n, D, b ? null : w],
    props: [E, {
      children: M,
      tabIndex: -1,
      id: P,
      role: x ? "grid" : "listbox",
      "aria-multiselectable": f ? "true" : void 0,
      onKeyDown(T) {
        if (!(l.state.disabled || l.state.readOnly) && T.key === "Enter") {
          const v = l.state.activeIndex;
          if (v == null)
            return;
          Fe(T);
          const k = T.nativeEvent, X = l.state.listRef.current[v];
          X && (l.state.selectionEventRef.current = k, X.click(), l.state.selectionEventRef.current = null);
        }
      },
      onKeyDownCapture() {
        l.state.keyboardActiveRef.current = !0;
      },
      onPointerMoveCapture() {
        l.state.keyboardActiveRef.current = !1;
      }
    }, y]
  });
  if (m)
    return V;
  const B = C && !I ? void 0 : l.state.labelsRef;
  return /* @__PURE__ */ H(rs, {
    elementsRef: l.state.listRef,
    labelsRef: B,
    children: V
  });
});
process.env.NODE_ENV !== "production" && (ui.displayName = "ComboboxList");
const Bl = "⁠", Hl = 200;
function $l(e) {
  const t = e.ownerDocument.createTreeWalker(e, NodeFilter.SHOW_TEXT);
  let n = null;
  for (; t.nextNode(); ) {
    const o = t.currentNode;
    o.nodeValue !== "" && (n = o);
  }
  return n;
}
function Ul() {
  const e = Pt(), t = i.useRef(null);
  return i.useEffect(() => {
    if (hn)
      return;
    const n = t.current;
    if (n == null)
      return;
    const o = $l(n);
    if (o == null)
      return;
    const r = o.nodeValue ?? "", s = `${r}${Bl}`;
    return o.nodeValue = s, e.start(Hl, () => {
      o.nodeValue === s && (o.nodeValue = r);
    }), () => {
      e.clear(), o.nodeValue === s && (o.nodeValue = r);
    };
  }, [t, e]), t;
}
const br = /* @__PURE__ */ i.createContext(void 0);
process.env.NODE_ENV !== "production" && (br.displayName = "ComboboxPortalContext");
function Gl() {
  const e = i.useContext(br);
  if (e === void 0)
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: <Combobox.Portal> is missing." : ft(20));
  return e;
}
const li = /* @__PURE__ */ i.forwardRef(function(t, n) {
  const {
    keepMounted: o = !1,
    ...r
  } = t, s = je(), c = S(s, O.mounted), u = S(s, O.forceMounted);
  return c || o || u ? /* @__PURE__ */ H(br.Provider, {
    value: o,
    children: /* @__PURE__ */ H(Bs, {
      ref: n,
      ...r
    })
  }) : null;
});
process.env.NODE_ENV !== "production" && (li.displayName = "ComboboxPortal");
const Wl = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: o,
      placement: r,
      rects: s,
      platform: c,
      elements: u,
      middlewareData: y
    } = t, {
      element: l,
      padding: a = 0,
      offsetParent: b = "real"
    } = Ji(e, t) || {};
    if (l == null)
      return {};
    const d = Zi(a), C = {
      x: n,
      y: o
    }, g = ec(r), x = tc(g), E = await c.getDimensions(l), m = g === "y", I = m ? "top" : "left", f = m ? "bottom" : "right", h = m ? "clientHeight" : "clientWidth", w = s.reference[x] + s.reference[g] - C[g] - s.floating[x], D = C[g] - s.reference[g], M = b === "real" ? await c.getOffsetParent?.(l) : u.floating;
    let N = u.floating[h] || s.floating[x];
    (!N || !await c.isElement?.(M)) && (N = u.floating[h] || s.floating[x]);
    const P = w / 2 - D / 2, V = N / 2 - E[x] / 2 - 1, B = Math.min(d[I], V), T = Math.min(d[f], V), v = B, k = N - E[x] - T, X = N / 2 - E[x] / 2 + P, te = nc(v, X, k), G = !y.arrow && Ho(r) != null && X !== te && s.reference[x] / 2 - (X < v ? B : T) - E[x] / 2 < 0, _ = G ? X < v ? X - v : X - k : 0;
    return {
      [g]: C[g] + _,
      data: {
        [g]: te,
        centerOffset: X - te - _,
        ...G && {
          alignmentOffset: _
        }
      },
      reset: G
    };
  }
}), Kl = (e, t) => ({
  ...Wl(e),
  options: [e, t]
}), zl = oc().fn, ql = {
  name: "hide",
  async fn(e) {
    const {
      width: t,
      height: n,
      x: o,
      y: r
    } = e.rects.reference, s = t === 0 && n === 0 && o === 0 && r === 0;
    return {
      data: {
        referenceHidden: (await zl(e)).data?.referenceHidden || s
      }
    };
  }
}, Yl = {
  sideX: "left",
  sideY: "top"
};
function ai(e, t, n) {
  const o = e === "inline-start" || e === "inline-end";
  return {
    top: "top",
    right: o ? n ? "inline-start" : "inline-end" : "right",
    bottom: "bottom",
    left: o ? n ? "inline-end" : "inline-start" : "left"
  }[t];
}
function ts(e, t, n) {
  const {
    rects: o,
    placement: r
  } = e;
  return {
    side: ai(t, Vn(r), n),
    align: Ho(r) || "center",
    anchor: {
      width: o.reference.width,
      height: o.reference.height
    },
    positioner: {
      width: o.floating.width,
      height: o.floating.height
    }
  };
}
function jl(e) {
  const {
    // Public parameters
    anchor: t,
    positionMethod: n = "absolute",
    side: o = "bottom",
    sideOffset: r = 0,
    align: s = "center",
    alignOffset: c = 0,
    collisionBoundary: u,
    collisionPadding: y = 5,
    sticky: l = !1,
    arrowPadding: a = 5,
    disableAnchorTracking: b = !1,
    inline: d,
    // Private parameters
    keepMounted: C = !1,
    floatingRootContext: g,
    mounted: x,
    collisionAvoidance: E,
    shiftCrossAxis: m = !1,
    nodeId: I,
    adaptiveOrigin: f,
    lazyFlip: h = !1,
    externalTree: w
  } = e, [D, M] = i.useState(null);
  !x && D !== null && M(null);
  const N = E.side || "flip", P = E.align || "flip", V = E.fallbackAxisSide || "end", B = typeof t == "function" ? t : void 0, T = ee(B), v = B ? T : t, k = tt(t), X = tt(x), G = Kn() === "rtl", _ = D || {
    top: "top",
    right: "right",
    bottom: "bottom",
    left: "left",
    "inline-end": G ? "left" : "right",
    "inline-start": G ? "right" : "left"
  }[o], me = s === "center" ? _ : `${_}-${s}`;
  let J = y;
  const ie = 1, K = o === "bottom" ? ie : 0, Re = o === "top" ? ie : 0, Q = o === "right" ? ie : 0, fe = o === "left" ? ie : 0;
  typeof J == "number" ? J = {
    top: J + K,
    right: J + fe,
    bottom: J + Re,
    left: J + Q
  } : J && (J = {
    top: (J.top || 0) + K,
    right: (J.right || 0) + fe,
    bottom: (J.bottom || 0) + Re,
    left: (J.left || 0) + Q
  });
  const we = {
    boundary: u === "clipping-ancestors" ? "clippingAncestors" : u,
    padding: J
  }, Be = i.useRef(null), j = tt(r), Se = tt(c), ke = typeof r != "function" ? r : 0, $e = typeof c != "function" ? c : 0, W = [];
  d && W.push(d), W.push(ic((ce) => {
    const De = ts(ce, o, G), _e = typeof j.current == "function" ? j.current(De) : j.current, ze = typeof Se.current == "function" ? Se.current(De) : Se.current;
    return {
      mainAxis: _e,
      crossAxis: ze,
      alignmentAxis: ze
    };
  }, [ke, $e, G, o]));
  const he = P === "none" && N !== "shift", de = !he && (l || m || N === "shift"), ye = N === "none" ? null : rc({
    ...we,
    // Ensure the popup flips if it's been limited by its --available-height and it resizes.
    // Since the size() padding is smaller than the flip() padding, flip() will take precedence.
    padding: {
      top: J.top + ie,
      right: J.right + ie,
      bottom: J.bottom + ie,
      left: J.left + ie
    },
    mainAxis: !m && N === "flip",
    crossAxis: P === "flip" ? "alignment" : !1,
    fallbackAxisSideDirection: V
  }), Ee = he ? null : cc((ce) => {
    const De = Te(ce.elements.floating).documentElement;
    return {
      ...we,
      // Use the Layout Viewport to avoid shifting around when pinch-zooming
      // for context menus.
      rootBoundary: m ? {
        x: 0,
        y: 0,
        width: De.clientWidth,
        height: De.clientHeight
      } : void 0,
      mainAxis: P !== "none",
      crossAxis: de,
      limiter: l || m ? void 0 : uc((_e) => {
        if (!Be.current)
          return {};
        const {
          width: ze,
          height: Me
        } = Be.current.getBoundingClientRect(), ne = Sr(Vn(_e.placement)), It = ne === "y" ? ze : Me, pt = ne === "y" ? J.left + J.right : J.top + J.bottom;
        return {
          offset: It / 2 + pt / 2
        };
      })
    };
  }, [we, l, m, J, P]);
  N === "shift" || P === "shift" || s === "center" ? W.push(Ee, ye) : W.push(ye, Ee), W.push(sc({
    ...we,
    apply({
      elements: {
        floating: ce
      },
      availableWidth: De,
      availableHeight: _e,
      rects: ze
    }) {
      if (!X.current)
        return;
      const Me = ce.style;
      Me.setProperty("--available-width", `${De}px`), Me.setProperty("--available-height", `${_e}px`);
      const ne = Gt(ce).devicePixelRatio || 1, {
        x: It,
        y: pt,
        width: kt,
        height: We
      } = ze.reference, Kt = (Math.round((It + kt) * ne) - Math.round(It * ne)) / ne, Ve = (Math.round((pt + We) * ne) - Math.round(pt * ne)) / ne;
      Me.setProperty("--anchor-width", `${Kt}px`), Me.setProperty("--anchor-height", `${Ve}px`);
    }
  }), Kl((ce) => ({
    // `transform-origin` calculations rely on an element existing. If the arrow hasn't been set,
    // we'll create a fake element.
    element: Be.current || Te(ce.elements.floating).createElement("div"),
    padding: a,
    offsetParent: "floating"
  }), [a]), {
    name: "transformOrigin",
    fn(ce) {
      const {
        elements: De,
        middlewareData: _e,
        placement: ze,
        rects: Me,
        y: ne
      } = ce, It = Vn(ze), pt = Sr(It), kt = Be.current, We = _e.arrow?.x || 0, Kt = _e.arrow?.y || 0, Ve = kt?.clientWidth || 0, to = kt?.clientHeight || 0, rt = We + Ve / 2, Ke = Kt + to / 2, zt = Math.abs(_e.shift?.y || 0), bn = Me.reference.height / 2, mt = typeof r == "function" ? r(ts(ce, o, G)) : r, yn = zt > mt, St = {
        top: `${rt}px calc(100% + ${mt}px)`,
        bottom: `${rt}px ${-mt}px`,
        left: `calc(100% + ${mt}px) ${Ke}px`,
        right: `${-mt}px ${Ke}px`
      }[It], At = `${rt}px ${Me.reference.y + bn - ne}px`;
      return De.floating.style.setProperty("--transform-origin", de && pt === "y" && yn ? At : St), {};
    }
  }, ql, f), Y(() => {
    !x && g && g.update({
      referenceElement: null,
      floatingElement: null,
      domReferenceElement: null,
      positionReference: null
    });
  }, [x, g]);
  const $ = i.useMemo(() => ({
    elementResize: !b && typeof ResizeObserver < "u",
    layoutShift: !b && typeof IntersectionObserver < "u"
  }), [b]), {
    refs: re,
    elements: U,
    x: ge,
    y: se,
    middlewareData: Z,
    update: Ce,
    placement: R,
    context: p,
    isPositioned: L,
    floatingStyles: A
  } = Zu({
    rootContext: g,
    open: C ? x : void 0,
    placement: me,
    middleware: W,
    strategy: n,
    whileElementsMounted: C ? void 0 : (...ce) => Or(...ce, $),
    nodeId: I,
    externalTree: w
  }), {
    sideX: z,
    sideY: Ae
  } = Z.adaptiveOrigin || Yl, Oe = L ? n : "fixed", pe = i.useMemo(() => {
    const ce = f ? {
      position: Oe,
      [z]: ge,
      [Ae]: se
    } : {
      position: Oe,
      ...A
    };
    return L || (ce.opacity = 0), ce;
  }, [f, Oe, z, ge, Ae, se, A, L]), xe = i.useRef(null);
  Y(() => {
    if (!x)
      return;
    const ce = k.current, De = typeof ce == "function" ? ce() : ce, ze = (ns(De) ? De.current : De) || null || null;
    ze !== xe.current && (re.setPositionReference(ze), xe.current = ze);
  }, [x, re, v, k]), i.useEffect(() => {
    if (!x)
      return;
    const ce = k.current;
    typeof ce != "function" && ns(ce) && ce.current !== xe.current && (re.setPositionReference(ce.current), xe.current = ce.current);
  }, [x, re, v, k]), i.useEffect(() => {
    if (C && x && U.reference && U.floating)
      return Or(U.reference, U.floating, Ce, $);
  }, [C, x, U, Ce, $]);
  const Ne = Vn(R), Ue = ai(o, Ne, G), dt = Ho(R) || "center", Ge = !!Z.hide?.referenceHidden;
  Y(() => {
    h && x && L && M(Ne);
  }, [h, x, L, Ne]);
  const Ze = i.useMemo(() => ({
    position: "absolute",
    top: Z.arrow?.y,
    left: Z.arrow?.x
  }), [Z.arrow]), He = Z.arrow?.centerOffset !== 0;
  return i.useMemo(() => ({
    positionerStyles: pe,
    arrowStyles: Ze,
    arrowRef: Be,
    arrowUncentered: He,
    side: Ue,
    align: dt,
    physicalSide: Ne,
    anchorHidden: Ge,
    refs: re,
    context: p,
    isPositioned: L,
    update: Ce
  }), [pe, Ze, Be, He, Ue, dt, Ne, Ge, re, p, L, Ce]);
}
function ns(e) {
  return e != null && "current" in e;
}
function fi(e) {
  return e === "starting" ? Nu : nt;
}
function Xl(e, t, {
  styles: n,
  transitionStatus: o,
  props: r,
  refs: s,
  hidden: c,
  inert: u = !1
}) {
  const y = {
    ...n
  };
  return u && (y.pointerEvents = "none"), Ye("div", e, {
    state: t,
    ref: s,
    props: [{
      role: "presentation",
      hidden: c,
      style: y
    }, fi(o), r],
    stateAttributesMapping: zs
  });
}
const Ql = 20;
function Jl(e, t, n, o) {
  const [r, s] = i.useState(!1);
  Y(() => {
    if (!e || !t || n == null) {
      s(!1);
      return;
    }
    const c = Te(n).documentElement.clientWidth, u = n.offsetWidth;
    s(c > 0 && u > 0 && u >= c - Ql);
  }, [e, t, n]), mu(e && (!t || r), o);
}
const di = /* @__PURE__ */ i.forwardRef(function(t, n) {
  const {
    render: o,
    className: r,
    anchor: s,
    positionMethod: c = "absolute",
    side: u = "bottom",
    align: y = "center",
    sideOffset: l = 0,
    alignOffset: a = 0,
    collisionBoundary: b = "clipping-ancestors",
    collisionPadding: d = 5,
    arrowPadding: C = 5,
    sticky: g = !1,
    disableAnchorTracking: x = !1,
    collisionAvoidance: E = ku,
    style: m,
    ...I
  } = t, f = je(), {
    filteredItems: h
  } = Tt(), w = eo(), D = Gl(), M = S(f, O.modal), N = S(f, O.open), P = S(f, O.mounted), V = S(f, O.openMethod), B = S(f, O.positionerElement), T = S(f, O.triggerElement), v = S(f, O.inputElement), k = S(f, O.inputGroupElement), X = S(f, O.inputInsidePopup), te = S(f, O.transitionStatus), G = h.length === 0, me = jl({
    anchor: s ?? (X ? T : k ?? v),
    floatingRootContext: w,
    positionMethod: c,
    mounted: P,
    side: u,
    sideOffset: l,
    align: y,
    alignOffset: a,
    arrowPadding: C,
    collisionBoundary: b,
    collisionPadding: d,
    sticky: g,
    disableAnchorTracking: x,
    keepMounted: D,
    collisionAvoidance: E,
    lazyFlip: !0
  });
  Jl(N && M, V === "touch", B, T);
  const J = {
    open: N,
    side: me.side,
    align: me.align,
    anchorHidden: me.anchorHidden,
    empty: G
  };
  Y(() => {
    f.set("popupSide", me.side);
  }, [f, me.side]);
  const ie = ee((Re) => {
    f.set("positionerElement", Re);
  }), K = Xl(t, J, {
    styles: me.positionerStyles,
    transitionStatus: te,
    props: I,
    refs: [n, ie],
    hidden: !P,
    inert: !N
  });
  return /* @__PURE__ */ lt(dr.Provider, {
    value: me,
    children: [P && M && /* @__PURE__ */ H(qs, {
      inert: dl(!N),
      cutout: k ?? v ?? T
    }), K]
  });
});
process.env.NODE_ENV !== "production" && (di.displayName = "ComboboxPositioner");
const Zl = {
  ...zs,
  ...jo
}, pi = /* @__PURE__ */ i.forwardRef(function(t, n) {
  const {
    render: o,
    className: r,
    style: s,
    initialFocus: c,
    finalFocus: u,
    ...y
  } = t, l = je(), a = pr(), b = eo(), {
    filteredItems: d
  } = Tt(), C = S(l, O.mounted), g = S(l, O.open), x = S(l, O.openMethod), E = S(l, O.transitionStatus), m = S(l, O.inputInsidePopup), I = S(l, O.inputElement), f = S(l, O.modal), h = S(l, O.id), w = d.length === 0, D = y.id ?? (m ? Zs(h) : void 0);
  Y(() => (l.set("popupId", l.state.popupRef.current?.id || D), () => {
    l.set("popupId", void 0);
  }), [l, D]), qn({
    open: g,
    ref: l.state.popupRef,
    onComplete() {
      g && l.state.onOpenChangeComplete(!0);
    }
  });
  const M = {
    open: g,
    side: a.side,
    align: a.align,
    anchorHidden: a.anchorHidden,
    transitionStatus: E,
    empty: w
  }, N = Ye("div", t, {
    state: M,
    ref: [n, l.state.popupRef],
    props: [{
      id: D,
      role: m ? "dialog" : "presentation",
      tabIndex: -1,
      onFocus(v) {
        const k = ot(v.nativeEvent);
        x !== "touch" && (ue(l.state.listElement, k) || k === v.currentTarget) && l.state.inputRef.current?.focus();
      }
    }, fi(E), y],
    stateAttributesMapping: Zl
  }), V = c === void 0 ? m ? (v) => v === "touch" ? l.state.popupRef.current : I : !1 : c;
  let B;
  u != null ? B = u : B = m ? void 0 : !1;
  const T = !m || f;
  return /* @__PURE__ */ H(Lu, {
    context: b,
    disabled: !C,
    modal: T,
    openInteractionType: x,
    initialFocus: V,
    returnFocus: B,
    getInsideElements: () => [l.state.startDismissRef.current, l.state.endDismissRef.current],
    children: /* @__PURE__ */ lt(i.Fragment, {
      children: [N, T && /* @__PURE__ */ H(mr, {
        ref: l.state.endDismissRef
      })]
    })
  });
});
process.env.NODE_ENV !== "production" && (pi.displayName = "ComboboxPopup");
const yr = /* @__PURE__ */ i.createContext(void 0);
process.env.NODE_ENV !== "production" && (yr.displayName = "ComboboxGroupContext");
function ea() {
  const e = i.useContext(yr);
  if (e === void 0)
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: ComboboxGroupContext is missing. ComboboxGroup parts must be placed within <Combobox.Group>." : ft(18));
  return e;
}
const mi = /* @__PURE__ */ i.forwardRef(function(t, n) {
  const {
    render: o,
    className: r,
    style: s,
    items: c,
    ...u
  } = t, [y, l] = i.useState(), a = i.useMemo(() => ({
    labelId: y,
    setLabelId: l,
    items: c
  }), [y, l, c]), b = Ye("div", t, {
    ref: n,
    props: [{
      role: "group",
      "aria-labelledby": y
    }, u]
  }), d = /* @__PURE__ */ H(yr.Provider, {
    value: a,
    children: b
  });
  return c ? /* @__PURE__ */ H(Ll, {
    items: c,
    children: d
  }) : d;
});
process.env.NODE_ENV !== "production" && (mi.displayName = "ComboboxGroup");
const hi = /* @__PURE__ */ i.forwardRef(function(t, n) {
  const {
    render: o,
    className: r,
    style: s,
    id: c,
    ...u
  } = t, {
    setLabelId: y
  } = ea(), l = zo(c);
  return Y(() => (y(l), () => {
    y(void 0);
  }), [l, y]), Ye("div", t, {
    ref: n,
    props: [{
      id: l
    }, u]
  });
});
process.env.NODE_ENV !== "production" && (hi.displayName = "ComboboxGroupLabel");
const xr = /* @__PURE__ */ i.createContext(void 0);
process.env.NODE_ENV !== "production" && (xr.displayName = "ComboboxItemContext");
function gi() {
  const e = i.useContext(xr);
  if (!e)
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: ComboboxItemContext is missing. ComboboxItem parts must be placed within <Combobox.Item>." : ft(19));
  return e;
}
const bi = /* @__PURE__ */ i.createContext(!1);
process.env.NODE_ENV !== "production" && (bi.displayName = "ComboboxRowContext");
function ta() {
  return i.useContext(bi);
}
function yi(e) {
  const {
    componentProps: t,
    forwardedRef: n,
    virtualized: o,
    indexFromFilter: r
  } = e, {
    render: s,
    className: c,
    style: u,
    value: y = null,
    index: l,
    disabled: a = !1,
    nativeButton: b = !1,
    ...d
  } = t, C = i.useRef(!1), g = i.useRef(null), x = ys({
    index: l,
    textRef: g,
    indexGuessBehavior: bs.GuessFromOrder
  }), E = je(), m = ta(), I = bl(), f = S(E, O.open), h = S(E, O.selectionMode), w = S(E, O.readOnly), D = S(E, O.isItemEqualToValue), M = h !== "none", N = l ?? (o ? r ?? -1 : x.index), P = x.index !== -1, V = S(E, O.id), B = S(E, O.isActive, N), T = S(E, O.isSelected, y), v = S(E, O.itemProps), k = i.useRef(null), X = V != null && P ? `${V}-${N}` : void 0, te = T && M;
  Y(() => {
    if (!(P && (o || l != null)))
      return;
    const fe = E.state.listRef.current;
    return fe[N] = k.current, () => {
      delete fe[N];
    };
  }, [P, o, N, l, E]), Y(() => {
    if (!P || I)
      return;
    const Q = E.state.valuesRef.current;
    return Q[N] = y, h !== "none" && E.state.allValuesRef.current.push(y), () => {
      delete Q[N];
    };
  }, [P, I, N, y, E, h]), Y(() => {
    if (!f) {
      C.current = !1;
      return;
    }
    if (!P || I)
      return;
    const Q = E.state.selectedValue, fe = Array.isArray(Q) ? Q[Q.length - 1] : Q;
    Nt(y, fe, D) && E.set("selectedIndex", N);
  }, [P, I, f, E, N, y, D]);
  const {
    getButtonProps: G,
    buttonRef: _
  } = mn({
    disabled: a,
    focusableWhenDisabled: !0,
    native: b,
    composite: !0
  }), me = {
    disabled: a,
    selected: te,
    highlighted: B
  };
  function J(Q) {
    function fe() {
      E.state.handleSelection(Q, y);
    }
    E.state.submitOnItemClick ? (pn.flushSync(fe), E.state.requestSubmit()) : fe();
  }
  const ie = {
    id: X,
    role: m ? "gridcell" : "option",
    "aria-selected": M ? te : void 0,
    // Focusable items steal focus from the input upon mouseup.
    // Warn if the user renders a natively focusable element like `<button>`,
    // as it should be a `<div>` instead.
    tabIndex: void 0,
    onPointerDownCapture(Q) {
      C.current = !0, Q.preventDefault();
    },
    onMouseDown(Q) {
      Q.preventDefault();
    },
    onClick(Q) {
      a || w || J(Q.nativeEvent);
    },
    onMouseUp(Q) {
      const fe = C.current;
      C.current = !1, !(a || w || Q.button !== 0 || fe || !B) && J(Q.nativeEvent);
    }
  }, K = Ye("div", t, {
    ref: [_, n, x.ref, k],
    state: me,
    props: [v, ie, d, G]
  }), Re = i.useMemo(() => ({
    selected: te,
    textRef: g
  }), [te, g]);
  return /* @__PURE__ */ H(xr.Provider, {
    value: Re,
    children: K
  });
}
function na(e) {
  const {
    componentProps: t,
    forwardedRef: n
  } = e, o = je(), r = S(o, O.isItemEqualToValue), {
    flatFilteredItems: s
  } = Tt(), c = Gn(s, t.value ?? null, r);
  return /* @__PURE__ */ H(yi, {
    componentProps: t,
    forwardedRef: n,
    virtualized: !0,
    indexFromFilter: c
  });
}
const xi = /* @__PURE__ */ i.memo(/* @__PURE__ */ i.forwardRef(function(t, n) {
  const o = je(), r = S(o, O.virtualized);
  return r && t.index == null ? /* @__PURE__ */ H(na, {
    componentProps: t,
    forwardedRef: n
  }) : /* @__PURE__ */ H(yi, {
    componentProps: t,
    forwardedRef: n,
    virtualized: r,
    indexFromFilter: void 0
  });
}));
process.env.NODE_ENV !== "production" && (xi.displayName = "ComboboxItem");
const Ei = /* @__PURE__ */ i.forwardRef(function(t, n) {
  const {
    render: o,
    className: r,
    style: s,
    children: c,
    ...u
  } = t, {
    filteredItems: y
  } = Tt(), l = je(), a = Ul(), b = y.length === 0 ? c : null;
  return Ye("div", t, {
    ref: [n, l.state.emptyRef, a],
    props: [{
      children: b,
      role: "status",
      "aria-live": "polite",
      "aria-atomic": !0
    }, u]
  });
});
process.env.NODE_ENV !== "production" && (Ei.displayName = "ComboboxEmpty");
const Ci = /* @__PURE__ */ i.forwardRef(function(t, n) {
  const {
    className: o,
    render: r,
    orientation: s = "horizontal",
    style: c,
    ...u
  } = t;
  return Ye("div", t, {
    state: {
      orientation: s
    },
    ref: n,
    props: [{
      role: "separator",
      "aria-orientation": s
    }, u]
  });
});
process.env.NODE_ENV !== "production" && (Ci.displayName = "Separator");
function oa(e) {
  const {
    multiple: t = !1,
    defaultValue: n,
    value: o,
    onValueChange: r,
    autoComplete: s,
    ...c
  } = e;
  return /* @__PURE__ */ H(Ml, {
    ...c,
    selectionMode: t ? "multiple" : "single",
    selectedValue: o,
    defaultSelectedValue: n,
    onSelectedValueChange: r,
    formAutoComplete: s
  });
}
function ra(e) {
  const {
    children: t,
    placeholder: n
  } = e, o = je(), r = S(o, O.itemToStringLabel), s = S(o, O.selectedValue), c = S(o, O.items), u = S(o, O.selectionMode) === "multiple", y = S(o, O.hasSelectedValue), l = !y && n != null && t == null, a = S(o, O.hasNullItemLabel, l);
  let b = null;
  return typeof t == "function" ? b = t(s) : t != null ? b = t : !y && n != null && !a ? b = n : u && Array.isArray(s) ? b = Rl(s, c, r) : b = Ys(s, c, r), /* @__PURE__ */ H(i.Fragment, {
    children: b
  });
}
const Ri = /* @__PURE__ */ i.forwardRef(function(t, n) {
  const o = t.keepMounted ?? !1, {
    selected: r
  } = gi();
  return o || r ? /* @__PURE__ */ H(Ii, {
    ...t,
    ref: n
  }) : null;
});
process.env.NODE_ENV !== "production" && (Ri.displayName = "ComboboxItemIndicator");
const Ii = /* @__PURE__ */ i.memo(/* @__PURE__ */ i.forwardRef((e, t) => {
  const {
    render: n,
    className: o,
    style: r,
    keepMounted: s,
    ...c
  } = e, {
    selected: u
  } = gi(), y = i.useRef(null), {
    transitionStatus: l,
    setMounted: a
  } = Yo(u), d = Ye("span", e, {
    ref: [t, y],
    state: {
      selected: u,
      transitionStatus: l
    },
    props: [{
      "aria-hidden": !0,
      children: "✔️"
    }, c],
    stateAttributesMapping: jo
  });
  return qn({
    open: u,
    ref: y,
    onComplete() {
      u || a(!1);
    }
  }), d;
}));
process.env.NODE_ENV !== "production" && (Ii.displayName = "Inner");
const wi = /* @__PURE__ */ i.forwardRef(function(t, n) {
  const {
    render: o,
    className: r,
    style: s,
    ...c
  } = t, u = je(), y = S(u, O.open), l = S(u, O.hasSelectionChips), [a, b] = i.useState(void 0);
  y && a !== void 0 && b(void 0);
  const d = i.useRef([]), C = Ye("div", t, {
    ref: [n, u.state.chipsContainerRef],
    // NVDA enters browse mode instead of staying in focus mode when navigating with
    // arrow keys inside a container unless it has a toolbar role.
    props: [l ? {
      role: "toolbar"
    } : nt, {
      onMouseDown(x) {
        Dl(x, u, u.state.disabled, u.state.readOnly);
      }
    }, c]
  }), g = i.useMemo(() => ({
    highlightedChipIndex: a,
    setHighlightedChipIndex: b,
    chipsRef: d
  }), [a, b, d]);
  return /* @__PURE__ */ H(fr.Provider, {
    value: g,
    children: /* @__PURE__ */ H(rs, {
      elementsRef: d,
      children: C
    })
  });
});
process.env.NODE_ENV !== "production" && (wi.displayName = "ComboboxChips");
const Er = /* @__PURE__ */ i.createContext(void 0);
process.env.NODE_ENV !== "production" && (Er.displayName = "ComboboxChipContext");
function sa() {
  const e = i.useContext(Er);
  if (!e)
    throw new Error(process.env.NODE_ENV !== "production" ? "Base UI: ComboboxChipContext is missing. ComboboxChip parts must be placed within <Combobox.Chip>." : ft(17));
  return e;
}
const vi = /* @__PURE__ */ i.forwardRef(function(t, n) {
  const {
    render: o,
    className: r,
    style: s,
    ...c
  } = t, u = je(), {
    setHighlightedChipIndex: y,
    chipsRef: l
  } = si(), a = Kn(), b = S(u, O.disabled), d = S(u, O.readOnly), C = S(u, O.selectedValue), {
    ref: g,
    index: x
  } = ys();
  function E(h) {
    let w = x;
    const D = a === "rtl", M = D ? "ArrowRight" : "ArrowLeft", N = D ? "ArrowLeft" : "ArrowRight";
    if (h.key === M)
      h.preventDefault(), x > 0 ? w = x - 1 : w = void 0;
    else if (h.key === N)
      h.preventDefault(), x < l.current.length - 1 ? w = x + 1 : w = void 0;
    else if (h.key === "Backspace" || h.key === "Delete") {
      const P = x >= C.length - 1 ? C.length - 2 : x;
      w = P >= 0 ? P : void 0, Fe(h), u.state.setIndices({
        activeIndex: null,
        selectedIndex: null,
        type: "keyboard"
      }), u.state.setSelectedValue(C.filter((V, B) => B !== x), ae(yt, h.nativeEvent));
    } else h.key === "Enter" || h.key === " " ? (Fe(h), w = void 0) : h.key === "ArrowDown" || h.key === "ArrowUp" ? (Fe(h), u.state.setOpen(!0, ae(Bn, h.nativeEvent)), w = void 0) : (
      // Check for printable characters (letters, numbers, symbols)
      h.key.length === 1 && !h.ctrlKey && !h.metaKey && !h.altKey && (w = void 0)
    );
    return w;
  }
  const I = Ye("div", t, {
    ref: [n, g],
    state: {
      disabled: b
    },
    props: [{
      tabIndex: -1,
      "aria-disabled": b || void 0,
      "aria-readonly": d || void 0,
      onKeyDown(h) {
        if (b || d)
          return;
        const w = E(h);
        pn.flushSync(() => {
          y(w);
        }), w === void 0 ? u.state.inputRef.current?.focus() : l.current[w]?.focus();
      }
    }, c]
  }), f = i.useMemo(() => ({
    index: x
  }), [x]);
  return /* @__PURE__ */ H(Er.Provider, {
    value: f,
    children: I
  });
});
process.env.NODE_ENV !== "production" && (vi.displayName = "ComboboxChip");
const Si = /* @__PURE__ */ i.forwardRef(function(t, n) {
  const {
    render: o,
    className: r,
    disabled: s = !1,
    nativeButton: c = !0,
    style: u,
    ...y
  } = t, l = je(), {
    index: a
  } = sa(), b = S(l, O.disabled), d = S(l, O.readOnly), C = S(l, O.selectedValue), g = S(l, O.isItemEqualToValue), x = b || s, {
    buttonRef: E,
    getButtonProps: m
  } = mn({
    native: c,
    disabled: x || d,
    focusableWhenDisabled: !0
  }), I = {
    disabled: x
  };
  function f(D) {
    const M = l.state.activeIndex;
    if (M == null)
      return;
    const N = Gn(l.state.valuesRef.current, D, g);
    N !== -1 && M === N && l.state.setIndices({
      activeIndex: null,
      type: l.state.keyboardActiveRef.current ? "keyboard" : "pointer"
    });
  }
  function h(D) {
    const M = ae(Wc, D.nativeEvent), N = C[a];
    return f(N), l.state.setSelectedValue(C.filter((P, V) => V !== a), M), l.state.inputRef.current?.focus(), M;
  }
  return Ye("button", t, {
    ref: [n, E],
    state: I,
    props: [{
      tabIndex: -1,
      onMouseDown(D) {
        D.preventDefault();
      },
      onClick(D) {
        if (x || d)
          return;
        h(D).isPropagationAllowed || D.stopPropagation();
      },
      onKeyDown(D) {
        x || d || (D.key === "Enter" || D.key === " ") && (h(D).isPropagationAllowed || Fe(D));
      }
    }, y, m]
  });
});
process.env.NODE_ENV !== "production" && (Si.displayName = "ComboboxChipRemove");
const ha = oa;
function ga({ ...e }) {
  return /* @__PURE__ */ H(ra, { "data-slot": "combobox-value", ...e });
}
function ia({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ lt(
    ri,
    {
      "data-slot": "combobox-trigger",
      className: ct("[&_svg:not([class*='size-'])]:size-4", e),
      ...n,
      children: [
        t,
        /* @__PURE__ */ H(
          Ki,
          {
            "data-slot": "combobox-trigger-icon",
            className: "pointer-events-none size-4 text-muted-foreground"
          }
        )
      ]
    }
  );
}
function ca({ className: e, ...t }) {
  return /* @__PURE__ */ H(
    ii,
    {
      "data-slot": "combobox-clear",
      render: /* @__PURE__ */ H(_o, { variant: "ghost", size: "icon-xs" }),
      className: ct(e),
      ...t,
      children: /* @__PURE__ */ H(os, { className: "pointer-events-none" })
    }
  );
}
function ba({
  className: e,
  children: t,
  disabled: n = !1,
  showTrigger: o = !0,
  showClear: r = !1,
  ...s
}) {
  return /* @__PURE__ */ lt(zi, { className: ct("h-12 w-auto rounded-text-field", e), children: [
    /* @__PURE__ */ H(
      hr,
      {
        render: /* @__PURE__ */ H(qi, { disabled: n }),
        ...s
      }
    ),
    /* @__PURE__ */ lt(Yi, { align: "inline-end", children: [
      o && /* @__PURE__ */ H(
        _o,
        {
          size: "icon-xs",
          variant: "ghost",
          asChild: !0,
          "data-slot": "input-group-button",
          className: "group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent",
          disabled: n,
          children: /* @__PURE__ */ H(ia, {})
        }
      ),
      r && /* @__PURE__ */ H(ca, { disabled: n })
    ] }),
    t
  ] });
}
function ya({
  className: e,
  side: t = "bottom",
  sideOffset: n = 6,
  align: o = "start",
  alignOffset: r = 0,
  anchor: s,
  ...c
}) {
  return /* @__PURE__ */ H(li, { children: /* @__PURE__ */ H(
    di,
    {
      side: t,
      sideOffset: n,
      align: o,
      alignOffset: r,
      anchor: s,
      className: "isolate z-50",
      children: /* @__PURE__ */ H(
        pi,
        {
          "data-slot": "combobox-content",
          "data-chips": !!s,
          className: ct(
            "ui-background-blur group/combobox-content relative max-h-96 w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) overflow-hidden rounded-md bg-popover text-popover-foreground shadow-md ring-1 ring-border duration-100 data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input *:data-[slot=input-group]:bg-input *:data-[slot=input-group]:shadow-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            e
          ),
          ...c
        }
      )
    }
  ) });
}
function xa({ className: e, ...t }) {
  return /* @__PURE__ */ H(
    ui,
    {
      "data-slot": "combobox-list",
      className: ct(
        "max-h-[min(calc(--spacing(96)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto p-1 data-empty:p-0",
        e
      ),
      ...t
    }
  );
}
function Ea({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ lt(
    xi,
    {
      "data-slot": "combobox-item",
      className: ct(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...n,
      children: [
        t,
        /* @__PURE__ */ H(
          Ri,
          {
            "data-slot": "combobox-item-indicator",
            render: /* @__PURE__ */ H("span", { className: "pointer-events-none absolute right-2 flex size-4 items-center justify-center" }),
            children: /* @__PURE__ */ H(Wi, { className: "pointer-events-none size-4 pointer-coarse:size-5" })
          }
        )
      ]
    }
  );
}
function Ca({ className: e, ...t }) {
  return /* @__PURE__ */ H(
    mi,
    {
      "data-slot": "combobox-group",
      className: ct(e),
      ...t
    }
  );
}
function Ra({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ H(
    hi,
    {
      "data-slot": "combobox-label",
      className: ct(
        "px-2 py-1.5 text-xs text-muted-foreground pointer-coarse:px-3 pointer-coarse:py-2 pointer-coarse:text-sm",
        e
      ),
      ...t
    }
  );
}
function Ia({ ...e }) {
  return /* @__PURE__ */ H(ci, { "data-slot": "combobox-collection", ...e });
}
function wa({ className: e, ...t }) {
  return /* @__PURE__ */ H(
    Ei,
    {
      "data-slot": "combobox-empty",
      className: ct(
        "hidden w-full justify-center py-2 text-center text-sm text-muted-foreground group-data-empty/combobox-content:flex",
        e
      ),
      ...t
    }
  );
}
function va({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ H(
    Ci,
    {
      "data-slot": "combobox-separator",
      className: ct("-mx-1 my-1 h-px bg-border", e),
      ...t
    }
  );
}
function Sa({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ H(
    wi,
    {
      "data-slot": "combobox-chips",
      className: ct(
        "flex min-h-9 flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent bg-clip-padding px-2.5 py-1.5 text-sm shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring has-aria-invalid:border-destructive has-aria-invalid:ring-[3px] has-aria-invalid:ring-destructive has-data-[slot=combobox-chip]:px-1.5 dark:bg-input dark:has-aria-invalid:border-destructive dark:has-aria-invalid:ring-destructive",
        e
      ),
      ...t
    }
  );
}
function Oa({
  className: e,
  children: t,
  showRemove: n = !0,
  ...o
}) {
  return /* @__PURE__ */ lt(
    vi,
    {
      "data-slot": "combobox-chip",
      className: ct(
        "flex h-[calc(--spacing(5.5))] w-fit items-center justify-center gap-1 rounded-sm bg-muted px-1.5 text-xs font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0",
        e
      ),
      ...o,
      children: [
        t,
        n && /* @__PURE__ */ H(
          Si,
          {
            render: /* @__PURE__ */ H(_o, { variant: "ghost", size: "icon-xs" }),
            className: "-ml-1 opacity-50 hover:opacity-100",
            "data-slot": "combobox-chip-remove",
            children: /* @__PURE__ */ H(os, { className: "pointer-events-none" })
          }
        )
      ]
    }
  );
}
function Pa({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ H(
    hr,
    {
      "data-slot": "combobox-chip-input",
      className: ct("min-w-16 flex-1 outline-none", e),
      ...n
    }
  );
}
function Na() {
  return i.useRef(null);
}
export {
  ha as Combobox,
  Oa as ComboboxChip,
  Sa as ComboboxChips,
  Pa as ComboboxChipsInput,
  Ia as ComboboxCollection,
  ya as ComboboxContent,
  wa as ComboboxEmpty,
  Ca as ComboboxGroup,
  ba as ComboboxInput,
  Ea as ComboboxItem,
  Ra as ComboboxLabel,
  xa as ComboboxList,
  va as ComboboxSeparator,
  ia as ComboboxTrigger,
  ga as ComboboxValue,
  Na as useComboboxAnchor
};
