function RS(a, e) {
  for (var l = 0; l < e.length; l++) {
    const s = e[l];
    if (typeof s != "string" && !Array.isArray(s)) {
      for (const r in s)
        if (r !== "default" && !(r in a)) {
          const c = Object.getOwnPropertyDescriptor(s, r);
          c && Object.defineProperty(a, r, c.get ? c : {
            enumerable: !0,
            get: () => s[r]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(a, Symbol.toStringTag, { value: "Module" }));
}
function DS(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var nf = { exports: {} }, Fl = {};
var B0;
function NS() {
  if (B0) return Fl;
  B0 = 1;
  var a = Symbol.for("react.transitional.element"), e = Symbol.for("react.fragment");
  function l(s, r, c) {
    var f = null;
    if (c !== void 0 && (f = "" + c), r.key !== void 0 && (f = "" + r.key), "key" in r) {
      c = {};
      for (var h in r)
        h !== "key" && (c[h] = r[h]);
    } else c = r;
    return r = c.ref, {
      $$typeof: a,
      type: s,
      key: f,
      ref: r !== void 0 ? r : null,
      props: c
    };
  }
  return Fl.Fragment = e, Fl.jsx = l, Fl.jsxs = l, Fl;
}
var V0;
function OS() {
  return V0 || (V0 = 1, nf.exports = NS()), nf.exports;
}
var y = OS(), af = { exports: {} }, pt = {};
var U0;
function zS() {
  if (U0) return pt;
  U0 = 1;
  var a = Symbol.for("react.transitional.element"), e = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), f = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), b = Symbol.iterator;
  function T(N) {
    return N === null || typeof N != "object" ? null : (N = b && N[b] || N["@@iterator"], typeof N == "function" ? N : null);
  }
  var S = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, w = Object.assign, E = {};
  function _(N, G, I) {
    this.props = N, this.context = G, this.refs = E, this.updater = I || S;
  }
  _.prototype.isReactComponent = {}, _.prototype.setState = function(N, G) {
    if (typeof N != "object" && typeof N != "function" && N != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, N, G, "setState");
  }, _.prototype.forceUpdate = function(N) {
    this.updater.enqueueForceUpdate(this, N, "forceUpdate");
  };
  function j() {
  }
  j.prototype = _.prototype;
  function M(N, G, I) {
    this.props = N, this.context = G, this.refs = E, this.updater = I || S;
  }
  var D = M.prototype = new j();
  D.constructor = M, w(D, _.prototype), D.isPureReactComponent = !0;
  var L = Array.isArray;
  function V() {
  }
  var R = { H: null, A: null, T: null, S: null }, q = Object.prototype.hasOwnProperty;
  function X(N, G, I) {
    var it = I.ref;
    return {
      $$typeof: a,
      type: N,
      key: G,
      ref: it !== void 0 ? it : null,
      props: I
    };
  }
  function Z(N, G) {
    return X(N.type, G, N.props);
  }
  function et(N) {
    return typeof N == "object" && N !== null && N.$$typeof === a;
  }
  function F(N) {
    var G = { "=": "=0", ":": "=2" };
    return "$" + N.replace(/[=:]/g, function(I) {
      return G[I];
    });
  }
  var W = /\/+/g;
  function nt(N, G) {
    return typeof N == "object" && N !== null && N.key != null ? F("" + N.key) : G.toString(36);
  }
  function st(N) {
    switch (N.status) {
      case "fulfilled":
        return N.value;
      case "rejected":
        throw N.reason;
      default:
        switch (typeof N.status == "string" ? N.then(V, V) : (N.status = "pending", N.then(
          function(G) {
            N.status === "pending" && (N.status = "fulfilled", N.value = G);
          },
          function(G) {
            N.status === "pending" && (N.status = "rejected", N.reason = G);
          }
        )), N.status) {
          case "fulfilled":
            return N.value;
          case "rejected":
            throw N.reason;
        }
    }
    throw N;
  }
  function z(N, G, I, it, ft) {
    var ht = typeof N;
    (ht === "undefined" || ht === "boolean") && (N = null);
    var gt = !1;
    if (N === null) gt = !0;
    else
      switch (ht) {
        case "bigint":
        case "string":
        case "number":
          gt = !0;
          break;
        case "object":
          switch (N.$$typeof) {
            case a:
            case e:
              gt = !0;
              break;
            case g:
              return gt = N._init, z(
                gt(N._payload),
                G,
                I,
                it,
                ft
              );
          }
      }
    if (gt)
      return ft = ft(N), gt = it === "" ? "." + nt(N, 0) : it, L(ft) ? (I = "", gt != null && (I = gt.replace(W, "$&/") + "/"), z(ft, G, I, "", function(Pt) {
        return Pt;
      })) : ft != null && (et(ft) && (ft = Z(
        ft,
        I + (ft.key == null || N && N.key === ft.key ? "" : ("" + ft.key).replace(
          W,
          "$&/"
        ) + "/") + gt
      )), G.push(ft)), 1;
    gt = 0;
    var Nt = it === "" ? "." : it + ":";
    if (L(N))
      for (var jt = 0; jt < N.length; jt++)
        it = N[jt], ht = Nt + nt(it, jt), gt += z(
          it,
          G,
          I,
          ht,
          ft
        );
    else if (jt = T(N), typeof jt == "function")
      for (N = jt.call(N), jt = 0; !(it = N.next()).done; )
        it = it.value, ht = Nt + nt(it, jt++), gt += z(
          it,
          G,
          I,
          ht,
          ft
        );
    else if (ht === "object") {
      if (typeof N.then == "function")
        return z(
          st(N),
          G,
          I,
          it,
          ft
        );
      throw G = String(N), Error(
        "Objects are not valid as a React child (found: " + (G === "[object Object]" ? "object with keys {" + Object.keys(N).join(", ") + "}" : G) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return gt;
  }
  function P(N, G, I) {
    if (N == null) return N;
    var it = [], ft = 0;
    return z(N, it, "", "", function(ht) {
      return G.call(I, ht, ft++);
    }), it;
  }
  function tt(N) {
    if (N._status === -1) {
      var G = N._result;
      G = G(), G.then(
        function(I) {
          (N._status === 0 || N._status === -1) && (N._status = 1, N._result = I);
        },
        function(I) {
          (N._status === 0 || N._status === -1) && (N._status = 2, N._result = I);
        }
      ), N._status === -1 && (N._status = 0, N._result = G);
    }
    if (N._status === 1) return N._result.default;
    throw N._result;
  }
  var at = typeof reportError == "function" ? reportError : function(N) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var G = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof N == "object" && N !== null && typeof N.message == "string" ? String(N.message) : String(N),
        error: N
      });
      if (!window.dispatchEvent(G)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", N);
      return;
    }
    console.error(N);
  }, ut = {
    map: P,
    forEach: function(N, G, I) {
      P(
        N,
        function() {
          G.apply(this, arguments);
        },
        I
      );
    },
    count: function(N) {
      var G = 0;
      return P(N, function() {
        G++;
      }), G;
    },
    toArray: function(N) {
      return P(N, function(G) {
        return G;
      }) || [];
    },
    only: function(N) {
      if (!et(N))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return N;
    }
  };
  return pt.Activity = v, pt.Children = ut, pt.Component = _, pt.Fragment = l, pt.Profiler = r, pt.PureComponent = M, pt.StrictMode = s, pt.Suspense = p, pt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = R, pt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(N) {
      return R.H.useMemoCache(N);
    }
  }, pt.cache = function(N) {
    return function() {
      return N.apply(null, arguments);
    };
  }, pt.cacheSignal = function() {
    return null;
  }, pt.cloneElement = function(N, G, I) {
    if (N == null)
      throw Error(
        "The argument must be a React element, but you passed " + N + "."
      );
    var it = w({}, N.props), ft = N.key;
    if (G != null)
      for (ht in G.key !== void 0 && (ft = "" + G.key), G)
        !q.call(G, ht) || ht === "key" || ht === "__self" || ht === "__source" || ht === "ref" && G.ref === void 0 || (it[ht] = G[ht]);
    var ht = arguments.length - 2;
    if (ht === 1) it.children = I;
    else if (1 < ht) {
      for (var gt = Array(ht), Nt = 0; Nt < ht; Nt++)
        gt[Nt] = arguments[Nt + 2];
      it.children = gt;
    }
    return X(N.type, ft, it);
  }, pt.createContext = function(N) {
    return N = {
      $$typeof: f,
      _currentValue: N,
      _currentValue2: N,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, N.Provider = N, N.Consumer = {
      $$typeof: c,
      _context: N
    }, N;
  }, pt.createElement = function(N, G, I) {
    var it, ft = {}, ht = null;
    if (G != null)
      for (it in G.key !== void 0 && (ht = "" + G.key), G)
        q.call(G, it) && it !== "key" && it !== "__self" && it !== "__source" && (ft[it] = G[it]);
    var gt = arguments.length - 2;
    if (gt === 1) ft.children = I;
    else if (1 < gt) {
      for (var Nt = Array(gt), jt = 0; jt < gt; jt++)
        Nt[jt] = arguments[jt + 2];
      ft.children = Nt;
    }
    if (N && N.defaultProps)
      for (it in gt = N.defaultProps, gt)
        ft[it] === void 0 && (ft[it] = gt[it]);
    return X(N, ht, ft);
  }, pt.createRef = function() {
    return { current: null };
  }, pt.forwardRef = function(N) {
    return { $$typeof: h, render: N };
  }, pt.isValidElement = et, pt.lazy = function(N) {
    return {
      $$typeof: g,
      _payload: { _status: -1, _result: N },
      _init: tt
    };
  }, pt.memo = function(N, G) {
    return {
      $$typeof: m,
      type: N,
      compare: G === void 0 ? null : G
    };
  }, pt.startTransition = function(N) {
    var G = R.T, I = {};
    R.T = I;
    try {
      var it = N(), ft = R.S;
      ft !== null && ft(I, it), typeof it == "object" && it !== null && typeof it.then == "function" && it.then(V, at);
    } catch (ht) {
      at(ht);
    } finally {
      G !== null && I.types !== null && (G.types = I.types), R.T = G;
    }
  }, pt.unstable_useCacheRefresh = function() {
    return R.H.useCacheRefresh();
  }, pt.use = function(N) {
    return R.H.use(N);
  }, pt.useActionState = function(N, G, I) {
    return R.H.useActionState(N, G, I);
  }, pt.useCallback = function(N, G) {
    return R.H.useCallback(N, G);
  }, pt.useContext = function(N) {
    return R.H.useContext(N);
  }, pt.useDebugValue = function() {
  }, pt.useDeferredValue = function(N, G) {
    return R.H.useDeferredValue(N, G);
  }, pt.useEffect = function(N, G) {
    return R.H.useEffect(N, G);
  }, pt.useEffectEvent = function(N) {
    return R.H.useEffectEvent(N);
  }, pt.useId = function() {
    return R.H.useId();
  }, pt.useImperativeHandle = function(N, G, I) {
    return R.H.useImperativeHandle(N, G, I);
  }, pt.useInsertionEffect = function(N, G) {
    return R.H.useInsertionEffect(N, G);
  }, pt.useLayoutEffect = function(N, G) {
    return R.H.useLayoutEffect(N, G);
  }, pt.useMemo = function(N, G) {
    return R.H.useMemo(N, G);
  }, pt.useOptimistic = function(N, G) {
    return R.H.useOptimistic(N, G);
  }, pt.useReducer = function(N, G, I) {
    return R.H.useReducer(N, G, I);
  }, pt.useRef = function(N) {
    return R.H.useRef(N);
  }, pt.useState = function(N) {
    return R.H.useState(N);
  }, pt.useSyncExternalStore = function(N, G, I) {
    return R.H.useSyncExternalStore(
      N,
      G,
      I
    );
  }, pt.useTransition = function() {
    return R.H.useTransition();
  }, pt.version = "19.2.7", pt;
}
var k0;
function gs() {
  return k0 || (k0 = 1, af.exports = zS()), af.exports;
}
var A = gs();
const Kf = /* @__PURE__ */ DS(A), LS = /* @__PURE__ */ RS({
  __proto__: null,
  default: Kf
}, [A]);
var lf = { exports: {} }, Jl = {}, sf = { exports: {} }, of = {};
var H0;
function BS() {
  return H0 || (H0 = 1, (function(a) {
    function e(z, P) {
      var tt = z.length;
      z.push(P);
      t: for (; 0 < tt; ) {
        var at = tt - 1 >>> 1, ut = z[at];
        if (0 < r(ut, P))
          z[at] = P, z[tt] = ut, tt = at;
        else break t;
      }
    }
    function l(z) {
      return z.length === 0 ? null : z[0];
    }
    function s(z) {
      if (z.length === 0) return null;
      var P = z[0], tt = z.pop();
      if (tt !== P) {
        z[0] = tt;
        t: for (var at = 0, ut = z.length, N = ut >>> 1; at < N; ) {
          var G = 2 * (at + 1) - 1, I = z[G], it = G + 1, ft = z[it];
          if (0 > r(I, tt))
            it < ut && 0 > r(ft, I) ? (z[at] = ft, z[it] = tt, at = it) : (z[at] = I, z[G] = tt, at = G);
          else if (it < ut && 0 > r(ft, tt))
            z[at] = ft, z[it] = tt, at = it;
          else break t;
        }
      }
      return P;
    }
    function r(z, P) {
      var tt = z.sortIndex - P.sortIndex;
      return tt !== 0 ? tt : z.id - P.id;
    }
    if (a.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var c = performance;
      a.unstable_now = function() {
        return c.now();
      };
    } else {
      var f = Date, h = f.now();
      a.unstable_now = function() {
        return f.now() - h;
      };
    }
    var p = [], m = [], g = 1, v = null, b = 3, T = !1, S = !1, w = !1, E = !1, _ = typeof setTimeout == "function" ? setTimeout : null, j = typeof clearTimeout == "function" ? clearTimeout : null, M = typeof setImmediate < "u" ? setImmediate : null;
    function D(z) {
      for (var P = l(m); P !== null; ) {
        if (P.callback === null) s(m);
        else if (P.startTime <= z)
          s(m), P.sortIndex = P.expirationTime, e(p, P);
        else break;
        P = l(m);
      }
    }
    function L(z) {
      if (w = !1, D(z), !S)
        if (l(p) !== null)
          S = !0, V || (V = !0, F());
        else {
          var P = l(m);
          P !== null && st(L, P.startTime - z);
        }
    }
    var V = !1, R = -1, q = 5, X = -1;
    function Z() {
      return E ? !0 : !(a.unstable_now() - X < q);
    }
    function et() {
      if (E = !1, V) {
        var z = a.unstable_now();
        X = z;
        var P = !0;
        try {
          t: {
            S = !1, w && (w = !1, j(R), R = -1), T = !0;
            var tt = b;
            try {
              e: {
                for (D(z), v = l(p); v !== null && !(v.expirationTime > z && Z()); ) {
                  var at = v.callback;
                  if (typeof at == "function") {
                    v.callback = null, b = v.priorityLevel;
                    var ut = at(
                      v.expirationTime <= z
                    );
                    if (z = a.unstable_now(), typeof ut == "function") {
                      v.callback = ut, D(z), P = !0;
                      break e;
                    }
                    v === l(p) && s(p), D(z);
                  } else s(p);
                  v = l(p);
                }
                if (v !== null) P = !0;
                else {
                  var N = l(m);
                  N !== null && st(
                    L,
                    N.startTime - z
                  ), P = !1;
                }
              }
              break t;
            } finally {
              v = null, b = tt, T = !1;
            }
            P = void 0;
          }
        } finally {
          P ? F() : V = !1;
        }
      }
    }
    var F;
    if (typeof M == "function")
      F = function() {
        M(et);
      };
    else if (typeof MessageChannel < "u") {
      var W = new MessageChannel(), nt = W.port2;
      W.port1.onmessage = et, F = function() {
        nt.postMessage(null);
      };
    } else
      F = function() {
        _(et, 0);
      };
    function st(z, P) {
      R = _(function() {
        z(a.unstable_now());
      }, P);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(z) {
      z.callback = null;
    }, a.unstable_forceFrameRate = function(z) {
      0 > z || 125 < z ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : q = 0 < z ? Math.floor(1e3 / z) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return b;
    }, a.unstable_next = function(z) {
      switch (b) {
        case 1:
        case 2:
        case 3:
          var P = 3;
          break;
        default:
          P = b;
      }
      var tt = b;
      b = P;
      try {
        return z();
      } finally {
        b = tt;
      }
    }, a.unstable_requestPaint = function() {
      E = !0;
    }, a.unstable_runWithPriority = function(z, P) {
      switch (z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          z = 3;
      }
      var tt = b;
      b = z;
      try {
        return P();
      } finally {
        b = tt;
      }
    }, a.unstable_scheduleCallback = function(z, P, tt) {
      var at = a.unstable_now();
      switch (typeof tt == "object" && tt !== null ? (tt = tt.delay, tt = typeof tt == "number" && 0 < tt ? at + tt : at) : tt = at, z) {
        case 1:
          var ut = -1;
          break;
        case 2:
          ut = 250;
          break;
        case 5:
          ut = 1073741823;
          break;
        case 4:
          ut = 1e4;
          break;
        default:
          ut = 5e3;
      }
      return ut = tt + ut, z = {
        id: g++,
        callback: P,
        priorityLevel: z,
        startTime: tt,
        expirationTime: ut,
        sortIndex: -1
      }, tt > at ? (z.sortIndex = tt, e(m, z), l(p) === null && z === l(m) && (w ? (j(R), R = -1) : w = !0, st(L, tt - at))) : (z.sortIndex = ut, e(p, z), S || T || (S = !0, V || (V = !0, F()))), z;
    }, a.unstable_shouldYield = Z, a.unstable_wrapCallback = function(z) {
      var P = b;
      return function() {
        var tt = b;
        b = P;
        try {
          return z.apply(this, arguments);
        } finally {
          b = tt;
        }
      };
    };
  })(of)), of;
}
var q0;
function VS() {
  return q0 || (q0 = 1, sf.exports = BS()), sf.exports;
}
var rf = { exports: {} }, Se = {};
var $0;
function US() {
  if ($0) return Se;
  $0 = 1;
  var a = gs();
  function e(p) {
    var m = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var g = 2; g < arguments.length; g++)
        m += "&args[]=" + encodeURIComponent(arguments[g]);
    }
    return "Minified React error #" + p + "; visit " + m + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function l() {
  }
  var s = {
    d: {
      f: l,
      r: function() {
        throw Error(e(522));
      },
      D: l,
      C: l,
      L: l,
      m: l,
      X: l,
      S: l,
      M: l
    },
    p: 0,
    findDOMNode: null
  }, r = Symbol.for("react.portal");
  function c(p, m, g) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: v == null ? null : "" + v,
      children: p,
      containerInfo: m,
      implementation: g
    };
  }
  var f = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(p, m) {
    if (p === "font") return "";
    if (typeof m == "string")
      return m === "use-credentials" ? m : "";
  }
  return Se.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, Se.createPortal = function(p, m) {
    var g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(e(299));
    return c(p, m, null, g);
  }, Se.flushSync = function(p) {
    var m = f.T, g = s.p;
    try {
      if (f.T = null, s.p = 2, p) return p();
    } finally {
      f.T = m, s.p = g, s.d.f();
    }
  }, Se.preconnect = function(p, m) {
    typeof p == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, s.d.C(p, m));
  }, Se.prefetchDNS = function(p) {
    typeof p == "string" && s.d.D(p);
  }, Se.preinit = function(p, m) {
    if (typeof p == "string" && m && typeof m.as == "string") {
      var g = m.as, v = h(g, m.crossOrigin), b = typeof m.integrity == "string" ? m.integrity : void 0, T = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      g === "style" ? s.d.S(
        p,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: v,
          integrity: b,
          fetchPriority: T
        }
      ) : g === "script" && s.d.X(p, {
        crossOrigin: v,
        integrity: b,
        fetchPriority: T,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0
      });
    }
  }, Se.preinitModule = function(p, m) {
    if (typeof p == "string")
      if (typeof m == "object" && m !== null) {
        if (m.as == null || m.as === "script") {
          var g = h(
            m.as,
            m.crossOrigin
          );
          s.d.M(p, {
            crossOrigin: g,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
            nonce: typeof m.nonce == "string" ? m.nonce : void 0
          });
        }
      } else m == null && s.d.M(p);
  }, Se.preload = function(p, m) {
    if (typeof p == "string" && typeof m == "object" && m !== null && typeof m.as == "string") {
      var g = m.as, v = h(g, m.crossOrigin);
      s.d.L(p, g, {
        crossOrigin: v,
        integrity: typeof m.integrity == "string" ? m.integrity : void 0,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0,
        type: typeof m.type == "string" ? m.type : void 0,
        fetchPriority: typeof m.fetchPriority == "string" ? m.fetchPriority : void 0,
        referrerPolicy: typeof m.referrerPolicy == "string" ? m.referrerPolicy : void 0,
        imageSrcSet: typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
        imageSizes: typeof m.imageSizes == "string" ? m.imageSizes : void 0,
        media: typeof m.media == "string" ? m.media : void 0
      });
    }
  }, Se.preloadModule = function(p, m) {
    if (typeof p == "string")
      if (m) {
        var g = h(m.as, m.crossOrigin);
        s.d.m(p, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: g,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else s.d.m(p);
  }, Se.requestFormReset = function(p) {
    s.d.r(p);
  }, Se.unstable_batchedUpdates = function(p, m) {
    return p(m);
  }, Se.useFormState = function(p, m, g) {
    return f.H.useFormState(p, m, g);
  }, Se.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, Se.version = "19.2.7", Se;
}
var G0;
function ev() {
  if (G0) return rf.exports;
  G0 = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (e) {
        console.error(e);
      }
  }
  return a(), rf.exports = US(), rf.exports;
}
var Y0;
function kS() {
  if (Y0) return Jl;
  Y0 = 1;
  var a = VS(), e = gs(), l = ev();
  function s(t) {
    var n = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++)
        n += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return "Minified React error #" + t + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function c(t) {
    var n = t, i = t;
    if (t.alternate) for (; n.return; ) n = n.return;
    else {
      t = n;
      do
        n = t, (n.flags & 4098) !== 0 && (i = n.return), t = n.return;
      while (t);
    }
    return n.tag === 3 ? i : null;
  }
  function f(t) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n === null && (t = t.alternate, t !== null && (n = t.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function h(t) {
    if (t.tag === 31) {
      var n = t.memoizedState;
      if (n === null && (t = t.alternate, t !== null && (n = t.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function p(t) {
    if (c(t) !== t)
      throw Error(s(188));
  }
  function m(t) {
    var n = t.alternate;
    if (!n) {
      if (n = c(t), n === null) throw Error(s(188));
      return n !== t ? null : t;
    }
    for (var i = t, o = n; ; ) {
      var u = i.return;
      if (u === null) break;
      var d = u.alternate;
      if (d === null) {
        if (o = u.return, o !== null) {
          i = o;
          continue;
        }
        break;
      }
      if (u.child === d.child) {
        for (d = u.child; d; ) {
          if (d === i) return p(u), t;
          if (d === o) return p(u), n;
          d = d.sibling;
        }
        throw Error(s(188));
      }
      if (i.return !== o.return) i = u, o = d;
      else {
        for (var x = !1, C = u.child; C; ) {
          if (C === i) {
            x = !0, i = u, o = d;
            break;
          }
          if (C === o) {
            x = !0, o = u, i = d;
            break;
          }
          C = C.sibling;
        }
        if (!x) {
          for (C = d.child; C; ) {
            if (C === i) {
              x = !0, i = d, o = u;
              break;
            }
            if (C === o) {
              x = !0, o = d, i = u;
              break;
            }
            C = C.sibling;
          }
          if (!x) throw Error(s(189));
        }
      }
      if (i.alternate !== o) throw Error(s(190));
    }
    if (i.tag !== 3) throw Error(s(188));
    return i.stateNode.current === i ? t : n;
  }
  function g(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t;
    for (t = t.child; t !== null; ) {
      if (n = g(t), n !== null) return n;
      t = t.sibling;
    }
    return null;
  }
  var v = Object.assign, b = Symbol.for("react.element"), T = Symbol.for("react.transitional.element"), S = Symbol.for("react.portal"), w = Symbol.for("react.fragment"), E = Symbol.for("react.strict_mode"), _ = Symbol.for("react.profiler"), j = Symbol.for("react.consumer"), M = Symbol.for("react.context"), D = Symbol.for("react.forward_ref"), L = Symbol.for("react.suspense"), V = Symbol.for("react.suspense_list"), R = Symbol.for("react.memo"), q = Symbol.for("react.lazy"), X = Symbol.for("react.activity"), Z = Symbol.for("react.memo_cache_sentinel"), et = Symbol.iterator;
  function F(t) {
    return t === null || typeof t != "object" ? null : (t = et && t[et] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var W = Symbol.for("react.client.reference");
  function nt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === W ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case w:
        return "Fragment";
      case _:
        return "Profiler";
      case E:
        return "StrictMode";
      case L:
        return "Suspense";
      case V:
        return "SuspenseList";
      case X:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case S:
          return "Portal";
        case M:
          return t.displayName || "Context";
        case j:
          return (t._context.displayName || "Context") + ".Consumer";
        case D:
          var n = t.render;
          return t = t.displayName, t || (t = n.displayName || n.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case R:
          return n = t.displayName || null, n !== null ? n : nt(t.type) || "Memo";
        case q:
          n = t._payload, t = t._init;
          try {
            return nt(t(n));
          } catch {
          }
      }
    return null;
  }
  var st = Array.isArray, z = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, P = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, tt = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, at = [], ut = -1;
  function N(t) {
    return { current: t };
  }
  function G(t) {
    0 > ut || (t.current = at[ut], at[ut] = null, ut--);
  }
  function I(t, n) {
    ut++, at[ut] = t.current, t.current = n;
  }
  var it = N(null), ft = N(null), ht = N(null), gt = N(null);
  function Nt(t, n) {
    switch (I(ht, n), I(ft, t), I(it, null), n.nodeType) {
      case 9:
      case 11:
        t = (t = n.documentElement) && (t = t.namespaceURI) ? l0(t) : 0;
        break;
      default:
        if (t = n.tagName, n = n.namespaceURI)
          n = l0(n), t = s0(n, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    G(it), I(it, t);
  }
  function jt() {
    G(it), G(ft), G(ht);
  }
  function Pt(t) {
    t.memoizedState !== null && I(gt, t);
    var n = it.current, i = s0(n, t.type);
    n !== i && (I(ft, t), I(it, i));
  }
  function Kt(t) {
    ft.current === t && (G(it), G(ft)), gt.current === t && (G(gt), Pl._currentValue = tt);
  }
  var je, el;
  function Cn(t) {
    if (je === void 0)
      try {
        throw Error();
      } catch (i) {
        var n = i.stack.trim().match(/\n( *(at )?)/);
        je = n && n[1] || "", el = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + je + t + el;
  }
  var nl = !1;
  function al(t, n) {
    if (!t || nl) return "";
    nl = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var o = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var J = function() {
                throw Error();
              };
              if (Object.defineProperty(J.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(J, []);
                } catch (Y) {
                  var $ = Y;
                }
                Reflect.construct(t, [], J);
              } else {
                try {
                  J.call();
                } catch (Y) {
                  $ = Y;
                }
                t.call(J.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (Y) {
                $ = Y;
              }
              (J = t()) && typeof J.catch == "function" && J.catch(function() {
              });
            }
          } catch (Y) {
            if (Y && $ && typeof Y.stack == "string")
              return [Y.stack, $.stack];
          }
          return [null, null];
        }
      };
      o.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        o.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        o.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var d = o.DetermineComponentFrameRoot(), x = d[0], C = d[1];
      if (x && C) {
        var O = x.split(`
`), H = C.split(`
`);
        for (u = o = 0; o < O.length && !O[o].includes("DetermineComponentFrameRoot"); )
          o++;
        for (; u < H.length && !H[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (o === O.length || u === H.length)
          for (o = O.length - 1, u = H.length - 1; 1 <= o && 0 <= u && O[o] !== H[u]; )
            u--;
        for (; 1 <= o && 0 <= u; o--, u--)
          if (O[o] !== H[u]) {
            if (o !== 1 || u !== 1)
              do
                if (o--, u--, 0 > u || O[o] !== H[u]) {
                  var K = `
` + O[o].replace(" at new ", " at ");
                  return t.displayName && K.includes("<anonymous>") && (K = K.replace("<anonymous>", t.displayName)), K;
                }
              while (1 <= o && 0 <= u);
            break;
          }
      }
    } finally {
      nl = !1, Error.prepareStackTrace = i;
    }
    return (i = t ? t.displayName || t.name : "") ? Cn(i) : "";
  }
  function o3(t, n) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Cn(t.type);
      case 16:
        return Cn("Lazy");
      case 13:
        return t.child !== n && n !== null ? Cn("Suspense Fallback") : Cn("Suspense");
      case 19:
        return Cn("SuspenseList");
      case 0:
      case 15:
        return al(t.type, !1);
      case 11:
        return al(t.type.render, !1);
      case 1:
        return al(t.type, !0);
      case 31:
        return Cn("Activity");
      default:
        return "";
    }
  }
  function Bh(t) {
    try {
      var n = "", i = null;
      do
        n += o3(t, i), i = t, t = t.return;
      while (t);
      return n;
    } catch (o) {
      return `
Error generating stack: ` + o.message + `
` + o.stack;
    }
  }
  var qr = Object.prototype.hasOwnProperty, $r = a.unstable_scheduleCallback, Gr = a.unstable_cancelCallback, r3 = a.unstable_shouldYield, u3 = a.unstable_requestPaint, Be = a.unstable_now, c3 = a.unstable_getCurrentPriorityLevel, Vh = a.unstable_ImmediatePriority, Uh = a.unstable_UserBlockingPriority, ws = a.unstable_NormalPriority, f3 = a.unstable_LowPriority, kh = a.unstable_IdlePriority, d3 = a.log, h3 = a.unstable_setDisableYieldValue, il = null, Ve = null;
  function Pn(t) {
    if (typeof d3 == "function" && h3(t), Ve && typeof Ve.setStrictMode == "function")
      try {
        Ve.setStrictMode(il, t);
      } catch {
      }
  }
  var Ue = Math.clz32 ? Math.clz32 : y3, m3 = Math.log, p3 = Math.LN2;
  function y3(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (m3(t) / p3 | 0) | 0;
  }
  var Ts = 256, Cs = 262144, Es = 4194304;
  function Ta(t) {
    var n = t & 42;
    if (n !== 0) return n;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function As(t, n, i) {
    var o = t.pendingLanes;
    if (o === 0) return 0;
    var u = 0, d = t.suspendedLanes, x = t.pingedLanes;
    t = t.warmLanes;
    var C = o & 134217727;
    return C !== 0 ? (o = C & ~d, o !== 0 ? u = Ta(o) : (x &= C, x !== 0 ? u = Ta(x) : i || (i = C & ~t, i !== 0 && (u = Ta(i))))) : (C = o & ~d, C !== 0 ? u = Ta(C) : x !== 0 ? u = Ta(x) : i || (i = o & ~t, i !== 0 && (u = Ta(i)))), u === 0 ? 0 : n !== 0 && n !== u && (n & d) === 0 && (d = u & -u, i = n & -n, d >= i || d === 32 && (i & 4194048) !== 0) ? n : u;
  }
  function ll(t, n) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & n) === 0;
  }
  function g3(t, n) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return n + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Hh() {
    var t = Es;
    return Es <<= 1, (Es & 62914560) === 0 && (Es = 4194304), t;
  }
  function Yr(t) {
    for (var n = [], i = 0; 31 > i; i++) n.push(t);
    return n;
  }
  function sl(t, n) {
    t.pendingLanes |= n, n !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function v3(t, n, i, o, u, d) {
    var x = t.pendingLanes;
    t.pendingLanes = i, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= i, t.entangledLanes &= i, t.errorRecoveryDisabledLanes &= i, t.shellSuspendCounter = 0;
    var C = t.entanglements, O = t.expirationTimes, H = t.hiddenUpdates;
    for (i = x & ~i; 0 < i; ) {
      var K = 31 - Ue(i), J = 1 << K;
      C[K] = 0, O[K] = -1;
      var $ = H[K];
      if ($ !== null)
        for (H[K] = null, K = 0; K < $.length; K++) {
          var Y = $[K];
          Y !== null && (Y.lane &= -536870913);
        }
      i &= ~J;
    }
    o !== 0 && qh(t, o, 0), d !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= d & ~(x & ~n));
  }
  function qh(t, n, i) {
    t.pendingLanes |= n, t.suspendedLanes &= ~n;
    var o = 31 - Ue(n);
    t.entangledLanes |= n, t.entanglements[o] = t.entanglements[o] | 1073741824 | i & 261930;
  }
  function $h(t, n) {
    var i = t.entangledLanes |= n;
    for (t = t.entanglements; i; ) {
      var o = 31 - Ue(i), u = 1 << o;
      u & n | t[o] & n && (t[o] |= n), i &= ~u;
    }
  }
  function Gh(t, n) {
    var i = n & -n;
    return i = (i & 42) !== 0 ? 1 : Xr(i), (i & (t.suspendedLanes | n)) !== 0 ? 0 : i;
  }
  function Xr(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Pr(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Yh() {
    var t = P.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : _0(t.type));
  }
  function Xh(t, n) {
    var i = P.p;
    try {
      return P.p = t, n();
    } finally {
      P.p = i;
    }
  }
  var Kn = Math.random().toString(36).slice(2), me = "__reactFiber$" + Kn, _e = "__reactProps$" + Kn, Wa = "__reactContainer$" + Kn, Kr = "__reactEvents$" + Kn, b3 = "__reactListeners$" + Kn, x3 = "__reactHandles$" + Kn, Ph = "__reactResources$" + Kn, ol = "__reactMarker$" + Kn;
  function Zr(t) {
    delete t[me], delete t[_e], delete t[Kr], delete t[b3], delete t[x3];
  }
  function Ia(t) {
    var n = t[me];
    if (n) return n;
    for (var i = t.parentNode; i; ) {
      if (n = i[Wa] || i[me]) {
        if (i = n.alternate, n.child !== null || i !== null && i.child !== null)
          for (t = h0(t); t !== null; ) {
            if (i = t[me]) return i;
            t = h0(t);
          }
        return n;
      }
      t = i, i = t.parentNode;
    }
    return null;
  }
  function ti(t) {
    if (t = t[me] || t[Wa]) {
      var n = t.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return t;
    }
    return null;
  }
  function rl(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t.stateNode;
    throw Error(s(33));
  }
  function ei(t) {
    var n = t[Ph];
    return n || (n = t[Ph] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function fe(t) {
    t[ol] = !0;
  }
  var Kh = /* @__PURE__ */ new Set(), Zh = {};
  function Ca(t, n) {
    ni(t, n), ni(t + "Capture", n);
  }
  function ni(t, n) {
    for (Zh[t] = n, t = 0; t < n.length; t++)
      Kh.add(n[t]);
  }
  var S3 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Qh = {}, Fh = {};
  function w3(t) {
    return qr.call(Fh, t) ? !0 : qr.call(Qh, t) ? !1 : S3.test(t) ? Fh[t] = !0 : (Qh[t] = !0, !1);
  }
  function Ms(t, n, i) {
    if (w3(n))
      if (i === null) t.removeAttribute(n);
      else {
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(n);
            return;
          case "boolean":
            var o = n.toLowerCase().slice(0, 5);
            if (o !== "data-" && o !== "aria-") {
              t.removeAttribute(n);
              return;
            }
        }
        t.setAttribute(n, "" + i);
      }
  }
  function js(t, n, i) {
    if (i === null) t.removeAttribute(n);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttribute(n, "" + i);
    }
  }
  function En(t, n, i, o) {
    if (o === null) t.removeAttribute(i);
    else {
      switch (typeof o) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(i);
          return;
      }
      t.setAttributeNS(n, i, "" + o);
    }
  }
  function Ze(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Jh(t) {
    var n = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function T3(t, n, i) {
    var o = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      n
    );
    if (!t.hasOwnProperty(n) && typeof o < "u" && typeof o.get == "function" && typeof o.set == "function") {
      var u = o.get, d = o.set;
      return Object.defineProperty(t, n, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(x) {
          i = "" + x, d.call(this, x);
        }
      }), Object.defineProperty(t, n, {
        enumerable: o.enumerable
      }), {
        getValue: function() {
          return i;
        },
        setValue: function(x) {
          i = "" + x;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[n];
        }
      };
    }
  }
  function Qr(t) {
    if (!t._valueTracker) {
      var n = Jh(t) ? "checked" : "value";
      t._valueTracker = T3(
        t,
        n,
        "" + t[n]
      );
    }
  }
  function Wh(t) {
    if (!t) return !1;
    var n = t._valueTracker;
    if (!n) return !0;
    var i = n.getValue(), o = "";
    return t && (o = Jh(t) ? t.checked ? "true" : "false" : t.value), t = o, t !== i ? (n.setValue(t), !0) : !1;
  }
  function _s(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var C3 = /[\n"\\]/g;
  function Qe(t) {
    return t.replace(
      C3,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Fr(t, n, i, o, u, d, x, C) {
    t.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? t.type = x : t.removeAttribute("type"), n != null ? x === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + Ze(n)) : t.value !== "" + Ze(n) && (t.value = "" + Ze(n)) : x !== "submit" && x !== "reset" || t.removeAttribute("value"), n != null ? Jr(t, x, Ze(n)) : i != null ? Jr(t, x, Ze(i)) : o != null && t.removeAttribute("value"), u == null && d != null && (t.defaultChecked = !!d), u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"), C != null && typeof C != "function" && typeof C != "symbol" && typeof C != "boolean" ? t.name = "" + Ze(C) : t.removeAttribute("name");
  }
  function Ih(t, n, i, o, u, d, x, C) {
    if (d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (t.type = d), n != null || i != null) {
      if (!(d !== "submit" && d !== "reset" || n != null)) {
        Qr(t);
        return;
      }
      i = i != null ? "" + Ze(i) : "", n = n != null ? "" + Ze(n) : i, C || n === t.value || (t.value = n), t.defaultValue = n;
    }
    o = o ?? u, o = typeof o != "function" && typeof o != "symbol" && !!o, t.checked = C ? t.checked : !!o, t.defaultChecked = !!o, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (t.name = x), Qr(t);
  }
  function Jr(t, n, i) {
    n === "number" && _s(t.ownerDocument) === t || t.defaultValue === "" + i || (t.defaultValue = "" + i);
  }
  function ai(t, n, i, o) {
    if (t = t.options, n) {
      n = {};
      for (var u = 0; u < i.length; u++)
        n["$" + i[u]] = !0;
      for (i = 0; i < t.length; i++)
        u = n.hasOwnProperty("$" + t[i].value), t[i].selected !== u && (t[i].selected = u), u && o && (t[i].defaultSelected = !0);
    } else {
      for (i = "" + Ze(i), n = null, u = 0; u < t.length; u++) {
        if (t[u].value === i) {
          t[u].selected = !0, o && (t[u].defaultSelected = !0);
          return;
        }
        n !== null || t[u].disabled || (n = t[u]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function tm(t, n, i) {
    if (n != null && (n = "" + Ze(n), n !== t.value && (t.value = n), i == null)) {
      t.defaultValue !== n && (t.defaultValue = n);
      return;
    }
    t.defaultValue = i != null ? "" + Ze(i) : "";
  }
  function em(t, n, i, o) {
    if (n == null) {
      if (o != null) {
        if (i != null) throw Error(s(92));
        if (st(o)) {
          if (1 < o.length) throw Error(s(93));
          o = o[0];
        }
        i = o;
      }
      i == null && (i = ""), n = i;
    }
    i = Ze(n), t.defaultValue = i, o = t.textContent, o === i && o !== "" && o !== null && (t.value = o), Qr(t);
  }
  function ii(t, n) {
    if (n) {
      var i = t.firstChild;
      if (i && i === t.lastChild && i.nodeType === 3) {
        i.nodeValue = n;
        return;
      }
    }
    t.textContent = n;
  }
  var E3 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function nm(t, n, i) {
    var o = n.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? o ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "" : o ? t.setProperty(n, i) : typeof i != "number" || i === 0 || E3.has(n) ? n === "float" ? t.cssFloat = i : t[n] = ("" + i).trim() : t[n] = i + "px";
  }
  function am(t, n, i) {
    if (n != null && typeof n != "object")
      throw Error(s(62));
    if (t = t.style, i != null) {
      for (var o in i)
        !i.hasOwnProperty(o) || n != null && n.hasOwnProperty(o) || (o.indexOf("--") === 0 ? t.setProperty(o, "") : o === "float" ? t.cssFloat = "" : t[o] = "");
      for (var u in n)
        o = n[u], n.hasOwnProperty(u) && i[u] !== o && nm(t, u, o);
    } else
      for (var d in n)
        n.hasOwnProperty(d) && nm(t, d, n[d]);
  }
  function Wr(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var A3 = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), M3 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Rs(t) {
    return M3.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function An() {
  }
  var Ir = null;
  function tu(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var li = null, si = null;
  function im(t) {
    var n = ti(t);
    if (n && (t = n.stateNode)) {
      var i = t[_e] || null;
      t: switch (t = n.stateNode, n.type) {
        case "input":
          if (Fr(
            t,
            i.value,
            i.defaultValue,
            i.defaultValue,
            i.checked,
            i.defaultChecked,
            i.type,
            i.name
          ), n = i.name, i.type === "radio" && n != null) {
            for (i = t; i.parentNode; ) i = i.parentNode;
            for (i = i.querySelectorAll(
              'input[name="' + Qe(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < i.length; n++) {
              var o = i[n];
              if (o !== t && o.form === t.form) {
                var u = o[_e] || null;
                if (!u) throw Error(s(90));
                Fr(
                  o,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (n = 0; n < i.length; n++)
              o = i[n], o.form === t.form && Wh(o);
          }
          break t;
        case "textarea":
          tm(t, i.value, i.defaultValue);
          break t;
        case "select":
          n = i.value, n != null && ai(t, !!i.multiple, n, !1);
      }
    }
  }
  var eu = !1;
  function lm(t, n, i) {
    if (eu) return t(n, i);
    eu = !0;
    try {
      var o = t(n);
      return o;
    } finally {
      if (eu = !1, (li !== null || si !== null) && (vo(), li && (n = li, t = si, si = li = null, im(n), t)))
        for (n = 0; n < t.length; n++) im(t[n]);
    }
  }
  function ul(t, n) {
    var i = t.stateNode;
    if (i === null) return null;
    var o = i[_e] || null;
    if (o === null) return null;
    i = o[n];
    t: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (o = !o.disabled) || (t = t.type, o = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !o;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (i && typeof i != "function")
      throw Error(
        s(231, n, typeof i)
      );
    return i;
  }
  var Mn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), nu = !1;
  if (Mn)
    try {
      var cl = {};
      Object.defineProperty(cl, "passive", {
        get: function() {
          nu = !0;
        }
      }), window.addEventListener("test", cl, cl), window.removeEventListener("test", cl, cl);
    } catch {
      nu = !1;
    }
  var Zn = null, au = null, Ds = null;
  function sm() {
    if (Ds) return Ds;
    var t, n = au, i = n.length, o, u = "value" in Zn ? Zn.value : Zn.textContent, d = u.length;
    for (t = 0; t < i && n[t] === u[t]; t++) ;
    var x = i - t;
    for (o = 1; o <= x && n[i - o] === u[d - o]; o++) ;
    return Ds = u.slice(t, 1 < o ? 1 - o : void 0);
  }
  function Ns(t) {
    var n = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Os() {
    return !0;
  }
  function om() {
    return !1;
  }
  function Re(t) {
    function n(i, o, u, d, x) {
      this._reactName = i, this._targetInst = u, this.type = o, this.nativeEvent = d, this.target = x, this.currentTarget = null;
      for (var C in t)
        t.hasOwnProperty(C) && (i = t[C], this[C] = i ? i(d) : d[C]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? Os : om, this.isPropagationStopped = om, this;
    }
    return v(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = Os);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = Os);
      },
      persist: function() {
      },
      isPersistent: Os
    }), n;
  }
  var Ea = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, zs = Re(Ea), fl = v({}, Ea, { view: 0, detail: 0 }), j3 = Re(fl), iu, lu, dl, Ls = v({}, fl, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: ou,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== dl && (dl && t.type === "mousemove" ? (iu = t.screenX - dl.screenX, lu = t.screenY - dl.screenY) : lu = iu = 0, dl = t), iu);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : lu;
    }
  }), rm = Re(Ls), _3 = v({}, Ls, { dataTransfer: 0 }), R3 = Re(_3), D3 = v({}, fl, { relatedTarget: 0 }), su = Re(D3), N3 = v({}, Ea, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), O3 = Re(N3), z3 = v({}, Ea, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), L3 = Re(z3), B3 = v({}, Ea, { data: 0 }), um = Re(B3), V3 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, U3 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, k3 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function H3(t) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(t) : (t = k3[t]) ? !!n[t] : !1;
  }
  function ou() {
    return H3;
  }
  var q3 = v({}, fl, {
    key: function(t) {
      if (t.key) {
        var n = V3[t.key] || t.key;
        if (n !== "Unidentified") return n;
      }
      return t.type === "keypress" ? (t = Ns(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? U3[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ou,
    charCode: function(t) {
      return t.type === "keypress" ? Ns(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Ns(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), $3 = Re(q3), G3 = v({}, Ls, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), cm = Re(G3), Y3 = v({}, fl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ou
  }), X3 = Re(Y3), P3 = v({}, Ea, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), K3 = Re(P3), Z3 = v({}, Ls, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Q3 = Re(Z3), F3 = v({}, Ea, {
    newState: 0,
    oldState: 0
  }), J3 = Re(F3), W3 = [9, 13, 27, 32], ru = Mn && "CompositionEvent" in window, hl = null;
  Mn && "documentMode" in document && (hl = document.documentMode);
  var I3 = Mn && "TextEvent" in window && !hl, fm = Mn && (!ru || hl && 8 < hl && 11 >= hl), dm = " ", hm = !1;
  function mm(t, n) {
    switch (t) {
      case "keyup":
        return W3.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function pm(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var oi = !1;
  function tx(t, n) {
    switch (t) {
      case "compositionend":
        return pm(n);
      case "keypress":
        return n.which !== 32 ? null : (hm = !0, dm);
      case "textInput":
        return t = n.data, t === dm && hm ? null : t;
      default:
        return null;
    }
  }
  function ex(t, n) {
    if (oi)
      return t === "compositionend" || !ru && mm(t, n) ? (t = sm(), Ds = au = Zn = null, oi = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
          if (n.char && 1 < n.char.length)
            return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return fm && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var nx = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function ym(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === "input" ? !!nx[t.type] : n === "textarea";
  }
  function gm(t, n, i, o) {
    li ? si ? si.push(o) : si = [o] : li = o, n = Eo(n, "onChange"), 0 < n.length && (i = new zs(
      "onChange",
      "change",
      null,
      i,
      o
    ), t.push({ event: i, listeners: n }));
  }
  var ml = null, pl = null;
  function ax(t) {
    I1(t, 0);
  }
  function Bs(t) {
    var n = rl(t);
    if (Wh(n)) return t;
  }
  function vm(t, n) {
    if (t === "change") return n;
  }
  var bm = !1;
  if (Mn) {
    var uu;
    if (Mn) {
      var cu = "oninput" in document;
      if (!cu) {
        var xm = document.createElement("div");
        xm.setAttribute("oninput", "return;"), cu = typeof xm.oninput == "function";
      }
      uu = cu;
    } else uu = !1;
    bm = uu && (!document.documentMode || 9 < document.documentMode);
  }
  function Sm() {
    ml && (ml.detachEvent("onpropertychange", wm), pl = ml = null);
  }
  function wm(t) {
    if (t.propertyName === "value" && Bs(pl)) {
      var n = [];
      gm(
        n,
        pl,
        t,
        tu(t)
      ), lm(ax, n);
    }
  }
  function ix(t, n, i) {
    t === "focusin" ? (Sm(), ml = n, pl = i, ml.attachEvent("onpropertychange", wm)) : t === "focusout" && Sm();
  }
  function lx(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Bs(pl);
  }
  function sx(t, n) {
    if (t === "click") return Bs(n);
  }
  function ox(t, n) {
    if (t === "input" || t === "change")
      return Bs(n);
  }
  function rx(t, n) {
    return t === n && (t !== 0 || 1 / t === 1 / n) || t !== t && n !== n;
  }
  var ke = typeof Object.is == "function" ? Object.is : rx;
  function yl(t, n) {
    if (ke(t, n)) return !0;
    if (typeof t != "object" || t === null || typeof n != "object" || n === null)
      return !1;
    var i = Object.keys(t), o = Object.keys(n);
    if (i.length !== o.length) return !1;
    for (o = 0; o < i.length; o++) {
      var u = i[o];
      if (!qr.call(n, u) || !ke(t[u], n[u]))
        return !1;
    }
    return !0;
  }
  function Tm(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Cm(t, n) {
    var i = Tm(t);
    t = 0;
    for (var o; i; ) {
      if (i.nodeType === 3) {
        if (o = t + i.textContent.length, t <= n && o >= n)
          return { node: i, offset: n - t };
        t = o;
      }
      t: {
        for (; i; ) {
          if (i.nextSibling) {
            i = i.nextSibling;
            break t;
          }
          i = i.parentNode;
        }
        i = void 0;
      }
      i = Tm(i);
    }
  }
  function Em(t, n) {
    return t && n ? t === n ? !0 : t && t.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Em(t, n.parentNode) : "contains" in t ? t.contains(n) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Am(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var n = _s(t.document); n instanceof t.HTMLIFrameElement; ) {
      try {
        var i = typeof n.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) t = n.contentWindow;
      else break;
      n = _s(t.document);
    }
    return n;
  }
  function fu(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n && (n === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || n === "textarea" || t.contentEditable === "true");
  }
  var ux = Mn && "documentMode" in document && 11 >= document.documentMode, ri = null, du = null, gl = null, hu = !1;
  function Mm(t, n, i) {
    var o = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    hu || ri == null || ri !== _s(o) || (o = ri, "selectionStart" in o && fu(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), gl && yl(gl, o) || (gl = o, o = Eo(du, "onSelect"), 0 < o.length && (n = new zs(
      "onSelect",
      "select",
      null,
      n,
      i
    ), t.push({ event: n, listeners: o }), n.target = ri)));
  }
  function Aa(t, n) {
    var i = {};
    return i[t.toLowerCase()] = n.toLowerCase(), i["Webkit" + t] = "webkit" + n, i["Moz" + t] = "moz" + n, i;
  }
  var ui = {
    animationend: Aa("Animation", "AnimationEnd"),
    animationiteration: Aa("Animation", "AnimationIteration"),
    animationstart: Aa("Animation", "AnimationStart"),
    transitionrun: Aa("Transition", "TransitionRun"),
    transitionstart: Aa("Transition", "TransitionStart"),
    transitioncancel: Aa("Transition", "TransitionCancel"),
    transitionend: Aa("Transition", "TransitionEnd")
  }, mu = {}, jm = {};
  Mn && (jm = document.createElement("div").style, "AnimationEvent" in window || (delete ui.animationend.animation, delete ui.animationiteration.animation, delete ui.animationstart.animation), "TransitionEvent" in window || delete ui.transitionend.transition);
  function Ma(t) {
    if (mu[t]) return mu[t];
    if (!ui[t]) return t;
    var n = ui[t], i;
    for (i in n)
      if (n.hasOwnProperty(i) && i in jm)
        return mu[t] = n[i];
    return t;
  }
  var _m = Ma("animationend"), Rm = Ma("animationiteration"), Dm = Ma("animationstart"), cx = Ma("transitionrun"), fx = Ma("transitionstart"), dx = Ma("transitioncancel"), Nm = Ma("transitionend"), Om = /* @__PURE__ */ new Map(), pu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  pu.push("scrollEnd");
  function on(t, n) {
    Om.set(t, n), Ca(n, [t]);
  }
  var Vs = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var n = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(n)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Fe = [], ci = 0, yu = 0;
  function Us() {
    for (var t = ci, n = yu = ci = 0; n < t; ) {
      var i = Fe[n];
      Fe[n++] = null;
      var o = Fe[n];
      Fe[n++] = null;
      var u = Fe[n];
      Fe[n++] = null;
      var d = Fe[n];
      if (Fe[n++] = null, o !== null && u !== null) {
        var x = o.pending;
        x === null ? u.next = u : (u.next = x.next, x.next = u), o.pending = u;
      }
      d !== 0 && zm(i, u, d);
    }
  }
  function ks(t, n, i, o) {
    Fe[ci++] = t, Fe[ci++] = n, Fe[ci++] = i, Fe[ci++] = o, yu |= o, t.lanes |= o, t = t.alternate, t !== null && (t.lanes |= o);
  }
  function gu(t, n, i, o) {
    return ks(t, n, i, o), Hs(t);
  }
  function ja(t, n) {
    return ks(t, null, null, n), Hs(t);
  }
  function zm(t, n, i) {
    t.lanes |= i;
    var o = t.alternate;
    o !== null && (o.lanes |= i);
    for (var u = !1, d = t.return; d !== null; )
      d.childLanes |= i, o = d.alternate, o !== null && (o.childLanes |= i), d.tag === 22 && (t = d.stateNode, t === null || t._visibility & 1 || (u = !0)), t = d, d = d.return;
    return t.tag === 3 ? (d = t.stateNode, u && n !== null && (u = 31 - Ue(i), t = d.hiddenUpdates, o = t[u], o === null ? t[u] = [n] : o.push(n), n.lane = i | 536870912), d) : null;
  }
  function Hs(t) {
    if (50 < kl)
      throw kl = 0, Ac = null, Error(s(185));
    for (var n = t.return; n !== null; )
      t = n, n = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var fi = {};
  function hx(t, n, i, o) {
    this.tag = t, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function He(t, n, i, o) {
    return new hx(t, n, i, o);
  }
  function vu(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function jn(t, n) {
    var i = t.alternate;
    return i === null ? (i = He(
      t.tag,
      n,
      t.key,
      t.mode
    ), i.elementType = t.elementType, i.type = t.type, i.stateNode = t.stateNode, i.alternate = t, t.alternate = i) : (i.pendingProps = n, i.type = t.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = t.flags & 65011712, i.childLanes = t.childLanes, i.lanes = t.lanes, i.child = t.child, i.memoizedProps = t.memoizedProps, i.memoizedState = t.memoizedState, i.updateQueue = t.updateQueue, n = t.dependencies, i.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, i.sibling = t.sibling, i.index = t.index, i.ref = t.ref, i.refCleanup = t.refCleanup, i;
  }
  function Lm(t, n) {
    t.flags &= 65011714;
    var i = t.alternate;
    return i === null ? (t.childLanes = 0, t.lanes = n, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = i.childLanes, t.lanes = i.lanes, t.child = i.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = i.memoizedProps, t.memoizedState = i.memoizedState, t.updateQueue = i.updateQueue, t.type = i.type, n = i.dependencies, t.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), t;
  }
  function qs(t, n, i, o, u, d) {
    var x = 0;
    if (o = t, typeof t == "function") vu(t) && (x = 1);
    else if (typeof t == "string")
      x = vS(
        t,
        i,
        it.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case X:
          return t = He(31, i, n, u), t.elementType = X, t.lanes = d, t;
        case w:
          return _a(i.children, u, d, n);
        case E:
          x = 8, u |= 24;
          break;
        case _:
          return t = He(12, i, n, u | 2), t.elementType = _, t.lanes = d, t;
        case L:
          return t = He(13, i, n, u), t.elementType = L, t.lanes = d, t;
        case V:
          return t = He(19, i, n, u), t.elementType = V, t.lanes = d, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case M:
                x = 10;
                break t;
              case j:
                x = 9;
                break t;
              case D:
                x = 11;
                break t;
              case R:
                x = 14;
                break t;
              case q:
                x = 16, o = null;
                break t;
            }
          x = 29, i = Error(
            s(130, t === null ? "null" : typeof t, "")
          ), o = null;
      }
    return n = He(x, i, n, u), n.elementType = t, n.type = o, n.lanes = d, n;
  }
  function _a(t, n, i, o) {
    return t = He(7, t, o, n), t.lanes = i, t;
  }
  function bu(t, n, i) {
    return t = He(6, t, null, n), t.lanes = i, t;
  }
  function Bm(t) {
    var n = He(18, null, null, 0);
    return n.stateNode = t, n;
  }
  function xu(t, n, i) {
    return n = He(
      4,
      t.children !== null ? t.children : [],
      t.key,
      n
    ), n.lanes = i, n.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, n;
  }
  var Vm = /* @__PURE__ */ new WeakMap();
  function Je(t, n) {
    if (typeof t == "object" && t !== null) {
      var i = Vm.get(t);
      return i !== void 0 ? i : (n = {
        value: t,
        source: n,
        stack: Bh(n)
      }, Vm.set(t, n), n);
    }
    return {
      value: t,
      source: n,
      stack: Bh(n)
    };
  }
  var di = [], hi = 0, $s = null, vl = 0, We = [], Ie = 0, Qn = null, yn = 1, gn = "";
  function _n(t, n) {
    di[hi++] = vl, di[hi++] = $s, $s = t, vl = n;
  }
  function Um(t, n, i) {
    We[Ie++] = yn, We[Ie++] = gn, We[Ie++] = Qn, Qn = t;
    var o = yn;
    t = gn;
    var u = 32 - Ue(o) - 1;
    o &= ~(1 << u), i += 1;
    var d = 32 - Ue(n) + u;
    if (30 < d) {
      var x = u - u % 5;
      d = (o & (1 << x) - 1).toString(32), o >>= x, u -= x, yn = 1 << 32 - Ue(n) + u | i << u | o, gn = d + t;
    } else
      yn = 1 << d | i << u | o, gn = t;
  }
  function Su(t) {
    t.return !== null && (_n(t, 1), Um(t, 1, 0));
  }
  function wu(t) {
    for (; t === $s; )
      $s = di[--hi], di[hi] = null, vl = di[--hi], di[hi] = null;
    for (; t === Qn; )
      Qn = We[--Ie], We[Ie] = null, gn = We[--Ie], We[Ie] = null, yn = We[--Ie], We[Ie] = null;
  }
  function km(t, n) {
    We[Ie++] = yn, We[Ie++] = gn, We[Ie++] = Qn, yn = n.id, gn = n.overflow, Qn = t;
  }
  var pe = null, $t = null, Et = !1, Fn = null, tn = !1, Tu = Error(s(519));
  function Jn(t) {
    var n = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw bl(Je(n, t)), Tu;
  }
  function Hm(t) {
    var n = t.stateNode, i = t.type, o = t.memoizedProps;
    switch (n[me] = t, n[_e] = o, i) {
      case "dialog":
        wt("cancel", n), wt("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        wt("load", n);
        break;
      case "video":
      case "audio":
        for (i = 0; i < ql.length; i++)
          wt(ql[i], n);
        break;
      case "source":
        wt("error", n);
        break;
      case "img":
      case "image":
      case "link":
        wt("error", n), wt("load", n);
        break;
      case "details":
        wt("toggle", n);
        break;
      case "input":
        wt("invalid", n), Ih(
          n,
          o.value,
          o.defaultValue,
          o.checked,
          o.defaultChecked,
          o.type,
          o.name,
          !0
        );
        break;
      case "select":
        wt("invalid", n);
        break;
      case "textarea":
        wt("invalid", n), em(n, o.value, o.defaultValue, o.children);
    }
    i = o.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || n.textContent === "" + i || o.suppressHydrationWarning === !0 || a0(n.textContent, i) ? (o.popover != null && (wt("beforetoggle", n), wt("toggle", n)), o.onScroll != null && wt("scroll", n), o.onScrollEnd != null && wt("scrollend", n), o.onClick != null && (n.onclick = An), n = !0) : n = !1, n || Jn(t, !0);
  }
  function qm(t) {
    for (pe = t.return; pe; )
      switch (pe.tag) {
        case 5:
        case 31:
        case 13:
          tn = !1;
          return;
        case 27:
        case 3:
          tn = !0;
          return;
        default:
          pe = pe.return;
      }
  }
  function mi(t) {
    if (t !== pe) return !1;
    if (!Et) return qm(t), Et = !0, !1;
    var n = t.tag, i;
    if ((i = n !== 3 && n !== 27) && ((i = n === 5) && (i = t.type, i = !(i !== "form" && i !== "button") || qc(t.type, t.memoizedProps)), i = !i), i && $t && Jn(t), qm(t), n === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      $t = d0(t);
    } else if (n === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      $t = d0(t);
    } else
      n === 27 ? (n = $t, fa(t.type) ? (t = Pc, Pc = null, $t = t) : $t = n) : $t = pe ? nn(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Ra() {
    $t = pe = null, Et = !1;
  }
  function Cu() {
    var t = Fn;
    return t !== null && (ze === null ? ze = t : ze.push.apply(
      ze,
      t
    ), Fn = null), t;
  }
  function bl(t) {
    Fn === null ? Fn = [t] : Fn.push(t);
  }
  var Eu = N(null), Da = null, Rn = null;
  function Wn(t, n, i) {
    I(Eu, n._currentValue), n._currentValue = i;
  }
  function Dn(t) {
    t._currentValue = Eu.current, G(Eu);
  }
  function Au(t, n, i) {
    for (; t !== null; ) {
      var o = t.alternate;
      if ((t.childLanes & n) !== n ? (t.childLanes |= n, o !== null && (o.childLanes |= n)) : o !== null && (o.childLanes & n) !== n && (o.childLanes |= n), t === i) break;
      t = t.return;
    }
  }
  function Mu(t, n, i, o) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var d = u.dependencies;
      if (d !== null) {
        var x = u.child;
        d = d.firstContext;
        t: for (; d !== null; ) {
          var C = d;
          d = u;
          for (var O = 0; O < n.length; O++)
            if (C.context === n[O]) {
              d.lanes |= i, C = d.alternate, C !== null && (C.lanes |= i), Au(
                d.return,
                i,
                t
              ), o || (x = null);
              break t;
            }
          d = C.next;
        }
      } else if (u.tag === 18) {
        if (x = u.return, x === null) throw Error(s(341));
        x.lanes |= i, d = x.alternate, d !== null && (d.lanes |= i), Au(x, i, t), x = null;
      } else x = u.child;
      if (x !== null) x.return = u;
      else
        for (x = u; x !== null; ) {
          if (x === t) {
            x = null;
            break;
          }
          if (u = x.sibling, u !== null) {
            u.return = x.return, x = u;
            break;
          }
          x = x.return;
        }
      u = x;
    }
  }
  function pi(t, n, i, o) {
    t = null;
    for (var u = n, d = !1; u !== null; ) {
      if (!d) {
        if ((u.flags & 524288) !== 0) d = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var x = u.alternate;
        if (x === null) throw Error(s(387));
        if (x = x.memoizedProps, x !== null) {
          var C = u.type;
          ke(u.pendingProps.value, x.value) || (t !== null ? t.push(C) : t = [C]);
        }
      } else if (u === gt.current) {
        if (x = u.alternate, x === null) throw Error(s(387));
        x.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(Pl) : t = [Pl]);
      }
      u = u.return;
    }
    t !== null && Mu(
      n,
      t,
      i,
      o
    ), n.flags |= 262144;
  }
  function Gs(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!ke(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Na(t) {
    Da = t, Rn = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function ye(t) {
    return $m(Da, t);
  }
  function Ys(t, n) {
    return Da === null && Na(t), $m(t, n);
  }
  function $m(t, n) {
    var i = n._currentValue;
    if (n = { context: n, memoizedValue: i, next: null }, Rn === null) {
      if (t === null) throw Error(s(308));
      Rn = n, t.dependencies = { lanes: 0, firstContext: n }, t.flags |= 524288;
    } else Rn = Rn.next = n;
    return i;
  }
  var mx = typeof AbortController < "u" ? AbortController : function() {
    var t = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(i, o) {
        t.push(o);
      }
    };
    this.abort = function() {
      n.aborted = !0, t.forEach(function(i) {
        return i();
      });
    };
  }, px = a.unstable_scheduleCallback, yx = a.unstable_NormalPriority, ne = {
    $$typeof: M,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function ju() {
    return {
      controller: new mx(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function xl(t) {
    t.refCount--, t.refCount === 0 && px(yx, function() {
      t.controller.abort();
    });
  }
  var Sl = null, _u = 0, yi = 0, gi = null;
  function gx(t, n) {
    if (Sl === null) {
      var i = Sl = [];
      _u = 0, yi = Nc(), gi = {
        status: "pending",
        value: void 0,
        then: function(o) {
          i.push(o);
        }
      };
    }
    return _u++, n.then(Gm, Gm), n;
  }
  function Gm() {
    if (--_u === 0 && Sl !== null) {
      gi !== null && (gi.status = "fulfilled");
      var t = Sl;
      Sl = null, yi = 0, gi = null;
      for (var n = 0; n < t.length; n++) (0, t[n])();
    }
  }
  function vx(t, n) {
    var i = [], o = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        i.push(u);
      }
    };
    return t.then(
      function() {
        o.status = "fulfilled", o.value = n;
        for (var u = 0; u < i.length; u++) (0, i[u])(n);
      },
      function(u) {
        for (o.status = "rejected", o.reason = u, u = 0; u < i.length; u++)
          (0, i[u])(void 0);
      }
    ), o;
  }
  var Ym = z.S;
  z.S = function(t, n) {
    M1 = Be(), typeof n == "object" && n !== null && typeof n.then == "function" && gx(t, n), Ym !== null && Ym(t, n);
  };
  var Oa = N(null);
  function Ru() {
    var t = Oa.current;
    return t !== null ? t : kt.pooledCache;
  }
  function Xs(t, n) {
    n === null ? I(Oa, Oa.current) : I(Oa, n.pool);
  }
  function Xm() {
    var t = Ru();
    return t === null ? null : { parent: ne._currentValue, pool: t };
  }
  var vi = Error(s(460)), Du = Error(s(474)), Ps = Error(s(542)), Ks = { then: function() {
  } };
  function Pm(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Km(t, n, i) {
    switch (i = t[i], i === void 0 ? t.push(n) : i !== n && (n.then(An, An), n = i), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw t = n.reason, Qm(t), t;
      default:
        if (typeof n.status == "string") n.then(An, An);
        else {
          if (t = kt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(s(482));
          t = n, t.status = "pending", t.then(
            function(o) {
              if (n.status === "pending") {
                var u = n;
                u.status = "fulfilled", u.value = o;
              }
            },
            function(o) {
              if (n.status === "pending") {
                var u = n;
                u.status = "rejected", u.reason = o;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw t = n.reason, Qm(t), t;
        }
        throw La = n, vi;
    }
  }
  function za(t) {
    try {
      var n = t._init;
      return n(t._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (La = i, vi) : i;
    }
  }
  var La = null;
  function Zm() {
    if (La === null) throw Error(s(459));
    var t = La;
    return La = null, t;
  }
  function Qm(t) {
    if (t === vi || t === Ps)
      throw Error(s(483));
  }
  var bi = null, wl = 0;
  function Zs(t) {
    var n = wl;
    return wl += 1, bi === null && (bi = []), Km(bi, t, n);
  }
  function Tl(t, n) {
    n = n.props.ref, t.ref = n !== void 0 ? n : null;
  }
  function Qs(t, n) {
    throw n.$$typeof === b ? Error(s(525)) : (t = Object.prototype.toString.call(n), Error(
      s(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : t
      )
    ));
  }
  function Fm(t) {
    function n(U, B) {
      if (t) {
        var k = U.deletions;
        k === null ? (U.deletions = [B], U.flags |= 16) : k.push(B);
      }
    }
    function i(U, B) {
      if (!t) return null;
      for (; B !== null; )
        n(U, B), B = B.sibling;
      return null;
    }
    function o(U) {
      for (var B = /* @__PURE__ */ new Map(); U !== null; )
        U.key !== null ? B.set(U.key, U) : B.set(U.index, U), U = U.sibling;
      return B;
    }
    function u(U, B) {
      return U = jn(U, B), U.index = 0, U.sibling = null, U;
    }
    function d(U, B, k) {
      return U.index = k, t ? (k = U.alternate, k !== null ? (k = k.index, k < B ? (U.flags |= 67108866, B) : k) : (U.flags |= 67108866, B)) : (U.flags |= 1048576, B);
    }
    function x(U) {
      return t && U.alternate === null && (U.flags |= 67108866), U;
    }
    function C(U, B, k, Q) {
      return B === null || B.tag !== 6 ? (B = bu(k, U.mode, Q), B.return = U, B) : (B = u(B, k), B.return = U, B);
    }
    function O(U, B, k, Q) {
      var dt = k.type;
      return dt === w ? K(
        U,
        B,
        k.props.children,
        Q,
        k.key
      ) : B !== null && (B.elementType === dt || typeof dt == "object" && dt !== null && dt.$$typeof === q && za(dt) === B.type) ? (B = u(B, k.props), Tl(B, k), B.return = U, B) : (B = qs(
        k.type,
        k.key,
        k.props,
        null,
        U.mode,
        Q
      ), Tl(B, k), B.return = U, B);
    }
    function H(U, B, k, Q) {
      return B === null || B.tag !== 4 || B.stateNode.containerInfo !== k.containerInfo || B.stateNode.implementation !== k.implementation ? (B = xu(k, U.mode, Q), B.return = U, B) : (B = u(B, k.children || []), B.return = U, B);
    }
    function K(U, B, k, Q, dt) {
      return B === null || B.tag !== 7 ? (B = _a(
        k,
        U.mode,
        Q,
        dt
      ), B.return = U, B) : (B = u(B, k), B.return = U, B);
    }
    function J(U, B, k) {
      if (typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint")
        return B = bu(
          "" + B,
          U.mode,
          k
        ), B.return = U, B;
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case T:
            return k = qs(
              B.type,
              B.key,
              B.props,
              null,
              U.mode,
              k
            ), Tl(k, B), k.return = U, k;
          case S:
            return B = xu(
              B,
              U.mode,
              k
            ), B.return = U, B;
          case q:
            return B = za(B), J(U, B, k);
        }
        if (st(B) || F(B))
          return B = _a(
            B,
            U.mode,
            k,
            null
          ), B.return = U, B;
        if (typeof B.then == "function")
          return J(U, Zs(B), k);
        if (B.$$typeof === M)
          return J(
            U,
            Ys(U, B),
            k
          );
        Qs(U, B);
      }
      return null;
    }
    function $(U, B, k, Q) {
      var dt = B !== null ? B.key : null;
      if (typeof k == "string" && k !== "" || typeof k == "number" || typeof k == "bigint")
        return dt !== null ? null : C(U, B, "" + k, Q);
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case T:
            return k.key === dt ? O(U, B, k, Q) : null;
          case S:
            return k.key === dt ? H(U, B, k, Q) : null;
          case q:
            return k = za(k), $(U, B, k, Q);
        }
        if (st(k) || F(k))
          return dt !== null ? null : K(U, B, k, Q, null);
        if (typeof k.then == "function")
          return $(
            U,
            B,
            Zs(k),
            Q
          );
        if (k.$$typeof === M)
          return $(
            U,
            B,
            Ys(U, k),
            Q
          );
        Qs(U, k);
      }
      return null;
    }
    function Y(U, B, k, Q, dt) {
      if (typeof Q == "string" && Q !== "" || typeof Q == "number" || typeof Q == "bigint")
        return U = U.get(k) || null, C(B, U, "" + Q, dt);
      if (typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case T:
            return U = U.get(
              Q.key === null ? k : Q.key
            ) || null, O(B, U, Q, dt);
          case S:
            return U = U.get(
              Q.key === null ? k : Q.key
            ) || null, H(B, U, Q, dt);
          case q:
            return Q = za(Q), Y(
              U,
              B,
              k,
              Q,
              dt
            );
        }
        if (st(Q) || F(Q))
          return U = U.get(k) || null, K(B, U, Q, dt, null);
        if (typeof Q.then == "function")
          return Y(
            U,
            B,
            k,
            Zs(Q),
            dt
          );
        if (Q.$$typeof === M)
          return Y(
            U,
            B,
            k,
            Ys(B, Q),
            dt
          );
        Qs(B, Q);
      }
      return null;
    }
    function ot(U, B, k, Q) {
      for (var dt = null, At = null, ct = B, bt = B = 0, Ct = null; ct !== null && bt < k.length; bt++) {
        ct.index > bt ? (Ct = ct, ct = null) : Ct = ct.sibling;
        var Mt = $(
          U,
          ct,
          k[bt],
          Q
        );
        if (Mt === null) {
          ct === null && (ct = Ct);
          break;
        }
        t && ct && Mt.alternate === null && n(U, ct), B = d(Mt, B, bt), At === null ? dt = Mt : At.sibling = Mt, At = Mt, ct = Ct;
      }
      if (bt === k.length)
        return i(U, ct), Et && _n(U, bt), dt;
      if (ct === null) {
        for (; bt < k.length; bt++)
          ct = J(U, k[bt], Q), ct !== null && (B = d(
            ct,
            B,
            bt
          ), At === null ? dt = ct : At.sibling = ct, At = ct);
        return Et && _n(U, bt), dt;
      }
      for (ct = o(ct); bt < k.length; bt++)
        Ct = Y(
          ct,
          U,
          bt,
          k[bt],
          Q
        ), Ct !== null && (t && Ct.alternate !== null && ct.delete(
          Ct.key === null ? bt : Ct.key
        ), B = d(
          Ct,
          B,
          bt
        ), At === null ? dt = Ct : At.sibling = Ct, At = Ct);
      return t && ct.forEach(function(ya) {
        return n(U, ya);
      }), Et && _n(U, bt), dt;
    }
    function mt(U, B, k, Q) {
      if (k == null) throw Error(s(151));
      for (var dt = null, At = null, ct = B, bt = B = 0, Ct = null, Mt = k.next(); ct !== null && !Mt.done; bt++, Mt = k.next()) {
        ct.index > bt ? (Ct = ct, ct = null) : Ct = ct.sibling;
        var ya = $(U, ct, Mt.value, Q);
        if (ya === null) {
          ct === null && (ct = Ct);
          break;
        }
        t && ct && ya.alternate === null && n(U, ct), B = d(ya, B, bt), At === null ? dt = ya : At.sibling = ya, At = ya, ct = Ct;
      }
      if (Mt.done)
        return i(U, ct), Et && _n(U, bt), dt;
      if (ct === null) {
        for (; !Mt.done; bt++, Mt = k.next())
          Mt = J(U, Mt.value, Q), Mt !== null && (B = d(Mt, B, bt), At === null ? dt = Mt : At.sibling = Mt, At = Mt);
        return Et && _n(U, bt), dt;
      }
      for (ct = o(ct); !Mt.done; bt++, Mt = k.next())
        Mt = Y(ct, U, bt, Mt.value, Q), Mt !== null && (t && Mt.alternate !== null && ct.delete(Mt.key === null ? bt : Mt.key), B = d(Mt, B, bt), At === null ? dt = Mt : At.sibling = Mt, At = Mt);
      return t && ct.forEach(function(_S) {
        return n(U, _S);
      }), Et && _n(U, bt), dt;
    }
    function Vt(U, B, k, Q) {
      if (typeof k == "object" && k !== null && k.type === w && k.key === null && (k = k.props.children), typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case T:
            t: {
              for (var dt = k.key; B !== null; ) {
                if (B.key === dt) {
                  if (dt = k.type, dt === w) {
                    if (B.tag === 7) {
                      i(
                        U,
                        B.sibling
                      ), Q = u(
                        B,
                        k.props.children
                      ), Q.return = U, U = Q;
                      break t;
                    }
                  } else if (B.elementType === dt || typeof dt == "object" && dt !== null && dt.$$typeof === q && za(dt) === B.type) {
                    i(
                      U,
                      B.sibling
                    ), Q = u(B, k.props), Tl(Q, k), Q.return = U, U = Q;
                    break t;
                  }
                  i(U, B);
                  break;
                } else n(U, B);
                B = B.sibling;
              }
              k.type === w ? (Q = _a(
                k.props.children,
                U.mode,
                Q,
                k.key
              ), Q.return = U, U = Q) : (Q = qs(
                k.type,
                k.key,
                k.props,
                null,
                U.mode,
                Q
              ), Tl(Q, k), Q.return = U, U = Q);
            }
            return x(U);
          case S:
            t: {
              for (dt = k.key; B !== null; ) {
                if (B.key === dt)
                  if (B.tag === 4 && B.stateNode.containerInfo === k.containerInfo && B.stateNode.implementation === k.implementation) {
                    i(
                      U,
                      B.sibling
                    ), Q = u(B, k.children || []), Q.return = U, U = Q;
                    break t;
                  } else {
                    i(U, B);
                    break;
                  }
                else n(U, B);
                B = B.sibling;
              }
              Q = xu(k, U.mode, Q), Q.return = U, U = Q;
            }
            return x(U);
          case q:
            return k = za(k), Vt(
              U,
              B,
              k,
              Q
            );
        }
        if (st(k))
          return ot(
            U,
            B,
            k,
            Q
          );
        if (F(k)) {
          if (dt = F(k), typeof dt != "function") throw Error(s(150));
          return k = dt.call(k), mt(
            U,
            B,
            k,
            Q
          );
        }
        if (typeof k.then == "function")
          return Vt(
            U,
            B,
            Zs(k),
            Q
          );
        if (k.$$typeof === M)
          return Vt(
            U,
            B,
            Ys(U, k),
            Q
          );
        Qs(U, k);
      }
      return typeof k == "string" && k !== "" || typeof k == "number" || typeof k == "bigint" ? (k = "" + k, B !== null && B.tag === 6 ? (i(U, B.sibling), Q = u(B, k), Q.return = U, U = Q) : (i(U, B), Q = bu(k, U.mode, Q), Q.return = U, U = Q), x(U)) : i(U, B);
    }
    return function(U, B, k, Q) {
      try {
        wl = 0;
        var dt = Vt(
          U,
          B,
          k,
          Q
        );
        return bi = null, dt;
      } catch (ct) {
        if (ct === vi || ct === Ps) throw ct;
        var At = He(29, ct, null, U.mode);
        return At.lanes = Q, At.return = U, At;
      } finally {
      }
    };
  }
  var Ba = Fm(!0), Jm = Fm(!1), In = !1;
  function Nu(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Ou(t, n) {
    t = t.updateQueue, n.updateQueue === t && (n.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function ta(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function ea(t, n, i) {
    var o = t.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (_t & 2) !== 0) {
      var u = o.pending;
      return u === null ? n.next = n : (n.next = u.next, u.next = n), o.pending = n, n = Hs(t), zm(t, null, i), n;
    }
    return ks(t, o, n, i), Hs(t);
  }
  function Cl(t, n, i) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (i & 4194048) !== 0)) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, $h(t, i);
    }
  }
  function zu(t, n) {
    var i = t.updateQueue, o = t.alternate;
    if (o !== null && (o = o.updateQueue, i === o)) {
      var u = null, d = null;
      if (i = i.firstBaseUpdate, i !== null) {
        do {
          var x = {
            lane: i.lane,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null
          };
          d === null ? u = d = x : d = d.next = x, i = i.next;
        } while (i !== null);
        d === null ? u = d = n : d = d.next = n;
      } else u = d = n;
      i = {
        baseState: o.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: d,
        shared: o.shared,
        callbacks: o.callbacks
      }, t.updateQueue = i;
      return;
    }
    t = i.lastBaseUpdate, t === null ? i.firstBaseUpdate = n : t.next = n, i.lastBaseUpdate = n;
  }
  var Lu = !1;
  function El() {
    if (Lu) {
      var t = gi;
      if (t !== null) throw t;
    }
  }
  function Al(t, n, i, o) {
    Lu = !1;
    var u = t.updateQueue;
    In = !1;
    var d = u.firstBaseUpdate, x = u.lastBaseUpdate, C = u.shared.pending;
    if (C !== null) {
      u.shared.pending = null;
      var O = C, H = O.next;
      O.next = null, x === null ? d = H : x.next = H, x = O;
      var K = t.alternate;
      K !== null && (K = K.updateQueue, C = K.lastBaseUpdate, C !== x && (C === null ? K.firstBaseUpdate = H : C.next = H, K.lastBaseUpdate = O));
    }
    if (d !== null) {
      var J = u.baseState;
      x = 0, K = H = O = null, C = d;
      do {
        var $ = C.lane & -536870913, Y = $ !== C.lane;
        if (Y ? (Tt & $) === $ : (o & $) === $) {
          $ !== 0 && $ === yi && (Lu = !0), K !== null && (K = K.next = {
            lane: 0,
            tag: C.tag,
            payload: C.payload,
            callback: null,
            next: null
          });
          t: {
            var ot = t, mt = C;
            $ = n;
            var Vt = i;
            switch (mt.tag) {
              case 1:
                if (ot = mt.payload, typeof ot == "function") {
                  J = ot.call(Vt, J, $);
                  break t;
                }
                J = ot;
                break t;
              case 3:
                ot.flags = ot.flags & -65537 | 128;
              case 0:
                if (ot = mt.payload, $ = typeof ot == "function" ? ot.call(Vt, J, $) : ot, $ == null) break t;
                J = v({}, J, $);
                break t;
              case 2:
                In = !0;
            }
          }
          $ = C.callback, $ !== null && (t.flags |= 64, Y && (t.flags |= 8192), Y = u.callbacks, Y === null ? u.callbacks = [$] : Y.push($));
        } else
          Y = {
            lane: $,
            tag: C.tag,
            payload: C.payload,
            callback: C.callback,
            next: null
          }, K === null ? (H = K = Y, O = J) : K = K.next = Y, x |= $;
        if (C = C.next, C === null) {
          if (C = u.shared.pending, C === null)
            break;
          Y = C, C = Y.next, Y.next = null, u.lastBaseUpdate = Y, u.shared.pending = null;
        }
      } while (!0);
      K === null && (O = J), u.baseState = O, u.firstBaseUpdate = H, u.lastBaseUpdate = K, d === null && (u.shared.lanes = 0), sa |= x, t.lanes = x, t.memoizedState = J;
    }
  }
  function Wm(t, n) {
    if (typeof t != "function")
      throw Error(s(191, t));
    t.call(n);
  }
  function Im(t, n) {
    var i = t.callbacks;
    if (i !== null)
      for (t.callbacks = null, t = 0; t < i.length; t++)
        Wm(i[t], n);
  }
  var xi = N(null), Fs = N(0);
  function tp(t, n) {
    t = Hn, I(Fs, t), I(xi, n), Hn = t | n.baseLanes;
  }
  function Bu() {
    I(Fs, Hn), I(xi, xi.current);
  }
  function Vu() {
    Hn = Fs.current, G(xi), G(Fs);
  }
  var qe = N(null), en = null;
  function na(t) {
    var n = t.alternate;
    I(Jt, Jt.current & 1), I(qe, t), en === null && (n === null || xi.current !== null || n.memoizedState !== null) && (en = t);
  }
  function Uu(t) {
    I(Jt, Jt.current), I(qe, t), en === null && (en = t);
  }
  function ep(t) {
    t.tag === 22 ? (I(Jt, Jt.current), I(qe, t), en === null && (en = t)) : aa();
  }
  function aa() {
    I(Jt, Jt.current), I(qe, qe.current);
  }
  function $e(t) {
    G(qe), en === t && (en = null), G(Jt);
  }
  var Jt = N(0);
  function Js(t) {
    for (var n = t; n !== null; ) {
      if (n.tag === 13) {
        var i = n.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || Yc(i) || Xc(i)))
          return n;
      } else if (n.tag === 19 && (n.memoizedProps.revealOrder === "forwards" || n.memoizedProps.revealOrder === "backwards" || n.memoizedProps.revealOrder === "unstable_legacy-backwards" || n.memoizedProps.revealOrder === "together")) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === t) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t) return null;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return null;
  }
  var Nn = 0, vt = null, Lt = null, ae = null, Ws = !1, Si = !1, Va = !1, Is = 0, Ml = 0, wi = null, bx = 0;
  function Zt() {
    throw Error(s(321));
  }
  function ku(t, n) {
    if (n === null) return !1;
    for (var i = 0; i < n.length && i < t.length; i++)
      if (!ke(t[i], n[i])) return !1;
    return !0;
  }
  function Hu(t, n, i, o, u, d) {
    return Nn = d, vt = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, z.H = t === null || t.memoizedState === null ? Up : ec, Va = !1, d = i(o, u), Va = !1, Si && (d = ap(
      n,
      i,
      o,
      u
    )), np(t), d;
  }
  function np(t) {
    z.H = Rl;
    var n = Lt !== null && Lt.next !== null;
    if (Nn = 0, ae = Lt = vt = null, Ws = !1, Ml = 0, wi = null, n) throw Error(s(300));
    t === null || ie || (t = t.dependencies, t !== null && Gs(t) && (ie = !0));
  }
  function ap(t, n, i, o) {
    vt = t;
    var u = 0;
    do {
      if (Si && (wi = null), Ml = 0, Si = !1, 25 <= u) throw Error(s(301));
      if (u += 1, ae = Lt = null, t.updateQueue != null) {
        var d = t.updateQueue;
        d.lastEffect = null, d.events = null, d.stores = null, d.memoCache != null && (d.memoCache.index = 0);
      }
      z.H = kp, d = n(i, o);
    } while (Si);
    return d;
  }
  function xx() {
    var t = z.H, n = t.useState()[0];
    return n = typeof n.then == "function" ? jl(n) : n, t = t.useState()[0], (Lt !== null ? Lt.memoizedState : null) !== t && (vt.flags |= 1024), n;
  }
  function qu() {
    var t = Is !== 0;
    return Is = 0, t;
  }
  function $u(t, n, i) {
    n.updateQueue = t.updateQueue, n.flags &= -2053, t.lanes &= ~i;
  }
  function Gu(t) {
    if (Ws) {
      for (t = t.memoizedState; t !== null; ) {
        var n = t.queue;
        n !== null && (n.pending = null), t = t.next;
      }
      Ws = !1;
    }
    Nn = 0, ae = Lt = vt = null, Si = !1, Ml = Is = 0, wi = null;
  }
  function Ce() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return ae === null ? vt.memoizedState = ae = t : ae = ae.next = t, ae;
  }
  function Wt() {
    if (Lt === null) {
      var t = vt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Lt.next;
    var n = ae === null ? vt.memoizedState : ae.next;
    if (n !== null)
      ae = n, Lt = t;
    else {
      if (t === null)
        throw vt.alternate === null ? Error(s(467)) : Error(s(310));
      Lt = t, t = {
        memoizedState: Lt.memoizedState,
        baseState: Lt.baseState,
        baseQueue: Lt.baseQueue,
        queue: Lt.queue,
        next: null
      }, ae === null ? vt.memoizedState = ae = t : ae = ae.next = t;
    }
    return ae;
  }
  function to() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function jl(t) {
    var n = Ml;
    return Ml += 1, wi === null && (wi = []), t = Km(wi, t, n), n = vt, (ae === null ? n.memoizedState : ae.next) === null && (n = n.alternate, z.H = n === null || n.memoizedState === null ? Up : ec), t;
  }
  function eo(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return jl(t);
      if (t.$$typeof === M) return ye(t);
    }
    throw Error(s(438, String(t)));
  }
  function Yu(t) {
    var n = null, i = vt.updateQueue;
    if (i !== null && (n = i.memoCache), n == null) {
      var o = vt.alternate;
      o !== null && (o = o.updateQueue, o !== null && (o = o.memoCache, o != null && (n = {
        data: o.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), i === null && (i = to(), vt.updateQueue = i), i.memoCache = n, i = n.data[n.index], i === void 0)
      for (i = n.data[n.index] = Array(t), o = 0; o < t; o++)
        i[o] = Z;
    return n.index++, i;
  }
  function On(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function no(t) {
    var n = Wt();
    return Xu(n, Lt, t);
  }
  function Xu(t, n, i) {
    var o = t.queue;
    if (o === null) throw Error(s(311));
    o.lastRenderedReducer = i;
    var u = t.baseQueue, d = o.pending;
    if (d !== null) {
      if (u !== null) {
        var x = u.next;
        u.next = d.next, d.next = x;
      }
      n.baseQueue = u = d, o.pending = null;
    }
    if (d = t.baseState, u === null) t.memoizedState = d;
    else {
      n = u.next;
      var C = x = null, O = null, H = n, K = !1;
      do {
        var J = H.lane & -536870913;
        if (J !== H.lane ? (Tt & J) === J : (Nn & J) === J) {
          var $ = H.revertLane;
          if ($ === 0)
            O !== null && (O = O.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: H.action,
              hasEagerState: H.hasEagerState,
              eagerState: H.eagerState,
              next: null
            }), J === yi && (K = !0);
          else if ((Nn & $) === $) {
            H = H.next, $ === yi && (K = !0);
            continue;
          } else
            J = {
              lane: 0,
              revertLane: H.revertLane,
              gesture: null,
              action: H.action,
              hasEagerState: H.hasEagerState,
              eagerState: H.eagerState,
              next: null
            }, O === null ? (C = O = J, x = d) : O = O.next = J, vt.lanes |= $, sa |= $;
          J = H.action, Va && i(d, J), d = H.hasEagerState ? H.eagerState : i(d, J);
        } else
          $ = {
            lane: J,
            revertLane: H.revertLane,
            gesture: H.gesture,
            action: H.action,
            hasEagerState: H.hasEagerState,
            eagerState: H.eagerState,
            next: null
          }, O === null ? (C = O = $, x = d) : O = O.next = $, vt.lanes |= J, sa |= J;
        H = H.next;
      } while (H !== null && H !== n);
      if (O === null ? x = d : O.next = C, !ke(d, t.memoizedState) && (ie = !0, K && (i = gi, i !== null)))
        throw i;
      t.memoizedState = d, t.baseState = x, t.baseQueue = O, o.lastRenderedState = d;
    }
    return u === null && (o.lanes = 0), [t.memoizedState, o.dispatch];
  }
  function Pu(t) {
    var n = Wt(), i = n.queue;
    if (i === null) throw Error(s(311));
    i.lastRenderedReducer = t;
    var o = i.dispatch, u = i.pending, d = n.memoizedState;
    if (u !== null) {
      i.pending = null;
      var x = u = u.next;
      do
        d = t(d, x.action), x = x.next;
      while (x !== u);
      ke(d, n.memoizedState) || (ie = !0), n.memoizedState = d, n.baseQueue === null && (n.baseState = d), i.lastRenderedState = d;
    }
    return [d, o];
  }
  function ip(t, n, i) {
    var o = vt, u = Wt(), d = Et;
    if (d) {
      if (i === void 0) throw Error(s(407));
      i = i();
    } else i = n();
    var x = !ke(
      (Lt || u).memoizedState,
      i
    );
    if (x && (u.memoizedState = i, ie = !0), u = u.queue, Qu(op.bind(null, o, u, t), [
      t
    ]), u.getSnapshot !== n || x || ae !== null && ae.memoizedState.tag & 1) {
      if (o.flags |= 2048, Ti(
        9,
        { destroy: void 0 },
        sp.bind(
          null,
          o,
          u,
          i,
          n
        ),
        null
      ), kt === null) throw Error(s(349));
      d || (Nn & 127) !== 0 || lp(o, n, i);
    }
    return i;
  }
  function lp(t, n, i) {
    t.flags |= 16384, t = { getSnapshot: n, value: i }, n = vt.updateQueue, n === null ? (n = to(), vt.updateQueue = n, n.stores = [t]) : (i = n.stores, i === null ? n.stores = [t] : i.push(t));
  }
  function sp(t, n, i, o) {
    n.value = i, n.getSnapshot = o, rp(n) && up(t);
  }
  function op(t, n, i) {
    return i(function() {
      rp(n) && up(t);
    });
  }
  function rp(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var i = n();
      return !ke(t, i);
    } catch {
      return !0;
    }
  }
  function up(t) {
    var n = ja(t, 2);
    n !== null && Le(n, t, 2);
  }
  function Ku(t) {
    var n = Ce();
    if (typeof t == "function") {
      var i = t;
      if (t = i(), Va) {
        Pn(!0);
        try {
          i();
        } finally {
          Pn(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = t, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: On,
      lastRenderedState: t
    }, n;
  }
  function cp(t, n, i, o) {
    return t.baseState = i, Xu(
      t,
      Lt,
      typeof o == "function" ? o : On
    );
  }
  function Sx(t, n, i, o, u) {
    if (lo(t)) throw Error(s(485));
    if (t = n.action, t !== null) {
      var d = {
        payload: u,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(x) {
          d.listeners.push(x);
        }
      };
      z.T !== null ? i(!0) : d.isTransition = !1, o(d), i = n.pending, i === null ? (d.next = n.pending = d, fp(n, d)) : (d.next = i.next, n.pending = i.next = d);
    }
  }
  function fp(t, n) {
    var i = n.action, o = n.payload, u = t.state;
    if (n.isTransition) {
      var d = z.T, x = {};
      z.T = x;
      try {
        var C = i(u, o), O = z.S;
        O !== null && O(x, C), dp(t, n, C);
      } catch (H) {
        Zu(t, n, H);
      } finally {
        d !== null && x.types !== null && (d.types = x.types), z.T = d;
      }
    } else
      try {
        d = i(u, o), dp(t, n, d);
      } catch (H) {
        Zu(t, n, H);
      }
  }
  function dp(t, n, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(o) {
        hp(t, n, o);
      },
      function(o) {
        return Zu(t, n, o);
      }
    ) : hp(t, n, i);
  }
  function hp(t, n, i) {
    n.status = "fulfilled", n.value = i, mp(n), t.state = i, n = t.pending, n !== null && (i = n.next, i === n ? t.pending = null : (i = i.next, n.next = i, fp(t, i)));
  }
  function Zu(t, n, i) {
    var o = t.pending;
    if (t.pending = null, o !== null) {
      o = o.next;
      do
        n.status = "rejected", n.reason = i, mp(n), n = n.next;
      while (n !== o);
    }
    t.action = null;
  }
  function mp(t) {
    t = t.listeners;
    for (var n = 0; n < t.length; n++) (0, t[n])();
  }
  function pp(t, n) {
    return n;
  }
  function yp(t, n) {
    if (Et) {
      var i = kt.formState;
      if (i !== null) {
        t: {
          var o = vt;
          if (Et) {
            if ($t) {
              e: {
                for (var u = $t, d = tn; u.nodeType !== 8; ) {
                  if (!d) {
                    u = null;
                    break e;
                  }
                  if (u = nn(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break e;
                  }
                }
                d = u.data, u = d === "F!" || d === "F" ? u : null;
              }
              if (u) {
                $t = nn(
                  u.nextSibling
                ), o = u.data === "F!";
                break t;
              }
            }
            Jn(o);
          }
          o = !1;
        }
        o && (n = i[0]);
      }
    }
    return i = Ce(), i.memoizedState = i.baseState = n, o = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: pp,
      lastRenderedState: n
    }, i.queue = o, i = Lp.bind(
      null,
      vt,
      o
    ), o.dispatch = i, o = Ku(!1), d = tc.bind(
      null,
      vt,
      !1,
      o.queue
    ), o = Ce(), u = {
      state: n,
      dispatch: null,
      action: t,
      pending: null
    }, o.queue = u, i = Sx.bind(
      null,
      vt,
      u,
      d,
      i
    ), u.dispatch = i, o.memoizedState = t, [n, i, !1];
  }
  function gp(t) {
    var n = Wt();
    return vp(n, Lt, t);
  }
  function vp(t, n, i) {
    if (n = Xu(
      t,
      n,
      pp
    )[0], t = no(On)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var o = jl(n);
      } catch (x) {
        throw x === vi ? Ps : x;
      }
    else o = n;
    n = Wt();
    var u = n.queue, d = u.dispatch;
    return i !== n.memoizedState && (vt.flags |= 2048, Ti(
      9,
      { destroy: void 0 },
      wx.bind(null, u, i),
      null
    )), [o, d, t];
  }
  function wx(t, n) {
    t.action = n;
  }
  function bp(t) {
    var n = Wt(), i = Lt;
    if (i !== null)
      return vp(n, i, t);
    Wt(), n = n.memoizedState, i = Wt();
    var o = i.queue.dispatch;
    return i.memoizedState = t, [n, o, !1];
  }
  function Ti(t, n, i, o) {
    return t = { tag: t, create: i, deps: o, inst: n, next: null }, n = vt.updateQueue, n === null && (n = to(), vt.updateQueue = n), i = n.lastEffect, i === null ? n.lastEffect = t.next = t : (o = i.next, i.next = t, t.next = o, n.lastEffect = t), t;
  }
  function xp() {
    return Wt().memoizedState;
  }
  function ao(t, n, i, o) {
    var u = Ce();
    vt.flags |= t, u.memoizedState = Ti(
      1 | n,
      { destroy: void 0 },
      i,
      o === void 0 ? null : o
    );
  }
  function io(t, n, i, o) {
    var u = Wt();
    o = o === void 0 ? null : o;
    var d = u.memoizedState.inst;
    Lt !== null && o !== null && ku(o, Lt.memoizedState.deps) ? u.memoizedState = Ti(n, d, i, o) : (vt.flags |= t, u.memoizedState = Ti(
      1 | n,
      d,
      i,
      o
    ));
  }
  function Sp(t, n) {
    ao(8390656, 8, t, n);
  }
  function Qu(t, n) {
    io(2048, 8, t, n);
  }
  function Tx(t) {
    vt.flags |= 4;
    var n = vt.updateQueue;
    if (n === null)
      n = to(), vt.updateQueue = n, n.events = [t];
    else {
      var i = n.events;
      i === null ? n.events = [t] : i.push(t);
    }
  }
  function wp(t) {
    var n = Wt().memoizedState;
    return Tx({ ref: n, nextImpl: t }), function() {
      if ((_t & 2) !== 0) throw Error(s(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Tp(t, n) {
    return io(4, 2, t, n);
  }
  function Cp(t, n) {
    return io(4, 4, t, n);
  }
  function Ep(t, n) {
    if (typeof n == "function") {
      t = t();
      var i = n(t);
      return function() {
        typeof i == "function" ? i() : n(null);
      };
    }
    if (n != null)
      return t = t(), n.current = t, function() {
        n.current = null;
      };
  }
  function Ap(t, n, i) {
    i = i != null ? i.concat([t]) : null, io(4, 4, Ep.bind(null, n, t), i);
  }
  function Fu() {
  }
  function Mp(t, n) {
    var i = Wt();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    return n !== null && ku(n, o[1]) ? o[0] : (i.memoizedState = [t, n], t);
  }
  function jp(t, n) {
    var i = Wt();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    if (n !== null && ku(n, o[1]))
      return o[0];
    if (o = t(), Va) {
      Pn(!0);
      try {
        t();
      } finally {
        Pn(!1);
      }
    }
    return i.memoizedState = [o, n], o;
  }
  function Ju(t, n, i) {
    return i === void 0 || (Nn & 1073741824) !== 0 && (Tt & 261930) === 0 ? t.memoizedState = n : (t.memoizedState = i, t = _1(), vt.lanes |= t, sa |= t, i);
  }
  function _p(t, n, i, o) {
    return ke(i, n) ? i : xi.current !== null ? (t = Ju(t, i, o), ke(t, n) || (ie = !0), t) : (Nn & 42) === 0 || (Nn & 1073741824) !== 0 && (Tt & 261930) === 0 ? (ie = !0, t.memoizedState = i) : (t = _1(), vt.lanes |= t, sa |= t, n);
  }
  function Rp(t, n, i, o, u) {
    var d = P.p;
    P.p = d !== 0 && 8 > d ? d : 8;
    var x = z.T, C = {};
    z.T = C, tc(t, !1, n, i);
    try {
      var O = u(), H = z.S;
      if (H !== null && H(C, O), O !== null && typeof O == "object" && typeof O.then == "function") {
        var K = vx(
          O,
          o
        );
        _l(
          t,
          n,
          K,
          Xe(t)
        );
      } else
        _l(
          t,
          n,
          o,
          Xe(t)
        );
    } catch (J) {
      _l(
        t,
        n,
        { then: function() {
        }, status: "rejected", reason: J },
        Xe()
      );
    } finally {
      P.p = d, x !== null && C.types !== null && (x.types = C.types), z.T = x;
    }
  }
  function Cx() {
  }
  function Wu(t, n, i, o) {
    if (t.tag !== 5) throw Error(s(476));
    var u = Dp(t).queue;
    Rp(
      t,
      u,
      n,
      tt,
      i === null ? Cx : function() {
        return Np(t), i(o);
      }
    );
  }
  function Dp(t) {
    var n = t.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: tt,
      baseState: tt,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: On,
        lastRenderedState: tt
      },
      next: null
    };
    var i = {};
    return n.next = {
      memoizedState: i,
      baseState: i,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: On,
        lastRenderedState: i
      },
      next: null
    }, t.memoizedState = n, t = t.alternate, t !== null && (t.memoizedState = n), n;
  }
  function Np(t) {
    var n = Dp(t);
    n.next === null && (n = t.alternate.memoizedState), _l(
      t,
      n.next.queue,
      {},
      Xe()
    );
  }
  function Iu() {
    return ye(Pl);
  }
  function Op() {
    return Wt().memoizedState;
  }
  function zp() {
    return Wt().memoizedState;
  }
  function Ex(t) {
    for (var n = t.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var i = Xe();
          t = ta(i);
          var o = ea(n, t, i);
          o !== null && (Le(o, n, i), Cl(o, n, i)), n = { cache: ju() }, t.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function Ax(t, n, i) {
    var o = Xe();
    i = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, lo(t) ? Bp(n, i) : (i = gu(t, n, i, o), i !== null && (Le(i, t, o), Vp(i, n, o)));
  }
  function Lp(t, n, i) {
    var o = Xe();
    _l(t, n, i, o);
  }
  function _l(t, n, i, o) {
    var u = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (lo(t)) Bp(n, u);
    else {
      var d = t.alternate;
      if (t.lanes === 0 && (d === null || d.lanes === 0) && (d = n.lastRenderedReducer, d !== null))
        try {
          var x = n.lastRenderedState, C = d(x, i);
          if (u.hasEagerState = !0, u.eagerState = C, ke(C, x))
            return ks(t, n, u, 0), kt === null && Us(), !1;
        } catch {
        } finally {
        }
      if (i = gu(t, n, u, o), i !== null)
        return Le(i, t, o), Vp(i, n, o), !0;
    }
    return !1;
  }
  function tc(t, n, i, o) {
    if (o = {
      lane: 2,
      revertLane: Nc(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, lo(t)) {
      if (n) throw Error(s(479));
    } else
      n = gu(
        t,
        i,
        o,
        2
      ), n !== null && Le(n, t, 2);
  }
  function lo(t) {
    var n = t.alternate;
    return t === vt || n !== null && n === vt;
  }
  function Bp(t, n) {
    Si = Ws = !0;
    var i = t.pending;
    i === null ? n.next = n : (n.next = i.next, i.next = n), t.pending = n;
  }
  function Vp(t, n, i) {
    if ((i & 4194048) !== 0) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, $h(t, i);
    }
  }
  var Rl = {
    readContext: ye,
    use: eo,
    useCallback: Zt,
    useContext: Zt,
    useEffect: Zt,
    useImperativeHandle: Zt,
    useLayoutEffect: Zt,
    useInsertionEffect: Zt,
    useMemo: Zt,
    useReducer: Zt,
    useRef: Zt,
    useState: Zt,
    useDebugValue: Zt,
    useDeferredValue: Zt,
    useTransition: Zt,
    useSyncExternalStore: Zt,
    useId: Zt,
    useHostTransitionStatus: Zt,
    useFormState: Zt,
    useActionState: Zt,
    useOptimistic: Zt,
    useMemoCache: Zt,
    useCacheRefresh: Zt
  };
  Rl.useEffectEvent = Zt;
  var Up = {
    readContext: ye,
    use: eo,
    useCallback: function(t, n) {
      return Ce().memoizedState = [
        t,
        n === void 0 ? null : n
      ], t;
    },
    useContext: ye,
    useEffect: Sp,
    useImperativeHandle: function(t, n, i) {
      i = i != null ? i.concat([t]) : null, ao(
        4194308,
        4,
        Ep.bind(null, n, t),
        i
      );
    },
    useLayoutEffect: function(t, n) {
      return ao(4194308, 4, t, n);
    },
    useInsertionEffect: function(t, n) {
      ao(4, 2, t, n);
    },
    useMemo: function(t, n) {
      var i = Ce();
      n = n === void 0 ? null : n;
      var o = t();
      if (Va) {
        Pn(!0);
        try {
          t();
        } finally {
          Pn(!1);
        }
      }
      return i.memoizedState = [o, n], o;
    },
    useReducer: function(t, n, i) {
      var o = Ce();
      if (i !== void 0) {
        var u = i(n);
        if (Va) {
          Pn(!0);
          try {
            i(n);
          } finally {
            Pn(!1);
          }
        }
      } else u = n;
      return o.memoizedState = o.baseState = u, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: u
      }, o.queue = t, t = t.dispatch = Ax.bind(
        null,
        vt,
        t
      ), [o.memoizedState, t];
    },
    useRef: function(t) {
      var n = Ce();
      return t = { current: t }, n.memoizedState = t;
    },
    useState: function(t) {
      t = Ku(t);
      var n = t.queue, i = Lp.bind(null, vt, n);
      return n.dispatch = i, [t.memoizedState, i];
    },
    useDebugValue: Fu,
    useDeferredValue: function(t, n) {
      var i = Ce();
      return Ju(i, t, n);
    },
    useTransition: function() {
      var t = Ku(!1);
      return t = Rp.bind(
        null,
        vt,
        t.queue,
        !0,
        !1
      ), Ce().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, n, i) {
      var o = vt, u = Ce();
      if (Et) {
        if (i === void 0)
          throw Error(s(407));
        i = i();
      } else {
        if (i = n(), kt === null)
          throw Error(s(349));
        (Tt & 127) !== 0 || lp(o, n, i);
      }
      u.memoizedState = i;
      var d = { value: i, getSnapshot: n };
      return u.queue = d, Sp(op.bind(null, o, d, t), [
        t
      ]), o.flags |= 2048, Ti(
        9,
        { destroy: void 0 },
        sp.bind(
          null,
          o,
          d,
          i,
          n
        ),
        null
      ), i;
    },
    useId: function() {
      var t = Ce(), n = kt.identifierPrefix;
      if (Et) {
        var i = gn, o = yn;
        i = (o & ~(1 << 32 - Ue(o) - 1)).toString(32) + i, n = "_" + n + "R_" + i, i = Is++, 0 < i && (n += "H" + i.toString(32)), n += "_";
      } else
        i = bx++, n = "_" + n + "r_" + i.toString(32) + "_";
      return t.memoizedState = n;
    },
    useHostTransitionStatus: Iu,
    useFormState: yp,
    useActionState: yp,
    useOptimistic: function(t) {
      var n = Ce();
      n.memoizedState = n.baseState = t;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = i, n = tc.bind(
        null,
        vt,
        !0,
        i
      ), i.dispatch = n, [t, n];
    },
    useMemoCache: Yu,
    useCacheRefresh: function() {
      return Ce().memoizedState = Ex.bind(
        null,
        vt
      );
    },
    useEffectEvent: function(t) {
      var n = Ce(), i = { impl: t };
      return n.memoizedState = i, function() {
        if ((_t & 2) !== 0)
          throw Error(s(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, ec = {
    readContext: ye,
    use: eo,
    useCallback: Mp,
    useContext: ye,
    useEffect: Qu,
    useImperativeHandle: Ap,
    useInsertionEffect: Tp,
    useLayoutEffect: Cp,
    useMemo: jp,
    useReducer: no,
    useRef: xp,
    useState: function() {
      return no(On);
    },
    useDebugValue: Fu,
    useDeferredValue: function(t, n) {
      var i = Wt();
      return _p(
        i,
        Lt.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = no(On)[0], n = Wt().memoizedState;
      return [
        typeof t == "boolean" ? t : jl(t),
        n
      ];
    },
    useSyncExternalStore: ip,
    useId: Op,
    useHostTransitionStatus: Iu,
    useFormState: gp,
    useActionState: gp,
    useOptimistic: function(t, n) {
      var i = Wt();
      return cp(i, Lt, t, n);
    },
    useMemoCache: Yu,
    useCacheRefresh: zp
  };
  ec.useEffectEvent = wp;
  var kp = {
    readContext: ye,
    use: eo,
    useCallback: Mp,
    useContext: ye,
    useEffect: Qu,
    useImperativeHandle: Ap,
    useInsertionEffect: Tp,
    useLayoutEffect: Cp,
    useMemo: jp,
    useReducer: Pu,
    useRef: xp,
    useState: function() {
      return Pu(On);
    },
    useDebugValue: Fu,
    useDeferredValue: function(t, n) {
      var i = Wt();
      return Lt === null ? Ju(i, t, n) : _p(
        i,
        Lt.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = Pu(On)[0], n = Wt().memoizedState;
      return [
        typeof t == "boolean" ? t : jl(t),
        n
      ];
    },
    useSyncExternalStore: ip,
    useId: Op,
    useHostTransitionStatus: Iu,
    useFormState: bp,
    useActionState: bp,
    useOptimistic: function(t, n) {
      var i = Wt();
      return Lt !== null ? cp(i, Lt, t, n) : (i.baseState = t, [t, i.queue.dispatch]);
    },
    useMemoCache: Yu,
    useCacheRefresh: zp
  };
  kp.useEffectEvent = wp;
  function nc(t, n, i, o) {
    n = t.memoizedState, i = i(o, n), i = i == null ? n : v({}, n, i), t.memoizedState = i, t.lanes === 0 && (t.updateQueue.baseState = i);
  }
  var ac = {
    enqueueSetState: function(t, n, i) {
      t = t._reactInternals;
      var o = Xe(), u = ta(o);
      u.payload = n, i != null && (u.callback = i), n = ea(t, u, o), n !== null && (Le(n, t, o), Cl(n, t, o));
    },
    enqueueReplaceState: function(t, n, i) {
      t = t._reactInternals;
      var o = Xe(), u = ta(o);
      u.tag = 1, u.payload = n, i != null && (u.callback = i), n = ea(t, u, o), n !== null && (Le(n, t, o), Cl(n, t, o));
    },
    enqueueForceUpdate: function(t, n) {
      t = t._reactInternals;
      var i = Xe(), o = ta(i);
      o.tag = 2, n != null && (o.callback = n), n = ea(t, o, i), n !== null && (Le(n, t, i), Cl(n, t, i));
    }
  };
  function Hp(t, n, i, o, u, d, x) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(o, d, x) : n.prototype && n.prototype.isPureReactComponent ? !yl(i, o) || !yl(u, d) : !0;
  }
  function qp(t, n, i, o) {
    t = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(i, o), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(i, o), n.state !== t && ac.enqueueReplaceState(n, n.state, null);
  }
  function Ua(t, n) {
    var i = n;
    if ("ref" in n) {
      i = {};
      for (var o in n)
        o !== "ref" && (i[o] = n[o]);
    }
    if (t = t.defaultProps) {
      i === n && (i = v({}, i));
      for (var u in t)
        i[u] === void 0 && (i[u] = t[u]);
    }
    return i;
  }
  function $p(t) {
    Vs(t);
  }
  function Gp(t) {
    console.error(t);
  }
  function Yp(t) {
    Vs(t);
  }
  function so(t, n) {
    try {
      var i = t.onUncaughtError;
      i(n.value, { componentStack: n.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function Xp(t, n, i) {
    try {
      var o = t.onCaughtError;
      o(i.value, {
        componentStack: i.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function ic(t, n, i) {
    return i = ta(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      so(t, n);
    }, i;
  }
  function Pp(t) {
    return t = ta(t), t.tag = 3, t;
  }
  function Kp(t, n, i, o) {
    var u = i.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var d = o.value;
      t.payload = function() {
        return u(d);
      }, t.callback = function() {
        Xp(n, i, o);
      };
    }
    var x = i.stateNode;
    x !== null && typeof x.componentDidCatch == "function" && (t.callback = function() {
      Xp(n, i, o), typeof u != "function" && (oa === null ? oa = /* @__PURE__ */ new Set([this]) : oa.add(this));
      var C = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: C !== null ? C : ""
      });
    });
  }
  function Mx(t, n, i, o, u) {
    if (i.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (n = i.alternate, n !== null && pi(
        n,
        i,
        u,
        !0
      ), i = qe.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return en === null ? bo() : i.alternate === null && Qt === 0 && (Qt = 3), i.flags &= -257, i.flags |= 65536, i.lanes = u, o === Ks ? i.flags |= 16384 : (n = i.updateQueue, n === null ? i.updateQueue = /* @__PURE__ */ new Set([o]) : n.add(o), _c(t, o, u)), !1;
          case 22:
            return i.flags |= 65536, o === Ks ? i.flags |= 16384 : (n = i.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, i.updateQueue = n) : (i = n.retryQueue, i === null ? n.retryQueue = /* @__PURE__ */ new Set([o]) : i.add(o)), _c(t, o, u)), !1;
        }
        throw Error(s(435, i.tag));
      }
      return _c(t, o, u), bo(), !1;
    }
    if (Et)
      return n = qe.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = u, o !== Tu && (t = Error(s(422), { cause: o }), bl(Je(t, i)))) : (o !== Tu && (n = Error(s(423), {
        cause: o
      }), bl(
        Je(n, i)
      )), t = t.current.alternate, t.flags |= 65536, u &= -u, t.lanes |= u, o = Je(o, i), u = ic(
        t.stateNode,
        o,
        u
      ), zu(t, u), Qt !== 4 && (Qt = 2)), !1;
    var d = Error(s(520), { cause: o });
    if (d = Je(d, i), Ul === null ? Ul = [d] : Ul.push(d), Qt !== 4 && (Qt = 2), n === null) return !0;
    o = Je(o, i), i = n;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, t = u & -u, i.lanes |= t, t = ic(i.stateNode, o, t), zu(i, t), !1;
        case 1:
          if (n = i.type, d = i.stateNode, (i.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (oa === null || !oa.has(d))))
            return i.flags |= 65536, u &= -u, i.lanes |= u, u = Pp(u), Kp(
              u,
              t,
              i,
              o
            ), zu(i, u), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var lc = Error(s(461)), ie = !1;
  function ge(t, n, i, o) {
    n.child = t === null ? Jm(n, null, i, o) : Ba(
      n,
      t.child,
      i,
      o
    );
  }
  function Zp(t, n, i, o, u) {
    i = i.render;
    var d = n.ref;
    if ("ref" in o) {
      var x = {};
      for (var C in o)
        C !== "ref" && (x[C] = o[C]);
    } else x = o;
    return Na(n), o = Hu(
      t,
      n,
      i,
      x,
      d,
      u
    ), C = qu(), t !== null && !ie ? ($u(t, n, u), zn(t, n, u)) : (Et && C && Su(n), n.flags |= 1, ge(t, n, o, u), n.child);
  }
  function Qp(t, n, i, o, u) {
    if (t === null) {
      var d = i.type;
      return typeof d == "function" && !vu(d) && d.defaultProps === void 0 && i.compare === null ? (n.tag = 15, n.type = d, Fp(
        t,
        n,
        d,
        o,
        u
      )) : (t = qs(
        i.type,
        null,
        o,
        n,
        n.mode,
        u
      ), t.ref = n.ref, t.return = n, n.child = t);
    }
    if (d = t.child, !hc(t, u)) {
      var x = d.memoizedProps;
      if (i = i.compare, i = i !== null ? i : yl, i(x, o) && t.ref === n.ref)
        return zn(t, n, u);
    }
    return n.flags |= 1, t = jn(d, o), t.ref = n.ref, t.return = n, n.child = t;
  }
  function Fp(t, n, i, o, u) {
    if (t !== null) {
      var d = t.memoizedProps;
      if (yl(d, o) && t.ref === n.ref)
        if (ie = !1, n.pendingProps = o = d, hc(t, u))
          (t.flags & 131072) !== 0 && (ie = !0);
        else
          return n.lanes = t.lanes, zn(t, n, u);
    }
    return sc(
      t,
      n,
      i,
      o,
      u
    );
  }
  function Jp(t, n, i, o) {
    var u = o.children, d = t !== null ? t.memoizedState : null;
    if (t === null && n.stateNode === null && (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), o.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (d = d !== null ? d.baseLanes | i : i, t !== null) {
          for (o = n.child = t.child, u = 0; o !== null; )
            u = u | o.lanes | o.childLanes, o = o.sibling;
          o = u & ~d;
        } else o = 0, n.child = null;
        return Wp(
          t,
          n,
          d,
          i,
          o
        );
      }
      if ((i & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Xs(
          n,
          d !== null ? d.cachePool : null
        ), d !== null ? tp(n, d) : Bu(), ep(n);
      else
        return o = n.lanes = 536870912, Wp(
          t,
          n,
          d !== null ? d.baseLanes | i : i,
          i,
          o
        );
    } else
      d !== null ? (Xs(n, d.cachePool), tp(n, d), aa(), n.memoizedState = null) : (t !== null && Xs(n, null), Bu(), aa());
    return ge(t, n, u, i), n.child;
  }
  function Dl(t, n) {
    return t !== null && t.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function Wp(t, n, i, o, u) {
    var d = Ru();
    return d = d === null ? null : { parent: ne._currentValue, pool: d }, n.memoizedState = {
      baseLanes: i,
      cachePool: d
    }, t !== null && Xs(n, null), Bu(), ep(n), t !== null && pi(t, n, o, !0), n.childLanes = u, null;
  }
  function oo(t, n) {
    return n = uo(
      { mode: n.mode, children: n.children },
      t.mode
    ), n.ref = t.ref, t.child = n, n.return = t, n;
  }
  function Ip(t, n, i) {
    return Ba(n, t.child, null, i), t = oo(n, n.pendingProps), t.flags |= 2, $e(n), n.memoizedState = null, t;
  }
  function jx(t, n, i) {
    var o = n.pendingProps, u = (n.flags & 128) !== 0;
    if (n.flags &= -129, t === null) {
      if (Et) {
        if (o.mode === "hidden")
          return t = oo(n, o), n.lanes = 536870912, Dl(null, t);
        if (Uu(n), (t = $t) ? (t = f0(
          t,
          tn
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Qn !== null ? { id: yn, overflow: gn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Bm(t), i.return = n, n.child = i, pe = n, $t = null)) : t = null, t === null) throw Jn(n);
        return n.lanes = 536870912, null;
      }
      return oo(n, o);
    }
    var d = t.memoizedState;
    if (d !== null) {
      var x = d.dehydrated;
      if (Uu(n), u)
        if (n.flags & 256)
          n.flags &= -257, n = Ip(
            t,
            n,
            i
          );
        else if (n.memoizedState !== null)
          n.child = t.child, n.flags |= 128, n = null;
        else throw Error(s(558));
      else if (ie || pi(t, n, i, !1), u = (i & t.childLanes) !== 0, ie || u) {
        if (o = kt, o !== null && (x = Gh(o, i), x !== 0 && x !== d.retryLane))
          throw d.retryLane = x, ja(t, x), Le(o, t, x), lc;
        bo(), n = Ip(
          t,
          n,
          i
        );
      } else
        t = d.treeContext, $t = nn(x.nextSibling), pe = n, Et = !0, Fn = null, tn = !1, t !== null && km(n, t), n = oo(n, o), n.flags |= 4096;
      return n;
    }
    return t = jn(t.child, {
      mode: o.mode,
      children: o.children
    }), t.ref = n.ref, n.child = t, t.return = n, t;
  }
  function ro(t, n) {
    var i = n.ref;
    if (i === null)
      t !== null && t.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(s(284));
      (t === null || t.ref !== i) && (n.flags |= 4194816);
    }
  }
  function sc(t, n, i, o, u) {
    return Na(n), i = Hu(
      t,
      n,
      i,
      o,
      void 0,
      u
    ), o = qu(), t !== null && !ie ? ($u(t, n, u), zn(t, n, u)) : (Et && o && Su(n), n.flags |= 1, ge(t, n, i, u), n.child);
  }
  function t1(t, n, i, o, u, d) {
    return Na(n), n.updateQueue = null, i = ap(
      n,
      o,
      i,
      u
    ), np(t), o = qu(), t !== null && !ie ? ($u(t, n, d), zn(t, n, d)) : (Et && o && Su(n), n.flags |= 1, ge(t, n, i, d), n.child);
  }
  function e1(t, n, i, o, u) {
    if (Na(n), n.stateNode === null) {
      var d = fi, x = i.contextType;
      typeof x == "object" && x !== null && (d = ye(x)), d = new i(o, d), n.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, d.updater = ac, n.stateNode = d, d._reactInternals = n, d = n.stateNode, d.props = o, d.state = n.memoizedState, d.refs = {}, Nu(n), x = i.contextType, d.context = typeof x == "object" && x !== null ? ye(x) : fi, d.state = n.memoizedState, x = i.getDerivedStateFromProps, typeof x == "function" && (nc(
        n,
        i,
        x,
        o
      ), d.state = n.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (x = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), x !== d.state && ac.enqueueReplaceState(d, d.state, null), Al(n, o, d, u), El(), d.state = n.memoizedState), typeof d.componentDidMount == "function" && (n.flags |= 4194308), o = !0;
    } else if (t === null) {
      d = n.stateNode;
      var C = n.memoizedProps, O = Ua(i, C);
      d.props = O;
      var H = d.context, K = i.contextType;
      x = fi, typeof K == "object" && K !== null && (x = ye(K));
      var J = i.getDerivedStateFromProps;
      K = typeof J == "function" || typeof d.getSnapshotBeforeUpdate == "function", C = n.pendingProps !== C, K || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (C || H !== x) && qp(
        n,
        d,
        o,
        x
      ), In = !1;
      var $ = n.memoizedState;
      d.state = $, Al(n, o, d, u), El(), H = n.memoizedState, C || $ !== H || In ? (typeof J == "function" && (nc(
        n,
        i,
        J,
        o
      ), H = n.memoizedState), (O = In || Hp(
        n,
        i,
        O,
        o,
        $,
        H,
        x
      )) ? (K || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = o, n.memoizedState = H), d.props = o, d.state = H, d.context = x, o = O) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), o = !1);
    } else {
      d = n.stateNode, Ou(t, n), x = n.memoizedProps, K = Ua(i, x), d.props = K, J = n.pendingProps, $ = d.context, H = i.contextType, O = fi, typeof H == "object" && H !== null && (O = ye(H)), C = i.getDerivedStateFromProps, (H = typeof C == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (x !== J || $ !== O) && qp(
        n,
        d,
        o,
        O
      ), In = !1, $ = n.memoizedState, d.state = $, Al(n, o, d, u), El();
      var Y = n.memoizedState;
      x !== J || $ !== Y || In || t !== null && t.dependencies !== null && Gs(t.dependencies) ? (typeof C == "function" && (nc(
        n,
        i,
        C,
        o
      ), Y = n.memoizedState), (K = In || Hp(
        n,
        i,
        K,
        o,
        $,
        Y,
        O
      ) || t !== null && t.dependencies !== null && Gs(t.dependencies)) ? (H || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(o, Y, O), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(
        o,
        Y,
        O
      )), typeof d.componentDidUpdate == "function" && (n.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || x === t.memoizedProps && $ === t.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || x === t.memoizedProps && $ === t.memoizedState || (n.flags |= 1024), n.memoizedProps = o, n.memoizedState = Y), d.props = o, d.state = Y, d.context = O, o = K) : (typeof d.componentDidUpdate != "function" || x === t.memoizedProps && $ === t.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || x === t.memoizedProps && $ === t.memoizedState || (n.flags |= 1024), o = !1);
    }
    return d = o, ro(t, n), o = (n.flags & 128) !== 0, d || o ? (d = n.stateNode, i = o && typeof i.getDerivedStateFromError != "function" ? null : d.render(), n.flags |= 1, t !== null && o ? (n.child = Ba(
      n,
      t.child,
      null,
      u
    ), n.child = Ba(
      n,
      null,
      i,
      u
    )) : ge(t, n, i, u), n.memoizedState = d.state, t = n.child) : t = zn(
      t,
      n,
      u
    ), t;
  }
  function n1(t, n, i, o) {
    return Ra(), n.flags |= 256, ge(t, n, i, o), n.child;
  }
  var oc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function rc(t) {
    return { baseLanes: t, cachePool: Xm() };
  }
  function uc(t, n, i) {
    return t = t !== null ? t.childLanes & ~i : 0, n && (t |= Ye), t;
  }
  function a1(t, n, i) {
    var o = n.pendingProps, u = !1, d = (n.flags & 128) !== 0, x;
    if ((x = d) || (x = t !== null && t.memoizedState === null ? !1 : (Jt.current & 2) !== 0), x && (u = !0, n.flags &= -129), x = (n.flags & 32) !== 0, n.flags &= -33, t === null) {
      if (Et) {
        if (u ? na(n) : aa(), (t = $t) ? (t = f0(
          t,
          tn
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Qn !== null ? { id: yn, overflow: gn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Bm(t), i.return = n, n.child = i, pe = n, $t = null)) : t = null, t === null) throw Jn(n);
        return Xc(t) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var C = o.children;
      return o = o.fallback, u ? (aa(), u = n.mode, C = uo(
        { mode: "hidden", children: C },
        u
      ), o = _a(
        o,
        u,
        i,
        null
      ), C.return = n, o.return = n, C.sibling = o, n.child = C, o = n.child, o.memoizedState = rc(i), o.childLanes = uc(
        t,
        x,
        i
      ), n.memoizedState = oc, Dl(null, o)) : (na(n), cc(n, C));
    }
    var O = t.memoizedState;
    if (O !== null && (C = O.dehydrated, C !== null)) {
      if (d)
        n.flags & 256 ? (na(n), n.flags &= -257, n = fc(
          t,
          n,
          i
        )) : n.memoizedState !== null ? (aa(), n.child = t.child, n.flags |= 128, n = null) : (aa(), C = o.fallback, u = n.mode, o = uo(
          { mode: "visible", children: o.children },
          u
        ), C = _a(
          C,
          u,
          i,
          null
        ), C.flags |= 2, o.return = n, C.return = n, o.sibling = C, n.child = o, Ba(
          n,
          t.child,
          null,
          i
        ), o = n.child, o.memoizedState = rc(i), o.childLanes = uc(
          t,
          x,
          i
        ), n.memoizedState = oc, n = Dl(null, o));
      else if (na(n), Xc(C)) {
        if (x = C.nextSibling && C.nextSibling.dataset, x) var H = x.dgst;
        x = H, o = Error(s(419)), o.stack = "", o.digest = x, bl({ value: o, source: null, stack: null }), n = fc(
          t,
          n,
          i
        );
      } else if (ie || pi(t, n, i, !1), x = (i & t.childLanes) !== 0, ie || x) {
        if (x = kt, x !== null && (o = Gh(x, i), o !== 0 && o !== O.retryLane))
          throw O.retryLane = o, ja(t, o), Le(x, t, o), lc;
        Yc(C) || bo(), n = fc(
          t,
          n,
          i
        );
      } else
        Yc(C) ? (n.flags |= 192, n.child = t.child, n = null) : (t = O.treeContext, $t = nn(
          C.nextSibling
        ), pe = n, Et = !0, Fn = null, tn = !1, t !== null && km(n, t), n = cc(
          n,
          o.children
        ), n.flags |= 4096);
      return n;
    }
    return u ? (aa(), C = o.fallback, u = n.mode, O = t.child, H = O.sibling, o = jn(O, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = O.subtreeFlags & 65011712, H !== null ? C = jn(
      H,
      C
    ) : (C = _a(
      C,
      u,
      i,
      null
    ), C.flags |= 2), C.return = n, o.return = n, o.sibling = C, n.child = o, Dl(null, o), o = n.child, C = t.child.memoizedState, C === null ? C = rc(i) : (u = C.cachePool, u !== null ? (O = ne._currentValue, u = u.parent !== O ? { parent: O, pool: O } : u) : u = Xm(), C = {
      baseLanes: C.baseLanes | i,
      cachePool: u
    }), o.memoizedState = C, o.childLanes = uc(
      t,
      x,
      i
    ), n.memoizedState = oc, Dl(t.child, o)) : (na(n), i = t.child, t = i.sibling, i = jn(i, {
      mode: "visible",
      children: o.children
    }), i.return = n, i.sibling = null, t !== null && (x = n.deletions, x === null ? (n.deletions = [t], n.flags |= 16) : x.push(t)), n.child = i, n.memoizedState = null, i);
  }
  function cc(t, n) {
    return n = uo(
      { mode: "visible", children: n },
      t.mode
    ), n.return = t, t.child = n;
  }
  function uo(t, n) {
    return t = He(22, t, null, n), t.lanes = 0, t;
  }
  function fc(t, n, i) {
    return Ba(n, t.child, null, i), t = cc(
      n,
      n.pendingProps.children
    ), t.flags |= 2, n.memoizedState = null, t;
  }
  function i1(t, n, i) {
    t.lanes |= n;
    var o = t.alternate;
    o !== null && (o.lanes |= n), Au(t.return, n, i);
  }
  function dc(t, n, i, o, u, d) {
    var x = t.memoizedState;
    x === null ? t.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: o,
      tail: i,
      tailMode: u,
      treeForkCount: d
    } : (x.isBackwards = n, x.rendering = null, x.renderingStartTime = 0, x.last = o, x.tail = i, x.tailMode = u, x.treeForkCount = d);
  }
  function l1(t, n, i) {
    var o = n.pendingProps, u = o.revealOrder, d = o.tail;
    o = o.children;
    var x = Jt.current, C = (x & 2) !== 0;
    if (C ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, I(Jt, x), ge(t, n, o, i), o = Et ? vl : 0, !C && t !== null && (t.flags & 128) !== 0)
      t: for (t = n.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && i1(t, i, n);
        else if (t.tag === 19)
          i1(t, i, n);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === n) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === n)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (u) {
      case "forwards":
        for (i = n.child, u = null; i !== null; )
          t = i.alternate, t !== null && Js(t) === null && (u = i), i = i.sibling;
        i = u, i === null ? (u = n.child, n.child = null) : (u = i.sibling, i.sibling = null), dc(
          n,
          !1,
          u,
          i,
          d,
          o
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (i = null, u = n.child, n.child = null; u !== null; ) {
          if (t = u.alternate, t !== null && Js(t) === null) {
            n.child = u;
            break;
          }
          t = u.sibling, u.sibling = i, i = u, u = t;
        }
        dc(
          n,
          !0,
          i,
          null,
          d,
          o
        );
        break;
      case "together":
        dc(
          n,
          !1,
          null,
          null,
          void 0,
          o
        );
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function zn(t, n, i) {
    if (t !== null && (n.dependencies = t.dependencies), sa |= n.lanes, (i & n.childLanes) === 0)
      if (t !== null) {
        if (pi(
          t,
          n,
          i,
          !1
        ), (i & n.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && n.child !== t.child)
      throw Error(s(153));
    if (n.child !== null) {
      for (t = n.child, i = jn(t, t.pendingProps), n.child = i, i.return = n; t.sibling !== null; )
        t = t.sibling, i = i.sibling = jn(t, t.pendingProps), i.return = n;
      i.sibling = null;
    }
    return n.child;
  }
  function hc(t, n) {
    return (t.lanes & n) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Gs(t)));
  }
  function _x(t, n, i) {
    switch (n.tag) {
      case 3:
        Nt(n, n.stateNode.containerInfo), Wn(n, ne, t.memoizedState.cache), Ra();
        break;
      case 27:
      case 5:
        Pt(n);
        break;
      case 4:
        Nt(n, n.stateNode.containerInfo);
        break;
      case 10:
        Wn(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, Uu(n), null;
        break;
      case 13:
        var o = n.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (na(n), n.flags |= 128, null) : (i & n.child.childLanes) !== 0 ? a1(t, n, i) : (na(n), t = zn(
            t,
            n,
            i
          ), t !== null ? t.sibling : null);
        na(n);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (o = (i & n.childLanes) !== 0, o || (pi(
          t,
          n,
          i,
          !1
        ), o = (i & n.childLanes) !== 0), u) {
          if (o)
            return l1(
              t,
              n,
              i
            );
          n.flags |= 128;
        }
        if (u = n.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), I(Jt, Jt.current), o) break;
        return null;
      case 22:
        return n.lanes = 0, Jp(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        Wn(n, ne, t.memoizedState.cache);
    }
    return zn(t, n, i);
  }
  function s1(t, n, i) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps)
        ie = !0;
      else {
        if (!hc(t, i) && (n.flags & 128) === 0)
          return ie = !1, _x(
            t,
            n,
            i
          );
        ie = (t.flags & 131072) !== 0;
      }
    else
      ie = !1, Et && (n.flags & 1048576) !== 0 && Um(n, vl, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        t: {
          var o = n.pendingProps;
          if (t = za(n.elementType), n.type = t, typeof t == "function")
            vu(t) ? (o = Ua(t, o), n.tag = 1, n = e1(
              null,
              n,
              t,
              o,
              i
            )) : (n.tag = 0, n = sc(
              null,
              n,
              t,
              o,
              i
            ));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === D) {
                n.tag = 11, n = Zp(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break t;
              } else if (u === R) {
                n.tag = 14, n = Qp(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break t;
              }
            }
            throw n = nt(t) || t, Error(s(306, n, ""));
          }
        }
        return n;
      case 0:
        return sc(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 1:
        return o = n.type, u = Ua(
          o,
          n.pendingProps
        ), e1(
          t,
          n,
          o,
          u,
          i
        );
      case 3:
        t: {
          if (Nt(
            n,
            n.stateNode.containerInfo
          ), t === null) throw Error(s(387));
          o = n.pendingProps;
          var d = n.memoizedState;
          u = d.element, Ou(t, n), Al(n, o, null, i);
          var x = n.memoizedState;
          if (o = x.cache, Wn(n, ne, o), o !== d.cache && Mu(
            n,
            [ne],
            i,
            !0
          ), El(), o = x.element, d.isDehydrated)
            if (d = {
              element: o,
              isDehydrated: !1,
              cache: x.cache
            }, n.updateQueue.baseState = d, n.memoizedState = d, n.flags & 256) {
              n = n1(
                t,
                n,
                o,
                i
              );
              break t;
            } else if (o !== u) {
              u = Je(
                Error(s(424)),
                n
              ), bl(u), n = n1(
                t,
                n,
                o,
                i
              );
              break t;
            } else {
              switch (t = n.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for ($t = nn(t.firstChild), pe = n, Et = !0, Fn = null, tn = !0, i = Jm(
                n,
                null,
                o,
                i
              ), n.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (Ra(), o === u) {
              n = zn(
                t,
                n,
                i
              );
              break t;
            }
            ge(t, n, o, i);
          }
          n = n.child;
        }
        return n;
      case 26:
        return ro(t, n), t === null ? (i = g0(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = i : Et || (i = n.type, t = n.pendingProps, o = Ao(
          ht.current
        ).createElement(i), o[me] = n, o[_e] = t, ve(o, i, t), fe(o), n.stateNode = o) : n.memoizedState = g0(
          n.type,
          t.memoizedProps,
          n.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Pt(n), t === null && Et && (o = n.stateNode = m0(
          n.type,
          n.pendingProps,
          ht.current
        ), pe = n, tn = !0, u = $t, fa(n.type) ? (Pc = u, $t = nn(o.firstChild)) : $t = u), ge(
          t,
          n,
          n.pendingProps.children,
          i
        ), ro(t, n), t === null && (n.flags |= 4194304), n.child;
      case 5:
        return t === null && Et && ((u = o = $t) && (o = lS(
          o,
          n.type,
          n.pendingProps,
          tn
        ), o !== null ? (n.stateNode = o, pe = n, $t = nn(o.firstChild), tn = !1, u = !0) : u = !1), u || Jn(n)), Pt(n), u = n.type, d = n.pendingProps, x = t !== null ? t.memoizedProps : null, o = d.children, qc(u, d) ? o = null : x !== null && qc(u, x) && (n.flags |= 32), n.memoizedState !== null && (u = Hu(
          t,
          n,
          xx,
          null,
          null,
          i
        ), Pl._currentValue = u), ro(t, n), ge(t, n, o, i), n.child;
      case 6:
        return t === null && Et && ((t = i = $t) && (i = sS(
          i,
          n.pendingProps,
          tn
        ), i !== null ? (n.stateNode = i, pe = n, $t = null, t = !0) : t = !1), t || Jn(n)), null;
      case 13:
        return a1(t, n, i);
      case 4:
        return Nt(
          n,
          n.stateNode.containerInfo
        ), o = n.pendingProps, t === null ? n.child = Ba(
          n,
          null,
          o,
          i
        ) : ge(t, n, o, i), n.child;
      case 11:
        return Zp(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 7:
        return ge(
          t,
          n,
          n.pendingProps,
          i
        ), n.child;
      case 8:
        return ge(
          t,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 12:
        return ge(
          t,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 10:
        return o = n.pendingProps, Wn(n, n.type, o.value), ge(t, n, o.children, i), n.child;
      case 9:
        return u = n.type._context, o = n.pendingProps.children, Na(n), u = ye(u), o = o(u), n.flags |= 1, ge(t, n, o, i), n.child;
      case 14:
        return Qp(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 15:
        return Fp(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 19:
        return l1(t, n, i);
      case 31:
        return jx(t, n, i);
      case 22:
        return Jp(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        return Na(n), o = ye(ne), t === null ? (u = Ru(), u === null && (u = kt, d = ju(), u.pooledCache = d, d.refCount++, d !== null && (u.pooledCacheLanes |= i), u = d), n.memoizedState = { parent: o, cache: u }, Nu(n), Wn(n, ne, u)) : ((t.lanes & i) !== 0 && (Ou(t, n), Al(n, null, null, i), El()), u = t.memoizedState, d = n.memoizedState, u.parent !== o ? (u = { parent: o, cache: o }, n.memoizedState = u, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = u), Wn(n, ne, o)) : (o = d.cache, Wn(n, ne, o), o !== u.cache && Mu(
          n,
          [ne],
          i,
          !0
        ))), ge(
          t,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(s(156, n.tag));
  }
  function Ln(t) {
    t.flags |= 4;
  }
  function mc(t, n, i, o, u) {
    if ((n = (t.mode & 32) !== 0) && (n = !1), n) {
      if (t.flags |= 16777216, (u & 335544128) === u)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (O1()) t.flags |= 8192;
        else
          throw La = Ks, Du;
    } else t.flags &= -16777217;
  }
  function o1(t, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !w0(n))
      if (O1()) t.flags |= 8192;
      else
        throw La = Ks, Du;
  }
  function co(t, n) {
    n !== null && (t.flags |= 4), t.flags & 16384 && (n = t.tag !== 22 ? Hh() : 536870912, t.lanes |= n, Mi |= n);
  }
  function Nl(t, n) {
    if (!Et)
      switch (t.tailMode) {
        case "hidden":
          n = t.tail;
          for (var i = null; n !== null; )
            n.alternate !== null && (i = n), n = n.sibling;
          i === null ? t.tail = null : i.sibling = null;
          break;
        case "collapsed":
          i = t.tail;
          for (var o = null; i !== null; )
            i.alternate !== null && (o = i), i = i.sibling;
          o === null ? n || t.tail === null ? t.tail = null : t.tail.sibling = null : o.sibling = null;
      }
  }
  function Gt(t) {
    var n = t.alternate !== null && t.alternate.child === t.child, i = 0, o = 0;
    if (n)
      for (var u = t.child; u !== null; )
        i |= u.lanes | u.childLanes, o |= u.subtreeFlags & 65011712, o |= u.flags & 65011712, u.return = t, u = u.sibling;
    else
      for (u = t.child; u !== null; )
        i |= u.lanes | u.childLanes, o |= u.subtreeFlags, o |= u.flags, u.return = t, u = u.sibling;
    return t.subtreeFlags |= o, t.childLanes = i, n;
  }
  function Rx(t, n, i) {
    var o = n.pendingProps;
    switch (wu(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Gt(n), null;
      case 1:
        return Gt(n), null;
      case 3:
        return i = n.stateNode, o = null, t !== null && (o = t.memoizedState.cache), n.memoizedState.cache !== o && (n.flags |= 2048), Dn(ne), jt(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (t === null || t.child === null) && (mi(n) ? Ln(n) : t === null || t.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Cu())), Gt(n), null;
      case 26:
        var u = n.type, d = n.memoizedState;
        return t === null ? (Ln(n), d !== null ? (Gt(n), o1(n, d)) : (Gt(n), mc(
          n,
          u,
          null,
          o,
          i
        ))) : d ? d !== t.memoizedState ? (Ln(n), Gt(n), o1(n, d)) : (Gt(n), n.flags &= -16777217) : (t = t.memoizedProps, t !== o && Ln(n), Gt(n), mc(
          n,
          u,
          t,
          o,
          i
        )), null;
      case 27:
        if (Kt(n), i = ht.current, u = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && Ln(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(s(166));
            return Gt(n), null;
          }
          t = it.current, mi(n) ? Hm(n) : (t = m0(u, o, i), n.stateNode = t, Ln(n));
        }
        return Gt(n), null;
      case 5:
        if (Kt(n), u = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && Ln(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(s(166));
            return Gt(n), null;
          }
          if (d = it.current, mi(n))
            Hm(n);
          else {
            var x = Ao(
              ht.current
            );
            switch (d) {
              case 1:
                d = x.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                d = x.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    d = x.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    d = x.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    d = x.createElement("div"), d.innerHTML = "<script><\/script>", d = d.removeChild(
                      d.firstChild
                    );
                    break;
                  case "select":
                    d = typeof o.is == "string" ? x.createElement("select", {
                      is: o.is
                    }) : x.createElement("select"), o.multiple ? d.multiple = !0 : o.size && (d.size = o.size);
                    break;
                  default:
                    d = typeof o.is == "string" ? x.createElement(u, { is: o.is }) : x.createElement(u);
                }
            }
            d[me] = n, d[_e] = o;
            t: for (x = n.child; x !== null; ) {
              if (x.tag === 5 || x.tag === 6)
                d.appendChild(x.stateNode);
              else if (x.tag !== 4 && x.tag !== 27 && x.child !== null) {
                x.child.return = x, x = x.child;
                continue;
              }
              if (x === n) break t;
              for (; x.sibling === null; ) {
                if (x.return === null || x.return === n)
                  break t;
                x = x.return;
              }
              x.sibling.return = x.return, x = x.sibling;
            }
            n.stateNode = d;
            t: switch (ve(d, u, o), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                o = !!o.autoFocus;
                break t;
              case "img":
                o = !0;
                break t;
              default:
                o = !1;
            }
            o && Ln(n);
          }
        }
        return Gt(n), mc(
          n,
          n.type,
          t === null ? null : t.memoizedProps,
          n.pendingProps,
          i
        ), null;
      case 6:
        if (t && n.stateNode != null)
          t.memoizedProps !== o && Ln(n);
        else {
          if (typeof o != "string" && n.stateNode === null)
            throw Error(s(166));
          if (t = ht.current, mi(n)) {
            if (t = n.stateNode, i = n.memoizedProps, o = null, u = pe, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  o = u.memoizedProps;
              }
            t[me] = n, t = !!(t.nodeValue === i || o !== null && o.suppressHydrationWarning === !0 || a0(t.nodeValue, i)), t || Jn(n, !0);
          } else
            t = Ao(t).createTextNode(
              o
            ), t[me] = n, n.stateNode = t;
        }
        return Gt(n), null;
      case 31:
        if (i = n.memoizedState, t === null || t.memoizedState !== null) {
          if (o = mi(n), i !== null) {
            if (t === null) {
              if (!o) throw Error(s(318));
              if (t = n.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[me] = n;
            } else
              Ra(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Gt(n), t = !1;
          } else
            i = Cu(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = i), t = !0;
          if (!t)
            return n.flags & 256 ? ($e(n), n) : ($e(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(s(558));
        }
        return Gt(n), null;
      case 13:
        if (o = n.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (u = mi(n), o !== null && o.dehydrated !== null) {
            if (t === null) {
              if (!u) throw Error(s(318));
              if (u = n.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[me] = n;
            } else
              Ra(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Gt(n), u = !1;
          } else
            u = Cu(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return n.flags & 256 ? ($e(n), n) : ($e(n), null);
        }
        return $e(n), (n.flags & 128) !== 0 ? (n.lanes = i, n) : (i = o !== null, t = t !== null && t.memoizedState !== null, i && (o = n.child, u = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (u = o.alternate.memoizedState.cachePool.pool), d = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (d = o.memoizedState.cachePool.pool), d !== u && (o.flags |= 2048)), i !== t && i && (n.child.flags |= 8192), co(n, n.updateQueue), Gt(n), null);
      case 4:
        return jt(), t === null && Bc(n.stateNode.containerInfo), Gt(n), null;
      case 10:
        return Dn(n.type), Gt(n), null;
      case 19:
        if (G(Jt), o = n.memoizedState, o === null) return Gt(n), null;
        if (u = (n.flags & 128) !== 0, d = o.rendering, d === null)
          if (u) Nl(o, !1);
          else {
            if (Qt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = n.child; t !== null; ) {
                if (d = Js(t), d !== null) {
                  for (n.flags |= 128, Nl(o, !1), t = d.updateQueue, n.updateQueue = t, co(n, t), n.subtreeFlags = 0, t = i, i = n.child; i !== null; )
                    Lm(i, t), i = i.sibling;
                  return I(
                    Jt,
                    Jt.current & 1 | 2
                  ), Et && _n(n, o.treeForkCount), n.child;
                }
                t = t.sibling;
              }
            o.tail !== null && Be() > yo && (n.flags |= 128, u = !0, Nl(o, !1), n.lanes = 4194304);
          }
        else {
          if (!u)
            if (t = Js(d), t !== null) {
              if (n.flags |= 128, u = !0, t = t.updateQueue, n.updateQueue = t, co(n, t), Nl(o, !0), o.tail === null && o.tailMode === "hidden" && !d.alternate && !Et)
                return Gt(n), null;
            } else
              2 * Be() - o.renderingStartTime > yo && i !== 536870912 && (n.flags |= 128, u = !0, Nl(o, !1), n.lanes = 4194304);
          o.isBackwards ? (d.sibling = n.child, n.child = d) : (t = o.last, t !== null ? t.sibling = d : n.child = d, o.last = d);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Be(), t.sibling = null, i = Jt.current, I(
          Jt,
          u ? i & 1 | 2 : i & 1
        ), Et && _n(n, o.treeForkCount), t) : (Gt(n), null);
      case 22:
      case 23:
        return $e(n), Vu(), o = n.memoizedState !== null, t !== null ? t.memoizedState !== null !== o && (n.flags |= 8192) : o && (n.flags |= 8192), o ? (i & 536870912) !== 0 && (n.flags & 128) === 0 && (Gt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Gt(n), i = n.updateQueue, i !== null && co(n, i.retryQueue), i = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), o = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== i && (n.flags |= 2048), t !== null && G(Oa), null;
      case 24:
        return i = null, t !== null && (i = t.memoizedState.cache), n.memoizedState.cache !== i && (n.flags |= 2048), Dn(ne), Gt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, n.tag));
  }
  function Dx(t, n) {
    switch (wu(n), n.tag) {
      case 1:
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 3:
        return Dn(ne), jt(), t = n.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (n.flags = t & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Kt(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if ($e(n), n.alternate === null)
            throw Error(s(340));
          Ra();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 13:
        if ($e(n), t = n.memoizedState, t !== null && t.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(s(340));
          Ra();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 19:
        return G(Jt), null;
      case 4:
        return jt(), null;
      case 10:
        return Dn(n.type), null;
      case 22:
      case 23:
        return $e(n), Vu(), t !== null && G(Oa), t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 24:
        return Dn(ne), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function r1(t, n) {
    switch (wu(n), n.tag) {
      case 3:
        Dn(ne), jt();
        break;
      case 26:
      case 27:
      case 5:
        Kt(n);
        break;
      case 4:
        jt();
        break;
      case 31:
        n.memoizedState !== null && $e(n);
        break;
      case 13:
        $e(n);
        break;
      case 19:
        G(Jt);
        break;
      case 10:
        Dn(n.type);
        break;
      case 22:
      case 23:
        $e(n), Vu(), t !== null && G(Oa);
        break;
      case 24:
        Dn(ne);
    }
  }
  function Ol(t, n) {
    try {
      var i = n.updateQueue, o = i !== null ? i.lastEffect : null;
      if (o !== null) {
        var u = o.next;
        i = u;
        do {
          if ((i.tag & t) === t) {
            o = void 0;
            var d = i.create, x = i.inst;
            o = d(), x.destroy = o;
          }
          i = i.next;
        } while (i !== u);
      }
    } catch (C) {
      zt(n, n.return, C);
    }
  }
  function ia(t, n, i) {
    try {
      var o = n.updateQueue, u = o !== null ? o.lastEffect : null;
      if (u !== null) {
        var d = u.next;
        o = d;
        do {
          if ((o.tag & t) === t) {
            var x = o.inst, C = x.destroy;
            if (C !== void 0) {
              x.destroy = void 0, u = n;
              var O = i, H = C;
              try {
                H();
              } catch (K) {
                zt(
                  u,
                  O,
                  K
                );
              }
            }
          }
          o = o.next;
        } while (o !== d);
      }
    } catch (K) {
      zt(n, n.return, K);
    }
  }
  function u1(t) {
    var n = t.updateQueue;
    if (n !== null) {
      var i = t.stateNode;
      try {
        Im(n, i);
      } catch (o) {
        zt(t, t.return, o);
      }
    }
  }
  function c1(t, n, i) {
    i.props = Ua(
      t.type,
      t.memoizedProps
    ), i.state = t.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (o) {
      zt(t, n, o);
    }
  }
  function zl(t, n) {
    try {
      var i = t.ref;
      if (i !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var o = t.stateNode;
            break;
          case 30:
            o = t.stateNode;
            break;
          default:
            o = t.stateNode;
        }
        typeof i == "function" ? t.refCleanup = i(o) : i.current = o;
      }
    } catch (u) {
      zt(t, n, u);
    }
  }
  function vn(t, n) {
    var i = t.ref, o = t.refCleanup;
    if (i !== null)
      if (typeof o == "function")
        try {
          o();
        } catch (u) {
          zt(t, n, u);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (u) {
          zt(t, n, u);
        }
      else i.current = null;
  }
  function f1(t) {
    var n = t.type, i = t.memoizedProps, o = t.stateNode;
    try {
      t: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          i.autoFocus && o.focus();
          break t;
        case "img":
          i.src ? o.src = i.src : i.srcSet && (o.srcset = i.srcSet);
      }
    } catch (u) {
      zt(t, t.return, u);
    }
  }
  function pc(t, n, i) {
    try {
      var o = t.stateNode;
      Ix(o, t.type, i, n), o[_e] = n;
    } catch (u) {
      zt(t, t.return, u);
    }
  }
  function d1(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && fa(t.type) || t.tag === 4;
  }
  function yc(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || d1(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && fa(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function gc(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(t, n) : (n = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, n.appendChild(t), i = i._reactRootContainer, i != null || n.onclick !== null || (n.onclick = An));
    else if (o !== 4 && (o === 27 && fa(t.type) && (i = t.stateNode, n = null), t = t.child, t !== null))
      for (gc(t, n, i), t = t.sibling; t !== null; )
        gc(t, n, i), t = t.sibling;
  }
  function fo(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? i.insertBefore(t, n) : i.appendChild(t);
    else if (o !== 4 && (o === 27 && fa(t.type) && (i = t.stateNode), t = t.child, t !== null))
      for (fo(t, n, i), t = t.sibling; t !== null; )
        fo(t, n, i), t = t.sibling;
  }
  function h1(t) {
    var n = t.stateNode, i = t.memoizedProps;
    try {
      for (var o = t.type, u = n.attributes; u.length; )
        n.removeAttributeNode(u[0]);
      ve(n, o, i), n[me] = t, n[_e] = i;
    } catch (d) {
      zt(t, t.return, d);
    }
  }
  var Bn = !1, le = !1, vc = !1, m1 = typeof WeakSet == "function" ? WeakSet : Set, de = null;
  function Nx(t, n) {
    if (t = t.containerInfo, kc = Oo, t = Am(t), fu(t)) {
      if ("selectionStart" in t)
        var i = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          i = (i = t.ownerDocument) && i.defaultView || window;
          var o = i.getSelection && i.getSelection();
          if (o && o.rangeCount !== 0) {
            i = o.anchorNode;
            var u = o.anchorOffset, d = o.focusNode;
            o = o.focusOffset;
            try {
              i.nodeType, d.nodeType;
            } catch {
              i = null;
              break t;
            }
            var x = 0, C = -1, O = -1, H = 0, K = 0, J = t, $ = null;
            e: for (; ; ) {
              for (var Y; J !== i || u !== 0 && J.nodeType !== 3 || (C = x + u), J !== d || o !== 0 && J.nodeType !== 3 || (O = x + o), J.nodeType === 3 && (x += J.nodeValue.length), (Y = J.firstChild) !== null; )
                $ = J, J = Y;
              for (; ; ) {
                if (J === t) break e;
                if ($ === i && ++H === u && (C = x), $ === d && ++K === o && (O = x), (Y = J.nextSibling) !== null) break;
                J = $, $ = J.parentNode;
              }
              J = Y;
            }
            i = C === -1 || O === -1 ? null : { start: C, end: O };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Hc = { focusedElem: t, selectionRange: i }, Oo = !1, de = n; de !== null; )
      if (n = de, t = n.child, (n.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = n, de = t;
      else
        for (; de !== null; ) {
          switch (n = de, d = n.alternate, t = n.flags, n.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = n.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (i = 0; i < t.length; i++)
                  u = t[i], u.ref.impl = u.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && d !== null) {
                t = void 0, i = n, u = d.memoizedProps, d = d.memoizedState, o = i.stateNode;
                try {
                  var ot = Ua(
                    i.type,
                    u
                  );
                  t = o.getSnapshotBeforeUpdate(
                    ot,
                    d
                  ), o.__reactInternalSnapshotBeforeUpdate = t;
                } catch (mt) {
                  zt(
                    i,
                    i.return,
                    mt
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = n.stateNode.containerInfo, i = t.nodeType, i === 9)
                  Gc(t);
                else if (i === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Gc(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(s(163));
          }
          if (t = n.sibling, t !== null) {
            t.return = n.return, de = t;
            break;
          }
          de = n.return;
        }
  }
  function p1(t, n, i) {
    var o = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        Un(t, i), o & 4 && Ol(5, i);
        break;
      case 1:
        if (Un(t, i), o & 4)
          if (t = i.stateNode, n === null)
            try {
              t.componentDidMount();
            } catch (x) {
              zt(i, i.return, x);
            }
          else {
            var u = Ua(
              i.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              t.componentDidUpdate(
                u,
                n,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (x) {
              zt(
                i,
                i.return,
                x
              );
            }
          }
        o & 64 && u1(i), o & 512 && zl(i, i.return);
        break;
      case 3:
        if (Un(t, i), o & 64 && (t = i.updateQueue, t !== null)) {
          if (n = null, i.child !== null)
            switch (i.child.tag) {
              case 27:
              case 5:
                n = i.child.stateNode;
                break;
              case 1:
                n = i.child.stateNode;
            }
          try {
            Im(t, n);
          } catch (x) {
            zt(i, i.return, x);
          }
        }
        break;
      case 27:
        n === null && o & 4 && h1(i);
      case 26:
      case 5:
        Un(t, i), n === null && o & 4 && f1(i), o & 512 && zl(i, i.return);
        break;
      case 12:
        Un(t, i);
        break;
      case 31:
        Un(t, i), o & 4 && v1(t, i);
        break;
      case 13:
        Un(t, i), o & 4 && b1(t, i), o & 64 && (t = i.memoizedState, t !== null && (t = t.dehydrated, t !== null && (i = qx.bind(
          null,
          i
        ), oS(t, i))));
        break;
      case 22:
        if (o = i.memoizedState !== null || Bn, !o) {
          n = n !== null && n.memoizedState !== null || le, u = Bn;
          var d = le;
          Bn = o, (le = n) && !d ? kn(
            t,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : Un(t, i), Bn = u, le = d;
        }
        break;
      case 30:
        break;
      default:
        Un(t, i);
    }
  }
  function y1(t) {
    var n = t.alternate;
    n !== null && (t.alternate = null, y1(n)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (n = t.stateNode, n !== null && Zr(n)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Yt = null, De = !1;
  function Vn(t, n, i) {
    for (i = i.child; i !== null; )
      g1(t, n, i), i = i.sibling;
  }
  function g1(t, n, i) {
    if (Ve && typeof Ve.onCommitFiberUnmount == "function")
      try {
        Ve.onCommitFiberUnmount(il, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        le || vn(i, n), Vn(
          t,
          n,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        le || vn(i, n);
        var o = Yt, u = De;
        fa(i.type) && (Yt = i.stateNode, De = !1), Vn(
          t,
          n,
          i
        ), Gl(i.stateNode), Yt = o, De = u;
        break;
      case 5:
        le || vn(i, n);
      case 6:
        if (o = Yt, u = De, Yt = null, Vn(
          t,
          n,
          i
        ), Yt = o, De = u, Yt !== null)
          if (De)
            try {
              (Yt.nodeType === 9 ? Yt.body : Yt.nodeName === "HTML" ? Yt.ownerDocument.body : Yt).removeChild(i.stateNode);
            } catch (d) {
              zt(
                i,
                n,
                d
              );
            }
          else
            try {
              Yt.removeChild(i.stateNode);
            } catch (d) {
              zt(
                i,
                n,
                d
              );
            }
        break;
      case 18:
        Yt !== null && (De ? (t = Yt, u0(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          i.stateNode
        ), Li(t)) : u0(Yt, i.stateNode));
        break;
      case 4:
        o = Yt, u = De, Yt = i.stateNode.containerInfo, De = !0, Vn(
          t,
          n,
          i
        ), Yt = o, De = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ia(2, i, n), le || ia(4, i, n), Vn(
          t,
          n,
          i
        );
        break;
      case 1:
        le || (vn(i, n), o = i.stateNode, typeof o.componentWillUnmount == "function" && c1(
          i,
          n,
          o
        )), Vn(
          t,
          n,
          i
        );
        break;
      case 21:
        Vn(
          t,
          n,
          i
        );
        break;
      case 22:
        le = (o = le) || i.memoizedState !== null, Vn(
          t,
          n,
          i
        ), le = o;
        break;
      default:
        Vn(
          t,
          n,
          i
        );
    }
  }
  function v1(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Li(t);
      } catch (i) {
        zt(n, n.return, i);
      }
    }
  }
  function b1(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Li(t);
      } catch (i) {
        zt(n, n.return, i);
      }
  }
  function Ox(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var n = t.stateNode;
        return n === null && (n = t.stateNode = new m1()), n;
      case 22:
        return t = t.stateNode, n = t._retryCache, n === null && (n = t._retryCache = new m1()), n;
      default:
        throw Error(s(435, t.tag));
    }
  }
  function ho(t, n) {
    var i = Ox(t);
    n.forEach(function(o) {
      if (!i.has(o)) {
        i.add(o);
        var u = $x.bind(null, t, o);
        o.then(u, u);
      }
    });
  }
  function Ne(t, n) {
    var i = n.deletions;
    if (i !== null)
      for (var o = 0; o < i.length; o++) {
        var u = i[o], d = t, x = n, C = x;
        t: for (; C !== null; ) {
          switch (C.tag) {
            case 27:
              if (fa(C.type)) {
                Yt = C.stateNode, De = !1;
                break t;
              }
              break;
            case 5:
              Yt = C.stateNode, De = !1;
              break t;
            case 3:
            case 4:
              Yt = C.stateNode.containerInfo, De = !0;
              break t;
          }
          C = C.return;
        }
        if (Yt === null) throw Error(s(160));
        g1(d, x, u), Yt = null, De = !1, d = u.alternate, d !== null && (d.return = null), u.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        x1(n, t), n = n.sibling;
  }
  var rn = null;
  function x1(t, n) {
    var i = t.alternate, o = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Ne(n, t), Oe(t), o & 4 && (ia(3, t, t.return), Ol(3, t), ia(5, t, t.return));
        break;
      case 1:
        Ne(n, t), Oe(t), o & 512 && (le || i === null || vn(i, i.return)), o & 64 && Bn && (t = t.updateQueue, t !== null && (o = t.callbacks, o !== null && (i = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = i === null ? o : i.concat(o))));
        break;
      case 26:
        var u = rn;
        if (Ne(n, t), Oe(t), o & 512 && (le || i === null || vn(i, i.return)), o & 4) {
          var d = i !== null ? i.memoizedState : null;
          if (o = t.memoizedState, i === null)
            if (o === null)
              if (t.stateNode === null) {
                t: {
                  o = t.type, i = t.memoizedProps, u = u.ownerDocument || u;
                  e: switch (o) {
                    case "title":
                      d = u.getElementsByTagName("title")[0], (!d || d[ol] || d[me] || d.namespaceURI === "http://www.w3.org/2000/svg" || d.hasAttribute("itemprop")) && (d = u.createElement(o), u.head.insertBefore(
                        d,
                        u.querySelector("head > title")
                      )), ve(d, o, i), d[me] = t, fe(d), o = d;
                      break t;
                    case "link":
                      var x = x0(
                        "link",
                        "href",
                        u
                      ).get(o + (i.href || ""));
                      if (x) {
                        for (var C = 0; C < x.length; C++)
                          if (d = x[C], d.getAttribute("href") === (i.href == null || i.href === "" ? null : i.href) && d.getAttribute("rel") === (i.rel == null ? null : i.rel) && d.getAttribute("title") === (i.title == null ? null : i.title) && d.getAttribute("crossorigin") === (i.crossOrigin == null ? null : i.crossOrigin)) {
                            x.splice(C, 1);
                            break e;
                          }
                      }
                      d = u.createElement(o), ve(d, o, i), u.head.appendChild(d);
                      break;
                    case "meta":
                      if (x = x0(
                        "meta",
                        "content",
                        u
                      ).get(o + (i.content || ""))) {
                        for (C = 0; C < x.length; C++)
                          if (d = x[C], d.getAttribute("content") === (i.content == null ? null : "" + i.content) && d.getAttribute("name") === (i.name == null ? null : i.name) && d.getAttribute("property") === (i.property == null ? null : i.property) && d.getAttribute("http-equiv") === (i.httpEquiv == null ? null : i.httpEquiv) && d.getAttribute("charset") === (i.charSet == null ? null : i.charSet)) {
                            x.splice(C, 1);
                            break e;
                          }
                      }
                      d = u.createElement(o), ve(d, o, i), u.head.appendChild(d);
                      break;
                    default:
                      throw Error(s(468, o));
                  }
                  d[me] = t, fe(d), o = d;
                }
                t.stateNode = o;
              } else
                S0(
                  u,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = b0(
                u,
                o,
                t.memoizedProps
              );
          else
            d !== o ? (d === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : d.count--, o === null ? S0(
              u,
              t.type,
              t.stateNode
            ) : b0(
              u,
              o,
              t.memoizedProps
            )) : o === null && t.stateNode !== null && pc(
              t,
              t.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        Ne(n, t), Oe(t), o & 512 && (le || i === null || vn(i, i.return)), i !== null && o & 4 && pc(
          t,
          t.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (Ne(n, t), Oe(t), o & 512 && (le || i === null || vn(i, i.return)), t.flags & 32) {
          u = t.stateNode;
          try {
            ii(u, "");
          } catch (ot) {
            zt(t, t.return, ot);
          }
        }
        o & 4 && t.stateNode != null && (u = t.memoizedProps, pc(
          t,
          u,
          i !== null ? i.memoizedProps : u
        )), o & 1024 && (vc = !0);
        break;
      case 6:
        if (Ne(n, t), Oe(t), o & 4) {
          if (t.stateNode === null)
            throw Error(s(162));
          o = t.memoizedProps, i = t.stateNode;
          try {
            i.nodeValue = o;
          } catch (ot) {
            zt(t, t.return, ot);
          }
        }
        break;
      case 3:
        if (_o = null, u = rn, rn = Mo(n.containerInfo), Ne(n, t), rn = u, Oe(t), o & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            Li(n.containerInfo);
          } catch (ot) {
            zt(t, t.return, ot);
          }
        vc && (vc = !1, S1(t));
        break;
      case 4:
        o = rn, rn = Mo(
          t.stateNode.containerInfo
        ), Ne(n, t), Oe(t), rn = o;
        break;
      case 12:
        Ne(n, t), Oe(t);
        break;
      case 31:
        Ne(n, t), Oe(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, ho(t, o)));
        break;
      case 13:
        Ne(n, t), Oe(t), t.child.flags & 8192 && t.memoizedState !== null != (i !== null && i.memoizedState !== null) && (po = Be()), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, ho(t, o)));
        break;
      case 22:
        u = t.memoizedState !== null;
        var O = i !== null && i.memoizedState !== null, H = Bn, K = le;
        if (Bn = H || u, le = K || O, Ne(n, t), le = K, Bn = H, Oe(t), o & 8192)
          t: for (n = t.stateNode, n._visibility = u ? n._visibility & -2 : n._visibility | 1, u && (i === null || O || Bn || le || ka(t)), i = null, n = t; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (i === null) {
                O = i = n;
                try {
                  if (d = O.stateNode, u)
                    x = d.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
                  else {
                    C = O.stateNode;
                    var J = O.memoizedProps.style, $ = J != null && J.hasOwnProperty("display") ? J.display : null;
                    C.style.display = $ == null || typeof $ == "boolean" ? "" : ("" + $).trim();
                  }
                } catch (ot) {
                  zt(O, O.return, ot);
                }
              }
            } else if (n.tag === 6) {
              if (i === null) {
                O = n;
                try {
                  O.stateNode.nodeValue = u ? "" : O.memoizedProps;
                } catch (ot) {
                  zt(O, O.return, ot);
                }
              }
            } else if (n.tag === 18) {
              if (i === null) {
                O = n;
                try {
                  var Y = O.stateNode;
                  u ? c0(Y, !0) : c0(O.stateNode, !1);
                } catch (ot) {
                  zt(O, O.return, ot);
                }
              }
            } else if ((n.tag !== 22 && n.tag !== 23 || n.memoizedState === null || n === t) && n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === t) break t;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === t) break t;
              i === n && (i = null), n = n.return;
            }
            i === n && (i = null), n.sibling.return = n.return, n = n.sibling;
          }
        o & 4 && (o = t.updateQueue, o !== null && (i = o.retryQueue, i !== null && (o.retryQueue = null, ho(t, i))));
        break;
      case 19:
        Ne(n, t), Oe(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, ho(t, o)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Ne(n, t), Oe(t);
    }
  }
  function Oe(t) {
    var n = t.flags;
    if (n & 2) {
      try {
        for (var i, o = t.return; o !== null; ) {
          if (d1(o)) {
            i = o;
            break;
          }
          o = o.return;
        }
        if (i == null) throw Error(s(160));
        switch (i.tag) {
          case 27:
            var u = i.stateNode, d = yc(t);
            fo(t, d, u);
            break;
          case 5:
            var x = i.stateNode;
            i.flags & 32 && (ii(x, ""), i.flags &= -33);
            var C = yc(t);
            fo(t, C, x);
            break;
          case 3:
          case 4:
            var O = i.stateNode.containerInfo, H = yc(t);
            gc(
              t,
              H,
              O
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (K) {
        zt(t, t.return, K);
      }
      t.flags &= -3;
    }
    n & 4096 && (t.flags &= -4097);
  }
  function S1(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var n = t;
        S1(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), t = t.sibling;
      }
  }
  function Un(t, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        p1(t, n.alternate, n), n = n.sibling;
  }
  function ka(t) {
    for (t = t.child; t !== null; ) {
      var n = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ia(4, n, n.return), ka(n);
          break;
        case 1:
          vn(n, n.return);
          var i = n.stateNode;
          typeof i.componentWillUnmount == "function" && c1(
            n,
            n.return,
            i
          ), ka(n);
          break;
        case 27:
          Gl(n.stateNode);
        case 26:
        case 5:
          vn(n, n.return), ka(n);
          break;
        case 22:
          n.memoizedState === null && ka(n);
          break;
        case 30:
          ka(n);
          break;
        default:
          ka(n);
      }
      t = t.sibling;
    }
  }
  function kn(t, n, i) {
    for (i = i && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var o = n.alternate, u = t, d = n, x = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          kn(
            u,
            d,
            i
          ), Ol(4, d);
          break;
        case 1:
          if (kn(
            u,
            d,
            i
          ), o = d, u = o.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (H) {
              zt(o, o.return, H);
            }
          if (o = d, u = o.updateQueue, u !== null) {
            var C = o.stateNode;
            try {
              var O = u.shared.hiddenCallbacks;
              if (O !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < O.length; u++)
                  Wm(O[u], C);
            } catch (H) {
              zt(o, o.return, H);
            }
          }
          i && x & 64 && u1(d), zl(d, d.return);
          break;
        case 27:
          h1(d);
        case 26:
        case 5:
          kn(
            u,
            d,
            i
          ), i && o === null && x & 4 && f1(d), zl(d, d.return);
          break;
        case 12:
          kn(
            u,
            d,
            i
          );
          break;
        case 31:
          kn(
            u,
            d,
            i
          ), i && x & 4 && v1(u, d);
          break;
        case 13:
          kn(
            u,
            d,
            i
          ), i && x & 4 && b1(u, d);
          break;
        case 22:
          d.memoizedState === null && kn(
            u,
            d,
            i
          ), zl(d, d.return);
          break;
        case 30:
          break;
        default:
          kn(
            u,
            d,
            i
          );
      }
      n = n.sibling;
    }
  }
  function bc(t, n) {
    var i = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), t = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (t = n.memoizedState.cachePool.pool), t !== i && (t != null && t.refCount++, i != null && xl(i));
  }
  function xc(t, n) {
    t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && xl(t));
  }
  function un(t, n, i, o) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        w1(
          t,
          n,
          i,
          o
        ), n = n.sibling;
  }
  function w1(t, n, i, o) {
    var u = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        un(
          t,
          n,
          i,
          o
        ), u & 2048 && Ol(9, n);
        break;
      case 1:
        un(
          t,
          n,
          i,
          o
        );
        break;
      case 3:
        un(
          t,
          n,
          i,
          o
        ), u & 2048 && (t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && xl(t)));
        break;
      case 12:
        if (u & 2048) {
          un(
            t,
            n,
            i,
            o
          ), t = n.stateNode;
          try {
            var d = n.memoizedProps, x = d.id, C = d.onPostCommit;
            typeof C == "function" && C(
              x,
              n.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (O) {
            zt(n, n.return, O);
          }
        } else
          un(
            t,
            n,
            i,
            o
          );
        break;
      case 31:
        un(
          t,
          n,
          i,
          o
        );
        break;
      case 13:
        un(
          t,
          n,
          i,
          o
        );
        break;
      case 23:
        break;
      case 22:
        d = n.stateNode, x = n.alternate, n.memoizedState !== null ? d._visibility & 2 ? un(
          t,
          n,
          i,
          o
        ) : Ll(t, n) : d._visibility & 2 ? un(
          t,
          n,
          i,
          o
        ) : (d._visibility |= 2, Ci(
          t,
          n,
          i,
          o,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && bc(x, n);
        break;
      case 24:
        un(
          t,
          n,
          i,
          o
        ), u & 2048 && xc(n.alternate, n);
        break;
      default:
        un(
          t,
          n,
          i,
          o
        );
    }
  }
  function Ci(t, n, i, o, u) {
    for (u = u && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var d = t, x = n, C = i, O = o, H = x.flags;
      switch (x.tag) {
        case 0:
        case 11:
        case 15:
          Ci(
            d,
            x,
            C,
            O,
            u
          ), Ol(8, x);
          break;
        case 23:
          break;
        case 22:
          var K = x.stateNode;
          x.memoizedState !== null ? K._visibility & 2 ? Ci(
            d,
            x,
            C,
            O,
            u
          ) : Ll(
            d,
            x
          ) : (K._visibility |= 2, Ci(
            d,
            x,
            C,
            O,
            u
          )), u && H & 2048 && bc(
            x.alternate,
            x
          );
          break;
        case 24:
          Ci(
            d,
            x,
            C,
            O,
            u
          ), u && H & 2048 && xc(x.alternate, x);
          break;
        default:
          Ci(
            d,
            x,
            C,
            O,
            u
          );
      }
      n = n.sibling;
    }
  }
  function Ll(t, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var i = t, o = n, u = o.flags;
        switch (o.tag) {
          case 22:
            Ll(i, o), u & 2048 && bc(
              o.alternate,
              o
            );
            break;
          case 24:
            Ll(i, o), u & 2048 && xc(o.alternate, o);
            break;
          default:
            Ll(i, o);
        }
        n = n.sibling;
      }
  }
  var Bl = 8192;
  function Ei(t, n, i) {
    if (t.subtreeFlags & Bl)
      for (t = t.child; t !== null; )
        T1(
          t,
          n,
          i
        ), t = t.sibling;
  }
  function T1(t, n, i) {
    switch (t.tag) {
      case 26:
        Ei(
          t,
          n,
          i
        ), t.flags & Bl && t.memoizedState !== null && bS(
          i,
          rn,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Ei(
          t,
          n,
          i
        );
        break;
      case 3:
      case 4:
        var o = rn;
        rn = Mo(t.stateNode.containerInfo), Ei(
          t,
          n,
          i
        ), rn = o;
        break;
      case 22:
        t.memoizedState === null && (o = t.alternate, o !== null && o.memoizedState !== null ? (o = Bl, Bl = 16777216, Ei(
          t,
          n,
          i
        ), Bl = o) : Ei(
          t,
          n,
          i
        ));
        break;
      default:
        Ei(
          t,
          n,
          i
        );
    }
  }
  function C1(t) {
    var n = t.alternate;
    if (n !== null && (t = n.child, t !== null)) {
      n.child = null;
      do
        n = t.sibling, t.sibling = null, t = n;
      while (t !== null);
    }
  }
  function Vl(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          de = o, A1(
            o,
            t
          );
        }
      C1(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        E1(t), t = t.sibling;
  }
  function E1(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Vl(t), t.flags & 2048 && ia(9, t, t.return);
        break;
      case 3:
        Vl(t);
        break;
      case 12:
        Vl(t);
        break;
      case 22:
        var n = t.stateNode;
        t.memoizedState !== null && n._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (n._visibility &= -3, mo(t)) : Vl(t);
        break;
      default:
        Vl(t);
    }
  }
  function mo(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          de = o, A1(
            o,
            t
          );
        }
      C1(t);
    }
    for (t = t.child; t !== null; ) {
      switch (n = t, n.tag) {
        case 0:
        case 11:
        case 15:
          ia(8, n, n.return), mo(n);
          break;
        case 22:
          i = n.stateNode, i._visibility & 2 && (i._visibility &= -3, mo(n));
          break;
        default:
          mo(n);
      }
      t = t.sibling;
    }
  }
  function A1(t, n) {
    for (; de !== null; ) {
      var i = de;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          ia(8, i, n);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var o = i.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          xl(i.memoizedState.cache);
      }
      if (o = i.child, o !== null) o.return = i, de = o;
      else
        t: for (i = t; de !== null; ) {
          o = de;
          var u = o.sibling, d = o.return;
          if (y1(o), o === i) {
            de = null;
            break t;
          }
          if (u !== null) {
            u.return = d, de = u;
            break t;
          }
          de = d;
        }
    }
  }
  var zx = {
    getCacheForType: function(t) {
      var n = ye(ne), i = n.data.get(t);
      return i === void 0 && (i = t(), n.data.set(t, i)), i;
    },
    cacheSignal: function() {
      return ye(ne).controller.signal;
    }
  }, Lx = typeof WeakMap == "function" ? WeakMap : Map, _t = 0, kt = null, St = null, Tt = 0, Ot = 0, Ge = null, la = !1, Ai = !1, Sc = !1, Hn = 0, Qt = 0, sa = 0, Ha = 0, wc = 0, Ye = 0, Mi = 0, Ul = null, ze = null, Tc = !1, po = 0, M1 = 0, yo = 1 / 0, go = null, oa = null, oe = 0, ra = null, ji = null, qn = 0, Cc = 0, Ec = null, j1 = null, kl = 0, Ac = null;
  function Xe() {
    return (_t & 2) !== 0 && Tt !== 0 ? Tt & -Tt : z.T !== null ? Nc() : Yh();
  }
  function _1() {
    if (Ye === 0)
      if ((Tt & 536870912) === 0 || Et) {
        var t = Cs;
        Cs <<= 1, (Cs & 3932160) === 0 && (Cs = 262144), Ye = t;
      } else Ye = 536870912;
    return t = qe.current, t !== null && (t.flags |= 32), Ye;
  }
  function Le(t, n, i) {
    (t === kt && (Ot === 2 || Ot === 9) || t.cancelPendingCommit !== null) && (_i(t, 0), ua(
      t,
      Tt,
      Ye,
      !1
    )), sl(t, i), ((_t & 2) === 0 || t !== kt) && (t === kt && ((_t & 2) === 0 && (Ha |= i), Qt === 4 && ua(
      t,
      Tt,
      Ye,
      !1
    )), bn(t));
  }
  function R1(t, n, i) {
    if ((_t & 6) !== 0) throw Error(s(327));
    var o = !i && (n & 127) === 0 && (n & t.expiredLanes) === 0 || ll(t, n), u = o ? Ux(t, n) : jc(t, n, !0), d = o;
    do {
      if (u === 0) {
        Ai && !o && ua(t, n, 0, !1);
        break;
      } else {
        if (i = t.current.alternate, d && !Bx(i)) {
          u = jc(t, n, !1), d = !1;
          continue;
        }
        if (u === 2) {
          if (d = n, t.errorRecoveryDisabledLanes & d)
            var x = 0;
          else
            x = t.pendingLanes & -536870913, x = x !== 0 ? x : x & 536870912 ? 536870912 : 0;
          if (x !== 0) {
            n = x;
            t: {
              var C = t;
              u = Ul;
              var O = C.current.memoizedState.isDehydrated;
              if (O && (_i(C, x).flags |= 256), x = jc(
                C,
                x,
                !1
              ), x !== 2) {
                if (Sc && !O) {
                  C.errorRecoveryDisabledLanes |= d, Ha |= d, u = 4;
                  break t;
                }
                d = ze, ze = u, d !== null && (ze === null ? ze = d : ze.push.apply(
                  ze,
                  d
                ));
              }
              u = x;
            }
            if (d = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          _i(t, 0), ua(t, n, 0, !0);
          break;
        }
        t: {
          switch (o = t, d = u, d) {
            case 0:
            case 1:
              throw Error(s(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              ua(
                o,
                n,
                Ye,
                !la
              );
              break t;
            case 2:
              ze = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((n & 62914560) === n && (u = po + 300 - Be(), 10 < u)) {
            if (ua(
              o,
              n,
              Ye,
              !la
            ), As(o, 0, !0) !== 0) break t;
            qn = n, o.timeoutHandle = o0(
              D1.bind(
                null,
                o,
                i,
                ze,
                go,
                Tc,
                n,
                Ye,
                Ha,
                Mi,
                la,
                d,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break t;
          }
          D1(
            o,
            i,
            ze,
            go,
            Tc,
            n,
            Ye,
            Ha,
            Mi,
            la,
            d,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    bn(t);
  }
  function D1(t, n, i, o, u, d, x, C, O, H, K, J, $, Y) {
    if (t.timeoutHandle = -1, J = n.subtreeFlags, J & 8192 || (J & 16785408) === 16785408) {
      J = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: An
      }, T1(
        n,
        d,
        J
      );
      var ot = (d & 62914560) === d ? po - Be() : (d & 4194048) === d ? M1 - Be() : 0;
      if (ot = xS(
        J,
        ot
      ), ot !== null) {
        qn = d, t.cancelPendingCommit = ot(
          k1.bind(
            null,
            t,
            n,
            d,
            i,
            o,
            u,
            x,
            C,
            O,
            K,
            J,
            null,
            $,
            Y
          )
        ), ua(t, d, x, !H);
        return;
      }
    }
    k1(
      t,
      n,
      d,
      i,
      o,
      u,
      x,
      C,
      O
    );
  }
  function Bx(t) {
    for (var n = t; ; ) {
      var i = n.tag;
      if ((i === 0 || i === 11 || i === 15) && n.flags & 16384 && (i = n.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var o = 0; o < i.length; o++) {
          var u = i[o], d = u.getSnapshot;
          u = u.value;
          try {
            if (!ke(d(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (i = n.child, n.subtreeFlags & 16384 && i !== null)
        i.return = n, n = i;
      else {
        if (n === t) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === t) return !0;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
    }
    return !0;
  }
  function ua(t, n, i, o) {
    n &= ~wc, n &= ~Ha, t.suspendedLanes |= n, t.pingedLanes &= ~n, o && (t.warmLanes |= n), o = t.expirationTimes;
    for (var u = n; 0 < u; ) {
      var d = 31 - Ue(u), x = 1 << d;
      o[d] = -1, u &= ~x;
    }
    i !== 0 && qh(t, i, n);
  }
  function vo() {
    return (_t & 6) === 0 ? (Hl(0), !1) : !0;
  }
  function Mc() {
    if (St !== null) {
      if (Ot === 0)
        var t = St.return;
      else
        t = St, Rn = Da = null, Gu(t), bi = null, wl = 0, t = St;
      for (; t !== null; )
        r1(t.alternate, t), t = t.return;
      St = null;
    }
  }
  function _i(t, n) {
    var i = t.timeoutHandle;
    i !== -1 && (t.timeoutHandle = -1, nS(i)), i = t.cancelPendingCommit, i !== null && (t.cancelPendingCommit = null, i()), qn = 0, Mc(), kt = t, St = i = jn(t.current, null), Tt = n, Ot = 0, Ge = null, la = !1, Ai = ll(t, n), Sc = !1, Mi = Ye = wc = Ha = sa = Qt = 0, ze = Ul = null, Tc = !1, (n & 8) !== 0 && (n |= n & 32);
    var o = t.entangledLanes;
    if (o !== 0)
      for (t = t.entanglements, o &= n; 0 < o; ) {
        var u = 31 - Ue(o), d = 1 << u;
        n |= t[u], o &= ~d;
      }
    return Hn = n, Us(), i;
  }
  function N1(t, n) {
    vt = null, z.H = Rl, n === vi || n === Ps ? (n = Zm(), Ot = 3) : n === Du ? (n = Zm(), Ot = 4) : Ot = n === lc ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Ge = n, St === null && (Qt = 1, so(
      t,
      Je(n, t.current)
    ));
  }
  function O1() {
    var t = qe.current;
    return t === null ? !0 : (Tt & 4194048) === Tt ? en === null : (Tt & 62914560) === Tt || (Tt & 536870912) !== 0 ? t === en : !1;
  }
  function z1() {
    var t = z.H;
    return z.H = Rl, t === null ? Rl : t;
  }
  function L1() {
    var t = z.A;
    return z.A = zx, t;
  }
  function bo() {
    Qt = 4, la || (Tt & 4194048) !== Tt && qe.current !== null || (Ai = !0), (sa & 134217727) === 0 && (Ha & 134217727) === 0 || kt === null || ua(
      kt,
      Tt,
      Ye,
      !1
    );
  }
  function jc(t, n, i) {
    var o = _t;
    _t |= 2;
    var u = z1(), d = L1();
    (kt !== t || Tt !== n) && (go = null, _i(t, n)), n = !1;
    var x = Qt;
    t: do
      try {
        if (Ot !== 0 && St !== null) {
          var C = St, O = Ge;
          switch (Ot) {
            case 8:
              Mc(), x = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              qe.current === null && (n = !0);
              var H = Ot;
              if (Ot = 0, Ge = null, Ri(t, C, O, H), i && Ai) {
                x = 0;
                break t;
              }
              break;
            default:
              H = Ot, Ot = 0, Ge = null, Ri(t, C, O, H);
          }
        }
        Vx(), x = Qt;
        break;
      } catch (K) {
        N1(t, K);
      }
    while (!0);
    return n && t.shellSuspendCounter++, Rn = Da = null, _t = o, z.H = u, z.A = d, St === null && (kt = null, Tt = 0, Us()), x;
  }
  function Vx() {
    for (; St !== null; ) B1(St);
  }
  function Ux(t, n) {
    var i = _t;
    _t |= 2;
    var o = z1(), u = L1();
    kt !== t || Tt !== n ? (go = null, yo = Be() + 500, _i(t, n)) : Ai = ll(
      t,
      n
    );
    t: do
      try {
        if (Ot !== 0 && St !== null) {
          n = St;
          var d = Ge;
          e: switch (Ot) {
            case 1:
              Ot = 0, Ge = null, Ri(t, n, d, 1);
              break;
            case 2:
            case 9:
              if (Pm(d)) {
                Ot = 0, Ge = null, V1(n);
                break;
              }
              n = function() {
                Ot !== 2 && Ot !== 9 || kt !== t || (Ot = 7), bn(t);
              }, d.then(n, n);
              break t;
            case 3:
              Ot = 7;
              break t;
            case 4:
              Ot = 5;
              break t;
            case 7:
              Pm(d) ? (Ot = 0, Ge = null, V1(n)) : (Ot = 0, Ge = null, Ri(t, n, d, 7));
              break;
            case 5:
              var x = null;
              switch (St.tag) {
                case 26:
                  x = St.memoizedState;
                case 5:
                case 27:
                  var C = St;
                  if (x ? w0(x) : C.stateNode.complete) {
                    Ot = 0, Ge = null;
                    var O = C.sibling;
                    if (O !== null) St = O;
                    else {
                      var H = C.return;
                      H !== null ? (St = H, xo(H)) : St = null;
                    }
                    break e;
                  }
              }
              Ot = 0, Ge = null, Ri(t, n, d, 5);
              break;
            case 6:
              Ot = 0, Ge = null, Ri(t, n, d, 6);
              break;
            case 8:
              Mc(), Qt = 6;
              break t;
            default:
              throw Error(s(462));
          }
        }
        kx();
        break;
      } catch (K) {
        N1(t, K);
      }
    while (!0);
    return Rn = Da = null, z.H = o, z.A = u, _t = i, St !== null ? 0 : (kt = null, Tt = 0, Us(), Qt);
  }
  function kx() {
    for (; St !== null && !r3(); )
      B1(St);
  }
  function B1(t) {
    var n = s1(t.alternate, t, Hn);
    t.memoizedProps = t.pendingProps, n === null ? xo(t) : St = n;
  }
  function V1(t) {
    var n = t, i = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = t1(
          i,
          n,
          n.pendingProps,
          n.type,
          void 0,
          Tt
        );
        break;
      case 11:
        n = t1(
          i,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          Tt
        );
        break;
      case 5:
        Gu(n);
      default:
        r1(i, n), n = St = Lm(n, Hn), n = s1(i, n, Hn);
    }
    t.memoizedProps = t.pendingProps, n === null ? xo(t) : St = n;
  }
  function Ri(t, n, i, o) {
    Rn = Da = null, Gu(n), bi = null, wl = 0;
    var u = n.return;
    try {
      if (Mx(
        t,
        u,
        n,
        i,
        Tt
      )) {
        Qt = 1, so(
          t,
          Je(i, t.current)
        ), St = null;
        return;
      }
    } catch (d) {
      if (u !== null) throw St = u, d;
      Qt = 1, so(
        t,
        Je(i, t.current)
      ), St = null;
      return;
    }
    n.flags & 32768 ? (Et || o === 1 ? t = !0 : Ai || (Tt & 536870912) !== 0 ? t = !1 : (la = t = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = qe.current, o !== null && o.tag === 13 && (o.flags |= 16384))), U1(n, t)) : xo(n);
  }
  function xo(t) {
    var n = t;
    do {
      if ((n.flags & 32768) !== 0) {
        U1(
          n,
          la
        );
        return;
      }
      t = n.return;
      var i = Rx(
        n.alternate,
        n,
        Hn
      );
      if (i !== null) {
        St = i;
        return;
      }
      if (n = n.sibling, n !== null) {
        St = n;
        return;
      }
      St = n = t;
    } while (n !== null);
    Qt === 0 && (Qt = 5);
  }
  function U1(t, n) {
    do {
      var i = Dx(t.alternate, t);
      if (i !== null) {
        i.flags &= 32767, St = i;
        return;
      }
      if (i = t.return, i !== null && (i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null), !n && (t = t.sibling, t !== null)) {
        St = t;
        return;
      }
      St = t = i;
    } while (t !== null);
    Qt = 6, St = null;
  }
  function k1(t, n, i, o, u, d, x, C, O) {
    t.cancelPendingCommit = null;
    do
      So();
    while (oe !== 0);
    if ((_t & 6) !== 0) throw Error(s(327));
    if (n !== null) {
      if (n === t.current) throw Error(s(177));
      if (d = n.lanes | n.childLanes, d |= yu, v3(
        t,
        i,
        d,
        x,
        C,
        O
      ), t === kt && (St = kt = null, Tt = 0), ji = n, ra = t, qn = i, Cc = d, Ec = u, j1 = o, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, Gx(ws, function() {
        return Y1(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), o = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || o) {
        o = z.T, z.T = null, u = P.p, P.p = 2, x = _t, _t |= 4;
        try {
          Nx(t, n, i);
        } finally {
          _t = x, P.p = u, z.T = o;
        }
      }
      oe = 1, H1(), q1(), $1();
    }
  }
  function H1() {
    if (oe === 1) {
      oe = 0;
      var t = ra, n = ji, i = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || i) {
        i = z.T, z.T = null;
        var o = P.p;
        P.p = 2;
        var u = _t;
        _t |= 4;
        try {
          x1(n, t);
          var d = Hc, x = Am(t.containerInfo), C = d.focusedElem, O = d.selectionRange;
          if (x !== C && C && C.ownerDocument && Em(
            C.ownerDocument.documentElement,
            C
          )) {
            if (O !== null && fu(C)) {
              var H = O.start, K = O.end;
              if (K === void 0 && (K = H), "selectionStart" in C)
                C.selectionStart = H, C.selectionEnd = Math.min(
                  K,
                  C.value.length
                );
              else {
                var J = C.ownerDocument || document, $ = J && J.defaultView || window;
                if ($.getSelection) {
                  var Y = $.getSelection(), ot = C.textContent.length, mt = Math.min(O.start, ot), Vt = O.end === void 0 ? mt : Math.min(O.end, ot);
                  !Y.extend && mt > Vt && (x = Vt, Vt = mt, mt = x);
                  var U = Cm(
                    C,
                    mt
                  ), B = Cm(
                    C,
                    Vt
                  );
                  if (U && B && (Y.rangeCount !== 1 || Y.anchorNode !== U.node || Y.anchorOffset !== U.offset || Y.focusNode !== B.node || Y.focusOffset !== B.offset)) {
                    var k = J.createRange();
                    k.setStart(U.node, U.offset), Y.removeAllRanges(), mt > Vt ? (Y.addRange(k), Y.extend(B.node, B.offset)) : (k.setEnd(B.node, B.offset), Y.addRange(k));
                  }
                }
              }
            }
            for (J = [], Y = C; Y = Y.parentNode; )
              Y.nodeType === 1 && J.push({
                element: Y,
                left: Y.scrollLeft,
                top: Y.scrollTop
              });
            for (typeof C.focus == "function" && C.focus(), C = 0; C < J.length; C++) {
              var Q = J[C];
              Q.element.scrollLeft = Q.left, Q.element.scrollTop = Q.top;
            }
          }
          Oo = !!kc, Hc = kc = null;
        } finally {
          _t = u, P.p = o, z.T = i;
        }
      }
      t.current = n, oe = 2;
    }
  }
  function q1() {
    if (oe === 2) {
      oe = 0;
      var t = ra, n = ji, i = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || i) {
        i = z.T, z.T = null;
        var o = P.p;
        P.p = 2;
        var u = _t;
        _t |= 4;
        try {
          p1(t, n.alternate, n);
        } finally {
          _t = u, P.p = o, z.T = i;
        }
      }
      oe = 3;
    }
  }
  function $1() {
    if (oe === 4 || oe === 3) {
      oe = 0, u3();
      var t = ra, n = ji, i = qn, o = j1;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? oe = 5 : (oe = 0, ji = ra = null, G1(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (u === 0 && (oa = null), Pr(i), n = n.stateNode, Ve && typeof Ve.onCommitFiberRoot == "function")
        try {
          Ve.onCommitFiberRoot(
            il,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (o !== null) {
        n = z.T, u = P.p, P.p = 2, z.T = null;
        try {
          for (var d = t.onRecoverableError, x = 0; x < o.length; x++) {
            var C = o[x];
            d(C.value, {
              componentStack: C.stack
            });
          }
        } finally {
          z.T = n, P.p = u;
        }
      }
      (qn & 3) !== 0 && So(), bn(t), u = t.pendingLanes, (i & 261930) !== 0 && (u & 42) !== 0 ? t === Ac ? kl++ : (kl = 0, Ac = t) : kl = 0, Hl(0);
    }
  }
  function G1(t, n) {
    (t.pooledCacheLanes &= n) === 0 && (n = t.pooledCache, n != null && (t.pooledCache = null, xl(n)));
  }
  function So() {
    return H1(), q1(), $1(), Y1();
  }
  function Y1() {
    if (oe !== 5) return !1;
    var t = ra, n = Cc;
    Cc = 0;
    var i = Pr(qn), o = z.T, u = P.p;
    try {
      P.p = 32 > i ? 32 : i, z.T = null, i = Ec, Ec = null;
      var d = ra, x = qn;
      if (oe = 0, ji = ra = null, qn = 0, (_t & 6) !== 0) throw Error(s(331));
      var C = _t;
      if (_t |= 4, E1(d.current), w1(
        d,
        d.current,
        x,
        i
      ), _t = C, Hl(0, !1), Ve && typeof Ve.onPostCommitFiberRoot == "function")
        try {
          Ve.onPostCommitFiberRoot(il, d);
        } catch {
        }
      return !0;
    } finally {
      P.p = u, z.T = o, G1(t, n);
    }
  }
  function X1(t, n, i) {
    n = Je(i, n), n = ic(t.stateNode, n, 2), t = ea(t, n, 2), t !== null && (sl(t, 2), bn(t));
  }
  function zt(t, n, i) {
    if (t.tag === 3)
      X1(t, t, i);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          X1(
            n,
            t,
            i
          );
          break;
        } else if (n.tag === 1) {
          var o = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (oa === null || !oa.has(o))) {
            t = Je(i, t), i = Pp(2), o = ea(n, i, 2), o !== null && (Kp(
              i,
              o,
              n,
              t
            ), sl(o, 2), bn(o));
            break;
          }
        }
        n = n.return;
      }
  }
  function _c(t, n, i) {
    var o = t.pingCache;
    if (o === null) {
      o = t.pingCache = new Lx();
      var u = /* @__PURE__ */ new Set();
      o.set(n, u);
    } else
      u = o.get(n), u === void 0 && (u = /* @__PURE__ */ new Set(), o.set(n, u));
    u.has(i) || (Sc = !0, u.add(i), t = Hx.bind(null, t, n, i), n.then(t, t));
  }
  function Hx(t, n, i) {
    var o = t.pingCache;
    o !== null && o.delete(n), t.pingedLanes |= t.suspendedLanes & i, t.warmLanes &= ~i, kt === t && (Tt & i) === i && (Qt === 4 || Qt === 3 && (Tt & 62914560) === Tt && 300 > Be() - po ? (_t & 2) === 0 && _i(t, 0) : wc |= i, Mi === Tt && (Mi = 0)), bn(t);
  }
  function P1(t, n) {
    n === 0 && (n = Hh()), t = ja(t, n), t !== null && (sl(t, n), bn(t));
  }
  function qx(t) {
    var n = t.memoizedState, i = 0;
    n !== null && (i = n.retryLane), P1(t, i);
  }
  function $x(t, n) {
    var i = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var o = t.stateNode, u = t.memoizedState;
        u !== null && (i = u.retryLane);
        break;
      case 19:
        o = t.stateNode;
        break;
      case 22:
        o = t.stateNode._retryCache;
        break;
      default:
        throw Error(s(314));
    }
    o !== null && o.delete(n), P1(t, i);
  }
  function Gx(t, n) {
    return $r(t, n);
  }
  var wo = null, Di = null, Rc = !1, To = !1, Dc = !1, ca = 0;
  function bn(t) {
    t !== Di && t.next === null && (Di === null ? wo = Di = t : Di = Di.next = t), To = !0, Rc || (Rc = !0, Xx());
  }
  function Hl(t, n) {
    if (!Dc && To) {
      Dc = !0;
      do
        for (var i = !1, o = wo; o !== null; ) {
          if (t !== 0) {
            var u = o.pendingLanes;
            if (u === 0) var d = 0;
            else {
              var x = o.suspendedLanes, C = o.pingedLanes;
              d = (1 << 31 - Ue(42 | t) + 1) - 1, d &= u & ~(x & ~C), d = d & 201326741 ? d & 201326741 | 1 : d ? d | 2 : 0;
            }
            d !== 0 && (i = !0, F1(o, d));
          } else
            d = Tt, d = As(
              o,
              o === kt ? d : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (d & 3) === 0 || ll(o, d) || (i = !0, F1(o, d));
          o = o.next;
        }
      while (i);
      Dc = !1;
    }
  }
  function Yx() {
    K1();
  }
  function K1() {
    To = Rc = !1;
    var t = 0;
    ca !== 0 && eS() && (t = ca);
    for (var n = Be(), i = null, o = wo; o !== null; ) {
      var u = o.next, d = Z1(o, n);
      d === 0 ? (o.next = null, i === null ? wo = u : i.next = u, u === null && (Di = i)) : (i = o, (t !== 0 || (d & 3) !== 0) && (To = !0)), o = u;
    }
    oe !== 0 && oe !== 5 || Hl(t), ca !== 0 && (ca = 0);
  }
  function Z1(t, n) {
    for (var i = t.suspendedLanes, o = t.pingedLanes, u = t.expirationTimes, d = t.pendingLanes & -62914561; 0 < d; ) {
      var x = 31 - Ue(d), C = 1 << x, O = u[x];
      O === -1 ? ((C & i) === 0 || (C & o) !== 0) && (u[x] = g3(C, n)) : O <= n && (t.expiredLanes |= C), d &= ~C;
    }
    if (n = kt, i = Tt, i = As(
      t,
      t === n ? i : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o = t.callbackNode, i === 0 || t === n && (Ot === 2 || Ot === 9) || t.cancelPendingCommit !== null)
      return o !== null && o !== null && Gr(o), t.callbackNode = null, t.callbackPriority = 0;
    if ((i & 3) === 0 || ll(t, i)) {
      if (n = i & -i, n === t.callbackPriority) return n;
      switch (o !== null && Gr(o), Pr(i)) {
        case 2:
        case 8:
          i = Uh;
          break;
        case 32:
          i = ws;
          break;
        case 268435456:
          i = kh;
          break;
        default:
          i = ws;
      }
      return o = Q1.bind(null, t), i = $r(i, o), t.callbackPriority = n, t.callbackNode = i, n;
    }
    return o !== null && o !== null && Gr(o), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Q1(t, n) {
    if (oe !== 0 && oe !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var i = t.callbackNode;
    if (So() && t.callbackNode !== i)
      return null;
    var o = Tt;
    return o = As(
      t,
      t === kt ? o : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o === 0 ? null : (R1(t, o, n), Z1(t, Be()), t.callbackNode != null && t.callbackNode === i ? Q1.bind(null, t) : null);
  }
  function F1(t, n) {
    if (So()) return null;
    R1(t, n, !0);
  }
  function Xx() {
    aS(function() {
      (_t & 6) !== 0 ? $r(
        Vh,
        Yx
      ) : K1();
    });
  }
  function Nc() {
    if (ca === 0) {
      var t = yi;
      t === 0 && (t = Ts, Ts <<= 1, (Ts & 261888) === 0 && (Ts = 256)), ca = t;
    }
    return ca;
  }
  function J1(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Rs("" + t);
  }
  function W1(t, n) {
    var i = n.ownerDocument.createElement("input");
    return i.name = n.name, i.value = n.value, t.id && i.setAttribute("form", t.id), n.parentNode.insertBefore(i, n), t = new FormData(t), i.parentNode.removeChild(i), t;
  }
  function Px(t, n, i, o, u) {
    if (n === "submit" && i && i.stateNode === u) {
      var d = J1(
        (u[_e] || null).action
      ), x = o.submitter;
      x && (n = (n = x[_e] || null) ? J1(n.formAction) : x.getAttribute("formAction"), n !== null && (d = n, x = null));
      var C = new zs(
        "action",
        "action",
        null,
        o,
        u
      );
      t.push({
        event: C,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (o.defaultPrevented) {
                if (ca !== 0) {
                  var O = x ? W1(u, x) : new FormData(u);
                  Wu(
                    i,
                    {
                      pending: !0,
                      data: O,
                      method: u.method,
                      action: d
                    },
                    null,
                    O
                  );
                }
              } else
                typeof d == "function" && (C.preventDefault(), O = x ? W1(u, x) : new FormData(u), Wu(
                  i,
                  {
                    pending: !0,
                    data: O,
                    method: u.method,
                    action: d
                  },
                  d,
                  O
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var Oc = 0; Oc < pu.length; Oc++) {
    var zc = pu[Oc], Kx = zc.toLowerCase(), Zx = zc[0].toUpperCase() + zc.slice(1);
    on(
      Kx,
      "on" + Zx
    );
  }
  on(_m, "onAnimationEnd"), on(Rm, "onAnimationIteration"), on(Dm, "onAnimationStart"), on("dblclick", "onDoubleClick"), on("focusin", "onFocus"), on("focusout", "onBlur"), on(cx, "onTransitionRun"), on(fx, "onTransitionStart"), on(dx, "onTransitionCancel"), on(Nm, "onTransitionEnd"), ni("onMouseEnter", ["mouseout", "mouseover"]), ni("onMouseLeave", ["mouseout", "mouseover"]), ni("onPointerEnter", ["pointerout", "pointerover"]), ni("onPointerLeave", ["pointerout", "pointerover"]), Ca(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ca(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ca("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ca(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ca(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ca(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var ql = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Qx = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ql)
  );
  function I1(t, n) {
    n = (n & 4) !== 0;
    for (var i = 0; i < t.length; i++) {
      var o = t[i], u = o.event;
      o = o.listeners;
      t: {
        var d = void 0;
        if (n)
          for (var x = o.length - 1; 0 <= x; x--) {
            var C = o[x], O = C.instance, H = C.currentTarget;
            if (C = C.listener, O !== d && u.isPropagationStopped())
              break t;
            d = C, u.currentTarget = H;
            try {
              d(u);
            } catch (K) {
              Vs(K);
            }
            u.currentTarget = null, d = O;
          }
        else
          for (x = 0; x < o.length; x++) {
            if (C = o[x], O = C.instance, H = C.currentTarget, C = C.listener, O !== d && u.isPropagationStopped())
              break t;
            d = C, u.currentTarget = H;
            try {
              d(u);
            } catch (K) {
              Vs(K);
            }
            u.currentTarget = null, d = O;
          }
      }
    }
  }
  function wt(t, n) {
    var i = n[Kr];
    i === void 0 && (i = n[Kr] = /* @__PURE__ */ new Set());
    var o = t + "__bubble";
    i.has(o) || (t0(n, t, 2, !1), i.add(o));
  }
  function Lc(t, n, i) {
    var o = 0;
    n && (o |= 4), t0(
      i,
      t,
      o,
      n
    );
  }
  var Co = "_reactListening" + Math.random().toString(36).slice(2);
  function Bc(t) {
    if (!t[Co]) {
      t[Co] = !0, Kh.forEach(function(i) {
        i !== "selectionchange" && (Qx.has(i) || Lc(i, !1, t), Lc(i, !0, t));
      });
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[Co] || (n[Co] = !0, Lc("selectionchange", !1, n));
    }
  }
  function t0(t, n, i, o) {
    switch (_0(n)) {
      case 2:
        var u = TS;
        break;
      case 8:
        u = CS;
        break;
      default:
        u = Jc;
    }
    i = u.bind(
      null,
      n,
      i,
      t
    ), u = void 0, !nu || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (u = !0), o ? u !== void 0 ? t.addEventListener(n, i, {
      capture: !0,
      passive: u
    }) : t.addEventListener(n, i, !0) : u !== void 0 ? t.addEventListener(n, i, {
      passive: u
    }) : t.addEventListener(n, i, !1);
  }
  function Vc(t, n, i, o, u) {
    var d = o;
    if ((n & 1) === 0 && (n & 2) === 0 && o !== null)
      t: for (; ; ) {
        if (o === null) return;
        var x = o.tag;
        if (x === 3 || x === 4) {
          var C = o.stateNode.containerInfo;
          if (C === u) break;
          if (x === 4)
            for (x = o.return; x !== null; ) {
              var O = x.tag;
              if ((O === 3 || O === 4) && x.stateNode.containerInfo === u)
                return;
              x = x.return;
            }
          for (; C !== null; ) {
            if (x = Ia(C), x === null) return;
            if (O = x.tag, O === 5 || O === 6 || O === 26 || O === 27) {
              o = d = x;
              continue t;
            }
            C = C.parentNode;
          }
        }
        o = o.return;
      }
    lm(function() {
      var H = d, K = tu(i), J = [];
      t: {
        var $ = Om.get(t);
        if ($ !== void 0) {
          var Y = zs, ot = t;
          switch (t) {
            case "keypress":
              if (Ns(i) === 0) break t;
            case "keydown":
            case "keyup":
              Y = $3;
              break;
            case "focusin":
              ot = "focus", Y = su;
              break;
            case "focusout":
              ot = "blur", Y = su;
              break;
            case "beforeblur":
            case "afterblur":
              Y = su;
              break;
            case "click":
              if (i.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              Y = rm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              Y = R3;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              Y = X3;
              break;
            case _m:
            case Rm:
            case Dm:
              Y = O3;
              break;
            case Nm:
              Y = K3;
              break;
            case "scroll":
            case "scrollend":
              Y = j3;
              break;
            case "wheel":
              Y = Q3;
              break;
            case "copy":
            case "cut":
            case "paste":
              Y = L3;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              Y = cm;
              break;
            case "toggle":
            case "beforetoggle":
              Y = J3;
          }
          var mt = (n & 4) !== 0, Vt = !mt && (t === "scroll" || t === "scrollend"), U = mt ? $ !== null ? $ + "Capture" : null : $;
          mt = [];
          for (var B = H, k; B !== null; ) {
            var Q = B;
            if (k = Q.stateNode, Q = Q.tag, Q !== 5 && Q !== 26 && Q !== 27 || k === null || U === null || (Q = ul(B, U), Q != null && mt.push(
              $l(B, Q, k)
            )), Vt) break;
            B = B.return;
          }
          0 < mt.length && ($ = new Y(
            $,
            ot,
            null,
            i,
            K
          ), J.push({ event: $, listeners: mt }));
        }
      }
      if ((n & 7) === 0) {
        t: {
          if ($ = t === "mouseover" || t === "pointerover", Y = t === "mouseout" || t === "pointerout", $ && i !== Ir && (ot = i.relatedTarget || i.fromElement) && (Ia(ot) || ot[Wa]))
            break t;
          if ((Y || $) && ($ = K.window === K ? K : ($ = K.ownerDocument) ? $.defaultView || $.parentWindow : window, Y ? (ot = i.relatedTarget || i.toElement, Y = H, ot = ot ? Ia(ot) : null, ot !== null && (Vt = c(ot), mt = ot.tag, ot !== Vt || mt !== 5 && mt !== 27 && mt !== 6) && (ot = null)) : (Y = null, ot = H), Y !== ot)) {
            if (mt = rm, Q = "onMouseLeave", U = "onMouseEnter", B = "mouse", (t === "pointerout" || t === "pointerover") && (mt = cm, Q = "onPointerLeave", U = "onPointerEnter", B = "pointer"), Vt = Y == null ? $ : rl(Y), k = ot == null ? $ : rl(ot), $ = new mt(
              Q,
              B + "leave",
              Y,
              i,
              K
            ), $.target = Vt, $.relatedTarget = k, Q = null, Ia(K) === H && (mt = new mt(
              U,
              B + "enter",
              ot,
              i,
              K
            ), mt.target = k, mt.relatedTarget = Vt, Q = mt), Vt = Q, Y && ot)
              e: {
                for (mt = Fx, U = Y, B = ot, k = 0, Q = U; Q; Q = mt(Q))
                  k++;
                Q = 0;
                for (var dt = B; dt; dt = mt(dt))
                  Q++;
                for (; 0 < k - Q; )
                  U = mt(U), k--;
                for (; 0 < Q - k; )
                  B = mt(B), Q--;
                for (; k--; ) {
                  if (U === B || B !== null && U === B.alternate) {
                    mt = U;
                    break e;
                  }
                  U = mt(U), B = mt(B);
                }
                mt = null;
              }
            else mt = null;
            Y !== null && e0(
              J,
              $,
              Y,
              mt,
              !1
            ), ot !== null && Vt !== null && e0(
              J,
              Vt,
              ot,
              mt,
              !0
            );
          }
        }
        t: {
          if ($ = H ? rl(H) : window, Y = $.nodeName && $.nodeName.toLowerCase(), Y === "select" || Y === "input" && $.type === "file")
            var At = vm;
          else if (ym($))
            if (bm)
              At = ox;
            else {
              At = lx;
              var ct = ix;
            }
          else
            Y = $.nodeName, !Y || Y.toLowerCase() !== "input" || $.type !== "checkbox" && $.type !== "radio" ? H && Wr(H.elementType) && (At = vm) : At = sx;
          if (At && (At = At(t, H))) {
            gm(
              J,
              At,
              i,
              K
            );
            break t;
          }
          ct && ct(t, $, H), t === "focusout" && H && $.type === "number" && H.memoizedProps.value != null && Jr($, "number", $.value);
        }
        switch (ct = H ? rl(H) : window, t) {
          case "focusin":
            (ym(ct) || ct.contentEditable === "true") && (ri = ct, du = H, gl = null);
            break;
          case "focusout":
            gl = du = ri = null;
            break;
          case "mousedown":
            hu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            hu = !1, Mm(J, i, K);
            break;
          case "selectionchange":
            if (ux) break;
          case "keydown":
          case "keyup":
            Mm(J, i, K);
        }
        var bt;
        if (ru)
          t: {
            switch (t) {
              case "compositionstart":
                var Ct = "onCompositionStart";
                break t;
              case "compositionend":
                Ct = "onCompositionEnd";
                break t;
              case "compositionupdate":
                Ct = "onCompositionUpdate";
                break t;
            }
            Ct = void 0;
          }
        else
          oi ? mm(t, i) && (Ct = "onCompositionEnd") : t === "keydown" && i.keyCode === 229 && (Ct = "onCompositionStart");
        Ct && (fm && i.locale !== "ko" && (oi || Ct !== "onCompositionStart" ? Ct === "onCompositionEnd" && oi && (bt = sm()) : (Zn = K, au = "value" in Zn ? Zn.value : Zn.textContent, oi = !0)), ct = Eo(H, Ct), 0 < ct.length && (Ct = new um(
          Ct,
          t,
          null,
          i,
          K
        ), J.push({ event: Ct, listeners: ct }), bt ? Ct.data = bt : (bt = pm(i), bt !== null && (Ct.data = bt)))), (bt = I3 ? tx(t, i) : ex(t, i)) && (Ct = Eo(H, "onBeforeInput"), 0 < Ct.length && (ct = new um(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          K
        ), J.push({
          event: ct,
          listeners: Ct
        }), ct.data = bt)), Px(
          J,
          t,
          H,
          i,
          K
        );
      }
      I1(J, n);
    });
  }
  function $l(t, n, i) {
    return {
      instance: t,
      listener: n,
      currentTarget: i
    };
  }
  function Eo(t, n) {
    for (var i = n + "Capture", o = []; t !== null; ) {
      var u = t, d = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || d === null || (u = ul(t, i), u != null && o.unshift(
        $l(t, u, d)
      ), u = ul(t, n), u != null && o.push(
        $l(t, u, d)
      )), t.tag === 3) return o;
      t = t.return;
    }
    return [];
  }
  function Fx(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function e0(t, n, i, o, u) {
    for (var d = n._reactName, x = []; i !== null && i !== o; ) {
      var C = i, O = C.alternate, H = C.stateNode;
      if (C = C.tag, O !== null && O === o) break;
      C !== 5 && C !== 26 && C !== 27 || H === null || (O = H, u ? (H = ul(i, d), H != null && x.unshift(
        $l(i, H, O)
      )) : u || (H = ul(i, d), H != null && x.push(
        $l(i, H, O)
      ))), i = i.return;
    }
    x.length !== 0 && t.push({ event: n, listeners: x });
  }
  var Jx = /\r\n?/g, Wx = /\u0000|\uFFFD/g;
  function n0(t) {
    return (typeof t == "string" ? t : "" + t).replace(Jx, `
`).replace(Wx, "");
  }
  function a0(t, n) {
    return n = n0(n), n0(t) === n;
  }
  function Bt(t, n, i, o, u, d) {
    switch (i) {
      case "children":
        typeof o == "string" ? n === "body" || n === "textarea" && o === "" || ii(t, o) : (typeof o == "number" || typeof o == "bigint") && n !== "body" && ii(t, "" + o);
        break;
      case "className":
        js(t, "class", o);
        break;
      case "tabIndex":
        js(t, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        js(t, i, o);
        break;
      case "style":
        am(t, o, d);
        break;
      case "data":
        if (n !== "object") {
          js(t, "data", o);
          break;
        }
      case "src":
      case "href":
        if (o === "" && (n !== "a" || i !== "href")) {
          t.removeAttribute(i);
          break;
        }
        if (o == null || typeof o == "function" || typeof o == "symbol" || typeof o == "boolean") {
          t.removeAttribute(i);
          break;
        }
        o = Rs("" + o), t.setAttribute(i, o);
        break;
      case "action":
      case "formAction":
        if (typeof o == "function") {
          t.setAttribute(
            i,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof d == "function" && (i === "formAction" ? (n !== "input" && Bt(t, n, "name", u.name, u, null), Bt(
            t,
            n,
            "formEncType",
            u.formEncType,
            u,
            null
          ), Bt(
            t,
            n,
            "formMethod",
            u.formMethod,
            u,
            null
          ), Bt(
            t,
            n,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (Bt(t, n, "encType", u.encType, u, null), Bt(t, n, "method", u.method, u, null), Bt(t, n, "target", u.target, u, null)));
        if (o == null || typeof o == "symbol" || typeof o == "boolean") {
          t.removeAttribute(i);
          break;
        }
        o = Rs("" + o), t.setAttribute(i, o);
        break;
      case "onClick":
        o != null && (t.onclick = An);
        break;
      case "onScroll":
        o != null && wt("scroll", t);
        break;
      case "onScrollEnd":
        o != null && wt("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(s(61));
          if (i = o.__html, i != null) {
            if (u.children != null) throw Error(s(60));
            t.innerHTML = i;
          }
        }
        break;
      case "multiple":
        t.multiple = o && typeof o != "function" && typeof o != "symbol";
        break;
      case "muted":
        t.muted = o && typeof o != "function" && typeof o != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (o == null || typeof o == "function" || typeof o == "boolean" || typeof o == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        i = Rs("" + o), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          i
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        o != null && typeof o != "function" && typeof o != "symbol" ? t.setAttribute(i, "" + o) : t.removeAttribute(i);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        o && typeof o != "function" && typeof o != "symbol" ? t.setAttribute(i, "") : t.removeAttribute(i);
        break;
      case "capture":
      case "download":
        o === !0 ? t.setAttribute(i, "") : o !== !1 && o != null && typeof o != "function" && typeof o != "symbol" ? t.setAttribute(i, o) : t.removeAttribute(i);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        o != null && typeof o != "function" && typeof o != "symbol" && !isNaN(o) && 1 <= o ? t.setAttribute(i, o) : t.removeAttribute(i);
        break;
      case "rowSpan":
      case "start":
        o == null || typeof o == "function" || typeof o == "symbol" || isNaN(o) ? t.removeAttribute(i) : t.setAttribute(i, o);
        break;
      case "popover":
        wt("beforetoggle", t), wt("toggle", t), Ms(t, "popover", o);
        break;
      case "xlinkActuate":
        En(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          o
        );
        break;
      case "xlinkArcrole":
        En(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          o
        );
        break;
      case "xlinkRole":
        En(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          o
        );
        break;
      case "xlinkShow":
        En(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          o
        );
        break;
      case "xlinkTitle":
        En(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          o
        );
        break;
      case "xlinkType":
        En(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          o
        );
        break;
      case "xmlBase":
        En(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          o
        );
        break;
      case "xmlLang":
        En(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          o
        );
        break;
      case "xmlSpace":
        En(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          o
        );
        break;
      case "is":
        Ms(t, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = A3.get(i) || i, Ms(t, i, o));
    }
  }
  function Uc(t, n, i, o, u, d) {
    switch (i) {
      case "style":
        am(t, o, d);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(s(61));
          if (i = o.__html, i != null) {
            if (u.children != null) throw Error(s(60));
            t.innerHTML = i;
          }
        }
        break;
      case "children":
        typeof o == "string" ? ii(t, o) : (typeof o == "number" || typeof o == "bigint") && ii(t, "" + o);
        break;
      case "onScroll":
        o != null && wt("scroll", t);
        break;
      case "onScrollEnd":
        o != null && wt("scrollend", t);
        break;
      case "onClick":
        o != null && (t.onclick = An);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Zh.hasOwnProperty(i))
          t: {
            if (i[0] === "o" && i[1] === "n" && (u = i.endsWith("Capture"), n = i.slice(2, u ? i.length - 7 : void 0), d = t[_e] || null, d = d != null ? d[i] : null, typeof d == "function" && t.removeEventListener(n, d, u), typeof o == "function")) {
              typeof d != "function" && d !== null && (i in t ? t[i] = null : t.hasAttribute(i) && t.removeAttribute(i)), t.addEventListener(n, o, u);
              break t;
            }
            i in t ? t[i] = o : o === !0 ? t.setAttribute(i, "") : Ms(t, i, o);
          }
    }
  }
  function ve(t, n, i) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        wt("error", t), wt("load", t);
        var o = !1, u = !1, d;
        for (d in i)
          if (i.hasOwnProperty(d)) {
            var x = i[d];
            if (x != null)
              switch (d) {
                case "src":
                  o = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(s(137, n));
                default:
                  Bt(t, n, d, x, i, null);
              }
          }
        u && Bt(t, n, "srcSet", i.srcSet, i, null), o && Bt(t, n, "src", i.src, i, null);
        return;
      case "input":
        wt("invalid", t);
        var C = d = x = u = null, O = null, H = null;
        for (o in i)
          if (i.hasOwnProperty(o)) {
            var K = i[o];
            if (K != null)
              switch (o) {
                case "name":
                  u = K;
                  break;
                case "type":
                  x = K;
                  break;
                case "checked":
                  O = K;
                  break;
                case "defaultChecked":
                  H = K;
                  break;
                case "value":
                  d = K;
                  break;
                case "defaultValue":
                  C = K;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (K != null)
                    throw Error(s(137, n));
                  break;
                default:
                  Bt(t, n, o, K, i, null);
              }
          }
        Ih(
          t,
          d,
          C,
          O,
          H,
          x,
          u,
          !1
        );
        return;
      case "select":
        wt("invalid", t), o = x = d = null;
        for (u in i)
          if (i.hasOwnProperty(u) && (C = i[u], C != null))
            switch (u) {
              case "value":
                d = C;
                break;
              case "defaultValue":
                x = C;
                break;
              case "multiple":
                o = C;
              default:
                Bt(t, n, u, C, i, null);
            }
        n = d, i = x, t.multiple = !!o, n != null ? ai(t, !!o, n, !1) : i != null && ai(t, !!o, i, !0);
        return;
      case "textarea":
        wt("invalid", t), d = u = o = null;
        for (x in i)
          if (i.hasOwnProperty(x) && (C = i[x], C != null))
            switch (x) {
              case "value":
                o = C;
                break;
              case "defaultValue":
                u = C;
                break;
              case "children":
                d = C;
                break;
              case "dangerouslySetInnerHTML":
                if (C != null) throw Error(s(91));
                break;
              default:
                Bt(t, n, x, C, i, null);
            }
        em(t, o, u, d);
        return;
      case "option":
        for (O in i)
          if (i.hasOwnProperty(O) && (o = i[O], o != null))
            switch (O) {
              case "selected":
                t.selected = o && typeof o != "function" && typeof o != "symbol";
                break;
              default:
                Bt(t, n, O, o, i, null);
            }
        return;
      case "dialog":
        wt("beforetoggle", t), wt("toggle", t), wt("cancel", t), wt("close", t);
        break;
      case "iframe":
      case "object":
        wt("load", t);
        break;
      case "video":
      case "audio":
        for (o = 0; o < ql.length; o++)
          wt(ql[o], t);
        break;
      case "image":
        wt("error", t), wt("load", t);
        break;
      case "details":
        wt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        wt("error", t), wt("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (H in i)
          if (i.hasOwnProperty(H) && (o = i[H], o != null))
            switch (H) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, n));
              default:
                Bt(t, n, H, o, i, null);
            }
        return;
      default:
        if (Wr(n)) {
          for (K in i)
            i.hasOwnProperty(K) && (o = i[K], o !== void 0 && Uc(
              t,
              n,
              K,
              o,
              i,
              void 0
            ));
          return;
        }
    }
    for (C in i)
      i.hasOwnProperty(C) && (o = i[C], o != null && Bt(t, n, C, o, i, null));
  }
  function Ix(t, n, i, o) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null, d = null, x = null, C = null, O = null, H = null, K = null;
        for (Y in i) {
          var J = i[Y];
          if (i.hasOwnProperty(Y) && J != null)
            switch (Y) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                O = J;
              default:
                o.hasOwnProperty(Y) || Bt(t, n, Y, null, o, J);
            }
        }
        for (var $ in o) {
          var Y = o[$];
          if (J = i[$], o.hasOwnProperty($) && (Y != null || J != null))
            switch ($) {
              case "type":
                d = Y;
                break;
              case "name":
                u = Y;
                break;
              case "checked":
                H = Y;
                break;
              case "defaultChecked":
                K = Y;
                break;
              case "value":
                x = Y;
                break;
              case "defaultValue":
                C = Y;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (Y != null)
                  throw Error(s(137, n));
                break;
              default:
                Y !== J && Bt(
                  t,
                  n,
                  $,
                  Y,
                  o,
                  J
                );
            }
        }
        Fr(
          t,
          x,
          C,
          O,
          H,
          K,
          d,
          u
        );
        return;
      case "select":
        Y = x = C = $ = null;
        for (d in i)
          if (O = i[d], i.hasOwnProperty(d) && O != null)
            switch (d) {
              case "value":
                break;
              case "multiple":
                Y = O;
              default:
                o.hasOwnProperty(d) || Bt(
                  t,
                  n,
                  d,
                  null,
                  o,
                  O
                );
            }
        for (u in o)
          if (d = o[u], O = i[u], o.hasOwnProperty(u) && (d != null || O != null))
            switch (u) {
              case "value":
                $ = d;
                break;
              case "defaultValue":
                C = d;
                break;
              case "multiple":
                x = d;
              default:
                d !== O && Bt(
                  t,
                  n,
                  u,
                  d,
                  o,
                  O
                );
            }
        n = C, i = x, o = Y, $ != null ? ai(t, !!i, $, !1) : !!o != !!i && (n != null ? ai(t, !!i, n, !0) : ai(t, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        Y = $ = null;
        for (C in i)
          if (u = i[C], i.hasOwnProperty(C) && u != null && !o.hasOwnProperty(C))
            switch (C) {
              case "value":
                break;
              case "children":
                break;
              default:
                Bt(t, n, C, null, o, u);
            }
        for (x in o)
          if (u = o[x], d = i[x], o.hasOwnProperty(x) && (u != null || d != null))
            switch (x) {
              case "value":
                $ = u;
                break;
              case "defaultValue":
                Y = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== d && Bt(t, n, x, u, o, d);
            }
        tm(t, $, Y);
        return;
      case "option":
        for (var ot in i)
          if ($ = i[ot], i.hasOwnProperty(ot) && $ != null && !o.hasOwnProperty(ot))
            switch (ot) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Bt(
                  t,
                  n,
                  ot,
                  null,
                  o,
                  $
                );
            }
        for (O in o)
          if ($ = o[O], Y = i[O], o.hasOwnProperty(O) && $ !== Y && ($ != null || Y != null))
            switch (O) {
              case "selected":
                t.selected = $ && typeof $ != "function" && typeof $ != "symbol";
                break;
              default:
                Bt(
                  t,
                  n,
                  O,
                  $,
                  o,
                  Y
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var mt in i)
          $ = i[mt], i.hasOwnProperty(mt) && $ != null && !o.hasOwnProperty(mt) && Bt(t, n, mt, null, o, $);
        for (H in o)
          if ($ = o[H], Y = i[H], o.hasOwnProperty(H) && $ !== Y && ($ != null || Y != null))
            switch (H) {
              case "children":
              case "dangerouslySetInnerHTML":
                if ($ != null)
                  throw Error(s(137, n));
                break;
              default:
                Bt(
                  t,
                  n,
                  H,
                  $,
                  o,
                  Y
                );
            }
        return;
      default:
        if (Wr(n)) {
          for (var Vt in i)
            $ = i[Vt], i.hasOwnProperty(Vt) && $ !== void 0 && !o.hasOwnProperty(Vt) && Uc(
              t,
              n,
              Vt,
              void 0,
              o,
              $
            );
          for (K in o)
            $ = o[K], Y = i[K], !o.hasOwnProperty(K) || $ === Y || $ === void 0 && Y === void 0 || Uc(
              t,
              n,
              K,
              $,
              o,
              Y
            );
          return;
        }
    }
    for (var U in i)
      $ = i[U], i.hasOwnProperty(U) && $ != null && !o.hasOwnProperty(U) && Bt(t, n, U, null, o, $);
    for (J in o)
      $ = o[J], Y = i[J], !o.hasOwnProperty(J) || $ === Y || $ == null && Y == null || Bt(t, n, J, $, o, Y);
  }
  function i0(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function tS() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, n = 0, i = performance.getEntriesByType("resource"), o = 0; o < i.length; o++) {
        var u = i[o], d = u.transferSize, x = u.initiatorType, C = u.duration;
        if (d && C && i0(x)) {
          for (x = 0, C = u.responseEnd, o += 1; o < i.length; o++) {
            var O = i[o], H = O.startTime;
            if (H > C) break;
            var K = O.transferSize, J = O.initiatorType;
            K && i0(J) && (O = O.responseEnd, x += K * (O < C ? 1 : (C - H) / (O - H)));
          }
          if (--o, n += 8 * (d + x) / (u.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return n / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var kc = null, Hc = null;
  function Ao(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function l0(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function s0(t, n) {
    if (t === 0)
      switch (n) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && n === "foreignObject" ? 0 : t;
  }
  function qc(t, n) {
    return t === "textarea" || t === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var $c = null;
  function eS() {
    var t = window.event;
    return t && t.type === "popstate" ? t === $c ? !1 : ($c = t, !0) : ($c = null, !1);
  }
  var o0 = typeof setTimeout == "function" ? setTimeout : void 0, nS = typeof clearTimeout == "function" ? clearTimeout : void 0, r0 = typeof Promise == "function" ? Promise : void 0, aS = typeof queueMicrotask == "function" ? queueMicrotask : typeof r0 < "u" ? function(t) {
    return r0.resolve(null).then(t).catch(iS);
  } : o0;
  function iS(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function fa(t) {
    return t === "head";
  }
  function u0(t, n) {
    var i = n, o = 0;
    do {
      var u = i.nextSibling;
      if (t.removeChild(i), u && u.nodeType === 8)
        if (i = u.data, i === "/$" || i === "/&") {
          if (o === 0) {
            t.removeChild(u), Li(n);
            return;
          }
          o--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          o++;
        else if (i === "html")
          Gl(t.ownerDocument.documentElement);
        else if (i === "head") {
          i = t.ownerDocument.head, Gl(i);
          for (var d = i.firstChild; d; ) {
            var x = d.nextSibling, C = d.nodeName;
            d[ol] || C === "SCRIPT" || C === "STYLE" || C === "LINK" && d.rel.toLowerCase() === "stylesheet" || i.removeChild(d), d = x;
          }
        } else
          i === "body" && Gl(t.ownerDocument.body);
      i = u;
    } while (i);
    Li(n);
  }
  function c0(t, n) {
    var i = t;
    t = 0;
    do {
      var o = i.nextSibling;
      if (i.nodeType === 1 ? n ? (i._stashedDisplay = i.style.display, i.style.display = "none") : (i.style.display = i._stashedDisplay || "", i.getAttribute("style") === "" && i.removeAttribute("style")) : i.nodeType === 3 && (n ? (i._stashedText = i.nodeValue, i.nodeValue = "") : i.nodeValue = i._stashedText || ""), o && o.nodeType === 8)
        if (i = o.data, i === "/$") {
          if (t === 0) break;
          t--;
        } else
          i !== "$" && i !== "$?" && i !== "$~" && i !== "$!" || t++;
      i = o;
    } while (i);
  }
  function Gc(t) {
    var n = t.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var i = n;
      switch (n = n.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Gc(i), Zr(i);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (i.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(i);
    }
  }
  function lS(t, n, i, o) {
    for (; t.nodeType === 1; ) {
      var u = i;
      if (t.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!o && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (o) {
        if (!t[ol])
          switch (n) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (d = t.getAttribute("rel"), d === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (d !== u.rel || t.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || t.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (d = t.getAttribute("src"), (d !== (u.src == null ? null : u.src) || t.getAttribute("type") !== (u.type == null ? null : u.type) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && d && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (n === "input" && t.type === "hidden") {
        var d = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && t.getAttribute("name") === d)
          return t;
      } else return t;
      if (t = nn(t.nextSibling), t === null) break;
    }
    return null;
  }
  function sS(t, n, i) {
    if (n === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !i || (t = nn(t.nextSibling), t === null)) return null;
    return t;
  }
  function f0(t, n) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = nn(t.nextSibling), t === null)) return null;
    return t;
  }
  function Yc(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Xc(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function oS(t, n) {
    var i = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = n;
    else if (t.data !== "$?" || i.readyState !== "loading")
      n();
    else {
      var o = function() {
        n(), i.removeEventListener("DOMContentLoaded", o);
      };
      i.addEventListener("DOMContentLoaded", o), t._reactRetry = o;
    }
  }
  function nn(t) {
    for (; t != null; t = t.nextSibling) {
      var n = t.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (n = t.data, n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&" || n === "F!" || n === "F")
          break;
        if (n === "/$" || n === "/&") return null;
      }
    }
    return t;
  }
  var Pc = null;
  function d0(t) {
    t = t.nextSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var i = t.data;
        if (i === "/$" || i === "/&") {
          if (n === 0)
            return nn(t.nextSibling);
          n--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function h0(t) {
    t = t.previousSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var i = t.data;
        if (i === "$" || i === "$!" || i === "$?" || i === "$~" || i === "&") {
          if (n === 0) return t;
          n--;
        } else i !== "/$" && i !== "/&" || n++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function m0(t, n, i) {
    switch (n = Ao(i), t) {
      case "html":
        if (t = n.documentElement, !t) throw Error(s(452));
        return t;
      case "head":
        if (t = n.head, !t) throw Error(s(453));
        return t;
      case "body":
        if (t = n.body, !t) throw Error(s(454));
        return t;
      default:
        throw Error(s(451));
    }
  }
  function Gl(t) {
    for (var n = t.attributes; n.length; )
      t.removeAttributeNode(n[0]);
    Zr(t);
  }
  var an = /* @__PURE__ */ new Map(), p0 = /* @__PURE__ */ new Set();
  function Mo(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var $n = P.d;
  P.d = {
    f: rS,
    r: uS,
    D: cS,
    C: fS,
    L: dS,
    m: hS,
    X: pS,
    S: mS,
    M: yS
  };
  function rS() {
    var t = $n.f(), n = vo();
    return t || n;
  }
  function uS(t) {
    var n = ti(t);
    n !== null && n.tag === 5 && n.type === "form" ? Np(n) : $n.r(t);
  }
  var Ni = typeof document > "u" ? null : document;
  function y0(t, n, i) {
    var o = Ni;
    if (o && typeof n == "string" && n) {
      var u = Qe(n);
      u = 'link[rel="' + t + '"][href="' + u + '"]', typeof i == "string" && (u += '[crossorigin="' + i + '"]'), p0.has(u) || (p0.add(u), t = { rel: t, crossOrigin: i, href: n }, o.querySelector(u) === null && (n = o.createElement("link"), ve(n, "link", t), fe(n), o.head.appendChild(n)));
    }
  }
  function cS(t) {
    $n.D(t), y0("dns-prefetch", t, null);
  }
  function fS(t, n) {
    $n.C(t, n), y0("preconnect", t, n);
  }
  function dS(t, n, i) {
    $n.L(t, n, i);
    var o = Ni;
    if (o && t && n) {
      var u = 'link[rel="preload"][as="' + Qe(n) + '"]';
      n === "image" && i && i.imageSrcSet ? (u += '[imagesrcset="' + Qe(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (u += '[imagesizes="' + Qe(
        i.imageSizes
      ) + '"]')) : u += '[href="' + Qe(t) + '"]';
      var d = u;
      switch (n) {
        case "style":
          d = Oi(t);
          break;
        case "script":
          d = zi(t);
      }
      an.has(d) || (t = v(
        {
          rel: "preload",
          href: n === "image" && i && i.imageSrcSet ? void 0 : t,
          as: n
        },
        i
      ), an.set(d, t), o.querySelector(u) !== null || n === "style" && o.querySelector(Yl(d)) || n === "script" && o.querySelector(Xl(d)) || (n = o.createElement("link"), ve(n, "link", t), fe(n), o.head.appendChild(n)));
    }
  }
  function hS(t, n) {
    $n.m(t, n);
    var i = Ni;
    if (i && t) {
      var o = n && typeof n.as == "string" ? n.as : "script", u = 'link[rel="modulepreload"][as="' + Qe(o) + '"][href="' + Qe(t) + '"]', d = u;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          d = zi(t);
      }
      if (!an.has(d) && (t = v({ rel: "modulepreload", href: t }, n), an.set(d, t), i.querySelector(u) === null)) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(Xl(d)))
              return;
        }
        o = i.createElement("link"), ve(o, "link", t), fe(o), i.head.appendChild(o);
      }
    }
  }
  function mS(t, n, i) {
    $n.S(t, n, i);
    var o = Ni;
    if (o && t) {
      var u = ei(o).hoistableStyles, d = Oi(t);
      n = n || "default";
      var x = u.get(d);
      if (!x) {
        var C = { loading: 0, preload: null };
        if (x = o.querySelector(
          Yl(d)
        ))
          C.loading = 5;
        else {
          t = v(
            { rel: "stylesheet", href: t, "data-precedence": n },
            i
          ), (i = an.get(d)) && Kc(t, i);
          var O = x = o.createElement("link");
          fe(O), ve(O, "link", t), O._p = new Promise(function(H, K) {
            O.onload = H, O.onerror = K;
          }), O.addEventListener("load", function() {
            C.loading |= 1;
          }), O.addEventListener("error", function() {
            C.loading |= 2;
          }), C.loading |= 4, jo(x, n, o);
        }
        x = {
          type: "stylesheet",
          instance: x,
          count: 1,
          state: C
        }, u.set(d, x);
      }
    }
  }
  function pS(t, n) {
    $n.X(t, n);
    var i = Ni;
    if (i && t) {
      var o = ei(i).hoistableScripts, u = zi(t), d = o.get(u);
      d || (d = i.querySelector(Xl(u)), d || (t = v({ src: t, async: !0 }, n), (n = an.get(u)) && Zc(t, n), d = i.createElement("script"), fe(d), ve(d, "link", t), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, o.set(u, d));
    }
  }
  function yS(t, n) {
    $n.M(t, n);
    var i = Ni;
    if (i && t) {
      var o = ei(i).hoistableScripts, u = zi(t), d = o.get(u);
      d || (d = i.querySelector(Xl(u)), d || (t = v({ src: t, async: !0, type: "module" }, n), (n = an.get(u)) && Zc(t, n), d = i.createElement("script"), fe(d), ve(d, "link", t), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, o.set(u, d));
    }
  }
  function g0(t, n, i, o) {
    var u = (u = ht.current) ? Mo(u) : null;
    if (!u) throw Error(s(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (n = Oi(i.href), i = ei(
          u
        ).hoistableStyles, o = i.get(n), o || (o = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          t = Oi(i.href);
          var d = ei(
            u
          ).hoistableStyles, x = d.get(t);
          if (x || (u = u.ownerDocument || u, x = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, d.set(t, x), (d = u.querySelector(
            Yl(t)
          )) && !d._p && (x.instance = d, x.state.loading = 5), an.has(t) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, an.set(t, i), d || gS(
            u,
            t,
            i,
            x.state
          ))), n && o === null)
            throw Error(s(528, ""));
          return x;
        }
        if (n && o !== null)
          throw Error(s(529, ""));
        return null;
      case "script":
        return n = i.async, i = i.src, typeof i == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = zi(i), i = ei(
          u
        ).hoistableScripts, o = i.get(n), o || (o = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(s(444, t));
    }
  }
  function Oi(t) {
    return 'href="' + Qe(t) + '"';
  }
  function Yl(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function v0(t) {
    return v({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function gS(t, n, i, o) {
    t.querySelector('link[rel="preload"][as="style"][' + n + "]") ? o.loading = 1 : (n = t.createElement("link"), o.preload = n, n.addEventListener("load", function() {
      return o.loading |= 1;
    }), n.addEventListener("error", function() {
      return o.loading |= 2;
    }), ve(n, "link", i), fe(n), t.head.appendChild(n));
  }
  function zi(t) {
    return '[src="' + Qe(t) + '"]';
  }
  function Xl(t) {
    return "script[async]" + t;
  }
  function b0(t, n, i) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var o = t.querySelector(
            'style[data-href~="' + Qe(i.href) + '"]'
          );
          if (o)
            return n.instance = o, fe(o), o;
          var u = v({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return o = (t.ownerDocument || t).createElement(
            "style"
          ), fe(o), ve(o, "style", u), jo(o, i.precedence, t), n.instance = o;
        case "stylesheet":
          u = Oi(i.href);
          var d = t.querySelector(
            Yl(u)
          );
          if (d)
            return n.state.loading |= 4, n.instance = d, fe(d), d;
          o = v0(i), (u = an.get(u)) && Kc(o, u), d = (t.ownerDocument || t).createElement("link"), fe(d);
          var x = d;
          return x._p = new Promise(function(C, O) {
            x.onload = C, x.onerror = O;
          }), ve(d, "link", o), n.state.loading |= 4, jo(d, i.precedence, t), n.instance = d;
        case "script":
          return d = zi(i.src), (u = t.querySelector(
            Xl(d)
          )) ? (n.instance = u, fe(u), u) : (o = i, (u = an.get(d)) && (o = v({}, i), Zc(o, u)), t = t.ownerDocument || t, u = t.createElement("script"), fe(u), ve(u, "link", o), t.head.appendChild(u), n.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (o = n.instance, n.state.loading |= 4, jo(o, i.precedence, t));
    return n.instance;
  }
  function jo(t, n, i) {
    for (var o = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = o.length ? o[o.length - 1] : null, d = u, x = 0; x < o.length; x++) {
      var C = o[x];
      if (C.dataset.precedence === n) d = C;
      else if (d !== u) break;
    }
    d ? d.parentNode.insertBefore(t, d.nextSibling) : (n = i.nodeType === 9 ? i.head : i, n.insertBefore(t, n.firstChild));
  }
  function Kc(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.title == null && (t.title = n.title);
  }
  function Zc(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.integrity == null && (t.integrity = n.integrity);
  }
  var _o = null;
  function x0(t, n, i) {
    if (_o === null) {
      var o = /* @__PURE__ */ new Map(), u = _o = /* @__PURE__ */ new Map();
      u.set(i, o);
    } else
      u = _o, o = u.get(i), o || (o = /* @__PURE__ */ new Map(), u.set(i, o));
    if (o.has(t)) return o;
    for (o.set(t, null), i = i.getElementsByTagName(t), u = 0; u < i.length; u++) {
      var d = i[u];
      if (!(d[ol] || d[me] || t === "link" && d.getAttribute("rel") === "stylesheet") && d.namespaceURI !== "http://www.w3.org/2000/svg") {
        var x = d.getAttribute(n) || "";
        x = t + x;
        var C = o.get(x);
        C ? C.push(d) : o.set(x, [d]);
      }
    }
    return o;
  }
  function S0(t, n, i) {
    t = t.ownerDocument || t, t.head.insertBefore(
      i,
      n === "title" ? t.querySelector("head > title") : null
    );
  }
  function vS(t, n, i) {
    if (i === 1 || n.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof n.precedence != "string" || typeof n.href != "string" || n.href === "")
          break;
        return !0;
      case "link":
        if (typeof n.rel != "string" || typeof n.href != "string" || n.href === "" || n.onLoad || n.onError)
          break;
        switch (n.rel) {
          case "stylesheet":
            return t = n.disabled, typeof n.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (n.async && typeof n.async != "function" && typeof n.async != "symbol" && !n.onLoad && !n.onError && n.src && typeof n.src == "string")
          return !0;
    }
    return !1;
  }
  function w0(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function bS(t, n, i, o) {
    if (i.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var u = Oi(o.href), d = n.querySelector(
          Yl(u)
        );
        if (d) {
          n = d._p, n !== null && typeof n == "object" && typeof n.then == "function" && (t.count++, t = Ro.bind(t), n.then(t, t)), i.state.loading |= 4, i.instance = d, fe(d);
          return;
        }
        d = n.ownerDocument || n, o = v0(o), (u = an.get(u)) && Kc(o, u), d = d.createElement("link"), fe(d);
        var x = d;
        x._p = new Promise(function(C, O) {
          x.onload = C, x.onerror = O;
        }), ve(d, "link", o), i.instance = d;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(i, n), (n = i.state.preload) && (i.state.loading & 3) === 0 && (t.count++, i = Ro.bind(t), n.addEventListener("load", i), n.addEventListener("error", i));
    }
  }
  var Qc = 0;
  function xS(t, n) {
    return t.stylesheets && t.count === 0 && No(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(i) {
      var o = setTimeout(function() {
        if (t.stylesheets && No(t, t.stylesheets), t.unsuspend) {
          var d = t.unsuspend;
          t.unsuspend = null, d();
        }
      }, 6e4 + n);
      0 < t.imgBytes && Qc === 0 && (Qc = 62500 * tS());
      var u = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && No(t, t.stylesheets), t.unsuspend)) {
            var d = t.unsuspend;
            t.unsuspend = null, d();
          }
        },
        (t.imgBytes > Qc ? 50 : 800) + n
      );
      return t.unsuspend = i, function() {
        t.unsuspend = null, clearTimeout(o), clearTimeout(u);
      };
    } : null;
  }
  function Ro() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) No(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Do = null;
  function No(t, n) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Do = /* @__PURE__ */ new Map(), n.forEach(SS, t), Do = null, Ro.call(t));
  }
  function SS(t, n) {
    if (!(n.state.loading & 4)) {
      var i = Do.get(t);
      if (i) var o = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), Do.set(t, i);
        for (var u = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), d = 0; d < u.length; d++) {
          var x = u[d];
          (x.nodeName === "LINK" || x.getAttribute("media") !== "not all") && (i.set(x.dataset.precedence, x), o = x);
        }
        o && i.set(null, o);
      }
      u = n.instance, x = u.getAttribute("data-precedence"), d = i.get(x) || o, d === o && i.set(null, u), i.set(x, u), this.count++, o = Ro.bind(this), u.addEventListener("load", o), u.addEventListener("error", o), d ? d.parentNode.insertBefore(u, d.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(u, t.firstChild)), n.state.loading |= 4;
    }
  }
  var Pl = {
    $$typeof: M,
    Provider: null,
    Consumer: null,
    _currentValue: tt,
    _currentValue2: tt,
    _threadCount: 0
  };
  function wS(t, n, i, o, u, d, x, C, O) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Yr(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Yr(0), this.hiddenUpdates = Yr(null), this.identifierPrefix = o, this.onUncaughtError = u, this.onCaughtError = d, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = O, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function T0(t, n, i, o, u, d, x, C, O, H, K, J) {
    return t = new wS(
      t,
      n,
      i,
      x,
      O,
      H,
      K,
      J,
      C
    ), n = 1, d === !0 && (n |= 24), d = He(3, null, null, n), t.current = d, d.stateNode = t, n = ju(), n.refCount++, t.pooledCache = n, n.refCount++, d.memoizedState = {
      element: o,
      isDehydrated: i,
      cache: n
    }, Nu(d), t;
  }
  function C0(t) {
    return t ? (t = fi, t) : fi;
  }
  function E0(t, n, i, o, u, d) {
    u = C0(u), o.context === null ? o.context = u : o.pendingContext = u, o = ta(n), o.payload = { element: i }, d = d === void 0 ? null : d, d !== null && (o.callback = d), i = ea(t, o, n), i !== null && (Le(i, t, n), Cl(i, t, n));
  }
  function A0(t, n) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var i = t.retryLane;
      t.retryLane = i !== 0 && i < n ? i : n;
    }
  }
  function Fc(t, n) {
    A0(t, n), (t = t.alternate) && A0(t, n);
  }
  function M0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = ja(t, 67108864);
      n !== null && Le(n, t, 67108864), Fc(t, 67108864);
    }
  }
  function j0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Xe();
      n = Xr(n);
      var i = ja(t, n);
      i !== null && Le(i, t, n), Fc(t, n);
    }
  }
  var Oo = !0;
  function TS(t, n, i, o) {
    var u = z.T;
    z.T = null;
    var d = P.p;
    try {
      P.p = 2, Jc(t, n, i, o);
    } finally {
      P.p = d, z.T = u;
    }
  }
  function CS(t, n, i, o) {
    var u = z.T;
    z.T = null;
    var d = P.p;
    try {
      P.p = 8, Jc(t, n, i, o);
    } finally {
      P.p = d, z.T = u;
    }
  }
  function Jc(t, n, i, o) {
    if (Oo) {
      var u = Wc(o);
      if (u === null)
        Vc(
          t,
          n,
          o,
          zo,
          i
        ), R0(t, o);
      else if (AS(
        u,
        t,
        n,
        i,
        o
      ))
        o.stopPropagation();
      else if (R0(t, o), n & 4 && -1 < ES.indexOf(t)) {
        for (; u !== null; ) {
          var d = ti(u);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (d = d.stateNode, d.current.memoizedState.isDehydrated) {
                  var x = Ta(d.pendingLanes);
                  if (x !== 0) {
                    var C = d;
                    for (C.pendingLanes |= 2, C.entangledLanes |= 2; x; ) {
                      var O = 1 << 31 - Ue(x);
                      C.entanglements[1] |= O, x &= ~O;
                    }
                    bn(d), (_t & 6) === 0 && (yo = Be() + 500, Hl(0));
                  }
                }
                break;
              case 31:
              case 13:
                C = ja(d, 2), C !== null && Le(C, d, 2), vo(), Fc(d, 2);
            }
          if (d = Wc(o), d === null && Vc(
            t,
            n,
            o,
            zo,
            i
          ), d === u) break;
          u = d;
        }
        u !== null && o.stopPropagation();
      } else
        Vc(
          t,
          n,
          o,
          null,
          i
        );
    }
  }
  function Wc(t) {
    return t = tu(t), Ic(t);
  }
  var zo = null;
  function Ic(t) {
    if (zo = null, t = Ia(t), t !== null) {
      var n = c(t);
      if (n === null) t = null;
      else {
        var i = n.tag;
        if (i === 13) {
          if (t = f(n), t !== null) return t;
          t = null;
        } else if (i === 31) {
          if (t = h(n), t !== null) return t;
          t = null;
        } else if (i === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          t = null;
        } else n !== t && (t = null);
      }
    }
    return zo = t, null;
  }
  function _0(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (c3()) {
          case Vh:
            return 2;
          case Uh:
            return 8;
          case ws:
          case f3:
            return 32;
          case kh:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var tf = !1, da = null, ha = null, ma = null, Kl = /* @__PURE__ */ new Map(), Zl = /* @__PURE__ */ new Map(), pa = [], ES = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function R0(t, n) {
    switch (t) {
      case "focusin":
      case "focusout":
        da = null;
        break;
      case "dragenter":
      case "dragleave":
        ha = null;
        break;
      case "mouseover":
      case "mouseout":
        ma = null;
        break;
      case "pointerover":
      case "pointerout":
        Kl.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Zl.delete(n.pointerId);
    }
  }
  function Ql(t, n, i, o, u, d) {
    return t === null || t.nativeEvent !== d ? (t = {
      blockedOn: n,
      domEventName: i,
      eventSystemFlags: o,
      nativeEvent: d,
      targetContainers: [u]
    }, n !== null && (n = ti(n), n !== null && M0(n)), t) : (t.eventSystemFlags |= o, n = t.targetContainers, u !== null && n.indexOf(u) === -1 && n.push(u), t);
  }
  function AS(t, n, i, o, u) {
    switch (n) {
      case "focusin":
        return da = Ql(
          da,
          t,
          n,
          i,
          o,
          u
        ), !0;
      case "dragenter":
        return ha = Ql(
          ha,
          t,
          n,
          i,
          o,
          u
        ), !0;
      case "mouseover":
        return ma = Ql(
          ma,
          t,
          n,
          i,
          o,
          u
        ), !0;
      case "pointerover":
        var d = u.pointerId;
        return Kl.set(
          d,
          Ql(
            Kl.get(d) || null,
            t,
            n,
            i,
            o,
            u
          )
        ), !0;
      case "gotpointercapture":
        return d = u.pointerId, Zl.set(
          d,
          Ql(
            Zl.get(d) || null,
            t,
            n,
            i,
            o,
            u
          )
        ), !0;
    }
    return !1;
  }
  function D0(t) {
    var n = Ia(t.target);
    if (n !== null) {
      var i = c(n);
      if (i !== null) {
        if (n = i.tag, n === 13) {
          if (n = f(i), n !== null) {
            t.blockedOn = n, Xh(t.priority, function() {
              j0(i);
            });
            return;
          }
        } else if (n === 31) {
          if (n = h(i), n !== null) {
            t.blockedOn = n, Xh(t.priority, function() {
              j0(i);
            });
            return;
          }
        } else if (n === 3 && i.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = i.tag === 3 ? i.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Lo(t) {
    if (t.blockedOn !== null) return !1;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var i = Wc(t.nativeEvent);
      if (i === null) {
        i = t.nativeEvent;
        var o = new i.constructor(
          i.type,
          i
        );
        Ir = o, i.target.dispatchEvent(o), Ir = null;
      } else
        return n = ti(i), n !== null && M0(n), t.blockedOn = i, !1;
      n.shift();
    }
    return !0;
  }
  function N0(t, n, i) {
    Lo(t) && i.delete(n);
  }
  function MS() {
    tf = !1, da !== null && Lo(da) && (da = null), ha !== null && Lo(ha) && (ha = null), ma !== null && Lo(ma) && (ma = null), Kl.forEach(N0), Zl.forEach(N0);
  }
  function Bo(t, n) {
    t.blockedOn === n && (t.blockedOn = null, tf || (tf = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      MS
    )));
  }
  var Vo = null;
  function O0(t) {
    Vo !== t && (Vo = t, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        Vo === t && (Vo = null);
        for (var n = 0; n < t.length; n += 3) {
          var i = t[n], o = t[n + 1], u = t[n + 2];
          if (typeof o != "function") {
            if (Ic(o || i) === null)
              continue;
            break;
          }
          var d = ti(i);
          d !== null && (t.splice(n, 3), n -= 3, Wu(
            d,
            {
              pending: !0,
              data: u,
              method: i.method,
              action: o
            },
            o,
            u
          ));
        }
      }
    ));
  }
  function Li(t) {
    function n(O) {
      return Bo(O, t);
    }
    da !== null && Bo(da, t), ha !== null && Bo(ha, t), ma !== null && Bo(ma, t), Kl.forEach(n), Zl.forEach(n);
    for (var i = 0; i < pa.length; i++) {
      var o = pa[i];
      o.blockedOn === t && (o.blockedOn = null);
    }
    for (; 0 < pa.length && (i = pa[0], i.blockedOn === null); )
      D0(i), i.blockedOn === null && pa.shift();
    if (i = (t.ownerDocument || t).$$reactFormReplay, i != null)
      for (o = 0; o < i.length; o += 3) {
        var u = i[o], d = i[o + 1], x = u[_e] || null;
        if (typeof d == "function")
          x || O0(i);
        else if (x) {
          var C = null;
          if (d && d.hasAttribute("formAction")) {
            if (u = d, x = d[_e] || null)
              C = x.formAction;
            else if (Ic(u) !== null) continue;
          } else C = x.action;
          typeof C == "function" ? i[o + 1] = C : (i.splice(o, 3), o -= 3), O0(i);
        }
      }
  }
  function z0() {
    function t(d) {
      d.canIntercept && d.info === "react-transition" && d.intercept({
        handler: function() {
          return new Promise(function(x) {
            return u = x;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function n() {
      u !== null && (u(), u = null), o || setTimeout(i, 20);
    }
    function i() {
      if (!o && !navigation.transition) {
        var d = navigation.currentEntry;
        d && d.url != null && navigation.navigate(d.url, {
          state: d.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var o = !1, u = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(i, 100), function() {
        o = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), u !== null && (u(), u = null);
      };
    }
  }
  function ef(t) {
    this._internalRoot = t;
  }
  Uo.prototype.render = ef.prototype.render = function(t) {
    var n = this._internalRoot;
    if (n === null) throw Error(s(409));
    var i = n.current, o = Xe();
    E0(i, o, t, n, null, null);
  }, Uo.prototype.unmount = ef.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var n = t.containerInfo;
      E0(t.current, 2, null, t, null, null), vo(), n[Wa] = null;
    }
  };
  function Uo(t) {
    this._internalRoot = t;
  }
  Uo.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var n = Yh();
      t = { blockedOn: null, target: t, priority: n };
      for (var i = 0; i < pa.length && n !== 0 && n < pa[i].priority; i++) ;
      pa.splice(i, 0, t), i === 0 && D0(t);
    }
  };
  var L0 = e.version;
  if (L0 !== "19.2.7")
    throw Error(
      s(
        527,
        L0,
        "19.2.7"
      )
    );
  P.findDOMNode = function(t) {
    var n = t._reactInternals;
    if (n === void 0)
      throw typeof t.render == "function" ? Error(s(188)) : (t = Object.keys(t).join(","), Error(s(268, t)));
    return t = m(n), t = t !== null ? g(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var jS = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: z,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ko = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ko.isDisabled && ko.supportsFiber)
      try {
        il = ko.inject(
          jS
        ), Ve = ko;
      } catch {
      }
  }
  return Jl.createRoot = function(t, n) {
    if (!r(t)) throw Error(s(299));
    var i = !1, o = "", u = $p, d = Gp, x = Yp;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (u = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (x = n.onRecoverableError)), n = T0(
      t,
      1,
      !1,
      null,
      null,
      i,
      o,
      null,
      u,
      d,
      x,
      z0
    ), t[Wa] = n.current, Bc(t), new ef(n);
  }, Jl.hydrateRoot = function(t, n, i) {
    if (!r(t)) throw Error(s(299));
    var o = !1, u = "", d = $p, x = Gp, C = Yp, O = null;
    return i != null && (i.unstable_strictMode === !0 && (o = !0), i.identifierPrefix !== void 0 && (u = i.identifierPrefix), i.onUncaughtError !== void 0 && (d = i.onUncaughtError), i.onCaughtError !== void 0 && (x = i.onCaughtError), i.onRecoverableError !== void 0 && (C = i.onRecoverableError), i.formState !== void 0 && (O = i.formState)), n = T0(
      t,
      1,
      !0,
      n,
      i ?? null,
      o,
      u,
      O,
      d,
      x,
      C,
      z0
    ), n.context = C0(null), i = n.current, o = Xe(), o = Xr(o), u = ta(o), u.callback = null, ea(i, u, o), i = o, n.current.lanes = i, sl(n, i), bn(n), t[Wa] = n.current, Bc(t), new Uo(n);
  }, Jl.version = "19.2.7", Jl;
}
var X0;
function HS() {
  if (X0) return lf.exports;
  X0 = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (e) {
        console.error(e);
      }
  }
  return a(), lf.exports = kS(), lf.exports;
}
var Bi = HS(), uf = { exports: {} }, cf = {};
var P0;
function qS() {
  if (P0) return cf;
  P0 = 1;
  var a = gs().__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  return cf.c = function(e) {
    return a.H.useMemoCache(e);
  }, cf;
}
var K0;
function $S() {
  return K0 || (K0 = 1, uf.exports = qS()), uf.exports;
}
var xt = $S(), ff = { exports: {} }, df = {};
var Z0;
function GS() {
  if (Z0) return df;
  Z0 = 1;
  var a = gs();
  function e(v, b) {
    return v === b && (v !== 0 || 1 / v === 1 / b) || v !== v && b !== b;
  }
  var l = typeof Object.is == "function" ? Object.is : e, s = a.useState, r = a.useEffect, c = a.useLayoutEffect, f = a.useDebugValue;
  function h(v, b) {
    var T = b(), S = s({ inst: { value: T, getSnapshot: b } }), w = S[0].inst, E = S[1];
    return c(
      function() {
        w.value = T, w.getSnapshot = b, p(w) && E({ inst: w });
      },
      [v, T, b]
    ), r(
      function() {
        return p(w) && E({ inst: w }), v(function() {
          p(w) && E({ inst: w });
        });
      },
      [v]
    ), f(T), T;
  }
  function p(v) {
    var b = v.getSnapshot;
    v = v.value;
    try {
      var T = b();
      return !l(v, T);
    } catch {
      return !0;
    }
  }
  function m(v, b) {
    return b();
  }
  var g = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? m : h;
  return df.useSyncExternalStore = a.useSyncExternalStore !== void 0 ? a.useSyncExternalStore : g, df;
}
var Q0;
function YS() {
  return Q0 || (Q0 = 1, ff.exports = GS()), ff.exports;
}
var XS = YS();
const PS = LS.useInsertionEffect, KS = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", ZS = KS ? A.useLayoutEffect : A.useEffect, QS = PS || ZS, nv = (a) => {
  const e = A.useRef([a, (...l) => e[0](...l)]).current;
  return QS(() => {
    e[0] = a;
  }), e[1];
};
function Nd(a, e) {
  a.indexOf(e) === -1 && a.push(e);
}
function dr(a, e) {
  const l = a.indexOf(e);
  l > -1 && a.splice(l, 1);
}
const Tn = (a, e, l) => l > e ? e : l < a ? a : l;
let Od = () => {
};
const ba = {}, av = (a) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(a), iv = (a) => typeof a == "object" && a !== null, lv = (a) => /^0[^.\s]+$/u.test(a);
// @__NO_SIDE_EFFECTS__
function sv(a) {
  let e;
  return () => (e === void 0 && (e = a()), e);
}
const sn = /* @__NO_SIDE_EFFECTS__ */ (a) => a, vs = (...a) => a.reduce((e, l) => (s) => l(e(s))), cs = /* @__NO_SIDE_EFFECTS__ */ (a, e, l) => {
  const s = e - a;
  return s ? (l - a) / s : 1;
};
class zd {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return Nd(this.subscriptions, e), () => dr(this.subscriptions, e);
  }
  notify(e, l, s) {
    const r = this.subscriptions.length;
    if (r)
      if (r === 1)
        this.subscriptions[0](e, l, s);
      else
        for (let c = 0; c < r; c++) {
          const f = this.subscriptions[c];
          f && f(e, l, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Pe = /* @__NO_SIDE_EFFECTS__ */ (a) => a * 1e3, ln = /* @__NO_SIDE_EFFECTS__ */ (a) => a / 1e3, ov = /* @__NO_SIDE_EFFECTS__ */ (a, e) => e ? a * (1e3 / e) : 0, rv = (a, e, l) => (((1 - 3 * l + 3 * e) * a + (3 * l - 6 * e)) * a + 3 * e) * a, FS = 1e-7, JS = 12;
function WS(a, e, l, s, r) {
  let c, f, h = 0;
  do
    f = e + (l - e) / 2, c = rv(f, s, r) - a, c > 0 ? l = f : e = f;
  while (Math.abs(c) > FS && ++h < JS);
  return f;
}
// @__NO_SIDE_EFFECTS__
function bs(a, e, l, s) {
  if (a === e && l === s)
    return sn;
  const r = (c) => WS(c, 0, 1, a, l);
  return (c) => c === 0 || c === 1 ? c : rv(r(c), e, s);
}
const uv = /* @__NO_SIDE_EFFECTS__ */ (a) => (e) => e <= 0.5 ? a(2 * e) / 2 : (2 - a(2 * (1 - e))) / 2, cv = /* @__NO_SIDE_EFFECTS__ */ (a) => (e) => 1 - a(1 - e), fv = /* @__PURE__ */ bs(0.33, 1.53, 0.69, 0.99), Ld = /* @__PURE__ */ cv(fv), dv = /* @__PURE__ */ uv(Ld), hv = (a) => a >= 1 ? 1 : (a *= 2) < 1 ? 0.5 * Ld(a) : 0.5 * (2 - Math.pow(2, -10 * (a - 1))), Bd = (a) => 1 - Math.sin(Math.acos(a)), mv = /* @__PURE__ */ cv(Bd), pv = /* @__PURE__ */ uv(Bd), IS = /* @__PURE__ */ bs(0.42, 0, 1, 1), t4 = /* @__PURE__ */ bs(0, 0, 0.58, 1), yv = /* @__PURE__ */ bs(0.42, 0, 0.58, 1), e4 = /* @__NO_SIDE_EFFECTS__ */ (a) => Array.isArray(a) && typeof a[0] != "number", gv = /* @__NO_SIDE_EFFECTS__ */ (a) => Array.isArray(a) && typeof a[0] == "number", n4 = {
  linear: sn,
  easeIn: IS,
  easeInOut: yv,
  easeOut: t4,
  circIn: Bd,
  circInOut: pv,
  circOut: mv,
  backIn: Ld,
  backInOut: dv,
  backOut: fv,
  anticipate: hv
}, a4 = (a) => typeof a == "string", F0 = (a) => {
  if (/* @__PURE__ */ gv(a)) {
    Od(a.length === 4);
    const [e, l, s, r] = a;
    return /* @__PURE__ */ bs(e, l, s, r);
  } else if (a4(a))
    return n4[a];
  return a;
}, Vd = A.createContext({}), Ud = A.createContext({ strict: !1 }), kd = A.createContext({
  transformPagePoint: (a) => a,
  isStatic: !1,
  reducedMotion: "never"
}), jr = /* @__PURE__ */ A.createContext({}), Ho = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function i4(a) {
  let e = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), s = !1, r = !1;
  const c = /* @__PURE__ */ new WeakSet();
  let f = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function h(m) {
    c.has(m) && (p.schedule(m), a()), m(f);
  }
  const p = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (m, g = !1, v = !1) => {
      const T = v && s ? e : l;
      return g && c.add(m), T.add(m), m;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (m) => {
      l.delete(m), c.delete(m);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (m) => {
      if (f = m, s) {
        r = !0;
        return;
      }
      s = !0;
      const g = e;
      e = l, l = g, e.forEach(h), e.clear(), s = !1, r && (r = !1, p.process(m));
    }
  };
  return p;
}
const l4 = 40;
function vv(a, e) {
  let l = !1, s = !0;
  const r = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, c = () => l = !0, f = Ho.reduce((M, D) => (M[D] = i4(c), M), {}), { setup: h, read: p, resolveKeyframes: m, preUpdate: g, update: v, preRender: b, render: T, postRender: S } = f, w = () => {
    const M = ba.useManualTiming, D = M ? r.timestamp : performance.now();
    l = !1, M || (r.delta = s ? 1e3 / 60 : Math.max(Math.min(D - r.timestamp, l4), 1)), r.timestamp = D, r.isProcessing = !0, h.process(r), p.process(r), m.process(r), g.process(r), v.process(r), b.process(r), T.process(r), S.process(r), r.isProcessing = !1, l && e && (s = !1, a(w));
  }, E = () => {
    l = !0, s = !0, r.isProcessing || a(w);
  };
  return { schedule: Ho.reduce((M, D) => {
    const L = f[D];
    return M[D] = (V, R = !1, q = !1) => (l || E(), L.schedule(V, R, q)), M;
  }, {}), cancel: (M) => {
    for (let D = 0; D < Ho.length; D++)
      f[Ho[D]].cancel(M);
  }, state: r, steps: f };
}
const { schedule: qt, cancel: xa, state: be, steps: hf } = /* @__PURE__ */ vv(typeof requestAnimationFrame < "u" ? requestAnimationFrame : sn, !0);
let nr;
function s4() {
  nr = void 0;
}
const Ee = {
  now: () => (nr === void 0 && Ee.set(be.isProcessing || ba.useManualTiming ? be.timestamp : performance.now()), nr),
  set: (a) => {
    nr = a, queueMicrotask(s4);
  }
}, bv = (a) => (e) => typeof e == "string" && e.startsWith(a), xv = /* @__PURE__ */ bv("--"), o4 = /* @__PURE__ */ bv("var(--"), Hd = (a) => o4(a) ? r4.test(a.split("/*")[0].trim()) : !1, r4 = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function J0(a) {
  return typeof a != "string" ? !1 : a.split("/*")[0].includes("var(--");
}
const Qi = {
  test: (a) => typeof a == "number",
  parse: parseFloat,
  transform: (a) => a
}, fs = {
  ...Qi,
  transform: (a) => Tn(0, 1, a)
}, qo = {
  ...Qi,
  default: 1
}, ls = (a) => Math.round(a * 1e5) / 1e5, qd = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function u4(a) {
  return a == null;
}
const c4 = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, $d = (a, e) => (l) => !!(typeof l == "string" && c4.test(l) && l.startsWith(a) || e && !u4(l) && Object.prototype.hasOwnProperty.call(l, e)), Sv = (a, e, l) => (s) => {
  if (typeof s != "string")
    return s;
  const [r, c, f, h] = s.match(qd);
  return {
    [a]: parseFloat(r),
    [e]: parseFloat(c),
    [l]: parseFloat(f),
    alpha: h !== void 0 ? parseFloat(h) : 1
  };
}, f4 = (a) => Tn(0, 255, a), mf = {
  ...Qi,
  transform: (a) => Math.round(f4(a))
}, Ka = {
  test: /* @__PURE__ */ $d("rgb", "red"),
  parse: /* @__PURE__ */ Sv("red", "green", "blue"),
  transform: ({ red: a, green: e, blue: l, alpha: s = 1 }) => "rgba(" + mf.transform(a) + ", " + mf.transform(e) + ", " + mf.transform(l) + ", " + ls(fs.transform(s)) + ")"
};
function d4(a) {
  let e = "", l = "", s = "", r = "";
  return a.length > 5 ? (e = a.substring(1, 3), l = a.substring(3, 5), s = a.substring(5, 7), r = a.substring(7, 9)) : (e = a.substring(1, 2), l = a.substring(2, 3), s = a.substring(3, 4), r = a.substring(4, 5), e += e, l += l, s += s, r += r), {
    red: parseInt(e, 16),
    green: parseInt(l, 16),
    blue: parseInt(s, 16),
    alpha: r ? parseInt(r, 16) / 255 : 1
  };
}
const Zf = {
  test: /* @__PURE__ */ $d("#"),
  parse: d4,
  transform: Ka.transform
}, xs = /* @__NO_SIDE_EFFECTS__ */ (a) => ({
  test: (e) => typeof e == "string" && e.endsWith(a) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${a}`
}), Gn = /* @__PURE__ */ xs("deg"), wn = /* @__PURE__ */ xs("%"), rt = /* @__PURE__ */ xs("px"), h4 = /* @__PURE__ */ xs("vh"), m4 = /* @__PURE__ */ xs("vw"), W0 = {
  ...wn,
  parse: (a) => wn.parse(a) / 100,
  transform: (a) => wn.transform(a * 100)
}, Ui = {
  test: /* @__PURE__ */ $d("hsl", "hue"),
  parse: /* @__PURE__ */ Sv("hue", "saturation", "lightness"),
  transform: ({ hue: a, saturation: e, lightness: l, alpha: s = 1 }) => "hsla(" + Math.round(a) + ", " + wn.transform(ls(e)) + ", " + wn.transform(ls(l)) + ", " + ls(fs.transform(s)) + ")"
}, se = {
  test: (a) => Ka.test(a) || Zf.test(a) || Ui.test(a),
  parse: (a) => Ka.test(a) ? Ka.parse(a) : Ui.test(a) ? Ui.parse(a) : Zf.parse(a),
  transform: (a) => typeof a == "string" ? a : a.hasOwnProperty("red") ? Ka.transform(a) : Ui.transform(a),
  getAnimatableNone: (a) => {
    const e = se.parse(a);
    return e.alpha = 0, se.transform(e);
  }
}, p4 = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function y4(a) {
  return isNaN(a) && typeof a == "string" && (a.match(qd)?.length || 0) + (a.match(p4)?.length || 0) > 0;
}
const wv = "number", Tv = "color", g4 = "var", v4 = "var(", I0 = "${}", b4 = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Pi(a) {
  const e = a.toString(), l = [], s = {
    color: [],
    number: [],
    var: []
  }, r = [];
  let c = 0;
  const h = e.replace(b4, (p) => (se.test(p) ? (s.color.push(c), r.push(Tv), l.push(se.parse(p))) : p.startsWith(v4) ? (s.var.push(c), r.push(g4), l.push(p)) : (s.number.push(c), r.push(wv), l.push(parseFloat(p))), ++c, I0)).split(I0);
  return { values: l, split: h, indexes: s, types: r };
}
function x4(a) {
  return Pi(a).values;
}
function Cv({ split: a, types: e }) {
  const l = a.length;
  return (s) => {
    let r = "";
    for (let c = 0; c < l; c++)
      if (r += a[c], s[c] !== void 0) {
        const f = e[c];
        f === wv ? r += ls(s[c]) : f === Tv ? r += se.transform(s[c]) : r += s[c];
      }
    return r;
  };
}
function S4(a) {
  return Cv(Pi(a));
}
const w4 = (a) => typeof a == "number" ? 0 : se.test(a) ? se.getAnimatableNone(a) : a, T4 = (a, e) => typeof a == "number" ? e?.trim().endsWith("/") ? a : 0 : w4(a);
function C4(a) {
  const e = Pi(a);
  return Cv(e)(e.values.map((s, r) => T4(s, e.split[r])));
}
const pn = {
  test: y4,
  parse: x4,
  createTransformer: S4,
  getAnimatableNone: C4
};
function pf(a, e, l) {
  return l < 0 && (l += 1), l > 1 && (l -= 1), l < 1 / 6 ? a + (e - a) * 6 * l : l < 1 / 2 ? e : l < 2 / 3 ? a + (e - a) * (2 / 3 - l) * 6 : a;
}
function E4({ hue: a, saturation: e, lightness: l, alpha: s }) {
  a /= 360, e /= 100, l /= 100;
  let r = 0, c = 0, f = 0;
  if (!e)
    r = c = f = l;
  else {
    const h = l < 0.5 ? l * (1 + e) : l + e - l * e, p = 2 * l - h;
    r = pf(p, h, a + 1 / 3), c = pf(p, h, a), f = pf(p, h, a - 1 / 3);
  }
  return {
    red: Math.round(r * 255),
    green: Math.round(c * 255),
    blue: Math.round(f * 255),
    alpha: s
  };
}
function hr(a, e) {
  return (l) => l > 0 ? e : a;
}
const Ht = (a, e, l) => a + (e - a) * l, yf = (a, e, l) => {
  const s = a * a, r = l * (e * e - s) + s;
  return r < 0 ? 0 : Math.sqrt(r);
}, A4 = [Zf, Ka, Ui], M4 = (a) => A4.find((e) => e.test(a));
function ty(a) {
  const e = M4(a);
  if (!e)
    return !1;
  let l = e.parse(a);
  return e === Ui && (l = E4(l)), l;
}
const ey = (a, e) => {
  const l = ty(a), s = ty(e);
  if (!l || !s)
    return hr(a, e);
  const r = { ...l };
  return (c) => (r.red = yf(l.red, s.red, c), r.green = yf(l.green, s.green, c), r.blue = yf(l.blue, s.blue, c), r.alpha = Ht(l.alpha, s.alpha, c), Ka.transform(r));
}, Qf = /* @__PURE__ */ new Set(["none", "hidden"]);
function j4(a, e) {
  return Qf.has(a) ? (l) => l <= 0 ? a : e : (l) => l >= 1 ? e : a;
}
function _4(a, e) {
  return (l) => Ht(a, e, l);
}
function Gd(a) {
  return typeof a == "number" ? _4 : typeof a == "string" ? Hd(a) ? hr : se.test(a) ? ey : N4 : Array.isArray(a) ? Ev : typeof a == "object" ? se.test(a) ? ey : R4 : hr;
}
function Ev(a, e) {
  const l = [...a], s = l.length, r = a.map((c, f) => Gd(c)(c, e[f]));
  return (c) => {
    for (let f = 0; f < s; f++)
      l[f] = r[f](c);
    return l;
  };
}
function R4(a, e) {
  const l = { ...a, ...e }, s = {};
  for (const r in l)
    a[r] !== void 0 && e[r] !== void 0 && (s[r] = Gd(a[r])(a[r], e[r]));
  return (r) => {
    for (const c in s)
      l[c] = s[c](r);
    return l;
  };
}
function D4(a, e) {
  const l = [], s = { color: 0, var: 0, number: 0 };
  for (let r = 0; r < e.values.length; r++) {
    const c = e.types[r], f = a.indexes[c][s[c]], h = a.values[f] ?? 0;
    l[r] = h, s[c]++;
  }
  return l;
}
const N4 = (a, e) => {
  const l = pn.createTransformer(e), s = Pi(a), r = Pi(e);
  return s.indexes.var.length === r.indexes.var.length && s.indexes.color.length === r.indexes.color.length && s.indexes.number.length >= r.indexes.number.length ? Qf.has(a) && !r.values.length || Qf.has(e) && !s.values.length ? j4(a, e) : vs(Ev(D4(s, r), r.values), l) : hr(a, e);
};
function Av(a, e, l) {
  return typeof a == "number" && typeof e == "number" && typeof l == "number" ? Ht(a, e, l) : Gd(a)(a, e);
}
const O4 = (a) => {
  const e = ({ timestamp: l }) => a(l);
  return {
    start: (l = !0) => qt.update(e, l),
    stop: () => xa(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => be.isProcessing ? be.timestamp : Ee.now()
  };
}, Mv = (a, e, l = 10) => {
  let s = "";
  const r = Math.max(Math.round(e / l), 2);
  for (let c = 0; c < r; c++)
    s += Math.round(a(c / (r - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, mr = 2e4;
function Yd(a) {
  let e = 0;
  const l = 50;
  let s = a.next(e);
  for (; !s.done && e < mr; )
    e += l, s = a.next(e);
  return e >= mr ? 1 / 0 : e;
}
function z4(a, e = 100, l) {
  const s = l({ ...a, keyframes: [0, e] }), r = Math.min(Yd(s), mr);
  return {
    type: "keyframes",
    ease: (c) => s.next(r * c).value / e,
    duration: /* @__PURE__ */ ln(r)
  };
}
const Ft = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
};
function Ff(a, e) {
  return a * Math.sqrt(1 - e * e);
}
const L4 = 12;
function B4(a, e, l) {
  let s = l;
  for (let r = 1; r < L4; r++)
    s = s - a(s) / e(s);
  return s;
}
const gf = 1e-3;
function V4({ duration: a = Ft.duration, bounce: e = Ft.bounce, velocity: l = Ft.velocity, mass: s = Ft.mass }) {
  let r, c, f = 1 - e;
  f = Tn(Ft.minDamping, Ft.maxDamping, f), a = Tn(Ft.minDuration, Ft.maxDuration, /* @__PURE__ */ ln(a)), f < 1 ? (r = (m) => {
    const g = m * f, v = g * a, b = g - l, T = Ff(m, f), S = Math.exp(-v);
    return gf - b / T * S;
  }, c = (m) => {
    const v = m * f * a, b = v * l + l, T = Math.pow(f, 2) * Math.pow(m, 2) * a, S = Math.exp(-v), w = Ff(Math.pow(m, 2), f);
    return (-r(m) + gf > 0 ? -1 : 1) * ((b - T) * S) / w;
  }) : (r = (m) => {
    const g = Math.exp(-m * a), v = (m - l) * a + 1;
    return -gf + g * v;
  }, c = (m) => {
    const g = Math.exp(-m * a), v = (l - m) * (a * a);
    return g * v;
  });
  const h = 5 / a, p = B4(r, c, h);
  if (a = /* @__PURE__ */ Pe(a), isNaN(p))
    return {
      stiffness: Ft.stiffness,
      damping: Ft.damping,
      duration: a
    };
  {
    const m = Math.pow(p, 2) * s;
    return {
      stiffness: m,
      damping: f * 2 * Math.sqrt(s * m),
      duration: a
    };
  }
}
const U4 = ["duration", "bounce"], k4 = ["stiffness", "damping", "mass"];
function ny(a, e) {
  return e.some((l) => a[l] !== void 0);
}
function H4(a) {
  let e = {
    velocity: Ft.velocity,
    stiffness: Ft.stiffness,
    damping: Ft.damping,
    mass: Ft.mass,
    isResolvedFromDuration: !1,
    ...a
  };
  if (!ny(a, k4) && ny(a, U4))
    if (e.velocity = 0, a.visualDuration) {
      const l = a.visualDuration, s = 2 * Math.PI / (l * 1.2), r = s * s, c = 2 * Tn(0.05, 1, 1 - (a.bounce || 0)) * Math.sqrt(r);
      e = {
        ...e,
        mass: Ft.mass,
        stiffness: r,
        damping: c
      };
    } else {
      const l = V4({ ...a, velocity: 0 });
      e = {
        ...e,
        ...l,
        mass: Ft.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function pr(a = Ft.visualDuration, e = Ft.bounce) {
  const l = typeof a != "object" ? {
    visualDuration: a,
    keyframes: [0, 1],
    bounce: e
  } : a;
  let { restSpeed: s, restDelta: r } = l;
  const c = l.keyframes[0], f = l.keyframes[l.keyframes.length - 1], h = { done: !1, value: c }, { stiffness: p, damping: m, mass: g, duration: v, velocity: b, isResolvedFromDuration: T } = H4({
    ...l,
    velocity: -/* @__PURE__ */ ln(l.velocity || 0)
  }), S = b || 0, w = m / (2 * Math.sqrt(p * g)), E = f - c, _ = /* @__PURE__ */ ln(Math.sqrt(p / g)), j = Math.abs(E) < 5;
  s || (s = j ? Ft.restSpeed.granular : Ft.restSpeed.default), r || (r = j ? Ft.restDelta.granular : Ft.restDelta.default);
  let M, D, L, V, R, q;
  if (w < 1)
    L = Ff(_, w), V = (S + w * _ * E) / L, M = (Z) => {
      const et = Math.exp(-w * _ * Z);
      return f - et * (V * Math.sin(L * Z) + E * Math.cos(L * Z));
    }, R = w * _ * V + E * L, q = w * _ * E - V * L, D = (Z) => Math.exp(-w * _ * Z) * (R * Math.sin(L * Z) + q * Math.cos(L * Z));
  else if (w === 1) {
    M = (et) => f - Math.exp(-_ * et) * (E + (S + _ * E) * et);
    const Z = S + _ * E;
    D = (et) => Math.exp(-_ * et) * (_ * Z * et - S);
  } else {
    const Z = _ * Math.sqrt(w * w - 1);
    M = (nt) => {
      const st = Math.exp(-w * _ * nt), z = Math.min(Z * nt, 300);
      return f - st * ((S + w * _ * E) * Math.sinh(z) + Z * E * Math.cosh(z)) / Z;
    };
    const et = (S + w * _ * E) / Z, F = w * _ * et - E * Z, W = w * _ * E - et * Z;
    D = (nt) => {
      const st = Math.exp(-w * _ * nt), z = Math.min(Z * nt, 300);
      return st * (F * Math.sinh(z) + W * Math.cosh(z));
    };
  }
  const X = {
    calculatedDuration: T && v || null,
    velocity: (Z) => /* @__PURE__ */ Pe(D(Z)),
    next: (Z) => {
      if (!T && w < 1) {
        const F = Math.exp(-w * _ * Z), W = Math.sin(L * Z), nt = Math.cos(L * Z), st = f - F * (V * W + E * nt), z = /* @__PURE__ */ Pe(F * (R * W + q * nt));
        return h.done = Math.abs(z) <= s && Math.abs(f - st) <= r, h.value = h.done ? f : st, h;
      }
      const et = M(Z);
      if (T)
        h.done = Z >= v;
      else {
        const F = /* @__PURE__ */ Pe(D(Z));
        h.done = Math.abs(F) <= s && Math.abs(f - et) <= r;
      }
      return h.value = h.done ? f : et, h;
    },
    toString: () => {
      const Z = Math.min(Yd(X), mr), et = Mv((F) => X.next(Z * F).value, Z, 30);
      return Z + "ms " + et;
    },
    toTransition: () => {
    }
  };
  return X;
}
pr.applyToOptions = (a) => {
  const e = z4(a, 100, pr);
  return a.ease = e.ease, a.duration = /* @__PURE__ */ Pe(e.duration), a.type = "keyframes", a;
};
const q4 = 5;
function jv(a, e, l) {
  const s = Math.max(e - q4, 0);
  return /* @__PURE__ */ ov(l - a(s), e - s);
}
function Jf({ keyframes: a, velocity: e = 0, power: l = 0.8, timeConstant: s = 325, bounceDamping: r = 10, bounceStiffness: c = 500, modifyTarget: f, min: h, max: p, restDelta: m = 0.5, restSpeed: g }) {
  const v = a[0], b = {
    done: !1,
    value: v
  }, T = (q) => h !== void 0 && q < h || p !== void 0 && q > p, S = (q) => h === void 0 ? p : p === void 0 || Math.abs(h - q) < Math.abs(p - q) ? h : p;
  let w = l * e;
  const E = v + w, _ = f === void 0 ? E : f(E);
  _ !== E && (w = _ - v);
  const j = (q) => -w * Math.exp(-q / s), M = (q) => _ + j(q), D = (q) => {
    const X = j(q), Z = M(q);
    b.done = Math.abs(X) <= m, b.value = b.done ? _ : Z;
  };
  let L, V;
  const R = (q) => {
    T(b.value) && (L = q, V = pr({
      keyframes: [b.value, S(b.value)],
      velocity: jv(M, q, b.value),
      // TODO: This should be passing * 1000
      damping: r,
      stiffness: c,
      restDelta: m,
      restSpeed: g
    }));
  };
  return R(0), {
    calculatedDuration: null,
    next: (q) => {
      let X = !1;
      return !V && L === void 0 && (X = !0, D(q), R(q)), L !== void 0 && q >= L ? V.next(q - L) : (!X && D(q), b);
    }
  };
}
function $4(a, e, l) {
  const s = [], r = l || ba.mix || Av, c = a.length - 1;
  for (let f = 0; f < c; f++) {
    let h = r(a[f], a[f + 1]);
    if (e) {
      const p = Array.isArray(e) ? e[f] || sn : e;
      h = vs(p, h);
    }
    s.push(h);
  }
  return s;
}
function G4(a, e, { clamp: l = !0, ease: s, mixer: r } = {}) {
  const c = a.length;
  if (Od(c === e.length), c === 1)
    return () => e[0];
  if (c === 2 && e[0] === e[1])
    return () => e[1];
  const f = a[0] === a[1];
  a[0] > a[c - 1] && (a = [...a].reverse(), e = [...e].reverse());
  const h = $4(e, s, r), p = h.length, m = (g) => {
    if (f && g < a[0])
      return e[0];
    let v = 0;
    if (p > 1)
      for (; v < a.length - 2 && !(g < a[v + 1]); v++)
        ;
    const b = /* @__PURE__ */ cs(a[v], a[v + 1], g);
    return h[v](b);
  };
  return l ? (g) => m(Tn(a[0], a[c - 1], g)) : m;
}
function Y4(a, e) {
  const l = a[a.length - 1];
  for (let s = 1; s <= e; s++) {
    const r = /* @__PURE__ */ cs(0, e, s);
    a.push(Ht(l, 1, r));
  }
}
function X4(a) {
  const e = [0];
  return Y4(e, a.length - 1), e;
}
function P4(a, e) {
  return a.map((l) => l * e);
}
function K4(a, e) {
  return a.map(() => e || yv).splice(0, a.length - 1);
}
function ss({ duration: a = 300, keyframes: e, times: l, ease: s = "easeInOut" }) {
  const r = /* @__PURE__ */ e4(s) ? s.map(F0) : F0(s), c = {
    done: !1,
    value: e[0]
  }, f = P4(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    l && l.length === e.length ? l : X4(e),
    a
  ), h = G4(f, e, {
    ease: Array.isArray(r) ? r : K4(e, r)
  });
  return {
    calculatedDuration: a,
    next: (p) => (c.value = h(p), c.done = p >= a, c)
  };
}
const Z4 = (a) => a !== null;
function _r(a, { repeat: e, repeatType: l = "loop" }, s, r = 1) {
  const c = a.filter(Z4), h = r < 0 || e && l !== "loop" && e % 2 === 1 ? 0 : c.length - 1;
  return !h || s === void 0 ? c[h] : s;
}
const Q4 = {
  decay: Jf,
  inertia: Jf,
  tween: ss,
  keyframes: ss,
  spring: pr
};
function _v(a) {
  typeof a.type == "string" && (a.type = Q4[a.type]);
}
class Xd {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((e) => {
      this.resolve = e;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(e, l) {
    return this.finished.then(e, l);
  }
}
const F4 = (a) => a / 100;
class yr extends Xd {
  constructor(e) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: l } = this.options;
      l && l.updatedAt !== Ee.now() && this.tick(Ee.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: e } = this;
    _v(e);
    const { type: l = ss, repeat: s = 0, repeatDelay: r = 0, repeatType: c, velocity: f = 0 } = e;
    let { keyframes: h } = e;
    const p = l || ss;
    p !== ss && typeof h[0] != "number" && (this.mixKeyframes = vs(F4, Av(h[0], h[1])), h = [0, 100]);
    const m = p({ ...e, keyframes: h });
    c === "mirror" && (this.mirroredGenerator = p({
      ...e,
      keyframes: [...h].reverse(),
      velocity: -f
    })), m.calculatedDuration === null && (m.calculatedDuration = Yd(m));
    const { calculatedDuration: g } = m;
    this.calculatedDuration = g, this.resolvedDuration = g + r, this.totalDuration = this.resolvedDuration * (s + 1) - r, this.generator = m;
  }
  updateTime(e) {
    const l = Math.round(e - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = l;
  }
  tick(e, l = !1) {
    const { generator: s, totalDuration: r, mixKeyframes: c, mirroredGenerator: f, resolvedDuration: h, calculatedDuration: p } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: m = 0, keyframes: g, repeat: v, repeatType: b, repeatDelay: T, type: S, onUpdate: w, finalKeyframe: E } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - r / this.speed, this.startTime)), l ? this.currentTime = e : this.updateTime(e);
    const _ = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1), j = this.playbackSpeed >= 0 ? _ < 0 : _ > r;
    this.currentTime = Math.max(_, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = r);
    let M = this.currentTime, D = s;
    if (v) {
      const q = Math.min(this.currentTime, r) / h;
      let X = Math.floor(q), Z = q % 1;
      !Z && q >= 1 && (Z = 1), Z === 1 && X--, X = Math.min(X, v + 1), !!(X % 2) && (b === "reverse" ? (Z = 1 - Z, T && (Z -= T / h)) : b === "mirror" && (D = f)), M = Tn(0, 1, Z) * h;
    }
    let L;
    j ? (this.delayState.value = g[0], L = this.delayState) : L = D.next(M), c && !j && (L.value = c(L.value));
    let { done: V } = L;
    !j && p !== null && (V = this.playbackSpeed >= 0 ? this.currentTime >= r : this.currentTime <= 0);
    const R = this.holdTime === null && (this.state === "finished" || this.state === "running" && V);
    return R && S !== Jf && (L.value = _r(g, this.options, E, this.speed)), w && w(L.value), R && this.finish(), L;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(e, l) {
    return this.finished.then(e, l);
  }
  get duration() {
    return /* @__PURE__ */ ln(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ ln(e);
  }
  get time() {
    return /* @__PURE__ */ ln(this.currentTime);
  }
  set time(e) {
    e = /* @__PURE__ */ Pe(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = e, this.tick(e));
  }
  /**
   * Returns the generator's velocity at the current time in units/second.
   * Uses the analytical derivative when available (springs), avoiding
   * the MotionValue's frame-dependent velocity estimation.
   */
  getGeneratorVelocity() {
    const e = this.currentTime;
    if (e <= 0)
      return this.options.velocity || 0;
    if (this.generator.velocity)
      return this.generator.velocity(e);
    const l = this.generator.next(e).value;
    return jv((s) => this.generator.next(s).value, e, l);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    const l = this.playbackSpeed !== e;
    l && this.driver && this.updateTime(Ee.now()), this.playbackSpeed = e, l && this.driver && (this.time = /* @__PURE__ */ ln(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: e = O4, startTime: l } = this.options;
    this.driver || (this.driver = e((r) => this.tick(r))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = l ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Ee.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
  }
  cancel() {
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(e) {
    return this.startTime = 0, this.tick(e, !0);
  }
  attachTimeline(e) {
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), e.observe(this);
  }
}
function J4(a) {
  for (let e = 1; e < a.length; e++)
    a[e] ?? (a[e] = a[e - 1]);
}
const Za = (a) => a * 180 / Math.PI, Wf = (a) => {
  const e = Za(Math.atan2(a[1], a[0]));
  return If(e);
}, W4 = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (a) => (Math.abs(a[0]) + Math.abs(a[3])) / 2,
  rotate: Wf,
  rotateZ: Wf,
  skewX: (a) => Za(Math.atan(a[1])),
  skewY: (a) => Za(Math.atan(a[2])),
  skew: (a) => (Math.abs(a[1]) + Math.abs(a[2])) / 2
}, If = (a) => (a = a % 360, a < 0 && (a += 360), a), ay = Wf, iy = (a) => Math.sqrt(a[0] * a[0] + a[1] * a[1]), ly = (a) => Math.sqrt(a[4] * a[4] + a[5] * a[5]), I4 = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: iy,
  scaleY: ly,
  scale: (a) => (iy(a) + ly(a)) / 2,
  rotateX: (a) => If(Za(Math.atan2(a[6], a[5]))),
  rotateY: (a) => If(Za(Math.atan2(-a[2], a[0]))),
  rotateZ: ay,
  rotate: ay,
  skewX: (a) => Za(Math.atan(a[4])),
  skewY: (a) => Za(Math.atan(a[1])),
  skew: (a) => (Math.abs(a[1]) + Math.abs(a[4])) / 2
};
function td(a) {
  return a.includes("scale") ? 1 : 0;
}
function ed(a, e) {
  if (!a || a === "none")
    return td(e);
  const l = a.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, r;
  if (l)
    s = I4, r = l;
  else {
    const h = a.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = W4, r = h;
  }
  if (!r)
    return td(e);
  const c = s[e], f = r[1].split(",").map(e5);
  return typeof c == "function" ? c(f) : f[c];
}
const t5 = (a, e) => {
  const { transform: l = "none" } = getComputedStyle(a);
  return ed(l, e);
};
function e5(a) {
  return parseFloat(a.trim());
}
const Fi = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], Ji = /* @__PURE__ */ new Set([...Fi, "pathRotation"]), sy = (a) => a === Qi || a === rt, n5 = /* @__PURE__ */ new Set(["x", "y", "z"]), a5 = Fi.filter((a) => !n5.has(a));
function i5(a) {
  const e = [];
  return a5.forEach((l) => {
    const s = a.getValue(l);
    s !== void 0 && (e.push([l, s.get()]), s.set(l.startsWith("scale") ? 1 : 0));
  }), e;
}
const va = {
  // Dimensions
  width: ({ x: a }, { paddingLeft: e = "0", paddingRight: l = "0", boxSizing: s }) => {
    const r = a.max - a.min;
    return s === "border-box" ? r : r - parseFloat(e) - parseFloat(l);
  },
  height: ({ y: a }, { paddingTop: e = "0", paddingBottom: l = "0", boxSizing: s }) => {
    const r = a.max - a.min;
    return s === "border-box" ? r : r - parseFloat(e) - parseFloat(l);
  },
  top: (a, { top: e }) => parseFloat(e),
  left: (a, { left: e }) => parseFloat(e),
  bottom: ({ y: a }, { top: e }) => parseFloat(e) + (a.max - a.min),
  right: ({ x: a }, { left: e }) => parseFloat(e) + (a.max - a.min),
  // Transform
  x: (a, { transform: e }) => ed(e, "x"),
  y: (a, { transform: e }) => ed(e, "y")
};
va.translateX = va.x;
va.translateY = va.y;
const Fa = /* @__PURE__ */ new Set();
let nd = !1, ad = !1, id = !1;
function Rv() {
  if (ad) {
    const a = Array.from(Fa).filter((s) => s.needsMeasurement), e = new Set(a.map((s) => s.element)), l = /* @__PURE__ */ new Map();
    e.forEach((s) => {
      const r = i5(s);
      r.length && (l.set(s, r), s.render());
    }), a.forEach((s) => s.measureInitialState()), e.forEach((s) => {
      s.render();
      const r = l.get(s);
      r && r.forEach(([c, f]) => {
        s.getValue(c)?.set(f);
      });
    }), a.forEach((s) => s.measureEndState()), a.forEach((s) => {
      s.suspendedScrollY !== void 0 && window.scrollTo(0, s.suspendedScrollY);
    });
  }
  ad = !1, nd = !1, Fa.forEach((a) => a.complete(id)), Fa.clear();
}
function Dv() {
  Fa.forEach((a) => {
    a.readKeyframes(), a.needsMeasurement && (ad = !0);
  });
}
function l5() {
  id = !0, Dv(), Rv(), id = !1;
}
class Pd {
  constructor(e, l, s, r, c, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = l, this.name = s, this.motionValue = r, this.element = c, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Fa.add(this), nd || (nd = !0, qt.read(Dv), qt.resolveKeyframes(Rv))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, name: l, element: s, motionValue: r } = this;
    if (e[0] === null) {
      const c = r?.get(), f = e[e.length - 1];
      if (c !== void 0)
        e[0] = c;
      else if (s && l) {
        const h = s.readValue(l, f);
        h != null && (e[0] = h);
      }
      e[0] === void 0 && (e[0] = f), r && c === void 0 && r.set(e[0]);
    }
    J4(e);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(e = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), Fa.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Fa.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const s5 = (a) => a.startsWith("--");
function Nv(a, e, l) {
  s5(e) ? a.style.setProperty(e, l) : a.style[e] = l;
}
const o5 = {};
function Ov(a, e) {
  const l = /* @__PURE__ */ sv(a);
  return () => o5[e] ?? l();
}
const r5 = /* @__PURE__ */ Ov(() => window.ScrollTimeline !== void 0, "scrollTimeline"), zv = /* @__PURE__ */ Ov(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), es = ([a, e, l, s]) => `cubic-bezier(${a}, ${e}, ${l}, ${s})`, oy = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ es([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ es([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ es([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ es([0.33, 1.53, 0.69, 0.99])
};
function Lv(a, e) {
  if (a)
    return typeof a == "function" ? zv() ? Mv(a, e) : "ease-out" : /* @__PURE__ */ gv(a) ? es(a) : Array.isArray(a) ? a.map((l) => Lv(l, e) || oy.easeOut) : oy[a];
}
function u5(a, e, l, { delay: s = 0, duration: r = 300, repeat: c = 0, repeatType: f = "loop", ease: h = "easeOut", times: p } = {}, m = void 0) {
  const g = {
    [e]: l
  };
  p && (g.offset = p);
  const v = Lv(h, r);
  Array.isArray(v) && (g.easing = v);
  const b = {
    delay: s,
    duration: r,
    easing: Array.isArray(v) ? "linear" : v,
    fill: "both",
    iterations: c + 1,
    direction: f === "reverse" ? "alternate" : "normal"
  };
  return m && (b.pseudoElement = m), a.animate(g, b);
}
function Bv(a) {
  return typeof a == "function" && "applyToOptions" in a;
}
function c5({ type: a, ...e }) {
  return Bv(a) && zv() ? a.applyToOptions(e) : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
}
class Vv extends Xd {
  constructor(e) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e)
      return;
    const { element: l, name: s, keyframes: r, pseudoElement: c, allowFlatten: f = !1, finalKeyframe: h, onComplete: p } = e;
    this.isPseudoElement = !!c, this.allowFlatten = f, this.options = e, Od(typeof e.type != "string");
    const m = c5(e);
    this.animation = u5(l, s, r, m, c), m.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !c) {
        const g = _r(r, this.options, h, this.speed);
        this.updateMotionValue && this.updateMotionValue(g), Nv(l, s, g), this.animation.cancel();
      }
      p?.(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: e } = this;
    e === "idle" || e === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    const e = this.options?.element;
    !this.isPseudoElement && e?.isConnected && this.animation.commitStyles?.();
  }
  get duration() {
    const e = this.animation.effect?.getComputedTiming?.().duration || 0;
    return /* @__PURE__ */ ln(Number(e));
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ ln(e);
  }
  get time() {
    return /* @__PURE__ */ ln(Number(this.animation.currentTime) || 0);
  }
  set time(e) {
    const l = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Pe(e), l && this.animation.pause();
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(e) {
    e < 0 && (this.finishedTime = null), this.animation.playbackRate = e;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(e) {
    this.manualStartTime = this.animation.startTime = e;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: e, rangeStart: l, rangeEnd: s, observe: r }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && r5() ? (this.animation.timeline = e, l && (this.animation.rangeStart = l), s && (this.animation.rangeEnd = s), sn) : r(this);
  }
}
const Uv = {
  anticipate: hv,
  backInOut: dv,
  circInOut: pv
};
function f5(a) {
  return a in Uv;
}
function d5(a) {
  typeof a.ease == "string" && f5(a.ease) && (a.ease = Uv[a.ease]);
}
const vf = 10;
class h5 extends Vv {
  constructor(e) {
    d5(e), _v(e), super(e), e.startTime !== void 0 && e.autoplay !== !1 && (this.startTime = e.startTime), this.options = e;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(e) {
    const { motionValue: l, onUpdate: s, onComplete: r, element: c, ...f } = this.options;
    if (!l)
      return;
    if (e !== void 0) {
      l.set(e);
      return;
    }
    const h = new yr({
      ...f,
      autoplay: !1
    }), p = Math.max(vf, Ee.now() - this.startTime), m = Tn(0, vf, p - vf), g = h.sample(p).value, { name: v } = this.options;
    c && v && Nv(c, v, g), l.setWithVelocity(h.sample(Math.max(0, p - m)).value, g, m), h.stop();
  }
}
const ry = (a, e) => e === "zIndex" ? !1 : !!(typeof a == "number" || Array.isArray(a) || typeof a == "string" && // It's animatable if we have a string
(pn.test(a) || a === "0") && // And it contains numbers and/or colors
!a.startsWith("url("));
function m5(a) {
  const e = a[0];
  if (a.length === 1)
    return !0;
  for (let l = 0; l < a.length; l++)
    if (a[l] !== e)
      return !0;
}
function p5(a, e, l, s) {
  const r = a[0];
  if (r === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const c = a[a.length - 1], f = ry(r, e), h = ry(c, e);
  return !f || !h ? !1 : m5(a) || (l === "spring" || Bv(l)) && s;
}
function ld(a) {
  a.duration = 0, a.type = "keyframes";
}
const kv = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), y5 = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function g5(a) {
  for (let e = 0; e < a.length; e++)
    if (typeof a[e] == "string" && y5.test(a[e]))
      return !0;
  return !1;
}
const v5 = /* @__PURE__ */ new Set([
  "color",
  "backgroundColor",
  "outlineColor",
  "fill",
  "stroke",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor"
]), b5 = /* @__PURE__ */ sv(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function x5(a) {
  const { motionValue: e, name: l, repeatDelay: s, repeatType: r, damping: c, type: f, keyframes: h } = a;
  if (!(e?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: m, transformTemplate: g } = e.owner.getProps();
  return b5() && l && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (kv.has(l) || v5.has(l) && g5(h)) && (l !== "transform" || !g) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !m && !s && r !== "mirror" && c !== 0 && f !== "inertia";
}
const S5 = 40;
class w5 extends Xd {
  constructor({ autoplay: e = !0, delay: l = 0, type: s = "keyframes", repeat: r = 0, repeatDelay: c = 0, repeatType: f = "loop", keyframes: h, name: p, motionValue: m, element: g, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Ee.now();
    const b = {
      autoplay: e,
      delay: l,
      type: s,
      repeat: r,
      repeatDelay: c,
      repeatType: f,
      name: p,
      motionValue: m,
      element: g,
      ...v
    }, T = g?.KeyframeResolver || Pd;
    this.keyframeResolver = new T(h, (S, w, E) => this.onKeyframesResolved(S, w, b, !E), p, m, g), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(e, l, s, r) {
    this.keyframeResolver = void 0;
    const { name: c, type: f, velocity: h, delay: p, isHandoff: m, onUpdate: g } = s;
    this.resolvedAt = Ee.now();
    let v = !0;
    p5(e, c, f, h) || (v = !1, (ba.instantAnimations || !p) && g?.(_r(e, s, l)), e[0] = e[e.length - 1], ld(s), s.repeat = 0);
    const T = {
      startTime: r ? this.resolvedAt ? this.resolvedAt - this.createdAt > S5 ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: l,
      ...s,
      keyframes: e
    }, S = v && !m && x5(T), w = T.motionValue?.owner?.current;
    let E;
    if (S)
      try {
        E = new h5({
          ...T,
          element: w
        });
      } catch {
        E = new yr(T);
      }
    else
      E = new yr(T);
    E.finished.then(() => {
      this.notifyFinished();
    }).catch(sn), this.pendingTimeline && (this.stopTimeline = E.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = E;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(e, l) {
    return this.finished.finally(e).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), l5()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(e) {
    this.animation.time = e;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(e) {
    this.animation.speed = e;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(e) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(e) : this.pendingTimeline = e, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
  }
}
function Hv(a, e, l, s = 0, r = 1) {
  const c = Array.from(a).sort((m, g) => m.sortNodePosition(g)).indexOf(e), f = a.size, h = (f - 1) * s;
  return typeof l == "function" ? l(c, f) : r === 1 ? c * s : h - c * s;
}
const uy = 30, T5 = (a) => !isNaN(parseFloat(a));
class C5 {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(e, l = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const r = Ee.now();
      if (this.updatedAt !== r && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const c of this.dependents)
          c.dirty();
    }, this.hasAnimated = !1, this.setCurrent(e), this.owner = l.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = Ee.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = T5(this.current));
  }
  setPrevFrameValue(e = this.current) {
    this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(e) {
    return this.on("change", e);
  }
  on(e, l) {
    this.events[e] || (this.events[e] = new zd());
    const s = this.events[e].add(l);
    return e === "change" ? () => {
      s(), qt.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : s;
  }
  clearListeners() {
    for (const e in this.events)
      this.events[e].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(e, l) {
    this.passiveEffect = e, this.stopPassiveEffect = l;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(e) {
    this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e);
  }
  setWithVelocity(e, l, s) {
    this.set(l), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - s;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(e, l = !0) {
    this.updateAndNotify(e), this.prev = e, this.prevUpdatedAt = this.prevFrameValue = void 0, l && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(e) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(e);
  }
  removeDependent(e) {
    this.dependents && this.dependents.delete(e);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const e = Ee.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > uy)
      return 0;
    const l = Math.min(this.updatedAt - this.prevUpdatedAt, uy);
    return /* @__PURE__ */ ov(parseFloat(this.current) - parseFloat(this.prevFrameValue), l);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(e) {
    return this.stop(), new Promise((l) => {
      this.hasAnimated = !0, this.animation = e(l), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function Ki(a, e) {
  return new C5(a, e);
}
function qv(a, e) {
  if (a?.inherit && e) {
    const { inherit: l, ...s } = a;
    return { ...e, ...s };
  }
  return a;
}
function Kd(a, e) {
  const l = a?.[e] ?? a?.default ?? a;
  return l !== a ? qv(l, a) : l;
}
const E5 = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, A5 = (a) => ({
  type: "spring",
  stiffness: 550,
  damping: a === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), M5 = {
  type: "keyframes",
  duration: 0.8
}, j5 = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, _5 = (a, { keyframes: e }) => e.length > 2 ? M5 : Ji.has(a) ? a.startsWith("scale") ? A5(e[1]) : E5 : j5, R5 = /* @__PURE__ */ new Set([
  "when",
  "delay",
  "delayChildren",
  "staggerChildren",
  "staggerDirection",
  "repeat",
  "repeatType",
  "repeatDelay",
  "from",
  "elapsed"
]);
function D5(a) {
  for (const e in a)
    if (!R5.has(e))
      return !0;
  return !1;
}
const Zd = (a, e, l, s = {}, r, c) => (f) => {
  const h = Kd(s, a) || {}, p = h.delay || s.delay || 0;
  let { elapsed: m = 0 } = s;
  m = m - /* @__PURE__ */ Pe(p);
  const g = {
    keyframes: Array.isArray(l) ? l : [null, l],
    ease: "easeOut",
    velocity: e.getVelocity(),
    ...h,
    delay: -m,
    onUpdate: (b) => {
      e.set(b), h.onUpdate && h.onUpdate(b);
    },
    onComplete: () => {
      f(), h.onComplete && h.onComplete();
    },
    name: a,
    motionValue: e,
    element: c ? void 0 : r
  };
  D5(h) || Object.assign(g, _5(a, g)), g.duration && (g.duration = /* @__PURE__ */ Pe(g.duration)), g.repeatDelay && (g.repeatDelay = /* @__PURE__ */ Pe(g.repeatDelay)), g.from !== void 0 && (g.keyframes[0] = g.from);
  let v = !1;
  if ((g.type === !1 || g.duration === 0 && !g.repeatDelay) && (ld(g), g.delay === 0 && (v = !0)), (ba.instantAnimations || ba.skipAnimations || r?.shouldSkipAnimations || h.skipAnimations) && (v = !0, ld(g), g.delay = 0), g.allowFlatten = !h.type && !h.ease, v && !c && e.get() !== void 0) {
    const b = _r(g.keyframes, h);
    if (b !== void 0) {
      qt.update(() => {
        g.onUpdate(b), g.onComplete();
      });
      return;
    }
  }
  return h.isSync ? new yr(g) : new w5(g);
}, N5 = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function O5(a) {
  const e = N5.exec(a);
  if (!e)
    return [,];
  const [, l, s, r] = e;
  return [`--${l ?? s}`, r];
}
function $v(a, e, l = 1) {
  const [s, r] = O5(a);
  if (!s)
    return;
  const c = window.getComputedStyle(e).getPropertyValue(s);
  if (c) {
    const f = c.trim();
    return av(f) ? parseFloat(f) : f;
  }
  return Hd(r) ? $v(r, e, l + 1) : r;
}
function cy(a) {
  const e = [{}, {}];
  return a?.values.forEach((l, s) => {
    e[0][s] = l.get(), e[1][s] = l.getVelocity();
  }), e;
}
function Qd(a, e, l, s) {
  if (typeof e == "function") {
    const [r, c] = cy(s);
    e = e(l !== void 0 ? l : a.custom, r, c);
  }
  if (typeof e == "string" && (e = a.variants && a.variants[e]), typeof e == "function") {
    const [r, c] = cy(s);
    e = e(l !== void 0 ? l : a.custom, r, c);
  }
  return e;
}
function Ja(a, e, l) {
  const s = a.getProps();
  return Qd(s, e, l !== void 0 ? l : s.custom, a);
}
const Gv = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Fi
]), sd = (a) => Array.isArray(a);
function z5(a, e, l) {
  a.hasValue(e) ? a.getValue(e).set(l) : a.addValue(e, Ki(l));
}
function L5(a) {
  return sd(a) ? a[a.length - 1] || 0 : a;
}
function B5(a, e) {
  const l = Ja(a, e);
  let { transitionEnd: s = {}, transition: r = {}, ...c } = l || {};
  c = { ...c, ...s };
  for (const f in c) {
    const h = L5(c[f]);
    z5(a, f, h);
  }
}
const xe = (a) => !!(a && a.getVelocity);
function V5(a) {
  return !!(xe(a) && a.add);
}
function od(a, e) {
  const l = a.getValue("willChange");
  if (V5(l))
    return l.add(e);
  if (!l && ba.WillChange) {
    const s = new ba.WillChange("auto");
    a.addValue("willChange", s), s.add(e);
  }
}
function Fd(a) {
  return a.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
const U5 = "framerAppearId", Yv = "data-" + Fd(U5);
function Xv(a) {
  return a.props[Yv];
}
function k5({ protectedKeys: a, needsAnimating: e }, l) {
  const s = a.hasOwnProperty(l) && e[l] !== !0;
  return e[l] = !1, s;
}
function Pv(a, e, { delay: l = 0, transitionOverride: s, type: r } = {}) {
  let { transition: c, transitionEnd: f, ...h } = e;
  const p = a.getDefaultTransition();
  c = c ? qv(c, p) : p;
  const m = c?.reduceMotion, g = c?.skipAnimations;
  s && (c = s);
  const v = [], b = r && a.animationState && a.animationState.getState()[r], T = c?.path;
  T && T.animateVisualElement(a, h, c, l, v);
  for (const S in h) {
    const w = a.getValue(S, a.latestValues[S] ?? null), E = h[S];
    if (E === void 0 || b && k5(b, S))
      continue;
    const _ = {
      delay: l,
      ...Kd(c || {}, S)
    };
    g && (_.skipAnimations = !0);
    const j = w.get();
    if (j !== void 0 && !w.isAnimating() && !Array.isArray(E) && E === j && !_.velocity) {
      qt.update(() => w.set(E));
      continue;
    }
    let M = !1;
    if (window.MotionHandoffAnimation) {
      const V = Xv(a);
      if (V) {
        const R = window.MotionHandoffAnimation(V, S, qt);
        R !== null && (_.startTime = R, M = !0);
      }
    }
    od(a, S);
    const D = m ?? a.shouldReduceMotion;
    w.start(Zd(S, w, E, D && Gv.has(S) ? { type: !1 } : _, a, M));
    const L = w.animation;
    L && v.push(L);
  }
  if (f) {
    const S = () => qt.update(() => {
      f && B5(a, f);
    });
    v.length ? Promise.all(v).then(S) : S();
  }
  return v;
}
function rd(a, e, l = {}) {
  const s = Ja(a, e, l.type === "exit" ? a.presenceContext?.custom : void 0);
  let { transition: r = a.getDefaultTransition() || {} } = s || {};
  l.transitionOverride && (r = l.transitionOverride);
  const c = s ? () => Promise.all(Pv(a, s, l)) : () => Promise.resolve(), f = a.variantChildren && a.variantChildren.size ? (p = 0) => {
    const { delayChildren: m = 0, staggerChildren: g, staggerDirection: v } = r;
    return H5(a, e, p, m, g, v, l);
  } : () => Promise.resolve(), { when: h } = r;
  if (h) {
    const [p, m] = h === "beforeChildren" ? [c, f] : [f, c];
    return p().then(() => m());
  } else
    return Promise.all([c(), f(l.delay)]);
}
function H5(a, e, l = 0, s = 0, r = 0, c = 1, f) {
  const h = [];
  for (const p of a.variantChildren)
    p.notify("AnimationStart", e), h.push(rd(p, e, {
      ...f,
      delay: l + (typeof s == "function" ? 0 : s) + Hv(a.variantChildren, p, s, r, c)
    }).then(() => p.notify("AnimationComplete", e)));
  return Promise.all(h);
}
function q5(a, e, l = {}) {
  a.notify("AnimationStart", e);
  let s;
  if (Array.isArray(e)) {
    const r = e.map((c) => rd(a, c, l));
    s = Promise.all(r);
  } else if (typeof e == "string")
    s = rd(a, e, l);
  else {
    const r = typeof e == "function" ? Ja(a, e, l.custom) : e;
    s = Promise.all(Pv(a, r, l));
  }
  return s.then(() => {
    a.notify("AnimationComplete", e);
  });
}
const $5 = {
  test: (a) => a === "auto",
  parse: (a) => a
}, Kv = (a) => (e) => e.test(a), Zv = [Qi, rt, wn, Gn, m4, h4, $5], fy = (a) => Zv.find(Kv(a));
function G5(a) {
  return typeof a == "number" ? a === 0 : a !== null ? a === "none" || a === "0" || lv(a) : !0;
}
const Y5 = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function X5(a) {
  const [e, l] = a.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return a;
  const [s] = l.match(qd) || [];
  if (!s)
    return a;
  const r = l.replace(s, "");
  let c = Y5.has(e) ? 1 : 0;
  return s !== l && (c *= 100), e + "(" + c + r + ")";
}
const P5 = /\b([a-z-]*)\(.*?\)/gu, ud = {
  ...pn,
  getAnimatableNone: (a) => {
    const e = a.match(P5);
    return e ? e.map(X5).join(" ") : a;
  }
}, cd = {
  ...pn,
  getAnimatableNone: (a) => {
    const e = pn.parse(a);
    return pn.createTransformer(a)(e.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, dy = {
  ...Qi,
  transform: Math.round
}, K5 = {
  rotate: Gn,
  /**
   * Internal channel for `transition.path` orientToPath. Composed onto
   * `rotate` at the transform-build sites so the user's `rotate` is
   * never read or overwritten. Not part of `transformPropOrder`.
   */
  pathRotation: Gn,
  rotateX: Gn,
  rotateY: Gn,
  rotateZ: Gn,
  scale: qo,
  scaleX: qo,
  scaleY: qo,
  scaleZ: qo,
  skew: Gn,
  skewX: Gn,
  skewY: Gn,
  distance: rt,
  translateX: rt,
  translateY: rt,
  translateZ: rt,
  x: rt,
  y: rt,
  z: rt,
  perspective: rt,
  transformPerspective: rt,
  opacity: fs,
  originX: W0,
  originY: W0,
  originZ: rt
}, gr = {
  // Border props
  borderWidth: rt,
  borderTopWidth: rt,
  borderRightWidth: rt,
  borderBottomWidth: rt,
  borderLeftWidth: rt,
  borderRadius: rt,
  borderTopLeftRadius: rt,
  borderTopRightRadius: rt,
  borderBottomRightRadius: rt,
  borderBottomLeftRadius: rt,
  // Positioning props
  width: rt,
  maxWidth: rt,
  height: rt,
  maxHeight: rt,
  top: rt,
  right: rt,
  bottom: rt,
  left: rt,
  inset: rt,
  insetBlock: rt,
  insetBlockStart: rt,
  insetBlockEnd: rt,
  insetInline: rt,
  insetInlineStart: rt,
  insetInlineEnd: rt,
  // Spacing props
  padding: rt,
  paddingTop: rt,
  paddingRight: rt,
  paddingBottom: rt,
  paddingLeft: rt,
  paddingBlock: rt,
  paddingBlockStart: rt,
  paddingBlockEnd: rt,
  paddingInline: rt,
  paddingInlineStart: rt,
  paddingInlineEnd: rt,
  margin: rt,
  marginTop: rt,
  marginRight: rt,
  marginBottom: rt,
  marginLeft: rt,
  marginBlock: rt,
  marginBlockStart: rt,
  marginBlockEnd: rt,
  marginInline: rt,
  marginInlineStart: rt,
  marginInlineEnd: rt,
  // Typography
  fontSize: rt,
  // Misc
  backgroundPositionX: rt,
  backgroundPositionY: rt,
  ...K5,
  zIndex: dy,
  // SVG
  fillOpacity: fs,
  strokeOpacity: fs,
  numOctaves: dy
}, Z5 = {
  ...gr,
  // Color props
  color: se,
  backgroundColor: se,
  outlineColor: se,
  fill: se,
  stroke: se,
  // Border props
  borderColor: se,
  borderTopColor: se,
  borderRightColor: se,
  borderBottomColor: se,
  borderLeftColor: se,
  filter: ud,
  WebkitFilter: ud,
  mask: cd,
  WebkitMask: cd
}, Qv = (a) => Z5[a], Q5 = /* @__PURE__ */ new Set([ud, cd]);
function Fv(a, e) {
  let l = Qv(a);
  return Q5.has(l) || (l = pn), l.getAnimatableNone ? l.getAnimatableNone(e) : void 0;
}
const F5 = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function J5(a, e, l) {
  let s = 0, r;
  for (; s < a.length && !r; ) {
    const c = a[s];
    typeof c == "string" && !F5.has(c) && Pi(c).values.length && (r = a[s]), s++;
  }
  if (r && l)
    for (const c of e)
      a[c] = Fv(l, r);
}
class W5 extends Pd {
  constructor(e, l, s, r, c) {
    super(e, l, s, r, c, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: e, element: l, name: s } = this;
    if (!l || !l.current)
      return;
    super.readKeyframes();
    for (let g = 0; g < e.length; g++) {
      let v = e[g];
      if (typeof v == "string" && (v = v.trim(), Hd(v))) {
        const b = $v(v, l.current);
        b !== void 0 && (e[g] = b), g === e.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !Gv.has(s) || e.length !== 2)
      return;
    const [r, c] = e, f = fy(r), h = fy(c), p = J0(r), m = J0(c);
    if (p !== m && va[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (f !== h)
      if (sy(f) && sy(h))
        for (let g = 0; g < e.length; g++) {
          const v = e[g];
          typeof v == "string" && (e[g] = parseFloat(v));
        }
      else va[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: l } = this, s = [];
    for (let r = 0; r < e.length; r++)
      (e[r] === null || G5(e[r])) && s.push(r);
    s.length && J5(e, s, l);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: l, name: s } = this;
    if (!e || !e.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = va[s](e.measureViewportBox(), window.getComputedStyle(e.current)), l[0] = this.measuredOrigin;
    const r = l[l.length - 1];
    r !== void 0 && e.getValue(s, r).jump(r, !1);
  }
  measureEndState() {
    const { element: e, name: l, unresolvedKeyframes: s } = this;
    if (!e || !e.current)
      return;
    const r = e.getValue(l);
    r && r.jump(this.measuredOrigin, !1);
    const c = s.length - 1, f = s[c];
    s[c] = va[l](e.measureViewportBox(), window.getComputedStyle(e.current)), f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f), this.removedTransforms?.length && this.removedTransforms.forEach(([h, p]) => {
      e.getValue(h).set(p);
    }), this.resolveNoneKeyframes();
  }
}
const Jd = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
];
function Jv(a, e, l) {
  if (a == null)
    return [];
  if (a instanceof EventTarget)
    return [a];
  if (typeof a == "string") {
    let s = document;
    const r = l?.[a] ?? s.querySelectorAll(a);
    return r ? Array.from(r) : [];
  }
  return Array.from(a).filter((s) => s != null);
}
const fd = (a, e) => e && typeof a == "number" ? e.transform(a) : a;
function ar(a) {
  return iv(a) && "offsetHeight" in a && !("ownerSVGElement" in a);
}
const { schedule: Wd } = /* @__PURE__ */ vv(queueMicrotask, !1), fn = {
  x: !1,
  y: !1
};
function Wv() {
  return fn.x || fn.y;
}
function I5(a) {
  return a === "x" || a === "y" ? fn[a] ? null : (fn[a] = !0, () => {
    fn[a] = !1;
  }) : fn.x || fn.y ? null : (fn.x = fn.y = !0, () => {
    fn.x = fn.y = !1;
  });
}
function Iv(a, e) {
  const l = Jv(a), s = new AbortController(), r = {
    passive: !0,
    ...e,
    signal: s.signal
  };
  return [l, r, () => s.abort()];
}
function t9(a) {
  return !(a.pointerType === "touch" || Wv());
}
function e9(a, e, l = {}) {
  const [s, r, c] = Iv(a, l);
  return s.forEach((f) => {
    let h = !1, p = !1, m;
    const g = () => {
      f.removeEventListener("pointerleave", S);
    }, v = (E) => {
      m && (m(E), m = void 0), g();
    }, b = (E) => {
      h = !1, window.removeEventListener("pointerup", b), window.removeEventListener("pointercancel", b), p && (p = !1, v(E));
    }, T = () => {
      h = !0, window.addEventListener("pointerup", b, r), window.addEventListener("pointercancel", b, r);
    }, S = (E) => {
      if (E.pointerType !== "touch") {
        if (h) {
          p = !0;
          return;
        }
        v(E);
      }
    }, w = (E) => {
      if (!t9(E))
        return;
      p = !1;
      const _ = e(f, E);
      typeof _ == "function" && (m = _, f.addEventListener("pointerleave", S, r));
    };
    f.addEventListener("pointerenter", w, r), f.addEventListener("pointerdown", T, r);
  }), c;
}
const t2 = (a, e) => e ? a === e ? !0 : t2(a, e.parentElement) : !1, Id = (a) => a.pointerType === "mouse" ? typeof a.button != "number" || a.button <= 0 : a.isPrimary !== !1, n9 = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function a9(a) {
  return n9.has(a.tagName) || a.isContentEditable === !0;
}
const i9 = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function l9(a) {
  return i9.has(a.tagName) || a.isContentEditable === !0;
}
const ir = /* @__PURE__ */ new WeakSet();
function hy(a) {
  return (e) => {
    e.key === "Enter" && a(e);
  };
}
function bf(a, e) {
  a.dispatchEvent(new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }));
}
const s9 = (a, e) => {
  const l = a.currentTarget;
  if (!l)
    return;
  const s = hy(() => {
    if (ir.has(l))
      return;
    bf(l, "down");
    const r = hy(() => {
      bf(l, "up");
    }), c = () => bf(l, "cancel");
    l.addEventListener("keyup", r, e), l.addEventListener("blur", c, e);
  });
  l.addEventListener("keydown", s, e), l.addEventListener("blur", () => l.removeEventListener("keydown", s), e);
};
function my(a) {
  return Id(a) && !Wv();
}
const py = /* @__PURE__ */ new WeakSet();
function o9(a, e, l = {}) {
  const [s, r, c] = Iv(a, l), f = (h) => {
    const p = h.currentTarget;
    if (!my(h) || py.has(h))
      return;
    ir.add(p), l.stopPropagation && py.add(h);
    const m = e(p, h), g = { ...r, capture: !0 }, v = (S, w) => {
      window.removeEventListener("pointerup", b, g), window.removeEventListener("pointercancel", T, g), ir.has(p) && ir.delete(p), my(S) && typeof m == "function" && m(S, { success: w });
    }, b = (S) => {
      v(S, p === window || p === document || l.useGlobalTarget || t2(p, S.target));
    }, T = (S) => {
      v(S, !1);
    };
    window.addEventListener("pointerup", b, g), window.addEventListener("pointercancel", T, g);
  };
  return s.forEach((h) => {
    (l.useGlobalTarget ? window : h).addEventListener("pointerdown", f, r), ar(h) && (h.addEventListener("focus", (m) => s9(m, r)), !a9(h) && !h.hasAttribute("tabindex") && (h.tabIndex = 0));
  }), c;
}
function th(a) {
  return iv(a) && "ownerSVGElement" in a;
}
const lr = /* @__PURE__ */ new WeakMap();
let sr;
const e2 = (a, e, l) => (s, r) => r && r[0] ? r[0][a + "Size"] : th(s) && "getBBox" in s ? s.getBBox()[e] : s[l], r9 = /* @__PURE__ */ e2("inline", "width", "offsetWidth"), u9 = /* @__PURE__ */ e2("block", "height", "offsetHeight");
function c9({ target: a, borderBoxSize: e }) {
  lr.get(a)?.forEach((l) => {
    l(a, {
      get width() {
        return r9(a, e);
      },
      get height() {
        return u9(a, e);
      }
    });
  });
}
function f9(a) {
  a.forEach(c9);
}
function d9() {
  typeof ResizeObserver > "u" || (sr = new ResizeObserver(f9));
}
function h9(a, e) {
  sr || d9();
  const l = Jv(a);
  return l.forEach((s) => {
    let r = lr.get(s);
    r || (r = /* @__PURE__ */ new Set(), lr.set(s, r)), r.add(e), sr?.observe(s);
  }), () => {
    l.forEach((s) => {
      const r = lr.get(s);
      r?.delete(e), r?.size || sr?.unobserve(s);
    });
  };
}
const or = /* @__PURE__ */ new Set();
let ki;
function m9() {
  ki = () => {
    const a = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    or.forEach((e) => e(a));
  }, window.addEventListener("resize", ki);
}
function p9(a) {
  return or.add(a), ki || m9(), () => {
    or.delete(a), !or.size && typeof ki == "function" && (window.removeEventListener("resize", ki), ki = void 0);
  };
}
function yy(a, e) {
  return typeof a == "function" ? p9(a) : h9(a, e);
}
function y9(a) {
  return th(a) && a.tagName === "svg";
}
const g9 = [...Zv, se, pn], v9 = (a) => g9.find(Kv(a)), gy = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Hi = () => ({
  x: gy(),
  y: gy()
}), vy = () => ({ min: 0, max: 0 }), ue = () => ({
  x: vy(),
  y: vy()
}), b9 = /* @__PURE__ */ new WeakMap();
function Rr(a) {
  return a !== null && typeof a == "object" && typeof a.start == "function";
}
function ds(a) {
  return typeof a == "string" || Array.isArray(a);
}
const eh = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], nh = ["initial", ...eh];
function Dr(a) {
  return Rr(a.animate) || nh.some((e) => ds(a[e]));
}
function n2(a) {
  return !!(Dr(a) || a.variants);
}
function x9(a, e, l) {
  for (const s in e) {
    const r = e[s], c = l[s];
    if (xe(r))
      a.addValue(s, r);
    else if (xe(c))
      a.addValue(s, Ki(r, { owner: a }));
    else if (c !== r)
      if (a.hasValue(s)) {
        const f = a.getValue(s);
        f.liveStyle === !0 ? f.jump(r) : f.hasAnimated || f.set(r);
      } else {
        const f = a.getStaticValue(s);
        a.addValue(s, Ki(f !== void 0 ? f : r, { owner: a }));
      }
  }
  for (const s in l)
    e[s] === void 0 && a.removeValue(s);
  return e;
}
const vr = { current: null }, ah = { current: !1 }, S9 = typeof window < "u";
function a2() {
  if (ah.current = !0, !!S9)
    if (window.matchMedia) {
      const a = window.matchMedia("(prefers-reduced-motion)"), e = () => vr.current = a.matches;
      a.addEventListener("change", e), e();
    } else
      vr.current = !1;
}
const by = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let br = {};
function i2(a) {
  br = a;
}
function w9() {
  return br;
}
class T9 {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(e, l, s) {
    return {};
  }
  constructor({ parent: e, props: l, presenceContext: s, reducedMotionConfig: r, skipAnimations: c, blockInitialAnimation: f, visualState: h }, p = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Pd, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const T = Ee.now();
      this.renderScheduledAt < T && (this.renderScheduledAt = T, qt.render(this.render, !1, !0));
    };
    const { latestValues: m, renderState: g } = h;
    this.latestValues = m, this.baseTarget = { ...m }, this.initialValues = l.initial ? { ...m } : {}, this.renderState = g, this.parent = e, this.props = l, this.presenceContext = s, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = r, this.skipAnimationsConfig = c, this.options = p, this.blockInitialAnimation = !!f, this.isControllingVariants = Dr(l), this.isVariantNode = n2(l), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: v, ...b } = this.scrapeMotionValuesFromProps(l, {}, this);
    for (const T in b) {
      const S = b[T];
      m[T] !== void 0 && xe(S) && S.set(m[T]);
    }
  }
  mount(e) {
    if (this.hasBeenMounted)
      for (const l in this.initialValues)
        this.values.get(l)?.jump(this.initialValues[l]), this.latestValues[l] = this.initialValues[l];
    this.current = e, b9.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((l, s) => this.bindToMotionValue(s, l)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (ah.current || a2(), this.shouldReduceMotion = vr.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), xa(this.notifyUpdate), xa(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const e in this.events)
      this.events[e].clear();
    for (const e in this.features) {
      const l = this.features[e];
      l && (l.unmount(), l.isMounted = !1);
    }
    this.current = null;
  }
  addChild(e) {
    this.children.add(e), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(e);
  }
  removeChild(e) {
    this.children.delete(e), this.enteringChildren && this.enteringChildren.delete(e);
  }
  bindToMotionValue(e, l) {
    if (this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)(), l.accelerate && kv.has(e) && this.current instanceof HTMLElement) {
      const { factory: f, keyframes: h, times: p, ease: m, duration: g } = l.accelerate, v = new Vv({
        element: this.current,
        name: e,
        keyframes: h,
        times: p,
        ease: m,
        duration: /* @__PURE__ */ Pe(g)
      }), b = f(v);
      this.valueSubscriptions.set(e, () => {
        b(), v.cancel();
      });
      return;
    }
    const s = Ji.has(e);
    s && this.onBindTransform && this.onBindTransform();
    const r = l.on("change", (f) => {
      this.latestValues[e] = f, this.props.onUpdate && qt.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let c;
    typeof window < "u" && window.MotionCheckAppearSync && (c = window.MotionCheckAppearSync(this, e, l)), this.valueSubscriptions.set(e, () => {
      r(), c && c();
    });
  }
  sortNodePosition(e) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
  }
  updateFeatures() {
    let e = "animation";
    for (e in br) {
      const l = br[e];
      if (!l)
        continue;
      const { isEnabled: s, Feature: r } = l;
      if (!this.features[e] && r && s(this.props) && (this.features[e] = new r(this)), this.features[e]) {
        const c = this.features[e];
        c.isMounted ? c.update() : (c.mount(), c.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : ue();
  }
  getStaticValue(e) {
    return this.latestValues[e];
  }
  setStaticValue(e, l) {
    this.latestValues[e] = l;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(e, l) {
    (e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = l;
    for (let s = 0; s < by.length; s++) {
      const r = by[s];
      this.propEventSubscriptions[r] && (this.propEventSubscriptions[r](), delete this.propEventSubscriptions[r]);
      const c = "on" + r, f = e[c];
      f && (this.propEventSubscriptions[r] = this.on(r, f));
    }
    this.prevMotionValues = x9(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(e) {
    return this.props.variants ? this.props.variants[e] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(e) {
    const l = this.getClosestVariantNode();
    if (l)
      return l.variantChildren && l.variantChildren.add(e), () => l.variantChildren.delete(e);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(e, l) {
    const s = this.values.get(e);
    l !== s && (s && this.removeValue(e), this.bindToMotionValue(e, l), this.values.set(e, l), this.latestValues[e] = l.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(e) {
    this.values.delete(e);
    const l = this.valueSubscriptions.get(e);
    l && (l(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(e) {
    return this.values.has(e);
  }
  getValue(e, l) {
    if (this.props.values && this.props.values[e])
      return this.props.values[e];
    let s = this.values.get(e);
    return s === void 0 && l !== void 0 && (s = Ki(l === null ? void 0 : l, { owner: this }), this.addValue(e, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(e, l) {
    let s = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
    return s != null && (typeof s == "string" && (av(s) || lv(s)) ? s = parseFloat(s) : !v9(s) && pn.test(l) && (s = Fv(e, l)), this.setBaseTarget(e, xe(s) ? s.get() : s)), xe(s) ? s.get() : s;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(e, l) {
    this.baseTarget[e] = l;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(e) {
    const { initial: l } = this.props;
    let s;
    if (typeof l == "string" || typeof l == "object") {
      const c = Qd(this.props, l, this.presenceContext?.custom);
      c && (s = c[e]);
    }
    if (l && s !== void 0)
      return s;
    const r = this.getBaseTargetFromProps(this.props, e);
    return r !== void 0 && !xe(r) ? r : this.initialValues[e] !== void 0 && s === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, l) {
    return this.events[e] || (this.events[e] = new zd()), this.events[e].add(l);
  }
  notify(e, ...l) {
    this.events[e] && this.events[e].notify(...l);
  }
  scheduleRenderMicrotask() {
    Wd.render(this.render);
  }
}
class l2 extends T9 {
  constructor() {
    super(...arguments), this.KeyframeResolver = W5;
  }
  sortInstanceNodePosition(e, l) {
    return e.compareDocumentPosition(l) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(e, l) {
    const s = e.style;
    return s ? s[l] : void 0;
  }
  removeValueFromRenderState(e, { vars: l, style: s }) {
    delete l[e], delete s[e];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: e } = this.props;
    xe(e) && (this.childSubscription = e.on("change", (l) => {
      this.current && (this.current.textContent = `${l}`);
    }));
  }
}
class wa {
  constructor(e) {
    this.isMounted = !1, this.node = e;
  }
  update() {
  }
}
function s2({ top: a, left: e, right: l, bottom: s }) {
  return {
    x: { min: e, max: l },
    y: { min: a, max: s }
  };
}
function C9({ x: a, y: e }) {
  return { top: e.min, right: a.max, bottom: e.max, left: a.min };
}
function E9(a, e) {
  if (!e)
    return a;
  const l = e({ x: a.left, y: a.top }), s = e({ x: a.right, y: a.bottom });
  return {
    top: l.y,
    left: l.x,
    bottom: s.y,
    right: s.x
  };
}
function xf(a) {
  return a === void 0 || a === 1;
}
function dd({ scale: a, scaleX: e, scaleY: l }) {
  return !xf(a) || !xf(e) || !xf(l);
}
function Ya(a) {
  return dd(a) || o2(a) || a.z || a.rotate || a.rotateX || a.rotateY || a.skewX || a.skewY;
}
function o2(a) {
  return xy(a.x) || xy(a.y);
}
function xy(a) {
  return a && a !== "0%";
}
function xr(a, e, l) {
  const s = a - l, r = e * s;
  return l + r;
}
function Sy(a, e, l, s, r) {
  return r !== void 0 && (a = xr(a, r, s)), xr(a, l, s) + e;
}
function hd(a, e = 0, l = 1, s, r) {
  a.min = Sy(a.min, e, l, s, r), a.max = Sy(a.max, e, l, s, r);
}
function r2(a, { x: e, y: l }) {
  hd(a.x, e.translate, e.scale, e.originPoint), hd(a.y, l.translate, l.scale, l.originPoint);
}
const wy = 0.999999999999, Ty = 1.0000000000001;
function A9(a, e, l, s = !1) {
  const r = l.length;
  if (!r)
    return;
  e.x = e.y = 1;
  let c, f;
  for (let h = 0; h < r; h++) {
    c = l[h], f = c.projectionDelta;
    const { visualElement: p } = c.options;
    p && p.props.style && p.props.style.display === "contents" || (s && c.options.layoutScroll && c.scroll && c !== c.root && (Sn(a.x, -c.scroll.offset.x), Sn(a.y, -c.scroll.offset.y)), f && (e.x *= f.x.scale, e.y *= f.y.scale, r2(a, f)), s && Ya(c.latestValues) && rr(a, c.latestValues, c.layout?.layoutBox));
  }
  e.x < Ty && e.x > wy && (e.x = 1), e.y < Ty && e.y > wy && (e.y = 1);
}
function Sn(a, e) {
  a.min += e, a.max += e;
}
function Cy(a, e, l, s, r = 0.5) {
  const c = Ht(a.min, a.max, r);
  hd(a, e, l, c, s);
}
function Ey(a, e) {
  return typeof a == "string" ? parseFloat(a) / 100 * (e.max - e.min) : a;
}
function rr(a, e, l) {
  const s = l ?? a;
  Cy(a.x, Ey(e.x, s.x), e.scaleX, e.scale, e.originX), Cy(a.y, Ey(e.y, s.y), e.scaleY, e.scale, e.originY);
}
function u2(a, e) {
  return s2(E9(a.getBoundingClientRect(), e));
}
function M9(a, e, l) {
  const s = u2(a, l), { scroll: r } = e;
  return r && (Sn(s.x, r.offset.x), Sn(s.y, r.offset.y)), s;
}
const j9 = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, _9 = Fi.length;
function R9(a, e, l) {
  let s = "", r = !0;
  for (let f = 0; f < _9; f++) {
    const h = Fi[f], p = a[h];
    if (p === void 0)
      continue;
    let m = !0;
    if (typeof p == "number")
      m = p === (h.startsWith("scale") ? 1 : 0);
    else {
      const g = parseFloat(p);
      m = h.startsWith("scale") ? g === 1 : g === 0;
    }
    if (!m || l) {
      const g = fd(p, gr[h]);
      if (!m) {
        r = !1;
        const v = j9[h] || h;
        s += `${v}(${g}) `;
      }
      l && (e[h] = g);
    }
  }
  const c = a.pathRotation;
  return c && (r = !1, s += `rotate(${fd(c, gr.pathRotation)}) `), s = s.trim(), l ? s = l(e, r ? "" : s) : r && (s = "none"), s;
}
function ih(a, e, l) {
  const { style: s, vars: r, transformOrigin: c } = a;
  let f = !1, h = !1;
  for (const p in e) {
    const m = e[p];
    if (Ji.has(p)) {
      f = !0;
      continue;
    } else if (xv(p)) {
      r[p] = m;
      continue;
    } else {
      const g = fd(m, gr[p]);
      p.startsWith("origin") ? (h = !0, c[p] = g) : s[p] = g;
    }
  }
  if (e.transform || (f || l ? s.transform = R9(e, a.transform, l) : s.transform && (s.transform = "none")), h) {
    const { originX: p = "50%", originY: m = "50%", originZ: g = 0 } = c;
    s.transformOrigin = `${p} ${m} ${g}`;
  }
}
function c2(a, { style: e, vars: l }, s, r) {
  const c = a.style;
  let f;
  for (f in e)
    c[f] = e[f];
  r?.applyProjectionStyles(c, s);
  for (f in l)
    c.setProperty(f, l[f]);
}
function Ay(a, e) {
  return e.max === e.min ? 0 : a / (e.max - e.min) * 100;
}
const Wl = {
  correct: (a, e) => {
    if (!e.target)
      return a;
    if (typeof a == "string")
      if (rt.test(a))
        a = parseFloat(a);
      else
        return a;
    const l = Ay(a, e.target.x), s = Ay(a, e.target.y);
    return `${l}% ${s}%`;
  }
}, D9 = {
  correct: (a, { treeScale: e, projectionDelta: l }) => {
    const s = a, r = pn.parse(a);
    if (r.length > 5)
      return s;
    const c = pn.createTransformer(a), f = typeof r[0] != "number" ? 1 : 0, h = l.x.scale * e.x, p = l.y.scale * e.y;
    r[0 + f] /= h, r[1 + f] /= p;
    const m = Ht(h, p, 0.5);
    return typeof r[2 + f] == "number" && (r[2 + f] /= m), typeof r[3 + f] == "number" && (r[3 + f] /= m), c(r);
  }
}, md = {
  borderRadius: {
    ...Wl,
    applyTo: [...Jd]
  },
  borderTopLeftRadius: Wl,
  borderTopRightRadius: Wl,
  borderBottomLeftRadius: Wl,
  borderBottomRightRadius: Wl,
  boxShadow: D9
};
function f2(a, { layout: e, layoutId: l }) {
  return Ji.has(a) || a.startsWith("origin") || (e || l !== void 0) && (!!md[a] || a === "opacity");
}
function lh(a, e, l) {
  const s = a.style, r = e?.style, c = {};
  if (!s)
    return c;
  for (const f in s)
    (xe(s[f]) || r && xe(r[f]) || f2(f, a) || l?.getValue(f)?.liveStyle !== void 0) && (c[f] = s[f]);
  return c;
}
function N9(a) {
  return window.getComputedStyle(a);
}
class O9 extends l2 {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = c2;
  }
  readValueFromInstance(e, l) {
    if (Ji.has(l))
      return this.projection?.isProjecting ? td(l) : t5(e, l);
    {
      const s = N9(e), r = (xv(l) ? s.getPropertyValue(l) : s[l]) || 0;
      return typeof r == "string" ? r.trim() : r;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: l }) {
    return u2(e, l);
  }
  build(e, l, s) {
    ih(e, l, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, l, s) {
    return lh(e, l, s);
  }
}
const z9 = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, L9 = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function B9(a, e, l = 1, s = 0, r = !0) {
  a.pathLength = 1;
  const c = r ? z9 : L9;
  a[c.offset] = `${-s}`, a[c.array] = `${e} ${l}`;
}
const V9 = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function d2(a, {
  attrX: e,
  attrY: l,
  attrScale: s,
  pathLength: r,
  pathSpacing: c = 1,
  pathOffset: f = 0,
  // This is object creation, which we try to avoid per-frame.
  ...h
}, p, m, g) {
  if (ih(a, h, m), p) {
    a.style.viewBox && (a.attrs.viewBox = a.style.viewBox);
    return;
  }
  a.attrs = a.style, a.style = {};
  const { attrs: v, style: b } = a;
  v.transform && (b.transform = v.transform, delete v.transform), (b.transform || v.transformOrigin) && (b.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), b.transform && (b.transformBox = g?.transformBox ?? "fill-box", delete v.transformBox);
  for (const T of V9)
    v[T] !== void 0 && (b[T] = v[T], delete v[T]);
  e !== void 0 && (v.x = e), l !== void 0 && (v.y = l), s !== void 0 && (v.scale = s), r !== void 0 && B9(v, r, c, f, !1);
}
const h2 = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]), m2 = (a) => typeof a == "string" && a.toLowerCase() === "svg";
function U9(a, e, l, s) {
  c2(a, e, void 0, s);
  for (const r in e.attrs)
    a.setAttribute(h2.has(r) ? r : Fd(r), e.attrs[r]);
}
function p2(a, e, l) {
  const s = lh(a, e, l);
  for (const r in a)
    if (xe(a[r]) || xe(e[r])) {
      const c = Fi.indexOf(r) !== -1 ? "attr" + r.charAt(0).toUpperCase() + r.substring(1) : r;
      s[c] = a[r];
    }
  return s;
}
class k9 extends l2 {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = ue;
  }
  getBaseTargetFromProps(e, l) {
    return e[l];
  }
  readValueFromInstance(e, l) {
    if (Ji.has(l)) {
      const s = Qv(l);
      return s && s.default || 0;
    }
    return l = h2.has(l) ? l : Fd(l), e.getAttribute(l);
  }
  scrapeMotionValuesFromProps(e, l, s) {
    return p2(e, l, s);
  }
  build(e, l, s) {
    d2(e, l, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(e, l, s, r) {
    U9(e, l, s, r);
  }
  mount(e) {
    this.isSVGTag = m2(e.tagName), super.mount(e);
  }
}
const H9 = nh.length;
function y2(a) {
  if (!a)
    return;
  if (!a.isControllingVariants) {
    const l = a.parent ? y2(a.parent) || {} : {};
    return a.props.initial !== void 0 && (l.initial = a.props.initial), l;
  }
  const e = {};
  for (let l = 0; l < H9; l++) {
    const s = nh[l], r = a.props[s];
    (ds(r) || r === !1) && (e[s] = r);
  }
  return e;
}
function g2(a, e) {
  if (!Array.isArray(e))
    return !1;
  const l = e.length;
  if (l !== a.length)
    return !1;
  for (let s = 0; s < l; s++)
    if (e[s] !== a[s])
      return !1;
  return !0;
}
const q9 = [...eh].reverse(), $9 = eh.length;
function G9(a) {
  return (e) => Promise.all(e.map(({ animation: l, options: s }) => q5(a, l, s)));
}
function Y9(a) {
  let e = G9(a), l = My(), s = !0, r = !1;
  const c = (m) => (g, v) => {
    const b = Ja(a, v, m === "exit" ? a.presenceContext?.custom : void 0);
    if (b) {
      const { transition: T, transitionEnd: S, ...w } = b;
      g = { ...g, ...w, ...S };
    }
    return g;
  };
  function f(m) {
    e = m(a);
  }
  function h(m) {
    const { props: g } = a, v = y2(a.parent) || {}, b = [], T = /* @__PURE__ */ new Set();
    let S = {}, w = 1 / 0;
    for (let _ = 0; _ < $9; _++) {
      const j = q9[_], M = l[j], D = g[j] !== void 0 ? g[j] : v[j], L = ds(D), V = j === m ? M.isActive : null;
      V === !1 && (w = _);
      let R = D === v[j] && D !== g[j] && L;
      if (R && (s || r) && a.manuallyAnimateOnMount && (R = !1), M.protectedKeys = { ...S }, // If it isn't active and hasn't *just* been set as inactive
      !M.isActive && V === null || // If we didn't and don't have any defined prop for this animation type
      !D && !M.prevProp || // Or if the prop doesn't define an animation
      Rr(D) || typeof D == "boolean")
        continue;
      if (j === "exit" && M.isActive && V !== !0) {
        M.prevResolvedValues && (S = {
          ...S,
          ...M.prevResolvedValues
        });
        continue;
      }
      const q = X9(M.prevProp, D);
      let X = q || // If we're making this variant active, we want to always make it active
      j === m && M.isActive && !R && L || // If we removed a higher-priority variant (i is in reverse order)
      _ > w && L, Z = !1;
      const et = Array.isArray(D) ? D : [D];
      let F = et.reduce(c(j), {});
      V === !1 && (F = {});
      const { prevResolvedValues: W = {} } = M, nt = {
        ...W,
        ...F
      }, st = (tt) => {
        X = !0, T.has(tt) && (Z = !0, T.delete(tt)), M.needsAnimating[tt] = !0;
        const at = a.getValue(tt);
        at && (at.liveStyle = !1);
      };
      for (const tt in nt) {
        const at = F[tt], ut = W[tt];
        if (S.hasOwnProperty(tt))
          continue;
        let N = !1;
        sd(at) && sd(ut) ? N = !g2(at, ut) || q : N = at !== ut, N ? at != null ? st(tt) : T.add(tt) : at !== void 0 && T.has(tt) ? st(tt) : M.protectedKeys[tt] = !0;
      }
      M.prevProp = D, M.prevResolvedValues = F, M.isActive && (S = { ...S, ...F }), (s || r) && a.blockInitialAnimation && (X = !1);
      const z = R && q;
      X && (!z || Z) && b.push(...et.map((tt) => {
        const at = { type: j };
        if (typeof tt == "string" && (s || r) && !z && a.manuallyAnimateOnMount && a.parent) {
          const { parent: ut } = a, N = Ja(ut, tt);
          if (ut.enteringChildren && N) {
            const { delayChildren: G } = N.transition || {};
            at.delay = Hv(ut.enteringChildren, a, G);
          }
        }
        return {
          animation: tt,
          options: at
        };
      }));
    }
    if (T.size) {
      const _ = {};
      if (typeof g.initial != "boolean") {
        const j = Ja(a, Array.isArray(g.initial) ? g.initial[0] : g.initial);
        j && j.transition && (_.transition = j.transition);
      }
      T.forEach((j) => {
        const M = a.getBaseTarget(j), D = a.getValue(j);
        D && (D.liveStyle = !0), _[j] = M ?? null;
      }), b.push({ animation: _ });
    }
    let E = !!b.length;
    return s && (g.initial === !1 || g.initial === g.animate) && !a.manuallyAnimateOnMount && (E = !1), s = !1, r = !1, E ? e(b) : Promise.resolve();
  }
  function p(m, g) {
    if (l[m].isActive === g)
      return Promise.resolve();
    a.variantChildren?.forEach((b) => b.animationState?.setActive(m, g)), l[m].isActive = g;
    const v = h(m);
    for (const b in l)
      l[b].protectedKeys = {};
    return v;
  }
  return {
    animateChanges: h,
    setActive: p,
    setAnimateFunction: f,
    getState: () => l,
    reset: () => {
      l = My(), r = !0;
    }
  };
}
function X9(a, e) {
  return typeof e == "string" ? e !== a : Array.isArray(e) ? !g2(e, a) : !1;
}
function qa(a = !1) {
  return {
    isActive: a,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function My() {
  return {
    animate: qa(!0),
    whileInView: qa(),
    whileHover: qa(),
    whileTap: qa(),
    whileDrag: qa(),
    whileFocus: qa(),
    exit: qa()
  };
}
function pd(a, e) {
  a.min = e.min, a.max = e.max;
}
function cn(a, e) {
  pd(a.x, e.x), pd(a.y, e.y);
}
function jy(a, e) {
  a.translate = e.translate, a.scale = e.scale, a.originPoint = e.originPoint, a.origin = e.origin;
}
const v2 = 1e-4, P9 = 1 - v2, K9 = 1 + v2, b2 = 0.01, Z9 = 0 - b2, Q9 = 0 + b2;
function Ae(a) {
  return a.max - a.min;
}
function F9(a, e, l) {
  return Math.abs(a - e) <= l;
}
function _y(a, e, l, s = 0.5) {
  a.origin = s, a.originPoint = Ht(e.min, e.max, a.origin), a.scale = Ae(l) / Ae(e), a.translate = Ht(l.min, l.max, a.origin) - a.originPoint, (a.scale >= P9 && a.scale <= K9 || isNaN(a.scale)) && (a.scale = 1), (a.translate >= Z9 && a.translate <= Q9 || isNaN(a.translate)) && (a.translate = 0);
}
function os(a, e, l, s) {
  _y(a.x, e.x, l.x, s ? s.originX : void 0), _y(a.y, e.y, l.y, s ? s.originY : void 0);
}
function Ry(a, e, l, s = 0) {
  const r = s ? Ht(l.min, l.max, s) : l.min;
  a.min = r + e.min, a.max = a.min + Ae(e);
}
function J9(a, e, l, s) {
  Ry(a.x, e.x, l.x, s?.x), Ry(a.y, e.y, l.y, s?.y);
}
function Dy(a, e, l, s = 0) {
  const r = s ? Ht(l.min, l.max, s) : l.min;
  a.min = e.min - r, a.max = a.min + Ae(e);
}
function Sr(a, e, l, s) {
  Dy(a.x, e.x, l.x, s?.x), Dy(a.y, e.y, l.y, s?.y);
}
function Ny(a, e, l, s, r) {
  return a -= e, a = xr(a, 1 / l, s), r !== void 0 && (a = xr(a, 1 / r, s)), a;
}
function W9(a, e = 0, l = 1, s = 0.5, r, c = a, f = a) {
  if (wn.test(e) && (e = parseFloat(e), e = Ht(f.min, f.max, e / 100) - f.min), typeof e != "number")
    return;
  let h = Ht(c.min, c.max, s);
  a === c && (h -= e), a.min = Ny(a.min, e, l, h, r), a.max = Ny(a.max, e, l, h, r);
}
function Oy(a, e, [l, s, r], c, f) {
  W9(a, e[l], e[s], e[r], e.scale, c, f);
}
const I9 = ["x", "scaleX", "originX"], t6 = ["y", "scaleY", "originY"];
function zy(a, e, l, s) {
  Oy(a.x, e, I9, l ? l.x : void 0, s ? s.x : void 0), Oy(a.y, e, t6, l ? l.y : void 0, s ? s.y : void 0);
}
function Ly(a) {
  return a.translate === 0 && a.scale === 1;
}
function x2(a) {
  return Ly(a.x) && Ly(a.y);
}
function By(a, e) {
  return a.min === e.min && a.max === e.max;
}
function e6(a, e) {
  return By(a.x, e.x) && By(a.y, e.y);
}
function Vy(a, e) {
  return Math.round(a.min) === Math.round(e.min) && Math.round(a.max) === Math.round(e.max);
}
function S2(a, e) {
  return Vy(a.x, e.x) && Vy(a.y, e.y);
}
function Uy(a) {
  return Ae(a.x) / Ae(a.y);
}
function ky(a, e) {
  return a.translate === e.translate && a.scale === e.scale && a.originPoint === e.originPoint;
}
function xn(a) {
  return [a("x"), a("y")];
}
function n6(a, e, l) {
  let s = "";
  const r = a.x.translate / e.x, c = a.y.translate / e.y, f = l?.z || 0;
  if ((r || c || f) && (s = `translate3d(${r}px, ${c}px, ${f}px) `), (e.x !== 1 || e.y !== 1) && (s += `scale(${1 / e.x}, ${1 / e.y}) `), l) {
    const { transformPerspective: m, rotate: g, pathRotation: v, rotateX: b, rotateY: T, skewX: S, skewY: w } = l;
    m && (s = `perspective(${m}px) ${s}`), g && (s += `rotate(${g}deg) `), v && (s += `rotate(${v}deg) `), b && (s += `rotateX(${b}deg) `), T && (s += `rotateY(${T}deg) `), S && (s += `skewX(${S}deg) `), w && (s += `skewY(${w}deg) `);
  }
  const h = a.x.scale * e.x, p = a.y.scale * e.y;
  return (h !== 1 || p !== 1) && (s += `scale(${h}, ${p})`), s || "none";
}
const a6 = Jd.length, Hy = (a) => typeof a == "string" ? parseFloat(a) : a, qy = (a) => typeof a == "number" || rt.test(a);
function i6(a, e, l, s, r, c) {
  r ? (a.opacity = Ht(0, l.opacity ?? 1, l6(s)), a.opacityExit = Ht(e.opacity ?? 1, 0, s6(s))) : c && (a.opacity = Ht(e.opacity ?? 1, l.opacity ?? 1, s));
  for (let f = 0; f < a6; f++) {
    const h = Jd[f];
    let p = $y(e, h), m = $y(l, h);
    if (p === void 0 && m === void 0)
      continue;
    p || (p = 0), m || (m = 0), p === 0 || m === 0 || qy(p) === qy(m) ? (a[h] = Math.max(Ht(Hy(p), Hy(m), s), 0), (wn.test(m) || wn.test(p)) && (a[h] += "%")) : a[h] = m;
  }
  (e.rotate || l.rotate) && (a.rotate = Ht(e.rotate || 0, l.rotate || 0, s));
}
function $y(a, e) {
  return a[e] !== void 0 ? a[e] : a.borderRadius;
}
const l6 = /* @__PURE__ */ w2(0, 0.5, mv), s6 = /* @__PURE__ */ w2(0.5, 0.95, sn);
function w2(a, e, l) {
  return (s) => s < a ? 0 : s > e ? 1 : l(/* @__PURE__ */ cs(a, e, s));
}
function o6(a, e, l) {
  const s = xe(a) ? a : Ki(a);
  return s.start(Zd("", s, e, l)), s.animation;
}
function hs(a, e, l, s = { passive: !0 }) {
  return a.addEventListener(e, l, s), () => a.removeEventListener(e, l, s);
}
const r6 = (a, e) => a.depth - e.depth;
class u6 {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(e) {
    Nd(this.children, e), this.isDirty = !0;
  }
  remove(e) {
    dr(this.children, e), this.isDirty = !0;
  }
  forEach(e) {
    this.isDirty && this.children.sort(r6), this.isDirty = !1, this.children.forEach(e);
  }
}
function c6(a, e) {
  const l = Ee.now(), s = ({ timestamp: r }) => {
    const c = r - l;
    c >= e && (xa(s), a(c - e));
  };
  return qt.setup(s, !0), () => xa(s);
}
function ur(a) {
  return xe(a) ? a.get() : a;
}
class f6 {
  constructor() {
    this.members = [];
  }
  add(e) {
    Nd(this.members, e);
    for (let l = this.members.length - 1; l >= 0; l--) {
      const s = this.members[l];
      if (s === e || s === this.lead || s === this.prevLead)
        continue;
      const r = s.instance;
      (!r || r.isConnected === !1) && !s.snapshot && (dr(this.members, s), s.unmount());
    }
    e.scheduleRender();
  }
  remove(e) {
    if (dr(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead) {
      const l = this.members[this.members.length - 1];
      l && this.promote(l);
    }
  }
  relegate(e) {
    for (let l = this.members.indexOf(e) - 1; l >= 0; l--) {
      const s = this.members[l];
      if (s.isPresent !== !1 && s.instance?.isConnected !== !1)
        return this.promote(s), !0;
    }
    return !1;
  }
  promote(e, l) {
    const s = this.lead;
    if (e !== s && (this.prevLead = s, this.lead = e, e.show(), s)) {
      s.updateSnapshot(), e.scheduleRender();
      const { layoutDependency: r } = s.options, { layoutDependency: c } = e.options;
      (r === void 0 || r !== c) && (e.resumeFrom = s, l && (s.preserveOpacity = !0), s.snapshot && (e.snapshot = s.snapshot, e.snapshot.latestValues = s.animationValues || s.latestValues), e.root?.isUpdating && (e.isLayoutDirty = !0)), e.options.crossfade === !1 && s.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((e) => {
      e.options.onExitComplete?.(), e.resumingFrom?.options.onExitComplete?.();
    });
  }
  scheduleRender() {
    this.members.forEach((e) => e.instance && e.scheduleRender(!1));
  }
  removeLeadSnapshot() {
    this.lead?.snapshot && (this.lead.snapshot = void 0);
  }
}
const cr = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
}, Sf = ["", "X", "Y", "Z"], d6 = 1e3;
let h6 = 0;
function wf(a, e, l, s) {
  const { latestValues: r } = e;
  r[a] && (l[a] = r[a], e.setStaticValue(a, 0), s && (s[a] = 0));
}
function T2(a) {
  if (a.hasCheckedOptimisedAppear = !0, a.root === a)
    return;
  const { visualElement: e } = a.options;
  if (!e)
    return;
  const l = Xv(e);
  if (window.MotionHasOptimisedAnimation(l, "transform")) {
    const { layout: r, layoutId: c } = a.options;
    window.MotionCancelOptimisedAnimation(l, "transform", qt, !(r || c));
  }
  const { parent: s } = a;
  s && !s.hasCheckedOptimisedAppear && T2(s);
}
function C2({ attachResizeListener: a, defaultParent: e, measureScroll: l, checkIsScrollRoot: s, resetTransform: r }) {
  return class {
    constructor(f = {}, h = e?.()) {
      this.id = h6++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(y6), this.nodes.forEach(w6), this.nodes.forEach(T6), this.nodes.forEach(g6);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = f, this.root = h ? h.root || h : this, this.path = h ? [...h.path, h] : [], this.parent = h, this.depth = h ? h.depth + 1 : 0;
      for (let p = 0; p < this.path.length; p++)
        this.path[p].shouldResetTransform = !0;
      this.root === this && (this.nodes = new u6());
    }
    addEventListener(f, h) {
      return this.eventHandlers.has(f) || this.eventHandlers.set(f, new zd()), this.eventHandlers.get(f).add(h);
    }
    notifyListeners(f, ...h) {
      const p = this.eventHandlers.get(f);
      p && p.notify(...h);
    }
    hasListeners(f) {
      return this.eventHandlers.has(f);
    }
    /**
     * Lifecycles
     */
    mount(f) {
      if (this.instance)
        return;
      this.isSVG = th(f) && !y9(f), this.instance = f;
      const { layoutId: h, layout: p, visualElement: m } = this.options;
      if (m && !m.current && m.mount(f), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (p || h) && (this.isLayoutDirty = !0), a) {
        let g, v = 0;
        const b = () => this.root.updateBlockedByResize = !1;
        qt.read(() => {
          v = window.innerWidth;
        }), a(f, () => {
          const T = window.innerWidth;
          T !== v && (v = T, this.root.updateBlockedByResize = !0, g && g(), g = c6(b, 250), cr.hasAnimatedSinceResize && (cr.hasAnimatedSinceResize = !1, this.nodes.forEach(Xy)));
        });
      }
      h && this.root.registerSharedNode(h, this), this.options.animate !== !1 && m && (h || p) && this.addEventListener("didUpdate", ({ delta: g, hasLayoutChanged: v, hasRelativeLayoutChanged: b, layout: T }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const S = this.options.transition || m.getDefaultTransition() || j6, { onLayoutAnimationStart: w, onLayoutAnimationComplete: E } = m.getProps(), _ = !this.targetLayout || !S2(this.targetLayout, T), j = !v && b;
        if (this.options.layoutRoot || this.resumeFrom || j || v && (_ || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const M = {
            ...Kd(S, "layout"),
            onPlay: w,
            onComplete: E
          };
          (m.shouldReduceMotion || this.options.layoutRoot) && (M.delay = 0, M.type = !1), this.startAnimation(M), this.setAnimationOrigin(g, j, M.path);
        } else
          v || Xy(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = T;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const f = this.getStack();
      f && f.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), xa(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(C6), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: f } = this.options;
      return f && f.getProps().transformTemplate;
    }
    willUpdate(f = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && T2(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let g = 0; g < this.path.length; g++) {
        const v = this.path[g];
        v.shouldResetTransform = !0, (typeof v.latestValues.x == "string" || typeof v.latestValues.y == "string") && (v.isLayoutDirty = !0), v.updateScroll("snapshot"), v.options.layoutRoot && v.willUpdate(!1);
      }
      const { layoutId: h, layout: p } = this.options;
      if (h === void 0 && !p)
        return;
      const m = this.getTransformTemplate();
      this.prevTransformTemplateValue = m ? m(this.latestValues, "") : void 0, this.updateSnapshot(), f && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        const p = this.updateBlockedByResize;
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), p && this.nodes.forEach(b6), this.nodes.forEach(Gy);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Yy);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(x6), this.nodes.forEach(S6), this.nodes.forEach(m6), this.nodes.forEach(p6)) : this.nodes.forEach(Yy), this.clearAllSnapshots();
      const h = Ee.now();
      be.delta = Tn(0, 1e3 / 60, h - be.timestamp), be.timestamp = h, be.isProcessing = !0, hf.update.process(be), hf.preRender.process(be), hf.render.process(be), be.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Wd.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(v6), this.sharedNodes.forEach(E6);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, qt.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      qt.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !Ae(this.snapshot.measuredBox.x) && !Ae(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let p = 0; p < this.path.length; p++)
          this.path[p].updateScroll();
      const f = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = ue()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: h } = this.options;
      h && h.notify("LayoutMeasure", this.layout.layoutBox, f ? f.layoutBox : void 0);
    }
    updateScroll(f = "measure") {
      let h = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === f && (h = !1), h && this.instance) {
        const p = s(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: f,
          isRoot: p,
          offset: l(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : p
        };
      }
    }
    resetTransform() {
      if (!r)
        return;
      const f = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, h = this.projectionDelta && !x2(this.projectionDelta), p = this.getTransformTemplate(), m = p ? p(this.latestValues, "") : void 0, g = m !== this.prevTransformTemplateValue;
      f && this.instance && (h || Ya(this.latestValues) || g) && (r(this.instance, m), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(f = !0) {
      const h = this.measurePageBox();
      let p = this.removeElementScroll(h);
      return f && (p = this.removeTransform(p)), _6(p), {
        animationId: this.root.animationId,
        measuredBox: h,
        layoutBox: p,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: f } = this.options;
      if (!f)
        return ue();
      const h = f.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(R6))) {
        const { scroll: m } = this.root;
        m && (Sn(h.x, m.offset.x), Sn(h.y, m.offset.y));
      }
      return h;
    }
    removeElementScroll(f) {
      const h = ue();
      if (cn(h, f), this.scroll?.wasRoot)
        return h;
      for (let p = 0; p < this.path.length; p++) {
        const m = this.path[p], { scroll: g, options: v } = m;
        m !== this.root && g && v.layoutScroll && (g.wasRoot && cn(h, f), Sn(h.x, g.offset.x), Sn(h.y, g.offset.y));
      }
      return h;
    }
    applyTransform(f, h = !1, p) {
      const m = p || ue();
      cn(m, f);
      for (let g = 0; g < this.path.length; g++) {
        const v = this.path[g];
        !h && v.options.layoutScroll && v.scroll && v !== v.root && (Sn(m.x, -v.scroll.offset.x), Sn(m.y, -v.scroll.offset.y)), Ya(v.latestValues) && rr(m, v.latestValues, v.layout?.layoutBox);
      }
      return Ya(this.latestValues) && rr(m, this.latestValues, this.layout?.layoutBox), m;
    }
    removeTransform(f) {
      const h = ue();
      cn(h, f);
      for (let p = 0; p < this.path.length; p++) {
        const m = this.path[p];
        if (!Ya(m.latestValues))
          continue;
        let g;
        m.instance && (dd(m.latestValues) && m.updateSnapshot(), g = ue(), cn(g, m.measurePageBox())), zy(h, m.latestValues, m.snapshot?.layoutBox, g);
      }
      return Ya(this.latestValues) && zy(h, this.latestValues), h;
    }
    setTargetDelta(f) {
      this.targetDelta = f, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(f) {
      this.options = {
        ...this.options,
        ...f,
        crossfade: f.crossfade !== void 0 ? f.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== be.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(f = !1) {
      const h = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = h.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = h.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = h.isSharedProjectionDirty);
      const p = !!this.resumingFrom || this !== h;
      if (!(f || p && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: g, layoutId: v } = this.options;
      if (!this.layout || !(g || v))
        return;
      this.resolvedRelativeTargetAt = be.timestamp;
      const b = this.getClosestProjectingParent();
      b && this.linkedParentVersion !== b.layoutVersion && !b.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && b && b.layout ? this.createRelativeTarget(b, this.layout.layoutBox, b.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = ue(), this.targetWithTransforms = ue()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), J9(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : cn(this.target, this.layout.layoutBox), r2(this.target, this.targetDelta)) : cn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && b && !!b.resumingFrom == !!this.resumingFrom && !b.options.layoutScroll && b.target && this.animationProgress !== 1 ? this.createRelativeTarget(b, this.target, b.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || dd(this.parent.latestValues) || o2(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(f, h, p) {
      this.relativeParent = f, this.linkedParentVersion = f.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = ue(), this.relativeTargetOrigin = ue(), Sr(this.relativeTargetOrigin, h, p, this.options.layoutAnchor || void 0), cn(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const f = this.getLead(), h = !!this.resumingFrom || this !== f;
      let p = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (p = !1), h && (this.isSharedProjectionDirty || this.isTransformDirty) && (p = !1), this.resolvedRelativeTargetAt === be.timestamp && (p = !1), p)
        return;
      const { layout: m, layoutId: g } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(m || g))
        return;
      cn(this.layoutCorrected, this.layout.layoutBox);
      const v = this.treeScale.x, b = this.treeScale.y;
      A9(this.layoutCorrected, this.treeScale, this.path, h), f.layout && !f.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (f.target = f.layout.layoutBox, f.targetWithTransforms = ue());
      const { target: T } = f;
      if (!T) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (jy(this.prevProjectionDelta.x, this.projectionDelta.x), jy(this.prevProjectionDelta.y, this.projectionDelta.y)), os(this.projectionDelta, this.layoutCorrected, T, this.latestValues), (this.treeScale.x !== v || this.treeScale.y !== b || !ky(this.projectionDelta.x, this.prevProjectionDelta.x) || !ky(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", T));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(f = !0) {
      if (this.options.visualElement?.scheduleRender(), f) {
        const h = this.getStack();
        h && h.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = Hi(), this.projectionDelta = Hi(), this.projectionDeltaWithTransform = Hi();
    }
    setAnimationOrigin(f, h = !1, p) {
      const m = this.snapshot, g = m ? m.latestValues : {}, v = { ...this.latestValues }, b = Hi();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !h;
      const T = ue(), S = m ? m.source : void 0, w = this.layout ? this.layout.source : void 0, E = S !== w, _ = this.getStack(), j = !_ || _.members.length <= 1, M = !!(E && !j && this.options.crossfade === !0 && !this.path.some(M6));
      this.animationProgress = 0;
      let D;
      const L = p?.interpolateProjection(f);
      this.mixTargetDelta = (V) => {
        const R = V / 1e3, q = L?.(R);
        q ? (b.x.translate = q.x, b.x.scale = Ht(f.x.scale, 1, R), b.x.origin = f.x.origin, b.x.originPoint = f.x.originPoint, b.y.translate = q.y, b.y.scale = Ht(f.y.scale, 1, R), b.y.origin = f.y.origin, b.y.originPoint = f.y.originPoint) : (Py(b.x, f.x, R), Py(b.y, f.y, R)), this.setTargetDelta(b), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Sr(T, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), A6(this.relativeTarget, this.relativeTargetOrigin, T, R), D && e6(this.relativeTarget, D) && (this.isProjectionDirty = !1), D || (D = ue()), cn(D, this.relativeTarget)), E && (this.animationValues = v, i6(v, g, this.latestValues, R, M, j)), q && q.rotate !== void 0 && (this.animationValues || (this.animationValues = v), this.animationValues.pathRotation = q.rotate), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = R;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(f) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (xa(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = qt.update(() => {
        cr.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = Ki(0)), this.motionValue.jump(0, !1), this.currentAnimation = o6(this.motionValue, [0, 1e3], {
          ...f,
          velocity: 0,
          isSync: !0,
          onUpdate: (h) => {
            this.mixTargetDelta(h), f.onUpdate && f.onUpdate(h);
          },
          onComplete: () => {
            f.onComplete && f.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const f = this.getStack();
      f && f.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(d6), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const f = this.getLead();
      let { targetWithTransforms: h, target: p, layout: m, latestValues: g } = f;
      if (!(!h || !p || !m)) {
        if (this !== f && this.layout && m && E2(this.options.animationType, this.layout.layoutBox, m.layoutBox)) {
          p = this.target || ue();
          const v = Ae(this.layout.layoutBox.x);
          p.x.min = f.target.x.min, p.x.max = p.x.min + v;
          const b = Ae(this.layout.layoutBox.y);
          p.y.min = f.target.y.min, p.y.max = p.y.min + b;
        }
        cn(h, p), rr(h, g), os(this.projectionDeltaWithTransform, this.layoutCorrected, h, g);
      }
    }
    registerSharedNode(f, h) {
      this.sharedNodes.has(f) || this.sharedNodes.set(f, new f6()), this.sharedNodes.get(f).add(h);
      const m = h.options.initialPromotionConfig;
      h.promote({
        transition: m ? m.transition : void 0,
        preserveFollowOpacity: m && m.shouldPreserveFollowOpacity ? m.shouldPreserveFollowOpacity(h) : void 0
      });
    }
    isLead() {
      const f = this.getStack();
      return f ? f.lead === this : !0;
    }
    getLead() {
      const { layoutId: f } = this.options;
      return f ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: f } = this.options;
      return f ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: f } = this.options;
      if (f)
        return this.root.sharedNodes.get(f);
    }
    promote({ needsReset: f, transition: h, preserveFollowOpacity: p } = {}) {
      const m = this.getStack();
      m && m.promote(this, p), f && (this.projectionDelta = void 0, this.needsReset = !0), h && this.setOptions({ transition: h });
    }
    relegate() {
      const f = this.getStack();
      return f ? f.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: f } = this.options;
      if (!f)
        return;
      let h = !1;
      const { latestValues: p } = f;
      if ((p.z || p.rotate || p.rotateX || p.rotateY || p.rotateZ || p.skewX || p.skewY) && (h = !0), !h)
        return;
      const m = {};
      p.z && wf("z", f, m, this.animationValues);
      for (let g = 0; g < Sf.length; g++)
        wf(`rotate${Sf[g]}`, f, m, this.animationValues), wf(`skew${Sf[g]}`, f, m, this.animationValues);
      f.render();
      for (const g in m)
        f.setStaticValue(g, m[g]), this.animationValues && (this.animationValues[g] = m[g]);
      f.scheduleRender();
    }
    applyProjectionStyles(f, h) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        f.visibility = "hidden";
        return;
      }
      const p = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, f.visibility = "", f.opacity = "", f.pointerEvents = ur(h?.pointerEvents) || "", f.transform = p ? p(this.latestValues, "") : "none";
        return;
      }
      const m = this.getLead();
      if (!this.projectionDelta || !this.layout || !m.target) {
        this.options.layoutId && (f.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, f.pointerEvents = ur(h?.pointerEvents) || ""), this.hasProjected && !Ya(this.latestValues) && (f.transform = p ? p({}, "") : "none", this.hasProjected = !1);
        return;
      }
      f.visibility = "";
      const g = m.animationValues || m.latestValues;
      this.applyTransformsToTarget();
      let v = n6(this.projectionDeltaWithTransform, this.treeScale, g);
      p && (v = p(g, v)), f.transform = v;
      const { x: b, y: T } = this.projectionDelta;
      f.transformOrigin = `${b.origin * 100}% ${T.origin * 100}% 0`, m.animationValues ? f.opacity = m === this ? g.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : g.opacityExit : f.opacity = m === this ? g.opacity !== void 0 ? g.opacity : "" : g.opacityExit !== void 0 ? g.opacityExit : 0;
      for (const S in md) {
        if (g[S] === void 0)
          continue;
        const { correct: w, applyTo: E, isCSSVariable: _ } = md[S], j = v === "none" ? g[S] : w(g[S], m);
        if (E) {
          const M = E.length;
          for (let D = 0; D < M; D++)
            f[E[D]] = j;
        } else
          _ ? this.options.visualElement.renderState.vars[S] = j : f[S] = j;
      }
      this.options.layoutId && (f.pointerEvents = m === this ? ur(h?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((f) => f.currentAnimation?.stop()), this.root.nodes.forEach(Gy), this.root.sharedNodes.clear();
    }
  };
}
function m6(a) {
  a.updateLayout();
}
function p6(a) {
  const e = a.resumeFrom?.snapshot || a.snapshot;
  if (a.isLead() && a.layout && e && a.hasListeners("didUpdate")) {
    const { layoutBox: l, measuredBox: s } = a.layout, { animationType: r } = a.options, c = e.source !== a.layout.source;
    if (r === "size")
      xn((g) => {
        const v = c ? e.measuredBox[g] : e.layoutBox[g], b = Ae(v);
        v.min = l[g].min, v.max = v.min + b;
      });
    else if (r === "x" || r === "y") {
      const g = r === "x" ? "y" : "x";
      pd(c ? e.measuredBox[g] : e.layoutBox[g], l[g]);
    } else E2(r, e.layoutBox, l) && xn((g) => {
      const v = c ? e.measuredBox[g] : e.layoutBox[g], b = Ae(l[g]);
      v.max = v.min + b, a.relativeTarget && !a.currentAnimation && (a.isProjectionDirty = !0, a.relativeTarget[g].max = a.relativeTarget[g].min + b);
    });
    const f = Hi();
    os(f, l, e.layoutBox);
    const h = Hi();
    c ? os(h, a.applyTransform(s, !0), e.measuredBox) : os(h, l, e.layoutBox);
    const p = !x2(f);
    let m = !1;
    if (!a.resumeFrom) {
      const g = a.getClosestProjectingParent();
      if (g && !g.resumeFrom) {
        const { snapshot: v, layout: b } = g;
        if (v && b) {
          const T = a.options.layoutAnchor || void 0, S = ue();
          Sr(S, e.layoutBox, v.layoutBox, T);
          const w = ue();
          Sr(w, l, b.layoutBox, T), S2(S, w) || (m = !0), g.options.layoutRoot && (a.relativeTarget = w, a.relativeTargetOrigin = S, a.relativeParent = g);
        }
      }
    }
    a.notifyListeners("didUpdate", {
      layout: l,
      snapshot: e,
      delta: h,
      layoutDelta: f,
      hasLayoutChanged: p,
      hasRelativeLayoutChanged: m
    });
  } else if (a.isLead()) {
    const { onExitComplete: l } = a.options;
    l && l();
  }
  a.options.transition = void 0;
}
function y6(a) {
  a.parent && (a.isProjecting() || (a.isProjectionDirty = a.parent.isProjectionDirty), a.isSharedProjectionDirty || (a.isSharedProjectionDirty = !!(a.isProjectionDirty || a.parent.isProjectionDirty || a.parent.isSharedProjectionDirty)), a.isTransformDirty || (a.isTransformDirty = a.parent.isTransformDirty));
}
function g6(a) {
  a.isProjectionDirty = a.isSharedProjectionDirty = a.isTransformDirty = !1;
}
function v6(a) {
  a.clearSnapshot();
}
function Gy(a) {
  a.clearMeasurements();
}
function b6(a) {
  a.isLayoutDirty = !0, a.updateLayout();
}
function Yy(a) {
  a.isLayoutDirty = !1;
}
function x6(a) {
  a.isAnimationBlocked && a.layout && !a.isLayoutDirty && (a.snapshot = a.layout, a.isLayoutDirty = !0);
}
function S6(a) {
  const { visualElement: e } = a.options;
  e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), a.resetTransform();
}
function Xy(a) {
  a.finishAnimation(), a.targetDelta = a.relativeTarget = a.target = void 0, a.isProjectionDirty = !0;
}
function w6(a) {
  a.resolveTargetDelta();
}
function T6(a) {
  a.calcProjection();
}
function C6(a) {
  a.resetSkewAndRotation();
}
function E6(a) {
  a.removeLeadSnapshot();
}
function Py(a, e, l) {
  a.translate = Ht(e.translate, 0, l), a.scale = Ht(e.scale, 1, l), a.origin = e.origin, a.originPoint = e.originPoint;
}
function Ky(a, e, l, s) {
  a.min = Ht(e.min, l.min, s), a.max = Ht(e.max, l.max, s);
}
function A6(a, e, l, s) {
  Ky(a.x, e.x, l.x, s), Ky(a.y, e.y, l.y, s);
}
function M6(a) {
  return a.animationValues && a.animationValues.opacityExit !== void 0;
}
const j6 = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, Zy = (a) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(a), Qy = Zy("applewebkit/") && !Zy("chrome/") ? Math.round : sn;
function Fy(a) {
  a.min = Qy(a.min), a.max = Qy(a.max);
}
function _6(a) {
  Fy(a.x), Fy(a.y);
}
function E2(a, e, l) {
  return a === "position" || a === "preserve-aspect" && !F9(Uy(e), Uy(l), 0.2);
}
function R6(a) {
  return a !== a.root && a.scroll?.wasRoot;
}
const D6 = C2({
  attachResizeListener: (a, e) => hs(a, "resize", e),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), Tf = {
  current: void 0
}, A2 = C2({
  measureScroll: (a) => ({
    x: a.scrollLeft,
    y: a.scrollTop
  }),
  defaultParent: () => {
    if (!Tf.current) {
      const a = new D6({});
      a.mount(window), a.setOptions({ layoutScroll: !0 }), Tf.current = a;
    }
    return Tf.current;
  },
  resetTransform: (a, e) => {
    a.style.transform = e !== void 0 ? e : "none";
  },
  checkIsScrollRoot: (a) => window.getComputedStyle(a).position === "fixed"
});
function N6(a, e) {
  if (Dr(a)) {
    const { initial: l, animate: s } = a;
    return {
      initial: l === !1 || ds(l) ? l : void 0,
      animate: ds(s) ? s : void 0
    };
  }
  return a.inherit !== !1 ? e : {};
}
function O6(a) {
  const { initial: e, animate: l } = N6(a, A.useContext(jr));
  return A.useMemo(() => ({ initial: e, animate: l }), [Jy(e), Jy(l)]);
}
function Jy(a) {
  return Array.isArray(a) ? a.join(" ") : a;
}
const sh = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function M2(a, e, l) {
  for (const s in e)
    !xe(e[s]) && !f2(s, l) && (a[s] = e[s]);
}
function z6({ transformTemplate: a }, e) {
  return A.useMemo(() => {
    const l = sh();
    return ih(l, e, a), Object.assign({}, l.vars, l.style);
  }, [e]);
}
function L6(a, e) {
  const l = a.style || {}, s = {};
  return M2(s, l, a), Object.assign(s, z6(a, e)), s;
}
function B6(a, e) {
  const l = {}, s = L6(a, e);
  return a.drag && a.dragListener !== !1 && (l.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = a.drag === !0 ? "none" : `pan-${a.drag === "x" ? "y" : "x"}`), a.tabIndex === void 0 && (a.onTap || a.onTapStart || a.whileTap) && (l.tabIndex = 0), l.style = s, l;
}
const j2 = () => ({
  ...sh(),
  attrs: {}
});
function V6(a, e, l, s) {
  const r = A.useMemo(() => {
    const c = j2();
    return d2(c, e, m2(s), a.transformTemplate, a.style), {
      ...c.attrs,
      style: { ...c.style }
    };
  }, [e]);
  if (a.style) {
    const c = {};
    M2(c, a.style, a), r.style = { ...c, ...r.style };
  }
  return r;
}
const U6 = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "propagate",
  "ignoreStrict",
  "viewport"
]);
function wr(a) {
  return a.startsWith("while") || a.startsWith("drag") && a !== "draggable" || a.startsWith("layout") || a.startsWith("onTap") || a.startsWith("onPan") || a.startsWith("onLayout") || U6.has(a);
}
let _2 = (a) => !wr(a);
function k6(a) {
  typeof a == "function" && (_2 = (e) => e.startsWith("on") ? !wr(e) : a(e));
}
try {
  k6(require("@emotion/is-prop-valid").default);
} catch {
}
function H6(a, e, l) {
  const s = {};
  for (const r in a)
    r === "values" && typeof a.values == "object" || xe(a[r]) || (_2(r) || l === !0 && wr(r) || !e && !wr(r) || // If trying to use native HTML drag events, forward drag listeners
    a.draggable && r.startsWith("onDrag")) && (s[r] = a[r]);
  return s;
}
const q6 = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function oh(a) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof a != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    a.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(q6.indexOf(a) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(a))
    )
  );
}
function $6(a, e, l, { latestValues: s }, r, c = !1, f) {
  const p = (f ?? oh(a) ? V6 : B6)(e, s, r, a), m = H6(e, typeof a == "string", c), g = a !== A.Fragment ? { ...m, ...p, ref: l } : {}, { children: v } = e, b = A.useMemo(() => xe(v) ? v.get() : v, [v]);
  return A.createElement(a, {
    ...g,
    children: b
  });
}
const Nr = /* @__PURE__ */ A.createContext(null);
function rh(a) {
  const e = A.useRef(null);
  return e.current === null && (e.current = a()), e.current;
}
function G6({ scrapeMotionValuesFromProps: a, createRenderState: e }, l, s, r) {
  return {
    latestValues: Y6(l, s, r, a),
    renderState: e()
  };
}
function Y6(a, e, l, s) {
  const r = {}, c = s(a, {});
  for (const b in c)
    r[b] = ur(c[b]);
  let { initial: f, animate: h } = a;
  const p = Dr(a), m = n2(a);
  e && m && !p && a.inherit !== !1 && (f === void 0 && (f = e.initial), h === void 0 && (h = e.animate));
  let g = l ? l.initial === !1 : !1;
  g = g || f === !1;
  const v = g ? h : f;
  if (v && typeof v != "boolean" && !Rr(v)) {
    const b = Array.isArray(v) ? v : [v];
    for (let T = 0; T < b.length; T++) {
      const S = Qd(a, b[T]);
      if (S) {
        const { transitionEnd: w, transition: E, ..._ } = S;
        for (const j in _) {
          let M = _[j];
          if (Array.isArray(M)) {
            const D = g ? M.length - 1 : 0;
            M = M[D];
          }
          M !== null && (r[j] = M);
        }
        for (const j in w)
          r[j] = w[j];
      }
    }
  }
  return r;
}
const R2 = (a) => (e, l) => {
  const s = A.useContext(jr), r = A.useContext(Nr), c = () => G6(a, e, s, r);
  return l ? c() : rh(c);
}, X6 = /* @__PURE__ */ R2({
  scrapeMotionValuesFromProps: lh,
  createRenderState: sh
}), P6 = /* @__PURE__ */ R2({
  scrapeMotionValuesFromProps: p2,
  createRenderState: j2
}), Wy = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
let Iy = !1;
function K6() {
  if (Iy)
    return;
  const a = {};
  for (const e in Wy)
    a[e] = {
      isEnabled: (l) => Wy[e].some((s) => !!l[s])
    };
  i2(a), Iy = !0;
}
function D2() {
  return K6(), w9();
}
function tg(a) {
  const e = D2();
  for (const l in a)
    e[l] = {
      ...e[l],
      ...a[l]
    };
  i2(e);
}
const Z6 = Symbol.for("motionComponentSymbol");
function Q6(a, e, l) {
  const s = A.useRef(l);
  A.useInsertionEffect(() => {
    s.current = l;
  });
  const r = A.useRef(null);
  return A.useCallback((c) => {
    c && a.onMount?.(c), e && (c ? e.mount(c) : e.unmount());
    const f = s.current;
    if (typeof f == "function")
      if (c) {
        const h = f(c);
        typeof h == "function" && (r.current = h);
      } else r.current ? (r.current(), r.current = null) : f(c);
    else f && (f.current = c);
  }, [e]);
}
const N2 = A.createContext({});
function Vi(a) {
  return a && typeof a == "object" && Object.prototype.hasOwnProperty.call(a, "current");
}
const F6 = typeof window < "u", uh = F6 ? A.useLayoutEffect : A.useEffect;
function J6(a, e, l, s, r, c) {
  const { visualElement: f } = A.useContext(jr), h = A.useContext(Ud), p = A.useContext(Nr), m = A.useContext(kd), g = m.reducedMotion, v = m.skipAnimations, b = A.useRef(null), T = A.useRef(!1);
  s = s || h.renderer, !b.current && s && (b.current = s(a, {
    visualState: e,
    parent: f,
    props: l,
    presenceContext: p,
    blockInitialAnimation: p ? p.initial === !1 : !1,
    reducedMotionConfig: g,
    skipAnimations: v,
    isSVG: c
  }), T.current && b.current && (b.current.manuallyAnimateOnMount = !0));
  const S = b.current, w = A.useContext(N2);
  S && !S.projection && r && (S.type === "html" || S.type === "svg") && W6(b.current, l, r, w);
  const E = A.useRef(!1);
  A.useInsertionEffect(() => {
    S && E.current && S.update(l, p);
  });
  const _ = l[Yv], j = A.useRef(!!_ && typeof window < "u" && !window.MotionHandoffIsComplete?.(_) && window.MotionHasOptimisedAnimation?.(_));
  return uh(() => {
    T.current = !0, S && (E.current = !0, window.MotionIsMounted = !0, S.updateFeatures(), S.scheduleRenderMicrotask(), j.current && S.animationState && S.animationState.animateChanges());
  }), A.useEffect(() => {
    S && (!j.current && S.animationState && S.animationState.animateChanges(), j.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(_);
    }), j.current = !1), S.enteringChildren = void 0);
  }), S;
}
function W6(a, e, l, s) {
  const { layoutId: r, layout: c, drag: f, dragConstraints: h, layoutScroll: p, layoutRoot: m, layoutAnchor: g, layoutCrossfade: v } = e;
  a.projection = new l(a.latestValues, e["data-framer-portal-id"] ? void 0 : O2(a.parent)), a.projection.setOptions({
    layoutId: r,
    layout: c,
    alwaysMeasureLayout: !!f || h && Vi(h),
    visualElement: a,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof c == "string" ? c : "both",
    initialPromotionConfig: s,
    crossfade: v,
    layoutScroll: p,
    layoutRoot: m,
    layoutAnchor: g
  });
}
function O2(a) {
  if (a)
    return a.options.allowProjection !== !1 ? a.projection : O2(a.parent);
}
function I6(a, { forwardMotionProps: e = !1, type: l } = {}, s, r) {
  const c = l ? l === "svg" : oh(a), f = c ? P6 : X6;
  function h(m, g) {
    let v;
    const b = {
      ...A.useContext(kd),
      ...m,
      layoutId: tw(m)
    }, { isStatic: T } = b, S = O6(m), w = f(m, T);
    if (!T && typeof window < "u") {
      ew();
      const E = nw(b);
      v = E.MeasureLayout, S.visualElement = J6(a, w, b, r, E.ProjectionNode, c);
    }
    return y.jsxs(jr.Provider, { value: S, children: [v && S.visualElement ? y.jsx(v, { visualElement: S.visualElement, ...b }) : null, $6(a, m, Q6(w, S.visualElement, g), w, T, e, c)] });
  }
  h.displayName = `motion.${typeof a == "string" ? a : `create(${a.displayName ?? a.name ?? ""})`}`;
  const p = A.forwardRef(h);
  return p[Z6] = a, p;
}
function tw({ layoutId: a }) {
  const e = A.useContext(Vd).id;
  return e && a !== void 0 ? e + "-" + a : a;
}
function ew(a, e) {
  A.useContext(Ud).strict;
}
function nw(a) {
  const e = D2(), { drag: l, layout: s } = e;
  if (!l && !s)
    return {};
  const r = { ...l, ...s };
  return {
    MeasureLayout: l?.isEnabled(a) || s?.isEnabled(a) ? r.MeasureLayout : void 0,
    ProjectionNode: r.ProjectionNode
  };
}
function ch(a, e) {
  return I6(a, e);
}
const aw = /* @__PURE__ */ ch("button"), Zi = /* @__PURE__ */ ch("div"), iw = /* @__PURE__ */ ch("span");
var lw = {
  topLeft: [
    { corner: "topRight", side: "top" },
    { corner: "bottomLeft", side: "left" }
  ],
  topRight: [
    { corner: "topLeft", side: "top" },
    { corner: "bottomRight", side: "right" }
  ],
  bottomLeft: [
    { corner: "bottomRight", side: "bottom" },
    { corner: "topLeft", side: "left" }
  ],
  bottomRight: [
    { corner: "bottomLeft", side: "bottom" },
    { corner: "topRight", side: "right" }
  ]
};
function sw({
  topLeftCornerRadius: a,
  topRightCornerRadius: e,
  bottomRightCornerRadius: l,
  bottomLeftCornerRadius: s,
  width: r,
  height: c
}) {
  const f = {
    topLeft: -1,
    topRight: -1,
    bottomLeft: -1,
    bottomRight: -1
  }, h = {
    topLeft: a,
    topRight: e,
    bottomLeft: s,
    bottomRight: l
  };
  Object.entries(h).sort(([, m], [, g]) => g - m).forEach(([m, g]) => {
    const v = lw[m], b = Math.min(
      ...v.map((T) => {
        const S = h[T.corner];
        if (g === 0 && S === 0)
          return 0;
        const w = f[T.corner], E = T.side === "top" || T.side === "bottom" ? r : c;
        return w >= 0 ? E - w : g / (g + S) * E;
      })
    );
    f[m] = b, h[m] = Math.min(g, b);
  });
  const p = (m) => ({
    radius: h[m],
    roundingAndSmoothingBudget: f[m]
  });
  return {
    topLeft: p("topLeft"),
    topRight: p("topRight"),
    bottomLeft: p("bottomLeft"),
    bottomRight: p("bottomRight")
  };
}
function ns(a) {
  return a * Math.PI / 180;
}
function Ke(a, ...e) {
  let l = a[0];
  for (let s = 0; s < e.length; s++) {
    const r = e[s];
    l += typeof r == "number" ? r.toFixed(4) : r ?? "", l += a[s + 1];
  }
  return l;
}
var ms = {
  p: 0,
  pathSegment: () => ""
};
function dn(a, e, l) {
  switch (l) {
    case "TR":
      return a;
    case "BR":
      return -e;
    case "BL":
      return -a;
    case "TL":
      return e;
  }
}
function hn(a, e, l) {
  switch (l) {
    case "TR":
      return e;
    case "BR":
      return a;
    case "BL":
      return -e;
    case "TL":
      return -a;
  }
}
var ow = ({
  cornerRadius: a,
  roundingAndSmoothingBudget: e
}) => {
  const l = Math.min(a, e);
  return l <= 0 ? ms : {
    p: l,
    pathSegment: (s) => {
      const r = dn(l, l, s), c = hn(l, l, s);
      return Ke`a ${l} ${l} 0 0 1 ${r} ${c}`;
    }
  };
};
function fh({
  cornerRadius: a,
  cornerSmoothing: e,
  preserveSmoothing: l,
  roundingAndSmoothingBudget: s
}) {
  if (a <= 0)
    return { a: 0, b: 0, c: 0, d: 0, p: 0, arcSectionLength: 0, cornerRadius: 0 };
  let r = (1 + e) * a;
  if (!l) {
    const S = s / a - 1;
    e = Math.min(e, S), r = Math.min(r, s);
  }
  const c = 90 * (1 - e), f = Math.sin(ns(c / 2)) * a * Math.sqrt(2), h = (90 - c) / 2, p = a * Math.tan(ns(h / 2)), m = 45 * e, g = p * Math.cos(ns(m)), v = g * Math.tan(ns(m));
  let b = (r - f - g - v) / 3, T = 2 * b;
  if (l && r > s) {
    const S = s - v - f - g, w = S / 6, E = S - w;
    b = Math.min(b, E), T = S - b, r = Math.min(r, s);
  }
  return { a: T, b, c: g, d: v, p: r, arcSectionLength: f, cornerRadius: a };
}
var rw = ({
  cornerRadius: a,
  smoothing: e,
  preserveSmoothing: l,
  roundingAndSmoothingBudget: s
}) => {
  const r = fh({
    cornerRadius: a,
    cornerSmoothing: e,
    preserveSmoothing: l,
    roundingAndSmoothingBudget: s
  });
  return r.cornerRadius <= 0 ? ms : {
    p: r.p,
    pathSegment: (c) => {
      switch (c) {
        case "TR":
          return uw(r);
        case "BR":
          return cw(r);
        case "BL":
          return fw(r);
        case "TL":
          return dw(r);
      }
    }
  };
};
function uw({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Ke`c ${e} 0 ${e + l} 0 ${e + l + s} ${r} a ${a} ${a} 0 0 1 ${c} ${c} c ${r} ${s} ${r} ${l + s} ${r} ${e + l + s}`;
}
function cw({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Ke`c 0 ${e} 0 ${e + l} ${-r} ${e + l + s} a ${a} ${a} 0 0 1 -${c} ${c} c ${-s} ${r} ${-(l + s)} ${r} ${-(e + l + s)} ${r}`;
}
function fw({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Ke`c ${-e} 0 ${-(e + l)} 0 ${-(e + l + s)} ${-r} a ${a} ${a} 0 0 1 -${c} -${c} c ${-r} ${-s} ${-r} ${-(l + s)} ${-r} ${-(e + l + s)}`;
}
function dw({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Ke`c 0 ${-e} 0 ${-(e + l)} ${r} ${-(e + l + s)} a ${a} ${a} 0 0 1 ${c} -${c} c ${s} ${-r} ${l + s} ${-r} ${e + l + s} ${-r}`;
}
var hw = ({
  cornerRadius: a,
  exponent: e,
  roundingAndSmoothingBudget: l
}) => {
  const s = Math.min(a, l);
  if (s <= 0) return ms;
  const r = Number.isFinite(e) ? Math.max(2, e) : 4, c = 2 / r, f = r === 2 ? (b) => b : r === 4 ? Math.sqrt : r === 8 ? (b) => Math.sqrt(Math.sqrt(b)) : (b) => Math.pow(b, c), h = c - 1, p = r === 2 ? () => 1 : r === 4 ? (b) => 1 / Math.sqrt(b) : (b) => Math.pow(b, h), m = [0, Math.PI / 6, Math.PI / 3, Math.PI / 2], g = m.map((b, T) => {
    if (T === 0) return [0, 0];
    if (T === m.length - 1) return [s, s];
    const S = Math.sin(b), w = Math.cos(b);
    return [s * f(S), s * (1 - f(w))];
  }), v = m.map((b, T) => {
    if (T === 0) return [1, 0];
    if (T === m.length - 1) return [0, 1];
    const S = Math.sin(b), w = Math.cos(b), E = c * p(S) * w * s, _ = c * p(w) * S * s, j = Math.hypot(E, _) || 1;
    return [E / j, _ / j];
  });
  return {
    p: s,
    pathSegment: (b) => {
      const T = [];
      for (let S = 0; S < m.length - 1; S++) {
        const [w, E] = g[S], [_, j] = g[S + 1], [M, D] = v[S], [L, V] = v[S + 1], R = (m[S] + m[S + 1]) / 2, q = Math.sin(R), X = Math.cos(R), Z = s * f(q), et = s * (1 - f(X)), F = 8 / 3 * (Z - (w + _) / 2), W = 8 / 3 * (et - (E + j) / 2), nt = L * D - V * M, st = nt !== 0 ? (-V * F + L * W) / nt : 0, z = nt !== 0 ? (M * W - D * F) / nt : 0, P = w + st * M, tt = E + st * D, at = _ - z * L, ut = j - z * V, N = P - w, G = tt - E, I = at - w, it = ut - E, ft = _ - w, ht = j - E, gt = dn(N, G, b), Nt = hn(N, G, b), jt = dn(I, it, b), Pt = hn(I, it, b), Kt = dn(ft, ht, b), je = hn(ft, ht, b);
        T.push(Ke`c ${gt} ${Nt} ${jt} ${Pt} ${Kt} ${je}`);
      }
      return T.join(" ");
    }
  };
};
function eg(a, e, l, s) {
  if (s <= 0) return { x: 0, y: 0, theta: a };
  const c = s / 32;
  let f = 0, h = 0;
  for (let m = 1; m <= 32; m++) {
    const g = (m - 1) * c, v = g + c, b = (g + v) / 2, T = a + e * g + l / 2 * g * g, S = a + e * v + l / 2 * v * v, w = a + e * b + l / 2 * b * b;
    f += c / 6 * (Math.cos(T) + 4 * Math.cos(w) + Math.cos(S)), h += c / 6 * (Math.sin(T) + 4 * Math.sin(w) + Math.sin(S));
  }
  const p = a + e * s + l / 2 * s * s;
  return { x: f, y: h, theta: p };
}
var mw = 1e-6, pw = ({
  cornerRadius: a,
  smoothing: e,
  roundingAndSmoothingBudget: l
}) => {
  if (a <= 0) return ms;
  const s = Math.max(0, Math.min(1, e)), r = a, c = Math.PI / 4 * s, f = Math.PI / 2 * r * s, h = f > 0 ? 1 / (r * f) : 0, { x: p, y: m } = f > 0 ? eg(0, 0, h, f) : { x: 0, y: 0 }, { x: g, y: v } = f > 0 ? eg(0, 0, h, f / 2) : { x: 0, y: 0 }, b = p - r * Math.sin(c), T = m + r * Math.cos(c), S = b + T;
  let w = S, E = r, _ = p, j = m, M = g, D = v;
  if (S > l && S > 0) {
    const X = l / S;
    w = l, E = r * X, _ = p * X, j = m * X, M = g * X, D = v * X;
  }
  if (w <= 0)
    return ms;
  let L = 0, V = 0;
  if (f > 0) {
    const X = Math.cos(c), Z = Math.sin(c);
    Z > 1e-12 && (V = 8 / 3 * (j / 2 - D) / Z), L = 8 / 3 * (M - _ / 2) + V * X;
  }
  const R = Math.PI / 2 - 2 * c, q = Math.abs(R) > mw;
  return {
    p: w,
    pathSegment: (X) => {
      const Z = [];
      if (f > 0) {
        const et = L, F = 0, W = _ - V * Math.cos(c), nt = j - V * Math.sin(c), st = _, z = j, P = dn(et, F, X), tt = hn(et, F, X), at = dn(W, nt, X), ut = hn(W, nt, X), N = dn(st, z, X), G = hn(st, z, X);
        Z.push(Ke`c ${P} ${tt} ${at} ${ut} ${N} ${G}`);
      }
      if (q) {
        const et = w - _ - j, F = w - _ - j, W = dn(et, F, X), nt = hn(et, F, X);
        Z.push(Ke`a ${E} ${E} 0 0 1 ${W} ${nt}`);
      }
      if (f > 0) {
        const et = V * Math.sin(c), F = V * Math.cos(c), W = j, nt = _ - L, st = j, z = _, P = dn(et, F, X), tt = hn(et, F, X), at = dn(W, nt, X), ut = hn(W, nt, X), N = dn(st, z, X), G = hn(st, z, X);
        Z.push(Ke`c ${P} ${tt} ${at} ${ut} ${N} ${G}`);
      }
      return Z.join(" ");
    }
  };
}, yw = 4, gw = {
  arc: ow,
  squircle: rw,
  superellipse: hw,
  clothoid: pw
};
function vw(a) {
  return gw[a];
}
var bw = 64, $a = /* @__PURE__ */ new Map();
function xw(a, e) {
  return a + "|" + e.cornerRadius + "|" + e.smoothing + "|" + e.exponent + "|" + (e.preserveSmoothing ? 1 : 0) + "|" + e.roundingAndSmoothingBudget;
}
function Sw(a) {
  return !Number.isFinite(a.cornerRadius) || !Number.isFinite(a.smoothing) || !Number.isFinite(a.exponent) || !Number.isFinite(a.roundingAndSmoothingBudget);
}
function ww(a) {
  const e = {};
  return {
    p: a.p,
    pathSegment: (l) => {
      const s = e[l];
      if (s !== void 0) return s;
      const r = a.pathSegment(l);
      return e[l] = r, r;
    }
  };
}
function Tw(a, e, l) {
  if (Sw(l)) return e(l);
  const s = xw(a, l), r = $a.get(s);
  if (r)
    return $a.delete(s), $a.set(s, r), r;
  const c = ww(e(l));
  if ($a.size >= bw) {
    const f = $a.keys().next().value;
    f !== void 0 && $a.delete(f);
  }
  return $a.set(s, c), c;
}
function $o(a, e, l, s) {
  const r = Math.min(e, s / a - 1), c = fh({
    cornerRadius: a,
    cornerSmoothing: r,
    preserveSmoothing: l,
    roundingAndSmoothingBudget: s
  }), f = c.a + c.b + c.c;
  return {
    p: c.p,
    a: c.a,
    b: c.b,
    c: c.c,
    d: c.d,
    e: f,
    ax: c.p - f,
    ay: a - c.d,
    R: a
  };
}
function Cw({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Ke`c ${a} 0 ${a + e} 0 ${r} ${s} a ${h} ${h} 0 0 1 ${c} ${f} a ${h} ${h} 0 0 1 ${-c} ${f} c ${-l} ${s} ${-(e + l)} ${s} ${-r} ${s}`;
}
function Ew({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Ke`c ${-a} 0 ${-(a + e)} 0 ${-r} ${-s} a ${h} ${h} 0 0 1 ${-c} ${-f} a ${h} ${h} 0 0 1 ${c} ${-f} c ${l} ${-s} ${e + l} ${-s} ${r} ${-s}`;
}
function Aw({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Ke`c 0 ${-a} 0 ${-(a + e)} ${s} ${-r} a ${h} ${h} 0 0 1 ${f} ${-c} a ${h} ${h} 0 0 1 ${f} ${c} c ${s} ${l} ${s} ${e + l} ${s} ${r}`;
}
function Mw({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Ke`c 0 ${a} 0 ${a + e} ${-s} ${r} a ${h} ${h} 0 0 1 ${-f} ${c} a ${h} ${h} 0 0 1 ${-f} ${-c} c ${-s} ${-l} ${-s} ${-(e + l)} ${-s} ${-r}`;
}
function ng(a, e, l, s) {
  const r = fh({
    cornerRadius: a,
    cornerSmoothing: e,
    preserveSmoothing: l,
    roundingAndSmoothingBudget: s
  }), c = ns(45 * e);
  return {
    a: r.a,
    b: r.b,
    p: r.p,
    sin: Math.sin(c),
    cos: Math.cos(c)
  };
}
var ag = (a, e, l) => Math.max(0, Math.min(a / e - 1, l)), re = (a) => (Object.is(a, -0) ? 0 : a).toFixed(4);
function jw(a, e, l, s, r) {
  const c = ng(l, ag(a / 2, l, s), r, a / 2), f = ng(l, ag(e / 2, l, s), r, e / 2), h = (b, T, S, w, E, _) => {
    const j = w === 0 ? c : f, M = _ === 0 ? c : f, D = b + (S + E) * l, L = T + (w + _) * l, V = D - E * l * j.cos - S * l * j.sin, R = L - _ * l * j.cos - w * l * j.sin, q = D - S * l * M.cos - E * l * M.sin, X = L - w * l * M.cos - _ * l * M.sin, Z = b + S * j.p, et = T + w * j.p, F = Math.hypot(q - V, X - R) > 1e-6, W = F ? q : V, nt = F ? X : R, st = b + E * M.p, z = T + _ * M.p;
    let P = `L ${re(Z)} ${re(et)} `;
    return P += `c ${re(-S * j.a)} ${re(-w * j.a)} ${re(-S * (j.a + j.b))} ${re(-w * (j.a + j.b))} ${re(V - Z)} ${re(R - et)} `, F && (P += `a ${re(l)} ${re(l)} 0 0 1 ${re(q - V)} ${re(X - R)} `), P += `c ${re(st - E * (M.a + M.b) - W)} ${re(z - _ * (M.a + M.b) - nt)} ${re(st - E * M.a - W)} ${re(z - _ * M.a - nt)} ${re(st - W)} ${re(z - nt)}`, P;
  }, p = h(a, 0, -1, 0, 0, 1), m = h(a, e, 0, -1, -1, 0), g = h(0, e, 1, 0, 0, -1), v = h(0, 0, 0, 1, 1, 0);
  return `M ${re(c.p)} 0 ${p} ${m} ${g} ${v} Z`;
}
var _w = 0.6, Rw = !0, Dw = "squircle";
function z2(a) {
  return {
    radius: a.radius,
    curve: a.curve ?? Dw,
    smoothing: a.smoothing ?? _w,
    exponent: a.exponent ?? yw,
    preserveSmoothing: a.preserveSmoothing ?? Rw
  };
}
function Go(a) {
  return z2(typeof a == "number" ? { radius: a } : a ?? { radius: 0 });
}
function Nw(a) {
  if ("radius" in a) {
    const e = z2(a);
    return { topLeft: e, topRight: e, bottomRight: e, bottomLeft: e };
  }
  return {
    topLeft: Go(a.topLeft),
    topRight: Go(a.topRight),
    bottomRight: Go(a.bottomRight),
    bottomLeft: Go(a.bottomLeft)
  };
}
function L2(a, e, l) {
  if (a <= 0 || e <= 0)
    return "M 0 0 H 0 V 0 H 0 Z";
  const s = Nw(l);
  if (s.topLeft.radius <= 0 && s.topRight.radius <= 0 && s.bottomRight.radius <= 0 && s.bottomLeft.radius <= 0)
    return `M 0 0 H ${a} V ${e} H 0 Z`;
  const r = sw({
    topLeftCornerRadius: s.topLeft.radius,
    topRightCornerRadius: s.topRight.radius,
    bottomRightCornerRadius: s.bottomRight.radius,
    bottomLeftCornerRadius: s.bottomLeft.radius,
    width: a,
    height: e
  }), c = (j) => {
    const M = s[j], D = vw(M.curve);
    return Tw(M.curve, D, {
      cornerRadius: r[j].radius,
      smoothing: M.smoothing,
      exponent: M.exponent,
      preserveSmoothing: M.preserveSmoothing,
      roundingAndSmoothingBudget: r[j].roundingAndSmoothingBudget
    });
  }, f = (j) => {
    let M;
    return () => M ?? (M = c(j));
  }, h = f("topLeft"), p = f("topRight"), m = f("bottomRight"), g = f("bottomLeft"), v = (j) => j.toFixed(4), b = (j) => j.length > 0 ? " " + j : "", T = s.topLeft;
  if (Ow(s)) {
    const j = Math.min(T.radius, a / 2, e / 2), M = Math.min(a, e) / 2, D = 1e-9;
    if (j > 0 && M > j + D && M < (1 + T.smoothing) * j - D)
      return jw(a, e, j, T.smoothing, T.preserveSmoothing);
  }
  const S = 1e-9, w = a >= e, E = w ? e / 2 : a / 2, _ = (j, M) => {
    const D = s[j], L = s[M];
    return D.curve === "squircle" && L.curve === "squircle" && Math.abs(r[j].radius - E) < S && Math.abs(r[M].radius - E) < S && D.smoothing === L.smoothing && D.preserveSmoothing === L.preserveSmoothing;
  };
  if (w) {
    const j = _("topRight", "bottomRight"), M = _("topLeft", "bottomLeft");
    if (j || M) {
      const D = a / 2, L = j ? $o(E, s.topRight.smoothing, s.topRight.preserveSmoothing, D) : null, V = M ? $o(E, s.topLeft.smoothing, s.topLeft.preserveSmoothing, D) : null;
      let R = "M " + v(V ? V.p : h().p) + " 0";
      return R += " L " + v(a - (L ? L.p : p().p)) + " 0", L ? R += " " + Cw(L) : (R += b(p().pathSegment("TR")), R += " L " + v(a) + " " + v(m().p), R += " L " + v(a) + " " + v(e - m().p), R += b(m().pathSegment("BR"))), V ? (R += " L " + v(V.p) + " " + v(e), R += " " + Ew(V)) : (R += " L " + v(a - g().p) + " " + v(e), R += " L " + v(g().p) + " " + v(e), R += b(g().pathSegment("BL")), R += " L 0 " + v(e - h().p), R += " L 0 " + v(h().p), R += b(h().pathSegment("TL"))), R + " Z";
    }
  } else {
    const j = _("topLeft", "topRight"), M = _("bottomLeft", "bottomRight");
    if (j || M) {
      const D = e / 2, L = j ? $o(E, s.topLeft.smoothing, s.topLeft.preserveSmoothing, D) : null, V = M ? $o(E, s.bottomLeft.smoothing, s.bottomLeft.preserveSmoothing, D) : null;
      let R;
      return L ? R = "M 0 " + v(L.p) + " " + Aw(L) : (R = "M " + v(h().p) + " 0", R += " L " + v(a - p().p) + " 0", R += b(p().pathSegment("TR"))), R += " L " + v(a) + " " + v(e - (V ? V.p : m().p)), V ? R += " " + Mw(V) : (R += b(m().pathSegment("BR")), R += " L " + v(g().p) + " " + v(e), R += b(g().pathSegment("BL"))), L ? R += " L 0 " + v(L.p) : (R += " L 0 " + v(e - h().p), R += " L 0 " + v(h().p), R += b(h().pathSegment("TL"))), R + " Z";
    }
  }
  return "M " + v(h().p) + " 0 L " + v(a - p().p) + " 0" + b(p().pathSegment("TR")) + " L " + v(a) + " " + v(m().p) + " L " + v(a) + " " + v(e - m().p) + b(m().pathSegment("BR")) + " L " + v(a - g().p) + " " + v(e) + " L " + v(g().p) + " " + v(e) + b(g().pathSegment("BL")) + " L 0 " + v(e - h().p) + " L 0 " + v(h().p) + b(h().pathSegment("TL")) + " Z";
}
function Ow(a) {
  const e = a.topLeft;
  return e.curve === "squircle" && [a.topRight, a.bottomRight, a.bottomLeft].every(
    (l) => l.curve === "squircle" && l.radius === e.radius && l.smoothing === e.smoothing && l.preserveSmoothing === e.preserveSmoothing
  );
}
function zw(a, e, l) {
  return `path("${L2(a, e, l)}")`;
}
var Ut = "http://www.w3.org/2000/svg", Lw = 0;
function dh() {
  return ++Lw;
}
function B2(a) {
  const e = a.replace("#", "");
  return e.length === 3 ? "#" + e[0] + e[0] + e[1] + e[1] + e[2] + e[2] : "#" + e;
}
function V2(a) {
  const e = B2(a).replace("#", "");
  return `rgb(${parseInt(e.substring(0, 2), 16)},${parseInt(e.substring(2, 4), 16)},${parseInt(e.substring(4, 6), 16)})`;
}
var Bw = {
  offsetX: 0,
  offsetY: 0,
  blur: 0,
  spread: 0,
  color: "#000",
  opacity: 0
};
function U2(a) {
  const e = /* @__PURE__ */ new Map(), l = JSON.stringify(a);
  return (s, r, c, f) => {
    const h = `${s}:${r}:${f}:${l}`;
    let p = e.get(h);
    return p === void 0 && (p = L2(s, r, c), e.set(h, p)), p;
  };
}
function k2(a, e) {
  if (e === 0) return a;
  if ("radius" in a)
    return { ...a, radius: Math.max(0, a.radius + e) };
  const l = (s) => {
    if (s !== void 0)
      return typeof s == "number" ? Math.max(0, s + e) : { ...s, radius: Math.max(0, s.radius + e) };
  };
  return {
    topLeft: l(a.topLeft),
    topRight: l(a.topRight),
    bottomRight: l(a.bottomRight),
    bottomLeft: l(a.bottomLeft)
  };
}
function yd(a) {
  const e = B2(a).replace("#", ""), l = parseInt(e.substring(0, 2), 16), s = parseInt(e.substring(2, 4), 16), r = parseInt(e.substring(4, 6), 16);
  if (l === 0 && s === 0 && r === 0) return "#4c4c4c";
  const c = Math.round(l * 2 / 3), f = Math.round(s * 2 / 3), h = Math.round(r * 2 / 3);
  return "#" + (1 << 24 | c << 16 | f << 8 | h).toString(16).slice(1);
}
function gd(a) {
  return typeof a == "object" && a !== null && "type" in a;
}
function Vw(a) {
  const e = (90 - a) * Math.PI / 180;
  return {
    x1: 0.5 - 0.5 * Math.cos(e),
    y1: 0.5 + 0.5 * Math.sin(e),
    x2: 0.5 + 0.5 * Math.cos(e),
    y2: 0.5 - 0.5 * Math.sin(e)
  };
}
function H2(a, e) {
  for (; a.lastChild; ) a.removeChild(a.lastChild);
  for (const l of e) {
    const s = document.createElementNS(Ut, "stop");
    s.setAttribute("offset", String(l.offset)), s.setAttribute("stop-color", l.color), l.opacity !== void 0 && l.opacity !== 1 && s.setAttribute("stop-opacity", String(l.opacity)), a.appendChild(s);
  }
}
function Uw(a, e, l) {
  const s = e.type === "linear" ? "linearGradient" : "radialGradient", r = document.createElementNS(Ut, s);
  return r.setAttribute("id", l), q2(r, e), H2(r, e.stops), a.appendChild(r), r;
}
function kw(a, e) {
  q2(a, e), H2(a, e.stops);
}
function q2(a, e) {
  if (e.type === "linear") {
    const l = Vw(e.angle ?? 0);
    a.setAttribute("x1", String(l.x1)), a.setAttribute("y1", String(l.y1)), a.setAttribute("x2", String(l.x2)), a.setAttribute("y2", String(l.y2));
  } else
    a.setAttribute("cx", String(e.cx ?? 0.5)), a.setAttribute("cy", String(e.cy ?? 0.5)), a.setAttribute("r", String(e.r ?? 0.5));
}
function ig(a) {
  return { ...a, stops: a.stops.map((e) => ({ ...e, color: yd(e.color) })) };
}
function vd(a, e, l, s) {
  a.setAttribute("x", String(-e)), a.setAttribute("y", String(-e)), a.setAttribute("width", String(l + e * 2)), a.setAttribute("height", String(s + e * 2));
}
function Yo(a, e, l, s, r) {
  vd(a, l, s, r), vd(e, l, s, r);
}
function Cf(a, e, l) {
  const s = document.createElementNS(Ut, "mask");
  s.setAttribute("id", a), l && s.setAttribute("maskUnits", "userSpaceOnUse");
  const r = document.createElementNS(Ut, "rect");
  r.setAttribute("fill", "white");
  const c = document.createElementNS(Ut, "path");
  return c.setAttribute("fill", "none"), c.setAttribute("stroke", "black"), s.appendChild(r), s.appendChild(c), e.appendChild(s), { mask: s, rect: r, knockout: c };
}
function Ef(a) {
  const e = document.createElementNS(Ut, "g"), l = document.createElementNS(Ut, "path");
  l.setAttribute("fill", "none"), a && l.setAttribute(a.attr, a.value), l.style.display = "none", e.appendChild(l);
  const s = document.createElementNS(Ut, "path");
  return s.setAttribute("fill", "none"), a && s.setAttribute(a.attr, a.value), s.style.display = "none", e.appendChild(s), { group: e, strokePath: l, grooveOverlay: s };
}
function fr(a, e) {
  const l = e === "main" ? "gradientEl" : "overlayGradientEl";
  a[l]?.remove(), a[l] = null;
}
function Xo(a, e, l) {
  if (!gd(a))
    return fr(e, l), a;
  const s = l === "main" ? "gradientEl" : "overlayGradientEl", r = l === "main" ? e.gradientId : e.overlayGradientId;
  return e[s] ? kw(e[s], a) : e[s] = Uw(e.defs, a, r), `url(#${r})`;
}
function Af(a, e, l, s, r) {
  if (!a || a.width <= 0 || a.opacity <= 0) {
    r.strokePath.style.display = "none", r.strokeGroup.removeAttribute("mask"), r.grooveOverlay.style.display = "none", fr(r, "main"), fr(r, "overlay");
    return;
  }
  const c = r.strokeMultiplier;
  r.strokePath.style.display = "", r.strokePath.setAttribute("d", e), r.strokePath.setAttribute("stroke", Xo(a.color, r, "main")), r.strokePath.setAttribute("stroke-width", String(a.width * c)), r.strokePath.setAttribute("stroke-opacity", String(a.opacity));
  const f = a.style ?? "solid";
  switch (r.strokeGroup.removeAttribute("mask"), r.grooveOverlay.style.display = "none", r.strokePath.removeAttribute("stroke-dasharray"), r.strokePath.setAttribute("stroke-linecap", "butt"), f !== "groove" && f !== "ridge" && fr(r, "overlay"), f) {
    case "dashed": {
      const h = Math.max(0, a.dash ?? a.width * 3), p = Math.max(0, a.gap ?? a.width * 2);
      r.strokePath.setAttribute("stroke-dasharray", `${h} ${p}`), a.lineCap && r.strokePath.setAttribute("stroke-linecap", a.lineCap);
      break;
    }
    case "dotted": {
      const h = Math.max(0, a.dash ?? 0), p = Math.max(0, a.gap ?? a.width * 2);
      r.strokePath.setAttribute("stroke-dasharray", `${h} ${p}`), r.strokePath.setAttribute("stroke-linecap", a.lineCap ?? "round");
      break;
    }
    case "double":
      if (a.width >= 3) {
        const h = Math.round(a.width / 3);
        r.dblKnockout.setAttribute("d", e), r.dblKnockout.setAttribute("stroke-width", String(h * c)), r.dblRect.setAttribute("width", String(l)), r.dblRect.setAttribute("height", String(s)), r.padDblMask && r.padDblMask(a.width, l, s), r.strokeGroup.setAttribute("mask", `url(#${r.dblMaskId})`);
      }
      break;
    case "groove": {
      const h = gd(a.color) ? ig(a.color) : yd(a.color);
      r.strokePath.setAttribute("stroke", Xo(h, r, "main")), r.grooveOverlay.style.display = "", r.grooveOverlay.setAttribute("d", e), r.grooveOverlay.setAttribute("stroke", Xo(a.color, r, "overlay")), r.grooveOverlay.setAttribute("stroke-width", String(a.width * c / 2)), r.grooveOverlay.setAttribute("stroke-opacity", String(a.opacity));
      break;
    }
    case "ridge": {
      const h = gd(a.color) ? ig(a.color) : yd(a.color);
      r.grooveOverlay.style.display = "", r.grooveOverlay.setAttribute("d", e), r.grooveOverlay.setAttribute("stroke", Xo(h, r, "overlay")), r.grooveOverlay.setAttribute("stroke-width", String(a.width * c / 2)), r.grooveOverlay.setAttribute("stroke-opacity", String(a.opacity));
      break;
    }
  }
}
function Hw(a, e) {
  const l = dh(), s = `sc-ishadow-mask-${l}`, r = document.createElementNS(Ut, "mask");
  r.setAttribute("id", s), r.setAttribute("maskUnits", "userSpaceOnUse");
  const c = document.createElementNS(Ut, "rect");
  c.setAttribute("fill", "white");
  const f = document.createElementNS(Ut, "path");
  f.setAttribute("fill", "black"), r.appendChild(c), r.appendChild(f), a.appendChild(r);
  const h = `sc-ishadow-blur-${l}`, p = document.createElementNS(Ut, "filter");
  p.setAttribute("id", h), p.setAttribute("x", "-200%"), p.setAttribute("y", "-200%"), p.setAttribute("width", "500%"), p.setAttribute("height", "500%"), p.setAttribute("color-interpolation-filters", "sRGB");
  const m = document.createElementNS(Ut, "feGaussianBlur");
  m.setAttribute("stdDeviation", "0"), p.appendChild(m), a.appendChild(p);
  const g = document.createElementNS(Ut, "g"), v = document.createElementNS(Ut, "rect");
  return v.setAttribute("mask", `url(#${s})`), v.style.display = "none", g.appendChild(v), e.appendChild(g), { maskId: s, mask: r, maskRect: c, maskCutout: f, filterId: h, filter: p, feBlur: m, blurGroup: g, rect: v };
}
function qw(a) {
  a.mask.remove(), a.filter.remove(), a.blurGroup.remove();
}
function $w(a) {
  const e = dh(), l = `sc-clip-${e}`, s = `sc-mask-${e}`, r = document.createElementNS(Ut, "svg");
  r.style.position = "absolute", r.style.inset = "0", r.style.pointerEvents = "none", r.style.overflow = "visible", r.style.zIndex = "1", r.setAttribute("aria-hidden", "true");
  const c = document.createElementNS(Ut, "defs"), f = document.createElementNS(Ut, "clipPath");
  f.setAttribute("id", l);
  const h = document.createElementNS(Ut, "path");
  f.appendChild(h), c.appendChild(f);
  const p = document.createElementNS(Ut, "mask");
  p.setAttribute("id", s), p.setAttribute("maskUnits", "userSpaceOnUse");
  const m = document.createElementNS(Ut, "rect");
  m.setAttribute("fill", "white");
  const g = document.createElementNS(Ut, "path");
  g.setAttribute("fill", "black"), p.appendChild(m), p.appendChild(g), c.appendChild(p);
  const v = `sc-dbl-inner-${e}`, { rect: b, knockout: T } = Cf(v, c, !1), S = `sc-dbl-outer-${e}`, { mask: w, rect: E, knockout: _ } = Cf(S, c, !0), j = `sc-dbl-middle-${e}`, { mask: M, rect: D, knockout: L } = Cf(j, c, !0);
  r.appendChild(c);
  const V = document.createElementNS(Ut, "g");
  V.setAttribute("clip-path", `url(#${l})`), r.appendChild(V);
  const R = [], { group: q, strokePath: X, grooveOverlay: Z } = Ef({ attr: "clip-path", value: `url(#${l})` });
  r.appendChild(q);
  const { group: et, strokePath: F, grooveOverlay: W } = Ef({ attr: "mask", value: `url(#${s})` });
  r.appendChild(et);
  const { group: nt, strokePath: st, grooveOverlay: z } = Ef();
  r.appendChild(nt), a.appendChild(r);
  const P = {
    strokePath: X,
    grooveOverlay: Z,
    strokeGroup: q,
    dblMaskId: v,
    dblKnockout: T,
    dblRect: b,
    strokeMultiplier: 2,
    defs: c,
    gradientEl: null,
    gradientId: `sc-grad-inner-${e}`,
    overlayGradientEl: null,
    overlayGradientId: `sc-grad-inner-ov-${e}`
  }, tt = {
    strokePath: F,
    grooveOverlay: W,
    strokeGroup: et,
    dblMaskId: S,
    dblKnockout: _,
    dblRect: E,
    strokeMultiplier: 2,
    defs: c,
    gradientEl: null,
    gradientId: `sc-grad-outer-${e}`,
    overlayGradientEl: null,
    overlayGradientId: `sc-grad-outer-ov-${e}`,
    padDblMask: (ut, N, G) => Yo(w, E, ut, N, G)
  }, at = {
    strokePath: st,
    grooveOverlay: z,
    strokeGroup: nt,
    dblMaskId: j,
    dblKnockout: L,
    dblRect: D,
    strokeMultiplier: 1,
    defs: c,
    gradientEl: null,
    gradientId: `sc-grad-middle-${e}`,
    overlayGradientEl: null,
    overlayGradientId: `sc-grad-middle-ov-${e}`,
    padDblMask: (ut, N, G) => Yo(M, D, ut, N, G)
  };
  return {
    update(ut, N, G, I) {
      if (G <= 0 || I <= 0) return;
      r.setAttribute("width", String(G)), r.setAttribute("height", String(I)), r.setAttribute("viewBox", `0 0 ${G} ${I}`);
      const it = U2(ut), ft = it(G, I, ut, 0);
      h.setAttribute("d", ft), g.setAttribute("d", ft), m.setAttribute("width", String(G)), m.setAttribute("height", String(I)), Af(N.innerBorder, ft, G, I, P);
      const ht = N.outerBorder;
      ht && ht.width > 0 && ht.opacity > 0 && Yo(p, m, ht.width, G, I), Af(ht, ft, G, I, tt), Af(N.middleBorder, ft, G, I, at);
      const gt = N.innerShadow, Nt = gt == null ? [] : Array.isArray(gt) ? gt : [gt];
      for (; R.length < Nt.length; )
        R.push(Hw(c, V));
      for (; R.length > Nt.length; )
        qw(R.pop());
      for (let jt = 0; jt < Nt.length; jt++) {
        const Pt = Nt[jt], Kt = R[jt];
        if (Pt.opacity <= 0) {
          Kt.rect.style.display = "none";
          continue;
        }
        Kt.rect.style.display = "";
        const je = Pt.spread, el = Math.max(Pt.blur * 3, 20) + Math.max(Math.abs(Pt.offsetX), Math.abs(Pt.offsetY)) + Math.abs(je);
        Yo(Kt.mask, Kt.maskRect, el, G, I);
        const Cn = Math.max(1, G - je * 2), nl = Math.max(1, I - je * 2), al = je !== 0 ? k2(ut, -je) : ut;
        Kt.maskCutout.setAttribute("d", it(Cn, nl, al, -je)), Kt.maskCutout.setAttribute(
          "transform",
          `translate(${Pt.offsetX + je},${Pt.offsetY + je})`
        ), Pt.blur > 0 ? (Kt.feBlur.setAttribute("stdDeviation", String(Pt.blur)), Kt.blurGroup.setAttribute("filter", `url(#${Kt.filterId})`)) : Kt.blurGroup.removeAttribute("filter"), vd(Kt.rect, el, G, I), Kt.rect.setAttribute("fill", V2(Pt.color)), Kt.rect.setAttribute("fill-opacity", String(Pt.opacity));
      }
    },
    destroy() {
      r.remove();
    }
  };
}
function Gw(a, e) {
  return Math.ceil(3 * a + Math.abs(e) + 1);
}
function Yw(a, e, l, s) {
  a.setAttribute("x", String(-s)), a.setAttribute("y", String(-s)), a.setAttribute("width", String(e + 2 * s)), a.setAttribute("height", String(l + 2 * s));
}
function Xw(a, e) {
  const l = `sc-shadow-${dh()}`, s = document.createElementNS(Ut, "filter");
  s.setAttribute("id", l), s.setAttribute("filterUnits", "userSpaceOnUse"), s.setAttribute("color-interpolation-filters", "sRGB");
  const r = document.createElementNS(Ut, "feGaussianBlur");
  r.setAttribute("stdDeviation", "0"), s.appendChild(r), a.appendChild(s);
  const c = document.createElementNS(Ut, "path");
  return e.appendChild(c), { filterId: l, filterEl: s, feBlur: r, pathEl: c };
}
function Pw(a) {
  a.filterEl.remove(), a.pathEl.remove();
}
function Kw(a) {
  const e = a.style.isolation;
  a.style.isolation = "isolate";
  const l = document.createElementNS(Ut, "svg");
  l.style.cssText = "position:absolute;inset:0;overflow:visible;pointer-events:none;z-index:-1", l.setAttribute("width", "100%"), l.setAttribute("height", "100%"), l.setAttribute("aria-hidden", "true");
  const s = document.createElementNS(Ut, "defs");
  l.appendChild(s), a.appendChild(l);
  const r = [];
  return {
    update(c, f, h, p) {
      const m = Array.isArray(f) ? f : [f];
      if (!(h > 0 && p > 0 && m.some((T) => T.opacity > 0))) {
        l.style.display = "none";
        return;
      }
      for (; r.length < m.length; ) r.push(Xw(s, l));
      for (; r.length > m.length; ) Pw(r.pop());
      const v = U2(c);
      let b = !1;
      for (let T = 0; T < m.length; T++) {
        const S = m[T], w = r[m.length - 1 - T];
        if (S.opacity <= 0) {
          w.pathEl.style.display = "none";
          continue;
        }
        const E = S.spread, _ = h + E * 2, j = p + E * 2;
        if (_ <= 0 || j <= 0) {
          w.pathEl.style.display = "none";
          continue;
        }
        b = !0, w.pathEl.style.display = "";
        const M = V2(S.color), D = k2(c, E);
        if (w.pathEl.setAttribute("d", v(_, j, D, E)), w.pathEl.setAttribute("transform", `translate(${S.offsetX - E},${S.offsetY - E})`), w.pathEl.setAttribute("fill", M), w.pathEl.setAttribute("fill-opacity", String(S.opacity)), S.blur > 0) {
          const L = Gw(S.blur, E);
          Yw(w.filterEl, _, j, L), w.feBlur.setAttribute("stdDeviation", String(S.blur)), w.pathEl.setAttribute("filter", `url(#${w.filterId})`);
        } else
          w.pathEl.removeAttribute("filter");
      }
      l.style.display = b ? "" : "none";
    },
    destroy() {
      l.remove(), a.style.isolation = e;
    }
  };
}
var rs = null, ga, as = /* @__PURE__ */ new Map(), ps = /* @__PURE__ */ new Set();
function $2() {
  ga = void 0;
  const a = [...ps];
  ps.clear();
  for (const e of a) {
    const l = as.get(e);
    if (l) for (const s of [...l]) s();
  }
}
function Zw() {
  return rs || (rs = new ResizeObserver((a) => {
    for (const e of a)
      ps.add(e.target);
    ga === void 0 && (ga = requestAnimationFrame($2));
  })), rs;
}
function Qw(a, e) {
  if (typeof ResizeObserver > "u") return () => {
  };
  const l = Zw();
  let s = as.get(a);
  return s || (s = /* @__PURE__ */ new Set(), as.set(a, s), l.observe(a)), s.add(e), ps.add(a), ga === void 0 && (ga = requestAnimationFrame($2)), () => {
    s.delete(e), s.size === 0 && (as.delete(a), l.unobserve(a)), as.size === 0 && (ga !== void 0 && (cancelAnimationFrame(ga), ga = void 0), ps.clear(), rs?.disconnect(), rs = null);
  };
}
function Fw(a) {
  const e = window.getComputedStyle(a), l = (m) => m.endsWith("px") ? parseFloat(m) : NaN, s = l(e.width), r = l(e.height);
  if (Number.isNaN(s) || Number.isNaN(r))
    return { width: a.offsetWidth, height: a.offsetHeight };
  if (e.boxSizing === "border-box")
    return { width: s, height: r };
  const c = (parseFloat(e.paddingLeft) || 0) + (parseFloat(e.paddingRight) || 0), f = (parseFloat(e.paddingTop) || 0) + (parseFloat(e.paddingBottom) || 0), h = (parseFloat(e.borderLeftWidth) || 0) + (parseFloat(e.borderRightWidth) || 0), p = (parseFloat(e.borderTopWidth) || 0) + (parseFloat(e.borderBottomWidth) || 0);
  return { width: s + c + h, height: r + f + p };
}
function G2(a) {
  const e = a.match(
    /^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)(?:\s*[,/]\s*([\d.]+))?\s*\)$/
  );
  if (!e) return;
  const l = Number(e[1]), s = Number(e[2]), r = Number(e[3]), c = e[4] !== void 0 ? Number(e[4]) : 1;
  return { hex: "#" + (1 << 24 | l << 16 | s << 8 | r).toString(16).slice(1), opacity: c };
}
function Jw(a) {
  const e = getComputedStyle(a), l = e.borderTopStyle;
  if (l === "none" || l === "hidden") return;
  const s = parseFloat(e.borderTopWidth);
  if (s <= 0 || isNaN(s)) return;
  const r = G2(e.borderTopColor);
  if (!r || r.opacity <= 0) return;
  const f = {
    solid: "solid",
    dashed: "dashed",
    dotted: "dotted",
    double: "double",
    groove: "groove",
    ridge: "ridge"
  }[l];
  return {
    width: s,
    color: r.hex,
    opacity: r.opacity,
    ...f && f !== "solid" ? { style: f } : {}
  };
}
function Ww(a) {
  if (!a || a === "none") return {};
  const e = [];
  let l = 0, s = 0;
  for (let f = 0; f < a.length; f++)
    a[f] === "(" ? l++ : a[f] === ")" ? l-- : a[f] === "," && l === 0 && (e.push(a.slice(s, f).trim()), s = f + 1);
  e.push(a.slice(s).trim());
  const r = [], c = [];
  for (const f of e) {
    const h = f.includes("inset"), p = f.replace("inset", "").trim(), m = p.match(/rgba?\([^)]+\)/);
    if (!m) continue;
    const g = G2(m[0]);
    if (!g || g.opacity <= 0) continue;
    const b = p.replace(m[0], "").trim().split(/\s+/).map(parseFloat).filter((S) => !isNaN(S));
    if (b.length < 2) continue;
    const T = {
      offsetX: b[0],
      offsetY: b[1],
      blur: b[2] ?? 0,
      spread: b[3] ?? 0,
      color: g.hex,
      opacity: g.opacity
    };
    (h ? c : r).push(T);
  }
  return {
    shadow: r.length > 0 ? r : void 0,
    innerShadow: c.length > 0 ? c : void 0
  };
}
function lg(a) {
  const e = {
    border: a.style.border,
    boxShadow: a.style.boxShadow,
    paddingTop: a.style.paddingTop,
    paddingRight: a.style.paddingRight,
    paddingBottom: a.style.paddingBottom,
    paddingLeft: a.style.paddingLeft
  }, l = Jw(a), s = getComputedStyle(a), { shadow: r, innerShadow: c } = Ww(s.boxShadow), f = s.boxSizing, h = parseFloat(s.borderTopWidth) || 0, p = parseFloat(s.borderRightWidth) || 0, m = parseFloat(s.borderBottomWidth) || 0, g = parseFloat(s.borderLeftWidth) || 0, v = parseFloat(s.paddingTop) || 0, b = parseFloat(s.paddingRight) || 0, T = parseFloat(s.paddingBottom) || 0, S = parseFloat(s.paddingLeft) || 0;
  l && (a.style.border = "0"), (r || c) && (a.style.boxShadow = "none"), l && f === "content-box" && (h > 0 || p > 0 || m > 0 || g > 0) && (a.style.paddingTop = v + h + "px", a.style.paddingRight = b + p + "px", a.style.paddingBottom = T + m + "px", a.style.paddingLeft = S + g + "px");
  const w = {};
  return l && (w.innerBorder = l), r && (w.shadow = r), c && (w.innerShadow = c), { effects: w, savedStyles: e };
}
function hh(a) {
  return a ? !!(a.innerBorder || a.outerBorder || a.middleBorder || a.innerShadow || a.shadow) : !1;
}
function Y2(a, e) {
  return { ...a?.effects, ...e };
}
function sg(a, e) {
  a.style.border = e.border, a.style.boxShadow = e.boxShadow, a.style.paddingTop = e.paddingTop, a.style.paddingRight = e.paddingRight, a.style.paddingBottom = e.paddingBottom, a.style.paddingLeft = e.paddingLeft;
}
var $i = /* @__PURE__ */ new WeakMap();
function Iw(a) {
  const e = $i.get(a) ?? 0;
  if (e > 0)
    return $i.set(a, e + 1), !0;
  const l = getComputedStyle(a).position;
  return l !== "static" && l !== "" ? !1 : ($i.set(a, 1), a.style.position = "relative", !0);
}
function tT(a) {
  const e = $i.get(a);
  e !== void 0 && (e <= 1 ? ($i.delete(a), a.style.position = "") : $i.set(a, e - 1));
}
var Po = typeof window < "u" ? A.useLayoutEffect : A.useEffect;
function eT(a, e, l, s, r, c) {
  l.update(a, e, r, c), s?.update(a, e.shadow ?? Bw, r, c);
}
function Mf(a, e) {
  const l = Y2(a.extracted, e.effectsPropRef.current);
  hh(l) && X2(a, l, e.wrapperRefRef.current, e.skipShadowHandleRef.current);
  const { width: s, height: r } = Fw(a.el);
  if (s <= 0 || r <= 0) return;
  const c = e.syncKeyRef.current;
  s === a.lastWidth && r === a.lastHeight && c === a.lastSyncKey || (a.lastWidth = s, a.lastHeight = r, a.lastSyncKey = c, a.el.style.clipPath = zw(s, r, e.optionsRef.current), a.el.setAttribute("data-state", "ready"), a.effectsHandle && eT(e.optionsRef.current, l, a.effectsHandle, a.shadowHandle, s, r));
}
function X2(a, e, l, s) {
  if (!a.anchor) {
    const r = l?.current ?? a.el.parentElement;
    if (!r) return;
    a.anchor = r, a.didAcquire = Iw(r);
  }
  a.effectsHandle || (a.effectsHandle = $w(a.anchor)), !a.shadowHandle && e.shadow && !s && (a.shadowHandle = Kw(a.anchor));
}
function P2(a, e, l) {
  const { wrapperRef: s, effects: r, autoEffects: c, skipShadowHandle: f, onExtractedShadow: h } = l ?? {}, p = A.useRef(e);
  p.current = e;
  const m = A.useRef(r);
  m.current = r;
  const g = A.useRef(s);
  g.current = s;
  const v = A.useRef(f ?? !1);
  v.current = f ?? !1;
  const b = A.useRef(h);
  b.current = h;
  const T = JSON.stringify(e), S = JSON.stringify(r ?? null), w = c ?? !0, E = f ?? !1, _ = A.useRef("");
  _.current = `${T}|${S}`;
  const j = A.useRef({
    optionsRef: p,
    effectsPropRef: m,
    wrapperRefRef: g,
    skipShadowHandleRef: v,
    onExtractedShadowRef: b,
    syncKeyRef: _
  }), M = A.useRef(null);
  Po(() => {
    const D = a.current;
    if (!D) return;
    const L = D.style.clipPath;
    D.setAttribute("data-slot", "smooth-corners"), D.setAttribute("data-state", "pending");
    const V = w ? lg(D) : void 0, R = {
      el: D,
      savedClipPath: L,
      extracted: V,
      effectsHandle: void 0,
      shadowHandle: void 0,
      anchor: null,
      didAcquire: !1,
      lastWidth: 0,
      lastHeight: 0,
      lastSyncKey: null
    };
    M.current = R;
    const q = Y2(R.extracted, m.current);
    hh(q) && X2(R, q, g.current, v.current), b.current?.(R.extracted?.effects.shadow);
    const X = Qw(D, () => Mf(R, j.current));
    return () => {
      X(), R.effectsHandle?.destroy(), R.shadowHandle?.destroy(), R.extracted && sg(D, R.extracted.savedStyles), b.current?.(void 0), R.didAcquire && R.anchor && tT(R.anchor), M.current = null, D.style.clipPath = L, D.removeAttribute("data-slot"), D.removeAttribute("data-state");
    };
  }, [a]), Po(() => {
    const D = M.current;
    D && Mf(D, j.current);
  }), Po(() => {
    if (!E) return;
    const D = M.current;
    !D || !D.shadowHandle || (D.shadowHandle.destroy(), D.shadowHandle = void 0, D.lastSyncKey = null);
  }, [E]), Po(() => {
    const D = M.current;
    if (!D) return;
    const L = D.extracted !== void 0;
    if (w && !L)
      D.extracted = lg(D.el);
    else if (!w && L)
      sg(D.el, D.extracted.savedStyles), D.extracted = void 0;
    else
      return;
    b.current?.(D.extracted?.effects.shadow), D.lastSyncKey = null, Mf(D, j.current);
  }, [w]);
}
function K2(...a) {
  return (e) => {
    for (const l of a)
      l && (typeof l == "function" ? l(e) : l.current = e);
  };
}
function nT(a, e) {
  const l = { ...a };
  for (const s of Object.keys(e)) {
    const r = e[s], c = l[s];
    /^on[A-Z]/.test(s) && typeof r == "function" ? typeof c == "function" ? l[s] = (...f) => {
      r(...f);
      const h = f[0];
      h && h.defaultPrevented || c(...f);
    } : l[s] = r : s === "className" ? l[s] = [c, r].filter(Boolean).join(" ") : s === "style" ? l[s] = { ...c, ...r } : l[s] = r;
  }
  return l;
}
function aT(a, e) {
  const { children: l, ...s } = a, r = A.Children.toArray(l);
  if (r.length === 0)
    throw new Error("Slot: `asChild` expects a single child element, received none.");
  if (r.length > 1)
    throw new Error(
      "Slot: `asChild` expects a single child element, received " + r.length + "."
    );
  const c = r[0];
  if (!A.isValidElement(c))
    throw new Error(
      "Slot: `asChild` expects a React element as its child (e.g. <button>), not a " + (typeof c == "string" ? "string." : typeof c + ".")
    );
  if (c.type === A.Fragment)
    throw new Error(
      "Slot: `asChild` expects a single element as its child, not a Fragment. Unwrap the Fragment so Slot can merge props onto a real element."
    );
  const f = c, h = f.props ?? {}, p = h.ref ?? f.ref, m = nT(s, h);
  return A.cloneElement(f, {
    ...m,
    ref: K2(e, p)
  });
}
var iT = A.forwardRef(aT);
function lT(a) {
  const e = Array.isArray(a) ? a : [a], l = [];
  for (const s of e) {
    if (s.opacity <= 0) continue;
    const { offsetX: r, offsetY: c, blur: f, spread: h, color: p, opacity: m } = s, g = sT(p);
    l.push(
      `${r}px ${c}px ${f}px ${h}px rgba(${g.r},${g.g},${g.b},${m})`
    );
  }
  return l.join(", ");
}
function sT(a) {
  const e = a.replace("#", ""), l = e.length === 3 ? e[0] + e[0] + e[1] + e[1] + e[2] + e[2] : e;
  return {
    r: parseInt(l.substring(0, 2), 16),
    g: parseInt(l.substring(2, 4), 16),
    b: parseInt(l.substring(4, 6), 16)
  };
}
function oT(a) {
  if ("radius" in a) return `${a.radius}px`;
  const e = (f) => f === void 0 ? 0 : typeof f == "number" ? f : f.radius, l = e(a.topLeft), s = e(a.topRight), r = e(a.bottomRight), c = e(a.bottomLeft);
  return `${l}px ${s}px ${r}px ${c}px`;
}
function rT(a, e) {
  const {
    as: l,
    asChild: s,
    children: r,
    corners: c,
    innerBorder: f,
    outerBorder: h,
    middleBorder: p,
    innerShadow: m,
    shadow: g,
    autoEffects: v,
    shadowStrategy: b,
    ...T
  } = a, S = l ?? "div", w = A.useRef(null), E = A.useRef(null), _ = A.useMemo(
    () => K2(w, e),
    [e]
  ), j = c ?? { radius: 0 }, M = b === "box-shadow", D = M ? void 0 : g, [L, V] = A.useState(void 0), R = A.useCallback(
    (st) => V(st),
    []
  ), q = {
    innerBorder: f,
    outerBorder: h,
    middleBorder: p,
    innerShadow: m,
    shadow: D
  }, X = hh(q), Z = M ? g ?? L : void 0, et = (v ?? !0) || X || Z !== void 0;
  P2(w, j, {
    wrapperRef: et ? E : void 0,
    effects: X ? q : void 0,
    autoEffects: v,
    skipShadowHandle: M,
    onExtractedShadow: M ? R : void 0
  });
  const W = s ? A.createElement(iT, { ...T, ref: _ }, r) : A.createElement(S, { ...T, ref: _ }, r);
  if (!et) return W;
  let nt = null;
  if (M && Z !== void 0) {
    const st = lT(Z);
    if (st !== "") {
      const z = {
        position: "absolute",
        inset: 0,
        borderRadius: oT(j),
        boxShadow: st,
        pointerEvents: "none",
        zIndex: -1
      };
      nt = A.createElement("div", {
        "aria-hidden": !0,
        "data-slot": "smooth-corners-box-shadow",
        style: z
      });
    }
  }
  return A.createElement(
    "div",
    {
      ref: E,
      style: {
        position: "relative",
        // `isolation: isolate` keeps the z-index:-1 sibling from sinking
        // behind ancestors — same trick the SVG path uses.
        ...nt ? { isolation: "isolate" } : {}
      }
    },
    nt,
    W
  );
}
A.forwardRef(rT);
function og(a, e) {
  if (typeof a == "function")
    return a(e);
  a != null && (a.current = e);
}
function uT(...a) {
  return (e) => {
    let l = !1;
    const s = a.map((r) => {
      const c = og(r, e);
      return !l && typeof c == "function" && (l = !0), c;
    });
    if (l)
      return () => {
        for (let r = 0; r < s.length; r++) {
          const c = s[r];
          typeof c == "function" ? c() : og(a[r], null);
        }
      };
  };
}
function cT(...a) {
  return A.useCallback(uT(...a), a);
}
class fT extends A.Component {
  getSnapshotBeforeUpdate(e) {
    const l = this.props.childRef.current;
    if (ar(l) && e.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = l.offsetParent, r = ar(s) && s.offsetWidth || 0, c = ar(s) && s.offsetHeight || 0, f = getComputedStyle(l), h = this.props.sizeRef.current;
      h.height = parseFloat(f.height), h.width = parseFloat(f.width), h.top = l.offsetTop, h.left = l.offsetLeft, h.right = r - h.width - h.left, h.bottom = c - h.height - h.top, h.direction = f.direction;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function dT({ children: a, isPresent: e, anchorX: l, anchorY: s, root: r, pop: c }) {
  const f = A.useId(), h = A.useRef(null), p = A.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    direction: "ltr"
  }), { nonce: m } = A.useContext(kd), g = a.props?.ref ?? a?.ref, v = cT(h, g);
  return A.useInsertionEffect(() => {
    const { width: b, height: T, top: S, left: w, right: E, bottom: _, direction: j } = p.current;
    if (e || c === !1 || !h.current || !b || !T)
      return;
    const M = j === "rtl", D = l === "left" ? M ? `right: ${E}` : `left: ${w}` : M ? `left: ${w}` : `right: ${E}`, L = s === "bottom" ? `bottom: ${_}` : `top: ${S}`;
    h.current.dataset.motionPopId = f;
    const V = document.createElement("style");
    m && (V.nonce = m);
    const R = r ?? document.head;
    return R.appendChild(V), V.sheet && V.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${b}px !important;
            height: ${T}px !important;
            ${D}px !important;
            ${L}px !important;
          }
        `), () => {
      h.current?.removeAttribute("data-motion-pop-id"), R.contains(V) && R.removeChild(V);
    };
  }, [e]), y.jsx(fT, { isPresent: e, childRef: h, sizeRef: p, pop: c, children: c === !1 ? a : A.cloneElement(a, { ref: v }) });
}
const hT = ({ children: a, initial: e, isPresent: l, onExitComplete: s, custom: r, presenceAffectsLayout: c, mode: f, anchorX: h, anchorY: p, root: m }) => {
  const g = rh(mT), v = A.useId(), b = A.useRef(l), T = A.useRef(s);
  uh(() => {
    b.current = l, T.current = s;
  });
  let S = !0, w = A.useMemo(() => (S = !1, {
    id: v,
    initial: e,
    isPresent: l,
    custom: r,
    onExitComplete: (E) => {
      g.set(E, !0);
      for (const _ of g.values())
        if (!_)
          return;
      s && s();
    },
    register: (E) => (g.set(E, !1), () => {
      g.delete(E), !b.current && !g.size && T.current?.();
    })
  }), [l, g, s]);
  return c && S && (w = { ...w }), A.useMemo(() => {
    g.forEach((E, _) => g.set(_, !1));
  }, [l]), A.useEffect(() => {
    !l && !g.size && s && s();
  }, [l]), a = y.jsx(dT, { pop: f === "popLayout", isPresent: l, anchorX: h, anchorY: p, root: m, children: a }), y.jsx(Nr.Provider, { value: w, children: a });
};
function mT() {
  return /* @__PURE__ */ new Map();
}
function Z2(a = !0) {
  const e = A.useContext(Nr);
  if (e === null)
    return [!0, null];
  const { isPresent: l, onExitComplete: s, register: r } = e, c = A.useId();
  A.useEffect(() => {
    if (a)
      return r(c);
  }, [a]);
  const f = A.useCallback(() => a && s && s(c), [c, s, a]);
  return !l && s ? [!1, f] : [!0];
}
const Ko = (a) => a.key || "";
function rg(a) {
  const e = [];
  return A.Children.forEach(a, (l) => {
    A.isValidElement(l) && e.push(l);
  }), e;
}
const pT = ({ children: a, custom: e, initial: l = !0, onExitComplete: s, presenceAffectsLayout: r = !0, mode: c = "sync", propagate: f = !1, anchorX: h = "left", anchorY: p = "top", root: m }) => {
  const [g, v] = Z2(f), b = A.useMemo(() => rg(a), [a]), T = f && !g ? [] : b.map(Ko), S = A.useRef(!0), w = A.useRef(b), E = rh(() => /* @__PURE__ */ new Map()), _ = A.useRef(/* @__PURE__ */ new Set()), [j, M] = A.useState(b), [D, L] = A.useState(b);
  uh(() => {
    S.current = !1, w.current = b;
    for (let q = 0; q < D.length; q++) {
      const X = Ko(D[q]);
      T.includes(X) ? (E.delete(X), _.current.delete(X)) : E.get(X) !== !0 && E.set(X, !1);
    }
  }, [D, T.length, T.join("-")]);
  const V = [];
  if (b !== j) {
    let q = [...b];
    for (let X = 0; X < D.length; X++) {
      const Z = D[X], et = Ko(Z);
      T.includes(et) || (q.splice(X, 0, Z), V.push(Z));
    }
    return c === "wait" && V.length && (q = V), L(rg(q)), M(b), null;
  }
  const { forceRender: R } = A.useContext(Vd);
  return y.jsx(y.Fragment, { children: D.map((q) => {
    const X = Ko(q), Z = f && !g ? !1 : b === D || T.includes(X), et = () => {
      if (_.current.has(X))
        return;
      if (E.has(X))
        _.current.add(X), E.set(X, !0);
      else
        return;
      let F = !0;
      E.forEach((W) => {
        W || (F = !1);
      }), F && (R?.(), L(w.current), f && v?.(), s && s());
    };
    return y.jsx(hT, { isPresent: Z, initial: !S.current || l ? void 0 : !1, custom: e, presenceAffectsLayout: r, mode: c, root: m, onExitComplete: Z ? void 0 : et, anchorX: h, anchorY: p, children: q }, X);
  }) });
};
function yT({ children: a, features: e, strict: l = !1 }) {
  const [, s] = A.useState(!jf(e)), r = A.useRef(void 0);
  if (!jf(e)) {
    const { renderer: c, ...f } = e;
    r.current = c, tg(f);
  }
  return A.useEffect(() => {
    jf(e) && e().then(({ renderer: c, ...f }) => {
      tg(f), r.current = c, s(!0);
    });
  }, []), y.jsx(Ud.Provider, { value: { renderer: r.current, strict: l }, children: a });
}
function jf(a) {
  return typeof a == "function";
}
const gT = (a, e) => e.isSVG ?? oh(a) ? new k9(e) : new O9(e, {
  allowProjection: a !== A.Fragment
});
class vT extends wa {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(e) {
    super(e), e.animationState || (e.animationState = Y9(e));
  }
  updateAnimationControlsSubscription() {
    const { animate: e } = this.node.getProps();
    Rr(e) && (this.unmountControls = e.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: e } = this.node.getProps(), { animate: l } = this.node.prevProps || {};
    e !== l && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let bT = 0;
class xT extends wa {
  constructor() {
    super(...arguments), this.id = bT++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: e, onExitComplete: l } = this.node.presenceContext, { isPresent: s } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || e === s)
      return;
    if (e && s === !1) {
      if (this.isExitComplete) {
        const { initial: c, custom: f } = this.node.getProps();
        if (typeof c == "string" || typeof c == "object" && c !== null && !Array.isArray(c)) {
          const h = Ja(this.node, c, f);
          if (h) {
            const { transition: p, transitionEnd: m, ...g } = h;
            for (const v in g)
              this.node.getValue(v)?.jump(g[v]);
          }
        }
        this.node.animationState.reset(), this.node.animationState.animateChanges();
      } else
        this.node.animationState.setActive("exit", !1);
      this.isExitComplete = !1;
      return;
    }
    const r = this.node.animationState.setActive("exit", !e);
    l && !e && r.then(() => {
      this.isExitComplete = !0, l(this.id);
    });
  }
  mount() {
    const { register: e, onExitComplete: l } = this.node.presenceContext || {};
    l && l(this.id), e && (this.unmount = e(this.id));
  }
  unmount() {
  }
}
const ST = {
  animation: {
    Feature: vT
  },
  exit: {
    Feature: xT
  }
};
function Ss(a) {
  return {
    point: {
      x: a.pageX,
      y: a.pageY
    }
  };
}
const wT = (a) => (e) => Id(e) && a(e, Ss(e));
function us(a, e, l, s) {
  return hs(a, e, wT(l), s);
}
const Q2 = ({ current: a }) => a ? a.ownerDocument.defaultView : null, ug = (a, e) => Math.abs(a - e);
function TT(a, e) {
  const l = ug(a.x, e.x), s = ug(a.y, e.y);
  return Math.sqrt(l ** 2 + s ** 2);
}
const cg = /* @__PURE__ */ new Set(["auto", "scroll"]);
class F2 {
  constructor(e, l, { transformPagePoint: s, contextWindow: r = window, dragSnapToOrigin: c = !1, distanceThreshold: f = 3, element: h } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (S) => {
      this.handleScroll(S.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = Zo(this.lastRawMoveEventInfo, this.transformPagePoint));
      const S = _f(this.lastMoveEventInfo, this.history), w = this.startEvent !== null, E = TT(S.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!w && !E)
        return;
      const { point: _ } = S, { timestamp: j } = be;
      this.history.push({ ..._, timestamp: j });
      const { onStart: M, onMove: D } = this.handlers;
      w || (M && M(this.lastMoveEvent, S), this.startEvent = this.lastMoveEvent), D && D(this.lastMoveEvent, S);
    }, this.handlePointerMove = (S, w) => {
      this.lastMoveEvent = S, this.lastRawMoveEventInfo = w, this.lastMoveEventInfo = Zo(w, this.transformPagePoint), qt.update(this.updatePoint, !0);
    }, this.handlePointerUp = (S, w) => {
      this.end();
      const { onEnd: E, onSessionEnd: _, resumeAnimation: j } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && j && j(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const M = _f(S.type === "pointercancel" ? this.lastMoveEventInfo : Zo(w, this.transformPagePoint), this.history);
      this.startEvent && E && E(S, M), _ && _(S, M);
    }, !Id(e))
      return;
    this.dragSnapToOrigin = c, this.handlers = l, this.transformPagePoint = s, this.distanceThreshold = f, this.contextWindow = r || window;
    const p = Ss(e), m = Zo(p, this.transformPagePoint), { point: g } = m, { timestamp: v } = be;
    this.history = [{ ...g, timestamp: v }];
    const { onSessionStart: b } = l;
    b && b(e, _f(m, this.history));
    const T = { passive: !0, capture: !0 };
    this.removeListeners = vs(us(this.contextWindow, "pointermove", this.handlePointerMove, T), us(this.contextWindow, "pointerup", this.handlePointerUp, T), us(this.contextWindow, "pointercancel", this.handlePointerUp, T)), h && this.startScrollTracking(h);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(e) {
    let l = e.parentElement;
    for (; l; ) {
      const s = getComputedStyle(l);
      (cg.has(s.overflowX) || cg.has(s.overflowY)) && this.scrollPositions.set(l, {
        x: l.scrollLeft,
        y: l.scrollTop
      }), l = l.parentElement;
    }
    this.scrollPositions.set(window, {
      x: window.scrollX,
      y: window.scrollY
    }), window.addEventListener("scroll", this.onElementScroll, {
      capture: !0
    }), window.addEventListener("scroll", this.onWindowScroll), this.removeScrollListeners = () => {
      window.removeEventListener("scroll", this.onElementScroll, {
        capture: !0
      }), window.removeEventListener("scroll", this.onWindowScroll);
    };
  }
  /**
   * Handle scroll compensation during drag.
   *
   * For element scroll: adjusts history origin since pageX/pageY doesn't change.
   * For window scroll: adjusts lastMoveEventInfo since pageX/pageY would change.
   */
  handleScroll(e) {
    const l = this.scrollPositions.get(e);
    if (!l)
      return;
    const s = e === window, r = s ? { x: window.scrollX, y: window.scrollY } : {
      x: e.scrollLeft,
      y: e.scrollTop
    }, c = { x: r.x - l.x, y: r.y - l.y };
    c.x === 0 && c.y === 0 || (s ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += c.x, this.lastMoveEventInfo.point.y += c.y) : this.history.length > 0 && (this.history[0].x -= c.x, this.history[0].y -= c.y), this.scrollPositions.set(e, r), qt.update(this.updatePoint, !0));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), xa(this.updatePoint);
  }
}
function Zo(a, e) {
  return e ? { point: e(a.point) } : a;
}
function fg(a, e) {
  return { x: a.x - e.x, y: a.y - e.y };
}
function _f({ point: a }, e) {
  return {
    point: a,
    delta: fg(a, J2(e)),
    offset: fg(a, CT(e)),
    velocity: ET(e, 0.1)
  };
}
function CT(a) {
  return a[0];
}
function J2(a) {
  return a[a.length - 1];
}
function ET(a, e) {
  if (a.length < 2)
    return { x: 0, y: 0 };
  let l = a.length - 1, s = null;
  const r = J2(a);
  for (; l >= 0 && (s = a[l], !(r.timestamp - s.timestamp > /* @__PURE__ */ Pe(e))); )
    l--;
  if (!s)
    return { x: 0, y: 0 };
  s === a[0] && a.length > 2 && r.timestamp - s.timestamp > /* @__PURE__ */ Pe(e) * 2 && (s = a[1]);
  const c = /* @__PURE__ */ ln(r.timestamp - s.timestamp);
  if (c === 0)
    return { x: 0, y: 0 };
  const f = {
    x: (r.x - s.x) / c,
    y: (r.y - s.y) / c
  };
  return f.x === 1 / 0 && (f.x = 0), f.y === 1 / 0 && (f.y = 0), f;
}
function AT(a, { min: e, max: l }, s) {
  return e !== void 0 && a < e ? a = s ? Ht(e, a, s.min) : Math.max(a, e) : l !== void 0 && a > l && (a = s ? Ht(l, a, s.max) : Math.min(a, l)), a;
}
function dg(a, e, l) {
  return {
    min: e !== void 0 ? a.min + e : void 0,
    max: l !== void 0 ? a.max + l - (a.max - a.min) : void 0
  };
}
function MT(a, { top: e, left: l, bottom: s, right: r }) {
  return {
    x: dg(a.x, l, r),
    y: dg(a.y, e, s)
  };
}
function hg(a, e) {
  let l = e.min - a.min, s = e.max - a.max;
  return e.max - e.min < a.max - a.min && ([l, s] = [s, l]), { min: l, max: s };
}
function jT(a, e) {
  return {
    x: hg(a.x, e.x),
    y: hg(a.y, e.y)
  };
}
function _T(a, e) {
  let l = 0.5;
  const s = Ae(a), r = Ae(e);
  return r > s ? l = /* @__PURE__ */ cs(e.min, e.max - s, a.min) : s > r && (l = /* @__PURE__ */ cs(a.min, a.max - r, e.min)), Tn(0, 1, l);
}
function RT(a, e) {
  const l = {};
  return e.min !== void 0 && (l.min = e.min - a.min), e.max !== void 0 && (l.max = e.max - a.min), l;
}
const bd = 0.35;
function DT(a = bd) {
  return a === !1 ? a = 0 : a === !0 && (a = bd), {
    x: mg(a, "left", "right"),
    y: mg(a, "top", "bottom")
  };
}
function mg(a, e, l) {
  return {
    min: pg(a, e),
    max: pg(a, l)
  };
}
function pg(a, e) {
  return typeof a == "number" ? a : a[e] || 0;
}
const NT = /* @__PURE__ */ new WeakMap();
class OT {
  constructor(e) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = ue(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = e;
  }
  start(e, { snapToCursor: l = !1, distanceThreshold: s } = {}) {
    const { presenceContext: r } = this.visualElement;
    if (r && r.isPresent === !1)
      return;
    const c = (v) => {
      l && this.snapToCursor(Ss(v).point), this.stopAnimation();
    }, f = (v, b) => {
      const { drag: T, dragPropagation: S, onDragStart: w } = this.getProps();
      if (T && !S && (this.openDragLock && this.openDragLock(), this.openDragLock = I5(T), !this.openDragLock))
        return;
      this.latestPointerEvent = v, this.latestPanInfo = b, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), xn((_) => {
        let j = this.getAxisMotionValue(_).get() || 0;
        if (wn.test(j)) {
          const { projection: M } = this.visualElement;
          if (M && M.layout) {
            const D = M.layout.layoutBox[_];
            D && (j = Ae(D) * (parseFloat(j) / 100));
          }
        }
        this.originPoint[_] = j;
      }), w && qt.update(() => w(v, b), !1, !0), od(this.visualElement, "transform");
      const { animationState: E } = this.visualElement;
      E && E.setActive("whileDrag", !0);
    }, h = (v, b) => {
      this.latestPointerEvent = v, this.latestPanInfo = b;
      const { dragPropagation: T, dragDirectionLock: S, onDirectionLock: w, onDrag: E } = this.getProps();
      if (!T && !this.openDragLock)
        return;
      const { offset: _ } = b;
      if (S && this.currentDirection === null) {
        this.currentDirection = LT(_), this.currentDirection !== null && w && w(this.currentDirection);
        return;
      }
      this.updateAxis("x", b.point, _), this.updateAxis("y", b.point, _), this.visualElement.render(), E && qt.update(() => E(v, b), !1, !0);
    }, p = (v, b) => {
      this.latestPointerEvent = v, this.latestPanInfo = b, this.stop(v, b), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, m = () => {
      const { dragSnapToOrigin: v } = this.getProps();
      (v || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: g } = this.getProps();
    this.panSession = new F2(e, {
      onSessionStart: c,
      onStart: f,
      onMove: h,
      onSessionEnd: p,
      resumeAnimation: m
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: g,
      distanceThreshold: s,
      contextWindow: Q2(this.visualElement),
      element: this.visualElement.current
    });
  }
  /**
   * @internal
   */
  stop(e, l) {
    const s = e || this.latestPointerEvent, r = l || this.latestPanInfo, c = this.isDragging;
    if (this.cancel(), !c || !r || !s)
      return;
    const { velocity: f } = r;
    this.startAnimation(f);
    const { onDragEnd: h } = this.getProps();
    h && qt.postRender(() => h(s, r));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: e, animationState: l } = this.visualElement;
    e && (e.isAnimationBlocked = !1), this.endPanSession();
    const { dragPropagation: s } = this.getProps();
    !s && this.openDragLock && (this.openDragLock(), this.openDragLock = null), l && l.setActive("whileDrag", !1);
  }
  /**
   * Clean up the pan session without modifying other drag state.
   * This is used during unmount to ensure event listeners are removed
   * without affecting projection animations or drag locks.
   * @internal
   */
  endPanSession() {
    this.panSession && this.panSession.end(), this.panSession = void 0;
  }
  updateAxis(e, l, s) {
    const { drag: r } = this.getProps();
    if (!s || !Qo(e, r, this.currentDirection))
      return;
    const c = this.getAxisMotionValue(e);
    let f = this.originPoint[e] + s[e];
    this.constraints && this.constraints[e] && (f = AT(f, this.constraints[e], this.elastic[e])), c.set(f);
  }
  resolveConstraints() {
    const { dragConstraints: e, dragElastic: l } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, r = this.constraints;
    e && Vi(e) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : e && s ? this.constraints = MT(s.layoutBox, e) : this.constraints = !1, this.elastic = DT(l), r !== this.constraints && !Vi(e) && s && this.constraints && !this.hasMutatedConstraints && xn((c) => {
      this.constraints !== !1 && this.getAxisMotionValue(c) && (this.constraints[c] = RT(s.layoutBox[c], this.constraints[c]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: l } = this.getProps();
    if (!e || !Vi(e))
      return !1;
    const s = e.current, { projection: r } = this.visualElement;
    if (!r || !r.layout)
      return !1;
    r.root && (r.root.scroll = void 0, r.root.updateScroll());
    const c = M9(s, r.root, this.visualElement.getTransformPagePoint());
    let f = jT(r.layout.layoutBox, c);
    if (l) {
      const h = l(C9(f));
      this.hasMutatedConstraints = !!h, h && (f = s2(h));
    }
    return f;
  }
  startAnimation(e) {
    const { drag: l, dragMomentum: s, dragElastic: r, dragTransition: c, dragSnapToOrigin: f, onDragTransitionEnd: h } = this.getProps(), p = this.constraints || {}, m = xn((g) => {
      if (!Qo(g, l, this.currentDirection))
        return;
      let v = p && p[g] || {};
      (f === !0 || f === g) && (v = { min: 0, max: 0 });
      const b = r ? 200 : 1e6, T = r ? 40 : 1e7, S = {
        type: "inertia",
        velocity: s ? e[g] : 0,
        bounceStiffness: b,
        bounceDamping: T,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...c,
        ...v
      };
      return this.startAxisValueAnimation(g, S);
    });
    return Promise.all(m).then(h);
  }
  startAxisValueAnimation(e, l) {
    const s = this.getAxisMotionValue(e);
    return od(this.visualElement, e), s.start(Zd(e, s, 0, l, this.visualElement, !1));
  }
  stopAnimation() {
    xn((e) => this.getAxisMotionValue(e).stop());
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(e) {
    const l = `_drag${e.toUpperCase()}`, r = this.visualElement.getProps()[l];
    return r || this.visualElement.getValue(e, this.visualElement.latestValues[e] ?? 0);
  }
  snapToCursor(e) {
    xn((l) => {
      const { drag: s } = this.getProps();
      if (!Qo(l, s, this.currentDirection))
        return;
      const { projection: r } = this.visualElement, c = this.getAxisMotionValue(l);
      if (r && r.layout) {
        const { min: f, max: h } = r.layout.layoutBox[l], p = c.get() || 0;
        c.set(e[l] - Ht(f, h, 0.5) + p);
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: e, dragConstraints: l } = this.getProps(), { projection: s } = this.visualElement;
    if (!Vi(l) || !s || !this.constraints)
      return;
    this.stopAnimation();
    const r = { x: 0, y: 0 };
    xn((f) => {
      const h = this.getAxisMotionValue(f);
      if (h && this.constraints !== !1) {
        const p = h.get();
        r[f] = _T({ min: p, max: p }, this.constraints[f]);
      }
    });
    const { transformTemplate: c } = this.visualElement.getProps();
    this.visualElement.current.style.transform = c ? c({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.constraints = !1, this.resolveConstraints(), xn((f) => {
      if (!Qo(f, e, null))
        return;
      const h = this.getAxisMotionValue(f), { min: p, max: m } = this.constraints[f];
      h.set(Ht(p, m, r[f]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    NT.set(this.visualElement, this);
    const e = this.visualElement.current, l = us(e, "pointerdown", (m) => {
      const { drag: g, dragListener: v = !0 } = this.getProps(), b = m.target, T = b !== e && l9(b);
      g && v && !T && this.start(m);
    });
    let s;
    const r = () => {
      const { dragConstraints: m } = this.getProps();
      Vi(m) && m.current && (this.constraints = this.resolveRefConstraints(), s || (s = zT(e, m.current, () => this.scalePositionWithinConstraints())));
    }, { projection: c } = this.visualElement, f = c.addEventListener("measure", r);
    c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()), qt.read(r);
    const h = hs(window, "resize", () => this.scalePositionWithinConstraints()), p = c.addEventListener("didUpdate", (({ delta: m, hasLayoutChanged: g }) => {
      this.isDragging && g && (xn((v) => {
        const b = this.getAxisMotionValue(v);
        b && (this.originPoint[v] += m[v].translate, b.set(b.get() + m[v].translate));
      }), this.visualElement.render());
    }));
    return () => {
      h(), l(), f(), p && p(), s && s();
    };
  }
  getProps() {
    const e = this.visualElement.getProps(), { drag: l = !1, dragDirectionLock: s = !1, dragPropagation: r = !1, dragConstraints: c = !1, dragElastic: f = bd, dragMomentum: h = !0 } = e;
    return {
      ...e,
      drag: l,
      dragDirectionLock: s,
      dragPropagation: r,
      dragConstraints: c,
      dragElastic: f,
      dragMomentum: h
    };
  }
}
function yg(a) {
  let e = !0;
  return () => {
    if (e) {
      e = !1;
      return;
    }
    a();
  };
}
function zT(a, e, l) {
  const s = yy(a, yg(l)), r = yy(e, yg(l));
  return () => {
    s(), r();
  };
}
function Qo(a, e, l) {
  return (e === !0 || e === a) && (l === null || l === a);
}
function LT(a, e = 10) {
  let l = null;
  return Math.abs(a.y) > e ? l = "y" : Math.abs(a.x) > e && (l = "x"), l;
}
class BT extends wa {
  constructor(e) {
    super(e), this.removeGroupControls = sn, this.removeListeners = sn, this.controls = new OT(e);
  }
  mount() {
    const { dragControls: e } = this.node.getProps();
    e && (this.removeGroupControls = e.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || sn;
  }
  update() {
    const { dragControls: e } = this.node.getProps(), { dragControls: l } = this.node.prevProps || {};
    e !== l && (this.removeGroupControls(), e && (this.removeGroupControls = e.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const Rf = (a) => (e, l) => {
  a && qt.update(() => a(e, l), !1, !0);
};
class VT extends wa {
  constructor() {
    super(...arguments), this.removePointerDownListener = sn;
  }
  onPointerDown(e) {
    this.session = new F2(e, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Q2(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: e, onPanStart: l, onPan: s, onPanEnd: r } = this.node.getProps();
    return {
      onSessionStart: Rf(e),
      onStart: Rf(l),
      onMove: Rf(s),
      onEnd: (c, f) => {
        delete this.session, r && qt.postRender(() => r(c, f));
      }
    };
  }
  mount() {
    this.removePointerDownListener = us(this.node.current, "pointerdown", (e) => this.onPointerDown(e));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let Df = !1;
class UT extends A.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: e, layoutGroup: l, switchLayoutGroup: s, layoutId: r } = this.props, { projection: c } = e;
    c && (l.group && l.group.add(c), s && s.register && r && s.register(c), Df && c.root.didUpdate(), c.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), c.setOptions({
      ...c.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), cr.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(e) {
    const { layoutDependency: l, visualElement: s, drag: r, isPresent: c } = this.props, { projection: f } = s;
    return f && (f.isPresent = c, e.layoutDependency !== l && f.setOptions({
      ...f.options,
      layoutDependency: l
    }), Df = !0, r || e.layoutDependency !== l || l === void 0 || e.isPresent !== c ? f.willUpdate() : this.safeToRemove(), e.isPresent !== c && (c ? f.promote() : f.relegate() || qt.postRender(() => {
      const h = f.getStack();
      (!h || !h.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: e, layoutAnchor: l } = this.props, { projection: s } = e;
    s && (s.options.layoutAnchor = l, s.root.didUpdate(), Wd.postRender(() => {
      !s.currentAnimation && s.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: e, layoutGroup: l, switchLayoutGroup: s } = this.props, { projection: r } = e;
    Df = !0, r && (r.scheduleCheckAfterUnmount(), l && l.group && l.group.remove(r), s && s.deregister && s.deregister(r));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function W2(a) {
  const [e, l] = Z2(), s = A.useContext(Vd);
  return y.jsx(UT, { ...a, layoutGroup: s, switchLayoutGroup: A.useContext(N2), isPresent: e, safeToRemove: l });
}
const kT = {
  pan: {
    Feature: VT
  },
  drag: {
    Feature: BT,
    ProjectionNode: A2,
    MeasureLayout: W2
  }
};
function gg(a, e, l) {
  const { props: s } = a;
  a.animationState && s.whileHover && a.animationState.setActive("whileHover", l === "Start");
  const r = "onHover" + l, c = s[r];
  c && qt.postRender(() => c(e, Ss(e)));
}
class HT extends wa {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = e9(e, (l, s) => (gg(this.node, s, "Start"), (r) => gg(this.node, r, "End"))));
  }
  unmount() {
  }
}
class qT extends wa {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let e = !1;
    try {
      e = this.node.current.matches(":focus-visible");
    } catch {
      e = !0;
    }
    !e || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = vs(hs(this.node.current, "focus", () => this.onFocus()), hs(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function vg(a, e, l) {
  const { props: s } = a;
  if (a.current instanceof HTMLButtonElement && a.current.disabled)
    return;
  a.animationState && s.whileTap && a.animationState.setActive("whileTap", l === "Start");
  const r = "onTap" + (l === "End" ? "" : l), c = s[r];
  c && qt.postRender(() => c(e, Ss(e)));
}
class $T extends wa {
  mount() {
    const { current: e } = this.node;
    if (!e)
      return;
    const { globalTapTarget: l, propagate: s } = this.node.props;
    this.unmount = o9(e, (r, c) => (vg(this.node, c, "Start"), (f, { success: h }) => vg(this.node, f, h ? "End" : "Cancel")), {
      useGlobalTarget: l,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const xd = /* @__PURE__ */ new WeakMap(), Nf = /* @__PURE__ */ new WeakMap(), GT = (a) => {
  const e = xd.get(a.target);
  e && e(a);
}, YT = (a) => {
  a.forEach(GT);
};
function XT({ root: a, ...e }) {
  const l = a || document;
  Nf.has(l) || Nf.set(l, {});
  const s = Nf.get(l), r = JSON.stringify(e);
  return s[r] || (s[r] = new IntersectionObserver(YT, { root: a, ...e })), s[r];
}
function PT(a, e, l) {
  const s = XT(e);
  return xd.set(a, l), s.observe(a), () => {
    xd.delete(a), s.unobserve(a);
  };
}
const KT = {
  some: 0,
  all: 1
};
class ZT extends wa {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: e = {} } = this.node.getProps(), { root: l, margin: s, amount: r = "some", once: c } = e, f = {
      root: l ? l.current : void 0,
      rootMargin: s,
      threshold: typeof r == "number" ? r : KT[r]
    }, h = (p) => {
      const { isIntersecting: m } = p;
      if (this.isInView === m || (this.isInView = m, c && !m && this.hasEnteredView))
        return;
      m && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", m);
      const { onViewportEnter: g, onViewportLeave: v } = this.node.getProps(), b = m ? g : v;
      b && b(p);
    };
    this.stopObserver = PT(this.node.current, f, h);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: e, prevProps: l } = this.node;
    ["amount", "margin", "root"].some(QT(e, l)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function QT({ viewport: a = {} }, { viewport: e = {} } = {}) {
  return (l) => a[l] !== e[l];
}
const FT = {
  inView: {
    Feature: ZT
  },
  tap: {
    Feature: $T
  },
  focus: {
    Feature: qT
  },
  hover: {
    Feature: HT
  }
}, JT = {
  layout: {
    ProjectionNode: A2,
    MeasureLayout: W2
  }
}, WT = {
  renderer: gT,
  ...ST,
  ...FT
}, IT = {
  ...WT,
  ...kT,
  ...JT
};
function tC() {
  !ah.current && a2();
  const [a] = A.useState(vr.current);
  return a;
}
var Or = ev();
function eC(a, e) {
  if (a instanceof RegExp) return { keys: !1, pattern: a };
  var l, s, r, c, f = [], h = "", p = a.split("/");
  for (p[0] || p.shift(); r = p.shift(); )
    l = r[0], l === "*" ? (f.push(l), h += r[1] === "?" ? "(?:/(.*))?" : "/(.*)") : l === ":" ? (s = r.indexOf("?", 1), c = r.indexOf(".", 1), f.push(r.substring(1, ~s ? s : ~c ? c : r.length)), h += ~s && !~c ? "(?:/([^/]+?))?" : "/([^/]+?)", ~c && (h += (~s ? "?" : "") + "\\" + r.substring(c))) : h += "/" + r;
  return {
    keys: f,
    pattern: new RegExp("^" + h + (e ? "(?=$|/)" : "/?$"), "i")
  };
}
const nC = "popstate", mh = "pushState", ph = "replaceState", aC = "hashchange", bg = [
  nC,
  mh,
  ph,
  aC
], iC = (a) => {
  for (const e of bg)
    addEventListener(e, a);
  return () => {
    for (const e of bg)
      removeEventListener(e, a);
  };
}, I2 = (a, e) => XS.useSyncExternalStore(iC, a, e), xg = () => location.search, lC = ({ ssrSearch: a } = {}) => I2(
  xg,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrSearch="?foo",
  // client hydrates with just <Router /> and reads from location.search
  a != null ? () => a : xg
), Sg = () => location.pathname, sC = ({ ssrPath: a } = {}) => I2(
  Sg,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrPath="/foo",
  // client hydrates with just <Router /> and reads from location.pathname
  a != null ? () => a : Sg
), oC = (a, { replace: e = !1, state: l = null } = {}) => history[e ? ph : mh](l, "", a), rC = (a = {}) => [sC(a), oC], wg = Symbol.for("wouter_v3");
if (typeof history < "u" && typeof window[wg] > "u") {
  for (const a of [mh, ph]) {
    const e = history[a];
    history[a] = function() {
      const l = e.apply(this, arguments), s = new Event(a);
      return s.arguments = arguments, dispatchEvent(s), l;
    };
  }
  Object.defineProperty(window, wg, { value: !0 });
}
const uC = (a, e) => e.toLowerCase().indexOf(a.toLowerCase()) ? "~" + e : e.slice(a.length) || "/", tb = (a = "") => a === "/" ? "" : a, cC = (a, e) => a[0] === "~" ? a.slice(1) : tb(e) + a, fC = (a = "", e) => uC(Tg(tb(a)), Tg(e)), Tg = (a) => {
  try {
    return decodeURI(a);
  } catch {
    return a;
  }
}, dC = {
  hook: rC,
  searchHook: lC,
  parser: eC,
  base: "",
  // this option is used to override the current location during SSR
  ssrPath: void 0,
  ssrSearch: void 0,
  // optional context to track render state during SSR
  ssrContext: void 0,
  // customizes how `href` props are transformed for <Link />
  hrefs: (a) => a,
  // wraps navigate calls, useful for view transitions
  aroundNav: (a, e, l) => a(e, l)
}, hC = A.createContext(dC), mC = () => A.useContext(hC), pC = {};
A.createContext(pC);
const yC = (a) => {
  const [e, l] = a.hook(a);
  return [
    fC(a.base, e),
    nv(
      (s, r) => a.aroundNav(l, cC(s, a.base), r)
    )
  ];
}, gC = A.forwardRef((a, e) => {
  const l = mC(), [s, r] = yC(l), {
    to: c = "",
    href: f = c,
    onClick: h,
    asChild: p,
    children: m,
    className: g,
    /* eslint-disable no-unused-vars */
    replace: v,
    state: b,
    transition: T,
    /* eslint-enable no-unused-vars */
    ...S
  } = a, w = nv((_) => {
    _.ctrlKey || _.metaKey || _.altKey || _.shiftKey || _.button !== 0 || (h?.(_), _.defaultPrevented || (_.preventDefault(), r(f, a)));
  }), E = l.hrefs(
    f[0] === "~" ? f.slice(1) : l.base + f,
    l
    // pass router as a second argument for convinience
  );
  return p && A.isValidElement(m) ? A.cloneElement(m, { onClick: w, href: E }) : A.createElement("a", {
    ...S,
    onClick: w,
    href: E,
    // `className` can be a function to apply the class if this link is active
    className: g?.call ? g(s === f) : g,
    children: m,
    ref: e
  });
}), yh = Object.freeze({
  4: 4,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
  16: 16,
  18: 18,
  20: 20,
  26: 26,
  34: 34,
  full: 9999
}), zr = Object.freeze({
  badge: 6,
  "badge-footnote": 4,
  "badge-circled-footnote": 11,
  "badge-circled-text": 13,
  "button-regular": 25,
  "button-multiline": 16,
  "dropdown-menu": 36,
  "header-action": 22,
  "markdown-inline-code": 5,
  modal: 34,
  section: 26,
  "segmented-circled": 18,
  "segmented-circled-indicator": 16,
  snackbar: 26,
  "story-badge": 11,
  tab: 16,
  "tab-compact": 14,
  "tab-glass": 18,
  "tab-bar": 9999,
  "text-field": 12,
  "tooltip-surface": 12,
  "tooltip-badge": 5
}), vC = "_root_xunnd_1", Cg = "_glassBackground_xunnd_5", Eg = "_glassShadow_xunnd_25", bC = "_glassBorder_1y4zy_1", xC = "_muted_1y4zy_15", ys = (a) => {
  const e = xt.c(2), {
    className: l,
    muted: s
  } = a, r = `${bC} ${s !== void 0 && s ? xC : ""} ${l === void 0 ? "" : l}`;
  let c;
  return e[0] !== r ? (c = /* @__PURE__ */ y.jsx("div", {
    className: r,
    "aria-hidden": "true"
  }), e[0] = r, e[1] = c) : c = e[1], c;
}, gh = (a) => {
  const e = xt.c(16);
  let l, s, r, c;
  e[0] !== a ? ({
    children: l,
    className: r,
    style: c,
    ...s
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c) : (l = e[1], s = e[2], r = e[3], c = e[4]);
  const f = r === void 0 ? "" : r;
  let h;
  e[5] !== c ? (h = c === void 0 ? {} : c, e[5] = c, e[6] = h) : h = e[6];
  const p = h;
  if (!l) {
    let S;
    return e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (S = /* @__PURE__ */ y.jsxs(y.Fragment, {
      children: [/* @__PURE__ */ y.jsx("div", {
        className: Cg,
        "aria-hidden": "true"
      }), /* @__PURE__ */ y.jsx("div", {
        className: Eg,
        "aria-hidden": "true"
      }), /* @__PURE__ */ y.jsx(ys, {})]
    }), e[7] = S) : S = e[7], S;
  }
  const m = `${vC} ${f}`;
  let g, v, b;
  e[8] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (g = /* @__PURE__ */ y.jsx("div", {
    className: Cg,
    "aria-hidden": "true"
  }), v = /* @__PURE__ */ y.jsx("div", {
    className: Eg,
    "aria-hidden": "true"
  }), b = /* @__PURE__ */ y.jsx(ys, {}), e[8] = g, e[9] = v, e[10] = b) : (g = e[8], v = e[9], b = e[10]);
  let T;
  return e[11] !== l || e[12] !== s || e[13] !== p || e[14] !== m ? (T = /* @__PURE__ */ y.jsxs("div", {
    className: m,
    style: p,
    ...s,
    children: [g, v, b, l]
  }), e[11] = l, e[12] = s, e[13] = p, e[14] = m, e[15] = T) : T = e[15], T;
}, SC = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/arrow-down" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", d: "M11.2482 20.3129C11.6466 20.7682 12.3556 20.7682 12.7541 20.3129L17.5499 14.8314C18.1155 14.1849 17.6561 13.1732 16.797 13.1732H13.5011V5.67324C13.5011 4.84481 12.8295 4.17324 12.0011 4.17324C11.1727 4.17324 10.5011 4.84481 10.5011 5.67324V13.1732H7.20522C6.34614 13.1732 5.88678 14.1849 6.45229 14.8314L11.2482 20.3129Z", fill: "#3D3C3A" }))), wC = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/arrow-up" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", d: "M11.2483 3.85905C11.6467 3.40376 12.3558 3.40375 12.7542 3.85905L17.5501 9.3405C18.1158 9.98708 17.6563 10.9997 16.7971 10.9997H13.5012V18.4997C13.501 19.3279 12.8295 19.9997 12.0012 19.9997C11.1729 19.9997 10.5014 19.3279 10.5012 18.4997V10.9997H7.20535C6.34619 10.9997 5.88666 9.98708 6.45242 9.3405L11.2483 3.85905Z", fill: "#3D3C3A" }))), TC = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/star" }, /* @__PURE__ */ A.createElement("path", { id: "Vector 234255911", d: "M11 16L15 12L11 8", stroke: "#3D3C3A", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }))), eb = "_redaction_dcm1f_1", nb = "_active_dcm1f_19", CC = "_sized_dcm1f_29", Of = 1800, EC = 1.3, ab = /* @__PURE__ */ A.createContext(null), Lr = () => A.useContext(ab);
let Tr = [];
const AC = () => {
  const a = Tr;
  Tr = [];
  const e = performance.now(), l = a.map((s) => {
    const r = s.getBoundingClientRect().top + window.scrollY;
    return -(((e - r * EC) % Of + Of) % Of);
  });
  a.forEach((s, r) => {
    s.style.setProperty("--wave-phase", `${Math.round(l[r])}ms`);
  });
}, Br = (a) => {
  a && (Tr.length === 0 && requestAnimationFrame(AC), Tr.push(a));
}, vh = (a) => a ? `${eb} ${nb}` : "", MC = 10, Qa = (a) => {
  const e = xt.c(7), {
    active: l,
    width: s,
    children: r
  } = a, c = r != null && r !== "", f = s ?? (!c && l ? MC : void 0), h = l ? Br : void 0, p = `
                ${eb}
                ${l ? nb : ""}
                ${f ? CC : ""}`;
  let m;
  e[0] !== f ? (m = f ? {
    width: `${f}ch`
  } : void 0, e[0] = f, e[1] = m) : m = e[1];
  const g = c ? r : " ";
  let v;
  return e[2] !== h || e[3] !== p || e[4] !== m || e[5] !== g ? (v = /* @__PURE__ */ y.jsx("span", {
    ref: h,
    className: p,
    style: m,
    children: g
  }), e[2] = h, e[3] = p, e[4] = m, e[5] = g, e[6] = v) : v = e[6], v;
}, Gi = (a) => {
  const e = xt.c(6), {
    className: l,
    as: s,
    active: r
  } = a, c = l === void 0 ? "" : l, f = s === void 0 ? "div" : s, h = Lr(), p = r ?? h ?? !0, m = vh(p), g = p ? Br : void 0, v = `${c} ${m}`;
  let b;
  e[0] !== v ? (b = v.trim(), e[0] = v, e[1] = b) : b = e[1];
  let T;
  return e[2] !== f || e[3] !== g || e[4] !== b ? (T = /* @__PURE__ */ y.jsx(f, {
    ref: g,
    className: b
  }), e[2] = f, e[3] = g, e[4] = b, e[5] = T) : T = e[5], T;
}, ib = (a) => {
  const e = xt.c(3), {
    active: l,
    children: s
  } = a, r = !!(l === void 0 || l);
  let c;
  return e[0] !== s || e[1] !== r ? (c = /* @__PURE__ */ y.jsx(ab.Provider, {
    value: r,
    children: s
  }), e[0] = s, e[1] = r, e[2] = c) : c = e[2], c;
}, bh = "_text_9l4iv_1", Cr = "_icon_9l4iv_28", lb = "_title32_9l4iv_34", sb = "_title24_9l4iv_35", ob = "_title20_9l4iv_36", rb = "_body_9l4iv_56", ub = "_subtitle_9l4iv_63", cb = "_caption_9l4iv_70", jC = {
  text: bh,
  icon: Cr,
  title32: lb,
  title24: sb,
  title20: ob,
  body: rb,
  subtitle: ub,
  caption: cb
}, _C = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  body: rb,
  caption: cb,
  default: jC,
  icon: Cr,
  subtitle: ub,
  text: bh,
  title20: ob,
  title24: sb,
  title32: lb
}, Symbol.toStringTag, { value: "Module" })), RC = {
  title1: "title32",
  title2: "title24",
  title3: "title20",
  body: "body",
  callout: "body",
  subheadline1: "subtitle",
  subheadline2: "subtitle",
  footnote: "subtitle",
  caption1: "caption",
  caption2: "caption",
  overline: "caption"
}, lt = (a) => {
  const e = xt.c(34);
  let l, s, r, c, f, h, p, m, g, v, b;
  e[0] !== a ? ({
    as: l,
    variant: v,
    weight: b,
    rounded: m,
    skeleton: g,
    caps: r,
    chevron: c,
    arrow: s,
    children: f,
    className: h,
    ...p
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c, e[5] = f, e[6] = h, e[7] = p, e[8] = m, e[9] = g, e[10] = v, e[11] = b) : (l = e[1], s = e[2], r = e[3], c = e[4], f = e[5], h = e[6], p = e[7], m = e[8], g = e[9], v = e[10], b = e[11]);
  const T = v === void 0 ? "body" : v, S = Lr(), w = l || "div", E = g !== void 0 ? !!g : !!S, _ = g !== void 0 || S !== null, j = typeof g == "number" ? g : void 0;
  let M;
  e[12] !== E || e[13] !== f || e[14] !== _ || e[15] !== j ? (M = _ ? /* @__PURE__ */ y.jsx(Qa, {
    active: E,
    width: j,
    children: f
  }) : f, e[12] = E, e[13] = f, e[14] = _, e[15] = j, e[16] = M) : M = e[16];
  const D = M, L = s?.direction === "down" ? SC : wC, V = `${bh} ${_C[RC[T] || "body"]} ${h || ""}`, R = m || void 0, q = r || void 0, X = E || void 0;
  let Z;
  e[17] !== L || e[18] !== s?.direction ? (Z = s?.direction && /* @__PURE__ */ y.jsx(L, {
    className: Cr
  }), e[17] = L, e[18] = s?.direction, e[19] = Z) : Z = e[19];
  let et;
  e[20] !== c ? (et = c && /* @__PURE__ */ y.jsx(TC, {
    className: Cr
  }), e[20] = c, e[21] = et) : et = e[21];
  let F;
  return e[22] !== w || e[23] !== D || e[24] !== p || e[25] !== V || e[26] !== R || e[27] !== q || e[28] !== X || e[29] !== Z || e[30] !== et || e[31] !== T || e[32] !== b ? (F = /* @__PURE__ */ y.jsxs(w, {
    ...p,
    className: V,
    "data-variant": T,
    "data-weight": b,
    "data-rounded": R,
    "data-caps": q,
    "data-skeleton": X,
    children: [Z, D, et]
  }), e[22] = w, e[23] = D, e[24] = p, e[25] = V, e[26] = R, e[27] = q, e[28] = X, e[29] = Z, e[30] = et, e[31] = T, e[32] = b, e[33] = F) : F = e[33], F;
}, xh = {
  skin: "apple",
  isApple: !0,
  isMaterial: !1,
  setSkin: () => {
  }
}, fb = /* @__PURE__ */ A.createContext(xh), Wi = () => A.useContext(fb) || xh;
function DC(a) {
  const e = xt.c(3), {
    children: l
  } = a;
  let s;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (s = [], e[0] = s) : s = e[0], A.useEffect(NC, s);
  let r;
  return e[1] !== l ? (r = /* @__PURE__ */ y.jsx(fb.Provider, {
    value: xh,
    children: l
  }), e[1] = l, e[2] = r) : r = e[2], r;
}
function NC() {
  document.body.classList.remove("material", "skin-switcher-active"), document.body.classList.add("apple");
}
const Sh = "_button_1d7yf_1", db = "_regular_1d7yf_21", hb = "_overlay_1d7yf_35", mb = "_secondary_1d7yf_42", pb = "_accent_1d7yf_47", wh = "_icon_1d7yf_53", Th = "_label_1d7yf_57", Ch = "_content_1d7yf_61", OC = {
  button: Sh,
  regular: db,
  overlay: hb,
  secondary: mb,
  accent: pb,
  icon: wh,
  label: Th,
  content: Ch
}, zC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accent: pb,
  button: Sh,
  content: Ch,
  default: OC,
  icon: wh,
  label: Th,
  overlay: hb,
  regular: db,
  secondary: mb
}, Symbol.toStringTag, { value: "Module" })), Ag = (a) => {
  const e = xt.c(16), {
    children: l,
    onClick: s,
    variant: r,
    ariaLabel: c,
    title: f
  } = a, h = r === void 0 ? "regular" : r, p = typeof l == "string", m = h === "regular" || h === "overlay", g = `${Sh} ${zC[h]} ${p ? Th : wh}`;
  let v, b;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = {
    scale: 1.1
  }, b = {
    scale: {
      type: "spring",
      stiffness: 800,
      damping: 40
    }
  }, e[0] = v, e[1] = b) : (v = e[0], b = e[1]);
  let T;
  e[2] !== m ? (T = m && /* @__PURE__ */ y.jsx(ys, {
    muted: !0
  }), e[2] = m, e[3] = T) : T = e[3];
  let S;
  e[4] !== l || e[5] !== p ? (S = p ? /* @__PURE__ */ y.jsx(lt, {
    variant: "body",
    weight: "medium",
    children: l
  }) : l, e[4] = l, e[5] = p, e[6] = S) : S = e[6];
  let w;
  e[7] !== S ? (w = /* @__PURE__ */ y.jsx("span", {
    className: Ch,
    children: S
  }), e[7] = S, e[8] = w) : w = e[8];
  let E;
  return e[9] !== c || e[10] !== s || e[11] !== g || e[12] !== T || e[13] !== w || e[14] !== f ? (E = /* @__PURE__ */ y.jsxs(aw, {
    type: "button",
    className: g,
    onClick: s,
    "aria-label": c,
    title: f,
    whileTap: v,
    transition: b,
    children: [T, w]
  }), e[9] = c, e[10] = s, e[11] = g, e[12] = T, e[13] = w, e[14] = f, e[15] = E) : E = e[15], E;
}, LC = /* @__PURE__ */ A.createContext(!1), BC = "_root_125i3_1", Mg = "_side_125i3_9", VC = "_trailing_125i3_18", UC = "_middle_125i3_22", kC = "_middleOverlay_125i3_31", HC = "_titlePill_125i3_35", qC = "_titleContent_125i3_45", $C = "_inModal_125i3_59", GC = (a) => {
  const e = xt.c(32), {
    left: l,
    onLeft: s,
    leftVariant: r,
    leftAriaLabel: c,
    leftTitle: f,
    right: h,
    onRight: p,
    rightVariant: m,
    rightAriaLabel: g,
    rightTitle: v,
    overlay: b,
    titleGlass: T,
    children: S
  } = a, w = b === void 0 ? !1 : b, E = T === void 0 ? !1 : T, {
    isApple: _
  } = Wi(), j = A.useContext(LC), M = w ? "overlay" : "regular";
  let D;
  e[0] !== S ? (D = /* @__PURE__ */ y.jsx(lt, {
    variant: "body",
    weight: "semibold",
    children: S
  }), e[0] = S, e[1] = D) : D = e[1];
  const L = D, V = `${BC} ${j ? $C : ""}`;
  let R;
  e[2] !== M || e[3] !== l || e[4] !== c || e[5] !== f || e[6] !== r || e[7] !== s ? (R = l != null && /* @__PURE__ */ y.jsx(Ag, {
    onClick: s,
    variant: r ?? M,
    ariaLabel: c,
    title: f,
    children: l
  }), e[2] = M, e[3] = l, e[4] = c, e[5] = f, e[6] = r, e[7] = s, e[8] = R) : R = e[8];
  let q;
  e[9] !== R ? (q = /* @__PURE__ */ y.jsx("div", {
    className: Mg,
    children: R
  }), e[9] = R, e[10] = q) : q = e[10];
  let X;
  e[11] !== M || e[12] !== p || e[13] !== h || e[14] !== g || e[15] !== v || e[16] !== m ? (X = h != null && /* @__PURE__ */ y.jsx(Ag, {
    onClick: p,
    variant: m ?? M,
    ariaLabel: g,
    title: v,
    children: h
  }), e[11] = M, e[12] = p, e[13] = h, e[14] = g, e[15] = v, e[16] = m, e[17] = X) : X = e[17];
  let Z;
  e[18] !== X ? (Z = /* @__PURE__ */ y.jsx("div", {
    className: `${Mg} ${VC}`,
    children: X
  }), e[18] = X, e[19] = Z) : Z = e[19];
  const et = `${UC} ${w ? kC : ""}`;
  let F;
  e[20] !== _ || e[21] !== L || e[22] !== E ? (F = _ && E ? /* @__PURE__ */ y.jsxs("div", {
    className: HC,
    children: [/* @__PURE__ */ y.jsx(gh, {}), /* @__PURE__ */ y.jsx("span", {
      className: qC,
      children: L
    })]
  }) : L, e[20] = _, e[21] = L, e[22] = E, e[23] = F) : F = e[23];
  let W;
  e[24] !== F || e[25] !== et ? (W = /* @__PURE__ */ y.jsx("div", {
    className: et,
    children: F
  }), e[24] = F, e[25] = et, e[26] = W) : W = e[26];
  let nt;
  return e[27] !== W || e[28] !== V || e[29] !== q || e[30] !== Z ? (nt = /* @__PURE__ */ y.jsxs("div", {
    className: V,
    "data-modal-drag": "",
    children: [q, Z, W]
  }), e[27] = W, e[28] = V, e[29] = q, e[30] = Z, e[31] = nt) : nt = e[31], nt;
}, YC = /* @__PURE__ */ A.createContext({
  inDetailPane: !1
}), XC = () => A.useContext(YC), Xt = () => {
}, Fo = () => ({
  show: Xt,
  hide: Xt,
  enable: Xt,
  disable: Xt,
  showProgress: Xt,
  hideProgress: Xt,
  setParams: Xt,
  setText: Xt,
  onClick: Xt,
  offClick: Xt
}), PC = {
  initData: "",
  themeParams: {},
  viewportHeight: 0,
  BackButton: Fo(),
  SettingsButton: Fo(),
  MainButton: Fo(),
  SecondaryButton: Fo(),
  HapticFeedback: {
    impactOccurred: Xt,
    notificationOccurred: Xt,
    selectionChanged: Xt
  },
  onEvent: Xt,
  offEvent: Xt,
  expand: Xt,
  setHeaderColor: Xt,
  setBackgroundColor: Xt,
  setBottomBarColor: Xt,
  disableVerticalSwipes: Xt,
  enableVerticalSwipes: Xt,
  requestFullscreen: Xt,
  exitFullscreen: Xt,
  shareToStory: Xt
}, Sa = globalThis.Telegram?.WebApp ?? PC;
function KC(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var zf = { exports: {} }, Lf, jg;
function ZC() {
  if (jg) return Lf;
  jg = 1;
  var a = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Lf = a, Lf;
}
var Bf, _g;
function QC() {
  if (_g) return Bf;
  _g = 1;
  var a = /* @__PURE__ */ ZC();
  function e() {
  }
  function l() {
  }
  return l.resetWarningCache = e, Bf = function() {
    function s(f, h, p, m, g, v) {
      if (v !== a) {
        var b = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw b.name = "Invariant Violation", b;
      }
    }
    s.isRequired = s;
    function r() {
      return s;
    }
    var c = {
      array: s,
      bigint: s,
      bool: s,
      func: s,
      number: s,
      object: s,
      string: s,
      symbol: s,
      any: s,
      arrayOf: r,
      element: s,
      elementType: s,
      instanceOf: r,
      node: s,
      objectOf: r,
      oneOf: r,
      oneOfType: r,
      shape: r,
      exact: r,
      checkPropTypes: l,
      resetWarningCache: e
    };
    return c.PropTypes = c, c;
  }, Bf;
}
var Rg;
function FC() {
  return Rg || (Rg = 1, zf.exports = /* @__PURE__ */ QC()()), zf.exports;
}
var JC = /* @__PURE__ */ FC();
const mn = /* @__PURE__ */ KC(JC);
mn.func;
const Eh = "_button_124dm_1", yb = "_filled_124dm_9", gb = "_tinted_124dm_14", vb = "_plain_124dm_19", bb = "_outlined_124dm_24", xb = "_gray_124dm_28", Sb = "_disabled_124dm_33", Ah = "_skeleton_124dm_38", wb = "_wave_124dm_1", WC = {
  button: Eh,
  filled: yb,
  tinted: gb,
  plain: vb,
  outlined: bb,
  gray: xb,
  disabled: Sb,
  skeleton: Ah,
  wave: wb
}, IC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  button: Eh,
  default: WC,
  disabled: Sb,
  filled: yb,
  gray: xb,
  outlined: bb,
  plain: vb,
  skeleton: Ah,
  tinted: gb,
  wave: wb
}, Symbol.toStringTag, { value: "Module" })), ce = (a) => {
  const e = xt.c(34);
  let l, s, r, c, f;
  e[0] !== a ? ({
    variant: f,
    label: l,
    isShine: r,
    isFill: c,
    ...s
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c, e[5] = f) : (l = e[1], s = e[2], r = e[3], c = e[4], f = e[5]);
  const h = r === void 0 ? !1 : r, p = c === void 0 ? !1 : c, {
    isApple: m
  } = Wi(), g = !!Lr(), v = vh(g);
  let b;
  e[6] !== p ? (b = p && {
    "data-fill": !0
  }, e[6] = p, e[7] = b) : b = e[7];
  let T;
  e[8] !== h || e[9] !== g || e[10] !== f ? (T = f === "filled" && h && !g && {
    "data-shine": !0
  }, e[8] = h, e[9] = g, e[10] = f, e[11] = T) : T = e[11];
  let S;
  e[12] !== b || e[13] !== T ? (S = {
    ...b,
    ...T
  }, e[12] = b, e[13] = T, e[14] = S) : S = e[14];
  const w = S;
  let E;
  e[15] !== l ? (E = /* @__PURE__ */ y.jsx(lt, {
    variant: "body",
    weight: "semibold",
    children: l
  }), e[15] = l, e[16] = E) : E = e[16];
  const _ = E, j = g ? Br : void 0, M = `${Eh} ${IC[f]} ${g ? Ah : ""} ${v}`;
  let D;
  e[17] !== m || e[18] !== g ? (D = m && !g && {
    whileTap: {
      scale: 1.02
    }
  }, e[17] = m, e[18] = g, e[19] = D) : D = e[19];
  let L;
  e[20] !== g || e[21] !== f ? (L = f === "filled" && !g && /* @__PURE__ */ y.jsx(ys, {}), e[20] = g, e[21] = f, e[22] = L) : L = e[22];
  let V;
  e[23] !== _ || e[24] !== g ? (V = g ? /* @__PURE__ */ y.jsx(ib, {
    active: !1,
    children: _
  }) : _, e[23] = _, e[24] = g, e[25] = V) : V = e[25];
  let R;
  return e[26] !== w || e[27] !== s || e[28] !== L || e[29] !== V || e[30] !== j || e[31] !== M || e[32] !== D ? (R = /* @__PURE__ */ y.jsxs(Zi, {
    ref: j,
    className: M,
    ...D,
    ...w,
    ...s,
    children: [L, V]
  }), e[26] = w, e[27] = s, e[28] = L, e[29] = V, e[30] = j, e[31] = M, e[32] = D, e[33] = R) : R = e[33], R;
};
function Tb(a) {
  var e, l, s = "";
  if (typeof a == "string" || typeof a == "number") s += a;
  else if (typeof a == "object") if (Array.isArray(a)) {
    var r = a.length;
    for (e = 0; e < r; e++) a[e] && (l = Tb(a[e])) && (s && (s += " "), s += l);
  } else for (l in a) a[l] && (s && (s += " "), s += l);
  return s;
}
function t8() {
  for (var a, e, l = 0, s = "", r = arguments.length; l < r; l++) (a = arguments[l]) && (e = Tb(a)) && (s && (s += " "), s += e);
  return s;
}
const Cb = (...a) => t8(...a), e8 = {
  SNACKBAR: {
    type: "spring",
    stiffness: 280,
    damping: 26
  }
}, Eb = "_overlay_qo6yx_1", Ab = "_opacity_qo6yx_2", Mh = "_fadeIn_qo6yx_6", jh = "_fadeOut_qo6yx_10", n8 = {
  overlay: Eb,
  opacity: Ab,
  fadeIn: Mh,
  fadeOut: jh,
  "overlay-out": "_overlay-out_qo6yx_1",
  "opacity-out": "_opacity-out_qo6yx_1"
}, a8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: n8,
  fadeIn: Mh,
  fadeOut: jh,
  opacity: Ab,
  overlay: Eb
}, Symbol.toStringTag, { value: "Module" })), i8 = typeof window < "u" && "ontouchstart" in window, l8 = 250;
function s8(a) {
  const e = xt.c(21);
  let l;
  e[0] !== a ? (l = a === void 0 ? {} : a, e[0] = a, e[1] = l) : l = e[1];
  const {
    onTap: s,
    onTapOut: r,
    mode: c,
    disabled: f
  } = l, h = a8[c === void 0 ? "overlay" : c], [p, m] = A.useState(!1);
  let g;
  e[2] !== h ? (g = [h], e[2] = h, e[3] = g) : g = e[3];
  const [v, b] = A.useState(g), T = A.useRef();
  let S;
  e[4] !== h || e[5] !== r ? (S = () => {
    m(!1), b([h, jh]), r?.(), T.current = window.setTimeout(() => {
      b([h]);
    }, l8);
  }, e[4] = h, e[5] = r, e[6] = S) : S = e[6];
  const w = S;
  let E;
  e[7] !== h || e[8] !== s ? (E = (R) => {
    clearTimeout(T.current), m(!0), b([h, Mh]), s?.(R);
  }, e[7] = h, e[8] = s, e[9] = E) : E = e[9];
  const _ = E;
  let j, M;
  e[10] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (j = () => () => clearTimeout(T.current), M = [], e[10] = j, e[11] = M) : (j = e[10], M = e[11]), A.useEffect(j, M);
  let D;
  e[12] !== f || e[13] !== _ || e[14] !== w || e[15] !== p ? (D = i8 ? {
    onTouchStart: (R) => {
      f || (R.touches.length === 1 ? _({
        target: R.currentTarget,
        clientX: R.touches[0].clientX,
        clientY: R.touches[0].clientY
      }) : w());
    },
    onTouchEnd: () => {
      f || p && w();
    },
    onPointerMove: (R) => {
      p && R.pointerType === "touch" && (R.movementY !== 0 || R.movementX !== 0) && w();
    },
    onTouchCancel: () => {
      p && w();
    }
  } : {
    onMouseLeave: () => {
      p && w();
    },
    onMouseDown: (R) => {
      f || _({
        target: R.currentTarget,
        clientX: R.clientX,
        clientY: R.clientY
      });
    },
    onMouseUp: () => {
      f || p && w();
    },
    onContextMenu: () => {
      p && w();
    }
  }, e[12] = f, e[13] = _, e[14] = w, e[15] = p, e[16] = D) : D = e[16];
  const L = D;
  let V;
  return e[17] !== L || e[18] !== p || e[19] !== v ? (V = [p, L, v], e[17] = L, e[18] = p, e[19] = v, e[20] = V) : V = e[20], V;
}
const o8 = "_root_1oiyj_1", r8 = "_fade_1oiyj_22", u8 = "_ripples_1oiyj_30", c8 = "_ripple_1oiyj_30", f8 = "_tapped_1oiyj_47", Jo = (...a) => a.filter(Boolean).join(" "), d8 = (a, e) => {
  const l = {
    ...a
  };
  for (const s of Object.keys(e)) {
    const r = a[s], c = e[s];
    l[s] = r ? (f) => {
      r(f), c(f);
    } : c;
  }
  return l;
}, we = ({
  as: a = "div",
  children: e,
  className: l = "",
  mode: s = "overlay",
  disabled: r = !1,
  ...c
}) => {
  const {
    isApple: f,
    isMaterial: h
  } = Wi(), [p, m] = A.useState({}), [g, v, b] = s8({
    mode: s,
    disabled: r,
    onTap: ({
      target: w,
      clientX: E,
      clientY: _
    }) => {
      if (!h || !w) return;
      const {
        x: j,
        y: M,
        width: D,
        height: L
      } = w.getBoundingClientRect(), V = Math.max(D * 2, L * 2);
      m((R) => ({
        ...R,
        [`${performance.now()}`]: [E - j - V / 2, _ - M - V / 2, V]
      }));
    }
  }), T = s === "opacity", S = d8(c, v);
  return /* @__PURE__ */ y.jsxs(a, {
    ...S,
    disabled: r || void 0,
    className: Jo(o8, l, T && Jo(...b)),
    children: [e, f && !T && /* @__PURE__ */ y.jsx("div", {
      className: Jo(r8, ...b)
    }), h && /* @__PURE__ */ y.jsx("div", {
      className: u8,
      children: Object.entries(p).map(([w, E]) => /* @__PURE__ */ y.jsx("span", {
        className: Jo(c8, g && f8),
        style: {
          left: E[0],
          top: E[1],
          width: E[2],
          height: E[2]
        },
        onAnimationEnd: () => {
          g || m((_) => {
            const j = {
              ..._
            };
            return delete j[w], j;
          });
        }
      }, w))
    })]
  });
}, h8 = "_label_1w5sq_1", m8 = "_accent_1w5sq_6", p8 = "_description_1w5sq_10", Dg = "_caption_1w5sq_14", y8 = (a) => {
  const e = xt.c(15), {
    type: l,
    title: s,
    description: r,
    caption: c,
    bold: f
  } = a, h = f ? "medium" : "regular", p = `${h8} ${l === "Accent" ? m8 : ""}`;
  let m;
  e[0] !== s || e[1] !== h ? (m = /* @__PURE__ */ y.jsx(lt, {
    variant: "body",
    weight: h,
    children: s
  }), e[0] = s, e[1] = h, e[2] = m) : m = e[2];
  let g;
  e[3] !== p || e[4] !== m ? (g = /* @__PURE__ */ y.jsx("div", {
    className: p,
    children: m
  }), e[3] = p, e[4] = m, e[5] = g) : g = e[5];
  let v;
  e[6] !== c || e[7] !== r ? (v = r && /* @__PURE__ */ y.jsx("div", {
    className: c ? p8 : Dg,
    children: /* @__PURE__ */ y.jsx(lt, {
      variant: c ? "subheadline1" : "subheadline2",
      weight: "regular",
      children: r
    })
  }), e[6] = c, e[7] = r, e[8] = v) : v = e[8];
  let b;
  e[9] !== c ? (b = c && /* @__PURE__ */ y.jsx("div", {
    className: Dg,
    children: /* @__PURE__ */ y.jsx(lt, {
      variant: "subheadline2",
      weight: "regular",
      children: c
    })
  }), e[9] = c, e[10] = b) : b = e[10];
  let T;
  return e[11] !== g || e[12] !== v || e[13] !== b ? (T = /* @__PURE__ */ y.jsxs(y.Fragment, {
    children: [g, v, b]
  }), e[11] = g, e[12] = v, e[13] = b, e[14] = T) : T = e[14], T;
}, Mb = "_chevron_en74z_1", jb = "_dropdown_en74z_8", _h = "_colorpicker_en74z_12", Rh = "_picker_en74z_63", g8 = {
  chevron: Mb,
  dropdown: jb,
  colorpicker: _h,
  picker: Rh
}, Ng = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  chevron: Mb,
  colorpicker: _h,
  default: g8,
  dropdown: jb,
  picker: Rh
}, Symbol.toStringTag, { value: "Module" })), v8 = (a) => {
  const e = xt.c(21), {
    type: l,
    className: s,
    children: r,
    value: c,
    onChange: f,
    inputRef: h,
    id: p,
    name: m,
    showValue: g
  } = a, v = m === void 0 ? "color" : m, b = g === void 0 ? !0 : g;
  if (l === "Picker") {
    let j;
    return e[0] !== r ? (j = /* @__PURE__ */ y.jsx("div", {
      className: Rh,
      children: /* @__PURE__ */ y.jsx(lt, {
        variant: "body",
        weight: "regular",
        children: r
      })
    }), e[0] = r, e[1] = j) : j = e[1], j;
  }
  if (l === "ColorPicker") {
    const j = p || v;
    let M;
    e[2] !== j || e[3] !== h || e[4] !== v || e[5] !== f || e[6] !== c ? (M = /* @__PURE__ */ y.jsx("input", {
      ref: h,
      type: "color",
      value: c,
      onChange: f,
      name: v,
      id: j
    }), e[2] = j, e[3] = h, e[4] = v, e[5] = f, e[6] = c, e[7] = M) : M = e[7];
    let D;
    e[8] !== j || e[9] !== b || e[10] !== c ? (D = b && /* @__PURE__ */ y.jsx("label", {
      htmlFor: j,
      children: /* @__PURE__ */ y.jsx(lt, {
        variant: "body",
        weight: "regular",
        children: c
      })
    }), e[8] = j, e[9] = b, e[10] = c, e[11] = D) : D = e[11];
    let L;
    return e[12] !== M || e[13] !== D ? (L = /* @__PURE__ */ y.jsxs("div", {
      className: _h,
      children: [M, D]
    }), e[12] = M, e[13] = D, e[14] = L) : L = e[14], L;
  }
  const T = Ng[l.toLowerCase()], S = Ng[s];
  let w;
  e[15] !== T || e[16] !== S ? (w = [T, S].filter(Boolean), e[15] = T, e[16] = S, e[17] = w) : w = e[17];
  const E = w.join(" ");
  let _;
  return e[18] !== r || e[19] !== E ? (_ = /* @__PURE__ */ y.jsx("div", {
    className: E,
    children: r
  }), e[18] = r, e[19] = E, e[20] = _) : _ = e[20], _;
}, b8 = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5ZM15.1016 9.01953C14.7891 8.70711 14.2821 8.70711 13.9697 9.01953L12.001 10.9873L10.0342 9.02051C9.72176 8.70809 9.21574 8.70809 8.90332 9.02051C8.5909 9.33293 8.5909 9.83895 8.90332 10.1514L10.8701 12.1191L9.02051 13.9697C8.70809 14.2821 8.70809 14.7882 9.02051 15.1006C9.33293 15.413 9.83895 15.413 10.1514 15.1006L12.001 13.25L13.8525 15.1016C14.165 15.414 14.672 15.414 14.9844 15.1016C15.2968 14.7891 15.2968 14.2821 14.9844 13.9697L13.1328 12.1182L15.1016 10.1514C15.414 9.83895 15.414 9.33195 15.1016 9.01953Z", fill: "#3D3C3A" }))), x8 = "_root_9aal5_1", S8 = "_input_9aal5_5", w8 = "_inputWithClearButton_9aal5_25", T8 = "_clearButtonIcon_9aal5_29", C8 = "_empty_9aal5_49", E8 = "_icon_9aal5_61", A8 = /* @__PURE__ */ A.forwardRef((a, e) => {
  const l = xt.c(24);
  let s, r, c, f, h, p;
  l[0] !== a ? ({
    label: s,
    value: p,
    onChange: r,
    onClear: c,
    ...f
  } = a, h = (j) => {
    r(j.target.value);
  }, l[0] = a, l[1] = s, l[2] = r, l[3] = c, l[4] = f, l[5] = h, l[6] = p) : (s = l[1], r = l[2], c = l[3], f = l[4], h = l[5], p = l[6]);
  const m = h, g = !p && C8;
  let v;
  l[7] !== g ? (v = [x8, g].filter(Boolean), l[7] = g, l[8] = v) : v = l[8];
  const b = v.join(" "), T = `${S8} ${c ? w8 : ""}`, S = !r;
  let w;
  l[9] !== m || l[10] !== s || l[11] !== e || l[12] !== f || l[13] !== T || l[14] !== S || l[15] !== p ? (w = /* @__PURE__ */ y.jsx("input", {
    "aria-label": s,
    onChange: m,
    type: "text",
    className: T,
    placeholder: s,
    value: p,
    readOnly: S,
    ref: e,
    ...f
  }), l[9] = m, l[10] = s, l[11] = e, l[12] = f, l[13] = T, l[14] = S, l[15] = p, l[16] = w) : w = l[16];
  let E;
  l[17] !== s || l[18] !== c ? (E = c && /* @__PURE__ */ y.jsx("button", {
    type: "button",
    className: [E8, T8].filter(Boolean).join(" "),
    onClick: c,
    "aria-label": `Clear ${s}`,
    children: /* @__PURE__ */ y.jsx(b8, {})
  }), l[17] = s, l[18] = c, l[19] = E) : E = l[19];
  let _;
  return l[20] !== b || l[21] !== w || l[22] !== E ? (_ = /* @__PURE__ */ y.jsxs(lt, {
    variant: "body",
    weight: "regular",
    className: b,
    children: [w, E]
  }), l[20] = b, l[21] = w, l[22] = E, l[23] = _) : _ = l[23], _;
}), Og = "_root_1aqfj_1";
function M8(a) {
  const e = xt.c(15), {
    value: l,
    defaultValue: s,
    onChange: r,
    disabled: c,
    className: f
  } = a, h = s === void 0 ? !1 : s, p = c === void 0 ? !1 : c, m = l !== void 0, [g, v] = A.useState(h), b = m ? l : g;
  let T;
  e[0] !== r ? (T = (R) => {
    r && r(R);
  }, e[0] = r, e[1] = T) : T = e[1];
  const S = T;
  let w;
  e[2] !== b || e[3] !== S || e[4] !== m ? (w = () => {
    if (Sa.HapticFeedback.selectionChanged(), m) {
      S(!b);
      return;
    }
    v((R) => {
      const q = !R;
      return S(q), q;
    });
  }, e[2] = b, e[3] = S, e[4] = m, e[5] = w) : w = e[5];
  const E = w;
  let _;
  e[6] !== p || e[7] !== E ? (_ = (R) => {
    R.stopPropagation(), !p && E();
  }, e[6] = p, e[7] = E, e[8] = _) : _ = e[8];
  const j = _, M = f ? `${Og} ${f}` : Og, D = p || void 0, L = p || void 0;
  let V;
  return e[9] !== b || e[10] !== M || e[11] !== j || e[12] !== D || e[13] !== L ? (V = /* @__PURE__ */ y.jsx("div", {
    className: M,
    "data-state": b,
    "data-disabled": D,
    onClick: j,
    role: "switch",
    "aria-checked": b,
    "aria-disabled": L
  }), e[9] = b, e[10] = M, e[11] = j, e[12] = D, e[13] = L, e[14] = V) : V = e[14], V;
}
const j8 = (a) => {
  const e = xt.c(29);
  let l, s, r, c, f, h, p;
  e[0] !== a ? ({
    start: c,
    children: l,
    value: p,
    defaultValue: f,
    onChange: s,
    disabled: h,
    ...r
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c, e[5] = f, e[6] = h, e[7] = p) : (l = e[1], s = e[2], r = e[3], c = e[4], f = e[5], h = e[6], p = e[7]);
  const m = f === void 0 ? !1 : f, g = h === void 0 ? !1 : h, v = p !== void 0, [b, T] = A.useState(m), S = v ? p : b;
  let w;
  e[8] !== s ? (w = (R) => {
    s && s(R);
  }, e[8] = s, e[9] = w) : w = e[9];
  const E = w;
  let _;
  e[10] !== E || e[11] !== v ? (_ = (R) => {
    v || T(R), E(R);
  }, e[10] = E, e[11] = v, e[12] = _) : _ = e[12];
  const j = _;
  let M;
  e[13] !== S || e[14] !== g || e[15] !== E || e[16] !== j || e[17] !== v ? (M = () => {
    if (!g) {
      if (Sa.HapticFeedback.selectionChanged(), v) {
        j(!S);
        return;
      }
      T((R) => {
        const q = !R;
        return E(q), q;
      });
    }
  }, e[13] = S, e[14] = g, e[15] = E, e[16] = j, e[17] = v, e[18] = M) : M = e[18];
  const D = M;
  let L;
  e[19] !== S || e[20] !== g || e[21] !== j ? (L = /* @__PURE__ */ y.jsx(Yn.Part, {
    type: "Switch",
    children: /* @__PURE__ */ y.jsx(M8, {
      value: S,
      onChange: j,
      disabled: g
    })
  }), e[19] = S, e[20] = g, e[21] = j, e[22] = L) : L = e[22];
  let V;
  return e[23] !== l || e[24] !== D || e[25] !== r || e[26] !== c || e[27] !== L ? (V = /* @__PURE__ */ y.jsx(Yn, {
    start: c,
    end: L,
    onClick: D,
    ...r,
    children: l
  }), e[23] = l, e[24] = D, e[25] = r, e[26] = c, e[27] = L, e[28] = V) : V = e[28], V;
}, zg = "_root_146xt_10", _8 = "_start_146xt_32", R8 = "_image_146xt_37", D8 = "_icon_146xt_45", N8 = "_body_146xt_57", O8 = "_end_146xt_65", z8 = "_caption_146xt_76", L8 = "_label_146xt_80", B8 = (a) => {
  const e = xt.c(28);
  let l, s, r, c, f, h, p;
  e[0] !== a ? ({
    as: h,
    start: f,
    children: l,
    end: s,
    onClick: r,
    tappable: p,
    ...c
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c, e[5] = f, e[6] = h, e[7] = p) : (l = e[1], s = e[2], r = e[3], c = e[4], f = e[5], h = e[6], p = e[7]);
  const m = h === void 0 ? "div" : h, g = p ?? (r != null || m !== "div");
  let v;
  e[8] !== f ? (v = f && /* @__PURE__ */ y.jsx("div", {
    className: _8,
    children: f
  }), e[8] = f, e[9] = v) : v = e[9];
  let b;
  e[10] !== l ? (b = /* @__PURE__ */ y.jsx("div", {
    className: N8,
    children: l
  }), e[10] = l, e[11] = b) : b = e[11];
  let T;
  e[12] !== s ? (T = s && /* @__PURE__ */ y.jsx("div", {
    className: O8,
    children: s
  }), e[12] = s, e[13] = T) : T = e[13];
  let S;
  e[14] !== v || e[15] !== b || e[16] !== T ? (S = /* @__PURE__ */ y.jsxs(y.Fragment, {
    children: [v, b, T]
  }), e[14] = v, e[15] = b, e[16] = T, e[17] = S) : S = e[17];
  const w = S;
  if (!g) {
    let _;
    return e[18] !== m || e[19] !== w || e[20] !== r || e[21] !== c ? (_ = /* @__PURE__ */ y.jsx(m, {
      className: zg,
      onClick: r,
      ...c,
      children: w
    }), e[18] = m, e[19] = w, e[20] = r, e[21] = c, e[22] = _) : _ = e[22], _;
  }
  let E;
  return e[23] !== m || e[24] !== w || e[25] !== r || e[26] !== c ? (E = /* @__PURE__ */ y.jsx(we, {
    as: m,
    className: zg,
    onClick: r,
    ...c,
    children: w
  }), e[23] = m, e[24] = w, e[25] = r, e[26] = c, e[27] = E) : E = e[27], E;
}, V8 = (a) => {
  const e = xt.c(6), {
    type: l,
    src: s,
    iconType: r
  } = a, c = s === void 0 ? null : s, f = r === void 0 ? null : r;
  let h;
  t: switch (l) {
    case "Image": {
      let m;
      e[0] !== c ? (m = /* @__PURE__ */ y.jsx("img", {
        src: c,
        alt: "",
        className: R8
      }), e[0] = c, e[1] = m) : m = e[1], h = m;
      break t;
    }
    case "Icon": {
      let m;
      e[2] !== f ? (m = /* @__PURE__ */ y.jsx("div", {
        className: D8,
        children: f
      }), e[2] = f, e[3] = m) : m = e[3], h = m;
      break t;
    }
    default:
      h = null;
  }
  let p;
  return e[4] !== h ? (p = /* @__PURE__ */ y.jsx(y.Fragment, {
    children: h
  }), e[4] = h, e[5] = p) : p = e[5], p;
}, U8 = (a) => {
  const e = xt.c(7), {
    label: l,
    caption: s
  } = a;
  let r;
  e[0] !== l ? (r = /* @__PURE__ */ y.jsx("div", {
    className: L8,
    children: /* @__PURE__ */ y.jsx(lt, {
      variant: "body",
      weight: "regular",
      children: l
    })
  }), e[0] = l, e[1] = r) : r = e[1];
  let c;
  e[2] !== s ? (c = s && /* @__PURE__ */ y.jsx("div", {
    className: z8,
    children: /* @__PURE__ */ y.jsx(lt, {
      variant: "subheadline2",
      weight: "regular",
      children: s
    })
  }), e[2] = s, e[3] = c) : c = e[3];
  let f;
  return e[4] !== r || e[5] !== c ? (f = /* @__PURE__ */ y.jsxs(y.Fragment, {
    children: [r, c]
  }), e[4] = r, e[5] = c, e[6] = f) : f = e[6], f;
}, Yn = Object.assign(B8, {
  Start: V8,
  End: U8,
  Part: v8,
  Text: y8,
  Editable: A8,
  Switch: j8
});
zr.section;
yh[16];
function k8(a, e, l) {
  const s = xt.c(8);
  let r;
  s[0] !== l ? (r = {}, s[0] = l, s[1] = r) : r = s[1];
  const {
    enabled: c
  } = r, f = c === void 0 ? !0 : c, h = A.useRef(e);
  let p;
  s[2] !== e ? (p = () => {
    h.current = e;
  }, s[2] = e, s[3] = p) : p = s[3], A.useEffect(p);
  let m, g;
  s[4] !== f || s[5] !== a ? (m = () => {
    if (!f)
      return;
    const v = a.current;
    if (!v)
      return;
    const b = new ResizeObserver((T) => {
      h.current(T[0]);
    });
    return b.observe(v), () => b.disconnect();
  }, g = [a, f], s[4] = f, s[5] = a, s[6] = m, s[7] = g) : (m = s[6], g = s[7]), A.useEffect(m, g);
}
const Vf = (a, e, l) => Math.min(Math.max(a, e), l), H8 = /* @__PURE__ */ A.createContext({
  colorScheme: "light",
  setColorScheme: () => {
  },
  toggleColorScheme: () => {
  }
}), q8 = ["light", "dark"], Sd = (a) => q8.includes(a), wd = () => {
  if (typeof window > "u" || typeof document > "u")
    return null;
  const a = window.getComputedStyle(document.documentElement).getPropertyValue("--tg-color-scheme").trim();
  return Sd(a) ? a : null;
}, _b = () => typeof window > "u" || !window.matchMedia ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light", $8 = () => wd() ?? _b(), G8 = typeof window > "u" ? A.useEffect : A.useLayoutEffect, Y8 = (a) => {
  const e = xt.c(20), {
    children: l,
    defaultColorScheme: s,
    onColorSchemeChange: r
  } = a, [c, f] = A.useState($8);
  let h;
  e[0] !== s ? (h = () => Sd(s) ? s : null, e[0] = s, e[1] = h) : h = e[1];
  const [p, m] = A.useState(h), g = p ?? c;
  let v;
  e[2] !== g || e[3] !== r ? (v = (V) => {
    const R = typeof V == "function" ? V(g) : V;
    Sd(R) && (m(R), r?.(R));
  }, e[2] = g, e[3] = r, e[4] = v) : v = e[4];
  const b = v;
  let T;
  e[5] !== g || e[6] !== b ? (T = () => {
    b(g === "dark" ? "light" : "dark");
  }, e[5] = g, e[6] = b, e[7] = T) : T = e[7];
  const S = T;
  let w, E;
  e[8] !== g ? (w = () => {
    document.documentElement.dataset.colorScheme = g, document.body.dataset.colorScheme = g;
  }, E = [g], e[8] = g, e[9] = w, e[10] = E) : (w = e[9], E = e[10]), G8(w, E);
  let _, j;
  e[11] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (_ = () => {
    const V = () => {
      const X = wd();
      if (X) {
        f(X);
        return;
      }
      f(_b());
    }, R = (X) => {
      wd() || f(X.matches ? "dark" : "light");
    };
    V();
    const q = window.matchMedia("(prefers-color-scheme: dark)");
    return Sa.onEvent("themeChanged", V), q.addEventListener("change", R), () => {
      Sa.offEvent("themeChanged", V), q.removeEventListener("change", R);
    };
  }, j = [], e[11] = _, e[12] = j) : (_ = e[11], j = e[12]), A.useEffect(_, j);
  let M;
  e[13] !== g || e[14] !== b || e[15] !== S ? (M = {
    colorScheme: g,
    setColorScheme: b,
    toggleColorScheme: S
  }, e[13] = g, e[14] = b, e[15] = S, e[16] = M) : M = e[16];
  const D = M;
  let L;
  return e[17] !== l || e[18] !== D ? (L = /* @__PURE__ */ y.jsx(H8.Provider, {
    value: D,
    children: l
  }), e[17] = l, e[18] = D, e[19] = L) : L = e[19], L;
}, X8 = ({
  src: a,
  srcSet: e
}) => {
  if (!a && !e) return !1;
  const l = new window.Image();
  a && (l.src = a), e && (l.srcset = e);
  const {
    complete: s
  } = l;
  return l.src = "", l.srcset = "", s;
}, P8 = (a) => {
  const e = xt.c(15);
  let l, s, r;
  e[0] !== a ? ({
    className: l,
    onLoad: s,
    ...r
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r) : (l = e[1], s = e[2], r = e[3]);
  let c;
  e[4] !== r ? (c = () => X8(r), e[4] = r, e[5] = c) : c = e[5];
  const [f, h] = A.useState(c);
  let p;
  e[6] !== s ? (p = (b) => {
    h(!0), s?.(b);
  }, e[6] = s, e[7] = p) : p = e[7];
  const m = f && "opacity-100";
  let g;
  e[8] !== l || e[9] !== m ? (g = Cb("rounded-[inherit] opacity-0 transition-opacity duration-250 ease-[cubic-bezier(0.23,1,0.32,1)]", m, l), e[8] = l, e[9] = m, e[10] = g) : g = e[10];
  let v;
  return e[11] !== r || e[12] !== p || e[13] !== g ? (v = /* @__PURE__ */ y.jsx("img", {
    onLoad: p,
    className: g,
    ...r
  }), e[11] = r, e[12] = p, e[13] = g, e[14] = v) : v = e[14], v;
}, K8 = "_img_95uc6_1", Z8 = "_imgRedacted_95uc6_9", Q8 = "_shapeCircle_95uc6_13", F8 = "_shapeRounded_95uc6_21", J8 = /* @__PURE__ */ A.forwardRef((a, e) => {
  const l = xt.c(14), {
    size: s,
    className: r,
    style: c,
    src: f,
    shape: h
  } = a;
  let p = s === void 0 ? 40 : s;
  const m = h === void 0 ? "circle" : h, {
    isMaterial: g
  } = Wi(), v = !!Lr(), b = vh(v);
  g && (p = 42);
  let T;
  l[0] !== v || l[1] !== e ? (T = (M) => {
    v && Br(M), typeof e == "function" ? e(M) : e && (e.current = M);
  }, l[0] = v, l[1] = e, l[2] = T) : T = l[2];
  const S = `
                    ${m === "circle" ? Q8 : ""}
                    ${m === "rounded" ? F8 : ""}
                    ${b}
                    ${r || ""}`;
  let w;
  l[3] !== p || l[4] !== c ? (w = {
    width: p,
    height: p,
    ...c
  }, l[3] = p, l[4] = c, l[5] = w) : w = l[5];
  const E = `${K8} ${v ? Z8 : ""}`;
  let _;
  l[6] !== f || l[7] !== E ? (_ = /* @__PURE__ */ y.jsx(P8, {
    src: f,
    className: E
  }), l[6] = f, l[7] = E, l[8] = _) : _ = l[8];
  let j;
  return l[9] !== T || l[10] !== S || l[11] !== w || l[12] !== _ ? (j = /* @__PURE__ */ y.jsx("div", {
    ref: T,
    className: S,
    style: w,
    children: _
  }), l[9] = T, l[10] = S, l[11] = w, l[12] = _, l[13] = j) : j = l[13], j;
}), W8 = /* @__PURE__ */ A.forwardRef((a, e) => {
  const l = xt.c(11);
  let s, r, c, f;
  if (l[0] !== a) {
    const {
      to: m,
      onClick: g,
      children: v,
      ...b
    } = a;
    f = m, s = v, r = b, c = (T) => {
      g && g(T), T.defaultPrevented;
    }, l[0] = a, l[1] = s, l[2] = r, l[3] = c, l[4] = f;
  } else
    s = l[1], r = l[2], c = l[3], f = l[4];
  const h = c;
  let p;
  return l[5] !== s || l[6] !== h || l[7] !== r || l[8] !== e || l[9] !== f ? (p = /* @__PURE__ */ y.jsx(gC, {
    ref: e,
    href: f,
    onClick: h,
    ...r,
    children: s
  }), l[5] = s, l[6] = h, l[7] = r, l[8] = e, l[9] = f, l[10] = p) : p = l[10], p;
});
W8.displayName = "TransitionLink";
const Rb = ({
  children: a
}) => a;
Rb.isModalPage = !0;
Rb.propTypes = {
  id: mn.string.isRequired,
  children: mn.node
};
zr.modal;
yh[16];
const I8 = (a) => {
  const e = xt.c(2), {
    children: l
  } = a;
  let s;
  return e[0] !== l ? (s = /* @__PURE__ */ y.jsx(yT, {
    features: IT,
    strict: !0,
    children: l
  }), e[0] = l, e[1] = s) : s = e[1], s;
}, {
  setHeaderColor: tE,
  setBackgroundColor: eE
} = Sa, Ii = (a) => {
  const e = xt.c(18), {
    children: l,
    mode: s,
    headerColor: r,
    backgroundColor: c,
    expandOnMount: f
  } = a, h = s === void 0 ? "secondary" : s, {
    inDetailPane: p,
    setPaneBackground: m
  } = XC();
  let g;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (g = {
    primary: "bg_color",
    secondary: "secondary_bg_color"
  }, e[0] = g) : g = e[0];
  const v = g;
  let b;
  e[1] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (b = {
    primary: "--tg-theme-bg-color",
    secondary: "--tg-theme-secondary-bg-color"
  }, e[1] = b) : b = e[1];
  const T = b, S = r ? `#${r}` : v[h], w = c ? `#${c}` : v[h], E = c ? `#${c}` : `var(${T[h]})`;
  let _, j;
  e[2] !== f ? (_ = () => {
    f && Sa.expand();
  }, j = [f], e[2] = f, e[3] = _, e[4] = j) : (_ = e[3], j = e[4]), A.useEffect(_, j);
  let M, D;
  e[5] !== E || e[6] !== p || e[7] !== w || e[8] !== S ? (M = () => {
    p || (Sa.initData ? (eE(w), tE(S)) : document.body.style.backgroundColor = E, document.body.style.setProperty("--page-background", E));
  }, D = [w, S, E, p], e[5] = E, e[6] = p, e[7] = w, e[8] = S, e[9] = M, e[10] = D) : (M = e[9], D = e[10]), A.useEffect(M, D);
  let L, V;
  e[11] !== E || e[12] !== p || e[13] !== m ? (L = () => {
    !p || !m || m(E);
  }, V = [p, m, E], e[11] = E, e[12] = p, e[13] = m, e[14] = L, e[15] = V) : (L = e[14], V = e[15]), A.useEffect(L, V);
  let R;
  return e[16] !== l ? (R = /* @__PURE__ */ y.jsx(y.Fragment, {
    children: l
  }), e[16] = l, e[17] = R) : R = e[17], R;
};
Ii.propTypes = {
  children: mn.node,
  mode: mn.oneOf(["primary", "secondary"]),
  headerColor: mn.string,
  backgroundColor: mn.string,
  expandOnMount: mn.bool
};
const nE = "_root_125s3_1", aE = "_card_125s3_16", iE = "_container_125s3_22", Uf = "flex justify-between gap-compact px-content py-10 text-section";
function Lg(a) {
  const e = xt.c(27);
  let l, s, r, c;
  switch (e[0] !== a ? ({
    type: r,
    title: s,
    value: c,
    ...l
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c) : (l = e[1], s = e[2], r = e[3], c = e[4]), r) {
    case "Headline": {
      let f;
      e[5] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (f = Cb(Uf, "text-foreground"), e[5] = f) : f = e[5];
      let h;
      e[6] !== s ? (h = /* @__PURE__ */ y.jsx(lt, {
        variant: "title3",
        weight: "bold",
        children: s
      }), e[6] = s, e[7] = h) : h = e[7];
      let p;
      e[8] !== c ? (p = c && /* @__PURE__ */ y.jsx(lt, {
        variant: "title3",
        weight: "bold",
        children: c
      }), e[8] = c, e[9] = p) : p = e[9];
      let m;
      return e[10] !== l || e[11] !== h || e[12] !== p ? (m = /* @__PURE__ */ y.jsxs("div", {
        className: f,
        ...l,
        children: [h, p]
      }), e[10] = l, e[11] = h, e[12] = p, e[13] = m) : m = e[13], m;
    }
    case "Footer": {
      let f;
      e[14] !== s ? (f = /* @__PURE__ */ y.jsx(lt, {
        variant: "footnote",
        children: s
      }), e[14] = s, e[15] = f) : f = e[15];
      let h;
      return e[16] !== l || e[17] !== f ? (h = /* @__PURE__ */ y.jsx("div", {
        className: Uf,
        ...l,
        children: f
      }), e[16] = l, e[17] = f, e[18] = h) : h = e[18], h;
    }
    default: {
      let f;
      e[19] !== s ? (f = /* @__PURE__ */ y.jsx(lt, {
        variant: "body",
        weight: "semibold",
        children: s
      }), e[19] = s, e[20] = f) : f = e[20];
      let h;
      e[21] !== c ? (h = c && /* @__PURE__ */ y.jsx(lt, {
        variant: "footnote",
        children: c
      }), e[21] = c, e[22] = h) : h = e[22];
      let p;
      return e[23] !== l || e[24] !== f || e[25] !== h ? (p = /* @__PURE__ */ y.jsxs("div", {
        className: Uf,
        ...l,
        children: [f, h]
      }), e[23] = l, e[24] = f, e[25] = h, e[26] = p) : p = e[26], p;
    }
  }
}
const lE = zr.section, sE = yh[16], oE = 0.6, yt = (a) => {
  const e = xt.c(6);
  let l, s;
  e[0] !== a ? ({
    children: l,
    ...s
  } = a, e[0] = a, e[1] = l, e[2] = s) : (l = e[1], s = e[2]);
  let r;
  return e[3] !== l || e[4] !== s ? (r = /* @__PURE__ */ y.jsx("section", {
    className: nE,
    ...s,
    children: l
  }), e[3] = l, e[4] = s, e[5] = r) : r = e[5], r;
}, rE = (a) => {
  const e = xt.c(21);
  let l, s, r, c;
  e[0] !== a ? ({
    children: l,
    header: r,
    description: s,
    ...c
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c) : (l = e[1], s = e[2], r = e[3], c = e[4]);
  const {
    isApple: f
  } = Wi(), h = A.useRef(null), p = A.useRef(null), m = f ? lE : sE;
  let g;
  e[5] !== m ? (g = {
    radius: m,
    smoothing: oE
  }, e[5] = m, e[6] = g) : g = e[6];
  let v;
  e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = {
    autoEffects: !1
  }, e[7] = v) : v = e[7], P2(f ? p : h, g, v);
  let b;
  e[8] !== r ? (b = r && /* @__PURE__ */ y.jsx(Lg, {
    title: r
  }), e[8] = r, e[9] = b) : b = e[9];
  let T;
  e[10] !== l ? (T = /* @__PURE__ */ y.jsx("div", {
    ref: p,
    className: iE,
    children: l
  }), e[10] = l, e[11] = T) : T = e[11];
  let S;
  e[12] !== b || e[13] !== T ? (S = /* @__PURE__ */ y.jsxs("div", {
    ref: h,
    className: aE,
    children: [b, T]
  }), e[12] = b, e[13] = T, e[14] = S) : S = e[14];
  let w;
  e[15] !== s ? (w = s && /* @__PURE__ */ y.jsx(Lg, {
    type: "Footer",
    title: s
  }), e[15] = s, e[16] = w) : w = e[16];
  let E;
  return e[17] !== c || e[18] !== S || e[19] !== w ? (E = /* @__PURE__ */ y.jsxs("section", {
    ...c,
    children: [S, w]
  }), e[17] = c, e[18] = S, e[19] = w, e[20] = E) : E = e[20], E;
};
yt.Item = rE;
const uE = "_root_cnxqv_1", cE = "_icon_cnxqv_17", fE = "_content_cnxqv_42", dE = "_title_cnxqv_55", hE = "_description_cnxqv_56", mE = "_action_cnxqv_61", pE = "_link_cnxqv_61", yE = "_host_cnxqv_92", gE = "_host_top_cnxqv_105", vE = "_host_bottom_cnxqv_109", bE = "_item_cnxqv_114", xE = (a) => {
  const e = xt.c(19), {
    icon: l,
    title: s,
    description: r,
    link: c,
    action: f
  } = a, h = !!r;
  let p;
  e[0] !== l ? (p = l ? /* @__PURE__ */ y.jsx("div", {
    className: cE,
    "aria-hidden": "true",
    children: l
  }) : null, e[0] = l, e[1] = p) : p = e[1];
  const m = h ? "semibold" : void 0;
  let g;
  e[2] !== m || e[3] !== s ? (g = /* @__PURE__ */ y.jsx(lt, {
    as: "p",
    className: dE,
    variant: "subheadline2",
    weight: m,
    children: s
  }), e[2] = m, e[3] = s, e[4] = g) : g = e[4];
  let v;
  e[5] !== r ? (v = r ? /* @__PURE__ */ y.jsx(lt, {
    as: "p",
    className: hE,
    variant: "subheadline2",
    children: r
  }) : null, e[5] = r, e[6] = v) : v = e[6];
  let b;
  e[7] !== c ? (b = c ? /* @__PURE__ */ y.jsx("button", {
    type: "button",
    className: pE,
    onClick: c.onClick,
    children: /* @__PURE__ */ y.jsx(lt, {
      as: "span",
      variant: "subheadline2",
      children: c.label
    })
  }) : null, e[7] = c, e[8] = b) : b = e[8];
  let T;
  e[9] !== g || e[10] !== v || e[11] !== b ? (T = /* @__PURE__ */ y.jsxs("div", {
    className: fE,
    children: [g, v, b]
  }), e[9] = g, e[10] = v, e[11] = b, e[12] = T) : T = e[12];
  let S;
  e[13] !== f ? (S = f ? /* @__PURE__ */ y.jsx("button", {
    type: "button",
    className: mE,
    onClick: f.onClick,
    children: /* @__PURE__ */ y.jsx(lt, {
      as: "span",
      variant: "body",
      children: f.label
    })
  }) : null, e[13] = f, e[14] = S) : S = e[14];
  let w;
  return e[15] !== p || e[16] !== T || e[17] !== S ? (w = /* @__PURE__ */ y.jsxs("div", {
    className: uE,
    role: "status",
    "aria-live": "polite",
    children: [p, T, S]
  }), e[15] = p, e[16] = T, e[17] = S, e[18] = w) : w = e[18], w;
};
mn.shape({
  label: mn.node.isRequired,
  onClick: mn.func
});
const SE = 4e3, wE = 100, TE = 500, CE = (a) => {
  if (a)
    try {
      Sa.HapticFeedback?.notificationOccurred(a);
    } catch {
    }
}, EE = (a) => {
  const e = xt.c(45), {
    item: l,
    onDismiss: s
  } = a, {
    id: r,
    icon: c,
    title: f,
    description: h,
    link: p,
    action: m,
    position: g,
    duration: v,
    type: b
  } = l, T = g === void 0 ? "bottom" : g, S = v === void 0 ? SE : v, w = tC(), [E, _] = A.useState(!1), [j, M] = A.useState(0);
  let D;
  e[0] !== r || e[1] !== s ? (D = () => s(r), e[0] = r, e[1] = s, e[2] = D) : D = e[2];
  const L = D;
  let V, R;
  e[3] !== b ? (V = () => {
    CE(b);
  }, R = [b], e[3] = b, e[4] = V, e[5] = R) : (V = e[4], R = e[5]), A.useEffect(V, R);
  let q, X;
  e[6] !== L || e[7] !== S || e[8] !== E ? (q = () => {
    if (!S || E)
      return;
    const Nt = setTimeout(L, S);
    return () => clearTimeout(Nt);
  }, X = [S, E, L], e[6] = L, e[7] = S, e[8] = E, e[9] = q, e[10] = X) : (q = e[9], X = e[10]), A.useEffect(q, X);
  const Z = T === "top" ? -32 : 32, et = b === "error";
  let F;
  e[11] !== w || e[12] !== Z ? (F = w ? {
    opacity: 0
  } : {
    opacity: 0,
    y: Z,
    scale: 0.96
  }, e[11] = w, e[12] = Z, e[13] = F) : F = e[13];
  const W = F;
  let nt;
  e[14] !== et || e[15] !== w ? (nt = w ? {
    opacity: 1
  } : {
    opacity: 1,
    y: 0,
    scale: 1,
    x: et ? [0, -10, 10, -7, 7, -3, 3, 0] : 0,
    transition: {
      default: e8.SNACKBAR,
      ...et && {
        x: {
          duration: 0.45,
          ease: "easeOut",
          delay: 0.18
        }
      }
    }
  }, e[14] = et, e[15] = w, e[16] = nt) : nt = e[16];
  const st = nt;
  let z;
  e[17] !== j || e[18] !== w || e[19] !== Z ? (z = w ? {
    opacity: 0,
    transition: {
      duration: 0.15
    }
  } : {
    opacity: 0,
    x: j * 400,
    y: j === 0 ? Z : 0,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }, e[17] = j, e[18] = w, e[19] = Z, e[20] = z) : z = e[20];
  const P = z;
  let tt;
  e[21] !== L ? (tt = (Nt, jt) => {
    _(!1);
    const Pt = jt.offset.x, Kt = jt.velocity.x;
    (Math.abs(Pt) > wE || Math.abs(Kt) > TE) && (M(Pt >= 0 ? 1 : -1), L());
  }, e[21] = L, e[22] = tt) : tt = e[22];
  const at = tt;
  let ut;
  e[23] !== L ? (ut = (Nt) => {
    if (Nt)
      return {
        ...Nt,
        onClick: () => {
          Nt.onClick?.(), L();
        }
      };
  }, e[23] = L, e[24] = ut) : ut = e[24];
  const N = ut, G = w ? !1 : "x";
  let I;
  e[25] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (I = () => _(!0), e[25] = I) : I = e[25];
  let it;
  e[26] !== p || e[27] !== N ? (it = N(p), e[26] = p, e[27] = N, e[28] = it) : it = e[28];
  let ft;
  e[29] !== m || e[30] !== N ? (ft = N(m), e[29] = m, e[30] = N, e[31] = ft) : ft = e[31];
  let ht;
  e[32] !== h || e[33] !== c || e[34] !== it || e[35] !== ft || e[36] !== f ? (ht = /* @__PURE__ */ y.jsx(xE, {
    icon: c,
    title: f,
    description: h,
    link: it,
    action: ft
  }), e[32] = h, e[33] = c, e[34] = it, e[35] = ft, e[36] = f, e[37] = ht) : ht = e[37];
  let gt;
  return e[38] !== st || e[39] !== P || e[40] !== at || e[41] !== W || e[42] !== G || e[43] !== ht ? (gt = /* @__PURE__ */ y.jsx(Zi, {
    className: bE,
    initial: W,
    animate: st,
    exit: P,
    layout: !0,
    drag: G,
    dragSnapToOrigin: !0,
    dragElastic: 0.6,
    dragMomentum: !1,
    onDragStart: I,
    onDragEnd: at,
    children: ht
  }), e[38] = st, e[39] = P, e[40] = at, e[41] = W, e[42] = G, e[43] = ht, e[44] = gt) : gt = e[44], gt;
}, Db = {
  top: gE,
  bottom: vE
}, AE = Object.keys(Db), ME = (a) => {
  const e = xt.c(5), {
    snackbars: l,
    onDismiss: s
  } = a;
  let r;
  e[0] !== s || e[1] !== l ? (r = AE.map((f) => {
    const h = l.filter((p) => (p.position ?? "bottom") === f);
    return /* @__PURE__ */ y.jsx("div", {
      className: `${yE} ${Db[f]}`,
      children: /* @__PURE__ */ y.jsx(pT, {
        initial: !1,
        children: h.map((p) => /* @__PURE__ */ y.jsx(EE, {
          item: p,
          onDismiss: s
        }, p.id))
      })
    }, f);
  }), e[0] = s, e[1] = l, e[2] = r) : r = e[2];
  let c;
  return e[3] !== r ? (c = /* @__PURE__ */ Or.createPortal(/* @__PURE__ */ y.jsx(y.Fragment, {
    children: r
  }), document.body), e[3] = r, e[4] = c) : c = e[4], c;
}, Nb = /* @__PURE__ */ A.createContext(null), jE = () => {
  const a = A.useContext(Nb);
  if (!a)
    throw new Error("useSnackbar must be used inside <SnackbarProvider>");
  return a;
}, Ob = (a) => {
  const e = xt.c(9), {
    children: l
  } = a;
  let s;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (s = [], e[0] = s) : s = e[0];
  const [r, c] = A.useState(s), f = A.useRef(0);
  let h;
  e[1] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (h = (S) => {
    c((w) => w.filter((E) => E.id !== S));
  }, e[1] = h) : h = e[1];
  const p = h;
  let m;
  e[2] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (m = (S) => {
    f.current = f.current + 1;
    const w = f.current;
    return c((E) => [...E, {
      id: w,
      ...S
    }]), w;
  }, e[2] = m) : m = e[2];
  const g = m;
  let v;
  e[3] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = {
    show: g,
    dismiss: p
  }, e[3] = v) : v = e[3];
  let b;
  e[4] !== r ? (b = /* @__PURE__ */ y.jsx(ME, {
    snackbars: r,
    onDismiss: p
  }), e[4] = r, e[5] = b) : b = e[5];
  let T;
  return e[6] !== l || e[7] !== b ? (T = /* @__PURE__ */ y.jsxs(Nb.Provider, {
    value: v,
    children: [l, b]
  }), e[6] = l, e[7] = b, e[8] = T) : T = e[8], T;
}, _E = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/loader" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", d: "M12 3.02148C16.9704 3.02148 20.9997 7.07957 21 12.0859C21 17.0925 16.9706 21.1514 12 21.1514C7.02944 21.1514 3 17.0925 3 12.0859C3.00026 11.5299 3.44787 11.0791 4 11.0791C4.55213 11.0791 4.99974 11.5299 5 12.0859C5 15.9799 8.13401 19.1367 12 19.1367C15.866 19.1367 19 15.9799 19 12.0859C18.9997 8.19215 15.8658 5.03613 12 5.03613C9.64439 5.03613 7.56033 6.20674 6.29004 8.00684C5.97018 8.46016 5.34566 8.56708 4.89551 8.24512C4.44533 7.92286 4.33924 7.29328 4.65918 6.83984C6.28848 4.53074 8.96935 3.02148 12 3.02148Z", fill: "#3D3C3A" }))), RE = "_centered_1ma1e_1", DE = "_spinner_1ma1e_8", zb = (a) => {
  const e = xt.c(15);
  let l, s, r, c;
  e[0] !== a ? ({
    centered: l,
    className: s,
    size: c,
    ...r
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c) : (l = e[1], s = e[2], r = e[3], c = e[4]);
  let f;
  e[5] !== s ? (f = [DE, s].filter(Boolean), e[5] = s, e[6] = f) : f = e[6];
  const h = f.join(" ");
  let p;
  e[7] !== c ? (p = c ? {
    width: c,
    height: c
  } : void 0, e[7] = c, e[8] = p) : p = e[8];
  const m = p;
  let g;
  e[9] !== h || e[10] !== r || e[11] !== m ? (g = /* @__PURE__ */ y.jsx(_E, {
    ...r,
    className: h,
    style: m
  }), e[9] = h, e[10] = r, e[11] = m, e[12] = g) : g = e[12];
  const v = g;
  if (l) {
    let b;
    return e[13] !== v ? (b = /* @__PURE__ */ y.jsx("div", {
      className: RE,
      children: v
    }), e[13] = v, e[14] = b) : b = e[14], b;
  }
  return v;
}, NE = "_root_warzp_1", OE = "_gradient_warzp_71", zE = "_clipPathContainer_warzp_113", LE = "_tab_1mynw_1", BE = "_icon_1mynw_37", VE = "_active_1mynw_62", Lb = (a) => {
  const e = xt.c(21);
  let l, s, r, c, f, h;
  e[0] !== a ? ({
    isActive: s,
    onClick: c,
    label: r,
    icon: l,
    className: h,
    ...f
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c, e[5] = f, e[6] = h) : (l = e[1], s = e[2], r = e[3], c = e[4], f = e[5], h = e[6]);
  const p = h === void 0 ? "" : h;
  let m;
  e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (m = {
    type: "spring",
    stiffness: 800,
    damping: 50
  }, e[7] = m) : m = e[7];
  const g = `${LE} ${s ? VE : ""} ${p}`;
  let v;
  e[8] !== g ? (v = g.trim(), e[8] = g, e[9] = v) : v = e[9];
  let b;
  e[10] !== l ? (b = /* @__PURE__ */ y.jsx(Zi, {
    layout: !0,
    className: BE,
    children: l
  }), e[10] = l, e[11] = b) : b = e[11];
  let T;
  e[12] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (T = {
    display: "inline-block"
  }, e[12] = T) : T = e[12];
  let S;
  e[13] !== r ? (S = /* @__PURE__ */ y.jsx(iw, {
    layout: !0,
    style: T,
    children: r
  }), e[13] = r, e[14] = S) : S = e[14];
  let w;
  return e[15] !== c || e[16] !== f || e[17] !== v || e[18] !== b || e[19] !== S ? (w = /* @__PURE__ */ y.jsxs(Zi, {
    layout: !0,
    transition: m,
    ...f,
    className: v,
    onClick: c,
    children: [b, S]
  }), e[15] = c, e[16] = f, e[17] = v, e[18] = b, e[19] = S, e[20] = w) : w = e[20], w;
};
function UE({
  tabsLength: a,
  activeIndex: e,
  onSnapToSame: l,
  onSnapToNew: s,
  spring: r
}) {
  const c = A.useRef(null), [f, h] = A.useState(!1), [p, m] = A.useState(null), g = A.useRef(null), v = A.useRef(!1), b = A.useRef(null), T = A.useRef(0), S = 6, w = 100 / a, E = `calc(${w}% + 7.33px - 4px)`, _ = `calc(${w * e}% - ${3.67 * e}px)`, j = _, M = `calc(100% - (${_} + ${E}) - 2.33px * ${e})`, D = f && p != null ? `inset(0 ${100 - (p + w)}% 0 ${p}% round 100px)` : `inset(0 ${M} 0 ${j} round 100px)`, L = f ? {
    clipPath: {
      duration: 0
    }
  } : {
    clipPath: r
  }, V = (W) => {
    const nt = c.current;
    if (!nt) return;
    const st = nt.getBoundingClientRect(), z = W - st.left, P = st.width;
    if (P <= 0) return;
    const tt = z / P * 100, at = Vf(tt - w / 2, 0, 100 - w);
    m(at);
  }, R = (W) => {
    v.current = !0, b.current = W.pointerId, T.current = W.clientX;
  }, q = (W) => {
    if (!(b.current != null && W.pointerId !== b.current)) {
      if (!f) {
        if (!v.current) return;
        if (Math.abs(W.clientX - T.current) >= S) {
          try {
            W.currentTarget.setPointerCapture?.(W.pointerId), g.current = W.pointerId;
          } catch {
          }
          h(!0), V(W.clientX), W.preventDefault();
        }
        return;
      }
      g.current != null && W.pointerId !== g.current || (V(W.clientX), W.preventDefault());
    }
  }, X = (W) => {
    const nt = c.current;
    let st = e;
    if (nt && typeof W == "number") {
      const z = nt.getBoundingClientRect(), P = W - z.left, tt = z.width;
      if (tt > 0) {
        const at = tt / a;
        st = Vf(Math.round(P / at - 0.5), 0, a - 1);
      }
    } else if (p != null) {
      const z = 100 / a;
      st = Vf(Math.round(p / z), 0, a - 1);
    }
    st === e ? l?.() : s?.(st), h(!1), m(null), g.current = null;
  }, Z = (W) => {
    if (v.current = !1, b.current = null, !!f && !(g.current != null && W.pointerId !== g.current)) {
      try {
        W.currentTarget.releasePointerCapture?.(W.pointerId);
      } catch {
      }
      X(W.clientX), W.preventDefault();
    }
  }, et = (W) => {
    v.current = !1, b.current = null, f && (X(W?.clientX), W.preventDefault?.());
  }, F = (W) => {
    f && X(W?.clientX);
  };
  return A.useEffect(() => {
    const W = () => {
      h(!1), m(null), g.current = null, v.current = !1, b.current = null;
    };
    return window.addEventListener("blur", W), () => window.removeEventListener("blur", W);
  }, []), {
    overlayRef: c,
    isDragging: f,
    animate: {
      clipPath: D
    },
    transition: L,
    handlers: {
      onPointerDown: R,
      onPointerMove: q,
      onPointerUp: Z,
      onPointerCancel: et,
      onPointerLeave: F
    }
  };
}
function kE(a) {
  const e = xt.c(40), {
    width: l,
    height: s,
    insets: r,
    innerHeight: c,
    className: f
  } = a;
  let h;
  e[0] !== r ? (h = r === void 0 ? {
    top: 21,
    right: 21,
    bottom: 21,
    left: 21
  } : r, e[0] = r, e[1] = h) : h = e[1];
  const p = h, m = c === void 0 ? 64 : c, g = A.useId();
  if (!l || !s)
    return null;
  const {
    top: v,
    right: b,
    bottom: T,
    left: S
  } = p, w = l + S + b, E = m + v + T, _ = Math.max(0, w - S - b), j = Math.min(m / 2, _ / 2, 999), M = `grad-${g}`, D = `mask-${g}`, L = Math.max(S, b), V = Math.max(v, T), R = `0 0 ${w} ${E}`;
  let q;
  e[2] !== f ? (q = [OE, f].filter(Boolean), e[2] = f, e[3] = q) : q = e[3];
  const X = q.join(" "), Z = `${L}px`, et = `${V}px`;
  let F;
  e[4] !== Z || e[5] !== et ? (F = {
    "--overlay-padding-x": Z,
    "--overlay-padding-y": et
  }, e[4] = Z, e[5] = et, e[6] = F) : F = e[6];
  let W, nt;
  e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (W = /* @__PURE__ */ y.jsx("stop", {
    offset: "0%",
    stopColor: "var(--mask-color)",
    stopOpacity: "var(--mask-opacity-top)"
  }), nt = /* @__PURE__ */ y.jsx("stop", {
    offset: "100%",
    stopColor: "var(--mask-color)",
    stopOpacity: "var(--mask-opacity-bottom)"
  }), e[7] = W, e[8] = nt) : (W = e[7], nt = e[8]);
  let st;
  e[9] !== M ? (st = /* @__PURE__ */ y.jsxs("linearGradient", {
    id: M,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1",
    children: [W, nt]
  }), e[9] = M, e[10] = st) : st = e[10];
  let z;
  e[11] !== E || e[12] !== w ? (z = /* @__PURE__ */ y.jsx("rect", {
    x: "0",
    y: "0",
    width: w,
    height: E,
    fill: "var(--ui-static-white)"
  }), e[11] = E, e[12] = w, e[13] = z) : z = e[13];
  let P;
  e[14] !== m || e[15] !== _ || e[16] !== S || e[17] !== j || e[18] !== v ? (P = /* @__PURE__ */ y.jsx("rect", {
    x: S,
    y: v,
    width: _,
    height: m,
    rx: j,
    ry: j,
    fill: "var(--ui-static-black)"
  }), e[14] = m, e[15] = _, e[16] = S, e[17] = j, e[18] = v, e[19] = P) : P = e[19];
  let tt;
  e[20] !== D || e[21] !== z || e[22] !== P ? (tt = /* @__PURE__ */ y.jsxs("mask", {
    id: D,
    maskUnits: "userSpaceOnUse",
    children: [z, P]
  }), e[20] = D, e[21] = z, e[22] = P, e[23] = tt) : tt = e[23];
  let at;
  e[24] !== st || e[25] !== tt ? (at = /* @__PURE__ */ y.jsxs("defs", {
    children: [st, tt]
  }), e[24] = st, e[25] = tt, e[26] = at) : at = e[26];
  const ut = `url(#${M})`, N = `url(#${D})`;
  let G;
  e[27] !== E || e[28] !== w || e[29] !== ut || e[30] !== N ? (G = /* @__PURE__ */ y.jsx("rect", {
    width: w,
    height: E,
    fill: ut,
    mask: N
  }), e[27] = E, e[28] = w, e[29] = ut, e[30] = N, e[31] = G) : G = e[31];
  let I;
  return e[32] !== E || e[33] !== w || e[34] !== at || e[35] !== G || e[36] !== R || e[37] !== X || e[38] !== F ? (I = /* @__PURE__ */ y.jsxs("svg", {
    width: w,
    height: E,
    viewBox: R,
    preserveAspectRatio: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: X,
    style: F,
    "aria-hidden": !0,
    children: [at, G]
  }), e[32] = E, e[33] = w, e[34] = at, e[35] = G, e[36] = R, e[37] = X, e[38] = F, e[39] = I) : I = e[39], I;
}
const HE = (a) => {
  const e = xt.c(24), {
    tabs: l,
    activeIndex: s,
    onChange: r
  } = a;
  let c;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (c = {
    type: "spring",
    stiffness: 800,
    damping: 50
  }, e[0] = c) : c = e[0];
  let f;
  e[1] !== s || e[2] !== r || e[3] !== l.length ? (f = {
    tabsLength: l.length,
    activeIndex: s,
    spring: c,
    onSnapToNew: r
  }, e[1] = s, e[2] = r, e[3] = l.length, e[4] = f) : f = e[4];
  const {
    overlayRef: h,
    animate: p,
    transition: m,
    handlers: g
  } = UE(f);
  let v;
  e[5] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = {
    opacity: 0
  }, e[5] = v) : v = e[5];
  let b;
  e[6] !== p ? (b = {
    opacity: 1,
    ...p
  }, e[6] = p, e[7] = b) : b = e[7];
  let T;
  e[8] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (T = {
    duration: 0.2
  }, e[8] = T) : T = e[8];
  let S;
  e[9] !== m.clipPath ? (S = {
    default: T,
    clipPath: m.clipPath
  }, e[9] = m.clipPath, e[10] = S) : S = e[10];
  let w;
  if (e[11] !== s || e[12] !== r || e[13] !== l) {
    let _;
    e[15] !== s || e[16] !== r ? (_ = (j, M) => /* @__PURE__ */ y.jsx(Lb, {
      isActive: M === s,
      onClick: () => r(M),
      "data-overlay": !0,
      ...j
    }, M), e[15] = s, e[16] = r, e[17] = _) : _ = e[17], w = l.map(_), e[11] = s, e[12] = r, e[13] = l, e[14] = w;
  } else
    w = e[14];
  let E;
  return e[18] !== g || e[19] !== h || e[20] !== b || e[21] !== S || e[22] !== w ? (E = /* @__PURE__ */ y.jsx(Zi, {
    className: zE,
    ref: h,
    ...g,
    initial: v,
    animate: b,
    transition: S,
    children: w
  }), e[18] = g, e[19] = h, e[20] = b, e[21] = S, e[22] = w, e[23] = E) : E = e[23], E;
}, qE = (a) => {
  const e = xt.c(43), {
    tabs: l,
    onChange: s,
    defaultIndex: r
  } = a, c = r === void 0 ? 0 : r, {
    isApple: f
  } = Wi(), [h, p] = A.useState(c);
  let m, g;
  e[0] !== c ? (m = () => {
    p(c);
  }, g = [c], e[0] = c, e[1] = m, e[2] = g) : (m = e[1], g = e[2]), A.useEffect(m, g);
  let v, b;
  e[3] !== l.length ? (v = () => {
    p((at) => Math.min(at, l.length - 1));
  }, b = [l.length], e[3] = l.length, e[4] = v, e[5] = b) : (v = e[4], b = e[5]), A.useEffect(v, b);
  let T;
  e[6] !== h || e[7] !== s ? (T = (at) => {
    at !== h && (p(at), s?.(at));
  }, e[6] = h, e[7] = s, e[8] = T) : T = e[8];
  const S = T, w = A.useRef(null), [E, _] = A.useState(0);
  let j;
  e[9] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (j = (at) => {
    _(at.contentRect.width);
  }, e[9] = j) : j = e[9], k8(w, j);
  const M = l.length === 3 ? 54 : 21;
  let D;
  e[10] !== f || e[11] !== M ? (D = f ? {
    left: M,
    right: M,
    width: `calc(100% - ${M * 2}px)`
  } : {}, e[10] = f, e[11] = M, e[12] = D) : D = e[12];
  const L = D;
  let V;
  e[13] !== M ? (V = {
    top: 21,
    bottom: 21,
    left: M,
    right: M
  }, e[13] = M, e[14] = V) : V = e[14];
  const R = V;
  let q, X;
  e[15] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (q = {
    scale: 1.02
  }, X = {
    scale: {
      type: "spring",
      stiffness: 800,
      damping: 40
    }
  }, e[15] = q, e[16] = X) : (q = e[15], X = e[16]);
  let Z;
  e[17] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (Z = {
    display: "flex",
    width: "100%",
    position: "relative",
    zIndex: 1
  }, e[17] = Z) : Z = e[17];
  let et;
  if (e[18] !== h || e[19] !== S || e[20] !== l) {
    let at;
    e[22] !== h || e[23] !== S ? (at = (ut, N) => /* @__PURE__ */ y.jsx(Lb, {
      isActive: N === h,
      onClick: () => S(N),
      ...ut
    }, N), e[22] = h, e[23] = S, e[24] = at) : at = e[24], et = l.map(at), e[18] = h, e[19] = S, e[20] = l, e[21] = et;
  } else
    et = e[21];
  let F;
  e[25] !== et ? (F = /* @__PURE__ */ y.jsx("div", {
    style: Z,
    children: et
  }), e[25] = et, e[26] = F) : F = e[26];
  let W;
  e[27] !== h || e[28] !== S || e[29] !== l ? (W = /* @__PURE__ */ y.jsx(HE, {
    tabs: l,
    activeIndex: h,
    onChange: S
  }), e[27] = h, e[28] = S, e[29] = l, e[30] = W) : W = e[30];
  const nt = f ? "visible" : "hidden";
  let st;
  e[31] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (st = /* @__PURE__ */ y.jsx(ys, {}), e[31] = st) : st = e[31];
  let z;
  e[32] !== R || e[33] !== E ? (z = /* @__PURE__ */ y.jsx(kE, {
    width: E,
    height: 64,
    insets: R
  }), e[32] = R, e[33] = E, e[34] = z) : z = e[34];
  let P;
  e[35] !== nt || e[36] !== z ? (P = /* @__PURE__ */ y.jsxs(A.Activity, {
    mode: nt,
    children: [st, z]
  }), e[35] = nt, e[36] = z, e[37] = P) : P = e[37];
  let tt;
  return e[38] !== L || e[39] !== F || e[40] !== W || e[41] !== P ? (tt = /* @__PURE__ */ y.jsxs(Zi, {
    ref: w,
    className: NE,
    whileTap: q,
    transition: X,
    style: L,
    layout: !0,
    children: [F, W, P]
  }), e[38] = L, e[39] = F, e[40] = W, e[41] = P, e[42] = tt) : tt = e[42], tt;
}, Dh = "_badge_dqs9c_1", Bb = "_filled_dqs9c_19", Vb = "_tinted_dqs9c_24", Ub = "_gray_dqs9c_29", kb = "_media_dqs9c_34", Hb = "_outlined_dqs9c_39", $E = {
  badge: Dh,
  filled: Bb,
  tinted: Vb,
  gray: Ub,
  media: kb,
  outlined: Hb
}, GE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  badge: Dh,
  default: $E,
  filled: Bb,
  gray: Ub,
  media: kb,
  outlined: Hb,
  tinted: Vb
}, Symbol.toStringTag, { value: "Module" })), YE = (a) => {
  const e = xt.c(35);
  let l, s, r, c, f, h, p, m;
  e[0] !== a ? ({
    variant: c,
    textVariant: f,
    circled: h,
    squared: p,
    style: r,
    className: s,
    children: l,
    ...m
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c, e[5] = f, e[6] = h, e[7] = p, e[8] = m) : (l = e[1], s = e[2], r = e[3], c = e[4], f = e[5], h = e[6], p = e[7], m = e[8]);
  const g = c === void 0 ? "filled" : c, v = f === void 0 ? "body" : f, b = h === void 0 ? !1 : h, T = p === void 0 ? !1 : p;
  let S;
  e[9] !== b ? (S = b && {
    "data-circled": !0
  }, e[9] = b, e[10] = S) : S = e[10];
  let w;
  e[11] !== T ? (w = T && {
    "data-squared": !0
  }, e[11] = T, e[12] = w) : w = e[12];
  let E;
  e[13] !== S || e[14] !== w ? (E = {
    ...S,
    ...w
  }, e[13] = S, e[14] = w, e[15] = E) : E = e[15];
  const _ = E, j = r?.background || r?.backgroundColor || null;
  let M = r;
  if (g === "filled") {
    const V = j || "var(--tg-theme-button-color)";
    let R;
    e[16] !== r ? (R = r?.color && {
      "--badge-text-color": r.color
    }, e[16] = r, e[17] = R) : R = e[17];
    let q;
    e[18] !== r || e[19] !== V || e[20] !== R ? (q = {
      ...r,
      "--badge-background": V,
      ...R
    }, e[18] = r, e[19] = V, e[20] = R, e[21] = q) : q = e[21], M = q;
  } else if (g === "tinted") {
    const V = r.color || j || "var(--tg-theme-button-color)";
    let R;
    e[22] !== r.color ? (R = r?.color && {
      "--badge-text-color": r.color
    }, e[22] = r.color, e[23] = R) : R = e[23];
    let q;
    e[24] !== r || e[25] !== R || e[26] !== V ? (q = {
      ...r,
      "--badge-background": V,
      ...R
    }, e[24] = r, e[25] = R, e[26] = V, e[27] = q) : q = e[27], M = q;
  }
  const D = `${Dh} ${GE[g]} ${s || ""}`;
  let L;
  return e[28] !== M || e[29] !== l || e[30] !== _ || e[31] !== D || e[32] !== m || e[33] !== v ? (L = /* @__PURE__ */ y.jsx(lt, {
    variant: v,
    className: D,
    style: M,
    ..._,
    ...m,
    children: l
  }), e[28] = M, e[29] = l, e[30] = _, e[31] = D, e[32] = m, e[33] = v, e[34] = L) : L = e[34], L;
};
zr["tooltip-surface"];
const tl = (a) => {
  const e = xt.c(2), {
    children: l
  } = a;
  let s;
  return e[0] !== l ? (s = /* @__PURE__ */ y.jsx(I8, {
    children: /* @__PURE__ */ y.jsx(DC, {
      children: /* @__PURE__ */ y.jsx(Y8, {
        children: /* @__PURE__ */ y.jsx(Ob, {
          children: l
        })
      })
    })
  }), e[0] = l, e[1] = s) : s = e[1], s;
}, XE = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/home" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", d: "M11.2921 3.10288C11.7572 2.98914 12.243 2.98915 12.7081 3.10288C13.2396 3.23288 13.709 3.55457 14.2432 3.92027L19.2442 7.33335C19.6706 7.62361 20.0467 7.87916 20.3282 8.22788C20.5749 8.53357 20.7603 8.88486 20.8731 9.26206C21.0018 9.69232 21.0007 10.1491 21.0001 10.6673V16.9613C21.0001 17.4921 21.0004 17.9503 20.9698 18.3275C20.9375 18.7256 20.8656 19.1213 20.6729 19.5023C20.3853 20.0709 19.9269 20.5339 19.3624 20.8236C18.9841 21.0177 18.5907 21.0889 18.1954 21.1214C17.8209 21.1523 17.366 21.1527 16.8389 21.1527H7.16121C6.63427 21.1527 6.17922 21.1523 5.80476 21.1214C5.40975 21.0889 5.01682 21.0175 4.63875 20.8236C4.07426 20.5339 3.61484 20.0709 3.32722 19.5023C3.13458 19.1213 3.06265 18.7255 3.03035 18.3275C2.99975 17.9503 3.00006 17.4921 3.00008 16.9613V10.6673C2.99948 10.1491 2.99933 9.69232 3.12801 9.26206C3.24091 8.8848 3.42612 8.53359 3.67293 8.22788C3.95441 7.87922 4.32962 7.62355 4.75593 7.33335L9.75691 3.92027C10.2911 3.55462 10.7606 3.23292 11.2921 3.10288ZM10.5001 12.0882C9.94779 12.0882 9.50008 12.5359 9.50008 13.0882V16.1244C9.50008 16.6767 9.94779 17.1244 10.5001 17.1244H13.5001C14.0524 17.1244 14.5001 16.6767 14.5001 16.1244V13.0882C14.5001 12.5359 14.0524 12.0882 13.5001 12.0882H10.5001Z", fill: "currentColor" }))), PE = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/calendar" }, /* @__PURE__ */ A.createElement("path", { id: "Union", d: "M19.6748 10.7998C19.9782 10.7998 20.1303 10.7997 20.2441 10.8633C20.3246 10.9083 20.3915 10.9752 20.4365 11.0557C20.5001 11.1695 20.5 11.3216 20.5 11.625V13.9004C20.5 16.329 20.5 17.5435 19.9902 18.4541C19.6298 19.0977 19.0977 19.6298 18.4541 19.9902C17.5435 20.5 16.329 20.5 13.9004 20.5H10.0996C7.67103 20.5 6.4565 20.5 5.5459 19.9902C4.90227 19.6298 4.37022 19.0977 4.00977 18.4541C3.5 17.5435 3.5 16.329 3.5 13.9004V11.625C3.5 11.3216 3.49986 11.1695 3.56348 11.0557C3.60853 10.9752 3.67541 10.9083 3.75586 10.8633C3.86967 10.7997 4.02177 10.7998 4.3252 10.7998H19.6748ZM16 1.5C16.5523 1.5 17 1.94772 17 2.5V3.58984C17.5949 3.66023 18.0539 3.78571 18.4541 4.00977C19.0977 4.37022 19.6298 4.90227 19.9902 5.5459C20.3615 6.20916 20.4605 7.03367 20.4873 8.37109C20.4933 8.67145 20.4965 8.8223 20.4336 8.93848C20.3896 9.01965 20.3215 9.08906 20.2412 9.13477C20.1263 9.20009 19.9733 9.2002 19.668 9.2002H4.33203C4.02672 9.2002 3.87368 9.20009 3.75879 9.13477C3.67854 9.08906 3.61044 9.01965 3.56641 8.93848C3.50351 8.8223 3.50669 8.67145 3.5127 8.37109C3.53947 7.03367 3.63847 6.20916 4.00977 5.5459C4.37022 4.90227 4.90227 4.37022 5.5459 4.00977C5.94613 3.78571 6.40508 3.66023 7 3.58984V2.5C7 1.94772 7.44772 1.5 8 1.5C8.55228 1.5 9 1.94772 9 2.5V3.50488C9.33664 3.50264 9.70183 3.5 10.0996 3.5H13.9004C14.2982 3.5 14.6634 3.50264 15 3.50488V2.5C15 1.94772 15.4477 1.5 16 1.5Z", fill: "#3D3C3A" }))), Vr = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "#3D3C3A" }), /* @__PURE__ */ A.createElement("path", { id: "Vector 234255039", d: "M9 12.439L11.1818 14.8564L13.0909 11.8347L14.0455 10.3238L14.5227 9.56836", stroke: "white", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }))), Td = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "#3D3C3A" }), /* @__PURE__ */ A.createElement("path", { id: "Vector 234255931", d: "M12 12.5V8", stroke: "white", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ A.createElement("circle", { id: "Ellipse 253668", cx: 1, cy: 1, r: 1, transform: "matrix(1 0 0 -1 11 17)", fill: "white" }))), KE = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/heart" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", fillRule: "evenodd", clipRule: "evenodd", d: "M12 6.34213C13.1016 4.86137 14.8294 3.86287 16.9203 4.05233C19.9439 4.3263 22.0001 6.73448 22.0001 9.87524C22.0001 12.7458 20.4285 15.1633 18.5183 16.9571C16.6026 18.756 14.2269 20.0464 12.319 20.6691C12.1117 20.7368 11.8884 20.7368 11.6811 20.6691C9.77325 20.0464 7.39752 18.756 5.48179 16.9571C3.57156 15.1633 2 12.7458 2 9.87524C2 6.73448 4.05617 4.3263 7.07975 4.05233C9.17073 3.86287 10.8984 4.86142 12 6.34213Z", fill: "currentColor" }))), ZE = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/cup" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", fillRule: "evenodd", clipRule: "evenodd", d: "M12.9992 3.02148C17.9698 3.02148 21.9992 5.27629 21.9992 8.05772C21.9992 12.0867 20.9992 21.1519 12.9992 21.1519C9.14215 21.1518 6.91501 19.043 5.63991 16.4088L4.98464 16.5417C2.90427 16.9606 0.88686 15.5799 0.507098 13.4776C0.136993 11.4266 1.46695 9.45421 3.49635 9.04529L4.01491 8.94004C4.0039 8.6258 3.99928 8.33024 3.99928 8.05772C3.99928 5.27633 8.02884 3.02156 12.9992 3.02148ZM3.88796 11.0204C2.92844 11.2139 2.30006 12.1467 2.47487 13.1166C2.65441 14.111 3.60814 14.7636 4.59206 14.5654L4.89284 14.5045C4.52286 13.3122 4.29975 12.0906 4.16823 10.9634L3.88796 11.0204ZM12.9992 5.03598C9.13341 5.03604 5.99928 6.38889 5.99928 8.05772C5.99928 9.72654 9.13341 11.0794 12.9992 11.0795C16.8652 11.0795 19.9992 9.72657 19.9992 8.05772C19.9992 6.38886 16.8652 5.03598 12.9992 5.03598Z", fill: "currentColor" }))), QE = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ A.createElement("path", { id: "Vector 234255937", d: "M3.52765 9.90413C0.911528 15.9537 3.96635 21.1957 8.35342 22.5511C8.84167 22.702 9.19067 22.0789 8.92321 21.6434C8.19965 20.4654 7.47887 18.5753 8.56051 16.6478C8.64224 16.5022 8.85072 16.5146 8.93197 16.6605C9.95802 18.5031 10.9317 18.5031 10.9317 18.5031C10.9317 18.5031 8.86679 14.8896 11.7788 12.1893C11.8911 12.0851 12.0723 12.1349 12.1315 12.2762C13.3539 15.1909 17.8248 17.3143 14.8582 21.9344C14.6119 22.3181 14.8717 22.8388 15.3226 22.7712C20.4424 22.0038 22.208 16.0069 20.1757 11.4342C18.0862 6.73288 13.4876 7.04975 11.6828 2.26117C11.5637 1.9453 11.198 1.78379 10.9122 1.96333C7.99596 3.79495 6.34996 7.94875 7.37329 13.0655C6.01592 12.7262 5.08207 11.1162 4.57178 9.95361C4.37654 9.50881 3.72046 9.45827 3.52765 9.90413Z", fill: "currentColor" }))), qb = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/cross" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", d: "M16.2929 6.06242C16.6834 5.6719 17.3164 5.67191 17.707 6.06242C18.0975 6.45295 18.0975 7.08596 17.707 7.47649L13.414 11.7695L17.707 16.0624C18.0975 16.4529 18.0975 17.086 17.707 17.4765C17.3164 17.867 16.6834 17.867 16.2929 17.4765L11.9999 13.1835L7.70696 17.4765C7.31643 17.867 6.68342 17.867 6.29289 17.4765C5.90238 17.086 5.90237 16.4529 6.29289 16.0624L10.5859 11.7695L6.29289 7.47649C5.90237 7.08596 5.90237 6.45295 6.29289 6.06242C6.68342 5.6719 7.31643 5.6719 7.70696 6.06242L11.9999 10.3554L16.2929 6.06242Z", fill: "#3D3C3A" }))), $b = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "currentColor" }), /* @__PURE__ */ A.createElement("path", { id: "Vector 234255931", d: "M12 12V16", stroke: "var(--background)", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ A.createElement("circle", { id: "Ellipse 253668", cx: 12, cy: 8.5, r: 1, fill: "var(--background)" }))), Ur = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/plus" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", transform: "translate(5 4.769)", d: "M6 13C6 13 6 8 6 8C6 8 1 8 1 8C0.448 8 0 7.552 0 7C0 6.448 0.448 6 1 6C1 6 6 6 6 6C6 6 6 1 6 1C6 0.448 6.448 0 7 0C7.552 0 8 0.448 8 1C8 1 8 6 8 6C8 6 13 6 13 6C13.552 6 14 6.448 14 7C14 7.552 13.552 8 13 8C13 8 8 8 8 8C8 8 8 13 8 13C8 13.552 7.552 14 7 14C6.448 14 6 13.552 6 13Z", fill: "currentColor" }))), FE = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("path", { d: "M16.5791 4.53223C18.0851 4.53223 18.8049 4.65337 19.5361 5.04297C20.1593 5.3751 20.654 5.86826 20.9873 6.48926C21.3783 7.21793 21.5 7.93502 21.5 9.43555V14.7383C21.5 16.2388 21.3783 16.9559 20.9873 17.6846C20.654 18.3056 20.1593 18.7987 19.5361 19.1309C18.8049 19.5205 18.0851 19.6416 16.5791 19.6416H7.4209C5.91493 19.6416 5.19509 19.5205 4.46387 19.1309C3.84066 18.7987 3.34603 18.3056 3.0127 17.6846C2.62169 16.9559 2.50002 16.2388 2.5 14.7383V9.43555C2.50003 7.93502 2.62167 7.21793 3.0127 6.48926C3.34603 5.86826 3.84066 5.3751 4.46387 5.04297C5.19509 4.65337 5.91494 4.53223 7.4209 4.53223H16.5791ZM10.1436 9.44043C9.76724 8.73388 8.75424 8.73388 8.37793 9.44043L5.78223 14.3125C5.42805 14.9784 5.91082 15.7829 6.66504 15.7832H17.0791C17.8878 15.7831 18.3617 14.8726 17.8984 14.21L16.2656 11.877C15.8829 11.3303 15.0819 11.3051 14.665 11.8262L12.998 13.9092C12.8634 14.0774 12.6005 14.0532 12.499 13.8633L10.1436 9.44043Z", fill: "currentColor" })), JE = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("path", { d: "M14.0996 3.5C16.3398 3.5 17.4608 3.49957 18.3164 3.93555C19.0689 4.31902 19.681 4.93109 20.0645 5.68359C20.5004 6.53924 20.5 7.66018 20.5 9.90039V14.0996C20.5 16.3398 20.5004 17.4608 20.0645 18.3164C19.681 19.0689 19.0689 19.681 18.3164 20.0645C17.4608 20.5004 16.3398 20.5 14.0996 20.5H9.90039C7.66018 20.5 6.53924 20.5004 5.68359 20.0645C4.93109 19.681 4.31902 19.0689 3.93555 18.3164C3.49957 17.4608 3.5 16.3398 3.5 14.0996V9.90039C3.5 7.66018 3.49957 6.53924 3.93555 5.68359C4.31902 4.93109 4.93109 4.31902 5.68359 3.93555C6.53924 3.49957 7.66018 3.5 9.90039 3.5H14.0996ZM9.5 8.2002C9.05817 8.2002 8.7002 8.55817 8.7002 9C8.7002 9.44183 9.05817 9.7998 9.5 9.7998H11.2002V15.5C11.2002 15.9418 11.5582 16.2998 12 16.2998C12.4418 16.2998 12.7998 15.9418 12.7998 15.5V9.7998H14.5C14.9418 9.7998 15.2998 9.44183 15.2998 9C15.2998 8.55817 14.9418 8.2002 14.5 8.2002H9.5Z", fill: "currentColor" })), WE = {
  success: Vr,
  error: Td,
  warning: Td,
  info: $b
};
let Er = null, Bg = !1;
const Cd = [];
function IE() {
  const a = jE();
  return A.useEffect(() => (Er = a.show, Cd.length && Cd.splice(0).forEach((e) => a.show(e)), () => {
    Er = null;
  })), null;
}
function tA() {
  if (Bg || typeof document > "u") return;
  Bg = !0;
  const a = document.createElement("div");
  a.setAttribute("data-aiwa-toast-host", ""), document.body.appendChild(a), Bi.createRoot(a).render(
    /* @__PURE__ */ y.jsx(Ob, { children: /* @__PURE__ */ y.jsx(IE, {}) })
  );
}
function Gb(a, e = {}) {
  const l = typeof a == "string" ? { title: a, ...e } : { ...a };
  if (l.type && !l.icon) {
    const s = WE[l.type];
    s && (l.icon = /* @__PURE__ */ y.jsx(s, {}));
  }
  return tA(), Er ? Er(l) : (Cd.push(l), null);
}
function eA() {
  typeof window < "u" && (window.aiwaToast = Gb);
}
const Me = (a, ...e) => {
  const l = window[a];
  typeof l == "function" && l(...e);
}, te = (a, ...e) => {
  const l = window[a];
  return typeof l == "function" ? l(...e) : null;
}, ee = (a, e = {}) => {
  const l = te("aiwaApi", a, e);
  return l && typeof l.then == "function" ? l : Promise.reject(new Error("API bridge is unavailable"));
}, Rt = (a, e = {}) => Gb(a, e), Yb = (a) => Me("track", a), nA = () => {
  const a = window.Telegram?.WebApp;
  a?.close && a.close();
}, Xb = async ({ nudge: a = !0 } = {}) => {
  a && await Promise.race([
    ee("/api/nudge", {}).catch(() => null),
    new Promise((r) => setTimeout(r, 2e3))
  ]);
  const e = window.Telegram?.WebApp, l = te("aiwaData")?.bot_username, s = typeof e?.openTelegramLink == "function" && (typeof e.isVersionAtLeast != "function" || e.isVersionAtLeast("6.1"));
  l && s && e.openTelegramLink(`https://t.me/${l}`), nA();
}, aA = () => {
  const a = window.Telegram?.WebApp;
  return typeof a?.showPopup != "function" ? !1 : typeof a.isVersionAtLeast != "function" || a.isVersionAtLeast("6.2");
}, Te = (a, e) => ({
  "aria-label": a,
  onClick: e,
  onKeyDown: (l) => {
    (l.key === "Enter" || l.key === " ") && (l.preventDefault(), e());
  },
  role: "button",
  tabIndex: 0
});
function Nh({ title: a, size: e = "regular", ...l }) {
  return e === "large" ? /* @__PURE__ */ y.jsx("div", { className: "aiwa-panel-header is-large", children: /* @__PURE__ */ y.jsx(lt, { as: "h1", variant: "title1", weight: "bold", children: a }) }) : /* @__PURE__ */ y.jsx("div", { className: "aiwa-panel-header", children: /* @__PURE__ */ y.jsx(GC, { ...l, children: a }) });
}
const Vg = (a, e = "") => [
  "aiwa-date-cell",
  a.actualPeriod ? "is-actual-period" : "",
  a.predictedPeriod ? "is-predicted-period" : "",
  a.phase ? `is-phase-${a.phase}` : "",
  a.workout ? "is-workout" : "",
  a.today ? "is-today" : "",
  a.selected ? "is-selected" : "",
  a.muted ? "is-muted" : "",
  e
].filter(Boolean).join(" ");
function Pb({
  day: a,
  interactive: e = !1,
  monthLabel: l = "",
  showTodayLabel: s = !1,
  variant: r = "",
  onSelect: c = null,
  marking: f = !1,
  checked: h = !1,
  // What the selection glyph is. «Близость» marks a day with the same heart the
  // calendar already uses for it outside marking mode, so the mark you are making
  // looks like the mark you will get; everything else keeps the neutral radio.
  markVariant: p = "radio"
}) {
  const m = f && p === "heart", g = [r ? `is-${r}` : "", f ? "is-marking" : ""].filter(Boolean).join(" "), v = f ? { iso: a.iso, today: a.today, muted: a.muted } : a, b = /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
    f ? null : /* @__PURE__ */ y.jsx("span", { className: "aiwa-date-cell-ring", "aria-hidden": "true" }),
    /* @__PURE__ */ y.jsx(lt, { className: "aiwa-date-cell-number", variant: "body", weight: "regular", children: a.date }),
    f ? /* @__PURE__ */ y.jsx(
      "span",
      {
        className: `aiwa-date-cell-radio${m ? " is-heart" : ""}${h ? " is-checked" : ""}`,
        "aria-hidden": "true",
        children: m ? /* @__PURE__ */ y.jsx(KE, {}) : h ? /* @__PURE__ */ y.jsx(Vr, {}) : null
      }
    ) : null,
    !f && a.phase && !a.actualPeriod && !a.predictedPeriod ? /* @__PURE__ */ y.jsx("span", { className: "aiwa-date-cell-dot", "aria-hidden": "true" }) : null,
    !f && a.intimacy ? /* @__PURE__ */ y.jsx("span", { className: "aiwa-date-cell-heart", "aria-hidden": "true", children: "♥" }) : null,
    s && a.today && !f ? /* @__PURE__ */ y.jsx(lt, { className: "aiwa-date-cell-today", variant: "caption1", weight: "regular", children: "Сегодня" }) : null
  ] });
  if (!e)
    return /* @__PURE__ */ y.jsx("div", { className: Vg(v, g), "data-iso": a.iso, "aria-label": `${a.label || "День"}, ${a.date}`, children: b });
  const T = l || a.monthLabel || "", S = T ? `${a.date} ${T}` : `${a.label || "День"}, ${a.date}`, w = f ? h ? ", отмечено" : "" : `${a.actualPeriod ? ", отмечены месячные" : ""}${a.predictedPeriod ? ", прогноз месячных" : ""}${a.intimacy ? ", отмечена близость" : ""}`;
  return /* @__PURE__ */ y.jsx(
    we,
    {
      as: "button",
      type: "button",
      mode: "opacity",
      disabled: a.disabled,
      "aria-label": `${S}${w}`,
      "aria-pressed": f ? h : typeof a.selected == "boolean" ? a.selected : void 0,
      className: Vg(v, ["aiwa-calendar-day", g].filter(Boolean).join(" ")),
      "data-iso": a.iso,
      onClick: () => c ? c(a) : Me("aiwaCalendarDay", a.iso),
      children: b
    }
  );
}
function Kb(a, ...e) {
  A.useEffect(() => {
    const l = a.current;
    if (!l) return;
    const s = (r) => {
      if (r.ctrlKey || Math.abs(r.deltaX) > Math.abs(r.deltaY)) return;
      const c = l.scrollWidth - l.clientWidth;
      if (c <= 0) return;
      const f = Math.min(c, Math.max(0, l.scrollLeft + r.deltaY));
      f !== l.scrollLeft && (l.scrollLeft = f, r.preventDefault());
    };
    return l.addEventListener("wheel", s, { passive: !1 }), () => l.removeEventListener("wheel", s);
  }, [a, ...e]);
}
const iA = 140;
function Ug(a, e) {
  const l = a.scrollWidth - a.clientWidth, s = e.offsetLeft - (a.clientWidth - e.offsetWidth) / 2;
  return Math.min(l, Math.max(0, s));
}
function lA(a) {
  const e = [...a.querySelectorAll("[data-iso]")].filter((f) => !f.disabled);
  if (!e.length) return null;
  const l = a.scrollWidth - a.clientWidth;
  if (a.scrollLeft <= 1) return e[0];
  if (a.scrollLeft >= l - 1) return e[e.length - 1];
  const s = a.scrollLeft + a.clientWidth / 2;
  let r = null, c = 1 / 0;
  for (const f of e) {
    const h = Math.abs(f.offsetLeft + f.offsetWidth / 2 - s);
    h < c && (c = h, r = f);
  }
  return r;
}
function Zb({ days: a, selectedIso: e = "", onSelect: l = null }) {
  const s = typeof l == "function", r = A.useRef(null), c = A.useRef(null);
  c.current = { days: a, selectedIso: e, onSelect: l };
  const f = A.useRef("");
  return Kb(r, a?.length), A.useLayoutEffect(() => {
    const h = r.current;
    if (!h) return;
    const p = f.current;
    if (f.current = "", p && p === e || h.scrollWidth - h.clientWidth <= 0) return;
    const g = h.querySelector(e ? `[data-iso="${e}"]` : ".is-today");
    g && (h.scrollLeft = Ug(h, g));
  }, [e, a?.length]), A.useEffect(() => {
    const h = r.current;
    if (!h || !s) return;
    let p = 0, m = !1, g = !1;
    const v = () => {
      if (p = 0, m || !g) return;
      g = !1;
      const _ = lA(h);
      if (!_) return;
      const { days: j, selectedIso: M, onSelect: D } = c.current, L = j?.find((R) => R.iso === _.dataset.iso);
      if (!L) return;
      L.iso !== M && (f.current = L.iso, D(L));
      const V = Ug(h, _);
      if (Math.abs(V - h.scrollLeft) > 0.5) {
        const R = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        h.scrollTo({ left: V, behavior: R ? "auto" : "smooth" });
      }
    }, b = () => {
      p && clearTimeout(p), p = setTimeout(v, iA);
    }, T = () => {
      m && (g = !0), b();
    }, S = () => {
      m = !0;
    }, w = () => {
      m = !1, b();
    }, E = () => {
      g = !0;
    };
    return h.addEventListener("scroll", T, { passive: !0 }), h.addEventListener("touchstart", S, { passive: !0 }), h.addEventListener("touchend", w, { passive: !0 }), h.addEventListener("touchcancel", w, { passive: !0 }), h.addEventListener("wheel", E, { passive: !0 }), () => {
      p && clearTimeout(p), h.removeEventListener("scroll", T), h.removeEventListener("touchstart", S), h.removeEventListener("touchend", w), h.removeEventListener("touchcancel", w), h.removeEventListener("wheel", E);
    };
  }, [s]), /* @__PURE__ */ y.jsx(
    "div",
    {
      className: "aiwa-week",
      role: s ? "group" : void 0,
      "data-selection": e ? "true" : void 0,
      "aria-label": s ? "Выбор дня" : "Текущая неделя",
      ref: r,
      children: a.map((h) => /* @__PURE__ */ y.jsx(
        Pb,
        {
          day: e ? { ...h, selected: h.iso === e } : h,
          variant: "overview",
          interactive: s,
          onSelect: l
        },
        h.iso
      ))
    }
  );
}
const Oh = [
  ["Боль", [["cramps", "Спазмы"], ["head", "Голова"], ["breast", "Грудь"]]],
  ["Настроение", [["irrit", "Раздражительность"], ["anx", "Тревога"], ["low", "Апатия"]]],
  ["Тело", [["tired", "Усталость"], ["bloat", "Вздутие"], ["sweet", "Тянет на сладкое"]]],
  ["Кожа и сон", [["skin", "Высыпания"], ["insomnia", "Плохой сон"]]]
], Ed = {
  // One line each at the bar width: a wrapped hint pushes the bar over the grid.
  period: { label: "Месячные", hint: "нажми на день, чтобы отметить месячные", checked: (a) => a.actualPeriod },
  symptoms: { label: "Симптомы", hint: "нажми на день, чтобы записать симптомы", checked: (a) => a.logged },
  intimacy: { label: "Близость", hint: "нажми на день, чтобы отметить близость", checked: (a) => a.intimacy }
}, sA = (a) => a.map((e) => ({ value: e, label: Ed[e].label })), oA = [
  { label: "Месячные", variant: "tinted", token: "--aiwa-phase-menstrual" },
  { label: "Прогноз", variant: "outlined", token: "--aiwa-phase-menstrual" },
  { label: "Овуляция", variant: "tinted", token: "--aiwa-phase-ovulation" },
  { label: "Фолликулярная", variant: "tinted", token: "--aiwa-phase-follicular" },
  { label: "Лютеиновая", variant: "tinted", token: "--aiwa-phase-luteal" },
  { label: "Близость", variant: "tinted", token: "--aiwa-intimacy" }
], Qb = [[1, "Низкая"], [2, "Средняя"], [3, "Высокая"]], Fb = [[1, "Плохое"], [2, "Нормальное"], [3, "Хорошее"]], rA = "/assets/food/pancakes.png", Ar = [
  { value: "breakfast", label: "Завтрак" },
  { value: "lunch", label: "Обед" },
  { value: "snack", label: "Перекус" },
  { value: "dinner", label: "Ужин" }
], uA = (a) => ({
  title: a?.title || "",
  kcal: String(a?.kcal ?? ""),
  grams: String(a?.grams ?? ""),
  protein: String(a?.protein ?? ""),
  fat: String(a?.fat ?? ""),
  carbs: String(a?.carbs ?? ""),
  slot: a?.slot || "snack"
}), cA = ["Силовая", "Кардио", "Йога", "Ходьба", "Плавание", "Своё"], fA = {
  Силовая: ["Приседания", "Ягодичный мост", "Тяга верхнего блока", "Планка"],
  Кардио: ["Бег", "Велотренажёр", "Эллипс", "Гребля"],
  Йога: ["Виньяса", "Хатха", "Растяжка", "Дыхание"],
  Ходьба: ["Прогулка", "Быстрая ходьба", "Скандинавская ходьба"],
  Плавание: ["Кроль", "Брасс", "На спине"],
  Своё: []
}, dA = [
  { value: "cycle", label: "Регулярный цикл" },
  { value: "irregular", label: "Нерегулярный" },
  { value: "preg", label: "Беременность" },
  { value: "meno", label: "Менопауза" },
  { value: "none", label: "Нет месячных" }
], kg = "custom:";
function hA(a) {
  const e = a?.length ? a.flatMap(([, l]) => l) : Oh.flatMap(([, l]) => l.flat());
  return new Map(e);
}
function mA({ title: a = "Сегодня", checkin: e, symptomGroups: l, onSelect: s }) {
  const r = e?.symptoms ?? [], c = A.useRef(null);
  if (Kb(c, r.length), !r.length) return null;
  const f = hA(l), h = s ?? (() => Me("openHomePanel", "journal"));
  return /* @__PURE__ */ y.jsxs("div", { className: "aiwa-today", children: [
    /* @__PURE__ */ y.jsx(lt, { className: "aiwa-today-title", variant: "body", weight: "semibold", children: a }),
    /* @__PURE__ */ y.jsx("div", { className: "aiwa-today-chips", role: "group", "aria-label": a, ref: c, children: r.map((p) => {
      const m = p.startsWith(kg) ? p.slice(kg.length) : f.get(p) ?? p;
      return /* @__PURE__ */ y.jsx(
        we,
        {
          as: "button",
          type: "button",
          mode: "opacity",
          className: "aiwa-today-chip",
          onClick: () => h(p),
          title: m,
          children: /* @__PURE__ */ y.jsx(lt, { variant: "body", weight: "regular", children: m })
        },
        p
      );
    }) })
  ] });
}
const Hg = 1e3 / 40, pA = 5e3, Jb = (a, e) => Array.from(
  { length: e },
  (l, s) => `/assets/${a}/frame-${String(s).padStart(3, "0")}.png`
), yA = Jb("aiwa-sequence", 182), zh = Jb("aiwa-card-sequence", 193), kf = /* @__PURE__ */ new Map(), gA = (a) => (kf.has(a) || kf.set(
  a,
  Promise.all(a.map((e) => new Promise((l) => {
    const s = new Image();
    s.onload = l, s.onerror = l, s.src = e;
  })))
), kf.get(a));
function Lh({ size: a, frames: e = yA, pauseMs: l = pA }) {
  const [s, r] = A.useState(0);
  return A.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let f = !1, h = 0, p = 0;
    const m = () => {
      let g = 0;
      r(g), h = window.setInterval(() => {
        g += 1, r(g), g === e.length - 1 && (window.clearInterval(h), p = window.setTimeout(m, l || Hg));
      }, Hg);
    };
    return gA(e).then(() => {
      f || m();
    }), () => {
      f = !0, window.clearInterval(h), window.clearTimeout(p);
    };
  }, [e, l]), /* @__PURE__ */ y.jsx(
    "span",
    {
      className: "aiwa-sequence",
      style: { "--aiwa-sequence-size": `${a}px` },
      "data-aiwa-sequence": "true",
      "data-sequence": e === zh ? "card" : "default",
      "data-pause-ms": l,
      "data-frame": s,
      "aria-hidden": "true",
      children: /* @__PURE__ */ y.jsx("img", { src: e[s], alt: "", draggable: "false" })
    }
  );
}
function vA() {
  return /* @__PURE__ */ y.jsxs("div", { className: "aiwa-paper-ai-heading", children: [
    /* @__PURE__ */ y.jsx(Lh, { size: 58, frames: zh, pauseMs: 0 }),
    /* @__PURE__ */ y.jsx("div", { children: /* @__PURE__ */ y.jsx(lt, { variant: "body", weight: "semibold", children: "Айва AI" }) })
  ] });
}
function bA(a) {
  return /* @__PURE__ */ y.jsx(Yn, { ...a, "data-aiwa-cell": "true" });
}
const Dt = Object.assign(bA, {
  Start: Yn.Start,
  End: Yn.End,
  Part: Yn.Part,
  Text: Yn.Text,
  Editable: Yn.Editable,
  Switch: Yn.Switch
});
function kr({
  message: a,
  detail: e,
  onDiscuss: l,
  className: s = ""
}) {
  return /* @__PURE__ */ y.jsx(yt.Item, { className: `aiwa-insight-section ${s}`.trim(), children: /* @__PURE__ */ y.jsx(Dt, { "data-aiwa-insight-cell": "true", tappable: !1, children: /* @__PURE__ */ y.jsxs("div", { className: "aiwa-insight-content", children: [
    /* @__PURE__ */ y.jsx(vA, {}),
    /* @__PURE__ */ y.jsx(lt, { className: "aiwa-insight-message", variant: "body", weight: "regular", children: a }),
    e ? /* @__PURE__ */ y.jsx(lt, { className: "aiwa-insight-detail", variant: "body", weight: "regular", children: e }) : null,
    l ? /* @__PURE__ */ y.jsx(
      ce,
      {
        className: "aiwa-btn-secondary",
        variant: "filled",
        label: "Обсудить с Айвой",
        isFill: !0,
        onClick: l
      }
    ) : null
  ] }) }) });
}
function xA({ aiText: a }) {
  return /* @__PURE__ */ y.jsx(
    kr,
    {
      message: a,
      onDiscuss: () => Me("go", "chat")
    }
  );
}
function SA({ delay: a }) {
  return a ? /* @__PURE__ */ y.jsxs(yt.Item, { header: a.title, children: [
    /* @__PURE__ */ y.jsx(Dt, { tappable: !1, children: /* @__PURE__ */ y.jsx(Dt.Text, { title: a.message, description: a.hint }) }),
    a.canSwitchToPregnancy ? /* @__PURE__ */ y.jsx(Dt, { tappable: !1, children: /* @__PURE__ */ y.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ y.jsx(
      ce,
      {
        variant: "filled",
        label: "Перейти в режим беременности",
        isFill: !0,
        ...Te("Перейти в режим беременности", () => Me("switchPreg"))
      }
    ) }) }) : null
  ] }) : null;
}
function wA({ ok: a }) {
  const e = a ? Vr : Td;
  return /* @__PURE__ */ y.jsx("span", { className: a ? "aiwa-status is-ok" : "aiwa-status is-alert", "aria-label": a ? "В пределах нормы" : "Требует внимания", children: /* @__PURE__ */ y.jsx(e, {}) });
}
function TA({ label: a, value: e, ok: l }) {
  return /* @__PURE__ */ y.jsx(Dt, { "data-aiwa-metric-cell": "true", tappable: !1, end: /* @__PURE__ */ y.jsx(wA, { ok: l }), children: /* @__PURE__ */ y.jsx(Dt.Text, { title: a, description: e }) });
}
function CA({ metrics: a, title: e = "Статистика" }) {
  return a?.length ? /* @__PURE__ */ y.jsx(yt.Item, { header: e, children: a.map((l) => /* @__PURE__ */ y.jsx(TA, { ...l }, l.label)) }) : null;
}
const EA = A.lazy(() => import("./AiwaWebUiChart-DFlsDZVK.js").then((a) => ({
  default: a.AiwaWebUiChart
})));
function AA() {
  return /* @__PURE__ */ y.jsx("div", { className: "aiwa-area-chart-state is-loading", role: "status", "aria-label": "График загружается", children: /* @__PURE__ */ y.jsx("span", { className: "aiwa-area-chart-skeleton", "aria-hidden": "true" }) });
}
function MA({
  data: a,
  series: e,
  xKey: l,
  loading: s = !1,
  title: r = "Динамика цикла",
  emptyText: c = "Добавь ещё один завершённый цикл — здесь появится график."
}) {
  return /* @__PURE__ */ y.jsx(yt.Item, { header: r, children: /* @__PURE__ */ y.jsx(A.Suspense, { fallback: /* @__PURE__ */ y.jsx(AA, {}), children: /* @__PURE__ */ y.jsx(
    EA,
    {
      data: a,
      series: e,
      xKey: l,
      loading: s,
      ariaLabel: r,
      emptyText: c
    }
  ) }) });
}
function jA({
  history: a,
  title: e = "История цикла",
  emptyTitle: l = "История пока пуста",
  emptyDescription: s = "Она появится после первой сохранённой менструации."
}) {
  return /* @__PURE__ */ y.jsx(yt.Item, { header: e, children: a?.length ? a.map((r) => /* @__PURE__ */ y.jsx(Dt, { "data-aiwa-history-cell": "true", tappable: !1, children: /* @__PURE__ */ y.jsx(Dt.Text, { title: r.title, description: r.description }) }, r.key)) : /* @__PURE__ */ y.jsx(Dt, { "data-aiwa-history-cell": "true", tappable: !1, children: /* @__PURE__ */ y.jsx(Dt.Text, { title: l, description: s }) }) });
}
const Yi = [];
let qg = !1;
const Wb = () => typeof window < "u" ? window.Telegram?.WebApp?.BackButton : null, _A = () => Yi[Yi.length - 1]?.(), $g = () => {
  const a = Wb();
  a && (Yi.length ? a.show?.() : a.hide?.());
}, RA = (a) => {
  const e = Wb();
  return e && !qg && (e.onClick?.(_A), qg = !0), Yi.push(a), $g(), () => {
    const l = Yi.lastIndexOf(a);
    l !== -1 && Yi.splice(l, 1), $g();
  };
};
function Ib(a, e) {
  const l = A.useRef(e);
  l.current = e, A.useEffect(() => {
    if (a)
      return RA(() => l.current?.());
  }, [a]);
}
function Xn({ isOpen: a, onClose: e, onBack: l, children: s, ...r }) {
  return Ib(a, l || e), A.useEffect(() => {
    if (!a) return;
    const c = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.body.style.overflow = c;
    };
  }, [a]), a ? Or.createPortal(
    /* @__PURE__ */ y.jsx("div", { className: "aiwa-page", role: "dialog", "aria-modal": "true", ...r, children: s }),
    document.body
  ) : null;
}
function Hr({
  label: a,
  active: e = !1,
  onClick: l,
  isFill: s = !1,
  end: r = null,
  className: c = "",
  ...f
}) {
  const h = r ? /* @__PURE__ */ y.jsxs("span", { className: "aiwa-chip-content", children: [
    /* @__PURE__ */ y.jsx("span", { className: "aiwa-chip-label", children: a }),
    r
  ] }) : a;
  return /* @__PURE__ */ y.jsx(
    we,
    {
      as: "button",
      type: "button",
      mode: "opacity",
      className: `aiwa-chip${s ? " is-fill" : ""}${c ? ` ${c}` : ""}`,
      "aria-pressed": e,
      onClick: l,
      ...f,
      children: /* @__PURE__ */ y.jsx(ce, { variant: e ? "tinted" : "gray", label: h, isFill: s })
    }
  );
}
function Ad({ label: a, active: e, onChange: l, variant: s = "default" }) {
  return /* @__PURE__ */ y.jsx(
    Hr,
    {
      className: `aiwa-log-toggle is-${s}-toggle`,
      label: a,
      active: e,
      isFill: !0,
      "aria-label": `${a}: ${e ? "да" : "нет"}`,
      onClick: () => l(!e),
      end: /* @__PURE__ */ y.jsx("span", { className: "aiwa-log-toggle-mark", "aria-hidden": "true", children: e ? /* @__PURE__ */ y.jsx(Vr, {}) : null })
    }
  );
}
function t3({ label: a, children: e }) {
  return /* @__PURE__ */ y.jsxs("div", { className: "aiwa-log-group", children: [
    /* @__PURE__ */ y.jsx(lt, { className: "aiwa-log-label", variant: "subheadline1", weight: "regular", children: a }),
    /* @__PURE__ */ y.jsx("div", { className: "aiwa-log-choices", role: "group", "aria-label": a, children: e })
  ] });
}
function Mr({ label: a, options: e, value: l, onChange: s }) {
  return /* @__PURE__ */ y.jsx(t3, { label: a, children: e.map(([r, c]) => /* @__PURE__ */ y.jsx(
    Hr,
    {
      label: c,
      active: l === r,
      onClick: () => s(r)
    },
    r
  )) });
}
function e3({ label: a, options: e, symptoms: l, onToggle: s }) {
  return /* @__PURE__ */ y.jsx(t3, { label: a, children: e.map(([r, c]) => /* @__PURE__ */ y.jsx(
    Hr,
    {
      label: c,
      active: l.includes(r),
      onClick: () => s(r)
    },
    r
  )) });
}
function It({
  label: a,
  value: e,
  onChange: l = () => {
  },
  placeholder: s = "",
  type: r = "text",
  inputMode: c,
  multiline: f = !1,
  readOnly: h = !1,
  ...p
}) {
  const m = {
    ...p,
    inputMode: c,
    value: e,
    placeholder: s,
    readOnly: h,
    onChange: (g) => l(g.target.value)
  };
  return /* @__PURE__ */ y.jsxs("label", { className: "aiwa-field", children: [
    /* @__PURE__ */ y.jsx(lt, { variant: "caption1", weight: "regular", children: a }),
    f ? /* @__PURE__ */ y.jsx("textarea", { ...m }) : /* @__PURE__ */ y.jsx("input", { type: r, ...m })
  ] });
}
function n3({ value: a, onChange: e }) {
  return /* @__PURE__ */ y.jsx("div", { className: "aiwa-custom-symptom", children: /* @__PURE__ */ y.jsx(
    It,
    {
      label: "Свой симптом",
      value: a,
      onChange: e,
      placeholder: "Например, тошнота",
      maxLength: 40
    }
  ) });
}
function DA({ isOpen: a, onClose: e, checkin: l, symptomGroups: s, mode: r }) {
  const [c, f] = A.useState(l.symptoms || []), [h, p] = A.useState(l.energy || 0), [m, g] = A.useState(l.mood || 0), [v, b] = A.useState(!!l.period), [T, S] = A.useState(!!l.intimacy), [w, E] = A.useState(""), [_, j] = A.useState(!1);
  A.useEffect(() => {
    a && (f(l.symptoms || []), p(l.energy || 0), g(l.mood || 0), b(!!l.period), S(!!l.intimacy), E(""), j(!1));
  }, [a]);
  const M = (V) => {
    f((R) => R.includes(V) ? R.filter((q) => q !== V) : [...R, V]);
  }, D = s?.length ? s : Oh, L = async () => {
    if (_) return;
    const V = l.symptoms || [], R = w.trim();
    j(!0);
    try {
      let q = !1;
      v !== !!l.period && (await te("toggleTodayPeriod"), q = !0), h !== (l.energy || 0) && (await te("setCheckin", "energy", h), q = !0), m !== (l.mood || 0) && (await te("setCheckin", "mood", m), q = !0);
      for (const X of c.filter((Z) => !V.includes(Z)))
        await te("toggleSym", X);
      for (const X of V.filter((Z) => !c.includes(Z)))
        await te("toggleSym", X);
      T !== !!l.intimacy && await te("toggleTodayIntimacy"), R && (await te("addCustomSym", R), q = !0), q || Rt("Сохранено", { type: "success" }), e();
    } catch (q) {
      Rt(q?.message || "Не удалось сохранить", { type: "error" });
    } finally {
      j(!1);
    }
  };
  return /* @__PURE__ */ y.jsxs(
    Xn,
    {
      isOpen: a,
      onClose: e,
      "data-aiwa-log-modal": "true",
      children: [
        /* @__PURE__ */ y.jsx(Nh, { size: "large", title: "Занести в журнал" }),
        /* @__PURE__ */ y.jsx("div", { className: "aiwa-log-scroll", children: /* @__PURE__ */ y.jsxs(yt, { className: "aiwa-log-sections", children: [
          r !== "preg" && r !== "meno" ? /* @__PURE__ */ y.jsx(yt.Item, { children: /* @__PURE__ */ y.jsx(Ad, { label: "Месячные", variant: "period", active: v, onChange: b }) }) : null,
          /* @__PURE__ */ y.jsx(yt.Item, { children: /* @__PURE__ */ y.jsx(
            Mr,
            {
              label: "Энергия",
              options: Qb,
              value: h,
              onChange: p
            }
          ) }),
          /* @__PURE__ */ y.jsx(yt.Item, { children: /* @__PURE__ */ y.jsx(
            Mr,
            {
              label: "Настроение",
              options: Fb,
              value: m,
              onChange: g
            }
          ) }),
          D.map(([V, R]) => /* @__PURE__ */ y.jsx(yt.Item, { children: /* @__PURE__ */ y.jsx(e3, { label: V, options: R, symptoms: c, onToggle: M }) }, V)),
          /* @__PURE__ */ y.jsx(yt.Item, { children: /* @__PURE__ */ y.jsx(n3, { value: w, onChange: E }) }),
          /* @__PURE__ */ y.jsx(yt.Item, { children: /* @__PURE__ */ y.jsx(Ad, { label: "Близость", active: T, onChange: S }) })
        ] }) }),
        /* @__PURE__ */ y.jsx("div", { className: "aiwa-log-footer", children: /* @__PURE__ */ y.jsx(
          ce,
          {
            variant: "filled",
            label: _ ? "Сохраняю…" : "Сохранить",
            isFill: !0,
            ...Te("Сохранить", L)
          }
        ) })
      ]
    }
  );
}
function NA({ icon: a, label: e, onClick: l, className: s = "", ...r }) {
  return /* @__PURE__ */ y.jsx(
    we,
    {
      as: "button",
      type: "button",
      mode: "opacity",
      "aria-label": e,
      className: `aiwa-fab${s ? ` ${s}` : ""}`,
      onClick: l,
      ...r,
      children: /* @__PURE__ */ y.jsx(gh, { className: "aiwa-fab-surface", children: /* @__PURE__ */ y.jsx("span", { className: "aiwa-fab-icon", "aria-hidden": "true", children: a }) })
    }
  );
}
const Il = 8, Gg = 6;
function OA(a, e, l) {
  const s = window.innerWidth, r = window.innerHeight;
  let c = l === "end" ? a.right - e.width : a.left;
  c = Math.min(c, s - e.width - Il), c = Math.max(Il, c);
  const f = a.bottom + Gg, h = a.top - Gg - e.height, p = f + e.height <= r - Il, m = p || h < Il ? f : h, g = p || h < Il ? "top" : "bottom";
  return { top: m, left: c, originY: g };
}
function a3({ items: a, trigger: e, align: l = "start", className: s = "" }) {
  const [r, c] = A.useState(!1), [f, h] = A.useState({ top: 0, left: 0, originY: "top" }), p = A.useRef(null), m = A.useRef(null), g = A.useCallback(() => {
    c(!1);
  }, []);
  A.useLayoutEffect(() => {
    if (!r || !m.current || !p.current) return;
    const b = () => {
      const T = p.current.getBoundingClientRect(), S = { width: m.current.offsetWidth, height: m.current.offsetHeight };
      h(OA(T, S, l));
    };
    return b(), window.addEventListener("resize", b), window.addEventListener("scroll", b, !0), () => {
      window.removeEventListener("resize", b), window.removeEventListener("scroll", b, !0);
    };
  }, [r, l]), A.useEffect(() => {
    if (!r) return;
    const b = (S) => {
      m.current?.contains(S.target) || p.current?.contains(S.target) || g();
    }, T = (S) => {
      S.key === "Escape" && g();
    };
    return document.addEventListener("pointerdown", b, !0), document.addEventListener("keydown", T), () => {
      document.removeEventListener("pointerdown", b, !0), document.removeEventListener("keydown", T);
    };
  }, [r, g]);
  const v = (b) => {
    g(), b.onSelect?.();
  };
  return /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
    /* @__PURE__ */ y.jsx(
      "div",
      {
        ref: p,
        className: `aiwa-action-menu-trigger${s ? ` ${s}` : ""}`,
        onClickCapture: (b) => {
          b.preventDefault(), b.stopPropagation(), r ? g() : c(!0);
        },
        role: "button",
        tabIndex: 0,
        "aria-haspopup": "menu",
        "aria-expanded": r,
        onKeyDownCapture: (b) => {
          (b.key === "Enter" || b.key === " ") && (b.preventDefault(), b.stopPropagation(), r ? g() : c(!0));
        },
        children: e
      }
    ),
    r && Or.createPortal(
      /* @__PURE__ */ y.jsx(
        "div",
        {
          ref: m,
          role: "menu",
          className: "aiwa-action-menu",
          "data-align": l,
          style: {
            position: "fixed",
            top: f.top,
            left: f.left,
            transformOrigin: `${l === "end" ? "right" : "left"} ${f.originY}`
          },
          children: a.map((b) => /* @__PURE__ */ y.jsxs(
            "button",
            {
              type: "button",
              role: "menuitem",
              className: "aiwa-action-menu-item",
              onClick: () => v(b),
              children: [
                b.icon ? /* @__PURE__ */ y.jsx("span", { className: "aiwa-action-menu-icon", "aria-hidden": "true", children: b.icon }) : null,
                /* @__PURE__ */ y.jsx(lt, { variant: "body", weight: "regular", children: b.label })
              ]
            },
            b.label
          ))
        }
      ),
      document.body
    )
  ] });
}
function zA({ options: a, value: e, onChange: l, hint: s }) {
  return /* @__PURE__ */ y.jsxs(gh, { className: "aiwa-mark-bar", role: "group", "aria-label": "Что отмечаем", children: [
    /* @__PURE__ */ y.jsx("div", { className: "aiwa-mark-bar-chips", children: a.map((r) => /* @__PURE__ */ y.jsx(
      Hr,
      {
        label: r.label,
        active: e === r.value,
        onClick: () => l(r.value)
      },
      r.value
    )) }),
    s ? /* @__PURE__ */ y.jsx(lt, { className: "aiwa-mark-bar-hint", variant: "footnote", weight: "regular", role: "status", children: s }) : null
  ] });
}
function LA({ iso: a, label: e, open: l, onClose: s, symptomGroups: r, showIntimacy: c = !0 }) {
  const [f, h] = A.useState({}), [p, m] = A.useState([]), [g, v] = A.useState(0), [b, T] = A.useState(0), [S, w] = A.useState(!1), [E, _] = A.useState(""), [j, M] = A.useState(!1);
  A.useEffect(() => {
    if (!a || !l) return;
    const R = te("getAiwaDayCheckin", a) || {};
    h(R), m(R.symptoms || []), v(R.energy || 0), T(R.mood || 0), w(!!R.intimacy), _(""), M(!1);
  }, [a, l]);
  const D = (R) => {
    m((q) => q.includes(R) ? q.filter((X) => X !== R) : [...q, R]);
  }, L = r?.length ? r : Oh, V = async () => {
    if (j) return;
    const R = f.symptoms || [], q = E.trim();
    M(!0);
    try {
      g !== (f.energy || 0) && await te("setDayCheckin", a, "energy", g), b !== (f.mood || 0) && await te("setDayCheckin", a, "mood", b);
      for (const X of p.filter((Z) => !R.includes(Z)))
        await te("toggleDaySym", a, X);
      for (const X of R.filter((Z) => !p.includes(Z)))
        await te("toggleDaySym", a, X);
      S !== !!f.intimacy && await te("markPA", a), q ? await te("addDayCustomSym", a, q) : Rt("Сохранено", { type: "success" }), s();
    } catch (X) {
      Rt(X?.message || "Не удалось сохранить", { type: "error" });
    } finally {
      M(!1);
    }
  };
  return /* @__PURE__ */ y.jsxs(
    Xn,
    {
      isOpen: l,
      onClose: s,
      "data-aiwa-day-log-modal": "true",
      children: [
        /* @__PURE__ */ y.jsx(Nh, { size: "large", title: e || "Занести в журнал" }),
        /* @__PURE__ */ y.jsx("div", { className: "aiwa-log-scroll", children: /* @__PURE__ */ y.jsxs(yt, { className: "aiwa-log-sections", children: [
          /* @__PURE__ */ y.jsx(yt.Item, { children: /* @__PURE__ */ y.jsx(
            Mr,
            {
              label: "Энергия",
              options: Qb,
              value: g,
              onChange: v
            }
          ) }),
          /* @__PURE__ */ y.jsx(yt.Item, { children: /* @__PURE__ */ y.jsx(
            Mr,
            {
              label: "Настроение",
              options: Fb,
              value: b,
              onChange: T
            }
          ) }),
          L.map(([R, q]) => /* @__PURE__ */ y.jsx(yt.Item, { children: /* @__PURE__ */ y.jsx(e3, { label: R, options: q, symptoms: p, onToggle: D }) }, R)),
          /* @__PURE__ */ y.jsx(yt.Item, { children: /* @__PURE__ */ y.jsx(n3, { value: E, onChange: _ }) }),
          c ? /* @__PURE__ */ y.jsx(yt.Item, { children: /* @__PURE__ */ y.jsx(Ad, { label: "Близость", active: S, onChange: w }) }) : null
        ] }) }),
        /* @__PURE__ */ y.jsx("div", { className: "aiwa-log-footer", children: /* @__PURE__ */ y.jsx(
          ce,
          {
            variant: "filled",
            label: j ? "Сохраняю…" : "Сохранить",
            isFill: !0,
            ...Te("Сохранить", V)
          }
        ) })
      ]
    }
  );
}
function BA({ isOpen: a, onClose: e, mode: l, revision: s, symptomGroups: r }) {
  const [c, f] = A.useState(!1), [h, p] = A.useState(null), [m, g] = A.useState(!1), [v, b] = A.useState("period"), [T, S] = A.useState({}), w = A.useRef(Promise.resolve()), E = A.useRef(0), _ = Array.from({ length: 8 }, (F, W) => te("getAiwaCalendarMonth", W)).filter(Boolean), j = l !== "preg" && l !== "meno", M = sA(j ? ["period", "symptoms", "intimacy"] : ["symptoms", "intimacy"]), D = Ed[v] || Ed.symptoms, L = aA(), V = () => {
    g(!1), S({});
  }, R = (F) => {
    b(F), f(!1), g(!0);
  }, q = M.map((F) => ({
    label: F.label,
    onSelect: () => R(F.value)
  }));
  Ib(a, m ? V : e), A.useEffect(() => {
    a || (f(!1), p(null), g(!1), S({})), b(j ? "period" : "symptoms");
  }, [a, j]);
  const X = (F) => {
    const W = T[`${v}:${F.iso}`];
    return typeof W == "boolean" ? W : !!D.checked(F);
  }, Z = (F, W) => {
    const nt = () => te(F, W);
    E.current += 1, w.current = w.current.then(nt, nt).then(() => {
      E.current -= 1, E.current === 0 && S({});
    });
  }, et = (F, W) => {
    if (m) {
      if (v === "symptoms") {
        p({ iso: F.iso, label: `${F.date} ${W}` });
        return;
      }
      S((nt) => ({ ...nt, [`${v}:${F.iso}`]: !X(F) })), Z(v === "period" ? "toggleCalendarPeriodDay" : "markPA", F.iso);
    }
  };
  return a ? Or.createPortal(
    /* @__PURE__ */ y.jsxs(
      "div",
      {
        className: "aiwa-calendar-page",
        "data-aiwa-calendar-modal": "true",
        "data-marking": m ? "true" : void 0,
        "data-markbar": m && !L ? "true" : void 0,
        role: "region",
        "aria-label": "Календарь",
        children: [
          /* @__PURE__ */ y.jsxs("div", { className: "aiwa-calendar-screen", "data-revision": s, role: "document", "aria-label": "Календарь", children: [
            /* @__PURE__ */ y.jsxs("div", { className: "aiwa-calendar-modeswitch", children: [
              m && L ? null : /* @__PURE__ */ y.jsxs(
                we,
                {
                  as: "button",
                  type: "button",
                  mode: "opacity",
                  className: "aiwa-calendar-legend-toggle",
                  "aria-pressed": c,
                  "aria-label": c ? "Скрыть обозначения" : "Показать обозначения календаря",
                  onClick: () => f((F) => !F),
                  children: [
                    /* @__PURE__ */ y.jsx($b, {}),
                    /* @__PURE__ */ y.jsx(lt, { variant: "body", weight: "semibold", children: "Обозначения" })
                  ]
                }
              ),
              m ? /* @__PURE__ */ y.jsx(
                we,
                {
                  as: "button",
                  type: "button",
                  mode: "opacity",
                  className: "aiwa-calendar-done",
                  "aria-label": "Закончить отметки",
                  onClick: V,
                  children: /* @__PURE__ */ y.jsx(lt, { variant: "body", weight: "semibold", children: "Готово" })
                }
              ) : null
            ] }),
            c ? /* @__PURE__ */ y.jsxs("div", { className: "aiwa-calendar-help", role: "status", children: [
              /* @__PURE__ */ y.jsx(lt, { variant: "body", weight: "semibold", children: "Обозначения" }),
              /* @__PURE__ */ y.jsx("div", { className: "aiwa-calendar-legend", children: oA.map(({ label: F, variant: W, token: nt }) => /* @__PURE__ */ y.jsx(
                YE,
                {
                  variant: W,
                  textVariant: "caption1",
                  weight: "semibold",
                  style: { color: `var(${nt})` },
                  children: F
                },
                F
              )) })
            ] }) : null,
            /* @__PURE__ */ y.jsx("div", { className: "aiwa-calendar-scroll", children: /* @__PURE__ */ y.jsx("div", { className: "aiwa-calendar-months", children: _.map((F) => /* @__PURE__ */ y.jsxs("section", { className: "aiwa-calendar-month", "aria-label": F.label, children: [
              /* @__PURE__ */ y.jsx(lt, { className: "aiwa-calendar-month-title", variant: "body", weight: "semibold", children: F.name || F.label }),
              /* @__PURE__ */ y.jsx("div", { className: "aiwa-calendar-grid", children: F.days.map((W) => W.empty ? /* @__PURE__ */ y.jsx("span", { className: "aiwa-calendar-empty", "aria-hidden": "true" }, W.key) : /* @__PURE__ */ y.jsx(
                Pb,
                {
                  day: W,
                  interactive: m,
                  marking: m,
                  checked: m && X(W),
                  markVariant: v === "intimacy" ? "heart" : "radio",
                  monthLabel: F.label,
                  showTodayLabel: !0,
                  onSelect: (nt) => et(nt, F.name || F.label)
                },
                W.key
              )) })
            ] }, F.key || F.label)) }) })
          ] }),
          m && !L ? /* @__PURE__ */ y.jsx(
            zA,
            {
              options: M,
              value: v,
              onChange: b,
              hint: D.hint
            }
          ) : null,
          m ? null : /* @__PURE__ */ y.jsx(
            a3,
            {
              className: "aiwa-calendar-fab",
              align: "end",
              items: q,
              trigger: /* @__PURE__ */ y.jsx(NA, { icon: /* @__PURE__ */ y.jsx(Ur, {}), label: "Отметить день" })
            }
          ),
          /* @__PURE__ */ y.jsx(
            LA,
            {
              iso: h?.iso,
              label: h?.label,
              open: !!h,
              onClose: () => p(null),
              symptomGroups: r,
              showIntimacy: !1
            }
          )
        ]
      }
    ),
    document.body
  ) : null;
}
function VA({ panel: a, onClose: e, checkin: l, symptomGroups: s, mode: r, revision: c }) {
  return /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
    /* @__PURE__ */ y.jsx(DA, { isOpen: a === "journal", onClose: e, checkin: l, symptomGroups: s, mode: r }),
    /* @__PURE__ */ y.jsx(BA, { isOpen: a === "calendar", onClose: e, mode: r, revision: c, symptomGroups: s })
  ] });
}
function he({
  title: a,
  description: e,
  onClick: l,
  trailing: s,
  muted: r = !1,
  start: c,
  image: f,
  loading: h = !1
}) {
  const p = s !== void 0 ? s : l ? /* @__PURE__ */ y.jsx(Dt.Part, { type: "Chevron" }) : null, m = h ? /* @__PURE__ */ y.jsx("span", { className: "aiwa-cell-thumb aiwa-cell-thumb-loading", children: /* @__PURE__ */ y.jsx(zb, { size: 22 }) }) : f ? /* @__PURE__ */ y.jsx("span", { className: "aiwa-cell-thumb", children: /* @__PURE__ */ y.jsx("img", { src: f, alt: "", loading: "lazy" }) }) : c;
  return /* @__PURE__ */ y.jsx(
    Dt,
    {
      start: m,
      end: p,
      onClick: l,
      tappable: !!l,
      as: l ? "button" : "div",
      type: l ? "button" : void 0,
      "aria-label": a,
      style: r ? { opacity: 0.65 } : void 0,
      children: /* @__PURE__ */ y.jsx(Dt.Text, { title: a, description: e || void 0 })
    }
  );
}
function Xi({ label: a, options: e, value: l, onChange: s }) {
  return /* @__PURE__ */ y.jsxs("div", { className: "aiwa-form-group", children: [
    a ? /* @__PURE__ */ y.jsx(lt, { className: "aiwa-form-label", variant: "body", weight: "semibold", children: a }) : null,
    /* @__PURE__ */ y.jsx("div", { className: "aiwa-choice-pills", role: "group", "aria-label": a, children: e.map((r) => {
      const c = typeof r == "string" ? { value: r, label: r } : r;
      return /* @__PURE__ */ y.jsx(
        we,
        {
          as: "button",
          type: "button",
          mode: "opacity",
          className: l === c.value ? "aiwa-choice-pill is-active" : "aiwa-choice-pill",
          "aria-pressed": l === c.value,
          onClick: () => s(c.value),
          children: /* @__PURE__ */ y.jsx(lt, { variant: "body", weight: "regular", children: c.label })
        },
        c.value
      );
    }) })
  ] });
}
function UA({ isOpen: a, onClose: e }) {
  const [l, s] = A.useState("main"), [r, c] = A.useState(() => te("aiwaData") || {}), [f, h] = A.useState(null), [p, m] = A.useState("3"), [g, v] = A.useState({});
  A.useEffect(() => {
    if (!a) return;
    const M = te("aiwaData") || {};
    c(M), s("main"), h(null), v({
      height: String(M.profile?.height || ""),
      weight: String(M.profile?.weight || ""),
      age: String(M.profile?.age || ""),
      cycle_len: String(M.cycle_len || ""),
      diet_note: M.profile?.diet_note || M.diet_note || "",
      kcal_goal: String(M.profile?.kcal_goal || M.kcal_goal || ""),
      send_time: M.send_time || "08:00",
      proactive_enabled: M.proactive_enabled !== !1
    });
  }, [a]);
  const b = async () => {
    s("partner");
    const M = await ee("/api/partner", {}).catch(() => null);
    h(M || {});
  }, T = async () => {
    const M = await ee("/api/profile", {
      height: g.height,
      weight: g.weight,
      age: g.age,
      cycle_len: g.cycle_len
    }).catch(() => null), D = await ee("/api/prefs", {
      diet_note: g.diet_note,
      kcal_goal: g.kcal_goal
    }).catch(() => null), L = await ee("/api/settime", { time: g.send_time }).catch(() => null);
    M?.ok && D?.ok && L?.ok ? (Rt("Данные сохранены", { type: "success" }), Me("reloadAfterEdit"), s("main")) : Rt(M?.text || "Проверь рост, вес, возраст и время", { type: "error" });
  }, S = async () => {
    const M = await ee("/api/report", { period: p }).catch(() => null);
    M?.ok ? (Rt("Выписка отправлена в чат бота", { type: "success" }), s("main")) : Rt(M?.text || "Выписка временно недоступна", { type: "error" });
  }, w = async (M) => {
    const D = g.proactive_enabled !== !1;
    v((V) => ({ ...V, proactive_enabled: M })), (await ee("/api/proactive", { enabled: M }).catch(() => null))?.ok || (v((V) => ({ ...V, proactive_enabled: D })), Rt("Не получилось изменить настройку", { type: "error" }));
  }, E = (M) => {
    e(), Me("chooseMode", M);
  }, _ = async () => {
    if (f?.link)
      try {
        await navigator.clipboard.writeText(f.link), Rt("Ссылка скопирована", { type: "success" });
      } catch {
        Rt("Ссылка готова — выдели и скопируй");
      }
  }, j = async () => {
    (await ee("/api/partner", { action: "unlink" }).catch(() => null))?.ok && (h({ linked: !1 }), Rt("Партнёр отключён", { type: "success" }));
  };
  return /* @__PURE__ */ y.jsx(
    Xn,
    {
      isOpen: a,
      onClose: e,
      onBack: l === "main" ? e : () => s("main"),
      children: /* @__PURE__ */ y.jsx(y.Fragment, { children: /* @__PURE__ */ y.jsxs("div", { className: "aiwa-sheet-scroll", children: [
        l === "main" ? /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
          /* @__PURE__ */ y.jsxs("div", { className: "aiwa-profile-modes", children: [
            /* @__PURE__ */ y.jsx(lt, { variant: "body", weight: "semibold", children: "Режим" }),
            /* @__PURE__ */ y.jsx("div", { className: "aiwa-choice-pills", children: dA.map((M) => /* @__PURE__ */ y.jsx(
              we,
              {
                as: "button",
                type: "button",
                mode: "opacity",
                className: r.mode === M.value ? "aiwa-choice-pill is-active" : "aiwa-choice-pill",
                "aria-pressed": r.mode === M.value,
                onClick: () => E(M.value),
                children: /* @__PURE__ */ y.jsx(lt, { variant: "body", weight: "regular", children: M.label })
              },
              M.value
            )) }),
            /* @__PURE__ */ y.jsx(lt, { className: "aiwa-profile-note", variant: "caption1", weight: "regular", children: "Для цикла и беременности нужна дата последних месячных." })
          ] }),
          /* @__PURE__ */ y.jsx(yt, { className: "aiwa-tma-blocks", children: /* @__PURE__ */ y.jsxs(yt.Item, { children: [
            /* @__PURE__ */ y.jsx(he, { title: "Выписка для врача", description: "PDF в чат бота", onClick: () => s("report") }),
            /* @__PURE__ */ y.jsx(he, { title: "Предпочтения по питанию", description: "ограничения и цель калорий", onClick: () => s("data") }),
            /* @__PURE__ */ y.jsx(he, { title: "Мои данные", description: "рост · вес · возраст · цикл", onClick: () => s("data") }),
            /* @__PURE__ */ y.jsx(he, { title: "Утренняя сводка", description: `${g.send_time || "08:00"} · МСК`, onClick: () => s("data") }),
            /* @__PURE__ */ y.jsx(
              Dt.Switch,
              {
                value: g.proactive_enabled !== !1,
                onChange: w,
                children: /* @__PURE__ */ y.jsx(
                  Dt.Text,
                  {
                    title: "Проактивные сообщения",
                    description: g.proactive_enabled === !1 ? "выключены" : "не больше одного в день"
                  }
                )
              }
            ),
            /* @__PURE__ */ y.jsx(he, { title: "Партнёр и близкие", description: "короткая бережная сводка", onClick: b })
          ] }) })
        ] }) : null,
        l === "data" ? /* @__PURE__ */ y.jsxs("div", { className: "aiwa-form-stack", children: [
          /* @__PURE__ */ y.jsx(lt, { variant: "title3", weight: "semibold", children: "Параметры тела" }),
          /* @__PURE__ */ y.jsxs("div", { className: "aiwa-form-grid", children: [
            /* @__PURE__ */ y.jsx(It, { label: "Рост, см", value: g.height || "", onChange: (M) => v((D) => ({ ...D, height: M })), inputMode: "decimal" }),
            /* @__PURE__ */ y.jsx(It, { label: "Вес, кг", value: g.weight || "", onChange: (M) => v((D) => ({ ...D, weight: M })), inputMode: "decimal" }),
            /* @__PURE__ */ y.jsx(It, { label: "Возраст", value: g.age || "", onChange: (M) => v((D) => ({ ...D, age: M })), inputMode: "numeric" }),
            /* @__PURE__ */ y.jsx(It, { label: "Длина цикла", value: g.cycle_len || "", onChange: (M) => v((D) => ({ ...D, cycle_len: M })), inputMode: "numeric" })
          ] }),
          /* @__PURE__ */ y.jsx(lt, { variant: "title3", weight: "semibold", children: "Питание" }),
          /* @__PURE__ */ y.jsx(
            It,
            {
              label: "Предпочтения и ограничения",
              value: g.diet_note || "",
              onChange: (M) => v((D) => ({ ...D, diet_note: M })),
              placeholder: "Например: без свинины, аллергия на орехи",
              multiline: !0
            }
          ),
          /* @__PURE__ */ y.jsx(It, { label: "Желаемые калории", value: g.kcal_goal || "", onChange: (M) => v((D) => ({ ...D, kcal_goal: M })), inputMode: "numeric" }),
          /* @__PURE__ */ y.jsx(It, { label: "Время утренней сводки", type: "time", value: g.send_time || "08:00", onChange: (M) => v((D) => ({ ...D, send_time: M })) }),
          /* @__PURE__ */ y.jsx(ce, { variant: "filled", label: "Сохранить", isFill: !0, ...Te("Сохранить данные", T) })
        ] }) : null,
        l === "report" ? /* @__PURE__ */ y.jsxs("div", { className: "aiwa-form-stack", children: [
          /* @__PURE__ */ y.jsx(lt, { variant: "body", weight: "regular", children: "Циклы, динамика и дневник симптомов придут PDF-файлом в чат бота." }),
          /* @__PURE__ */ y.jsx(
            Xi,
            {
              options: [
                { value: "3", label: "3 месяца" },
                { value: "6", label: "6 месяцев" },
                { value: "all", label: "Весь период" }
              ],
              value: p,
              onChange: m
            }
          ),
          /* @__PURE__ */ y.jsx(ce, { variant: "filled", label: "Собрать выписку", isFill: !0, ...Te("Собрать выписку", S) })
        ] }) : null,
        l === "partner" ? /* @__PURE__ */ y.jsxs("div", { className: "aiwa-form-stack", children: [
          /* @__PURE__ */ y.jsxs("div", { className: "aiwa-paper-card", children: [
            /* @__PURE__ */ y.jsx(lt, { variant: "title3", weight: "semibold", children: "Бережная сводка для близкого" }),
            /* @__PURE__ */ y.jsx(lt, { variant: "body", weight: "regular", children: "Айва расскажет, когда особенно нужны поддержка и отдых — без интимных и медицинских деталей." })
          ] }),
          f === null ? /* @__PURE__ */ y.jsx(lt, { variant: "body", weight: "regular", children: "Готовлю ссылку…" }) : null,
          f?.linked ? /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
            /* @__PURE__ */ y.jsx("div", { className: "aiwa-sheet-card", children: /* @__PURE__ */ y.jsx(he, { title: "Партнёр подключён", description: "Получает только бережную сводку без календаря и приватных заметок." }) }),
            /* @__PURE__ */ y.jsx(ce, { variant: "filled", label: "Отключить партнёра", isFill: !0, ...Te("Отключить партнёра", j) })
          ] }) : null,
          f?.link ? /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
            /* @__PURE__ */ y.jsx(It, { label: "Ссылка-приглашение", value: f.link, readOnly: !0, multiline: !0 }),
            /* @__PURE__ */ y.jsx(ce, { variant: "filled", label: "Скопировать ссылку", isFill: !0, ...Te("Скопировать ссылку", _) })
          ] }) : null,
          f && !f.linked && !f.link ? /* @__PURE__ */ y.jsx(lt, { variant: "body", weight: "regular", children: "Ссылка доступна после запуска из Telegram. В боте можно использовать команду /partner." }) : null
        ] }) : null
      ] }) })
    }
  );
}
function kA(a) {
  return /* @__PURE__ */ y.jsx(tl, { children: /* @__PURE__ */ y.jsx(Ii, { mode: "secondary", children: /* @__PURE__ */ y.jsxs("div", { className: "aiwa-deslop-home", children: [
    /* @__PURE__ */ y.jsx(
      Nh,
      {
        title: a.dateText,
        left: /* @__PURE__ */ y.jsx(J8, { src: "/assets/paper-profile.jpg", size: 36 }),
        onLeft: () => window.AiwaDeslop?.openProfile?.(),
        leftAriaLabel: "Открыть профиль",
        right: /* @__PURE__ */ y.jsx(PE, {}),
        onRight: () => Me("openHomePanel", "calendar"),
        rightAriaLabel: "Открыть календарь"
      }
    ),
    /* @__PURE__ */ y.jsxs("div", { className: "aiwa-overview", children: [
      /* @__PURE__ */ y.jsx(
        Zb,
        {
          days: a.week,
          selectedIso: a.selectedIso,
          onSelect: a.onSelectDay ?? ((e) => Me("aiwaSelectDay", e.iso))
        }
      ),
      /* @__PURE__ */ y.jsxs("div", { className: "aiwa-countdown", children: [
        /* @__PURE__ */ y.jsx(lt, { variant: "title1", weight: "semibold", children: a.heroValue || `${a.countdown} дней` }),
        /* @__PURE__ */ y.jsx(lt, { variant: "body", weight: "regular", children: a.countdownLabel })
      ] }),
      /* @__PURE__ */ y.jsx(
        ce,
        {
          variant: "filled",
          label: /* @__PURE__ */ y.jsxs("span", { className: "aiwa-btn-icon-label", children: [
            /* @__PURE__ */ y.jsx(Ur, {}),
            " Занести в журнал"
          ] }),
          ...Te("Занести в журнал", () => Me("openHomePanel", "journal"))
        }
      )
    ] }),
    /* @__PURE__ */ y.jsxs(yt, { className: "aiwa-tma-blocks", children: [
      /* @__PURE__ */ y.jsx(mA, { title: a.dayTitle, checkin: a.dayCheckin ?? a.checkin, symptomGroups: a.symptomGroups }),
      /* @__PURE__ */ y.jsx(xA, { aiText: a.aiText }),
      /* @__PURE__ */ y.jsx(SA, { delay: a.delay }),
      /* @__PURE__ */ y.jsx(CA, { metrics: a.metrics, title: a.statsTitle }),
      /* @__PURE__ */ y.jsx(
        MA,
        {
          data: a.chartData,
          series: a.chartSeries,
          title: a.chartTitle,
          emptyText: a.chartEmptyText
        }
      ),
      /* @__PURE__ */ y.jsx(
        jA,
        {
          history: a.history,
          title: a.historyTitle,
          emptyTitle: a.historyEmptyTitle,
          emptyDescription: a.historyEmptyDescription
        }
      )
    ] }),
    /* @__PURE__ */ y.jsx(
      VA,
      {
        panel: a.panel,
        onClose: a.onPanelClose,
        checkin: a.checkin,
        symptomGroups: a.symptomGroups,
        mode: a.mode,
        revision: a.panelRevision
      }
    ),
    /* @__PURE__ */ y.jsx(UA, { isOpen: a.profileOpen, onClose: a.onProfileClose })
  ] }) }) });
}
const Yg = {
  food: {
    hero: "gauge",
    sections: [
      { header: "Рекомендации", rows: 2, media: !0 },
      { header: "Прошедшие приёмы", rows: 3, media: !0 }
    ]
  },
  activity: {
    hero: "week",
    sections: [
      { header: "Варианты", rows: 3 },
      { header: "Прошедшие тренировки", rows: 2 }
    ]
  }
}, Md = (a) => Array.from({ length: a }, (e, l) => l);
function HA({ kind: a }) {
  return a === "week" ? /* @__PURE__ */ y.jsxs("div", { className: "aiwa-overview", children: [
    /* @__PURE__ */ y.jsx("div", { className: "aiwa-week", children: Md(7).map((e) => /* @__PURE__ */ y.jsx(Gi, { className: "aiwa-skeleton-day" }, e)) }),
    /* @__PURE__ */ y.jsxs("div", { className: "aiwa-countdown", children: [
      /* @__PURE__ */ y.jsx(Qa, { active: !0, width: 2 }),
      /* @__PURE__ */ y.jsx(Qa, { active: !0, width: 18 })
    ] })
  ] }) : /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
    /* @__PURE__ */ y.jsx(Gi, { className: "aiwa-skeleton-gauge" }),
    /* @__PURE__ */ y.jsx("div", { className: "aiwa-macro-grid", children: Md(3).map((e) => /* @__PURE__ */ y.jsx(Gi, { className: "aiwa-skeleton-macro" }, e)) })
  ] });
}
function i3({ title: a, variant: e = "food" }) {
  const { hero: l, sections: s } = Yg[e] || Yg.food;
  return /* @__PURE__ */ y.jsx(tl, { children: /* @__PURE__ */ y.jsx(Ii, { mode: "secondary", children: /* @__PURE__ */ y.jsxs("div", { className: `aiwa-paper-screen aiwa-screen-skeleton aiwa-${e}-screen`, children: [
    /* @__PURE__ */ y.jsx(lt, { className: "aiwa-screen-title", variant: "title1", weight: "semibold", children: a }),
    /* @__PURE__ */ y.jsxs(ib, { active: !0, children: [
      /* @__PURE__ */ y.jsx(HA, { kind: l }),
      /* @__PURE__ */ y.jsx("div", { className: "aiwa-screen-cta", children: /* @__PURE__ */ y.jsx(Gi, { className: "aiwa-skeleton-cta" }) }),
      /* @__PURE__ */ y.jsxs(yt, { className: "aiwa-tma-blocks", children: [
        /* @__PURE__ */ y.jsx(yt.Item, { className: "aiwa-insight-section", children: /* @__PURE__ */ y.jsx(Dt, { tappable: !1, children: /* @__PURE__ */ y.jsxs("div", { className: "aiwa-insight-content", children: [
          /* @__PURE__ */ y.jsx(Qa, { active: !0, width: 30 }),
          /* @__PURE__ */ y.jsx(Qa, { active: !0, width: 26 }),
          /* @__PURE__ */ y.jsx(Gi, { className: "aiwa-skeleton-insight-cta" })
        ] }) }) }),
        s.map((r) => /* @__PURE__ */ y.jsx(yt.Item, { header: r.header, children: Md(r.rows).map((c) => /* @__PURE__ */ y.jsx(
          Dt,
          {
            tappable: !1,
            start: r.media ? /* @__PURE__ */ y.jsx(Gi, { className: "aiwa-skeleton-thumb" }) : void 0,
            children: /* @__PURE__ */ y.jsx(
              Dt.Text,
              {
                title: /* @__PURE__ */ y.jsx(Qa, { active: !0, width: 13 }),
                description: /* @__PURE__ */ y.jsx(Qa, { active: !0, width: 22 })
              }
            )
          },
          c
        )) }, r.header))
      ] })
    ] })
  ] }) }) });
}
function Hf({ label: a, value: e, target: l, macro: s, color: r }) {
  const c = l ? Math.min(100, Math.round(Number(e || 0) / Number(l) * 100)) : 0, f = r || (s ? `var(--aiwa-macro-${s})` : "var(--aiwa-accent)");
  return /* @__PURE__ */ y.jsxs("div", { className: "aiwa-macro-card", children: [
    /* @__PURE__ */ y.jsxs(lt, { variant: "body", weight: "semibold", children: [
      Math.round(e || 0),
      l ? null : " г",
      l ? /* @__PURE__ */ y.jsxs("span", { children: [
        " / ",
        Math.round(l),
        " г"
      ] }) : null
    ] }),
    /* @__PURE__ */ y.jsx(lt, { variant: "caption1", weight: "regular", children: a }),
    /* @__PURE__ */ y.jsx("span", { className: "aiwa-macro-track", style: { "--macro-color": f }, children: /* @__PURE__ */ y.jsx("span", { style: { width: `${c}%` } }) })
  ] });
}
const Xg = "M 11 169 A 158 158 0 0 1 327 169", Pg = Math.PI * 158, qA = 500, $A = (a) => 1 - (1 - a) ** 3;
function GA(a) {
  const [e, l] = A.useState(0), s = A.useRef(0), r = A.useRef(0);
  return A.useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      s.current = a, l(a);
      return;
    }
    const f = s.current, h = performance.now(), p = (m) => {
      const g = Math.min(1, (m - h) / qA), v = f + (a - f) * $A(g);
      s.current = v, l(v), g < 1 && (r.current = requestAnimationFrame(p));
    };
    return r.current = requestAnimationFrame(p), () => cancelAnimationFrame(r.current);
  }, [a]), e;
}
function YA({ kcal: a, kcalTarget: e }) {
  const l = Number(a || 0), s = Number(e || 0), r = GA(Math.min(1, l / Math.max(1, s))), c = r * Math.PI, f = 169 - 158 * Math.cos(c), h = 169 - 158 * Math.sin(c);
  return /* @__PURE__ */ y.jsxs("div", { className: "aiwa-food-gauge", children: [
    /* @__PURE__ */ y.jsxs("svg", { className: "aiwa-food-gauge-arc", viewBox: "0 0 338 180", width: "338", height: "180", fill: "none", children: [
      /* @__PURE__ */ y.jsx("path", { className: "aiwa-food-gauge-track", d: Xg }),
      /* @__PURE__ */ y.jsx(
        "path",
        {
          className: "aiwa-food-gauge-progress",
          d: Xg,
          strokeDasharray: Pg,
          strokeDashoffset: Pg * (1 - r)
        }
      ),
      /* @__PURE__ */ y.jsx("circle", { className: "aiwa-food-gauge-knob", cx: f, cy: h, r: "11" })
    ] }),
    /* @__PURE__ */ y.jsxs("div", { className: "aiwa-food-gauge-center", children: [
      /* @__PURE__ */ y.jsxs(lt, { variant: "title1", weight: "semibold", children: [
        Math.round(l),
        " ккал"
      ] }),
      /* @__PURE__ */ y.jsxs(lt, { variant: "body", weight: "regular", children: [
        "из ",
        Math.round(s),
        " ккал"
      ] })
    ] })
  ] });
}
function Kg({ meal: a, onSaved: e, onClose: l }) {
  const [s, r] = A.useState(() => uA(a)), [c, f] = A.useState(!1), h = (m, g) => r((v) => ({ ...v, [m]: g })), p = async () => {
    if (!s.title.trim() && !String(s.kcal).trim()) {
      Rt("Укажи название или калории", { type: "error" });
      return;
    }
    f(!0);
    try {
      const m = await ee(a ? "/api/diary_edit" : "/api/food_manual", {
        ...a ? { id: a.id } : {},
        ...s
      });
      if (m?.ok === !1 || m?.error) throw new Error(m.message || "Не получилось сохранить");
      Rt(a ? "Приём обновлён" : "Приём добавлен", { type: "success" }), await e(), l();
    } catch (m) {
      Rt(m.message || "Не получилось сохранить", { type: "error" });
    } finally {
      f(!1);
    }
  };
  return /* @__PURE__ */ y.jsxs("div", { className: "aiwa-form-stack", children: [
    /* @__PURE__ */ y.jsx(It, { label: "Название", value: s.title, onChange: (m) => h("title", m), placeholder: "Например, творог и банан" }),
    /* @__PURE__ */ y.jsxs("div", { className: "aiwa-form-grid", children: [
      /* @__PURE__ */ y.jsx(It, { label: "Ккал", value: s.kcal, onChange: (m) => h("kcal", m), inputMode: "decimal" }),
      /* @__PURE__ */ y.jsx(It, { label: "Граммы", value: s.grams, onChange: (m) => h("grams", m), inputMode: "decimal" }),
      /* @__PURE__ */ y.jsx(It, { label: "Белки", value: s.protein, onChange: (m) => h("protein", m), inputMode: "decimal" }),
      /* @__PURE__ */ y.jsx(It, { label: "Жиры", value: s.fat, onChange: (m) => h("fat", m), inputMode: "decimal" }),
      /* @__PURE__ */ y.jsx(It, { label: "Углеводы", value: s.carbs, onChange: (m) => h("carbs", m), inputMode: "decimal" })
    ] }),
    /* @__PURE__ */ y.jsx(Xi, { label: "Приём пищи", options: Ar, value: s.slot, onChange: (m) => h("slot", m) }),
    /* @__PURE__ */ y.jsx(
      ce,
      {
        variant: "filled",
        label: c ? "Сохраняю…" : a ? "Сохранить изменения" : "Сохранить приём",
        isFill: !0,
        disabled: c,
        ...Te("Сохранить приём", p)
      }
    )
  ] });
}
function XA({ isOpen: a, onClose: e, onSaved: l, editingMeal: s = null }) {
  const [r, c] = A.useState("text"), [f, h] = A.useState(""), [p, m] = A.useState(!1);
  A.useEffect(() => {
    a && (Yb("food"), c(s ? "manual" : "text"), h(""));
  }, [s, a]);
  const g = async () => {
    if (f.trim()) {
      m(!0);
      try {
        const b = await ee("/api/food_text", { text: f.trim() });
        if (!b?.ok) throw new Error(b?.message || "Не получилось разобрать приём");
        Rt(`Добавлено · ${b.rec?.kcal || 0} ккал`, { type: "success" }), await l(), e();
      } catch (b) {
        Rt(b.message || "Не получилось добавить", { type: "error" });
      } finally {
        m(!1);
      }
    }
  }, v = async (b) => {
    if (b) {
      m(!0);
      try {
        const T = window.aiwaUploadFoodPhoto;
        if (typeof T != "function") throw new Error("Загрузка фото недоступна");
        await T(b), await l(), e();
      } catch (T) {
        Rt(T.message || "Не получилось разобрать фото", { type: "error" });
      } finally {
        m(!1);
      }
    }
  };
  return /* @__PURE__ */ y.jsx(Xn, { isOpen: a, onClose: e, children: /* @__PURE__ */ y.jsx("div", { children: /* @__PURE__ */ y.jsx("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: s ? /* @__PURE__ */ y.jsx(Kg, { meal: s, onSaved: l, onClose: e }) : /* @__PURE__ */ y.jsxs(y.Fragment, { children: [
    /* @__PURE__ */ y.jsx(
      Xi,
      {
        options: [
          { value: "photo", label: "Фото" },
          { value: "text", label: "Текст" },
          { value: "manual", label: "Вручную" }
        ],
        value: r,
        onChange: c
      }
    ),
    r === "photo" ? /* @__PURE__ */ y.jsxs("label", { className: `aiwa-upload-zone${p ? " is-busy" : ""}`, children: [
      p ? /* @__PURE__ */ y.jsx(zb, { size: 28 }) : null,
      /* @__PURE__ */ y.jsx(lt, { variant: "title3", weight: "semibold", children: p ? "Разбираю фото…" : "Сфотографировать еду" }),
      /* @__PURE__ */ y.jsx(lt, { variant: "body", weight: "regular", children: p ? "Айва считает КБЖУ, это займёт несколько секунд." : "Айва распознает блюдо и посчитает КБЖУ." }),
      /* @__PURE__ */ y.jsx("input", { type: "file", accept: "image/*", capture: "environment", disabled: p, onChange: (b) => v(b.target.files?.[0]) })
    ] }) : null,
    r === "text" ? /* @__PURE__ */ y.jsxs("div", { className: "aiwa-form-stack", children: [
      /* @__PURE__ */ y.jsx(
        It,
        {
          label: "Что съела?",
          value: f,
          onChange: h,
          placeholder: "Например: 200 г творога и банан",
          multiline: !0
        }
      ),
      /* @__PURE__ */ y.jsx(
        ce,
        {
          variant: "filled",
          label: p ? "Считаю…" : "Добавить приём",
          isFill: !0,
          disabled: p || !f.trim(),
          ...Te("Добавить приём", g)
        }
      )
    ] }) : null,
    r === "manual" ? /* @__PURE__ */ y.jsx(Kg, { meal: null, onSaved: l, onClose: e }) : null
  ] }) }) }) });
}
function PA({ isOpen: a, onClose: e, diary: l, onAdd: s, onEdit: r, onDelete: c, onReco: f }) {
  const h = l?.meals || [], p = l?.totals || {}, m = l?.target || {};
  return /* @__PURE__ */ y.jsx(Xn, { isOpen: a, onClose: e, children: /* @__PURE__ */ y.jsxs(yt, { className: "aiwa-tma-blocks", children: [
    /* @__PURE__ */ y.jsx(yt.Item, { children: /* @__PURE__ */ y.jsx(Dt, { tappable: !1, children: /* @__PURE__ */ y.jsx(
      Dt.Text,
      {
        title: `${Math.round(p.kcal || 0)} ккал`,
        description: `из ${Math.round(m.kcal || 0) || "—"} ккал`,
        bold: !0
      }
    ) }) }),
    Ar.map((g) => {
      const v = h.filter((b) => (b.slot || "snack") === g.value);
      return /* @__PURE__ */ y.jsx(yt.Item, { header: g.label, children: v.length ? v.map((b) => /* @__PURE__ */ y.jsx(
        he,
        {
          title: b.title,
          description: `${Math.round(b.kcal || 0)} ккал`,
          onClick: () => r(b),
          trailing: /* @__PURE__ */ y.jsx(
            we,
            {
              as: "button",
              type: "button",
              mode: "opacity",
              "aria-label": `Удалить ${b.title}`,
              onClick: (T) => {
                T.stopPropagation(), c(b.id);
              },
              children: /* @__PURE__ */ y.jsx(qb, {})
            }
          )
        },
        b.id
      )) : /* @__PURE__ */ y.jsx(Dt, { as: "button", type: "button", onClick: s, end: /* @__PURE__ */ y.jsx(Dt.Part, { type: "Chevron" }), children: /* @__PURE__ */ y.jsx(Dt.Text, { type: "Accent", title: "Добавить" }) }) }, g.value);
    }),
    /* @__PURE__ */ y.jsx(yt.Item, { children: /* @__PURE__ */ y.jsx(Dt, { tappable: !1, children: /* @__PURE__ */ y.jsxs("div", { className: "aiwa-cell-actions", children: [
      /* @__PURE__ */ y.jsx(ce, { variant: "filled", label: "Добавить приём", isFill: !0, ...Te("Добавить приём", s) }),
      /* @__PURE__ */ y.jsx(ce, { variant: "filled", label: "Совет по дневнику", isFill: !0, ...Te("Совет по дневнику", f) })
    ] }) }) })
  ] }) });
}
const l3 = {
  foodSection: () => ee("/api/section", { kind: "food" }),
  diary: () => ee("/api/diary", {}),
  trainingSection: () => ee("/api/section", { kind: "training" }),
  train: () => ee("/api/train", {})
}, qi = /* @__PURE__ */ new Map(), Wo = /* @__PURE__ */ new Map(), Io = (a) => Object.fromEntries(a.map((e) => [e, qi.get(e) ?? null])), jd = (a, { force: e = !1 } = {}) => {
  if (!e) {
    if (qi.has(a)) return Promise.resolve(qi.get(a));
    const s = Wo.get(a);
    if (s) return s;
  }
  const l = l3[a]().catch(() => null).then((s) => (s && qi.set(a, s), Wo.get(a) === l && Wo.delete(a), qi.get(a) ?? null));
  return Wo.set(a, l), l;
}, KA = () => {
  Object.keys(l3).forEach((a) => {
    jd(a);
  });
};
function s3(a, e) {
  const [l, s] = A.useState(() => Io(a)), r = A.useRef(!1), c = A.useCallback(async (...h) => {
    const p = h.length ? h : a;
    await Promise.all(p.map((m) => jd(m, { force: !0 }))), s(Io(a));
  }, [a]), f = A.useCallback((h, p) => {
    qi.set(h, p), s(Io(a));
  }, [a]);
  return A.useEffect(() => {
    let h = !0;
    const p = r.current;
    return r.current = !0, Promise.all(a.map((m) => jd(m, { force: p }))).then(() => {
      h && s(Io(a));
    }), () => {
      h = !1;
    };
  }, e), [l, c, f];
}
const ZA = ["foodSection", "diary"], QA = "/assets/paper-food-placeholder.png", Zg = (a, e) => a?.[String(e || "").trim()] || null;
function Qg({ mode: a, revision: e = 0 }) {
  const [l, s, r] = s3(ZA, [a, e]), [c, f] = A.useState({}), [h, p] = A.useState(""), [m, g] = A.useState(null), [v, b] = A.useState(!1), T = A.useRef(null);
  A.useEffect(() => {
    fetch("/assets/food/manifest.json").then((z) => z.ok ? z.json() : {}).then((z) => f(z || {})).catch(() => {
    });
  }, []);
  const S = () => s("diary");
  if (!l.foodSection || !l.diary) return /* @__PURE__ */ y.jsx(i3, { title: "Питание", variant: "food" });
  const w = l.foodSection, E = l.diary, _ = E.totals || {}, j = E.target || {}, M = (w.menu?.meals || []).slice(0, 2), D = (E.meals || []).slice(-3).reverse(), L = Number(j.kcal || w.kcal || 1841), V = Number(_.kcal || 1240), R = !(E.meals || []).length, q = V / Math.max(1, L), X = (z) => R ? Math.round(Number(j[z] || 0) * q) : Number(_[z] || 0), Z = async (z, P) => {
    const tt = Ar[Math.min(P, Ar.length - 1)].value, at = await ee("/api/food_text", { text: z.dish || z.title, slot: tt }).catch(() => null);
    at?.ok ? (Rt("Добавлено в дневник", { type: "success" }), await S()) : Rt(at?.message || "Не получилось добавить", { type: "error" });
  }, et = async (z) => {
    const P = await ee("/api/diary_del", { id: z }).catch(() => null);
    P && !P.error && (r("diary", { meals: P.meals || [], totals: P.totals || {}, target: P.target || j }), Rt("Приём удалён", { type: "success" }));
  }, F = () => {
    g(null), p("add");
  }, W = async (z) => {
    if (!(!z || v)) {
      b(!0);
      try {
        const P = window.aiwaUploadFoodPhoto;
        if (typeof P != "function") throw new Error("Загрузка фото недоступна");
        await P(z), await S();
      } catch (P) {
        Rt(P.message || "Не получилось разобрать фото", { type: "error" });
      } finally {
        b(!1);
      }
    }
  }, nt = async () => {
    await ee("/api/food_prompt", {}).catch(() => null), Xb({ nudge: !1 });
  }, st = [
    { label: "Фото", icon: /* @__PURE__ */ y.jsx(FE, {}), onSelect: () => T.current?.click() },
    { label: "Текстом", icon: /* @__PURE__ */ y.jsx(JE, {}), onSelect: nt }
  ];
  return /* @__PURE__ */ y.jsx(tl, { children: /* @__PURE__ */ y.jsx(Ii, { mode: "secondary", children: /* @__PURE__ */ y.jsxs("div", { className: "aiwa-paper-screen aiwa-food-screen", children: [
    /* @__PURE__ */ y.jsx(lt, { className: "aiwa-screen-title", variant: "title1", weight: "semibold", children: "Питание" }),
    /* @__PURE__ */ y.jsx(YA, { kcal: V, kcalTarget: L }),
    /* @__PURE__ */ y.jsxs("div", { className: "aiwa-macro-grid", children: [
      /* @__PURE__ */ y.jsx(Hf, { label: "Жиры", value: X("fat"), target: j.fat, macro: "fat" }),
      /* @__PURE__ */ y.jsx(Hf, { label: "Белки", value: X("protein"), target: j.protein, macro: "protein" }),
      /* @__PURE__ */ y.jsx(Hf, { label: "Углеводы", value: X("carbs"), target: j.carbs, macro: "carbs" })
    ] }),
    /* @__PURE__ */ y.jsxs("div", { className: "aiwa-screen-cta", children: [
      /* @__PURE__ */ y.jsx(
        a3,
        {
          items: st,
          trigger: /* @__PURE__ */ y.jsx(
            ce,
            {
              variant: "filled",
              "aria-label": "Добавить приём",
              label: /* @__PURE__ */ y.jsxs("span", { className: "aiwa-btn-icon-label", children: [
                /* @__PURE__ */ y.jsx(Ur, {}),
                " Добавить приём"
              ] })
            }
          )
        }
      ),
      /* @__PURE__ */ y.jsx(
        "input",
        {
          ref: T,
          type: "file",
          accept: "image/*",
          hidden: !0,
          onChange: (z) => {
            W(z.target.files?.[0]), z.target.value = "";
          }
        }
      )
    ] }),
    /* @__PURE__ */ y.jsxs(yt, { className: "aiwa-tma-blocks", children: [
      /* @__PURE__ */ y.jsx(
        kr,
        {
          message: w.text || "Выбираем простую еду с белком в каждом приёме.",
          onDiscuss: () => Me("go", "chat")
        }
      ),
      M.length ? /* @__PURE__ */ y.jsx(yt.Item, { header: "Рекомендации", children: M.map((z, P) => /* @__PURE__ */ y.jsx(
        he,
        {
          image: z.image || Zg(c, z.dish) || QA,
          title: z.dish || "Рекомендация Айвы",
          description: z.note || z.kcal || "Подходит под твой план на сегодня",
          onClick: () => Z(z, P)
        },
        z.dish || P
      )) }) : null,
      /* @__PURE__ */ y.jsxs(yt.Item, { header: "Прошедшие приёмы", children: [
        v ? /* @__PURE__ */ y.jsx(he, { loading: !0, title: "Разбираю фото…", description: "Айва считает КБЖУ" }) : null,
        D.length ? D.map((z) => /* @__PURE__ */ y.jsx(
          he,
          {
            image: Zg(c, z.title) || rA,
            title: z.title,
            description: `${Math.round(z.kcal || 0)} ккал · Б${Math.round(z.protein || 0)} · Ж${Math.round(z.fat || 0)} · У${Math.round(z.carbs || 0)}`,
            onClick: () => p("diary")
          },
          z.id
        )) : v ? null : /* @__PURE__ */ y.jsx(
          he,
          {
            title: "Дневник пока пуст",
            description: "Добавь первый приём — фото, текстом или вручную.",
            onClick: () => p("diary")
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ y.jsx(
      XA,
      {
        isOpen: h === "add",
        onClose: () => p(""),
        onSaved: S,
        editingMeal: m
      }
    ),
    /* @__PURE__ */ y.jsx(
      PA,
      {
        isOpen: h === "diary",
        onClose: () => p(""),
        diary: E,
        onAdd: F,
        onEdit: (z) => {
          g(z), p("add");
        },
        onDelete: et,
        onReco: async () => {
          const z = await ee("/api/diary_reco", {}).catch(() => null);
          Rt(z?.text || "Не удалось собрать совет");
        }
      }
    )
  ] }) }) });
}
function FA({ isOpen: a, onClose: e, onSaved: l, suggested: s }) {
  const r = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), [c, f] = A.useState(r), [h, p] = A.useState("Силовая"), [m, g] = A.useState("45 мин"), [v, b] = A.useState("Нормально"), [T, S] = A.useState([]), [w, E] = A.useState(""), [_, j] = A.useState(!1);
  A.useEffect(() => {
    if (!a) return;
    Yb("workout");
    const L = s?.name || "", V = /ход/i.test(L) ? "Ходьба" : /йог|мобил|релиз/i.test(L) ? "Йога" : /кардио/i.test(L) ? "Кардио" : "Силовая";
    p(V), S(L ? [L] : []), f(r);
  }, [a, s, r]);
  const M = (L) => S((V) => V.includes(L) ? V.filter((R) => R !== L) : [...V, L]), D = async () => {
    const L = [...T, ...w.trim() ? [w.trim()] : []];
    j(!0);
    try {
      const V = await ee("/api/workout", {
        date: c,
        type: h,
        duration: m,
        rpe: v,
        items: L.map((R) => ({ name: R }))
      });
      if (!V?.ok) throw new Error(V?.text || "Не получилось сохранить тренировку");
      Rt(`Тренировка сохранена · ~${V.calories || 0} ккал`, { type: "success" }), await l(), e();
    } catch (V) {
      Rt(V.message || "Не получилось сохранить", { type: "error" });
    } finally {
      j(!1);
    }
  };
  return /* @__PURE__ */ y.jsx(Xn, { isOpen: a, onClose: e, children: /* @__PURE__ */ y.jsx("div", { children: /* @__PURE__ */ y.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ y.jsx(It, { label: "Когда", type: "date", value: c, onChange: f }),
    /* @__PURE__ */ y.jsx(Xi, { label: "Что делала", options: cA, value: h, onChange: (L) => {
      p(L), S([]);
    } }),
    /* @__PURE__ */ y.jsxs("div", { className: "aiwa-form-group", children: [
      /* @__PURE__ */ y.jsx(lt, { className: "aiwa-form-label", variant: "body", weight: "semibold", children: "Упражнения" }),
      /* @__PURE__ */ y.jsxs("div", { className: "aiwa-sheet-card", children: [
        (fA[h] || []).map((L) => /* @__PURE__ */ y.jsxs(
          we,
          {
            as: "button",
            type: "button",
            mode: "opacity",
            className: "aiwa-exercise-row",
            "aria-pressed": T.includes(L),
            onClick: () => M(L),
            children: [
              /* @__PURE__ */ y.jsx(lt, { variant: "body", weight: "regular", children: L }),
              /* @__PURE__ */ y.jsx("span", { className: T.includes(L) ? "aiwa-check is-active" : "aiwa-check", children: T.includes(L) ? "✓" : "+" })
            ]
          },
          L
        )),
        /* @__PURE__ */ y.jsx(It, { label: "Добавить своё", value: w, onChange: E, placeholder: "Название упражнения" })
      ] })
    ] }),
    /* @__PURE__ */ y.jsx(Xi, { label: "Длительность", options: ["30 мин", "45 мин", "60+ мин"], value: m, onChange: g }),
    /* @__PURE__ */ y.jsx(Xi, { label: "Как ощущалось", options: ["Легко", "Нормально", "Тяжело"], value: v, onChange: b }),
    /* @__PURE__ */ y.jsx(
      ce,
      {
        variant: "filled",
        label: _ ? "Сохраняю…" : "Сохранить и разобрать",
        isFill: !0,
        disabled: _,
        ...Te("Сохранить и разобрать", D)
      }
    )
  ] }) }) });
}
function JA({ isOpen: a, onClose: e, options: l, onSelect: s }) {
  return /* @__PURE__ */ y.jsx(Xn, { isOpen: a, onClose: e, children: /* @__PURE__ */ y.jsxs(yt, { className: "aiwa-tma-blocks", children: [
    /* @__PURE__ */ y.jsx(yt.Item, { children: /* @__PURE__ */ y.jsx(Dt, { tappable: !1, children: /* @__PURE__ */ y.jsx(
      Dt.Text,
      {
        title: "Рекомендация на сегодня",
        description: "Выбери вариант, после которого останется запас сил."
      }
    ) }) }),
    /* @__PURE__ */ y.jsx(yt.Item, { children: l.map((r, c) => /* @__PURE__ */ y.jsx(
      he,
      {
        title: r.name || `Вариант ${c + 1}`,
        description: r.how || r.benefit || r.detail,
        onClick: () => s(r)
      },
      r.name || c
    )) })
  ] }) });
}
function WA({ isOpen: a, onClose: e, state: l, onAdd: s }) {
  const r = l?.today || [];
  return /* @__PURE__ */ y.jsx(Xn, { isOpen: a, onClose: e, children: /* @__PURE__ */ y.jsxs(yt, { className: "aiwa-tma-blocks", children: [
    l?.last_review ? /* @__PURE__ */ y.jsx(
      kr,
      {
        message: l.last_review.text || l.last_review,
        onDiscuss: () => Me("go", "chat")
      }
    ) : null,
    /* @__PURE__ */ y.jsx(yt.Item, { header: "Неделя", children: (l?.week || []).map((c) => /* @__PURE__ */ y.jsx(
      he,
      {
        title: c.dow,
        description: c.count ? `${c.type || "Тренировка"} · ${c.count}` : "Без тренировки",
        muted: !c.count
      },
      c.d
    )) }),
    r.length ? /* @__PURE__ */ y.jsx(yt.Item, { header: "Сегодня", children: r.map((c) => /* @__PURE__ */ y.jsx(
      he,
      {
        title: c.type || "Тренировка",
        description: `${c.duration || "—"} · ${String(c.rpe || "").toLowerCase()}`
      },
      c.id
    )) }) : null,
    /* @__PURE__ */ y.jsx(yt.Item, { children: /* @__PURE__ */ y.jsx(Dt, { tappable: !1, children: /* @__PURE__ */ y.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ y.jsx(
      ce,
      {
        variant: "filled",
        label: "Отметить тренировку",
        isFill: !0,
        ...Te("Отметить тренировку", s)
      }
    ) }) }) })
  ] }) });
}
function IA({ isOpen: a, onClose: e, profile: l, onSaved: s }) {
  const [r, c] = A.useState(l || {});
  A.useEffect(() => {
    a && c(l || {});
  }, [a, l]);
  const f = (p, m) => c((g) => ({ ...g, [p]: m })), h = async () => {
    (await ee("/api/train_profile", r).catch(() => null))?.ok ? (Rt("Тренировочный профиль сохранён", { type: "success" }), await s(), e()) : Rt("Не получилось сохранить", { type: "error" });
  };
  return /* @__PURE__ */ y.jsx(Xn, { isOpen: a, onClose: e, children: /* @__PURE__ */ y.jsx("div", { children: /* @__PURE__ */ y.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ y.jsx(lt, { variant: "body", weight: "regular", children: "Расскажи, чем занимаешься и что важно беречь. Айва учтёт это в рекомендациях и разборе нагрузки." }),
    /* @__PURE__ */ y.jsx(It, { label: "Формат", value: r.format || "", onChange: (p) => f("format", p), placeholder: "Зал и прогулки" }),
    /* @__PURE__ */ y.jsx(It, { label: "Цель", value: r.goal || "", onChange: (p) => f("goal", p), placeholder: "Тонус и больше энергии" }),
    /* @__PURE__ */ y.jsx(It, { label: "Ограничения", value: r.limits || "", onChange: (p) => f("limits", p), placeholder: "Например, бережём поясницу" }),
    /* @__PURE__ */ y.jsx(ce, { variant: "filled", label: "Сохранить", isFill: !0, ...Te("Сохранить профиль", h) })
  ] }) }) });
}
const t7 = ["trainingSection", "train"], e7 = (a) => {
  const e = a % 100, l = a % 10;
  return e >= 11 && e <= 14 ? "тренировок" : l === 1 ? "тренировка" : l >= 2 && l <= 4 ? "тренировки" : "тренировок";
}, n7 = (a) => (a || []).map((e) => ({
  iso: e.d,
  date: String(e.d || "").slice(-2).replace(/^0/, ""),
  label: e.dow,
  today: !!e.today,
  workout: !!e.count
}));
function a7({ mode: a, revision: e = 0 }) {
  const [l, s] = s3(t7, [a, e]), [r, c] = A.useState(""), [f, h] = A.useState(null), p = () => s("train");
  if (!l.trainingSection || !l.train) return /* @__PURE__ */ y.jsx(i3, { title: "Нагрузка", variant: "activity" });
  const m = l.trainingSection, g = l.train, v = m.training || {}, b = (v.options || []).slice(0, 4), T = g.today || [], S = g.week || [], w = S.filter((j) => j.count).slice(-3).reverse(), E = S.reduce((j, M) => j + (M.count || 0), 0), _ = (j = null) => {
    h(j), c("workout");
  };
  return /* @__PURE__ */ y.jsx(tl, { children: /* @__PURE__ */ y.jsx(Ii, { mode: "secondary", children: /* @__PURE__ */ y.jsxs("div", { className: "aiwa-paper-screen aiwa-activity-screen", children: [
    /* @__PURE__ */ y.jsx(lt, { className: "aiwa-screen-title", variant: "title1", weight: "semibold", children: "Нагрузка" }),
    /* @__PURE__ */ y.jsxs("div", { className: "aiwa-overview", children: [
      /* @__PURE__ */ y.jsx(Zb, { days: n7(S) }),
      /* @__PURE__ */ y.jsxs("div", { className: "aiwa-countdown", children: [
        /* @__PURE__ */ y.jsx(lt, { variant: "title1", weight: "semibold", children: E }),
        /* @__PURE__ */ y.jsx(lt, { variant: "body", weight: "regular", children: `${e7(E)} на этой неделе` })
      ] }),
      /* @__PURE__ */ y.jsx(
        ce,
        {
          variant: "filled",
          label: /* @__PURE__ */ y.jsxs("span", { className: "aiwa-btn-icon-label", children: [
            /* @__PURE__ */ y.jsx(Ur, {}),
            " Отметить тренировку"
          ] }),
          ...Te("Отметить тренировку", () => _())
        }
      )
    ] }),
    /* @__PURE__ */ y.jsxs(yt, { className: "aiwa-tma-blocks", children: [
      /* @__PURE__ */ y.jsx(
        kr,
        {
          message: v.summary || m.text || "Выбирай нагрузку, после которой станет легче, а не хуже.",
          detail: v.why,
          onDiscuss: () => Me("go", "chat")
        }
      ),
      b.length ? /* @__PURE__ */ y.jsx(yt.Item, { header: "Варианты", children: b.map((j, M) => /* @__PURE__ */ y.jsx(
        he,
        {
          title: j.name || `Вариант ${M + 1}`,
          description: j.benefit || j.how || j.detail,
          onClick: () => {
            h(j), c("variants");
          }
        },
        j.name || M
      )) }) : null,
      /* @__PURE__ */ y.jsx(yt.Item, { header: "Прошедшие тренировки", children: T.length ? T.slice().reverse().map((j) => /* @__PURE__ */ y.jsx(
        he,
        {
          title: j.type || "Тренировка",
          description: `сегодня · ${j.duration || "—"} · ${String(j.rpe || "").toLowerCase()}`,
          onClick: () => c("history")
        },
        j.id
      )) : w.length ? w.map((j) => /* @__PURE__ */ y.jsx(
        he,
        {
          title: j.type || "Тренировка",
          description: `${j.d} · ${j.count} запись`,
          onClick: () => c("history")
        },
        j.d
      )) : /* @__PURE__ */ y.jsx(
        he,
        {
          title: "История пока пуста",
          description: "Отметь первую тренировку — Айва подготовит разбор.",
          onClick: () => c("history")
        }
      ) }),
      /* @__PURE__ */ y.jsx(yt.Item, { children: /* @__PURE__ */ y.jsx(
        Dt,
        {
          as: "button",
          type: "button",
          onClick: () => c("profile"),
          end: /* @__PURE__ */ y.jsx(Dt.Part, { type: "Chevron" }),
          children: /* @__PURE__ */ y.jsx(Dt.Text, { title: "Настроить тренировочный профиль", bold: !0 })
        }
      ) })
    ] }),
    /* @__PURE__ */ y.jsx(FA, { isOpen: r === "workout", onClose: () => c(""), onSaved: p, suggested: f }),
    /* @__PURE__ */ y.jsx(
      JA,
      {
        isOpen: r === "variants",
        onClose: () => c(""),
        options: b,
        onSelect: (j) => _(j)
      }
    ),
    /* @__PURE__ */ y.jsx(WA, { isOpen: r === "history", onClose: () => c(""), state: g, onAdd: () => _() }),
    /* @__PURE__ */ y.jsx(IA, { isOpen: r === "profile", onClose: () => c(""), profile: g.profile, onSaved: p })
  ] }) }) });
}
function i7({ initialMessages: a = [] }) {
  const [e, l] = A.useState(() => a.map((S, w) => ({
    id: `initial-${w}`,
    role: S.role === "user" ? "user" : "assistant",
    text: S.text || "",
    suggestions: []
  }))), [s, r] = A.useState(""), [c, f] = A.useState(!1), [h, p] = A.useState(!1), m = Kf.useRef(null), g = Kf.useRef(null);
  A.useEffect(() => {
    e.length || l([{
      id: "hello",
      role: "assistant",
      text: "Привет! Спроси меня о цикле, питании, тренировках или самочувствии. Я отвечу с учётом твоих данных.",
      suggestions: ["Можно ли тренироваться?", "Что съесть сегодня?", "Как моё самочувствие?"]
    }]);
  }, []), A.useEffect(() => {
    g.current?.scrollIntoView({ block: "end" });
  }, [e, c]);
  const v = async (S = s) => {
    const w = String(S || "").trim();
    if (!w || c) return;
    r(""), l((_) => [..._, { id: `user-${Date.now()}`, role: "user", text: w, suggestions: [] }]), f(!0);
    const E = await ee("/api/chat", { message: w }).catch(() => null);
    l((_) => [..._, {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      text: E?.answer || "Не получилось ответить, попробуй ещё раз.",
      suggestions: E?.suggestions || []
    }]), f(!1);
  }, b = async (S, w) => {
    f(!0);
    const E = new FormData();
    E.append("initData", window.aiwaInit || ""), E.append("audio", S, w?.includes("mp4") ? "voice.mp4" : "voice.webm");
    try {
      const j = await (await fetch("/api/voice", { method: "POST", body: E })).json();
      j.transcript && l((M) => [...M, { id: `voice-${Date.now()}`, role: "user", text: j.transcript, suggestions: [] }]), l((M) => [...M, {
        id: `voice-answer-${Date.now()}`,
        role: "assistant",
        text: j.answer || "Не получилось распознать голос.",
        suggestions: j.suggestions || []
      }]);
    } catch {
      Rt("Не получилось отправить голос", { type: "error" });
    } finally {
      f(!1);
    }
  }, T = async () => {
    if (h) {
      m.current?.stop();
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      Rt("Голос недоступен в этом клиенте", { type: "error" });
      return;
    }
    try {
      const S = await navigator.mediaDevices.getUserMedia({ audio: !0 }), w = [], E = new MediaRecorder(S);
      m.current = E, E.ondataavailable = (_) => {
        _.data?.size && w.push(_.data);
      }, E.onstop = () => {
        p(!1), S.getTracks().forEach((j) => j.stop());
        const _ = new Blob(w, { type: E.mimeType || "audio/webm" });
        _.size > 900 && b(_, E.mimeType);
      }, E.start(), p(!0);
    } catch {
      Rt("Нет доступа к микрофону", { type: "error" });
    }
  };
  return /* @__PURE__ */ y.jsx(tl, { children: /* @__PURE__ */ y.jsx(Ii, { mode: "secondary", children: /* @__PURE__ */ y.jsxs("div", { className: "aiwa-chat-screen", children: [
    /* @__PURE__ */ y.jsxs("div", { className: "aiwa-chat-header", children: [
      /* @__PURE__ */ y.jsx(Lh, { size: 50, frames: zh, pauseMs: 0 }),
      /* @__PURE__ */ y.jsxs("div", { children: [
        /* @__PURE__ */ y.jsx(lt, { variant: "title3", weight: "semibold", children: "Айва" }),
        /* @__PURE__ */ y.jsx(lt, { variant: "caption1", weight: "regular", children: "учитывает твои данные" })
      ] }),
      /* @__PURE__ */ y.jsx(we, { as: "button", type: "button", mode: "opacity", className: "aiwa-sheet-close", "aria-label": "Закрыть чат", onClick: () => Me("go", "today"), children: /* @__PURE__ */ y.jsx(qb, {}) })
    ] }),
    /* @__PURE__ */ y.jsxs("div", { className: "aiwa-chat-messages", children: [
      e.map((S) => /* @__PURE__ */ y.jsxs("div", { className: S.role === "user" ? "aiwa-chat-bubble is-user" : "aiwa-chat-bubble is-ai", children: [
        /* @__PURE__ */ y.jsx(lt, { variant: "body", weight: "regular", children: S.text }),
        S.suggestions?.length ? /* @__PURE__ */ y.jsx("div", { className: "aiwa-chat-suggestions", children: S.suggestions.slice(0, 3).map((w) => /* @__PURE__ */ y.jsx(we, { as: "button", type: "button", mode: "opacity", onClick: () => v(w), children: /* @__PURE__ */ y.jsx(lt, { variant: "caption1", weight: "semibold", children: w }) }, w)) }) : null
      ] }, S.id)),
      c ? /* @__PURE__ */ y.jsx("div", { className: "aiwa-chat-bubble is-ai", children: /* @__PURE__ */ y.jsx(lt, { variant: "body", weight: "regular", children: "Айва думает…" }) }) : null,
      /* @__PURE__ */ y.jsx("span", { ref: g })
    ] }),
    /* @__PURE__ */ y.jsxs("div", { className: "aiwa-chat-composer", children: [
      /* @__PURE__ */ y.jsx(
        "input",
        {
          value: s,
          placeholder: "Спроси Айву…",
          onChange: (S) => r(S.target.value),
          onKeyDown: (S) => {
            S.key === "Enter" && v();
          }
        }
      ),
      /* @__PURE__ */ y.jsx(we, { as: "button", type: "button", mode: "opacity", className: h ? "aiwa-chat-icon is-recording" : "aiwa-chat-icon", "aria-label": "Голос", onClick: T, children: /* @__PURE__ */ y.jsx(lt, { variant: "body", weight: "semibold", children: h ? "■" : "Голос" }) }),
      /* @__PURE__ */ y.jsx(we, { as: "button", type: "button", mode: "opacity", className: "aiwa-chat-send", "aria-label": "Отправить", onClick: () => v(), children: /* @__PURE__ */ y.jsx(lt, { variant: "title3", weight: "semibold", children: "↑" }) })
    ] })
  ] }) }) });
}
const qf = [
  { id: "today", label: "Главная", icon: /* @__PURE__ */ y.jsx(XE, {}) },
  { id: "food", label: "Питание", icon: /* @__PURE__ */ y.jsx(ZE, {}) },
  { id: "train", label: "Нагрузка", icon: /* @__PURE__ */ y.jsx(QE, {}) }
];
function l7({ active: a }) {
  const e = a === "stats" ? "today" : a, l = Math.max(0, qf.findIndex((s) => s.id === e));
  return /* @__PURE__ */ y.jsx(tl, { children: /* @__PURE__ */ y.jsxs("div", { className: "aiwa-nav-root", "data-aiwa-nav": "true", children: [
    /* @__PURE__ */ y.jsx("div", { className: "aiwa-nav-tabbar-layer", children: /* @__PURE__ */ y.jsx(
      qE,
      {
        tabs: qf.map(({ label: s, icon: r }) => ({ label: s, icon: r })),
        defaultIndex: l,
        onChange: (s) => Me("go", qf[s].id)
      }
    ) }),
    /* @__PURE__ */ y.jsx(
      we,
      {
        as: "button",
        type: "button",
        mode: "opacity",
        className: "aiwa-nav-mascot",
        "aria-label": "Открыть Айву",
        onClick: () => Xb(),
        children: /* @__PURE__ */ y.jsx(Lh, { size: 67 })
      }
    )
  ] }) });
}
let Xa = null, $f = null, Pa = null, is = "", _d = !1, Rd = 0, Gf = null, Fg = null, ts = null, Yf = null, tr = {}, er = 0, Xf = null, Jg = null, Wg = {}, Ig = 0, Pf = null, tv = null;
const Ga = () => {
  !Xa || !Pa || Xa.render(
    /* @__PURE__ */ y.jsx(
      kA,
      {
        ...Pa,
        panel: is,
        panelRevision: Rd,
        profileOpen: _d,
        onPanelClose: () => Dd.closePanel(),
        onProfileClose: () => Dd.closeProfile()
      }
    )
  );
}, Dd = {
  renderHome(a, e) {
    a && ($f !== a && (Xa?.unmount(), $f = a, Xa = Bi.createRoot(a)), Pa = e, is = e.panel || is, Ga());
  },
  patchHome(a) {
    !Xa || !Pa || (Pa = { ...Pa, ...a }, Ga());
  },
  openPanel(a) {
    is = a, window.HOME_PANEL = a, Rd += 1, Ga();
  },
  closePanel() {
    is = "", window.HOME_PANEL = "", Ga();
  },
  openProfile() {
    _d = !0, Ga();
  },
  closeProfile() {
    _d = !1, Ga();
  },
  refreshPanel() {
    Rd += 1, Ga();
  },
  unmountHome() {
    Xa?.unmount(), Xa = null, $f = null, Pa = null;
  },
  // Повторный вызов для уже смонтированного экрана = «перечитай данные»:
  // так host сбрасывает loadedFood/loadedTrain после правок профиля.
  renderFood(a, e = {}) {
    a && (Yf !== a ? (ts?.unmount(), Yf = a, ts = Bi.createRoot(a)) : er += 1, tr = e, ts.render(/* @__PURE__ */ y.jsx(Qg, { ...tr, revision: er })));
  },
  renderActivity(a, e = {}) {
    a && (Jg !== a ? (Xf?.unmount(), Jg = a, Xf = Bi.createRoot(a)) : Ig += 1, Wg = e, Xf.render(/* @__PURE__ */ y.jsx(a7, { ...Wg, revision: Ig })));
  },
  renderChat(a, e = {}) {
    a && (tv !== a && (Pf?.unmount(), tv = a, Pf = Bi.createRoot(a)), Pf.render(/* @__PURE__ */ y.jsx(i7, { initialMessages: e.messages || [] })));
  },
  refreshFood() {
    !Yf || !ts || (er += 1, ts.render(/* @__PURE__ */ y.jsx(Qg, { ...tr, mode: te("aiwaMode") || tr.mode, revision: er })));
  },
  /** Прогрев данных «Питания» и «Нагрузки» на старте — чтобы табы открывались сразу. */
  prefetch() {
    KA();
  },
  renderNav(a, e) {
    a && (Fg !== a && (Gf?.unmount(), Fg = a, Gf = Bi.createRoot(a)), Gf.render(/* @__PURE__ */ y.jsx(l7, { active: e })));
  }
};
function s7() {
  window.AiwaDeslop = Dd, eA(), window.dispatchEvent(new CustomEvent("aiwa:deslop-ready"));
}
s7();
export {
  LS as R,
  gs as a,
  YS as b,
  Or as c,
  DS as g,
  y as j,
  A as r
};
