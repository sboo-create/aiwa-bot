import D from "react";
var V = { exports: {} }, w = {}, A = { exports: {} }, b = {};
var C;
function W() {
  if (C) return b;
  C = 1;
  var c = D;
  function d(n, u) {
    return n === u && (n !== 0 || 1 / n === 1 / u) || n !== n && u !== u;
  }
  var v = typeof Object.is == "function" ? Object.is : d, L = c.useState, s = c.useEffect, m = c.useLayoutEffect, y = c.useDebugValue;
  function h(n, u) {
    var e = u(), r = L({ inst: { value: e, getSnapshot: u } }), t = r[0].inst, a = r[1];
    return m(
      function() {
        t.value = e, t.getSnapshot = u, O(t) && a({ inst: t });
      },
      [n, e, u]
    ), s(
      function() {
        return O(t) && a({ inst: t }), n(function() {
          O(t) && a({ inst: t });
        });
      },
      [n]
    ), y(e), e;
  }
  function O(n) {
    var u = n.getSnapshot;
    n = n.value;
    try {
      var e = u();
      return !v(n, e);
    } catch {
      return !0;
    }
  }
  function i(n, u) {
    return u();
  }
  var o = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? i : h;
  return b.useSyncExternalStore = c.useSyncExternalStore !== void 0 ? c.useSyncExternalStore : o, b;
}
var G = {};
var I;
function N() {
  return I || (I = 1, process.env.NODE_ENV !== "production" && (function() {
    function c(e, r) {
      return e === r && (e !== 0 || 1 / e === 1 / r) || e !== e && r !== r;
    }
    function d(e, r) {
      o || s.startTransition === void 0 || (o = !0, console.error(
        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
      ));
      var t = r();
      if (!n) {
        var a = r();
        m(t, a) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), n = !0);
      }
      a = y({
        inst: { value: t, getSnapshot: r }
      });
      var l = a[0].inst, S = a[1];
      return O(
        function() {
          l.value = t, l.getSnapshot = r, v(l) && S({ inst: l });
        },
        [e, t, r]
      ), h(
        function() {
          return v(l) && S({ inst: l }), e(function() {
            v(l) && S({ inst: l });
          });
        },
        [e]
      ), i(t), t;
    }
    function v(e) {
      var r = e.getSnapshot;
      e = e.value;
      try {
        var t = r();
        return !m(e, t);
      } catch {
        return !0;
      }
    }
    function L(e, r) {
      return r();
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var s = D, m = typeof Object.is == "function" ? Object.is : c, y = s.useState, h = s.useEffect, O = s.useLayoutEffect, i = s.useDebugValue, o = !1, n = !1, u = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? L : d;
    G.useSyncExternalStore = s.useSyncExternalStore !== void 0 ? s.useSyncExternalStore : u, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), G;
}
var M;
function K() {
  return M || (M = 1, process.env.NODE_ENV === "production" ? A.exports = W() : A.exports = N()), A.exports;
}
var j;
function U() {
  if (j) return w;
  j = 1;
  var c = D, d = K();
  function v(i, o) {
    return i === o && (i !== 0 || 1 / i === 1 / o) || i !== i && o !== o;
  }
  var L = typeof Object.is == "function" ? Object.is : v, s = d.useSyncExternalStore, m = c.useRef, y = c.useEffect, h = c.useMemo, O = c.useDebugValue;
  return w.useSyncExternalStoreWithSelector = function(i, o, n, u, e) {
    var r = m(null);
    if (r.current === null) {
      var t = { hasValue: !1, value: null };
      r.current = t;
    } else t = r.current;
    r = h(
      function() {
        function l(f) {
          if (!S) {
            if (S = !0, E = f, f = u(f), e !== void 0 && t.hasValue) {
              var _ = t.value;
              if (e(_, f))
                return p = _;
            }
            return p = f;
          }
          if (_ = p, L(E, f)) return _;
          var T = u(f);
          return e !== void 0 && e(_, T) ? (E = f, _) : (E = f, p = T);
        }
        var S = !1, E, p, R = n === void 0 ? null : n;
        return [
          function() {
            return l(o());
          },
          R === null ? void 0 : function() {
            return l(R());
          }
        ];
      },
      [o, n, u, e]
    );
    var a = s(i, r[0], r[1]);
    return y(
      function() {
        t.hasValue = !0, t.value = a;
      },
      [a]
    ), O(a), a;
  }, w;
}
var g = {};
var B;
function x() {
  return B || (B = 1, process.env.NODE_ENV !== "production" && (function() {
    function c(i, o) {
      return i === o && (i !== 0 || 1 / i === 1 / o) || i !== i && o !== o;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var d = D, v = K(), L = typeof Object.is == "function" ? Object.is : c, s = v.useSyncExternalStore, m = d.useRef, y = d.useEffect, h = d.useMemo, O = d.useDebugValue;
    g.useSyncExternalStoreWithSelector = function(i, o, n, u, e) {
      var r = m(null);
      if (r.current === null) {
        var t = { hasValue: !1, value: null };
        r.current = t;
      } else t = r.current;
      r = h(
        function() {
          function l(f) {
            if (!S) {
              if (S = !0, E = f, f = u(f), e !== void 0 && t.hasValue) {
                var _ = t.value;
                if (e(_, f))
                  return p = _;
              }
              return p = f;
            }
            if (_ = p, L(E, f))
              return _;
            var T = u(f);
            return e !== void 0 && e(_, T) ? (E = f, _) : (E = f, p = T);
          }
          var S = !1, E, p, R = n === void 0 ? null : n;
          return [
            function() {
              return l(o());
            },
            R === null ? void 0 : function() {
              return l(R());
            }
          ];
        },
        [o, n, u, e]
      );
      var a = s(i, r[0], r[1]);
      return y(
        function() {
          t.hasValue = !0, t.value = a;
        },
        [a]
      ), O(a), a;
    }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), g;
}
var H;
function z() {
  return H || (H = 1, process.env.NODE_ENV === "production" ? V.exports = U() : V.exports = x()), V.exports;
}
var $ = z();
export {
  K as r,
  $ as w
};
