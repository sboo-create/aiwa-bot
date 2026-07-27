function N3(a, e) {
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
function O3(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var nf = { exports: {} }, Fl = {};
var k0;
function z3() {
  if (k0) return Fl;
  k0 = 1;
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
var H0;
function L3() {
  return H0 || (H0 = 1, nf.exports = z3()), nf.exports;
}
var p = L3(), af = { exports: {} }, vt = {};
var q0;
function B3() {
  if (q0) return vt;
  q0 = 1;
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
  }, w = Object.assign, E = {};
  function _(N, Y, tt) {
    this.props = N, this.context = Y, this.refs = E, this.updater = tt || S;
  }
  _.prototype.isReactComponent = {}, _.prototype.setState = function(N, Y) {
    if (typeof N != "object" && typeof N != "function" && N != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, N, Y, "setState");
  }, _.prototype.forceUpdate = function(N) {
    this.updater.enqueueForceUpdate(this, N, "forceUpdate");
  };
  function M() {
  }
  M.prototype = _.prototype;
  function j(N, Y, tt) {
    this.props = N, this.context = Y, this.refs = E, this.updater = tt || S;
  }
  var R = j.prototype = new M();
  R.constructor = j, w(R, _.prototype), R.isPureReactComponent = !0;
  var B = Array.isArray;
  function L() {
  }
  var D = { H: null, A: null, T: null, S: null }, k = Object.prototype.hasOwnProperty;
  function P(N, Y, tt) {
    var lt = tt.ref;
    return {
      $$typeof: a,
      type: N,
      key: Y,
      ref: lt !== void 0 ? lt : null,
      props: tt
    };
  }
  function H(N, Y) {
    return P(N.type, Y, N.props);
  }
  function I(N) {
    return typeof N == "object" && N !== null && N.$$typeof === a;
  }
  function K(N) {
    var Y = { "=": "=0", ":": "=2" };
    return "$" + N.replace(/[=:]/g, function(tt) {
      return Y[tt];
    });
  }
  var Q = /\/+/g;
  function at(N, Y) {
    return typeof N == "object" && N !== null && N.key != null ? K("" + N.key) : Y.toString(36);
  }
  function ot(N) {
    switch (N.status) {
      case "fulfilled":
        return N.value;
      case "rejected":
        throw N.reason;
      default:
        switch (typeof N.status == "string" ? N.then(L, L) : (N.status = "pending", N.then(
          function(Y) {
            N.status === "pending" && (N.status = "fulfilled", N.value = Y);
          },
          function(Y) {
            N.status === "pending" && (N.status = "rejected", N.reason = Y);
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
  function V(N, Y, tt, lt, dt) {
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
              return gt = N._init, V(
                gt(N._payload),
                Y,
                tt,
                lt,
                dt
              );
          }
      }
    if (gt)
      return dt = dt(N), gt = lt === "" ? "." + at(N, 0) : lt, B(dt) ? (tt = "", gt != null && (tt = gt.replace(Q, "$&/") + "/"), V(dt, Y, tt, "", function(Tt) {
        return Tt;
      })) : dt != null && (I(dt) && (dt = H(
        dt,
        tt + (dt.key == null || N && N.key === dt.key ? "" : ("" + dt.key).replace(
          Q,
          "$&/"
        ) + "/") + gt
      )), Y.push(dt)), 1;
    gt = 0;
    var Rt = lt === "" ? "." : lt + ":";
    if (B(N))
      for (var it = 0; it < N.length; it++)
        lt = N[it], ht = Rt + at(lt, it), gt += V(
          lt,
          Y,
          tt,
          ht,
          dt
        );
    else if (it = T(N), typeof it == "function")
      for (N = it.call(N), it = 0; !(lt = N.next()).done; )
        lt = lt.value, ht = Rt + at(lt, it++), gt += V(
          lt,
          Y,
          tt,
          ht,
          dt
        );
    else if (ht === "object") {
      if (typeof N.then == "function")
        return V(
          ot(N),
          Y,
          tt,
          lt,
          dt
        );
      throw Y = String(N), Error(
        "Objects are not valid as a React child (found: " + (Y === "[object Object]" ? "object with keys {" + Object.keys(N).join(", ") + "}" : Y) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return gt;
  }
  function J(N, Y, tt) {
    if (N == null) return N;
    var lt = [], dt = 0;
    return V(N, lt, "", "", function(ht) {
      return Y.call(tt, ht, dt++);
    }), lt;
  }
  function et(N) {
    if (N._status === -1) {
      var Y = N._result;
      Y = Y(), Y.then(
        function(tt) {
          (N._status === 0 || N._status === -1) && (N._status = 1, N._result = tt);
        },
        function(tt) {
          (N._status === 0 || N._status === -1) && (N._status = 2, N._result = tt);
        }
      ), N._status === -1 && (N._status = 0, N._result = Y);
    }
    if (N._status === 1) return N._result.default;
    throw N._result;
  }
  var nt = typeof reportError == "function" ? reportError : function(N) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var Y = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof N == "object" && N !== null && typeof N.message == "string" ? String(N.message) : String(N),
        error: N
      });
      if (!window.dispatchEvent(Y)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", N);
      return;
    }
    console.error(N);
  }, ut = {
    map: J,
    forEach: function(N, Y, tt) {
      J(
        N,
        function() {
          Y.apply(this, arguments);
        },
        tt
      );
    },
    count: function(N) {
      var Y = 0;
      return J(N, function() {
        Y++;
      }), Y;
    },
    toArray: function(N) {
      return J(N, function(Y) {
        return Y;
      }) || [];
    },
    only: function(N) {
      if (!I(N))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return N;
    }
  };
  return vt.Activity = v, vt.Children = ut, vt.Component = _, vt.Fragment = l, vt.Profiler = r, vt.PureComponent = j, vt.StrictMode = s, vt.Suspense = y, vt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = D, vt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(N) {
      return D.H.useMemoCache(N);
    }
  }, vt.cache = function(N) {
    return function() {
      return N.apply(null, arguments);
    };
  }, vt.cacheSignal = function() {
    return null;
  }, vt.cloneElement = function(N, Y, tt) {
    if (N == null)
      throw Error(
        "The argument must be a React element, but you passed " + N + "."
      );
    var lt = w({}, N.props), dt = N.key;
    if (Y != null)
      for (ht in Y.key !== void 0 && (dt = "" + Y.key), Y)
        !k.call(Y, ht) || ht === "key" || ht === "__self" || ht === "__source" || ht === "ref" && Y.ref === void 0 || (lt[ht] = Y[ht]);
    var ht = arguments.length - 2;
    if (ht === 1) lt.children = tt;
    else if (1 < ht) {
      for (var gt = Array(ht), Rt = 0; Rt < ht; Rt++)
        gt[Rt] = arguments[Rt + 2];
      lt.children = gt;
    }
    return P(N.type, dt, lt);
  }, vt.createContext = function(N) {
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
  }, vt.createElement = function(N, Y, tt) {
    var lt, dt = {}, ht = null;
    if (Y != null)
      for (lt in Y.key !== void 0 && (ht = "" + Y.key), Y)
        k.call(Y, lt) && lt !== "key" && lt !== "__self" && lt !== "__source" && (dt[lt] = Y[lt]);
    var gt = arguments.length - 2;
    if (gt === 1) dt.children = tt;
    else if (1 < gt) {
      for (var Rt = Array(gt), it = 0; it < gt; it++)
        Rt[it] = arguments[it + 2];
      dt.children = Rt;
    }
    if (N && N.defaultProps)
      for (lt in gt = N.defaultProps, gt)
        dt[lt] === void 0 && (dt[lt] = gt[lt]);
    return P(N, ht, dt);
  }, vt.createRef = function() {
    return { current: null };
  }, vt.forwardRef = function(N) {
    return { $$typeof: h, render: N };
  }, vt.isValidElement = I, vt.lazy = function(N) {
    return {
      $$typeof: g,
      _payload: { _status: -1, _result: N },
      _init: et
    };
  }, vt.memo = function(N, Y) {
    return {
      $$typeof: m,
      type: N,
      compare: Y === void 0 ? null : Y
    };
  }, vt.startTransition = function(N) {
    var Y = D.T, tt = {};
    D.T = tt;
    try {
      var lt = N(), dt = D.S;
      dt !== null && dt(tt, lt), typeof lt == "object" && lt !== null && typeof lt.then == "function" && lt.then(L, nt);
    } catch (ht) {
      nt(ht);
    } finally {
      Y !== null && tt.types !== null && (Y.types = tt.types), D.T = Y;
    }
  }, vt.unstable_useCacheRefresh = function() {
    return D.H.useCacheRefresh();
  }, vt.use = function(N) {
    return D.H.use(N);
  }, vt.useActionState = function(N, Y, tt) {
    return D.H.useActionState(N, Y, tt);
  }, vt.useCallback = function(N, Y) {
    return D.H.useCallback(N, Y);
  }, vt.useContext = function(N) {
    return D.H.useContext(N);
  }, vt.useDebugValue = function() {
  }, vt.useDeferredValue = function(N, Y) {
    return D.H.useDeferredValue(N, Y);
  }, vt.useEffect = function(N, Y) {
    return D.H.useEffect(N, Y);
  }, vt.useEffectEvent = function(N) {
    return D.H.useEffectEvent(N);
  }, vt.useId = function() {
    return D.H.useId();
  }, vt.useImperativeHandle = function(N, Y, tt) {
    return D.H.useImperativeHandle(N, Y, tt);
  }, vt.useInsertionEffect = function(N, Y) {
    return D.H.useInsertionEffect(N, Y);
  }, vt.useLayoutEffect = function(N, Y) {
    return D.H.useLayoutEffect(N, Y);
  }, vt.useMemo = function(N, Y) {
    return D.H.useMemo(N, Y);
  }, vt.useOptimistic = function(N, Y) {
    return D.H.useOptimistic(N, Y);
  }, vt.useReducer = function(N, Y, tt) {
    return D.H.useReducer(N, Y, tt);
  }, vt.useRef = function(N) {
    return D.H.useRef(N);
  }, vt.useState = function(N) {
    return D.H.useState(N);
  }, vt.useSyncExternalStore = function(N, Y, tt) {
    return D.H.useSyncExternalStore(
      N,
      Y,
      tt
    );
  }, vt.useTransition = function() {
    return D.H.useTransition();
  }, vt.version = "19.2.7", vt;
}
var $0;
function gs() {
  return $0 || ($0 = 1, af.exports = B3()), af.exports;
}
var A = gs();
const Kf = /* @__PURE__ */ O3(A), V3 = /* @__PURE__ */ N3({
  __proto__: null,
  default: Kf
}, [A]);
var lf = { exports: {} }, Jl = {}, sf = { exports: {} }, of = {};
var G0;
function U3() {
  return G0 || (G0 = 1, (function(a) {
    function e(V, J) {
      var et = V.length;
      V.push(J);
      t: for (; 0 < et; ) {
        var nt = et - 1 >>> 1, ut = V[nt];
        if (0 < r(ut, J))
          V[nt] = J, V[et] = ut, et = nt;
        else break t;
      }
    }
    function l(V) {
      return V.length === 0 ? null : V[0];
    }
    function s(V) {
      if (V.length === 0) return null;
      var J = V[0], et = V.pop();
      if (et !== J) {
        V[0] = et;
        t: for (var nt = 0, ut = V.length, N = ut >>> 1; nt < N; ) {
          var Y = 2 * (nt + 1) - 1, tt = V[Y], lt = Y + 1, dt = V[lt];
          if (0 > r(tt, et))
            lt < ut && 0 > r(dt, tt) ? (V[nt] = dt, V[lt] = et, nt = lt) : (V[nt] = tt, V[Y] = et, nt = Y);
          else if (lt < ut && 0 > r(dt, et))
            V[nt] = dt, V[lt] = et, nt = lt;
          else break t;
        }
      }
      return J;
    }
    function r(V, J) {
      var et = V.sortIndex - J.sortIndex;
      return et !== 0 ? et : V.id - J.id;
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
    var y = [], m = [], g = 1, v = null, b = 3, T = !1, S = !1, w = !1, E = !1, _ = typeof setTimeout == "function" ? setTimeout : null, M = typeof clearTimeout == "function" ? clearTimeout : null, j = typeof setImmediate < "u" ? setImmediate : null;
    function R(V) {
      for (var J = l(m); J !== null; ) {
        if (J.callback === null) s(m);
        else if (J.startTime <= V)
          s(m), J.sortIndex = J.expirationTime, e(y, J);
        else break;
        J = l(m);
      }
    }
    function B(V) {
      if (w = !1, R(V), !S)
        if (l(y) !== null)
          S = !0, L || (L = !0, K());
        else {
          var J = l(m);
          J !== null && ot(B, J.startTime - V);
        }
    }
    var L = !1, D = -1, k = 5, P = -1;
    function H() {
      return E ? !0 : !(a.unstable_now() - P < k);
    }
    function I() {
      if (E = !1, L) {
        var V = a.unstable_now();
        P = V;
        var J = !0;
        try {
          t: {
            S = !1, w && (w = !1, M(D), D = -1), T = !0;
            var et = b;
            try {
              e: {
                for (R(V), v = l(y); v !== null && !(v.expirationTime > V && H()); ) {
                  var nt = v.callback;
                  if (typeof nt == "function") {
                    v.callback = null, b = v.priorityLevel;
                    var ut = nt(
                      v.expirationTime <= V
                    );
                    if (V = a.unstable_now(), typeof ut == "function") {
                      v.callback = ut, R(V), J = !0;
                      break e;
                    }
                    v === l(y) && s(y), R(V);
                  } else s(y);
                  v = l(y);
                }
                if (v !== null) J = !0;
                else {
                  var N = l(m);
                  N !== null && ot(
                    B,
                    N.startTime - V
                  ), J = !1;
                }
              }
              break t;
            } finally {
              v = null, b = et, T = !1;
            }
            J = void 0;
          }
        } finally {
          J ? K() : L = !1;
        }
      }
    }
    var K;
    if (typeof j == "function")
      K = function() {
        j(I);
      };
    else if (typeof MessageChannel < "u") {
      var Q = new MessageChannel(), at = Q.port2;
      Q.port1.onmessage = I, K = function() {
        at.postMessage(null);
      };
    } else
      K = function() {
        _(I, 0);
      };
    function ot(V, J) {
      D = _(function() {
        V(a.unstable_now());
      }, J);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(V) {
      V.callback = null;
    }, a.unstable_forceFrameRate = function(V) {
      0 > V || 125 < V ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : k = 0 < V ? Math.floor(1e3 / V) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return b;
    }, a.unstable_next = function(V) {
      switch (b) {
        case 1:
        case 2:
        case 3:
          var J = 3;
          break;
        default:
          J = b;
      }
      var et = b;
      b = J;
      try {
        return V();
      } finally {
        b = et;
      }
    }, a.unstable_requestPaint = function() {
      E = !0;
    }, a.unstable_runWithPriority = function(V, J) {
      switch (V) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          V = 3;
      }
      var et = b;
      b = V;
      try {
        return J();
      } finally {
        b = et;
      }
    }, a.unstable_scheduleCallback = function(V, J, et) {
      var nt = a.unstable_now();
      switch (typeof et == "object" && et !== null ? (et = et.delay, et = typeof et == "number" && 0 < et ? nt + et : nt) : et = nt, V) {
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
      return ut = et + ut, V = {
        id: g++,
        callback: J,
        priorityLevel: V,
        startTime: et,
        expirationTime: ut,
        sortIndex: -1
      }, et > nt ? (V.sortIndex = et, e(m, V), l(y) === null && V === l(m) && (w ? (M(D), D = -1) : w = !0, ot(B, et - nt))) : (V.sortIndex = ut, e(y, V), S || T || (S = !0, L || (L = !0, K()))), V;
    }, a.unstable_shouldYield = H, a.unstable_wrapCallback = function(V) {
      var J = b;
      return function() {
        var et = b;
        b = J;
        try {
          return V.apply(this, arguments);
        } finally {
          b = et;
        }
      };
    };
  })(of)), of;
}
var Y0;
function k3() {
  return Y0 || (Y0 = 1, sf.exports = U3()), sf.exports;
}
var rf = { exports: {} }, we = {};
var X0;
function H3() {
  if (X0) return we;
  X0 = 1;
  var a = gs();
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
  return we.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, we.createPortal = function(y, m) {
    var g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11)
      throw Error(e(299));
    return c(y, m, null, g);
  }, we.flushSync = function(y) {
    var m = f.T, g = s.p;
    try {
      if (f.T = null, s.p = 2, y) return y();
    } finally {
      f.T = m, s.p = g, s.d.f();
    }
  }, we.preconnect = function(y, m) {
    typeof y == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, s.d.C(y, m));
  }, we.prefetchDNS = function(y) {
    typeof y == "string" && s.d.D(y);
  }, we.preinit = function(y, m) {
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
  }, we.preinitModule = function(y, m) {
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
  }, we.preload = function(y, m) {
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
  }, we.preloadModule = function(y, m) {
    if (typeof y == "string")
      if (m) {
        var g = h(m.as, m.crossOrigin);
        s.d.m(y, {
          as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
          crossOrigin: g,
          integrity: typeof m.integrity == "string" ? m.integrity : void 0
        });
      } else s.d.m(y);
  }, we.requestFormReset = function(y) {
    s.d.r(y);
  }, we.unstable_batchedUpdates = function(y, m) {
    return y(m);
  }, we.useFormState = function(y, m, g) {
    return f.H.useFormState(y, m, g);
  }, we.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, we.version = "19.2.7", we;
}
var P0;
function lv() {
  if (P0) return rf.exports;
  P0 = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (e) {
        console.error(e);
      }
  }
  return a(), rf.exports = H3(), rf.exports;
}
var K0;
function q3() {
  if (K0) return Jl;
  K0 = 1;
  var a = k3(), e = gs(), l = lv();
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
  var v = Object.assign, b = Symbol.for("react.element"), T = Symbol.for("react.transitional.element"), S = Symbol.for("react.portal"), w = Symbol.for("react.fragment"), E = Symbol.for("react.strict_mode"), _ = Symbol.for("react.profiler"), M = Symbol.for("react.consumer"), j = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), B = Symbol.for("react.suspense"), L = Symbol.for("react.suspense_list"), D = Symbol.for("react.memo"), k = Symbol.for("react.lazy"), P = Symbol.for("react.activity"), H = Symbol.for("react.memo_cache_sentinel"), I = Symbol.iterator;
  function K(t) {
    return t === null || typeof t != "object" ? null : (t = I && t[I] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var Q = Symbol.for("react.client.reference");
  function at(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === Q ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case w:
        return "Fragment";
      case _:
        return "Profiler";
      case E:
        return "StrictMode";
      case B:
        return "Suspense";
      case L:
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
        case R:
          var n = t.render;
          return t = t.displayName, t || (t = n.displayName || n.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case D:
          return n = t.displayName || null, n !== null ? n : at(t.type) || "Memo";
        case k:
          n = t._payload, t = t._init;
          try {
            return at(t(n));
          } catch {
          }
      }
    return null;
  }
  var ot = Array.isArray, V = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, J = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, et = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, nt = [], ut = -1;
  function N(t) {
    return { current: t };
  }
  function Y(t) {
    0 > ut || (t.current = nt[ut], nt[ut] = null, ut--);
  }
  function tt(t, n) {
    ut++, nt[ut] = t.current, t.current = n;
  }
  var lt = N(null), dt = N(null), ht = N(null), gt = N(null);
  function Rt(t, n) {
    switch (tt(ht, n), tt(dt, t), tt(lt, null), n.nodeType) {
      case 9:
      case 11:
        t = (t = n.documentElement) && (t = t.namespaceURI) ? r0(t) : 0;
        break;
      default:
        if (t = n.tagName, n = n.namespaceURI)
          n = r0(n), t = u0(n, t);
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
    Y(lt), tt(lt, t);
  }
  function it() {
    Y(lt), Y(dt), Y(ht);
  }
  function Tt(t) {
    t.memoizedState !== null && tt(gt, t);
    var n = lt.current, i = u0(n, t.type);
    n !== i && (tt(dt, t), tt(lt, i));
  }
  function Gt(t) {
    dt.current === t && (Y(lt), Y(dt)), gt.current === t && (Y(gt), Pl._currentValue = et);
  }
  var je, el;
  function En(t) {
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
                  var G = X;
                }
                Reflect.construct(t, [], W);
              } else {
                try {
                  W.call();
                } catch (X) {
                  G = X;
                }
                t.call(W.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (X) {
                G = X;
              }
              (W = t()) && typeof W.catch == "function" && W.catch(function() {
              });
            }
          } catch (X) {
            if (X && G && typeof X.stack == "string")
              return [X.stack, G.stack];
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
`), $ = C.split(`
`);
        for (u = o = 0; o < O.length && !O[o].includes("DetermineComponentFrameRoot"); )
          o++;
        for (; u < $.length && !$[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (o === O.length || u === $.length)
          for (o = O.length - 1, u = $.length - 1; 1 <= o && 0 <= u && O[o] !== $[u]; )
            u--;
        for (; 1 <= o && 0 <= u; o--, u--)
          if (O[o] !== $[u]) {
            if (o !== 1 || u !== 1)
              do
                if (o--, u--, 0 > u || O[o] !== $[u]) {
                  var Z = `
` + O[o].replace(" at new ", " at ");
                  return t.displayName && Z.includes("<anonymous>") && (Z = Z.replace("<anonymous>", t.displayName)), Z;
                }
              while (1 <= o && 0 <= u);
            break;
          }
      }
    } finally {
      nl = !1, Error.prepareStackTrace = i;
    }
    return (i = t ? t.displayName || t.name : "") ? En(i) : "";
  }
  function ux(t, n) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return En(t.type);
      case 16:
        return En("Lazy");
      case 13:
        return t.child !== n && n !== null ? En("Suspense Fallback") : En("Suspense");
      case 19:
        return En("SuspenseList");
      case 0:
      case 15:
        return al(t.type, !1);
      case 11:
        return al(t.type.render, !1);
      case 1:
        return al(t.type, !0);
      case 31:
        return En("Activity");
      default:
        return "";
    }
  }
  function kh(t) {
    try {
      var n = "", i = null;
      do
        n += ux(t, i), i = t, t = t.return;
      while (t);
      return n;
    } catch (o) {
      return `
Error generating stack: ` + o.message + `
` + o.stack;
    }
  }
  var qr = Object.prototype.hasOwnProperty, $r = a.unstable_scheduleCallback, Gr = a.unstable_cancelCallback, cx = a.unstable_shouldYield, fx = a.unstable_requestPaint, Le = a.unstable_now, dx = a.unstable_getCurrentPriorityLevel, Hh = a.unstable_ImmediatePriority, qh = a.unstable_UserBlockingPriority, ws = a.unstable_NormalPriority, hx = a.unstable_LowPriority, $h = a.unstable_IdlePriority, mx = a.log, px = a.unstable_setDisableYieldValue, il = null, Be = null;
  function Pn(t) {
    if (typeof mx == "function" && px(t), Be && typeof Be.setStrictMode == "function")
      try {
        Be.setStrictMode(il, t);
      } catch {
      }
  }
  var Ve = Math.clz32 ? Math.clz32 : vx, yx = Math.log, gx = Math.LN2;
  function vx(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (yx(t) / gx | 0) | 0;
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
  function bx(t, n) {
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
  function Gh() {
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
  function xx(t, n, i, o, u, d) {
    var x = t.pendingLanes;
    t.pendingLanes = i, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= i, t.entangledLanes &= i, t.errorRecoveryDisabledLanes &= i, t.shellSuspendCounter = 0;
    var C = t.entanglements, O = t.expirationTimes, $ = t.hiddenUpdates;
    for (i = x & ~i; 0 < i; ) {
      var Z = 31 - Ve(i), W = 1 << Z;
      C[Z] = 0, O[Z] = -1;
      var G = $[Z];
      if (G !== null)
        for ($[Z] = null, Z = 0; Z < G.length; Z++) {
          var X = G[Z];
          X !== null && (X.lane &= -536870913);
        }
      i &= ~W;
    }
    o !== 0 && Yh(t, o, 0), d !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= d & ~(x & ~n));
  }
  function Yh(t, n, i) {
    t.pendingLanes |= n, t.suspendedLanes &= ~n;
    var o = 31 - Ve(n);
    t.entangledLanes |= n, t.entanglements[o] = t.entanglements[o] | 1073741824 | i & 261930;
  }
  function Xh(t, n) {
    var i = t.entangledLanes |= n;
    for (t = t.entanglements; i; ) {
      var o = 31 - Ve(i), u = 1 << o;
      u & n | t[o] & n && (t[o] |= n), i &= ~u;
    }
  }
  function Ph(t, n) {
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
  function Kh() {
    var t = J.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : N0(t.type));
  }
  function Zh(t, n) {
    var i = J.p;
    try {
      return J.p = t, n();
    } finally {
      J.p = i;
    }
  }
  var Kn = Math.random().toString(36).slice(2), me = "__reactFiber$" + Kn, Me = "__reactProps$" + Kn, Wa = "__reactContainer$" + Kn, Kr = "__reactEvents$" + Kn, Sx = "__reactListeners$" + Kn, wx = "__reactHandles$" + Kn, Qh = "__reactResources$" + Kn, ol = "__reactMarker$" + Kn;
  function Zr(t) {
    delete t[me], delete t[Me], delete t[Kr], delete t[Sx], delete t[wx];
  }
  function Ia(t) {
    var n = t[me];
    if (n) return n;
    for (var i = t.parentNode; i; ) {
      if (n = i[Wa] || i[me]) {
        if (i = n.alternate, n.child !== null || i !== null && i.child !== null)
          for (t = y0(t); t !== null; ) {
            if (i = t[me]) return i;
            t = y0(t);
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
    var n = t[Qh];
    return n || (n = t[Qh] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function de(t) {
    t[ol] = !0;
  }
  var Fh = /* @__PURE__ */ new Set(), Jh = {};
  function Ca(t, n) {
    ni(t, n), ni(t + "Capture", n);
  }
  function ni(t, n) {
    for (Jh[t] = n, t = 0; t < n.length; t++)
      Fh.add(n[t]);
  }
  var Tx = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Wh = {}, Ih = {};
  function Cx(t) {
    return qr.call(Ih, t) ? !0 : qr.call(Wh, t) ? !1 : Tx.test(t) ? Ih[t] = !0 : (Wh[t] = !0, !1);
  }
  function js(t, n, i) {
    if (Cx(n))
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
  function Ms(t, n, i) {
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
  function An(t, n, i, o) {
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
  function tm(t) {
    var n = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function Ex(t, n, i) {
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
      var n = tm(t) ? "checked" : "value";
      t._valueTracker = Ex(
        t,
        n,
        "" + t[n]
      );
    }
  }
  function em(t) {
    if (!t) return !1;
    var n = t._valueTracker;
    if (!n) return !0;
    var i = n.getValue(), o = "";
    return t && (o = tm(t) ? t.checked ? "true" : "false" : t.value), t = o, t !== i ? (n.setValue(t), !0) : !1;
  }
  function _s(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Ax = /[\n"\\]/g;
  function Qe(t) {
    return t.replace(
      Ax,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Fr(t, n, i, o, u, d, x, C) {
    t.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? t.type = x : t.removeAttribute("type"), n != null ? x === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + Ze(n)) : t.value !== "" + Ze(n) && (t.value = "" + Ze(n)) : x !== "submit" && x !== "reset" || t.removeAttribute("value"), n != null ? Jr(t, x, Ze(n)) : i != null ? Jr(t, x, Ze(i)) : o != null && t.removeAttribute("value"), u == null && d != null && (t.defaultChecked = !!d), u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"), C != null && typeof C != "function" && typeof C != "symbol" && typeof C != "boolean" ? t.name = "" + Ze(C) : t.removeAttribute("name");
  }
  function nm(t, n, i, o, u, d, x, C) {
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
  function am(t, n, i) {
    if (n != null && (n = "" + Ze(n), n !== t.value && (t.value = n), i == null)) {
      t.defaultValue !== n && (t.defaultValue = n);
      return;
    }
    t.defaultValue = i != null ? "" + Ze(i) : "";
  }
  function im(t, n, i, o) {
    if (n == null) {
      if (o != null) {
        if (i != null) throw Error(s(92));
        if (ot(o)) {
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
  var jx = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function lm(t, n, i) {
    var o = n.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? o ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "" : o ? t.setProperty(n, i) : typeof i != "number" || i === 0 || jx.has(n) ? n === "float" ? t.cssFloat = i : t[n] = ("" + i).trim() : t[n] = i + "px";
  }
  function sm(t, n, i) {
    if (n != null && typeof n != "object")
      throw Error(s(62));
    if (t = t.style, i != null) {
      for (var o in i)
        !i.hasOwnProperty(o) || n != null && n.hasOwnProperty(o) || (o.indexOf("--") === 0 ? t.setProperty(o, "") : o === "float" ? t.cssFloat = "" : t[o] = "");
      for (var u in n)
        o = n[u], n.hasOwnProperty(u) && i[u] !== o && lm(t, u, o);
    } else
      for (var d in n)
        n.hasOwnProperty(d) && lm(t, d, n[d]);
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
  var Mx = /* @__PURE__ */ new Map([
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
  ]), _x = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ds(t) {
    return _x.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function jn() {
  }
  var Ir = null;
  function tu(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var li = null, si = null;
  function om(t) {
    var n = ti(t);
    if (n && (t = n.stateNode)) {
      var i = t[Me] || null;
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
                var u = o[Me] || null;
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
              o = i[n], o.form === t.form && em(o);
          }
          break t;
        case "textarea":
          am(t, i.value, i.defaultValue);
          break t;
        case "select":
          n = i.value, n != null && ai(t, !!i.multiple, n, !1);
      }
    }
  }
  var eu = !1;
  function rm(t, n, i) {
    if (eu) return t(n, i);
    eu = !0;
    try {
      var o = t(n);
      return o;
    } finally {
      if (eu = !1, (li !== null || si !== null) && (vo(), li && (n = li, t = si, si = li = null, om(n), t)))
        for (n = 0; n < t.length; n++) om(t[n]);
    }
  }
  function ul(t, n) {
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
  var Zn = null, au = null, Rs = null;
  function um() {
    if (Rs) return Rs;
    var t, n = au, i = n.length, o, u = "value" in Zn ? Zn.value : Zn.textContent, d = u.length;
    for (t = 0; t < i && n[t] === u[t]; t++) ;
    var x = i - t;
    for (o = 1; o <= x && n[i - o] === u[d - o]; o++) ;
    return Rs = u.slice(t, 1 < o ? 1 - o : void 0);
  }
  function Ns(t) {
    var n = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Os() {
    return !0;
  }
  function cm() {
    return !1;
  }
  function _e(t) {
    function n(i, o, u, d, x) {
      this._reactName = i, this._targetInst = u, this.type = o, this.nativeEvent = d, this.target = x, this.currentTarget = null;
      for (var C in t)
        t.hasOwnProperty(C) && (i = t[C], this[C] = i ? i(d) : d[C]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? Os : cm, this.isPropagationStopped = cm, this;
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
  }, zs = _e(Ea), fl = v({}, Ea, { view: 0, detail: 0 }), Dx = _e(fl), iu, lu, dl, Ls = v({}, fl, {
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
  }), fm = _e(Ls), Rx = v({}, Ls, { dataTransfer: 0 }), Nx = _e(Rx), Ox = v({}, fl, { relatedTarget: 0 }), su = _e(Ox), zx = v({}, Ea, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Lx = _e(zx), Bx = v({}, Ea, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Vx = _e(Bx), Ux = v({}, Ea, { data: 0 }), dm = _e(Ux), kx = {
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
  }, Hx = {
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
  }, qx = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function $x(t) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(t) : (t = qx[t]) ? !!n[t] : !1;
  }
  function ou() {
    return $x;
  }
  var Gx = v({}, fl, {
    key: function(t) {
      if (t.key) {
        var n = kx[t.key] || t.key;
        if (n !== "Unidentified") return n;
      }
      return t.type === "keypress" ? (t = Ns(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Hx[t.keyCode] || "Unidentified" : "";
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
  }), Yx = _e(Gx), Xx = v({}, Ls, {
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
  }), hm = _e(Xx), Px = v({}, fl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ou
  }), Kx = _e(Px), Zx = v({}, Ea, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Qx = _e(Zx), Fx = v({}, Ls, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Jx = _e(Fx), Wx = v({}, Ea, {
    newState: 0,
    oldState: 0
  }), Ix = _e(Wx), tS = [9, 13, 27, 32], ru = Mn && "CompositionEvent" in window, hl = null;
  Mn && "documentMode" in document && (hl = document.documentMode);
  var eS = Mn && "TextEvent" in window && !hl, mm = Mn && (!ru || hl && 8 < hl && 11 >= hl), pm = " ", ym = !1;
  function gm(t, n) {
    switch (t) {
      case "keyup":
        return tS.indexOf(n.keyCode) !== -1;
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
  function vm(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var oi = !1;
  function nS(t, n) {
    switch (t) {
      case "compositionend":
        return vm(n);
      case "keypress":
        return n.which !== 32 ? null : (ym = !0, pm);
      case "textInput":
        return t = n.data, t === pm && ym ? null : t;
      default:
        return null;
    }
  }
  function aS(t, n) {
    if (oi)
      return t === "compositionend" || !ru && gm(t, n) ? (t = um(), Rs = au = Zn = null, oi = !1, t) : null;
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
        return mm && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var iS = {
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
  function bm(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === "input" ? !!iS[t.type] : n === "textarea";
  }
  function xm(t, n, i, o) {
    li ? si ? si.push(o) : si = [o] : li = o, n = Eo(n, "onChange"), 0 < n.length && (i = new zs(
      "onChange",
      "change",
      null,
      i,
      o
    ), t.push({ event: i, listeners: n }));
  }
  var ml = null, pl = null;
  function lS(t) {
    n0(t, 0);
  }
  function Bs(t) {
    var n = rl(t);
    if (em(n)) return t;
  }
  function Sm(t, n) {
    if (t === "change") return n;
  }
  var wm = !1;
  if (Mn) {
    var uu;
    if (Mn) {
      var cu = "oninput" in document;
      if (!cu) {
        var Tm = document.createElement("div");
        Tm.setAttribute("oninput", "return;"), cu = typeof Tm.oninput == "function";
      }
      uu = cu;
    } else uu = !1;
    wm = uu && (!document.documentMode || 9 < document.documentMode);
  }
  function Cm() {
    ml && (ml.detachEvent("onpropertychange", Em), pl = ml = null);
  }
  function Em(t) {
    if (t.propertyName === "value" && Bs(pl)) {
      var n = [];
      xm(
        n,
        pl,
        t,
        tu(t)
      ), rm(lS, n);
    }
  }
  function sS(t, n, i) {
    t === "focusin" ? (Cm(), ml = n, pl = i, ml.attachEvent("onpropertychange", Em)) : t === "focusout" && Cm();
  }
  function oS(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Bs(pl);
  }
  function rS(t, n) {
    if (t === "click") return Bs(n);
  }
  function uS(t, n) {
    if (t === "input" || t === "change")
      return Bs(n);
  }
  function cS(t, n) {
    return t === n && (t !== 0 || 1 / t === 1 / n) || t !== t && n !== n;
  }
  var Ue = typeof Object.is == "function" ? Object.is : cS;
  function yl(t, n) {
    if (Ue(t, n)) return !0;
    if (typeof t != "object" || t === null || typeof n != "object" || n === null)
      return !1;
    var i = Object.keys(t), o = Object.keys(n);
    if (i.length !== o.length) return !1;
    for (o = 0; o < i.length; o++) {
      var u = i[o];
      if (!qr.call(n, u) || !Ue(t[u], n[u]))
        return !1;
    }
    return !0;
  }
  function Am(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function jm(t, n) {
    var i = Am(t);
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
      i = Am(i);
    }
  }
  function Mm(t, n) {
    return t && n ? t === n ? !0 : t && t.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Mm(t, n.parentNode) : "contains" in t ? t.contains(n) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function _m(t) {
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
  var fS = Mn && "documentMode" in document && 11 >= document.documentMode, ri = null, du = null, gl = null, hu = !1;
  function Dm(t, n, i) {
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
  }, mu = {}, Rm = {};
  Mn && (Rm = document.createElement("div").style, "AnimationEvent" in window || (delete ui.animationend.animation, delete ui.animationiteration.animation, delete ui.animationstart.animation), "TransitionEvent" in window || delete ui.transitionend.transition);
  function ja(t) {
    if (mu[t]) return mu[t];
    if (!ui[t]) return t;
    var n = ui[t], i;
    for (i in n)
      if (n.hasOwnProperty(i) && i in Rm)
        return mu[t] = n[i];
    return t;
  }
  var Nm = ja("animationend"), Om = ja("animationiteration"), zm = ja("animationstart"), dS = ja("transitionrun"), hS = ja("transitionstart"), mS = ja("transitioncancel"), Lm = ja("transitionend"), Bm = /* @__PURE__ */ new Map(), pu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  pu.push("scrollEnd");
  function on(t, n) {
    Bm.set(t, n), Ca(n, [t]);
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
      d !== 0 && Vm(i, u, d);
    }
  }
  function ks(t, n, i, o) {
    Fe[ci++] = t, Fe[ci++] = n, Fe[ci++] = i, Fe[ci++] = o, yu |= o, t.lanes |= o, t = t.alternate, t !== null && (t.lanes |= o);
  }
  function gu(t, n, i, o) {
    return ks(t, n, i, o), Hs(t);
  }
  function Ma(t, n) {
    return ks(t, null, null, n), Hs(t);
  }
  function Vm(t, n, i) {
    t.lanes |= i;
    var o = t.alternate;
    o !== null && (o.lanes |= i);
    for (var u = !1, d = t.return; d !== null; )
      d.childLanes |= i, o = d.alternate, o !== null && (o.childLanes |= i), d.tag === 22 && (t = d.stateNode, t === null || t._visibility & 1 || (u = !0)), t = d, d = d.return;
    return t.tag === 3 ? (d = t.stateNode, u && n !== null && (u = 31 - Ve(i), t = d.hiddenUpdates, o = t[u], o === null ? t[u] = [n] : o.push(n), n.lane = i | 536870912), d) : null;
  }
  function Hs(t) {
    if (50 < kl)
      throw kl = 0, Ac = null, Error(s(185));
    for (var n = t.return; n !== null; )
      t = n, n = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var fi = {};
  function pS(t, n, i, o) {
    this.tag = t, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ke(t, n, i, o) {
    return new pS(t, n, i, o);
  }
  function vu(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function _n(t, n) {
    var i = t.alternate;
    return i === null ? (i = ke(
      t.tag,
      n,
      t.key,
      t.mode
    ), i.elementType = t.elementType, i.type = t.type, i.stateNode = t.stateNode, i.alternate = t, t.alternate = i) : (i.pendingProps = n, i.type = t.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = t.flags & 65011712, i.childLanes = t.childLanes, i.lanes = t.lanes, i.child = t.child, i.memoizedProps = t.memoizedProps, i.memoizedState = t.memoizedState, i.updateQueue = t.updateQueue, n = t.dependencies, i.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, i.sibling = t.sibling, i.index = t.index, i.ref = t.ref, i.refCleanup = t.refCleanup, i;
  }
  function Um(t, n) {
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
      x = x3(
        t,
        i,
        lt.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case P:
          return t = ke(31, i, n, u), t.elementType = P, t.lanes = d, t;
        case w:
          return _a(i.children, u, d, n);
        case E:
          x = 8, u |= 24;
          break;
        case _:
          return t = ke(12, i, n, u | 2), t.elementType = _, t.lanes = d, t;
        case B:
          return t = ke(13, i, n, u), t.elementType = B, t.lanes = d, t;
        case L:
          return t = ke(19, i, n, u), t.elementType = L, t.lanes = d, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case j:
                x = 10;
                break t;
              case M:
                x = 9;
                break t;
              case R:
                x = 11;
                break t;
              case D:
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
  function _a(t, n, i, o) {
    return t = ke(7, t, o, n), t.lanes = i, t;
  }
  function bu(t, n, i) {
    return t = ke(6, t, null, n), t.lanes = i, t;
  }
  function km(t) {
    var n = ke(18, null, null, 0);
    return n.stateNode = t, n;
  }
  function xu(t, n, i) {
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
  var Hm = /* @__PURE__ */ new WeakMap();
  function Je(t, n) {
    if (typeof t == "object" && t !== null) {
      var i = Hm.get(t);
      return i !== void 0 ? i : (n = {
        value: t,
        source: n,
        stack: kh(n)
      }, Hm.set(t, n), n);
    }
    return {
      value: t,
      source: n,
      stack: kh(n)
    };
  }
  var di = [], hi = 0, $s = null, vl = 0, We = [], Ie = 0, Qn = null, yn = 1, gn = "";
  function Dn(t, n) {
    di[hi++] = vl, di[hi++] = $s, $s = t, vl = n;
  }
  function qm(t, n, i) {
    We[Ie++] = yn, We[Ie++] = gn, We[Ie++] = Qn, Qn = t;
    var o = yn;
    t = gn;
    var u = 32 - Ve(o) - 1;
    o &= ~(1 << u), i += 1;
    var d = 32 - Ve(n) + u;
    if (30 < d) {
      var x = u - u % 5;
      d = (o & (1 << x) - 1).toString(32), o >>= x, u -= x, yn = 1 << 32 - Ve(n) + u | i << u | o, gn = d + t;
    } else
      yn = 1 << d | i << u | o, gn = t;
  }
  function Su(t) {
    t.return !== null && (Dn(t, 1), qm(t, 1, 0));
  }
  function wu(t) {
    for (; t === $s; )
      $s = di[--hi], di[hi] = null, vl = di[--hi], di[hi] = null;
    for (; t === Qn; )
      Qn = We[--Ie], We[Ie] = null, gn = We[--Ie], We[Ie] = null, yn = We[--Ie], We[Ie] = null;
  }
  function $m(t, n) {
    We[Ie++] = yn, We[Ie++] = gn, We[Ie++] = Qn, yn = n.id, gn = n.overflow, Qn = t;
  }
  var pe = null, Yt = null, Mt = !1, Fn = null, tn = !1, Tu = Error(s(519));
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
  function Gm(t) {
    var n = t.stateNode, i = t.type, o = t.memoizedProps;
    switch (n[me] = t, n[Me] = o, i) {
      case "dialog":
        Et("cancel", n), Et("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        Et("load", n);
        break;
      case "video":
      case "audio":
        for (i = 0; i < ql.length; i++)
          Et(ql[i], n);
        break;
      case "source":
        Et("error", n);
        break;
      case "img":
      case "image":
      case "link":
        Et("error", n), Et("load", n);
        break;
      case "details":
        Et("toggle", n);
        break;
      case "input":
        Et("invalid", n), nm(
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
        Et("invalid", n);
        break;
      case "textarea":
        Et("invalid", n), im(n, o.value, o.defaultValue, o.children);
    }
    i = o.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || n.textContent === "" + i || o.suppressHydrationWarning === !0 || s0(n.textContent, i) ? (o.popover != null && (Et("beforetoggle", n), Et("toggle", n)), o.onScroll != null && Et("scroll", n), o.onScrollEnd != null && Et("scrollend", n), o.onClick != null && (n.onclick = jn), n = !0) : n = !1, n || Jn(t, !0);
  }
  function Ym(t) {
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
    if (!Mt) return Ym(t), Mt = !0, !1;
    var n = t.tag, i;
    if ((i = n !== 3 && n !== 27) && ((i = n === 5) && (i = t.type, i = !(i !== "form" && i !== "button") || qc(t.type, t.memoizedProps)), i = !i), i && Yt && Jn(t), Ym(t), n === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Yt = p0(t);
    } else if (n === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Yt = p0(t);
    } else
      n === 27 ? (n = Yt, fa(t.type) ? (t = Pc, Pc = null, Yt = t) : Yt = n) : Yt = pe ? nn(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Da() {
    Yt = pe = null, Mt = !1;
  }
  function Cu() {
    var t = Fn;
    return t !== null && (Oe === null ? Oe = t : Oe.push.apply(
      Oe,
      t
    ), Fn = null), t;
  }
  function bl(t) {
    Fn === null ? Fn = [t] : Fn.push(t);
  }
  var Eu = N(null), Ra = null, Rn = null;
  function Wn(t, n, i) {
    tt(Eu, n._currentValue), n._currentValue = i;
  }
  function Nn(t) {
    t._currentValue = Eu.current, Y(Eu);
  }
  function Au(t, n, i) {
    for (; t !== null; ) {
      var o = t.alternate;
      if ((t.childLanes & n) !== n ? (t.childLanes |= n, o !== null && (o.childLanes |= n)) : o !== null && (o.childLanes & n) !== n && (o.childLanes |= n), t === i) break;
      t = t.return;
    }
  }
  function ju(t, n, i, o) {
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
          Ue(u.pendingProps.value, x.value) || (t !== null ? t.push(C) : t = [C]);
        }
      } else if (u === gt.current) {
        if (x = u.alternate, x === null) throw Error(s(387));
        x.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(Pl) : t = [Pl]);
      }
      u = u.return;
    }
    t !== null && ju(
      n,
      t,
      i,
      o
    ), n.flags |= 262144;
  }
  function Gs(t) {
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
  function Na(t) {
    Ra = t, Rn = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function ye(t) {
    return Xm(Ra, t);
  }
  function Ys(t, n) {
    return Ra === null && Na(t), Xm(t, n);
  }
  function Xm(t, n) {
    var i = n._currentValue;
    if (n = { context: n, memoizedValue: i, next: null }, Rn === null) {
      if (t === null) throw Error(s(308));
      Rn = n, t.dependencies = { lanes: 0, firstContext: n }, t.flags |= 524288;
    } else Rn = Rn.next = n;
    return i;
  }
  var yS = typeof AbortController < "u" ? AbortController : function() {
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
  }, gS = a.unstable_scheduleCallback, vS = a.unstable_NormalPriority, ne = {
    $$typeof: j,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Mu() {
    return {
      controller: new yS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function xl(t) {
    t.refCount--, t.refCount === 0 && gS(vS, function() {
      t.controller.abort();
    });
  }
  var Sl = null, _u = 0, yi = 0, gi = null;
  function bS(t, n) {
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
    return _u++, n.then(Pm, Pm), n;
  }
  function Pm() {
    if (--_u === 0 && Sl !== null) {
      gi !== null && (gi.status = "fulfilled");
      var t = Sl;
      Sl = null, yi = 0, gi = null;
      for (var n = 0; n < t.length; n++) (0, t[n])();
    }
  }
  function xS(t, n) {
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
  var Km = V.S;
  V.S = function(t, n) {
    D1 = Le(), typeof n == "object" && n !== null && typeof n.then == "function" && bS(t, n), Km !== null && Km(t, n);
  };
  var Oa = N(null);
  function Du() {
    var t = Oa.current;
    return t !== null ? t : Ht.pooledCache;
  }
  function Xs(t, n) {
    n === null ? tt(Oa, Oa.current) : tt(Oa, n.pool);
  }
  function Zm() {
    var t = Du();
    return t === null ? null : { parent: ne._currentValue, pool: t };
  }
  var vi = Error(s(460)), Ru = Error(s(474)), Ps = Error(s(542)), Ks = { then: function() {
  } };
  function Qm(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Fm(t, n, i) {
    switch (i = t[i], i === void 0 ? t.push(n) : i !== n && (n.then(jn, jn), n = i), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw t = n.reason, Wm(t), t;
      default:
        if (typeof n.status == "string") n.then(jn, jn);
        else {
          if (t = Ht, t !== null && 100 < t.shellSuspendCounter)
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
            throw t = n.reason, Wm(t), t;
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
  function Jm() {
    if (La === null) throw Error(s(459));
    var t = La;
    return La = null, t;
  }
  function Wm(t) {
    if (t === vi || t === Ps)
      throw Error(s(483));
  }
  var bi = null, wl = 0;
  function Zs(t) {
    var n = wl;
    return wl += 1, bi === null && (bi = []), Fm(bi, t, n);
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
  function Im(t) {
    function n(U, z) {
      if (t) {
        var q = U.deletions;
        q === null ? (U.deletions = [z], U.flags |= 16) : q.push(z);
      }
    }
    function i(U, z) {
      if (!t) return null;
      for (; z !== null; )
        n(U, z), z = z.sibling;
      return null;
    }
    function o(U) {
      for (var z = /* @__PURE__ */ new Map(); U !== null; )
        U.key !== null ? z.set(U.key, U) : z.set(U.index, U), U = U.sibling;
      return z;
    }
    function u(U, z) {
      return U = _n(U, z), U.index = 0, U.sibling = null, U;
    }
    function d(U, z, q) {
      return U.index = q, t ? (q = U.alternate, q !== null ? (q = q.index, q < z ? (U.flags |= 67108866, z) : q) : (U.flags |= 67108866, z)) : (U.flags |= 1048576, z);
    }
    function x(U) {
      return t && U.alternate === null && (U.flags |= 67108866), U;
    }
    function C(U, z, q, F) {
      return z === null || z.tag !== 6 ? (z = bu(q, U.mode, F), z.return = U, z) : (z = u(z, q), z.return = U, z);
    }
    function O(U, z, q, F) {
      var mt = q.type;
      return mt === w ? Z(
        U,
        z,
        q.props.children,
        F,
        q.key
      ) : z !== null && (z.elementType === mt || typeof mt == "object" && mt !== null && mt.$$typeof === k && za(mt) === z.type) ? (z = u(z, q.props), Tl(z, q), z.return = U, z) : (z = qs(
        q.type,
        q.key,
        q.props,
        null,
        U.mode,
        F
      ), Tl(z, q), z.return = U, z);
    }
    function $(U, z, q, F) {
      return z === null || z.tag !== 4 || z.stateNode.containerInfo !== q.containerInfo || z.stateNode.implementation !== q.implementation ? (z = xu(q, U.mode, F), z.return = U, z) : (z = u(z, q.children || []), z.return = U, z);
    }
    function Z(U, z, q, F, mt) {
      return z === null || z.tag !== 7 ? (z = _a(
        q,
        U.mode,
        F,
        mt
      ), z.return = U, z) : (z = u(z, q), z.return = U, z);
    }
    function W(U, z, q) {
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return z = bu(
          "" + z,
          U.mode,
          q
        ), z.return = U, z;
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case T:
            return q = qs(
              z.type,
              z.key,
              z.props,
              null,
              U.mode,
              q
            ), Tl(q, z), q.return = U, q;
          case S:
            return z = xu(
              z,
              U.mode,
              q
            ), z.return = U, z;
          case k:
            return z = za(z), W(U, z, q);
        }
        if (ot(z) || K(z))
          return z = _a(
            z,
            U.mode,
            q,
            null
          ), z.return = U, z;
        if (typeof z.then == "function")
          return W(U, Zs(z), q);
        if (z.$$typeof === j)
          return W(
            U,
            Ys(U, z),
            q
          );
        Qs(U, z);
      }
      return null;
    }
    function G(U, z, q, F) {
      var mt = z !== null ? z.key : null;
      if (typeof q == "string" && q !== "" || typeof q == "number" || typeof q == "bigint")
        return mt !== null ? null : C(U, z, "" + q, F);
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case T:
            return q.key === mt ? O(U, z, q, F) : null;
          case S:
            return q.key === mt ? $(U, z, q, F) : null;
          case k:
            return q = za(q), G(U, z, q, F);
        }
        if (ot(q) || K(q))
          return mt !== null ? null : Z(U, z, q, F, null);
        if (typeof q.then == "function")
          return G(
            U,
            z,
            Zs(q),
            F
          );
        if (q.$$typeof === j)
          return G(
            U,
            z,
            Ys(U, q),
            F
          );
        Qs(U, q);
      }
      return null;
    }
    function X(U, z, q, F, mt) {
      if (typeof F == "string" && F !== "" || typeof F == "number" || typeof F == "bigint")
        return U = U.get(q) || null, C(z, U, "" + F, mt);
      if (typeof F == "object" && F !== null) {
        switch (F.$$typeof) {
          case T:
            return U = U.get(
              F.key === null ? q : F.key
            ) || null, O(z, U, F, mt);
          case S:
            return U = U.get(
              F.key === null ? q : F.key
            ) || null, $(z, U, F, mt);
          case k:
            return F = za(F), X(
              U,
              z,
              q,
              F,
              mt
            );
        }
        if (ot(F) || K(F))
          return U = U.get(q) || null, Z(z, U, F, mt, null);
        if (typeof F.then == "function")
          return X(
            U,
            z,
            q,
            Zs(F),
            mt
          );
        if (F.$$typeof === j)
          return X(
            U,
            z,
            q,
            Ys(z, F),
            mt
          );
        Qs(z, F);
      }
      return null;
    }
    function rt(U, z, q, F) {
      for (var mt = null, _t = null, ft = z, xt = z = 0, jt = null; ft !== null && xt < q.length; xt++) {
        ft.index > xt ? (jt = ft, ft = null) : jt = ft.sibling;
        var Dt = G(
          U,
          ft,
          q[xt],
          F
        );
        if (Dt === null) {
          ft === null && (ft = jt);
          break;
        }
        t && ft && Dt.alternate === null && n(U, ft), z = d(Dt, z, xt), _t === null ? mt = Dt : _t.sibling = Dt, _t = Dt, ft = jt;
      }
      if (xt === q.length)
        return i(U, ft), Mt && Dn(U, xt), mt;
      if (ft === null) {
        for (; xt < q.length; xt++)
          ft = W(U, q[xt], F), ft !== null && (z = d(
            ft,
            z,
            xt
          ), _t === null ? mt = ft : _t.sibling = ft, _t = ft);
        return Mt && Dn(U, xt), mt;
      }
      for (ft = o(ft); xt < q.length; xt++)
        jt = X(
          ft,
          U,
          xt,
          q[xt],
          F
        ), jt !== null && (t && jt.alternate !== null && ft.delete(
          jt.key === null ? xt : jt.key
        ), z = d(
          jt,
          z,
          xt
        ), _t === null ? mt = jt : _t.sibling = jt, _t = jt);
      return t && ft.forEach(function(ya) {
        return n(U, ya);
      }), Mt && Dn(U, xt), mt;
    }
    function pt(U, z, q, F) {
      if (q == null) throw Error(s(151));
      for (var mt = null, _t = null, ft = z, xt = z = 0, jt = null, Dt = q.next(); ft !== null && !Dt.done; xt++, Dt = q.next()) {
        ft.index > xt ? (jt = ft, ft = null) : jt = ft.sibling;
        var ya = G(U, ft, Dt.value, F);
        if (ya === null) {
          ft === null && (ft = jt);
          break;
        }
        t && ft && ya.alternate === null && n(U, ft), z = d(ya, z, xt), _t === null ? mt = ya : _t.sibling = ya, _t = ya, ft = jt;
      }
      if (Dt.done)
        return i(U, ft), Mt && Dn(U, xt), mt;
      if (ft === null) {
        for (; !Dt.done; xt++, Dt = q.next())
          Dt = W(U, Dt.value, F), Dt !== null && (z = d(Dt, z, xt), _t === null ? mt = Dt : _t.sibling = Dt, _t = Dt);
        return Mt && Dn(U, xt), mt;
      }
      for (ft = o(ft); !Dt.done; xt++, Dt = q.next())
        Dt = X(ft, U, xt, Dt.value, F), Dt !== null && (t && Dt.alternate !== null && ft.delete(Dt.key === null ? xt : Dt.key), z = d(Dt, z, xt), _t === null ? mt = Dt : _t.sibling = Dt, _t = Dt);
      return t && ft.forEach(function(R3) {
        return n(U, R3);
      }), Mt && Dn(U, xt), mt;
    }
    function Ut(U, z, q, F) {
      if (typeof q == "object" && q !== null && q.type === w && q.key === null && (q = q.props.children), typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case T:
            t: {
              for (var mt = q.key; z !== null; ) {
                if (z.key === mt) {
                  if (mt = q.type, mt === w) {
                    if (z.tag === 7) {
                      i(
                        U,
                        z.sibling
                      ), F = u(
                        z,
                        q.props.children
                      ), F.return = U, U = F;
                      break t;
                    }
                  } else if (z.elementType === mt || typeof mt == "object" && mt !== null && mt.$$typeof === k && za(mt) === z.type) {
                    i(
                      U,
                      z.sibling
                    ), F = u(z, q.props), Tl(F, q), F.return = U, U = F;
                    break t;
                  }
                  i(U, z);
                  break;
                } else n(U, z);
                z = z.sibling;
              }
              q.type === w ? (F = _a(
                q.props.children,
                U.mode,
                F,
                q.key
              ), F.return = U, U = F) : (F = qs(
                q.type,
                q.key,
                q.props,
                null,
                U.mode,
                F
              ), Tl(F, q), F.return = U, U = F);
            }
            return x(U);
          case S:
            t: {
              for (mt = q.key; z !== null; ) {
                if (z.key === mt)
                  if (z.tag === 4 && z.stateNode.containerInfo === q.containerInfo && z.stateNode.implementation === q.implementation) {
                    i(
                      U,
                      z.sibling
                    ), F = u(z, q.children || []), F.return = U, U = F;
                    break t;
                  } else {
                    i(U, z);
                    break;
                  }
                else n(U, z);
                z = z.sibling;
              }
              F = xu(q, U.mode, F), F.return = U, U = F;
            }
            return x(U);
          case k:
            return q = za(q), Ut(
              U,
              z,
              q,
              F
            );
        }
        if (ot(q))
          return rt(
            U,
            z,
            q,
            F
          );
        if (K(q)) {
          if (mt = K(q), typeof mt != "function") throw Error(s(150));
          return q = mt.call(q), pt(
            U,
            z,
            q,
            F
          );
        }
        if (typeof q.then == "function")
          return Ut(
            U,
            z,
            Zs(q),
            F
          );
        if (q.$$typeof === j)
          return Ut(
            U,
            z,
            Ys(U, q),
            F
          );
        Qs(U, q);
      }
      return typeof q == "string" && q !== "" || typeof q == "number" || typeof q == "bigint" ? (q = "" + q, z !== null && z.tag === 6 ? (i(U, z.sibling), F = u(z, q), F.return = U, U = F) : (i(U, z), F = bu(q, U.mode, F), F.return = U, U = F), x(U)) : i(U, z);
    }
    return function(U, z, q, F) {
      try {
        wl = 0;
        var mt = Ut(
          U,
          z,
          q,
          F
        );
        return bi = null, mt;
      } catch (ft) {
        if (ft === vi || ft === Ps) throw ft;
        var _t = ke(29, ft, null, U.mode);
        return _t.lanes = F, _t.return = U, _t;
      } finally {
      }
    };
  }
  var Ba = Im(!0), tp = Im(!1), In = !1;
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
    if (o = o.shared, (Nt & 2) !== 0) {
      var u = o.pending;
      return u === null ? n.next = n : (n.next = u.next, u.next = n), o.pending = n, n = Hs(t), Vm(t, null, i), n;
    }
    return ks(t, o, n, i), Hs(t);
  }
  function Cl(t, n, i) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (i & 4194048) !== 0)) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, Xh(t, i);
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
      var O = C, $ = O.next;
      O.next = null, x === null ? d = $ : x.next = $, x = O;
      var Z = t.alternate;
      Z !== null && (Z = Z.updateQueue, C = Z.lastBaseUpdate, C !== x && (C === null ? Z.firstBaseUpdate = $ : C.next = $, Z.lastBaseUpdate = O));
    }
    if (d !== null) {
      var W = u.baseState;
      x = 0, Z = $ = O = null, C = d;
      do {
        var G = C.lane & -536870913, X = G !== C.lane;
        if (X ? (At & G) === G : (o & G) === G) {
          G !== 0 && G === yi && (Lu = !0), Z !== null && (Z = Z.next = {
            lane: 0,
            tag: C.tag,
            payload: C.payload,
            callback: null,
            next: null
          });
          t: {
            var rt = t, pt = C;
            G = n;
            var Ut = i;
            switch (pt.tag) {
              case 1:
                if (rt = pt.payload, typeof rt == "function") {
                  W = rt.call(Ut, W, G);
                  break t;
                }
                W = rt;
                break t;
              case 3:
                rt.flags = rt.flags & -65537 | 128;
              case 0:
                if (rt = pt.payload, G = typeof rt == "function" ? rt.call(Ut, W, G) : rt, G == null) break t;
                W = v({}, W, G);
                break t;
              case 2:
                In = !0;
            }
          }
          G = C.callback, G !== null && (t.flags |= 64, X && (t.flags |= 8192), X = u.callbacks, X === null ? u.callbacks = [G] : X.push(G));
        } else
          X = {
            lane: G,
            tag: C.tag,
            payload: C.payload,
            callback: C.callback,
            next: null
          }, Z === null ? ($ = Z = X, O = W) : Z = Z.next = X, x |= G;
        if (C = C.next, C === null) {
          if (C = u.shared.pending, C === null)
            break;
          X = C, C = X.next, X.next = null, u.lastBaseUpdate = X, u.shared.pending = null;
        }
      } while (!0);
      Z === null && (O = W), u.baseState = O, u.firstBaseUpdate = $, u.lastBaseUpdate = Z, d === null && (u.shared.lanes = 0), sa |= x, t.lanes = x, t.memoizedState = W;
    }
  }
  function ep(t, n) {
    if (typeof t != "function")
      throw Error(s(191, t));
    t.call(n);
  }
  function np(t, n) {
    var i = t.callbacks;
    if (i !== null)
      for (t.callbacks = null, t = 0; t < i.length; t++)
        ep(i[t], n);
  }
  var xi = N(null), Fs = N(0);
  function ap(t, n) {
    t = qn, tt(Fs, t), tt(xi, n), qn = t | n.baseLanes;
  }
  function Bu() {
    tt(Fs, qn), tt(xi, xi.current);
  }
  function Vu() {
    qn = Fs.current, Y(xi), Y(Fs);
  }
  var He = N(null), en = null;
  function na(t) {
    var n = t.alternate;
    tt(Wt, Wt.current & 1), tt(He, t), en === null && (n === null || xi.current !== null || n.memoizedState !== null) && (en = t);
  }
  function Uu(t) {
    tt(Wt, Wt.current), tt(He, t), en === null && (en = t);
  }
  function ip(t) {
    t.tag === 22 ? (tt(Wt, Wt.current), tt(He, t), en === null && (en = t)) : aa();
  }
  function aa() {
    tt(Wt, Wt.current), tt(He, He.current);
  }
  function qe(t) {
    Y(He), en === t && (en = null), Y(Wt);
  }
  var Wt = N(0);
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
  var On = 0, bt = null, Bt = null, ae = null, Ws = !1, Si = !1, Va = !1, Is = 0, jl = 0, wi = null, SS = 0;
  function Qt() {
    throw Error(s(321));
  }
  function ku(t, n) {
    if (n === null) return !1;
    for (var i = 0; i < n.length && i < t.length; i++)
      if (!Ue(t[i], n[i])) return !1;
    return !0;
  }
  function Hu(t, n, i, o, u, d) {
    return On = d, bt = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, V.H = t === null || t.memoizedState === null ? qp : ec, Va = !1, d = i(o, u), Va = !1, Si && (d = sp(
      n,
      i,
      o,
      u
    )), lp(t), d;
  }
  function lp(t) {
    V.H = Dl;
    var n = Bt !== null && Bt.next !== null;
    if (On = 0, ae = Bt = bt = null, Ws = !1, jl = 0, wi = null, n) throw Error(s(300));
    t === null || ie || (t = t.dependencies, t !== null && Gs(t) && (ie = !0));
  }
  function sp(t, n, i, o) {
    bt = t;
    var u = 0;
    do {
      if (Si && (wi = null), jl = 0, Si = !1, 25 <= u) throw Error(s(301));
      if (u += 1, ae = Bt = null, t.updateQueue != null) {
        var d = t.updateQueue;
        d.lastEffect = null, d.events = null, d.stores = null, d.memoCache != null && (d.memoCache.index = 0);
      }
      V.H = $p, d = n(i, o);
    } while (Si);
    return d;
  }
  function wS() {
    var t = V.H, n = t.useState()[0];
    return n = typeof n.then == "function" ? Ml(n) : n, t = t.useState()[0], (Bt !== null ? Bt.memoizedState : null) !== t && (bt.flags |= 1024), n;
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
    On = 0, ae = Bt = bt = null, Si = !1, jl = Is = 0, wi = null;
  }
  function Ce() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return ae === null ? bt.memoizedState = ae = t : ae = ae.next = t, ae;
  }
  function It() {
    if (Bt === null) {
      var t = bt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Bt.next;
    var n = ae === null ? bt.memoizedState : ae.next;
    if (n !== null)
      ae = n, Bt = t;
    else {
      if (t === null)
        throw bt.alternate === null ? Error(s(467)) : Error(s(310));
      Bt = t, t = {
        memoizedState: Bt.memoizedState,
        baseState: Bt.baseState,
        baseQueue: Bt.baseQueue,
        queue: Bt.queue,
        next: null
      }, ae === null ? bt.memoizedState = ae = t : ae = ae.next = t;
    }
    return ae;
  }
  function to() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ml(t) {
    var n = jl;
    return jl += 1, wi === null && (wi = []), t = Fm(wi, t, n), n = bt, (ae === null ? n.memoizedState : ae.next) === null && (n = n.alternate, V.H = n === null || n.memoizedState === null ? qp : ec), t;
  }
  function eo(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Ml(t);
      if (t.$$typeof === j) return ye(t);
    }
    throw Error(s(438, String(t)));
  }
  function Yu(t) {
    var n = null, i = bt.updateQueue;
    if (i !== null && (n = i.memoCache), n == null) {
      var o = bt.alternate;
      o !== null && (o = o.updateQueue, o !== null && (o = o.memoCache, o != null && (n = {
        data: o.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), i === null && (i = to(), bt.updateQueue = i), i.memoCache = n, i = n.data[n.index], i === void 0)
      for (i = n.data[n.index] = Array(t), o = 0; o < t; o++)
        i[o] = H;
    return n.index++, i;
  }
  function zn(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function no(t) {
    var n = It();
    return Xu(n, Bt, t);
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
      var C = x = null, O = null, $ = n, Z = !1;
      do {
        var W = $.lane & -536870913;
        if (W !== $.lane ? (At & W) === W : (On & W) === W) {
          var G = $.revertLane;
          if (G === 0)
            O !== null && (O = O.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: $.action,
              hasEagerState: $.hasEagerState,
              eagerState: $.eagerState,
              next: null
            }), W === yi && (Z = !0);
          else if ((On & G) === G) {
            $ = $.next, G === yi && (Z = !0);
            continue;
          } else
            W = {
              lane: 0,
              revertLane: $.revertLane,
              gesture: null,
              action: $.action,
              hasEagerState: $.hasEagerState,
              eagerState: $.eagerState,
              next: null
            }, O === null ? (C = O = W, x = d) : O = O.next = W, bt.lanes |= G, sa |= G;
          W = $.action, Va && i(d, W), d = $.hasEagerState ? $.eagerState : i(d, W);
        } else
          G = {
            lane: W,
            revertLane: $.revertLane,
            gesture: $.gesture,
            action: $.action,
            hasEagerState: $.hasEagerState,
            eagerState: $.eagerState,
            next: null
          }, O === null ? (C = O = G, x = d) : O = O.next = G, bt.lanes |= W, sa |= W;
        $ = $.next;
      } while ($ !== null && $ !== n);
      if (O === null ? x = d : O.next = C, !Ue(d, t.memoizedState) && (ie = !0, Z && (i = gi, i !== null)))
        throw i;
      t.memoizedState = d, t.baseState = x, t.baseQueue = O, o.lastRenderedState = d;
    }
    return u === null && (o.lanes = 0), [t.memoizedState, o.dispatch];
  }
  function Pu(t) {
    var n = It(), i = n.queue;
    if (i === null) throw Error(s(311));
    i.lastRenderedReducer = t;
    var o = i.dispatch, u = i.pending, d = n.memoizedState;
    if (u !== null) {
      i.pending = null;
      var x = u = u.next;
      do
        d = t(d, x.action), x = x.next;
      while (x !== u);
      Ue(d, n.memoizedState) || (ie = !0), n.memoizedState = d, n.baseQueue === null && (n.baseState = d), i.lastRenderedState = d;
    }
    return [d, o];
  }
  function op(t, n, i) {
    var o = bt, u = It(), d = Mt;
    if (d) {
      if (i === void 0) throw Error(s(407));
      i = i();
    } else i = n();
    var x = !Ue(
      (Bt || u).memoizedState,
      i
    );
    if (x && (u.memoizedState = i, ie = !0), u = u.queue, Qu(cp.bind(null, o, u, t), [
      t
    ]), u.getSnapshot !== n || x || ae !== null && ae.memoizedState.tag & 1) {
      if (o.flags |= 2048, Ti(
        9,
        { destroy: void 0 },
        up.bind(
          null,
          o,
          u,
          i,
          n
        ),
        null
      ), Ht === null) throw Error(s(349));
      d || (On & 127) !== 0 || rp(o, n, i);
    }
    return i;
  }
  function rp(t, n, i) {
    t.flags |= 16384, t = { getSnapshot: n, value: i }, n = bt.updateQueue, n === null ? (n = to(), bt.updateQueue = n, n.stores = [t]) : (i = n.stores, i === null ? n.stores = [t] : i.push(t));
  }
  function up(t, n, i, o) {
    n.value = i, n.getSnapshot = o, fp(n) && dp(t);
  }
  function cp(t, n, i) {
    return i(function() {
      fp(n) && dp(t);
    });
  }
  function fp(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var i = n();
      return !Ue(t, i);
    } catch {
      return !0;
    }
  }
  function dp(t) {
    var n = Ma(t, 2);
    n !== null && ze(n, t, 2);
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
      lastRenderedReducer: zn,
      lastRenderedState: t
    }, n;
  }
  function hp(t, n, i, o) {
    return t.baseState = i, Xu(
      t,
      Bt,
      typeof o == "function" ? o : zn
    );
  }
  function TS(t, n, i, o, u) {
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
      V.T !== null ? i(!0) : d.isTransition = !1, o(d), i = n.pending, i === null ? (d.next = n.pending = d, mp(n, d)) : (d.next = i.next, n.pending = i.next = d);
    }
  }
  function mp(t, n) {
    var i = n.action, o = n.payload, u = t.state;
    if (n.isTransition) {
      var d = V.T, x = {};
      V.T = x;
      try {
        var C = i(u, o), O = V.S;
        O !== null && O(x, C), pp(t, n, C);
      } catch ($) {
        Zu(t, n, $);
      } finally {
        d !== null && x.types !== null && (d.types = x.types), V.T = d;
      }
    } else
      try {
        d = i(u, o), pp(t, n, d);
      } catch ($) {
        Zu(t, n, $);
      }
  }
  function pp(t, n, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(o) {
        yp(t, n, o);
      },
      function(o) {
        return Zu(t, n, o);
      }
    ) : yp(t, n, i);
  }
  function yp(t, n, i) {
    n.status = "fulfilled", n.value = i, gp(n), t.state = i, n = t.pending, n !== null && (i = n.next, i === n ? t.pending = null : (i = i.next, n.next = i, mp(t, i)));
  }
  function Zu(t, n, i) {
    var o = t.pending;
    if (t.pending = null, o !== null) {
      o = o.next;
      do
        n.status = "rejected", n.reason = i, gp(n), n = n.next;
      while (n !== o);
    }
    t.action = null;
  }
  function gp(t) {
    t = t.listeners;
    for (var n = 0; n < t.length; n++) (0, t[n])();
  }
  function vp(t, n) {
    return n;
  }
  function bp(t, n) {
    if (Mt) {
      var i = Ht.formState;
      if (i !== null) {
        t: {
          var o = bt;
          if (Mt) {
            if (Yt) {
              e: {
                for (var u = Yt, d = tn; u.nodeType !== 8; ) {
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
                Yt = nn(
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
      lastRenderedReducer: vp,
      lastRenderedState: n
    }, i.queue = o, i = Up.bind(
      null,
      bt,
      o
    ), o.dispatch = i, o = Ku(!1), d = tc.bind(
      null,
      bt,
      !1,
      o.queue
    ), o = Ce(), u = {
      state: n,
      dispatch: null,
      action: t,
      pending: null
    }, o.queue = u, i = TS.bind(
      null,
      bt,
      u,
      d,
      i
    ), u.dispatch = i, o.memoizedState = t, [n, i, !1];
  }
  function xp(t) {
    var n = It();
    return Sp(n, Bt, t);
  }
  function Sp(t, n, i) {
    if (n = Xu(
      t,
      n,
      vp
    )[0], t = no(zn)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var o = Ml(n);
      } catch (x) {
        throw x === vi ? Ps : x;
      }
    else o = n;
    n = It();
    var u = n.queue, d = u.dispatch;
    return i !== n.memoizedState && (bt.flags |= 2048, Ti(
      9,
      { destroy: void 0 },
      CS.bind(null, u, i),
      null
    )), [o, d, t];
  }
  function CS(t, n) {
    t.action = n;
  }
  function wp(t) {
    var n = It(), i = Bt;
    if (i !== null)
      return Sp(n, i, t);
    It(), n = n.memoizedState, i = It();
    var o = i.queue.dispatch;
    return i.memoizedState = t, [n, o, !1];
  }
  function Ti(t, n, i, o) {
    return t = { tag: t, create: i, deps: o, inst: n, next: null }, n = bt.updateQueue, n === null && (n = to(), bt.updateQueue = n), i = n.lastEffect, i === null ? n.lastEffect = t.next = t : (o = i.next, i.next = t, t.next = o, n.lastEffect = t), t;
  }
  function Tp() {
    return It().memoizedState;
  }
  function ao(t, n, i, o) {
    var u = Ce();
    bt.flags |= t, u.memoizedState = Ti(
      1 | n,
      { destroy: void 0 },
      i,
      o === void 0 ? null : o
    );
  }
  function io(t, n, i, o) {
    var u = It();
    o = o === void 0 ? null : o;
    var d = u.memoizedState.inst;
    Bt !== null && o !== null && ku(o, Bt.memoizedState.deps) ? u.memoizedState = Ti(n, d, i, o) : (bt.flags |= t, u.memoizedState = Ti(
      1 | n,
      d,
      i,
      o
    ));
  }
  function Cp(t, n) {
    ao(8390656, 8, t, n);
  }
  function Qu(t, n) {
    io(2048, 8, t, n);
  }
  function ES(t) {
    bt.flags |= 4;
    var n = bt.updateQueue;
    if (n === null)
      n = to(), bt.updateQueue = n, n.events = [t];
    else {
      var i = n.events;
      i === null ? n.events = [t] : i.push(t);
    }
  }
  function Ep(t) {
    var n = It().memoizedState;
    return ES({ ref: n, nextImpl: t }), function() {
      if ((Nt & 2) !== 0) throw Error(s(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Ap(t, n) {
    return io(4, 2, t, n);
  }
  function jp(t, n) {
    return io(4, 4, t, n);
  }
  function Mp(t, n) {
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
  function _p(t, n, i) {
    i = i != null ? i.concat([t]) : null, io(4, 4, Mp.bind(null, n, t), i);
  }
  function Fu() {
  }
  function Dp(t, n) {
    var i = It();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    return n !== null && ku(n, o[1]) ? o[0] : (i.memoizedState = [t, n], t);
  }
  function Rp(t, n) {
    var i = It();
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
    return i === void 0 || (On & 1073741824) !== 0 && (At & 261930) === 0 ? t.memoizedState = n : (t.memoizedState = i, t = N1(), bt.lanes |= t, sa |= t, i);
  }
  function Np(t, n, i, o) {
    return Ue(i, n) ? i : xi.current !== null ? (t = Ju(t, i, o), Ue(t, n) || (ie = !0), t) : (On & 42) === 0 || (On & 1073741824) !== 0 && (At & 261930) === 0 ? (ie = !0, t.memoizedState = i) : (t = N1(), bt.lanes |= t, sa |= t, n);
  }
  function Op(t, n, i, o, u) {
    var d = J.p;
    J.p = d !== 0 && 8 > d ? d : 8;
    var x = V.T, C = {};
    V.T = C, tc(t, !1, n, i);
    try {
      var O = u(), $ = V.S;
      if ($ !== null && $(C, O), O !== null && typeof O == "object" && typeof O.then == "function") {
        var Z = xS(
          O,
          o
        );
        _l(
          t,
          n,
          Z,
          Ye(t)
        );
      } else
        _l(
          t,
          n,
          o,
          Ye(t)
        );
    } catch (W) {
      _l(
        t,
        n,
        { then: function() {
        }, status: "rejected", reason: W },
        Ye()
      );
    } finally {
      J.p = d, x !== null && C.types !== null && (x.types = C.types), V.T = x;
    }
  }
  function AS() {
  }
  function Wu(t, n, i, o) {
    if (t.tag !== 5) throw Error(s(476));
    var u = zp(t).queue;
    Op(
      t,
      u,
      n,
      et,
      i === null ? AS : function() {
        return Lp(t), i(o);
      }
    );
  }
  function zp(t) {
    var n = t.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: et,
      baseState: et,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: zn,
        lastRenderedState: et
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
        lastRenderedReducer: zn,
        lastRenderedState: i
      },
      next: null
    }, t.memoizedState = n, t = t.alternate, t !== null && (t.memoizedState = n), n;
  }
  function Lp(t) {
    var n = zp(t);
    n.next === null && (n = t.alternate.memoizedState), _l(
      t,
      n.next.queue,
      {},
      Ye()
    );
  }
  function Iu() {
    return ye(Pl);
  }
  function Bp() {
    return It().memoizedState;
  }
  function Vp() {
    return It().memoizedState;
  }
  function jS(t) {
    for (var n = t.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var i = Ye();
          t = ta(i);
          var o = ea(n, t, i);
          o !== null && (ze(o, n, i), Cl(o, n, i)), n = { cache: Mu() }, t.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function MS(t, n, i) {
    var o = Ye();
    i = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, lo(t) ? kp(n, i) : (i = gu(t, n, i, o), i !== null && (ze(i, t, o), Hp(i, n, o)));
  }
  function Up(t, n, i) {
    var o = Ye();
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
    if (lo(t)) kp(n, u);
    else {
      var d = t.alternate;
      if (t.lanes === 0 && (d === null || d.lanes === 0) && (d = n.lastRenderedReducer, d !== null))
        try {
          var x = n.lastRenderedState, C = d(x, i);
          if (u.hasEagerState = !0, u.eagerState = C, Ue(C, x))
            return ks(t, n, u, 0), Ht === null && Us(), !1;
        } catch {
        } finally {
        }
      if (i = gu(t, n, u, o), i !== null)
        return ze(i, t, o), Hp(i, n, o), !0;
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
      ), n !== null && ze(n, t, 2);
  }
  function lo(t) {
    var n = t.alternate;
    return t === bt || n !== null && n === bt;
  }
  function kp(t, n) {
    Si = Ws = !0;
    var i = t.pending;
    i === null ? n.next = n : (n.next = i.next, i.next = n), t.pending = n;
  }
  function Hp(t, n, i) {
    if ((i & 4194048) !== 0) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, Xh(t, i);
    }
  }
  var Dl = {
    readContext: ye,
    use: eo,
    useCallback: Qt,
    useContext: Qt,
    useEffect: Qt,
    useImperativeHandle: Qt,
    useLayoutEffect: Qt,
    useInsertionEffect: Qt,
    useMemo: Qt,
    useReducer: Qt,
    useRef: Qt,
    useState: Qt,
    useDebugValue: Qt,
    useDeferredValue: Qt,
    useTransition: Qt,
    useSyncExternalStore: Qt,
    useId: Qt,
    useHostTransitionStatus: Qt,
    useFormState: Qt,
    useActionState: Qt,
    useOptimistic: Qt,
    useMemoCache: Qt,
    useCacheRefresh: Qt
  };
  Dl.useEffectEvent = Qt;
  var qp = {
    readContext: ye,
    use: eo,
    useCallback: function(t, n) {
      return Ce().memoizedState = [
        t,
        n === void 0 ? null : n
      ], t;
    },
    useContext: ye,
    useEffect: Cp,
    useImperativeHandle: function(t, n, i) {
      i = i != null ? i.concat([t]) : null, ao(
        4194308,
        4,
        Mp.bind(null, n, t),
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
      }, o.queue = t, t = t.dispatch = MS.bind(
        null,
        bt,
        t
      ), [o.memoizedState, t];
    },
    useRef: function(t) {
      var n = Ce();
      return t = { current: t }, n.memoizedState = t;
    },
    useState: function(t) {
      t = Ku(t);
      var n = t.queue, i = Up.bind(null, bt, n);
      return n.dispatch = i, [t.memoizedState, i];
    },
    useDebugValue: Fu,
    useDeferredValue: function(t, n) {
      var i = Ce();
      return Ju(i, t, n);
    },
    useTransition: function() {
      var t = Ku(!1);
      return t = Op.bind(
        null,
        bt,
        t.queue,
        !0,
        !1
      ), Ce().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, n, i) {
      var o = bt, u = Ce();
      if (Mt) {
        if (i === void 0)
          throw Error(s(407));
        i = i();
      } else {
        if (i = n(), Ht === null)
          throw Error(s(349));
        (At & 127) !== 0 || rp(o, n, i);
      }
      u.memoizedState = i;
      var d = { value: i, getSnapshot: n };
      return u.queue = d, Cp(cp.bind(null, o, d, t), [
        t
      ]), o.flags |= 2048, Ti(
        9,
        { destroy: void 0 },
        up.bind(
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
      var t = Ce(), n = Ht.identifierPrefix;
      if (Mt) {
        var i = gn, o = yn;
        i = (o & ~(1 << 32 - Ve(o) - 1)).toString(32) + i, n = "_" + n + "R_" + i, i = Is++, 0 < i && (n += "H" + i.toString(32)), n += "_";
      } else
        i = SS++, n = "_" + n + "r_" + i.toString(32) + "_";
      return t.memoizedState = n;
    },
    useHostTransitionStatus: Iu,
    useFormState: bp,
    useActionState: bp,
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
        bt,
        !0,
        i
      ), i.dispatch = n, [t, n];
    },
    useMemoCache: Yu,
    useCacheRefresh: function() {
      return Ce().memoizedState = jS.bind(
        null,
        bt
      );
    },
    useEffectEvent: function(t) {
      var n = Ce(), i = { impl: t };
      return n.memoizedState = i, function() {
        if ((Nt & 2) !== 0)
          throw Error(s(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, ec = {
    readContext: ye,
    use: eo,
    useCallback: Dp,
    useContext: ye,
    useEffect: Qu,
    useImperativeHandle: _p,
    useInsertionEffect: Ap,
    useLayoutEffect: jp,
    useMemo: Rp,
    useReducer: no,
    useRef: Tp,
    useState: function() {
      return no(zn);
    },
    useDebugValue: Fu,
    useDeferredValue: function(t, n) {
      var i = It();
      return Np(
        i,
        Bt.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = no(zn)[0], n = It().memoizedState;
      return [
        typeof t == "boolean" ? t : Ml(t),
        n
      ];
    },
    useSyncExternalStore: op,
    useId: Bp,
    useHostTransitionStatus: Iu,
    useFormState: xp,
    useActionState: xp,
    useOptimistic: function(t, n) {
      var i = It();
      return hp(i, Bt, t, n);
    },
    useMemoCache: Yu,
    useCacheRefresh: Vp
  };
  ec.useEffectEvent = Ep;
  var $p = {
    readContext: ye,
    use: eo,
    useCallback: Dp,
    useContext: ye,
    useEffect: Qu,
    useImperativeHandle: _p,
    useInsertionEffect: Ap,
    useLayoutEffect: jp,
    useMemo: Rp,
    useReducer: Pu,
    useRef: Tp,
    useState: function() {
      return Pu(zn);
    },
    useDebugValue: Fu,
    useDeferredValue: function(t, n) {
      var i = It();
      return Bt === null ? Ju(i, t, n) : Np(
        i,
        Bt.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = Pu(zn)[0], n = It().memoizedState;
      return [
        typeof t == "boolean" ? t : Ml(t),
        n
      ];
    },
    useSyncExternalStore: op,
    useId: Bp,
    useHostTransitionStatus: Iu,
    useFormState: wp,
    useActionState: wp,
    useOptimistic: function(t, n) {
      var i = It();
      return Bt !== null ? hp(i, Bt, t, n) : (i.baseState = t, [t, i.queue.dispatch]);
    },
    useMemoCache: Yu,
    useCacheRefresh: Vp
  };
  $p.useEffectEvent = Ep;
  function nc(t, n, i, o) {
    n = t.memoizedState, i = i(o, n), i = i == null ? n : v({}, n, i), t.memoizedState = i, t.lanes === 0 && (t.updateQueue.baseState = i);
  }
  var ac = {
    enqueueSetState: function(t, n, i) {
      t = t._reactInternals;
      var o = Ye(), u = ta(o);
      u.payload = n, i != null && (u.callback = i), n = ea(t, u, o), n !== null && (ze(n, t, o), Cl(n, t, o));
    },
    enqueueReplaceState: function(t, n, i) {
      t = t._reactInternals;
      var o = Ye(), u = ta(o);
      u.tag = 1, u.payload = n, i != null && (u.callback = i), n = ea(t, u, o), n !== null && (ze(n, t, o), Cl(n, t, o));
    },
    enqueueForceUpdate: function(t, n) {
      t = t._reactInternals;
      var i = Ye(), o = ta(i);
      o.tag = 2, n != null && (o.callback = n), n = ea(t, o, i), n !== null && (ze(n, t, i), Cl(n, t, i));
    }
  };
  function Gp(t, n, i, o, u, d, x) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(o, d, x) : n.prototype && n.prototype.isPureReactComponent ? !yl(i, o) || !yl(u, d) : !0;
  }
  function Yp(t, n, i, o) {
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
  function Xp(t) {
    Vs(t);
  }
  function Pp(t) {
    console.error(t);
  }
  function Kp(t) {
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
  function Zp(t, n, i) {
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
  function Qp(t) {
    return t = ta(t), t.tag = 3, t;
  }
  function Fp(t, n, i, o) {
    var u = i.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var d = o.value;
      t.payload = function() {
        return u(d);
      }, t.callback = function() {
        Zp(n, i, o);
      };
    }
    var x = i.stateNode;
    x !== null && typeof x.componentDidCatch == "function" && (t.callback = function() {
      Zp(n, i, o), typeof u != "function" && (oa === null ? oa = /* @__PURE__ */ new Set([this]) : oa.add(this));
      var C = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: C !== null ? C : ""
      });
    });
  }
  function _S(t, n, i, o, u) {
    if (i.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (n = i.alternate, n !== null && pi(
        n,
        i,
        u,
        !0
      ), i = He.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return en === null ? bo() : i.alternate === null && Ft === 0 && (Ft = 3), i.flags &= -257, i.flags |= 65536, i.lanes = u, o === Ks ? i.flags |= 16384 : (n = i.updateQueue, n === null ? i.updateQueue = /* @__PURE__ */ new Set([o]) : n.add(o), _c(t, o, u)), !1;
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
    if (Mt)
      return n = He.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = u, o !== Tu && (t = Error(s(422), { cause: o }), bl(Je(t, i)))) : (o !== Tu && (n = Error(s(423), {
        cause: o
      }), bl(
        Je(n, i)
      )), t = t.current.alternate, t.flags |= 65536, u &= -u, t.lanes |= u, o = Je(o, i), u = ic(
        t.stateNode,
        o,
        u
      ), zu(t, u), Ft !== 4 && (Ft = 2)), !1;
    var d = Error(s(520), { cause: o });
    if (d = Je(d, i), Ul === null ? Ul = [d] : Ul.push(d), Ft !== 4 && (Ft = 2), n === null) return !0;
    o = Je(o, i), i = n;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, t = u & -u, i.lanes |= t, t = ic(i.stateNode, o, t), zu(i, t), !1;
        case 1:
          if (n = i.type, d = i.stateNode, (i.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (oa === null || !oa.has(d))))
            return i.flags |= 65536, u &= -u, i.lanes |= u, u = Qp(u), Fp(
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
    n.child = t === null ? tp(n, null, i, o) : Ba(
      n,
      t.child,
      i,
      o
    );
  }
  function Jp(t, n, i, o, u) {
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
    ), C = qu(), t !== null && !ie ? ($u(t, n, u), Ln(t, n, u)) : (Mt && C && Su(n), n.flags |= 1, ge(t, n, o, u), n.child);
  }
  function Wp(t, n, i, o, u) {
    if (t === null) {
      var d = i.type;
      return typeof d == "function" && !vu(d) && d.defaultProps === void 0 && i.compare === null ? (n.tag = 15, n.type = d, Ip(
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
        return Ln(t, n, u);
    }
    return n.flags |= 1, t = _n(d, o), t.ref = n.ref, t.return = n, n.child = t;
  }
  function Ip(t, n, i, o, u) {
    if (t !== null) {
      var d = t.memoizedProps;
      if (yl(d, o) && t.ref === n.ref)
        if (ie = !1, n.pendingProps = o = d, hc(t, u))
          (t.flags & 131072) !== 0 && (ie = !0);
        else
          return n.lanes = t.lanes, Ln(t, n, u);
    }
    return sc(
      t,
      n,
      i,
      o,
      u
    );
  }
  function t1(t, n, i, o) {
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
        return e1(
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
        ), d !== null ? ap(n, d) : Bu(), ip(n);
      else
        return o = n.lanes = 536870912, e1(
          t,
          n,
          d !== null ? d.baseLanes | i : i,
          i,
          o
        );
    } else
      d !== null ? (Xs(n, d.cachePool), ap(n, d), aa(), n.memoizedState = null) : (t !== null && Xs(n, null), Bu(), aa());
    return ge(t, n, u, i), n.child;
  }
  function Rl(t, n) {
    return t !== null && t.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function e1(t, n, i, o, u) {
    var d = Du();
    return d = d === null ? null : { parent: ne._currentValue, pool: d }, n.memoizedState = {
      baseLanes: i,
      cachePool: d
    }, t !== null && Xs(n, null), Bu(), ip(n), t !== null && pi(t, n, o, !0), n.childLanes = u, null;
  }
  function oo(t, n) {
    return n = uo(
      { mode: n.mode, children: n.children },
      t.mode
    ), n.ref = t.ref, t.child = n, n.return = t, n;
  }
  function n1(t, n, i) {
    return Ba(n, t.child, null, i), t = oo(n, n.pendingProps), t.flags |= 2, qe(n), n.memoizedState = null, t;
  }
  function DS(t, n, i) {
    var o = n.pendingProps, u = (n.flags & 128) !== 0;
    if (n.flags &= -129, t === null) {
      if (Mt) {
        if (o.mode === "hidden")
          return t = oo(n, o), n.lanes = 536870912, Rl(null, t);
        if (Uu(n), (t = Yt) ? (t = m0(
          t,
          tn
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Qn !== null ? { id: yn, overflow: gn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = km(t), i.return = n, n.child = i, pe = n, Yt = null)) : t = null, t === null) throw Jn(n);
        return n.lanes = 536870912, null;
      }
      return oo(n, o);
    }
    var d = t.memoizedState;
    if (d !== null) {
      var x = d.dehydrated;
      if (Uu(n), u)
        if (n.flags & 256)
          n.flags &= -257, n = n1(
            t,
            n,
            i
          );
        else if (n.memoizedState !== null)
          n.child = t.child, n.flags |= 128, n = null;
        else throw Error(s(558));
      else if (ie || pi(t, n, i, !1), u = (i & t.childLanes) !== 0, ie || u) {
        if (o = Ht, o !== null && (x = Ph(o, i), x !== 0 && x !== d.retryLane))
          throw d.retryLane = x, Ma(t, x), ze(o, t, x), lc;
        bo(), n = n1(
          t,
          n,
          i
        );
      } else
        t = d.treeContext, Yt = nn(x.nextSibling), pe = n, Mt = !0, Fn = null, tn = !1, t !== null && $m(n, t), n = oo(n, o), n.flags |= 4096;
      return n;
    }
    return t = _n(t.child, {
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
    ), o = qu(), t !== null && !ie ? ($u(t, n, u), Ln(t, n, u)) : (Mt && o && Su(n), n.flags |= 1, ge(t, n, i, u), n.child);
  }
  function a1(t, n, i, o, u, d) {
    return Na(n), n.updateQueue = null, i = sp(
      n,
      o,
      i,
      u
    ), lp(t), o = qu(), t !== null && !ie ? ($u(t, n, d), Ln(t, n, d)) : (Mt && o && Su(n), n.flags |= 1, ge(t, n, i, d), n.child);
  }
  function i1(t, n, i, o, u) {
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
      var $ = d.context, Z = i.contextType;
      x = fi, typeof Z == "object" && Z !== null && (x = ye(Z));
      var W = i.getDerivedStateFromProps;
      Z = typeof W == "function" || typeof d.getSnapshotBeforeUpdate == "function", C = n.pendingProps !== C, Z || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (C || $ !== x) && Yp(
        n,
        d,
        o,
        x
      ), In = !1;
      var G = n.memoizedState;
      d.state = G, Al(n, o, d, u), El(), $ = n.memoizedState, C || G !== $ || In ? (typeof W == "function" && (nc(
        n,
        i,
        W,
        o
      ), $ = n.memoizedState), (O = In || Gp(
        n,
        i,
        O,
        o,
        G,
        $,
        x
      )) ? (Z || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = o, n.memoizedState = $), d.props = o, d.state = $, d.context = x, o = O) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), o = !1);
    } else {
      d = n.stateNode, Ou(t, n), x = n.memoizedProps, Z = Ua(i, x), d.props = Z, W = n.pendingProps, G = d.context, $ = i.contextType, O = fi, typeof $ == "object" && $ !== null && (O = ye($)), C = i.getDerivedStateFromProps, ($ = typeof C == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (x !== W || G !== O) && Yp(
        n,
        d,
        o,
        O
      ), In = !1, G = n.memoizedState, d.state = G, Al(n, o, d, u), El();
      var X = n.memoizedState;
      x !== W || G !== X || In || t !== null && t.dependencies !== null && Gs(t.dependencies) ? (typeof C == "function" && (nc(
        n,
        i,
        C,
        o
      ), X = n.memoizedState), (Z = In || Gp(
        n,
        i,
        Z,
        o,
        G,
        X,
        O
      ) || t !== null && t.dependencies !== null && Gs(t.dependencies)) ? ($ || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(o, X, O), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(
        o,
        X,
        O
      )), typeof d.componentDidUpdate == "function" && (n.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || x === t.memoizedProps && G === t.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || x === t.memoizedProps && G === t.memoizedState || (n.flags |= 1024), n.memoizedProps = o, n.memoizedState = X), d.props = o, d.state = X, d.context = O, o = Z) : (typeof d.componentDidUpdate != "function" || x === t.memoizedProps && G === t.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || x === t.memoizedProps && G === t.memoizedState || (n.flags |= 1024), o = !1);
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
    )) : ge(t, n, i, u), n.memoizedState = d.state, t = n.child) : t = Ln(
      t,
      n,
      u
    ), t;
  }
  function l1(t, n, i, o) {
    return Da(), n.flags |= 256, ge(t, n, i, o), n.child;
  }
  var oc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function rc(t) {
    return { baseLanes: t, cachePool: Zm() };
  }
  function uc(t, n, i) {
    return t = t !== null ? t.childLanes & ~i : 0, n && (t |= Ge), t;
  }
  function s1(t, n, i) {
    var o = n.pendingProps, u = !1, d = (n.flags & 128) !== 0, x;
    if ((x = d) || (x = t !== null && t.memoizedState === null ? !1 : (Wt.current & 2) !== 0), x && (u = !0, n.flags &= -129), x = (n.flags & 32) !== 0, n.flags &= -33, t === null) {
      if (Mt) {
        if (u ? na(n) : aa(), (t = Yt) ? (t = m0(
          t,
          tn
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Qn !== null ? { id: yn, overflow: gn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = km(t), i.return = n, n.child = i, pe = n, Yt = null)) : t = null, t === null) throw Jn(n);
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
      ), n.memoizedState = oc, Rl(null, o)) : (na(n), cc(n, C));
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
        ), n.memoizedState = oc, n = Rl(null, o));
      else if (na(n), Xc(C)) {
        if (x = C.nextSibling && C.nextSibling.dataset, x) var $ = x.dgst;
        x = $, o = Error(s(419)), o.stack = "", o.digest = x, bl({ value: o, source: null, stack: null }), n = fc(
          t,
          n,
          i
        );
      } else if (ie || pi(t, n, i, !1), x = (i & t.childLanes) !== 0, ie || x) {
        if (x = Ht, x !== null && (o = Ph(x, i), o !== 0 && o !== O.retryLane))
          throw O.retryLane = o, Ma(t, o), ze(x, t, o), lc;
        Yc(C) || bo(), n = fc(
          t,
          n,
          i
        );
      } else
        Yc(C) ? (n.flags |= 192, n.child = t.child, n = null) : (t = O.treeContext, Yt = nn(
          C.nextSibling
        ), pe = n, Mt = !0, Fn = null, tn = !1, t !== null && $m(n, t), n = cc(
          n,
          o.children
        ), n.flags |= 4096);
      return n;
    }
    return u ? (aa(), C = o.fallback, u = n.mode, O = t.child, $ = O.sibling, o = _n(O, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = O.subtreeFlags & 65011712, $ !== null ? C = _n(
      $,
      C
    ) : (C = _a(
      C,
      u,
      i,
      null
    ), C.flags |= 2), C.return = n, o.return = n, o.sibling = C, n.child = o, Rl(null, o), o = n.child, C = t.child.memoizedState, C === null ? C = rc(i) : (u = C.cachePool, u !== null ? (O = ne._currentValue, u = u.parent !== O ? { parent: O, pool: O } : u) : u = Zm(), C = {
      baseLanes: C.baseLanes | i,
      cachePool: u
    }), o.memoizedState = C, o.childLanes = uc(
      t,
      x,
      i
    ), n.memoizedState = oc, Rl(t.child, o)) : (na(n), i = t.child, t = i.sibling, i = _n(i, {
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
    return t = ke(22, t, null, n), t.lanes = 0, t;
  }
  function fc(t, n, i) {
    return Ba(n, t.child, null, i), t = cc(
      n,
      n.pendingProps.children
    ), t.flags |= 2, n.memoizedState = null, t;
  }
  function o1(t, n, i) {
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
  function r1(t, n, i) {
    var o = n.pendingProps, u = o.revealOrder, d = o.tail;
    o = o.children;
    var x = Wt.current, C = (x & 2) !== 0;
    if (C ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, tt(Wt, x), ge(t, n, o, i), o = Mt ? vl : 0, !C && t !== null && (t.flags & 128) !== 0)
      t: for (t = n.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && o1(t, i, n);
        else if (t.tag === 19)
          o1(t, i, n);
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
  function Ln(t, n, i) {
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
      for (t = n.child, i = _n(t, t.pendingProps), n.child = i, i.return = n; t.sibling !== null; )
        t = t.sibling, i = i.sibling = _n(t, t.pendingProps), i.return = n;
      i.sibling = null;
    }
    return n.child;
  }
  function hc(t, n) {
    return (t.lanes & n) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Gs(t)));
  }
  function RS(t, n, i) {
    switch (n.tag) {
      case 3:
        Rt(n, n.stateNode.containerInfo), Wn(n, ne, t.memoizedState.cache), Da();
        break;
      case 27:
      case 5:
        Tt(n);
        break;
      case 4:
        Rt(n, n.stateNode.containerInfo);
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
          return o.dehydrated !== null ? (na(n), n.flags |= 128, null) : (i & n.child.childLanes) !== 0 ? s1(t, n, i) : (na(n), t = Ln(
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
            return r1(
              t,
              n,
              i
            );
          n.flags |= 128;
        }
        if (u = n.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), tt(Wt, Wt.current), o) break;
        return null;
      case 22:
        return n.lanes = 0, t1(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        Wn(n, ne, t.memoizedState.cache);
    }
    return Ln(t, n, i);
  }
  function u1(t, n, i) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps)
        ie = !0;
      else {
        if (!hc(t, i) && (n.flags & 128) === 0)
          return ie = !1, RS(
            t,
            n,
            i
          );
        ie = (t.flags & 131072) !== 0;
      }
    else
      ie = !1, Mt && (n.flags & 1048576) !== 0 && qm(n, vl, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        t: {
          var o = n.pendingProps;
          if (t = za(n.elementType), n.type = t, typeof t == "function")
            vu(t) ? (o = Ua(t, o), n.tag = 1, n = i1(
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
              if (u === R) {
                n.tag = 11, n = Jp(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break t;
              } else if (u === D) {
                n.tag = 14, n = Wp(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break t;
              }
            }
            throw n = at(t) || t, Error(s(306, n, ""));
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
        ), i1(
          t,
          n,
          o,
          u,
          i
        );
      case 3:
        t: {
          if (Rt(
            n,
            n.stateNode.containerInfo
          ), t === null) throw Error(s(387));
          o = n.pendingProps;
          var d = n.memoizedState;
          u = d.element, Ou(t, n), Al(n, o, null, i);
          var x = n.memoizedState;
          if (o = x.cache, Wn(n, ne, o), o !== d.cache && ju(
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
              n = l1(
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
              ), bl(u), n = l1(
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
              for (Yt = nn(t.firstChild), pe = n, Mt = !0, Fn = null, tn = !0, i = tp(
                n,
                null,
                o,
                i
              ), n.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (Da(), o === u) {
              n = Ln(
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
        return ro(t, n), t === null ? (i = x0(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = i : Mt || (i = n.type, t = n.pendingProps, o = Ao(
          ht.current
        ).createElement(i), o[me] = n, o[Me] = t, ve(o, i, t), de(o), n.stateNode = o) : n.memoizedState = x0(
          n.type,
          t.memoizedProps,
          n.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Tt(n), t === null && Mt && (o = n.stateNode = g0(
          n.type,
          n.pendingProps,
          ht.current
        ), pe = n, tn = !0, u = Yt, fa(n.type) ? (Pc = u, Yt = nn(o.firstChild)) : Yt = u), ge(
          t,
          n,
          n.pendingProps.children,
          i
        ), ro(t, n), t === null && (n.flags |= 4194304), n.child;
      case 5:
        return t === null && Mt && ((u = o = Yt) && (o = o3(
          o,
          n.type,
          n.pendingProps,
          tn
        ), o !== null ? (n.stateNode = o, pe = n, Yt = nn(o.firstChild), tn = !1, u = !0) : u = !1), u || Jn(n)), Tt(n), u = n.type, d = n.pendingProps, x = t !== null ? t.memoizedProps : null, o = d.children, qc(u, d) ? o = null : x !== null && qc(u, x) && (n.flags |= 32), n.memoizedState !== null && (u = Hu(
          t,
          n,
          wS,
          null,
          null,
          i
        ), Pl._currentValue = u), ro(t, n), ge(t, n, o, i), n.child;
      case 6:
        return t === null && Mt && ((t = i = Yt) && (i = r3(
          i,
          n.pendingProps,
          tn
        ), i !== null ? (n.stateNode = i, pe = n, Yt = null, t = !0) : t = !1), t || Jn(n)), null;
      case 13:
        return s1(t, n, i);
      case 4:
        return Rt(
          n,
          n.stateNode.containerInfo
        ), o = n.pendingProps, t === null ? n.child = Ba(
          n,
          null,
          o,
          i
        ) : ge(t, n, o, i), n.child;
      case 11:
        return Jp(
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
        return Wp(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 15:
        return Ip(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 19:
        return r1(t, n, i);
      case 31:
        return DS(t, n, i);
      case 22:
        return t1(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        return Na(n), o = ye(ne), t === null ? (u = Du(), u === null && (u = Ht, d = Mu(), u.pooledCache = d, d.refCount++, d !== null && (u.pooledCacheLanes |= i), u = d), n.memoizedState = { parent: o, cache: u }, Nu(n), Wn(n, ne, u)) : ((t.lanes & i) !== 0 && (Ou(t, n), Al(n, null, null, i), El()), u = t.memoizedState, d = n.memoizedState, u.parent !== o ? (u = { parent: o, cache: o }, n.memoizedState = u, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = u), Wn(n, ne, o)) : (o = d.cache, Wn(n, ne, o), o !== u.cache && ju(
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
  function Bn(t) {
    t.flags |= 4;
  }
  function mc(t, n, i, o, u) {
    if ((n = (t.mode & 32) !== 0) && (n = !1), n) {
      if (t.flags |= 16777216, (u & 335544128) === u)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (B1()) t.flags |= 8192;
        else
          throw La = Ks, Ru;
    } else t.flags &= -16777217;
  }
  function c1(t, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !E0(n))
      if (B1()) t.flags |= 8192;
      else
        throw La = Ks, Ru;
  }
  function co(t, n) {
    n !== null && (t.flags |= 4), t.flags & 16384 && (n = t.tag !== 22 ? Gh() : 536870912, t.lanes |= n, ji |= n);
  }
  function Nl(t, n) {
    if (!Mt)
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
  function NS(t, n, i) {
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
        return Xt(n), null;
      case 1:
        return Xt(n), null;
      case 3:
        return i = n.stateNode, o = null, t !== null && (o = t.memoizedState.cache), n.memoizedState.cache !== o && (n.flags |= 2048), Nn(ne), it(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (t === null || t.child === null) && (mi(n) ? Bn(n) : t === null || t.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Cu())), Xt(n), null;
      case 26:
        var u = n.type, d = n.memoizedState;
        return t === null ? (Bn(n), d !== null ? (Xt(n), c1(n, d)) : (Xt(n), mc(
          n,
          u,
          null,
          o,
          i
        ))) : d ? d !== t.memoizedState ? (Bn(n), Xt(n), c1(n, d)) : (Xt(n), n.flags &= -16777217) : (t = t.memoizedProps, t !== o && Bn(n), Xt(n), mc(
          n,
          u,
          t,
          o,
          i
        )), null;
      case 27:
        if (Gt(n), i = ht.current, u = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && Bn(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(s(166));
            return Xt(n), null;
          }
          t = lt.current, mi(n) ? Gm(n) : (t = g0(u, o, i), n.stateNode = t, Bn(n));
        }
        return Xt(n), null;
      case 5:
        if (Gt(n), u = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && Bn(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(s(166));
            return Xt(n), null;
          }
          if (d = lt.current, mi(n))
            Gm(n);
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
            d[me] = n, d[Me] = o;
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
            o && Bn(n);
          }
        }
        return Xt(n), mc(
          n,
          n.type,
          t === null ? null : t.memoizedProps,
          n.pendingProps,
          i
        ), null;
      case 6:
        if (t && n.stateNode != null)
          t.memoizedProps !== o && Bn(n);
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
            t[me] = n, t = !!(t.nodeValue === i || o !== null && o.suppressHydrationWarning === !0 || s0(t.nodeValue, i)), t || Jn(n, !0);
          } else
            t = Ao(t).createTextNode(
              o
            ), t[me] = n, n.stateNode = t;
        }
        return Xt(n), null;
      case 31:
        if (i = n.memoizedState, t === null || t.memoizedState !== null) {
          if (o = mi(n), i !== null) {
            if (t === null) {
              if (!o) throw Error(s(318));
              if (t = n.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[me] = n;
            } else
              Da(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Xt(n), t = !1;
          } else
            i = Cu(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = i), t = !0;
          if (!t)
            return n.flags & 256 ? (qe(n), n) : (qe(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(s(558));
        }
        return Xt(n), null;
      case 13:
        if (o = n.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (u = mi(n), o !== null && o.dehydrated !== null) {
            if (t === null) {
              if (!u) throw Error(s(318));
              if (u = n.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[me] = n;
            } else
              Da(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Xt(n), u = !1;
          } else
            u = Cu(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return n.flags & 256 ? (qe(n), n) : (qe(n), null);
        }
        return qe(n), (n.flags & 128) !== 0 ? (n.lanes = i, n) : (i = o !== null, t = t !== null && t.memoizedState !== null, i && (o = n.child, u = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (u = o.alternate.memoizedState.cachePool.pool), d = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (d = o.memoizedState.cachePool.pool), d !== u && (o.flags |= 2048)), i !== t && i && (n.child.flags |= 8192), co(n, n.updateQueue), Xt(n), null);
      case 4:
        return it(), t === null && Bc(n.stateNode.containerInfo), Xt(n), null;
      case 10:
        return Nn(n.type), Xt(n), null;
      case 19:
        if (Y(Wt), o = n.memoizedState, o === null) return Xt(n), null;
        if (u = (n.flags & 128) !== 0, d = o.rendering, d === null)
          if (u) Nl(o, !1);
          else {
            if (Ft !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = n.child; t !== null; ) {
                if (d = Js(t), d !== null) {
                  for (n.flags |= 128, Nl(o, !1), t = d.updateQueue, n.updateQueue = t, co(n, t), n.subtreeFlags = 0, t = i, i = n.child; i !== null; )
                    Um(i, t), i = i.sibling;
                  return tt(
                    Wt,
                    Wt.current & 1 | 2
                  ), Mt && Dn(n, o.treeForkCount), n.child;
                }
                t = t.sibling;
              }
            o.tail !== null && Le() > yo && (n.flags |= 128, u = !0, Nl(o, !1), n.lanes = 4194304);
          }
        else {
          if (!u)
            if (t = Js(d), t !== null) {
              if (n.flags |= 128, u = !0, t = t.updateQueue, n.updateQueue = t, co(n, t), Nl(o, !0), o.tail === null && o.tailMode === "hidden" && !d.alternate && !Mt)
                return Xt(n), null;
            } else
              2 * Le() - o.renderingStartTime > yo && i !== 536870912 && (n.flags |= 128, u = !0, Nl(o, !1), n.lanes = 4194304);
          o.isBackwards ? (d.sibling = n.child, n.child = d) : (t = o.last, t !== null ? t.sibling = d : n.child = d, o.last = d);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Le(), t.sibling = null, i = Wt.current, tt(
          Wt,
          u ? i & 1 | 2 : i & 1
        ), Mt && Dn(n, o.treeForkCount), t) : (Xt(n), null);
      case 22:
      case 23:
        return qe(n), Vu(), o = n.memoizedState !== null, t !== null ? t.memoizedState !== null !== o && (n.flags |= 8192) : o && (n.flags |= 8192), o ? (i & 536870912) !== 0 && (n.flags & 128) === 0 && (Xt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Xt(n), i = n.updateQueue, i !== null && co(n, i.retryQueue), i = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), o = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== i && (n.flags |= 2048), t !== null && Y(Oa), null;
      case 24:
        return i = null, t !== null && (i = t.memoizedState.cache), n.memoizedState.cache !== i && (n.flags |= 2048), Nn(ne), Xt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, n.tag));
  }
  function OS(t, n) {
    switch (wu(n), n.tag) {
      case 1:
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 3:
        return Nn(ne), it(), t = n.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (n.flags = t & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Gt(n), null;
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
        return Y(Wt), null;
      case 4:
        return it(), null;
      case 10:
        return Nn(n.type), null;
      case 22:
      case 23:
        return qe(n), Vu(), t !== null && Y(Oa), t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 24:
        return Nn(ne), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function f1(t, n) {
    switch (wu(n), n.tag) {
      case 3:
        Nn(ne), it();
        break;
      case 26:
      case 27:
      case 5:
        Gt(n);
        break;
      case 4:
        it();
        break;
      case 31:
        n.memoizedState !== null && qe(n);
        break;
      case 13:
        qe(n);
        break;
      case 19:
        Y(Wt);
        break;
      case 10:
        Nn(n.type);
        break;
      case 22:
      case 23:
        qe(n), Vu(), t !== null && Y(Oa);
        break;
      case 24:
        Nn(ne);
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
      Lt(n, n.return, C);
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
              var O = i, $ = C;
              try {
                $();
              } catch (Z) {
                Lt(
                  u,
                  O,
                  Z
                );
              }
            }
          }
          o = o.next;
        } while (o !== d);
      }
    } catch (Z) {
      Lt(n, n.return, Z);
    }
  }
  function d1(t) {
    var n = t.updateQueue;
    if (n !== null) {
      var i = t.stateNode;
      try {
        np(n, i);
      } catch (o) {
        Lt(t, t.return, o);
      }
    }
  }
  function h1(t, n, i) {
    i.props = Ua(
      t.type,
      t.memoizedProps
    ), i.state = t.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (o) {
      Lt(t, n, o);
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
      Lt(t, n, u);
    }
  }
  function vn(t, n) {
    var i = t.ref, o = t.refCleanup;
    if (i !== null)
      if (typeof o == "function")
        try {
          o();
        } catch (u) {
          Lt(t, n, u);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof i == "function")
        try {
          i(null);
        } catch (u) {
          Lt(t, n, u);
        }
      else i.current = null;
  }
  function m1(t) {
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
      Lt(t, t.return, u);
    }
  }
  function pc(t, n, i) {
    try {
      var o = t.stateNode;
      e3(o, t.type, i, n), o[Me] = n;
    } catch (u) {
      Lt(t, t.return, u);
    }
  }
  function p1(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && fa(t.type) || t.tag === 4;
  }
  function yc(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || p1(t.return)) return null;
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
      t = t.stateNode, n ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(t, n) : (n = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, n.appendChild(t), i = i._reactRootContainer, i != null || n.onclick !== null || (n.onclick = jn));
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
  function y1(t) {
    var n = t.stateNode, i = t.memoizedProps;
    try {
      for (var o = t.type, u = n.attributes; u.length; )
        n.removeAttributeNode(u[0]);
      ve(n, o, i), n[me] = t, n[Me] = i;
    } catch (d) {
      Lt(t, t.return, d);
    }
  }
  var Vn = !1, le = !1, vc = !1, g1 = typeof WeakSet == "function" ? WeakSet : Set, he = null;
  function zS(t, n) {
    if (t = t.containerInfo, kc = Oo, t = _m(t), fu(t)) {
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
            var x = 0, C = -1, O = -1, $ = 0, Z = 0, W = t, G = null;
            e: for (; ; ) {
              for (var X; W !== i || u !== 0 && W.nodeType !== 3 || (C = x + u), W !== d || o !== 0 && W.nodeType !== 3 || (O = x + o), W.nodeType === 3 && (x += W.nodeValue.length), (X = W.firstChild) !== null; )
                G = W, W = X;
              for (; ; ) {
                if (W === t) break e;
                if (G === i && ++$ === u && (C = x), G === d && ++Z === o && (O = x), (X = W.nextSibling) !== null) break;
                W = G, G = W.parentNode;
              }
              W = X;
            }
            i = C === -1 || O === -1 ? null : { start: C, end: O };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Hc = { focusedElem: t, selectionRange: i }, Oo = !1, he = n; he !== null; )
      if (n = he, t = n.child, (n.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = n, he = t;
      else
        for (; he !== null; ) {
          switch (n = he, d = n.alternate, t = n.flags, n.tag) {
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
                  var rt = Ua(
                    i.type,
                    u
                  );
                  t = o.getSnapshotBeforeUpdate(
                    rt,
                    d
                  ), o.__reactInternalSnapshotBeforeUpdate = t;
                } catch (pt) {
                  Lt(
                    i,
                    i.return,
                    pt
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
            t.return = n.return, he = t;
            break;
          }
          he = n.return;
        }
  }
  function v1(t, n, i) {
    var o = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        kn(t, i), o & 4 && Ol(5, i);
        break;
      case 1:
        if (kn(t, i), o & 4)
          if (t = i.stateNode, n === null)
            try {
              t.componentDidMount();
            } catch (x) {
              Lt(i, i.return, x);
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
              Lt(
                i,
                i.return,
                x
              );
            }
          }
        o & 64 && d1(i), o & 512 && zl(i, i.return);
        break;
      case 3:
        if (kn(t, i), o & 64 && (t = i.updateQueue, t !== null)) {
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
            np(t, n);
          } catch (x) {
            Lt(i, i.return, x);
          }
        }
        break;
      case 27:
        n === null && o & 4 && y1(i);
      case 26:
      case 5:
        kn(t, i), n === null && o & 4 && m1(i), o & 512 && zl(i, i.return);
        break;
      case 12:
        kn(t, i);
        break;
      case 31:
        kn(t, i), o & 4 && S1(t, i);
        break;
      case 13:
        kn(t, i), o & 4 && w1(t, i), o & 64 && (t = i.memoizedState, t !== null && (t = t.dehydrated, t !== null && (i = GS.bind(
          null,
          i
        ), u3(t, i))));
        break;
      case 22:
        if (o = i.memoizedState !== null || Vn, !o) {
          n = n !== null && n.memoizedState !== null || le, u = Vn;
          var d = le;
          Vn = o, (le = n) && !d ? Hn(
            t,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : kn(t, i), Vn = u, le = d;
        }
        break;
      case 30:
        break;
      default:
        kn(t, i);
    }
  }
  function b1(t) {
    var n = t.alternate;
    n !== null && (t.alternate = null, b1(n)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (n = t.stateNode, n !== null && Zr(n)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Pt = null, De = !1;
  function Un(t, n, i) {
    for (i = i.child; i !== null; )
      x1(t, n, i), i = i.sibling;
  }
  function x1(t, n, i) {
    if (Be && typeof Be.onCommitFiberUnmount == "function")
      try {
        Be.onCommitFiberUnmount(il, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        le || vn(i, n), Un(
          t,
          n,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        le || vn(i, n);
        var o = Pt, u = De;
        fa(i.type) && (Pt = i.stateNode, De = !1), Un(
          t,
          n,
          i
        ), Gl(i.stateNode), Pt = o, De = u;
        break;
      case 5:
        le || vn(i, n);
      case 6:
        if (o = Pt, u = De, Pt = null, Un(
          t,
          n,
          i
        ), Pt = o, De = u, Pt !== null)
          if (De)
            try {
              (Pt.nodeType === 9 ? Pt.body : Pt.nodeName === "HTML" ? Pt.ownerDocument.body : Pt).removeChild(i.stateNode);
            } catch (d) {
              Lt(
                i,
                n,
                d
              );
            }
          else
            try {
              Pt.removeChild(i.stateNode);
            } catch (d) {
              Lt(
                i,
                n,
                d
              );
            }
        break;
      case 18:
        Pt !== null && (De ? (t = Pt, d0(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          i.stateNode
        ), Li(t)) : d0(Pt, i.stateNode));
        break;
      case 4:
        o = Pt, u = De, Pt = i.stateNode.containerInfo, De = !0, Un(
          t,
          n,
          i
        ), Pt = o, De = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ia(2, i, n), le || ia(4, i, n), Un(
          t,
          n,
          i
        );
        break;
      case 1:
        le || (vn(i, n), o = i.stateNode, typeof o.componentWillUnmount == "function" && h1(
          i,
          n,
          o
        )), Un(
          t,
          n,
          i
        );
        break;
      case 21:
        Un(
          t,
          n,
          i
        );
        break;
      case 22:
        le = (o = le) || i.memoizedState !== null, Un(
          t,
          n,
          i
        ), le = o;
        break;
      default:
        Un(
          t,
          n,
          i
        );
    }
  }
  function S1(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Li(t);
      } catch (i) {
        Lt(n, n.return, i);
      }
    }
  }
  function w1(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Li(t);
      } catch (i) {
        Lt(n, n.return, i);
      }
  }
  function LS(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var n = t.stateNode;
        return n === null && (n = t.stateNode = new g1()), n;
      case 22:
        return t = t.stateNode, n = t._retryCache, n === null && (n = t._retryCache = new g1()), n;
      default:
        throw Error(s(435, t.tag));
    }
  }
  function ho(t, n) {
    var i = LS(t);
    n.forEach(function(o) {
      if (!i.has(o)) {
        i.add(o);
        var u = YS.bind(null, t, o);
        o.then(u, u);
      }
    });
  }
  function Re(t, n) {
    var i = n.deletions;
    if (i !== null)
      for (var o = 0; o < i.length; o++) {
        var u = i[o], d = t, x = n, C = x;
        t: for (; C !== null; ) {
          switch (C.tag) {
            case 27:
              if (fa(C.type)) {
                Pt = C.stateNode, De = !1;
                break t;
              }
              break;
            case 5:
              Pt = C.stateNode, De = !1;
              break t;
            case 3:
            case 4:
              Pt = C.stateNode.containerInfo, De = !0;
              break t;
          }
          C = C.return;
        }
        if (Pt === null) throw Error(s(160));
        x1(d, x, u), Pt = null, De = !1, d = u.alternate, d !== null && (d.return = null), u.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        T1(n, t), n = n.sibling;
  }
  var rn = null;
  function T1(t, n) {
    var i = t.alternate, o = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Re(n, t), Ne(t), o & 4 && (ia(3, t, t.return), Ol(3, t), ia(5, t, t.return));
        break;
      case 1:
        Re(n, t), Ne(t), o & 512 && (le || i === null || vn(i, i.return)), o & 64 && Vn && (t = t.updateQueue, t !== null && (o = t.callbacks, o !== null && (i = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = i === null ? o : i.concat(o))));
        break;
      case 26:
        var u = rn;
        if (Re(n, t), Ne(t), o & 512 && (le || i === null || vn(i, i.return)), o & 4) {
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
                      )), ve(d, o, i), d[me] = t, de(d), o = d;
                      break t;
                    case "link":
                      var x = T0(
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
                      if (x = T0(
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
                  d[me] = t, de(d), o = d;
                }
                t.stateNode = o;
              } else
                C0(
                  u,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = w0(
                u,
                o,
                t.memoizedProps
              );
          else
            d !== o ? (d === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : d.count--, o === null ? C0(
              u,
              t.type,
              t.stateNode
            ) : w0(
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
        Re(n, t), Ne(t), o & 512 && (le || i === null || vn(i, i.return)), i !== null && o & 4 && pc(
          t,
          t.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (Re(n, t), Ne(t), o & 512 && (le || i === null || vn(i, i.return)), t.flags & 32) {
          u = t.stateNode;
          try {
            ii(u, "");
          } catch (rt) {
            Lt(t, t.return, rt);
          }
        }
        o & 4 && t.stateNode != null && (u = t.memoizedProps, pc(
          t,
          u,
          i !== null ? i.memoizedProps : u
        )), o & 1024 && (vc = !0);
        break;
      case 6:
        if (Re(n, t), Ne(t), o & 4) {
          if (t.stateNode === null)
            throw Error(s(162));
          o = t.memoizedProps, i = t.stateNode;
          try {
            i.nodeValue = o;
          } catch (rt) {
            Lt(t, t.return, rt);
          }
        }
        break;
      case 3:
        if (_o = null, u = rn, rn = jo(n.containerInfo), Re(n, t), rn = u, Ne(t), o & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            Li(n.containerInfo);
          } catch (rt) {
            Lt(t, t.return, rt);
          }
        vc && (vc = !1, C1(t));
        break;
      case 4:
        o = rn, rn = jo(
          t.stateNode.containerInfo
        ), Re(n, t), Ne(t), rn = o;
        break;
      case 12:
        Re(n, t), Ne(t);
        break;
      case 31:
        Re(n, t), Ne(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, ho(t, o)));
        break;
      case 13:
        Re(n, t), Ne(t), t.child.flags & 8192 && t.memoizedState !== null != (i !== null && i.memoizedState !== null) && (po = Le()), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, ho(t, o)));
        break;
      case 22:
        u = t.memoizedState !== null;
        var O = i !== null && i.memoizedState !== null, $ = Vn, Z = le;
        if (Vn = $ || u, le = Z || O, Re(n, t), le = Z, Vn = $, Ne(t), o & 8192)
          t: for (n = t.stateNode, n._visibility = u ? n._visibility & -2 : n._visibility | 1, u && (i === null || O || Vn || le || ka(t)), i = null, n = t; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (i === null) {
                O = i = n;
                try {
                  if (d = O.stateNode, u)
                    x = d.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
                  else {
                    C = O.stateNode;
                    var W = O.memoizedProps.style, G = W != null && W.hasOwnProperty("display") ? W.display : null;
                    C.style.display = G == null || typeof G == "boolean" ? "" : ("" + G).trim();
                  }
                } catch (rt) {
                  Lt(O, O.return, rt);
                }
              }
            } else if (n.tag === 6) {
              if (i === null) {
                O = n;
                try {
                  O.stateNode.nodeValue = u ? "" : O.memoizedProps;
                } catch (rt) {
                  Lt(O, O.return, rt);
                }
              }
            } else if (n.tag === 18) {
              if (i === null) {
                O = n;
                try {
                  var X = O.stateNode;
                  u ? h0(X, !0) : h0(O.stateNode, !1);
                } catch (rt) {
                  Lt(O, O.return, rt);
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
        Re(n, t), Ne(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, ho(t, o)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Re(n, t), Ne(t);
    }
  }
  function Ne(t) {
    var n = t.flags;
    if (n & 2) {
      try {
        for (var i, o = t.return; o !== null; ) {
          if (p1(o)) {
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
            var O = i.stateNode.containerInfo, $ = yc(t);
            gc(
              t,
              $,
              O
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (Z) {
        Lt(t, t.return, Z);
      }
      t.flags &= -3;
    }
    n & 4096 && (t.flags &= -4097);
  }
  function C1(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var n = t;
        C1(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), t = t.sibling;
      }
  }
  function kn(t, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        v1(t, n.alternate, n), n = n.sibling;
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
          typeof i.componentWillUnmount == "function" && h1(
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
  function Hn(t, n, i) {
    for (i = i && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var o = n.alternate, u = t, d = n, x = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          Hn(
            u,
            d,
            i
          ), Ol(4, d);
          break;
        case 1:
          if (Hn(
            u,
            d,
            i
          ), o = d, u = o.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch ($) {
              Lt(o, o.return, $);
            }
          if (o = d, u = o.updateQueue, u !== null) {
            var C = o.stateNode;
            try {
              var O = u.shared.hiddenCallbacks;
              if (O !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < O.length; u++)
                  ep(O[u], C);
            } catch ($) {
              Lt(o, o.return, $);
            }
          }
          i && x & 64 && d1(d), zl(d, d.return);
          break;
        case 27:
          y1(d);
        case 26:
        case 5:
          Hn(
            u,
            d,
            i
          ), i && o === null && x & 4 && m1(d), zl(d, d.return);
          break;
        case 12:
          Hn(
            u,
            d,
            i
          );
          break;
        case 31:
          Hn(
            u,
            d,
            i
          ), i && x & 4 && S1(u, d);
          break;
        case 13:
          Hn(
            u,
            d,
            i
          ), i && x & 4 && w1(u, d);
          break;
        case 22:
          d.memoizedState === null && Hn(
            u,
            d,
            i
          ), zl(d, d.return);
          break;
        case 30:
          break;
        default:
          Hn(
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
        E1(
          t,
          n,
          i,
          o
        ), n = n.sibling;
  }
  function E1(t, n, i, o) {
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
            Lt(n, n.return, O);
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
      var d = t, x = n, C = i, O = o, $ = x.flags;
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
          var Z = x.stateNode;
          x.memoizedState !== null ? Z._visibility & 2 ? Ci(
            d,
            x,
            C,
            O,
            u
          ) : Ll(
            d,
            x
          ) : (Z._visibility |= 2, Ci(
            d,
            x,
            C,
            O,
            u
          )), u && $ & 2048 && bc(
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
          ), u && $ & 2048 && xc(x.alternate, x);
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
        A1(
          t,
          n,
          i
        ), t = t.sibling;
  }
  function A1(t, n, i) {
    switch (t.tag) {
      case 26:
        Ei(
          t,
          n,
          i
        ), t.flags & Bl && t.memoizedState !== null && S3(
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
        rn = jo(t.stateNode.containerInfo), Ei(
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
  function j1(t) {
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
          he = o, _1(
            o,
            t
          );
        }
      j1(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        M1(t), t = t.sibling;
  }
  function M1(t) {
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
          he = o, _1(
            o,
            t
          );
        }
      j1(t);
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
  function _1(t, n) {
    for (; he !== null; ) {
      var i = he;
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
      if (o = i.child, o !== null) o.return = i, he = o;
      else
        t: for (i = t; he !== null; ) {
          o = he;
          var u = o.sibling, d = o.return;
          if (b1(o), o === i) {
            he = null;
            break t;
          }
          if (u !== null) {
            u.return = d, he = u;
            break t;
          }
          he = d;
        }
    }
  }
  var BS = {
    getCacheForType: function(t) {
      var n = ye(ne), i = n.data.get(t);
      return i === void 0 && (i = t(), n.data.set(t, i)), i;
    },
    cacheSignal: function() {
      return ye(ne).controller.signal;
    }
  }, VS = typeof WeakMap == "function" ? WeakMap : Map, Nt = 0, Ht = null, Ct = null, At = 0, zt = 0, $e = null, la = !1, Ai = !1, Sc = !1, qn = 0, Ft = 0, sa = 0, Ha = 0, wc = 0, Ge = 0, ji = 0, Ul = null, Oe = null, Tc = !1, po = 0, D1 = 0, yo = 1 / 0, go = null, oa = null, re = 0, ra = null, Mi = null, $n = 0, Cc = 0, Ec = null, R1 = null, kl = 0, Ac = null;
  function Ye() {
    return (Nt & 2) !== 0 && At !== 0 ? At & -At : V.T !== null ? Nc() : Kh();
  }
  function N1() {
    if (Ge === 0)
      if ((At & 536870912) === 0 || Mt) {
        var t = Cs;
        Cs <<= 1, (Cs & 3932160) === 0 && (Cs = 262144), Ge = t;
      } else Ge = 536870912;
    return t = He.current, t !== null && (t.flags |= 32), Ge;
  }
  function ze(t, n, i) {
    (t === Ht && (zt === 2 || zt === 9) || t.cancelPendingCommit !== null) && (_i(t, 0), ua(
      t,
      At,
      Ge,
      !1
    )), sl(t, i), ((Nt & 2) === 0 || t !== Ht) && (t === Ht && ((Nt & 2) === 0 && (Ha |= i), Ft === 4 && ua(
      t,
      At,
      Ge,
      !1
    )), bn(t));
  }
  function O1(t, n, i) {
    if ((Nt & 6) !== 0) throw Error(s(327));
    var o = !i && (n & 127) === 0 && (n & t.expiredLanes) === 0 || ll(t, n), u = o ? HS(t, n) : Mc(t, n, !0), d = o;
    do {
      if (u === 0) {
        Ai && !o && ua(t, n, 0, !1);
        break;
      } else {
        if (i = t.current.alternate, d && !US(i)) {
          u = Mc(t, n, !1), d = !1;
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
              if (O && (_i(C, x).flags |= 256), x = Mc(
                C,
                x,
                !1
              ), x !== 2) {
                if (Sc && !O) {
                  C.errorRecoveryDisabledLanes |= d, Ha |= d, u = 4;
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
                Ge,
                !la
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
          if ((n & 62914560) === n && (u = po + 300 - Le(), 10 < u)) {
            if (ua(
              o,
              n,
              Ge,
              !la
            ), As(o, 0, !0) !== 0) break t;
            $n = n, o.timeoutHandle = c0(
              z1.bind(
                null,
                o,
                i,
                Oe,
                go,
                Tc,
                n,
                Ge,
                Ha,
                ji,
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
          z1(
            o,
            i,
            Oe,
            go,
            Tc,
            n,
            Ge,
            Ha,
            ji,
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
  function z1(t, n, i, o, u, d, x, C, O, $, Z, W, G, X) {
    if (t.timeoutHandle = -1, W = n.subtreeFlags, W & 8192 || (W & 16785408) === 16785408) {
      W = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: jn
      }, A1(
        n,
        d,
        W
      );
      var rt = (d & 62914560) === d ? po - Le() : (d & 4194048) === d ? D1 - Le() : 0;
      if (rt = w3(
        W,
        rt
      ), rt !== null) {
        $n = d, t.cancelPendingCommit = rt(
          $1.bind(
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
            Z,
            W,
            null,
            G,
            X
          )
        ), ua(t, d, x, !$);
        return;
      }
    }
    $1(
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
  function US(t) {
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
  function ua(t, n, i, o) {
    n &= ~wc, n &= ~Ha, t.suspendedLanes |= n, t.pingedLanes &= ~n, o && (t.warmLanes |= n), o = t.expirationTimes;
    for (var u = n; 0 < u; ) {
      var d = 31 - Ve(u), x = 1 << d;
      o[d] = -1, u &= ~x;
    }
    i !== 0 && Yh(t, i, n);
  }
  function vo() {
    return (Nt & 6) === 0 ? (Hl(0), !1) : !0;
  }
  function jc() {
    if (Ct !== null) {
      if (zt === 0)
        var t = Ct.return;
      else
        t = Ct, Rn = Ra = null, Gu(t), bi = null, wl = 0, t = Ct;
      for (; t !== null; )
        f1(t.alternate, t), t = t.return;
      Ct = null;
    }
  }
  function _i(t, n) {
    var i = t.timeoutHandle;
    i !== -1 && (t.timeoutHandle = -1, i3(i)), i = t.cancelPendingCommit, i !== null && (t.cancelPendingCommit = null, i()), $n = 0, jc(), Ht = t, Ct = i = _n(t.current, null), At = n, zt = 0, $e = null, la = !1, Ai = ll(t, n), Sc = !1, ji = Ge = wc = Ha = sa = Ft = 0, Oe = Ul = null, Tc = !1, (n & 8) !== 0 && (n |= n & 32);
    var o = t.entangledLanes;
    if (o !== 0)
      for (t = t.entanglements, o &= n; 0 < o; ) {
        var u = 31 - Ve(o), d = 1 << u;
        n |= t[u], o &= ~d;
      }
    return qn = n, Us(), i;
  }
  function L1(t, n) {
    bt = null, V.H = Dl, n === vi || n === Ps ? (n = Jm(), zt = 3) : n === Ru ? (n = Jm(), zt = 4) : zt = n === lc ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, $e = n, Ct === null && (Ft = 1, so(
      t,
      Je(n, t.current)
    ));
  }
  function B1() {
    var t = He.current;
    return t === null ? !0 : (At & 4194048) === At ? en === null : (At & 62914560) === At || (At & 536870912) !== 0 ? t === en : !1;
  }
  function V1() {
    var t = V.H;
    return V.H = Dl, t === null ? Dl : t;
  }
  function U1() {
    var t = V.A;
    return V.A = BS, t;
  }
  function bo() {
    Ft = 4, la || (At & 4194048) !== At && He.current !== null || (Ai = !0), (sa & 134217727) === 0 && (Ha & 134217727) === 0 || Ht === null || ua(
      Ht,
      At,
      Ge,
      !1
    );
  }
  function Mc(t, n, i) {
    var o = Nt;
    Nt |= 2;
    var u = V1(), d = U1();
    (Ht !== t || At !== n) && (go = null, _i(t, n)), n = !1;
    var x = Ft;
    t: do
      try {
        if (zt !== 0 && Ct !== null) {
          var C = Ct, O = $e;
          switch (zt) {
            case 8:
              jc(), x = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              He.current === null && (n = !0);
              var $ = zt;
              if (zt = 0, $e = null, Di(t, C, O, $), i && Ai) {
                x = 0;
                break t;
              }
              break;
            default:
              $ = zt, zt = 0, $e = null, Di(t, C, O, $);
          }
        }
        kS(), x = Ft;
        break;
      } catch (Z) {
        L1(t, Z);
      }
    while (!0);
    return n && t.shellSuspendCounter++, Rn = Ra = null, Nt = o, V.H = u, V.A = d, Ct === null && (Ht = null, At = 0, Us()), x;
  }
  function kS() {
    for (; Ct !== null; ) k1(Ct);
  }
  function HS(t, n) {
    var i = Nt;
    Nt |= 2;
    var o = V1(), u = U1();
    Ht !== t || At !== n ? (go = null, yo = Le() + 500, _i(t, n)) : Ai = ll(
      t,
      n
    );
    t: do
      try {
        if (zt !== 0 && Ct !== null) {
          n = Ct;
          var d = $e;
          e: switch (zt) {
            case 1:
              zt = 0, $e = null, Di(t, n, d, 1);
              break;
            case 2:
            case 9:
              if (Qm(d)) {
                zt = 0, $e = null, H1(n);
                break;
              }
              n = function() {
                zt !== 2 && zt !== 9 || Ht !== t || (zt = 7), bn(t);
              }, d.then(n, n);
              break t;
            case 3:
              zt = 7;
              break t;
            case 4:
              zt = 5;
              break t;
            case 7:
              Qm(d) ? (zt = 0, $e = null, H1(n)) : (zt = 0, $e = null, Di(t, n, d, 7));
              break;
            case 5:
              var x = null;
              switch (Ct.tag) {
                case 26:
                  x = Ct.memoizedState;
                case 5:
                case 27:
                  var C = Ct;
                  if (x ? E0(x) : C.stateNode.complete) {
                    zt = 0, $e = null;
                    var O = C.sibling;
                    if (O !== null) Ct = O;
                    else {
                      var $ = C.return;
                      $ !== null ? (Ct = $, xo($)) : Ct = null;
                    }
                    break e;
                  }
              }
              zt = 0, $e = null, Di(t, n, d, 5);
              break;
            case 6:
              zt = 0, $e = null, Di(t, n, d, 6);
              break;
            case 8:
              jc(), Ft = 6;
              break t;
            default:
              throw Error(s(462));
          }
        }
        qS();
        break;
      } catch (Z) {
        L1(t, Z);
      }
    while (!0);
    return Rn = Ra = null, V.H = o, V.A = u, Nt = i, Ct !== null ? 0 : (Ht = null, At = 0, Us(), Ft);
  }
  function qS() {
    for (; Ct !== null && !cx(); )
      k1(Ct);
  }
  function k1(t) {
    var n = u1(t.alternate, t, qn);
    t.memoizedProps = t.pendingProps, n === null ? xo(t) : Ct = n;
  }
  function H1(t) {
    var n = t, i = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = a1(
          i,
          n,
          n.pendingProps,
          n.type,
          void 0,
          At
        );
        break;
      case 11:
        n = a1(
          i,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          At
        );
        break;
      case 5:
        Gu(n);
      default:
        f1(i, n), n = Ct = Um(n, qn), n = u1(i, n, qn);
    }
    t.memoizedProps = t.pendingProps, n === null ? xo(t) : Ct = n;
  }
  function Di(t, n, i, o) {
    Rn = Ra = null, Gu(n), bi = null, wl = 0;
    var u = n.return;
    try {
      if (_S(
        t,
        u,
        n,
        i,
        At
      )) {
        Ft = 1, so(
          t,
          Je(i, t.current)
        ), Ct = null;
        return;
      }
    } catch (d) {
      if (u !== null) throw Ct = u, d;
      Ft = 1, so(
        t,
        Je(i, t.current)
      ), Ct = null;
      return;
    }
    n.flags & 32768 ? (Mt || o === 1 ? t = !0 : Ai || (At & 536870912) !== 0 ? t = !1 : (la = t = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = He.current, o !== null && o.tag === 13 && (o.flags |= 16384))), q1(n, t)) : xo(n);
  }
  function xo(t) {
    var n = t;
    do {
      if ((n.flags & 32768) !== 0) {
        q1(
          n,
          la
        );
        return;
      }
      t = n.return;
      var i = NS(
        n.alternate,
        n,
        qn
      );
      if (i !== null) {
        Ct = i;
        return;
      }
      if (n = n.sibling, n !== null) {
        Ct = n;
        return;
      }
      Ct = n = t;
    } while (n !== null);
    Ft === 0 && (Ft = 5);
  }
  function q1(t, n) {
    do {
      var i = OS(t.alternate, t);
      if (i !== null) {
        i.flags &= 32767, Ct = i;
        return;
      }
      if (i = t.return, i !== null && (i.flags |= 32768, i.subtreeFlags = 0, i.deletions = null), !n && (t = t.sibling, t !== null)) {
        Ct = t;
        return;
      }
      Ct = t = i;
    } while (t !== null);
    Ft = 6, Ct = null;
  }
  function $1(t, n, i, o, u, d, x, C, O) {
    t.cancelPendingCommit = null;
    do
      So();
    while (re !== 0);
    if ((Nt & 6) !== 0) throw Error(s(327));
    if (n !== null) {
      if (n === t.current) throw Error(s(177));
      if (d = n.lanes | n.childLanes, d |= yu, xx(
        t,
        i,
        d,
        x,
        C,
        O
      ), t === Ht && (Ct = Ht = null, At = 0), Mi = n, ra = t, $n = i, Cc = d, Ec = u, R1 = o, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, XS(ws, function() {
        return K1(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), o = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || o) {
        o = V.T, V.T = null, u = J.p, J.p = 2, x = Nt, Nt |= 4;
        try {
          zS(t, n, i);
        } finally {
          Nt = x, J.p = u, V.T = o;
        }
      }
      re = 1, G1(), Y1(), X1();
    }
  }
  function G1() {
    if (re === 1) {
      re = 0;
      var t = ra, n = Mi, i = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || i) {
        i = V.T, V.T = null;
        var o = J.p;
        J.p = 2;
        var u = Nt;
        Nt |= 4;
        try {
          T1(n, t);
          var d = Hc, x = _m(t.containerInfo), C = d.focusedElem, O = d.selectionRange;
          if (x !== C && C && C.ownerDocument && Mm(
            C.ownerDocument.documentElement,
            C
          )) {
            if (O !== null && fu(C)) {
              var $ = O.start, Z = O.end;
              if (Z === void 0 && (Z = $), "selectionStart" in C)
                C.selectionStart = $, C.selectionEnd = Math.min(
                  Z,
                  C.value.length
                );
              else {
                var W = C.ownerDocument || document, G = W && W.defaultView || window;
                if (G.getSelection) {
                  var X = G.getSelection(), rt = C.textContent.length, pt = Math.min(O.start, rt), Ut = O.end === void 0 ? pt : Math.min(O.end, rt);
                  !X.extend && pt > Ut && (x = Ut, Ut = pt, pt = x);
                  var U = jm(
                    C,
                    pt
                  ), z = jm(
                    C,
                    Ut
                  );
                  if (U && z && (X.rangeCount !== 1 || X.anchorNode !== U.node || X.anchorOffset !== U.offset || X.focusNode !== z.node || X.focusOffset !== z.offset)) {
                    var q = W.createRange();
                    q.setStart(U.node, U.offset), X.removeAllRanges(), pt > Ut ? (X.addRange(q), X.extend(z.node, z.offset)) : (q.setEnd(z.node, z.offset), X.addRange(q));
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
          Oo = !!kc, Hc = kc = null;
        } finally {
          Nt = u, J.p = o, V.T = i;
        }
      }
      t.current = n, re = 2;
    }
  }
  function Y1() {
    if (re === 2) {
      re = 0;
      var t = ra, n = Mi, i = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || i) {
        i = V.T, V.T = null;
        var o = J.p;
        J.p = 2;
        var u = Nt;
        Nt |= 4;
        try {
          v1(t, n.alternate, n);
        } finally {
          Nt = u, J.p = o, V.T = i;
        }
      }
      re = 3;
    }
  }
  function X1() {
    if (re === 4 || re === 3) {
      re = 0, fx();
      var t = ra, n = Mi, i = $n, o = R1;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? re = 5 : (re = 0, Mi = ra = null, P1(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (u === 0 && (oa = null), Pr(i), n = n.stateNode, Be && typeof Be.onCommitFiberRoot == "function")
        try {
          Be.onCommitFiberRoot(
            il,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (o !== null) {
        n = V.T, u = J.p, J.p = 2, V.T = null;
        try {
          for (var d = t.onRecoverableError, x = 0; x < o.length; x++) {
            var C = o[x];
            d(C.value, {
              componentStack: C.stack
            });
          }
        } finally {
          V.T = n, J.p = u;
        }
      }
      ($n & 3) !== 0 && So(), bn(t), u = t.pendingLanes, (i & 261930) !== 0 && (u & 42) !== 0 ? t === Ac ? kl++ : (kl = 0, Ac = t) : kl = 0, Hl(0);
    }
  }
  function P1(t, n) {
    (t.pooledCacheLanes &= n) === 0 && (n = t.pooledCache, n != null && (t.pooledCache = null, xl(n)));
  }
  function So() {
    return G1(), Y1(), X1(), K1();
  }
  function K1() {
    if (re !== 5) return !1;
    var t = ra, n = Cc;
    Cc = 0;
    var i = Pr($n), o = V.T, u = J.p;
    try {
      J.p = 32 > i ? 32 : i, V.T = null, i = Ec, Ec = null;
      var d = ra, x = $n;
      if (re = 0, Mi = ra = null, $n = 0, (Nt & 6) !== 0) throw Error(s(331));
      var C = Nt;
      if (Nt |= 4, M1(d.current), E1(
        d,
        d.current,
        x,
        i
      ), Nt = C, Hl(0, !1), Be && typeof Be.onPostCommitFiberRoot == "function")
        try {
          Be.onPostCommitFiberRoot(il, d);
        } catch {
        }
      return !0;
    } finally {
      J.p = u, V.T = o, P1(t, n);
    }
  }
  function Z1(t, n, i) {
    n = Je(i, n), n = ic(t.stateNode, n, 2), t = ea(t, n, 2), t !== null && (sl(t, 2), bn(t));
  }
  function Lt(t, n, i) {
    if (t.tag === 3)
      Z1(t, t, i);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          Z1(
            n,
            t,
            i
          );
          break;
        } else if (n.tag === 1) {
          var o = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (oa === null || !oa.has(o))) {
            t = Je(i, t), i = Qp(2), o = ea(n, i, 2), o !== null && (Fp(
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
      o = t.pingCache = new VS();
      var u = /* @__PURE__ */ new Set();
      o.set(n, u);
    } else
      u = o.get(n), u === void 0 && (u = /* @__PURE__ */ new Set(), o.set(n, u));
    u.has(i) || (Sc = !0, u.add(i), t = $S.bind(null, t, n, i), n.then(t, t));
  }
  function $S(t, n, i) {
    var o = t.pingCache;
    o !== null && o.delete(n), t.pingedLanes |= t.suspendedLanes & i, t.warmLanes &= ~i, Ht === t && (At & i) === i && (Ft === 4 || Ft === 3 && (At & 62914560) === At && 300 > Le() - po ? (Nt & 2) === 0 && _i(t, 0) : wc |= i, ji === At && (ji = 0)), bn(t);
  }
  function Q1(t, n) {
    n === 0 && (n = Gh()), t = Ma(t, n), t !== null && (sl(t, n), bn(t));
  }
  function GS(t) {
    var n = t.memoizedState, i = 0;
    n !== null && (i = n.retryLane), Q1(t, i);
  }
  function YS(t, n) {
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
    o !== null && o.delete(n), Q1(t, i);
  }
  function XS(t, n) {
    return $r(t, n);
  }
  var wo = null, Ri = null, Dc = !1, To = !1, Rc = !1, ca = 0;
  function bn(t) {
    t !== Ri && t.next === null && (Ri === null ? wo = Ri = t : Ri = Ri.next = t), To = !0, Dc || (Dc = !0, KS());
  }
  function Hl(t, n) {
    if (!Rc && To) {
      Rc = !0;
      do
        for (var i = !1, o = wo; o !== null; ) {
          if (t !== 0) {
            var u = o.pendingLanes;
            if (u === 0) var d = 0;
            else {
              var x = o.suspendedLanes, C = o.pingedLanes;
              d = (1 << 31 - Ve(42 | t) + 1) - 1, d &= u & ~(x & ~C), d = d & 201326741 ? d & 201326741 | 1 : d ? d | 2 : 0;
            }
            d !== 0 && (i = !0, I1(o, d));
          } else
            d = At, d = As(
              o,
              o === Ht ? d : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (d & 3) === 0 || ll(o, d) || (i = !0, I1(o, d));
          o = o.next;
        }
      while (i);
      Rc = !1;
    }
  }
  function PS() {
    F1();
  }
  function F1() {
    To = Dc = !1;
    var t = 0;
    ca !== 0 && a3() && (t = ca);
    for (var n = Le(), i = null, o = wo; o !== null; ) {
      var u = o.next, d = J1(o, n);
      d === 0 ? (o.next = null, i === null ? wo = u : i.next = u, u === null && (Ri = i)) : (i = o, (t !== 0 || (d & 3) !== 0) && (To = !0)), o = u;
    }
    re !== 0 && re !== 5 || Hl(t), ca !== 0 && (ca = 0);
  }
  function J1(t, n) {
    for (var i = t.suspendedLanes, o = t.pingedLanes, u = t.expirationTimes, d = t.pendingLanes & -62914561; 0 < d; ) {
      var x = 31 - Ve(d), C = 1 << x, O = u[x];
      O === -1 ? ((C & i) === 0 || (C & o) !== 0) && (u[x] = bx(C, n)) : O <= n && (t.expiredLanes |= C), d &= ~C;
    }
    if (n = Ht, i = At, i = As(
      t,
      t === n ? i : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o = t.callbackNode, i === 0 || t === n && (zt === 2 || zt === 9) || t.cancelPendingCommit !== null)
      return o !== null && o !== null && Gr(o), t.callbackNode = null, t.callbackPriority = 0;
    if ((i & 3) === 0 || ll(t, i)) {
      if (n = i & -i, n === t.callbackPriority) return n;
      switch (o !== null && Gr(o), Pr(i)) {
        case 2:
        case 8:
          i = qh;
          break;
        case 32:
          i = ws;
          break;
        case 268435456:
          i = $h;
          break;
        default:
          i = ws;
      }
      return o = W1.bind(null, t), i = $r(i, o), t.callbackPriority = n, t.callbackNode = i, n;
    }
    return o !== null && o !== null && Gr(o), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function W1(t, n) {
    if (re !== 0 && re !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var i = t.callbackNode;
    if (So() && t.callbackNode !== i)
      return null;
    var o = At;
    return o = As(
      t,
      t === Ht ? o : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o === 0 ? null : (O1(t, o, n), J1(t, Le()), t.callbackNode != null && t.callbackNode === i ? W1.bind(null, t) : null);
  }
  function I1(t, n) {
    if (So()) return null;
    O1(t, n, !0);
  }
  function KS() {
    l3(function() {
      (Nt & 6) !== 0 ? $r(
        Hh,
        PS
      ) : F1();
    });
  }
  function Nc() {
    if (ca === 0) {
      var t = yi;
      t === 0 && (t = Ts, Ts <<= 1, (Ts & 261888) === 0 && (Ts = 256)), ca = t;
    }
    return ca;
  }
  function t0(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Ds("" + t);
  }
  function e0(t, n) {
    var i = n.ownerDocument.createElement("input");
    return i.name = n.name, i.value = n.value, t.id && i.setAttribute("form", t.id), n.parentNode.insertBefore(i, n), t = new FormData(t), i.parentNode.removeChild(i), t;
  }
  function ZS(t, n, i, o, u) {
    if (n === "submit" && i && i.stateNode === u) {
      var d = t0(
        (u[Me] || null).action
      ), x = o.submitter;
      x && (n = (n = x[Me] || null) ? t0(n.formAction) : x.getAttribute("formAction"), n !== null && (d = n, x = null));
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
                  var O = x ? e0(u, x) : new FormData(u);
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
                typeof d == "function" && (C.preventDefault(), O = x ? e0(u, x) : new FormData(u), Wu(
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
    var zc = pu[Oc], QS = zc.toLowerCase(), FS = zc[0].toUpperCase() + zc.slice(1);
    on(
      QS,
      "on" + FS
    );
  }
  on(Nm, "onAnimationEnd"), on(Om, "onAnimationIteration"), on(zm, "onAnimationStart"), on("dblclick", "onDoubleClick"), on("focusin", "onFocus"), on("focusout", "onBlur"), on(dS, "onTransitionRun"), on(hS, "onTransitionStart"), on(mS, "onTransitionCancel"), on(Lm, "onTransitionEnd"), ni("onMouseEnter", ["mouseout", "mouseover"]), ni("onMouseLeave", ["mouseout", "mouseover"]), ni("onPointerEnter", ["pointerout", "pointerover"]), ni("onPointerLeave", ["pointerout", "pointerover"]), Ca(
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
  ), JS = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ql)
  );
  function n0(t, n) {
    n = (n & 4) !== 0;
    for (var i = 0; i < t.length; i++) {
      var o = t[i], u = o.event;
      o = o.listeners;
      t: {
        var d = void 0;
        if (n)
          for (var x = o.length - 1; 0 <= x; x--) {
            var C = o[x], O = C.instance, $ = C.currentTarget;
            if (C = C.listener, O !== d && u.isPropagationStopped())
              break t;
            d = C, u.currentTarget = $;
            try {
              d(u);
            } catch (Z) {
              Vs(Z);
            }
            u.currentTarget = null, d = O;
          }
        else
          for (x = 0; x < o.length; x++) {
            if (C = o[x], O = C.instance, $ = C.currentTarget, C = C.listener, O !== d && u.isPropagationStopped())
              break t;
            d = C, u.currentTarget = $;
            try {
              d(u);
            } catch (Z) {
              Vs(Z);
            }
            u.currentTarget = null, d = O;
          }
      }
    }
  }
  function Et(t, n) {
    var i = n[Kr];
    i === void 0 && (i = n[Kr] = /* @__PURE__ */ new Set());
    var o = t + "__bubble";
    i.has(o) || (a0(n, t, 2, !1), i.add(o));
  }
  function Lc(t, n, i) {
    var o = 0;
    n && (o |= 4), a0(
      i,
      t,
      o,
      n
    );
  }
  var Co = "_reactListening" + Math.random().toString(36).slice(2);
  function Bc(t) {
    if (!t[Co]) {
      t[Co] = !0, Fh.forEach(function(i) {
        i !== "selectionchange" && (JS.has(i) || Lc(i, !1, t), Lc(i, !0, t));
      });
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[Co] || (n[Co] = !0, Lc("selectionchange", !1, n));
    }
  }
  function a0(t, n, i, o) {
    switch (N0(n)) {
      case 2:
        var u = E3;
        break;
      case 8:
        u = A3;
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
    rm(function() {
      var $ = d, Z = tu(i), W = [];
      t: {
        var G = Bm.get(t);
        if (G !== void 0) {
          var X = zs, rt = t;
          switch (t) {
            case "keypress":
              if (Ns(i) === 0) break t;
            case "keydown":
            case "keyup":
              X = Yx;
              break;
            case "focusin":
              rt = "focus", X = su;
              break;
            case "focusout":
              rt = "blur", X = su;
              break;
            case "beforeblur":
            case "afterblur":
              X = su;
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
              X = fm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              X = Nx;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              X = Kx;
              break;
            case Nm:
            case Om:
            case zm:
              X = Lx;
              break;
            case Lm:
              X = Qx;
              break;
            case "scroll":
            case "scrollend":
              X = Dx;
              break;
            case "wheel":
              X = Jx;
              break;
            case "copy":
            case "cut":
            case "paste":
              X = Vx;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              X = hm;
              break;
            case "toggle":
            case "beforetoggle":
              X = Ix;
          }
          var pt = (n & 4) !== 0, Ut = !pt && (t === "scroll" || t === "scrollend"), U = pt ? G !== null ? G + "Capture" : null : G;
          pt = [];
          for (var z = $, q; z !== null; ) {
            var F = z;
            if (q = F.stateNode, F = F.tag, F !== 5 && F !== 26 && F !== 27 || q === null || U === null || (F = ul(z, U), F != null && pt.push(
              $l(z, F, q)
            )), Ut) break;
            z = z.return;
          }
          0 < pt.length && (G = new X(
            G,
            rt,
            null,
            i,
            Z
          ), W.push({ event: G, listeners: pt }));
        }
      }
      if ((n & 7) === 0) {
        t: {
          if (G = t === "mouseover" || t === "pointerover", X = t === "mouseout" || t === "pointerout", G && i !== Ir && (rt = i.relatedTarget || i.fromElement) && (Ia(rt) || rt[Wa]))
            break t;
          if ((X || G) && (G = Z.window === Z ? Z : (G = Z.ownerDocument) ? G.defaultView || G.parentWindow : window, X ? (rt = i.relatedTarget || i.toElement, X = $, rt = rt ? Ia(rt) : null, rt !== null && (Ut = c(rt), pt = rt.tag, rt !== Ut || pt !== 5 && pt !== 27 && pt !== 6) && (rt = null)) : (X = null, rt = $), X !== rt)) {
            if (pt = fm, F = "onMouseLeave", U = "onMouseEnter", z = "mouse", (t === "pointerout" || t === "pointerover") && (pt = hm, F = "onPointerLeave", U = "onPointerEnter", z = "pointer"), Ut = X == null ? G : rl(X), q = rt == null ? G : rl(rt), G = new pt(
              F,
              z + "leave",
              X,
              i,
              Z
            ), G.target = Ut, G.relatedTarget = q, F = null, Ia(Z) === $ && (pt = new pt(
              U,
              z + "enter",
              rt,
              i,
              Z
            ), pt.target = q, pt.relatedTarget = Ut, F = pt), Ut = F, X && rt)
              e: {
                for (pt = WS, U = X, z = rt, q = 0, F = U; F; F = pt(F))
                  q++;
                F = 0;
                for (var mt = z; mt; mt = pt(mt))
                  F++;
                for (; 0 < q - F; )
                  U = pt(U), q--;
                for (; 0 < F - q; )
                  z = pt(z), F--;
                for (; q--; ) {
                  if (U === z || z !== null && U === z.alternate) {
                    pt = U;
                    break e;
                  }
                  U = pt(U), z = pt(z);
                }
                pt = null;
              }
            else pt = null;
            X !== null && i0(
              W,
              G,
              X,
              pt,
              !1
            ), rt !== null && Ut !== null && i0(
              W,
              Ut,
              rt,
              pt,
              !0
            );
          }
        }
        t: {
          if (G = $ ? rl($) : window, X = G.nodeName && G.nodeName.toLowerCase(), X === "select" || X === "input" && G.type === "file")
            var _t = Sm;
          else if (bm(G))
            if (wm)
              _t = uS;
            else {
              _t = oS;
              var ft = sS;
            }
          else
            X = G.nodeName, !X || X.toLowerCase() !== "input" || G.type !== "checkbox" && G.type !== "radio" ? $ && Wr($.elementType) && (_t = Sm) : _t = rS;
          if (_t && (_t = _t(t, $))) {
            xm(
              W,
              _t,
              i,
              Z
            );
            break t;
          }
          ft && ft(t, G, $), t === "focusout" && $ && G.type === "number" && $.memoizedProps.value != null && Jr(G, "number", G.value);
        }
        switch (ft = $ ? rl($) : window, t) {
          case "focusin":
            (bm(ft) || ft.contentEditable === "true") && (ri = ft, du = $, gl = null);
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
            hu = !1, Dm(W, i, Z);
            break;
          case "selectionchange":
            if (fS) break;
          case "keydown":
          case "keyup":
            Dm(W, i, Z);
        }
        var xt;
        if (ru)
          t: {
            switch (t) {
              case "compositionstart":
                var jt = "onCompositionStart";
                break t;
              case "compositionend":
                jt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                jt = "onCompositionUpdate";
                break t;
            }
            jt = void 0;
          }
        else
          oi ? gm(t, i) && (jt = "onCompositionEnd") : t === "keydown" && i.keyCode === 229 && (jt = "onCompositionStart");
        jt && (mm && i.locale !== "ko" && (oi || jt !== "onCompositionStart" ? jt === "onCompositionEnd" && oi && (xt = um()) : (Zn = Z, au = "value" in Zn ? Zn.value : Zn.textContent, oi = !0)), ft = Eo($, jt), 0 < ft.length && (jt = new dm(
          jt,
          t,
          null,
          i,
          Z
        ), W.push({ event: jt, listeners: ft }), xt ? jt.data = xt : (xt = vm(i), xt !== null && (jt.data = xt)))), (xt = eS ? nS(t, i) : aS(t, i)) && (jt = Eo($, "onBeforeInput"), 0 < jt.length && (ft = new dm(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          Z
        ), W.push({
          event: ft,
          listeners: jt
        }), ft.data = xt)), ZS(
          W,
          t,
          $,
          i,
          Z
        );
      }
      n0(W, n);
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
  function WS(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function i0(t, n, i, o, u) {
    for (var d = n._reactName, x = []; i !== null && i !== o; ) {
      var C = i, O = C.alternate, $ = C.stateNode;
      if (C = C.tag, O !== null && O === o) break;
      C !== 5 && C !== 26 && C !== 27 || $ === null || (O = $, u ? ($ = ul(i, d), $ != null && x.unshift(
        $l(i, $, O)
      )) : u || ($ = ul(i, d), $ != null && x.push(
        $l(i, $, O)
      ))), i = i.return;
    }
    x.length !== 0 && t.push({ event: n, listeners: x });
  }
  var IS = /\r\n?/g, t3 = /\u0000|\uFFFD/g;
  function l0(t) {
    return (typeof t == "string" ? t : "" + t).replace(IS, `
`).replace(t3, "");
  }
  function s0(t, n) {
    return n = l0(n), l0(t) === n;
  }
  function Vt(t, n, i, o, u, d) {
    switch (i) {
      case "children":
        typeof o == "string" ? n === "body" || n === "textarea" && o === "" || ii(t, o) : (typeof o == "number" || typeof o == "bigint") && n !== "body" && ii(t, "" + o);
        break;
      case "className":
        Ms(t, "class", o);
        break;
      case "tabIndex":
        Ms(t, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Ms(t, i, o);
        break;
      case "style":
        sm(t, o, d);
        break;
      case "data":
        if (n !== "object") {
          Ms(t, "data", o);
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
        o = Ds("" + o), t.setAttribute(i, o);
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
          typeof d == "function" && (i === "formAction" ? (n !== "input" && Vt(t, n, "name", u.name, u, null), Vt(
            t,
            n,
            "formEncType",
            u.formEncType,
            u,
            null
          ), Vt(
            t,
            n,
            "formMethod",
            u.formMethod,
            u,
            null
          ), Vt(
            t,
            n,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (Vt(t, n, "encType", u.encType, u, null), Vt(t, n, "method", u.method, u, null), Vt(t, n, "target", u.target, u, null)));
        if (o == null || typeof o == "symbol" || typeof o == "boolean") {
          t.removeAttribute(i);
          break;
        }
        o = Ds("" + o), t.setAttribute(i, o);
        break;
      case "onClick":
        o != null && (t.onclick = jn);
        break;
      case "onScroll":
        o != null && Et("scroll", t);
        break;
      case "onScrollEnd":
        o != null && Et("scrollend", t);
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
        i = Ds("" + o), t.setAttributeNS(
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
        Et("beforetoggle", t), Et("toggle", t), js(t, "popover", o);
        break;
      case "xlinkActuate":
        An(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          o
        );
        break;
      case "xlinkArcrole":
        An(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          o
        );
        break;
      case "xlinkRole":
        An(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          o
        );
        break;
      case "xlinkShow":
        An(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          o
        );
        break;
      case "xlinkTitle":
        An(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          o
        );
        break;
      case "xlinkType":
        An(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          o
        );
        break;
      case "xmlBase":
        An(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          o
        );
        break;
      case "xmlLang":
        An(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          o
        );
        break;
      case "xmlSpace":
        An(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          o
        );
        break;
      case "is":
        js(t, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = Mx.get(i) || i, js(t, i, o));
    }
  }
  function Uc(t, n, i, o, u, d) {
    switch (i) {
      case "style":
        sm(t, o, d);
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
        o != null && Et("scroll", t);
        break;
      case "onScrollEnd":
        o != null && Et("scrollend", t);
        break;
      case "onClick":
        o != null && (t.onclick = jn);
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
        if (!Jh.hasOwnProperty(i))
          t: {
            if (i[0] === "o" && i[1] === "n" && (u = i.endsWith("Capture"), n = i.slice(2, u ? i.length - 7 : void 0), d = t[Me] || null, d = d != null ? d[i] : null, typeof d == "function" && t.removeEventListener(n, d, u), typeof o == "function")) {
              typeof d != "function" && d !== null && (i in t ? t[i] = null : t.hasAttribute(i) && t.removeAttribute(i)), t.addEventListener(n, o, u);
              break t;
            }
            i in t ? t[i] = o : o === !0 ? t.setAttribute(i, "") : js(t, i, o);
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
        Et("error", t), Et("load", t);
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
                  Vt(t, n, d, x, i, null);
              }
          }
        u && Vt(t, n, "srcSet", i.srcSet, i, null), o && Vt(t, n, "src", i.src, i, null);
        return;
      case "input":
        Et("invalid", t);
        var C = d = x = u = null, O = null, $ = null;
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
                  O = Z;
                  break;
                case "defaultChecked":
                  $ = Z;
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
                  Vt(t, n, o, Z, i, null);
              }
          }
        nm(
          t,
          d,
          C,
          O,
          $,
          x,
          u,
          !1
        );
        return;
      case "select":
        Et("invalid", t), o = x = d = null;
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
                Vt(t, n, u, C, i, null);
            }
        n = d, i = x, t.multiple = !!o, n != null ? ai(t, !!o, n, !1) : i != null && ai(t, !!o, i, !0);
        return;
      case "textarea":
        Et("invalid", t), d = u = o = null;
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
                Vt(t, n, x, C, i, null);
            }
        im(t, o, u, d);
        return;
      case "option":
        for (O in i)
          if (i.hasOwnProperty(O) && (o = i[O], o != null))
            switch (O) {
              case "selected":
                t.selected = o && typeof o != "function" && typeof o != "symbol";
                break;
              default:
                Vt(t, n, O, o, i, null);
            }
        return;
      case "dialog":
        Et("beforetoggle", t), Et("toggle", t), Et("cancel", t), Et("close", t);
        break;
      case "iframe":
      case "object":
        Et("load", t);
        break;
      case "video":
      case "audio":
        for (o = 0; o < ql.length; o++)
          Et(ql[o], t);
        break;
      case "image":
        Et("error", t), Et("load", t);
        break;
      case "details":
        Et("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        Et("error", t), Et("load", t);
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
        for ($ in i)
          if (i.hasOwnProperty($) && (o = i[$], o != null))
            switch ($) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, n));
              default:
                Vt(t, n, $, o, i, null);
            }
        return;
      default:
        if (Wr(n)) {
          for (Z in i)
            i.hasOwnProperty(Z) && (o = i[Z], o !== void 0 && Uc(
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
      i.hasOwnProperty(C) && (o = i[C], o != null && Vt(t, n, C, o, i, null));
  }
  function e3(t, n, i, o) {
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
        var u = null, d = null, x = null, C = null, O = null, $ = null, Z = null;
        for (X in i) {
          var W = i[X];
          if (i.hasOwnProperty(X) && W != null)
            switch (X) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                O = W;
              default:
                o.hasOwnProperty(X) || Vt(t, n, X, null, o, W);
            }
        }
        for (var G in o) {
          var X = o[G];
          if (W = i[G], o.hasOwnProperty(G) && (X != null || W != null))
            switch (G) {
              case "type":
                d = X;
                break;
              case "name":
                u = X;
                break;
              case "checked":
                $ = X;
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
                X !== W && Vt(
                  t,
                  n,
                  G,
                  X,
                  o,
                  W
                );
            }
        }
        Fr(
          t,
          x,
          C,
          O,
          $,
          Z,
          d,
          u
        );
        return;
      case "select":
        X = x = C = G = null;
        for (d in i)
          if (O = i[d], i.hasOwnProperty(d) && O != null)
            switch (d) {
              case "value":
                break;
              case "multiple":
                X = O;
              default:
                o.hasOwnProperty(d) || Vt(
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
                G = d;
                break;
              case "defaultValue":
                C = d;
                break;
              case "multiple":
                x = d;
              default:
                d !== O && Vt(
                  t,
                  n,
                  u,
                  d,
                  o,
                  O
                );
            }
        n = C, i = x, o = X, G != null ? ai(t, !!i, G, !1) : !!o != !!i && (n != null ? ai(t, !!i, n, !0) : ai(t, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        X = G = null;
        for (C in i)
          if (u = i[C], i.hasOwnProperty(C) && u != null && !o.hasOwnProperty(C))
            switch (C) {
              case "value":
                break;
              case "children":
                break;
              default:
                Vt(t, n, C, null, o, u);
            }
        for (x in o)
          if (u = o[x], d = i[x], o.hasOwnProperty(x) && (u != null || d != null))
            switch (x) {
              case "value":
                G = u;
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
                u !== d && Vt(t, n, x, u, o, d);
            }
        am(t, G, X);
        return;
      case "option":
        for (var rt in i)
          if (G = i[rt], i.hasOwnProperty(rt) && G != null && !o.hasOwnProperty(rt))
            switch (rt) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Vt(
                  t,
                  n,
                  rt,
                  null,
                  o,
                  G
                );
            }
        for (O in o)
          if (G = o[O], X = i[O], o.hasOwnProperty(O) && G !== X && (G != null || X != null))
            switch (O) {
              case "selected":
                t.selected = G && typeof G != "function" && typeof G != "symbol";
                break;
              default:
                Vt(
                  t,
                  n,
                  O,
                  G,
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
        for (var pt in i)
          G = i[pt], i.hasOwnProperty(pt) && G != null && !o.hasOwnProperty(pt) && Vt(t, n, pt, null, o, G);
        for ($ in o)
          if (G = o[$], X = i[$], o.hasOwnProperty($) && G !== X && (G != null || X != null))
            switch ($) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (G != null)
                  throw Error(s(137, n));
                break;
              default:
                Vt(
                  t,
                  n,
                  $,
                  G,
                  o,
                  X
                );
            }
        return;
      default:
        if (Wr(n)) {
          for (var Ut in i)
            G = i[Ut], i.hasOwnProperty(Ut) && G !== void 0 && !o.hasOwnProperty(Ut) && Uc(
              t,
              n,
              Ut,
              void 0,
              o,
              G
            );
          for (Z in o)
            G = o[Z], X = i[Z], !o.hasOwnProperty(Z) || G === X || G === void 0 && X === void 0 || Uc(
              t,
              n,
              Z,
              G,
              o,
              X
            );
          return;
        }
    }
    for (var U in i)
      G = i[U], i.hasOwnProperty(U) && G != null && !o.hasOwnProperty(U) && Vt(t, n, U, null, o, G);
    for (W in o)
      G = o[W], X = i[W], !o.hasOwnProperty(W) || G === X || G == null && X == null || Vt(t, n, W, G, o, X);
  }
  function o0(t) {
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
  function n3() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, n = 0, i = performance.getEntriesByType("resource"), o = 0; o < i.length; o++) {
        var u = i[o], d = u.transferSize, x = u.initiatorType, C = u.duration;
        if (d && C && o0(x)) {
          for (x = 0, C = u.responseEnd, o += 1; o < i.length; o++) {
            var O = i[o], $ = O.startTime;
            if ($ > C) break;
            var Z = O.transferSize, W = O.initiatorType;
            Z && o0(W) && (O = O.responseEnd, x += Z * (O < C ? 1 : (C - $) / (O - $)));
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
  function r0(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function u0(t, n) {
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
  function a3() {
    var t = window.event;
    return t && t.type === "popstate" ? t === $c ? !1 : ($c = t, !0) : ($c = null, !1);
  }
  var c0 = typeof setTimeout == "function" ? setTimeout : void 0, i3 = typeof clearTimeout == "function" ? clearTimeout : void 0, f0 = typeof Promise == "function" ? Promise : void 0, l3 = typeof queueMicrotask == "function" ? queueMicrotask : typeof f0 < "u" ? function(t) {
    return f0.resolve(null).then(t).catch(s3);
  } : c0;
  function s3(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function fa(t) {
    return t === "head";
  }
  function d0(t, n) {
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
  function h0(t, n) {
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
  function o3(t, n, i, o) {
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
  function r3(t, n, i) {
    if (n === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !i || (t = nn(t.nextSibling), t === null)) return null;
    return t;
  }
  function m0(t, n) {
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
  function u3(t, n) {
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
  function p0(t) {
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
  function y0(t) {
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
  function g0(t, n, i) {
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
  var an = /* @__PURE__ */ new Map(), v0 = /* @__PURE__ */ new Set();
  function jo(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Gn = J.d;
  J.d = {
    f: c3,
    r: f3,
    D: d3,
    C: h3,
    L: m3,
    m: p3,
    X: g3,
    S: y3,
    M: v3
  };
  function c3() {
    var t = Gn.f(), n = vo();
    return t || n;
  }
  function f3(t) {
    var n = ti(t);
    n !== null && n.tag === 5 && n.type === "form" ? Lp(n) : Gn.r(t);
  }
  var Ni = typeof document > "u" ? null : document;
  function b0(t, n, i) {
    var o = Ni;
    if (o && typeof n == "string" && n) {
      var u = Qe(n);
      u = 'link[rel="' + t + '"][href="' + u + '"]', typeof i == "string" && (u += '[crossorigin="' + i + '"]'), v0.has(u) || (v0.add(u), t = { rel: t, crossOrigin: i, href: n }, o.querySelector(u) === null && (n = o.createElement("link"), ve(n, "link", t), de(n), o.head.appendChild(n)));
    }
  }
  function d3(t) {
    Gn.D(t), b0("dns-prefetch", t, null);
  }
  function h3(t, n) {
    Gn.C(t, n), b0("preconnect", t, n);
  }
  function m3(t, n, i) {
    Gn.L(t, n, i);
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
      ), an.set(d, t), o.querySelector(u) !== null || n === "style" && o.querySelector(Yl(d)) || n === "script" && o.querySelector(Xl(d)) || (n = o.createElement("link"), ve(n, "link", t), de(n), o.head.appendChild(n)));
    }
  }
  function p3(t, n) {
    Gn.m(t, n);
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
        o = i.createElement("link"), ve(o, "link", t), de(o), i.head.appendChild(o);
      }
    }
  }
  function y3(t, n, i) {
    Gn.S(t, n, i);
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
          de(O), ve(O, "link", t), O._p = new Promise(function($, Z) {
            O.onload = $, O.onerror = Z;
          }), O.addEventListener("load", function() {
            C.loading |= 1;
          }), O.addEventListener("error", function() {
            C.loading |= 2;
          }), C.loading |= 4, Mo(x, n, o);
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
  function g3(t, n) {
    Gn.X(t, n);
    var i = Ni;
    if (i && t) {
      var o = ei(i).hoistableScripts, u = zi(t), d = o.get(u);
      d || (d = i.querySelector(Xl(u)), d || (t = v({ src: t, async: !0 }, n), (n = an.get(u)) && Zc(t, n), d = i.createElement("script"), de(d), ve(d, "link", t), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, o.set(u, d));
    }
  }
  function v3(t, n) {
    Gn.M(t, n);
    var i = Ni;
    if (i && t) {
      var o = ei(i).hoistableScripts, u = zi(t), d = o.get(u);
      d || (d = i.querySelector(Xl(u)), d || (t = v({ src: t, async: !0, type: "module" }, n), (n = an.get(u)) && Zc(t, n), d = i.createElement("script"), de(d), ve(d, "link", t), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, o.set(u, d));
    }
  }
  function x0(t, n, i, o) {
    var u = (u = ht.current) ? jo(u) : null;
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
          }, an.set(t, i), d || b3(
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
  function S0(t) {
    return v({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function b3(t, n, i, o) {
    t.querySelector('link[rel="preload"][as="style"][' + n + "]") ? o.loading = 1 : (n = t.createElement("link"), o.preload = n, n.addEventListener("load", function() {
      return o.loading |= 1;
    }), n.addEventListener("error", function() {
      return o.loading |= 2;
    }), ve(n, "link", i), de(n), t.head.appendChild(n));
  }
  function zi(t) {
    return '[src="' + Qe(t) + '"]';
  }
  function Xl(t) {
    return "script[async]" + t;
  }
  function w0(t, n, i) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var o = t.querySelector(
            'style[data-href~="' + Qe(i.href) + '"]'
          );
          if (o)
            return n.instance = o, de(o), o;
          var u = v({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return o = (t.ownerDocument || t).createElement(
            "style"
          ), de(o), ve(o, "style", u), Mo(o, i.precedence, t), n.instance = o;
        case "stylesheet":
          u = Oi(i.href);
          var d = t.querySelector(
            Yl(u)
          );
          if (d)
            return n.state.loading |= 4, n.instance = d, de(d), d;
          o = S0(i), (u = an.get(u)) && Kc(o, u), d = (t.ownerDocument || t).createElement("link"), de(d);
          var x = d;
          return x._p = new Promise(function(C, O) {
            x.onload = C, x.onerror = O;
          }), ve(d, "link", o), n.state.loading |= 4, Mo(d, i.precedence, t), n.instance = d;
        case "script":
          return d = zi(i.src), (u = t.querySelector(
            Xl(d)
          )) ? (n.instance = u, de(u), u) : (o = i, (u = an.get(d)) && (o = v({}, i), Zc(o, u)), t = t.ownerDocument || t, u = t.createElement("script"), de(u), ve(u, "link", o), t.head.appendChild(u), n.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (o = n.instance, n.state.loading |= 4, Mo(o, i.precedence, t));
    return n.instance;
  }
  function Mo(t, n, i) {
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
  function T0(t, n, i) {
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
  function C0(t, n, i) {
    t = t.ownerDocument || t, t.head.insertBefore(
      i,
      n === "title" ? t.querySelector("head > title") : null
    );
  }
  function x3(t, n, i) {
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
  function E0(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function S3(t, n, i, o) {
    if (i.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var u = Oi(o.href), d = n.querySelector(
          Yl(u)
        );
        if (d) {
          n = d._p, n !== null && typeof n == "object" && typeof n.then == "function" && (t.count++, t = Do.bind(t), n.then(t, t)), i.state.loading |= 4, i.instance = d, de(d);
          return;
        }
        d = n.ownerDocument || n, o = S0(o), (u = an.get(u)) && Kc(o, u), d = d.createElement("link"), de(d);
        var x = d;
        x._p = new Promise(function(C, O) {
          x.onload = C, x.onerror = O;
        }), ve(d, "link", o), i.instance = d;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(i, n), (n = i.state.preload) && (i.state.loading & 3) === 0 && (t.count++, i = Do.bind(t), n.addEventListener("load", i), n.addEventListener("error", i));
    }
  }
  var Qc = 0;
  function w3(t, n) {
    return t.stylesheets && t.count === 0 && No(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(i) {
      var o = setTimeout(function() {
        if (t.stylesheets && No(t, t.stylesheets), t.unsuspend) {
          var d = t.unsuspend;
          t.unsuspend = null, d();
        }
      }, 6e4 + n);
      0 < t.imgBytes && Qc === 0 && (Qc = 62500 * n3());
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
  function Do() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) No(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Ro = null;
  function No(t, n) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Ro = /* @__PURE__ */ new Map(), n.forEach(T3, t), Ro = null, Do.call(t));
  }
  function T3(t, n) {
    if (!(n.state.loading & 4)) {
      var i = Ro.get(t);
      if (i) var o = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), Ro.set(t, i);
        for (var u = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), d = 0; d < u.length; d++) {
          var x = u[d];
          (x.nodeName === "LINK" || x.getAttribute("media") !== "not all") && (i.set(x.dataset.precedence, x), o = x);
        }
        o && i.set(null, o);
      }
      u = n.instance, x = u.getAttribute("data-precedence"), d = i.get(x) || o, d === o && i.set(null, u), i.set(x, u), this.count++, o = Do.bind(this), u.addEventListener("load", o), u.addEventListener("error", o), d ? d.parentNode.insertBefore(u, d.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(u, t.firstChild)), n.state.loading |= 4;
    }
  }
  var Pl = {
    $$typeof: j,
    Provider: null,
    Consumer: null,
    _currentValue: et,
    _currentValue2: et,
    _threadCount: 0
  };
  function C3(t, n, i, o, u, d, x, C, O) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Yr(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Yr(0), this.hiddenUpdates = Yr(null), this.identifierPrefix = o, this.onUncaughtError = u, this.onCaughtError = d, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = O, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function A0(t, n, i, o, u, d, x, C, O, $, Z, W) {
    return t = new C3(
      t,
      n,
      i,
      x,
      O,
      $,
      Z,
      W,
      C
    ), n = 1, d === !0 && (n |= 24), d = ke(3, null, null, n), t.current = d, d.stateNode = t, n = Mu(), n.refCount++, t.pooledCache = n, n.refCount++, d.memoizedState = {
      element: o,
      isDehydrated: i,
      cache: n
    }, Nu(d), t;
  }
  function j0(t) {
    return t ? (t = fi, t) : fi;
  }
  function M0(t, n, i, o, u, d) {
    u = j0(u), o.context === null ? o.context = u : o.pendingContext = u, o = ta(n), o.payload = { element: i }, d = d === void 0 ? null : d, d !== null && (o.callback = d), i = ea(t, o, n), i !== null && (ze(i, t, n), Cl(i, t, n));
  }
  function _0(t, n) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var i = t.retryLane;
      t.retryLane = i !== 0 && i < n ? i : n;
    }
  }
  function Fc(t, n) {
    _0(t, n), (t = t.alternate) && _0(t, n);
  }
  function D0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Ma(t, 67108864);
      n !== null && ze(n, t, 67108864), Fc(t, 67108864);
    }
  }
  function R0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Ye();
      n = Xr(n);
      var i = Ma(t, n);
      i !== null && ze(i, t, n), Fc(t, n);
    }
  }
  var Oo = !0;
  function E3(t, n, i, o) {
    var u = V.T;
    V.T = null;
    var d = J.p;
    try {
      J.p = 2, Jc(t, n, i, o);
    } finally {
      J.p = d, V.T = u;
    }
  }
  function A3(t, n, i, o) {
    var u = V.T;
    V.T = null;
    var d = J.p;
    try {
      J.p = 8, Jc(t, n, i, o);
    } finally {
      J.p = d, V.T = u;
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
        ), O0(t, o);
      else if (M3(
        u,
        t,
        n,
        i,
        o
      ))
        o.stopPropagation();
      else if (O0(t, o), n & 4 && -1 < j3.indexOf(t)) {
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
                      var O = 1 << 31 - Ve(x);
                      C.entanglements[1] |= O, x &= ~O;
                    }
                    bn(d), (Nt & 6) === 0 && (yo = Le() + 500, Hl(0));
                  }
                }
                break;
              case 31:
              case 13:
                C = Ma(d, 2), C !== null && ze(C, d, 2), vo(), Fc(d, 2);
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
  function N0(t) {
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
        switch (dx()) {
          case Hh:
            return 2;
          case qh:
            return 8;
          case ws:
          case hx:
            return 32;
          case $h:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var tf = !1, da = null, ha = null, ma = null, Kl = /* @__PURE__ */ new Map(), Zl = /* @__PURE__ */ new Map(), pa = [], j3 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function O0(t, n) {
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
    }, n !== null && (n = ti(n), n !== null && D0(n)), t) : (t.eventSystemFlags |= o, n = t.targetContainers, u !== null && n.indexOf(u) === -1 && n.push(u), t);
  }
  function M3(t, n, i, o, u) {
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
  function z0(t) {
    var n = Ia(t.target);
    if (n !== null) {
      var i = c(n);
      if (i !== null) {
        if (n = i.tag, n === 13) {
          if (n = f(i), n !== null) {
            t.blockedOn = n, Zh(t.priority, function() {
              R0(i);
            });
            return;
          }
        } else if (n === 31) {
          if (n = h(i), n !== null) {
            t.blockedOn = n, Zh(t.priority, function() {
              R0(i);
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
        return n = ti(i), n !== null && D0(n), t.blockedOn = i, !1;
      n.shift();
    }
    return !0;
  }
  function L0(t, n, i) {
    Lo(t) && i.delete(n);
  }
  function _3() {
    tf = !1, da !== null && Lo(da) && (da = null), ha !== null && Lo(ha) && (ha = null), ma !== null && Lo(ma) && (ma = null), Kl.forEach(L0), Zl.forEach(L0);
  }
  function Bo(t, n) {
    t.blockedOn === n && (t.blockedOn = null, tf || (tf = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      _3
    )));
  }
  var Vo = null;
  function B0(t) {
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
      z0(i), i.blockedOn === null && pa.shift();
    if (i = (t.ownerDocument || t).$$reactFormReplay, i != null)
      for (o = 0; o < i.length; o += 3) {
        var u = i[o], d = i[o + 1], x = u[Me] || null;
        if (typeof d == "function")
          x || B0(i);
        else if (x) {
          var C = null;
          if (d && d.hasAttribute("formAction")) {
            if (u = d, x = d[Me] || null)
              C = x.formAction;
            else if (Ic(u) !== null) continue;
          } else C = x.action;
          typeof C == "function" ? i[o + 1] = C : (i.splice(o, 3), o -= 3), B0(i);
        }
      }
  }
  function V0() {
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
    var i = n.current, o = Ye();
    M0(i, o, t, n, null, null);
  }, Uo.prototype.unmount = ef.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var n = t.containerInfo;
      M0(t.current, 2, null, t, null, null), vo(), n[Wa] = null;
    }
  };
  function Uo(t) {
    this._internalRoot = t;
  }
  Uo.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var n = Kh();
      t = { blockedOn: null, target: t, priority: n };
      for (var i = 0; i < pa.length && n !== 0 && n < pa[i].priority; i++) ;
      pa.splice(i, 0, t), i === 0 && z0(t);
    }
  };
  var U0 = e.version;
  if (U0 !== "19.2.7")
    throw Error(
      s(
        527,
        U0,
        "19.2.7"
      )
    );
  J.findDOMNode = function(t) {
    var n = t._reactInternals;
    if (n === void 0)
      throw typeof t.render == "function" ? Error(s(188)) : (t = Object.keys(t).join(","), Error(s(268, t)));
    return t = m(n), t = t !== null ? g(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var D3 = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: V,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var ko = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!ko.isDisabled && ko.supportsFiber)
      try {
        il = ko.inject(
          D3
        ), Be = ko;
      } catch {
      }
  }
  return Jl.createRoot = function(t, n) {
    if (!r(t)) throw Error(s(299));
    var i = !1, o = "", u = Xp, d = Pp, x = Kp;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (u = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (x = n.onRecoverableError)), n = A0(
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
      V0
    ), t[Wa] = n.current, Bc(t), new ef(n);
  }, Jl.hydrateRoot = function(t, n, i) {
    if (!r(t)) throw Error(s(299));
    var o = !1, u = "", d = Xp, x = Pp, C = Kp, O = null;
    return i != null && (i.unstable_strictMode === !0 && (o = !0), i.identifierPrefix !== void 0 && (u = i.identifierPrefix), i.onUncaughtError !== void 0 && (d = i.onUncaughtError), i.onCaughtError !== void 0 && (x = i.onCaughtError), i.onRecoverableError !== void 0 && (C = i.onRecoverableError), i.formState !== void 0 && (O = i.formState)), n = A0(
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
      V0
    ), n.context = j0(null), i = n.current, o = Ye(), o = Xr(o), u = ta(o), u.callback = null, ea(i, u, o), i = o, n.current.lanes = i, sl(n, i), bn(n), t[Wa] = n.current, Bc(t), new Uo(n);
  }, Jl.version = "19.2.7", Jl;
}
var Z0;
function $3() {
  if (Z0) return lf.exports;
  Z0 = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (e) {
        console.error(e);
      }
  }
  return a(), lf.exports = q3(), lf.exports;
}
var Bi = $3(), uf = { exports: {} }, cf = {};
var Q0;
function G3() {
  if (Q0) return cf;
  Q0 = 1;
  var a = gs().__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  return cf.c = function(e) {
    return a.H.useMemoCache(e);
  }, cf;
}
var F0;
function Y3() {
  return F0 || (F0 = 1, uf.exports = G3()), uf.exports;
}
var wt = Y3(), ff = { exports: {} }, df = {};
var J0;
function X3() {
  if (J0) return df;
  J0 = 1;
  var a = gs();
  function e(v, b) {
    return v === b && (v !== 0 || 1 / v === 1 / b) || v !== v && b !== b;
  }
  var l = typeof Object.is == "function" ? Object.is : e, s = a.useState, r = a.useEffect, c = a.useLayoutEffect, f = a.useDebugValue;
  function h(v, b) {
    var T = b(), S = s({ inst: { value: T, getSnapshot: b } }), w = S[0].inst, E = S[1];
    return c(
      function() {
        w.value = T, w.getSnapshot = b, y(w) && E({ inst: w });
      },
      [v, T, b]
    ), r(
      function() {
        return y(w) && E({ inst: w }), v(function() {
          y(w) && E({ inst: w });
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
  return df.useSyncExternalStore = a.useSyncExternalStore !== void 0 ? a.useSyncExternalStore : g, df;
}
var W0;
function P3() {
  return W0 || (W0 = 1, ff.exports = X3()), ff.exports;
}
var K3 = P3();
const Z3 = V3.useInsertionEffect, Q3 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", F3 = Q3 ? A.useLayoutEffect : A.useEffect, J3 = Z3 || F3, sv = (a) => {
  const e = A.useRef([a, (...l) => e[0](...l)]).current;
  return J3(() => {
    e[0] = a;
  }), e[1];
};
function Od(a, e) {
  a.indexOf(e) === -1 && a.push(e);
}
function dr(a, e) {
  const l = a.indexOf(e);
  l > -1 && a.splice(l, 1);
}
const Tn = (a, e, l) => l > e ? e : l < a ? a : l;
let zd = () => {
};
const ba = {}, ov = (a) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(a), rv = (a) => typeof a == "object" && a !== null, uv = (a) => /^0[^.\s]+$/u.test(a);
// @__NO_SIDE_EFFECTS__
function cv(a) {
  let e;
  return () => (e === void 0 && (e = a()), e);
}
const sn = /* @__NO_SIDE_EFFECTS__ */ (a) => a, vs = (...a) => a.reduce((e, l) => (s) => l(e(s))), cs = /* @__NO_SIDE_EFFECTS__ */ (a, e, l) => {
  const s = e - a;
  return s ? (l - a) / s : 1;
};
class Ld {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return Od(this.subscriptions, e), () => dr(this.subscriptions, e);
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
const Xe = /* @__NO_SIDE_EFFECTS__ */ (a) => a * 1e3, ln = /* @__NO_SIDE_EFFECTS__ */ (a) => a / 1e3, fv = /* @__NO_SIDE_EFFECTS__ */ (a, e) => e ? a * (1e3 / e) : 0, dv = (a, e, l) => (((1 - 3 * l + 3 * e) * a + (3 * l - 6 * e)) * a + 3 * e) * a, W3 = 1e-7, I3 = 12;
function t4(a, e, l, s, r) {
  let c, f, h = 0;
  do
    f = e + (l - e) / 2, c = dv(f, s, r) - a, c > 0 ? l = f : e = f;
  while (Math.abs(c) > W3 && ++h < I3);
  return f;
}
// @__NO_SIDE_EFFECTS__
function bs(a, e, l, s) {
  if (a === e && l === s)
    return sn;
  const r = (c) => t4(c, 0, 1, a, l);
  return (c) => c === 0 || c === 1 ? c : dv(r(c), e, s);
}
const hv = /* @__NO_SIDE_EFFECTS__ */ (a) => (e) => e <= 0.5 ? a(2 * e) / 2 : (2 - a(2 * (1 - e))) / 2, mv = /* @__NO_SIDE_EFFECTS__ */ (a) => (e) => 1 - a(1 - e), pv = /* @__PURE__ */ bs(0.33, 1.53, 0.69, 0.99), Bd = /* @__PURE__ */ mv(pv), yv = /* @__PURE__ */ hv(Bd), gv = (a) => a >= 1 ? 1 : (a *= 2) < 1 ? 0.5 * Bd(a) : 0.5 * (2 - Math.pow(2, -10 * (a - 1))), Vd = (a) => 1 - Math.sin(Math.acos(a)), vv = /* @__PURE__ */ mv(Vd), bv = /* @__PURE__ */ hv(Vd), e4 = /* @__PURE__ */ bs(0.42, 0, 1, 1), n4 = /* @__PURE__ */ bs(0, 0, 0.58, 1), xv = /* @__PURE__ */ bs(0.42, 0, 0.58, 1), a4 = /* @__NO_SIDE_EFFECTS__ */ (a) => Array.isArray(a) && typeof a[0] != "number", Sv = /* @__NO_SIDE_EFFECTS__ */ (a) => Array.isArray(a) && typeof a[0] == "number", i4 = {
  linear: sn,
  easeIn: e4,
  easeInOut: xv,
  easeOut: n4,
  circIn: Vd,
  circInOut: bv,
  circOut: vv,
  backIn: Bd,
  backInOut: yv,
  backOut: pv,
  anticipate: gv
}, l4 = (a) => typeof a == "string", I0 = (a) => {
  if (/* @__PURE__ */ Sv(a)) {
    zd(a.length === 4);
    const [e, l, s, r] = a;
    return /* @__PURE__ */ bs(e, l, s, r);
  } else if (l4(a))
    return i4[a];
  return a;
}, Ud = A.createContext({}), kd = A.createContext({ strict: !1 }), Hd = A.createContext({
  transformPagePoint: (a) => a,
  isStatic: !1,
  reducedMotion: "never"
}), Mr = /* @__PURE__ */ A.createContext({}), Ho = [
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
function s4(a) {
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
const o4 = 40;
function wv(a, e) {
  let l = !1, s = !0;
  const r = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, c = () => l = !0, f = Ho.reduce((j, R) => (j[R] = s4(c), j), {}), { setup: h, read: y, resolveKeyframes: m, preUpdate: g, update: v, preRender: b, render: T, postRender: S } = f, w = () => {
    const j = ba.useManualTiming, R = j ? r.timestamp : performance.now();
    l = !1, j || (r.delta = s ? 1e3 / 60 : Math.max(Math.min(R - r.timestamp, o4), 1)), r.timestamp = R, r.isProcessing = !0, h.process(r), y.process(r), m.process(r), g.process(r), v.process(r), b.process(r), T.process(r), S.process(r), r.isProcessing = !1, l && e && (s = !1, a(w));
  }, E = () => {
    l = !0, s = !0, r.isProcessing || a(w);
  };
  return { schedule: Ho.reduce((j, R) => {
    const B = f[R];
    return j[R] = (L, D = !1, k = !1) => (l || E(), B.schedule(L, D, k)), j;
  }, {}), cancel: (j) => {
    for (let R = 0; R < Ho.length; R++)
      f[Ho[R]].cancel(j);
  }, state: r, steps: f };
}
const { schedule: $t, cancel: xa, state: be, steps: hf } = /* @__PURE__ */ wv(typeof requestAnimationFrame < "u" ? requestAnimationFrame : sn, !0);
let nr;
function r4() {
  nr = void 0;
}
const Ee = {
  now: () => (nr === void 0 && Ee.set(be.isProcessing || ba.useManualTiming ? be.timestamp : performance.now()), nr),
  set: (a) => {
    nr = a, queueMicrotask(r4);
  }
}, Tv = (a) => (e) => typeof e == "string" && e.startsWith(a), Cv = /* @__PURE__ */ Tv("--"), u4 = /* @__PURE__ */ Tv("var(--"), qd = (a) => u4(a) ? c4.test(a.split("/*")[0].trim()) : !1, c4 = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function ty(a) {
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
}, ls = (a) => Math.round(a * 1e5) / 1e5, $d = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function f4(a) {
  return a == null;
}
const d4 = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Gd = (a, e) => (l) => !!(typeof l == "string" && d4.test(l) && l.startsWith(a) || e && !f4(l) && Object.prototype.hasOwnProperty.call(l, e)), Ev = (a, e, l) => (s) => {
  if (typeof s != "string")
    return s;
  const [r, c, f, h] = s.match($d);
  return {
    [a]: parseFloat(r),
    [e]: parseFloat(c),
    [l]: parseFloat(f),
    alpha: h !== void 0 ? parseFloat(h) : 1
  };
}, h4 = (a) => Tn(0, 255, a), mf = {
  ...Qi,
  transform: (a) => Math.round(h4(a))
}, Ka = {
  test: /* @__PURE__ */ Gd("rgb", "red"),
  parse: /* @__PURE__ */ Ev("red", "green", "blue"),
  transform: ({ red: a, green: e, blue: l, alpha: s = 1 }) => "rgba(" + mf.transform(a) + ", " + mf.transform(e) + ", " + mf.transform(l) + ", " + ls(fs.transform(s)) + ")"
};
function m4(a) {
  let e = "", l = "", s = "", r = "";
  return a.length > 5 ? (e = a.substring(1, 3), l = a.substring(3, 5), s = a.substring(5, 7), r = a.substring(7, 9)) : (e = a.substring(1, 2), l = a.substring(2, 3), s = a.substring(3, 4), r = a.substring(4, 5), e += e, l += l, s += s, r += r), {
    red: parseInt(e, 16),
    green: parseInt(l, 16),
    blue: parseInt(s, 16),
    alpha: r ? parseInt(r, 16) / 255 : 1
  };
}
const Zf = {
  test: /* @__PURE__ */ Gd("#"),
  parse: m4,
  transform: Ka.transform
}, xs = /* @__NO_SIDE_EFFECTS__ */ (a) => ({
  test: (e) => typeof e == "string" && e.endsWith(a) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${a}`
}), Yn = /* @__PURE__ */ xs("deg"), wn = /* @__PURE__ */ xs("%"), ct = /* @__PURE__ */ xs("px"), p4 = /* @__PURE__ */ xs("vh"), y4 = /* @__PURE__ */ xs("vw"), ey = {
  ...wn,
  parse: (a) => wn.parse(a) / 100,
  transform: (a) => wn.transform(a * 100)
}, Ui = {
  test: /* @__PURE__ */ Gd("hsl", "hue"),
  parse: /* @__PURE__ */ Ev("hue", "saturation", "lightness"),
  transform: ({ hue: a, saturation: e, lightness: l, alpha: s = 1 }) => "hsla(" + Math.round(a) + ", " + wn.transform(ls(e)) + ", " + wn.transform(ls(l)) + ", " + ls(fs.transform(s)) + ")"
}, se = {
  test: (a) => Ka.test(a) || Zf.test(a) || Ui.test(a),
  parse: (a) => Ka.test(a) ? Ka.parse(a) : Ui.test(a) ? Ui.parse(a) : Zf.parse(a),
  transform: (a) => typeof a == "string" ? a : a.hasOwnProperty("red") ? Ka.transform(a) : Ui.transform(a),
  getAnimatableNone: (a) => {
    const e = se.parse(a);
    return e.alpha = 0, se.transform(e);
  }
}, g4 = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function v4(a) {
  return isNaN(a) && typeof a == "string" && (a.match($d)?.length || 0) + (a.match(g4)?.length || 0) > 0;
}
const Av = "number", jv = "color", b4 = "var", x4 = "var(", ny = "${}", S4 = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Pi(a) {
  const e = a.toString(), l = [], s = {
    color: [],
    number: [],
    var: []
  }, r = [];
  let c = 0;
  const h = e.replace(S4, (y) => (se.test(y) ? (s.color.push(c), r.push(jv), l.push(se.parse(y))) : y.startsWith(x4) ? (s.var.push(c), r.push(b4), l.push(y)) : (s.number.push(c), r.push(Av), l.push(parseFloat(y))), ++c, ny)).split(ny);
  return { values: l, split: h, indexes: s, types: r };
}
function w4(a) {
  return Pi(a).values;
}
function Mv({ split: a, types: e }) {
  const l = a.length;
  return (s) => {
    let r = "";
    for (let c = 0; c < l; c++)
      if (r += a[c], s[c] !== void 0) {
        const f = e[c];
        f === Av ? r += ls(s[c]) : f === jv ? r += se.transform(s[c]) : r += s[c];
      }
    return r;
  };
}
function T4(a) {
  return Mv(Pi(a));
}
const C4 = (a) => typeof a == "number" ? 0 : se.test(a) ? se.getAnimatableNone(a) : a, E4 = (a, e) => typeof a == "number" ? e?.trim().endsWith("/") ? a : 0 : C4(a);
function A4(a) {
  const e = Pi(a);
  return Mv(e)(e.values.map((s, r) => E4(s, e.split[r])));
}
const pn = {
  test: v4,
  parse: w4,
  createTransformer: T4,
  getAnimatableNone: A4
};
function pf(a, e, l) {
  return l < 0 && (l += 1), l > 1 && (l -= 1), l < 1 / 6 ? a + (e - a) * 6 * l : l < 1 / 2 ? e : l < 2 / 3 ? a + (e - a) * (2 / 3 - l) * 6 : a;
}
function j4({ hue: a, saturation: e, lightness: l, alpha: s }) {
  a /= 360, e /= 100, l /= 100;
  let r = 0, c = 0, f = 0;
  if (!e)
    r = c = f = l;
  else {
    const h = l < 0.5 ? l * (1 + e) : l + e - l * e, y = 2 * l - h;
    r = pf(y, h, a + 1 / 3), c = pf(y, h, a), f = pf(y, h, a - 1 / 3);
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
const qt = (a, e, l) => a + (e - a) * l, yf = (a, e, l) => {
  const s = a * a, r = l * (e * e - s) + s;
  return r < 0 ? 0 : Math.sqrt(r);
}, M4 = [Zf, Ka, Ui], _4 = (a) => M4.find((e) => e.test(a));
function ay(a) {
  const e = _4(a);
  if (!e)
    return !1;
  let l = e.parse(a);
  return e === Ui && (l = j4(l)), l;
}
const iy = (a, e) => {
  const l = ay(a), s = ay(e);
  if (!l || !s)
    return hr(a, e);
  const r = { ...l };
  return (c) => (r.red = yf(l.red, s.red, c), r.green = yf(l.green, s.green, c), r.blue = yf(l.blue, s.blue, c), r.alpha = qt(l.alpha, s.alpha, c), Ka.transform(r));
}, Qf = /* @__PURE__ */ new Set(["none", "hidden"]);
function D4(a, e) {
  return Qf.has(a) ? (l) => l <= 0 ? a : e : (l) => l >= 1 ? e : a;
}
function R4(a, e) {
  return (l) => qt(a, e, l);
}
function Yd(a) {
  return typeof a == "number" ? R4 : typeof a == "string" ? qd(a) ? hr : se.test(a) ? iy : z4 : Array.isArray(a) ? _v : typeof a == "object" ? se.test(a) ? iy : N4 : hr;
}
function _v(a, e) {
  const l = [...a], s = l.length, r = a.map((c, f) => Yd(c)(c, e[f]));
  return (c) => {
    for (let f = 0; f < s; f++)
      l[f] = r[f](c);
    return l;
  };
}
function N4(a, e) {
  const l = { ...a, ...e }, s = {};
  for (const r in l)
    a[r] !== void 0 && e[r] !== void 0 && (s[r] = Yd(a[r])(a[r], e[r]));
  return (r) => {
    for (const c in s)
      l[c] = s[c](r);
    return l;
  };
}
function O4(a, e) {
  const l = [], s = { color: 0, var: 0, number: 0 };
  for (let r = 0; r < e.values.length; r++) {
    const c = e.types[r], f = a.indexes[c][s[c]], h = a.values[f] ?? 0;
    l[r] = h, s[c]++;
  }
  return l;
}
const z4 = (a, e) => {
  const l = pn.createTransformer(e), s = Pi(a), r = Pi(e);
  return s.indexes.var.length === r.indexes.var.length && s.indexes.color.length === r.indexes.color.length && s.indexes.number.length >= r.indexes.number.length ? Qf.has(a) && !r.values.length || Qf.has(e) && !s.values.length ? D4(a, e) : vs(_v(O4(s, r), r.values), l) : hr(a, e);
};
function Dv(a, e, l) {
  return typeof a == "number" && typeof e == "number" && typeof l == "number" ? qt(a, e, l) : Yd(a)(a, e);
}
const L4 = (a) => {
  const e = ({ timestamp: l }) => a(l);
  return {
    start: (l = !0) => $t.update(e, l),
    stop: () => xa(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => be.isProcessing ? be.timestamp : Ee.now()
  };
}, Rv = (a, e, l = 10) => {
  let s = "";
  const r = Math.max(Math.round(e / l), 2);
  for (let c = 0; c < r; c++)
    s += Math.round(a(c / (r - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, mr = 2e4;
function Xd(a) {
  let e = 0;
  const l = 50;
  let s = a.next(e);
  for (; !s.done && e < mr; )
    e += l, s = a.next(e);
  return e >= mr ? 1 / 0 : e;
}
function B4(a, e = 100, l) {
  const s = l({ ...a, keyframes: [0, e] }), r = Math.min(Xd(s), mr);
  return {
    type: "keyframes",
    ease: (c) => s.next(r * c).value / e,
    duration: /* @__PURE__ */ ln(r)
  };
}
const Jt = {
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
const V4 = 12;
function U4(a, e, l) {
  let s = l;
  for (let r = 1; r < V4; r++)
    s = s - a(s) / e(s);
  return s;
}
const gf = 1e-3;
function k4({ duration: a = Jt.duration, bounce: e = Jt.bounce, velocity: l = Jt.velocity, mass: s = Jt.mass }) {
  let r, c, f = 1 - e;
  f = Tn(Jt.minDamping, Jt.maxDamping, f), a = Tn(Jt.minDuration, Jt.maxDuration, /* @__PURE__ */ ln(a)), f < 1 ? (r = (m) => {
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
  const h = 5 / a, y = U4(r, c, h);
  if (a = /* @__PURE__ */ Xe(a), isNaN(y))
    return {
      stiffness: Jt.stiffness,
      damping: Jt.damping,
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
const H4 = ["duration", "bounce"], q4 = ["stiffness", "damping", "mass"];
function ly(a, e) {
  return e.some((l) => a[l] !== void 0);
}
function $4(a) {
  let e = {
    velocity: Jt.velocity,
    stiffness: Jt.stiffness,
    damping: Jt.damping,
    mass: Jt.mass,
    isResolvedFromDuration: !1,
    ...a
  };
  if (!ly(a, q4) && ly(a, H4))
    if (e.velocity = 0, a.visualDuration) {
      const l = a.visualDuration, s = 2 * Math.PI / (l * 1.2), r = s * s, c = 2 * Tn(0.05, 1, 1 - (a.bounce || 0)) * Math.sqrt(r);
      e = {
        ...e,
        mass: Jt.mass,
        stiffness: r,
        damping: c
      };
    } else {
      const l = k4({ ...a, velocity: 0 });
      e = {
        ...e,
        ...l,
        mass: Jt.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function pr(a = Jt.visualDuration, e = Jt.bounce) {
  const l = typeof a != "object" ? {
    visualDuration: a,
    keyframes: [0, 1],
    bounce: e
  } : a;
  let { restSpeed: s, restDelta: r } = l;
  const c = l.keyframes[0], f = l.keyframes[l.keyframes.length - 1], h = { done: !1, value: c }, { stiffness: y, damping: m, mass: g, duration: v, velocity: b, isResolvedFromDuration: T } = $4({
    ...l,
    velocity: -/* @__PURE__ */ ln(l.velocity || 0)
  }), S = b || 0, w = m / (2 * Math.sqrt(y * g)), E = f - c, _ = /* @__PURE__ */ ln(Math.sqrt(y / g)), M = Math.abs(E) < 5;
  s || (s = M ? Jt.restSpeed.granular : Jt.restSpeed.default), r || (r = M ? Jt.restDelta.granular : Jt.restDelta.default);
  let j, R, B, L, D, k;
  if (w < 1)
    B = Ff(_, w), L = (S + w * _ * E) / B, j = (H) => {
      const I = Math.exp(-w * _ * H);
      return f - I * (L * Math.sin(B * H) + E * Math.cos(B * H));
    }, D = w * _ * L + E * B, k = w * _ * E - L * B, R = (H) => Math.exp(-w * _ * H) * (D * Math.sin(B * H) + k * Math.cos(B * H));
  else if (w === 1) {
    j = (I) => f - Math.exp(-_ * I) * (E + (S + _ * E) * I);
    const H = S + _ * E;
    R = (I) => Math.exp(-_ * I) * (_ * H * I - S);
  } else {
    const H = _ * Math.sqrt(w * w - 1);
    j = (at) => {
      const ot = Math.exp(-w * _ * at), V = Math.min(H * at, 300);
      return f - ot * ((S + w * _ * E) * Math.sinh(V) + H * E * Math.cosh(V)) / H;
    };
    const I = (S + w * _ * E) / H, K = w * _ * I - E * H, Q = w * _ * E - I * H;
    R = (at) => {
      const ot = Math.exp(-w * _ * at), V = Math.min(H * at, 300);
      return ot * (K * Math.sinh(V) + Q * Math.cosh(V));
    };
  }
  const P = {
    calculatedDuration: T && v || null,
    velocity: (H) => /* @__PURE__ */ Xe(R(H)),
    next: (H) => {
      if (!T && w < 1) {
        const K = Math.exp(-w * _ * H), Q = Math.sin(B * H), at = Math.cos(B * H), ot = f - K * (L * Q + E * at), V = /* @__PURE__ */ Xe(K * (D * Q + k * at));
        return h.done = Math.abs(V) <= s && Math.abs(f - ot) <= r, h.value = h.done ? f : ot, h;
      }
      const I = j(H);
      if (T)
        h.done = H >= v;
      else {
        const K = /* @__PURE__ */ Xe(R(H));
        h.done = Math.abs(K) <= s && Math.abs(f - I) <= r;
      }
      return h.value = h.done ? f : I, h;
    },
    toString: () => {
      const H = Math.min(Xd(P), mr), I = Rv((K) => P.next(H * K).value, H, 30);
      return H + "ms " + I;
    },
    toTransition: () => {
    }
  };
  return P;
}
pr.applyToOptions = (a) => {
  const e = B4(a, 100, pr);
  return a.ease = e.ease, a.duration = /* @__PURE__ */ Xe(e.duration), a.type = "keyframes", a;
};
const G4 = 5;
function Nv(a, e, l) {
  const s = Math.max(e - G4, 0);
  return /* @__PURE__ */ fv(l - a(s), e - s);
}
function Jf({ keyframes: a, velocity: e = 0, power: l = 0.8, timeConstant: s = 325, bounceDamping: r = 10, bounceStiffness: c = 500, modifyTarget: f, min: h, max: y, restDelta: m = 0.5, restSpeed: g }) {
  const v = a[0], b = {
    done: !1,
    value: v
  }, T = (k) => h !== void 0 && k < h || y !== void 0 && k > y, S = (k) => h === void 0 ? y : y === void 0 || Math.abs(h - k) < Math.abs(y - k) ? h : y;
  let w = l * e;
  const E = v + w, _ = f === void 0 ? E : f(E);
  _ !== E && (w = _ - v);
  const M = (k) => -w * Math.exp(-k / s), j = (k) => _ + M(k), R = (k) => {
    const P = M(k), H = j(k);
    b.done = Math.abs(P) <= m, b.value = b.done ? _ : H;
  };
  let B, L;
  const D = (k) => {
    T(b.value) && (B = k, L = pr({
      keyframes: [b.value, S(b.value)],
      velocity: Nv(j, k, b.value),
      // TODO: This should be passing * 1000
      damping: r,
      stiffness: c,
      restDelta: m,
      restSpeed: g
    }));
  };
  return D(0), {
    calculatedDuration: null,
    next: (k) => {
      let P = !1;
      return !L && B === void 0 && (P = !0, R(k), D(k)), B !== void 0 && k >= B ? L.next(k - B) : (!P && R(k), b);
    }
  };
}
function Y4(a, e, l) {
  const s = [], r = l || ba.mix || Dv, c = a.length - 1;
  for (let f = 0; f < c; f++) {
    let h = r(a[f], a[f + 1]);
    if (e) {
      const y = Array.isArray(e) ? e[f] || sn : e;
      h = vs(y, h);
    }
    s.push(h);
  }
  return s;
}
function X4(a, e, { clamp: l = !0, ease: s, mixer: r } = {}) {
  const c = a.length;
  if (zd(c === e.length), c === 1)
    return () => e[0];
  if (c === 2 && e[0] === e[1])
    return () => e[1];
  const f = a[0] === a[1];
  a[0] > a[c - 1] && (a = [...a].reverse(), e = [...e].reverse());
  const h = Y4(e, s, r), y = h.length, m = (g) => {
    if (f && g < a[0])
      return e[0];
    let v = 0;
    if (y > 1)
      for (; v < a.length - 2 && !(g < a[v + 1]); v++)
        ;
    const b = /* @__PURE__ */ cs(a[v], a[v + 1], g);
    return h[v](b);
  };
  return l ? (g) => m(Tn(a[0], a[c - 1], g)) : m;
}
function P4(a, e) {
  const l = a[a.length - 1];
  for (let s = 1; s <= e; s++) {
    const r = /* @__PURE__ */ cs(0, e, s);
    a.push(qt(l, 1, r));
  }
}
function K4(a) {
  const e = [0];
  return P4(e, a.length - 1), e;
}
function Z4(a, e) {
  return a.map((l) => l * e);
}
function Q4(a, e) {
  return a.map(() => e || xv).splice(0, a.length - 1);
}
function ss({ duration: a = 300, keyframes: e, times: l, ease: s = "easeInOut" }) {
  const r = /* @__PURE__ */ a4(s) ? s.map(I0) : I0(s), c = {
    done: !1,
    value: e[0]
  }, f = Z4(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    l && l.length === e.length ? l : K4(e),
    a
  ), h = X4(f, e, {
    ease: Array.isArray(r) ? r : Q4(e, r)
  });
  return {
    calculatedDuration: a,
    next: (y) => (c.value = h(y), c.done = y >= a, c)
  };
}
const F4 = (a) => a !== null;
function _r(a, { repeat: e, repeatType: l = "loop" }, s, r = 1) {
  const c = a.filter(F4), h = r < 0 || e && l !== "loop" && e % 2 === 1 ? 0 : c.length - 1;
  return !h || s === void 0 ? c[h] : s;
}
const J4 = {
  decay: Jf,
  inertia: Jf,
  tween: ss,
  keyframes: ss,
  spring: pr
};
function Ov(a) {
  typeof a.type == "string" && (a.type = J4[a.type]);
}
class Pd {
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
const W4 = (a) => a / 100;
class yr extends Pd {
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
    Ov(e);
    const { type: l = ss, repeat: s = 0, repeatDelay: r = 0, repeatType: c, velocity: f = 0 } = e;
    let { keyframes: h } = e;
    const y = l || ss;
    y !== ss && typeof h[0] != "number" && (this.mixKeyframes = vs(W4, Dv(h[0], h[1])), h = [0, 100]);
    const m = y({ ...e, keyframes: h });
    c === "mirror" && (this.mirroredGenerator = y({
      ...e,
      keyframes: [...h].reverse(),
      velocity: -f
    })), m.calculatedDuration === null && (m.calculatedDuration = Xd(m));
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
    const { delay: m = 0, keyframes: g, repeat: v, repeatType: b, repeatDelay: T, type: S, onUpdate: w, finalKeyframe: E } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - r / this.speed, this.startTime)), l ? this.currentTime = e : this.updateTime(e);
    const _ = this.currentTime - m * (this.playbackSpeed >= 0 ? 1 : -1), M = this.playbackSpeed >= 0 ? _ < 0 : _ > r;
    this.currentTime = Math.max(_, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = r);
    let j = this.currentTime, R = s;
    if (v) {
      const k = Math.min(this.currentTime, r) / h;
      let P = Math.floor(k), H = k % 1;
      !H && k >= 1 && (H = 1), H === 1 && P--, P = Math.min(P, v + 1), !!(P % 2) && (b === "reverse" ? (H = 1 - H, T && (H -= T / h)) : b === "mirror" && (R = f)), j = Tn(0, 1, H) * h;
    }
    let B;
    M ? (this.delayState.value = g[0], B = this.delayState) : B = R.next(j), c && !M && (B.value = c(B.value));
    let { done: L } = B;
    !M && y !== null && (L = this.playbackSpeed >= 0 ? this.currentTime >= r : this.currentTime <= 0);
    const D = this.holdTime === null && (this.state === "finished" || this.state === "running" && L);
    return D && S !== Jf && (B.value = _r(g, this.options, E, this.speed)), w && w(B.value), D && this.finish(), B;
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
    return Nv((s) => this.generator.next(s).value, e, l);
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
    const { driver: e = L4, startTime: l } = this.options;
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
function I4(a) {
  for (let e = 1; e < a.length; e++)
    a[e] ?? (a[e] = a[e - 1]);
}
const Za = (a) => a * 180 / Math.PI, Wf = (a) => {
  const e = Za(Math.atan2(a[1], a[0]));
  return If(e);
}, t5 = {
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
}, If = (a) => (a = a % 360, a < 0 && (a += 360), a), sy = Wf, oy = (a) => Math.sqrt(a[0] * a[0] + a[1] * a[1]), ry = (a) => Math.sqrt(a[4] * a[4] + a[5] * a[5]), e5 = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: oy,
  scaleY: ry,
  scale: (a) => (oy(a) + ry(a)) / 2,
  rotateX: (a) => If(Za(Math.atan2(a[6], a[5]))),
  rotateY: (a) => If(Za(Math.atan2(-a[2], a[0]))),
  rotateZ: sy,
  rotate: sy,
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
    s = e5, r = l;
  else {
    const h = a.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = t5, r = h;
  }
  if (!r)
    return td(e);
  const c = s[e], f = r[1].split(",").map(a5);
  return typeof c == "function" ? c(f) : f[c];
}
const n5 = (a, e) => {
  const { transform: l = "none" } = getComputedStyle(a);
  return ed(l, e);
};
function a5(a) {
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
], Ji = /* @__PURE__ */ new Set([...Fi, "pathRotation"]), uy = (a) => a === Qi || a === ct, i5 = /* @__PURE__ */ new Set(["x", "y", "z"]), l5 = Fi.filter((a) => !i5.has(a));
function s5(a) {
  const e = [];
  return l5.forEach((l) => {
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
function zv() {
  if (ad) {
    const a = Array.from(Fa).filter((s) => s.needsMeasurement), e = new Set(a.map((s) => s.element)), l = /* @__PURE__ */ new Map();
    e.forEach((s) => {
      const r = s5(s);
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
function Lv() {
  Fa.forEach((a) => {
    a.readKeyframes(), a.needsMeasurement && (ad = !0);
  });
}
function o5() {
  id = !0, Lv(), zv(), id = !1;
}
class Kd {
  constructor(e, l, s, r, c, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = l, this.name = s, this.motionValue = r, this.element = c, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Fa.add(this), nd || (nd = !0, $t.read(Lv), $t.resolveKeyframes(zv))) : (this.readKeyframes(), this.complete());
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
    I4(e);
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
const r5 = (a) => a.startsWith("--");
function Bv(a, e, l) {
  r5(e) ? a.style.setProperty(e, l) : a.style[e] = l;
}
const u5 = {};
function Vv(a, e) {
  const l = /* @__PURE__ */ cv(a);
  return () => u5[e] ?? l();
}
const c5 = /* @__PURE__ */ Vv(() => window.ScrollTimeline !== void 0, "scrollTimeline"), Uv = /* @__PURE__ */ Vv(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), es = ([a, e, l, s]) => `cubic-bezier(${a}, ${e}, ${l}, ${s})`, cy = {
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
function kv(a, e) {
  if (a)
    return typeof a == "function" ? Uv() ? Rv(a, e) : "ease-out" : /* @__PURE__ */ Sv(a) ? es(a) : Array.isArray(a) ? a.map((l) => kv(l, e) || cy.easeOut) : cy[a];
}
function f5(a, e, l, { delay: s = 0, duration: r = 300, repeat: c = 0, repeatType: f = "loop", ease: h = "easeOut", times: y } = {}, m = void 0) {
  const g = {
    [e]: l
  };
  y && (g.offset = y);
  const v = kv(h, r);
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
function Hv(a) {
  return typeof a == "function" && "applyToOptions" in a;
}
function d5({ type: a, ...e }) {
  return Hv(a) && Uv() ? a.applyToOptions(e) : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
}
class qv extends Pd {
  constructor(e) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e)
      return;
    const { element: l, name: s, keyframes: r, pseudoElement: c, allowFlatten: f = !1, finalKeyframe: h, onComplete: y } = e;
    this.isPseudoElement = !!c, this.allowFlatten = f, this.options = e, zd(typeof e.type != "string");
    const m = d5(e);
    this.animation = f5(l, s, r, m, c), m.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !c) {
        const g = _r(r, this.options, h, this.speed);
        this.updateMotionValue && this.updateMotionValue(g), Bv(l, s, g), this.animation.cancel();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && c5() ? (this.animation.timeline = e, l && (this.animation.rangeStart = l), s && (this.animation.rangeEnd = s), sn) : r(this);
  }
}
const $v = {
  anticipate: gv,
  backInOut: yv,
  circInOut: bv
};
function h5(a) {
  return a in $v;
}
function m5(a) {
  typeof a.ease == "string" && h5(a.ease) && (a.ease = $v[a.ease]);
}
const vf = 10;
class p5 extends qv {
  constructor(e) {
    m5(e), Ov(e), super(e), e.startTime !== void 0 && e.autoplay !== !1 && (this.startTime = e.startTime), this.options = e;
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
    }), y = Math.max(vf, Ee.now() - this.startTime), m = Tn(0, vf, y - vf), g = h.sample(y).value, { name: v } = this.options;
    c && v && Bv(c, v, g), l.setWithVelocity(h.sample(Math.max(0, y - m)).value, g, m), h.stop();
  }
}
const fy = (a, e) => e === "zIndex" ? !1 : !!(typeof a == "number" || Array.isArray(a) || typeof a == "string" && // It's animatable if we have a string
(pn.test(a) || a === "0") && // And it contains numbers and/or colors
!a.startsWith("url("));
function y5(a) {
  const e = a[0];
  if (a.length === 1)
    return !0;
  for (let l = 0; l < a.length; l++)
    if (a[l] !== e)
      return !0;
}
function g5(a, e, l, s) {
  const r = a[0];
  if (r === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const c = a[a.length - 1], f = fy(r, e), h = fy(c, e);
  return !f || !h ? !1 : y5(a) || (l === "spring" || Hv(l)) && s;
}
function ld(a) {
  a.duration = 0, a.type = "keyframes";
}
const Gv = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), v5 = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function b5(a) {
  for (let e = 0; e < a.length; e++)
    if (typeof a[e] == "string" && v5.test(a[e]))
      return !0;
  return !1;
}
const x5 = /* @__PURE__ */ new Set([
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
]), S5 = /* @__PURE__ */ cv(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function w5(a) {
  const { motionValue: e, name: l, repeatDelay: s, repeatType: r, damping: c, type: f, keyframes: h } = a;
  if (!(e?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: m, transformTemplate: g } = e.owner.getProps();
  return S5() && l && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (Gv.has(l) || x5.has(l) && b5(h)) && (l !== "transform" || !g) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !m && !s && r !== "mirror" && c !== 0 && f !== "inertia";
}
const T5 = 40;
class C5 extends Pd {
  constructor({ autoplay: e = !0, delay: l = 0, type: s = "keyframes", repeat: r = 0, repeatDelay: c = 0, repeatType: f = "loop", keyframes: h, name: y, motionValue: m, element: g, ...v }) {
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
      name: y,
      motionValue: m,
      element: g,
      ...v
    }, T = g?.KeyframeResolver || Kd;
    this.keyframeResolver = new T(h, (S, w, E) => this.onKeyframesResolved(S, w, b, !E), y, m, g), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(e, l, s, r) {
    this.keyframeResolver = void 0;
    const { name: c, type: f, velocity: h, delay: y, isHandoff: m, onUpdate: g } = s;
    this.resolvedAt = Ee.now();
    let v = !0;
    g5(e, c, f, h) || (v = !1, (ba.instantAnimations || !y) && g?.(_r(e, s, l)), e[0] = e[e.length - 1], ld(s), s.repeat = 0);
    const T = {
      startTime: r ? this.resolvedAt ? this.resolvedAt - this.createdAt > T5 ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: l,
      ...s,
      keyframes: e
    }, S = v && !m && w5(T), w = T.motionValue?.owner?.current;
    let E;
    if (S)
      try {
        E = new p5({
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
    return this._animation || (this.keyframeResolver?.resume(), o5()), this._animation;
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
function Yv(a, e, l, s = 0, r = 1) {
  const c = Array.from(a).sort((m, g) => m.sortNodePosition(g)).indexOf(e), f = a.size, h = (f - 1) * s;
  return typeof l == "function" ? l(c, f) : r === 1 ? c * s : h - c * s;
}
const dy = 30, E5 = (a) => !isNaN(parseFloat(a));
class A5 {
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
    this.current = e, this.updatedAt = Ee.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = E5(this.current));
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
    this.events[e] || (this.events[e] = new Ld());
    const s = this.events[e].add(l);
    return e === "change" ? () => {
      s(), $t.read(() => {
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
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > dy)
      return 0;
    const l = Math.min(this.updatedAt - this.prevUpdatedAt, dy);
    return /* @__PURE__ */ fv(parseFloat(this.current) - parseFloat(this.prevFrameValue), l);
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
  return new A5(a, e);
}
function Xv(a, e) {
  if (a?.inherit && e) {
    const { inherit: l, ...s } = a;
    return { ...e, ...s };
  }
  return a;
}
function Zd(a, e) {
  const l = a?.[e] ?? a?.default ?? a;
  return l !== a ? Xv(l, a) : l;
}
const j5 = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, M5 = (a) => ({
  type: "spring",
  stiffness: 550,
  damping: a === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), _5 = {
  type: "keyframes",
  duration: 0.8
}, D5 = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, R5 = (a, { keyframes: e }) => e.length > 2 ? _5 : Ji.has(a) ? a.startsWith("scale") ? M5(e[1]) : j5 : D5, N5 = /* @__PURE__ */ new Set([
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
function O5(a) {
  for (const e in a)
    if (!N5.has(e))
      return !0;
  return !1;
}
const Qd = (a, e, l, s = {}, r, c) => (f) => {
  const h = Zd(s, a) || {}, y = h.delay || s.delay || 0;
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
  O5(h) || Object.assign(g, R5(a, g)), g.duration && (g.duration = /* @__PURE__ */ Xe(g.duration)), g.repeatDelay && (g.repeatDelay = /* @__PURE__ */ Xe(g.repeatDelay)), g.from !== void 0 && (g.keyframes[0] = g.from);
  let v = !1;
  if ((g.type === !1 || g.duration === 0 && !g.repeatDelay) && (ld(g), g.delay === 0 && (v = !0)), (ba.instantAnimations || ba.skipAnimations || r?.shouldSkipAnimations || h.skipAnimations) && (v = !0, ld(g), g.delay = 0), g.allowFlatten = !h.type && !h.ease, v && !c && e.get() !== void 0) {
    const b = _r(g.keyframes, h);
    if (b !== void 0) {
      $t.update(() => {
        g.onUpdate(b), g.onComplete();
      });
      return;
    }
  }
  return h.isSync ? new yr(g) : new C5(g);
}, z5 = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function L5(a) {
  const e = z5.exec(a);
  if (!e)
    return [,];
  const [, l, s, r] = e;
  return [`--${l ?? s}`, r];
}
function Pv(a, e, l = 1) {
  const [s, r] = L5(a);
  if (!s)
    return;
  const c = window.getComputedStyle(e).getPropertyValue(s);
  if (c) {
    const f = c.trim();
    return ov(f) ? parseFloat(f) : f;
  }
  return qd(r) ? Pv(r, e, l + 1) : r;
}
function hy(a) {
  const e = [{}, {}];
  return a?.values.forEach((l, s) => {
    e[0][s] = l.get(), e[1][s] = l.getVelocity();
  }), e;
}
function Fd(a, e, l, s) {
  if (typeof e == "function") {
    const [r, c] = hy(s);
    e = e(l !== void 0 ? l : a.custom, r, c);
  }
  if (typeof e == "string" && (e = a.variants && a.variants[e]), typeof e == "function") {
    const [r, c] = hy(s);
    e = e(l !== void 0 ? l : a.custom, r, c);
  }
  return e;
}
function Ja(a, e, l) {
  const s = a.getProps();
  return Fd(s, e, l !== void 0 ? l : s.custom, a);
}
const Kv = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Fi
]), sd = (a) => Array.isArray(a);
function B5(a, e, l) {
  a.hasValue(e) ? a.getValue(e).set(l) : a.addValue(e, Ki(l));
}
function V5(a) {
  return sd(a) ? a[a.length - 1] || 0 : a;
}
function U5(a, e) {
  const l = Ja(a, e);
  let { transitionEnd: s = {}, transition: r = {}, ...c } = l || {};
  c = { ...c, ...s };
  for (const f in c) {
    const h = V5(c[f]);
    B5(a, f, h);
  }
}
const xe = (a) => !!(a && a.getVelocity);
function k5(a) {
  return !!(xe(a) && a.add);
}
function od(a, e) {
  const l = a.getValue("willChange");
  if (k5(l))
    return l.add(e);
  if (!l && ba.WillChange) {
    const s = new ba.WillChange("auto");
    a.addValue("willChange", s), s.add(e);
  }
}
function Jd(a) {
  return a.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
const H5 = "framerAppearId", Zv = "data-" + Jd(H5);
function Qv(a) {
  return a.props[Zv];
}
function q5({ protectedKeys: a, needsAnimating: e }, l) {
  const s = a.hasOwnProperty(l) && e[l] !== !0;
  return e[l] = !1, s;
}
function Fv(a, e, { delay: l = 0, transitionOverride: s, type: r } = {}) {
  let { transition: c, transitionEnd: f, ...h } = e;
  const y = a.getDefaultTransition();
  c = c ? Xv(c, y) : y;
  const m = c?.reduceMotion, g = c?.skipAnimations;
  s && (c = s);
  const v = [], b = r && a.animationState && a.animationState.getState()[r], T = c?.path;
  T && T.animateVisualElement(a, h, c, l, v);
  for (const S in h) {
    const w = a.getValue(S, a.latestValues[S] ?? null), E = h[S];
    if (E === void 0 || b && q5(b, S))
      continue;
    const _ = {
      delay: l,
      ...Zd(c || {}, S)
    };
    g && (_.skipAnimations = !0);
    const M = w.get();
    if (M !== void 0 && !w.isAnimating() && !Array.isArray(E) && E === M && !_.velocity) {
      $t.update(() => w.set(E));
      continue;
    }
    let j = !1;
    if (window.MotionHandoffAnimation) {
      const L = Qv(a);
      if (L) {
        const D = window.MotionHandoffAnimation(L, S, $t);
        D !== null && (_.startTime = D, j = !0);
      }
    }
    od(a, S);
    const R = m ?? a.shouldReduceMotion;
    w.start(Qd(S, w, E, R && Kv.has(S) ? { type: !1 } : _, a, j));
    const B = w.animation;
    B && v.push(B);
  }
  if (f) {
    const S = () => $t.update(() => {
      f && U5(a, f);
    });
    v.length ? Promise.all(v).then(S) : S();
  }
  return v;
}
function rd(a, e, l = {}) {
  const s = Ja(a, e, l.type === "exit" ? a.presenceContext?.custom : void 0);
  let { transition: r = a.getDefaultTransition() || {} } = s || {};
  l.transitionOverride && (r = l.transitionOverride);
  const c = s ? () => Promise.all(Fv(a, s, l)) : () => Promise.resolve(), f = a.variantChildren && a.variantChildren.size ? (y = 0) => {
    const { delayChildren: m = 0, staggerChildren: g, staggerDirection: v } = r;
    return $5(a, e, y, m, g, v, l);
  } : () => Promise.resolve(), { when: h } = r;
  if (h) {
    const [y, m] = h === "beforeChildren" ? [c, f] : [f, c];
    return y().then(() => m());
  } else
    return Promise.all([c(), f(l.delay)]);
}
function $5(a, e, l = 0, s = 0, r = 0, c = 1, f) {
  const h = [];
  for (const y of a.variantChildren)
    y.notify("AnimationStart", e), h.push(rd(y, e, {
      ...f,
      delay: l + (typeof s == "function" ? 0 : s) + Yv(a.variantChildren, y, s, r, c)
    }).then(() => y.notify("AnimationComplete", e)));
  return Promise.all(h);
}
function G5(a, e, l = {}) {
  a.notify("AnimationStart", e);
  let s;
  if (Array.isArray(e)) {
    const r = e.map((c) => rd(a, c, l));
    s = Promise.all(r);
  } else if (typeof e == "string")
    s = rd(a, e, l);
  else {
    const r = typeof e == "function" ? Ja(a, e, l.custom) : e;
    s = Promise.all(Fv(a, r, l));
  }
  return s.then(() => {
    a.notify("AnimationComplete", e);
  });
}
const Y5 = {
  test: (a) => a === "auto",
  parse: (a) => a
}, Jv = (a) => (e) => e.test(a), Wv = [Qi, ct, wn, Yn, y4, p4, Y5], my = (a) => Wv.find(Jv(a));
function X5(a) {
  return typeof a == "number" ? a === 0 : a !== null ? a === "none" || a === "0" || uv(a) : !0;
}
const P5 = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function K5(a) {
  const [e, l] = a.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return a;
  const [s] = l.match($d) || [];
  if (!s)
    return a;
  const r = l.replace(s, "");
  let c = P5.has(e) ? 1 : 0;
  return s !== l && (c *= 100), e + "(" + c + r + ")";
}
const Z5 = /\b([a-z-]*)\(.*?\)/gu, ud = {
  ...pn,
  getAnimatableNone: (a) => {
    const e = a.match(Z5);
    return e ? e.map(K5).join(" ") : a;
  }
}, cd = {
  ...pn,
  getAnimatableNone: (a) => {
    const e = pn.parse(a);
    return pn.createTransformer(a)(e.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, py = {
  ...Qi,
  transform: Math.round
}, Q5 = {
  rotate: Yn,
  /**
   * Internal channel for `transition.path` orientToPath. Composed onto
   * `rotate` at the transform-build sites so the user's `rotate` is
   * never read or overwritten. Not part of `transformPropOrder`.
   */
  pathRotation: Yn,
  rotateX: Yn,
  rotateY: Yn,
  rotateZ: Yn,
  scale: qo,
  scaleX: qo,
  scaleY: qo,
  scaleZ: qo,
  skew: Yn,
  skewX: Yn,
  skewY: Yn,
  distance: ct,
  translateX: ct,
  translateY: ct,
  translateZ: ct,
  x: ct,
  y: ct,
  z: ct,
  perspective: ct,
  transformPerspective: ct,
  opacity: fs,
  originX: ey,
  originY: ey,
  originZ: ct
}, gr = {
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
  ...Q5,
  zIndex: py,
  // SVG
  fillOpacity: fs,
  strokeOpacity: fs,
  numOctaves: py
}, F5 = {
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
}, Iv = (a) => F5[a], J5 = /* @__PURE__ */ new Set([ud, cd]);
function t2(a, e) {
  let l = Iv(a);
  return J5.has(l) || (l = pn), l.getAnimatableNone ? l.getAnimatableNone(e) : void 0;
}
const W5 = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function I5(a, e, l) {
  let s = 0, r;
  for (; s < a.length && !r; ) {
    const c = a[s];
    typeof c == "string" && !W5.has(c) && Pi(c).values.length && (r = a[s]), s++;
  }
  if (r && l)
    for (const c of e)
      a[c] = t2(l, r);
}
class t9 extends Kd {
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
      if (typeof v == "string" && (v = v.trim(), qd(v))) {
        const b = Pv(v, l.current);
        b !== void 0 && (e[g] = b), g === e.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !Kv.has(s) || e.length !== 2)
      return;
    const [r, c] = e, f = my(r), h = my(c), y = ty(r), m = ty(c);
    if (y !== m && va[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (f !== h)
      if (uy(f) && uy(h))
        for (let g = 0; g < e.length; g++) {
          const v = e[g];
          typeof v == "string" && (e[g] = parseFloat(v));
        }
      else va[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: l } = this, s = [];
    for (let r = 0; r < e.length; r++)
      (e[r] === null || X5(e[r])) && s.push(r);
    s.length && I5(e, s, l);
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
    s[c] = va[l](e.measureViewportBox(), window.getComputedStyle(e.current)), f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f), this.removedTransforms?.length && this.removedTransforms.forEach(([h, y]) => {
      e.getValue(h).set(y);
    }), this.resolveNoneKeyframes();
  }
}
const Wd = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
];
function e2(a, e, l) {
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
  return rv(a) && "offsetHeight" in a && !("ownerSVGElement" in a);
}
const { schedule: Id } = /* @__PURE__ */ wv(queueMicrotask, !1), fn = {
  x: !1,
  y: !1
};
function n2() {
  return fn.x || fn.y;
}
function e9(a) {
  return a === "x" || a === "y" ? fn[a] ? null : (fn[a] = !0, () => {
    fn[a] = !1;
  }) : fn.x || fn.y ? null : (fn.x = fn.y = !0, () => {
    fn.x = fn.y = !1;
  });
}
function a2(a, e) {
  const l = e2(a), s = new AbortController(), r = {
    passive: !0,
    ...e,
    signal: s.signal
  };
  return [l, r, () => s.abort()];
}
function n9(a) {
  return !(a.pointerType === "touch" || n2());
}
function a9(a, e, l = {}) {
  const [s, r, c] = a2(a, l);
  return s.forEach((f) => {
    let h = !1, y = !1, m;
    const g = () => {
      f.removeEventListener("pointerleave", S);
    }, v = (E) => {
      m && (m(E), m = void 0), g();
    }, b = (E) => {
      h = !1, window.removeEventListener("pointerup", b), window.removeEventListener("pointercancel", b), y && (y = !1, v(E));
    }, T = () => {
      h = !0, window.addEventListener("pointerup", b, r), window.addEventListener("pointercancel", b, r);
    }, S = (E) => {
      if (E.pointerType !== "touch") {
        if (h) {
          y = !0;
          return;
        }
        v(E);
      }
    }, w = (E) => {
      if (!n9(E))
        return;
      y = !1;
      const _ = e(f, E);
      typeof _ == "function" && (m = _, f.addEventListener("pointerleave", S, r));
    };
    f.addEventListener("pointerenter", w, r), f.addEventListener("pointerdown", T, r);
  }), c;
}
const i2 = (a, e) => e ? a === e ? !0 : i2(a, e.parentElement) : !1, th = (a) => a.pointerType === "mouse" ? typeof a.button != "number" || a.button <= 0 : a.isPrimary !== !1, i9 = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function l9(a) {
  return i9.has(a.tagName) || a.isContentEditable === !0;
}
const s9 = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function o9(a) {
  return s9.has(a.tagName) || a.isContentEditable === !0;
}
const ir = /* @__PURE__ */ new WeakSet();
function yy(a) {
  return (e) => {
    e.key === "Enter" && a(e);
  };
}
function bf(a, e) {
  a.dispatchEvent(new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }));
}
const r9 = (a, e) => {
  const l = a.currentTarget;
  if (!l)
    return;
  const s = yy(() => {
    if (ir.has(l))
      return;
    bf(l, "down");
    const r = yy(() => {
      bf(l, "up");
    }), c = () => bf(l, "cancel");
    l.addEventListener("keyup", r, e), l.addEventListener("blur", c, e);
  });
  l.addEventListener("keydown", s, e), l.addEventListener("blur", () => l.removeEventListener("keydown", s), e);
};
function gy(a) {
  return th(a) && !n2();
}
const vy = /* @__PURE__ */ new WeakSet();
function u9(a, e, l = {}) {
  const [s, r, c] = a2(a, l), f = (h) => {
    const y = h.currentTarget;
    if (!gy(h) || vy.has(h))
      return;
    ir.add(y), l.stopPropagation && vy.add(h);
    const m = e(y, h), g = { ...r, capture: !0 }, v = (S, w) => {
      window.removeEventListener("pointerup", b, g), window.removeEventListener("pointercancel", T, g), ir.has(y) && ir.delete(y), gy(S) && typeof m == "function" && m(S, { success: w });
    }, b = (S) => {
      v(S, y === window || y === document || l.useGlobalTarget || i2(y, S.target));
    }, T = (S) => {
      v(S, !1);
    };
    window.addEventListener("pointerup", b, g), window.addEventListener("pointercancel", T, g);
  };
  return s.forEach((h) => {
    (l.useGlobalTarget ? window : h).addEventListener("pointerdown", f, r), ar(h) && (h.addEventListener("focus", (m) => r9(m, r)), !l9(h) && !h.hasAttribute("tabindex") && (h.tabIndex = 0));
  }), c;
}
function eh(a) {
  return rv(a) && "ownerSVGElement" in a;
}
const lr = /* @__PURE__ */ new WeakMap();
let sr;
const l2 = (a, e, l) => (s, r) => r && r[0] ? r[0][a + "Size"] : eh(s) && "getBBox" in s ? s.getBBox()[e] : s[l], c9 = /* @__PURE__ */ l2("inline", "width", "offsetWidth"), f9 = /* @__PURE__ */ l2("block", "height", "offsetHeight");
function d9({ target: a, borderBoxSize: e }) {
  lr.get(a)?.forEach((l) => {
    l(a, {
      get width() {
        return c9(a, e);
      },
      get height() {
        return f9(a, e);
      }
    });
  });
}
function h9(a) {
  a.forEach(d9);
}
function m9() {
  typeof ResizeObserver > "u" || (sr = new ResizeObserver(h9));
}
function p9(a, e) {
  sr || m9();
  const l = e2(a);
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
function y9() {
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
function g9(a) {
  return or.add(a), ki || y9(), () => {
    or.delete(a), !or.size && typeof ki == "function" && (window.removeEventListener("resize", ki), ki = void 0);
  };
}
function by(a, e) {
  return typeof a == "function" ? g9(a) : p9(a, e);
}
function v9(a) {
  return eh(a) && a.tagName === "svg";
}
const b9 = [...Wv, se, pn], x9 = (a) => b9.find(Jv(a)), xy = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Hi = () => ({
  x: xy(),
  y: xy()
}), Sy = () => ({ min: 0, max: 0 }), ce = () => ({
  x: Sy(),
  y: Sy()
}), S9 = /* @__PURE__ */ new WeakMap();
function Dr(a) {
  return a !== null && typeof a == "object" && typeof a.start == "function";
}
function ds(a) {
  return typeof a == "string" || Array.isArray(a);
}
const nh = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], ah = ["initial", ...nh];
function Rr(a) {
  return Dr(a.animate) || ah.some((e) => ds(a[e]));
}
function s2(a) {
  return !!(Rr(a) || a.variants);
}
function w9(a, e, l) {
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
const vr = { current: null }, ih = { current: !1 }, T9 = typeof window < "u";
function o2() {
  if (ih.current = !0, !!T9)
    if (window.matchMedia) {
      const a = window.matchMedia("(prefers-reduced-motion)"), e = () => vr.current = a.matches;
      a.addEventListener("change", e), e();
    } else
      vr.current = !1;
}
const wy = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let br = {};
function r2(a) {
  br = a;
}
function C9() {
  return br;
}
class E9 {
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
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Kd, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const T = Ee.now();
      this.renderScheduledAt < T && (this.renderScheduledAt = T, $t.render(this.render, !1, !0));
    };
    const { latestValues: m, renderState: g } = h;
    this.latestValues = m, this.baseTarget = { ...m }, this.initialValues = l.initial ? { ...m } : {}, this.renderState = g, this.parent = e, this.props = l, this.presenceContext = s, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = r, this.skipAnimationsConfig = c, this.options = y, this.blockInitialAnimation = !!f, this.isControllingVariants = Rr(l), this.isVariantNode = s2(l), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
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
    this.current = e, S9.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((l, s) => this.bindToMotionValue(s, l)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (ih.current || o2(), this.shouldReduceMotion = vr.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
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
    if (this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)(), l.accelerate && Gv.has(e) && this.current instanceof HTMLElement) {
      const { factory: f, keyframes: h, times: y, ease: m, duration: g } = l.accelerate, v = new qv({
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
    const s = Ji.has(e);
    s && this.onBindTransform && this.onBindTransform();
    const r = l.on("change", (f) => {
      this.latestValues[e] = f, this.props.onUpdate && $t.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : ce();
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
    for (let s = 0; s < wy.length; s++) {
      const r = wy[s];
      this.propEventSubscriptions[r] && (this.propEventSubscriptions[r](), delete this.propEventSubscriptions[r]);
      const c = "on" + r, f = e[c];
      f && (this.propEventSubscriptions[r] = this.on(r, f));
    }
    this.prevMotionValues = w9(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return s != null && (typeof s == "string" && (ov(s) || uv(s)) ? s = parseFloat(s) : !x9(s) && pn.test(l) && (s = t2(e, l)), this.setBaseTarget(e, xe(s) ? s.get() : s)), xe(s) ? s.get() : s;
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
      const c = Fd(this.props, l, this.presenceContext?.custom);
      c && (s = c[e]);
    }
    if (l && s !== void 0)
      return s;
    const r = this.getBaseTargetFromProps(this.props, e);
    return r !== void 0 && !xe(r) ? r : this.initialValues[e] !== void 0 && s === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, l) {
    return this.events[e] || (this.events[e] = new Ld()), this.events[e].add(l);
  }
  notify(e, ...l) {
    this.events[e] && this.events[e].notify(...l);
  }
  scheduleRenderMicrotask() {
    Id.render(this.render);
  }
}
class u2 extends E9 {
  constructor() {
    super(...arguments), this.KeyframeResolver = t9;
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
function c2({ top: a, left: e, right: l, bottom: s }) {
  return {
    x: { min: e, max: l },
    y: { min: a, max: s }
  };
}
function A9({ x: a, y: e }) {
  return { top: e.min, right: a.max, bottom: e.max, left: a.min };
}
function j9(a, e) {
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
  return dd(a) || f2(a) || a.z || a.rotate || a.rotateX || a.rotateY || a.skewX || a.skewY;
}
function f2(a) {
  return Ty(a.x) || Ty(a.y);
}
function Ty(a) {
  return a && a !== "0%";
}
function xr(a, e, l) {
  const s = a - l, r = e * s;
  return l + r;
}
function Cy(a, e, l, s, r) {
  return r !== void 0 && (a = xr(a, r, s)), xr(a, l, s) + e;
}
function hd(a, e = 0, l = 1, s, r) {
  a.min = Cy(a.min, e, l, s, r), a.max = Cy(a.max, e, l, s, r);
}
function d2(a, { x: e, y: l }) {
  hd(a.x, e.translate, e.scale, e.originPoint), hd(a.y, l.translate, l.scale, l.originPoint);
}
const Ey = 0.999999999999, Ay = 1.0000000000001;
function M9(a, e, l, s = !1) {
  const r = l.length;
  if (!r)
    return;
  e.x = e.y = 1;
  let c, f;
  for (let h = 0; h < r; h++) {
    c = l[h], f = c.projectionDelta;
    const { visualElement: y } = c.options;
    y && y.props.style && y.props.style.display === "contents" || (s && c.options.layoutScroll && c.scroll && c !== c.root && (Sn(a.x, -c.scroll.offset.x), Sn(a.y, -c.scroll.offset.y)), f && (e.x *= f.x.scale, e.y *= f.y.scale, d2(a, f)), s && Ya(c.latestValues) && rr(a, c.latestValues, c.layout?.layoutBox));
  }
  e.x < Ay && e.x > Ey && (e.x = 1), e.y < Ay && e.y > Ey && (e.y = 1);
}
function Sn(a, e) {
  a.min += e, a.max += e;
}
function jy(a, e, l, s, r = 0.5) {
  const c = qt(a.min, a.max, r);
  hd(a, e, l, c, s);
}
function My(a, e) {
  return typeof a == "string" ? parseFloat(a) / 100 * (e.max - e.min) : a;
}
function rr(a, e, l) {
  const s = l ?? a;
  jy(a.x, My(e.x, s.x), e.scaleX, e.scale, e.originX), jy(a.y, My(e.y, s.y), e.scaleY, e.scale, e.originY);
}
function h2(a, e) {
  return c2(j9(a.getBoundingClientRect(), e));
}
function _9(a, e, l) {
  const s = h2(a, l), { scroll: r } = e;
  return r && (Sn(s.x, r.offset.x), Sn(s.y, r.offset.y)), s;
}
const D9 = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, R9 = Fi.length;
function N9(a, e, l) {
  let s = "", r = !0;
  for (let f = 0; f < R9; f++) {
    const h = Fi[f], y = a[h];
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
      const g = fd(y, gr[h]);
      if (!m) {
        r = !1;
        const v = D9[h] || h;
        s += `${v}(${g}) `;
      }
      l && (e[h] = g);
    }
  }
  const c = a.pathRotation;
  return c && (r = !1, s += `rotate(${fd(c, gr.pathRotation)}) `), s = s.trim(), l ? s = l(e, r ? "" : s) : r && (s = "none"), s;
}
function lh(a, e, l) {
  const { style: s, vars: r, transformOrigin: c } = a;
  let f = !1, h = !1;
  for (const y in e) {
    const m = e[y];
    if (Ji.has(y)) {
      f = !0;
      continue;
    } else if (Cv(y)) {
      r[y] = m;
      continue;
    } else {
      const g = fd(m, gr[y]);
      y.startsWith("origin") ? (h = !0, c[y] = g) : s[y] = g;
    }
  }
  if (e.transform || (f || l ? s.transform = N9(e, a.transform, l) : s.transform && (s.transform = "none")), h) {
    const { originX: y = "50%", originY: m = "50%", originZ: g = 0 } = c;
    s.transformOrigin = `${y} ${m} ${g}`;
  }
}
function m2(a, { style: e, vars: l }, s, r) {
  const c = a.style;
  let f;
  for (f in e)
    c[f] = e[f];
  r?.applyProjectionStyles(c, s);
  for (f in l)
    c.setProperty(f, l[f]);
}
function _y(a, e) {
  return e.max === e.min ? 0 : a / (e.max - e.min) * 100;
}
const Wl = {
  correct: (a, e) => {
    if (!e.target)
      return a;
    if (typeof a == "string")
      if (ct.test(a))
        a = parseFloat(a);
      else
        return a;
    const l = _y(a, e.target.x), s = _y(a, e.target.y);
    return `${l}% ${s}%`;
  }
}, O9 = {
  correct: (a, { treeScale: e, projectionDelta: l }) => {
    const s = a, r = pn.parse(a);
    if (r.length > 5)
      return s;
    const c = pn.createTransformer(a), f = typeof r[0] != "number" ? 1 : 0, h = l.x.scale * e.x, y = l.y.scale * e.y;
    r[0 + f] /= h, r[1 + f] /= y;
    const m = qt(h, y, 0.5);
    return typeof r[2 + f] == "number" && (r[2 + f] /= m), typeof r[3 + f] == "number" && (r[3 + f] /= m), c(r);
  }
}, md = {
  borderRadius: {
    ...Wl,
    applyTo: [...Wd]
  },
  borderTopLeftRadius: Wl,
  borderTopRightRadius: Wl,
  borderBottomLeftRadius: Wl,
  borderBottomRightRadius: Wl,
  boxShadow: O9
};
function p2(a, { layout: e, layoutId: l }) {
  return Ji.has(a) || a.startsWith("origin") || (e || l !== void 0) && (!!md[a] || a === "opacity");
}
function sh(a, e, l) {
  const s = a.style, r = e?.style, c = {};
  if (!s)
    return c;
  for (const f in s)
    (xe(s[f]) || r && xe(r[f]) || p2(f, a) || l?.getValue(f)?.liveStyle !== void 0) && (c[f] = s[f]);
  return c;
}
function z9(a) {
  return window.getComputedStyle(a);
}
class L9 extends u2 {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = m2;
  }
  readValueFromInstance(e, l) {
    if (Ji.has(l))
      return this.projection?.isProjecting ? td(l) : n5(e, l);
    {
      const s = z9(e), r = (Cv(l) ? s.getPropertyValue(l) : s[l]) || 0;
      return typeof r == "string" ? r.trim() : r;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: l }) {
    return h2(e, l);
  }
  build(e, l, s) {
    lh(e, l, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, l, s) {
    return sh(e, l, s);
  }
}
const B9 = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, V9 = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function U9(a, e, l = 1, s = 0, r = !0) {
  a.pathLength = 1;
  const c = r ? B9 : V9;
  a[c.offset] = `${-s}`, a[c.array] = `${e} ${l}`;
}
const k9 = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function y2(a, {
  attrX: e,
  attrY: l,
  attrScale: s,
  pathLength: r,
  pathSpacing: c = 1,
  pathOffset: f = 0,
  // This is object creation, which we try to avoid per-frame.
  ...h
}, y, m, g) {
  if (lh(a, h, m), y) {
    a.style.viewBox && (a.attrs.viewBox = a.style.viewBox);
    return;
  }
  a.attrs = a.style, a.style = {};
  const { attrs: v, style: b } = a;
  v.transform && (b.transform = v.transform, delete v.transform), (b.transform || v.transformOrigin) && (b.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), b.transform && (b.transformBox = g?.transformBox ?? "fill-box", delete v.transformBox);
  for (const T of k9)
    v[T] !== void 0 && (b[T] = v[T], delete v[T]);
  e !== void 0 && (v.x = e), l !== void 0 && (v.y = l), s !== void 0 && (v.scale = s), r !== void 0 && U9(v, r, c, f, !1);
}
const g2 = /* @__PURE__ */ new Set([
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
]), v2 = (a) => typeof a == "string" && a.toLowerCase() === "svg";
function H9(a, e, l, s) {
  m2(a, e, void 0, s);
  for (const r in e.attrs)
    a.setAttribute(g2.has(r) ? r : Jd(r), e.attrs[r]);
}
function b2(a, e, l) {
  const s = sh(a, e, l);
  for (const r in a)
    if (xe(a[r]) || xe(e[r])) {
      const c = Fi.indexOf(r) !== -1 ? "attr" + r.charAt(0).toUpperCase() + r.substring(1) : r;
      s[c] = a[r];
    }
  return s;
}
class q9 extends u2 {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = ce;
  }
  getBaseTargetFromProps(e, l) {
    return e[l];
  }
  readValueFromInstance(e, l) {
    if (Ji.has(l)) {
      const s = Iv(l);
      return s && s.default || 0;
    }
    return l = g2.has(l) ? l : Jd(l), e.getAttribute(l);
  }
  scrapeMotionValuesFromProps(e, l, s) {
    return b2(e, l, s);
  }
  build(e, l, s) {
    y2(e, l, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(e, l, s, r) {
    H9(e, l, s, r);
  }
  mount(e) {
    this.isSVGTag = v2(e.tagName), super.mount(e);
  }
}
const $9 = ah.length;
function x2(a) {
  if (!a)
    return;
  if (!a.isControllingVariants) {
    const l = a.parent ? x2(a.parent) || {} : {};
    return a.props.initial !== void 0 && (l.initial = a.props.initial), l;
  }
  const e = {};
  for (let l = 0; l < $9; l++) {
    const s = ah[l], r = a.props[s];
    (ds(r) || r === !1) && (e[s] = r);
  }
  return e;
}
function S2(a, e) {
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
const G9 = [...nh].reverse(), Y9 = nh.length;
function X9(a) {
  return (e) => Promise.all(e.map(({ animation: l, options: s }) => G5(a, l, s)));
}
function P9(a) {
  let e = X9(a), l = Dy(), s = !0, r = !1;
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
    const { props: g } = a, v = x2(a.parent) || {}, b = [], T = /* @__PURE__ */ new Set();
    let S = {}, w = 1 / 0;
    for (let _ = 0; _ < Y9; _++) {
      const M = G9[_], j = l[M], R = g[M] !== void 0 ? g[M] : v[M], B = ds(R), L = M === m ? j.isActive : null;
      L === !1 && (w = _);
      let D = R === v[M] && R !== g[M] && B;
      if (D && (s || r) && a.manuallyAnimateOnMount && (D = !1), j.protectedKeys = { ...S }, // If it isn't active and hasn't *just* been set as inactive
      !j.isActive && L === null || // If we didn't and don't have any defined prop for this animation type
      !R && !j.prevProp || // Or if the prop doesn't define an animation
      Dr(R) || typeof R == "boolean")
        continue;
      if (M === "exit" && j.isActive && L !== !0) {
        j.prevResolvedValues && (S = {
          ...S,
          ...j.prevResolvedValues
        });
        continue;
      }
      const k = K9(j.prevProp, R);
      let P = k || // If we're making this variant active, we want to always make it active
      M === m && j.isActive && !D && B || // If we removed a higher-priority variant (i is in reverse order)
      _ > w && B, H = !1;
      const I = Array.isArray(R) ? R : [R];
      let K = I.reduce(c(M), {});
      L === !1 && (K = {});
      const { prevResolvedValues: Q = {} } = j, at = {
        ...Q,
        ...K
      }, ot = (et) => {
        P = !0, T.has(et) && (H = !0, T.delete(et)), j.needsAnimating[et] = !0;
        const nt = a.getValue(et);
        nt && (nt.liveStyle = !1);
      };
      for (const et in at) {
        const nt = K[et], ut = Q[et];
        if (S.hasOwnProperty(et))
          continue;
        let N = !1;
        sd(nt) && sd(ut) ? N = !S2(nt, ut) || k : N = nt !== ut, N ? nt != null ? ot(et) : T.add(et) : nt !== void 0 && T.has(et) ? ot(et) : j.protectedKeys[et] = !0;
      }
      j.prevProp = R, j.prevResolvedValues = K, j.isActive && (S = { ...S, ...K }), (s || r) && a.blockInitialAnimation && (P = !1);
      const V = D && k;
      P && (!V || H) && b.push(...I.map((et) => {
        const nt = { type: M };
        if (typeof et == "string" && (s || r) && !V && a.manuallyAnimateOnMount && a.parent) {
          const { parent: ut } = a, N = Ja(ut, et);
          if (ut.enteringChildren && N) {
            const { delayChildren: Y } = N.transition || {};
            nt.delay = Yv(ut.enteringChildren, a, Y);
          }
        }
        return {
          animation: et,
          options: nt
        };
      }));
    }
    if (T.size) {
      const _ = {};
      if (typeof g.initial != "boolean") {
        const M = Ja(a, Array.isArray(g.initial) ? g.initial[0] : g.initial);
        M && M.transition && (_.transition = M.transition);
      }
      T.forEach((M) => {
        const j = a.getBaseTarget(M), R = a.getValue(M);
        R && (R.liveStyle = !0), _[M] = j ?? null;
      }), b.push({ animation: _ });
    }
    let E = !!b.length;
    return s && (g.initial === !1 || g.initial === g.animate) && !a.manuallyAnimateOnMount && (E = !1), s = !1, r = !1, E ? e(b) : Promise.resolve();
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
function K9(a, e) {
  return typeof e == "string" ? e !== a : Array.isArray(e) ? !S2(e, a) : !1;
}
function qa(a = !1) {
  return {
    isActive: a,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Dy() {
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
function Ry(a, e) {
  a.translate = e.translate, a.scale = e.scale, a.originPoint = e.originPoint, a.origin = e.origin;
}
const w2 = 1e-4, Z9 = 1 - w2, Q9 = 1 + w2, T2 = 0.01, F9 = 0 - T2, J9 = 0 + T2;
function Ae(a) {
  return a.max - a.min;
}
function W9(a, e, l) {
  return Math.abs(a - e) <= l;
}
function Ny(a, e, l, s = 0.5) {
  a.origin = s, a.originPoint = qt(e.min, e.max, a.origin), a.scale = Ae(l) / Ae(e), a.translate = qt(l.min, l.max, a.origin) - a.originPoint, (a.scale >= Z9 && a.scale <= Q9 || isNaN(a.scale)) && (a.scale = 1), (a.translate >= F9 && a.translate <= J9 || isNaN(a.translate)) && (a.translate = 0);
}
function os(a, e, l, s) {
  Ny(a.x, e.x, l.x, s ? s.originX : void 0), Ny(a.y, e.y, l.y, s ? s.originY : void 0);
}
function Oy(a, e, l, s = 0) {
  const r = s ? qt(l.min, l.max, s) : l.min;
  a.min = r + e.min, a.max = a.min + Ae(e);
}
function I9(a, e, l, s) {
  Oy(a.x, e.x, l.x, s?.x), Oy(a.y, e.y, l.y, s?.y);
}
function zy(a, e, l, s = 0) {
  const r = s ? qt(l.min, l.max, s) : l.min;
  a.min = e.min - r, a.max = a.min + Ae(e);
}
function Sr(a, e, l, s) {
  zy(a.x, e.x, l.x, s?.x), zy(a.y, e.y, l.y, s?.y);
}
function Ly(a, e, l, s, r) {
  return a -= e, a = xr(a, 1 / l, s), r !== void 0 && (a = xr(a, 1 / r, s)), a;
}
function t6(a, e = 0, l = 1, s = 0.5, r, c = a, f = a) {
  if (wn.test(e) && (e = parseFloat(e), e = qt(f.min, f.max, e / 100) - f.min), typeof e != "number")
    return;
  let h = qt(c.min, c.max, s);
  a === c && (h -= e), a.min = Ly(a.min, e, l, h, r), a.max = Ly(a.max, e, l, h, r);
}
function By(a, e, [l, s, r], c, f) {
  t6(a, e[l], e[s], e[r], e.scale, c, f);
}
const e6 = ["x", "scaleX", "originX"], n6 = ["y", "scaleY", "originY"];
function Vy(a, e, l, s) {
  By(a.x, e, e6, l ? l.x : void 0, s ? s.x : void 0), By(a.y, e, n6, l ? l.y : void 0, s ? s.y : void 0);
}
function Uy(a) {
  return a.translate === 0 && a.scale === 1;
}
function C2(a) {
  return Uy(a.x) && Uy(a.y);
}
function ky(a, e) {
  return a.min === e.min && a.max === e.max;
}
function a6(a, e) {
  return ky(a.x, e.x) && ky(a.y, e.y);
}
function Hy(a, e) {
  return Math.round(a.min) === Math.round(e.min) && Math.round(a.max) === Math.round(e.max);
}
function E2(a, e) {
  return Hy(a.x, e.x) && Hy(a.y, e.y);
}
function qy(a) {
  return Ae(a.x) / Ae(a.y);
}
function $y(a, e) {
  return a.translate === e.translate && a.scale === e.scale && a.originPoint === e.originPoint;
}
function xn(a) {
  return [a("x"), a("y")];
}
function i6(a, e, l) {
  let s = "";
  const r = a.x.translate / e.x, c = a.y.translate / e.y, f = l?.z || 0;
  if ((r || c || f) && (s = `translate3d(${r}px, ${c}px, ${f}px) `), (e.x !== 1 || e.y !== 1) && (s += `scale(${1 / e.x}, ${1 / e.y}) `), l) {
    const { transformPerspective: m, rotate: g, pathRotation: v, rotateX: b, rotateY: T, skewX: S, skewY: w } = l;
    m && (s = `perspective(${m}px) ${s}`), g && (s += `rotate(${g}deg) `), v && (s += `rotate(${v}deg) `), b && (s += `rotateX(${b}deg) `), T && (s += `rotateY(${T}deg) `), S && (s += `skewX(${S}deg) `), w && (s += `skewY(${w}deg) `);
  }
  const h = a.x.scale * e.x, y = a.y.scale * e.y;
  return (h !== 1 || y !== 1) && (s += `scale(${h}, ${y})`), s || "none";
}
const l6 = Wd.length, Gy = (a) => typeof a == "string" ? parseFloat(a) : a, Yy = (a) => typeof a == "number" || ct.test(a);
function s6(a, e, l, s, r, c) {
  r ? (a.opacity = qt(0, l.opacity ?? 1, o6(s)), a.opacityExit = qt(e.opacity ?? 1, 0, r6(s))) : c && (a.opacity = qt(e.opacity ?? 1, l.opacity ?? 1, s));
  for (let f = 0; f < l6; f++) {
    const h = Wd[f];
    let y = Xy(e, h), m = Xy(l, h);
    if (y === void 0 && m === void 0)
      continue;
    y || (y = 0), m || (m = 0), y === 0 || m === 0 || Yy(y) === Yy(m) ? (a[h] = Math.max(qt(Gy(y), Gy(m), s), 0), (wn.test(m) || wn.test(y)) && (a[h] += "%")) : a[h] = m;
  }
  (e.rotate || l.rotate) && (a.rotate = qt(e.rotate || 0, l.rotate || 0, s));
}
function Xy(a, e) {
  return a[e] !== void 0 ? a[e] : a.borderRadius;
}
const o6 = /* @__PURE__ */ A2(0, 0.5, vv), r6 = /* @__PURE__ */ A2(0.5, 0.95, sn);
function A2(a, e, l) {
  return (s) => s < a ? 0 : s > e ? 1 : l(/* @__PURE__ */ cs(a, e, s));
}
function u6(a, e, l) {
  const s = xe(a) ? a : Ki(a);
  return s.start(Qd("", s, e, l)), s.animation;
}
function hs(a, e, l, s = { passive: !0 }) {
  return a.addEventListener(e, l, s), () => a.removeEventListener(e, l, s);
}
const c6 = (a, e) => a.depth - e.depth;
class f6 {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(e) {
    Od(this.children, e), this.isDirty = !0;
  }
  remove(e) {
    dr(this.children, e), this.isDirty = !0;
  }
  forEach(e) {
    this.isDirty && this.children.sort(c6), this.isDirty = !1, this.children.forEach(e);
  }
}
function d6(a, e) {
  const l = Ee.now(), s = ({ timestamp: r }) => {
    const c = r - l;
    c >= e && (xa(s), a(c - e));
  };
  return $t.setup(s, !0), () => xa(s);
}
function ur(a) {
  return xe(a) ? a.get() : a;
}
class h6 {
  constructor() {
    this.members = [];
  }
  add(e) {
    Od(this.members, e);
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
}, Sf = ["", "X", "Y", "Z"], m6 = 1e3;
let p6 = 0;
function wf(a, e, l, s) {
  const { latestValues: r } = e;
  r[a] && (l[a] = r[a], e.setStaticValue(a, 0), s && (s[a] = 0));
}
function j2(a) {
  if (a.hasCheckedOptimisedAppear = !0, a.root === a)
    return;
  const { visualElement: e } = a.options;
  if (!e)
    return;
  const l = Qv(e);
  if (window.MotionHasOptimisedAnimation(l, "transform")) {
    const { layout: r, layoutId: c } = a.options;
    window.MotionCancelOptimisedAnimation(l, "transform", $t, !(r || c));
  }
  const { parent: s } = a;
  s && !s.hasCheckedOptimisedAppear && j2(s);
}
function M2({ attachResizeListener: a, defaultParent: e, measureScroll: l, checkIsScrollRoot: s, resetTransform: r }) {
  return class {
    constructor(f = {}, h = e?.()) {
      this.id = p6++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(v6), this.nodes.forEach(C6), this.nodes.forEach(E6), this.nodes.forEach(b6);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = f, this.root = h ? h.root || h : this, this.path = h ? [...h.path, h] : [], this.parent = h, this.depth = h ? h.depth + 1 : 0;
      for (let y = 0; y < this.path.length; y++)
        this.path[y].shouldResetTransform = !0;
      this.root === this && (this.nodes = new f6());
    }
    addEventListener(f, h) {
      return this.eventHandlers.has(f) || this.eventHandlers.set(f, new Ld()), this.eventHandlers.get(f).add(h);
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
      this.isSVG = eh(f) && !v9(f), this.instance = f;
      const { layoutId: h, layout: y, visualElement: m } = this.options;
      if (m && !m.current && m.mount(f), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (y || h) && (this.isLayoutDirty = !0), a) {
        let g, v = 0;
        const b = () => this.root.updateBlockedByResize = !1;
        $t.read(() => {
          v = window.innerWidth;
        }), a(f, () => {
          const T = window.innerWidth;
          T !== v && (v = T, this.root.updateBlockedByResize = !0, g && g(), g = d6(b, 250), cr.hasAnimatedSinceResize && (cr.hasAnimatedSinceResize = !1, this.nodes.forEach(Zy)));
        });
      }
      h && this.root.registerSharedNode(h, this), this.options.animate !== !1 && m && (h || y) && this.addEventListener("didUpdate", ({ delta: g, hasLayoutChanged: v, hasRelativeLayoutChanged: b, layout: T }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const S = this.options.transition || m.getDefaultTransition() || D6, { onLayoutAnimationStart: w, onLayoutAnimationComplete: E } = m.getProps(), _ = !this.targetLayout || !E2(this.targetLayout, T), M = !v && b;
        if (this.options.layoutRoot || this.resumeFrom || M || v && (_ || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const j = {
            ...Zd(S, "layout"),
            onPlay: w,
            onComplete: E
          };
          (m.shouldReduceMotion || this.options.layoutRoot) && (j.delay = 0, j.type = !1), this.startAnimation(j), this.setAnimationOrigin(g, M, j.path);
        } else
          v || Zy(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
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
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(A6), this.animationId++);
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
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && j2(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
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
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), y && this.nodes.forEach(S6), this.nodes.forEach(Py);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Ky);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(w6), this.nodes.forEach(T6), this.nodes.forEach(y6), this.nodes.forEach(g6)) : this.nodes.forEach(Ky), this.clearAllSnapshots();
      const h = Ee.now();
      be.delta = Tn(0, 1e3 / 60, h - be.timestamp), be.timestamp = h, be.isProcessing = !0, hf.update.process(be), hf.preRender.process(be), hf.render.process(be), be.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Id.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(x6), this.sharedNodes.forEach(j6);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, $t.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      $t.postRender(() => {
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
        for (let y = 0; y < this.path.length; y++)
          this.path[y].updateScroll();
      const f = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = ce()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
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
      const f = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, h = this.projectionDelta && !C2(this.projectionDelta), y = this.getTransformTemplate(), m = y ? y(this.latestValues, "") : void 0, g = m !== this.prevTransformTemplateValue;
      f && this.instance && (h || Ya(this.latestValues) || g) && (r(this.instance, m), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(f = !0) {
      const h = this.measurePageBox();
      let y = this.removeElementScroll(h);
      return f && (y = this.removeTransform(y)), R6(y), {
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
        return ce();
      const h = f.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(N6))) {
        const { scroll: m } = this.root;
        m && (Sn(h.x, m.offset.x), Sn(h.y, m.offset.y));
      }
      return h;
    }
    removeElementScroll(f) {
      const h = ce();
      if (cn(h, f), this.scroll?.wasRoot)
        return h;
      for (let y = 0; y < this.path.length; y++) {
        const m = this.path[y], { scroll: g, options: v } = m;
        m !== this.root && g && v.layoutScroll && (g.wasRoot && cn(h, f), Sn(h.x, g.offset.x), Sn(h.y, g.offset.y));
      }
      return h;
    }
    applyTransform(f, h = !1, y) {
      const m = y || ce();
      cn(m, f);
      for (let g = 0; g < this.path.length; g++) {
        const v = this.path[g];
        !h && v.options.layoutScroll && v.scroll && v !== v.root && (Sn(m.x, -v.scroll.offset.x), Sn(m.y, -v.scroll.offset.y)), Ya(v.latestValues) && rr(m, v.latestValues, v.layout?.layoutBox);
      }
      return Ya(this.latestValues) && rr(m, this.latestValues, this.layout?.layoutBox), m;
    }
    removeTransform(f) {
      const h = ce();
      cn(h, f);
      for (let y = 0; y < this.path.length; y++) {
        const m = this.path[y];
        if (!Ya(m.latestValues))
          continue;
        let g;
        m.instance && (dd(m.latestValues) && m.updateSnapshot(), g = ce(), cn(g, m.measurePageBox())), Vy(h, m.latestValues, m.snapshot?.layoutBox, g);
      }
      return Ya(this.latestValues) && Vy(h, this.latestValues), h;
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
      const y = !!this.resumingFrom || this !== h;
      if (!(f || y && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: g, layoutId: v } = this.options;
      if (!this.layout || !(g || v))
        return;
      this.resolvedRelativeTargetAt = be.timestamp;
      const b = this.getClosestProjectingParent();
      b && this.linkedParentVersion !== b.layoutVersion && !b.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && b && b.layout ? this.createRelativeTarget(b, this.layout.layoutBox, b.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = ce(), this.targetWithTransforms = ce()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), I9(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : cn(this.target, this.layout.layoutBox), d2(this.target, this.targetDelta)) : cn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && b && !!b.resumingFrom == !!this.resumingFrom && !b.options.layoutScroll && b.target && this.animationProgress !== 1 ? this.createRelativeTarget(b, this.target, b.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || dd(this.parent.latestValues) || f2(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(f, h, y) {
      this.relativeParent = f, this.linkedParentVersion = f.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = ce(), this.relativeTargetOrigin = ce(), Sr(this.relativeTargetOrigin, h, y, this.options.layoutAnchor || void 0), cn(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const f = this.getLead(), h = !!this.resumingFrom || this !== f;
      let y = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (y = !1), h && (this.isSharedProjectionDirty || this.isTransformDirty) && (y = !1), this.resolvedRelativeTargetAt === be.timestamp && (y = !1), y)
        return;
      const { layout: m, layoutId: g } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(m || g))
        return;
      cn(this.layoutCorrected, this.layout.layoutBox);
      const v = this.treeScale.x, b = this.treeScale.y;
      M9(this.layoutCorrected, this.treeScale, this.path, h), f.layout && !f.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (f.target = f.layout.layoutBox, f.targetWithTransforms = ce());
      const { target: T } = f;
      if (!T) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Ry(this.prevProjectionDelta.x, this.projectionDelta.x), Ry(this.prevProjectionDelta.y, this.projectionDelta.y)), os(this.projectionDelta, this.layoutCorrected, T, this.latestValues), (this.treeScale.x !== v || this.treeScale.y !== b || !$y(this.projectionDelta.x, this.prevProjectionDelta.x) || !$y(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", T));
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
    setAnimationOrigin(f, h = !1, y) {
      const m = this.snapshot, g = m ? m.latestValues : {}, v = { ...this.latestValues }, b = Hi();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !h;
      const T = ce(), S = m ? m.source : void 0, w = this.layout ? this.layout.source : void 0, E = S !== w, _ = this.getStack(), M = !_ || _.members.length <= 1, j = !!(E && !M && this.options.crossfade === !0 && !this.path.some(_6));
      this.animationProgress = 0;
      let R;
      const B = y?.interpolateProjection(f);
      this.mixTargetDelta = (L) => {
        const D = L / 1e3, k = B?.(D);
        k ? (b.x.translate = k.x, b.x.scale = qt(f.x.scale, 1, D), b.x.origin = f.x.origin, b.x.originPoint = f.x.originPoint, b.y.translate = k.y, b.y.scale = qt(f.y.scale, 1, D), b.y.origin = f.y.origin, b.y.originPoint = f.y.originPoint) : (Qy(b.x, f.x, D), Qy(b.y, f.y, D)), this.setTargetDelta(b), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Sr(T, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), M6(this.relativeTarget, this.relativeTargetOrigin, T, D), R && a6(this.relativeTarget, R) && (this.isProjectionDirty = !1), R || (R = ce()), cn(R, this.relativeTarget)), E && (this.animationValues = v, s6(v, g, this.latestValues, D, j, M)), k && k.rotate !== void 0 && (this.animationValues || (this.animationValues = v), this.animationValues.pathRotation = k.rotate), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = D;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(f) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (xa(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = $t.update(() => {
        cr.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = Ki(0)), this.motionValue.jump(0, !1), this.currentAnimation = u6(this.motionValue, [0, 1e3], {
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
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(m6), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const f = this.getLead();
      let { targetWithTransforms: h, target: y, layout: m, latestValues: g } = f;
      if (!(!h || !y || !m)) {
        if (this !== f && this.layout && m && _2(this.options.animationType, this.layout.layoutBox, m.layoutBox)) {
          y = this.target || ce();
          const v = Ae(this.layout.layoutBox.x);
          y.x.min = f.target.x.min, y.x.max = y.x.min + v;
          const b = Ae(this.layout.layoutBox.y);
          y.y.min = f.target.y.min, y.y.max = y.y.min + b;
        }
        cn(h, y), rr(h, g), os(this.projectionDeltaWithTransform, this.layoutCorrected, h, g);
      }
    }
    registerSharedNode(f, h) {
      this.sharedNodes.has(f) || this.sharedNodes.set(f, new h6()), this.sharedNodes.get(f).add(h);
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
      y.z && wf("z", f, m, this.animationValues);
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
      const y = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, f.visibility = "", f.opacity = "", f.pointerEvents = ur(h?.pointerEvents) || "", f.transform = y ? y(this.latestValues, "") : "none";
        return;
      }
      const m = this.getLead();
      if (!this.projectionDelta || !this.layout || !m.target) {
        this.options.layoutId && (f.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, f.pointerEvents = ur(h?.pointerEvents) || ""), this.hasProjected && !Ya(this.latestValues) && (f.transform = y ? y({}, "") : "none", this.hasProjected = !1);
        return;
      }
      f.visibility = "";
      const g = m.animationValues || m.latestValues;
      this.applyTransformsToTarget();
      let v = i6(this.projectionDeltaWithTransform, this.treeScale, g);
      y && (v = y(g, v)), f.transform = v;
      const { x: b, y: T } = this.projectionDelta;
      f.transformOrigin = `${b.origin * 100}% ${T.origin * 100}% 0`, m.animationValues ? f.opacity = m === this ? g.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : g.opacityExit : f.opacity = m === this ? g.opacity !== void 0 ? g.opacity : "" : g.opacityExit !== void 0 ? g.opacityExit : 0;
      for (const S in md) {
        if (g[S] === void 0)
          continue;
        const { correct: w, applyTo: E, isCSSVariable: _ } = md[S], M = v === "none" ? g[S] : w(g[S], m);
        if (E) {
          const j = E.length;
          for (let R = 0; R < j; R++)
            f[E[R]] = M;
        } else
          _ ? this.options.visualElement.renderState.vars[S] = M : f[S] = M;
      }
      this.options.layoutId && (f.pointerEvents = m === this ? ur(h?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((f) => f.currentAnimation?.stop()), this.root.nodes.forEach(Py), this.root.sharedNodes.clear();
    }
  };
}
function y6(a) {
  a.updateLayout();
}
function g6(a) {
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
    } else _2(r, e.layoutBox, l) && xn((g) => {
      const v = c ? e.measuredBox[g] : e.layoutBox[g], b = Ae(l[g]);
      v.max = v.min + b, a.relativeTarget && !a.currentAnimation && (a.isProjectionDirty = !0, a.relativeTarget[g].max = a.relativeTarget[g].min + b);
    });
    const f = Hi();
    os(f, l, e.layoutBox);
    const h = Hi();
    c ? os(h, a.applyTransform(s, !0), e.measuredBox) : os(h, l, e.layoutBox);
    const y = !C2(f);
    let m = !1;
    if (!a.resumeFrom) {
      const g = a.getClosestProjectingParent();
      if (g && !g.resumeFrom) {
        const { snapshot: v, layout: b } = g;
        if (v && b) {
          const T = a.options.layoutAnchor || void 0, S = ce();
          Sr(S, e.layoutBox, v.layoutBox, T);
          const w = ce();
          Sr(w, l, b.layoutBox, T), E2(S, w) || (m = !0), g.options.layoutRoot && (a.relativeTarget = w, a.relativeTargetOrigin = S, a.relativeParent = g);
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
function v6(a) {
  a.parent && (a.isProjecting() || (a.isProjectionDirty = a.parent.isProjectionDirty), a.isSharedProjectionDirty || (a.isSharedProjectionDirty = !!(a.isProjectionDirty || a.parent.isProjectionDirty || a.parent.isSharedProjectionDirty)), a.isTransformDirty || (a.isTransformDirty = a.parent.isTransformDirty));
}
function b6(a) {
  a.isProjectionDirty = a.isSharedProjectionDirty = a.isTransformDirty = !1;
}
function x6(a) {
  a.clearSnapshot();
}
function Py(a) {
  a.clearMeasurements();
}
function S6(a) {
  a.isLayoutDirty = !0, a.updateLayout();
}
function Ky(a) {
  a.isLayoutDirty = !1;
}
function w6(a) {
  a.isAnimationBlocked && a.layout && !a.isLayoutDirty && (a.snapshot = a.layout, a.isLayoutDirty = !0);
}
function T6(a) {
  const { visualElement: e } = a.options;
  e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), a.resetTransform();
}
function Zy(a) {
  a.finishAnimation(), a.targetDelta = a.relativeTarget = a.target = void 0, a.isProjectionDirty = !0;
}
function C6(a) {
  a.resolveTargetDelta();
}
function E6(a) {
  a.calcProjection();
}
function A6(a) {
  a.resetSkewAndRotation();
}
function j6(a) {
  a.removeLeadSnapshot();
}
function Qy(a, e, l) {
  a.translate = qt(e.translate, 0, l), a.scale = qt(e.scale, 1, l), a.origin = e.origin, a.originPoint = e.originPoint;
}
function Fy(a, e, l, s) {
  a.min = qt(e.min, l.min, s), a.max = qt(e.max, l.max, s);
}
function M6(a, e, l, s) {
  Fy(a.x, e.x, l.x, s), Fy(a.y, e.y, l.y, s);
}
function _6(a) {
  return a.animationValues && a.animationValues.opacityExit !== void 0;
}
const D6 = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, Jy = (a) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(a), Wy = Jy("applewebkit/") && !Jy("chrome/") ? Math.round : sn;
function Iy(a) {
  a.min = Wy(a.min), a.max = Wy(a.max);
}
function R6(a) {
  Iy(a.x), Iy(a.y);
}
function _2(a, e, l) {
  return a === "position" || a === "preserve-aspect" && !W9(qy(e), qy(l), 0.2);
}
function N6(a) {
  return a !== a.root && a.scroll?.wasRoot;
}
const O6 = M2({
  attachResizeListener: (a, e) => hs(a, "resize", e),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), Tf = {
  current: void 0
}, D2 = M2({
  measureScroll: (a) => ({
    x: a.scrollLeft,
    y: a.scrollTop
  }),
  defaultParent: () => {
    if (!Tf.current) {
      const a = new O6({});
      a.mount(window), a.setOptions({ layoutScroll: !0 }), Tf.current = a;
    }
    return Tf.current;
  },
  resetTransform: (a, e) => {
    a.style.transform = e !== void 0 ? e : "none";
  },
  checkIsScrollRoot: (a) => window.getComputedStyle(a).position === "fixed"
});
function z6(a, e) {
  if (Rr(a)) {
    const { initial: l, animate: s } = a;
    return {
      initial: l === !1 || ds(l) ? l : void 0,
      animate: ds(s) ? s : void 0
    };
  }
  return a.inherit !== !1 ? e : {};
}
function L6(a) {
  const { initial: e, animate: l } = z6(a, A.useContext(Mr));
  return A.useMemo(() => ({ initial: e, animate: l }), [tg(e), tg(l)]);
}
function tg(a) {
  return Array.isArray(a) ? a.join(" ") : a;
}
const oh = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function R2(a, e, l) {
  for (const s in e)
    !xe(e[s]) && !p2(s, l) && (a[s] = e[s]);
}
function B6({ transformTemplate: a }, e) {
  return A.useMemo(() => {
    const l = oh();
    return lh(l, e, a), Object.assign({}, l.vars, l.style);
  }, [e]);
}
function V6(a, e) {
  const l = a.style || {}, s = {};
  return R2(s, l, a), Object.assign(s, B6(a, e)), s;
}
function U6(a, e) {
  const l = {}, s = V6(a, e);
  return a.drag && a.dragListener !== !1 && (l.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = a.drag === !0 ? "none" : `pan-${a.drag === "x" ? "y" : "x"}`), a.tabIndex === void 0 && (a.onTap || a.onTapStart || a.whileTap) && (l.tabIndex = 0), l.style = s, l;
}
const N2 = () => ({
  ...oh(),
  attrs: {}
});
function k6(a, e, l, s) {
  const r = A.useMemo(() => {
    const c = N2();
    return y2(c, e, v2(s), a.transformTemplate, a.style), {
      ...c.attrs,
      style: { ...c.style }
    };
  }, [e]);
  if (a.style) {
    const c = {};
    R2(c, a.style, a), r.style = { ...c, ...r.style };
  }
  return r;
}
const H6 = /* @__PURE__ */ new Set([
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
  return a.startsWith("while") || a.startsWith("drag") && a !== "draggable" || a.startsWith("layout") || a.startsWith("onTap") || a.startsWith("onPan") || a.startsWith("onLayout") || H6.has(a);
}
let O2 = (a) => !wr(a);
function q6(a) {
  typeof a == "function" && (O2 = (e) => e.startsWith("on") ? !wr(e) : a(e));
}
try {
  q6(require("@emotion/is-prop-valid").default);
} catch {
}
function $6(a, e, l) {
  const s = {};
  for (const r in a)
    r === "values" && typeof a.values == "object" || xe(a[r]) || (O2(r) || l === !0 && wr(r) || !e && !wr(r) || // If trying to use native HTML drag events, forward drag listeners
    a.draggable && r.startsWith("onDrag")) && (s[r] = a[r]);
  return s;
}
const G6 = [
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
function rh(a) {
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
      !!(G6.indexOf(a) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(a))
    )
  );
}
function Y6(a, e, l, { latestValues: s }, r, c = !1, f) {
  const y = (f ?? rh(a) ? k6 : U6)(e, s, r, a), m = $6(e, typeof a == "string", c), g = a !== A.Fragment ? { ...m, ...y, ref: l } : {}, { children: v } = e, b = A.useMemo(() => xe(v) ? v.get() : v, [v]);
  return A.createElement(a, {
    ...g,
    children: b
  });
}
const Nr = /* @__PURE__ */ A.createContext(null);
function uh(a) {
  const e = A.useRef(null);
  return e.current === null && (e.current = a()), e.current;
}
function X6({ scrapeMotionValuesFromProps: a, createRenderState: e }, l, s, r) {
  return {
    latestValues: P6(l, s, r, a),
    renderState: e()
  };
}
function P6(a, e, l, s) {
  const r = {}, c = s(a, {});
  for (const b in c)
    r[b] = ur(c[b]);
  let { initial: f, animate: h } = a;
  const y = Rr(a), m = s2(a);
  e && m && !y && a.inherit !== !1 && (f === void 0 && (f = e.initial), h === void 0 && (h = e.animate));
  let g = l ? l.initial === !1 : !1;
  g = g || f === !1;
  const v = g ? h : f;
  if (v && typeof v != "boolean" && !Dr(v)) {
    const b = Array.isArray(v) ? v : [v];
    for (let T = 0; T < b.length; T++) {
      const S = Fd(a, b[T]);
      if (S) {
        const { transitionEnd: w, transition: E, ..._ } = S;
        for (const M in _) {
          let j = _[M];
          if (Array.isArray(j)) {
            const R = g ? j.length - 1 : 0;
            j = j[R];
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
const z2 = (a) => (e, l) => {
  const s = A.useContext(Mr), r = A.useContext(Nr), c = () => X6(a, e, s, r);
  return l ? c() : uh(c);
}, K6 = /* @__PURE__ */ z2({
  scrapeMotionValuesFromProps: sh,
  createRenderState: oh
}), Z6 = /* @__PURE__ */ z2({
  scrapeMotionValuesFromProps: b2,
  createRenderState: N2
}), eg = {
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
let ng = !1;
function Q6() {
  if (ng)
    return;
  const a = {};
  for (const e in eg)
    a[e] = {
      isEnabled: (l) => eg[e].some((s) => !!l[s])
    };
  r2(a), ng = !0;
}
function L2() {
  return Q6(), C9();
}
function ag(a) {
  const e = L2();
  for (const l in a)
    e[l] = {
      ...e[l],
      ...a[l]
    };
  r2(e);
}
const F6 = Symbol.for("motionComponentSymbol");
function J6(a, e, l) {
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
const B2 = A.createContext({});
function Vi(a) {
  return a && typeof a == "object" && Object.prototype.hasOwnProperty.call(a, "current");
}
const W6 = typeof window < "u", ch = W6 ? A.useLayoutEffect : A.useEffect;
function I6(a, e, l, s, r, c) {
  const { visualElement: f } = A.useContext(Mr), h = A.useContext(kd), y = A.useContext(Nr), m = A.useContext(Hd), g = m.reducedMotion, v = m.skipAnimations, b = A.useRef(null), T = A.useRef(!1);
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
  const S = b.current, w = A.useContext(B2);
  S && !S.projection && r && (S.type === "html" || S.type === "svg") && tw(b.current, l, r, w);
  const E = A.useRef(!1);
  A.useInsertionEffect(() => {
    S && E.current && S.update(l, y);
  });
  const _ = l[Zv], M = A.useRef(!!_ && typeof window < "u" && !window.MotionHandoffIsComplete?.(_) && window.MotionHasOptimisedAnimation?.(_));
  return ch(() => {
    T.current = !0, S && (E.current = !0, window.MotionIsMounted = !0, S.updateFeatures(), S.scheduleRenderMicrotask(), M.current && S.animationState && S.animationState.animateChanges());
  }), A.useEffect(() => {
    S && (!M.current && S.animationState && S.animationState.animateChanges(), M.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(_);
    }), M.current = !1), S.enteringChildren = void 0);
  }), S;
}
function tw(a, e, l, s) {
  const { layoutId: r, layout: c, drag: f, dragConstraints: h, layoutScroll: y, layoutRoot: m, layoutAnchor: g, layoutCrossfade: v } = e;
  a.projection = new l(a.latestValues, e["data-framer-portal-id"] ? void 0 : V2(a.parent)), a.projection.setOptions({
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
    layoutScroll: y,
    layoutRoot: m,
    layoutAnchor: g
  });
}
function V2(a) {
  if (a)
    return a.options.allowProjection !== !1 ? a.projection : V2(a.parent);
}
function ew(a, { forwardMotionProps: e = !1, type: l } = {}, s, r) {
  const c = l ? l === "svg" : rh(a), f = c ? Z6 : K6;
  function h(m, g) {
    let v;
    const b = {
      ...A.useContext(Hd),
      ...m,
      layoutId: nw(m)
    }, { isStatic: T } = b, S = L6(m), w = f(m, T);
    if (!T && typeof window < "u") {
      aw();
      const E = iw(b);
      v = E.MeasureLayout, S.visualElement = I6(a, w, b, r, E.ProjectionNode, c);
    }
    return p.jsxs(Mr.Provider, { value: S, children: [v && S.visualElement ? p.jsx(v, { visualElement: S.visualElement, ...b }) : null, Y6(a, m, J6(w, S.visualElement, g), w, T, e, c)] });
  }
  h.displayName = `motion.${typeof a == "string" ? a : `create(${a.displayName ?? a.name ?? ""})`}`;
  const y = A.forwardRef(h);
  return y[F6] = a, y;
}
function nw({ layoutId: a }) {
  const e = A.useContext(Ud).id;
  return e && a !== void 0 ? e + "-" + a : a;
}
function aw(a, e) {
  A.useContext(kd).strict;
}
function iw(a) {
  const e = L2(), { drag: l, layout: s } = e;
  if (!l && !s)
    return {};
  const r = { ...l, ...s };
  return {
    MeasureLayout: l?.isEnabled(a) || s?.isEnabled(a) ? r.MeasureLayout : void 0,
    ProjectionNode: r.ProjectionNode
  };
}
function fh(a, e) {
  return ew(a, e);
}
const lw = /* @__PURE__ */ fh("button"), Zi = /* @__PURE__ */ fh("div"), sw = /* @__PURE__ */ fh("span");
var ow = {
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
function rw({
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
    const v = ow[m], b = Math.min(
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
function ns(a) {
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
var uw = ({
  cornerRadius: a,
  roundingAndSmoothingBudget: e
}) => {
  const l = Math.min(a, e);
  return l <= 0 ? ms : {
    p: l,
    pathSegment: (s) => {
      const r = dn(l, l, s), c = hn(l, l, s);
      return Pe`a ${l} ${l} 0 0 1 ${r} ${c}`;
    }
  };
};
function dh({
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
  const c = 90 * (1 - e), f = Math.sin(ns(c / 2)) * a * Math.sqrt(2), h = (90 - c) / 2, y = a * Math.tan(ns(h / 2)), m = 45 * e, g = y * Math.cos(ns(m)), v = g * Math.tan(ns(m));
  let b = (r - f - g - v) / 3, T = 2 * b;
  if (l && r > s) {
    const S = s - v - f - g, w = S / 6, E = S - w;
    b = Math.min(b, E), T = S - b, r = Math.min(r, s);
  }
  return { a: T, b, c: g, d: v, p: r, arcSectionLength: f, cornerRadius: a };
}
var cw = ({
  cornerRadius: a,
  smoothing: e,
  preserveSmoothing: l,
  roundingAndSmoothingBudget: s
}) => {
  const r = dh({
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
          return fw(r);
        case "BR":
          return dw(r);
        case "BL":
          return hw(r);
        case "TL":
          return mw(r);
      }
    }
  };
};
function fw({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Pe`c ${e} 0 ${e + l} 0 ${e + l + s} ${r} a ${a} ${a} 0 0 1 ${c} ${c} c ${r} ${s} ${r} ${l + s} ${r} ${e + l + s}`;
}
function dw({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Pe`c 0 ${e} 0 ${e + l} ${-r} ${e + l + s} a ${a} ${a} 0 0 1 -${c} ${c} c ${-s} ${r} ${-(l + s)} ${r} ${-(e + l + s)} ${r}`;
}
function hw({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Pe`c ${-e} 0 ${-(e + l)} 0 ${-(e + l + s)} ${-r} a ${a} ${a} 0 0 1 -${c} -${c} c ${-r} ${-s} ${-r} ${-(l + s)} ${-r} ${-(e + l + s)}`;
}
function mw({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Pe`c 0 ${-e} 0 ${-(e + l)} ${r} ${-(e + l + s)} a ${a} ${a} 0 0 1 ${c} -${c} c ${s} ${-r} ${l + s} ${-r} ${e + l + s} ${-r}`;
}
var pw = ({
  cornerRadius: a,
  exponent: e,
  roundingAndSmoothingBudget: l
}) => {
  const s = Math.min(a, l);
  if (s <= 0) return ms;
  const r = Number.isFinite(e) ? Math.max(2, e) : 4, c = 2 / r, f = r === 2 ? (b) => b : r === 4 ? Math.sqrt : r === 8 ? (b) => Math.sqrt(Math.sqrt(b)) : (b) => Math.pow(b, c), h = c - 1, y = r === 2 ? () => 1 : r === 4 ? (b) => 1 / Math.sqrt(b) : (b) => Math.pow(b, h), m = [0, Math.PI / 6, Math.PI / 3, Math.PI / 2], g = m.map((b, T) => {
    if (T === 0) return [0, 0];
    if (T === m.length - 1) return [s, s];
    const S = Math.sin(b), w = Math.cos(b);
    return [s * f(S), s * (1 - f(w))];
  }), v = m.map((b, T) => {
    if (T === 0) return [1, 0];
    if (T === m.length - 1) return [0, 1];
    const S = Math.sin(b), w = Math.cos(b), E = c * y(S) * w * s, _ = c * y(w) * S * s, M = Math.hypot(E, _) || 1;
    return [E / M, _ / M];
  });
  return {
    p: s,
    pathSegment: (b) => {
      const T = [];
      for (let S = 0; S < m.length - 1; S++) {
        const [w, E] = g[S], [_, M] = g[S + 1], [j, R] = v[S], [B, L] = v[S + 1], D = (m[S] + m[S + 1]) / 2, k = Math.sin(D), P = Math.cos(D), H = s * f(k), I = s * (1 - f(P)), K = 8 / 3 * (H - (w + _) / 2), Q = 8 / 3 * (I - (E + M) / 2), at = B * R - L * j, ot = at !== 0 ? (-L * K + B * Q) / at : 0, V = at !== 0 ? (j * Q - R * K) / at : 0, J = w + ot * j, et = E + ot * R, nt = _ - V * B, ut = M - V * L, N = J - w, Y = et - E, tt = nt - w, lt = ut - E, dt = _ - w, ht = M - E, gt = dn(N, Y, b), Rt = hn(N, Y, b), it = dn(tt, lt, b), Tt = hn(tt, lt, b), Gt = dn(dt, ht, b), je = hn(dt, ht, b);
        T.push(Pe`c ${gt} ${Rt} ${it} ${Tt} ${Gt} ${je}`);
      }
      return T.join(" ");
    }
  };
};
function ig(a, e, l, s) {
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
var yw = 1e-6, gw = ({
  cornerRadius: a,
  smoothing: e,
  roundingAndSmoothingBudget: l
}) => {
  if (a <= 0) return ms;
  const s = Math.max(0, Math.min(1, e)), r = a, c = Math.PI / 4 * s, f = Math.PI / 2 * r * s, h = f > 0 ? 1 / (r * f) : 0, { x: y, y: m } = f > 0 ? ig(0, 0, h, f) : { x: 0, y: 0 }, { x: g, y: v } = f > 0 ? ig(0, 0, h, f / 2) : { x: 0, y: 0 }, b = y - r * Math.sin(c), T = m + r * Math.cos(c), S = b + T;
  let w = S, E = r, _ = y, M = m, j = g, R = v;
  if (S > l && S > 0) {
    const P = l / S;
    w = l, E = r * P, _ = y * P, M = m * P, j = g * P, R = v * P;
  }
  if (w <= 0)
    return ms;
  let B = 0, L = 0;
  if (f > 0) {
    const P = Math.cos(c), H = Math.sin(c);
    H > 1e-12 && (L = 8 / 3 * (M / 2 - R) / H), B = 8 / 3 * (j - _ / 2) + L * P;
  }
  const D = Math.PI / 2 - 2 * c, k = Math.abs(D) > yw;
  return {
    p: w,
    pathSegment: (P) => {
      const H = [];
      if (f > 0) {
        const I = B, K = 0, Q = _ - L * Math.cos(c), at = M - L * Math.sin(c), ot = _, V = M, J = dn(I, K, P), et = hn(I, K, P), nt = dn(Q, at, P), ut = hn(Q, at, P), N = dn(ot, V, P), Y = hn(ot, V, P);
        H.push(Pe`c ${J} ${et} ${nt} ${ut} ${N} ${Y}`);
      }
      if (k) {
        const I = w - _ - M, K = w - _ - M, Q = dn(I, K, P), at = hn(I, K, P);
        H.push(Pe`a ${E} ${E} 0 0 1 ${Q} ${at}`);
      }
      if (f > 0) {
        const I = L * Math.sin(c), K = L * Math.cos(c), Q = M, at = _ - B, ot = M, V = _, J = dn(I, K, P), et = hn(I, K, P), nt = dn(Q, at, P), ut = hn(Q, at, P), N = dn(ot, V, P), Y = hn(ot, V, P);
        H.push(Pe`c ${J} ${et} ${nt} ${ut} ${N} ${Y}`);
      }
      return H.join(" ");
    }
  };
}, vw = 4, bw = {
  arc: uw,
  squircle: cw,
  superellipse: pw,
  clothoid: gw
};
function xw(a) {
  return bw[a];
}
var Sw = 64, $a = /* @__PURE__ */ new Map();
function ww(a, e) {
  return a + "|" + e.cornerRadius + "|" + e.smoothing + "|" + e.exponent + "|" + (e.preserveSmoothing ? 1 : 0) + "|" + e.roundingAndSmoothingBudget;
}
function Tw(a) {
  return !Number.isFinite(a.cornerRadius) || !Number.isFinite(a.smoothing) || !Number.isFinite(a.exponent) || !Number.isFinite(a.roundingAndSmoothingBudget);
}
function Cw(a) {
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
function Ew(a, e, l) {
  if (Tw(l)) return e(l);
  const s = ww(a, l), r = $a.get(s);
  if (r)
    return $a.delete(s), $a.set(s, r), r;
  const c = Cw(e(l));
  if ($a.size >= Sw) {
    const f = $a.keys().next().value;
    f !== void 0 && $a.delete(f);
  }
  return $a.set(s, c), c;
}
function $o(a, e, l, s) {
  const r = Math.min(e, s / a - 1), c = dh({
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
function Aw({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Pe`c ${a} 0 ${a + e} 0 ${r} ${s} a ${h} ${h} 0 0 1 ${c} ${f} a ${h} ${h} 0 0 1 ${-c} ${f} c ${-l} ${s} ${-(e + l)} ${s} ${-r} ${s}`;
}
function jw({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Pe`c ${-a} 0 ${-(a + e)} 0 ${-r} ${-s} a ${h} ${h} 0 0 1 ${-c} ${-f} a ${h} ${h} 0 0 1 ${c} ${-f} c ${l} ${-s} ${e + l} ${-s} ${r} ${-s}`;
}
function Mw({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Pe`c 0 ${-a} 0 ${-(a + e)} ${s} ${-r} a ${h} ${h} 0 0 1 ${f} ${-c} a ${h} ${h} 0 0 1 ${f} ${c} c ${s} ${l} ${s} ${e + l} ${s} ${r}`;
}
function _w({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Pe`c 0 ${a} 0 ${a + e} ${-s} ${r} a ${h} ${h} 0 0 1 ${-f} ${c} a ${h} ${h} 0 0 1 ${-f} ${-c} c ${-s} ${-l} ${-s} ${-(e + l)} ${-s} ${-r}`;
}
function lg(a, e, l, s) {
  const r = dh({
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
var sg = (a, e, l) => Math.max(0, Math.min(a / e - 1, l)), ue = (a) => (Object.is(a, -0) ? 0 : a).toFixed(4);
function Dw(a, e, l, s, r) {
  const c = lg(l, sg(a / 2, l, s), r, a / 2), f = lg(l, sg(e / 2, l, s), r, e / 2), h = (b, T, S, w, E, _) => {
    const M = w === 0 ? c : f, j = _ === 0 ? c : f, R = b + (S + E) * l, B = T + (w + _) * l, L = R - E * l * M.cos - S * l * M.sin, D = B - _ * l * M.cos - w * l * M.sin, k = R - S * l * j.cos - E * l * j.sin, P = B - w * l * j.cos - _ * l * j.sin, H = b + S * M.p, I = T + w * M.p, K = Math.hypot(k - L, P - D) > 1e-6, Q = K ? k : L, at = K ? P : D, ot = b + E * j.p, V = T + _ * j.p;
    let J = `L ${ue(H)} ${ue(I)} `;
    return J += `c ${ue(-S * M.a)} ${ue(-w * M.a)} ${ue(-S * (M.a + M.b))} ${ue(-w * (M.a + M.b))} ${ue(L - H)} ${ue(D - I)} `, K && (J += `a ${ue(l)} ${ue(l)} 0 0 1 ${ue(k - L)} ${ue(P - D)} `), J += `c ${ue(ot - E * (j.a + j.b) - Q)} ${ue(V - _ * (j.a + j.b) - at)} ${ue(ot - E * j.a - Q)} ${ue(V - _ * j.a - at)} ${ue(ot - Q)} ${ue(V - at)}`, J;
  }, y = h(a, 0, -1, 0, 0, 1), m = h(a, e, 0, -1, -1, 0), g = h(0, e, 1, 0, 0, -1), v = h(0, 0, 0, 1, 1, 0);
  return `M ${ue(c.p)} 0 ${y} ${m} ${g} ${v} Z`;
}
var Rw = 0.6, Nw = !0, Ow = "squircle";
function U2(a) {
  return {
    radius: a.radius,
    curve: a.curve ?? Ow,
    smoothing: a.smoothing ?? Rw,
    exponent: a.exponent ?? vw,
    preserveSmoothing: a.preserveSmoothing ?? Nw
  };
}
function Go(a) {
  return U2(typeof a == "number" ? { radius: a } : a ?? { radius: 0 });
}
function zw(a) {
  if ("radius" in a) {
    const e = U2(a);
    return { topLeft: e, topRight: e, bottomRight: e, bottomLeft: e };
  }
  return {
    topLeft: Go(a.topLeft),
    topRight: Go(a.topRight),
    bottomRight: Go(a.bottomRight),
    bottomLeft: Go(a.bottomLeft)
  };
}
function k2(a, e, l) {
  if (a <= 0 || e <= 0)
    return "M 0 0 H 0 V 0 H 0 Z";
  const s = zw(l);
  if (s.topLeft.radius <= 0 && s.topRight.radius <= 0 && s.bottomRight.radius <= 0 && s.bottomLeft.radius <= 0)
    return `M 0 0 H ${a} V ${e} H 0 Z`;
  const r = rw({
    topLeftCornerRadius: s.topLeft.radius,
    topRightCornerRadius: s.topRight.radius,
    bottomRightCornerRadius: s.bottomRight.radius,
    bottomLeftCornerRadius: s.bottomLeft.radius,
    width: a,
    height: e
  }), c = (M) => {
    const j = s[M], R = xw(j.curve);
    return Ew(j.curve, R, {
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
  if (Lw(s)) {
    const M = Math.min(T.radius, a / 2, e / 2), j = Math.min(a, e) / 2, R = 1e-9;
    if (M > 0 && j > M + R && j < (1 + T.smoothing) * M - R)
      return Dw(a, e, M, T.smoothing, T.preserveSmoothing);
  }
  const S = 1e-9, w = a >= e, E = w ? e / 2 : a / 2, _ = (M, j) => {
    const R = s[M], B = s[j];
    return R.curve === "squircle" && B.curve === "squircle" && Math.abs(r[M].radius - E) < S && Math.abs(r[j].radius - E) < S && R.smoothing === B.smoothing && R.preserveSmoothing === B.preserveSmoothing;
  };
  if (w) {
    const M = _("topRight", "bottomRight"), j = _("topLeft", "bottomLeft");
    if (M || j) {
      const R = a / 2, B = M ? $o(E, s.topRight.smoothing, s.topRight.preserveSmoothing, R) : null, L = j ? $o(E, s.topLeft.smoothing, s.topLeft.preserveSmoothing, R) : null;
      let D = "M " + v(L ? L.p : h().p) + " 0";
      return D += " L " + v(a - (B ? B.p : y().p)) + " 0", B ? D += " " + Aw(B) : (D += b(y().pathSegment("TR")), D += " L " + v(a) + " " + v(m().p), D += " L " + v(a) + " " + v(e - m().p), D += b(m().pathSegment("BR"))), L ? (D += " L " + v(L.p) + " " + v(e), D += " " + jw(L)) : (D += " L " + v(a - g().p) + " " + v(e), D += " L " + v(g().p) + " " + v(e), D += b(g().pathSegment("BL")), D += " L 0 " + v(e - h().p), D += " L 0 " + v(h().p), D += b(h().pathSegment("TL"))), D + " Z";
    }
  } else {
    const M = _("topLeft", "topRight"), j = _("bottomLeft", "bottomRight");
    if (M || j) {
      const R = e / 2, B = M ? $o(E, s.topLeft.smoothing, s.topLeft.preserveSmoothing, R) : null, L = j ? $o(E, s.bottomLeft.smoothing, s.bottomLeft.preserveSmoothing, R) : null;
      let D;
      return B ? D = "M 0 " + v(B.p) + " " + Mw(B) : (D = "M " + v(h().p) + " 0", D += " L " + v(a - y().p) + " 0", D += b(y().pathSegment("TR"))), D += " L " + v(a) + " " + v(e - (L ? L.p : m().p)), L ? D += " " + _w(L) : (D += b(m().pathSegment("BR")), D += " L " + v(g().p) + " " + v(e), D += b(g().pathSegment("BL"))), B ? D += " L 0 " + v(B.p) : (D += " L 0 " + v(e - h().p), D += " L 0 " + v(h().p), D += b(h().pathSegment("TL"))), D + " Z";
    }
  }
  return "M " + v(h().p) + " 0 L " + v(a - y().p) + " 0" + b(y().pathSegment("TR")) + " L " + v(a) + " " + v(m().p) + " L " + v(a) + " " + v(e - m().p) + b(m().pathSegment("BR")) + " L " + v(a - g().p) + " " + v(e) + " L " + v(g().p) + " " + v(e) + b(g().pathSegment("BL")) + " L 0 " + v(e - h().p) + " L 0 " + v(h().p) + b(h().pathSegment("TL")) + " Z";
}
function Lw(a) {
  const e = a.topLeft;
  return e.curve === "squircle" && [a.topRight, a.bottomRight, a.bottomLeft].every(
    (l) => l.curve === "squircle" && l.radius === e.radius && l.smoothing === e.smoothing && l.preserveSmoothing === e.preserveSmoothing
  );
}
function Bw(a, e, l) {
  return `path("${k2(a, e, l)}")`;
}
var kt = "http://www.w3.org/2000/svg", Vw = 0;
function hh() {
  return ++Vw;
}
function H2(a) {
  const e = a.replace("#", "");
  return e.length === 3 ? "#" + e[0] + e[0] + e[1] + e[1] + e[2] + e[2] : "#" + e;
}
function q2(a) {
  const e = H2(a).replace("#", "");
  return `rgb(${parseInt(e.substring(0, 2), 16)},${parseInt(e.substring(2, 4), 16)},${parseInt(e.substring(4, 6), 16)})`;
}
var Uw = {
  offsetX: 0,
  offsetY: 0,
  blur: 0,
  spread: 0,
  color: "#000",
  opacity: 0
};
function $2(a) {
  const e = /* @__PURE__ */ new Map(), l = JSON.stringify(a);
  return (s, r, c, f) => {
    const h = `${s}:${r}:${f}:${l}`;
    let y = e.get(h);
    return y === void 0 && (y = k2(s, r, c), e.set(h, y)), y;
  };
}
function G2(a, e) {
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
  const e = H2(a).replace("#", ""), l = parseInt(e.substring(0, 2), 16), s = parseInt(e.substring(2, 4), 16), r = parseInt(e.substring(4, 6), 16);
  if (l === 0 && s === 0 && r === 0) return "#4c4c4c";
  const c = Math.round(l * 2 / 3), f = Math.round(s * 2 / 3), h = Math.round(r * 2 / 3);
  return "#" + (1 << 24 | c << 16 | f << 8 | h).toString(16).slice(1);
}
function gd(a) {
  return typeof a == "object" && a !== null && "type" in a;
}
function kw(a) {
  const e = (90 - a) * Math.PI / 180;
  return {
    x1: 0.5 - 0.5 * Math.cos(e),
    y1: 0.5 + 0.5 * Math.sin(e),
    x2: 0.5 + 0.5 * Math.cos(e),
    y2: 0.5 - 0.5 * Math.sin(e)
  };
}
function Y2(a, e) {
  for (; a.lastChild; ) a.removeChild(a.lastChild);
  for (const l of e) {
    const s = document.createElementNS(kt, "stop");
    s.setAttribute("offset", String(l.offset)), s.setAttribute("stop-color", l.color), l.opacity !== void 0 && l.opacity !== 1 && s.setAttribute("stop-opacity", String(l.opacity)), a.appendChild(s);
  }
}
function Hw(a, e, l) {
  const s = e.type === "linear" ? "linearGradient" : "radialGradient", r = document.createElementNS(kt, s);
  return r.setAttribute("id", l), X2(r, e), Y2(r, e.stops), a.appendChild(r), r;
}
function qw(a, e) {
  X2(a, e), Y2(a, e.stops);
}
function X2(a, e) {
  if (e.type === "linear") {
    const l = kw(e.angle ?? 0);
    a.setAttribute("x1", String(l.x1)), a.setAttribute("y1", String(l.y1)), a.setAttribute("x2", String(l.x2)), a.setAttribute("y2", String(l.y2));
  } else
    a.setAttribute("cx", String(e.cx ?? 0.5)), a.setAttribute("cy", String(e.cy ?? 0.5)), a.setAttribute("r", String(e.r ?? 0.5));
}
function og(a) {
  return { ...a, stops: a.stops.map((e) => ({ ...e, color: yd(e.color) })) };
}
function vd(a, e, l, s) {
  a.setAttribute("x", String(-e)), a.setAttribute("y", String(-e)), a.setAttribute("width", String(l + e * 2)), a.setAttribute("height", String(s + e * 2));
}
function Yo(a, e, l, s, r) {
  vd(a, l, s, r), vd(e, l, s, r);
}
function Cf(a, e, l) {
  const s = document.createElementNS(kt, "mask");
  s.setAttribute("id", a), l && s.setAttribute("maskUnits", "userSpaceOnUse");
  const r = document.createElementNS(kt, "rect");
  r.setAttribute("fill", "white");
  const c = document.createElementNS(kt, "path");
  return c.setAttribute("fill", "none"), c.setAttribute("stroke", "black"), s.appendChild(r), s.appendChild(c), e.appendChild(s), { mask: s, rect: r, knockout: c };
}
function Ef(a) {
  const e = document.createElementNS(kt, "g"), l = document.createElementNS(kt, "path");
  l.setAttribute("fill", "none"), a && l.setAttribute(a.attr, a.value), l.style.display = "none", e.appendChild(l);
  const s = document.createElementNS(kt, "path");
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
  return e[s] ? qw(e[s], a) : e[s] = Hw(e.defs, a, r), `url(#${r})`;
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
      const h = gd(a.color) ? og(a.color) : yd(a.color);
      r.strokePath.setAttribute("stroke", Xo(h, r, "main")), r.grooveOverlay.style.display = "", r.grooveOverlay.setAttribute("d", e), r.grooveOverlay.setAttribute("stroke", Xo(a.color, r, "overlay")), r.grooveOverlay.setAttribute("stroke-width", String(a.width * c / 2)), r.grooveOverlay.setAttribute("stroke-opacity", String(a.opacity));
      break;
    }
    case "ridge": {
      const h = gd(a.color) ? og(a.color) : yd(a.color);
      r.grooveOverlay.style.display = "", r.grooveOverlay.setAttribute("d", e), r.grooveOverlay.setAttribute("stroke", Xo(h, r, "overlay")), r.grooveOverlay.setAttribute("stroke-width", String(a.width * c / 2)), r.grooveOverlay.setAttribute("stroke-opacity", String(a.opacity));
      break;
    }
  }
}
function $w(a, e) {
  const l = hh(), s = `sc-ishadow-mask-${l}`, r = document.createElementNS(kt, "mask");
  r.setAttribute("id", s), r.setAttribute("maskUnits", "userSpaceOnUse");
  const c = document.createElementNS(kt, "rect");
  c.setAttribute("fill", "white");
  const f = document.createElementNS(kt, "path");
  f.setAttribute("fill", "black"), r.appendChild(c), r.appendChild(f), a.appendChild(r);
  const h = `sc-ishadow-blur-${l}`, y = document.createElementNS(kt, "filter");
  y.setAttribute("id", h), y.setAttribute("x", "-200%"), y.setAttribute("y", "-200%"), y.setAttribute("width", "500%"), y.setAttribute("height", "500%"), y.setAttribute("color-interpolation-filters", "sRGB");
  const m = document.createElementNS(kt, "feGaussianBlur");
  m.setAttribute("stdDeviation", "0"), y.appendChild(m), a.appendChild(y);
  const g = document.createElementNS(kt, "g"), v = document.createElementNS(kt, "rect");
  return v.setAttribute("mask", `url(#${s})`), v.style.display = "none", g.appendChild(v), e.appendChild(g), { maskId: s, mask: r, maskRect: c, maskCutout: f, filterId: h, filter: y, feBlur: m, blurGroup: g, rect: v };
}
function Gw(a) {
  a.mask.remove(), a.filter.remove(), a.blurGroup.remove();
}
function Yw(a) {
  const e = hh(), l = `sc-clip-${e}`, s = `sc-mask-${e}`, r = document.createElementNS(kt, "svg");
  r.style.position = "absolute", r.style.inset = "0", r.style.pointerEvents = "none", r.style.overflow = "visible", r.style.zIndex = "1", r.setAttribute("aria-hidden", "true");
  const c = document.createElementNS(kt, "defs"), f = document.createElementNS(kt, "clipPath");
  f.setAttribute("id", l);
  const h = document.createElementNS(kt, "path");
  f.appendChild(h), c.appendChild(f);
  const y = document.createElementNS(kt, "mask");
  y.setAttribute("id", s), y.setAttribute("maskUnits", "userSpaceOnUse");
  const m = document.createElementNS(kt, "rect");
  m.setAttribute("fill", "white");
  const g = document.createElementNS(kt, "path");
  g.setAttribute("fill", "black"), y.appendChild(m), y.appendChild(g), c.appendChild(y);
  const v = `sc-dbl-inner-${e}`, { rect: b, knockout: T } = Cf(v, c, !1), S = `sc-dbl-outer-${e}`, { mask: w, rect: E, knockout: _ } = Cf(S, c, !0), M = `sc-dbl-middle-${e}`, { mask: j, rect: R, knockout: B } = Cf(M, c, !0);
  r.appendChild(c);
  const L = document.createElementNS(kt, "g");
  L.setAttribute("clip-path", `url(#${l})`), r.appendChild(L);
  const D = [], { group: k, strokePath: P, grooveOverlay: H } = Ef({ attr: "clip-path", value: `url(#${l})` });
  r.appendChild(k);
  const { group: I, strokePath: K, grooveOverlay: Q } = Ef({ attr: "mask", value: `url(#${s})` });
  r.appendChild(I);
  const { group: at, strokePath: ot, grooveOverlay: V } = Ef();
  r.appendChild(at), a.appendChild(r);
  const J = {
    strokePath: P,
    grooveOverlay: H,
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
  }, et = {
    strokePath: K,
    grooveOverlay: Q,
    strokeGroup: I,
    dblMaskId: S,
    dblKnockout: _,
    dblRect: E,
    strokeMultiplier: 2,
    defs: c,
    gradientEl: null,
    gradientId: `sc-grad-outer-${e}`,
    overlayGradientEl: null,
    overlayGradientId: `sc-grad-outer-ov-${e}`,
    padDblMask: (ut, N, Y) => Yo(w, E, ut, N, Y)
  }, nt = {
    strokePath: ot,
    grooveOverlay: V,
    strokeGroup: at,
    dblMaskId: M,
    dblKnockout: B,
    dblRect: R,
    strokeMultiplier: 1,
    defs: c,
    gradientEl: null,
    gradientId: `sc-grad-middle-${e}`,
    overlayGradientEl: null,
    overlayGradientId: `sc-grad-middle-ov-${e}`,
    padDblMask: (ut, N, Y) => Yo(j, R, ut, N, Y)
  };
  return {
    update(ut, N, Y, tt) {
      if (Y <= 0 || tt <= 0) return;
      r.setAttribute("width", String(Y)), r.setAttribute("height", String(tt)), r.setAttribute("viewBox", `0 0 ${Y} ${tt}`);
      const lt = $2(ut), dt = lt(Y, tt, ut, 0);
      h.setAttribute("d", dt), g.setAttribute("d", dt), m.setAttribute("width", String(Y)), m.setAttribute("height", String(tt)), Af(N.innerBorder, dt, Y, tt, J);
      const ht = N.outerBorder;
      ht && ht.width > 0 && ht.opacity > 0 && Yo(y, m, ht.width, Y, tt), Af(ht, dt, Y, tt, et), Af(N.middleBorder, dt, Y, tt, nt);
      const gt = N.innerShadow, Rt = gt == null ? [] : Array.isArray(gt) ? gt : [gt];
      for (; D.length < Rt.length; )
        D.push($w(c, L));
      for (; D.length > Rt.length; )
        Gw(D.pop());
      for (let it = 0; it < Rt.length; it++) {
        const Tt = Rt[it], Gt = D[it];
        if (Tt.opacity <= 0) {
          Gt.rect.style.display = "none";
          continue;
        }
        Gt.rect.style.display = "";
        const je = Tt.spread, el = Math.max(Tt.blur * 3, 20) + Math.max(Math.abs(Tt.offsetX), Math.abs(Tt.offsetY)) + Math.abs(je);
        Yo(Gt.mask, Gt.maskRect, el, Y, tt);
        const En = Math.max(1, Y - je * 2), nl = Math.max(1, tt - je * 2), al = je !== 0 ? G2(ut, -je) : ut;
        Gt.maskCutout.setAttribute("d", lt(En, nl, al, -je)), Gt.maskCutout.setAttribute(
          "transform",
          `translate(${Tt.offsetX + je},${Tt.offsetY + je})`
        ), Tt.blur > 0 ? (Gt.feBlur.setAttribute("stdDeviation", String(Tt.blur)), Gt.blurGroup.setAttribute("filter", `url(#${Gt.filterId})`)) : Gt.blurGroup.removeAttribute("filter"), vd(Gt.rect, el, Y, tt), Gt.rect.setAttribute("fill", q2(Tt.color)), Gt.rect.setAttribute("fill-opacity", String(Tt.opacity));
      }
    },
    destroy() {
      r.remove();
    }
  };
}
function Xw(a, e) {
  return Math.ceil(3 * a + Math.abs(e) + 1);
}
function Pw(a, e, l, s) {
  a.setAttribute("x", String(-s)), a.setAttribute("y", String(-s)), a.setAttribute("width", String(e + 2 * s)), a.setAttribute("height", String(l + 2 * s));
}
function Kw(a, e) {
  const l = `sc-shadow-${hh()}`, s = document.createElementNS(kt, "filter");
  s.setAttribute("id", l), s.setAttribute("filterUnits", "userSpaceOnUse"), s.setAttribute("color-interpolation-filters", "sRGB");
  const r = document.createElementNS(kt, "feGaussianBlur");
  r.setAttribute("stdDeviation", "0"), s.appendChild(r), a.appendChild(s);
  const c = document.createElementNS(kt, "path");
  return e.appendChild(c), { filterId: l, filterEl: s, feBlur: r, pathEl: c };
}
function Zw(a) {
  a.filterEl.remove(), a.pathEl.remove();
}
function Qw(a) {
  const e = a.style.isolation;
  a.style.isolation = "isolate";
  const l = document.createElementNS(kt, "svg");
  l.style.cssText = "position:absolute;inset:0;overflow:visible;pointer-events:none;z-index:-1", l.setAttribute("width", "100%"), l.setAttribute("height", "100%"), l.setAttribute("aria-hidden", "true");
  const s = document.createElementNS(kt, "defs");
  l.appendChild(s), a.appendChild(l);
  const r = [];
  return {
    update(c, f, h, y) {
      const m = Array.isArray(f) ? f : [f];
      if (!(h > 0 && y > 0 && m.some((T) => T.opacity > 0))) {
        l.style.display = "none";
        return;
      }
      for (; r.length < m.length; ) r.push(Kw(s, l));
      for (; r.length > m.length; ) Zw(r.pop());
      const v = $2(c);
      let b = !1;
      for (let T = 0; T < m.length; T++) {
        const S = m[T], w = r[m.length - 1 - T];
        if (S.opacity <= 0) {
          w.pathEl.style.display = "none";
          continue;
        }
        const E = S.spread, _ = h + E * 2, M = y + E * 2;
        if (_ <= 0 || M <= 0) {
          w.pathEl.style.display = "none";
          continue;
        }
        b = !0, w.pathEl.style.display = "";
        const j = q2(S.color), R = G2(c, E);
        if (w.pathEl.setAttribute("d", v(_, M, R, E)), w.pathEl.setAttribute("transform", `translate(${S.offsetX - E},${S.offsetY - E})`), w.pathEl.setAttribute("fill", j), w.pathEl.setAttribute("fill-opacity", String(S.opacity)), S.blur > 0) {
          const B = Xw(S.blur, E);
          Pw(w.filterEl, _, M, B), w.feBlur.setAttribute("stdDeviation", String(S.blur)), w.pathEl.setAttribute("filter", `url(#${w.filterId})`);
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
function P2() {
  ga = void 0;
  const a = [...ps];
  ps.clear();
  for (const e of a) {
    const l = as.get(e);
    if (l) for (const s of [...l]) s();
  }
}
function Fw() {
  return rs || (rs = new ResizeObserver((a) => {
    for (const e of a)
      ps.add(e.target);
    ga === void 0 && (ga = requestAnimationFrame(P2));
  })), rs;
}
function Jw(a, e) {
  if (typeof ResizeObserver > "u") return () => {
  };
  const l = Fw();
  let s = as.get(a);
  return s || (s = /* @__PURE__ */ new Set(), as.set(a, s), l.observe(a)), s.add(e), ps.add(a), ga === void 0 && (ga = requestAnimationFrame(P2)), () => {
    s.delete(e), s.size === 0 && (as.delete(a), l.unobserve(a)), as.size === 0 && (ga !== void 0 && (cancelAnimationFrame(ga), ga = void 0), ps.clear(), rs?.disconnect(), rs = null);
  };
}
function Ww(a) {
  const e = window.getComputedStyle(a), l = (m) => m.endsWith("px") ? parseFloat(m) : NaN, s = l(e.width), r = l(e.height);
  if (Number.isNaN(s) || Number.isNaN(r))
    return { width: a.offsetWidth, height: a.offsetHeight };
  if (e.boxSizing === "border-box")
    return { width: s, height: r };
  const c = (parseFloat(e.paddingLeft) || 0) + (parseFloat(e.paddingRight) || 0), f = (parseFloat(e.paddingTop) || 0) + (parseFloat(e.paddingBottom) || 0), h = (parseFloat(e.borderLeftWidth) || 0) + (parseFloat(e.borderRightWidth) || 0), y = (parseFloat(e.borderTopWidth) || 0) + (parseFloat(e.borderBottomWidth) || 0);
  return { width: s + c + h, height: r + f + y };
}
function K2(a) {
  const e = a.match(
    /^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)(?:\s*[,/]\s*([\d.]+))?\s*\)$/
  );
  if (!e) return;
  const l = Number(e[1]), s = Number(e[2]), r = Number(e[3]), c = e[4] !== void 0 ? Number(e[4]) : 1;
  return { hex: "#" + (1 << 24 | l << 16 | s << 8 | r).toString(16).slice(1), opacity: c };
}
function Iw(a) {
  const e = getComputedStyle(a), l = e.borderTopStyle;
  if (l === "none" || l === "hidden") return;
  const s = parseFloat(e.borderTopWidth);
  if (s <= 0 || isNaN(s)) return;
  const r = K2(e.borderTopColor);
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
function tT(a) {
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
    const g = K2(m[0]);
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
function rg(a) {
  const e = {
    border: a.style.border,
    boxShadow: a.style.boxShadow,
    paddingTop: a.style.paddingTop,
    paddingRight: a.style.paddingRight,
    paddingBottom: a.style.paddingBottom,
    paddingLeft: a.style.paddingLeft
  }, l = Iw(a), s = getComputedStyle(a), { shadow: r, innerShadow: c } = tT(s.boxShadow), f = s.boxSizing, h = parseFloat(s.borderTopWidth) || 0, y = parseFloat(s.borderRightWidth) || 0, m = parseFloat(s.borderBottomWidth) || 0, g = parseFloat(s.borderLeftWidth) || 0, v = parseFloat(s.paddingTop) || 0, b = parseFloat(s.paddingRight) || 0, T = parseFloat(s.paddingBottom) || 0, S = parseFloat(s.paddingLeft) || 0;
  l && (a.style.border = "0"), (r || c) && (a.style.boxShadow = "none"), l && f === "content-box" && (h > 0 || y > 0 || m > 0 || g > 0) && (a.style.paddingTop = v + h + "px", a.style.paddingRight = b + y + "px", a.style.paddingBottom = T + m + "px", a.style.paddingLeft = S + g + "px");
  const w = {};
  return l && (w.innerBorder = l), r && (w.shadow = r), c && (w.innerShadow = c), { effects: w, savedStyles: e };
}
function mh(a) {
  return a ? !!(a.innerBorder || a.outerBorder || a.middleBorder || a.innerShadow || a.shadow) : !1;
}
function Z2(a, e) {
  return { ...a?.effects, ...e };
}
function ug(a, e) {
  a.style.border = e.border, a.style.boxShadow = e.boxShadow, a.style.paddingTop = e.paddingTop, a.style.paddingRight = e.paddingRight, a.style.paddingBottom = e.paddingBottom, a.style.paddingLeft = e.paddingLeft;
}
var $i = /* @__PURE__ */ new WeakMap();
function eT(a) {
  const e = $i.get(a) ?? 0;
  if (e > 0)
    return $i.set(a, e + 1), !0;
  const l = getComputedStyle(a).position;
  return l !== "static" && l !== "" ? !1 : ($i.set(a, 1), a.style.position = "relative", !0);
}
function nT(a) {
  const e = $i.get(a);
  e !== void 0 && (e <= 1 ? ($i.delete(a), a.style.position = "") : $i.set(a, e - 1));
}
var Po = typeof window < "u" ? A.useLayoutEffect : A.useEffect;
function aT(a, e, l, s, r, c) {
  l.update(a, e, r, c), s?.update(a, e.shadow ?? Uw, r, c);
}
function jf(a, e) {
  const l = Z2(a.extracted, e.effectsPropRef.current);
  mh(l) && Q2(a, l, e.wrapperRefRef.current, e.skipShadowHandleRef.current);
  const { width: s, height: r } = Ww(a.el);
  if (s <= 0 || r <= 0) return;
  const c = e.syncKeyRef.current;
  s === a.lastWidth && r === a.lastHeight && c === a.lastSyncKey || (a.lastWidth = s, a.lastHeight = r, a.lastSyncKey = c, a.el.style.clipPath = Bw(s, r, e.optionsRef.current), a.el.setAttribute("data-state", "ready"), a.effectsHandle && aT(e.optionsRef.current, l, a.effectsHandle, a.shadowHandle, s, r));
}
function Q2(a, e, l, s) {
  if (!a.anchor) {
    const r = l?.current ?? a.el.parentElement;
    if (!r) return;
    a.anchor = r, a.didAcquire = eT(r);
  }
  a.effectsHandle || (a.effectsHandle = Yw(a.anchor)), !a.shadowHandle && e.shadow && !s && (a.shadowHandle = Qw(a.anchor));
}
function F2(a, e, l) {
  const { wrapperRef: s, effects: r, autoEffects: c, skipShadowHandle: f, onExtractedShadow: h } = l ?? {}, y = A.useRef(e);
  y.current = e;
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
  const M = A.useRef({
    optionsRef: y,
    effectsPropRef: m,
    wrapperRefRef: g,
    skipShadowHandleRef: v,
    onExtractedShadowRef: b,
    syncKeyRef: _
  }), j = A.useRef(null);
  Po(() => {
    const R = a.current;
    if (!R) return;
    const B = R.style.clipPath;
    R.setAttribute("data-slot", "smooth-corners"), R.setAttribute("data-state", "pending");
    const L = w ? rg(R) : void 0, D = {
      el: R,
      savedClipPath: B,
      extracted: L,
      effectsHandle: void 0,
      shadowHandle: void 0,
      anchor: null,
      didAcquire: !1,
      lastWidth: 0,
      lastHeight: 0,
      lastSyncKey: null
    };
    j.current = D;
    const k = Z2(D.extracted, m.current);
    mh(k) && Q2(D, k, g.current, v.current), b.current?.(D.extracted?.effects.shadow);
    const P = Jw(R, () => jf(D, M.current));
    return () => {
      P(), D.effectsHandle?.destroy(), D.shadowHandle?.destroy(), D.extracted && ug(R, D.extracted.savedStyles), b.current?.(void 0), D.didAcquire && D.anchor && nT(D.anchor), j.current = null, R.style.clipPath = B, R.removeAttribute("data-slot"), R.removeAttribute("data-state");
    };
  }, [a]), Po(() => {
    const R = j.current;
    R && jf(R, M.current);
  }), Po(() => {
    if (!E) return;
    const R = j.current;
    !R || !R.shadowHandle || (R.shadowHandle.destroy(), R.shadowHandle = void 0, R.lastSyncKey = null);
  }, [E]), Po(() => {
    const R = j.current;
    if (!R) return;
    const B = R.extracted !== void 0;
    if (w && !B)
      R.extracted = rg(R.el);
    else if (!w && B)
      ug(R.el, R.extracted.savedStyles), R.extracted = void 0;
    else
      return;
    b.current?.(R.extracted?.effects.shadow), R.lastSyncKey = null, jf(R, M.current);
  }, [w]);
}
function J2(...a) {
  return (e) => {
    for (const l of a)
      l && (typeof l == "function" ? l(e) : l.current = e);
  };
}
function iT(a, e) {
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
function lT(a, e) {
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
  const f = c, h = f.props ?? {}, y = h.ref ?? f.ref, m = iT(s, h);
  return A.cloneElement(f, {
    ...m,
    ref: J2(e, y)
  });
}
var sT = A.forwardRef(lT);
function oT(a) {
  const e = Array.isArray(a) ? a : [a], l = [];
  for (const s of e) {
    if (s.opacity <= 0) continue;
    const { offsetX: r, offsetY: c, blur: f, spread: h, color: y, opacity: m } = s, g = rT(y);
    l.push(
      `${r}px ${c}px ${f}px ${h}px rgba(${g.r},${g.g},${g.b},${m})`
    );
  }
  return l.join(", ");
}
function rT(a) {
  const e = a.replace("#", ""), l = e.length === 3 ? e[0] + e[0] + e[1] + e[1] + e[2] + e[2] : e;
  return {
    r: parseInt(l.substring(0, 2), 16),
    g: parseInt(l.substring(2, 4), 16),
    b: parseInt(l.substring(4, 6), 16)
  };
}
function uT(a) {
  if ("radius" in a) return `${a.radius}px`;
  const e = (f) => f === void 0 ? 0 : typeof f == "number" ? f : f.radius, l = e(a.topLeft), s = e(a.topRight), r = e(a.bottomRight), c = e(a.bottomLeft);
  return `${l}px ${s}px ${r}px ${c}px`;
}
function cT(a, e) {
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
  } = a, S = l ?? "div", w = A.useRef(null), E = A.useRef(null), _ = A.useMemo(
    () => J2(w, e),
    [e]
  ), M = c ?? { radius: 0 }, j = b === "box-shadow", R = j ? void 0 : g, [B, L] = A.useState(void 0), D = A.useCallback(
    (ot) => L(ot),
    []
  ), k = {
    innerBorder: f,
    outerBorder: h,
    middleBorder: y,
    innerShadow: m,
    shadow: R
  }, P = mh(k), H = j ? g ?? B : void 0, I = (v ?? !0) || P || H !== void 0;
  F2(w, M, {
    wrapperRef: I ? E : void 0,
    effects: P ? k : void 0,
    autoEffects: v,
    skipShadowHandle: j,
    onExtractedShadow: j ? D : void 0
  });
  const Q = s ? A.createElement(sT, { ...T, ref: _ }, r) : A.createElement(S, { ...T, ref: _ }, r);
  if (!I) return Q;
  let at = null;
  if (j && H !== void 0) {
    const ot = oT(H);
    if (ot !== "") {
      const V = {
        position: "absolute",
        inset: 0,
        borderRadius: uT(M),
        boxShadow: ot,
        pointerEvents: "none",
        zIndex: -1
      };
      at = A.createElement("div", {
        "aria-hidden": !0,
        "data-slot": "smooth-corners-box-shadow",
        style: V
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
        ...at ? { isolation: "isolate" } : {}
      }
    },
    at,
    Q
  );
}
A.forwardRef(cT);
function cg(a, e) {
  if (typeof a == "function")
    return a(e);
  a != null && (a.current = e);
}
function fT(...a) {
  return (e) => {
    let l = !1;
    const s = a.map((r) => {
      const c = cg(r, e);
      return !l && typeof c == "function" && (l = !0), c;
    });
    if (l)
      return () => {
        for (let r = 0; r < s.length; r++) {
          const c = s[r];
          typeof c == "function" ? c() : cg(a[r], null);
        }
      };
  };
}
function dT(...a) {
  return A.useCallback(fT(...a), a);
}
class hT extends A.Component {
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
function mT({ children: a, isPresent: e, anchorX: l, anchorY: s, root: r, pop: c }) {
  const f = A.useId(), h = A.useRef(null), y = A.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    direction: "ltr"
  }), { nonce: m } = A.useContext(Hd), g = a.props?.ref ?? a?.ref, v = dT(h, g);
  return A.useInsertionEffect(() => {
    const { width: b, height: T, top: S, left: w, right: E, bottom: _, direction: M } = y.current;
    if (e || c === !1 || !h.current || !b || !T)
      return;
    const j = M === "rtl", R = l === "left" ? j ? `right: ${E}` : `left: ${w}` : j ? `left: ${w}` : `right: ${E}`, B = s === "bottom" ? `bottom: ${_}` : `top: ${S}`;
    h.current.dataset.motionPopId = f;
    const L = document.createElement("style");
    m && (L.nonce = m);
    const D = r ?? document.head;
    return D.appendChild(L), L.sheet && L.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${b}px !important;
            height: ${T}px !important;
            ${R}px !important;
            ${B}px !important;
          }
        `), () => {
      h.current?.removeAttribute("data-motion-pop-id"), D.contains(L) && D.removeChild(L);
    };
  }, [e]), p.jsx(hT, { isPresent: e, childRef: h, sizeRef: y, pop: c, children: c === !1 ? a : A.cloneElement(a, { ref: v }) });
}
const pT = ({ children: a, initial: e, isPresent: l, onExitComplete: s, custom: r, presenceAffectsLayout: c, mode: f, anchorX: h, anchorY: y, root: m }) => {
  const g = uh(yT), v = A.useId(), b = A.useRef(l), T = A.useRef(s);
  ch(() => {
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
  }, [l]), a = p.jsx(mT, { pop: f === "popLayout", isPresent: l, anchorX: h, anchorY: y, root: m, children: a }), p.jsx(Nr.Provider, { value: w, children: a });
};
function yT() {
  return /* @__PURE__ */ new Map();
}
function W2(a = !0) {
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
function fg(a) {
  const e = [];
  return A.Children.forEach(a, (l) => {
    A.isValidElement(l) && e.push(l);
  }), e;
}
const gT = ({ children: a, custom: e, initial: l = !0, onExitComplete: s, presenceAffectsLayout: r = !0, mode: c = "sync", propagate: f = !1, anchorX: h = "left", anchorY: y = "top", root: m }) => {
  const [g, v] = W2(f), b = A.useMemo(() => fg(a), [a]), T = f && !g ? [] : b.map(Ko), S = A.useRef(!0), w = A.useRef(b), E = uh(() => /* @__PURE__ */ new Map()), _ = A.useRef(/* @__PURE__ */ new Set()), [M, j] = A.useState(b), [R, B] = A.useState(b);
  ch(() => {
    S.current = !1, w.current = b;
    for (let k = 0; k < R.length; k++) {
      const P = Ko(R[k]);
      T.includes(P) ? (E.delete(P), _.current.delete(P)) : E.get(P) !== !0 && E.set(P, !1);
    }
  }, [R, T.length, T.join("-")]);
  const L = [];
  if (b !== M) {
    let k = [...b];
    for (let P = 0; P < R.length; P++) {
      const H = R[P], I = Ko(H);
      T.includes(I) || (k.splice(P, 0, H), L.push(H));
    }
    return c === "wait" && L.length && (k = L), B(fg(k)), j(b), null;
  }
  const { forceRender: D } = A.useContext(Ud);
  return p.jsx(p.Fragment, { children: R.map((k) => {
    const P = Ko(k), H = f && !g ? !1 : b === R || T.includes(P), I = () => {
      if (_.current.has(P))
        return;
      if (E.has(P))
        _.current.add(P), E.set(P, !0);
      else
        return;
      let K = !0;
      E.forEach((Q) => {
        Q || (K = !1);
      }), K && (D?.(), B(w.current), f && v?.(), s && s());
    };
    return p.jsx(pT, { isPresent: H, initial: !S.current || l ? void 0 : !1, custom: e, presenceAffectsLayout: r, mode: c, root: m, onExitComplete: H ? void 0 : I, anchorX: h, anchorY: y, children: k }, P);
  }) });
};
function vT({ children: a, features: e, strict: l = !1 }) {
  const [, s] = A.useState(!Mf(e)), r = A.useRef(void 0);
  if (!Mf(e)) {
    const { renderer: c, ...f } = e;
    r.current = c, ag(f);
  }
  return A.useEffect(() => {
    Mf(e) && e().then(({ renderer: c, ...f }) => {
      ag(f), r.current = c, s(!0);
    });
  }, []), p.jsx(kd.Provider, { value: { renderer: r.current, strict: l }, children: a });
}
function Mf(a) {
  return typeof a == "function";
}
const bT = (a, e) => e.isSVG ?? rh(a) ? new q9(e) : new L9(e, {
  allowProjection: a !== A.Fragment
});
class xT extends wa {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(e) {
    super(e), e.animationState || (e.animationState = P9(e));
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
let ST = 0;
class wT extends wa {
  constructor() {
    super(...arguments), this.id = ST++, this.isExitComplete = !1;
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
const TT = {
  animation: {
    Feature: xT
  },
  exit: {
    Feature: wT
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
const CT = (a) => (e) => th(e) && a(e, Ss(e));
function us(a, e, l, s) {
  return hs(a, e, CT(l), s);
}
const I2 = ({ current: a }) => a ? a.ownerDocument.defaultView : null, dg = (a, e) => Math.abs(a - e);
function ET(a, e) {
  const l = dg(a.x, e.x), s = dg(a.y, e.y);
  return Math.sqrt(l ** 2 + s ** 2);
}
const hg = /* @__PURE__ */ new Set(["auto", "scroll"]);
class tb {
  constructor(e, l, { transformPagePoint: s, contextWindow: r = window, dragSnapToOrigin: c = !1, distanceThreshold: f = 3, element: h } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (S) => {
      this.handleScroll(S.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = Zo(this.lastRawMoveEventInfo, this.transformPagePoint));
      const S = _f(this.lastMoveEventInfo, this.history), w = this.startEvent !== null, E = ET(S.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!w && !E)
        return;
      const { point: _ } = S, { timestamp: M } = be;
      this.history.push({ ..._, timestamp: M });
      const { onStart: j, onMove: R } = this.handlers;
      w || (j && j(this.lastMoveEvent, S), this.startEvent = this.lastMoveEvent), R && R(this.lastMoveEvent, S);
    }, this.handlePointerMove = (S, w) => {
      this.lastMoveEvent = S, this.lastRawMoveEventInfo = w, this.lastMoveEventInfo = Zo(w, this.transformPagePoint), $t.update(this.updatePoint, !0);
    }, this.handlePointerUp = (S, w) => {
      this.end();
      const { onEnd: E, onSessionEnd: _, resumeAnimation: M } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && M && M(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const j = _f(S.type === "pointercancel" ? this.lastMoveEventInfo : Zo(w, this.transformPagePoint), this.history);
      this.startEvent && E && E(S, j), _ && _(S, j);
    }, !th(e))
      return;
    this.dragSnapToOrigin = c, this.handlers = l, this.transformPagePoint = s, this.distanceThreshold = f, this.contextWindow = r || window;
    const y = Ss(e), m = Zo(y, this.transformPagePoint), { point: g } = m, { timestamp: v } = be;
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
      (hg.has(s.overflowX) || hg.has(s.overflowY)) && this.scrollPositions.set(l, {
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
    c.x === 0 && c.y === 0 || (s ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += c.x, this.lastMoveEventInfo.point.y += c.y) : this.history.length > 0 && (this.history[0].x -= c.x, this.history[0].y -= c.y), this.scrollPositions.set(e, r), $t.update(this.updatePoint, !0));
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
function mg(a, e) {
  return { x: a.x - e.x, y: a.y - e.y };
}
function _f({ point: a }, e) {
  return {
    point: a,
    delta: mg(a, eb(e)),
    offset: mg(a, AT(e)),
    velocity: jT(e, 0.1)
  };
}
function AT(a) {
  return a[0];
}
function eb(a) {
  return a[a.length - 1];
}
function jT(a, e) {
  if (a.length < 2)
    return { x: 0, y: 0 };
  let l = a.length - 1, s = null;
  const r = eb(a);
  for (; l >= 0 && (s = a[l], !(r.timestamp - s.timestamp > /* @__PURE__ */ Xe(e))); )
    l--;
  if (!s)
    return { x: 0, y: 0 };
  s === a[0] && a.length > 2 && r.timestamp - s.timestamp > /* @__PURE__ */ Xe(e) * 2 && (s = a[1]);
  const c = /* @__PURE__ */ ln(r.timestamp - s.timestamp);
  if (c === 0)
    return { x: 0, y: 0 };
  const f = {
    x: (r.x - s.x) / c,
    y: (r.y - s.y) / c
  };
  return f.x === 1 / 0 && (f.x = 0), f.y === 1 / 0 && (f.y = 0), f;
}
function MT(a, { min: e, max: l }, s) {
  return e !== void 0 && a < e ? a = s ? qt(e, a, s.min) : Math.max(a, e) : l !== void 0 && a > l && (a = s ? qt(l, a, s.max) : Math.min(a, l)), a;
}
function pg(a, e, l) {
  return {
    min: e !== void 0 ? a.min + e : void 0,
    max: l !== void 0 ? a.max + l - (a.max - a.min) : void 0
  };
}
function _T(a, { top: e, left: l, bottom: s, right: r }) {
  return {
    x: pg(a.x, l, r),
    y: pg(a.y, e, s)
  };
}
function yg(a, e) {
  let l = e.min - a.min, s = e.max - a.max;
  return e.max - e.min < a.max - a.min && ([l, s] = [s, l]), { min: l, max: s };
}
function DT(a, e) {
  return {
    x: yg(a.x, e.x),
    y: yg(a.y, e.y)
  };
}
function RT(a, e) {
  let l = 0.5;
  const s = Ae(a), r = Ae(e);
  return r > s ? l = /* @__PURE__ */ cs(e.min, e.max - s, a.min) : s > r && (l = /* @__PURE__ */ cs(a.min, a.max - r, e.min)), Tn(0, 1, l);
}
function NT(a, e) {
  const l = {};
  return e.min !== void 0 && (l.min = e.min - a.min), e.max !== void 0 && (l.max = e.max - a.min), l;
}
const bd = 0.35;
function OT(a = bd) {
  return a === !1 ? a = 0 : a === !0 && (a = bd), {
    x: gg(a, "left", "right"),
    y: gg(a, "top", "bottom")
  };
}
function gg(a, e, l) {
  return {
    min: vg(a, e),
    max: vg(a, l)
  };
}
function vg(a, e) {
  return typeof a == "number" ? a : a[e] || 0;
}
const zT = /* @__PURE__ */ new WeakMap();
class LT {
  constructor(e) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = ce(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = e;
  }
  start(e, { snapToCursor: l = !1, distanceThreshold: s } = {}) {
    const { presenceContext: r } = this.visualElement;
    if (r && r.isPresent === !1)
      return;
    const c = (v) => {
      l && this.snapToCursor(Ss(v).point), this.stopAnimation();
    }, f = (v, b) => {
      const { drag: T, dragPropagation: S, onDragStart: w } = this.getProps();
      if (T && !S && (this.openDragLock && this.openDragLock(), this.openDragLock = e9(T), !this.openDragLock))
        return;
      this.latestPointerEvent = v, this.latestPanInfo = b, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), xn((_) => {
        let M = this.getAxisMotionValue(_).get() || 0;
        if (wn.test(M)) {
          const { projection: j } = this.visualElement;
          if (j && j.layout) {
            const R = j.layout.layoutBox[_];
            R && (M = Ae(R) * (parseFloat(M) / 100));
          }
        }
        this.originPoint[_] = M;
      }), w && $t.update(() => w(v, b), !1, !0), od(this.visualElement, "transform");
      const { animationState: E } = this.visualElement;
      E && E.setActive("whileDrag", !0);
    }, h = (v, b) => {
      this.latestPointerEvent = v, this.latestPanInfo = b;
      const { dragPropagation: T, dragDirectionLock: S, onDirectionLock: w, onDrag: E } = this.getProps();
      if (!T && !this.openDragLock)
        return;
      const { offset: _ } = b;
      if (S && this.currentDirection === null) {
        this.currentDirection = VT(_), this.currentDirection !== null && w && w(this.currentDirection);
        return;
      }
      this.updateAxis("x", b.point, _), this.updateAxis("y", b.point, _), this.visualElement.render(), E && $t.update(() => E(v, b), !1, !0);
    }, y = (v, b) => {
      this.latestPointerEvent = v, this.latestPanInfo = b, this.stop(v, b), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, m = () => {
      const { dragSnapToOrigin: v } = this.getProps();
      (v || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: g } = this.getProps();
    this.panSession = new tb(e, {
      onSessionStart: c,
      onStart: f,
      onMove: h,
      onSessionEnd: y,
      resumeAnimation: m
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: g,
      distanceThreshold: s,
      contextWindow: I2(this.visualElement),
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
    h && $t.postRender(() => h(s, r));
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
    this.constraints && this.constraints[e] && (f = MT(f, this.constraints[e], this.elastic[e])), c.set(f);
  }
  resolveConstraints() {
    const { dragConstraints: e, dragElastic: l } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, r = this.constraints;
    e && Vi(e) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : e && s ? this.constraints = _T(s.layoutBox, e) : this.constraints = !1, this.elastic = OT(l), r !== this.constraints && !Vi(e) && s && this.constraints && !this.hasMutatedConstraints && xn((c) => {
      this.constraints !== !1 && this.getAxisMotionValue(c) && (this.constraints[c] = NT(s.layoutBox[c], this.constraints[c]));
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
    const c = _9(s, r.root, this.visualElement.getTransformPagePoint());
    let f = DT(r.layout.layoutBox, c);
    if (l) {
      const h = l(A9(f));
      this.hasMutatedConstraints = !!h, h && (f = c2(h));
    }
    return f;
  }
  startAnimation(e) {
    const { drag: l, dragMomentum: s, dragElastic: r, dragTransition: c, dragSnapToOrigin: f, onDragTransitionEnd: h } = this.getProps(), y = this.constraints || {}, m = xn((g) => {
      if (!Qo(g, l, this.currentDirection))
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
    return od(this.visualElement, e), s.start(Qd(e, s, 0, l, this.visualElement, !1));
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
        const { min: f, max: h } = r.layout.layoutBox[l], y = c.get() || 0;
        c.set(e[l] - qt(f, h, 0.5) + y);
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
        const y = h.get();
        r[f] = RT({ min: y, max: y }, this.constraints[f]);
      }
    });
    const { transformTemplate: c } = this.visualElement.getProps();
    this.visualElement.current.style.transform = c ? c({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.constraints = !1, this.resolveConstraints(), xn((f) => {
      if (!Qo(f, e, null))
        return;
      const h = this.getAxisMotionValue(f), { min: y, max: m } = this.constraints[f];
      h.set(qt(y, m, r[f]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    zT.set(this.visualElement, this);
    const e = this.visualElement.current, l = us(e, "pointerdown", (m) => {
      const { drag: g, dragListener: v = !0 } = this.getProps(), b = m.target, T = b !== e && o9(b);
      g && v && !T && this.start(m);
    });
    let s;
    const r = () => {
      const { dragConstraints: m } = this.getProps();
      Vi(m) && m.current && (this.constraints = this.resolveRefConstraints(), s || (s = BT(e, m.current, () => this.scalePositionWithinConstraints())));
    }, { projection: c } = this.visualElement, f = c.addEventListener("measure", r);
    c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()), $t.read(r);
    const h = hs(window, "resize", () => this.scalePositionWithinConstraints()), y = c.addEventListener("didUpdate", (({ delta: m, hasLayoutChanged: g }) => {
      this.isDragging && g && (xn((v) => {
        const b = this.getAxisMotionValue(v);
        b && (this.originPoint[v] += m[v].translate, b.set(b.get() + m[v].translate));
      }), this.visualElement.render());
    }));
    return () => {
      h(), l(), f(), y && y(), s && s();
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
function bg(a) {
  let e = !0;
  return () => {
    if (e) {
      e = !1;
      return;
    }
    a();
  };
}
function BT(a, e, l) {
  const s = by(a, bg(l)), r = by(e, bg(l));
  return () => {
    s(), r();
  };
}
function Qo(a, e, l) {
  return (e === !0 || e === a) && (l === null || l === a);
}
function VT(a, e = 10) {
  let l = null;
  return Math.abs(a.y) > e ? l = "y" : Math.abs(a.x) > e && (l = "x"), l;
}
class UT extends wa {
  constructor(e) {
    super(e), this.removeGroupControls = sn, this.removeListeners = sn, this.controls = new LT(e);
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
const Df = (a) => (e, l) => {
  a && $t.update(() => a(e, l), !1, !0);
};
class kT extends wa {
  constructor() {
    super(...arguments), this.removePointerDownListener = sn;
  }
  onPointerDown(e) {
    this.session = new tb(e, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: I2(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: e, onPanStart: l, onPan: s, onPanEnd: r } = this.node.getProps();
    return {
      onSessionStart: Df(e),
      onStart: Df(l),
      onMove: Df(s),
      onEnd: (c, f) => {
        delete this.session, r && $t.postRender(() => r(c, f));
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
let Rf = !1;
class HT extends A.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: e, layoutGroup: l, switchLayoutGroup: s, layoutId: r } = this.props, { projection: c } = e;
    c && (l.group && l.group.add(c), s && s.register && r && s.register(c), Rf && c.root.didUpdate(), c.addEventListener("animationComplete", () => {
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
    }), Rf = !0, r || e.layoutDependency !== l || l === void 0 || e.isPresent !== c ? f.willUpdate() : this.safeToRemove(), e.isPresent !== c && (c ? f.promote() : f.relegate() || $t.postRender(() => {
      const h = f.getStack();
      (!h || !h.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: e, layoutAnchor: l } = this.props, { projection: s } = e;
    s && (s.options.layoutAnchor = l, s.root.didUpdate(), Id.postRender(() => {
      !s.currentAnimation && s.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: e, layoutGroup: l, switchLayoutGroup: s } = this.props, { projection: r } = e;
    Rf = !0, r && (r.scheduleCheckAfterUnmount(), l && l.group && l.group.remove(r), s && s.deregister && s.deregister(r));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function nb(a) {
  const [e, l] = W2(), s = A.useContext(Ud);
  return p.jsx(HT, { ...a, layoutGroup: s, switchLayoutGroup: A.useContext(B2), isPresent: e, safeToRemove: l });
}
const qT = {
  pan: {
    Feature: kT
  },
  drag: {
    Feature: UT,
    ProjectionNode: D2,
    MeasureLayout: nb
  }
};
function xg(a, e, l) {
  const { props: s } = a;
  a.animationState && s.whileHover && a.animationState.setActive("whileHover", l === "Start");
  const r = "onHover" + l, c = s[r];
  c && $t.postRender(() => c(e, Ss(e)));
}
class $T extends wa {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = a9(e, (l, s) => (xg(this.node, s, "Start"), (r) => xg(this.node, r, "End"))));
  }
  unmount() {
  }
}
class GT extends wa {
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
function Sg(a, e, l) {
  const { props: s } = a;
  if (a.current instanceof HTMLButtonElement && a.current.disabled)
    return;
  a.animationState && s.whileTap && a.animationState.setActive("whileTap", l === "Start");
  const r = "onTap" + (l === "End" ? "" : l), c = s[r];
  c && $t.postRender(() => c(e, Ss(e)));
}
class YT extends wa {
  mount() {
    const { current: e } = this.node;
    if (!e)
      return;
    const { globalTapTarget: l, propagate: s } = this.node.props;
    this.unmount = u9(e, (r, c) => (Sg(this.node, c, "Start"), (f, { success: h }) => Sg(this.node, f, h ? "End" : "Cancel")), {
      useGlobalTarget: l,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const xd = /* @__PURE__ */ new WeakMap(), Nf = /* @__PURE__ */ new WeakMap(), XT = (a) => {
  const e = xd.get(a.target);
  e && e(a);
}, PT = (a) => {
  a.forEach(XT);
};
function KT({ root: a, ...e }) {
  const l = a || document;
  Nf.has(l) || Nf.set(l, {});
  const s = Nf.get(l), r = JSON.stringify(e);
  return s[r] || (s[r] = new IntersectionObserver(PT, { root: a, ...e })), s[r];
}
function ZT(a, e, l) {
  const s = KT(e);
  return xd.set(a, l), s.observe(a), () => {
    xd.delete(a), s.unobserve(a);
  };
}
const QT = {
  some: 0,
  all: 1
};
class FT extends wa {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: e = {} } = this.node.getProps(), { root: l, margin: s, amount: r = "some", once: c } = e, f = {
      root: l ? l.current : void 0,
      rootMargin: s,
      threshold: typeof r == "number" ? r : QT[r]
    }, h = (y) => {
      const { isIntersecting: m } = y;
      if (this.isInView === m || (this.isInView = m, c && !m && this.hasEnteredView))
        return;
      m && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", m);
      const { onViewportEnter: g, onViewportLeave: v } = this.node.getProps(), b = m ? g : v;
      b && b(y);
    };
    this.stopObserver = ZT(this.node.current, f, h);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: e, prevProps: l } = this.node;
    ["amount", "margin", "root"].some(JT(e, l)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function JT({ viewport: a = {} }, { viewport: e = {} } = {}) {
  return (l) => a[l] !== e[l];
}
const WT = {
  inView: {
    Feature: FT
  },
  tap: {
    Feature: YT
  },
  focus: {
    Feature: GT
  },
  hover: {
    Feature: $T
  }
}, IT = {
  layout: {
    ProjectionNode: D2,
    MeasureLayout: nb
  }
}, tC = {
  renderer: bT,
  ...TT,
  ...WT
}, eC = {
  ...tC,
  ...qT,
  ...IT
};
function nC() {
  !ih.current && o2();
  const [a] = A.useState(vr.current);
  return a;
}
var Or = lv();
function aC(a, e) {
  if (a instanceof RegExp) return { keys: !1, pattern: a };
  var l, s, r, c, f = [], h = "", y = a.split("/");
  for (y[0] || y.shift(); r = y.shift(); )
    l = r[0], l === "*" ? (f.push(l), h += r[1] === "?" ? "(?:/(.*))?" : "/(.*)") : l === ":" ? (s = r.indexOf("?", 1), c = r.indexOf(".", 1), f.push(r.substring(1, ~s ? s : ~c ? c : r.length)), h += ~s && !~c ? "(?:/([^/]+?))?" : "/([^/]+?)", ~c && (h += (~s ? "?" : "") + "\\" + r.substring(c))) : h += "/" + r;
  return {
    keys: f,
    pattern: new RegExp("^" + h + (e ? "(?=$|/)" : "/?$"), "i")
  };
}
const iC = "popstate", ph = "pushState", yh = "replaceState", lC = "hashchange", wg = [
  iC,
  ph,
  yh,
  lC
], sC = (a) => {
  for (const e of wg)
    addEventListener(e, a);
  return () => {
    for (const e of wg)
      removeEventListener(e, a);
  };
}, ab = (a, e) => K3.useSyncExternalStore(sC, a, e), Tg = () => location.search, oC = ({ ssrSearch: a } = {}) => ab(
  Tg,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrSearch="?foo",
  // client hydrates with just <Router /> and reads from location.search
  a != null ? () => a : Tg
), Cg = () => location.pathname, rC = ({ ssrPath: a } = {}) => ab(
  Cg,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrPath="/foo",
  // client hydrates with just <Router /> and reads from location.pathname
  a != null ? () => a : Cg
), uC = (a, { replace: e = !1, state: l = null } = {}) => history[e ? yh : ph](l, "", a), cC = (a = {}) => [rC(a), uC], Eg = Symbol.for("wouter_v3");
if (typeof history < "u" && typeof window[Eg] > "u") {
  for (const a of [ph, yh]) {
    const e = history[a];
    history[a] = function() {
      const l = e.apply(this, arguments), s = new Event(a);
      return s.arguments = arguments, dispatchEvent(s), l;
    };
  }
  Object.defineProperty(window, Eg, { value: !0 });
}
const fC = (a, e) => e.toLowerCase().indexOf(a.toLowerCase()) ? "~" + e : e.slice(a.length) || "/", ib = (a = "") => a === "/" ? "" : a, dC = (a, e) => a[0] === "~" ? a.slice(1) : ib(e) + a, hC = (a = "", e) => fC(Ag(ib(a)), Ag(e)), Ag = (a) => {
  try {
    return decodeURI(a);
  } catch {
    return a;
  }
}, mC = {
  hook: cC,
  searchHook: oC,
  parser: aC,
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
}, pC = A.createContext(mC), yC = () => A.useContext(pC), gC = {};
A.createContext(gC);
const vC = (a) => {
  const [e, l] = a.hook(a);
  return [
    hC(a.base, e),
    sv(
      (s, r) => a.aroundNav(l, dC(s, a.base), r)
    )
  ];
}, bC = A.forwardRef((a, e) => {
  const l = yC(), [s, r] = vC(l), {
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
  } = a, w = sv((_) => {
    _.ctrlKey || _.metaKey || _.altKey || _.shiftKey || _.button !== 0 || (h?.(_), _.defaultPrevented || (_.preventDefault(), r(f, a)));
  }), E = l.hrefs(
    f[0] === "~" ? f.slice(1) : l.base + f,
    l
    // pass router as a second argument for convinience
  );
  return y && A.isValidElement(m) ? A.cloneElement(m, { onClick: w, href: E }) : A.createElement("a", {
    ...S,
    onClick: w,
    href: E,
    // `className` can be a function to apply the class if this link is active
    className: g?.call ? g(s === f) : g,
    children: m,
    ref: e
  });
}), gh = Object.freeze({
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
}), xC = "_root_xunnd_1", jg = "_glassBackground_xunnd_5", Mg = "_glassShadow_xunnd_25", SC = "_glassBorder_1y4zy_1", wC = "_muted_1y4zy_15", ys = (a) => {
  const e = wt.c(2), {
    className: l,
    muted: s
  } = a, r = `${SC} ${s !== void 0 && s ? wC : ""} ${l === void 0 ? "" : l}`;
  let c;
  return e[0] !== r ? (c = /* @__PURE__ */ p.jsx("div", {
    className: r,
    "aria-hidden": "true"
  }), e[0] = r, e[1] = c) : c = e[1], c;
}, vh = (a) => {
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
        className: jg,
        "aria-hidden": "true"
      }), /* @__PURE__ */ p.jsx("div", {
        className: Mg,
        "aria-hidden": "true"
      }), /* @__PURE__ */ p.jsx(ys, {})]
    }), e[7] = S) : S = e[7], S;
  }
  const m = `${xC} ${f}`;
  let g, v, b;
  e[8] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (g = /* @__PURE__ */ p.jsx("div", {
    className: jg,
    "aria-hidden": "true"
  }), v = /* @__PURE__ */ p.jsx("div", {
    className: Mg,
    "aria-hidden": "true"
  }), b = /* @__PURE__ */ p.jsx(ys, {}), e[8] = g, e[9] = v, e[10] = b) : (g = e[8], v = e[9], b = e[10]);
  let T;
  return e[11] !== l || e[12] !== s || e[13] !== y || e[14] !== m ? (T = /* @__PURE__ */ p.jsxs("div", {
    className: m,
    style: y,
    ...s,
    children: [g, v, b, l]
  }), e[11] = l, e[12] = s, e[13] = y, e[14] = m, e[15] = T) : T = e[15], T;
}, TC = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/arrow-down" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", d: "M11.2482 20.3129C11.6466 20.7682 12.3556 20.7682 12.7541 20.3129L17.5499 14.8314C18.1155 14.1849 17.6561 13.1732 16.797 13.1732H13.5011V5.67324C13.5011 4.84481 12.8295 4.17324 12.0011 4.17324C11.1727 4.17324 10.5011 4.84481 10.5011 5.67324V13.1732H7.20522C6.34614 13.1732 5.88678 14.1849 6.45229 14.8314L11.2482 20.3129Z", fill: "#3D3C3A" }))), CC = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/arrow-up" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", d: "M11.2483 3.85905C11.6467 3.40376 12.3558 3.40375 12.7542 3.85905L17.5501 9.3405C18.1158 9.98708 17.6563 10.9997 16.7971 10.9997H13.5012V18.4997C13.501 19.3279 12.8295 19.9997 12.0012 19.9997C11.1729 19.9997 10.5014 19.3279 10.5012 18.4997V10.9997H7.20535C6.34619 10.9997 5.88666 9.98708 6.45242 9.3405L11.2483 3.85905Z", fill: "#3D3C3A" }))), EC = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/star" }, /* @__PURE__ */ A.createElement("path", { id: "Vector 234255911", d: "M11 16L15 12L11 8", stroke: "#3D3C3A", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }))), lb = "_redaction_dcm1f_1", sb = "_active_dcm1f_19", AC = "_sized_dcm1f_29", Of = 1800, jC = 1.3, ob = /* @__PURE__ */ A.createContext(null), Lr = () => A.useContext(ob);
let Tr = [];
const MC = () => {
  const a = Tr;
  Tr = [];
  const e = performance.now(), l = a.map((s) => {
    const r = s.getBoundingClientRect().top + window.scrollY;
    return -(((e - r * jC) % Of + Of) % Of);
  });
  a.forEach((s, r) => {
    s.style.setProperty("--wave-phase", `${Math.round(l[r])}ms`);
  });
}, Br = (a) => {
  a && (Tr.length === 0 && requestAnimationFrame(MC), Tr.push(a));
}, bh = (a) => a ? `${lb} ${sb}` : "", _C = 10, Qa = (a) => {
  const e = wt.c(7), {
    active: l,
    width: s,
    children: r
  } = a, c = r != null && r !== "", f = s ?? (!c && l ? _C : void 0), h = l ? Br : void 0, y = `
                ${lb}
                ${l ? sb : ""}
                ${f ? AC : ""}`;
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
}, Gi = (a) => {
  const e = wt.c(6), {
    className: l,
    as: s,
    active: r
  } = a, c = l === void 0 ? "" : l, f = s === void 0 ? "div" : s, h = Lr(), y = r ?? h ?? !0, m = bh(y), g = y ? Br : void 0, v = `${c} ${m}`;
  let b;
  e[0] !== v ? (b = v.trim(), e[0] = v, e[1] = b) : b = e[1];
  let T;
  return e[2] !== f || e[3] !== g || e[4] !== b ? (T = /* @__PURE__ */ p.jsx(f, {
    ref: g,
    className: b
  }), e[2] = f, e[3] = g, e[4] = b, e[5] = T) : T = e[5], T;
}, rb = (a) => {
  const e = wt.c(3), {
    active: l,
    children: s
  } = a, r = !!(l === void 0 || l);
  let c;
  return e[0] !== s || e[1] !== r ? (c = /* @__PURE__ */ p.jsx(ob.Provider, {
    value: r,
    children: s
  }), e[0] = s, e[1] = r, e[2] = c) : c = e[2], c;
}, xh = "_text_9l4iv_1", Cr = "_icon_9l4iv_28", ub = "_title32_9l4iv_34", cb = "_title24_9l4iv_35", fb = "_title20_9l4iv_36", db = "_body_9l4iv_56", hb = "_subtitle_9l4iv_63", mb = "_caption_9l4iv_70", DC = {
  text: xh,
  icon: Cr,
  title32: ub,
  title24: cb,
  title20: fb,
  body: db,
  subtitle: hb,
  caption: mb
}, RC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  body: db,
  caption: mb,
  default: DC,
  icon: Cr,
  subtitle: hb,
  text: xh,
  title20: fb,
  title24: cb,
  title32: ub
}, Symbol.toStringTag, { value: "Module" })), NC = {
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
}, st = (a) => {
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
  const T = v === void 0 ? "body" : v, S = Lr(), w = l || "div", E = g !== void 0 ? !!g : !!S, _ = g !== void 0 || S !== null, M = typeof g == "number" ? g : void 0;
  let j;
  e[12] !== E || e[13] !== f || e[14] !== _ || e[15] !== M ? (j = _ ? /* @__PURE__ */ p.jsx(Qa, {
    active: E,
    width: M,
    children: f
  }) : f, e[12] = E, e[13] = f, e[14] = _, e[15] = M, e[16] = j) : j = e[16];
  const R = j, B = s?.direction === "down" ? TC : CC, L = `${xh} ${RC[NC[T] || "body"]} ${h || ""}`, D = m || void 0, k = r || void 0, P = E || void 0;
  let H;
  e[17] !== B || e[18] !== s?.direction ? (H = s?.direction && /* @__PURE__ */ p.jsx(B, {
    className: Cr
  }), e[17] = B, e[18] = s?.direction, e[19] = H) : H = e[19];
  let I;
  e[20] !== c ? (I = c && /* @__PURE__ */ p.jsx(EC, {
    className: Cr
  }), e[20] = c, e[21] = I) : I = e[21];
  let K;
  return e[22] !== w || e[23] !== R || e[24] !== y || e[25] !== L || e[26] !== D || e[27] !== k || e[28] !== P || e[29] !== H || e[30] !== I || e[31] !== T || e[32] !== b ? (K = /* @__PURE__ */ p.jsxs(w, {
    ...y,
    className: L,
    "data-variant": T,
    "data-weight": b,
    "data-rounded": D,
    "data-caps": k,
    "data-skeleton": P,
    children: [H, R, I]
  }), e[22] = w, e[23] = R, e[24] = y, e[25] = L, e[26] = D, e[27] = k, e[28] = P, e[29] = H, e[30] = I, e[31] = T, e[32] = b, e[33] = K) : K = e[33], K;
}, Sh = {
  skin: "apple",
  isApple: !0,
  isMaterial: !1,
  setSkin: () => {
  }
}, pb = /* @__PURE__ */ A.createContext(Sh), Wi = () => A.useContext(pb) || Sh;
function OC(a) {
  const e = wt.c(3), {
    children: l
  } = a;
  let s;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (s = [], e[0] = s) : s = e[0], A.useEffect(zC, s);
  let r;
  return e[1] !== l ? (r = /* @__PURE__ */ p.jsx(pb.Provider, {
    value: Sh,
    children: l
  }), e[1] = l, e[2] = r) : r = e[2], r;
}
function zC() {
  document.body.classList.remove("material", "skin-switcher-active"), document.body.classList.add("apple");
}
const wh = "_button_1d7yf_1", yb = "_regular_1d7yf_21", gb = "_overlay_1d7yf_35", vb = "_secondary_1d7yf_42", bb = "_accent_1d7yf_47", Th = "_icon_1d7yf_53", Ch = "_label_1d7yf_57", Eh = "_content_1d7yf_61", LC = {
  button: wh,
  regular: yb,
  overlay: gb,
  secondary: vb,
  accent: bb,
  icon: Th,
  label: Ch,
  content: Eh
}, BC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accent: bb,
  button: wh,
  content: Eh,
  default: LC,
  icon: Th,
  label: Ch,
  overlay: gb,
  regular: yb,
  secondary: vb
}, Symbol.toStringTag, { value: "Module" })), _g = (a) => {
  const e = wt.c(16), {
    children: l,
    onClick: s,
    variant: r,
    ariaLabel: c,
    title: f
  } = a, h = r === void 0 ? "regular" : r, y = typeof l == "string", m = h === "regular" || h === "overlay", g = `${wh} ${BC[h]} ${y ? Ch : Th}`;
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
  e[2] !== m ? (T = m && /* @__PURE__ */ p.jsx(ys, {
    muted: !0
  }), e[2] = m, e[3] = T) : T = e[3];
  let S;
  e[4] !== l || e[5] !== y ? (S = y ? /* @__PURE__ */ p.jsx(st, {
    variant: "body",
    weight: "medium",
    children: l
  }) : l, e[4] = l, e[5] = y, e[6] = S) : S = e[6];
  let w;
  e[7] !== S ? (w = /* @__PURE__ */ p.jsx("span", {
    className: Eh,
    children: S
  }), e[7] = S, e[8] = w) : w = e[8];
  let E;
  return e[9] !== c || e[10] !== s || e[11] !== g || e[12] !== T || e[13] !== w || e[14] !== f ? (E = /* @__PURE__ */ p.jsxs(lw, {
    type: "button",
    className: g,
    onClick: s,
    "aria-label": c,
    title: f,
    whileTap: v,
    transition: b,
    children: [T, w]
  }), e[9] = c, e[10] = s, e[11] = g, e[12] = T, e[13] = w, e[14] = f, e[15] = E) : E = e[15], E;
}, VC = /* @__PURE__ */ A.createContext(!1), UC = "_root_125i3_1", Dg = "_side_125i3_9", kC = "_trailing_125i3_18", HC = "_middle_125i3_22", qC = "_middleOverlay_125i3_31", $C = "_titlePill_125i3_35", GC = "_titleContent_125i3_45", YC = "_inModal_125i3_59", XC = (a) => {
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
  } = a, w = b === void 0 ? !1 : b, E = T === void 0 ? !1 : T, {
    isApple: _
  } = Wi(), M = A.useContext(VC), j = w ? "overlay" : "regular";
  let R;
  e[0] !== S ? (R = /* @__PURE__ */ p.jsx(st, {
    variant: "body",
    weight: "semibold",
    children: S
  }), e[0] = S, e[1] = R) : R = e[1];
  const B = R, L = `${UC} ${M ? YC : ""}`;
  let D;
  e[2] !== j || e[3] !== l || e[4] !== c || e[5] !== f || e[6] !== r || e[7] !== s ? (D = l != null && /* @__PURE__ */ p.jsx(_g, {
    onClick: s,
    variant: r ?? j,
    ariaLabel: c,
    title: f,
    children: l
  }), e[2] = j, e[3] = l, e[4] = c, e[5] = f, e[6] = r, e[7] = s, e[8] = D) : D = e[8];
  let k;
  e[9] !== D ? (k = /* @__PURE__ */ p.jsx("div", {
    className: Dg,
    children: D
  }), e[9] = D, e[10] = k) : k = e[10];
  let P;
  e[11] !== j || e[12] !== y || e[13] !== h || e[14] !== g || e[15] !== v || e[16] !== m ? (P = h != null && /* @__PURE__ */ p.jsx(_g, {
    onClick: y,
    variant: m ?? j,
    ariaLabel: g,
    title: v,
    children: h
  }), e[11] = j, e[12] = y, e[13] = h, e[14] = g, e[15] = v, e[16] = m, e[17] = P) : P = e[17];
  let H;
  e[18] !== P ? (H = /* @__PURE__ */ p.jsx("div", {
    className: `${Dg} ${kC}`,
    children: P
  }), e[18] = P, e[19] = H) : H = e[19];
  const I = `${HC} ${w ? qC : ""}`;
  let K;
  e[20] !== _ || e[21] !== B || e[22] !== E ? (K = _ && E ? /* @__PURE__ */ p.jsxs("div", {
    className: $C,
    children: [/* @__PURE__ */ p.jsx(vh, {}), /* @__PURE__ */ p.jsx("span", {
      className: GC,
      children: B
    })]
  }) : B, e[20] = _, e[21] = B, e[22] = E, e[23] = K) : K = e[23];
  let Q;
  e[24] !== K || e[25] !== I ? (Q = /* @__PURE__ */ p.jsx("div", {
    className: I,
    children: K
  }), e[24] = K, e[25] = I, e[26] = Q) : Q = e[26];
  let at;
  return e[27] !== Q || e[28] !== L || e[29] !== k || e[30] !== H ? (at = /* @__PURE__ */ p.jsxs("div", {
    className: L,
    "data-modal-drag": "",
    children: [k, H, Q]
  }), e[27] = Q, e[28] = L, e[29] = k, e[30] = H, e[31] = at) : at = e[31], at;
}, PC = /* @__PURE__ */ A.createContext({
  inDetailPane: !1
}), KC = () => A.useContext(PC), Kt = () => {
}, Fo = () => ({
  show: Kt,
  hide: Kt,
  enable: Kt,
  disable: Kt,
  showProgress: Kt,
  hideProgress: Kt,
  setParams: Kt,
  setText: Kt,
  onClick: Kt,
  offClick: Kt
}), ZC = {
  initData: "",
  themeParams: {},
  viewportHeight: 0,
  BackButton: Fo(),
  SettingsButton: Fo(),
  MainButton: Fo(),
  SecondaryButton: Fo(),
  HapticFeedback: {
    impactOccurred: Kt,
    notificationOccurred: Kt,
    selectionChanged: Kt
  },
  onEvent: Kt,
  offEvent: Kt,
  expand: Kt,
  setHeaderColor: Kt,
  setBackgroundColor: Kt,
  setBottomBarColor: Kt,
  disableVerticalSwipes: Kt,
  enableVerticalSwipes: Kt,
  requestFullscreen: Kt,
  exitFullscreen: Kt,
  shareToStory: Kt
}, Sa = globalThis.Telegram?.WebApp ?? ZC;
function QC(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var zf = { exports: {} }, Lf, Rg;
function FC() {
  if (Rg) return Lf;
  Rg = 1;
  var a = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Lf = a, Lf;
}
var Bf, Ng;
function JC() {
  if (Ng) return Bf;
  Ng = 1;
  var a = /* @__PURE__ */ FC();
  function e() {
  }
  function l() {
  }
  return l.resetWarningCache = e, Bf = function() {
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
  }, Bf;
}
var Og;
function WC() {
  return Og || (Og = 1, zf.exports = /* @__PURE__ */ JC()()), zf.exports;
}
var IC = /* @__PURE__ */ WC();
const mn = /* @__PURE__ */ QC(IC);
mn.func;
const Ah = "_button_124dm_1", xb = "_filled_124dm_9", Sb = "_tinted_124dm_14", wb = "_plain_124dm_19", Tb = "_outlined_124dm_24", Cb = "_gray_124dm_28", Eb = "_disabled_124dm_33", jh = "_skeleton_124dm_38", Ab = "_wave_124dm_1", t8 = {
  button: Ah,
  filled: xb,
  tinted: Sb,
  plain: wb,
  outlined: Tb,
  gray: Cb,
  disabled: Eb,
  skeleton: jh,
  wave: Ab
}, e8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  button: Ah,
  default: t8,
  disabled: Eb,
  filled: xb,
  gray: Cb,
  outlined: Tb,
  plain: wb,
  skeleton: jh,
  tinted: Sb,
  wave: Ab
}, Symbol.toStringTag, { value: "Module" })), oe = (a) => {
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
  } = Wi(), g = !!Lr(), v = bh(g);
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
  let E;
  e[15] !== l ? (E = /* @__PURE__ */ p.jsx(st, {
    variant: "body",
    weight: "semibold",
    children: l
  }), e[15] = l, e[16] = E) : E = e[16];
  const _ = E, M = g ? Br : void 0, j = `${Ah} ${e8[f]} ${g ? jh : ""} ${v}`;
  let R;
  e[17] !== m || e[18] !== g ? (R = m && !g && {
    whileTap: {
      scale: 1.02
    }
  }, e[17] = m, e[18] = g, e[19] = R) : R = e[19];
  let B;
  e[20] !== g || e[21] !== f ? (B = f === "filled" && !g && /* @__PURE__ */ p.jsx(ys, {}), e[20] = g, e[21] = f, e[22] = B) : B = e[22];
  let L;
  e[23] !== _ || e[24] !== g ? (L = g ? /* @__PURE__ */ p.jsx(rb, {
    active: !1,
    children: _
  }) : _, e[23] = _, e[24] = g, e[25] = L) : L = e[25];
  let D;
  return e[26] !== w || e[27] !== s || e[28] !== B || e[29] !== L || e[30] !== M || e[31] !== j || e[32] !== R ? (D = /* @__PURE__ */ p.jsxs(Zi, {
    ref: M,
    className: j,
    ...R,
    ...w,
    ...s,
    children: [B, L]
  }), e[26] = w, e[27] = s, e[28] = B, e[29] = L, e[30] = M, e[31] = j, e[32] = R, e[33] = D) : D = e[33], D;
};
function jb(a) {
  var e, l, s = "";
  if (typeof a == "string" || typeof a == "number") s += a;
  else if (typeof a == "object") if (Array.isArray(a)) {
    var r = a.length;
    for (e = 0; e < r; e++) a[e] && (l = jb(a[e])) && (s && (s += " "), s += l);
  } else for (l in a) a[l] && (s && (s += " "), s += l);
  return s;
}
function n8() {
  for (var a, e, l = 0, s = "", r = arguments.length; l < r; l++) (a = arguments[l]) && (e = jb(a)) && (s && (s += " "), s += e);
  return s;
}
const Mb = (...a) => n8(...a), a8 = {
  SNACKBAR: {
    type: "spring",
    stiffness: 280,
    damping: 26
  }
}, _b = "_overlay_qo6yx_1", Db = "_opacity_qo6yx_2", Mh = "_fadeIn_qo6yx_6", _h = "_fadeOut_qo6yx_10", i8 = {
  overlay: _b,
  opacity: Db,
  fadeIn: Mh,
  fadeOut: _h,
  "overlay-out": "_overlay-out_qo6yx_1",
  "opacity-out": "_opacity-out_qo6yx_1"
}, l8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: i8,
  fadeIn: Mh,
  fadeOut: _h,
  opacity: Db,
  overlay: _b
}, Symbol.toStringTag, { value: "Module" })), s8 = typeof window < "u" && "ontouchstart" in window, o8 = 250;
function r8(a) {
  const e = wt.c(21);
  let l;
  e[0] !== a ? (l = a === void 0 ? {} : a, e[0] = a, e[1] = l) : l = e[1];
  const {
    onTap: s,
    onTapOut: r,
    mode: c,
    disabled: f
  } = l, h = l8[c === void 0 ? "overlay" : c], [y, m] = A.useState(!1);
  let g;
  e[2] !== h ? (g = [h], e[2] = h, e[3] = g) : g = e[3];
  const [v, b] = A.useState(g), T = A.useRef();
  let S;
  e[4] !== h || e[5] !== r ? (S = () => {
    m(!1), b([h, _h]), r?.(), T.current = window.setTimeout(() => {
      b([h]);
    }, o8);
  }, e[4] = h, e[5] = r, e[6] = S) : S = e[6];
  const w = S;
  let E;
  e[7] !== h || e[8] !== s ? (E = (D) => {
    clearTimeout(T.current), m(!0), b([h, Mh]), s?.(D);
  }, e[7] = h, e[8] = s, e[9] = E) : E = e[9];
  const _ = E;
  let M, j;
  e[10] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (M = () => () => clearTimeout(T.current), j = [], e[10] = M, e[11] = j) : (M = e[10], j = e[11]), A.useEffect(M, j);
  let R;
  e[12] !== f || e[13] !== _ || e[14] !== w || e[15] !== y ? (R = s8 ? {
    onTouchStart: (D) => {
      f || (D.touches.length === 1 ? _({
        target: D.currentTarget,
        clientX: D.touches[0].clientX,
        clientY: D.touches[0].clientY
      }) : w());
    },
    onTouchEnd: () => {
      f || y && w();
    },
    onPointerMove: (D) => {
      y && D.pointerType === "touch" && (D.movementY !== 0 || D.movementX !== 0) && w();
    },
    onTouchCancel: () => {
      y && w();
    }
  } : {
    onMouseLeave: () => {
      y && w();
    },
    onMouseDown: (D) => {
      f || _({
        target: D.currentTarget,
        clientX: D.clientX,
        clientY: D.clientY
      });
    },
    onMouseUp: () => {
      f || y && w();
    },
    onContextMenu: () => {
      y && w();
    }
  }, e[12] = f, e[13] = _, e[14] = w, e[15] = y, e[16] = R) : R = e[16];
  const B = R;
  let L;
  return e[17] !== B || e[18] !== y || e[19] !== v ? (L = [y, B, v], e[17] = B, e[18] = y, e[19] = v, e[20] = L) : L = e[20], L;
}
const u8 = "_root_1oiyj_1", c8 = "_fade_1oiyj_22", f8 = "_ripples_1oiyj_30", d8 = "_ripple_1oiyj_30", h8 = "_tapped_1oiyj_47", Jo = (...a) => a.filter(Boolean).join(" "), m8 = (a, e) => {
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
  } = Wi(), [y, m] = A.useState({}), [g, v, b] = r8({
    mode: s,
    disabled: r,
    onTap: ({
      target: w,
      clientX: E,
      clientY: _
    }) => {
      if (!h || !w) return;
      const {
        x: M,
        y: j,
        width: R,
        height: B
      } = w.getBoundingClientRect(), L = Math.max(R * 2, B * 2);
      m((D) => ({
        ...D,
        [`${performance.now()}`]: [E - M - L / 2, _ - j - L / 2, L]
      }));
    }
  }), T = s === "opacity", S = m8(c, v);
  return /* @__PURE__ */ p.jsxs(a, {
    ...S,
    disabled: r || void 0,
    className: Jo(u8, l, T && Jo(...b)),
    children: [e, f && !T && /* @__PURE__ */ p.jsx("div", {
      className: Jo(c8, ...b)
    }), h && /* @__PURE__ */ p.jsx("div", {
      className: f8,
      children: Object.entries(y).map(([w, E]) => /* @__PURE__ */ p.jsx("span", {
        className: Jo(d8, g && h8),
        style: {
          left: E[0],
          top: E[1],
          width: E[2],
          height: E[2]
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
}, p8 = "_label_1w5sq_1", y8 = "_accent_1w5sq_6", g8 = "_description_1w5sq_10", zg = "_caption_1w5sq_14", v8 = (a) => {
  const e = wt.c(15), {
    type: l,
    title: s,
    description: r,
    caption: c,
    bold: f
  } = a, h = f ? "medium" : "regular", y = `${p8} ${l === "Accent" ? y8 : ""}`;
  let m;
  e[0] !== s || e[1] !== h ? (m = /* @__PURE__ */ p.jsx(st, {
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
    className: c ? g8 : zg,
    children: /* @__PURE__ */ p.jsx(st, {
      variant: c ? "subheadline1" : "subheadline2",
      weight: "regular",
      children: r
    })
  }), e[6] = c, e[7] = r, e[8] = v) : v = e[8];
  let b;
  e[9] !== c ? (b = c && /* @__PURE__ */ p.jsx("div", {
    className: zg,
    children: /* @__PURE__ */ p.jsx(st, {
      variant: "subheadline2",
      weight: "regular",
      children: c
    })
  }), e[9] = c, e[10] = b) : b = e[10];
  let T;
  return e[11] !== g || e[12] !== v || e[13] !== b ? (T = /* @__PURE__ */ p.jsxs(p.Fragment, {
    children: [g, v, b]
  }), e[11] = g, e[12] = v, e[13] = b, e[14] = T) : T = e[14], T;
}, Rb = "_chevron_en74z_1", Nb = "_dropdown_en74z_8", Dh = "_colorpicker_en74z_12", Rh = "_picker_en74z_63", b8 = {
  chevron: Rb,
  dropdown: Nb,
  colorpicker: Dh,
  picker: Rh
}, Lg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  chevron: Rb,
  colorpicker: Dh,
  default: b8,
  dropdown: Nb,
  picker: Rh
}, Symbol.toStringTag, { value: "Module" })), x8 = (a) => {
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
      className: Rh,
      children: /* @__PURE__ */ p.jsx(st, {
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
    let R;
    e[8] !== M || e[9] !== b || e[10] !== c ? (R = b && /* @__PURE__ */ p.jsx("label", {
      htmlFor: M,
      children: /* @__PURE__ */ p.jsx(st, {
        variant: "body",
        weight: "regular",
        children: c
      })
    }), e[8] = M, e[9] = b, e[10] = c, e[11] = R) : R = e[11];
    let B;
    return e[12] !== j || e[13] !== R ? (B = /* @__PURE__ */ p.jsxs("div", {
      className: Dh,
      children: [j, R]
    }), e[12] = j, e[13] = R, e[14] = B) : B = e[14], B;
  }
  const T = Lg[l.toLowerCase()], S = Lg[s];
  let w;
  e[15] !== T || e[16] !== S ? (w = [T, S].filter(Boolean), e[15] = T, e[16] = S, e[17] = w) : w = e[17];
  const E = w.join(" ");
  let _;
  return e[18] !== r || e[19] !== E ? (_ = /* @__PURE__ */ p.jsx("div", {
    className: E,
    children: r
  }), e[18] = r, e[19] = E, e[20] = _) : _ = e[20], _;
}, S8 = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5ZM15.1016 9.01953C14.7891 8.70711 14.2821 8.70711 13.9697 9.01953L12.001 10.9873L10.0342 9.02051C9.72176 8.70809 9.21574 8.70809 8.90332 9.02051C8.5909 9.33293 8.5909 9.83895 8.90332 10.1514L10.8701 12.1191L9.02051 13.9697C8.70809 14.2821 8.70809 14.7882 9.02051 15.1006C9.33293 15.413 9.83895 15.413 10.1514 15.1006L12.001 13.25L13.8525 15.1016C14.165 15.414 14.672 15.414 14.9844 15.1016C15.2968 14.7891 15.2968 14.2821 14.9844 13.9697L13.1328 12.1182L15.1016 10.1514C15.414 9.83895 15.414 9.33195 15.1016 9.01953Z", fill: "#3D3C3A" }))), w8 = "_root_9aal5_1", T8 = "_input_9aal5_5", C8 = "_inputWithClearButton_9aal5_25", E8 = "_clearButtonIcon_9aal5_29", A8 = "_empty_9aal5_49", j8 = "_icon_9aal5_61", M8 = /* @__PURE__ */ A.forwardRef((a, e) => {
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
  const m = h, g = !y && A8;
  let v;
  l[7] !== g ? (v = [w8, g].filter(Boolean), l[7] = g, l[8] = v) : v = l[8];
  const b = v.join(" "), T = `${T8} ${c ? C8 : ""}`, S = !r;
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
  let E;
  l[17] !== s || l[18] !== c ? (E = c && /* @__PURE__ */ p.jsx("button", {
    type: "button",
    className: [j8, E8].filter(Boolean).join(" "),
    onClick: c,
    "aria-label": `Clear ${s}`,
    children: /* @__PURE__ */ p.jsx(S8, {})
  }), l[17] = s, l[18] = c, l[19] = E) : E = l[19];
  let _;
  return l[20] !== b || l[21] !== w || l[22] !== E ? (_ = /* @__PURE__ */ p.jsxs(st, {
    variant: "body",
    weight: "regular",
    className: b,
    children: [w, E]
  }), l[20] = b, l[21] = w, l[22] = E, l[23] = _) : _ = l[23], _;
}), Bg = "_root_1aqfj_1";
function _8(a) {
  const e = wt.c(15), {
    value: l,
    defaultValue: s,
    onChange: r,
    disabled: c,
    className: f
  } = a, h = s === void 0 ? !1 : s, y = c === void 0 ? !1 : c, m = l !== void 0, [g, v] = A.useState(h), b = m ? l : g;
  let T;
  e[0] !== r ? (T = (D) => {
    r && r(D);
  }, e[0] = r, e[1] = T) : T = e[1];
  const S = T;
  let w;
  e[2] !== b || e[3] !== S || e[4] !== m ? (w = () => {
    if (Sa.HapticFeedback.selectionChanged(), m) {
      S(!b);
      return;
    }
    v((D) => {
      const k = !D;
      return S(k), k;
    });
  }, e[2] = b, e[3] = S, e[4] = m, e[5] = w) : w = e[5];
  const E = w;
  let _;
  e[6] !== y || e[7] !== E ? (_ = (D) => {
    D.stopPropagation(), !y && E();
  }, e[6] = y, e[7] = E, e[8] = _) : _ = e[8];
  const M = _, j = f ? `${Bg} ${f}` : Bg, R = y || void 0, B = y || void 0;
  let L;
  return e[9] !== b || e[10] !== j || e[11] !== M || e[12] !== R || e[13] !== B ? (L = /* @__PURE__ */ p.jsx("div", {
    className: j,
    "data-state": b,
    "data-disabled": R,
    onClick: M,
    role: "switch",
    "aria-checked": b,
    "aria-disabled": B
  }), e[9] = b, e[10] = j, e[11] = M, e[12] = R, e[13] = B, e[14] = L) : L = e[14], L;
}
const D8 = (a) => {
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
  const m = f === void 0 ? !1 : f, g = h === void 0 ? !1 : h, v = y !== void 0, [b, T] = A.useState(m), S = v ? y : b;
  let w;
  e[8] !== s ? (w = (D) => {
    s && s(D);
  }, e[8] = s, e[9] = w) : w = e[9];
  const E = w;
  let _;
  e[10] !== E || e[11] !== v ? (_ = (D) => {
    v || T(D), E(D);
  }, e[10] = E, e[11] = v, e[12] = _) : _ = e[12];
  const M = _;
  let j;
  e[13] !== S || e[14] !== g || e[15] !== E || e[16] !== M || e[17] !== v ? (j = () => {
    if (!g) {
      if (Sa.HapticFeedback.selectionChanged(), v) {
        M(!S);
        return;
      }
      T((D) => {
        const k = !D;
        return E(k), k;
      });
    }
  }, e[13] = S, e[14] = g, e[15] = E, e[16] = M, e[17] = v, e[18] = j) : j = e[18];
  const R = j;
  let B;
  e[19] !== S || e[20] !== g || e[21] !== M ? (B = /* @__PURE__ */ p.jsx(Xn.Part, {
    type: "Switch",
    children: /* @__PURE__ */ p.jsx(_8, {
      value: S,
      onChange: M,
      disabled: g
    })
  }), e[19] = S, e[20] = g, e[21] = M, e[22] = B) : B = e[22];
  let L;
  return e[23] !== l || e[24] !== R || e[25] !== r || e[26] !== c || e[27] !== B ? (L = /* @__PURE__ */ p.jsx(Xn, {
    start: c,
    end: B,
    onClick: R,
    ...r,
    children: l
  }), e[23] = l, e[24] = R, e[25] = r, e[26] = c, e[27] = B, e[28] = L) : L = e[28], L;
}, Vg = "_root_146xt_10", R8 = "_start_146xt_32", N8 = "_image_146xt_37", O8 = "_icon_146xt_45", z8 = "_body_146xt_57", L8 = "_end_146xt_65", B8 = "_caption_146xt_76", V8 = "_label_146xt_80", U8 = (a) => {
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
    className: R8,
    children: f
  }), e[8] = f, e[9] = v) : v = e[9];
  let b;
  e[10] !== l ? (b = /* @__PURE__ */ p.jsx("div", {
    className: z8,
    children: l
  }), e[10] = l, e[11] = b) : b = e[11];
  let T;
  e[12] !== s ? (T = s && /* @__PURE__ */ p.jsx("div", {
    className: L8,
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
      className: Vg,
      onClick: r,
      ...c,
      children: w
    }), e[18] = m, e[19] = w, e[20] = r, e[21] = c, e[22] = _) : _ = e[22], _;
  }
  let E;
  return e[23] !== m || e[24] !== w || e[25] !== r || e[26] !== c ? (E = /* @__PURE__ */ p.jsx(Te, {
    as: m,
    className: Vg,
    onClick: r,
    ...c,
    children: w
  }), e[23] = m, e[24] = w, e[25] = r, e[26] = c, e[27] = E) : E = e[27], E;
}, k8 = (a) => {
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
        className: N8
      }), e[0] = c, e[1] = m) : m = e[1], h = m;
      break t;
    }
    case "Icon": {
      let m;
      e[2] !== f ? (m = /* @__PURE__ */ p.jsx("div", {
        className: O8,
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
}, H8 = (a) => {
  const e = wt.c(7), {
    label: l,
    caption: s
  } = a;
  let r;
  e[0] !== l ? (r = /* @__PURE__ */ p.jsx("div", {
    className: V8,
    children: /* @__PURE__ */ p.jsx(st, {
      variant: "body",
      weight: "regular",
      children: l
    })
  }), e[0] = l, e[1] = r) : r = e[1];
  let c;
  e[2] !== s ? (c = s && /* @__PURE__ */ p.jsx("div", {
    className: B8,
    children: /* @__PURE__ */ p.jsx(st, {
      variant: "subheadline2",
      weight: "regular",
      children: s
    })
  }), e[2] = s, e[3] = c) : c = e[3];
  let f;
  return e[4] !== r || e[5] !== c ? (f = /* @__PURE__ */ p.jsxs(p.Fragment, {
    children: [r, c]
  }), e[4] = r, e[5] = c, e[6] = f) : f = e[6], f;
}, Xn = Object.assign(U8, {
  Start: k8,
  End: H8,
  Part: x8,
  Text: v8,
  Editable: M8,
  Switch: D8
});
zr.section;
gh[16];
function q8(a, e, l) {
  const s = wt.c(8);
  let r;
  s[0] !== l ? (r = {}, s[0] = l, s[1] = r) : r = s[1];
  const {
    enabled: c
  } = r, f = c === void 0 ? !0 : c, h = A.useRef(e);
  let y;
  s[2] !== e ? (y = () => {
    h.current = e;
  }, s[2] = e, s[3] = y) : y = s[3], A.useEffect(y);
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
const Vf = (a, e, l) => Math.min(Math.max(a, e), l), $8 = /* @__PURE__ */ A.createContext({
  colorScheme: "light",
  setColorScheme: () => {
  },
  toggleColorScheme: () => {
  }
}), G8 = ["light", "dark"], Sd = (a) => G8.includes(a), wd = () => {
  if (typeof window > "u" || typeof document > "u")
    return null;
  const a = window.getComputedStyle(document.documentElement).getPropertyValue("--tg-color-scheme").trim();
  return Sd(a) ? a : null;
}, Ob = () => typeof window > "u" || !window.matchMedia ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light", Y8 = () => wd() ?? Ob(), X8 = typeof window > "u" ? A.useEffect : A.useLayoutEffect, P8 = (a) => {
  const e = wt.c(20), {
    children: l,
    defaultColorScheme: s,
    onColorSchemeChange: r
  } = a, [c, f] = A.useState(Y8);
  let h;
  e[0] !== s ? (h = () => Sd(s) ? s : null, e[0] = s, e[1] = h) : h = e[1];
  const [y, m] = A.useState(h), g = y ?? c;
  let v;
  e[2] !== g || e[3] !== r ? (v = (L) => {
    const D = typeof L == "function" ? L(g) : L;
    Sd(D) && (m(D), r?.(D));
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
  }, E = [g], e[8] = g, e[9] = w, e[10] = E) : (w = e[9], E = e[10]), X8(w, E);
  let _, M;
  e[11] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (_ = () => {
    const L = () => {
      const P = wd();
      if (P) {
        f(P);
        return;
      }
      f(Ob());
    }, D = (P) => {
      wd() || f(P.matches ? "dark" : "light");
    };
    L();
    const k = window.matchMedia("(prefers-color-scheme: dark)");
    return Sa.onEvent("themeChanged", L), k.addEventListener("change", D), () => {
      Sa.offEvent("themeChanged", L), k.removeEventListener("change", D);
    };
  }, M = [], e[11] = _, e[12] = M) : (_ = e[11], M = e[12]), A.useEffect(_, M);
  let j;
  e[13] !== g || e[14] !== b || e[15] !== S ? (j = {
    colorScheme: g,
    setColorScheme: b,
    toggleColorScheme: S
  }, e[13] = g, e[14] = b, e[15] = S, e[16] = j) : j = e[16];
  const R = j;
  let B;
  return e[17] !== l || e[18] !== R ? (B = /* @__PURE__ */ p.jsx($8.Provider, {
    value: R,
    children: l
  }), e[17] = l, e[18] = R, e[19] = B) : B = e[19], B;
}, K8 = ({
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
}, Z8 = (a) => {
  const e = wt.c(15);
  let l, s, r;
  e[0] !== a ? ({
    className: l,
    onLoad: s,
    ...r
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r) : (l = e[1], s = e[2], r = e[3]);
  let c;
  e[4] !== r ? (c = () => K8(r), e[4] = r, e[5] = c) : c = e[5];
  const [f, h] = A.useState(c);
  let y;
  e[6] !== s ? (y = (b) => {
    h(!0), s?.(b);
  }, e[6] = s, e[7] = y) : y = e[7];
  const m = f && "opacity-100";
  let g;
  e[8] !== l || e[9] !== m ? (g = Mb("rounded-[inherit] opacity-0 transition-opacity duration-250 ease-[cubic-bezier(0.23,1,0.32,1)]", m, l), e[8] = l, e[9] = m, e[10] = g) : g = e[10];
  let v;
  return e[11] !== r || e[12] !== y || e[13] !== g ? (v = /* @__PURE__ */ p.jsx("img", {
    onLoad: y,
    className: g,
    ...r
  }), e[11] = r, e[12] = y, e[13] = g, e[14] = v) : v = e[14], v;
}, Q8 = "_img_95uc6_1", F8 = "_imgRedacted_95uc6_9", J8 = "_shapeCircle_95uc6_13", W8 = "_shapeRounded_95uc6_21", I8 = /* @__PURE__ */ A.forwardRef((a, e) => {
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
  } = Wi(), v = !!Lr(), b = bh(v);
  g && (y = 42);
  let T;
  l[0] !== v || l[1] !== e ? (T = (j) => {
    v && Br(j), typeof e == "function" ? e(j) : e && (e.current = j);
  }, l[0] = v, l[1] = e, l[2] = T) : T = l[2];
  const S = `
                    ${m === "circle" ? J8 : ""}
                    ${m === "rounded" ? W8 : ""}
                    ${b}
                    ${r || ""}`;
  let w;
  l[3] !== y || l[4] !== c ? (w = {
    width: y,
    height: y,
    ...c
  }, l[3] = y, l[4] = c, l[5] = w) : w = l[5];
  const E = `${Q8} ${v ? F8 : ""}`;
  let _;
  l[6] !== f || l[7] !== E ? (_ = /* @__PURE__ */ p.jsx(Z8, {
    src: f,
    className: E
  }), l[6] = f, l[7] = E, l[8] = _) : _ = l[8];
  let M;
  return l[9] !== T || l[10] !== S || l[11] !== w || l[12] !== _ ? (M = /* @__PURE__ */ p.jsx("div", {
    ref: T,
    className: S,
    style: w,
    children: _
  }), l[9] = T, l[10] = S, l[11] = w, l[12] = _, l[13] = M) : M = l[13], M;
}), tE = /* @__PURE__ */ A.forwardRef((a, e) => {
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
  return l[5] !== s || l[6] !== h || l[7] !== r || l[8] !== e || l[9] !== f ? (y = /* @__PURE__ */ p.jsx(bC, {
    ref: e,
    href: f,
    onClick: h,
    ...r,
    children: s
  }), l[5] = s, l[6] = h, l[7] = r, l[8] = e, l[9] = f, l[10] = y) : y = l[10], y;
});
tE.displayName = "TransitionLink";
const zb = ({
  children: a
}) => a;
zb.isModalPage = !0;
zb.propTypes = {
  id: mn.string.isRequired,
  children: mn.node
};
zr.modal;
gh[16];
const eE = (a) => {
  const e = wt.c(2), {
    children: l
  } = a;
  let s;
  return e[0] !== l ? (s = /* @__PURE__ */ p.jsx(vT, {
    features: eC,
    strict: !0,
    children: l
  }), e[0] = l, e[1] = s) : s = e[1], s;
}, {
  setHeaderColor: nE,
  setBackgroundColor: aE
} = Sa, Ii = (a) => {
  const e = wt.c(18), {
    children: l,
    mode: s,
    headerColor: r,
    backgroundColor: c,
    expandOnMount: f
  } = a, h = s === void 0 ? "secondary" : s, {
    inDetailPane: y,
    setPaneBackground: m
  } = KC();
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
  let _, M;
  e[2] !== f ? (_ = () => {
    f && Sa.expand();
  }, M = [f], e[2] = f, e[3] = _, e[4] = M) : (_ = e[3], M = e[4]), A.useEffect(_, M);
  let j, R;
  e[5] !== E || e[6] !== y || e[7] !== w || e[8] !== S ? (j = () => {
    y || (Sa.initData ? (aE(w), nE(S)) : document.body.style.backgroundColor = E, document.body.style.setProperty("--page-background", E));
  }, R = [w, S, E, y], e[5] = E, e[6] = y, e[7] = w, e[8] = S, e[9] = j, e[10] = R) : (j = e[9], R = e[10]), A.useEffect(j, R);
  let B, L;
  e[11] !== E || e[12] !== y || e[13] !== m ? (B = () => {
    !y || !m || m(E);
  }, L = [y, m, E], e[11] = E, e[12] = y, e[13] = m, e[14] = B, e[15] = L) : (B = e[14], L = e[15]), A.useEffect(B, L);
  let D;
  return e[16] !== l ? (D = /* @__PURE__ */ p.jsx(p.Fragment, {
    children: l
  }), e[16] = l, e[17] = D) : D = e[17], D;
};
Ii.propTypes = {
  children: mn.node,
  mode: mn.oneOf(["primary", "secondary"]),
  headerColor: mn.string,
  backgroundColor: mn.string,
  expandOnMount: mn.bool
};
const iE = "_root_125s3_1", lE = "_card_125s3_16", sE = "_container_125s3_22", Uf = "flex justify-between gap-compact px-content py-10 text-section";
function Ug(a) {
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
      e[5] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (f = Mb(Uf, "text-foreground"), e[5] = f) : f = e[5];
      let h;
      e[6] !== s ? (h = /* @__PURE__ */ p.jsx(st, {
        variant: "title3",
        weight: "bold",
        children: s
      }), e[6] = s, e[7] = h) : h = e[7];
      let y;
      e[8] !== c ? (y = c && /* @__PURE__ */ p.jsx(st, {
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
      e[14] !== s ? (f = /* @__PURE__ */ p.jsx(st, {
        variant: "footnote",
        children: s
      }), e[14] = s, e[15] = f) : f = e[15];
      let h;
      return e[16] !== l || e[17] !== f ? (h = /* @__PURE__ */ p.jsx("div", {
        className: Uf,
        ...l,
        children: f
      }), e[16] = l, e[17] = f, e[18] = h) : h = e[18], h;
    }
    default: {
      let f;
      e[19] !== s ? (f = /* @__PURE__ */ p.jsx(st, {
        variant: "body",
        weight: "semibold",
        children: s
      }), e[19] = s, e[20] = f) : f = e[20];
      let h;
      e[21] !== c ? (h = c && /* @__PURE__ */ p.jsx(st, {
        variant: "footnote",
        children: c
      }), e[21] = c, e[22] = h) : h = e[22];
      let y;
      return e[23] !== l || e[24] !== f || e[25] !== h ? (y = /* @__PURE__ */ p.jsxs("div", {
        className: Uf,
        ...l,
        children: [f, h]
      }), e[23] = l, e[24] = f, e[25] = h, e[26] = y) : y = e[26], y;
    }
  }
}
const oE = zr.section, rE = gh[16], uE = 0.6, yt = (a) => {
  const e = wt.c(6);
  let l, s;
  e[0] !== a ? ({
    children: l,
    ...s
  } = a, e[0] = a, e[1] = l, e[2] = s) : (l = e[1], s = e[2]);
  let r;
  return e[3] !== l || e[4] !== s ? (r = /* @__PURE__ */ p.jsx("section", {
    className: iE,
    ...s,
    children: l
  }), e[3] = l, e[4] = s, e[5] = r) : r = e[5], r;
}, cE = (a) => {
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
  } = Wi(), h = A.useRef(null), y = A.useRef(null), m = f ? oE : rE;
  let g;
  e[5] !== m ? (g = {
    radius: m,
    smoothing: uE
  }, e[5] = m, e[6] = g) : g = e[6];
  let v;
  e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = {
    autoEffects: !1
  }, e[7] = v) : v = e[7], F2(f ? y : h, g, v);
  let b;
  e[8] !== r ? (b = r && /* @__PURE__ */ p.jsx(Ug, {
    title: r
  }), e[8] = r, e[9] = b) : b = e[9];
  let T;
  e[10] !== l ? (T = /* @__PURE__ */ p.jsx("div", {
    ref: y,
    className: sE,
    children: l
  }), e[10] = l, e[11] = T) : T = e[11];
  let S;
  e[12] !== b || e[13] !== T ? (S = /* @__PURE__ */ p.jsxs("div", {
    ref: h,
    className: lE,
    children: [b, T]
  }), e[12] = b, e[13] = T, e[14] = S) : S = e[14];
  let w;
  e[15] !== s ? (w = s && /* @__PURE__ */ p.jsx(Ug, {
    type: "Footer",
    title: s
  }), e[15] = s, e[16] = w) : w = e[16];
  let E;
  return e[17] !== c || e[18] !== S || e[19] !== w ? (E = /* @__PURE__ */ p.jsxs("section", {
    ...c,
    children: [S, w]
  }), e[17] = c, e[18] = S, e[19] = w, e[20] = E) : E = e[20], E;
};
yt.Item = cE;
const fE = "_root_cnxqv_1", dE = "_icon_cnxqv_17", hE = "_content_cnxqv_42", mE = "_title_cnxqv_55", pE = "_description_cnxqv_56", yE = "_action_cnxqv_61", gE = "_link_cnxqv_61", vE = "_host_cnxqv_92", bE = "_host_top_cnxqv_105", xE = "_host_bottom_cnxqv_109", SE = "_item_cnxqv_114", wE = (a) => {
  const e = wt.c(19), {
    icon: l,
    title: s,
    description: r,
    link: c,
    action: f
  } = a, h = !!r;
  let y;
  e[0] !== l ? (y = l ? /* @__PURE__ */ p.jsx("div", {
    className: dE,
    "aria-hidden": "true",
    children: l
  }) : null, e[0] = l, e[1] = y) : y = e[1];
  const m = h ? "semibold" : void 0;
  let g;
  e[2] !== m || e[3] !== s ? (g = /* @__PURE__ */ p.jsx(st, {
    as: "p",
    className: mE,
    variant: "subheadline2",
    weight: m,
    children: s
  }), e[2] = m, e[3] = s, e[4] = g) : g = e[4];
  let v;
  e[5] !== r ? (v = r ? /* @__PURE__ */ p.jsx(st, {
    as: "p",
    className: pE,
    variant: "subheadline2",
    children: r
  }) : null, e[5] = r, e[6] = v) : v = e[6];
  let b;
  e[7] !== c ? (b = c ? /* @__PURE__ */ p.jsx("button", {
    type: "button",
    className: gE,
    onClick: c.onClick,
    children: /* @__PURE__ */ p.jsx(st, {
      as: "span",
      variant: "subheadline2",
      children: c.label
    })
  }) : null, e[7] = c, e[8] = b) : b = e[8];
  let T;
  e[9] !== g || e[10] !== v || e[11] !== b ? (T = /* @__PURE__ */ p.jsxs("div", {
    className: hE,
    children: [g, v, b]
  }), e[9] = g, e[10] = v, e[11] = b, e[12] = T) : T = e[12];
  let S;
  e[13] !== f ? (S = f ? /* @__PURE__ */ p.jsx("button", {
    type: "button",
    className: yE,
    onClick: f.onClick,
    children: /* @__PURE__ */ p.jsx(st, {
      as: "span",
      variant: "body",
      children: f.label
    })
  }) : null, e[13] = f, e[14] = S) : S = e[14];
  let w;
  return e[15] !== y || e[16] !== T || e[17] !== S ? (w = /* @__PURE__ */ p.jsxs("div", {
    className: fE,
    role: "status",
    "aria-live": "polite",
    children: [y, T, S]
  }), e[15] = y, e[16] = T, e[17] = S, e[18] = w) : w = e[18], w;
};
mn.shape({
  label: mn.node.isRequired,
  onClick: mn.func
});
const TE = 4e3, CE = 100, EE = 500, AE = (a) => {
  if (a)
    try {
      Sa.HapticFeedback?.notificationOccurred(a);
    } catch {
    }
}, jE = (a) => {
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
  } = l, T = g === void 0 ? "bottom" : g, S = v === void 0 ? TE : v, w = nC(), [E, _] = A.useState(!1), [M, j] = A.useState(0);
  let R;
  e[0] !== r || e[1] !== s ? (R = () => s(r), e[0] = r, e[1] = s, e[2] = R) : R = e[2];
  const B = R;
  let L, D;
  e[3] !== b ? (L = () => {
    AE(b);
  }, D = [b], e[3] = b, e[4] = L, e[5] = D) : (L = e[4], D = e[5]), A.useEffect(L, D);
  let k, P;
  e[6] !== B || e[7] !== S || e[8] !== E ? (k = () => {
    if (!S || E)
      return;
    const Rt = setTimeout(B, S);
    return () => clearTimeout(Rt);
  }, P = [S, E, B], e[6] = B, e[7] = S, e[8] = E, e[9] = k, e[10] = P) : (k = e[9], P = e[10]), A.useEffect(k, P);
  const H = T === "top" ? -32 : 32, I = b === "error";
  let K;
  e[11] !== w || e[12] !== H ? (K = w ? {
    opacity: 0
  } : {
    opacity: 0,
    y: H,
    scale: 0.96
  }, e[11] = w, e[12] = H, e[13] = K) : K = e[13];
  const Q = K;
  let at;
  e[14] !== I || e[15] !== w ? (at = w ? {
    opacity: 1
  } : {
    opacity: 1,
    y: 0,
    scale: 1,
    x: I ? [0, -10, 10, -7, 7, -3, 3, 0] : 0,
    transition: {
      default: a8.SNACKBAR,
      ...I && {
        x: {
          duration: 0.45,
          ease: "easeOut",
          delay: 0.18
        }
      }
    }
  }, e[14] = I, e[15] = w, e[16] = at) : at = e[16];
  const ot = at;
  let V;
  e[17] !== M || e[18] !== w || e[19] !== H ? (V = w ? {
    opacity: 0,
    transition: {
      duration: 0.15
    }
  } : {
    opacity: 0,
    x: M * 400,
    y: M === 0 ? H : 0,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }, e[17] = M, e[18] = w, e[19] = H, e[20] = V) : V = e[20];
  const J = V;
  let et;
  e[21] !== B ? (et = (Rt, it) => {
    _(!1);
    const Tt = it.offset.x, Gt = it.velocity.x;
    (Math.abs(Tt) > CE || Math.abs(Gt) > EE) && (j(Tt >= 0 ? 1 : -1), B());
  }, e[21] = B, e[22] = et) : et = e[22];
  const nt = et;
  let ut;
  e[23] !== B ? (ut = (Rt) => {
    if (Rt)
      return {
        ...Rt,
        onClick: () => {
          Rt.onClick?.(), B();
        }
      };
  }, e[23] = B, e[24] = ut) : ut = e[24];
  const N = ut, Y = w ? !1 : "x";
  let tt;
  e[25] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (tt = () => _(!0), e[25] = tt) : tt = e[25];
  let lt;
  e[26] !== y || e[27] !== N ? (lt = N(y), e[26] = y, e[27] = N, e[28] = lt) : lt = e[28];
  let dt;
  e[29] !== m || e[30] !== N ? (dt = N(m), e[29] = m, e[30] = N, e[31] = dt) : dt = e[31];
  let ht;
  e[32] !== h || e[33] !== c || e[34] !== lt || e[35] !== dt || e[36] !== f ? (ht = /* @__PURE__ */ p.jsx(wE, {
    icon: c,
    title: f,
    description: h,
    link: lt,
    action: dt
  }), e[32] = h, e[33] = c, e[34] = lt, e[35] = dt, e[36] = f, e[37] = ht) : ht = e[37];
  let gt;
  return e[38] !== ot || e[39] !== J || e[40] !== nt || e[41] !== Q || e[42] !== Y || e[43] !== ht ? (gt = /* @__PURE__ */ p.jsx(Zi, {
    className: SE,
    initial: Q,
    animate: ot,
    exit: J,
    layout: !0,
    drag: Y,
    dragSnapToOrigin: !0,
    dragElastic: 0.6,
    dragMomentum: !1,
    onDragStart: tt,
    onDragEnd: nt,
    children: ht
  }), e[38] = ot, e[39] = J, e[40] = nt, e[41] = Q, e[42] = Y, e[43] = ht, e[44] = gt) : gt = e[44], gt;
}, Lb = {
  top: bE,
  bottom: xE
}, ME = Object.keys(Lb), _E = (a) => {
  const e = wt.c(5), {
    snackbars: l,
    onDismiss: s
  } = a;
  let r;
  e[0] !== s || e[1] !== l ? (r = ME.map((f) => {
    const h = l.filter((y) => (y.position ?? "bottom") === f);
    return /* @__PURE__ */ p.jsx("div", {
      className: `${vE} ${Lb[f]}`,
      children: /* @__PURE__ */ p.jsx(gT, {
        initial: !1,
        children: h.map((y) => /* @__PURE__ */ p.jsx(jE, {
          item: y,
          onDismiss: s
        }, y.id))
      })
    }, f);
  }), e[0] = s, e[1] = l, e[2] = r) : r = e[2];
  let c;
  return e[3] !== r ? (c = /* @__PURE__ */ Or.createPortal(/* @__PURE__ */ p.jsx(p.Fragment, {
    children: r
  }), document.body), e[3] = r, e[4] = c) : c = e[4], c;
}, Bb = /* @__PURE__ */ A.createContext(null), DE = () => {
  const a = A.useContext(Bb);
  if (!a)
    throw new Error("useSnackbar must be used inside <SnackbarProvider>");
  return a;
}, Vb = (a) => {
  const e = wt.c(9), {
    children: l
  } = a;
  let s;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (s = [], e[0] = s) : s = e[0];
  const [r, c] = A.useState(s), f = A.useRef(0);
  let h;
  e[1] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (h = (S) => {
    c((w) => w.filter((E) => E.id !== S));
  }, e[1] = h) : h = e[1];
  const y = h;
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
    dismiss: y
  }, e[3] = v) : v = e[3];
  let b;
  e[4] !== r ? (b = /* @__PURE__ */ p.jsx(_E, {
    snackbars: r,
    onDismiss: y
  }), e[4] = r, e[5] = b) : b = e[5];
  let T;
  return e[6] !== l || e[7] !== b ? (T = /* @__PURE__ */ p.jsxs(Bb.Provider, {
    value: v,
    children: [l, b]
  }), e[6] = l, e[7] = b, e[8] = T) : T = e[8], T;
}, RE = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/loader" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", d: "M12 3.02148C16.9704 3.02148 20.9997 7.07957 21 12.0859C21 17.0925 16.9706 21.1514 12 21.1514C7.02944 21.1514 3 17.0925 3 12.0859C3.00026 11.5299 3.44787 11.0791 4 11.0791C4.55213 11.0791 4.99974 11.5299 5 12.0859C5 15.9799 8.13401 19.1367 12 19.1367C15.866 19.1367 19 15.9799 19 12.0859C18.9997 8.19215 15.8658 5.03613 12 5.03613C9.64439 5.03613 7.56033 6.20674 6.29004 8.00684C5.97018 8.46016 5.34566 8.56708 4.89551 8.24512C4.44533 7.92286 4.33924 7.29328 4.65918 6.83984C6.28848 4.53074 8.96935 3.02148 12 3.02148Z", fill: "#3D3C3A" }))), NE = "_centered_1ma1e_1", OE = "_spinner_1ma1e_8", Nh = (a) => {
  const e = wt.c(15);
  let l, s, r, c;
  e[0] !== a ? ({
    centered: l,
    className: s,
    size: c,
    ...r
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c) : (l = e[1], s = e[2], r = e[3], c = e[4]);
  let f;
  e[5] !== s ? (f = [OE, s].filter(Boolean), e[5] = s, e[6] = f) : f = e[6];
  const h = f.join(" ");
  let y;
  e[7] !== c ? (y = c ? {
    width: c,
    height: c
  } : void 0, e[7] = c, e[8] = y) : y = e[8];
  const m = y;
  let g;
  e[9] !== h || e[10] !== r || e[11] !== m ? (g = /* @__PURE__ */ p.jsx(RE, {
    ...r,
    className: h,
    style: m
  }), e[9] = h, e[10] = r, e[11] = m, e[12] = g) : g = e[12];
  const v = g;
  if (l) {
    let b;
    return e[13] !== v ? (b = /* @__PURE__ */ p.jsx("div", {
      className: NE,
      children: v
    }), e[13] = v, e[14] = b) : b = e[14], b;
  }
  return v;
}, zE = "_root_warzp_1", LE = "_gradient_warzp_71", BE = "_clipPathContainer_warzp_113", VE = "_tab_1mynw_1", UE = "_icon_1mynw_37", kE = "_active_1mynw_62", Ub = (a) => {
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
  const g = `${VE} ${s ? kE : ""} ${y}`;
  let v;
  e[8] !== g ? (v = g.trim(), e[8] = g, e[9] = v) : v = e[9];
  let b;
  e[10] !== l ? (b = /* @__PURE__ */ p.jsx(Zi, {
    layout: !0,
    className: UE,
    children: l
  }), e[10] = l, e[11] = b) : b = e[11];
  let T;
  e[12] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (T = {
    display: "inline-block"
  }, e[12] = T) : T = e[12];
  let S;
  e[13] !== r ? (S = /* @__PURE__ */ p.jsx(sw, {
    layout: !0,
    style: T,
    children: r
  }), e[13] = r, e[14] = S) : S = e[14];
  let w;
  return e[15] !== c || e[16] !== f || e[17] !== v || e[18] !== b || e[19] !== S ? (w = /* @__PURE__ */ p.jsxs(Zi, {
    layout: !0,
    transition: m,
    ...f,
    className: v,
    onClick: c,
    children: [b, S]
  }), e[15] = c, e[16] = f, e[17] = v, e[18] = b, e[19] = S, e[20] = w) : w = e[20], w;
};
function HE({
  tabsLength: a,
  activeIndex: e,
  onSnapToSame: l,
  onSnapToNew: s,
  spring: r
}) {
  const c = A.useRef(null), [f, h] = A.useState(!1), [y, m] = A.useState(null), g = A.useRef(null), v = A.useRef(!1), b = A.useRef(null), T = A.useRef(0), S = 6, w = 100 / a, E = `calc(${w}% + 7.33px - 4px)`, _ = `calc(${w * e}% - ${3.67 * e}px)`, M = _, j = `calc(100% - (${_} + ${E}) - 2.33px * ${e})`, R = f && y != null ? `inset(0 ${100 - (y + w)}% 0 ${y}% round 100px)` : `inset(0 ${j} 0 ${M} round 100px)`, B = f ? {
    clipPath: {
      duration: 0
    }
  } : {
    clipPath: r
  }, L = (Q) => {
    const at = c.current;
    if (!at) return;
    const ot = at.getBoundingClientRect(), V = Q - ot.left, J = ot.width;
    if (J <= 0) return;
    const et = V / J * 100, nt = Vf(et - w / 2, 0, 100 - w);
    m(nt);
  }, D = (Q) => {
    v.current = !0, b.current = Q.pointerId, T.current = Q.clientX;
  }, k = (Q) => {
    if (!(b.current != null && Q.pointerId !== b.current)) {
      if (!f) {
        if (!v.current) return;
        if (Math.abs(Q.clientX - T.current) >= S) {
          try {
            Q.currentTarget.setPointerCapture?.(Q.pointerId), g.current = Q.pointerId;
          } catch {
          }
          h(!0), L(Q.clientX), Q.preventDefault();
        }
        return;
      }
      g.current != null && Q.pointerId !== g.current || (L(Q.clientX), Q.preventDefault());
    }
  }, P = (Q) => {
    const at = c.current;
    let ot = e;
    if (at && typeof Q == "number") {
      const V = at.getBoundingClientRect(), J = Q - V.left, et = V.width;
      if (et > 0) {
        const nt = et / a;
        ot = Vf(Math.round(J / nt - 0.5), 0, a - 1);
      }
    } else if (y != null) {
      const V = 100 / a;
      ot = Vf(Math.round(y / V), 0, a - 1);
    }
    ot === e ? l?.() : s?.(ot), h(!1), m(null), g.current = null;
  }, H = (Q) => {
    if (v.current = !1, b.current = null, !!f && !(g.current != null && Q.pointerId !== g.current)) {
      try {
        Q.currentTarget.releasePointerCapture?.(Q.pointerId);
      } catch {
      }
      P(Q.clientX), Q.preventDefault();
    }
  }, I = (Q) => {
    v.current = !1, b.current = null, f && (P(Q?.clientX), Q.preventDefault?.());
  }, K = (Q) => {
    f && P(Q?.clientX);
  };
  return A.useEffect(() => {
    const Q = () => {
      h(!1), m(null), g.current = null, v.current = !1, b.current = null;
    };
    return window.addEventListener("blur", Q), () => window.removeEventListener("blur", Q);
  }, []), {
    overlayRef: c,
    isDragging: f,
    animate: {
      clipPath: R
    },
    transition: B,
    handlers: {
      onPointerDown: D,
      onPointerMove: k,
      onPointerUp: H,
      onPointerCancel: I,
      onPointerLeave: K
    }
  };
}
function qE(a) {
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
  const y = h, m = c === void 0 ? 64 : c, g = A.useId();
  if (!l || !s)
    return null;
  const {
    top: v,
    right: b,
    bottom: T,
    left: S
  } = y, w = l + S + b, E = m + v + T, _ = Math.max(0, w - S - b), M = Math.min(m / 2, _ / 2, 999), j = `grad-${g}`, R = `mask-${g}`, B = Math.max(S, b), L = Math.max(v, T), D = `0 0 ${w} ${E}`;
  let k;
  e[2] !== f ? (k = [LE, f].filter(Boolean), e[2] = f, e[3] = k) : k = e[3];
  const P = k.join(" "), H = `${B}px`, I = `${L}px`;
  let K;
  e[4] !== H || e[5] !== I ? (K = {
    "--overlay-padding-x": H,
    "--overlay-padding-y": I
  }, e[4] = H, e[5] = I, e[6] = K) : K = e[6];
  let Q, at;
  e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (Q = /* @__PURE__ */ p.jsx("stop", {
    offset: "0%",
    stopColor: "var(--mask-color)",
    stopOpacity: "var(--mask-opacity-top)"
  }), at = /* @__PURE__ */ p.jsx("stop", {
    offset: "100%",
    stopColor: "var(--mask-color)",
    stopOpacity: "var(--mask-opacity-bottom)"
  }), e[7] = Q, e[8] = at) : (Q = e[7], at = e[8]);
  let ot;
  e[9] !== j ? (ot = /* @__PURE__ */ p.jsxs("linearGradient", {
    id: j,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1",
    children: [Q, at]
  }), e[9] = j, e[10] = ot) : ot = e[10];
  let V;
  e[11] !== E || e[12] !== w ? (V = /* @__PURE__ */ p.jsx("rect", {
    x: "0",
    y: "0",
    width: w,
    height: E,
    fill: "var(--ui-static-white)"
  }), e[11] = E, e[12] = w, e[13] = V) : V = e[13];
  let J;
  e[14] !== m || e[15] !== _ || e[16] !== S || e[17] !== M || e[18] !== v ? (J = /* @__PURE__ */ p.jsx("rect", {
    x: S,
    y: v,
    width: _,
    height: m,
    rx: M,
    ry: M,
    fill: "var(--ui-static-black)"
  }), e[14] = m, e[15] = _, e[16] = S, e[17] = M, e[18] = v, e[19] = J) : J = e[19];
  let et;
  e[20] !== R || e[21] !== V || e[22] !== J ? (et = /* @__PURE__ */ p.jsxs("mask", {
    id: R,
    maskUnits: "userSpaceOnUse",
    children: [V, J]
  }), e[20] = R, e[21] = V, e[22] = J, e[23] = et) : et = e[23];
  let nt;
  e[24] !== ot || e[25] !== et ? (nt = /* @__PURE__ */ p.jsxs("defs", {
    children: [ot, et]
  }), e[24] = ot, e[25] = et, e[26] = nt) : nt = e[26];
  const ut = `url(#${j})`, N = `url(#${R})`;
  let Y;
  e[27] !== E || e[28] !== w || e[29] !== ut || e[30] !== N ? (Y = /* @__PURE__ */ p.jsx("rect", {
    width: w,
    height: E,
    fill: ut,
    mask: N
  }), e[27] = E, e[28] = w, e[29] = ut, e[30] = N, e[31] = Y) : Y = e[31];
  let tt;
  return e[32] !== E || e[33] !== w || e[34] !== nt || e[35] !== Y || e[36] !== D || e[37] !== P || e[38] !== K ? (tt = /* @__PURE__ */ p.jsxs("svg", {
    width: w,
    height: E,
    viewBox: D,
    preserveAspectRatio: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: P,
    style: K,
    "aria-hidden": !0,
    children: [nt, Y]
  }), e[32] = E, e[33] = w, e[34] = nt, e[35] = Y, e[36] = D, e[37] = P, e[38] = K, e[39] = tt) : tt = e[39], tt;
}
const $E = (a) => {
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
  } = HE(f);
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
    e[15] !== s || e[16] !== r ? (_ = (M, j) => /* @__PURE__ */ p.jsx(Ub, {
      isActive: j === s,
      onClick: () => r(j),
      "data-overlay": !0,
      ...M
    }, j), e[15] = s, e[16] = r, e[17] = _) : _ = e[17], w = l.map(_), e[11] = s, e[12] = r, e[13] = l, e[14] = w;
  } else
    w = e[14];
  let E;
  return e[18] !== g || e[19] !== h || e[20] !== b || e[21] !== S || e[22] !== w ? (E = /* @__PURE__ */ p.jsx(Zi, {
    className: BE,
    ref: h,
    ...g,
    initial: v,
    animate: b,
    transition: S,
    children: w
  }), e[18] = g, e[19] = h, e[20] = b, e[21] = S, e[22] = w, e[23] = E) : E = e[23], E;
}, GE = (a) => {
  const e = wt.c(43), {
    tabs: l,
    onChange: s,
    defaultIndex: r
  } = a, c = r === void 0 ? 0 : r, {
    isApple: f
  } = Wi(), [h, y] = A.useState(c);
  let m, g;
  e[0] !== c ? (m = () => {
    y(c);
  }, g = [c], e[0] = c, e[1] = m, e[2] = g) : (m = e[1], g = e[2]), A.useEffect(m, g);
  let v, b;
  e[3] !== l.length ? (v = () => {
    y((nt) => Math.min(nt, l.length - 1));
  }, b = [l.length], e[3] = l.length, e[4] = v, e[5] = b) : (v = e[4], b = e[5]), A.useEffect(v, b);
  let T;
  e[6] !== h || e[7] !== s ? (T = (nt) => {
    nt !== h && (y(nt), s?.(nt));
  }, e[6] = h, e[7] = s, e[8] = T) : T = e[8];
  const S = T, w = A.useRef(null), [E, _] = A.useState(0);
  let M;
  e[9] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (M = (nt) => {
    _(nt.contentRect.width);
  }, e[9] = M) : M = e[9], q8(w, M);
  const j = l.length === 3 ? 54 : 21;
  let R;
  e[10] !== f || e[11] !== j ? (R = f ? {
    left: j,
    right: j,
    width: `calc(100% - ${j * 2}px)`
  } : {}, e[10] = f, e[11] = j, e[12] = R) : R = e[12];
  const B = R;
  let L;
  e[13] !== j ? (L = {
    top: 21,
    bottom: 21,
    left: j,
    right: j
  }, e[13] = j, e[14] = L) : L = e[14];
  const D = L;
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
  let H;
  e[17] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (H = {
    display: "flex",
    width: "100%",
    position: "relative",
    zIndex: 1
  }, e[17] = H) : H = e[17];
  let I;
  if (e[18] !== h || e[19] !== S || e[20] !== l) {
    let nt;
    e[22] !== h || e[23] !== S ? (nt = (ut, N) => /* @__PURE__ */ p.jsx(Ub, {
      isActive: N === h,
      onClick: () => S(N),
      ...ut
    }, N), e[22] = h, e[23] = S, e[24] = nt) : nt = e[24], I = l.map(nt), e[18] = h, e[19] = S, e[20] = l, e[21] = I;
  } else
    I = e[21];
  let K;
  e[25] !== I ? (K = /* @__PURE__ */ p.jsx("div", {
    style: H,
    children: I
  }), e[25] = I, e[26] = K) : K = e[26];
  let Q;
  e[27] !== h || e[28] !== S || e[29] !== l ? (Q = /* @__PURE__ */ p.jsx($E, {
    tabs: l,
    activeIndex: h,
    onChange: S
  }), e[27] = h, e[28] = S, e[29] = l, e[30] = Q) : Q = e[30];
  const at = f ? "visible" : "hidden";
  let ot;
  e[31] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (ot = /* @__PURE__ */ p.jsx(ys, {}), e[31] = ot) : ot = e[31];
  let V;
  e[32] !== D || e[33] !== E ? (V = /* @__PURE__ */ p.jsx(qE, {
    width: E,
    height: 64,
    insets: D
  }), e[32] = D, e[33] = E, e[34] = V) : V = e[34];
  let J;
  e[35] !== at || e[36] !== V ? (J = /* @__PURE__ */ p.jsxs(A.Activity, {
    mode: at,
    children: [ot, V]
  }), e[35] = at, e[36] = V, e[37] = J) : J = e[37];
  let et;
  return e[38] !== B || e[39] !== K || e[40] !== Q || e[41] !== J ? (et = /* @__PURE__ */ p.jsxs(Zi, {
    ref: w,
    className: zE,
    whileTap: k,
    transition: P,
    style: B,
    layout: !0,
    children: [K, Q, J]
  }), e[38] = B, e[39] = K, e[40] = Q, e[41] = J, e[42] = et) : et = e[42], et;
}, Oh = "_badge_dqs9c_1", kb = "_filled_dqs9c_19", Hb = "_tinted_dqs9c_24", qb = "_gray_dqs9c_29", $b = "_media_dqs9c_34", Gb = "_outlined_dqs9c_39", YE = {
  badge: Oh,
  filled: kb,
  tinted: Hb,
  gray: qb,
  media: $b,
  outlined: Gb
}, XE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  badge: Oh,
  default: YE,
  filled: kb,
  gray: qb,
  media: $b,
  outlined: Gb,
  tinted: Hb
}, Symbol.toStringTag, { value: "Module" })), PE = (a) => {
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
  let E;
  e[13] !== S || e[14] !== w ? (E = {
    ...S,
    ...w
  }, e[13] = S, e[14] = w, e[15] = E) : E = e[15];
  const _ = E, M = r?.background || r?.backgroundColor || null;
  let j = r;
  if (g === "filled") {
    const L = M || "var(--tg-theme-button-color)";
    let D;
    e[16] !== r ? (D = r?.color && {
      "--badge-text-color": r.color
    }, e[16] = r, e[17] = D) : D = e[17];
    let k;
    e[18] !== r || e[19] !== L || e[20] !== D ? (k = {
      ...r,
      "--badge-background": L,
      ...D
    }, e[18] = r, e[19] = L, e[20] = D, e[21] = k) : k = e[21], j = k;
  } else if (g === "tinted") {
    const L = r.color || M || "var(--tg-theme-button-color)";
    let D;
    e[22] !== r.color ? (D = r?.color && {
      "--badge-text-color": r.color
    }, e[22] = r.color, e[23] = D) : D = e[23];
    let k;
    e[24] !== r || e[25] !== D || e[26] !== L ? (k = {
      ...r,
      "--badge-background": L,
      ...D
    }, e[24] = r, e[25] = D, e[26] = L, e[27] = k) : k = e[27], j = k;
  }
  const R = `${Oh} ${XE[g]} ${s || ""}`;
  let B;
  return e[28] !== j || e[29] !== l || e[30] !== _ || e[31] !== R || e[32] !== m || e[33] !== v ? (B = /* @__PURE__ */ p.jsx(st, {
    variant: v,
    className: R,
    style: j,
    ..._,
    ...m,
    children: l
  }), e[28] = j, e[29] = l, e[30] = _, e[31] = R, e[32] = m, e[33] = v, e[34] = B) : B = e[34], B;
};
zr["tooltip-surface"];
const tl = (a) => {
  const e = wt.c(2), {
    children: l
  } = a;
  let s;
  return e[0] !== l ? (s = /* @__PURE__ */ p.jsx(eE, {
    children: /* @__PURE__ */ p.jsx(OC, {
      children: /* @__PURE__ */ p.jsx(P8, {
        children: /* @__PURE__ */ p.jsx(Vb, {
          children: l
        })
      })
    })
  }), e[0] = l, e[1] = s) : s = e[1], s;
}, KE = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/home" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", d: "M11.2921 3.10288C11.7572 2.98914 12.243 2.98915 12.7081 3.10288C13.2396 3.23288 13.709 3.55457 14.2432 3.92027L19.2442 7.33335C19.6706 7.62361 20.0467 7.87916 20.3282 8.22788C20.5749 8.53357 20.7603 8.88486 20.8731 9.26206C21.0018 9.69232 21.0007 10.1491 21.0001 10.6673V16.9613C21.0001 17.4921 21.0004 17.9503 20.9698 18.3275C20.9375 18.7256 20.8656 19.1213 20.6729 19.5023C20.3853 20.0709 19.9269 20.5339 19.3624 20.8236C18.9841 21.0177 18.5907 21.0889 18.1954 21.1214C17.8209 21.1523 17.366 21.1527 16.8389 21.1527H7.16121C6.63427 21.1527 6.17922 21.1523 5.80476 21.1214C5.40975 21.0889 5.01682 21.0175 4.63875 20.8236C4.07426 20.5339 3.61484 20.0709 3.32722 19.5023C3.13458 19.1213 3.06265 18.7255 3.03035 18.3275C2.99975 17.9503 3.00006 17.4921 3.00008 16.9613V10.6673C2.99948 10.1491 2.99933 9.69232 3.12801 9.26206C3.24091 8.8848 3.42612 8.53359 3.67293 8.22788C3.95441 7.87922 4.32962 7.62355 4.75593 7.33335L9.75691 3.92027C10.2911 3.55462 10.7606 3.23292 11.2921 3.10288ZM10.5001 12.0882C9.94779 12.0882 9.50008 12.5359 9.50008 13.0882V16.1244C9.50008 16.6767 9.94779 17.1244 10.5001 17.1244H13.5001C14.0524 17.1244 14.5001 16.6767 14.5001 16.1244V13.0882C14.5001 12.5359 14.0524 12.0882 13.5001 12.0882H10.5001Z", fill: "currentColor" }))), ZE = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/calendar" }, /* @__PURE__ */ A.createElement("path", { id: "Union", d: "M19.6748 10.7998C19.9782 10.7998 20.1303 10.7997 20.2441 10.8633C20.3246 10.9083 20.3915 10.9752 20.4365 11.0557C20.5001 11.1695 20.5 11.3216 20.5 11.625V13.9004C20.5 16.329 20.5 17.5435 19.9902 18.4541C19.6298 19.0977 19.0977 19.6298 18.4541 19.9902C17.5435 20.5 16.329 20.5 13.9004 20.5H10.0996C7.67103 20.5 6.4565 20.5 5.5459 19.9902C4.90227 19.6298 4.37022 19.0977 4.00977 18.4541C3.5 17.5435 3.5 16.329 3.5 13.9004V11.625C3.5 11.3216 3.49986 11.1695 3.56348 11.0557C3.60853 10.9752 3.67541 10.9083 3.75586 10.8633C3.86967 10.7997 4.02177 10.7998 4.3252 10.7998H19.6748ZM16 1.5C16.5523 1.5 17 1.94772 17 2.5V3.58984C17.5949 3.66023 18.0539 3.78571 18.4541 4.00977C19.0977 4.37022 19.6298 4.90227 19.9902 5.5459C20.3615 6.20916 20.4605 7.03367 20.4873 8.37109C20.4933 8.67145 20.4965 8.8223 20.4336 8.93848C20.3896 9.01965 20.3215 9.08906 20.2412 9.13477C20.1263 9.20009 19.9733 9.2002 19.668 9.2002H4.33203C4.02672 9.2002 3.87368 9.20009 3.75879 9.13477C3.67854 9.08906 3.61044 9.01965 3.56641 8.93848C3.50351 8.8223 3.50669 8.67145 3.5127 8.37109C3.53947 7.03367 3.63847 6.20916 4.00977 5.5459C4.37022 4.90227 4.90227 4.37022 5.5459 4.00977C5.94613 3.78571 6.40508 3.66023 7 3.58984V2.5C7 1.94772 7.44772 1.5 8 1.5C8.55228 1.5 9 1.94772 9 2.5V3.50488C9.33664 3.50264 9.70183 3.5 10.0996 3.5H13.9004C14.2982 3.5 14.6634 3.50264 15 3.50488V2.5C15 1.94772 15.4477 1.5 16 1.5Z", fill: "#3D3C3A" }))), Vr = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "#3D3C3A" }), /* @__PURE__ */ A.createElement("path", { id: "Vector 234255039", d: "M9 12.439L11.1818 14.8564L13.0909 11.8347L14.0455 10.3238L14.5227 9.56836", stroke: "white", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }))), Td = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "#3D3C3A" }), /* @__PURE__ */ A.createElement("path", { id: "Vector 234255931", d: "M12 12.5V8", stroke: "white", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ A.createElement("circle", { id: "Ellipse 253668", cx: 1, cy: 1, r: 1, transform: "matrix(1 0 0 -1 11 17)", fill: "white" }))), QE = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/heart" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", fillRule: "evenodd", clipRule: "evenodd", d: "M12 6.34213C13.1016 4.86137 14.8294 3.86287 16.9203 4.05233C19.9439 4.3263 22.0001 6.73448 22.0001 9.87524C22.0001 12.7458 20.4285 15.1633 18.5183 16.9571C16.6026 18.756 14.2269 20.0464 12.319 20.6691C12.1117 20.7368 11.8884 20.7368 11.6811 20.6691C9.77325 20.0464 7.39752 18.756 5.48179 16.9571C3.57156 15.1633 2 12.7458 2 9.87524C2 6.73448 4.05617 4.3263 7.07975 4.05233C9.17073 3.86287 10.8984 4.86142 12 6.34213Z", fill: "currentColor" }))), FE = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/cup" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", fillRule: "evenodd", clipRule: "evenodd", d: "M12.9992 3.02148C17.9698 3.02148 21.9992 5.27629 21.9992 8.05772C21.9992 12.0867 20.9992 21.1519 12.9992 21.1519C9.14215 21.1518 6.91501 19.043 5.63991 16.4088L4.98464 16.5417C2.90427 16.9606 0.88686 15.5799 0.507098 13.4776C0.136993 11.4266 1.46695 9.45421 3.49635 9.04529L4.01491 8.94004C4.0039 8.6258 3.99928 8.33024 3.99928 8.05772C3.99928 5.27633 8.02884 3.02156 12.9992 3.02148ZM3.88796 11.0204C2.92844 11.2139 2.30006 12.1467 2.47487 13.1166C2.65441 14.111 3.60814 14.7636 4.59206 14.5654L4.89284 14.5045C4.52286 13.3122 4.29975 12.0906 4.16823 10.9634L3.88796 11.0204ZM12.9992 5.03598C9.13341 5.03604 5.99928 6.38889 5.99928 8.05772C5.99928 9.72654 9.13341 11.0794 12.9992 11.0795C16.8652 11.0795 19.9992 9.72657 19.9992 8.05772C19.9992 6.38886 16.8652 5.03598 12.9992 5.03598Z", fill: "currentColor" }))), JE = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ A.createElement("path", { id: "Vector 234255937", d: "M3.52765 9.90413C0.911528 15.9537 3.96635 21.1957 8.35342 22.5511C8.84167 22.702 9.19067 22.0789 8.92321 21.6434C8.19965 20.4654 7.47887 18.5753 8.56051 16.6478C8.64224 16.5022 8.85072 16.5146 8.93197 16.6605C9.95802 18.5031 10.9317 18.5031 10.9317 18.5031C10.9317 18.5031 8.86679 14.8896 11.7788 12.1893C11.8911 12.0851 12.0723 12.1349 12.1315 12.2762C13.3539 15.1909 17.8248 17.3143 14.8582 21.9344C14.6119 22.3181 14.8717 22.8388 15.3226 22.7712C20.4424 22.0038 22.208 16.0069 20.1757 11.4342C18.0862 6.73288 13.4876 7.04975 11.6828 2.26117C11.5637 1.9453 11.198 1.78379 10.9122 1.96333C7.99596 3.79495 6.34996 7.94875 7.37329 13.0655C6.01592 12.7262 5.08207 11.1162 4.57178 9.95361C4.37654 9.50881 3.72046 9.45827 3.52765 9.90413Z", fill: "currentColor" }))), Yb = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/cross" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", d: "M16.2929 6.06242C16.6834 5.6719 17.3164 5.67191 17.707 6.06242C18.0975 6.45295 18.0975 7.08596 17.707 7.47649L13.414 11.7695L17.707 16.0624C18.0975 16.4529 18.0975 17.086 17.707 17.4765C17.3164 17.867 16.6834 17.867 16.2929 17.4765L11.9999 13.1835L7.70696 17.4765C7.31643 17.867 6.68342 17.867 6.29289 17.4765C5.90238 17.086 5.90237 16.4529 6.29289 16.0624L10.5859 11.7695L6.29289 7.47649C5.90237 7.08596 5.90237 6.45295 6.29289 6.06242C6.68342 5.6719 7.31643 5.6719 7.70696 6.06242L11.9999 10.3554L16.2929 6.06242Z", fill: "#3D3C3A" }))), Xb = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "currentColor" }), /* @__PURE__ */ A.createElement("path", { id: "Vector 234255931", d: "M12 12V16", stroke: "var(--background)", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ A.createElement("circle", { id: "Ellipse 253668", cx: 12, cy: 8.5, r: 1, fill: "var(--background)" }))), Ur = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("g", { id: "24_icon-fill/plus" }, /* @__PURE__ */ A.createElement("path", { id: "Vector", transform: "translate(5 4.769)", d: "M6 13C6 13 6 8 6 8C6 8 1 8 1 8C0.448 8 0 7.552 0 7C0 6.448 0.448 6 1 6C1 6 6 6 6 6C6 6 6 1 6 1C6 0.448 6.448 0 7 0C7.552 0 8 0.448 8 1C8 1 8 6 8 6C8 6 13 6 13 6C13.552 6 14 6.448 14 7C14 7.552 13.552 8 13 8C13 8 8 8 8 8C8 8 8 13 8 13C8 13.552 7.552 14 7 14C6.448 14 6 13.552 6 13Z", fill: "currentColor" }))), WE = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("path", { d: "M16.5791 4.53223C18.0851 4.53223 18.8049 4.65337 19.5361 5.04297C20.1593 5.3751 20.654 5.86826 20.9873 6.48926C21.3783 7.21793 21.5 7.93502 21.5 9.43555V14.7383C21.5 16.2388 21.3783 16.9559 20.9873 17.6846C20.654 18.3056 20.1593 18.7987 19.5361 19.1309C18.8049 19.5205 18.0851 19.6416 16.5791 19.6416H7.4209C5.91493 19.6416 5.19509 19.5205 4.46387 19.1309C3.84066 18.7987 3.34603 18.3056 3.0127 17.6846C2.62169 16.9559 2.50002 16.2388 2.5 14.7383V9.43555C2.50003 7.93502 2.62167 7.21793 3.0127 6.48926C3.34603 5.86826 3.84066 5.3751 4.46387 5.04297C5.19509 4.65337 5.91494 4.53223 7.4209 4.53223H16.5791ZM10.1436 9.44043C9.76724 8.73388 8.75424 8.73388 8.37793 9.44043L5.78223 14.3125C5.42805 14.9784 5.91082 15.7829 6.66504 15.7832H17.0791C17.8878 15.7831 18.3617 14.8726 17.8984 14.21L16.2656 11.877C15.8829 11.3303 15.0819 11.3051 14.665 11.8262L12.998 13.9092C12.8634 14.0774 12.6005 14.0532 12.499 13.8633L10.1436 9.44043Z", fill: "currentColor" })), IE = (a) => /* @__PURE__ */ A.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ A.createElement("path", { d: "M14.0996 3.5C16.3398 3.5 17.4608 3.49957 18.3164 3.93555C19.0689 4.31902 19.681 4.93109 20.0645 5.68359C20.5004 6.53924 20.5 7.66018 20.5 9.90039V14.0996C20.5 16.3398 20.5004 17.4608 20.0645 18.3164C19.681 19.0689 19.0689 19.681 18.3164 20.0645C17.4608 20.5004 16.3398 20.5 14.0996 20.5H9.90039C7.66018 20.5 6.53924 20.5004 5.68359 20.0645C4.93109 19.681 4.31902 19.0689 3.93555 18.3164C3.49957 17.4608 3.5 16.3398 3.5 14.0996V9.90039C3.5 7.66018 3.49957 6.53924 3.93555 5.68359C4.31902 4.93109 4.93109 4.31902 5.68359 3.93555C6.53924 3.49957 7.66018 3.5 9.90039 3.5H14.0996ZM9.5 8.2002C9.05817 8.2002 8.7002 8.55817 8.7002 9C8.7002 9.44183 9.05817 9.7998 9.5 9.7998H11.2002V15.5C11.2002 15.9418 11.5582 16.2998 12 16.2998C12.4418 16.2998 12.7998 15.9418 12.7998 15.5V9.7998H14.5C14.9418 9.7998 15.2998 9.44183 15.2998 9C15.2998 8.55817 14.9418 8.2002 14.5 8.2002H9.5Z", fill: "currentColor" })), tA = {
  success: Vr,
  error: Td,
  warning: Td,
  info: Xb
};
let Er = null, kg = !1;
const Cd = [];
function eA() {
  const a = DE();
  return A.useEffect(() => (Er = a.show, Cd.length && Cd.splice(0).forEach((e) => a.show(e)), () => {
    Er = null;
  })), null;
}
function nA() {
  if (kg || typeof document > "u") return;
  kg = !0;
  const a = document.createElement("div");
  a.setAttribute("data-aiwa-toast-host", ""), document.body.appendChild(a), Bi.createRoot(a).render(
    /* @__PURE__ */ p.jsx(Vb, { children: /* @__PURE__ */ p.jsx(eA, {}) })
  );
}
function Pb(a, e = {}) {
  const l = typeof a == "string" ? { title: a, ...e } : { ...a };
  if (l.type && !l.icon) {
    const s = tA[l.type];
    s && (l.icon = /* @__PURE__ */ p.jsx(s, {}));
  }
  return nA(), Er ? Er(l) : (Cd.push(l), null);
}
function aA() {
  typeof window < "u" && (window.aiwaToast = Pb);
}
const Ke = (a, ...e) => {
  const l = window[a];
  typeof l == "function" && l(...e);
}, ee = (a, ...e) => {
  const l = window[a];
  return typeof l == "function" ? l(...e) : null;
}, Zt = (a, e = {}) => {
  const l = ee("aiwaApi", a, e);
  return l && typeof l.then == "function" ? l : Promise.reject(new Error("API bridge is unavailable"));
}, Ot = (a, e = {}) => Pb(a, e), Ed = (a) => `${Math.round(Number(a) || 0).toLocaleString("ru-RU")} ккал`, Kb = (a) => Ke("track", a), iA = () => {
  const a = window.Telegram?.WebApp;
  a?.close && a.close();
}, Ar = async ({ nudge: a = !0, topic: e = "" } = {}) => {
  a && await Promise.race([
    Zt("/api/nudge", e ? { topic: e } : {}).catch(() => null),
    new Promise((c) => setTimeout(c, 2e3))
  ]);
  const l = window.Telegram?.WebApp, s = ee("aiwaData")?.bot_username, r = typeof l?.openTelegramLink == "function" && (typeof l.isVersionAtLeast != "function" || l.isVersionAtLeast("6.1"));
  s && r && l.openTelegramLink(`https://t.me/${s}`), iA();
}, lA = () => {
  const a = window.Telegram?.WebApp;
  return typeof a?.showPopup != "function" ? !1 : typeof a.isVersionAtLeast != "function" || a.isVersionAtLeast("6.2");
}, Se = (a, e) => ({
  "aria-label": a,
  onClick: e,
  onKeyDown: (l) => {
    (l.key === "Enter" || l.key === " ") && (l.preventDefault(), e());
  },
  role: "button",
  tabIndex: 0
});
function zh({ title: a, size: e = "regular", ...l }) {
  return e === "large" ? /* @__PURE__ */ p.jsx("div", { className: "aiwa-panel-header is-large", children: /* @__PURE__ */ p.jsx(st, { as: "h1", variant: "title1", weight: "bold", children: a }) }) : /* @__PURE__ */ p.jsx("div", { className: "aiwa-panel-header", children: /* @__PURE__ */ p.jsx(XC, { ...l, children: a }) });
}
const Hg = (a, e = "") => [
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
function Zb({
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
    /* @__PURE__ */ p.jsx(st, { className: "aiwa-date-cell-number", variant: "body", weight: "regular", children: a.date }),
    f ? /* @__PURE__ */ p.jsx(
      "span",
      {
        className: `aiwa-date-cell-radio${m ? " is-heart" : ""}${h ? " is-checked" : ""}`,
        "aria-hidden": "true",
        children: m ? /* @__PURE__ */ p.jsx(QE, {}) : h ? /* @__PURE__ */ p.jsx(Vr, {}) : null
      }
    ) : null,
    !f && a.phase && !a.actualPeriod && !a.predictedPeriod ? /* @__PURE__ */ p.jsx("span", { className: "aiwa-date-cell-dot", "aria-hidden": "true" }) : null,
    !f && a.intimacy ? /* @__PURE__ */ p.jsx("span", { className: "aiwa-date-cell-heart", "aria-hidden": "true", children: "♥" }) : null,
    s && a.today && !f ? /* @__PURE__ */ p.jsx(st, { className: "aiwa-date-cell-today", variant: "caption1", weight: "regular", children: "Сегодня" }) : null
  ] });
  if (!e)
    return /* @__PURE__ */ p.jsx("div", { className: Hg(v, g), "data-iso": a.iso, "aria-label": `${a.label || "День"}, ${a.date}`, children: b });
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
      className: Hg(v, ["aiwa-calendar-day", g].filter(Boolean).join(" ")),
      "data-iso": a.iso,
      onClick: () => c ? c(a) : Ke("aiwaCalendarDay", a.iso),
      children: b
    }
  );
}
function Qb(a, ...e) {
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
const sA = 140;
function qg(a, e) {
  const l = a.scrollWidth - a.clientWidth, s = e.offsetLeft - (a.clientWidth - e.offsetWidth) / 2;
  return Math.min(l, Math.max(0, s));
}
function oA(a) {
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
function Lh({ days: a, selectedIso: e = "", onSelect: l = null }) {
  const s = typeof l == "function", r = A.useRef(null), c = A.useRef(null);
  c.current = { days: a, selectedIso: e, onSelect: l };
  const f = A.useRef("");
  return Qb(r, a?.length), A.useLayoutEffect(() => {
    const h = r.current;
    if (!h) return;
    const y = f.current;
    if (f.current = "", y && y === e || h.scrollWidth - h.clientWidth <= 0) return;
    const g = h.querySelector(e ? `[data-iso="${e}"]` : ".is-today");
    g && (h.scrollLeft = qg(h, g));
  }, [e, a?.length]), A.useEffect(() => {
    const h = r.current;
    if (!h || !s) return;
    let y = 0, m = !1, g = !1;
    const v = () => {
      if (y = 0, m || !g) return;
      g = !1;
      const _ = oA(h);
      if (!_) return;
      const { days: M, selectedIso: j, onSelect: R } = c.current, B = M?.find((D) => D.iso === _.dataset.iso);
      if (!B) return;
      B.iso !== j && (f.current = B.iso, R(B));
      const L = qg(h, _);
      if (Math.abs(L - h.scrollLeft) > 0.5) {
        const D = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        h.scrollTo({ left: L, behavior: D ? "auto" : "smooth" });
      }
    }, b = () => {
      y && clearTimeout(y), y = setTimeout(v, sA);
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
      y && clearTimeout(y), h.removeEventListener("scroll", T), h.removeEventListener("touchstart", S), h.removeEventListener("touchend", w), h.removeEventListener("touchcancel", w), h.removeEventListener("wheel", E);
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
        Zb,
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
const Bh = [
  ["Боль", [["cramps", "Спазмы"], ["head", "Голова"], ["breast", "Грудь"]]],
  ["Настроение", [["irrit", "Раздражительность"], ["anx", "Тревога"], ["low", "Апатия"]]],
  ["Тело", [["tired", "Усталость"], ["bloat", "Вздутие"], ["sweet", "Тянет на сладкое"]]],
  ["Кожа и сон", [["skin", "Высыпания"], ["insomnia", "Плохой сон"]]]
], Ad = {
  // One line each at the bar width: a wrapped hint pushes the bar over the grid.
  period: { label: "Месячные", hint: "нажми на день, чтобы отметить месячные", checked: (a) => a.actualPeriod },
  symptoms: { label: "Симптомы", hint: "нажми на день, чтобы записать симптомы", checked: (a) => a.logged },
  intimacy: { label: "Близость", hint: "нажми на день, чтобы отметить близость", checked: (a) => a.intimacy }
}, rA = (a) => a.map((e) => ({ value: e, label: Ad[e].label })), uA = [
  { label: "Месячные", variant: "tinted", token: "--aiwa-phase-menstrual" },
  { label: "Прогноз", variant: "outlined", token: "--aiwa-phase-menstrual" },
  { label: "Овуляция", variant: "tinted", token: "--aiwa-phase-ovulation" },
  { label: "Фолликулярная", variant: "tinted", token: "--aiwa-phase-follicular" },
  { label: "Лютеиновая", variant: "tinted", token: "--aiwa-phase-luteal" },
  { label: "Близость", variant: "tinted", token: "--aiwa-intimacy" }
], Fb = [[1, "Низкая"], [2, "Средняя"], [3, "Высокая"]], Jb = [[1, "Плохое"], [2, "Нормальное"], [3, "Хорошее"]], cA = "/assets/food/pancakes.png", Wb = [
  { value: "breakfast", label: "Завтрак" },
  { value: "lunch", label: "Обед" },
  { value: "snack", label: "Перекус" },
  { value: "dinner", label: "Ужин" }
], fA = (a) => ({
  title: a?.title || "",
  kcal: String(a?.kcal ?? ""),
  grams: String(a?.grams ?? ""),
  protein: String(a?.protein ?? ""),
  fat: String(a?.fat ?? ""),
  carbs: String(a?.carbs ?? ""),
  slot: a?.slot || "snack"
}), dA = ["Силовая", "Кардио", "Йога", "Ходьба", "Плавание", "Своё"], hA = {
  Силовая: ["Приседания", "Ягодичный мост", "Тяга верхнего блока", "Планка"],
  Кардио: ["Бег", "Велотренажёр", "Эллипс", "Гребля"],
  Йога: ["Виньяса", "Хатха", "Растяжка", "Дыхание"],
  Ходьба: ["Прогулка", "Быстрая ходьба", "Скандинавская ходьба"],
  Плавание: ["Кроль", "Брасс", "На спине"],
  Своё: []
}, mA = [
  { value: "cycle", label: "Регулярный цикл" },
  { value: "irregular", label: "Нерегулярный" },
  { value: "preg", label: "Беременность" },
  { value: "meno", label: "Менопауза" },
  { value: "none", label: "Нет месячных" }
], $g = "custom:";
function pA(a) {
  const e = a?.length ? a.flatMap(([, l]) => l) : Bh.flatMap(([, l]) => l.flat());
  return new Map(e);
}
function yA({ title: a = "Сегодня", checkin: e, symptomGroups: l, onSelect: s }) {
  const r = e?.symptoms ?? [], c = A.useRef(null);
  if (Qb(c, r.length), !r.length) return null;
  const f = pA(l), h = s ?? (() => Ke("openHomePanel", "journal"));
  return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-today", children: [
    /* @__PURE__ */ p.jsx(st, { className: "aiwa-today-title", variant: "body", weight: "semibold", children: a }),
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-today-chips", role: "group", "aria-label": a, ref: c, children: r.map((y) => {
      const m = y.startsWith($g) ? y.slice($g.length) : f.get(y) ?? y;
      return /* @__PURE__ */ p.jsx(
        Te,
        {
          as: "button",
          type: "button",
          mode: "opacity",
          className: "aiwa-today-chip",
          onClick: () => h(y),
          title: m,
          children: /* @__PURE__ */ p.jsx(st, { variant: "body", weight: "regular", children: m })
        },
        y
      );
    }) })
  ] });
}
const Gg = 1e3 / 40, gA = 5e3, Ib = (a, e) => Array.from(
  { length: e },
  (l, s) => `/assets/${a}/frame-${String(s).padStart(3, "0")}.png`
), vA = Ib("aiwa-sequence", 182), Vh = Ib("aiwa-card-sequence", 193), kf = /* @__PURE__ */ new Map(), bA = (a) => (kf.has(a) || kf.set(
  a,
  Promise.all(a.map((e) => new Promise((l) => {
    const s = new Image();
    s.onload = l, s.onerror = l, s.src = e;
  })))
), kf.get(a));
function Uh({ size: a, frames: e = vA, pauseMs: l = gA }) {
  const [s, r] = A.useState(0);
  return A.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let f = !1, h = 0, y = 0;
    const m = () => {
      let g = 0;
      r(g), h = window.setInterval(() => {
        g += 1, r(g), g === e.length - 1 && (window.clearInterval(h), y = window.setTimeout(m, l || Gg));
      }, Gg);
    };
    return bA(e).then(() => {
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
      "data-sequence": e === Vh ? "card" : "default",
      "data-pause-ms": l,
      "data-frame": s,
      "aria-hidden": "true",
      children: /* @__PURE__ */ p.jsx("img", { src: e[s], alt: "", draggable: "false" })
    }
  );
}
function xA() {
  return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-paper-ai-heading", children: [
    /* @__PURE__ */ p.jsx(Uh, { size: 58, frames: Vh, pauseMs: 0 }),
    /* @__PURE__ */ p.jsx("div", { children: /* @__PURE__ */ p.jsx(st, { variant: "body", weight: "semibold", children: "Айва AI" }) })
  ] });
}
function SA(a) {
  return /* @__PURE__ */ p.jsx(Xn, { ...a, "data-aiwa-cell": "true" });
}
const St = Object.assign(SA, {
  Start: Xn.Start,
  End: Xn.End,
  Part: Xn.Part,
  Text: Xn.Text,
  Editable: Xn.Editable,
  Switch: Xn.Switch
});
function kr({
  message: a,
  detail: e,
  onDiscuss: l,
  className: s = ""
}) {
  return /* @__PURE__ */ p.jsx(yt.Item, { className: `aiwa-insight-section ${s}`.trim(), children: /* @__PURE__ */ p.jsx(St, { "data-aiwa-insight-cell": "true", tappable: !1, children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-insight-content", children: [
    /* @__PURE__ */ p.jsx(xA, {}),
    /* @__PURE__ */ p.jsx(st, { className: "aiwa-insight-message", variant: "body", weight: "regular", children: a }),
    e ? /* @__PURE__ */ p.jsx(st, { className: "aiwa-insight-detail", variant: "body", weight: "regular", children: e }) : null,
    l ? /* @__PURE__ */ p.jsx(
      oe,
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
function wA({ aiText: a }) {
  return /* @__PURE__ */ p.jsx(
    kr,
    {
      message: a,
      onDiscuss: () => Ke("go", "chat")
    }
  );
}
function TA({ delay: a }) {
  return a ? /* @__PURE__ */ p.jsxs(yt.Item, { header: a.title, children: [
    /* @__PURE__ */ p.jsx(St, { tappable: !1, children: /* @__PURE__ */ p.jsx(St.Text, { title: a.message, description: a.hint }) }),
    a.canSwitchToPregnancy ? /* @__PURE__ */ p.jsx(St, { tappable: !1, children: /* @__PURE__ */ p.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ p.jsx(
      oe,
      {
        variant: "filled",
        label: "Перейти в режим беременности",
        isFill: !0,
        ...Se("Перейти в режим беременности", () => Ke("switchPreg"))
      }
    ) }) }) : null
  ] }) : null;
}
function CA({ ok: a }) {
  const e = a ? Vr : Td;
  return /* @__PURE__ */ p.jsx("span", { className: a ? "aiwa-status is-ok" : "aiwa-status is-alert", "aria-label": a ? "В пределах нормы" : "Требует внимания", children: /* @__PURE__ */ p.jsx(e, {}) });
}
function EA({ label: a, value: e, ok: l }) {
  return /* @__PURE__ */ p.jsx(St, { "data-aiwa-metric-cell": "true", tappable: !1, end: /* @__PURE__ */ p.jsx(CA, { ok: l }), children: /* @__PURE__ */ p.jsx(St.Text, { title: a, description: e }) });
}
function AA({ metrics: a, title: e = "Статистика" }) {
  return a?.length ? /* @__PURE__ */ p.jsx(yt.Item, { header: e, children: a.map((l) => /* @__PURE__ */ p.jsx(EA, { ...l }, l.label)) }) : null;
}
const jA = A.lazy(() => import("./AiwaWebUiChart-BUhXBX7_.js").then((a) => ({
  default: a.AiwaWebUiChart
})));
function MA() {
  return /* @__PURE__ */ p.jsx("div", { className: "aiwa-area-chart-state is-loading", role: "status", "aria-label": "График загружается", children: /* @__PURE__ */ p.jsx("span", { className: "aiwa-area-chart-skeleton", "aria-hidden": "true" }) });
}
function _A({
  data: a,
  series: e,
  xKey: l,
  loading: s = !1,
  title: r = "Динамика цикла",
  emptyText: c = "Добавь ещё один завершённый цикл — здесь появится график."
}) {
  return /* @__PURE__ */ p.jsx(yt.Item, { header: r, children: /* @__PURE__ */ p.jsx(A.Suspense, { fallback: /* @__PURE__ */ p.jsx(MA, {}), children: /* @__PURE__ */ p.jsx(
    jA,
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
function DA({
  history: a,
  title: e = "История цикла",
  emptyTitle: l = "История пока пуста",
  emptyDescription: s = "Она появится после первой сохранённой менструации."
}) {
  return /* @__PURE__ */ p.jsx(yt.Item, { header: e, children: a?.length ? a.map((r) => /* @__PURE__ */ p.jsx(St, { "data-aiwa-history-cell": "true", tappable: !1, children: /* @__PURE__ */ p.jsx(St.Text, { title: r.title, description: r.description }) }, r.key)) : /* @__PURE__ */ p.jsx(St, { "data-aiwa-history-cell": "true", tappable: !1, children: /* @__PURE__ */ p.jsx(St.Text, { title: l, description: s }) }) });
}
const Yi = [];
let Yg = !1;
const tx = () => typeof window < "u" ? window.Telegram?.WebApp?.BackButton : null, RA = () => Yi[Yi.length - 1]?.(), Xg = () => {
  const a = tx();
  a && (Yi.length ? a.show?.() : a.hide?.());
}, NA = (a) => {
  const e = tx();
  return e && !Yg && (e.onClick?.(RA), Yg = !0), Yi.push(a), Xg(), () => {
    const l = Yi.lastIndexOf(a);
    l !== -1 && Yi.splice(l, 1), Xg();
  };
};
function ex(a, e) {
  const l = A.useRef(e);
  l.current = e, A.useEffect(() => {
    if (a)
      return NA(() => l.current?.());
  }, [a]);
}
function Cn({ isOpen: a, onClose: e, onBack: l, children: s, ...r }) {
  return ex(a, l || e), A.useEffect(() => {
    if (!a) return;
    const c = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.body.style.overflow = c;
    };
  }, [a]), a ? Or.createPortal(
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-page", role: "dialog", "aria-modal": "true", ...r, children: s }),
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
      children: /* @__PURE__ */ p.jsx(oe, { variant: e ? "tinted" : "gray", label: h, isFill: s })
    }
  );
}
function jd({ label: a, active: e, onChange: l, variant: s = "default" }) {
  return /* @__PURE__ */ p.jsx(
    Hr,
    {
      className: `aiwa-log-toggle is-${s}-toggle`,
      label: a,
      active: e,
      isFill: !0,
      "aria-label": `${a}: ${e ? "да" : "нет"}`,
      onClick: () => l(!e),
      end: /* @__PURE__ */ p.jsx("span", { className: "aiwa-log-toggle-mark", "aria-hidden": "true", children: e ? /* @__PURE__ */ p.jsx(Vr, {}) : null })
    }
  );
}
function nx({ label: a, children: e }) {
  return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-log-group", children: [
    /* @__PURE__ */ p.jsx(st, { className: "aiwa-log-label", variant: "subheadline1", weight: "regular", children: a }),
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-log-choices", role: "group", "aria-label": a, children: e })
  ] });
}
function jr({ label: a, options: e, value: l, onChange: s }) {
  return /* @__PURE__ */ p.jsx(nx, { label: a, children: e.map(([r, c]) => /* @__PURE__ */ p.jsx(
    Hr,
    {
      label: c,
      active: l === r,
      onClick: () => s(r)
    },
    r
  )) });
}
function ax({ label: a, options: e, symptoms: l, onToggle: s }) {
  return /* @__PURE__ */ p.jsx(nx, { label: a, children: e.map(([r, c]) => /* @__PURE__ */ p.jsx(
    Hr,
    {
      label: c,
      active: l.includes(r),
      onClick: () => s(r)
    },
    r
  )) });
}
function te({
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
    /* @__PURE__ */ p.jsx(st, { variant: "caption1", weight: "regular", children: a }),
    f ? /* @__PURE__ */ p.jsx("textarea", { ...m }) : /* @__PURE__ */ p.jsx("input", { type: r, ...m })
  ] });
}
function ix({ value: a, onChange: e }) {
  return /* @__PURE__ */ p.jsx("div", { className: "aiwa-custom-symptom", children: /* @__PURE__ */ p.jsx(
    te,
    {
      label: "Свой симптом",
      value: a,
      onChange: e,
      placeholder: "Например, тошнота",
      maxLength: 40
    }
  ) });
}
function OA({ isOpen: a, onClose: e, checkin: l, symptomGroups: s, mode: r }) {
  const [c, f] = A.useState(l.symptoms || []), [h, y] = A.useState(l.energy || 0), [m, g] = A.useState(l.mood || 0), [v, b] = A.useState(!!l.period), [T, S] = A.useState(!!l.intimacy), [w, E] = A.useState(""), [_, M] = A.useState(!1);
  A.useEffect(() => {
    a && (f(l.symptoms || []), y(l.energy || 0), g(l.mood || 0), b(!!l.period), S(!!l.intimacy), E(""), M(!1));
  }, [a]);
  const j = (L) => {
    f((D) => D.includes(L) ? D.filter((k) => k !== L) : [...D, L]);
  }, R = s?.length ? s : Bh, B = async () => {
    if (_) return;
    const L = l.symptoms || [], D = w.trim();
    M(!0);
    try {
      let k = !1;
      v !== !!l.period && (await ee("toggleTodayPeriod"), k = !0), h !== (l.energy || 0) && (await ee("setCheckin", "energy", h), k = !0), m !== (l.mood || 0) && (await ee("setCheckin", "mood", m), k = !0);
      for (const P of c.filter((H) => !L.includes(H)))
        await ee("toggleSym", P);
      for (const P of L.filter((H) => !c.includes(H)))
        await ee("toggleSym", P);
      T !== !!l.intimacy && await ee("toggleTodayIntimacy"), D && (await ee("addCustomSym", D), k = !0), k || Ot("Сохранено", { type: "success" }), e();
    } catch (k) {
      Ot(k?.message || "Не удалось сохранить", { type: "error" });
    } finally {
      M(!1);
    }
  };
  return /* @__PURE__ */ p.jsxs(
    Cn,
    {
      isOpen: a,
      onClose: e,
      "data-aiwa-log-modal": "true",
      children: [
        /* @__PURE__ */ p.jsx(zh, { size: "large", title: "Занести в журнал" }),
        /* @__PURE__ */ p.jsx("div", { className: "aiwa-log-scroll", children: /* @__PURE__ */ p.jsxs(yt, { className: "aiwa-log-sections", children: [
          r !== "preg" && r !== "meno" ? /* @__PURE__ */ p.jsx(yt.Item, { children: /* @__PURE__ */ p.jsx(jd, { label: "Месячные", variant: "period", active: v, onChange: b }) }) : null,
          /* @__PURE__ */ p.jsx(yt.Item, { children: /* @__PURE__ */ p.jsx(
            jr,
            {
              label: "Энергия",
              options: Fb,
              value: h,
              onChange: y
            }
          ) }),
          /* @__PURE__ */ p.jsx(yt.Item, { children: /* @__PURE__ */ p.jsx(
            jr,
            {
              label: "Настроение",
              options: Jb,
              value: m,
              onChange: g
            }
          ) }),
          R.map(([L, D]) => /* @__PURE__ */ p.jsx(yt.Item, { children: /* @__PURE__ */ p.jsx(ax, { label: L, options: D, symptoms: c, onToggle: j }) }, L)),
          /* @__PURE__ */ p.jsx(yt.Item, { children: /* @__PURE__ */ p.jsx(ix, { value: w, onChange: E }) }),
          /* @__PURE__ */ p.jsx(yt.Item, { children: /* @__PURE__ */ p.jsx(jd, { label: "Близость", active: T, onChange: S }) })
        ] }) }),
        /* @__PURE__ */ p.jsx("div", { className: "aiwa-log-footer", children: /* @__PURE__ */ p.jsx(
          oe,
          {
            variant: "filled",
            label: _ ? "Сохраняю…" : "Сохранить",
            isFill: !0,
            ...Se("Сохранить", B)
          }
        ) })
      ]
    }
  );
}
function zA({ icon: a, label: e, onClick: l, className: s = "", ...r }) {
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
      children: /* @__PURE__ */ p.jsx(vh, { className: "aiwa-fab-surface", children: /* @__PURE__ */ p.jsx("span", { className: "aiwa-fab-icon", "aria-hidden": "true", children: a }) })
    }
  );
}
const Il = 8, Pg = 6;
function LA(a, e, l) {
  const s = window.innerWidth, r = window.innerHeight;
  let c = l === "end" ? a.right - e.width : a.left;
  c = Math.min(c, s - e.width - Il), c = Math.max(Il, c);
  const f = a.bottom + Pg, h = a.top - Pg - e.height, y = f + e.height <= r - Il, m = y || h < Il ? f : h, g = y || h < Il ? "top" : "bottom";
  return { top: m, left: c, originY: g };
}
function lx({ items: a, trigger: e, align: l = "start", className: s = "" }) {
  const [r, c] = A.useState(!1), [f, h] = A.useState({ top: 0, left: 0, originY: "top" }), y = A.useRef(null), m = A.useRef(null), g = A.useCallback(() => {
    c(!1);
  }, []);
  A.useLayoutEffect(() => {
    if (!r || !m.current || !y.current) return;
    const b = () => {
      const T = y.current.getBoundingClientRect(), S = { width: m.current.offsetWidth, height: m.current.offsetHeight };
      h(LA(T, S, l));
    };
    return b(), window.addEventListener("resize", b), window.addEventListener("scroll", b, !0), () => {
      window.removeEventListener("resize", b), window.removeEventListener("scroll", b, !0);
    };
  }, [r, l]), A.useEffect(() => {
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
    r && Or.createPortal(
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
                /* @__PURE__ */ p.jsx(st, { variant: "body", weight: "regular", children: b.label })
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
function BA({ options: a, value: e, onChange: l, hint: s }) {
  return /* @__PURE__ */ p.jsxs(vh, { className: "aiwa-mark-bar", role: "group", "aria-label": "Что отмечаем", children: [
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-mark-bar-chips", children: a.map((r) => /* @__PURE__ */ p.jsx(
      Hr,
      {
        label: r.label,
        active: e === r.value,
        onClick: () => l(r.value)
      },
      r.value
    )) }),
    s ? /* @__PURE__ */ p.jsx(st, { className: "aiwa-mark-bar-hint", variant: "footnote", weight: "regular", role: "status", children: s }) : null
  ] });
}
function VA({ iso: a, label: e, open: l, onClose: s, symptomGroups: r, showIntimacy: c = !0 }) {
  const [f, h] = A.useState({}), [y, m] = A.useState([]), [g, v] = A.useState(0), [b, T] = A.useState(0), [S, w] = A.useState(!1), [E, _] = A.useState(""), [M, j] = A.useState(!1);
  A.useEffect(() => {
    if (!a || !l) return;
    const D = ee("getAiwaDayCheckin", a) || {};
    h(D), m(D.symptoms || []), v(D.energy || 0), T(D.mood || 0), w(!!D.intimacy), _(""), j(!1);
  }, [a, l]);
  const R = (D) => {
    m((k) => k.includes(D) ? k.filter((P) => P !== D) : [...k, D]);
  }, B = r?.length ? r : Bh, L = async () => {
    if (M) return;
    const D = f.symptoms || [], k = E.trim();
    j(!0);
    try {
      g !== (f.energy || 0) && await ee("setDayCheckin", a, "energy", g), b !== (f.mood || 0) && await ee("setDayCheckin", a, "mood", b);
      for (const P of y.filter((H) => !D.includes(H)))
        await ee("toggleDaySym", a, P);
      for (const P of D.filter((H) => !y.includes(H)))
        await ee("toggleDaySym", a, P);
      S !== !!f.intimacy && await ee("markPA", a), k ? await ee("addDayCustomSym", a, k) : Ot("Сохранено", { type: "success" }), s();
    } catch (P) {
      Ot(P?.message || "Не удалось сохранить", { type: "error" });
    } finally {
      j(!1);
    }
  };
  return /* @__PURE__ */ p.jsxs(
    Cn,
    {
      isOpen: l,
      onClose: s,
      "data-aiwa-day-log-modal": "true",
      children: [
        /* @__PURE__ */ p.jsx(zh, { size: "large", title: e || "Занести в журнал" }),
        /* @__PURE__ */ p.jsx("div", { className: "aiwa-log-scroll", children: /* @__PURE__ */ p.jsxs(yt, { className: "aiwa-log-sections", children: [
          /* @__PURE__ */ p.jsx(yt.Item, { children: /* @__PURE__ */ p.jsx(
            jr,
            {
              label: "Энергия",
              options: Fb,
              value: g,
              onChange: v
            }
          ) }),
          /* @__PURE__ */ p.jsx(yt.Item, { children: /* @__PURE__ */ p.jsx(
            jr,
            {
              label: "Настроение",
              options: Jb,
              value: b,
              onChange: T
            }
          ) }),
          B.map(([D, k]) => /* @__PURE__ */ p.jsx(yt.Item, { children: /* @__PURE__ */ p.jsx(ax, { label: D, options: k, symptoms: y, onToggle: R }) }, D)),
          /* @__PURE__ */ p.jsx(yt.Item, { children: /* @__PURE__ */ p.jsx(ix, { value: E, onChange: _ }) }),
          c ? /* @__PURE__ */ p.jsx(yt.Item, { children: /* @__PURE__ */ p.jsx(jd, { label: "Близость", active: S, onChange: w }) }) : null
        ] }) }),
        /* @__PURE__ */ p.jsx("div", { className: "aiwa-log-footer", children: /* @__PURE__ */ p.jsx(
          oe,
          {
            variant: "filled",
            label: M ? "Сохраняю…" : "Сохранить",
            isFill: !0,
            ...Se("Сохранить", L)
          }
        ) })
      ]
    }
  );
}
function UA({ isOpen: a, onClose: e, mode: l, revision: s, symptomGroups: r }) {
  const [c, f] = A.useState(!1), [h, y] = A.useState(null), [m, g] = A.useState(!1), [v, b] = A.useState("period"), [T, S] = A.useState({}), w = A.useRef(Promise.resolve()), E = A.useRef(0), _ = Array.from({ length: 8 }, (K, Q) => ee("getAiwaCalendarMonth", Q)).filter(Boolean), M = l !== "preg" && l !== "meno", j = rA(M ? ["period", "symptoms", "intimacy"] : ["symptoms", "intimacy"]), R = Ad[v] || Ad.symptoms, B = lA(), L = () => {
    g(!1), S({});
  }, D = (K) => {
    b(K), f(!1), g(!0);
  }, k = j.map((K) => ({
    label: K.label,
    onSelect: () => D(K.value)
  }));
  ex(a, m ? L : e), A.useEffect(() => {
    a || (f(!1), y(null), g(!1), S({})), b(M ? "period" : "symptoms");
  }, [a, M]);
  const P = (K) => {
    const Q = T[`${v}:${K.iso}`];
    return typeof Q == "boolean" ? Q : !!R.checked(K);
  }, H = (K, Q) => {
    const at = () => ee(K, Q);
    E.current += 1, w.current = w.current.then(at, at).then(() => {
      E.current -= 1, E.current === 0 && S({});
    });
  }, I = (K, Q) => {
    if (m) {
      if (v === "symptoms") {
        y({ iso: K.iso, label: `${K.date} ${Q}` });
        return;
      }
      S((at) => ({ ...at, [`${v}:${K.iso}`]: !P(K) })), H(v === "period" ? "toggleCalendarPeriodDay" : "markPA", K.iso);
    }
  };
  return a ? Or.createPortal(
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
                  onClick: () => f((K) => !K),
                  children: [
                    /* @__PURE__ */ p.jsx(Xb, {}),
                    /* @__PURE__ */ p.jsx(st, { variant: "body", weight: "semibold", children: "Обозначения" })
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
                  onClick: L,
                  children: /* @__PURE__ */ p.jsx(st, { variant: "body", weight: "semibold", children: "Готово" })
                }
              ) : null
            ] }),
            c ? /* @__PURE__ */ p.jsxs("div", { className: "aiwa-calendar-help", role: "status", children: [
              /* @__PURE__ */ p.jsx(st, { variant: "body", weight: "semibold", children: "Обозначения" }),
              /* @__PURE__ */ p.jsx("div", { className: "aiwa-calendar-legend", children: uA.map(({ label: K, variant: Q, token: at }) => /* @__PURE__ */ p.jsx(
                PE,
                {
                  variant: Q,
                  textVariant: "caption1",
                  weight: "semibold",
                  style: { color: `var(${at})` },
                  children: K
                },
                K
              )) })
            ] }) : null,
            /* @__PURE__ */ p.jsx("div", { className: "aiwa-calendar-scroll", children: /* @__PURE__ */ p.jsx("div", { className: "aiwa-calendar-months", children: _.map((K) => /* @__PURE__ */ p.jsxs("section", { className: "aiwa-calendar-month", "aria-label": K.label, children: [
              /* @__PURE__ */ p.jsx(st, { className: "aiwa-calendar-month-title", variant: "body", weight: "semibold", children: K.name || K.label }),
              /* @__PURE__ */ p.jsx("div", { className: "aiwa-calendar-grid", children: K.days.map((Q) => Q.empty ? /* @__PURE__ */ p.jsx("span", { className: "aiwa-calendar-empty", "aria-hidden": "true" }, Q.key) : /* @__PURE__ */ p.jsx(
                Zb,
                {
                  day: Q,
                  interactive: m,
                  marking: m,
                  checked: m && P(Q),
                  markVariant: v === "intimacy" ? "heart" : "radio",
                  monthLabel: K.label,
                  showTodayLabel: !0,
                  onSelect: (at) => I(at, K.name || K.label)
                },
                Q.key
              )) })
            ] }, K.key || K.label)) }) })
          ] }),
          m && !B ? /* @__PURE__ */ p.jsx(
            BA,
            {
              options: j,
              value: v,
              onChange: b,
              hint: R.hint
            }
          ) : null,
          m ? null : /* @__PURE__ */ p.jsx(
            lx,
            {
              className: "aiwa-calendar-fab",
              align: "end",
              items: k,
              trigger: /* @__PURE__ */ p.jsx(zA, { icon: /* @__PURE__ */ p.jsx(Ur, {}), label: "Отметить день" })
            }
          ),
          /* @__PURE__ */ p.jsx(
            VA,
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
function kA({ panel: a, onClose: e, checkin: l, symptomGroups: s, mode: r, revision: c }) {
  return /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsx(OA, { isOpen: a === "journal", onClose: e, checkin: l, symptomGroups: s, mode: r }),
    /* @__PURE__ */ p.jsx(UA, { isOpen: a === "calendar", onClose: e, mode: r, revision: c, symptomGroups: s })
  ] });
}
function fe({
  title: a,
  description: e,
  onClick: l,
  trailing: s,
  muted: r = !1,
  start: c,
  image: f,
  loading: h = !1
}) {
  const y = s !== void 0 ? s : l ? /* @__PURE__ */ p.jsx(St.Part, { type: "Chevron" }) : null, m = h ? /* @__PURE__ */ p.jsx("span", { className: "aiwa-cell-thumb aiwa-cell-thumb-loading", children: /* @__PURE__ */ p.jsx(Nh, { size: 22 }) }) : f ? /* @__PURE__ */ p.jsx("span", { className: "aiwa-cell-thumb", children: /* @__PURE__ */ p.jsx("img", { src: f, alt: "", loading: "lazy" }) }) : c;
  return /* @__PURE__ */ p.jsx(
    St,
    {
      start: m,
      end: y,
      onClick: l,
      tappable: !!l,
      as: l ? "button" : "div",
      type: l ? "button" : void 0,
      "aria-label": a,
      style: r ? { opacity: 0.65 } : void 0,
      children: /* @__PURE__ */ p.jsx(St.Text, { title: a, description: e || void 0 })
    }
  );
}
function Xi({ label: a, options: e, value: l, onChange: s }) {
  return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-form-group", children: [
    a ? /* @__PURE__ */ p.jsx(st, { className: "aiwa-form-label", variant: "body", weight: "semibold", children: a }) : null,
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
          children: /* @__PURE__ */ p.jsx(st, { variant: "body", weight: "regular", children: c.label })
        },
        c.value
      );
    }) })
  ] });
}
function HA({ isOpen: a, onClose: e }) {
  const [l, s] = A.useState("main"), [r, c] = A.useState(() => ee("aiwaData") || {}), [f, h] = A.useState(null), [y, m] = A.useState("3"), [g, v] = A.useState({});
  A.useEffect(() => {
    if (!a) return;
    const j = ee("aiwaData") || {};
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
    const j = await Zt("/api/partner", {}).catch(() => null);
    h(j || {});
  }, T = async () => {
    const j = await Zt("/api/profile", {
      height: g.height,
      weight: g.weight,
      age: g.age,
      cycle_len: g.cycle_len
    }).catch(() => null), R = await Zt("/api/prefs", {
      diet_note: g.diet_note,
      kcal_goal: g.kcal_goal
    }).catch(() => null), B = await Zt("/api/settime", { time: g.send_time }).catch(() => null);
    j?.ok && R?.ok && B?.ok ? (Ot("Данные сохранены", { type: "success" }), Ke("reloadAfterEdit"), s("main")) : Ot(j?.text || "Проверь рост, вес, возраст и время", { type: "error" });
  }, S = async () => {
    const j = await Zt("/api/report", { period: y }).catch(() => null);
    j?.ok ? (Ot("Выписка отправлена в чат бота", { type: "success" }), s("main")) : Ot(j?.text || "Выписка временно недоступна", { type: "error" });
  }, w = async (j) => {
    const R = g.proactive_enabled !== !1;
    v((L) => ({ ...L, proactive_enabled: j })), (await Zt("/api/proactive", { enabled: j }).catch(() => null))?.ok || (v((L) => ({ ...L, proactive_enabled: R })), Ot("Не получилось изменить настройку", { type: "error" }));
  }, E = (j) => {
    e(), Ke("chooseMode", j);
  }, _ = async () => {
    if (f?.link)
      try {
        await navigator.clipboard.writeText(f.link), Ot("Ссылка скопирована", { type: "success" });
      } catch {
        Ot("Ссылка готова — выдели и скопируй");
      }
  }, M = async () => {
    (await Zt("/api/partner", { action: "unlink" }).catch(() => null))?.ok && (h({ linked: !1 }), Ot("Партнёр отключён", { type: "success" }));
  };
  return /* @__PURE__ */ p.jsx(
    Cn,
    {
      isOpen: a,
      onClose: e,
      onBack: l === "main" ? e : () => s("main"),
      children: /* @__PURE__ */ p.jsx(p.Fragment, { children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-sheet-scroll", children: [
        l === "main" ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
          /* @__PURE__ */ p.jsxs("div", { className: "aiwa-profile-modes", children: [
            /* @__PURE__ */ p.jsx(st, { variant: "body", weight: "semibold", children: "Режим" }),
            /* @__PURE__ */ p.jsx("div", { className: "aiwa-choice-pills", children: mA.map((j) => /* @__PURE__ */ p.jsx(
              Te,
              {
                as: "button",
                type: "button",
                mode: "opacity",
                className: r.mode === j.value ? "aiwa-choice-pill is-active" : "aiwa-choice-pill",
                "aria-pressed": r.mode === j.value,
                onClick: () => E(j.value),
                children: /* @__PURE__ */ p.jsx(st, { variant: "body", weight: "regular", children: j.label })
              },
              j.value
            )) }),
            /* @__PURE__ */ p.jsx(st, { className: "aiwa-profile-note", variant: "caption1", weight: "regular", children: "Для цикла и беременности нужна дата последних месячных." })
          ] }),
          /* @__PURE__ */ p.jsx(yt, { className: "aiwa-tma-blocks", children: /* @__PURE__ */ p.jsxs(yt.Item, { children: [
            /* @__PURE__ */ p.jsx(fe, { title: "Выписка для врача", description: "PDF в чат бота", onClick: () => s("report") }),
            /* @__PURE__ */ p.jsx(fe, { title: "Предпочтения по питанию", description: "ограничения и цель калорий", onClick: () => s("data") }),
            /* @__PURE__ */ p.jsx(fe, { title: "Мои данные", description: "рост · вес · возраст · цикл", onClick: () => s("data") }),
            /* @__PURE__ */ p.jsx(fe, { title: "Утренняя сводка", description: `${g.send_time || "08:00"} · МСК`, onClick: () => s("data") }),
            /* @__PURE__ */ p.jsx(
              St.Switch,
              {
                value: g.proactive_enabled !== !1,
                onChange: w,
                children: /* @__PURE__ */ p.jsx(
                  St.Text,
                  {
                    title: "Проактивные сообщения",
                    description: g.proactive_enabled === !1 ? "выключены" : "не больше одного в день"
                  }
                )
              }
            ),
            /* @__PURE__ */ p.jsx(fe, { title: "Партнёр и близкие", description: "короткая бережная сводка", onClick: b })
          ] }) })
        ] }) : null,
        l === "data" ? /* @__PURE__ */ p.jsxs("div", { className: "aiwa-form-stack", children: [
          /* @__PURE__ */ p.jsx(st, { variant: "title3", weight: "semibold", children: "Параметры тела" }),
          /* @__PURE__ */ p.jsxs("div", { className: "aiwa-form-grid", children: [
            /* @__PURE__ */ p.jsx(te, { label: "Рост, см", value: g.height || "", onChange: (j) => v((R) => ({ ...R, height: j })), inputMode: "decimal" }),
            /* @__PURE__ */ p.jsx(te, { label: "Вес, кг", value: g.weight || "", onChange: (j) => v((R) => ({ ...R, weight: j })), inputMode: "decimal" }),
            /* @__PURE__ */ p.jsx(te, { label: "Возраст", value: g.age || "", onChange: (j) => v((R) => ({ ...R, age: j })), inputMode: "numeric" }),
            /* @__PURE__ */ p.jsx(te, { label: "Длина цикла", value: g.cycle_len || "", onChange: (j) => v((R) => ({ ...R, cycle_len: j })), inputMode: "numeric" })
          ] }),
          /* @__PURE__ */ p.jsx(st, { variant: "title3", weight: "semibold", children: "Питание" }),
          /* @__PURE__ */ p.jsx(
            te,
            {
              label: "Предпочтения и ограничения",
              value: g.diet_note || "",
              onChange: (j) => v((R) => ({ ...R, diet_note: j })),
              placeholder: "Например: без свинины, аллергия на орехи",
              multiline: !0
            }
          ),
          /* @__PURE__ */ p.jsx(te, { label: "Желаемые калории", value: g.kcal_goal || "", onChange: (j) => v((R) => ({ ...R, kcal_goal: j })), inputMode: "numeric" }),
          /* @__PURE__ */ p.jsx(te, { label: "Время утренней сводки", type: "time", value: g.send_time || "08:00", onChange: (j) => v((R) => ({ ...R, send_time: j })) }),
          /* @__PURE__ */ p.jsx(oe, { variant: "filled", label: "Сохранить", isFill: !0, ...Se("Сохранить данные", T) })
        ] }) : null,
        l === "report" ? /* @__PURE__ */ p.jsxs("div", { className: "aiwa-form-stack", children: [
          /* @__PURE__ */ p.jsx(st, { variant: "body", weight: "regular", children: "Циклы, динамика и дневник симптомов придут PDF-файлом в чат бота." }),
          /* @__PURE__ */ p.jsx(
            Xi,
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
          /* @__PURE__ */ p.jsx(oe, { variant: "filled", label: "Собрать выписку", isFill: !0, ...Se("Собрать выписку", S) })
        ] }) : null,
        l === "partner" ? /* @__PURE__ */ p.jsxs("div", { className: "aiwa-form-stack", children: [
          /* @__PURE__ */ p.jsxs("div", { className: "aiwa-paper-card", children: [
            /* @__PURE__ */ p.jsx(st, { variant: "title3", weight: "semibold", children: "Бережная сводка для близкого" }),
            /* @__PURE__ */ p.jsx(st, { variant: "body", weight: "regular", children: "Айва расскажет, когда особенно нужны поддержка и отдых — без интимных и медицинских деталей." })
          ] }),
          f === null ? /* @__PURE__ */ p.jsx(st, { variant: "body", weight: "regular", children: "Готовлю ссылку…" }) : null,
          f?.linked ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
            /* @__PURE__ */ p.jsx("div", { className: "aiwa-sheet-card", children: /* @__PURE__ */ p.jsx(fe, { title: "Партнёр подключён", description: "Получает только бережную сводку без календаря и приватных заметок." }) }),
            /* @__PURE__ */ p.jsx(oe, { variant: "filled", label: "Отключить партнёра", isFill: !0, ...Se("Отключить партнёра", M) })
          ] }) : null,
          f?.link ? /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
            /* @__PURE__ */ p.jsx(te, { label: "Ссылка-приглашение", value: f.link, readOnly: !0, multiline: !0 }),
            /* @__PURE__ */ p.jsx(oe, { variant: "filled", label: "Скопировать ссылку", isFill: !0, ...Se("Скопировать ссылку", _) })
          ] }) : null,
          f && !f.linked && !f.link ? /* @__PURE__ */ p.jsx(st, { variant: "body", weight: "regular", children: "Ссылка доступна после запуска из Telegram. В боте можно использовать команду /partner." }) : null
        ] }) : null
      ] }) })
    }
  );
}
function qA() {
  const a = window.Telegram?.WebApp?.initDataUnsafe?.user, e = a?.photo_url;
  if (e) return /* @__PURE__ */ p.jsx(I8, { src: e, size: 36 });
  const s = ((typeof window.aiwaData == "function" ? window.aiwaData() : window.aiwaData)?.name || a?.first_name || "").trim();
  return /* @__PURE__ */ p.jsx("span", { className: "aiwa-avatar-initial", "aria-hidden": "true", children: (s[0] || "•").toUpperCase() });
}
function $A(a) {
  return /* @__PURE__ */ p.jsx(tl, { children: /* @__PURE__ */ p.jsx(Ii, { mode: "secondary", children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-deslop-home", children: [
    /* @__PURE__ */ p.jsx(
      zh,
      {
        title: a.dateText,
        left: /* @__PURE__ */ p.jsx(qA, {}),
        onLeft: () => window.AiwaDeslop?.openProfile?.(),
        leftAriaLabel: "Открыть профиль",
        right: /* @__PURE__ */ p.jsx(ZE, {}),
        onRight: () => Ke("openHomePanel", "calendar"),
        rightAriaLabel: "Открыть календарь"
      }
    ),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-overview", children: [
      /* @__PURE__ */ p.jsx(
        Lh,
        {
          days: a.week,
          selectedIso: a.selectedIso,
          onSelect: a.onSelectDay ?? ((e) => Ke("aiwaSelectDay", e.iso))
        }
      ),
      /* @__PURE__ */ p.jsxs("div", { className: "aiwa-countdown", children: [
        /* @__PURE__ */ p.jsx(st, { variant: "title1", weight: "semibold", children: a.heroValue || `${a.countdown} дней` }),
        /* @__PURE__ */ p.jsx(st, { variant: "body", weight: "regular", children: a.countdownLabel })
      ] }),
      /* @__PURE__ */ p.jsx(
        oe,
        {
          variant: "filled",
          label: /* @__PURE__ */ p.jsxs("span", { className: "aiwa-btn-icon-label", children: [
            /* @__PURE__ */ p.jsx(Ur, {}),
            " Занести в журнал"
          ] }),
          ...Se("Занести в журнал", () => Ke("openHomePanel", "journal"))
        }
      )
    ] }),
    /* @__PURE__ */ p.jsxs(yt, { className: "aiwa-tma-blocks", children: [
      /* @__PURE__ */ p.jsx(yA, { title: a.dayTitle, checkin: a.dayCheckin ?? a.checkin, symptomGroups: a.symptomGroups }),
      /* @__PURE__ */ p.jsx(wA, { aiText: a.aiText }),
      /* @__PURE__ */ p.jsx(TA, { delay: a.delay }),
      /* @__PURE__ */ p.jsx(AA, { metrics: a.metrics, title: a.statsTitle }),
      /* @__PURE__ */ p.jsx(
        _A,
        {
          data: a.chartData,
          series: a.chartSeries,
          title: a.chartTitle,
          emptyText: a.chartEmptyText
        }
      ),
      /* @__PURE__ */ p.jsx(
        DA,
        {
          history: a.history,
          title: a.historyTitle,
          emptyTitle: a.historyEmptyTitle,
          emptyDescription: a.historyEmptyDescription
        }
      )
    ] }),
    /* @__PURE__ */ p.jsx(
      kA,
      {
        panel: a.panel,
        onClose: a.onPanelClose,
        checkin: a.checkin,
        symptomGroups: a.symptomGroups,
        mode: a.mode,
        revision: a.panelRevision
      }
    ),
    /* @__PURE__ */ p.jsx(HA, { isOpen: a.profileOpen, onClose: a.onProfileClose })
  ] }) }) });
}
const Kg = {
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
function GA({ kind: a }) {
  return a === "week" ? /* @__PURE__ */ p.jsxs("div", { className: "aiwa-overview", children: [
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-week", children: Md(7).map((e) => /* @__PURE__ */ p.jsx(Gi, { className: "aiwa-skeleton-day" }, e)) }),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-countdown", children: [
      /* @__PURE__ */ p.jsx(Qa, { active: !0, width: 2 }),
      /* @__PURE__ */ p.jsx(Qa, { active: !0, width: 18 })
    ] })
  ] }) : /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsx(Gi, { className: "aiwa-skeleton-gauge" }),
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-macro-grid", children: Md(3).map((e) => /* @__PURE__ */ p.jsx(Gi, { className: "aiwa-skeleton-macro" }, e)) })
  ] });
}
function sx({ title: a, variant: e = "food" }) {
  const { hero: l, sections: s } = Kg[e] || Kg.food;
  return /* @__PURE__ */ p.jsx(tl, { children: /* @__PURE__ */ p.jsx(Ii, { mode: "secondary", children: /* @__PURE__ */ p.jsxs("div", { className: `aiwa-paper-screen aiwa-screen-skeleton aiwa-${e}-screen`, children: [
    /* @__PURE__ */ p.jsx(st, { className: "aiwa-screen-title", variant: "title1", weight: "semibold", children: a }),
    /* @__PURE__ */ p.jsxs(rb, { active: !0, children: [
      /* @__PURE__ */ p.jsx(GA, { kind: l }),
      /* @__PURE__ */ p.jsx("div", { className: "aiwa-screen-cta", children: /* @__PURE__ */ p.jsx(Gi, { className: "aiwa-skeleton-cta" }) }),
      /* @__PURE__ */ p.jsxs(yt, { className: "aiwa-tma-blocks", children: [
        /* @__PURE__ */ p.jsx(yt.Item, { className: "aiwa-insight-section", children: /* @__PURE__ */ p.jsx(St, { tappable: !1, children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-insight-content", children: [
          /* @__PURE__ */ p.jsx(Qa, { active: !0, width: 30 }),
          /* @__PURE__ */ p.jsx(Qa, { active: !0, width: 26 }),
          /* @__PURE__ */ p.jsx(Gi, { className: "aiwa-skeleton-insight-cta" })
        ] }) }) }),
        s.map((r) => /* @__PURE__ */ p.jsx(yt.Item, { header: r.header, children: Md(r.rows).map((c) => /* @__PURE__ */ p.jsx(
          St,
          {
            tappable: !1,
            start: r.media ? /* @__PURE__ */ p.jsx(Gi, { className: "aiwa-skeleton-thumb" }) : void 0,
            children: /* @__PURE__ */ p.jsx(
              St.Text,
              {
                title: /* @__PURE__ */ p.jsx(Qa, { active: !0, width: 13 }),
                description: /* @__PURE__ */ p.jsx(Qa, { active: !0, width: 22 })
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
  return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-macro-card", children: [
    /* @__PURE__ */ p.jsxs(st, { variant: "body", weight: "semibold", children: [
      Math.round(e || 0),
      l ? null : " г",
      l ? /* @__PURE__ */ p.jsxs("span", { children: [
        " / ",
        Math.round(l),
        " г"
      ] }) : null
    ] }),
    /* @__PURE__ */ p.jsx(st, { variant: "caption1", weight: "regular", children: a }),
    /* @__PURE__ */ p.jsx("span", { className: "aiwa-macro-track", style: { "--macro-color": f }, children: /* @__PURE__ */ p.jsx("span", { style: { width: `${c}%` } }) })
  ] });
}
const Zg = "M 11 169 A 158 158 0 0 1 327 169", Qg = Math.PI * 158, YA = 500, XA = (a) => 1 - (1 - a) ** 3;
function PA(a) {
  const [e, l] = A.useState(0), s = A.useRef(0), r = A.useRef(0);
  return A.useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      s.current = a, l(a);
      return;
    }
    const f = s.current, h = performance.now(), y = (m) => {
      const g = Math.min(1, (m - h) / YA), v = f + (a - f) * XA(g);
      s.current = v, l(v), g < 1 && (r.current = requestAnimationFrame(y));
    };
    return r.current = requestAnimationFrame(y), () => cancelAnimationFrame(r.current);
  }, [a]), e;
}
function KA({ kcal: a, kcalTarget: e }) {
  const l = Number(a || 0), s = Number(e || 0), r = PA(Math.min(1, l / Math.max(1, s))), c = r * Math.PI, f = 169 - 158 * Math.cos(c), h = 169 - 158 * Math.sin(c);
  return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-food-gauge", children: [
    /* @__PURE__ */ p.jsxs("svg", { className: "aiwa-food-gauge-arc", viewBox: "0 0 338 180", width: "338", height: "180", fill: "none", children: [
      /* @__PURE__ */ p.jsx("path", { className: "aiwa-food-gauge-track", d: Zg }),
      /* @__PURE__ */ p.jsx(
        "path",
        {
          className: "aiwa-food-gauge-progress",
          d: Zg,
          strokeDasharray: Qg,
          strokeDashoffset: Qg * (1 - r)
        }
      ),
      /* @__PURE__ */ p.jsx("circle", { className: "aiwa-food-gauge-knob", cx: f, cy: h, r: "11" })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-food-gauge-center", children: [
      /* @__PURE__ */ p.jsx(st, { variant: "title1", weight: "semibold", children: Ed(l) }),
      /* @__PURE__ */ p.jsxs(st, { variant: "body", weight: "regular", children: [
        "из ",
        Ed(s)
      ] })
    ] })
  ] });
}
function Fg({ meal: a, onSaved: e, onClose: l }) {
  const [s, r] = A.useState(() => fA(a)), [c, f] = A.useState(!1), h = (m, g) => r((v) => ({ ...v, [m]: g })), y = async () => {
    if (!s.title.trim() && !String(s.kcal).trim()) {
      Ot("Укажи название или калории", { type: "error" });
      return;
    }
    f(!0);
    try {
      const m = await Zt(a ? "/api/diary_edit" : "/api/food_manual", {
        ...a ? { id: a.id } : {},
        ...s
      });
      if (m?.ok === !1 || m?.error) throw new Error(m.message || "Не получилось сохранить");
      Ot(a ? "Приём обновлён" : "Приём добавлен", { type: "success" }), await e(), l();
    } catch (m) {
      Ot(m.message || "Не получилось сохранить", { type: "error" });
    } finally {
      f(!1);
    }
  };
  return /* @__PURE__ */ p.jsxs("div", { className: "aiwa-form-stack", children: [
    /* @__PURE__ */ p.jsx(te, { label: "Название", value: s.title, onChange: (m) => h("title", m), placeholder: "Например, творог и банан" }),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-form-grid", children: [
      /* @__PURE__ */ p.jsx(te, { label: "Ккал", value: s.kcal, onChange: (m) => h("kcal", m), inputMode: "decimal" }),
      /* @__PURE__ */ p.jsx(te, { label: "Граммы", value: s.grams, onChange: (m) => h("grams", m), inputMode: "decimal" }),
      /* @__PURE__ */ p.jsx(te, { label: "Белки", value: s.protein, onChange: (m) => h("protein", m), inputMode: "decimal" }),
      /* @__PURE__ */ p.jsx(te, { label: "Жиры", value: s.fat, onChange: (m) => h("fat", m), inputMode: "decimal" }),
      /* @__PURE__ */ p.jsx(te, { label: "Углеводы", value: s.carbs, onChange: (m) => h("carbs", m), inputMode: "decimal" })
    ] }),
    /* @__PURE__ */ p.jsx(Xi, { label: "Приём пищи", options: Wb, value: s.slot, onChange: (m) => h("slot", m) }),
    /* @__PURE__ */ p.jsx(
      oe,
      {
        variant: "filled",
        label: c ? "Сохраняю…" : a ? "Сохранить изменения" : "Сохранить приём",
        isFill: !0,
        disabled: c,
        ...Se("Сохранить приём", y)
      }
    )
  ] });
}
function ZA({ isOpen: a, onClose: e, onSaved: l, editingMeal: s = null }) {
  const [r, c] = A.useState("text"), [f, h] = A.useState(""), [y, m] = A.useState(!1);
  A.useEffect(() => {
    a && (Kb("food"), c(s ? "manual" : "text"), h(""));
  }, [s, a]);
  const g = async () => {
    if (f.trim()) {
      m(!0);
      try {
        const b = await Zt("/api/food_text", { text: f.trim() });
        if (!b?.ok) throw new Error(b?.message || "Не получилось разобрать приём");
        Ot(`Добавлено · ${b.rec?.kcal || 0} ккал`, { type: "success" }), await l(), e();
      } catch (b) {
        Ot(b.message || "Не получилось добавить", { type: "error" });
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
        Ot(T.message || "Не получилось разобрать фото", { type: "error" });
      } finally {
        m(!1);
      }
    }
  };
  return /* @__PURE__ */ p.jsx(Cn, { isOpen: a, onClose: e, children: /* @__PURE__ */ p.jsx("div", { children: /* @__PURE__ */ p.jsx("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: s ? /* @__PURE__ */ p.jsx(Fg, { meal: s, onSaved: l, onClose: e }) : /* @__PURE__ */ p.jsxs(p.Fragment, { children: [
    /* @__PURE__ */ p.jsx(
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
    r === "photo" ? /* @__PURE__ */ p.jsxs("label", { className: `aiwa-upload-zone${y ? " is-busy" : ""}`, children: [
      y ? /* @__PURE__ */ p.jsx(Nh, { size: 28 }) : null,
      /* @__PURE__ */ p.jsx(st, { variant: "title3", weight: "semibold", children: y ? "Разбираю фото…" : "Сфотографировать еду" }),
      /* @__PURE__ */ p.jsx(st, { variant: "body", weight: "regular", children: y ? "Айва считает КБЖУ, это займёт несколько секунд." : "Айва распознает блюдо и посчитает КБЖУ." }),
      /* @__PURE__ */ p.jsx("input", { type: "file", accept: "image/*", capture: "environment", disabled: y, onChange: (b) => v(b.target.files?.[0]) })
    ] }) : null,
    r === "text" ? /* @__PURE__ */ p.jsxs("div", { className: "aiwa-form-stack", children: [
      /* @__PURE__ */ p.jsx(
        te,
        {
          label: "Что съела?",
          value: f,
          onChange: h,
          placeholder: "Например: 200 г творога и банан",
          multiline: !0
        }
      ),
      /* @__PURE__ */ p.jsx(
        oe,
        {
          variant: "filled",
          label: y ? "Считаю…" : "Добавить приём",
          isFill: !0,
          disabled: y || !f.trim(),
          ...Se("Добавить приём", g)
        }
      )
    ] }) : null,
    r === "manual" ? /* @__PURE__ */ p.jsx(Fg, { meal: null, onSaved: l, onClose: e }) : null
  ] }) }) }) });
}
function QA({ isOpen: a, onClose: e, diary: l, onAdd: s, onEdit: r, onDelete: c, onReco: f }) {
  const h = l?.meals || [], y = l?.totals || {}, m = l?.target || {};
  return /* @__PURE__ */ p.jsx(Cn, { isOpen: a, onClose: e, children: /* @__PURE__ */ p.jsxs(yt, { className: "aiwa-tma-blocks", children: [
    /* @__PURE__ */ p.jsx(yt.Item, { children: /* @__PURE__ */ p.jsx(St, { tappable: !1, children: /* @__PURE__ */ p.jsx(
      St.Text,
      {
        title: `${Math.round(y.kcal || 0)} ккал`,
        description: `из ${Math.round(m.kcal || 0) || "—"} ккал`,
        bold: !0
      }
    ) }) }),
    Wb.map((g) => {
      const v = h.filter((b) => (b.slot || "snack") === g.value);
      return /* @__PURE__ */ p.jsx(yt.Item, { header: g.label, children: v.length ? v.map((b) => /* @__PURE__ */ p.jsx(
        fe,
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
              children: /* @__PURE__ */ p.jsx(Yb, {})
            }
          )
        },
        b.id
      )) : /* @__PURE__ */ p.jsx(St, { as: "button", type: "button", onClick: s, end: /* @__PURE__ */ p.jsx(St.Part, { type: "Chevron" }), children: /* @__PURE__ */ p.jsx(St.Text, { type: "Accent", title: "Добавить" }) }) }, g.value);
    }),
    /* @__PURE__ */ p.jsx(yt.Item, { children: /* @__PURE__ */ p.jsx(St, { tappable: !1, children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-cell-actions", children: [
      /* @__PURE__ */ p.jsx(oe, { variant: "filled", label: "Добавить приём", isFill: !0, ...Se("Добавить приём", s) }),
      /* @__PURE__ */ p.jsx(oe, { variant: "filled", label: "Совет по дневнику", isFill: !0, ...Se("Совет по дневнику", f) })
    ] }) }) })
  ] }) });
}
function FA({ isOpen: a, meal: e, slotLabel: l = "", onClose: s, onAdd: r, busy: c = !1 }) {
  const [f, h] = A.useState(null), [y, m] = A.useState(!1), g = e?.dish || "";
  A.useEffect(() => {
    if (!a || !g) return;
    h(null), m(!1);
    let b = !0;
    return Zt("/api/recipe", { dish: g }).then((T) => {
      b && (T?.steps?.length ? h(T) : m(!0));
    }).catch(() => b && m(!0)), () => {
      b = !1;
    };
  }, [a, g]);
  const v = [l, e?.kcal, f?.time].filter(Boolean).join(" · ");
  return /* @__PURE__ */ p.jsx(Cn, { isOpen: a, onClose: s, children: /* @__PURE__ */ p.jsxs(yt, { className: "aiwa-tma-blocks", children: [
    /* @__PURE__ */ p.jsx(yt.Item, { children: /* @__PURE__ */ p.jsx(St, { tappable: !1, children: /* @__PURE__ */ p.jsx(St.Text, { title: g, description: v || e?.note || "", bold: !0 }) }) }),
    !f && !y ? /* @__PURE__ */ p.jsx(yt.Item, { children: /* @__PURE__ */ p.jsx(St, { tappable: !1, children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-cell-actions", "aria-label": "Готовлю рецепт", children: [
      /* @__PURE__ */ p.jsx(Nh, { size: "m" }),
      /* @__PURE__ */ p.jsx(st, { variant: "body", weight: "regular", children: "Айва пишет рецепт…" })
    ] }) }) }) : null,
    y ? /* @__PURE__ */ p.jsx(yt.Item, { children: /* @__PURE__ */ p.jsx(St, { tappable: !1, children: /* @__PURE__ */ p.jsx(St.Text, { title: "Рецепт не собрался", description: "Попробуй открыть блюдо ещё раз." }) }) }) : null,
    f?.ingredients?.length ? /* @__PURE__ */ p.jsx(yt.Item, { header: "Ингредиенты", children: f.ingredients.map((b) => /* @__PURE__ */ p.jsx(St, { tappable: !1, children: /* @__PURE__ */ p.jsx(St.Text, { title: b }) }, b)) }) : null,
    f?.steps?.length ? /* @__PURE__ */ p.jsx(yt.Item, { header: "Приготовление", children: f.steps.map((b, T) => /* @__PURE__ */ p.jsx(St, { tappable: !1, children: /* @__PURE__ */ p.jsx(St.Text, { title: `${T + 1}. ${b}` }) }, b)) }) : null,
    /* @__PURE__ */ p.jsx(yt.Item, { children: /* @__PURE__ */ p.jsx(St, { tappable: !1, children: /* @__PURE__ */ p.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ p.jsx(
      oe,
      {
        variant: "filled",
        label: c ? "Добавляю…" : "Добавить в дневник",
        isFill: !0,
        disabled: c,
        ...Se("Добавить в дневник", r)
      }
    ) }) }) })
  ] }) });
}
const ox = {
  foodSection: () => Zt("/api/section", { kind: "food" }),
  diary: () => Zt("/api/diary", {}),
  trainingSection: () => Zt("/api/section", { kind: "training" }),
  train: () => Zt("/api/train", {})
}, qi = /* @__PURE__ */ new Map(), Wo = /* @__PURE__ */ new Map(), Io = (a) => Object.fromEntries(a.map((e) => [e, qi.get(e) ?? null])), _d = (a, { force: e = !1 } = {}) => {
  if (!e) {
    if (qi.has(a)) return Promise.resolve(qi.get(a));
    const s = Wo.get(a);
    if (s) return s;
  }
  const l = ox[a]().catch(() => null).then((s) => (s && qi.set(a, s), Wo.get(a) === l && Wo.delete(a), qi.get(a) ?? null));
  return Wo.set(a, l), l;
}, JA = () => {
  Object.keys(ox).forEach((a) => {
    _d(a);
  });
};
function rx(a, e) {
  const [l, s] = A.useState(() => Io(a)), r = A.useRef(!1), c = A.useCallback(async (...h) => {
    const y = h.length ? h : a;
    await Promise.all(y.map((m) => _d(m, { force: !0 }))), s(Io(a));
  }, [a]), f = A.useCallback((h, y) => {
    qi.set(h, y), s(Io(a));
  }, [a]);
  return A.useEffect(() => {
    let h = !0;
    const y = r.current;
    return r.current = !0, Promise.all(a.map((m) => _d(m, { force: y }))).then(() => {
      h && s(Io(a));
    }), () => {
      h = !1;
    };
  }, e), [l, c, f];
}
const WA = ["foodSection", "diary"], IA = "/assets/paper-food-placeholder.png", Jg = (a) => String(a || "").toLowerCase().replace(/ё/g, "е"), Wg = (a, e) => {
  const l = Jg(e).trim();
  if (!a || !l) return null;
  const s = a[String(e || "").trim()];
  if (s) return s;
  let r = null, c = 0;
  for (const [f, h] of Object.entries(a)) {
    const y = Jg(f);
    if (y === l) return h;
    const m = y.split(/[^а-яa-z0-9]+/).filter((v) => v.length > 3);
    let g = 0;
    for (const v of m) l.includes(v.slice(0, 4)) && (g += v.length > 5 ? 2 : 1);
    g > c && (c = g, r = h);
  }
  return c >= 2 ? r : null;
}, t7 = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"], e7 = () => {
  const a = [];
  for (let e = 6; e >= 0; e -= 1) {
    const l = /* @__PURE__ */ new Date();
    l.setDate(l.getDate() - e);
    const s = `${l.getFullYear()}-${String(l.getMonth() + 1).padStart(2, "0")}-${String(l.getDate()).padStart(2, "0")}`;
    a.push({ iso: s, date: String(l.getDate()), label: t7[l.getDay()], today: e === 0 });
  }
  return a;
}, n7 = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" });
function Ig({ mode: a, revision: e = 0 }) {
  const [l, s, r] = rx(WA, [a, e]), [c, f] = A.useState({}), [h, y] = A.useState(""), [m, g] = A.useState(null), [v, b] = A.useState(null), [T, S] = A.useState(!1), [w, E] = A.useState(""), [_, M] = A.useState(null), [j, R] = A.useState(!1), B = A.useRef(null);
  A.useEffect(() => {
    fetch("/assets/food/manifest.json").then((it) => it.ok ? it.json() : {}).then((it) => f(it || {})).catch(() => {
    });
  }, []);
  const L = () => s("diary");
  if (!l.foodSection || !l.diary) return /* @__PURE__ */ p.jsx(sx, { title: "Питание", variant: "food" });
  const D = l.foodSection, k = l.diary, P = k.totals || {}, H = k.target || {}, I = D.menu?.meals || [], Q = [
    { index: 0, value: "breakfast", label: "Завтрак" },
    { index: 1, value: "lunch", label: "Обед" },
    { index: I.length >= 4 ? 3 : 2, value: "dinner", label: "Ужин" }
  ].map((it) => ({ ...it, meal: I[it.index] })).filter((it) => it.meal), at = Number(H.kcal || D.kcal || 0), ot = Number(P.kcal || 0), V = (it) => Number(P[it] || 0), J = e7(), et = J[J.length - 1].iso, nt = !!(h && h !== et), ut = nt ? m?.meals || [] : (k.meals || []).slice().reverse(), N = nt ? `Приёмы за ${n7.format(/* @__PURE__ */ new Date(`${h}T12:00:00`))}` : "Прошедшие приёмы", Y = async (it) => {
    if (y(it), !it || it === et) {
      g(null);
      return;
    }
    g(null);
    const Tt = await Zt("/api/diary", { d: it }).catch(() => null);
    g(Tt || { meals: [] });
  }, tt = async (it, Tt) => {
    if (!T) {
      S(!0);
      try {
        const Gt = await Zt("/api/food_text", { text: it.dish || it.title, slot: Tt }).catch(() => null);
        Gt?.ok ? (Ot("Добавлено в дневник", { type: "success" }), b(null), await L()) : Ot(Gt?.message || "Не получилось добавить", { type: "error" });
      } finally {
        S(!1);
      }
    }
  }, lt = async (it) => {
    const Tt = await Zt("/api/diary_del", { id: it }).catch(() => null);
    Tt && !Tt.error && (r("diary", { meals: Tt.meals || [], totals: Tt.totals || {}, target: Tt.target || H }), Ot("Приём удалён", { type: "success" }));
  }, dt = () => {
    M(null), E("add");
  }, ht = async (it) => {
    if (!(!it || j)) {
      R(!0);
      try {
        const Tt = window.aiwaUploadFoodPhoto;
        if (typeof Tt != "function") throw new Error("Загрузка фото недоступна");
        await Tt(it), await L();
      } catch (Tt) {
        Ot(Tt.message || "Не получилось разобрать фото", { type: "error" });
      } finally {
        R(!1);
      }
    }
  }, gt = async () => {
    await Zt("/api/food_prompt", {}).catch(() => null), Ar({ nudge: !1 });
  }, Rt = [
    { label: "Фото", icon: /* @__PURE__ */ p.jsx(WE, {}), onSelect: () => B.current?.click() },
    { label: "Текстом", icon: /* @__PURE__ */ p.jsx(IE, {}), onSelect: gt }
  ];
  return /* @__PURE__ */ p.jsx(tl, { children: /* @__PURE__ */ p.jsx(Ii, { mode: "secondary", children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-paper-screen aiwa-food-screen", children: [
    /* @__PURE__ */ p.jsx(st, { className: "aiwa-screen-title", variant: "title1", weight: "semibold", children: "Питание" }),
    /* @__PURE__ */ p.jsx(KA, { kcal: ot, kcalTarget: at }),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-macro-grid", children: [
      /* @__PURE__ */ p.jsx(Hf, { label: "Жиры", value: V("fat"), target: H.fat, macro: "fat" }),
      /* @__PURE__ */ p.jsx(Hf, { label: "Белки", value: V("protein"), target: H.protein, macro: "protein" }),
      /* @__PURE__ */ p.jsx(Hf, { label: "Углеводы", value: V("carbs"), target: H.carbs, macro: "carbs" })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-screen-cta", children: [
      /* @__PURE__ */ p.jsx(
        lx,
        {
          items: Rt,
          trigger: /* @__PURE__ */ p.jsx(
            oe,
            {
              variant: "filled",
              "aria-label": "Добавить приём",
              label: /* @__PURE__ */ p.jsxs("span", { className: "aiwa-btn-icon-label", children: [
                /* @__PURE__ */ p.jsx(Ur, {}),
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
          onChange: (it) => {
            ht(it.target.files?.[0]), it.target.value = "";
          }
        }
      )
    ] }),
    /* @__PURE__ */ p.jsxs(yt, { className: "aiwa-tma-blocks", children: [
      /* @__PURE__ */ p.jsx(
        kr,
        {
          message: D.text || "Выбираем простую еду с белком в каждом приёме.",
          onDiscuss: () => Ar({ topic: "food" })
        }
      ),
      Q.length ? /* @__PURE__ */ p.jsx(yt.Item, { header: "Меню на сегодня", children: Q.map((it) => /* @__PURE__ */ p.jsx(
        fe,
        {
          image: it.meal.image || Wg(c, it.meal.dish) || IA,
          title: it.meal.dish || "Рекомендация Айвы",
          description: [it.label, it.meal.kcal, it.meal.note].filter(Boolean).join(" · "),
          onClick: () => b(it)
        },
        it.value
      )) }) : null,
      /* @__PURE__ */ p.jsxs(yt.Item, { header: N, children: [
        /* @__PURE__ */ p.jsx(Lh, { days: J, selectedIso: h || et, onSelect: Y }),
        j ? /* @__PURE__ */ p.jsx(fe, { loading: !0, title: "Разбираю фото…", description: "Айва считает КБЖУ" }) : null,
        nt && !m ? /* @__PURE__ */ p.jsx(fe, { loading: !0, title: "Загружаю…", description: "Дневник за выбранный день" }) : null,
        ut.length ? ut.map((it) => /* @__PURE__ */ p.jsx(
          fe,
          {
            image: Wg(c, it.title) || cA,
            title: it.title,
            description: `${Ed(it.kcal)} · Б${Math.round(it.protein || 0)} · Ж${Math.round(it.fat || 0)} · У${Math.round(it.carbs || 0)}`,
            onClick: nt ? void 0 : () => E("diary")
          },
          it.id
        )) : j || nt && !m ? null : /* @__PURE__ */ p.jsx(
          fe,
          {
            title: nt ? "В этот день записей нет" : "Дневник пока пуст",
            description: nt ? "Дневник за этот день пуст." : "Добавь первый приём — фото, текстом или вручную.",
            onClick: nt ? void 0 : () => E("diary")
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ p.jsx(
      ZA,
      {
        isOpen: w === "add",
        onClose: () => E(""),
        onSaved: L,
        editingMeal: _
      }
    ),
    /* @__PURE__ */ p.jsx(
      FA,
      {
        isOpen: !!v,
        meal: v?.meal,
        slotLabel: v?.label,
        busy: T,
        onClose: () => b(null),
        onAdd: () => v && tt(v.meal, v.value)
      }
    ),
    /* @__PURE__ */ p.jsx(
      QA,
      {
        isOpen: w === "diary",
        onClose: () => E(""),
        diary: k,
        onAdd: dt,
        onEdit: (it) => {
          M(it), E("add");
        },
        onDelete: lt,
        onReco: async () => {
          const it = await Zt("/api/diary_reco", {}).catch(() => null);
          Ot(it?.text || "Не удалось собрать совет");
        }
      }
    )
  ] }) }) });
}
function a7({ isOpen: a, onClose: e, onSaved: l, suggested: s }) {
  const r = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), [c, f] = A.useState(r), [h, y] = A.useState("Силовая"), [m, g] = A.useState("45 мин"), [v, b] = A.useState("Нормально"), [T, S] = A.useState([]), [w, E] = A.useState({}), [_, M] = A.useState(""), [j, R] = A.useState(!1);
  A.useEffect(() => {
    if (!a) return;
    Kb("workout");
    const H = s?.name || "", I = /ход/i.test(H) ? "Ходьба" : /йог|мобил|релиз/i.test(H) ? "Йога" : /кардио/i.test(H) ? "Кардио" : "Силовая";
    y(I), S(H ? [H] : []), E({}), M(""), f(r);
  }, [a, s, r]);
  const B = (H) => S((I) => I.includes(H) ? I.filter((K) => K !== H) : [...I, H]), L = h === "Силовая", D = (H, I, K) => E((Q) => ({ ...Q, [H]: { ...Q[H], [I]: K } })), k = (H, I) => {
    const K = String(w[H]?.[I] ?? "").replace(",", ".").trim(), Q = Number(K);
    return K && Number.isFinite(Q) && Q > 0 ? Q : null;
  }, P = async () => {
    const H = [...T, ..._.trim() ? [_.trim()] : []];
    R(!0);
    try {
      const I = await Zt("/api/workout", {
        date: c,
        type: h,
        duration: m,
        rpe: v,
        items: H.map((K) => ({
          name: K,
          weight: L ? k(K, "w") : null,
          sets: L ? k(K, "sets") : null,
          reps: L ? k(K, "reps") : null
        }))
      });
      if (!I?.ok) throw new Error(I?.text || "Не получилось сохранить тренировку");
      Ot(`Тренировка сохранена · ~${I.calories || 0} ккал`, { type: "success" }), await l(), e();
    } catch (I) {
      Ot(I.message || "Не получилось сохранить", { type: "error" });
    } finally {
      R(!1);
    }
  };
  return /* @__PURE__ */ p.jsx(Cn, { isOpen: a, onClose: e, children: /* @__PURE__ */ p.jsx("div", { children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ p.jsx(te, { label: "Когда", type: "date", value: c, onChange: f }),
    /* @__PURE__ */ p.jsx(Xi, { label: "Что делала", options: dA, value: h, onChange: (H) => {
      y(H), S([]);
    } }),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-form-group", children: [
      /* @__PURE__ */ p.jsx(st, { className: "aiwa-form-label", variant: "body", weight: "semibold", children: "Упражнения" }),
      /* @__PURE__ */ p.jsxs("div", { className: "aiwa-sheet-card", children: [
        (hA[h] || []).map((H) => /* @__PURE__ */ p.jsxs("div", { children: [
          /* @__PURE__ */ p.jsxs(
            Te,
            {
              as: "button",
              type: "button",
              mode: "opacity",
              className: "aiwa-exercise-row",
              "aria-pressed": T.includes(H),
              onClick: () => B(H),
              children: [
                /* @__PURE__ */ p.jsx(st, { variant: "body", weight: "regular", children: H }),
                /* @__PURE__ */ p.jsx("span", { className: T.includes(H) ? "aiwa-check is-active" : "aiwa-check", children: T.includes(H) ? "✓" : "+" })
              ]
            }
          ),
          L && T.includes(H) ? /* @__PURE__ */ p.jsxs("div", { className: "aiwa-exercise-nums", children: [
            /* @__PURE__ */ p.jsx(
              "input",
              {
                inputMode: "decimal",
                placeholder: "кг",
                "aria-label": `${H}: вес`,
                value: w[H]?.w ?? "",
                onChange: (I) => D(H, "w", I.target.value)
              }
            ),
            /* @__PURE__ */ p.jsx(
              "input",
              {
                inputMode: "numeric",
                placeholder: "подходы",
                "aria-label": `${H}: подходы`,
                value: w[H]?.sets ?? "",
                onChange: (I) => D(H, "sets", I.target.value)
              }
            ),
            /* @__PURE__ */ p.jsx(
              "input",
              {
                inputMode: "numeric",
                placeholder: "повторы",
                "aria-label": `${H}: повторы`,
                value: w[H]?.reps ?? "",
                onChange: (I) => D(H, "reps", I.target.value)
              }
            )
          ] }) : null
        ] }, H)),
        /* @__PURE__ */ p.jsx(te, { label: "Добавить своё", value: _, onChange: M, placeholder: "Название упражнения" })
      ] })
    ] }),
    /* @__PURE__ */ p.jsx(Xi, { label: "Длительность", options: ["30 мин", "45 мин", "60+ мин"], value: m, onChange: g }),
    /* @__PURE__ */ p.jsx(Xi, { label: "Как ощущалось", options: ["Легко", "Нормально", "Тяжело"], value: v, onChange: b }),
    /* @__PURE__ */ p.jsx(
      oe,
      {
        variant: "filled",
        label: j ? "Сохраняю…" : "Сохранить и разобрать",
        isFill: !0,
        disabled: j,
        ...Se("Сохранить и разобрать", P)
      }
    )
  ] }) }) });
}
function i7({ isOpen: a, onClose: e, options: l, onSelect: s }) {
  return /* @__PURE__ */ p.jsx(Cn, { isOpen: a, onClose: e, children: /* @__PURE__ */ p.jsxs(yt, { className: "aiwa-tma-blocks", children: [
    /* @__PURE__ */ p.jsx(yt.Item, { children: /* @__PURE__ */ p.jsx(St, { tappable: !1, children: /* @__PURE__ */ p.jsx(
      St.Text,
      {
        title: "Рекомендация на сегодня",
        description: "Выбери вариант, после которого останется запас сил."
      }
    ) }) }),
    /* @__PURE__ */ p.jsx(yt.Item, { children: l.map((r, c) => /* @__PURE__ */ p.jsx(
      fe,
      {
        title: r.name || `Вариант ${c + 1}`,
        description: r.how || r.benefit || r.detail,
        onClick: () => s(r)
      },
      r.name || c
    )) })
  ] }) });
}
function l7({ isOpen: a, onClose: e, state: l, onAdd: s }) {
  const r = l?.today || [];
  return /* @__PURE__ */ p.jsx(Cn, { isOpen: a, onClose: e, children: /* @__PURE__ */ p.jsxs(yt, { className: "aiwa-tma-blocks", children: [
    l?.last_review ? /* @__PURE__ */ p.jsx(
      kr,
      {
        message: l.last_review.text || l.last_review,
        onDiscuss: () => Ke("go", "chat")
      }
    ) : null,
    /* @__PURE__ */ p.jsx(yt.Item, { header: "Неделя", children: (l?.week || []).map((c) => /* @__PURE__ */ p.jsx(
      fe,
      {
        title: c.dow,
        description: c.count ? `${c.type || "Тренировка"} · ${c.count}` : "Без тренировки",
        muted: !c.count
      },
      c.d
    )) }),
    r.length ? /* @__PURE__ */ p.jsx(yt.Item, { header: "Сегодня", children: r.map((c) => /* @__PURE__ */ p.jsx(
      fe,
      {
        title: c.type || "Тренировка",
        description: `${c.duration || "—"} · ${String(c.rpe || "").toLowerCase()}`
      },
      c.id
    )) }) : null,
    /* @__PURE__ */ p.jsx(yt.Item, { children: /* @__PURE__ */ p.jsx(St, { tappable: !1, children: /* @__PURE__ */ p.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ p.jsx(
      oe,
      {
        variant: "filled",
        label: "Отметить тренировку",
        isFill: !0,
        ...Se("Отметить тренировку", s)
      }
    ) }) }) })
  ] }) });
}
function s7({ isOpen: a, onClose: e, profile: l, onSaved: s }) {
  const [r, c] = A.useState(l || {});
  A.useEffect(() => {
    a && c(l || {});
  }, [a, l]);
  const f = (y, m) => c((g) => ({ ...g, [y]: m })), h = async () => {
    (await Zt("/api/train_profile", r).catch(() => null))?.ok ? (Ot("Тренировочный профиль сохранён", { type: "success" }), await s(), e()) : Ot("Не получилось сохранить", { type: "error" });
  };
  return /* @__PURE__ */ p.jsx(Cn, { isOpen: a, onClose: e, children: /* @__PURE__ */ p.jsx("div", { children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ p.jsx(st, { variant: "body", weight: "regular", children: "Расскажи, чем занимаешься и что важно беречь. Айва учтёт это в рекомендациях и разборе нагрузки." }),
    /* @__PURE__ */ p.jsx(te, { label: "Формат", value: r.format || "", onChange: (y) => f("format", y), placeholder: "Зал и прогулки" }),
    /* @__PURE__ */ p.jsx(te, { label: "Цель", value: r.goal || "", onChange: (y) => f("goal", y), placeholder: "Тонус и больше энергии" }),
    /* @__PURE__ */ p.jsx(te, { label: "Ограничения", value: r.limits || "", onChange: (y) => f("limits", y), placeholder: "Например, бережём поясницу" }),
    /* @__PURE__ */ p.jsx(oe, { variant: "filled", label: "Сохранить", isFill: !0, ...Se("Сохранить профиль", h) })
  ] }) }) });
}
const o7 = ["trainingSection", "train"], r7 = (a) => {
  const e = a % 100, l = a % 10;
  return e >= 11 && e <= 14 ? "тренировок" : l === 1 ? "тренировка" : l >= 2 && l <= 4 ? "тренировки" : "тренировок";
}, u7 = (a) => (a || []).map((e) => ({
  iso: e.d,
  date: String(e.d || "").slice(-2).replace(/^0/, ""),
  label: e.dow,
  today: !!e.today,
  workout: !!e.count
}));
function c7({ mode: a, revision: e = 0 }) {
  const [l, s] = rx(o7, [a, e]), [r, c] = A.useState(""), [f, h] = A.useState(null), y = () => s("train");
  if (!l.trainingSection || !l.train) return /* @__PURE__ */ p.jsx(sx, { title: "Нагрузка", variant: "activity" });
  const m = l.trainingSection, g = l.train, v = m.training || {}, b = (v.options || []).slice(0, 4), T = g.today || [], S = g.week || [], w = S.filter((M) => M.count).slice(-3).reverse(), E = S.reduce((M, j) => M + (j.count || 0), 0), _ = (M = null) => {
    h(M), c("workout");
  };
  return /* @__PURE__ */ p.jsx(tl, { children: /* @__PURE__ */ p.jsx(Ii, { mode: "secondary", children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-paper-screen aiwa-activity-screen", children: [
    /* @__PURE__ */ p.jsx(st, { className: "aiwa-screen-title", variant: "title1", weight: "semibold", children: "Нагрузка" }),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-overview", children: [
      /* @__PURE__ */ p.jsx(Lh, { days: u7(S) }),
      /* @__PURE__ */ p.jsxs("div", { className: "aiwa-countdown", children: [
        /* @__PURE__ */ p.jsx(st, { variant: "title1", weight: "semibold", children: E }),
        /* @__PURE__ */ p.jsx(st, { variant: "body", weight: "regular", children: `${r7(E)} на этой неделе` })
      ] }),
      /* @__PURE__ */ p.jsx(
        oe,
        {
          variant: "filled",
          label: /* @__PURE__ */ p.jsxs("span", { className: "aiwa-btn-icon-label", children: [
            /* @__PURE__ */ p.jsx(Ur, {}),
            " Отметить тренировку"
          ] }),
          ...Se("Отметить тренировку", () => _())
        }
      )
    ] }),
    /* @__PURE__ */ p.jsxs(yt, { className: "aiwa-tma-blocks", children: [
      /* @__PURE__ */ p.jsx(
        kr,
        {
          message: v.summary || m.text || "Выбирай нагрузку, после которой станет легче, а не хуже.",
          detail: v.why,
          onDiscuss: () => Ar({ topic: "train" })
        }
      ),
      b.length ? /* @__PURE__ */ p.jsx(yt.Item, { header: "Варианты", children: b.map((M, j) => /* @__PURE__ */ p.jsx(
        fe,
        {
          title: M.name || `Вариант ${j + 1}`,
          description: M.benefit || M.how || M.detail,
          onClick: () => _(M)
        },
        M.name || j
      )) }) : null,
      /* @__PURE__ */ p.jsx(yt.Item, { header: "Прошедшие тренировки", children: T.length ? T.slice().reverse().map((M) => /* @__PURE__ */ p.jsx(
        fe,
        {
          title: M.type || "Тренировка",
          description: `сегодня · ${M.duration || "—"} · ${String(M.rpe || "").toLowerCase()}`,
          onClick: () => c("history")
        },
        M.id
      )) : w.length ? w.map((M) => /* @__PURE__ */ p.jsx(
        fe,
        {
          title: M.type || "Тренировка",
          description: `${M.d} · ${M.count} запись`,
          onClick: () => c("history")
        },
        M.d
      )) : /* @__PURE__ */ p.jsx(
        fe,
        {
          title: "История пока пуста",
          description: "Отметь первую тренировку — Айва подготовит разбор.",
          onClick: () => c("history")
        }
      ) }),
      /* @__PURE__ */ p.jsx(yt.Item, { children: /* @__PURE__ */ p.jsx(
        St,
        {
          as: "button",
          type: "button",
          onClick: () => c("profile"),
          end: /* @__PURE__ */ p.jsx(St.Part, { type: "Chevron" }),
          children: /* @__PURE__ */ p.jsx(St.Text, { title: "Настроить тренировочный профиль", bold: !0 })
        }
      ) })
    ] }),
    /* @__PURE__ */ p.jsx(a7, { isOpen: r === "workout", onClose: () => c(""), onSaved: y, suggested: f }),
    /* @__PURE__ */ p.jsx(
      i7,
      {
        isOpen: r === "variants",
        onClose: () => c(""),
        options: b,
        onSelect: (M) => _(M)
      }
    ),
    /* @__PURE__ */ p.jsx(l7, { isOpen: r === "history", onClose: () => c(""), state: g, onAdd: () => _() }),
    /* @__PURE__ */ p.jsx(s7, { isOpen: r === "profile", onClose: () => c(""), profile: g.profile, onSaved: y })
  ] }) }) });
}
function f7({ initialMessages: a = [] }) {
  const [e, l] = A.useState(() => a.map((S, w) => ({
    id: `initial-${w}`,
    role: S.role === "user" ? "user" : "assistant",
    text: S.text || "",
    suggestions: []
  }))), [s, r] = A.useState(""), [c, f] = A.useState(!1), [h, y] = A.useState(!1), m = Kf.useRef(null), g = Kf.useRef(null);
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
    const E = await Zt("/api/chat", { message: w }).catch(() => null);
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
      const M = await (await fetch("/api/voice", { method: "POST", body: E })).json();
      M.transcript && l((j) => [...j, { id: `voice-${Date.now()}`, role: "user", text: M.transcript, suggestions: [] }]), l((j) => [...j, {
        id: `voice-answer-${Date.now()}`,
        role: "assistant",
        text: M.answer || "Не получилось распознать голос.",
        suggestions: M.suggestions || []
      }]);
    } catch {
      Ot("Не получилось отправить голос", { type: "error" });
    } finally {
      f(!1);
    }
  }, T = async () => {
    if (h) {
      m.current?.stop();
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      Ot("Голос недоступен в этом клиенте", { type: "error" });
      return;
    }
    try {
      const S = await navigator.mediaDevices.getUserMedia({ audio: !0 }), w = [], E = new MediaRecorder(S);
      m.current = E, E.ondataavailable = (_) => {
        _.data?.size && w.push(_.data);
      }, E.onstop = () => {
        y(!1), S.getTracks().forEach((M) => M.stop());
        const _ = new Blob(w, { type: E.mimeType || "audio/webm" });
        _.size > 900 && b(_, E.mimeType);
      }, E.start(), y(!0);
    } catch {
      Ot("Нет доступа к микрофону", { type: "error" });
    }
  };
  return /* @__PURE__ */ p.jsx(tl, { children: /* @__PURE__ */ p.jsx(Ii, { mode: "secondary", children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-chat-screen", children: [
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-chat-header", children: [
      /* @__PURE__ */ p.jsx(Uh, { size: 50, frames: Vh, pauseMs: 0 }),
      /* @__PURE__ */ p.jsxs("div", { children: [
        /* @__PURE__ */ p.jsx(st, { variant: "title3", weight: "semibold", children: "Айва" }),
        /* @__PURE__ */ p.jsx(st, { variant: "caption1", weight: "regular", children: "учитывает твои данные" })
      ] }),
      /* @__PURE__ */ p.jsx(Te, { as: "button", type: "button", mode: "opacity", className: "aiwa-sheet-close", "aria-label": "Закрыть чат", onClick: () => Ke("go", "today"), children: /* @__PURE__ */ p.jsx(Yb, {}) })
    ] }),
    /* @__PURE__ */ p.jsxs("div", { className: "aiwa-chat-messages", children: [
      e.map((S) => /* @__PURE__ */ p.jsxs("div", { className: S.role === "user" ? "aiwa-chat-bubble is-user" : "aiwa-chat-bubble is-ai", children: [
        /* @__PURE__ */ p.jsx(st, { variant: "body", weight: "regular", children: S.text }),
        S.suggestions?.length ? /* @__PURE__ */ p.jsx("div", { className: "aiwa-chat-suggestions", children: S.suggestions.slice(0, 3).map((w) => /* @__PURE__ */ p.jsx(Te, { as: "button", type: "button", mode: "opacity", onClick: () => v(w), children: /* @__PURE__ */ p.jsx(st, { variant: "caption1", weight: "semibold", children: w }) }, w)) }) : null
      ] }, S.id)),
      c ? /* @__PURE__ */ p.jsx("div", { className: "aiwa-chat-bubble is-ai", children: /* @__PURE__ */ p.jsx(st, { variant: "body", weight: "regular", children: "Айва думает…" }) }) : null,
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
      /* @__PURE__ */ p.jsx(Te, { as: "button", type: "button", mode: "opacity", className: h ? "aiwa-chat-icon is-recording" : "aiwa-chat-icon", "aria-label": "Голос", onClick: T, children: /* @__PURE__ */ p.jsx(st, { variant: "body", weight: "semibold", children: h ? "■" : "Голос" }) }),
      /* @__PURE__ */ p.jsx(Te, { as: "button", type: "button", mode: "opacity", className: "aiwa-chat-send", "aria-label": "Отправить", onClick: () => v(), children: /* @__PURE__ */ p.jsx(st, { variant: "title3", weight: "semibold", children: "↑" }) })
    ] })
  ] }) }) });
}
const qf = [
  { id: "today", label: "Главная", icon: /* @__PURE__ */ p.jsx(KE, {}) },
  { id: "food", label: "Питание", icon: /* @__PURE__ */ p.jsx(FE, {}) },
  { id: "train", label: "Нагрузка", icon: /* @__PURE__ */ p.jsx(JE, {}) }
];
function d7({ active: a }) {
  const e = a === "stats" ? "today" : a, l = Math.max(0, qf.findIndex((s) => s.id === e));
  return /* @__PURE__ */ p.jsx(tl, { children: /* @__PURE__ */ p.jsxs("div", { className: "aiwa-nav-root", "data-aiwa-nav": "true", children: [
    /* @__PURE__ */ p.jsx("div", { className: "aiwa-nav-tabbar-layer", children: /* @__PURE__ */ p.jsx(
      GE,
      {
        tabs: qf.map(({ label: s, icon: r }) => ({ label: s, icon: r })),
        defaultIndex: l,
        onChange: (s) => Ke("go", qf[s].id)
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
        onClick: () => Ar(),
        children: /* @__PURE__ */ p.jsx(Uh, { size: 67 })
      }
    )
  ] }) });
}
let Xa = null, $f = null, Pa = null, is = "", Dd = !1, Rd = 0, Gf = null, tv = null, ts = null, Yf = null, tr = {}, er = 0, Xf = null, ev = null, nv = {}, av = 0, Pf = null, iv = null;
const Ga = () => {
  !Xa || !Pa || Xa.render(
    /* @__PURE__ */ p.jsx(
      $A,
      {
        ...Pa,
        panel: is,
        panelRevision: Rd,
        profileOpen: Dd,
        onPanelClose: () => Nd.closePanel(),
        onProfileClose: () => Nd.closeProfile()
      }
    )
  );
}, Nd = {
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
    Dd = !0, Ga();
  },
  closeProfile() {
    Dd = !1, Ga();
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
    a && (Yf !== a ? (ts?.unmount(), Yf = a, ts = Bi.createRoot(a)) : er += 1, tr = e, ts.render(/* @__PURE__ */ p.jsx(Ig, { ...tr, revision: er })));
  },
  renderActivity(a, e = {}) {
    a && (ev !== a ? (Xf?.unmount(), ev = a, Xf = Bi.createRoot(a)) : av += 1, nv = e, Xf.render(/* @__PURE__ */ p.jsx(c7, { ...nv, revision: av })));
  },
  renderChat(a, e = {}) {
    a && (iv !== a && (Pf?.unmount(), iv = a, Pf = Bi.createRoot(a)), Pf.render(/* @__PURE__ */ p.jsx(f7, { initialMessages: e.messages || [] })));
  },
  refreshFood() {
    !Yf || !ts || (er += 1, ts.render(/* @__PURE__ */ p.jsx(Ig, { ...tr, mode: ee("aiwaMode") || tr.mode, revision: er })));
  },
  /** Прогрев данных «Питания» и «Нагрузки» на старте — чтобы табы открывались сразу. */
  prefetch() {
    JA();
  },
  renderNav(a, e) {
    a && (tv !== a && (Gf?.unmount(), tv = a, Gf = Bi.createRoot(a)), Gf.render(/* @__PURE__ */ p.jsx(d7, { active: e })));
  }
};
function h7() {
  window.AiwaDeslop = Nd, aA(), window.dispatchEvent(new CustomEvent("aiwa:deslop-ready"));
}
h7();
export {
  V3 as R,
  gs as a,
  P3 as b,
  Or as c,
  O3 as g,
  p as j,
  A as r
};
