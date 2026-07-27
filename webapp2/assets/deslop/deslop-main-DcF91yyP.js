function z3(a, e) {
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
function L3(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var lf = { exports: {} }, Wl = {};
var H0;
function B3() {
  if (H0) return Wl;
  H0 = 1;
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
  return Wl.Fragment = e, Wl.jsx = l, Wl.jsxs = l, Wl;
}
var q0;
function V3() {
  return q0 || (q0 = 1, lf.exports = B3()), lf.exports;
}
var p = V3(), sf = { exports: {} }, bt = {};
var $0;
function U3() {
  if ($0) return bt;
  $0 = 1;
  var a = Symbol.for("react.transitional.element"), e = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), f = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), m = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), b = Symbol.iterator;
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
  }, w = Object.assign, A = {};
  function _(N, G, tt) {
    this.props = N, this.context = G, this.refs = A, this.updater = tt || S;
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
  function M() {
  }
  M.prototype = _.prototype;
  function j(N, G, tt) {
    this.props = N, this.context = G, this.refs = A, this.updater = tt || S;
  }
  var D = j.prototype = new M();
  D.constructor = j, w(D, _.prototype), D.isPureReactComponent = !0;
  var B = Array.isArray;
  function V() {
  }
  var R = { H: null, A: null, T: null, S: null }, k = Object.prototype.hasOwnProperty;
  function P(N, G, tt) {
    var ot = tt.ref;
    return {
      $$typeof: a,
      type: N,
      key: G,
      ref: ot !== void 0 ? ot : null,
      props: tt
    };
  }
  function K(N, G) {
    return P(N.type, G, N.props);
  }
  function it(N) {
    return typeof N == "object" && N !== null && N.$$typeof === a;
  }
  function et(N) {
    var G = { "=": "=0", ":": "=2" };
    return "$" + N.replace(/[=:]/g, function(tt) {
      return G[tt];
    });
  }
  var I = /\/+/g;
  function J(N, G) {
    return typeof N == "object" && N !== null && N.key != null ? et("" + N.key) : G.toString(36);
  }
  function nt(N) {
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
  function O(N, G, tt, ot, dt) {
    var ht = typeof N;
    (ht === "undefined" || ht === "boolean") && (N = null);
    var vt = !1;
    if (N === null) vt = !0;
    else
      switch (ht) {
        case "bigint":
        case "string":
        case "number":
          vt = !0;
          break;
        case "object":
          switch (N.$$typeof) {
            case a:
            case e:
              vt = !0;
              break;
            case g:
              return vt = N._init, O(
                vt(N._payload),
                G,
                tt,
                ot,
                dt
              );
          }
      }
    if (vt)
      return dt = dt(N), vt = ot === "" ? "." + J(N, 0) : ot, B(dt) ? (tt = "", vt != null && (tt = vt.replace(I, "$&/") + "/"), O(dt, G, tt, "", function(Kt) {
        return Kt;
      })) : dt != null && (it(dt) && (dt = K(
        dt,
        tt + (dt.key == null || N && N.key === dt.key ? "" : ("" + dt.key).replace(
          I,
          "$&/"
        ) + "/") + vt
      )), G.push(dt)), 1;
    vt = 0;
    var Nt = ot === "" ? "." : ot + ":";
    if (B(N))
      for (var _t = 0; _t < N.length; _t++)
        ot = N[_t], ht = Nt + J(ot, _t), vt += O(
          ot,
          G,
          tt,
          ht,
          dt
        );
    else if (_t = T(N), typeof _t == "function")
      for (N = _t.call(N), _t = 0; !(ot = N.next()).done; )
        ot = ot.value, ht = Nt + J(ot, _t++), vt += O(
          ot,
          G,
          tt,
          ht,
          dt
        );
    else if (ht === "object") {
      if (typeof N.then == "function")
        return O(
          nt(N),
          G,
          tt,
          ot,
          dt
        );
      throw G = String(N), Error(
        "Objects are not valid as a React child (found: " + (G === "[object Object]" ? "object with keys {" + Object.keys(N).join(", ") + "}" : G) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return vt;
  }
  function Y(N, G, tt) {
    if (N == null) return N;
    var ot = [], dt = 0;
    return O(N, ot, "", "", function(ht) {
      return G.call(tt, ht, dt++);
    }), ot;
  }
  function Q(N) {
    if (N._status === -1) {
      var G = N._result;
      G = G(), G.then(
        function(tt) {
          (N._status === 0 || N._status === -1) && (N._status = 1, N._result = tt);
        },
        function(tt) {
          (N._status === 0 || N._status === -1) && (N._status = 2, N._result = tt);
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
  }, st = {
    map: Y,
    forEach: function(N, G, tt) {
      Y(
        N,
        function() {
          G.apply(this, arguments);
        },
        tt
      );
    },
    count: function(N) {
      var G = 0;
      return Y(N, function() {
        G++;
      }), G;
    },
    toArray: function(N) {
      return Y(N, function(G) {
        return G;
      }) || [];
    },
    only: function(N) {
      if (!it(N))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return N;
    }
  };
  return bt.Activity = v, bt.Children = st, bt.Component = _, bt.Fragment = l, bt.Profiler = r, bt.PureComponent = j, bt.StrictMode = s, bt.Suspense = y, bt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = R, bt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(N) {
      return R.H.useMemoCache(N);
    }
  }, bt.cache = function(N) {
    return function() {
      return N.apply(null, arguments);
    };
  }, bt.cacheSignal = function() {
    return null;
  }, bt.cloneElement = function(N, G, tt) {
    if (N == null)
      throw Error(
        "The argument must be a React element, but you passed " + N + "."
      );
    var ot = w({}, N.props), dt = N.key;
    if (G != null)
      for (ht in G.key !== void 0 && (dt = "" + G.key), G)
        !k.call(G, ht) || ht === "key" || ht === "__self" || ht === "__source" || ht === "ref" && G.ref === void 0 || (ot[ht] = G[ht]);
    var ht = arguments.length - 2;
    if (ht === 1) ot.children = tt;
    else if (1 < ht) {
      for (var vt = Array(ht), Nt = 0; Nt < ht; Nt++)
        vt[Nt] = arguments[Nt + 2];
      ot.children = vt;
    }
    return P(N.type, dt, ot);
  }, bt.createContext = function(N) {
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
  }, bt.createElement = function(N, G, tt) {
    var ot, dt = {}, ht = null;
    if (G != null)
      for (ot in G.key !== void 0 && (ht = "" + G.key), G)
        k.call(G, ot) && ot !== "key" && ot !== "__self" && ot !== "__source" && (dt[ot] = G[ot]);
    var vt = arguments.length - 2;
    if (vt === 1) dt.children = tt;
    else if (1 < vt) {
      for (var Nt = Array(vt), _t = 0; _t < vt; _t++)
        Nt[_t] = arguments[_t + 2];
      dt.children = Nt;
    }
    if (N && N.defaultProps)
      for (ot in vt = N.defaultProps, vt)
        dt[ot] === void 0 && (dt[ot] = vt[ot]);
    return P(N, ht, dt);
  }, bt.createRef = function() {
    return { current: null };
  }, bt.forwardRef = function(N) {
    return { $$typeof: h, render: N };
  }, bt.isValidElement = it, bt.lazy = function(N) {
    return {
      $$typeof: g,
      _payload: { _status: -1, _result: N },
      _init: Q
    };
  }, bt.memo = function(N, G) {
    return {
      $$typeof: m,
      type: N,
      compare: G === void 0 ? null : G
    };
  }, bt.startTransition = function(N) {
    var G = R.T, tt = {};
    R.T = tt;
    try {
      var ot = N(), dt = R.S;
      dt !== null && dt(tt, ot), typeof ot == "object" && ot !== null && typeof ot.then == "function" && ot.then(V, at);
    } catch (ht) {
      at(ht);
    } finally {
      G !== null && tt.types !== null && (G.types = tt.types), R.T = G;
    }
  }, bt.unstable_useCacheRefresh = function() {
    return R.H.useCacheRefresh();
  }, bt.use = function(N) {
    return R.H.use(N);
  }, bt.useActionState = function(N, G, tt) {
    return R.H.useActionState(N, G, tt);
  }, bt.useCallback = function(N, G) {
    return R.H.useCallback(N, G);
  }, bt.useContext = function(N) {
    return R.H.useContext(N);
  }, bt.useDebugValue = function() {
  }, bt.useDeferredValue = function(N, G) {
    return R.H.useDeferredValue(N, G);
  }, bt.useEffect = function(N, G) {
    return R.H.useEffect(N, G);
  }, bt.useEffectEvent = function(N) {
    return R.H.useEffectEvent(N);
  }, bt.useId = function() {
    return R.H.useId();
  }, bt.useImperativeHandle = function(N, G, tt) {
    return R.H.useImperativeHandle(N, G, tt);
  }, bt.useInsertionEffect = function(N, G) {
    return R.H.useInsertionEffect(N, G);
  }, bt.useLayoutEffect = function(N, G) {
    return R.H.useLayoutEffect(N, G);
  }, bt.useMemo = function(N, G) {
    return R.H.useMemo(N, G);
  }, bt.useOptimistic = function(N, G) {
    return R.H.useOptimistic(N, G);
  }, bt.useReducer = function(N, G, tt) {
    return R.H.useReducer(N, G, tt);
  }, bt.useRef = function(N) {
    return R.H.useRef(N);
  }, bt.useState = function(N) {
    return R.H.useState(N);
  }, bt.useSyncExternalStore = function(N, G, tt) {
    return R.H.useSyncExternalStore(
      N,
      G,
      tt
    );
  }, bt.useTransition = function() {
    return R.H.useTransition();
  }, bt.version = "19.2.7", bt;
}
var G0;
function bs() {
  return G0 || (G0 = 1, sf.exports = U3()), sf.exports;
}
var E = bs();
const Qf = /* @__PURE__ */ L3(E), k3 = /* @__PURE__ */ z3({
  __proto__: null,
  default: Qf
}, [E]);
var of = { exports: {} }, Il = {}, rf = { exports: {} }, uf = {};
var Y0;
function H3() {
  return Y0 || (Y0 = 1, (function(a) {
    function e(O, Y) {
      var Q = O.length;
      O.push(Y);
      t: for (; 0 < Q; ) {
        var at = Q - 1 >>> 1, st = O[at];
        if (0 < r(st, Y))
          O[at] = Y, O[Q] = st, Q = at;
        else break t;
      }
    }
    function l(O) {
      return O.length === 0 ? null : O[0];
    }
    function s(O) {
      if (O.length === 0) return null;
      var Y = O[0], Q = O.pop();
      if (Q !== Y) {
        O[0] = Q;
        t: for (var at = 0, st = O.length, N = st >>> 1; at < N; ) {
          var G = 2 * (at + 1) - 1, tt = O[G], ot = G + 1, dt = O[ot];
          if (0 > r(tt, Q))
            ot < st && 0 > r(dt, tt) ? (O[at] = dt, O[ot] = Q, at = ot) : (O[at] = tt, O[G] = Q, at = G);
          else if (ot < st && 0 > r(dt, Q))
            O[at] = dt, O[ot] = Q, at = ot;
          else break t;
        }
      }
      return Y;
    }
    function r(O, Y) {
      var Q = O.sortIndex - Y.sortIndex;
      return Q !== 0 ? Q : O.id - Y.id;
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
    var y = [], m = [], g = 1, v = null, b = 3, T = !1, S = !1, w = !1, A = !1, _ = typeof setTimeout == "function" ? setTimeout : null, M = typeof clearTimeout == "function" ? clearTimeout : null, j = typeof setImmediate < "u" ? setImmediate : null;
    function D(O) {
      for (var Y = l(m); Y !== null; ) {
        if (Y.callback === null) s(m);
        else if (Y.startTime <= O)
          s(m), Y.sortIndex = Y.expirationTime, e(y, Y);
        else break;
        Y = l(m);
      }
    }
    function B(O) {
      if (w = !1, D(O), !S)
        if (l(y) !== null)
          S = !0, V || (V = !0, et());
        else {
          var Y = l(m);
          Y !== null && nt(B, Y.startTime - O);
        }
    }
    var V = !1, R = -1, k = 5, P = -1;
    function K() {
      return A ? !0 : !(a.unstable_now() - P < k);
    }
    function it() {
      if (A = !1, V) {
        var O = a.unstable_now();
        P = O;
        var Y = !0;
        try {
          t: {
            S = !1, w && (w = !1, M(R), R = -1), T = !0;
            var Q = b;
            try {
              e: {
                for (D(O), v = l(y); v !== null && !(v.expirationTime > O && K()); ) {
                  var at = v.callback;
                  if (typeof at == "function") {
                    v.callback = null, b = v.priorityLevel;
                    var st = at(
                      v.expirationTime <= O
                    );
                    if (O = a.unstable_now(), typeof st == "function") {
                      v.callback = st, D(O), Y = !0;
                      break e;
                    }
                    v === l(y) && s(y), D(O);
                  } else s(y);
                  v = l(y);
                }
                if (v !== null) Y = !0;
                else {
                  var N = l(m);
                  N !== null && nt(
                    B,
                    N.startTime - O
                  ), Y = !1;
                }
              }
              break t;
            } finally {
              v = null, b = Q, T = !1;
            }
            Y = void 0;
          }
        } finally {
          Y ? et() : V = !1;
        }
      }
    }
    var et;
    if (typeof j == "function")
      et = function() {
        j(it);
      };
    else if (typeof MessageChannel < "u") {
      var I = new MessageChannel(), J = I.port2;
      I.port1.onmessage = it, et = function() {
        J.postMessage(null);
      };
    } else
      et = function() {
        _(it, 0);
      };
    function nt(O, Y) {
      R = _(function() {
        O(a.unstable_now());
      }, Y);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(O) {
      O.callback = null;
    }, a.unstable_forceFrameRate = function(O) {
      0 > O || 125 < O ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : k = 0 < O ? Math.floor(1e3 / O) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return b;
    }, a.unstable_next = function(O) {
      switch (b) {
        case 1:
        case 2:
        case 3:
          var Y = 3;
          break;
        default:
          Y = b;
      }
      var Q = b;
      b = Y;
      try {
        return O();
      } finally {
        b = Q;
      }
    }, a.unstable_requestPaint = function() {
      A = !0;
    }, a.unstable_runWithPriority = function(O, Y) {
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
      var Q = b;
      b = O;
      try {
        return Y();
      } finally {
        b = Q;
      }
    }, a.unstable_scheduleCallback = function(O, Y, Q) {
      var at = a.unstable_now();
      switch (typeof Q == "object" && Q !== null ? (Q = Q.delay, Q = typeof Q == "number" && 0 < Q ? at + Q : at) : Q = at, O) {
        case 1:
          var st = -1;
          break;
        case 2:
          st = 250;
          break;
        case 5:
          st = 1073741823;
          break;
        case 4:
          st = 1e4;
          break;
        default:
          st = 5e3;
      }
      return st = Q + st, O = {
        id: g++,
        callback: Y,
        priorityLevel: O,
        startTime: Q,
        expirationTime: st,
        sortIndex: -1
      }, Q > at ? (O.sortIndex = Q, e(m, O), l(y) === null && O === l(m) && (w ? (M(R), R = -1) : w = !0, nt(B, Q - at))) : (O.sortIndex = st, e(y, O), S || T || (S = !0, V || (V = !0, et()))), O;
    }, a.unstable_shouldYield = K, a.unstable_wrapCallback = function(O) {
      var Y = b;
      return function() {
        var Q = b;
        b = Y;
        try {
          return O.apply(this, arguments);
        } finally {
          b = Q;
        }
      };
    };
  })(uf)), uf;
}
var X0;
function q3() {
  return X0 || (X0 = 1, rf.exports = H3()), rf.exports;
}
var cf = { exports: {} }, Ce = {};
var P0;
function $3() {
  if (P0) return Ce;
  P0 = 1;
  var a = bs();
  function e(y) {
    var m = "https://react.dev/errors/" + y;
    if (1 < arguments.length) {
      m += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var g = 2; g < arguments.length; g++)
        m += "&args[]=" + encodeURIComponent(arguments[g]);
    }
    return "Minified React error #" + y + "; visit " + m + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function c(y, m, g) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: v == null ? null : "" + v,
      children: y,
      containerInfo: m,
      implementation: g
    };
  }
  var f = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(y, m) {
    if (y === "font") return "";
    if (typeof m == "string")
      return m === "use-credentials" ? m : "";
  }
  return Ce.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, Ce.createPortal = function(y, m) {
    var g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(e(299));
    return c(y, m, null, g);
  }, Ce.flushSync = function(y) {
    var m = f.T, g = s.p;
    try {
      if (f.T = null, s.p = 2, y) return y();
    } finally {
      f.T = m, s.p = g, s.d.f();
    }
  }, Ce.preconnect = function(y, m) {
    typeof y == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, s.d.C(y, m));
  }, Ce.prefetchDNS = function(y) {
    typeof y == "string" && s.d.D(y);
  }, Ce.preinit = function(y, m) {
    if (typeof y == "string" && m && typeof m.as == "string") {
      var g = m.as, v = h(g, m.crossOrigin), b = typeof m.integrity == "string" ? m.integrity : void 0, T = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
      g === "style" ? s.d.S(
        y,
        typeof m.precedence == "string" ? m.precedence : void 0,
        {
          crossOrigin: v,
          integrity: b,
          fetchPriority: T
        }
      ) : g === "script" && s.d.X(y, {
        crossOrigin: v,
        integrity: b,
        fetchPriority: T,
        nonce: typeof m.nonce == "string" ? m.nonce : void 0
      });
    }
  }, Ce.preinitModule = function(y, m) {
    if (typeof y == "string")
      if (typeof m == "object" && m !== null) {
        if (m.as == null || m.as === "script") {
          var g = h(
            m.as,
            m.crossOrigin
          );
          s.d.M(y, {
            crossOrigin: g,
            integrity: typeof m.integrity == "string" ? m.integrity : void 0,
            nonce: typeof m.nonce == "string" ? m.nonce : void 0
          });
        }
      } else m == null && s.d.M(y);
  }, Ce.preload = function(y, m) {
    if (typeof y == "string" && typeof m == "object" && m !== null && typeof m.as == "string") {
      var g = m.as, v = h(g, m.crossOrigin);
      s.d.L(y, g, {
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
  }, Ce.preloadModule = function(y, m) {
    if (typeof y == "string")
      if (m) {
        var g = h(m.as, m.crossOrigin);
        s.d.m(y, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: g,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else s.d.m(y);
  }, Ce.requestFormReset = function(y) {
    s.d.r(y);
  }, Ce.unstable_batchedUpdates = function(y, m) {
    return y(m);
  }, Ce.useFormState = function(y, m, g) {
    return f.H.useFormState(y, m, g);
  }, Ce.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, Ce.version = "19.2.7", Ce;
}
var K0;
function ov() {
  if (K0) return cf.exports;
  K0 = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (e) {
        console.error(e);
      }
  }
  return a(), cf.exports = $3(), cf.exports;
}
var Z0;
function G3() {
  if (Z0) return Il;
  Z0 = 1;
  var a = q3(), e = bs(), l = ov();
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
  function y(t) {
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
          if (d === i) return y(u), t;
          if (d === o) return y(u), n;
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
  var v = Object.assign, b = Symbol.for("react.element"), T = Symbol.for("react.transitional.element"), S = Symbol.for("react.portal"), w = Symbol.for("react.fragment"), A = Symbol.for("react.strict_mode"), _ = Symbol.for("react.profiler"), M = Symbol.for("react.consumer"), j = Symbol.for("react.context"), D = Symbol.for("react.forward_ref"), B = Symbol.for("react.suspense"), V = Symbol.for("react.suspense_list"), R = Symbol.for("react.memo"), k = Symbol.for("react.lazy"), P = Symbol.for("react.activity"), K = Symbol.for("react.memo_cache_sentinel"), it = Symbol.iterator;
  function et(t) {
    return t === null || typeof t != "object" ? null : (t = it && t[it] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var I = Symbol.for("react.client.reference");
  function J(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === I ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case w:
        return "Fragment";
      case _:
        return "Profiler";
      case A:
        return "StrictMode";
      case B:
        return "Suspense";
      case V:
        return "SuspenseList";
      case P:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case S:
          return "Portal";
        case j:
          return t.displayName || "Context";
        case M:
          return (t._context.displayName || "Context") + ".Consumer";
        case D:
          var n = t.render;
          return t = t.displayName, t || (t = n.displayName || n.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case R:
          return n = t.displayName || null, n !== null ? n : J(t.type) || "Memo";
        case k:
          n = t._payload, t = t._init;
          try {
            return J(t(n));
          } catch {
          }
      }
    return null;
  }
  var nt = Array.isArray, O = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Y = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Q = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, at = [], st = -1;
  function N(t) {
    return { current: t };
  }
  function G(t) {
    0 > st || (t.current = at[st], at[st] = null, st--);
  }
  function tt(t, n) {
    st++, at[st] = t.current, t.current = n;
  }
  var ot = N(null), dt = N(null), ht = N(null), vt = N(null);
  function Nt(t, n) {
    switch (tt(ht, n), tt(dt, t), tt(ot, null), n.nodeType) {
      case 9:
      case 11:
        t = (t = n.documentElement) && (t = t.namespaceURI) ? u0(t) : 0;
        break;
      default:
        if (t = n.tagName, n = n.namespaceURI)
          n = u0(n), t = c0(n, t);
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
    G(ot), tt(ot, t);
  }
  function _t() {
    G(ot), G(dt), G(ht);
  }
  function Kt(t) {
    t.memoizedState !== null && tt(vt, t);
    var n = ot.current, i = c0(n, t.type);
    n !== i && (tt(dt, t), tt(ot, i));
  }
  function rt(t) {
    dt.current === t && (G(ot), G(dt)), vt.current === t && (G(vt), Zl._currentValue = Q);
  }
  var Mt, gn;
  function An(t) {
    if (Mt === void 0)
      try {
        throw Error();
      } catch (i) {
        var n = i.stack.trim().match(/\n( *(at )?)/);
        Mt = n && n[1] || "", gn = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Mt + t + gn;
  }
  var il = !1;
  function ll(t, n) {
    if (!t || il) return "";
    il = !0;
    var i = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var o = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var W = function() {
                throw Error();
              };
              if (Object.defineProperty(W.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(W, []);
                } catch (X) {
                  var $ = X;
                }
                Reflect.construct(t, [], W);
              } else {
                try {
                  W.call();
                } catch (X) {
                  $ = X;
                }
                t.call(W.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (X) {
                $ = X;
              }
              (W = t()) && typeof W.catch == "function" && W.catch(function() {
              });
            }
          } catch (X) {
            if (X && $ && typeof X.stack == "string")
              return [X.stack, $.stack];
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
        var z = x.split(`
`), q = C.split(`
`);
        for (u = o = 0; o < z.length && !z[o].includes("DetermineComponentFrameRoot"); )
          o++;
        for (; u < q.length && !q[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (o === z.length || u === q.length)
          for (o = z.length - 1, u = q.length - 1; 1 <= o && 0 <= u && z[o] !== q[u]; )
            u--;
        for (; 1 <= o && 0 <= u; o--, u--)
          if (z[o] !== q[u]) {
            if (o !== 1 || u !== 1)
              do
                if (o--, u--, 0 > u || z[o] !== q[u]) {
                  var Z = `
` + z[o].replace(" at new ", " at ");
                  return t.displayName && Z.includes("<anonymous>") && (Z = Z.replace("<anonymous>", t.displayName)), Z;
                }
              while (1 <= o && 0 <= u);
            break;
          }
      }
    } finally {
      il = !1, Error.prepareStackTrace = i;
    }
    return (i = t ? t.displayName || t.name : "") ? An(i) : "";
  }
  function fx(t, n) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return An(t.type);
      case 16:
        return An("Lazy");
      case 13:
        return t.child !== n && n !== null ? An("Suspense Fallback") : An("Suspense");
      case 19:
        return An("SuspenseList");
      case 0:
      case 15:
        return ll(t.type, !1);
      case 11:
        return ll(t.type.render, !1);
      case 1:
        return ll(t.type, !0);
      case 31:
        return An("Activity");
      default:
        return "";
    }
  }
  function Hh(t) {
    try {
      var n = "", i = null;
      do
        n += fx(t, i), i = t, t = t.return;
      while (t);
      return n;
    } catch (o) {
      return `
Error generating stack: ` + o.message + `
` + o.stack;
    }
  }
  var Gr = Object.prototype.hasOwnProperty, Yr = a.unstable_scheduleCallback, Xr = a.unstable_cancelCallback, dx = a.unstable_shouldYield, hx = a.unstable_requestPaint, Le = a.unstable_now, mx = a.unstable_getCurrentPriorityLevel, qh = a.unstable_ImmediatePriority, $h = a.unstable_UserBlockingPriority, Cs = a.unstable_NormalPriority, px = a.unstable_LowPriority, Gh = a.unstable_IdlePriority, yx = a.log, gx = a.unstable_setDisableYieldValue, sl = null, Be = null;
  function Kn(t) {
    if (typeof yx == "function" && gx(t), Be && typeof Be.setStrictMode == "function")
      try {
        Be.setStrictMode(sl, t);
      } catch {
      }
  }
  var Ve = Math.clz32 ? Math.clz32 : xx, vx = Math.log, bx = Math.LN2;
  function xx(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (vx(t) / bx | 0) | 0;
  }
  var Es = 256, As = 262144, js = 4194304;
  function Ca(t) {
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
  function Ms(t, n, i) {
    var o = t.pendingLanes;
    if (o === 0) return 0;
    var u = 0, d = t.suspendedLanes, x = t.pingedLanes;
    t = t.warmLanes;
    var C = o & 134217727;
    return C !== 0 ? (o = C & ~d, o !== 0 ? u = Ca(o) : (x &= C, x !== 0 ? u = Ca(x) : i || (i = C & ~t, i !== 0 && (u = Ca(i))))) : (C = o & ~d, C !== 0 ? u = Ca(C) : x !== 0 ? u = Ca(x) : i || (i = o & ~t, i !== 0 && (u = Ca(i)))), u === 0 ? 0 : n !== 0 && n !== u && (n & d) === 0 && (d = u & -u, i = n & -n, d >= i || d === 32 && (i & 4194048) !== 0) ? n : u;
  }
  function ol(t, n) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & n) === 0;
  }
  function Sx(t, n) {
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
  function Yh() {
    var t = js;
    return js <<= 1, (js & 62914560) === 0 && (js = 4194304), t;
  }
  function Pr(t) {
    for (var n = [], i = 0; 31 > i; i++) n.push(t);
    return n;
  }
  function rl(t, n) {
    t.pendingLanes |= n, n !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function wx(t, n, i, o, u, d) {
    var x = t.pendingLanes;
    t.pendingLanes = i, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= i, t.entangledLanes &= i, t.errorRecoveryDisabledLanes &= i, t.shellSuspendCounter = 0;
    var C = t.entanglements, z = t.expirationTimes, q = t.hiddenUpdates;
    for (i = x & ~i; 0 < i; ) {
      var Z = 31 - Ve(i), W = 1 << Z;
      C[Z] = 0, z[Z] = -1;
      var $ = q[Z];
      if ($ !== null)
        for (q[Z] = null, Z = 0; Z < $.length; Z++) {
          var X = $[Z];
          X !== null && (X.lane &= -536870913);
        }
      i &= ~W;
    }
    o !== 0 && Xh(t, o, 0), d !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= d & ~(x & ~n));
  }
  function Xh(t, n, i) {
    t.pendingLanes |= n, t.suspendedLanes &= ~n;
    var o = 31 - Ve(n);
    t.entangledLanes |= n, t.entanglements[o] = t.entanglements[o] | 1073741824 | i & 261930;
  }
  function Ph(t, n) {
    var i = t.entangledLanes |= n;
    for (t = t.entanglements; i; ) {
      var o = 31 - Ve(i), u = 1 << o;
      u & n | t[o] & n && (t[o] |= n), i &= ~u;
    }
  }
  function Kh(t, n) {
    var i = n & -n;
    return i = (i & 42) !== 0 ? 1 : Kr(i), (i & (t.suspendedLanes | n)) !== 0 ? 0 : i;
  }
  function Kr(t) {
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
  function Zr(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Zh() {
    var t = Y.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : O0(t.type));
  }
  function Qh(t, n) {
    var i = Y.p;
    try {
      return Y.p = t, n();
    } finally {
      Y.p = i;
    }
  }
  var Zn = Math.random().toString(36).slice(2), ye = "__reactFiber$" + Zn, Me = "__reactProps$" + Zn, ti = "__reactContainer$" + Zn, Qr = "__reactEvents$" + Zn, Tx = "__reactListeners$" + Zn, Cx = "__reactHandles$" + Zn, Fh = "__reactResources$" + Zn, ul = "__reactMarker$" + Zn;
  function Fr(t) {
    delete t[ye], delete t[Me], delete t[Qr], delete t[Tx], delete t[Cx];
  }
  function ei(t) {
    var n = t[ye];
    if (n) return n;
    for (var i = t.parentNode; i; ) {
      if (n = i[ti] || i[ye]) {
        if (i = n.alternate, n.child !== null || i !== null && i.child !== null)
          for (t = g0(t); t !== null; ) {
            if (i = t[ye]) return i;
            t = g0(t);
          }
        return n;
      }
      t = i, i = t.parentNode;
    }
    return null;
  }
  function ni(t) {
    if (t = t[ye] || t[ti]) {
      var n = t.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return t;
    }
    return null;
  }
  function cl(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t.stateNode;
    throw Error(s(33));
  }
  function ai(t) {
    var n = t[Fh];
    return n || (n = t[Fh] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function me(t) {
    t[ul] = !0;
  }
  var Jh = /* @__PURE__ */ new Set(), Wh = {};
  function Ea(t, n) {
    ii(t, n), ii(t + "Capture", n);
  }
  function ii(t, n) {
    for (Wh[t] = n, t = 0; t < n.length; t++)
      Jh.add(n[t]);
  }
  var Ex = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Ih = {}, tm = {};
  function Ax(t) {
    return Gr.call(tm, t) ? !0 : Gr.call(Ih, t) ? !1 : Ex.test(t) ? tm[t] = !0 : (Ih[t] = !0, !1);
  }
  function _s(t, n, i) {
    if (Ax(n))
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
  function Rs(t, n, i) {
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
  function jn(t, n, i, o) {
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
  function Ke(t) {
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
  function em(t) {
    var n = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function jx(t, n, i) {
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
  function Jr(t) {
    if (!t._valueTracker) {
      var n = em(t) ? "checked" : "value";
      t._valueTracker = jx(
        t,
        n,
        "" + t[n]
      );
    }
  }
  function nm(t) {
    if (!t) return !1;
    var n = t._valueTracker;
    if (!n) return !0;
    var i = n.getValue(), o = "";
    return t && (o = em(t) ? t.checked ? "true" : "false" : t.value), t = o, t !== i ? (n.setValue(t), !0) : !1;
  }
  function Ds(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Mx = /[\n"\\]/g;
  function Ze(t) {
    return t.replace(
      Mx,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Wr(t, n, i, o, u, d, x, C) {
    t.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? t.type = x : t.removeAttribute("type"), n != null ? x === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + Ke(n)) : t.value !== "" + Ke(n) && (t.value = "" + Ke(n)) : x !== "submit" && x !== "reset" || t.removeAttribute("value"), n != null ? Ir(t, x, Ke(n)) : i != null ? Ir(t, x, Ke(i)) : o != null && t.removeAttribute("value"), u == null && d != null && (t.defaultChecked = !!d), u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"), C != null && typeof C != "function" && typeof C != "symbol" && typeof C != "boolean" ? t.name = "" + Ke(C) : t.removeAttribute("name");
  }
  function am(t, n, i, o, u, d, x, C) {
    if (d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (t.type = d), n != null || i != null) {
      if (!(d !== "submit" && d !== "reset" || n != null)) {
        Jr(t);
        return;
      }
      i = i != null ? "" + Ke(i) : "", n = n != null ? "" + Ke(n) : i, C || n === t.value || (t.value = n), t.defaultValue = n;
    }
    o = o ?? u, o = typeof o != "function" && typeof o != "symbol" && !!o, t.checked = C ? t.checked : !!o, t.defaultChecked = !!o, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (t.name = x), Jr(t);
  }
  function Ir(t, n, i) {
    n === "number" && Ds(t.ownerDocument) === t || t.defaultValue === "" + i || (t.defaultValue = "" + i);
  }
  function li(t, n, i, o) {
    if (t = t.options, n) {
      n = {};
      for (var u = 0; u < i.length; u++)
        n["$" + i[u]] = !0;
      for (i = 0; i < t.length; i++)
        u = n.hasOwnProperty("$" + t[i].value), t[i].selected !== u && (t[i].selected = u), u && o && (t[i].defaultSelected = !0);
    } else {
      for (i = "" + Ke(i), n = null, u = 0; u < t.length; u++) {
        if (t[u].value === i) {
          t[u].selected = !0, o && (t[u].defaultSelected = !0);
          return;
        }
        n !== null || t[u].disabled || (n = t[u]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function im(t, n, i) {
    if (n != null && (n = "" + Ke(n), n !== t.value && (t.value = n), i == null)) {
      t.defaultValue !== n && (t.defaultValue = n);
      return;
    }
    t.defaultValue = i != null ? "" + Ke(i) : "";
  }
  function lm(t, n, i, o) {
    if (n == null) {
      if (o != null) {
        if (i != null) throw Error(s(92));
        if (nt(o)) {
          if (1 < o.length) throw Error(s(93));
          o = o[0];
        }
        i = o;
      }
      i == null && (i = ""), n = i;
    }
    i = Ke(n), t.defaultValue = i, o = t.textContent, o === i && o !== "" && o !== null && (t.value = o), Jr(t);
  }
  function si(t, n) {
    if (n) {
      var i = t.firstChild;
      if (i && i === t.lastChild && i.nodeType === 3) {
        i.nodeValue = n;
        return;
      }
    }
    t.textContent = n;
  }
  var _x = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function sm(t, n, i) {
    var o = n.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? o ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "" : o ? t.setProperty(n, i) : typeof i != "number" || i === 0 || _x.has(n) ? n === "float" ? t.cssFloat = i : t[n] = ("" + i).trim() : t[n] = i + "px";
  }
  function om(t, n, i) {
    if (n != null && typeof n != "object")
      throw Error(s(62));
    if (t = t.style, i != null) {
      for (var o in i)
        !i.hasOwnProperty(o) || n != null && n.hasOwnProperty(o) || (o.indexOf("--") === 0 ? t.setProperty(o, "") : o === "float" ? t.cssFloat = "" : t[o] = "");
      for (var u in n)
        o = n[u], n.hasOwnProperty(u) && i[u] !== o && sm(t, u, o);
    } else
      for (var d in n)
        n.hasOwnProperty(d) && sm(t, d, n[d]);
  }
  function tu(t) {
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
  var Rx = /* @__PURE__ */ new Map([
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
  ]), Dx = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ns(t) {
    return Dx.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Mn() {
  }
  var eu = null;
  function nu(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var oi = null, ri = null;
  function rm(t) {
    var n = ni(t);
    if (n && (t = n.stateNode)) {
      var i = t[Me] || null;
      t: switch (t = n.stateNode, n.type) {
        case "input":
          if (Wr(
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
              'input[name="' + Ze(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < i.length; n++) {
              var o = i[n];
              if (o !== t && o.form === t.form) {
                var u = o[Me] || null;
                if (!u) throw Error(s(90));
                Wr(
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
              o = i[n], o.form === t.form && nm(o);
          }
          break t;
        case "textarea":
          im(t, i.value, i.defaultValue);
          break t;
        case "select":
          n = i.value, n != null && li(t, !!i.multiple, n, !1);
      }
    }
  }
  var au = !1;
  function um(t, n, i) {
    if (au) return t(n, i);
    au = !0;
    try {
      var o = t(n);
      return o;
    } finally {
      if (au = !1, (oi !== null || ri !== null) && (xo(), oi && (n = oi, t = ri, ri = oi = null, rm(n), t)))
        for (n = 0; n < t.length; n++) rm(t[n]);
    }
  }
  function fl(t, n) {
    var i = t.stateNode;
    if (i === null) return null;
    var o = i[Me] || null;
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
  var _n = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), iu = !1;
  if (_n)
    try {
      var dl = {};
      Object.defineProperty(dl, "passive", {
        get: function() {
          iu = !0;
        }
      }), window.addEventListener("test", dl, dl), window.removeEventListener("test", dl, dl);
    } catch {
      iu = !1;
    }
  var Qn = null, lu = null, Os = null;
  function cm() {
    if (Os) return Os;
    var t, n = lu, i = n.length, o, u = "value" in Qn ? Qn.value : Qn.textContent, d = u.length;
    for (t = 0; t < i && n[t] === u[t]; t++) ;
    var x = i - t;
    for (o = 1; o <= x && n[i - o] === u[d - o]; o++) ;
    return Os = u.slice(t, 1 < o ? 1 - o : void 0);
  }
  function zs(t) {
    var n = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Ls() {
    return !0;
  }
  function fm() {
    return !1;
  }
  function _e(t) {
    function n(i, o, u, d, x) {
      this._reactName = i, this._targetInst = u, this.type = o, this.nativeEvent = d, this.target = x, this.currentTarget = null;
      for (var C in t)
        t.hasOwnProperty(C) && (i = t[C], this[C] = i ? i(d) : d[C]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? Ls : fm, this.isPropagationStopped = fm, this;
    }
    return v(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = Ls);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = Ls);
      },
      persist: function() {
      },
      isPersistent: Ls
    }), n;
  }
  var Aa = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Bs = _e(Aa), hl = v({}, Aa, { view: 0, detail: 0 }), Nx = _e(hl), su, ou, ml, Vs = v({}, hl, {
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
    getModifierState: uu,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== ml && (ml && t.type === "mousemove" ? (su = t.screenX - ml.screenX, ou = t.screenY - ml.screenY) : ou = su = 0, ml = t), su);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : ou;
    }
  }), dm = _e(Vs), Ox = v({}, Vs, { dataTransfer: 0 }), zx = _e(Ox), Lx = v({}, hl, { relatedTarget: 0 }), ru = _e(Lx), Bx = v({}, Aa, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Vx = _e(Bx), Ux = v({}, Aa, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), kx = _e(Ux), Hx = v({}, Aa, { data: 0 }), hm = _e(Hx), qx = {
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
  }, $x = {
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
  }, Gx = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Yx(t) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(t) : (t = Gx[t]) ? !!n[t] : !1;
  }
  function uu() {
    return Yx;
  }
  var Xx = v({}, hl, {
    key: function(t) {
      if (t.key) {
        var n = qx[t.key] || t.key;
        if (n !== "Unidentified") return n;
      }
      return t.type === "keypress" ? (t = zs(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? $x[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: uu,
    charCode: function(t) {
      return t.type === "keypress" ? zs(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? zs(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Px = _e(Xx), Kx = v({}, Vs, {
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
  }), mm = _e(Kx), Zx = v({}, hl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: uu
  }), Qx = _e(Zx), Fx = v({}, Aa, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Jx = _e(Fx), Wx = v({}, Vs, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Ix = _e(Wx), tS = v({}, Aa, {
    newState: 0,
    oldState: 0
  }), eS = _e(tS), nS = [9, 13, 27, 32], cu = _n && "CompositionEvent" in window, pl = null;
  _n && "documentMode" in document && (pl = document.documentMode);
  var aS = _n && "TextEvent" in window && !pl, pm = _n && (!cu || pl && 8 < pl && 11 >= pl), ym = " ", gm = !1;
  function vm(t, n) {
    switch (t) {
      case "keyup":
        return nS.indexOf(n.keyCode) !== -1;
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
  function bm(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var ui = !1;
  function iS(t, n) {
    switch (t) {
      case "compositionend":
        return bm(n);
      case "keypress":
        return n.which !== 32 ? null : (gm = !0, ym);
      case "textInput":
        return t = n.data, t === ym && gm ? null : t;
      default:
        return null;
    }
  }
  function lS(t, n) {
    if (ui)
      return t === "compositionend" || !cu && vm(t, n) ? (t = cm(), Os = lu = Qn = null, ui = !1, t) : null;
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
        return pm && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var sS = {
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
  function xm(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === "input" ? !!sS[t.type] : n === "textarea";
  }
  function Sm(t, n, i, o) {
    oi ? ri ? ri.push(o) : ri = [o] : oi = o, n = jo(n, "onChange"), 0 < n.length && (i = new Bs(
      "onChange",
      "change",
      null,
      i,
      o
    ), t.push({ event: i, listeners: n }));
  }
  var yl = null, gl = null;
  function oS(t) {
    a0(t, 0);
  }
  function Us(t) {
    var n = cl(t);
    if (nm(n)) return t;
  }
  function wm(t, n) {
    if (t === "change") return n;
  }
  var Tm = !1;
  if (_n) {
    var fu;
    if (_n) {
      var du = "oninput" in document;
      if (!du) {
        var Cm = document.createElement("div");
        Cm.setAttribute("oninput", "return;"), du = typeof Cm.oninput == "function";
      }
      fu = du;
    } else fu = !1;
    Tm = fu && (!document.documentMode || 9 < document.documentMode);
  }
  function Em() {
    yl && (yl.detachEvent("onpropertychange", Am), gl = yl = null);
  }
  function Am(t) {
    if (t.propertyName === "value" && Us(gl)) {
      var n = [];
      Sm(
        n,
        gl,
        t,
        nu(t)
      ), um(oS, n);
    }
  }
  function rS(t, n, i) {
    t === "focusin" ? (Em(), yl = n, gl = i, yl.attachEvent("onpropertychange", Am)) : t === "focusout" && Em();
  }
  function uS(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Us(gl);
  }
  function cS(t, n) {
    if (t === "click") return Us(n);
  }
  function fS(t, n) {
    if (t === "input" || t === "change")
      return Us(n);
  }
  function dS(t, n) {
    return t === n && (t !== 0 || 1 / t === 1 / n) || t !== t && n !== n;
  }
  var Ue = typeof Object.is == "function" ? Object.is : dS;
  function vl(t, n) {
    if (Ue(t, n)) return !0;
    if (typeof t != "object" || t === null || typeof n != "object" || n === null)
      return !1;
    var i = Object.keys(t), o = Object.keys(n);
    if (i.length !== o.length) return !1;
    for (o = 0; o < i.length; o++) {
      var u = i[o];
      if (!Gr.call(n, u) || !Ue(t[u], n[u]))
        return !1;
    }
    return !0;
  }
  function jm(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Mm(t, n) {
    var i = jm(t);
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
      i = jm(i);
    }
  }
  function _m(t, n) {
    return t && n ? t === n ? !0 : t && t.nodeType === 3 ? !1 : n && n.nodeType === 3 ? _m(t, n.parentNode) : "contains" in t ? t.contains(n) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Rm(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var n = Ds(t.document); n instanceof t.HTMLIFrameElement; ) {
      try {
        var i = typeof n.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) t = n.contentWindow;
      else break;
      n = Ds(t.document);
    }
    return n;
  }
  function hu(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n && (n === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || n === "textarea" || t.contentEditable === "true");
  }
  var hS = _n && "documentMode" in document && 11 >= document.documentMode, ci = null, mu = null, bl = null, pu = !1;
  function Dm(t, n, i) {
    var o = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    pu || ci == null || ci !== Ds(o) || (o = ci, "selectionStart" in o && hu(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), bl && vl(bl, o) || (bl = o, o = jo(mu, "onSelect"), 0 < o.length && (n = new Bs(
      "onSelect",
      "select",
      null,
      n,
      i
    ), t.push({ event: n, listeners: o }), n.target = ci)));
  }
  function ja(t, n) {
    var i = {};
    return i[t.toLowerCase()] = n.toLowerCase(), i["Webkit" + t] = "webkit" + n, i["Moz" + t] = "moz" + n, i;
  }
  var fi = {
    animationend: ja("Animation", "AnimationEnd"),
    animationiteration: ja("Animation", "AnimationIteration"),
    animationstart: ja("Animation", "AnimationStart"),
    transitionrun: ja("Transition", "TransitionRun"),
    transitionstart: ja("Transition", "TransitionStart"),
    transitioncancel: ja("Transition", "TransitionCancel"),
    transitionend: ja("Transition", "TransitionEnd")
  }, yu = {}, Nm = {};
  _n && (Nm = document.createElement("div").style, "AnimationEvent" in window || (delete fi.animationend.animation, delete fi.animationiteration.animation, delete fi.animationstart.animation), "TransitionEvent" in window || delete fi.transitionend.transition);
  function Ma(t) {
    if (yu[t]) return yu[t];
    if (!fi[t]) return t;
    var n = fi[t], i;
    for (i in n)
      if (n.hasOwnProperty(i) && i in Nm)
        return yu[t] = n[i];
    return t;
  }
  var Om = Ma("animationend"), zm = Ma("animationiteration"), Lm = Ma("animationstart"), mS = Ma("transitionrun"), pS = Ma("transitionstart"), yS = Ma("transitioncancel"), Bm = Ma("transitionend"), Vm = /* @__PURE__ */ new Map(), gu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  gu.push("scrollEnd");
  function sn(t, n) {
    Vm.set(t, n), Ea(n, [t]);
  }
  var ks = typeof reportError == "function" ? reportError : function(t) {
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
  }, Qe = [], di = 0, vu = 0;
  function Hs() {
    for (var t = di, n = vu = di = 0; n < t; ) {
      var i = Qe[n];
      Qe[n++] = null;
      var o = Qe[n];
      Qe[n++] = null;
      var u = Qe[n];
      Qe[n++] = null;
      var d = Qe[n];
      if (Qe[n++] = null, o !== null && u !== null) {
        var x = o.pending;
        x === null ? u.next = u : (u.next = x.next, x.next = u), o.pending = u;
      }
      d !== 0 && Um(i, u, d);
    }
  }
  function qs(t, n, i, o) {
    Qe[di++] = t, Qe[di++] = n, Qe[di++] = i, Qe[di++] = o, vu |= o, t.lanes |= o, t = t.alternate, t !== null && (t.lanes |= o);
  }
  function bu(t, n, i, o) {
    return qs(t, n, i, o), $s(t);
  }
  function _a(t, n) {
    return qs(t, null, null, n), $s(t);
  }
  function Um(t, n, i) {
    t.lanes |= i;
    var o = t.alternate;
    o !== null && (o.lanes |= i);
    for (var u = !1, d = t.return; d !== null; )
      d.childLanes |= i, o = d.alternate, o !== null && (o.childLanes |= i), d.tag === 22 && (t = d.stateNode, t === null || t._visibility & 1 || (u = !0)), t = d, d = d.return;
    return t.tag === 3 ? (d = t.stateNode, u && n !== null && (u = 31 - Ve(i), t = d.hiddenUpdates, o = t[u], o === null ? t[u] = [n] : o.push(n), n.lane = i | 536870912), d) : null;
  }
  function $s(t) {
    if (50 < ql)
      throw ql = 0, Mc = null, Error(s(185));
    for (var n = t.return; n !== null; )
      t = n, n = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var hi = {};
  function gS(t, n, i, o) {
    this.tag = t, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ke(t, n, i, o) {
    return new gS(t, n, i, o);
  }
  function xu(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Rn(t, n) {
    var i = t.alternate;
    return i === null ? (i = ke(
      t.tag,
      n,
      t.key,
      t.mode
    ), i.elementType = t.elementType, i.type = t.type, i.stateNode = t.stateNode, i.alternate = t, t.alternate = i) : (i.pendingProps = n, i.type = t.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = t.flags & 65011712, i.childLanes = t.childLanes, i.lanes = t.lanes, i.child = t.child, i.memoizedProps = t.memoizedProps, i.memoizedState = t.memoizedState, i.updateQueue = t.updateQueue, n = t.dependencies, i.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, i.sibling = t.sibling, i.index = t.index, i.ref = t.ref, i.refCleanup = t.refCleanup, i;
  }
  function km(t, n) {
    t.flags &= 65011714;
    var i = t.alternate;
    return i === null ? (t.childLanes = 0, t.lanes = n, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = i.childLanes, t.lanes = i.lanes, t.child = i.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = i.memoizedProps, t.memoizedState = i.memoizedState, t.updateQueue = i.updateQueue, t.type = i.type, n = i.dependencies, t.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), t;
  }
  function Gs(t, n, i, o, u, d) {
    var x = 0;
    if (o = t, typeof t == "function") xu(t) && (x = 1);
    else if (typeof t == "string")
      x = w3(
        t,
        i,
        ot.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case P:
          return t = ke(31, i, n, u), t.elementType = P, t.lanes = d, t;
        case w:
          return Ra(i.children, u, d, n);
        case A:
          x = 8, u |= 24;
          break;
        case _:
          return t = ke(12, i, n, u | 2), t.elementType = _, t.lanes = d, t;
        case B:
          return t = ke(13, i, n, u), t.elementType = B, t.lanes = d, t;
        case V:
          return t = ke(19, i, n, u), t.elementType = V, t.lanes = d, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case j:
                x = 10;
                break t;
              case M:
                x = 9;
                break t;
              case D:
                x = 11;
                break t;
              case R:
                x = 14;
                break t;
              case k:
                x = 16, o = null;
                break t;
            }
          x = 29, i = Error(
            s(130, t === null ? "null" : typeof t, "")
          ), o = null;
      }
    return n = ke(x, i, n, u), n.elementType = t, n.type = o, n.lanes = d, n;
  }
  function Ra(t, n, i, o) {
    return t = ke(7, t, o, n), t.lanes = i, t;
  }
  function Su(t, n, i) {
    return t = ke(6, t, null, n), t.lanes = i, t;
  }
  function Hm(t) {
    var n = ke(18, null, null, 0);
    return n.stateNode = t, n;
  }
  function wu(t, n, i) {
    return n = ke(
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
  var qm = /* @__PURE__ */ new WeakMap();
  function Fe(t, n) {
    if (typeof t == "object" && t !== null) {
      var i = qm.get(t);
      return i !== void 0 ? i : (n = {
        value: t,
        source: n,
        stack: Hh(n)
      }, qm.set(t, n), n);
    }
    return {
      value: t,
      source: n,
      stack: Hh(n)
    };
  }
  var mi = [], pi = 0, Ys = null, xl = 0, Je = [], We = 0, Fn = null, vn = 1, bn = "";
  function Dn(t, n) {
    mi[pi++] = xl, mi[pi++] = Ys, Ys = t, xl = n;
  }
  function $m(t, n, i) {
    Je[We++] = vn, Je[We++] = bn, Je[We++] = Fn, Fn = t;
    var o = vn;
    t = bn;
    var u = 32 - Ve(o) - 1;
    o &= ~(1 << u), i += 1;
    var d = 32 - Ve(n) + u;
    if (30 < d) {
      var x = u - u % 5;
      d = (o & (1 << x) - 1).toString(32), o >>= x, u -= x, vn = 1 << 32 - Ve(n) + u | i << u | o, bn = d + t;
    } else
      vn = 1 << d | i << u | o, bn = t;
  }
  function Tu(t) {
    t.return !== null && (Dn(t, 1), $m(t, 1, 0));
  }
  function Cu(t) {
    for (; t === Ys; )
      Ys = mi[--pi], mi[pi] = null, xl = mi[--pi], mi[pi] = null;
    for (; t === Fn; )
      Fn = Je[--We], Je[We] = null, bn = Je[--We], Je[We] = null, vn = Je[--We], Je[We] = null;
  }
  function Gm(t, n) {
    Je[We++] = vn, Je[We++] = bn, Je[We++] = Fn, vn = n.id, bn = n.overflow, Fn = t;
  }
  var ge = null, Yt = null, jt = !1, Jn = null, Ie = !1, Eu = Error(s(519));
  function Wn(t) {
    var n = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Sl(Fe(n, t)), Eu;
  }
  function Ym(t) {
    var n = t.stateNode, i = t.type, o = t.memoizedProps;
    switch (n[ye] = t, n[Me] = o, i) {
      case "dialog":
        Ct("cancel", n), Ct("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ct("load", n);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Gl.length; i++)
          Ct(Gl[i], n);
        break;
      case "source":
        Ct("error", n);
        break;
      case "img":
      case "image":
      case "link":
        Ct("error", n), Ct("load", n);
        break;
      case "details":
        Ct("toggle", n);
        break;
      case "input":
        Ct("invalid", n), am(
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
        Ct("invalid", n);
        break;
      case "textarea":
        Ct("invalid", n), lm(n, o.value, o.defaultValue, o.children);
    }
    i = o.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || n.textContent === "" + i || o.suppressHydrationWarning === !0 || o0(n.textContent, i) ? (o.popover != null && (Ct("beforetoggle", n), Ct("toggle", n)), o.onScroll != null && Ct("scroll", n), o.onScrollEnd != null && Ct("scrollend", n), o.onClick != null && (n.onclick = Mn), n = !0) : n = !1, n || Wn(t, !0);
  }
  function Xm(t) {
    for (ge = t.return; ge; )
      switch (ge.tag) {
        case 5:
        case 31:
        case 13:
          Ie = !1;
          return;
        case 27:
        case 3:
          Ie = !0;
          return;
        default:
          ge = ge.return;
      }
  }
  function yi(t) {
    if (t !== ge) return !1;
    if (!jt) return Xm(t), jt = !0, !1;
    var n = t.tag, i;
    if ((i = n !== 3 && n !== 27) && ((i = n === 5) && (i = t.type, i = !(i !== "form" && i !== "button") || Gc(t.type, t.memoizedProps)), i = !i), i && Yt && Wn(t), Xm(t), n === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Yt = y0(t);
    } else if (n === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Yt = y0(t);
    } else
      n === 27 ? (n = Yt, da(t.type) ? (t = Zc, Zc = null, Yt = t) : Yt = n) : Yt = ge ? en(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Da() {
    Yt = ge = null, jt = !1;
  }
  function Au() {
    var t = Jn;
    return t !== null && (Oe === null ? Oe = t : Oe.push.apply(
      Oe,
      t
    ), Jn = null), t;
  }
  function Sl(t) {
    Jn === null ? Jn = [t] : Jn.push(t);
  }
  var ju = N(null), Na = null, Nn = null;
  function In(t, n, i) {
    tt(ju, n._currentValue), n._currentValue = i;
  }
  function On(t) {
    t._currentValue = ju.current, G(ju);
  }
  function Mu(t, n, i) {
    for (; t !== null; ) {
      var o = t.alternate;
      if ((t.childLanes & n) !== n ? (t.childLanes |= n, o !== null && (o.childLanes |= n)) : o !== null && (o.childLanes & n) !== n && (o.childLanes |= n), t === i) break;
      t = t.return;
    }
  }
  function _u(t, n, i, o) {
    var u = t.child;
    for (u !== null && (u.return = t); u !== null; ) {
      var d = u.dependencies;
      if (d !== null) {
        var x = u.child;
        d = d.firstContext;
        t: for (; d !== null; ) {
          var C = d;
          d = u;
          for (var z = 0; z < n.length; z++)
            if (C.context === n[z]) {
              d.lanes |= i, C = d.alternate, C !== null && (C.lanes |= i), Mu(
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
        x.lanes |= i, d = x.alternate, d !== null && (d.lanes |= i), Mu(x, i, t), x = null;
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
  function gi(t, n, i, o) {
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
          Ue(u.pendingProps.value, x.value) || (t !== null ? t.push(C) : t = [C]);
        }
      } else if (u === vt.current) {
        if (x = u.alternate, x === null) throw Error(s(387));
        x.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(Zl) : t = [Zl]);
      }
      u = u.return;
    }
    t !== null && _u(
      n,
      t,
      i,
      o
    ), n.flags |= 262144;
  }
  function Xs(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Ue(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Oa(t) {
    Na = t, Nn = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function ve(t) {
    return Pm(Na, t);
  }
  function Ps(t, n) {
    return Na === null && Oa(t), Pm(t, n);
  }
  function Pm(t, n) {
    var i = n._currentValue;
    if (n = { context: n, memoizedValue: i, next: null }, Nn === null) {
      if (t === null) throw Error(s(308));
      Nn = n, t.dependencies = { lanes: 0, firstContext: n }, t.flags |= 524288;
    } else Nn = Nn.next = n;
    return i;
  }
  var vS = typeof AbortController < "u" ? AbortController : function() {
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
  }, bS = a.unstable_scheduleCallback, xS = a.unstable_NormalPriority, ie = {
    $$typeof: j,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ru() {
    return {
      controller: new vS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function wl(t) {
    t.refCount--, t.refCount === 0 && bS(xS, function() {
      t.controller.abort();
    });
  }
  var Tl = null, Du = 0, vi = 0, bi = null;
  function SS(t, n) {
    if (Tl === null) {
      var i = Tl = [];
      Du = 0, vi = zc(), bi = {
        status: "pending",
        value: void 0,
        then: function(o) {
          i.push(o);
        }
      };
    }
    return Du++, n.then(Km, Km), n;
  }
  function Km() {
    if (--Du === 0 && Tl !== null) {
      bi !== null && (bi.status = "fulfilled");
      var t = Tl;
      Tl = null, vi = 0, bi = null;
      for (var n = 0; n < t.length; n++) (0, t[n])();
    }
  }
  function wS(t, n) {
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
  var Zm = O.S;
  O.S = function(t, n) {
    D1 = Le(), typeof n == "object" && n !== null && typeof n.then == "function" && SS(t, n), Zm !== null && Zm(t, n);
  };
  var za = N(null);
  function Nu() {
    var t = za.current;
    return t !== null ? t : qt.pooledCache;
  }
  function Ks(t, n) {
    n === null ? tt(za, za.current) : tt(za, n.pool);
  }
  function Qm() {
    var t = Nu();
    return t === null ? null : { parent: ie._currentValue, pool: t };
  }
  var xi = Error(s(460)), Ou = Error(s(474)), Zs = Error(s(542)), Qs = { then: function() {
  } };
  function Fm(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Jm(t, n, i) {
    switch (i = t[i], i === void 0 ? t.push(n) : i !== n && (n.then(Mn, Mn), n = i), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw t = n.reason, Im(t), t;
      default:
        if (typeof n.status == "string") n.then(Mn, Mn);
        else {
          if (t = qt, t !== null && 100 < t.shellSuspendCounter)
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
            throw t = n.reason, Im(t), t;
        }
        throw Ba = n, xi;
    }
  }
  function La(t) {
    try {
      var n = t._init;
      return n(t._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (Ba = i, xi) : i;
    }
  }
  var Ba = null;
  function Wm() {
    if (Ba === null) throw Error(s(459));
    var t = Ba;
    return Ba = null, t;
  }
  function Im(t) {
    if (t === xi || t === Zs)
      throw Error(s(483));
  }
  var Si = null, Cl = 0;
  function Fs(t) {
    var n = Cl;
    return Cl += 1, Si === null && (Si = []), Jm(Si, t, n);
  }
  function El(t, n) {
    n = n.props.ref, t.ref = n !== void 0 ? n : null;
  }
  function Js(t, n) {
    throw n.$$typeof === b ? Error(s(525)) : (t = Object.prototype.toString.call(n), Error(
      s(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : t
      )
    ));
  }
  function tp(t) {
    function n(U, L) {
      if (t) {
        var H = U.deletions;
        H === null ? (U.deletions = [L], U.flags |= 16) : H.push(L);
      }
    }
    function i(U, L) {
      if (!t) return null;
      for (; L !== null; )
        n(U, L), L = L.sibling;
      return null;
    }
    function o(U) {
      for (var L = /* @__PURE__ */ new Map(); U !== null; )
        U.key !== null ? L.set(U.key, U) : L.set(U.index, U), U = U.sibling;
      return L;
    }
    function u(U, L) {
      return U = Rn(U, L), U.index = 0, U.sibling = null, U;
    }
    function d(U, L, H) {
      return U.index = H, t ? (H = U.alternate, H !== null ? (H = H.index, H < L ? (U.flags |= 67108866, L) : H) : (U.flags |= 67108866, L)) : (U.flags |= 1048576, L);
    }
    function x(U) {
      return t && U.alternate === null && (U.flags |= 67108866), U;
    }
    function C(U, L, H, F) {
      return L === null || L.tag !== 6 ? (L = Su(H, U.mode, F), L.return = U, L) : (L = u(L, H), L.return = U, L);
    }
    function z(U, L, H, F) {
      var mt = H.type;
      return mt === w ? Z(
        U,
        L,
        H.props.children,
        F,
        H.key
      ) : L !== null && (L.elementType === mt || typeof mt == "object" && mt !== null && mt.$$typeof === k && La(mt) === L.type) ? (L = u(L, H.props), El(L, H), L.return = U, L) : (L = Gs(
        H.type,
        H.key,
        H.props,
        null,
        U.mode,
        F
      ), El(L, H), L.return = U, L);
    }
    function q(U, L, H, F) {
      return L === null || L.tag !== 4 || L.stateNode.containerInfo !== H.containerInfo || L.stateNode.implementation !== H.implementation ? (L = wu(H, U.mode, F), L.return = U, L) : (L = u(L, H.children || []), L.return = U, L);
    }
    function Z(U, L, H, F, mt) {
      return L === null || L.tag !== 7 ? (L = Ra(
        H,
        U.mode,
        F,
        mt
      ), L.return = U, L) : (L = u(L, H), L.return = U, L);
    }
    function W(U, L, H) {
      if (typeof L == "string" && L !== "" || typeof L == "number" || typeof L == "bigint")
        return L = Su(
          "" + L,
          U.mode,
          H
        ), L.return = U, L;
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case T:
            return H = Gs(
              L.type,
              L.key,
              L.props,
              null,
              U.mode,
              H
            ), El(H, L), H.return = U, H;
          case S:
            return L = wu(
              L,
              U.mode,
              H
            ), L.return = U, L;
          case k:
            return L = La(L), W(U, L, H);
        }
        if (nt(L) || et(L))
          return L = Ra(
            L,
            U.mode,
            H,
            null
          ), L.return = U, L;
        if (typeof L.then == "function")
          return W(U, Fs(L), H);
        if (L.$$typeof === j)
          return W(
            U,
            Ps(U, L),
            H
          );
        Js(U, L);
      }
      return null;
    }
    function $(U, L, H, F) {
      var mt = L !== null ? L.key : null;
      if (typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint")
        return mt !== null ? null : C(U, L, "" + H, F);
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case T:
            return H.key === mt ? z(U, L, H, F) : null;
          case S:
            return H.key === mt ? q(U, L, H, F) : null;
          case k:
            return H = La(H), $(U, L, H, F);
        }
        if (nt(H) || et(H))
          return mt !== null ? null : Z(U, L, H, F, null);
        if (typeof H.then == "function")
          return $(
            U,
            L,
            Fs(H),
            F
          );
        if (H.$$typeof === j)
          return $(
            U,
            L,
            Ps(U, H),
            F
          );
        Js(U, H);
      }
      return null;
    }
    function X(U, L, H, F, mt) {
      if (typeof F == "string" && F !== "" || typeof F == "number" || typeof F == "bigint")
        return U = U.get(H) || null, C(L, U, "" + F, mt);
      if (typeof F == "object" && F !== null) {
        switch (F.$$typeof) {
          case T:
            return U = U.get(
              F.key === null ? H : F.key
            ) || null, z(L, U, F, mt);
          case S:
            return U = U.get(
              F.key === null ? H : F.key
            ) || null, q(L, U, F, mt);
          case k:
            return F = La(F), X(
              U,
              L,
              H,
              F,
              mt
            );
        }
        if (nt(F) || et(F))
          return U = U.get(H) || null, Z(L, U, F, mt, null);
        if (typeof F.then == "function")
          return X(
            U,
            L,
            H,
            Fs(F),
            mt
          );
        if (F.$$typeof === j)
          return X(
            U,
            L,
            H,
            Ps(L, F),
            mt
          );
        Js(L, F);
      }
      return null;
    }
    function ut(U, L, H, F) {
      for (var mt = null, Rt = null, ft = L, St = L = 0, At = null; ft !== null && St < H.length; St++) {
        ft.index > St ? (At = ft, ft = null) : At = ft.sibling;
        var Dt = $(
          U,
          ft,
          H[St],
          F
        );
        if (Dt === null) {
          ft === null && (ft = At);
          break;
        }
        t && ft && Dt.alternate === null && n(U, ft), L = d(Dt, L, St), Rt === null ? mt = Dt : Rt.sibling = Dt, Rt = Dt, ft = At;
      }
      if (St === H.length)
        return i(U, ft), jt && Dn(U, St), mt;
      if (ft === null) {
        for (; St < H.length; St++)
          ft = W(U, H[St], F), ft !== null && (L = d(
            ft,
            L,
            St
          ), Rt === null ? mt = ft : Rt.sibling = ft, Rt = ft);
        return jt && Dn(U, St), mt;
      }
      for (ft = o(ft); St < H.length; St++)
        At = X(
          ft,
          U,
          St,
          H[St],
          F
        ), At !== null && (t && At.alternate !== null && ft.delete(
          At.key === null ? St : At.key
        ), L = d(
          At,
          L,
          St
        ), Rt === null ? mt = At : Rt.sibling = At, Rt = At);
      return t && ft.forEach(function(ga) {
        return n(U, ga);
      }), jt && Dn(U, St), mt;
    }
    function yt(U, L, H, F) {
      if (H == null) throw Error(s(151));
      for (var mt = null, Rt = null, ft = L, St = L = 0, At = null, Dt = H.next(); ft !== null && !Dt.done; St++, Dt = H.next()) {
        ft.index > St ? (At = ft, ft = null) : At = ft.sibling;
        var ga = $(U, ft, Dt.value, F);
        if (ga === null) {
          ft === null && (ft = At);
          break;
        }
        t && ft && ga.alternate === null && n(U, ft), L = d(ga, L, St), Rt === null ? mt = ga : Rt.sibling = ga, Rt = ga, ft = At;
      }
      if (Dt.done)
        return i(U, ft), jt && Dn(U, St), mt;
      if (ft === null) {
        for (; !Dt.done; St++, Dt = H.next())
          Dt = W(U, Dt.value, F), Dt !== null && (L = d(Dt, L, St), Rt === null ? mt = Dt : Rt.sibling = Dt, Rt = Dt);
        return jt && Dn(U, St), mt;
      }
      for (ft = o(ft); !Dt.done; St++, Dt = H.next())
        Dt = X(ft, U, St, Dt.value, F), Dt !== null && (t && Dt.alternate !== null && ft.delete(Dt.key === null ? St : Dt.key), L = d(Dt, L, St), Rt === null ? mt = Dt : Rt.sibling = Dt, Rt = Dt);
      return t && ft.forEach(function(O3) {
        return n(U, O3);
      }), jt && Dn(U, St), mt;
    }
    function kt(U, L, H, F) {
      if (typeof H == "object" && H !== null && H.type === w && H.key === null && (H = H.props.children), typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case T:
            t: {
              for (var mt = H.key; L !== null; ) {
                if (L.key === mt) {
                  if (mt = H.type, mt === w) {
                    if (L.tag === 7) {
                      i(
                        U,
                        L.sibling
                      ), F = u(
                        L,
                        H.props.children
                      ), F.return = U, U = F;
                      break t;
                    }
                  } else if (L.elementType === mt || typeof mt == "object" && mt !== null && mt.$$typeof === k && La(mt) === L.type) {
                    i(
                      U,
                      L.sibling
                    ), F = u(L, H.props), El(F, H), F.return = U, U = F;
                    break t;
                  }
                  i(U, L);
                  break;
                } else n(U, L);
                L = L.sibling;
              }
              H.type === w ? (F = Ra(
                H.props.children,
                U.mode,
                F,
                H.key
              ), F.return = U, U = F) : (F = Gs(
                H.type,
                H.key,
                H.props,
                null,
                U.mode,
                F
              ), El(F, H), F.return = U, U = F);
            }
            return x(U);
          case S:
            t: {
              for (mt = H.key; L !== null; ) {
                if (L.key === mt)
                  if (L.tag === 4 && L.stateNode.containerInfo === H.containerInfo && L.stateNode.implementation === H.implementation) {
                    i(
                      U,
                      L.sibling
                    ), F = u(L, H.children || []), F.return = U, U = F;
                    break t;
                  } else {
                    i(U, L);
                    break;
                  }
                else n(U, L);
                L = L.sibling;
              }
              F = wu(H, U.mode, F), F.return = U, U = F;
            }
            return x(U);
          case k:
            return H = La(H), kt(
              U,
              L,
              H,
              F
            );
        }
        if (nt(H))
          return ut(
            U,
            L,
            H,
            F
          );
        if (et(H)) {
          if (mt = et(H), typeof mt != "function") throw Error(s(150));
          return H = mt.call(H), yt(
            U,
            L,
            H,
            F
          );
        }
        if (typeof H.then == "function")
          return kt(
            U,
            L,
            Fs(H),
            F
          );
        if (H.$$typeof === j)
          return kt(
            U,
            L,
            Ps(U, H),
            F
          );
        Js(U, H);
      }
      return typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint" ? (H = "" + H, L !== null && L.tag === 6 ? (i(U, L.sibling), F = u(L, H), F.return = U, U = F) : (i(U, L), F = Su(H, U.mode, F), F.return = U, U = F), x(U)) : i(U, L);
    }
    return function(U, L, H, F) {
      try {
        Cl = 0;
        var mt = kt(
          U,
          L,
          H,
          F
        );
        return Si = null, mt;
      } catch (ft) {
        if (ft === xi || ft === Zs) throw ft;
        var Rt = ke(29, ft, null, U.mode);
        return Rt.lanes = F, Rt.return = U, Rt;
      } finally {
      }
    };
  }
  var Va = tp(!0), ep = tp(!1), ta = !1;
  function zu(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Lu(t, n) {
    t = t.updateQueue, n.updateQueue === t && (n.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function ea(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function na(t, n, i) {
    var o = t.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (Ot & 2) !== 0) {
      var u = o.pending;
      return u === null ? n.next = n : (n.next = u.next, u.next = n), o.pending = n, n = $s(t), Um(t, null, i), n;
    }
    return qs(t, o, n, i), $s(t);
  }
  function Al(t, n, i) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (i & 4194048) !== 0)) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, Ph(t, i);
    }
  }
  function Bu(t, n) {
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
  var Vu = !1;
  function jl() {
    if (Vu) {
      var t = bi;
      if (t !== null) throw t;
    }
  }
  function Ml(t, n, i, o) {
    Vu = !1;
    var u = t.updateQueue;
    ta = !1;
    var d = u.firstBaseUpdate, x = u.lastBaseUpdate, C = u.shared.pending;
    if (C !== null) {
      u.shared.pending = null;
      var z = C, q = z.next;
      z.next = null, x === null ? d = q : x.next = q, x = z;
      var Z = t.alternate;
      Z !== null && (Z = Z.updateQueue, C = Z.lastBaseUpdate, C !== x && (C === null ? Z.firstBaseUpdate = q : C.next = q, Z.lastBaseUpdate = z));
    }
    if (d !== null) {
      var W = u.baseState;
      x = 0, Z = q = z = null, C = d;
      do {
        var $ = C.lane & -536870913, X = $ !== C.lane;
        if (X ? (Et & $) === $ : (o & $) === $) {
          $ !== 0 && $ === vi && (Vu = !0), Z !== null && (Z = Z.next = {
            lane: 0,
            tag: C.tag,
            payload: C.payload,
            callback: null,
            next: null
          });
          t: {
            var ut = t, yt = C;
            $ = n;
            var kt = i;
            switch (yt.tag) {
              case 1:
                if (ut = yt.payload, typeof ut == "function") {
                  W = ut.call(kt, W, $);
                  break t;
                }
                W = ut;
                break t;
              case 3:
                ut.flags = ut.flags & -65537 | 128;
              case 0:
                if (ut = yt.payload, $ = typeof ut == "function" ? ut.call(kt, W, $) : ut, $ == null) break t;
                W = v({}, W, $);
                break t;
              case 2:
                ta = !0;
            }
          }
          $ = C.callback, $ !== null && (t.flags |= 64, X && (t.flags |= 8192), X = u.callbacks, X === null ? u.callbacks = [$] : X.push($));
        } else
          X = {
            lane: $,
            tag: C.tag,
            payload: C.payload,
            callback: C.callback,
            next: null
          }, Z === null ? (q = Z = X, z = W) : Z = Z.next = X, x |= $;
        if (C = C.next, C === null) {
          if (C = u.shared.pending, C === null)
            break;
          X = C, C = X.next, X.next = null, u.lastBaseUpdate = X, u.shared.pending = null;
        }
      } while (!0);
      Z === null && (z = W), u.baseState = z, u.firstBaseUpdate = q, u.lastBaseUpdate = Z, d === null && (u.shared.lanes = 0), oa |= x, t.lanes = x, t.memoizedState = W;
    }
  }
  function np(t, n) {
    if (typeof t != "function")
      throw Error(s(191, t));
    t.call(n);
  }
  function ap(t, n) {
    var i = t.callbacks;
    if (i !== null)
      for (t.callbacks = null, t = 0; t < i.length; t++)
        np(i[t], n);
  }
  var wi = N(null), Ws = N(0);
  function ip(t, n) {
    t = $n, tt(Ws, t), tt(wi, n), $n = t | n.baseLanes;
  }
  function Uu() {
    tt(Ws, $n), tt(wi, wi.current);
  }
  function ku() {
    $n = Ws.current, G(wi), G(Ws);
  }
  var He = N(null), tn = null;
  function aa(t) {
    var n = t.alternate;
    tt(te, te.current & 1), tt(He, t), tn === null && (n === null || wi.current !== null || n.memoizedState !== null) && (tn = t);
  }
  function Hu(t) {
    tt(te, te.current), tt(He, t), tn === null && (tn = t);
  }
  function lp(t) {
    t.tag === 22 ? (tt(te, te.current), tt(He, t), tn === null && (tn = t)) : ia();
  }
  function ia() {
    tt(te, te.current), tt(He, He.current);
  }
  function qe(t) {
    G(He), tn === t && (tn = null), G(te);
  }
  var te = N(0);
  function Is(t) {
    for (var n = t; n !== null; ) {
      if (n.tag === 13) {
        var i = n.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || Pc(i) || Kc(i)))
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
  var zn = 0, xt = null, Vt = null, le = null, to = !1, Ti = !1, Ua = !1, eo = 0, _l = 0, Ci = null, TS = 0;
  function Jt() {
    throw Error(s(321));
  }
  function qu(t, n) {
    if (n === null) return !1;
    for (var i = 0; i < n.length && i < t.length; i++)
      if (!Ue(t[i], n[i])) return !1;
    return !0;
  }
  function $u(t, n, i, o, u, d) {
    return zn = d, xt = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, O.H = t === null || t.memoizedState === null ? $p : ac, Ua = !1, d = i(o, u), Ua = !1, Ti && (d = op(
      n,
      i,
      o,
      u
    )), sp(t), d;
  }
  function sp(t) {
    O.H = Nl;
    var n = Vt !== null && Vt.next !== null;
    if (zn = 0, le = Vt = xt = null, to = !1, _l = 0, Ci = null, n) throw Error(s(300));
    t === null || se || (t = t.dependencies, t !== null && Xs(t) && (se = !0));
  }
  function op(t, n, i, o) {
    xt = t;
    var u = 0;
    do {
      if (Ti && (Ci = null), _l = 0, Ti = !1, 25 <= u) throw Error(s(301));
      if (u += 1, le = Vt = null, t.updateQueue != null) {
        var d = t.updateQueue;
        d.lastEffect = null, d.events = null, d.stores = null, d.memoCache != null && (d.memoCache.index = 0);
      }
      O.H = Gp, d = n(i, o);
    } while (Ti);
    return d;
  }
  function CS() {
    var t = O.H, n = t.useState()[0];
    return n = typeof n.then == "function" ? Rl(n) : n, t = t.useState()[0], (Vt !== null ? Vt.memoizedState : null) !== t && (xt.flags |= 1024), n;
  }
  function Gu() {
    var t = eo !== 0;
    return eo = 0, t;
  }
  function Yu(t, n, i) {
    n.updateQueue = t.updateQueue, n.flags &= -2053, t.lanes &= ~i;
  }
  function Xu(t) {
    if (to) {
      for (t = t.memoizedState; t !== null; ) {
        var n = t.queue;
        n !== null && (n.pending = null), t = t.next;
      }
      to = !1;
    }
    zn = 0, le = Vt = xt = null, Ti = !1, _l = eo = 0, Ci = null;
  }
  function Ee() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return le === null ? xt.memoizedState = le = t : le = le.next = t, le;
  }
  function ee() {
    if (Vt === null) {
      var t = xt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Vt.next;
    var n = le === null ? xt.memoizedState : le.next;
    if (n !== null)
      le = n, Vt = t;
    else {
      if (t === null)
        throw xt.alternate === null ? Error(s(467)) : Error(s(310));
      Vt = t, t = {
        memoizedState: Vt.memoizedState,
        baseState: Vt.baseState,
        baseQueue: Vt.baseQueue,
        queue: Vt.queue,
        next: null
      }, le === null ? xt.memoizedState = le = t : le = le.next = t;
    }
    return le;
  }
  function no() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Rl(t) {
    var n = _l;
    return _l += 1, Ci === null && (Ci = []), t = Jm(Ci, t, n), n = xt, (le === null ? n.memoizedState : le.next) === null && (n = n.alternate, O.H = n === null || n.memoizedState === null ? $p : ac), t;
  }
  function ao(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Rl(t);
      if (t.$$typeof === j) return ve(t);
    }
    throw Error(s(438, String(t)));
  }
  function Pu(t) {
    var n = null, i = xt.updateQueue;
    if (i !== null && (n = i.memoCache), n == null) {
      var o = xt.alternate;
      o !== null && (o = o.updateQueue, o !== null && (o = o.memoCache, o != null && (n = {
        data: o.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), i === null && (i = no(), xt.updateQueue = i), i.memoCache = n, i = n.data[n.index], i === void 0)
      for (i = n.data[n.index] = Array(t), o = 0; o < t; o++)
        i[o] = K;
    return n.index++, i;
  }
  function Ln(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function io(t) {
    var n = ee();
    return Ku(n, Vt, t);
  }
  function Ku(t, n, i) {
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
      var C = x = null, z = null, q = n, Z = !1;
      do {
        var W = q.lane & -536870913;
        if (W !== q.lane ? (Et & W) === W : (zn & W) === W) {
          var $ = q.revertLane;
          if ($ === 0)
            z !== null && (z = z.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: q.action,
              hasEagerState: q.hasEagerState,
              eagerState: q.eagerState,
              next: null
            }), W === vi && (Z = !0);
          else if ((zn & $) === $) {
            q = q.next, $ === vi && (Z = !0);
            continue;
          } else
            W = {
              lane: 0,
              revertLane: q.revertLane,
              gesture: null,
              action: q.action,
              hasEagerState: q.hasEagerState,
              eagerState: q.eagerState,
              next: null
            }, z === null ? (C = z = W, x = d) : z = z.next = W, xt.lanes |= $, oa |= $;
          W = q.action, Ua && i(d, W), d = q.hasEagerState ? q.eagerState : i(d, W);
        } else
          $ = {
            lane: W,
            revertLane: q.revertLane,
            gesture: q.gesture,
            action: q.action,
            hasEagerState: q.hasEagerState,
            eagerState: q.eagerState,
            next: null
          }, z === null ? (C = z = $, x = d) : z = z.next = $, xt.lanes |= W, oa |= W;
        q = q.next;
      } while (q !== null && q !== n);
      if (z === null ? x = d : z.next = C, !Ue(d, t.memoizedState) && (se = !0, Z && (i = bi, i !== null)))
        throw i;
      t.memoizedState = d, t.baseState = x, t.baseQueue = z, o.lastRenderedState = d;
    }
    return u === null && (o.lanes = 0), [t.memoizedState, o.dispatch];
  }
  function Zu(t) {
    var n = ee(), i = n.queue;
    if (i === null) throw Error(s(311));
    i.lastRenderedReducer = t;
    var o = i.dispatch, u = i.pending, d = n.memoizedState;
    if (u !== null) {
      i.pending = null;
      var x = u = u.next;
      do
        d = t(d, x.action), x = x.next;
      while (x !== u);
      Ue(d, n.memoizedState) || (se = !0), n.memoizedState = d, n.baseQueue === null && (n.baseState = d), i.lastRenderedState = d;
    }
    return [d, o];
  }
  function rp(t, n, i) {
    var o = xt, u = ee(), d = jt;
    if (d) {
      if (i === void 0) throw Error(s(407));
      i = i();
    } else i = n();
    var x = !Ue(
      (Vt || u).memoizedState,
      i
    );
    if (x && (u.memoizedState = i, se = !0), u = u.queue, Ju(fp.bind(null, o, u, t), [
      t
    ]), u.getSnapshot !== n || x || le !== null && le.memoizedState.tag & 1) {
      if (o.flags |= 2048, Ei(
        9,
        { destroy: void 0 },
        cp.bind(
          null,
          o,
          u,
          i,
          n
        ),
        null
      ), qt === null) throw Error(s(349));
      d || (zn & 127) !== 0 || up(o, n, i);
    }
    return i;
  }
  function up(t, n, i) {
    t.flags |= 16384, t = { getSnapshot: n, value: i }, n = xt.updateQueue, n === null ? (n = no(), xt.updateQueue = n, n.stores = [t]) : (i = n.stores, i === null ? n.stores = [t] : i.push(t));
  }
  function cp(t, n, i, o) {
    n.value = i, n.getSnapshot = o, dp(n) && hp(t);
  }
  function fp(t, n, i) {
    return i(function() {
      dp(n) && hp(t);
    });
  }
  function dp(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var i = n();
      return !Ue(t, i);
    } catch {
      return !0;
    }
  }
  function hp(t) {
    var n = _a(t, 2);
    n !== null && ze(n, t, 2);
  }
  function Qu(t) {
    var n = Ee();
    if (typeof t == "function") {
      var i = t;
      if (t = i(), Ua) {
        Kn(!0);
        try {
          i();
        } finally {
          Kn(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = t, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ln,
      lastRenderedState: t
    }, n;
  }
  function mp(t, n, i, o) {
    return t.baseState = i, Ku(
      t,
      Vt,
      typeof o == "function" ? o : Ln
    );
  }
  function ES(t, n, i, o, u) {
    if (oo(t)) throw Error(s(485));
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
      O.T !== null ? i(!0) : d.isTransition = !1, o(d), i = n.pending, i === null ? (d.next = n.pending = d, pp(n, d)) : (d.next = i.next, n.pending = i.next = d);
    }
  }
  function pp(t, n) {
    var i = n.action, o = n.payload, u = t.state;
    if (n.isTransition) {
      var d = O.T, x = {};
      O.T = x;
      try {
        var C = i(u, o), z = O.S;
        z !== null && z(x, C), yp(t, n, C);
      } catch (q) {
        Fu(t, n, q);
      } finally {
        d !== null && x.types !== null && (d.types = x.types), O.T = d;
      }
    } else
      try {
        d = i(u, o), yp(t, n, d);
      } catch (q) {
        Fu(t, n, q);
      }
  }
  function yp(t, n, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(o) {
        gp(t, n, o);
      },
      function(o) {
        return Fu(t, n, o);
      }
    ) : gp(t, n, i);
  }
  function gp(t, n, i) {
    n.status = "fulfilled", n.value = i, vp(n), t.state = i, n = t.pending, n !== null && (i = n.next, i === n ? t.pending = null : (i = i.next, n.next = i, pp(t, i)));
  }
  function Fu(t, n, i) {
    var o = t.pending;
    if (t.pending = null, o !== null) {
      o = o.next;
      do
        n.status = "rejected", n.reason = i, vp(n), n = n.next;
      while (n !== o);
    }
    t.action = null;
  }
  function vp(t) {
    t = t.listeners;
    for (var n = 0; n < t.length; n++) (0, t[n])();
  }
  function bp(t, n) {
    return n;
  }
  function xp(t, n) {
    if (jt) {
      var i = qt.formState;
      if (i !== null) {
        t: {
          var o = xt;
          if (jt) {
            if (Yt) {
              e: {
                for (var u = Yt, d = Ie; u.nodeType !== 8; ) {
                  if (!d) {
                    u = null;
                    break e;
                  }
                  if (u = en(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break e;
                  }
                }
                d = u.data, u = d === "F!" || d === "F" ? u : null;
              }
              if (u) {
                Yt = en(
                  u.nextSibling
                ), o = u.data === "F!";
                break t;
              }
            }
            Wn(o);
          }
          o = !1;
        }
        o && (n = i[0]);
      }
    }
    return i = Ee(), i.memoizedState = i.baseState = n, o = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: bp,
      lastRenderedState: n
    }, i.queue = o, i = kp.bind(
      null,
      xt,
      o
    ), o.dispatch = i, o = Qu(!1), d = nc.bind(
      null,
      xt,
      !1,
      o.queue
    ), o = Ee(), u = {
      state: n,
      dispatch: null,
      action: t,
      pending: null
    }, o.queue = u, i = ES.bind(
      null,
      xt,
      u,
      d,
      i
    ), u.dispatch = i, o.memoizedState = t, [n, i, !1];
  }
  function Sp(t) {
    var n = ee();
    return wp(n, Vt, t);
  }
  function wp(t, n, i) {
    if (n = Ku(
      t,
      n,
      bp
    )[0], t = io(Ln)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var o = Rl(n);
      } catch (x) {
        throw x === xi ? Zs : x;
      }
    else o = n;
    n = ee();
    var u = n.queue, d = u.dispatch;
    return i !== n.memoizedState && (xt.flags |= 2048, Ei(
      9,
      { destroy: void 0 },
      AS.bind(null, u, i),
      null
    )), [o, d, t];
  }
  function AS(t, n) {
    t.action = n;
  }
  function Tp(t) {
    var n = ee(), i = Vt;
    if (i !== null)
      return wp(n, i, t);
    ee(), n = n.memoizedState, i = ee();
    var o = i.queue.dispatch;
    return i.memoizedState = t, [n, o, !1];
  }
  function Ei(t, n, i, o) {
    return t = { tag: t, create: i, deps: o, inst: n, next: null }, n = xt.updateQueue, n === null && (n = no(), xt.updateQueue = n), i = n.lastEffect, i === null ? n.lastEffect = t.next = t : (o = i.next, i.next = t, t.next = o, n.lastEffect = t), t;
  }
  function Cp() {
    return ee().memoizedState;
  }
  function lo(t, n, i, o) {
    var u = Ee();
    xt.flags |= t, u.memoizedState = Ei(
      1 | n,
      { destroy: void 0 },
      i,
      o === void 0 ? null : o
    );
  }
  function so(t, n, i, o) {
    var u = ee();
    o = o === void 0 ? null : o;
    var d = u.memoizedState.inst;
    Vt !== null && o !== null && qu(o, Vt.memoizedState.deps) ? u.memoizedState = Ei(n, d, i, o) : (xt.flags |= t, u.memoizedState = Ei(
      1 | n,
      d,
      i,
      o
    ));
  }
  function Ep(t, n) {
    lo(8390656, 8, t, n);
  }
  function Ju(t, n) {
    so(2048, 8, t, n);
  }
  function jS(t) {
    xt.flags |= 4;
    var n = xt.updateQueue;
    if (n === null)
      n = no(), xt.updateQueue = n, n.events = [t];
    else {
      var i = n.events;
      i === null ? n.events = [t] : i.push(t);
    }
  }
  function Ap(t) {
    var n = ee().memoizedState;
    return jS({ ref: n, nextImpl: t }), function() {
      if ((Ot & 2) !== 0) throw Error(s(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function jp(t, n) {
    return so(4, 2, t, n);
  }
  function Mp(t, n) {
    return so(4, 4, t, n);
  }
  function _p(t, n) {
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
  function Rp(t, n, i) {
    i = i != null ? i.concat([t]) : null, so(4, 4, _p.bind(null, n, t), i);
  }
  function Wu() {
  }
  function Dp(t, n) {
    var i = ee();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    return n !== null && qu(n, o[1]) ? o[0] : (i.memoizedState = [t, n], t);
  }
  function Np(t, n) {
    var i = ee();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    if (n !== null && qu(n, o[1]))
      return o[0];
    if (o = t(), Ua) {
      Kn(!0);
      try {
        t();
      } finally {
        Kn(!1);
      }
    }
    return i.memoizedState = [o, n], o;
  }
  function Iu(t, n, i) {
    return i === void 0 || (zn & 1073741824) !== 0 && (Et & 261930) === 0 ? t.memoizedState = n : (t.memoizedState = i, t = O1(), xt.lanes |= t, oa |= t, i);
  }
  function Op(t, n, i, o) {
    return Ue(i, n) ? i : wi.current !== null ? (t = Iu(t, i, o), Ue(t, n) || (se = !0), t) : (zn & 42) === 0 || (zn & 1073741824) !== 0 && (Et & 261930) === 0 ? (se = !0, t.memoizedState = i) : (t = O1(), xt.lanes |= t, oa |= t, n);
  }
  function zp(t, n, i, o, u) {
    var d = Y.p;
    Y.p = d !== 0 && 8 > d ? d : 8;
    var x = O.T, C = {};
    O.T = C, nc(t, !1, n, i);
    try {
      var z = u(), q = O.S;
      if (q !== null && q(C, z), z !== null && typeof z == "object" && typeof z.then == "function") {
        var Z = wS(
          z,
          o
        );
        Dl(
          t,
          n,
          Z,
          Ye(t)
        );
      } else
        Dl(
          t,
          n,
          o,
          Ye(t)
        );
    } catch (W) {
      Dl(
        t,
        n,
        { then: function() {
        }, status: "rejected", reason: W },
        Ye()
      );
    } finally {
      Y.p = d, x !== null && C.types !== null && (x.types = C.types), O.T = x;
    }
  }
  function MS() {
  }
  function tc(t, n, i, o) {
    if (t.tag !== 5) throw Error(s(476));
    var u = Lp(t).queue;
    zp(
      t,
      u,
      n,
      Q,
      i === null ? MS : function() {
        return Bp(t), i(o);
      }
    );
  }
  function Lp(t) {
    var n = t.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: Q,
      baseState: Q,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ln,
        lastRenderedState: Q
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
        lastRenderedReducer: Ln,
        lastRenderedState: i
      },
      next: null
    }, t.memoizedState = n, t = t.alternate, t !== null && (t.memoizedState = n), n;
  }
  function Bp(t) {
    var n = Lp(t);
    n.next === null && (n = t.alternate.memoizedState), Dl(
      t,
      n.next.queue,
      {},
      Ye()
    );
  }
  function ec() {
    return ve(Zl);
  }
  function Vp() {
    return ee().memoizedState;
  }
  function Up() {
    return ee().memoizedState;
  }
  function _S(t) {
    for (var n = t.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var i = Ye();
          t = ea(i);
          var o = na(n, t, i);
          o !== null && (ze(o, n, i), Al(o, n, i)), n = { cache: Ru() }, t.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function RS(t, n, i) {
    var o = Ye();
    i = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, oo(t) ? Hp(n, i) : (i = bu(t, n, i, o), i !== null && (ze(i, t, o), qp(i, n, o)));
  }
  function kp(t, n, i) {
    var o = Ye();
    Dl(t, n, i, o);
  }
  function Dl(t, n, i, o) {
    var u = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (oo(t)) Hp(n, u);
    else {
      var d = t.alternate;
      if (t.lanes === 0 && (d === null || d.lanes === 0) && (d = n.lastRenderedReducer, d !== null))
        try {
          var x = n.lastRenderedState, C = d(x, i);
          if (u.hasEagerState = !0, u.eagerState = C, Ue(C, x))
            return qs(t, n, u, 0), qt === null && Hs(), !1;
        } catch {
        } finally {
        }
      if (i = bu(t, n, u, o), i !== null)
        return ze(i, t, o), qp(i, n, o), !0;
    }
    return !1;
  }
  function nc(t, n, i, o) {
    if (o = {
      lane: 2,
      revertLane: zc(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, oo(t)) {
      if (n) throw Error(s(479));
    } else
      n = bu(
        t,
        i,
        o,
        2
      ), n !== null && ze(n, t, 2);
  }
  function oo(t) {
    var n = t.alternate;
    return t === xt || n !== null && n === xt;
  }
  function Hp(t, n) {
    Ti = to = !0;
    var i = t.pending;
    i === null ? n.next = n : (n.next = i.next, i.next = n), t.pending = n;
  }
  function qp(t, n, i) {
    if ((i & 4194048) !== 0) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, Ph(t, i);
    }
  }
  var Nl = {
    readContext: ve,
    use: ao,
    useCallback: Jt,
    useContext: Jt,
    useEffect: Jt,
    useImperativeHandle: Jt,
    useLayoutEffect: Jt,
    useInsertionEffect: Jt,
    useMemo: Jt,
    useReducer: Jt,
    useRef: Jt,
    useState: Jt,
    useDebugValue: Jt,
    useDeferredValue: Jt,
    useTransition: Jt,
    useSyncExternalStore: Jt,
    useId: Jt,
    useHostTransitionStatus: Jt,
    useFormState: Jt,
    useActionState: Jt,
    useOptimistic: Jt,
    useMemoCache: Jt,
    useCacheRefresh: Jt
  };
  Nl.useEffectEvent = Jt;
  var $p = {
    readContext: ve,
    use: ao,
    useCallback: function(t, n) {
      return Ee().memoizedState = [
        t,
        n === void 0 ? null : n
      ], t;
    },
    useContext: ve,
    useEffect: Ep,
    useImperativeHandle: function(t, n, i) {
      i = i != null ? i.concat([t]) : null, lo(
        4194308,
        4,
        _p.bind(null, n, t),
        i
      );
    },
    useLayoutEffect: function(t, n) {
      return lo(4194308, 4, t, n);
    },
    useInsertionEffect: function(t, n) {
      lo(4, 2, t, n);
    },
    useMemo: function(t, n) {
      var i = Ee();
      n = n === void 0 ? null : n;
      var o = t();
      if (Ua) {
        Kn(!0);
        try {
          t();
        } finally {
          Kn(!1);
        }
      }
      return i.memoizedState = [o, n], o;
    },
    useReducer: function(t, n, i) {
      var o = Ee();
      if (i !== void 0) {
        var u = i(n);
        if (Ua) {
          Kn(!0);
          try {
            i(n);
          } finally {
            Kn(!1);
          }
        }
      } else u = n;
      return o.memoizedState = o.baseState = u, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: u
      }, o.queue = t, t = t.dispatch = RS.bind(
        null,
        xt,
        t
      ), [o.memoizedState, t];
    },
    useRef: function(t) {
      var n = Ee();
      return t = { current: t }, n.memoizedState = t;
    },
    useState: function(t) {
      t = Qu(t);
      var n = t.queue, i = kp.bind(null, xt, n);
      return n.dispatch = i, [t.memoizedState, i];
    },
    useDebugValue: Wu,
    useDeferredValue: function(t, n) {
      var i = Ee();
      return Iu(i, t, n);
    },
    useTransition: function() {
      var t = Qu(!1);
      return t = zp.bind(
        null,
        xt,
        t.queue,
        !0,
        !1
      ), Ee().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, n, i) {
      var o = xt, u = Ee();
      if (jt) {
        if (i === void 0)
          throw Error(s(407));
        i = i();
      } else {
        if (i = n(), qt === null)
          throw Error(s(349));
        (Et & 127) !== 0 || up(o, n, i);
      }
      u.memoizedState = i;
      var d = { value: i, getSnapshot: n };
      return u.queue = d, Ep(fp.bind(null, o, d, t), [
        t
      ]), o.flags |= 2048, Ei(
        9,
        { destroy: void 0 },
        cp.bind(
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
      var t = Ee(), n = qt.identifierPrefix;
      if (jt) {
        var i = bn, o = vn;
        i = (o & ~(1 << 32 - Ve(o) - 1)).toString(32) + i, n = "_" + n + "R_" + i, i = eo++, 0 < i && (n += "H" + i.toString(32)), n += "_";
      } else
        i = TS++, n = "_" + n + "r_" + i.toString(32) + "_";
      return t.memoizedState = n;
    },
    useHostTransitionStatus: ec,
    useFormState: xp,
    useActionState: xp,
    useOptimistic: function(t) {
      var n = Ee();
      n.memoizedState = n.baseState = t;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = i, n = nc.bind(
        null,
        xt,
        !0,
        i
      ), i.dispatch = n, [t, n];
    },
    useMemoCache: Pu,
    useCacheRefresh: function() {
      return Ee().memoizedState = _S.bind(
        null,
        xt
      );
    },
    useEffectEvent: function(t) {
      var n = Ee(), i = { impl: t };
      return n.memoizedState = i, function() {
        if ((Ot & 2) !== 0)
          throw Error(s(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, ac = {
    readContext: ve,
    use: ao,
    useCallback: Dp,
    useContext: ve,
    useEffect: Ju,
    useImperativeHandle: Rp,
    useInsertionEffect: jp,
    useLayoutEffect: Mp,
    useMemo: Np,
    useReducer: io,
    useRef: Cp,
    useState: function() {
      return io(Ln);
    },
    useDebugValue: Wu,
    useDeferredValue: function(t, n) {
      var i = ee();
      return Op(
        i,
        Vt.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = io(Ln)[0], n = ee().memoizedState;
      return [
        typeof t == "boolean" ? t : Rl(t),
        n
      ];
    },
    useSyncExternalStore: rp,
    useId: Vp,
    useHostTransitionStatus: ec,
    useFormState: Sp,
    useActionState: Sp,
    useOptimistic: function(t, n) {
      var i = ee();
      return mp(i, Vt, t, n);
    },
    useMemoCache: Pu,
    useCacheRefresh: Up
  };
  ac.useEffectEvent = Ap;
  var Gp = {
    readContext: ve,
    use: ao,
    useCallback: Dp,
    useContext: ve,
    useEffect: Ju,
    useImperativeHandle: Rp,
    useInsertionEffect: jp,
    useLayoutEffect: Mp,
    useMemo: Np,
    useReducer: Zu,
    useRef: Cp,
    useState: function() {
      return Zu(Ln);
    },
    useDebugValue: Wu,
    useDeferredValue: function(t, n) {
      var i = ee();
      return Vt === null ? Iu(i, t, n) : Op(
        i,
        Vt.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = Zu(Ln)[0], n = ee().memoizedState;
      return [
        typeof t == "boolean" ? t : Rl(t),
        n
      ];
    },
    useSyncExternalStore: rp,
    useId: Vp,
    useHostTransitionStatus: ec,
    useFormState: Tp,
    useActionState: Tp,
    useOptimistic: function(t, n) {
      var i = ee();
      return Vt !== null ? mp(i, Vt, t, n) : (i.baseState = t, [t, i.queue.dispatch]);
    },
    useMemoCache: Pu,
    useCacheRefresh: Up
  };
  Gp.useEffectEvent = Ap;
  function ic(t, n, i, o) {
    n = t.memoizedState, i = i(o, n), i = i == null ? n : v({}, n, i), t.memoizedState = i, t.lanes === 0 && (t.updateQueue.baseState = i);
  }
  var lc = {
    enqueueSetState: function(t, n, i) {
      t = t._reactInternals;
      var o = Ye(), u = ea(o);
      u.payload = n, i != null && (u.callback = i), n = na(t, u, o), n !== null && (ze(n, t, o), Al(n, t, o));
    },
    enqueueReplaceState: function(t, n, i) {
      t = t._reactInternals;
      var o = Ye(), u = ea(o);
      u.tag = 1, u.payload = n, i != null && (u.callback = i), n = na(t, u, o), n !== null && (ze(n, t, o), Al(n, t, o));
    },
    enqueueForceUpdate: function(t, n) {
      t = t._reactInternals;
      var i = Ye(), o = ea(i);
      o.tag = 2, n != null && (o.callback = n), n = na(t, o, i), n !== null && (ze(n, t, i), Al(n, t, i));
    }
  };
  function Yp(t, n, i, o, u, d, x) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(o, d, x) : n.prototype && n.prototype.isPureReactComponent ? !vl(i, o) || !vl(u, d) : !0;
  }
  function Xp(t, n, i, o) {
    t = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(i, o), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(i, o), n.state !== t && lc.enqueueReplaceState(n, n.state, null);
  }
  function ka(t, n) {
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
  function Pp(t) {
    ks(t);
  }
  function Kp(t) {
    console.error(t);
  }
  function Zp(t) {
    ks(t);
  }
  function ro(t, n) {
    try {
      var i = t.onUncaughtError;
      i(n.value, { componentStack: n.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function Qp(t, n, i) {
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
  function sc(t, n, i) {
    return i = ea(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      ro(t, n);
    }, i;
  }
  function Fp(t) {
    return t = ea(t), t.tag = 3, t;
  }
  function Jp(t, n, i, o) {
    var u = i.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var d = o.value;
      t.payload = function() {
        return u(d);
      }, t.callback = function() {
        Qp(n, i, o);
      };
    }
    var x = i.stateNode;
    x !== null && typeof x.componentDidCatch == "function" && (t.callback = function() {
      Qp(n, i, o), typeof u != "function" && (ra === null ? ra = /* @__PURE__ */ new Set([this]) : ra.add(this));
      var C = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: C !== null ? C : ""
      });
    });
  }
  function DS(t, n, i, o, u) {
    if (i.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (n = i.alternate, n !== null && gi(
        n,
        i,
        u,
        !0
      ), i = He.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return tn === null ? So() : i.alternate === null && Wt === 0 && (Wt = 3), i.flags &= -257, i.flags |= 65536, i.lanes = u, o === Qs ? i.flags |= 16384 : (n = i.updateQueue, n === null ? i.updateQueue = /* @__PURE__ */ new Set([o]) : n.add(o), Dc(t, o, u)), !1;
          case 22:
            return i.flags |= 65536, o === Qs ? i.flags |= 16384 : (n = i.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, i.updateQueue = n) : (i = n.retryQueue, i === null ? n.retryQueue = /* @__PURE__ */ new Set([o]) : i.add(o)), Dc(t, o, u)), !1;
        }
        throw Error(s(435, i.tag));
      }
      return Dc(t, o, u), So(), !1;
    }
    if (jt)
      return n = He.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = u, o !== Eu && (t = Error(s(422), { cause: o }), Sl(Fe(t, i)))) : (o !== Eu && (n = Error(s(423), {
        cause: o
      }), Sl(
        Fe(n, i)
      )), t = t.current.alternate, t.flags |= 65536, u &= -u, t.lanes |= u, o = Fe(o, i), u = sc(
        t.stateNode,
        o,
        u
      ), Bu(t, u), Wt !== 4 && (Wt = 2)), !1;
    var d = Error(s(520), { cause: o });
    if (d = Fe(d, i), Hl === null ? Hl = [d] : Hl.push(d), Wt !== 4 && (Wt = 2), n === null) return !0;
    o = Fe(o, i), i = n;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, t = u & -u, i.lanes |= t, t = sc(i.stateNode, o, t), Bu(i, t), !1;
        case 1:
          if (n = i.type, d = i.stateNode, (i.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (ra === null || !ra.has(d))))
            return i.flags |= 65536, u &= -u, i.lanes |= u, u = Fp(u), Jp(
              u,
              t,
              i,
              o
            ), Bu(i, u), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var oc = Error(s(461)), se = !1;
  function be(t, n, i, o) {
    n.child = t === null ? ep(n, null, i, o) : Va(
      n,
      t.child,
      i,
      o
    );
  }
  function Wp(t, n, i, o, u) {
    i = i.render;
    var d = n.ref;
    if ("ref" in o) {
      var x = {};
      for (var C in o)
        C !== "ref" && (x[C] = o[C]);
    } else x = o;
    return Oa(n), o = $u(
      t,
      n,
      i,
      x,
      d,
      u
    ), C = Gu(), t !== null && !se ? (Yu(t, n, u), Bn(t, n, u)) : (jt && C && Tu(n), n.flags |= 1, be(t, n, o, u), n.child);
  }
  function Ip(t, n, i, o, u) {
    if (t === null) {
      var d = i.type;
      return typeof d == "function" && !xu(d) && d.defaultProps === void 0 && i.compare === null ? (n.tag = 15, n.type = d, t1(
        t,
        n,
        d,
        o,
        u
      )) : (t = Gs(
        i.type,
        null,
        o,
        n,
        n.mode,
        u
      ), t.ref = n.ref, t.return = n, n.child = t);
    }
    if (d = t.child, !pc(t, u)) {
      var x = d.memoizedProps;
      if (i = i.compare, i = i !== null ? i : vl, i(x, o) && t.ref === n.ref)
        return Bn(t, n, u);
    }
    return n.flags |= 1, t = Rn(d, o), t.ref = n.ref, t.return = n, n.child = t;
  }
  function t1(t, n, i, o, u) {
    if (t !== null) {
      var d = t.memoizedProps;
      if (vl(d, o) && t.ref === n.ref)
        if (se = !1, n.pendingProps = o = d, pc(t, u))
          (t.flags & 131072) !== 0 && (se = !0);
        else
          return n.lanes = t.lanes, Bn(t, n, u);
    }
    return rc(
      t,
      n,
      i,
      o,
      u
    );
  }
  function e1(t, n, i, o) {
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
        return n1(
          t,
          n,
          d,
          i,
          o
        );
      }
      if ((i & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Ks(
          n,
          d !== null ? d.cachePool : null
        ), d !== null ? ip(n, d) : Uu(), lp(n);
      else
        return o = n.lanes = 536870912, n1(
          t,
          n,
          d !== null ? d.baseLanes | i : i,
          i,
          o
        );
    } else
      d !== null ? (Ks(n, d.cachePool), ip(n, d), ia(), n.memoizedState = null) : (t !== null && Ks(n, null), Uu(), ia());
    return be(t, n, u, i), n.child;
  }
  function Ol(t, n) {
    return t !== null && t.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function n1(t, n, i, o, u) {
    var d = Nu();
    return d = d === null ? null : { parent: ie._currentValue, pool: d }, n.memoizedState = {
      baseLanes: i,
      cachePool: d
    }, t !== null && Ks(n, null), Uu(), lp(n), t !== null && gi(t, n, o, !0), n.childLanes = u, null;
  }
  function uo(t, n) {
    return n = fo(
      { mode: n.mode, children: n.children },
      t.mode
    ), n.ref = t.ref, t.child = n, n.return = t, n;
  }
  function a1(t, n, i) {
    return Va(n, t.child, null, i), t = uo(n, n.pendingProps), t.flags |= 2, qe(n), n.memoizedState = null, t;
  }
  function NS(t, n, i) {
    var o = n.pendingProps, u = (n.flags & 128) !== 0;
    if (n.flags &= -129, t === null) {
      if (jt) {
        if (o.mode === "hidden")
          return t = uo(n, o), n.lanes = 536870912, Ol(null, t);
        if (Hu(n), (t = Yt) ? (t = p0(
          t,
          Ie
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Fn !== null ? { id: vn, overflow: bn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Hm(t), i.return = n, n.child = i, ge = n, Yt = null)) : t = null, t === null) throw Wn(n);
        return n.lanes = 536870912, null;
      }
      return uo(n, o);
    }
    var d = t.memoizedState;
    if (d !== null) {
      var x = d.dehydrated;
      if (Hu(n), u)
        if (n.flags & 256)
          n.flags &= -257, n = a1(
            t,
            n,
            i
          );
        else if (n.memoizedState !== null)
          n.child = t.child, n.flags |= 128, n = null;
        else throw Error(s(558));
      else if (se || gi(t, n, i, !1), u = (i & t.childLanes) !== 0, se || u) {
        if (o = qt, o !== null && (x = Kh(o, i), x !== 0 && x !== d.retryLane))
          throw d.retryLane = x, _a(t, x), ze(o, t, x), oc;
        So(), n = a1(
          t,
          n,
          i
        );
      } else
        t = d.treeContext, Yt = en(x.nextSibling), ge = n, jt = !0, Jn = null, Ie = !1, t !== null && Gm(n, t), n = uo(n, o), n.flags |= 4096;
      return n;
    }
    return t = Rn(t.child, {
      mode: o.mode,
      children: o.children
    }), t.ref = n.ref, n.child = t, t.return = n, t;
  }
  function co(t, n) {
    var i = n.ref;
    if (i === null)
      t !== null && t.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(s(284));
      (t === null || t.ref !== i) && (n.flags |= 4194816);
    }
  }
  function rc(t, n, i, o, u) {
    return Oa(n), i = $u(
      t,
      n,
      i,
      o,
      void 0,
      u
    ), o = Gu(), t !== null && !se ? (Yu(t, n, u), Bn(t, n, u)) : (jt && o && Tu(n), n.flags |= 1, be(t, n, i, u), n.child);
  }
  function i1(t, n, i, o, u, d) {
    return Oa(n), n.updateQueue = null, i = op(
      n,
      o,
      i,
      u
    ), sp(t), o = Gu(), t !== null && !se ? (Yu(t, n, d), Bn(t, n, d)) : (jt && o && Tu(n), n.flags |= 1, be(t, n, i, d), n.child);
  }
  function l1(t, n, i, o, u) {
    if (Oa(n), n.stateNode === null) {
      var d = hi, x = i.contextType;
      typeof x == "object" && x !== null && (d = ve(x)), d = new i(o, d), n.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, d.updater = lc, n.stateNode = d, d._reactInternals = n, d = n.stateNode, d.props = o, d.state = n.memoizedState, d.refs = {}, zu(n), x = i.contextType, d.context = typeof x == "object" && x !== null ? ve(x) : hi, d.state = n.memoizedState, x = i.getDerivedStateFromProps, typeof x == "function" && (ic(
        n,
        i,
        x,
        o
      ), d.state = n.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (x = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), x !== d.state && lc.enqueueReplaceState(d, d.state, null), Ml(n, o, d, u), jl(), d.state = n.memoizedState), typeof d.componentDidMount == "function" && (n.flags |= 4194308), o = !0;
    } else if (t === null) {
      d = n.stateNode;
      var C = n.memoizedProps, z = ka(i, C);
      d.props = z;
      var q = d.context, Z = i.contextType;
      x = hi, typeof Z == "object" && Z !== null && (x = ve(Z));
      var W = i.getDerivedStateFromProps;
      Z = typeof W == "function" || typeof d.getSnapshotBeforeUpdate == "function", C = n.pendingProps !== C, Z || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (C || q !== x) && Xp(
        n,
        d,
        o,
        x
      ), ta = !1;
      var $ = n.memoizedState;
      d.state = $, Ml(n, o, d, u), jl(), q = n.memoizedState, C || $ !== q || ta ? (typeof W == "function" && (ic(
        n,
        i,
        W,
        o
      ), q = n.memoizedState), (z = ta || Yp(
        n,
        i,
        z,
        o,
        $,
        q,
        x
      )) ? (Z || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = o, n.memoizedState = q), d.props = o, d.state = q, d.context = x, o = z) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), o = !1);
    } else {
      d = n.stateNode, Lu(t, n), x = n.memoizedProps, Z = ka(i, x), d.props = Z, W = n.pendingProps, $ = d.context, q = i.contextType, z = hi, typeof q == "object" && q !== null && (z = ve(q)), C = i.getDerivedStateFromProps, (q = typeof C == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (x !== W || $ !== z) && Xp(
        n,
        d,
        o,
        z
      ), ta = !1, $ = n.memoizedState, d.state = $, Ml(n, o, d, u), jl();
      var X = n.memoizedState;
      x !== W || $ !== X || ta || t !== null && t.dependencies !== null && Xs(t.dependencies) ? (typeof C == "function" && (ic(
        n,
        i,
        C,
        o
      ), X = n.memoizedState), (Z = ta || Yp(
        n,
        i,
        Z,
        o,
        $,
        X,
        z
      ) || t !== null && t.dependencies !== null && Xs(t.dependencies)) ? (q || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(o, X, z), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(
        o,
        X,
        z
      )), typeof d.componentDidUpdate == "function" && (n.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || x === t.memoizedProps && $ === t.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || x === t.memoizedProps && $ === t.memoizedState || (n.flags |= 1024), n.memoizedProps = o, n.memoizedState = X), d.props = o, d.state = X, d.context = z, o = Z) : (typeof d.componentDidUpdate != "function" || x === t.memoizedProps && $ === t.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || x === t.memoizedProps && $ === t.memoizedState || (n.flags |= 1024), o = !1);
    }
    return d = o, co(t, n), o = (n.flags & 128) !== 0, d || o ? (d = n.stateNode, i = o && typeof i.getDerivedStateFromError != "function" ? null : d.render(), n.flags |= 1, t !== null && o ? (n.child = Va(
      n,
      t.child,
      null,
      u
    ), n.child = Va(
      n,
      null,
      i,
      u
    )) : be(t, n, i, u), n.memoizedState = d.state, t = n.child) : t = Bn(
      t,
      n,
      u
    ), t;
  }
  function s1(t, n, i, o) {
    return Da(), n.flags |= 256, be(t, n, i, o), n.child;
  }
  var uc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function cc(t) {
    return { baseLanes: t, cachePool: Qm() };
  }
  function fc(t, n, i) {
    return t = t !== null ? t.childLanes & ~i : 0, n && (t |= Ge), t;
  }
  function o1(t, n, i) {
    var o = n.pendingProps, u = !1, d = (n.flags & 128) !== 0, x;
    if ((x = d) || (x = t !== null && t.memoizedState === null ? !1 : (te.current & 2) !== 0), x && (u = !0, n.flags &= -129), x = (n.flags & 32) !== 0, n.flags &= -33, t === null) {
      if (jt) {
        if (u ? aa(n) : ia(), (t = Yt) ? (t = p0(
          t,
          Ie
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Fn !== null ? { id: vn, overflow: bn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Hm(t), i.return = n, n.child = i, ge = n, Yt = null)) : t = null, t === null) throw Wn(n);
        return Kc(t) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var C = o.children;
      return o = o.fallback, u ? (ia(), u = n.mode, C = fo(
        { mode: "hidden", children: C },
        u
      ), o = Ra(
        o,
        u,
        i,
        null
      ), C.return = n, o.return = n, C.sibling = o, n.child = C, o = n.child, o.memoizedState = cc(i), o.childLanes = fc(
        t,
        x,
        i
      ), n.memoizedState = uc, Ol(null, o)) : (aa(n), dc(n, C));
    }
    var z = t.memoizedState;
    if (z !== null && (C = z.dehydrated, C !== null)) {
      if (d)
        n.flags & 256 ? (aa(n), n.flags &= -257, n = hc(
          t,
          n,
          i
        )) : n.memoizedState !== null ? (ia(), n.child = t.child, n.flags |= 128, n = null) : (ia(), C = o.fallback, u = n.mode, o = fo(
          { mode: "visible", children: o.children },
          u
        ), C = Ra(
          C,
          u,
          i,
          null
        ), C.flags |= 2, o.return = n, C.return = n, o.sibling = C, n.child = o, Va(
          n,
          t.child,
          null,
          i
        ), o = n.child, o.memoizedState = cc(i), o.childLanes = fc(
          t,
          x,
          i
        ), n.memoizedState = uc, n = Ol(null, o));
      else if (aa(n), Kc(C)) {
        if (x = C.nextSibling && C.nextSibling.dataset, x) var q = x.dgst;
        x = q, o = Error(s(419)), o.stack = "", o.digest = x, Sl({ value: o, source: null, stack: null }), n = hc(
          t,
          n,
          i
        );
      } else if (se || gi(t, n, i, !1), x = (i & t.childLanes) !== 0, se || x) {
        if (x = qt, x !== null && (o = Kh(x, i), o !== 0 && o !== z.retryLane))
          throw z.retryLane = o, _a(t, o), ze(x, t, o), oc;
        Pc(C) || So(), n = hc(
          t,
          n,
          i
        );
      } else
        Pc(C) ? (n.flags |= 192, n.child = t.child, n = null) : (t = z.treeContext, Yt = en(
          C.nextSibling
        ), ge = n, jt = !0, Jn = null, Ie = !1, t !== null && Gm(n, t), n = dc(
          n,
          o.children
        ), n.flags |= 4096);
      return n;
    }
    return u ? (ia(), C = o.fallback, u = n.mode, z = t.child, q = z.sibling, o = Rn(z, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = z.subtreeFlags & 65011712, q !== null ? C = Rn(
      q,
      C
    ) : (C = Ra(
      C,
      u,
      i,
      null
    ), C.flags |= 2), C.return = n, o.return = n, o.sibling = C, n.child = o, Ol(null, o), o = n.child, C = t.child.memoizedState, C === null ? C = cc(i) : (u = C.cachePool, u !== null ? (z = ie._currentValue, u = u.parent !== z ? { parent: z, pool: z } : u) : u = Qm(), C = {
      baseLanes: C.baseLanes | i,
      cachePool: u
    }), o.memoizedState = C, o.childLanes = fc(
      t,
      x,
      i
    ), n.memoizedState = uc, Ol(t.child, o)) : (aa(n), i = t.child, t = i.sibling, i = Rn(i, {
      mode: "visible",
      children: o.children
    }), i.return = n, i.sibling = null, t !== null && (x = n.deletions, x === null ? (n.deletions = [t], n.flags |= 16) : x.push(t)), n.child = i, n.memoizedState = null, i);
  }
  function dc(t, n) {
    return n = fo(
      { mode: "visible", children: n },
      t.mode
    ), n.return = t, t.child = n;
  }
  function fo(t, n) {
    return t = ke(22, t, null, n), t.lanes = 0, t;
  }
  function hc(t, n, i) {
    return Va(n, t.child, null, i), t = dc(
      n,
      n.pendingProps.children
    ), t.flags |= 2, n.memoizedState = null, t;
  }
  function r1(t, n, i) {
    t.lanes |= n;
    var o = t.alternate;
    o !== null && (o.lanes |= n), Mu(t.return, n, i);
  }
  function mc(t, n, i, o, u, d) {
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
  function u1(t, n, i) {
    var o = n.pendingProps, u = o.revealOrder, d = o.tail;
    o = o.children;
    var x = te.current, C = (x & 2) !== 0;
    if (C ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, tt(te, x), be(t, n, o, i), o = jt ? xl : 0, !C && t !== null && (t.flags & 128) !== 0)
      t: for (t = n.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && r1(t, i, n);
        else if (t.tag === 19)
          r1(t, i, n);
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
          t = i.alternate, t !== null && Is(t) === null && (u = i), i = i.sibling;
        i = u, i === null ? (u = n.child, n.child = null) : (u = i.sibling, i.sibling = null), mc(
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
          if (t = u.alternate, t !== null && Is(t) === null) {
            n.child = u;
            break;
          }
          t = u.sibling, u.sibling = i, i = u, u = t;
        }
        mc(
          n,
          !0,
          i,
          null,
          d,
          o
        );
        break;
      case "together":
        mc(
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
  function Bn(t, n, i) {
    if (t !== null && (n.dependencies = t.dependencies), oa |= n.lanes, (i & n.childLanes) === 0)
      if (t !== null) {
        if (gi(
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
      for (t = n.child, i = Rn(t, t.pendingProps), n.child = i, i.return = n; t.sibling !== null; )
        t = t.sibling, i = i.sibling = Rn(t, t.pendingProps), i.return = n;
      i.sibling = null;
    }
    return n.child;
  }
  function pc(t, n) {
    return (t.lanes & n) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Xs(t)));
  }
  function OS(t, n, i) {
    switch (n.tag) {
      case 3:
        Nt(n, n.stateNode.containerInfo), In(n, ie, t.memoizedState.cache), Da();
        break;
      case 27:
      case 5:
        Kt(n);
        break;
      case 4:
        Nt(n, n.stateNode.containerInfo);
        break;
      case 10:
        In(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, Hu(n), null;
        break;
      case 13:
        var o = n.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (aa(n), n.flags |= 128, null) : (i & n.child.childLanes) !== 0 ? o1(t, n, i) : (aa(n), t = Bn(
            t,
            n,
            i
          ), t !== null ? t.sibling : null);
        aa(n);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (o = (i & n.childLanes) !== 0, o || (gi(
          t,
          n,
          i,
          !1
        ), o = (i & n.childLanes) !== 0), u) {
          if (o)
            return u1(
              t,
              n,
              i
            );
          n.flags |= 128;
        }
        if (u = n.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), tt(te, te.current), o) break;
        return null;
      case 22:
        return n.lanes = 0, e1(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        In(n, ie, t.memoizedState.cache);
    }
    return Bn(t, n, i);
  }
  function c1(t, n, i) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps)
        se = !0;
      else {
        if (!pc(t, i) && (n.flags & 128) === 0)
          return se = !1, OS(
            t,
            n,
            i
          );
        se = (t.flags & 131072) !== 0;
      }
    else
      se = !1, jt && (n.flags & 1048576) !== 0 && $m(n, xl, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        t: {
          var o = n.pendingProps;
          if (t = La(n.elementType), n.type = t, typeof t == "function")
            xu(t) ? (o = ka(t, o), n.tag = 1, n = l1(
              null,
              n,
              t,
              o,
              i
            )) : (n.tag = 0, n = rc(
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
                n.tag = 11, n = Wp(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break t;
              } else if (u === R) {
                n.tag = 14, n = Ip(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break t;
              }
            }
            throw n = J(t) || t, Error(s(306, n, ""));
          }
        }
        return n;
      case 0:
        return rc(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 1:
        return o = n.type, u = ka(
          o,
          n.pendingProps
        ), l1(
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
          u = d.element, Lu(t, n), Ml(n, o, null, i);
          var x = n.memoizedState;
          if (o = x.cache, In(n, ie, o), o !== d.cache && _u(
            n,
            [ie],
            i,
            !0
          ), jl(), o = x.element, d.isDehydrated)
            if (d = {
              element: o,
              isDehydrated: !1,
              cache: x.cache
            }, n.updateQueue.baseState = d, n.memoizedState = d, n.flags & 256) {
              n = s1(
                t,
                n,
                o,
                i
              );
              break t;
            } else if (o !== u) {
              u = Fe(
                Error(s(424)),
                n
              ), Sl(u), n = s1(
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
              for (Yt = en(t.firstChild), ge = n, jt = !0, Jn = null, Ie = !0, i = ep(
                n,
                null,
                o,
                i
              ), n.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (Da(), o === u) {
              n = Bn(
                t,
                n,
                i
              );
              break t;
            }
            be(t, n, o, i);
          }
          n = n.child;
        }
        return n;
      case 26:
        return co(t, n), t === null ? (i = S0(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = i : jt || (i = n.type, t = n.pendingProps, o = Mo(
          ht.current
        ).createElement(i), o[ye] = n, o[Me] = t, xe(o, i, t), me(o), n.stateNode = o) : n.memoizedState = S0(
          n.type,
          t.memoizedProps,
          n.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Kt(n), t === null && jt && (o = n.stateNode = v0(
          n.type,
          n.pendingProps,
          ht.current
        ), ge = n, Ie = !0, u = Yt, da(n.type) ? (Zc = u, Yt = en(o.firstChild)) : Yt = u), be(
          t,
          n,
          n.pendingProps.children,
          i
        ), co(t, n), t === null && (n.flags |= 4194304), n.child;
      case 5:
        return t === null && jt && ((u = o = Yt) && (o = u3(
          o,
          n.type,
          n.pendingProps,
          Ie
        ), o !== null ? (n.stateNode = o, ge = n, Yt = en(o.firstChild), Ie = !1, u = !0) : u = !1), u || Wn(n)), Kt(n), u = n.type, d = n.pendingProps, x = t !== null ? t.memoizedProps : null, o = d.children, Gc(u, d) ? o = null : x !== null && Gc(u, x) && (n.flags |= 32), n.memoizedState !== null && (u = $u(
          t,
          n,
          CS,
          null,
          null,
          i
        ), Zl._currentValue = u), co(t, n), be(t, n, o, i), n.child;
      case 6:
        return t === null && jt && ((t = i = Yt) && (i = c3(
          i,
          n.pendingProps,
          Ie
        ), i !== null ? (n.stateNode = i, ge = n, Yt = null, t = !0) : t = !1), t || Wn(n)), null;
      case 13:
        return o1(t, n, i);
      case 4:
        return Nt(
          n,
          n.stateNode.containerInfo
        ), o = n.pendingProps, t === null ? n.child = Va(
          n,
          null,
          o,
          i
        ) : be(t, n, o, i), n.child;
      case 11:
        return Wp(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 7:
        return be(
          t,
          n,
          n.pendingProps,
          i
        ), n.child;
      case 8:
        return be(
          t,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 12:
        return be(
          t,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 10:
        return o = n.pendingProps, In(n, n.type, o.value), be(t, n, o.children, i), n.child;
      case 9:
        return u = n.type._context, o = n.pendingProps.children, Oa(n), u = ve(u), o = o(u), n.flags |= 1, be(t, n, o, i), n.child;
      case 14:
        return Ip(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 15:
        return t1(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 19:
        return u1(t, n, i);
      case 31:
        return NS(t, n, i);
      case 22:
        return e1(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        return Oa(n), o = ve(ie), t === null ? (u = Nu(), u === null && (u = qt, d = Ru(), u.pooledCache = d, d.refCount++, d !== null && (u.pooledCacheLanes |= i), u = d), n.memoizedState = { parent: o, cache: u }, zu(n), In(n, ie, u)) : ((t.lanes & i) !== 0 && (Lu(t, n), Ml(n, null, null, i), jl()), u = t.memoizedState, d = n.memoizedState, u.parent !== o ? (u = { parent: o, cache: o }, n.memoizedState = u, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = u), In(n, ie, o)) : (o = d.cache, In(n, ie, o), o !== u.cache && _u(
          n,
          [ie],
          i,
          !0
        ))), be(
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
  function Vn(t) {
    t.flags |= 4;
  }
  function yc(t, n, i, o, u) {
    if ((n = (t.mode & 32) !== 0) && (n = !1), n) {
      if (t.flags |= 16777216, (u & 335544128) === u)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (V1()) t.flags |= 8192;
        else
          throw Ba = Qs, Ou;
    } else t.flags &= -16777217;
  }
  function f1(t, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !A0(n))
      if (V1()) t.flags |= 8192;
      else
        throw Ba = Qs, Ou;
  }
  function ho(t, n) {
    n !== null && (t.flags |= 4), t.flags & 16384 && (n = t.tag !== 22 ? Yh() : 536870912, t.lanes |= n, _i |= n);
  }
  function zl(t, n) {
    if (!jt)
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
  function Xt(t) {
    var n = t.alternate !== null && t.alternate.child === t.child, i = 0, o = 0;
    if (n)
      for (var u = t.child; u !== null; )
        i |= u.lanes | u.childLanes, o |= u.subtreeFlags & 65011712, o |= u.flags & 65011712, u.return = t, u = u.sibling;
    else
      for (u = t.child; u !== null; )
        i |= u.lanes | u.childLanes, o |= u.subtreeFlags, o |= u.flags, u.return = t, u = u.sibling;
    return t.subtreeFlags |= o, t.childLanes = i, n;
  }
  function zS(t, n, i) {
    var o = n.pendingProps;
    switch (Cu(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Xt(n), null;
      case 1:
        return Xt(n), null;
      case 3:
        return i = n.stateNode, o = null, t !== null && (o = t.memoizedState.cache), n.memoizedState.cache !== o && (n.flags |= 2048), On(ie), _t(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (t === null || t.child === null) && (yi(n) ? Vn(n) : t === null || t.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Au())), Xt(n), null;
      case 26:
        var u = n.type, d = n.memoizedState;
        return t === null ? (Vn(n), d !== null ? (Xt(n), f1(n, d)) : (Xt(n), yc(
          n,
          u,
          null,
          o,
          i
        ))) : d ? d !== t.memoizedState ? (Vn(n), Xt(n), f1(n, d)) : (Xt(n), n.flags &= -16777217) : (t = t.memoizedProps, t !== o && Vn(n), Xt(n), yc(
          n,
          u,
          t,
          o,
          i
        )), null;
      case 27:
        if (rt(n), i = ht.current, u = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && Vn(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(s(166));
            return Xt(n), null;
          }
          t = ot.current, yi(n) ? Ym(n) : (t = v0(u, o, i), n.stateNode = t, Vn(n));
        }
        return Xt(n), null;
      case 5:
        if (rt(n), u = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && Vn(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(s(166));
            return Xt(n), null;
          }
          if (d = ot.current, yi(n))
            Ym(n);
          else {
            var x = Mo(
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
            d[ye] = n, d[Me] = o;
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
            t: switch (xe(d, u, o), u) {
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
            o && Vn(n);
          }
        }
        return Xt(n), yc(
          n,
          n.type,
          t === null ? null : t.memoizedProps,
          n.pendingProps,
          i
        ), null;
      case 6:
        if (t && n.stateNode != null)
          t.memoizedProps !== o && Vn(n);
        else {
          if (typeof o != "string" && n.stateNode === null)
            throw Error(s(166));
          if (t = ht.current, yi(n)) {
            if (t = n.stateNode, i = n.memoizedProps, o = null, u = ge, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  o = u.memoizedProps;
              }
            t[ye] = n, t = !!(t.nodeValue === i || o !== null && o.suppressHydrationWarning === !0 || o0(t.nodeValue, i)), t || Wn(n, !0);
          } else
            t = Mo(t).createTextNode(
              o
            ), t[ye] = n, n.stateNode = t;
        }
        return Xt(n), null;
      case 31:
        if (i = n.memoizedState, t === null || t.memoizedState !== null) {
          if (o = yi(n), i !== null) {
            if (t === null) {
              if (!o) throw Error(s(318));
              if (t = n.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[ye] = n;
            } else
              Da(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Xt(n), t = !1;
          } else
            i = Au(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = i), t = !0;
          if (!t)
            return n.flags & 256 ? (qe(n), n) : (qe(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(s(558));
        }
        return Xt(n), null;
      case 13:
        if (o = n.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (u = yi(n), o !== null && o.dehydrated !== null) {
            if (t === null) {
              if (!u) throw Error(s(318));
              if (u = n.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[ye] = n;
            } else
              Da(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Xt(n), u = !1;
          } else
            u = Au(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return n.flags & 256 ? (qe(n), n) : (qe(n), null);
        }
        return qe(n), (n.flags & 128) !== 0 ? (n.lanes = i, n) : (i = o !== null, t = t !== null && t.memoizedState !== null, i && (o = n.child, u = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (u = o.alternate.memoizedState.cachePool.pool), d = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (d = o.memoizedState.cachePool.pool), d !== u && (o.flags |= 2048)), i !== t && i && (n.child.flags |= 8192), ho(n, n.updateQueue), Xt(n), null);
      case 4:
        return _t(), t === null && Uc(n.stateNode.containerInfo), Xt(n), null;
      case 10:
        return On(n.type), Xt(n), null;
      case 19:
        if (G(te), o = n.memoizedState, o === null) return Xt(n), null;
        if (u = (n.flags & 128) !== 0, d = o.rendering, d === null)
          if (u) zl(o, !1);
          else {
            if (Wt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = n.child; t !== null; ) {
                if (d = Is(t), d !== null) {
                  for (n.flags |= 128, zl(o, !1), t = d.updateQueue, n.updateQueue = t, ho(n, t), n.subtreeFlags = 0, t = i, i = n.child; i !== null; )
                    km(i, t), i = i.sibling;
                  return tt(
                    te,
                    te.current & 1 | 2
                  ), jt && Dn(n, o.treeForkCount), n.child;
                }
                t = t.sibling;
              }
            o.tail !== null && Le() > vo && (n.flags |= 128, u = !0, zl(o, !1), n.lanes = 4194304);
          }
        else {
          if (!u)
            if (t = Is(d), t !== null) {
              if (n.flags |= 128, u = !0, t = t.updateQueue, n.updateQueue = t, ho(n, t), zl(o, !0), o.tail === null && o.tailMode === "hidden" && !d.alternate && !jt)
                return Xt(n), null;
            } else
              2 * Le() - o.renderingStartTime > vo && i !== 536870912 && (n.flags |= 128, u = !0, zl(o, !1), n.lanes = 4194304);
          o.isBackwards ? (d.sibling = n.child, n.child = d) : (t = o.last, t !== null ? t.sibling = d : n.child = d, o.last = d);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Le(), t.sibling = null, i = te.current, tt(
          te,
          u ? i & 1 | 2 : i & 1
        ), jt && Dn(n, o.treeForkCount), t) : (Xt(n), null);
      case 22:
      case 23:
        return qe(n), ku(), o = n.memoizedState !== null, t !== null ? t.memoizedState !== null !== o && (n.flags |= 8192) : o && (n.flags |= 8192), o ? (i & 536870912) !== 0 && (n.flags & 128) === 0 && (Xt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Xt(n), i = n.updateQueue, i !== null && ho(n, i.retryQueue), i = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), o = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== i && (n.flags |= 2048), t !== null && G(za), null;
      case 24:
        return i = null, t !== null && (i = t.memoizedState.cache), n.memoizedState.cache !== i && (n.flags |= 2048), On(ie), Xt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, n.tag));
  }
  function LS(t, n) {
    switch (Cu(n), n.tag) {
      case 1:
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 3:
        return On(ie), _t(), t = n.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (n.flags = t & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return rt(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (qe(n), n.alternate === null)
            throw Error(s(340));
          Da();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 13:
        if (qe(n), t = n.memoizedState, t !== null && t.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(s(340));
          Da();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 19:
        return G(te), null;
      case 4:
        return _t(), null;
      case 10:
        return On(n.type), null;
      case 22:
      case 23:
        return qe(n), ku(), t !== null && G(za), t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 24:
        return On(ie), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function d1(t, n) {
    switch (Cu(n), n.tag) {
      case 3:
        On(ie), _t();
        break;
      case 26:
      case 27:
      case 5:
        rt(n);
        break;
      case 4:
        _t();
        break;
      case 31:
        n.memoizedState !== null && qe(n);
        break;
      case 13:
        qe(n);
        break;
      case 19:
        G(te);
        break;
      case 10:
        On(n.type);
        break;
      case 22:
      case 23:
        qe(n), ku(), t !== null && G(za);
        break;
      case 24:
        On(ie);
    }
  }
  function Ll(t, n) {
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
      Bt(n, n.return, C);
    }
  }
  function la(t, n, i) {
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
              var z = i, q = C;
              try {
                q();
              } catch (Z) {
                Bt(
                  u,
                  z,
                  Z
                );
              }
            }
          }
          o = o.next;
        } while (o !== d);
      }
    } catch (Z) {
      Bt(n, n.return, Z);
    }
  }
  function h1(t) {
    var n = t.updateQueue;
    if (n !== null) {
      var i = t.stateNode;
      try {
        ap(n, i);
      } catch (o) {
        Bt(t, t.return, o);
      }
    }
  }
  function m1(t, n, i) {
    i.props = ka(
      t.type,
      t.memoizedProps
    ), i.state = t.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (o) {
      Bt(t, n, o);
    }
  }
  function Bl(t, n) {
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
      Bt(t, n, u);
    }
  }
  function xn(t, n) {
    var i = t.ref, o = t.refCleanup;
    if (i !== null)
      if (typeof o == "function")
        try {
          o();
        } catch (u) {
          Bt(t, n, u);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (u) {
          Bt(t, n, u);
        }
      else i.current = null;
  }
  function p1(t) {
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
      Bt(t, t.return, u);
    }
  }
  function gc(t, n, i) {
    try {
      var o = t.stateNode;
      a3(o, t.type, i, n), o[Me] = n;
    } catch (u) {
      Bt(t, t.return, u);
    }
  }
  function y1(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && da(t.type) || t.tag === 4;
  }
  function vc(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || y1(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && da(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function bc(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(t, n) : (n = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, n.appendChild(t), i = i._reactRootContainer, i != null || n.onclick !== null || (n.onclick = Mn));
    else if (o !== 4 && (o === 27 && da(t.type) && (i = t.stateNode, n = null), t = t.child, t !== null))
      for (bc(t, n, i), t = t.sibling; t !== null; )
        bc(t, n, i), t = t.sibling;
  }
  function mo(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? i.insertBefore(t, n) : i.appendChild(t);
    else if (o !== 4 && (o === 27 && da(t.type) && (i = t.stateNode), t = t.child, t !== null))
      for (mo(t, n, i), t = t.sibling; t !== null; )
        mo(t, n, i), t = t.sibling;
  }
  function g1(t) {
    var n = t.stateNode, i = t.memoizedProps;
    try {
      for (var o = t.type, u = n.attributes; u.length; )
        n.removeAttributeNode(u[0]);
      xe(n, o, i), n[ye] = t, n[Me] = i;
    } catch (d) {
      Bt(t, t.return, d);
    }
  }
  var Un = !1, oe = !1, xc = !1, v1 = typeof WeakSet == "function" ? WeakSet : Set, pe = null;
  function BS(t, n) {
    if (t = t.containerInfo, qc = Lo, t = Rm(t), hu(t)) {
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
            var x = 0, C = -1, z = -1, q = 0, Z = 0, W = t, $ = null;
            e: for (; ; ) {
              for (var X; W !== i || u !== 0 && W.nodeType !== 3 || (C = x + u), W !== d || o !== 0 && W.nodeType !== 3 || (z = x + o), W.nodeType === 3 && (x += W.nodeValue.length), (X = W.firstChild) !== null; )
                $ = W, W = X;
              for (; ; ) {
                if (W === t) break e;
                if ($ === i && ++q === u && (C = x), $ === d && ++Z === o && (z = x), (X = W.nextSibling) !== null) break;
                W = $, $ = W.parentNode;
              }
              W = X;
            }
            i = C === -1 || z === -1 ? null : { start: C, end: z };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for ($c = { focusedElem: t, selectionRange: i }, Lo = !1, pe = n; pe !== null; )
      if (n = pe, t = n.child, (n.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = n, pe = t;
      else
        for (; pe !== null; ) {
          switch (n = pe, d = n.alternate, t = n.flags, n.tag) {
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
                  var ut = ka(
                    i.type,
                    u
                  );
                  t = o.getSnapshotBeforeUpdate(
                    ut,
                    d
                  ), o.__reactInternalSnapshotBeforeUpdate = t;
                } catch (yt) {
                  Bt(
                    i,
                    i.return,
                    yt
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = n.stateNode.containerInfo, i = t.nodeType, i === 9)
                  Xc(t);
                else if (i === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Xc(t);
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
            t.return = n.return, pe = t;
            break;
          }
          pe = n.return;
        }
  }
  function b1(t, n, i) {
    var o = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        Hn(t, i), o & 4 && Ll(5, i);
        break;
      case 1:
        if (Hn(t, i), o & 4)
          if (t = i.stateNode, n === null)
            try {
              t.componentDidMount();
            } catch (x) {
              Bt(i, i.return, x);
            }
          else {
            var u = ka(
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
              Bt(
                i,
                i.return,
                x
              );
            }
          }
        o & 64 && h1(i), o & 512 && Bl(i, i.return);
        break;
      case 3:
        if (Hn(t, i), o & 64 && (t = i.updateQueue, t !== null)) {
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
            ap(t, n);
          } catch (x) {
            Bt(i, i.return, x);
          }
        }
        break;
      case 27:
        n === null && o & 4 && g1(i);
      case 26:
      case 5:
        Hn(t, i), n === null && o & 4 && p1(i), o & 512 && Bl(i, i.return);
        break;
      case 12:
        Hn(t, i);
        break;
      case 31:
        Hn(t, i), o & 4 && w1(t, i);
        break;
      case 13:
        Hn(t, i), o & 4 && T1(t, i), o & 64 && (t = i.memoizedState, t !== null && (t = t.dehydrated, t !== null && (i = XS.bind(
          null,
          i
        ), f3(t, i))));
        break;
      case 22:
        if (o = i.memoizedState !== null || Un, !o) {
          n = n !== null && n.memoizedState !== null || oe, u = Un;
          var d = oe;
          Un = o, (oe = n) && !d ? qn(
            t,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : Hn(t, i), Un = u, oe = d;
        }
        break;
      case 30:
        break;
      default:
        Hn(t, i);
    }
  }
  function x1(t) {
    var n = t.alternate;
    n !== null && (t.alternate = null, x1(n)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (n = t.stateNode, n !== null && Fr(n)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Zt = null, Re = !1;
  function kn(t, n, i) {
    for (i = i.child; i !== null; )
      S1(t, n, i), i = i.sibling;
  }
  function S1(t, n, i) {
    if (Be && typeof Be.onCommitFiberUnmount == "function")
      try {
        Be.onCommitFiberUnmount(sl, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        oe || xn(i, n), kn(
          t,
          n,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        oe || xn(i, n);
        var o = Zt, u = Re;
        da(i.type) && (Zt = i.stateNode, Re = !1), kn(
          t,
          n,
          i
        ), Xl(i.stateNode), Zt = o, Re = u;
        break;
      case 5:
        oe || xn(i, n);
      case 6:
        if (o = Zt, u = Re, Zt = null, kn(
          t,
          n,
          i
        ), Zt = o, Re = u, Zt !== null)
          if (Re)
            try {
              (Zt.nodeType === 9 ? Zt.body : Zt.nodeName === "HTML" ? Zt.ownerDocument.body : Zt).removeChild(i.stateNode);
            } catch (d) {
              Bt(
                i,
                n,
                d
              );
            }
          else
            try {
              Zt.removeChild(i.stateNode);
            } catch (d) {
              Bt(
                i,
                n,
                d
              );
            }
        break;
      case 18:
        Zt !== null && (Re ? (t = Zt, h0(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          i.stateNode
        ), Vi(t)) : h0(Zt, i.stateNode));
        break;
      case 4:
        o = Zt, u = Re, Zt = i.stateNode.containerInfo, Re = !0, kn(
          t,
          n,
          i
        ), Zt = o, Re = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        la(2, i, n), oe || la(4, i, n), kn(
          t,
          n,
          i
        );
        break;
      case 1:
        oe || (xn(i, n), o = i.stateNode, typeof o.componentWillUnmount == "function" && m1(
          i,
          n,
          o
        )), kn(
          t,
          n,
          i
        );
        break;
      case 21:
        kn(
          t,
          n,
          i
        );
        break;
      case 22:
        oe = (o = oe) || i.memoizedState !== null, kn(
          t,
          n,
          i
        ), oe = o;
        break;
      default:
        kn(
          t,
          n,
          i
        );
    }
  }
  function w1(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Vi(t);
      } catch (i) {
        Bt(n, n.return, i);
      }
    }
  }
  function T1(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Vi(t);
      } catch (i) {
        Bt(n, n.return, i);
      }
  }
  function VS(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var n = t.stateNode;
        return n === null && (n = t.stateNode = new v1()), n;
      case 22:
        return t = t.stateNode, n = t._retryCache, n === null && (n = t._retryCache = new v1()), n;
      default:
        throw Error(s(435, t.tag));
    }
  }
  function po(t, n) {
    var i = VS(t);
    n.forEach(function(o) {
      if (!i.has(o)) {
        i.add(o);
        var u = PS.bind(null, t, o);
        o.then(u, u);
      }
    });
  }
  function De(t, n) {
    var i = n.deletions;
    if (i !== null)
      for (var o = 0; o < i.length; o++) {
        var u = i[o], d = t, x = n, C = x;
        t: for (; C !== null; ) {
          switch (C.tag) {
            case 27:
              if (da(C.type)) {
                Zt = C.stateNode, Re = !1;
                break t;
              }
              break;
            case 5:
              Zt = C.stateNode, Re = !1;
              break t;
            case 3:
            case 4:
              Zt = C.stateNode.containerInfo, Re = !0;
              break t;
          }
          C = C.return;
        }
        if (Zt === null) throw Error(s(160));
        S1(d, x, u), Zt = null, Re = !1, d = u.alternate, d !== null && (d.return = null), u.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        C1(n, t), n = n.sibling;
  }
  var on = null;
  function C1(t, n) {
    var i = t.alternate, o = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        De(n, t), Ne(t), o & 4 && (la(3, t, t.return), Ll(3, t), la(5, t, t.return));
        break;
      case 1:
        De(n, t), Ne(t), o & 512 && (oe || i === null || xn(i, i.return)), o & 64 && Un && (t = t.updateQueue, t !== null && (o = t.callbacks, o !== null && (i = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = i === null ? o : i.concat(o))));
        break;
      case 26:
        var u = on;
        if (De(n, t), Ne(t), o & 512 && (oe || i === null || xn(i, i.return)), o & 4) {
          var d = i !== null ? i.memoizedState : null;
          if (o = t.memoizedState, i === null)
            if (o === null)
              if (t.stateNode === null) {
                t: {
                  o = t.type, i = t.memoizedProps, u = u.ownerDocument || u;
                  e: switch (o) {
                    case "title":
                      d = u.getElementsByTagName("title")[0], (!d || d[ul] || d[ye] || d.namespaceURI === "http://www.w3.org/2000/svg" || d.hasAttribute("itemprop")) && (d = u.createElement(o), u.head.insertBefore(
                        d,
                        u.querySelector("head > title")
                      )), xe(d, o, i), d[ye] = t, me(d), o = d;
                      break t;
                    case "link":
                      var x = C0(
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
                      d = u.createElement(o), xe(d, o, i), u.head.appendChild(d);
                      break;
                    case "meta":
                      if (x = C0(
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
                      d = u.createElement(o), xe(d, o, i), u.head.appendChild(d);
                      break;
                    default:
                      throw Error(s(468, o));
                  }
                  d[ye] = t, me(d), o = d;
                }
                t.stateNode = o;
              } else
                E0(
                  u,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = T0(
                u,
                o,
                t.memoizedProps
              );
          else
            d !== o ? (d === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : d.count--, o === null ? E0(
              u,
              t.type,
              t.stateNode
            ) : T0(
              u,
              o,
              t.memoizedProps
            )) : o === null && t.stateNode !== null && gc(
              t,
              t.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        De(n, t), Ne(t), o & 512 && (oe || i === null || xn(i, i.return)), i !== null && o & 4 && gc(
          t,
          t.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (De(n, t), Ne(t), o & 512 && (oe || i === null || xn(i, i.return)), t.flags & 32) {
          u = t.stateNode;
          try {
            si(u, "");
          } catch (ut) {
            Bt(t, t.return, ut);
          }
        }
        o & 4 && t.stateNode != null && (u = t.memoizedProps, gc(
          t,
          u,
          i !== null ? i.memoizedProps : u
        )), o & 1024 && (xc = !0);
        break;
      case 6:
        if (De(n, t), Ne(t), o & 4) {
          if (t.stateNode === null)
            throw Error(s(162));
          o = t.memoizedProps, i = t.stateNode;
          try {
            i.nodeValue = o;
          } catch (ut) {
            Bt(t, t.return, ut);
          }
        }
        break;
      case 3:
        if (Do = null, u = on, on = _o(n.containerInfo), De(n, t), on = u, Ne(t), o & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            Vi(n.containerInfo);
          } catch (ut) {
            Bt(t, t.return, ut);
          }
        xc && (xc = !1, E1(t));
        break;
      case 4:
        o = on, on = _o(
          t.stateNode.containerInfo
        ), De(n, t), Ne(t), on = o;
        break;
      case 12:
        De(n, t), Ne(t);
        break;
      case 31:
        De(n, t), Ne(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, po(t, o)));
        break;
      case 13:
        De(n, t), Ne(t), t.child.flags & 8192 && t.memoizedState !== null != (i !== null && i.memoizedState !== null) && (go = Le()), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, po(t, o)));
        break;
      case 22:
        u = t.memoizedState !== null;
        var z = i !== null && i.memoizedState !== null, q = Un, Z = oe;
        if (Un = q || u, oe = Z || z, De(n, t), oe = Z, Un = q, Ne(t), o & 8192)
          t: for (n = t.stateNode, n._visibility = u ? n._visibility & -2 : n._visibility | 1, u && (i === null || z || Un || oe || Ha(t)), i = null, n = t; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (i === null) {
                z = i = n;
                try {
                  if (d = z.stateNode, u)
                    x = d.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
                  else {
                    C = z.stateNode;
                    var W = z.memoizedProps.style, $ = W != null && W.hasOwnProperty("display") ? W.display : null;
                    C.style.display = $ == null || typeof $ == "boolean" ? "" : ("" + $).trim();
                  }
                } catch (ut) {
                  Bt(z, z.return, ut);
                }
              }
            } else if (n.tag === 6) {
              if (i === null) {
                z = n;
                try {
                  z.stateNode.nodeValue = u ? "" : z.memoizedProps;
                } catch (ut) {
                  Bt(z, z.return, ut);
                }
              }
            } else if (n.tag === 18) {
              if (i === null) {
                z = n;
                try {
                  var X = z.stateNode;
                  u ? m0(X, !0) : m0(z.stateNode, !1);
                } catch (ut) {
                  Bt(z, z.return, ut);
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
        o & 4 && (o = t.updateQueue, o !== null && (i = o.retryQueue, i !== null && (o.retryQueue = null, po(t, i))));
        break;
      case 19:
        De(n, t), Ne(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, po(t, o)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        De(n, t), Ne(t);
    }
  }
  function Ne(t) {
    var n = t.flags;
    if (n & 2) {
      try {
        for (var i, o = t.return; o !== null; ) {
          if (y1(o)) {
            i = o;
            break;
          }
          o = o.return;
        }
        if (i == null) throw Error(s(160));
        switch (i.tag) {
          case 27:
            var u = i.stateNode, d = vc(t);
            mo(t, d, u);
            break;
          case 5:
            var x = i.stateNode;
            i.flags & 32 && (si(x, ""), i.flags &= -33);
            var C = vc(t);
            mo(t, C, x);
            break;
          case 3:
          case 4:
            var z = i.stateNode.containerInfo, q = vc(t);
            bc(
              t,
              q,
              z
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (Z) {
        Bt(t, t.return, Z);
      }
      t.flags &= -3;
    }
    n & 4096 && (t.flags &= -4097);
  }
  function E1(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var n = t;
        E1(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), t = t.sibling;
      }
  }
  function Hn(t, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        b1(t, n.alternate, n), n = n.sibling;
  }
  function Ha(t) {
    for (t = t.child; t !== null; ) {
      var n = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          la(4, n, n.return), Ha(n);
          break;
        case 1:
          xn(n, n.return);
          var i = n.stateNode;
          typeof i.componentWillUnmount == "function" && m1(
            n,
            n.return,
            i
          ), Ha(n);
          break;
        case 27:
          Xl(n.stateNode);
        case 26:
        case 5:
          xn(n, n.return), Ha(n);
          break;
        case 22:
          n.memoizedState === null && Ha(n);
          break;
        case 30:
          Ha(n);
          break;
        default:
          Ha(n);
      }
      t = t.sibling;
    }
  }
  function qn(t, n, i) {
    for (i = i && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var o = n.alternate, u = t, d = n, x = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          qn(
            u,
            d,
            i
          ), Ll(4, d);
          break;
        case 1:
          if (qn(
            u,
            d,
            i
          ), o = d, u = o.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (q) {
              Bt(o, o.return, q);
            }
          if (o = d, u = o.updateQueue, u !== null) {
            var C = o.stateNode;
            try {
              var z = u.shared.hiddenCallbacks;
              if (z !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < z.length; u++)
                  np(z[u], C);
            } catch (q) {
              Bt(o, o.return, q);
            }
          }
          i && x & 64 && h1(d), Bl(d, d.return);
          break;
        case 27:
          g1(d);
        case 26:
        case 5:
          qn(
            u,
            d,
            i
          ), i && o === null && x & 4 && p1(d), Bl(d, d.return);
          break;
        case 12:
          qn(
            u,
            d,
            i
          );
          break;
        case 31:
          qn(
            u,
            d,
            i
          ), i && x & 4 && w1(u, d);
          break;
        case 13:
          qn(
            u,
            d,
            i
          ), i && x & 4 && T1(u, d);
          break;
        case 22:
          d.memoizedState === null && qn(
            u,
            d,
            i
          ), Bl(d, d.return);
          break;
        case 30:
          break;
        default:
          qn(
            u,
            d,
            i
          );
      }
      n = n.sibling;
    }
  }
  function Sc(t, n) {
    var i = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), t = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (t = n.memoizedState.cachePool.pool), t !== i && (t != null && t.refCount++, i != null && wl(i));
  }
  function wc(t, n) {
    t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && wl(t));
  }
  function rn(t, n, i, o) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        A1(
          t,
          n,
          i,
          o
        ), n = n.sibling;
  }
  function A1(t, n, i, o) {
    var u = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        rn(
          t,
          n,
          i,
          o
        ), u & 2048 && Ll(9, n);
        break;
      case 1:
        rn(
          t,
          n,
          i,
          o
        );
        break;
      case 3:
        rn(
          t,
          n,
          i,
          o
        ), u & 2048 && (t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && wl(t)));
        break;
      case 12:
        if (u & 2048) {
          rn(
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
          } catch (z) {
            Bt(n, n.return, z);
          }
        } else
          rn(
            t,
            n,
            i,
            o
          );
        break;
      case 31:
        rn(
          t,
          n,
          i,
          o
        );
        break;
      case 13:
        rn(
          t,
          n,
          i,
          o
        );
        break;
      case 23:
        break;
      case 22:
        d = n.stateNode, x = n.alternate, n.memoizedState !== null ? d._visibility & 2 ? rn(
          t,
          n,
          i,
          o
        ) : Vl(t, n) : d._visibility & 2 ? rn(
          t,
          n,
          i,
          o
        ) : (d._visibility |= 2, Ai(
          t,
          n,
          i,
          o,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && Sc(x, n);
        break;
      case 24:
        rn(
          t,
          n,
          i,
          o
        ), u & 2048 && wc(n.alternate, n);
        break;
      default:
        rn(
          t,
          n,
          i,
          o
        );
    }
  }
  function Ai(t, n, i, o, u) {
    for (u = u && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var d = t, x = n, C = i, z = o, q = x.flags;
      switch (x.tag) {
        case 0:
        case 11:
        case 15:
          Ai(
            d,
            x,
            C,
            z,
            u
          ), Ll(8, x);
          break;
        case 23:
          break;
        case 22:
          var Z = x.stateNode;
          x.memoizedState !== null ? Z._visibility & 2 ? Ai(
            d,
            x,
            C,
            z,
            u
          ) : Vl(
            d,
            x
          ) : (Z._visibility |= 2, Ai(
            d,
            x,
            C,
            z,
            u
          )), u && q & 2048 && Sc(
            x.alternate,
            x
          );
          break;
        case 24:
          Ai(
            d,
            x,
            C,
            z,
            u
          ), u && q & 2048 && wc(x.alternate, x);
          break;
        default:
          Ai(
            d,
            x,
            C,
            z,
            u
          );
      }
      n = n.sibling;
    }
  }
  function Vl(t, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var i = t, o = n, u = o.flags;
        switch (o.tag) {
          case 22:
            Vl(i, o), u & 2048 && Sc(
              o.alternate,
              o
            );
            break;
          case 24:
            Vl(i, o), u & 2048 && wc(o.alternate, o);
            break;
          default:
            Vl(i, o);
        }
        n = n.sibling;
      }
  }
  var Ul = 8192;
  function ji(t, n, i) {
    if (t.subtreeFlags & Ul)
      for (t = t.child; t !== null; )
        j1(
          t,
          n,
          i
        ), t = t.sibling;
  }
  function j1(t, n, i) {
    switch (t.tag) {
      case 26:
        ji(
          t,
          n,
          i
        ), t.flags & Ul && t.memoizedState !== null && T3(
          i,
          on,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        ji(
          t,
          n,
          i
        );
        break;
      case 3:
      case 4:
        var o = on;
        on = _o(t.stateNode.containerInfo), ji(
          t,
          n,
          i
        ), on = o;
        break;
      case 22:
        t.memoizedState === null && (o = t.alternate, o !== null && o.memoizedState !== null ? (o = Ul, Ul = 16777216, ji(
          t,
          n,
          i
        ), Ul = o) : ji(
          t,
          n,
          i
        ));
        break;
      default:
        ji(
          t,
          n,
          i
        );
    }
  }
  function M1(t) {
    var n = t.alternate;
    if (n !== null && (t = n.child, t !== null)) {
      n.child = null;
      do
        n = t.sibling, t.sibling = null, t = n;
      while (t !== null);
    }
  }
  function kl(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          pe = o, R1(
            o,
            t
          );
        }
      M1(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        _1(t), t = t.sibling;
  }
  function _1(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        kl(t), t.flags & 2048 && la(9, t, t.return);
        break;
      case 3:
        kl(t);
        break;
      case 12:
        kl(t);
        break;
      case 22:
        var n = t.stateNode;
        t.memoizedState !== null && n._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (n._visibility &= -3, yo(t)) : kl(t);
        break;
      default:
        kl(t);
    }
  }
  function yo(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          pe = o, R1(
            o,
            t
          );
        }
      M1(t);
    }
    for (t = t.child; t !== null; ) {
      switch (n = t, n.tag) {
        case 0:
        case 11:
        case 15:
          la(8, n, n.return), yo(n);
          break;
        case 22:
          i = n.stateNode, i._visibility & 2 && (i._visibility &= -3, yo(n));
          break;
        default:
          yo(n);
      }
      t = t.sibling;
    }
  }
  function R1(t, n) {
    for (; pe !== null; ) {
      var i = pe;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          la(8, i, n);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var o = i.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          wl(i.memoizedState.cache);
      }
      if (o = i.child, o !== null) o.return = i, pe = o;
      else
        t: for (i = t; pe !== null; ) {
          o = pe;
          var u = o.sibling, d = o.return;
          if (x1(o), o === i) {
            pe = null;
            break t;
          }
          if (u !== null) {
            u.return = d, pe = u;
            break t;
          }
          pe = d;
        }
    }
  }
  var US = {
    getCacheForType: function(t) {
      var n = ve(ie), i = n.data.get(t);
      return i === void 0 && (i = t(), n.data.set(t, i)), i;
    },
    cacheSignal: function() {
      return ve(ie).controller.signal;
    }
  }, kS = typeof WeakMap == "function" ? WeakMap : Map, Ot = 0, qt = null, Tt = null, Et = 0, Lt = 0, $e = null, sa = !1, Mi = !1, Tc = !1, $n = 0, Wt = 0, oa = 0, qa = 0, Cc = 0, Ge = 0, _i = 0, Hl = null, Oe = null, Ec = !1, go = 0, D1 = 0, vo = 1 / 0, bo = null, ra = null, fe = 0, ua = null, Ri = null, Gn = 0, Ac = 0, jc = null, N1 = null, ql = 0, Mc = null;
  function Ye() {
    return (Ot & 2) !== 0 && Et !== 0 ? Et & -Et : O.T !== null ? zc() : Zh();
  }
  function O1() {
    if (Ge === 0)
      if ((Et & 536870912) === 0 || jt) {
        var t = As;
        As <<= 1, (As & 3932160) === 0 && (As = 262144), Ge = t;
      } else Ge = 536870912;
    return t = He.current, t !== null && (t.flags |= 32), Ge;
  }
  function ze(t, n, i) {
    (t === qt && (Lt === 2 || Lt === 9) || t.cancelPendingCommit !== null) && (Di(t, 0), ca(
      t,
      Et,
      Ge,
      !1
    )), rl(t, i), ((Ot & 2) === 0 || t !== qt) && (t === qt && ((Ot & 2) === 0 && (qa |= i), Wt === 4 && ca(
      t,
      Et,
      Ge,
      !1
    )), Sn(t));
  }
  function z1(t, n, i) {
    if ((Ot & 6) !== 0) throw Error(s(327));
    var o = !i && (n & 127) === 0 && (n & t.expiredLanes) === 0 || ol(t, n), u = o ? $S(t, n) : Rc(t, n, !0), d = o;
    do {
      if (u === 0) {
        Mi && !o && ca(t, n, 0, !1);
        break;
      } else {
        if (i = t.current.alternate, d && !HS(i)) {
          u = Rc(t, n, !1), d = !1;
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
              u = Hl;
              var z = C.current.memoizedState.isDehydrated;
              if (z && (Di(C, x).flags |= 256), x = Rc(
                C,
                x,
                !1
              ), x !== 2) {
                if (Tc && !z) {
                  C.errorRecoveryDisabledLanes |= d, qa |= d, u = 4;
                  break t;
                }
                d = Oe, Oe = u, d !== null && (Oe === null ? Oe = d : Oe.push.apply(
                  Oe,
                  d
                ));
              }
              u = x;
            }
            if (d = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Di(t, 0), ca(t, n, 0, !0);
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
              ca(
                o,
                n,
                Ge,
                !sa
              );
              break t;
            case 2:
              Oe = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((n & 62914560) === n && (u = go + 300 - Le(), 10 < u)) {
            if (ca(
              o,
              n,
              Ge,
              !sa
            ), Ms(o, 0, !0) !== 0) break t;
            Gn = n, o.timeoutHandle = f0(
              L1.bind(
                null,
                o,
                i,
                Oe,
                bo,
                Ec,
                n,
                Ge,
                qa,
                _i,
                sa,
                d,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break t;
          }
          L1(
            o,
            i,
            Oe,
            bo,
            Ec,
            n,
            Ge,
            qa,
            _i,
            sa,
            d,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Sn(t);
  }
  function L1(t, n, i, o, u, d, x, C, z, q, Z, W, $, X) {
    if (t.timeoutHandle = -1, W = n.subtreeFlags, W & 8192 || (W & 16785408) === 16785408) {
      W = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Mn
      }, j1(
        n,
        d,
        W
      );
      var ut = (d & 62914560) === d ? go - Le() : (d & 4194048) === d ? D1 - Le() : 0;
      if (ut = C3(
        W,
        ut
      ), ut !== null) {
        Gn = d, t.cancelPendingCommit = ut(
          G1.bind(
            null,
            t,
            n,
            d,
            i,
            o,
            u,
            x,
            C,
            z,
            Z,
            W,
            null,
            $,
            X
          )
        ), ca(t, d, x, !q);
        return;
      }
    }
    G1(
      t,
      n,
      d,
      i,
      o,
      u,
      x,
      C,
      z
    );
  }
  function HS(t) {
    for (var n = t; ; ) {
      var i = n.tag;
      if ((i === 0 || i === 11 || i === 15) && n.flags & 16384 && (i = n.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var o = 0; o < i.length; o++) {
          var u = i[o], d = u.getSnapshot;
          u = u.value;
          try {
            if (!Ue(d(), u)) return !1;
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
  function ca(t, n, i, o) {
    n &= ~Cc, n &= ~qa, t.suspendedLanes |= n, t.pingedLanes &= ~n, o && (t.warmLanes |= n), o = t.expirationTimes;
    for (var u = n; 0 < u; ) {
      var d = 31 - Ve(u), x = 1 << d;
      o[d] = -1, u &= ~x;
    }
    i !== 0 && Xh(t, i, n);
  }
  function xo() {
    return (Ot & 6) === 0 ? ($l(0), !1) : !0;
  }
  function _c() {
    if (Tt !== null) {
      if (Lt === 0)
        var t = Tt.return;
      else
        t = Tt, Nn = Na = null, Xu(t), Si = null, Cl = 0, t = Tt;
      for (; t !== null; )
        d1(t.alternate, t), t = t.return;
      Tt = null;
    }
  }
  function Di(t, n) {
    var i = t.timeoutHandle;
    i !== -1 && (t.timeoutHandle = -1, s3(i)), i = t.cancelPendingCommit, i !== null && (t.cancelPendingCommit = null, i()), Gn = 0, _c(), qt = t, Tt = i = Rn(t.current, null), Et = n, Lt = 0, $e = null, sa = !1, Mi = ol(t, n), Tc = !1, _i = Ge = Cc = qa = oa = Wt = 0, Oe = Hl = null, Ec = !1, (n & 8) !== 0 && (n |= n & 32);
    var o = t.entangledLanes;
    if (o !== 0)
      for (t = t.entanglements, o &= n; 0 < o; ) {
        var u = 31 - Ve(o), d = 1 << u;
        n |= t[u], o &= ~d;
      }
    return $n = n, Hs(), i;
  }
  function B1(t, n) {
    xt = null, O.H = Nl, n === xi || n === Zs ? (n = Wm(), Lt = 3) : n === Ou ? (n = Wm(), Lt = 4) : Lt = n === oc ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, $e = n, Tt === null && (Wt = 1, ro(
      t,
      Fe(n, t.current)
    ));
  }
  function V1() {
    var t = He.current;
    return t === null ? !0 : (Et & 4194048) === Et ? tn === null : (Et & 62914560) === Et || (Et & 536870912) !== 0 ? t === tn : !1;
  }
  function U1() {
    var t = O.H;
    return O.H = Nl, t === null ? Nl : t;
  }
  function k1() {
    var t = O.A;
    return O.A = US, t;
  }
  function So() {
    Wt = 4, sa || (Et & 4194048) !== Et && He.current !== null || (Mi = !0), (oa & 134217727) === 0 && (qa & 134217727) === 0 || qt === null || ca(
      qt,
      Et,
      Ge,
      !1
    );
  }
  function Rc(t, n, i) {
    var o = Ot;
    Ot |= 2;
    var u = U1(), d = k1();
    (qt !== t || Et !== n) && (bo = null, Di(t, n)), n = !1;
    var x = Wt;
    t: do
      try {
        if (Lt !== 0 && Tt !== null) {
          var C = Tt, z = $e;
          switch (Lt) {
            case 8:
              _c(), x = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              He.current === null && (n = !0);
              var q = Lt;
              if (Lt = 0, $e = null, Ni(t, C, z, q), i && Mi) {
                x = 0;
                break t;
              }
              break;
            default:
              q = Lt, Lt = 0, $e = null, Ni(t, C, z, q);
          }
        }
        qS(), x = Wt;
        break;
      } catch (Z) {
        B1(t, Z);
      }
    while (!0);
    return n && t.shellSuspendCounter++, Nn = Na = null, Ot = o, O.H = u, O.A = d, Tt === null && (qt = null, Et = 0, Hs()), x;
  }
  function qS() {
    for (; Tt !== null; ) H1(Tt);
  }
  function $S(t, n) {
    var i = Ot;
    Ot |= 2;
    var o = U1(), u = k1();
    qt !== t || Et !== n ? (bo = null, vo = Le() + 500, Di(t, n)) : Mi = ol(
      t,
      n
    );
    t: do
      try {
        if (Lt !== 0 && Tt !== null) {
          n = Tt;
          var d = $e;
          e: switch (Lt) {
            case 1:
              Lt = 0, $e = null, Ni(t, n, d, 1);
              break;
            case 2:
            case 9:
              if (Fm(d)) {
                Lt = 0, $e = null, q1(n);
                break;
              }
              n = function() {
                Lt !== 2 && Lt !== 9 || qt !== t || (Lt = 7), Sn(t);
              }, d.then(n, n);
              break t;
            case 3:
              Lt = 7;
              break t;
            case 4:
              Lt = 5;
              break t;
            case 7:
              Fm(d) ? (Lt = 0, $e = null, q1(n)) : (Lt = 0, $e = null, Ni(t, n, d, 7));
              break;
            case 5:
              var x = null;
              switch (Tt.tag) {
                case 26:
                  x = Tt.memoizedState;
                case 5:
                case 27:
                  var C = Tt;
                  if (x ? A0(x) : C.stateNode.complete) {
                    Lt = 0, $e = null;
                    var z = C.sibling;
                    if (z !== null) Tt = z;
                    else {
                      var q = C.return;
                      q !== null ? (Tt = q, wo(q)) : Tt = null;
                    }
                    break e;
                  }
              }
              Lt = 0, $e = null, Ni(t, n, d, 5);
              break;
            case 6:
              Lt = 0, $e = null, Ni(t, n, d, 6);
              break;
            case 8:
              _c(), Wt = 6;
              break t;
            default:
              throw Error(s(462));
          }
        }
        GS();
        break;
      } catch (Z) {
        B1(t, Z);
      }
    while (!0);
    return Nn = Na = null, O.H = o, O.A = u, Ot = i, Tt !== null ? 0 : (qt = null, Et = 0, Hs(), Wt);
  }
  function GS() {
    for (; Tt !== null && !dx(); )
      H1(Tt);
  }
  function H1(t) {
    var n = c1(t.alternate, t, $n);
    t.memoizedProps = t.pendingProps, n === null ? wo(t) : Tt = n;
  }
  function q1(t) {
    var n = t, i = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = i1(
          i,
          n,
          n.pendingProps,
          n.type,
          void 0,
          Et
        );
        break;
      case 11:
        n = i1(
          i,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          Et
        );
        break;
      case 5:
        Xu(n);
      default:
        d1(i, n), n = Tt = km(n, $n), n = c1(i, n, $n);
    }
    t.memoizedProps = t.pendingProps, n === null ? wo(t) : Tt = n;
  }
  function Ni(t, n, i, o) {
    Nn = Na = null, Xu(n), Si = null, Cl = 0;
    var u = n.return;
    try {
      if (DS(
        t,
        u,
        n,
        i,
        Et
      )) {
        Wt = 1, ro(
          t,
          Fe(i, t.current)
        ), Tt = null;
        return;
      }
    } catch (d) {
      if (u !== null) throw Tt = u, d;
      Wt = 1, ro(
        t,
        Fe(i, t.current)
      ), Tt = null;
      return;
    }
    n.flags & 32768 ? (jt || o === 1 ? t = !0 : Mi || (Et & 536870912) !== 0 ? t = !1 : (sa = t = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = He.current, o !== null && o.tag === 13 && (o.flags |= 16384))), $1(n, t)) : wo(n);
  }
  function wo(t) {
    var n = t;
    do {
      if ((n.flags & 32768) !== 0) {
        $1(
          n,
          sa
        );
        return;
      }
      t = n.return;
      var i = zS(
        n.alternate,
        n,
        $n
      );
      if (i !== null) {
        Tt = i;
        return;
      }
      if (n = n.sibling, n !== null) {
        Tt = n;
        return;
      }
      Tt = n = t;
    } while (n !== null);
    Wt === 0 && (Wt = 5);
  }
  function $1(t, n) {
    do {
      var i = LS(t.alternate, t);
      if (i !== null) {
        i.flags &= 32767, Tt = i;
        return;
      }
      if (i = t.return, i !== null && (i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null), !n && (t = t.sibling, t !== null)) {
        Tt = t;
        return;
      }
      Tt = t = i;
    } while (t !== null);
    Wt = 6, Tt = null;
  }
  function G1(t, n, i, o, u, d, x, C, z) {
    t.cancelPendingCommit = null;
    do
      To();
    while (fe !== 0);
    if ((Ot & 6) !== 0) throw Error(s(327));
    if (n !== null) {
      if (n === t.current) throw Error(s(177));
      if (d = n.lanes | n.childLanes, d |= vu, wx(
        t,
        i,
        d,
        x,
        C,
        z
      ), t === qt && (Tt = qt = null, Et = 0), Ri = n, ua = t, Gn = i, Ac = d, jc = u, N1 = o, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, KS(Cs, function() {
        return Z1(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), o = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || o) {
        o = O.T, O.T = null, u = Y.p, Y.p = 2, x = Ot, Ot |= 4;
        try {
          BS(t, n, i);
        } finally {
          Ot = x, Y.p = u, O.T = o;
        }
      }
      fe = 1, Y1(), X1(), P1();
    }
  }
  function Y1() {
    if (fe === 1) {
      fe = 0;
      var t = ua, n = Ri, i = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || i) {
        i = O.T, O.T = null;
        var o = Y.p;
        Y.p = 2;
        var u = Ot;
        Ot |= 4;
        try {
          C1(n, t);
          var d = $c, x = Rm(t.containerInfo), C = d.focusedElem, z = d.selectionRange;
          if (x !== C && C && C.ownerDocument && _m(
            C.ownerDocument.documentElement,
            C
          )) {
            if (z !== null && hu(C)) {
              var q = z.start, Z = z.end;
              if (Z === void 0 && (Z = q), "selectionStart" in C)
                C.selectionStart = q, C.selectionEnd = Math.min(
                  Z,
                  C.value.length
                );
              else {
                var W = C.ownerDocument || document, $ = W && W.defaultView || window;
                if ($.getSelection) {
                  var X = $.getSelection(), ut = C.textContent.length, yt = Math.min(z.start, ut), kt = z.end === void 0 ? yt : Math.min(z.end, ut);
                  !X.extend && yt > kt && (x = kt, kt = yt, yt = x);
                  var U = Mm(
                    C,
                    yt
                  ), L = Mm(
                    C,
                    kt
                  );
                  if (U && L && (X.rangeCount !== 1 || X.anchorNode !== U.node || X.anchorOffset !== U.offset || X.focusNode !== L.node || X.focusOffset !== L.offset)) {
                    var H = W.createRange();
                    H.setStart(U.node, U.offset), X.removeAllRanges(), yt > kt ? (X.addRange(H), X.extend(L.node, L.offset)) : (H.setEnd(L.node, L.offset), X.addRange(H));
                  }
                }
              }
            }
            for (W = [], X = C; X = X.parentNode; )
              X.nodeType === 1 && W.push({
                element: X,
                left: X.scrollLeft,
                top: X.scrollTop
              });
            for (typeof C.focus == "function" && C.focus(), C = 0; C < W.length; C++) {
              var F = W[C];
              F.element.scrollLeft = F.left, F.element.scrollTop = F.top;
            }
          }
          Lo = !!qc, $c = qc = null;
        } finally {
          Ot = u, Y.p = o, O.T = i;
        }
      }
      t.current = n, fe = 2;
    }
  }
  function X1() {
    if (fe === 2) {
      fe = 0;
      var t = ua, n = Ri, i = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || i) {
        i = O.T, O.T = null;
        var o = Y.p;
        Y.p = 2;
        var u = Ot;
        Ot |= 4;
        try {
          b1(t, n.alternate, n);
        } finally {
          Ot = u, Y.p = o, O.T = i;
        }
      }
      fe = 3;
    }
  }
  function P1() {
    if (fe === 4 || fe === 3) {
      fe = 0, hx();
      var t = ua, n = Ri, i = Gn, o = N1;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? fe = 5 : (fe = 0, Ri = ua = null, K1(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (u === 0 && (ra = null), Zr(i), n = n.stateNode, Be && typeof Be.onCommitFiberRoot == "function")
        try {
          Be.onCommitFiberRoot(
            sl,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (o !== null) {
        n = O.T, u = Y.p, Y.p = 2, O.T = null;
        try {
          for (var d = t.onRecoverableError, x = 0; x < o.length; x++) {
            var C = o[x];
            d(C.value, {
              componentStack: C.stack
            });
          }
        } finally {
          O.T = n, Y.p = u;
        }
      }
      (Gn & 3) !== 0 && To(), Sn(t), u = t.pendingLanes, (i & 261930) !== 0 && (u & 42) !== 0 ? t === Mc ? ql++ : (ql = 0, Mc = t) : ql = 0, $l(0);
    }
  }
  function K1(t, n) {
    (t.pooledCacheLanes &= n) === 0 && (n = t.pooledCache, n != null && (t.pooledCache = null, wl(n)));
  }
  function To() {
    return Y1(), X1(), P1(), Z1();
  }
  function Z1() {
    if (fe !== 5) return !1;
    var t = ua, n = Ac;
    Ac = 0;
    var i = Zr(Gn), o = O.T, u = Y.p;
    try {
      Y.p = 32 > i ? 32 : i, O.T = null, i = jc, jc = null;
      var d = ua, x = Gn;
      if (fe = 0, Ri = ua = null, Gn = 0, (Ot & 6) !== 0) throw Error(s(331));
      var C = Ot;
      if (Ot |= 4, _1(d.current), A1(
        d,
        d.current,
        x,
        i
      ), Ot = C, $l(0, !1), Be && typeof Be.onPostCommitFiberRoot == "function")
        try {
          Be.onPostCommitFiberRoot(sl, d);
        } catch {
        }
      return !0;
    } finally {
      Y.p = u, O.T = o, K1(t, n);
    }
  }
  function Q1(t, n, i) {
    n = Fe(i, n), n = sc(t.stateNode, n, 2), t = na(t, n, 2), t !== null && (rl(t, 2), Sn(t));
  }
  function Bt(t, n, i) {
    if (t.tag === 3)
      Q1(t, t, i);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          Q1(
            n,
            t,
            i
          );
          break;
        } else if (n.tag === 1) {
          var o = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (ra === null || !ra.has(o))) {
            t = Fe(i, t), i = Fp(2), o = na(n, i, 2), o !== null && (Jp(
              i,
              o,
              n,
              t
            ), rl(o, 2), Sn(o));
            break;
          }
        }
        n = n.return;
      }
  }
  function Dc(t, n, i) {
    var o = t.pingCache;
    if (o === null) {
      o = t.pingCache = new kS();
      var u = /* @__PURE__ */ new Set();
      o.set(n, u);
    } else
      u = o.get(n), u === void 0 && (u = /* @__PURE__ */ new Set(), o.set(n, u));
    u.has(i) || (Tc = !0, u.add(i), t = YS.bind(null, t, n, i), n.then(t, t));
  }
  function YS(t, n, i) {
    var o = t.pingCache;
    o !== null && o.delete(n), t.pingedLanes |= t.suspendedLanes & i, t.warmLanes &= ~i, qt === t && (Et & i) === i && (Wt === 4 || Wt === 3 && (Et & 62914560) === Et && 300 > Le() - go ? (Ot & 2) === 0 && Di(t, 0) : Cc |= i, _i === Et && (_i = 0)), Sn(t);
  }
  function F1(t, n) {
    n === 0 && (n = Yh()), t = _a(t, n), t !== null && (rl(t, n), Sn(t));
  }
  function XS(t) {
    var n = t.memoizedState, i = 0;
    n !== null && (i = n.retryLane), F1(t, i);
  }
  function PS(t, n) {
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
    o !== null && o.delete(n), F1(t, i);
  }
  function KS(t, n) {
    return Yr(t, n);
  }
  var Co = null, Oi = null, Nc = !1, Eo = !1, Oc = !1, fa = 0;
  function Sn(t) {
    t !== Oi && t.next === null && (Oi === null ? Co = Oi = t : Oi = Oi.next = t), Eo = !0, Nc || (Nc = !0, QS());
  }
  function $l(t, n) {
    if (!Oc && Eo) {
      Oc = !0;
      do
        for (var i = !1, o = Co; o !== null; ) {
          if (t !== 0) {
            var u = o.pendingLanes;
            if (u === 0) var d = 0;
            else {
              var x = o.suspendedLanes, C = o.pingedLanes;
              d = (1 << 31 - Ve(42 | t) + 1) - 1, d &= u & ~(x & ~C), d = d & 201326741 ? d & 201326741 | 1 : d ? d | 2 : 0;
            }
            d !== 0 && (i = !0, t0(o, d));
          } else
            d = Et, d = Ms(
              o,
              o === qt ? d : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (d & 3) === 0 || ol(o, d) || (i = !0, t0(o, d));
          o = o.next;
        }
      while (i);
      Oc = !1;
    }
  }
  function ZS() {
    J1();
  }
  function J1() {
    Eo = Nc = !1;
    var t = 0;
    fa !== 0 && l3() && (t = fa);
    for (var n = Le(), i = null, o = Co; o !== null; ) {
      var u = o.next, d = W1(o, n);
      d === 0 ? (o.next = null, i === null ? Co = u : i.next = u, u === null && (Oi = i)) : (i = o, (t !== 0 || (d & 3) !== 0) && (Eo = !0)), o = u;
    }
    fe !== 0 && fe !== 5 || $l(t), fa !== 0 && (fa = 0);
  }
  function W1(t, n) {
    for (var i = t.suspendedLanes, o = t.pingedLanes, u = t.expirationTimes, d = t.pendingLanes & -62914561; 0 < d; ) {
      var x = 31 - Ve(d), C = 1 << x, z = u[x];
      z === -1 ? ((C & i) === 0 || (C & o) !== 0) && (u[x] = Sx(C, n)) : z <= n && (t.expiredLanes |= C), d &= ~C;
    }
    if (n = qt, i = Et, i = Ms(
      t,
      t === n ? i : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o = t.callbackNode, i === 0 || t === n && (Lt === 2 || Lt === 9) || t.cancelPendingCommit !== null)
      return o !== null && o !== null && Xr(o), t.callbackNode = null, t.callbackPriority = 0;
    if ((i & 3) === 0 || ol(t, i)) {
      if (n = i & -i, n === t.callbackPriority) return n;
      switch (o !== null && Xr(o), Zr(i)) {
        case 2:
        case 8:
          i = $h;
          break;
        case 32:
          i = Cs;
          break;
        case 268435456:
          i = Gh;
          break;
        default:
          i = Cs;
      }
      return o = I1.bind(null, t), i = Yr(i, o), t.callbackPriority = n, t.callbackNode = i, n;
    }
    return o !== null && o !== null && Xr(o), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function I1(t, n) {
    if (fe !== 0 && fe !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var i = t.callbackNode;
    if (To() && t.callbackNode !== i)
      return null;
    var o = Et;
    return o = Ms(
      t,
      t === qt ? o : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o === 0 ? null : (z1(t, o, n), W1(t, Le()), t.callbackNode != null && t.callbackNode === i ? I1.bind(null, t) : null);
  }
  function t0(t, n) {
    if (To()) return null;
    z1(t, n, !0);
  }
  function QS() {
    o3(function() {
      (Ot & 6) !== 0 ? Yr(
        qh,
        ZS
      ) : J1();
    });
  }
  function zc() {
    if (fa === 0) {
      var t = vi;
      t === 0 && (t = Es, Es <<= 1, (Es & 261888) === 0 && (Es = 256)), fa = t;
    }
    return fa;
  }
  function e0(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Ns("" + t);
  }
  function n0(t, n) {
    var i = n.ownerDocument.createElement("input");
    return i.name = n.name, i.value = n.value, t.id && i.setAttribute("form", t.id), n.parentNode.insertBefore(i, n), t = new FormData(t), i.parentNode.removeChild(i), t;
  }
  function FS(t, n, i, o, u) {
    if (n === "submit" && i && i.stateNode === u) {
      var d = e0(
        (u[Me] || null).action
      ), x = o.submitter;
      x && (n = (n = x[Me] || null) ? e0(n.formAction) : x.getAttribute("formAction"), n !== null && (d = n, x = null));
      var C = new Bs(
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
                if (fa !== 0) {
                  var z = x ? n0(u, x) : new FormData(u);
                  tc(
                    i,
                    {
                      pending: !0,
                      data: z,
                      method: u.method,
                      action: d
                    },
                    null,
                    z
                  );
                }
              } else
                typeof d == "function" && (C.preventDefault(), z = x ? n0(u, x) : new FormData(u), tc(
                  i,
                  {
                    pending: !0,
                    data: z,
                    method: u.method,
                    action: d
                  },
                  d,
                  z
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var Lc = 0; Lc < gu.length; Lc++) {
    var Bc = gu[Lc], JS = Bc.toLowerCase(), WS = Bc[0].toUpperCase() + Bc.slice(1);
    sn(
      JS,
      "on" + WS
    );
  }
  sn(Om, "onAnimationEnd"), sn(zm, "onAnimationIteration"), sn(Lm, "onAnimationStart"), sn("dblclick", "onDoubleClick"), sn("focusin", "onFocus"), sn("focusout", "onBlur"), sn(mS, "onTransitionRun"), sn(pS, "onTransitionStart"), sn(yS, "onTransitionCancel"), sn(Bm, "onTransitionEnd"), ii("onMouseEnter", ["mouseout", "mouseover"]), ii("onMouseLeave", ["mouseout", "mouseover"]), ii("onPointerEnter", ["pointerout", "pointerover"]), ii("onPointerLeave", ["pointerout", "pointerover"]), Ea(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ea(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ea("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ea(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ea(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ea(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Gl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), IS = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Gl)
  );
  function a0(t, n) {
    n = (n & 4) !== 0;
    for (var i = 0; i < t.length; i++) {
      var o = t[i], u = o.event;
      o = o.listeners;
      t: {
        var d = void 0;
        if (n)
          for (var x = o.length - 1; 0 <= x; x--) {
            var C = o[x], z = C.instance, q = C.currentTarget;
            if (C = C.listener, z !== d && u.isPropagationStopped())
              break t;
            d = C, u.currentTarget = q;
            try {
              d(u);
            } catch (Z) {
              ks(Z);
            }
            u.currentTarget = null, d = z;
          }
        else
          for (x = 0; x < o.length; x++) {
            if (C = o[x], z = C.instance, q = C.currentTarget, C = C.listener, z !== d && u.isPropagationStopped())
              break t;
            d = C, u.currentTarget = q;
            try {
              d(u);
            } catch (Z) {
              ks(Z);
            }
            u.currentTarget = null, d = z;
          }
      }
    }
  }
  function Ct(t, n) {
    var i = n[Qr];
    i === void 0 && (i = n[Qr] = /* @__PURE__ */ new Set());
    var o = t + "__bubble";
    i.has(o) || (i0(n, t, 2, !1), i.add(o));
  }
  function Vc(t, n, i) {
    var o = 0;
    n && (o |= 4), i0(
      i,
      t,
      o,
      n
    );
  }
  var Ao = "_reactListening" + Math.random().toString(36).slice(2);
  function Uc(t) {
    if (!t[Ao]) {
      t[Ao] = !0, Jh.forEach(function(i) {
        i !== "selectionchange" && (IS.has(i) || Vc(i, !1, t), Vc(i, !0, t));
      });
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[Ao] || (n[Ao] = !0, Vc("selectionchange", !1, n));
    }
  }
  function i0(t, n, i, o) {
    switch (O0(n)) {
      case 2:
        var u = j3;
        break;
      case 8:
        u = M3;
        break;
      default:
        u = Ic;
    }
    i = u.bind(
      null,
      n,
      i,
      t
    ), u = void 0, !iu || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (u = !0), o ? u !== void 0 ? t.addEventListener(n, i, {
      capture: !0,
      passive: u
    }) : t.addEventListener(n, i, !0) : u !== void 0 ? t.addEventListener(n, i, {
      passive: u
    }) : t.addEventListener(n, i, !1);
  }
  function kc(t, n, i, o, u) {
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
              var z = x.tag;
              if ((z === 3 || z === 4) && x.stateNode.containerInfo === u)
                return;
              x = x.return;
            }
          for (; C !== null; ) {
            if (x = ei(C), x === null) return;
            if (z = x.tag, z === 5 || z === 6 || z === 26 || z === 27) {
              o = d = x;
              continue t;
            }
            C = C.parentNode;
          }
        }
        o = o.return;
      }
    um(function() {
      var q = d, Z = nu(i), W = [];
      t: {
        var $ = Vm.get(t);
        if ($ !== void 0) {
          var X = Bs, ut = t;
          switch (t) {
            case "keypress":
              if (zs(i) === 0) break t;
            case "keydown":
            case "keyup":
              X = Px;
              break;
            case "focusin":
              ut = "focus", X = ru;
              break;
            case "focusout":
              ut = "blur", X = ru;
              break;
            case "beforeblur":
            case "afterblur":
              X = ru;
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
              X = dm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              X = zx;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              X = Qx;
              break;
            case Om:
            case zm:
            case Lm:
              X = Vx;
              break;
            case Bm:
              X = Jx;
              break;
            case "scroll":
            case "scrollend":
              X = Nx;
              break;
            case "wheel":
              X = Ix;
              break;
            case "copy":
            case "cut":
            case "paste":
              X = kx;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              X = mm;
              break;
            case "toggle":
            case "beforetoggle":
              X = eS;
          }
          var yt = (n & 4) !== 0, kt = !yt && (t === "scroll" || t === "scrollend"), U = yt ? $ !== null ? $ + "Capture" : null : $;
          yt = [];
          for (var L = q, H; L !== null; ) {
            var F = L;
            if (H = F.stateNode, F = F.tag, F !== 5 && F !== 26 && F !== 27 || H === null || U === null || (F = fl(L, U), F != null && yt.push(
              Yl(L, F, H)
            )), kt) break;
            L = L.return;
          }
          0 < yt.length && ($ = new X(
            $,
            ut,
            null,
            i,
            Z
          ), W.push({ event: $, listeners: yt }));
        }
      }
      if ((n & 7) === 0) {
        t: {
          if ($ = t === "mouseover" || t === "pointerover", X = t === "mouseout" || t === "pointerout", $ && i !== eu && (ut = i.relatedTarget || i.fromElement) && (ei(ut) || ut[ti]))
            break t;
          if ((X || $) && ($ = Z.window === Z ? Z : ($ = Z.ownerDocument) ? $.defaultView || $.parentWindow : window, X ? (ut = i.relatedTarget || i.toElement, X = q, ut = ut ? ei(ut) : null, ut !== null && (kt = c(ut), yt = ut.tag, ut !== kt || yt !== 5 && yt !== 27 && yt !== 6) && (ut = null)) : (X = null, ut = q), X !== ut)) {
            if (yt = dm, F = "onMouseLeave", U = "onMouseEnter", L = "mouse", (t === "pointerout" || t === "pointerover") && (yt = mm, F = "onPointerLeave", U = "onPointerEnter", L = "pointer"), kt = X == null ? $ : cl(X), H = ut == null ? $ : cl(ut), $ = new yt(
              F,
              L + "leave",
              X,
              i,
              Z
            ), $.target = kt, $.relatedTarget = H, F = null, ei(Z) === q && (yt = new yt(
              U,
              L + "enter",
              ut,
              i,
              Z
            ), yt.target = H, yt.relatedTarget = kt, F = yt), kt = F, X && ut)
              e: {
                for (yt = t3, U = X, L = ut, H = 0, F = U; F; F = yt(F))
                  H++;
                F = 0;
                for (var mt = L; mt; mt = yt(mt))
                  F++;
                for (; 0 < H - F; )
                  U = yt(U), H--;
                for (; 0 < F - H; )
                  L = yt(L), F--;
                for (; H--; ) {
                  if (U === L || L !== null && U === L.alternate) {
                    yt = U;
                    break e;
                  }
                  U = yt(U), L = yt(L);
                }
                yt = null;
              }
            else yt = null;
            X !== null && l0(
              W,
              $,
              X,
              yt,
              !1
            ), ut !== null && kt !== null && l0(
              W,
              kt,
              ut,
              yt,
              !0
            );
          }
        }
        t: {
          if ($ = q ? cl(q) : window, X = $.nodeName && $.nodeName.toLowerCase(), X === "select" || X === "input" && $.type === "file")
            var Rt = wm;
          else if (xm($))
            if (Tm)
              Rt = fS;
            else {
              Rt = uS;
              var ft = rS;
            }
          else
            X = $.nodeName, !X || X.toLowerCase() !== "input" || $.type !== "checkbox" && $.type !== "radio" ? q && tu(q.elementType) && (Rt = wm) : Rt = cS;
          if (Rt && (Rt = Rt(t, q))) {
            Sm(
              W,
              Rt,
              i,
              Z
            );
            break t;
          }
          ft && ft(t, $, q), t === "focusout" && q && $.type === "number" && q.memoizedProps.value != null && Ir($, "number", $.value);
        }
        switch (ft = q ? cl(q) : window, t) {
          case "focusin":
            (xm(ft) || ft.contentEditable === "true") && (ci = ft, mu = q, bl = null);
            break;
          case "focusout":
            bl = mu = ci = null;
            break;
          case "mousedown":
            pu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            pu = !1, Dm(W, i, Z);
            break;
          case "selectionchange":
            if (hS) break;
          case "keydown":
          case "keyup":
            Dm(W, i, Z);
        }
        var St;
        if (cu)
          t: {
            switch (t) {
              case "compositionstart":
                var At = "onCompositionStart";
                break t;
              case "compositionend":
                At = "onCompositionEnd";
                break t;
              case "compositionupdate":
                At = "onCompositionUpdate";
                break t;
            }
            At = void 0;
          }
        else
          ui ? vm(t, i) && (At = "onCompositionEnd") : t === "keydown" && i.keyCode === 229 && (At = "onCompositionStart");
        At && (pm && i.locale !== "ko" && (ui || At !== "onCompositionStart" ? At === "onCompositionEnd" && ui && (St = cm()) : (Qn = Z, lu = "value" in Qn ? Qn.value : Qn.textContent, ui = !0)), ft = jo(q, At), 0 < ft.length && (At = new hm(
          At,
          t,
          null,
          i,
          Z
        ), W.push({ event: At, listeners: ft }), St ? At.data = St : (St = bm(i), St !== null && (At.data = St)))), (St = aS ? iS(t, i) : lS(t, i)) && (At = jo(q, "onBeforeInput"), 0 < At.length && (ft = new hm(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          Z
        ), W.push({
          event: ft,
          listeners: At
        }), ft.data = St)), FS(
          W,
          t,
          q,
          i,
          Z
        );
      }
      a0(W, n);
    });
  }
  function Yl(t, n, i) {
    return {
      instance: t,
      listener: n,
      currentTarget: i
    };
  }
  function jo(t, n) {
    for (var i = n + "Capture", o = []; t !== null; ) {
      var u = t, d = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || d === null || (u = fl(t, i), u != null && o.unshift(
        Yl(t, u, d)
      ), u = fl(t, n), u != null && o.push(
        Yl(t, u, d)
      )), t.tag === 3) return o;
      t = t.return;
    }
    return [];
  }
  function t3(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function l0(t, n, i, o, u) {
    for (var d = n._reactName, x = []; i !== null && i !== o; ) {
      var C = i, z = C.alternate, q = C.stateNode;
      if (C = C.tag, z !== null && z === o) break;
      C !== 5 && C !== 26 && C !== 27 || q === null || (z = q, u ? (q = fl(i, d), q != null && x.unshift(
        Yl(i, q, z)
      )) : u || (q = fl(i, d), q != null && x.push(
        Yl(i, q, z)
      ))), i = i.return;
    }
    x.length !== 0 && t.push({ event: n, listeners: x });
  }
  var e3 = /\r\n?/g, n3 = /\u0000|\uFFFD/g;
  function s0(t) {
    return (typeof t == "string" ? t : "" + t).replace(e3, `
`).replace(n3, "");
  }
  function o0(t, n) {
    return n = s0(n), s0(t) === n;
  }
  function Ut(t, n, i, o, u, d) {
    switch (i) {
      case "children":
        typeof o == "string" ? n === "body" || n === "textarea" && o === "" || si(t, o) : (typeof o == "number" || typeof o == "bigint") && n !== "body" && si(t, "" + o);
        break;
      case "className":
        Rs(t, "class", o);
        break;
      case "tabIndex":
        Rs(t, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Rs(t, i, o);
        break;
      case "style":
        om(t, o, d);
        break;
      case "data":
        if (n !== "object") {
          Rs(t, "data", o);
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
        o = Ns("" + o), t.setAttribute(i, o);
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
          typeof d == "function" && (i === "formAction" ? (n !== "input" && Ut(t, n, "name", u.name, u, null), Ut(
            t,
            n,
            "formEncType",
            u.formEncType,
            u,
            null
          ), Ut(
            t,
            n,
            "formMethod",
            u.formMethod,
            u,
            null
          ), Ut(
            t,
            n,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (Ut(t, n, "encType", u.encType, u, null), Ut(t, n, "method", u.method, u, null), Ut(t, n, "target", u.target, u, null)));
        if (o == null || typeof o == "symbol" || typeof o == "boolean") {
          t.removeAttribute(i);
          break;
        }
        o = Ns("" + o), t.setAttribute(i, o);
        break;
      case "onClick":
        o != null && (t.onclick = Mn);
        break;
      case "onScroll":
        o != null && Ct("scroll", t);
        break;
      case "onScrollEnd":
        o != null && Ct("scrollend", t);
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
        i = Ns("" + o), t.setAttributeNS(
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
        Ct("beforetoggle", t), Ct("toggle", t), _s(t, "popover", o);
        break;
      case "xlinkActuate":
        jn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          o
        );
        break;
      case "xlinkArcrole":
        jn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          o
        );
        break;
      case "xlinkRole":
        jn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          o
        );
        break;
      case "xlinkShow":
        jn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          o
        );
        break;
      case "xlinkTitle":
        jn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          o
        );
        break;
      case "xlinkType":
        jn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          o
        );
        break;
      case "xmlBase":
        jn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          o
        );
        break;
      case "xmlLang":
        jn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          o
        );
        break;
      case "xmlSpace":
        jn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          o
        );
        break;
      case "is":
        _s(t, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = Rx.get(i) || i, _s(t, i, o));
    }
  }
  function Hc(t, n, i, o, u, d) {
    switch (i) {
      case "style":
        om(t, o, d);
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
        typeof o == "string" ? si(t, o) : (typeof o == "number" || typeof o == "bigint") && si(t, "" + o);
        break;
      case "onScroll":
        o != null && Ct("scroll", t);
        break;
      case "onScrollEnd":
        o != null && Ct("scrollend", t);
        break;
      case "onClick":
        o != null && (t.onclick = Mn);
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
        if (!Wh.hasOwnProperty(i))
          t: {
            if (i[0] === "o" && i[1] === "n" && (u = i.endsWith("Capture"), n = i.slice(2, u ? i.length - 7 : void 0), d = t[Me] || null, d = d != null ? d[i] : null, typeof d == "function" && t.removeEventListener(n, d, u), typeof o == "function")) {
              typeof d != "function" && d !== null && (i in t ? t[i] = null : t.hasAttribute(i) && t.removeAttribute(i)), t.addEventListener(n, o, u);
              break t;
            }
            i in t ? t[i] = o : o === !0 ? t.setAttribute(i, "") : _s(t, i, o);
          }
    }
  }
  function xe(t, n, i) {
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
        Ct("error", t), Ct("load", t);
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
                  Ut(t, n, d, x, i, null);
              }
          }
        u && Ut(t, n, "srcSet", i.srcSet, i, null), o && Ut(t, n, "src", i.src, i, null);
        return;
      case "input":
        Ct("invalid", t);
        var C = d = x = u = null, z = null, q = null;
        for (o in i)
          if (i.hasOwnProperty(o)) {
            var Z = i[o];
            if (Z != null)
              switch (o) {
                case "name":
                  u = Z;
                  break;
                case "type":
                  x = Z;
                  break;
                case "checked":
                  z = Z;
                  break;
                case "defaultChecked":
                  q = Z;
                  break;
                case "value":
                  d = Z;
                  break;
                case "defaultValue":
                  C = Z;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Z != null)
                    throw Error(s(137, n));
                  break;
                default:
                  Ut(t, n, o, Z, i, null);
              }
          }
        am(
          t,
          d,
          C,
          z,
          q,
          x,
          u,
          !1
        );
        return;
      case "select":
        Ct("invalid", t), o = x = d = null;
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
                Ut(t, n, u, C, i, null);
            }
        n = d, i = x, t.multiple = !!o, n != null ? li(t, !!o, n, !1) : i != null && li(t, !!o, i, !0);
        return;
      case "textarea":
        Ct("invalid", t), d = u = o = null;
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
                Ut(t, n, x, C, i, null);
            }
        lm(t, o, u, d);
        return;
      case "option":
        for (z in i)
          if (i.hasOwnProperty(z) && (o = i[z], o != null))
            switch (z) {
              case "selected":
                t.selected = o && typeof o != "function" && typeof o != "symbol";
                break;
              default:
                Ut(t, n, z, o, i, null);
            }
        return;
      case "dialog":
        Ct("beforetoggle", t), Ct("toggle", t), Ct("cancel", t), Ct("close", t);
        break;
      case "iframe":
      case "object":
        Ct("load", t);
        break;
      case "video":
      case "audio":
        for (o = 0; o < Gl.length; o++)
          Ct(Gl[o], t);
        break;
      case "image":
        Ct("error", t), Ct("load", t);
        break;
      case "details":
        Ct("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        Ct("error", t), Ct("load", t);
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
        for (q in i)
          if (i.hasOwnProperty(q) && (o = i[q], o != null))
            switch (q) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, n));
              default:
                Ut(t, n, q, o, i, null);
            }
        return;
      default:
        if (tu(n)) {
          for (Z in i)
            i.hasOwnProperty(Z) && (o = i[Z], o !== void 0 && Hc(
              t,
              n,
              Z,
              o,
              i,
              void 0
            ));
          return;
        }
    }
    for (C in i)
      i.hasOwnProperty(C) && (o = i[C], o != null && Ut(t, n, C, o, i, null));
  }
  function a3(t, n, i, o) {
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
        var u = null, d = null, x = null, C = null, z = null, q = null, Z = null;
        for (X in i) {
          var W = i[X];
          if (i.hasOwnProperty(X) && W != null)
            switch (X) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                z = W;
              default:
                o.hasOwnProperty(X) || Ut(t, n, X, null, o, W);
            }
        }
        for (var $ in o) {
          var X = o[$];
          if (W = i[$], o.hasOwnProperty($) && (X != null || W != null))
            switch ($) {
              case "type":
                d = X;
                break;
              case "name":
                u = X;
                break;
              case "checked":
                q = X;
                break;
              case "defaultChecked":
                Z = X;
                break;
              case "value":
                x = X;
                break;
              case "defaultValue":
                C = X;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (X != null)
                  throw Error(s(137, n));
                break;
              default:
                X !== W && Ut(
                  t,
                  n,
                  $,
                  X,
                  o,
                  W
                );
            }
        }
        Wr(
          t,
          x,
          C,
          z,
          q,
          Z,
          d,
          u
        );
        return;
      case "select":
        X = x = C = $ = null;
        for (d in i)
          if (z = i[d], i.hasOwnProperty(d) && z != null)
            switch (d) {
              case "value":
                break;
              case "multiple":
                X = z;
              default:
                o.hasOwnProperty(d) || Ut(
                  t,
                  n,
                  d,
                  null,
                  o,
                  z
                );
            }
        for (u in o)
          if (d = o[u], z = i[u], o.hasOwnProperty(u) && (d != null || z != null))
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
                d !== z && Ut(
                  t,
                  n,
                  u,
                  d,
                  o,
                  z
                );
            }
        n = C, i = x, o = X, $ != null ? li(t, !!i, $, !1) : !!o != !!i && (n != null ? li(t, !!i, n, !0) : li(t, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        X = $ = null;
        for (C in i)
          if (u = i[C], i.hasOwnProperty(C) && u != null && !o.hasOwnProperty(C))
            switch (C) {
              case "value":
                break;
              case "children":
                break;
              default:
                Ut(t, n, C, null, o, u);
            }
        for (x in o)
          if (u = o[x], d = i[x], o.hasOwnProperty(x) && (u != null || d != null))
            switch (x) {
              case "value":
                $ = u;
                break;
              case "defaultValue":
                X = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== d && Ut(t, n, x, u, o, d);
            }
        im(t, $, X);
        return;
      case "option":
        for (var ut in i)
          if ($ = i[ut], i.hasOwnProperty(ut) && $ != null && !o.hasOwnProperty(ut))
            switch (ut) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Ut(
                  t,
                  n,
                  ut,
                  null,
                  o,
                  $
                );
            }
        for (z in o)
          if ($ = o[z], X = i[z], o.hasOwnProperty(z) && $ !== X && ($ != null || X != null))
            switch (z) {
              case "selected":
                t.selected = $ && typeof $ != "function" && typeof $ != "symbol";
                break;
              default:
                Ut(
                  t,
                  n,
                  z,
                  $,
                  o,
                  X
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
        for (var yt in i)
          $ = i[yt], i.hasOwnProperty(yt) && $ != null && !o.hasOwnProperty(yt) && Ut(t, n, yt, null, o, $);
        for (q in o)
          if ($ = o[q], X = i[q], o.hasOwnProperty(q) && $ !== X && ($ != null || X != null))
            switch (q) {
              case "children":
              case "dangerouslySetInnerHTML":
                if ($ != null)
                  throw Error(s(137, n));
                break;
              default:
                Ut(
                  t,
                  n,
                  q,
                  $,
                  o,
                  X
                );
            }
        return;
      default:
        if (tu(n)) {
          for (var kt in i)
            $ = i[kt], i.hasOwnProperty(kt) && $ !== void 0 && !o.hasOwnProperty(kt) && Hc(
              t,
              n,
              kt,
              void 0,
              o,
              $
            );
          for (Z in o)
            $ = o[Z], X = i[Z], !o.hasOwnProperty(Z) || $ === X || $ === void 0 && X === void 0 || Hc(
              t,
              n,
              Z,
              $,
              o,
              X
            );
          return;
        }
    }
    for (var U in i)
      $ = i[U], i.hasOwnProperty(U) && $ != null && !o.hasOwnProperty(U) && Ut(t, n, U, null, o, $);
    for (W in o)
      $ = o[W], X = i[W], !o.hasOwnProperty(W) || $ === X || $ == null && X == null || Ut(t, n, W, $, o, X);
  }
  function r0(t) {
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
  function i3() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, n = 0, i = performance.getEntriesByType("resource"), o = 0; o < i.length; o++) {
        var u = i[o], d = u.transferSize, x = u.initiatorType, C = u.duration;
        if (d && C && r0(x)) {
          for (x = 0, C = u.responseEnd, o += 1; o < i.length; o++) {
            var z = i[o], q = z.startTime;
            if (q > C) break;
            var Z = z.transferSize, W = z.initiatorType;
            Z && r0(W) && (z = z.responseEnd, x += Z * (z < C ? 1 : (C - q) / (z - q)));
          }
          if (--o, n += 8 * (d + x) / (u.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return n / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var qc = null, $c = null;
  function Mo(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function u0(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function c0(t, n) {
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
  function Gc(t, n) {
    return t === "textarea" || t === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Yc = null;
  function l3() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Yc ? !1 : (Yc = t, !0) : (Yc = null, !1);
  }
  var f0 = typeof setTimeout == "function" ? setTimeout : void 0, s3 = typeof clearTimeout == "function" ? clearTimeout : void 0, d0 = typeof Promise == "function" ? Promise : void 0, o3 = typeof queueMicrotask == "function" ? queueMicrotask : typeof d0 < "u" ? function(t) {
    return d0.resolve(null).then(t).catch(r3);
  } : f0;
  function r3(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function da(t) {
    return t === "head";
  }
  function h0(t, n) {
    var i = n, o = 0;
    do {
      var u = i.nextSibling;
      if (t.removeChild(i), u && u.nodeType === 8)
        if (i = u.data, i === "/$" || i === "/&") {
          if (o === 0) {
            t.removeChild(u), Vi(n);
            return;
          }
          o--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          o++;
        else if (i === "html")
          Xl(t.ownerDocument.documentElement);
        else if (i === "head") {
          i = t.ownerDocument.head, Xl(i);
          for (var d = i.firstChild; d; ) {
            var x = d.nextSibling, C = d.nodeName;
            d[ul] || C === "SCRIPT" || C === "STYLE" || C === "LINK" && d.rel.toLowerCase() === "stylesheet" || i.removeChild(d), d = x;
          }
        } else
          i === "body" && Xl(t.ownerDocument.body);
      i = u;
    } while (i);
    Vi(n);
  }
  function m0(t, n) {
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
  function Xc(t) {
    var n = t.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var i = n;
      switch (n = n.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Xc(i), Fr(i);
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
  function u3(t, n, i, o) {
    for (; t.nodeType === 1; ) {
      var u = i;
      if (t.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!o && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (o) {
        if (!t[ul])
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
      if (t = en(t.nextSibling), t === null) break;
    }
    return null;
  }
  function c3(t, n, i) {
    if (n === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !i || (t = en(t.nextSibling), t === null)) return null;
    return t;
  }
  function p0(t, n) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = en(t.nextSibling), t === null)) return null;
    return t;
  }
  function Pc(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Kc(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function f3(t, n) {
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
  function en(t) {
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
  var Zc = null;
  function y0(t) {
    t = t.nextSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var i = t.data;
        if (i === "/$" || i === "/&") {
          if (n === 0)
            return en(t.nextSibling);
          n--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function g0(t) {
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
  function v0(t, n, i) {
    switch (n = Mo(i), t) {
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
  function Xl(t) {
    for (var n = t.attributes; n.length; )
      t.removeAttributeNode(n[0]);
    Fr(t);
  }
  var nn = /* @__PURE__ */ new Map(), b0 = /* @__PURE__ */ new Set();
  function _o(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Yn = Y.d;
  Y.d = {
    f: d3,
    r: h3,
    D: m3,
    C: p3,
    L: y3,
    m: g3,
    X: b3,
    S: v3,
    M: x3
  };
  function d3() {
    var t = Yn.f(), n = xo();
    return t || n;
  }
  function h3(t) {
    var n = ni(t);
    n !== null && n.tag === 5 && n.type === "form" ? Bp(n) : Yn.r(t);
  }
  var zi = typeof document > "u" ? null : document;
  function x0(t, n, i) {
    var o = zi;
    if (o && typeof n == "string" && n) {
      var u = Ze(n);
      u = 'link[rel="' + t + '"][href="' + u + '"]', typeof i == "string" && (u += '[crossorigin="' + i + '"]'), b0.has(u) || (b0.add(u), t = { rel: t, crossOrigin: i, href: n }, o.querySelector(u) === null && (n = o.createElement("link"), xe(n, "link", t), me(n), o.head.appendChild(n)));
    }
  }
  function m3(t) {
    Yn.D(t), x0("dns-prefetch", t, null);
  }
  function p3(t, n) {
    Yn.C(t, n), x0("preconnect", t, n);
  }
  function y3(t, n, i) {
    Yn.L(t, n, i);
    var o = zi;
    if (o && t && n) {
      var u = 'link[rel="preload"][as="' + Ze(n) + '"]';
      n === "image" && i && i.imageSrcSet ? (u += '[imagesrcset="' + Ze(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (u += '[imagesizes="' + Ze(
        i.imageSizes
      ) + '"]')) : u += '[href="' + Ze(t) + '"]';
      var d = u;
      switch (n) {
        case "style":
          d = Li(t);
          break;
        case "script":
          d = Bi(t);
      }
      nn.has(d) || (t = v(
        {
          rel: "preload",
          href: n === "image" && i && i.imageSrcSet ? void 0 : t,
          as: n
        },
        i
      ), nn.set(d, t), o.querySelector(u) !== null || n === "style" && o.querySelector(Pl(d)) || n === "script" && o.querySelector(Kl(d)) || (n = o.createElement("link"), xe(n, "link", t), me(n), o.head.appendChild(n)));
    }
  }
  function g3(t, n) {
    Yn.m(t, n);
    var i = zi;
    if (i && t) {
      var o = n && typeof n.as == "string" ? n.as : "script", u = 'link[rel="modulepreload"][as="' + Ze(o) + '"][href="' + Ze(t) + '"]', d = u;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          d = Bi(t);
      }
      if (!nn.has(d) && (t = v({ rel: "modulepreload", href: t }, n), nn.set(d, t), i.querySelector(u) === null)) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(Kl(d)))
              return;
        }
        o = i.createElement("link"), xe(o, "link", t), me(o), i.head.appendChild(o);
      }
    }
  }
  function v3(t, n, i) {
    Yn.S(t, n, i);
    var o = zi;
    if (o && t) {
      var u = ai(o).hoistableStyles, d = Li(t);
      n = n || "default";
      var x = u.get(d);
      if (!x) {
        var C = { loading: 0, preload: null };
        if (x = o.querySelector(
          Pl(d)
        ))
          C.loading = 5;
        else {
          t = v(
            { rel: "stylesheet", href: t, "data-precedence": n },
            i
          ), (i = nn.get(d)) && Qc(t, i);
          var z = x = o.createElement("link");
          me(z), xe(z, "link", t), z._p = new Promise(function(q, Z) {
            z.onload = q, z.onerror = Z;
          }), z.addEventListener("load", function() {
            C.loading |= 1;
          }), z.addEventListener("error", function() {
            C.loading |= 2;
          }), C.loading |= 4, Ro(x, n, o);
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
  function b3(t, n) {
    Yn.X(t, n);
    var i = zi;
    if (i && t) {
      var o = ai(i).hoistableScripts, u = Bi(t), d = o.get(u);
      d || (d = i.querySelector(Kl(u)), d || (t = v({ src: t, async: !0 }, n), (n = nn.get(u)) && Fc(t, n), d = i.createElement("script"), me(d), xe(d, "link", t), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, o.set(u, d));
    }
  }
  function x3(t, n) {
    Yn.M(t, n);
    var i = zi;
    if (i && t) {
      var o = ai(i).hoistableScripts, u = Bi(t), d = o.get(u);
      d || (d = i.querySelector(Kl(u)), d || (t = v({ src: t, async: !0, type: "module" }, n), (n = nn.get(u)) && Fc(t, n), d = i.createElement("script"), me(d), xe(d, "link", t), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, o.set(u, d));
    }
  }
  function S0(t, n, i, o) {
    var u = (u = ht.current) ? _o(u) : null;
    if (!u) throw Error(s(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (n = Li(i.href), i = ai(
          u
        ).hoistableStyles, o = i.get(n), o || (o = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          t = Li(i.href);
          var d = ai(
            u
          ).hoistableStyles, x = d.get(t);
          if (x || (u = u.ownerDocument || u, x = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, d.set(t, x), (d = u.querySelector(
            Pl(t)
          )) && !d._p && (x.instance = d, x.state.loading = 5), nn.has(t) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, nn.set(t, i), d || S3(
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
        return n = i.async, i = i.src, typeof i == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = Bi(i), i = ai(
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
  function Li(t) {
    return 'href="' + Ze(t) + '"';
  }
  function Pl(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function w0(t) {
    return v({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function S3(t, n, i, o) {
    t.querySelector('link[rel="preload"][as="style"][' + n + "]") ? o.loading = 1 : (n = t.createElement("link"), o.preload = n, n.addEventListener("load", function() {
      return o.loading |= 1;
    }), n.addEventListener("error", function() {
      return o.loading |= 2;
    }), xe(n, "link", i), me(n), t.head.appendChild(n));
  }
  function Bi(t) {
    return '[src="' + Ze(t) + '"]';
  }
  function Kl(t) {
    return "script[async]" + t;
  }
  function T0(t, n, i) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var o = t.querySelector(
            'style[data-href~="' + Ze(i.href) + '"]'
          );
          if (o)
            return n.instance = o, me(o), o;
          var u = v({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return o = (t.ownerDocument || t).createElement(
            "style"
          ), me(o), xe(o, "style", u), Ro(o, i.precedence, t), n.instance = o;
        case "stylesheet":
          u = Li(i.href);
          var d = t.querySelector(
            Pl(u)
          );
          if (d)
            return n.state.loading |= 4, n.instance = d, me(d), d;
          o = w0(i), (u = nn.get(u)) && Qc(o, u), d = (t.ownerDocument || t).createElement("link"), me(d);
          var x = d;
          return x._p = new Promise(function(C, z) {
            x.onload = C, x.onerror = z;
          }), xe(d, "link", o), n.state.loading |= 4, Ro(d, i.precedence, t), n.instance = d;
        case "script":
          return d = Bi(i.src), (u = t.querySelector(
            Kl(d)
          )) ? (n.instance = u, me(u), u) : (o = i, (u = nn.get(d)) && (o = v({}, i), Fc(o, u)), t = t.ownerDocument || t, u = t.createElement("script"), me(u), xe(u, "link", o), t.head.appendChild(u), n.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (o = n.instance, n.state.loading |= 4, Ro(o, i.precedence, t));
    return n.instance;
  }
  function Ro(t, n, i) {
    for (var o = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = o.length ? o[o.length - 1] : null, d = u, x = 0; x < o.length; x++) {
      var C = o[x];
      if (C.dataset.precedence === n) d = C;
      else if (d !== u) break;
    }
    d ? d.parentNode.insertBefore(t, d.nextSibling) : (n = i.nodeType === 9 ? i.head : i, n.insertBefore(t, n.firstChild));
  }
  function Qc(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.title == null && (t.title = n.title);
  }
  function Fc(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.integrity == null && (t.integrity = n.integrity);
  }
  var Do = null;
  function C0(t, n, i) {
    if (Do === null) {
      var o = /* @__PURE__ */ new Map(), u = Do = /* @__PURE__ */ new Map();
      u.set(i, o);
    } else
      u = Do, o = u.get(i), o || (o = /* @__PURE__ */ new Map(), u.set(i, o));
    if (o.has(t)) return o;
    for (o.set(t, null), i = i.getElementsByTagName(t), u = 0; u < i.length; u++) {
      var d = i[u];
      if (!(d[ul] || d[ye] || t === "link" && d.getAttribute("rel") === "stylesheet") && d.namespaceURI !== "http://www.w3.org/2000/svg") {
        var x = d.getAttribute(n) || "";
        x = t + x;
        var C = o.get(x);
        C ? C.push(d) : o.set(x, [d]);
      }
    }
    return o;
  }
  function E0(t, n, i) {
    t = t.ownerDocument || t, t.head.insertBefore(
      i,
      n === "title" ? t.querySelector("head > title") : null
    );
  }
  function w3(t, n, i) {
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
  function A0(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function T3(t, n, i, o) {
    if (i.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var u = Li(o.href), d = n.querySelector(
          Pl(u)
        );
        if (d) {
          n = d._p, n !== null && typeof n == "object" && typeof n.then == "function" && (t.count++, t = No.bind(t), n.then(t, t)), i.state.loading |= 4, i.instance = d, me(d);
          return;
        }
        d = n.ownerDocument || n, o = w0(o), (u = nn.get(u)) && Qc(o, u), d = d.createElement("link"), me(d);
        var x = d;
        x._p = new Promise(function(C, z) {
          x.onload = C, x.onerror = z;
        }), xe(d, "link", o), i.instance = d;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(i, n), (n = i.state.preload) && (i.state.loading & 3) === 0 && (t.count++, i = No.bind(t), n.addEventListener("load", i), n.addEventListener("error", i));
    }
  }
  var Jc = 0;
  function C3(t, n) {
    return t.stylesheets && t.count === 0 && zo(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(i) {
      var o = setTimeout(function() {
        if (t.stylesheets && zo(t, t.stylesheets), t.unsuspend) {
          var d = t.unsuspend;
          t.unsuspend = null, d();
        }
      }, 6e4 + n);
      0 < t.imgBytes && Jc === 0 && (Jc = 62500 * i3());
      var u = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && zo(t, t.stylesheets), t.unsuspend)) {
            var d = t.unsuspend;
            t.unsuspend = null, d();
          }
        },
        (t.imgBytes > Jc ? 50 : 800) + n
      );
      return t.unsuspend = i, function() {
        t.unsuspend = null, clearTimeout(o), clearTimeout(u);
      };
    } : null;
  }
  function No() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) zo(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Oo = null;
  function zo(t, n) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Oo = /* @__PURE__ */ new Map(), n.forEach(E3, t), Oo = null, No.call(t));
  }
  function E3(t, n) {
    if (!(n.state.loading & 4)) {
      var i = Oo.get(t);
      if (i) var o = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), Oo.set(t, i);
        for (var u = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), d = 0; d < u.length; d++) {
          var x = u[d];
          (x.nodeName === "LINK" || x.getAttribute("media") !== "not all") && (i.set(x.dataset.precedence, x), o = x);
        }
        o && i.set(null, o);
      }
      u = n.instance, x = u.getAttribute("data-precedence"), d = i.get(x) || o, d === o && i.set(null, u), i.set(x, u), this.count++, o = No.bind(this), u.addEventListener("load", o), u.addEventListener("error", o), d ? d.parentNode.insertBefore(u, d.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(u, t.firstChild)), n.state.loading |= 4;
    }
  }
  var Zl = {
    $$typeof: j,
    Provider: null,
    Consumer: null,
    _currentValue: Q,
    _currentValue2: Q,
    _threadCount: 0
  };
  function A3(t, n, i, o, u, d, x, C, z) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Pr(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Pr(0), this.hiddenUpdates = Pr(null), this.identifierPrefix = o, this.onUncaughtError = u, this.onCaughtError = d, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = z, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function j0(t, n, i, o, u, d, x, C, z, q, Z, W) {
    return t = new A3(
      t,
      n,
      i,
      x,
      z,
      q,
      Z,
      W,
      C
    ), n = 1, d === !0 && (n |= 24), d = ke(3, null, null, n), t.current = d, d.stateNode = t, n = Ru(), n.refCount++, t.pooledCache = n, n.refCount++, d.memoizedState = {
      element: o,
      isDehydrated: i,
      cache: n
    }, zu(d), t;
  }
  function M0(t) {
    return t ? (t = hi, t) : hi;
  }
  function _0(t, n, i, o, u, d) {
    u = M0(u), o.context === null ? o.context = u : o.pendingContext = u, o = ea(n), o.payload = { element: i }, d = d === void 0 ? null : d, d !== null && (o.callback = d), i = na(t, o, n), i !== null && (ze(i, t, n), Al(i, t, n));
  }
  function R0(t, n) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var i = t.retryLane;
      t.retryLane = i !== 0 && i < n ? i : n;
    }
  }
  function Wc(t, n) {
    R0(t, n), (t = t.alternate) && R0(t, n);
  }
  function D0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = _a(t, 67108864);
      n !== null && ze(n, t, 67108864), Wc(t, 67108864);
    }
  }
  function N0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Ye();
      n = Kr(n);
      var i = _a(t, n);
      i !== null && ze(i, t, n), Wc(t, n);
    }
  }
  var Lo = !0;
  function j3(t, n, i, o) {
    var u = O.T;
    O.T = null;
    var d = Y.p;
    try {
      Y.p = 2, Ic(t, n, i, o);
    } finally {
      Y.p = d, O.T = u;
    }
  }
  function M3(t, n, i, o) {
    var u = O.T;
    O.T = null;
    var d = Y.p;
    try {
      Y.p = 8, Ic(t, n, i, o);
    } finally {
      Y.p = d, O.T = u;
    }
  }
  function Ic(t, n, i, o) {
    if (Lo) {
      var u = tf(o);
      if (u === null)
        kc(
          t,
          n,
          o,
          Bo,
          i
        ), z0(t, o);
      else if (R3(
        u,
        t,
        n,
        i,
        o
      ))
        o.stopPropagation();
      else if (z0(t, o), n & 4 && -1 < _3.indexOf(t)) {
        for (; u !== null; ) {
          var d = ni(u);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (d = d.stateNode, d.current.memoizedState.isDehydrated) {
                  var x = Ca(d.pendingLanes);
                  if (x !== 0) {
                    var C = d;
                    for (C.pendingLanes |= 2, C.entangledLanes |= 2; x; ) {
                      var z = 1 << 31 - Ve(x);
                      C.entanglements[1] |= z, x &= ~z;
                    }
                    Sn(d), (Ot & 6) === 0 && (vo = Le() + 500, $l(0));
                  }
                }
                break;
              case 31:
              case 13:
                C = _a(d, 2), C !== null && ze(C, d, 2), xo(), Wc(d, 2);
            }
          if (d = tf(o), d === null && kc(
            t,
            n,
            o,
            Bo,
            i
          ), d === u) break;
          u = d;
        }
        u !== null && o.stopPropagation();
      } else
        kc(
          t,
          n,
          o,
          null,
          i
        );
    }
  }
  function tf(t) {
    return t = nu(t), ef(t);
  }
  var Bo = null;
  function ef(t) {
    if (Bo = null, t = ei(t), t !== null) {
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
    return Bo = t, null;
  }
  function O0(t) {
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
        switch (mx()) {
          case qh:
            return 2;
          case $h:
            return 8;
          case Cs:
          case px:
            return 32;
          case Gh:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var nf = !1, ha = null, ma = null, pa = null, Ql = /* @__PURE__ */ new Map(), Fl = /* @__PURE__ */ new Map(), ya = [], _3 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function z0(t, n) {
    switch (t) {
      case "focusin":
      case "focusout":
        ha = null;
        break;
      case "dragenter":
      case "dragleave":
        ma = null;
        break;
      case "mouseover":
      case "mouseout":
        pa = null;
        break;
      case "pointerover":
      case "pointerout":
        Ql.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Fl.delete(n.pointerId);
    }
  }
  function Jl(t, n, i, o, u, d) {
    return t === null || t.nativeEvent !== d ? (t = {
      blockedOn: n,
      domEventName: i,
      eventSystemFlags: o,
      nativeEvent: d,
      targetContainers: [u]
    }, n !== null && (n = ni(n), n !== null && D0(n)), t) : (t.eventSystemFlags |= o, n = t.targetContainers, u !== null && n.indexOf(u) === -1 && n.push(u), t);
  }
  function R3(t, n, i, o, u) {
    switch (n) {
      case "focusin":
        return ha = Jl(
          ha,
          t,
          n,
          i,
          o,
          u
        ), !0;
      case "dragenter":
        return ma = Jl(
          ma,
          t,
          n,
          i,
          o,
          u
        ), !0;
      case "mouseover":
        return pa = Jl(
          pa,
          t,
          n,
          i,
          o,
          u
        ), !0;
      case "pointerover":
        var d = u.pointerId;
        return Ql.set(
          d,
          Jl(
            Ql.get(d) || null,
            t,
            n,
            i,
            o,
            u
          )
        ), !0;
      case "gotpointercapture":
        return d = u.pointerId, Fl.set(
          d,
          Jl(
            Fl.get(d) || null,
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
  function L0(t) {
    var n = ei(t.target);
    if (n !== null) {
      var i = c(n);
      if (i !== null) {
        if (n = i.tag, n === 13) {
          if (n = f(i), n !== null) {
            t.blockedOn = n, Qh(t.priority, function() {
              N0(i);
            });
            return;
          }
        } else if (n === 31) {
          if (n = h(i), n !== null) {
            t.blockedOn = n, Qh(t.priority, function() {
              N0(i);
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
  function Vo(t) {
    if (t.blockedOn !== null) return !1;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var i = tf(t.nativeEvent);
      if (i === null) {
        i = t.nativeEvent;
        var o = new i.constructor(
          i.type,
          i
        );
        eu = o, i.target.dispatchEvent(o), eu = null;
      } else
        return n = ni(i), n !== null && D0(n), t.blockedOn = i, !1;
      n.shift();
    }
    return !0;
  }
  function B0(t, n, i) {
    Vo(t) && i.delete(n);
  }
  function D3() {
    nf = !1, ha !== null && Vo(ha) && (ha = null), ma !== null && Vo(ma) && (ma = null), pa !== null && Vo(pa) && (pa = null), Ql.forEach(B0), Fl.forEach(B0);
  }
  function Uo(t, n) {
    t.blockedOn === n && (t.blockedOn = null, nf || (nf = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      D3
    )));
  }
  var ko = null;
  function V0(t) {
    ko !== t && (ko = t, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        ko === t && (ko = null);
        for (var n = 0; n < t.length; n += 3) {
          var i = t[n], o = t[n + 1], u = t[n + 2];
          if (typeof o != "function") {
            if (ef(o || i) === null)
              continue;
            break;
          }
          var d = ni(i);
          d !== null && (t.splice(n, 3), n -= 3, tc(
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
  function Vi(t) {
    function n(z) {
      return Uo(z, t);
    }
    ha !== null && Uo(ha, t), ma !== null && Uo(ma, t), pa !== null && Uo(pa, t), Ql.forEach(n), Fl.forEach(n);
    for (var i = 0; i < ya.length; i++) {
      var o = ya[i];
      o.blockedOn === t && (o.blockedOn = null);
    }
    for (; 0 < ya.length && (i = ya[0], i.blockedOn === null); )
      L0(i), i.blockedOn === null && ya.shift();
    if (i = (t.ownerDocument || t).$$reactFormReplay, i != null)
      for (o = 0; o < i.length; o += 3) {
        var u = i[o], d = i[o + 1], x = u[Me] || null;
        if (typeof d == "function")
          x || V0(i);
        else if (x) {
          var C = null;
          if (d && d.hasAttribute("formAction")) {
            if (u = d, x = d[Me] || null)
              C = x.formAction;
            else if (ef(u) !== null) continue;
          } else C = x.action;
          typeof C == "function" ? i[o + 1] = C : (i.splice(o, 3), o -= 3), V0(i);
        }
      }
  }
  function U0() {
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
  function af(t) {
    this._internalRoot = t;
  }
  Ho.prototype.render = af.prototype.render = function(t) {
    var n = this._internalRoot;
    if (n === null) throw Error(s(409));
    var i = n.current, o = Ye();
    _0(i, o, t, n, null, null);
  }, Ho.prototype.unmount = af.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var n = t.containerInfo;
      _0(t.current, 2, null, t, null, null), xo(), n[ti] = null;
    }
  };
  function Ho(t) {
    this._internalRoot = t;
  }
  Ho.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var n = Zh();
      t = { blockedOn: null, target: t, priority: n };
      for (var i = 0; i < ya.length && n !== 0 && n < ya[i].priority; i++) ;
      ya.splice(i, 0, t), i === 0 && L0(t);
    }
  };
  var k0 = e.version;
  if (k0 !== "19.2.7")
    throw Error(
      s(
        527,
        k0,
        "19.2.7"
      )
    );
  Y.findDOMNode = function(t) {
    var n = t._reactInternals;
    if (n === void 0)
      throw typeof t.render == "function" ? Error(s(188)) : (t = Object.keys(t).join(","), Error(s(268, t)));
    return t = m(n), t = t !== null ? g(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var N3 = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: O,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var qo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!qo.isDisabled && qo.supportsFiber)
      try {
        sl = qo.inject(
          N3
        ), Be = qo;
      } catch {
      }
  }
  return Il.createRoot = function(t, n) {
    if (!r(t)) throw Error(s(299));
    var i = !1, o = "", u = Pp, d = Kp, x = Zp;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (u = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (x = n.onRecoverableError)), n = j0(
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
      U0
    ), t[ti] = n.current, Uc(t), new af(n);
  }, Il.hydrateRoot = function(t, n, i) {
    if (!r(t)) throw Error(s(299));
    var o = !1, u = "", d = Pp, x = Kp, C = Zp, z = null;
    return i != null && (i.unstable_strictMode === !0 && (o = !0), i.identifierPrefix !== void 0 && (u = i.identifierPrefix), i.onUncaughtError !== void 0 && (d = i.onUncaughtError), i.onCaughtError !== void 0 && (x = i.onCaughtError), i.onRecoverableError !== void 0 && (C = i.onRecoverableError), i.formState !== void 0 && (z = i.formState)), n = j0(
      t,
      1,
      !0,
      n,
      i ?? null,
      o,
      u,
      z,
      d,
      x,
      C,
      U0
    ), n.context = M0(null), i = n.current, o = Ye(), o = Kr(o), u = ea(o), u.callback = null, na(i, u, o), i = o, n.current.lanes = i, rl(n, i), Sn(n), t[ti] = n.current, Uc(t), new Ho(n);
  }, Il.version = "19.2.7", Il;
}
var Q0;
function Y3() {
  if (Q0) return of.exports;
  Q0 = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (e) {
        console.error(e);
      }
  }
  return a(), of.exports = G3(), of.exports;
}
var Ui = Y3(), ff = { exports: {} }, df = {};
var F0;
function X3() {
  if (F0) return df;
  F0 = 1;
  var a = bs().__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  return df.c = function(e) {
    return a.H.useMemoCache(e);
  }, df;
}
var J0;
function P3() {
  return J0 || (J0 = 1, ff.exports = X3()), ff.exports;
}
var wt = P3(), hf = { exports: {} }, mf = {};
var W0;
function K3() {
  if (W0) return mf;
  W0 = 1;
  var a = bs();
  function e(v, b) {
    return v === b && (v !== 0 || 1 / v === 1 / b) || v !== v && b !== b;
  }
  var l = typeof Object.is == "function" ? Object.is : e, s = a.useState, r = a.useEffect, c = a.useLayoutEffect, f = a.useDebugValue;
  function h(v, b) {
    var T = b(), S = s({ inst: { value: T, getSnapshot: b } }), w = S[0].inst, A = S[1];
    return c(
      function() {
        w.value = T, w.getSnapshot = b, y(w) && A({ inst: w });
      },
      [v, T, b]
    ), r(
      function() {
        return y(w) && A({ inst: w }), v(function() {
          y(w) && A({ inst: w });
        });
      },
      [v]
    ), f(T), T;
  }
  function y(v) {
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
  return mf.useSyncExternalStore = a.useSyncExternalStore !== void 0 ? a.useSyncExternalStore : g, mf;
}
var I0;
function Z3() {
  return I0 || (I0 = 1, hf.exports = K3()), hf.exports;
}
var Q3 = Z3();
const F3 = k3.useInsertionEffect, J3 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", W3 = J3 ? E.useLayoutEffect : E.useEffect, I3 = F3 || W3, rv = (a) => {
  const e = E.useRef([a, (...l) => e[0](...l)]).current;
  return I3(() => {
    e[0] = a;
  }), e[1];
};
function Ld(a, e) {
  a.indexOf(e) === -1 && a.push(e);
}
function mr(a, e) {
  const l = a.indexOf(e);
  l > -1 && a.splice(l, 1);
}
const En = (a, e, l) => l > e ? e : l < a ? a : l;
let Bd = () => {
};
const xa = {}, uv = (a) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(a), cv = (a) => typeof a == "object" && a !== null, fv = (a) => /^0[^.\s]+$/u.test(a);
// @__NO_SIDE_EFFECTS__
function dv(a) {
  let e;
  return () => (e === void 0 && (e = a()), e);
}
const ln = /* @__NO_SIDE_EFFECTS__ */ (a) => a, xs = (...a) => a.reduce((e, l) => (s) => l(e(s))), ds = /* @__NO_SIDE_EFFECTS__ */ (a, e, l) => {
  const s = e - a;
  return s ? (l - a) / s : 1;
};
class Vd {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return Ld(this.subscriptions, e), () => mr(this.subscriptions, e);
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
const Xe = /* @__NO_SIDE_EFFECTS__ */ (a) => a * 1e3, an = /* @__NO_SIDE_EFFECTS__ */ (a) => a / 1e3, hv = /* @__NO_SIDE_EFFECTS__ */ (a, e) => e ? a * (1e3 / e) : 0, mv = (a, e, l) => (((1 - 3 * l + 3 * e) * a + (3 * l - 6 * e)) * a + 3 * e) * a, t4 = 1e-7, e4 = 12;
function n4(a, e, l, s, r) {
  let c, f, h = 0;
  do
    f = e + (l - e) / 2, c = mv(f, s, r) - a, c > 0 ? l = f : e = f;
  while (Math.abs(c) > t4 && ++h < e4);
  return f;
}
// @__NO_SIDE_EFFECTS__
function Ss(a, e, l, s) {
  if (a === e && l === s)
    return ln;
  const r = (c) => n4(c, 0, 1, a, l);
  return (c) => c === 0 || c === 1 ? c : mv(r(c), e, s);
}
const pv = /* @__NO_SIDE_EFFECTS__ */ (a) => (e) => e <= 0.5 ? a(2 * e) / 2 : (2 - a(2 * (1 - e))) / 2, yv = /* @__NO_SIDE_EFFECTS__ */ (a) => (e) => 1 - a(1 - e), gv = /* @__PURE__ */ Ss(0.33, 1.53, 0.69, 0.99), Ud = /* @__PURE__ */ yv(gv), vv = /* @__PURE__ */ pv(Ud), bv = (a) => a >= 1 ? 1 : (a *= 2) < 1 ? 0.5 * Ud(a) : 0.5 * (2 - Math.pow(2, -10 * (a - 1))), kd = (a) => 1 - Math.sin(Math.acos(a)), xv = /* @__PURE__ */ yv(kd), Sv = /* @__PURE__ */ pv(kd), a4 = /* @__PURE__ */ Ss(0.42, 0, 1, 1), i4 = /* @__PURE__ */ Ss(0, 0, 0.58, 1), wv = /* @__PURE__ */ Ss(0.42, 0, 0.58, 1), l4 = /* @__NO_SIDE_EFFECTS__ */ (a) => Array.isArray(a) && typeof a[0] != "number", Tv = /* @__NO_SIDE_EFFECTS__ */ (a) => Array.isArray(a) && typeof a[0] == "number", s4 = {
  linear: ln,
  easeIn: a4,
  easeInOut: wv,
  easeOut: i4,
  circIn: kd,
  circInOut: Sv,
  circOut: xv,
  backIn: Ud,
  backInOut: vv,
  backOut: gv,
  anticipate: bv
}, o4 = (a) => typeof a == "string", ty = (a) => {
  if (/* @__PURE__ */ Tv(a)) {
    Bd(a.length === 4);
    const [e, l, s, r] = a;
    return /* @__PURE__ */ Ss(e, l, s, r);
  } else if (o4(a))
    return s4[a];
  return a;
}, Hd = E.createContext({}), qd = E.createContext({ strict: !1 }), $d = E.createContext({
  transformPagePoint: (a) => a,
  isStatic: !1,
  reducedMotion: "never"
}), _r = /* @__PURE__ */ E.createContext({}), $o = [
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
function r4(a) {
  let e = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), s = !1, r = !1;
  const c = /* @__PURE__ */ new WeakSet();
  let f = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function h(m) {
    c.has(m) && (y.schedule(m), a()), m(f);
  }
  const y = {
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
      e = l, l = g, e.forEach(h), e.clear(), s = !1, r && (r = !1, y.process(m));
    }
  };
  return y;
}
const u4 = 40;
function Cv(a, e) {
  let l = !1, s = !0;
  const r = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, c = () => l = !0, f = $o.reduce((j, D) => (j[D] = r4(c), j), {}), { setup: h, read: y, resolveKeyframes: m, preUpdate: g, update: v, preRender: b, render: T, postRender: S } = f, w = () => {
    const j = xa.useManualTiming, D = j ? r.timestamp : performance.now();
    l = !1, j || (r.delta = s ? 1e3 / 60 : Math.max(Math.min(D - r.timestamp, u4), 1)), r.timestamp = D, r.isProcessing = !0, h.process(r), y.process(r), m.process(r), g.process(r), v.process(r), b.process(r), T.process(r), S.process(r), r.isProcessing = !1, l && e && (s = !1, a(w));
  }, A = () => {
    l = !0, s = !0, r.isProcessing || a(w);
  };
  return { schedule: $o.reduce((j, D) => {
    const B = f[D];
    return j[D] = (V, R = !1, k = !1) => (l || A(), B.schedule(V, R, k)), j;
  }, {}), cancel: (j) => {
    for (let D = 0; D < $o.length; D++)
      f[$o[D]].cancel(j);
  }, state: r, steps: f };
}
const { schedule: Gt, cancel: Sa, state: Se, steps: pf } = /* @__PURE__ */ Cv(typeof requestAnimationFrame < "u" ? requestAnimationFrame : ln, !0);
let ir;
function c4() {
  ir = void 0;
}
const Ae = {
  now: () => (ir === void 0 && Ae.set(Se.isProcessing || xa.useManualTiming ? Se.timestamp : performance.now()), ir),
  set: (a) => {
    ir = a, queueMicrotask(c4);
  }
}, Ev = (a) => (e) => typeof e == "string" && e.startsWith(a), Av = /* @__PURE__ */ Ev("--"), f4 = /* @__PURE__ */ Ev("var(--"), Gd = (a) => f4(a) ? d4.test(a.split("/*")[0].trim()) : !1, d4 = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function ey(a) {
  return typeof a != "string" ? !1 : a.split("/*")[0].includes("var(--");
}
const Wi = {
  test: (a) => typeof a == "number",
  parse: parseFloat,
  transform: (a) => a
}, hs = {
  ...Wi,
  transform: (a) => En(0, 1, a)
}, Go = {
  ...Wi,
  default: 1
}, os = (a) => Math.round(a * 1e5) / 1e5, Yd = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function h4(a) {
  return a == null;
}
const m4 = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Xd = (a, e) => (l) => !!(typeof l == "string" && m4.test(l) && l.startsWith(a) || e && !h4(l) && Object.prototype.hasOwnProperty.call(l, e)), jv = (a, e, l) => (s) => {
  if (typeof s != "string")
    return s;
  const [r, c, f, h] = s.match(Yd);
  return {
    [a]: parseFloat(r),
    [e]: parseFloat(c),
    [l]: parseFloat(f),
    alpha: h !== void 0 ? parseFloat(h) : 1
  };
}, p4 = (a) => En(0, 255, a), yf = {
  ...Wi,
  transform: (a) => Math.round(p4(a))
}, Qa = {
  test: /* @__PURE__ */ Xd("rgb", "red"),
  parse: /* @__PURE__ */ jv("red", "green", "blue"),
  transform: ({ red: a, green: e, blue: l, alpha: s = 1 }) => "rgba(" + yf.transform(a) + ", " + yf.transform(e) + ", " + yf.transform(l) + ", " + os(hs.transform(s)) + ")"
};
function y4(a) {
  let e = "", l = "", s = "", r = "";
  return a.length > 5 ? (e = a.substring(1, 3), l = a.substring(3, 5), s = a.substring(5, 7), r = a.substring(7, 9)) : (e = a.substring(1, 2), l = a.substring(2, 3), s = a.substring(3, 4), r = a.substring(4, 5), e += e, l += l, s += s, r += r), {
    red: parseInt(e, 16),
    green: parseInt(l, 16),
    blue: parseInt(s, 16),
    alpha: r ? parseInt(r, 16) / 255 : 1
  };
}
const Ff = {
  test: /* @__PURE__ */ Xd("#"),
  parse: y4,
  transform: Qa.transform
}, ws = /* @__NO_SIDE_EFFECTS__ */ (a) => ({
  test: (e) => typeof e == "string" && e.endsWith(a) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${a}`
}), Xn = /* @__PURE__ */ ws("deg"), Cn = /* @__PURE__ */ ws("%"), ct = /* @__PURE__ */ ws("px"), g4 = /* @__PURE__ */ ws("vh"), v4 = /* @__PURE__ */ ws("vw"), ny = {
  ...Cn,
  parse: (a) => Cn.parse(a) / 100,
  transform: (a) => Cn.transform(a * 100)
}, Hi = {
  test: /* @__PURE__ */ Xd("hsl", "hue"),
  parse: /* @__PURE__ */ jv("hue", "saturation", "lightness"),
  transform: ({ hue: a, saturation: e, lightness: l, alpha: s = 1 }) => "hsla(" + Math.round(a) + ", " + Cn.transform(os(e)) + ", " + Cn.transform(os(l)) + ", " + os(hs.transform(s)) + ")"
}, re = {
  test: (a) => Qa.test(a) || Ff.test(a) || Hi.test(a),
  parse: (a) => Qa.test(a) ? Qa.parse(a) : Hi.test(a) ? Hi.parse(a) : Ff.parse(a),
  transform: (a) => typeof a == "string" ? a : a.hasOwnProperty("red") ? Qa.transform(a) : Hi.transform(a),
  getAnimatableNone: (a) => {
    const e = re.parse(a);
    return e.alpha = 0, re.transform(e);
  }
}, b4 = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function x4(a) {
  return isNaN(a) && typeof a == "string" && (a.match(Yd)?.length || 0) + (a.match(b4)?.length || 0) > 0;
}
const Mv = "number", _v = "color", S4 = "var", w4 = "var(", ay = "${}", T4 = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Zi(a) {
  const e = a.toString(), l = [], s = {
    color: [],
    number: [],
    var: []
  }, r = [];
  let c = 0;
  const h = e.replace(T4, (y) => (re.test(y) ? (s.color.push(c), r.push(_v), l.push(re.parse(y))) : y.startsWith(w4) ? (s.var.push(c), r.push(S4), l.push(y)) : (s.number.push(c), r.push(Mv), l.push(parseFloat(y))), ++c, ay)).split(ay);
  return { values: l, split: h, indexes: s, types: r };
}
function C4(a) {
  return Zi(a).values;
}
function Rv({ split: a, types: e }) {
  const l = a.length;
  return (s) => {
    let r = "";
    for (let c = 0; c < l; c++)
      if (r += a[c], s[c] !== void 0) {
        const f = e[c];
        f === Mv ? r += os(s[c]) : f === _v ? r += re.transform(s[c]) : r += s[c];
      }
    return r;
  };
}
function E4(a) {
  return Rv(Zi(a));
}
const A4 = (a) => typeof a == "number" ? 0 : re.test(a) ? re.getAnimatableNone(a) : a, j4 = (a, e) => typeof a == "number" ? e?.trim().endsWith("/") ? a : 0 : A4(a);
function M4(a) {
  const e = Zi(a);
  return Rv(e)(e.values.map((s, r) => j4(s, e.split[r])));
}
const mn = {
  test: x4,
  parse: C4,
  createTransformer: E4,
  getAnimatableNone: M4
};
function gf(a, e, l) {
  return l < 0 && (l += 1), l > 1 && (l -= 1), l < 1 / 6 ? a + (e - a) * 6 * l : l < 1 / 2 ? e : l < 2 / 3 ? a + (e - a) * (2 / 3 - l) * 6 : a;
}
function _4({ hue: a, saturation: e, lightness: l, alpha: s }) {
  a /= 360, e /= 100, l /= 100;
  let r = 0, c = 0, f = 0;
  if (!e)
    r = c = f = l;
  else {
    const h = l < 0.5 ? l * (1 + e) : l + e - l * e, y = 2 * l - h;
    r = gf(y, h, a + 1 / 3), c = gf(y, h, a), f = gf(y, h, a - 1 / 3);
  }
  return {
    red: Math.round(r * 255),
    green: Math.round(c * 255),
    blue: Math.round(f * 255),
    alpha: s
  };
}
function pr(a, e) {
  return (l) => l > 0 ? e : a;
}
const $t = (a, e, l) => a + (e - a) * l, vf = (a, e, l) => {
  const s = a * a, r = l * (e * e - s) + s;
  return r < 0 ? 0 : Math.sqrt(r);
}, R4 = [Ff, Qa, Hi], D4 = (a) => R4.find((e) => e.test(a));
function iy(a) {
  const e = D4(a);
  if (!e)
    return !1;
  let l = e.parse(a);
  return e === Hi && (l = _4(l)), l;
}
const ly = (a, e) => {
  const l = iy(a), s = iy(e);
  if (!l || !s)
    return pr(a, e);
  const r = { ...l };
  return (c) => (r.red = vf(l.red, s.red, c), r.green = vf(l.green, s.green, c), r.blue = vf(l.blue, s.blue, c), r.alpha = $t(l.alpha, s.alpha, c), Qa.transform(r));
}, Jf = /* @__PURE__ */ new Set(["none", "hidden"]);
function N4(a, e) {
  return Jf.has(a) ? (l) => l <= 0 ? a : e : (l) => l >= 1 ? e : a;
}
function O4(a, e) {
  return (l) => $t(a, e, l);
}
function Pd(a) {
  return typeof a == "number" ? O4 : typeof a == "string" ? Gd(a) ? pr : re.test(a) ? ly : B4 : Array.isArray(a) ? Dv : typeof a == "object" ? re.test(a) ? ly : z4 : pr;
}
function Dv(a, e) {
  const l = [...a], s = l.length, r = a.map((c, f) => Pd(c)(c, e[f]));
  return (c) => {
    for (let f = 0; f < s; f++)
      l[f] = r[f](c);
    return l;
  };
}
function z4(a, e) {
  const l = { ...a, ...e }, s = {};
  for (const r in l)
    a[r] !== void 0 && e[r] !== void 0 && (s[r] = Pd(a[r])(a[r], e[r]));
  return (r) => {
    for (const c in s)
      l[c] = s[c](r);
    return l;
  };
}
function L4(a, e) {
  const l = [], s = { color: 0, var: 0, number: 0 };
  for (let r = 0; r < e.values.length; r++) {
    const c = e.types[r], f = a.indexes[c][s[c]], h = a.values[f] ?? 0;
    l[r] = h, s[c]++;
  }
  return l;
}
const B4 = (a, e) => {
  const l = mn.createTransformer(e), s = Zi(a), r = Zi(e);
  return s.indexes.var.length === r.indexes.var.length && s.indexes.color.length === r.indexes.color.length && s.indexes.number.length >= r.indexes.number.length ? Jf.has(a) && !r.values.length || Jf.has(e) && !s.values.length ? N4(a, e) : xs(Dv(L4(s, r), r.values), l) : pr(a, e);
};
function Nv(a, e, l) {
  return typeof a == "number" && typeof e == "number" && typeof l == "number" ? $t(a, e, l) : Pd(a)(a, e);
}
const V4 = (a) => {
  const e = ({ timestamp: l }) => a(l);
  return {
    start: (l = !0) => Gt.update(e, l),
    stop: () => Sa(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Se.isProcessing ? Se.timestamp : Ae.now()
  };
}, Ov = (a, e, l = 10) => {
  let s = "";
  const r = Math.max(Math.round(e / l), 2);
  for (let c = 0; c < r; c++)
    s += Math.round(a(c / (r - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, yr = 2e4;
function Kd(a) {
  let e = 0;
  const l = 50;
  let s = a.next(e);
  for (; !s.done && e < yr; )
    e += l, s = a.next(e);
  return e >= yr ? 1 / 0 : e;
}
function U4(a, e = 100, l) {
  const s = l({ ...a, keyframes: [0, e] }), r = Math.min(Kd(s), yr);
  return {
    type: "keyframes",
    ease: (c) => s.next(r * c).value / e,
    duration: /* @__PURE__ */ an(r)
  };
}
const It = {
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
function Wf(a, e) {
  return a * Math.sqrt(1 - e * e);
}
const k4 = 12;
function H4(a, e, l) {
  let s = l;
  for (let r = 1; r < k4; r++)
    s = s - a(s) / e(s);
  return s;
}
const bf = 1e-3;
function q4({ duration: a = It.duration, bounce: e = It.bounce, velocity: l = It.velocity, mass: s = It.mass }) {
  let r, c, f = 1 - e;
  f = En(It.minDamping, It.maxDamping, f), a = En(It.minDuration, It.maxDuration, /* @__PURE__ */ an(a)), f < 1 ? (r = (m) => {
    const g = m * f, v = g * a, b = g - l, T = Wf(m, f), S = Math.exp(-v);
    return bf - b / T * S;
  }, c = (m) => {
    const v = m * f * a, b = v * l + l, T = Math.pow(f, 2) * Math.pow(m, 2) * a, S = Math.exp(-v), w = Wf(Math.pow(m, 2), f);
    return (-r(m) + bf > 0 ? -1 : 1) * ((b - T) * S) / w;
  }) : (r = (m) => {
    const g = Math.exp(-m * a), v = (m - l) * a + 1;
    return -bf + g * v;
  }, c = (m) => {
    const g = Math.exp(-m * a), v = (l - m) * (a * a);
    return g * v;
  });
  const h = 5 / a, y = H4(r, c, h);
  if (a = /* @__PURE__ */ Xe(a), isNaN(y))
    return {
      stiffness: It.stiffness,
      damping: It.damping,
      duration: a
    };
  {
    const m = Math.pow(y, 2) * s;
    return {
      stiffness: m,
      damping: f * 2 * Math.sqrt(s * m),
      duration: a
    };
  }
}
const $4 = ["duration", "bounce"], G4 = ["stiffness", "damping", "mass"];
function sy(a, e) {
  return e.some((l) => a[l] !== void 0);
}
function Y4(a) {
  let e = {
    velocity: It.velocity,
    stiffness: It.stiffness,
    damping: It.damping,
    mass: It.mass,
    isResolvedFromDuration: !1,
    ...a
  };
  if (!sy(a, G4) && sy(a, $4))
    if (e.velocity = 0, a.visualDuration) {
      const l = a.visualDuration, s = 2 * Math.PI / (l * 1.2), r = s * s, c = 2 * En(0.05, 1, 1 - (a.bounce || 0)) * Math.sqrt(r);
      e = {
        ...e,
        mass: It.mass,
        stiffness: r,
        damping: c
      };
    } else {
      const l = q4({ ...a, velocity: 0 });
      e = {
        ...e,
        ...l,
        mass: It.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function gr(a = It.visualDuration, e = It.bounce) {
  const l = typeof a != "object" ? {
    visualDuration: a,
    keyframes: [0, 1],
    bounce: e
  } : a;
  let { restSpeed: s, restDelta: r } = l;
  const c = l.keyframes[0], f = l.keyframes[l.keyframes.length - 1], h = { done: !1, value: c }, { stiffness: y, damping: m, mass: g, duration: v, velocity: b, isResolvedFromDuration: T } = Y4({
    ...l,
    velocity: -/* @__PURE__ */ an(l.velocity || 0)
  }), S = b || 0, w = m / (2 * Math.sqrt(y * g)), A = f - c, _ = /* @__PURE__ */ an(Math.sqrt(y / g)), M = Math.abs(A) < 5;
  s || (s = M ? It.restSpeed.granular : It.restSpeed.default), r || (r = M ? It.restDelta.granular : It.restDelta.default);
  let j, D, B, V, R, k;
  if (w < 1)
    B = Wf(_, w), V = (S + w * _ * A) / B, j = (K) => {
      const it = Math.exp(-w * _ * K);
      return f - it * (V * Math.sin(B * K) + A * Math.cos(B * K));
    }, R = w * _ * V + A * B, k = w * _ * A - V * B, D = (K) => Math.exp(-w * _ * K) * (R * Math.sin(B * K) + k * Math.cos(B * K));
  else if (w === 1) {
    j = (it) => f - Math.exp(-_ * it) * (A + (S + _ * A) * it);
    const K = S + _ * A;
    D = (it) => Math.exp(-_ * it) * (_ * K * it - S);
  } else {
    const K = _ * Math.sqrt(w * w - 1);
    j = (J) => {
      const nt = Math.exp(-w * _ * J), O = Math.min(K * J, 300);
      return f - nt * ((S + w * _ * A) * Math.sinh(O) + K * A * Math.cosh(O)) / K;
    };
    const it = (S + w * _ * A) / K, et = w * _ * it - A * K, I = w * _ * A - it * K;
    D = (J) => {
      const nt = Math.exp(-w * _ * J), O = Math.min(K * J, 300);
      return nt * (et * Math.sinh(O) + I * Math.cosh(O));
    };
  }
  const P = {
    calculatedDuration: T && v || null,
    velocity: (K) => /* @__PURE__ */ Xe(D(K)),
    next: (K) => {
      if (!T && w < 1) {
        const et = Math.exp(-w * _ * K), I = Math.sin(B * K), J = Math.cos(B * K), nt = f - et * (V * I + A * J), O = /* @__PURE__ */ Xe(et * (R * I + k * J));
        return h.done = Math.abs(O) <= s && Math.abs(f - nt) <= r, h.value = h.done ? f : nt, h;
      }
      const it = j(K);
      if (T)
        h.done = K >= v;
      else {
        const et = /* @__PURE__ */ Xe(D(K));
        h.done = Math.abs(et) <= s && Math.abs(f - it) <= r;
      }
      return h.value = h.done ? f : it, h;
    },
    toString: () => {
      const K = Math.min(Kd(P), yr), it = Ov((et) => P.next(K * et).value, K, 30);
      return K + "ms " + it;
    },
    toTransition: () => {
    }
  };
  return P;
}
gr.applyToOptions = (a) => {
  const e = U4(a, 100, gr);
  return a.ease = e.ease, a.duration = /* @__PURE__ */ Xe(e.duration), a.type = "keyframes", a;
};
const X4 = 5;
function zv(a, e, l) {
  const s = Math.max(e - X4, 0);
  return /* @__PURE__ */ hv(l - a(s), e - s);
}
function If({ keyframes: a, velocity: e = 0, power: l = 0.8, timeConstant: s = 325, bounceDamping: r = 10, bounceStiffness: c = 500, modifyTarget: f, min: h, max: y, restDelta: m = 0.5, restSpeed: g }) {
  const v = a[0], b = {
    done: !1,
    value: v
  }, T = (k) => h !== void 0 && k < h || y !== void 0 && k > y, S = (k) => h === void 0 ? y : y === void 0 || Math.abs(h - k) < Math.abs(y - k) ? h : y;
  let w = l * e;
  const A = v + w, _ = f === void 0 ? A : f(A);
  _ !== A && (w = _ - v);
  const M = (k) => -w * Math.exp(-k / s), j = (k) => _ + M(k), D = (k) => {
    const P = M(k), K = j(k);
    b.done = Math.abs(P) <= m, b.value = b.done ? _ : K;
  };
  let B, V;
  const R = (k) => {
    T(b.value) && (B = k, V = gr({
      keyframes: [b.value, S(b.value)],
      velocity: zv(j, k, b.value),
      // TODO: This should be passing * 1000
      damping: r,
      stiffness: c,
      restDelta: m,
      restSpeed: g
    }));
  };
  return R(0), {
    calculatedDuration: null,
    next: (k) => {
      let P = !1;
      return !V && B === void 0 && (P = !0, D(k), R(k)), B !== void 0 && k >= B ? V.next(k - B) : (!P && D(k), b);
    }
  };
}
function P4(a, e, l) {
  const s = [], r = l || xa.mix || Nv, c = a.length - 1;
  for (let f = 0; f < c; f++) {
    let h = r(a[f], a[f + 1]);
    if (e) {
      const y = Array.isArray(e) ? e[f] || ln : e;
      h = xs(y, h);
    }
    s.push(h);
  }
  return s;
}
function K4(a, e, { clamp: l = !0, ease: s, mixer: r } = {}) {
  const c = a.length;
  if (Bd(c === e.length), c === 1)
    return () => e[0];
  if (c === 2 && e[0] === e[1])
    return () => e[1];
  const f = a[0] === a[1];
  a[0] > a[c - 1] && (a = [...a].reverse(), e = [...e].reverse());
  const h = P4(e, s, r), y = h.length, m = (g) => {
    if (f && g < a[0])
      return e[0];
    let v = 0;
    if (y > 1)
      for (; v < a.length - 2 && !(g < a[v + 1]); v++)
        ;
    const b = /* @__PURE__ */ ds(a[v], a[v + 1], g);
    return h[v](b);
  };
  return l ? (g) => m(En(a[0], a[c - 1], g)) : m;
}
function Z4(a, e) {
  const l = a[a.length - 1];
  for (let s = 1; s <= e; s++) {
    const r = /* @__PURE__ */ ds(0, e, s);
    a.push($t(l, 1, r));
  }
}
function Q4(a) {
  const e = [0];
  return Z4(e, a.length - 1), e;
}
function F4(a, e) {
  return a.map((l) => l * e);
}
function J4(a, e) {
  return a.map(() => e || wv).splice(0, a.length - 1);
}
function rs({ duration: a = 300, keyframes: e, times: l, ease: s = "easeInOut" }) {
  const r = /* @__PURE__ */ l4(s) ? s.map(ty) : ty(s), c = {
    done: !1,
    value: e[0]
  }, f = F4(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    l && l.length === e.length ? l : Q4(e),
    a
  ), h = K4(f, e, {
    ease: Array.isArray(r) ? r : J4(e, r)
  });
  return {
    calculatedDuration: a,
    next: (y) => (c.value = h(y), c.done = y >= a, c)
  };
}
const W4 = (a) => a !== null;
function Rr(a, { repeat: e, repeatType: l = "loop" }, s, r = 1) {
  const c = a.filter(W4), h = r < 0 || e && l !== "loop" && e % 2 === 1 ? 0 : c.length - 1;
  return !h || s === void 0 ? c[h] : s;
}
const I4 = {
  decay: If,
  inertia: If,
  tween: rs,
  keyframes: rs,
  spring: gr
};
function Lv(a) {
  typeof a.type == "string" && (a.type = I4[a.type]);
}
class Zd {
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
const t5 = (a) => a / 100;
class vr extends Zd {
  constructor(e) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: l } = this.options;
      l && l.updatedAt !== Ae.now() && this.tick(Ae.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: e } = this;
    Lv(e);
    const { type: l = rs, repeat: s = 0, repeatDelay: r = 0, repeatType: c, velocity: f = 0 } = e;
    let { keyframes: h } = e;
    const y = l || rs;
    y !== rs && typeof h[0] != "number" && (this.mixKeyframes = xs(t5, Nv(h[0], h[1])), h = [0, 100]);
    const m = y({ ...e, keyframes: h });
    c === "mirror" && (this.mirroredGenerator = y({
      ...e,
      keyframes: [...h].reverse(),
      velocity: -f
    })), m.calculatedDuration === null && (m.calculatedDuration = Kd(m));
    const { calculatedDuration: g } = m;
    this.calculatedDuration = g, this.resolvedDuration = g + r, this.totalDuration = this.resolvedDuration * (s + 1) - r, this.generator = m;
  }
  updateTime(e) {
    const l = Math.round(e - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = l;
  }
  tick(e, l = !1) {
    const { generator: s, totalDuration: r, mixKeyframes: c, mirroredGenerator: f, resolvedDuration: h, calculatedDuration: y } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: m = 0, keyframes: g, repeat: v, repeatType: b, repeatDelay: T, type: S, onUpdate: w, finalKeyframe: A } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - r / this.speed, this.startTime)), l ? this.currentTime = e : this.updateTime(e);
    const _ = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1), M = this.playbackSpeed >= 0 ? _ < 0 : _ > r;
    this.currentTime = Math.max(_, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = r);
    let j = this.currentTime, D = s;
    if (v) {
      const k = Math.min(this.currentTime, r) / h;
      let P = Math.floor(k), K = k % 1;
      !K && k >= 1 && (K = 1), K === 1 && P--, P = Math.min(P, v + 1), !!(P % 2) && (b === "reverse" ? (K = 1 - K, T && (K -= T / h)) : b === "mirror" && (D = f)), j = En(0, 1, K) * h;
    }
    let B;
    M ? (this.delayState.value = g[0], B = this.delayState) : B = D.next(j), c && !M && (B.value = c(B.value));
    let { done: V } = B;
    !M && y !== null && (V = this.playbackSpeed >= 0 ? this.currentTime >= r : this.currentTime <= 0);
    const R = this.holdTime === null && (this.state === "finished" || this.state === "running" && V);
    return R && S !== If && (B.value = Rr(g, this.options, A, this.speed)), w && w(B.value), R && this.finish(), B;
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
    return /* @__PURE__ */ an(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ an(e);
  }
  get time() {
    return /* @__PURE__ */ an(this.currentTime);
  }
  set time(e) {
    e = /* @__PURE__ */ Xe(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = e, this.tick(e));
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
    return zv((s) => this.generator.next(s).value, e, l);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    const l = this.playbackSpeed !== e;
    l && this.driver && this.updateTime(Ae.now()), this.playbackSpeed = e, l && this.driver && (this.time = /* @__PURE__ */ an(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: e = V4, startTime: l } = this.options;
    this.driver || (this.driver = e((r) => this.tick(r))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = l ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Ae.now()), this.holdTime = this.currentTime;
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
function e5(a) {
  for (let e = 1; e < a.length; e++)
    a[e] ?? (a[e] = a[e - 1]);
}
const Fa = (a) => a * 180 / Math.PI, td = (a) => {
  const e = Fa(Math.atan2(a[1], a[0]));
  return ed(e);
}, n5 = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (a) => (Math.abs(a[0]) + Math.abs(a[3])) / 2,
  rotate: td,
  rotateZ: td,
  skewX: (a) => Fa(Math.atan(a[1])),
  skewY: (a) => Fa(Math.atan(a[2])),
  skew: (a) => (Math.abs(a[1]) + Math.abs(a[2])) / 2
}, ed = (a) => (a = a % 360, a < 0 && (a += 360), a), oy = td, ry = (a) => Math.sqrt(a[0] * a[0] + a[1] * a[1]), uy = (a) => Math.sqrt(a[4] * a[4] + a[5] * a[5]), a5 = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: ry,
  scaleY: uy,
  scale: (a) => (ry(a) + uy(a)) / 2,
  rotateX: (a) => ed(Fa(Math.atan2(a[6], a[5]))),
  rotateY: (a) => ed(Fa(Math.atan2(-a[2], a[0]))),
  rotateZ: oy,
  rotate: oy,
  skewX: (a) => Fa(Math.atan(a[4])),
  skewY: (a) => Fa(Math.atan(a[1])),
  skew: (a) => (Math.abs(a[1]) + Math.abs(a[4])) / 2
};
function nd(a) {
  return a.includes("scale") ? 1 : 0;
}
function ad(a, e) {
  if (!a || a === "none")
    return nd(e);
  const l = a.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, r;
  if (l)
    s = a5, r = l;
  else {
    const h = a.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = n5, r = h;
  }
  if (!r)
    return nd(e);
  const c = s[e], f = r[1].split(",").map(l5);
  return typeof c == "function" ? c(f) : f[c];
}
const i5 = (a, e) => {
  const { transform: l = "none" } = getComputedStyle(a);
  return ad(l, e);
};
function l5(a) {
  return parseFloat(a.trim());
}
const Ii = [
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
], tl = /* @__PURE__ */ new Set([...Ii, "pathRotation"]), cy = (a) => a === Wi || a === ct, s5 = /* @__PURE__ */ new Set(["x", "y", "z"]), o5 = Ii.filter((a) => !s5.has(a));
function r5(a) {
  const e = [];
  return o5.forEach((l) => {
    const s = a.getValue(l);
    s !== void 0 && (e.push([l, s.get()]), s.set(l.startsWith("scale") ? 1 : 0));
  }), e;
}
const ba = {
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
  x: (a, { transform: e }) => ad(e, "x"),
  y: (a, { transform: e }) => ad(e, "y")
};
ba.translateX = ba.x;
ba.translateY = ba.y;
const Wa = /* @__PURE__ */ new Set();
let id = !1, ld = !1, sd = !1;
function Bv() {
  if (ld) {
    const a = Array.from(Wa).filter((s) => s.needsMeasurement), e = new Set(a.map((s) => s.element)), l = /* @__PURE__ */ new Map();
    e.forEach((s) => {
      const r = r5(s);
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
  ld = !1, id = !1, Wa.forEach((a) => a.complete(sd)), Wa.clear();
}
function Vv() {
  Wa.forEach((a) => {
    a.readKeyframes(), a.needsMeasurement && (ld = !0);
  });
}
function u5() {
  sd = !0, Vv(), Bv(), sd = !1;
}
class Qd {
  constructor(e, l, s, r, c, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = l, this.name = s, this.motionValue = r, this.element = c, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Wa.add(this), id || (id = !0, Gt.read(Vv), Gt.resolveKeyframes(Bv))) : (this.readKeyframes(), this.complete());
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
    e5(e);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), Wa.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Wa.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const c5 = (a) => a.startsWith("--");
function Uv(a, e, l) {
  c5(e) ? a.style.setProperty(e, l) : a.style[e] = l;
}
const f5 = {};
function kv(a, e) {
  const l = /* @__PURE__ */ dv(a);
  return () => f5[e] ?? l();
}
const d5 = /* @__PURE__ */ kv(() => window.ScrollTimeline !== void 0, "scrollTimeline"), Hv = /* @__PURE__ */ kv(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), as = ([a, e, l, s]) => `cubic-bezier(${a}, ${e}, ${l}, ${s})`, fy = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ as([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ as([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ as([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ as([0.33, 1.53, 0.69, 0.99])
};
function qv(a, e) {
  if (a)
    return typeof a == "function" ? Hv() ? Ov(a, e) : "ease-out" : /* @__PURE__ */ Tv(a) ? as(a) : Array.isArray(a) ? a.map((l) => qv(l, e) || fy.easeOut) : fy[a];
}
function h5(a, e, l, { delay: s = 0, duration: r = 300, repeat: c = 0, repeatType: f = "loop", ease: h = "easeOut", times: y } = {}, m = void 0) {
  const g = {
    [e]: l
  };
  y && (g.offset = y);
  const v = qv(h, r);
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
function $v(a) {
  return typeof a == "function" && "applyToOptions" in a;
}
function m5({ type: a, ...e }) {
  return $v(a) && Hv() ? a.applyToOptions(e) : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
}
class Gv extends Zd {
  constructor(e) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e)
      return;
    const { element: l, name: s, keyframes: r, pseudoElement: c, allowFlatten: f = !1, finalKeyframe: h, onComplete: y } = e;
    this.isPseudoElement = !!c, this.allowFlatten = f, this.options = e, Bd(typeof e.type != "string");
    const m = m5(e);
    this.animation = h5(l, s, r, m, c), m.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !c) {
        const g = Rr(r, this.options, h, this.speed);
        this.updateMotionValue && this.updateMotionValue(g), Uv(l, s, g), this.animation.cancel();
      }
      y?.(), this.notifyFinished();
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
    return /* @__PURE__ */ an(Number(e));
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ an(e);
  }
  get time() {
    return /* @__PURE__ */ an(Number(this.animation.currentTime) || 0);
  }
  set time(e) {
    const l = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Xe(e), l && this.animation.pause();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && d5() ? (this.animation.timeline = e, l && (this.animation.rangeStart = l), s && (this.animation.rangeEnd = s), ln) : r(this);
  }
}
const Yv = {
  anticipate: bv,
  backInOut: vv,
  circInOut: Sv
};
function p5(a) {
  return a in Yv;
}
function y5(a) {
  typeof a.ease == "string" && p5(a.ease) && (a.ease = Yv[a.ease]);
}
const xf = 10;
class g5 extends Gv {
  constructor(e) {
    y5(e), Lv(e), super(e), e.startTime !== void 0 && e.autoplay !== !1 && (this.startTime = e.startTime), this.options = e;
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
    const h = new vr({
      ...f,
      autoplay: !1
    }), y = Math.max(xf, Ae.now() - this.startTime), m = En(0, xf, y - xf), g = h.sample(y).value, { name: v } = this.options;
    c && v && Uv(c, v, g), l.setWithVelocity(h.sample(Math.max(0, y - m)).value, g, m), h.stop();
  }
}
const dy = (a, e) => e === "zIndex" ? !1 : !!(typeof a == "number" || Array.isArray(a) || typeof a == "string" && // It's animatable if we have a string
(mn.test(a) || a === "0") && // And it contains numbers and/or colors
!a.startsWith("url("));
function v5(a) {
  const e = a[0];
  if (a.length === 1)
    return !0;
  for (let l = 0; l < a.length; l++)
    if (a[l] !== e)
      return !0;
}
function b5(a, e, l, s) {
  const r = a[0];
  if (r === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const c = a[a.length - 1], f = dy(r, e), h = dy(c, e);
  return !f || !h ? !1 : v5(a) || (l === "spring" || $v(l)) && s;
}
function od(a) {
  a.duration = 0, a.type = "keyframes";
}
const Xv = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), x5 = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function S5(a) {
  for (let e = 0; e < a.length; e++)
    if (typeof a[e] == "string" && x5.test(a[e]))
      return !0;
  return !1;
}
const w5 = /* @__PURE__ */ new Set([
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
]), T5 = /* @__PURE__ */ dv(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function C5(a) {
  const { motionValue: e, name: l, repeatDelay: s, repeatType: r, damping: c, type: f, keyframes: h } = a;
  if (!(e?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: m, transformTemplate: g } = e.owner.getProps();
  return T5() && l && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (Xv.has(l) || w5.has(l) && S5(h)) && (l !== "transform" || !g) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !m && !s && r !== "mirror" && c !== 0 && f !== "inertia";
}
const E5 = 40;
class A5 extends Zd {
  constructor({ autoplay: e = !0, delay: l = 0, type: s = "keyframes", repeat: r = 0, repeatDelay: c = 0, repeatType: f = "loop", keyframes: h, name: y, motionValue: m, element: g, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Ae.now();
    const b = {
      autoplay: e,
      delay: l,
      type: s,
      repeat: r,
      repeatDelay: c,
      repeatType: f,
      name: y,
      motionValue: m,
      element: g,
      ...v
    }, T = g?.KeyframeResolver || Qd;
    this.keyframeResolver = new T(h, (S, w, A) => this.onKeyframesResolved(S, w, b, !A), y, m, g), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(e, l, s, r) {
    this.keyframeResolver = void 0;
    const { name: c, type: f, velocity: h, delay: y, isHandoff: m, onUpdate: g } = s;
    this.resolvedAt = Ae.now();
    let v = !0;
    b5(e, c, f, h) || (v = !1, (xa.instantAnimations || !y) && g?.(Rr(e, s, l)), e[0] = e[e.length - 1], od(s), s.repeat = 0);
    const T = {
      startTime: r ? this.resolvedAt ? this.resolvedAt - this.createdAt > E5 ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: l,
      ...s,
      keyframes: e
    }, S = v && !m && C5(T), w = T.motionValue?.owner?.current;
    let A;
    if (S)
      try {
        A = new g5({
          ...T,
          element: w
        });
      } catch {
        A = new vr(T);
      }
    else
      A = new vr(T);
    A.finished.then(() => {
      this.notifyFinished();
    }).catch(ln), this.pendingTimeline && (this.stopTimeline = A.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = A;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(e, l) {
    return this.finished.finally(e).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), u5()), this._animation;
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
function Pv(a, e, l, s = 0, r = 1) {
  const c = Array.from(a).sort((m, g) => m.sortNodePosition(g)).indexOf(e), f = a.size, h = (f - 1) * s;
  return typeof l == "function" ? l(c, f) : r === 1 ? c * s : h - c * s;
}
const hy = 30, j5 = (a) => !isNaN(parseFloat(a));
class M5 {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(e, l = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const r = Ae.now();
      if (this.updatedAt !== r && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const c of this.dependents)
          c.dirty();
    }, this.hasAnimated = !1, this.setCurrent(e), this.owner = l.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = Ae.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = j5(this.current));
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
    this.events[e] || (this.events[e] = new Vd());
    const s = this.events[e].add(l);
    return e === "change" ? () => {
      s(), Gt.read(() => {
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
    const e = Ae.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > hy)
      return 0;
    const l = Math.min(this.updatedAt - this.prevUpdatedAt, hy);
    return /* @__PURE__ */ hv(parseFloat(this.current) - parseFloat(this.prevFrameValue), l);
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
function Qi(a, e) {
  return new M5(a, e);
}
function Kv(a, e) {
  if (a?.inherit && e) {
    const { inherit: l, ...s } = a;
    return { ...e, ...s };
  }
  return a;
}
function Fd(a, e) {
  const l = a?.[e] ?? a?.default ?? a;
  return l !== a ? Kv(l, a) : l;
}
const _5 = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, R5 = (a) => ({
  type: "spring",
  stiffness: 550,
  damping: a === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), D5 = {
  type: "keyframes",
  duration: 0.8
}, N5 = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, O5 = (a, { keyframes: e }) => e.length > 2 ? D5 : tl.has(a) ? a.startsWith("scale") ? R5(e[1]) : _5 : N5, z5 = /* @__PURE__ */ new Set([
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
function L5(a) {
  for (const e in a)
    if (!z5.has(e))
      return !0;
  return !1;
}
const Jd = (a, e, l, s = {}, r, c) => (f) => {
  const h = Fd(s, a) || {}, y = h.delay || s.delay || 0;
  let { elapsed: m = 0 } = s;
  m = m - /* @__PURE__ */ Xe(y);
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
  L5(h) || Object.assign(g, O5(a, g)), g.duration && (g.duration = /* @__PURE__ */ Xe(g.duration)), g.repeatDelay && (g.repeatDelay = /* @__PURE__ */ Xe(g.repeatDelay)), g.from !== void 0 && (g.keyframes[0] = g.from);
  let v = !1;
  if ((g.type === !1 || g.duration === 0 && !g.repeatDelay) && (od(g), g.delay === 0 && (v = !0)), (xa.instantAnimations || xa.skipAnimations || r?.shouldSkipAnimations || h.skipAnimations) && (v = !0, od(g), g.delay = 0), g.allowFlatten = !h.type && !h.ease, v && !c && e.get() !== void 0) {
    const b = Rr(g.keyframes, h);
    if (b !== void 0) {
      Gt.update(() => {
        g.onUpdate(b), g.onComplete();
      });
      return;
    }
  }
  return h.isSync ? new vr(g) : new A5(g);
}, B5 = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function V5(a) {
  const e = B5.exec(a);
  if (!e)
    return [,];
  const [, l, s, r] = e;
  return [`--${l ?? s}`, r];
}
function Zv(a, e, l = 1) {
  const [s, r] = V5(a);
  if (!s)
    return;
  const c = window.getComputedStyle(e).getPropertyValue(s);
  if (c) {
    const f = c.trim();
    return uv(f) ? parseFloat(f) : f;
  }
  return Gd(r) ? Zv(r, e, l + 1) : r;
}
function my(a) {
  const e = [{}, {}];
  return a?.values.forEach((l, s) => {
    e[0][s] = l.get(), e[1][s] = l.getVelocity();
  }), e;
}
function Wd(a, e, l, s) {
  if (typeof e == "function") {
    const [r, c] = my(s);
    e = e(l !== void 0 ? l : a.custom, r, c);
  }
  if (typeof e == "string" && (e = a.variants && a.variants[e]), typeof e == "function") {
    const [r, c] = my(s);
    e = e(l !== void 0 ? l : a.custom, r, c);
  }
  return e;
}
function Ia(a, e, l) {
  const s = a.getProps();
  return Wd(s, e, l !== void 0 ? l : s.custom, a);
}
const Qv = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Ii
]), rd = (a) => Array.isArray(a);
function U5(a, e, l) {
  a.hasValue(e) ? a.getValue(e).set(l) : a.addValue(e, Qi(l));
}
function k5(a) {
  return rd(a) ? a[a.length - 1] || 0 : a;
}
function H5(a, e) {
  const l = Ia(a, e);
  let { transitionEnd: s = {}, transition: r = {}, ...c } = l || {};
  c = { ...c, ...s };
  for (const f in c) {
    const h = k5(c[f]);
    U5(a, f, h);
  }
}
const we = (a) => !!(a && a.getVelocity);
function q5(a) {
  return !!(we(a) && a.add);
}
function ud(a, e) {
  const l = a.getValue("willChange");
  if (q5(l))
    return l.add(e);
  if (!l && xa.WillChange) {
    const s = new xa.WillChange("auto");
    a.addValue("willChange", s), s.add(e);
  }
}
function Id(a) {
  return a.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
const $5 = "framerAppearId", Fv = "data-" + Id($5);
function Jv(a) {
  return a.props[Fv];
}
function G5({ protectedKeys: a, needsAnimating: e }, l) {
  const s = a.hasOwnProperty(l) && e[l] !== !0;
  return e[l] = !1, s;
}
function Wv(a, e, { delay: l = 0, transitionOverride: s, type: r } = {}) {
  let { transition: c, transitionEnd: f, ...h } = e;
  const y = a.getDefaultTransition();
  c = c ? Kv(c, y) : y;
  const m = c?.reduceMotion, g = c?.skipAnimations;
  s && (c = s);
  const v = [], b = r && a.animationState && a.animationState.getState()[r], T = c?.path;
  T && T.animateVisualElement(a, h, c, l, v);
  for (const S in h) {
    const w = a.getValue(S, a.latestValues[S] ?? null), A = h[S];
    if (A === void 0 || b && G5(b, S))
      continue;
    const _ = {
      delay: l,
      ...Fd(c || {}, S)
    };
    g && (_.skipAnimations = !0);
    const M = w.get();
    if (M !== void 0 && !w.isAnimating() && !Array.isArray(A) && A === M && !_.velocity) {
      Gt.update(() => w.set(A));
      continue;
    }
    let j = !1;
    if (window.MotionHandoffAnimation) {
      const V = Jv(a);
      if (V) {
        const R = window.MotionHandoffAnimation(V, S, Gt);
        R !== null && (_.startTime = R, j = !0);
      }
    }
    ud(a, S);
    const D = m ?? a.shouldReduceMotion;
    w.start(Jd(S, w, A, D && Qv.has(S) ? { type: !1 } : _, a, j));
    const B = w.animation;
    B && v.push(B);
  }
  if (f) {
    const S = () => Gt.update(() => {
      f && H5(a, f);
    });
    v.length ? Promise.all(v).then(S) : S();
  }
  return v;
}
function cd(a, e, l = {}) {
  const s = Ia(a, e, l.type === "exit" ? a.presenceContext?.custom : void 0);
  let { transition: r = a.getDefaultTransition() || {} } = s || {};
  l.transitionOverride && (r = l.transitionOverride);
  const c = s ? () => Promise.all(Wv(a, s, l)) : () => Promise.resolve(), f = a.variantChildren && a.variantChildren.size ? (y = 0) => {
    const { delayChildren: m = 0, staggerChildren: g, staggerDirection: v } = r;
    return Y5(a, e, y, m, g, v, l);
  } : () => Promise.resolve(), { when: h } = r;
  if (h) {
    const [y, m] = h === "beforeChildren" ? [c, f] : [f, c];
    return y().then(() => m());
  } else
    return Promise.all([c(), f(l.delay)]);
}
function Y5(a, e, l = 0, s = 0, r = 0, c = 1, f) {
  const h = [];
  for (const y of a.variantChildren)
    y.notify("AnimationStart", e), h.push(cd(y, e, {
      ...f,
      delay: l + (typeof s == "function" ? 0 : s) + Pv(a.variantChildren, y, s, r, c)
    }).then(() => y.notify("AnimationComplete", e)));
  return Promise.all(h);
}
function X5(a, e, l = {}) {
  a.notify("AnimationStart", e);
  let s;
  if (Array.isArray(e)) {
    const r = e.map((c) => cd(a, c, l));
    s = Promise.all(r);
  } else if (typeof e == "string")
    s = cd(a, e, l);
  else {
    const r = typeof e == "function" ? Ia(a, e, l.custom) : e;
    s = Promise.all(Wv(a, r, l));
  }
  return s.then(() => {
    a.notify("AnimationComplete", e);
  });
}
const P5 = {
  test: (a) => a === "auto",
  parse: (a) => a
}, Iv = (a) => (e) => e.test(a), t2 = [Wi, ct, Cn, Xn, v4, g4, P5], py = (a) => t2.find(Iv(a));
function K5(a) {
  return typeof a == "number" ? a === 0 : a !== null ? a === "none" || a === "0" || fv(a) : !0;
}
const Z5 = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function Q5(a) {
  const [e, l] = a.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return a;
  const [s] = l.match(Yd) || [];
  if (!s)
    return a;
  const r = l.replace(s, "");
  let c = Z5.has(e) ? 1 : 0;
  return s !== l && (c *= 100), e + "(" + c + r + ")";
}
const F5 = /\b([a-z-]*)\(.*?\)/gu, fd = {
  ...mn,
  getAnimatableNone: (a) => {
    const e = a.match(F5);
    return e ? e.map(Q5).join(" ") : a;
  }
}, dd = {
  ...mn,
  getAnimatableNone: (a) => {
    const e = mn.parse(a);
    return mn.createTransformer(a)(e.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, yy = {
  ...Wi,
  transform: Math.round
}, J5 = {
  rotate: Xn,
  /**
   * Internal channel for `transition.path` orientToPath. Composed onto
   * `rotate` at the transform-build sites so the user's `rotate` is
   * never read or overwritten. Not part of `transformPropOrder`.
   */
  pathRotation: Xn,
  rotateX: Xn,
  rotateY: Xn,
  rotateZ: Xn,
  scale: Go,
  scaleX: Go,
  scaleY: Go,
  scaleZ: Go,
  skew: Xn,
  skewX: Xn,
  skewY: Xn,
  distance: ct,
  translateX: ct,
  translateY: ct,
  translateZ: ct,
  x: ct,
  y: ct,
  z: ct,
  perspective: ct,
  transformPerspective: ct,
  opacity: hs,
  originX: ny,
  originY: ny,
  originZ: ct
}, br = {
  // Border props
  borderWidth: ct,
  borderTopWidth: ct,
  borderRightWidth: ct,
  borderBottomWidth: ct,
  borderLeftWidth: ct,
  borderRadius: ct,
  borderTopLeftRadius: ct,
  borderTopRightRadius: ct,
  borderBottomRightRadius: ct,
  borderBottomLeftRadius: ct,
  // Positioning props
  width: ct,
  maxWidth: ct,
  height: ct,
  maxHeight: ct,
  top: ct,
  right: ct,
  bottom: ct,
  left: ct,
  inset: ct,
  insetBlock: ct,
  insetBlockStart: ct,
  insetBlockEnd: ct,
  insetInline: ct,
  insetInlineStart: ct,
  insetInlineEnd: ct,
  // Spacing props
  padding: ct,
  paddingTop: ct,
  paddingRight: ct,
  paddingBottom: ct,
  paddingLeft: ct,
  paddingBlock: ct,
  paddingBlockStart: ct,
  paddingBlockEnd: ct,
  paddingInline: ct,
  paddingInlineStart: ct,
  paddingInlineEnd: ct,
  margin: ct,
  marginTop: ct,
  marginRight: ct,
  marginBottom: ct,
  marginLeft: ct,
  marginBlock: ct,
  marginBlockStart: ct,
  marginBlockEnd: ct,
  marginInline: ct,
  marginInlineStart: ct,
  marginInlineEnd: ct,
  // Typography
  fontSize: ct,
  // Misc
  backgroundPositionX: ct,
  backgroundPositionY: ct,
  ...J5,
  zIndex: yy,
  // SVG
  fillOpacity: hs,
  strokeOpacity: hs,
  numOctaves: yy
}, W5 = {
  ...br,
  // Color props
  color: re,
  backgroundColor: re,
  outlineColor: re,
  fill: re,
  stroke: re,
  // Border props
  borderColor: re,
  borderTopColor: re,
  borderRightColor: re,
  borderBottomColor: re,
  borderLeftColor: re,
  filter: fd,
  WebkitFilter: fd,
  mask: dd,
  WebkitMask: dd
}, e2 = (a) => W5[a], I5 = /* @__PURE__ */ new Set([fd, dd]);
function n2(a, e) {
  let l = e2(a);
  return I5.has(l) || (l = mn), l.getAnimatableNone ? l.getAnimatableNone(e) : void 0;
}
const t9 = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function e9(a, e, l) {
  let s = 0, r;
  for (; s < a.length && !r; ) {
    const c = a[s];
    typeof c == "string" && !t9.has(c) && Zi(c).values.length && (r = a[s]), s++;
  }
  if (r && l)
    for (const c of e)
      a[c] = n2(l, r);
}
class n9 extends Qd {
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
      if (typeof v == "string" && (v = v.trim(), Gd(v))) {
        const b = Zv(v, l.current);
        b !== void 0 && (e[g] = b), g === e.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !Qv.has(s) || e.length !== 2)
      return;
    const [r, c] = e, f = py(r), h = py(c), y = ey(r), m = ey(c);
    if (y !== m && ba[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (f !== h)
      if (cy(f) && cy(h))
        for (let g = 0; g < e.length; g++) {
          const v = e[g];
          typeof v == "string" && (e[g] = parseFloat(v));
        }
      else ba[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: l } = this, s = [];
    for (let r = 0; r < e.length; r++)
      (e[r] === null || K5(e[r])) && s.push(r);
    s.length && e9(e, s, l);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: l, name: s } = this;
    if (!e || !e.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = ba[s](e.measureViewportBox(), window.getComputedStyle(e.current)), l[0] = this.measuredOrigin;
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
    s[c] = ba[l](e.measureViewportBox(), window.getComputedStyle(e.current)), f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f), this.removedTransforms?.length && this.removedTransforms.forEach(([h, y]) => {
      e.getValue(h).set(y);
    }), this.resolveNoneKeyframes();
  }
}
const th = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
];
function a2(a, e, l) {
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
const hd = (a, e) => e && typeof a == "number" ? e.transform(a) : a;
function lr(a) {
  return cv(a) && "offsetHeight" in a && !("ownerSVGElement" in a);
}
const { schedule: eh } = /* @__PURE__ */ Cv(queueMicrotask, !1), cn = {
  x: !1,
  y: !1
};
function i2() {
  return cn.x || cn.y;
}
function a9(a) {
  return a === "x" || a === "y" ? cn[a] ? null : (cn[a] = !0, () => {
    cn[a] = !1;
  }) : cn.x || cn.y ? null : (cn.x = cn.y = !0, () => {
    cn.x = cn.y = !1;
  });
}
function l2(a, e) {
  const l = a2(a), s = new AbortController(), r = {
    passive: !0,
    ...e,
    signal: s.signal
  };
  return [l, r, () => s.abort()];
}
function i9(a) {
  return !(a.pointerType === "touch" || i2());
}
function l9(a, e, l = {}) {
  const [s, r, c] = l2(a, l);
  return s.forEach((f) => {
    let h = !1, y = !1, m;
    const g = () => {
      f.removeEventListener("pointerleave", S);
    }, v = (A) => {
      m && (m(A), m = void 0), g();
    }, b = (A) => {
      h = !1, window.removeEventListener("pointerup", b), window.removeEventListener("pointercancel", b), y && (y = !1, v(A));
    }, T = () => {
      h = !0, window.addEventListener("pointerup", b, r), window.addEventListener("pointercancel", b, r);
    }, S = (A) => {
      if (A.pointerType !== "touch") {
        if (h) {
          y = !0;
          return;
        }
        v(A);
      }
    }, w = (A) => {
      if (!i9(A))
        return;
      y = !1;
      const _ = e(f, A);
      typeof _ == "function" && (m = _, f.addEventListener("pointerleave", S, r));
    };
    f.addEventListener("pointerenter", w, r), f.addEventListener("pointerdown", T, r);
  }), c;
}
const s2 = (a, e) => e ? a === e ? !0 : s2(a, e.parentElement) : !1, nh = (a) => a.pointerType === "mouse" ? typeof a.button != "number" || a.button <= 0 : a.isPrimary !== !1, s9 = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function o9(a) {
  return s9.has(a.tagName) || a.isContentEditable === !0;
}
const r9 = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function u9(a) {
  return r9.has(a.tagName) || a.isContentEditable === !0;
}
const sr = /* @__PURE__ */ new WeakSet();
function gy(a) {
  return (e) => {
    e.key === "Enter" && a(e);
  };
}
function Sf(a, e) {
  a.dispatchEvent(new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }));
}
const c9 = (a, e) => {
  const l = a.currentTarget;
  if (!l)
    return;
  const s = gy(() => {
    if (sr.has(l))
      return;
    Sf(l, "down");
    const r = gy(() => {
      Sf(l, "up");
    }), c = () => Sf(l, "cancel");
    l.addEventListener("keyup", r, e), l.addEventListener("blur", c, e);
  });
  l.addEventListener("keydown", s, e), l.addEventListener("blur", () => l.removeEventListener("keydown", s), e);
};
function vy(a) {
  return nh(a) && !i2();
}
const by = /* @__PURE__ */ new WeakSet();
function f9(a, e, l = {}) {
  const [s, r, c] = l2(a, l), f = (h) => {
    const y = h.currentTarget;
    if (!vy(h) || by.has(h))
      return;
    sr.add(y), l.stopPropagation && by.add(h);
    const m = e(y, h), g = { ...r, capture: !0 }, v = (S, w) => {
      window.removeEventListener("pointerup", b, g), window.removeEventListener("pointercancel", T, g), sr.has(y) && sr.delete(y), vy(S) && typeof m == "function" && m(S, { success: w });
    }, b = (S) => {
      v(S, y === window || y === document || l.useGlobalTarget || s2(y, S.target));
    }, T = (S) => {
      v(S, !1);
    };
    window.addEventListener("pointerup", b, g), window.addEventListener("pointercancel", T, g);
  };
  return s.forEach((h) => {
    (l.useGlobalTarget ? window : h).addEventListener("pointerdown", f, r), lr(h) && (h.addEventListener("focus", (m) => c9(m, r)), !o9(h) && !h.hasAttribute("tabindex") && (h.tabIndex = 0));
  }), c;
}
function ah(a) {
  return cv(a) && "ownerSVGElement" in a;
}
const or = /* @__PURE__ */ new WeakMap();
let rr;
const o2 = (a, e, l) => (s, r) => r && r[0] ? r[0][a + "Size"] : ah(s) && "getBBox" in s ? s.getBBox()[e] : s[l], d9 = /* @__PURE__ */ o2("inline", "width", "offsetWidth"), h9 = /* @__PURE__ */ o2("block", "height", "offsetHeight");
function m9({ target: a, borderBoxSize: e }) {
  or.get(a)?.forEach((l) => {
    l(a, {
      get width() {
        return d9(a, e);
      },
      get height() {
        return h9(a, e);
      }
    });
  });
}
function p9(a) {
  a.forEach(m9);
}
function y9() {
  typeof ResizeObserver > "u" || (rr = new ResizeObserver(p9));
}
function g9(a, e) {
  rr || y9();
  const l = a2(a);
  return l.forEach((s) => {
    let r = or.get(s);
    r || (r = /* @__PURE__ */ new Set(), or.set(s, r)), r.add(e), rr?.observe(s);
  }), () => {
    l.forEach((s) => {
      const r = or.get(s);
      r?.delete(e), r?.size || rr?.unobserve(s);
    });
  };
}
const ur = /* @__PURE__ */ new Set();
let qi;
function v9() {
  qi = () => {
    const a = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    ur.forEach((e) => e(a));
  }, window.addEventListener("resize", qi);
}
function b9(a) {
  return ur.add(a), qi || v9(), () => {
    ur.delete(a), !ur.size && typeof qi == "function" && (window.removeEventListener("resize", qi), qi = void 0);
  };
}
function xy(a, e) {
  return typeof a == "function" ? b9(a) : g9(a, e);
}
function x9(a) {
  return ah(a) && a.tagName === "svg";
}
const S9 = [...t2, re, mn], w9 = (a) => S9.find(Iv(a)), Sy = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), $i = () => ({
  x: Sy(),
  y: Sy()
}), wy = () => ({ min: 0, max: 0 }), he = () => ({
  x: wy(),
  y: wy()
}), T9 = /* @__PURE__ */ new WeakMap();
function Dr(a) {
  return a !== null && typeof a == "object" && typeof a.start == "function";
}
function ms(a) {
  return typeof a == "string" || Array.isArray(a);
}
const ih = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], lh = ["initial", ...ih];
function Nr(a) {
  return Dr(a.animate) || lh.some((e) => ms(a[e]));
}
function r2(a) {
  return !!(Nr(a) || a.variants);
}
function C9(a, e, l) {
  for (const s in e) {
    const r = e[s], c = l[s];
    if (we(r))
      a.addValue(s, r);
    else if (we(c))
      a.addValue(s, Qi(r, { owner: a }));
    else if (c !== r)
      if (a.hasValue(s)) {
        const f = a.getValue(s);
        f.liveStyle === !0 ? f.jump(r) : f.hasAnimated || f.set(r);
      } else {
        const f = a.getStaticValue(s);
        a.addValue(s, Qi(f !== void 0 ? f : r, { owner: a }));
      }
  }
  for (const s in l)
    e[s] === void 0 && a.removeValue(s);
  return e;
}
const xr = { current: null }, sh = { current: !1 }, E9 = typeof window < "u";
function u2() {
  if (sh.current = !0, !!E9)
    if (window.matchMedia) {
      const a = window.matchMedia("(prefers-reduced-motion)"), e = () => xr.current = a.matches;
      a.addEventListener("change", e), e();
    } else
      xr.current = !1;
}
const Ty = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let Sr = {};
function c2(a) {
  Sr = a;
}
function A9() {
  return Sr;
}
class j9 {
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
  constructor({ parent: e, props: l, presenceContext: s, reducedMotionConfig: r, skipAnimations: c, blockInitialAnimation: f, visualState: h }, y = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Qd, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const T = Ae.now();
      this.renderScheduledAt < T && (this.renderScheduledAt = T, Gt.render(this.render, !1, !0));
    };
    const { latestValues: m, renderState: g } = h;
    this.latestValues = m, this.baseTarget = { ...m }, this.initialValues = l.initial ? { ...m } : {}, this.renderState = g, this.parent = e, this.props = l, this.presenceContext = s, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = r, this.skipAnimationsConfig = c, this.options = y, this.blockInitialAnimation = !!f, this.isControllingVariants = Nr(l), this.isVariantNode = r2(l), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: v, ...b } = this.scrapeMotionValuesFromProps(l, {}, this);
    for (const T in b) {
      const S = b[T];
      m[T] !== void 0 && we(S) && S.set(m[T]);
    }
  }
  mount(e) {
    if (this.hasBeenMounted)
      for (const l in this.initialValues)
        this.values.get(l)?.jump(this.initialValues[l]), this.latestValues[l] = this.initialValues[l];
    this.current = e, T9.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((l, s) => this.bindToMotionValue(s, l)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (sh.current || u2(), this.shouldReduceMotion = xr.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), Sa(this.notifyUpdate), Sa(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    if (this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)(), l.accelerate && Xv.has(e) && this.current instanceof HTMLElement) {
      const { factory: f, keyframes: h, times: y, ease: m, duration: g } = l.accelerate, v = new Gv({
        element: this.current,
        name: e,
        keyframes: h,
        times: y,
        ease: m,
        duration: /* @__PURE__ */ Xe(g)
      }), b = f(v);
      this.valueSubscriptions.set(e, () => {
        b(), v.cancel();
      });
      return;
    }
    const s = tl.has(e);
    s && this.onBindTransform && this.onBindTransform();
    const r = l.on("change", (f) => {
      this.latestValues[e] = f, this.props.onUpdate && Gt.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
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
    for (e in Sr) {
      const l = Sr[e];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : he();
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
    for (let s = 0; s < Ty.length; s++) {
      const r = Ty[s];
      this.propEventSubscriptions[r] && (this.propEventSubscriptions[r](), delete this.propEventSubscriptions[r]);
      const c = "on" + r, f = e[c];
      f && (this.propEventSubscriptions[r] = this.on(r, f));
    }
    this.prevMotionValues = C9(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return s === void 0 && l !== void 0 && (s = Qi(l === null ? void 0 : l, { owner: this }), this.addValue(e, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(e, l) {
    let s = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
    return s != null && (typeof s == "string" && (uv(s) || fv(s)) ? s = parseFloat(s) : !w9(s) && mn.test(l) && (s = n2(e, l)), this.setBaseTarget(e, we(s) ? s.get() : s)), we(s) ? s.get() : s;
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
      const c = Wd(this.props, l, this.presenceContext?.custom);
      c && (s = c[e]);
    }
    if (l && s !== void 0)
      return s;
    const r = this.getBaseTargetFromProps(this.props, e);
    return r !== void 0 && !we(r) ? r : this.initialValues[e] !== void 0 && s === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, l) {
    return this.events[e] || (this.events[e] = new Vd()), this.events[e].add(l);
  }
  notify(e, ...l) {
    this.events[e] && this.events[e].notify(...l);
  }
  scheduleRenderMicrotask() {
    eh.render(this.render);
  }
}
class f2 extends j9 {
  constructor() {
    super(...arguments), this.KeyframeResolver = n9;
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
    we(e) && (this.childSubscription = e.on("change", (l) => {
      this.current && (this.current.textContent = `${l}`);
    }));
  }
}
class Ta {
  constructor(e) {
    this.isMounted = !1, this.node = e;
  }
  update() {
  }
}
function d2({ top: a, left: e, right: l, bottom: s }) {
  return {
    x: { min: e, max: l },
    y: { min: a, max: s }
  };
}
function M9({ x: a, y: e }) {
  return { top: e.min, right: a.max, bottom: e.max, left: a.min };
}
function _9(a, e) {
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
function wf(a) {
  return a === void 0 || a === 1;
}
function md({ scale: a, scaleX: e, scaleY: l }) {
  return !wf(a) || !wf(e) || !wf(l);
}
function Pa(a) {
  return md(a) || h2(a) || a.z || a.rotate || a.rotateX || a.rotateY || a.skewX || a.skewY;
}
function h2(a) {
  return Cy(a.x) || Cy(a.y);
}
function Cy(a) {
  return a && a !== "0%";
}
function wr(a, e, l) {
  const s = a - l, r = e * s;
  return l + r;
}
function Ey(a, e, l, s, r) {
  return r !== void 0 && (a = wr(a, r, s)), wr(a, l, s) + e;
}
function pd(a, e = 0, l = 1, s, r) {
  a.min = Ey(a.min, e, l, s, r), a.max = Ey(a.max, e, l, s, r);
}
function m2(a, { x: e, y: l }) {
  pd(a.x, e.translate, e.scale, e.originPoint), pd(a.y, l.translate, l.scale, l.originPoint);
}
const Ay = 0.999999999999, jy = 1.0000000000001;
function R9(a, e, l, s = !1) {
  const r = l.length;
  if (!r)
    return;
  e.x = e.y = 1;
  let c, f;
  for (let h = 0; h < r; h++) {
    c = l[h], f = c.projectionDelta;
    const { visualElement: y } = c.options;
    y && y.props.style && y.props.style.display === "contents" || (s && c.options.layoutScroll && c.scroll && c !== c.root && (Tn(a.x, -c.scroll.offset.x), Tn(a.y, -c.scroll.offset.y)), f && (e.x *= f.x.scale, e.y *= f.y.scale, m2(a, f)), s && Pa(c.latestValues) && cr(a, c.latestValues, c.layout?.layoutBox));
  }
  e.x < jy && e.x > Ay && (e.x = 1), e.y < jy && e.y > Ay && (e.y = 1);
}
function Tn(a, e) {
  a.min += e, a.max += e;
}
function My(a, e, l, s, r = 0.5) {
  const c = $t(a.min, a.max, r);
  pd(a, e, l, c, s);
}
function _y(a, e) {
  return typeof a == "string" ? parseFloat(a) / 100 * (e.max - e.min) : a;
}
function cr(a, e, l) {
  const s = l ?? a;
  My(a.x, _y(e.x, s.x), e.scaleX, e.scale, e.originX), My(a.y, _y(e.y, s.y), e.scaleY, e.scale, e.originY);
}
function p2(a, e) {
  return d2(_9(a.getBoundingClientRect(), e));
}
function D9(a, e, l) {
  const s = p2(a, l), { scroll: r } = e;
  return r && (Tn(s.x, r.offset.x), Tn(s.y, r.offset.y)), s;
}
const N9 = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, O9 = Ii.length;
function z9(a, e, l) {
  let s = "", r = !0;
  for (let f = 0; f < O9; f++) {
    const h = Ii[f], y = a[h];
    if (y === void 0)
      continue;
    let m = !0;
    if (typeof y == "number")
      m = y === (h.startsWith("scale") ? 1 : 0);
    else {
      const g = parseFloat(y);
      m = h.startsWith("scale") ? g === 1 : g === 0;
    }
    if (!m || l) {
      const g = hd(y, br[h]);
      if (!m) {
        r = !1;
        const v = N9[h] || h;
        s += `${v}(${g}) `;
      }
      l && (e[h] = g);
    }
  }
  const c = a.pathRotation;
  return c && (r = !1, s += `rotate(${hd(c, br.pathRotation)}) `), s = s.trim(), l ? s = l(e, r ? "" : s) : r && (s = "none"), s;
}
function oh(a, e, l) {
  const { style: s, vars: r, transformOrigin: c } = a;
  let f = !1, h = !1;
  for (const y in e) {
    const m = e[y];
    if (tl.has(y)) {
      f = !0;
      continue;
    } else if (Av(y)) {
      r[y] = m;
      continue;
    } else {
      const g = hd(m, br[y]);
      y.startsWith("origin") ? (h = !0, c[y] = g) : s[y] = g;
    }
  }
  if (e.transform || (f || l ? s.transform = z9(e, a.transform, l) : s.transform && (s.transform = "none")), h) {
    const { originX: y = "50%", originY: m = "50%", originZ: g = 0 } = c;
    s.transformOrigin = `${y} ${m} ${g}`;
  }
}
function y2(a, { style: e, vars: l }, s, r) {
  const c = a.style;
  let f;
  for (f in e)
    c[f] = e[f];
  r?.applyProjectionStyles(c, s);
  for (f in l)
    c.setProperty(f, l[f]);
}
function Ry(a, e) {
  return e.max === e.min ? 0 : a / (e.max - e.min) * 100;
}
const ts = {
  correct: (a, e) => {
    if (!e.target)
      return a;
    if (typeof a == "string")
      if (ct.test(a))
        a = parseFloat(a);
      else
        return a;
    const l = Ry(a, e.target.x), s = Ry(a, e.target.y);
    return `${l}% ${s}%`;
  }
}, L9 = {
  correct: (a, { treeScale: e, projectionDelta: l }) => {
    const s = a, r = mn.parse(a);
    if (r.length > 5)
      return s;
    const c = mn.createTransformer(a), f = typeof r[0] != "number" ? 1 : 0, h = l.x.scale * e.x, y = l.y.scale * e.y;
    r[0 + f] /= h, r[1 + f] /= y;
    const m = $t(h, y, 0.5);
    return typeof r[2 + f] == "number" && (r[2 + f] /= m), typeof r[3 + f] == "number" && (r[3 + f] /= m), c(r);
  }
}, yd = {
  borderRadius: {
    ...ts,
    applyTo: [...th]
  },
  borderTopLeftRadius: ts,
  borderTopRightRadius: ts,
  borderBottomLeftRadius: ts,
  borderBottomRightRadius: ts,
  boxShadow: L9
};
function g2(a, { layout: e, layoutId: l }) {
  return tl.has(a) || a.startsWith("origin") || (e || l !== void 0) && (!!yd[a] || a === "opacity");
}
function rh(a, e, l) {
  const s = a.style, r = e?.style, c = {};
  if (!s)
    return c;
  for (const f in s)
    (we(s[f]) || r && we(r[f]) || g2(f, a) || l?.getValue(f)?.liveStyle !== void 0) && (c[f] = s[f]);
  return c;
}
function B9(a) {
  return window.getComputedStyle(a);
}
class V9 extends f2 {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = y2;
  }
  readValueFromInstance(e, l) {
    if (tl.has(l))
      return this.projection?.isProjecting ? nd(l) : i5(e, l);
    {
      const s = B9(e), r = (Av(l) ? s.getPropertyValue(l) : s[l]) || 0;
      return typeof r == "string" ? r.trim() : r;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: l }) {
    return p2(e, l);
  }
  build(e, l, s) {
    oh(e, l, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, l, s) {
    return rh(e, l, s);
  }
}
const U9 = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, k9 = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function H9(a, e, l = 1, s = 0, r = !0) {
  a.pathLength = 1;
  const c = r ? U9 : k9;
  a[c.offset] = `${-s}`, a[c.array] = `${e} ${l}`;
}
const q9 = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function v2(a, {
  attrX: e,
  attrY: l,
  attrScale: s,
  pathLength: r,
  pathSpacing: c = 1,
  pathOffset: f = 0,
  // This is object creation, which we try to avoid per-frame.
  ...h
}, y, m, g) {
  if (oh(a, h, m), y) {
    a.style.viewBox && (a.attrs.viewBox = a.style.viewBox);
    return;
  }
  a.attrs = a.style, a.style = {};
  const { attrs: v, style: b } = a;
  v.transform && (b.transform = v.transform, delete v.transform), (b.transform || v.transformOrigin) && (b.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), b.transform && (b.transformBox = g?.transformBox ?? "fill-box", delete v.transformBox);
  for (const T of q9)
    v[T] !== void 0 && (b[T] = v[T], delete v[T]);
  e !== void 0 && (v.x = e), l !== void 0 && (v.y = l), s !== void 0 && (v.scale = s), r !== void 0 && H9(v, r, c, f, !1);
}
const b2 = /* @__PURE__ */ new Set([
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
]), x2 = (a) => typeof a == "string" && a.toLowerCase() === "svg";
function $9(a, e, l, s) {
  y2(a, e, void 0, s);
  for (const r in e.attrs)
    a.setAttribute(b2.has(r) ? r : Id(r), e.attrs[r]);
}
function S2(a, e, l) {
  const s = rh(a, e, l);
  for (const r in a)
    if (we(a[r]) || we(e[r])) {
      const c = Ii.indexOf(r) !== -1 ? "attr" + r.charAt(0).toUpperCase() + r.substring(1) : r;
      s[c] = a[r];
    }
  return s;
}
class G9 extends f2 {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = he;
  }
  getBaseTargetFromProps(e, l) {
    return e[l];
  }
  readValueFromInstance(e, l) {
    if (tl.has(l)) {
      const s = e2(l);
      return s && s.default || 0;
    }
    return l = b2.has(l) ? l : Id(l), e.getAttribute(l);
  }
  scrapeMotionValuesFromProps(e, l, s) {
    return S2(e, l, s);
  }
  build(e, l, s) {
    v2(e, l, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(e, l, s, r) {
    $9(e, l, s, r);
  }
  mount(e) {
    this.isSVGTag = x2(e.tagName), super.mount(e);
  }
}
const Y9 = lh.length;
function w2(a) {
  if (!a)
    return;
  if (!a.isControllingVariants) {
    const l = a.parent ? w2(a.parent) || {} : {};
    return a.props.initial !== void 0 && (l.initial = a.props.initial), l;
  }
  const e = {};
  for (let l = 0; l < Y9; l++) {
    const s = lh[l], r = a.props[s];
    (ms(r) || r === !1) && (e[s] = r);
  }
  return e;
}
function T2(a, e) {
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
const X9 = [...ih].reverse(), P9 = ih.length;
function K9(a) {
  return (e) => Promise.all(e.map(({ animation: l, options: s }) => X5(a, l, s)));
}
function Z9(a) {
  let e = K9(a), l = Dy(), s = !0, r = !1;
  const c = (m) => (g, v) => {
    const b = Ia(a, v, m === "exit" ? a.presenceContext?.custom : void 0);
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
    const { props: g } = a, v = w2(a.parent) || {}, b = [], T = /* @__PURE__ */ new Set();
    let S = {}, w = 1 / 0;
    for (let _ = 0; _ < P9; _++) {
      const M = X9[_], j = l[M], D = g[M] !== void 0 ? g[M] : v[M], B = ms(D), V = M === m ? j.isActive : null;
      V === !1 && (w = _);
      let R = D === v[M] && D !== g[M] && B;
      if (R && (s || r) && a.manuallyAnimateOnMount && (R = !1), j.protectedKeys = { ...S }, // If it isn't active and hasn't *just* been set as inactive
      !j.isActive && V === null || // If we didn't and don't have any defined prop for this animation type
      !D && !j.prevProp || // Or if the prop doesn't define an animation
      Dr(D) || typeof D == "boolean")
        continue;
      if (M === "exit" && j.isActive && V !== !0) {
        j.prevResolvedValues && (S = {
          ...S,
          ...j.prevResolvedValues
        });
        continue;
      }
      const k = Q9(j.prevProp, D);
      let P = k || // If we're making this variant active, we want to always make it active
      M === m && j.isActive && !R && B || // If we removed a higher-priority variant (i is in reverse order)
      _ > w && B, K = !1;
      const it = Array.isArray(D) ? D : [D];
      let et = it.reduce(c(M), {});
      V === !1 && (et = {});
      const { prevResolvedValues: I = {} } = j, J = {
        ...I,
        ...et
      }, nt = (Q) => {
        P = !0, T.has(Q) && (K = !0, T.delete(Q)), j.needsAnimating[Q] = !0;
        const at = a.getValue(Q);
        at && (at.liveStyle = !1);
      };
      for (const Q in J) {
        const at = et[Q], st = I[Q];
        if (S.hasOwnProperty(Q))
          continue;
        let N = !1;
        rd(at) && rd(st) ? N = !T2(at, st) || k : N = at !== st, N ? at != null ? nt(Q) : T.add(Q) : at !== void 0 && T.has(Q) ? nt(Q) : j.protectedKeys[Q] = !0;
      }
      j.prevProp = D, j.prevResolvedValues = et, j.isActive && (S = { ...S, ...et }), (s || r) && a.blockInitialAnimation && (P = !1);
      const O = R && k;
      P && (!O || K) && b.push(...it.map((Q) => {
        const at = { type: M };
        if (typeof Q == "string" && (s || r) && !O && a.manuallyAnimateOnMount && a.parent) {
          const { parent: st } = a, N = Ia(st, Q);
          if (st.enteringChildren && N) {
            const { delayChildren: G } = N.transition || {};
            at.delay = Pv(st.enteringChildren, a, G);
          }
        }
        return {
          animation: Q,
          options: at
        };
      }));
    }
    if (T.size) {
      const _ = {};
      if (typeof g.initial != "boolean") {
        const M = Ia(a, Array.isArray(g.initial) ? g.initial[0] : g.initial);
        M && M.transition && (_.transition = M.transition);
      }
      T.forEach((M) => {
        const j = a.getBaseTarget(M), D = a.getValue(M);
        D && (D.liveStyle = !0), _[M] = j ?? null;
      }), b.push({ animation: _ });
    }
    let A = !!b.length;
    return s && (g.initial === !1 || g.initial === g.animate) && !a.manuallyAnimateOnMount && (A = !1), s = !1, r = !1, A ? e(b) : Promise.resolve();
  }
  function y(m, g) {
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
    setActive: y,
    setAnimateFunction: f,
    getState: () => l,
    reset: () => {
      l = Dy(), r = !0;
    }
  };
}
function Q9(a, e) {
  return typeof e == "string" ? e !== a : Array.isArray(e) ? !T2(e, a) : !1;
}
function $a(a = !1) {
  return {
    isActive: a,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Dy() {
  return {
    animate: $a(!0),
    whileInView: $a(),
    whileHover: $a(),
    whileTap: $a(),
    whileDrag: $a(),
    whileFocus: $a(),
    exit: $a()
  };
}
function gd(a, e) {
  a.min = e.min, a.max = e.max;
}
function un(a, e) {
  gd(a.x, e.x), gd(a.y, e.y);
}
function Ny(a, e) {
  a.translate = e.translate, a.scale = e.scale, a.originPoint = e.originPoint, a.origin = e.origin;
}
const C2 = 1e-4, F9 = 1 - C2, J9 = 1 + C2, E2 = 0.01, W9 = 0 - E2, I9 = 0 + E2;
function je(a) {
  return a.max - a.min;
}
function t6(a, e, l) {
  return Math.abs(a - e) <= l;
}
function Oy(a, e, l, s = 0.5) {
  a.origin = s, a.originPoint = $t(e.min, e.max, a.origin), a.scale = je(l) / je(e), a.translate = $t(l.min, l.max, a.origin) - a.originPoint, (a.scale >= F9 && a.scale <= J9 || isNaN(a.scale)) && (a.scale = 1), (a.translate >= W9 && a.translate <= I9 || isNaN(a.translate)) && (a.translate = 0);
}
function us(a, e, l, s) {
  Oy(a.x, e.x, l.x, s ? s.originX : void 0), Oy(a.y, e.y, l.y, s ? s.originY : void 0);
}
function zy(a, e, l, s = 0) {
  const r = s ? $t(l.min, l.max, s) : l.min;
  a.min = r + e.min, a.max = a.min + je(e);
}
function e6(a, e, l, s) {
  zy(a.x, e.x, l.x, s?.x), zy(a.y, e.y, l.y, s?.y);
}
function Ly(a, e, l, s = 0) {
  const r = s ? $t(l.min, l.max, s) : l.min;
  a.min = e.min - r, a.max = a.min + je(e);
}
function Tr(a, e, l, s) {
  Ly(a.x, e.x, l.x, s?.x), Ly(a.y, e.y, l.y, s?.y);
}
function By(a, e, l, s, r) {
  return a -= e, a = wr(a, 1 / l, s), r !== void 0 && (a = wr(a, 1 / r, s)), a;
}
function n6(a, e = 0, l = 1, s = 0.5, r, c = a, f = a) {
  if (Cn.test(e) && (e = parseFloat(e), e = $t(f.min, f.max, e / 100) - f.min), typeof e != "number")
    return;
  let h = $t(c.min, c.max, s);
  a === c && (h -= e), a.min = By(a.min, e, l, h, r), a.max = By(a.max, e, l, h, r);
}
function Vy(a, e, [l, s, r], c, f) {
  n6(a, e[l], e[s], e[r], e.scale, c, f);
}
const a6 = ["x", "scaleX", "originX"], i6 = ["y", "scaleY", "originY"];
function Uy(a, e, l, s) {
  Vy(a.x, e, a6, l ? l.x : void 0, s ? s.x : void 0), Vy(a.y, e, i6, l ? l.y : void 0, s ? s.y : void 0);
}
function ky(a) {
  return a.translate === 0 && a.scale === 1;
}
function A2(a) {
  return ky(a.x) && ky(a.y);
}
function Hy(a, e) {
  return a.min === e.min && a.max === e.max;
}
function l6(a, e) {
  return Hy(a.x, e.x) && Hy(a.y, e.y);
}
function qy(a, e) {
  return Math.round(a.min) === Math.round(e.min) && Math.round(a.max) === Math.round(e.max);
}
function j2(a, e) {
  return qy(a.x, e.x) && qy(a.y, e.y);
}
function $y(a) {
  return je(a.x) / je(a.y);
}
function Gy(a, e) {
  return a.translate === e.translate && a.scale === e.scale && a.originPoint === e.originPoint;
}
function wn(a) {
  return [a("x"), a("y")];
}
function s6(a, e, l) {
  let s = "";
  const r = a.x.translate / e.x, c = a.y.translate / e.y, f = l?.z || 0;
  if ((r || c || f) && (s = `translate3d(${r}px, ${c}px, ${f}px) `), (e.x !== 1 || e.y !== 1) && (s += `scale(${1 / e.x}, ${1 / e.y}) `), l) {
    const { transformPerspective: m, rotate: g, pathRotation: v, rotateX: b, rotateY: T, skewX: S, skewY: w } = l;
    m && (s = `perspective(${m}px) ${s}`), g && (s += `rotate(${g}deg) `), v && (s += `rotate(${v}deg) `), b && (s += `rotateX(${b}deg) `), T && (s += `rotateY(${T}deg) `), S && (s += `skewX(${S}deg) `), w && (s += `skewY(${w}deg) `);
  }
  const h = a.x.scale * e.x, y = a.y.scale * e.y;
  return (h !== 1 || y !== 1) && (s += `scale(${h}, ${y})`), s || "none";
}
const o6 = th.length, Yy = (a) => typeof a == "string" ? parseFloat(a) : a, Xy = (a) => typeof a == "number" || ct.test(a);
function r6(a, e, l, s, r, c) {
  r ? (a.opacity = $t(0, l.opacity ?? 1, u6(s)), a.opacityExit = $t(e.opacity ?? 1, 0, c6(s))) : c && (a.opacity = $t(e.opacity ?? 1, l.opacity ?? 1, s));
  for (let f = 0; f < o6; f++) {
    const h = th[f];
    let y = Py(e, h), m = Py(l, h);
    if (y === void 0 && m === void 0)
      continue;
    y || (y = 0), m || (m = 0), y === 0 || m === 0 || Xy(y) === Xy(m) ? (a[h] = Math.max($t(Yy(y), Yy(m), s), 0), (Cn.test(m) || Cn.test(y)) && (a[h] += "%")) : a[h] = m;
  }
  (e.rotate || l.rotate) && (a.rotate = $t(e.rotate || 0, l.rotate || 0, s));
}
function Py(a, e) {
  return a[e] !== void 0 ? a[e] : a.borderRadius;
}
const u6 = /* @__PURE__ */ M2(0, 0.5, xv), c6 = /* @__PURE__ */ M2(0.5, 0.95, ln);
function M2(a, e, l) {
  return (s) => s < a ? 0 : s > e ? 1 : l(/* @__PURE__ */ ds(a, e, s));
}
function f6(a, e, l) {
  const s = we(a) ? a : Qi(a);
  return s.start(Jd("", s, e, l)), s.animation;
}
function ps(a, e, l, s = { passive: !0 }) {
  return a.addEventListener(e, l, s), () => a.removeEventListener(e, l, s);
}
const d6 = (a, e) => a.depth - e.depth;
class h6 {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(e) {
    Ld(this.children, e), this.isDirty = !0;
  }
  remove(e) {
    mr(this.children, e), this.isDirty = !0;
  }
  forEach(e) {
    this.isDirty && this.children.sort(d6), this.isDirty = !1, this.children.forEach(e);
  }
}
function m6(a, e) {
  const l = Ae.now(), s = ({ timestamp: r }) => {
    const c = r - l;
    c >= e && (Sa(s), a(c - e));
  };
  return Gt.setup(s, !0), () => Sa(s);
}
function fr(a) {
  return we(a) ? a.get() : a;
}
class p6 {
  constructor() {
    this.members = [];
  }
  add(e) {
    Ld(this.members, e);
    for (let l = this.members.length - 1; l >= 0; l--) {
      const s = this.members[l];
      if (s === e || s === this.lead || s === this.prevLead)
        continue;
      const r = s.instance;
      (!r || r.isConnected === !1) && !s.snapshot && (mr(this.members, s), s.unmount());
    }
    e.scheduleRender();
  }
  remove(e) {
    if (mr(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead) {
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
const dr = {
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
}, Tf = ["", "X", "Y", "Z"], y6 = 1e3;
let g6 = 0;
function Cf(a, e, l, s) {
  const { latestValues: r } = e;
  r[a] && (l[a] = r[a], e.setStaticValue(a, 0), s && (s[a] = 0));
}
function _2(a) {
  if (a.hasCheckedOptimisedAppear = !0, a.root === a)
    return;
  const { visualElement: e } = a.options;
  if (!e)
    return;
  const l = Jv(e);
  if (window.MotionHasOptimisedAnimation(l, "transform")) {
    const { layout: r, layoutId: c } = a.options;
    window.MotionCancelOptimisedAnimation(l, "transform", Gt, !(r || c));
  }
  const { parent: s } = a;
  s && !s.hasCheckedOptimisedAppear && _2(s);
}
function R2({ attachResizeListener: a, defaultParent: e, measureScroll: l, checkIsScrollRoot: s, resetTransform: r }) {
  return class {
    constructor(f = {}, h = e?.()) {
      this.id = g6++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(x6), this.nodes.forEach(A6), this.nodes.forEach(j6), this.nodes.forEach(S6);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = f, this.root = h ? h.root || h : this, this.path = h ? [...h.path, h] : [], this.parent = h, this.depth = h ? h.depth + 1 : 0;
      for (let y = 0; y < this.path.length; y++)
        this.path[y].shouldResetTransform = !0;
      this.root === this && (this.nodes = new h6());
    }
    addEventListener(f, h) {
      return this.eventHandlers.has(f) || this.eventHandlers.set(f, new Vd()), this.eventHandlers.get(f).add(h);
    }
    notifyListeners(f, ...h) {
      const y = this.eventHandlers.get(f);
      y && y.notify(...h);
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
      this.isSVG = ah(f) && !x9(f), this.instance = f;
      const { layoutId: h, layout: y, visualElement: m } = this.options;
      if (m && !m.current && m.mount(f), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (y || h) && (this.isLayoutDirty = !0), a) {
        let g, v = 0;
        const b = () => this.root.updateBlockedByResize = !1;
        Gt.read(() => {
          v = window.innerWidth;
        }), a(f, () => {
          const T = window.innerWidth;
          T !== v && (v = T, this.root.updateBlockedByResize = !0, g && g(), g = m6(b, 250), dr.hasAnimatedSinceResize && (dr.hasAnimatedSinceResize = !1, this.nodes.forEach(Qy)));
        });
      }
      h && this.root.registerSharedNode(h, this), this.options.animate !== !1 && m && (h || y) && this.addEventListener("didUpdate", ({ delta: g, hasLayoutChanged: v, hasRelativeLayoutChanged: b, layout: T }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const S = this.options.transition || m.getDefaultTransition() || N6, { onLayoutAnimationStart: w, onLayoutAnimationComplete: A } = m.getProps(), _ = !this.targetLayout || !j2(this.targetLayout, T), M = !v && b;
        if (this.options.layoutRoot || this.resumeFrom || M || v && (_ || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const j = {
            ...Fd(S, "layout"),
            onPlay: w,
            onComplete: A
          };
          (m.shouldReduceMotion || this.options.layoutRoot) && (j.delay = 0, j.type = !1), this.startAnimation(j), this.setAnimationOrigin(g, M, j.path);
        } else
          v || Qy(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = T;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const f = this.getStack();
      f && f.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), Sa(this.updateProjection);
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
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(M6), this.animationId++);
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
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && _2(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let g = 0; g < this.path.length; g++) {
        const v = this.path[g];
        v.shouldResetTransform = !0, (typeof v.latestValues.x == "string" || typeof v.latestValues.y == "string") && (v.isLayoutDirty = !0), v.updateScroll("snapshot"), v.options.layoutRoot && v.willUpdate(!1);
      }
      const { layoutId: h, layout: y } = this.options;
      if (h === void 0 && !y)
        return;
      const m = this.getTransformTemplate();
      this.prevTransformTemplateValue = m ? m(this.latestValues, "") : void 0, this.updateSnapshot(), f && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        const y = this.updateBlockedByResize;
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), y && this.nodes.forEach(T6), this.nodes.forEach(Ky);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Zy);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(C6), this.nodes.forEach(E6), this.nodes.forEach(v6), this.nodes.forEach(b6)) : this.nodes.forEach(Zy), this.clearAllSnapshots();
      const h = Ae.now();
      Se.delta = En(0, 1e3 / 60, h - Se.timestamp), Se.timestamp = h, Se.isProcessing = !0, pf.update.process(Se), pf.preRender.process(Se), pf.render.process(Se), Se.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, eh.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(w6), this.sharedNodes.forEach(_6);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, Gt.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Gt.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !je(this.snapshot.measuredBox.x) && !je(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let y = 0; y < this.path.length; y++)
          this.path[y].updateScroll();
      const f = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = he()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: h } = this.options;
      h && h.notify("LayoutMeasure", this.layout.layoutBox, f ? f.layoutBox : void 0);
    }
    updateScroll(f = "measure") {
      let h = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === f && (h = !1), h && this.instance) {
        const y = s(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: f,
          isRoot: y,
          offset: l(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : y
        };
      }
    }
    resetTransform() {
      if (!r)
        return;
      const f = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, h = this.projectionDelta && !A2(this.projectionDelta), y = this.getTransformTemplate(), m = y ? y(this.latestValues, "") : void 0, g = m !== this.prevTransformTemplateValue;
      f && this.instance && (h || Pa(this.latestValues) || g) && (r(this.instance, m), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(f = !0) {
      const h = this.measurePageBox();
      let y = this.removeElementScroll(h);
      return f && (y = this.removeTransform(y)), O6(y), {
        animationId: this.root.animationId,
        measuredBox: h,
        layoutBox: y,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: f } = this.options;
      if (!f)
        return he();
      const h = f.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(z6))) {
        const { scroll: m } = this.root;
        m && (Tn(h.x, m.offset.x), Tn(h.y, m.offset.y));
      }
      return h;
    }
    removeElementScroll(f) {
      const h = he();
      if (un(h, f), this.scroll?.wasRoot)
        return h;
      for (let y = 0; y < this.path.length; y++) {
        const m = this.path[y], { scroll: g, options: v } = m;
        m !== this.root && g && v.layoutScroll && (g.wasRoot && un(h, f), Tn(h.x, g.offset.x), Tn(h.y, g.offset.y));
      }
      return h;
    }
    applyTransform(f, h = !1, y) {
      const m = y || he();
      un(m, f);
      for (let g = 0; g < this.path.length; g++) {
        const v = this.path[g];
        !h && v.options.layoutScroll && v.scroll && v !== v.root && (Tn(m.x, -v.scroll.offset.x), Tn(m.y, -v.scroll.offset.y)), Pa(v.latestValues) && cr(m, v.latestValues, v.layout?.layoutBox);
      }
      return Pa(this.latestValues) && cr(m, this.latestValues, this.layout?.layoutBox), m;
    }
    removeTransform(f) {
      const h = he();
      un(h, f);
      for (let y = 0; y < this.path.length; y++) {
        const m = this.path[y];
        if (!Pa(m.latestValues))
          continue;
        let g;
        m.instance && (md(m.latestValues) && m.updateSnapshot(), g = he(), un(g, m.measurePageBox())), Uy(h, m.latestValues, m.snapshot?.layoutBox, g);
      }
      return Pa(this.latestValues) && Uy(h, this.latestValues), h;
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
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== Se.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(f = !1) {
      const h = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = h.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = h.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = h.isSharedProjectionDirty);
      const y = !!this.resumingFrom || this !== h;
      if (!(f || y && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: g, layoutId: v } = this.options;
      if (!this.layout || !(g || v))
        return;
      this.resolvedRelativeTargetAt = Se.timestamp;
      const b = this.getClosestProjectingParent();
      b && this.linkedParentVersion !== b.layoutVersion && !b.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && b && b.layout ? this.createRelativeTarget(b, this.layout.layoutBox, b.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = he(), this.targetWithTransforms = he()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), e6(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : un(this.target, this.layout.layoutBox), m2(this.target, this.targetDelta)) : un(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && b && !!b.resumingFrom == !!this.resumingFrom && !b.options.layoutScroll && b.target && this.animationProgress !== 1 ? this.createRelativeTarget(b, this.target, b.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || md(this.parent.latestValues) || h2(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(f, h, y) {
      this.relativeParent = f, this.linkedParentVersion = f.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = he(), this.relativeTargetOrigin = he(), Tr(this.relativeTargetOrigin, h, y, this.options.layoutAnchor || void 0), un(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const f = this.getLead(), h = !!this.resumingFrom || this !== f;
      let y = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (y = !1), h && (this.isSharedProjectionDirty || this.isTransformDirty) && (y = !1), this.resolvedRelativeTargetAt === Se.timestamp && (y = !1), y)
        return;
      const { layout: m, layoutId: g } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(m || g))
        return;
      un(this.layoutCorrected, this.layout.layoutBox);
      const v = this.treeScale.x, b = this.treeScale.y;
      R9(this.layoutCorrected, this.treeScale, this.path, h), f.layout && !f.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (f.target = f.layout.layoutBox, f.targetWithTransforms = he());
      const { target: T } = f;
      if (!T) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Ny(this.prevProjectionDelta.x, this.projectionDelta.x), Ny(this.prevProjectionDelta.y, this.projectionDelta.y)), us(this.projectionDelta, this.layoutCorrected, T, this.latestValues), (this.treeScale.x !== v || this.treeScale.y !== b || !Gy(this.projectionDelta.x, this.prevProjectionDelta.x) || !Gy(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", T));
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
      this.prevProjectionDelta = $i(), this.projectionDelta = $i(), this.projectionDeltaWithTransform = $i();
    }
    setAnimationOrigin(f, h = !1, y) {
      const m = this.snapshot, g = m ? m.latestValues : {}, v = { ...this.latestValues }, b = $i();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !h;
      const T = he(), S = m ? m.source : void 0, w = this.layout ? this.layout.source : void 0, A = S !== w, _ = this.getStack(), M = !_ || _.members.length <= 1, j = !!(A && !M && this.options.crossfade === !0 && !this.path.some(D6));
      this.animationProgress = 0;
      let D;
      const B = y?.interpolateProjection(f);
      this.mixTargetDelta = (V) => {
        const R = V / 1e3, k = B?.(R);
        k ? (b.x.translate = k.x, b.x.scale = $t(f.x.scale, 1, R), b.x.origin = f.x.origin, b.x.originPoint = f.x.originPoint, b.y.translate = k.y, b.y.scale = $t(f.y.scale, 1, R), b.y.origin = f.y.origin, b.y.originPoint = f.y.originPoint) : (Fy(b.x, f.x, R), Fy(b.y, f.y, R)), this.setTargetDelta(b), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Tr(T, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), R6(this.relativeTarget, this.relativeTargetOrigin, T, R), D && l6(this.relativeTarget, D) && (this.isProjectionDirty = !1), D || (D = he()), un(D, this.relativeTarget)), A && (this.animationValues = v, r6(v, g, this.latestValues, R, j, M)), k && k.rotate !== void 0 && (this.animationValues || (this.animationValues = v), this.animationValues.pathRotation = k.rotate), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = R;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(f) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (Sa(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = Gt.update(() => {
        dr.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = Qi(0)), this.motionValue.jump(0, !1), this.currentAnimation = f6(this.motionValue, [0, 1e3], {
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
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(y6), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const f = this.getLead();
      let { targetWithTransforms: h, target: y, layout: m, latestValues: g } = f;
      if (!(!h || !y || !m)) {
        if (this !== f && this.layout && m && D2(this.options.animationType, this.layout.layoutBox, m.layoutBox)) {
          y = this.target || he();
          const v = je(this.layout.layoutBox.x);
          y.x.min = f.target.x.min, y.x.max = y.x.min + v;
          const b = je(this.layout.layoutBox.y);
          y.y.min = f.target.y.min, y.y.max = y.y.min + b;
        }
        un(h, y), cr(h, g), us(this.projectionDeltaWithTransform, this.layoutCorrected, h, g);
      }
    }
    registerSharedNode(f, h) {
      this.sharedNodes.has(f) || this.sharedNodes.set(f, new p6()), this.sharedNodes.get(f).add(h);
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
    promote({ needsReset: f, transition: h, preserveFollowOpacity: y } = {}) {
      const m = this.getStack();
      m && m.promote(this, y), f && (this.projectionDelta = void 0, this.needsReset = !0), h && this.setOptions({ transition: h });
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
      const { latestValues: y } = f;
      if ((y.z || y.rotate || y.rotateX || y.rotateY || y.rotateZ || y.skewX || y.skewY) && (h = !0), !h)
        return;
      const m = {};
      y.z && Cf("z", f, m, this.animationValues);
      for (let g = 0; g < Tf.length; g++)
        Cf(`rotate${Tf[g]}`, f, m, this.animationValues), Cf(`skew${Tf[g]}`, f, m, this.animationValues);
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
      const y = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, f.visibility = "", f.opacity = "", f.pointerEvents = fr(h?.pointerEvents) || "", f.transform = y ? y(this.latestValues, "") : "none";
        return;
      }
      const m = this.getLead();
      if (!this.projectionDelta || !this.layout || !m.target) {
        this.options.layoutId && (f.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, f.pointerEvents = fr(h?.pointerEvents) || ""), this.hasProjected && !Pa(this.latestValues) && (f.transform = y ? y({}, "") : "none", this.hasProjected = !1);
        return;
      }
      f.visibility = "";
      const g = m.animationValues || m.latestValues;
      this.applyTransformsToTarget();
      let v = s6(this.projectionDeltaWithTransform, this.treeScale, g);
      y && (v = y(g, v)), f.transform = v;
      const { x: b, y: T } = this.projectionDelta;
      f.transformOrigin = `${b.origin * 100}% ${T.origin * 100}% 0`, m.animationValues ? f.opacity = m === this ? g.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : g.opacityExit : f.opacity = m === this ? g.opacity !== void 0 ? g.opacity : "" : g.opacityExit !== void 0 ? g.opacityExit : 0;
      for (const S in yd) {
        if (g[S] === void 0)
          continue;
        const { correct: w, applyTo: A, isCSSVariable: _ } = yd[S], M = v === "none" ? g[S] : w(g[S], m);
        if (A) {
          const j = A.length;
          for (let D = 0; D < j; D++)
            f[A[D]] = M;
        } else
          _ ? this.options.visualElement.renderState.vars[S] = M : f[S] = M;
      }
      this.options.layoutId && (f.pointerEvents = m === this ? fr(h?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((f) => f.currentAnimation?.stop()), this.root.nodes.forEach(Ky), this.root.sharedNodes.clear();
    }
  };
}
function v6(a) {
  a.updateLayout();
}
function b6(a) {
  const e = a.resumeFrom?.snapshot || a.snapshot;
  if (a.isLead() && a.layout && e && a.hasListeners("didUpdate")) {
    const { layoutBox: l, measuredBox: s } = a.layout, { animationType: r } = a.options, c = e.source !== a.layout.source;
    if (r === "size")
      wn((g) => {
        const v = c ? e.measuredBox[g] : e.layoutBox[g], b = je(v);
        v.min = l[g].min, v.max = v.min + b;
      });
    else if (r === "x" || r === "y") {
      const g = r === "x" ? "y" : "x";
      gd(c ? e.measuredBox[g] : e.layoutBox[g], l[g]);
    } else D2(r, e.layoutBox, l) && wn((g) => {
      const v = c ? e.measuredBox[g] : e.layoutBox[g], b = je(l[g]);
      v.max = v.min + b, a.relativeTarget && !a.currentAnimation && (a.isProjectionDirty = !0, a.relativeTarget[g].max = a.relativeTarget[g].min + b);
    });
    const f = $i();
    us(f, l, e.layoutBox);
    const h = $i();
    c ? us(h, a.applyTransform(s, !0), e.measuredBox) : us(h, l, e.layoutBox);
    const y = !A2(f);
    let m = !1;
    if (!a.resumeFrom) {
      const g = a.getClosestProjectingParent();
      if (g && !g.resumeFrom) {
        const { snapshot: v, layout: b } = g;
        if (v && b) {
          const T = a.options.layoutAnchor || void 0, S = he();
          Tr(S, e.layoutBox, v.layoutBox, T);
          const w = he();
          Tr(w, l, b.layoutBox, T), j2(S, w) || (m = !0), g.options.layoutRoot && (a.relativeTarget = w, a.relativeTargetOrigin = S, a.relativeParent = g);
        }
      }
    }
    a.notifyListeners("didUpdate", {
      layout: l,
      snapshot: e,
      delta: h,
      layoutDelta: f,
      hasLayoutChanged: y,
      hasRelativeLayoutChanged: m
    });
  } else if (a.isLead()) {
    const { onExitComplete: l } = a.options;
    l && l();
  }
  a.options.transition = void 0;
}
function x6(a) {
  a.parent && (a.isProjecting() || (a.isProjectionDirty = a.parent.isProjectionDirty), a.isSharedProjectionDirty || (a.isSharedProjectionDirty = !!(a.isProjectionDirty || a.parent.isProjectionDirty || a.parent.isSharedProjectionDirty)), a.isTransformDirty || (a.isTransformDirty = a.parent.isTransformDirty));
}
function S6(a) {
  a.isProjectionDirty = a.isSharedProjectionDirty = a.isTransformDirty = !1;
}
function w6(a) {
  a.clearSnapshot();
}
function Ky(a) {
  a.clearMeasurements();
}
function T6(a) {
  a.isLayoutDirty = !0, a.updateLayout();
}
function Zy(a) {
  a.isLayoutDirty = !1;
}
function C6(a) {
  a.isAnimationBlocked && a.layout && !a.isLayoutDirty && (a.snapshot = a.layout, a.isLayoutDirty = !0);
}
function E6(a) {
  const { visualElement: e } = a.options;
  e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), a.resetTransform();
}
function Qy(a) {
  a.finishAnimation(), a.targetDelta = a.relativeTarget = a.target = void 0, a.isProjectionDirty = !0;
}
function A6(a) {
  a.resolveTargetDelta();
}
function j6(a) {
  a.calcProjection();
}
function M6(a) {
  a.resetSkewAndRotation();
}
function _6(a) {
  a.removeLeadSnapshot();
}
function Fy(a, e, l) {
  a.translate = $t(e.translate, 0, l), a.scale = $t(e.scale, 1, l), a.origin = e.origin, a.originPoint = e.originPoint;
}
function Jy(a, e, l, s) {
  a.min = $t(e.min, l.min, s), a.max = $t(e.max, l.max, s);
}
function R6(a, e, l, s) {
  Jy(a.x, e.x, l.x, s), Jy(a.y, e.y, l.y, s);
}
function D6(a) {
  return a.animationValues && a.animationValues.opacityExit !== void 0;
}
const N6 = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, Wy = (a) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(a), Iy = Wy("applewebkit/") && !Wy("chrome/") ? Math.round : ln;
function tg(a) {
  a.min = Iy(a.min), a.max = Iy(a.max);
}
function O6(a) {
  tg(a.x), tg(a.y);
}
function D2(a, e, l) {
  return a === "position" || a === "preserve-aspect" && !t6($y(e), $y(l), 0.2);
}
function z6(a) {
  return a !== a.root && a.scroll?.wasRoot;
}
const L6 = R2({
  attachResizeListener: (a, e) => ps(a, "resize", e),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), Ef = {
  current: void 0
}, N2 = R2({
  measureScroll: (a) => ({
    x: a.scrollLeft,
    y: a.scrollTop
  }),
  defaultParent: () => {
    if (!Ef.current) {
      const a = new L6({});
      a.mount(window), a.setOptions({ layoutScroll: !0 }), Ef.current = a;
    }
    return Ef.current;
  },
  resetTransform: (a, e) => {
    a.style.transform = e !== void 0 ? e : "none";
  },
  checkIsScrollRoot: (a) => window.getComputedStyle(a).position === "fixed"
});
function B6(a, e) {
  if (Nr(a)) {
    const { initial: l, animate: s } = a;
    return {
      initial: l === !1 || ms(l) ? l : void 0,
      animate: ms(s) ? s : void 0
    };
  }
  return a.inherit !== !1 ? e : {};
}
function V6(a) {
  const { initial: e, animate: l } = B6(a, E.useContext(_r));
  return E.useMemo(() => ({ initial: e, animate: l }), [eg(e), eg(l)]);
}
function eg(a) {
  return Array.isArray(a) ? a.join(" ") : a;
}
const uh = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function O2(a, e, l) {
  for (const s in e)
    !we(e[s]) && !g2(s, l) && (a[s] = e[s]);
}
function U6({ transformTemplate: a }, e) {
  return E.useMemo(() => {
    const l = uh();
    return oh(l, e, a), Object.assign({}, l.vars, l.style);
  }, [e]);
}
function k6(a, e) {
  const l = a.style || {}, s = {};
  return O2(s, l, a), Object.assign(s, U6(a, e)), s;
}
function H6(a, e) {
  const l = {}, s = k6(a, e);
  return a.drag && a.dragListener !== !1 && (l.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = a.drag === !0 ? "none" : `pan-${a.drag === "x" ? "y" : "x"}`), a.tabIndex === void 0 && (a.onTap || a.onTapStart || a.whileTap) && (l.tabIndex = 0), l.style = s, l;
}
const z2 = () => ({
  ...uh(),
  attrs: {}
});
function q6(a, e, l, s) {
  const r = E.useMemo(() => {
    const c = z2();
    return v2(c, e, x2(s), a.transformTemplate, a.style), {
      ...c.attrs,
      style: { ...c.style }
    };
  }, [e]);
  if (a.style) {
    const c = {};
    O2(c, a.style, a), r.style = { ...c, ...r.style };
  }
  return r;
}
const $6 = /* @__PURE__ */ new Set([
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
function Cr(a) {
  return a.startsWith("while") || a.startsWith("drag") && a !== "draggable" || a.startsWith("layout") || a.startsWith("onTap") || a.startsWith("onPan") || a.startsWith("onLayout") || $6.has(a);
}
let L2 = (a) => !Cr(a);
function G6(a) {
  typeof a == "function" && (L2 = (e) => e.startsWith("on") ? !Cr(e) : a(e));
}
try {
  G6(require("@emotion/is-prop-valid").default);
} catch {
}
function Y6(a, e, l) {
  const s = {};
  for (const r in a)
    r === "values" && typeof a.values == "object" || we(a[r]) || (L2(r) || l === !0 && Cr(r) || !e && !Cr(r) || // If trying to use native HTML drag events, forward drag listeners
    a.draggable && r.startsWith("onDrag")) && (s[r] = a[r]);
  return s;
}
const X6 = [
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
function ch(a) {
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
      !!(X6.indexOf(a) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(a))
    )
  );
}
function P6(a, e, l, { latestValues: s }, r, c = !1, f) {
  const y = (f ?? ch(a) ? q6 : H6)(e, s, r, a), m = Y6(e, typeof a == "string", c), g = a !== E.Fragment ? { ...m, ...y, ref: l } : {}, { children: v } = e, b = E.useMemo(() => we(v) ? v.get() : v, [v]);
  return E.createElement(a, {
    ...g,
    children: b
  });
}
const Or = /* @__PURE__ */ E.createContext(null);
function fh(a) {
  const e = E.useRef(null);
  return e.current === null && (e.current = a()), e.current;
}
function K6({ scrapeMotionValuesFromProps: a, createRenderState: e }, l, s, r) {
  return {
    latestValues: Z6(l, s, r, a),
    renderState: e()
  };
}
function Z6(a, e, l, s) {
  const r = {}, c = s(a, {});
  for (const b in c)
    r[b] = fr(c[b]);
  let { initial: f, animate: h } = a;
  const y = Nr(a), m = r2(a);
  e && m && !y && a.inherit !== !1 && (f === void 0 && (f = e.initial), h === void 0 && (h = e.animate));
  let g = l ? l.initial === !1 : !1;
  g = g || f === !1;
  const v = g ? h : f;
  if (v && typeof v != "boolean" && !Dr(v)) {
    const b = Array.isArray(v) ? v : [v];
    for (let T = 0; T < b.length; T++) {
      const S = Wd(a, b[T]);
      if (S) {
        const { transitionEnd: w, transition: A, ..._ } = S;
        for (const M in _) {
          let j = _[M];
          if (Array.isArray(j)) {
            const D = g ? j.length - 1 : 0;
            j = j[D];
          }
          j !== null && (r[M] = j);
        }
        for (const M in w)
          r[M] = w[M];
      }
    }
  }
  return r;
}
const B2 = (a) => (e, l) => {
  const s = E.useContext(_r), r = E.useContext(Or), c = () => K6(a, e, s, r);
  return l ? c() : fh(c);
}, Q6 = /* @__PURE__ */ B2({
  scrapeMotionValuesFromProps: rh,
  createRenderState: uh
}), F6 = /* @__PURE__ */ B2({
  scrapeMotionValuesFromProps: S2,
  createRenderState: z2
}), ng = {
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
let ag = !1;
function J6() {
  if (ag)
    return;
  const a = {};
  for (const e in ng)
    a[e] = {
      isEnabled: (l) => ng[e].some((s) => !!l[s])
    };
  c2(a), ag = !0;
}
function V2() {
  return J6(), A9();
}
function ig(a) {
  const e = V2();
  for (const l in a)
    e[l] = {
      ...e[l],
      ...a[l]
    };
  c2(e);
}
const W6 = Symbol.for("motionComponentSymbol");
function I6(a, e, l) {
  const s = E.useRef(l);
  E.useInsertionEffect(() => {
    s.current = l;
  });
  const r = E.useRef(null);
  return E.useCallback((c) => {
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
const U2 = E.createContext({});
function ki(a) {
  return a && typeof a == "object" && Object.prototype.hasOwnProperty.call(a, "current");
}
const tw = typeof window < "u", dh = tw ? E.useLayoutEffect : E.useEffect;
function ew(a, e, l, s, r, c) {
  const { visualElement: f } = E.useContext(_r), h = E.useContext(qd), y = E.useContext(Or), m = E.useContext($d), g = m.reducedMotion, v = m.skipAnimations, b = E.useRef(null), T = E.useRef(!1);
  s = s || h.renderer, !b.current && s && (b.current = s(a, {
    visualState: e,
    parent: f,
    props: l,
    presenceContext: y,
    blockInitialAnimation: y ? y.initial === !1 : !1,
    reducedMotionConfig: g,
    skipAnimations: v,
    isSVG: c
  }), T.current && b.current && (b.current.manuallyAnimateOnMount = !0));
  const S = b.current, w = E.useContext(U2);
  S && !S.projection && r && (S.type === "html" || S.type === "svg") && nw(b.current, l, r, w);
  const A = E.useRef(!1);
  E.useInsertionEffect(() => {
    S && A.current && S.update(l, y);
  });
  const _ = l[Fv], M = E.useRef(!!_ && typeof window < "u" && !window.MotionHandoffIsComplete?.(_) && window.MotionHasOptimisedAnimation?.(_));
  return dh(() => {
    T.current = !0, S && (A.current = !0, window.MotionIsMounted = !0, S.updateFeatures(), S.scheduleRenderMicrotask(), M.current && S.animationState && S.animationState.animateChanges());
  }), E.useEffect(() => {
    S && (!M.current && S.animationState && S.animationState.animateChanges(), M.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(_);
    }), M.current = !1), S.enteringChildren = void 0);
  }), S;
}
function nw(a, e, l, s) {
  const { layoutId: r, layout: c, drag: f, dragConstraints: h, layoutScroll: y, layoutRoot: m, layoutAnchor: g, layoutCrossfade: v } = e;
  a.projection = new l(a.latestValues, e["data-framer-portal-id"] ? void 0 : k2(a.parent)), a.projection.setOptions({
    layoutId: r,
    layout: c,
    alwaysMeasureLayout: !!f || h && ki(h),
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
    layoutScroll: y,
    layoutRoot: m,
    layoutAnchor: g
  });
}
function k2(a) {
  if (a)
    return a.options.allowProjection !== !1 ? a.projection : k2(a.parent);
}
function aw(a, { forwardMotionProps: e = !1, type: l } = {}, s, r) {
  const c = l ? l === "svg" : ch(a), f = c ? F6 : Q6;
  function h(m, g) {
    let v;
    const b = {
      ...E.useContext($d),
      ...m,
      layoutId: iw(m)
    }, { isStatic: T } = b, S = V6(m), w = f(m, T);
    if (!T && typeof window < "u") {
      lw();
      const A = sw(b);
      v = A.MeasureLayout, S.visualElement = ew(a, w, b, r, A.ProjectionNode, c);
    }
    return p.jsxs(_r.Provider, { value: S, children: [v && S.visualElement ? p.jsx(v, { visualElement: S.visualElement, ...b }) : null, P6(a, m, I6(w, S.visualElement, g), w, T, e, c)] });
  }
  h.displayName = `motion.${typeof a == "string" ? a : `create(${a.displayName ?? a.name ?? ""})`}`;
  const y = E.forwardRef(h);
  return y[W6] = a, y;
}
function iw({ layoutId: a }) {
  const e = E.useContext(Hd).id;
  return e && a !== void 0 ? e + "-" + a : a;
}
function lw(a, e) {
  E.useContext(qd).strict;
}
function sw(a) {
  const e = V2(), { drag: l, layout: s } = e;
  if (!l && !s)
    return {};
  const r = { ...l, ...s };
  return {
    MeasureLayout: l?.isEnabled(a) || s?.isEnabled(a) ? r.MeasureLayout : void 0,
    ProjectionNode: r.ProjectionNode
  };
}
function hh(a, e) {
  return aw(a, e);
}
const ow = /* @__PURE__ */ hh("button"), Fi = /* @__PURE__ */ hh("div"), rw = /* @__PURE__ */ hh("span");
var uw = {
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
function cw({
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
    const v = uw[m], b = Math.min(
      ...v.map((T) => {
        const S = h[T.corner];
        if (g === 0 && S === 0)
          return 0;
        const w = f[T.corner], A = T.side === "top" || T.side === "bottom" ? r : c;
        return w >= 0 ? A - w : g / (g + S) * A;
      })
    );
    f[m] = b, h[m] = Math.min(g, b);
  });
  const y = (m) => ({
    radius: h[m],
    roundingAndSmoothingBudget: f[m]
  });
  return {
    topLeft: y("topLeft"),
    topRight: y("topRight"),
    bottomLeft: y("bottomLeft"),
    bottomRight: y("bottomRight")
  };
}
function is(a) {
  return a * Math.PI / 180;
}
function Pe(a, ...e) {
  let l = a[0];
  for (let s = 0; s < e.length; s++) {
    const r = e[s];
    l += typeof r == "number" ? r.toFixed(4) : r ?? "", l += a[s + 1];
  }
  return l;
}
var ys = {
  p: 0,
  pathSegment: () => ""
};
function fn(a, e, l) {
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
function dn(a, e, l) {
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
var fw = ({
  cornerRadius: a,
  roundingAndSmoothingBudget: e
}) => {
  const l = Math.min(a, e);
  return l <= 0 ? ys : {
    p: l,
    pathSegment: (s) => {
      const r = fn(l, l, s), c = dn(l, l, s);
      return Pe`a ${l} ${l} 0 0 1 ${r} ${c}`;
    }
  };
};
function mh({
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
  const c = 90 * (1 - e), f = Math.sin(is(c / 2)) * a * Math.sqrt(2), h = (90 - c) / 2, y = a * Math.tan(is(h / 2)), m = 45 * e, g = y * Math.cos(is(m)), v = g * Math.tan(is(m));
  let b = (r - f - g - v) / 3, T = 2 * b;
  if (l && r > s) {
    const S = s - v - f - g, w = S / 6, A = S - w;
    b = Math.min(b, A), T = S - b, r = Math.min(r, s);
  }
  return { a: T, b, c: g, d: v, p: r, arcSectionLength: f, cornerRadius: a };
}
var dw = ({
  cornerRadius: a,
  smoothing: e,
  preserveSmoothing: l,
  roundingAndSmoothingBudget: s
}) => {
  const r = mh({
    cornerRadius: a,
    cornerSmoothing: e,
    preserveSmoothing: l,
    roundingAndSmoothingBudget: s
  });
  return r.cornerRadius <= 0 ? ys : {
    p: r.p,
    pathSegment: (c) => {
      switch (c) {
        case "TR":
          return hw(r);
        case "BR":
          return mw(r);
        case "BL":
          return pw(r);
        case "TL":
          return yw(r);
      }
    }
  };
};
function hw({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Pe`c ${e} 0 ${e + l} 0 ${e + l + s} ${r} a ${a} ${a} 0 0 1 ${c} ${c} c ${r} ${s} ${r} ${l + s} ${r} ${e + l + s}`;
}
function mw({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Pe`c 0 ${e} 0 ${e + l} ${-r} ${e + l + s} a ${a} ${a} 0 0 1 -${c} ${c} c ${-s} ${r} ${-(l + s)} ${r} ${-(e + l + s)} ${r}`;
}
function pw({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Pe`c ${-e} 0 ${-(e + l)} 0 ${-(e + l + s)} ${-r} a ${a} ${a} 0 0 1 -${c} -${c} c ${-r} ${-s} ${-r} ${-(l + s)} ${-r} ${-(e + l + s)}`;
}
function yw({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Pe`c 0 ${-e} 0 ${-(e + l)} ${r} ${-(e + l + s)} a ${a} ${a} 0 0 1 ${c} -${c} c ${s} ${-r} ${l + s} ${-r} ${e + l + s} ${-r}`;
}
var gw = ({
  cornerRadius: a,
  exponent: e,
  roundingAndSmoothingBudget: l
}) => {
  const s = Math.min(a, l);
  if (s <= 0) return ys;
  const r = Number.isFinite(e) ? Math.max(2, e) : 4, c = 2 / r, f = r === 2 ? (b) => b : r === 4 ? Math.sqrt : r === 8 ? (b) => Math.sqrt(Math.sqrt(b)) : (b) => Math.pow(b, c), h = c - 1, y = r === 2 ? () => 1 : r === 4 ? (b) => 1 / Math.sqrt(b) : (b) => Math.pow(b, h), m = [0, Math.PI / 6, Math.PI / 3, Math.PI / 2], g = m.map((b, T) => {
    if (T === 0) return [0, 0];
    if (T === m.length - 1) return [s, s];
    const S = Math.sin(b), w = Math.cos(b);
    return [s * f(S), s * (1 - f(w))];
  }), v = m.map((b, T) => {
    if (T === 0) return [1, 0];
    if (T === m.length - 1) return [0, 1];
    const S = Math.sin(b), w = Math.cos(b), A = c * y(S) * w * s, _ = c * y(w) * S * s, M = Math.hypot(A, _) || 1;
    return [A / M, _ / M];
  });
  return {
    p: s,
    pathSegment: (b) => {
      const T = [];
      for (let S = 0; S < m.length - 1; S++) {
        const [w, A] = g[S], [_, M] = g[S + 1], [j, D] = v[S], [B, V] = v[S + 1], R = (m[S] + m[S + 1]) / 2, k = Math.sin(R), P = Math.cos(R), K = s * f(k), it = s * (1 - f(P)), et = 8 / 3 * (K - (w + _) / 2), I = 8 / 3 * (it - (A + M) / 2), J = B * D - V * j, nt = J !== 0 ? (-V * et + B * I) / J : 0, O = J !== 0 ? (j * I - D * et) / J : 0, Y = w + nt * j, Q = A + nt * D, at = _ - O * B, st = M - O * V, N = Y - w, G = Q - A, tt = at - w, ot = st - A, dt = _ - w, ht = M - A, vt = fn(N, G, b), Nt = dn(N, G, b), _t = fn(tt, ot, b), Kt = dn(tt, ot, b), rt = fn(dt, ht, b), Mt = dn(dt, ht, b);
        T.push(Pe`c ${vt} ${Nt} ${_t} ${Kt} ${rt} ${Mt}`);
      }
      return T.join(" ");
    }
  };
};
function lg(a, e, l, s) {
  if (s <= 0) return { x: 0, y: 0, theta: a };
  const c = s / 32;
  let f = 0, h = 0;
  for (let m = 1; m <= 32; m++) {
    const g = (m - 1) * c, v = g + c, b = (g + v) / 2, T = a + e * g + l / 2 * g * g, S = a + e * v + l / 2 * v * v, w = a + e * b + l / 2 * b * b;
    f += c / 6 * (Math.cos(T) + 4 * Math.cos(w) + Math.cos(S)), h += c / 6 * (Math.sin(T) + 4 * Math.sin(w) + Math.sin(S));
  }
  const y = a + e * s + l / 2 * s * s;
  return { x: f, y: h, theta: y };
}
var vw = 1e-6, bw = ({
  cornerRadius: a,
  smoothing: e,
  roundingAndSmoothingBudget: l
}) => {
  if (a <= 0) return ys;
  const s = Math.max(0, Math.min(1, e)), r = a, c = Math.PI / 4 * s, f = Math.PI / 2 * r * s, h = f > 0 ? 1 / (r * f) : 0, { x: y, y: m } = f > 0 ? lg(0, 0, h, f) : { x: 0, y: 0 }, { x: g, y: v } = f > 0 ? lg(0, 0, h, f / 2) : { x: 0, y: 0 }, b = y - r * Math.sin(c), T = m + r * Math.cos(c), S = b + T;
  let w = S, A = r, _ = y, M = m, j = g, D = v;
  if (S > l && S > 0) {
    const P = l / S;
    w = l, A = r * P, _ = y * P, M = m * P, j = g * P, D = v * P;
  }
  if (w <= 0)
    return ys;
  let B = 0, V = 0;
  if (f > 0) {
    const P = Math.cos(c), K = Math.sin(c);
    K > 1e-12 && (V = 8 / 3 * (M / 2 - D) / K), B = 8 / 3 * (j - _ / 2) + V * P;
  }
  const R = Math.PI / 2 - 2 * c, k = Math.abs(R) > vw;
  return {
    p: w,
    pathSegment: (P) => {
      const K = [];
      if (f > 0) {
        const it = B, et = 0, I = _ - V * Math.cos(c), J = M - V * Math.sin(c), nt = _, O = M, Y = fn(it, et, P), Q = dn(it, et, P), at = fn(I, J, P), st = dn(I, J, P), N = fn(nt, O, P), G = dn(nt, O, P);
        K.push(Pe`c ${Y} ${Q} ${at} ${st} ${N} ${G}`);
      }
      if (k) {
        const it = w - _ - M, et = w - _ - M, I = fn(it, et, P), J = dn(it, et, P);
        K.push(Pe`a ${A} ${A} 0 0 1 ${I} ${J}`);
      }
      if (f > 0) {
        const it = V * Math.sin(c), et = V * Math.cos(c), I = M, J = _ - B, nt = M, O = _, Y = fn(it, et, P), Q = dn(it, et, P), at = fn(I, J, P), st = dn(I, J, P), N = fn(nt, O, P), G = dn(nt, O, P);
        K.push(Pe`c ${Y} ${Q} ${at} ${st} ${N} ${G}`);
      }
      return K.join(" ");
    }
  };
}, xw = 4, Sw = {
  arc: fw,
  squircle: dw,
  superellipse: gw,
  clothoid: bw
};
function ww(a) {
  return Sw[a];
}
var Tw = 64, Ga = /* @__PURE__ */ new Map();
function Cw(a, e) {
  return a + "|" + e.cornerRadius + "|" + e.smoothing + "|" + e.exponent + "|" + (e.preserveSmoothing ? 1 : 0) + "|" + e.roundingAndSmoothingBudget;
}
function Ew(a) {
  return !Number.isFinite(a.cornerRadius) || !Number.isFinite(a.smoothing) || !Number.isFinite(a.exponent) || !Number.isFinite(a.roundingAndSmoothingBudget);
}
function Aw(a) {
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
function jw(a, e, l) {
  if (Ew(l)) return e(l);
  const s = Cw(a, l), r = Ga.get(s);
  if (r)
    return Ga.delete(s), Ga.set(s, r), r;
  const c = Aw(e(l));
  if (Ga.size >= Tw) {
    const f = Ga.keys().next().value;
    f !== void 0 && Ga.delete(f);
  }
  return Ga.set(s, c), c;
}
function Yo(a, e, l, s) {
  const r = Math.min(e, s / a - 1), c = mh({
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
function Mw({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Pe`c ${a} 0 ${a + e} 0 ${r} ${s} a ${h} ${h} 0 0 1 ${c} ${f} a ${h} ${h} 0 0 1 ${-c} ${f} c ${-l} ${s} ${-(e + l)} ${s} ${-r} ${s}`;
}
function _w({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Pe`c ${-a} 0 ${-(a + e)} 0 ${-r} ${-s} a ${h} ${h} 0 0 1 ${-c} ${-f} a ${h} ${h} 0 0 1 ${c} ${-f} c ${l} ${-s} ${e + l} ${-s} ${r} ${-s}`;
}
function Rw({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Pe`c 0 ${-a} 0 ${-(a + e)} ${s} ${-r} a ${h} ${h} 0 0 1 ${f} ${-c} a ${h} ${h} 0 0 1 ${f} ${c} c ${s} ${l} ${s} ${e + l} ${s} ${r}`;
}
function Dw({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Pe`c 0 ${a} 0 ${a + e} ${-s} ${r} a ${h} ${h} 0 0 1 ${-f} ${c} a ${h} ${h} 0 0 1 ${-f} ${-c} c ${-s} ${-l} ${-s} ${-(e + l)} ${-s} ${-r}`;
}
function sg(a, e, l, s) {
  const r = mh({
    cornerRadius: a,
    cornerSmoothing: e,
    preserveSmoothing: l,
    roundingAndSmoothingBudget: s
  }), c = is(45 * e);
  return {
    a: r.a,
    b: r.b,
    p: r.p,
    sin: Math.sin(c),
    cos: Math.cos(c)
  };
}
var og = (a, e, l) => Math.max(0, Math.min(a / e - 1, l)), de = (a) => (Object.is(a, -0) ? 0 : a).toFixed(4);
function Nw(a, e, l, s, r) {
  const c = sg(l, og(a / 2, l, s), r, a / 2), f = sg(l, og(e / 2, l, s), r, e / 2), h = (b, T, S, w, A, _) => {
    const M = w === 0 ? c : f, j = _ === 0 ? c : f, D = b + (S + A) * l, B = T + (w + _) * l, V = D - A * l * M.cos - S * l * M.sin, R = B - _ * l * M.cos - w * l * M.sin, k = D - S * l * j.cos - A * l * j.sin, P = B - w * l * j.cos - _ * l * j.sin, K = b + S * M.p, it = T + w * M.p, et = Math.hypot(k - V, P - R) > 1e-6, I = et ? k : V, J = et ? P : R, nt = b + A * j.p, O = T + _ * j.p;
    let Y = `L ${de(K)} ${de(it)} `;
    return Y += `c ${de(-S * M.a)} ${de(-w * M.a)} ${de(-S * (M.a + M.b))} ${de(-w * (M.a + M.b))} ${de(V - K)} ${de(R - it)} `, et && (Y += `a ${de(l)} ${de(l)} 0 0 1 ${de(k - V)} ${de(P - R)} `), Y += `c ${de(nt - A * (j.a + j.b) - I)} ${de(O - _ * (j.a + j.b) - J)} ${de(nt - A * j.a - I)} ${de(O - _ * j.a - J)} ${de(nt - I)} ${de(O - J)}`, Y;
  }, y = h(a, 0, -1, 0, 0, 1), m = h(a, e, 0, -1, -1, 0), g = h(0, e, 1, 0, 0, -1), v = h(0, 0, 0, 1, 1, 0);
  return `M ${de(c.p)} 0 ${y} ${m} ${g} ${v} Z`;
}
var Ow = 0.6, zw = !0, Lw = "squircle";
function H2(a) {
  return {
    radius: a.radius,
    curve: a.curve ?? Lw,
    smoothing: a.smoothing ?? Ow,
    exponent: a.exponent ?? xw,
    preserveSmoothing: a.preserveSmoothing ?? zw
  };
}
function Xo(a) {
  return H2(typeof a == "number" ? { radius: a } : a ?? { radius: 0 });
}
function Bw(a) {
  if ("radius" in a) {
    const e = H2(a);
    return { topLeft: e, topRight: e, bottomRight: e, bottomLeft: e };
  }
  return {
    topLeft: Xo(a.topLeft),
    topRight: Xo(a.topRight),
    bottomRight: Xo(a.bottomRight),
    bottomLeft: Xo(a.bottomLeft)
  };
}
function q2(a, e, l) {
  if (a <= 0 || e <= 0)
    return "M 0 0 H 0 V 0 H 0 Z";
  const s = Bw(l);
  if (s.topLeft.radius <= 0 && s.topRight.radius <= 0 && s.bottomRight.radius <= 0 && s.bottomLeft.radius <= 0)
    return `M 0 0 H ${a} V ${e} H 0 Z`;
  const r = cw({
    topLeftCornerRadius: s.topLeft.radius,
    topRightCornerRadius: s.topRight.radius,
    bottomRightCornerRadius: s.bottomRight.radius,
    bottomLeftCornerRadius: s.bottomLeft.radius,
    width: a,
    height: e
  }), c = (M) => {
    const j = s[M], D = ww(j.curve);
    return jw(j.curve, D, {
      cornerRadius: r[M].radius,
      smoothing: j.smoothing,
      exponent: j.exponent,
      preserveSmoothing: j.preserveSmoothing,
      roundingAndSmoothingBudget: r[M].roundingAndSmoothingBudget
    });
  }, f = (M) => {
    let j;
    return () => j ?? (j = c(M));
  }, h = f("topLeft"), y = f("topRight"), m = f("bottomRight"), g = f("bottomLeft"), v = (M) => M.toFixed(4), b = (M) => M.length > 0 ? " " + M : "", T = s.topLeft;
  if (Vw(s)) {
    const M = Math.min(T.radius, a / 2, e / 2), j = Math.min(a, e) / 2, D = 1e-9;
    if (M > 0 && j > M + D && j < (1 + T.smoothing) * M - D)
      return Nw(a, e, M, T.smoothing, T.preserveSmoothing);
  }
  const S = 1e-9, w = a >= e, A = w ? e / 2 : a / 2, _ = (M, j) => {
    const D = s[M], B = s[j];
    return D.curve === "squircle" && B.curve === "squircle" && Math.abs(r[M].radius - A) < S && Math.abs(r[j].radius - A) < S && D.smoothing === B.smoothing && D.preserveSmoothing === B.preserveSmoothing;
  };
  if (w) {
    const M = _("topRight", "bottomRight"), j = _("topLeft", "bottomLeft");
    if (M || j) {
      const D = a / 2, B = M ? Yo(A, s.topRight.smoothing, s.topRight.preserveSmoothing, D) : null, V = j ? Yo(A, s.topLeft.smoothing, s.topLeft.preserveSmoothing, D) : null;
      let R = "M " + v(V ? V.p : h().p) + " 0";
      return R += " L " + v(a - (B ? B.p : y().p)) + " 0", B ? R += " " + Mw(B) : (R += b(y().pathSegment("TR")), R += " L " + v(a) + " " + v(m().p), R += " L " + v(a) + " " + v(e - m().p), R += b(m().pathSegment("BR"))), V ? (R += " L " + v(V.p) + " " + v(e), R += " " + _w(V)) : (R += " L " + v(a - g().p) + " " + v(e), R += " L " + v(g().p) + " " + v(e), R += b(g().pathSegment("BL")), R += " L 0 " + v(e - h().p), R += " L 0 " + v(h().p), R += b(h().pathSegment("TL"))), R + " Z";
    }
  } else {
    const M = _("topLeft", "topRight"), j = _("bottomLeft", "bottomRight");
    if (M || j) {
      const D = e / 2, B = M ? Yo(A, s.topLeft.smoothing, s.topLeft.preserveSmoothing, D) : null, V = j ? Yo(A, s.bottomLeft.smoothing, s.bottomLeft.preserveSmoothing, D) : null;
      let R;
      return B ? R = "M 0 " + v(B.p) + " " + Rw(B) : (R = "M " + v(h().p) + " 0", R += " L " + v(a - y().p) + " 0", R += b(y().pathSegment("TR"))), R += " L " + v(a) + " " + v(e - (V ? V.p : m().p)), V ? R += " " + Dw(V) : (R += b(m().pathSegment("BR")), R += " L " + v(g().p) + " " + v(e), R += b(g().pathSegment("BL"))), B ? R += " L 0 " + v(B.p) : (R += " L 0 " + v(e - h().p), R += " L 0 " + v(h().p), R += b(h().pathSegment("TL"))), R + " Z";
    }
  }
  return "M " + v(h().p) + " 0 L " + v(a - y().p) + " 0" + b(y().pathSegment("TR")) + " L " + v(a) + " " + v(m().p) + " L " + v(a) + " " + v(e - m().p) + b(m().pathSegment("BR")) + " L " + v(a - g().p) + " " + v(e) + " L " + v(g().p) + " " + v(e) + b(g().pathSegment("BL")) + " L 0 " + v(e - h().p) + " L 0 " + v(h().p) + b(h().pathSegment("TL")) + " Z";
}
function Vw(a) {
  const e = a.topLeft;
  return e.curve === "squircle" && [a.topRight, a.bottomRight, a.bottomLeft].every(
    (l) => l.curve === "squircle" && l.radius === e.radius && l.smoothing === e.smoothing && l.preserveSmoothing === e.preserveSmoothing
  );
}
function Uw(a, e, l) {
  return `path("${q2(a, e, l)}")`;
}
var Ht = "http://www.w3.org/2000/svg", kw = 0;
function ph() {
  return ++kw;
}
function $2(a) {
  const e = a.replace("#", "");
  return e.length === 3 ? "#" + e[0] + e[0] + e[1] + e[1] + e[2] + e[2] : "#" + e;
}
function G2(a) {
  const e = $2(a).replace("#", "");
  return `rgb(${parseInt(e.substring(0, 2), 16)},${parseInt(e.substring(2, 4), 16)},${parseInt(e.substring(4, 6), 16)})`;
}
var Hw = {
  offsetX: 0,
  offsetY: 0,
  blur: 0,
  spread: 0,
  color: "#000",
  opacity: 0
};
function Y2(a) {
  const e = /* @__PURE__ */ new Map(), l = JSON.stringify(a);
  return (s, r, c, f) => {
    const h = `${s}:${r}:${f}:${l}`;
    let y = e.get(h);
    return y === void 0 && (y = q2(s, r, c), e.set(h, y)), y;
  };
}
function X2(a, e) {
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
function vd(a) {
  const e = $2(a).replace("#", ""), l = parseInt(e.substring(0, 2), 16), s = parseInt(e.substring(2, 4), 16), r = parseInt(e.substring(4, 6), 16);
  if (l === 0 && s === 0 && r === 0) return "#4c4c4c";
  const c = Math.round(l * 2 / 3), f = Math.round(s * 2 / 3), h = Math.round(r * 2 / 3);
  return "#" + (1 << 24 | c << 16 | f << 8 | h).toString(16).slice(1);
}
function bd(a) {
  return typeof a == "object" && a !== null && "type" in a;
}
function qw(a) {
  const e = (90 - a) * Math.PI / 180;
  return {
    x1: 0.5 - 0.5 * Math.cos(e),
    y1: 0.5 + 0.5 * Math.sin(e),
    x2: 0.5 + 0.5 * Math.cos(e),
    y2: 0.5 - 0.5 * Math.sin(e)
  };
}
function P2(a, e) {
  for (; a.lastChild; ) a.removeChild(a.lastChild);
  for (const l of e) {
    const s = document.createElementNS(Ht, "stop");
    s.setAttribute("offset", String(l.offset)), s.setAttribute("stop-color", l.color), l.opacity !== void 0 && l.opacity !== 1 && s.setAttribute("stop-opacity", String(l.opacity)), a.appendChild(s);
  }
}
function $w(a, e, l) {
  const s = e.type === "linear" ? "linearGradient" : "radialGradient", r = document.createElementNS(Ht, s);
  return r.setAttribute("id", l), K2(r, e), P2(r, e.stops), a.appendChild(r), r;
}
function Gw(a, e) {
  K2(a, e), P2(a, e.stops);
}
function K2(a, e) {
  if (e.type === "linear") {
    const l = qw(e.angle ?? 0);
    a.setAttribute("x1", String(l.x1)), a.setAttribute("y1", String(l.y1)), a.setAttribute("x2", String(l.x2)), a.setAttribute("y2", String(l.y2));
  } else
    a.setAttribute("cx", String(e.cx ?? 0.5)), a.setAttribute("cy", String(e.cy ?? 0.5)), a.setAttribute("r", String(e.r ?? 0.5));
}
function rg(a) {
  return { ...a, stops: a.stops.map((e) => ({ ...e, color: vd(e.color) })) };
}
function xd(a, e, l, s) {
  a.setAttribute("x", String(-e)), a.setAttribute("y", String(-e)), a.setAttribute("width", String(l + e * 2)), a.setAttribute("height", String(s + e * 2));
}
function Po(a, e, l, s, r) {
  xd(a, l, s, r), xd(e, l, s, r);
}
function Af(a, e, l) {
  const s = document.createElementNS(Ht, "mask");
  s.setAttribute("id", a), l && s.setAttribute("maskUnits", "userSpaceOnUse");
  const r = document.createElementNS(Ht, "rect");
  r.setAttribute("fill", "white");
  const c = document.createElementNS(Ht, "path");
  return c.setAttribute("fill", "none"), c.setAttribute("stroke", "black"), s.appendChild(r), s.appendChild(c), e.appendChild(s), { mask: s, rect: r, knockout: c };
}
function jf(a) {
  const e = document.createElementNS(Ht, "g"), l = document.createElementNS(Ht, "path");
  l.setAttribute("fill", "none"), a && l.setAttribute(a.attr, a.value), l.style.display = "none", e.appendChild(l);
  const s = document.createElementNS(Ht, "path");
  return s.setAttribute("fill", "none"), a && s.setAttribute(a.attr, a.value), s.style.display = "none", e.appendChild(s), { group: e, strokePath: l, grooveOverlay: s };
}
function hr(a, e) {
  const l = e === "main" ? "gradientEl" : "overlayGradientEl";
  a[l]?.remove(), a[l] = null;
}
function Ko(a, e, l) {
  if (!bd(a))
    return hr(e, l), a;
  const s = l === "main" ? "gradientEl" : "overlayGradientEl", r = l === "main" ? e.gradientId : e.overlayGradientId;
  return e[s] ? Gw(e[s], a) : e[s] = $w(e.defs, a, r), `url(#${r})`;
}
function Mf(a, e, l, s, r) {
  if (!a || a.width <= 0 || a.opacity <= 0) {
    r.strokePath.style.display = "none", r.strokeGroup.removeAttribute("mask"), r.grooveOverlay.style.display = "none", hr(r, "main"), hr(r, "overlay");
    return;
  }
  const c = r.strokeMultiplier;
  r.strokePath.style.display = "", r.strokePath.setAttribute("d", e), r.strokePath.setAttribute("stroke", Ko(a.color, r, "main")), r.strokePath.setAttribute("stroke-width", String(a.width * c)), r.strokePath.setAttribute("stroke-opacity", String(a.opacity));
  const f = a.style ?? "solid";
  switch (r.strokeGroup.removeAttribute("mask"), r.grooveOverlay.style.display = "none", r.strokePath.removeAttribute("stroke-dasharray"), r.strokePath.setAttribute("stroke-linecap", "butt"), f !== "groove" && f !== "ridge" && hr(r, "overlay"), f) {
    case "dashed": {
      const h = Math.max(0, a.dash ?? a.width * 3), y = Math.max(0, a.gap ?? a.width * 2);
      r.strokePath.setAttribute("stroke-dasharray", `${h} ${y}`), a.lineCap && r.strokePath.setAttribute("stroke-linecap", a.lineCap);
      break;
    }
    case "dotted": {
      const h = Math.max(0, a.dash ?? 0), y = Math.max(0, a.gap ?? a.width * 2);
      r.strokePath.setAttribute("stroke-dasharray", `${h} ${y}`), r.strokePath.setAttribute("stroke-linecap", a.lineCap ?? "round");
      break;
    }
    case "double":
      if (a.width >= 3) {
        const h = Math.round(a.width / 3);
        r.dblKnockout.setAttribute("d", e), r.dblKnockout.setAttribute("stroke-width", String(h * c)), r.dblRect.setAttribute("width", String(l)), r.dblRect.setAttribute("height", String(s)), r.padDblMask && r.padDblMask(a.width, l, s), r.strokeGroup.setAttribute("mask", `url(#${r.dblMaskId})`);
      }
      break;
    case "groove": {
      const h = bd(a.color) ? rg(a.color) : vd(a.color);
      r.strokePath.setAttribute("stroke", Ko(h, r, "main")), r.grooveOverlay.style.display = "", r.grooveOverlay.setAttribute("d", e), r.grooveOverlay.setAttribute("stroke", Ko(a.color, r, "overlay")), r.grooveOverlay.setAttribute("stroke-width", String(a.width * c / 2)), r.grooveOverlay.setAttribute("stroke-opacity", String(a.opacity));
      break;
    }
    case "ridge": {
      const h = bd(a.color) ? rg(a.color) : vd(a.color);
      r.grooveOverlay.style.display = "", r.grooveOverlay.setAttribute("d", e), r.grooveOverlay.setAttribute("stroke", Ko(h, r, "overlay")), r.grooveOverlay.setAttribute("stroke-width", String(a.width * c / 2)), r.grooveOverlay.setAttribute("stroke-opacity", String(a.opacity));
      break;
    }
  }
}
function Yw(a, e) {
  const l = ph(), s = `sc-ishadow-mask-${l}`, r = document.createElementNS(Ht, "mask");
  r.setAttribute("id", s), r.setAttribute("maskUnits", "userSpaceOnUse");
  const c = document.createElementNS(Ht, "rect");
  c.setAttribute("fill", "white");
  const f = document.createElementNS(Ht, "path");
  f.setAttribute("fill", "black"), r.appendChild(c), r.appendChild(f), a.appendChild(r);
  const h = `sc-ishadow-blur-${l}`, y = document.createElementNS(Ht, "filter");
  y.setAttribute("id", h), y.setAttribute("x", "-200%"), y.setAttribute("y", "-200%"), y.setAttribute("width", "500%"), y.setAttribute("height", "500%"), y.setAttribute("color-interpolation-filters", "sRGB");
  const m = document.createElementNS(Ht, "feGaussianBlur");
  m.setAttribute("stdDeviation", "0"), y.appendChild(m), a.appendChild(y);
  const g = document.createElementNS(Ht, "g"), v = document.createElementNS(Ht, "rect");
  return v.setAttribute("mask", `url(#${s})`), v.style.display = "none", g.appendChild(v), e.appendChild(g), { maskId: s, mask: r, maskRect: c, maskCutout: f, filterId: h, filter: y, feBlur: m, blurGroup: g, rect: v };
}
function Xw(a) {
  a.mask.remove(), a.filter.remove(), a.blurGroup.remove();
}
function Pw(a) {
  const e = ph(), l = `sc-clip-${e}`, s = `sc-mask-${e}`, r = document.createElementNS(Ht, "svg");
  r.style.position = "absolute", r.style.inset = "0", r.style.pointerEvents = "none", r.style.overflow = "visible", r.style.zIndex = "1", r.setAttribute("aria-hidden", "true");
  const c = document.createElementNS(Ht, "defs"), f = document.createElementNS(Ht, "clipPath");
  f.setAttribute("id", l);
  const h = document.createElementNS(Ht, "path");
  f.appendChild(h), c.appendChild(f);
  const y = document.createElementNS(Ht, "mask");
  y.setAttribute("id", s), y.setAttribute("maskUnits", "userSpaceOnUse");
  const m = document.createElementNS(Ht, "rect");
  m.setAttribute("fill", "white");
  const g = document.createElementNS(Ht, "path");
  g.setAttribute("fill", "black"), y.appendChild(m), y.appendChild(g), c.appendChild(y);
  const v = `sc-dbl-inner-${e}`, { rect: b, knockout: T } = Af(v, c, !1), S = `sc-dbl-outer-${e}`, { mask: w, rect: A, knockout: _ } = Af(S, c, !0), M = `sc-dbl-middle-${e}`, { mask: j, rect: D, knockout: B } = Af(M, c, !0);
  r.appendChild(c);
  const V = document.createElementNS(Ht, "g");
  V.setAttribute("clip-path", `url(#${l})`), r.appendChild(V);
  const R = [], { group: k, strokePath: P, grooveOverlay: K } = jf({ attr: "clip-path", value: `url(#${l})` });
  r.appendChild(k);
  const { group: it, strokePath: et, grooveOverlay: I } = jf({ attr: "mask", value: `url(#${s})` });
  r.appendChild(it);
  const { group: J, strokePath: nt, grooveOverlay: O } = jf();
  r.appendChild(J), a.appendChild(r);
  const Y = {
    strokePath: P,
    grooveOverlay: K,
    strokeGroup: k,
    dblMaskId: v,
    dblKnockout: T,
    dblRect: b,
    strokeMultiplier: 2,
    defs: c,
    gradientEl: null,
    gradientId: `sc-grad-inner-${e}`,
    overlayGradientEl: null,
    overlayGradientId: `sc-grad-inner-ov-${e}`
  }, Q = {
    strokePath: et,
    grooveOverlay: I,
    strokeGroup: it,
    dblMaskId: S,
    dblKnockout: _,
    dblRect: A,
    strokeMultiplier: 2,
    defs: c,
    gradientEl: null,
    gradientId: `sc-grad-outer-${e}`,
    overlayGradientEl: null,
    overlayGradientId: `sc-grad-outer-ov-${e}`,
    padDblMask: (st, N, G) => Po(w, A, st, N, G)
  }, at = {
    strokePath: nt,
    grooveOverlay: O,
    strokeGroup: J,
    dblMaskId: M,
    dblKnockout: B,
    dblRect: D,
    strokeMultiplier: 1,
    defs: c,
    gradientEl: null,
    gradientId: `sc-grad-middle-${e}`,
    overlayGradientEl: null,
    overlayGradientId: `sc-grad-middle-ov-${e}`,
    padDblMask: (st, N, G) => Po(j, D, st, N, G)
  };
  return {
    update(st, N, G, tt) {
      if (G <= 0 || tt <= 0) return;
      r.setAttribute("width", String(G)), r.setAttribute("height", String(tt)), r.setAttribute("viewBox", `0 0 ${G} ${tt}`);
      const ot = Y2(st), dt = ot(G, tt, st, 0);
      h.setAttribute("d", dt), g.setAttribute("d", dt), m.setAttribute("width", String(G)), m.setAttribute("height", String(tt)), Mf(N.innerBorder, dt, G, tt, Y);
      const ht = N.outerBorder;
      ht && ht.width > 0 && ht.opacity > 0 && Po(y, m, ht.width, G, tt), Mf(ht, dt, G, tt, Q), Mf(N.middleBorder, dt, G, tt, at);
      const vt = N.innerShadow, Nt = vt == null ? [] : Array.isArray(vt) ? vt : [vt];
      for (; R.length < Nt.length; )
        R.push(Yw(c, V));
      for (; R.length > Nt.length; )
        Xw(R.pop());
      for (let _t = 0; _t < Nt.length; _t++) {
        const Kt = Nt[_t], rt = R[_t];
        if (Kt.opacity <= 0) {
          rt.rect.style.display = "none";
          continue;
        }
        rt.rect.style.display = "";
        const Mt = Kt.spread, gn = Math.max(Kt.blur * 3, 20) + Math.max(Math.abs(Kt.offsetX), Math.abs(Kt.offsetY)) + Math.abs(Mt);
        Po(rt.mask, rt.maskRect, gn, G, tt);
        const An = Math.max(1, G - Mt * 2), il = Math.max(1, tt - Mt * 2), ll = Mt !== 0 ? X2(st, -Mt) : st;
        rt.maskCutout.setAttribute("d", ot(An, il, ll, -Mt)), rt.maskCutout.setAttribute(
          "transform",
          `translate(${Kt.offsetX + Mt},${Kt.offsetY + Mt})`
        ), Kt.blur > 0 ? (rt.feBlur.setAttribute("stdDeviation", String(Kt.blur)), rt.blurGroup.setAttribute("filter", `url(#${rt.filterId})`)) : rt.blurGroup.removeAttribute("filter"), xd(rt.rect, gn, G, tt), rt.rect.setAttribute("fill", G2(Kt.color)), rt.rect.setAttribute("fill-opacity", String(Kt.opacity));
      }
    },
    destroy() {
      r.remove();
    }
  };
}
function Kw(a, e) {
  return Math.ceil(3 * a + Math.abs(e) + 1);
}
function Zw(a, e, l, s) {
  a.setAttribute("x", String(-s)), a.setAttribute("y", String(-s)), a.setAttribute("width", String(e + 2 * s)), a.setAttribute("height", String(l + 2 * s));
}
function Qw(a, e) {
  const l = `sc-shadow-${ph()}`, s = document.createElementNS(Ht, "filter");
  s.setAttribute("id", l), s.setAttribute("filterUnits", "userSpaceOnUse"), s.setAttribute("color-interpolation-filters", "sRGB");
  const r = document.createElementNS(Ht, "feGaussianBlur");
  r.setAttribute("stdDeviation", "0"), s.appendChild(r), a.appendChild(s);
  const c = document.createElementNS(Ht, "path");
  return e.appendChild(c), { filterId: l, filterEl: s, feBlur: r, pathEl: c };
}
function Fw(a) {
  a.filterEl.remove(), a.pathEl.remove();
}
function Jw(a) {
  const e = a.style.isolation;
  a.style.isolation = "isolate";
  const l = document.createElementNS(Ht, "svg");
  l.style.cssText = "position:absolute;inset:0;overflow:visible;pointer-events:none;z-index:-1", l.setAttribute("width", "100%"), l.setAttribute("height", "100%"), l.setAttribute("aria-hidden", "true");
  const s = document.createElementNS(Ht, "defs");
  l.appendChild(s), a.appendChild(l);
  const r = [];
  return {
    update(c, f, h, y) {
      const m = Array.isArray(f) ? f : [f];
      if (!(h > 0 && y > 0 && m.some((T) => T.opacity > 0))) {
        l.style.display = "none";
        return;
      }
      for (; r.length < m.length; ) r.push(Qw(s, l));
      for (; r.length > m.length; ) Fw(r.pop());
      const v = Y2(c);
      let b = !1;
      for (let T = 0; T < m.length; T++) {
        const S = m[T], w = r[m.length - 1 - T];
        if (S.opacity <= 0) {
          w.pathEl.style.display = "none";
          continue;
        }
        const A = S.spread, _ = h + A * 2, M = y + A * 2;
        if (_ <= 0 || M <= 0) {
          w.pathEl.style.display = "none";
          continue;
        }
        b = !0, w.pathEl.style.display = "";
        const j = G2(S.color), D = X2(c, A);
        if (w.pathEl.setAttribute("d", v(_, M, D, A)), w.pathEl.setAttribute("transform", `translate(${S.offsetX - A},${S.offsetY - A})`), w.pathEl.setAttribute("fill", j), w.pathEl.setAttribute("fill-opacity", String(S.opacity)), S.blur > 0) {
          const B = Kw(S.blur, A);
          Zw(w.filterEl, _, M, B), w.feBlur.setAttribute("stdDeviation", String(S.blur)), w.pathEl.setAttribute("filter", `url(#${w.filterId})`);
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
var cs = null, va, ls = /* @__PURE__ */ new Map(), gs = /* @__PURE__ */ new Set();
function Z2() {
  va = void 0;
  const a = [...gs];
  gs.clear();
  for (const e of a) {
    const l = ls.get(e);
    if (l) for (const s of [...l]) s();
  }
}
function Ww() {
  return cs || (cs = new ResizeObserver((a) => {
    for (const e of a)
      gs.add(e.target);
    va === void 0 && (va = requestAnimationFrame(Z2));
  })), cs;
}
function Iw(a, e) {
  if (typeof ResizeObserver > "u") return () => {
  };
  const l = Ww();
  let s = ls.get(a);
  return s || (s = /* @__PURE__ */ new Set(), ls.set(a, s), l.observe(a)), s.add(e), gs.add(a), va === void 0 && (va = requestAnimationFrame(Z2)), () => {
    s.delete(e), s.size === 0 && (ls.delete(a), l.unobserve(a)), ls.size === 0 && (va !== void 0 && (cancelAnimationFrame(va), va = void 0), gs.clear(), cs?.disconnect(), cs = null);
  };
}
function tT(a) {
  const e = window.getComputedStyle(a), l = (m) => m.endsWith("px") ? parseFloat(m) : NaN, s = l(e.width), r = l(e.height);
  if (Number.isNaN(s) || Number.isNaN(r))
    return { width: a.offsetWidth, height: a.offsetHeight };
  if (e.boxSizing === "border-box")
    return { width: s, height: r };
  const c = (parseFloat(e.paddingLeft) || 0) + (parseFloat(e.paddingRight) || 0), f = (parseFloat(e.paddingTop) || 0) + (parseFloat(e.paddingBottom) || 0), h = (parseFloat(e.borderLeftWidth) || 0) + (parseFloat(e.borderRightWidth) || 0), y = (parseFloat(e.borderTopWidth) || 0) + (parseFloat(e.borderBottomWidth) || 0);
  return { width: s + c + h, height: r + f + y };
}
function Q2(a) {
  const e = a.match(
    /^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)(?:\s*[,/]\s*([\d.]+))?\s*\)$/
  );
  if (!e) return;
  const l = Number(e[1]), s = Number(e[2]), r = Number(e[3]), c = e[4] !== void 0 ? Number(e[4]) : 1;
  return { hex: "#" + (1 << 24 | l << 16 | s << 8 | r).toString(16).slice(1), opacity: c };
}
function eT(a) {
  const e = getComputedStyle(a), l = e.borderTopStyle;
  if (l === "none" || l === "hidden") return;
  const s = parseFloat(e.borderTopWidth);
  if (s <= 0 || isNaN(s)) return;
  const r = Q2(e.borderTopColor);
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
function nT(a) {
  if (!a || a === "none") return {};
  const e = [];
  let l = 0, s = 0;
  for (let f = 0; f < a.length; f++)
    a[f] === "(" ? l++ : a[f] === ")" ? l-- : a[f] === "," && l === 0 && (e.push(a.slice(s, f).trim()), s = f + 1);
  e.push(a.slice(s).trim());
  const r = [], c = [];
  for (const f of e) {
    const h = f.includes("inset"), y = f.replace("inset", "").trim(), m = y.match(/rgba?\([^)]+\)/);
    if (!m) continue;
    const g = Q2(m[0]);
    if (!g || g.opacity <= 0) continue;
    const b = y.replace(m[0], "").trim().split(/\s+/).map(parseFloat).filter((S) => !isNaN(S));
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
function ug(a) {
  const e = {
    border: a.style.border,
    boxShadow: a.style.boxShadow,
    paddingTop: a.style.paddingTop,
    paddingRight: a.style.paddingRight,
    paddingBottom: a.style.paddingBottom,
    paddingLeft: a.style.paddingLeft
  }, l = eT(a), s = getComputedStyle(a), { shadow: r, innerShadow: c } = nT(s.boxShadow), f = s.boxSizing, h = parseFloat(s.borderTopWidth) || 0, y = parseFloat(s.borderRightWidth) || 0, m = parseFloat(s.borderBottomWidth) || 0, g = parseFloat(s.borderLeftWidth) || 0, v = parseFloat(s.paddingTop) || 0, b = parseFloat(s.paddingRight) || 0, T = parseFloat(s.paddingBottom) || 0, S = parseFloat(s.paddingLeft) || 0;
  l && (a.style.border = "0"), (r || c) && (a.style.boxShadow = "none"), l && f === "content-box" && (h > 0 || y > 0 || m > 0 || g > 0) && (a.style.paddingTop = v + h + "px", a.style.paddingRight = b + y + "px", a.style.paddingBottom = T + m + "px", a.style.paddingLeft = S + g + "px");
  const w = {};
  return l && (w.innerBorder = l), r && (w.shadow = r), c && (w.innerShadow = c), { effects: w, savedStyles: e };
}
function yh(a) {
  return a ? !!(a.innerBorder || a.outerBorder || a.middleBorder || a.innerShadow || a.shadow) : !1;
}
function F2(a, e) {
  return { ...a?.effects, ...e };
}
function cg(a, e) {
  a.style.border = e.border, a.style.boxShadow = e.boxShadow, a.style.paddingTop = e.paddingTop, a.style.paddingRight = e.paddingRight, a.style.paddingBottom = e.paddingBottom, a.style.paddingLeft = e.paddingLeft;
}
var Yi = /* @__PURE__ */ new WeakMap();
function aT(a) {
  const e = Yi.get(a) ?? 0;
  if (e > 0)
    return Yi.set(a, e + 1), !0;
  const l = getComputedStyle(a).position;
  return l !== "static" && l !== "" ? !1 : (Yi.set(a, 1), a.style.position = "relative", !0);
}
function iT(a) {
  const e = Yi.get(a);
  e !== void 0 && (e <= 1 ? (Yi.delete(a), a.style.position = "") : Yi.set(a, e - 1));
}
var Zo = typeof window < "u" ? E.useLayoutEffect : E.useEffect;
function lT(a, e, l, s, r, c) {
  l.update(a, e, r, c), s?.update(a, e.shadow ?? Hw, r, c);
}
function _f(a, e) {
  const l = F2(a.extracted, e.effectsPropRef.current);
  yh(l) && J2(a, l, e.wrapperRefRef.current, e.skipShadowHandleRef.current);
  const { width: s, height: r } = tT(a.el);
  if (s <= 0 || r <= 0) return;
  const c = e.syncKeyRef.current;
  s === a.lastWidth && r === a.lastHeight && c === a.lastSyncKey || (a.lastWidth = s, a.lastHeight = r, a.lastSyncKey = c, a.el.style.clipPath = Uw(s, r, e.optionsRef.current), a.el.setAttribute("data-state", "ready"), a.effectsHandle && lT(e.optionsRef.current, l, a.effectsHandle, a.shadowHandle, s, r));
}
function J2(a, e, l, s) {
  if (!a.anchor) {
    const r = l?.current ?? a.el.parentElement;
    if (!r) return;
    a.anchor = r, a.didAcquire = aT(r);
  }
  a.effectsHandle || (a.effectsHandle = Pw(a.anchor)), !a.shadowHandle && e.shadow && !s && (a.shadowHandle = Jw(a.anchor));
}
function W2(a, e, l) {
  const { wrapperRef: s, effects: r, autoEffects: c, skipShadowHandle: f, onExtractedShadow: h } = l ?? {}, y = E.useRef(e);
  y.current = e;
  const m = E.useRef(r);
  m.current = r;
  const g = E.useRef(s);
  g.current = s;
  const v = E.useRef(f ?? !1);
  v.current = f ?? !1;
  const b = E.useRef(h);
  b.current = h;
  const T = JSON.stringify(e), S = JSON.stringify(r ?? null), w = c ?? !0, A = f ?? !1, _ = E.useRef("");
  _.current = `${T}|${S}`;
  const M = E.useRef({
    optionsRef: y,
    effectsPropRef: m,
    wrapperRefRef: g,
    skipShadowHandleRef: v,
    onExtractedShadowRef: b,
    syncKeyRef: _
  }), j = E.useRef(null);
  Zo(() => {
    const D = a.current;
    if (!D) return;
    const B = D.style.clipPath;
    D.setAttribute("data-slot", "smooth-corners"), D.setAttribute("data-state", "pending");
    const V = w ? ug(D) : void 0, R = {
      el: D,
      savedClipPath: B,
      extracted: V,
      effectsHandle: void 0,
      shadowHandle: void 0,
      anchor: null,
      didAcquire: !1,
      lastWidth: 0,
      lastHeight: 0,
      lastSyncKey: null
    };
    j.current = R;
    const k = F2(R.extracted, m.current);
    yh(k) && J2(R, k, g.current, v.current), b.current?.(R.extracted?.effects.shadow);
    const P = Iw(D, () => _f(R, M.current));
    return () => {
      P(), R.effectsHandle?.destroy(), R.shadowHandle?.destroy(), R.extracted && cg(D, R.extracted.savedStyles), b.current?.(void 0), R.didAcquire && R.anchor && iT(R.anchor), j.current = null, D.style.clipPath = B, D.removeAttribute("data-slot"), D.removeAttribute("data-state");
    };
  }, [a]), Zo(() => {
    const D = j.current;
    D && _f(D, M.current);
  }), Zo(() => {
    if (!A) return;
    const D = j.current;
    !D || !D.shadowHandle || (D.shadowHandle.destroy(), D.shadowHandle = void 0, D.lastSyncKey = null);
  }, [A]), Zo(() => {
    const D = j.current;
    if (!D) return;
    const B = D.extracted !== void 0;
    if (w && !B)
      D.extracted = ug(D.el);
    else if (!w && B)
      cg(D.el, D.extracted.savedStyles), D.extracted = void 0;
    else
      return;
    b.current?.(D.extracted?.effects.shadow), D.lastSyncKey = null, _f(D, M.current);
  }, [w]);
}
function I2(...a) {
  return (e) => {
    for (const l of a)
      l && (typeof l == "function" ? l(e) : l.current = e);
  };
}
function sT(a, e) {
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
function oT(a, e) {
  const { children: l, ...s } = a, r = E.Children.toArray(l);
  if (r.length === 0)
    throw new Error("Slot: `asChild` expects a single child element, received none.");
  if (r.length > 1)
    throw new Error(
      "Slot: `asChild` expects a single child element, received " + r.length + "."
    );
  const c = r[0];
  if (!E.isValidElement(c))
    throw new Error(
      "Slot: `asChild` expects a React element as its child (e.g. <button>), not a " + (typeof c == "string" ? "string." : typeof c + ".")
    );
  if (c.type === E.Fragment)
    throw new Error(
      "Slot: `asChild` expects a single element as its child, not a Fragment. Unwrap the Fragment so Slot can merge props onto a real element."
    );
  const f = c, h = f.props ?? {}, y = h.ref ?? f.ref, m = sT(s, h);
  return E.cloneElement(f, {
    ...m,
    ref: I2(e, y)
  });
}
var rT = E.forwardRef(oT);
function uT(a) {
  const e = Array.isArray(a) ? a : [a], l = [];
  for (const s of e) {
    if (s.opacity <= 0) continue;
    const { offsetX: r, offsetY: c, blur: f, spread: h, color: y, opacity: m } = s, g = cT(y);
    l.push(
      `${r}px ${c}px ${f}px ${h}px rgba(${g.r},${g.g},${g.b},${m})`
    );
  }
  return l.join(", ");
}
function cT(a) {
  const e = a.replace("#", ""), l = e.length === 3 ? e[0] + e[0] + e[1] + e[1] + e[2] + e[2] : e;
  return {
    r: parseInt(l.substring(0, 2), 16),
    g: parseInt(l.substring(2, 4), 16),
    b: parseInt(l.substring(4, 6), 16)
  };
}
function fT(a) {
  if ("radius" in a) return `${a.radius}px`;
  const e = (f) => f === void 0 ? 0 : typeof f == "number" ? f : f.radius, l = e(a.topLeft), s = e(a.topRight), r = e(a.bottomRight), c = e(a.bottomLeft);
  return `${l}px ${s}px ${r}px ${c}px`;
}
function dT(a, e) {
  const {
    as: l,
    asChild: s,
    children: r,
    corners: c,
    innerBorder: f,
    outerBorder: h,
    middleBorder: y,
    innerShadow: m,
    shadow: g,
    autoEffects: v,
    shadowStrategy: b,
    ...T
  } = a, S = l ?? "div", w = E.useRef(null), A = E.useRef(null), _ = E.useMemo(
    () => I2(w, e),
    [e]
  ), M = c ?? { radius: 0 }, j = b === "box-shadow", D = j ? void 0 : g, [B, V] = E.useState(void 0), R = E.useCallback(
    (nt) => V(nt),
    []
  ), k = {
    innerBorder: f,
    outerBorder: h,
    middleBorder: y,
    innerShadow: m,
    shadow: D
  }, P = yh(k), K = j ? g ?? B : void 0, it = (v ?? !0) || P || K !== void 0;
  W2(w, M, {
    wrapperRef: it ? A : void 0,
    effects: P ? k : void 0,
    autoEffects: v,
    skipShadowHandle: j,
    onExtractedShadow: j ? R : void 0
  });
  const I = s ? E.createElement(rT, { ...T, ref: _ }, r) : E.createElement(S, { ...T, ref: _ }, r);
  if (!it) return I;
  let J = null;
  if (j && K !== void 0) {
    const nt = uT(K);
    if (nt !== "") {
      const O = {
        position: "absolute",
        inset: 0,
        borderRadius: fT(M),
        boxShadow: nt,
        pointerEvents: "none",
        zIndex: -1
      };
      J = E.createElement("div", {
        "aria-hidden": !0,
        "data-slot": "smooth-corners-box-shadow",
        style: O
      });
    }
  }
  return E.createElement(
    "div",
    {
      ref: A,
      style: {
        position: "relative",
        // `isolation: isolate` keeps the z-index:-1 sibling from sinking
        // behind ancestors — same trick the SVG path uses.
        ...J ? { isolation: "isolate" } : {}
      }
    },
    J,
    I
  );
}
E.forwardRef(dT);
function fg(a, e) {
  if (typeof a == "function")
    return a(e);
  a != null && (a.current = e);
}
function hT(...a) {
  return (e) => {
    let l = !1;
    const s = a.map((r) => {
      const c = fg(r, e);
      return !l && typeof c == "function" && (l = !0), c;
    });
    if (l)
      return () => {
        for (let r = 0; r < s.length; r++) {
          const c = s[r];
          typeof c == "function" ? c() : fg(a[r], null);
        }
      };
  };
}
function mT(...a) {
  return E.useCallback(hT(...a), a);
}
class pT extends E.Component {
  getSnapshotBeforeUpdate(e) {
    const l = this.props.childRef.current;
    if (lr(l) && e.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = l.offsetParent, r = lr(s) && s.offsetWidth || 0, c = lr(s) && s.offsetHeight || 0, f = getComputedStyle(l), h = this.props.sizeRef.current;
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
function yT({ children: a, isPresent: e, anchorX: l, anchorY: s, root: r, pop: c }) {
  const f = E.useId(), h = E.useRef(null), y = E.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    direction: "ltr"
  }), { nonce: m } = E.useContext($d), g = a.props?.ref ?? a?.ref, v = mT(h, g);
  return E.useInsertionEffect(() => {
    const { width: b, height: T, top: S, left: w, right: A, bottom: _, direction: M } = y.current;
    if (e || c === !1 || !h.current || !b || !T)
      return;
    const j = M === "rtl", D = l === "left" ? j ? `right: ${A}` : `left: ${w}` : j ? `left: ${w}` : `right: ${A}`, B = s === "bottom" ? `bottom: ${_}` : `top: ${S}`;
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
            ${B}px !important;
          }
        `), () => {
      h.current?.removeAttribute("data-motion-pop-id"), R.contains(V) && R.removeChild(V);
    };
  }, [e]), p.jsx(pT, { isPresent: e, childRef: h, sizeRef: y, pop: c, children: c === !1 ? a : E.cloneElement(a, { ref: v }) });
}
const gT = ({ children: a, initial: e, isPresent: l, onExitComplete: s, custom: r, presenceAffectsLayout: c, mode: f, anchorX: h, anchorY: y, root: m }) => {
  const g = fh(vT), v = E.useId(), b = E.useRef(l), T = E.useRef(s);
  dh(() => {
    b.current = l, T.current = s;
  });
  let S = !0, w = E.useMemo(() => (S = !1, {
    id: v,
    initial: e,
    isPresent: l,
    custom: r,
    onExitComplete: (A) => {
      g.set(A, !0);
      for (const _ of g.values())
        if (!_)
          return;
      s && s();
    },
    register: (A) => (g.set(A, !1), () => {
      g.delete(A), !b.current && !g.size && T.current?.();
    })
  }), [l, g, s]);
  return c && S && (w = { ...w }), E.useMemo(() => {
    g.forEach((A, _) => g.set(_, !1));
  }, [l]), E.useEffect(() => {
    !l && !g.size && s && s();
  }, [l]), a = p.jsx(yT, { pop: f === "popLayout", isPresent: l, anchorX: h, anchorY: y, root: m, children: a }), p.jsx(Or.Provider, { value: w, children: a });
};
function vT() {
  return /* @__PURE__ */ new Map();
}
function tb(a = !0) {
  const e = E.useContext(Or);
  if (e === null)
    return [!0, null];
  const { isPresent: l, onExitComplete: s, register: r } = e, c = E.useId();
  E.useEffect(() => {
    if (a)
      return r(c);
  }, [a]);
  const f = E.useCallback(() => a && s && s(c), [c, s, a]);
  return !l && s ? [!1, f] : [!0];
}
const Qo = (a) => a.key || "";
function dg(a) {
  const e = [];
  return E.Children.forEach(a, (l) => {
    E.isValidElement(l) && e.push(l);
  }), e;
}
const bT = ({ children: a, custom: e, initial: l = !0, onExitComplete: s, presenceAffectsLayout: r = !0, mode: c = "sync", propagate: f = !1, anchorX: h = "left", anchorY: y = "top", root: m }) => {
  const [g, v] = tb(f), b = E.useMemo(() => dg(a), [a]), T = f && !g ? [] : b.map(Qo), S = E.useRef(!0), w = E.useRef(b), A = fh(() => /* @__PURE__ */ new Map()), _ = E.useRef(/* @__PURE__ */ new Set()), [M, j] = E.useState(b), [D, B] = E.useState(b);
  dh(() => {
    S.current = !1, w.current = b;
    for (let k = 0; k < D.length; k++) {
      const P = Qo(D[k]);
      T.includes(P) ? (A.delete(P), _.current.delete(P)) : A.get(P) !== !0 && A.set(P, !1);
    }
  }, [D, T.length, T.join("-")]);
  const V = [];
  if (b !== M) {
    let k = [...b];
    for (let P = 0; P < D.length; P++) {
      const K = D[P], it = Qo(K);
      T.includes(it) || (k.splice(P, 0, K), V.push(K));
    }
    return c === "wait" && V.length && (k = V), B(dg(k)), j(b), null;
  }
  const { forceRender: R } = E.useContext(Hd);
  return p.jsx(p.Fragment, { children: D.map((k) => {
    const P = Qo(k), K = f && !g ? !1 : b === D || T.includes(P), it = () => {
      if (_.current.has(P))
        return;
      if (A.has(P))
        _.current.add(P), A.set(P, !0);
      else
        return;
      let et = !0;
      A.forEach((I) => {
        I || (et = !1);
      }), et && (R?.(), B(w.current), f && v?.(), s && s());
    };
    return p.jsx(gT, { isPresent: K, initial: !S.current || l ? void 0 : !1, custom: e, presenceAffectsLayout: r, mode: c, root: m, onExitComplete: K ? void 0 : it, anchorX: h, anchorY: y, children: k }, P);
  }) });
};
function xT({ children: a, features: e, strict: l = !1 }) {
  const [, s] = E.useState(!Rf(e)), r = E.useRef(void 0);
  if (!Rf(e)) {
    const { renderer: c, ...f } = e;
    r.current = c, ig(f);
  }
  return E.useEffect(() => {
    Rf(e) && e().then(({ renderer: c, ...f }) => {
      ig(f), r.current = c, s(!0);
    });
  }, []), p.jsx(qd.Provider, { value: { renderer: r.current, strict: l }, children: a });
}
function Rf(a) {
  return typeof a == "function";
}
const ST = (a, e) => e.isSVG ?? ch(a) ? new G9(e) : new V9(e, {
  allowProjection: a !== E.Fragment
});
class wT extends Ta {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(e) {
    super(e), e.animationState || (e.animationState = Z9(e));
  }
  updateAnimationControlsSubscription() {
    const { animate: e } = this.node.getProps();
    Dr(e) && (this.unmountControls = e.subscribe(this.node));
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
let TT = 0;
class CT extends Ta {
  constructor() {
    super(...arguments), this.id = TT++, this.isExitComplete = !1;
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
          const h = Ia(this.node, c, f);
          if (h) {
            const { transition: y, transitionEnd: m, ...g } = h;
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
const ET = {
  animation: {
    Feature: wT
  },
  exit: {
    Feature: CT
  }
};
function Ts(a) {
  return {
    point: {
      x: a.pageX,
      y: a.pageY
    }
  };
}
const AT = (a) => (e) => nh(e) && a(e, Ts(e));
function fs(a, e, l, s) {
  return ps(a, e, AT(l), s);
}
const eb = ({ current: a }) => a ? a.ownerDocument.defaultView : null, hg = (a, e) => Math.abs(a - e);
function jT(a, e) {
  const l = hg(a.x, e.x), s = hg(a.y, e.y);
  return Math.sqrt(l ** 2 + s ** 2);
}
const mg = /* @__PURE__ */ new Set(["auto", "scroll"]);
class nb {
  constructor(e, l, { transformPagePoint: s, contextWindow: r = window, dragSnapToOrigin: c = !1, distanceThreshold: f = 3, element: h } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (S) => {
      this.handleScroll(S.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = Fo(this.lastRawMoveEventInfo, this.transformPagePoint));
      const S = Df(this.lastMoveEventInfo, this.history), w = this.startEvent !== null, A = jT(S.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!w && !A)
        return;
      const { point: _ } = S, { timestamp: M } = Se;
      this.history.push({ ..._, timestamp: M });
      const { onStart: j, onMove: D } = this.handlers;
      w || (j && j(this.lastMoveEvent, S), this.startEvent = this.lastMoveEvent), D && D(this.lastMoveEvent, S);
    }, this.handlePointerMove = (S, w) => {
      this.lastMoveEvent = S, this.lastRawMoveEventInfo = w, this.lastMoveEventInfo = Fo(w, this.transformPagePoint), Gt.update(this.updatePoint, !0);
    }, this.handlePointerUp = (S, w) => {
      this.end();
      const { onEnd: A, onSessionEnd: _, resumeAnimation: M } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && M && M(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const j = Df(S.type === "pointercancel" ? this.lastMoveEventInfo : Fo(w, this.transformPagePoint), this.history);
      this.startEvent && A && A(S, j), _ && _(S, j);
    }, !nh(e))
      return;
    this.dragSnapToOrigin = c, this.handlers = l, this.transformPagePoint = s, this.distanceThreshold = f, this.contextWindow = r || window;
    const y = Ts(e), m = Fo(y, this.transformPagePoint), { point: g } = m, { timestamp: v } = Se;
    this.history = [{ ...g, timestamp: v }];
    const { onSessionStart: b } = l;
    b && b(e, Df(m, this.history));
    const T = { passive: !0, capture: !0 };
    this.removeListeners = xs(fs(this.contextWindow, "pointermove", this.handlePointerMove, T), fs(this.contextWindow, "pointerup", this.handlePointerUp, T), fs(this.contextWindow, "pointercancel", this.handlePointerUp, T)), h && this.startScrollTracking(h);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(e) {
    let l = e.parentElement;
    for (; l; ) {
      const s = getComputedStyle(l);
      (mg.has(s.overflowX) || mg.has(s.overflowY)) && this.scrollPositions.set(l, {
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
    c.x === 0 && c.y === 0 || (s ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += c.x, this.lastMoveEventInfo.point.y += c.y) : this.history.length > 0 && (this.history[0].x -= c.x, this.history[0].y -= c.y), this.scrollPositions.set(e, r), Gt.update(this.updatePoint, !0));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), Sa(this.updatePoint);
  }
}
function Fo(a, e) {
  return e ? { point: e(a.point) } : a;
}
function pg(a, e) {
  return { x: a.x - e.x, y: a.y - e.y };
}
function Df({ point: a }, e) {
  return {
    point: a,
    delta: pg(a, ab(e)),
    offset: pg(a, MT(e)),
    velocity: _T(e, 0.1)
  };
}
function MT(a) {
  return a[0];
}
function ab(a) {
  return a[a.length - 1];
}
function _T(a, e) {
  if (a.length < 2)
    return { x: 0, y: 0 };
  let l = a.length - 1, s = null;
  const r = ab(a);
  for (; l >= 0 && (s = a[l], !(r.timestamp - s.timestamp > /* @__PURE__ */ Xe(e))); )
    l--;
  if (!s)
    return { x: 0, y: 0 };
  s === a[0] && a.length > 2 && r.timestamp - s.timestamp > /* @__PURE__ */ Xe(e) * 2 && (s = a[1]);
  const c = /* @__PURE__ */ an(r.timestamp - s.timestamp);
  if (c === 0)
    return { x: 0, y: 0 };
  const f = {
    x: (r.x - s.x) / c,
    y: (r.y - s.y) / c
  };
  return f.x === 1 / 0 && (f.x = 0), f.y === 1 / 0 && (f.y = 0), f;
}
function RT(a, { min: e, max: l }, s) {
  return e !== void 0 && a < e ? a = s ? $t(e, a, s.min) : Math.max(a, e) : l !== void 0 && a > l && (a = s ? $t(l, a, s.max) : Math.min(a, l)), a;
}
function yg(a, e, l) {
  return {
    min: e !== void 0 ? a.min + e : void 0,
    max: l !== void 0 ? a.max + l - (a.max - a.min) : void 0
  };
}
function DT(a, { top: e, left: l, bottom: s, right: r }) {
  return {
    x: yg(a.x, l, r),
    y: yg(a.y, e, s)
  };
}
function gg(a, e) {
  let l = e.min - a.min, s = e.max - a.max;
  return e.max - e.min < a.max - a.min && ([l, s] = [s, l]), { min: l, max: s };
}
function NT(a, e) {
  return {
    x: gg(a.x, e.x),
    y: gg(a.y, e.y)
  };
}
function OT(a, e) {
  let l = 0.5;
  const s = je(a), r = je(e);
  return r > s ? l = /* @__PURE__ */ ds(e.min, e.max - s, a.min) : s > r && (l = /* @__PURE__ */ ds(a.min, a.max - r, e.min)), En(0, 1, l);
}
function zT(a, e) {
  const l = {};
  return e.min !== void 0 && (l.min = e.min - a.min), e.max !== void 0 && (l.max = e.max - a.min), l;
}
const Sd = 0.35;
function LT(a = Sd) {
  return a === !1 ? a = 0 : a === !0 && (a = Sd), {
    x: vg(a, "left", "right"),
    y: vg(a, "top", "bottom")
  };
}
function vg(a, e, l) {
  return {
    min: bg(a, e),
    max: bg(a, l)
  };
}
function bg(a, e) {
  return typeof a == "number" ? a : a[e] || 0;
}
const BT = /* @__PURE__ */ new WeakMap();
class VT {
  constructor(e) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = he(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = e;
  }
  start(e, { snapToCursor: l = !1, distanceThreshold: s } = {}) {
    const { presenceContext: r } = this.visualElement;
    if (r && r.isPresent === !1)
      return;
    const c = (v) => {
      l && this.snapToCursor(Ts(v).point), this.stopAnimation();
    }, f = (v, b) => {
      const { drag: T, dragPropagation: S, onDragStart: w } = this.getProps();
      if (T && !S && (this.openDragLock && this.openDragLock(), this.openDragLock = a9(T), !this.openDragLock))
        return;
      this.latestPointerEvent = v, this.latestPanInfo = b, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), wn((_) => {
        let M = this.getAxisMotionValue(_).get() || 0;
        if (Cn.test(M)) {
          const { projection: j } = this.visualElement;
          if (j && j.layout) {
            const D = j.layout.layoutBox[_];
            D && (M = je(D) * (parseFloat(M) / 100));
          }
        }
        this.originPoint[_] = M;
      }), w && Gt.update(() => w(v, b), !1, !0), ud(this.visualElement, "transform");
      const { animationState: A } = this.visualElement;
      A && A.setActive("whileDrag", !0);
    }, h = (v, b) => {
      this.latestPointerEvent = v, this.latestPanInfo = b;
      const { dragPropagation: T, dragDirectionLock: S, onDirectionLock: w, onDrag: A } = this.getProps();
      if (!T && !this.openDragLock)
        return;
      const { offset: _ } = b;
      if (S && this.currentDirection === null) {
        this.currentDirection = kT(_), this.currentDirection !== null && w && w(this.currentDirection);
        return;
      }
      this.updateAxis("x", b.point, _), this.updateAxis("y", b.point, _), this.visualElement.render(), A && Gt.update(() => A(v, b), !1, !0);
    }, y = (v, b) => {
      this.latestPointerEvent = v, this.latestPanInfo = b, this.stop(v, b), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, m = () => {
      const { dragSnapToOrigin: v } = this.getProps();
      (v || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: g } = this.getProps();
    this.panSession = new nb(e, {
      onSessionStart: c,
      onStart: f,
      onMove: h,
      onSessionEnd: y,
      resumeAnimation: m
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: g,
      distanceThreshold: s,
      contextWindow: eb(this.visualElement),
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
    h && Gt.postRender(() => h(s, r));
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
    if (!s || !Jo(e, r, this.currentDirection))
      return;
    const c = this.getAxisMotionValue(e);
    let f = this.originPoint[e] + s[e];
    this.constraints && this.constraints[e] && (f = RT(f, this.constraints[e], this.elastic[e])), c.set(f);
  }
  resolveConstraints() {
    const { dragConstraints: e, dragElastic: l } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, r = this.constraints;
    e && ki(e) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : e && s ? this.constraints = DT(s.layoutBox, e) : this.constraints = !1, this.elastic = LT(l), r !== this.constraints && !ki(e) && s && this.constraints && !this.hasMutatedConstraints && wn((c) => {
      this.constraints !== !1 && this.getAxisMotionValue(c) && (this.constraints[c] = zT(s.layoutBox[c], this.constraints[c]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: l } = this.getProps();
    if (!e || !ki(e))
      return !1;
    const s = e.current, { projection: r } = this.visualElement;
    if (!r || !r.layout)
      return !1;
    r.root && (r.root.scroll = void 0, r.root.updateScroll());
    const c = D9(s, r.root, this.visualElement.getTransformPagePoint());
    let f = NT(r.layout.layoutBox, c);
    if (l) {
      const h = l(M9(f));
      this.hasMutatedConstraints = !!h, h && (f = d2(h));
    }
    return f;
  }
  startAnimation(e) {
    const { drag: l, dragMomentum: s, dragElastic: r, dragTransition: c, dragSnapToOrigin: f, onDragTransitionEnd: h } = this.getProps(), y = this.constraints || {}, m = wn((g) => {
      if (!Jo(g, l, this.currentDirection))
        return;
      let v = y && y[g] || {};
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
    return ud(this.visualElement, e), s.start(Jd(e, s, 0, l, this.visualElement, !1));
  }
  stopAnimation() {
    wn((e) => this.getAxisMotionValue(e).stop());
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
    wn((l) => {
      const { drag: s } = this.getProps();
      if (!Jo(l, s, this.currentDirection))
        return;
      const { projection: r } = this.visualElement, c = this.getAxisMotionValue(l);
      if (r && r.layout) {
        const { min: f, max: h } = r.layout.layoutBox[l], y = c.get() || 0;
        c.set(e[l] - $t(f, h, 0.5) + y);
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
    if (!ki(l) || !s || !this.constraints)
      return;
    this.stopAnimation();
    const r = { x: 0, y: 0 };
    wn((f) => {
      const h = this.getAxisMotionValue(f);
      if (h && this.constraints !== !1) {
        const y = h.get();
        r[f] = OT({ min: y, max: y }, this.constraints[f]);
      }
    });
    const { transformTemplate: c } = this.visualElement.getProps();
    this.visualElement.current.style.transform = c ? c({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.constraints = !1, this.resolveConstraints(), wn((f) => {
      if (!Jo(f, e, null))
        return;
      const h = this.getAxisMotionValue(f), { min: y, max: m } = this.constraints[f];
      h.set($t(y, m, r[f]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    BT.set(this.visualElement, this);
    const e = this.visualElement.current, l = fs(e, "pointerdown", (m) => {
      const { drag: g, dragListener: v = !0 } = this.getProps(), b = m.target, T = b !== e && u9(b);
      g && v && !T && this.start(m);
    });
    let s;
    const r = () => {
      const { dragConstraints: m } = this.getProps();
      ki(m) && m.current && (this.constraints = this.resolveRefConstraints(), s || (s = UT(e, m.current, () => this.scalePositionWithinConstraints())));
    }, { projection: c } = this.visualElement, f = c.addEventListener("measure", r);
    c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()), Gt.read(r);
    const h = ps(window, "resize", () => this.scalePositionWithinConstraints()), y = c.addEventListener("didUpdate", (({ delta: m, hasLayoutChanged: g }) => {
      this.isDragging && g && (wn((v) => {
        const b = this.getAxisMotionValue(v);
        b && (this.originPoint[v] += m[v].translate, b.set(b.get() + m[v].translate));
      }), this.visualElement.render());
    }));
    return () => {
      h(), l(), f(), y && y(), s && s();
    };
  }
  getProps() {
    const e = this.visualElement.getProps(), { drag: l = !1, dragDirectionLock: s = !1, dragPropagation: r = !1, dragConstraints: c = !1, dragElastic: f = Sd, dragMomentum: h = !0 } = e;
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
function xg(a) {
  let e = !0;
  return () => {
    if (e) {
      e = !1;
      return;
    }
    a();
  };
}
function UT(a, e, l) {
  const s = xy(a, xg(l)), r = xy(e, xg(l));
  return () => {
    s(), r();
  };
}
function Jo(a, e, l) {
  return (e === !0 || e === a) && (l === null || l === a);
}
function kT(a, e = 10) {
  let l = null;
  return Math.abs(a.y) > e ? l = "y" : Math.abs(a.x) > e && (l = "x"), l;
}
class HT extends Ta {
  constructor(e) {
    super(e), this.removeGroupControls = ln, this.removeListeners = ln, this.controls = new VT(e);
  }
  mount() {
    const { dragControls: e } = this.node.getProps();
    e && (this.removeGroupControls = e.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || ln;
  }
  update() {
    const { dragControls: e } = this.node.getProps(), { dragControls: l } = this.node.prevProps || {};
    e !== l && (this.removeGroupControls(), e && (this.removeGroupControls = e.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const Nf = (a) => (e, l) => {
  a && Gt.update(() => a(e, l), !1, !0);
};
class qT extends Ta {
  constructor() {
    super(...arguments), this.removePointerDownListener = ln;
  }
  onPointerDown(e) {
    this.session = new nb(e, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: eb(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: e, onPanStart: l, onPan: s, onPanEnd: r } = this.node.getProps();
    return {
      onSessionStart: Nf(e),
      onStart: Nf(l),
      onMove: Nf(s),
      onEnd: (c, f) => {
        delete this.session, r && Gt.postRender(() => r(c, f));
      }
    };
  }
  mount() {
    this.removePointerDownListener = fs(this.node.current, "pointerdown", (e) => this.onPointerDown(e));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let Of = !1;
class $T extends E.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: e, layoutGroup: l, switchLayoutGroup: s, layoutId: r } = this.props, { projection: c } = e;
    c && (l.group && l.group.add(c), s && s.register && r && s.register(c), Of && c.root.didUpdate(), c.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), c.setOptions({
      ...c.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), dr.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(e) {
    const { layoutDependency: l, visualElement: s, drag: r, isPresent: c } = this.props, { projection: f } = s;
    return f && (f.isPresent = c, e.layoutDependency !== l && f.setOptions({
      ...f.options,
      layoutDependency: l
    }), Of = !0, r || e.layoutDependency !== l || l === void 0 || e.isPresent !== c ? f.willUpdate() : this.safeToRemove(), e.isPresent !== c && (c ? f.promote() : f.relegate() || Gt.postRender(() => {
      const h = f.getStack();
      (!h || !h.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: e, layoutAnchor: l } = this.props, { projection: s } = e;
    s && (s.options.layoutAnchor = l, s.root.didUpdate(), eh.postRender(() => {
      !s.currentAnimation && s.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: e, layoutGroup: l, switchLayoutGroup: s } = this.props, { projection: r } = e;
    Of = !0, r && (r.scheduleCheckAfterUnmount(), l && l.group && l.group.remove(r), s && s.deregister && s.deregister(r));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function ib(a) {
  const [e, l] = tb(), s = E.useContext(Hd);
  return p.jsx($T, { ...a, layoutGroup: s, switchLayoutGroup: E.useContext(U2), isPresent: e, safeToRemove: l });
}
const GT = {
  pan: {
    Feature: qT
  },
  drag: {
    Feature: HT,
    ProjectionNode: N2,
    MeasureLayout: ib
  }
};
function Sg(a, e, l) {
  const { props: s } = a;
  a.animationState && s.whileHover && a.animationState.setActive("whileHover", l === "Start");
  const r = "onHover" + l, c = s[r];
  c && Gt.postRender(() => c(e, Ts(e)));
}
class YT extends Ta {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = l9(e, (l, s) => (Sg(this.node, s, "Start"), (r) => Sg(this.node, r, "End"))));
  }
  unmount() {
  }
}
class XT extends Ta {
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
    this.unmount = xs(ps(this.node.current, "focus", () => this.onFocus()), ps(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function wg(a, e, l) {
  const { props: s } = a;
  if (a.current instanceof HTMLButtonElement && a.current.disabled)
    return;
  a.animationState && s.whileTap && a.animationState.setActive("whileTap", l === "Start");
  const r = "onTap" + (l === "End" ? "" : l), c = s[r];
  c && Gt.postRender(() => c(e, Ts(e)));
}
class PT extends Ta {
  mount() {
    const { current: e } = this.node;
    if (!e)
      return;
    const { globalTapTarget: l, propagate: s } = this.node.props;
    this.unmount = f9(e, (r, c) => (wg(this.node, c, "Start"), (f, { success: h }) => wg(this.node, f, h ? "End" : "Cancel")), {
      useGlobalTarget: l,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const wd = /* @__PURE__ */ new WeakMap(), zf = /* @__PURE__ */ new WeakMap(), KT = (a) => {
  const e = wd.get(a.target);
  e && e(a);
}, ZT = (a) => {
  a.forEach(KT);
};
function QT({ root: a, ...e }) {
  const l = a || document;
  zf.has(l) || zf.set(l, {});
  const s = zf.get(l), r = JSON.stringify(e);
  return s[r] || (s[r] = new IntersectionObserver(ZT, { root: a, ...e })), s[r];
}
function FT(a, e, l) {
  const s = QT(e);
  return wd.set(a, l), s.observe(a), () => {
    wd.delete(a), s.unobserve(a);
  };
}
const JT = {
  some: 0,
  all: 1
};
class WT extends Ta {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: e = {} } = this.node.getProps(), { root: l, margin: s, amount: r = "some", once: c } = e, f = {
      root: l ? l.current : void 0,
      rootMargin: s,
      threshold: typeof r == "number" ? r : JT[r]
    }, h = (y) => {
      const { isIntersecting: m } = y;
      if (this.isInView === m || (this.isInView = m, c && !m && this.hasEnteredView))
        return;
      m && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", m);
      const { onViewportEnter: g, onViewportLeave: v } = this.node.getProps(), b = m ? g : v;
      b && b(y);
    };
    this.stopObserver = FT(this.node.current, f, h);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: e, prevProps: l } = this.node;
    ["amount", "margin", "root"].some(IT(e, l)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function IT({ viewport: a = {} }, { viewport: e = {} } = {}) {
  return (l) => a[l] !== e[l];
}
const tC = {
  inView: {
    Feature: WT
  },
  tap: {
    Feature: PT
  },
  focus: {
    Feature: XT
  },
  hover: {
    Feature: YT
  }
}, eC = {
  layout: {
    ProjectionNode: N2,
    MeasureLayout: ib
  }
}, nC = {
  renderer: ST,
  ...ET,
  ...tC
}, aC = {
  ...nC,
  ...GT,
  ...eC
};
function iC() {
  !sh.current && u2();
  const [a] = E.useState(xr.current);
  return a;
}
var zr = ov();
function lC(a, e) {
  if (a instanceof RegExp) return { keys: !1, pattern: a };
  var l, s, r, c, f = [], h = "", y = a.split("/");
  for (y[0] || y.shift(); r = y.shift(); )
    l = r[0], l === "*" ? (f.push(l), h += r[1] === "?" ? "(?:/(.*))?" : "/(.*)") : l === ":" ? (s = r.indexOf("?", 1), c = r.indexOf(".", 1), f.push(r.substring(1, ~s ? s : ~c ? c : r.length)), h += ~s && !~c ? "(?:/([^/]+?))?" : "/([^/]+?)", ~c && (h += (~s ? "?" : "") + "\\" + r.substring(c))) : h += "/" + r;
  return {
    keys: f,
    pattern: new RegExp("^" + h + (e ? "(?=$|/)" : "/?$"), "i")
  };
}
const sC = "popstate", gh = "pushState", vh = "replaceState", oC = "hashchange", Tg = [
  sC,
  gh,
  vh,
  oC
], rC = (a) => {
  for (const e of Tg)
    addEventListener(e, a);
  return () => {
    for (const e of Tg)
      removeEventListener(e, a);
  };
}, lb = (a, e) => Q3.useSyncExternalStore(rC, a, e), Cg = () => location.search, uC = ({ ssrSearch: a } = {}) => lb(
  Cg,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrSearch="?foo",
  // client hydrates with just <Router /> and reads from location.search
  a != null ? () => a : Cg
), Eg = () => location.pathname, cC = ({ ssrPath: a } = {}) => lb(
  Eg,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrPath="/foo",
  // client hydrates with just <Router /> and reads from location.pathname
  a != null ? () => a : Eg
), fC = (a, { replace: e = !1, state: l = null } = {}) => history[e ? vh : gh](l, "", a), dC = (a = {}) => [cC(a), fC], Ag = Symbol.for("wouter_v3");
if (typeof history < "u" && typeof window[Ag] > "u") {
  for (const a of [gh, vh]) {
    const e = history[a];
    history[a] = function() {
      const l = e.apply(this, arguments), s = new Event(a);
      return s.arguments = arguments, dispatchEvent(s), l;
    };
  }
  Object.defineProperty(window, Ag, { value: !0 });
}
const hC = (a, e) => e.toLowerCase().indexOf(a.toLowerCase()) ? "~" + e : e.slice(a.length) || "/", sb = (a = "") => a === "/" ? "" : a, mC = (a, e) => a[0] === "~" ? a.slice(1) : sb(e) + a, pC = (a = "", e) => hC(jg(sb(a)), jg(e)), jg = (a) => {
  try {
    return decodeURI(a);
  } catch {
    return a;
  }
}, yC = {
  hook: dC,
  searchHook: uC,
  parser: lC,
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
}, gC = E.createContext(yC), vC = () => E.useContext(gC), bC = {};
E.createContext(bC);
const xC = (a) => {
  const [e, l] = a.hook(a);
  return [
    pC(a.base, e),
    rv(
      (s, r) => a.aroundNav(l, mC(s, a.base), r)
    )
  ];
}, SC = E.forwardRef((a, e) => {
  const l = vC(), [s, r] = xC(l), {
    to: c = "",
    href: f = c,
    onClick: h,
    asChild: y,
    children: m,
    className: g,
    /* eslint-disable no-unused-vars */
    replace: v,
    state: b,
    transition: T,
    /* eslint-enable no-unused-vars */
    ...S
  } = a, w = rv((_) => {
    _.ctrlKey || _.metaKey || _.altKey || _.shiftKey || _.button !== 0 || (h?.(_), _.defaultPrevented || (_.preventDefault(), r(f, a)));
  }), A = l.hrefs(
    f[0] === "~" ? f.slice(1) : l.base + f,
    l
    // pass router as a second argument for convinience
  );
  return y && E.isValidElement(m) ? E.cloneElement(m, { onClick: w, href: A }) : E.createElement("a", {
    ...S,
    onClick: w,
    href: A,
    // `className` can be a function to apply the class if this link is active
    className: g?.call ? g(s === f) : g,
    children: m,
    ref: e
  });
}), bh = Object.freeze({
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
}), Lr = Object.freeze({
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
}), wC = "_root_xunnd_1", Mg = "_glassBackground_xunnd_5", _g = "_glassShadow_xunnd_25", TC = "_glassBorder_1y4zy_1", CC = "_muted_1y4zy_15", vs = (a) => {
  const e = wt.c(2), {
    className: l,
    muted: s
  } = a, r = `${TC} ${s !== void 0 && s ? CC : ""} ${l === void 0 ? "" : l}`;
  let c;
  return e[0] !== r ? (c = /* @__PURE__ */ p.jsx("div", {
    className: r,
    "aria-hidden": "true"
  }), e[0] = r, e[1] = c) : c = e[1], c;
}, xh = (a) => {
  const e = wt.c(16);
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
  const y = h;
  if (!l) {
    let S;
    return e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (S = /* @__PURE__ */ p.jsxs(p.Fragment, {
      children: [/* @__PURE__ */ p.jsx("div", {
        className: Mg,
        "aria-hidden": "true"
      }), /* @__PURE__ */ p.jsx("div", {
        className: _g,
        "aria-hidden": "true"
      }), /* @__PURE__ */ p.jsx(vs, {})]
    }), e[7] = S) : S = e[7], S;
  }
  const m = `${wC} ${f}`;
  let g, v, b;
  e[8] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (g = /* @__PURE__ */ p.jsx("div", {
    className: Mg,
    "aria-hidden": "true"
  }), v = /* @__PURE__ */ p.jsx("div", {
    className: _g,
    "aria-hidden": "true"
  }), b = /* @__PURE__ */ p.jsx(vs, {}), e[8] = g, e[9] = v, e[10] = b) : (g = e[8], v = e[9], b = e[10]);
  let T;
  return e[11] !== l || e[12] !== s || e[13] !== y || e[14] !== m ? (T = /* @__PURE__ */ p.jsxs("div", {
    className: m,
    style: y,
    ...s,
    children: [g, v, b, l]
  }), e[11] = l, e[12] = s, e[13] = y, e[14] = m, e[15] = T) : T = e[15], T;
}, EC = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/arrow-down" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M11.2482 20.3129C11.6466 20.7682 12.3556 20.7682 12.7541 20.3129L17.5499 14.8314C18.1155 14.1849 17.6561 13.1732 16.797 13.1732H13.5011V5.67324C13.5011 4.84481 12.8295 4.17324 12.0011 4.17324C11.1727 4.17324 10.5011 4.84481 10.5011 5.67324V13.1732H7.20522C6.34614 13.1732 5.88678 14.1849 6.45229 14.8314L11.2482 20.3129Z", fill: "#3D3C3A" }))), AC = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/arrow-up" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M11.2483 3.85905C11.6467 3.40376 12.3558 3.40375 12.7542 3.85905L17.5501 9.3405C18.1158 9.98708 17.6563 10.9997 16.7971 10.9997H13.5012V18.4997C13.501 19.3279 12.8295 19.9997 12.0012 19.9997C11.1729 19.9997 10.5014 19.3279 10.5012 18.4997V10.9997H7.20535C6.34619 10.9997 5.88666 9.98708 6.45242 9.3405L11.2483 3.85905Z", fill: "#3D3C3A" }))), jC = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/star" }, /* @__PURE__ */ E.createElement("path", { id: "Vector 234255911", d: "M11 16L15 12L11 8", stroke: "#3D3C3A", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }))), ob = "_redaction_dcm1f_1", rb = "_active_dcm1f_19", MC = "_sized_dcm1f_29", Lf = 1800, _C = 1.3, ub = /* @__PURE__ */ E.createContext(null), Br = () => E.useContext(ub);
let Er = [];
const RC = () => {
  const a = Er;
  Er = [];
  const e = performance.now(), l = a.map((s) => {
    const r = s.getBoundingClientRect().top + window.scrollY;
    return -(((e - r * _C) % Lf + Lf) % Lf);
  });
  a.forEach((s, r) => {
    s.style.setProperty("--wave-phase", `${Math.round(l[r])}ms`);
  });
}, Vr = (a) => {
  a && (Er.length === 0 && requestAnimationFrame(RC), Er.push(a));
}, Sh = (a) => a ? `${ob} ${rb}` : "", DC = 10, Ja = (a) => {
  const e = wt.c(7), {
    active: l,
    width: s,
    children: r
  } = a, c = r != null && r !== "", f = s ?? (!c && l ? DC : void 0), h = l ? Vr : void 0, y = `
                ${ob}
                ${l ? rb : ""}
                ${f ? MC : ""}`;
  let m;
  e[0] !== f ? (m = f ? {
    width: `${f}ch`
  } : void 0, e[0] = f, e[1] = m) : m = e[1];
  const g = c ? r : " ";
  let v;
  return e[2] !== h || e[3] !== y || e[4] !== m || e[5] !== g ? (v = /* @__PURE__ */ p.jsx("span", {
    ref: h,
    className: y,
    style: m,
    children: g
  }), e[2] = h, e[3] = y, e[4] = m, e[5] = g, e[6] = v) : v = e[6], v;
}, Xi = (a) => {
  const e = wt.c(6), {
    className: l,
    as: s,
    active: r
  } = a, c = l === void 0 ? "" : l, f = s === void 0 ? "div" : s, h = Br(), y = r ?? h ?? !0, m = Sh(y), g = y ? Vr : void 0, v = `${c} ${m}`;
  let b;
  e[0] !== v ? (b = v.trim(), e[0] = v, e[1] = b) : b = e[1];
  let T;
  return e[2] !== f || e[3] !== g || e[4] !== b ? (T = /* @__PURE__ */ p.jsx(f, {
    ref: g,
    className: b
  }), e[2] = f, e[3] = g, e[4] = b, e[5] = T) : T = e[5], T;
}, cb = (a) => {
  const e = wt.c(3), {
    active: l,
    children: s
  } = a, r = !!(l === void 0 || l);
  let c;
  return e[0] !== s || e[1] !== r ? (c = /* @__PURE__ */ p.jsx(ub.Provider, {
    value: r,
    children: s
  }), e[0] = s, e[1] = r, e[2] = c) : c = e[2], c;
}, wh = "_text_9l4iv_1", Ar = "_icon_9l4iv_28", fb = "_title32_9l4iv_34", db = "_title24_9l4iv_35", hb = "_title20_9l4iv_36", mb = "_body_9l4iv_56", pb = "_subtitle_9l4iv_63", yb = "_caption_9l4iv_70", NC = {
  text: wh,
  icon: Ar,
  title32: fb,
  title24: db,
  title20: hb,
  body: mb,
  subtitle: pb,
  caption: yb
}, OC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  body: mb,
  caption: yb,
  default: NC,
  icon: Ar,
  subtitle: pb,
  text: wh,
  title20: hb,
  title24: db,
  title32: fb
}, Symbol.toStringTag, { value: "Module" })), zC = {
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
  const e = wt.c(34);
  let l, s, r, c, f, h, y, m, g, v, b;
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
    ...y
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c, e[5] = f, e[6] = h, e[7] = y, e[8] = m, e[9] = g, e[10] = v, e[11] = b) : (l = e[1], s = e[2], r = e[3], c = e[4], f = e[5], h = e[6], y = e[7], m = e[8], g = e[9], v = e[10], b = e[11]);
  const T = v === void 0 ? "body" : v, S = Br(), w = l || "div", A = g !== void 0 ? !!g : !!S, _ = g !== void 0 || S !== null, M = typeof g == "number" ? g : void 0;
  let j;
  e[12] !== A || e[13] !== f || e[14] !== _ || e[15] !== M ? (j = _ ? /* @__PURE__ */ p.jsx(Ja, {
    active: A,
    width: M,
    children: f
  }) : f, e[12] = A, e[13] = f, e[14] = _, e[15] = M, e[16] = j) : j = e[16];
  const D = j, B = s?.direction === "down" ? EC : AC, V = `${wh} ${OC[zC[T] || "body"]} ${h || ""}`, R = m || void 0, k = r || void 0, P = A || void 0;
  let K;
  e[17] !== B || e[18] !== s?.direction ? (K = s?.direction && /* @__PURE__ */ p.jsx(B, {
    className: Ar
  }), e[17] = B, e[18] = s?.direction, e[19] = K) : K = e[19];
  let it;
  e[20] !== c ? (it = c && /* @__PURE__ */ p.jsx(jC, {
    className: Ar
  }), e[20] = c, e[21] = it) : it = e[21];
  let et;
  return e[22] !== w || e[23] !== D || e[24] !== y || e[25] !== V || e[26] !== R || e[27] !== k || e[28] !== P || e[29] !== K || e[30] !== it || e[31] !== T || e[32] !== b ? (et = /* @__PURE__ */ p.jsxs(w, {
    ...y,
    className: V,
    "data-variant": T,
    "data-weight": b,
    "data-rounded": R,
    "data-caps": k,
    "data-skeleton": P,
    children: [K, D, it]
  }), e[22] = w, e[23] = D, e[24] = y, e[25] = V, e[26] = R, e[27] = k, e[28] = P, e[29] = K, e[30] = it, e[31] = T, e[32] = b, e[33] = et) : et = e[33], et;
}, Th = {
  skin: "apple",
  isApple: !0,
  isMaterial: !1,
  setSkin: () => {
  }
}, gb = /* @__PURE__ */ E.createContext(Th), el = () => E.useContext(gb) || Th;
function LC(a) {
  const e = wt.c(3), {
    children: l
  } = a;
  let s;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (s = [], e[0] = s) : s = e[0], E.useEffect(BC, s);
  let r;
  return e[1] !== l ? (r = /* @__PURE__ */ p.jsx(gb.Provider, {
    value: Th,
    children: l
  }), e[1] = l, e[2] = r) : r = e[2], r;
}
function BC() {
  document.body.classList.remove("material", "skin-switcher-active"), document.body.classList.add("apple");
}
const Ch = "_button_1d7yf_1", vb = "_regular_1d7yf_21", bb = "_overlay_1d7yf_35", xb = "_secondary_1d7yf_42", Sb = "_accent_1d7yf_47", Eh = "_icon_1d7yf_53", Ah = "_label_1d7yf_57", jh = "_content_1d7yf_61", VC = {
  button: Ch,
  regular: vb,
  overlay: bb,
  secondary: xb,
  accent: Sb,
  icon: Eh,
  label: Ah,
  content: jh
}, UC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accent: Sb,
  button: Ch,
  content: jh,
  default: VC,
  icon: Eh,
  label: Ah,
  overlay: bb,
  regular: vb,
  secondary: xb
}, Symbol.toStringTag, { value: "Module" })), Rg = (a) => {
  const e = wt.c(16), {
    children: l,
    onClick: s,
    variant: r,
    ariaLabel: c,
    title: f
  } = a, h = r === void 0 ? "regular" : r, y = typeof l == "string", m = h === "regular" || h === "overlay", g = `${Ch} ${UC[h]} ${y ? Ah : Eh}`;
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
  e[2] !== m ? (T = m && /* @__PURE__ */ p.jsx(vs, {
    muted: !0
  }), e[2] = m, e[3] = T) : T = e[3];
  let S;
  e[4] !== l || e[5] !== y ? (S = y ? /* @__PURE__ */ p.jsx(lt, {
    variant: "body",
    weight: "medium",
    children: l
  }) : l, e[4] = l, e[5] = y, e[6] = S) : S = e[6];
  let w;
  e[7] !== S ? (w = /* @__PURE__ */ p.jsx("span", {
    className: jh,
    children: S
  }), e[7] = S, e[8] = w) : w = e[8];
  let A;
  return e[9] !== c || e[10] !== s || e[11] !== g || e[12] !== T || e[13] !== w || e[14] !== f ? (A = /* @__PURE__ */ p.jsxs(ow, {
    type: "button",
    className: g,
    onClick: s,
    "aria-label": c,
    title: f,
    whileTap: v,
    transition: b,
    children: [T, w]
  }), e[9] = c, e[10] = s, e[11] = g, e[12] = T, e[13] = w, e[14] = f, e[15] = A) : A = e[15], A;
}, kC = /* @__PURE__ */ E.createContext(!1), HC = "_root_125i3_1", Dg = "_side_125i3_9", qC = "_trailing_125i3_18", $C = "_middle_125i3_22", GC = "_middleOverlay_125i3_31", YC = "_titlePill_125i3_35", XC = "_titleContent_125i3_45", PC = "_inModal_125i3_59", KC = (a) => {
  const e = wt.c(32), {
    left: l,
    onLeft: s,
    leftVariant: r,
    leftAriaLabel: c,
    leftTitle: f,
    right: h,
    onRight: y,
    rightVariant: m,
    rightAriaLabel: g,
    rightTitle: v,
    overlay: b,
    titleGlass: T,
    children: S
  } = a, w = b === void 0 ? !1 : b, A = T === void 0 ? !1 : T, {
    isApple: _
  } = el(), M = E.useContext(kC), j = w ? "overlay" : "regular";
  let D;
  e[0] !== S ? (D = /* @__PURE__ */ p.jsx(lt, {
    variant: "body",
    weight: "semibold",
    children: S
  }), e[0] = S, e[1] = D) : D = e[1];
  const B = D, V = `${HC} ${M ? PC : ""}`;
  let R;
  e[2] !== j || e[3] !== l || e[4] !== c || e[5] !== f || e[6] !== r || e[7] !== s ? (R = l != null && /* @__PURE__ */ p.jsx(Rg, {
    onClick: s,
    variant: r ?? j,
    ariaLabel: c,
    title: f,
    children: l
  }), e[2] = j, e[3] = l, e[4] = c, e[5] = f, e[6] = r, e[7] = s, e[8] = R) : R = e[8];
  let k;
  e[9] !== R ? (k = /* @__PURE__ */ p.jsx("div", {
    className: Dg,
    children: R
  }), e[9] = R, e[10] = k) : k = e[10];
  let P;
  e[11] !== j || e[12] !== y || e[13] !== h || e[14] !== g || e[15] !== v || e[16] !== m ? (P = h != null && /* @__PURE__ */ p.jsx(Rg, {
    onClick: y,
    variant: m ?? j,
    ariaLabel: g,
    title: v,
    children: h
  }), e[11] = j, e[12] = y, e[13] = h, e[14] = g, e[15] = v, e[16] = m, e[17] = P) : P = e[17];
  let K;
  e[18] !== P ? (K = /* @__PURE__ */ p.jsx("div", {
    className: `${Dg} ${qC}`,
    children: P
  }), e[18] = P, e[19] = K) : K = e[19];
  const it = `${$C} ${w ? GC : ""}`;
  let et;
  e[20] !== _ || e[21] !== B || e[22] !== A ? (et = _ && A ? /* @__PURE__ */ p.jsxs("div", {
    className: YC,
    children: [/* @__PURE__ */ p.jsx(xh, {}), /* @__PURE__ */ p.jsx("span", {
      className: XC,
      children: B
    })]
  }) : B, e[20] = _, e[21] = B, e[22] = A, e[23] = et) : et = e[23];
  let I;
  e[24] !== et || e[25] !== it ? (I = /* @__PURE__ */ p.jsx("div", {
    className: it,
    children: et
  }), e[24] = et, e[25] = it, e[26] = I) : I = e[26];
  let J;
  return e[27] !== I || e[28] !== V || e[29] !== k || e[30] !== K ? (J = /* @__PURE__ */ p.jsxs("div", {
    className: V,
    "data-modal-drag": "",
    children: [k, K, I]
  }), e[27] = I, e[28] = V, e[29] = k, e[30] = K, e[31] = J) : J = e[31], J;
}, ZC = /* @__PURE__ */ E.createContext({
  inDetailPane: !1
}), QC = () => E.useContext(ZC), Qt = () => {
}, Wo = () => ({
  show: Qt,
  hide: Qt,
  enable: Qt,
  disable: Qt,
  showProgress: Qt,
  hideProgress: Qt,
  setParams: Qt,
  setText: Qt,
  onClick: Qt,
  offClick: Qt
}), FC = {
  initData: "",
  themeParams: {},
  viewportHeight: 0,
  BackButton: Wo(),
  SettingsButton: Wo(),
  MainButton: Wo(),
  SecondaryButton: Wo(),
  HapticFeedback: {
    impactOccurred: Qt,
    notificationOccurred: Qt,
    selectionChanged: Qt
  },
  onEvent: Qt,
  offEvent: Qt,
  expand: Qt,
  setHeaderColor: Qt,
  setBackgroundColor: Qt,
  setBottomBarColor: Qt,
  disableVerticalSwipes: Qt,
  enableVerticalSwipes: Qt,
  requestFullscreen: Qt,
  exitFullscreen: Qt,
  shareToStory: Qt
}, wa = globalThis.Telegram?.WebApp ?? FC;
function JC(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var Bf = { exports: {} }, Vf, Ng;
function WC() {
  if (Ng) return Vf;
  Ng = 1;
  var a = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Vf = a, Vf;
}
var Uf, Og;
function IC() {
  if (Og) return Uf;
  Og = 1;
  var a = /* @__PURE__ */ WC();
  function e() {
  }
  function l() {
  }
  return l.resetWarningCache = e, Uf = function() {
    function s(f, h, y, m, g, v) {
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
  }, Uf;
}
var zg;
function t8() {
  return zg || (zg = 1, Bf.exports = /* @__PURE__ */ IC()()), Bf.exports;
}
var e8 = /* @__PURE__ */ t8();
const hn = /* @__PURE__ */ JC(e8);
hn.func;
const Mh = "_button_124dm_1", wb = "_filled_124dm_9", Tb = "_tinted_124dm_14", Cb = "_plain_124dm_19", Eb = "_outlined_124dm_24", Ab = "_gray_124dm_28", jb = "_disabled_124dm_33", _h = "_skeleton_124dm_38", Mb = "_wave_124dm_1", n8 = {
  button: Mh,
  filled: wb,
  tinted: Tb,
  plain: Cb,
  outlined: Eb,
  gray: Ab,
  disabled: jb,
  skeleton: _h,
  wave: Mb
}, a8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  button: Mh,
  default: n8,
  disabled: jb,
  filled: wb,
  gray: Ab,
  outlined: Eb,
  plain: Cb,
  skeleton: _h,
  tinted: Tb,
  wave: Mb
}, Symbol.toStringTag, { value: "Module" })), Ft = (a) => {
  const e = wt.c(34);
  let l, s, r, c, f;
  e[0] !== a ? ({
    variant: f,
    label: l,
    isShine: r,
    isFill: c,
    ...s
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c, e[5] = f) : (l = e[1], s = e[2], r = e[3], c = e[4], f = e[5]);
  const h = r === void 0 ? !1 : r, y = c === void 0 ? !1 : c, {
    isApple: m
  } = el(), g = !!Br(), v = Sh(g);
  let b;
  e[6] !== y ? (b = y && {
    "data-fill": !0
  }, e[6] = y, e[7] = b) : b = e[7];
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
  let A;
  e[15] !== l ? (A = /* @__PURE__ */ p.jsx(lt, {
    variant: "body",
    weight: "semibold",
    children: l
  }), e[15] = l, e[16] = A) : A = e[16];
  const _ = A, M = g ? Vr : void 0, j = `${Mh} ${a8[f]} ${g ? _h : ""} ${v}`;
  let D;
  e[17] !== m || e[18] !== g ? (D = m && !g && {
    whileTap: {
      scale: 1.02
    }
  }, e[17] = m, e[18] = g, e[19] = D) : D = e[19];
  let B;
  e[20] !== g || e[21] !== f ? (B = f === "filled" && !g && /* @__PURE__ */ p.jsx(vs, {}), e[20] = g, e[21] = f, e[22] = B) : B = e[22];
  let V;
  e[23] !== _ || e[24] !== g ? (V = g ? /* @__PURE__ */ p.jsx(cb, {
    active: !1,
    children: _
  }) : _, e[23] = _, e[24] = g, e[25] = V) : V = e[25];
  let R;
  return e[26] !== w || e[27] !== s || e[28] !== B || e[29] !== V || e[30] !== M || e[31] !== j || e[32] !== D ? (R = /* @__PURE__ */ p.jsxs(Fi, {
    ref: M,
    className: j,
    ...D,
    ...w,
    ...s,
    children: [B, V]
  }), e[26] = w, e[27] = s, e[28] = B, e[29] = V, e[30] = M, e[31] = j, e[32] = D, e[33] = R) : R = e[33], R;
};
function _b(a) {
  var e, l, s = "";
  if (typeof a == "string" || typeof a == "number") s += a;
  else if (typeof a == "object") if (Array.isArray(a)) {
    var r = a.length;
    for (e = 0; e < r; e++) a[e] && (l = _b(a[e])) && (s && (s += " "), s += l);
  } else for (l in a) a[l] && (s && (s += " "), s += l);
  return s;
}
function i8() {
  for (var a, e, l = 0, s = "", r = arguments.length; l < r; l++) (a = arguments[l]) && (e = _b(a)) && (s && (s += " "), s += e);
  return s;
}
const Rb = (...a) => i8(...a), l8 = {
  SNACKBAR: {
    type: "spring",
    stiffness: 280,
    damping: 26
  }
}, Db = "_overlay_qo6yx_1", Nb = "_opacity_qo6yx_2", Rh = "_fadeIn_qo6yx_6", Dh = "_fadeOut_qo6yx_10", s8 = {
  overlay: Db,
  opacity: Nb,
  fadeIn: Rh,
  fadeOut: Dh,
  "overlay-out": "_overlay-out_qo6yx_1",
  "opacity-out": "_opacity-out_qo6yx_1"
}, o8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: s8,
  fadeIn: Rh,
  fadeOut: Dh,
  opacity: Nb,
  overlay: Db
}, Symbol.toStringTag, { value: "Module" })), r8 = typeof window < "u" && "ontouchstart" in window, u8 = 250;
function c8(a) {
  const e = wt.c(21);
  let l;
  e[0] !== a ? (l = a === void 0 ? {} : a, e[0] = a, e[1] = l) : l = e[1];
  const {
    onTap: s,
    onTapOut: r,
    mode: c,
    disabled: f
  } = l, h = o8[c === void 0 ? "overlay" : c], [y, m] = E.useState(!1);
  let g;
  e[2] !== h ? (g = [h], e[2] = h, e[3] = g) : g = e[3];
  const [v, b] = E.useState(g), T = E.useRef();
  let S;
  e[4] !== h || e[5] !== r ? (S = () => {
    m(!1), b([h, Dh]), r?.(), T.current = window.setTimeout(() => {
      b([h]);
    }, u8);
  }, e[4] = h, e[5] = r, e[6] = S) : S = e[6];
  const w = S;
  let A;
  e[7] !== h || e[8] !== s ? (A = (R) => {
    clearTimeout(T.current), m(!0), b([h, Rh]), s?.(R);
  }, e[7] = h, e[8] = s, e[9] = A) : A = e[9];
  const _ = A;
  let M, j;
  e[10] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (M = () => () => clearTimeout(T.current), j = [], e[10] = M, e[11] = j) : (M = e[10], j = e[11]), E.useEffect(M, j);
  let D;
  e[12] !== f || e[13] !== _ || e[14] !== w || e[15] !== y ? (D = r8 ? {
    onTouchStart: (R) => {
      f || (R.touches.length === 1 ? _({
        target: R.currentTarget,
        clientX: R.touches[0].clientX,
        clientY: R.touches[0].clientY
      }) : w());
    },
    onTouchEnd: () => {
      f || y && w();
    },
    onPointerMove: (R) => {
      y && R.pointerType === "touch" && (R.movementY !== 0 || R.movementX !== 0) && w();
    },
    onTouchCancel: () => {
      y && w();
    }
  } : {
    onMouseLeave: () => {
      y && w();
    },
    onMouseDown: (R) => {
      f || _({
        target: R.currentTarget,
        clientX: R.clientX,
        clientY: R.clientY
      });
    },
    onMouseUp: () => {
      f || y && w();
    },
    onContextMenu: () => {
      y && w();
    }
  }, e[12] = f, e[13] = _, e[14] = w, e[15] = y, e[16] = D) : D = e[16];
  const B = D;
  let V;
  return e[17] !== B || e[18] !== y || e[19] !== v ? (V = [y, B, v], e[17] = B, e[18] = y, e[19] = v, e[20] = V) : V = e[20], V;
}
const f8 = "_root_1oiyj_1", d8 = "_fade_1oiyj_22", h8 = "_ripples_1oiyj_30", m8 = "_ripple_1oiyj_30", p8 = "_tapped_1oiyj_47", Io = (...a) => a.filter(Boolean).join(" "), y8 = (a, e) => {
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
}, Te = ({
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
  } = el(), [y, m] = E.useState({}), [g, v, b] = c8({
    mode: s,
    disabled: r,
    onTap: ({
      target: w,
      clientX: A,
      clientY: _
    }) => {
      if (!h || !w) return;
      const {
        x: M,
        y: j,
        width: D,
        height: B
      } = w.getBoundingClientRect(), V = Math.max(D * 2, B * 2);
      m((R) => ({
        ...R,
        [`${performance.now()}`]: [A - M - V / 2, _ - j - V / 2, V]
      }));
    }
  }), T = s === "opacity", S = y8(c, v);
  return /* @__PURE__ */ p.jsxs(a, {
    ...S,
    disabled: r || void 0,
    className: Io(f8, l, T && Io(...b)),
    children: [e, f && !T && /* @__PURE__ */ p.jsx("div", {
      className: Io(d8, ...b)
    }), h && /* @__PURE__ */ p.jsx("div", {
      className: h8,
      children: Object.entries(y).map(([w, A]) => /* @__PURE__ */ p.jsx("span", {
        className: Io(m8, g && p8),
        style: {
          left: A[0],
          top: A[1],
          width: A[2],
          height: A[2]
        },
        onAnimationEnd: () => {
          g || m((_) => {
            const M = {
              ..._
            };
            return delete M[w], M;
          });
        }
      }, w))
    })]
  });
}, g8 = "_label_1w5sq_1", v8 = "_accent_1w5sq_6", b8 = "_description_1w5sq_10", Lg = "_caption_1w5sq_14", x8 = (a) => {
  const e = wt.c(15), {
    type: l,
    title: s,
    description: r,
    caption: c,
    bold: f
  } = a, h = f ? "medium" : "regular", y = `${g8} ${l === "Accent" ? v8 : ""}`;
  let m;
  e[0] !== s || e[1] !== h ? (m = /* @__PURE__ */ p.jsx(lt, {
    variant: "body",
    weight: h,
    children: s
  }), e[0] = s, e[1] = h, e[2] = m) : m = e[2];
  let g;
  e[3] !== y || e[4] !== m ? (g = /* @__PURE__ */ p.jsx("div", {
    className: y,
    children: m
  }), e[3] = y, e[4] = m, e[5] = g) : g = e[5];
  let v;
  e[6] !== c || e[7] !== r ? (v = r && /* @__PURE__ */ p.jsx("div", {
    className: c ? b8 : Lg,
    children: /* @__PURE__ */ p.jsx(lt, {
      variant: c ? "subheadline1" : "subheadline2",
      weight: "regular",
      children: r
    })
  }), e[6] = c, e[7] = r, e[8] = v) : v = e[8];
  let b;
  e[9] !== c ? (b = c && /* @__PURE__ */ p.jsx("div", {
    className: Lg,
    children: /* @__PURE__ */ p.jsx(lt, {
      variant: "subheadline2",
      weight: "regular",
      children: c
    })
  }), e[9] = c, e[10] = b) : b = e[10];
  let T;
  return e[11] !== g || e[12] !== v || e[13] !== b ? (T = /* @__PURE__ */ p.jsxs(p.Fragment, {
    children: [g, v, b]
  }), e[11] = g, e[12] = v, e[13] = b, e[14] = T) : T = e[14], T;
}, Ob = "_chevron_en74z_1", zb = "_dropdown_en74z_8", Nh = "_colorpicker_en74z_12", Oh = "_picker_en74z_63", S8 = {
  chevron: Ob,
  dropdown: zb,
  colorpicker: Nh,
  picker: Oh
}, Bg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  chevron: Ob,
  colorpicker: Nh,
  default: S8,
  dropdown: zb,
  picker: Oh
}, Symbol.toStringTag, { value: "Module" })), w8 = (a) => {
  const e = wt.c(21), {
    type: l,
    className: s,
    children: r,
    value: c,
    onChange: f,
    inputRef: h,
    id: y,
    name: m,
    showValue: g
  } = a, v = m === void 0 ? "color" : m, b = g === void 0 ? !0 : g;
  if (l === "Picker") {
    let M;
    return e[0] !== r ? (M = /* @__PURE__ */ p.jsx("div", {
      className: Oh,
      children: /* @__PURE__ */ p.jsx(lt, {
        variant: "body",
        weight: "regular",
        children: r
      })
    }), e[0] = r, e[1] = M) : M = e[1], M;
  }
  if (l === "ColorPicker") {
    const M = y || v;
    let j;
    e[2] !== M || e[3] !== h || e[4] !== v || e[5] !== f || e[6] !== c ? (j = /* @__PURE__ */ p.jsx("input", {
      ref: h,
      type: "color",
      value: c,
      onChange: f,
      name: v,
      id: M
    }), e[2] = M, e[3] = h, e[4] = v, e[5] = f, e[6] = c, e[7] = j) : j = e[7];
    let D;
    e[8] !== M || e[9] !== b || e[10] !== c ? (D = b && /* @__PURE__ */ p.jsx("label", {
      htmlFor: M,
      children: /* @__PURE__ */ p.jsx(lt, {
        variant: "body",
        weight: "regular",
        children: c
      })
    }), e[8] = M, e[9] = b, e[10] = c, e[11] = D) : D = e[11];
    let B;
    return e[12] !== j || e[13] !== D ? (B = /* @__PURE__ */ p.jsxs("div", {
      className: Nh,
      children: [j, D]
    }), e[12] = j, e[13] = D, e[14] = B) : B = e[14], B;
  }
  const T = Bg[l.toLowerCase()], S = Bg[s];
  let w;
  e[15] !== T || e[16] !== S ? (w = [T, S].filter(Boolean), e[15] = T, e[16] = S, e[17] = w) : w = e[17];
  const A = w.join(" ");
  let _;
  return e[18] !== r || e[19] !== A ? (_ = /* @__PURE__ */ p.jsx("div", {
    className: A,
    children: r
  }), e[18] = r, e[19] = A, e[20] = _) : _ = e[20], _;
}, T8 = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5ZM15.1016 9.01953C14.7891 8.70711 14.2821 8.70711 13.9697 9.01953L12.001 10.9873L10.0342 9.02051C9.72176 8.70809 9.21574 8.70809 8.90332 9.02051C8.5909 9.33293 8.5909 9.83895 8.90332 10.1514L10.8701 12.1191L9.02051 13.9697C8.70809 14.2821 8.70809 14.7882 9.02051 15.1006C9.33293 15.413 9.83895 15.413 10.1514 15.1006L12.001 13.25L13.8525 15.1016C14.165 15.414 14.672 15.414 14.9844 15.1016C15.2968 14.7891 15.2968 14.2821 14.9844 13.9697L13.1328 12.1182L15.1016 10.1514C15.414 9.83895 15.414 9.33195 15.1016 9.01953Z", fill: "#3D3C3A" }))), C8 = "_root_9aal5_1", E8 = "_input_9aal5_5", A8 = "_inputWithClearButton_9aal5_25", j8 = "_clearButtonIcon_9aal5_29", M8 = "_empty_9aal5_49", _8 = "_icon_9aal5_61", R8 = /* @__PURE__ */ E.forwardRef((a, e) => {
  const l = wt.c(24);
  let s, r, c, f, h, y;
  l[0] !== a ? ({
    label: s,
    value: y,
    onChange: r,
    onClear: c,
    ...f
  } = a, h = (M) => {
    r(M.target.value);
  }, l[0] = a, l[1] = s, l[2] = r, l[3] = c, l[4] = f, l[5] = h, l[6] = y) : (s = l[1], r = l[2], c = l[3], f = l[4], h = l[5], y = l[6]);
  const m = h, g = !y && M8;
  let v;
  l[7] !== g ? (v = [C8, g].filter(Boolean), l[7] = g, l[8] = v) : v = l[8];
  const b = v.join(" "), T = `${E8} ${c ? A8 : ""}`, S = !r;
  let w;
  l[9] !== m || l[10] !== s || l[11] !== e || l[12] !== f || l[13] !== T || l[14] !== S || l[15] !== y ? (w = /* @__PURE__ */ p.jsx("input", {
    "aria-label": s,
    onChange: m,
    type: "text",
    className: T,
    placeholder: s,
    value: y,
    readOnly: S,
    ref: e,
    ...f
  }), l[9] = m, l[10] = s, l[11] = e, l[12] = f, l[13] = T, l[14] = S, l[15] = y, l[16] = w) : w = l[16];
  let A;
  l[17] !== s || l[18] !== c ? (A = c && /* @__PURE__ */ p.jsx("button", {
    type: "button",
    className: [_8, j8].filter(Boolean).join(" "),
    onClick: c,
    "aria-label": `Clear ${s}`,
    children: /* @__PURE__ */ p.jsx(T8, {})
  }), l[17] = s, l[18] = c, l[19] = A) : A = l[19];
  let _;
  return l[20] !== b || l[21] !== w || l[22] !== A ? (_ = /* @__PURE__ */ p.jsxs(lt, {
    variant: "body",
    weight: "regular",
    className: b,
    children: [w, A]
  }), l[20] = b, l[21] = w, l[22] = A, l[23] = _) : _ = l[23], _;
}), Vg = "_root_1aqfj_1";
function D8(a) {
  const e = wt.c(15), {
    value: l,
    defaultValue: s,
    onChange: r,
    disabled: c,
    className: f
  } = a, h = s === void 0 ? !1 : s, y = c === void 0 ? !1 : c, m = l !== void 0, [g, v] = E.useState(h), b = m ? l : g;
  let T;
  e[0] !== r ? (T = (R) => {
    r && r(R);
  }, e[0] = r, e[1] = T) : T = e[1];
  const S = T;
  let w;
  e[2] !== b || e[3] !== S || e[4] !== m ? (w = () => {
    if (wa.HapticFeedback.selectionChanged(), m) {
      S(!b);
      return;
    }
    v((R) => {
      const k = !R;
      return S(k), k;
    });
  }, e[2] = b, e[3] = S, e[4] = m, e[5] = w) : w = e[5];
  const A = w;
  let _;
  e[6] !== y || e[7] !== A ? (_ = (R) => {
    R.stopPropagation(), !y && A();
  }, e[6] = y, e[7] = A, e[8] = _) : _ = e[8];
  const M = _, j = f ? `${Vg} ${f}` : Vg, D = y || void 0, B = y || void 0;
  let V;
  return e[9] !== b || e[10] !== j || e[11] !== M || e[12] !== D || e[13] !== B ? (V = /* @__PURE__ */ p.jsx("div", {
    className: j,
    "data-state": b,
    "data-disabled": D,
    onClick: M,
    role: "switch",
    "aria-checked": b,
    "aria-disabled": B
  }), e[9] = b, e[10] = j, e[11] = M, e[12] = D, e[13] = B, e[14] = V) : V = e[14], V;
}
const N8 = (a) => {
  const e = wt.c(29);
  let l, s, r, c, f, h, y;
  e[0] !== a ? ({
    start: c,
    children: l,
    value: y,
    defaultValue: f,
    onChange: s,
    disabled: h,
    ...r
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c, e[5] = f, e[6] = h, e[7] = y) : (l = e[1], s = e[2], r = e[3], c = e[4], f = e[5], h = e[6], y = e[7]);
  const m = f === void 0 ? !1 : f, g = h === void 0 ? !1 : h, v = y !== void 0, [b, T] = E.useState(m), S = v ? y : b;
  let w;
  e[8] !== s ? (w = (R) => {
    s && s(R);
  }, e[8] = s, e[9] = w) : w = e[9];
  const A = w;
  let _;
  e[10] !== A || e[11] !== v ? (_ = (R) => {
    v || T(R), A(R);
  }, e[10] = A, e[11] = v, e[12] = _) : _ = e[12];
  const M = _;
  let j;
  e[13] !== S || e[14] !== g || e[15] !== A || e[16] !== M || e[17] !== v ? (j = () => {
    if (!g) {
      if (wa.HapticFeedback.selectionChanged(), v) {
        M(!S);
        return;
      }
      T((R) => {
        const k = !R;
        return A(k), k;
      });
    }
  }, e[13] = S, e[14] = g, e[15] = A, e[16] = M, e[17] = v, e[18] = j) : j = e[18];
  const D = j;
  let B;
  e[19] !== S || e[20] !== g || e[21] !== M ? (B = /* @__PURE__ */ p.jsx(Pn.Part, {
    type: "Switch",
    children: /* @__PURE__ */ p.jsx(D8, {
      value: S,
      onChange: M,
      disabled: g
    })
  }), e[19] = S, e[20] = g, e[21] = M, e[22] = B) : B = e[22];
  let V;
  return e[23] !== l || e[24] !== D || e[25] !== r || e[26] !== c || e[27] !== B ? (V = /* @__PURE__ */ p.jsx(Pn, {
    start: c,
    end: B,
    onClick: D,
    ...r,
    children: l
  }), e[23] = l, e[24] = D, e[25] = r, e[26] = c, e[27] = B, e[28] = V) : V = e[28], V;
}, Ug = "_root_146xt_10", O8 = "_start_146xt_32", z8 = "_image_146xt_37", L8 = "_icon_146xt_45", B8 = "_body_146xt_57", V8 = "_end_146xt_65", U8 = "_caption_146xt_76", k8 = "_label_146xt_80", H8 = (a) => {
  const e = wt.c(28);
  let l, s, r, c, f, h, y;
  e[0] !== a ? ({
    as: h,
    start: f,
    children: l,
    end: s,
    onClick: r,
    tappable: y,
    ...c
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c, e[5] = f, e[6] = h, e[7] = y) : (l = e[1], s = e[2], r = e[3], c = e[4], f = e[5], h = e[6], y = e[7]);
  const m = h === void 0 ? "div" : h, g = y ?? (r != null || m !== "div");
  let v;
  e[8] !== f ? (v = f && /* @__PURE__ */ p.jsx("div", {
    className: O8,
    children: f
  }), e[8] = f, e[9] = v) : v = e[9];
  let b;
  e[10] !== l ? (b = /* @__PURE__ */ p.jsx("div", {
    className: B8,
    children: l
  }), e[10] = l, e[11] = b) : b = e[11];
  let T;
  e[12] !== s ? (T = s && /* @__PURE__ */ p.jsx("div", {
    className: V8,
    children: s
  }), e[12] = s, e[13] = T) : T = e[13];
  let S;
  e[14] !== v || e[15] !== b || e[16] !== T ? (S = /* @__PURE__ */ p.jsxs(p.Fragment, {
    children: [v, b, T]
  }), e[14] = v, e[15] = b, e[16] = T, e[17] = S) : S = e[17];
  const w = S;
  if (!g) {
    let _;
    return e[18] !== m || e[19] !== w || e[20] !== r || e[21] !== c ? (_ = /* @__PURE__ */ p.jsx(m, {
      className: Ug,
      onClick: r,
      ...c,
      children: w
    }), e[18] = m, e[19] = w, e[20] = r, e[21] = c, e[22] = _) : _ = e[22], _;
  }
  let A;
  return e[23] !== m || e[24] !== w || e[25] !== r || e[26] !== c ? (A = /* @__PURE__ */ p.jsx(Te, {
    as: m,
    className: Ug,
    onClick: r,
    ...c,
    children: w
  }), e[23] = m, e[24] = w, e[25] = r, e[26] = c, e[27] = A) : A = e[27], A;
}, q8 = (a) => {
  const e = wt.c(6), {
    type: l,
    src: s,
    iconType: r
  } = a, c = s === void 0 ? null : s, f = r === void 0 ? null : r;
  let h;
  t: switch (l) {
    case "Image": {
      let m;
      e[0] !== c ? (m = /* @__PURE__ */ p.jsx("img", {
        src: c,
        alt: "",
        className: z8
      }), e[0] = c, e[1] = m) : m = e[1], h = m;
      break t;
    }
    case "Icon": {
      let m;
      e[2] !== f ? (m = /* @__PURE__ */ p.jsx("div", {
        className: L8,
        children: f
      }), e[2] = f, e[3] = m) : m = e[3], h = m;
      break t;
    }
    default:
      h = null;
  }
  let y;
  return e[4] !== h ? (y = /* @__PURE__ */ p.jsx(p.Fragment, {
    children: h
  }), e[4] = h, e[5] = y) : y = e[5], y;
}, $8 = (a) => {
  const e = wt.c(7), {
    label: l,
    caption: s
  } = a;
  let r;
  e[0] !== l ? (r = /* @__PURE__ */ p.jsx("div", {
    className: k8,
    children: /* @__PURE__ */ p.jsx(lt, {
      variant: "body",
      weight: "regular",
      children: l
    })
  }), e[0] = l, e[1] = r) : r = e[1];
  let c;
  e[2] !== s ? (c = s && /* @__PURE__ */ p.jsx("div", {
    className: U8,
    children: /* @__PURE__ */ p.jsx(lt, {
      variant: "subheadline2",
      weight: "regular",
      children: s
    })
  }), e[2] = s, e[3] = c) : c = e[3];
  let f;
  return e[4] !== r || e[5] !== c ? (f = /* @__PURE__ */ p.jsxs(p.Fragment, {
    children: [r, c]
  }), e[4] = r, e[5] = c, e[6] = f) : f = e[6], f;
}, Pn = Object.assign(H8, {
  Start: q8,
  End: $8,
  Part: w8,
  Text: x8,
  Editable: R8,
  Switch: N8
});
Lr.section;
bh[16];
function G8(a, e, l) {
  const s = wt.c(8);
  let r;
  s[0] !== l ? (r = {}, s[0] = l, s[1] = r) : r = s[1];
  const {
    enabled: c
  } = r, f = c === void 0 ? !0 : c, h = E.useRef(e);
  let y;
  s[2] !== e ? (y = () => {
    h.current = e;
  }, s[2] = e, s[3] = y) : y = s[3], E.useEffect(y);
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
  }, g = [a, f], s[4] = f, s[5] = a, s[6] = m, s[7] = g) : (m = s[6], g = s[7]), E.useEffect(m, g);
}
const kf = (a, e, l) => Math.min(Math.max(a, e), l), Y8 = /* @__PURE__ */ E.createContext({
  colorScheme: "light",
  setColorScheme: () => {
  },
  toggleColorScheme: () => {
  }
}), X8 = ["light", "dark"], Td = (a) => X8.includes(a), Cd = () => {
  if (typeof window > "u" || typeof document > "u")
    return null;
  const a = window.getComputedStyle(document.documentElement).getPropertyValue("--tg-color-scheme").trim();
  return Td(a) ? a : null;
}, Lb = () => typeof window > "u" || !window.matchMedia ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light", P8 = () => Cd() ?? Lb(), K8 = typeof window > "u" ? E.useEffect : E.useLayoutEffect, Z8 = (a) => {
  const e = wt.c(20), {
    children: l,
    defaultColorScheme: s,
    onColorSchemeChange: r
  } = a, [c, f] = E.useState(P8);
  let h;
  e[0] !== s ? (h = () => Td(s) ? s : null, e[0] = s, e[1] = h) : h = e[1];
  const [y, m] = E.useState(h), g = y ?? c;
  let v;
  e[2] !== g || e[3] !== r ? (v = (V) => {
    const R = typeof V == "function" ? V(g) : V;
    Td(R) && (m(R), r?.(R));
  }, e[2] = g, e[3] = r, e[4] = v) : v = e[4];
  const b = v;
  let T;
  e[5] !== g || e[6] !== b ? (T = () => {
    b(g === "dark" ? "light" : "dark");
  }, e[5] = g, e[6] = b, e[7] = T) : T = e[7];
  const S = T;
  let w, A;
  e[8] !== g ? (w = () => {
    document.documentElement.dataset.colorScheme = g, document.body.dataset.colorScheme = g;
  }, A = [g], e[8] = g, e[9] = w, e[10] = A) : (w = e[9], A = e[10]), K8(w, A);
  let _, M;
  e[11] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (_ = () => {
    const V = () => {
      const P = Cd();
      if (P) {
        f(P);
        return;
      }
      f(Lb());
    }, R = (P) => {
      Cd() || f(P.matches ? "dark" : "light");
    };
    V();
    const k = window.matchMedia("(prefers-color-scheme: dark)");
    return wa.onEvent("themeChanged", V), k.addEventListener("change", R), () => {
      wa.offEvent("themeChanged", V), k.removeEventListener("change", R);
    };
  }, M = [], e[11] = _, e[12] = M) : (_ = e[11], M = e[12]), E.useEffect(_, M);
  let j;
  e[13] !== g || e[14] !== b || e[15] !== S ? (j = {
    colorScheme: g,
    setColorScheme: b,
    toggleColorScheme: S
  }, e[13] = g, e[14] = b, e[15] = S, e[16] = j) : j = e[16];
  const D = j;
  let B;
  return e[17] !== l || e[18] !== D ? (B = /* @__PURE__ */ p.jsx(Y8.Provider, {
    value: D,
    children: l
  }), e[17] = l, e[18] = D, e[19] = B) : B = e[19], B;
}, Q8 = ({
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
}, F8 = (a) => {
  const e = wt.c(15);
  let l, s, r;
  e[0] !== a ? ({
    className: l,
    onLoad: s,
    ...r
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r) : (l = e[1], s = e[2], r = e[3]);
  let c;
  e[4] !== r ? (c = () => Q8(r), e[4] = r, e[5] = c) : c = e[5];
  const [f, h] = E.useState(c);
  let y;
  e[6] !== s ? (y = (b) => {
    h(!0), s?.(b);
  }, e[6] = s, e[7] = y) : y = e[7];
  const m = f && "opacity-100";
  let g;
  e[8] !== l || e[9] !== m ? (g = Rb("rounded-[inherit] opacity-0 transition-opacity duration-250 ease-[cubic-bezier(0.23,1,0.32,1)]", m, l), e[8] = l, e[9] = m, e[10] = g) : g = e[10];
  let v;
  return e[11] !== r || e[12] !== y || e[13] !== g ? (v = /* @__PURE__ */ p.jsx("img", {
    onLoad: y,
    className: g,
    ...r
  }), e[11] = r, e[12] = y, e[13] = g, e[14] = v) : v = e[14], v;
}, J8 = "_img_95uc6_1", W8 = "_imgRedacted_95uc6_9", I8 = "_shapeCircle_95uc6_13", tE = "_shapeRounded_95uc6_21", eE = /* @__PURE__ */ E.forwardRef((a, e) => {
  const l = wt.c(14), {
    size: s,
    className: r,
    style: c,
    src: f,
    shape: h
  } = a;
  let y = s === void 0 ? 40 : s;
  const m = h === void 0 ? "circle" : h, {
    isMaterial: g
  } = el(), v = !!Br(), b = Sh(v);
  g && (y = 42);
  let T;
  l[0] !== v || l[1] !== e ? (T = (j) => {
    v && Vr(j), typeof e == "function" ? e(j) : e && (e.current = j);
  }, l[0] = v, l[1] = e, l[2] = T) : T = l[2];
  const S = `
                    ${m === "circle" ? I8 : ""}
                    ${m === "rounded" ? tE : ""}
                    ${b}
                    ${r || ""}`;
  let w;
  l[3] !== y || l[4] !== c ? (w = {
    width: y,
    height: y,
    ...c
  }, l[3] = y, l[4] = c, l[5] = w) : w = l[5];
  const A = `${J8} ${v ? W8 : ""}`;
  let _;
  l[6] !== f || l[7] !== A ? (_ = /* @__PURE__ */ p.jsx(F8, {
    src: f,
    className: A
  }), l[6] = f, l[7] = A, l[8] = _) : _ = l[8];
  let M;
  return l[9] !== T || l[10] !== S || l[11] !== w || l[12] !== _ ? (M = /* @__PURE__ */ p.jsx("div", {
    ref: T,
    className: S,
    style: w,
    children: _
  }), l[9] = T, l[10] = S, l[11] = w, l[12] = _, l[13] = M) : M = l[13], M;
}), nE = /* @__PURE__ */ E.forwardRef((a, e) => {
  const l = wt.c(11);
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
  let y;
  return l[5] !== s || l[6] !== h || l[7] !== r || l[8] !== e || l[9] !== f ? (y = /* @__PURE__ */ p.jsx(SC, {
    ref: e,
    href: f,
    onClick: h,
    ...r,
    children: s
  }), l[5] = s, l[6] = h, l[7] = r, l[8] = e, l[9] = f, l[10] = y) : y = l[10], y;
});
nE.displayName = "TransitionLink";
const Bb = ({
  children: a
}) => a;
Bb.isModalPage = !0;
Bb.propTypes = {
  id: hn.string.isRequired,
  children: hn.node
};
Lr.modal;
bh[16];
const aE = (a) => {
  const e = wt.c(2), {
    children: l
  } = a;
  let s;
  return e[0] !== l ? (s = /* @__PURE__ */ p.jsx(xT, {
    features: aC,
    strict: !0,
    children: l
  }), e[0] = l, e[1] = s) : s = e[1], s;
}, {
  setHeaderColor: iE,
  setBackgroundColor: lE
} = wa, nl = (a) => {
  const e = wt.c(18), {
    children: l,
    mode: s,
    headerColor: r,
    backgroundColor: c,
    expandOnMount: f
  } = a, h = s === void 0 ? "secondary" : s, {
    inDetailPane: y,
    setPaneBackground: m
  } = QC();
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
  const T = b, S = r ? `#${r}` : v[h], w = c ? `#${c}` : v[h], A = c ? `#${c}` : `var(${T[h]})`;
  let _, M;
  e[2] !== f ? (_ = () => {
    f && wa.expand();
  }, M = [f], e[2] = f, e[3] = _, e[4] = M) : (_ = e[3], M = e[4]), E.useEffect(_, M);
  let j, D;
  e[5] !== A || e[6] !== y || e[7] !== w || e[8] !== S ? (j = () => {
    y || (wa.initData ? (lE(w), iE(S)) : document.body.style.backgroundColor = A, document.body.style.setProperty("--page-background", A));
  }, D = [w, S, A, y], e[5] = A, e[6] = y, e[7] = w, e[8] = S, e[9] = j, e[10] = D) : (j = e[9], D = e[10]), E.useEffect(j, D);
  let B, V;
  e[11] !== A || e[12] !== y || e[13] !== m ? (B = () => {
    !y || !m || m(A);
  }, V = [y, m, A], e[11] = A, e[12] = y, e[13] = m, e[14] = B, e[15] = V) : (B = e[14], V = e[15]), E.useEffect(B, V);
  let R;
  return e[16] !== l ? (R = /* @__PURE__ */ p.jsx(p.Fragment, {
    children: l
  }), e[16] = l, e[17] = R) : R = e[17], R;
};
nl.propTypes = {
  children: hn.node,
  mode: hn.oneOf(["primary", "secondary"]),
  headerColor: hn.string,
  backgroundColor: hn.string,
  expandOnMount: hn.bool
};
const sE = "_root_125s3_1", oE = "_card_125s3_16", rE = "_container_125s3_22", Hf = "flex justify-between gap-compact px-content py-10 text-section";
function kg(a) {
  const e = wt.c(27);
  let l, s, r, c;
  switch (e[0] !== a ? ({
    type: r,
    title: s,
    value: c,
    ...l
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c) : (l = e[1], s = e[2], r = e[3], c = e[4]), r) {
    case "Headline": {
      let f;
      e[5] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (f = Rb(Hf, "text-foreground"), e[5] = f) : f = e[5];
      let h;
      e[6] !== s ? (h = /* @__PURE__ */ p.jsx(lt, {
        variant: "title3",
        weight: "bold",
        children: s
      }), e[6] = s, e[7] = h) : h = e[7];
      let y;
      e[8] !== c ? (y = c && /* @__PURE__ */ p.jsx(lt, {
        variant: "title3",
        weight: "bold",
        children: c
      }), e[8] = c, e[9] = y) : y = e[9];
      let m;
      return e[10] !== l || e[11] !== h || e[12] !== y ? (m = /* @__PURE__ */ p.jsxs("div", {
        className: f,
        ...l,
        children: [h, y]
      }), e[10] = l, e[11] = h, e[12] = y, e[13] = m) : m = e[13], m;
    }
    case "Footer": {
      let f;
      e[14] !== s ? (f = /* @__PURE__ */ p.jsx(lt, {
        variant: "footnote",
        children: s
      }), e[14] = s, e[15] = f) : f = e[15];
      let h;
      return e[16] !== l || e[17] !== f ? (h = /* @__PURE__ */ p.jsx("div", {
        className: Hf,
        ...l,
        children: f
      }), e[16] = l, e[17] = f, e[18] = h) : h = e[18], h;
    }
    default: {
      let f;
      e[19] !== s ? (f = /* @__PURE__ */ p.jsx(lt, {
        variant: "body",
        weight: "semibold",
        children: s
      }), e[19] = s, e[20] = f) : f = e[20];
      let h;
      e[21] !== c ? (h = c && /* @__PURE__ */ p.jsx(lt, {
        variant: "footnote",
        children: c
      }), e[21] = c, e[22] = h) : h = e[22];
      let y;
      return e[23] !== l || e[24] !== f || e[25] !== h ? (y = /* @__PURE__ */ p.jsxs("div", {
        className: Hf,
        ...l,
        children: [f, h]
      }), e[23] = l, e[24] = f, e[25] = h, e[26] = y) : y = e[26], y;
    }
  }
}
const uE = Lr.section, cE = bh[16], fE = 0.6, pt = (a) => {
  const e = wt.c(6);
  let l, s;
  e[0] !== a ? ({
    children: l,
    ...s
  } = a, e[0] = a, e[1] = l, e[2] = s) : (l = e[1], s = e[2]);
  let r;
  return e[3] !== l || e[4] !== s ? (r = /* @__PURE__ */ p.jsx("section", {
    className: sE,
    ...s,
    children: l
  }), e[3] = l, e[4] = s, e[5] = r) : r = e[5], r;
}, dE = (a) => {
  const e = wt.c(21);
  let l, s, r, c;
  e[0] !== a ? ({
    children: l,
    header: r,
    description: s,
    ...c
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c) : (l = e[1], s = e[2], r = e[3], c = e[4]);
  const {
    isApple: f
  } = el(), h = E.useRef(null), y = E.useRef(null), m = f ? uE : cE;
  let g;
  e[5] !== m ? (g = {
    radius: m,
    smoothing: fE
  }, e[5] = m, e[6] = g) : g = e[6];
  let v;
  e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = {
    autoEffects: !1
  }, e[7] = v) : v = e[7], W2(f ? y : h, g, v);
  let b;
  e[8] !== r ? (b = r && /* @__PURE__ */ p.jsx(kg, {
    title: r
  }), e[8] = r, e[9] = b) : b = e[9];
  let T;
  e[10] !== l ? (T = /* @__PURE__ */ p.jsx("div", {
    ref: y,
    className: rE,
    children: l
  }), e[10] = l, e[11] = T) : T = e[11];
  let S;
  e[12] !== b || e[13] !== T ? (S = /* @__PURE__ */ p.jsxs("div", {
    ref: h,
    className: oE,
    children: [b, T]
  }), e[12] = b, e[13] = T, e[14] = S) : S = e[14];
  let w;
  e[15] !== s ? (w = s && /* @__PURE__ */ p.jsx(kg, {
    type: "Footer",
    title: s
  }), e[15] = s, e[16] = w) : w = e[16];
  let A;
  return e[17] !== c || e[18] !== S || e[19] !== w ? (A = /* @__PURE__ */ p.jsxs("section", {
    ...c,
    children: [S, w]
  }), e[17] = c, e[18] = S, e[19] = w, e[20] = A) : A = e[20], A;
};
pt.Item = dE;
const hE = "_root_cnxqv_1", mE = "_icon_cnxqv_17", pE = "_content_cnxqv_42", yE = "_title_cnxqv_55", gE = "_description_cnxqv_56", vE = "_action_cnxqv_61", bE = "_link_cnxqv_61", xE = "_host_cnxqv_92", SE = "_host_top_cnxqv_105", wE = "_host_bottom_cnxqv_109", TE = "_item_cnxqv_114", CE = (a) => {
  const e = wt.c(19), {
    icon: l,
    title: s,
    description: r,
    link: c,
    action: f
  } = a, h = !!r;
  let y;
  e[0] !== l ? (y = l ? /* @__PURE__ */ p.jsx("div", {
    className: mE,
    "aria-hidden": "true",
    children: l
  }) : null, e[0] = l, e[1] = y) : y = e[1];
  const m = h ? "semibold" : void 0;
  let g;
  e[2] !== m || e[3] !== s ? (g = /* @__PURE__ */ p.jsx(lt, {
    as: "p",
    className: yE,
    variant: "subheadline2",
    weight: m,
    children: s
  }), e[2] = m, e[3] = s, e[4] = g) : g = e[4];
  let v;
  e[5] !== r ? (v = r ? /* @__PURE__ */ p.jsx(lt, {
    as: "p",
    className: gE,
    variant: "subheadline2",
    children: r
  }) : null, e[5] = r, e[6] = v) : v = e[6];
  let b;
  e[7] !== c ? (b = c ? /* @__PURE__ */ p.jsx("button", {
    type: "button",
    className: bE,
    onClick: c.onClick,
    children: /* @__PURE__ */ p.jsx(lt, {
      as: "span",
      variant: "subheadline2",
      children: c.label
    })
  }) : null, e[7] = c, e[8] = b) : b = e[8];
  let T;
  e[9] !== g || e[10] !== v || e[11] !== b ? (T = /* @__PURE__ */ p.jsxs("div", {
    className: pE,
    children: [g, v, b]
  }), e[9] = g, e[10] = v, e[11] = b, e[12] = T) : T = e[12];
  let S;
  e[13] !== f ? (S = f ? /* @__PURE__ */ p.jsx("button", {
    type: "button",
    className: vE,
    onClick: f.onClick,
    children: /* @__PURE__ */ p.jsx(lt, {
      as: "span",
      variant: "body",
      children: f.label
    })
  }) : null, e[13] = f, e[14] = S) : S = e[14];
  let w;
  return e[15] !== y || e[16] !== T || e[17] !== S ? (w = /* @__PURE__ */ p.jsxs("div", {
    className: hE,
    role: "status",
    "aria-live": "polite",
    children: [y, T, S]
  }), e[15] = y, e[16] = T, e[17] = S, e[18] = w) : w = e[18], w;
};
hn.shape({
  label: hn.node.isRequired,
  onClick: hn.func
});
const EE = 4e3, AE = 100, jE = 500, ME = (a) => {
  if (a)
    try {
      wa.HapticFeedback?.notificationOccurred(a);
    } catch {
    }
}, _E = (a) => {
  const e = wt.c(45), {
    item: l,
    onDismiss: s
  } = a, {
    id: r,
    icon: c,
    title: f,
    description: h,
    link: y,
    action: m,
    position: g,
    duration: v,
    type: b
  } = l, T = g === void 0 ? "bottom" : g, S = v === void 0 ? EE : v, w = iC(), [A, _] = E.useState(!1), [M, j] = E.useState(0);
  let D;
  e[0] !== r || e[1] !== s ? (D = () => s(r), e[0] = r, e[1] = s, e[2] = D) : D = e[2];
  const B = D;
  let V, R;
  e[3] !== b ? (V = () => {
    ME(b);
  }, R = [b], e[3] = b, e[4] = V, e[5] = R) : (V = e[4], R = e[5]), E.useEffect(V, R);
  let k, P;
  e[6] !== B || e[7] !== S || e[8] !== A ? (k = () => {
    if (!S || A)
      return;
    const Nt = setTimeout(B, S);
    return () => clearTimeout(Nt);
  }, P = [S, A, B], e[6] = B, e[7] = S, e[8] = A, e[9] = k, e[10] = P) : (k = e[9], P = e[10]), E.useEffect(k, P);
  const K = T === "top" ? -32 : 32, it = b === "error";
  let et;
  e[11] !== w || e[12] !== K ? (et = w ? {
    opacity: 0
  } : {
    opacity: 0,
    y: K,
    scale: 0.96
  }, e[11] = w, e[12] = K, e[13] = et) : et = e[13];
  const I = et;
  let J;
  e[14] !== it || e[15] !== w ? (J = w ? {
    opacity: 1
  } : {
    opacity: 1,
    y: 0,
    scale: 1,
    x: it ? [0, -10, 10, -7, 7, -3, 3, 0] : 0,
    transition: {
      default: l8.SNACKBAR,
      ...it && {
        x: {
          duration: 0.45,
          ease: "easeOut",
          delay: 0.18
        }
      }
    }
  }, e[14] = it, e[15] = w, e[16] = J) : J = e[16];
  const nt = J;
  let O;
  e[17] !== M || e[18] !== w || e[19] !== K ? (O = w ? {
    opacity: 0,
    transition: {
      duration: 0.15
    }
  } : {
    opacity: 0,
    x: M * 400,
    y: M === 0 ? K : 0,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }, e[17] = M, e[18] = w, e[19] = K, e[20] = O) : O = e[20];
  const Y = O;
  let Q;
  e[21] !== B ? (Q = (Nt, _t) => {
    _(!1);
    const Kt = _t.offset.x, rt = _t.velocity.x;
    (Math.abs(Kt) > AE || Math.abs(rt) > jE) && (j(Kt >= 0 ? 1 : -1), B());
  }, e[21] = B, e[22] = Q) : Q = e[22];
  const at = Q;
  let st;
  e[23] !== B ? (st = (Nt) => {
    if (Nt)
      return {
        ...Nt,
        onClick: () => {
          Nt.onClick?.(), B();
        }
      };
  }, e[23] = B, e[24] = st) : st = e[24];
  const N = st, G = w ? !1 : "x";
  let tt;
  e[25] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (tt = () => _(!0), e[25] = tt) : tt = e[25];
  let ot;
  e[26] !== y || e[27] !== N ? (ot = N(y), e[26] = y, e[27] = N, e[28] = ot) : ot = e[28];
  let dt;
  e[29] !== m || e[30] !== N ? (dt = N(m), e[29] = m, e[30] = N, e[31] = dt) : dt = e[31];
  let ht;
  e[32] !== h || e[33] !== c || e[34] !== ot || e[35] !== dt || e[36] !== f ? (ht = /* @__PURE__ */ p.jsx(CE, {
    icon: c,
    title: f,
    description: h,
    link: ot,
    action: dt
  }), e[32] = h, e[33] = c, e[34] = ot, e[35] = dt, e[36] = f, e[37] = ht) : ht = e[37];
  let vt;
  return e[38] !== nt || e[39] !== Y || e[40] !== at || e[41] !== I || e[42] !== G || e[43] !== ht ? (vt = /* @__PURE__ */ p.jsx(Fi, {
    className: TE,
    initial: I,
    animate: nt,
    exit: Y,
    layout: !0,
    drag: G,
    dragSnapToOrigin: !0,
    dragElastic: 0.6,
    dragMomentum: !1,
    onDragStart: tt,
    onDragEnd: at,
    children: ht
  }), e[38] = nt, e[39] = Y, e[40] = at, e[41] = I, e[42] = G, e[43] = ht, e[44] = vt) : vt = e[44], vt;
}, Vb = {
  top: SE,
  bottom: wE
}, RE = Object.keys(Vb), DE = (a) => {
  const e = wt.c(5), {
    snackbars: l,
    onDismiss: s
  } = a;
  let r;
  e[0] !== s || e[1] !== l ? (r = RE.map((f) => {
    const h = l.filter((y) => (y.position ?? "bottom") === f);
    return /* @__PURE__ */ p.jsx("div", {
      className: `${xE} ${Vb[f]}`,
      children: /* @__PURE__ */ p.jsx(bT, {
        initial: !1,
        children: h.map((y) => /* @__PURE__ */ p.jsx(_E, {
          item: y,
          onDismiss: s
        }, y.id))
      })
    }, f);
  }), e[0] = s, e[1] = l, e[2] = r) : r = e[2];
  let c;
  return e[3] !== r ? (c = /* @__PURE__ */ zr.createPortal(/* @__PURE__ */ p.jsx(p.Fragment, {
    children: r
  }), document.body), e[3] = r, e[4] = c) : c = e[4], c;
}, Ub = /* @__PURE__ */ E.createContext(null), NE = () => {
  const a = E.useContext(Ub);
  if (!a)
    throw new Error("useSnackbar must be used inside <SnackbarProvider>");
  return a;
}, kb = (a) => {
  const e = wt.c(9), {
    children: l
  } = a;
  let s;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (s = [], e[0] = s) : s = e[0];
  const [r, c] = E.useState(s), f = E.useRef(0);
  let h;
  e[1] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (h = (S) => {
    c((w) => w.filter((A) => A.id !== S));
  }, e[1] = h) : h = e[1];
  const y = h;
  let m;
  e[2] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (m = (S) => {
    f.current = f.current + 1;
    const w = f.current;
    return c((A) => [...A, {
      id: w,
      ...S
    }]), w;
  }, e[2] = m) : m = e[2];
  const g = m;
  let v;
  e[3] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = {
    show: g,
    dismiss: y
  }, e[3] = v) : v = e[3];
  let b;
  e[4] !== r ? (b = /* @__PURE__ */ p.jsx(DE, {
    snackbars: r,
    onDismiss: y
  }), e[4] = r, e[5] = b) : b = e[5];
  let T;
  return e[6] !== l || e[7] !== b ? (T = /* @__PURE__ */ p.jsxs(Ub.Provider, {
    value: v,
    children: [l, b]
  }), e[6] = l, e[7] = b, e[8] = T) : T = e[8], T;
}, OE = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/loader" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M12 3.02148C16.9704 3.02148 20.9997 7.07957 21 12.0859C21 17.0925 16.9706 21.1514 12 21.1514C7.02944 21.1514 3 17.0925 3 12.0859C3.00026 11.5299 3.44787 11.0791 4 11.0791C4.55213 11.0791 4.99974 11.5299 5 12.0859C5 15.9799 8.13401 19.1367 12 19.1367C15.866 19.1367 19 15.9799 19 12.0859C18.9997 8.19215 15.8658 5.03613 12 5.03613C9.64439 5.03613 7.56033 6.20674 6.29004 8.00684C5.97018 8.46016 5.34566 8.56708 4.89551 8.24512C4.44533 7.92286 4.33924 7.29328 4.65918 6.83984C6.28848 4.53074 8.96935 3.02148 12 3.02148Z", fill: "#3D3C3A" }))), zE = "_centered_1ma1e_1", LE = "_spinner_1ma1e_8", zh = (a) => {
  const e = wt.c(15);
  let l, s, r, c;
  e[0] !== a ? ({
    centered: l,
    className: s,
    size: c,
    ...r
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c) : (l = e[1], s = e[2], r = e[3], c = e[4]);
  let f;
  e[5] !== s ? (f = [LE, s].filter(Boolean), e[5] = s, e[6] = f) : f = e[6];
  const h = f.join(" ");
  let y;
  e[7] !== c ? (y = c ? {
    width: c,
    height: c
  } : void 0, e[7] = c, e[8] = y) : y = e[8];
  const m = y;
  let g;
  e[9] !== h || e[10] !== r || e[11] !== m ? (g = /* @__PURE__ */ p.jsx(OE, {
    ...r,
    className: h,
    style: m
  }), e[9] = h, e[10] = r, e[11] = m, e[12] = g) : g = e[12];
  const v = g;
  if (l) {
    let b;
    return e[13] !== v ? (b = /* @__PURE__ */ p.jsx("div", {
      className: zE,
      children: v
    }), e[13] = v, e[14] = b) : b = e[14], b;
  }
  return v;
}, BE = "_root_warzp_1", VE = "_gradient_warzp_71", UE = "_clipPathContainer_warzp_113", kE = "_tab_1mynw_1", HE = "_icon_1mynw_37", qE = "_active_1mynw_62", Hb = (a) => {
  const e = wt.c(21);
  let l, s, r, c, f, h;
  e[0] !== a ? ({
    isActive: s,
    onClick: c,
    label: r,
    icon: l,
    className: h,
    ...f
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c, e[5] = f, e[6] = h) : (l = e[1], s = e[2], r = e[3], c = e[4], f = e[5], h = e[6]);
  const y = h === void 0 ? "" : h;
  let m;
  e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (m = {
    type: "spring",
    stiffness: 800,
    damping: 50
  }, e[7] = m) : m = e[7];
  const g = `${kE} ${s ? qE : ""} ${y}`;
  let v;
  e[8] !== g ? (v = g.trim(), e[8] = g, e[9] = v) : v = e[9];
  let b;
  e[10] !== l ? (b = /* @__PURE__ */ p.jsx(Fi, {
    layout: !0,
    className: HE,
    children: l
  }), e[10] = l, e[11] = b) : b = e[11];
  let T;
  e[12] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (T = {
    display: "inline-block"
  }, e[12] = T) : T = e[12];
  let S;
  e[13] !== r ? (S = /* @__PURE__ */ p.jsx(rw, {
    layout: !0,
    style: T,
    children: r
  }), e[13] = r, e[14] = S) : S = e[14];
  let w;
  return e[15] !== c || e[16] !== f || e[17] !== v || e[18] !== b || e[19] !== S ? (w = /* @__PURE__ */ p.jsxs(Fi, {
    layout: !0,
    transition: m,
    ...f,
    className: v,
    onClick: c,
    children: [b, S]
  }), e[15] = c, e[16] = f, e[17] = v, e[18] = b, e[19] = S, e[20] = w) : w = e[20], w;
};
function $E({
  tabsLength: a,
  activeIndex: e,
  onSnapToSame: l,
  onSnapToNew: s,
  spring: r
}) {
  const c = E.useRef(null), [f, h] = E.useState(!1), [y, m] = E.useState(null), g = E.useRef(null), v = E.useRef(!1), b = E.useRef(null), T = E.useRef(0), S = 6, w = 100 / a, A = `calc(${w}% + 7.33px - 4px)`, _ = `calc(${w * e}% - ${3.67 * e}px)`, M = _, j = `calc(100% - (${_} + ${A}) - 2.33px * ${e})`, D = f && y != null ? `inset(0 ${100 - (y + w)}% 0 ${y}% round 100px)` : `inset(0 ${j} 0 ${M} round 100px)`, B = f ? {
    clipPath: {
      duration: 0
    }
  } : {
    clipPath: r
  }, V = (I) => {
    const J = c.current;
    if (!J) return;
    const nt = J.getBoundingClientRect(), O = I - nt.left, Y = nt.width;
    if (Y <= 0) return;
    const Q = O / Y * 100, at = kf(Q - w / 2, 0, 100 - w);
    m(at);
  }, R = (I) => {
    v.current = !0, b.current = I.pointerId, T.current = I.clientX;
  }, k = (I) => {
    if (!(b.current != null && I.pointerId !== b.current)) {
      if (!f) {
        if (!v.current) return;
        if (Math.abs(I.clientX - T.current) >= S) {
          try {
            I.currentTarget.setPointerCapture?.(I.pointerId), g.current = I.pointerId;
          } catch {
          }
          h(!0), V(I.clientX), I.preventDefault();
        }
        return;
      }
      g.current != null && I.pointerId !== g.current || (V(I.clientX), I.preventDefault());
    }
  }, P = (I) => {
    const J = c.current;
    let nt = e;
    if (J && typeof I == "number") {
      const O = J.getBoundingClientRect(), Y = I - O.left, Q = O.width;
      if (Q > 0) {
        const at = Q / a;
        nt = kf(Math.round(Y / at - 0.5), 0, a - 1);
      }
    } else if (y != null) {
      const O = 100 / a;
      nt = kf(Math.round(y / O), 0, a - 1);
    }
    nt === e ? l?.() : s?.(nt), h(!1), m(null), g.current = null;
  }, K = (I) => {
    if (v.current = !1, b.current = null, !!f && !(g.current != null && I.pointerId !== g.current)) {
      try {
        I.currentTarget.releasePointerCapture?.(I.pointerId);
      } catch {
      }
      P(I.clientX), I.preventDefault();
    }
  }, it = (I) => {
    v.current = !1, b.current = null, f && (P(I?.clientX), I.preventDefault?.());
  }, et = (I) => {
    f && P(I?.clientX);
  };
  return E.useEffect(() => {
    const I = () => {
      h(!1), m(null), g.current = null, v.current = !1, b.current = null;
    };
    return window.addEventListener("blur", I), () => window.removeEventListener("blur", I);
  }, []), {
    overlayRef: c,
    isDragging: f,
    animate: {
      clipPath: D
    },
    transition: B,
    handlers: {
      onPointerDown: R,
      onPointerMove: k,
      onPointerUp: K,
      onPointerCancel: it,
      onPointerLeave: et
    }
  };
}
function GE(a) {
  const e = wt.c(40), {
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
  const y = h, m = c === void 0 ? 64 : c, g = E.useId();
  if (!l || !s)
    return null;
  const {
    top: v,
    right: b,
    bottom: T,
    left: S
  } = y, w = l + S + b, A = m + v + T, _ = Math.max(0, w - S - b), M = Math.min(m / 2, _ / 2, 999), j = `grad-${g}`, D = `mask-${g}`, B = Math.max(S, b), V = Math.max(v, T), R = `0 0 ${w} ${A}`;
  let k;
  e[2] !== f ? (k = [VE, f].filter(Boolean), e[2] = f, e[3] = k) : k = e[3];
  const P = k.join(" "), K = `${B}px`, it = `${V}px`;
  let et;
  e[4] !== K || e[5] !== it ? (et = {
    "--overlay-padding-x": K,
    "--overlay-padding-y": it
  }, e[4] = K, e[5] = it, e[6] = et) : et = e[6];
  let I, J;
  e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (I = /* @__PURE__ */ p.jsx("stop", {
    offset: "0%",
    stopColor: "var(--mask-color)",
    stopOpacity: "var(--mask-opacity-top)"
  }), J = /* @__PURE__ */ p.jsx("stop", {
    offset: "100%",
    stopColor: "var(--mask-color)",
    stopOpacity: "var(--mask-opacity-bottom)"
  }), e[7] = I, e[8] = J) : (I = e[7], J = e[8]);
  let nt;
  e[9] !== j ? (nt = /* @__PURE__ */ p.jsxs("linearGradient", {
    id: j,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1",
    children: [I, J]
  }), e[9] = j, e[10] = nt) : nt = e[10];
  let O;
  e[11] !== A || e[12] !== w ? (O = /* @__PURE__ */ p.jsx("rect", {
    x: "0",
    y: "0",
    width: w,
    height: A,
    fill: "var(--ui-static-white)"
  }), e[11] = A, e[12] = w, e[13] = O) : O = e[13];
  let Y;
  e[14] !== m || e[15] !== _ || e[16] !== S || e[17] !== M || e[18] !== v ? (Y = /* @__PURE__ */ p.jsx("rect", {
    x: S,
    y: v,
    width: _,
    height: m,
    rx: M,
    ry: M,
    fill: "var(--ui-static-black)"
  }), e[14] = m, e[15] = _, e[16] = S, e[17] = M, e[18] = v, e[19] = Y) : Y = e[19];
  let Q;
  e[20] !== D || e[21] !== O || e[22] !== Y ? (Q = /* @__PURE__ */ p.jsxs("mask", {
    id: D,
    maskUnits: "userSpaceOnUse",
    children: [O, Y]
  }), e[20] = D, e[21] = O, e[22] = Y, e[23] = Q) : Q = e[23];
  let at;
  e[24] !== nt || e[25] !== Q ? (at = /* @__PURE__ */ p.jsxs("defs", {
    children: [nt, Q]
  }), e[24] = nt, e[25] = Q, e[26] = at) : at = e[26];
  const st = `url(#${j})`, N = `url(#${D})`;
  let G;
  e[27] !== A || e[28] !== w || e[29] !== st || e[30] !== N ? (G = /* @__PURE__ */ p.jsx("rect", {
    width: w,
    height: A,
    fill: st,
    mask: N
  }), e[27] = A, e[28] = w, e[29] = st, e[30] = N, e[31] = G) : G = e[31];
  let tt;
  return e[32] !== A || e[33] !== w || e[34] !== at || e[35] !== G || e[36] !== R || e[37] !== P || e[38] !== et ? (tt = /* @__PURE__ */ p.jsxs("svg", {
    width: w,
    height: A,
    viewBox: R,
    preserveAspectRatio: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: P,
    style: et,
    "aria-hidden": !0,
    children: [at, G]
  }), e[32] = A, e[33] = w, e[34] = at, e[35] = G, e[36] = R, e[37] = P, e[38] = et, e[39] = tt) : tt = e[39], tt;
}
const YE = (a) => {
  const e = wt.c(24), {
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
    animate: y,
    transition: m,
    handlers: g
  } = $E(f);
  let v;
  e[5] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = {
    opacity: 0
  }, e[5] = v) : v = e[5];
  let b;
  e[6] !== y ? (b = {
    opacity: 1,
    ...y
  }, e[6] = y, e[7] = b) : b = e[7];
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
    e[15] !== s || e[16] !== r ? (_ = (M, j) => /* @__PURE__ */ p.jsx(Hb, {
      isActive: j === s,
      onClick: () => r(j),
      "data-overlay": !0,
      ...M
    }, j), e[15] = s, e[16] = r, e[17] = _) : _ = e[17], w = l.map(_), e[11] = s, e[12] = r, e[13] = l, e[14] = w;
  } else
    w = e[14];
  let A;
  return e[18] !== g || e[19] !== h || e[20] !== b || e[21] !== S || e[22] !== w ? (A = /* @__PURE__ */ p.jsx(Fi, {
    className: UE,
    ref: h,
    ...g,
    initial: v,
    animate: b,
    transition: S,
    children: w
  }), e[18] = g, e[19] = h, e[20] = b, e[21] = S, e[22] = w, e[23] = A) : A = e[23], A;
}, XE = (a) => {
  const e = wt.c(43), {
    tabs: l,
    onChange: s,
    defaultIndex: r
  } = a, c = r === void 0 ? 0 : r, {
    isApple: f
  } = el(), [h, y] = E.useState(c);
  let m, g;
  e[0] !== c ? (m = () => {
    y(c);
  }, g = [c], e[0] = c, e[1] = m, e[2] = g) : (m = e[1], g = e[2]), E.useEffect(m, g);
  let v, b;
  e[3] !== l.length ? (v = () => {
    y((at) => Math.min(at, l.length - 1));
  }, b = [l.length], e[3] = l.length, e[4] = v, e[5] = b) : (v = e[4], b = e[5]), E.useEffect(v, b);
  let T;
  e[6] !== h || e[7] !== s ? (T = (at) => {
    at !== h && (y(at), s?.(at));
  }, e[6] = h, e[7] = s, e[8] = T) : T = e[8];
  const S = T, w = E.useRef(null), [A, _] = E.useState(0);
  let M;
  e[9] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (M = (at) => {
    _(at.contentRect.width);
  }, e[9] = M) : M = e[9], G8(w, M);
  const j = l.length === 3 ? 54 : 21;
  let D;
  e[10] !== f || e[11] !== j ? (D = f ? {
    left: j,
    right: j,
    width: `calc(100% - ${j * 2}px)`
  } : {}, e[10] = f, e[11] = j, e[12] = D) : D = e[12];
  const B = D;
  let V;
  e[13] !== j ? (V = {
    top: 21,
    bottom: 21,
    left: j,
    right: j
  }, e[13] = j, e[14] = V) : V = e[14];
  const R = V;
  let k, P;
  e[15] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (k = {
    scale: 1.02
  }, P = {
    scale: {
      type: "spring",
      stiffness: 800,
      damping: 40
    }
  }, e[15] = k, e[16] = P) : (k = e[15], P = e[16]);
  let K;
  e[17] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (K = {
    display: "flex",
    width: "100%",
    position: "relative",
    zIndex: 1
  }, e[17] = K) : K = e[17];
  let it;
  if (e[18] !== h || e[19] !== S || e[20] !== l) {
    let at;
    e[22] !== h || e[23] !== S ? (at = (st, N) => /* @__PURE__ */ p.jsx(Hb, {
      isActive: N === h,
      onClick: () => S(N),
      ...st
    }, N), e[22] = h, e[23] = S, e[24] = at) : at = e[24], it = l.map(at), e[18] = h, e[19] = S, e[20] = l, e[21] = it;
  } else
    it = e[21];
  let et;
  e[25] !== it ? (et = /* @__PURE__ */ p.jsx("div", {
    style: K,
    children: it
  }), e[25] = it, e[26] = et) : et = e[26];
  let I;
  e[27] !== h || e[28] !== S || e[29] !== l ? (I = /* @__PURE__ */ p.jsx(YE, {
    tabs: l,
    activeIndex: h,
    onChange: S
  }), e[27] = h, e[28] = S, e[29] = l, e[30] = I) : I = e[30];
  const J = f ? "visible" : "hidden";
  let nt;
  e[31] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (nt = /* @__PURE__ */ p.jsx(vs, {}), e[31] = nt) : nt = e[31];
  let O;
  e[32] !== R || e[33] !== A ? (O = /* @__PURE__ */ p.jsx(GE, {
    width: A,
    height: 64,
    insets: R
  }), e[32] = R, e[33] = A, e[34] = O) : O = e[34];
  let Y;
  e[35] !== J || e[36] !== O ? (Y = /* @__PURE__ */ p.jsxs(E.Activity, {
    mode: J,
    children: [nt, O]
  }), e[35] = J, e[36] = O, e[37] = Y) : Y = e[37];
  let Q;
  return e[38] !== B || e[39] !== et || e[40] !== I || e[41] !== Y ? (Q = /* @__PURE__ */ p.jsxs(Fi, {
    ref: w,
    className: BE,
    whileTap: k,
    transition: P,
    style: B,
    layout: !0,
    children: [et, I, Y]
  }), e[38] = B, e[39] = et, e[40] = I, e[41] = Y, e[42] = Q) : Q = e[42], Q;
}, Lh = "_badge_dqs9c_1", qb = "_filled_dqs9c_19", $b = "_tinted_dqs9c_24", Gb = "_gray_dqs9c_29", Yb = "_media_dqs9c_34", Xb = "_outlined_dqs9c_39", PE = {
  badge: Lh,
  filled: qb,
  tinted: $b,
  gray: Gb,
  media: Yb,
  outlined: Xb
}, KE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  badge: Lh,
  default: PE,
  filled: qb,
  gray: Gb,
  media: Yb,
  outlined: Xb,
  tinted: $b
}, Symbol.toStringTag, { value: "Module" })), ZE = (a) => {
  const e = wt.c(35);
  let l, s, r, c, f, h, y, m;
  e[0] !== a ? ({
    variant: c,
    textVariant: f,
    circled: h,
    squared: y,
    style: r,
    className: s,
    children: l,
    ...m
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c, e[5] = f, e[6] = h, e[7] = y, e[8] = m) : (l = e[1], s = e[2], r = e[3], c = e[4], f = e[5], h = e[6], y = e[7], m = e[8]);
  const g = c === void 0 ? "filled" : c, v = f === void 0 ? "body" : f, b = h === void 0 ? !1 : h, T = y === void 0 ? !1 : y;
  let S;
  e[9] !== b ? (S = b && {
    "data-circled": !0
  }, e[9] = b, e[10] = S) : S = e[10];
  let w;
  e[11] !== T ? (w = T && {
    "data-squared": !0
  }, e[11] = T, e[12] = w) : w = e[12];
  let A;
  e[13] !== S || e[14] !== w ? (A = {
    ...S,
    ...w
  }, e[13] = S, e[14] = w, e[15] = A) : A = e[15];
  const _ = A, M = r?.background || r?.backgroundColor || null;
  let j = r;
  if (g === "filled") {
    const V = M || "var(--tg-theme-button-color)";
    let R;
    e[16] !== r ? (R = r?.color && {
      "--badge-text-color": r.color
    }, e[16] = r, e[17] = R) : R = e[17];
    let k;
    e[18] !== r || e[19] !== V || e[20] !== R ? (k = {
      ...r,
      "--badge-background": V,
      ...R
    }, e[18] = r, e[19] = V, e[20] = R, e[21] = k) : k = e[21], j = k;
  } else if (g === "tinted") {
    const V = r.color || M || "var(--tg-theme-button-color)";
    let R;
    e[22] !== r.color ? (R = r?.color && {
      "--badge-text-color": r.color
    }, e[22] = r.color, e[23] = R) : R = e[23];
    let k;
    e[24] !== r || e[25] !== R || e[26] !== V ? (k = {
      ...r,
      "--badge-background": V,
      ...R
    }, e[24] = r, e[25] = R, e[26] = V, e[27] = k) : k = e[27], j = k;
  }
  const D = `${Lh} ${KE[g]} ${s || ""}`;
  let B;
  return e[28] !== j || e[29] !== l || e[30] !== _ || e[31] !== D || e[32] !== m || e[33] !== v ? (B = /* @__PURE__ */ p.jsx(lt, {
    variant: v,
    className: D,
    style: j,
    ..._,
    ...m,
    children: l
  }), e[28] = j, e[29] = l, e[30] = _, e[31] = D, e[32] = m, e[33] = v, e[34] = B) : B = e[34], B;
};
Lr["tooltip-surface"];
const al = (a) => {
  const e = wt.c(2), {
    children: l
  } = a;
  let s;
  return e[0] !== l ? (s = /* @__PURE__ */ p.jsx(aE, {
    children: /* @__PURE__ */ p.jsx(LC, {
      children: /* @__PURE__ */ p.jsx(Z8, {
        children: /* @__PURE__ */ p.jsx(kb, {
          children: l
        })
      })
    })
  }), e[0] = l, e[1] = s) : s = e[1], s;
}, QE = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/home" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M11.2921 3.10288C11.7572 2.98914 12.243 2.98915 12.7081 3.10288C13.2396 3.23288 13.709 3.55457 14.2432 3.92027L19.2442 7.33335C19.6706 7.62361 20.0467 7.87916 20.3282 8.22788C20.5749 8.53357 20.7603 8.88486 20.8731 9.26206C21.0018 9.69232 21.0007 10.1491 21.0001 10.6673V16.9613C21.0001 17.4921 21.0004 17.9503 20.9698 18.3275C20.9375 18.7256 20.8656 19.1213 20.6729 19.5023C20.3853 20.0709 19.9269 20.5339 19.3624 20.8236C18.9841 21.0177 18.5907 21.0889 18.1954 21.1214C17.8209 21.1523 17.366 21.1527 16.8389 21.1527H7.16121C6.63427 21.1527 6.17922 21.1523 5.80476 21.1214C5.40975 21.0889 5.01682 21.0175 4.63875 20.8236C4.07426 20.5339 3.61484 20.0709 3.32722 19.5023C3.13458 19.1213 3.06265 18.7255 3.03035 18.3275C2.99975 17.9503 3.00006 17.4921 3.00008 16.9613V10.6673C2.99948 10.1491 2.99933 9.69232 3.12801 9.26206C3.24091 8.8848 3.42612 8.53359 3.67293 8.22788C3.95441 7.87922 4.32962 7.62355 4.75593 7.33335L9.75691 3.92027C10.2911 3.55462 10.7606 3.23292 11.2921 3.10288ZM10.5001 12.0882C9.94779 12.0882 9.50008 12.5359 9.50008 13.0882V16.1244C9.50008 16.6767 9.94779 17.1244 10.5001 17.1244H13.5001C14.0524 17.1244 14.5001 16.6767 14.5001 16.1244V13.0882C14.5001 12.5359 14.0524 12.0882 13.5001 12.0882H10.5001Z", fill: "currentColor" }))), FE = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/calendar" }, /* @__PURE__ */ E.createElement("path", { id: "Union", d: "M19.6748 10.7998C19.9782 10.7998 20.1303 10.7997 20.2441 10.8633C20.3246 10.9083 20.3915 10.9752 20.4365 11.0557C20.5001 11.1695 20.5 11.3216 20.5 11.625V13.9004C20.5 16.329 20.5 17.5435 19.9902 18.4541C19.6298 19.0977 19.0977 19.6298 18.4541 19.9902C17.5435 20.5 16.329 20.5 13.9004 20.5H10.0996C7.67103 20.5 6.4565 20.5 5.5459 19.9902C4.90227 19.6298 4.37022 19.0977 4.00977 18.4541C3.5 17.5435 3.5 16.329 3.5 13.9004V11.625C3.5 11.3216 3.49986 11.1695 3.56348 11.0557C3.60853 10.9752 3.67541 10.9083 3.75586 10.8633C3.86967 10.7997 4.02177 10.7998 4.3252 10.7998H19.6748ZM16 1.5C16.5523 1.5 17 1.94772 17 2.5V3.58984C17.5949 3.66023 18.0539 3.78571 18.4541 4.00977C19.0977 4.37022 19.6298 4.90227 19.9902 5.5459C20.3615 6.20916 20.4605 7.03367 20.4873 8.37109C20.4933 8.67145 20.4965 8.8223 20.4336 8.93848C20.3896 9.01965 20.3215 9.08906 20.2412 9.13477C20.1263 9.20009 19.9733 9.2002 19.668 9.2002H4.33203C4.02672 9.2002 3.87368 9.20009 3.75879 9.13477C3.67854 9.08906 3.61044 9.01965 3.56641 8.93848C3.50351 8.8223 3.50669 8.67145 3.5127 8.37109C3.53947 7.03367 3.63847 6.20916 4.00977 5.5459C4.37022 4.90227 4.90227 4.37022 5.5459 4.00977C5.94613 3.78571 6.40508 3.66023 7 3.58984V2.5C7 1.94772 7.44772 1.5 8 1.5C8.55228 1.5 9 1.94772 9 2.5V3.50488C9.33664 3.50264 9.70183 3.5 10.0996 3.5H13.9004C14.2982 3.5 14.6634 3.50264 15 3.50488V2.5C15 1.94772 15.4477 1.5 16 1.5Z", fill: "#3D3C3A" }))), Ur = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "#3D3C3A" }), /* @__PURE__ */ E.createElement("path", { id: "Vector 234255039", d: "M9 12.439L11.1818 14.8564L13.0909 11.8347L14.0455 10.3238L14.5227 9.56836", stroke: "white", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }))), Ed = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "#3D3C3A" }), /* @__PURE__ */ E.createElement("path", { id: "Vector 234255931", d: "M12 12.5V8", stroke: "white", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ E.createElement("circle", { id: "Ellipse 253668", cx: 1, cy: 1, r: 1, transform: "matrix(1 0 0 -1 11 17)", fill: "white" }))), JE = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/heart" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", fillRule: "evenodd", clipRule: "evenodd", d: "M12 6.34213C13.1016 4.86137 14.8294 3.86287 16.9203 4.05233C19.9439 4.3263 22.0001 6.73448 22.0001 9.87524C22.0001 12.7458 20.4285 15.1633 18.5183 16.9571C16.6026 18.756 14.2269 20.0464 12.319 20.6691C12.1117 20.7368 11.8884 20.7368 11.6811 20.6691C9.77325 20.0464 7.39752 18.756 5.48179 16.9571C3.57156 15.1633 2 12.7458 2 9.87524C2 6.73448 4.05617 4.3263 7.07975 4.05233C9.17073 3.86287 10.8984 4.86142 12 6.34213Z", fill: "currentColor" }))), WE = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/cup" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", fillRule: "evenodd", clipRule: "evenodd", d: "M12.9992 3.02148C17.9698 3.02148 21.9992 5.27629 21.9992 8.05772C21.9992 12.0867 20.9992 21.1519 12.9992 21.1519C9.14215 21.1518 6.91501 19.043 5.63991 16.4088L4.98464 16.5417C2.90427 16.9606 0.88686 15.5799 0.507098 13.4776C0.136993 11.4266 1.46695 9.45421 3.49635 9.04529L4.01491 8.94004C4.0039 8.6258 3.99928 8.33024 3.99928 8.05772C3.99928 5.27633 8.02884 3.02156 12.9992 3.02148ZM3.88796 11.0204C2.92844 11.2139 2.30006 12.1467 2.47487 13.1166C2.65441 14.111 3.60814 14.7636 4.59206 14.5654L4.89284 14.5045C4.52286 13.3122 4.29975 12.0906 4.16823 10.9634L3.88796 11.0204ZM12.9992 5.03598C9.13341 5.03604 5.99928 6.38889 5.99928 8.05772C5.99928 9.72654 9.13341 11.0794 12.9992 11.0795C16.8652 11.0795 19.9992 9.72657 19.9992 8.05772C19.9992 6.38886 16.8652 5.03598 12.9992 5.03598Z", fill: "currentColor" }))), IE = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ E.createElement("path", { id: "Vector 234255937", d: "M3.52765 9.90413C0.911528 15.9537 3.96635 21.1957 8.35342 22.5511C8.84167 22.702 9.19067 22.0789 8.92321 21.6434C8.19965 20.4654 7.47887 18.5753 8.56051 16.6478C8.64224 16.5022 8.85072 16.5146 8.93197 16.6605C9.95802 18.5031 10.9317 18.5031 10.9317 18.5031C10.9317 18.5031 8.86679 14.8896 11.7788 12.1893C11.8911 12.0851 12.0723 12.1349 12.1315 12.2762C13.3539 15.1909 17.8248 17.3143 14.8582 21.9344C14.6119 22.3181 14.8717 22.8388 15.3226 22.7712C20.4424 22.0038 22.208 16.0069 20.1757 11.4342C18.0862 6.73288 13.4876 7.04975 11.6828 2.26117C11.5637 1.9453 11.198 1.78379 10.9122 1.96333C7.99596 3.79495 6.34996 7.94875 7.37329 13.0655C6.01592 12.7262 5.08207 11.1162 4.57178 9.95361C4.37654 9.50881 3.72046 9.45827 3.52765 9.90413Z", fill: "currentColor" }))), Pb = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/cross" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M16.2929 6.06242C16.6834 5.6719 17.3164 5.67191 17.707 6.06242C18.0975 6.45295 18.0975 7.08596 17.707 7.47649L13.414 11.7695L17.707 16.0624C18.0975 16.4529 18.0975 17.086 17.707 17.4765C17.3164 17.867 16.6834 17.867 16.2929 17.4765L11.9999 13.1835L7.70696 17.4765C7.31643 17.867 6.68342 17.867 6.29289 17.4765C5.90238 17.086 5.90237 16.4529 6.29289 16.0624L10.5859 11.7695L6.29289 7.47649C5.90237 7.08596 5.90237 6.45295 6.29289 6.06242C6.68342 5.6719 7.31643 5.6719 7.70696 6.06242L11.9999 10.3554L16.2929 6.06242Z", fill: "#3D3C3A" }))), Kb = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "currentColor" }), /* @__PURE__ */ E.createElement("path", { id: "Vector 234255931", d: "M12 12V16", stroke: "var(--background)", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ E.createElement("circle", { id: "Ellipse 253668", cx: 12, cy: 8.5, r: 1, fill: "var(--background)" }))), kr = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/plus" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", transform: "translate(5 4.769)", d: "M6 13C6 13 6 8 6 8C6 8 1 8 1 8C0.448 8 0 7.552 0 7C0 6.448 0.448 6 1 6C1 6 6 6 6 6C6 6 6 1 6 1C6 0.448 6.448 0 7 0C7.552 0 8 0.448 8 1C8 1 8 6 8 6C8 6 13 6 13 6C13.552 6 14 6.448 14 7C14 7.552 13.552 8 13 8C13 8 8 8 8 8C8 8 8 13 8 13C8 13.552 7.552 14 7 14C6.448 14 6 13.552 6 13Z", fill: "currentColor" }))), tA = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("path", { d: "M16.5791 4.53223C18.0851 4.53223 18.8049 4.65337 19.5361 5.04297C20.1593 5.3751 20.654 5.86826 20.9873 6.48926C21.3783 7.21793 21.5 7.93502 21.5 9.43555V14.7383C21.5 16.2388 21.3783 16.9559 20.9873 17.6846C20.654 18.3056 20.1593 18.7987 19.5361 19.1309C18.8049 19.5205 18.0851 19.6416 16.5791 19.6416H7.4209C5.91493 19.6416 5.19509 19.5205 4.46387 19.1309C3.84066 18.7987 3.34603 18.3056 3.0127 17.6846C2.62169 16.9559 2.50002 16.2388 2.5 14.7383V9.43555C2.50003 7.93502 2.62167 7.21793 3.0127 6.48926C3.34603 5.86826 3.84066 5.3751 4.46387 5.04297C5.19509 4.65337 5.91494 4.53223 7.4209 4.53223H16.5791ZM10.1436 9.44043C9.76724 8.73388 8.75424 8.73388 8.37793 9.44043L5.78223 14.3125C5.42805 14.9784 5.91082 15.7829 6.66504 15.7832H17.0791C17.8878 15.7831 18.3617 14.8726 17.8984 14.21L16.2656 11.877C15.8829 11.3303 15.0819 11.3051 14.665 11.8262L12.998 13.9092C12.8634 14.0774 12.6005 14.0532 12.499 13.8633L10.1436 9.44043Z", fill: "currentColor" })), eA = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("path", { d: "M14.0996 3.5C16.3398 3.5 17.4608 3.49957 18.3164 3.93555C19.0689 4.31902 19.681 4.93109 20.0645 5.68359C20.5004 6.53924 20.5 7.66018 20.5 9.90039V14.0996C20.5 16.3398 20.5004 17.4608 20.0645 18.3164C19.681 19.0689 19.0689 19.681 18.3164 20.0645C17.4608 20.5004 16.3398 20.5 14.0996 20.5H9.90039C7.66018 20.5 6.53924 20.5004 5.68359 20.0645C4.93109 19.681 4.31902 19.0689 3.93555 18.3164C3.49957 17.4608 3.5 16.3398 3.5 14.0996V9.90039C3.5 7.66018 3.49957 6.53924 3.93555 5.68359C4.31902 4.93109 4.93109 4.31902 5.68359 3.93555C6.53924 3.49957 7.66018 3.5 9.90039 3.5H14.0996ZM9.5 8.2002C9.05817 8.2002 8.7002 8.55817 8.7002 9C8.7002 9.44183 9.05817 9.7998 9.5 9.7998H11.2002V15.5C11.2002 15.9418 11.5582 16.2998 12 16.2998C12.4418 16.2998 12.7998 15.9418 12.7998 15.5V9.7998H14.5C14.9418 9.7998 15.2998 9.44183 15.2998 9C15.2998 8.55817 14.9418 8.2002 14.5 8.2002H9.5Z", fill: "currentColor" })), nA = {
  success: Ur,
  error: Ed,
  warning: Ed,
  info: Kb
};
let jr = null, Hg = !1;
const Ad = [];
function aA() {
  const a = NE();
  return E.useEffect(() => (jr = a.show, Ad.length && Ad.splice(0).forEach((e) => a.show(e)), () => {
    jr = null;
  })), null;
}
function iA() {
  if (Hg || typeof document > "u") return;
  Hg = !0;
  const a = document.createElement("div");
  a.setAttribute("data-aiwa-toast-host", ""), document.body.appendChild(a), Ui.createRoot(a).render(
    /* @__PURE__ */ p.jsx(kb, { children: /* @__PURE__ */ p.jsx(aA, {}) })
  );
}
function Zb(a, e = {}) {
  const l = typeof a == "string" ? { title: a, ...e } : { ...a };
  if (l.type && !l.icon) {
    const s = nA[l.type];
    s && (l.icon = /* @__PURE__ */ p.jsx(s, {}));
  }
  return iA(), jr ? jr(l) : (Ad.push(l), null);
}
function lA() {
  typeof window < "u" && (window.aiwaToast = Zb);
}
const pn = (a, ...e) => {
  const l = window[a];
  typeof l == "function" && l(...e);
}, ae = (a, ...e) => {
  const l = window[a];
  return typeof l == "function" ? l(...e) : null;
}, Pt = (a, e = {}) => {
  const l = ae("aiwaApi", a, e);
  return l && typeof l.then == "function" ? l : Promise.reject(new Error("API bridge is unavailable"));
}, zt = (a, e = {}) => Zb(a, e), jd = (a) => `${Math.round(Number(a) || 0).toLocaleString("ru-RU")} ккал`, Qb = (a) => pn("track", a), sA = () => {
  const a = window.Telegram?.WebApp;
  a?.close && a.close();
}, Ji = async ({ nudge: a = !0, topic: e = "" } = {}) => {
  a && await Promise.race([
    Pt("/api/nudge", e ? { topic: e } : {}).catch(() => null),
    new Promise((c) => setTimeout(c, 2e3))
  ]);
  const l = window.Telegram?.WebApp, s = ae("aiwaData")?.bot_username, r = typeof l?.openTelegramLink == "function" && (typeof l.isVersionAtLeast != "function" || l.isVersionAtLeast("6.1"));
  s && r && l.openTelegramLink(`https://t.me/${s}`), sA();
}, oA = () => {
  const a = window.Telegram?.WebApp;
  return typeof a?.showPopup != "function" ? !1 : typeof a.isVersionAtLeast != "function" || a.isVersionAtLeast("6.2");
}, ce = (a, e) => ({
  "aria-label": a,
  onClick: e,
  onKeyDown: (l) => {
    (l.key === "Enter" || l.key === " ") && (l.preventDefault(), e());
  },
  role: "button",
  tabIndex: 0
});
function Bh({ title: a, size: e = "regular", ...l }) {
  return e === "large" ? /* @__PURE__ */ p.jsx("div", { className: "aiwa-panel-header is-large", children: /* @__PURE__ */ p.jsx(lt, { as: "h1", variant: "title1", weight: "bold", children: a }) }) : /* @__PURE__ */ p.jsx("div", { className: "aiwa-panel-header", children: /* @__PURE__ */ p.jsx(KC, { ...l, children: a }) });
}
const qg = (a, e = "") => [
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
function Fb({
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
  markVariant: y = "radio"
}) {
  const m = f && y === "heart", g = [r ? `is-${r}` : "", f ? "is-marking" : ""].filter(Boolean).join(" "), v = f ? { iso: a.iso, today: a.today, muted: a.muted } : a, b = /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    f ? null : /* @__PURE__ */ p.jsx("span", { className: "aiwa-date-cell-ring", "aria-hidden": "true" }),
    /* @__PURE__ */ p.jsx(lt, { className: "aiwa-date-cell-number", variant: "body", weight: "regular", children: a.date }),
    f ? /* @__PURE__ */ p.jsx(
      "span",
      {
        className: `aiwa-date-cell-radio${m ? " is-heart" : ""}${h ? " is-checked" : ""}`,
        "aria-hidden": "true",
        children: m ? /* @__PURE__ */ p.jsx(JE, {}) : h ? /* @__PURE__ */ p.jsx(Ur, {}) : null
      }
    ) : null,
    !f && a.phase && !a.actualPeriod && !a.predictedPeriod ? /* @__PURE__ */ p.jsx("span", { className: "aiwa-date-cell-dot", "aria-hidden": "true" }) : null,
    !f && a.intimacy ? /* @__PURE__ */ p.jsx("span", { className: "aiwa-date-cell-heart", "aria-hidden": "true", children: "♥" }) : null,
    s && a.today && !f ? /* @__PURE__ */ p.jsx(lt, { className: "aiwa-date-cell-today", variant: "caption1", weight: "regular", children: "Сегодня" }) : null
  ] });
  if (!e)
    return /* @__PURE__ */ p.jsx("div", { className: qg(v, g), "data-iso": a.iso, "aria-label": `${a.label || "День"}, ${a.date}`, children: b });
  const T = l || a.monthLabel || "", S = T ? `${a.date} ${T}` : `${a.label || "День"}, ${a.date}`, w = f ? h ? ", отмечено" : "" : `${a.actualPeriod ? ", отмечены месячные" : ""}${a.predictedPeriod ? ", прогноз месячных" : ""}${a.intimacy ? ", отмечена близость" : ""}`;
  return /* @__PURE__ */ p.jsx(
    Te,
    {
      as: "button",
      type: "button",
      mode: "opacity",
      disabled: a.disabled,
      "aria-label": `${S}${w}`,
      "aria-pressed": f ? h : typeof a.selected == "boolean" ? a.selected : void 0,
      className: qg(v, ["aiwa-calendar-day", g].filter(Boolean).join(" ")),
      "data-iso": a.iso,
      onClick: () => c ? c(a) : pn("aiwaCalendarDay", a.iso),
      children: b
    }
  );
}
function Jb(a, ...e) {
  E.useEffect(() => {
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
const rA = 140;
function $g(a, e) {
  const l = a.scrollWidth - a.clientWidth, s = e.offsetLeft - (a.clientWidth - e.offsetWidth) / 2;
  return Math.min(l, Math.max(0, s));
}
function uA(a) {
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
function Vh({ days: a, selectedIso: e = "", onSelect: l = null }) {
  const s = typeof l == "function", r = E.useRef(null), c = E.useRef(null);
  c.current = { days: a, selectedIso: e, onSelect: l };
  const f = E.useRef("");
  return Jb(r, a?.length), E.useLayoutEffect(() => {
    const h = r.current;
    if (!h) return;
    const y = f.current;
    if (f.current = "", y && y === e || h.scrollWidth - h.clientWidth <= 0) return;
    const g = h.querySelector(e ? `[data-iso="${e}"]` : ".is-today");
    g && (h.scrollLeft = $g(h, g));
  }, [e, a?.length]), E.useEffect(() => {
    const h = r.current;
    if (!h || !s) return;
    let y = 0, m = !1, g = !1;
    const v = () => {
      if (y = 0, m || !g) return;
      g = !1;
      const _ = uA(h);
      if (!_) return;
      const { days: M, selectedIso: j, onSelect: D } = c.current, B = M?.find((R) => R.iso === _.dataset.iso);
      if (!B) return;
      B.iso !== j && (f.current = B.iso, D(B));
      const V = $g(h, _);
      if (Math.abs(V - h.scrollLeft) > 0.5) {
        const R = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        h.scrollTo({ left: V, behavior: R ? "auto" : "smooth" });
      }
    }, b = () => {
      y && clearTimeout(y), y = setTimeout(v, rA);
    }, T = () => {
      m && (g = !0), b();
    }, S = () => {
      m = !0;
    }, w = () => {
      m = !1, b();
    }, A = () => {
      g = !0;
    };
    return h.addEventListener("scroll", T, { passive: !0 }), h.addEventListener("touchstart", S, { passive: !0 }), h.addEventListener("touchend", w, { passive: !0 }), h.addEventListener("touchcancel", w, { passive: !0 }), h.addEventListener("wheel", A, { passive: !0 }), () => {
      y && clearTimeout(y), h.removeEventListener("scroll", T), h.removeEventListener("touchstart", S), h.removeEventListener("touchend", w), h.removeEventListener("touchcancel", w), h.removeEventListener("wheel", A);
    };
  }, [s]), /* @__PURE__ */ p.jsx(
    "div",
    {
      className: "aiwa-week",
      role: s ? "group" : void 0,
      "data-selection": e ? "true" : void 0,
      "aria-label": s ? "Выбор дня" : "Текущая неделя",
      ref: r,
      children: a.map((h) => /* @__PURE__ */ p.jsx(
        Fb,
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
const Hr = [
  ["Боль", [["cramps", "Спазмы"], ["head", "Голова"], ["breast", "Грудь"]]],
  ["Настроение", [["irrit", "Раздражительность"], ["anx", "Тревога"], ["low", "Апатия"]]],
  ["Тело", [["tired", "Усталость"], ["bloat", "Вздутие"], ["sweet", "Тянет на сладкое"]]],
  ["Кожа и сон", [["skin", "Высыпания"], ["insomnia", "Плохой сон"]]]
], Md = {
  // One line each at the bar width: a wrapped hint pushes the bar over the grid.
  period: { label: "Месячные", hint: "нажми на день, чтобы отметить месячные", checked: (a) => a.actualPeriod },
  symptoms: { label: "Симптомы", hint: "нажми на день, чтобы записать симптомы", checked: (a) => a.logged },
  intimacy: { label: "Близость", hint: "нажми на день, чтобы отметить близость", checked: (a) => a.intimacy }
}, cA = (a) => a.map((e) => ({ value: e, label: Md[e].label })), fA = [
  { label: "Месячные", variant: "tinted", token: "--aiwa-phase-menstrual" },
  { label: "Прогноз", variant: "outlined", token: "--aiwa-phase-menstrual" },
  { label: "Овуляция", variant: "tinted", token: "--aiwa-phase-ovulation" },
  { label: "Фолликулярная", variant: "tinted", token: "--aiwa-phase-follicular" },
  { label: "Лютеиновая", variant: "tinted", token: "--aiwa-phase-luteal" },
  { label: "Близость", variant: "tinted", token: "--aiwa-intimacy" }
], Wb = [[1, "Низкая"], [2, "Средняя"], [3, "Высокая"]], Ib = [[1, "Плохое"], [2, "Нормальное"], [3, "Хорошее"]], dA = "/assets/food/pancakes.png", tx = [
  { value: "breakfast", label: "Завтрак" },
  { value: "lunch", label: "Обед" },
  { value: "snack", label: "Перекус" },
  { value: "dinner", label: "Ужин" }
], hA = (a) => ({
  title: a?.title || "",
  kcal: String(a?.kcal ?? ""),
  grams: String(a?.grams ?? ""),
  protein: String(a?.protein ?? ""),
  fat: String(a?.fat ?? ""),
  carbs: String(a?.carbs ?? ""),
  slot: a?.slot || "snack"
}), mA = ["Силовая", "Кардио", "Йога", "Ходьба", "Плавание", "Своё"], Ya = {
  Ноги: ["Присед", "Жим ногами", "Выпады", "Болгарские", "Румынская тяга", "Разгибания", "Сгибания", "Икры"],
  Спина: ["Вертикальная тяга", "Горизонтальная тяга", "Тяга в наклоне", "Становая", "Подтягивания", "Гиперэкстензия"],
  Грудь: ["Жим лёжа", "Жим гантелей", "Жим в наклоне", "Сведения", "Отжимания"],
  Плечи: ["Жим стоя", "Махи в стороны", "Махи в наклоне", "Протяжка"],
  Ягодицы: ["Ягодичный мост", "Отведение бедра", "Мах ногой", "Плие-присед"],
  Руки: ["Бицепс", "Молоток", "Разгибания трицепс", "Французский жим"],
  Кор: ["Планка", "Скручивания", "Подъём ног", "Русский твист"]
}, pA = {
  Силовая: [],
  Кардио: ["Бег", "Велотренажёр", "Эллипс", "Гребля", "Скакалка"],
  Йога: ["Виньяса", "Хатха", "Растяжка", "Пилатес", "Дыхание"],
  Ходьба: ["Прогулка", "Скандинавская", "Быстрая ходьба"],
  Плавание: ["Кроль", "Брасс", "На спине"],
  Своё: []
}, yA = [
  { value: "cycle", label: "Регулярный цикл" },
  { value: "irregular", label: "Нерегулярный" },
  { value: "preg", label: "Беременность" },
  { value: "meno", label: "Менопауза" },
  { value: "none", label: "Нет месячных" }
], Gg = "custom:";
function gA(a) {
  const e = a?.length ? a.flatMap(([, l]) => l) : Hr.flatMap(([, l]) => l.flat());
  return new Map(e);
}
function vA({ title: a = "Сегодня", checkin: e, symptomGroups: l, onSelect: s }) {
  const r = e?.symptoms ?? [], c = E.useRef(null);
  if (Jb(c, r.length), !r.length) return null;
  const f = gA(l), h = s ?? (() => pn("openHomePanel", "journal"));
  return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-today", children: [
    /* @__PURE__ */ p.jsx(lt, { className: "aiwa-today-title", variant: "body", weight: "semibold", children: a }),
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-today-chips", role: "group", "aria-label": a, ref: c, children: r.map((y) => {
      const m = y.startsWith(Gg) ? y.slice(Gg.length) : f.get(y) ?? y;
      return /* @__PURE__ */ p.jsx(
        Te,
        {
          as: "button",
          type: "button",
          mode: "opacity",
          className: "aiwa-today-chip",
          onClick: () => h(y),
          title: m,
          children: /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "regular", children: m })
        },
        y
      );
    }) })
  ] });
}
const Yg = 1e3 / 40, bA = 5e3, ex = (a, e) => Array.from(
  { length: e },
  (l, s) => `/assets/${a}/frame-${String(s).padStart(3, "0")}.png`
), xA = ex("aiwa-sequence", 182), Uh = ex("aiwa-card-sequence", 193), qf = /* @__PURE__ */ new Map(), SA = (a) => (qf.has(a) || qf.set(
  a,
  Promise.all(a.map((e) => new Promise((l) => {
    const s = new Image();
    s.onload = l, s.onerror = l, s.src = e;
  })))
), qf.get(a));
function kh({ size: a, frames: e = xA, pauseMs: l = bA }) {
  const [s, r] = E.useState(0);
  return E.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let f = !1, h = 0, y = 0;
    const m = () => {
      let g = 0;
      r(g), h = window.setInterval(() => {
        g += 1, r(g), g === e.length - 1 && (window.clearInterval(h), y = window.setTimeout(m, l || Yg));
      }, Yg);
    };
    return SA(e).then(() => {
      f || m();
    }), () => {
      f = !0, window.clearInterval(h), window.clearTimeout(y);
    };
  }, [e, l]), /* @__PURE__ */ p.jsx(
    "span",
    {
      className: "aiwa-sequence",
      style: { "--aiwa-sequence-size": `${a}px` },
      "data-aiwa-sequence": "true",
      "data-sequence": e === Uh ? "card" : "default",
      "data-pause-ms": l,
      "data-frame": s,
      "aria-hidden": "true",
      children: /* @__PURE__ */ p.jsx("img", { src: e[s], alt: "", draggable: "false" })
    }
  );
}
function wA() {
  return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-paper-ai-heading", children: [
    /* @__PURE__ */ p.jsx(kh, { size: 58, frames: Uh, pauseMs: 0 }),
    /* @__PURE__ */ p.jsx("div", { children: /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "semibold", children: "Айва AI" }) })
  ] });
}
function TA(a) {
  return /* @__PURE__ */ p.jsx(Pn, { ...a, "data-aiwa-cell": "true" });
}
const gt = Object.assign(TA, {
  Start: Pn.Start,
  End: Pn.End,
  Part: Pn.Part,
  Text: Pn.Text,
  Editable: Pn.Editable,
  Switch: Pn.Switch
});
function qr({
  message: a,
  detail: e,
  onDiscuss: l,
  className: s = ""
}) {
  return /* @__PURE__ */ p.jsx(pt.Item, { className: `aiwa-insight-section ${s}`.trim(), children: /* @__PURE__ */ p.jsx(gt, { "data-aiwa-insight-cell": "true", tappable: !1, children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-insight-content", children: [
    /* @__PURE__ */ p.jsx(wA, {}),
    /* @__PURE__ */ p.jsx(lt, { className: "aiwa-insight-message", variant: "body", weight: "regular", children: a }),
    e ? /* @__PURE__ */ p.jsx(lt, { className: "aiwa-insight-detail", variant: "body", weight: "regular", children: e }) : null,
    l ? /* @__PURE__ */ p.jsx(
      Ft,
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
function CA({ aiText: a }) {
  return /* @__PURE__ */ p.jsx(
    qr,
    {
      message: a,
      onDiscuss: () => Ji()
    }
  );
}
function EA({ delay: a }) {
  return a ? /* @__PURE__ */ p.jsxs(pt.Item, { header: a.title, children: [
    /* @__PURE__ */ p.jsx(gt, { tappable: !1, children: /* @__PURE__ */ p.jsx(gt.Text, { title: a.message, description: a.hint }) }),
    a.canSwitchToPregnancy ? /* @__PURE__ */ p.jsx(gt, { tappable: !1, children: /* @__PURE__ */ p.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ p.jsx(
      Ft,
      {
        variant: "filled",
        label: "Перейти в режим беременности",
        isFill: !0,
        ...ce("Перейти в режим беременности", () => pn("switchPreg"))
      }
    ) }) }) : null
  ] }) : null;
}
function AA({ ok: a }) {
  const e = a ? Ur : Ed;
  return /* @__PURE__ */ p.jsx("span", { className: a ? "aiwa-status is-ok" : "aiwa-status is-alert", "aria-label": a ? "В пределах нормы" : "Требует внимания", children: /* @__PURE__ */ p.jsx(e, {}) });
}
function jA({ label: a, value: e, ok: l }) {
  return /* @__PURE__ */ p.jsx(gt, { "data-aiwa-metric-cell": "true", tappable: !1, end: /* @__PURE__ */ p.jsx(AA, { ok: l }), children: /* @__PURE__ */ p.jsx(gt.Text, { title: a, description: e }) });
}
function MA({ metrics: a, title: e = "Статистика" }) {
  return a?.length ? /* @__PURE__ */ p.jsx(pt.Item, { header: e, children: a.map((l) => /* @__PURE__ */ p.jsx(jA, { ...l }, l.label)) }) : null;
}
const _A = E.lazy(() => import("./AiwaWebUiChart-DRjR64GZ.js").then((a) => ({
  default: a.AiwaWebUiChart
})));
function RA() {
  return /* @__PURE__ */ p.jsx("div", { className: "aiwa-area-chart-state is-loading", role: "status", "aria-label": "График загружается", children: /* @__PURE__ */ p.jsx("span", { className: "aiwa-area-chart-skeleton", "aria-hidden": "true" }) });
}
function DA({
  data: a,
  series: e,
  xKey: l,
  band: s = null,
  loading: r = !1,
  title: c = "Динамика цикла",
  emptyText: f = "Добавь ещё один завершённый цикл — здесь появится график."
}) {
  return /* @__PURE__ */ p.jsx(pt.Item, { header: c, children: /* @__PURE__ */ p.jsx(E.Suspense, { fallback: /* @__PURE__ */ p.jsx(RA, {}), children: /* @__PURE__ */ p.jsx(
    _A,
    {
      data: a,
      series: e,
      xKey: l,
      band: s,
      loading: r,
      ariaLabel: c,
      emptyText: f
    }
  ) }) });
}
function NA({
  history: a,
  title: e = "История цикла",
  emptyTitle: l = "История пока пуста",
  emptyDescription: s = "Она появится после первой сохранённой менструации."
}) {
  const [r, c] = E.useState(!1), f = a || [], h = r ? f : f.slice(0, 3);
  return /* @__PURE__ */ p.jsxs(pt.Item, { header: e, children: [
    h.length ? h.map((y) => /* @__PURE__ */ p.jsx(gt, { "data-aiwa-history-cell": "true", tappable: !1, children: /* @__PURE__ */ p.jsx(gt.Text, { title: y.title, description: y.description }) }, y.key)) : /* @__PURE__ */ p.jsx(gt, { "data-aiwa-history-cell": "true", tappable: !1, children: /* @__PURE__ */ p.jsx(gt.Text, { title: l, description: s }) }),
    f.length > 3 ? /* @__PURE__ */ p.jsx(
      gt,
      {
        as: "button",
        type: "button",
        onClick: () => c((y) => !y),
        end: /* @__PURE__ */ p.jsx(gt.Part, { type: "Chevron" }),
        children: /* @__PURE__ */ p.jsx(gt.Text, { type: "Accent", title: r ? "Свернуть" : "Показать все" })
      }
    ) : null
  ] });
}
const OA = Object.fromEntries(
  Hr.flatMap(([, a]) => a)
), zA = { 1: "низкая энергия", 2: "средняя энергия", 3: "высокая энергия" }, LA = { 1: "плохое настроение", 2: "нормальное настроение", 3: "хорошее настроение" }, BA = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }), VA = (a) => {
  const l = OA[a] || String(a).split(":").pop().replace(/_/g, " ").trim();
  return l ? l[0].toUpperCase() + l.slice(1) : "";
}, UA = (a) => [
  ...(a.symptoms || []).map(VA),
  zA[a.energy],
  LA[a.mood]
].filter(Boolean).map((l) => l[0].toUpperCase() + l.slice(1)).join(" • ") || "Без деталей", kA = (a) => {
  const e = /* @__PURE__ */ new Date(`${a}T12:00:00`);
  return Number.isNaN(e.getTime()) ? a : BA.format(e);
};
function HA() {
  const [a, e] = E.useState(null), [l, s] = E.useState(!1), [r, c] = E.useState(!1);
  E.useEffect(() => {
    Pt("/api/log_history", {}).then((y) => e(y?.items || [])).catch(() => e([]));
  }, []);
  const f = async () => {
    if (!r) {
      c(!0);
      try {
        const y = await Pt("/api/report", { period: "all" }).catch(() => null);
        y?.ok ? zt("Выписка отправлена в чат бота", { type: "success" }) : zt(y?.text || "Выписка временно недоступна", { type: "error" });
      } finally {
        c(!1);
      }
    }
  };
  if (!a) return null;
  const h = l ? a : a.slice(0, 3);
  return /* @__PURE__ */ p.jsxs(pt.Item, { header: "Журнал симптомов", children: [
    h.length ? h.map((y) => /* @__PURE__ */ p.jsx(gt, { tappable: !1, children: /* @__PURE__ */ p.jsx(gt.Text, { title: kA(y.d), description: UA(y) }) }, y.d)) : /* @__PURE__ */ p.jsx(gt, { tappable: !1, children: /* @__PURE__ */ p.jsx(gt.Text, { title: "Записей пока нет", description: "Отмечай самочувствие в журнале — здесь появится история." }) }),
    a.length > 3 ? /* @__PURE__ */ p.jsx(
      gt,
      {
        as: "button",
        type: "button",
        onClick: () => s((y) => !y),
        end: /* @__PURE__ */ p.jsx(gt.Part, { type: "Chevron" }),
        children: /* @__PURE__ */ p.jsx(gt.Text, { type: "Accent", title: l ? "Свернуть" : "Показать все" })
      }
    ) : null,
    /* @__PURE__ */ p.jsx(gt, { tappable: !1, children: /* @__PURE__ */ p.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ p.jsx(
      Ft,
      {
        variant: "filled",
        label: r ? "Собираю…" : "Сформировать выписку",
        isFill: !0,
        disabled: r,
        ...ce("Сформировать выписку", f)
      }
    ) }) })
  ] });
}
const Pi = [];
let Xg = !1;
const nx = () => typeof window < "u" ? window.Telegram?.WebApp?.BackButton : null, qA = () => Pi[Pi.length - 1]?.(), Pg = () => {
  const a = nx();
  a && (Pi.length ? a.show?.() : a.hide?.());
}, $A = (a) => {
  const e = nx();
  return e && !Xg && (e.onClick?.(qA), Xg = !0), Pi.push(a), Pg(), () => {
    const l = Pi.lastIndexOf(a);
    l !== -1 && Pi.splice(l, 1), Pg();
  };
};
function ax(a, e) {
  const l = E.useRef(e);
  l.current = e, E.useEffect(() => {
    if (a)
      return $A(() => l.current?.());
  }, [a]);
}
function yn({ isOpen: a, onClose: e, onBack: l, children: s, ...r }) {
  return ax(a, l || e), E.useEffect(() => {
    if (!a) return;
    const c = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.body.style.overflow = c;
    };
  }, [a]), a ? zr.createPortal(
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-page", role: "dialog", "aria-modal": "true", ...r, children: s }),
    document.body
  ) : null;
}
function $r({
  label: a,
  active: e = !1,
  onClick: l,
  isFill: s = !1,
  end: r = null,
  className: c = "",
  ...f
}) {
  const h = r ? /* @__PURE__ */ p.jsxs("span", { className: "aiwa-chip-content", children: [
    /* @__PURE__ */ p.jsx("span", { className: "aiwa-chip-label", children: a }),
    r
  ] }) : a;
  return /* @__PURE__ */ p.jsx(
    Te,
    {
      as: "button",
      type: "button",
      mode: "opacity",
      className: `aiwa-chip${s ? " is-fill" : ""}${c ? ` ${c}` : ""}`,
      "aria-pressed": e,
      onClick: l,
      ...f,
      children: /* @__PURE__ */ p.jsx(Ft, { variant: e ? "tinted" : "gray", label: h, isFill: s })
    }
  );
}
function _d({ label: a, active: e, onChange: l, variant: s = "default" }) {
  return /* @__PURE__ */ p.jsx(
    $r,
    {
      className: `aiwa-log-toggle is-${s}-toggle`,
      label: a,
      active: e,
      isFill: !0,
      "aria-label": `${a}: ${e ? "да" : "нет"}`,
      onClick: () => l(!e),
      end: /* @__PURE__ */ p.jsx("span", { className: "aiwa-log-toggle-mark", "aria-hidden": "true", children: e ? /* @__PURE__ */ p.jsx(Ur, {}) : null })
    }
  );
}
function ix({ label: a, children: e }) {
  return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-log-group", children: [
    /* @__PURE__ */ p.jsx(lt, { className: "aiwa-log-label", variant: "subheadline1", weight: "regular", children: a }),
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-log-choices", role: "group", "aria-label": a, children: e })
  ] });
}
function Mr({ label: a, options: e, value: l, onChange: s }) {
  return /* @__PURE__ */ p.jsx(ix, { label: a, children: e.map(([r, c]) => /* @__PURE__ */ p.jsx(
    $r,
    {
      label: c,
      active: l === r,
      onClick: () => s(r)
    },
    r
  )) });
}
function lx({ label: a, options: e, symptoms: l, onToggle: s }) {
  return /* @__PURE__ */ p.jsx(ix, { label: a, children: e.map(([r, c]) => /* @__PURE__ */ p.jsx(
    $r,
    {
      label: c,
      active: l.includes(r),
      onClick: () => s(r)
    },
    r
  )) });
}
function ne({
  label: a,
  value: e,
  onChange: l = () => {
  },
  placeholder: s = "",
  type: r = "text",
  inputMode: c,
  multiline: f = !1,
  readOnly: h = !1,
  ...y
}) {
  const m = {
    ...y,
    inputMode: c,
    value: e,
    placeholder: s,
    readOnly: h,
    onChange: (g) => l(g.target.value)
  };
  return /* @__PURE__ */ p.jsxs("label", { className: "aiwa-field", children: [
    /* @__PURE__ */ p.jsx(lt, { variant: "caption1", weight: "regular", children: a }),
    f ? /* @__PURE__ */ p.jsx("textarea", { ...m }) : /* @__PURE__ */ p.jsx("input", { type: r, ...m })
  ] });
}
function sx({ value: a, onChange: e }) {
  return /* @__PURE__ */ p.jsx("div", { className: "aiwa-custom-symptom", children: /* @__PURE__ */ p.jsx(
    ne,
    {
      label: "Свой симптом",
      value: a,
      onChange: e,
      placeholder: "Например, тошнота",
      maxLength: 40
    }
  ) });
}
function GA({ isOpen: a, onClose: e, checkin: l, symptomGroups: s, mode: r }) {
  const [c, f] = E.useState(l.symptoms || []), [h, y] = E.useState(l.energy || 0), [m, g] = E.useState(l.mood || 0), [v, b] = E.useState(!!l.period), [T, S] = E.useState(!!l.intimacy), [w, A] = E.useState(""), [_, M] = E.useState(!1);
  E.useEffect(() => {
    a && (f(l.symptoms || []), y(l.energy || 0), g(l.mood || 0), b(!!l.period), S(!!l.intimacy), A(""), M(!1));
  }, [a]);
  const j = (V) => {
    f((R) => R.includes(V) ? R.filter((k) => k !== V) : [...R, V]);
  }, D = s?.length ? s : Hr, B = async () => {
    if (_) return;
    const V = l.symptoms || [], R = w.trim();
    M(!0);
    try {
      let k = !1;
      v !== !!l.period && (await ae("toggleTodayPeriod"), k = !0), h !== (l.energy || 0) && (await ae("setCheckin", "energy", h), k = !0), m !== (l.mood || 0) && (await ae("setCheckin", "mood", m), k = !0);
      for (const P of c.filter((K) => !V.includes(K)))
        await ae("toggleSym", P);
      for (const P of V.filter((K) => !c.includes(K)))
        await ae("toggleSym", P);
      T !== !!l.intimacy && await ae("toggleTodayIntimacy"), R && (await ae("addCustomSym", R), k = !0), k || zt("Сохранено", { type: "success" }), e();
    } catch (k) {
      zt(k?.message || "Не удалось сохранить", { type: "error" });
    } finally {
      M(!1);
    }
  };
  return /* @__PURE__ */ p.jsxs(
    yn,
    {
      isOpen: a,
      onClose: e,
      "data-aiwa-log-modal": "true",
      children: [
        /* @__PURE__ */ p.jsx(Bh, { size: "large", title: "Занести в журнал" }),
        /* @__PURE__ */ p.jsx("div", { className: "aiwa-log-scroll", children: /* @__PURE__ */ p.jsxs(pt, { className: "aiwa-log-sections", children: [
          r !== "preg" && r !== "meno" ? /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(_d, { label: "Месячные", variant: "period", active: v, onChange: b }) }) : null,
          /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(
            Mr,
            {
              label: "Энергия",
              options: Wb,
              value: h,
              onChange: y
            }
          ) }),
          /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(
            Mr,
            {
              label: "Настроение",
              options: Ib,
              value: m,
              onChange: g
            }
          ) }),
          D.map(([V, R]) => /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(lx, { label: V, options: R, symptoms: c, onToggle: j }) }, V)),
          /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(sx, { value: w, onChange: A }) }),
          /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(_d, { label: "Близость", active: T, onChange: S }) })
        ] }) }),
        /* @__PURE__ */ p.jsx("div", { className: "aiwa-log-footer", children: /* @__PURE__ */ p.jsx(
          Ft,
          {
            variant: "filled",
            label: _ ? "Сохраняю…" : "Сохранить",
            isFill: !0,
            ...ce("Сохранить", B)
          }
        ) })
      ]
    }
  );
}
function YA({ icon: a, label: e, onClick: l, className: s = "", ...r }) {
  return /* @__PURE__ */ p.jsx(
    Te,
    {
      as: "button",
      type: "button",
      mode: "opacity",
      "aria-label": e,
      className: `aiwa-fab${s ? ` ${s}` : ""}`,
      onClick: l,
      ...r,
      children: /* @__PURE__ */ p.jsx(xh, { className: "aiwa-fab-surface", children: /* @__PURE__ */ p.jsx("span", { className: "aiwa-fab-icon", "aria-hidden": "true", children: a }) })
    }
  );
}
const es = 8, Kg = 6;
function XA(a, e, l) {
  const s = window.innerWidth, r = window.innerHeight;
  let c = l === "end" ? a.right - e.width : a.left;
  c = Math.min(c, s - e.width - es), c = Math.max(es, c);
  const f = a.bottom + Kg, h = a.top - Kg - e.height, y = f + e.height <= r - es, m = y || h < es ? f : h, g = y || h < es ? "top" : "bottom";
  return { top: m, left: c, originY: g };
}
function ox({ items: a, trigger: e, align: l = "start", className: s = "" }) {
  const [r, c] = E.useState(!1), [f, h] = E.useState({ top: 0, left: 0, originY: "top" }), y = E.useRef(null), m = E.useRef(null), g = E.useCallback(() => {
    c(!1);
  }, []);
  E.useLayoutEffect(() => {
    if (!r || !m.current || !y.current) return;
    const b = () => {
      const T = y.current.getBoundingClientRect(), S = { width: m.current.offsetWidth, height: m.current.offsetHeight };
      h(XA(T, S, l));
    };
    return b(), window.addEventListener("resize", b), window.addEventListener("scroll", b, !0), () => {
      window.removeEventListener("resize", b), window.removeEventListener("scroll", b, !0);
    };
  }, [r, l]), E.useEffect(() => {
    if (!r) return;
    const b = (S) => {
      m.current?.contains(S.target) || y.current?.contains(S.target) || g();
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
  return /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsx(
      "div",
      {
        ref: y,
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
    r && zr.createPortal(
      /* @__PURE__ */ p.jsx(
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
          children: a.map((b) => /* @__PURE__ */ p.jsxs(
            "button",
            {
              type: "button",
              role: "menuitem",
              className: "aiwa-action-menu-item",
              onClick: () => v(b),
              children: [
                b.icon ? /* @__PURE__ */ p.jsx("span", { className: "aiwa-action-menu-icon", "aria-hidden": "true", children: b.icon }) : null,
                /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "regular", children: b.label })
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
function PA({ options: a, value: e, onChange: l, hint: s }) {
  return /* @__PURE__ */ p.jsxs(xh, { className: "aiwa-mark-bar", role: "group", "aria-label": "Что отмечаем", children: [
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-mark-bar-chips", children: a.map((r) => /* @__PURE__ */ p.jsx(
      $r,
      {
        label: r.label,
        active: e === r.value,
        onClick: () => l(r.value)
      },
      r.value
    )) }),
    s ? /* @__PURE__ */ p.jsx(lt, { className: "aiwa-mark-bar-hint", variant: "footnote", weight: "regular", role: "status", children: s }) : null
  ] });
}
function KA({ iso: a, label: e, open: l, onClose: s, symptomGroups: r, showIntimacy: c = !0 }) {
  const [f, h] = E.useState({}), [y, m] = E.useState([]), [g, v] = E.useState(0), [b, T] = E.useState(0), [S, w] = E.useState(!1), [A, _] = E.useState(""), [M, j] = E.useState(!1);
  E.useEffect(() => {
    if (!a || !l) return;
    const R = ae("getAiwaDayCheckin", a) || {};
    h(R), m(R.symptoms || []), v(R.energy || 0), T(R.mood || 0), w(!!R.intimacy), _(""), j(!1);
  }, [a, l]);
  const D = (R) => {
    m((k) => k.includes(R) ? k.filter((P) => P !== R) : [...k, R]);
  }, B = r?.length ? r : Hr, V = async () => {
    if (M) return;
    const R = f.symptoms || [], k = A.trim();
    j(!0);
    try {
      g !== (f.energy || 0) && await ae("setDayCheckin", a, "energy", g), b !== (f.mood || 0) && await ae("setDayCheckin", a, "mood", b);
      for (const P of y.filter((K) => !R.includes(K)))
        await ae("toggleDaySym", a, P);
      for (const P of R.filter((K) => !y.includes(K)))
        await ae("toggleDaySym", a, P);
      S !== !!f.intimacy && await ae("markPA", a), k ? await ae("addDayCustomSym", a, k) : zt("Сохранено", { type: "success" }), s();
    } catch (P) {
      zt(P?.message || "Не удалось сохранить", { type: "error" });
    } finally {
      j(!1);
    }
  };
  return /* @__PURE__ */ p.jsxs(
    yn,
    {
      isOpen: l,
      onClose: s,
      "data-aiwa-day-log-modal": "true",
      children: [
        /* @__PURE__ */ p.jsx(Bh, { size: "large", title: e || "Занести в журнал" }),
        /* @__PURE__ */ p.jsx("div", { className: "aiwa-log-scroll", children: /* @__PURE__ */ p.jsxs(pt, { className: "aiwa-log-sections", children: [
          /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(
            Mr,
            {
              label: "Энергия",
              options: Wb,
              value: g,
              onChange: v
            }
          ) }),
          /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(
            Mr,
            {
              label: "Настроение",
              options: Ib,
              value: b,
              onChange: T
            }
          ) }),
          B.map(([R, k]) => /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(lx, { label: R, options: k, symptoms: y, onToggle: D }) }, R)),
          /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(sx, { value: A, onChange: _ }) }),
          c ? /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(_d, { label: "Близость", active: S, onChange: w }) }) : null
        ] }) }),
        /* @__PURE__ */ p.jsx("div", { className: "aiwa-log-footer", children: /* @__PURE__ */ p.jsx(
          Ft,
          {
            variant: "filled",
            label: M ? "Сохраняю…" : "Сохранить",
            isFill: !0,
            ...ce("Сохранить", V)
          }
        ) })
      ]
    }
  );
}
function ZA({ isOpen: a, onClose: e, mode: l, revision: s, symptomGroups: r }) {
  const [c, f] = E.useState(!1), [h, y] = E.useState(null), [m, g] = E.useState(!1), [v, b] = E.useState("period"), [T, S] = E.useState({}), w = E.useRef(Promise.resolve()), A = E.useRef(0), _ = Array.from({ length: 20 }, (J, nt) => ae("getAiwaCalendarMonth", nt - 12)).filter(Boolean), M = l !== "preg" && l !== "meno", j = cA(M ? ["period", "symptoms", "intimacy"] : ["symptoms", "intimacy"]), D = Md[v] || Md.symptoms, B = oA(), V = () => {
    g(!1), S({});
  }, R = (J) => {
    b(J), f(!1), g(!0);
  }, k = j.map((J) => ({
    label: J.label,
    onSelect: () => R(J.value)
  }));
  ax(a, m ? V : e);
  const P = E.useRef(null);
  E.useEffect(() => {
    if (!a) return;
    const J = P.current, nt = J?.querySelector('[data-current-month="true"]');
    J && nt && (J.scrollTop = Math.max(0, nt.offsetTop - 8));
  }, [a]), E.useEffect(() => {
    a || (f(!1), y(null), g(!1), S({})), b(M ? "period" : "symptoms");
  }, [a, M]);
  const K = (J) => {
    const nt = T[`${v}:${J.iso}`];
    return typeof nt == "boolean" ? nt : !!D.checked(J);
  }, it = (J, nt) => {
    const O = () => ae(J, nt);
    A.current += 1, w.current = w.current.then(O, O).then(() => {
      A.current -= 1, A.current === 0 && S({});
    });
  }, et = (() => {
    const J = /* @__PURE__ */ new Date();
    return `${J.getFullYear()}-${String(J.getMonth() + 1).padStart(2, "0")}-${String(J.getDate()).padStart(2, "0")}`;
  })(), I = (J, nt) => {
    if (!m) {
      J.iso && J.iso <= et && y({ iso: J.iso, label: `${J.date} ${nt}` });
      return;
    }
    if (v === "symptoms") {
      y({ iso: J.iso, label: `${J.date} ${nt}` });
      return;
    }
    S((O) => ({ ...O, [`${v}:${J.iso}`]: !K(J) })), it(v === "period" ? "toggleCalendarPeriodDay" : "markPA", J.iso);
  };
  return a ? zr.createPortal(
    /* @__PURE__ */ p.jsxs(
      "div",
      {
        className: "aiwa-calendar-page",
        "data-aiwa-calendar-modal": "true",
        "data-marking": m ? "true" : void 0,
        "data-markbar": m && !B ? "true" : void 0,
        role: "region",
        "aria-label": "Календарь",
        children: [
          /* @__PURE__ */ p.jsxs("div", { className: "aiwa-calendar-screen", "data-revision": s, role: "document", "aria-label": "Календарь", children: [
            /* @__PURE__ */ p.jsxs("div", { className: "aiwa-calendar-modeswitch", children: [
              m && B ? null : /* @__PURE__ */ p.jsxs(
                Te,
                {
                  as: "button",
                  type: "button",
                  mode: "opacity",
                  className: "aiwa-calendar-legend-toggle",
                  "aria-pressed": c,
                  "aria-label": c ? "Скрыть обозначения" : "Показать обозначения календаря",
                  onClick: () => f((J) => !J),
                  children: [
                    /* @__PURE__ */ p.jsx(Kb, {}),
                    /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "semibold", children: "Обозначения" })
                  ]
                }
              ),
              m ? /* @__PURE__ */ p.jsx(
                Te,
                {
                  as: "button",
                  type: "button",
                  mode: "opacity",
                  className: "aiwa-calendar-done",
                  "aria-label": "Закончить отметки",
                  onClick: V,
                  children: /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "semibold", children: "Готово" })
                }
              ) : null
            ] }),
            c ? /* @__PURE__ */ p.jsxs("div", { className: "aiwa-calendar-help", role: "status", children: [
              /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "semibold", children: "Обозначения" }),
              /* @__PURE__ */ p.jsx("div", { className: "aiwa-calendar-legend", children: fA.map(({ label: J, variant: nt, token: O }) => /* @__PURE__ */ p.jsx(
                ZE,
                {
                  variant: nt,
                  textVariant: "caption1",
                  weight: "semibold",
                  style: { color: `var(${O})` },
                  children: J
                },
                J
              )) })
            ] }) : null,
            /* @__PURE__ */ p.jsx("div", { className: "aiwa-calendar-scroll", ref: P, children: /* @__PURE__ */ p.jsx("div", { className: "aiwa-calendar-months", children: _.map((J) => /* @__PURE__ */ p.jsxs(
              "section",
              {
                className: "aiwa-calendar-month",
                "aria-label": J.label,
                "data-current-month": J.days.some((nt) => nt.today) ? "true" : void 0,
                children: [
                  /* @__PURE__ */ p.jsx(lt, { className: "aiwa-calendar-month-title", variant: "body", weight: "semibold", children: J.label || J.name }),
                  /* @__PURE__ */ p.jsx("div", { className: "aiwa-calendar-grid", children: J.days.map((nt) => nt.empty ? /* @__PURE__ */ p.jsx("span", { className: "aiwa-calendar-empty", "aria-hidden": "true" }, nt.key) : /* @__PURE__ */ p.jsx(
                    Fb,
                    {
                      day: nt,
                      interactive: m || !!(nt.iso && nt.iso <= et),
                      marking: m,
                      checked: m && K(nt),
                      markVariant: v === "intimacy" ? "heart" : "radio",
                      monthLabel: J.label,
                      onSelect: (O) => I(O, J.name || J.label)
                    },
                    nt.key
                  )) })
                ]
              },
              J.key || J.label
            )) }) })
          ] }),
          m && !B ? /* @__PURE__ */ p.jsx(
            PA,
            {
              options: j,
              value: v,
              onChange: b,
              hint: D.hint
            }
          ) : null,
          m ? null : /* @__PURE__ */ p.jsx(
            ox,
            {
              className: "aiwa-calendar-fab",
              align: "end",
              items: k,
              trigger: /* @__PURE__ */ p.jsx(YA, { icon: /* @__PURE__ */ p.jsx(kr, {}), label: "Отметить день" })
            }
          ),
          /* @__PURE__ */ p.jsx(
            KA,
            {
              iso: h?.iso,
              label: h?.label,
              open: !!h,
              onClose: () => y(null),
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
function QA({ panel: a, onClose: e, checkin: l, symptomGroups: s, mode: r, revision: c }) {
  return /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsx(GA, { isOpen: a === "journal", onClose: e, checkin: l, symptomGroups: s, mode: r }),
    /* @__PURE__ */ p.jsx(ZA, { isOpen: a === "calendar", onClose: e, mode: r, revision: c, symptomGroups: s })
  ] });
}
function ue({
  title: a,
  description: e,
  onClick: l,
  trailing: s,
  muted: r = !1,
  start: c,
  image: f,
  loading: h = !1
}) {
  const y = s !== void 0 ? s : l ? /* @__PURE__ */ p.jsx(gt.Part, { type: "Chevron" }) : null, m = h ? /* @__PURE__ */ p.jsx("span", { className: "aiwa-cell-thumb aiwa-cell-thumb-loading", children: /* @__PURE__ */ p.jsx(zh, { size: 22 }) }) : f ? /* @__PURE__ */ p.jsx("span", { className: "aiwa-cell-thumb", children: /* @__PURE__ */ p.jsx("img", { src: f, alt: "", loading: "lazy" }) }) : c;
  return /* @__PURE__ */ p.jsx(
    gt,
    {
      start: m,
      end: y,
      onClick: l,
      tappable: !!l,
      as: l ? "button" : "div",
      type: l ? "button" : void 0,
      "aria-label": a,
      style: r ? { opacity: 0.65 } : void 0,
      children: /* @__PURE__ */ p.jsx(gt.Text, { title: a, description: e || void 0 })
    }
  );
}
function Ki({ label: a, options: e, value: l, onChange: s }) {
  return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-form-group", children: [
    a ? /* @__PURE__ */ p.jsx(lt, { className: "aiwa-form-label", variant: "body", weight: "semibold", children: a }) : null,
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-choice-pills", role: "group", "aria-label": a, children: e.map((r) => {
      const c = typeof r == "string" ? { value: r, label: r } : r;
      return /* @__PURE__ */ p.jsx(
        Te,
        {
          as: "button",
          type: "button",
          mode: "opacity",
          className: l === c.value ? "aiwa-choice-pill is-active" : "aiwa-choice-pill",
          "aria-pressed": l === c.value,
          onClick: () => s(c.value),
          children: /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "regular", children: c.label })
        },
        c.value
      );
    }) })
  ] });
}
function FA({ isOpen: a, onClose: e }) {
  const [l, s] = E.useState("main"), [r, c] = E.useState(() => ae("aiwaData") || {}), [f, h] = E.useState(null), [y, m] = E.useState("3"), [g, v] = E.useState({});
  E.useEffect(() => {
    if (!a) return;
    const j = ae("aiwaData") || {};
    c(j), s("main"), h(null), v({
      height: String(j.profile?.height || ""),
      weight: String(j.profile?.weight || ""),
      age: String(j.profile?.age || ""),
      cycle_len: String(j.cycle_len || ""),
      diet_note: j.profile?.diet_note || j.diet_note || "",
      kcal_goal: String(j.profile?.kcal_goal || j.kcal_goal || ""),
      send_time: j.send_time || "08:00",
      proactive_enabled: j.proactive_enabled !== !1
    });
  }, [a]);
  const b = async () => {
    s("partner");
    const j = await Pt("/api/partner", {}).catch(() => null);
    h(j || {});
  }, T = async () => {
    const j = await Pt("/api/profile", {
      height: g.height,
      weight: g.weight,
      age: g.age,
      cycle_len: g.cycle_len
    }).catch(() => null), D = await Pt("/api/prefs", {
      diet_note: g.diet_note,
      kcal_goal: g.kcal_goal
    }).catch(() => null), B = await Pt("/api/settime", { time: g.send_time }).catch(() => null);
    j?.ok && D?.ok && B?.ok ? (zt("Данные сохранены", { type: "success" }), pn("reloadAfterEdit"), s("main")) : zt(j?.text || "Проверь рост, вес, возраст и время", { type: "error" });
  }, S = async () => {
    const j = await Pt("/api/report", { period: y }).catch(() => null);
    j?.ok ? (zt("Выписка отправлена в чат бота", { type: "success" }), s("main")) : zt(j?.text || "Выписка временно недоступна", { type: "error" });
  }, w = async (j) => {
    const D = g.proactive_enabled !== !1;
    v((V) => ({ ...V, proactive_enabled: j })), (await Pt("/api/proactive", { enabled: j }).catch(() => null))?.ok || (v((V) => ({ ...V, proactive_enabled: D })), zt("Не получилось изменить настройку", { type: "error" }));
  }, A = (j) => {
    e(), pn("chooseMode", j);
  }, _ = async () => {
    if (f?.link)
      try {
        await navigator.clipboard.writeText(f.link), zt("Ссылка скопирована", { type: "success" });
      } catch {
        zt("Ссылка готова — выдели и скопируй");
      }
  }, M = async () => {
    (await Pt("/api/partner", { action: "unlink" }).catch(() => null))?.ok && (h({ linked: !1 }), zt("Партнёр отключён", { type: "success" }));
  };
  return /* @__PURE__ */ p.jsx(
    yn,
    {
      isOpen: a,
      onClose: e,
      onBack: l === "main" ? e : () => s("main"),
      children: /* @__PURE__ */ p.jsx(p.Fragment, { children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-sheet-scroll", children: [
        l === "main" ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
          /* @__PURE__ */ p.jsxs("div", { className: "aiwa-profile-modes", children: [
            /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "semibold", children: "Режим" }),
            /* @__PURE__ */ p.jsx("div", { className: "aiwa-choice-pills", children: yA.map((j) => /* @__PURE__ */ p.jsx(
              Te,
              {
                as: "button",
                type: "button",
                mode: "opacity",
                className: r.mode === j.value ? "aiwa-choice-pill is-active" : "aiwa-choice-pill",
                "aria-pressed": r.mode === j.value,
                onClick: () => A(j.value),
                children: /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "regular", children: j.label })
              },
              j.value
            )) })
          ] }),
          /* @__PURE__ */ p.jsx(pt, { className: "aiwa-tma-blocks", children: /* @__PURE__ */ p.jsxs(pt.Item, { children: [
            /* @__PURE__ */ p.jsx(ue, { title: "Выписка для врача", description: "PDF в чат бота", onClick: () => s("report") }),
            /* @__PURE__ */ p.jsx(ue, { title: "Предпочтения по питанию", description: "ограничения и цель калорий", onClick: () => s("data") }),
            /* @__PURE__ */ p.jsx(ue, { title: "Мои данные", description: "рост · вес · возраст · цикл", onClick: () => s("data") }),
            /* @__PURE__ */ p.jsx(ue, { title: "Утренняя сводка", description: `${g.send_time || "08:00"} · МСК`, onClick: () => s("summary") }),
            /* @__PURE__ */ p.jsx(
              gt.Switch,
              {
                value: g.proactive_enabled !== !1,
                onChange: w,
                children: /* @__PURE__ */ p.jsx(
                  gt.Text,
                  {
                    title: "Проактивные сообщения",
                    description: g.proactive_enabled === !1 ? "выключены" : "не больше одного в день"
                  }
                )
              }
            ),
            /* @__PURE__ */ p.jsx(ue, { title: "Партнёр и близкие", description: "короткая бережная сводка", onClick: b })
          ] }) })
        ] }) : null,
        l === "data" ? /* @__PURE__ */ p.jsxs("div", { className: "aiwa-form-stack", children: [
          /* @__PURE__ */ p.jsx(lt, { variant: "title3", weight: "semibold", children: "Параметры тела" }),
          /* @__PURE__ */ p.jsxs("div", { className: "aiwa-form-grid", children: [
            /* @__PURE__ */ p.jsx(ne, { label: "Рост, см", value: g.height || "", onChange: (j) => v((D) => ({ ...D, height: j })), inputMode: "decimal" }),
            /* @__PURE__ */ p.jsx(ne, { label: "Вес, кг", value: g.weight || "", onChange: (j) => v((D) => ({ ...D, weight: j })), inputMode: "decimal" }),
            /* @__PURE__ */ p.jsx(ne, { label: "Возраст", value: g.age || "", onChange: (j) => v((D) => ({ ...D, age: j })), inputMode: "numeric" }),
            /* @__PURE__ */ p.jsx(ne, { label: "Длина цикла", value: g.cycle_len || "", onChange: (j) => v((D) => ({ ...D, cycle_len: j })), inputMode: "numeric" })
          ] }),
          /* @__PURE__ */ p.jsx(lt, { variant: "title3", weight: "semibold", children: "Питание" }),
          /* @__PURE__ */ p.jsx(
            ne,
            {
              label: "Предпочтения и ограничения",
              value: g.diet_note || "",
              onChange: (j) => v((D) => ({ ...D, diet_note: j })),
              placeholder: "Например: без свинины, аллергия на орехи",
              multiline: !0
            }
          ),
          /* @__PURE__ */ p.jsx(ne, { label: "Желаемые калории", value: g.kcal_goal || "", onChange: (j) => v((D) => ({ ...D, kcal_goal: j })), inputMode: "numeric" }),
          /* @__PURE__ */ p.jsx(Ft, { variant: "filled", label: "Сохранить", isFill: !0, ...ce("Сохранить данные", T) })
        ] }) : null,
        l === "summary" ? /* @__PURE__ */ p.jsxs("div", { className: "aiwa-form-stack", children: [
          /* @__PURE__ */ p.jsx(lt, { variant: "title3", weight: "semibold", children: "Утренняя сводка" }),
          /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "regular", children: "Каждое утро Айва присылает сводку дня в чат — выбери удобное время (МСК)." }),
          /* @__PURE__ */ p.jsx(ne, { label: "Время утренней сводки", type: "time", value: g.send_time || "08:00", onChange: (j) => v((D) => ({ ...D, send_time: j })) }),
          /* @__PURE__ */ p.jsx(Ft, { variant: "filled", label: "Сохранить", isFill: !0, ...ce("Сохранить время сводки", T) })
        ] }) : null,
        l === "report" ? /* @__PURE__ */ p.jsxs("div", { className: "aiwa-form-stack", children: [
          /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "regular", children: "Циклы, динамика и дневник симптомов придут PDF-файлом в чат бота." }),
          /* @__PURE__ */ p.jsx(
            Ki,
            {
              options: [
                { value: "3", label: "3 месяца" },
                { value: "6", label: "6 месяцев" },
                { value: "all", label: "Весь период" }
              ],
              value: y,
              onChange: m
            }
          ),
          /* @__PURE__ */ p.jsx(Ft, { variant: "filled", label: "Собрать выписку", isFill: !0, ...ce("Собрать выписку", S) })
        ] }) : null,
        l === "partner" ? /* @__PURE__ */ p.jsxs("div", { className: "aiwa-form-stack", children: [
          /* @__PURE__ */ p.jsxs("div", { className: "aiwa-paper-card", children: [
            /* @__PURE__ */ p.jsx(lt, { variant: "title3", weight: "semibold", children: "Бережная сводка для близкого" }),
            /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "regular", children: "Айва расскажет, когда особенно нужны поддержка и отдых — без интимных и медицинских деталей." })
          ] }),
          f === null ? /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "regular", children: "Готовлю ссылку…" }) : null,
          f?.linked ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
            /* @__PURE__ */ p.jsx("div", { className: "aiwa-sheet-card", children: /* @__PURE__ */ p.jsx(ue, { title: "Партнёр подключён", description: "Получает только бережную сводку без календаря и приватных заметок." }) }),
            /* @__PURE__ */ p.jsx(Ft, { variant: "filled", label: "Отключить партнёра", isFill: !0, ...ce("Отключить партнёра", M) })
          ] }) : null,
          f?.link ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
            /* @__PURE__ */ p.jsx(ne, { label: "Ссылка-приглашение", value: f.link, readOnly: !0, multiline: !0 }),
            /* @__PURE__ */ p.jsx(Ft, { variant: "filled", label: "Скопировать ссылку", isFill: !0, ...ce("Скопировать ссылку", _) })
          ] }) : null,
          f && !f.linked && !f.link ? /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "regular", children: "Ссылка доступна после запуска из Telegram. В боте можно использовать команду /partner." }) : null
        ] }) : null
      ] }) })
    }
  );
}
function JA() {
  const a = window.Telegram?.WebApp?.initDataUnsafe?.user, e = a?.photo_url;
  if (e) return /* @__PURE__ */ p.jsx(eE, { src: e, size: 36 });
  const s = ((typeof window.aiwaData == "function" ? window.aiwaData() : window.aiwaData)?.name || a?.first_name || "").trim();
  return /* @__PURE__ */ p.jsx("span", { className: "aiwa-avatar-initial", "aria-hidden": "true", children: (s[0] || "•").toUpperCase() });
}
function WA(a) {
  return /* @__PURE__ */ p.jsx(al, { children: /* @__PURE__ */ p.jsx(nl, { mode: "secondary", children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-deslop-home", children: [
    /* @__PURE__ */ p.jsx(
      Bh,
      {
        title: a.dateText,
        left: /* @__PURE__ */ p.jsx(JA, {}),
        onLeft: () => window.AiwaDeslop?.openProfile?.(),
        leftAriaLabel: "Открыть профиль",
        right: /* @__PURE__ */ p.jsx(FE, {}),
        onRight: () => pn("openHomePanel", "calendar"),
        rightAriaLabel: "Открыть календарь"
      }
    ),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-overview", children: [
      /* @__PURE__ */ p.jsx(
        Vh,
        {
          days: a.week,
          selectedIso: a.selectedIso,
          onSelect: a.onSelectDay ?? ((e) => pn("aiwaSelectDay", e.iso))
        }
      ),
      /* @__PURE__ */ p.jsxs("div", { className: "aiwa-countdown", children: [
        /* @__PURE__ */ p.jsx(lt, { variant: "title1", weight: "semibold", children: a.heroValue || `${a.countdown} дней` }),
        /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "regular", children: a.countdownLabel })
      ] }),
      /* @__PURE__ */ p.jsx(
        Ft,
        {
          variant: "filled",
          label: /* @__PURE__ */ p.jsxs("span", { className: "aiwa-btn-icon-label", children: [
            /* @__PURE__ */ p.jsx(kr, {}),
            " Занести в журнал"
          ] }),
          ...ce("Занести в журнал", () => pn("openHomePanel", "journal"))
        }
      )
    ] }),
    /* @__PURE__ */ p.jsxs(pt, { className: "aiwa-tma-blocks", children: [
      /* @__PURE__ */ p.jsx(vA, { title: a.dayTitle, checkin: a.dayCheckin ?? a.checkin, symptomGroups: a.symptomGroups }),
      /* @__PURE__ */ p.jsx(CA, { aiText: a.aiText }),
      /* @__PURE__ */ p.jsx(EA, { delay: a.delay }),
      /* @__PURE__ */ p.jsx(MA, { metrics: a.metrics, title: a.statsTitle }),
      /* @__PURE__ */ p.jsx(
        DA,
        {
          data: a.chartData,
          series: a.chartSeries,
          title: a.chartTitle,
          band: a.chartBand,
          emptyText: a.chartEmptyText
        }
      ),
      /* @__PURE__ */ p.jsx(
        NA,
        {
          history: a.history,
          title: a.historyTitle,
          emptyTitle: a.historyEmptyTitle,
          emptyDescription: a.historyEmptyDescription
        }
      ),
      /* @__PURE__ */ p.jsx(HA, {})
    ] }),
    /* @__PURE__ */ p.jsx(
      QA,
      {
        panel: a.panel,
        onClose: a.onPanelClose,
        checkin: a.checkin,
        symptomGroups: a.symptomGroups,
        mode: a.mode,
        revision: a.panelRevision
      }
    ),
    /* @__PURE__ */ p.jsx(FA, { isOpen: a.profileOpen, onClose: a.onProfileClose })
  ] }) }) });
}
const Zg = {
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
}, Rd = (a) => Array.from({ length: a }, (e, l) => l);
function IA({ kind: a }) {
  return a === "week" ? /* @__PURE__ */ p.jsxs("div", { className: "aiwa-overview", children: [
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-week", children: Rd(7).map((e) => /* @__PURE__ */ p.jsx(Xi, { className: "aiwa-skeleton-day" }, e)) }),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-countdown", children: [
      /* @__PURE__ */ p.jsx(Ja, { active: !0, width: 2 }),
      /* @__PURE__ */ p.jsx(Ja, { active: !0, width: 18 })
    ] })
  ] }) : /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsx(Xi, { className: "aiwa-skeleton-gauge" }),
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-macro-grid", children: Rd(3).map((e) => /* @__PURE__ */ p.jsx(Xi, { className: "aiwa-skeleton-macro" }, e)) })
  ] });
}
function rx({ title: a, variant: e = "food" }) {
  const { hero: l, sections: s } = Zg[e] || Zg.food;
  return /* @__PURE__ */ p.jsx(al, { children: /* @__PURE__ */ p.jsx(nl, { mode: "secondary", children: /* @__PURE__ */ p.jsxs("div", { className: `aiwa-paper-screen aiwa-screen-skeleton aiwa-${e}-screen`, children: [
    /* @__PURE__ */ p.jsx(lt, { className: "aiwa-screen-title", variant: "title1", weight: "semibold", children: a }),
    /* @__PURE__ */ p.jsxs(cb, { active: !0, children: [
      /* @__PURE__ */ p.jsx(IA, { kind: l }),
      /* @__PURE__ */ p.jsx("div", { className: "aiwa-screen-cta", children: /* @__PURE__ */ p.jsx(Xi, { className: "aiwa-skeleton-cta" }) }),
      /* @__PURE__ */ p.jsxs(pt, { className: "aiwa-tma-blocks", children: [
        /* @__PURE__ */ p.jsx(pt.Item, { className: "aiwa-insight-section", children: /* @__PURE__ */ p.jsx(gt, { tappable: !1, children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-insight-content", children: [
          /* @__PURE__ */ p.jsx(Ja, { active: !0, width: 30 }),
          /* @__PURE__ */ p.jsx(Ja, { active: !0, width: 26 }),
          /* @__PURE__ */ p.jsx(Xi, { className: "aiwa-skeleton-insight-cta" })
        ] }) }) }),
        s.map((r) => /* @__PURE__ */ p.jsx(pt.Item, { header: r.header, children: Rd(r.rows).map((c) => /* @__PURE__ */ p.jsx(
          gt,
          {
            tappable: !1,
            start: r.media ? /* @__PURE__ */ p.jsx(Xi, { className: "aiwa-skeleton-thumb" }) : void 0,
            children: /* @__PURE__ */ p.jsx(
              gt.Text,
              {
                title: /* @__PURE__ */ p.jsx(Ja, { active: !0, width: 13 }),
                description: /* @__PURE__ */ p.jsx(Ja, { active: !0, width: 22 })
              }
            )
          },
          c
        )) }, r.header))
      ] })
    ] })
  ] }) }) });
}
function $f({ label: a, value: e, target: l, macro: s, color: r }) {
  const c = l ? Math.min(100, Math.round(Number(e || 0) / Number(l) * 100)) : 0, f = r || (s ? `var(--aiwa-macro-${s})` : "var(--aiwa-accent)");
  return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-macro-card", children: [
    /* @__PURE__ */ p.jsxs(lt, { variant: "body", weight: "semibold", children: [
      Math.round(e || 0),
      l ? null : " г",
      l ? /* @__PURE__ */ p.jsxs("span", { children: [
        " / ",
        Math.round(l),
        " г"
      ] }) : null
    ] }),
    /* @__PURE__ */ p.jsx(lt, { variant: "caption1", weight: "regular", children: a }),
    /* @__PURE__ */ p.jsx("span", { className: "aiwa-macro-track", style: { "--macro-color": f }, children: /* @__PURE__ */ p.jsx("span", { style: { width: `${c}%` } }) })
  ] });
}
const Qg = "M 11 169 A 158 158 0 0 1 327 169", Fg = Math.PI * 158, tj = 500, ej = (a) => 1 - (1 - a) ** 3;
function nj(a) {
  const [e, l] = E.useState(0), s = E.useRef(0), r = E.useRef(0);
  return E.useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      s.current = a, l(a);
      return;
    }
    const f = s.current, h = performance.now(), y = (m) => {
      const g = Math.min(1, (m - h) / tj), v = f + (a - f) * ej(g);
      s.current = v, l(v), g < 1 && (r.current = requestAnimationFrame(y));
    };
    return r.current = requestAnimationFrame(y), () => cancelAnimationFrame(r.current);
  }, [a]), e;
}
function aj({ kcal: a, kcalTarget: e }) {
  const l = Number(a || 0), s = Number(e || 0), r = nj(Math.min(1, l / Math.max(1, s))), c = r * Math.PI, f = 169 - 158 * Math.cos(c), h = 169 - 158 * Math.sin(c);
  return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-food-gauge", children: [
    /* @__PURE__ */ p.jsxs("svg", { className: "aiwa-food-gauge-arc", viewBox: "0 0 338 180", width: "338", height: "180", fill: "none", children: [
      /* @__PURE__ */ p.jsx("path", { className: "aiwa-food-gauge-track", d: Qg }),
      /* @__PURE__ */ p.jsx(
        "path",
        {
          className: "aiwa-food-gauge-progress",
          d: Qg,
          strokeDasharray: Fg,
          strokeDashoffset: Fg * (1 - r)
        }
      ),
      /* @__PURE__ */ p.jsx("circle", { className: "aiwa-food-gauge-knob", cx: f, cy: h, r: "11" })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-food-gauge-center", children: [
      /* @__PURE__ */ p.jsx(lt, { variant: "title1", weight: "semibold", children: jd(l) }),
      /* @__PURE__ */ p.jsxs(lt, { variant: "body", weight: "regular", children: [
        "из ",
        jd(s)
      ] })
    ] })
  ] });
}
function Jg({ meal: a, onSaved: e, onClose: l }) {
  const [s, r] = E.useState(() => hA(a)), [c, f] = E.useState(!1), h = (m, g) => r((v) => ({ ...v, [m]: g })), y = async () => {
    if (!s.title.trim() && !String(s.kcal).trim()) {
      zt("Укажи название или калории", { type: "error" });
      return;
    }
    f(!0);
    try {
      const m = await Pt(a ? "/api/diary_edit" : "/api/food_manual", {
        ...a ? { id: a.id } : {},
        ...s
      });
      if (m?.ok === !1 || m?.error) throw new Error(m.message || "Не получилось сохранить");
      zt(a ? "Приём обновлён" : "Приём добавлен", { type: "success" }), await e(), l();
    } catch (m) {
      zt(m.message || "Не получилось сохранить", { type: "error" });
    } finally {
      f(!1);
    }
  };
  return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-form-stack", children: [
    /* @__PURE__ */ p.jsx(ne, { label: "Название", value: s.title, onChange: (m) => h("title", m), placeholder: "Например, творог и банан" }),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-form-grid", children: [
      /* @__PURE__ */ p.jsx(ne, { label: "Ккал", value: s.kcal, onChange: (m) => h("kcal", m), inputMode: "decimal" }),
      /* @__PURE__ */ p.jsx(ne, { label: "Граммы", value: s.grams, onChange: (m) => h("grams", m), inputMode: "decimal" }),
      /* @__PURE__ */ p.jsx(ne, { label: "Белки", value: s.protein, onChange: (m) => h("protein", m), inputMode: "decimal" }),
      /* @__PURE__ */ p.jsx(ne, { label: "Жиры", value: s.fat, onChange: (m) => h("fat", m), inputMode: "decimal" }),
      /* @__PURE__ */ p.jsx(ne, { label: "Углеводы", value: s.carbs, onChange: (m) => h("carbs", m), inputMode: "decimal" })
    ] }),
    /* @__PURE__ */ p.jsx(Ki, { label: "Приём пищи", options: tx, value: s.slot, onChange: (m) => h("slot", m) }),
    /* @__PURE__ */ p.jsx(
      Ft,
      {
        variant: "filled",
        label: c ? "Сохраняю…" : a ? "Сохранить изменения" : "Сохранить приём",
        isFill: !0,
        disabled: c,
        ...ce("Сохранить приём", y)
      }
    )
  ] });
}
function ij({ isOpen: a, onClose: e, onSaved: l, editingMeal: s = null }) {
  const [r, c] = E.useState("text"), [f, h] = E.useState(""), [y, m] = E.useState(!1);
  E.useEffect(() => {
    a && (Qb("food"), c(s ? "manual" : "text"), h(""));
  }, [s, a]);
  const g = async () => {
    if (f.trim()) {
      m(!0);
      try {
        const b = await Pt("/api/food_text", { text: f.trim() });
        if (!b?.ok) throw new Error(b?.message || "Не получилось разобрать приём");
        zt(`Добавлено · ${b.rec?.kcal || 0} ккал`, { type: "success" }), await l(), e();
      } catch (b) {
        zt(b.message || "Не получилось добавить", { type: "error" });
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
        zt(T.message || "Не получилось разобрать фото", { type: "error" });
      } finally {
        m(!1);
      }
    }
  };
  return /* @__PURE__ */ p.jsx(yn, { isOpen: a, onClose: e, children: /* @__PURE__ */ p.jsx("div", { children: /* @__PURE__ */ p.jsx("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: s ? /* @__PURE__ */ p.jsx(Jg, { meal: s, onSaved: l, onClose: e }) : /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsx(
      Ki,
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
    r === "photo" ? /* @__PURE__ */ p.jsxs("label", { className: `aiwa-upload-zone${y ? " is-busy" : ""}`, children: [
      y ? /* @__PURE__ */ p.jsx(zh, { size: 28 }) : null,
      /* @__PURE__ */ p.jsx(lt, { variant: "title3", weight: "semibold", children: y ? "Разбираю фото…" : "Сфотографировать еду" }),
      /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "regular", children: y ? "Айва считает КБЖУ, это займёт несколько секунд." : "Айва распознает блюдо и посчитает КБЖУ." }),
      /* @__PURE__ */ p.jsx("input", { type: "file", accept: "image/*", capture: "environment", disabled: y, onChange: (b) => v(b.target.files?.[0]) })
    ] }) : null,
    r === "text" ? /* @__PURE__ */ p.jsxs("div", { className: "aiwa-form-stack", children: [
      /* @__PURE__ */ p.jsx(
        ne,
        {
          label: "Что съела?",
          value: f,
          onChange: h,
          placeholder: "Например: 200 г творога и банан",
          multiline: !0
        }
      ),
      /* @__PURE__ */ p.jsx(
        Ft,
        {
          variant: "filled",
          label: y ? "Считаю…" : "Добавить приём",
          isFill: !0,
          disabled: y || !f.trim(),
          ...ce("Добавить приём", g)
        }
      )
    ] }) : null,
    r === "manual" ? /* @__PURE__ */ p.jsx(Jg, { meal: null, onSaved: l, onClose: e }) : null
  ] }) }) }) });
}
function lj({ isOpen: a, onClose: e, diary: l, onAdd: s, onEdit: r, onDelete: c, onReco: f }) {
  const h = l?.meals || [], y = l?.totals || {}, m = l?.target || {};
  return /* @__PURE__ */ p.jsx(yn, { isOpen: a, onClose: e, children: /* @__PURE__ */ p.jsxs(pt, { className: "aiwa-tma-blocks", children: [
    /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(gt, { tappable: !1, children: /* @__PURE__ */ p.jsx(
      gt.Text,
      {
        title: `${Math.round(y.kcal || 0)} ккал`,
        description: `из ${Math.round(m.kcal || 0) || "—"} ккал`,
        bold: !0
      }
    ) }) }),
    tx.map((g) => {
      const v = h.filter((b) => (b.slot || "snack") === g.value);
      return /* @__PURE__ */ p.jsx(pt.Item, { header: g.label, children: v.length ? v.map((b) => /* @__PURE__ */ p.jsx(
        ue,
        {
          title: b.title,
          description: `${Math.round(b.kcal || 0)} ккал`,
          onClick: () => r(b),
          trailing: /* @__PURE__ */ p.jsx(
            Te,
            {
              as: "button",
              type: "button",
              mode: "opacity",
              "aria-label": `Удалить ${b.title}`,
              onClick: (T) => {
                T.stopPropagation(), c(b.id);
              },
              children: /* @__PURE__ */ p.jsx(Pb, {})
            }
          )
        },
        b.id
      )) : /* @__PURE__ */ p.jsx(gt, { as: "button", type: "button", onClick: s, end: /* @__PURE__ */ p.jsx(gt.Part, { type: "Chevron" }), children: /* @__PURE__ */ p.jsx(gt.Text, { type: "Accent", title: "Добавить" }) }) }, g.value);
    }),
    /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(gt, { tappable: !1, children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-cell-actions", children: [
      /* @__PURE__ */ p.jsx(Ft, { variant: "filled", label: "Добавить приём", isFill: !0, ...ce("Добавить приём", s) }),
      /* @__PURE__ */ p.jsx(Ft, { variant: "filled", label: "Совет по дневнику", isFill: !0, ...ce("Совет по дневнику", f) })
    ] }) }) })
  ] }) });
}
function sj({ isOpen: a, meal: e, slotLabel: l = "", onClose: s, onAdd: r, busy: c = !1 }) {
  const [f, h] = E.useState(null), [y, m] = E.useState(!1), g = e?.dish || "";
  E.useEffect(() => {
    if (!a || !g) return;
    h(null), m(!1);
    let S = !0;
    return Pt("/api/recipe", { dish: g }).then((w) => {
      S && (w?.steps?.length ? h(w) : m(!0));
    }).catch(() => S && m(!0)), () => {
      S = !1;
    };
  }, [a, g]);
  const v = f?.macros || {}, b = [v.protein && `Б ${v.protein}`, v.fat && `Ж ${v.fat}`, v.carbs && `У ${v.carbs}`].filter(Boolean).join(" · "), T = [l, f?.kcal || e?.kcal, b, f?.time].filter(Boolean).join(" · ");
  return /* @__PURE__ */ p.jsx(yn, { isOpen: a, onClose: s, children: /* @__PURE__ */ p.jsxs(pt, { className: "aiwa-tma-blocks", children: [
    /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(gt, { tappable: !1, children: /* @__PURE__ */ p.jsx(gt.Text, { title: g, description: T || e?.note || "", bold: !0 }) }) }),
    !f && !y ? /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(gt, { tappable: !1, children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-cell-actions", "aria-label": "Готовлю рецепт", children: [
      /* @__PURE__ */ p.jsx(zh, { size: "m" }),
      /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "regular", children: "Айва пишет рецепт…" })
    ] }) }) }) : null,
    y ? /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(gt, { tappable: !1, children: /* @__PURE__ */ p.jsx(gt.Text, { title: "Рецепт не собрался", description: "Попробуй открыть блюдо ещё раз." }) }) }) : null,
    f?.ingredients?.length ? /* @__PURE__ */ p.jsx(pt.Item, { header: "Ингредиенты", children: f.ingredients.map((S) => /* @__PURE__ */ p.jsx(gt, { tappable: !1, children: /* @__PURE__ */ p.jsx(gt.Text, { title: S }) }, S)) }) : null,
    f?.steps?.length ? /* @__PURE__ */ p.jsx(pt.Item, { header: "Приготовление", children: f.steps.map((S, w) => /* @__PURE__ */ p.jsx(gt, { tappable: !1, children: /* @__PURE__ */ p.jsx(gt.Text, { title: `${w + 1}. ${S}` }) }, S)) }) : null,
    /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(gt, { tappable: !1, children: /* @__PURE__ */ p.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ p.jsx(
      Ft,
      {
        variant: "filled",
        label: c ? "Добавляю…" : "Добавить в дневник",
        isFill: !0,
        disabled: c,
        ...ce("Добавить в дневник", r)
      }
    ) }) }) })
  ] }) });
}
const ux = {
  foodSection: () => Pt("/api/section", { kind: "food" }),
  diary: () => Pt("/api/diary", {}),
  trainingSection: () => Pt("/api/section", { kind: "training" }),
  train: () => Pt("/api/train", {})
}, Gi = /* @__PURE__ */ new Map(), tr = /* @__PURE__ */ new Map(), er = (a) => Object.fromEntries(a.map((e) => [e, Gi.get(e) ?? null])), Dd = (a, { force: e = !1 } = {}) => {
  if (!e) {
    if (Gi.has(a)) return Promise.resolve(Gi.get(a));
    const s = tr.get(a);
    if (s) return s;
  }
  const l = ux[a]().catch(() => null).then((s) => (s && Gi.set(a, s), tr.get(a) === l && tr.delete(a), Gi.get(a) ?? null));
  return tr.set(a, l), l;
}, oj = () => {
  Object.keys(ux).forEach((a) => {
    Dd(a);
  });
};
function cx(a, e) {
  const [l, s] = E.useState(() => er(a)), r = E.useRef(!1), c = E.useCallback(async (...h) => {
    const y = h.length ? h : a;
    await Promise.all(y.map((m) => Dd(m, { force: !0 }))), s(er(a));
  }, [a]), f = E.useCallback((h, y) => {
    Gi.set(h, y), s(er(a));
  }, [a]);
  return E.useEffect(() => {
    let h = !0;
    const y = r.current;
    return r.current = !0, Promise.all(a.map((m) => Dd(m, { force: y }))).then(() => {
      h && s(er(a));
    }), () => {
      h = !1;
    };
  }, e), [l, c, f];
}
const rj = ["foodSection", "diary"], uj = "/assets/paper-food-placeholder.png", Wg = (a) => String(a || "").toLowerCase().replace(/ё/g, "е"), Ig = "?v=2", tv = (a, e) => {
  const l = Wg(e).trim();
  if (!a || !l) return null;
  const s = a[String(e || "").trim()];
  if (s) return s + Ig;
  let r = null, c = 0;
  for (const [f, h] of Object.entries(a)) {
    const y = Wg(f);
    if (y === l) return h;
    const m = y.split(/[^а-яa-z0-9]+/).filter((v) => v.length > 3);
    let g = 0;
    for (const v of m) l.includes(v.slice(0, 4)) && (g += v.length > 5 ? 2 : 1);
    g > c && (c = g, r = h);
  }
  return c >= 2 ? r + Ig : null;
}, cj = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"], fj = () => {
  const a = [];
  for (let e = 6; e >= 0; e -= 1) {
    const l = /* @__PURE__ */ new Date();
    l.setDate(l.getDate() - e);
    const s = `${l.getFullYear()}-${String(l.getMonth() + 1).padStart(2, "0")}-${String(l.getDate()).padStart(2, "0")}`;
    a.push({ iso: s, date: String(l.getDate()), label: cj[l.getDay()], today: e === 0 });
  }
  return a;
}, dj = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" });
function ev({ mode: a, revision: e = 0 }) {
  const [l, s, r] = cx(rj, [a, e]), [c, f] = E.useState({}), [h, y] = E.useState(""), [m, g] = E.useState(null), [v, b] = E.useState(null), [T, S] = E.useState(!1), [w, A] = E.useState(""), [_, M] = E.useState(null), [j, D] = E.useState(!1), B = E.useRef(null), V = !!l.foodSection && !(l.foodSection.menu?.meals || []).length, R = E.useRef(0);
  E.useEffect(() => {
    if (!V) {
      R.current = 0;
      return;
    }
    if (R.current >= 5) return;
    const rt = [1500, 3e3, 5e3, 9e3, 15e3][R.current], Mt = setTimeout(() => {
      R.current += 1, s("foodSection");
    }, rt);
    return () => clearTimeout(Mt);
  }, [V, l.foodSection]), E.useEffect(() => {
    fetch("/assets/food/manifest.json?v=2").then((rt) => rt.ok ? rt.json() : {}).then((rt) => f(rt || {})).catch(() => {
    });
  }, []);
  const k = () => s("diary");
  if (!l.foodSection || !l.diary) return /* @__PURE__ */ p.jsx(rx, { title: "Питание", variant: "food" });
  const P = l.foodSection, K = l.diary, it = K.totals || {}, et = K.target || {}, I = P.menu?.meals || [], nt = [
    { index: 0, value: "breakfast", label: "Завтрак" },
    { index: 1, value: "lunch", label: "Обед" },
    { index: I.length >= 4 ? 3 : 2, value: "dinner", label: "Ужин" }
  ].map((rt) => ({ ...rt, meal: I[rt.index] })).filter((rt) => rt.meal), O = Number(et.kcal || P.kcal || 0), Y = Number(it.kcal || 0), Q = (rt) => Number(it[rt] || 0), at = fj(), st = at[at.length - 1].iso, N = !!(h && h !== st), G = N ? m?.meals || [] : (K.meals || []).slice().reverse();
  let tt = "Прошедшие приёмы";
  if (N) {
    const rt = /* @__PURE__ */ new Date(`${h}T12:00:00`);
    tt = Number.isNaN(rt.getTime()) ? "Приёмы за день" : `Приёмы за ${dj.format(rt)}`;
  }
  const ot = async (rt) => {
    const Mt = typeof rt == "string" ? rt : rt?.iso || "";
    if (y(Mt), !Mt || Mt === st) {
      g(null);
      return;
    }
    g(null);
    const gn = await Pt("/api/diary", { d: Mt }).catch(() => null);
    g(gn || { meals: [] });
  }, dt = async (rt, Mt) => {
    if (!T) {
      S(!0);
      try {
        const gn = await Pt("/api/food_text", { text: rt.dish || rt.title, slot: Mt }).catch(() => null);
        gn?.ok ? (zt("Добавлено в дневник", { type: "success" }), b(null), await k()) : zt(gn?.message || "Не получилось добавить", { type: "error" });
      } finally {
        S(!1);
      }
    }
  }, ht = async (rt) => {
    const Mt = await Pt("/api/diary_del", { id: rt }).catch(() => null);
    Mt && !Mt.error && (r("diary", { meals: Mt.meals || [], totals: Mt.totals || {}, target: Mt.target || et }), zt("Приём удалён", { type: "success" }));
  }, vt = () => {
    M(null), A("add");
  }, Nt = async (rt) => {
    if (!(!rt || j)) {
      D(!0);
      try {
        const Mt = window.aiwaUploadFoodPhoto;
        if (typeof Mt != "function") throw new Error("Загрузка фото недоступна");
        await Mt(rt), await k();
      } catch (Mt) {
        zt(Mt.message || "Не получилось разобрать фото", { type: "error" });
      } finally {
        D(!1);
      }
    }
  }, _t = async () => {
    await Pt("/api/food_prompt", {}).catch(() => null), Ji({ nudge: !1 });
  }, Kt = [
    { label: "Фото", icon: /* @__PURE__ */ p.jsx(tA, {}), onSelect: () => B.current?.click() },
    { label: "Текстом", icon: /* @__PURE__ */ p.jsx(eA, {}), onSelect: _t }
  ];
  return /* @__PURE__ */ p.jsx(al, { children: /* @__PURE__ */ p.jsx(nl, { mode: "secondary", children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-paper-screen aiwa-food-screen", children: [
    /* @__PURE__ */ p.jsx(lt, { className: "aiwa-screen-title", variant: "title1", weight: "semibold", children: "Питание" }),
    /* @__PURE__ */ p.jsx(aj, { kcal: Y, kcalTarget: O }),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-macro-grid", children: [
      /* @__PURE__ */ p.jsx($f, { label: "Жиры", value: Q("fat"), target: et.fat, macro: "fat" }),
      /* @__PURE__ */ p.jsx($f, { label: "Белки", value: Q("protein"), target: et.protein, macro: "protein" }),
      /* @__PURE__ */ p.jsx($f, { label: "Углеводы", value: Q("carbs"), target: et.carbs, macro: "carbs" })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-screen-cta", children: [
      /* @__PURE__ */ p.jsx(
        ox,
        {
          items: Kt,
          trigger: /* @__PURE__ */ p.jsx(
            Ft,
            {
              variant: "filled",
              "aria-label": "Добавить приём",
              label: /* @__PURE__ */ p.jsxs("span", { className: "aiwa-btn-icon-label", children: [
                /* @__PURE__ */ p.jsx(kr, {}),
                " Добавить приём"
              ] })
            }
          )
        }
      ),
      /* @__PURE__ */ p.jsx(
        "input",
        {
          ref: B,
          type: "file",
          accept: "image/*",
          hidden: !0,
          onChange: (rt) => {
            Nt(rt.target.files?.[0]), rt.target.value = "";
          }
        }
      )
    ] }),
    /* @__PURE__ */ p.jsxs(pt, { className: "aiwa-tma-blocks", children: [
      /* @__PURE__ */ p.jsx(
        qr,
        {
          message: P.text || "Выбираем простую еду с белком в каждом приёме.",
          onDiscuss: () => Ji({ topic: "food" })
        }
      ),
      V ? /* @__PURE__ */ p.jsx(pt.Item, { header: "Меню на сегодня", children: /* @__PURE__ */ p.jsx(ue, { loading: !0, title: "Айва собирает меню…", description: "Завтрак, обед и ужин под фазу" }) }) : null,
      nt.length ? /* @__PURE__ */ p.jsx(pt.Item, { header: "Меню на сегодня", children: nt.map((rt) => /* @__PURE__ */ p.jsx(
        ue,
        {
          image: rt.meal.image || tv(c, rt.meal.dish) || uj,
          title: rt.meal.dish || "Рекомендация Айвы",
          description: [rt.label, rt.meal.kcal, rt.meal.note].filter(Boolean).join(" · "),
          onClick: () => b(rt)
        },
        rt.value
      )) }) : null,
      /* @__PURE__ */ p.jsxs(pt.Item, { header: tt, children: [
        /* @__PURE__ */ p.jsx("div", { className: "aiwa-food-history-week", children: /* @__PURE__ */ p.jsx(Vh, { days: at, selectedIso: h || st, onSelect: ot }) }),
        j ? /* @__PURE__ */ p.jsx(ue, { loading: !0, title: "Разбираю фото…", description: "Айва считает КБЖУ" }) : null,
        N && !m ? /* @__PURE__ */ p.jsx(ue, { loading: !0, title: "Загружаю…", description: "Дневник за выбранный день" }) : null,
        G.length ? G.map((rt) => /* @__PURE__ */ p.jsx(
          ue,
          {
            image: tv(c, rt.title) || dA,
            title: rt.title,
            description: `${jd(rt.kcal)} · Б${Math.round(rt.protein || 0)} · Ж${Math.round(rt.fat || 0)} · У${Math.round(rt.carbs || 0)}`,
            onClick: N ? void 0 : () => A("diary")
          },
          rt.id
        )) : j || N && !m ? null : /* @__PURE__ */ p.jsx(
          ue,
          {
            title: N ? "В этот день записей нет" : "Дневник пока пуст",
            description: N ? "Дневник за этот день пуст." : "Добавь первый приём — фото, текстом или вручную.",
            onClick: N ? void 0 : () => A("diary")
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ p.jsx(
      ij,
      {
        isOpen: w === "add",
        onClose: () => A(""),
        onSaved: k,
        editingMeal: _
      }
    ),
    /* @__PURE__ */ p.jsx(
      sj,
      {
        isOpen: !!v,
        meal: v?.meal,
        slotLabel: v?.label,
        busy: T,
        onClose: () => b(null),
        onAdd: () => v && dt(v.meal, v.value)
      }
    ),
    /* @__PURE__ */ p.jsx(
      lj,
      {
        isOpen: w === "diary",
        onClose: () => A(""),
        diary: K,
        onAdd: vt,
        onEdit: (rt) => {
          M(rt), A("add");
        },
        onDelete: ht,
        onReco: async () => {
          const rt = await Pt("/api/diary_reco", {}).catch(() => null);
          zt(rt?.text || "Не удалось собрать совет");
        }
      }
    )
  ] }) }) });
}
function hj({ isOpen: a, onClose: e, onSaved: l, suggested: s }) {
  const r = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), [c, f] = E.useState(r), [h, y] = E.useState("Силовая"), [m, g] = E.useState("45 мин"), [v, b] = E.useState("Нормально"), [T, S] = E.useState([]), [w, A] = E.useState({}), [_, M] = E.useState(""), [j, D] = E.useState(!1), [B, V] = E.useState(""), [R, k] = E.useState(null);
  E.useEffect(() => {
    if (!a) return;
    Qb("workout");
    const O = s?.name || "", Y = (s?.exercises || []).filter((st) => st?.name), Q = /ход|прогул/i.test(O) ? "Ходьба" : /йог|мобил|релиз|растяж/i.test(O) ? "Йога" : /кардио|бег|вело/i.test(O) ? "Кардио" : /плав/i.test(O) ? "Плавание" : "Силовая";
    y(Q), Y.length ? (S(Y.map((st) => st.name)), A(Object.fromEntries(Y.map((st) => [st.name, { sets: st.sets || "", reps: st.reps || "" }])))) : (S(O ? [O] : []), A({})), M("");
    const at = (s?.exercises || []).find((st) => st?.name)?.name;
    V(at && Object.keys(Ya).find((st) => Ya[st].includes(at)) || ""), k(null), f(r);
  }, [a, s, r]);
  const P = (O) => S((Y) => Y.includes(O) ? Y.filter((Q) => Q !== O) : [...Y, O]), K = h === "Силовая", it = (O) => Object.keys(Ya).find((Y) => Ya[Y].includes(O)) || null, et = (O, Y, Q) => A((at) => ({ ...at, [O]: { ...at[O], [Y]: Q } })), I = (O, Y) => {
    const Q = String(w[O]?.[Y] ?? "").replace(",", ".").trim(), at = Number(Q);
    return Q && Number.isFinite(at) && at > 0 ? at : null;
  }, J = async () => {
    const O = [...T, ..._.trim() ? [_.trim()] : []];
    D(!0);
    try {
      const Y = await Pt("/api/workout", {
        date: c,
        type: h,
        duration: m,
        rpe: v,
        items: O.map((Q) => ({
          name: Q,
          weight: K ? I(Q, "w") : null,
          sets: K ? I(Q, "sets") : null,
          reps: K ? I(Q, "reps") : null,
          group: K ? it(Q) : null
        }))
      });
      if (!Y?.ok) throw new Error(Y?.text || "Не получилось сохранить тренировку");
      await l(), k({ text: Y.review || "", calories: Y.calories || 0 });
    } catch (Y) {
      zt(Y.message || "Не получилось сохранить", { type: "error" });
    } finally {
      D(!1);
    }
  }, nt = (O) => /* @__PURE__ */ p.jsxs("div", { children: [
    /* @__PURE__ */ p.jsxs(
      Te,
      {
        as: "button",
        type: "button",
        mode: "opacity",
        className: "aiwa-exercise-row",
        "aria-pressed": T.includes(O),
        onClick: () => P(O),
        children: [
          /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "regular", children: O }),
          /* @__PURE__ */ p.jsx("span", { className: T.includes(O) ? "aiwa-check is-active" : "aiwa-check", children: T.includes(O) ? "✓" : "+" })
        ]
      }
    ),
    K && T.includes(O) ? /* @__PURE__ */ p.jsxs("div", { className: "aiwa-exercise-nums", children: [
      /* @__PURE__ */ p.jsx(
        "input",
        {
          inputMode: "decimal",
          placeholder: "кг",
          "aria-label": `${O}: вес`,
          value: w[O]?.w ?? "",
          onChange: (Y) => et(O, "w", Y.target.value)
        }
      ),
      /* @__PURE__ */ p.jsx(
        "input",
        {
          inputMode: "numeric",
          placeholder: "подходы",
          "aria-label": `${O}: подходы`,
          value: w[O]?.sets ?? "",
          onChange: (Y) => et(O, "sets", Y.target.value)
        }
      ),
      /* @__PURE__ */ p.jsx(
        "input",
        {
          inputMode: "numeric",
          placeholder: "повторы",
          "aria-label": `${O}: повторы`,
          value: w[O]?.reps ?? "",
          onChange: (Y) => et(O, "reps", Y.target.value)
        }
      )
    ] }) : null
  ] }, O);
  return R ? /* @__PURE__ */ p.jsx(yn, { isOpen: a, onClose: e, children: /* @__PURE__ */ p.jsx("div", { children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-sheet-card aiwa-workout-review", children: [
      /* @__PURE__ */ p.jsx(lt, { variant: "title2", weight: "semibold", children: "Тренировка сохранена" }),
      /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "regular", children: `Сожжено примерно ${R.calories} ккал.` }),
      R.text ? /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "regular", children: R.text }) : null
    ] }),
    /* @__PURE__ */ p.jsx(Ft, { variant: "filled", label: "Понятно", isFill: !0, ...ce("Закрыть разбор", e) })
  ] }) }) }) : /* @__PURE__ */ p.jsx(yn, { isOpen: a, onClose: e, children: /* @__PURE__ */ p.jsx("div", { children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ p.jsx(ne, { label: "Когда", type: "date", value: c, onChange: f }),
    /* @__PURE__ */ p.jsx(Ki, { label: "Что делала", options: mA, value: h, onChange: (O) => {
      y(O), S([]);
    } }),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-form-group", children: [
      /* @__PURE__ */ p.jsx(lt, { className: "aiwa-form-label", variant: "body", weight: "semibold", children: "Упражнения" }),
      /* @__PURE__ */ p.jsxs("div", { className: "aiwa-sheet-card", children: [
        K ? Object.keys(Ya).map((O) => {
          const Y = Ya[O].filter((at) => T.includes(at)).length, Q = B === O;
          return /* @__PURE__ */ p.jsxs("div", { children: [
            /* @__PURE__ */ p.jsxs(
              Te,
              {
                as: "button",
                type: "button",
                mode: "opacity",
                className: "aiwa-exercise-row aiwa-exercise-group",
                "aria-expanded": Q,
                onClick: () => V(Q ? "" : O),
                children: [
                  /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "semibold", children: O }),
                  /* @__PURE__ */ p.jsx(lt, { variant: "caption1", weight: "regular", children: Y ? `выбрано ${Y}` : Q ? "—" : "+" })
                ]
              }
            ),
            Q ? Ya[O].map(nt) : null
          ] }, O);
        }) : (pA[h] || []).map(nt),
        /* @__PURE__ */ p.jsx(ne, { label: "Добавить своё", value: _, onChange: M, placeholder: "Название упражнения" })
      ] })
    ] }),
    /* @__PURE__ */ p.jsx(Ki, { label: "Длительность", options: ["30 мин", "45 мин", "60+ мин"], value: m, onChange: g }),
    /* @__PURE__ */ p.jsx(Ki, { label: "Как ощущалось", options: ["Легко", "Нормально", "Тяжело"], value: v, onChange: b }),
    /* @__PURE__ */ p.jsx(
      Ft,
      {
        variant: "filled",
        label: j ? "Сохраняю…" : "Сохранить и разобрать",
        isFill: !0,
        disabled: j,
        ...ce("Сохранить и разобрать", J)
      }
    )
  ] }) }) });
}
function mj({ isOpen: a, onClose: e, options: l, onSelect: s }) {
  return /* @__PURE__ */ p.jsx(yn, { isOpen: a, onClose: e, children: /* @__PURE__ */ p.jsxs(pt, { className: "aiwa-tma-blocks", children: [
    /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(gt, { tappable: !1, children: /* @__PURE__ */ p.jsx(
      gt.Text,
      {
        title: "Рекомендация на сегодня",
        description: "Выбери вариант, после которого останется запас сил."
      }
    ) }) }),
    /* @__PURE__ */ p.jsx(pt.Item, { children: l.map((r, c) => /* @__PURE__ */ p.jsx(
      ue,
      {
        title: r.name || `Вариант ${c + 1}`,
        description: r.how || r.benefit || r.detail,
        onClick: () => s(r)
      },
      r.name || c
    )) })
  ] }) });
}
function pj({ isOpen: a, onClose: e, state: l, onAdd: s }) {
  const r = l?.today || [];
  return /* @__PURE__ */ p.jsx(yn, { isOpen: a, onClose: e, children: /* @__PURE__ */ p.jsxs(pt, { className: "aiwa-tma-blocks", children: [
    l?.last_review ? /* @__PURE__ */ p.jsx(
      qr,
      {
        message: l.last_review.text || l.last_review,
        onDiscuss: () => Ji({ topic: "train" })
      }
    ) : null,
    /* @__PURE__ */ p.jsx(pt.Item, { header: "Неделя", children: (l?.week || []).map((c) => /* @__PURE__ */ p.jsx(
      ue,
      {
        title: c.dow,
        description: c.count ? `${c.type || "Тренировка"} · ${c.count}` : "Без тренировки",
        muted: !c.count
      },
      c.d
    )) }),
    r.length ? /* @__PURE__ */ p.jsx(pt.Item, { header: "Сегодня", children: r.map((c) => /* @__PURE__ */ p.jsx(
      ue,
      {
        title: c.type || "Тренировка",
        description: `${c.duration || "—"} · ${String(c.rpe || "").toLowerCase()}`
      },
      c.id
    )) }) : null,
    /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(gt, { tappable: !1, children: /* @__PURE__ */ p.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ p.jsx(
      Ft,
      {
        variant: "filled",
        label: "Отметить тренировку",
        isFill: !0,
        ...ce("Отметить тренировку", s)
      }
    ) }) }) })
  ] }) });
}
function yj({ isOpen: a, onClose: e, profile: l, onSaved: s }) {
  const [r, c] = E.useState(l || {});
  E.useEffect(() => {
    a && c(l || {});
  }, [a, l]);
  const f = (y, m) => c((g) => ({ ...g, [y]: m })), h = async () => {
    (await Pt("/api/train_profile", r).catch(() => null))?.ok ? (zt("Тренировочный профиль сохранён", { type: "success" }), await s(), e()) : zt("Не получилось сохранить", { type: "error" });
  };
  return /* @__PURE__ */ p.jsx(yn, { isOpen: a, onClose: e, children: /* @__PURE__ */ p.jsx("div", { children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "regular", children: "Расскажи, чем занимаешься и что важно беречь. Айва учтёт это в рекомендациях и разборе нагрузки." }),
    /* @__PURE__ */ p.jsx(ne, { label: "Формат", value: r.format || "", onChange: (y) => f("format", y), placeholder: "Зал и прогулки" }),
    /* @__PURE__ */ p.jsx(ne, { label: "Цель", value: r.goal || "", onChange: (y) => f("goal", y), placeholder: "Тонус и больше энергии" }),
    /* @__PURE__ */ p.jsx(ne, { label: "Ограничения", value: r.limits || "", onChange: (y) => f("limits", y), placeholder: "Например, бережём поясницу" }),
    /* @__PURE__ */ p.jsx(Ft, { variant: "filled", label: "Сохранить", isFill: !0, ...ce("Сохранить профиль", h) })
  ] }) }) });
}
const gj = ["trainingSection", "train"], vj = (a) => {
  const e = a % 100, l = a % 10;
  return e >= 11 && e <= 14 ? "тренировок" : l === 1 ? "тренировка" : l >= 2 && l <= 4 ? "тренировки" : "тренировок";
}, bj = (a) => (a || []).map((e) => ({
  iso: e.d,
  date: String(e.d || "").slice(-2).replace(/^0/, ""),
  label: e.dow,
  today: !!e.today,
  workout: !!e.count
}));
function xj({ mode: a, revision: e = 0 }) {
  const [l, s] = cx(gj, [a, e]), [r, c] = E.useState(""), [f, h] = E.useState(null), y = () => s("train");
  if (!l.trainingSection || !l.train) return /* @__PURE__ */ p.jsx(rx, { title: "Нагрузка", variant: "activity" });
  const m = l.trainingSection, g = l.train, v = m.training || {}, b = (v.options || []).slice(0, 4), T = g.today || [], S = g.week || [], w = S.filter((M) => M.count).slice(-3).reverse(), A = S.reduce((M, j) => M + (j.count || 0), 0), _ = (M = null) => {
    h(M), c("workout");
  };
  return /* @__PURE__ */ p.jsx(al, { children: /* @__PURE__ */ p.jsx(nl, { mode: "secondary", children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-paper-screen aiwa-activity-screen", children: [
    /* @__PURE__ */ p.jsx(lt, { className: "aiwa-screen-title", variant: "title1", weight: "semibold", children: "Нагрузка" }),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-overview", children: [
      /* @__PURE__ */ p.jsx(Vh, { days: bj(S) }),
      /* @__PURE__ */ p.jsxs("div", { className: "aiwa-countdown", children: [
        /* @__PURE__ */ p.jsx(lt, { variant: "title1", weight: "semibold", children: A }),
        /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "regular", children: `${vj(A)} на этой неделе` })
      ] }),
      /* @__PURE__ */ p.jsx(
        Ft,
        {
          variant: "filled",
          label: /* @__PURE__ */ p.jsxs("span", { className: "aiwa-btn-icon-label", children: [
            /* @__PURE__ */ p.jsx(kr, {}),
            " Отметить тренировку"
          ] }),
          ...ce("Отметить тренировку", () => _())
        }
      )
    ] }),
    /* @__PURE__ */ p.jsxs(pt, { className: "aiwa-tma-blocks", children: [
      /* @__PURE__ */ p.jsx(
        qr,
        {
          message: v.summary || m.text || "Выбирай нагрузку, после которой станет легче, а не хуже.",
          detail: v.why,
          onDiscuss: () => Ji({ topic: "train" })
        }
      ),
      b.length ? /* @__PURE__ */ p.jsx(pt.Item, { header: "Варианты", children: b.map((M, j) => /* @__PURE__ */ p.jsx(
        ue,
        {
          title: [M.name || `Вариант ${j + 1}`, M.duration].filter(Boolean).join(" · "),
          description: [
            (M.exercises || []).map((D) => [D.name, D.sets && D.reps ? `${D.sets}×${D.reps}` : ""].filter(Boolean).join(" ")).join(", "),
            M.tip || M.benefit || M.how || M.detail
          ].filter(Boolean).join(" — "),
          onClick: () => _(M)
        },
        M.name || j
      )) }) : null,
      /* @__PURE__ */ p.jsx(pt.Item, { header: "Прошедшие тренировки", children: T.length ? T.slice().reverse().map((M) => /* @__PURE__ */ p.jsx(
        ue,
        {
          title: M.type || "Тренировка",
          description: [
            "сегодня",
            M.duration,
            M.kcal ? `${Math.round(M.kcal)} ккал` : "",
            String(M.rpe || "").toLowerCase()
          ].filter(Boolean).join(" · "),
          onClick: () => c("history")
        },
        M.id
      )) : w.length ? w.map((M) => /* @__PURE__ */ p.jsx(
        ue,
        {
          title: M.type || "Тренировка",
          description: `${M.d} · ${M.count} запись`,
          onClick: () => c("history")
        },
        M.d
      )) : /* @__PURE__ */ p.jsx(
        ue,
        {
          title: "История пока пуста",
          description: "Отметь первую тренировку — Айва подготовит разбор.",
          onClick: () => c("history")
        }
      ) }),
      /* @__PURE__ */ p.jsx(pt.Item, { children: /* @__PURE__ */ p.jsx(
        gt,
        {
          as: "button",
          type: "button",
          onClick: () => c("profile"),
          end: /* @__PURE__ */ p.jsx(gt.Part, { type: "Chevron" }),
          children: /* @__PURE__ */ p.jsx(gt.Text, { title: "Настроить тренировочный профиль", bold: !0 })
        }
      ) })
    ] }),
    /* @__PURE__ */ p.jsx(hj, { isOpen: r === "workout", onClose: () => c(""), onSaved: y, suggested: f }),
    /* @__PURE__ */ p.jsx(
      mj,
      {
        isOpen: r === "variants",
        onClose: () => c(""),
        options: b,
        onSelect: (M) => _(M)
      }
    ),
    /* @__PURE__ */ p.jsx(pj, { isOpen: r === "history", onClose: () => c(""), state: g, onAdd: () => _() }),
    /* @__PURE__ */ p.jsx(yj, { isOpen: r === "profile", onClose: () => c(""), profile: g.profile, onSaved: y })
  ] }) }) });
}
function Sj({ initialMessages: a = [] }) {
  const [e, l] = E.useState(() => a.map((S, w) => ({
    id: `initial-${w}`,
    role: S.role === "user" ? "user" : "assistant",
    text: S.text || "",
    suggestions: []
  }))), [s, r] = E.useState(""), [c, f] = E.useState(!1), [h, y] = E.useState(!1), m = Qf.useRef(null), g = Qf.useRef(null);
  E.useEffect(() => {
    e.length || l([{
      id: "hello",
      role: "assistant",
      text: "Привет! Спроси меня о цикле, питании, тренировках или самочувствии. Я отвечу с учётом твоих данных.",
      suggestions: ["Можно ли тренироваться?", "Что съесть сегодня?", "Как моё самочувствие?"]
    }]);
  }, []), E.useEffect(() => {
    g.current?.scrollIntoView({ block: "end" });
  }, [e, c]);
  const v = async (S = s) => {
    const w = String(S || "").trim();
    if (!w || c) return;
    r(""), l((_) => [..._, { id: `user-${Date.now()}`, role: "user", text: w, suggestions: [] }]), f(!0);
    const A = await Pt("/api/chat", { message: w }).catch(() => null);
    l((_) => [..._, {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      text: A?.answer || "Не получилось ответить, попробуй ещё раз.",
      suggestions: A?.suggestions || []
    }]), f(!1);
  }, b = async (S, w) => {
    f(!0);
    const A = new FormData();
    A.append("initData", window.aiwaInit || ""), A.append("audio", S, w?.includes("mp4") ? "voice.mp4" : "voice.webm");
    try {
      const M = await (await fetch("/api/voice", { method: "POST", body: A })).json();
      M.transcript && l((j) => [...j, { id: `voice-${Date.now()}`, role: "user", text: M.transcript, suggestions: [] }]), l((j) => [...j, {
        id: `voice-answer-${Date.now()}`,
        role: "assistant",
        text: M.answer || "Не получилось распознать голос.",
        suggestions: M.suggestions || []
      }]);
    } catch {
      zt("Не получилось отправить голос", { type: "error" });
    } finally {
      f(!1);
    }
  }, T = async () => {
    if (h) {
      m.current?.stop();
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      zt("Голос недоступен в этом клиенте", { type: "error" });
      return;
    }
    try {
      const S = await navigator.mediaDevices.getUserMedia({ audio: !0 }), w = [], A = new MediaRecorder(S);
      m.current = A, A.ondataavailable = (_) => {
        _.data?.size && w.push(_.data);
      }, A.onstop = () => {
        y(!1), S.getTracks().forEach((M) => M.stop());
        const _ = new Blob(w, { type: A.mimeType || "audio/webm" });
        _.size > 900 && b(_, A.mimeType);
      }, A.start(), y(!0);
    } catch {
      zt("Нет доступа к микрофону", { type: "error" });
    }
  };
  return /* @__PURE__ */ p.jsx(al, { children: /* @__PURE__ */ p.jsx(nl, { mode: "secondary", children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-chat-screen", children: [
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-chat-header", children: [
      /* @__PURE__ */ p.jsx(kh, { size: 50, frames: Uh, pauseMs: 0 }),
      /* @__PURE__ */ p.jsxs("div", { children: [
        /* @__PURE__ */ p.jsx(lt, { variant: "title3", weight: "semibold", children: "Айва" }),
        /* @__PURE__ */ p.jsx(lt, { variant: "caption1", weight: "regular", children: "учитывает твои данные" })
      ] }),
      /* @__PURE__ */ p.jsx(Te, { as: "button", type: "button", mode: "opacity", className: "aiwa-sheet-close", "aria-label": "Закрыть чат", onClick: () => pn("go", "today"), children: /* @__PURE__ */ p.jsx(Pb, {}) })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-chat-messages", children: [
      e.map((S) => /* @__PURE__ */ p.jsxs("div", { className: S.role === "user" ? "aiwa-chat-bubble is-user" : "aiwa-chat-bubble is-ai", children: [
        /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "regular", children: S.text }),
        S.suggestions?.length ? /* @__PURE__ */ p.jsx("div", { className: "aiwa-chat-suggestions", children: S.suggestions.slice(0, 3).map((w) => /* @__PURE__ */ p.jsx(Te, { as: "button", type: "button", mode: "opacity", onClick: () => v(w), children: /* @__PURE__ */ p.jsx(lt, { variant: "caption1", weight: "semibold", children: w }) }, w)) }) : null
      ] }, S.id)),
      c ? /* @__PURE__ */ p.jsx("div", { className: "aiwa-chat-bubble is-ai", children: /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "regular", children: "Айва думает…" }) }) : null,
      /* @__PURE__ */ p.jsx("span", { ref: g })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-chat-composer", children: [
      /* @__PURE__ */ p.jsx(
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
      /* @__PURE__ */ p.jsx(Te, { as: "button", type: "button", mode: "opacity", className: h ? "aiwa-chat-icon is-recording" : "aiwa-chat-icon", "aria-label": "Голос", onClick: T, children: /* @__PURE__ */ p.jsx(lt, { variant: "body", weight: "semibold", children: h ? "■" : "Голос" }) }),
      /* @__PURE__ */ p.jsx(Te, { as: "button", type: "button", mode: "opacity", className: "aiwa-chat-send", "aria-label": "Отправить", onClick: () => v(), children: /* @__PURE__ */ p.jsx(lt, { variant: "title3", weight: "semibold", children: "↑" }) })
    ] })
  ] }) }) });
}
const Gf = [
  { id: "today", label: "Главная", icon: /* @__PURE__ */ p.jsx(QE, {}) },
  { id: "food", label: "Питание", icon: /* @__PURE__ */ p.jsx(WE, {}) },
  { id: "train", label: "Нагрузка", icon: /* @__PURE__ */ p.jsx(IE, {}) }
];
function wj({ active: a }) {
  const e = a === "stats" ? "today" : a, l = Math.max(0, Gf.findIndex((s) => s.id === e));
  return /* @__PURE__ */ p.jsx(al, { children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-nav-root", "data-aiwa-nav": "true", children: [
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-nav-tabbar-layer", children: /* @__PURE__ */ p.jsx(
      XE,
      {
        tabs: Gf.map(({ label: s, icon: r }) => ({ label: s, icon: r })),
        defaultIndex: l,
        onChange: (s) => pn("go", Gf[s].id)
      }
    ) }),
    /* @__PURE__ */ p.jsx(
      Te,
      {
        as: "button",
        type: "button",
        mode: "opacity",
        className: "aiwa-nav-mascot",
        "aria-label": "Открыть Айву",
        onClick: () => Ji(),
        children: /* @__PURE__ */ p.jsx(kh, { size: 67 })
      }
    )
  ] }) });
}
let Ka = null, Yf = null, Za = null, ss = "", Nd = !1, Od = 0, Xf = null, nv = null, ns = null, Pf = null, nr = {}, ar = 0, Kf = null, av = null, iv = {}, lv = 0, Zf = null, sv = null;
const Xa = () => {
  !Ka || !Za || Ka.render(
    /* @__PURE__ */ p.jsx(
      WA,
      {
        ...Za,
        panel: ss,
        panelRevision: Od,
        profileOpen: Nd,
        onPanelClose: () => zd.closePanel(),
        onProfileClose: () => zd.closeProfile()
      }
    )
  );
}, zd = {
  renderHome(a, e) {
    a && (Yf !== a && (Ka?.unmount(), Yf = a, Ka = Ui.createRoot(a)), Za = e, ss = e.panel || ss, Xa());
  },
  patchHome(a) {
    !Ka || !Za || (Za = { ...Za, ...a }, Xa());
  },
  openPanel(a) {
    ss = a, window.HOME_PANEL = a, Od += 1, Xa();
  },
  closePanel() {
    ss = "", window.HOME_PANEL = "", Xa();
  },
  openProfile() {
    Nd = !0, Xa();
  },
  closeProfile() {
    Nd = !1, Xa();
  },
  refreshPanel() {
    Od += 1, Xa();
  },
  unmountHome() {
    Ka?.unmount(), Ka = null, Yf = null, Za = null;
  },
  // Повторный вызов для уже смонтированного экрана = «перечитай данные»:
  // так host сбрасывает loadedFood/loadedTrain после правок профиля.
  renderFood(a, e = {}) {
    a && (Pf !== a ? (ns?.unmount(), Pf = a, ns = Ui.createRoot(a)) : ar += 1, nr = e, ns.render(/* @__PURE__ */ p.jsx(ev, { ...nr, revision: ar })));
  },
  renderActivity(a, e = {}) {
    a && (av !== a ? (Kf?.unmount(), av = a, Kf = Ui.createRoot(a)) : lv += 1, iv = e, Kf.render(/* @__PURE__ */ p.jsx(xj, { ...iv, revision: lv })));
  },
  renderChat(a, e = {}) {
    a && (sv !== a && (Zf?.unmount(), sv = a, Zf = Ui.createRoot(a)), Zf.render(/* @__PURE__ */ p.jsx(Sj, { initialMessages: e.messages || [] })));
  },
  refreshFood() {
    !Pf || !ns || (ar += 1, ns.render(/* @__PURE__ */ p.jsx(ev, { ...nr, mode: ae("aiwaMode") || nr.mode, revision: ar })));
  },
  /** Прогрев данных «Питания» и «Нагрузки» на старте — чтобы табы открывались сразу. */
  prefetch() {
    oj();
  },
  renderNav(a, e) {
    a && (nv !== a && (Xf?.unmount(), nv = a, Xf = Ui.createRoot(a)), Xf.render(/* @__PURE__ */ p.jsx(wj, { active: e })));
  }
};
function Tj() {
  window.AiwaDeslop = zd, lA(), window.dispatchEvent(new CustomEvent("aiwa:deslop-ready"));
}
Tj();
export {
  k3 as R,
  bs as a,
  Z3 as b,
  zr as c,
  L3 as g,
  p as j,
  E as r
};
