import { jsx as b } from "react/jsx-runtime";
import * as k from "react";
import a from "react";
import { c as S } from "../../utils-TrrhThB-.js";
import { Label as oe } from "./label.js";
import { S as ae } from "../../index-OZUlxC0o.js";
var ue = (e) => e.type === "checkbox", I = (e) => e instanceof Date, D = (e) => e == null;
const q = (e) => typeof e == "object";
var A = (e) => !D(e) && !Array.isArray(e) && q(e) && !I(e), H = (e) => A(e) && e.target ? ue(e.target) ? e.target.checked : e.target.value : e, ie = (e, n) => n.split(".").some((t, s, r) => !isNaN(Number(t)) && e.has(r.slice(0, s).join("."))), z = (e) => {
  const n = e.constructor && e.constructor.prototype;
  return A(n) && n.hasOwnProperty("isPrototypeOf");
}, J = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function Q(e) {
  if (e instanceof Date)
    return new Date(e);
  const n = typeof FileList < "u" && e instanceof FileList;
  if (J && (e instanceof Blob || n))
    return e;
  const t = Array.isArray(e);
  if (!t && !(A(e) && z(e)))
    return e;
  const s = t ? [] : Object.create(Object.getPrototypeOf(e));
  for (const r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (s[r] = Q(e[r]));
  return s;
}
const U = {
  BLUR: "blur",
  CHANGE: "change"
}, W = {
  all: "all"
}, X = ["__proto__", "constructor", "prototype"], le = /^\w*$/;
var Z = (e) => le.test(e), w = (e) => e === void 0;
const ce = /[.[\]'"]/;
var j = (e) => e.split(ce).filter(Boolean), m = (e, n, t) => {
  if (!n || !A(e))
    return t;
  const s = Z(n) ? [n] : j(n);
  if (s.some((o) => X.includes(o)))
    return t;
  const r = s.reduce((o, u) => D(o) ? void 0 : o[u], e);
  return w(r) || r === e ? w(e[n]) ? t : e[n] : r;
}, M = (e) => typeof e == "boolean", E = (e) => typeof e == "function", $ = (e, n, t) => {
  let s = -1;
  const r = Z(n) ? [n] : j(n), o = r.length, u = o - 1;
  for (; ++s < o; ) {
    const c = r[s];
    let l = t;
    if (s !== u) {
      const f = e[c];
      l = A(f) || Array.isArray(f) ? f : isNaN(+r[s + 1]) ? {} : [];
    }
    if (X.includes(c))
      return;
    e[c] = l, e = e[c];
  }
};
const L = a.createContext(null);
L.displayName = "HookFormControlContext";
const T = () => a.useContext(L);
var fe = (e, n, t, s = !0) => {
  const r = {};
  for (const o in e)
    Object.defineProperty(r, o, {
      get: () => {
        const u = o;
        return n._proxyFormState[u] !== W.all && (n._proxyFormState[u] = !s || W.all), t && (t[u] = !0), e[u];
      }
    });
  return r;
};
const ee = J ? a.useLayoutEffect : a.useEffect;
function te(e) {
  const n = T(), { control: t = n, disabled: s, name: r, exact: o } = e || {}, [u, c] = a.useState(() => ({
    ...t._formState,
    defaultValues: t._defaultValues
  })), l = a.useRef({
    isDirty: !1,
    isLoading: !1,
    dirtyFields: !1,
    touchedFields: !1,
    validatingFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  });
  return ee(() => t._subscribe({
    name: r,
    formState: l.current,
    exact: o,
    callback: (f) => {
      !s && c({
        ...t._formState,
        ...f,
        defaultValues: t._defaultValues
      });
    }
  }), [r, s, o]), a.useEffect(() => {
    l.current.isValid && t._setValid(!0);
  }, [t]), a.useMemo(() => fe(u, t, l.current, !1), [u, t]);
}
var de = (e) => typeof e == "string", G = (e, n, t, s, r) => de(e) ? m(t, e, r) : Array.isArray(e) ? e.map((o) => m(t, o)) : t, K = (e) => D(e) || !q(e);
const Y = (e, n) => n.length === 0 && !Array.isArray(e) && !z(e);
function P(e, n, t = /* @__PURE__ */ new WeakMap()) {
  if (e === n)
    return !0;
  if (K(e) || K(n))
    return Object.is(e, n);
  if (I(e) && I(n))
    return Object.is(e.getTime(), n.getTime());
  const s = Object.keys(e), r = Object.keys(n);
  if (s.length !== r.length)
    return !1;
  if (Y(e, s) || Y(n, r))
    return Object.is(e, n);
  if (!s.length && Array.isArray(e) !== Array.isArray(n))
    return !1;
  const o = t.get(e);
  if (o && o.has(n))
    return !0;
  if (o)
    o.add(n);
  else {
    const u = /* @__PURE__ */ new WeakSet();
    u.add(n), t.set(e, u);
  }
  for (const u of s) {
    const c = e[u];
    if (!(u in n))
      return !1;
    if (u !== "ref") {
      const l = n[u];
      if (I(c) && I(l) || (A(c) || Array.isArray(c)) && (A(l) || Array.isArray(l)) ? !P(c, l, t) : !Object.is(c, l))
        return !1;
    }
  }
  return !0;
}
function me(e) {
  const n = T(), { control: t = n, name: s, defaultValue: r, disabled: o, exact: u, compute: c } = e || {}, l = a.useRef(r), f = a.useRef(c), g = a.useRef(void 0), d = a.useRef(t), p = a.useRef(s);
  f.current = c;
  const [C, F] = a.useState(() => {
    const i = t._getWatch(s, l.current);
    return f.current ? f.current(i) : i;
  }), x = a.useCallback((i) => {
    const y = G(s, t._names, i || t._formValues, !1, l.current);
    return f.current ? f.current(y) : y;
  }, [t._formValues, t._names, s]), v = a.useCallback((i) => {
    if (!o) {
      const y = G(s, t._names, i || t._formValues, !1, l.current);
      if (f.current) {
        const _ = f.current(y);
        P(_, g.current) || (F(_), g.current = _);
      } else
        F(y);
    }
  }, [t._formValues, t._names, o, s]);
  ee(() => ((d.current !== t || !P(p.current, s)) && (d.current = t, p.current = s, v()), t._subscribe({
    name: s,
    formState: {
      values: !0
    },
    exact: u,
    callback: (i) => {
      v(i.values);
    }
  })), [t, u, s, v]), a.useEffect(() => t._removeUnmounted());
  const V = d.current !== t, h = p.current, O = a.useMemo(() => {
    if (o)
      return null;
    const i = !V && !P(h, s);
    return V || i ? x() : null;
  }, [o, V, s, h, x]);
  return O !== null ? O : C;
}
function ye(e) {
  const n = T(), { name: t, disabled: s, control: r = n, shouldUnregister: o, defaultValue: u, exact: c = !0 } = e, l = ie(r._names.array, t), f = a.useMemo(() => m(r._formValues, t, m(r._defaultValues, t, u)), [r, t, u]), g = me({
    control: r,
    name: t,
    defaultValue: f,
    exact: c
  }), d = te({
    control: r,
    name: t,
    exact: c
  }), p = a.useRef(e), C = a.useRef(null), F = a.useRef(r.register(t, {
    ...e.rules,
    value: g,
    ...M(e.disabled) ? { disabled: e.disabled } : {}
  }));
  p.current = e;
  const x = a.useMemo(() => Object.defineProperties({}, {
    invalid: {
      enumerable: !0,
      get: () => !!m(d.errors, t)
    },
    isDirty: {
      enumerable: !0,
      get: () => !!m(d.dirtyFields, t)
    },
    isTouched: {
      enumerable: !0,
      get: () => !!m(d.touchedFields, t)
    },
    isValidating: {
      enumerable: !0,
      get: () => !!m(d.validatingFields, t)
    },
    error: {
      enumerable: !0,
      get: () => m(d.errors, t)
    }
  }), [d, t]), v = a.useCallback((i) => {
    const y = H(i);
    return m(r._fields, t) || (F.current = r.register(t, {
      ...p.current.rules,
      value: y
    })), F.current.onChange({
      target: {
        value: H(i),
        name: t
      },
      type: U.CHANGE
    });
  }, [t, r]), V = a.useCallback(() => F.current.onBlur({
    target: {
      value: m(r._formValues, t),
      name: t
    },
    type: U.BLUR
  }), [t, r._formValues]), h = a.useCallback((i) => {
    i && (C.current = {
      focus: () => E(i.focus) && i.focus(),
      select: () => E(i.select) && i.select(),
      setCustomValidity: (_) => E(i.setCustomValidity) && i.setCustomValidity(_),
      reportValidity: () => E(i.reportValidity) && i.reportValidity()
    });
    const y = m(r._fields, t);
    y && y._f && i && (y._f.ref = C.current);
  }, [r._fields, t]), O = a.useMemo(() => ({
    name: t,
    value: g,
    ...M(s) || d.disabled ? { disabled: d.disabled || s } : {},
    onChange: v,
    onBlur: V,
    ref: h
  }), [t, s, d.disabled, v, V, h, g]);
  return a.useEffect(() => {
    const i = r._options.shouldUnregister || o;
    r.register(t, {
      ...p.current.rules,
      ...M(p.current.disabled) ? { disabled: p.current.disabled } : {}
    });
    const y = (_, se) => {
      const N = m(r._fields, _);
      N && N._f && (N._f.mount = se);
    };
    if (y(t, !0), i) {
      const _ = Q(m(o ? r._defaultValues : r._options.values || r._defaultValues, t, m(r._options.defaultValues, t, p.current.defaultValue)));
      $(r._defaultValues, t, _), w(m(r._formValues, t)) && $(r._formValues, t, _);
    }
    if (!l && r.register(t), C.current) {
      const _ = m(r._fields, t);
      _ && _._f && (_._f.ref = C.current);
    }
    return () => {
      (l ? i && !r._state.action : i) ? r.unregister(t) : y(t, !1);
    };
  }, [t, r, l, o]), a.useEffect(() => {
    r._setDisabledField({
      disabled: s,
      name: t
    });
  }, [s, t, r]), a.useMemo(() => ({
    field: O,
    formState: d,
    fieldState: x
  }), [O, d, x]);
}
const _e = (e) => e.render(ye(e)), B = a.createContext(null);
B.displayName = "HookFormContext";
const pe = () => a.useContext(B), ge = ({ children: e, watch: n, getValues: t, getFieldState: s, setError: r, clearErrors: o, setValue: u, setValues: c, trigger: l, formState: f, resetField: g, reset: d, resetDefaultValues: p, handleSubmit: C, unregister: F, control: x, register: v, setFocus: V, subscribe: h }) => {
  const O = a.useMemo(() => ({
    watch: n,
    getValues: t,
    getFieldState: s,
    setError: r,
    clearErrors: o,
    setValue: u,
    setValues: c,
    trigger: l,
    formState: f,
    resetField: g,
    reset: d,
    resetDefaultValues: p,
    handleSubmit: C,
    unregister: F,
    control: x,
    register: v,
    setFocus: V,
    subscribe: h
  }), [
    o,
    x,
    f,
    s,
    t,
    C,
    v,
    d,
    p,
    g,
    r,
    V,
    u,
    c,
    h,
    l,
    F,
    n
  ]);
  return a.createElement(
    B.Provider,
    { value: O },
    a.createElement(L.Provider, { value: O.control }, e)
  );
}, he = ge, re = k.createContext(
  {}
), Oe = ({
  ...e
}) => /* @__PURE__ */ b(re.Provider, { value: { name: e.name }, children: /* @__PURE__ */ b(_e, { ...e }) }), R = () => {
  const e = k.useContext(re), n = k.useContext(ne), { getFieldState: t } = pe(), s = te({ name: e.name }), r = t(e.name, s);
  if (!e)
    throw new Error("useFormField should be used within <FormField>");
  const { id: o } = n;
  return {
    id: o,
    name: e.name,
    formItemId: `${o}-form-item`,
    formDescriptionId: `${o}-form-item-description`,
    formMessageId: `${o}-form-item-message`,
    ...r
  };
}, ne = k.createContext(
  {}
);
function be({ className: e, ...n }) {
  const t = k.useId();
  return /* @__PURE__ */ b(ne.Provider, { value: { id: t }, children: /* @__PURE__ */ b(
    "div",
    {
      "data-slot": "form-item",
      className: S("grid gap-2", e),
      ...n
    }
  ) });
}
function Ae({
  className: e,
  ...n
}) {
  const { error: t, formItemId: s } = R();
  return /* @__PURE__ */ b(
    oe,
    {
      "data-slot": "form-label",
      "data-error": !!t,
      className: S("data-[error=true]:text-destructive", e),
      htmlFor: s,
      ...n
    }
  );
}
function Ie({ ...e }) {
  const { error: n, formItemId: t, formDescriptionId: s, formMessageId: r } = R();
  return /* @__PURE__ */ b(
    ae,
    {
      "data-slot": "form-control",
      id: t,
      "aria-describedby": n ? `${s} ${r}` : `${s}`,
      "aria-invalid": !!n,
      ...e
    }
  );
}
function ke({ className: e, ...n }) {
  const { formDescriptionId: t } = R();
  return /* @__PURE__ */ b(
    "p",
    {
      "data-slot": "form-description",
      id: t,
      className: S("text-sm text-muted-foreground", e),
      ...n
    }
  );
}
function Ee({ className: e, ...n }) {
  const { error: t, formMessageId: s } = R(), r = t ? String(t?.message ?? "") : n.children;
  return r ? /* @__PURE__ */ b(
    "p",
    {
      "data-slot": "form-message",
      id: s,
      className: S("text-sm text-destructive", e),
      ...n,
      children: r
    }
  ) : null;
}
export {
  he as Form,
  Ie as FormControl,
  ke as FormDescription,
  Oe as FormField,
  be as FormItem,
  Ae as FormLabel,
  Ee as FormMessage,
  R as useFormField
};
