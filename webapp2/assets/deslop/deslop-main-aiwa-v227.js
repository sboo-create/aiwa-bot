function m4(n, t) {
  for (var s = 0; s < t.length; s++) {
    const l = t[s];
    if (typeof l != "string" && !Array.isArray(l)) {
      for (const r in l)
        if (r !== "default" && !(r in n)) {
          const u = Object.getOwnPropertyDescriptor(l, r);
          u && Object.defineProperty(n, r, u.get ? u : {
            enumerable: !0,
            get: () => l[r]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
function p4(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Uf = { exports: {} }, Tl = {};
var zg;
function g4() {
  if (zg) return Tl;
  zg = 1;
  var n = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function s(l, r, u) {
    var c = null;
    if (u !== void 0 && (c = "" + u), r.key !== void 0 && (c = "" + r.key), "key" in r) {
      u = {};
      for (var d in r)
        d !== "key" && (u[d] = r[d]);
    } else u = r;
    return r = u.ref, {
      $$typeof: n,
      type: l,
      key: c,
      ref: r !== void 0 ? r : null,
      props: u
    };
  }
  return Tl.Fragment = t, Tl.jsx = s, Tl.jsxs = s, Tl;
}
var Vg;
function y4() {
  return Vg || (Vg = 1, Uf.exports = g4()), Uf.exports;
}
var p = y4(), Hf = { exports: {} }, St = {};
var kg;
function v4() {
  if (kg) return St;
  kg = 1;
  var n = Symbol.for("react.transitional.element"), t = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), u = Symbol.for("react.consumer"), c = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), b = Symbol.iterator;
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
  }, C = Object.assign, w = {};
  function M(N, q, tt) {
    this.props = N, this.context = q, this.refs = w, this.updater = tt || S;
  }
  M.prototype.isReactComponent = {}, M.prototype.setState = function(N, q) {
    if (typeof N != "object" && typeof N != "function" && N != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, N, q, "setState");
  }, M.prototype.forceUpdate = function(N) {
    this.updater.enqueueForceUpdate(this, N, "forceUpdate");
  };
  function _() {
  }
  _.prototype = M.prototype;
  function R(N, q, tt) {
    this.props = N, this.context = q, this.refs = w, this.updater = tt || S;
  }
  var D = R.prototype = new _();
  D.constructor = R, C(D, M.prototype), D.isPureReactComponent = !0;
  var L = Array.isArray;
  function $() {
  }
  var E = { H: null, A: null, T: null, S: null }, z = Object.prototype.hasOwnProperty;
  function k(N, q, tt) {
    var lt = tt.ref;
    return {
      $$typeof: n,
      type: N,
      key: q,
      ref: lt !== void 0 ? lt : null,
      props: tt
    };
  }
  function Y(N, q) {
    return k(N.type, q, N.props);
  }
  function et(N) {
    return typeof N == "object" && N !== null && N.$$typeof === n;
  }
  function nt(N) {
    var q = { "=": "=0", ":": "=2" };
    return "$" + N.replace(/[=:]/g, function(tt) {
      return q[tt];
    });
  }
  var J = /\/+/g;
  function Q(N, q) {
    return typeof N == "object" && N !== null && N.key != null ? nt("" + N.key) : q.toString(36);
  }
  function W(N) {
    switch (N.status) {
      case "fulfilled":
        return N.value;
      case "rejected":
        throw N.reason;
      default:
        switch (typeof N.status == "string" ? N.then($, $) : (N.status = "pending", N.then(
          function(q) {
            N.status === "pending" && (N.status = "fulfilled", N.value = q);
          },
          function(q) {
            N.status === "pending" && (N.status = "rejected", N.reason = q);
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
  function O(N, q, tt, lt, F) {
    var rt = typeof N;
    (rt === "undefined" || rt === "boolean") && (N = null);
    var ct = !1;
    if (N === null) ct = !0;
    else
      switch (rt) {
        case "bigint":
        case "string":
        case "number":
          ct = !0;
          break;
        case "object":
          switch (N.$$typeof) {
            case n:
            case t:
              ct = !0;
              break;
            case y:
              return ct = N._init, O(
                ct(N._payload),
                q,
                tt,
                lt,
                F
              );
          }
      }
    if (ct)
      return F = F(N), ct = lt === "" ? "." + Q(N, 0) : lt, L(F) ? (tt = "", ct != null && (tt = ct.replace(J, "$&/") + "/"), O(F, q, tt, "", function(Dt) {
        return Dt;
      })) : F != null && (et(F) && (F = Y(
        F,
        tt + (F.key == null || N && N.key === F.key ? "" : ("" + F.key).replace(
          J,
          "$&/"
        ) + "/") + ct
      )), q.push(F)), 1;
    ct = 0;
    var gt = lt === "" ? "." : lt + ":";
    if (L(N))
      for (var bt = 0; bt < N.length; bt++)
        lt = N[bt], rt = gt + Q(lt, bt), ct += O(
          lt,
          q,
          tt,
          rt,
          F
        );
    else if (bt = T(N), typeof bt == "function")
      for (N = bt.call(N), bt = 0; !(lt = N.next()).done; )
        lt = lt.value, rt = gt + Q(lt, bt++), ct += O(
          lt,
          q,
          tt,
          rt,
          F
        );
    else if (rt === "object") {
      if (typeof N.then == "function")
        return O(
          W(N),
          q,
          tt,
          lt,
          F
        );
      throw q = String(N), Error(
        "Objects are not valid as a React child (found: " + (q === "[object Object]" ? "object with keys {" + Object.keys(N).join(", ") + "}" : q) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ct;
  }
  function U(N, q, tt) {
    if (N == null) return N;
    var lt = [], F = 0;
    return O(N, lt, "", "", function(rt) {
      return q.call(tt, rt, F++);
    }), lt;
  }
  function X(N) {
    if (N._status === -1) {
      var q = N._result;
      q = q(), q.then(
        function(tt) {
          (N._status === 0 || N._status === -1) && (N._status = 1, N._result = tt);
        },
        function(tt) {
          (N._status === 0 || N._status === -1) && (N._status = 2, N._result = tt);
        }
      ), N._status === -1 && (N._status = 0, N._result = q);
    }
    if (N._status === 1) return N._result.default;
    throw N._result;
  }
  var it = typeof reportError == "function" ? reportError : function(N) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var q = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof N == "object" && N !== null && typeof N.message == "string" ? String(N.message) : String(N),
        error: N
      });
      if (!window.dispatchEvent(q)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", N);
      return;
    }
    console.error(N);
  }, ot = {
    map: U,
    forEach: function(N, q, tt) {
      U(
        N,
        function() {
          q.apply(this, arguments);
        },
        tt
      );
    },
    count: function(N) {
      var q = 0;
      return U(N, function() {
        q++;
      }), q;
    },
    toArray: function(N) {
      return U(N, function(q) {
        return q;
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
  return St.Activity = v, St.Children = ot, St.Component = M, St.Fragment = s, St.Profiler = r, St.PureComponent = R, St.StrictMode = l, St.Suspense = g, St.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = E, St.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(N) {
      return E.H.useMemoCache(N);
    }
  }, St.cache = function(N) {
    return function() {
      return N.apply(null, arguments);
    };
  }, St.cacheSignal = function() {
    return null;
  }, St.cloneElement = function(N, q, tt) {
    if (N == null)
      throw Error(
        "The argument must be a React element, but you passed " + N + "."
      );
    var lt = C({}, N.props), F = N.key;
    if (q != null)
      for (rt in q.key !== void 0 && (F = "" + q.key), q)
        !z.call(q, rt) || rt === "key" || rt === "__self" || rt === "__source" || rt === "ref" && q.ref === void 0 || (lt[rt] = q[rt]);
    var rt = arguments.length - 2;
    if (rt === 1) lt.children = tt;
    else if (1 < rt) {
      for (var ct = Array(rt), gt = 0; gt < rt; gt++)
        ct[gt] = arguments[gt + 2];
      lt.children = ct;
    }
    return k(N.type, F, lt);
  }, St.createContext = function(N) {
    return N = {
      $$typeof: c,
      _currentValue: N,
      _currentValue2: N,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, N.Provider = N, N.Consumer = {
      $$typeof: u,
      _context: N
    }, N;
  }, St.createElement = function(N, q, tt) {
    var lt, F = {}, rt = null;
    if (q != null)
      for (lt in q.key !== void 0 && (rt = "" + q.key), q)
        z.call(q, lt) && lt !== "key" && lt !== "__self" && lt !== "__source" && (F[lt] = q[lt]);
    var ct = arguments.length - 2;
    if (ct === 1) F.children = tt;
    else if (1 < ct) {
      for (var gt = Array(ct), bt = 0; bt < ct; bt++)
        gt[bt] = arguments[bt + 2];
      F.children = gt;
    }
    if (N && N.defaultProps)
      for (lt in ct = N.defaultProps, ct)
        F[lt] === void 0 && (F[lt] = ct[lt]);
    return k(N, rt, F);
  }, St.createRef = function() {
    return { current: null };
  }, St.forwardRef = function(N) {
    return { $$typeof: d, render: N };
  }, St.isValidElement = et, St.lazy = function(N) {
    return {
      $$typeof: y,
      _payload: { _status: -1, _result: N },
      _init: X
    };
  }, St.memo = function(N, q) {
    return {
      $$typeof: m,
      type: N,
      compare: q === void 0 ? null : q
    };
  }, St.startTransition = function(N) {
    var q = E.T, tt = {};
    E.T = tt;
    try {
      var lt = N(), F = E.S;
      F !== null && F(tt, lt), typeof lt == "object" && lt !== null && typeof lt.then == "function" && lt.then($, it);
    } catch (rt) {
      it(rt);
    } finally {
      q !== null && tt.types !== null && (q.types = tt.types), E.T = q;
    }
  }, St.unstable_useCacheRefresh = function() {
    return E.H.useCacheRefresh();
  }, St.use = function(N) {
    return E.H.use(N);
  }, St.useActionState = function(N, q, tt) {
    return E.H.useActionState(N, q, tt);
  }, St.useCallback = function(N, q) {
    return E.H.useCallback(N, q);
  }, St.useContext = function(N) {
    return E.H.useContext(N);
  }, St.useDebugValue = function() {
  }, St.useDeferredValue = function(N, q) {
    return E.H.useDeferredValue(N, q);
  }, St.useEffect = function(N, q) {
    return E.H.useEffect(N, q);
  }, St.useEffectEvent = function(N) {
    return E.H.useEffectEvent(N);
  }, St.useId = function() {
    return E.H.useId();
  }, St.useImperativeHandle = function(N, q, tt) {
    return E.H.useImperativeHandle(N, q, tt);
  }, St.useInsertionEffect = function(N, q) {
    return E.H.useInsertionEffect(N, q);
  }, St.useLayoutEffect = function(N, q) {
    return E.H.useLayoutEffect(N, q);
  }, St.useMemo = function(N, q) {
    return E.H.useMemo(N, q);
  }, St.useOptimistic = function(N, q) {
    return E.H.useOptimistic(N, q);
  }, St.useReducer = function(N, q, tt) {
    return E.H.useReducer(N, q, tt);
  }, St.useRef = function(N) {
    return E.H.useRef(N);
  }, St.useState = function(N) {
    return E.H.useState(N);
  }, St.useSyncExternalStore = function(N, q, tt) {
    return E.H.useSyncExternalStore(
      N,
      q,
      tt
    );
  }, St.useTransition = function() {
    return E.H.useTransition();
  }, St.version = "19.2.7", St;
}
var Ug;
function Wl() {
  return Ug || (Ug = 1, Hf.exports = v4()), Hf.exports;
}
var j = Wl();
const Od = /* @__PURE__ */ p4(j), b4 = /* @__PURE__ */ m4({
  __proto__: null,
  default: Od
}, [j]);
var qf = { exports: {} }, jl = {}, Yf = { exports: {} }, Gf = {};
var Hg;
function x4() {
  return Hg || (Hg = 1, (function(n) {
    function t(O, U) {
      var X = O.length;
      O.push(U);
      t: for (; 0 < X; ) {
        var it = X - 1 >>> 1, ot = O[it];
        if (0 < r(ot, U))
          O[it] = U, O[X] = ot, X = it;
        else break t;
      }
    }
    function s(O) {
      return O.length === 0 ? null : O[0];
    }
    function l(O) {
      if (O.length === 0) return null;
      var U = O[0], X = O.pop();
      if (X !== U) {
        O[0] = X;
        t: for (var it = 0, ot = O.length, N = ot >>> 1; it < N; ) {
          var q = 2 * (it + 1) - 1, tt = O[q], lt = q + 1, F = O[lt];
          if (0 > r(tt, X))
            lt < ot && 0 > r(F, tt) ? (O[it] = F, O[lt] = X, it = lt) : (O[it] = tt, O[q] = X, it = q);
          else if (lt < ot && 0 > r(F, X))
            O[it] = F, O[lt] = X, it = lt;
          else break t;
        }
      }
      return U;
    }
    function r(O, U) {
      var X = O.sortIndex - U.sortIndex;
      return X !== 0 ? X : O.id - U.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var u = performance;
      n.unstable_now = function() {
        return u.now();
      };
    } else {
      var c = Date, d = c.now();
      n.unstable_now = function() {
        return c.now() - d;
      };
    }
    var g = [], m = [], y = 1, v = null, b = 3, T = !1, S = !1, C = !1, w = !1, M = typeof setTimeout == "function" ? setTimeout : null, _ = typeof clearTimeout == "function" ? clearTimeout : null, R = typeof setImmediate < "u" ? setImmediate : null;
    function D(O) {
      for (var U = s(m); U !== null; ) {
        if (U.callback === null) l(m);
        else if (U.startTime <= O)
          l(m), U.sortIndex = U.expirationTime, t(g, U);
        else break;
        U = s(m);
      }
    }
    function L(O) {
      if (C = !1, D(O), !S)
        if (s(g) !== null)
          S = !0, $ || ($ = !0, nt());
        else {
          var U = s(m);
          U !== null && W(L, U.startTime - O);
        }
    }
    var $ = !1, E = -1, z = 5, k = -1;
    function Y() {
      return w ? !0 : !(n.unstable_now() - k < z);
    }
    function et() {
      if (w = !1, $) {
        var O = n.unstable_now();
        k = O;
        var U = !0;
        try {
          t: {
            S = !1, C && (C = !1, _(E), E = -1), T = !0;
            var X = b;
            try {
              e: {
                for (D(O), v = s(g); v !== null && !(v.expirationTime > O && Y()); ) {
                  var it = v.callback;
                  if (typeof it == "function") {
                    v.callback = null, b = v.priorityLevel;
                    var ot = it(
                      v.expirationTime <= O
                    );
                    if (O = n.unstable_now(), typeof ot == "function") {
                      v.callback = ot, D(O), U = !0;
                      break e;
                    }
                    v === s(g) && l(g), D(O);
                  } else l(g);
                  v = s(g);
                }
                if (v !== null) U = !0;
                else {
                  var N = s(m);
                  N !== null && W(
                    L,
                    N.startTime - O
                  ), U = !1;
                }
              }
              break t;
            } finally {
              v = null, b = X, T = !1;
            }
            U = void 0;
          }
        } finally {
          U ? nt() : $ = !1;
        }
      }
    }
    var nt;
    if (typeof R == "function")
      nt = function() {
        R(et);
      };
    else if (typeof MessageChannel < "u") {
      var J = new MessageChannel(), Q = J.port2;
      J.port1.onmessage = et, nt = function() {
        Q.postMessage(null);
      };
    } else
      nt = function() {
        M(et, 0);
      };
    function W(O, U) {
      E = M(function() {
        O(n.unstable_now());
      }, U);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, n.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : z = 0 < O ? Math.floor(1e3 / O) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return b;
    }, n.unstable_next = function(O) {
      switch (b) {
        case 1:
        case 2:
        case 3:
          var U = 3;
          break;
        default:
          U = b;
      }
      var X = b;
      b = U;
      try {
        return O();
      } finally {
        b = X;
      }
    }, n.unstable_requestPaint = function() {
      w = !0;
    }, n.unstable_runWithPriority = function(O, U) {
      switch (O) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          O = 3;
      }
      var X = b;
      b = O;
      try {
        return U();
      } finally {
        b = X;
      }
    }, n.unstable_scheduleCallback = function(O, U, X) {
      var it = n.unstable_now();
      switch (typeof X == "object" && X !== null ? (X = X.delay, X = typeof X == "number" && 0 < X ? it + X : it) : X = it, O) {
        case 1:
          var ot = -1;
          break;
        case 2:
          ot = 250;
          break;
        case 5:
          ot = 1073741823;
          break;
        case 4:
          ot = 1e4;
          break;
        default:
          ot = 5e3;
      }
      return ot = X + ot, O = {
        id: y++,
        callback: U,
        priorityLevel: O,
        startTime: X,
        expirationTime: ot,
        sortIndex: -1
      }, X > it ? (O.sortIndex = X, t(m, O), s(g) === null && O === s(m) && (C ? (_(E), E = -1) : C = !0, W(L, X - it))) : (O.sortIndex = ot, t(g, O), S || T || (S = !0, $ || ($ = !0, nt()))), O;
    }, n.unstable_shouldYield = Y, n.unstable_wrapCallback = function(O) {
      var U = b;
      return function() {
        var X = b;
        b = U;
        try {
          return O.apply(this, arguments);
        } finally {
          b = X;
        }
      };
    };
  })(Gf)), Gf;
}
var qg;
function S4() {
  return qg || (qg = 1, Yf.exports = x4()), Yf.exports;
}
var Pf = { exports: {} }, Ne = {};
var Yg;
function w4() {
  if (Yg) return Ne;
  Yg = 1;
  var n = Wl();
  function t(g) {
    var m = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var y = 2; y < arguments.length; y++)
        m += "&args[]=" + encodeURIComponent(arguments[y]);
    }
    return "Minified React error #" + g + "; visit " + m + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s() {
  }
  var l = {
    d: {
      f: s,
      r: function() {
        throw Error(t(522));
      },
      D: s,
      C: s,
      L: s,
      m: s,
      X: s,
      S: s,
      M: s
    },
    p: 0,
    findDOMNode: null
  }, r = Symbol.for("react.portal");
  function u(g, m, y) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: v == null ? null : "" + v,
      children: g,
      containerInfo: m,
      implementation: y
    };
  }
  var c = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function d(g, m) {
    if (g === "font") return "";
    if (typeof m == "string")
      return m === "use-credentials" ? m : "";
  }
  return Ne.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, Ne.createPortal = function(g, m) {
    var y = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(t(299));
    return u(g, m, null, y);
  }, Ne.flushSync = function(g) {
    var m = c.T, y = l.p;
    try {
      if (c.T = null, l.p = 2, g) return g();
    } finally {
      c.T = m, l.p = y, l.d.f();
    }
  }, Ne.preconnect = function(g, m) {
    typeof g == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, l.d.C(g, m));
  }, Ne.prefetchDNS = function(g) {
    typeof g == "string" && l.d.D(g);
  }, Ne.preinit = function(g, m) {
    if (typeof g == "string" && m && typeof m.as == "string") {
      var y = m.as, v = d(y, m.crossOrigin), b = typeof m.integrity == "string" ? m.integrity : void 0, T = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      y === "style" ? l.d.S(
        g,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: v,
          integrity: b,
          fetchPriority: T
        }
      ) : y === "script" && l.d.X(g, {
        crossOrigin: v,
        integrity: b,
        fetchPriority: T,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0
      });
    }
  }, Ne.preinitModule = function(g, m) {
    if (typeof g == "string")
      if (typeof m == "object" && m !== null) {
        if (m.as == null || m.as === "script") {
          var y = d(
            m.as,
            m.crossOrigin
          );
          l.d.M(g, {
            crossOrigin: y,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
            nonce: typeof m.nonce == "string" ? m.nonce : void 0
          });
        }
      } else m == null && l.d.M(g);
  }, Ne.preload = function(g, m) {
    if (typeof g == "string" && typeof m == "object" && m !== null && typeof m.as == "string") {
      var y = m.as, v = d(y, m.crossOrigin);
      l.d.L(g, y, {
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
  }, Ne.preloadModule = function(g, m) {
    if (typeof g == "string")
      if (m) {
        var y = d(m.as, m.crossOrigin);
        l.d.m(g, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: y,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else l.d.m(g);
  }, Ne.requestFormReset = function(g) {
    l.d.r(g);
  }, Ne.unstable_batchedUpdates = function(g, m) {
    return g(m);
  }, Ne.useFormState = function(g, m, y) {
    return c.H.useFormState(g, m, y);
  }, Ne.useFormStatus = function() {
    return c.H.useHostTransitionStatus();
  }, Ne.version = "19.2.7", Ne;
}
var Gg;
function A2() {
  if (Gg) return Pf.exports;
  Gg = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (t) {
        console.error(t);
      }
  }
  return n(), Pf.exports = w4(), Pf.exports;
}
var Pg;
function C4() {
  if (Pg) return jl;
  Pg = 1;
  var n = S4(), t = Wl(), s = A2();
  function l(e) {
    var a = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      a += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var i = 2; i < arguments.length; i++)
        a += "&args[]=" + encodeURIComponent(arguments[i]);
    }
    return "Minified React error #" + e + "; visit " + a + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function u(e) {
    var a = e, i = e;
    if (e.alternate) for (; a.return; ) a = a.return;
    else {
      e = a;
      do
        a = e, (a.flags & 4098) !== 0 && (i = a.return), e = a.return;
      while (e);
    }
    return a.tag === 3 ? i : null;
  }
  function c(e) {
    if (e.tag === 13) {
      var a = e.memoizedState;
      if (a === null && (e = e.alternate, e !== null && (a = e.memoizedState)), a !== null) return a.dehydrated;
    }
    return null;
  }
  function d(e) {
    if (e.tag === 31) {
      var a = e.memoizedState;
      if (a === null && (e = e.alternate, e !== null && (a = e.memoizedState)), a !== null) return a.dehydrated;
    }
    return null;
  }
  function g(e) {
    if (u(e) !== e)
      throw Error(l(188));
  }
  function m(e) {
    var a = e.alternate;
    if (!a) {
      if (a = u(e), a === null) throw Error(l(188));
      return a !== e ? null : e;
    }
    for (var i = e, o = a; ; ) {
      var f = i.return;
      if (f === null) break;
      var h = f.alternate;
      if (h === null) {
        if (o = f.return, o !== null) {
          i = o;
          continue;
        }
        break;
      }
      if (f.child === h.child) {
        for (h = f.child; h; ) {
          if (h === i) return g(f), e;
          if (h === o) return g(f), a;
          h = h.sibling;
        }
        throw Error(l(188));
      }
      if (i.return !== o.return) i = f, o = h;
      else {
        for (var x = !1, A = f.child; A; ) {
          if (A === i) {
            x = !0, i = f, o = h;
            break;
          }
          if (A === o) {
            x = !0, o = f, i = h;
            break;
          }
          A = A.sibling;
        }
        if (!x) {
          for (A = h.child; A; ) {
            if (A === i) {
              x = !0, i = h, o = f;
              break;
            }
            if (A === o) {
              x = !0, o = h, i = f;
              break;
            }
            A = A.sibling;
          }
          if (!x) throw Error(l(189));
        }
      }
      if (i.alternate !== o) throw Error(l(190));
    }
    if (i.tag !== 3) throw Error(l(188));
    return i.stateNode.current === i ? e : a;
  }
  function y(e) {
    var a = e.tag;
    if (a === 5 || a === 26 || a === 27 || a === 6) return e;
    for (e = e.child; e !== null; ) {
      if (a = y(e), a !== null) return a;
      e = e.sibling;
    }
    return null;
  }
  var v = Object.assign, b = Symbol.for("react.element"), T = Symbol.for("react.transitional.element"), S = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), w = Symbol.for("react.strict_mode"), M = Symbol.for("react.profiler"), _ = Symbol.for("react.consumer"), R = Symbol.for("react.context"), D = Symbol.for("react.forward_ref"), L = Symbol.for("react.suspense"), $ = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), z = Symbol.for("react.lazy"), k = Symbol.for("react.activity"), Y = Symbol.for("react.memo_cache_sentinel"), et = Symbol.iterator;
  function nt(e) {
    return e === null || typeof e != "object" ? null : (e = et && e[et] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var J = Symbol.for("react.client.reference");
  function Q(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === J ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case C:
        return "Fragment";
      case M:
        return "Profiler";
      case w:
        return "StrictMode";
      case L:
        return "Suspense";
      case $:
        return "SuspenseList";
      case k:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case S:
          return "Portal";
        case R:
          return e.displayName || "Context";
        case _:
          return (e._context.displayName || "Context") + ".Consumer";
        case D:
          var a = e.render;
          return e = e.displayName, e || (e = a.displayName || a.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case E:
          return a = e.displayName || null, a !== null ? a : Q(e.type) || "Memo";
        case z:
          a = e._payload, e = e._init;
          try {
            return Q(e(a));
          } catch {
          }
      }
    return null;
  }
  var W = Array.isArray, O = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, U = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, X = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, it = [], ot = -1;
  function N(e) {
    return { current: e };
  }
  function q(e) {
    0 > ot || (e.current = it[ot], it[ot] = null, ot--);
  }
  function tt(e, a) {
    ot++, it[ot] = e.current, e.current = a;
  }
  var lt = N(null), F = N(null), rt = N(null), ct = N(null);
  function gt(e, a) {
    switch (tt(rt, a), tt(F, e), tt(lt, null), a.nodeType) {
      case 9:
      case 11:
        e = (e = a.documentElement) && (e = e.namespaceURI) ? lg(e) : 0;
        break;
      default:
        if (e = a.tagName, a = a.namespaceURI)
          a = lg(a), e = og(a, e);
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    q(lt), tt(lt, e);
  }
  function bt() {
    q(lt), q(F), q(rt);
  }
  function Dt(e) {
    e.memoizedState !== null && tt(ct, e);
    var a = lt.current, i = og(a, e.type);
    a !== i && (tt(F, e), tt(lt, i));
  }
  function Ot(e) {
    F.current === e && (q(lt), q(F)), ct.current === e && (q(ct), xl._currentValue = X);
  }
  var zt, Be;
  function ve(e) {
    if (zt === void 0)
      try {
        throw Error();
      } catch (i) {
        var a = i.stack.trim().match(/\n( *(at )?)/);
        zt = a && a[1] || "", Be = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + zt + e + Be;
  }
  var Re = !1;
  function Se(e, a) {
    if (!e || Re) return "";
    Re = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var o = {
        DetermineComponentFrameRoot: function() {
          try {
            if (a) {
              var st = function() {
                throw Error();
              };
              if (Object.defineProperty(st.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(st, []);
                } catch (Z) {
                  var K = Z;
                }
                Reflect.construct(e, [], st);
              } else {
                try {
                  st.call();
                } catch (Z) {
                  K = Z;
                }
                e.call(st.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (Z) {
                K = Z;
              }
              (st = e()) && typeof st.catch == "function" && st.catch(function() {
              });
            }
          } catch (Z) {
            if (Z && K && typeof Z.stack == "string")
              return [Z.stack, K.stack];
          }
          return [null, null];
        }
      };
      o.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var f = Object.getOwnPropertyDescriptor(
        o.DetermineComponentFrameRoot,
        "name"
      );
      f && f.configurable && Object.defineProperty(
        o.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var h = o.DetermineComponentFrameRoot(), x = h[0], A = h[1];
      if (x && A) {
        var B = x.split(`
`), P = A.split(`
`);
        for (f = o = 0; o < B.length && !B[o].includes("DetermineComponentFrameRoot"); )
          o++;
        for (; f < P.length && !P[f].includes(
          "DetermineComponentFrameRoot"
        ); )
          f++;
        if (o === B.length || f === P.length)
          for (o = B.length - 1, f = P.length - 1; 1 <= o && 0 <= f && B[o] !== P[f]; )
            f--;
        for (; 1 <= o && 0 <= f; o--, f--)
          if (B[o] !== P[f]) {
            if (o !== 1 || f !== 1)
              do
                if (o--, f--, 0 > f || B[o] !== P[f]) {
                  var I = `
` + B[o].replace(" at new ", " at ");
                  return e.displayName && I.includes("<anonymous>") && (I = I.replace("<anonymous>", e.displayName)), I;
                }
              while (1 <= o && 0 <= f);
            break;
          }
      }
    } finally {
      Re = !1, Error.prepareStackTrace = i;
    }
    return (i = e ? e.displayName || e.name : "") ? ve(i) : "";
  }
  function Xe(e, a) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return ve(e.type);
      case 16:
        return ve("Lazy");
      case 13:
        return e.child !== a && a !== null ? ve("Suspense Fallback") : ve("Suspense");
      case 19:
        return ve("SuspenseList");
      case 0:
      case 15:
        return Se(e.type, !1);
      case 11:
        return Se(e.type.render, !1);
      case 1:
        return Se(e.type, !0);
      case 31:
        return ve("Activity");
      default:
        return "";
    }
  }
  function ha(e) {
    try {
      var a = "", i = null;
      do
        a += Xe(e, i), i = e, e = e.return;
      while (e);
      return a;
    } catch (o) {
      return `
Error generating stack: ` + o.message + `
` + o.stack;
    }
  }
  var an = Object.prototype.hasOwnProperty, qn = n.unstable_scheduleCallback, ft = n.unstable_cancelCallback, Nt = n.unstable_shouldYield, we = n.unstable_requestPaint, Kt = n.unstable_now, sn = n.unstable_getCurrentPriorityLevel, xn = n.unstable_ImmediatePriority, Ga = n.unstable_UserBlockingPriority, It = n.unstable_NormalPriority, Ce = n.unstable_LowPriority, Yn = n.unstable_IdlePriority, F3 = n.log, J3 = n.unstable_setDisableYieldValue, Ns = null, Ke = null;
  function ma(e) {
    if (typeof F3 == "function" && J3(e), Ke && typeof Ke.setStrictMode == "function")
      try {
        Ke.setStrictMode(Ns, e);
      } catch {
      }
  }
  var Qe = Math.clz32 ? Math.clz32 : tS, W3 = Math.log, I3 = Math.LN2;
  function tS(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (W3(e) / I3 | 0) | 0;
  }
  var oo = 256, ro = 262144, co = 4194304;
  function Pa(e) {
    var a = e & 42;
    if (a !== 0) return a;
    switch (e & -e) {
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
        return e & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
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
        return e;
    }
  }
  function uo(e, a, i) {
    var o = e.pendingLanes;
    if (o === 0) return 0;
    var f = 0, h = e.suspendedLanes, x = e.pingedLanes;
    e = e.warmLanes;
    var A = o & 134217727;
    return A !== 0 ? (o = A & ~h, o !== 0 ? f = Pa(o) : (x &= A, x !== 0 ? f = Pa(x) : i || (i = A & ~e, i !== 0 && (f = Pa(i))))) : (A = o & ~h, A !== 0 ? f = Pa(A) : x !== 0 ? f = Pa(x) : i || (i = o & ~e, i !== 0 && (f = Pa(i)))), f === 0 ? 0 : a !== 0 && a !== f && (a & h) === 0 && (h = f & -f, i = a & -a, h >= i || h === 32 && (i & 4194048) !== 0) ? a : f;
  }
  function Os(e, a) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & a) === 0;
  }
  function eS(e, a) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return a + 250;
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
        return a + 5e3;
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
  function Hm() {
    var e = co;
    return co <<= 1, (co & 62914560) === 0 && (co = 4194304), e;
  }
  function Ac(e) {
    for (var a = [], i = 0; 31 > i; i++) a.push(e);
    return a;
  }
  function Ls(e, a) {
    e.pendingLanes |= a, a !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function nS(e, a, i, o, f, h) {
    var x = e.pendingLanes;
    e.pendingLanes = i, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= i, e.entangledLanes &= i, e.errorRecoveryDisabledLanes &= i, e.shellSuspendCounter = 0;
    var A = e.entanglements, B = e.expirationTimes, P = e.hiddenUpdates;
    for (i = x & ~i; 0 < i; ) {
      var I = 31 - Qe(i), st = 1 << I;
      A[I] = 0, B[I] = -1;
      var K = P[I];
      if (K !== null)
        for (P[I] = null, I = 0; I < K.length; I++) {
          var Z = K[I];
          Z !== null && (Z.lane &= -536870913);
        }
      i &= ~st;
    }
    o !== 0 && qm(e, o, 0), h !== 0 && f === 0 && e.tag !== 0 && (e.suspendedLanes |= h & ~(x & ~a));
  }
  function qm(e, a, i) {
    e.pendingLanes |= a, e.suspendedLanes &= ~a;
    var o = 31 - Qe(a);
    e.entangledLanes |= a, e.entanglements[o] = e.entanglements[o] | 1073741824 | i & 261930;
  }
  function Ym(e, a) {
    var i = e.entangledLanes |= a;
    for (e = e.entanglements; i; ) {
      var o = 31 - Qe(i), f = 1 << o;
      f & a | e[o] & a && (e[o] |= a), i &= ~f;
    }
  }
  function Gm(e, a) {
    var i = a & -a;
    return i = (i & 42) !== 0 ? 1 : Mc(i), (i & (e.suspendedLanes | a)) !== 0 ? 0 : i;
  }
  function Mc(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
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
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function _c(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Pm() {
    var e = U.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Dg(e.type));
  }
  function Xm(e, a) {
    var i = U.p;
    try {
      return U.p = e, a();
    } finally {
      U.p = i;
    }
  }
  var pa = Math.random().toString(36).slice(2), Te = "__reactFiber$" + pa, ze = "__reactProps$" + pa, Ei = "__reactContainer$" + pa, Dc = "__reactEvents$" + pa, aS = "__reactListeners$" + pa, iS = "__reactHandles$" + pa, Km = "__reactResources$" + pa, $s = "__reactMarker$" + pa;
  function Rc(e) {
    delete e[Te], delete e[ze], delete e[Dc], delete e[aS], delete e[iS];
  }
  function Ai(e) {
    var a = e[Te];
    if (a) return a;
    for (var i = e.parentNode; i; ) {
      if (a = i[Ei] || i[Te]) {
        if (i = a.alternate, a.child !== null || i !== null && i.child !== null)
          for (e = mg(e); e !== null; ) {
            if (i = e[Te]) return i;
            e = mg(e);
          }
        return a;
      }
      e = i, i = e.parentNode;
    }
    return null;
  }
  function Mi(e) {
    if (e = e[Te] || e[Ei]) {
      var a = e.tag;
      if (a === 5 || a === 6 || a === 13 || a === 31 || a === 26 || a === 27 || a === 3)
        return e;
    }
    return null;
  }
  function Bs(e) {
    var a = e.tag;
    if (a === 5 || a === 26 || a === 27 || a === 6) return e.stateNode;
    throw Error(l(33));
  }
  function _i(e) {
    var a = e[Km];
    return a || (a = e[Km] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), a;
  }
  function be(e) {
    e[$s] = !0;
  }
  var Qm = /* @__PURE__ */ new Set(), Zm = {};
  function Xa(e, a) {
    Di(e, a), Di(e + "Capture", a);
  }
  function Di(e, a) {
    for (Zm[e] = a, e = 0; e < a.length; e++)
      Qm.add(a[e]);
  }
  var sS = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Fm = {}, Jm = {};
  function lS(e) {
    return an.call(Jm, e) ? !0 : an.call(Fm, e) ? !1 : sS.test(e) ? Jm[e] = !0 : (Fm[e] = !0, !1);
  }
  function fo(e, a, i) {
    if (lS(a))
      if (i === null) e.removeAttribute(a);
      else {
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(a);
            return;
          case "boolean":
            var o = a.toLowerCase().slice(0, 5);
            if (o !== "data-" && o !== "aria-") {
              e.removeAttribute(a);
              return;
            }
        }
        e.setAttribute(a, "" + i);
      }
  }
  function ho(e, a, i) {
    if (i === null) e.removeAttribute(a);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(a);
          return;
      }
      e.setAttribute(a, "" + i);
    }
  }
  function Gn(e, a, i, o) {
    if (o === null) e.removeAttribute(i);
    else {
      switch (typeof o) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(i);
          return;
      }
      e.setAttributeNS(a, i, "" + o);
    }
  }
  function ln(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Wm(e) {
    var a = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (a === "checkbox" || a === "radio");
  }
  function oS(e, a, i) {
    var o = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      a
    );
    if (!e.hasOwnProperty(a) && typeof o < "u" && typeof o.get == "function" && typeof o.set == "function") {
      var f = o.get, h = o.set;
      return Object.defineProperty(e, a, {
        configurable: !0,
        get: function() {
          return f.call(this);
        },
        set: function(x) {
          i = "" + x, h.call(this, x);
        }
      }), Object.defineProperty(e, a, {
        enumerable: o.enumerable
      }), {
        getValue: function() {
          return i;
        },
        setValue: function(x) {
          i = "" + x;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[a];
        }
      };
    }
  }
  function Nc(e) {
    if (!e._valueTracker) {
      var a = Wm(e) ? "checked" : "value";
      e._valueTracker = oS(
        e,
        a,
        "" + e[a]
      );
    }
  }
  function Im(e) {
    if (!e) return !1;
    var a = e._valueTracker;
    if (!a) return !0;
    var i = a.getValue(), o = "";
    return e && (o = Wm(e) ? e.checked ? "true" : "false" : e.value), e = o, e !== i ? (a.setValue(e), !0) : !1;
  }
  function mo(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var rS = /[\n"\\]/g;
  function on(e) {
    return e.replace(
      rS,
      function(a) {
        return "\\" + a.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Oc(e, a, i, o, f, h, x, A) {
    e.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? e.type = x : e.removeAttribute("type"), a != null ? x === "number" ? (a === 0 && e.value === "" || e.value != a) && (e.value = "" + ln(a)) : e.value !== "" + ln(a) && (e.value = "" + ln(a)) : x !== "submit" && x !== "reset" || e.removeAttribute("value"), a != null ? Lc(e, x, ln(a)) : i != null ? Lc(e, x, ln(i)) : o != null && e.removeAttribute("value"), f == null && h != null && (e.defaultChecked = !!h), f != null && (e.checked = f && typeof f != "function" && typeof f != "symbol"), A != null && typeof A != "function" && typeof A != "symbol" && typeof A != "boolean" ? e.name = "" + ln(A) : e.removeAttribute("name");
  }
  function tp(e, a, i, o, f, h, x, A) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (e.type = h), a != null || i != null) {
      if (!(h !== "submit" && h !== "reset" || a != null)) {
        Nc(e);
        return;
      }
      i = i != null ? "" + ln(i) : "", a = a != null ? "" + ln(a) : i, A || a === e.value || (e.value = a), e.defaultValue = a;
    }
    o = o ?? f, o = typeof o != "function" && typeof o != "symbol" && !!o, e.checked = A ? e.checked : !!o, e.defaultChecked = !!o, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (e.name = x), Nc(e);
  }
  function Lc(e, a, i) {
    a === "number" && mo(e.ownerDocument) === e || e.defaultValue === "" + i || (e.defaultValue = "" + i);
  }
  function Ri(e, a, i, o) {
    if (e = e.options, a) {
      a = {};
      for (var f = 0; f < i.length; f++)
        a["$" + i[f]] = !0;
      for (i = 0; i < e.length; i++)
        f = a.hasOwnProperty("$" + e[i].value), e[i].selected !== f && (e[i].selected = f), f && o && (e[i].defaultSelected = !0);
    } else {
      for (i = "" + ln(i), a = null, f = 0; f < e.length; f++) {
        if (e[f].value === i) {
          e[f].selected = !0, o && (e[f].defaultSelected = !0);
          return;
        }
        a !== null || e[f].disabled || (a = e[f]);
      }
      a !== null && (a.selected = !0);
    }
  }
  function ep(e, a, i) {
    if (a != null && (a = "" + ln(a), a !== e.value && (e.value = a), i == null)) {
      e.defaultValue !== a && (e.defaultValue = a);
      return;
    }
    e.defaultValue = i != null ? "" + ln(i) : "";
  }
  function np(e, a, i, o) {
    if (a == null) {
      if (o != null) {
        if (i != null) throw Error(l(92));
        if (W(o)) {
          if (1 < o.length) throw Error(l(93));
          o = o[0];
        }
        i = o;
      }
      i == null && (i = ""), a = i;
    }
    i = ln(a), e.defaultValue = i, o = e.textContent, o === i && o !== "" && o !== null && (e.value = o), Nc(e);
  }
  function Ni(e, a) {
    if (a) {
      var i = e.firstChild;
      if (i && i === e.lastChild && i.nodeType === 3) {
        i.nodeValue = a;
        return;
      }
    }
    e.textContent = a;
  }
  var cS = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function ap(e, a, i) {
    var o = a.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? o ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "" : o ? e.setProperty(a, i) : typeof i != "number" || i === 0 || cS.has(a) ? a === "float" ? e.cssFloat = i : e[a] = ("" + i).trim() : e[a] = i + "px";
  }
  function ip(e, a, i) {
    if (a != null && typeof a != "object")
      throw Error(l(62));
    if (e = e.style, i != null) {
      for (var o in i)
        !i.hasOwnProperty(o) || a != null && a.hasOwnProperty(o) || (o.indexOf("--") === 0 ? e.setProperty(o, "") : o === "float" ? e.cssFloat = "" : e[o] = "");
      for (var f in a)
        o = a[f], a.hasOwnProperty(f) && i[f] !== o && ap(e, f, o);
    } else
      for (var h in a)
        a.hasOwnProperty(h) && ap(e, h, a[h]);
  }
  function $c(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
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
  var uS = /* @__PURE__ */ new Map([
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
  ]), fS = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function po(e) {
    return fS.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Pn() {
  }
  var Bc = null;
  function zc(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Oi = null, Li = null;
  function sp(e) {
    var a = Mi(e);
    if (a && (e = a.stateNode)) {
      var i = e[ze] || null;
      t: switch (e = a.stateNode, a.type) {
        case "input":
          if (Oc(
            e,
            i.value,
            i.defaultValue,
            i.defaultValue,
            i.checked,
            i.defaultChecked,
            i.type,
            i.name
          ), a = i.name, i.type === "radio" && a != null) {
            for (i = e; i.parentNode; ) i = i.parentNode;
            for (i = i.querySelectorAll(
              'input[name="' + on(
                "" + a
              ) + '"][type="radio"]'
            ), a = 0; a < i.length; a++) {
              var o = i[a];
              if (o !== e && o.form === e.form) {
                var f = o[ze] || null;
                if (!f) throw Error(l(90));
                Oc(
                  o,
                  f.value,
                  f.defaultValue,
                  f.defaultValue,
                  f.checked,
                  f.defaultChecked,
                  f.type,
                  f.name
                );
              }
            }
            for (a = 0; a < i.length; a++)
              o = i[a], o.form === e.form && Im(o);
          }
          break t;
        case "textarea":
          ep(e, i.value, i.defaultValue);
          break t;
        case "select":
          a = i.value, a != null && Ri(e, !!i.multiple, a, !1);
      }
    }
  }
  var Vc = !1;
  function lp(e, a, i) {
    if (Vc) return e(a, i);
    Vc = !0;
    try {
      var o = e(a);
      return o;
    } finally {
      if (Vc = !1, (Oi !== null || Li !== null) && (nr(), Oi && (a = Oi, e = Li, Li = Oi = null, sp(a), e)))
        for (a = 0; a < e.length; a++) sp(e[a]);
    }
  }
  function zs(e, a) {
    var i = e.stateNode;
    if (i === null) return null;
    var o = i[ze] || null;
    if (o === null) return null;
    i = o[a];
    t: switch (a) {
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
        (o = !o.disabled) || (e = e.type, o = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !o;
        break t;
      default:
        e = !1;
    }
    if (e) return null;
    if (i && typeof i != "function")
      throw Error(
        l(231, a, typeof i)
      );
    return i;
  }
  var Xn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), kc = !1;
  if (Xn)
    try {
      var Vs = {};
      Object.defineProperty(Vs, "passive", {
        get: function() {
          kc = !0;
        }
      }), window.addEventListener("test", Vs, Vs), window.removeEventListener("test", Vs, Vs);
    } catch {
      kc = !1;
    }
  var ga = null, Uc = null, go = null;
  function op() {
    if (go) return go;
    var e, a = Uc, i = a.length, o, f = "value" in ga ? ga.value : ga.textContent, h = f.length;
    for (e = 0; e < i && a[e] === f[e]; e++) ;
    var x = i - e;
    for (o = 1; o <= x && a[i - o] === f[h - o]; o++) ;
    return go = f.slice(e, 1 < o ? 1 - o : void 0);
  }
  function yo(e) {
    var a = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && a === 13 && (e = 13)) : e = a, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function vo() {
    return !0;
  }
  function rp() {
    return !1;
  }
  function Ve(e) {
    function a(i, o, f, h, x) {
      this._reactName = i, this._targetInst = f, this.type = o, this.nativeEvent = h, this.target = x, this.currentTarget = null;
      for (var A in e)
        e.hasOwnProperty(A) && (i = e[A], this[A] = i ? i(h) : h[A]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? vo : rp, this.isPropagationStopped = rp, this;
    }
    return v(a.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = vo);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = vo);
      },
      persist: function() {
      },
      isPersistent: vo
    }), a;
  }
  var Ka = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, bo = Ve(Ka), ks = v({}, Ka, { view: 0, detail: 0 }), dS = Ve(ks), Hc, qc, Us, xo = v({}, ks, {
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
    getModifierState: Gc,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Us && (Us && e.type === "mousemove" ? (Hc = e.screenX - Us.screenX, qc = e.screenY - Us.screenY) : qc = Hc = 0, Us = e), Hc);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : qc;
    }
  }), cp = Ve(xo), hS = v({}, xo, { dataTransfer: 0 }), mS = Ve(hS), pS = v({}, ks, { relatedTarget: 0 }), Yc = Ve(pS), gS = v({}, Ka, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), yS = Ve(gS), vS = v({}, Ka, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), bS = Ve(vS), xS = v({}, Ka, { data: 0 }), up = Ve(xS), SS = {
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
  }, wS = {
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
  }, CS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function TS(e) {
    var a = this.nativeEvent;
    return a.getModifierState ? a.getModifierState(e) : (e = CS[e]) ? !!a[e] : !1;
  }
  function Gc() {
    return TS;
  }
  var jS = v({}, ks, {
    key: function(e) {
      if (e.key) {
        var a = SS[e.key] || e.key;
        if (a !== "Unidentified") return a;
      }
      return e.type === "keypress" ? (e = yo(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? wS[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Gc,
    charCode: function(e) {
      return e.type === "keypress" ? yo(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? yo(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), ES = Ve(jS), AS = v({}, xo, {
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
  }), fp = Ve(AS), MS = v({}, ks, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Gc
  }), _S = Ve(MS), DS = v({}, Ka, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), RS = Ve(DS), NS = v({}, xo, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), OS = Ve(NS), LS = v({}, Ka, {
    newState: 0,
    oldState: 0
  }), $S = Ve(LS), BS = [9, 13, 27, 32], Pc = Xn && "CompositionEvent" in window, Hs = null;
  Xn && "documentMode" in document && (Hs = document.documentMode);
  var zS = Xn && "TextEvent" in window && !Hs, dp = Xn && (!Pc || Hs && 8 < Hs && 11 >= Hs), hp = " ", mp = !1;
  function pp(e, a) {
    switch (e) {
      case "keyup":
        return BS.indexOf(a.keyCode) !== -1;
      case "keydown":
        return a.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function gp(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var $i = !1;
  function VS(e, a) {
    switch (e) {
      case "compositionend":
        return gp(a);
      case "keypress":
        return a.which !== 32 ? null : (mp = !0, hp);
      case "textInput":
        return e = a.data, e === hp && mp ? null : e;
      default:
        return null;
    }
  }
  function kS(e, a) {
    if ($i)
      return e === "compositionend" || !Pc && pp(e, a) ? (e = op(), go = Uc = ga = null, $i = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(a.ctrlKey || a.altKey || a.metaKey) || a.ctrlKey && a.altKey) {
          if (a.char && 1 < a.char.length)
            return a.char;
          if (a.which) return String.fromCharCode(a.which);
        }
        return null;
      case "compositionend":
        return dp && a.locale !== "ko" ? null : a.data;
      default:
        return null;
    }
  }
  var US = {
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
  function yp(e) {
    var a = e && e.nodeName && e.nodeName.toLowerCase();
    return a === "input" ? !!US[e.type] : a === "textarea";
  }
  function vp(e, a, i, o) {
    Oi ? Li ? Li.push(o) : Li = [o] : Oi = o, a = cr(a, "onChange"), 0 < a.length && (i = new bo(
      "onChange",
      "change",
      null,
      i,
      o
    ), e.push({ event: i, listeners: a }));
  }
  var qs = null, Ys = null;
  function HS(e) {
    tg(e, 0);
  }
  function So(e) {
    var a = Bs(e);
    if (Im(a)) return e;
  }
  function bp(e, a) {
    if (e === "change") return a;
  }
  var xp = !1;
  if (Xn) {
    var Xc;
    if (Xn) {
      var Kc = "oninput" in document;
      if (!Kc) {
        var Sp = document.createElement("div");
        Sp.setAttribute("oninput", "return;"), Kc = typeof Sp.oninput == "function";
      }
      Xc = Kc;
    } else Xc = !1;
    xp = Xc && (!document.documentMode || 9 < document.documentMode);
  }
  function wp() {
    qs && (qs.detachEvent("onpropertychange", Cp), Ys = qs = null);
  }
  function Cp(e) {
    if (e.propertyName === "value" && So(Ys)) {
      var a = [];
      vp(
        a,
        Ys,
        e,
        zc(e)
      ), lp(HS, a);
    }
  }
  function qS(e, a, i) {
    e === "focusin" ? (wp(), qs = a, Ys = i, qs.attachEvent("onpropertychange", Cp)) : e === "focusout" && wp();
  }
  function YS(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return So(Ys);
  }
  function GS(e, a) {
    if (e === "click") return So(a);
  }
  function PS(e, a) {
    if (e === "input" || e === "change")
      return So(a);
  }
  function XS(e, a) {
    return e === a && (e !== 0 || 1 / e === 1 / a) || e !== e && a !== a;
  }
  var Ze = typeof Object.is == "function" ? Object.is : XS;
  function Gs(e, a) {
    if (Ze(e, a)) return !0;
    if (typeof e != "object" || e === null || typeof a != "object" || a === null)
      return !1;
    var i = Object.keys(e), o = Object.keys(a);
    if (i.length !== o.length) return !1;
    for (o = 0; o < i.length; o++) {
      var f = i[o];
      if (!an.call(a, f) || !Ze(e[f], a[f]))
        return !1;
    }
    return !0;
  }
  function Tp(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function jp(e, a) {
    var i = Tp(e);
    e = 0;
    for (var o; i; ) {
      if (i.nodeType === 3) {
        if (o = e + i.textContent.length, e <= a && o >= a)
          return { node: i, offset: a - e };
        e = o;
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
      i = Tp(i);
    }
  }
  function Ep(e, a) {
    return e && a ? e === a ? !0 : e && e.nodeType === 3 ? !1 : a && a.nodeType === 3 ? Ep(e, a.parentNode) : "contains" in e ? e.contains(a) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(a) & 16) : !1 : !1;
  }
  function Ap(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var a = mo(e.document); a instanceof e.HTMLIFrameElement; ) {
      try {
        var i = typeof a.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) e = a.contentWindow;
      else break;
      a = mo(e.document);
    }
    return a;
  }
  function Qc(e) {
    var a = e && e.nodeName && e.nodeName.toLowerCase();
    return a && (a === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || a === "textarea" || e.contentEditable === "true");
  }
  var KS = Xn && "documentMode" in document && 11 >= document.documentMode, Bi = null, Zc = null, Ps = null, Fc = !1;
  function Mp(e, a, i) {
    var o = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Fc || Bi == null || Bi !== mo(o) || (o = Bi, "selectionStart" in o && Qc(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), Ps && Gs(Ps, o) || (Ps = o, o = cr(Zc, "onSelect"), 0 < o.length && (a = new bo(
      "onSelect",
      "select",
      null,
      a,
      i
    ), e.push({ event: a, listeners: o }), a.target = Bi)));
  }
  function Qa(e, a) {
    var i = {};
    return i[e.toLowerCase()] = a.toLowerCase(), i["Webkit" + e] = "webkit" + a, i["Moz" + e] = "moz" + a, i;
  }
  var zi = {
    animationend: Qa("Animation", "AnimationEnd"),
    animationiteration: Qa("Animation", "AnimationIteration"),
    animationstart: Qa("Animation", "AnimationStart"),
    transitionrun: Qa("Transition", "TransitionRun"),
    transitionstart: Qa("Transition", "TransitionStart"),
    transitioncancel: Qa("Transition", "TransitionCancel"),
    transitionend: Qa("Transition", "TransitionEnd")
  }, Jc = {}, _p = {};
  Xn && (_p = document.createElement("div").style, "AnimationEvent" in window || (delete zi.animationend.animation, delete zi.animationiteration.animation, delete zi.animationstart.animation), "TransitionEvent" in window || delete zi.transitionend.transition);
  function Za(e) {
    if (Jc[e]) return Jc[e];
    if (!zi[e]) return e;
    var a = zi[e], i;
    for (i in a)
      if (a.hasOwnProperty(i) && i in _p)
        return Jc[e] = a[i];
    return e;
  }
  var Dp = Za("animationend"), Rp = Za("animationiteration"), Np = Za("animationstart"), QS = Za("transitionrun"), ZS = Za("transitionstart"), FS = Za("transitioncancel"), Op = Za("transitionend"), Lp = /* @__PURE__ */ new Map(), Wc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Wc.push("scrollEnd");
  function Sn(e, a) {
    Lp.set(e, a), Xa(a, [e]);
  }
  var wo = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var a = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(a)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, rn = [], Vi = 0, Ic = 0;
  function Co() {
    for (var e = Vi, a = Ic = Vi = 0; a < e; ) {
      var i = rn[a];
      rn[a++] = null;
      var o = rn[a];
      rn[a++] = null;
      var f = rn[a];
      rn[a++] = null;
      var h = rn[a];
      if (rn[a++] = null, o !== null && f !== null) {
        var x = o.pending;
        x === null ? f.next = f : (f.next = x.next, x.next = f), o.pending = f;
      }
      h !== 0 && $p(i, f, h);
    }
  }
  function To(e, a, i, o) {
    rn[Vi++] = e, rn[Vi++] = a, rn[Vi++] = i, rn[Vi++] = o, Ic |= o, e.lanes |= o, e = e.alternate, e !== null && (e.lanes |= o);
  }
  function tu(e, a, i, o) {
    return To(e, a, i, o), jo(e);
  }
  function Fa(e, a) {
    return To(e, null, null, a), jo(e);
  }
  function $p(e, a, i) {
    e.lanes |= i;
    var o = e.alternate;
    o !== null && (o.lanes |= i);
    for (var f = !1, h = e.return; h !== null; )
      h.childLanes |= i, o = h.alternate, o !== null && (o.childLanes |= i), h.tag === 22 && (e = h.stateNode, e === null || e._visibility & 1 || (f = !0)), e = h, h = h.return;
    return e.tag === 3 ? (h = e.stateNode, f && a !== null && (f = 31 - Qe(i), e = h.hiddenUpdates, o = e[f], o === null ? e[f] = [a] : o.push(a), a.lane = i | 536870912), h) : null;
  }
  function jo(e) {
    if (50 < hl)
      throw hl = 0, uf = null, Error(l(185));
    for (var a = e.return; a !== null; )
      e = a, a = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var ki = {};
  function JS(e, a, i, o) {
    this.tag = e, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = a, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Fe(e, a, i, o) {
    return new JS(e, a, i, o);
  }
  function eu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Kn(e, a) {
    var i = e.alternate;
    return i === null ? (i = Fe(
      e.tag,
      a,
      e.key,
      e.mode
    ), i.elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i.alternate = e, e.alternate = i) : (i.pendingProps = a, i.type = e.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = e.flags & 65011712, i.childLanes = e.childLanes, i.lanes = e.lanes, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue, a = e.dependencies, i.dependencies = a === null ? null : { lanes: a.lanes, firstContext: a.firstContext }, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i.refCleanup = e.refCleanup, i;
  }
  function Bp(e, a) {
    e.flags &= 65011714;
    var i = e.alternate;
    return i === null ? (e.childLanes = 0, e.lanes = a, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type, a = i.dependencies, e.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }), e;
  }
  function Eo(e, a, i, o, f, h) {
    var x = 0;
    if (o = e, typeof e == "function") eu(e) && (x = 1);
    else if (typeof e == "string")
      x = n4(
        e,
        i,
        lt.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      t: switch (e) {
        case k:
          return e = Fe(31, i, a, f), e.elementType = k, e.lanes = h, e;
        case C:
          return Ja(i.children, f, h, a);
        case w:
          x = 8, f |= 24;
          break;
        case M:
          return e = Fe(12, i, a, f | 2), e.elementType = M, e.lanes = h, e;
        case L:
          return e = Fe(13, i, a, f), e.elementType = L, e.lanes = h, e;
        case $:
          return e = Fe(19, i, a, f), e.elementType = $, e.lanes = h, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case R:
                x = 10;
                break t;
              case _:
                x = 9;
                break t;
              case D:
                x = 11;
                break t;
              case E:
                x = 14;
                break t;
              case z:
                x = 16, o = null;
                break t;
            }
          x = 29, i = Error(
            l(130, e === null ? "null" : typeof e, "")
          ), o = null;
      }
    return a = Fe(x, i, a, f), a.elementType = e, a.type = o, a.lanes = h, a;
  }
  function Ja(e, a, i, o) {
    return e = Fe(7, e, o, a), e.lanes = i, e;
  }
  function nu(e, a, i) {
    return e = Fe(6, e, null, a), e.lanes = i, e;
  }
  function zp(e) {
    var a = Fe(18, null, null, 0);
    return a.stateNode = e, a;
  }
  function au(e, a, i) {
    return a = Fe(
      4,
      e.children !== null ? e.children : [],
      e.key,
      a
    ), a.lanes = i, a.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, a;
  }
  var Vp = /* @__PURE__ */ new WeakMap();
  function cn(e, a) {
    if (typeof e == "object" && e !== null) {
      var i = Vp.get(e);
      return i !== void 0 ? i : (a = {
        value: e,
        source: a,
        stack: ha(a)
      }, Vp.set(e, a), a);
    }
    return {
      value: e,
      source: a,
      stack: ha(a)
    };
  }
  var Ui = [], Hi = 0, Ao = null, Xs = 0, un = [], fn = 0, ya = null, Nn = 1, On = "";
  function Qn(e, a) {
    Ui[Hi++] = Xs, Ui[Hi++] = Ao, Ao = e, Xs = a;
  }
  function kp(e, a, i) {
    un[fn++] = Nn, un[fn++] = On, un[fn++] = ya, ya = e;
    var o = Nn;
    e = On;
    var f = 32 - Qe(o) - 1;
    o &= ~(1 << f), i += 1;
    var h = 32 - Qe(a) + f;
    if (30 < h) {
      var x = f - f % 5;
      h = (o & (1 << x) - 1).toString(32), o >>= x, f -= x, Nn = 1 << 32 - Qe(a) + f | i << f | o, On = h + e;
    } else
      Nn = 1 << h | i << f | o, On = e;
  }
  function iu(e) {
    e.return !== null && (Qn(e, 1), kp(e, 1, 0));
  }
  function su(e) {
    for (; e === Ao; )
      Ao = Ui[--Hi], Ui[Hi] = null, Xs = Ui[--Hi], Ui[Hi] = null;
    for (; e === ya; )
      ya = un[--fn], un[fn] = null, On = un[--fn], un[fn] = null, Nn = un[--fn], un[fn] = null;
  }
  function Up(e, a) {
    un[fn++] = Nn, un[fn++] = On, un[fn++] = ya, Nn = a.id, On = a.overflow, ya = e;
  }
  var je = null, Jt = null, Rt = !1, va = null, dn = !1, lu = Error(l(519));
  function ba(e) {
    var a = Error(
      l(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Ks(cn(a, e)), lu;
  }
  function Hp(e) {
    var a = e.stateNode, i = e.type, o = e.memoizedProps;
    switch (a[Te] = e, a[ze] = o, i) {
      case "dialog":
        Et("cancel", a), Et("close", a);
        break;
      case "iframe":
      case "object":
      case "embed":
        Et("load", a);
        break;
      case "video":
      case "audio":
        for (i = 0; i < pl.length; i++)
          Et(pl[i], a);
        break;
      case "source":
        Et("error", a);
        break;
      case "img":
      case "image":
      case "link":
        Et("error", a), Et("load", a);
        break;
      case "details":
        Et("toggle", a);
        break;
      case "input":
        Et("invalid", a), tp(
          a,
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
        Et("invalid", a);
        break;
      case "textarea":
        Et("invalid", a), np(a, o.value, o.defaultValue, o.children);
    }
    i = o.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || a.textContent === "" + i || o.suppressHydrationWarning === !0 || ig(a.textContent, i) ? (o.popover != null && (Et("beforetoggle", a), Et("toggle", a)), o.onScroll != null && Et("scroll", a), o.onScrollEnd != null && Et("scrollend", a), o.onClick != null && (a.onclick = Pn), a = !0) : a = !1, a || ba(e, !0);
  }
  function qp(e) {
    for (je = e.return; je; )
      switch (je.tag) {
        case 5:
        case 31:
        case 13:
          dn = !1;
          return;
        case 27:
        case 3:
          dn = !0;
          return;
        default:
          je = je.return;
      }
  }
  function qi(e) {
    if (e !== je) return !1;
    if (!Rt) return qp(e), Rt = !0, !1;
    var a = e.tag, i;
    if ((i = a !== 3 && a !== 27) && ((i = a === 5) && (i = e.type, i = !(i !== "form" && i !== "button") || jf(e.type, e.memoizedProps)), i = !i), i && Jt && ba(e), qp(e), a === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      Jt = hg(e);
    } else if (a === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      Jt = hg(e);
    } else
      a === 27 ? (a = Jt, Oa(e.type) ? (e = Df, Df = null, Jt = e) : Jt = a) : Jt = je ? mn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Wa() {
    Jt = je = null, Rt = !1;
  }
  function ou() {
    var e = va;
    return e !== null && (qe === null ? qe = e : qe.push.apply(
      qe,
      e
    ), va = null), e;
  }
  function Ks(e) {
    va === null ? va = [e] : va.push(e);
  }
  var ru = N(null), Ia = null, Zn = null;
  function xa(e, a, i) {
    tt(ru, a._currentValue), a._currentValue = i;
  }
  function Fn(e) {
    e._currentValue = ru.current, q(ru);
  }
  function cu(e, a, i) {
    for (; e !== null; ) {
      var o = e.alternate;
      if ((e.childLanes & a) !== a ? (e.childLanes |= a, o !== null && (o.childLanes |= a)) : o !== null && (o.childLanes & a) !== a && (o.childLanes |= a), e === i) break;
      e = e.return;
    }
  }
  function uu(e, a, i, o) {
    var f = e.child;
    for (f !== null && (f.return = e); f !== null; ) {
      var h = f.dependencies;
      if (h !== null) {
        var x = f.child;
        h = h.firstContext;
        t: for (; h !== null; ) {
          var A = h;
          h = f;
          for (var B = 0; B < a.length; B++)
            if (A.context === a[B]) {
              h.lanes |= i, A = h.alternate, A !== null && (A.lanes |= i), cu(
                h.return,
                i,
                e
              ), o || (x = null);
              break t;
            }
          h = A.next;
        }
      } else if (f.tag === 18) {
        if (x = f.return, x === null) throw Error(l(341));
        x.lanes |= i, h = x.alternate, h !== null && (h.lanes |= i), cu(x, i, e), x = null;
      } else x = f.child;
      if (x !== null) x.return = f;
      else
        for (x = f; x !== null; ) {
          if (x === e) {
            x = null;
            break;
          }
          if (f = x.sibling, f !== null) {
            f.return = x.return, x = f;
            break;
          }
          x = x.return;
        }
      f = x;
    }
  }
  function Yi(e, a, i, o) {
    e = null;
    for (var f = a, h = !1; f !== null; ) {
      if (!h) {
        if ((f.flags & 524288) !== 0) h = !0;
        else if ((f.flags & 262144) !== 0) break;
      }
      if (f.tag === 10) {
        var x = f.alternate;
        if (x === null) throw Error(l(387));
        if (x = x.memoizedProps, x !== null) {
          var A = f.type;
          Ze(f.pendingProps.value, x.value) || (e !== null ? e.push(A) : e = [A]);
        }
      } else if (f === ct.current) {
        if (x = f.alternate, x === null) throw Error(l(387));
        x.memoizedState.memoizedState !== f.memoizedState.memoizedState && (e !== null ? e.push(xl) : e = [xl]);
      }
      f = f.return;
    }
    e !== null && uu(
      a,
      e,
      i,
      o
    ), a.flags |= 262144;
  }
  function Mo(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Ze(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function ti(e) {
    Ia = e, Zn = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Ee(e) {
    return Yp(Ia, e);
  }
  function _o(e, a) {
    return Ia === null && ti(e), Yp(e, a);
  }
  function Yp(e, a) {
    var i = a._currentValue;
    if (a = { context: a, memoizedValue: i, next: null }, Zn === null) {
      if (e === null) throw Error(l(308));
      Zn = a, e.dependencies = { lanes: 0, firstContext: a }, e.flags |= 524288;
    } else Zn = Zn.next = a;
    return i;
  }
  var WS = typeof AbortController < "u" ? AbortController : function() {
    var e = [], a = this.signal = {
      aborted: !1,
      addEventListener: function(i, o) {
        e.push(o);
      }
    };
    this.abort = function() {
      a.aborted = !0, e.forEach(function(i) {
        return i();
      });
    };
  }, IS = n.unstable_scheduleCallback, t5 = n.unstable_NormalPriority, re = {
    $$typeof: R,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function fu() {
    return {
      controller: new WS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Qs(e) {
    e.refCount--, e.refCount === 0 && IS(t5, function() {
      e.controller.abort();
    });
  }
  var Zs = null, du = 0, Gi = 0, Pi = null;
  function e5(e, a) {
    if (Zs === null) {
      var i = Zs = [];
      du = 0, Gi = gf(), Pi = {
        status: "pending",
        value: void 0,
        then: function(o) {
          i.push(o);
        }
      };
    }
    return du++, a.then(Gp, Gp), a;
  }
  function Gp() {
    if (--du === 0 && Zs !== null) {
      Pi !== null && (Pi.status = "fulfilled");
      var e = Zs;
      Zs = null, Gi = 0, Pi = null;
      for (var a = 0; a < e.length; a++) (0, e[a])();
    }
  }
  function n5(e, a) {
    var i = [], o = {
      status: "pending",
      value: null,
      reason: null,
      then: function(f) {
        i.push(f);
      }
    };
    return e.then(
      function() {
        o.status = "fulfilled", o.value = a;
        for (var f = 0; f < i.length; f++) (0, i[f])(a);
      },
      function(f) {
        for (o.status = "rejected", o.reason = f, f = 0; f < i.length; f++)
          (0, i[f])(void 0);
      }
    ), o;
  }
  var Pp = O.S;
  O.S = function(e, a) {
    M0 = Kt(), typeof a == "object" && a !== null && typeof a.then == "function" && e5(e, a), Pp !== null && Pp(e, a);
  };
  var ei = N(null);
  function hu() {
    var e = ei.current;
    return e !== null ? e : Qt.pooledCache;
  }
  function Do(e, a) {
    a === null ? tt(ei, ei.current) : tt(ei, a.pool);
  }
  function Xp() {
    var e = hu();
    return e === null ? null : { parent: re._currentValue, pool: e };
  }
  var Xi = Error(l(460)), mu = Error(l(474)), Ro = Error(l(542)), No = { then: function() {
  } };
  function Kp(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function Qp(e, a, i) {
    switch (i = e[i], i === void 0 ? e.push(a) : i !== a && (a.then(Pn, Pn), a = i), a.status) {
      case "fulfilled":
        return a.value;
      case "rejected":
        throw e = a.reason, Fp(e), e;
      default:
        if (typeof a.status == "string") a.then(Pn, Pn);
        else {
          if (e = Qt, e !== null && 100 < e.shellSuspendCounter)
            throw Error(l(482));
          e = a, e.status = "pending", e.then(
            function(o) {
              if (a.status === "pending") {
                var f = a;
                f.status = "fulfilled", f.value = o;
              }
            },
            function(o) {
              if (a.status === "pending") {
                var f = a;
                f.status = "rejected", f.reason = o;
              }
            }
          );
        }
        switch (a.status) {
          case "fulfilled":
            return a.value;
          case "rejected":
            throw e = a.reason, Fp(e), e;
        }
        throw ai = a, Xi;
    }
  }
  function ni(e) {
    try {
      var a = e._init;
      return a(e._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (ai = i, Xi) : i;
    }
  }
  var ai = null;
  function Zp() {
    if (ai === null) throw Error(l(459));
    var e = ai;
    return ai = null, e;
  }
  function Fp(e) {
    if (e === Xi || e === Ro)
      throw Error(l(483));
  }
  var Ki = null, Fs = 0;
  function Oo(e) {
    var a = Fs;
    return Fs += 1, Ki === null && (Ki = []), Qp(Ki, e, a);
  }
  function Js(e, a) {
    a = a.props.ref, e.ref = a !== void 0 ? a : null;
  }
  function Lo(e, a) {
    throw a.$$typeof === b ? Error(l(525)) : (e = Object.prototype.toString.call(a), Error(
      l(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : e
      )
    ));
  }
  function Jp(e) {
    function a(H, V) {
      if (e) {
        var G = H.deletions;
        G === null ? (H.deletions = [V], H.flags |= 16) : G.push(V);
      }
    }
    function i(H, V) {
      if (!e) return null;
      for (; V !== null; )
        a(H, V), V = V.sibling;
      return null;
    }
    function o(H) {
      for (var V = /* @__PURE__ */ new Map(); H !== null; )
        H.key !== null ? V.set(H.key, H) : V.set(H.index, H), H = H.sibling;
      return V;
    }
    function f(H, V) {
      return H = Kn(H, V), H.index = 0, H.sibling = null, H;
    }
    function h(H, V, G) {
      return H.index = G, e ? (G = H.alternate, G !== null ? (G = G.index, G < V ? (H.flags |= 67108866, V) : G) : (H.flags |= 67108866, V)) : (H.flags |= 1048576, V);
    }
    function x(H) {
      return e && H.alternate === null && (H.flags |= 67108866), H;
    }
    function A(H, V, G, at) {
      return V === null || V.tag !== 6 ? (V = nu(G, H.mode, at), V.return = H, V) : (V = f(V, G), V.return = H, V);
    }
    function B(H, V, G, at) {
      var yt = G.type;
      return yt === C ? I(
        H,
        V,
        G.props.children,
        at,
        G.key
      ) : V !== null && (V.elementType === yt || typeof yt == "object" && yt !== null && yt.$$typeof === z && ni(yt) === V.type) ? (V = f(V, G.props), Js(V, G), V.return = H, V) : (V = Eo(
        G.type,
        G.key,
        G.props,
        null,
        H.mode,
        at
      ), Js(V, G), V.return = H, V);
    }
    function P(H, V, G, at) {
      return V === null || V.tag !== 4 || V.stateNode.containerInfo !== G.containerInfo || V.stateNode.implementation !== G.implementation ? (V = au(G, H.mode, at), V.return = H, V) : (V = f(V, G.children || []), V.return = H, V);
    }
    function I(H, V, G, at, yt) {
      return V === null || V.tag !== 7 ? (V = Ja(
        G,
        H.mode,
        at,
        yt
      ), V.return = H, V) : (V = f(V, G), V.return = H, V);
    }
    function st(H, V, G) {
      if (typeof V == "string" && V !== "" || typeof V == "number" || typeof V == "bigint")
        return V = nu(
          "" + V,
          H.mode,
          G
        ), V.return = H, V;
      if (typeof V == "object" && V !== null) {
        switch (V.$$typeof) {
          case T:
            return G = Eo(
              V.type,
              V.key,
              V.props,
              null,
              H.mode,
              G
            ), Js(G, V), G.return = H, G;
          case S:
            return V = au(
              V,
              H.mode,
              G
            ), V.return = H, V;
          case z:
            return V = ni(V), st(H, V, G);
        }
        if (W(V) || nt(V))
          return V = Ja(
            V,
            H.mode,
            G,
            null
          ), V.return = H, V;
        if (typeof V.then == "function")
          return st(H, Oo(V), G);
        if (V.$$typeof === R)
          return st(
            H,
            _o(H, V),
            G
          );
        Lo(H, V);
      }
      return null;
    }
    function K(H, V, G, at) {
      var yt = V !== null ? V.key : null;
      if (typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint")
        return yt !== null ? null : A(H, V, "" + G, at);
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case T:
            return G.key === yt ? B(H, V, G, at) : null;
          case S:
            return G.key === yt ? P(H, V, G, at) : null;
          case z:
            return G = ni(G), K(H, V, G, at);
        }
        if (W(G) || nt(G))
          return yt !== null ? null : I(H, V, G, at, null);
        if (typeof G.then == "function")
          return K(
            H,
            V,
            Oo(G),
            at
          );
        if (G.$$typeof === R)
          return K(
            H,
            V,
            _o(H, G),
            at
          );
        Lo(H, G);
      }
      return null;
    }
    function Z(H, V, G, at, yt) {
      if (typeof at == "string" && at !== "" || typeof at == "number" || typeof at == "bigint")
        return H = H.get(G) || null, A(V, H, "" + at, yt);
      if (typeof at == "object" && at !== null) {
        switch (at.$$typeof) {
          case T:
            return H = H.get(
              at.key === null ? G : at.key
            ) || null, B(V, H, at, yt);
          case S:
            return H = H.get(
              at.key === null ? G : at.key
            ) || null, P(V, H, at, yt);
          case z:
            return at = ni(at), Z(
              H,
              V,
              G,
              at,
              yt
            );
        }
        if (W(at) || nt(at))
          return H = H.get(G) || null, I(V, H, at, yt, null);
        if (typeof at.then == "function")
          return Z(
            H,
            V,
            G,
            Oo(at),
            yt
          );
        if (at.$$typeof === R)
          return Z(
            H,
            V,
            G,
            _o(V, at),
            yt
          );
        Lo(V, at);
      }
      return null;
    }
    function dt(H, V, G, at) {
      for (var yt = null, Lt = null, mt = V, Ct = V = 0, _t = null; mt !== null && Ct < G.length; Ct++) {
        mt.index > Ct ? (_t = mt, mt = null) : _t = mt.sibling;
        var $t = K(
          H,
          mt,
          G[Ct],
          at
        );
        if ($t === null) {
          mt === null && (mt = _t);
          break;
        }
        e && mt && $t.alternate === null && a(H, mt), V = h($t, V, Ct), Lt === null ? yt = $t : Lt.sibling = $t, Lt = $t, mt = _t;
      }
      if (Ct === G.length)
        return i(H, mt), Rt && Qn(H, Ct), yt;
      if (mt === null) {
        for (; Ct < G.length; Ct++)
          mt = st(H, G[Ct], at), mt !== null && (V = h(
            mt,
            V,
            Ct
          ), Lt === null ? yt = mt : Lt.sibling = mt, Lt = mt);
        return Rt && Qn(H, Ct), yt;
      }
      for (mt = o(mt); Ct < G.length; Ct++)
        _t = Z(
          mt,
          H,
          Ct,
          G[Ct],
          at
        ), _t !== null && (e && _t.alternate !== null && mt.delete(
          _t.key === null ? Ct : _t.key
        ), V = h(
          _t,
          V,
          Ct
        ), Lt === null ? yt = _t : Lt.sibling = _t, Lt = _t);
      return e && mt.forEach(function(Va) {
        return a(H, Va);
      }), Rt && Qn(H, Ct), yt;
    }
    function vt(H, V, G, at) {
      if (G == null) throw Error(l(151));
      for (var yt = null, Lt = null, mt = V, Ct = V = 0, _t = null, $t = G.next(); mt !== null && !$t.done; Ct++, $t = G.next()) {
        mt.index > Ct ? (_t = mt, mt = null) : _t = mt.sibling;
        var Va = K(H, mt, $t.value, at);
        if (Va === null) {
          mt === null && (mt = _t);
          break;
        }
        e && mt && Va.alternate === null && a(H, mt), V = h(Va, V, Ct), Lt === null ? yt = Va : Lt.sibling = Va, Lt = Va, mt = _t;
      }
      if ($t.done)
        return i(H, mt), Rt && Qn(H, Ct), yt;
      if (mt === null) {
        for (; !$t.done; Ct++, $t = G.next())
          $t = st(H, $t.value, at), $t !== null && (V = h($t, V, Ct), Lt === null ? yt = $t : Lt.sibling = $t, Lt = $t);
        return Rt && Qn(H, Ct), yt;
      }
      for (mt = o(mt); !$t.done; Ct++, $t = G.next())
        $t = Z(mt, H, Ct, $t.value, at), $t !== null && (e && $t.alternate !== null && mt.delete($t.key === null ? Ct : $t.key), V = h($t, V, Ct), Lt === null ? yt = $t : Lt.sibling = $t, Lt = $t);
      return e && mt.forEach(function(h4) {
        return a(H, h4);
      }), Rt && Qn(H, Ct), yt;
    }
    function qt(H, V, G, at) {
      if (typeof G == "object" && G !== null && G.type === C && G.key === null && (G = G.props.children), typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case T:
            t: {
              for (var yt = G.key; V !== null; ) {
                if (V.key === yt) {
                  if (yt = G.type, yt === C) {
                    if (V.tag === 7) {
                      i(
                        H,
                        V.sibling
                      ), at = f(
                        V,
                        G.props.children
                      ), at.return = H, H = at;
                      break t;
                    }
                  } else if (V.elementType === yt || typeof yt == "object" && yt !== null && yt.$$typeof === z && ni(yt) === V.type) {
                    i(
                      H,
                      V.sibling
                    ), at = f(V, G.props), Js(at, G), at.return = H, H = at;
                    break t;
                  }
                  i(H, V);
                  break;
                } else a(H, V);
                V = V.sibling;
              }
              G.type === C ? (at = Ja(
                G.props.children,
                H.mode,
                at,
                G.key
              ), at.return = H, H = at) : (at = Eo(
                G.type,
                G.key,
                G.props,
                null,
                H.mode,
                at
              ), Js(at, G), at.return = H, H = at);
            }
            return x(H);
          case S:
            t: {
              for (yt = G.key; V !== null; ) {
                if (V.key === yt)
                  if (V.tag === 4 && V.stateNode.containerInfo === G.containerInfo && V.stateNode.implementation === G.implementation) {
                    i(
                      H,
                      V.sibling
                    ), at = f(V, G.children || []), at.return = H, H = at;
                    break t;
                  } else {
                    i(H, V);
                    break;
                  }
                else a(H, V);
                V = V.sibling;
              }
              at = au(G, H.mode, at), at.return = H, H = at;
            }
            return x(H);
          case z:
            return G = ni(G), qt(
              H,
              V,
              G,
              at
            );
        }
        if (W(G))
          return dt(
            H,
            V,
            G,
            at
          );
        if (nt(G)) {
          if (yt = nt(G), typeof yt != "function") throw Error(l(150));
          return G = yt.call(G), vt(
            H,
            V,
            G,
            at
          );
        }
        if (typeof G.then == "function")
          return qt(
            H,
            V,
            Oo(G),
            at
          );
        if (G.$$typeof === R)
          return qt(
            H,
            V,
            _o(H, G),
            at
          );
        Lo(H, G);
      }
      return typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint" ? (G = "" + G, V !== null && V.tag === 6 ? (i(H, V.sibling), at = f(V, G), at.return = H, H = at) : (i(H, V), at = nu(G, H.mode, at), at.return = H, H = at), x(H)) : i(H, V);
    }
    return function(H, V, G, at) {
      try {
        Fs = 0;
        var yt = qt(
          H,
          V,
          G,
          at
        );
        return Ki = null, yt;
      } catch (mt) {
        if (mt === Xi || mt === Ro) throw mt;
        var Lt = Fe(29, mt, null, H.mode);
        return Lt.lanes = at, Lt.return = H, Lt;
      } finally {
      }
    };
  }
  var ii = Jp(!0), Wp = Jp(!1), Sa = !1;
  function pu(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function gu(e, a) {
    e = e.updateQueue, a.updateQueue === e && (a.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function wa(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Ca(e, a, i) {
    var o = e.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (Bt & 2) !== 0) {
      var f = o.pending;
      return f === null ? a.next = a : (a.next = f.next, f.next = a), o.pending = a, a = jo(e), $p(e, null, i), a;
    }
    return To(e, o, a, i), jo(e);
  }
  function Ws(e, a, i) {
    if (a = a.updateQueue, a !== null && (a = a.shared, (i & 4194048) !== 0)) {
      var o = a.lanes;
      o &= e.pendingLanes, i |= o, a.lanes = i, Ym(e, i);
    }
  }
  function yu(e, a) {
    var i = e.updateQueue, o = e.alternate;
    if (o !== null && (o = o.updateQueue, i === o)) {
      var f = null, h = null;
      if (i = i.firstBaseUpdate, i !== null) {
        do {
          var x = {
            lane: i.lane,
            tag: i.tag,
            payload: i.payload,
            callback: null,
            next: null
          };
          h === null ? f = h = x : h = h.next = x, i = i.next;
        } while (i !== null);
        h === null ? f = h = a : h = h.next = a;
      } else f = h = a;
      i = {
        baseState: o.baseState,
        firstBaseUpdate: f,
        lastBaseUpdate: h,
        shared: o.shared,
        callbacks: o.callbacks
      }, e.updateQueue = i;
      return;
    }
    e = i.lastBaseUpdate, e === null ? i.firstBaseUpdate = a : e.next = a, i.lastBaseUpdate = a;
  }
  var vu = !1;
  function Is() {
    if (vu) {
      var e = Pi;
      if (e !== null) throw e;
    }
  }
  function tl(e, a, i, o) {
    vu = !1;
    var f = e.updateQueue;
    Sa = !1;
    var h = f.firstBaseUpdate, x = f.lastBaseUpdate, A = f.shared.pending;
    if (A !== null) {
      f.shared.pending = null;
      var B = A, P = B.next;
      B.next = null, x === null ? h = P : x.next = P, x = B;
      var I = e.alternate;
      I !== null && (I = I.updateQueue, A = I.lastBaseUpdate, A !== x && (A === null ? I.firstBaseUpdate = P : A.next = P, I.lastBaseUpdate = B));
    }
    if (h !== null) {
      var st = f.baseState;
      x = 0, I = P = B = null, A = h;
      do {
        var K = A.lane & -536870913, Z = K !== A.lane;
        if (Z ? (Mt & K) === K : (o & K) === K) {
          K !== 0 && K === Gi && (vu = !0), I !== null && (I = I.next = {
            lane: 0,
            tag: A.tag,
            payload: A.payload,
            callback: null,
            next: null
          });
          t: {
            var dt = e, vt = A;
            K = a;
            var qt = i;
            switch (vt.tag) {
              case 1:
                if (dt = vt.payload, typeof dt == "function") {
                  st = dt.call(qt, st, K);
                  break t;
                }
                st = dt;
                break t;
              case 3:
                dt.flags = dt.flags & -65537 | 128;
              case 0:
                if (dt = vt.payload, K = typeof dt == "function" ? dt.call(qt, st, K) : dt, K == null) break t;
                st = v({}, st, K);
                break t;
              case 2:
                Sa = !0;
            }
          }
          K = A.callback, K !== null && (e.flags |= 64, Z && (e.flags |= 8192), Z = f.callbacks, Z === null ? f.callbacks = [K] : Z.push(K));
        } else
          Z = {
            lane: K,
            tag: A.tag,
            payload: A.payload,
            callback: A.callback,
            next: null
          }, I === null ? (P = I = Z, B = st) : I = I.next = Z, x |= K;
        if (A = A.next, A === null) {
          if (A = f.shared.pending, A === null)
            break;
          Z = A, A = Z.next, Z.next = null, f.lastBaseUpdate = Z, f.shared.pending = null;
        }
      } while (!0);
      I === null && (B = st), f.baseState = B, f.firstBaseUpdate = P, f.lastBaseUpdate = I, h === null && (f.shared.lanes = 0), Ma |= x, e.lanes = x, e.memoizedState = st;
    }
  }
  function Ip(e, a) {
    if (typeof e != "function")
      throw Error(l(191, e));
    e.call(a);
  }
  function t1(e, a) {
    var i = e.callbacks;
    if (i !== null)
      for (e.callbacks = null, e = 0; e < i.length; e++)
        Ip(i[e], a);
  }
  var Qi = N(null), $o = N(0);
  function e1(e, a) {
    e = sa, tt($o, e), tt(Qi, a), sa = e | a.baseLanes;
  }
  function bu() {
    tt($o, sa), tt(Qi, Qi.current);
  }
  function xu() {
    sa = $o.current, q(Qi), q($o);
  }
  var Je = N(null), hn = null;
  function Ta(e) {
    var a = e.alternate;
    tt(le, le.current & 1), tt(Je, e), hn === null && (a === null || Qi.current !== null || a.memoizedState !== null) && (hn = e);
  }
  function Su(e) {
    tt(le, le.current), tt(Je, e), hn === null && (hn = e);
  }
  function n1(e) {
    e.tag === 22 ? (tt(le, le.current), tt(Je, e), hn === null && (hn = e)) : ja();
  }
  function ja() {
    tt(le, le.current), tt(Je, Je.current);
  }
  function We(e) {
    q(Je), hn === e && (hn = null), q(le);
  }
  var le = N(0);
  function Bo(e) {
    for (var a = e; a !== null; ) {
      if (a.tag === 13) {
        var i = a.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || Mf(i) || _f(i)))
          return a;
      } else if (a.tag === 19 && (a.memoizedProps.revealOrder === "forwards" || a.memoizedProps.revealOrder === "backwards" || a.memoizedProps.revealOrder === "unstable_legacy-backwards" || a.memoizedProps.revealOrder === "together")) {
        if ((a.flags & 128) !== 0) return a;
      } else if (a.child !== null) {
        a.child.return = a, a = a.child;
        continue;
      }
      if (a === e) break;
      for (; a.sibling === null; ) {
        if (a.return === null || a.return === e) return null;
        a = a.return;
      }
      a.sibling.return = a.return, a = a.sibling;
    }
    return null;
  }
  var Jn = 0, wt = null, Ut = null, ce = null, zo = !1, Zi = !1, si = !1, Vo = 0, el = 0, Fi = null, a5 = 0;
  function ae() {
    throw Error(l(321));
  }
  function wu(e, a) {
    if (a === null) return !1;
    for (var i = 0; i < a.length && i < e.length; i++)
      if (!Ze(e[i], a[i])) return !1;
    return !0;
  }
  function Cu(e, a, i, o, f, h) {
    return Jn = h, wt = a, a.memoizedState = null, a.updateQueue = null, a.lanes = 0, O.H = e === null || e.memoizedState === null ? k1 : Vu, si = !1, h = i(o, f), si = !1, Zi && (h = i1(
      a,
      i,
      o,
      f
    )), a1(e), h;
  }
  function a1(e) {
    O.H = il;
    var a = Ut !== null && Ut.next !== null;
    if (Jn = 0, ce = Ut = wt = null, zo = !1, el = 0, Fi = null, a) throw Error(l(300));
    e === null || ue || (e = e.dependencies, e !== null && Mo(e) && (ue = !0));
  }
  function i1(e, a, i, o) {
    wt = e;
    var f = 0;
    do {
      if (Zi && (Fi = null), el = 0, Zi = !1, 25 <= f) throw Error(l(301));
      if (f += 1, ce = Ut = null, e.updateQueue != null) {
        var h = e.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      O.H = U1, h = a(i, o);
    } while (Zi);
    return h;
  }
  function i5() {
    var e = O.H, a = e.useState()[0];
    return a = typeof a.then == "function" ? nl(a) : a, e = e.useState()[0], (Ut !== null ? Ut.memoizedState : null) !== e && (wt.flags |= 1024), a;
  }
  function Tu() {
    var e = Vo !== 0;
    return Vo = 0, e;
  }
  function ju(e, a, i) {
    a.updateQueue = e.updateQueue, a.flags &= -2053, e.lanes &= ~i;
  }
  function Eu(e) {
    if (zo) {
      for (e = e.memoizedState; e !== null; ) {
        var a = e.queue;
        a !== null && (a.pending = null), e = e.next;
      }
      zo = !1;
    }
    Jn = 0, ce = Ut = wt = null, Zi = !1, el = Vo = 0, Fi = null;
  }
  function Oe() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return ce === null ? wt.memoizedState = ce = e : ce = ce.next = e, ce;
  }
  function oe() {
    if (Ut === null) {
      var e = wt.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ut.next;
    var a = ce === null ? wt.memoizedState : ce.next;
    if (a !== null)
      ce = a, Ut = e;
    else {
      if (e === null)
        throw wt.alternate === null ? Error(l(467)) : Error(l(310));
      Ut = e, e = {
        memoizedState: Ut.memoizedState,
        baseState: Ut.baseState,
        baseQueue: Ut.baseQueue,
        queue: Ut.queue,
        next: null
      }, ce === null ? wt.memoizedState = ce = e : ce = ce.next = e;
    }
    return ce;
  }
  function ko() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function nl(e) {
    var a = el;
    return el += 1, Fi === null && (Fi = []), e = Qp(Fi, e, a), a = wt, (ce === null ? a.memoizedState : ce.next) === null && (a = a.alternate, O.H = a === null || a.memoizedState === null ? k1 : Vu), e;
  }
  function Uo(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return nl(e);
      if (e.$$typeof === R) return Ee(e);
    }
    throw Error(l(438, String(e)));
  }
  function Au(e) {
    var a = null, i = wt.updateQueue;
    if (i !== null && (a = i.memoCache), a == null) {
      var o = wt.alternate;
      o !== null && (o = o.updateQueue, o !== null && (o = o.memoCache, o != null && (a = {
        data: o.data.map(function(f) {
          return f.slice();
        }),
        index: 0
      })));
    }
    if (a == null && (a = { data: [], index: 0 }), i === null && (i = ko(), wt.updateQueue = i), i.memoCache = a, i = a.data[a.index], i === void 0)
      for (i = a.data[a.index] = Array(e), o = 0; o < e; o++)
        i[o] = Y;
    return a.index++, i;
  }
  function Wn(e, a) {
    return typeof a == "function" ? a(e) : a;
  }
  function Ho(e) {
    var a = oe();
    return Mu(a, Ut, e);
  }
  function Mu(e, a, i) {
    var o = e.queue;
    if (o === null) throw Error(l(311));
    o.lastRenderedReducer = i;
    var f = e.baseQueue, h = o.pending;
    if (h !== null) {
      if (f !== null) {
        var x = f.next;
        f.next = h.next, h.next = x;
      }
      a.baseQueue = f = h, o.pending = null;
    }
    if (h = e.baseState, f === null) e.memoizedState = h;
    else {
      a = f.next;
      var A = x = null, B = null, P = a, I = !1;
      do {
        var st = P.lane & -536870913;
        if (st !== P.lane ? (Mt & st) === st : (Jn & st) === st) {
          var K = P.revertLane;
          if (K === 0)
            B !== null && (B = B.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: P.action,
              hasEagerState: P.hasEagerState,
              eagerState: P.eagerState,
              next: null
            }), st === Gi && (I = !0);
          else if ((Jn & K) === K) {
            P = P.next, K === Gi && (I = !0);
            continue;
          } else
            st = {
              lane: 0,
              revertLane: P.revertLane,
              gesture: null,
              action: P.action,
              hasEagerState: P.hasEagerState,
              eagerState: P.eagerState,
              next: null
            }, B === null ? (A = B = st, x = h) : B = B.next = st, wt.lanes |= K, Ma |= K;
          st = P.action, si && i(h, st), h = P.hasEagerState ? P.eagerState : i(h, st);
        } else
          K = {
            lane: st,
            revertLane: P.revertLane,
            gesture: P.gesture,
            action: P.action,
            hasEagerState: P.hasEagerState,
            eagerState: P.eagerState,
            next: null
          }, B === null ? (A = B = K, x = h) : B = B.next = K, wt.lanes |= st, Ma |= st;
        P = P.next;
      } while (P !== null && P !== a);
      if (B === null ? x = h : B.next = A, !Ze(h, e.memoizedState) && (ue = !0, I && (i = Pi, i !== null)))
        throw i;
      e.memoizedState = h, e.baseState = x, e.baseQueue = B, o.lastRenderedState = h;
    }
    return f === null && (o.lanes = 0), [e.memoizedState, o.dispatch];
  }
  function _u(e) {
    var a = oe(), i = a.queue;
    if (i === null) throw Error(l(311));
    i.lastRenderedReducer = e;
    var o = i.dispatch, f = i.pending, h = a.memoizedState;
    if (f !== null) {
      i.pending = null;
      var x = f = f.next;
      do
        h = e(h, x.action), x = x.next;
      while (x !== f);
      Ze(h, a.memoizedState) || (ue = !0), a.memoizedState = h, a.baseQueue === null && (a.baseState = h), i.lastRenderedState = h;
    }
    return [h, o];
  }
  function s1(e, a, i) {
    var o = wt, f = oe(), h = Rt;
    if (h) {
      if (i === void 0) throw Error(l(407));
      i = i();
    } else i = a();
    var x = !Ze(
      (Ut || f).memoizedState,
      i
    );
    if (x && (f.memoizedState = i, ue = !0), f = f.queue, Nu(r1.bind(null, o, f, e), [
      e
    ]), f.getSnapshot !== a || x || ce !== null && ce.memoizedState.tag & 1) {
      if (o.flags |= 2048, Ji(
        9,
        { destroy: void 0 },
        o1.bind(
          null,
          o,
          f,
          i,
          a
        ),
        null
      ), Qt === null) throw Error(l(349));
      h || (Jn & 127) !== 0 || l1(o, a, i);
    }
    return i;
  }
  function l1(e, a, i) {
    e.flags |= 16384, e = { getSnapshot: a, value: i }, a = wt.updateQueue, a === null ? (a = ko(), wt.updateQueue = a, a.stores = [e]) : (i = a.stores, i === null ? a.stores = [e] : i.push(e));
  }
  function o1(e, a, i, o) {
    a.value = i, a.getSnapshot = o, c1(a) && u1(e);
  }
  function r1(e, a, i) {
    return i(function() {
      c1(a) && u1(e);
    });
  }
  function c1(e) {
    var a = e.getSnapshot;
    e = e.value;
    try {
      var i = a();
      return !Ze(e, i);
    } catch {
      return !0;
    }
  }
  function u1(e) {
    var a = Fa(e, 2);
    a !== null && Ye(a, e, 2);
  }
  function Du(e) {
    var a = Oe();
    if (typeof e == "function") {
      var i = e;
      if (e = i(), si) {
        ma(!0);
        try {
          i();
        } finally {
          ma(!1);
        }
      }
    }
    return a.memoizedState = a.baseState = e, a.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Wn,
      lastRenderedState: e
    }, a;
  }
  function f1(e, a, i, o) {
    return e.baseState = i, Mu(
      e,
      Ut,
      typeof o == "function" ? o : Wn
    );
  }
  function s5(e, a, i, o, f) {
    if (Go(e)) throw Error(l(485));
    if (e = a.action, e !== null) {
      var h = {
        payload: f,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(x) {
          h.listeners.push(x);
        }
      };
      O.T !== null ? i(!0) : h.isTransition = !1, o(h), i = a.pending, i === null ? (h.next = a.pending = h, d1(a, h)) : (h.next = i.next, a.pending = i.next = h);
    }
  }
  function d1(e, a) {
    var i = a.action, o = a.payload, f = e.state;
    if (a.isTransition) {
      var h = O.T, x = {};
      O.T = x;
      try {
        var A = i(f, o), B = O.S;
        B !== null && B(x, A), h1(e, a, A);
      } catch (P) {
        Ru(e, a, P);
      } finally {
        h !== null && x.types !== null && (h.types = x.types), O.T = h;
      }
    } else
      try {
        h = i(f, o), h1(e, a, h);
      } catch (P) {
        Ru(e, a, P);
      }
  }
  function h1(e, a, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(o) {
        m1(e, a, o);
      },
      function(o) {
        return Ru(e, a, o);
      }
    ) : m1(e, a, i);
  }
  function m1(e, a, i) {
    a.status = "fulfilled", a.value = i, p1(a), e.state = i, a = e.pending, a !== null && (i = a.next, i === a ? e.pending = null : (i = i.next, a.next = i, d1(e, i)));
  }
  function Ru(e, a, i) {
    var o = e.pending;
    if (e.pending = null, o !== null) {
      o = o.next;
      do
        a.status = "rejected", a.reason = i, p1(a), a = a.next;
      while (a !== o);
    }
    e.action = null;
  }
  function p1(e) {
    e = e.listeners;
    for (var a = 0; a < e.length; a++) (0, e[a])();
  }
  function g1(e, a) {
    return a;
  }
  function y1(e, a) {
    if (Rt) {
      var i = Qt.formState;
      if (i !== null) {
        t: {
          var o = wt;
          if (Rt) {
            if (Jt) {
              e: {
                for (var f = Jt, h = dn; f.nodeType !== 8; ) {
                  if (!h) {
                    f = null;
                    break e;
                  }
                  if (f = mn(
                    f.nextSibling
                  ), f === null) {
                    f = null;
                    break e;
                  }
                }
                h = f.data, f = h === "F!" || h === "F" ? f : null;
              }
              if (f) {
                Jt = mn(
                  f.nextSibling
                ), o = f.data === "F!";
                break t;
              }
            }
            ba(o);
          }
          o = !1;
        }
        o && (a = i[0]);
      }
    }
    return i = Oe(), i.memoizedState = i.baseState = a, o = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: g1,
      lastRenderedState: a
    }, i.queue = o, i = B1.bind(
      null,
      wt,
      o
    ), o.dispatch = i, o = Du(!1), h = zu.bind(
      null,
      wt,
      !1,
      o.queue
    ), o = Oe(), f = {
      state: a,
      dispatch: null,
      action: e,
      pending: null
    }, o.queue = f, i = s5.bind(
      null,
      wt,
      f,
      h,
      i
    ), f.dispatch = i, o.memoizedState = e, [a, i, !1];
  }
  function v1(e) {
    var a = oe();
    return b1(a, Ut, e);
  }
  function b1(e, a, i) {
    if (a = Mu(
      e,
      a,
      g1
    )[0], e = Ho(Wn)[0], typeof a == "object" && a !== null && typeof a.then == "function")
      try {
        var o = nl(a);
      } catch (x) {
        throw x === Xi ? Ro : x;
      }
    else o = a;
    a = oe();
    var f = a.queue, h = f.dispatch;
    return i !== a.memoizedState && (wt.flags |= 2048, Ji(
      9,
      { destroy: void 0 },
      l5.bind(null, f, i),
      null
    )), [o, h, e];
  }
  function l5(e, a) {
    e.action = a;
  }
  function x1(e) {
    var a = oe(), i = Ut;
    if (i !== null)
      return b1(a, i, e);
    oe(), a = a.memoizedState, i = oe();
    var o = i.queue.dispatch;
    return i.memoizedState = e, [a, o, !1];
  }
  function Ji(e, a, i, o) {
    return e = { tag: e, create: i, deps: o, inst: a, next: null }, a = wt.updateQueue, a === null && (a = ko(), wt.updateQueue = a), i = a.lastEffect, i === null ? a.lastEffect = e.next = e : (o = i.next, i.next = e, e.next = o, a.lastEffect = e), e;
  }
  function S1() {
    return oe().memoizedState;
  }
  function qo(e, a, i, o) {
    var f = Oe();
    wt.flags |= e, f.memoizedState = Ji(
      1 | a,
      { destroy: void 0 },
      i,
      o === void 0 ? null : o
    );
  }
  function Yo(e, a, i, o) {
    var f = oe();
    o = o === void 0 ? null : o;
    var h = f.memoizedState.inst;
    Ut !== null && o !== null && wu(o, Ut.memoizedState.deps) ? f.memoizedState = Ji(a, h, i, o) : (wt.flags |= e, f.memoizedState = Ji(
      1 | a,
      h,
      i,
      o
    ));
  }
  function w1(e, a) {
    qo(8390656, 8, e, a);
  }
  function Nu(e, a) {
    Yo(2048, 8, e, a);
  }
  function o5(e) {
    wt.flags |= 4;
    var a = wt.updateQueue;
    if (a === null)
      a = ko(), wt.updateQueue = a, a.events = [e];
    else {
      var i = a.events;
      i === null ? a.events = [e] : i.push(e);
    }
  }
  function C1(e) {
    var a = oe().memoizedState;
    return o5({ ref: a, nextImpl: e }), function() {
      if ((Bt & 2) !== 0) throw Error(l(440));
      return a.impl.apply(void 0, arguments);
    };
  }
  function T1(e, a) {
    return Yo(4, 2, e, a);
  }
  function j1(e, a) {
    return Yo(4, 4, e, a);
  }
  function E1(e, a) {
    if (typeof a == "function") {
      e = e();
      var i = a(e);
      return function() {
        typeof i == "function" ? i() : a(null);
      };
    }
    if (a != null)
      return e = e(), a.current = e, function() {
        a.current = null;
      };
  }
  function A1(e, a, i) {
    i = i != null ? i.concat([e]) : null, Yo(4, 4, E1.bind(null, a, e), i);
  }
  function Ou() {
  }
  function M1(e, a) {
    var i = oe();
    a = a === void 0 ? null : a;
    var o = i.memoizedState;
    return a !== null && wu(a, o[1]) ? o[0] : (i.memoizedState = [e, a], e);
  }
  function _1(e, a) {
    var i = oe();
    a = a === void 0 ? null : a;
    var o = i.memoizedState;
    if (a !== null && wu(a, o[1]))
      return o[0];
    if (o = e(), si) {
      ma(!0);
      try {
        e();
      } finally {
        ma(!1);
      }
    }
    return i.memoizedState = [o, a], o;
  }
  function Lu(e, a, i) {
    return i === void 0 || (Jn & 1073741824) !== 0 && (Mt & 261930) === 0 ? e.memoizedState = a : (e.memoizedState = i, e = D0(), wt.lanes |= e, Ma |= e, i);
  }
  function D1(e, a, i, o) {
    return Ze(i, a) ? i : Qi.current !== null ? (e = Lu(e, i, o), Ze(e, a) || (ue = !0), e) : (Jn & 42) === 0 || (Jn & 1073741824) !== 0 && (Mt & 261930) === 0 ? (ue = !0, e.memoizedState = i) : (e = D0(), wt.lanes |= e, Ma |= e, a);
  }
  function R1(e, a, i, o, f) {
    var h = U.p;
    U.p = h !== 0 && 8 > h ? h : 8;
    var x = O.T, A = {};
    O.T = A, zu(e, !1, a, i);
    try {
      var B = f(), P = O.S;
      if (P !== null && P(A, B), B !== null && typeof B == "object" && typeof B.then == "function") {
        var I = n5(
          B,
          o
        );
        al(
          e,
          a,
          I,
          en(e)
        );
      } else
        al(
          e,
          a,
          o,
          en(e)
        );
    } catch (st) {
      al(
        e,
        a,
        { then: function() {
        }, status: "rejected", reason: st },
        en()
      );
    } finally {
      U.p = h, x !== null && A.types !== null && (x.types = A.types), O.T = x;
    }
  }
  function r5() {
  }
  function $u(e, a, i, o) {
    if (e.tag !== 5) throw Error(l(476));
    var f = N1(e).queue;
    R1(
      e,
      f,
      a,
      X,
      i === null ? r5 : function() {
        return O1(e), i(o);
      }
    );
  }
  function N1(e) {
    var a = e.memoizedState;
    if (a !== null) return a;
    a = {
      memoizedState: X,
      baseState: X,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Wn,
        lastRenderedState: X
      },
      next: null
    };
    var i = {};
    return a.next = {
      memoizedState: i,
      baseState: i,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Wn,
        lastRenderedState: i
      },
      next: null
    }, e.memoizedState = a, e = e.alternate, e !== null && (e.memoizedState = a), a;
  }
  function O1(e) {
    var a = N1(e);
    a.next === null && (a = e.alternate.memoizedState), al(
      e,
      a.next.queue,
      {},
      en()
    );
  }
  function Bu() {
    return Ee(xl);
  }
  function L1() {
    return oe().memoizedState;
  }
  function $1() {
    return oe().memoizedState;
  }
  function c5(e) {
    for (var a = e.return; a !== null; ) {
      switch (a.tag) {
        case 24:
        case 3:
          var i = en();
          e = wa(i);
          var o = Ca(a, e, i);
          o !== null && (Ye(o, a, i), Ws(o, a, i)), a = { cache: fu() }, e.payload = a;
          return;
      }
      a = a.return;
    }
  }
  function u5(e, a, i) {
    var o = en();
    i = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Go(e) ? z1(a, i) : (i = tu(e, a, i, o), i !== null && (Ye(i, e, o), V1(i, a, o)));
  }
  function B1(e, a, i) {
    var o = en();
    al(e, a, i, o);
  }
  function al(e, a, i, o) {
    var f = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Go(e)) z1(a, f);
    else {
      var h = e.alternate;
      if (e.lanes === 0 && (h === null || h.lanes === 0) && (h = a.lastRenderedReducer, h !== null))
        try {
          var x = a.lastRenderedState, A = h(x, i);
          if (f.hasEagerState = !0, f.eagerState = A, Ze(A, x))
            return To(e, a, f, 0), Qt === null && Co(), !1;
        } catch {
        } finally {
        }
      if (i = tu(e, a, f, o), i !== null)
        return Ye(i, e, o), V1(i, a, o), !0;
    }
    return !1;
  }
  function zu(e, a, i, o) {
    if (o = {
      lane: 2,
      revertLane: gf(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Go(e)) {
      if (a) throw Error(l(479));
    } else
      a = tu(
        e,
        i,
        o,
        2
      ), a !== null && Ye(a, e, 2);
  }
  function Go(e) {
    var a = e.alternate;
    return e === wt || a !== null && a === wt;
  }
  function z1(e, a) {
    Zi = zo = !0;
    var i = e.pending;
    i === null ? a.next = a : (a.next = i.next, i.next = a), e.pending = a;
  }
  function V1(e, a, i) {
    if ((i & 4194048) !== 0) {
      var o = a.lanes;
      o &= e.pendingLanes, i |= o, a.lanes = i, Ym(e, i);
    }
  }
  var il = {
    readContext: Ee,
    use: Uo,
    useCallback: ae,
    useContext: ae,
    useEffect: ae,
    useImperativeHandle: ae,
    useLayoutEffect: ae,
    useInsertionEffect: ae,
    useMemo: ae,
    useReducer: ae,
    useRef: ae,
    useState: ae,
    useDebugValue: ae,
    useDeferredValue: ae,
    useTransition: ae,
    useSyncExternalStore: ae,
    useId: ae,
    useHostTransitionStatus: ae,
    useFormState: ae,
    useActionState: ae,
    useOptimistic: ae,
    useMemoCache: ae,
    useCacheRefresh: ae
  };
  il.useEffectEvent = ae;
  var k1 = {
    readContext: Ee,
    use: Uo,
    useCallback: function(e, a) {
      return Oe().memoizedState = [
        e,
        a === void 0 ? null : a
      ], e;
    },
    useContext: Ee,
    useEffect: w1,
    useImperativeHandle: function(e, a, i) {
      i = i != null ? i.concat([e]) : null, qo(
        4194308,
        4,
        E1.bind(null, a, e),
        i
      );
    },
    useLayoutEffect: function(e, a) {
      return qo(4194308, 4, e, a);
    },
    useInsertionEffect: function(e, a) {
      qo(4, 2, e, a);
    },
    useMemo: function(e, a) {
      var i = Oe();
      a = a === void 0 ? null : a;
      var o = e();
      if (si) {
        ma(!0);
        try {
          e();
        } finally {
          ma(!1);
        }
      }
      return i.memoizedState = [o, a], o;
    },
    useReducer: function(e, a, i) {
      var o = Oe();
      if (i !== void 0) {
        var f = i(a);
        if (si) {
          ma(!0);
          try {
            i(a);
          } finally {
            ma(!1);
          }
        }
      } else f = a;
      return o.memoizedState = o.baseState = f, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: f
      }, o.queue = e, e = e.dispatch = u5.bind(
        null,
        wt,
        e
      ), [o.memoizedState, e];
    },
    useRef: function(e) {
      var a = Oe();
      return e = { current: e }, a.memoizedState = e;
    },
    useState: function(e) {
      e = Du(e);
      var a = e.queue, i = B1.bind(null, wt, a);
      return a.dispatch = i, [e.memoizedState, i];
    },
    useDebugValue: Ou,
    useDeferredValue: function(e, a) {
      var i = Oe();
      return Lu(i, e, a);
    },
    useTransition: function() {
      var e = Du(!1);
      return e = R1.bind(
        null,
        wt,
        e.queue,
        !0,
        !1
      ), Oe().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, a, i) {
      var o = wt, f = Oe();
      if (Rt) {
        if (i === void 0)
          throw Error(l(407));
        i = i();
      } else {
        if (i = a(), Qt === null)
          throw Error(l(349));
        (Mt & 127) !== 0 || l1(o, a, i);
      }
      f.memoizedState = i;
      var h = { value: i, getSnapshot: a };
      return f.queue = h, w1(r1.bind(null, o, h, e), [
        e
      ]), o.flags |= 2048, Ji(
        9,
        { destroy: void 0 },
        o1.bind(
          null,
          o,
          h,
          i,
          a
        ),
        null
      ), i;
    },
    useId: function() {
      var e = Oe(), a = Qt.identifierPrefix;
      if (Rt) {
        var i = On, o = Nn;
        i = (o & ~(1 << 32 - Qe(o) - 1)).toString(32) + i, a = "_" + a + "R_" + i, i = Vo++, 0 < i && (a += "H" + i.toString(32)), a += "_";
      } else
        i = a5++, a = "_" + a + "r_" + i.toString(32) + "_";
      return e.memoizedState = a;
    },
    useHostTransitionStatus: Bu,
    useFormState: y1,
    useActionState: y1,
    useOptimistic: function(e) {
      var a = Oe();
      a.memoizedState = a.baseState = e;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return a.queue = i, a = zu.bind(
        null,
        wt,
        !0,
        i
      ), i.dispatch = a, [e, a];
    },
    useMemoCache: Au,
    useCacheRefresh: function() {
      return Oe().memoizedState = c5.bind(
        null,
        wt
      );
    },
    useEffectEvent: function(e) {
      var a = Oe(), i = { impl: e };
      return a.memoizedState = i, function() {
        if ((Bt & 2) !== 0)
          throw Error(l(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, Vu = {
    readContext: Ee,
    use: Uo,
    useCallback: M1,
    useContext: Ee,
    useEffect: Nu,
    useImperativeHandle: A1,
    useInsertionEffect: T1,
    useLayoutEffect: j1,
    useMemo: _1,
    useReducer: Ho,
    useRef: S1,
    useState: function() {
      return Ho(Wn);
    },
    useDebugValue: Ou,
    useDeferredValue: function(e, a) {
      var i = oe();
      return D1(
        i,
        Ut.memoizedState,
        e,
        a
      );
    },
    useTransition: function() {
      var e = Ho(Wn)[0], a = oe().memoizedState;
      return [
        typeof e == "boolean" ? e : nl(e),
        a
      ];
    },
    useSyncExternalStore: s1,
    useId: L1,
    useHostTransitionStatus: Bu,
    useFormState: v1,
    useActionState: v1,
    useOptimistic: function(e, a) {
      var i = oe();
      return f1(i, Ut, e, a);
    },
    useMemoCache: Au,
    useCacheRefresh: $1
  };
  Vu.useEffectEvent = C1;
  var U1 = {
    readContext: Ee,
    use: Uo,
    useCallback: M1,
    useContext: Ee,
    useEffect: Nu,
    useImperativeHandle: A1,
    useInsertionEffect: T1,
    useLayoutEffect: j1,
    useMemo: _1,
    useReducer: _u,
    useRef: S1,
    useState: function() {
      return _u(Wn);
    },
    useDebugValue: Ou,
    useDeferredValue: function(e, a) {
      var i = oe();
      return Ut === null ? Lu(i, e, a) : D1(
        i,
        Ut.memoizedState,
        e,
        a
      );
    },
    useTransition: function() {
      var e = _u(Wn)[0], a = oe().memoizedState;
      return [
        typeof e == "boolean" ? e : nl(e),
        a
      ];
    },
    useSyncExternalStore: s1,
    useId: L1,
    useHostTransitionStatus: Bu,
    useFormState: x1,
    useActionState: x1,
    useOptimistic: function(e, a) {
      var i = oe();
      return Ut !== null ? f1(i, Ut, e, a) : (i.baseState = e, [e, i.queue.dispatch]);
    },
    useMemoCache: Au,
    useCacheRefresh: $1
  };
  U1.useEffectEvent = C1;
  function ku(e, a, i, o) {
    a = e.memoizedState, i = i(o, a), i = i == null ? a : v({}, a, i), e.memoizedState = i, e.lanes === 0 && (e.updateQueue.baseState = i);
  }
  var Uu = {
    enqueueSetState: function(e, a, i) {
      e = e._reactInternals;
      var o = en(), f = wa(o);
      f.payload = a, i != null && (f.callback = i), a = Ca(e, f, o), a !== null && (Ye(a, e, o), Ws(a, e, o));
    },
    enqueueReplaceState: function(e, a, i) {
      e = e._reactInternals;
      var o = en(), f = wa(o);
      f.tag = 1, f.payload = a, i != null && (f.callback = i), a = Ca(e, f, o), a !== null && (Ye(a, e, o), Ws(a, e, o));
    },
    enqueueForceUpdate: function(e, a) {
      e = e._reactInternals;
      var i = en(), o = wa(i);
      o.tag = 2, a != null && (o.callback = a), a = Ca(e, o, i), a !== null && (Ye(a, e, i), Ws(a, e, i));
    }
  };
  function H1(e, a, i, o, f, h, x) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(o, h, x) : a.prototype && a.prototype.isPureReactComponent ? !Gs(i, o) || !Gs(f, h) : !0;
  }
  function q1(e, a, i, o) {
    e = a.state, typeof a.componentWillReceiveProps == "function" && a.componentWillReceiveProps(i, o), typeof a.UNSAFE_componentWillReceiveProps == "function" && a.UNSAFE_componentWillReceiveProps(i, o), a.state !== e && Uu.enqueueReplaceState(a, a.state, null);
  }
  function li(e, a) {
    var i = a;
    if ("ref" in a) {
      i = {};
      for (var o in a)
        o !== "ref" && (i[o] = a[o]);
    }
    if (e = e.defaultProps) {
      i === a && (i = v({}, i));
      for (var f in e)
        i[f] === void 0 && (i[f] = e[f]);
    }
    return i;
  }
  function Y1(e) {
    wo(e);
  }
  function G1(e) {
    console.error(e);
  }
  function P1(e) {
    wo(e);
  }
  function Po(e, a) {
    try {
      var i = e.onUncaughtError;
      i(a.value, { componentStack: a.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function X1(e, a, i) {
    try {
      var o = e.onCaughtError;
      o(i.value, {
        componentStack: i.stack,
        errorBoundary: a.tag === 1 ? a.stateNode : null
      });
    } catch (f) {
      setTimeout(function() {
        throw f;
      });
    }
  }
  function Hu(e, a, i) {
    return i = wa(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      Po(e, a);
    }, i;
  }
  function K1(e) {
    return e = wa(e), e.tag = 3, e;
  }
  function Q1(e, a, i, o) {
    var f = i.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var h = o.value;
      e.payload = function() {
        return f(h);
      }, e.callback = function() {
        X1(a, i, o);
      };
    }
    var x = i.stateNode;
    x !== null && typeof x.componentDidCatch == "function" && (e.callback = function() {
      X1(a, i, o), typeof f != "function" && (_a === null ? _a = /* @__PURE__ */ new Set([this]) : _a.add(this));
      var A = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: A !== null ? A : ""
      });
    });
  }
  function f5(e, a, i, o, f) {
    if (i.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (a = i.alternate, a !== null && Yi(
        a,
        i,
        f,
        !0
      ), i = Je.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return hn === null ? ar() : i.alternate === null && ie === 0 && (ie = 3), i.flags &= -257, i.flags |= 65536, i.lanes = f, o === No ? i.flags |= 16384 : (a = i.updateQueue, a === null ? i.updateQueue = /* @__PURE__ */ new Set([o]) : a.add(o), hf(e, o, f)), !1;
          case 22:
            return i.flags |= 65536, o === No ? i.flags |= 16384 : (a = i.updateQueue, a === null ? (a = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, i.updateQueue = a) : (i = a.retryQueue, i === null ? a.retryQueue = /* @__PURE__ */ new Set([o]) : i.add(o)), hf(e, o, f)), !1;
        }
        throw Error(l(435, i.tag));
      }
      return hf(e, o, f), ar(), !1;
    }
    if (Rt)
      return a = Je.current, a !== null ? ((a.flags & 65536) === 0 && (a.flags |= 256), a.flags |= 65536, a.lanes = f, o !== lu && (e = Error(l(422), { cause: o }), Ks(cn(e, i)))) : (o !== lu && (a = Error(l(423), {
        cause: o
      }), Ks(
        cn(a, i)
      )), e = e.current.alternate, e.flags |= 65536, f &= -f, e.lanes |= f, o = cn(o, i), f = Hu(
        e.stateNode,
        o,
        f
      ), yu(e, f), ie !== 4 && (ie = 2)), !1;
    var h = Error(l(520), { cause: o });
    if (h = cn(h, i), dl === null ? dl = [h] : dl.push(h), ie !== 4 && (ie = 2), a === null) return !0;
    o = cn(o, i), i = a;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, e = f & -f, i.lanes |= e, e = Hu(i.stateNode, o, e), yu(i, e), !1;
        case 1:
          if (a = i.type, h = i.stateNode, (i.flags & 128) === 0 && (typeof a.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (_a === null || !_a.has(h))))
            return i.flags |= 65536, f &= -f, i.lanes |= f, f = K1(f), Q1(
              f,
              e,
              i,
              o
            ), yu(i, f), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var qu = Error(l(461)), ue = !1;
  function Ae(e, a, i, o) {
    a.child = e === null ? Wp(a, null, i, o) : ii(
      a,
      e.child,
      i,
      o
    );
  }
  function Z1(e, a, i, o, f) {
    i = i.render;
    var h = a.ref;
    if ("ref" in o) {
      var x = {};
      for (var A in o)
        A !== "ref" && (x[A] = o[A]);
    } else x = o;
    return ti(a), o = Cu(
      e,
      a,
      i,
      x,
      h,
      f
    ), A = Tu(), e !== null && !ue ? (ju(e, a, f), In(e, a, f)) : (Rt && A && iu(a), a.flags |= 1, Ae(e, a, o, f), a.child);
  }
  function F1(e, a, i, o, f) {
    if (e === null) {
      var h = i.type;
      return typeof h == "function" && !eu(h) && h.defaultProps === void 0 && i.compare === null ? (a.tag = 15, a.type = h, J1(
        e,
        a,
        h,
        o,
        f
      )) : (e = Eo(
        i.type,
        null,
        o,
        a,
        a.mode,
        f
      ), e.ref = a.ref, e.return = a, a.child = e);
    }
    if (h = e.child, !Fu(e, f)) {
      var x = h.memoizedProps;
      if (i = i.compare, i = i !== null ? i : Gs, i(x, o) && e.ref === a.ref)
        return In(e, a, f);
    }
    return a.flags |= 1, e = Kn(h, o), e.ref = a.ref, e.return = a, a.child = e;
  }
  function J1(e, a, i, o, f) {
    if (e !== null) {
      var h = e.memoizedProps;
      if (Gs(h, o) && e.ref === a.ref)
        if (ue = !1, a.pendingProps = o = h, Fu(e, f))
          (e.flags & 131072) !== 0 && (ue = !0);
        else
          return a.lanes = e.lanes, In(e, a, f);
    }
    return Yu(
      e,
      a,
      i,
      o,
      f
    );
  }
  function W1(e, a, i, o) {
    var f = o.children, h = e !== null ? e.memoizedState : null;
    if (e === null && a.stateNode === null && (a.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), o.mode === "hidden") {
      if ((a.flags & 128) !== 0) {
        if (h = h !== null ? h.baseLanes | i : i, e !== null) {
          for (o = a.child = e.child, f = 0; o !== null; )
            f = f | o.lanes | o.childLanes, o = o.sibling;
          o = f & ~h;
        } else o = 0, a.child = null;
        return I1(
          e,
          a,
          h,
          i,
          o
        );
      }
      if ((i & 536870912) !== 0)
        a.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Do(
          a,
          h !== null ? h.cachePool : null
        ), h !== null ? e1(a, h) : bu(), n1(a);
      else
        return o = a.lanes = 536870912, I1(
          e,
          a,
          h !== null ? h.baseLanes | i : i,
          i,
          o
        );
    } else
      h !== null ? (Do(a, h.cachePool), e1(a, h), ja(), a.memoizedState = null) : (e !== null && Do(a, null), bu(), ja());
    return Ae(e, a, f, i), a.child;
  }
  function sl(e, a) {
    return e !== null && e.tag === 22 || a.stateNode !== null || (a.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.sibling;
  }
  function I1(e, a, i, o, f) {
    var h = hu();
    return h = h === null ? null : { parent: re._currentValue, pool: h }, a.memoizedState = {
      baseLanes: i,
      cachePool: h
    }, e !== null && Do(a, null), bu(), n1(a), e !== null && Yi(e, a, o, !0), a.childLanes = f, null;
  }
  function Xo(e, a) {
    return a = Qo(
      { mode: a.mode, children: a.children },
      e.mode
    ), a.ref = e.ref, e.child = a, a.return = e, a;
  }
  function t0(e, a, i) {
    return ii(a, e.child, null, i), e = Xo(a, a.pendingProps), e.flags |= 2, We(a), a.memoizedState = null, e;
  }
  function d5(e, a, i) {
    var o = a.pendingProps, f = (a.flags & 128) !== 0;
    if (a.flags &= -129, e === null) {
      if (Rt) {
        if (o.mode === "hidden")
          return e = Xo(a, o), a.lanes = 536870912, sl(null, e);
        if (Su(a), (e = Jt) ? (e = dg(
          e,
          dn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (a.memoizedState = {
          dehydrated: e,
          treeContext: ya !== null ? { id: Nn, overflow: On } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = zp(e), i.return = a, a.child = i, je = a, Jt = null)) : e = null, e === null) throw ba(a);
        return a.lanes = 536870912, null;
      }
      return Xo(a, o);
    }
    var h = e.memoizedState;
    if (h !== null) {
      var x = h.dehydrated;
      if (Su(a), f)
        if (a.flags & 256)
          a.flags &= -257, a = t0(
            e,
            a,
            i
          );
        else if (a.memoizedState !== null)
          a.child = e.child, a.flags |= 128, a = null;
        else throw Error(l(558));
      else if (ue || Yi(e, a, i, !1), f = (i & e.childLanes) !== 0, ue || f) {
        if (o = Qt, o !== null && (x = Gm(o, i), x !== 0 && x !== h.retryLane))
          throw h.retryLane = x, Fa(e, x), Ye(o, e, x), qu;
        ar(), a = t0(
          e,
          a,
          i
        );
      } else
        e = h.treeContext, Jt = mn(x.nextSibling), je = a, Rt = !0, va = null, dn = !1, e !== null && Up(a, e), a = Xo(a, o), a.flags |= 4096;
      return a;
    }
    return e = Kn(e.child, {
      mode: o.mode,
      children: o.children
    }), e.ref = a.ref, a.child = e, e.return = a, e;
  }
  function Ko(e, a) {
    var i = a.ref;
    if (i === null)
      e !== null && e.ref !== null && (a.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(l(284));
      (e === null || e.ref !== i) && (a.flags |= 4194816);
    }
  }
  function Yu(e, a, i, o, f) {
    return ti(a), i = Cu(
      e,
      a,
      i,
      o,
      void 0,
      f
    ), o = Tu(), e !== null && !ue ? (ju(e, a, f), In(e, a, f)) : (Rt && o && iu(a), a.flags |= 1, Ae(e, a, i, f), a.child);
  }
  function e0(e, a, i, o, f, h) {
    return ti(a), a.updateQueue = null, i = i1(
      a,
      o,
      i,
      f
    ), a1(e), o = Tu(), e !== null && !ue ? (ju(e, a, h), In(e, a, h)) : (Rt && o && iu(a), a.flags |= 1, Ae(e, a, i, h), a.child);
  }
  function n0(e, a, i, o, f) {
    if (ti(a), a.stateNode === null) {
      var h = ki, x = i.contextType;
      typeof x == "object" && x !== null && (h = Ee(x)), h = new i(o, h), a.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = Uu, a.stateNode = h, h._reactInternals = a, h = a.stateNode, h.props = o, h.state = a.memoizedState, h.refs = {}, pu(a), x = i.contextType, h.context = typeof x == "object" && x !== null ? Ee(x) : ki, h.state = a.memoizedState, x = i.getDerivedStateFromProps, typeof x == "function" && (ku(
        a,
        i,
        x,
        o
      ), h.state = a.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (x = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), x !== h.state && Uu.enqueueReplaceState(h, h.state, null), tl(a, o, h, f), Is(), h.state = a.memoizedState), typeof h.componentDidMount == "function" && (a.flags |= 4194308), o = !0;
    } else if (e === null) {
      h = a.stateNode;
      var A = a.memoizedProps, B = li(i, A);
      h.props = B;
      var P = h.context, I = i.contextType;
      x = ki, typeof I == "object" && I !== null && (x = Ee(I));
      var st = i.getDerivedStateFromProps;
      I = typeof st == "function" || typeof h.getSnapshotBeforeUpdate == "function", A = a.pendingProps !== A, I || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (A || P !== x) && q1(
        a,
        h,
        o,
        x
      ), Sa = !1;
      var K = a.memoizedState;
      h.state = K, tl(a, o, h, f), Is(), P = a.memoizedState, A || K !== P || Sa ? (typeof st == "function" && (ku(
        a,
        i,
        st,
        o
      ), P = a.memoizedState), (B = Sa || H1(
        a,
        i,
        B,
        o,
        K,
        P,
        x
      )) ? (I || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (a.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (a.flags |= 4194308), a.memoizedProps = o, a.memoizedState = P), h.props = o, h.state = P, h.context = x, o = B) : (typeof h.componentDidMount == "function" && (a.flags |= 4194308), o = !1);
    } else {
      h = a.stateNode, gu(e, a), x = a.memoizedProps, I = li(i, x), h.props = I, st = a.pendingProps, K = h.context, P = i.contextType, B = ki, typeof P == "object" && P !== null && (B = Ee(P)), A = i.getDerivedStateFromProps, (P = typeof A == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (x !== st || K !== B) && q1(
        a,
        h,
        o,
        B
      ), Sa = !1, K = a.memoizedState, h.state = K, tl(a, o, h, f), Is();
      var Z = a.memoizedState;
      x !== st || K !== Z || Sa || e !== null && e.dependencies !== null && Mo(e.dependencies) ? (typeof A == "function" && (ku(
        a,
        i,
        A,
        o
      ), Z = a.memoizedState), (I = Sa || H1(
        a,
        i,
        I,
        o,
        K,
        Z,
        B
      ) || e !== null && e.dependencies !== null && Mo(e.dependencies)) ? (P || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(o, Z, B), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(
        o,
        Z,
        B
      )), typeof h.componentDidUpdate == "function" && (a.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (a.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || x === e.memoizedProps && K === e.memoizedState || (a.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && K === e.memoizedState || (a.flags |= 1024), a.memoizedProps = o, a.memoizedState = Z), h.props = o, h.state = Z, h.context = B, o = I) : (typeof h.componentDidUpdate != "function" || x === e.memoizedProps && K === e.memoizedState || (a.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || x === e.memoizedProps && K === e.memoizedState || (a.flags |= 1024), o = !1);
    }
    return h = o, Ko(e, a), o = (a.flags & 128) !== 0, h || o ? (h = a.stateNode, i = o && typeof i.getDerivedStateFromError != "function" ? null : h.render(), a.flags |= 1, e !== null && o ? (a.child = ii(
      a,
      e.child,
      null,
      f
    ), a.child = ii(
      a,
      null,
      i,
      f
    )) : Ae(e, a, i, f), a.memoizedState = h.state, e = a.child) : e = In(
      e,
      a,
      f
    ), e;
  }
  function a0(e, a, i, o) {
    return Wa(), a.flags |= 256, Ae(e, a, i, o), a.child;
  }
  var Gu = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Pu(e) {
    return { baseLanes: e, cachePool: Xp() };
  }
  function Xu(e, a, i) {
    return e = e !== null ? e.childLanes & ~i : 0, a && (e |= tn), e;
  }
  function i0(e, a, i) {
    var o = a.pendingProps, f = !1, h = (a.flags & 128) !== 0, x;
    if ((x = h) || (x = e !== null && e.memoizedState === null ? !1 : (le.current & 2) !== 0), x && (f = !0, a.flags &= -129), x = (a.flags & 32) !== 0, a.flags &= -33, e === null) {
      if (Rt) {
        if (f ? Ta(a) : ja(), (e = Jt) ? (e = dg(
          e,
          dn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (a.memoizedState = {
          dehydrated: e,
          treeContext: ya !== null ? { id: Nn, overflow: On } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = zp(e), i.return = a, a.child = i, je = a, Jt = null)) : e = null, e === null) throw ba(a);
        return _f(e) ? a.lanes = 32 : a.lanes = 536870912, null;
      }
      var A = o.children;
      return o = o.fallback, f ? (ja(), f = a.mode, A = Qo(
        { mode: "hidden", children: A },
        f
      ), o = Ja(
        o,
        f,
        i,
        null
      ), A.return = a, o.return = a, A.sibling = o, a.child = A, o = a.child, o.memoizedState = Pu(i), o.childLanes = Xu(
        e,
        x,
        i
      ), a.memoizedState = Gu, sl(null, o)) : (Ta(a), Ku(a, A));
    }
    var B = e.memoizedState;
    if (B !== null && (A = B.dehydrated, A !== null)) {
      if (h)
        a.flags & 256 ? (Ta(a), a.flags &= -257, a = Qu(
          e,
          a,
          i
        )) : a.memoizedState !== null ? (ja(), a.child = e.child, a.flags |= 128, a = null) : (ja(), A = o.fallback, f = a.mode, o = Qo(
          { mode: "visible", children: o.children },
          f
        ), A = Ja(
          A,
          f,
          i,
          null
        ), A.flags |= 2, o.return = a, A.return = a, o.sibling = A, a.child = o, ii(
          a,
          e.child,
          null,
          i
        ), o = a.child, o.memoizedState = Pu(i), o.childLanes = Xu(
          e,
          x,
          i
        ), a.memoizedState = Gu, a = sl(null, o));
      else if (Ta(a), _f(A)) {
        if (x = A.nextSibling && A.nextSibling.dataset, x) var P = x.dgst;
        x = P, o = Error(l(419)), o.stack = "", o.digest = x, Ks({ value: o, source: null, stack: null }), a = Qu(
          e,
          a,
          i
        );
      } else if (ue || Yi(e, a, i, !1), x = (i & e.childLanes) !== 0, ue || x) {
        if (x = Qt, x !== null && (o = Gm(x, i), o !== 0 && o !== B.retryLane))
          throw B.retryLane = o, Fa(e, o), Ye(x, e, o), qu;
        Mf(A) || ar(), a = Qu(
          e,
          a,
          i
        );
      } else
        Mf(A) ? (a.flags |= 192, a.child = e.child, a = null) : (e = B.treeContext, Jt = mn(
          A.nextSibling
        ), je = a, Rt = !0, va = null, dn = !1, e !== null && Up(a, e), a = Ku(
          a,
          o.children
        ), a.flags |= 4096);
      return a;
    }
    return f ? (ja(), A = o.fallback, f = a.mode, B = e.child, P = B.sibling, o = Kn(B, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = B.subtreeFlags & 65011712, P !== null ? A = Kn(
      P,
      A
    ) : (A = Ja(
      A,
      f,
      i,
      null
    ), A.flags |= 2), A.return = a, o.return = a, o.sibling = A, a.child = o, sl(null, o), o = a.child, A = e.child.memoizedState, A === null ? A = Pu(i) : (f = A.cachePool, f !== null ? (B = re._currentValue, f = f.parent !== B ? { parent: B, pool: B } : f) : f = Xp(), A = {
      baseLanes: A.baseLanes | i,
      cachePool: f
    }), o.memoizedState = A, o.childLanes = Xu(
      e,
      x,
      i
    ), a.memoizedState = Gu, sl(e.child, o)) : (Ta(a), i = e.child, e = i.sibling, i = Kn(i, {
      mode: "visible",
      children: o.children
    }), i.return = a, i.sibling = null, e !== null && (x = a.deletions, x === null ? (a.deletions = [e], a.flags |= 16) : x.push(e)), a.child = i, a.memoizedState = null, i);
  }
  function Ku(e, a) {
    return a = Qo(
      { mode: "visible", children: a },
      e.mode
    ), a.return = e, e.child = a;
  }
  function Qo(e, a) {
    return e = Fe(22, e, null, a), e.lanes = 0, e;
  }
  function Qu(e, a, i) {
    return ii(a, e.child, null, i), e = Ku(
      a,
      a.pendingProps.children
    ), e.flags |= 2, a.memoizedState = null, e;
  }
  function s0(e, a, i) {
    e.lanes |= a;
    var o = e.alternate;
    o !== null && (o.lanes |= a), cu(e.return, a, i);
  }
  function Zu(e, a, i, o, f, h) {
    var x = e.memoizedState;
    x === null ? e.memoizedState = {
      isBackwards: a,
      rendering: null,
      renderingStartTime: 0,
      last: o,
      tail: i,
      tailMode: f,
      treeForkCount: h
    } : (x.isBackwards = a, x.rendering = null, x.renderingStartTime = 0, x.last = o, x.tail = i, x.tailMode = f, x.treeForkCount = h);
  }
  function l0(e, a, i) {
    var o = a.pendingProps, f = o.revealOrder, h = o.tail;
    o = o.children;
    var x = le.current, A = (x & 2) !== 0;
    if (A ? (x = x & 1 | 2, a.flags |= 128) : x &= 1, tt(le, x), Ae(e, a, o, i), o = Rt ? Xs : 0, !A && e !== null && (e.flags & 128) !== 0)
      t: for (e = a.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && s0(e, i, a);
        else if (e.tag === 19)
          s0(e, i, a);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === a) break t;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === a)
            break t;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (f) {
      case "forwards":
        for (i = a.child, f = null; i !== null; )
          e = i.alternate, e !== null && Bo(e) === null && (f = i), i = i.sibling;
        i = f, i === null ? (f = a.child, a.child = null) : (f = i.sibling, i.sibling = null), Zu(
          a,
          !1,
          f,
          i,
          h,
          o
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (i = null, f = a.child, a.child = null; f !== null; ) {
          if (e = f.alternate, e !== null && Bo(e) === null) {
            a.child = f;
            break;
          }
          e = f.sibling, f.sibling = i, i = f, f = e;
        }
        Zu(
          a,
          !0,
          i,
          null,
          h,
          o
        );
        break;
      case "together":
        Zu(
          a,
          !1,
          null,
          null,
          void 0,
          o
        );
        break;
      default:
        a.memoizedState = null;
    }
    return a.child;
  }
  function In(e, a, i) {
    if (e !== null && (a.dependencies = e.dependencies), Ma |= a.lanes, (i & a.childLanes) === 0)
      if (e !== null) {
        if (Yi(
          e,
          a,
          i,
          !1
        ), (i & a.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && a.child !== e.child)
      throw Error(l(153));
    if (a.child !== null) {
      for (e = a.child, i = Kn(e, e.pendingProps), a.child = i, i.return = a; e.sibling !== null; )
        e = e.sibling, i = i.sibling = Kn(e, e.pendingProps), i.return = a;
      i.sibling = null;
    }
    return a.child;
  }
  function Fu(e, a) {
    return (e.lanes & a) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Mo(e)));
  }
  function h5(e, a, i) {
    switch (a.tag) {
      case 3:
        gt(a, a.stateNode.containerInfo), xa(a, re, e.memoizedState.cache), Wa();
        break;
      case 27:
      case 5:
        Dt(a);
        break;
      case 4:
        gt(a, a.stateNode.containerInfo);
        break;
      case 10:
        xa(
          a,
          a.type,
          a.memoizedProps.value
        );
        break;
      case 31:
        if (a.memoizedState !== null)
          return a.flags |= 128, Su(a), null;
        break;
      case 13:
        var o = a.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (Ta(a), a.flags |= 128, null) : (i & a.child.childLanes) !== 0 ? i0(e, a, i) : (Ta(a), e = In(
            e,
            a,
            i
          ), e !== null ? e.sibling : null);
        Ta(a);
        break;
      case 19:
        var f = (e.flags & 128) !== 0;
        if (o = (i & a.childLanes) !== 0, o || (Yi(
          e,
          a,
          i,
          !1
        ), o = (i & a.childLanes) !== 0), f) {
          if (o)
            return l0(
              e,
              a,
              i
            );
          a.flags |= 128;
        }
        if (f = a.memoizedState, f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), tt(le, le.current), o) break;
        return null;
      case 22:
        return a.lanes = 0, W1(
          e,
          a,
          i,
          a.pendingProps
        );
      case 24:
        xa(a, re, e.memoizedState.cache);
    }
    return In(e, a, i);
  }
  function o0(e, a, i) {
    if (e !== null)
      if (e.memoizedProps !== a.pendingProps)
        ue = !0;
      else {
        if (!Fu(e, i) && (a.flags & 128) === 0)
          return ue = !1, h5(
            e,
            a,
            i
          );
        ue = (e.flags & 131072) !== 0;
      }
    else
      ue = !1, Rt && (a.flags & 1048576) !== 0 && kp(a, Xs, a.index);
    switch (a.lanes = 0, a.tag) {
      case 16:
        t: {
          var o = a.pendingProps;
          if (e = ni(a.elementType), a.type = e, typeof e == "function")
            eu(e) ? (o = li(e, o), a.tag = 1, a = n0(
              null,
              a,
              e,
              o,
              i
            )) : (a.tag = 0, a = Yu(
              null,
              a,
              e,
              o,
              i
            ));
          else {
            if (e != null) {
              var f = e.$$typeof;
              if (f === D) {
                a.tag = 11, a = Z1(
                  null,
                  a,
                  e,
                  o,
                  i
                );
                break t;
              } else if (f === E) {
                a.tag = 14, a = F1(
                  null,
                  a,
                  e,
                  o,
                  i
                );
                break t;
              }
            }
            throw a = Q(e) || e, Error(l(306, a, ""));
          }
        }
        return a;
      case 0:
        return Yu(
          e,
          a,
          a.type,
          a.pendingProps,
          i
        );
      case 1:
        return o = a.type, f = li(
          o,
          a.pendingProps
        ), n0(
          e,
          a,
          o,
          f,
          i
        );
      case 3:
        t: {
          if (gt(
            a,
            a.stateNode.containerInfo
          ), e === null) throw Error(l(387));
          o = a.pendingProps;
          var h = a.memoizedState;
          f = h.element, gu(e, a), tl(a, o, null, i);
          var x = a.memoizedState;
          if (o = x.cache, xa(a, re, o), o !== h.cache && uu(
            a,
            [re],
            i,
            !0
          ), Is(), o = x.element, h.isDehydrated)
            if (h = {
              element: o,
              isDehydrated: !1,
              cache: x.cache
            }, a.updateQueue.baseState = h, a.memoizedState = h, a.flags & 256) {
              a = a0(
                e,
                a,
                o,
                i
              );
              break t;
            } else if (o !== f) {
              f = cn(
                Error(l(424)),
                a
              ), Ks(f), a = a0(
                e,
                a,
                o,
                i
              );
              break t;
            } else {
              switch (e = a.stateNode.containerInfo, e.nodeType) {
                case 9:
                  e = e.body;
                  break;
                default:
                  e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
              }
              for (Jt = mn(e.firstChild), je = a, Rt = !0, va = null, dn = !0, i = Wp(
                a,
                null,
                o,
                i
              ), a.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (Wa(), o === f) {
              a = In(
                e,
                a,
                i
              );
              break t;
            }
            Ae(e, a, o, i);
          }
          a = a.child;
        }
        return a;
      case 26:
        return Ko(e, a), e === null ? (i = vg(
          a.type,
          null,
          a.pendingProps,
          null
        )) ? a.memoizedState = i : Rt || (i = a.type, e = a.pendingProps, o = ur(
          rt.current
        ).createElement(i), o[Te] = a, o[ze] = e, Me(o, i, e), be(o), a.stateNode = o) : a.memoizedState = vg(
          a.type,
          e.memoizedProps,
          a.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Dt(a), e === null && Rt && (o = a.stateNode = pg(
          a.type,
          a.pendingProps,
          rt.current
        ), je = a, dn = !0, f = Jt, Oa(a.type) ? (Df = f, Jt = mn(o.firstChild)) : Jt = f), Ae(
          e,
          a,
          a.pendingProps.children,
          i
        ), Ko(e, a), e === null && (a.flags |= 4194304), a.child;
      case 5:
        return e === null && Rt && ((f = o = Jt) && (o = Y5(
          o,
          a.type,
          a.pendingProps,
          dn
        ), o !== null ? (a.stateNode = o, je = a, Jt = mn(o.firstChild), dn = !1, f = !0) : f = !1), f || ba(a)), Dt(a), f = a.type, h = a.pendingProps, x = e !== null ? e.memoizedProps : null, o = h.children, jf(f, h) ? o = null : x !== null && jf(f, x) && (a.flags |= 32), a.memoizedState !== null && (f = Cu(
          e,
          a,
          i5,
          null,
          null,
          i
        ), xl._currentValue = f), Ko(e, a), Ae(e, a, o, i), a.child;
      case 6:
        return e === null && Rt && ((e = i = Jt) && (i = G5(
          i,
          a.pendingProps,
          dn
        ), i !== null ? (a.stateNode = i, je = a, Jt = null, e = !0) : e = !1), e || ba(a)), null;
      case 13:
        return i0(e, a, i);
      case 4:
        return gt(
          a,
          a.stateNode.containerInfo
        ), o = a.pendingProps, e === null ? a.child = ii(
          a,
          null,
          o,
          i
        ) : Ae(e, a, o, i), a.child;
      case 11:
        return Z1(
          e,
          a,
          a.type,
          a.pendingProps,
          i
        );
      case 7:
        return Ae(
          e,
          a,
          a.pendingProps,
          i
        ), a.child;
      case 8:
        return Ae(
          e,
          a,
          a.pendingProps.children,
          i
        ), a.child;
      case 12:
        return Ae(
          e,
          a,
          a.pendingProps.children,
          i
        ), a.child;
      case 10:
        return o = a.pendingProps, xa(a, a.type, o.value), Ae(e, a, o.children, i), a.child;
      case 9:
        return f = a.type._context, o = a.pendingProps.children, ti(a), f = Ee(f), o = o(f), a.flags |= 1, Ae(e, a, o, i), a.child;
      case 14:
        return F1(
          e,
          a,
          a.type,
          a.pendingProps,
          i
        );
      case 15:
        return J1(
          e,
          a,
          a.type,
          a.pendingProps,
          i
        );
      case 19:
        return l0(e, a, i);
      case 31:
        return d5(e, a, i);
      case 22:
        return W1(
          e,
          a,
          i,
          a.pendingProps
        );
      case 24:
        return ti(a), o = Ee(re), e === null ? (f = hu(), f === null && (f = Qt, h = fu(), f.pooledCache = h, h.refCount++, h !== null && (f.pooledCacheLanes |= i), f = h), a.memoizedState = { parent: o, cache: f }, pu(a), xa(a, re, f)) : ((e.lanes & i) !== 0 && (gu(e, a), tl(a, null, null, i), Is()), f = e.memoizedState, h = a.memoizedState, f.parent !== o ? (f = { parent: o, cache: o }, a.memoizedState = f, a.lanes === 0 && (a.memoizedState = a.updateQueue.baseState = f), xa(a, re, o)) : (o = h.cache, xa(a, re, o), o !== f.cache && uu(
          a,
          [re],
          i,
          !0
        ))), Ae(
          e,
          a,
          a.pendingProps.children,
          i
        ), a.child;
      case 29:
        throw a.pendingProps;
    }
    throw Error(l(156, a.tag));
  }
  function ta(e) {
    e.flags |= 4;
  }
  function Ju(e, a, i, o, f) {
    if ((a = (e.mode & 32) !== 0) && (a = !1), a) {
      if (e.flags |= 16777216, (f & 335544128) === f)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (L0()) e.flags |= 8192;
        else
          throw ai = No, mu;
    } else e.flags &= -16777217;
  }
  function r0(e, a) {
    if (a.type !== "stylesheet" || (a.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Cg(a))
      if (L0()) e.flags |= 8192;
      else
        throw ai = No, mu;
  }
  function Zo(e, a) {
    a !== null && (e.flags |= 4), e.flags & 16384 && (a = e.tag !== 22 ? Hm() : 536870912, e.lanes |= a, es |= a);
  }
  function ll(e, a) {
    if (!Rt)
      switch (e.tailMode) {
        case "hidden":
          a = e.tail;
          for (var i = null; a !== null; )
            a.alternate !== null && (i = a), a = a.sibling;
          i === null ? e.tail = null : i.sibling = null;
          break;
        case "collapsed":
          i = e.tail;
          for (var o = null; i !== null; )
            i.alternate !== null && (o = i), i = i.sibling;
          o === null ? a || e.tail === null ? e.tail = null : e.tail.sibling = null : o.sibling = null;
      }
  }
  function Wt(e) {
    var a = e.alternate !== null && e.alternate.child === e.child, i = 0, o = 0;
    if (a)
      for (var f = e.child; f !== null; )
        i |= f.lanes | f.childLanes, o |= f.subtreeFlags & 65011712, o |= f.flags & 65011712, f.return = e, f = f.sibling;
    else
      for (f = e.child; f !== null; )
        i |= f.lanes | f.childLanes, o |= f.subtreeFlags, o |= f.flags, f.return = e, f = f.sibling;
    return e.subtreeFlags |= o, e.childLanes = i, a;
  }
  function m5(e, a, i) {
    var o = a.pendingProps;
    switch (su(a), a.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Wt(a), null;
      case 1:
        return Wt(a), null;
      case 3:
        return i = a.stateNode, o = null, e !== null && (o = e.memoizedState.cache), a.memoizedState.cache !== o && (a.flags |= 2048), Fn(re), bt(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (e === null || e.child === null) && (qi(a) ? ta(a) : e === null || e.memoizedState.isDehydrated && (a.flags & 256) === 0 || (a.flags |= 1024, ou())), Wt(a), null;
      case 26:
        var f = a.type, h = a.memoizedState;
        return e === null ? (ta(a), h !== null ? (Wt(a), r0(a, h)) : (Wt(a), Ju(
          a,
          f,
          null,
          o,
          i
        ))) : h ? h !== e.memoizedState ? (ta(a), Wt(a), r0(a, h)) : (Wt(a), a.flags &= -16777217) : (e = e.memoizedProps, e !== o && ta(a), Wt(a), Ju(
          a,
          f,
          e,
          o,
          i
        )), null;
      case 27:
        if (Ot(a), i = rt.current, f = a.type, e !== null && a.stateNode != null)
          e.memoizedProps !== o && ta(a);
        else {
          if (!o) {
            if (a.stateNode === null)
              throw Error(l(166));
            return Wt(a), null;
          }
          e = lt.current, qi(a) ? Hp(a) : (e = pg(f, o, i), a.stateNode = e, ta(a));
        }
        return Wt(a), null;
      case 5:
        if (Ot(a), f = a.type, e !== null && a.stateNode != null)
          e.memoizedProps !== o && ta(a);
        else {
          if (!o) {
            if (a.stateNode === null)
              throw Error(l(166));
            return Wt(a), null;
          }
          if (h = lt.current, qi(a))
            Hp(a);
          else {
            var x = ur(
              rt.current
            );
            switch (h) {
              case 1:
                h = x.createElementNS(
                  "http://www.w3.org/2000/svg",
                  f
                );
                break;
              case 2:
                h = x.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  f
                );
                break;
              default:
                switch (f) {
                  case "svg":
                    h = x.createElementNS(
                      "http://www.w3.org/2000/svg",
                      f
                    );
                    break;
                  case "math":
                    h = x.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      f
                    );
                    break;
                  case "script":
                    h = x.createElement("div"), h.innerHTML = "<script><\/script>", h = h.removeChild(
                      h.firstChild
                    );
                    break;
                  case "select":
                    h = typeof o.is == "string" ? x.createElement("select", {
                      is: o.is
                    }) : x.createElement("select"), o.multiple ? h.multiple = !0 : o.size && (h.size = o.size);
                    break;
                  default:
                    h = typeof o.is == "string" ? x.createElement(f, { is: o.is }) : x.createElement(f);
                }
            }
            h[Te] = a, h[ze] = o;
            t: for (x = a.child; x !== null; ) {
              if (x.tag === 5 || x.tag === 6)
                h.appendChild(x.stateNode);
              else if (x.tag !== 4 && x.tag !== 27 && x.child !== null) {
                x.child.return = x, x = x.child;
                continue;
              }
              if (x === a) break t;
              for (; x.sibling === null; ) {
                if (x.return === null || x.return === a)
                  break t;
                x = x.return;
              }
              x.sibling.return = x.return, x = x.sibling;
            }
            a.stateNode = h;
            t: switch (Me(h, f, o), f) {
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
            o && ta(a);
          }
        }
        return Wt(a), Ju(
          a,
          a.type,
          e === null ? null : e.memoizedProps,
          a.pendingProps,
          i
        ), null;
      case 6:
        if (e && a.stateNode != null)
          e.memoizedProps !== o && ta(a);
        else {
          if (typeof o != "string" && a.stateNode === null)
            throw Error(l(166));
          if (e = rt.current, qi(a)) {
            if (e = a.stateNode, i = a.memoizedProps, o = null, f = je, f !== null)
              switch (f.tag) {
                case 27:
                case 5:
                  o = f.memoizedProps;
              }
            e[Te] = a, e = !!(e.nodeValue === i || o !== null && o.suppressHydrationWarning === !0 || ig(e.nodeValue, i)), e || ba(a, !0);
          } else
            e = ur(e).createTextNode(
              o
            ), e[Te] = a, a.stateNode = e;
        }
        return Wt(a), null;
      case 31:
        if (i = a.memoizedState, e === null || e.memoizedState !== null) {
          if (o = qi(a), i !== null) {
            if (e === null) {
              if (!o) throw Error(l(318));
              if (e = a.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(557));
              e[Te] = a;
            } else
              Wa(), (a.flags & 128) === 0 && (a.memoizedState = null), a.flags |= 4;
            Wt(a), e = !1;
          } else
            i = ou(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = i), e = !0;
          if (!e)
            return a.flags & 256 ? (We(a), a) : (We(a), null);
          if ((a.flags & 128) !== 0)
            throw Error(l(558));
        }
        return Wt(a), null;
      case 13:
        if (o = a.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (f = qi(a), o !== null && o.dehydrated !== null) {
            if (e === null) {
              if (!f) throw Error(l(318));
              if (f = a.memoizedState, f = f !== null ? f.dehydrated : null, !f) throw Error(l(317));
              f[Te] = a;
            } else
              Wa(), (a.flags & 128) === 0 && (a.memoizedState = null), a.flags |= 4;
            Wt(a), f = !1;
          } else
            f = ou(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = f), f = !0;
          if (!f)
            return a.flags & 256 ? (We(a), a) : (We(a), null);
        }
        return We(a), (a.flags & 128) !== 0 ? (a.lanes = i, a) : (i = o !== null, e = e !== null && e.memoizedState !== null, i && (o = a.child, f = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (f = o.alternate.memoizedState.cachePool.pool), h = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (h = o.memoizedState.cachePool.pool), h !== f && (o.flags |= 2048)), i !== e && i && (a.child.flags |= 8192), Zo(a, a.updateQueue), Wt(a), null);
      case 4:
        return bt(), e === null && xf(a.stateNode.containerInfo), Wt(a), null;
      case 10:
        return Fn(a.type), Wt(a), null;
      case 19:
        if (q(le), o = a.memoizedState, o === null) return Wt(a), null;
        if (f = (a.flags & 128) !== 0, h = o.rendering, h === null)
          if (f) ll(o, !1);
          else {
            if (ie !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = a.child; e !== null; ) {
                if (h = Bo(e), h !== null) {
                  for (a.flags |= 128, ll(o, !1), e = h.updateQueue, a.updateQueue = e, Zo(a, e), a.subtreeFlags = 0, e = i, i = a.child; i !== null; )
                    Bp(i, e), i = i.sibling;
                  return tt(
                    le,
                    le.current & 1 | 2
                  ), Rt && Qn(a, o.treeForkCount), a.child;
                }
                e = e.sibling;
              }
            o.tail !== null && Kt() > tr && (a.flags |= 128, f = !0, ll(o, !1), a.lanes = 4194304);
          }
        else {
          if (!f)
            if (e = Bo(h), e !== null) {
              if (a.flags |= 128, f = !0, e = e.updateQueue, a.updateQueue = e, Zo(a, e), ll(o, !0), o.tail === null && o.tailMode === "hidden" && !h.alternate && !Rt)
                return Wt(a), null;
            } else
              2 * Kt() - o.renderingStartTime > tr && i !== 536870912 && (a.flags |= 128, f = !0, ll(o, !1), a.lanes = 4194304);
          o.isBackwards ? (h.sibling = a.child, a.child = h) : (e = o.last, e !== null ? e.sibling = h : a.child = h, o.last = h);
        }
        return o.tail !== null ? (e = o.tail, o.rendering = e, o.tail = e.sibling, o.renderingStartTime = Kt(), e.sibling = null, i = le.current, tt(
          le,
          f ? i & 1 | 2 : i & 1
        ), Rt && Qn(a, o.treeForkCount), e) : (Wt(a), null);
      case 22:
      case 23:
        return We(a), xu(), o = a.memoizedState !== null, e !== null ? e.memoizedState !== null !== o && (a.flags |= 8192) : o && (a.flags |= 8192), o ? (i & 536870912) !== 0 && (a.flags & 128) === 0 && (Wt(a), a.subtreeFlags & 6 && (a.flags |= 8192)) : Wt(a), i = a.updateQueue, i !== null && Zo(a, i.retryQueue), i = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), o = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (o = a.memoizedState.cachePool.pool), o !== i && (a.flags |= 2048), e !== null && q(ei), null;
      case 24:
        return i = null, e !== null && (i = e.memoizedState.cache), a.memoizedState.cache !== i && (a.flags |= 2048), Fn(re), Wt(a), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, a.tag));
  }
  function p5(e, a) {
    switch (su(a), a.tag) {
      case 1:
        return e = a.flags, e & 65536 ? (a.flags = e & -65537 | 128, a) : null;
      case 3:
        return Fn(re), bt(), e = a.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (a.flags = e & -65537 | 128, a) : null;
      case 26:
      case 27:
      case 5:
        return Ot(a), null;
      case 31:
        if (a.memoizedState !== null) {
          if (We(a), a.alternate === null)
            throw Error(l(340));
          Wa();
        }
        return e = a.flags, e & 65536 ? (a.flags = e & -65537 | 128, a) : null;
      case 13:
        if (We(a), e = a.memoizedState, e !== null && e.dehydrated !== null) {
          if (a.alternate === null)
            throw Error(l(340));
          Wa();
        }
        return e = a.flags, e & 65536 ? (a.flags = e & -65537 | 128, a) : null;
      case 19:
        return q(le), null;
      case 4:
        return bt(), null;
      case 10:
        return Fn(a.type), null;
      case 22:
      case 23:
        return We(a), xu(), e !== null && q(ei), e = a.flags, e & 65536 ? (a.flags = e & -65537 | 128, a) : null;
      case 24:
        return Fn(re), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function c0(e, a) {
    switch (su(a), a.tag) {
      case 3:
        Fn(re), bt();
        break;
      case 26:
      case 27:
      case 5:
        Ot(a);
        break;
      case 4:
        bt();
        break;
      case 31:
        a.memoizedState !== null && We(a);
        break;
      case 13:
        We(a);
        break;
      case 19:
        q(le);
        break;
      case 10:
        Fn(a.type);
        break;
      case 22:
      case 23:
        We(a), xu(), e !== null && q(ei);
        break;
      case 24:
        Fn(re);
    }
  }
  function ol(e, a) {
    try {
      var i = a.updateQueue, o = i !== null ? i.lastEffect : null;
      if (o !== null) {
        var f = o.next;
        i = f;
        do {
          if ((i.tag & e) === e) {
            o = void 0;
            var h = i.create, x = i.inst;
            o = h(), x.destroy = o;
          }
          i = i.next;
        } while (i !== f);
      }
    } catch (A) {
      kt(a, a.return, A);
    }
  }
  function Ea(e, a, i) {
    try {
      var o = a.updateQueue, f = o !== null ? o.lastEffect : null;
      if (f !== null) {
        var h = f.next;
        o = h;
        do {
          if ((o.tag & e) === e) {
            var x = o.inst, A = x.destroy;
            if (A !== void 0) {
              x.destroy = void 0, f = a;
              var B = i, P = A;
              try {
                P();
              } catch (I) {
                kt(
                  f,
                  B,
                  I
                );
              }
            }
          }
          o = o.next;
        } while (o !== h);
      }
    } catch (I) {
      kt(a, a.return, I);
    }
  }
  function u0(e) {
    var a = e.updateQueue;
    if (a !== null) {
      var i = e.stateNode;
      try {
        t1(a, i);
      } catch (o) {
        kt(e, e.return, o);
      }
    }
  }
  function f0(e, a, i) {
    i.props = li(
      e.type,
      e.memoizedProps
    ), i.state = e.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (o) {
      kt(e, a, o);
    }
  }
  function rl(e, a) {
    try {
      var i = e.ref;
      if (i !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var o = e.stateNode;
            break;
          case 30:
            o = e.stateNode;
            break;
          default:
            o = e.stateNode;
        }
        typeof i == "function" ? e.refCleanup = i(o) : i.current = o;
      }
    } catch (f) {
      kt(e, a, f);
    }
  }
  function Ln(e, a) {
    var i = e.ref, o = e.refCleanup;
    if (i !== null)
      if (typeof o == "function")
        try {
          o();
        } catch (f) {
          kt(e, a, f);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (f) {
          kt(e, a, f);
        }
      else i.current = null;
  }
  function d0(e) {
    var a = e.type, i = e.memoizedProps, o = e.stateNode;
    try {
      t: switch (a) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          i.autoFocus && o.focus();
          break t;
        case "img":
          i.src ? o.src = i.src : i.srcSet && (o.srcset = i.srcSet);
      }
    } catch (f) {
      kt(e, e.return, f);
    }
  }
  function Wu(e, a, i) {
    try {
      var o = e.stateNode;
      z5(o, e.type, i, a), o[ze] = a;
    } catch (f) {
      kt(e, e.return, f);
    }
  }
  function h0(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Oa(e.type) || e.tag === 4;
  }
  function Iu(e) {
    t: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || h0(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Oa(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue t;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function tf(e, a, i) {
    var o = e.tag;
    if (o === 5 || o === 6)
      e = e.stateNode, a ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(e, a) : (a = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, a.appendChild(e), i = i._reactRootContainer, i != null || a.onclick !== null || (a.onclick = Pn));
    else if (o !== 4 && (o === 27 && Oa(e.type) && (i = e.stateNode, a = null), e = e.child, e !== null))
      for (tf(e, a, i), e = e.sibling; e !== null; )
        tf(e, a, i), e = e.sibling;
  }
  function Fo(e, a, i) {
    var o = e.tag;
    if (o === 5 || o === 6)
      e = e.stateNode, a ? i.insertBefore(e, a) : i.appendChild(e);
    else if (o !== 4 && (o === 27 && Oa(e.type) && (i = e.stateNode), e = e.child, e !== null))
      for (Fo(e, a, i), e = e.sibling; e !== null; )
        Fo(e, a, i), e = e.sibling;
  }
  function m0(e) {
    var a = e.stateNode, i = e.memoizedProps;
    try {
      for (var o = e.type, f = a.attributes; f.length; )
        a.removeAttributeNode(f[0]);
      Me(a, o, i), a[Te] = e, a[ze] = i;
    } catch (h) {
      kt(e, e.return, h);
    }
  }
  var ea = !1, fe = !1, ef = !1, p0 = typeof WeakSet == "function" ? WeakSet : Set, xe = null;
  function g5(e, a) {
    if (e = e.containerInfo, Cf = yr, e = Ap(e), Qc(e)) {
      if ("selectionStart" in e)
        var i = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        t: {
          i = (i = e.ownerDocument) && i.defaultView || window;
          var o = i.getSelection && i.getSelection();
          if (o && o.rangeCount !== 0) {
            i = o.anchorNode;
            var f = o.anchorOffset, h = o.focusNode;
            o = o.focusOffset;
            try {
              i.nodeType, h.nodeType;
            } catch {
              i = null;
              break t;
            }
            var x = 0, A = -1, B = -1, P = 0, I = 0, st = e, K = null;
            e: for (; ; ) {
              for (var Z; st !== i || f !== 0 && st.nodeType !== 3 || (A = x + f), st !== h || o !== 0 && st.nodeType !== 3 || (B = x + o), st.nodeType === 3 && (x += st.nodeValue.length), (Z = st.firstChild) !== null; )
                K = st, st = Z;
              for (; ; ) {
                if (st === e) break e;
                if (K === i && ++P === f && (A = x), K === h && ++I === o && (B = x), (Z = st.nextSibling) !== null) break;
                st = K, K = st.parentNode;
              }
              st = Z;
            }
            i = A === -1 || B === -1 ? null : { start: A, end: B };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Tf = { focusedElem: e, selectionRange: i }, yr = !1, xe = a; xe !== null; )
      if (a = xe, e = a.child, (a.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = a, xe = e;
      else
        for (; xe !== null; ) {
          switch (a = xe, h = a.alternate, e = a.flags, a.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = a.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (i = 0; i < e.length; i++)
                  f = e[i], f.ref.impl = f.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && h !== null) {
                e = void 0, i = a, f = h.memoizedProps, h = h.memoizedState, o = i.stateNode;
                try {
                  var dt = li(
                    i.type,
                    f
                  );
                  e = o.getSnapshotBeforeUpdate(
                    dt,
                    h
                  ), o.__reactInternalSnapshotBeforeUpdate = e;
                } catch (vt) {
                  kt(
                    i,
                    i.return,
                    vt
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = a.stateNode.containerInfo, i = e.nodeType, i === 9)
                  Af(e);
                else if (i === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Af(e);
                      break;
                    default:
                      e.textContent = "";
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
              if ((e & 1024) !== 0) throw Error(l(163));
          }
          if (e = a.sibling, e !== null) {
            e.return = a.return, xe = e;
            break;
          }
          xe = a.return;
        }
  }
  function g0(e, a, i) {
    var o = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        aa(e, i), o & 4 && ol(5, i);
        break;
      case 1:
        if (aa(e, i), o & 4)
          if (e = i.stateNode, a === null)
            try {
              e.componentDidMount();
            } catch (x) {
              kt(i, i.return, x);
            }
          else {
            var f = li(
              i.type,
              a.memoizedProps
            );
            a = a.memoizedState;
            try {
              e.componentDidUpdate(
                f,
                a,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (x) {
              kt(
                i,
                i.return,
                x
              );
            }
          }
        o & 64 && u0(i), o & 512 && rl(i, i.return);
        break;
      case 3:
        if (aa(e, i), o & 64 && (e = i.updateQueue, e !== null)) {
          if (a = null, i.child !== null)
            switch (i.child.tag) {
              case 27:
              case 5:
                a = i.child.stateNode;
                break;
              case 1:
                a = i.child.stateNode;
            }
          try {
            t1(e, a);
          } catch (x) {
            kt(i, i.return, x);
          }
        }
        break;
      case 27:
        a === null && o & 4 && m0(i);
      case 26:
      case 5:
        aa(e, i), a === null && o & 4 && d0(i), o & 512 && rl(i, i.return);
        break;
      case 12:
        aa(e, i);
        break;
      case 31:
        aa(e, i), o & 4 && b0(e, i);
        break;
      case 13:
        aa(e, i), o & 4 && x0(e, i), o & 64 && (e = i.memoizedState, e !== null && (e = e.dehydrated, e !== null && (i = j5.bind(
          null,
          i
        ), P5(e, i))));
        break;
      case 22:
        if (o = i.memoizedState !== null || ea, !o) {
          a = a !== null && a.memoizedState !== null || fe, f = ea;
          var h = fe;
          ea = o, (fe = a) && !h ? ia(
            e,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : aa(e, i), ea = f, fe = h;
        }
        break;
      case 30:
        break;
      default:
        aa(e, i);
    }
  }
  function y0(e) {
    var a = e.alternate;
    a !== null && (e.alternate = null, y0(a)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (a = e.stateNode, a !== null && Rc(a)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var te = null, ke = !1;
  function na(e, a, i) {
    for (i = i.child; i !== null; )
      v0(e, a, i), i = i.sibling;
  }
  function v0(e, a, i) {
    if (Ke && typeof Ke.onCommitFiberUnmount == "function")
      try {
        Ke.onCommitFiberUnmount(Ns, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        fe || Ln(i, a), na(
          e,
          a,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        fe || Ln(i, a);
        var o = te, f = ke;
        Oa(i.type) && (te = i.stateNode, ke = !1), na(
          e,
          a,
          i
        ), yl(i.stateNode), te = o, ke = f;
        break;
      case 5:
        fe || Ln(i, a);
      case 6:
        if (o = te, f = ke, te = null, na(
          e,
          a,
          i
        ), te = o, ke = f, te !== null)
          if (ke)
            try {
              (te.nodeType === 9 ? te.body : te.nodeName === "HTML" ? te.ownerDocument.body : te).removeChild(i.stateNode);
            } catch (h) {
              kt(
                i,
                a,
                h
              );
            }
          else
            try {
              te.removeChild(i.stateNode);
            } catch (h) {
              kt(
                i,
                a,
                h
              );
            }
        break;
      case 18:
        te !== null && (ke ? (e = te, ug(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          i.stateNode
        ), cs(e)) : ug(te, i.stateNode));
        break;
      case 4:
        o = te, f = ke, te = i.stateNode.containerInfo, ke = !0, na(
          e,
          a,
          i
        ), te = o, ke = f;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Ea(2, i, a), fe || Ea(4, i, a), na(
          e,
          a,
          i
        );
        break;
      case 1:
        fe || (Ln(i, a), o = i.stateNode, typeof o.componentWillUnmount == "function" && f0(
          i,
          a,
          o
        )), na(
          e,
          a,
          i
        );
        break;
      case 21:
        na(
          e,
          a,
          i
        );
        break;
      case 22:
        fe = (o = fe) || i.memoizedState !== null, na(
          e,
          a,
          i
        ), fe = o;
        break;
      default:
        na(
          e,
          a,
          i
        );
    }
  }
  function b0(e, a) {
    if (a.memoizedState === null && (e = a.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        cs(e);
      } catch (i) {
        kt(a, a.return, i);
      }
    }
  }
  function x0(e, a) {
    if (a.memoizedState === null && (e = a.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        cs(e);
      } catch (i) {
        kt(a, a.return, i);
      }
  }
  function y5(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var a = e.stateNode;
        return a === null && (a = e.stateNode = new p0()), a;
      case 22:
        return e = e.stateNode, a = e._retryCache, a === null && (a = e._retryCache = new p0()), a;
      default:
        throw Error(l(435, e.tag));
    }
  }
  function Jo(e, a) {
    var i = y5(e);
    a.forEach(function(o) {
      if (!i.has(o)) {
        i.add(o);
        var f = E5.bind(null, e, o);
        o.then(f, f);
      }
    });
  }
  function Ue(e, a) {
    var i = a.deletions;
    if (i !== null)
      for (var o = 0; o < i.length; o++) {
        var f = i[o], h = e, x = a, A = x;
        t: for (; A !== null; ) {
          switch (A.tag) {
            case 27:
              if (Oa(A.type)) {
                te = A.stateNode, ke = !1;
                break t;
              }
              break;
            case 5:
              te = A.stateNode, ke = !1;
              break t;
            case 3:
            case 4:
              te = A.stateNode.containerInfo, ke = !0;
              break t;
          }
          A = A.return;
        }
        if (te === null) throw Error(l(160));
        v0(h, x, f), te = null, ke = !1, h = f.alternate, h !== null && (h.return = null), f.return = null;
      }
    if (a.subtreeFlags & 13886)
      for (a = a.child; a !== null; )
        S0(a, e), a = a.sibling;
  }
  var wn = null;
  function S0(e, a) {
    var i = e.alternate, o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Ue(a, e), He(e), o & 4 && (Ea(3, e, e.return), ol(3, e), Ea(5, e, e.return));
        break;
      case 1:
        Ue(a, e), He(e), o & 512 && (fe || i === null || Ln(i, i.return)), o & 64 && ea && (e = e.updateQueue, e !== null && (o = e.callbacks, o !== null && (i = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = i === null ? o : i.concat(o))));
        break;
      case 26:
        var f = wn;
        if (Ue(a, e), He(e), o & 512 && (fe || i === null || Ln(i, i.return)), o & 4) {
          var h = i !== null ? i.memoizedState : null;
          if (o = e.memoizedState, i === null)
            if (o === null)
              if (e.stateNode === null) {
                t: {
                  o = e.type, i = e.memoizedProps, f = f.ownerDocument || f;
                  e: switch (o) {
                    case "title":
                      h = f.getElementsByTagName("title")[0], (!h || h[$s] || h[Te] || h.namespaceURI === "http://www.w3.org/2000/svg" || h.hasAttribute("itemprop")) && (h = f.createElement(o), f.head.insertBefore(
                        h,
                        f.querySelector("head > title")
                      )), Me(h, o, i), h[Te] = e, be(h), o = h;
                      break t;
                    case "link":
                      var x = Sg(
                        "link",
                        "href",
                        f
                      ).get(o + (i.href || ""));
                      if (x) {
                        for (var A = 0; A < x.length; A++)
                          if (h = x[A], h.getAttribute("href") === (i.href == null || i.href === "" ? null : i.href) && h.getAttribute("rel") === (i.rel == null ? null : i.rel) && h.getAttribute("title") === (i.title == null ? null : i.title) && h.getAttribute("crossorigin") === (i.crossOrigin == null ? null : i.crossOrigin)) {
                            x.splice(A, 1);
                            break e;
                          }
                      }
                      h = f.createElement(o), Me(h, o, i), f.head.appendChild(h);
                      break;
                    case "meta":
                      if (x = Sg(
                        "meta",
                        "content",
                        f
                      ).get(o + (i.content || ""))) {
                        for (A = 0; A < x.length; A++)
                          if (h = x[A], h.getAttribute("content") === (i.content == null ? null : "" + i.content) && h.getAttribute("name") === (i.name == null ? null : i.name) && h.getAttribute("property") === (i.property == null ? null : i.property) && h.getAttribute("http-equiv") === (i.httpEquiv == null ? null : i.httpEquiv) && h.getAttribute("charset") === (i.charSet == null ? null : i.charSet)) {
                            x.splice(A, 1);
                            break e;
                          }
                      }
                      h = f.createElement(o), Me(h, o, i), f.head.appendChild(h);
                      break;
                    default:
                      throw Error(l(468, o));
                  }
                  h[Te] = e, be(h), o = h;
                }
                e.stateNode = o;
              } else
                wg(
                  f,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = xg(
                f,
                o,
                e.memoizedProps
              );
          else
            h !== o ? (h === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : h.count--, o === null ? wg(
              f,
              e.type,
              e.stateNode
            ) : xg(
              f,
              o,
              e.memoizedProps
            )) : o === null && e.stateNode !== null && Wu(
              e,
              e.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        Ue(a, e), He(e), o & 512 && (fe || i === null || Ln(i, i.return)), i !== null && o & 4 && Wu(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (Ue(a, e), He(e), o & 512 && (fe || i === null || Ln(i, i.return)), e.flags & 32) {
          f = e.stateNode;
          try {
            Ni(f, "");
          } catch (dt) {
            kt(e, e.return, dt);
          }
        }
        o & 4 && e.stateNode != null && (f = e.memoizedProps, Wu(
          e,
          f,
          i !== null ? i.memoizedProps : f
        )), o & 1024 && (ef = !0);
        break;
      case 6:
        if (Ue(a, e), He(e), o & 4) {
          if (e.stateNode === null)
            throw Error(l(162));
          o = e.memoizedProps, i = e.stateNode;
          try {
            i.nodeValue = o;
          } catch (dt) {
            kt(e, e.return, dt);
          }
        }
        break;
      case 3:
        if (hr = null, f = wn, wn = fr(a.containerInfo), Ue(a, e), wn = f, He(e), o & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            cs(a.containerInfo);
          } catch (dt) {
            kt(e, e.return, dt);
          }
        ef && (ef = !1, w0(e));
        break;
      case 4:
        o = wn, wn = fr(
          e.stateNode.containerInfo
        ), Ue(a, e), He(e), wn = o;
        break;
      case 12:
        Ue(a, e), He(e);
        break;
      case 31:
        Ue(a, e), He(e), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, Jo(e, o)));
        break;
      case 13:
        Ue(a, e), He(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (Io = Kt()), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, Jo(e, o)));
        break;
      case 22:
        f = e.memoizedState !== null;
        var B = i !== null && i.memoizedState !== null, P = ea, I = fe;
        if (ea = P || f, fe = I || B, Ue(a, e), fe = I, ea = P, He(e), o & 8192)
          t: for (a = e.stateNode, a._visibility = f ? a._visibility & -2 : a._visibility | 1, f && (i === null || B || ea || fe || oi(e)), i = null, a = e; ; ) {
            if (a.tag === 5 || a.tag === 26) {
              if (i === null) {
                B = i = a;
                try {
                  if (h = B.stateNode, f)
                    x = h.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
                  else {
                    A = B.stateNode;
                    var st = B.memoizedProps.style, K = st != null && st.hasOwnProperty("display") ? st.display : null;
                    A.style.display = K == null || typeof K == "boolean" ? "" : ("" + K).trim();
                  }
                } catch (dt) {
                  kt(B, B.return, dt);
                }
              }
            } else if (a.tag === 6) {
              if (i === null) {
                B = a;
                try {
                  B.stateNode.nodeValue = f ? "" : B.memoizedProps;
                } catch (dt) {
                  kt(B, B.return, dt);
                }
              }
            } else if (a.tag === 18) {
              if (i === null) {
                B = a;
                try {
                  var Z = B.stateNode;
                  f ? fg(Z, !0) : fg(B.stateNode, !1);
                } catch (dt) {
                  kt(B, B.return, dt);
                }
              }
            } else if ((a.tag !== 22 && a.tag !== 23 || a.memoizedState === null || a === e) && a.child !== null) {
              a.child.return = a, a = a.child;
              continue;
            }
            if (a === e) break t;
            for (; a.sibling === null; ) {
              if (a.return === null || a.return === e) break t;
              i === a && (i = null), a = a.return;
            }
            i === a && (i = null), a.sibling.return = a.return, a = a.sibling;
          }
        o & 4 && (o = e.updateQueue, o !== null && (i = o.retryQueue, i !== null && (o.retryQueue = null, Jo(e, i))));
        break;
      case 19:
        Ue(a, e), He(e), o & 4 && (o = e.updateQueue, o !== null && (e.updateQueue = null, Jo(e, o)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Ue(a, e), He(e);
    }
  }
  function He(e) {
    var a = e.flags;
    if (a & 2) {
      try {
        for (var i, o = e.return; o !== null; ) {
          if (h0(o)) {
            i = o;
            break;
          }
          o = o.return;
        }
        if (i == null) throw Error(l(160));
        switch (i.tag) {
          case 27:
            var f = i.stateNode, h = Iu(e);
            Fo(e, h, f);
            break;
          case 5:
            var x = i.stateNode;
            i.flags & 32 && (Ni(x, ""), i.flags &= -33);
            var A = Iu(e);
            Fo(e, A, x);
            break;
          case 3:
          case 4:
            var B = i.stateNode.containerInfo, P = Iu(e);
            tf(
              e,
              P,
              B
            );
            break;
          default:
            throw Error(l(161));
        }
      } catch (I) {
        kt(e, e.return, I);
      }
      e.flags &= -3;
    }
    a & 4096 && (e.flags &= -4097);
  }
  function w0(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var a = e;
        w0(a), a.tag === 5 && a.flags & 1024 && a.stateNode.reset(), e = e.sibling;
      }
  }
  function aa(e, a) {
    if (a.subtreeFlags & 8772)
      for (a = a.child; a !== null; )
        g0(e, a.alternate, a), a = a.sibling;
  }
  function oi(e) {
    for (e = e.child; e !== null; ) {
      var a = e;
      switch (a.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ea(4, a, a.return), oi(a);
          break;
        case 1:
          Ln(a, a.return);
          var i = a.stateNode;
          typeof i.componentWillUnmount == "function" && f0(
            a,
            a.return,
            i
          ), oi(a);
          break;
        case 27:
          yl(a.stateNode);
        case 26:
        case 5:
          Ln(a, a.return), oi(a);
          break;
        case 22:
          a.memoizedState === null && oi(a);
          break;
        case 30:
          oi(a);
          break;
        default:
          oi(a);
      }
      e = e.sibling;
    }
  }
  function ia(e, a, i) {
    for (i = i && (a.subtreeFlags & 8772) !== 0, a = a.child; a !== null; ) {
      var o = a.alternate, f = e, h = a, x = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          ia(
            f,
            h,
            i
          ), ol(4, h);
          break;
        case 1:
          if (ia(
            f,
            h,
            i
          ), o = h, f = o.stateNode, typeof f.componentDidMount == "function")
            try {
              f.componentDidMount();
            } catch (P) {
              kt(o, o.return, P);
            }
          if (o = h, f = o.updateQueue, f !== null) {
            var A = o.stateNode;
            try {
              var B = f.shared.hiddenCallbacks;
              if (B !== null)
                for (f.shared.hiddenCallbacks = null, f = 0; f < B.length; f++)
                  Ip(B[f], A);
            } catch (P) {
              kt(o, o.return, P);
            }
          }
          i && x & 64 && u0(h), rl(h, h.return);
          break;
        case 27:
          m0(h);
        case 26:
        case 5:
          ia(
            f,
            h,
            i
          ), i && o === null && x & 4 && d0(h), rl(h, h.return);
          break;
        case 12:
          ia(
            f,
            h,
            i
          );
          break;
        case 31:
          ia(
            f,
            h,
            i
          ), i && x & 4 && b0(f, h);
          break;
        case 13:
          ia(
            f,
            h,
            i
          ), i && x & 4 && x0(f, h);
          break;
        case 22:
          h.memoizedState === null && ia(
            f,
            h,
            i
          ), rl(h, h.return);
          break;
        case 30:
          break;
        default:
          ia(
            f,
            h,
            i
          );
      }
      a = a.sibling;
    }
  }
  function nf(e, a) {
    var i = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), e = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (e = a.memoizedState.cachePool.pool), e !== i && (e != null && e.refCount++, i != null && Qs(i));
  }
  function af(e, a) {
    e = null, a.alternate !== null && (e = a.alternate.memoizedState.cache), a = a.memoizedState.cache, a !== e && (a.refCount++, e != null && Qs(e));
  }
  function Cn(e, a, i, o) {
    if (a.subtreeFlags & 10256)
      for (a = a.child; a !== null; )
        C0(
          e,
          a,
          i,
          o
        ), a = a.sibling;
  }
  function C0(e, a, i, o) {
    var f = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Cn(
          e,
          a,
          i,
          o
        ), f & 2048 && ol(9, a);
        break;
      case 1:
        Cn(
          e,
          a,
          i,
          o
        );
        break;
      case 3:
        Cn(
          e,
          a,
          i,
          o
        ), f & 2048 && (e = null, a.alternate !== null && (e = a.alternate.memoizedState.cache), a = a.memoizedState.cache, a !== e && (a.refCount++, e != null && Qs(e)));
        break;
      case 12:
        if (f & 2048) {
          Cn(
            e,
            a,
            i,
            o
          ), e = a.stateNode;
          try {
            var h = a.memoizedProps, x = h.id, A = h.onPostCommit;
            typeof A == "function" && A(
              x,
              a.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (B) {
            kt(a, a.return, B);
          }
        } else
          Cn(
            e,
            a,
            i,
            o
          );
        break;
      case 31:
        Cn(
          e,
          a,
          i,
          o
        );
        break;
      case 13:
        Cn(
          e,
          a,
          i,
          o
        );
        break;
      case 23:
        break;
      case 22:
        h = a.stateNode, x = a.alternate, a.memoizedState !== null ? h._visibility & 2 ? Cn(
          e,
          a,
          i,
          o
        ) : cl(e, a) : h._visibility & 2 ? Cn(
          e,
          a,
          i,
          o
        ) : (h._visibility |= 2, Wi(
          e,
          a,
          i,
          o,
          (a.subtreeFlags & 10256) !== 0 || !1
        )), f & 2048 && nf(x, a);
        break;
      case 24:
        Cn(
          e,
          a,
          i,
          o
        ), f & 2048 && af(a.alternate, a);
        break;
      default:
        Cn(
          e,
          a,
          i,
          o
        );
    }
  }
  function Wi(e, a, i, o, f) {
    for (f = f && ((a.subtreeFlags & 10256) !== 0 || !1), a = a.child; a !== null; ) {
      var h = e, x = a, A = i, B = o, P = x.flags;
      switch (x.tag) {
        case 0:
        case 11:
        case 15:
          Wi(
            h,
            x,
            A,
            B,
            f
          ), ol(8, x);
          break;
        case 23:
          break;
        case 22:
          var I = x.stateNode;
          x.memoizedState !== null ? I._visibility & 2 ? Wi(
            h,
            x,
            A,
            B,
            f
          ) : cl(
            h,
            x
          ) : (I._visibility |= 2, Wi(
            h,
            x,
            A,
            B,
            f
          )), f && P & 2048 && nf(
            x.alternate,
            x
          );
          break;
        case 24:
          Wi(
            h,
            x,
            A,
            B,
            f
          ), f && P & 2048 && af(x.alternate, x);
          break;
        default:
          Wi(
            h,
            x,
            A,
            B,
            f
          );
      }
      a = a.sibling;
    }
  }
  function cl(e, a) {
    if (a.subtreeFlags & 10256)
      for (a = a.child; a !== null; ) {
        var i = e, o = a, f = o.flags;
        switch (o.tag) {
          case 22:
            cl(i, o), f & 2048 && nf(
              o.alternate,
              o
            );
            break;
          case 24:
            cl(i, o), f & 2048 && af(o.alternate, o);
            break;
          default:
            cl(i, o);
        }
        a = a.sibling;
      }
  }
  var ul = 8192;
  function Ii(e, a, i) {
    if (e.subtreeFlags & ul)
      for (e = e.child; e !== null; )
        T0(
          e,
          a,
          i
        ), e = e.sibling;
  }
  function T0(e, a, i) {
    switch (e.tag) {
      case 26:
        Ii(
          e,
          a,
          i
        ), e.flags & ul && e.memoizedState !== null && a4(
          i,
          wn,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        Ii(
          e,
          a,
          i
        );
        break;
      case 3:
      case 4:
        var o = wn;
        wn = fr(e.stateNode.containerInfo), Ii(
          e,
          a,
          i
        ), wn = o;
        break;
      case 22:
        e.memoizedState === null && (o = e.alternate, o !== null && o.memoizedState !== null ? (o = ul, ul = 16777216, Ii(
          e,
          a,
          i
        ), ul = o) : Ii(
          e,
          a,
          i
        ));
        break;
      default:
        Ii(
          e,
          a,
          i
        );
    }
  }
  function j0(e) {
    var a = e.alternate;
    if (a !== null && (e = a.child, e !== null)) {
      a.child = null;
      do
        a = e.sibling, e.sibling = null, e = a;
      while (e !== null);
    }
  }
  function fl(e) {
    var a = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (a !== null)
        for (var i = 0; i < a.length; i++) {
          var o = a[i];
          xe = o, A0(
            o,
            e
          );
        }
      j0(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        E0(e), e = e.sibling;
  }
  function E0(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        fl(e), e.flags & 2048 && Ea(9, e, e.return);
        break;
      case 3:
        fl(e);
        break;
      case 12:
        fl(e);
        break;
      case 22:
        var a = e.stateNode;
        e.memoizedState !== null && a._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (a._visibility &= -3, Wo(e)) : fl(e);
        break;
      default:
        fl(e);
    }
  }
  function Wo(e) {
    var a = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (a !== null)
        for (var i = 0; i < a.length; i++) {
          var o = a[i];
          xe = o, A0(
            o,
            e
          );
        }
      j0(e);
    }
    for (e = e.child; e !== null; ) {
      switch (a = e, a.tag) {
        case 0:
        case 11:
        case 15:
          Ea(8, a, a.return), Wo(a);
          break;
        case 22:
          i = a.stateNode, i._visibility & 2 && (i._visibility &= -3, Wo(a));
          break;
        default:
          Wo(a);
      }
      e = e.sibling;
    }
  }
  function A0(e, a) {
    for (; xe !== null; ) {
      var i = xe;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          Ea(8, i, a);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var o = i.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          Qs(i.memoizedState.cache);
      }
      if (o = i.child, o !== null) o.return = i, xe = o;
      else
        t: for (i = e; xe !== null; ) {
          o = xe;
          var f = o.sibling, h = o.return;
          if (y0(o), o === i) {
            xe = null;
            break t;
          }
          if (f !== null) {
            f.return = h, xe = f;
            break t;
          }
          xe = h;
        }
    }
  }
  var v5 = {
    getCacheForType: function(e) {
      var a = Ee(re), i = a.data.get(e);
      return i === void 0 && (i = e(), a.data.set(e, i)), i;
    },
    cacheSignal: function() {
      return Ee(re).controller.signal;
    }
  }, b5 = typeof WeakMap == "function" ? WeakMap : Map, Bt = 0, Qt = null, jt = null, Mt = 0, Vt = 0, Ie = null, Aa = !1, ts = !1, sf = !1, sa = 0, ie = 0, Ma = 0, ri = 0, lf = 0, tn = 0, es = 0, dl = null, qe = null, of = !1, Io = 0, M0 = 0, tr = 1 / 0, er = null, _a = null, pe = 0, Da = null, ns = null, la = 0, rf = 0, cf = null, _0 = null, hl = 0, uf = null;
  function en() {
    return (Bt & 2) !== 0 && Mt !== 0 ? Mt & -Mt : O.T !== null ? gf() : Pm();
  }
  function D0() {
    if (tn === 0)
      if ((Mt & 536870912) === 0 || Rt) {
        var e = ro;
        ro <<= 1, (ro & 3932160) === 0 && (ro = 262144), tn = e;
      } else tn = 536870912;
    return e = Je.current, e !== null && (e.flags |= 32), tn;
  }
  function Ye(e, a, i) {
    (e === Qt && (Vt === 2 || Vt === 9) || e.cancelPendingCommit !== null) && (as(e, 0), Ra(
      e,
      Mt,
      tn,
      !1
    )), Ls(e, i), ((Bt & 2) === 0 || e !== Qt) && (e === Qt && ((Bt & 2) === 0 && (ri |= i), ie === 4 && Ra(
      e,
      Mt,
      tn,
      !1
    )), $n(e));
  }
  function R0(e, a, i) {
    if ((Bt & 6) !== 0) throw Error(l(327));
    var o = !i && (a & 127) === 0 && (a & e.expiredLanes) === 0 || Os(e, a), f = o ? w5(e, a) : df(e, a, !0), h = o;
    do {
      if (f === 0) {
        ts && !o && Ra(e, a, 0, !1);
        break;
      } else {
        if (i = e.current.alternate, h && !x5(i)) {
          f = df(e, a, !1), h = !1;
          continue;
        }
        if (f === 2) {
          if (h = a, e.errorRecoveryDisabledLanes & h)
            var x = 0;
          else
            x = e.pendingLanes & -536870913, x = x !== 0 ? x : x & 536870912 ? 536870912 : 0;
          if (x !== 0) {
            a = x;
            t: {
              var A = e;
              f = dl;
              var B = A.current.memoizedState.isDehydrated;
              if (B && (as(A, x).flags |= 256), x = df(
                A,
                x,
                !1
              ), x !== 2) {
                if (sf && !B) {
                  A.errorRecoveryDisabledLanes |= h, ri |= h, f = 4;
                  break t;
                }
                h = qe, qe = f, h !== null && (qe === null ? qe = h : qe.push.apply(
                  qe,
                  h
                ));
              }
              f = x;
            }
            if (h = !1, f !== 2) continue;
          }
        }
        if (f === 1) {
          as(e, 0), Ra(e, a, 0, !0);
          break;
        }
        t: {
          switch (o = e, h = f, h) {
            case 0:
            case 1:
              throw Error(l(345));
            case 4:
              if ((a & 4194048) !== a) break;
            case 6:
              Ra(
                o,
                a,
                tn,
                !Aa
              );
              break t;
            case 2:
              qe = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(l(329));
          }
          if ((a & 62914560) === a && (f = Io + 300 - Kt(), 10 < f)) {
            if (Ra(
              o,
              a,
              tn,
              !Aa
            ), uo(o, 0, !0) !== 0) break t;
            la = a, o.timeoutHandle = rg(
              N0.bind(
                null,
                o,
                i,
                qe,
                er,
                of,
                a,
                tn,
                ri,
                es,
                Aa,
                h,
                "Throttled",
                -0,
                0
              ),
              f
            );
            break t;
          }
          N0(
            o,
            i,
            qe,
            er,
            of,
            a,
            tn,
            ri,
            es,
            Aa,
            h,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    $n(e);
  }
  function N0(e, a, i, o, f, h, x, A, B, P, I, st, K, Z) {
    if (e.timeoutHandle = -1, st = a.subtreeFlags, st & 8192 || (st & 16785408) === 16785408) {
      st = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Pn
      }, T0(
        a,
        h,
        st
      );
      var dt = (h & 62914560) === h ? Io - Kt() : (h & 4194048) === h ? M0 - Kt() : 0;
      if (dt = i4(
        st,
        dt
      ), dt !== null) {
        la = h, e.cancelPendingCommit = dt(
          U0.bind(
            null,
            e,
            a,
            h,
            i,
            o,
            f,
            x,
            A,
            B,
            I,
            st,
            null,
            K,
            Z
          )
        ), Ra(e, h, x, !P);
        return;
      }
    }
    U0(
      e,
      a,
      h,
      i,
      o,
      f,
      x,
      A,
      B
    );
  }
  function x5(e) {
    for (var a = e; ; ) {
      var i = a.tag;
      if ((i === 0 || i === 11 || i === 15) && a.flags & 16384 && (i = a.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var o = 0; o < i.length; o++) {
          var f = i[o], h = f.getSnapshot;
          f = f.value;
          try {
            if (!Ze(h(), f)) return !1;
          } catch {
            return !1;
          }
        }
      if (i = a.child, a.subtreeFlags & 16384 && i !== null)
        i.return = a, a = i;
      else {
        if (a === e) break;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === e) return !0;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
    }
    return !0;
  }
  function Ra(e, a, i, o) {
    a &= ~lf, a &= ~ri, e.suspendedLanes |= a, e.pingedLanes &= ~a, o && (e.warmLanes |= a), o = e.expirationTimes;
    for (var f = a; 0 < f; ) {
      var h = 31 - Qe(f), x = 1 << h;
      o[h] = -1, f &= ~x;
    }
    i !== 0 && qm(e, i, a);
  }
  function nr() {
    return (Bt & 6) === 0 ? (ml(0), !1) : !0;
  }
  function ff() {
    if (jt !== null) {
      if (Vt === 0)
        var e = jt.return;
      else
        e = jt, Zn = Ia = null, Eu(e), Ki = null, Fs = 0, e = jt;
      for (; e !== null; )
        c0(e.alternate, e), e = e.return;
      jt = null;
    }
  }
  function as(e, a) {
    var i = e.timeoutHandle;
    i !== -1 && (e.timeoutHandle = -1, U5(i)), i = e.cancelPendingCommit, i !== null && (e.cancelPendingCommit = null, i()), la = 0, ff(), Qt = e, jt = i = Kn(e.current, null), Mt = a, Vt = 0, Ie = null, Aa = !1, ts = Os(e, a), sf = !1, es = tn = lf = ri = Ma = ie = 0, qe = dl = null, of = !1, (a & 8) !== 0 && (a |= a & 32);
    var o = e.entangledLanes;
    if (o !== 0)
      for (e = e.entanglements, o &= a; 0 < o; ) {
        var f = 31 - Qe(o), h = 1 << f;
        a |= e[f], o &= ~h;
      }
    return sa = a, Co(), i;
  }
  function O0(e, a) {
    wt = null, O.H = il, a === Xi || a === Ro ? (a = Zp(), Vt = 3) : a === mu ? (a = Zp(), Vt = 4) : Vt = a === qu ? 8 : a !== null && typeof a == "object" && typeof a.then == "function" ? 6 : 1, Ie = a, jt === null && (ie = 1, Po(
      e,
      cn(a, e.current)
    ));
  }
  function L0() {
    var e = Je.current;
    return e === null ? !0 : (Mt & 4194048) === Mt ? hn === null : (Mt & 62914560) === Mt || (Mt & 536870912) !== 0 ? e === hn : !1;
  }
  function $0() {
    var e = O.H;
    return O.H = il, e === null ? il : e;
  }
  function B0() {
    var e = O.A;
    return O.A = v5, e;
  }
  function ar() {
    ie = 4, Aa || (Mt & 4194048) !== Mt && Je.current !== null || (ts = !0), (Ma & 134217727) === 0 && (ri & 134217727) === 0 || Qt === null || Ra(
      Qt,
      Mt,
      tn,
      !1
    );
  }
  function df(e, a, i) {
    var o = Bt;
    Bt |= 2;
    var f = $0(), h = B0();
    (Qt !== e || Mt !== a) && (er = null, as(e, a)), a = !1;
    var x = ie;
    t: do
      try {
        if (Vt !== 0 && jt !== null) {
          var A = jt, B = Ie;
          switch (Vt) {
            case 8:
              ff(), x = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Je.current === null && (a = !0);
              var P = Vt;
              if (Vt = 0, Ie = null, is(e, A, B, P), i && ts) {
                x = 0;
                break t;
              }
              break;
            default:
              P = Vt, Vt = 0, Ie = null, is(e, A, B, P);
          }
        }
        S5(), x = ie;
        break;
      } catch (I) {
        O0(e, I);
      }
    while (!0);
    return a && e.shellSuspendCounter++, Zn = Ia = null, Bt = o, O.H = f, O.A = h, jt === null && (Qt = null, Mt = 0, Co()), x;
  }
  function S5() {
    for (; jt !== null; ) z0(jt);
  }
  function w5(e, a) {
    var i = Bt;
    Bt |= 2;
    var o = $0(), f = B0();
    Qt !== e || Mt !== a ? (er = null, tr = Kt() + 500, as(e, a)) : ts = Os(
      e,
      a
    );
    t: do
      try {
        if (Vt !== 0 && jt !== null) {
          a = jt;
          var h = Ie;
          e: switch (Vt) {
            case 1:
              Vt = 0, Ie = null, is(e, a, h, 1);
              break;
            case 2:
            case 9:
              if (Kp(h)) {
                Vt = 0, Ie = null, V0(a);
                break;
              }
              a = function() {
                Vt !== 2 && Vt !== 9 || Qt !== e || (Vt = 7), $n(e);
              }, h.then(a, a);
              break t;
            case 3:
              Vt = 7;
              break t;
            case 4:
              Vt = 5;
              break t;
            case 7:
              Kp(h) ? (Vt = 0, Ie = null, V0(a)) : (Vt = 0, Ie = null, is(e, a, h, 7));
              break;
            case 5:
              var x = null;
              switch (jt.tag) {
                case 26:
                  x = jt.memoizedState;
                case 5:
                case 27:
                  var A = jt;
                  if (x ? Cg(x) : A.stateNode.complete) {
                    Vt = 0, Ie = null;
                    var B = A.sibling;
                    if (B !== null) jt = B;
                    else {
                      var P = A.return;
                      P !== null ? (jt = P, ir(P)) : jt = null;
                    }
                    break e;
                  }
              }
              Vt = 0, Ie = null, is(e, a, h, 5);
              break;
            case 6:
              Vt = 0, Ie = null, is(e, a, h, 6);
              break;
            case 8:
              ff(), ie = 6;
              break t;
            default:
              throw Error(l(462));
          }
        }
        C5();
        break;
      } catch (I) {
        O0(e, I);
      }
    while (!0);
    return Zn = Ia = null, O.H = o, O.A = f, Bt = i, jt !== null ? 0 : (Qt = null, Mt = 0, Co(), ie);
  }
  function C5() {
    for (; jt !== null && !Nt(); )
      z0(jt);
  }
  function z0(e) {
    var a = o0(e.alternate, e, sa);
    e.memoizedProps = e.pendingProps, a === null ? ir(e) : jt = a;
  }
  function V0(e) {
    var a = e, i = a.alternate;
    switch (a.tag) {
      case 15:
      case 0:
        a = e0(
          i,
          a,
          a.pendingProps,
          a.type,
          void 0,
          Mt
        );
        break;
      case 11:
        a = e0(
          i,
          a,
          a.pendingProps,
          a.type.render,
          a.ref,
          Mt
        );
        break;
      case 5:
        Eu(a);
      default:
        c0(i, a), a = jt = Bp(a, sa), a = o0(i, a, sa);
    }
    e.memoizedProps = e.pendingProps, a === null ? ir(e) : jt = a;
  }
  function is(e, a, i, o) {
    Zn = Ia = null, Eu(a), Ki = null, Fs = 0;
    var f = a.return;
    try {
      if (f5(
        e,
        f,
        a,
        i,
        Mt
      )) {
        ie = 1, Po(
          e,
          cn(i, e.current)
        ), jt = null;
        return;
      }
    } catch (h) {
      if (f !== null) throw jt = f, h;
      ie = 1, Po(
        e,
        cn(i, e.current)
      ), jt = null;
      return;
    }
    a.flags & 32768 ? (Rt || o === 1 ? e = !0 : ts || (Mt & 536870912) !== 0 ? e = !1 : (Aa = e = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = Je.current, o !== null && o.tag === 13 && (o.flags |= 16384))), k0(a, e)) : ir(a);
  }
  function ir(e) {
    var a = e;
    do {
      if ((a.flags & 32768) !== 0) {
        k0(
          a,
          Aa
        );
        return;
      }
      e = a.return;
      var i = m5(
        a.alternate,
        a,
        sa
      );
      if (i !== null) {
        jt = i;
        return;
      }
      if (a = a.sibling, a !== null) {
        jt = a;
        return;
      }
      jt = a = e;
    } while (a !== null);
    ie === 0 && (ie = 5);
  }
  function k0(e, a) {
    do {
      var i = p5(e.alternate, e);
      if (i !== null) {
        i.flags &= 32767, jt = i;
        return;
      }
      if (i = e.return, i !== null && (i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null), !a && (e = e.sibling, e !== null)) {
        jt = e;
        return;
      }
      jt = e = i;
    } while (e !== null);
    ie = 6, jt = null;
  }
  function U0(e, a, i, o, f, h, x, A, B) {
    e.cancelPendingCommit = null;
    do
      sr();
    while (pe !== 0);
    if ((Bt & 6) !== 0) throw Error(l(327));
    if (a !== null) {
      if (a === e.current) throw Error(l(177));
      if (h = a.lanes | a.childLanes, h |= Ic, nS(
        e,
        i,
        h,
        x,
        A,
        B
      ), e === Qt && (jt = Qt = null, Mt = 0), ns = a, Da = e, la = i, rf = h, cf = f, _0 = o, (a.subtreeFlags & 10256) !== 0 || (a.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, A5(It, function() {
        return P0(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), o = (a.flags & 13878) !== 0, (a.subtreeFlags & 13878) !== 0 || o) {
        o = O.T, O.T = null, f = U.p, U.p = 2, x = Bt, Bt |= 4;
        try {
          g5(e, a, i);
        } finally {
          Bt = x, U.p = f, O.T = o;
        }
      }
      pe = 1, H0(), q0(), Y0();
    }
  }
  function H0() {
    if (pe === 1) {
      pe = 0;
      var e = Da, a = ns, i = (a.flags & 13878) !== 0;
      if ((a.subtreeFlags & 13878) !== 0 || i) {
        i = O.T, O.T = null;
        var o = U.p;
        U.p = 2;
        var f = Bt;
        Bt |= 4;
        try {
          S0(a, e);
          var h = Tf, x = Ap(e.containerInfo), A = h.focusedElem, B = h.selectionRange;
          if (x !== A && A && A.ownerDocument && Ep(
            A.ownerDocument.documentElement,
            A
          )) {
            if (B !== null && Qc(A)) {
              var P = B.start, I = B.end;
              if (I === void 0 && (I = P), "selectionStart" in A)
                A.selectionStart = P, A.selectionEnd = Math.min(
                  I,
                  A.value.length
                );
              else {
                var st = A.ownerDocument || document, K = st && st.defaultView || window;
                if (K.getSelection) {
                  var Z = K.getSelection(), dt = A.textContent.length, vt = Math.min(B.start, dt), qt = B.end === void 0 ? vt : Math.min(B.end, dt);
                  !Z.extend && vt > qt && (x = qt, qt = vt, vt = x);
                  var H = jp(
                    A,
                    vt
                  ), V = jp(
                    A,
                    qt
                  );
                  if (H && V && (Z.rangeCount !== 1 || Z.anchorNode !== H.node || Z.anchorOffset !== H.offset || Z.focusNode !== V.node || Z.focusOffset !== V.offset)) {
                    var G = st.createRange();
                    G.setStart(H.node, H.offset), Z.removeAllRanges(), vt > qt ? (Z.addRange(G), Z.extend(V.node, V.offset)) : (G.setEnd(V.node, V.offset), Z.addRange(G));
                  }
                }
              }
            }
            for (st = [], Z = A; Z = Z.parentNode; )
              Z.nodeType === 1 && st.push({
                element: Z,
                left: Z.scrollLeft,
                top: Z.scrollTop
              });
            for (typeof A.focus == "function" && A.focus(), A = 0; A < st.length; A++) {
              var at = st[A];
              at.element.scrollLeft = at.left, at.element.scrollTop = at.top;
            }
          }
          yr = !!Cf, Tf = Cf = null;
        } finally {
          Bt = f, U.p = o, O.T = i;
        }
      }
      e.current = a, pe = 2;
    }
  }
  function q0() {
    if (pe === 2) {
      pe = 0;
      var e = Da, a = ns, i = (a.flags & 8772) !== 0;
      if ((a.subtreeFlags & 8772) !== 0 || i) {
        i = O.T, O.T = null;
        var o = U.p;
        U.p = 2;
        var f = Bt;
        Bt |= 4;
        try {
          g0(e, a.alternate, a);
        } finally {
          Bt = f, U.p = o, O.T = i;
        }
      }
      pe = 3;
    }
  }
  function Y0() {
    if (pe === 4 || pe === 3) {
      pe = 0, we();
      var e = Da, a = ns, i = la, o = _0;
      (a.subtreeFlags & 10256) !== 0 || (a.flags & 10256) !== 0 ? pe = 5 : (pe = 0, ns = Da = null, G0(e, e.pendingLanes));
      var f = e.pendingLanes;
      if (f === 0 && (_a = null), _c(i), a = a.stateNode, Ke && typeof Ke.onCommitFiberRoot == "function")
        try {
          Ke.onCommitFiberRoot(
            Ns,
            a,
            void 0,
            (a.current.flags & 128) === 128
          );
        } catch {
        }
      if (o !== null) {
        a = O.T, f = U.p, U.p = 2, O.T = null;
        try {
          for (var h = e.onRecoverableError, x = 0; x < o.length; x++) {
            var A = o[x];
            h(A.value, {
              componentStack: A.stack
            });
          }
        } finally {
          O.T = a, U.p = f;
        }
      }
      (la & 3) !== 0 && sr(), $n(e), f = e.pendingLanes, (i & 261930) !== 0 && (f & 42) !== 0 ? e === uf ? hl++ : (hl = 0, uf = e) : hl = 0, ml(0);
    }
  }
  function G0(e, a) {
    (e.pooledCacheLanes &= a) === 0 && (a = e.pooledCache, a != null && (e.pooledCache = null, Qs(a)));
  }
  function sr() {
    return H0(), q0(), Y0(), P0();
  }
  function P0() {
    if (pe !== 5) return !1;
    var e = Da, a = rf;
    rf = 0;
    var i = _c(la), o = O.T, f = U.p;
    try {
      U.p = 32 > i ? 32 : i, O.T = null, i = cf, cf = null;
      var h = Da, x = la;
      if (pe = 0, ns = Da = null, la = 0, (Bt & 6) !== 0) throw Error(l(331));
      var A = Bt;
      if (Bt |= 4, E0(h.current), C0(
        h,
        h.current,
        x,
        i
      ), Bt = A, ml(0, !1), Ke && typeof Ke.onPostCommitFiberRoot == "function")
        try {
          Ke.onPostCommitFiberRoot(Ns, h);
        } catch {
        }
      return !0;
    } finally {
      U.p = f, O.T = o, G0(e, a);
    }
  }
  function X0(e, a, i) {
    a = cn(i, a), a = Hu(e.stateNode, a, 2), e = Ca(e, a, 2), e !== null && (Ls(e, 2), $n(e));
  }
  function kt(e, a, i) {
    if (e.tag === 3)
      X0(e, e, i);
    else
      for (; a !== null; ) {
        if (a.tag === 3) {
          X0(
            a,
            e,
            i
          );
          break;
        } else if (a.tag === 1) {
          var o = a.stateNode;
          if (typeof a.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (_a === null || !_a.has(o))) {
            e = cn(i, e), i = K1(2), o = Ca(a, i, 2), o !== null && (Q1(
              i,
              o,
              a,
              e
            ), Ls(o, 2), $n(o));
            break;
          }
        }
        a = a.return;
      }
  }
  function hf(e, a, i) {
    var o = e.pingCache;
    if (o === null) {
      o = e.pingCache = new b5();
      var f = /* @__PURE__ */ new Set();
      o.set(a, f);
    } else
      f = o.get(a), f === void 0 && (f = /* @__PURE__ */ new Set(), o.set(a, f));
    f.has(i) || (sf = !0, f.add(i), e = T5.bind(null, e, a, i), a.then(e, e));
  }
  function T5(e, a, i) {
    var o = e.pingCache;
    o !== null && o.delete(a), e.pingedLanes |= e.suspendedLanes & i, e.warmLanes &= ~i, Qt === e && (Mt & i) === i && (ie === 4 || ie === 3 && (Mt & 62914560) === Mt && 300 > Kt() - Io ? (Bt & 2) === 0 && as(e, 0) : lf |= i, es === Mt && (es = 0)), $n(e);
  }
  function K0(e, a) {
    a === 0 && (a = Hm()), e = Fa(e, a), e !== null && (Ls(e, a), $n(e));
  }
  function j5(e) {
    var a = e.memoizedState, i = 0;
    a !== null && (i = a.retryLane), K0(e, i);
  }
  function E5(e, a) {
    var i = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var o = e.stateNode, f = e.memoizedState;
        f !== null && (i = f.retryLane);
        break;
      case 19:
        o = e.stateNode;
        break;
      case 22:
        o = e.stateNode._retryCache;
        break;
      default:
        throw Error(l(314));
    }
    o !== null && o.delete(a), K0(e, i);
  }
  function A5(e, a) {
    return qn(e, a);
  }
  var lr = null, ss = null, mf = !1, or = !1, pf = !1, Na = 0;
  function $n(e) {
    e !== ss && e.next === null && (ss === null ? lr = ss = e : ss = ss.next = e), or = !0, mf || (mf = !0, _5());
  }
  function ml(e, a) {
    if (!pf && or) {
      pf = !0;
      do
        for (var i = !1, o = lr; o !== null; ) {
          if (e !== 0) {
            var f = o.pendingLanes;
            if (f === 0) var h = 0;
            else {
              var x = o.suspendedLanes, A = o.pingedLanes;
              h = (1 << 31 - Qe(42 | e) + 1) - 1, h &= f & ~(x & ~A), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (i = !0, J0(o, h));
          } else
            h = Mt, h = uo(
              o,
              o === Qt ? h : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (h & 3) === 0 || Os(o, h) || (i = !0, J0(o, h));
          o = o.next;
        }
      while (i);
      pf = !1;
    }
  }
  function M5() {
    Q0();
  }
  function Q0() {
    or = mf = !1;
    var e = 0;
    Na !== 0 && k5() && (e = Na);
    for (var a = Kt(), i = null, o = lr; o !== null; ) {
      var f = o.next, h = Z0(o, a);
      h === 0 ? (o.next = null, i === null ? lr = f : i.next = f, f === null && (ss = i)) : (i = o, (e !== 0 || (h & 3) !== 0) && (or = !0)), o = f;
    }
    pe !== 0 && pe !== 5 || ml(e), Na !== 0 && (Na = 0);
  }
  function Z0(e, a) {
    for (var i = e.suspendedLanes, o = e.pingedLanes, f = e.expirationTimes, h = e.pendingLanes & -62914561; 0 < h; ) {
      var x = 31 - Qe(h), A = 1 << x, B = f[x];
      B === -1 ? ((A & i) === 0 || (A & o) !== 0) && (f[x] = eS(A, a)) : B <= a && (e.expiredLanes |= A), h &= ~A;
    }
    if (a = Qt, i = Mt, i = uo(
      e,
      e === a ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), o = e.callbackNode, i === 0 || e === a && (Vt === 2 || Vt === 9) || e.cancelPendingCommit !== null)
      return o !== null && o !== null && ft(o), e.callbackNode = null, e.callbackPriority = 0;
    if ((i & 3) === 0 || Os(e, i)) {
      if (a = i & -i, a === e.callbackPriority) return a;
      switch (o !== null && ft(o), _c(i)) {
        case 2:
        case 8:
          i = Ga;
          break;
        case 32:
          i = It;
          break;
        case 268435456:
          i = Yn;
          break;
        default:
          i = It;
      }
      return o = F0.bind(null, e), i = qn(i, o), e.callbackPriority = a, e.callbackNode = i, a;
    }
    return o !== null && o !== null && ft(o), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function F0(e, a) {
    if (pe !== 0 && pe !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var i = e.callbackNode;
    if (sr() && e.callbackNode !== i)
      return null;
    var o = Mt;
    return o = uo(
      e,
      e === Qt ? o : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), o === 0 ? null : (R0(e, o, a), Z0(e, Kt()), e.callbackNode != null && e.callbackNode === i ? F0.bind(null, e) : null);
  }
  function J0(e, a) {
    if (sr()) return null;
    R0(e, a, !0);
  }
  function _5() {
    H5(function() {
      (Bt & 6) !== 0 ? qn(
        xn,
        M5
      ) : Q0();
    });
  }
  function gf() {
    if (Na === 0) {
      var e = Gi;
      e === 0 && (e = oo, oo <<= 1, (oo & 261888) === 0 && (oo = 256)), Na = e;
    }
    return Na;
  }
  function W0(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : po("" + e);
  }
  function I0(e, a) {
    var i = a.ownerDocument.createElement("input");
    return i.name = a.name, i.value = a.value, e.id && i.setAttribute("form", e.id), a.parentNode.insertBefore(i, a), e = new FormData(e), i.parentNode.removeChild(i), e;
  }
  function D5(e, a, i, o, f) {
    if (a === "submit" && i && i.stateNode === f) {
      var h = W0(
        (f[ze] || null).action
      ), x = o.submitter;
      x && (a = (a = x[ze] || null) ? W0(a.formAction) : x.getAttribute("formAction"), a !== null && (h = a, x = null));
      var A = new bo(
        "action",
        "action",
        null,
        o,
        f
      );
      e.push({
        event: A,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (o.defaultPrevented) {
                if (Na !== 0) {
                  var B = x ? I0(f, x) : new FormData(f);
                  $u(
                    i,
                    {
                      pending: !0,
                      data: B,
                      method: f.method,
                      action: h
                    },
                    null,
                    B
                  );
                }
              } else
                typeof h == "function" && (A.preventDefault(), B = x ? I0(f, x) : new FormData(f), $u(
                  i,
                  {
                    pending: !0,
                    data: B,
                    method: f.method,
                    action: h
                  },
                  h,
                  B
                ));
            },
            currentTarget: f
          }
        ]
      });
    }
  }
  for (var yf = 0; yf < Wc.length; yf++) {
    var vf = Wc[yf], R5 = vf.toLowerCase(), N5 = vf[0].toUpperCase() + vf.slice(1);
    Sn(
      R5,
      "on" + N5
    );
  }
  Sn(Dp, "onAnimationEnd"), Sn(Rp, "onAnimationIteration"), Sn(Np, "onAnimationStart"), Sn("dblclick", "onDoubleClick"), Sn("focusin", "onFocus"), Sn("focusout", "onBlur"), Sn(QS, "onTransitionRun"), Sn(ZS, "onTransitionStart"), Sn(FS, "onTransitionCancel"), Sn(Op, "onTransitionEnd"), Di("onMouseEnter", ["mouseout", "mouseover"]), Di("onMouseLeave", ["mouseout", "mouseover"]), Di("onPointerEnter", ["pointerout", "pointerover"]), Di("onPointerLeave", ["pointerout", "pointerover"]), Xa(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Xa(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Xa("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Xa(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Xa(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Xa(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var pl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), O5 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(pl)
  );
  function tg(e, a) {
    a = (a & 4) !== 0;
    for (var i = 0; i < e.length; i++) {
      var o = e[i], f = o.event;
      o = o.listeners;
      t: {
        var h = void 0;
        if (a)
          for (var x = o.length - 1; 0 <= x; x--) {
            var A = o[x], B = A.instance, P = A.currentTarget;
            if (A = A.listener, B !== h && f.isPropagationStopped())
              break t;
            h = A, f.currentTarget = P;
            try {
              h(f);
            } catch (I) {
              wo(I);
            }
            f.currentTarget = null, h = B;
          }
        else
          for (x = 0; x < o.length; x++) {
            if (A = o[x], B = A.instance, P = A.currentTarget, A = A.listener, B !== h && f.isPropagationStopped())
              break t;
            h = A, f.currentTarget = P;
            try {
              h(f);
            } catch (I) {
              wo(I);
            }
            f.currentTarget = null, h = B;
          }
      }
    }
  }
  function Et(e, a) {
    var i = a[Dc];
    i === void 0 && (i = a[Dc] = /* @__PURE__ */ new Set());
    var o = e + "__bubble";
    i.has(o) || (eg(a, e, 2, !1), i.add(o));
  }
  function bf(e, a, i) {
    var o = 0;
    a && (o |= 4), eg(
      i,
      e,
      o,
      a
    );
  }
  var rr = "_reactListening" + Math.random().toString(36).slice(2);
  function xf(e) {
    if (!e[rr]) {
      e[rr] = !0, Qm.forEach(function(i) {
        i !== "selectionchange" && (O5.has(i) || bf(i, !1, e), bf(i, !0, e));
      });
      var a = e.nodeType === 9 ? e : e.ownerDocument;
      a === null || a[rr] || (a[rr] = !0, bf("selectionchange", !1, a));
    }
  }
  function eg(e, a, i, o) {
    switch (Dg(a)) {
      case 2:
        var f = o4;
        break;
      case 8:
        f = r4;
        break;
      default:
        f = $f;
    }
    i = f.bind(
      null,
      a,
      i,
      e
    ), f = void 0, !kc || a !== "touchstart" && a !== "touchmove" && a !== "wheel" || (f = !0), o ? f !== void 0 ? e.addEventListener(a, i, {
      capture: !0,
      passive: f
    }) : e.addEventListener(a, i, !0) : f !== void 0 ? e.addEventListener(a, i, {
      passive: f
    }) : e.addEventListener(a, i, !1);
  }
  function Sf(e, a, i, o, f) {
    var h = o;
    if ((a & 1) === 0 && (a & 2) === 0 && o !== null)
      t: for (; ; ) {
        if (o === null) return;
        var x = o.tag;
        if (x === 3 || x === 4) {
          var A = o.stateNode.containerInfo;
          if (A === f) break;
          if (x === 4)
            for (x = o.return; x !== null; ) {
              var B = x.tag;
              if ((B === 3 || B === 4) && x.stateNode.containerInfo === f)
                return;
              x = x.return;
            }
          for (; A !== null; ) {
            if (x = Ai(A), x === null) return;
            if (B = x.tag, B === 5 || B === 6 || B === 26 || B === 27) {
              o = h = x;
              continue t;
            }
            A = A.parentNode;
          }
        }
        o = o.return;
      }
    lp(function() {
      var P = h, I = zc(i), st = [];
      t: {
        var K = Lp.get(e);
        if (K !== void 0) {
          var Z = bo, dt = e;
          switch (e) {
            case "keypress":
              if (yo(i) === 0) break t;
            case "keydown":
            case "keyup":
              Z = ES;
              break;
            case "focusin":
              dt = "focus", Z = Yc;
              break;
            case "focusout":
              dt = "blur", Z = Yc;
              break;
            case "beforeblur":
            case "afterblur":
              Z = Yc;
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
              Z = cp;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              Z = mS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              Z = _S;
              break;
            case Dp:
            case Rp:
            case Np:
              Z = yS;
              break;
            case Op:
              Z = RS;
              break;
            case "scroll":
            case "scrollend":
              Z = dS;
              break;
            case "wheel":
              Z = OS;
              break;
            case "copy":
            case "cut":
            case "paste":
              Z = bS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              Z = fp;
              break;
            case "toggle":
            case "beforetoggle":
              Z = $S;
          }
          var vt = (a & 4) !== 0, qt = !vt && (e === "scroll" || e === "scrollend"), H = vt ? K !== null ? K + "Capture" : null : K;
          vt = [];
          for (var V = P, G; V !== null; ) {
            var at = V;
            if (G = at.stateNode, at = at.tag, at !== 5 && at !== 26 && at !== 27 || G === null || H === null || (at = zs(V, H), at != null && vt.push(
              gl(V, at, G)
            )), qt) break;
            V = V.return;
          }
          0 < vt.length && (K = new Z(
            K,
            dt,
            null,
            i,
            I
          ), st.push({ event: K, listeners: vt }));
        }
      }
      if ((a & 7) === 0) {
        t: {
          if (K = e === "mouseover" || e === "pointerover", Z = e === "mouseout" || e === "pointerout", K && i !== Bc && (dt = i.relatedTarget || i.fromElement) && (Ai(dt) || dt[Ei]))
            break t;
          if ((Z || K) && (K = I.window === I ? I : (K = I.ownerDocument) ? K.defaultView || K.parentWindow : window, Z ? (dt = i.relatedTarget || i.toElement, Z = P, dt = dt ? Ai(dt) : null, dt !== null && (qt = u(dt), vt = dt.tag, dt !== qt || vt !== 5 && vt !== 27 && vt !== 6) && (dt = null)) : (Z = null, dt = P), Z !== dt)) {
            if (vt = cp, at = "onMouseLeave", H = "onMouseEnter", V = "mouse", (e === "pointerout" || e === "pointerover") && (vt = fp, at = "onPointerLeave", H = "onPointerEnter", V = "pointer"), qt = Z == null ? K : Bs(Z), G = dt == null ? K : Bs(dt), K = new vt(
              at,
              V + "leave",
              Z,
              i,
              I
            ), K.target = qt, K.relatedTarget = G, at = null, Ai(I) === P && (vt = new vt(
              H,
              V + "enter",
              dt,
              i,
              I
            ), vt.target = G, vt.relatedTarget = qt, at = vt), qt = at, Z && dt)
              e: {
                for (vt = L5, H = Z, V = dt, G = 0, at = H; at; at = vt(at))
                  G++;
                at = 0;
                for (var yt = V; yt; yt = vt(yt))
                  at++;
                for (; 0 < G - at; )
                  H = vt(H), G--;
                for (; 0 < at - G; )
                  V = vt(V), at--;
                for (; G--; ) {
                  if (H === V || V !== null && H === V.alternate) {
                    vt = H;
                    break e;
                  }
                  H = vt(H), V = vt(V);
                }
                vt = null;
              }
            else vt = null;
            Z !== null && ng(
              st,
              K,
              Z,
              vt,
              !1
            ), dt !== null && qt !== null && ng(
              st,
              qt,
              dt,
              vt,
              !0
            );
          }
        }
        t: {
          if (K = P ? Bs(P) : window, Z = K.nodeName && K.nodeName.toLowerCase(), Z === "select" || Z === "input" && K.type === "file")
            var Lt = bp;
          else if (yp(K))
            if (xp)
              Lt = PS;
            else {
              Lt = YS;
              var mt = qS;
            }
          else
            Z = K.nodeName, !Z || Z.toLowerCase() !== "input" || K.type !== "checkbox" && K.type !== "radio" ? P && $c(P.elementType) && (Lt = bp) : Lt = GS;
          if (Lt && (Lt = Lt(e, P))) {
            vp(
              st,
              Lt,
              i,
              I
            );
            break t;
          }
          mt && mt(e, K, P), e === "focusout" && P && K.type === "number" && P.memoizedProps.value != null && Lc(K, "number", K.value);
        }
        switch (mt = P ? Bs(P) : window, e) {
          case "focusin":
            (yp(mt) || mt.contentEditable === "true") && (Bi = mt, Zc = P, Ps = null);
            break;
          case "focusout":
            Ps = Zc = Bi = null;
            break;
          case "mousedown":
            Fc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Fc = !1, Mp(st, i, I);
            break;
          case "selectionchange":
            if (KS) break;
          case "keydown":
          case "keyup":
            Mp(st, i, I);
        }
        var Ct;
        if (Pc)
          t: {
            switch (e) {
              case "compositionstart":
                var _t = "onCompositionStart";
                break t;
              case "compositionend":
                _t = "onCompositionEnd";
                break t;
              case "compositionupdate":
                _t = "onCompositionUpdate";
                break t;
            }
            _t = void 0;
          }
        else
          $i ? pp(e, i) && (_t = "onCompositionEnd") : e === "keydown" && i.keyCode === 229 && (_t = "onCompositionStart");
        _t && (dp && i.locale !== "ko" && ($i || _t !== "onCompositionStart" ? _t === "onCompositionEnd" && $i && (Ct = op()) : (ga = I, Uc = "value" in ga ? ga.value : ga.textContent, $i = !0)), mt = cr(P, _t), 0 < mt.length && (_t = new up(
          _t,
          e,
          null,
          i,
          I
        ), st.push({ event: _t, listeners: mt }), Ct ? _t.data = Ct : (Ct = gp(i), Ct !== null && (_t.data = Ct)))), (Ct = zS ? VS(e, i) : kS(e, i)) && (_t = cr(P, "onBeforeInput"), 0 < _t.length && (mt = new up(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          I
        ), st.push({
          event: mt,
          listeners: _t
        }), mt.data = Ct)), D5(
          st,
          e,
          P,
          i,
          I
        );
      }
      tg(st, a);
    });
  }
  function gl(e, a, i) {
    return {
      instance: e,
      listener: a,
      currentTarget: i
    };
  }
  function cr(e, a) {
    for (var i = a + "Capture", o = []; e !== null; ) {
      var f = e, h = f.stateNode;
      if (f = f.tag, f !== 5 && f !== 26 && f !== 27 || h === null || (f = zs(e, i), f != null && o.unshift(
        gl(e, f, h)
      ), f = zs(e, a), f != null && o.push(
        gl(e, f, h)
      )), e.tag === 3) return o;
      e = e.return;
    }
    return [];
  }
  function L5(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function ng(e, a, i, o, f) {
    for (var h = a._reactName, x = []; i !== null && i !== o; ) {
      var A = i, B = A.alternate, P = A.stateNode;
      if (A = A.tag, B !== null && B === o) break;
      A !== 5 && A !== 26 && A !== 27 || P === null || (B = P, f ? (P = zs(i, h), P != null && x.unshift(
        gl(i, P, B)
      )) : f || (P = zs(i, h), P != null && x.push(
        gl(i, P, B)
      ))), i = i.return;
    }
    x.length !== 0 && e.push({ event: a, listeners: x });
  }
  var $5 = /\r\n?/g, B5 = /\u0000|\uFFFD/g;
  function ag(e) {
    return (typeof e == "string" ? e : "" + e).replace($5, `
`).replace(B5, "");
  }
  function ig(e, a) {
    return a = ag(a), ag(e) === a;
  }
  function Ht(e, a, i, o, f, h) {
    switch (i) {
      case "children":
        typeof o == "string" ? a === "body" || a === "textarea" && o === "" || Ni(e, o) : (typeof o == "number" || typeof o == "bigint") && a !== "body" && Ni(e, "" + o);
        break;
      case "className":
        ho(e, "class", o);
        break;
      case "tabIndex":
        ho(e, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ho(e, i, o);
        break;
      case "style":
        ip(e, o, h);
        break;
      case "data":
        if (a !== "object") {
          ho(e, "data", o);
          break;
        }
      case "src":
      case "href":
        if (o === "" && (a !== "a" || i !== "href")) {
          e.removeAttribute(i);
          break;
        }
        if (o == null || typeof o == "function" || typeof o == "symbol" || typeof o == "boolean") {
          e.removeAttribute(i);
          break;
        }
        o = po("" + o), e.setAttribute(i, o);
        break;
      case "action":
      case "formAction":
        if (typeof o == "function") {
          e.setAttribute(
            i,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof h == "function" && (i === "formAction" ? (a !== "input" && Ht(e, a, "name", f.name, f, null), Ht(
            e,
            a,
            "formEncType",
            f.formEncType,
            f,
            null
          ), Ht(
            e,
            a,
            "formMethod",
            f.formMethod,
            f,
            null
          ), Ht(
            e,
            a,
            "formTarget",
            f.formTarget,
            f,
            null
          )) : (Ht(e, a, "encType", f.encType, f, null), Ht(e, a, "method", f.method, f, null), Ht(e, a, "target", f.target, f, null)));
        if (o == null || typeof o == "symbol" || typeof o == "boolean") {
          e.removeAttribute(i);
          break;
        }
        o = po("" + o), e.setAttribute(i, o);
        break;
      case "onClick":
        o != null && (e.onclick = Pn);
        break;
      case "onScroll":
        o != null && Et("scroll", e);
        break;
      case "onScrollEnd":
        o != null && Et("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(l(61));
          if (i = o.__html, i != null) {
            if (f.children != null) throw Error(l(60));
            e.innerHTML = i;
          }
        }
        break;
      case "multiple":
        e.multiple = o && typeof o != "function" && typeof o != "symbol";
        break;
      case "muted":
        e.muted = o && typeof o != "function" && typeof o != "symbol";
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
          e.removeAttribute("xlink:href");
          break;
        }
        i = po("" + o), e.setAttributeNS(
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
        o != null && typeof o != "function" && typeof o != "symbol" ? e.setAttribute(i, "" + o) : e.removeAttribute(i);
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
        o && typeof o != "function" && typeof o != "symbol" ? e.setAttribute(i, "") : e.removeAttribute(i);
        break;
      case "capture":
      case "download":
        o === !0 ? e.setAttribute(i, "") : o !== !1 && o != null && typeof o != "function" && typeof o != "symbol" ? e.setAttribute(i, o) : e.removeAttribute(i);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        o != null && typeof o != "function" && typeof o != "symbol" && !isNaN(o) && 1 <= o ? e.setAttribute(i, o) : e.removeAttribute(i);
        break;
      case "rowSpan":
      case "start":
        o == null || typeof o == "function" || typeof o == "symbol" || isNaN(o) ? e.removeAttribute(i) : e.setAttribute(i, o);
        break;
      case "popover":
        Et("beforetoggle", e), Et("toggle", e), fo(e, "popover", o);
        break;
      case "xlinkActuate":
        Gn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          o
        );
        break;
      case "xlinkArcrole":
        Gn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          o
        );
        break;
      case "xlinkRole":
        Gn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          o
        );
        break;
      case "xlinkShow":
        Gn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          o
        );
        break;
      case "xlinkTitle":
        Gn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          o
        );
        break;
      case "xlinkType":
        Gn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          o
        );
        break;
      case "xmlBase":
        Gn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          o
        );
        break;
      case "xmlLang":
        Gn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          o
        );
        break;
      case "xmlSpace":
        Gn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          o
        );
        break;
      case "is":
        fo(e, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = uS.get(i) || i, fo(e, i, o));
    }
  }
  function wf(e, a, i, o, f, h) {
    switch (i) {
      case "style":
        ip(e, o, h);
        break;
      case "dangerouslySetInnerHTML":
        if (o != null) {
          if (typeof o != "object" || !("__html" in o))
            throw Error(l(61));
          if (i = o.__html, i != null) {
            if (f.children != null) throw Error(l(60));
            e.innerHTML = i;
          }
        }
        break;
      case "children":
        typeof o == "string" ? Ni(e, o) : (typeof o == "number" || typeof o == "bigint") && Ni(e, "" + o);
        break;
      case "onScroll":
        o != null && Et("scroll", e);
        break;
      case "onScrollEnd":
        o != null && Et("scrollend", e);
        break;
      case "onClick":
        o != null && (e.onclick = Pn);
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
        if (!Zm.hasOwnProperty(i))
          t: {
            if (i[0] === "o" && i[1] === "n" && (f = i.endsWith("Capture"), a = i.slice(2, f ? i.length - 7 : void 0), h = e[ze] || null, h = h != null ? h[i] : null, typeof h == "function" && e.removeEventListener(a, h, f), typeof o == "function")) {
              typeof h != "function" && h !== null && (i in e ? e[i] = null : e.hasAttribute(i) && e.removeAttribute(i)), e.addEventListener(a, o, f);
              break t;
            }
            i in e ? e[i] = o : o === !0 ? e.setAttribute(i, "") : fo(e, i, o);
          }
    }
  }
  function Me(e, a, i) {
    switch (a) {
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
        Et("error", e), Et("load", e);
        var o = !1, f = !1, h;
        for (h in i)
          if (i.hasOwnProperty(h)) {
            var x = i[h];
            if (x != null)
              switch (h) {
                case "src":
                  o = !0;
                  break;
                case "srcSet":
                  f = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(l(137, a));
                default:
                  Ht(e, a, h, x, i, null);
              }
          }
        f && Ht(e, a, "srcSet", i.srcSet, i, null), o && Ht(e, a, "src", i.src, i, null);
        return;
      case "input":
        Et("invalid", e);
        var A = h = x = f = null, B = null, P = null;
        for (o in i)
          if (i.hasOwnProperty(o)) {
            var I = i[o];
            if (I != null)
              switch (o) {
                case "name":
                  f = I;
                  break;
                case "type":
                  x = I;
                  break;
                case "checked":
                  B = I;
                  break;
                case "defaultChecked":
                  P = I;
                  break;
                case "value":
                  h = I;
                  break;
                case "defaultValue":
                  A = I;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (I != null)
                    throw Error(l(137, a));
                  break;
                default:
                  Ht(e, a, o, I, i, null);
              }
          }
        tp(
          e,
          h,
          A,
          B,
          P,
          x,
          f,
          !1
        );
        return;
      case "select":
        Et("invalid", e), o = x = h = null;
        for (f in i)
          if (i.hasOwnProperty(f) && (A = i[f], A != null))
            switch (f) {
              case "value":
                h = A;
                break;
              case "defaultValue":
                x = A;
                break;
              case "multiple":
                o = A;
              default:
                Ht(e, a, f, A, i, null);
            }
        a = h, i = x, e.multiple = !!o, a != null ? Ri(e, !!o, a, !1) : i != null && Ri(e, !!o, i, !0);
        return;
      case "textarea":
        Et("invalid", e), h = f = o = null;
        for (x in i)
          if (i.hasOwnProperty(x) && (A = i[x], A != null))
            switch (x) {
              case "value":
                o = A;
                break;
              case "defaultValue":
                f = A;
                break;
              case "children":
                h = A;
                break;
              case "dangerouslySetInnerHTML":
                if (A != null) throw Error(l(91));
                break;
              default:
                Ht(e, a, x, A, i, null);
            }
        np(e, o, f, h);
        return;
      case "option":
        for (B in i)
          if (i.hasOwnProperty(B) && (o = i[B], o != null))
            switch (B) {
              case "selected":
                e.selected = o && typeof o != "function" && typeof o != "symbol";
                break;
              default:
                Ht(e, a, B, o, i, null);
            }
        return;
      case "dialog":
        Et("beforetoggle", e), Et("toggle", e), Et("cancel", e), Et("close", e);
        break;
      case "iframe":
      case "object":
        Et("load", e);
        break;
      case "video":
      case "audio":
        for (o = 0; o < pl.length; o++)
          Et(pl[o], e);
        break;
      case "image":
        Et("error", e), Et("load", e);
        break;
      case "details":
        Et("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Et("error", e), Et("load", e);
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
        for (P in i)
          if (i.hasOwnProperty(P) && (o = i[P], o != null))
            switch (P) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(l(137, a));
              default:
                Ht(e, a, P, o, i, null);
            }
        return;
      default:
        if ($c(a)) {
          for (I in i)
            i.hasOwnProperty(I) && (o = i[I], o !== void 0 && wf(
              e,
              a,
              I,
              o,
              i,
              void 0
            ));
          return;
        }
    }
    for (A in i)
      i.hasOwnProperty(A) && (o = i[A], o != null && Ht(e, a, A, o, i, null));
  }
  function z5(e, a, i, o) {
    switch (a) {
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
        var f = null, h = null, x = null, A = null, B = null, P = null, I = null;
        for (Z in i) {
          var st = i[Z];
          if (i.hasOwnProperty(Z) && st != null)
            switch (Z) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                B = st;
              default:
                o.hasOwnProperty(Z) || Ht(e, a, Z, null, o, st);
            }
        }
        for (var K in o) {
          var Z = o[K];
          if (st = i[K], o.hasOwnProperty(K) && (Z != null || st != null))
            switch (K) {
              case "type":
                h = Z;
                break;
              case "name":
                f = Z;
                break;
              case "checked":
                P = Z;
                break;
              case "defaultChecked":
                I = Z;
                break;
              case "value":
                x = Z;
                break;
              case "defaultValue":
                A = Z;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (Z != null)
                  throw Error(l(137, a));
                break;
              default:
                Z !== st && Ht(
                  e,
                  a,
                  K,
                  Z,
                  o,
                  st
                );
            }
        }
        Oc(
          e,
          x,
          A,
          B,
          P,
          I,
          h,
          f
        );
        return;
      case "select":
        Z = x = A = K = null;
        for (h in i)
          if (B = i[h], i.hasOwnProperty(h) && B != null)
            switch (h) {
              case "value":
                break;
              case "multiple":
                Z = B;
              default:
                o.hasOwnProperty(h) || Ht(
                  e,
                  a,
                  h,
                  null,
                  o,
                  B
                );
            }
        for (f in o)
          if (h = o[f], B = i[f], o.hasOwnProperty(f) && (h != null || B != null))
            switch (f) {
              case "value":
                K = h;
                break;
              case "defaultValue":
                A = h;
                break;
              case "multiple":
                x = h;
              default:
                h !== B && Ht(
                  e,
                  a,
                  f,
                  h,
                  o,
                  B
                );
            }
        a = A, i = x, o = Z, K != null ? Ri(e, !!i, K, !1) : !!o != !!i && (a != null ? Ri(e, !!i, a, !0) : Ri(e, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        Z = K = null;
        for (A in i)
          if (f = i[A], i.hasOwnProperty(A) && f != null && !o.hasOwnProperty(A))
            switch (A) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ht(e, a, A, null, o, f);
            }
        for (x in o)
          if (f = o[x], h = i[x], o.hasOwnProperty(x) && (f != null || h != null))
            switch (x) {
              case "value":
                K = f;
                break;
              case "defaultValue":
                Z = f;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(l(91));
                break;
              default:
                f !== h && Ht(e, a, x, f, o, h);
            }
        ep(e, K, Z);
        return;
      case "option":
        for (var dt in i)
          if (K = i[dt], i.hasOwnProperty(dt) && K != null && !o.hasOwnProperty(dt))
            switch (dt) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Ht(
                  e,
                  a,
                  dt,
                  null,
                  o,
                  K
                );
            }
        for (B in o)
          if (K = o[B], Z = i[B], o.hasOwnProperty(B) && K !== Z && (K != null || Z != null))
            switch (B) {
              case "selected":
                e.selected = K && typeof K != "function" && typeof K != "symbol";
                break;
              default:
                Ht(
                  e,
                  a,
                  B,
                  K,
                  o,
                  Z
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
        for (var vt in i)
          K = i[vt], i.hasOwnProperty(vt) && K != null && !o.hasOwnProperty(vt) && Ht(e, a, vt, null, o, K);
        for (P in o)
          if (K = o[P], Z = i[P], o.hasOwnProperty(P) && K !== Z && (K != null || Z != null))
            switch (P) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (K != null)
                  throw Error(l(137, a));
                break;
              default:
                Ht(
                  e,
                  a,
                  P,
                  K,
                  o,
                  Z
                );
            }
        return;
      default:
        if ($c(a)) {
          for (var qt in i)
            K = i[qt], i.hasOwnProperty(qt) && K !== void 0 && !o.hasOwnProperty(qt) && wf(
              e,
              a,
              qt,
              void 0,
              o,
              K
            );
          for (I in o)
            K = o[I], Z = i[I], !o.hasOwnProperty(I) || K === Z || K === void 0 && Z === void 0 || wf(
              e,
              a,
              I,
              K,
              o,
              Z
            );
          return;
        }
    }
    for (var H in i)
      K = i[H], i.hasOwnProperty(H) && K != null && !o.hasOwnProperty(H) && Ht(e, a, H, null, o, K);
    for (st in o)
      K = o[st], Z = i[st], !o.hasOwnProperty(st) || K === Z || K == null && Z == null || Ht(e, a, st, K, o, Z);
  }
  function sg(e) {
    switch (e) {
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
  function V5() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, a = 0, i = performance.getEntriesByType("resource"), o = 0; o < i.length; o++) {
        var f = i[o], h = f.transferSize, x = f.initiatorType, A = f.duration;
        if (h && A && sg(x)) {
          for (x = 0, A = f.responseEnd, o += 1; o < i.length; o++) {
            var B = i[o], P = B.startTime;
            if (P > A) break;
            var I = B.transferSize, st = B.initiatorType;
            I && sg(st) && (B = B.responseEnd, x += I * (B < A ? 1 : (A - P) / (B - P)));
          }
          if (--o, a += 8 * (h + x) / (f.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return a / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Cf = null, Tf = null;
  function ur(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function lg(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function og(e, a) {
    if (e === 0)
      switch (a) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && a === "foreignObject" ? 0 : e;
  }
  function jf(e, a) {
    return e === "textarea" || e === "noscript" || typeof a.children == "string" || typeof a.children == "number" || typeof a.children == "bigint" || typeof a.dangerouslySetInnerHTML == "object" && a.dangerouslySetInnerHTML !== null && a.dangerouslySetInnerHTML.__html != null;
  }
  var Ef = null;
  function k5() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Ef ? !1 : (Ef = e, !0) : (Ef = null, !1);
  }
  var rg = typeof setTimeout == "function" ? setTimeout : void 0, U5 = typeof clearTimeout == "function" ? clearTimeout : void 0, cg = typeof Promise == "function" ? Promise : void 0, H5 = typeof queueMicrotask == "function" ? queueMicrotask : typeof cg < "u" ? function(e) {
    return cg.resolve(null).then(e).catch(q5);
  } : rg;
  function q5(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Oa(e) {
    return e === "head";
  }
  function ug(e, a) {
    var i = a, o = 0;
    do {
      var f = i.nextSibling;
      if (e.removeChild(i), f && f.nodeType === 8)
        if (i = f.data, i === "/$" || i === "/&") {
          if (o === 0) {
            e.removeChild(f), cs(a);
            return;
          }
          o--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          o++;
        else if (i === "html")
          yl(e.ownerDocument.documentElement);
        else if (i === "head") {
          i = e.ownerDocument.head, yl(i);
          for (var h = i.firstChild; h; ) {
            var x = h.nextSibling, A = h.nodeName;
            h[$s] || A === "SCRIPT" || A === "STYLE" || A === "LINK" && h.rel.toLowerCase() === "stylesheet" || i.removeChild(h), h = x;
          }
        } else
          i === "body" && yl(e.ownerDocument.body);
      i = f;
    } while (i);
    cs(a);
  }
  function fg(e, a) {
    var i = e;
    e = 0;
    do {
      var o = i.nextSibling;
      if (i.nodeType === 1 ? a ? (i._stashedDisplay = i.style.display, i.style.display = "none") : (i.style.display = i._stashedDisplay || "", i.getAttribute("style") === "" && i.removeAttribute("style")) : i.nodeType === 3 && (a ? (i._stashedText = i.nodeValue, i.nodeValue = "") : i.nodeValue = i._stashedText || ""), o && o.nodeType === 8)
        if (i = o.data, i === "/$") {
          if (e === 0) break;
          e--;
        } else
          i !== "$" && i !== "$?" && i !== "$~" && i !== "$!" || e++;
      i = o;
    } while (i);
  }
  function Af(e) {
    var a = e.firstChild;
    for (a && a.nodeType === 10 && (a = a.nextSibling); a; ) {
      var i = a;
      switch (a = a.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Af(i), Rc(i);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (i.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(i);
    }
  }
  function Y5(e, a, i, o) {
    for (; e.nodeType === 1; ) {
      var f = i;
      if (e.nodeName.toLowerCase() !== a.toLowerCase()) {
        if (!o && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (o) {
        if (!e[$s])
          switch (a) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (h = e.getAttribute("rel"), h === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (h !== f.rel || e.getAttribute("href") !== (f.href == null || f.href === "" ? null : f.href) || e.getAttribute("crossorigin") !== (f.crossOrigin == null ? null : f.crossOrigin) || e.getAttribute("title") !== (f.title == null ? null : f.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (h = e.getAttribute("src"), (h !== (f.src == null ? null : f.src) || e.getAttribute("type") !== (f.type == null ? null : f.type) || e.getAttribute("crossorigin") !== (f.crossOrigin == null ? null : f.crossOrigin)) && h && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (a === "input" && e.type === "hidden") {
        var h = f.name == null ? null : "" + f.name;
        if (f.type === "hidden" && e.getAttribute("name") === h)
          return e;
      } else return e;
      if (e = mn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function G5(e, a, i) {
    if (a === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !i || (e = mn(e.nextSibling), e === null)) return null;
    return e;
  }
  function dg(e, a) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = mn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Mf(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function _f(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function P5(e, a) {
    var i = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = a;
    else if (e.data !== "$?" || i.readyState !== "loading")
      a();
    else {
      var o = function() {
        a(), i.removeEventListener("DOMContentLoaded", o);
      };
      i.addEventListener("DOMContentLoaded", o), e._reactRetry = o;
    }
  }
  function mn(e) {
    for (; e != null; e = e.nextSibling) {
      var a = e.nodeType;
      if (a === 1 || a === 3) break;
      if (a === 8) {
        if (a = e.data, a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&" || a === "F!" || a === "F")
          break;
        if (a === "/$" || a === "/&") return null;
      }
    }
    return e;
  }
  var Df = null;
  function hg(e) {
    e = e.nextSibling;
    for (var a = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "/$" || i === "/&") {
          if (a === 0)
            return mn(e.nextSibling);
          a--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || a++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function mg(e) {
    e = e.previousSibling;
    for (var a = 0; e; ) {
      if (e.nodeType === 8) {
        var i = e.data;
        if (i === "$" || i === "$!" || i === "$?" || i === "$~" || i === "&") {
          if (a === 0) return e;
          a--;
        } else i !== "/$" && i !== "/&" || a++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function pg(e, a, i) {
    switch (a = ur(i), e) {
      case "html":
        if (e = a.documentElement, !e) throw Error(l(452));
        return e;
      case "head":
        if (e = a.head, !e) throw Error(l(453));
        return e;
      case "body":
        if (e = a.body, !e) throw Error(l(454));
        return e;
      default:
        throw Error(l(451));
    }
  }
  function yl(e) {
    for (var a = e.attributes; a.length; )
      e.removeAttributeNode(a[0]);
    Rc(e);
  }
  var pn = /* @__PURE__ */ new Map(), gg = /* @__PURE__ */ new Set();
  function fr(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var oa = U.d;
  U.d = {
    f: X5,
    r: K5,
    D: Q5,
    C: Z5,
    L: F5,
    m: J5,
    X: I5,
    S: W5,
    M: t4
  };
  function X5() {
    var e = oa.f(), a = nr();
    return e || a;
  }
  function K5(e) {
    var a = Mi(e);
    a !== null && a.tag === 5 && a.type === "form" ? O1(a) : oa.r(e);
  }
  var ls = typeof document > "u" ? null : document;
  function yg(e, a, i) {
    var o = ls;
    if (o && typeof a == "string" && a) {
      var f = on(a);
      f = 'link[rel="' + e + '"][href="' + f + '"]', typeof i == "string" && (f += '[crossorigin="' + i + '"]'), gg.has(f) || (gg.add(f), e = { rel: e, crossOrigin: i, href: a }, o.querySelector(f) === null && (a = o.createElement("link"), Me(a, "link", e), be(a), o.head.appendChild(a)));
    }
  }
  function Q5(e) {
    oa.D(e), yg("dns-prefetch", e, null);
  }
  function Z5(e, a) {
    oa.C(e, a), yg("preconnect", e, a);
  }
  function F5(e, a, i) {
    oa.L(e, a, i);
    var o = ls;
    if (o && e && a) {
      var f = 'link[rel="preload"][as="' + on(a) + '"]';
      a === "image" && i && i.imageSrcSet ? (f += '[imagesrcset="' + on(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (f += '[imagesizes="' + on(
        i.imageSizes
      ) + '"]')) : f += '[href="' + on(e) + '"]';
      var h = f;
      switch (a) {
        case "style":
          h = os(e);
          break;
        case "script":
          h = rs(e);
      }
      pn.has(h) || (e = v(
        {
          rel: "preload",
          href: a === "image" && i && i.imageSrcSet ? void 0 : e,
          as: a
        },
        i
      ), pn.set(h, e), o.querySelector(f) !== null || a === "style" && o.querySelector(vl(h)) || a === "script" && o.querySelector(bl(h)) || (a = o.createElement("link"), Me(a, "link", e), be(a), o.head.appendChild(a)));
    }
  }
  function J5(e, a) {
    oa.m(e, a);
    var i = ls;
    if (i && e) {
      var o = a && typeof a.as == "string" ? a.as : "script", f = 'link[rel="modulepreload"][as="' + on(o) + '"][href="' + on(e) + '"]', h = f;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          h = rs(e);
      }
      if (!pn.has(h) && (e = v({ rel: "modulepreload", href: e }, a), pn.set(h, e), i.querySelector(f) === null)) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(bl(h)))
              return;
        }
        o = i.createElement("link"), Me(o, "link", e), be(o), i.head.appendChild(o);
      }
    }
  }
  function W5(e, a, i) {
    oa.S(e, a, i);
    var o = ls;
    if (o && e) {
      var f = _i(o).hoistableStyles, h = os(e);
      a = a || "default";
      var x = f.get(h);
      if (!x) {
        var A = { loading: 0, preload: null };
        if (x = o.querySelector(
          vl(h)
        ))
          A.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": a },
            i
          ), (i = pn.get(h)) && Rf(e, i);
          var B = x = o.createElement("link");
          be(B), Me(B, "link", e), B._p = new Promise(function(P, I) {
            B.onload = P, B.onerror = I;
          }), B.addEventListener("load", function() {
            A.loading |= 1;
          }), B.addEventListener("error", function() {
            A.loading |= 2;
          }), A.loading |= 4, dr(x, a, o);
        }
        x = {
          type: "stylesheet",
          instance: x,
          count: 1,
          state: A
        }, f.set(h, x);
      }
    }
  }
  function I5(e, a) {
    oa.X(e, a);
    var i = ls;
    if (i && e) {
      var o = _i(i).hoistableScripts, f = rs(e), h = o.get(f);
      h || (h = i.querySelector(bl(f)), h || (e = v({ src: e, async: !0 }, a), (a = pn.get(f)) && Nf(e, a), h = i.createElement("script"), be(h), Me(h, "link", e), i.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, o.set(f, h));
    }
  }
  function t4(e, a) {
    oa.M(e, a);
    var i = ls;
    if (i && e) {
      var o = _i(i).hoistableScripts, f = rs(e), h = o.get(f);
      h || (h = i.querySelector(bl(f)), h || (e = v({ src: e, async: !0, type: "module" }, a), (a = pn.get(f)) && Nf(e, a), h = i.createElement("script"), be(h), Me(h, "link", e), i.head.appendChild(h)), h = {
        type: "script",
        instance: h,
        count: 1,
        state: null
      }, o.set(f, h));
    }
  }
  function vg(e, a, i, o) {
    var f = (f = rt.current) ? fr(f) : null;
    if (!f) throw Error(l(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (a = os(i.href), i = _i(
          f
        ).hoistableStyles, o = i.get(a), o || (o = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(a, o)), o) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          e = os(i.href);
          var h = _i(
            f
          ).hoistableStyles, x = h.get(e);
          if (x || (f = f.ownerDocument || f, x = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, h.set(e, x), (h = f.querySelector(
            vl(e)
          )) && !h._p && (x.instance = h, x.state.loading = 5), pn.has(e) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, pn.set(e, i), h || e4(
            f,
            e,
            i,
            x.state
          ))), a && o === null)
            throw Error(l(528, ""));
          return x;
        }
        if (a && o !== null)
          throw Error(l(529, ""));
        return null;
      case "script":
        return a = i.async, i = i.src, typeof i == "string" && a && typeof a != "function" && typeof a != "symbol" ? (a = rs(i), i = _i(
          f
        ).hoistableScripts, o = i.get(a), o || (o = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, i.set(a, o)), o) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(l(444, e));
    }
  }
  function os(e) {
    return 'href="' + on(e) + '"';
  }
  function vl(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function bg(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function e4(e, a, i, o) {
    e.querySelector('link[rel="preload"][as="style"][' + a + "]") ? o.loading = 1 : (a = e.createElement("link"), o.preload = a, a.addEventListener("load", function() {
      return o.loading |= 1;
    }), a.addEventListener("error", function() {
      return o.loading |= 2;
    }), Me(a, "link", i), be(a), e.head.appendChild(a));
  }
  function rs(e) {
    return '[src="' + on(e) + '"]';
  }
  function bl(e) {
    return "script[async]" + e;
  }
  function xg(e, a, i) {
    if (a.count++, a.instance === null)
      switch (a.type) {
        case "style":
          var o = e.querySelector(
            'style[data-href~="' + on(i.href) + '"]'
          );
          if (o)
            return a.instance = o, be(o), o;
          var f = v({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return o = (e.ownerDocument || e).createElement(
            "style"
          ), be(o), Me(o, "style", f), dr(o, i.precedence, e), a.instance = o;
        case "stylesheet":
          f = os(i.href);
          var h = e.querySelector(
            vl(f)
          );
          if (h)
            return a.state.loading |= 4, a.instance = h, be(h), h;
          o = bg(i), (f = pn.get(f)) && Rf(o, f), h = (e.ownerDocument || e).createElement("link"), be(h);
          var x = h;
          return x._p = new Promise(function(A, B) {
            x.onload = A, x.onerror = B;
          }), Me(h, "link", o), a.state.loading |= 4, dr(h, i.precedence, e), a.instance = h;
        case "script":
          return h = rs(i.src), (f = e.querySelector(
            bl(h)
          )) ? (a.instance = f, be(f), f) : (o = i, (f = pn.get(h)) && (o = v({}, i), Nf(o, f)), e = e.ownerDocument || e, f = e.createElement("script"), be(f), Me(f, "link", o), e.head.appendChild(f), a.instance = f);
        case "void":
          return null;
        default:
          throw Error(l(443, a.type));
      }
    else
      a.type === "stylesheet" && (a.state.loading & 4) === 0 && (o = a.instance, a.state.loading |= 4, dr(o, i.precedence, e));
    return a.instance;
  }
  function dr(e, a, i) {
    for (var o = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), f = o.length ? o[o.length - 1] : null, h = f, x = 0; x < o.length; x++) {
      var A = o[x];
      if (A.dataset.precedence === a) h = A;
      else if (h !== f) break;
    }
    h ? h.parentNode.insertBefore(e, h.nextSibling) : (a = i.nodeType === 9 ? i.head : i, a.insertBefore(e, a.firstChild));
  }
  function Rf(e, a) {
    e.crossOrigin == null && (e.crossOrigin = a.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = a.referrerPolicy), e.title == null && (e.title = a.title);
  }
  function Nf(e, a) {
    e.crossOrigin == null && (e.crossOrigin = a.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = a.referrerPolicy), e.integrity == null && (e.integrity = a.integrity);
  }
  var hr = null;
  function Sg(e, a, i) {
    if (hr === null) {
      var o = /* @__PURE__ */ new Map(), f = hr = /* @__PURE__ */ new Map();
      f.set(i, o);
    } else
      f = hr, o = f.get(i), o || (o = /* @__PURE__ */ new Map(), f.set(i, o));
    if (o.has(e)) return o;
    for (o.set(e, null), i = i.getElementsByTagName(e), f = 0; f < i.length; f++) {
      var h = i[f];
      if (!(h[$s] || h[Te] || e === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
        var x = h.getAttribute(a) || "";
        x = e + x;
        var A = o.get(x);
        A ? A.push(h) : o.set(x, [h]);
      }
    }
    return o;
  }
  function wg(e, a, i) {
    e = e.ownerDocument || e, e.head.insertBefore(
      i,
      a === "title" ? e.querySelector("head > title") : null
    );
  }
  function n4(e, a, i) {
    if (i === 1 || a.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof a.precedence != "string" || typeof a.href != "string" || a.href === "")
          break;
        return !0;
      case "link":
        if (typeof a.rel != "string" || typeof a.href != "string" || a.href === "" || a.onLoad || a.onError)
          break;
        switch (a.rel) {
          case "stylesheet":
            return e = a.disabled, typeof a.precedence == "string" && e == null;
          default:
            return !0;
        }
      case "script":
        if (a.async && typeof a.async != "function" && typeof a.async != "symbol" && !a.onLoad && !a.onError && a.src && typeof a.src == "string")
          return !0;
    }
    return !1;
  }
  function Cg(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function a4(e, a, i, o) {
    if (i.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var f = os(o.href), h = a.querySelector(
          vl(f)
        );
        if (h) {
          a = h._p, a !== null && typeof a == "object" && typeof a.then == "function" && (e.count++, e = mr.bind(e), a.then(e, e)), i.state.loading |= 4, i.instance = h, be(h);
          return;
        }
        h = a.ownerDocument || a, o = bg(o), (f = pn.get(f)) && Rf(o, f), h = h.createElement("link"), be(h);
        var x = h;
        x._p = new Promise(function(A, B) {
          x.onload = A, x.onerror = B;
        }), Me(h, "link", o), i.instance = h;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(i, a), (a = i.state.preload) && (i.state.loading & 3) === 0 && (e.count++, i = mr.bind(e), a.addEventListener("load", i), a.addEventListener("error", i));
    }
  }
  var Of = 0;
  function i4(e, a) {
    return e.stylesheets && e.count === 0 && gr(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(i) {
      var o = setTimeout(function() {
        if (e.stylesheets && gr(e, e.stylesheets), e.unsuspend) {
          var h = e.unsuspend;
          e.unsuspend = null, h();
        }
      }, 6e4 + a);
      0 < e.imgBytes && Of === 0 && (Of = 62500 * V5());
      var f = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && gr(e, e.stylesheets), e.unsuspend)) {
            var h = e.unsuspend;
            e.unsuspend = null, h();
          }
        },
        (e.imgBytes > Of ? 50 : 800) + a
      );
      return e.unsuspend = i, function() {
        e.unsuspend = null, clearTimeout(o), clearTimeout(f);
      };
    } : null;
  }
  function mr() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) gr(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var pr = null;
  function gr(e, a) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, pr = /* @__PURE__ */ new Map(), a.forEach(s4, e), pr = null, mr.call(e));
  }
  function s4(e, a) {
    if (!(a.state.loading & 4)) {
      var i = pr.get(e);
      if (i) var o = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), pr.set(e, i);
        for (var f = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), h = 0; h < f.length; h++) {
          var x = f[h];
          (x.nodeName === "LINK" || x.getAttribute("media") !== "not all") && (i.set(x.dataset.precedence, x), o = x);
        }
        o && i.set(null, o);
      }
      f = a.instance, x = f.getAttribute("data-precedence"), h = i.get(x) || o, h === o && i.set(null, f), i.set(x, f), this.count++, o = mr.bind(this), f.addEventListener("load", o), f.addEventListener("error", o), h ? h.parentNode.insertBefore(f, h.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(f, e.firstChild)), a.state.loading |= 4;
    }
  }
  var xl = {
    $$typeof: R,
    Provider: null,
    Consumer: null,
    _currentValue: X,
    _currentValue2: X,
    _threadCount: 0
  };
  function l4(e, a, i, o, f, h, x, A, B) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ac(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ac(0), this.hiddenUpdates = Ac(null), this.identifierPrefix = o, this.onUncaughtError = f, this.onCaughtError = h, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = B, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Tg(e, a, i, o, f, h, x, A, B, P, I, st) {
    return e = new l4(
      e,
      a,
      i,
      x,
      B,
      P,
      I,
      st,
      A
    ), a = 1, h === !0 && (a |= 24), h = Fe(3, null, null, a), e.current = h, h.stateNode = e, a = fu(), a.refCount++, e.pooledCache = a, a.refCount++, h.memoizedState = {
      element: o,
      isDehydrated: i,
      cache: a
    }, pu(h), e;
  }
  function jg(e) {
    return e ? (e = ki, e) : ki;
  }
  function Eg(e, a, i, o, f, h) {
    f = jg(f), o.context === null ? o.context = f : o.pendingContext = f, o = wa(a), o.payload = { element: i }, h = h === void 0 ? null : h, h !== null && (o.callback = h), i = Ca(e, o, a), i !== null && (Ye(i, e, a), Ws(i, e, a));
  }
  function Ag(e, a) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var i = e.retryLane;
      e.retryLane = i !== 0 && i < a ? i : a;
    }
  }
  function Lf(e, a) {
    Ag(e, a), (e = e.alternate) && Ag(e, a);
  }
  function Mg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var a = Fa(e, 67108864);
      a !== null && Ye(a, e, 67108864), Lf(e, 67108864);
    }
  }
  function _g(e) {
    if (e.tag === 13 || e.tag === 31) {
      var a = en();
      a = Mc(a);
      var i = Fa(e, a);
      i !== null && Ye(i, e, a), Lf(e, a);
    }
  }
  var yr = !0;
  function o4(e, a, i, o) {
    var f = O.T;
    O.T = null;
    var h = U.p;
    try {
      U.p = 2, $f(e, a, i, o);
    } finally {
      U.p = h, O.T = f;
    }
  }
  function r4(e, a, i, o) {
    var f = O.T;
    O.T = null;
    var h = U.p;
    try {
      U.p = 8, $f(e, a, i, o);
    } finally {
      U.p = h, O.T = f;
    }
  }
  function $f(e, a, i, o) {
    if (yr) {
      var f = Bf(o);
      if (f === null)
        Sf(
          e,
          a,
          o,
          vr,
          i
        ), Rg(e, o);
      else if (u4(
        f,
        e,
        a,
        i,
        o
      ))
        o.stopPropagation();
      else if (Rg(e, o), a & 4 && -1 < c4.indexOf(e)) {
        for (; f !== null; ) {
          var h = Mi(f);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var x = Pa(h.pendingLanes);
                  if (x !== 0) {
                    var A = h;
                    for (A.pendingLanes |= 2, A.entangledLanes |= 2; x; ) {
                      var B = 1 << 31 - Qe(x);
                      A.entanglements[1] |= B, x &= ~B;
                    }
                    $n(h), (Bt & 6) === 0 && (tr = Kt() + 500, ml(0));
                  }
                }
                break;
              case 31:
              case 13:
                A = Fa(h, 2), A !== null && Ye(A, h, 2), nr(), Lf(h, 2);
            }
          if (h = Bf(o), h === null && Sf(
            e,
            a,
            o,
            vr,
            i
          ), h === f) break;
          f = h;
        }
        f !== null && o.stopPropagation();
      } else
        Sf(
          e,
          a,
          o,
          null,
          i
        );
    }
  }
  function Bf(e) {
    return e = zc(e), zf(e);
  }
  var vr = null;
  function zf(e) {
    if (vr = null, e = Ai(e), e !== null) {
      var a = u(e);
      if (a === null) e = null;
      else {
        var i = a.tag;
        if (i === 13) {
          if (e = c(a), e !== null) return e;
          e = null;
        } else if (i === 31) {
          if (e = d(a), e !== null) return e;
          e = null;
        } else if (i === 3) {
          if (a.stateNode.current.memoizedState.isDehydrated)
            return a.tag === 3 ? a.stateNode.containerInfo : null;
          e = null;
        } else a !== e && (e = null);
      }
    }
    return vr = e, null;
  }
  function Dg(e) {
    switch (e) {
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
        switch (sn()) {
          case xn:
            return 2;
          case Ga:
            return 8;
          case It:
          case Ce:
            return 32;
          case Yn:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Vf = !1, La = null, $a = null, Ba = null, Sl = /* @__PURE__ */ new Map(), wl = /* @__PURE__ */ new Map(), za = [], c4 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Rg(e, a) {
    switch (e) {
      case "focusin":
      case "focusout":
        La = null;
        break;
      case "dragenter":
      case "dragleave":
        $a = null;
        break;
      case "mouseover":
      case "mouseout":
        Ba = null;
        break;
      case "pointerover":
      case "pointerout":
        Sl.delete(a.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        wl.delete(a.pointerId);
    }
  }
  function Cl(e, a, i, o, f, h) {
    return e === null || e.nativeEvent !== h ? (e = {
      blockedOn: a,
      domEventName: i,
      eventSystemFlags: o,
      nativeEvent: h,
      targetContainers: [f]
    }, a !== null && (a = Mi(a), a !== null && Mg(a)), e) : (e.eventSystemFlags |= o, a = e.targetContainers, f !== null && a.indexOf(f) === -1 && a.push(f), e);
  }
  function u4(e, a, i, o, f) {
    switch (a) {
      case "focusin":
        return La = Cl(
          La,
          e,
          a,
          i,
          o,
          f
        ), !0;
      case "dragenter":
        return $a = Cl(
          $a,
          e,
          a,
          i,
          o,
          f
        ), !0;
      case "mouseover":
        return Ba = Cl(
          Ba,
          e,
          a,
          i,
          o,
          f
        ), !0;
      case "pointerover":
        var h = f.pointerId;
        return Sl.set(
          h,
          Cl(
            Sl.get(h) || null,
            e,
            a,
            i,
            o,
            f
          )
        ), !0;
      case "gotpointercapture":
        return h = f.pointerId, wl.set(
          h,
          Cl(
            wl.get(h) || null,
            e,
            a,
            i,
            o,
            f
          )
        ), !0;
    }
    return !1;
  }
  function Ng(e) {
    var a = Ai(e.target);
    if (a !== null) {
      var i = u(a);
      if (i !== null) {
        if (a = i.tag, a === 13) {
          if (a = c(i), a !== null) {
            e.blockedOn = a, Xm(e.priority, function() {
              _g(i);
            });
            return;
          }
        } else if (a === 31) {
          if (a = d(i), a !== null) {
            e.blockedOn = a, Xm(e.priority, function() {
              _g(i);
            });
            return;
          }
        } else if (a === 3 && i.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = i.tag === 3 ? i.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function br(e) {
    if (e.blockedOn !== null) return !1;
    for (var a = e.targetContainers; 0 < a.length; ) {
      var i = Bf(e.nativeEvent);
      if (i === null) {
        i = e.nativeEvent;
        var o = new i.constructor(
          i.type,
          i
        );
        Bc = o, i.target.dispatchEvent(o), Bc = null;
      } else
        return a = Mi(i), a !== null && Mg(a), e.blockedOn = i, !1;
      a.shift();
    }
    return !0;
  }
  function Og(e, a, i) {
    br(e) && i.delete(a);
  }
  function f4() {
    Vf = !1, La !== null && br(La) && (La = null), $a !== null && br($a) && ($a = null), Ba !== null && br(Ba) && (Ba = null), Sl.forEach(Og), wl.forEach(Og);
  }
  function xr(e, a) {
    e.blockedOn === a && (e.blockedOn = null, Vf || (Vf = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      f4
    )));
  }
  var Sr = null;
  function Lg(e) {
    Sr !== e && (Sr = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        Sr === e && (Sr = null);
        for (var a = 0; a < e.length; a += 3) {
          var i = e[a], o = e[a + 1], f = e[a + 2];
          if (typeof o != "function") {
            if (zf(o || i) === null)
              continue;
            break;
          }
          var h = Mi(i);
          h !== null && (e.splice(a, 3), a -= 3, $u(
            h,
            {
              pending: !0,
              data: f,
              method: i.method,
              action: o
            },
            o,
            f
          ));
        }
      }
    ));
  }
  function cs(e) {
    function a(B) {
      return xr(B, e);
    }
    La !== null && xr(La, e), $a !== null && xr($a, e), Ba !== null && xr(Ba, e), Sl.forEach(a), wl.forEach(a);
    for (var i = 0; i < za.length; i++) {
      var o = za[i];
      o.blockedOn === e && (o.blockedOn = null);
    }
    for (; 0 < za.length && (i = za[0], i.blockedOn === null); )
      Ng(i), i.blockedOn === null && za.shift();
    if (i = (e.ownerDocument || e).$$reactFormReplay, i != null)
      for (o = 0; o < i.length; o += 3) {
        var f = i[o], h = i[o + 1], x = f[ze] || null;
        if (typeof h == "function")
          x || Lg(i);
        else if (x) {
          var A = null;
          if (h && h.hasAttribute("formAction")) {
            if (f = h, x = h[ze] || null)
              A = x.formAction;
            else if (zf(f) !== null) continue;
          } else A = x.action;
          typeof A == "function" ? i[o + 1] = A : (i.splice(o, 3), o -= 3), Lg(i);
        }
      }
  }
  function $g() {
    function e(h) {
      h.canIntercept && h.info === "react-transition" && h.intercept({
        handler: function() {
          return new Promise(function(x) {
            return f = x;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function a() {
      f !== null && (f(), f = null), o || setTimeout(i, 20);
    }
    function i() {
      if (!o && !navigation.transition) {
        var h = navigation.currentEntry;
        h && h.url != null && navigation.navigate(h.url, {
          state: h.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var o = !1, f = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", a), navigation.addEventListener("navigateerror", a), setTimeout(i, 100), function() {
        o = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", a), navigation.removeEventListener("navigateerror", a), f !== null && (f(), f = null);
      };
    }
  }
  function kf(e) {
    this._internalRoot = e;
  }
  wr.prototype.render = kf.prototype.render = function(e) {
    var a = this._internalRoot;
    if (a === null) throw Error(l(409));
    var i = a.current, o = en();
    Eg(i, o, e, a, null, null);
  }, wr.prototype.unmount = kf.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var a = e.containerInfo;
      Eg(e.current, 2, null, e, null, null), nr(), a[Ei] = null;
    }
  };
  function wr(e) {
    this._internalRoot = e;
  }
  wr.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var a = Pm();
      e = { blockedOn: null, target: e, priority: a };
      for (var i = 0; i < za.length && a !== 0 && a < za[i].priority; i++) ;
      za.splice(i, 0, e), i === 0 && Ng(e);
    }
  };
  var Bg = t.version;
  if (Bg !== "19.2.7")
    throw Error(
      l(
        527,
        Bg,
        "19.2.7"
      )
    );
  U.findDOMNode = function(e) {
    var a = e._reactInternals;
    if (a === void 0)
      throw typeof e.render == "function" ? Error(l(188)) : (e = Object.keys(e).join(","), Error(l(268, e)));
    return e = m(a), e = e !== null ? y(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var d4 = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Cr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Cr.isDisabled && Cr.supportsFiber)
      try {
        Ns = Cr.inject(
          d4
        ), Ke = Cr;
      } catch {
      }
  }
  return jl.createRoot = function(e, a) {
    if (!r(e)) throw Error(l(299));
    var i = !1, o = "", f = Y1, h = G1, x = P1;
    return a != null && (a.unstable_strictMode === !0 && (i = !0), a.identifierPrefix !== void 0 && (o = a.identifierPrefix), a.onUncaughtError !== void 0 && (f = a.onUncaughtError), a.onCaughtError !== void 0 && (h = a.onCaughtError), a.onRecoverableError !== void 0 && (x = a.onRecoverableError)), a = Tg(
      e,
      1,
      !1,
      null,
      null,
      i,
      o,
      null,
      f,
      h,
      x,
      $g
    ), e[Ei] = a.current, xf(e), new kf(a);
  }, jl.hydrateRoot = function(e, a, i) {
    if (!r(e)) throw Error(l(299));
    var o = !1, f = "", h = Y1, x = G1, A = P1, B = null;
    return i != null && (i.unstable_strictMode === !0 && (o = !0), i.identifierPrefix !== void 0 && (f = i.identifierPrefix), i.onUncaughtError !== void 0 && (h = i.onUncaughtError), i.onCaughtError !== void 0 && (x = i.onCaughtError), i.onRecoverableError !== void 0 && (A = i.onRecoverableError), i.formState !== void 0 && (B = i.formState)), a = Tg(
      e,
      1,
      !0,
      a,
      i ?? null,
      o,
      f,
      B,
      h,
      x,
      A,
      $g
    ), a.context = jg(null), i = a.current, o = en(), o = Mc(o), f = wa(o), f.callback = null, Ca(i, f, o), i = o, a.current.lanes = i, Ls(a, i), $n(a), e[Ei] = a.current, xf(e), new wr(a);
  }, jl.version = "19.2.7", jl;
}
var Xg;
function T4() {
  if (Xg) return qf.exports;
  Xg = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (t) {
        console.error(t);
      }
  }
  return n(), qf.exports = C4(), qf.exports;
}
var fs = T4(), Xf = { exports: {} }, Kf = {};
var Kg;
function j4() {
  if (Kg) return Kf;
  Kg = 1;
  var n = Wl().__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  return Kf.c = function(t) {
    return n.H.useMemoCache(t);
  }, Kf;
}
var Qg;
function E4() {
  return Qg || (Qg = 1, Xf.exports = j4()), Xf.exports;
}
var xt = E4(), Qf = { exports: {} }, Zf = {};
var Zg;
function A4() {
  if (Zg) return Zf;
  Zg = 1;
  var n = Wl();
  function t(v, b) {
    return v === b && (v !== 0 || 1 / v === 1 / b) || v !== v && b !== b;
  }
  var s = typeof Object.is == "function" ? Object.is : t, l = n.useState, r = n.useEffect, u = n.useLayoutEffect, c = n.useDebugValue;
  function d(v, b) {
    var T = b(), S = l({ inst: { value: T, getSnapshot: b } }), C = S[0].inst, w = S[1];
    return u(
      function() {
        C.value = T, C.getSnapshot = b, g(C) && w({ inst: C });
      },
      [v, T, b]
    ), r(
      function() {
        return g(C) && w({ inst: C }), v(function() {
          g(C) && w({ inst: C });
        });
      },
      [v]
    ), c(T), T;
  }
  function g(v) {
    var b = v.getSnapshot;
    v = v.value;
    try {
      var T = b();
      return !s(v, T);
    } catch {
      return !0;
    }
  }
  function m(v, b) {
    return b();
  }
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? m : d;
  return Zf.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : y, Zf;
}
var Fg;
function M4() {
  return Fg || (Fg = 1, Qf.exports = A4()), Qf.exports;
}
var _4 = M4();
const D4 = b4.useInsertionEffect, R4 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", N4 = R4 ? j.useLayoutEffect : j.useEffect, O4 = D4 || N4, M2 = (n) => {
  const t = j.useRef([n, (...s) => t[0](...s)]).current;
  return O4(() => {
    t[0] = n;
  }), t[1];
};
function Ah(n, t) {
  n.indexOf(t) === -1 && n.push(t);
}
function xs(n, t) {
  const s = n.indexOf(t);
  s > -1 && n.splice(s, 1);
}
const Un = (n, t, s) => s > t ? t : s < n ? n : s;
let Mh = () => {
};
const Ha = {}, _2 = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n), D2 = (n) => typeof n == "object" && n !== null, R2 = (n) => /^0[^.\s]+$/u.test(n);
// @__NO_SIDE_EFFECTS__
function N2(n) {
  let t;
  return () => (t === void 0 && (t = n()), t);
}
const vn = /* @__NO_SIDE_EFFECTS__ */ (n) => n, Il = (...n) => n.reduce((t, s) => (l) => s(t(l))), Ss = /* @__NO_SIDE_EFFECTS__ */ (n, t, s) => {
  const l = t - n;
  return l ? (s - n) / l : 1;
};
class _h {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return Ah(this.subscriptions, t), () => xs(this.subscriptions, t);
  }
  notify(t, s, l) {
    const r = this.subscriptions.length;
    if (r)
      if (r === 1)
        this.subscriptions[0](t, s, l);
      else
        for (let u = 0; u < r; u++) {
          const c = this.subscriptions[u];
          c && c(t, s, l);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Pe = /* @__NO_SIDE_EFFECTS__ */ (n) => n * 1e3, yn = /* @__NO_SIDE_EFFECTS__ */ (n) => n / 1e3, O2 = /* @__NO_SIDE_EFFECTS__ */ (n, t) => t ? n * (1e3 / t) : 0, L4 = (n, t, s) => {
  const l = t - n;
  return ((s - n) % l + l) % l + n;
}, L2 = (n, t, s) => (((1 - 3 * s + 3 * t) * n + (3 * s - 6 * t)) * n + 3 * t) * n, $4 = 1e-7, B4 = 12;
function z4(n, t, s, l, r) {
  let u, c, d = 0;
  do
    c = t + (s - t) / 2, u = L2(c, l, r) - n, u > 0 ? s = c : t = c;
  while (Math.abs(u) > $4 && ++d < B4);
  return c;
}
// @__NO_SIDE_EFFECTS__
function to(n, t, s, l) {
  if (n === t && s === l)
    return vn;
  const r = (u) => z4(u, 0, 1, n, s);
  return (u) => u === 0 || u === 1 ? u : L2(r(u), t, l);
}
const $2 = /* @__NO_SIDE_EFFECTS__ */ (n) => (t) => t <= 0.5 ? n(2 * t) / 2 : (2 - n(2 * (1 - t))) / 2, Dh = /* @__NO_SIDE_EFFECTS__ */ (n) => (t) => 1 - n(1 - t), B2 = /* @__PURE__ */ to(0.33, 1.53, 0.69, 0.99), Rh = /* @__PURE__ */ Dh(B2), z2 = /* @__PURE__ */ $2(Rh), V2 = (n) => n >= 1 ? 1 : (n *= 2) < 1 ? 0.5 * Rh(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))), Nh = (n) => 1 - Math.sin(Math.acos(n)), k2 = /* @__PURE__ */ Dh(Nh), U2 = /* @__PURE__ */ $2(Nh), V4 = /* @__PURE__ */ to(0.42, 0, 1, 1), k4 = /* @__PURE__ */ to(0, 0, 0.58, 1), H2 = /* @__PURE__ */ to(0.42, 0, 0.58, 1), q2 = /* @__NO_SIDE_EFFECTS__ */ (n) => Array.isArray(n) && typeof n[0] != "number";
// @__NO_SIDE_EFFECTS__
function Y2(n, t) {
  return /* @__PURE__ */ q2(n) ? n[L4(0, n.length, t)] : n;
}
const G2 = /* @__NO_SIDE_EFFECTS__ */ (n) => Array.isArray(n) && typeof n[0] == "number", U4 = {
  linear: vn,
  easeIn: V4,
  easeInOut: H2,
  easeOut: k4,
  circIn: Nh,
  circInOut: U2,
  circOut: k2,
  backIn: Rh,
  backInOut: z2,
  backOut: B2,
  anticipate: V2
}, H4 = (n) => typeof n == "string", Jg = (n) => {
  if (/* @__PURE__ */ G2(n)) {
    Mh(n.length === 4);
    const [t, s, l, r] = n;
    return /* @__PURE__ */ to(t, s, l, r);
  } else if (H4(n))
    return U4[n];
  return n;
}, Oh = j.createContext({}), Lh = j.createContext({ strict: !1 }), ws = j.createContext({
  transformPagePoint: (n) => n,
  isStatic: !1,
  reducedMotion: "never"
}), mc = /* @__PURE__ */ j.createContext({}), Tr = [
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
function q4(n) {
  let t = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), l = !1, r = !1;
  const u = /* @__PURE__ */ new WeakSet();
  let c = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function d(m) {
    u.has(m) && (g.schedule(m), n()), m(c);
  }
  const g = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (m, y = !1, v = !1) => {
      const T = v && l ? t : s;
      return y && u.add(m), T.add(m), m;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (m) => {
      s.delete(m), u.delete(m);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (m) => {
      if (c = m, l) {
        r = !0;
        return;
      }
      l = !0;
      const y = t;
      t = s, s = y, t.forEach(d), t.clear(), l = !1, r && (r = !1, g.process(m));
    }
  };
  return g;
}
const Y4 = 40;
function P2(n, t) {
  let s = !1, l = !0;
  const r = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, u = () => s = !0, c = Tr.reduce((R, D) => (R[D] = q4(u), R), {}), { setup: d, read: g, resolveKeyframes: m, preUpdate: y, update: v, preRender: b, render: T, postRender: S } = c, C = () => {
    const R = Ha.useManualTiming, D = R ? r.timestamp : performance.now();
    s = !1, R || (r.delta = l ? 1e3 / 60 : Math.max(Math.min(D - r.timestamp, Y4), 1)), r.timestamp = D, r.isProcessing = !0, d.process(r), g.process(r), m.process(r), y.process(r), v.process(r), b.process(r), T.process(r), S.process(r), r.isProcessing = !1, s && t && (l = !1, n(C));
  }, w = () => {
    s = !0, l = !0, r.isProcessing || n(C);
  };
  return { schedule: Tr.reduce((R, D) => {
    const L = c[D];
    return R[D] = ($, E = !1, z = !1) => (s || w(), L.schedule($, E, z)), R;
  }, {}), cancel: (R) => {
    for (let D = 0; D < Tr.length; D++)
      c[Tr[D]].cancel(R);
  }, state: r, steps: c };
}
const { schedule: Xt, cancel: ua, state: _e, steps: Ff } = /* @__PURE__ */ P2(typeof requestAnimationFrame < "u" ? requestAnimationFrame : vn, !0);
let qr;
function G4() {
  qr = void 0;
}
const Le = {
  now: () => (qr === void 0 && Le.set(_e.isProcessing || Ha.useManualTiming ? _e.timestamp : performance.now()), qr),
  set: (n) => {
    qr = n, queueMicrotask(G4);
  }
}, X2 = (n) => (t) => typeof t == "string" && t.startsWith(n), K2 = /* @__PURE__ */ X2("--"), P4 = /* @__PURE__ */ X2("var(--"), $h = (n) => P4(n) ? X4.test(n.split("/*")[0].trim()) : !1, X4 = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function Wg(n) {
  return typeof n != "string" ? !1 : n.split("/*")[0].includes("var(--");
}
const Ms = {
  test: (n) => typeof n == "number",
  parse: parseFloat,
  transform: (n) => n
}, ql = {
  ...Ms,
  transform: (n) => Un(0, 1, n)
}, jr = {
  ...Ms,
  default: 1
}, Ol = (n) => Math.round(n * 1e5) / 1e5, Bh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function K4(n) {
  return n == null;
}
const Q4 = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, zh = (n, t) => (s) => !!(typeof s == "string" && Q4.test(s) && s.startsWith(n) || t && !K4(s) && Object.prototype.hasOwnProperty.call(s, t)), Q2 = (n, t, s) => (l) => {
  if (typeof l != "string")
    return l;
  const [r, u, c, d] = l.match(Bh);
  return {
    [n]: parseFloat(r),
    [t]: parseFloat(u),
    [s]: parseFloat(c),
    alpha: d !== void 0 ? parseFloat(d) : 1
  };
}, Z4 = (n) => Un(0, 255, n), Jf = {
  ...Ms,
  transform: (n) => Math.round(Z4(n))
}, yi = {
  test: /* @__PURE__ */ zh("rgb", "red"),
  parse: /* @__PURE__ */ Q2("red", "green", "blue"),
  transform: ({ red: n, green: t, blue: s, alpha: l = 1 }) => "rgba(" + Jf.transform(n) + ", " + Jf.transform(t) + ", " + Jf.transform(s) + ", " + Ol(ql.transform(l)) + ")"
};
function F4(n) {
  let t = "", s = "", l = "", r = "";
  return n.length > 5 ? (t = n.substring(1, 3), s = n.substring(3, 5), l = n.substring(5, 7), r = n.substring(7, 9)) : (t = n.substring(1, 2), s = n.substring(2, 3), l = n.substring(3, 4), r = n.substring(4, 5), t += t, s += s, l += l, r += r), {
    red: parseInt(t, 16),
    green: parseInt(s, 16),
    blue: parseInt(l, 16),
    alpha: r ? parseInt(r, 16) / 255 : 1
  };
}
const Ld = {
  test: /* @__PURE__ */ zh("#"),
  parse: F4,
  transform: yi.transform
}, eo = /* @__NO_SIDE_EFFECTS__ */ (n) => ({
  test: (t) => typeof t == "string" && t.endsWith(n) && t.split(" ").length === 1,
  parse: parseFloat,
  transform: (t) => `${t}${n}`
}), ra = /* @__PURE__ */ eo("deg"), kn = /* @__PURE__ */ eo("%"), ht = /* @__PURE__ */ eo("px"), J4 = /* @__PURE__ */ eo("vh"), W4 = /* @__PURE__ */ eo("vw"), Ig = {
  ...kn,
  parse: (n) => kn.parse(n) / 100,
  transform: (n) => kn.transform(n * 100)
}, hs = {
  test: /* @__PURE__ */ zh("hsl", "hue"),
  parse: /* @__PURE__ */ Q2("hue", "saturation", "lightness"),
  transform: ({ hue: n, saturation: t, lightness: s, alpha: l = 1 }) => "hsla(" + Math.round(n) + ", " + kn.transform(Ol(t)) + ", " + kn.transform(Ol(s)) + ", " + Ol(ql.transform(l)) + ")"
}, he = {
  test: (n) => yi.test(n) || Ld.test(n) || hs.test(n),
  parse: (n) => yi.test(n) ? yi.parse(n) : hs.test(n) ? hs.parse(n) : Ld.parse(n),
  transform: (n) => typeof n == "string" ? n : n.hasOwnProperty("red") ? yi.transform(n) : hs.transform(n),
  getAnimatableNone: (n) => {
    const t = he.parse(n);
    return t.alpha = 0, he.transform(t);
  }
}, I4 = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function tw(n) {
  return isNaN(n) && typeof n == "string" && (n.match(Bh)?.length || 0) + (n.match(I4)?.length || 0) > 0;
}
const Z2 = "number", F2 = "color", ew = "var", nw = "var(", ty = "${}", aw = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Cs(n) {
  const t = n.toString(), s = [], l = {
    color: [],
    number: [],
    var: []
  }, r = [];
  let u = 0;
  const d = t.replace(aw, (g) => (he.test(g) ? (l.color.push(u), r.push(F2), s.push(he.parse(g))) : g.startsWith(nw) ? (l.var.push(u), r.push(ew), s.push(g)) : (l.number.push(u), r.push(Z2), s.push(parseFloat(g))), ++u, ty)).split(ty);
  return { values: s, split: d, indexes: l, types: r };
}
function iw(n) {
  return Cs(n).values;
}
function J2({ split: n, types: t }) {
  const s = n.length;
  return (l) => {
    let r = "";
    for (let u = 0; u < s; u++)
      if (r += n[u], l[u] !== void 0) {
        const c = t[u];
        c === Z2 ? r += Ol(l[u]) : c === F2 ? r += he.transform(l[u]) : r += l[u];
      }
    return r;
  };
}
function sw(n) {
  return J2(Cs(n));
}
const lw = (n) => typeof n == "number" ? 0 : he.test(n) ? he.getAnimatableNone(n) : n, ow = (n, t) => typeof n == "number" ? t?.trim().endsWith("/") ? n : 0 : lw(n);
function rw(n) {
  const t = Cs(n);
  return J2(t)(t.values.map((l, r) => ow(l, t.split[r])));
}
const Dn = {
  test: tw,
  parse: iw,
  createTransformer: sw,
  getAnimatableNone: rw
};
function Wf(n, t, s) {
  return s < 0 && (s += 1), s > 1 && (s -= 1), s < 1 / 6 ? n + (t - n) * 6 * s : s < 1 / 2 ? t : s < 2 / 3 ? n + (t - n) * (2 / 3 - s) * 6 : n;
}
function cw({ hue: n, saturation: t, lightness: s, alpha: l }) {
  n /= 360, t /= 100, s /= 100;
  let r = 0, u = 0, c = 0;
  if (!t)
    r = u = c = s;
  else {
    const d = s < 0.5 ? s * (1 + t) : s + t - s * t, g = 2 * s - d;
    r = Wf(g, d, n + 1 / 3), u = Wf(g, d, n), c = Wf(g, d, n - 1 / 3);
  }
  return {
    red: Math.round(r * 255),
    green: Math.round(u * 255),
    blue: Math.round(c * 255),
    alpha: l
  };
}
function Ir(n, t) {
  return (s) => s > 0 ? t : n;
}
const Pt = (n, t, s) => n + (t - n) * s, If = (n, t, s) => {
  const l = n * n, r = s * (t * t - l) + l;
  return r < 0 ? 0 : Math.sqrt(r);
}, uw = [Ld, yi, hs], fw = (n) => uw.find((t) => t.test(n));
function ey(n) {
  const t = fw(n);
  if (!t)
    return !1;
  let s = t.parse(n);
  return t === hs && (s = cw(s)), s;
}
const ny = (n, t) => {
  const s = ey(n), l = ey(t);
  if (!s || !l)
    return Ir(n, t);
  const r = { ...s };
  return (u) => (r.red = If(s.red, l.red, u), r.green = If(s.green, l.green, u), r.blue = If(s.blue, l.blue, u), r.alpha = Pt(s.alpha, l.alpha, u), yi.transform(r));
}, $d = /* @__PURE__ */ new Set(["none", "hidden"]);
function dw(n, t) {
  return $d.has(n) ? (s) => s <= 0 ? n : t : (s) => s >= 1 ? t : n;
}
function hw(n, t) {
  return (s) => Pt(n, t, s);
}
function Vh(n) {
  return typeof n == "number" ? hw : typeof n == "string" ? $h(n) ? Ir : he.test(n) ? ny : gw : Array.isArray(n) ? W2 : typeof n == "object" ? he.test(n) ? ny : mw : Ir;
}
function W2(n, t) {
  const s = [...n], l = s.length, r = n.map((u, c) => Vh(u)(u, t[c]));
  return (u) => {
    for (let c = 0; c < l; c++)
      s[c] = r[c](u);
    return s;
  };
}
function mw(n, t) {
  const s = { ...n, ...t }, l = {};
  for (const r in s)
    n[r] !== void 0 && t[r] !== void 0 && (l[r] = Vh(n[r])(n[r], t[r]));
  return (r) => {
    for (const u in l)
      s[u] = l[u](r);
    return s;
  };
}
function pw(n, t) {
  const s = [], l = { color: 0, var: 0, number: 0 };
  for (let r = 0; r < t.values.length; r++) {
    const u = t.types[r], c = n.indexes[u][l[u]], d = n.values[c] ?? 0;
    s[r] = d, l[u]++;
  }
  return s;
}
const gw = (n, t) => {
  const s = Dn.createTransformer(t), l = Cs(n), r = Cs(t);
  return l.indexes.var.length === r.indexes.var.length && l.indexes.color.length === r.indexes.color.length && l.indexes.number.length >= r.indexes.number.length ? $d.has(n) && !r.values.length || $d.has(t) && !l.values.length ? dw(n, t) : Il(W2(pw(l, r), r.values), s) : Ir(n, t);
};
function I2(n, t, s) {
  return typeof n == "number" && typeof t == "number" && typeof s == "number" ? Pt(n, t, s) : Vh(n)(n, t);
}
const yw = (n) => {
  const t = ({ timestamp: s }) => n(s);
  return {
    start: (s = !0) => Xt.update(t, s),
    stop: () => ua(t),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => _e.isProcessing ? _e.timestamp : Le.now()
  };
}, tb = (n, t, s = 10) => {
  let l = "";
  const r = Math.max(Math.round(t / s), 2);
  for (let u = 0; u < r; u++)
    l += Math.round(n(u / (r - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${l.substring(0, l.length - 2)})`;
}, tc = 2e4;
function kh(n) {
  let t = 0;
  const s = 50;
  let l = n.next(t);
  for (; !l.done && t < tc; )
    t += s, l = n.next(t);
  return t >= tc ? 1 / 0 : t;
}
function eb(n, t = 100, s) {
  const l = s({ ...n, keyframes: [0, t] }), r = Math.min(kh(l), tc);
  return {
    type: "keyframes",
    ease: (u) => l.next(r * u).value / t,
    duration: /* @__PURE__ */ yn(r)
  };
}
const se = {
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
function Bd(n, t) {
  return n * Math.sqrt(1 - t * t);
}
const vw = 12;
function bw(n, t, s) {
  let l = s;
  for (let r = 1; r < vw; r++)
    l = l - n(l) / t(l);
  return l;
}
const td = 1e-3;
function xw({ duration: n = se.duration, bounce: t = se.bounce, velocity: s = se.velocity, mass: l = se.mass }) {
  let r, u, c = 1 - t;
  c = Un(se.minDamping, se.maxDamping, c), n = Un(se.minDuration, se.maxDuration, /* @__PURE__ */ yn(n)), c < 1 ? (r = (m) => {
    const y = m * c, v = y * n, b = y - s, T = Bd(m, c), S = Math.exp(-v);
    return td - b / T * S;
  }, u = (m) => {
    const v = m * c * n, b = v * s + s, T = Math.pow(c, 2) * Math.pow(m, 2) * n, S = Math.exp(-v), C = Bd(Math.pow(m, 2), c);
    return (-r(m) + td > 0 ? -1 : 1) * ((b - T) * S) / C;
  }) : (r = (m) => {
    const y = Math.exp(-m * n), v = (m - s) * n + 1;
    return -td + y * v;
  }, u = (m) => {
    const y = Math.exp(-m * n), v = (s - m) * (n * n);
    return y * v;
  });
  const d = 5 / n, g = bw(r, u, d);
  if (n = /* @__PURE__ */ Pe(n), isNaN(g))
    return {
      stiffness: se.stiffness,
      damping: se.damping,
      duration: n
    };
  {
    const m = Math.pow(g, 2) * l;
    return {
      stiffness: m,
      damping: c * 2 * Math.sqrt(l * m),
      duration: n
    };
  }
}
const Sw = ["duration", "bounce"], ww = ["stiffness", "damping", "mass"];
function ay(n, t) {
  return t.some((s) => n[s] !== void 0);
}
function Cw(n) {
  let t = {
    velocity: se.velocity,
    stiffness: se.stiffness,
    damping: se.damping,
    mass: se.mass,
    isResolvedFromDuration: !1,
    ...n
  };
  if (!ay(n, ww) && ay(n, Sw))
    if (t.velocity = 0, n.visualDuration) {
      const s = n.visualDuration, l = 2 * Math.PI / (s * 1.2), r = l * l, u = 2 * Un(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(r);
      t = {
        ...t,
        mass: se.mass,
        stiffness: r,
        damping: u
      };
    } else {
      const s = xw({ ...n, velocity: 0 });
      t = {
        ...t,
        ...s,
        mass: se.mass
      }, t.isResolvedFromDuration = !0;
    }
  return t;
}
function Yl(n = se.visualDuration, t = se.bounce) {
  const s = typeof n != "object" ? {
    visualDuration: n,
    keyframes: [0, 1],
    bounce: t
  } : n;
  let { restSpeed: l, restDelta: r } = s;
  const u = s.keyframes[0], c = s.keyframes[s.keyframes.length - 1], d = { done: !1, value: u }, { stiffness: g, damping: m, mass: y, duration: v, velocity: b, isResolvedFromDuration: T } = Cw({
    ...s,
    velocity: -/* @__PURE__ */ yn(s.velocity || 0)
  }), S = b || 0, C = m / (2 * Math.sqrt(g * y)), w = c - u, M = /* @__PURE__ */ yn(Math.sqrt(g / y)), _ = Math.abs(w) < 5;
  l || (l = _ ? se.restSpeed.granular : se.restSpeed.default), r || (r = _ ? se.restDelta.granular : se.restDelta.default);
  let R, D, L, $, E, z;
  if (C < 1)
    L = Bd(M, C), $ = (S + C * M * w) / L, R = (Y) => {
      const et = Math.exp(-C * M * Y);
      return c - et * ($ * Math.sin(L * Y) + w * Math.cos(L * Y));
    }, E = C * M * $ + w * L, z = C * M * w - $ * L, D = (Y) => Math.exp(-C * M * Y) * (E * Math.sin(L * Y) + z * Math.cos(L * Y));
  else if (C === 1) {
    R = (et) => c - Math.exp(-M * et) * (w + (S + M * w) * et);
    const Y = S + M * w;
    D = (et) => Math.exp(-M * et) * (M * Y * et - S);
  } else {
    const Y = M * Math.sqrt(C * C - 1);
    R = (Q) => {
      const W = Math.exp(-C * M * Q), O = Math.min(Y * Q, 300);
      return c - W * ((S + C * M * w) * Math.sinh(O) + Y * w * Math.cosh(O)) / Y;
    };
    const et = (S + C * M * w) / Y, nt = C * M * et - w * Y, J = C * M * w - et * Y;
    D = (Q) => {
      const W = Math.exp(-C * M * Q), O = Math.min(Y * Q, 300);
      return W * (nt * Math.sinh(O) + J * Math.cosh(O));
    };
  }
  const k = {
    calculatedDuration: T && v || null,
    velocity: (Y) => /* @__PURE__ */ Pe(D(Y)),
    next: (Y) => {
      if (!T && C < 1) {
        const nt = Math.exp(-C * M * Y), J = Math.sin(L * Y), Q = Math.cos(L * Y), W = c - nt * ($ * J + w * Q), O = /* @__PURE__ */ Pe(nt * (E * J + z * Q));
        return d.done = Math.abs(O) <= l && Math.abs(c - W) <= r, d.value = d.done ? c : W, d;
      }
      const et = R(Y);
      if (T)
        d.done = Y >= v;
      else {
        const nt = /* @__PURE__ */ Pe(D(Y));
        d.done = Math.abs(nt) <= l && Math.abs(c - et) <= r;
      }
      return d.value = d.done ? c : et, d;
    },
    toString: () => {
      const Y = Math.min(kh(k), tc), et = tb((nt) => k.next(Y * nt).value, Y, 30);
      return Y + "ms " + et;
    },
    toTransition: () => {
    }
  };
  return k;
}
Yl.applyToOptions = (n) => {
  const t = eb(n, 100, Yl);
  return n.ease = t.ease, n.duration = /* @__PURE__ */ Pe(t.duration), n.type = "keyframes", n;
};
const Tw = 5;
function nb(n, t, s) {
  const l = Math.max(t - Tw, 0);
  return /* @__PURE__ */ O2(s - n(l), t - l);
}
function zd({ keyframes: n, velocity: t = 0, power: s = 0.8, timeConstant: l = 325, bounceDamping: r = 10, bounceStiffness: u = 500, modifyTarget: c, min: d, max: g, restDelta: m = 0.5, restSpeed: y }) {
  const v = n[0], b = {
    done: !1,
    value: v
  }, T = (z) => d !== void 0 && z < d || g !== void 0 && z > g, S = (z) => d === void 0 ? g : g === void 0 || Math.abs(d - z) < Math.abs(g - z) ? d : g;
  let C = s * t;
  const w = v + C, M = c === void 0 ? w : c(w);
  M !== w && (C = M - v);
  const _ = (z) => -C * Math.exp(-z / l), R = (z) => M + _(z), D = (z) => {
    const k = _(z), Y = R(z);
    b.done = Math.abs(k) <= m, b.value = b.done ? M : Y;
  };
  let L, $;
  const E = (z) => {
    T(b.value) && (L = z, $ = Yl({
      keyframes: [b.value, S(b.value)],
      velocity: nb(R, z, b.value),
      // TODO: This should be passing * 1000
      damping: r,
      stiffness: u,
      restDelta: m,
      restSpeed: y
    }));
  };
  return E(0), {
    calculatedDuration: null,
    next: (z) => {
      let k = !1;
      return !$ && L === void 0 && (k = !0, D(z), E(z)), L !== void 0 && z >= L ? $.next(z - L) : (!k && D(z), b);
    }
  };
}
function jw(n, t, s) {
  const l = [], r = s || Ha.mix || I2, u = n.length - 1;
  for (let c = 0; c < u; c++) {
    let d = r(n[c], n[c + 1]);
    if (t) {
      const g = Array.isArray(t) ? t[c] || vn : t;
      d = Il(g, d);
    }
    l.push(d);
  }
  return l;
}
function ab(n, t, { clamp: s = !0, ease: l, mixer: r } = {}) {
  const u = n.length;
  if (Mh(u === t.length), u === 1)
    return () => t[0];
  if (u === 2 && t[0] === t[1])
    return () => t[1];
  const c = n[0] === n[1];
  n[0] > n[u - 1] && (n = [...n].reverse(), t = [...t].reverse());
  const d = jw(t, l, r), g = d.length, m = (y) => {
    if (c && y < n[0])
      return t[0];
    let v = 0;
    if (g > 1)
      for (; v < n.length - 2 && !(y < n[v + 1]); v++)
        ;
    const b = /* @__PURE__ */ Ss(n[v], n[v + 1], y);
    return d[v](b);
  };
  return s ? (y) => m(Un(n[0], n[u - 1], y)) : m;
}
function ib(n, t) {
  const s = n[n.length - 1];
  for (let l = 1; l <= t; l++) {
    const r = /* @__PURE__ */ Ss(0, t, l);
    n.push(Pt(s, 1, r));
  }
}
function sb(n) {
  const t = [0];
  return ib(t, n.length - 1), t;
}
function Ew(n, t) {
  return n.map((s) => s * t);
}
function Aw(n, t) {
  return n.map(() => t || H2).splice(0, n.length - 1);
}
function Ll({ duration: n = 300, keyframes: t, times: s, ease: l = "easeInOut" }) {
  const r = /* @__PURE__ */ q2(l) ? l.map(Jg) : Jg(l), u = {
    done: !1,
    value: t[0]
  }, c = Ew(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    s && s.length === t.length ? s : sb(t),
    n
  ), d = ab(c, t, {
    ease: Array.isArray(r) ? r : Aw(t, r)
  });
  return {
    calculatedDuration: n,
    next: (g) => (u.value = d(g), u.done = g >= n, u)
  };
}
const Mw = (n) => n !== null;
function pc(n, { repeat: t, repeatType: s = "loop" }, l, r = 1) {
  const u = n.filter(Mw), d = r < 0 || t && s !== "loop" && t % 2 === 1 ? 0 : u.length - 1;
  return !d || l === void 0 ? u[d] : l;
}
const _w = {
  decay: zd,
  inertia: zd,
  tween: Ll,
  keyframes: Ll,
  spring: Yl
};
function lb(n) {
  typeof n.type == "string" && (n.type = _w[n.type]);
}
class Uh {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((t) => {
      this.resolve = t;
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
  then(t, s) {
    return this.finished.then(t, s);
  }
}
const Dw = (n) => n / 100;
class ec extends Uh {
  constructor(t) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: s } = this.options;
      s && s.updatedAt !== Le.now() && this.tick(Le.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = t, this.initAnimation(), this.play(), t.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: t } = this;
    lb(t);
    const { type: s = Ll, repeat: l = 0, repeatDelay: r = 0, repeatType: u, velocity: c = 0 } = t;
    let { keyframes: d } = t;
    const g = s || Ll;
    g !== Ll && typeof d[0] != "number" && (this.mixKeyframes = Il(Dw, I2(d[0], d[1])), d = [0, 100]);
    const m = g({ ...t, keyframes: d });
    u === "mirror" && (this.mirroredGenerator = g({
      ...t,
      keyframes: [...d].reverse(),
      velocity: -c
    })), m.calculatedDuration === null && (m.calculatedDuration = kh(m));
    const { calculatedDuration: y } = m;
    this.calculatedDuration = y, this.resolvedDuration = y + r, this.totalDuration = this.resolvedDuration * (l + 1) - r, this.generator = m;
  }
  updateTime(t) {
    const s = Math.round(t - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = s;
  }
  tick(t, s = !1) {
    const { generator: l, totalDuration: r, mixKeyframes: u, mirroredGenerator: c, resolvedDuration: d, calculatedDuration: g } = this;
    if (this.startTime === null)
      return l.next(0);
    const { delay: m = 0, keyframes: y, repeat: v, repeatType: b, repeatDelay: T, type: S, onUpdate: C, finalKeyframe: w } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - r / this.speed, this.startTime)), s ? this.currentTime = t : this.updateTime(t);
    const M = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1), _ = this.playbackSpeed >= 0 ? M < 0 : M > r;
    this.currentTime = Math.max(M, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = r);
    let R = this.currentTime, D = l;
    if (v) {
      const z = Math.min(this.currentTime, r) / d;
      let k = Math.floor(z), Y = z % 1;
      !Y && z >= 1 && (Y = 1), Y === 1 && k--, k = Math.min(k, v + 1), !!(k % 2) && (b === "reverse" ? (Y = 1 - Y, T && (Y -= T / d)) : b === "mirror" && (D = c)), R = Un(0, 1, Y) * d;
    }
    let L;
    _ ? (this.delayState.value = y[0], L = this.delayState) : L = D.next(R), u && !_ && (L.value = u(L.value));
    let { done: $ } = L;
    !_ && g !== null && ($ = this.playbackSpeed >= 0 ? this.currentTime >= r : this.currentTime <= 0);
    const E = this.holdTime === null && (this.state === "finished" || this.state === "running" && $);
    return E && S !== zd && (L.value = pc(y, this.options, w, this.speed)), C && C(L.value), E && this.finish(), L;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(t, s) {
    return this.finished.then(t, s);
  }
  get duration() {
    return /* @__PURE__ */ yn(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ yn(t);
  }
  get time() {
    return /* @__PURE__ */ yn(this.currentTime);
  }
  set time(t) {
    t = /* @__PURE__ */ Pe(t), this.currentTime = t, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = t, this.tick(t));
  }
  /**
   * Returns the generator's velocity at the current time in units/second.
   * Uses the analytical derivative when available (springs), avoiding
   * the MotionValue's frame-dependent velocity estimation.
   */
  getGeneratorVelocity() {
    const t = this.currentTime;
    if (t <= 0)
      return this.options.velocity || 0;
    if (this.generator.velocity)
      return this.generator.velocity(t);
    const s = this.generator.next(t).value;
    return nb((l) => this.generator.next(l).value, t, s);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    const s = this.playbackSpeed !== t;
    s && this.driver && this.updateTime(Le.now()), this.playbackSpeed = t, s && this.driver && (this.time = /* @__PURE__ */ yn(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: t = yw, startTime: s } = this.options;
    this.driver || (this.driver = t((r) => this.tick(r))), this.options.onPlay?.();
    const l = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = l) : this.holdTime !== null ? this.startTime = l - this.holdTime : this.startTime || (this.startTime = s ?? l), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Le.now()), this.holdTime = this.currentTime;
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
  sample(t) {
    return this.startTime = 0, this.tick(t, !0);
  }
  attachTimeline(t) {
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), t.observe(this);
  }
}
function Rw(n) {
  for (let t = 1; t < n.length; t++)
    n[t] ?? (n[t] = n[t - 1]);
}
const vi = (n) => n * 180 / Math.PI, Vd = (n) => {
  const t = vi(Math.atan2(n[1], n[0]));
  return kd(t);
}, Nw = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
  rotate: Vd,
  rotateZ: Vd,
  skewX: (n) => vi(Math.atan(n[1])),
  skewY: (n) => vi(Math.atan(n[2])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2
}, kd = (n) => (n = n % 360, n < 0 && (n += 360), n), iy = Vd, sy = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]), ly = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]), Ow = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: sy,
  scaleY: ly,
  scale: (n) => (sy(n) + ly(n)) / 2,
  rotateX: (n) => kd(vi(Math.atan2(n[6], n[5]))),
  rotateY: (n) => kd(vi(Math.atan2(-n[2], n[0]))),
  rotateZ: iy,
  rotate: iy,
  skewX: (n) => vi(Math.atan(n[4])),
  skewY: (n) => vi(Math.atan(n[1])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[4])) / 2
};
function Ud(n) {
  return n.includes("scale") ? 1 : 0;
}
function Hd(n, t) {
  if (!n || n === "none")
    return Ud(t);
  const s = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let l, r;
  if (s)
    l = Ow, r = s;
  else {
    const d = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    l = Nw, r = d;
  }
  if (!r)
    return Ud(t);
  const u = l[t], c = r[1].split(",").map($w);
  return typeof u == "function" ? u(c) : c[u];
}
const Lw = (n, t) => {
  const { transform: s = "none" } = getComputedStyle(n);
  return Hd(s, t);
};
function $w(n) {
  return parseFloat(n.trim());
}
const _s = [
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
], Ds = /* @__PURE__ */ new Set([..._s, "pathRotation"]), oy = (n) => n === Ms || n === ht, Bw = /* @__PURE__ */ new Set(["x", "y", "z"]), zw = _s.filter((n) => !Bw.has(n));
function Vw(n) {
  const t = [];
  return zw.forEach((s) => {
    const l = n.getValue(s);
    l !== void 0 && (t.push([s, l.get()]), l.set(s.startsWith("scale") ? 1 : 0));
  }), t;
}
const Ua = {
  // Dimensions
  width: ({ x: n }, { paddingLeft: t = "0", paddingRight: s = "0", boxSizing: l }) => {
    const r = n.max - n.min;
    return l === "border-box" ? r : r - parseFloat(t) - parseFloat(s);
  },
  height: ({ y: n }, { paddingTop: t = "0", paddingBottom: s = "0", boxSizing: l }) => {
    const r = n.max - n.min;
    return l === "border-box" ? r : r - parseFloat(t) - parseFloat(s);
  },
  top: (n, { top: t }) => parseFloat(t),
  left: (n, { left: t }) => parseFloat(t),
  bottom: ({ y: n }, { top: t }) => parseFloat(t) + (n.max - n.min),
  right: ({ x: n }, { left: t }) => parseFloat(t) + (n.max - n.min),
  // Transform
  x: (n, { transform: t }) => Hd(t, "x"),
  y: (n, { transform: t }) => Hd(t, "y")
};
Ua.translateX = Ua.x;
Ua.translateY = Ua.y;
const bi = /* @__PURE__ */ new Set();
let qd = !1, Yd = !1, Gd = !1;
function ob() {
  if (Yd) {
    const n = Array.from(bi).filter((l) => l.needsMeasurement), t = new Set(n.map((l) => l.element)), s = /* @__PURE__ */ new Map();
    t.forEach((l) => {
      const r = Vw(l);
      r.length && (s.set(l, r), l.render());
    }), n.forEach((l) => l.measureInitialState()), t.forEach((l) => {
      l.render();
      const r = s.get(l);
      r && r.forEach(([u, c]) => {
        l.getValue(u)?.set(c);
      });
    }), n.forEach((l) => l.measureEndState()), n.forEach((l) => {
      l.suspendedScrollY !== void 0 && window.scrollTo(0, l.suspendedScrollY);
    });
  }
  Yd = !1, qd = !1, bi.forEach((n) => n.complete(Gd)), bi.clear();
}
function rb() {
  bi.forEach((n) => {
    n.readKeyframes(), n.needsMeasurement && (Yd = !0);
  });
}
function kw() {
  Gd = !0, rb(), ob(), Gd = !1;
}
class Hh {
  constructor(t, s, l, r, u, c = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...t], this.onComplete = s, this.name = l, this.motionValue = r, this.element = u, this.isAsync = c;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (bi.add(this), qd || (qd = !0, Xt.read(rb), Xt.resolveKeyframes(ob))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, name: s, element: l, motionValue: r } = this;
    if (t[0] === null) {
      const u = r?.get(), c = t[t.length - 1];
      if (u !== void 0)
        t[0] = u;
      else if (l && s) {
        const d = l.readValue(s, c);
        d != null && (t[0] = d);
      }
      t[0] === void 0 && (t[0] = c), r && u === void 0 && r.set(t[0]);
    }
    Rw(t);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(t = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t), bi.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (bi.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const Uw = (n) => n.startsWith("--");
function cb(n, t, s) {
  Uw(t) ? n.style.setProperty(t, s) : n.style[t] = s;
}
const Hw = {};
function ub(n, t) {
  const s = /* @__PURE__ */ N2(n);
  return () => Hw[t] ?? s();
}
const qw = /* @__PURE__ */ ub(() => window.ScrollTimeline !== void 0, "scrollTimeline"), fb = /* @__PURE__ */ ub(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), _l = ([n, t, s, l]) => `cubic-bezier(${n}, ${t}, ${s}, ${l})`, ry = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ _l([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ _l([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ _l([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ _l([0.33, 1.53, 0.69, 0.99])
};
function db(n, t) {
  if (n)
    return typeof n == "function" ? fb() ? tb(n, t) : "ease-out" : /* @__PURE__ */ G2(n) ? _l(n) : Array.isArray(n) ? n.map((s) => db(s, t) || ry.easeOut) : ry[n];
}
function Yw(n, t, s, { delay: l = 0, duration: r = 300, repeat: u = 0, repeatType: c = "loop", ease: d = "easeOut", times: g } = {}, m = void 0) {
  const y = {
    [t]: s
  };
  g && (y.offset = g);
  const v = db(d, r);
  Array.isArray(v) && (y.easing = v);
  const b = {
    delay: l,
    duration: r,
    easing: Array.isArray(v) ? "linear" : v,
    fill: "both",
    iterations: u + 1,
    direction: c === "reverse" ? "alternate" : "normal"
  };
  return m && (b.pseudoElement = m), n.animate(y, b);
}
function qh(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function Gw({ type: n, ...t }) {
  return qh(n) && fb() ? n.applyToOptions(t) : (t.duration ?? (t.duration = 300), t.ease ?? (t.ease = "easeOut"), t);
}
class hb extends Uh {
  constructor(t) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !t)
      return;
    const { element: s, name: l, keyframes: r, pseudoElement: u, allowFlatten: c = !1, finalKeyframe: d, onComplete: g } = t;
    this.isPseudoElement = !!u, this.allowFlatten = c, this.options = t, Mh(typeof t.type != "string");
    const m = Gw(t);
    this.animation = Yw(s, l, r, m, u), m.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !u) {
        const y = pc(r, this.options, d, this.speed);
        this.updateMotionValue && this.updateMotionValue(y), cb(s, l, y), this.animation.cancel();
      }
      g?.(), this.notifyFinished();
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
    const { state: t } = this;
    t === "idle" || t === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
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
    const t = this.options?.element;
    !this.isPseudoElement && t?.isConnected && this.animation.commitStyles?.();
  }
  get duration() {
    const t = this.animation.effect?.getComputedTiming?.().duration || 0;
    return /* @__PURE__ */ yn(Number(t));
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ yn(t);
  }
  get time() {
    return /* @__PURE__ */ yn(Number(this.animation.currentTime) || 0);
  }
  set time(t) {
    const s = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Pe(t), s && this.animation.pause();
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(t) {
    t < 0 && (this.finishedTime = null), this.animation.playbackRate = t;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(t) {
    this.manualStartTime = this.animation.startTime = t;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: t, rangeStart: s, rangeEnd: l, observe: r }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, t && qw() ? (this.animation.timeline = t, s && (this.animation.rangeStart = s), l && (this.animation.rangeEnd = l), vn) : r(this);
  }
}
const mb = {
  anticipate: V2,
  backInOut: z2,
  circInOut: U2
};
function Pw(n) {
  return n in mb;
}
function Xw(n) {
  typeof n.ease == "string" && Pw(n.ease) && (n.ease = mb[n.ease]);
}
const ed = 10;
class Kw extends hb {
  constructor(t) {
    Xw(t), lb(t), super(t), t.startTime !== void 0 && t.autoplay !== !1 && (this.startTime = t.startTime), this.options = t;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(t) {
    const { motionValue: s, onUpdate: l, onComplete: r, element: u, ...c } = this.options;
    if (!s)
      return;
    if (t !== void 0) {
      s.set(t);
      return;
    }
    const d = new ec({
      ...c,
      autoplay: !1
    }), g = Math.max(ed, Le.now() - this.startTime), m = Un(0, ed, g - ed), y = d.sample(g).value, { name: v } = this.options;
    u && v && cb(u, v, y), s.setWithVelocity(d.sample(Math.max(0, g - m)).value, y, m), d.stop();
  }
}
const cy = (n, t) => t === "zIndex" ? !1 : !!(typeof n == "number" || Array.isArray(n) || typeof n == "string" && // It's animatable if we have a string
(Dn.test(n) || n === "0") && // And it contains numbers and/or colors
!n.startsWith("url("));
function Qw(n) {
  const t = n[0];
  if (n.length === 1)
    return !0;
  for (let s = 0; s < n.length; s++)
    if (n[s] !== t)
      return !0;
}
function Zw(n, t, s, l) {
  const r = n[0];
  if (r === null)
    return !1;
  if (t === "display" || t === "visibility")
    return !0;
  const u = n[n.length - 1], c = cy(r, t), d = cy(u, t);
  return !c || !d ? !1 : Qw(n) || (s === "spring" || qh(s)) && l;
}
function Pd(n) {
  n.duration = 0, n.type = "keyframes";
}
const pb = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), Fw = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function Jw(n) {
  for (let t = 0; t < n.length; t++)
    if (typeof n[t] == "string" && Fw.test(n[t]))
      return !0;
  return !1;
}
const Ww = /* @__PURE__ */ new Set([
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
]), Iw = /* @__PURE__ */ N2(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function t9(n) {
  const { motionValue: t, name: s, repeatDelay: l, repeatType: r, damping: u, type: c, keyframes: d } = n;
  if (!(t?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: m, transformTemplate: y } = t.owner.getProps();
  return Iw() && s && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (pb.has(s) || Ww.has(s) && Jw(d)) && (s !== "transform" || !y) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !m && !l && r !== "mirror" && u !== 0 && c !== "inertia";
}
const e9 = 40;
class n9 extends Uh {
  constructor({ autoplay: t = !0, delay: s = 0, type: l = "keyframes", repeat: r = 0, repeatDelay: u = 0, repeatType: c = "loop", keyframes: d, name: g, motionValue: m, element: y, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Le.now();
    const b = {
      autoplay: t,
      delay: s,
      type: l,
      repeat: r,
      repeatDelay: u,
      repeatType: c,
      name: g,
      motionValue: m,
      element: y,
      ...v
    }, T = y?.KeyframeResolver || Hh;
    this.keyframeResolver = new T(d, (S, C, w) => this.onKeyframesResolved(S, C, b, !w), g, m, y), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(t, s, l, r) {
    this.keyframeResolver = void 0;
    const { name: u, type: c, velocity: d, delay: g, isHandoff: m, onUpdate: y } = l;
    this.resolvedAt = Le.now();
    let v = !0;
    Zw(t, u, c, d) || (v = !1, (Ha.instantAnimations || !g) && y?.(pc(t, l, s)), t[0] = t[t.length - 1], Pd(l), l.repeat = 0);
    const T = {
      startTime: r ? this.resolvedAt ? this.resolvedAt - this.createdAt > e9 ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: s,
      ...l,
      keyframes: t
    }, S = v && !m && t9(T), C = T.motionValue?.owner?.current;
    let w;
    if (S)
      try {
        w = new Kw({
          ...T,
          element: C
        });
      } catch {
        w = new ec(T);
      }
    else
      w = new ec(T);
    w.finished.then(() => {
      this.notifyFinished();
    }).catch(vn), this.pendingTimeline && (this.stopTimeline = w.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = w;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(t, s) {
    return this.finished.finally(t).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), kw()), this._animation;
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
  set time(t) {
    this.animation.time = t;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(t) {
    this.animation.speed = t;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(t) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(t) : this.pendingTimeline = t, () => this.stop();
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
class a9 {
  constructor(t) {
    this.stop = () => this.runAll("stop"), this.animations = t.filter(Boolean);
  }
  get finished() {
    return Promise.all(this.animations.map((t) => t.finished));
  }
  /**
   * TODO: Filter out cancelled or stopped animations before returning
   */
  getAll(t) {
    return this.animations[0][t];
  }
  setAll(t, s) {
    for (let l = 0; l < this.animations.length; l++)
      this.animations[l][t] = s;
  }
  attachTimeline(t) {
    const s = this.animations.map((l) => l.attachTimeline(t));
    return () => {
      s.forEach((l, r) => {
        l && l(), this.animations[r].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(t) {
    this.setAll("time", t);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(t) {
    this.setAll("speed", t);
  }
  get state() {
    return this.getAll("state");
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    return uy(this.animations, "duration");
  }
  get iterationDuration() {
    return uy(this.animations, "iterationDuration");
  }
  runAll(t) {
    this.animations.forEach((s) => s[t]());
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
function uy(n, t) {
  let s = 0;
  for (let l = 0; l < n.length; l++) {
    const r = n[l][t];
    r !== null && r > s && (s = r);
  }
  return s;
}
class i9 extends a9 {
  then(t, s) {
    return this.finished.finally(t).then(() => {
    });
  }
}
function gb(n, t, s, l = 0, r = 1) {
  const u = Array.from(n).sort((m, y) => m.sortNodePosition(y)).indexOf(t), c = n.size, d = (c - 1) * l;
  return typeof s == "function" ? s(u, c) : r === 1 ? u * l : d - u * l;
}
const fy = 30, s9 = (n) => !isNaN(parseFloat(n)), $l = {
  current: void 0
};
class l9 {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(t, s = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (l) => {
      const r = Le.now();
      if (this.updatedAt !== r && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(l), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const u of this.dependents)
          u.dirty();
    }, this.hasAnimated = !1, this.setCurrent(t), this.owner = s.owner;
  }
  setCurrent(t) {
    this.current = t, this.updatedAt = Le.now(), this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = s9(this.current));
  }
  setPrevFrameValue(t = this.current) {
    this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt;
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
  onChange(t) {
    return this.on("change", t);
  }
  on(t, s) {
    this.events[t] || (this.events[t] = new _h());
    const l = this.events[t].add(s);
    return t === "change" ? () => {
      l(), Xt.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : l;
  }
  clearListeners() {
    for (const t in this.events)
      this.events[t].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(t, s) {
    this.passiveEffect = t, this.stopPassiveEffect = s;
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
  set(t) {
    this.passiveEffect ? this.passiveEffect(t, this.updateAndNotify) : this.updateAndNotify(t);
  }
  setWithVelocity(t, s, l) {
    this.set(s), this.prev = void 0, this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt - l;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(t, s = !0) {
    this.updateAndNotify(t), this.prev = t, this.prevUpdatedAt = this.prevFrameValue = void 0, s && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(t) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(t);
  }
  removeDependent(t) {
    this.dependents && this.dependents.delete(t);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return $l.current && $l.current.push(this), this.current;
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
    const t = Le.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > fy)
      return 0;
    const s = Math.min(this.updatedAt - this.prevUpdatedAt, fy);
    return /* @__PURE__ */ O2(parseFloat(this.current) - parseFloat(this.prevFrameValue), s);
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
  start(t) {
    return this.stop(), new Promise((s) => {
      this.hasAnimated = !0, this.animation = t(s), this.events.animationStart && this.events.animationStart.notify();
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
function qa(n, t) {
  return new l9(n, t);
}
function Yh(n, t) {
  if (n?.inherit && t) {
    const { inherit: s, ...l } = n;
    return { ...t, ...l };
  }
  return n;
}
function Gh(n, t) {
  const s = n?.[t] ?? n?.default ?? n;
  return s !== n ? Yh(s, n) : s;
}
const o9 = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, r9 = (n) => ({
  type: "spring",
  stiffness: 550,
  damping: n === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), c9 = {
  type: "keyframes",
  duration: 0.8
}, u9 = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, f9 = (n, { keyframes: t }) => t.length > 2 ? c9 : Ds.has(n) ? n.startsWith("scale") ? r9(t[1]) : o9 : u9, d9 = /* @__PURE__ */ new Set([
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
function h9(n) {
  for (const t in n)
    if (!d9.has(t))
      return !0;
  return !1;
}
const Ph = (n, t, s, l = {}, r, u) => (c) => {
  const d = Gh(l, n) || {}, g = d.delay || l.delay || 0;
  let { elapsed: m = 0 } = l;
  m = m - /* @__PURE__ */ Pe(g);
  const y = {
    keyframes: Array.isArray(s) ? s : [null, s],
    ease: "easeOut",
    velocity: t.getVelocity(),
    ...d,
    delay: -m,
    onUpdate: (b) => {
      t.set(b), d.onUpdate && d.onUpdate(b);
    },
    onComplete: () => {
      c(), d.onComplete && d.onComplete();
    },
    name: n,
    motionValue: t,
    element: u ? void 0 : r
  };
  h9(d) || Object.assign(y, f9(n, y)), y.duration && (y.duration = /* @__PURE__ */ Pe(y.duration)), y.repeatDelay && (y.repeatDelay = /* @__PURE__ */ Pe(y.repeatDelay)), y.from !== void 0 && (y.keyframes[0] = y.from);
  let v = !1;
  if ((y.type === !1 || y.duration === 0 && !y.repeatDelay) && (Pd(y), y.delay === 0 && (v = !0)), (Ha.instantAnimations || Ha.skipAnimations || r?.shouldSkipAnimations || d.skipAnimations) && (v = !0, Pd(y), y.delay = 0), y.allowFlatten = !d.type && !d.ease, v && !u && t.get() !== void 0) {
    const b = pc(y.keyframes, d);
    if (b !== void 0) {
      Xt.update(() => {
        y.onUpdate(b), y.onComplete();
      });
      return;
    }
  }
  return d.isSync ? new ec(y) : new n9(y);
}, m9 = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function p9(n) {
  const t = m9.exec(n);
  if (!t)
    return [,];
  const [, s, l, r] = t;
  return [`--${s ?? l}`, r];
}
function yb(n, t, s = 1) {
  const [l, r] = p9(n);
  if (!l)
    return;
  const u = window.getComputedStyle(t).getPropertyValue(l);
  if (u) {
    const c = u.trim();
    return _2(c) ? parseFloat(c) : c;
  }
  return $h(r) ? yb(r, t, s + 1) : r;
}
function dy(n) {
  const t = [{}, {}];
  return n?.values.forEach((s, l) => {
    t[0][l] = s.get(), t[1][l] = s.getVelocity();
  }), t;
}
function Xh(n, t, s, l) {
  if (typeof t == "function") {
    const [r, u] = dy(l);
    t = t(s !== void 0 ? s : n.custom, r, u);
  }
  if (typeof t == "string" && (t = n.variants && n.variants[t]), typeof t == "function") {
    const [r, u] = dy(l);
    t = t(s !== void 0 ? s : n.custom, r, u);
  }
  return t;
}
function xi(n, t, s) {
  const l = n.getProps();
  return Xh(l, t, s !== void 0 ? s : l.custom, n);
}
const vb = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ..._s
]), Xd = (n) => Array.isArray(n);
function g9(n, t, s) {
  n.hasValue(t) ? n.getValue(t).set(s) : n.addValue(t, qa(s));
}
function y9(n) {
  return Xd(n) ? n[n.length - 1] || 0 : n;
}
function v9(n, t) {
  const s = xi(n, t);
  let { transitionEnd: l = {}, transition: r = {}, ...u } = s || {};
  u = { ...u, ...l };
  for (const c in u) {
    const d = y9(u[c]);
    g9(n, c, d);
  }
}
const ye = (n) => !!(n && n.getVelocity);
function b9(n) {
  return !!(ye(n) && n.add);
}
function Kd(n, t) {
  const s = n.getValue("willChange");
  if (b9(s))
    return s.add(t);
  if (!s && Ha.WillChange) {
    const l = new Ha.WillChange("auto");
    n.addValue("willChange", l), l.add(t);
  }
}
function Kh(n) {
  return n.replace(/([A-Z])/g, (t) => `-${t.toLowerCase()}`);
}
const x9 = "framerAppearId", bb = "data-" + Kh(x9);
function xb(n) {
  return n.props[bb];
}
function S9({ protectedKeys: n, needsAnimating: t }, s) {
  const l = n.hasOwnProperty(s) && t[s] !== !0;
  return t[s] = !1, l;
}
function Qh(n, t, { delay: s = 0, transitionOverride: l, type: r } = {}) {
  let { transition: u, transitionEnd: c, ...d } = t;
  const g = n.getDefaultTransition();
  u = u ? Yh(u, g) : g;
  const m = u?.reduceMotion, y = u?.skipAnimations;
  l && (u = l);
  const v = [], b = r && n.animationState && n.animationState.getState()[r], T = u?.path;
  T && T.animateVisualElement(n, d, u, s, v);
  for (const S in d) {
    const C = n.getValue(S, n.latestValues[S] ?? null), w = d[S];
    if (w === void 0 || b && S9(b, S))
      continue;
    const M = {
      delay: s,
      ...Gh(u || {}, S)
    };
    y && (M.skipAnimations = !0);
    const _ = C.get();
    if (_ !== void 0 && !C.isAnimating() && !Array.isArray(w) && w === _ && !M.velocity) {
      Xt.update(() => C.set(w));
      continue;
    }
    let R = !1;
    if (window.MotionHandoffAnimation) {
      const $ = xb(n);
      if ($) {
        const E = window.MotionHandoffAnimation($, S, Xt);
        E !== null && (M.startTime = E, R = !0);
      }
    }
    Kd(n, S);
    const D = m ?? n.shouldReduceMotion;
    C.start(Ph(S, C, w, D && vb.has(S) ? { type: !1 } : M, n, R));
    const L = C.animation;
    L && v.push(L);
  }
  if (c) {
    const S = () => Xt.update(() => {
      c && v9(n, c);
    });
    v.length ? Promise.all(v).then(S) : S();
  }
  return v;
}
function Qd(n, t, s = {}) {
  const l = xi(n, t, s.type === "exit" ? n.presenceContext?.custom : void 0);
  let { transition: r = n.getDefaultTransition() || {} } = l || {};
  s.transitionOverride && (r = s.transitionOverride);
  const u = l ? () => Promise.all(Qh(n, l, s)) : () => Promise.resolve(), c = n.variantChildren && n.variantChildren.size ? (g = 0) => {
    const { delayChildren: m = 0, staggerChildren: y, staggerDirection: v } = r;
    return w9(n, t, g, m, y, v, s);
  } : () => Promise.resolve(), { when: d } = r;
  if (d) {
    const [g, m] = d === "beforeChildren" ? [u, c] : [c, u];
    return g().then(() => m());
  } else
    return Promise.all([u(), c(s.delay)]);
}
function w9(n, t, s = 0, l = 0, r = 0, u = 1, c) {
  const d = [];
  for (const g of n.variantChildren)
    g.notify("AnimationStart", t), d.push(Qd(g, t, {
      ...c,
      delay: s + (typeof l == "function" ? 0 : l) + gb(n.variantChildren, g, l, r, u)
    }).then(() => g.notify("AnimationComplete", t)));
  return Promise.all(d);
}
function C9(n, t, s = {}) {
  n.notify("AnimationStart", t);
  let l;
  if (Array.isArray(t)) {
    const r = t.map((u) => Qd(n, u, s));
    l = Promise.all(r);
  } else if (typeof t == "string")
    l = Qd(n, t, s);
  else {
    const r = typeof t == "function" ? xi(n, t, s.custom) : t;
    l = Promise.all(Qh(n, r, s));
  }
  return l.then(() => {
    n.notify("AnimationComplete", t);
  });
}
const T9 = {
  test: (n) => n === "auto",
  parse: (n) => n
}, Sb = (n) => (t) => t.test(n), wb = [Ms, ht, kn, ra, W4, J4, T9], hy = (n) => wb.find(Sb(n));
function j9(n) {
  return typeof n == "number" ? n === 0 : n !== null ? n === "none" || n === "0" || R2(n) : !0;
}
const E9 = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function A9(n) {
  const [t, s] = n.slice(0, -1).split("(");
  if (t === "drop-shadow")
    return n;
  const [l] = s.match(Bh) || [];
  if (!l)
    return n;
  const r = s.replace(l, "");
  let u = E9.has(t) ? 1 : 0;
  return l !== s && (u *= 100), t + "(" + u + r + ")";
}
const M9 = /\b([a-z-]*)\(.*?\)/gu, Zd = {
  ...Dn,
  getAnimatableNone: (n) => {
    const t = n.match(M9);
    return t ? t.map(A9).join(" ") : n;
  }
}, Fd = {
  ...Dn,
  getAnimatableNone: (n) => {
    const t = Dn.parse(n);
    return Dn.createTransformer(n)(t.map((l) => typeof l == "number" ? 0 : typeof l == "object" ? { ...l, alpha: 1 } : l));
  }
}, my = {
  ...Ms,
  transform: Math.round
}, _9 = {
  rotate: ra,
  /**
   * Internal channel for `transition.path` orientToPath. Composed onto
   * `rotate` at the transform-build sites so the user's `rotate` is
   * never read or overwritten. Not part of `transformPropOrder`.
   */
  pathRotation: ra,
  rotateX: ra,
  rotateY: ra,
  rotateZ: ra,
  scale: jr,
  scaleX: jr,
  scaleY: jr,
  scaleZ: jr,
  skew: ra,
  skewX: ra,
  skewY: ra,
  distance: ht,
  translateX: ht,
  translateY: ht,
  translateZ: ht,
  x: ht,
  y: ht,
  z: ht,
  perspective: ht,
  transformPerspective: ht,
  opacity: ql,
  originX: Ig,
  originY: Ig,
  originZ: ht
}, nc = {
  // Border props
  borderWidth: ht,
  borderTopWidth: ht,
  borderRightWidth: ht,
  borderBottomWidth: ht,
  borderLeftWidth: ht,
  borderRadius: ht,
  borderTopLeftRadius: ht,
  borderTopRightRadius: ht,
  borderBottomRightRadius: ht,
  borderBottomLeftRadius: ht,
  // Positioning props
  width: ht,
  maxWidth: ht,
  height: ht,
  maxHeight: ht,
  top: ht,
  right: ht,
  bottom: ht,
  left: ht,
  inset: ht,
  insetBlock: ht,
  insetBlockStart: ht,
  insetBlockEnd: ht,
  insetInline: ht,
  insetInlineStart: ht,
  insetInlineEnd: ht,
  // Spacing props
  padding: ht,
  paddingTop: ht,
  paddingRight: ht,
  paddingBottom: ht,
  paddingLeft: ht,
  paddingBlock: ht,
  paddingBlockStart: ht,
  paddingBlockEnd: ht,
  paddingInline: ht,
  paddingInlineStart: ht,
  paddingInlineEnd: ht,
  margin: ht,
  marginTop: ht,
  marginRight: ht,
  marginBottom: ht,
  marginLeft: ht,
  marginBlock: ht,
  marginBlockStart: ht,
  marginBlockEnd: ht,
  marginInline: ht,
  marginInlineStart: ht,
  marginInlineEnd: ht,
  // Typography
  fontSize: ht,
  // Misc
  backgroundPositionX: ht,
  backgroundPositionY: ht,
  ..._9,
  zIndex: my,
  // SVG
  fillOpacity: ql,
  strokeOpacity: ql,
  numOctaves: my
}, D9 = {
  ...nc,
  // Color props
  color: he,
  backgroundColor: he,
  outlineColor: he,
  fill: he,
  stroke: he,
  // Border props
  borderColor: he,
  borderTopColor: he,
  borderRightColor: he,
  borderBottomColor: he,
  borderLeftColor: he,
  filter: Zd,
  WebkitFilter: Zd,
  mask: Fd,
  WebkitMask: Fd
}, Cb = (n) => D9[n], R9 = /* @__PURE__ */ new Set([Zd, Fd]);
function Tb(n, t) {
  let s = Cb(n);
  return R9.has(s) || (s = Dn), s.getAnimatableNone ? s.getAnimatableNone(t) : void 0;
}
const N9 = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function O9(n, t, s) {
  let l = 0, r;
  for (; l < n.length && !r; ) {
    const u = n[l];
    typeof u == "string" && !N9.has(u) && Cs(u).values.length && (r = n[l]), l++;
  }
  if (r && s)
    for (const u of t)
      n[u] = Tb(s, r);
}
class L9 extends Hh {
  constructor(t, s, l, r, u) {
    super(t, s, l, r, u, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: s, name: l } = this;
    if (!s || !s.current)
      return;
    super.readKeyframes();
    for (let y = 0; y < t.length; y++) {
      let v = t[y];
      if (typeof v == "string" && (v = v.trim(), $h(v))) {
        const b = yb(v, s.current);
        b !== void 0 && (t[y] = b), y === t.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !vb.has(l) || t.length !== 2)
      return;
    const [r, u] = t, c = hy(r), d = hy(u), g = Wg(r), m = Wg(u);
    if (g !== m && Ua[l]) {
      this.needsMeasurement = !0;
      return;
    }
    if (c !== d)
      if (oy(c) && oy(d))
        for (let y = 0; y < t.length; y++) {
          const v = t[y];
          typeof v == "string" && (t[y] = parseFloat(v));
        }
      else Ua[l] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: s } = this, l = [];
    for (let r = 0; r < t.length; r++)
      (t[r] === null || j9(t[r])) && l.push(r);
    l.length && O9(t, l, s);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: s, name: l } = this;
    if (!t || !t.current)
      return;
    l === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Ua[l](t.measureViewportBox(), window.getComputedStyle(t.current)), s[0] = this.measuredOrigin;
    const r = s[s.length - 1];
    r !== void 0 && t.getValue(l, r).jump(r, !1);
  }
  measureEndState() {
    const { element: t, name: s, unresolvedKeyframes: l } = this;
    if (!t || !t.current)
      return;
    const r = t.getValue(s);
    r && r.jump(this.measuredOrigin, !1);
    const u = l.length - 1, c = l[u];
    l[u] = Ua[s](t.measureViewportBox(), window.getComputedStyle(t.current)), c !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = c), this.removedTransforms?.length && this.removedTransforms.forEach(([d, g]) => {
      t.getValue(d).set(g);
    }), this.resolveNoneKeyframes();
  }
}
const Zh = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
];
function Fh(n, t, s) {
  if (n == null)
    return [];
  if (n instanceof EventTarget)
    return [n];
  if (typeof n == "string") {
    let l = document;
    t && (l = t.current);
    const r = s?.[n] ?? l.querySelectorAll(n);
    return r ? Array.from(r) : [];
  }
  return Array.from(n).filter((l) => l != null);
}
const Jd = (n, t) => t && typeof n == "number" ? t.transform(n) : n;
function Yr(n) {
  return D2(n) && "offsetHeight" in n && !("ownerSVGElement" in n);
}
const { schedule: Jh } = /* @__PURE__ */ P2(queueMicrotask, !1), jn = {
  x: !1,
  y: !1
};
function jb() {
  return jn.x || jn.y;
}
function $9(n) {
  return n === "x" || n === "y" ? jn[n] ? null : (jn[n] = !0, () => {
    jn[n] = !1;
  }) : jn.x || jn.y ? null : (jn.x = jn.y = !0, () => {
    jn.x = jn.y = !1;
  });
}
function Eb(n, t) {
  const s = Fh(n), l = new AbortController(), r = {
    passive: !0,
    ...t,
    signal: l.signal
  };
  return [s, r, () => l.abort()];
}
function B9(n) {
  return !(n.pointerType === "touch" || jb());
}
function z9(n, t, s = {}) {
  const [l, r, u] = Eb(n, s);
  return l.forEach((c) => {
    let d = !1, g = !1, m;
    const y = () => {
      c.removeEventListener("pointerleave", S);
    }, v = (w) => {
      m && (m(w), m = void 0), y();
    }, b = (w) => {
      d = !1, window.removeEventListener("pointerup", b), window.removeEventListener("pointercancel", b), g && (g = !1, v(w));
    }, T = () => {
      d = !0, window.addEventListener("pointerup", b, r), window.addEventListener("pointercancel", b, r);
    }, S = (w) => {
      if (w.pointerType !== "touch") {
        if (d) {
          g = !0;
          return;
        }
        v(w);
      }
    }, C = (w) => {
      if (!B9(w))
        return;
      g = !1;
      const M = t(c, w);
      typeof M == "function" && (m = M, c.addEventListener("pointerleave", S, r));
    };
    c.addEventListener("pointerenter", C, r), c.addEventListener("pointerdown", T, r);
  }), u;
}
const Ab = (n, t) => t ? n === t ? !0 : Ab(n, t.parentElement) : !1, Wh = (n) => n.pointerType === "mouse" ? typeof n.button != "number" || n.button <= 0 : n.isPrimary !== !1, V9 = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function k9(n) {
  return V9.has(n.tagName) || n.isContentEditable === !0;
}
const U9 = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function H9(n) {
  return U9.has(n.tagName) || n.isContentEditable === !0;
}
const Gr = /* @__PURE__ */ new WeakSet();
function py(n) {
  return (t) => {
    t.key === "Enter" && n(t);
  };
}
function nd(n, t) {
  n.dispatchEvent(new PointerEvent("pointer" + t, { isPrimary: !0, bubbles: !0 }));
}
const q9 = (n, t) => {
  const s = n.currentTarget;
  if (!s)
    return;
  const l = py(() => {
    if (Gr.has(s))
      return;
    nd(s, "down");
    const r = py(() => {
      nd(s, "up");
    }), u = () => nd(s, "cancel");
    s.addEventListener("keyup", r, t), s.addEventListener("blur", u, t);
  });
  s.addEventListener("keydown", l, t), s.addEventListener("blur", () => s.removeEventListener("keydown", l), t);
};
function gy(n) {
  return Wh(n) && !jb();
}
const yy = /* @__PURE__ */ new WeakSet();
function Y9(n, t, s = {}) {
  const [l, r, u] = Eb(n, s), c = (d) => {
    const g = d.currentTarget;
    if (!gy(d) || yy.has(d))
      return;
    Gr.add(g), s.stopPropagation && yy.add(d);
    const m = t(g, d), y = { ...r, capture: !0 }, v = (S, C) => {
      window.removeEventListener("pointerup", b, y), window.removeEventListener("pointercancel", T, y), Gr.has(g) && Gr.delete(g), gy(S) && typeof m == "function" && m(S, { success: C });
    }, b = (S) => {
      v(S, g === window || g === document || s.useGlobalTarget || Ab(g, S.target));
    }, T = (S) => {
      v(S, !1);
    };
    window.addEventListener("pointerup", b, y), window.addEventListener("pointercancel", T, y);
  };
  return l.forEach((d) => {
    (s.useGlobalTarget ? window : d).addEventListener("pointerdown", c, r), Yr(d) && (d.addEventListener("focus", (m) => q9(m, r)), !k9(d) && !d.hasAttribute("tabindex") && (d.tabIndex = 0));
  }), u;
}
function gc(n) {
  return D2(n) && "ownerSVGElement" in n;
}
const Pr = /* @__PURE__ */ new WeakMap();
let Xr;
const Mb = (n, t, s) => (l, r) => r && r[0] ? r[0][n + "Size"] : gc(l) && "getBBox" in l ? l.getBBox()[t] : l[s], G9 = /* @__PURE__ */ Mb("inline", "width", "offsetWidth"), P9 = /* @__PURE__ */ Mb("block", "height", "offsetHeight");
function X9({ target: n, borderBoxSize: t }) {
  Pr.get(n)?.forEach((s) => {
    s(n, {
      get width() {
        return G9(n, t);
      },
      get height() {
        return P9(n, t);
      }
    });
  });
}
function K9(n) {
  n.forEach(X9);
}
function Q9() {
  typeof ResizeObserver > "u" || (Xr = new ResizeObserver(K9));
}
function Z9(n, t) {
  Xr || Q9();
  const s = Fh(n);
  return s.forEach((l) => {
    let r = Pr.get(l);
    r || (r = /* @__PURE__ */ new Set(), Pr.set(l, r)), r.add(t), Xr?.observe(l);
  }), () => {
    s.forEach((l) => {
      const r = Pr.get(l);
      r?.delete(t), r?.size || Xr?.unobserve(l);
    });
  };
}
const Kr = /* @__PURE__ */ new Set();
let ms;
function F9() {
  ms = () => {
    const n = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    Kr.forEach((t) => t(n));
  }, window.addEventListener("resize", ms);
}
function J9(n) {
  return Kr.add(n), ms || F9(), () => {
    Kr.delete(n), !Kr.size && typeof ms == "function" && (window.removeEventListener("resize", ms), ms = void 0);
  };
}
function vy(n, t) {
  return typeof n == "function" ? J9(n) : Z9(n, t);
}
function _b(n) {
  return gc(n) && n.tagName === "svg";
}
function W9(...n) {
  const t = !Array.isArray(n[0]), s = t ? 0 : -1, l = n[0 + s], r = n[1 + s], u = n[2 + s], c = n[3 + s], d = ab(r, u, c);
  return t ? d(l) : d;
}
const I9 = [...wb, he, Dn], t6 = (n) => I9.find(Sb(n)), by = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), ps = () => ({
  x: by(),
  y: by()
}), xy = () => ({ min: 0, max: 0 }), de = () => ({
  x: xy(),
  y: xy()
}), Gl = /* @__PURE__ */ new WeakMap();
function yc(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function Pl(n) {
  return typeof n == "string" || Array.isArray(n);
}
const Ih = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], tm = ["initial", ...Ih];
function vc(n) {
  return yc(n.animate) || tm.some((t) => Pl(n[t]));
}
function Db(n) {
  return !!(vc(n) || n.variants);
}
function e6(n, t, s) {
  for (const l in t) {
    const r = t[l], u = s[l];
    if (ye(r))
      n.addValue(l, r);
    else if (ye(u))
      n.addValue(l, qa(r, { owner: n }));
    else if (u !== r)
      if (n.hasValue(l)) {
        const c = n.getValue(l);
        c.liveStyle === !0 ? c.jump(r) : c.hasAnimated || c.set(r);
      } else {
        const c = n.getStaticValue(l);
        n.addValue(l, qa(c !== void 0 ? c : r, { owner: n }));
      }
  }
  for (const l in s)
    t[l] === void 0 && n.removeValue(l);
  return t;
}
const ac = { current: null }, em = { current: !1 }, n6 = typeof window < "u";
function Rb() {
  if (em.current = !0, !!n6)
    if (window.matchMedia) {
      const n = window.matchMedia("(prefers-reduced-motion)"), t = () => ac.current = n.matches;
      n.addEventListener("change", t), t();
    } else
      ac.current = !1;
}
const Sy = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let ic = {};
function Nb(n) {
  ic = n;
}
function a6() {
  return ic;
}
class Ob {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(t, s, l) {
    return {};
  }
  constructor({ parent: t, props: s, presenceContext: l, reducedMotionConfig: r, skipAnimations: u, blockInitialAnimation: c, visualState: d }, g = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Hh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const T = Le.now();
      this.renderScheduledAt < T && (this.renderScheduledAt = T, Xt.render(this.render, !1, !0));
    };
    const { latestValues: m, renderState: y } = d;
    this.latestValues = m, this.baseTarget = { ...m }, this.initialValues = s.initial ? { ...m } : {}, this.renderState = y, this.parent = t, this.props = s, this.presenceContext = l, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = r, this.skipAnimationsConfig = u, this.options = g, this.blockInitialAnimation = !!c, this.isControllingVariants = vc(s), this.isVariantNode = Db(s), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t && t.current);
    const { willChange: v, ...b } = this.scrapeMotionValuesFromProps(s, {}, this);
    for (const T in b) {
      const S = b[T];
      m[T] !== void 0 && ye(S) && S.set(m[T]);
    }
  }
  mount(t) {
    if (this.hasBeenMounted)
      for (const s in this.initialValues)
        this.values.get(s)?.jump(this.initialValues[s]), this.latestValues[s] = this.initialValues[s];
    this.current = t, Gl.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((s, l) => this.bindToMotionValue(l, s)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (em.current || Rb(), this.shouldReduceMotion = ac.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), ua(this.notifyUpdate), ua(this.render), this.valueSubscriptions.forEach((t) => t()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const t in this.events)
      this.events[t].clear();
    for (const t in this.features) {
      const s = this.features[t];
      s && (s.unmount(), s.isMounted = !1);
    }
    this.current = null;
  }
  addChild(t) {
    this.children.add(t), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(t);
  }
  removeChild(t) {
    this.children.delete(t), this.enteringChildren && this.enteringChildren.delete(t);
  }
  bindToMotionValue(t, s) {
    if (this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)(), s.accelerate && pb.has(t) && this.current instanceof HTMLElement) {
      const { factory: c, keyframes: d, times: g, ease: m, duration: y } = s.accelerate, v = new hb({
        element: this.current,
        name: t,
        keyframes: d,
        times: g,
        ease: m,
        duration: /* @__PURE__ */ Pe(y)
      }), b = c(v);
      this.valueSubscriptions.set(t, () => {
        b(), v.cancel();
      });
      return;
    }
    const l = Ds.has(t);
    l && this.onBindTransform && this.onBindTransform();
    const r = s.on("change", (c) => {
      this.latestValues[t] = c, this.props.onUpdate && Xt.preRender(this.notifyUpdate), l && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let u;
    typeof window < "u" && window.MotionCheckAppearSync && (u = window.MotionCheckAppearSync(this, t, s)), this.valueSubscriptions.set(t, () => {
      r(), u && u();
    });
  }
  sortNodePosition(t) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== t.type ? 0 : this.sortInstanceNodePosition(this.current, t.current);
  }
  updateFeatures() {
    let t = "animation";
    for (t in ic) {
      const s = ic[t];
      if (!s)
        continue;
      const { isEnabled: l, Feature: r } = s;
      if (!this.features[t] && r && l(this.props) && (this.features[t] = new r(this)), this.features[t]) {
        const u = this.features[t];
        u.isMounted ? u.update() : (u.mount(), u.isMounted = !0);
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : de();
  }
  getStaticValue(t) {
    return this.latestValues[t];
  }
  setStaticValue(t, s) {
    this.latestValues[t] = s;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(t, s) {
    (t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = t, this.prevPresenceContext = this.presenceContext, this.presenceContext = s;
    for (let l = 0; l < Sy.length; l++) {
      const r = Sy[l];
      this.propEventSubscriptions[r] && (this.propEventSubscriptions[r](), delete this.propEventSubscriptions[r]);
      const u = "on" + r, c = t[u];
      c && (this.propEventSubscriptions[r] = this.on(r, c));
    }
    this.prevMotionValues = e6(this, this.scrapeMotionValuesFromProps(t, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(t) {
    return this.props.variants ? this.props.variants[t] : void 0;
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
  addVariantChild(t) {
    const s = this.getClosestVariantNode();
    if (s)
      return s.variantChildren && s.variantChildren.add(t), () => s.variantChildren.delete(t);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(t, s) {
    const l = this.values.get(t);
    s !== l && (l && this.removeValue(t), this.bindToMotionValue(t, s), this.values.set(t, s), this.latestValues[t] = s.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(t) {
    this.values.delete(t);
    const s = this.valueSubscriptions.get(t);
    s && (s(), this.valueSubscriptions.delete(t)), delete this.latestValues[t], this.removeValueFromRenderState(t, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, s) {
    if (this.props.values && this.props.values[t])
      return this.props.values[t];
    let l = this.values.get(t);
    return l === void 0 && s !== void 0 && (l = qa(s === null ? void 0 : s, { owner: this }), this.addValue(t, l)), l;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(t, s) {
    let l = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : this.getBaseTargetFromProps(this.props, t) ?? this.readValueFromInstance(this.current, t, this.options);
    return l != null && (typeof l == "string" && (_2(l) || R2(l)) ? l = parseFloat(l) : !t6(l) && Dn.test(s) && (l = Tb(t, s)), this.setBaseTarget(t, ye(l) ? l.get() : l)), ye(l) ? l.get() : l;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(t, s) {
    this.baseTarget[t] = s;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(t) {
    const { initial: s } = this.props;
    let l;
    if (typeof s == "string" || typeof s == "object") {
      const u = Xh(this.props, s, this.presenceContext?.custom);
      u && (l = u[t]);
    }
    if (s && l !== void 0)
      return l;
    const r = this.getBaseTargetFromProps(this.props, t);
    return r !== void 0 && !ye(r) ? r : this.initialValues[t] !== void 0 && l === void 0 ? void 0 : this.baseTarget[t];
  }
  on(t, s) {
    return this.events[t] || (this.events[t] = new _h()), this.events[t].add(s);
  }
  notify(t, ...s) {
    this.events[t] && this.events[t].notify(...s);
  }
  scheduleRenderMicrotask() {
    Jh.render(this.render);
  }
}
class Lb extends Ob {
  constructor() {
    super(...arguments), this.KeyframeResolver = L9;
  }
  sortInstanceNodePosition(t, s) {
    return t.compareDocumentPosition(s) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, s) {
    const l = t.style;
    return l ? l[s] : void 0;
  }
  removeValueFromRenderState(t, { vars: s, style: l }) {
    delete s[t], delete l[t];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    ye(t) && (this.childSubscription = t.on("change", (s) => {
      this.current && (this.current.textContent = `${s}`);
    }));
  }
}
class Ya {
  constructor(t) {
    this.isMounted = !1, this.node = t;
  }
  update() {
  }
}
function $b({ top: n, left: t, right: s, bottom: l }) {
  return {
    x: { min: t, max: s },
    y: { min: n, max: l }
  };
}
function i6({ x: n, y: t }) {
  return { top: t.min, right: n.max, bottom: t.max, left: n.min };
}
function s6(n, t) {
  if (!t)
    return n;
  const s = t({ x: n.left, y: n.top }), l = t({ x: n.right, y: n.bottom });
  return {
    top: s.y,
    left: s.x,
    bottom: l.y,
    right: l.x
  };
}
function ad(n) {
  return n === void 0 || n === 1;
}
function Wd({ scale: n, scaleX: t, scaleY: s }) {
  return !ad(n) || !ad(t) || !ad(s);
}
function hi(n) {
  return Wd(n) || Bb(n) || n.z || n.rotate || n.rotateX || n.rotateY || n.skewX || n.skewY;
}
function Bb(n) {
  return wy(n.x) || wy(n.y);
}
function wy(n) {
  return n && n !== "0%";
}
function sc(n, t, s) {
  const l = n - s, r = t * l;
  return s + r;
}
function Cy(n, t, s, l, r) {
  return r !== void 0 && (n = sc(n, r, l)), sc(n, s, l) + t;
}
function Id(n, t = 0, s = 1, l, r) {
  n.min = Cy(n.min, t, s, l, r), n.max = Cy(n.max, t, s, l, r);
}
function zb(n, { x: t, y: s }) {
  Id(n.x, t.translate, t.scale, t.originPoint), Id(n.y, s.translate, s.scale, s.originPoint);
}
const Ty = 0.999999999999, jy = 1.0000000000001;
function l6(n, t, s, l = !1) {
  const r = s.length;
  if (!r)
    return;
  t.x = t.y = 1;
  let u, c;
  for (let d = 0; d < r; d++) {
    u = s[d], c = u.projectionDelta;
    const { visualElement: g } = u.options;
    g && g.props.style && g.props.style.display === "contents" || (l && u.options.layoutScroll && u.scroll && u !== u.root && (zn(n.x, -u.scroll.offset.x), zn(n.y, -u.scroll.offset.y)), c && (t.x *= c.x.scale, t.y *= c.y.scale, zb(n, c)), l && hi(u.latestValues) && Qr(n, u.latestValues, u.layout?.layoutBox));
  }
  t.x < jy && t.x > Ty && (t.x = 1), t.y < jy && t.y > Ty && (t.y = 1);
}
function zn(n, t) {
  n.min += t, n.max += t;
}
function Ey(n, t, s, l, r = 0.5) {
  const u = Pt(n.min, n.max, r);
  Id(n, t, s, u, l);
}
function Ay(n, t) {
  return typeof n == "string" ? parseFloat(n) / 100 * (t.max - t.min) : n;
}
function Qr(n, t, s) {
  const l = s ?? n;
  Ey(n.x, Ay(t.x, l.x), t.scaleX, t.scale, t.originX), Ey(n.y, Ay(t.y, l.y), t.scaleY, t.scale, t.originY);
}
function Vb(n, t) {
  return $b(s6(n.getBoundingClientRect(), t));
}
function o6(n, t, s) {
  const l = Vb(n, s), { scroll: r } = t;
  return r && (zn(l.x, r.offset.x), zn(l.y, r.offset.y)), l;
}
const r6 = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, c6 = _s.length;
function u6(n, t, s) {
  let l = "", r = !0;
  for (let c = 0; c < c6; c++) {
    const d = _s[c], g = n[d];
    if (g === void 0)
      continue;
    let m = !0;
    if (typeof g == "number")
      m = g === (d.startsWith("scale") ? 1 : 0);
    else {
      const y = parseFloat(g);
      m = d.startsWith("scale") ? y === 1 : y === 0;
    }
    if (!m || s) {
      const y = Jd(g, nc[d]);
      if (!m) {
        r = !1;
        const v = r6[d] || d;
        l += `${v}(${y}) `;
      }
      s && (t[d] = y);
    }
  }
  const u = n.pathRotation;
  return u && (r = !1, l += `rotate(${Jd(u, nc.pathRotation)}) `), l = l.trim(), s ? l = s(t, r ? "" : l) : r && (l = "none"), l;
}
function nm(n, t, s) {
  const { style: l, vars: r, transformOrigin: u } = n;
  let c = !1, d = !1;
  for (const g in t) {
    const m = t[g];
    if (Ds.has(g)) {
      c = !0;
      continue;
    } else if (K2(g)) {
      r[g] = m;
      continue;
    } else {
      const y = Jd(m, nc[g]);
      g.startsWith("origin") ? (d = !0, u[g] = y) : l[g] = y;
    }
  }
  if (t.transform || (c || s ? l.transform = u6(t, n.transform, s) : l.transform && (l.transform = "none")), d) {
    const { originX: g = "50%", originY: m = "50%", originZ: y = 0 } = u;
    l.transformOrigin = `${g} ${m} ${y}`;
  }
}
function kb(n, { style: t, vars: s }, l, r) {
  const u = n.style;
  let c;
  for (c in t)
    u[c] = t[c];
  r?.applyProjectionStyles(u, l);
  for (c in s)
    u.setProperty(c, s[c]);
}
function My(n, t) {
  return t.max === t.min ? 0 : n / (t.max - t.min) * 100;
}
const El = {
  correct: (n, t) => {
    if (!t.target)
      return n;
    if (typeof n == "string")
      if (ht.test(n))
        n = parseFloat(n);
      else
        return n;
    const s = My(n, t.target.x), l = My(n, t.target.y);
    return `${s}% ${l}%`;
  }
}, f6 = {
  correct: (n, { treeScale: t, projectionDelta: s }) => {
    const l = n, r = Dn.parse(n);
    if (r.length > 5)
      return l;
    const u = Dn.createTransformer(n), c = typeof r[0] != "number" ? 1 : 0, d = s.x.scale * t.x, g = s.y.scale * t.y;
    r[0 + c] /= d, r[1 + c] /= g;
    const m = Pt(d, g, 0.5);
    return typeof r[2 + c] == "number" && (r[2 + c] /= m), typeof r[3 + c] == "number" && (r[3 + c] /= m), u(r);
  }
}, th = {
  borderRadius: {
    ...El,
    applyTo: [...Zh]
  },
  borderTopLeftRadius: El,
  borderTopRightRadius: El,
  borderBottomLeftRadius: El,
  borderBottomRightRadius: El,
  boxShadow: f6
};
function Ub(n, { layout: t, layoutId: s }) {
  return Ds.has(n) || n.startsWith("origin") || (t || s !== void 0) && (!!th[n] || n === "opacity");
}
function am(n, t, s) {
  const l = n.style, r = t?.style, u = {};
  if (!l)
    return u;
  for (const c in l)
    (ye(l[c]) || r && ye(r[c]) || Ub(c, n) || s?.getValue(c)?.liveStyle !== void 0) && (u[c] = l[c]);
  return u;
}
function d6(n) {
  return window.getComputedStyle(n);
}
class Hb extends Lb {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = kb;
  }
  readValueFromInstance(t, s) {
    if (Ds.has(s))
      return this.projection?.isProjecting ? Ud(s) : Lw(t, s);
    {
      const l = d6(t), r = (K2(s) ? l.getPropertyValue(s) : l[s]) || 0;
      return typeof r == "string" ? r.trim() : r;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: s }) {
    return Vb(t, s);
  }
  build(t, s, l) {
    nm(t, s, l.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, s, l) {
    return am(t, s, l);
  }
}
function h6(n, t) {
  return n in t;
}
class m6 extends Ob {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(t, s) {
    if (h6(s, t)) {
      const l = t[s];
      if (typeof l == "string" || typeof l == "number")
        return l;
    }
  }
  getBaseTargetFromProps() {
  }
  removeValueFromRenderState(t, s) {
    delete s.output[t];
  }
  measureInstanceViewportBox() {
    return de();
  }
  build(t, s) {
    Object.assign(t.output, s);
  }
  renderInstance(t, { output: s }) {
    Object.assign(t, s);
  }
  sortInstanceNodePosition() {
    return 0;
  }
}
const p6 = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, g6 = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function y6(n, t, s = 1, l = 0, r = !0) {
  n.pathLength = 1;
  const u = r ? p6 : g6;
  n[u.offset] = `${-l}`, n[u.array] = `${t} ${s}`;
}
const v6 = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function qb(n, {
  attrX: t,
  attrY: s,
  attrScale: l,
  pathLength: r,
  pathSpacing: u = 1,
  pathOffset: c = 0,
  // This is object creation, which we try to avoid per-frame.
  ...d
}, g, m, y) {
  if (nm(n, d, m), g) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  n.attrs = n.style, n.style = {};
  const { attrs: v, style: b } = n;
  v.transform && (b.transform = v.transform, delete v.transform), (b.transform || v.transformOrigin) && (b.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), b.transform && (b.transformBox = y?.transformBox ?? "fill-box", delete v.transformBox);
  for (const T of v6)
    v[T] !== void 0 && (b[T] = v[T], delete v[T]);
  t !== void 0 && (v.x = t), s !== void 0 && (v.y = s), l !== void 0 && (v.scale = l), r !== void 0 && y6(v, r, u, c, !1);
}
const Yb = /* @__PURE__ */ new Set([
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
]), Gb = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function b6(n, t, s, l) {
  kb(n, t, void 0, l);
  for (const r in t.attrs)
    n.setAttribute(Yb.has(r) ? r : Kh(r), t.attrs[r]);
}
function Pb(n, t, s) {
  const l = am(n, t, s);
  for (const r in n)
    if (ye(n[r]) || ye(t[r])) {
      const u = _s.indexOf(r) !== -1 ? "attr" + r.charAt(0).toUpperCase() + r.substring(1) : r;
      l[u] = n[r];
    }
  return l;
}
class Xb extends Lb {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = de;
  }
  getBaseTargetFromProps(t, s) {
    return t[s];
  }
  readValueFromInstance(t, s) {
    if (Ds.has(s)) {
      const l = Cb(s);
      return l && l.default || 0;
    }
    return s = Yb.has(s) ? s : Kh(s), t.getAttribute(s);
  }
  scrapeMotionValuesFromProps(t, s, l) {
    return Pb(t, s, l);
  }
  build(t, s, l) {
    qb(t, s, this.isSVGTag, l.transformTemplate, l.style);
  }
  renderInstance(t, s, l, r) {
    b6(t, s, l, r);
  }
  mount(t) {
    this.isSVGTag = Gb(t.tagName), super.mount(t);
  }
}
const x6 = tm.length;
function Kb(n) {
  if (!n)
    return;
  if (!n.isControllingVariants) {
    const s = n.parent ? Kb(n.parent) || {} : {};
    return n.props.initial !== void 0 && (s.initial = n.props.initial), s;
  }
  const t = {};
  for (let s = 0; s < x6; s++) {
    const l = tm[s], r = n.props[l];
    (Pl(r) || r === !1) && (t[l] = r);
  }
  return t;
}
function Qb(n, t) {
  if (!Array.isArray(t))
    return !1;
  const s = t.length;
  if (s !== n.length)
    return !1;
  for (let l = 0; l < s; l++)
    if (t[l] !== n[l])
      return !1;
  return !0;
}
const S6 = [...Ih].reverse(), w6 = Ih.length;
function C6(n) {
  return (t) => Promise.all(t.map(({ animation: s, options: l }) => C9(n, s, l)));
}
function T6(n) {
  let t = C6(n), s = _y(), l = !0, r = !1;
  const u = (m) => (y, v) => {
    const b = xi(n, v, m === "exit" ? n.presenceContext?.custom : void 0);
    if (b) {
      const { transition: T, transitionEnd: S, ...C } = b;
      y = { ...y, ...C, ...S };
    }
    return y;
  };
  function c(m) {
    t = m(n);
  }
  function d(m) {
    const { props: y } = n, v = Kb(n.parent) || {}, b = [], T = /* @__PURE__ */ new Set();
    let S = {}, C = 1 / 0;
    for (let M = 0; M < w6; M++) {
      const _ = S6[M], R = s[_], D = y[_] !== void 0 ? y[_] : v[_], L = Pl(D), $ = _ === m ? R.isActive : null;
      $ === !1 && (C = M);
      let E = D === v[_] && D !== y[_] && L;
      if (E && (l || r) && n.manuallyAnimateOnMount && (E = !1), R.protectedKeys = { ...S }, // If it isn't active and hasn't *just* been set as inactive
      !R.isActive && $ === null || // If we didn't and don't have any defined prop for this animation type
      !D && !R.prevProp || // Or if the prop doesn't define an animation
      yc(D) || typeof D == "boolean")
        continue;
      if (_ === "exit" && R.isActive && $ !== !0) {
        R.prevResolvedValues && (S = {
          ...S,
          ...R.prevResolvedValues
        });
        continue;
      }
      const z = j6(R.prevProp, D);
      let k = z || // If we're making this variant active, we want to always make it active
      _ === m && R.isActive && !E && L || // If we removed a higher-priority variant (i is in reverse order)
      M > C && L, Y = !1;
      const et = Array.isArray(D) ? D : [D];
      let nt = et.reduce(u(_), {});
      $ === !1 && (nt = {});
      const { prevResolvedValues: J = {} } = R, Q = {
        ...J,
        ...nt
      }, W = (X) => {
        k = !0, T.has(X) && (Y = !0, T.delete(X)), R.needsAnimating[X] = !0;
        const it = n.getValue(X);
        it && (it.liveStyle = !1);
      };
      for (const X in Q) {
        const it = nt[X], ot = J[X];
        if (S.hasOwnProperty(X))
          continue;
        let N = !1;
        Xd(it) && Xd(ot) ? N = !Qb(it, ot) || z : N = it !== ot, N ? it != null ? W(X) : T.add(X) : it !== void 0 && T.has(X) ? W(X) : R.protectedKeys[X] = !0;
      }
      R.prevProp = D, R.prevResolvedValues = nt, R.isActive && (S = { ...S, ...nt }), (l || r) && n.blockInitialAnimation && (k = !1);
      const O = E && z;
      k && (!O || Y) && b.push(...et.map((X) => {
        const it = { type: _ };
        if (typeof X == "string" && (l || r) && !O && n.manuallyAnimateOnMount && n.parent) {
          const { parent: ot } = n, N = xi(ot, X);
          if (ot.enteringChildren && N) {
            const { delayChildren: q } = N.transition || {};
            it.delay = gb(ot.enteringChildren, n, q);
          }
        }
        return {
          animation: X,
          options: it
        };
      }));
    }
    if (T.size) {
      const M = {};
      if (typeof y.initial != "boolean") {
        const _ = xi(n, Array.isArray(y.initial) ? y.initial[0] : y.initial);
        _ && _.transition && (M.transition = _.transition);
      }
      T.forEach((_) => {
        const R = n.getBaseTarget(_), D = n.getValue(_);
        D && (D.liveStyle = !0), M[_] = R ?? null;
      }), b.push({ animation: M });
    }
    let w = !!b.length;
    return l && (y.initial === !1 || y.initial === y.animate) && !n.manuallyAnimateOnMount && (w = !1), l = !1, r = !1, w ? t(b) : Promise.resolve();
  }
  function g(m, y) {
    if (s[m].isActive === y)
      return Promise.resolve();
    n.variantChildren?.forEach((b) => b.animationState?.setActive(m, y)), s[m].isActive = y;
    const v = d(m);
    for (const b in s)
      s[b].protectedKeys = {};
    return v;
  }
  return {
    animateChanges: d,
    setActive: g,
    setAnimateFunction: c,
    getState: () => s,
    reset: () => {
      s = _y(), r = !0;
    }
  };
}
function j6(n, t) {
  return typeof t == "string" ? t !== n : Array.isArray(t) ? !Qb(t, n) : !1;
}
function ci(n = !1) {
  return {
    isActive: n,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function _y() {
  return {
    animate: ci(!0),
    whileInView: ci(),
    whileHover: ci(),
    whileTap: ci(),
    whileDrag: ci(),
    whileFocus: ci(),
    exit: ci()
  };
}
function eh(n, t) {
  n.min = t.min, n.max = t.max;
}
function Tn(n, t) {
  eh(n.x, t.x), eh(n.y, t.y);
}
function Dy(n, t) {
  n.translate = t.translate, n.scale = t.scale, n.originPoint = t.originPoint, n.origin = t.origin;
}
const Zb = 1e-4, E6 = 1 - Zb, A6 = 1 + Zb, Fb = 0.01, M6 = 0 - Fb, _6 = 0 + Fb;
function $e(n) {
  return n.max - n.min;
}
function D6(n, t, s) {
  return Math.abs(n - t) <= s;
}
function Ry(n, t, s, l = 0.5) {
  n.origin = l, n.originPoint = Pt(t.min, t.max, n.origin), n.scale = $e(s) / $e(t), n.translate = Pt(s.min, s.max, n.origin) - n.originPoint, (n.scale >= E6 && n.scale <= A6 || isNaN(n.scale)) && (n.scale = 1), (n.translate >= M6 && n.translate <= _6 || isNaN(n.translate)) && (n.translate = 0);
}
function Bl(n, t, s, l) {
  Ry(n.x, t.x, s.x, l ? l.originX : void 0), Ry(n.y, t.y, s.y, l ? l.originY : void 0);
}
function Ny(n, t, s, l = 0) {
  const r = l ? Pt(s.min, s.max, l) : s.min;
  n.min = r + t.min, n.max = n.min + $e(t);
}
function R6(n, t, s, l) {
  Ny(n.x, t.x, s.x, l?.x), Ny(n.y, t.y, s.y, l?.y);
}
function Oy(n, t, s, l = 0) {
  const r = l ? Pt(s.min, s.max, l) : s.min;
  n.min = t.min - r, n.max = n.min + $e(t);
}
function lc(n, t, s, l) {
  Oy(n.x, t.x, s.x, l?.x), Oy(n.y, t.y, s.y, l?.y);
}
function Ly(n, t, s, l, r) {
  return n -= t, n = sc(n, 1 / s, l), r !== void 0 && (n = sc(n, 1 / r, l)), n;
}
function N6(n, t = 0, s = 1, l = 0.5, r, u = n, c = n) {
  if (kn.test(t) && (t = parseFloat(t), t = Pt(c.min, c.max, t / 100) - c.min), typeof t != "number")
    return;
  let d = Pt(u.min, u.max, l);
  n === u && (d -= t), n.min = Ly(n.min, t, s, d, r), n.max = Ly(n.max, t, s, d, r);
}
function $y(n, t, [s, l, r], u, c) {
  N6(n, t[s], t[l], t[r], t.scale, u, c);
}
const O6 = ["x", "scaleX", "originX"], L6 = ["y", "scaleY", "originY"];
function By(n, t, s, l) {
  $y(n.x, t, O6, s ? s.x : void 0, l ? l.x : void 0), $y(n.y, t, L6, s ? s.y : void 0, l ? l.y : void 0);
}
function zy(n) {
  return n.translate === 0 && n.scale === 1;
}
function Jb(n) {
  return zy(n.x) && zy(n.y);
}
function Vy(n, t) {
  return n.min === t.min && n.max === t.max;
}
function $6(n, t) {
  return Vy(n.x, t.x) && Vy(n.y, t.y);
}
function ky(n, t) {
  return Math.round(n.min) === Math.round(t.min) && Math.round(n.max) === Math.round(t.max);
}
function Wb(n, t) {
  return ky(n.x, t.x) && ky(n.y, t.y);
}
function Uy(n) {
  return $e(n.x) / $e(n.y);
}
function Hy(n, t) {
  return n.translate === t.translate && n.scale === t.scale && n.originPoint === t.originPoint;
}
function Bn(n) {
  return [n("x"), n("y")];
}
function B6(n, t, s) {
  let l = "";
  const r = n.x.translate / t.x, u = n.y.translate / t.y, c = s?.z || 0;
  if ((r || u || c) && (l = `translate3d(${r}px, ${u}px, ${c}px) `), (t.x !== 1 || t.y !== 1) && (l += `scale(${1 / t.x}, ${1 / t.y}) `), s) {
    const { transformPerspective: m, rotate: y, pathRotation: v, rotateX: b, rotateY: T, skewX: S, skewY: C } = s;
    m && (l = `perspective(${m}px) ${l}`), y && (l += `rotate(${y}deg) `), v && (l += `rotate(${v}deg) `), b && (l += `rotateX(${b}deg) `), T && (l += `rotateY(${T}deg) `), S && (l += `skewX(${S}deg) `), C && (l += `skewY(${C}deg) `);
  }
  const d = n.x.scale * t.x, g = n.y.scale * t.y;
  return (d !== 1 || g !== 1) && (l += `scale(${d}, ${g})`), l || "none";
}
const z6 = Zh.length, qy = (n) => typeof n == "string" ? parseFloat(n) : n, Yy = (n) => typeof n == "number" || ht.test(n);
function V6(n, t, s, l, r, u) {
  r ? (n.opacity = Pt(0, s.opacity ?? 1, k6(l)), n.opacityExit = Pt(t.opacity ?? 1, 0, U6(l))) : u && (n.opacity = Pt(t.opacity ?? 1, s.opacity ?? 1, l));
  for (let c = 0; c < z6; c++) {
    const d = Zh[c];
    let g = Gy(t, d), m = Gy(s, d);
    if (g === void 0 && m === void 0)
      continue;
    g || (g = 0), m || (m = 0), g === 0 || m === 0 || Yy(g) === Yy(m) ? (n[d] = Math.max(Pt(qy(g), qy(m), l), 0), (kn.test(m) || kn.test(g)) && (n[d] += "%")) : n[d] = m;
  }
  (t.rotate || s.rotate) && (n.rotate = Pt(t.rotate || 0, s.rotate || 0, l));
}
function Gy(n, t) {
  return n[t] !== void 0 ? n[t] : n.borderRadius;
}
const k6 = /* @__PURE__ */ Ib(0, 0.5, k2), U6 = /* @__PURE__ */ Ib(0.5, 0.95, vn);
function Ib(n, t, s) {
  return (l) => l < n ? 0 : l > t ? 1 : s(/* @__PURE__ */ Ss(n, t, l));
}
function tx(n, t, s) {
  const l = ye(n) ? n : qa(n);
  return l.start(Ph("", l, t, s)), l.animation;
}
function Xl(n, t, s, l = { passive: !0 }) {
  return n.addEventListener(t, s, l), () => n.removeEventListener(t, s, l);
}
const H6 = (n, t) => n.depth - t.depth;
class q6 {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(t) {
    Ah(this.children, t), this.isDirty = !0;
  }
  remove(t) {
    xs(this.children, t), this.isDirty = !0;
  }
  forEach(t) {
    this.isDirty && this.children.sort(H6), this.isDirty = !1, this.children.forEach(t);
  }
}
function Y6(n, t) {
  const s = Le.now(), l = ({ timestamp: r }) => {
    const u = r - s;
    u >= t && (ua(l), n(u - t));
  };
  return Xt.setup(l, !0), () => ua(l);
}
function Zr(n) {
  return ye(n) ? n.get() : n;
}
class G6 {
  constructor() {
    this.members = [];
  }
  add(t) {
    Ah(this.members, t);
    for (let s = this.members.length - 1; s >= 0; s--) {
      const l = this.members[s];
      if (l === t || l === this.lead || l === this.prevLead)
        continue;
      const r = l.instance;
      (!r || r.isConnected === !1) && !l.snapshot && (xs(this.members, l), l.unmount());
    }
    t.scheduleRender();
  }
  remove(t) {
    if (xs(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead) {
      const s = this.members[this.members.length - 1];
      s && this.promote(s);
    }
  }
  relegate(t) {
    for (let s = this.members.indexOf(t) - 1; s >= 0; s--) {
      const l = this.members[s];
      if (l.isPresent !== !1 && l.instance?.isConnected !== !1)
        return this.promote(l), !0;
    }
    return !1;
  }
  promote(t, s) {
    const l = this.lead;
    if (t !== l && (this.prevLead = l, this.lead = t, t.show(), l)) {
      l.updateSnapshot(), t.scheduleRender();
      const { layoutDependency: r } = l.options, { layoutDependency: u } = t.options;
      (r === void 0 || r !== u) && (t.resumeFrom = l, s && (l.preserveOpacity = !0), l.snapshot && (t.snapshot = l.snapshot, t.snapshot.latestValues = l.animationValues || l.latestValues), t.root?.isUpdating && (t.isLayoutDirty = !0)), t.options.crossfade === !1 && l.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((t) => {
      t.options.onExitComplete?.(), t.resumingFrom?.options.onExitComplete?.();
    });
  }
  scheduleRender() {
    this.members.forEach((t) => t.instance && t.scheduleRender(!1));
  }
  removeLeadSnapshot() {
    this.lead?.snapshot && (this.lead.snapshot = void 0);
  }
}
const Fr = {
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
}, id = ["", "X", "Y", "Z"], P6 = 1e3;
let X6 = 0;
function sd(n, t, s, l) {
  const { latestValues: r } = t;
  r[n] && (s[n] = r[n], t.setStaticValue(n, 0), l && (l[n] = 0));
}
function ex(n) {
  if (n.hasCheckedOptimisedAppear = !0, n.root === n)
    return;
  const { visualElement: t } = n.options;
  if (!t)
    return;
  const s = xb(t);
  if (window.MotionHasOptimisedAnimation(s, "transform")) {
    const { layout: r, layoutId: u } = n.options;
    window.MotionCancelOptimisedAnimation(s, "transform", Xt, !(r || u));
  }
  const { parent: l } = n;
  l && !l.hasCheckedOptimisedAppear && ex(l);
}
function nx({ attachResizeListener: n, defaultParent: t, measureScroll: s, checkIsScrollRoot: l, resetTransform: r }) {
  return class {
    constructor(c = {}, d = t?.()) {
      this.id = X6++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(Z6), this.nodes.forEach(eC), this.nodes.forEach(nC), this.nodes.forEach(F6);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = c, this.root = d ? d.root || d : this, this.path = d ? [...d.path, d] : [], this.parent = d, this.depth = d ? d.depth + 1 : 0;
      for (let g = 0; g < this.path.length; g++)
        this.path[g].shouldResetTransform = !0;
      this.root === this && (this.nodes = new q6());
    }
    addEventListener(c, d) {
      return this.eventHandlers.has(c) || this.eventHandlers.set(c, new _h()), this.eventHandlers.get(c).add(d);
    }
    notifyListeners(c, ...d) {
      const g = this.eventHandlers.get(c);
      g && g.notify(...d);
    }
    hasListeners(c) {
      return this.eventHandlers.has(c);
    }
    /**
     * Lifecycles
     */
    mount(c) {
      if (this.instance)
        return;
      this.isSVG = gc(c) && !_b(c), this.instance = c;
      const { layoutId: d, layout: g, visualElement: m } = this.options;
      if (m && !m.current && m.mount(c), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (g || d) && (this.isLayoutDirty = !0), n) {
        let y, v = 0;
        const b = () => this.root.updateBlockedByResize = !1;
        Xt.read(() => {
          v = window.innerWidth;
        }), n(c, () => {
          const T = window.innerWidth;
          T !== v && (v = T, this.root.updateBlockedByResize = !0, y && y(), y = Y6(b, 250), Fr.hasAnimatedSinceResize && (Fr.hasAnimatedSinceResize = !1, this.nodes.forEach(Ky)));
        });
      }
      d && this.root.registerSharedNode(d, this), this.options.animate !== !1 && m && (d || g) && this.addEventListener("didUpdate", ({ delta: y, hasLayoutChanged: v, hasRelativeLayoutChanged: b, layout: T }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const S = this.options.transition || m.getDefaultTransition() || oC, { onLayoutAnimationStart: C, onLayoutAnimationComplete: w } = m.getProps(), M = !this.targetLayout || !Wb(this.targetLayout, T), _ = !v && b;
        if (this.options.layoutRoot || this.resumeFrom || _ || v && (M || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const R = {
            ...Gh(S, "layout"),
            onPlay: C,
            onComplete: w
          };
          (m.shouldReduceMotion || this.options.layoutRoot) && (R.delay = 0, R.type = !1), this.startAnimation(R), this.setAnimationOrigin(y, _, R.path);
        } else
          v || Ky(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = T;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const c = this.getStack();
      c && c.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), ua(this.updateProjection);
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
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(aC), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: c } = this.options;
      return c && c.getProps().transformTemplate;
    }
    willUpdate(c = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && ex(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let y = 0; y < this.path.length; y++) {
        const v = this.path[y];
        v.shouldResetTransform = !0, (typeof v.latestValues.x == "string" || typeof v.latestValues.y == "string") && (v.isLayoutDirty = !0), v.updateScroll("snapshot"), v.options.layoutRoot && v.willUpdate(!1);
      }
      const { layoutId: d, layout: g } = this.options;
      if (d === void 0 && !g)
        return;
      const m = this.getTransformTemplate();
      this.prevTransformTemplateValue = m ? m(this.latestValues, "") : void 0, this.updateSnapshot(), c && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        const g = this.updateBlockedByResize;
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), g && this.nodes.forEach(W6), this.nodes.forEach(Py);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Xy);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(I6), this.nodes.forEach(tC), this.nodes.forEach(K6), this.nodes.forEach(Q6)) : this.nodes.forEach(Xy), this.clearAllSnapshots();
      const d = Le.now();
      _e.delta = Un(0, 1e3 / 60, d - _e.timestamp), _e.timestamp = d, _e.isProcessing = !0, Ff.update.process(_e), Ff.preRender.process(_e), Ff.render.process(_e), _e.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Jh.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(J6), this.sharedNodes.forEach(iC);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, Xt.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Xt.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !$e(this.snapshot.measuredBox.x) && !$e(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let g = 0; g < this.path.length; g++)
          this.path[g].updateScroll();
      const c = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = de()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: d } = this.options;
      d && d.notify("LayoutMeasure", this.layout.layoutBox, c ? c.layoutBox : void 0);
    }
    updateScroll(c = "measure") {
      let d = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === c && (d = !1), d && this.instance) {
        const g = l(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: c,
          isRoot: g,
          offset: s(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : g
        };
      }
    }
    resetTransform() {
      if (!r)
        return;
      const c = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, d = this.projectionDelta && !Jb(this.projectionDelta), g = this.getTransformTemplate(), m = g ? g(this.latestValues, "") : void 0, y = m !== this.prevTransformTemplateValue;
      c && this.instance && (d || hi(this.latestValues) || y) && (r(this.instance, m), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(c = !0) {
      const d = this.measurePageBox();
      let g = this.removeElementScroll(d);
      return c && (g = this.removeTransform(g)), rC(g), {
        animationId: this.root.animationId,
        measuredBox: d,
        layoutBox: g,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: c } = this.options;
      if (!c)
        return de();
      const d = c.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(cC))) {
        const { scroll: m } = this.root;
        m && (zn(d.x, m.offset.x), zn(d.y, m.offset.y));
      }
      return d;
    }
    removeElementScroll(c) {
      const d = de();
      if (Tn(d, c), this.scroll?.wasRoot)
        return d;
      for (let g = 0; g < this.path.length; g++) {
        const m = this.path[g], { scroll: y, options: v } = m;
        m !== this.root && y && v.layoutScroll && (y.wasRoot && Tn(d, c), zn(d.x, y.offset.x), zn(d.y, y.offset.y));
      }
      return d;
    }
    applyTransform(c, d = !1, g) {
      const m = g || de();
      Tn(m, c);
      for (let y = 0; y < this.path.length; y++) {
        const v = this.path[y];
        !d && v.options.layoutScroll && v.scroll && v !== v.root && (zn(m.x, -v.scroll.offset.x), zn(m.y, -v.scroll.offset.y)), hi(v.latestValues) && Qr(m, v.latestValues, v.layout?.layoutBox);
      }
      return hi(this.latestValues) && Qr(m, this.latestValues, this.layout?.layoutBox), m;
    }
    removeTransform(c) {
      const d = de();
      Tn(d, c);
      for (let g = 0; g < this.path.length; g++) {
        const m = this.path[g];
        if (!hi(m.latestValues))
          continue;
        let y;
        m.instance && (Wd(m.latestValues) && m.updateSnapshot(), y = de(), Tn(y, m.measurePageBox())), By(d, m.latestValues, m.snapshot?.layoutBox, y);
      }
      return hi(this.latestValues) && By(d, this.latestValues), d;
    }
    setTargetDelta(c) {
      this.targetDelta = c, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(c) {
      this.options = {
        ...this.options,
        ...c,
        crossfade: c.crossfade !== void 0 ? c.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== _e.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(c = !1) {
      const d = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = d.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = d.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = d.isSharedProjectionDirty);
      const g = !!this.resumingFrom || this !== d;
      if (!(c || g && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: y, layoutId: v } = this.options;
      if (!this.layout || !(y || v))
        return;
      this.resolvedRelativeTargetAt = _e.timestamp;
      const b = this.getClosestProjectingParent();
      b && this.linkedParentVersion !== b.layoutVersion && !b.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && b && b.layout ? this.createRelativeTarget(b, this.layout.layoutBox, b.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = de(), this.targetWithTransforms = de()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), R6(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : Tn(this.target, this.layout.layoutBox), zb(this.target, this.targetDelta)) : Tn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && b && !!b.resumingFrom == !!this.resumingFrom && !b.options.layoutScroll && b.target && this.animationProgress !== 1 ? this.createRelativeTarget(b, this.target, b.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Wd(this.parent.latestValues) || Bb(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(c, d, g) {
      this.relativeParent = c, this.linkedParentVersion = c.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = de(), this.relativeTargetOrigin = de(), lc(this.relativeTargetOrigin, d, g, this.options.layoutAnchor || void 0), Tn(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const c = this.getLead(), d = !!this.resumingFrom || this !== c;
      let g = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (g = !1), d && (this.isSharedProjectionDirty || this.isTransformDirty) && (g = !1), this.resolvedRelativeTargetAt === _e.timestamp && (g = !1), g)
        return;
      const { layout: m, layoutId: y } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(m || y))
        return;
      Tn(this.layoutCorrected, this.layout.layoutBox);
      const v = this.treeScale.x, b = this.treeScale.y;
      l6(this.layoutCorrected, this.treeScale, this.path, d), c.layout && !c.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (c.target = c.layout.layoutBox, c.targetWithTransforms = de());
      const { target: T } = c;
      if (!T) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Dy(this.prevProjectionDelta.x, this.projectionDelta.x), Dy(this.prevProjectionDelta.y, this.projectionDelta.y)), Bl(this.projectionDelta, this.layoutCorrected, T, this.latestValues), (this.treeScale.x !== v || this.treeScale.y !== b || !Hy(this.projectionDelta.x, this.prevProjectionDelta.x) || !Hy(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", T));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(c = !0) {
      if (this.options.visualElement?.scheduleRender(), c) {
        const d = this.getStack();
        d && d.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = ps(), this.projectionDelta = ps(), this.projectionDeltaWithTransform = ps();
    }
    setAnimationOrigin(c, d = !1, g) {
      const m = this.snapshot, y = m ? m.latestValues : {}, v = { ...this.latestValues }, b = ps();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !d;
      const T = de(), S = m ? m.source : void 0, C = this.layout ? this.layout.source : void 0, w = S !== C, M = this.getStack(), _ = !M || M.members.length <= 1, R = !!(w && !_ && this.options.crossfade === !0 && !this.path.some(lC));
      this.animationProgress = 0;
      let D;
      const L = g?.interpolateProjection(c);
      this.mixTargetDelta = ($) => {
        const E = $ / 1e3, z = L?.(E);
        z ? (b.x.translate = z.x, b.x.scale = Pt(c.x.scale, 1, E), b.x.origin = c.x.origin, b.x.originPoint = c.x.originPoint, b.y.translate = z.y, b.y.scale = Pt(c.y.scale, 1, E), b.y.origin = c.y.origin, b.y.originPoint = c.y.originPoint) : (Qy(b.x, c.x, E), Qy(b.y, c.y, E)), this.setTargetDelta(b), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (lc(T, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), sC(this.relativeTarget, this.relativeTargetOrigin, T, E), D && $6(this.relativeTarget, D) && (this.isProjectionDirty = !1), D || (D = de()), Tn(D, this.relativeTarget)), w && (this.animationValues = v, V6(v, y, this.latestValues, E, R, _)), z && z.rotate !== void 0 && (this.animationValues || (this.animationValues = v), this.animationValues.pathRotation = z.rotate), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = E;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(c) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (ua(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = Xt.update(() => {
        Fr.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = qa(0)), this.motionValue.jump(0, !1), this.currentAnimation = tx(this.motionValue, [0, 1e3], {
          ...c,
          velocity: 0,
          isSync: !0,
          onUpdate: (d) => {
            this.mixTargetDelta(d), c.onUpdate && c.onUpdate(d);
          },
          onComplete: () => {
            c.onComplete && c.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const c = this.getStack();
      c && c.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(P6), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const c = this.getLead();
      let { targetWithTransforms: d, target: g, layout: m, latestValues: y } = c;
      if (!(!d || !g || !m)) {
        if (this !== c && this.layout && m && ax(this.options.animationType, this.layout.layoutBox, m.layoutBox)) {
          g = this.target || de();
          const v = $e(this.layout.layoutBox.x);
          g.x.min = c.target.x.min, g.x.max = g.x.min + v;
          const b = $e(this.layout.layoutBox.y);
          g.y.min = c.target.y.min, g.y.max = g.y.min + b;
        }
        Tn(d, g), Qr(d, y), Bl(this.projectionDeltaWithTransform, this.layoutCorrected, d, y);
      }
    }
    registerSharedNode(c, d) {
      this.sharedNodes.has(c) || this.sharedNodes.set(c, new G6()), this.sharedNodes.get(c).add(d);
      const m = d.options.initialPromotionConfig;
      d.promote({
        transition: m ? m.transition : void 0,
        preserveFollowOpacity: m && m.shouldPreserveFollowOpacity ? m.shouldPreserveFollowOpacity(d) : void 0
      });
    }
    isLead() {
      const c = this.getStack();
      return c ? c.lead === this : !0;
    }
    getLead() {
      const { layoutId: c } = this.options;
      return c ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: c } = this.options;
      return c ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: c } = this.options;
      if (c)
        return this.root.sharedNodes.get(c);
    }
    promote({ needsReset: c, transition: d, preserveFollowOpacity: g } = {}) {
      const m = this.getStack();
      m && m.promote(this, g), c && (this.projectionDelta = void 0, this.needsReset = !0), d && this.setOptions({ transition: d });
    }
    relegate() {
      const c = this.getStack();
      return c ? c.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: c } = this.options;
      if (!c)
        return;
      let d = !1;
      const { latestValues: g } = c;
      if ((g.z || g.rotate || g.rotateX || g.rotateY || g.rotateZ || g.skewX || g.skewY) && (d = !0), !d)
        return;
      const m = {};
      g.z && sd("z", c, m, this.animationValues);
      for (let y = 0; y < id.length; y++)
        sd(`rotate${id[y]}`, c, m, this.animationValues), sd(`skew${id[y]}`, c, m, this.animationValues);
      c.render();
      for (const y in m)
        c.setStaticValue(y, m[y]), this.animationValues && (this.animationValues[y] = m[y]);
      c.scheduleRender();
    }
    applyProjectionStyles(c, d) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        c.visibility = "hidden";
        return;
      }
      const g = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, c.visibility = "", c.opacity = "", c.pointerEvents = Zr(d?.pointerEvents) || "", c.transform = g ? g(this.latestValues, "") : "none";
        return;
      }
      const m = this.getLead();
      if (!this.projectionDelta || !this.layout || !m.target) {
        this.options.layoutId && (c.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, c.pointerEvents = Zr(d?.pointerEvents) || ""), this.hasProjected && !hi(this.latestValues) && (c.transform = g ? g({}, "") : "none", this.hasProjected = !1);
        return;
      }
      c.visibility = "";
      const y = m.animationValues || m.latestValues;
      this.applyTransformsToTarget();
      let v = B6(this.projectionDeltaWithTransform, this.treeScale, y);
      g && (v = g(y, v)), c.transform = v;
      const { x: b, y: T } = this.projectionDelta;
      c.transformOrigin = `${b.origin * 100}% ${T.origin * 100}% 0`, m.animationValues ? c.opacity = m === this ? y.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : y.opacityExit : c.opacity = m === this ? y.opacity !== void 0 ? y.opacity : "" : y.opacityExit !== void 0 ? y.opacityExit : 0;
      for (const S in th) {
        if (y[S] === void 0)
          continue;
        const { correct: C, applyTo: w, isCSSVariable: M } = th[S], _ = v === "none" ? y[S] : C(y[S], m);
        if (w) {
          const R = w.length;
          for (let D = 0; D < R; D++)
            c[w[D]] = _;
        } else
          M ? this.options.visualElement.renderState.vars[S] = _ : c[S] = _;
      }
      this.options.layoutId && (c.pointerEvents = m === this ? Zr(d?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((c) => c.currentAnimation?.stop()), this.root.nodes.forEach(Py), this.root.sharedNodes.clear();
    }
  };
}
function K6(n) {
  n.updateLayout();
}
function Q6(n) {
  const t = n.resumeFrom?.snapshot || n.snapshot;
  if (n.isLead() && n.layout && t && n.hasListeners("didUpdate")) {
    const { layoutBox: s, measuredBox: l } = n.layout, { animationType: r } = n.options, u = t.source !== n.layout.source;
    if (r === "size")
      Bn((y) => {
        const v = u ? t.measuredBox[y] : t.layoutBox[y], b = $e(v);
        v.min = s[y].min, v.max = v.min + b;
      });
    else if (r === "x" || r === "y") {
      const y = r === "x" ? "y" : "x";
      eh(u ? t.measuredBox[y] : t.layoutBox[y], s[y]);
    } else ax(r, t.layoutBox, s) && Bn((y) => {
      const v = u ? t.measuredBox[y] : t.layoutBox[y], b = $e(s[y]);
      v.max = v.min + b, n.relativeTarget && !n.currentAnimation && (n.isProjectionDirty = !0, n.relativeTarget[y].max = n.relativeTarget[y].min + b);
    });
    const c = ps();
    Bl(c, s, t.layoutBox);
    const d = ps();
    u ? Bl(d, n.applyTransform(l, !0), t.measuredBox) : Bl(d, s, t.layoutBox);
    const g = !Jb(c);
    let m = !1;
    if (!n.resumeFrom) {
      const y = n.getClosestProjectingParent();
      if (y && !y.resumeFrom) {
        const { snapshot: v, layout: b } = y;
        if (v && b) {
          const T = n.options.layoutAnchor || void 0, S = de();
          lc(S, t.layoutBox, v.layoutBox, T);
          const C = de();
          lc(C, s, b.layoutBox, T), Wb(S, C) || (m = !0), y.options.layoutRoot && (n.relativeTarget = C, n.relativeTargetOrigin = S, n.relativeParent = y);
        }
      }
    }
    n.notifyListeners("didUpdate", {
      layout: s,
      snapshot: t,
      delta: d,
      layoutDelta: c,
      hasLayoutChanged: g,
      hasRelativeLayoutChanged: m
    });
  } else if (n.isLead()) {
    const { onExitComplete: s } = n.options;
    s && s();
  }
  n.options.transition = void 0;
}
function Z6(n) {
  n.parent && (n.isProjecting() || (n.isProjectionDirty = n.parent.isProjectionDirty), n.isSharedProjectionDirty || (n.isSharedProjectionDirty = !!(n.isProjectionDirty || n.parent.isProjectionDirty || n.parent.isSharedProjectionDirty)), n.isTransformDirty || (n.isTransformDirty = n.parent.isTransformDirty));
}
function F6(n) {
  n.isProjectionDirty = n.isSharedProjectionDirty = n.isTransformDirty = !1;
}
function J6(n) {
  n.clearSnapshot();
}
function Py(n) {
  n.clearMeasurements();
}
function W6(n) {
  n.isLayoutDirty = !0, n.updateLayout();
}
function Xy(n) {
  n.isLayoutDirty = !1;
}
function I6(n) {
  n.isAnimationBlocked && n.layout && !n.isLayoutDirty && (n.snapshot = n.layout, n.isLayoutDirty = !0);
}
function tC(n) {
  const { visualElement: t } = n.options;
  t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"), n.resetTransform();
}
function Ky(n) {
  n.finishAnimation(), n.targetDelta = n.relativeTarget = n.target = void 0, n.isProjectionDirty = !0;
}
function eC(n) {
  n.resolveTargetDelta();
}
function nC(n) {
  n.calcProjection();
}
function aC(n) {
  n.resetSkewAndRotation();
}
function iC(n) {
  n.removeLeadSnapshot();
}
function Qy(n, t, s) {
  n.translate = Pt(t.translate, 0, s), n.scale = Pt(t.scale, 1, s), n.origin = t.origin, n.originPoint = t.originPoint;
}
function Zy(n, t, s, l) {
  n.min = Pt(t.min, s.min, l), n.max = Pt(t.max, s.max, l);
}
function sC(n, t, s, l) {
  Zy(n.x, t.x, s.x, l), Zy(n.y, t.y, s.y, l);
}
function lC(n) {
  return n.animationValues && n.animationValues.opacityExit !== void 0;
}
const oC = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, Fy = (n) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(n), Jy = Fy("applewebkit/") && !Fy("chrome/") ? Math.round : vn;
function Wy(n) {
  n.min = Jy(n.min), n.max = Jy(n.max);
}
function rC(n) {
  Wy(n.x), Wy(n.y);
}
function ax(n, t, s) {
  return n === "position" || n === "preserve-aspect" && !D6(Uy(t), Uy(s), 0.2);
}
function cC(n) {
  return n !== n.root && n.scroll?.wasRoot;
}
const uC = nx({
  attachResizeListener: (n, t) => Xl(n, "resize", t),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), ld = {
  current: void 0
}, ix = nx({
  measureScroll: (n) => ({
    x: n.scrollLeft,
    y: n.scrollTop
  }),
  defaultParent: () => {
    if (!ld.current) {
      const n = new uC({});
      n.mount(window), n.setOptions({ layoutScroll: !0 }), ld.current = n;
    }
    return ld.current;
  },
  resetTransform: (n, t) => {
    n.style.transform = t !== void 0 ? t : "none";
  },
  checkIsScrollRoot: (n) => window.getComputedStyle(n).position === "fixed"
});
function fC(n, t) {
  if (vc(n)) {
    const { initial: s, animate: l } = n;
    return {
      initial: s === !1 || Pl(s) ? s : void 0,
      animate: Pl(l) ? l : void 0
    };
  }
  return n.inherit !== !1 ? t : {};
}
function dC(n) {
  const { initial: t, animate: s } = fC(n, j.useContext(mc));
  return j.useMemo(() => ({ initial: t, animate: s }), [Iy(t), Iy(s)]);
}
function Iy(n) {
  return Array.isArray(n) ? n.join(" ") : n;
}
const im = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function sx(n, t, s) {
  for (const l in t)
    !ye(t[l]) && !Ub(l, s) && (n[l] = t[l]);
}
function hC({ transformTemplate: n }, t) {
  return j.useMemo(() => {
    const s = im();
    return nm(s, t, n), Object.assign({}, s.vars, s.style);
  }, [t]);
}
function mC(n, t) {
  const s = n.style || {}, l = {};
  return sx(l, s, n), Object.assign(l, hC(n, t)), l;
}
function pC(n, t) {
  const s = {}, l = mC(n, t);
  return n.drag && n.dragListener !== !1 && (s.draggable = !1, l.userSelect = l.WebkitUserSelect = l.WebkitTouchCallout = "none", l.touchAction = n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`), n.tabIndex === void 0 && (n.onTap || n.onTapStart || n.whileTap) && (s.tabIndex = 0), s.style = l, s;
}
const lx = () => ({
  ...im(),
  attrs: {}
});
function gC(n, t, s, l) {
  const r = j.useMemo(() => {
    const u = lx();
    return qb(u, t, Gb(l), n.transformTemplate, n.style), {
      ...u.attrs,
      style: { ...u.style }
    };
  }, [t]);
  if (n.style) {
    const u = {};
    sx(u, n.style, n), r.style = { ...u, ...r.style };
  }
  return r;
}
const yC = /* @__PURE__ */ new Set([
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
function oc(n) {
  return n.startsWith("while") || n.startsWith("drag") && n !== "draggable" || n.startsWith("layout") || n.startsWith("onTap") || n.startsWith("onPan") || n.startsWith("onLayout") || yC.has(n);
}
let ox = (n) => !oc(n);
function rx(n) {
  typeof n == "function" && (ox = (t) => t.startsWith("on") ? !oc(t) : n(t));
}
try {
  rx(require("@emotion/is-prop-valid").default);
} catch {
}
function vC(n, t, s) {
  const l = {};
  for (const r in n)
    r === "values" && typeof n.values == "object" || ye(n[r]) || (ox(r) || s === !0 && oc(r) || !t && !oc(r) || // If trying to use native HTML drag events, forward drag listeners
    n.draggable && r.startsWith("onDrag")) && (l[r] = n[r]);
  return l;
}
const bC = [
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
function sm(n) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof n != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    n.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(bC.indexOf(n) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(n))
    )
  );
}
function xC(n, t, s, { latestValues: l }, r, u = !1, c) {
  const g = (c ?? sm(n) ? gC : pC)(t, l, r, n), m = vC(t, typeof n == "string", u), y = n !== j.Fragment ? { ...m, ...g, ref: s } : {}, { children: v } = t, b = j.useMemo(() => ye(v) ? v.get() : v, [v]);
  return j.createElement(n, {
    ...y,
    children: b
  });
}
const no = /* @__PURE__ */ j.createContext(null);
function Ti(n) {
  const t = j.useRef(null);
  return t.current === null && (t.current = n()), t.current;
}
function SC({ scrapeMotionValuesFromProps: n, createRenderState: t }, s, l, r) {
  return {
    latestValues: wC(s, l, r, n),
    renderState: t()
  };
}
function wC(n, t, s, l) {
  const r = {}, u = l(n, {});
  for (const b in u)
    r[b] = Zr(u[b]);
  let { initial: c, animate: d } = n;
  const g = vc(n), m = Db(n);
  t && m && !g && n.inherit !== !1 && (c === void 0 && (c = t.initial), d === void 0 && (d = t.animate));
  let y = s ? s.initial === !1 : !1;
  y = y || c === !1;
  const v = y ? d : c;
  if (v && typeof v != "boolean" && !yc(v)) {
    const b = Array.isArray(v) ? v : [v];
    for (let T = 0; T < b.length; T++) {
      const S = Xh(n, b[T]);
      if (S) {
        const { transitionEnd: C, transition: w, ...M } = S;
        for (const _ in M) {
          let R = M[_];
          if (Array.isArray(R)) {
            const D = y ? R.length - 1 : 0;
            R = R[D];
          }
          R !== null && (r[_] = R);
        }
        for (const _ in C)
          r[_] = C[_];
      }
    }
  }
  return r;
}
const cx = (n) => (t, s) => {
  const l = j.useContext(mc), r = j.useContext(no), u = () => SC(n, t, l, r);
  return s ? u() : Ti(u);
}, CC = /* @__PURE__ */ cx({
  scrapeMotionValuesFromProps: am,
  createRenderState: im
}), TC = /* @__PURE__ */ cx({
  scrapeMotionValuesFromProps: Pb,
  createRenderState: lx
}), tv = {
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
let ev = !1;
function jC() {
  if (ev)
    return;
  const n = {};
  for (const t in tv)
    n[t] = {
      isEnabled: (s) => tv[t].some((l) => !!s[l])
    };
  Nb(n), ev = !0;
}
function ux() {
  return jC(), a6();
}
function nh(n) {
  const t = ux();
  for (const s in n)
    t[s] = {
      ...t[s],
      ...n[s]
    };
  Nb(t);
}
const EC = Symbol.for("motionComponentSymbol");
function AC(n, t, s) {
  const l = j.useRef(s);
  j.useInsertionEffect(() => {
    l.current = s;
  });
  const r = j.useRef(null);
  return j.useCallback((u) => {
    u && n.onMount?.(u), t && (u ? t.mount(u) : t.unmount());
    const c = l.current;
    if (typeof c == "function")
      if (u) {
        const d = c(u);
        typeof d == "function" && (r.current = d);
      } else r.current ? (r.current(), r.current = null) : c(u);
    else c && (c.current = u);
  }, [t]);
}
const fx = j.createContext({});
function ds(n) {
  return n && typeof n == "object" && Object.prototype.hasOwnProperty.call(n, "current");
}
const MC = typeof window < "u", bc = MC ? j.useLayoutEffect : j.useEffect;
function _C(n, t, s, l, r, u) {
  const { visualElement: c } = j.useContext(mc), d = j.useContext(Lh), g = j.useContext(no), m = j.useContext(ws), y = m.reducedMotion, v = m.skipAnimations, b = j.useRef(null), T = j.useRef(!1);
  l = l || d.renderer, !b.current && l && (b.current = l(n, {
    visualState: t,
    parent: c,
    props: s,
    presenceContext: g,
    blockInitialAnimation: g ? g.initial === !1 : !1,
    reducedMotionConfig: y,
    skipAnimations: v,
    isSVG: u
  }), T.current && b.current && (b.current.manuallyAnimateOnMount = !0));
  const S = b.current, C = j.useContext(fx);
  S && !S.projection && r && (S.type === "html" || S.type === "svg") && DC(b.current, s, r, C);
  const w = j.useRef(!1);
  j.useInsertionEffect(() => {
    S && w.current && S.update(s, g);
  });
  const M = s[bb], _ = j.useRef(!!M && typeof window < "u" && !window.MotionHandoffIsComplete?.(M) && window.MotionHasOptimisedAnimation?.(M));
  return bc(() => {
    T.current = !0, S && (w.current = !0, window.MotionIsMounted = !0, S.updateFeatures(), S.scheduleRenderMicrotask(), _.current && S.animationState && S.animationState.animateChanges());
  }), j.useEffect(() => {
    S && (!_.current && S.animationState && S.animationState.animateChanges(), _.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(M);
    }), _.current = !1), S.enteringChildren = void 0);
  }), S;
}
function DC(n, t, s, l) {
  const { layoutId: r, layout: u, drag: c, dragConstraints: d, layoutScroll: g, layoutRoot: m, layoutAnchor: y, layoutCrossfade: v } = t;
  n.projection = new s(n.latestValues, t["data-framer-portal-id"] ? void 0 : dx(n.parent)), n.projection.setOptions({
    layoutId: r,
    layout: u,
    alwaysMeasureLayout: !!c || d && ds(d),
    visualElement: n,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof u == "string" ? u : "both",
    initialPromotionConfig: l,
    crossfade: v,
    layoutScroll: g,
    layoutRoot: m,
    layoutAnchor: y
  });
}
function dx(n) {
  if (n)
    return n.options.allowProjection !== !1 ? n.projection : dx(n.parent);
}
function Jr(n, { forwardMotionProps: t = !1, type: s } = {}, l, r) {
  l && nh(l);
  const u = s ? s === "svg" : sm(n), c = u ? TC : CC;
  function d(m, y) {
    let v;
    const b = {
      ...j.useContext(ws),
      ...m,
      layoutId: RC(m)
    }, { isStatic: T } = b, S = dC(m), C = c(m, T);
    if (!T && typeof window < "u") {
      NC();
      const w = OC(b);
      v = w.MeasureLayout, S.visualElement = _C(n, C, b, r, w.ProjectionNode, u);
    }
    return p.jsxs(mc.Provider, { value: S, children: [v && S.visualElement ? p.jsx(v, { visualElement: S.visualElement, ...b }) : null, xC(n, m, AC(C, S.visualElement, y), C, T, t, u)] });
  }
  d.displayName = `motion.${typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`}`;
  const g = j.forwardRef(d);
  return g[EC] = n, g;
}
function RC({ layoutId: n }) {
  const t = j.useContext(Oh).id;
  return t && n !== void 0 ? t + "-" + n : n;
}
function NC(n, t) {
  j.useContext(Lh).strict;
}
function OC(n) {
  const t = ux(), { drag: s, layout: l } = t;
  if (!s && !l)
    return {};
  const r = { ...s, ...l };
  return {
    MeasureLayout: s?.isEnabled(n) || l?.isEnabled(n) ? r.MeasureLayout : void 0,
    ProjectionNode: r.ProjectionNode
  };
}
function lm(n, t) {
  return Jr(n, t);
}
const ah = /* @__PURE__ */ lm("button"), fa = /* @__PURE__ */ lm("div"), LC = /* @__PURE__ */ lm("span");
var $C = {
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
function BC({
  topLeftCornerRadius: n,
  topRightCornerRadius: t,
  bottomRightCornerRadius: s,
  bottomLeftCornerRadius: l,
  width: r,
  height: u
}) {
  const c = {
    topLeft: -1,
    topRight: -1,
    bottomLeft: -1,
    bottomRight: -1
  }, d = {
    topLeft: n,
    topRight: t,
    bottomLeft: l,
    bottomRight: s
  };
  Object.entries(d).sort(([, m], [, y]) => y - m).forEach(([m, y]) => {
    const v = $C[m], b = Math.min(
      ...v.map((T) => {
        const S = d[T.corner];
        if (y === 0 && S === 0)
          return 0;
        const C = c[T.corner], w = T.side === "top" || T.side === "bottom" ? r : u;
        return C >= 0 ? w - C : y / (y + S) * w;
      })
    );
    c[m] = b, d[m] = Math.min(y, b);
  });
  const g = (m) => ({
    radius: d[m],
    roundingAndSmoothingBudget: c[m]
  });
  return {
    topLeft: g("topLeft"),
    topRight: g("topRight"),
    bottomLeft: g("bottomLeft"),
    bottomRight: g("bottomRight")
  };
}
function Dl(n) {
  return n * Math.PI / 180;
}
function nn(n, ...t) {
  let s = n[0];
  for (let l = 0; l < t.length; l++) {
    const r = t[l];
    s += typeof r == "number" ? r.toFixed(4) : r ?? "", s += n[l + 1];
  }
  return s;
}
var Kl = {
  p: 0,
  pathSegment: () => ""
};
function An(n, t, s) {
  switch (s) {
    case "TR":
      return n;
    case "BR":
      return -t;
    case "BL":
      return -n;
    case "TL":
      return t;
  }
}
function Mn(n, t, s) {
  switch (s) {
    case "TR":
      return t;
    case "BR":
      return n;
    case "BL":
      return -t;
    case "TL":
      return -n;
  }
}
var zC = ({
  cornerRadius: n,
  roundingAndSmoothingBudget: t
}) => {
  const s = Math.min(n, t);
  return s <= 0 ? Kl : {
    p: s,
    pathSegment: (l) => {
      const r = An(s, s, l), u = Mn(s, s, l);
      return nn`a ${s} ${s} 0 0 1 ${r} ${u}`;
    }
  };
};
function om({
  cornerRadius: n,
  cornerSmoothing: t,
  preserveSmoothing: s,
  roundingAndSmoothingBudget: l
}) {
  if (n <= 0)
    return { a: 0, b: 0, c: 0, d: 0, p: 0, arcSectionLength: 0, cornerRadius: 0 };
  let r = (1 + t) * n;
  if (!s) {
    const S = l / n - 1;
    t = Math.min(t, S), r = Math.min(r, l);
  }
  const u = 90 * (1 - t), c = Math.sin(Dl(u / 2)) * n * Math.sqrt(2), d = (90 - u) / 2, g = n * Math.tan(Dl(d / 2)), m = 45 * t, y = g * Math.cos(Dl(m)), v = y * Math.tan(Dl(m));
  let b = (r - c - y - v) / 3, T = 2 * b;
  if (s && r > l) {
    const S = l - v - c - y, C = S / 6, w = S - C;
    b = Math.min(b, w), T = S - b, r = Math.min(r, l);
  }
  return { a: T, b, c: y, d: v, p: r, arcSectionLength: c, cornerRadius: n };
}
var VC = ({
  cornerRadius: n,
  smoothing: t,
  preserveSmoothing: s,
  roundingAndSmoothingBudget: l
}) => {
  const r = om({
    cornerRadius: n,
    cornerSmoothing: t,
    preserveSmoothing: s,
    roundingAndSmoothingBudget: l
  });
  return r.cornerRadius <= 0 ? Kl : {
    p: r.p,
    pathSegment: (u) => {
      switch (u) {
        case "TR":
          return kC(r);
        case "BR":
          return UC(r);
        case "BL":
          return HC(r);
        case "TL":
          return qC(r);
      }
    }
  };
};
function kC({
  cornerRadius: n,
  a: t,
  b: s,
  c: l,
  d: r,
  arcSectionLength: u
}) {
  return nn`c ${t} 0 ${t + s} 0 ${t + s + l} ${r} a ${n} ${n} 0 0 1 ${u} ${u} c ${r} ${l} ${r} ${s + l} ${r} ${t + s + l}`;
}
function UC({
  cornerRadius: n,
  a: t,
  b: s,
  c: l,
  d: r,
  arcSectionLength: u
}) {
  return nn`c 0 ${t} 0 ${t + s} ${-r} ${t + s + l} a ${n} ${n} 0 0 1 -${u} ${u} c ${-l} ${r} ${-(s + l)} ${r} ${-(t + s + l)} ${r}`;
}
function HC({
  cornerRadius: n,
  a: t,
  b: s,
  c: l,
  d: r,
  arcSectionLength: u
}) {
  return nn`c ${-t} 0 ${-(t + s)} 0 ${-(t + s + l)} ${-r} a ${n} ${n} 0 0 1 -${u} -${u} c ${-r} ${-l} ${-r} ${-(s + l)} ${-r} ${-(t + s + l)}`;
}
function qC({
  cornerRadius: n,
  a: t,
  b: s,
  c: l,
  d: r,
  arcSectionLength: u
}) {
  return nn`c 0 ${-t} 0 ${-(t + s)} ${r} ${-(t + s + l)} a ${n} ${n} 0 0 1 ${u} -${u} c ${l} ${-r} ${s + l} ${-r} ${t + s + l} ${-r}`;
}
var YC = ({
  cornerRadius: n,
  exponent: t,
  roundingAndSmoothingBudget: s
}) => {
  const l = Math.min(n, s);
  if (l <= 0) return Kl;
  const r = Number.isFinite(t) ? Math.max(2, t) : 4, u = 2 / r, c = r === 2 ? (b) => b : r === 4 ? Math.sqrt : r === 8 ? (b) => Math.sqrt(Math.sqrt(b)) : (b) => Math.pow(b, u), d = u - 1, g = r === 2 ? () => 1 : r === 4 ? (b) => 1 / Math.sqrt(b) : (b) => Math.pow(b, d), m = [0, Math.PI / 6, Math.PI / 3, Math.PI / 2], y = m.map((b, T) => {
    if (T === 0) return [0, 0];
    if (T === m.length - 1) return [l, l];
    const S = Math.sin(b), C = Math.cos(b);
    return [l * c(S), l * (1 - c(C))];
  }), v = m.map((b, T) => {
    if (T === 0) return [1, 0];
    if (T === m.length - 1) return [0, 1];
    const S = Math.sin(b), C = Math.cos(b), w = u * g(S) * C * l, M = u * g(C) * S * l, _ = Math.hypot(w, M) || 1;
    return [w / _, M / _];
  });
  return {
    p: l,
    pathSegment: (b) => {
      const T = [];
      for (let S = 0; S < m.length - 1; S++) {
        const [C, w] = y[S], [M, _] = y[S + 1], [R, D] = v[S], [L, $] = v[S + 1], E = (m[S] + m[S + 1]) / 2, z = Math.sin(E), k = Math.cos(E), Y = l * c(z), et = l * (1 - c(k)), nt = 8 / 3 * (Y - (C + M) / 2), J = 8 / 3 * (et - (w + _) / 2), Q = L * D - $ * R, W = Q !== 0 ? (-$ * nt + L * J) / Q : 0, O = Q !== 0 ? (R * J - D * nt) / Q : 0, U = C + W * R, X = w + W * D, it = M - O * L, ot = _ - O * $, N = U - C, q = X - w, tt = it - C, lt = ot - w, F = M - C, rt = _ - w, ct = An(N, q, b), gt = Mn(N, q, b), bt = An(tt, lt, b), Dt = Mn(tt, lt, b), Ot = An(F, rt, b), zt = Mn(F, rt, b);
        T.push(nn`c ${ct} ${gt} ${bt} ${Dt} ${Ot} ${zt}`);
      }
      return T.join(" ");
    }
  };
};
function nv(n, t, s, l) {
  if (l <= 0) return { x: 0, y: 0, theta: n };
  const u = l / 32;
  let c = 0, d = 0;
  for (let m = 1; m <= 32; m++) {
    const y = (m - 1) * u, v = y + u, b = (y + v) / 2, T = n + t * y + s / 2 * y * y, S = n + t * v + s / 2 * v * v, C = n + t * b + s / 2 * b * b;
    c += u / 6 * (Math.cos(T) + 4 * Math.cos(C) + Math.cos(S)), d += u / 6 * (Math.sin(T) + 4 * Math.sin(C) + Math.sin(S));
  }
  const g = n + t * l + s / 2 * l * l;
  return { x: c, y: d, theta: g };
}
var GC = 1e-6, PC = ({
  cornerRadius: n,
  smoothing: t,
  roundingAndSmoothingBudget: s
}) => {
  if (n <= 0) return Kl;
  const l = Math.max(0, Math.min(1, t)), r = n, u = Math.PI / 4 * l, c = Math.PI / 2 * r * l, d = c > 0 ? 1 / (r * c) : 0, { x: g, y: m } = c > 0 ? nv(0, 0, d, c) : { x: 0, y: 0 }, { x: y, y: v } = c > 0 ? nv(0, 0, d, c / 2) : { x: 0, y: 0 }, b = g - r * Math.sin(u), T = m + r * Math.cos(u), S = b + T;
  let C = S, w = r, M = g, _ = m, R = y, D = v;
  if (S > s && S > 0) {
    const k = s / S;
    C = s, w = r * k, M = g * k, _ = m * k, R = y * k, D = v * k;
  }
  if (C <= 0)
    return Kl;
  let L = 0, $ = 0;
  if (c > 0) {
    const k = Math.cos(u), Y = Math.sin(u);
    Y > 1e-12 && ($ = 8 / 3 * (_ / 2 - D) / Y), L = 8 / 3 * (R - M / 2) + $ * k;
  }
  const E = Math.PI / 2 - 2 * u, z = Math.abs(E) > GC;
  return {
    p: C,
    pathSegment: (k) => {
      const Y = [];
      if (c > 0) {
        const et = L, nt = 0, J = M - $ * Math.cos(u), Q = _ - $ * Math.sin(u), W = M, O = _, U = An(et, nt, k), X = Mn(et, nt, k), it = An(J, Q, k), ot = Mn(J, Q, k), N = An(W, O, k), q = Mn(W, O, k);
        Y.push(nn`c ${U} ${X} ${it} ${ot} ${N} ${q}`);
      }
      if (z) {
        const et = C - M - _, nt = C - M - _, J = An(et, nt, k), Q = Mn(et, nt, k);
        Y.push(nn`a ${w} ${w} 0 0 1 ${J} ${Q}`);
      }
      if (c > 0) {
        const et = $ * Math.sin(u), nt = $ * Math.cos(u), J = _, Q = M - L, W = _, O = M, U = An(et, nt, k), X = Mn(et, nt, k), it = An(J, Q, k), ot = Mn(J, Q, k), N = An(W, O, k), q = Mn(W, O, k);
        Y.push(nn`c ${U} ${X} ${it} ${ot} ${N} ${q}`);
      }
      return Y.join(" ");
    }
  };
}, XC = 4, KC = {
  arc: zC,
  squircle: VC,
  superellipse: YC,
  clothoid: PC
};
function QC(n) {
  return KC[n];
}
var ZC = 64, ui = /* @__PURE__ */ new Map();
function FC(n, t) {
  return n + "|" + t.cornerRadius + "|" + t.smoothing + "|" + t.exponent + "|" + (t.preserveSmoothing ? 1 : 0) + "|" + t.roundingAndSmoothingBudget;
}
function JC(n) {
  return !Number.isFinite(n.cornerRadius) || !Number.isFinite(n.smoothing) || !Number.isFinite(n.exponent) || !Number.isFinite(n.roundingAndSmoothingBudget);
}
function WC(n) {
  const t = {};
  return {
    p: n.p,
    pathSegment: (s) => {
      const l = t[s];
      if (l !== void 0) return l;
      const r = n.pathSegment(s);
      return t[s] = r, r;
    }
  };
}
function IC(n, t, s) {
  if (JC(s)) return t(s);
  const l = FC(n, s), r = ui.get(l);
  if (r)
    return ui.delete(l), ui.set(l, r), r;
  const u = WC(t(s));
  if (ui.size >= ZC) {
    const c = ui.keys().next().value;
    c !== void 0 && ui.delete(c);
  }
  return ui.set(l, u), u;
}
function Er(n, t, s, l) {
  const r = Math.min(t, l / n - 1), u = om({
    cornerRadius: n,
    cornerSmoothing: r,
    preserveSmoothing: s,
    roundingAndSmoothingBudget: l
  }), c = u.a + u.b + u.c;
  return {
    p: u.p,
    a: u.a,
    b: u.b,
    c: u.c,
    d: u.d,
    e: c,
    ax: u.p - c,
    ay: n - u.d,
    R: n
  };
}
function tT({ a: n, b: t, c: s, d: l, e: r, ax: u, ay: c, R: d }) {
  return nn`c ${n} 0 ${n + t} 0 ${r} ${l} a ${d} ${d} 0 0 1 ${u} ${c} a ${d} ${d} 0 0 1 ${-u} ${c} c ${-s} ${l} ${-(t + s)} ${l} ${-r} ${l}`;
}
function eT({ a: n, b: t, c: s, d: l, e: r, ax: u, ay: c, R: d }) {
  return nn`c ${-n} 0 ${-(n + t)} 0 ${-r} ${-l} a ${d} ${d} 0 0 1 ${-u} ${-c} a ${d} ${d} 0 0 1 ${u} ${-c} c ${s} ${-l} ${t + s} ${-l} ${r} ${-l}`;
}
function nT({ a: n, b: t, c: s, d: l, e: r, ax: u, ay: c, R: d }) {
  return nn`c 0 ${-n} 0 ${-(n + t)} ${l} ${-r} a ${d} ${d} 0 0 1 ${c} ${-u} a ${d} ${d} 0 0 1 ${c} ${u} c ${l} ${s} ${l} ${t + s} ${l} ${r}`;
}
function aT({ a: n, b: t, c: s, d: l, e: r, ax: u, ay: c, R: d }) {
  return nn`c 0 ${n} 0 ${n + t} ${-l} ${r} a ${d} ${d} 0 0 1 ${-c} ${u} a ${d} ${d} 0 0 1 ${-c} ${-u} c ${-l} ${-s} ${-l} ${-(t + s)} ${-l} ${-r}`;
}
function av(n, t, s, l) {
  const r = om({
    cornerRadius: n,
    cornerSmoothing: t,
    preserveSmoothing: s,
    roundingAndSmoothingBudget: l
  }), u = Dl(45 * t);
  return {
    a: r.a,
    b: r.b,
    p: r.p,
    sin: Math.sin(u),
    cos: Math.cos(u)
  };
}
var iv = (n, t, s) => Math.max(0, Math.min(n / t - 1, s)), ge = (n) => (Object.is(n, -0) ? 0 : n).toFixed(4);
function iT(n, t, s, l, r) {
  const u = av(s, iv(n / 2, s, l), r, n / 2), c = av(s, iv(t / 2, s, l), r, t / 2), d = (b, T, S, C, w, M) => {
    const _ = C === 0 ? u : c, R = M === 0 ? u : c, D = b + (S + w) * s, L = T + (C + M) * s, $ = D - w * s * _.cos - S * s * _.sin, E = L - M * s * _.cos - C * s * _.sin, z = D - S * s * R.cos - w * s * R.sin, k = L - C * s * R.cos - M * s * R.sin, Y = b + S * _.p, et = T + C * _.p, nt = Math.hypot(z - $, k - E) > 1e-6, J = nt ? z : $, Q = nt ? k : E, W = b + w * R.p, O = T + M * R.p;
    let U = `L ${ge(Y)} ${ge(et)} `;
    return U += `c ${ge(-S * _.a)} ${ge(-C * _.a)} ${ge(-S * (_.a + _.b))} ${ge(-C * (_.a + _.b))} ${ge($ - Y)} ${ge(E - et)} `, nt && (U += `a ${ge(s)} ${ge(s)} 0 0 1 ${ge(z - $)} ${ge(k - E)} `), U += `c ${ge(W - w * (R.a + R.b) - J)} ${ge(O - M * (R.a + R.b) - Q)} ${ge(W - w * R.a - J)} ${ge(O - M * R.a - Q)} ${ge(W - J)} ${ge(O - Q)}`, U;
  }, g = d(n, 0, -1, 0, 0, 1), m = d(n, t, 0, -1, -1, 0), y = d(0, t, 1, 0, 0, -1), v = d(0, 0, 0, 1, 1, 0);
  return `M ${ge(u.p)} 0 ${g} ${m} ${y} ${v} Z`;
}
var sT = 0.6, lT = !0, oT = "squircle";
function hx(n) {
  return {
    radius: n.radius,
    curve: n.curve ?? oT,
    smoothing: n.smoothing ?? sT,
    exponent: n.exponent ?? XC,
    preserveSmoothing: n.preserveSmoothing ?? lT
  };
}
function Ar(n) {
  return hx(typeof n == "number" ? { radius: n } : n ?? { radius: 0 });
}
function rT(n) {
  if ("radius" in n) {
    const t = hx(n);
    return { topLeft: t, topRight: t, bottomRight: t, bottomLeft: t };
  }
  return {
    topLeft: Ar(n.topLeft),
    topRight: Ar(n.topRight),
    bottomRight: Ar(n.bottomRight),
    bottomLeft: Ar(n.bottomLeft)
  };
}
function mx(n, t, s) {
  if (n <= 0 || t <= 0)
    return "M 0 0 H 0 V 0 H 0 Z";
  const l = rT(s);
  if (l.topLeft.radius <= 0 && l.topRight.radius <= 0 && l.bottomRight.radius <= 0 && l.bottomLeft.radius <= 0)
    return `M 0 0 H ${n} V ${t} H 0 Z`;
  const r = BC({
    topLeftCornerRadius: l.topLeft.radius,
    topRightCornerRadius: l.topRight.radius,
    bottomRightCornerRadius: l.bottomRight.radius,
    bottomLeftCornerRadius: l.bottomLeft.radius,
    width: n,
    height: t
  }), u = (_) => {
    const R = l[_], D = QC(R.curve);
    return IC(R.curve, D, {
      cornerRadius: r[_].radius,
      smoothing: R.smoothing,
      exponent: R.exponent,
      preserveSmoothing: R.preserveSmoothing,
      roundingAndSmoothingBudget: r[_].roundingAndSmoothingBudget
    });
  }, c = (_) => {
    let R;
    return () => R ?? (R = u(_));
  }, d = c("topLeft"), g = c("topRight"), m = c("bottomRight"), y = c("bottomLeft"), v = (_) => _.toFixed(4), b = (_) => _.length > 0 ? " " + _ : "", T = l.topLeft;
  if (cT(l)) {
    const _ = Math.min(T.radius, n / 2, t / 2), R = Math.min(n, t) / 2, D = 1e-9;
    if (_ > 0 && R > _ + D && R < (1 + T.smoothing) * _ - D)
      return iT(n, t, _, T.smoothing, T.preserveSmoothing);
  }
  const S = 1e-9, C = n >= t, w = C ? t / 2 : n / 2, M = (_, R) => {
    const D = l[_], L = l[R];
    return D.curve === "squircle" && L.curve === "squircle" && Math.abs(r[_].radius - w) < S && Math.abs(r[R].radius - w) < S && D.smoothing === L.smoothing && D.preserveSmoothing === L.preserveSmoothing;
  };
  if (C) {
    const _ = M("topRight", "bottomRight"), R = M("topLeft", "bottomLeft");
    if (_ || R) {
      const D = n / 2, L = _ ? Er(w, l.topRight.smoothing, l.topRight.preserveSmoothing, D) : null, $ = R ? Er(w, l.topLeft.smoothing, l.topLeft.preserveSmoothing, D) : null;
      let E = "M " + v($ ? $.p : d().p) + " 0";
      return E += " L " + v(n - (L ? L.p : g().p)) + " 0", L ? E += " " + tT(L) : (E += b(g().pathSegment("TR")), E += " L " + v(n) + " " + v(m().p), E += " L " + v(n) + " " + v(t - m().p), E += b(m().pathSegment("BR"))), $ ? (E += " L " + v($.p) + " " + v(t), E += " " + eT($)) : (E += " L " + v(n - y().p) + " " + v(t), E += " L " + v(y().p) + " " + v(t), E += b(y().pathSegment("BL")), E += " L 0 " + v(t - d().p), E += " L 0 " + v(d().p), E += b(d().pathSegment("TL"))), E + " Z";
    }
  } else {
    const _ = M("topLeft", "topRight"), R = M("bottomLeft", "bottomRight");
    if (_ || R) {
      const D = t / 2, L = _ ? Er(w, l.topLeft.smoothing, l.topLeft.preserveSmoothing, D) : null, $ = R ? Er(w, l.bottomLeft.smoothing, l.bottomLeft.preserveSmoothing, D) : null;
      let E;
      return L ? E = "M 0 " + v(L.p) + " " + nT(L) : (E = "M " + v(d().p) + " 0", E += " L " + v(n - g().p) + " 0", E += b(g().pathSegment("TR"))), E += " L " + v(n) + " " + v(t - ($ ? $.p : m().p)), $ ? E += " " + aT($) : (E += b(m().pathSegment("BR")), E += " L " + v(y().p) + " " + v(t), E += b(y().pathSegment("BL"))), L ? E += " L 0 " + v(L.p) : (E += " L 0 " + v(t - d().p), E += " L 0 " + v(d().p), E += b(d().pathSegment("TL"))), E + " Z";
    }
  }
  return "M " + v(d().p) + " 0 L " + v(n - g().p) + " 0" + b(g().pathSegment("TR")) + " L " + v(n) + " " + v(m().p) + " L " + v(n) + " " + v(t - m().p) + b(m().pathSegment("BR")) + " L " + v(n - y().p) + " " + v(t) + " L " + v(y().p) + " " + v(t) + b(y().pathSegment("BL")) + " L 0 " + v(t - d().p) + " L 0 " + v(d().p) + b(d().pathSegment("TL")) + " Z";
}
function cT(n) {
  const t = n.topLeft;
  return t.curve === "squircle" && [n.topRight, n.bottomRight, n.bottomLeft].every(
    (s) => s.curve === "squircle" && s.radius === t.radius && s.smoothing === t.smoothing && s.preserveSmoothing === t.preserveSmoothing
  );
}
function uT(n, t, s) {
  return `path("${mx(n, t, s)}")`;
}
var Yt = "http://www.w3.org/2000/svg", fT = 0;
function rm() {
  return ++fT;
}
function px(n) {
  const t = n.replace("#", "");
  return t.length === 3 ? "#" + t[0] + t[0] + t[1] + t[1] + t[2] + t[2] : "#" + t;
}
function gx(n) {
  const t = px(n).replace("#", "");
  return `rgb(${parseInt(t.substring(0, 2), 16)},${parseInt(t.substring(2, 4), 16)},${parseInt(t.substring(4, 6), 16)})`;
}
var dT = {
  offsetX: 0,
  offsetY: 0,
  blur: 0,
  spread: 0,
  color: "#000",
  opacity: 0
};
function yx(n) {
  const t = /* @__PURE__ */ new Map(), s = JSON.stringify(n);
  return (l, r, u, c) => {
    const d = `${l}:${r}:${c}:${s}`;
    let g = t.get(d);
    return g === void 0 && (g = mx(l, r, u), t.set(d, g)), g;
  };
}
function vx(n, t) {
  if (t === 0) return n;
  if ("radius" in n)
    return { ...n, radius: Math.max(0, n.radius + t) };
  const s = (l) => {
    if (l !== void 0)
      return typeof l == "number" ? Math.max(0, l + t) : { ...l, radius: Math.max(0, l.radius + t) };
  };
  return {
    topLeft: s(n.topLeft),
    topRight: s(n.topRight),
    bottomRight: s(n.bottomRight),
    bottomLeft: s(n.bottomLeft)
  };
}
function ih(n) {
  const t = px(n).replace("#", ""), s = parseInt(t.substring(0, 2), 16), l = parseInt(t.substring(2, 4), 16), r = parseInt(t.substring(4, 6), 16);
  if (s === 0 && l === 0 && r === 0) return "#4c4c4c";
  const u = Math.round(s * 2 / 3), c = Math.round(l * 2 / 3), d = Math.round(r * 2 / 3);
  return "#" + (1 << 24 | u << 16 | c << 8 | d).toString(16).slice(1);
}
function sh(n) {
  return typeof n == "object" && n !== null && "type" in n;
}
function hT(n) {
  const t = (90 - n) * Math.PI / 180;
  return {
    x1: 0.5 - 0.5 * Math.cos(t),
    y1: 0.5 + 0.5 * Math.sin(t),
    x2: 0.5 + 0.5 * Math.cos(t),
    y2: 0.5 - 0.5 * Math.sin(t)
  };
}
function bx(n, t) {
  for (; n.lastChild; ) n.removeChild(n.lastChild);
  for (const s of t) {
    const l = document.createElementNS(Yt, "stop");
    l.setAttribute("offset", String(s.offset)), l.setAttribute("stop-color", s.color), s.opacity !== void 0 && s.opacity !== 1 && l.setAttribute("stop-opacity", String(s.opacity)), n.appendChild(l);
  }
}
function mT(n, t, s) {
  const l = t.type === "linear" ? "linearGradient" : "radialGradient", r = document.createElementNS(Yt, l);
  return r.setAttribute("id", s), xx(r, t), bx(r, t.stops), n.appendChild(r), r;
}
function pT(n, t) {
  xx(n, t), bx(n, t.stops);
}
function xx(n, t) {
  if (t.type === "linear") {
    const s = hT(t.angle ?? 0);
    n.setAttribute("x1", String(s.x1)), n.setAttribute("y1", String(s.y1)), n.setAttribute("x2", String(s.x2)), n.setAttribute("y2", String(s.y2));
  } else
    n.setAttribute("cx", String(t.cx ?? 0.5)), n.setAttribute("cy", String(t.cy ?? 0.5)), n.setAttribute("r", String(t.r ?? 0.5));
}
function sv(n) {
  return { ...n, stops: n.stops.map((t) => ({ ...t, color: ih(t.color) })) };
}
function lh(n, t, s, l) {
  n.setAttribute("x", String(-t)), n.setAttribute("y", String(-t)), n.setAttribute("width", String(s + t * 2)), n.setAttribute("height", String(l + t * 2));
}
function Mr(n, t, s, l, r) {
  lh(n, s, l, r), lh(t, s, l, r);
}
function od(n, t, s) {
  const l = document.createElementNS(Yt, "mask");
  l.setAttribute("id", n), s && l.setAttribute("maskUnits", "userSpaceOnUse");
  const r = document.createElementNS(Yt, "rect");
  r.setAttribute("fill", "white");
  const u = document.createElementNS(Yt, "path");
  return u.setAttribute("fill", "none"), u.setAttribute("stroke", "black"), l.appendChild(r), l.appendChild(u), t.appendChild(l), { mask: l, rect: r, knockout: u };
}
function rd(n) {
  const t = document.createElementNS(Yt, "g"), s = document.createElementNS(Yt, "path");
  s.setAttribute("fill", "none"), n && s.setAttribute(n.attr, n.value), s.style.display = "none", t.appendChild(s);
  const l = document.createElementNS(Yt, "path");
  return l.setAttribute("fill", "none"), n && l.setAttribute(n.attr, n.value), l.style.display = "none", t.appendChild(l), { group: t, strokePath: s, grooveOverlay: l };
}
function Wr(n, t) {
  const s = t === "main" ? "gradientEl" : "overlayGradientEl";
  n[s]?.remove(), n[s] = null;
}
function _r(n, t, s) {
  if (!sh(n))
    return Wr(t, s), n;
  const l = s === "main" ? "gradientEl" : "overlayGradientEl", r = s === "main" ? t.gradientId : t.overlayGradientId;
  return t[l] ? pT(t[l], n) : t[l] = mT(t.defs, n, r), `url(#${r})`;
}
function cd(n, t, s, l, r) {
  if (!n || n.width <= 0 || n.opacity <= 0) {
    r.strokePath.style.display = "none", r.strokeGroup.removeAttribute("mask"), r.grooveOverlay.style.display = "none", Wr(r, "main"), Wr(r, "overlay");
    return;
  }
  const u = r.strokeMultiplier;
  r.strokePath.style.display = "", r.strokePath.setAttribute("d", t), r.strokePath.setAttribute("stroke", _r(n.color, r, "main")), r.strokePath.setAttribute("stroke-width", String(n.width * u)), r.strokePath.setAttribute("stroke-opacity", String(n.opacity));
  const c = n.style ?? "solid";
  switch (r.strokeGroup.removeAttribute("mask"), r.grooveOverlay.style.display = "none", r.strokePath.removeAttribute("stroke-dasharray"), r.strokePath.setAttribute("stroke-linecap", "butt"), c !== "groove" && c !== "ridge" && Wr(r, "overlay"), c) {
    case "dashed": {
      const d = Math.max(0, n.dash ?? n.width * 3), g = Math.max(0, n.gap ?? n.width * 2);
      r.strokePath.setAttribute("stroke-dasharray", `${d} ${g}`), n.lineCap && r.strokePath.setAttribute("stroke-linecap", n.lineCap);
      break;
    }
    case "dotted": {
      const d = Math.max(0, n.dash ?? 0), g = Math.max(0, n.gap ?? n.width * 2);
      r.strokePath.setAttribute("stroke-dasharray", `${d} ${g}`), r.strokePath.setAttribute("stroke-linecap", n.lineCap ?? "round");
      break;
    }
    case "double":
      if (n.width >= 3) {
        const d = Math.round(n.width / 3);
        r.dblKnockout.setAttribute("d", t), r.dblKnockout.setAttribute("stroke-width", String(d * u)), r.dblRect.setAttribute("width", String(s)), r.dblRect.setAttribute("height", String(l)), r.padDblMask && r.padDblMask(n.width, s, l), r.strokeGroup.setAttribute("mask", `url(#${r.dblMaskId})`);
      }
      break;
    case "groove": {
      const d = sh(n.color) ? sv(n.color) : ih(n.color);
      r.strokePath.setAttribute("stroke", _r(d, r, "main")), r.grooveOverlay.style.display = "", r.grooveOverlay.setAttribute("d", t), r.grooveOverlay.setAttribute("stroke", _r(n.color, r, "overlay")), r.grooveOverlay.setAttribute("stroke-width", String(n.width * u / 2)), r.grooveOverlay.setAttribute("stroke-opacity", String(n.opacity));
      break;
    }
    case "ridge": {
      const d = sh(n.color) ? sv(n.color) : ih(n.color);
      r.grooveOverlay.style.display = "", r.grooveOverlay.setAttribute("d", t), r.grooveOverlay.setAttribute("stroke", _r(d, r, "overlay")), r.grooveOverlay.setAttribute("stroke-width", String(n.width * u / 2)), r.grooveOverlay.setAttribute("stroke-opacity", String(n.opacity));
      break;
    }
  }
}
function gT(n, t) {
  const s = rm(), l = `sc-ishadow-mask-${s}`, r = document.createElementNS(Yt, "mask");
  r.setAttribute("id", l), r.setAttribute("maskUnits", "userSpaceOnUse");
  const u = document.createElementNS(Yt, "rect");
  u.setAttribute("fill", "white");
  const c = document.createElementNS(Yt, "path");
  c.setAttribute("fill", "black"), r.appendChild(u), r.appendChild(c), n.appendChild(r);
  const d = `sc-ishadow-blur-${s}`, g = document.createElementNS(Yt, "filter");
  g.setAttribute("id", d), g.setAttribute("x", "-200%"), g.setAttribute("y", "-200%"), g.setAttribute("width", "500%"), g.setAttribute("height", "500%"), g.setAttribute("color-interpolation-filters", "sRGB");
  const m = document.createElementNS(Yt, "feGaussianBlur");
  m.setAttribute("stdDeviation", "0"), g.appendChild(m), n.appendChild(g);
  const y = document.createElementNS(Yt, "g"), v = document.createElementNS(Yt, "rect");
  return v.setAttribute("mask", `url(#${l})`), v.style.display = "none", y.appendChild(v), t.appendChild(y), { maskId: l, mask: r, maskRect: u, maskCutout: c, filterId: d, filter: g, feBlur: m, blurGroup: y, rect: v };
}
function yT(n) {
  n.mask.remove(), n.filter.remove(), n.blurGroup.remove();
}
function vT(n) {
  const t = rm(), s = `sc-clip-${t}`, l = `sc-mask-${t}`, r = document.createElementNS(Yt, "svg");
  r.style.position = "absolute", r.style.inset = "0", r.style.pointerEvents = "none", r.style.overflow = "visible", r.style.zIndex = "1", r.setAttribute("aria-hidden", "true");
  const u = document.createElementNS(Yt, "defs"), c = document.createElementNS(Yt, "clipPath");
  c.setAttribute("id", s);
  const d = document.createElementNS(Yt, "path");
  c.appendChild(d), u.appendChild(c);
  const g = document.createElementNS(Yt, "mask");
  g.setAttribute("id", l), g.setAttribute("maskUnits", "userSpaceOnUse");
  const m = document.createElementNS(Yt, "rect");
  m.setAttribute("fill", "white");
  const y = document.createElementNS(Yt, "path");
  y.setAttribute("fill", "black"), g.appendChild(m), g.appendChild(y), u.appendChild(g);
  const v = `sc-dbl-inner-${t}`, { rect: b, knockout: T } = od(v, u, !1), S = `sc-dbl-outer-${t}`, { mask: C, rect: w, knockout: M } = od(S, u, !0), _ = `sc-dbl-middle-${t}`, { mask: R, rect: D, knockout: L } = od(_, u, !0);
  r.appendChild(u);
  const $ = document.createElementNS(Yt, "g");
  $.setAttribute("clip-path", `url(#${s})`), r.appendChild($);
  const E = [], { group: z, strokePath: k, grooveOverlay: Y } = rd({ attr: "clip-path", value: `url(#${s})` });
  r.appendChild(z);
  const { group: et, strokePath: nt, grooveOverlay: J } = rd({ attr: "mask", value: `url(#${l})` });
  r.appendChild(et);
  const { group: Q, strokePath: W, grooveOverlay: O } = rd();
  r.appendChild(Q), n.appendChild(r);
  const U = {
    strokePath: k,
    grooveOverlay: Y,
    strokeGroup: z,
    dblMaskId: v,
    dblKnockout: T,
    dblRect: b,
    strokeMultiplier: 2,
    defs: u,
    gradientEl: null,
    gradientId: `sc-grad-inner-${t}`,
    overlayGradientEl: null,
    overlayGradientId: `sc-grad-inner-ov-${t}`
  }, X = {
    strokePath: nt,
    grooveOverlay: J,
    strokeGroup: et,
    dblMaskId: S,
    dblKnockout: M,
    dblRect: w,
    strokeMultiplier: 2,
    defs: u,
    gradientEl: null,
    gradientId: `sc-grad-outer-${t}`,
    overlayGradientEl: null,
    overlayGradientId: `sc-grad-outer-ov-${t}`,
    padDblMask: (ot, N, q) => Mr(C, w, ot, N, q)
  }, it = {
    strokePath: W,
    grooveOverlay: O,
    strokeGroup: Q,
    dblMaskId: _,
    dblKnockout: L,
    dblRect: D,
    strokeMultiplier: 1,
    defs: u,
    gradientEl: null,
    gradientId: `sc-grad-middle-${t}`,
    overlayGradientEl: null,
    overlayGradientId: `sc-grad-middle-ov-${t}`,
    padDblMask: (ot, N, q) => Mr(R, D, ot, N, q)
  };
  return {
    update(ot, N, q, tt) {
      if (q <= 0 || tt <= 0) return;
      r.setAttribute("width", String(q)), r.setAttribute("height", String(tt)), r.setAttribute("viewBox", `0 0 ${q} ${tt}`);
      const lt = yx(ot), F = lt(q, tt, ot, 0);
      d.setAttribute("d", F), y.setAttribute("d", F), m.setAttribute("width", String(q)), m.setAttribute("height", String(tt)), cd(N.innerBorder, F, q, tt, U);
      const rt = N.outerBorder;
      rt && rt.width > 0 && rt.opacity > 0 && Mr(g, m, rt.width, q, tt), cd(rt, F, q, tt, X), cd(N.middleBorder, F, q, tt, it);
      const ct = N.innerShadow, gt = ct == null ? [] : Array.isArray(ct) ? ct : [ct];
      for (; E.length < gt.length; )
        E.push(gT(u, $));
      for (; E.length > gt.length; )
        yT(E.pop());
      for (let bt = 0; bt < gt.length; bt++) {
        const Dt = gt[bt], Ot = E[bt];
        if (Dt.opacity <= 0) {
          Ot.rect.style.display = "none";
          continue;
        }
        Ot.rect.style.display = "";
        const zt = Dt.spread, Be = Math.max(Dt.blur * 3, 20) + Math.max(Math.abs(Dt.offsetX), Math.abs(Dt.offsetY)) + Math.abs(zt);
        Mr(Ot.mask, Ot.maskRect, Be, q, tt);
        const ve = Math.max(1, q - zt * 2), Re = Math.max(1, tt - zt * 2), Se = zt !== 0 ? vx(ot, -zt) : ot;
        Ot.maskCutout.setAttribute("d", lt(ve, Re, Se, -zt)), Ot.maskCutout.setAttribute(
          "transform",
          `translate(${Dt.offsetX + zt},${Dt.offsetY + zt})`
        ), Dt.blur > 0 ? (Ot.feBlur.setAttribute("stdDeviation", String(Dt.blur)), Ot.blurGroup.setAttribute("filter", `url(#${Ot.filterId})`)) : Ot.blurGroup.removeAttribute("filter"), lh(Ot.rect, Be, q, tt), Ot.rect.setAttribute("fill", gx(Dt.color)), Ot.rect.setAttribute("fill-opacity", String(Dt.opacity));
      }
    },
    destroy() {
      r.remove();
    }
  };
}
function bT(n, t) {
  return Math.ceil(3 * n + Math.abs(t) + 1);
}
function xT(n, t, s, l) {
  n.setAttribute("x", String(-l)), n.setAttribute("y", String(-l)), n.setAttribute("width", String(t + 2 * l)), n.setAttribute("height", String(s + 2 * l));
}
function ST(n, t) {
  const s = `sc-shadow-${rm()}`, l = document.createElementNS(Yt, "filter");
  l.setAttribute("id", s), l.setAttribute("filterUnits", "userSpaceOnUse"), l.setAttribute("color-interpolation-filters", "sRGB");
  const r = document.createElementNS(Yt, "feGaussianBlur");
  r.setAttribute("stdDeviation", "0"), l.appendChild(r), n.appendChild(l);
  const u = document.createElementNS(Yt, "path");
  return t.appendChild(u), { filterId: s, filterEl: l, feBlur: r, pathEl: u };
}
function wT(n) {
  n.filterEl.remove(), n.pathEl.remove();
}
function CT(n) {
  const t = n.style.isolation;
  n.style.isolation = "isolate";
  const s = document.createElementNS(Yt, "svg");
  s.style.cssText = "position:absolute;inset:0;overflow:visible;pointer-events:none;z-index:-1", s.setAttribute("width", "100%"), s.setAttribute("height", "100%"), s.setAttribute("aria-hidden", "true");
  const l = document.createElementNS(Yt, "defs");
  s.appendChild(l), n.appendChild(s);
  const r = [];
  return {
    update(u, c, d, g) {
      const m = Array.isArray(c) ? c : [c];
      if (!(d > 0 && g > 0 && m.some((T) => T.opacity > 0))) {
        s.style.display = "none";
        return;
      }
      for (; r.length < m.length; ) r.push(ST(l, s));
      for (; r.length > m.length; ) wT(r.pop());
      const v = yx(u);
      let b = !1;
      for (let T = 0; T < m.length; T++) {
        const S = m[T], C = r[m.length - 1 - T];
        if (S.opacity <= 0) {
          C.pathEl.style.display = "none";
          continue;
        }
        const w = S.spread, M = d + w * 2, _ = g + w * 2;
        if (M <= 0 || _ <= 0) {
          C.pathEl.style.display = "none";
          continue;
        }
        b = !0, C.pathEl.style.display = "";
        const R = gx(S.color), D = vx(u, w);
        if (C.pathEl.setAttribute("d", v(M, _, D, w)), C.pathEl.setAttribute("transform", `translate(${S.offsetX - w},${S.offsetY - w})`), C.pathEl.setAttribute("fill", R), C.pathEl.setAttribute("fill-opacity", String(S.opacity)), S.blur > 0) {
          const L = bT(S.blur, w);
          xT(C.filterEl, M, _, L), C.feBlur.setAttribute("stdDeviation", String(S.blur)), C.pathEl.setAttribute("filter", `url(#${C.filterId})`);
        } else
          C.pathEl.removeAttribute("filter");
      }
      s.style.display = b ? "" : "none";
    },
    destroy() {
      s.remove(), n.style.isolation = t;
    }
  };
}
var zl = null, ka, Rl = /* @__PURE__ */ new Map(), Ql = /* @__PURE__ */ new Set();
function Sx() {
  ka = void 0;
  const n = [...Ql];
  Ql.clear();
  for (const t of n) {
    const s = Rl.get(t);
    if (s) for (const l of [...s]) l();
  }
}
function TT() {
  return zl || (zl = new ResizeObserver((n) => {
    for (const t of n)
      Ql.add(t.target);
    ka === void 0 && (ka = requestAnimationFrame(Sx));
  })), zl;
}
function jT(n, t) {
  if (typeof ResizeObserver > "u") return () => {
  };
  const s = TT();
  let l = Rl.get(n);
  return l || (l = /* @__PURE__ */ new Set(), Rl.set(n, l), s.observe(n)), l.add(t), Ql.add(n), ka === void 0 && (ka = requestAnimationFrame(Sx)), () => {
    l.delete(t), l.size === 0 && (Rl.delete(n), s.unobserve(n)), Rl.size === 0 && (ka !== void 0 && (cancelAnimationFrame(ka), ka = void 0), Ql.clear(), zl?.disconnect(), zl = null);
  };
}
function ET(n) {
  const t = window.getComputedStyle(n), s = (m) => m.endsWith("px") ? parseFloat(m) : NaN, l = s(t.width), r = s(t.height);
  if (Number.isNaN(l) || Number.isNaN(r))
    return { width: n.offsetWidth, height: n.offsetHeight };
  if (t.boxSizing === "border-box")
    return { width: l, height: r };
  const u = (parseFloat(t.paddingLeft) || 0) + (parseFloat(t.paddingRight) || 0), c = (parseFloat(t.paddingTop) || 0) + (parseFloat(t.paddingBottom) || 0), d = (parseFloat(t.borderLeftWidth) || 0) + (parseFloat(t.borderRightWidth) || 0), g = (parseFloat(t.borderTopWidth) || 0) + (parseFloat(t.borderBottomWidth) || 0);
  return { width: l + u + d, height: r + c + g };
}
function wx(n) {
  const t = n.match(
    /^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)(?:\s*[,/]\s*([\d.]+))?\s*\)$/
  );
  if (!t) return;
  const s = Number(t[1]), l = Number(t[2]), r = Number(t[3]), u = t[4] !== void 0 ? Number(t[4]) : 1;
  return { hex: "#" + (1 << 24 | s << 16 | l << 8 | r).toString(16).slice(1), opacity: u };
}
function AT(n) {
  const t = getComputedStyle(n), s = t.borderTopStyle;
  if (s === "none" || s === "hidden") return;
  const l = parseFloat(t.borderTopWidth);
  if (l <= 0 || isNaN(l)) return;
  const r = wx(t.borderTopColor);
  if (!r || r.opacity <= 0) return;
  const c = {
    solid: "solid",
    dashed: "dashed",
    dotted: "dotted",
    double: "double",
    groove: "groove",
    ridge: "ridge"
  }[s];
  return {
    width: l,
    color: r.hex,
    opacity: r.opacity,
    ...c && c !== "solid" ? { style: c } : {}
  };
}
function MT(n) {
  if (!n || n === "none") return {};
  const t = [];
  let s = 0, l = 0;
  for (let c = 0; c < n.length; c++)
    n[c] === "(" ? s++ : n[c] === ")" ? s-- : n[c] === "," && s === 0 && (t.push(n.slice(l, c).trim()), l = c + 1);
  t.push(n.slice(l).trim());
  const r = [], u = [];
  for (const c of t) {
    const d = c.includes("inset"), g = c.replace("inset", "").trim(), m = g.match(/rgba?\([^)]+\)/);
    if (!m) continue;
    const y = wx(m[0]);
    if (!y || y.opacity <= 0) continue;
    const b = g.replace(m[0], "").trim().split(/\s+/).map(parseFloat).filter((S) => !isNaN(S));
    if (b.length < 2) continue;
    const T = {
      offsetX: b[0],
      offsetY: b[1],
      blur: b[2] ?? 0,
      spread: b[3] ?? 0,
      color: y.hex,
      opacity: y.opacity
    };
    (d ? u : r).push(T);
  }
  return {
    shadow: r.length > 0 ? r : void 0,
    innerShadow: u.length > 0 ? u : void 0
  };
}
function lv(n) {
  const t = {
    border: n.style.border,
    boxShadow: n.style.boxShadow,
    paddingTop: n.style.paddingTop,
    paddingRight: n.style.paddingRight,
    paddingBottom: n.style.paddingBottom,
    paddingLeft: n.style.paddingLeft
  }, s = AT(n), l = getComputedStyle(n), { shadow: r, innerShadow: u } = MT(l.boxShadow), c = l.boxSizing, d = parseFloat(l.borderTopWidth) || 0, g = parseFloat(l.borderRightWidth) || 0, m = parseFloat(l.borderBottomWidth) || 0, y = parseFloat(l.borderLeftWidth) || 0, v = parseFloat(l.paddingTop) || 0, b = parseFloat(l.paddingRight) || 0, T = parseFloat(l.paddingBottom) || 0, S = parseFloat(l.paddingLeft) || 0;
  s && (n.style.border = "0"), (r || u) && (n.style.boxShadow = "none"), s && c === "content-box" && (d > 0 || g > 0 || m > 0 || y > 0) && (n.style.paddingTop = v + d + "px", n.style.paddingRight = b + g + "px", n.style.paddingBottom = T + m + "px", n.style.paddingLeft = S + y + "px");
  const C = {};
  return s && (C.innerBorder = s), r && (C.shadow = r), u && (C.innerShadow = u), { effects: C, savedStyles: t };
}
function cm(n) {
  return n ? !!(n.innerBorder || n.outerBorder || n.middleBorder || n.innerShadow || n.shadow) : !1;
}
function Cx(n, t) {
  return { ...n?.effects, ...t };
}
function ov(n, t) {
  n.style.border = t.border, n.style.boxShadow = t.boxShadow, n.style.paddingTop = t.paddingTop, n.style.paddingRight = t.paddingRight, n.style.paddingBottom = t.paddingBottom, n.style.paddingLeft = t.paddingLeft;
}
var vs = /* @__PURE__ */ new WeakMap();
function _T(n) {
  const t = vs.get(n) ?? 0;
  if (t > 0)
    return vs.set(n, t + 1), !0;
  const s = getComputedStyle(n).position;
  return s !== "static" && s !== "" ? !1 : (vs.set(n, 1), n.style.position = "relative", !0);
}
function DT(n) {
  const t = vs.get(n);
  t !== void 0 && (t <= 1 ? (vs.delete(n), n.style.position = "") : vs.set(n, t - 1));
}
var Dr = typeof window < "u" ? j.useLayoutEffect : j.useEffect;
function RT(n, t, s, l, r, u) {
  s.update(n, t, r, u), l?.update(n, t.shadow ?? dT, r, u);
}
function ud(n, t) {
  const s = Cx(n.extracted, t.effectsPropRef.current);
  cm(s) && Tx(n, s, t.wrapperRefRef.current, t.skipShadowHandleRef.current);
  const { width: l, height: r } = ET(n.el);
  if (l <= 0 || r <= 0) return;
  const u = t.syncKeyRef.current;
  l === n.lastWidth && r === n.lastHeight && u === n.lastSyncKey || (n.lastWidth = l, n.lastHeight = r, n.lastSyncKey = u, n.el.style.clipPath = uT(l, r, t.optionsRef.current), n.el.setAttribute("data-state", "ready"), n.effectsHandle && RT(t.optionsRef.current, s, n.effectsHandle, n.shadowHandle, l, r));
}
function Tx(n, t, s, l) {
  if (!n.anchor) {
    const r = s?.current ?? n.el.parentElement;
    if (!r) return;
    n.anchor = r, n.didAcquire = _T(r);
  }
  n.effectsHandle || (n.effectsHandle = vT(n.anchor)), !n.shadowHandle && t.shadow && !l && (n.shadowHandle = CT(n.anchor));
}
function jx(n, t, s) {
  const { wrapperRef: l, effects: r, autoEffects: u, skipShadowHandle: c, onExtractedShadow: d } = s ?? {}, g = j.useRef(t);
  g.current = t;
  const m = j.useRef(r);
  m.current = r;
  const y = j.useRef(l);
  y.current = l;
  const v = j.useRef(c ?? !1);
  v.current = c ?? !1;
  const b = j.useRef(d);
  b.current = d;
  const T = JSON.stringify(t), S = JSON.stringify(r ?? null), C = u ?? !0, w = c ?? !1, M = j.useRef("");
  M.current = `${T}|${S}`;
  const _ = j.useRef({
    optionsRef: g,
    effectsPropRef: m,
    wrapperRefRef: y,
    skipShadowHandleRef: v,
    onExtractedShadowRef: b,
    syncKeyRef: M
  }), R = j.useRef(null);
  Dr(() => {
    const D = n.current;
    if (!D) return;
    const L = D.style.clipPath;
    D.setAttribute("data-slot", "smooth-corners"), D.setAttribute("data-state", "pending");
    const $ = C ? lv(D) : void 0, E = {
      el: D,
      savedClipPath: L,
      extracted: $,
      effectsHandle: void 0,
      shadowHandle: void 0,
      anchor: null,
      didAcquire: !1,
      lastWidth: 0,
      lastHeight: 0,
      lastSyncKey: null
    };
    R.current = E;
    const z = Cx(E.extracted, m.current);
    cm(z) && Tx(E, z, y.current, v.current), b.current?.(E.extracted?.effects.shadow);
    const k = jT(D, () => ud(E, _.current));
    return () => {
      k(), E.effectsHandle?.destroy(), E.shadowHandle?.destroy(), E.extracted && ov(D, E.extracted.savedStyles), b.current?.(void 0), E.didAcquire && E.anchor && DT(E.anchor), R.current = null, D.style.clipPath = L, D.removeAttribute("data-slot"), D.removeAttribute("data-state");
    };
  }, [n]), Dr(() => {
    const D = R.current;
    D && ud(D, _.current);
  }), Dr(() => {
    if (!w) return;
    const D = R.current;
    !D || !D.shadowHandle || (D.shadowHandle.destroy(), D.shadowHandle = void 0, D.lastSyncKey = null);
  }, [w]), Dr(() => {
    const D = R.current;
    if (!D) return;
    const L = D.extracted !== void 0;
    if (C && !L)
      D.extracted = lv(D.el);
    else if (!C && L)
      ov(D.el, D.extracted.savedStyles), D.extracted = void 0;
    else
      return;
    b.current?.(D.extracted?.effects.shadow), D.lastSyncKey = null, ud(D, _.current);
  }, [C]);
}
function Ex(...n) {
  return (t) => {
    for (const s of n)
      s && (typeof s == "function" ? s(t) : s.current = t);
  };
}
function NT(n, t) {
  const s = { ...n };
  for (const l of Object.keys(t)) {
    const r = t[l], u = s[l];
    /^on[A-Z]/.test(l) && typeof r == "function" ? typeof u == "function" ? s[l] = (...c) => {
      r(...c);
      const d = c[0];
      d && d.defaultPrevented || u(...c);
    } : s[l] = r : l === "className" ? s[l] = [u, r].filter(Boolean).join(" ") : l === "style" ? s[l] = { ...u, ...r } : s[l] = r;
  }
  return s;
}
function OT(n, t) {
  const { children: s, ...l } = n, r = j.Children.toArray(s);
  if (r.length === 0)
    throw new Error("Slot: `asChild` expects a single child element, received none.");
  if (r.length > 1)
    throw new Error(
      "Slot: `asChild` expects a single child element, received " + r.length + "."
    );
  const u = r[0];
  if (!j.isValidElement(u))
    throw new Error(
      "Slot: `asChild` expects a React element as its child (e.g. <button>), not a " + (typeof u == "string" ? "string." : typeof u + ".")
    );
  if (u.type === j.Fragment)
    throw new Error(
      "Slot: `asChild` expects a single element as its child, not a Fragment. Unwrap the Fragment so Slot can merge props onto a real element."
    );
  const c = u, d = c.props ?? {}, g = d.ref ?? c.ref, m = NT(l, d);
  return j.cloneElement(c, {
    ...m,
    ref: Ex(t, g)
  });
}
var LT = j.forwardRef(OT);
function $T(n) {
  const t = Array.isArray(n) ? n : [n], s = [];
  for (const l of t) {
    if (l.opacity <= 0) continue;
    const { offsetX: r, offsetY: u, blur: c, spread: d, color: g, opacity: m } = l, y = BT(g);
    s.push(
      `${r}px ${u}px ${c}px ${d}px rgba(${y.r},${y.g},${y.b},${m})`
    );
  }
  return s.join(", ");
}
function BT(n) {
  const t = n.replace("#", ""), s = t.length === 3 ? t[0] + t[0] + t[1] + t[1] + t[2] + t[2] : t;
  return {
    r: parseInt(s.substring(0, 2), 16),
    g: parseInt(s.substring(2, 4), 16),
    b: parseInt(s.substring(4, 6), 16)
  };
}
function zT(n) {
  if ("radius" in n) return `${n.radius}px`;
  const t = (c) => c === void 0 ? 0 : typeof c == "number" ? c : c.radius, s = t(n.topLeft), l = t(n.topRight), r = t(n.bottomRight), u = t(n.bottomLeft);
  return `${s}px ${l}px ${r}px ${u}px`;
}
function VT(n, t) {
  const {
    as: s,
    asChild: l,
    children: r,
    corners: u,
    innerBorder: c,
    outerBorder: d,
    middleBorder: g,
    innerShadow: m,
    shadow: y,
    autoEffects: v,
    shadowStrategy: b,
    ...T
  } = n, S = s ?? "div", C = j.useRef(null), w = j.useRef(null), M = j.useMemo(
    () => Ex(C, t),
    [t]
  ), _ = u ?? { radius: 0 }, R = b === "box-shadow", D = R ? void 0 : y, [L, $] = j.useState(void 0), E = j.useCallback(
    (W) => $(W),
    []
  ), z = {
    innerBorder: c,
    outerBorder: d,
    middleBorder: g,
    innerShadow: m,
    shadow: D
  }, k = cm(z), Y = R ? y ?? L : void 0, et = (v ?? !0) || k || Y !== void 0;
  jx(C, _, {
    wrapperRef: et ? w : void 0,
    effects: k ? z : void 0,
    autoEffects: v,
    skipShadowHandle: R,
    onExtractedShadow: R ? E : void 0
  });
  const J = l ? j.createElement(LT, { ...T, ref: M }, r) : j.createElement(S, { ...T, ref: M }, r);
  if (!et) return J;
  let Q = null;
  if (R && Y !== void 0) {
    const W = $T(Y);
    if (W !== "") {
      const O = {
        position: "absolute",
        inset: 0,
        borderRadius: zT(_),
        boxShadow: W,
        pointerEvents: "none",
        zIndex: -1
      };
      Q = j.createElement("div", {
        "aria-hidden": !0,
        "data-slot": "smooth-corners-box-shadow",
        style: O
      });
    }
  }
  return j.createElement(
    "div",
    {
      ref: w,
      style: {
        position: "relative",
        // `isolation: isolate` keeps the z-index:-1 sibling from sinking
        // behind ancestors — same trick the SVG path uses.
        ...Q ? { isolation: "isolate" } : {}
      }
    },
    Q,
    J
  );
}
j.forwardRef(VT);
function rv(n, t) {
  if (typeof n == "function")
    return n(t);
  n != null && (n.current = t);
}
function kT(...n) {
  return (t) => {
    let s = !1;
    const l = n.map((r) => {
      const u = rv(r, t);
      return !s && typeof u == "function" && (s = !0), u;
    });
    if (s)
      return () => {
        for (let r = 0; r < l.length; r++) {
          const u = l[r];
          typeof u == "function" ? u() : rv(n[r], null);
        }
      };
  };
}
function UT(...n) {
  return j.useCallback(kT(...n), n);
}
class HT extends j.Component {
  getSnapshotBeforeUpdate(t) {
    const s = this.props.childRef.current;
    if (Yr(s) && t.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const l = s.offsetParent, r = Yr(l) && l.offsetWidth || 0, u = Yr(l) && l.offsetHeight || 0, c = getComputedStyle(s), d = this.props.sizeRef.current;
      d.height = parseFloat(c.height), d.width = parseFloat(c.width), d.top = s.offsetTop, d.left = s.offsetLeft, d.right = r - d.width - d.left, d.bottom = u - d.height - d.top, d.direction = c.direction;
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
function qT({ children: n, isPresent: t, anchorX: s, anchorY: l, root: r, pop: u }) {
  const c = j.useId(), d = j.useRef(null), g = j.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    direction: "ltr"
  }), { nonce: m } = j.useContext(ws), y = n.props?.ref ?? n?.ref, v = UT(d, y);
  return j.useInsertionEffect(() => {
    const { width: b, height: T, top: S, left: C, right: w, bottom: M, direction: _ } = g.current;
    if (t || u === !1 || !d.current || !b || !T)
      return;
    const R = _ === "rtl", D = s === "left" ? R ? `right: ${w}` : `left: ${C}` : R ? `left: ${C}` : `right: ${w}`, L = l === "bottom" ? `bottom: ${M}` : `top: ${S}`;
    d.current.dataset.motionPopId = c;
    const $ = document.createElement("style");
    m && ($.nonce = m);
    const E = r ?? document.head;
    return E.appendChild($), $.sheet && $.sheet.insertRule(`
          [data-motion-pop-id="${c}"] {
            position: absolute !important;
            width: ${b}px !important;
            height: ${T}px !important;
            ${D}px !important;
            ${L}px !important;
          }
        `), () => {
      d.current?.removeAttribute("data-motion-pop-id"), E.contains($) && E.removeChild($);
    };
  }, [t]), p.jsx(HT, { isPresent: t, childRef: d, sizeRef: g, pop: u, children: u === !1 ? n : j.cloneElement(n, { ref: v }) });
}
const YT = ({ children: n, initial: t, isPresent: s, onExitComplete: l, custom: r, presenceAffectsLayout: u, mode: c, anchorX: d, anchorY: g, root: m }) => {
  const y = Ti(GT), v = j.useId(), b = j.useRef(s), T = j.useRef(l);
  bc(() => {
    b.current = s, T.current = l;
  });
  let S = !0, C = j.useMemo(() => (S = !1, {
    id: v,
    initial: t,
    isPresent: s,
    custom: r,
    onExitComplete: (w) => {
      y.set(w, !0);
      for (const M of y.values())
        if (!M)
          return;
      l && l();
    },
    register: (w) => (y.set(w, !1), () => {
      y.delete(w), !b.current && !y.size && T.current?.();
    })
  }), [s, y, l]);
  return u && S && (C = { ...C }), j.useMemo(() => {
    y.forEach((w, M) => y.set(M, !1));
  }, [s]), j.useEffect(() => {
    !s && !y.size && l && l();
  }, [s]), n = p.jsx(qT, { pop: c === "popLayout", isPresent: s, anchorX: d, anchorY: g, root: m, children: n }), p.jsx(no.Provider, { value: C, children: n });
};
function GT() {
  return /* @__PURE__ */ new Map();
}
function Ax(n = !0) {
  const t = j.useContext(no);
  if (t === null)
    return [!0, null];
  const { isPresent: s, onExitComplete: l, register: r } = t, u = j.useId();
  j.useEffect(() => {
    if (n)
      return r(u);
  }, [n]);
  const c = j.useCallback(() => n && l && l(u), [u, l, n]);
  return !s && l ? [!1, c] : [!0];
}
function PT() {
  return XT(j.useContext(no));
}
function XT(n) {
  return n === null ? !0 : n.isPresent;
}
const Rr = (n) => n.key || "";
function cv(n) {
  const t = [];
  return j.Children.forEach(n, (s) => {
    j.isValidElement(s) && t.push(s);
  }), t;
}
const Ts = ({ children: n, custom: t, initial: s = !0, onExitComplete: l, presenceAffectsLayout: r = !0, mode: u = "sync", propagate: c = !1, anchorX: d = "left", anchorY: g = "top", root: m }) => {
  const [y, v] = Ax(c), b = j.useMemo(() => cv(n), [n]), T = c && !y ? [] : b.map(Rr), S = j.useRef(!0), C = j.useRef(b), w = Ti(() => /* @__PURE__ */ new Map()), M = j.useRef(/* @__PURE__ */ new Set()), [_, R] = j.useState(b), [D, L] = j.useState(b);
  bc(() => {
    S.current = !1, C.current = b;
    for (let z = 0; z < D.length; z++) {
      const k = Rr(D[z]);
      T.includes(k) ? (w.delete(k), M.current.delete(k)) : w.get(k) !== !0 && w.set(k, !1);
    }
  }, [D, T.length, T.join("-")]);
  const $ = [];
  if (b !== _) {
    let z = [...b];
    for (let k = 0; k < D.length; k++) {
      const Y = D[k], et = Rr(Y);
      T.includes(et) || (z.splice(k, 0, Y), $.push(Y));
    }
    return u === "wait" && $.length && (z = $), L(cv(z)), R(b), null;
  }
  const { forceRender: E } = j.useContext(Oh);
  return p.jsx(p.Fragment, { children: D.map((z) => {
    const k = Rr(z), Y = c && !y ? !1 : b === D || T.includes(k), et = () => {
      if (M.current.has(k))
        return;
      if (w.has(k))
        M.current.add(k), w.set(k, !0);
      else
        return;
      let nt = !0;
      w.forEach((J) => {
        J || (nt = !1);
      }), nt && (E?.(), L(C.current), c && v?.(), l && l());
    };
    return p.jsx(YT, { isPresent: Y, initial: !S.current || s ? void 0 : !1, custom: t, presenceAffectsLayout: r, mode: u, root: m, onExitComplete: Y ? void 0 : et, anchorX: d, anchorY: g, children: z }, k);
  }) });
};
function KT({ children: n, features: t, strict: s = !1 }) {
  const [, l] = j.useState(!fd(t)), r = j.useRef(void 0);
  if (!fd(t)) {
    const { renderer: u, ...c } = t;
    r.current = u, nh(c);
  }
  return j.useEffect(() => {
    fd(t) && t().then(({ renderer: u, ...c }) => {
      nh(c), r.current = u, l(!0);
    });
  }, []), p.jsx(Lh.Provider, { value: { renderer: r.current, strict: s }, children: n });
}
function fd(n) {
  return typeof n == "function";
}
function um({ children: n, isValidProp: t, ...s }) {
  t && rx(t);
  const l = j.useContext(ws);
  s = { ...l, ...s }, s.transition = Yh(s.transition, l.transition), s.isStatic = Ti(() => s.isStatic);
  const r = j.useMemo(() => s, [
    JSON.stringify(s.transition),
    s.transformPagePoint,
    s.reducedMotion,
    s.skipAnimations
  ]);
  return p.jsx(ws.Provider, { value: r, children: n });
}
function QT(n, t) {
  if (typeof Proxy > "u")
    return Jr;
  const s = /* @__PURE__ */ new Map(), l = (u, c) => Jr(u, c, n, t), r = (u, c) => l(u, c);
  return new Proxy(r, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (u, c) => c === "create" ? l : (s.has(c) || s.set(c, Jr(c, void 0, n, t)), s.get(c))
  });
}
const Mx = (n, t) => t.isSVG ?? sm(n) ? new Xb(t) : new Hb(t, {
  allowProjection: n !== j.Fragment
});
class ZT extends Ya {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(t) {
    super(t), t.animationState || (t.animationState = T6(t));
  }
  updateAnimationControlsSubscription() {
    const { animate: t } = this.node.getProps();
    yc(t) && (this.unmountControls = t.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: t } = this.node.getProps(), { animate: s } = this.node.prevProps || {};
    t !== s && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let FT = 0;
class JT extends Ya {
  constructor() {
    super(...arguments), this.id = FT++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: t, onExitComplete: s } = this.node.presenceContext, { isPresent: l } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || t === l)
      return;
    if (t && l === !1) {
      if (this.isExitComplete) {
        const { initial: u, custom: c } = this.node.getProps();
        if (typeof u == "string" || typeof u == "object" && u !== null && !Array.isArray(u)) {
          const d = xi(this.node, u, c);
          if (d) {
            const { transition: g, transitionEnd: m, ...y } = d;
            for (const v in y)
              this.node.getValue(v)?.jump(y[v]);
          }
        }
        this.node.animationState.reset(), this.node.animationState.animateChanges();
      } else
        this.node.animationState.setActive("exit", !1);
      this.isExitComplete = !1;
      return;
    }
    const r = this.node.animationState.setActive("exit", !t);
    s && !t && r.then(() => {
      this.isExitComplete = !0, s(this.id);
    });
  }
  mount() {
    const { register: t, onExitComplete: s } = this.node.presenceContext || {};
    s && s(this.id), t && (this.unmount = t(this.id));
  }
  unmount() {
  }
}
const _x = {
  animation: {
    Feature: ZT
  },
  exit: {
    Feature: JT
  }
};
function ao(n) {
  return {
    point: {
      x: n.pageX,
      y: n.pageY
    }
  };
}
const WT = (n) => (t) => Wh(t) && n(t, ao(t));
function Vl(n, t, s, l) {
  return Xl(n, t, WT(s), l);
}
const Dx = ({ current: n }) => n ? n.ownerDocument.defaultView : null, uv = (n, t) => Math.abs(n - t);
function IT(n, t) {
  const s = uv(n.x, t.x), l = uv(n.y, t.y);
  return Math.sqrt(s ** 2 + l ** 2);
}
const fv = /* @__PURE__ */ new Set(["auto", "scroll"]);
class Rx {
  constructor(t, s, { transformPagePoint: l, contextWindow: r = window, dragSnapToOrigin: u = !1, distanceThreshold: c = 3, element: d } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (S) => {
      this.handleScroll(S.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = Nr(this.lastRawMoveEventInfo, this.transformPagePoint));
      const S = dd(this.lastMoveEventInfo, this.history), C = this.startEvent !== null, w = IT(S.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!C && !w)
        return;
      const { point: M } = S, { timestamp: _ } = _e;
      this.history.push({ ...M, timestamp: _ });
      const { onStart: R, onMove: D } = this.handlers;
      C || (R && R(this.lastMoveEvent, S), this.startEvent = this.lastMoveEvent), D && D(this.lastMoveEvent, S);
    }, this.handlePointerMove = (S, C) => {
      this.lastMoveEvent = S, this.lastRawMoveEventInfo = C, this.lastMoveEventInfo = Nr(C, this.transformPagePoint), Xt.update(this.updatePoint, !0);
    }, this.handlePointerUp = (S, C) => {
      this.end();
      const { onEnd: w, onSessionEnd: M, resumeAnimation: _ } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && _ && _(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const R = dd(S.type === "pointercancel" ? this.lastMoveEventInfo : Nr(C, this.transformPagePoint), this.history);
      this.startEvent && w && w(S, R), M && M(S, R);
    }, !Wh(t))
      return;
    this.dragSnapToOrigin = u, this.handlers = s, this.transformPagePoint = l, this.distanceThreshold = c, this.contextWindow = r || window;
    const g = ao(t), m = Nr(g, this.transformPagePoint), { point: y } = m, { timestamp: v } = _e;
    this.history = [{ ...y, timestamp: v }];
    const { onSessionStart: b } = s;
    b && b(t, dd(m, this.history));
    const T = { passive: !0, capture: !0 };
    this.removeListeners = Il(Vl(this.contextWindow, "pointermove", this.handlePointerMove, T), Vl(this.contextWindow, "pointerup", this.handlePointerUp, T), Vl(this.contextWindow, "pointercancel", this.handlePointerUp, T)), d && this.startScrollTracking(d);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(t) {
    let s = t.parentElement;
    for (; s; ) {
      const l = getComputedStyle(s);
      (fv.has(l.overflowX) || fv.has(l.overflowY)) && this.scrollPositions.set(s, {
        x: s.scrollLeft,
        y: s.scrollTop
      }), s = s.parentElement;
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
  handleScroll(t) {
    const s = this.scrollPositions.get(t);
    if (!s)
      return;
    const l = t === window, r = l ? { x: window.scrollX, y: window.scrollY } : {
      x: t.scrollLeft,
      y: t.scrollTop
    }, u = { x: r.x - s.x, y: r.y - s.y };
    u.x === 0 && u.y === 0 || (l ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += u.x, this.lastMoveEventInfo.point.y += u.y) : this.history.length > 0 && (this.history[0].x -= u.x, this.history[0].y -= u.y), this.scrollPositions.set(t, r), Xt.update(this.updatePoint, !0));
  }
  updateHandlers(t) {
    this.handlers = t;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), ua(this.updatePoint);
  }
}
function Nr(n, t) {
  return t ? { point: t(n.point) } : n;
}
function dv(n, t) {
  return { x: n.x - t.x, y: n.y - t.y };
}
function dd({ point: n }, t) {
  return {
    point: n,
    delta: dv(n, Nx(t)),
    offset: dv(n, t8(t)),
    velocity: e8(t, 0.1)
  };
}
function t8(n) {
  return n[0];
}
function Nx(n) {
  return n[n.length - 1];
}
function e8(n, t) {
  if (n.length < 2)
    return { x: 0, y: 0 };
  let s = n.length - 1, l = null;
  const r = Nx(n);
  for (; s >= 0 && (l = n[s], !(r.timestamp - l.timestamp > /* @__PURE__ */ Pe(t))); )
    s--;
  if (!l)
    return { x: 0, y: 0 };
  l === n[0] && n.length > 2 && r.timestamp - l.timestamp > /* @__PURE__ */ Pe(t) * 2 && (l = n[1]);
  const u = /* @__PURE__ */ yn(r.timestamp - l.timestamp);
  if (u === 0)
    return { x: 0, y: 0 };
  const c = {
    x: (r.x - l.x) / u,
    y: (r.y - l.y) / u
  };
  return c.x === 1 / 0 && (c.x = 0), c.y === 1 / 0 && (c.y = 0), c;
}
function n8(n, { min: t, max: s }, l) {
  return t !== void 0 && n < t ? n = l ? Pt(t, n, l.min) : Math.max(n, t) : s !== void 0 && n > s && (n = l ? Pt(s, n, l.max) : Math.min(n, s)), n;
}
function hv(n, t, s) {
  return {
    min: t !== void 0 ? n.min + t : void 0,
    max: s !== void 0 ? n.max + s - (n.max - n.min) : void 0
  };
}
function a8(n, { top: t, left: s, bottom: l, right: r }) {
  return {
    x: hv(n.x, s, r),
    y: hv(n.y, t, l)
  };
}
function mv(n, t) {
  let s = t.min - n.min, l = t.max - n.max;
  return t.max - t.min < n.max - n.min && ([s, l] = [l, s]), { min: s, max: l };
}
function i8(n, t) {
  return {
    x: mv(n.x, t.x),
    y: mv(n.y, t.y)
  };
}
function s8(n, t) {
  let s = 0.5;
  const l = $e(n), r = $e(t);
  return r > l ? s = /* @__PURE__ */ Ss(t.min, t.max - l, n.min) : l > r && (s = /* @__PURE__ */ Ss(n.min, n.max - r, t.min)), Un(0, 1, s);
}
function l8(n, t) {
  const s = {};
  return t.min !== void 0 && (s.min = t.min - n.min), t.max !== void 0 && (s.max = t.max - n.min), s;
}
const oh = 0.35;
function o8(n = oh) {
  return n === !1 ? n = 0 : n === !0 && (n = oh), {
    x: pv(n, "left", "right"),
    y: pv(n, "top", "bottom")
  };
}
function pv(n, t, s) {
  return {
    min: gv(n, t),
    max: gv(n, s)
  };
}
function gv(n, t) {
  return typeof n == "number" ? n : n[t] || 0;
}
const r8 = /* @__PURE__ */ new WeakMap();
class c8 {
  constructor(t) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = de(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = t;
  }
  start(t, { snapToCursor: s = !1, distanceThreshold: l } = {}) {
    const { presenceContext: r } = this.visualElement;
    if (r && r.isPresent === !1)
      return;
    const u = (v) => {
      s && this.snapToCursor(ao(v).point), this.stopAnimation();
    }, c = (v, b) => {
      const { drag: T, dragPropagation: S, onDragStart: C } = this.getProps();
      if (T && !S && (this.openDragLock && this.openDragLock(), this.openDragLock = $9(T), !this.openDragLock))
        return;
      this.latestPointerEvent = v, this.latestPanInfo = b, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), Bn((M) => {
        let _ = this.getAxisMotionValue(M).get() || 0;
        if (kn.test(_)) {
          const { projection: R } = this.visualElement;
          if (R && R.layout) {
            const D = R.layout.layoutBox[M];
            D && (_ = $e(D) * (parseFloat(_) / 100));
          }
        }
        this.originPoint[M] = _;
      }), C && Xt.update(() => C(v, b), !1, !0), Kd(this.visualElement, "transform");
      const { animationState: w } = this.visualElement;
      w && w.setActive("whileDrag", !0);
    }, d = (v, b) => {
      this.latestPointerEvent = v, this.latestPanInfo = b;
      const { dragPropagation: T, dragDirectionLock: S, onDirectionLock: C, onDrag: w } = this.getProps();
      if (!T && !this.openDragLock)
        return;
      const { offset: M } = b;
      if (S && this.currentDirection === null) {
        this.currentDirection = f8(M), this.currentDirection !== null && C && C(this.currentDirection);
        return;
      }
      this.updateAxis("x", b.point, M), this.updateAxis("y", b.point, M), this.visualElement.render(), w && Xt.update(() => w(v, b), !1, !0);
    }, g = (v, b) => {
      this.latestPointerEvent = v, this.latestPanInfo = b, this.stop(v, b), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, m = () => {
      const { dragSnapToOrigin: v } = this.getProps();
      (v || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: y } = this.getProps();
    this.panSession = new Rx(t, {
      onSessionStart: u,
      onStart: c,
      onMove: d,
      onSessionEnd: g,
      resumeAnimation: m
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: y,
      distanceThreshold: l,
      contextWindow: Dx(this.visualElement),
      element: this.visualElement.current
    });
  }
  /**
   * @internal
   */
  stop(t, s) {
    const l = t || this.latestPointerEvent, r = s || this.latestPanInfo, u = this.isDragging;
    if (this.cancel(), !u || !r || !l)
      return;
    const { velocity: c } = r;
    this.startAnimation(c);
    const { onDragEnd: d } = this.getProps();
    d && Xt.postRender(() => d(l, r));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: t, animationState: s } = this.visualElement;
    t && (t.isAnimationBlocked = !1), this.endPanSession();
    const { dragPropagation: l } = this.getProps();
    !l && this.openDragLock && (this.openDragLock(), this.openDragLock = null), s && s.setActive("whileDrag", !1);
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
  updateAxis(t, s, l) {
    const { drag: r } = this.getProps();
    if (!l || !Or(t, r, this.currentDirection))
      return;
    const u = this.getAxisMotionValue(t);
    let c = this.originPoint[t] + l[t];
    this.constraints && this.constraints[t] && (c = n8(c, this.constraints[t], this.elastic[t])), u.set(c);
  }
  resolveConstraints() {
    const { dragConstraints: t, dragElastic: s } = this.getProps(), l = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, r = this.constraints;
    t && ds(t) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : t && l ? this.constraints = a8(l.layoutBox, t) : this.constraints = !1, this.elastic = o8(s), r !== this.constraints && !ds(t) && l && this.constraints && !this.hasMutatedConstraints && Bn((u) => {
      this.constraints !== !1 && this.getAxisMotionValue(u) && (this.constraints[u] = l8(l.layoutBox[u], this.constraints[u]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: t, onMeasureDragConstraints: s } = this.getProps();
    if (!t || !ds(t))
      return !1;
    const l = t.current, { projection: r } = this.visualElement;
    if (!r || !r.layout)
      return !1;
    r.root && (r.root.scroll = void 0, r.root.updateScroll());
    const u = o6(l, r.root, this.visualElement.getTransformPagePoint());
    let c = i8(r.layout.layoutBox, u);
    if (s) {
      const d = s(i6(c));
      this.hasMutatedConstraints = !!d, d && (c = $b(d));
    }
    return c;
  }
  startAnimation(t) {
    const { drag: s, dragMomentum: l, dragElastic: r, dragTransition: u, dragSnapToOrigin: c, onDragTransitionEnd: d } = this.getProps(), g = this.constraints || {}, m = Bn((y) => {
      if (!Or(y, s, this.currentDirection))
        return;
      let v = g && g[y] || {};
      (c === !0 || c === y) && (v = { min: 0, max: 0 });
      const b = r ? 200 : 1e6, T = r ? 40 : 1e7, S = {
        type: "inertia",
        velocity: l ? t[y] : 0,
        bounceStiffness: b,
        bounceDamping: T,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...u,
        ...v
      };
      return this.startAxisValueAnimation(y, S);
    });
    return Promise.all(m).then(d);
  }
  startAxisValueAnimation(t, s) {
    const l = this.getAxisMotionValue(t);
    return Kd(this.visualElement, t), l.start(Ph(t, l, 0, s, this.visualElement, !1));
  }
  stopAnimation() {
    Bn((t) => this.getAxisMotionValue(t).stop());
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(t) {
    const s = `_drag${t.toUpperCase()}`, r = this.visualElement.getProps()[s];
    return r || this.visualElement.getValue(t, this.visualElement.latestValues[t] ?? 0);
  }
  snapToCursor(t) {
    Bn((s) => {
      const { drag: l } = this.getProps();
      if (!Or(s, l, this.currentDirection))
        return;
      const { projection: r } = this.visualElement, u = this.getAxisMotionValue(s);
      if (r && r.layout) {
        const { min: c, max: d } = r.layout.layoutBox[s], g = u.get() || 0;
        u.set(t[s] - Pt(c, d, 0.5) + g);
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
    const { drag: t, dragConstraints: s } = this.getProps(), { projection: l } = this.visualElement;
    if (!ds(s) || !l || !this.constraints)
      return;
    this.stopAnimation();
    const r = { x: 0, y: 0 };
    Bn((c) => {
      const d = this.getAxisMotionValue(c);
      if (d && this.constraints !== !1) {
        const g = d.get();
        r[c] = s8({ min: g, max: g }, this.constraints[c]);
      }
    });
    const { transformTemplate: u } = this.visualElement.getProps();
    this.visualElement.current.style.transform = u ? u({}, "") : "none", l.root && l.root.updateScroll(), l.updateLayout(), this.constraints = !1, this.resolveConstraints(), Bn((c) => {
      if (!Or(c, t, null))
        return;
      const d = this.getAxisMotionValue(c), { min: g, max: m } = this.constraints[c];
      d.set(Pt(g, m, r[c]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    r8.set(this.visualElement, this);
    const t = this.visualElement.current, s = Vl(t, "pointerdown", (m) => {
      const { drag: y, dragListener: v = !0 } = this.getProps(), b = m.target, T = b !== t && H9(b);
      y && v && !T && this.start(m);
    });
    let l;
    const r = () => {
      const { dragConstraints: m } = this.getProps();
      ds(m) && m.current && (this.constraints = this.resolveRefConstraints(), l || (l = u8(t, m.current, () => this.scalePositionWithinConstraints())));
    }, { projection: u } = this.visualElement, c = u.addEventListener("measure", r);
    u && !u.layout && (u.root && u.root.updateScroll(), u.updateLayout()), Xt.read(r);
    const d = Xl(window, "resize", () => this.scalePositionWithinConstraints()), g = u.addEventListener("didUpdate", (({ delta: m, hasLayoutChanged: y }) => {
      this.isDragging && y && (Bn((v) => {
        const b = this.getAxisMotionValue(v);
        b && (this.originPoint[v] += m[v].translate, b.set(b.get() + m[v].translate));
      }), this.visualElement.render());
    }));
    return () => {
      d(), s(), c(), g && g(), l && l();
    };
  }
  getProps() {
    const t = this.visualElement.getProps(), { drag: s = !1, dragDirectionLock: l = !1, dragPropagation: r = !1, dragConstraints: u = !1, dragElastic: c = oh, dragMomentum: d = !0 } = t;
    return {
      ...t,
      drag: s,
      dragDirectionLock: l,
      dragPropagation: r,
      dragConstraints: u,
      dragElastic: c,
      dragMomentum: d
    };
  }
}
function yv(n) {
  let t = !0;
  return () => {
    if (t) {
      t = !1;
      return;
    }
    n();
  };
}
function u8(n, t, s) {
  const l = vy(n, yv(s)), r = vy(t, yv(s));
  return () => {
    l(), r();
  };
}
function Or(n, t, s) {
  return (t === !0 || t === n) && (s === null || s === n);
}
function f8(n, t = 10) {
  let s = null;
  return Math.abs(n.y) > t ? s = "y" : Math.abs(n.x) > t && (s = "x"), s;
}
class d8 extends Ya {
  constructor(t) {
    super(t), this.removeGroupControls = vn, this.removeListeners = vn, this.controls = new c8(t);
  }
  mount() {
    const { dragControls: t } = this.node.getProps();
    t && (this.removeGroupControls = t.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || vn;
  }
  update() {
    const { dragControls: t } = this.node.getProps(), { dragControls: s } = this.node.prevProps || {};
    t !== s && (this.removeGroupControls(), t && (this.removeGroupControls = t.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const hd = (n) => (t, s) => {
  n && Xt.update(() => n(t, s), !1, !0);
};
class h8 extends Ya {
  constructor() {
    super(...arguments), this.removePointerDownListener = vn;
  }
  onPointerDown(t) {
    this.session = new Rx(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: Dx(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: t, onPanStart: s, onPan: l, onPanEnd: r } = this.node.getProps();
    return {
      onSessionStart: hd(t),
      onStart: hd(s),
      onMove: hd(l),
      onEnd: (u, c) => {
        delete this.session, r && Xt.postRender(() => r(u, c));
      }
    };
  }
  mount() {
    this.removePointerDownListener = Vl(this.node.current, "pointerdown", (t) => this.onPointerDown(t));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let md = !1;
class m8 extends j.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: t, layoutGroup: s, switchLayoutGroup: l, layoutId: r } = this.props, { projection: u } = t;
    u && (s.group && s.group.add(u), l && l.register && r && l.register(u), md && u.root.didUpdate(), u.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), u.setOptions({
      ...u.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), Fr.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(t) {
    const { layoutDependency: s, visualElement: l, drag: r, isPresent: u } = this.props, { projection: c } = l;
    return c && (c.isPresent = u, t.layoutDependency !== s && c.setOptions({
      ...c.options,
      layoutDependency: s
    }), md = !0, r || t.layoutDependency !== s || s === void 0 || t.isPresent !== u ? c.willUpdate() : this.safeToRemove(), t.isPresent !== u && (u ? c.promote() : c.relegate() || Xt.postRender(() => {
      const d = c.getStack();
      (!d || !d.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: t, layoutAnchor: s } = this.props, { projection: l } = t;
    l && (l.options.layoutAnchor = s, l.root.didUpdate(), Jh.postRender(() => {
      !l.currentAnimation && l.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: t, layoutGroup: s, switchLayoutGroup: l } = this.props, { projection: r } = t;
    md = !0, r && (r.scheduleCheckAfterUnmount(), s && s.group && s.group.remove(r), l && l.deregister && l.deregister(r));
  }
  safeToRemove() {
    const { safeToRemove: t } = this.props;
    t && t();
  }
  render() {
    return null;
  }
}
function Ox(n) {
  const [t, s] = Ax(), l = j.useContext(Oh);
  return p.jsx(m8, { ...n, layoutGroup: l, switchLayoutGroup: j.useContext(fx), isPresent: t, safeToRemove: s });
}
const Lx = {
  pan: {
    Feature: h8
  },
  drag: {
    Feature: d8,
    ProjectionNode: ix,
    MeasureLayout: Ox
  }
};
function vv(n, t, s) {
  const { props: l } = n;
  n.animationState && l.whileHover && n.animationState.setActive("whileHover", s === "Start");
  const r = "onHover" + s, u = l[r];
  u && Xt.postRender(() => u(t, ao(t)));
}
class p8 extends Ya {
  mount() {
    const { current: t } = this.node;
    t && (this.unmount = z9(t, (s, l) => (vv(this.node, l, "Start"), (r) => vv(this.node, r, "End"))));
  }
  unmount() {
  }
}
class g8 extends Ya {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let t = !1;
    try {
      t = this.node.current.matches(":focus-visible");
    } catch {
      t = !0;
    }
    !t || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = Il(Xl(this.node.current, "focus", () => this.onFocus()), Xl(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function bv(n, t, s) {
  const { props: l } = n;
  if (n.current instanceof HTMLButtonElement && n.current.disabled)
    return;
  n.animationState && l.whileTap && n.animationState.setActive("whileTap", s === "Start");
  const r = "onTap" + (s === "End" ? "" : s), u = l[r];
  u && Xt.postRender(() => u(t, ao(t)));
}
class y8 extends Ya {
  mount() {
    const { current: t } = this.node;
    if (!t)
      return;
    const { globalTapTarget: s, propagate: l } = this.node.props;
    this.unmount = Y9(t, (r, u) => (bv(this.node, u, "Start"), (c, { success: d }) => bv(this.node, c, d ? "End" : "Cancel")), {
      useGlobalTarget: s,
      stopPropagation: l?.tap === !1
    });
  }
  unmount() {
  }
}
const rh = /* @__PURE__ */ new WeakMap(), pd = /* @__PURE__ */ new WeakMap(), v8 = (n) => {
  const t = rh.get(n.target);
  t && t(n);
}, b8 = (n) => {
  n.forEach(v8);
};
function x8({ root: n, ...t }) {
  const s = n || document;
  pd.has(s) || pd.set(s, {});
  const l = pd.get(s), r = JSON.stringify(t);
  return l[r] || (l[r] = new IntersectionObserver(b8, { root: n, ...t })), l[r];
}
function S8(n, t, s) {
  const l = x8(t);
  return rh.set(n, s), l.observe(n), () => {
    rh.delete(n), l.unobserve(n);
  };
}
const w8 = {
  some: 0,
  all: 1
};
class C8 extends Ya {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: t = {} } = this.node.getProps(), { root: s, margin: l, amount: r = "some", once: u } = t, c = {
      root: s ? s.current : void 0,
      rootMargin: l,
      threshold: typeof r == "number" ? r : w8[r]
    }, d = (g) => {
      const { isIntersecting: m } = g;
      if (this.isInView === m || (this.isInView = m, u && !m && this.hasEnteredView))
        return;
      m && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", m);
      const { onViewportEnter: y, onViewportLeave: v } = this.node.getProps(), b = m ? y : v;
      b && b(g);
    };
    this.stopObserver = S8(this.node.current, c, d);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: t, prevProps: s } = this.node;
    ["amount", "margin", "root"].some(T8(t, s)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function T8({ viewport: n = {} }, { viewport: t = {} } = {}) {
  return (s) => n[s] !== t[s];
}
const $x = {
  inView: {
    Feature: C8
  },
  tap: {
    Feature: y8
  },
  focus: {
    Feature: g8
  },
  hover: {
    Feature: p8
  }
}, Bx = {
  layout: {
    ProjectionNode: ix,
    MeasureLayout: Ox
  }
}, j8 = {
  ..._x,
  ...$x,
  ...Lx,
  ...Bx
}, E8 = /* @__PURE__ */ QT(j8, Mx), A8 = {
  renderer: Mx,
  ..._x,
  ...$x
}, M8 = {
  ...A8,
  ...Lx,
  ...Bx
};
function fm(n) {
  const t = Ti(() => qa(n)), { isStatic: s } = j.useContext(ws);
  if (s) {
    const [, l] = j.useState(n);
    j.useEffect(() => t.on("change", l), []);
  }
  return t;
}
function zx(n, t) {
  const s = fm(t()), l = () => s.set(t());
  return l(), bc(() => {
    const r = () => Xt.preRender(l, !1, !0), u = n.map((c) => c.on("change", r));
    return () => {
      u.forEach((c) => c()), ua(l);
    };
  }), s;
}
function _8(n) {
  $l.current = [], n();
  const t = zx($l.current, n);
  return $l.current = void 0, t;
}
function ch(n, t, s, l) {
  if (typeof n == "function")
    return _8(n);
  const u = typeof t == "function" ? t : W9(t, s, l), c = Array.isArray(n) ? xv(n, u) : xv([n], ([g]) => u(g)), d = Array.isArray(n) ? void 0 : n.accelerate;
  return d && !d.isTransformed && typeof t != "function" && Array.isArray(s) && l?.clamp !== !1 && (c.accelerate = {
    ...d,
    times: t,
    keyframes: s,
    isTransformed: !0
  }), c;
}
function xv(n, t) {
  const s = Ti(() => []);
  return zx(n, () => {
    s.length = 0;
    const l = n.length;
    for (let r = 0; r < l; r++)
      s[r] = n[r].get();
    return t(s);
  });
}
function D8() {
  !em.current && Rb();
  const [n] = j.useState(ac.current);
  return n;
}
function dm(n) {
  return typeof n == "object" && !Array.isArray(n);
}
function Vx(n, t, s, l) {
  return n == null ? [] : typeof n == "string" && dm(t) ? Fh(n, s, l) : n instanceof NodeList ? Array.from(n) : Array.isArray(n) ? n.filter((r) => r != null) : [n];
}
function R8(n, t, s) {
  return n * (t + 1) + s * t;
}
function Sv(n, t, s, l) {
  return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, n + parseFloat(t)) : t === "<" ? s : t.startsWith("<") ? Math.max(0, s + parseFloat(t.slice(1))) : l.get(t) ?? n;
}
function N8(n, t, s) {
  for (let l = 0; l < n.length; l++) {
    const r = n[l];
    r.at > t && r.at < s && (xs(n, r), l--);
  }
}
function O8(n, t, s, l, r, u) {
  N8(n, r, u);
  for (let c = 0; c < t.length; c++)
    n.push({
      value: t[c],
      at: Pt(r, u, l[c]),
      easing: /* @__PURE__ */ Y2(s, c)
    });
}
function L8(n, t, s = 0) {
  const l = t + 1 + t * s;
  for (let r = 0; r < n.length; r++)
    n[r] = n[r] / l;
}
function $8(n, t) {
  return n.at === t.at ? n.value === null ? 1 : t.value === null ? -1 : 0 : n.at - t.at;
}
const B8 = "easeInOut", z8 = 20;
function V8(n, { defaultTransition: t = {}, ...s } = {}, l, r) {
  const u = t.duration || 0.3, c = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), g = {}, m = /* @__PURE__ */ new Map();
  let y = 0, v = 0, b = 0;
  for (let T = 0; T < n.length; T++) {
    const S = n[T];
    if (typeof S == "string") {
      m.set(S, v);
      continue;
    } else if (!Array.isArray(S)) {
      m.set(S.name, Sv(v, S.at, y, m));
      continue;
    }
    let [C, w, M = {}] = S;
    M.at !== void 0 && (v = Sv(v, M.at, y, m));
    let _ = 0;
    const R = (D, L, $, E = 0, z = 0) => {
      const k = k8(D), { delay: Y = 0, times: et = sb(k), type: nt = t.type || "keyframes", repeat: J, repeatType: Q, repeatDelay: W = 0, ...O } = L;
      let { ease: U = t.ease || "easeOut", duration: X } = L;
      const it = typeof Y == "function" ? Y(E, z) : Y, ot = k.length, N = qh(nt) ? nt : r?.[nt || "keyframes"];
      if (ot <= 2 && N) {
        let F = 100;
        if (ot === 2 && q8(k)) {
          const gt = k[1] - k[0];
          F = Math.abs(gt);
        }
        const rt = {
          ...t,
          ...O
        };
        X !== void 0 && (rt.duration = /* @__PURE__ */ Pe(X));
        const ct = eb(rt, F, N);
        U = ct.ease, X = ct.duration;
      }
      X ?? (X = u);
      const q = v + it;
      et.length === 1 && et[0] === 0 && (et[1] = 1);
      const tt = et.length - k.length;
      if (tt > 0 && ib(et, tt), k.length === 1 && k.unshift(null), J && J < z8) {
        const F = X > 0 ? W / X : 0;
        X = R8(X, J, W);
        const rt = [...k], ct = [...et];
        U = Array.isArray(U) ? [...U] : [U];
        const gt = [...U], bt = Q === "reverse" || Q === "mirror";
        let Dt = rt, Ot = gt;
        bt && (Dt = [...rt].reverse(), Q === "reverse" && (Ot = [...gt].reverse().map((zt) => typeof zt == "function" ? /* @__PURE__ */ Dh(zt) : zt)));
        for (let zt = 0; zt < J; zt++) {
          const Be = bt && zt % 2 === 0, ve = Be ? Dt : rt, Re = Be ? Ot : gt, Se = (zt + 1) * (1 + F);
          F > 0 && (k.push(k[k.length - 1]), et.push(Se), U.push("linear")), k.push(...ve);
          for (let Xe = 0; Xe < ve.length; Xe++)
            et.push(ct[Xe] + Se), U.push(Xe === 0 ? "linear" : /* @__PURE__ */ Y2(Re, Xe - 1));
        }
        L8(et, J, F);
      }
      const lt = q + X;
      O8($, k, U, et, q, lt), _ = Math.max(it + X, _), b = Math.max(lt, b);
    };
    if (ye(C)) {
      const D = wv(C, d);
      R(w, M, Cv("default", D));
    } else {
      const D = Vx(C, w, l, g), L = D.length;
      for (let $ = 0; $ < L; $++) {
        w = w, M = M;
        const E = D[$], z = wv(E, d);
        for (const k in w)
          R(w[k], U8(M, k), Cv(k, z), $, L);
      }
    }
    y = v, v += _;
  }
  return d.forEach((T, S) => {
    for (const C in T) {
      const w = T[C];
      w.sort($8);
      const M = [], _ = [], R = [];
      for (let E = 0; E < w.length; E++) {
        const { at: z, value: k, easing: Y } = w[E];
        M.push(k), _.push(/* @__PURE__ */ Ss(0, b, z)), R.push(Y || "easeOut");
      }
      _[0] !== 0 && (_.unshift(0), M.unshift(M[0]), R.unshift(B8)), _[_.length - 1] !== 1 && (_.push(1), M.push(null)), c.has(S) || c.set(S, {
        keyframes: {},
        transition: {}
      });
      const D = c.get(S);
      D.keyframes[C] = M;
      const { type: L, ...$ } = t;
      D.transition[C] = {
        ...$,
        duration: b,
        ease: R,
        times: _,
        ...s
      };
    }
  }), c;
}
function wv(n, t) {
  return !t.has(n) && t.set(n, {}), t.get(n);
}
function Cv(n, t) {
  return t[n] || (t[n] = []), t[n];
}
function k8(n) {
  return Array.isArray(n) ? n : [n];
}
function U8(n, t) {
  return n && n[t] ? {
    ...n,
    ...n[t]
  } : { ...n };
}
const H8 = (n) => typeof n == "number", q8 = (n) => n.every(H8);
function Y8(n) {
  const t = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        transform: {},
        transformOrigin: {},
        style: {},
        vars: {},
        attrs: {}
      },
      latestValues: {}
    }
  }, s = gc(n) && !_b(n) ? new Xb(t) : new Hb(t);
  s.mount(n), Gl.set(n, s);
}
function G8(n) {
  const t = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, s = new m6(t);
  s.mount(n), Gl.set(n, s);
}
function P8(n, t) {
  return ye(n) || typeof n == "number" || typeof n == "string" && !dm(t);
}
function kx(n, t, s, l) {
  const r = [];
  if (P8(n, t))
    r.push(tx(n, dm(t) && t.default || t, s && (s.default || s)));
  else {
    if (n == null)
      return r;
    const u = Vx(n, t, l), c = u.length;
    for (let d = 0; d < c; d++) {
      const g = u[d], m = g instanceof Element ? Y8 : G8;
      Gl.has(g) || m(g);
      const y = Gl.get(g), v = { ...s };
      "delay" in v && typeof v.delay == "function" && (v.delay = v.delay(d, c)), r.push(...Qh(y, { ...t, transition: v }, {}));
    }
  }
  return r;
}
function X8(n, t, s) {
  const l = [], r = n.map((c) => {
    if (Array.isArray(c) && typeof c[0] == "function") {
      const d = c[0], g = qa(0);
      return g.on("change", d), c.length === 1 ? [g, [0, 1]] : c.length === 2 ? [g, [0, 1], c[1]] : [g, c[1], c[2]];
    }
    return c;
  });
  return V8(r, t, s, { spring: Yl }).forEach(({ keyframes: c, transition: d }, g) => {
    l.push(...kx(g, c, d));
  }), l;
}
function K8(n) {
  return Array.isArray(n) && n.some(Array.isArray);
}
function Q8(n = {}) {
  const { scope: t, reduceMotion: s, skipAnimations: l } = n;
  function r(u, c, d) {
    let g = [], m;
    const y = {};
    if (s !== void 0 && (y.reduceMotion = s), l !== void 0 && (y.skipAnimations = l), K8(u)) {
      const { onComplete: b, ...T } = c || {};
      typeof b == "function" && (m = b), g = X8(u, { ...y, ...T }, t);
    } else {
      const { onComplete: b, ...T } = d || {};
      typeof b == "function" && (m = b), g = kx(u, c, { ...y, ...T }, t);
    }
    const v = new i9(g);
    return m && v.finished.then(m), t && (t.animations.push(v), v.finished.then(() => {
      xs(t.animations, v);
    })), v;
  }
  return r;
}
const kl = Q8();
class Z8 {
  constructor() {
    this.componentControls = /* @__PURE__ */ new Set();
  }
  /**
   * Subscribe a component's internal `VisualElementDragControls` to the user-facing API.
   *
   * @internal
   */
  subscribe(t) {
    return this.componentControls.add(t), () => this.componentControls.delete(t);
  }
  /**
   * Start a drag gesture on every `motion` component that has this set of drag controls
   * passed into it via the `dragControls` prop.
   *
   * ```jsx
   * dragControls.start(e, {
   *   snapToCursor: true
   * })
   * ```
   *
   * @param event - PointerEvent
   * @param options - Options
   *
   * @public
   */
  start(t, s) {
    this.componentControls.forEach((l) => {
      l.start(t.nativeEvent || t, s);
    });
  }
  /**
   * Cancels a drag gesture.
   *
   * ```jsx
   * dragControls.cancel()
   * ```
   *
   * @public
   */
  cancel() {
    this.componentControls.forEach((t) => {
      t.cancel();
    });
  }
  /**
   * Stops a drag gesture.
   *
   * ```jsx
   * dragControls.stop()
   * ```
   *
   * @public
   */
  stop() {
    this.componentControls.forEach((t) => {
      t.stop();
    });
  }
}
const F8 = () => new Z8();
function J8() {
  return Ti(F8);
}
const wi = E8, W8 = new Intl.Segmenter(void 0, {
  granularity: "grapheme"
}), Ci = (n) => Array.from(W8.segment(n), (t) => t.segment), Si = (n) => n >= "0" && n <= "9";
function I8(n, t) {
  return (n % t + t) % t;
}
const Lr = 8, tj = {
  default: {
    duration: 0.38,
    ease: [
      0.19,
      1,
      0.22,
      1
    ]
  },
  smooth: {
    type: "spring",
    duration: 0.4,
    bounce: 0
  },
  snappy: {
    type: "spring",
    duration: 0.35,
    bounce: 0.15
  },
  bouncy: {
    type: "spring",
    duration: 0.5,
    bounce: 0.3
  }
};
function ej(n, t) {
  const s = n.length, l = t.length, r = [];
  for (let g = 0; g <= s; g++) {
    r[g] = [];
    for (let m = 0; m <= l; m++)
      g === 0 || m === 0 ? r[g][m] = 0 : n[g - 1] === t[m - 1] ? r[g][m] = r[g - 1][m - 1] + 1 : r[g][m] = Math.max(r[g - 1][m], r[g][m - 1]);
  }
  const u = [];
  let c = s, d = l;
  for (; c > 0 && d > 0; )
    n[c - 1] === t[d - 1] ? (u.push([
      c - 1,
      d - 1
    ]), c--, d--) : r[c - 1][d] > r[c][d - 1] || r[c - 1][d] === r[c][d - 1] && c >= d ? c-- : d--;
  return u.reverse(), u;
}
function nj(n, t, s, l) {
  const r = Ci(n), u = Ci(t), c = ej(r, u), d = new Array(u.length).fill("");
  for (const [S, C] of c)
    d[C] = s[S];
  let g = l, m = 0;
  for (let S = 0; S < d.length; S++)
    d[S] || (d[S] = `c${g++}`, m++);
  const y = u.length - m, v = r.length - y, b = m + v, T = Math.max(u.length, r.length);
  return {
    keys: d,
    changeRatio: T > 0 ? b / T : 1,
    nextId: g
  };
}
function Ux(n, t, s, l) {
  const r = ($) => parseFloat($.replace(/[^0-9.-]/g, "")) || 0, u = Math.sign(r(t) - r(n)), c = Ci(n), d = Ci(t), g = ($) => {
    const E = $.findIndex((z) => Si(z));
    return E === -1 ? $.length : E;
  }, m = g(d), y = g(c), v = Math.min(m, y), b = new Array(d.length);
  let T = l;
  for (let $ = 0; $ < m; $++)
    b[$] = $ < v && d[$] === c[$] ? s[$] : T++;
  const S = c.slice(y), C = d.slice(m), w = s.slice(y), M = Math.max(S.length, C.length), _ = [
    ...Array(Math.max(0, M - S.length)).fill(""),
    ...S
  ], R = [
    ...Array(Math.max(0, M - C.length)).fill(""),
    ...C
  ], D = [
    ...Array(Math.max(0, M - w.length)).fill(-1),
    ...w
  ], L = M - C.length;
  for (let $ = 0; $ < C.length; $++) {
    const E = L + $;
    b[m + $] = R[E] === _[E] && D[E] >= 0 ? D[E] : T++;
  }
  return {
    keys: b,
    direction: u,
    nextId: T
  };
}
function aj({ text: n, Component: t, transition: s, stagger: l, animateInitial: r, onComplete: u, className: c, style: d, rest: g }) {
  const m = Ci(n), y = j.useRef(m.length), [v, b] = j.useState(n), [T, S] = j.useState(() => m.map((_, R) => R)), C = j.useRef(1);
  if (n !== v) {
    const _ = Ux(v, n, T, y.current);
    y.current = _.nextId, C.current = _.direction, S(_.keys), b(n);
  }
  const w = C.current, M = (() => {
    const _ = m.findIndex((R) => Si(R));
    return _ === -1 ? m.length : _;
  })();
  return /* @__PURE__ */ p.jsx(um, {
    transition: s,
    children: /* @__PURE__ */ p.jsx(t, {
      "aria-label": n,
      style: {
        display: "inline-flex",
        position: "relative",
        ...d
      },
      className: c,
      ...g,
      children: /* @__PURE__ */ p.jsx(Ts, {
        mode: "popLayout",
        initial: r,
        children: m.map((_, R) => {
          const D = R < M, L = D ? `pre-${R}` : `col-${m.length - 1 - R}`, $ = R * l, E = R === m.length - 1;
          return /* @__PURE__ */ p.jsx(wi.span, {
            layout: "position",
            initial: D ? !1 : {
              opacity: 0
            },
            animate: D ? void 0 : {
              opacity: 1
            },
            exit: D ? void 0 : {
              opacity: 0
            },
            style: {
              display: "inline-block",
              position: "relative"
            },
            children: D ? /* @__PURE__ */ p.jsx("span", {
              style: {
                display: "inline-block",
                whiteSpace: "pre"
              },
              children: _
            }) : /* @__PURE__ */ p.jsx(Ts, {
              mode: "popLayout",
              initial: r,
              propagate: !0,
              children: /* @__PURE__ */ p.jsx(wi.span, {
                "aria-hidden": "true",
                initial: {
                  y: Si(_) ? w > 0 ? Lr : -Lr : 0,
                  filter: "blur(2px)",
                  scale: 0.5,
                  opacity: 0
                },
                animate: {
                  y: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                  scale: 1,
                  transition: {
                    delay: $
                  }
                },
                exit: {
                  y: Si(_) ? w > 0 ? -Lr : Lr : 0,
                  opacity: 0,
                  filter: "blur(2px)",
                  scale: 0.5,
                  transition: {
                    delay: $
                  }
                },
                onAnimationComplete: E && u ? u : void 0,
                style: {
                  display: "inline-block",
                  whiteSpace: "pre"
                },
                children: _
              }, T[R])
            })
          }, L);
        })
      })
    })
  });
}
function ij({ n, current: t }) {
  const s = ch(t, (l) => {
    let r = I8(n - l, 10);
    return r > 5 && (r -= 10), `${-Math.max(-1, Math.min(1, r)) * 100}%`;
  });
  return /* @__PURE__ */ p.jsx(wi.span, {
    "aria-hidden": !0,
    style: {
      position: "absolute",
      top: 0,
      left: "50%",
      x: "-50%",
      display: "inline-block",
      whiteSpace: "pre",
      y: s
    },
    children: n
  });
}
const sj = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9
], gs = "0.25em", Tv = `linear-gradient(to bottom, transparent 0%, black ${gs}, black calc(100% - ${gs}), transparent 100%)`;
function lj({ digit: n, direction: t, transition: s, delay: l, animateIn: r }) {
  const u = PT(), c = Math.max(n, 1), d = r ? n - c * (t || 1) : n, g = fm(d), m = j.useRef(n), y = j.useRef(n), v = j.useRef(!0);
  if (n !== y.current) {
    const b = y.current;
    let T;
    t > 0 ? T = n >= b ? n - b : 10 - b + n : t < 0 ? T = b >= n ? -(b - n) : -(10 - n + b) : T = n - b, m.current += T, y.current = n;
  }
  return j.useEffect(() => {
    if (!u) {
      const b = Math.max(n, 1);
      kl(g, m.current + b * (t || 1), {
        ...s
      });
      return;
    }
    v.current && (v.current = !1, !r) || kl(g, m.current, {
      ...s,
      delay: l
    });
  }), /* @__PURE__ */ p.jsxs("span", {
    style: {
      display: "inline-block",
      position: "relative",
      verticalAlign: "top"
    },
    children: [
      /* @__PURE__ */ p.jsx("span", {
        style: {
          visibility: "hidden",
          whiteSpace: "pre",
          display: "inline-block"
        },
        children: "0"
      }),
      sj.map((b) => /* @__PURE__ */ p.jsx(ij, {
        n: b,
        current: g
      }, b))
    ]
  });
}
function oj({ text: n, Component: t, transition: s, stagger: l, animateInitial: r, className: u, style: c, rest: d }) {
  const g = Ci(n), m = j.useRef(g.length), [y, v] = j.useState(n), [b, T] = j.useState(() => g.map((D, L) => L)), S = j.useRef(1), C = j.useRef(!1);
  if (j.useEffect(() => {
    C.current = !0;
  }, []), n !== y) {
    const D = Ux(y, n, b, m.current);
    m.current = D.nextId, S.current = D.direction, T(D.keys), v(n);
  }
  const w = S.current, M = (() => {
    const D = g.findIndex((L) => Si(L));
    return D === -1 ? g.length : D;
  })(), _ = g.filter((D) => Si(D)).length;
  let R = 0;
  return /* @__PURE__ */ p.jsx(um, {
    transition: s,
    children: /* @__PURE__ */ p.jsx(t, {
      "aria-label": n,
      style: {
        display: "inline-flex",
        position: "relative",
        ...c
      },
      className: u,
      ...d,
      children: /* @__PURE__ */ p.jsx("span", {
        style: {
          display: "inline-flex",
          paddingTop: gs,
          paddingBottom: gs,
          marginTop: `calc(-1 * ${gs})`,
          marginBottom: `calc(-1 * ${gs})`,
          maskImage: Tv,
          WebkitMaskImage: Tv
        },
        children: /* @__PURE__ */ p.jsx(Ts, {
          mode: "popLayout",
          initial: r,
          children: g.map((D, L) => {
            const $ = L < M, E = $ ? `pre-${L}` : `col-${g.length - 1 - L}`;
            if ($ || !Si(D))
              return /* @__PURE__ */ p.jsx(wi.span, {
                layout: "position",
                initial: !1,
                exit: $ ? void 0 : {
                  opacity: 0
                },
                style: {
                  display: "inline-block",
                  whiteSpace: "pre"
                },
                children: D
              }, E);
            const z = (_ - 1 - R) * l;
            return R++, /* @__PURE__ */ p.jsx(wi.span, {
              layout: "position",
              initial: !1,
              exit: {
                opacity: 0
              },
              style: {
                display: "inline-block"
              },
              children: /* @__PURE__ */ p.jsx(lj, {
                digit: Number(D),
                direction: w,
                transition: s,
                delay: z,
                animateIn: C.current || r
              })
            }, E);
          })
        })
      })
    })
  });
}
function rj({ text: n, Component: t, transition: s, driftX: l, driftY: r, trend: u, animateInitial: c, onComplete: d, className: g, style: m, rest: y }) {
  const v = Ci(n), b = j.useRef(v.length), [T, S] = j.useState(n), [C, w] = j.useState(() => v.map((R, D) => `c${D}`)), [M, _] = j.useState(0);
  if (n !== T) {
    const R = nj(T, n, C, b.current);
    b.current = R.nextId, S(n), w(R.keys), _(R.changeRatio);
  }
  return /* @__PURE__ */ p.jsx(um, {
    transition: s,
    children: /* @__PURE__ */ p.jsx(t, {
      "aria-label": n,
      style: {
        display: "inline-flex",
        ...m
      },
      className: g,
      ...y,
      children: /* @__PURE__ */ p.jsx(Ts, {
        mode: "popLayout",
        initial: c,
        children: v.map((R, D) => {
          const L = C[D], $ = v.length <= 1 ? 0 : D / (v.length - 1), E = ($ - 0.5) * l * M, z = ($ - 0.5) * r * M, k = u * 8 * M, Y = D === v.length - 1;
          return /* @__PURE__ */ p.jsx(wi.span, {
            "aria-hidden": "true",
            layout: "position",
            initial: {
              opacity: 0,
              x: E,
              y: z + k,
              filter: "blur(4px)",
              scale: 0.85
            },
            animate: {
              opacity: 1,
              x: 0,
              y: 0,
              filter: "blur(0px)",
              scale: 1
            },
            exit: {
              opacity: 0,
              x: E,
              y: z - k,
              filter: "blur(4px)",
              scale: 0.85
            },
            onAnimationComplete: Y && d ? d : void 0,
            style: {
              display: "inline-block",
              whiteSpace: "pre"
            },
            children: R
          }, L);
        })
      })
    })
  });
}
function cj({ children: n, transition: t }) {
  const [s, l] = j.useState(null), [r, u] = j.useState(0), c = j.useCallback((d) => {
    l(d);
  }, []);
  return j.useEffect(() => {
    if (!s) return;
    const d = new ResizeObserver(([g]) => {
      u(Math.ceil(g.contentRect.width));
    });
    return d.observe(s), () => d.disconnect();
  }, [
    s
  ]), /* @__PURE__ */ p.jsx(wi.span, {
    animate: {
      width: r > 0 ? r : "auto"
    },
    transition: t,
    style: {
      display: "inline-flex"
    },
    children: /* @__PURE__ */ p.jsx("span", {
      ref: c,
      style: {
        display: "inline-flex"
      },
      children: n
    })
  });
}
function js(n) {
  const { children: t, variant: s = "text", animation: l, as: r = "span", drift: { x: u = 15, y: c = 0 } = {}, trend: d = 0, stagger: g = 0.02, initial: m = !1, onComplete: y, autoSize: v = !0, className: b, style: T, ...S } = n, C = tj[l ?? (s === "number" ? "snappy" : "default")], w = {
    text: String(t ?? ""),
    Component: r,
    transition: C,
    stagger: g,
    animateInitial: m,
    onComplete: y,
    className: b,
    style: T,
    rest: S
  };
  let M;
  return s === "number" ? M = /* @__PURE__ */ p.jsx(aj, {
    ...w
  }) : s === "slots" ? M = /* @__PURE__ */ p.jsx(oj, {
    ...w
  }) : M = /* @__PURE__ */ p.jsx(rj, {
    ...w,
    driftX: u,
    driftY: c,
    trend: d
  }), v ? /* @__PURE__ */ p.jsx(cj, {
    transition: C,
    children: M
  }) : M;
}
var io = A2();
function uj(n, t) {
  if (n instanceof RegExp) return { keys: !1, pattern: n };
  var s, l, r, u, c = [], d = "", g = n.split("/");
  for (g[0] || g.shift(); r = g.shift(); )
    s = r[0], s === "*" ? (c.push(s), d += r[1] === "?" ? "(?:/(.*))?" : "/(.*)") : s === ":" ? (l = r.indexOf("?", 1), u = r.indexOf(".", 1), c.push(r.substring(1, ~l ? l : ~u ? u : r.length)), d += ~l && !~u ? "(?:/([^/]+?))?" : "/([^/]+?)", ~u && (d += (~l ? "?" : "") + "\\" + r.substring(u))) : d += "/" + r;
  return {
    keys: c,
    pattern: new RegExp("^" + d + (t ? "(?=$|/)" : "/?$"), "i")
  };
}
const fj = "popstate", hm = "pushState", mm = "replaceState", dj = "hashchange", jv = [
  fj,
  hm,
  mm,
  dj
], hj = (n) => {
  for (const t of jv)
    addEventListener(t, n);
  return () => {
    for (const t of jv)
      removeEventListener(t, n);
  };
}, Hx = (n, t) => _4.useSyncExternalStore(hj, n, t), Ev = () => location.search, mj = ({ ssrSearch: n } = {}) => Hx(
  Ev,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrSearch="?foo",
  // client hydrates with just <Router /> and reads from location.search
  n != null ? () => n : Ev
), Av = () => location.pathname, pj = ({ ssrPath: n } = {}) => Hx(
  Av,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrPath="/foo",
  // client hydrates with just <Router /> and reads from location.pathname
  n != null ? () => n : Av
), gj = (n, { replace: t = !1, state: s = null } = {}) => history[t ? mm : hm](s, "", n), yj = (n = {}) => [pj(n), gj], Mv = Symbol.for("wouter_v3");
if (typeof history < "u" && typeof window[Mv] > "u") {
  for (const n of [hm, mm]) {
    const t = history[n];
    history[n] = function() {
      const s = t.apply(this, arguments), l = new Event(n);
      return l.arguments = arguments, dispatchEvent(l), s;
    };
  }
  Object.defineProperty(window, Mv, { value: !0 });
}
const vj = (n, t) => t.toLowerCase().indexOf(n.toLowerCase()) ? "~" + t : t.slice(n.length) || "/", qx = (n = "") => n === "/" ? "" : n, bj = (n, t) => n[0] === "~" ? n.slice(1) : qx(t) + n, xj = (n = "", t) => vj(_v(qx(n)), _v(t)), _v = (n) => {
  try {
    return decodeURI(n);
  } catch {
    return n;
  }
}, Sj = {
  hook: yj,
  searchHook: mj,
  parser: uj,
  base: "",
  // this option is used to override the current location during SSR
  ssrPath: void 0,
  ssrSearch: void 0,
  // optional context to track render state during SSR
  ssrContext: void 0,
  // customizes how `href` props are transformed for <Link />
  hrefs: (n) => n,
  // wraps navigate calls, useful for view transitions
  aroundNav: (n, t, s) => n(t, s)
}, wj = j.createContext(Sj), Cj = () => j.useContext(wj), Tj = {};
j.createContext(Tj);
const jj = (n) => {
  const [t, s] = n.hook(n);
  return [
    xj(n.base, t),
    M2(
      (l, r) => n.aroundNav(s, bj(l, n.base), r)
    )
  ];
}, Ej = j.forwardRef((n, t) => {
  const s = Cj(), [l, r] = jj(s), {
    to: u = "",
    href: c = u,
    onClick: d,
    asChild: g,
    children: m,
    className: y,
    /* eslint-disable no-unused-vars */
    replace: v,
    state: b,
    transition: T,
    /* eslint-enable no-unused-vars */
    ...S
  } = n, C = M2((M) => {
    M.ctrlKey || M.metaKey || M.altKey || M.shiftKey || M.button !== 0 || (d?.(M), M.defaultPrevented || (M.preventDefault(), r(c, n)));
  }), w = s.hrefs(
    c[0] === "~" ? c.slice(1) : s.base + c,
    s
    // pass router as a second argument for convinience
  );
  return g && j.isValidElement(m) ? j.cloneElement(m, { onClick: C, href: w }) : j.createElement("a", {
    ...S,
    onClick: C,
    href: w,
    // `className` can be a function to apply the class if this link is active
    className: y?.call ? y(l === c) : y,
    children: m,
    ref: t
  });
}), pm = Object.freeze({
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
}), xc = Object.freeze({
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
}), Aj = "_root_xunnd_1", Dv = "_glassBackground_xunnd_5", Rv = "_glassShadow_xunnd_25", Mj = "_glassBorder_1y4zy_1", _j = "_muted_1y4zy_15", Zl = (n) => {
  const t = xt.c(2), {
    className: s,
    muted: l
  } = n, r = `${Mj} ${l !== void 0 && l ? _j : ""} ${s === void 0 ? "" : s}`;
  let u;
  return t[0] !== r ? (u = /* @__PURE__ */ p.jsx("div", {
    className: r,
    "aria-hidden": "true"
  }), t[0] = r, t[1] = u) : u = t[1], u;
}, gm = (n) => {
  const t = xt.c(16);
  let s, l, r, u;
  t[0] !== n ? ({
    children: s,
    className: r,
    style: u,
    ...l
  } = n, t[0] = n, t[1] = s, t[2] = l, t[3] = r, t[4] = u) : (s = t[1], l = t[2], r = t[3], u = t[4]);
  const c = r === void 0 ? "" : r;
  let d;
  t[5] !== u ? (d = u === void 0 ? {} : u, t[5] = u, t[6] = d) : d = t[6];
  const g = d;
  if (!s) {
    let S;
    return t[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (S = /* @__PURE__ */ p.jsxs(p.Fragment, {
      children: [/* @__PURE__ */ p.jsx("div", {
        className: Dv,
        "aria-hidden": "true"
      }), /* @__PURE__ */ p.jsx("div", {
        className: Rv,
        "aria-hidden": "true"
      }), /* @__PURE__ */ p.jsx(Zl, {})]
    }), t[7] = S) : S = t[7], S;
  }
  const m = `${Aj} ${c}`;
  let y, v, b;
  t[8] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (y = /* @__PURE__ */ p.jsx("div", {
    className: Dv,
    "aria-hidden": "true"
  }), v = /* @__PURE__ */ p.jsx("div", {
    className: Rv,
    "aria-hidden": "true"
  }), b = /* @__PURE__ */ p.jsx(Zl, {}), t[8] = y, t[9] = v, t[10] = b) : (y = t[8], v = t[9], b = t[10]);
  let T;
  return t[11] !== s || t[12] !== l || t[13] !== g || t[14] !== m ? (T = /* @__PURE__ */ p.jsxs("div", {
    className: m,
    style: g,
    ...l,
    children: [y, v, b, s]
  }), t[11] = s, t[12] = l, t[13] = g, t[14] = m, t[15] = T) : T = t[15], T;
}, Dj = (n) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/arrow-down" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", d: "M11.2482 20.3129C11.6466 20.7682 12.3556 20.7682 12.7541 20.3129L17.5499 14.8314C18.1155 14.1849 17.6561 13.1732 16.797 13.1732H13.5011V5.67324C13.5011 4.84481 12.8295 4.17324 12.0011 4.17324C11.1727 4.17324 10.5011 4.84481 10.5011 5.67324V13.1732H7.20522C6.34614 13.1732 5.88678 14.1849 6.45229 14.8314L11.2482 20.3129Z", fill: "#3D3C3A" }))), Rj = (n) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/arrow-up" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", d: "M11.2483 3.85905C11.6467 3.40376 12.3558 3.40375 12.7542 3.85905L17.5501 9.3405C18.1158 9.98708 17.6563 10.9997 16.7971 10.9997H13.5012V18.4997C13.501 19.3279 12.8295 19.9997 12.0012 19.9997C11.1729 19.9997 10.5014 19.3279 10.5012 18.4997V10.9997H7.20535C6.34619 10.9997 5.88666 9.98708 6.45242 9.3405L11.2483 3.85905Z", fill: "#3D3C3A" }))), Nj = (n) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/star" }, /* @__PURE__ */ j.createElement("path", { id: "Vector 234255911", d: "M11 16L15 12L11 8", stroke: "#3D3C3A", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }))), Yx = "_redaction_dcm1f_1", Gx = "_active_dcm1f_19", Oj = "_sized_dcm1f_29", gd = 1800, Lj = 1.3, Px = /* @__PURE__ */ j.createContext(null), ym = () => j.useContext(Px);
let rc = [];
const $j = () => {
  const n = rc;
  rc = [];
  const t = performance.now(), s = n.map((l) => {
    const r = l.getBoundingClientRect().top + window.scrollY;
    return -(((t - r * Lj) % gd + gd) % gd);
  });
  n.forEach((l, r) => {
    l.style.setProperty("--wave-phase", `${Math.round(s[r])}ms`);
  });
}, vm = (n) => {
  n && (rc.length === 0 && requestAnimationFrame($j), rc.push(n));
}, Xx = (n) => n ? `${Yx} ${Gx}` : "", Bj = 10, uh = (n) => {
  const t = xt.c(7), {
    active: s,
    width: l,
    children: r
  } = n, u = r != null && r !== "", c = l ?? (!u && s ? Bj : void 0), d = s ? vm : void 0, g = `
                ${Yx}
                ${s ? Gx : ""}
                ${c ? Oj : ""}`;
  let m;
  t[0] !== c ? (m = c ? {
    width: `${c}ch`
  } : void 0, t[0] = c, t[1] = m) : m = t[1];
  const y = u ? r : " ";
  let v;
  return t[2] !== d || t[3] !== g || t[4] !== m || t[5] !== y ? (v = /* @__PURE__ */ p.jsx("span", {
    ref: d,
    className: g,
    style: m,
    children: y
  }), t[2] = d, t[3] = g, t[4] = m, t[5] = y, t[6] = v) : v = t[6], v;
}, Vn = (n) => {
  const t = xt.c(6), {
    className: s,
    as: l,
    active: r
  } = n, u = s === void 0 ? "" : s, c = l === void 0 ? "div" : l, d = ym(), g = r ?? d ?? !0, m = Xx(g), y = g ? vm : void 0, v = `${u} ${m}`;
  let b;
  t[0] !== v ? (b = v.trim(), t[0] = v, t[1] = b) : b = t[1];
  let T;
  return t[2] !== c || t[3] !== y || t[4] !== b ? (T = /* @__PURE__ */ p.jsx(c, {
    ref: y,
    className: b
  }), t[2] = c, t[3] = y, t[4] = b, t[5] = T) : T = t[5], T;
}, cc = (n) => {
  const t = xt.c(3), {
    active: s,
    children: l
  } = n, r = !!(s === void 0 || s);
  let u;
  return t[0] !== l || t[1] !== r ? (u = /* @__PURE__ */ p.jsx(Px.Provider, {
    value: r,
    children: l
  }), t[0] = l, t[1] = r, t[2] = u) : u = t[2], u;
}, bm = "_text_9l4iv_1", uc = "_icon_9l4iv_28", Kx = "_title32_9l4iv_34", Qx = "_title24_9l4iv_35", Zx = "_title20_9l4iv_36", Fx = "_body_9l4iv_56", Jx = "_subtitle_9l4iv_63", Wx = "_caption_9l4iv_70", zj = {
  text: bm,
  icon: uc,
  title32: Kx,
  title24: Qx,
  title20: Zx,
  body: Fx,
  subtitle: Jx,
  caption: Wx
}, Vj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  body: Fx,
  caption: Wx,
  default: zj,
  icon: uc,
  subtitle: Jx,
  text: bm,
  title20: Zx,
  title24: Qx,
  title32: Kx
}, Symbol.toStringTag, { value: "Module" })), kj = {
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
}, ut = (n) => {
  const t = xt.c(34);
  let s, l, r, u, c, d, g, m, y, v, b;
  t[0] !== n ? ({
    as: s,
    variant: v,
    weight: b,
    rounded: m,
    skeleton: y,
    caps: r,
    chevron: u,
    arrow: l,
    children: c,
    className: d,
    ...g
  } = n, t[0] = n, t[1] = s, t[2] = l, t[3] = r, t[4] = u, t[5] = c, t[6] = d, t[7] = g, t[8] = m, t[9] = y, t[10] = v, t[11] = b) : (s = t[1], l = t[2], r = t[3], u = t[4], c = t[5], d = t[6], g = t[7], m = t[8], y = t[9], v = t[10], b = t[11]);
  const T = v === void 0 ? "body" : v, S = ym(), C = s || "div", w = y !== void 0 ? !!y : !!S, M = y !== void 0 || S !== null, _ = typeof y == "number" ? y : void 0;
  let R;
  t[12] !== w || t[13] !== c || t[14] !== M || t[15] !== _ ? (R = M ? /* @__PURE__ */ p.jsx(uh, {
    active: w,
    width: _,
    children: c
  }) : c, t[12] = w, t[13] = c, t[14] = M, t[15] = _, t[16] = R) : R = t[16];
  const D = R, L = l?.direction === "down" ? Dj : Rj, $ = `${bm} ${Vj[kj[T] || "body"]} ${d || ""}`, E = m || void 0, z = r || void 0, k = w || void 0;
  let Y;
  t[17] !== L || t[18] !== l?.direction ? (Y = l?.direction && /* @__PURE__ */ p.jsx(L, {
    className: uc
  }), t[17] = L, t[18] = l?.direction, t[19] = Y) : Y = t[19];
  let et;
  t[20] !== u ? (et = u && /* @__PURE__ */ p.jsx(Nj, {
    className: uc
  }), t[20] = u, t[21] = et) : et = t[21];
  let nt;
  return t[22] !== C || t[23] !== D || t[24] !== g || t[25] !== $ || t[26] !== E || t[27] !== z || t[28] !== k || t[29] !== Y || t[30] !== et || t[31] !== T || t[32] !== b ? (nt = /* @__PURE__ */ p.jsxs(C, {
    ...g,
    className: $,
    "data-variant": T,
    "data-weight": b,
    "data-rounded": E,
    "data-caps": z,
    "data-skeleton": k,
    children: [Y, D, et]
  }), t[22] = C, t[23] = D, t[24] = g, t[25] = $, t[26] = E, t[27] = z, t[28] = k, t[29] = Y, t[30] = et, t[31] = T, t[32] = b, t[33] = nt) : nt = t[33], nt;
}, xm = {
  skin: "apple",
  isApple: !0,
  isMaterial: !1,
  setSkin: () => {
  }
}, Ix = /* @__PURE__ */ j.createContext(xm), so = () => j.useContext(Ix) || xm;
function Uj(n) {
  const t = xt.c(3), {
    children: s
  } = n;
  let l;
  t[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (l = [], t[0] = l) : l = t[0], j.useEffect(Hj, l);
  let r;
  return t[1] !== s ? (r = /* @__PURE__ */ p.jsx(Ix.Provider, {
    value: xm,
    children: s
  }), t[1] = s, t[2] = r) : r = t[2], r;
}
function Hj() {
  document.body.classList.remove("material", "skin-switcher-active"), document.body.classList.add("apple");
}
const Sm = "_button_1d7yf_1", t3 = "_regular_1d7yf_21", e3 = "_overlay_1d7yf_35", n3 = "_secondary_1d7yf_42", a3 = "_accent_1d7yf_47", wm = "_icon_1d7yf_53", Cm = "_label_1d7yf_57", Tm = "_content_1d7yf_61", qj = {
  button: Sm,
  regular: t3,
  overlay: e3,
  secondary: n3,
  accent: a3,
  icon: wm,
  label: Cm,
  content: Tm
}, Yj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accent: a3,
  button: Sm,
  content: Tm,
  default: qj,
  icon: wm,
  label: Cm,
  overlay: e3,
  regular: t3,
  secondary: n3
}, Symbol.toStringTag, { value: "Module" })), Nv = (n) => {
  const t = xt.c(16), {
    children: s,
    onClick: l,
    variant: r,
    ariaLabel: u,
    title: c
  } = n, d = r === void 0 ? "regular" : r, g = typeof s == "string", m = d === "regular" || d === "overlay", y = `${Sm} ${Yj[d]} ${g ? Cm : wm}`;
  let v, b;
  t[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = {
    scale: 1.1
  }, b = {
    scale: {
      type: "spring",
      stiffness: 800,
      damping: 40
    }
  }, t[0] = v, t[1] = b) : (v = t[0], b = t[1]);
  let T;
  t[2] !== m ? (T = m && /* @__PURE__ */ p.jsx(Zl, {
    muted: !0
  }), t[2] = m, t[3] = T) : T = t[3];
  let S;
  t[4] !== s || t[5] !== g ? (S = g ? /* @__PURE__ */ p.jsx(ut, {
    variant: "body",
    weight: "medium",
    children: s
  }) : s, t[4] = s, t[5] = g, t[6] = S) : S = t[6];
  let C;
  t[7] !== S ? (C = /* @__PURE__ */ p.jsx("span", {
    className: Tm,
    children: S
  }), t[7] = S, t[8] = C) : C = t[8];
  let w;
  return t[9] !== u || t[10] !== l || t[11] !== y || t[12] !== T || t[13] !== C || t[14] !== c ? (w = /* @__PURE__ */ p.jsxs(ah, {
    type: "button",
    className: y,
    onClick: l,
    "aria-label": u,
    title: c,
    whileTap: v,
    transition: b,
    children: [T, C]
  }), t[9] = u, t[10] = l, t[11] = y, t[12] = T, t[13] = C, t[14] = c, t[15] = w) : w = t[15], w;
}, Gj = /* @__PURE__ */ j.createContext(!1), Pj = "_root_125i3_1", Ov = "_side_125i3_9", Xj = "_trailing_125i3_18", Kj = "_middle_125i3_22", Qj = "_middleOverlay_125i3_31", Zj = "_titlePill_125i3_35", Fj = "_titleContent_125i3_45", Jj = "_inModal_125i3_59", Wj = (n) => {
  const t = xt.c(32), {
    left: s,
    onLeft: l,
    leftVariant: r,
    leftAriaLabel: u,
    leftTitle: c,
    right: d,
    onRight: g,
    rightVariant: m,
    rightAriaLabel: y,
    rightTitle: v,
    overlay: b,
    titleGlass: T,
    children: S
  } = n, C = b === void 0 ? !1 : b, w = T === void 0 ? !1 : T, {
    isApple: M
  } = so(), _ = j.useContext(Gj), R = C ? "overlay" : "regular";
  let D;
  t[0] !== S ? (D = /* @__PURE__ */ p.jsx(ut, {
    variant: "body",
    weight: "semibold",
    children: S
  }), t[0] = S, t[1] = D) : D = t[1];
  const L = D, $ = `${Pj} ${_ ? Jj : ""}`;
  let E;
  t[2] !== R || t[3] !== s || t[4] !== u || t[5] !== c || t[6] !== r || t[7] !== l ? (E = s != null && /* @__PURE__ */ p.jsx(Nv, {
    onClick: l,
    variant: r ?? R,
    ariaLabel: u,
    title: c,
    children: s
  }), t[2] = R, t[3] = s, t[4] = u, t[5] = c, t[6] = r, t[7] = l, t[8] = E) : E = t[8];
  let z;
  t[9] !== E ? (z = /* @__PURE__ */ p.jsx("div", {
    className: Ov,
    children: E
  }), t[9] = E, t[10] = z) : z = t[10];
  let k;
  t[11] !== R || t[12] !== g || t[13] !== d || t[14] !== y || t[15] !== v || t[16] !== m ? (k = d != null && /* @__PURE__ */ p.jsx(Nv, {
    onClick: g,
    variant: m ?? R,
    ariaLabel: y,
    title: v,
    children: d
  }), t[11] = R, t[12] = g, t[13] = d, t[14] = y, t[15] = v, t[16] = m, t[17] = k) : k = t[17];
  let Y;
  t[18] !== k ? (Y = /* @__PURE__ */ p.jsx("div", {
    className: `${Ov} ${Xj}`,
    children: k
  }), t[18] = k, t[19] = Y) : Y = t[19];
  const et = `${Kj} ${C ? Qj : ""}`;
  let nt;
  t[20] !== M || t[21] !== L || t[22] !== w ? (nt = M && w ? /* @__PURE__ */ p.jsxs("div", {
    className: Zj,
    children: [/* @__PURE__ */ p.jsx(gm, {}), /* @__PURE__ */ p.jsx("span", {
      className: Fj,
      children: L
    })]
  }) : L, t[20] = M, t[21] = L, t[22] = w, t[23] = nt) : nt = t[23];
  let J;
  t[24] !== nt || t[25] !== et ? (J = /* @__PURE__ */ p.jsx("div", {
    className: et,
    children: nt
  }), t[24] = nt, t[25] = et, t[26] = J) : J = t[26];
  let Q;
  return t[27] !== J || t[28] !== $ || t[29] !== z || t[30] !== Y ? (Q = /* @__PURE__ */ p.jsxs("div", {
    className: $,
    "data-modal-drag": "",
    children: [z, Y, J]
  }), t[27] = J, t[28] = $, t[29] = z, t[30] = Y, t[31] = Q) : Q = t[31], Q;
}, Ij = /* @__PURE__ */ j.createContext({
  inDetailPane: !1
}), tE = () => j.useContext(Ij), ee = () => {
}, $r = () => ({
  show: ee,
  hide: ee,
  enable: ee,
  disable: ee,
  showProgress: ee,
  hideProgress: ee,
  setParams: ee,
  setText: ee,
  onClick: ee,
  offClick: ee
}), eE = {
  initData: "",
  themeParams: {},
  viewportHeight: 0,
  BackButton: $r(),
  SettingsButton: $r(),
  MainButton: $r(),
  SecondaryButton: $r(),
  HapticFeedback: {
    impactOccurred: ee,
    notificationOccurred: ee,
    selectionChanged: ee
  },
  onEvent: ee,
  offEvent: ee,
  expand: ee,
  setHeaderColor: ee,
  setBackgroundColor: ee,
  setBottomBarColor: ee,
  disableVerticalSwipes: ee,
  enableVerticalSwipes: ee,
  requestFullscreen: ee,
  exitFullscreen: ee,
  shareToStory: ee
}, da = globalThis.Telegram?.WebApp ?? eE;
function nE(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var yd = { exports: {} }, vd, Lv;
function aE() {
  if (Lv) return vd;
  Lv = 1;
  var n = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return vd = n, vd;
}
var bd, $v;
function iE() {
  if ($v) return bd;
  $v = 1;
  var n = /* @__PURE__ */ aE();
  function t() {
  }
  function s() {
  }
  return s.resetWarningCache = t, bd = function() {
    function l(c, d, g, m, y, v) {
      if (v !== n) {
        var b = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw b.name = "Invariant Violation", b;
      }
    }
    l.isRequired = l;
    function r() {
      return l;
    }
    var u = {
      array: l,
      bigint: l,
      bool: l,
      func: l,
      number: l,
      object: l,
      string: l,
      symbol: l,
      any: l,
      arrayOf: r,
      element: l,
      elementType: l,
      instanceOf: r,
      node: l,
      objectOf: r,
      oneOf: r,
      oneOfType: r,
      shape: r,
      exact: r,
      checkPropTypes: s,
      resetWarningCache: t
    };
    return u.PropTypes = u, u;
  }, bd;
}
var Bv;
function sE() {
  return Bv || (Bv = 1, yd.exports = /* @__PURE__ */ iE()()), yd.exports;
}
var lE = /* @__PURE__ */ sE();
const _n = /* @__PURE__ */ nE(lE);
_n.func;
const jm = "_button_124dm_1", i3 = "_filled_124dm_9", s3 = "_tinted_124dm_14", l3 = "_plain_124dm_19", o3 = "_outlined_124dm_24", r3 = "_gray_124dm_28", c3 = "_disabled_124dm_33", Em = "_skeleton_124dm_38", u3 = "_wave_124dm_1", oE = {
  button: jm,
  filled: i3,
  tinted: s3,
  plain: l3,
  outlined: o3,
  gray: r3,
  disabled: c3,
  skeleton: Em,
  wave: u3
}, rE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  button: jm,
  default: oE,
  disabled: c3,
  filled: i3,
  gray: r3,
  outlined: o3,
  plain: l3,
  skeleton: Em,
  tinted: s3,
  wave: u3
}, Symbol.toStringTag, { value: "Module" })), De = (n) => {
  const t = xt.c(34);
  let s, l, r, u, c;
  t[0] !== n ? ({
    variant: c,
    label: s,
    isShine: r,
    isFill: u,
    ...l
  } = n, t[0] = n, t[1] = s, t[2] = l, t[3] = r, t[4] = u, t[5] = c) : (s = t[1], l = t[2], r = t[3], u = t[4], c = t[5]);
  const d = r === void 0 ? !1 : r, g = u === void 0 ? !1 : u, {
    isApple: m
  } = so(), y = !!ym(), v = Xx(y);
  let b;
  t[6] !== g ? (b = g && {
    "data-fill": !0
  }, t[6] = g, t[7] = b) : b = t[7];
  let T;
  t[8] !== d || t[9] !== y || t[10] !== c ? (T = c === "filled" && d && !y && {
    "data-shine": !0
  }, t[8] = d, t[9] = y, t[10] = c, t[11] = T) : T = t[11];
  let S;
  t[12] !== b || t[13] !== T ? (S = {
    ...b,
    ...T
  }, t[12] = b, t[13] = T, t[14] = S) : S = t[14];
  const C = S;
  let w;
  t[15] !== s ? (w = /* @__PURE__ */ p.jsx(ut, {
    variant: "body",
    weight: "semibold",
    children: s
  }), t[15] = s, t[16] = w) : w = t[16];
  const M = w, _ = y ? vm : void 0, R = `${jm} ${rE[c]} ${y ? Em : ""} ${v}`;
  let D;
  t[17] !== m || t[18] !== y ? (D = m && !y && {
    whileTap: {
      scale: 1.02
    }
  }, t[17] = m, t[18] = y, t[19] = D) : D = t[19];
  let L;
  t[20] !== y || t[21] !== c ? (L = c === "filled" && !y && /* @__PURE__ */ p.jsx(Zl, {}), t[20] = y, t[21] = c, t[22] = L) : L = t[22];
  let $;
  t[23] !== M || t[24] !== y ? ($ = y ? /* @__PURE__ */ p.jsx(cc, {
    active: !1,
    children: M
  }) : M, t[23] = M, t[24] = y, t[25] = $) : $ = t[25];
  let E;
  return t[26] !== C || t[27] !== l || t[28] !== L || t[29] !== $ || t[30] !== _ || t[31] !== R || t[32] !== D ? (E = /* @__PURE__ */ p.jsxs(fa, {
    ref: _,
    className: R,
    ...D,
    ...C,
    ...l,
    children: [L, $]
  }), t[26] = C, t[27] = l, t[28] = L, t[29] = $, t[30] = _, t[31] = R, t[32] = D, t[33] = E) : E = t[33], E;
};
function f3(n) {
  var t, s, l = "";
  if (typeof n == "string" || typeof n == "number") l += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var r = n.length;
    for (t = 0; t < r; t++) n[t] && (s = f3(n[t])) && (l && (l += " "), l += s);
  } else for (s in n) n[s] && (l && (l += " "), l += s);
  return l;
}
function cE() {
  for (var n, t, s = 0, l = "", r = arguments.length; s < r; s++) (n = arguments[s]) && (t = f3(n)) && (l && (l += " "), l += t);
  return l;
}
const uE = (...n) => cE(...n), Ul = {
  DROPDOWN: {
    type: "spring",
    stiffness: 500,
    damping: 32
  },
  SNAP: {
    type: "spring",
    stiffness: 120,
    damping: 20
  },
  GENTLE: {
    type: "spring",
    stiffness: 500,
    damping: 40
  },
  SNACKBAR: {
    type: "spring",
    stiffness: 280,
    damping: 26
  }
}, fE = {
  hidden: {
    scale: 0,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: Ul.DROPDOWN
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.25
    }
  }
}, d3 = "_overlay_qo6yx_1", h3 = "_opacity_qo6yx_2", Am = "_fadeIn_qo6yx_6", Mm = "_fadeOut_qo6yx_10", dE = {
  overlay: d3,
  opacity: h3,
  fadeIn: Am,
  fadeOut: Mm,
  "overlay-out": "_overlay-out_qo6yx_1",
  "opacity-out": "_opacity-out_qo6yx_1"
}, hE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dE,
  fadeIn: Am,
  fadeOut: Mm,
  opacity: h3,
  overlay: d3
}, Symbol.toStringTag, { value: "Module" })), mE = typeof window < "u" && "ontouchstart" in window, pE = 250;
function gE(n) {
  const t = xt.c(21);
  let s;
  t[0] !== n ? (s = n === void 0 ? {} : n, t[0] = n, t[1] = s) : s = t[1];
  const {
    onTap: l,
    onTapOut: r,
    mode: u,
    disabled: c
  } = s, d = hE[u === void 0 ? "overlay" : u], [g, m] = j.useState(!1);
  let y;
  t[2] !== d ? (y = [d], t[2] = d, t[3] = y) : y = t[3];
  const [v, b] = j.useState(y), T = j.useRef();
  let S;
  t[4] !== d || t[5] !== r ? (S = () => {
    m(!1), b([d, Mm]), r?.(), T.current = window.setTimeout(() => {
      b([d]);
    }, pE);
  }, t[4] = d, t[5] = r, t[6] = S) : S = t[6];
  const C = S;
  let w;
  t[7] !== d || t[8] !== l ? (w = (E) => {
    clearTimeout(T.current), m(!0), b([d, Am]), l?.(E);
  }, t[7] = d, t[8] = l, t[9] = w) : w = t[9];
  const M = w;
  let _, R;
  t[10] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (_ = () => () => clearTimeout(T.current), R = [], t[10] = _, t[11] = R) : (_ = t[10], R = t[11]), j.useEffect(_, R);
  let D;
  t[12] !== c || t[13] !== M || t[14] !== C || t[15] !== g ? (D = mE ? {
    onTouchStart: (E) => {
      c || (E.touches.length === 1 ? M({
        target: E.currentTarget,
        clientX: E.touches[0].clientX,
        clientY: E.touches[0].clientY
      }) : C());
    },
    onTouchEnd: () => {
      c || g && C();
    },
    onPointerMove: (E) => {
      g && E.pointerType === "touch" && (E.movementY !== 0 || E.movementX !== 0) && C();
    },
    onTouchCancel: () => {
      g && C();
    }
  } : {
    onMouseLeave: () => {
      g && C();
    },
    onMouseDown: (E) => {
      c || M({
        target: E.currentTarget,
        clientX: E.clientX,
        clientY: E.clientY
      });
    },
    onMouseUp: () => {
      c || g && C();
    },
    onContextMenu: () => {
      g && C();
    }
  }, t[12] = c, t[13] = M, t[14] = C, t[15] = g, t[16] = D) : D = t[16];
  const L = D;
  let $;
  return t[17] !== L || t[18] !== g || t[19] !== v ? ($ = [g, L, v], t[17] = L, t[18] = g, t[19] = v, t[20] = $) : $ = t[20], $;
}
const yE = "_root_1oiyj_1", vE = "_fade_1oiyj_22", bE = "_ripples_1oiyj_30", xE = "_ripple_1oiyj_30", SE = "_tapped_1oiyj_47", Br = (...n) => n.filter(Boolean).join(" "), wE = (n, t) => {
  const s = {
    ...n
  };
  for (const l of Object.keys(t)) {
    const r = n[l], u = t[l];
    s[l] = r ? (c) => {
      r(c), u(c);
    } : u;
  }
  return s;
}, Ge = ({
  as: n = "div",
  children: t,
  className: s = "",
  mode: l = "overlay",
  disabled: r = !1,
  ...u
}) => {
  const {
    isApple: c,
    isMaterial: d
  } = so(), [g, m] = j.useState({}), [y, v, b] = gE({
    mode: l,
    disabled: r,
    onTap: ({
      target: C,
      clientX: w,
      clientY: M
    }) => {
      if (!d || !C) return;
      const {
        x: _,
        y: R,
        width: D,
        height: L
      } = C.getBoundingClientRect(), $ = Math.max(D * 2, L * 2);
      m((E) => ({
        ...E,
        [`${performance.now()}`]: [w - _ - $ / 2, M - R - $ / 2, $]
      }));
    }
  }), T = l === "opacity", S = wE(u, v);
  return /* @__PURE__ */ p.jsxs(n, {
    ...S,
    disabled: r || void 0,
    className: Br(yE, s, T && Br(...b)),
    children: [t, c && !T && /* @__PURE__ */ p.jsx("div", {
      className: Br(vE, ...b)
    }), d && /* @__PURE__ */ p.jsx("div", {
      className: bE,
      children: Object.entries(g).map(([C, w]) => /* @__PURE__ */ p.jsx("span", {
        className: Br(xE, y && SE),
        style: {
          left: w[0],
          top: w[1],
          width: w[2],
          height: w[2]
        },
        onAnimationEnd: () => {
          y || m((M) => {
            const _ = {
              ...M
            };
            return delete _[C], _;
          });
        }
      }, C))
    })]
  });
}, CE = "_label_1w5sq_1", TE = "_accent_1w5sq_6", jE = "_description_1w5sq_10", zv = "_caption_1w5sq_14", EE = (n) => {
  const t = xt.c(15), {
    type: s,
    title: l,
    description: r,
    caption: u,
    bold: c
  } = n, d = c ? "medium" : "regular", g = `${CE} ${s === "Accent" ? TE : ""}`;
  let m;
  t[0] !== l || t[1] !== d ? (m = /* @__PURE__ */ p.jsx(ut, {
    variant: "body",
    weight: d,
    children: l
  }), t[0] = l, t[1] = d, t[2] = m) : m = t[2];
  let y;
  t[3] !== g || t[4] !== m ? (y = /* @__PURE__ */ p.jsx("div", {
    className: g,
    children: m
  }), t[3] = g, t[4] = m, t[5] = y) : y = t[5];
  let v;
  t[6] !== u || t[7] !== r ? (v = r && /* @__PURE__ */ p.jsx("div", {
    className: u ? jE : zv,
    children: /* @__PURE__ */ p.jsx(ut, {
      variant: u ? "subheadline1" : "subheadline2",
      weight: "regular",
      children: r
    })
  }), t[6] = u, t[7] = r, t[8] = v) : v = t[8];
  let b;
  t[9] !== u ? (b = u && /* @__PURE__ */ p.jsx("div", {
    className: zv,
    children: /* @__PURE__ */ p.jsx(ut, {
      variant: "subheadline2",
      weight: "regular",
      children: u
    })
  }), t[9] = u, t[10] = b) : b = t[10];
  let T;
  return t[11] !== y || t[12] !== v || t[13] !== b ? (T = /* @__PURE__ */ p.jsxs(p.Fragment, {
    children: [y, v, b]
  }), t[11] = y, t[12] = v, t[13] = b, t[14] = T) : T = t[14], T;
}, m3 = "_chevron_en74z_1", p3 = "_dropdown_en74z_8", _m = "_colorpicker_en74z_12", Dm = "_picker_en74z_63", AE = {
  chevron: m3,
  dropdown: p3,
  colorpicker: _m,
  picker: Dm
}, Vv = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  chevron: m3,
  colorpicker: _m,
  default: AE,
  dropdown: p3,
  picker: Dm
}, Symbol.toStringTag, { value: "Module" })), ME = (n) => {
  const t = xt.c(21), {
    type: s,
    className: l,
    children: r,
    value: u,
    onChange: c,
    inputRef: d,
    id: g,
    name: m,
    showValue: y
  } = n, v = m === void 0 ? "color" : m, b = y === void 0 ? !0 : y;
  if (s === "Picker") {
    let _;
    return t[0] !== r ? (_ = /* @__PURE__ */ p.jsx("div", {
      className: Dm,
      children: /* @__PURE__ */ p.jsx(ut, {
        variant: "body",
        weight: "regular",
        children: r
      })
    }), t[0] = r, t[1] = _) : _ = t[1], _;
  }
  if (s === "ColorPicker") {
    const _ = g || v;
    let R;
    t[2] !== _ || t[3] !== d || t[4] !== v || t[5] !== c || t[6] !== u ? (R = /* @__PURE__ */ p.jsx("input", {
      ref: d,
      type: "color",
      value: u,
      onChange: c,
      name: v,
      id: _
    }), t[2] = _, t[3] = d, t[4] = v, t[5] = c, t[6] = u, t[7] = R) : R = t[7];
    let D;
    t[8] !== _ || t[9] !== b || t[10] !== u ? (D = b && /* @__PURE__ */ p.jsx("label", {
      htmlFor: _,
      children: /* @__PURE__ */ p.jsx(ut, {
        variant: "body",
        weight: "regular",
        children: u
      })
    }), t[8] = _, t[9] = b, t[10] = u, t[11] = D) : D = t[11];
    let L;
    return t[12] !== R || t[13] !== D ? (L = /* @__PURE__ */ p.jsxs("div", {
      className: _m,
      children: [R, D]
    }), t[12] = R, t[13] = D, t[14] = L) : L = t[14], L;
  }
  const T = Vv[s.toLowerCase()], S = Vv[l];
  let C;
  t[15] !== T || t[16] !== S ? (C = [T, S].filter(Boolean), t[15] = T, t[16] = S, t[17] = C) : C = t[17];
  const w = C.join(" ");
  let M;
  return t[18] !== r || t[19] !== w ? (M = /* @__PURE__ */ p.jsx("div", {
    className: w,
    children: r
  }), t[18] = r, t[19] = w, t[20] = M) : M = t[20], M;
}, _E = (n) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5ZM15.1016 9.01953C14.7891 8.70711 14.2821 8.70711 13.9697 9.01953L12.001 10.9873L10.0342 9.02051C9.72176 8.70809 9.21574 8.70809 8.90332 9.02051C8.5909 9.33293 8.5909 9.83895 8.90332 10.1514L10.8701 12.1191L9.02051 13.9697C8.70809 14.2821 8.70809 14.7882 9.02051 15.1006C9.33293 15.413 9.83895 15.413 10.1514 15.1006L12.001 13.25L13.8525 15.1016C14.165 15.414 14.672 15.414 14.9844 15.1016C15.2968 14.7891 15.2968 14.2821 14.9844 13.9697L13.1328 12.1182L15.1016 10.1514C15.414 9.83895 15.414 9.33195 15.1016 9.01953Z", fill: "#3D3C3A" }))), DE = "_root_9aal5_1", RE = "_input_9aal5_5", NE = "_inputWithClearButton_9aal5_25", OE = "_clearButtonIcon_9aal5_29", LE = "_empty_9aal5_49", $E = "_icon_9aal5_61", BE = /* @__PURE__ */ j.forwardRef((n, t) => {
  const s = xt.c(24);
  let l, r, u, c, d, g;
  s[0] !== n ? ({
    label: l,
    value: g,
    onChange: r,
    onClear: u,
    ...c
  } = n, d = (_) => {
    r(_.target.value);
  }, s[0] = n, s[1] = l, s[2] = r, s[3] = u, s[4] = c, s[5] = d, s[6] = g) : (l = s[1], r = s[2], u = s[3], c = s[4], d = s[5], g = s[6]);
  const m = d, y = !g && LE;
  let v;
  s[7] !== y ? (v = [DE, y].filter(Boolean), s[7] = y, s[8] = v) : v = s[8];
  const b = v.join(" "), T = `${RE} ${u ? NE : ""}`, S = !r;
  let C;
  s[9] !== m || s[10] !== l || s[11] !== t || s[12] !== c || s[13] !== T || s[14] !== S || s[15] !== g ? (C = /* @__PURE__ */ p.jsx("input", {
    "aria-label": l,
    onChange: m,
    type: "text",
    className: T,
    placeholder: l,
    value: g,
    readOnly: S,
    ref: t,
    ...c
  }), s[9] = m, s[10] = l, s[11] = t, s[12] = c, s[13] = T, s[14] = S, s[15] = g, s[16] = C) : C = s[16];
  let w;
  s[17] !== l || s[18] !== u ? (w = u && /* @__PURE__ */ p.jsx("button", {
    type: "button",
    className: [$E, OE].filter(Boolean).join(" "),
    onClick: u,
    "aria-label": `Clear ${l}`,
    children: /* @__PURE__ */ p.jsx(_E, {})
  }), s[17] = l, s[18] = u, s[19] = w) : w = s[19];
  let M;
  return s[20] !== b || s[21] !== C || s[22] !== w ? (M = /* @__PURE__ */ p.jsxs(ut, {
    variant: "body",
    weight: "regular",
    className: b,
    children: [C, w]
  }), s[20] = b, s[21] = C, s[22] = w, s[23] = M) : M = s[23], M;
}), kv = "_root_1aqfj_1";
function zE(n) {
  const t = xt.c(15), {
    value: s,
    defaultValue: l,
    onChange: r,
    disabled: u,
    className: c
  } = n, d = l === void 0 ? !1 : l, g = u === void 0 ? !1 : u, m = s !== void 0, [y, v] = j.useState(d), b = m ? s : y;
  let T;
  t[0] !== r ? (T = (E) => {
    r && r(E);
  }, t[0] = r, t[1] = T) : T = t[1];
  const S = T;
  let C;
  t[2] !== b || t[3] !== S || t[4] !== m ? (C = () => {
    if (da.HapticFeedback.selectionChanged(), m) {
      S(!b);
      return;
    }
    v((E) => {
      const z = !E;
      return S(z), z;
    });
  }, t[2] = b, t[3] = S, t[4] = m, t[5] = C) : C = t[5];
  const w = C;
  let M;
  t[6] !== g || t[7] !== w ? (M = (E) => {
    E.stopPropagation(), !g && w();
  }, t[6] = g, t[7] = w, t[8] = M) : M = t[8];
  const _ = M, R = c ? `${kv} ${c}` : kv, D = g || void 0, L = g || void 0;
  let $;
  return t[9] !== b || t[10] !== R || t[11] !== _ || t[12] !== D || t[13] !== L ? ($ = /* @__PURE__ */ p.jsx("div", {
    className: R,
    "data-state": b,
    "data-disabled": D,
    onClick: _,
    role: "switch",
    "aria-checked": b,
    "aria-disabled": L
  }), t[9] = b, t[10] = R, t[11] = _, t[12] = D, t[13] = L, t[14] = $) : $ = t[14], $;
}
const VE = (n) => {
  const t = xt.c(29);
  let s, l, r, u, c, d, g;
  t[0] !== n ? ({
    start: u,
    children: s,
    value: g,
    defaultValue: c,
    onChange: l,
    disabled: d,
    ...r
  } = n, t[0] = n, t[1] = s, t[2] = l, t[3] = r, t[4] = u, t[5] = c, t[6] = d, t[7] = g) : (s = t[1], l = t[2], r = t[3], u = t[4], c = t[5], d = t[6], g = t[7]);
  const m = c === void 0 ? !1 : c, y = d === void 0 ? !1 : d, v = g !== void 0, [b, T] = j.useState(m), S = v ? g : b;
  let C;
  t[8] !== l ? (C = (E) => {
    l && l(E);
  }, t[8] = l, t[9] = C) : C = t[9];
  const w = C;
  let M;
  t[10] !== w || t[11] !== v ? (M = (E) => {
    v || T(E), w(E);
  }, t[10] = w, t[11] = v, t[12] = M) : M = t[12];
  const _ = M;
  let R;
  t[13] !== S || t[14] !== y || t[15] !== w || t[16] !== _ || t[17] !== v ? (R = () => {
    if (!y) {
      if (da.HapticFeedback.selectionChanged(), v) {
        _(!S);
        return;
      }
      T((E) => {
        const z = !E;
        return w(z), z;
      });
    }
  }, t[13] = S, t[14] = y, t[15] = w, t[16] = _, t[17] = v, t[18] = R) : R = t[18];
  const D = R;
  let L;
  t[19] !== S || t[20] !== y || t[21] !== _ ? (L = /* @__PURE__ */ p.jsx(ca.Part, {
    type: "Switch",
    children: /* @__PURE__ */ p.jsx(zE, {
      value: S,
      onChange: _,
      disabled: y
    })
  }), t[19] = S, t[20] = y, t[21] = _, t[22] = L) : L = t[22];
  let $;
  return t[23] !== s || t[24] !== D || t[25] !== r || t[26] !== u || t[27] !== L ? ($ = /* @__PURE__ */ p.jsx(ca, {
    start: u,
    end: L,
    onClick: D,
    ...r,
    children: s
  }), t[23] = s, t[24] = D, t[25] = r, t[26] = u, t[27] = L, t[28] = $) : $ = t[28], $;
}, Uv = "_root_146xt_10", kE = "_start_146xt_32", UE = "_image_146xt_37", HE = "_icon_146xt_45", qE = "_body_146xt_57", YE = "_end_146xt_65", GE = "_caption_146xt_76", PE = "_label_146xt_80", XE = (n) => {
  const t = xt.c(28);
  let s, l, r, u, c, d, g;
  t[0] !== n ? ({
    as: d,
    start: c,
    children: s,
    end: l,
    onClick: r,
    tappable: g,
    ...u
  } = n, t[0] = n, t[1] = s, t[2] = l, t[3] = r, t[4] = u, t[5] = c, t[6] = d, t[7] = g) : (s = t[1], l = t[2], r = t[3], u = t[4], c = t[5], d = t[6], g = t[7]);
  const m = d === void 0 ? "div" : d, y = g ?? (r != null || m !== "div");
  let v;
  t[8] !== c ? (v = c && /* @__PURE__ */ p.jsx("div", {
    className: kE,
    children: c
  }), t[8] = c, t[9] = v) : v = t[9];
  let b;
  t[10] !== s ? (b = /* @__PURE__ */ p.jsx("div", {
    className: qE,
    children: s
  }), t[10] = s, t[11] = b) : b = t[11];
  let T;
  t[12] !== l ? (T = l && /* @__PURE__ */ p.jsx("div", {
    className: YE,
    children: l
  }), t[12] = l, t[13] = T) : T = t[13];
  let S;
  t[14] !== v || t[15] !== b || t[16] !== T ? (S = /* @__PURE__ */ p.jsxs(p.Fragment, {
    children: [v, b, T]
  }), t[14] = v, t[15] = b, t[16] = T, t[17] = S) : S = t[17];
  const C = S;
  if (!y) {
    let M;
    return t[18] !== m || t[19] !== C || t[20] !== r || t[21] !== u ? (M = /* @__PURE__ */ p.jsx(m, {
      className: Uv,
      onClick: r,
      ...u,
      children: C
    }), t[18] = m, t[19] = C, t[20] = r, t[21] = u, t[22] = M) : M = t[22], M;
  }
  let w;
  return t[23] !== m || t[24] !== C || t[25] !== r || t[26] !== u ? (w = /* @__PURE__ */ p.jsx(Ge, {
    as: m,
    className: Uv,
    onClick: r,
    ...u,
    children: C
  }), t[23] = m, t[24] = C, t[25] = r, t[26] = u, t[27] = w) : w = t[27], w;
}, KE = (n) => {
  const t = xt.c(6), {
    type: s,
    src: l,
    iconType: r
  } = n, u = l === void 0 ? null : l, c = r === void 0 ? null : r;
  let d;
  t: switch (s) {
    case "Image": {
      let m;
      t[0] !== u ? (m = /* @__PURE__ */ p.jsx("img", {
        src: u,
        alt: "",
        className: UE
      }), t[0] = u, t[1] = m) : m = t[1], d = m;
      break t;
    }
    case "Icon": {
      let m;
      t[2] !== c ? (m = /* @__PURE__ */ p.jsx("div", {
        className: HE,
        children: c
      }), t[2] = c, t[3] = m) : m = t[3], d = m;
      break t;
    }
    default:
      d = null;
  }
  let g;
  return t[4] !== d ? (g = /* @__PURE__ */ p.jsx(p.Fragment, {
    children: d
  }), t[4] = d, t[5] = g) : g = t[5], g;
}, QE = (n) => {
  const t = xt.c(7), {
    label: s,
    caption: l
  } = n;
  let r;
  t[0] !== s ? (r = /* @__PURE__ */ p.jsx("div", {
    className: PE,
    children: /* @__PURE__ */ p.jsx(ut, {
      variant: "body",
      weight: "regular",
      children: s
    })
  }), t[0] = s, t[1] = r) : r = t[1];
  let u;
  t[2] !== l ? (u = l && /* @__PURE__ */ p.jsx("div", {
    className: GE,
    children: /* @__PURE__ */ p.jsx(ut, {
      variant: "subheadline2",
      weight: "regular",
      children: l
    })
  }), t[2] = l, t[3] = u) : u = t[3];
  let c;
  return t[4] !== r || t[5] !== u ? (c = /* @__PURE__ */ p.jsxs(p.Fragment, {
    children: [r, u]
  }), t[4] = r, t[5] = u, t[6] = c) : c = t[6], c;
}, ca = Object.assign(XE, {
  Start: KE,
  End: QE,
  Part: ME,
  Text: EE,
  Editable: BE,
  Switch: VE
});
xc.section;
pm[16];
function ZE(n, t, s) {
  const l = xt.c(8);
  let r;
  l[0] !== s ? (r = {}, l[0] = s, l[1] = r) : r = l[1];
  const {
    enabled: u
  } = r, c = u === void 0 ? !0 : u, d = j.useRef(t);
  let g;
  l[2] !== t ? (g = () => {
    d.current = t;
  }, l[2] = t, l[3] = g) : g = l[3], j.useEffect(g);
  let m, y;
  l[4] !== c || l[5] !== n ? (m = () => {
    if (!c)
      return;
    const v = n.current;
    if (!v)
      return;
    const b = new ResizeObserver((T) => {
      d.current(T[0]);
    });
    return b.observe(v), () => b.disconnect();
  }, y = [n, c], l[4] = c, l[5] = n, l[6] = m, l[7] = y) : (m = l[6], y = l[7]), j.useEffect(m, y);
}
const En = (n, t, s) => Math.min(Math.max(n, t), s), FE = (n, t) => {
  if (n === t) return !0;
  if (!n || !t) return !1;
  const s = Object.keys(n);
  if (s.length !== Object.keys(t).length) return !1;
  for (const l of s) if (n[l] !== t[l]) return !1;
  return !0;
};
function JE(n) {
  const t = xt.c(32), {
    isOpen: s,
    triggerRef: l,
    contentRef: r,
    initialPosition: u,
    calculate: c,
    deps: d,
    equals: g
  } = n;
  let m;
  t[0] !== d ? (m = d === void 0 ? [] : d, t[0] = d, t[1] = m) : m = t[1];
  const y = m, v = g === void 0 ? FE : g, [b, T] = j.useState(u), [S, C] = j.useState(!1), w = j.useRef(null);
  let M;
  t[2] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (M = () => {
    C(!1), w.current = null;
  }, t[2] = M) : M = t[2];
  const _ = M;
  let R;
  t[3] !== c || t[4] !== r || t[5] !== s || t[6] !== S || t[7] !== l ? (R = () => {
    if (!s || S || !l.current || !r.current)
      return;
    const z = l.current.getBoundingClientRect(), {
      width: k,
      height: Y
    } = r.current.getBoundingClientRect();
    w.current = {
      width: k,
      height: Y
    }, T(c(z, {
      width: k,
      height: Y
    })), C(!0);
  }, t[3] = c, t[4] = r, t[5] = s, t[6] = S, t[7] = l, t[8] = R) : R = t[8];
  let D;
  t[9] !== c || t[10] !== r || t[11] !== y || t[12] !== s || t[13] !== S || t[14] !== l ? (D = [s, S, l, r, c, ...y], t[9] = c, t[10] = r, t[11] = y, t[12] = s, t[13] = S, t[14] = l, t[15] = D) : D = t[15], j.useLayoutEffect(R, D);
  let L;
  t[16] !== c || t[17] !== v || t[18] !== s || t[19] !== S || t[20] !== l ? (L = () => {
    if (!s || !S)
      return;
    let z = null;
    const k = () => {
      if (z = null, !l.current || !w.current)
        return;
      const et = l.current.getBoundingClientRect(), nt = c(et, w.current);
      T((J) => v(J, nt) ? J : nt);
    }, Y = () => {
      z === null && (z = requestAnimationFrame(k));
    };
    return window.addEventListener("scroll", Y, !0), window.addEventListener("resize", Y), () => {
      z !== null && cancelAnimationFrame(z), window.removeEventListener("scroll", Y, !0), window.removeEventListener("resize", Y);
    };
  }, t[16] = c, t[17] = v, t[18] = s, t[19] = S, t[20] = l, t[21] = L) : L = t[21];
  let $;
  t[22] !== c || t[23] !== y || t[24] !== v || t[25] !== s || t[26] !== S || t[27] !== l ? ($ = [s, S, l, c, v, ...y], t[22] = c, t[23] = y, t[24] = v, t[25] = s, t[26] = S, t[27] = l, t[28] = $) : $ = t[28], j.useEffect(L, $);
  let E;
  return t[29] !== S || t[30] !== b ? (E = {
    position: b,
    isPositioned: S,
    resetPosition: _
  }, t[29] = S, t[30] = b, t[31] = E) : E = t[31], E;
}
const WE = (n, t, ...s) => {
  const l = xt.c(6), r = s, u = j.useRef(t);
  let c;
  l[0] !== t ? (c = () => {
    u.current = t;
  }, l[0] = t, l[1] = c) : c = l[1], j.useEffect(c);
  let d, g;
  l[2] !== n || l[3] !== r ? (d = () => {
    if (!n)
      return;
    const m = (y) => {
      r.every((v) => !v.current || !v.current.contains(y.target)) && u.current();
    };
    return document.addEventListener("mousedown", m), () => document.removeEventListener("mousedown", m);
  }, g = [n, ...r], l[2] = n, l[3] = r, l[4] = d, l[5] = g) : (d = l[4], g = l[5]), j.useEffect(d, g);
}, IE = /* @__PURE__ */ j.createContext({
  colorScheme: "light",
  setColorScheme: () => {
  },
  toggleColorScheme: () => {
  }
}), tA = ["light", "dark"], fh = (n) => tA.includes(n), dh = () => {
  if (typeof window > "u" || typeof document > "u")
    return null;
  const n = window.getComputedStyle(document.documentElement).getPropertyValue("--tg-color-scheme").trim();
  return fh(n) ? n : null;
}, g3 = () => typeof window > "u" || !window.matchMedia ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light", eA = () => dh() ?? g3(), nA = typeof window > "u" ? j.useEffect : j.useLayoutEffect, aA = (n) => {
  const t = xt.c(20), {
    children: s,
    defaultColorScheme: l,
    onColorSchemeChange: r
  } = n, [u, c] = j.useState(eA);
  let d;
  t[0] !== l ? (d = () => fh(l) ? l : null, t[0] = l, t[1] = d) : d = t[1];
  const [g, m] = j.useState(d), y = g ?? u;
  let v;
  t[2] !== y || t[3] !== r ? (v = ($) => {
    const E = typeof $ == "function" ? $(y) : $;
    fh(E) && (m(E), r?.(E));
  }, t[2] = y, t[3] = r, t[4] = v) : v = t[4];
  const b = v;
  let T;
  t[5] !== y || t[6] !== b ? (T = () => {
    b(y === "dark" ? "light" : "dark");
  }, t[5] = y, t[6] = b, t[7] = T) : T = t[7];
  const S = T;
  let C, w;
  t[8] !== y ? (C = () => {
    document.documentElement.dataset.colorScheme = y, document.body.dataset.colorScheme = y;
  }, w = [y], t[8] = y, t[9] = C, t[10] = w) : (C = t[9], w = t[10]), nA(C, w);
  let M, _;
  t[11] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (M = () => {
    const $ = () => {
      const k = dh();
      if (k) {
        c(k);
        return;
      }
      c(g3());
    }, E = (k) => {
      dh() || c(k.matches ? "dark" : "light");
    };
    $();
    const z = window.matchMedia("(prefers-color-scheme: dark)");
    return da.onEvent("themeChanged", $), z.addEventListener("change", E), () => {
      da.offEvent("themeChanged", $), z.removeEventListener("change", E);
    };
  }, _ = [], t[11] = M, t[12] = _) : (M = t[11], _ = t[12]), j.useEffect(M, _);
  let R;
  t[13] !== y || t[14] !== b || t[15] !== S ? (R = {
    colorScheme: y,
    setColorScheme: b,
    toggleColorScheme: S
  }, t[13] = y, t[14] = b, t[15] = S, t[16] = R) : R = t[16];
  const D = R;
  let L;
  return t[17] !== s || t[18] !== D ? (L = /* @__PURE__ */ p.jsx(IE.Provider, {
    value: D,
    children: s
  }), t[17] = s, t[18] = D, t[19] = L) : L = t[19], L;
}, iA = /* @__PURE__ */ j.forwardRef((n, t) => {
  const s = xt.c(11);
  let l, r, u, c;
  if (s[0] !== n) {
    const {
      to: m,
      onClick: y,
      children: v,
      ...b
    } = n;
    c = m, l = v, r = b, u = (T) => {
      y && y(T), T.defaultPrevented;
    }, s[0] = n, s[1] = l, s[2] = r, s[3] = u, s[4] = c;
  } else
    l = s[1], r = s[2], u = s[3], c = s[4];
  const d = u;
  let g;
  return s[5] !== l || s[6] !== d || s[7] !== r || s[8] !== t || s[9] !== c ? (g = /* @__PURE__ */ p.jsx(Ej, {
    ref: t,
    href: c,
    onClick: d,
    ...r,
    children: l
  }), s[5] = l, s[6] = d, s[7] = r, s[8] = t, s[9] = c, s[10] = g) : g = s[10], g;
});
iA.displayName = "TransitionLink";
const y3 = ({
  children: n
}) => n;
y3.isModalPage = !0;
y3.propTypes = {
  id: _n.string.isRequired,
  children: _n.node
};
xc.modal;
pm[16];
const sA = (n) => {
  const t = xt.c(2), {
    children: s
  } = n;
  let l;
  return t[0] !== s ? (l = /* @__PURE__ */ p.jsx(KT, {
    features: M8,
    strict: !0,
    children: s
  }), t[0] = s, t[1] = l) : l = t[1], l;
}, {
  setHeaderColor: lA,
  setBackgroundColor: oA
} = da, Rs = (n) => {
  const t = xt.c(18), {
    children: s,
    mode: l,
    headerColor: r,
    backgroundColor: u,
    expandOnMount: c
  } = n, d = l === void 0 ? "secondary" : l, {
    inDetailPane: g,
    setPaneBackground: m
  } = tE();
  let y;
  t[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (y = {
    primary: "bg_color",
    secondary: "secondary_bg_color"
  }, t[0] = y) : y = t[0];
  const v = y;
  let b;
  t[1] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (b = {
    primary: "--tg-theme-bg-color",
    secondary: "--tg-theme-secondary-bg-color"
  }, t[1] = b) : b = t[1];
  const T = b, S = r ? `#${r}` : v[d], C = u ? `#${u}` : v[d], w = u ? `#${u}` : `var(${T[d]})`;
  let M, _;
  t[2] !== c ? (M = () => {
    c && da.expand();
  }, _ = [c], t[2] = c, t[3] = M, t[4] = _) : (M = t[3], _ = t[4]), j.useEffect(M, _);
  let R, D;
  t[5] !== w || t[6] !== g || t[7] !== C || t[8] !== S ? (R = () => {
    g || (da.initData ? (oA(C), lA(S)) : document.body.style.backgroundColor = w, document.body.style.setProperty("--page-background", w));
  }, D = [C, S, w, g], t[5] = w, t[6] = g, t[7] = C, t[8] = S, t[9] = R, t[10] = D) : (R = t[9], D = t[10]), j.useEffect(R, D);
  let L, $;
  t[11] !== w || t[12] !== g || t[13] !== m ? (L = () => {
    !g || !m || m(w);
  }, $ = [g, m, w], t[11] = w, t[12] = g, t[13] = m, t[14] = L, t[15] = $) : (L = t[14], $ = t[15]), j.useEffect(L, $);
  let E;
  return t[16] !== s ? (E = /* @__PURE__ */ p.jsx(p.Fragment, {
    children: s
  }), t[16] = s, t[17] = E) : E = t[17], E;
};
Rs.propTypes = {
  children: _n.node,
  mode: _n.oneOf(["primary", "secondary"]),
  headerColor: _n.string,
  backgroundColor: _n.string,
  expandOnMount: _n.bool
};
const rA = "_root_125s3_1", cA = "_card_125s3_16", uA = "_container_125s3_22", xd = "flex justify-between gap-compact px-content py-10 text-section";
function Hv(n) {
  const t = xt.c(27);
  let s, l, r, u;
  switch (t[0] !== n ? ({
    type: r,
    title: l,
    value: u,
    ...s
  } = n, t[0] = n, t[1] = s, t[2] = l, t[3] = r, t[4] = u) : (s = t[1], l = t[2], r = t[3], u = t[4]), r) {
    case "Headline": {
      let c;
      t[5] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (c = uE(xd, "text-foreground"), t[5] = c) : c = t[5];
      let d;
      t[6] !== l ? (d = /* @__PURE__ */ p.jsx(ut, {
        variant: "title3",
        weight: "bold",
        children: l
      }), t[6] = l, t[7] = d) : d = t[7];
      let g;
      t[8] !== u ? (g = u && /* @__PURE__ */ p.jsx(ut, {
        variant: "title3",
        weight: "bold",
        children: u
      }), t[8] = u, t[9] = g) : g = t[9];
      let m;
      return t[10] !== s || t[11] !== d || t[12] !== g ? (m = /* @__PURE__ */ p.jsxs("div", {
        className: c,
        ...s,
        children: [d, g]
      }), t[10] = s, t[11] = d, t[12] = g, t[13] = m) : m = t[13], m;
    }
    case "Footer": {
      let c;
      t[14] !== l ? (c = /* @__PURE__ */ p.jsx(ut, {
        variant: "footnote",
        children: l
      }), t[14] = l, t[15] = c) : c = t[15];
      let d;
      return t[16] !== s || t[17] !== c ? (d = /* @__PURE__ */ p.jsx("div", {
        className: xd,
        ...s,
        children: c
      }), t[16] = s, t[17] = c, t[18] = d) : d = t[18], d;
    }
    default: {
      let c;
      t[19] !== l ? (c = /* @__PURE__ */ p.jsx(ut, {
        variant: "body",
        weight: "semibold",
        children: l
      }), t[19] = l, t[20] = c) : c = t[20];
      let d;
      t[21] !== u ? (d = u && /* @__PURE__ */ p.jsx(ut, {
        variant: "footnote",
        children: u
      }), t[21] = u, t[22] = d) : d = t[22];
      let g;
      return t[23] !== s || t[24] !== c || t[25] !== d ? (g = /* @__PURE__ */ p.jsxs("div", {
        className: xd,
        ...s,
        children: [c, d]
      }), t[23] = s, t[24] = c, t[25] = d, t[26] = g) : g = t[26], g;
    }
  }
}
const fA = xc.section, dA = pm[16], hA = 0.6, pt = (n) => {
  const t = xt.c(6);
  let s, l;
  t[0] !== n ? ({
    children: s,
    ...l
  } = n, t[0] = n, t[1] = s, t[2] = l) : (s = t[1], l = t[2]);
  let r;
  return t[3] !== s || t[4] !== l ? (r = /* @__PURE__ */ p.jsx("section", {
    className: rA,
    ...l,
    children: s
  }), t[3] = s, t[4] = l, t[5] = r) : r = t[5], r;
}, mA = (n) => {
  const t = xt.c(21);
  let s, l, r, u;
  t[0] !== n ? ({
    children: s,
    header: r,
    description: l,
    ...u
  } = n, t[0] = n, t[1] = s, t[2] = l, t[3] = r, t[4] = u) : (s = t[1], l = t[2], r = t[3], u = t[4]);
  const {
    isApple: c
  } = so(), d = j.useRef(null), g = j.useRef(null), m = c ? fA : dA;
  let y;
  t[5] !== m ? (y = {
    radius: m,
    smoothing: hA
  }, t[5] = m, t[6] = y) : y = t[6];
  let v;
  t[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = {
    autoEffects: !1
  }, t[7] = v) : v = t[7], jx(c ? g : d, y, v);
  let b;
  t[8] !== r ? (b = r && /* @__PURE__ */ p.jsx(Hv, {
    title: r
  }), t[8] = r, t[9] = b) : b = t[9];
  let T;
  t[10] !== s ? (T = /* @__PURE__ */ p.jsx("div", {
    ref: g,
    className: uA,
    children: s
  }), t[10] = s, t[11] = T) : T = t[11];
  let S;
  t[12] !== b || t[13] !== T ? (S = /* @__PURE__ */ p.jsxs("div", {
    ref: d,
    className: cA,
    children: [b, T]
  }), t[12] = b, t[13] = T, t[14] = S) : S = t[14];
  let C;
  t[15] !== l ? (C = l && /* @__PURE__ */ p.jsx(Hv, {
    type: "Footer",
    title: l
  }), t[15] = l, t[16] = C) : C = t[16];
  let w;
  return t[17] !== u || t[18] !== S || t[19] !== C ? (w = /* @__PURE__ */ p.jsxs("section", {
    ...u,
    children: [S, C]
  }), t[17] = u, t[18] = S, t[19] = C, t[20] = w) : w = t[20], w;
};
pt.Item = mA;
const qv = 1e3;
function pA(n, t, s = "vertical") {
  const l = n / t;
  if (Math.abs(l) >= Math.PI / 2) return null;
  const r = (t * Math.sin(l) - n).toFixed(2), u = (t * (Math.cos(l) - 1)).toFixed(2), c = (l * 180 / Math.PI).toFixed(2);
  return s === "horizontal" ? `perspective(${qv}px) translateX(${r}px) translateZ(${u}px) rotateY(${c}deg)` : `perspective(${qv}px) translateY(${r}px) translateZ(${u}px) rotateX(${-c}deg)`;
}
const gA = "_root_cnxqv_1", yA = "_icon_cnxqv_17", vA = "_content_cnxqv_42", bA = "_title_cnxqv_55", xA = "_description_cnxqv_56", SA = "_action_cnxqv_61", wA = "_link_cnxqv_61", CA = "_host_cnxqv_92", TA = "_host_top_cnxqv_105", jA = "_host_bottom_cnxqv_109", EA = "_item_cnxqv_114", AA = (n) => {
  const t = xt.c(19), {
    icon: s,
    title: l,
    description: r,
    link: u,
    action: c
  } = n, d = !!r;
  let g;
  t[0] !== s ? (g = s ? /* @__PURE__ */ p.jsx("div", {
    className: yA,
    "aria-hidden": "true",
    children: s
  }) : null, t[0] = s, t[1] = g) : g = t[1];
  const m = d ? "semibold" : void 0;
  let y;
  t[2] !== m || t[3] !== l ? (y = /* @__PURE__ */ p.jsx(ut, {
    as: "p",
    className: bA,
    variant: "subheadline2",
    weight: m,
    children: l
  }), t[2] = m, t[3] = l, t[4] = y) : y = t[4];
  let v;
  t[5] !== r ? (v = r ? /* @__PURE__ */ p.jsx(ut, {
    as: "p",
    className: xA,
    variant: "subheadline2",
    children: r
  }) : null, t[5] = r, t[6] = v) : v = t[6];
  let b;
  t[7] !== u ? (b = u ? /* @__PURE__ */ p.jsx("button", {
    type: "button",
    className: wA,
    onClick: u.onClick,
    children: /* @__PURE__ */ p.jsx(ut, {
      as: "span",
      variant: "subheadline2",
      children: u.label
    })
  }) : null, t[7] = u, t[8] = b) : b = t[8];
  let T;
  t[9] !== y || t[10] !== v || t[11] !== b ? (T = /* @__PURE__ */ p.jsxs("div", {
    className: vA,
    children: [y, v, b]
  }), t[9] = y, t[10] = v, t[11] = b, t[12] = T) : T = t[12];
  let S;
  t[13] !== c ? (S = c ? /* @__PURE__ */ p.jsx("button", {
    type: "button",
    className: SA,
    onClick: c.onClick,
    children: /* @__PURE__ */ p.jsx(ut, {
      as: "span",
      variant: "body",
      children: c.label
    })
  }) : null, t[13] = c, t[14] = S) : S = t[14];
  let C;
  return t[15] !== g || t[16] !== T || t[17] !== S ? (C = /* @__PURE__ */ p.jsxs("div", {
    className: gA,
    role: "status",
    "aria-live": "polite",
    children: [g, T, S]
  }), t[15] = g, t[16] = T, t[17] = S, t[18] = C) : C = t[18], C;
};
_n.shape({
  label: _n.node.isRequired,
  onClick: _n.func
});
const MA = 4e3, _A = 100, DA = 500, RA = (n) => {
  if (n)
    try {
      da.HapticFeedback?.notificationOccurred(n);
    } catch {
    }
}, NA = (n) => {
  const t = xt.c(45), {
    item: s,
    onDismiss: l
  } = n, {
    id: r,
    icon: u,
    title: c,
    description: d,
    link: g,
    action: m,
    position: y,
    duration: v,
    type: b
  } = s, T = y === void 0 ? "bottom" : y, S = v === void 0 ? MA : v, C = D8(), [w, M] = j.useState(!1), [_, R] = j.useState(0);
  let D;
  t[0] !== r || t[1] !== l ? (D = () => l(r), t[0] = r, t[1] = l, t[2] = D) : D = t[2];
  const L = D;
  let $, E;
  t[3] !== b ? ($ = () => {
    RA(b);
  }, E = [b], t[3] = b, t[4] = $, t[5] = E) : ($ = t[4], E = t[5]), j.useEffect($, E);
  let z, k;
  t[6] !== L || t[7] !== S || t[8] !== w ? (z = () => {
    if (!S || w)
      return;
    const gt = setTimeout(L, S);
    return () => clearTimeout(gt);
  }, k = [S, w, L], t[6] = L, t[7] = S, t[8] = w, t[9] = z, t[10] = k) : (z = t[9], k = t[10]), j.useEffect(z, k);
  const Y = T === "top" ? -32 : 32, et = b === "error";
  let nt;
  t[11] !== C || t[12] !== Y ? (nt = C ? {
    opacity: 0
  } : {
    opacity: 0,
    y: Y,
    scale: 0.96
  }, t[11] = C, t[12] = Y, t[13] = nt) : nt = t[13];
  const J = nt;
  let Q;
  t[14] !== et || t[15] !== C ? (Q = C ? {
    opacity: 1
  } : {
    opacity: 1,
    y: 0,
    scale: 1,
    x: et ? [0, -10, 10, -7, 7, -3, 3, 0] : 0,
    transition: {
      default: Ul.SNACKBAR,
      ...et && {
        x: {
          duration: 0.45,
          ease: "easeOut",
          delay: 0.18
        }
      }
    }
  }, t[14] = et, t[15] = C, t[16] = Q) : Q = t[16];
  const W = Q;
  let O;
  t[17] !== _ || t[18] !== C || t[19] !== Y ? (O = C ? {
    opacity: 0,
    transition: {
      duration: 0.15
    }
  } : {
    opacity: 0,
    x: _ * 400,
    y: _ === 0 ? Y : 0,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }, t[17] = _, t[18] = C, t[19] = Y, t[20] = O) : O = t[20];
  const U = O;
  let X;
  t[21] !== L ? (X = (gt, bt) => {
    M(!1);
    const Dt = bt.offset.x, Ot = bt.velocity.x;
    (Math.abs(Dt) > _A || Math.abs(Ot) > DA) && (R(Dt >= 0 ? 1 : -1), L());
  }, t[21] = L, t[22] = X) : X = t[22];
  const it = X;
  let ot;
  t[23] !== L ? (ot = (gt) => {
    if (gt)
      return {
        ...gt,
        onClick: () => {
          gt.onClick?.(), L();
        }
      };
  }, t[23] = L, t[24] = ot) : ot = t[24];
  const N = ot, q = C ? !1 : "x";
  let tt;
  t[25] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (tt = () => M(!0), t[25] = tt) : tt = t[25];
  let lt;
  t[26] !== g || t[27] !== N ? (lt = N(g), t[26] = g, t[27] = N, t[28] = lt) : lt = t[28];
  let F;
  t[29] !== m || t[30] !== N ? (F = N(m), t[29] = m, t[30] = N, t[31] = F) : F = t[31];
  let rt;
  t[32] !== d || t[33] !== u || t[34] !== lt || t[35] !== F || t[36] !== c ? (rt = /* @__PURE__ */ p.jsx(AA, {
    icon: u,
    title: c,
    description: d,
    link: lt,
    action: F
  }), t[32] = d, t[33] = u, t[34] = lt, t[35] = F, t[36] = c, t[37] = rt) : rt = t[37];
  let ct;
  return t[38] !== W || t[39] !== U || t[40] !== it || t[41] !== J || t[42] !== q || t[43] !== rt ? (ct = /* @__PURE__ */ p.jsx(fa, {
    className: EA,
    initial: J,
    animate: W,
    exit: U,
    layout: !0,
    drag: q,
    dragSnapToOrigin: !0,
    dragElastic: 0.6,
    dragMomentum: !1,
    onDragStart: tt,
    onDragEnd: it,
    children: rt
  }), t[38] = W, t[39] = U, t[40] = it, t[41] = J, t[42] = q, t[43] = rt, t[44] = ct) : ct = t[44], ct;
}, v3 = {
  top: TA,
  bottom: jA
}, OA = Object.keys(v3), LA = (n) => {
  const t = xt.c(5), {
    snackbars: s,
    onDismiss: l
  } = n;
  let r;
  t[0] !== l || t[1] !== s ? (r = OA.map((c) => {
    const d = s.filter((g) => (g.position ?? "bottom") === c);
    return /* @__PURE__ */ p.jsx("div", {
      className: `${CA} ${v3[c]}`,
      children: /* @__PURE__ */ p.jsx(Ts, {
        initial: !1,
        children: d.map((g) => /* @__PURE__ */ p.jsx(NA, {
          item: g,
          onDismiss: l
        }, g.id))
      })
    }, c);
  }), t[0] = l, t[1] = s, t[2] = r) : r = t[2];
  let u;
  return t[3] !== r ? (u = /* @__PURE__ */ io.createPortal(/* @__PURE__ */ p.jsx(p.Fragment, {
    children: r
  }), document.body), t[3] = r, t[4] = u) : u = t[4], u;
}, b3 = /* @__PURE__ */ j.createContext(null), $A = () => {
  const n = j.useContext(b3);
  if (!n)
    throw new Error("useSnackbar must be used inside <SnackbarProvider>");
  return n;
}, BA = (n) => {
  const t = xt.c(9), {
    children: s
  } = n;
  let l;
  t[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (l = [], t[0] = l) : l = t[0];
  const [r, u] = j.useState(l), c = j.useRef(0);
  let d;
  t[1] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (d = (S) => {
    u((C) => C.filter((w) => w.id !== S));
  }, t[1] = d) : d = t[1];
  const g = d;
  let m;
  t[2] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (m = (S) => {
    c.current = c.current + 1;
    const C = c.current;
    return u((w) => [...w, {
      id: C,
      ...S
    }]), C;
  }, t[2] = m) : m = t[2];
  const y = m;
  let v;
  t[3] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = {
    show: y,
    dismiss: g
  }, t[3] = v) : v = t[3];
  let b;
  t[4] !== r ? (b = /* @__PURE__ */ p.jsx(LA, {
    snackbars: r,
    onDismiss: g
  }), t[4] = r, t[5] = b) : b = t[5];
  let T;
  return t[6] !== s || t[7] !== b ? (T = /* @__PURE__ */ p.jsxs(b3.Provider, {
    value: v,
    children: [s, b]
  }), t[6] = s, t[7] = b, t[8] = T) : T = t[8], T;
}, zA = (n) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/loader" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", d: "M12 3.02148C16.9704 3.02148 20.9997 7.07957 21 12.0859C21 17.0925 16.9706 21.1514 12 21.1514C7.02944 21.1514 3 17.0925 3 12.0859C3.00026 11.5299 3.44787 11.0791 4 11.0791C4.55213 11.0791 4.99974 11.5299 5 12.0859C5 15.9799 8.13401 19.1367 12 19.1367C15.866 19.1367 19 15.9799 19 12.0859C18.9997 8.19215 15.8658 5.03613 12 5.03613C9.64439 5.03613 7.56033 6.20674 6.29004 8.00684C5.97018 8.46016 5.34566 8.56708 4.89551 8.24512C4.44533 7.92286 4.33924 7.29328 4.65918 6.83984C6.28848 4.53074 8.96935 3.02148 12 3.02148Z", fill: "#3D3C3A" }))), VA = "_centered_1ma1e_1", kA = "_spinner_1ma1e_8", Sc = (n) => {
  const t = xt.c(15);
  let s, l, r, u;
  t[0] !== n ? ({
    centered: s,
    className: l,
    size: u,
    ...r
  } = n, t[0] = n, t[1] = s, t[2] = l, t[3] = r, t[4] = u) : (s = t[1], l = t[2], r = t[3], u = t[4]);
  let c;
  t[5] !== l ? (c = [kA, l].filter(Boolean), t[5] = l, t[6] = c) : c = t[6];
  const d = c.join(" ");
  let g;
  t[7] !== u ? (g = u ? {
    width: u,
    height: u
  } : void 0, t[7] = u, t[8] = g) : g = t[8];
  const m = g;
  let y;
  t[9] !== d || t[10] !== r || t[11] !== m ? (y = /* @__PURE__ */ p.jsx(zA, {
    ...r,
    className: d,
    style: m
  }), t[9] = d, t[10] = r, t[11] = m, t[12] = y) : y = t[12];
  const v = y;
  if (s) {
    let b;
    return t[13] !== v ? (b = /* @__PURE__ */ p.jsx("div", {
      className: VA,
      children: v
    }), t[13] = v, t[14] = b) : b = t[14], b;
  }
  return v;
}, UA = "_root_warzp_1", HA = "_gradient_warzp_71", qA = "_clipPathContainer_warzp_113", YA = "_tab_1mynw_1", GA = "_icon_1mynw_37", PA = "_active_1mynw_62", x3 = (n) => {
  const t = xt.c(21);
  let s, l, r, u, c, d;
  t[0] !== n ? ({
    isActive: l,
    onClick: u,
    label: r,
    icon: s,
    className: d,
    ...c
  } = n, t[0] = n, t[1] = s, t[2] = l, t[3] = r, t[4] = u, t[5] = c, t[6] = d) : (s = t[1], l = t[2], r = t[3], u = t[4], c = t[5], d = t[6]);
  const g = d === void 0 ? "" : d;
  let m;
  t[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (m = {
    type: "spring",
    stiffness: 800,
    damping: 50
  }, t[7] = m) : m = t[7];
  const y = `${YA} ${l ? PA : ""} ${g}`;
  let v;
  t[8] !== y ? (v = y.trim(), t[8] = y, t[9] = v) : v = t[9];
  let b;
  t[10] !== s ? (b = /* @__PURE__ */ p.jsx(fa, {
    layout: !0,
    className: GA,
    children: s
  }), t[10] = s, t[11] = b) : b = t[11];
  let T;
  t[12] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (T = {
    display: "inline-block"
  }, t[12] = T) : T = t[12];
  let S;
  t[13] !== r ? (S = /* @__PURE__ */ p.jsx(LC, {
    layout: !0,
    style: T,
    children: r
  }), t[13] = r, t[14] = S) : S = t[14];
  let C;
  return t[15] !== u || t[16] !== c || t[17] !== v || t[18] !== b || t[19] !== S ? (C = /* @__PURE__ */ p.jsxs(fa, {
    layout: !0,
    transition: m,
    ...c,
    className: v,
    onClick: u,
    children: [b, S]
  }), t[15] = u, t[16] = c, t[17] = v, t[18] = b, t[19] = S, t[20] = C) : C = t[20], C;
};
function XA({
  tabsLength: n,
  activeIndex: t,
  onSnapToSame: s,
  onSnapToNew: l,
  spring: r
}) {
  const u = j.useRef(null), [c, d] = j.useState(!1), [g, m] = j.useState(null), y = j.useRef(null), v = j.useRef(!1), b = j.useRef(null), T = j.useRef(0), S = 6, C = 100 / n, w = `calc(${C}% + 7.33px - 4px)`, M = `calc(${C * t}% - ${3.67 * t}px)`, _ = M, R = `calc(100% - (${M} + ${w}) - 2.33px * ${t})`, D = c && g != null ? `inset(0 ${100 - (g + C)}% 0 ${g}% round 100px)` : `inset(0 ${R} 0 ${_} round 100px)`, L = c ? {
    clipPath: {
      duration: 0
    }
  } : {
    clipPath: r
  }, $ = (J) => {
    const Q = u.current;
    if (!Q) return;
    const W = Q.getBoundingClientRect(), O = J - W.left, U = W.width;
    if (U <= 0) return;
    const X = O / U * 100, it = En(X - C / 2, 0, 100 - C);
    m(it);
  }, E = (J) => {
    v.current = !0, b.current = J.pointerId, T.current = J.clientX;
  }, z = (J) => {
    if (!(b.current != null && J.pointerId !== b.current)) {
      if (!c) {
        if (!v.current) return;
        if (Math.abs(J.clientX - T.current) >= S) {
          try {
            J.currentTarget.setPointerCapture?.(J.pointerId), y.current = J.pointerId;
          } catch {
          }
          d(!0), $(J.clientX), J.preventDefault();
        }
        return;
      }
      y.current != null && J.pointerId !== y.current || ($(J.clientX), J.preventDefault());
    }
  }, k = (J) => {
    const Q = u.current;
    let W = t;
    if (Q && typeof J == "number") {
      const O = Q.getBoundingClientRect(), U = J - O.left, X = O.width;
      if (X > 0) {
        const it = X / n;
        W = En(Math.round(U / it - 0.5), 0, n - 1);
      }
    } else if (g != null) {
      const O = 100 / n;
      W = En(Math.round(g / O), 0, n - 1);
    }
    W === t ? s?.() : l?.(W), d(!1), m(null), y.current = null;
  }, Y = (J) => {
    if (v.current = !1, b.current = null, !!c && !(y.current != null && J.pointerId !== y.current)) {
      try {
        J.currentTarget.releasePointerCapture?.(J.pointerId);
      } catch {
      }
      k(J.clientX), J.preventDefault();
    }
  }, et = (J) => {
    v.current = !1, b.current = null, c && (k(J?.clientX), J.preventDefault?.());
  }, nt = (J) => {
    c && k(J?.clientX);
  };
  return j.useEffect(() => {
    const J = () => {
      d(!1), m(null), y.current = null, v.current = !1, b.current = null;
    };
    return window.addEventListener("blur", J), () => window.removeEventListener("blur", J);
  }, []), {
    overlayRef: u,
    isDragging: c,
    animate: {
      clipPath: D
    },
    transition: L,
    handlers: {
      onPointerDown: E,
      onPointerMove: z,
      onPointerUp: Y,
      onPointerCancel: et,
      onPointerLeave: nt
    }
  };
}
function KA(n) {
  const t = xt.c(40), {
    width: s,
    height: l,
    insets: r,
    innerHeight: u,
    className: c
  } = n;
  let d;
  t[0] !== r ? (d = r === void 0 ? {
    top: 21,
    right: 21,
    bottom: 21,
    left: 21
  } : r, t[0] = r, t[1] = d) : d = t[1];
  const g = d, m = u === void 0 ? 64 : u, y = j.useId();
  if (!s || !l)
    return null;
  const {
    top: v,
    right: b,
    bottom: T,
    left: S
  } = g, C = s + S + b, w = m + v + T, M = Math.max(0, C - S - b), _ = Math.min(m / 2, M / 2, 999), R = `grad-${y}`, D = `mask-${y}`, L = Math.max(S, b), $ = Math.max(v, T), E = `0 0 ${C} ${w}`;
  let z;
  t[2] !== c ? (z = [HA, c].filter(Boolean), t[2] = c, t[3] = z) : z = t[3];
  const k = z.join(" "), Y = `${L}px`, et = `${$}px`;
  let nt;
  t[4] !== Y || t[5] !== et ? (nt = {
    "--overlay-padding-x": Y,
    "--overlay-padding-y": et
  }, t[4] = Y, t[5] = et, t[6] = nt) : nt = t[6];
  let J, Q;
  t[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (J = /* @__PURE__ */ p.jsx("stop", {
    offset: "0%",
    stopColor: "var(--mask-color)",
    stopOpacity: "var(--mask-opacity-top)"
  }), Q = /* @__PURE__ */ p.jsx("stop", {
    offset: "100%",
    stopColor: "var(--mask-color)",
    stopOpacity: "var(--mask-opacity-bottom)"
  }), t[7] = J, t[8] = Q) : (J = t[7], Q = t[8]);
  let W;
  t[9] !== R ? (W = /* @__PURE__ */ p.jsxs("linearGradient", {
    id: R,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1",
    children: [J, Q]
  }), t[9] = R, t[10] = W) : W = t[10];
  let O;
  t[11] !== w || t[12] !== C ? (O = /* @__PURE__ */ p.jsx("rect", {
    x: "0",
    y: "0",
    width: C,
    height: w,
    fill: "var(--ui-static-white)"
  }), t[11] = w, t[12] = C, t[13] = O) : O = t[13];
  let U;
  t[14] !== m || t[15] !== M || t[16] !== S || t[17] !== _ || t[18] !== v ? (U = /* @__PURE__ */ p.jsx("rect", {
    x: S,
    y: v,
    width: M,
    height: m,
    rx: _,
    ry: _,
    fill: "var(--ui-static-black)"
  }), t[14] = m, t[15] = M, t[16] = S, t[17] = _, t[18] = v, t[19] = U) : U = t[19];
  let X;
  t[20] !== D || t[21] !== O || t[22] !== U ? (X = /* @__PURE__ */ p.jsxs("mask", {
    id: D,
    maskUnits: "userSpaceOnUse",
    children: [O, U]
  }), t[20] = D, t[21] = O, t[22] = U, t[23] = X) : X = t[23];
  let it;
  t[24] !== W || t[25] !== X ? (it = /* @__PURE__ */ p.jsxs("defs", {
    children: [W, X]
  }), t[24] = W, t[25] = X, t[26] = it) : it = t[26];
  const ot = `url(#${R})`, N = `url(#${D})`;
  let q;
  t[27] !== w || t[28] !== C || t[29] !== ot || t[30] !== N ? (q = /* @__PURE__ */ p.jsx("rect", {
    width: C,
    height: w,
    fill: ot,
    mask: N
  }), t[27] = w, t[28] = C, t[29] = ot, t[30] = N, t[31] = q) : q = t[31];
  let tt;
  return t[32] !== w || t[33] !== C || t[34] !== it || t[35] !== q || t[36] !== E || t[37] !== k || t[38] !== nt ? (tt = /* @__PURE__ */ p.jsxs("svg", {
    width: C,
    height: w,
    viewBox: E,
    preserveAspectRatio: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: k,
    style: nt,
    "aria-hidden": !0,
    children: [it, q]
  }), t[32] = w, t[33] = C, t[34] = it, t[35] = q, t[36] = E, t[37] = k, t[38] = nt, t[39] = tt) : tt = t[39], tt;
}
const QA = (n) => {
  const t = xt.c(24), {
    tabs: s,
    activeIndex: l,
    onChange: r
  } = n;
  let u;
  t[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (u = {
    type: "spring",
    stiffness: 800,
    damping: 50
  }, t[0] = u) : u = t[0];
  let c;
  t[1] !== l || t[2] !== r || t[3] !== s.length ? (c = {
    tabsLength: s.length,
    activeIndex: l,
    spring: u,
    onSnapToNew: r
  }, t[1] = l, t[2] = r, t[3] = s.length, t[4] = c) : c = t[4];
  const {
    overlayRef: d,
    animate: g,
    transition: m,
    handlers: y
  } = XA(c);
  let v;
  t[5] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = {
    opacity: 0
  }, t[5] = v) : v = t[5];
  let b;
  t[6] !== g ? (b = {
    opacity: 1,
    ...g
  }, t[6] = g, t[7] = b) : b = t[7];
  let T;
  t[8] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (T = {
    duration: 0.2
  }, t[8] = T) : T = t[8];
  let S;
  t[9] !== m.clipPath ? (S = {
    default: T,
    clipPath: m.clipPath
  }, t[9] = m.clipPath, t[10] = S) : S = t[10];
  let C;
  if (t[11] !== l || t[12] !== r || t[13] !== s) {
    let M;
    t[15] !== l || t[16] !== r ? (M = (_, R) => /* @__PURE__ */ p.jsx(x3, {
      isActive: R === l,
      onClick: () => r(R),
      "data-overlay": !0,
      ..._
    }, R), t[15] = l, t[16] = r, t[17] = M) : M = t[17], C = s.map(M), t[11] = l, t[12] = r, t[13] = s, t[14] = C;
  } else
    C = t[14];
  let w;
  return t[18] !== y || t[19] !== d || t[20] !== b || t[21] !== S || t[22] !== C ? (w = /* @__PURE__ */ p.jsx(fa, {
    className: qA,
    ref: d,
    ...y,
    initial: v,
    animate: b,
    transition: S,
    children: C
  }), t[18] = y, t[19] = d, t[20] = b, t[21] = S, t[22] = C, t[23] = w) : w = t[23], w;
}, ZA = (n) => {
  const t = xt.c(43), {
    tabs: s,
    onChange: l,
    defaultIndex: r
  } = n, u = r === void 0 ? 0 : r, {
    isApple: c
  } = so(), [d, g] = j.useState(u);
  let m, y;
  t[0] !== u ? (m = () => {
    g(u);
  }, y = [u], t[0] = u, t[1] = m, t[2] = y) : (m = t[1], y = t[2]), j.useEffect(m, y);
  let v, b;
  t[3] !== s.length ? (v = () => {
    g((it) => Math.min(it, s.length - 1));
  }, b = [s.length], t[3] = s.length, t[4] = v, t[5] = b) : (v = t[4], b = t[5]), j.useEffect(v, b);
  let T;
  t[6] !== d || t[7] !== l ? (T = (it) => {
    it !== d && (g(it), l?.(it));
  }, t[6] = d, t[7] = l, t[8] = T) : T = t[8];
  const S = T, C = j.useRef(null), [w, M] = j.useState(0);
  let _;
  t[9] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (_ = (it) => {
    M(it.contentRect.width);
  }, t[9] = _) : _ = t[9], ZE(C, _);
  const R = s.length === 3 ? 54 : 21;
  let D;
  t[10] !== c || t[11] !== R ? (D = c ? {
    left: R,
    right: R,
    width: `calc(100% - ${R * 2}px)`
  } : {}, t[10] = c, t[11] = R, t[12] = D) : D = t[12];
  const L = D;
  let $;
  t[13] !== R ? ($ = {
    top: 21,
    bottom: 21,
    left: R,
    right: R
  }, t[13] = R, t[14] = $) : $ = t[14];
  const E = $;
  let z, k;
  t[15] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (z = {
    scale: 1.02
  }, k = {
    scale: {
      type: "spring",
      stiffness: 800,
      damping: 40
    }
  }, t[15] = z, t[16] = k) : (z = t[15], k = t[16]);
  let Y;
  t[17] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (Y = {
    display: "flex",
    width: "100%",
    position: "relative",
    zIndex: 1
  }, t[17] = Y) : Y = t[17];
  let et;
  if (t[18] !== d || t[19] !== S || t[20] !== s) {
    let it;
    t[22] !== d || t[23] !== S ? (it = (ot, N) => /* @__PURE__ */ p.jsx(x3, {
      isActive: N === d,
      onClick: () => S(N),
      ...ot
    }, N), t[22] = d, t[23] = S, t[24] = it) : it = t[24], et = s.map(it), t[18] = d, t[19] = S, t[20] = s, t[21] = et;
  } else
    et = t[21];
  let nt;
  t[25] !== et ? (nt = /* @__PURE__ */ p.jsx("div", {
    style: Y,
    children: et
  }), t[25] = et, t[26] = nt) : nt = t[26];
  let J;
  t[27] !== d || t[28] !== S || t[29] !== s ? (J = /* @__PURE__ */ p.jsx(QA, {
    tabs: s,
    activeIndex: d,
    onChange: S
  }), t[27] = d, t[28] = S, t[29] = s, t[30] = J) : J = t[30];
  const Q = c ? "visible" : "hidden";
  let W;
  t[31] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (W = /* @__PURE__ */ p.jsx(Zl, {}), t[31] = W) : W = t[31];
  let O;
  t[32] !== E || t[33] !== w ? (O = /* @__PURE__ */ p.jsx(KA, {
    width: w,
    height: 64,
    insets: E
  }), t[32] = E, t[33] = w, t[34] = O) : O = t[34];
  let U;
  t[35] !== Q || t[36] !== O ? (U = /* @__PURE__ */ p.jsxs(j.Activity, {
    mode: Q,
    children: [W, O]
  }), t[35] = Q, t[36] = O, t[37] = U) : U = t[37];
  let X;
  return t[38] !== L || t[39] !== nt || t[40] !== J || t[41] !== U ? (X = /* @__PURE__ */ p.jsxs(fa, {
    ref: C,
    className: UA,
    whileTap: z,
    transition: k,
    style: L,
    layout: !0,
    children: [nt, J, U]
  }), t[38] = L, t[39] = nt, t[40] = J, t[41] = U, t[42] = X) : X = t[42], X;
}, Rm = "_badge_dqs9c_1", S3 = "_filled_dqs9c_19", w3 = "_tinted_dqs9c_24", C3 = "_gray_dqs9c_29", T3 = "_media_dqs9c_34", j3 = "_outlined_dqs9c_39", FA = {
  badge: Rm,
  filled: S3,
  tinted: w3,
  gray: C3,
  media: T3,
  outlined: j3
}, JA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  badge: Rm,
  default: FA,
  filled: S3,
  gray: C3,
  media: T3,
  outlined: j3,
  tinted: w3
}, Symbol.toStringTag, { value: "Module" })), WA = (n) => {
  const t = xt.c(35);
  let s, l, r, u, c, d, g, m;
  t[0] !== n ? ({
    variant: u,
    textVariant: c,
    circled: d,
    squared: g,
    style: r,
    className: l,
    children: s,
    ...m
  } = n, t[0] = n, t[1] = s, t[2] = l, t[3] = r, t[4] = u, t[5] = c, t[6] = d, t[7] = g, t[8] = m) : (s = t[1], l = t[2], r = t[3], u = t[4], c = t[5], d = t[6], g = t[7], m = t[8]);
  const y = u === void 0 ? "filled" : u, v = c === void 0 ? "body" : c, b = d === void 0 ? !1 : d, T = g === void 0 ? !1 : g;
  let S;
  t[9] !== b ? (S = b && {
    "data-circled": !0
  }, t[9] = b, t[10] = S) : S = t[10];
  let C;
  t[11] !== T ? (C = T && {
    "data-squared": !0
  }, t[11] = T, t[12] = C) : C = t[12];
  let w;
  t[13] !== S || t[14] !== C ? (w = {
    ...S,
    ...C
  }, t[13] = S, t[14] = C, t[15] = w) : w = t[15];
  const M = w, _ = r?.background || r?.backgroundColor || null;
  let R = r;
  if (y === "filled") {
    const $ = _ || "var(--tg-theme-button-color)";
    let E;
    t[16] !== r ? (E = r?.color && {
      "--badge-text-color": r.color
    }, t[16] = r, t[17] = E) : E = t[17];
    let z;
    t[18] !== r || t[19] !== $ || t[20] !== E ? (z = {
      ...r,
      "--badge-background": $,
      ...E
    }, t[18] = r, t[19] = $, t[20] = E, t[21] = z) : z = t[21], R = z;
  } else if (y === "tinted") {
    const $ = r.color || _ || "var(--tg-theme-button-color)";
    let E;
    t[22] !== r.color ? (E = r?.color && {
      "--badge-text-color": r.color
    }, t[22] = r.color, t[23] = E) : E = t[23];
    let z;
    t[24] !== r || t[25] !== E || t[26] !== $ ? (z = {
      ...r,
      "--badge-background": $,
      ...E
    }, t[24] = r, t[25] = E, t[26] = $, t[27] = z) : z = t[27], R = z;
  }
  const D = `${Rm} ${JA[y]} ${l || ""}`;
  let L;
  return t[28] !== R || t[29] !== s || t[30] !== M || t[31] !== D || t[32] !== m || t[33] !== v ? (L = /* @__PURE__ */ p.jsx(ut, {
    variant: v,
    className: D,
    style: R,
    ...M,
    ...m,
    children: s
  }), t[28] = R, t[29] = s, t[30] = M, t[31] = D, t[32] = m, t[33] = v, t[34] = L) : L = t[34], L;
}, IA = "_container_1e3rp_1", t7 = "_trigger_1e3rp_6", Yv = "_shell_1e3rp_20", e7 = "_body_1e3rp_28", n7 = "_compact_1e3rp_36", a7 = "_withBadge_1e3rp_40", i7 = "_badge_1e3rp_44", Gv = (n) => {
  const t = xt.c(14), {
    content: s,
    badge: l,
    compact: r
  } = n, u = r ? n7 : "", c = l && !r ? a7 : "";
  let d;
  t[0] !== u || t[1] !== c ? (d = [e7, u, c].filter(Boolean), t[0] = u, t[1] = c, t[2] = d) : d = t[2];
  const g = d.join(" ");
  let m;
  t[3] !== l || t[4] !== r ? (m = l && !r && /* @__PURE__ */ p.jsx("span", {
    className: i7,
    children: /* @__PURE__ */ p.jsx(ut, {
      variant: "caption2",
      rounded: !0,
      caps: !0,
      weight: "semibold",
      children: l
    })
  }), t[3] = l, t[4] = r, t[5] = m) : m = t[5];
  const y = r ? "caption2" : "subheadline2", v = r ? "medium" : "regular";
  let b;
  t[6] !== s || t[7] !== y || t[8] !== v ? (b = /* @__PURE__ */ p.jsx(ut, {
    variant: y,
    weight: v,
    children: s
  }), t[6] = s, t[7] = y, t[8] = v, t[9] = b) : b = t[9];
  let T;
  return t[10] !== g || t[11] !== m || t[12] !== b ? (T = /* @__PURE__ */ p.jsxs("div", {
    className: g,
    children: [m, b]
  }), t[10] = g, t[11] = m, t[12] = b, t[13] = T) : T = t[13], T;
}, us = 8, gn = 8, s7 = (n, t) => n.top === t.top && n.left === t.left && n.width === t.width && n.height === t.height && n.placement === t.placement && n.shape === t.shape && n.tailOffsetX === t.tailOffsetX && n.tailOffsetY === t.tailOffsetY && n.tailProtrusion === t.tailProtrusion && n.originX === t.originX && n.originY === t.originY, l7 = (n, t) => n.reduce((s, l) => s === null || t[l] > t[s] ? l : s, null), o7 = (n, t, s) => {
  if (["top", "bottom", "left", "right"].includes(s))
    return s;
  const l = t.left !== t.right, r = Math.max(n.top, n.bottom), u = Math.min(n.top, n.bottom), c = r > 0 && (r - u) / r < 0.4;
  return l && c ? t.left ? "left" : "right" : t.bottom && t.top ? n.bottom >= n.top ? "bottom" : "top" : t.bottom ? "bottom" : t.top ? "top" : t.right && t.left ? n.right >= n.left ? "right" : "left" : t.right ? "right" : t.left ? "left" : l7(["bottom", "top", "right", "left"], n);
}, r7 = (n, t, s, l, r, u) => {
  const {
    innerHeight: c,
    innerWidth: d
  } = window, g = {
    top: n.top,
    bottom: c - n.bottom,
    left: n.left,
    right: d - n.right
  }, m = t.height + r + us + gn, y = t.width + r + us + gn, v = {
    top: g.top >= m,
    bottom: g.bottom >= m,
    left: g.left >= y,
    right: g.right >= y
  }, b = o7(g, v, u), T = b === "left" || b === "right", S = T ? l : s, C = Math.round(r * 0.8);
  if (T) {
    const Y = t.height, et = n.top + n.height / 2, nt = Math.max(gn, c - Y - gn);
    let J = En(et - Y / 2, gn, nt), Q = et - J, W = "full";
    Q < S / 2 ? (W = "half-start", J = En(et, gn, nt), Q = 0) : Q > Y - S / 2 && (W = "half-end", J = En(et - Y, gn, nt), Q = Y);
    const O = W === "full" ? r : C, U = t.width + O, X = b === "left" ? n.left - us - U : n.right + us, it = W === "full" ? Q - S / 2 : 0;
    return {
      top: Math.round(J),
      left: Math.round(X),
      width: Math.round(U),
      height: Math.round(Y),
      placement: b,
      shape: W,
      tailOffsetX: 0,
      tailOffsetY: Math.round(it),
      tailProtrusion: O,
      originX: b === "left" ? "100%" : "0%",
      originY: `${En(Q / Y * 100, 0, 100)}%`
    };
  }
  const w = t.width, M = n.left + n.width / 2, _ = Math.max(gn, d - w - gn);
  let R = En(M - w / 2, gn, _), D = M - R, L = "full";
  D < S / 2 ? (L = "half-start", R = En(M, gn, _), D = 0) : D > w - S / 2 && (L = "half-end", R = En(M - w, gn, _), D = w);
  const $ = L === "full" ? r : C, E = t.height + $, z = b === "top" ? n.top - us - E : n.bottom + us, k = L === "full" ? D - S / 2 : 0;
  return {
    top: Math.round(z),
    left: Math.round(R),
    width: Math.round(w),
    height: Math.round(E),
    placement: b,
    shape: L,
    tailOffsetX: Math.round(k),
    tailOffsetY: 0,
    tailProtrusion: $,
    originX: `${En(D / w * 100, 0, 100)}%`,
    originY: b === "top" ? "100%" : "0%"
  };
}, c7 = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  placement: "bottom",
  shape: "full",
  tailOffsetX: 0,
  tailOffsetY: 0,
  tailProtrusion: 0,
  originX: "50%",
  originY: "0%"
}, u7 = (n, t, s, l, r, u, c) => {
  const d = xt.c(10);
  let g;
  d[0] !== c || d[1] !== r || d[2] !== u || d[3] !== l ? (g = (v, b) => r7(v, b, l, r, u, c), d[0] = c, d[1] = r, d[2] = u, d[3] = l, d[4] = g) : g = d[4];
  const m = g;
  let y;
  return d[5] !== m || d[6] !== n || d[7] !== s || d[8] !== t ? (y = {
    isOpen: n,
    triggerRef: t,
    contentRef: s,
    initialPosition: c7,
    calculate: m,
    equals: s7
  }, d[5] = m, d[6] = n, d[7] = s, d[8] = t, d[9] = y) : y = d[9], JE(y);
}, f7 = 80, d7 = 120, h7 = (n) => {
  const t = xt.c(15), {
    onOpen: s,
    onClose: l
  } = n, r = j.useRef(null), u = j.useRef(null);
  let c;
  t[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (c = () => {
    r.current && (clearTimeout(r.current), r.current = null);
  }, t[0] = c) : c = t[0];
  const d = c;
  let g;
  t[1] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (g = () => {
    u.current && (clearTimeout(u.current), u.current = null);
  }, t[1] = g) : g = t[1];
  const m = g;
  let y, v;
  t[2] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (y = () => () => {
    d(), m();
  }, v = [d, m], t[2] = y, t[3] = v) : (y = t[2], v = t[3]), j.useEffect(y, v);
  let b;
  t[4] !== s ? (b = () => {
    m(), !r.current && (r.current = setTimeout(() => {
      r.current = null, s();
    }, f7));
  }, t[4] = s, t[5] = b) : b = t[5];
  const T = b;
  let S;
  t[6] !== l ? (S = () => {
    d(), !u.current && (u.current = setTimeout(() => {
      u.current = null, l();
    }, d7));
  }, t[6] = l, t[7] = S) : S = t[7];
  const C = S;
  let w;
  t[8] !== T ? (w = (L) => {
    L.pointerType !== "touch" && T();
  }, t[8] = T, t[9] = w) : w = t[9];
  const M = w;
  let _;
  t[10] !== C ? (_ = (L) => {
    L.pointerType !== "touch" && C();
  }, t[10] = C, t[11] = _) : _ = t[11];
  const R = _;
  let D;
  return t[12] !== M || t[13] !== R ? (D = {
    onPointerEnter: M,
    onPointerLeave: R,
    clearOpenTimer: d,
    clearCloseTimer: m
  }, t[12] = M, t[13] = R, t[14] = D) : D = t[14], D;
}, Pv = 32, Xv = 24, m7 = 9, p7 = 7, g7 = xc["tooltip-surface"], y7 = (n, t, s, l, r, u, c) => {
  const d = g7, g = [d, d, d, d];
  if (n !== "full") {
    const m = {
      "bottom:half-start": 0,
      "bottom:half-end": 1,
      "top:half-start": 2,
      "top:half-end": 3,
      "right:half-start": 0,
      "right:half-end": 2,
      "left:half-start": 1,
      "left:half-end": 3
    }[`${t}:${n}`];
    return g[m] = 0, g;
  }
  return t === "bottom" ? (g[0] = Math.min(d, r), g[1] = Math.min(d, s - (r + c))) : t === "top" ? (g[2] = Math.min(d, r), g[3] = Math.min(d, s - (r + c))) : t === "right" ? (g[0] = Math.min(d, u), g[2] = Math.min(d, l - (u + c))) : (g[1] = Math.min(d, u), g[3] = Math.min(d, l - (u + c))), g;
}, v7 = ({
  width: n,
  height: t,
  tailOffsetX: s,
  tailOffsetY: l,
  tailBreadth: r,
  tailProtrusion: u,
  placement: c,
  shape: d
}) => {
  const [g, m, y, v] = y7(d, c, n, t, s, l, r), b = d === "full" ? r : Math.round(r * 0.85), T = Math.min(2, Math.max(1, Math.floor(b / 10))), S = (w) => [w, w + r / 4, w + r * 3 / 8, w + r / 2, w + r * 5 / 8, w + r * 3 / 4, w + r];
  if (c === "bottom") {
    const w = u;
    if (d === "full") {
      const [M, _, R, D, L, $, E] = S(s);
      return `path("M ${g} ${w} L ${M} ${w} C ${_} ${w} ${R} 0 ${D} 0 C ${L} 0 ${$} ${w} ${E} ${w} L ${n - m} ${w} Q ${n} ${w} ${n} ${w + m} L ${n} ${t - v} Q ${n} ${t} ${n - v} ${t} L ${y} ${t} Q 0 ${t} 0 ${t - y} L 0 ${w + g} Q 0 ${w} ${g} ${w} Z")`;
    }
    return d === "half-end" ? `path("M ${g} ${w} L ${n - b / 2} ${w} C ${n - b / 4} ${w} ${n - b / 8 - T} 0 ${n - T} 0 Q ${n} 0 ${n} ${T} L ${n} ${t - v} Q ${n} ${t} ${n - v} ${t} L ${y} ${t} Q 0 ${t} 0 ${t - y} L 0 ${w + g} Q 0 ${w} ${g} ${w} Z")` : `path("M ${T} 0 C ${b / 8 + T} 0 ${b / 4} ${w} ${b / 2} ${w} L ${n - m} ${w} Q ${n} ${w} ${n} ${w + m} L ${n} ${t - v} Q ${n} ${t} ${n - v} ${t} L ${y} ${t} Q 0 ${t} 0 ${t - y} L 0 ${T} Q 0 0 ${T} 0 Z")`;
  }
  if (c === "top") {
    const w = t - u;
    if (d === "full") {
      const [M, _, R, D, L, $, E] = S(s);
      return `path("M ${g} 0 L ${n - m} 0 Q ${n} 0 ${n} ${m} L ${n} ${w - v} Q ${n} ${w} ${n - v} ${w} L ${E} ${w} C ${$} ${w} ${L} ${t} ${D} ${t} C ${R} ${t} ${_} ${w} ${M} ${w} L ${y} ${w} Q 0 ${w} 0 ${w - y} L 0 ${g} Q 0 0 ${g} 0 Z")`;
    }
    return d === "half-end" ? `path("M ${g} 0 L ${n - m} 0 Q ${n} 0 ${n} ${m} L ${n} ${t - T} Q ${n} ${t} ${n - T} ${t} C ${n - b / 8 - T} ${t} ${n - b / 4} ${w} ${n - b / 2} ${w} L ${y} ${w} Q 0 ${w} 0 ${w - y} L 0 ${g} Q 0 0 ${g} 0 Z")` : `path("M ${g} 0 L ${n - m} 0 Q ${n} 0 ${n} ${m} L ${n} ${w - v} Q ${n} ${w} ${n - v} ${w} L ${b / 2} ${w} C ${b / 4} ${w} ${b / 8 + T} ${t} ${T} ${t} Q 0 ${t} 0 ${t - T} L 0 ${g} Q 0 0 ${g} 0 Z")`;
  }
  if (c === "right") {
    const w = u;
    if (d === "full") {
      const [M, _, R, D, L, $, E] = S(l);
      return `path("M ${w + g} 0 L ${n - m} 0 Q ${n} 0 ${n} ${m} L ${n} ${t - v} Q ${n} ${t} ${n - v} ${t} L ${w + y} ${t} Q ${w} ${t} ${w} ${t - y} L ${w} ${E} C ${w} ${$} 0 ${L} 0 ${D} C 0 ${R} ${w} ${_} ${w} ${M} L ${w} ${g} Q ${w} 0 ${w + g} 0 Z")`;
    }
    return d === "half-end" ? `path("M ${w + g} 0 L ${n - m} 0 Q ${n} 0 ${n} ${m} L ${n} ${t - v} Q ${n} ${t} ${n - v} ${t} L ${T} ${t} Q 0 ${t} 0 ${t - T} C 0 ${t - T - b / 8} ${w} ${t - b / 4} ${w} ${t - b / 2} L ${w} ${g} Q ${w} 0 ${w + g} 0 Z")` : `path("M ${T} 0 L ${n - m} 0 Q ${n} 0 ${n} ${m} L ${n} ${t - v} Q ${n} ${t} ${n - v} ${t} L ${w + y} ${t} Q ${w} ${t} ${w} ${t - y} L ${w} ${b / 2} C ${w} ${b / 4} 0 ${b / 8 + T} 0 ${T} Q 0 0 ${T} 0 Z")`;
  }
  const C = n - u;
  if (d === "full") {
    const [w, M, _, R, D, L, $] = S(l);
    return `path("M ${g} 0 L ${C - m} 0 Q ${C} 0 ${C} ${m} L ${C} ${w} C ${C} ${M} ${n} ${_} ${n} ${R} C ${n} ${D} ${C} ${L} ${C} ${$} L ${C} ${t - v} Q ${C} ${t} ${C - v} ${t} L ${y} ${t} Q 0 ${t} 0 ${t - y} L 0 ${g} Q 0 0 ${g} 0 Z")`;
  }
  return d === "half-end" ? `path("M ${g} 0 L ${C - m} 0 Q ${C} 0 ${C} ${m} L ${C} ${t - b / 2} C ${C} ${t - b / 4} ${n} ${t - b / 8 - T} ${n} ${t - T} Q ${n} ${t} ${n - T} ${t} L ${y} ${t} Q 0 ${t} 0 ${t - y} L 0 ${g} Q 0 0 ${g} 0 Z")` : `path("M ${g} 0 L ${n - T} 0 Q ${n} 0 ${n} ${T} C ${n} ${T + b / 8} ${C} ${b / 4} ${C} ${b / 2} L ${C} ${t - v} Q ${C} ${t} ${C - v} ${t} L ${y} ${t} Q 0 ${t} 0 ${t - y} L 0 ${g} Q 0 0 ${g} 0 Z")`;
}, b7 = (n) => {
  const t = xt.c(61), {
    content: s,
    badge: l,
    type: r,
    placement: u,
    children: c
  } = n, d = r === void 0 ? "regular" : r, g = u === void 0 ? "auto" : u, [m, y] = j.useState(!1), v = j.useRef(null), b = j.useRef(null), T = j.useRef(null), S = d === "compact", C = S ? p7 : m7, {
    position: w,
    isPositioned: M,
    resetPosition: _
  } = u7(m, v, b, Pv, Xv, C, g);
  let R;
  t[0] !== _ ? (R = () => {
    y(!0), _();
  }, t[0] = _, t[1] = R) : R = t[1];
  const D = R;
  let L;
  t[2] !== _ ? (L = () => {
    y(!1), _();
  }, t[2] = _, t[3] = L) : L = t[3];
  const $ = L;
  let E;
  t[4] !== $ || t[5] !== D ? (E = {
    onOpen: D,
    onClose: $
  }, t[4] = $, t[5] = D, t[6] = E) : E = t[6];
  const {
    onPointerEnter: z,
    onPointerLeave: k,
    clearOpenTimer: Y,
    clearCloseTimer: et
  } = h7(E);
  let nt;
  t[7] !== et || t[8] !== Y || t[9] !== _ ? (nt = () => {
    Y(), et(), y(x7), _();
  }, t[7] = et, t[8] = Y, t[9] = _, t[10] = nt) : nt = t[10];
  const J = nt;
  WE(m, $, v, b, T);
  let Q, W;
  t[11] !== $ || t[12] !== m ? (Q = () => {
    if (!m)
      return;
    const ct = (gt) => {
      gt.key === "Escape" && (gt.preventDefault(), $(), v.current?.focus());
    };
    return document.addEventListener("keydown", ct), () => document.removeEventListener("keydown", ct);
  }, W = [m, $], t[11] = $, t[12] = m, t[13] = Q, t[14] = W) : (Q = t[13], W = t[14]), j.useEffect(Q, W);
  let O;
  t[15] !== J ? (O = (ct) => {
    (ct.key === "Enter" || ct.key === " ") && (ct.preventDefault(), J());
  }, t[15] = J, t[16] = O) : O = t[16];
  const U = O, X = w.placement === "left" || w.placement === "right" ? Xv : Pv;
  let it;
  t[17] !== M || t[18] !== w.height || t[19] !== w.left || t[20] !== w.originX || t[21] !== w.originY || t[22] !== w.placement || t[23] !== w.shape || t[24] !== w.tailOffsetX || t[25] !== w.tailOffsetY || t[26] !== w.tailProtrusion || t[27] !== w.top || t[28] !== w.width || t[29] !== X ? (it = M ? {
    position: "fixed",
    top: w.top,
    left: w.left,
    transformOrigin: `${w.originX} ${w.originY}`,
    zIndex: 1e3,
    paddingTop: w.placement === "bottom" ? w.tailProtrusion : 0,
    paddingBottom: w.placement === "top" ? w.tailProtrusion : 0,
    paddingLeft: w.placement === "right" ? w.tailProtrusion : 0,
    paddingRight: w.placement === "left" ? w.tailProtrusion : 0,
    clipPath: v7({
      width: w.width,
      height: w.height,
      tailOffsetX: w.tailOffsetX,
      tailOffsetY: w.tailOffsetY,
      tailBreadth: X,
      tailProtrusion: w.tailProtrusion,
      placement: w.placement,
      shape: w.shape
    })
  } : null, t[17] = M, t[18] = w.height, t[19] = w.left, t[20] = w.originX, t[21] = w.originY, t[22] = w.placement, t[23] = w.shape, t[24] = w.tailOffsetX, t[25] = w.tailOffsetY, t[26] = w.tailProtrusion, t[27] = w.top, t[28] = w.width, t[29] = X, t[30] = it) : it = t[30];
  const ot = it;
  let N;
  t[31] !== c || t[32] !== U || t[33] !== m || t[34] !== z || t[35] !== k || t[36] !== J ? (N = /* @__PURE__ */ p.jsx("span", {
    className: t7,
    onClick: J,
    onKeyDown: U,
    onPointerEnter: z,
    onPointerLeave: k,
    ref: v,
    role: "button",
    tabIndex: 0,
    "aria-expanded": m,
    "aria-haspopup": "dialog",
    children: c
  }), t[31] = c, t[32] = U, t[33] = m, t[34] = z, t[35] = k, t[36] = J, t[37] = N) : N = t[37];
  let q;
  t[38] !== l || t[39] !== S || t[40] !== s || t[41] !== m || t[42] !== M ? (q = m && !M && /* @__PURE__ */ p.jsx("div", {
    ref: b,
    className: Yv,
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      visibility: "hidden",
      zIndex: 1e3
    },
    children: /* @__PURE__ */ p.jsx(Gv, {
      content: s,
      badge: l,
      compact: S
    })
  }), t[38] = l, t[39] = S, t[40] = s, t[41] = m, t[42] = M, t[43] = q) : q = t[43];
  let tt;
  t[44] !== l || t[45] !== S || t[46] !== s || t[47] !== m || t[48] !== M || t[49] !== z || t[50] !== k || t[51] !== ot ? (tt = m && M && /* @__PURE__ */ p.jsx(fa, {
    ref: T,
    role: "tooltip",
    className: Yv,
    initial: "hidden",
    animate: "visible",
    exit: "exit",
    variants: fE,
    onPointerEnter: z,
    onPointerLeave: k,
    style: ot,
    children: /* @__PURE__ */ p.jsx(Gv, {
      content: s,
      badge: l,
      compact: S
    })
  }), t[44] = l, t[45] = S, t[46] = s, t[47] = m, t[48] = M, t[49] = z, t[50] = k, t[51] = ot, t[52] = tt) : tt = t[52];
  let lt;
  t[53] !== tt ? (lt = /* @__PURE__ */ p.jsx(Ts, {
    children: tt
  }), t[53] = tt, t[54] = lt) : lt = t[54];
  let F;
  t[55] !== q || t[56] !== lt ? (F = /* @__PURE__ */ io.createPortal(/* @__PURE__ */ p.jsxs(p.Fragment, {
    children: [q, lt]
  }), document.body), t[55] = q, t[56] = lt, t[57] = F) : F = t[57];
  let rt;
  return t[58] !== N || t[59] !== F ? (rt = /* @__PURE__ */ p.jsxs("span", {
    className: IA,
    children: [N, F]
  }), t[58] = N, t[59] = F, t[60] = rt) : rt = t[60], rt;
};
function x7(n) {
  return !n;
}
const Kv = "_root_tgfxm_8", S7 = "_header_tgfxm_22", Qv = "_button_tgfxm_30", w7 = "_wheelContainer_tgfxm_55", C7 = "_centerIndicator_tgfxm_81", T7 = "_currentValue_tgfxm_112", j7 = "_ticksContainer_tgfxm_123", E7 = "_tick_tgfxm_123", A7 = "_tickNumber_tgfxm_154", M7 = "_tickMark_tgfxm_164", _7 = 32, D7 = 8, mi = _7 + D7, R7 = 0.6, Fl = 1;
function Zv(n, t) {
  const s = Math.round(-n / mi);
  return s < 0 ? Fl : s + 1 > t ? t : s + 1;
}
function Fv(n, t) {
  return Math.min(t, Math.max(Fl, n));
}
const N7 = (n) => {
  const t = xt.c(41), {
    value: s,
    defaultValue: l,
    onChange: r,
    max: u,
    disabled: c,
    enableHaptic: d
  } = n, g = l === void 0 ? 1 : l, m = u === void 0 ? 40 : u, y = c === void 0 ? !1 : c, v = d === void 0 ? !0 : d, b = s !== void 0, [T, S] = j.useState(g), C = b ? s : T, [w, M] = j.useState(C), _ = j.useRef(C), R = j.useRef(C), D = fm(-(C - 1) * mi), L = w !== C;
  L && M(C);
  let $, E;
  t[0] !== C ? ($ = () => {
    _.current = C;
  }, E = [C], t[0] = C, t[1] = $, t[2] = E) : ($ = t[1], E = t[2]), j.useEffect($, E);
  let z;
  t[3] !== v || t[4] !== b || t[5] !== m || t[6] !== r ? (z = (lt) => {
    const F = Fv(lt, m);
    v && F !== _.current && da.HapticFeedback.selectionChanged(), R.current = F, b || S(F), r?.(F);
  }, t[3] = v, t[4] = b, t[5] = m, t[6] = r, t[7] = z) : z = t[7];
  const k = z;
  let Y;
  t[8] !== y || t[9] !== k || t[10] !== D ? (Y = (lt, F) => {
    const rt = F === void 0 ? Ul.GENTLE : F;
    y || (kl(D, -(lt - 1) * mi, rt), k(lt));
  }, t[8] = y, t[9] = k, t[10] = D, t[11] = Y) : Y = t[11];
  const et = Y;
  let nt;
  t[12] !== y || t[13] !== m || t[14] !== k || t[15] !== D ? (nt = () => {
    if (y)
      return;
    const lt = Zv(D.get(), m);
    lt !== _.current && k(lt);
  }, t[12] = y, t[13] = m, t[14] = k, t[15] = D, t[16] = nt) : nt = t[16];
  const J = nt;
  let Q;
  t[17] !== y || t[18] !== m || t[19] !== k || t[20] !== D ? (Q = (lt, F) => {
    if (y)
      return;
    const rt = D.get(), ct = F.velocity.x, gt = rt + ct * R7, bt = Zv(gt, m), Dt = -(bt - 1) * mi;
    kl(D, Dt, {
      ...Ul.SNAP,
      velocity: ct
    }), k(bt);
  }, t[17] = y, t[18] = m, t[19] = k, t[20] = D, t[21] = Q) : Q = t[21];
  const W = Q;
  let O, U;
  t[22] !== b || t[23] !== m || t[24] !== s || t[25] !== D ? (O = () => {
    !b || s === void 0 || s !== R.current && (R.current = s, kl(D, -(Fv(s, m) - 1) * mi, Ul.GENTLE));
  }, U = [s, b, m, D], t[22] = b, t[23] = m, t[24] = s, t[25] = D, t[26] = O, t[27] = U) : (O = t[26], U = t[27]), j.useEffect(O, U);
  const X = -(m - 1) * mi;
  let it;
  t[28] !== X ? (it = {
    left: X,
    right: 0
  }, t[28] = X, t[29] = it) : it = t[29];
  const ot = it;
  let N;
  t[30] !== m ? (N = Array.from({
    length: m - Fl + 1
  }, O7), t[30] = m, t[31] = N) : N = t[31];
  const q = N;
  let tt;
  return t[32] !== et || t[33] !== C || t[34] !== ot || t[35] !== J || t[36] !== W || t[37] !== L || t[38] !== q || t[39] !== D ? (tt = {
    currentValue: C,
    shouldAnimate: L,
    x: D,
    handleDrag: J,
    handleDragEnd: W,
    animateToValue: et,
    dragConstraints: ot,
    ticks: q,
    min: Fl
  }, t[32] = et, t[33] = C, t[34] = ot, t[35] = J, t[36] = W, t[37] = L, t[38] = q, t[39] = D, t[40] = tt) : tt = t[40], tt;
};
function O7(n, t) {
  return Fl + t;
}
const L7 = (n) => {
  const t = xt.c(16), {
    value: s,
    label: l,
    index: r,
    x: u,
    radius: c,
    onSelect: d
  } = n;
  let g;
  t[0] !== r || t[1] !== c ? (g = (M) => pA(r * mi + M, c, "horizontal"), t[0] = r, t[1] = c, t[2] = g) : g = t[2];
  const m = ch(u, g), y = ch(m, $7);
  let v;
  t[3] !== m || t[4] !== y ? (v = {
    transform: m,
    visibility: y
  }, t[3] = m, t[4] = y, t[5] = v) : v = t[5];
  let b;
  t[6] !== d || t[7] !== s ? (b = () => d(s), t[6] = d, t[7] = s, t[8] = b) : b = t[8];
  const T = l ?? s;
  let S;
  t[9] !== T ? (S = /* @__PURE__ */ p.jsx("span", {
    className: A7,
    children: T
  }), t[9] = T, t[10] = S) : S = t[10];
  let C;
  t[11] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (C = /* @__PURE__ */ p.jsx("span", {
    className: M7
  }), t[11] = C) : C = t[11];
  let w;
  return t[12] !== v || t[13] !== b || t[14] !== S ? (w = /* @__PURE__ */ p.jsxs(fa, {
    className: E7,
    style: v,
    onClick: b,
    children: [S, C]
  }), t[12] = v, t[13] = b, t[14] = S, t[15] = w) : w = t[15], w;
};
function $7(n) {
  return n ? "visible" : "hidden";
}
const B7 = /* @__PURE__ */ p.jsx("div", {
  className: C7
}), z7 = 5, V7 = (n) => {
  const t = xt.c(75), {
    value: s,
    defaultValue: l,
    onChange: r,
    max: u,
    prefix: c,
    suffix: d,
    disabled: g,
    enableHaptic: m,
    className: y,
    formatTick: v,
    showValue: b,
    showLimits: T,
    indicator: S,
    ariaLabel: C,
    dragAreaRef: w
  } = n, M = l === void 0 ? 1 : l, _ = u === void 0 ? 40 : u, R = c === void 0 ? "" : c, D = d === void 0 ? "×" : d, L = g === void 0 ? !1 : g, $ = m === void 0 ? !0 : m, E = b === void 0 ? !0 : b, z = T === void 0 ? !0 : T, k = S === void 0 ? "track" : S, Y = C === void 0 ? "Value selector" : C, et = j.useRef(null), nt = j.useRef(!1), [J, Q] = j.useState(250), W = J8();
  let O;
  t[0] !== M || t[1] !== L || t[2] !== $ || t[3] !== _ || t[4] !== r || t[5] !== s ? (O = {
    value: s,
    defaultValue: M,
    onChange: r,
    max: _,
    disabled: L,
    enableHaptic: $
  }, t[0] = M, t[1] = L, t[2] = $, t[3] = _, t[4] = r, t[5] = s, t[6] = O) : O = t[6];
  const {
    currentValue: U,
    x: X,
    handleDrag: it,
    handleDragEnd: ot,
    animateToValue: N,
    dragConstraints: q,
    ticks: tt,
    min: lt
  } = N7(O);
  let F, rt;
  t[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (F = () => {
    const It = et.current;
    if (!It)
      return;
    const Ce = () => {
      It.clientWidth > 0 && Q(It.clientWidth / 2);
    };
    Ce();
    const Yn = new ResizeObserver(Ce);
    return Yn.observe(It), () => Yn.disconnect();
  }, rt = [], t[7] = F, t[8] = rt) : (F = t[7], rt = t[8]), j.useLayoutEffect(F, rt);
  let ct, gt;
  t[9] !== L || t[10] !== w || t[11] !== W ? (ct = () => {
    const It = w?.current;
    if (!It || L)
      return;
    const Ce = (Yn) => W.start(Yn);
    return It.addEventListener("pointerdown", Ce), () => It.removeEventListener("pointerdown", Ce);
  }, gt = [w, W, L], t[9] = L, t[10] = w, t[11] = W, t[12] = ct, t[13] = gt) : (ct = t[12], gt = t[13]), j.useEffect(ct, gt);
  let bt;
  t[14] !== N || t[15] !== L ? (bt = (It) => {
    L || nt.current || N(It);
  }, t[14] = N, t[15] = L, t[16] = bt) : bt = t[16];
  const Dt = bt;
  let Ot;
  t[17] !== N || t[18] !== U || t[19] !== L || t[20] !== _ || t[21] !== lt ? (Ot = (It) => {
    if (L)
      return;
    const Ce = {
      ArrowLeft: () => N(Math.max(lt, U - 1)),
      ArrowDown: () => N(Math.max(lt, U - 1)),
      ArrowRight: () => N(Math.min(_, U + 1)),
      ArrowUp: () => N(Math.min(_, U + 1)),
      Home: () => N(lt),
      End: () => N(_)
    }[It.key];
    Ce && (It.preventDefault(), Ce());
  }, t[17] = N, t[18] = U, t[19] = L, t[20] = _, t[21] = lt, t[22] = Ot) : Ot = t[22];
  const zt = Ot, Be = y ? `${Kv} ${y}` : Kv, ve = L || void 0;
  let Re;
  t[23] !== N || t[24] !== L || t[25] !== _ || t[26] !== lt || t[27] !== z ? (Re = z ? /* @__PURE__ */ p.jsxs("div", {
    className: S7,
    children: [/* @__PURE__ */ p.jsx(ah, {
      className: Qv,
      onClick: () => N(lt),
      disabled: L,
      whileTap: L ? void 0 : {
        scale: 0.95
      },
      children: "Min"
    }), /* @__PURE__ */ p.jsx(ah, {
      className: Qv,
      onClick: () => N(_),
      disabled: L,
      whileTap: L ? void 0 : {
        scale: 0.95
      },
      children: "Max"
    })]
  }) : null, t[23] = N, t[24] = L, t[25] = _, t[26] = lt, t[27] = z, t[28] = Re) : Re = t[28];
  let Se;
  t[29] !== U || t[30] !== R || t[31] !== E || t[32] !== D ? (Se = E ? /* @__PURE__ */ p.jsxs("div", {
    className: T7,
    children: [R, /* @__PURE__ */ p.jsx(js, {
      variant: "number",
      animation: "snappy",
      style: {
        color: "inherit",
        fontSize: "inherit"
      },
      children: U
    }), D]
  }) : null, t[29] = U, t[30] = R, t[31] = E, t[32] = D, t[33] = Se) : Se = t[33];
  const Xe = L || void 0, ha = L ? -1 : 0;
  let an;
  t[34] !== X ? (an = {
    x: X
  }, t[34] = X, t[35] = an) : an = t[35];
  const qn = L ? !1 : "x", ft = !w;
  let Nt;
  t[36] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (Nt = () => {
    nt.current = !1;
  }, t[36] = Nt) : Nt = t[36];
  let we;
  t[37] !== it ? (we = (It, Ce) => {
    Math.abs(Ce.offset.x) > z7 && (nt.current = !0), it();
  }, t[37] = it, t[38] = we) : we = t[38];
  let Kt;
  if (t[39] !== v || t[40] !== Dt || t[41] !== J || t[42] !== tt || t[43] !== X) {
    let It;
    t[45] !== v || t[46] !== Dt || t[47] !== J || t[48] !== X ? (It = (Ce, Yn) => /* @__PURE__ */ p.jsx(L7, {
      value: Ce,
      label: v ? v(Ce) : Ce,
      index: Yn,
      x: X,
      radius: J,
      onSelect: Dt
    }, Ce), t[45] = v, t[46] = Dt, t[47] = J, t[48] = X, t[49] = It) : It = t[49], Kt = tt.map(It), t[39] = v, t[40] = Dt, t[41] = J, t[42] = tt, t[43] = X, t[44] = Kt;
  } else
    Kt = t[44];
  let sn;
  t[50] !== q || t[51] !== W || t[52] !== ot || t[53] !== an || t[54] !== qn || t[55] !== ft || t[56] !== we || t[57] !== Kt ? (sn = /* @__PURE__ */ p.jsx(fa, {
    className: j7,
    style: an,
    drag: qn,
    dragControls: W,
    dragListener: ft,
    dragConstraints: q,
    dragElastic: 0.1,
    dragMomentum: !1,
    onPointerDown: Nt,
    onDrag: we,
    onDragEnd: ot,
    children: Kt
  }), t[50] = q, t[51] = W, t[52] = ot, t[53] = an, t[54] = qn, t[55] = ft, t[56] = we, t[57] = Kt, t[58] = sn) : sn = t[58];
  let xn;
  t[59] !== Y || t[60] !== U || t[61] !== zt || t[62] !== _ || t[63] !== lt || t[64] !== Xe || t[65] !== ha || t[66] !== sn ? (xn = /* @__PURE__ */ p.jsxs("div", {
    ref: et,
    className: w7,
    role: "slider",
    "aria-label": Y,
    "aria-valuemin": lt,
    "aria-valuemax": _,
    "aria-valuenow": U,
    "aria-disabled": Xe,
    tabIndex: ha,
    onKeyDown: zt,
    children: [B7, sn]
  }), t[59] = Y, t[60] = U, t[61] = zt, t[62] = _, t[63] = lt, t[64] = Xe, t[65] = ha, t[66] = sn, t[67] = xn) : xn = t[67];
  let Ga;
  return t[68] !== Be || t[69] !== k || t[70] !== ve || t[71] !== Re || t[72] !== Se || t[73] !== xn ? (Ga = /* @__PURE__ */ p.jsxs("div", {
    className: Be,
    "data-disabled": ve,
    "data-indicator": k,
    children: [Re, Se, xn]
  }), t[68] = Be, t[69] = k, t[70] = ve, t[71] = Re, t[72] = Se, t[73] = xn, t[74] = Ga) : Ga = t[74], Ga;
}, ji = (n) => {
  const t = xt.c(2), {
    children: s
  } = n;
  let l;
  return t[0] !== s ? (l = /* @__PURE__ */ p.jsx(sA, {
    children: /* @__PURE__ */ p.jsx(Uj, {
      children: /* @__PURE__ */ p.jsx(aA, {
        children: /* @__PURE__ */ p.jsx(BA, {
          children: s
        })
      })
    })
  }), t[0] = s, t[1] = l) : l = t[1], l;
}, k7 = (n) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/home" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", d: "M11.2921 3.10288C11.7572 2.98914 12.243 2.98915 12.7081 3.10288C13.2396 3.23288 13.709 3.55457 14.2432 3.92027L19.2442 7.33335C19.6706 7.62361 20.0467 7.87916 20.3282 8.22788C20.5749 8.53357 20.7603 8.88486 20.8731 9.26206C21.0018 9.69232 21.0007 10.1491 21.0001 10.6673V16.9613C21.0001 17.4921 21.0004 17.9503 20.9698 18.3275C20.9375 18.7256 20.8656 19.1213 20.6729 19.5023C20.3853 20.0709 19.9269 20.5339 19.3624 20.8236C18.9841 21.0177 18.5907 21.0889 18.1954 21.1214C17.8209 21.1523 17.366 21.1527 16.8389 21.1527H7.16121C6.63427 21.1527 6.17922 21.1523 5.80476 21.1214C5.40975 21.0889 5.01682 21.0175 4.63875 20.8236C4.07426 20.5339 3.61484 20.0709 3.32722 19.5023C3.13458 19.1213 3.06265 18.7255 3.03035 18.3275C2.99975 17.9503 3.00006 17.4921 3.00008 16.9613V10.6673C2.99948 10.1491 2.99933 9.69232 3.12801 9.26206C3.24091 8.8848 3.42612 8.53359 3.67293 8.22788C3.95441 7.87922 4.32962 7.62355 4.75593 7.33335L9.75691 3.92027C10.2911 3.55462 10.7606 3.23292 11.2921 3.10288ZM10.5001 12.0882C9.94779 12.0882 9.50008 12.5359 9.50008 13.0882V16.1244C9.50008 16.6767 9.94779 17.1244 10.5001 17.1244H13.5001C14.0524 17.1244 14.5001 16.6767 14.5001 16.1244V13.0882C14.5001 12.5359 14.0524 12.0882 13.5001 12.0882H10.5001Z", fill: "currentColor" }))), U7 = (n) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/calendar" }, /* @__PURE__ */ j.createElement("path", { id: "Union", d: "M19.6748 10.7998C19.9782 10.7998 20.1303 10.7997 20.2441 10.8633C20.3246 10.9083 20.3915 10.9752 20.4365 11.0557C20.5001 11.1695 20.5 11.3216 20.5 11.625V13.9004C20.5 16.329 20.5 17.5435 19.9902 18.4541C19.6298 19.0977 19.0977 19.6298 18.4541 19.9902C17.5435 20.5 16.329 20.5 13.9004 20.5H10.0996C7.67103 20.5 6.4565 20.5 5.5459 19.9902C4.90227 19.6298 4.37022 19.0977 4.00977 18.4541C3.5 17.5435 3.5 16.329 3.5 13.9004V11.625C3.5 11.3216 3.49986 11.1695 3.56348 11.0557C3.60853 10.9752 3.67541 10.9083 3.75586 10.8633C3.86967 10.7997 4.02177 10.7998 4.3252 10.7998H19.6748ZM16 1.5C16.5523 1.5 17 1.94772 17 2.5V3.58984C17.5949 3.66023 18.0539 3.78571 18.4541 4.00977C19.0977 4.37022 19.6298 4.90227 19.9902 5.5459C20.3615 6.20916 20.4605 7.03367 20.4873 8.37109C20.4933 8.67145 20.4965 8.8223 20.4336 8.93848C20.3896 9.01965 20.3215 9.08906 20.2412 9.13477C20.1263 9.20009 19.9733 9.2002 19.668 9.2002H4.33203C4.02672 9.2002 3.87368 9.20009 3.75879 9.13477C3.67854 9.08906 3.61044 9.01965 3.56641 8.93848C3.50351 8.8223 3.50669 8.67145 3.5127 8.37109C3.53947 7.03367 3.63847 6.20916 4.00977 5.5459C4.37022 4.90227 4.90227 4.37022 5.5459 4.00977C5.94613 3.78571 6.40508 3.66023 7 3.58984V2.5C7 1.94772 7.44772 1.5 8 1.5C8.55228 1.5 9 1.94772 9 2.5V3.50488C9.33664 3.50264 9.70183 3.5 10.0996 3.5H13.9004C14.2982 3.5 14.6634 3.50264 15 3.50488V2.5C15 1.94772 15.4477 1.5 16 1.5Z", fill: "currentColor" }))), wc = (n) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "currentColor" }), /* @__PURE__ */ j.createElement("path", { id: "Vector 234255039", d: "M9 12.439L11.1818 14.8564L13.0909 11.8347L14.0455 10.3238L14.5227 9.56836", stroke: "var(--background)", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }))), H7 = (n) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ j.createElement("path", { d: "M4 12.7778L9.75048 19.4689C9.97414 19.7292 10.3875 19.6919 10.561 19.3959L19 5", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round" })), hh = (n) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "currentColor" }), /* @__PURE__ */ j.createElement("path", { id: "Vector 234255931", d: "M12 12.5V8", stroke: "var(--background)", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ j.createElement("circle", { id: "Ellipse 253668", cx: 1, cy: 1, r: 1, transform: "matrix(1 0 0 -1 11 17)", fill: "var(--background)" }))), q7 = (n) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/clock" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5ZM12 6.2002C11.5582 6.2002 11.2002 6.55817 11.2002 7V12C11.2002 12.281 11.3479 12.541 11.5889 12.6855L14.0889 14.1855C14.4677 14.4127 14.9583 14.2899 15.1855 13.9111C15.4127 13.5323 15.2899 13.0417 14.9111 12.8145L12.7998 11.5469V7C12.7998 6.55817 12.4418 6.2002 12 6.2002Z", fill: "currentColor" }))), Y7 = (n) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/heart" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", fillRule: "evenodd", clipRule: "evenodd", d: "M12 6.34213C13.1016 4.86137 14.8294 3.86287 16.9203 4.05233C19.9439 4.3263 22.0001 6.73448 22.0001 9.87524C22.0001 12.7458 20.4285 15.1633 18.5183 16.9571C16.6026 18.756 14.2269 20.0464 12.319 20.6691C12.1117 20.7368 11.8884 20.7368 11.6811 20.6691C9.77325 20.0464 7.39752 18.756 5.48179 16.9571C3.57156 15.1633 2 12.7458 2 9.87524C2 6.73448 4.05617 4.3263 7.07975 4.05233C9.17073 3.86287 10.8984 4.86142 12 6.34213Z", fill: "currentColor" }))), G7 = (n) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/cup" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", fillRule: "evenodd", clipRule: "evenodd", d: "M12.9992 3.02148C17.9698 3.02148 21.9992 5.27629 21.9992 8.05772C21.9992 12.0867 20.9992 21.1519 12.9992 21.1519C9.14215 21.1518 6.91501 19.043 5.63991 16.4088L4.98464 16.5417C2.90427 16.9606 0.88686 15.5799 0.507098 13.4776C0.136993 11.4266 1.46695 9.45421 3.49635 9.04529L4.01491 8.94004C4.0039 8.6258 3.99928 8.33024 3.99928 8.05772C3.99928 5.27633 8.02884 3.02156 12.9992 3.02148ZM3.88796 11.0204C2.92844 11.2139 2.30006 12.1467 2.47487 13.1166C2.65441 14.111 3.60814 14.7636 4.59206 14.5654L4.89284 14.5045C4.52286 13.3122 4.29975 12.0906 4.16823 10.9634L3.88796 11.0204ZM12.9992 5.03598C9.13341 5.03604 5.99928 6.38889 5.99928 8.05772C5.99928 9.72654 9.13341 11.0794 12.9992 11.0795C16.8652 11.0795 19.9992 9.72657 19.9992 8.05772C19.9992 6.38886 16.8652 5.03598 12.9992 5.03598Z", fill: "currentColor" }))), P7 = (n) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ j.createElement("path", { id: "Vector 234255937", d: "M3.52765 9.90413C0.911528 15.9537 3.96635 21.1957 8.35342 22.5511C8.84167 22.702 9.19067 22.0789 8.92321 21.6434C8.19965 20.4654 7.47887 18.5753 8.56051 16.6478C8.64224 16.5022 8.85072 16.5146 8.93197 16.6605C9.95802 18.5031 10.9317 18.5031 10.9317 18.5031C10.9317 18.5031 8.86679 14.8896 11.7788 12.1893C11.8911 12.0851 12.0723 12.1349 12.1315 12.2762C13.3539 15.1909 17.8248 17.3143 14.8582 21.9344C14.6119 22.3181 14.8717 22.8388 15.3226 22.7712C20.4424 22.0038 22.208 16.0069 20.1757 11.4342C18.0862 6.73288 13.4876 7.04975 11.6828 2.26117C11.5637 1.9453 11.198 1.78379 10.9122 1.96333C7.99596 3.79495 6.34996 7.94875 7.37329 13.0655C6.01592 12.7262 5.08207 11.1162 4.57178 9.95361C4.37654 9.50881 3.72046 9.45827 3.52765 9.90413Z", fill: "currentColor" }))), E3 = (n) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/cross" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", d: "M16.2929 6.06242C16.6834 5.6719 17.3164 5.67191 17.707 6.06242C18.0975 6.45295 18.0975 7.08596 17.707 7.47649L13.414 11.7695L17.707 16.0624C18.0975 16.4529 18.0975 17.086 17.707 17.4765C17.3164 17.867 16.6834 17.867 16.2929 17.4765L11.9999 13.1835L7.70696 17.4765C7.31643 17.867 6.68342 17.867 6.29289 17.4765C5.90238 17.086 5.90237 16.4529 6.29289 16.0624L10.5859 11.7695L6.29289 7.47649C5.90237 7.08596 5.90237 6.45295 6.29289 6.06242C6.68342 5.6719 7.31643 5.6719 7.70696 6.06242L11.9999 10.3554L16.2929 6.06242Z", fill: "currentColor" }))), A3 = (n) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "currentColor" }), /* @__PURE__ */ j.createElement("path", { id: "Vector 234255931", d: "M12 12V16", stroke: "var(--background)", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ j.createElement("circle", { id: "Ellipse 253668", cx: 12, cy: 8.5, r: 1, fill: "var(--background)" }))), Es = (n) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/plus" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", d: "M11 17.7695V12.7695H6C5.44772 12.7695 5 12.3218 5 11.7695C5 11.2172 5.44772 10.7695 6 10.7695H11V5.76953C11 5.21725 11.4477 4.76953 12 4.76953C12.5523 4.76953 13 5.21725 13 5.76953V10.7695H18C18.5523 10.7695 19 11.2172 19 11.7695C19 12.3218 18.5523 12.7695 18 12.7695H13V17.7695C13 18.3218 12.5523 18.7695 12 18.7695C11.4477 18.7695 11 18.3218 11 17.7695Z", fill: "currentColor" }))), X7 = (n) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ j.createElement("path", { d: "M16.5791 4.53223C18.0851 4.53223 18.8049 4.65337 19.5361 5.04297C20.1593 5.3751 20.654 5.86826 20.9873 6.48926C21.3783 7.21793 21.5 7.93502 21.5 9.43555V14.7383C21.5 16.2388 21.3783 16.9559 20.9873 17.6846C20.654 18.3056 20.1593 18.7987 19.5361 19.1309C18.8049 19.5205 18.0851 19.6416 16.5791 19.6416H7.4209C5.91493 19.6416 5.19509 19.5205 4.46387 19.1309C3.84066 18.7987 3.34603 18.3056 3.0127 17.6846C2.62169 16.9559 2.50002 16.2388 2.5 14.7383V9.43555C2.50003 7.93502 2.62167 7.21793 3.0127 6.48926C3.34603 5.86826 3.84066 5.3751 4.46387 5.04297C5.19509 4.65337 5.91494 4.53223 7.4209 4.53223H16.5791ZM10.1436 9.44043C9.76724 8.73388 8.75424 8.73388 8.37793 9.44043L5.78223 14.3125C5.42805 14.9784 5.91082 15.7829 6.66504 15.7832H17.0791C17.8878 15.7831 18.3617 14.8726 17.8984 14.21L16.2656 11.877C15.8829 11.3303 15.0819 11.3051 14.665 11.8262L12.998 13.9092C12.8634 14.0774 12.6005 14.0532 12.499 13.8633L10.1436 9.44043Z", fill: "currentColor" })), K7 = (n) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ j.createElement("path", { d: "M14.0996 3.5C16.3398 3.5 17.4608 3.49957 18.3164 3.93555C19.0689 4.31902 19.681 4.93109 20.0645 5.68359C20.5004 6.53924 20.5 7.66018 20.5 9.90039V14.0996C20.5 16.3398 20.5004 17.4608 20.0645 18.3164C19.681 19.0689 19.0689 19.681 18.3164 20.0645C17.4608 20.5004 16.3398 20.5 14.0996 20.5H9.90039C7.66018 20.5 6.53924 20.5004 5.68359 20.0645C4.93109 19.681 4.31902 19.0689 3.93555 18.3164C3.49957 17.4608 3.5 16.3398 3.5 14.0996V9.90039C3.5 7.66018 3.49957 6.53924 3.93555 5.68359C4.31902 4.93109 4.93109 4.31902 5.68359 3.93555C6.53924 3.49957 7.66018 3.5 9.90039 3.5H14.0996ZM9.5 8.2002C9.05817 8.2002 8.7002 8.55817 8.7002 9C8.7002 9.44183 9.05817 9.7998 9.5 9.7998H11.2002V15.5C11.2002 15.9418 11.5582 16.2998 12 16.2998C12.4418 16.2998 12.7998 15.9418 12.7998 15.5V9.7998H14.5C14.9418 9.7998 15.2998 9.44183 15.2998 9C15.2998 8.55817 14.9418 8.2002 14.5 8.2002H9.5Z", fill: "currentColor" })), Q7 = {
  success: wc,
  error: hh,
  warning: hh,
  info: A3
};
let fc = null, Jv = !1;
const mh = [];
function Z7() {
  const n = $A();
  return j.useEffect(() => (fc = n.show, mh.length && mh.splice(0).forEach((t) => n.show(t)), () => {
    fc = null;
  })), null;
}
function F7() {
  if (Jv || typeof document > "u") return;
  Jv = !0;
  const n = document.createElement("div");
  n.setAttribute("data-aiwa-toast-host", ""), document.body.appendChild(n), fs.createRoot(n).render(
    /* @__PURE__ */ p.jsx(ji, { children: /* @__PURE__ */ p.jsx(Z7, {}) })
  );
}
function M3(n, t = {}) {
  const s = typeof n == "string" ? { title: n, ...t } : { ...n };
  if (s.type && !s.icon) {
    const l = Q7[s.type];
    l && (s.icon = /* @__PURE__ */ p.jsx(l, {}));
  }
  return F7(), fc ? fc(s) : (mh.push(s), null);
}
function J7() {
  typeof window < "u" && (window.aiwaToast = M3);
}
const bn = (n, ...t) => {
  const s = window[n];
  typeof s == "function" && s(...t);
}, Ft = (n, ...t) => {
  const s = window[n];
  return typeof s == "function" ? s(...t) : null;
}, Gt = (n, t = {}) => {
  const s = Ft("aiwaApi", n, t);
  return s && typeof s.then == "function" ? s : Promise.reject(new Error("API bridge is unavailable"));
}, At = (n, t = {}) => M3(n, t), W7 = async (n) => {
  window.__aiwaQuietToast = !0;
  try {
    return await n();
  } finally {
    window.__aiwaQuietToast = !1;
  }
}, ph = (n) => `${Math.round(Number(n) || 0).toLocaleString("ru-RU")} ккал`, _3 = (n) => bn("track", n), I7 = () => {
  const n = window.Telegram?.WebApp;
  n?.close && n.close();
}, As = async ({ nudge: n = !0, topic: t = "" } = {}) => {
  n && await Promise.race([
    Gt("/api/nudge", t ? { topic: t } : {}).catch(() => null),
    new Promise((u) => setTimeout(u, 2e3))
  ]);
  const s = window.Telegram?.WebApp, l = Ft("aiwaData")?.bot_username, r = typeof s?.openTelegramLink == "function" && (typeof s.isVersionAtLeast != "function" || s.isVersionAtLeast("6.1"));
  l && r && s.openTelegramLink(`https://t.me/${l}`), I7();
}, tM = () => {
  const n = window.Telegram?.WebApp;
  return typeof n?.showPopup != "function" ? !1 : typeof n.isVersionAtLeast != "function" || n.isVersionAtLeast("6.2");
}, ne = (n, t) => ({
  "aria-label": n,
  onClick: t,
  onKeyDown: (s) => {
    (s.key === "Enter" || s.key === " ") && (s.preventDefault(), t());
  },
  role: "button",
  tabIndex: 0
}), eM = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"], nM = (n = 30) => {
  const t = [];
  for (let s = n - 1; s >= 0; s -= 1) {
    const l = /* @__PURE__ */ new Date();
    l.setDate(l.getDate() - s);
    const r = `${l.getFullYear()}-${String(l.getMonth() + 1).padStart(2, "0")}-${String(l.getDate()).padStart(2, "0")}`;
    t.push({ iso: r, date: String(l.getDate()), label: eM[l.getDay()], today: s === 0 });
  }
  return t;
}, aM = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }), Cc = () => {
  const n = /* @__PURE__ */ new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
}, Nm = (n) => {
  const t = /* @__PURE__ */ new Date(`${n}T12:00:00`);
  return Number.isNaN(t.getTime()) ? "" : aM.format(t);
}, gh = /* @__PURE__ */ new Set();
let D3 = "";
const yh = () => D3 || Ft("aiwaSelectedDay") || Cc(), iM = () => {
  const n = Ft("aiwaDayStrip");
  return n?.length ? n : nM(30);
};
function R3(n) {
  const t = n || Cc();
  t !== yh() && (D3 = t, bn("aiwaSelectDay", t), gh.forEach((s) => s(t)));
}
function Om() {
  const [n, t] = j.useState(yh);
  return j.useEffect(() => (t(yh()), gh.add(t), () => {
    gh.delete(t);
  }), []), n;
}
function Lm({ title: n, size: t = "regular", ...s }) {
  return t === "large" ? /* @__PURE__ */ p.jsx("div", { className: "aiwa-panel-header is-large", children: /* @__PURE__ */ p.jsx(ut, { as: "h1", variant: "title1", weight: "bold", children: n }) }) : /* @__PURE__ */ p.jsx("div", { className: "aiwa-panel-header", children: /* @__PURE__ */ p.jsx(Wj, { ...s, children: n }) });
}
function N3() {
  const n = typeof window.aiwaData == "function" ? window.aiwaData() : window.aiwaData, t = window.Telegram?.WebApp?.initDataUnsafe?.user;
  return (n?.name || t?.first_name || "").trim();
}
function O3({ className: n = "", onClick: t, label: s = "Открыть профиль" }) {
  const r = window.Telegram?.WebApp?.initDataUnsafe?.user?.photo_url, u = (N3()[0] || "•").toUpperCase(), c = `aiwa-avatar-initial${n ? ` ${n}` : ""}`, d = /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    u,
    r ? /* @__PURE__ */ p.jsx(
      "img",
      {
        className: "aiwa-avatar-photo",
        src: r,
        alt: "",
        onError: (g) => {
          g.currentTarget.style.display = "none";
        }
      }
    ) : null
  ] });
  return t ? /* @__PURE__ */ p.jsx("button", { type: "button", className: c, "aria-label": s, onClick: t, children: d }) : /* @__PURE__ */ p.jsx("span", { className: c, "aria-hidden": "true", children: d });
}
const sM = [
  "a[href]",
  "button",
  "input:not([type='hidden'])",
  "label",
  "select",
  "summary",
  "textarea",
  "[contenteditable='true']",
  "[onclick]",
  "[role='button']",
  "[role='checkbox']",
  "[role='combobox']",
  "[role='link']",
  "[role='menuitem']",
  "[role='option']",
  "[role='radio']",
  "[role='slider']",
  "[role='switch']",
  "[role='tab']",
  "[role='treeitem']",
  "[tabindex]:not([tabindex='-1'])",
  "[data-haptic='light']"
].join(","), lM = 50;
let Wv = -1 / 0, Iv = !1;
const oM = (n) => !!n.closest(":disabled, [inert], [aria-disabled='true'], [data-disabled='true']") || !!(n.tagName === "LABEL" && n.control?.disabled);
function $m() {
  if (typeof window > "u") return;
  if (typeof window.haptic == "function") {
    window.haptic("impact", "light");
    return;
  }
  const n = performance.now();
  if (n - Wv < lM) return;
  Wv = n;
  const t = window.Telegram?.WebApp;
  if (t?.HapticFeedback && !(t.isVersionAtLeast && !t.isVersionAtLeast("6.1")))
    try {
      t.HapticFeedback.impactOccurred("light");
    } catch {
    }
}
function rM() {
  Iv || typeof document > "u" || (Iv = !0, document.addEventListener(
    "click",
    (n) => {
      const t = n.target instanceof Element ? n.target.closest(sM) : null;
      !t || t.closest("[data-haptic='off']") || oM(t) || $m();
    },
    !0
  ));
}
const cM = 140;
function uM({ days: n, selectedIso: t = "", onSelect: s, onTick: l, dragAreaRef: r }) {
  const u = n.filter((b) => !b.disabled), c = u.findIndex((b) => b.iso === t), d = (c >= 0 ? c : u.length - 1) + 1, g = j.useRef(null);
  g.current = { openable: u, selectedIso: t, onSelect: s };
  const m = j.useRef(d), y = j.useRef(0);
  j.useEffect(() => () => clearTimeout(y.current), []);
  const v = (b) => {
    b !== m.current && $m(), m.current = b;
    const T = u[b - 1];
    T && typeof l == "function" && l(T), clearTimeout(y.current), y.current = setTimeout(() => {
      const { openable: S, selectedIso: C, onSelect: w } = g.current, M = S[m.current - 1];
      !M || M.iso === C || typeof w != "function" || w(M);
    }, cM);
  };
  return u.length ? /* @__PURE__ */ p.jsx(
    V7,
    {
      className: "aiwa-day-wheel",
      value: d,
      max: u.length,
      onChange: v,
      formatTick: (b) => u[b - 1]?.date,
      showValue: !1,
      showLimits: !1,
      indicator: "label",
      ariaLabel: "Выбор дня",
      dragAreaRef: r,
      enableHaptic: !1
    }
  ) : null;
}
function fM({
  days: n,
  selectedIso: t = "",
  heroValue: s,
  heroLabel: l = "",
  onSelect: r,
  previewDay: u,
  hero: c
}) {
  const d = j.useRef(null), [g, m] = j.useState(null), y = n.find((S) => S.today)?.iso, v = j.useRef(null);
  y && t === y && (v.current = { value: s, label: l });
  const b = (S) => {
    const C = S.iso === y && v.current ? v.current : typeof u == "function" ? u(S.iso) : null;
    C && m({ iso: S.iso, value: C.value, label: C.label });
  }, T = g && g.iso !== t ? g : null;
  return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-day-overview", ref: d, children: [
    /* @__PURE__ */ p.jsx(
      uM,
      {
        days: n,
        selectedIso: t,
        onSelect: r,
        onTick: b,
        dragAreaRef: d
      }
    ),
    typeof c == "function" ? c(T ? T.iso : t) : /* @__PURE__ */ p.jsxs("div", { className: "aiwa-countdown", children: [
      /* @__PURE__ */ p.jsx(ut, { variant: "title1", weight: "semibold", children: /* @__PURE__ */ p.jsx(js, { variant: "number", animation: "snappy", children: T ? T.value : s }) }),
      /* @__PURE__ */ p.jsx(ut, { variant: "body", weight: "regular", children: /* @__PURE__ */ p.jsx(js, { variant: "text", animation: "snappy", children: (T ? T.label : l) || "" }) })
    ] })
  ] });
}
function Tc({
  title: n,
  days: t,
  selectedIso: s,
  onSelect: l,
  previewDay: r,
  heroValue: u,
  heroLabel: c,
  hero: d,
  action: g,
  onProfile: m,
  onCalendar: y
}) {
  const v = Om(), b = s ?? v;
  return /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsx(
      Lm,
      {
        title: n || Nm(b),
        left: /* @__PURE__ */ p.jsx(O3, {}),
        onLeft: m,
        leftAriaLabel: "Открыть профиль",
        right: /* @__PURE__ */ p.jsx(U7, {}),
        onRight: y,
        rightAriaLabel: "Открыть календарь"
      }
    ),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-overview", children: [
      /* @__PURE__ */ p.jsx(
        fM,
        {
          days: t ?? iM(),
          selectedIso: b,
          heroValue: u,
          heroLabel: c,
          hero: d,
          previewDay: r,
          onSelect: l ?? ((T) => R3(T.iso))
        }
      ),
      g
    ] })
  ] });
}
const t2 = {
  food: {
    hero: "gauge",
    cards: ["insight", "rows-2", "rows-3"]
  },
  activity: {
    hero: "week",
    cards: ["insight", "rows-3", "rows-2"]
  }
}, dM = (n) => Array.from({ length: n }, (t, s) => s);
function hM({ kind: n }) {
  return n === "week" ? /* @__PURE__ */ p.jsxs("div", { className: "aiwa-countdown", children: [
    /* @__PURE__ */ p.jsx(uh, { active: !0, width: 2 }),
    /* @__PURE__ */ p.jsx(uh, { active: !0, width: 18 })
  ] }) : /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsx(Vn, { className: "aiwa-skeleton-gauge" }),
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-macro-grid", children: dM(3).map((t) => /* @__PURE__ */ p.jsx(Vn, { className: "aiwa-skeleton-macro" }, t)) })
  ] });
}
function L3({ cards: n }) {
  return /* @__PURE__ */ p.jsx("div", { className: "aiwa-skeleton-card-list", "aria-hidden": "true", children: n.map((t, s) => /* @__PURE__ */ p.jsx(Vn, { className: `aiwa-skeleton-card is-${t}` }, `${t}-${s}`)) });
}
function mM({ showToday: n = !1, showDelay: t = !1 }) {
  const s = [
    ...n ? ["today"] : [],
    "insight",
    ...t ? ["rows-1"] : [],
    "metrics",
    "chart"
  ];
  return /* @__PURE__ */ p.jsx("div", { className: "aiwa-deslop-home aiwa-home-skeleton", role: "status", "aria-label": "Айва загружается", children: /* @__PURE__ */ p.jsxs(cc, { active: !0, children: [
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-boot-header", "aria-hidden": "true", children: [
      /* @__PURE__ */ p.jsx("span", { className: "aiwa-boot-side", children: /* @__PURE__ */ p.jsx(Vn, { className: "aiwa-boot-avatar" }) }),
      /* @__PURE__ */ p.jsx(Vn, { className: "aiwa-boot-title" }),
      /* @__PURE__ */ p.jsx("span", { className: "aiwa-boot-side is-trailing", children: /* @__PURE__ */ p.jsx(Vn, { className: "aiwa-boot-calendar" }) })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-boot-overview", "aria-hidden": "true", children: [
      /* @__PURE__ */ p.jsxs("div", { className: "aiwa-boot-day-overview", children: [
        /* @__PURE__ */ p.jsx(Vn, { className: "aiwa-boot-wheel" }),
        /* @__PURE__ */ p.jsx(Vn, { className: "aiwa-boot-counter" })
      ] }),
      /* @__PURE__ */ p.jsx(Vn, { className: "aiwa-boot-action" })
    ] }),
    /* @__PURE__ */ p.jsx(L3, { cards: s })
  ] }) });
}
function $3({ variant: n = "food" }) {
  const { hero: t, cards: s } = t2[n] || t2.food;
  return /* @__PURE__ */ p.jsx(ji, { children: /* @__PURE__ */ p.jsx(Rs, { mode: "secondary", children: /* @__PURE__ */ p.jsxs("div", { className: `aiwa-paper-screen aiwa-screen-skeleton aiwa-${n}-screen`, children: [
    /* @__PURE__ */ p.jsx(
      Tc,
      {
        hero: () => /* @__PURE__ */ p.jsx(cc, { active: !0, children: /* @__PURE__ */ p.jsx(hM, { kind: t }) }),
        action: /* @__PURE__ */ p.jsx(Vn, { className: "aiwa-skeleton-cta" })
      }
    ),
    /* @__PURE__ */ p.jsx(cc, { active: !0, children: /* @__PURE__ */ p.jsx(L3, { cards: s }) })
  ] }) }) });
}
const e2 = 1e3 / 40, pM = 5e3, B3 = (n, t) => Array.from(
  { length: t },
  (s, l) => `/assets/${n}/frame-${String(l).padStart(3, "0")}.png`
), Bm = B3("aiwa-sequence", 182), lo = B3("aiwa-card-sequence", 193), Sd = /* @__PURE__ */ new Map(), wd = /* @__PURE__ */ new Map();
let Cd = null, z3 = !1, Td = null;
const gM = () => new Promise((n) => {
  requestAnimationFrame(() => requestAnimationFrame(() => {
    "requestIdleCallback" in window ? window.requestIdleCallback(n, { timeout: 1200 }) : window.setTimeout(n, 120);
  }));
}), vh = (n) => (wd.has(n) || wd.set(n, new Promise((t) => {
  const s = new Image();
  s.onload = () => {
    typeof s.decode == "function" ? s.decode().then(t, t) : t();
  }, s.onerror = t, s.src = n;
})), wd.get(n)), bh = (n) => (Sd.has(n) || Sd.set(
  n,
  gM().then(async () => {
    const t = n, s = 6;
    for (let l = 0; l < t.length; l += s)
      await Promise.all(t.slice(l, l + s).map(vh));
  })
), Sd.get(n)), zm = () => (Cd || (Cd = Promise.all([
  vh(Bm[0]),
  vh(lo[0])
]).then(() => {
  z3 = !0;
})), Cd), yM = () => z3, V3 = () => (Td || (zm(), Td = Promise.all([
  bh(Bm),
  bh(lo)
]).then(() => {
})), Td), jc = [
  ["Боль", [["cramps", "Спазмы"], ["head", "Голова"], ["breast", "Грудь"]]],
  ["Настроение", [["irrit", "Раздражительность"], ["anx", "Тревога"], ["low", "Апатия"]]],
  ["Тело", [["tired", "Усталость"], ["bloat", "Вздутие"], ["sweet", "Тянет на сладкое"]]],
  ["Кожа и сон", [["skin", "Высыпания"], ["insomnia", "Плохой сон"]]]
], xh = {
  // One line each at the bar width: a wrapped hint pushes the bar over the grid.
  period: { label: "Месячные", hint: "нажми на день, чтобы отметить месячные", checked: (n) => n.actualPeriod },
  symptoms: { label: "Симптомы", hint: "нажми на день, чтобы записать симптомы", checked: (n) => n.logged },
  intimacy: { label: "Близость", hint: "нажми на день, чтобы отметить близость", checked: (n) => n.intimacy }
}, vM = (n) => n.map((t) => ({ value: t, label: xh[t].label })), bM = [
  { label: "Месячные", variant: "tinted", token: "--aiwa-phase-menstrual" },
  { label: "Прогноз", variant: "outlined", token: "--aiwa-phase-menstrual" },
  { label: "Овуляция", variant: "tinted", token: "--aiwa-phase-ovulation" },
  { label: "Фолликулярная", variant: "tinted", token: "--aiwa-phase-follicular" },
  { label: "Лютеиновая", variant: "tinted", token: "--aiwa-phase-luteal" },
  { label: "Близость", variant: "tinted", token: "--aiwa-intimacy" }
], k3 = [[1, "Низкая"], [2, "Средняя"], [3, "Высокая"]], U3 = [[1, "Плохое"], [2, "Нормальное"], [3, "Хорошее"]], n2 = "/assets/food/pancakes.png", H3 = [
  { value: "breakfast", label: "Завтрак" },
  { value: "lunch", label: "Обед" },
  { value: "snack", label: "Перекус" },
  { value: "dinner", label: "Ужин" }
], xM = (n) => ({
  title: n?.title || "",
  kcal: String(n?.kcal ?? ""),
  grams: String(n?.grams ?? ""),
  protein: String(n?.protein ?? ""),
  fat: String(n?.fat ?? ""),
  carbs: String(n?.carbs ?? ""),
  slot: n?.slot || "snack"
}), SM = ["Силовая", "Кардио", "Йога", "Ходьба", "Плавание", "Своё"], fi = {
  Ноги: ["Присед", "Жим ногами", "Выпады", "Болгарские", "Румынская тяга", "Разгибания", "Сгибания", "Икры"],
  Спина: ["Вертикальная тяга", "Горизонтальная тяга", "Тяга в наклоне", "Становая", "Подтягивания", "Гиперэкстензия"],
  Грудь: ["Жим лёжа", "Жим гантелей", "Жим в наклоне", "Сведения", "Отжимания"],
  Плечи: ["Жим стоя", "Махи в стороны", "Махи в наклоне", "Протяжка"],
  Ягодицы: ["Ягодичный мост", "Отведение бедра", "Мах ногой", "Плие-присед"],
  Руки: ["Бицепс", "Молоток", "Разгибания трицепс", "Французский жим"],
  Кор: ["Планка", "Скручивания", "Подъём ног", "Русский твист"]
}, wM = {
  Силовая: [],
  Кардио: ["Бег", "Велотренажёр", "Эллипс", "Гребля", "Скакалка"],
  Йога: ["Виньяса", "Хатха", "Растяжка", "Пилатес", "Дыхание"],
  Ходьба: ["Прогулка", "Скандинавская", "Быстрая ходьба"],
  Плавание: ["Кроль", "Брасс", "На спине"],
  Своё: []
}, dc = [
  { value: "cycle", label: "Регулярный цикл" },
  { value: "irregular", label: "Нерегулярный" },
  { value: "preg", label: "Беременность" },
  { value: "meno", label: "Менопауза" },
  { value: "none", label: "Нет месячных" },
  { value: "male", label: "Мужской режим" }
], a2 = (n) => (dc.find((t) => t.value === n) || dc[0]).label;
function CM(n, ...t) {
  j.useEffect(() => {
    const s = n.current;
    if (!s) return;
    const l = (r) => {
      if (r.ctrlKey || Math.abs(r.deltaX) > Math.abs(r.deltaY)) return;
      const u = s.scrollWidth - s.clientWidth;
      if (u <= 0) return;
      const c = Math.min(u, Math.max(0, s.scrollLeft + r.deltaY));
      c !== s.scrollLeft && (s.scrollLeft = c, r.preventDefault());
    };
    return s.addEventListener("wheel", l, { passive: !1 }), () => s.removeEventListener("wheel", l);
  }, [n, ...t]);
}
const i2 = "custom:";
function TM(n) {
  const t = n?.length ? n.flatMap(([, s]) => s) : jc.flatMap(([, s]) => s.flat());
  return new Map(t);
}
function jM({ title: n = "Сегодня", checkin: t, symptomGroups: s, onSelect: l }) {
  const r = t?.symptoms ?? [], u = j.useRef(null);
  if (CM(u, r.length), !r.length) return null;
  const c = TM(s), d = l ?? (() => bn("openHomePanel", "journal"));
  return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-today", children: [
    /* @__PURE__ */ p.jsx(ut, { className: "aiwa-today-title", variant: "body", weight: "semibold", children: n }),
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-today-chips", role: "group", "aria-label": n, ref: u, children: r.map((g) => {
      const m = g.startsWith(i2) ? g.slice(i2.length) : c.get(g) ?? g;
      return /* @__PURE__ */ p.jsx(
        Ge,
        {
          as: "button",
          type: "button",
          mode: "opacity",
          className: "aiwa-today-chip",
          onClick: () => d(g),
          title: m,
          children: /* @__PURE__ */ p.jsx(ut, { variant: "body", weight: "regular", children: m })
        },
        g
      );
    }) })
  ] });
}
const s2 = {
  primary: "filled",
  secondary: "filled",
  secondaryCanvas: "filled",
  outlined: "outlined"
};
function Hn({
  variant: n = "primary",
  className: t,
  disabled: s = !1,
  loading: l = !1,
  label: r,
  onClick: u,
  onKeyDown: c,
  "aria-label": d,
  ...g
}) {
  const m = t ? { className: t } : {}, y = s || l, v = d || (typeof r == "string" ? r : "Действие");
  return /* @__PURE__ */ p.jsx(
    De,
    {
      ...g,
      ...m,
      variant: s2[n] || s2.primary,
      label: l ? /* @__PURE__ */ p.jsx("span", { className: "aiwa-button-spinner", "aria-hidden": "true", children: /* @__PURE__ */ p.jsx(Sc, { size: 20, focusable: "false" }) }) : r,
      "data-aiwa-button-variant": n,
      "data-loading": l || void 0,
      disabled: y || void 0,
      "aria-disabled": y || void 0,
      "aria-busy": l || void 0,
      "aria-label": l ? `${v} — выполняется` : d,
      onClick: y ? void 0 : u,
      onKeyDown: y ? void 0 : c
    }
  );
}
function Vm({ size: n, frames: t = Bm, pauseMs: s = pM }) {
  const [l, r] = j.useState(0);
  return j.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let c = !1, d = 0, g = 0;
    const m = () => {
      let y = 0;
      r(y), d = window.setInterval(() => {
        y += 1, r(y), y === t.length - 1 && (window.clearInterval(d), g = window.setTimeout(m, s || e2));
      }, e2);
    };
    return bh(t).then(() => {
      c || m();
    }), () => {
      c = !0, window.clearInterval(d), window.clearTimeout(g);
    };
  }, [t, s]), /* @__PURE__ */ p.jsx(
    "span",
    {
      className: "aiwa-sequence",
      style: { "--aiwa-sequence-size": `${n}px` },
      "data-aiwa-sequence": "true",
      "data-sequence": t === lo ? "card" : "default",
      "data-pause-ms": s,
      "data-frame": l,
      "aria-hidden": "true",
      children: /* @__PURE__ */ p.jsx("img", { src: t[l], alt: "", draggable: "false" })
    }
  );
}
function EM() {
  return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-paper-ai-heading", children: [
    /* @__PURE__ */ p.jsx(Vm, { size: 58, frames: lo, pauseMs: 0 }),
    /* @__PURE__ */ p.jsx("div", { children: /* @__PURE__ */ p.jsx(ut, { variant: "body", weight: "semibold", children: "Айва AI" }) })
  ] });
}
function AM(n) {
  return /* @__PURE__ */ p.jsx(ca, { ...n, "data-aiwa-cell": "true" });
}
const Tt = Object.assign(AM, {
  Start: ca.Start,
  End: ca.End,
  Part: ca.Part,
  Text: ca.Text,
  Editable: ca.Editable,
  Switch: ca.Switch
});
function Jl({
  message: n,
  detail: t,
  onDiscuss: s,
  chip: l = "",
  className: r = ""
}) {
  return /* @__PURE__ */ p.jsx(pt.Item, { className: `aiwa-insight-section ${r}`.trim(), children: /* @__PURE__ */ p.jsx(Tt, { "data-aiwa-insight-cell": "true", tappable: !1, children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-insight-content", children: [
    /* @__PURE__ */ p.jsx(EM, {}),
    l ? /* @__PURE__ */ p.jsx("span", { className: "aiwa-insight-chip", children: l }) : null,
    /* @__PURE__ */ p.jsx(ut, { className: "aiwa-insight-message", variant: "body", weight: "regular", children: n }),
    t ? /* @__PURE__ */ p.jsx(ut, { className: "aiwa-insight-detail", variant: "body", weight: "regular", children: t }) : null,
    s ? /* @__PURE__ */ p.jsx(
      Hn,
      {
        variant: "secondary",
        label: "Обсудить с Айвой",
        isFill: !0,
        onClick: s
      }
    ) : null
  ] }) }) });
}
function MM({ aiText: n, aiChip: t = "" }) {
  return /* @__PURE__ */ p.jsx(
    Jl,
    {
      message: n,
      chip: t,
      onDiscuss: () => As()
    }
  );
}
function _M({ delay: n }) {
  return n ? /* @__PURE__ */ p.jsxs(pt.Item, { header: n.title, children: [
    /* @__PURE__ */ p.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ p.jsx(Tt.Text, { title: n.message, description: n.hint }) }),
    n.canSwitchToPregnancy ? /* @__PURE__ */ p.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ p.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ p.jsx(
      De,
      {
        variant: "filled",
        label: "Перейти в режим беременности",
        isFill: !0,
        ...ne("Перейти в режим беременности", () => bn("switchPreg"))
      }
    ) }) }) : null
  ] }) : null;
}
function l2({ ok: n, pending: t = !1 }) {
  const s = t ? q7 : n ? wc : hh, l = t ? "aiwa-status is-pending" : n ? "aiwa-status is-ok" : "aiwa-status is-alert", r = t ? "Рассчитывается" : n ? "В пределах нормы" : "Требует внимания";
  return /* @__PURE__ */ p.jsx("span", { className: l, "aria-label": r, children: /* @__PURE__ */ p.jsx(s, {}) });
}
const DM = "Рассчитывается", RM = (n) => {
  const t = String(n ?? "").trim();
  return !t || t === "—" || t === "–" || t === "-";
};
function NM({ label: n, value: t, ok: s }) {
  const l = RM(t), r = s ? "Значение в пределах нормы" : "Значения вышли за пределы нормы";
  return /* @__PURE__ */ p.jsx(
    Tt,
    {
      "data-aiwa-metric-cell": "true",
      tappable: !1,
      end: l ? /* @__PURE__ */ p.jsx(l2, { pending: !0 }) : /* @__PURE__ */ p.jsx(b7, { content: r, placement: "auto", children: /* @__PURE__ */ p.jsx("span", { className: "aiwa-metric-status-hit", children: /* @__PURE__ */ p.jsx(l2, { ok: s }) }) }),
      children: /* @__PURE__ */ p.jsx(Tt.Text, { title: n, description: l ? DM : t })
    }
  );
}
function OM({ metrics: n, title: t = "Статистика" }) {
  return n?.length ? /* @__PURE__ */ p.jsx(pt.Item, { header: t, children: n.map((s) => /* @__PURE__ */ p.jsx(NM, { ...s }, s.label)) }) : null;
}
const LM = j.lazy(() => import("./AiwaWebUiChart-aiwa-v227.js?v=r81").then((n) => ({
  default: n.AiwaWebUiChart
})));
function $M() {
  return /* @__PURE__ */ p.jsx("div", { className: "aiwa-area-chart-state is-loading", role: "status", "aria-label": "График загружается", children: /* @__PURE__ */ p.jsx("span", { className: "aiwa-area-chart-skeleton", "aria-hidden": "true" }) });
}
function o2({ title: n }) {
  return /* @__PURE__ */ p.jsxs("section", { className: "aiwa-chart-loading-section", children: [
    /* @__PURE__ */ p.jsx(
      ut,
      {
        as: "p",
        className: "aiwa-chart-loading-title",
        variant: "body",
        weight: "semibold",
        children: n
      }
    ),
    /* @__PURE__ */ p.jsx($M, {})
  ] });
}
function BM({
  data: n,
  series: t,
  xKey: s,
  band: l = null,
  loading: r = !1,
  title: u = "Динамика цикла",
  emptyText: c = "Продолжай вести дневник, чтобы увидеть динамику цикла"
}) {
  return r ? /* @__PURE__ */ p.jsx(o2, { title: u }) : /* @__PURE__ */ p.jsx(j.Suspense, { fallback: /* @__PURE__ */ p.jsx(o2, { title: u }), children: /* @__PURE__ */ p.jsx(pt.Item, { header: u, children: /* @__PURE__ */ p.jsx(
    LM,
    {
      data: n,
      series: t,
      xKey: s,
      band: l,
      ariaLabel: u,
      emptyText: c
    }
  ) }) });
}
function zM({
  history: n,
  title: t = "История цикла"
}) {
  const [s, l] = j.useState(!1), r = n || [];
  if (!r.length) return null;
  const u = s ? r : r.slice(0, 3);
  return /* @__PURE__ */ p.jsxs(pt.Item, { header: t, children: [
    u.map((c) => /* @__PURE__ */ p.jsx(Tt, { "data-aiwa-history-cell": "true", tappable: !1, children: /* @__PURE__ */ p.jsx(Tt.Text, { title: c.title, description: c.description }) }, c.key)),
    r.length > 3 ? /* @__PURE__ */ p.jsx(
      Tt,
      {
        as: "button",
        type: "button",
        "data-aiwa-row-variant": "compact",
        onClick: () => l((c) => !c),
        children: /* @__PURE__ */ p.jsx(Tt.Text, { type: "Accent", title: s ? "Свернуть" : "Показать все" })
      }
    ) : null
  ] });
}
const VM = Object.fromEntries(
  jc.flatMap(([, n]) => n)
), kM = { 1: "низкая энергия", 2: "средняя энергия", 3: "высокая энергия" }, UM = { 1: "плохое настроение", 2: "нормальное настроение", 3: "хорошее настроение" }, HM = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }), qM = (n) => {
  const s = VM[n] || String(n).split(":").pop().replace(/_/g, " ").trim();
  return s ? s[0].toUpperCase() + s.slice(1) : "";
}, YM = (n) => [
  ...(n.symptoms || []).map(qM),
  kM[n.energy],
  UM[n.mood]
].filter(Boolean).map((s) => s[0].toUpperCase() + s.slice(1)).join(" • ") || "Без деталей", GM = (n) => {
  const t = /* @__PURE__ */ new Date(`${n}T12:00:00`);
  return Number.isNaN(t.getTime()) ? n : HM.format(t);
};
function PM() {
  const [n, t] = j.useState(null), [s, l] = j.useState(!1), [r, u] = j.useState(!1);
  j.useEffect(() => {
    Gt("/api/log_history", {}).then((g) => t(g?.items || [])).catch(() => t([]));
  }, []);
  const c = async () => {
    if (!r) {
      u(!0);
      try {
        const g = await Gt("/api/report", { period: "all" }).catch(() => null);
        g?.ok ? At("Выписка отправлена в чат бота", { type: "success" }) : At(g?.text || "Выписка временно недоступна", { type: "error" });
      } finally {
        u(!1);
      }
    }
  };
  if (!n?.length) return null;
  const d = s ? n : n.slice(0, 3);
  return /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsxs(pt.Item, { header: "Журнал симптомов", children: [
      d.map((g) => /* @__PURE__ */ p.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ p.jsx(Tt.Text, { title: GM(g.d), description: YM(g) }) }, g.d)),
      n.length > 3 ? /* @__PURE__ */ p.jsx(
        Tt,
        {
          as: "button",
          type: "button",
          "data-aiwa-row-variant": "compact",
          onClick: () => l((g) => !g),
          children: /* @__PURE__ */ p.jsx(Tt.Text, { type: "Accent", title: s ? "Свернуть" : "Показать все" })
        }
      ) : null
    ] }),
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-page-action", children: /* @__PURE__ */ p.jsx(
      Hn,
      {
        variant: "secondaryCanvas",
        label: "Сформировать выписку",
        loading: r,
        isFill: !0,
        ...ne("Сформировать выписку", c)
      }
    ) })
  ] });
}
const jd = {
  4: ["маковое зёрнышко", "~2 мм"],
  5: ["кунжутное семечко", "~3 мм"],
  6: ["горошина", "~6 мм"],
  7: ["черника", "~1.3 см"],
  8: ["малина", "~1.6 см"],
  9: ["виноградина", "~2.3 см"],
  10: ["клубника", "~3 см"],
  11: ["инжир", "~4 см"],
  12: ["лайм", "~5 см"],
  13: ["стручок гороха", "~7 см"],
  14: ["лимон", "~8.5 см"],
  15: ["яблоко", "~10 см"],
  16: ["авокадо", "~11.5 см"],
  17: ["репа", "~13 см"],
  18: ["болгарский перец", "~14 см"],
  19: ["манго", "~15 см"],
  20: ["банан", "~16 см"],
  21: ["морковь", "~26 см"],
  22: ["кабачок", "~28 см"],
  23: ["грейпфрут", "~29 см"],
  24: ["кукуруза", "~30 см"],
  25: ["цветная капуста", "~34 см"],
  26: ["кочан салата", "~35 см"],
  27: ["брокколи", "~36 см"],
  28: ["баклажан", "~37 см"],
  29: ["тыква", "~38 см"],
  30: ["капуста", "~39 см"],
  31: ["кокос", "~41 см"],
  32: ["большой кабачок", "~42 см"],
  33: ["ананас", "~43 см"],
  34: ["дыня", "~45 см"],
  35: ["медовая дыня", "~46 см"],
  36: ["салат романо", "~47 см"],
  37: ["сельдерей", "~48 см"],
  38: ["лук-порей", "~49 см"],
  39: ["мини-арбуз", "~50 см"],
  40: ["небольшая тыква", "~51 см"]
}, XM = (n) => {
  let t = Math.min(Math.max(Math.round(n) || 4, 4), 40);
  for (; t > 4 && !jd[t]; ) t -= 1;
  return { week: t, name: jd[t][0], size: jd[t][1] };
};
function KM({ pregnancy: n }) {
  const [t, s] = j.useState({});
  j.useEffect(() => {
    fetch("/assets/preg/manifest.json?v=1").then((d) => d.ok ? d.json() : {}).then((d) => s(d || {})).catch(() => {
    });
  }, []);
  const l = Math.min(Math.max(Number(n?.week) || 4, 1), 40), r = XM(l), u = t[String(r.week)], c = Math.min(100, Math.max(2, l / 40 * 100));
  return /* @__PURE__ */ p.jsx(pt.Item, { header: "Срок и малыш", children: /* @__PURE__ */ p.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-preg-progress", children: [
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-preg-track", role: "img", "aria-label": `${l} неделя из 40`, children: [
      /* @__PURE__ */ p.jsx("div", { className: "aiwa-preg-fill", style: { width: `${c}%` } }),
      /* @__PURE__ */ p.jsx("span", { className: "aiwa-preg-marker", style: { left: `${c}%` } })
    ] }),
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-preg-trimesters", children: [1, 2, 3].map((d) => /* @__PURE__ */ p.jsxs(
      ut,
      {
        variant: "caption1",
        weight: n?.trimester === d ? "semibold" : "regular",
        className: n?.trimester === d ? "is-current" : "",
        children: [
          d,
          " триместр"
        ]
      },
      d
    )) }),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-preg-fruit", children: [
      u ? /* @__PURE__ */ p.jsx("img", { src: u, alt: "", width: "64", height: "64", loading: "lazy" }) : null,
      /* @__PURE__ */ p.jsxs("div", { children: [
        /* @__PURE__ */ p.jsx(ut, { variant: "body", weight: "semibold", children: `${l} неделя` }),
        /* @__PURE__ */ p.jsx(ut, { variant: "body", weight: "regular", children: `Малыш размером с ${r.name}, ${r.size}` })
      ] })
    ] })
  ] }) }) });
}
const bs = [];
let r2 = !1;
const q3 = () => typeof window < "u" ? window.Telegram?.WebApp?.BackButton : null, QM = () => {
  $m(), bs[bs.length - 1]?.();
}, c2 = () => {
  const n = q3();
  n && (bs.length ? n.show?.() : n.hide?.());
}, ZM = (n) => {
  const t = q3();
  return t && !r2 && (t.onClick?.(QM), r2 = !0), bs.push(n), c2(), () => {
    const s = bs.lastIndexOf(n);
    s !== -1 && bs.splice(s, 1), c2();
  };
};
function Y3(n, t) {
  const s = j.useRef(t);
  s.current = t, j.useEffect(() => {
    if (n)
      return ZM(() => s.current?.());
  }, [n]);
}
function Rn({ isOpen: n, onClose: t, onBack: s, children: l, ...r }) {
  return Y3(n, s || t), j.useEffect(() => {
    if (!n) return;
    const u = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.body.style.overflow = u;
    };
  }, [n]), n ? io.createPortal(
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-page", role: "dialog", "aria-modal": "true", ...r, children: l }),
    document.body
  ) : null;
}
function Ec({
  label: n,
  active: t = !1,
  onClick: s,
  isFill: l = !1,
  surface: r = "container",
  end: u = null,
  className: c = "",
  ...d
}) {
  const g = u ? /* @__PURE__ */ p.jsxs("span", { className: "aiwa-chip-content", children: [
    /* @__PURE__ */ p.jsx("span", { className: "aiwa-chip-label", children: n }),
    u
  ] }) : n;
  return /* @__PURE__ */ p.jsx(
    Ge,
    {
      as: "button",
      type: "button",
      mode: "opacity",
      className: `aiwa-chip${r === "canvas" ? " is-on-canvas" : ""}${l ? " is-fill" : ""}${c ? ` ${c}` : ""}`,
      "aria-pressed": t,
      onClick: s,
      ...d,
      children: /* @__PURE__ */ p.jsx(De, { variant: t ? "tinted" : "gray", label: g, isFill: l })
    }
  );
}
function Sh({ label: n, active: t, onChange: s, variant: l = "default" }) {
  return /* @__PURE__ */ p.jsx(
    Ec,
    {
      className: `aiwa-log-toggle is-${l}-toggle`,
      label: n,
      active: t,
      isFill: !0,
      surface: "canvas",
      "aria-label": `${n}: ${t ? "да" : "нет"}`,
      onClick: () => s(!t),
      end: /* @__PURE__ */ p.jsx("span", { className: "aiwa-log-toggle-mark", "aria-hidden": "true", children: t ? /* @__PURE__ */ p.jsx(wc, {}) : null })
    }
  );
}
function G3({ label: n, children: t }) {
  return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-log-group", children: [
    /* @__PURE__ */ p.jsx(ut, { className: "aiwa-log-label", variant: "subheadline1", weight: "regular", children: n }),
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-log-choices", role: "group", "aria-label": n, children: t })
  ] });
}
function hc({ label: n, options: t, value: s, onChange: l }) {
  return /* @__PURE__ */ p.jsx(G3, { label: n, children: t.map(([r, u]) => /* @__PURE__ */ p.jsx(
    Ec,
    {
      label: u,
      active: s === r,
      onClick: () => l(r)
    },
    r
  )) });
}
function P3({ label: n, options: t, symptoms: s, onToggle: l }) {
  return /* @__PURE__ */ p.jsx(G3, { label: n, children: t.map(([r, u]) => /* @__PURE__ */ p.jsx(
    Ec,
    {
      label: u,
      active: s.includes(r),
      onClick: () => l(r)
    },
    r
  )) });
}
function me({
  label: n,
  value: t,
  onChange: s = () => {
  },
  placeholder: l = "",
  type: r = "text",
  inputMode: u,
  multiline: c = !1,
  readOnly: d = !1,
  ...g
}) {
  const m = {
    ...g,
    inputMode: u,
    value: t,
    placeholder: l,
    readOnly: d,
    onChange: (y) => s(y.target.value)
  };
  return /* @__PURE__ */ p.jsxs("label", { className: "aiwa-field", children: [
    /* @__PURE__ */ p.jsx(ut, { variant: "caption1", weight: "regular", children: n }),
    c ? /* @__PURE__ */ p.jsx("textarea", { ...m }) : /* @__PURE__ */ p.jsx("input", { type: r, ...m })
  ] });
}
function X3({ value: n, onChange: t }) {
  return /* @__PURE__ */ p.jsx("div", { className: "aiwa-custom-symptom", children: /* @__PURE__ */ p.jsx(
    me,
    {
      label: "Свой симптом",
      value: n,
      onChange: t,
      placeholder: "Например, тошнота",
      maxLength: 40
    }
  ) });
}
function FM({ isOpen: n, onClose: t, checkin: s, symptomGroups: l, mode: r }) {
  const [u, c] = j.useState(s.symptoms || []), [d, g] = j.useState(s.energy || 0), [m, y] = j.useState(s.mood || 0), [v, b] = j.useState(!!s.period), [T, S] = j.useState(!!s.intimacy), [C, w] = j.useState(""), [M, _] = j.useState(!1);
  j.useEffect(() => {
    n && (c(s.symptoms || []), g(s.energy || 0), y(s.mood || 0), b(!!s.period), S(!!s.intimacy), w(""), _(!1));
  }, [n]);
  const R = ($) => {
    c((E) => E.includes($) ? E.filter((z) => z !== $) : [...E, $]);
  }, D = l?.length ? l : jc, L = async () => {
    if (M) return;
    const $ = s.symptoms || [], E = C.trim();
    _(!0);
    try {
      await W7(async () => {
        v !== !!s.period && await Ft("toggleTodayPeriod"), d !== (s.energy || 0) && await Ft("setCheckin", "energy", d), m !== (s.mood || 0) && await Ft("setCheckin", "mood", m);
        for (const z of u.filter((k) => !$.includes(k)))
          await Ft("toggleSym", z);
        for (const z of $.filter((k) => !u.includes(k)))
          await Ft("toggleSym", z);
        T !== !!s.intimacy && await Ft("toggleTodayIntimacy"), E && await Ft("addCustomSym", E);
      }), At("Сохранили в журнал", { type: "success" }), t();
    } catch (z) {
      At(z?.message || "Не удалось сохранить", { type: "error" });
    } finally {
      _(!1);
    }
  };
  return /* @__PURE__ */ p.jsxs(
    Rn,
    {
      isOpen: n,
      onClose: t,
      "data-aiwa-log-modal": "true",
      children: [
        /* @__PURE__ */ p.jsx(Lm, { size: "large", title: "Занести в журнал" }),
        /* @__PURE__ */ p.jsx("div", { className: "aiwa-log-scroll", children: /* @__PURE__ */ p.jsxs(pt, { className: "aiwa-log-sections", children: [
          r !== "preg" && r !== "meno" ? /* @__PURE__ */ p.jsx(pt.Item, { children: r === "male" ? null : /* @__PURE__ */ p.jsx(Sh, { label: "Месячные", variant: "period", active: v, onChange: b }) }) : null,
          /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(
            hc,
            {
              label: "Энергия",
              options: k3,
              value: d,
              onChange: g
            }
          ) }),
          /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(
            hc,
            {
              label: "Настроение",
              options: U3,
              value: m,
              onChange: y
            }
          ) }),
          D.map(([$, E]) => /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(P3, { label: $, options: E, symptoms: u, onToggle: R }) }, $)),
          /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(X3, { value: C, onChange: w }) }),
          /* @__PURE__ */ p.jsx(pt.Item, { children: r === "male" ? null : /* @__PURE__ */ p.jsx(Sh, { label: "Близость", active: T, onChange: S }) })
        ] }) }),
        /* @__PURE__ */ p.jsx("div", { className: "aiwa-log-footer", children: /* @__PURE__ */ p.jsx(
          Hn,
          {
            label: "Сохранить",
            loading: M,
            isFill: !0,
            ...ne("Сохранить", L)
          }
        ) })
      ]
    }
  );
}
const u2 = (n, t = "") => [
  "aiwa-date-cell",
  n.actualPeriod ? "is-actual-period" : "",
  n.predictedPeriod ? "is-predicted-period" : "",
  n.phase ? `is-phase-${n.phase}` : "",
  n.workout ? "is-workout" : "",
  n.today ? "is-today" : "",
  n.selected ? "is-selected" : "",
  n.muted ? "is-muted" : "",
  t
].filter(Boolean).join(" ");
function JM({
  day: n,
  interactive: t = !1,
  monthLabel: s = "",
  showTodayLabel: l = !1,
  variant: r = "",
  onSelect: u = null,
  marking: c = !1,
  checked: d = !1,
  // What the selection glyph is. «Близость» marks a day with the same heart the
  // calendar already uses for it outside marking mode, so the mark you are making
  // looks like the mark you will get; everything else keeps the neutral radio.
  markVariant: g = "radio"
}) {
  const m = c && g === "heart", y = [r ? `is-${r}` : "", c ? "is-marking" : ""].filter(Boolean).join(" "), v = c ? { iso: n.iso, today: n.today, muted: n.muted } : n, b = /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    c ? null : /* @__PURE__ */ p.jsx("span", { className: "aiwa-date-cell-ring", "aria-hidden": "true" }),
    !c && n.cycleDay ? /* @__PURE__ */ p.jsx("span", { className: "aiwa-date-cell-cycleday", "aria-hidden": "true", children: n.cycleDay }) : null,
    /* @__PURE__ */ p.jsx(ut, { className: "aiwa-date-cell-number", variant: "body", weight: "regular", children: n.date }),
    c ? /* @__PURE__ */ p.jsx(
      "span",
      {
        className: `aiwa-date-cell-radio${m ? " is-heart" : ""}${d ? " is-checked" : ""}`,
        "aria-hidden": "true",
        children: m ? /* @__PURE__ */ p.jsx(Y7, {}) : d ? /* @__PURE__ */ p.jsx(wc, {}) : null
      }
    ) : null,
    !c && n.phase && !n.actualPeriod && !n.predictedPeriod ? /* @__PURE__ */ p.jsx("span", { className: "aiwa-date-cell-dot", "aria-hidden": "true" }) : null,
    !c && n.intimacy ? /* @__PURE__ */ p.jsx("span", { className: "aiwa-date-cell-heart", "aria-hidden": "true", children: "♥" }) : null,
    l && n.today && !c ? /* @__PURE__ */ p.jsx(ut, { className: "aiwa-date-cell-today", variant: "caption1", weight: "regular", children: "Сегодня" }) : null
  ] });
  if (!t)
    return /* @__PURE__ */ p.jsx("div", { className: u2(v, y), "data-iso": n.iso, "aria-label": `${n.label || "День"}, ${n.date}`, children: b });
  const T = s || n.monthLabel || "", S = T ? `${n.date} ${T}` : `${n.label || "День"}, ${n.date}`, C = c ? d ? ", отмечено" : "" : `${n.actualPeriod ? ", отмечены месячные" : ""}${n.predictedPeriod ? ", прогноз месячных" : ""}${n.intimacy ? ", отмечена близость" : ""}`;
  return /* @__PURE__ */ p.jsx(
    Ge,
    {
      as: "button",
      type: "button",
      mode: "opacity",
      disabled: n.disabled,
      "aria-label": `${S}${C}`,
      "aria-pressed": c ? d : typeof n.selected == "boolean" ? n.selected : void 0,
      className: u2(v, ["aiwa-calendar-day", y].filter(Boolean).join(" ")),
      "data-iso": n.iso,
      onClick: () => u ? u(n) : bn("aiwaCalendarDay", n.iso),
      children: b
    }
  );
}
function WM({ icon: n, label: t, onClick: s, className: l = "", ...r }) {
  return /* @__PURE__ */ p.jsx(
    Ge,
    {
      as: "button",
      type: "button",
      mode: "opacity",
      "aria-label": t,
      className: `aiwa-fab${l ? ` ${l}` : ""}`,
      onClick: s,
      ...r,
      children: /* @__PURE__ */ p.jsx(gm, { className: "aiwa-fab-surface", children: /* @__PURE__ */ p.jsx("span", { className: "aiwa-fab-icon", "aria-hidden": "true", children: n }) })
    }
  );
}
const Al = 8, f2 = 6;
function IM(n, t, s) {
  const l = window.innerWidth, r = window.innerHeight;
  let u = s === "end" ? n.right - t.width : n.left;
  u = Math.min(u, l - t.width - Al), u = Math.max(Al, u);
  const c = n.bottom + f2, d = n.top - f2 - t.height, g = c + t.height <= r - Al, m = g || d < Al ? c : d, y = g || d < Al ? "top" : "bottom";
  return { top: m, left: u, originY: y };
}
function K3({ items: n, trigger: t, align: s = "start", className: l = "" }) {
  const [r, u] = j.useState(!1), [c, d] = j.useState({ top: 0, left: 0, originY: "top" }), g = j.useRef(null), m = j.useRef(null), y = j.useCallback(() => {
    u(!1);
  }, []);
  j.useLayoutEffect(() => {
    if (!r || !m.current || !g.current) return;
    const b = () => {
      const T = g.current.getBoundingClientRect(), S = { width: m.current.offsetWidth, height: m.current.offsetHeight };
      d(IM(T, S, s));
    };
    return b(), window.addEventListener("resize", b), window.addEventListener("scroll", b, !0), () => {
      window.removeEventListener("resize", b), window.removeEventListener("scroll", b, !0);
    };
  }, [r, s]), j.useEffect(() => {
    if (!r) return;
    const b = (S) => {
      m.current?.contains(S.target) || g.current?.contains(S.target) || y();
    }, T = (S) => {
      S.key === "Escape" && y();
    };
    return document.addEventListener("pointerdown", b, !0), document.addEventListener("keydown", T), () => {
      document.removeEventListener("pointerdown", b, !0), document.removeEventListener("keydown", T);
    };
  }, [r, y]);
  const v = (b) => {
    y(), b.onSelect?.();
  };
  return /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsx(
      "div",
      {
        ref: g,
        className: `aiwa-action-menu-trigger${l ? ` ${l}` : ""}`,
        onClickCapture: (b) => {
          b.preventDefault(), b.stopPropagation(), r ? y() : u(!0);
        },
        role: "button",
        tabIndex: 0,
        "aria-haspopup": "menu",
        "aria-expanded": r,
        onKeyDownCapture: (b) => {
          (b.key === "Enter" || b.key === " ") && (b.preventDefault(), b.stopPropagation(), r ? y() : u(!0));
        },
        children: t
      }
    ),
    r && io.createPortal(
      /* @__PURE__ */ p.jsx(
        "div",
        {
          ref: m,
          role: "menu",
          className: "aiwa-action-menu",
          "data-align": s,
          style: {
            position: "fixed",
            top: c.top,
            left: c.left,
            transformOrigin: `${s === "end" ? "right" : "left"} ${c.originY}`
          },
          children: n.map((b) => /* @__PURE__ */ p.jsxs(
            "button",
            {
              type: "button",
              role: "menuitem",
              className: "aiwa-action-menu-item",
              onClick: () => v(b),
              children: [
                b.icon ? /* @__PURE__ */ p.jsx("span", { className: "aiwa-action-menu-icon", "aria-hidden": "true", children: b.icon }) : null,
                /* @__PURE__ */ p.jsx(ut, { variant: "body", weight: "regular", children: b.label })
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
function t_({ options: n, value: t, onChange: s, hint: l }) {
  return /* @__PURE__ */ p.jsxs(gm, { className: "aiwa-mark-bar", role: "group", "aria-label": "Что отмечаем", children: [
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-mark-bar-chips", children: n.map((r) => /* @__PURE__ */ p.jsx(
      Ec,
      {
        label: r.label,
        active: t === r.value,
        onClick: () => s(r.value)
      },
      r.value
    )) }),
    l ? /* @__PURE__ */ p.jsx(ut, { className: "aiwa-mark-bar-hint", variant: "footnote", weight: "regular", role: "status", children: l }) : null
  ] });
}
function e_({ iso: n, label: t, open: s, onClose: l, symptomGroups: r, showIntimacy: u = !0 }) {
  const [c, d] = j.useState({}), [g, m] = j.useState([]), [y, v] = j.useState(0), [b, T] = j.useState(0), [S, C] = j.useState(!1), [w, M] = j.useState(""), [_, R] = j.useState(!1);
  j.useEffect(() => {
    if (!n || !s) return;
    const E = Ft("getAiwaDayCheckin", n) || {};
    d(E), m(E.symptoms || []), v(E.energy || 0), T(E.mood || 0), C(!!E.intimacy), M(""), R(!1);
  }, [n, s]);
  const D = (E) => {
    m((z) => z.includes(E) ? z.filter((k) => k !== E) : [...z, E]);
  }, L = r?.length ? r : jc, $ = async () => {
    if (_) return;
    const E = c.symptoms || [], z = w.trim();
    R(!0);
    try {
      y !== (c.energy || 0) && await Ft("setDayCheckin", n, "energy", y), b !== (c.mood || 0) && await Ft("setDayCheckin", n, "mood", b);
      for (const k of g.filter((Y) => !E.includes(Y)))
        await Ft("toggleDaySym", n, k);
      for (const k of E.filter((Y) => !g.includes(Y)))
        await Ft("toggleDaySym", n, k);
      S !== !!c.intimacy && await Ft("markPA", n), z ? await Ft("addDayCustomSym", n, z) : At("Сохранено", { type: "success" }), l();
    } catch (k) {
      At(k?.message || "Не удалось сохранить", { type: "error" });
    } finally {
      R(!1);
    }
  };
  return /* @__PURE__ */ p.jsxs(
    Rn,
    {
      isOpen: s,
      onClose: l,
      "data-aiwa-day-log-modal": "true",
      children: [
        /* @__PURE__ */ p.jsx(Lm, { size: "large", title: t || "Занести в журнал" }),
        /* @__PURE__ */ p.jsx("div", { className: "aiwa-log-scroll", children: /* @__PURE__ */ p.jsxs(pt, { className: "aiwa-log-sections", children: [
          /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(
            hc,
            {
              label: "Энергия",
              options: k3,
              value: y,
              onChange: v
            }
          ) }),
          /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(
            hc,
            {
              label: "Настроение",
              options: U3,
              value: b,
              onChange: T
            }
          ) }),
          L.map(([E, z]) => /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(P3, { label: E, options: z, symptoms: g, onToggle: D }) }, E)),
          /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(X3, { value: w, onChange: M }) }),
          u ? /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(Sh, { label: "Близость", active: S, onChange: C }) }) : null
        ] }) }),
        /* @__PURE__ */ p.jsx("div", { className: "aiwa-log-footer", children: /* @__PURE__ */ p.jsx(
          Hn,
          {
            label: "Сохранить",
            loading: _,
            isFill: !0,
            ...ne("Сохранить", $)
          }
        ) })
      ]
    }
  );
}
function km({ isOpen: n, onClose: t, mode: s, revision: l, symptomGroups: r }) {
  const [u, c] = j.useState(!1), [d, g] = j.useState(null), [m, y] = j.useState(!1), [v, b] = j.useState("period"), [T, S] = j.useState({}), C = j.useRef(Promise.resolve()), w = j.useRef(0), M = Array.from({ length: 20 }, (Q, W) => Ft("getAiwaCalendarMonth", W - 12)).filter(Boolean), _ = s !== "preg" && s !== "meno" && s !== "male", R = vM(_ ? ["period", "symptoms", "intimacy"] : ["symptoms", "intimacy"]), D = xh[v] || xh.symptoms, L = tM(), $ = () => {
    y(!1), S({});
  }, E = (Q) => {
    b(Q), c(!1), y(!0);
  }, z = R.map((Q) => ({
    label: Q.label,
    onSelect: () => E(Q.value)
  }));
  Y3(n, m ? $ : t);
  const k = j.useRef(null);
  j.useEffect(() => {
    if (!n) return;
    const Q = k.current, W = Q?.querySelector('[data-current-month="true"]');
    Q && W && (Q.scrollTop = Math.max(0, W.offsetTop - 8));
  }, [n]), j.useEffect(() => {
    n || (c(!1), g(null), y(!1), S({})), b(_ ? "period" : "symptoms");
  }, [n, _]);
  const Y = (Q) => {
    const W = T[`${v}:${Q.iso}`];
    return typeof W == "boolean" ? W : !!D.checked(Q);
  }, et = (Q, W) => {
    const O = () => Ft(Q, W);
    w.current += 1, C.current = C.current.then(O, O).then(() => {
      w.current -= 1, w.current === 0 && S({});
    });
  }, nt = (() => {
    const Q = /* @__PURE__ */ new Date();
    return `${Q.getFullYear()}-${String(Q.getMonth() + 1).padStart(2, "0")}-${String(Q.getDate()).padStart(2, "0")}`;
  })(), J = (Q, W) => {
    if (!m) {
      Q.iso && Q.iso <= nt && g({ iso: Q.iso, label: `${Q.date} ${W}` });
      return;
    }
    if (v === "symptoms") {
      g({ iso: Q.iso, label: `${Q.date} ${W}` });
      return;
    }
    S((O) => ({ ...O, [`${v}:${Q.iso}`]: !Y(Q) })), et(v === "period" ? "toggleCalendarPeriodDay" : "markPA", Q.iso);
  };
  return n ? io.createPortal(
    /* @__PURE__ */ p.jsxs(
      "div",
      {
        className: "aiwa-calendar-page",
        "data-aiwa-calendar-modal": "true",
        "data-marking": m ? "true" : void 0,
        "data-markbar": m && !L ? "true" : void 0,
        role: "region",
        "aria-label": "Календарь",
        children: [
          /* @__PURE__ */ p.jsxs("div", { className: "aiwa-calendar-screen", "data-revision": l, role: "document", "aria-label": "Календарь", children: [
            /* @__PURE__ */ p.jsxs("div", { className: "aiwa-calendar-modeswitch", children: [
              m && L ? null : /* @__PURE__ */ p.jsxs(
                Ge,
                {
                  as: "button",
                  type: "button",
                  mode: "opacity",
                  className: "aiwa-calendar-legend-toggle",
                  "aria-pressed": u,
                  "aria-label": u ? "Скрыть обозначения" : "Показать обозначения календаря",
                  onClick: () => c((Q) => !Q),
                  children: [
                    /* @__PURE__ */ p.jsx(A3, {}),
                    /* @__PURE__ */ p.jsx(ut, { variant: "body", weight: "semibold", children: "Обозначения" })
                  ]
                }
              ),
              m ? /* @__PURE__ */ p.jsx(
                Ge,
                {
                  as: "button",
                  type: "button",
                  mode: "opacity",
                  className: "aiwa-calendar-done",
                  "aria-label": "Закончить отметки",
                  onClick: $,
                  children: /* @__PURE__ */ p.jsx(ut, { variant: "body", weight: "semibold", children: "Готово" })
                }
              ) : null
            ] }),
            u ? /* @__PURE__ */ p.jsxs("div", { className: "aiwa-calendar-help", role: "status", children: [
              /* @__PURE__ */ p.jsx(ut, { variant: "body", weight: "semibold", children: "Обозначения" }),
              /* @__PURE__ */ p.jsx("div", { className: "aiwa-calendar-legend", children: bM.map(({ label: Q, variant: W, token: O }) => /* @__PURE__ */ p.jsx(
                WA,
                {
                  variant: W,
                  textVariant: "caption1",
                  weight: "semibold",
                  style: { color: `var(${O})` },
                  children: Q
                },
                Q
              )) })
            ] }) : null,
            /* @__PURE__ */ p.jsx("div", { className: "aiwa-calendar-scroll", ref: k, children: /* @__PURE__ */ p.jsx("div", { className: "aiwa-calendar-months", children: M.map((Q) => /* @__PURE__ */ p.jsxs(
              "section",
              {
                className: "aiwa-calendar-month",
                "aria-label": Q.label,
                "data-current-month": Q.days.some((W) => W.today) ? "true" : void 0,
                children: [
                  /* @__PURE__ */ p.jsx(ut, { className: "aiwa-calendar-month-title", variant: "body", weight: "semibold", children: Q.label || Q.name }),
                  /* @__PURE__ */ p.jsx("div", { className: "aiwa-calendar-grid", children: Q.days.map((W) => W.empty ? /* @__PURE__ */ p.jsx("span", { className: "aiwa-calendar-empty", "aria-hidden": "true" }, W.key) : /* @__PURE__ */ p.jsx(
                    JM,
                    {
                      day: W,
                      interactive: m || !!(W.iso && W.iso <= nt),
                      marking: m,
                      checked: m && Y(W),
                      markVariant: v === "intimacy" ? "heart" : "radio",
                      monthLabel: Q.label,
                      onSelect: (O) => J(O, Q.name || Q.label)
                    },
                    W.key
                  )) })
                ]
              },
              Q.key || Q.label
            )) }) })
          ] }),
          m && !L ? /* @__PURE__ */ p.jsx(
            t_,
            {
              options: R,
              value: v,
              onChange: b,
              hint: D.hint
            }
          ) : null,
          m ? null : /* @__PURE__ */ p.jsx(
            K3,
            {
              className: "aiwa-calendar-fab",
              align: "end",
              items: z,
              trigger: /* @__PURE__ */ p.jsx(WM, { icon: /* @__PURE__ */ p.jsx(Es, {}), label: "Отметить день" })
            }
          ),
          /* @__PURE__ */ p.jsx(
            e_,
            {
              iso: d?.iso,
              label: d?.label,
              open: !!d,
              onClose: () => g(null),
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
function n_({ panel: n, onClose: t, checkin: s, symptomGroups: l, mode: r, revision: u }) {
  return /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsx(FM, { isOpen: n === "journal", onClose: t, checkin: s, symptomGroups: l, mode: r }),
    /* @__PURE__ */ p.jsx(km, { isOpen: n === "calendar", onClose: t, mode: r, revision: u, symptomGroups: l })
  ] });
}
function Zt({
  title: n,
  description: t,
  onClick: s,
  trailing: l,
  muted: r = !1,
  start: u,
  image: c,
  loading: d = !1,
  variant: g = "default"
}) {
  const m = c || d || g === "extended" ? "extended" : "default", y = l !== void 0 ? l : s ? /* @__PURE__ */ p.jsx(Tt.Part, { type: "Chevron" }) : null, v = d ? /* @__PURE__ */ p.jsx("span", { className: "aiwa-cell-thumb aiwa-cell-thumb-loading", children: /* @__PURE__ */ p.jsx(Sc, { size: 22 }) }) : c ? /* @__PURE__ */ p.jsx("span", { className: "aiwa-cell-thumb", children: /* @__PURE__ */ p.jsx("img", { src: c, alt: "", loading: "lazy" }) }) : u;
  return /* @__PURE__ */ p.jsx(
    Tt,
    {
      "data-aiwa-row-variant": m,
      start: v,
      end: y,
      onClick: s,
      tappable: !!s,
      as: s ? "button" : "div",
      type: s ? "button" : void 0,
      "aria-label": n,
      style: r ? { opacity: 0.65 } : void 0,
      children: /* @__PURE__ */ p.jsx(Tt.Text, { title: n, description: t || void 0 })
    }
  );
}
const a_ = [
  { value: "3", label: "3 месяца" },
  { value: "6", label: "6 месяцев" },
  { value: "all", label: "Весь период" }
];
function zr({ label: n, selected: t, onClick: s }) {
  return /* @__PURE__ */ p.jsx(
    Tt,
    {
      as: "button",
      type: "button",
      role: "radio",
      "aria-checked": t,
      onClick: s,
      end: t ? /* @__PURE__ */ p.jsx("span", { className: "aiwa-settings-check", "aria-hidden": "true", children: /* @__PURE__ */ p.jsx(H7, {}) }) : null,
      children: /* @__PURE__ */ p.jsx(Tt.Text, { title: n })
    }
  );
}
function Um({ isOpen: n, onClose: t }) {
  const [s, l] = j.useState("main"), [r, u] = j.useState(() => Ft("aiwaData") || {}), [c, d] = j.useState(null), [g, m] = j.useState("3"), [y, v] = j.useState({});
  j.useEffect(() => {
    if (!n) return;
    const E = Ft("aiwaData") || {};
    u(E), l("main"), d(null), v({
      height: String(E.profile?.height || ""),
      weight: String(E.profile?.weight || ""),
      age: String(E.profile?.age || ""),
      cycle_len: String(E.cycle_len || ""),
      diet_note: E.profile?.diet_note || E.diet_note || "",
      kcal_goal: String(E.profile?.kcal_goal || E.kcal_goal || ""),
      send_time: E.send_time || "08:00",
      proactive_enabled: E.proactive_enabled !== !1
    });
  }, [n]);
  const b = async () => {
    l("partner");
    const E = await Gt("/api/partner", {}).catch(() => null);
    d(E || {});
  }, T = async () => {
    const E = await Gt("/api/profile", {
      height: y.height,
      weight: y.weight,
      age: y.age,
      cycle_len: y.cycle_len
    }).catch(() => null);
    E?.ok ? (At("Данные сохранены", { type: "success" }), bn("reloadAfterEdit"), l("main")) : At(E?.text || "Проверь рост, вес, возраст и длину цикла", { type: "error" });
  }, S = async () => {
    const E = await Gt("/api/prefs", {
      diet_note: y.diet_note,
      kcal_goal: y.kcal_goal
    }).catch(() => null);
    E?.ok ? (At("Предпочтения сохранены", { type: "success" }), bn("reloadAfterEdit"), l("main")) : At(E?.text || "Не получилось сохранить предпочтения", { type: "error" });
  }, C = async () => {
    const E = await Gt("/api/settime", { time: y.send_time }).catch(() => null);
    E?.ok ? (At("Время сводки сохранено", { type: "success" }), l("main")) : At(E?.text || "Проверь время утренней сводки", { type: "error" });
  }, w = async () => {
    const E = await Gt("/api/report", { period: g }).catch(() => null);
    E?.ok ? (At("Выписка отправлена в чат бота", { type: "success" }), l("main")) : At(E?.text || "Выписка временно недоступна", { type: "error" });
  }, M = async (E) => {
    const z = y.proactive_enabled !== !1;
    v((Y) => ({ ...Y, proactive_enabled: E })), (await Gt("/api/proactive", { enabled: E }).catch(() => null))?.ok || (v((Y) => ({ ...Y, proactive_enabled: z })), At("Не получилось изменить настройку", { type: "error" }));
  }, _ = async (E) => {
    const z = await Gt("/api/mode", { mode: E }).catch(() => null);
    if (!z?.ok) {
      At(z?.text || "Не получилось сменить режим", { type: "error" });
      return;
    }
    At(`Режим: ${a2(E)}`, {
      type: "success",
      // Дату мог подставить сервер при выходе из мужского режима — она уходит
      // в медицинские данные, поэтому молчать об этом нельзя.
      description: z.seeded_period ? "Дату месячных поставили на сегодня — поправь в календаре" : void 0
    }), bn("reloadAfterEdit"), t();
  }, R = async () => {
    if (c?.link)
      try {
        await navigator.clipboard.writeText(c.link), At("Ссылка скопирована", { type: "success" });
      } catch {
        At("Ссылка готова — выдели и скопируй");
      }
  }, D = async () => {
    (await Gt("/api/partner", { action: "unlink" }).catch(() => null))?.ok && (d({ linked: !1 }), At("Партнёр отключён", { type: "success" }));
  }, L = N3(), $ = r.mode || dc[0].value;
  return /* @__PURE__ */ p.jsx(
    Rn,
    {
      isOpen: n,
      onClose: t,
      onBack: s === "main" ? t : () => l("main"),
      children: /* @__PURE__ */ p.jsx(p.Fragment, { children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-sheet-scroll", children: [
        s === "main" ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
          /* @__PURE__ */ p.jsxs("div", { className: "aiwa-profile-avatar", children: [
            /* @__PURE__ */ p.jsx(O3, {}),
            L ? /* @__PURE__ */ p.jsx(ut, { variant: "body", weight: "semibold", children: L }) : null
          ] }),
          /* @__PURE__ */ p.jsx(pt, { className: "aiwa-tma-blocks", children: /* @__PURE__ */ p.jsxs(pt.Item, { children: [
            /* @__PURE__ */ p.jsx(
              Zt,
              {
                title: "Режим",
                trailing: /* @__PURE__ */ p.jsxs("span", { className: "aiwa-mode-value", children: [
                  /* @__PURE__ */ p.jsx(ut, { variant: "body", weight: "regular", children: a2($) }),
                  /* @__PURE__ */ p.jsx(Tt.Part, { type: "Chevron" })
                ] }),
                onClick: () => l("mode")
              }
            ),
            r.mode === "male" ? null : /* @__PURE__ */ p.jsx(Zt, { title: "Выписка для врача", description: "PDF в чат бота", onClick: () => l("report") }),
            /* @__PURE__ */ p.jsx(Zt, { title: "Предпочтения по питанию", description: "ограничения и цель калорий", onClick: () => l("preferences") }),
            /* @__PURE__ */ p.jsx(Zt, { title: "Мои данные", description: "рост · вес · возраст · цикл", onClick: () => l("data") }),
            /* @__PURE__ */ p.jsx(Zt, { title: "Утренняя сводка", description: `${y.send_time || "08:00"} · МСК`, onClick: () => l("summary") }),
            /* @__PURE__ */ p.jsx(
              Zt,
              {
                title: "Проактивные сообщения",
                description: y.proactive_enabled === !1 ? "выключены" : "не больше одного в день",
                onClick: () => l("proactive")
              }
            ),
            r.mode === "male" ? null : /* @__PURE__ */ p.jsx(Zt, { title: "Партнёр и близкие", description: "короткая бережная сводка", onClick: b })
          ] }) })
        ] }) : null,
        s === "mode" ? /* @__PURE__ */ p.jsx(pt, { className: "aiwa-tma-blocks aiwa-settings-page", children: /* @__PURE__ */ p.jsx(
          pt.Item,
          {
            header: "Режим Айвы",
            description: "Выбери режим, чтобы рекомендации и календарь учитывали твой текущий этап.",
            role: "radiogroup",
            "aria-label": "Режим Айвы",
            children: dc.map((E) => /* @__PURE__ */ p.jsx(
              zr,
              {
                label: E.label,
                selected: $ === E.value,
                onClick: () => _(E.value)
              },
              E.value
            ))
          }
        ) }) : null,
        s === "data" ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
          /* @__PURE__ */ p.jsx(pt, { className: "aiwa-tma-blocks aiwa-settings-page", children: /* @__PURE__ */ p.jsx(
            pt.Item,
            {
              header: "Мои данные",
              description: "Эти параметры помогают точнее рассчитывать питание, нагрузку и прогноз цикла.",
              children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-settings-form aiwa-settings-form-grid", children: [
                /* @__PURE__ */ p.jsx(me, { label: "Рост, см", value: y.height || "", onChange: (E) => v((z) => ({ ...z, height: E })), inputMode: "decimal" }),
                /* @__PURE__ */ p.jsx(me, { label: "Вес, кг", value: y.weight || "", onChange: (E) => v((z) => ({ ...z, weight: E })), inputMode: "decimal" }),
                /* @__PURE__ */ p.jsx(me, { label: "Возраст", value: y.age || "", onChange: (E) => v((z) => ({ ...z, age: E })), inputMode: "numeric" }),
                /* @__PURE__ */ p.jsx(me, { label: "Длина цикла", value: y.cycle_len || "", onChange: (E) => v((z) => ({ ...z, cycle_len: E })), inputMode: "numeric" })
              ] })
            }
          ) }),
          /* @__PURE__ */ p.jsx(De, { variant: "filled", label: "Сохранить", isFill: !0, ...ne("Сохранить данные", T) })
        ] }) : null,
        s === "preferences" ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
          /* @__PURE__ */ p.jsx(pt, { className: "aiwa-tma-blocks aiwa-settings-page", children: /* @__PURE__ */ p.jsx(
            pt.Item,
            {
              header: "Предпочтения по питанию",
              description: "Напиши только то, что важно учитывать Айве: ограничения, аллергии и желаемую калорийность.",
              children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-settings-form", children: [
                /* @__PURE__ */ p.jsx(
                  me,
                  {
                    label: "Предпочтения и ограничения",
                    value: y.diet_note || "",
                    onChange: (E) => v((z) => ({ ...z, diet_note: E })),
                    placeholder: "Например: без свинины, аллергия на орехи",
                    multiline: !0
                  }
                ),
                /* @__PURE__ */ p.jsx(me, { label: "Желаемые калории", value: y.kcal_goal || "", onChange: (E) => v((z) => ({ ...z, kcal_goal: E })), inputMode: "numeric" })
              ] })
            }
          ) }),
          /* @__PURE__ */ p.jsx(De, { variant: "filled", label: "Сохранить", isFill: !0, ...ne("Сохранить предпочтения", S) })
        ] }) : null,
        s === "summary" ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
          /* @__PURE__ */ p.jsx(pt, { className: "aiwa-tma-blocks aiwa-settings-page", children: /* @__PURE__ */ p.jsx(
            pt.Item,
            {
              header: "Утренняя сводка",
              description: "Айва пришлёт короткую сводку дня в чат в указанное время по Москве.",
              children: /* @__PURE__ */ p.jsx("div", { className: "aiwa-settings-form", children: /* @__PURE__ */ p.jsx(me, { label: "Время, МСК", type: "time", value: y.send_time || "08:00", onChange: (E) => v((z) => ({ ...z, send_time: E })) }) })
            }
          ) }),
          /* @__PURE__ */ p.jsx(De, { variant: "filled", label: "Сохранить", isFill: !0, ...ne("Сохранить время сводки", C) })
        ] }) : null,
        s === "proactive" ? /* @__PURE__ */ p.jsx(pt, { className: "aiwa-tma-blocks aiwa-settings-page", children: /* @__PURE__ */ p.jsxs(
          pt.Item,
          {
            header: "Проактивные сообщения",
            description: "Айва может сама написать, когда заметит важное изменение. Не больше одного сообщения в день.",
            role: "radiogroup",
            "aria-label": "Проактивные сообщения",
            children: [
              /* @__PURE__ */ p.jsx(
                zr,
                {
                  label: "Включены",
                  selected: y.proactive_enabled !== !1,
                  onClick: () => M(!0)
                }
              ),
              /* @__PURE__ */ p.jsx(
                zr,
                {
                  label: "Выключены",
                  selected: y.proactive_enabled === !1,
                  onClick: () => M(!1)
                }
              )
            ]
          }
        ) }) : null,
        s === "report" ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
          /* @__PURE__ */ p.jsx(pt, { className: "aiwa-tma-blocks aiwa-settings-page", children: /* @__PURE__ */ p.jsx(
            pt.Item,
            {
              header: "Выписка для врача",
              description: "Циклы, динамика и дневник симптомов придут PDF-файлом в чат бота.",
              role: "radiogroup",
              "aria-label": "Период выписки",
              children: a_.map((E) => /* @__PURE__ */ p.jsx(
                zr,
                {
                  label: E.label,
                  selected: g === E.value,
                  onClick: () => m(E.value)
                },
                E.value
              ))
            }
          ) }),
          /* @__PURE__ */ p.jsx(De, { variant: "filled", label: "Собрать выписку", isFill: !0, ...ne("Собрать выписку", w) })
        ] }) : null,
        s === "partner" ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
          /* @__PURE__ */ p.jsx(pt, { className: "aiwa-tma-blocks aiwa-settings-page", children: /* @__PURE__ */ p.jsxs(
            pt.Item,
            {
              header: "Партнёр и близкие",
              description: "Близкий получит только бережную сводку о поддержке и отдыхе — без календаря, интимных и медицинских деталей.",
              children: [
                c === null ? /* @__PURE__ */ p.jsx(Tt, { children: /* @__PURE__ */ p.jsx(Tt.Text, { title: "Готовлю ссылку…" }) }) : null,
                c?.linked ? /* @__PURE__ */ p.jsx(Zt, { title: "Партнёр подключён", description: "Бережная сводка включена" }) : null,
                c?.link ? /* @__PURE__ */ p.jsx("div", { className: "aiwa-settings-form", children: /* @__PURE__ */ p.jsx(me, { label: "Ссылка-приглашение", value: c.link, readOnly: !0, multiline: !0 }) }) : null,
                c && !c.linked && !c.link ? /* @__PURE__ */ p.jsx(Tt, { children: /* @__PURE__ */ p.jsx(Tt.Text, { title: "Ссылка доступна только в Telegram", description: "В боте можно использовать команду /partner" }) }) : null
              ]
            }
          ) }),
          c?.linked ? /* @__PURE__ */ p.jsx(De, { variant: "filled", label: "Отключить партнёра", isFill: !0, ...ne("Отключить партнёра", D) }) : null,
          c?.link ? /* @__PURE__ */ p.jsx(De, { variant: "filled", label: "Скопировать ссылку", isFill: !0, ...ne("Скопировать ссылку", R) }) : null
        ] }) : null
      ] }) })
    }
  );
}
const i_ = (n) => {
  const t = Ft("homeSelectedDayPatch", n);
  return t ? { value: t.heroValue, label: t.countdownLabel } : null;
};
function s_(n) {
  const [t, s] = j.useState(yM);
  return j.useLayoutEffect(() => {
    document.querySelector("[data-aiwa-static-boot]")?.remove(), document.body.classList.remove("aiwa-booting"), document.body.classList.toggle("aiwa-assets-loading", !t);
    const l = document.getElementById("app");
    t ? l?.removeAttribute("aria-busy") : l?.setAttribute("aria-busy", "true");
  }, [t]), j.useEffect(() => {
    let l = !0;
    return zm().then(() => {
      l && s(!0);
    }), V3(), () => {
      l = !1, document.body.classList.remove("aiwa-assets-loading");
    };
  }, []), /* @__PURE__ */ p.jsx(ji, { children: /* @__PURE__ */ p.jsx(Rs, { mode: "secondary", children: t ? /* @__PURE__ */ p.jsxs("div", { className: "aiwa-deslop-home", children: [
    /* @__PURE__ */ p.jsx(
      Tc,
      {
        title: n.dateText,
        days: n.week,
        selectedIso: n.selectedIso,
        heroValue: n.heroValue || `${n.countdown} дней`,
        heroLabel: n.countdownLabel,
        onSelect: n.onSelectDay ?? ((l) => R3(l.iso)),
        previewDay: n.previewDay ?? i_,
        onProfile: () => window.AiwaDeslop?.openProfile?.(),
        onCalendar: () => bn("openHomePanel", "calendar"),
        action: /* @__PURE__ */ p.jsx(
          De,
          {
            variant: "filled",
            label: /* @__PURE__ */ p.jsxs("span", { className: "aiwa-btn-icon-label", children: [
              /* @__PURE__ */ p.jsx(Es, {}),
              " Занести в журнал"
            ] }),
            ...ne("Занести в журнал", () => bn("openHomePanel", "journal"))
          }
        )
      }
    ),
    /* @__PURE__ */ p.jsxs(pt, { className: "aiwa-tma-blocks", children: [
      /* @__PURE__ */ p.jsx(jM, { title: n.dayTitle, checkin: n.dayCheckin ?? n.checkin, symptomGroups: n.symptomGroups }),
      /* @__PURE__ */ p.jsx(MM, { aiText: n.aiText }),
      /* @__PURE__ */ p.jsx(_M, { delay: n.delay }),
      /* @__PURE__ */ p.jsx(OM, { metrics: n.metrics, title: n.statsTitle }),
      n.pregnancy ? /* @__PURE__ */ p.jsx(KM, { pregnancy: n.pregnancy }) : /* @__PURE__ */ p.jsx(
        BM,
        {
          data: n.chartData,
          series: n.chartSeries,
          title: n.chartTitle,
          band: n.chartBand,
          emptyText: n.chartEmptyText
        }
      ),
      n.mode === "meno" || n.mode === "preg" ? null : /* @__PURE__ */ p.jsx(
        zM,
        {
          history: n.history,
          title: n.historyTitle,
          emptyTitle: n.historyEmptyTitle,
          emptyDescription: n.historyEmptyDescription
        }
      ),
      /* @__PURE__ */ p.jsx(PM, {})
    ] }),
    /* @__PURE__ */ p.jsx(
      n_,
      {
        panel: n.panel,
        onClose: n.onPanelClose,
        checkin: n.checkin,
        symptomGroups: n.symptomGroups,
        mode: n.mode,
        revision: n.panelRevision
      }
    ),
    /* @__PURE__ */ p.jsx(Um, { isOpen: n.profileOpen, onClose: n.onProfileClose })
  ] }) : /* @__PURE__ */ p.jsx(
    mM,
    {
      showToday: !!(n.dayCheckin ?? n.checkin)?.symptoms?.length,
      showDelay: !!n.delay
    }
  ) }) });
}
function Ed({ label: n, value: t, target: s, macro: l, color: r }) {
  const u = s ? Math.min(100, Math.round(Number(t || 0) / Number(s) * 100)) : 0, c = r || (l ? `var(--aiwa-macro-${l})` : "var(--aiwa-accent)");
  return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-macro-card", children: [
    /* @__PURE__ */ p.jsxs(ut, { variant: "body", weight: "semibold", children: [
      /* @__PURE__ */ p.jsx(js, { variant: "number", animation: "snappy", children: `${Math.round(t || 0)}${s ? "" : " г"}` }),
      s ? /* @__PURE__ */ p.jsxs("span", { className: "aiwa-macro-target", children: [
        " / ",
        Math.round(s),
        " г"
      ] }) : null
    ] }),
    /* @__PURE__ */ p.jsx(ut, { variant: "caption1", weight: "regular", children: n }),
    /* @__PURE__ */ p.jsx("span", { className: "aiwa-macro-track", style: { "--macro-color": c }, children: /* @__PURE__ */ p.jsx("span", { style: { width: `${u}%` } }) })
  ] });
}
const d2 = "M 11 169 A 158 158 0 0 1 327 169", h2 = Math.PI * 158, l_ = 500, o_ = (n) => 1 - (1 - n) ** 3;
function r_(n) {
  const [t, s] = j.useState(0), l = j.useRef(0), r = j.useRef(0);
  return j.useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      l.current = n, s(n);
      return;
    }
    const c = l.current, d = performance.now(), g = (m) => {
      const y = Math.min(1, (m - d) / l_), v = c + (n - c) * o_(y);
      l.current = v, s(v), y < 1 && (r.current = requestAnimationFrame(g));
    };
    return r.current = requestAnimationFrame(g), () => cancelAnimationFrame(r.current);
  }, [n]), t;
}
function c_({ kcal: n, kcalTarget: t }) {
  const s = Number(n || 0), l = Number(t || 0), r = r_(Math.min(1, s / Math.max(1, l))), u = r * Math.PI, c = 169 - 158 * Math.cos(u), d = 169 - 158 * Math.sin(u);
  return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-food-gauge", children: [
    /* @__PURE__ */ p.jsxs("svg", { className: "aiwa-food-gauge-arc", viewBox: "0 0 338 180", width: "338", height: "180", fill: "none", children: [
      /* @__PURE__ */ p.jsx("path", { className: "aiwa-food-gauge-track", d: d2 }),
      /* @__PURE__ */ p.jsx(
        "path",
        {
          className: "aiwa-food-gauge-progress",
          d: d2,
          strokeDasharray: h2,
          strokeDashoffset: h2 * (1 - r)
        }
      ),
      /* @__PURE__ */ p.jsx("circle", { className: "aiwa-food-gauge-knob", cx: c, cy: d, r: "11" })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-food-gauge-center", children: [
      /* @__PURE__ */ p.jsx(ut, { variant: "title1", weight: "semibold", children: /* @__PURE__ */ p.jsx(js, { variant: "number", animation: "snappy", children: ph(s) }) }),
      /* @__PURE__ */ p.jsx(ut, { variant: "body", weight: "regular", children: /* @__PURE__ */ p.jsx(js, { variant: "number", animation: "snappy", children: `из ${ph(l)}` }) })
    ] })
  ] });
}
function Hl({ label: n, options: t, value: s, onChange: l, surface: r = "container" }) {
  return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-form-group", children: [
    n ? /* @__PURE__ */ p.jsx(ut, { className: "aiwa-form-label", variant: "body", weight: "semibold", children: n }) : null,
    /* @__PURE__ */ p.jsx("div", { className: `aiwa-choice-pills${r === "canvas" ? " is-on-canvas" : ""}`, role: "group", "aria-label": n, children: t.map((u) => {
      const c = typeof u == "string" ? { value: u, label: u } : u;
      return /* @__PURE__ */ p.jsx(
        Ge,
        {
          as: "button",
          type: "button",
          mode: "opacity",
          className: s === c.value ? "aiwa-choice-pill is-active" : "aiwa-choice-pill",
          "aria-pressed": s === c.value,
          onClick: () => l(c.value),
          children: /* @__PURE__ */ p.jsx(ut, { variant: "body", weight: "regular", children: c.label })
        },
        c.value
      );
    }) })
  ] });
}
function m2({ meal: n, onSaved: t, onClose: s, choiceSurface: l = "container" }) {
  const [r, u] = j.useState(() => xM(n)), [c, d] = j.useState(!1), g = (y, v) => u((b) => ({ ...b, [y]: v })), m = async () => {
    if (!r.title.trim() && !String(r.kcal).trim()) {
      At("Укажи название или калории", { type: "error" });
      return;
    }
    d(!0);
    try {
      const y = await Gt(n ? "/api/diary_edit" : "/api/food_manual", {
        ...n ? { id: n.id } : {},
        ...r
      });
      if (y?.ok === !1 || y?.error) throw new Error(y.message || "Не получилось сохранить");
      At(n ? "Приём обновлён" : "Приём добавлен", { type: "success" }), await t(), s();
    } catch (y) {
      At(y.message || "Не получилось сохранить", { type: "error" });
    } finally {
      d(!1);
    }
  };
  return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-form-stack", children: [
    /* @__PURE__ */ p.jsx(me, { label: "Название", value: r.title, onChange: (y) => g("title", y), placeholder: "Например, творог и банан" }),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-form-grid", children: [
      /* @__PURE__ */ p.jsx(me, { label: "Ккал", value: r.kcal, onChange: (y) => g("kcal", y), inputMode: "decimal" }),
      /* @__PURE__ */ p.jsx(me, { label: "Граммы", value: r.grams, onChange: (y) => g("grams", y), inputMode: "decimal" }),
      /* @__PURE__ */ p.jsx(me, { label: "Белки", value: r.protein, onChange: (y) => g("protein", y), inputMode: "decimal" }),
      /* @__PURE__ */ p.jsx(me, { label: "Жиры", value: r.fat, onChange: (y) => g("fat", y), inputMode: "decimal" }),
      /* @__PURE__ */ p.jsx(me, { label: "Углеводы", value: r.carbs, onChange: (y) => g("carbs", y), inputMode: "decimal" })
    ] }),
    /* @__PURE__ */ p.jsx(
      Hl,
      {
        label: "Приём пищи",
        options: H3,
        value: r.slot,
        onChange: (y) => g("slot", y),
        surface: l
      }
    ),
    /* @__PURE__ */ p.jsx(
      Hn,
      {
        label: n ? "Сохранить изменения" : "Сохранить приём",
        loading: c,
        isFill: !0,
        ...ne("Сохранить приём", m)
      }
    )
  ] });
}
function u_({ isOpen: n, onClose: t, onSaved: s, editingMeal: l = null }) {
  const [r, u] = j.useState("text"), [c, d] = j.useState(""), [g, m] = j.useState(!1);
  j.useEffect(() => {
    n && (_3("food"), u(l ? "manual" : "text"), d(""));
  }, [l, n]);
  const y = async () => {
    if (c.trim()) {
      m(!0);
      try {
        const b = await Gt("/api/food_text", { text: c.trim() });
        if (!b?.ok) throw new Error(b?.message || "Не получилось разобрать приём");
        At(`Добавлено · ${b.rec?.kcal || 0} ккал`, { type: "success" }), await s(), t();
      } catch (b) {
        At(b.message || "Не получилось добавить", { type: "error" });
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
        await T(b), await s(), t();
      } catch (T) {
        At(T.message || "Не получилось разобрать фото", { type: "error" });
      } finally {
        m(!1);
      }
    }
  };
  return /* @__PURE__ */ p.jsx(Rn, { isOpen: n, onClose: t, children: /* @__PURE__ */ p.jsx("div", { children: /* @__PURE__ */ p.jsx("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: l ? /* @__PURE__ */ p.jsx(m2, { meal: l, onSaved: s, onClose: t, choiceSurface: "canvas" }) : /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsx(
      Hl,
      {
        surface: "canvas",
        options: [
          { value: "photo", label: "Фото" },
          { value: "text", label: "Текст" },
          { value: "manual", label: "Вручную" }
        ],
        value: r,
        onChange: u
      }
    ),
    r === "photo" ? /* @__PURE__ */ p.jsxs("label", { className: `aiwa-upload-zone${g ? " is-busy" : ""}`, children: [
      g ? /* @__PURE__ */ p.jsx(Sc, { size: 28 }) : null,
      /* @__PURE__ */ p.jsx(ut, { variant: "title3", weight: "semibold", children: g ? "Разбираю фото…" : "Сфотографировать еду" }),
      /* @__PURE__ */ p.jsx(ut, { variant: "body", weight: "regular", children: g ? "Айва считает КБЖУ, это займёт несколько секунд." : "Айва распознает блюдо и посчитает КБЖУ." }),
      /* @__PURE__ */ p.jsx("input", { type: "file", accept: "image/*", capture: "environment", disabled: g, onChange: (b) => v(b.target.files?.[0]) })
    ] }) : null,
    r === "text" ? /* @__PURE__ */ p.jsxs("div", { className: "aiwa-form-stack", children: [
      /* @__PURE__ */ p.jsx(
        me,
        {
          label: "Что съела?",
          value: c,
          onChange: d,
          placeholder: "Например: 200 г творога и банан",
          multiline: !0
        }
      ),
      /* @__PURE__ */ p.jsx(
        Hn,
        {
          label: "Добавить приём",
          loading: g,
          isFill: !0,
          disabled: !c.trim(),
          ...ne("Добавить приём", y)
        }
      )
    ] }) : null,
    r === "manual" ? /* @__PURE__ */ p.jsx(m2, { meal: null, onSaved: s, onClose: t, choiceSurface: "canvas" }) : null
  ] }) }) }) });
}
function f_({ isOpen: n, onClose: t, diary: s, onAdd: l, onEdit: r, onDelete: u, onReco: c }) {
  const d = s?.meals || [], g = s?.totals || {}, m = s?.target || {};
  return /* @__PURE__ */ p.jsx(Rn, { isOpen: n, onClose: t, children: /* @__PURE__ */ p.jsxs(pt, { className: "aiwa-tma-blocks", children: [
    /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ p.jsx(
      Tt.Text,
      {
        title: `${Math.round(g.kcal || 0)} ккал`,
        description: `из ${Math.round(m.kcal || 0) || "—"} ккал`,
        bold: !0
      }
    ) }) }),
    H3.map((y) => {
      const v = d.filter((b) => (b.slot || "snack") === y.value);
      return /* @__PURE__ */ p.jsx(pt.Item, { header: y.label, children: v.length ? v.map((b) => /* @__PURE__ */ p.jsx(
        Zt,
        {
          title: b.title,
          description: `${Math.round(b.kcal || 0)} ккал`,
          onClick: () => r(b),
          trailing: /* @__PURE__ */ p.jsx(
            Ge,
            {
              as: "button",
              type: "button",
              mode: "opacity",
              "aria-label": `Удалить ${b.title}`,
              onClick: (T) => {
                T.stopPropagation(), u(b.id);
              },
              children: /* @__PURE__ */ p.jsx(E3, {})
            }
          )
        },
        b.id
      )) : /* @__PURE__ */ p.jsx(Tt, { as: "button", type: "button", onClick: l, end: /* @__PURE__ */ p.jsx(Tt.Part, { type: "Chevron" }), children: /* @__PURE__ */ p.jsx(Tt.Text, { type: "Accent", title: "Добавить" }) }) }, y.value);
    }),
    /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-cell-actions", children: [
      /* @__PURE__ */ p.jsx(De, { variant: "filled", label: "Добавить приём", isFill: !0, ...ne("Добавить приём", l) }),
      /* @__PURE__ */ p.jsx(De, { variant: "filled", label: "Совет по дневнику", isFill: !0, ...ne("Совет по дневнику", c) })
    ] }) }) })
  ] }) });
}
const d_ = (n) => {
  const t = String(n || "").match(/\d[\d\s\u00a0]*/);
  return t ? `${t[0].trim()} калорий` : "";
};
function h_({ isOpen: n, meal: t, image: s, slotLabel: l = "", onClose: r, onAdd: u, busy: c = !1 }) {
  const [d, g] = j.useState(null), [m, y] = j.useState(!1), v = t?.dish || "";
  j.useEffect(() => {
    if (!n || !v) return;
    g(null), y(!1);
    let T = !0;
    return Gt("/api/recipe", { dish: v }).then((S) => {
      T && (S?.steps?.length ? g(S) : y(!0));
    }).catch(() => T && y(!0)), () => {
      T = !1;
    };
  }, [n, v]);
  const b = [l, d_(t?.kcal || d?.kcal)].filter(Boolean).join(" · ");
  return /* @__PURE__ */ p.jsx(Rn, { isOpen: n, onClose: r, children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-sheet-scroll aiwa-recipe-page", children: [
    /* @__PURE__ */ p.jsxs("header", { className: "aiwa-recipe-hero", children: [
      s ? /* @__PURE__ */ p.jsx("span", { className: "aiwa-recipe-image", children: /* @__PURE__ */ p.jsx("img", { src: s, alt: v }) }) : null,
      /* @__PURE__ */ p.jsxs("div", { className: "aiwa-recipe-heading", children: [
        /* @__PURE__ */ p.jsx(ut, { as: "h1", variant: "body", weight: "semibold", children: v }),
        b || t?.note ? /* @__PURE__ */ p.jsx(ut, { as: "p", variant: "subheadline2", weight: "regular", children: b || t?.note }) : null
      ] })
    ] }),
    /* @__PURE__ */ p.jsxs("main", { className: "aiwa-recipe-content", "aria-live": "polite", children: [
      !d && !m ? /* @__PURE__ */ p.jsxs("div", { className: "aiwa-recipe-status", role: "status", "aria-label": "Готовлю рецепт", children: [
        /* @__PURE__ */ p.jsx(Sc, { size: "m" }),
        /* @__PURE__ */ p.jsx(ut, { variant: "body", weight: "regular", children: "Айва пишет рецепт…" })
      ] }) : null,
      m ? /* @__PURE__ */ p.jsxs("section", { className: "aiwa-recipe-section", children: [
        /* @__PURE__ */ p.jsx(ut, { as: "h2", variant: "body", weight: "semibold", children: "Рецепт не собрался" }),
        /* @__PURE__ */ p.jsx(ut, { as: "p", variant: "body", weight: "regular", children: "Попробуй открыть блюдо ещё раз." })
      ] }) : null,
      d?.ingredients?.length ? /* @__PURE__ */ p.jsxs("section", { className: "aiwa-recipe-section", children: [
        /* @__PURE__ */ p.jsx(ut, { as: "h2", variant: "body", weight: "semibold", children: "Ингредиенты" }),
        /* @__PURE__ */ p.jsx("ul", { className: "aiwa-recipe-list", children: d.ingredients.map((T) => /* @__PURE__ */ p.jsx("li", { children: /* @__PURE__ */ p.jsx(ut, { variant: "body", weight: "regular", children: T }) }, T)) })
      ] }) : null,
      d?.steps?.length ? /* @__PURE__ */ p.jsxs("section", { className: "aiwa-recipe-section", children: [
        /* @__PURE__ */ p.jsx(ut, { as: "h2", variant: "body", weight: "semibold", children: "Приготовление" }),
        /* @__PURE__ */ p.jsx("ol", { className: "aiwa-recipe-list", children: d.steps.map((T, S) => /* @__PURE__ */ p.jsx("li", { value: S + 1, children: /* @__PURE__ */ p.jsx(ut, { variant: "body", weight: "regular", children: T }) }, T)) })
      ] }) : null
    ] }),
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-recipe-action", children: /* @__PURE__ */ p.jsx(
      Hn,
      {
        label: "Добавить в дневник",
        loading: c,
        isFill: !0,
        ...ne("Добавить в дневник", u)
      }
    ) })
  ] }) });
}
const Q3 = {
  foodSection: () => Gt("/api/section", { kind: "food" }),
  diary: () => Gt("/api/diary", {}),
  trainingSection: () => Gt("/api/section", { kind: "training" }),
  train: () => Gt("/api/train", {})
}, ys = /* @__PURE__ */ new Map(), Vr = /* @__PURE__ */ new Map(), kr = (n) => Object.fromEntries(n.map((t) => [t, ys.get(t) ?? null])), wh = (n, { force: t = !1 } = {}) => {
  if (!t) {
    if (ys.has(n)) return Promise.resolve(ys.get(n));
    const l = Vr.get(n);
    if (l) return l;
  }
  const s = Q3[n]().catch(() => null).then((l) => (l && ys.set(n, l), Vr.get(n) === s && Vr.delete(n), ys.get(n) ?? null));
  return Vr.set(n, s), s;
}, m_ = () => {
  Object.keys(Q3).forEach((n) => {
    wh(n);
  });
};
function Z3(n, t) {
  const [s, l] = j.useState(() => kr(n)), r = j.useRef(!1), u = j.useCallback(async (...d) => {
    const g = d.length ? d : n;
    await Promise.all(g.map((m) => wh(m, { force: !0 }))), l(kr(n));
  }, [n]), c = j.useCallback((d, g) => {
    ys.set(d, g), l(kr(n));
  }, [n]);
  return j.useEffect(() => {
    let d = !0;
    const g = r.current;
    return r.current = !0, Promise.all(n.map((m) => wh(m, { force: g }))).then(() => {
      d && l(kr(n));
    }), () => {
      d = !1;
    };
  }, t), [s, u, c];
}
const p_ = ["foodSection", "diary"], Ch = (n) => String(n || "").toLowerCase().replace(/ё/g, "е"), Ad = "?v=2", g_ = /^\/assets\/food\/[^/]+\.(?:png|jpe?g|webp|gif|svg|avif)$/i, p2 = (n) => {
  const t = String(n || "").split(/[?#]/, 1)[0];
  return g_.test(t) ? n : null;
}, g2 = (n) => Ch(n).split(/[^а-яa-z0-9]+/).filter((t) => t.length >= 3), y_ = (n, t) => {
  const s = Math.min(4, n.length, t.length);
  return n.slice(0, s) === t.slice(0, s);
}, y2 = (n, t) => {
  const s = Ch(t).trim();
  if (!n || !s) return null;
  const l = n[String(t || "").trim()];
  if (l) return l + Ad;
  const r = g2(t);
  if (!r.length) return null;
  let u = null, c = 0, d = 0;
  for (const [g, m] of Object.entries(n)) {
    if (Ch(g) === s) return m + Ad;
    const v = g2(g);
    if (!v.length) continue;
    const b = v.filter((S) => r.some((C) => y_(S, C))).length, T = b / v.length;
    b > 0 && (T > d || T === d && b > c) && (d = T, c = b, u = m);
  }
  return d >= 0.5 ? u + Ad : null;
};
function v2({ mode: n, revision: t = 0 }) {
  const [s, l, r] = Z3(p_, [n, t]), [u, c] = j.useState(!1), [d, g] = j.useState(!1), [m, y] = j.useState({}), v = Om(), b = Cc(), [T, S] = j.useState({}), [C, w] = j.useState(null), [M, _] = j.useState(!1), [R, D] = j.useState(null), [L, $] = j.useState(!1), [E, z] = j.useState(""), [k, Y] = j.useState(null), [et, nt] = j.useState(!1), J = j.useRef(null), Q = j.useRef(null), W = j.useRef(/* @__PURE__ */ new Set()), O = !!s.foodSection && !(s.foodSection.menu?.meals || []).length, U = j.useRef(0);
  j.useEffect(() => {
    if (!O) {
      U.current = 0;
      return;
    }
    if (U.current >= 5) return;
    const ft = [1500, 3e3, 5e3, 9e3, 15e3][U.current], Nt = setTimeout(() => {
      U.current += 1, l("foodSection");
    }, ft);
    return () => clearTimeout(Nt);
  }, [O, s.foodSection]), j.useEffect(() => {
    fetch("/assets/food/manifest.json?v=2").then((ft) => ft.ok ? ft.json() : {}).then((ft) => y(Object.fromEntries(
      Object.entries(ft || {}).filter(([, Nt]) => p2(Nt))
    ))).catch(() => {
    });
  }, []);
  const X = s.diary?.recent || {};
  j.useEffect(() => {
    if (!v || v === b || X[v] || T[v] && !W.current.has(v)) return;
    let ft = !0;
    return W.current.delete(v), Gt("/api/diary", { d: v }).then((Nt) => {
      if (!ft) return;
      const we = Nt && !Nt.error;
      we || W.current.add(v), S((Kt) => ({ ...Kt, [v]: we ? Nt : { meals: [], totals: {} } }));
    }).catch(() => {
      ft && (W.current.add(v), S((Nt) => ({ ...Nt, [v]: { meals: [], totals: {} } })));
    }), () => {
      ft = !1;
    };
  }, [v, s.diary]);
  const it = () => l("diary");
  if (!s.foodSection || !s.diary) return /* @__PURE__ */ p.jsx($3, { variant: "food" });
  const ot = s.foodSection, N = s.diary, q = N.target || {}, tt = ot.menu?.meals || [], F = [
    { index: 0, value: "breakfast", label: "Завтрак" },
    { index: 1, value: "lunch", label: "Обед" },
    { index: tt.length >= 4 ? 3 : 2, value: "dinner", label: "Ужин" }
  ].map((ft) => ({ ...ft, meal: tt[ft.index] })).filter((ft) => ft.meal).map((ft) => ({
    ...ft,
    image: p2(ft.meal.image) || y2(m, ft.meal.dish) || n2
  })), rt = (ft) => ft === b ? N : T[ft] || X[ft] || null, ct = v !== b, gt = rt(v);
  gt && (Q.current = gt);
  const bt = ct ? gt?.meals || [] : (N.meals || []).slice().reverse(), Dt = ct ? `Приёмы за ${Nm(v)}` : "Прошедшие приёмы", Ot = et || ct && !gt, zt = bt.length > 0 || Ot, Be = (ft) => {
    const Nt = rt(ft) || Q.current || N, we = Nt.totals || {}, Kt = Nt.target || q, sn = (xn) => Number(we[xn] || 0);
    return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-day-hero", "data-loading": rt(ft) ? void 0 : "true", children: [
      /* @__PURE__ */ p.jsx(c_, { kcal: Number(we.kcal || 0), kcalTarget: Number(Kt.kcal || ot.kcal || 0) }),
      /* @__PURE__ */ p.jsxs("div", { className: "aiwa-macro-grid", children: [
        /* @__PURE__ */ p.jsx(Ed, { label: "Жиры", value: sn("fat"), target: Kt.fat, macro: "fat" }),
        /* @__PURE__ */ p.jsx(Ed, { label: "Белки", value: sn("protein"), target: Kt.protein, macro: "protein" }),
        /* @__PURE__ */ p.jsx(Ed, { label: "Углеводы", value: sn("carbs"), target: Kt.carbs, macro: "carbs" })
      ] })
    ] });
  }, ve = async () => {
    if (!L) {
      $(!0);
      try {
        const ft = await Gt("/api/week_food_review", {}).catch(() => null);
        ft?.review?.summary ? D(ft.review) : D({ summary: ft?.text || "Не получилось собрать разбор, попробуй чуть позже.", gaps: [], tips: [] });
      } finally {
        $(!1);
      }
    }
  }, Re = async (ft, Nt) => {
    if (!M) {
      _(!0);
      try {
        const we = await Gt("/api/food_text", { text: ft.dish || ft.title, slot: Nt }).catch(() => null);
        we?.ok ? (At("Добавлено в дневник", { type: "success" }), w(null), await it()) : At(we?.message || "Не получилось добавить", { type: "error" });
      } finally {
        _(!1);
      }
    }
  }, Se = async (ft) => {
    const Nt = await Gt("/api/diary_del", { id: ft }).catch(() => null);
    Nt && !Nt.error && (r("diary", { meals: Nt.meals || [], totals: Nt.totals || {}, target: Nt.target || q }), At("Приём удалён", { type: "success" }));
  }, Xe = () => {
    Y(null), z("add");
  }, ha = async (ft) => {
    if (!(!ft || et)) {
      nt(!0);
      try {
        const Nt = window.aiwaUploadFoodPhoto;
        if (typeof Nt != "function") throw new Error("Загрузка фото недоступна");
        await Nt(ft), await it();
      } catch (Nt) {
        At(Nt.message || "Не получилось разобрать фото", { type: "error" });
      } finally {
        nt(!1);
      }
    }
  }, an = async () => {
    await Gt("/api/food_prompt", {}).catch(() => null), As({ nudge: !1 });
  }, qn = [
    { label: "Фото", icon: /* @__PURE__ */ p.jsx(X7, {}), onSelect: () => J.current?.click() },
    { label: "Текстом", icon: /* @__PURE__ */ p.jsx(K7, {}), onSelect: an }
  ];
  return /* @__PURE__ */ p.jsx(ji, { children: /* @__PURE__ */ p.jsx(Rs, { mode: "secondary", children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-paper-screen aiwa-food-screen", children: [
    /* @__PURE__ */ p.jsx(
      Tc,
      {
        hero: Be,
        previewDay: rt,
        onProfile: () => c(!0),
        onCalendar: () => g(!0),
        action: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-screen-cta", children: [
          /* @__PURE__ */ p.jsx(
            K3,
            {
              items: qn,
              trigger: /* @__PURE__ */ p.jsx(
                De,
                {
                  variant: "filled",
                  "aria-label": "Добавить приём",
                  label: /* @__PURE__ */ p.jsxs("span", { className: "aiwa-btn-icon-label", children: [
                    /* @__PURE__ */ p.jsx(Es, {}),
                    " Добавить приём"
                  ] })
                }
              )
            }
          ),
          /* @__PURE__ */ p.jsx(
            "input",
            {
              ref: J,
              type: "file",
              accept: "image/*",
              hidden: !0,
              onChange: (ft) => {
                ha(ft.target.files?.[0]), ft.target.value = "";
              }
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ p.jsxs(pt, { className: "aiwa-tma-blocks", children: [
      /* @__PURE__ */ p.jsx(
        Jl,
        {
          message: ot.text || "Выбираем простую еду с белком в каждом приёме.",
          onDiscuss: () => As({ topic: "food" })
        }
      ),
      O ? /* @__PURE__ */ p.jsx(pt.Item, { header: "Меню на сегодня", children: /* @__PURE__ */ p.jsx(Zt, { loading: !0, title: "Айва собирает меню…", description: "Завтрак, обед и ужин под фазу" }) }) : null,
      F.length ? /* @__PURE__ */ p.jsx(pt.Item, { header: "Меню на сегодня", children: F.map((ft) => /* @__PURE__ */ p.jsx(
        Zt,
        {
          image: ft.image,
          title: ft.meal.dish || "Рекомендация Айвы",
          description: [ft.label, ft.meal.kcal, ft.meal.note].filter(Boolean).join(" · "),
          onClick: () => w(ft)
        },
        ft.value
      )) }) : null,
      zt ? /* @__PURE__ */ p.jsxs(pt.Item, { header: Dt, children: [
        et ? /* @__PURE__ */ p.jsx(Zt, { loading: !0, title: "Разбираю фото…", description: "Айва считает КБЖУ" }) : null,
        ct && !gt ? /* @__PURE__ */ p.jsx(Zt, { loading: !0, title: "Загружаю…", description: "Дневник за выбранный день" }) : null,
        bt.map((ft) => /* @__PURE__ */ p.jsx(
          Zt,
          {
            image: y2(m, ft.title) || n2,
            title: ft.title,
            description: `${ph(ft.kcal)} · Б${Math.round(ft.protein || 0)} · Ж${Math.round(ft.fat || 0)} · У${Math.round(ft.carbs || 0)}`,
            onClick: ct ? void 0 : () => z("diary")
          },
          ft.id
        )),
        R ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
          /* @__PURE__ */ p.jsx(Jl, { message: R.summary }),
          R.gaps?.length ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
            /* @__PURE__ */ p.jsx(Zt, { title: "Чего не хватает", description: "" }),
            R.gaps.map((ft) => /* @__PURE__ */ p.jsx(Zt, { title: ft }, ft))
          ] }) : null,
          R.tips?.length ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
            /* @__PURE__ */ p.jsx(Zt, { title: "Советы на неделю", description: "" }),
            R.tips.map((ft, Nt) => /* @__PURE__ */ p.jsx(Zt, { title: `${Nt + 1}. ${ft}` }, ft))
          ] }) : null
        ] }) : null,
        /* @__PURE__ */ p.jsx("div", { className: "aiwa-cell-actions aiwa-week-review-cta", children: /* @__PURE__ */ p.jsx(
          Hn,
          {
            label: "Разобрать питание за неделю",
            loading: L,
            isFill: !0,
            ...ne("Разобрать питание за неделю", ve)
          }
        ) })
      ] }) : null
    ] }),
    /* @__PURE__ */ p.jsx(Um, { isOpen: u, onClose: () => c(!1) }),
    /* @__PURE__ */ p.jsx(
      km,
      {
        isOpen: d,
        onClose: () => g(!1),
        mode: n,
        symptomGroups: Ft("aiwaSymptomGroups")
      }
    ),
    /* @__PURE__ */ p.jsx(
      u_,
      {
        isOpen: E === "add",
        onClose: () => z(""),
        onSaved: it,
        editingMeal: k
      }
    ),
    /* @__PURE__ */ p.jsx(
      h_,
      {
        isOpen: !!C,
        meal: C?.meal,
        image: C?.image,
        slotLabel: C?.label,
        busy: M,
        onClose: () => w(null),
        onAdd: () => C && Re(C.meal, C.value)
      }
    ),
    /* @__PURE__ */ p.jsx(
      f_,
      {
        isOpen: E === "diary",
        onClose: () => z(""),
        diary: N,
        onAdd: Xe,
        onEdit: (ft) => {
          Y(ft), z("add");
        },
        onDelete: Se,
        onReco: async () => {
          const ft = await Gt("/api/diary_reco", {}).catch(() => null);
          At(ft?.text || "Не удалось собрать совет");
        }
      }
    )
  ] }) }) });
}
function v_({ isOpen: n, onClose: t, onSaved: s, suggested: l }) {
  const r = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), [u, c] = j.useState(r), [d, g] = j.useState("Силовая"), [m, y] = j.useState("45 мин"), [v, b] = j.useState("Нормально"), [T, S] = j.useState([]), [C, w] = j.useState({}), [M, _] = j.useState(""), [R, D] = j.useState(!1), [L, $] = j.useState(""), [E, z] = j.useState(null);
  j.useEffect(() => {
    if (!n) return;
    _3("workout");
    const O = l?.name || "", U = (l?.exercises || []).filter((ot) => ot?.name), X = /ход|прогул/i.test(O) ? "Ходьба" : /йог|мобил|релиз|растяж/i.test(O) ? "Йога" : /кардио|бег|вело/i.test(O) ? "Кардио" : /плав/i.test(O) ? "Плавание" : "Силовая";
    g(X), U.length ? (S(U.map((ot) => ot.name)), w(Object.fromEntries(U.map((ot) => [ot.name, { sets: ot.sets || "", reps: ot.reps || "" }])))) : (S(O ? [O] : []), w({})), _("");
    const it = (l?.exercises || []).find((ot) => ot?.name)?.name;
    $(it && Object.keys(fi).find((ot) => fi[ot].includes(it)) || ""), z(null), c(r);
  }, [n, l, r]);
  const k = (O) => S((U) => U.includes(O) ? U.filter((X) => X !== O) : [...U, O]), Y = d === "Силовая", et = (O) => Object.keys(fi).find((U) => fi[U].includes(O)) || null, nt = (O, U, X) => w((it) => ({ ...it, [O]: { ...it[O], [U]: X } })), J = (O, U) => {
    const X = String(C[O]?.[U] ?? "").replace(",", ".").trim(), it = Number(X);
    return X && Number.isFinite(it) && it > 0 ? it : null;
  }, Q = async () => {
    const O = [...T, ...M.trim() ? [M.trim()] : []];
    D(!0);
    try {
      const U = await Gt("/api/workout", {
        date: u,
        type: d,
        duration: m,
        rpe: v,
        items: O.map((X) => ({
          name: X,
          weight: Y ? J(X, "w") : null,
          sets: Y ? J(X, "sets") : null,
          reps: Y ? J(X, "reps") : null,
          group: Y ? et(X) : null
        }))
      });
      if (!U?.ok) throw new Error(U?.text || "Не получилось сохранить тренировку");
      await s(), z({ text: U.review || "", calories: U.calories || 0 });
    } catch (U) {
      At(U.message || "Не получилось сохранить", { type: "error" });
    } finally {
      D(!1);
    }
  }, W = (O) => /* @__PURE__ */ p.jsxs("div", { className: "aiwa-exercise-item", children: [
    /* @__PURE__ */ p.jsx(
      Tt,
      {
        as: "button",
        type: "button",
        "aria-pressed": T.includes(O),
        onClick: () => k(O),
        end: /* @__PURE__ */ p.jsx("span", { className: T.includes(O) ? "aiwa-check is-active" : "aiwa-check", children: T.includes(O) ? "✓" : /* @__PURE__ */ p.jsx(Es, {}) }),
        children: /* @__PURE__ */ p.jsx(Tt.Text, { title: O })
      }
    ),
    Y && T.includes(O) ? /* @__PURE__ */ p.jsxs("div", { className: "aiwa-exercise-nums", children: [
      /* @__PURE__ */ p.jsx(
        "input",
        {
          inputMode: "decimal",
          placeholder: "кг",
          "aria-label": `${O}: вес`,
          value: C[O]?.w ?? "",
          onChange: (U) => nt(O, "w", U.target.value)
        }
      ),
      /* @__PURE__ */ p.jsx(
        "input",
        {
          inputMode: "numeric",
          placeholder: "подходы",
          "aria-label": `${O}: подходы`,
          value: C[O]?.sets ?? "",
          onChange: (U) => nt(O, "sets", U.target.value)
        }
      ),
      /* @__PURE__ */ p.jsx(
        "input",
        {
          inputMode: "numeric",
          placeholder: "повторы",
          "aria-label": `${O}: повторы`,
          value: C[O]?.reps ?? "",
          onChange: (U) => nt(O, "reps", U.target.value)
        }
      )
    ] }) : null
  ] }, O);
  return E ? /* @__PURE__ */ p.jsx(Rn, { isOpen: n, onClose: t, children: /* @__PURE__ */ p.jsx("div", { children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-sheet-card aiwa-workout-review", children: [
      /* @__PURE__ */ p.jsx(ut, { variant: "title2", weight: "semibold", children: "Тренировка сохранена" }),
      /* @__PURE__ */ p.jsx(ut, { variant: "body", weight: "regular", children: `Сожжено примерно ${E.calories} ккал.` }),
      E.text ? /* @__PURE__ */ p.jsx(ut, { variant: "body", weight: "regular", children: E.text }) : null
    ] }),
    /* @__PURE__ */ p.jsx(De, { variant: "filled", label: "Понятно", isFill: !0, ...ne("Закрыть разбор", t) })
  ] }) }) }) : /* @__PURE__ */ p.jsx(Rn, { isOpen: n, onClose: t, children: /* @__PURE__ */ p.jsx("div", { children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ p.jsx(me, { label: "Когда", type: "date", value: u, onChange: c }),
    /* @__PURE__ */ p.jsx(Hl, { surface: "canvas", label: "Что делала", options: SM, value: d, onChange: (O) => {
      g(O), S([]);
    } }),
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-workout-exercises", children: /* @__PURE__ */ p.jsx(pt, { children: /* @__PURE__ */ p.jsxs(pt.Item, { header: "Упражнения", children: [
      Y ? Object.keys(fi).map((O) => {
        const U = fi[O].filter((ot) => T.includes(ot)).length, X = L === O, it = U ? /* @__PURE__ */ p.jsx(ut, { variant: "caption1", weight: "regular", children: `выбрано ${U}` }) : X ? /* @__PURE__ */ p.jsx(ut, { variant: "caption1", weight: "regular", children: "—" }) : /* @__PURE__ */ p.jsx("span", { className: "aiwa-exercise-add-icon", "aria-hidden": "true", children: /* @__PURE__ */ p.jsx(Es, {}) });
        return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-exercise-item", children: [
          /* @__PURE__ */ p.jsx(
            Tt,
            {
              as: "button",
              type: "button",
              "data-aiwa-exercise-group": "true",
              "aria-expanded": X,
              onClick: () => $(X ? "" : O),
              end: it,
              children: /* @__PURE__ */ p.jsx(Tt.Text, { title: O, bold: !0 })
            }
          ),
          X ? fi[O].map(W) : null
        ] }, O);
      }) : (wM[d] || []).map(W),
      /* @__PURE__ */ p.jsxs(Tt, { "data-aiwa-exercise-custom": "true", tappable: !1, children: [
        /* @__PURE__ */ p.jsx(ut, { variant: "caption1", weight: "regular", children: "Добавить своё" }),
        /* @__PURE__ */ p.jsx(Tt.Editable, { label: "Название упражнения", value: M, onChange: _ })
      ] })
    ] }) }) }),
    /* @__PURE__ */ p.jsx(Hl, { surface: "canvas", label: "Длительность", options: ["30 мин", "45 мин", "60+ мин"], value: m, onChange: y }),
    /* @__PURE__ */ p.jsx(Hl, { surface: "canvas", label: "Как ощущалось", options: ["Легко", "Нормально", "Тяжело"], value: v, onChange: b }),
    /* @__PURE__ */ p.jsx(
      Hn,
      {
        label: "Сохранить и разобрать",
        loading: R,
        isFill: !0,
        ...ne("Сохранить и разобрать", Q)
      }
    )
  ] }) }) });
}
function b_({ isOpen: n, onClose: t, options: s, onSelect: l }) {
  return /* @__PURE__ */ p.jsx(Rn, { isOpen: n, onClose: t, children: /* @__PURE__ */ p.jsxs(pt, { className: "aiwa-tma-blocks", children: [
    /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ p.jsx(
      Tt.Text,
      {
        title: "Рекомендация на сегодня",
        description: "Выбери вариант, после которого останется запас сил."
      }
    ) }) }),
    /* @__PURE__ */ p.jsx(pt.Item, { children: s.map((r, u) => /* @__PURE__ */ p.jsx(
      Zt,
      {
        title: r.name || `Вариант ${u + 1}`,
        description: r.how || r.benefit || r.detail,
        onClick: () => l(r)
      },
      r.name || u
    )) })
  ] }) });
}
function x_({ isOpen: n, onClose: t, state: s, onAdd: l }) {
  const r = s?.today || [];
  return /* @__PURE__ */ p.jsx(Rn, { isOpen: n, onClose: t, children: /* @__PURE__ */ p.jsxs(pt, { className: "aiwa-tma-blocks", children: [
    s?.last_review ? /* @__PURE__ */ p.jsx(
      Jl,
      {
        message: s.last_review.text || s.last_review,
        onDiscuss: () => As({ topic: "train" })
      }
    ) : null,
    /* @__PURE__ */ p.jsx(pt.Item, { header: "Неделя", children: (s?.week || []).map((u) => /* @__PURE__ */ p.jsx(
      Zt,
      {
        title: u.dow,
        description: u.count ? `${u.type || "Тренировка"} · ${u.count}` : "Без тренировки",
        muted: !u.count
      },
      u.d
    )) }),
    r.length ? /* @__PURE__ */ p.jsx(pt.Item, { header: "Сегодня", children: r.map((u) => /* @__PURE__ */ p.jsx(
      Zt,
      {
        title: u.type || "Тренировка",
        description: `${u.duration || "—"} · ${String(u.rpe || "").toLowerCase()}`
      },
      u.id
    )) }) : null,
    /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ p.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ p.jsx(
      De,
      {
        variant: "filled",
        label: "Отметить тренировку",
        isFill: !0,
        ...ne("Отметить тренировку", l)
      }
    ) }) }) })
  ] }) });
}
function S_({ isOpen: n, onClose: t, profile: s, onSaved: l }) {
  const [r, u] = j.useState(s || {});
  j.useEffect(() => {
    n && u(s || {});
  }, [n, s]);
  const c = (g, m) => u((y) => ({ ...y, [g]: m })), d = async () => {
    (await Gt("/api/train_profile", r).catch(() => null))?.ok ? (At("Тренировочный профиль сохранён", { type: "success" }), await l(), t()) : At("Не получилось сохранить", { type: "error" });
  };
  return /* @__PURE__ */ p.jsx(Rn, { isOpen: n, onClose: t, children: /* @__PURE__ */ p.jsx("div", { children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ p.jsx(pt, { className: "aiwa-tma-blocks aiwa-settings-page", children: /* @__PURE__ */ p.jsx(
      pt.Item,
      {
        header: "Предпочтения в тренировках",
        description: "Расскажи, чем занимаешься и что важно беречь. Айва учтёт это в рекомендациях и разборе нагрузки.",
        children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-settings-form", children: [
          /* @__PURE__ */ p.jsx(me, { label: "Формат", value: r.format || "", onChange: (g) => c("format", g), placeholder: "Зал и прогулки" }),
          /* @__PURE__ */ p.jsx(me, { label: "Цель", value: r.goal || "", onChange: (g) => c("goal", g), placeholder: "Тонус и больше энергии" }),
          /* @__PURE__ */ p.jsx(me, { label: "Ограничения", value: r.limits || "", onChange: (g) => c("limits", g), placeholder: "Например, бережём поясницу" })
        ] })
      }
    ) }),
    /* @__PURE__ */ p.jsx(De, { variant: "filled", label: "Сохранить", isFill: !0, ...ne("Сохранить профиль", d) })
  ] }) }) });
}
const w_ = ["trainingSection", "train"], b2 = (n) => {
  const t = n % 100, s = n % 10;
  return t >= 11 && t <= 14 ? "тренировок" : s === 1 ? "тренировка" : s >= 2 && s <= 4 ? "тренировки" : "тренировок";
}, C_ = [
  ["силов", "Силовая"],
  ["ходь", "Ходьба"],
  ["прогул", "Прогулка"],
  ["шаг", "Ходьба"],
  ["бег", "Бег"],
  ["кардио", "Кардио"],
  ["велос", "Велотренажёр"],
  ["велотрен", "Велотренажёр"],
  ["эллипс", "Эллипс"],
  ["греб", "Гребля"],
  ["скакал", "Скакалка"],
  ["йог", "Йога"],
  ["растяж", "Растяжка"],
  ["стретч", "Растяжка"],
  ["мобил", "Растяжка"],
  ["пилатес", "Йога"],
  ["плава", "Плавание"],
  ["бассейн", "Плавание"],
  ["отдых", "Отдых"],
  ["восстанов", "Отдых"]
], x2 = (n, ...t) => {
  if (!n) return null;
  for (const l of t) {
    const r = n[String(l || "").trim()];
    if (r) return r + "?v=1";
  }
  const s = t.filter(Boolean).join(" ").toLowerCase();
  for (const [l, r] of Object.entries(n))
    if (s.includes(l.toLowerCase())) return r + "?v=1";
  for (const [l, r] of C_)
    if (s.includes(l) && n[r]) return n[r] + "?v=1";
  return n.Силовая && /трениров/.test(s) ? n.Силовая + "?v=1" : null;
};
function T_({ mode: n, revision: t = 0 }) {
  const [s, l] = Z3(w_, [n, t]), [r, u] = j.useState(!1), [c, d] = j.useState(!1), [g, m] = j.useState(""), [y, v] = j.useState(null), [b, T] = j.useState({}), S = Om(), C = Cc(), [w, M] = j.useState({}), _ = j.useRef(null), R = j.useRef(/* @__PURE__ */ new Set());
  j.useEffect(() => {
    fetch("/assets/train/manifest.json?v=1").then((F) => F.ok ? F.json() : {}).then((F) => T(F || {})).catch(() => {
    });
  }, []);
  const D = s.train?.week || [], L = (F) => D.find((rt) => rt.d === F)?.count === 0 ? [] : w[F];
  j.useEffect(() => {
    if (!S || S === C || L(S) && !R.current.has(S)) return;
    let F = !0;
    R.current.delete(S);
    const rt = (ct, gt) => {
      F && (gt || R.current.add(S), M((bt) => ({ ...bt, [S]: ct })));
    };
    return Gt("/api/train_day", { d: S }).then((ct) => rt(ct?.workouts || [], !!ct?.ok)).catch(() => rt([], !1)), () => {
      F = !1;
    };
  }, [S, s.train]);
  const $ = () => l("train");
  if (!s.trainingSection || !s.train) return /* @__PURE__ */ p.jsx($3, { variant: "activity" });
  const E = s.trainingSection, z = s.train, k = E.training || {}, Y = (k.options || []).slice(0, 4), et = z.today || [], nt = z.week || [], J = nt.filter((F) => F.count).slice(-3).reverse(), Q = nt.reduce((F, rt) => F + (rt.count || 0), 0), W = (F = null) => {
    v(F), m("workout");
  }, O = S !== C, U = (F) => {
    const rt = nt.find((gt) => gt.d === F);
    if (rt) return rt.count || 0;
    const ct = w[F];
    return ct ? ct.length : null;
  }, X = (F) => {
    const rt = U(F);
    return rt === null ? null : { value: String(rt), label: `${b2(rt)} в этот день` };
  }, it = { value: String(Q), label: `${b2(Q)} на этой неделе` }, ot = (O ? X(S) : it) || _.current || it;
  _.current = ot;
  const N = O ? `Тренировки за ${Nm(S)}` : "Прошедшие тренировки", q = O ? L(S) : et.slice().reverse(), tt = q || [], lt = O ? !q || tt.length > 0 : et.length > 0 || J.length > 0;
  return /* @__PURE__ */ p.jsx(ji, { children: /* @__PURE__ */ p.jsx(Rs, { mode: "secondary", children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-paper-screen aiwa-activity-screen", children: [
    /* @__PURE__ */ p.jsx(
      Tc,
      {
        heroValue: ot.value,
        heroLabel: ot.label,
        previewDay: X,
        onProfile: () => u(!0),
        onCalendar: () => d(!0),
        action: /* @__PURE__ */ p.jsx(
          De,
          {
            variant: "filled",
            label: /* @__PURE__ */ p.jsxs("span", { className: "aiwa-btn-icon-label", children: [
              /* @__PURE__ */ p.jsx(Es, {}),
              " Отметить тренировку"
            ] }),
            ...ne("Отметить тренировку", () => W())
          }
        )
      }
    ),
    /* @__PURE__ */ p.jsxs(pt, { className: "aiwa-tma-blocks", children: [
      /* @__PURE__ */ p.jsx(
        Jl,
        {
          message: k.summary || E.text || "Выбирай нагрузку, после которой станет легче, а не хуже.",
          detail: k.why,
          onDiscuss: () => As({ topic: "train" })
        }
      ),
      Y.length ? /* @__PURE__ */ p.jsx(pt.Item, { header: "Варианты", children: Y.map((F, rt) => /* @__PURE__ */ p.jsx(
        Zt,
        {
          image: x2(b, F.name),
          title: [F.name || `Вариант ${rt + 1}`, F.duration].filter(Boolean).join(" · "),
          description: [
            (F.exercises || []).map((ct) => [ct.name, ct.sets && ct.reps ? `${ct.sets}×${ct.reps}` : ""].filter(Boolean).join(" ")).join(", "),
            F.tip || F.benefit || F.how || F.detail
          ].filter(Boolean).join(" — "),
          onClick: () => W(F)
        },
        F.name || rt
      )) }) : null,
      lt ? /* @__PURE__ */ p.jsxs(pt.Item, { header: N, children: [
        O && !q ? /* @__PURE__ */ p.jsx(Zt, { loading: !0, title: "Загружаю…", description: "Тренировки за выбранный день" }) : null,
        tt.length ? tt.map((F) => /* @__PURE__ */ p.jsx(
          Zt,
          {
            image: x2(b, F.type),
            title: F.type || "Тренировка",
            description: [
              O ? "" : "сегодня",
              F.duration,
              F.kcal ? `${Math.round(F.kcal)} ккал` : "",
              String(F.rpe || "").toLowerCase()
            ].filter(Boolean).join(" · "),
            onClick: () => m("history")
          },
          F.id
        )) : O && !q ? null : J.length ? J.map((F) => /* @__PURE__ */ p.jsx(
          Zt,
          {
            title: F.type || "Тренировка",
            description: `${F.d} · ${F.count} запись`,
            onClick: () => m("history")
          },
          F.d
        )) : /* @__PURE__ */ p.jsx(
          Zt,
          {
            title: "История пока пуста",
            description: "Отметь первую тренировку — Айва подготовит разбор.",
            onClick: () => m("history")
          }
        )
      ] }) : null,
      /* @__PURE__ */ p.jsx("div", { className: "aiwa-page-action", children: /* @__PURE__ */ p.jsx(
        Hn,
        {
          variant: "secondaryCanvas",
          label: "Изменить предпочтения",
          isFill: !0,
          ...ne("Изменить предпочтения", () => m("profile"))
        }
      ) })
    ] }),
    /* @__PURE__ */ p.jsx(Um, { isOpen: r, onClose: () => u(!1) }),
    /* @__PURE__ */ p.jsx(
      km,
      {
        isOpen: c,
        onClose: () => d(!1),
        mode: n,
        symptomGroups: Ft("aiwaSymptomGroups")
      }
    ),
    /* @__PURE__ */ p.jsx(v_, { isOpen: g === "workout", onClose: () => m(""), onSaved: $, suggested: y }),
    /* @__PURE__ */ p.jsx(
      b_,
      {
        isOpen: g === "variants",
        onClose: () => m(""),
        options: Y,
        onSelect: (F) => W(F)
      }
    ),
    /* @__PURE__ */ p.jsx(x_, { isOpen: g === "history", onClose: () => m(""), state: z, onAdd: () => W() }),
    /* @__PURE__ */ p.jsx(S_, { isOpen: g === "profile", onClose: () => m(""), profile: z.profile, onSaved: $ })
  ] }) }) });
}
function j_({ initialMessages: n = [] }) {
  const [t, s] = j.useState(() => n.map((S, C) => ({
    id: `initial-${C}`,
    role: S.role === "user" ? "user" : "assistant",
    text: S.text || "",
    suggestions: []
  }))), [l, r] = j.useState(""), [u, c] = j.useState(!1), [d, g] = j.useState(!1), m = Od.useRef(null), y = Od.useRef(null);
  j.useEffect(() => {
    t.length || s([{
      id: "hello",
      role: "assistant",
      text: "Привет! Спроси меня о цикле, питании, тренировках или самочувствии. Я отвечу с учётом твоих данных.",
      suggestions: ["Можно ли тренироваться?", "Что съесть сегодня?", "Как моё самочувствие?"]
    }]);
  }, []), j.useEffect(() => {
    y.current?.scrollIntoView({ block: "end" });
  }, [t, u]);
  const v = async (S = l) => {
    const C = String(S || "").trim();
    if (!C || u) return;
    r(""), s((M) => [...M, { id: `user-${Date.now()}`, role: "user", text: C, suggestions: [] }]), c(!0);
    const w = await Gt("/api/chat", { message: C }).catch(() => null);
    s((M) => [...M, {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      text: w?.answer || "Не получилось ответить, попробуй ещё раз.",
      suggestions: w?.suggestions || []
    }]), c(!1);
  }, b = async (S, C) => {
    c(!0);
    const w = new FormData();
    w.append("initData", window.aiwaInit || ""), w.append("audio", S, C?.includes("mp4") ? "voice.mp4" : "voice.webm");
    try {
      const _ = await (await fetch("/api/voice", { method: "POST", body: w })).json();
      _.transcript && s((R) => [...R, { id: `voice-${Date.now()}`, role: "user", text: _.transcript, suggestions: [] }]), s((R) => [...R, {
        id: `voice-answer-${Date.now()}`,
        role: "assistant",
        text: _.answer || "Не получилось распознать голос.",
        suggestions: _.suggestions || []
      }]);
    } catch {
      At("Не получилось отправить голос", { type: "error" });
    } finally {
      c(!1);
    }
  }, T = async () => {
    if (d) {
      m.current?.stop();
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      At("Голос недоступен в этом клиенте", { type: "error" });
      return;
    }
    try {
      const S = await navigator.mediaDevices.getUserMedia({ audio: !0 }), C = [], w = new MediaRecorder(S);
      m.current = w, w.ondataavailable = (M) => {
        M.data?.size && C.push(M.data);
      }, w.onstop = () => {
        g(!1), S.getTracks().forEach((_) => _.stop());
        const M = new Blob(C, { type: w.mimeType || "audio/webm" });
        M.size > 900 && b(M, w.mimeType);
      }, w.start(), g(!0);
    } catch {
      At("Нет доступа к микрофону", { type: "error" });
    }
  };
  return /* @__PURE__ */ p.jsx(ji, { children: /* @__PURE__ */ p.jsx(Rs, { mode: "secondary", children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-chat-screen", children: [
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-chat-header", children: [
      /* @__PURE__ */ p.jsx(Vm, { size: 50, frames: lo, pauseMs: 0 }),
      /* @__PURE__ */ p.jsxs("div", { children: [
        /* @__PURE__ */ p.jsx(ut, { variant: "title3", weight: "semibold", children: "Айва" }),
        /* @__PURE__ */ p.jsx(ut, { variant: "caption1", weight: "regular", children: "учитывает твои данные" })
      ] }),
      /* @__PURE__ */ p.jsx(Ge, { as: "button", type: "button", mode: "opacity", className: "aiwa-sheet-close", "aria-label": "Закрыть чат", onClick: () => bn("go", "today"), children: /* @__PURE__ */ p.jsx(E3, {}) })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-chat-messages", children: [
      t.map((S) => /* @__PURE__ */ p.jsxs("div", { className: S.role === "user" ? "aiwa-chat-bubble is-user" : "aiwa-chat-bubble is-ai", children: [
        /* @__PURE__ */ p.jsx(ut, { variant: "body", weight: "regular", children: S.text }),
        S.suggestions?.length ? /* @__PURE__ */ p.jsx("div", { className: "aiwa-chat-suggestions", children: S.suggestions.slice(0, 3).map((C) => /* @__PURE__ */ p.jsx(Ge, { as: "button", type: "button", mode: "opacity", onClick: () => v(C), children: /* @__PURE__ */ p.jsx(ut, { variant: "caption1", weight: "semibold", children: C }) }, C)) }) : null
      ] }, S.id)),
      u ? /* @__PURE__ */ p.jsx("div", { className: "aiwa-chat-bubble is-ai", children: /* @__PURE__ */ p.jsx(ut, { variant: "body", weight: "regular", children: "Айва думает…" }) }) : null,
      /* @__PURE__ */ p.jsx("span", { ref: y })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-chat-composer", children: [
      /* @__PURE__ */ p.jsx(
        "input",
        {
          value: l,
          placeholder: "Спроси Айву…",
          onChange: (S) => r(S.target.value),
          onKeyDown: (S) => {
            S.key === "Enter" && v();
          }
        }
      ),
      /* @__PURE__ */ p.jsx(Ge, { as: "button", type: "button", mode: "opacity", className: d ? "aiwa-chat-icon is-recording" : "aiwa-chat-icon", "aria-label": "Голос", onClick: T, children: /* @__PURE__ */ p.jsx(ut, { variant: "body", weight: "semibold", children: d ? "■" : "Голос" }) }),
      /* @__PURE__ */ p.jsx(Ge, { as: "button", type: "button", mode: "opacity", className: "aiwa-chat-send", "aria-label": "Отправить", onClick: () => v(), children: /* @__PURE__ */ p.jsx(ut, { variant: "title3", weight: "semibold", children: "↑" }) })
    ] })
  ] }) }) });
}
const S2 = [
  { id: "today", label: "Главная", icon: /* @__PURE__ */ p.jsx(k7, {}) },
  { id: "food", label: "Питание", icon: /* @__PURE__ */ p.jsx(G7, {}) },
  { id: "train", label: "Нагрузка", icon: /* @__PURE__ */ p.jsx(P7, {}) }
];
function E_({ active: n }) {
  const l = (typeof window.aiwaData == "function" ? window.aiwaData() : window.aiwaData)?.mode === "male" ? S2.filter((c) => c.id !== "today") : S2, r = n === "stats" ? "today" : n, u = Math.max(0, l.findIndex((c) => c.id === r));
  return /* @__PURE__ */ p.jsx(ji, { children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-nav-root", "data-aiwa-nav": "true", children: [
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-nav-tabbar-layer", children: /* @__PURE__ */ p.jsx(
      ZA,
      {
        tabs: l.map(({ label: c, icon: d }) => ({ label: c, icon: d })),
        defaultIndex: u,
        onChange: (c) => bn("go", l[c].id)
      }
    ) }),
    /* @__PURE__ */ p.jsx(
      Ge,
      {
        as: "button",
        type: "button",
        mode: "opacity",
        className: "aiwa-nav-mascot",
        "aria-label": "Открыть Айву",
        onClick: () => As(),
        children: /* @__PURE__ */ p.jsx(Vm, { size: 67 })
      }
    )
  ] }) });
}
let pi = null, Md = null, gi = null, Nl = "", Th = !1, jh = 0, _d = null, w2 = null, Ml = null, Dd = null, Ur = {}, Hr = 0, Rd = null, C2 = null, T2 = {}, j2 = 0, Nd = null, E2 = null;
const di = () => {
  !pi || !gi || pi.render(
    /* @__PURE__ */ p.jsx(
      s_,
      {
        ...gi,
        panel: Nl,
        panelRevision: jh,
        profileOpen: Th,
        onPanelClose: () => Eh.closePanel(),
        onProfileClose: () => Eh.closeProfile()
      }
    )
  );
}, Eh = {
  renderHome(n, t) {
    n && (Md !== n && (pi?.unmount(), Md = n, pi = fs.createRoot(n)), gi = t, Nl = t.panel || Nl, di());
  },
  patchHome(n) {
    !pi || !gi || (gi = { ...gi, ...n }, di());
  },
  openPanel(n) {
    Nl = n, window.HOME_PANEL = n, jh += 1, di();
  },
  closePanel() {
    Nl = "", window.HOME_PANEL = "", di();
  },
  openProfile() {
    Th = !0, di();
  },
  closeProfile() {
    Th = !1, di();
  },
  refreshPanel() {
    jh += 1, di();
  },
  unmountHome() {
    pi?.unmount(), pi = null, Md = null, gi = null;
  },
  // Повторный вызов для уже смонтированного экрана = «перечитай данные»:
  // так host сбрасывает loadedFood/loadedTrain после правок профиля.
  renderFood(n, t = {}) {
    n && (Dd !== n ? (Ml?.unmount(), Dd = n, Ml = fs.createRoot(n)) : Hr += 1, Ur = t, Ml.render(/* @__PURE__ */ p.jsx(v2, { ...Ur, revision: Hr })));
  },
  renderActivity(n, t = {}) {
    n && (C2 !== n ? (Rd?.unmount(), C2 = n, Rd = fs.createRoot(n)) : j2 += 1, T2 = t, Rd.render(/* @__PURE__ */ p.jsx(T_, { ...T2, revision: j2 })));
  },
  renderChat(n, t = {}) {
    n && (E2 !== n && (Nd?.unmount(), E2 = n, Nd = fs.createRoot(n)), Nd.render(/* @__PURE__ */ p.jsx(j_, { initialMessages: t.messages || [] })));
  },
  refreshFood() {
    !Dd || !Ml || (Hr += 1, Ml.render(/* @__PURE__ */ p.jsx(v2, { ...Ur, mode: Ft("aiwaMode") || Ur.mode, revision: Hr })));
  },
  /** Прогрев данных «Питания» и «Нагрузки» на старте — чтобы табы открывались сразу. */
  prefetch() {
    m_();
  },
  renderNav(n, t) {
    n && (w2 !== n && (_d?.unmount(), w2 = n, _d = fs.createRoot(n)), _d.render(/* @__PURE__ */ p.jsx(E_, { active: t })));
  }
};
function A_() {
  rM(), zm(), V3(), window.AiwaDeslop = Eh, J7(), window.dispatchEvent(new CustomEvent("aiwa:deslop-ready"));
}
A_();
export {
  b4 as R,
  Wl as a,
  M4 as b,
  io as c,
  p4 as g,
  p as j,
  j as r,
  ut as t
};
