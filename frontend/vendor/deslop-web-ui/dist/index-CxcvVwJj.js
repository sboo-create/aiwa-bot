var $ = (r) => {
  throw TypeError(r);
};
var H = (r, s, e) => s.has(r) || $("Cannot " + e);
var m = (r, s, e) => (H(r, s, "read from private field"), e ? e.call(r) : s.get(r)), J = (r, s, e) => s.has(r) ? $("Cannot add the same private member more than once") : s instanceof WeakSet ? s.add(r) : s.set(r, e), q = (r, s, e, t) => (H(r, s, "write to private field"), t ? t.call(r, e) : s.set(r, e), e);
import * as h from "react";
import { c as X } from "./index-oVmar2KU.js";
import { u as k, b } from "./index-OZUlxC0o.js";
import { jsx as g } from "react/jsx-runtime";
var ne = Object.defineProperty, a = (r, s) => ne(r, "name", { value: s, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function oe(r) {
  const s = r + "CollectionProvider", [e, t] = X(s), [o, n] = e(
    s,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), i = /* @__PURE__ */ a((d) => {
    const { scope: p, children: E } = d, P = h.useRef(null), c = h.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ g(o, { scope: p, itemMap: c, collectionRef: P, children: E });
  }, "CollectionProvider");
  i.displayName = s;
  const l = r + "CollectionSlot", C = b(l), v = h.forwardRef(
    (d, p) => {
      const { scope: E, children: P } = d, c = n(l, E), u = k(p, c.collectionRef);
      return /* @__PURE__ */ g(C, { ref: u, children: P });
    }
  );
  v.displayName = l;
  const D = r + "CollectionItemSlot", R = "data-radix-collection-item", M = b(D), w = h.forwardRef(
    (d, p) => {
      const { scope: E, children: P, ...c } = d, u = h.useRef(null), N = k(p, u), S = n(D, E);
      return h.useEffect(() => (S.itemMap.set(u, { ref: u, ...c }), () => void S.itemMap.delete(u))), /* @__PURE__ */ g(M, { [R]: "", ref: N, children: P });
    }
  );
  w.displayName = D;
  function y(d) {
    const p = n(r + "CollectionConsumer", d);
    return h.useCallback(() => {
      const P = p.collectionRef.current;
      if (!P) return [];
      const c = Array.from(P.querySelectorAll(`[${R}]`));
      return Array.from(p.itemMap.values()).sort(
        (S, O) => c.indexOf(S.ref.current) - c.indexOf(O.ref.current)
      );
    }, [p.collectionRef, p.itemMap]);
  }
  return a(y, "useCollection"), [
    { Provider: i, Slot: v, ItemSlot: w },
    y,
    t
  ];
}
a(oe, "createCollection");
var Q = /* @__PURE__ */ new WeakMap(), f, x, K = (x = class extends Map {
  constructor(e) {
    super(e);
    J(this, f);
    q(this, f, [...super.keys()]), Q.set(this, !0);
  }
  set(e, t) {
    return Q.get(this) && (this.has(e) ? m(this, f)[m(this, f).indexOf(e)] = e : m(this, f).push(e)), super.set(e, t), this;
  }
  insert(e, t, o) {
    const n = this.has(t), i = m(this, f).length, l = G(e);
    let C = l >= 0 ? l : i + l;
    const v = C < 0 || C >= i ? -1 : C;
    if (v === this.size || n && v === this.size - 1 || v === -1)
      return this.set(t, o), this;
    const D = this.size + (n ? 0 : 1);
    l < 0 && C++;
    const R = [...m(this, f)];
    let M, w = !1;
    for (let y = C; y < D; y++)
      if (C === y) {
        let d = R[y];
        R[y] === t && (d = R[y + 1]), n && this.delete(t), M = this.get(d), this.set(t, o);
      } else {
        !w && R[y - 1] === t && (w = !0);
        const d = R[w ? y : y - 1], p = M;
        M = this.get(d), this.delete(d), this.set(d, p);
      }
    return this;
  }
  with(e, t, o) {
    const n = new x(this);
    return n.insert(e, t, o), n;
  }
  before(e) {
    const t = m(this, f).indexOf(e) - 1;
    if (!(t < 0))
      return this.entryAt(t);
  }
  /**
   * Sets a new key-value pair at the position before the given key.
   */
  setBefore(e, t, o) {
    const n = m(this, f).indexOf(e);
    return n === -1 ? this : this.insert(n, t, o);
  }
  after(e) {
    let t = m(this, f).indexOf(e);
    if (t = t === -1 || t === this.size - 1 ? -1 : t + 1, t !== -1)
      return this.entryAt(t);
  }
  /**
   * Sets a new key-value pair at the position after the given key.
   */
  setAfter(e, t, o) {
    const n = m(this, f).indexOf(e);
    return n === -1 ? this : this.insert(n + 1, t, o);
  }
  first() {
    return this.entryAt(0);
  }
  last() {
    return this.entryAt(-1);
  }
  clear() {
    return q(this, f, []), super.clear();
  }
  delete(e) {
    const t = super.delete(e);
    return t && m(this, f).splice(m(this, f).indexOf(e), 1), t;
  }
  deleteAt(e) {
    const t = this.keyAt(e);
    return t !== void 0 ? this.delete(t) : !1;
  }
  at(e) {
    const t = _(m(this, f), e);
    if (t !== void 0)
      return this.get(t);
  }
  entryAt(e) {
    const t = _(m(this, f), e);
    if (t !== void 0)
      return [t, this.get(t)];
  }
  indexOf(e) {
    return m(this, f).indexOf(e);
  }
  keyAt(e) {
    return _(m(this, f), e);
  }
  from(e, t) {
    const o = this.indexOf(e);
    if (o === -1)
      return;
    let n = o + t;
    return n < 0 && (n = 0), n >= this.size && (n = this.size - 1), this.at(n);
  }
  keyFrom(e, t) {
    const o = this.indexOf(e);
    if (o === -1)
      return;
    let n = o + t;
    return n < 0 && (n = 0), n >= this.size && (n = this.size - 1), this.keyAt(n);
  }
  find(e, t) {
    let o = 0;
    for (const n of this) {
      if (Reflect.apply(e, t, [n, o, this]))
        return n;
      o++;
    }
  }
  findIndex(e, t) {
    let o = 0;
    for (const n of this) {
      if (Reflect.apply(e, t, [n, o, this]))
        return o;
      o++;
    }
    return -1;
  }
  filter(e, t) {
    const o = [];
    let n = 0;
    for (const i of this)
      Reflect.apply(e, t, [i, n, this]) && o.push(i), n++;
    return new x(o);
  }
  map(e, t) {
    const o = [];
    let n = 0;
    for (const i of this)
      o.push([i[0], Reflect.apply(e, t, [i, n, this])]), n++;
    return new x(o);
  }
  reduce(...e) {
    const [t, o] = e;
    let n = 0, i = o ?? this.at(0);
    for (const l of this)
      n === 0 && e.length === 1 ? i = l : i = Reflect.apply(t, this, [i, l, n, this]), n++;
    return i;
  }
  reduceRight(...e) {
    const [t, o] = e;
    let n = o ?? this.at(-1);
    for (let i = this.size - 1; i >= 0; i--) {
      const l = this.at(i);
      i === this.size - 1 && e.length === 1 ? n = l : n = Reflect.apply(t, this, [n, l, i, this]);
    }
    return n;
  }
  toSorted(e) {
    const t = [...this.entries()].sort(e);
    return new x(t);
  }
  toReversed() {
    const e = new x();
    for (let t = this.size - 1; t >= 0; t--) {
      const o = this.keyAt(t), n = this.get(o);
      e.set(o, n);
    }
    return e;
  }
  toSpliced(...e) {
    const t = [...this.entries()];
    return t.splice(...e), new x(t);
  }
  slice(e, t) {
    const o = new x();
    let n = this.size - 1;
    if (e === void 0)
      return o;
    e < 0 && (e = e + this.size), t !== void 0 && t > 0 && (n = t - 1);
    for (let i = e; i <= n; i++) {
      const l = this.keyAt(i), C = this.get(l);
      o.set(l, C);
    }
    return o;
  }
  every(e, t) {
    let o = 0;
    for (const n of this) {
      if (!Reflect.apply(e, t, [n, o, this]))
        return !1;
      o++;
    }
    return !0;
  }
  some(e, t) {
    let o = 0;
    for (const n of this) {
      if (Reflect.apply(e, t, [n, o, this]))
        return !0;
      o++;
    }
    return !1;
  }
}, f = new WeakMap(), a(x, "OrderedDict"), x);
function _(r, s) {
  if ("at" in Array.prototype)
    return Array.prototype.at.call(r, s);
  const e = Y(r, s);
  return e === -1 ? void 0 : r[e];
}
a(_, "at");
function Y(r, s) {
  const e = r.length, t = G(s), o = t >= 0 ? t : e + t;
  return o < 0 || o >= e ? -1 : o;
}
a(Y, "toSafeIndex");
function G(r) {
  return r !== r || r === 0 ? 0 : Math.trunc(r);
}
a(G, "toSafeInteger");
// @__NO_SIDE_EFFECTS__
function re(r) {
  const s = r + "CollectionProvider", [e, t] = X(s), [o, n] = e(
    s,
    {
      collectionElement: null,
      collectionRef: { current: null },
      collectionRefObject: { current: null },
      itemMap: new K(),
      setItemMap: /* @__PURE__ */ a(() => {
      }, "setItemMap")
    }
  ), i = /* @__PURE__ */ a(({ state: c, ...u }) => c ? /* @__PURE__ */ g(C, { ...u, state: c }) : /* @__PURE__ */ g(l, { ...u }), "CollectionProvider");
  i.displayName = s;
  const l = /* @__PURE__ */ a((c) => {
    const u = p();
    return /* @__PURE__ */ g(C, { ...c, state: u });
  }, "CollectionInit");
  l.displayName = s + "Init";
  const C = /* @__PURE__ */ a((c) => {
    const { scope: u, children: N, state: S } = c, O = h.useRef(null), [T, I] = h.useState(
      null
    ), L = k(O, I), [j, V] = S;
    return h.useEffect(() => {
      if (!T) return;
      const z = te(() => {
      });
      return z.observe(T, {
        childList: !0,
        subtree: !0
      }), () => {
        z.disconnect();
      };
    }, [T]), /* @__PURE__ */ g(
      o,
      {
        scope: u,
        itemMap: j,
        setItemMap: V,
        collectionRef: L,
        collectionRefObject: O,
        collectionElement: T,
        children: N
      }
    );
  }, "CollectionProviderImpl");
  C.displayName = s + "Impl";
  const v = r + "CollectionSlot", D = b(v), R = h.forwardRef(
    (c, u) => {
      const { scope: N, children: S } = c, O = n(v, N), T = k(u, O.collectionRef);
      return /* @__PURE__ */ g(D, { ref: T, children: S });
    }
  );
  R.displayName = v;
  const M = r + "CollectionItemSlot", w = "data-radix-collection-item", y = b(M), d = h.forwardRef(
    (c, u) => {
      const { scope: N, children: S, ...O } = c, T = h.useRef(null), [I, L] = h.useState(null), j = k(u, T, L), V = n(M, N), { setItemMap: z } = V, B = h.useRef(O);
      Z(B.current, O) || (B.current = O);
      const U = B.current;
      return h.useEffect(() => {
        const W = U;
        return z((A) => I ? A.has(I) ? A.set(I, { ...W, element: I }).toSorted(F) : (A.set(I, { ...W, element: I }), A.toSorted(F)) : A), () => {
          z((A) => !I || !A.has(I) ? A : (A.delete(I), new K(A)));
        };
      }, [I, U, z]), /* @__PURE__ */ g(y, { [w]: "", ref: j, children: S });
    }
  );
  d.displayName = M;
  function p() {
    return h.useState(new K());
  }
  a(p, "useInitCollection");
  function E(c) {
    const { itemMap: u } = n(r + "CollectionConsumer", c);
    return u;
  }
  return a(E, "useCollection"), [
    { Provider: i, Slot: R, ItemSlot: d },
    {
      createCollectionScope: t,
      useCollection: E,
      useInitCollection: p
    }
  ];
}
a(re, "createCollection");
function Z(r, s) {
  if (r === s) return !0;
  if (typeof r != "object" || typeof s != "object" || r == null || s == null) return !1;
  const e = Object.keys(r), t = Object.keys(s);
  if (e.length !== t.length) return !1;
  for (const o of e)
    if (!Object.prototype.hasOwnProperty.call(s, o) || r[o] !== s[o]) return !1;
  return !0;
}
a(Z, "shallowEqual");
function ee(r, s) {
  return !!(s.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_PRECEDING);
}
a(ee, "isElementPreceding");
function F(r, s) {
  return !r[1].element || !s[1].element ? 0 : ee(r[1].element, s[1].element) ? -1 : 1;
}
a(F, "sortByDocumentPosition");
function te(r) {
  return new MutationObserver((e) => {
    for (const t of e)
      if (t.type === "childList") {
        r();
        return;
      }
  });
}
a(te, "getChildListObserver");
export {
  oe as c
};
