function a5(n, t) {
  for (var i = 0; i < t.length; i++) {
    const l = t[i];
    if (typeof l != "string" && !Array.isArray(l)) {
      for (const o in l)
        if (o !== "default" && !(o in n)) {
          const c = Object.getOwnPropertyDescriptor(l, o);
          c && Object.defineProperty(n, o, c.get ? c : {
            enumerable: !0,
            get: () => l[o]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
function i5(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var xd = { exports: {} }, Yl = {};
var mg;
function s5() {
  if (mg) return Yl;
  mg = 1;
  var n = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function i(l, o, c) {
    var u = null;
    if (c !== void 0 && (u = "" + c), o.key !== void 0 && (u = "" + o.key), "key" in o) {
      c = {};
      for (var d in o)
        d !== "key" && (c[d] = o[d]);
    } else c = o;
    return o = c.ref, {
      $$typeof: n,
      type: l,
      key: u,
      ref: o !== void 0 ? o : null,
      props: c
    };
  }
  return Yl.Fragment = t, Yl.jsx = i, Yl.jsxs = i, Yl;
}
var pg;
function l5() {
  return pg || (pg = 1, xd.exports = s5()), xd.exports;
}
var h = l5(), Sd = { exports: {} }, Et = {};
var yg;
function r5() {
  if (yg) return Et;
  yg = 1;
  var n = Symbol.for("react.transitional.element"), t = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), u = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), y = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), b = Symbol.iterator;
  function j(L) {
    return L === null || typeof L != "object" ? null : (L = b && L[b] || L["@@iterator"], typeof L == "function" ? L : null);
  }
  var w = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, T = Object.assign, x = {};
  function A(L, q, G) {
    this.props = L, this.context = q, this.refs = x, this.updater = G || w;
  }
  A.prototype.isReactComponent = {}, A.prototype.setState = function(L, q) {
    if (typeof L != "object" && typeof L != "function" && L != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, L, q, "setState");
  }, A.prototype.forceUpdate = function(L) {
    this.updater.enqueueForceUpdate(this, L, "forceUpdate");
  };
  function _() {
  }
  _.prototype = A.prototype;
  function E(L, q, G) {
    this.props = L, this.context = q, this.refs = x, this.updater = G || w;
  }
  var M = E.prototype = new _();
  M.constructor = E, T(M, A.prototype), M.isPureReactComponent = !0;
  var O = Array.isArray;
  function D() {
  }
  var N = { H: null, A: null, T: null, S: null }, V = Object.prototype.hasOwnProperty;
  function H(L, q, G) {
    var et = G.ref;
    return {
      $$typeof: n,
      type: L,
      key: q,
      ref: et !== void 0 ? et : null,
      props: G
    };
  }
  function B(L, q) {
    return H(L.type, q, L.props);
  }
  function U(L) {
    return typeof L == "object" && L !== null && L.$$typeof === n;
  }
  function F(L) {
    var q = { "=": "=0", ":": "=2" };
    return "$" + L.replace(/[=:]/g, function(G) {
      return q[G];
    });
  }
  var Y = /\/+/g;
  function st(L, q) {
    return typeof L == "object" && L !== null && L.key != null ? F("" + L.key) : q.toString(36);
  }
  function I(L) {
    switch (L.status) {
      case "fulfilled":
        return L.value;
      case "rejected":
        throw L.reason;
      default:
        switch (typeof L.status == "string" ? L.then(D, D) : (L.status = "pending", L.then(
          function(q) {
            L.status === "pending" && (L.status = "fulfilled", L.value = q);
          },
          function(q) {
            L.status === "pending" && (L.status = "rejected", L.reason = q);
          }
        )), L.status) {
          case "fulfilled":
            return L.value;
          case "rejected":
            throw L.reason;
        }
    }
    throw L;
  }
  function $(L, q, G, et, ot) {
    var ct = typeof L;
    (ct === "undefined" || ct === "boolean") && (L = null);
    var ht = !1;
    if (L === null) ht = !0;
    else
      switch (ct) {
        case "bigint":
        case "string":
        case "number":
          ht = !0;
          break;
        case "object":
          switch (L.$$typeof) {
            case n:
            case t:
              ht = !0;
              break;
            case g:
              return ht = L._init, $(
                ht(L._payload),
                q,
                G,
                et,
                ot
              );
          }
      }
    if (ht)
      return ot = ot(L), ht = et === "" ? "." + st(L, 0) : et, O(ot) ? (G = "", ht != null && (G = ht.replace(Y, "$&/") + "/"), $(ot, q, G, "", function(ft) {
        return ft;
      })) : ot != null && (U(ot) && (ot = B(
        ot,
        G + (ot.key == null || L && L.key === ot.key ? "" : ("" + ot.key).replace(
          Y,
          "$&/"
        ) + "/") + ht
      )), q.push(ot)), 1;
    ht = 0;
    var nt = et === "" ? "." : et + ":";
    if (O(L))
      for (var dt = 0; dt < L.length; dt++)
        et = L[dt], ct = nt + st(et, dt), ht += $(
          et,
          q,
          G,
          ct,
          ot
        );
    else if (dt = j(L), typeof dt == "function")
      for (L = dt.call(L), dt = 0; !(et = L.next()).done; )
        et = et.value, ct = nt + st(et, dt++), ht += $(
          et,
          q,
          G,
          ct,
          ot
        );
    else if (ct === "object") {
      if (typeof L.then == "function")
        return $(
          I(L),
          q,
          G,
          et,
          ot
        );
      throw q = String(L), Error(
        "Objects are not valid as a React child (found: " + (q === "[object Object]" ? "object with keys {" + Object.keys(L).join(", ") + "}" : q) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ht;
  }
  function X(L, q, G) {
    if (L == null) return L;
    var et = [], ot = 0;
    return $(L, et, "", "", function(ct) {
      return q.call(G, ct, ot++);
    }), et;
  }
  function J(L) {
    if (L._status === -1) {
      var q = L._result;
      q = q(), q.then(
        function(G) {
          (L._status === 0 || L._status === -1) && (L._status = 1, L._result = G);
        },
        function(G) {
          (L._status === 0 || L._status === -1) && (L._status = 2, L._result = G);
        }
      ), L._status === -1 && (L._status = 0, L._result = q);
    }
    if (L._status === 1) return L._result.default;
    throw L._result;
  }
  var tt = typeof reportError == "function" ? reportError : function(L) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var q = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof L == "object" && L !== null && typeof L.message == "string" ? String(L.message) : String(L),
        error: L
      });
      if (!window.dispatchEvent(q)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", L);
      return;
    }
    console.error(L);
  }, ut = {
    map: X,
    forEach: function(L, q, G) {
      X(
        L,
        function() {
          q.apply(this, arguments);
        },
        G
      );
    },
    count: function(L) {
      var q = 0;
      return X(L, function() {
        q++;
      }), q;
    },
    toArray: function(L) {
      return X(L, function(q) {
        return q;
      }) || [];
    },
    only: function(L) {
      if (!U(L))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return L;
    }
  };
  return Et.Activity = v, Et.Children = ut, Et.Component = A, Et.Fragment = i, Et.Profiler = o, Et.PureComponent = E, Et.StrictMode = l, Et.Suspense = p, Et.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = N, Et.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(L) {
      return N.H.useMemoCache(L);
    }
  }, Et.cache = function(L) {
    return function() {
      return L.apply(null, arguments);
    };
  }, Et.cacheSignal = function() {
    return null;
  }, Et.cloneElement = function(L, q, G) {
    if (L == null)
      throw Error(
        "The argument must be a React element, but you passed " + L + "."
      );
    var et = T({}, L.props), ot = L.key;
    if (q != null)
      for (ct in q.key !== void 0 && (ot = "" + q.key), q)
        !V.call(q, ct) || ct === "key" || ct === "__self" || ct === "__source" || ct === "ref" && q.ref === void 0 || (et[ct] = q[ct]);
    var ct = arguments.length - 2;
    if (ct === 1) et.children = G;
    else if (1 < ct) {
      for (var ht = Array(ct), nt = 0; nt < ct; nt++)
        ht[nt] = arguments[nt + 2];
      et.children = ht;
    }
    return H(L.type, ot, et);
  }, Et.createContext = function(L) {
    return L = {
      $$typeof: u,
      _currentValue: L,
      _currentValue2: L,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, L.Provider = L, L.Consumer = {
      $$typeof: c,
      _context: L
    }, L;
  }, Et.createElement = function(L, q, G) {
    var et, ot = {}, ct = null;
    if (q != null)
      for (et in q.key !== void 0 && (ct = "" + q.key), q)
        V.call(q, et) && et !== "key" && et !== "__self" && et !== "__source" && (ot[et] = q[et]);
    var ht = arguments.length - 2;
    if (ht === 1) ot.children = G;
    else if (1 < ht) {
      for (var nt = Array(ht), dt = 0; dt < ht; dt++)
        nt[dt] = arguments[dt + 2];
      ot.children = nt;
    }
    if (L && L.defaultProps)
      for (et in ht = L.defaultProps, ht)
        ot[et] === void 0 && (ot[et] = ht[et]);
    return H(L, ct, ot);
  }, Et.createRef = function() {
    return { current: null };
  }, Et.forwardRef = function(L) {
    return { $$typeof: d, render: L };
  }, Et.isValidElement = U, Et.lazy = function(L) {
    return {
      $$typeof: g,
      _payload: { _status: -1, _result: L },
      _init: J
    };
  }, Et.memo = function(L, q) {
    return {
      $$typeof: y,
      type: L,
      compare: q === void 0 ? null : q
    };
  }, Et.startTransition = function(L) {
    var q = N.T, G = {};
    N.T = G;
    try {
      var et = L(), ot = N.S;
      ot !== null && ot(G, et), typeof et == "object" && et !== null && typeof et.then == "function" && et.then(D, tt);
    } catch (ct) {
      tt(ct);
    } finally {
      q !== null && G.types !== null && (q.types = G.types), N.T = q;
    }
  }, Et.unstable_useCacheRefresh = function() {
    return N.H.useCacheRefresh();
  }, Et.use = function(L) {
    return N.H.use(L);
  }, Et.useActionState = function(L, q, G) {
    return N.H.useActionState(L, q, G);
  }, Et.useCallback = function(L, q) {
    return N.H.useCallback(L, q);
  }, Et.useContext = function(L) {
    return N.H.useContext(L);
  }, Et.useDebugValue = function() {
  }, Et.useDeferredValue = function(L, q) {
    return N.H.useDeferredValue(L, q);
  }, Et.useEffect = function(L, q) {
    return N.H.useEffect(L, q);
  }, Et.useEffectEvent = function(L) {
    return N.H.useEffectEvent(L);
  }, Et.useId = function() {
    return N.H.useId();
  }, Et.useImperativeHandle = function(L, q, G) {
    return N.H.useImperativeHandle(L, q, G);
  }, Et.useInsertionEffect = function(L, q) {
    return N.H.useInsertionEffect(L, q);
  }, Et.useLayoutEffect = function(L, q) {
    return N.H.useLayoutEffect(L, q);
  }, Et.useMemo = function(L, q) {
    return N.H.useMemo(L, q);
  }, Et.useOptimistic = function(L, q) {
    return N.H.useOptimistic(L, q);
  }, Et.useReducer = function(L, q, G) {
    return N.H.useReducer(L, q, G);
  }, Et.useRef = function(L) {
    return N.H.useRef(L);
  }, Et.useState = function(L) {
    return N.H.useState(L);
  }, Et.useSyncExternalStore = function(L, q, G) {
    return N.H.useSyncExternalStore(
      L,
      q,
      G
    );
  }, Et.useTransition = function() {
    return N.H.useTransition();
  }, Et.version = "19.2.7", Et;
}
var gg;
function jr() {
  return gg || (gg = 1, Sd.exports = r5()), Sd.exports;
}
var C = jr();
const dh = /* @__PURE__ */ i5(C), o5 = /* @__PURE__ */ a5({
  __proto__: null,
  default: dh
}, [C]);
var wd = { exports: {} }, Pl = {}, Cd = { exports: {} }, Td = {};
var vg;
function c5() {
  return vg || (vg = 1, (function(n) {
    function t($, X) {
      var J = $.length;
      $.push(X);
      t: for (; 0 < J; ) {
        var tt = J - 1 >>> 1, ut = $[tt];
        if (0 < o(ut, X))
          $[tt] = X, $[J] = ut, J = tt;
        else break t;
      }
    }
    function i($) {
      return $.length === 0 ? null : $[0];
    }
    function l($) {
      if ($.length === 0) return null;
      var X = $[0], J = $.pop();
      if (J !== X) {
        $[0] = J;
        t: for (var tt = 0, ut = $.length, L = ut >>> 1; tt < L; ) {
          var q = 2 * (tt + 1) - 1, G = $[q], et = q + 1, ot = $[et];
          if (0 > o(G, J))
            et < ut && 0 > o(ot, G) ? ($[tt] = ot, $[et] = J, tt = et) : ($[tt] = G, $[q] = J, tt = q);
          else if (et < ut && 0 > o(ot, J))
            $[tt] = ot, $[et] = J, tt = et;
          else break t;
        }
      }
      return X;
    }
    function o($, X) {
      var J = $.sortIndex - X.sortIndex;
      return J !== 0 ? J : $.id - X.id;
    }
    if (n.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var c = performance;
      n.unstable_now = function() {
        return c.now();
      };
    } else {
      var u = Date, d = u.now();
      n.unstable_now = function() {
        return u.now() - d;
      };
    }
    var p = [], y = [], g = 1, v = null, b = 3, j = !1, w = !1, T = !1, x = !1, A = typeof setTimeout == "function" ? setTimeout : null, _ = typeof clearTimeout == "function" ? clearTimeout : null, E = typeof setImmediate < "u" ? setImmediate : null;
    function M($) {
      for (var X = i(y); X !== null; ) {
        if (X.callback === null) l(y);
        else if (X.startTime <= $)
          l(y), X.sortIndex = X.expirationTime, t(p, X);
        else break;
        X = i(y);
      }
    }
    function O($) {
      if (T = !1, M($), !w)
        if (i(p) !== null)
          w = !0, D || (D = !0, F());
        else {
          var X = i(y);
          X !== null && I(O, X.startTime - $);
        }
    }
    var D = !1, N = -1, V = 5, H = -1;
    function B() {
      return x ? !0 : !(n.unstable_now() - H < V);
    }
    function U() {
      if (x = !1, D) {
        var $ = n.unstable_now();
        H = $;
        var X = !0;
        try {
          t: {
            w = !1, T && (T = !1, _(N), N = -1), j = !0;
            var J = b;
            try {
              e: {
                for (M($), v = i(p); v !== null && !(v.expirationTime > $ && B()); ) {
                  var tt = v.callback;
                  if (typeof tt == "function") {
                    v.callback = null, b = v.priorityLevel;
                    var ut = tt(
                      v.expirationTime <= $
                    );
                    if ($ = n.unstable_now(), typeof ut == "function") {
                      v.callback = ut, M($), X = !0;
                      break e;
                    }
                    v === i(p) && l(p), M($);
                  } else l(p);
                  v = i(p);
                }
                if (v !== null) X = !0;
                else {
                  var L = i(y);
                  L !== null && I(
                    O,
                    L.startTime - $
                  ), X = !1;
                }
              }
              break t;
            } finally {
              v = null, b = J, j = !1;
            }
            X = void 0;
          }
        } finally {
          X ? F() : D = !1;
        }
      }
    }
    var F;
    if (typeof E == "function")
      F = function() {
        E(U);
      };
    else if (typeof MessageChannel < "u") {
      var Y = new MessageChannel(), st = Y.port2;
      Y.port1.onmessage = U, F = function() {
        st.postMessage(null);
      };
    } else
      F = function() {
        A(U, 0);
      };
    function I($, X) {
      N = A(function() {
        $(n.unstable_now());
      }, X);
    }
    n.unstable_IdlePriority = 5, n.unstable_ImmediatePriority = 1, n.unstable_LowPriority = 4, n.unstable_NormalPriority = 3, n.unstable_Profiling = null, n.unstable_UserBlockingPriority = 2, n.unstable_cancelCallback = function($) {
      $.callback = null;
    }, n.unstable_forceFrameRate = function($) {
      0 > $ || 125 < $ ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : V = 0 < $ ? Math.floor(1e3 / $) : 5;
    }, n.unstable_getCurrentPriorityLevel = function() {
      return b;
    }, n.unstable_next = function($) {
      switch (b) {
        case 1:
        case 2:
        case 3:
          var X = 3;
          break;
        default:
          X = b;
      }
      var J = b;
      b = X;
      try {
        return $();
      } finally {
        b = J;
      }
    }, n.unstable_requestPaint = function() {
      x = !0;
    }, n.unstable_runWithPriority = function($, X) {
      switch ($) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          $ = 3;
      }
      var J = b;
      b = $;
      try {
        return X();
      } finally {
        b = J;
      }
    }, n.unstable_scheduleCallback = function($, X, J) {
      var tt = n.unstable_now();
      switch (typeof J == "object" && J !== null ? (J = J.delay, J = typeof J == "number" && 0 < J ? tt + J : tt) : J = tt, $) {
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
      return ut = J + ut, $ = {
        id: g++,
        callback: X,
        priorityLevel: $,
        startTime: J,
        expirationTime: ut,
        sortIndex: -1
      }, J > tt ? ($.sortIndex = J, t(y, $), i(p) === null && $ === i(y) && (T ? (_(N), N = -1) : T = !0, I(O, J - tt))) : ($.sortIndex = ut, t(p, $), w || j || (w = !0, D || (D = !0, F()))), $;
    }, n.unstable_shouldYield = B, n.unstable_wrapCallback = function($) {
      var X = b;
      return function() {
        var J = b;
        b = X;
        try {
          return $.apply(this, arguments);
        } finally {
          b = J;
        }
      };
    };
  })(Td)), Td;
}
var bg;
function u5() {
  return bg || (bg = 1, Cd.exports = c5()), Cd.exports;
}
var jd = { exports: {} }, He = {};
var xg;
function f5() {
  if (xg) return He;
  xg = 1;
  var n = jr();
  function t(p) {
    var y = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      y += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var g = 2; g < arguments.length; g++)
        y += "&args[]=" + encodeURIComponent(arguments[g]);
    }
    return "Minified React error #" + p + "; visit " + y + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function i() {
  }
  var l = {
    d: {
      f: i,
      r: function() {
        throw Error(t(522));
      },
      D: i,
      C: i,
      L: i,
      m: i,
      X: i,
      S: i,
      M: i
    },
    p: 0,
    findDOMNode: null
  }, o = Symbol.for("react.portal");
  function c(p, y, g) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: v == null ? null : "" + v,
      children: p,
      containerInfo: y,
      implementation: g
    };
  }
  var u = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function d(p, y) {
    if (p === "font") return "";
    if (typeof y == "string")
      return y === "use-credentials" ? y : "";
  }
  return He.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, He.createPortal = function(p, y) {
    var g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!y || y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)
      throw Error(t(299));
    return c(p, y, null, g);
  }, He.flushSync = function(p) {
    var y = u.T, g = l.p;
    try {
      if (u.T = null, l.p = 2, p) return p();
    } finally {
      u.T = y, l.p = g, l.d.f();
    }
  }, He.preconnect = function(p, y) {
    typeof p == "string" && (y ? (y = y.crossOrigin, y = typeof y == "string" ? y === "use-credentials" ? y : "" : void 0) : y = null, l.d.C(p, y));
  }, He.prefetchDNS = function(p) {
    typeof p == "string" && l.d.D(p);
  }, He.preinit = function(p, y) {
    if (typeof p == "string" && y && typeof y.as == "string") {
      var g = y.as, v = d(g, y.crossOrigin), b = typeof y.integrity == "string" ? y.integrity : void 0, j = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
      g === "style" ? l.d.S(
        p,
        typeof y.precedence == "string" ? y.precedence : void 0,
        {
          crossOrigin: v,
          integrity: b,
          fetchPriority: j
        }
      ) : g === "script" && l.d.X(p, {
        crossOrigin: v,
        integrity: b,
        fetchPriority: j,
        nonce: typeof y.nonce == "string" ? y.nonce : void 0
      });
    }
  }, He.preinitModule = function(p, y) {
    if (typeof p == "string")
      if (typeof y == "object" && y !== null) {
        if (y.as == null || y.as === "script") {
          var g = d(
            y.as,
            y.crossOrigin
          );
          l.d.M(p, {
            crossOrigin: g,
            integrity: typeof y.integrity == "string" ? y.integrity : void 0,
            nonce: typeof y.nonce == "string" ? y.nonce : void 0
          });
        }
      } else y == null && l.d.M(p);
  }, He.preload = function(p, y) {
    if (typeof p == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
      var g = y.as, v = d(g, y.crossOrigin);
      l.d.L(p, g, {
        crossOrigin: v,
        integrity: typeof y.integrity == "string" ? y.integrity : void 0,
        nonce: typeof y.nonce == "string" ? y.nonce : void 0,
        type: typeof y.type == "string" ? y.type : void 0,
        fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0,
        referrerPolicy: typeof y.referrerPolicy == "string" ? y.referrerPolicy : void 0,
        imageSrcSet: typeof y.imageSrcSet == "string" ? y.imageSrcSet : void 0,
        imageSizes: typeof y.imageSizes == "string" ? y.imageSizes : void 0,
        media: typeof y.media == "string" ? y.media : void 0
      });
    }
  }, He.preloadModule = function(p, y) {
    if (typeof p == "string")
      if (y) {
        var g = d(y.as, y.crossOrigin);
        l.d.m(p, {
          as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
          crossOrigin: g,
          integrity: typeof y.integrity == "string" ? y.integrity : void 0
        });
      } else l.d.m(p);
  }, He.requestFormReset = function(p) {
    l.d.r(p);
  }, He.unstable_batchedUpdates = function(p, y) {
    return p(y);
  }, He.useFormState = function(p, y, g) {
    return u.H.useFormState(p, y, g);
  }, He.useFormStatus = function() {
    return u.H.useHostTransitionStatus();
  }, He.version = "19.2.7", He;
}
var Sg;
function mb() {
  if (Sg) return jd.exports;
  Sg = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (t) {
        console.error(t);
      }
  }
  return n(), jd.exports = f5(), jd.exports;
}
var wg;
function d5() {
  if (wg) return Pl;
  wg = 1;
  var n = u5(), t = jr(), i = mb();
  function l(e) {
    var a = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      a += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var s = 2; s < arguments.length; s++)
        a += "&args[]=" + encodeURIComponent(arguments[s]);
    }
    return "Minified React error #" + e + "; visit " + a + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function c(e) {
    var a = e, s = e;
    if (e.alternate) for (; a.return; ) a = a.return;
    else {
      e = a;
      do
        a = e, (a.flags & 4098) !== 0 && (s = a.return), e = a.return;
      while (e);
    }
    return a.tag === 3 ? s : null;
  }
  function u(e) {
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
  function p(e) {
    if (c(e) !== e)
      throw Error(l(188));
  }
  function y(e) {
    var a = e.alternate;
    if (!a) {
      if (a = c(e), a === null) throw Error(l(188));
      return a !== e ? null : e;
    }
    for (var s = e, r = a; ; ) {
      var f = s.return;
      if (f === null) break;
      var m = f.alternate;
      if (m === null) {
        if (r = f.return, r !== null) {
          s = r;
          continue;
        }
        break;
      }
      if (f.child === m.child) {
        for (m = f.child; m; ) {
          if (m === s) return p(f), e;
          if (m === r) return p(f), a;
          m = m.sibling;
        }
        throw Error(l(188));
      }
      if (s.return !== r.return) s = f, r = m;
      else {
        for (var S = !1, R = f.child; R; ) {
          if (R === s) {
            S = !0, s = f, r = m;
            break;
          }
          if (R === r) {
            S = !0, r = f, s = m;
            break;
          }
          R = R.sibling;
        }
        if (!S) {
          for (R = m.child; R; ) {
            if (R === s) {
              S = !0, s = m, r = f;
              break;
            }
            if (R === r) {
              S = !0, r = m, s = f;
              break;
            }
            R = R.sibling;
          }
          if (!S) throw Error(l(189));
        }
      }
      if (s.alternate !== r) throw Error(l(190));
    }
    if (s.tag !== 3) throw Error(l(188));
    return s.stateNode.current === s ? e : a;
  }
  function g(e) {
    var a = e.tag;
    if (a === 5 || a === 26 || a === 27 || a === 6) return e;
    for (e = e.child; e !== null; ) {
      if (a = g(e), a !== null) return a;
      e = e.sibling;
    }
    return null;
  }
  var v = Object.assign, b = Symbol.for("react.element"), j = Symbol.for("react.transitional.element"), w = Symbol.for("react.portal"), T = Symbol.for("react.fragment"), x = Symbol.for("react.strict_mode"), A = Symbol.for("react.profiler"), _ = Symbol.for("react.consumer"), E = Symbol.for("react.context"), M = Symbol.for("react.forward_ref"), O = Symbol.for("react.suspense"), D = Symbol.for("react.suspense_list"), N = Symbol.for("react.memo"), V = Symbol.for("react.lazy"), H = Symbol.for("react.activity"), B = Symbol.for("react.memo_cache_sentinel"), U = Symbol.iterator;
  function F(e) {
    return e === null || typeof e != "object" ? null : (e = U && e[U] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Y = Symbol.for("react.client.reference");
  function st(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Y ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case T:
        return "Fragment";
      case A:
        return "Profiler";
      case x:
        return "StrictMode";
      case O:
        return "Suspense";
      case D:
        return "SuspenseList";
      case H:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case w:
          return "Portal";
        case E:
          return e.displayName || "Context";
        case _:
          return (e._context.displayName || "Context") + ".Consumer";
        case M:
          var a = e.render;
          return e = e.displayName, e || (e = a.displayName || a.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case N:
          return a = e.displayName || null, a !== null ? a : st(e.type) || "Memo";
        case V:
          a = e._payload, e = e._init;
          try {
            return st(e(a));
          } catch {
          }
      }
    return null;
  }
  var I = Array.isArray, $ = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, X = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, J = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, tt = [], ut = -1;
  function L(e) {
    return { current: e };
  }
  function q(e) {
    0 > ut || (e.current = tt[ut], tt[ut] = null, ut--);
  }
  function G(e, a) {
    ut++, tt[ut] = e.current, e.current = a;
  }
  var et = L(null), ot = L(null), ct = L(null), ht = L(null);
  function nt(e, a) {
    switch (G(ct, a), G(ot, e), G(et, null), a.nodeType) {
      case 9:
      case 11:
        e = (e = a.documentElement) && (e = e.namespaceURI) ? By(e) : 0;
        break;
      default:
        if (e = a.tagName, a = a.namespaceURI)
          a = By(a), e = Vy(a, e);
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
    q(et), G(et, e);
  }
  function dt() {
    q(et), q(ot), q(ct);
  }
  function ft(e) {
    e.memoizedState !== null && G(ht, e);
    var a = et.current, s = Vy(a, e.type);
    a !== s && (G(ot, e), G(et, s));
  }
  function yt(e) {
    ot.current === e && (q(et), q(ot)), ht.current === e && (q(ht), zl._currentValue = J);
  }
  var gt, ue;
  function mt(e) {
    if (gt === void 0)
      try {
        throw Error();
      } catch (s) {
        var a = s.stack.trim().match(/\n( *(at )?)/);
        gt = a && a[1] || "", ue = -1 < s.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < s.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + gt + e + ue;
  }
  var _t = !1;
  function ne(e, a) {
    if (!e || _t) return "";
    _t = !0;
    var s = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var r = {
        DetermineComponentFrameRoot: function() {
          try {
            if (a) {
              var rt = function() {
                throw Error();
              };
              if (Object.defineProperty(rt.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(rt, []);
                } catch (W) {
                  var Q = W;
                }
                Reflect.construct(e, [], rt);
              } else {
                try {
                  rt.call();
                } catch (W) {
                  Q = W;
                }
                e.call(rt.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (W) {
                Q = W;
              }
              (rt = e()) && typeof rt.catch == "function" && rt.catch(function() {
              });
            }
          } catch (W) {
            if (W && Q && typeof W.stack == "string")
              return [W.stack, Q.stack];
          }
          return [null, null];
        }
      };
      r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var f = Object.getOwnPropertyDescriptor(
        r.DetermineComponentFrameRoot,
        "name"
      );
      f && f.configurable && Object.defineProperty(
        r.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var m = r.DetermineComponentFrameRoot(), S = m[0], R = m[1];
      if (S && R) {
        var k = S.split(`
`), Z = R.split(`
`);
        for (f = r = 0; r < k.length && !k[r].includes("DetermineComponentFrameRoot"); )
          r++;
        for (; f < Z.length && !Z[f].includes(
          "DetermineComponentFrameRoot"
        ); )
          f++;
        if (r === k.length || f === Z.length)
          for (r = k.length - 1, f = Z.length - 1; 1 <= r && 0 <= f && k[r] !== Z[f]; )
            f--;
        for (; 1 <= r && 0 <= f; r--, f--)
          if (k[r] !== Z[f]) {
            if (r !== 1 || f !== 1)
              do
                if (r--, f--, 0 > f || k[r] !== Z[f]) {
                  var it = `
` + k[r].replace(" at new ", " at ");
                  return e.displayName && it.includes("<anonymous>") && (it = it.replace("<anonymous>", e.displayName)), it;
                }
              while (1 <= r && 0 <= f);
            break;
          }
      }
    } finally {
      _t = !1, Error.prepareStackTrace = s;
    }
    return (s = e ? e.displayName || e.name : "") ? mt(s) : "";
  }
  function fe(e, a) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return mt(e.type);
      case 16:
        return mt("Lazy");
      case 13:
        return e.child !== a && a !== null ? mt("Suspense Fallback") : mt("Suspense");
      case 19:
        return mt("SuspenseList");
      case 0:
      case 15:
        return ne(e.type, !1);
      case 11:
        return ne(e.type.render, !1);
      case 1:
        return ne(e.type, !0);
      case 31:
        return mt("Activity");
      default:
        return "";
    }
  }
  function se(e) {
    try {
      var a = "", s = null;
      do
        a += fe(e, s), s = e, e = e.return;
      while (e);
      return a;
    } catch (r) {
      return `
Error generating stack: ` + r.message + `
` + r.stack;
    }
  }
  var hn = Object.prototype.hasOwnProperty, qe = n.unstable_scheduleCallback, wa = n.unstable_cancelCallback, Js = n.unstable_shouldYield, Qn = n.unstable_requestPaint, ze = n.unstable_now, $r = n.unstable_getCurrentPriorityLevel, su = n.unstable_ImmediatePriority, Ws = n.unstable_UserBlockingPriority, zi = n.unstable_NormalPriority, kr = n.unstable_LowPriority, Ca = n.unstable_IdlePriority, Ui = n.log, ye = n.unstable_setDisableYieldValue, Ta = null, Ye = null;
  function Vn(e) {
    if (typeof Ui == "function" && ye(e), Ye && typeof Ye.setStrictMode == "function")
      try {
        Ye.setStrictMode(Ta, e);
      } catch {
      }
  }
  var Ue = Math.clz32 ? Math.clz32 : ou, lu = Math.log, ru = Math.LN2;
  function ou(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (lu(e) / ru | 0) | 0;
  }
  var Hi = 256, qi = 262144, Yi = 4194304;
  function Fn(e) {
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
  function Pi(e, a, s) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var f = 0, m = e.suspendedLanes, S = e.pingedLanes;
    e = e.warmLanes;
    var R = r & 134217727;
    return R !== 0 ? (r = R & ~m, r !== 0 ? f = Fn(r) : (S &= R, S !== 0 ? f = Fn(S) : s || (s = R & ~e, s !== 0 && (f = Fn(s))))) : (R = r & ~m, R !== 0 ? f = Fn(R) : S !== 0 ? f = Fn(S) : s || (s = r & ~e, s !== 0 && (f = Fn(s)))), f === 0 ? 0 : a !== 0 && a !== f && (a & m) === 0 && (m = f & -f, s = a & -a, m >= s || m === 32 && (s & 4194048) !== 0) ? a : f;
  }
  function ii(e, a) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & a) === 0;
  }
  function cu(e, a) {
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
  function at() {
    var e = Yi;
    return Yi <<= 1, (Yi & 62914560) === 0 && (Yi = 4194304), e;
  }
  function Bt(e) {
    for (var a = [], s = 0; 31 > s; s++) a.push(e);
    return a;
  }
  function jt(e, a) {
    e.pendingLanes |= a, a !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Pe(e, a, s, r, f, m) {
    var S = e.pendingLanes;
    e.pendingLanes = s, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= s, e.entangledLanes &= s, e.errorRecoveryDisabledLanes &= s, e.shellSuspendCounter = 0;
    var R = e.entanglements, k = e.expirationTimes, Z = e.hiddenUpdates;
    for (s = S & ~s; 0 < s; ) {
      var it = 31 - Ue(s), rt = 1 << it;
      R[it] = 0, k[it] = -1;
      var Q = Z[it];
      if (Q !== null)
        for (Z[it] = null, it = 0; it < Q.length; it++) {
          var W = Q[it];
          W !== null && (W.lane &= -536870913);
        }
      s &= ~rt;
    }
    r !== 0 && Vt(e, r, 0), m !== 0 && f === 0 && e.tag !== 0 && (e.suspendedLanes |= m & ~(S & ~a));
  }
  function Vt(e, a, s) {
    e.pendingLanes |= a, e.suspendedLanes &= ~a;
    var r = 31 - Ue(a);
    e.entangledLanes |= a, e.entanglements[r] = e.entanglements[r] | 1073741824 | s & 261930;
  }
  function Me(e, a) {
    var s = e.entangledLanes |= a;
    for (e = e.entanglements; s; ) {
      var r = 31 - Ue(s), f = 1 << r;
      f & a | e[r] & a && (e[r] |= a), s &= ~f;
    }
  }
  function zn(e, a) {
    var s = a & -a;
    return s = (s & 42) !== 0 ? 1 : _e(s), (s & (e.suspendedLanes | a)) !== 0 ? 0 : s;
  }
  function _e(e) {
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
  function de(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ja() {
    var e = X.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : rg(e.type));
  }
  function In(e, a) {
    var s = X.p;
    try {
      return X.p = e, a();
    } finally {
      X.p = s;
    }
  }
  var ge = Math.random().toString(36).slice(2), Wt = "__reactFiber$" + ge, Ne = "__reactProps$" + ge, Gi = "__reactContainer$" + ge, uu = "__reactEvents$" + ge, X3 = "__reactListeners$" + ge, K3 = "__reactHandles$" + ge, Tp = "__reactResources$" + ge, tl = "__reactMarker$" + ge;
  function fu(e) {
    delete e[Wt], delete e[Ne], delete e[uu], delete e[X3], delete e[K3];
  }
  function Xi(e) {
    var a = e[Wt];
    if (a) return a;
    for (var s = e.parentNode; s; ) {
      if (a = s[Gi] || s[Wt]) {
        if (s = a.alternate, a.child !== null || s !== null && s.child !== null)
          for (e = Gy(e); e !== null; ) {
            if (s = e[Wt]) return s;
            e = Gy(e);
          }
        return a;
      }
      e = s, s = e.parentNode;
    }
    return null;
  }
  function Ki(e) {
    if (e = e[Wt] || e[Gi]) {
      var a = e.tag;
      if (a === 5 || a === 6 || a === 13 || a === 31 || a === 26 || a === 27 || a === 3)
        return e;
    }
    return null;
  }
  function el(e) {
    var a = e.tag;
    if (a === 5 || a === 26 || a === 27 || a === 6) return e.stateNode;
    throw Error(l(33));
  }
  function Zi(e) {
    var a = e[Tp];
    return a || (a = e[Tp] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), a;
  }
  function Re(e) {
    e[tl] = !0;
  }
  var jp = /* @__PURE__ */ new Set(), Ap = {};
  function si(e, a) {
    Qi(e, a), Qi(e + "Capture", a);
  }
  function Qi(e, a) {
    for (Ap[e] = a, e = 0; e < a.length; e++)
      jp.add(a[e]);
  }
  var Z3 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Ep = {}, Mp = {};
  function Q3(e) {
    return hn.call(Mp, e) ? !0 : hn.call(Ep, e) ? !1 : Z3.test(e) ? Mp[e] = !0 : (Ep[e] = !0, !1);
  }
  function Br(e, a, s) {
    if (Q3(a))
      if (s === null) e.removeAttribute(a);
      else {
        switch (typeof s) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(a);
            return;
          case "boolean":
            var r = a.toLowerCase().slice(0, 5);
            if (r !== "data-" && r !== "aria-") {
              e.removeAttribute(a);
              return;
            }
        }
        e.setAttribute(a, "" + s);
      }
  }
  function Vr(e, a, s) {
    if (s === null) e.removeAttribute(a);
    else {
      switch (typeof s) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(a);
          return;
      }
      e.setAttribute(a, "" + s);
    }
  }
  function Jn(e, a, s, r) {
    if (r === null) e.removeAttribute(s);
    else {
      switch (typeof r) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(s);
          return;
      }
      e.setAttributeNS(a, s, "" + r);
    }
  }
  function mn(e) {
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
  function _p(e) {
    var a = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (a === "checkbox" || a === "radio");
  }
  function F3(e, a, s) {
    var r = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      a
    );
    if (!e.hasOwnProperty(a) && typeof r < "u" && typeof r.get == "function" && typeof r.set == "function") {
      var f = r.get, m = r.set;
      return Object.defineProperty(e, a, {
        configurable: !0,
        get: function() {
          return f.call(this);
        },
        set: function(S) {
          s = "" + S, m.call(this, S);
        }
      }), Object.defineProperty(e, a, {
        enumerable: r.enumerable
      }), {
        getValue: function() {
          return s;
        },
        setValue: function(S) {
          s = "" + S;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[a];
        }
      };
    }
  }
  function du(e) {
    if (!e._valueTracker) {
      var a = _p(e) ? "checked" : "value";
      e._valueTracker = F3(
        e,
        a,
        "" + e[a]
      );
    }
  }
  function Rp(e) {
    if (!e) return !1;
    var a = e._valueTracker;
    if (!a) return !0;
    var s = a.getValue(), r = "";
    return e && (r = _p(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== s ? (a.setValue(e), !0) : !1;
  }
  function zr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var I3 = /[\n"\\]/g;
  function pn(e) {
    return e.replace(
      I3,
      function(a) {
        return "\\" + a.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function hu(e, a, s, r, f, m, S, R) {
    e.name = "", S != null && typeof S != "function" && typeof S != "symbol" && typeof S != "boolean" ? e.type = S : e.removeAttribute("type"), a != null ? S === "number" ? (a === 0 && e.value === "" || e.value != a) && (e.value = "" + mn(a)) : e.value !== "" + mn(a) && (e.value = "" + mn(a)) : S !== "submit" && S !== "reset" || e.removeAttribute("value"), a != null ? mu(e, S, mn(a)) : s != null ? mu(e, S, mn(s)) : r != null && e.removeAttribute("value"), f == null && m != null && (e.defaultChecked = !!m), f != null && (e.checked = f && typeof f != "function" && typeof f != "symbol"), R != null && typeof R != "function" && typeof R != "symbol" && typeof R != "boolean" ? e.name = "" + mn(R) : e.removeAttribute("name");
  }
  function Dp(e, a, s, r, f, m, S, R) {
    if (m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (e.type = m), a != null || s != null) {
      if (!(m !== "submit" && m !== "reset" || a != null)) {
        du(e);
        return;
      }
      s = s != null ? "" + mn(s) : "", a = a != null ? "" + mn(a) : s, R || a === e.value || (e.value = a), e.defaultValue = a;
    }
    r = r ?? f, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = R ? e.checked : !!r, e.defaultChecked = !!r, S != null && typeof S != "function" && typeof S != "symbol" && typeof S != "boolean" && (e.name = S), du(e);
  }
  function mu(e, a, s) {
    a === "number" && zr(e.ownerDocument) === e || e.defaultValue === "" + s || (e.defaultValue = "" + s);
  }
  function Fi(e, a, s, r) {
    if (e = e.options, a) {
      a = {};
      for (var f = 0; f < s.length; f++)
        a["$" + s[f]] = !0;
      for (s = 0; s < e.length; s++)
        f = a.hasOwnProperty("$" + e[s].value), e[s].selected !== f && (e[s].selected = f), f && r && (e[s].defaultSelected = !0);
    } else {
      for (s = "" + mn(s), a = null, f = 0; f < e.length; f++) {
        if (e[f].value === s) {
          e[f].selected = !0, r && (e[f].defaultSelected = !0);
          return;
        }
        a !== null || e[f].disabled || (a = e[f]);
      }
      a !== null && (a.selected = !0);
    }
  }
  function Np(e, a, s) {
    if (a != null && (a = "" + mn(a), a !== e.value && (e.value = a), s == null)) {
      e.defaultValue !== a && (e.defaultValue = a);
      return;
    }
    e.defaultValue = s != null ? "" + mn(s) : "";
  }
  function Op(e, a, s, r) {
    if (a == null) {
      if (r != null) {
        if (s != null) throw Error(l(92));
        if (I(r)) {
          if (1 < r.length) throw Error(l(93));
          r = r[0];
        }
        s = r;
      }
      s == null && (s = ""), a = s;
    }
    s = mn(a), e.defaultValue = s, r = e.textContent, r === s && r !== "" && r !== null && (e.value = r), du(e);
  }
  function Ii(e, a) {
    if (a) {
      var s = e.firstChild;
      if (s && s === e.lastChild && s.nodeType === 3) {
        s.nodeValue = a;
        return;
      }
    }
    e.textContent = a;
  }
  var J3 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Lp(e, a, s) {
    var r = a.indexOf("--") === 0;
    s == null || typeof s == "boolean" || s === "" ? r ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "" : r ? e.setProperty(a, s) : typeof s != "number" || s === 0 || J3.has(a) ? a === "float" ? e.cssFloat = s : e[a] = ("" + s).trim() : e[a] = s + "px";
  }
  function $p(e, a, s) {
    if (a != null && typeof a != "object")
      throw Error(l(62));
    if (e = e.style, s != null) {
      for (var r in s)
        !s.hasOwnProperty(r) || a != null && a.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
      for (var f in a)
        r = a[f], a.hasOwnProperty(f) && s[f] !== r && Lp(e, f, r);
    } else
      for (var m in a)
        a.hasOwnProperty(m) && Lp(e, m, a[m]);
  }
  function pu(e) {
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
  var W3 = /* @__PURE__ */ new Map([
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
  ]), tw = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ur(e) {
    return tw.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Wn() {
  }
  var yu = null;
  function gu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Ji = null, Wi = null;
  function kp(e) {
    var a = Ki(e);
    if (a && (e = a.stateNode)) {
      var s = e[Ne] || null;
      t: switch (e = a.stateNode, a.type) {
        case "input":
          if (hu(
            e,
            s.value,
            s.defaultValue,
            s.defaultValue,
            s.checked,
            s.defaultChecked,
            s.type,
            s.name
          ), a = s.name, s.type === "radio" && a != null) {
            for (s = e; s.parentNode; ) s = s.parentNode;
            for (s = s.querySelectorAll(
              'input[name="' + pn(
                "" + a
              ) + '"][type="radio"]'
            ), a = 0; a < s.length; a++) {
              var r = s[a];
              if (r !== e && r.form === e.form) {
                var f = r[Ne] || null;
                if (!f) throw Error(l(90));
                hu(
                  r,
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
            for (a = 0; a < s.length; a++)
              r = s[a], r.form === e.form && Rp(r);
          }
          break t;
        case "textarea":
          Np(e, s.value, s.defaultValue);
          break t;
        case "select":
          a = s.value, a != null && Fi(e, !!s.multiple, a, !1);
      }
    }
  }
  var vu = !1;
  function Bp(e, a, s) {
    if (vu) return e(a, s);
    vu = !0;
    try {
      var r = e(a);
      return r;
    } finally {
      if (vu = !1, (Ji !== null || Wi !== null) && (Mo(), Ji && (a = Ji, e = Wi, Wi = Ji = null, kp(a), e)))
        for (a = 0; a < e.length; a++) kp(e[a]);
    }
  }
  function nl(e, a) {
    var s = e.stateNode;
    if (s === null) return null;
    var r = s[Ne] || null;
    if (r === null) return null;
    s = r[a];
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
        (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
        break t;
      default:
        e = !1;
    }
    if (e) return null;
    if (s && typeof s != "function")
      throw Error(
        l(231, a, typeof s)
      );
    return s;
  }
  var ta = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), bu = !1;
  if (ta)
    try {
      var al = {};
      Object.defineProperty(al, "passive", {
        get: function() {
          bu = !0;
        }
      }), window.addEventListener("test", al, al), window.removeEventListener("test", al, al);
    } catch {
      bu = !1;
    }
  var Aa = null, xu = null, Hr = null;
  function Vp() {
    if (Hr) return Hr;
    var e, a = xu, s = a.length, r, f = "value" in Aa ? Aa.value : Aa.textContent, m = f.length;
    for (e = 0; e < s && a[e] === f[e]; e++) ;
    var S = s - e;
    for (r = 1; r <= S && a[s - r] === f[m - r]; r++) ;
    return Hr = f.slice(e, 1 < r ? 1 - r : void 0);
  }
  function qr(e) {
    var a = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && a === 13 && (e = 13)) : e = a, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Yr() {
    return !0;
  }
  function zp() {
    return !1;
  }
  function Fe(e) {
    function a(s, r, f, m, S) {
      this._reactName = s, this._targetInst = f, this.type = r, this.nativeEvent = m, this.target = S, this.currentTarget = null;
      for (var R in e)
        e.hasOwnProperty(R) && (s = e[R], this[R] = s ? s(m) : m[R]);
      return this.isDefaultPrevented = (m.defaultPrevented != null ? m.defaultPrevented : m.returnValue === !1) ? Yr : zp, this.isPropagationStopped = zp, this;
    }
    return v(a.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var s = this.nativeEvent;
        s && (s.preventDefault ? s.preventDefault() : typeof s.returnValue != "unknown" && (s.returnValue = !1), this.isDefaultPrevented = Yr);
      },
      stopPropagation: function() {
        var s = this.nativeEvent;
        s && (s.stopPropagation ? s.stopPropagation() : typeof s.cancelBubble != "unknown" && (s.cancelBubble = !0), this.isPropagationStopped = Yr);
      },
      persist: function() {
      },
      isPersistent: Yr
    }), a;
  }
  var li = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Pr = Fe(li), il = v({}, li, { view: 0, detail: 0 }), ew = Fe(il), Su, wu, sl, Gr = v({}, il, {
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
    getModifierState: Tu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== sl && (sl && e.type === "mousemove" ? (Su = e.screenX - sl.screenX, wu = e.screenY - sl.screenY) : wu = Su = 0, sl = e), Su);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : wu;
    }
  }), Up = Fe(Gr), nw = v({}, Gr, { dataTransfer: 0 }), aw = Fe(nw), iw = v({}, il, { relatedTarget: 0 }), Cu = Fe(iw), sw = v({}, li, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), lw = Fe(sw), rw = v({}, li, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), ow = Fe(rw), cw = v({}, li, { data: 0 }), Hp = Fe(cw), uw = {
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
  }, fw = {
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
  }, dw = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function hw(e) {
    var a = this.nativeEvent;
    return a.getModifierState ? a.getModifierState(e) : (e = dw[e]) ? !!a[e] : !1;
  }
  function Tu() {
    return hw;
  }
  var mw = v({}, il, {
    key: function(e) {
      if (e.key) {
        var a = uw[e.key] || e.key;
        if (a !== "Unidentified") return a;
      }
      return e.type === "keypress" ? (e = qr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? fw[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Tu,
    charCode: function(e) {
      return e.type === "keypress" ? qr(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? qr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), pw = Fe(mw), yw = v({}, Gr, {
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
  }), qp = Fe(yw), gw = v({}, il, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Tu
  }), vw = Fe(gw), bw = v({}, li, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), xw = Fe(bw), Sw = v({}, Gr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), ww = Fe(Sw), Cw = v({}, li, {
    newState: 0,
    oldState: 0
  }), Tw = Fe(Cw), jw = [9, 13, 27, 32], ju = ta && "CompositionEvent" in window, ll = null;
  ta && "documentMode" in document && (ll = document.documentMode);
  var Aw = ta && "TextEvent" in window && !ll, Yp = ta && (!ju || ll && 8 < ll && 11 >= ll), Pp = " ", Gp = !1;
  function Xp(e, a) {
    switch (e) {
      case "keyup":
        return jw.indexOf(a.keyCode) !== -1;
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
  function Kp(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var ts = !1;
  function Ew(e, a) {
    switch (e) {
      case "compositionend":
        return Kp(a);
      case "keypress":
        return a.which !== 32 ? null : (Gp = !0, Pp);
      case "textInput":
        return e = a.data, e === Pp && Gp ? null : e;
      default:
        return null;
    }
  }
  function Mw(e, a) {
    if (ts)
      return e === "compositionend" || !ju && Xp(e, a) ? (e = Vp(), Hr = xu = Aa = null, ts = !1, e) : null;
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
        return Yp && a.locale !== "ko" ? null : a.data;
      default:
        return null;
    }
  }
  var _w = {
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
  function Zp(e) {
    var a = e && e.nodeName && e.nodeName.toLowerCase();
    return a === "input" ? !!_w[e.type] : a === "textarea";
  }
  function Qp(e, a, s, r) {
    Ji ? Wi ? Wi.push(r) : Wi = [r] : Ji = r, a = $o(a, "onChange"), 0 < a.length && (s = new Pr(
      "onChange",
      "change",
      null,
      s,
      r
    ), e.push({ event: s, listeners: a }));
  }
  var rl = null, ol = null;
  function Rw(e) {
    Dy(e, 0);
  }
  function Xr(e) {
    var a = el(e);
    if (Rp(a)) return e;
  }
  function Fp(e, a) {
    if (e === "change") return a;
  }
  var Ip = !1;
  if (ta) {
    var Au;
    if (ta) {
      var Eu = "oninput" in document;
      if (!Eu) {
        var Jp = document.createElement("div");
        Jp.setAttribute("oninput", "return;"), Eu = typeof Jp.oninput == "function";
      }
      Au = Eu;
    } else Au = !1;
    Ip = Au && (!document.documentMode || 9 < document.documentMode);
  }
  function Wp() {
    rl && (rl.detachEvent("onpropertychange", t0), ol = rl = null);
  }
  function t0(e) {
    if (e.propertyName === "value" && Xr(ol)) {
      var a = [];
      Qp(
        a,
        ol,
        e,
        gu(e)
      ), Bp(Rw, a);
    }
  }
  function Dw(e, a, s) {
    e === "focusin" ? (Wp(), rl = a, ol = s, rl.attachEvent("onpropertychange", t0)) : e === "focusout" && Wp();
  }
  function Nw(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Xr(ol);
  }
  function Ow(e, a) {
    if (e === "click") return Xr(a);
  }
  function Lw(e, a) {
    if (e === "input" || e === "change")
      return Xr(a);
  }
  function $w(e, a) {
    return e === a && (e !== 0 || 1 / e === 1 / a) || e !== e && a !== a;
  }
  var sn = typeof Object.is == "function" ? Object.is : $w;
  function cl(e, a) {
    if (sn(e, a)) return !0;
    if (typeof e != "object" || e === null || typeof a != "object" || a === null)
      return !1;
    var s = Object.keys(e), r = Object.keys(a);
    if (s.length !== r.length) return !1;
    for (r = 0; r < s.length; r++) {
      var f = s[r];
      if (!hn.call(a, f) || !sn(e[f], a[f]))
        return !1;
    }
    return !0;
  }
  function e0(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function n0(e, a) {
    var s = e0(e);
    e = 0;
    for (var r; s; ) {
      if (s.nodeType === 3) {
        if (r = e + s.textContent.length, e <= a && r >= a)
          return { node: s, offset: a - e };
        e = r;
      }
      t: {
        for (; s; ) {
          if (s.nextSibling) {
            s = s.nextSibling;
            break t;
          }
          s = s.parentNode;
        }
        s = void 0;
      }
      s = e0(s);
    }
  }
  function a0(e, a) {
    return e && a ? e === a ? !0 : e && e.nodeType === 3 ? !1 : a && a.nodeType === 3 ? a0(e, a.parentNode) : "contains" in e ? e.contains(a) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(a) & 16) : !1 : !1;
  }
  function i0(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var a = zr(e.document); a instanceof e.HTMLIFrameElement; ) {
      try {
        var s = typeof a.contentWindow.location.href == "string";
      } catch {
        s = !1;
      }
      if (s) e = a.contentWindow;
      else break;
      a = zr(e.document);
    }
    return a;
  }
  function Mu(e) {
    var a = e && e.nodeName && e.nodeName.toLowerCase();
    return a && (a === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || a === "textarea" || e.contentEditable === "true");
  }
  var kw = ta && "documentMode" in document && 11 >= document.documentMode, es = null, _u = null, ul = null, Ru = !1;
  function s0(e, a, s) {
    var r = s.window === s ? s.document : s.nodeType === 9 ? s : s.ownerDocument;
    Ru || es == null || es !== zr(r) || (r = es, "selectionStart" in r && Mu(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
      anchorNode: r.anchorNode,
      anchorOffset: r.anchorOffset,
      focusNode: r.focusNode,
      focusOffset: r.focusOffset
    }), ul && cl(ul, r) || (ul = r, r = $o(_u, "onSelect"), 0 < r.length && (a = new Pr(
      "onSelect",
      "select",
      null,
      a,
      s
    ), e.push({ event: a, listeners: r }), a.target = es)));
  }
  function ri(e, a) {
    var s = {};
    return s[e.toLowerCase()] = a.toLowerCase(), s["Webkit" + e] = "webkit" + a, s["Moz" + e] = "moz" + a, s;
  }
  var ns = {
    animationend: ri("Animation", "AnimationEnd"),
    animationiteration: ri("Animation", "AnimationIteration"),
    animationstart: ri("Animation", "AnimationStart"),
    transitionrun: ri("Transition", "TransitionRun"),
    transitionstart: ri("Transition", "TransitionStart"),
    transitioncancel: ri("Transition", "TransitionCancel"),
    transitionend: ri("Transition", "TransitionEnd")
  }, Du = {}, l0 = {};
  ta && (l0 = document.createElement("div").style, "AnimationEvent" in window || (delete ns.animationend.animation, delete ns.animationiteration.animation, delete ns.animationstart.animation), "TransitionEvent" in window || delete ns.transitionend.transition);
  function oi(e) {
    if (Du[e]) return Du[e];
    if (!ns[e]) return e;
    var a = ns[e], s;
    for (s in a)
      if (a.hasOwnProperty(s) && s in l0)
        return Du[e] = a[s];
    return e;
  }
  var r0 = oi("animationend"), o0 = oi("animationiteration"), c0 = oi("animationstart"), Bw = oi("transitionrun"), Vw = oi("transitionstart"), zw = oi("transitioncancel"), u0 = oi("transitionend"), f0 = /* @__PURE__ */ new Map(), Nu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Nu.push("scrollEnd");
  function En(e, a) {
    f0.set(e, a), si(a, [e]);
  }
  var Kr = typeof reportError == "function" ? reportError : function(e) {
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
  }, yn = [], as = 0, Ou = 0;
  function Zr() {
    for (var e = as, a = Ou = as = 0; a < e; ) {
      var s = yn[a];
      yn[a++] = null;
      var r = yn[a];
      yn[a++] = null;
      var f = yn[a];
      yn[a++] = null;
      var m = yn[a];
      if (yn[a++] = null, r !== null && f !== null) {
        var S = r.pending;
        S === null ? f.next = f : (f.next = S.next, S.next = f), r.pending = f;
      }
      m !== 0 && d0(s, f, m);
    }
  }
  function Qr(e, a, s, r) {
    yn[as++] = e, yn[as++] = a, yn[as++] = s, yn[as++] = r, Ou |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
  }
  function Lu(e, a, s, r) {
    return Qr(e, a, s, r), Fr(e);
  }
  function ci(e, a) {
    return Qr(e, null, null, a), Fr(e);
  }
  function d0(e, a, s) {
    e.lanes |= s;
    var r = e.alternate;
    r !== null && (r.lanes |= s);
    for (var f = !1, m = e.return; m !== null; )
      m.childLanes |= s, r = m.alternate, r !== null && (r.childLanes |= s), m.tag === 22 && (e = m.stateNode, e === null || e._visibility & 1 || (f = !0)), e = m, m = m.return;
    return e.tag === 3 ? (m = e.stateNode, f && a !== null && (f = 31 - Ue(s), e = m.hiddenUpdates, r = e[f], r === null ? e[f] = [a] : r.push(a), a.lane = s | 536870912), m) : null;
  }
  function Fr(e) {
    if (50 < Nl)
      throw Nl = 0, Pf = null, Error(l(185));
    for (var a = e.return; a !== null; )
      e = a, a = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var is = {};
  function Uw(e, a, s, r) {
    this.tag = e, this.key = s, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = a, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ln(e, a, s, r) {
    return new Uw(e, a, s, r);
  }
  function $u(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function ea(e, a) {
    var s = e.alternate;
    return s === null ? (s = ln(
      e.tag,
      a,
      e.key,
      e.mode
    ), s.elementType = e.elementType, s.type = e.type, s.stateNode = e.stateNode, s.alternate = e, e.alternate = s) : (s.pendingProps = a, s.type = e.type, s.flags = 0, s.subtreeFlags = 0, s.deletions = null), s.flags = e.flags & 65011712, s.childLanes = e.childLanes, s.lanes = e.lanes, s.child = e.child, s.memoizedProps = e.memoizedProps, s.memoizedState = e.memoizedState, s.updateQueue = e.updateQueue, a = e.dependencies, s.dependencies = a === null ? null : { lanes: a.lanes, firstContext: a.firstContext }, s.sibling = e.sibling, s.index = e.index, s.ref = e.ref, s.refCleanup = e.refCleanup, s;
  }
  function h0(e, a) {
    e.flags &= 65011714;
    var s = e.alternate;
    return s === null ? (e.childLanes = 0, e.lanes = a, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = s.childLanes, e.lanes = s.lanes, e.child = s.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = s.memoizedProps, e.memoizedState = s.memoizedState, e.updateQueue = s.updateQueue, e.type = s.type, a = s.dependencies, e.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }), e;
  }
  function Ir(e, a, s, r, f, m) {
    var S = 0;
    if (r = e, typeof e == "function") $u(e) && (S = 1);
    else if (typeof e == "string")
      S = G4(
        e,
        s,
        et.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      t: switch (e) {
        case H:
          return e = ln(31, s, a, f), e.elementType = H, e.lanes = m, e;
        case T:
          return ui(s.children, f, m, a);
        case x:
          S = 8, f |= 24;
          break;
        case A:
          return e = ln(12, s, a, f | 2), e.elementType = A, e.lanes = m, e;
        case O:
          return e = ln(13, s, a, f), e.elementType = O, e.lanes = m, e;
        case D:
          return e = ln(19, s, a, f), e.elementType = D, e.lanes = m, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case E:
                S = 10;
                break t;
              case _:
                S = 9;
                break t;
              case M:
                S = 11;
                break t;
              case N:
                S = 14;
                break t;
              case V:
                S = 16, r = null;
                break t;
            }
          S = 29, s = Error(
            l(130, e === null ? "null" : typeof e, "")
          ), r = null;
      }
    return a = ln(S, s, a, f), a.elementType = e, a.type = r, a.lanes = m, a;
  }
  function ui(e, a, s, r) {
    return e = ln(7, e, r, a), e.lanes = s, e;
  }
  function ku(e, a, s) {
    return e = ln(6, e, null, a), e.lanes = s, e;
  }
  function m0(e) {
    var a = ln(18, null, null, 0);
    return a.stateNode = e, a;
  }
  function Bu(e, a, s) {
    return a = ln(
      4,
      e.children !== null ? e.children : [],
      e.key,
      a
    ), a.lanes = s, a.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, a;
  }
  var p0 = /* @__PURE__ */ new WeakMap();
  function gn(e, a) {
    if (typeof e == "object" && e !== null) {
      var s = p0.get(e);
      return s !== void 0 ? s : (a = {
        value: e,
        source: a,
        stack: se(a)
      }, p0.set(e, a), a);
    }
    return {
      value: e,
      source: a,
      stack: se(a)
    };
  }
  var ss = [], ls = 0, Jr = null, fl = 0, vn = [], bn = 0, Ea = null, Un = 1, Hn = "";
  function na(e, a) {
    ss[ls++] = fl, ss[ls++] = Jr, Jr = e, fl = a;
  }
  function y0(e, a, s) {
    vn[bn++] = Un, vn[bn++] = Hn, vn[bn++] = Ea, Ea = e;
    var r = Un;
    e = Hn;
    var f = 32 - Ue(r) - 1;
    r &= ~(1 << f), s += 1;
    var m = 32 - Ue(a) + f;
    if (30 < m) {
      var S = f - f % 5;
      m = (r & (1 << S) - 1).toString(32), r >>= S, f -= S, Un = 1 << 32 - Ue(a) + f | s << f | r, Hn = m + e;
    } else
      Un = 1 << m | s << f | r, Hn = e;
  }
  function Vu(e) {
    e.return !== null && (na(e, 1), y0(e, 1, 0));
  }
  function zu(e) {
    for (; e === Jr; )
      Jr = ss[--ls], ss[ls] = null, fl = ss[--ls], ss[ls] = null;
    for (; e === Ea; )
      Ea = vn[--bn], vn[bn] = null, Hn = vn[--bn], vn[bn] = null, Un = vn[--bn], vn[bn] = null;
  }
  function g0(e, a) {
    vn[bn++] = Un, vn[bn++] = Hn, vn[bn++] = Ea, Un = a.id, Hn = a.overflow, Ea = e;
  }
  var Oe = null, te = null, kt = !1, Ma = null, xn = !1, Uu = Error(l(519));
  function _a(e) {
    var a = Error(
      l(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw dl(gn(a, e)), Uu;
  }
  function v0(e) {
    var a = e.stateNode, s = e.type, r = e.memoizedProps;
    switch (a[Wt] = e, a[Ne] = r, s) {
      case "dialog":
        Ot("cancel", a), Ot("close", a);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ot("load", a);
        break;
      case "video":
      case "audio":
        for (s = 0; s < Ll.length; s++)
          Ot(Ll[s], a);
        break;
      case "source":
        Ot("error", a);
        break;
      case "img":
      case "image":
      case "link":
        Ot("error", a), Ot("load", a);
        break;
      case "details":
        Ot("toggle", a);
        break;
      case "input":
        Ot("invalid", a), Dp(
          a,
          r.value,
          r.defaultValue,
          r.checked,
          r.defaultChecked,
          r.type,
          r.name,
          !0
        );
        break;
      case "select":
        Ot("invalid", a);
        break;
      case "textarea":
        Ot("invalid", a), Op(a, r.value, r.defaultValue, r.children);
    }
    s = r.children, typeof s != "string" && typeof s != "number" && typeof s != "bigint" || a.textContent === "" + s || r.suppressHydrationWarning === !0 || $y(a.textContent, s) ? (r.popover != null && (Ot("beforetoggle", a), Ot("toggle", a)), r.onScroll != null && Ot("scroll", a), r.onScrollEnd != null && Ot("scrollend", a), r.onClick != null && (a.onclick = Wn), a = !0) : a = !1, a || _a(e, !0);
  }
  function b0(e) {
    for (Oe = e.return; Oe; )
      switch (Oe.tag) {
        case 5:
        case 31:
        case 13:
          xn = !1;
          return;
        case 27:
        case 3:
          xn = !0;
          return;
        default:
          Oe = Oe.return;
      }
  }
  function rs(e) {
    if (e !== Oe) return !1;
    if (!kt) return b0(e), kt = !0, !1;
    var a = e.tag, s;
    if ((s = a !== 3 && a !== 27) && ((s = a === 5) && (s = e.type, s = !(s !== "form" && s !== "button") || sd(e.type, e.memoizedProps)), s = !s), s && te && _a(e), b0(e), a === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      te = Py(e);
    } else if (a === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      te = Py(e);
    } else
      a === 27 ? (a = te, Ya(e.type) ? (e = ud, ud = null, te = e) : te = a) : te = Oe ? wn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function fi() {
    te = Oe = null, kt = !1;
  }
  function Hu() {
    var e = Ma;
    return e !== null && (tn === null ? tn = e : tn.push.apply(
      tn,
      e
    ), Ma = null), e;
  }
  function dl(e) {
    Ma === null ? Ma = [e] : Ma.push(e);
  }
  var qu = L(null), di = null, aa = null;
  function Ra(e, a, s) {
    G(qu, a._currentValue), a._currentValue = s;
  }
  function ia(e) {
    e._currentValue = qu.current, q(qu);
  }
  function Yu(e, a, s) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & a) !== a ? (e.childLanes |= a, r !== null && (r.childLanes |= a)) : r !== null && (r.childLanes & a) !== a && (r.childLanes |= a), e === s) break;
      e = e.return;
    }
  }
  function Pu(e, a, s, r) {
    var f = e.child;
    for (f !== null && (f.return = e); f !== null; ) {
      var m = f.dependencies;
      if (m !== null) {
        var S = f.child;
        m = m.firstContext;
        t: for (; m !== null; ) {
          var R = m;
          m = f;
          for (var k = 0; k < a.length; k++)
            if (R.context === a[k]) {
              m.lanes |= s, R = m.alternate, R !== null && (R.lanes |= s), Yu(
                m.return,
                s,
                e
              ), r || (S = null);
              break t;
            }
          m = R.next;
        }
      } else if (f.tag === 18) {
        if (S = f.return, S === null) throw Error(l(341));
        S.lanes |= s, m = S.alternate, m !== null && (m.lanes |= s), Yu(S, s, e), S = null;
      } else S = f.child;
      if (S !== null) S.return = f;
      else
        for (S = f; S !== null; ) {
          if (S === e) {
            S = null;
            break;
          }
          if (f = S.sibling, f !== null) {
            f.return = S.return, S = f;
            break;
          }
          S = S.return;
        }
      f = S;
    }
  }
  function os(e, a, s, r) {
    e = null;
    for (var f = a, m = !1; f !== null; ) {
      if (!m) {
        if ((f.flags & 524288) !== 0) m = !0;
        else if ((f.flags & 262144) !== 0) break;
      }
      if (f.tag === 10) {
        var S = f.alternate;
        if (S === null) throw Error(l(387));
        if (S = S.memoizedProps, S !== null) {
          var R = f.type;
          sn(f.pendingProps.value, S.value) || (e !== null ? e.push(R) : e = [R]);
        }
      } else if (f === ht.current) {
        if (S = f.alternate, S === null) throw Error(l(387));
        S.memoizedState.memoizedState !== f.memoizedState.memoizedState && (e !== null ? e.push(zl) : e = [zl]);
      }
      f = f.return;
    }
    e !== null && Pu(
      a,
      e,
      s,
      r
    ), a.flags |= 262144;
  }
  function Wr(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!sn(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function hi(e) {
    di = e, aa = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Le(e) {
    return x0(di, e);
  }
  function to(e, a) {
    return di === null && hi(e), x0(e, a);
  }
  function x0(e, a) {
    var s = a._currentValue;
    if (a = { context: a, memoizedValue: s, next: null }, aa === null) {
      if (e === null) throw Error(l(308));
      aa = a, e.dependencies = { lanes: 0, firstContext: a }, e.flags |= 524288;
    } else aa = aa.next = a;
    return s;
  }
  var Hw = typeof AbortController < "u" ? AbortController : function() {
    var e = [], a = this.signal = {
      aborted: !1,
      addEventListener: function(s, r) {
        e.push(r);
      }
    };
    this.abort = function() {
      a.aborted = !0, e.forEach(function(s) {
        return s();
      });
    };
  }, qw = n.unstable_scheduleCallback, Yw = n.unstable_NormalPriority, ve = {
    $$typeof: E,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Gu() {
    return {
      controller: new Hw(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function hl(e) {
    e.refCount--, e.refCount === 0 && qw(Yw, function() {
      e.controller.abort();
    });
  }
  var ml = null, Xu = 0, cs = 0, us = null;
  function Pw(e, a) {
    if (ml === null) {
      var s = ml = [];
      Xu = 0, cs = Ff(), us = {
        status: "pending",
        value: void 0,
        then: function(r) {
          s.push(r);
        }
      };
    }
    return Xu++, a.then(S0, S0), a;
  }
  function S0() {
    if (--Xu === 0 && ml !== null) {
      us !== null && (us.status = "fulfilled");
      var e = ml;
      ml = null, cs = 0, us = null;
      for (var a = 0; a < e.length; a++) (0, e[a])();
    }
  }
  function Gw(e, a) {
    var s = [], r = {
      status: "pending",
      value: null,
      reason: null,
      then: function(f) {
        s.push(f);
      }
    };
    return e.then(
      function() {
        r.status = "fulfilled", r.value = a;
        for (var f = 0; f < s.length; f++) (0, s[f])(a);
      },
      function(f) {
        for (r.status = "rejected", r.reason = f, f = 0; f < s.length; f++)
          (0, s[f])(void 0);
      }
    ), r;
  }
  var w0 = $.S;
  $.S = function(e, a) {
    sy = ze(), typeof a == "object" && a !== null && typeof a.then == "function" && Pw(e, a), w0 !== null && w0(e, a);
  };
  var mi = L(null);
  function Ku() {
    var e = mi.current;
    return e !== null ? e : Jt.pooledCache;
  }
  function eo(e, a) {
    a === null ? G(mi, mi.current) : G(mi, a.pool);
  }
  function C0() {
    var e = Ku();
    return e === null ? null : { parent: ve._currentValue, pool: e };
  }
  var fs = Error(l(460)), Zu = Error(l(474)), no = Error(l(542)), ao = { then: function() {
  } };
  function T0(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function j0(e, a, s) {
    switch (s = e[s], s === void 0 ? e.push(a) : s !== a && (a.then(Wn, Wn), a = s), a.status) {
      case "fulfilled":
        return a.value;
      case "rejected":
        throw e = a.reason, E0(e), e;
      default:
        if (typeof a.status == "string") a.then(Wn, Wn);
        else {
          if (e = Jt, e !== null && 100 < e.shellSuspendCounter)
            throw Error(l(482));
          e = a, e.status = "pending", e.then(
            function(r) {
              if (a.status === "pending") {
                var f = a;
                f.status = "fulfilled", f.value = r;
              }
            },
            function(r) {
              if (a.status === "pending") {
                var f = a;
                f.status = "rejected", f.reason = r;
              }
            }
          );
        }
        switch (a.status) {
          case "fulfilled":
            return a.value;
          case "rejected":
            throw e = a.reason, E0(e), e;
        }
        throw yi = a, fs;
    }
  }
  function pi(e) {
    try {
      var a = e._init;
      return a(e._payload);
    } catch (s) {
      throw s !== null && typeof s == "object" && typeof s.then == "function" ? (yi = s, fs) : s;
    }
  }
  var yi = null;
  function A0() {
    if (yi === null) throw Error(l(459));
    var e = yi;
    return yi = null, e;
  }
  function E0(e) {
    if (e === fs || e === no)
      throw Error(l(483));
  }
  var ds = null, pl = 0;
  function io(e) {
    var a = pl;
    return pl += 1, ds === null && (ds = []), j0(ds, e, a);
  }
  function yl(e, a) {
    a = a.props.ref, e.ref = a !== void 0 ? a : null;
  }
  function so(e, a) {
    throw a.$$typeof === b ? Error(l(525)) : (e = Object.prototype.toString.call(a), Error(
      l(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : e
      )
    ));
  }
  function M0(e) {
    function a(P, z) {
      if (e) {
        var K = P.deletions;
        K === null ? (P.deletions = [z], P.flags |= 16) : K.push(z);
      }
    }
    function s(P, z) {
      if (!e) return null;
      for (; z !== null; )
        a(P, z), z = z.sibling;
      return null;
    }
    function r(P) {
      for (var z = /* @__PURE__ */ new Map(); P !== null; )
        P.key !== null ? z.set(P.key, P) : z.set(P.index, P), P = P.sibling;
      return z;
    }
    function f(P, z) {
      return P = ea(P, z), P.index = 0, P.sibling = null, P;
    }
    function m(P, z, K) {
      return P.index = K, e ? (K = P.alternate, K !== null ? (K = K.index, K < z ? (P.flags |= 67108866, z) : K) : (P.flags |= 67108866, z)) : (P.flags |= 1048576, z);
    }
    function S(P) {
      return e && P.alternate === null && (P.flags |= 67108866), P;
    }
    function R(P, z, K, lt) {
      return z === null || z.tag !== 6 ? (z = ku(K, P.mode, lt), z.return = P, z) : (z = f(z, K), z.return = P, z);
    }
    function k(P, z, K, lt) {
      var wt = K.type;
      return wt === T ? it(
        P,
        z,
        K.props.children,
        lt,
        K.key
      ) : z !== null && (z.elementType === wt || typeof wt == "object" && wt !== null && wt.$$typeof === V && pi(wt) === z.type) ? (z = f(z, K.props), yl(z, K), z.return = P, z) : (z = Ir(
        K.type,
        K.key,
        K.props,
        null,
        P.mode,
        lt
      ), yl(z, K), z.return = P, z);
    }
    function Z(P, z, K, lt) {
      return z === null || z.tag !== 4 || z.stateNode.containerInfo !== K.containerInfo || z.stateNode.implementation !== K.implementation ? (z = Bu(K, P.mode, lt), z.return = P, z) : (z = f(z, K.children || []), z.return = P, z);
    }
    function it(P, z, K, lt, wt) {
      return z === null || z.tag !== 7 ? (z = ui(
        K,
        P.mode,
        lt,
        wt
      ), z.return = P, z) : (z = f(z, K), z.return = P, z);
    }
    function rt(P, z, K) {
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return z = ku(
          "" + z,
          P.mode,
          K
        ), z.return = P, z;
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case j:
            return K = Ir(
              z.type,
              z.key,
              z.props,
              null,
              P.mode,
              K
            ), yl(K, z), K.return = P, K;
          case w:
            return z = Bu(
              z,
              P.mode,
              K
            ), z.return = P, z;
          case V:
            return z = pi(z), rt(P, z, K);
        }
        if (I(z) || F(z))
          return z = ui(
            z,
            P.mode,
            K,
            null
          ), z.return = P, z;
        if (typeof z.then == "function")
          return rt(P, io(z), K);
        if (z.$$typeof === E)
          return rt(
            P,
            to(P, z),
            K
          );
        so(P, z);
      }
      return null;
    }
    function Q(P, z, K, lt) {
      var wt = z !== null ? z.key : null;
      if (typeof K == "string" && K !== "" || typeof K == "number" || typeof K == "bigint")
        return wt !== null ? null : R(P, z, "" + K, lt);
      if (typeof K == "object" && K !== null) {
        switch (K.$$typeof) {
          case j:
            return K.key === wt ? k(P, z, K, lt) : null;
          case w:
            return K.key === wt ? Z(P, z, K, lt) : null;
          case V:
            return K = pi(K), Q(P, z, K, lt);
        }
        if (I(K) || F(K))
          return wt !== null ? null : it(P, z, K, lt, null);
        if (typeof K.then == "function")
          return Q(
            P,
            z,
            io(K),
            lt
          );
        if (K.$$typeof === E)
          return Q(
            P,
            z,
            to(P, K),
            lt
          );
        so(P, K);
      }
      return null;
    }
    function W(P, z, K, lt, wt) {
      if (typeof lt == "string" && lt !== "" || typeof lt == "number" || typeof lt == "bigint")
        return P = P.get(K) || null, R(z, P, "" + lt, wt);
      if (typeof lt == "object" && lt !== null) {
        switch (lt.$$typeof) {
          case j:
            return P = P.get(
              lt.key === null ? K : lt.key
            ) || null, k(z, P, lt, wt);
          case w:
            return P = P.get(
              lt.key === null ? K : lt.key
            ) || null, Z(z, P, lt, wt);
          case V:
            return lt = pi(lt), W(
              P,
              z,
              K,
              lt,
              wt
            );
        }
        if (I(lt) || F(lt))
          return P = P.get(K) || null, it(z, P, lt, wt, null);
        if (typeof lt.then == "function")
          return W(
            P,
            z,
            K,
            io(lt),
            wt
          );
        if (lt.$$typeof === E)
          return W(
            P,
            z,
            K,
            to(z, lt),
            wt
          );
        so(z, lt);
      }
      return null;
    }
    function bt(P, z, K, lt) {
      for (var wt = null, Ut = null, St = z, Dt = z = 0, $t = null; St !== null && Dt < K.length; Dt++) {
        St.index > Dt ? ($t = St, St = null) : $t = St.sibling;
        var Ht = Q(
          P,
          St,
          K[Dt],
          lt
        );
        if (Ht === null) {
          St === null && (St = $t);
          break;
        }
        e && St && Ht.alternate === null && a(P, St), z = m(Ht, z, Dt), Ut === null ? wt = Ht : Ut.sibling = Ht, Ut = Ht, St = $t;
      }
      if (Dt === K.length)
        return s(P, St), kt && na(P, Dt), wt;
      if (St === null) {
        for (; Dt < K.length; Dt++)
          St = rt(P, K[Dt], lt), St !== null && (z = m(
            St,
            z,
            Dt
          ), Ut === null ? wt = St : Ut.sibling = St, Ut = St);
        return kt && na(P, Dt), wt;
      }
      for (St = r(St); Dt < K.length; Dt++)
        $t = W(
          St,
          P,
          Dt,
          K[Dt],
          lt
        ), $t !== null && (e && $t.alternate !== null && St.delete(
          $t.key === null ? Dt : $t.key
        ), z = m(
          $t,
          z,
          Dt
        ), Ut === null ? wt = $t : Ut.sibling = $t, Ut = $t);
      return e && St.forEach(function(Za) {
        return a(P, Za);
      }), kt && na(P, Dt), wt;
    }
    function Ct(P, z, K, lt) {
      if (K == null) throw Error(l(151));
      for (var wt = null, Ut = null, St = z, Dt = z = 0, $t = null, Ht = K.next(); St !== null && !Ht.done; Dt++, Ht = K.next()) {
        St.index > Dt ? ($t = St, St = null) : $t = St.sibling;
        var Za = Q(P, St, Ht.value, lt);
        if (Za === null) {
          St === null && (St = $t);
          break;
        }
        e && St && Za.alternate === null && a(P, St), z = m(Za, z, Dt), Ut === null ? wt = Za : Ut.sibling = Za, Ut = Za, St = $t;
      }
      if (Ht.done)
        return s(P, St), kt && na(P, Dt), wt;
      if (St === null) {
        for (; !Ht.done; Dt++, Ht = K.next())
          Ht = rt(P, Ht.value, lt), Ht !== null && (z = m(Ht, z, Dt), Ut === null ? wt = Ht : Ut.sibling = Ht, Ut = Ht);
        return kt && na(P, Dt), wt;
      }
      for (St = r(St); !Ht.done; Dt++, Ht = K.next())
        Ht = W(St, P, Dt, Ht.value, lt), Ht !== null && (e && Ht.alternate !== null && St.delete(Ht.key === null ? Dt : Ht.key), z = m(Ht, z, Dt), Ut === null ? wt = Ht : Ut.sibling = Ht, Ut = Ht);
      return e && St.forEach(function(n5) {
        return a(P, n5);
      }), kt && na(P, Dt), wt;
    }
    function Zt(P, z, K, lt) {
      if (typeof K == "object" && K !== null && K.type === T && K.key === null && (K = K.props.children), typeof K == "object" && K !== null) {
        switch (K.$$typeof) {
          case j:
            t: {
              for (var wt = K.key; z !== null; ) {
                if (z.key === wt) {
                  if (wt = K.type, wt === T) {
                    if (z.tag === 7) {
                      s(
                        P,
                        z.sibling
                      ), lt = f(
                        z,
                        K.props.children
                      ), lt.return = P, P = lt;
                      break t;
                    }
                  } else if (z.elementType === wt || typeof wt == "object" && wt !== null && wt.$$typeof === V && pi(wt) === z.type) {
                    s(
                      P,
                      z.sibling
                    ), lt = f(z, K.props), yl(lt, K), lt.return = P, P = lt;
                    break t;
                  }
                  s(P, z);
                  break;
                } else a(P, z);
                z = z.sibling;
              }
              K.type === T ? (lt = ui(
                K.props.children,
                P.mode,
                lt,
                K.key
              ), lt.return = P, P = lt) : (lt = Ir(
                K.type,
                K.key,
                K.props,
                null,
                P.mode,
                lt
              ), yl(lt, K), lt.return = P, P = lt);
            }
            return S(P);
          case w:
            t: {
              for (wt = K.key; z !== null; ) {
                if (z.key === wt)
                  if (z.tag === 4 && z.stateNode.containerInfo === K.containerInfo && z.stateNode.implementation === K.implementation) {
                    s(
                      P,
                      z.sibling
                    ), lt = f(z, K.children || []), lt.return = P, P = lt;
                    break t;
                  } else {
                    s(P, z);
                    break;
                  }
                else a(P, z);
                z = z.sibling;
              }
              lt = Bu(K, P.mode, lt), lt.return = P, P = lt;
            }
            return S(P);
          case V:
            return K = pi(K), Zt(
              P,
              z,
              K,
              lt
            );
        }
        if (I(K))
          return bt(
            P,
            z,
            K,
            lt
          );
        if (F(K)) {
          if (wt = F(K), typeof wt != "function") throw Error(l(150));
          return K = wt.call(K), Ct(
            P,
            z,
            K,
            lt
          );
        }
        if (typeof K.then == "function")
          return Zt(
            P,
            z,
            io(K),
            lt
          );
        if (K.$$typeof === E)
          return Zt(
            P,
            z,
            to(P, K),
            lt
          );
        so(P, K);
      }
      return typeof K == "string" && K !== "" || typeof K == "number" || typeof K == "bigint" ? (K = "" + K, z !== null && z.tag === 6 ? (s(P, z.sibling), lt = f(z, K), lt.return = P, P = lt) : (s(P, z), lt = ku(K, P.mode, lt), lt.return = P, P = lt), S(P)) : s(P, z);
    }
    return function(P, z, K, lt) {
      try {
        pl = 0;
        var wt = Zt(
          P,
          z,
          K,
          lt
        );
        return ds = null, wt;
      } catch (St) {
        if (St === fs || St === no) throw St;
        var Ut = ln(29, St, null, P.mode);
        return Ut.lanes = lt, Ut.return = P, Ut;
      } finally {
      }
    };
  }
  var gi = M0(!0), _0 = M0(!1), Da = !1;
  function Qu(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Fu(e, a) {
    e = e.updateQueue, a.updateQueue === e && (a.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Na(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Oa(e, a, s) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (qt & 2) !== 0) {
      var f = r.pending;
      return f === null ? a.next = a : (a.next = f.next, f.next = a), r.pending = a, a = Fr(e), d0(e, null, s), a;
    }
    return Qr(e, r, a, s), Fr(e);
  }
  function gl(e, a, s) {
    if (a = a.updateQueue, a !== null && (a = a.shared, (s & 4194048) !== 0)) {
      var r = a.lanes;
      r &= e.pendingLanes, s |= r, a.lanes = s, Me(e, s);
    }
  }
  function Iu(e, a) {
    var s = e.updateQueue, r = e.alternate;
    if (r !== null && (r = r.updateQueue, s === r)) {
      var f = null, m = null;
      if (s = s.firstBaseUpdate, s !== null) {
        do {
          var S = {
            lane: s.lane,
            tag: s.tag,
            payload: s.payload,
            callback: null,
            next: null
          };
          m === null ? f = m = S : m = m.next = S, s = s.next;
        } while (s !== null);
        m === null ? f = m = a : m = m.next = a;
      } else f = m = a;
      s = {
        baseState: r.baseState,
        firstBaseUpdate: f,
        lastBaseUpdate: m,
        shared: r.shared,
        callbacks: r.callbacks
      }, e.updateQueue = s;
      return;
    }
    e = s.lastBaseUpdate, e === null ? s.firstBaseUpdate = a : e.next = a, s.lastBaseUpdate = a;
  }
  var Ju = !1;
  function vl() {
    if (Ju) {
      var e = us;
      if (e !== null) throw e;
    }
  }
  function bl(e, a, s, r) {
    Ju = !1;
    var f = e.updateQueue;
    Da = !1;
    var m = f.firstBaseUpdate, S = f.lastBaseUpdate, R = f.shared.pending;
    if (R !== null) {
      f.shared.pending = null;
      var k = R, Z = k.next;
      k.next = null, S === null ? m = Z : S.next = Z, S = k;
      var it = e.alternate;
      it !== null && (it = it.updateQueue, R = it.lastBaseUpdate, R !== S && (R === null ? it.firstBaseUpdate = Z : R.next = Z, it.lastBaseUpdate = k));
    }
    if (m !== null) {
      var rt = f.baseState;
      S = 0, it = Z = k = null, R = m;
      do {
        var Q = R.lane & -536870913, W = Q !== R.lane;
        if (W ? (Lt & Q) === Q : (r & Q) === Q) {
          Q !== 0 && Q === cs && (Ju = !0), it !== null && (it = it.next = {
            lane: 0,
            tag: R.tag,
            payload: R.payload,
            callback: null,
            next: null
          });
          t: {
            var bt = e, Ct = R;
            Q = a;
            var Zt = s;
            switch (Ct.tag) {
              case 1:
                if (bt = Ct.payload, typeof bt == "function") {
                  rt = bt.call(Zt, rt, Q);
                  break t;
                }
                rt = bt;
                break t;
              case 3:
                bt.flags = bt.flags & -65537 | 128;
              case 0:
                if (bt = Ct.payload, Q = typeof bt == "function" ? bt.call(Zt, rt, Q) : bt, Q == null) break t;
                rt = v({}, rt, Q);
                break t;
              case 2:
                Da = !0;
            }
          }
          Q = R.callback, Q !== null && (e.flags |= 64, W && (e.flags |= 8192), W = f.callbacks, W === null ? f.callbacks = [Q] : W.push(Q));
        } else
          W = {
            lane: Q,
            tag: R.tag,
            payload: R.payload,
            callback: R.callback,
            next: null
          }, it === null ? (Z = it = W, k = rt) : it = it.next = W, S |= Q;
        if (R = R.next, R === null) {
          if (R = f.shared.pending, R === null)
            break;
          W = R, R = W.next, W.next = null, f.lastBaseUpdate = W, f.shared.pending = null;
        }
      } while (!0);
      it === null && (k = rt), f.baseState = k, f.firstBaseUpdate = Z, f.lastBaseUpdate = it, m === null && (f.shared.lanes = 0), Va |= S, e.lanes = S, e.memoizedState = rt;
    }
  }
  function R0(e, a) {
    if (typeof e != "function")
      throw Error(l(191, e));
    e.call(a);
  }
  function D0(e, a) {
    var s = e.callbacks;
    if (s !== null)
      for (e.callbacks = null, e = 0; e < s.length; e++)
        R0(s[e], a);
  }
  var hs = L(null), lo = L(0);
  function N0(e, a) {
    e = ha, G(lo, e), G(hs, a), ha = e | a.baseLanes;
  }
  function Wu() {
    G(lo, ha), G(hs, hs.current);
  }
  function tf() {
    ha = lo.current, q(hs), q(lo);
  }
  var rn = L(null), Sn = null;
  function La(e) {
    var a = e.alternate;
    G(he, he.current & 1), G(rn, e), Sn === null && (a === null || hs.current !== null || a.memoizedState !== null) && (Sn = e);
  }
  function ef(e) {
    G(he, he.current), G(rn, e), Sn === null && (Sn = e);
  }
  function O0(e) {
    e.tag === 22 ? (G(he, he.current), G(rn, e), Sn === null && (Sn = e)) : $a();
  }
  function $a() {
    G(he, he.current), G(rn, rn.current);
  }
  function on(e) {
    q(rn), Sn === e && (Sn = null), q(he);
  }
  var he = L(0);
  function ro(e) {
    for (var a = e; a !== null; ) {
      if (a.tag === 13) {
        var s = a.memoizedState;
        if (s !== null && (s = s.dehydrated, s === null || od(s) || cd(s)))
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
  var sa = 0, Rt = null, Xt = null, be = null, oo = !1, ms = !1, vi = !1, co = 0, xl = 0, ps = null, Xw = 0;
  function re() {
    throw Error(l(321));
  }
  function nf(e, a) {
    if (a === null) return !1;
    for (var s = 0; s < a.length && s < e.length; s++)
      if (!sn(e[s], a[s])) return !1;
    return !0;
  }
  function af(e, a, s, r, f, m) {
    return sa = m, Rt = a, a.memoizedState = null, a.updateQueue = null, a.lanes = 0, $.H = e === null || e.memoizedState === null ? y1 : bf, vi = !1, m = s(r, f), vi = !1, ms && (m = $0(
      a,
      s,
      r,
      f
    )), L0(e), m;
  }
  function L0(e) {
    $.H = Cl;
    var a = Xt !== null && Xt.next !== null;
    if (sa = 0, be = Xt = Rt = null, oo = !1, xl = 0, ps = null, a) throw Error(l(300));
    e === null || xe || (e = e.dependencies, e !== null && Wr(e) && (xe = !0));
  }
  function $0(e, a, s, r) {
    Rt = e;
    var f = 0;
    do {
      if (ms && (ps = null), xl = 0, ms = !1, 25 <= f) throw Error(l(301));
      if (f += 1, be = Xt = null, e.updateQueue != null) {
        var m = e.updateQueue;
        m.lastEffect = null, m.events = null, m.stores = null, m.memoCache != null && (m.memoCache.index = 0);
      }
      $.H = g1, m = a(s, r);
    } while (ms);
    return m;
  }
  function Kw() {
    var e = $.H, a = e.useState()[0];
    return a = typeof a.then == "function" ? Sl(a) : a, e = e.useState()[0], (Xt !== null ? Xt.memoizedState : null) !== e && (Rt.flags |= 1024), a;
  }
  function sf() {
    var e = co !== 0;
    return co = 0, e;
  }
  function lf(e, a, s) {
    a.updateQueue = e.updateQueue, a.flags &= -2053, e.lanes &= ~s;
  }
  function rf(e) {
    if (oo) {
      for (e = e.memoizedState; e !== null; ) {
        var a = e.queue;
        a !== null && (a.pending = null), e = e.next;
      }
      oo = !1;
    }
    sa = 0, be = Xt = Rt = null, ms = !1, xl = co = 0, ps = null;
  }
  function Ge() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return be === null ? Rt.memoizedState = be = e : be = be.next = e, be;
  }
  function me() {
    if (Xt === null) {
      var e = Rt.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Xt.next;
    var a = be === null ? Rt.memoizedState : be.next;
    if (a !== null)
      be = a, Xt = e;
    else {
      if (e === null)
        throw Rt.alternate === null ? Error(l(467)) : Error(l(310));
      Xt = e, e = {
        memoizedState: Xt.memoizedState,
        baseState: Xt.baseState,
        baseQueue: Xt.baseQueue,
        queue: Xt.queue,
        next: null
      }, be === null ? Rt.memoizedState = be = e : be = be.next = e;
    }
    return be;
  }
  function uo() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Sl(e) {
    var a = xl;
    return xl += 1, ps === null && (ps = []), e = j0(ps, e, a), a = Rt, (be === null ? a.memoizedState : be.next) === null && (a = a.alternate, $.H = a === null || a.memoizedState === null ? y1 : bf), e;
  }
  function fo(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Sl(e);
      if (e.$$typeof === E) return Le(e);
    }
    throw Error(l(438, String(e)));
  }
  function of(e) {
    var a = null, s = Rt.updateQueue;
    if (s !== null && (a = s.memoCache), a == null) {
      var r = Rt.alternate;
      r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (a = {
        data: r.data.map(function(f) {
          return f.slice();
        }),
        index: 0
      })));
    }
    if (a == null && (a = { data: [], index: 0 }), s === null && (s = uo(), Rt.updateQueue = s), s.memoCache = a, s = a.data[a.index], s === void 0)
      for (s = a.data[a.index] = Array(e), r = 0; r < e; r++)
        s[r] = B;
    return a.index++, s;
  }
  function la(e, a) {
    return typeof a == "function" ? a(e) : a;
  }
  function ho(e) {
    var a = me();
    return cf(a, Xt, e);
  }
  function cf(e, a, s) {
    var r = e.queue;
    if (r === null) throw Error(l(311));
    r.lastRenderedReducer = s;
    var f = e.baseQueue, m = r.pending;
    if (m !== null) {
      if (f !== null) {
        var S = f.next;
        f.next = m.next, m.next = S;
      }
      a.baseQueue = f = m, r.pending = null;
    }
    if (m = e.baseState, f === null) e.memoizedState = m;
    else {
      a = f.next;
      var R = S = null, k = null, Z = a, it = !1;
      do {
        var rt = Z.lane & -536870913;
        if (rt !== Z.lane ? (Lt & rt) === rt : (sa & rt) === rt) {
          var Q = Z.revertLane;
          if (Q === 0)
            k !== null && (k = k.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: Z.action,
              hasEagerState: Z.hasEagerState,
              eagerState: Z.eagerState,
              next: null
            }), rt === cs && (it = !0);
          else if ((sa & Q) === Q) {
            Z = Z.next, Q === cs && (it = !0);
            continue;
          } else
            rt = {
              lane: 0,
              revertLane: Z.revertLane,
              gesture: null,
              action: Z.action,
              hasEagerState: Z.hasEagerState,
              eagerState: Z.eagerState,
              next: null
            }, k === null ? (R = k = rt, S = m) : k = k.next = rt, Rt.lanes |= Q, Va |= Q;
          rt = Z.action, vi && s(m, rt), m = Z.hasEagerState ? Z.eagerState : s(m, rt);
        } else
          Q = {
            lane: rt,
            revertLane: Z.revertLane,
            gesture: Z.gesture,
            action: Z.action,
            hasEagerState: Z.hasEagerState,
            eagerState: Z.eagerState,
            next: null
          }, k === null ? (R = k = Q, S = m) : k = k.next = Q, Rt.lanes |= rt, Va |= rt;
        Z = Z.next;
      } while (Z !== null && Z !== a);
      if (k === null ? S = m : k.next = R, !sn(m, e.memoizedState) && (xe = !0, it && (s = us, s !== null)))
        throw s;
      e.memoizedState = m, e.baseState = S, e.baseQueue = k, r.lastRenderedState = m;
    }
    return f === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
  }
  function uf(e) {
    var a = me(), s = a.queue;
    if (s === null) throw Error(l(311));
    s.lastRenderedReducer = e;
    var r = s.dispatch, f = s.pending, m = a.memoizedState;
    if (f !== null) {
      s.pending = null;
      var S = f = f.next;
      do
        m = e(m, S.action), S = S.next;
      while (S !== f);
      sn(m, a.memoizedState) || (xe = !0), a.memoizedState = m, a.baseQueue === null && (a.baseState = m), s.lastRenderedState = m;
    }
    return [m, r];
  }
  function k0(e, a, s) {
    var r = Rt, f = me(), m = kt;
    if (m) {
      if (s === void 0) throw Error(l(407));
      s = s();
    } else s = a();
    var S = !sn(
      (Xt || f).memoizedState,
      s
    );
    if (S && (f.memoizedState = s, xe = !0), f = f.queue, hf(z0.bind(null, r, f, e), [
      e
    ]), f.getSnapshot !== a || S || be !== null && be.memoizedState.tag & 1) {
      if (r.flags |= 2048, ys(
        9,
        { destroy: void 0 },
        V0.bind(
          null,
          r,
          f,
          s,
          a
        ),
        null
      ), Jt === null) throw Error(l(349));
      m || (sa & 127) !== 0 || B0(r, a, s);
    }
    return s;
  }
  function B0(e, a, s) {
    e.flags |= 16384, e = { getSnapshot: a, value: s }, a = Rt.updateQueue, a === null ? (a = uo(), Rt.updateQueue = a, a.stores = [e]) : (s = a.stores, s === null ? a.stores = [e] : s.push(e));
  }
  function V0(e, a, s, r) {
    a.value = s, a.getSnapshot = r, U0(a) && H0(e);
  }
  function z0(e, a, s) {
    return s(function() {
      U0(a) && H0(e);
    });
  }
  function U0(e) {
    var a = e.getSnapshot;
    e = e.value;
    try {
      var s = a();
      return !sn(e, s);
    } catch {
      return !0;
    }
  }
  function H0(e) {
    var a = ci(e, 2);
    a !== null && en(a, e, 2);
  }
  function ff(e) {
    var a = Ge();
    if (typeof e == "function") {
      var s = e;
      if (e = s(), vi) {
        Vn(!0);
        try {
          s();
        } finally {
          Vn(!1);
        }
      }
    }
    return a.memoizedState = a.baseState = e, a.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: la,
      lastRenderedState: e
    }, a;
  }
  function q0(e, a, s, r) {
    return e.baseState = s, cf(
      e,
      Xt,
      typeof r == "function" ? r : la
    );
  }
  function Zw(e, a, s, r, f) {
    if (yo(e)) throw Error(l(485));
    if (e = a.action, e !== null) {
      var m = {
        payload: f,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(S) {
          m.listeners.push(S);
        }
      };
      $.T !== null ? s(!0) : m.isTransition = !1, r(m), s = a.pending, s === null ? (m.next = a.pending = m, Y0(a, m)) : (m.next = s.next, a.pending = s.next = m);
    }
  }
  function Y0(e, a) {
    var s = a.action, r = a.payload, f = e.state;
    if (a.isTransition) {
      var m = $.T, S = {};
      $.T = S;
      try {
        var R = s(f, r), k = $.S;
        k !== null && k(S, R), P0(e, a, R);
      } catch (Z) {
        df(e, a, Z);
      } finally {
        m !== null && S.types !== null && (m.types = S.types), $.T = m;
      }
    } else
      try {
        m = s(f, r), P0(e, a, m);
      } catch (Z) {
        df(e, a, Z);
      }
  }
  function P0(e, a, s) {
    s !== null && typeof s == "object" && typeof s.then == "function" ? s.then(
      function(r) {
        G0(e, a, r);
      },
      function(r) {
        return df(e, a, r);
      }
    ) : G0(e, a, s);
  }
  function G0(e, a, s) {
    a.status = "fulfilled", a.value = s, X0(a), e.state = s, a = e.pending, a !== null && (s = a.next, s === a ? e.pending = null : (s = s.next, a.next = s, Y0(e, s)));
  }
  function df(e, a, s) {
    var r = e.pending;
    if (e.pending = null, r !== null) {
      r = r.next;
      do
        a.status = "rejected", a.reason = s, X0(a), a = a.next;
      while (a !== r);
    }
    e.action = null;
  }
  function X0(e) {
    e = e.listeners;
    for (var a = 0; a < e.length; a++) (0, e[a])();
  }
  function K0(e, a) {
    return a;
  }
  function Z0(e, a) {
    if (kt) {
      var s = Jt.formState;
      if (s !== null) {
        t: {
          var r = Rt;
          if (kt) {
            if (te) {
              e: {
                for (var f = te, m = xn; f.nodeType !== 8; ) {
                  if (!m) {
                    f = null;
                    break e;
                  }
                  if (f = wn(
                    f.nextSibling
                  ), f === null) {
                    f = null;
                    break e;
                  }
                }
                m = f.data, f = m === "F!" || m === "F" ? f : null;
              }
              if (f) {
                te = wn(
                  f.nextSibling
                ), r = f.data === "F!";
                break t;
              }
            }
            _a(r);
          }
          r = !1;
        }
        r && (a = s[0]);
      }
    }
    return s = Ge(), s.memoizedState = s.baseState = a, r = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: K0,
      lastRenderedState: a
    }, s.queue = r, s = h1.bind(
      null,
      Rt,
      r
    ), r.dispatch = s, r = ff(!1), m = vf.bind(
      null,
      Rt,
      !1,
      r.queue
    ), r = Ge(), f = {
      state: a,
      dispatch: null,
      action: e,
      pending: null
    }, r.queue = f, s = Zw.bind(
      null,
      Rt,
      f,
      m,
      s
    ), f.dispatch = s, r.memoizedState = e, [a, s, !1];
  }
  function Q0(e) {
    var a = me();
    return F0(a, Xt, e);
  }
  function F0(e, a, s) {
    if (a = cf(
      e,
      a,
      K0
    )[0], e = ho(la)[0], typeof a == "object" && a !== null && typeof a.then == "function")
      try {
        var r = Sl(a);
      } catch (S) {
        throw S === fs ? no : S;
      }
    else r = a;
    a = me();
    var f = a.queue, m = f.dispatch;
    return s !== a.memoizedState && (Rt.flags |= 2048, ys(
      9,
      { destroy: void 0 },
      Qw.bind(null, f, s),
      null
    )), [r, m, e];
  }
  function Qw(e, a) {
    e.action = a;
  }
  function I0(e) {
    var a = me(), s = Xt;
    if (s !== null)
      return F0(a, s, e);
    me(), a = a.memoizedState, s = me();
    var r = s.queue.dispatch;
    return s.memoizedState = e, [a, r, !1];
  }
  function ys(e, a, s, r) {
    return e = { tag: e, create: s, deps: r, inst: a, next: null }, a = Rt.updateQueue, a === null && (a = uo(), Rt.updateQueue = a), s = a.lastEffect, s === null ? a.lastEffect = e.next = e : (r = s.next, s.next = e, e.next = r, a.lastEffect = e), e;
  }
  function J0() {
    return me().memoizedState;
  }
  function mo(e, a, s, r) {
    var f = Ge();
    Rt.flags |= e, f.memoizedState = ys(
      1 | a,
      { destroy: void 0 },
      s,
      r === void 0 ? null : r
    );
  }
  function po(e, a, s, r) {
    var f = me();
    r = r === void 0 ? null : r;
    var m = f.memoizedState.inst;
    Xt !== null && r !== null && nf(r, Xt.memoizedState.deps) ? f.memoizedState = ys(a, m, s, r) : (Rt.flags |= e, f.memoizedState = ys(
      1 | a,
      m,
      s,
      r
    ));
  }
  function W0(e, a) {
    mo(8390656, 8, e, a);
  }
  function hf(e, a) {
    po(2048, 8, e, a);
  }
  function Fw(e) {
    Rt.flags |= 4;
    var a = Rt.updateQueue;
    if (a === null)
      a = uo(), Rt.updateQueue = a, a.events = [e];
    else {
      var s = a.events;
      s === null ? a.events = [e] : s.push(e);
    }
  }
  function t1(e) {
    var a = me().memoizedState;
    return Fw({ ref: a, nextImpl: e }), function() {
      if ((qt & 2) !== 0) throw Error(l(440));
      return a.impl.apply(void 0, arguments);
    };
  }
  function e1(e, a) {
    return po(4, 2, e, a);
  }
  function n1(e, a) {
    return po(4, 4, e, a);
  }
  function a1(e, a) {
    if (typeof a == "function") {
      e = e();
      var s = a(e);
      return function() {
        typeof s == "function" ? s() : a(null);
      };
    }
    if (a != null)
      return e = e(), a.current = e, function() {
        a.current = null;
      };
  }
  function i1(e, a, s) {
    s = s != null ? s.concat([e]) : null, po(4, 4, a1.bind(null, a, e), s);
  }
  function mf() {
  }
  function s1(e, a) {
    var s = me();
    a = a === void 0 ? null : a;
    var r = s.memoizedState;
    return a !== null && nf(a, r[1]) ? r[0] : (s.memoizedState = [e, a], e);
  }
  function l1(e, a) {
    var s = me();
    a = a === void 0 ? null : a;
    var r = s.memoizedState;
    if (a !== null && nf(a, r[1]))
      return r[0];
    if (r = e(), vi) {
      Vn(!0);
      try {
        e();
      } finally {
        Vn(!1);
      }
    }
    return s.memoizedState = [r, a], r;
  }
  function pf(e, a, s) {
    return s === void 0 || (sa & 1073741824) !== 0 && (Lt & 261930) === 0 ? e.memoizedState = a : (e.memoizedState = s, e = ry(), Rt.lanes |= e, Va |= e, s);
  }
  function r1(e, a, s, r) {
    return sn(s, a) ? s : hs.current !== null ? (e = pf(e, s, r), sn(e, a) || (xe = !0), e) : (sa & 42) === 0 || (sa & 1073741824) !== 0 && (Lt & 261930) === 0 ? (xe = !0, e.memoizedState = s) : (e = ry(), Rt.lanes |= e, Va |= e, a);
  }
  function o1(e, a, s, r, f) {
    var m = X.p;
    X.p = m !== 0 && 8 > m ? m : 8;
    var S = $.T, R = {};
    $.T = R, vf(e, !1, a, s);
    try {
      var k = f(), Z = $.S;
      if (Z !== null && Z(R, k), k !== null && typeof k == "object" && typeof k.then == "function") {
        var it = Gw(
          k,
          r
        );
        wl(
          e,
          a,
          it,
          fn(e)
        );
      } else
        wl(
          e,
          a,
          r,
          fn(e)
        );
    } catch (rt) {
      wl(
        e,
        a,
        { then: function() {
        }, status: "rejected", reason: rt },
        fn()
      );
    } finally {
      X.p = m, S !== null && R.types !== null && (S.types = R.types), $.T = S;
    }
  }
  function Iw() {
  }
  function yf(e, a, s, r) {
    if (e.tag !== 5) throw Error(l(476));
    var f = c1(e).queue;
    o1(
      e,
      f,
      a,
      J,
      s === null ? Iw : function() {
        return u1(e), s(r);
      }
    );
  }
  function c1(e) {
    var a = e.memoizedState;
    if (a !== null) return a;
    a = {
      memoizedState: J,
      baseState: J,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: la,
        lastRenderedState: J
      },
      next: null
    };
    var s = {};
    return a.next = {
      memoizedState: s,
      baseState: s,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: la,
        lastRenderedState: s
      },
      next: null
    }, e.memoizedState = a, e = e.alternate, e !== null && (e.memoizedState = a), a;
  }
  function u1(e) {
    var a = c1(e);
    a.next === null && (a = e.alternate.memoizedState), wl(
      e,
      a.next.queue,
      {},
      fn()
    );
  }
  function gf() {
    return Le(zl);
  }
  function f1() {
    return me().memoizedState;
  }
  function d1() {
    return me().memoizedState;
  }
  function Jw(e) {
    for (var a = e.return; a !== null; ) {
      switch (a.tag) {
        case 24:
        case 3:
          var s = fn();
          e = Na(s);
          var r = Oa(a, e, s);
          r !== null && (en(r, a, s), gl(r, a, s)), a = { cache: Gu() }, e.payload = a;
          return;
      }
      a = a.return;
    }
  }
  function Ww(e, a, s) {
    var r = fn();
    s = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: s,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, yo(e) ? m1(a, s) : (s = Lu(e, a, s, r), s !== null && (en(s, e, r), p1(s, a, r)));
  }
  function h1(e, a, s) {
    var r = fn();
    wl(e, a, s, r);
  }
  function wl(e, a, s, r) {
    var f = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: s,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (yo(e)) m1(a, f);
    else {
      var m = e.alternate;
      if (e.lanes === 0 && (m === null || m.lanes === 0) && (m = a.lastRenderedReducer, m !== null))
        try {
          var S = a.lastRenderedState, R = m(S, s);
          if (f.hasEagerState = !0, f.eagerState = R, sn(R, S))
            return Qr(e, a, f, 0), Jt === null && Zr(), !1;
        } catch {
        } finally {
        }
      if (s = Lu(e, a, f, r), s !== null)
        return en(s, e, r), p1(s, a, r), !0;
    }
    return !1;
  }
  function vf(e, a, s, r) {
    if (r = {
      lane: 2,
      revertLane: Ff(),
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, yo(e)) {
      if (a) throw Error(l(479));
    } else
      a = Lu(
        e,
        s,
        r,
        2
      ), a !== null && en(a, e, 2);
  }
  function yo(e) {
    var a = e.alternate;
    return e === Rt || a !== null && a === Rt;
  }
  function m1(e, a) {
    ms = oo = !0;
    var s = e.pending;
    s === null ? a.next = a : (a.next = s.next, s.next = a), e.pending = a;
  }
  function p1(e, a, s) {
    if ((s & 4194048) !== 0) {
      var r = a.lanes;
      r &= e.pendingLanes, s |= r, a.lanes = s, Me(e, s);
    }
  }
  var Cl = {
    readContext: Le,
    use: fo,
    useCallback: re,
    useContext: re,
    useEffect: re,
    useImperativeHandle: re,
    useLayoutEffect: re,
    useInsertionEffect: re,
    useMemo: re,
    useReducer: re,
    useRef: re,
    useState: re,
    useDebugValue: re,
    useDeferredValue: re,
    useTransition: re,
    useSyncExternalStore: re,
    useId: re,
    useHostTransitionStatus: re,
    useFormState: re,
    useActionState: re,
    useOptimistic: re,
    useMemoCache: re,
    useCacheRefresh: re
  };
  Cl.useEffectEvent = re;
  var y1 = {
    readContext: Le,
    use: fo,
    useCallback: function(e, a) {
      return Ge().memoizedState = [
        e,
        a === void 0 ? null : a
      ], e;
    },
    useContext: Le,
    useEffect: W0,
    useImperativeHandle: function(e, a, s) {
      s = s != null ? s.concat([e]) : null, mo(
        4194308,
        4,
        a1.bind(null, a, e),
        s
      );
    },
    useLayoutEffect: function(e, a) {
      return mo(4194308, 4, e, a);
    },
    useInsertionEffect: function(e, a) {
      mo(4, 2, e, a);
    },
    useMemo: function(e, a) {
      var s = Ge();
      a = a === void 0 ? null : a;
      var r = e();
      if (vi) {
        Vn(!0);
        try {
          e();
        } finally {
          Vn(!1);
        }
      }
      return s.memoizedState = [r, a], r;
    },
    useReducer: function(e, a, s) {
      var r = Ge();
      if (s !== void 0) {
        var f = s(a);
        if (vi) {
          Vn(!0);
          try {
            s(a);
          } finally {
            Vn(!1);
          }
        }
      } else f = a;
      return r.memoizedState = r.baseState = f, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: f
      }, r.queue = e, e = e.dispatch = Ww.bind(
        null,
        Rt,
        e
      ), [r.memoizedState, e];
    },
    useRef: function(e) {
      var a = Ge();
      return e = { current: e }, a.memoizedState = e;
    },
    useState: function(e) {
      e = ff(e);
      var a = e.queue, s = h1.bind(null, Rt, a);
      return a.dispatch = s, [e.memoizedState, s];
    },
    useDebugValue: mf,
    useDeferredValue: function(e, a) {
      var s = Ge();
      return pf(s, e, a);
    },
    useTransition: function() {
      var e = ff(!1);
      return e = o1.bind(
        null,
        Rt,
        e.queue,
        !0,
        !1
      ), Ge().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, a, s) {
      var r = Rt, f = Ge();
      if (kt) {
        if (s === void 0)
          throw Error(l(407));
        s = s();
      } else {
        if (s = a(), Jt === null)
          throw Error(l(349));
        (Lt & 127) !== 0 || B0(r, a, s);
      }
      f.memoizedState = s;
      var m = { value: s, getSnapshot: a };
      return f.queue = m, W0(z0.bind(null, r, m, e), [
        e
      ]), r.flags |= 2048, ys(
        9,
        { destroy: void 0 },
        V0.bind(
          null,
          r,
          m,
          s,
          a
        ),
        null
      ), s;
    },
    useId: function() {
      var e = Ge(), a = Jt.identifierPrefix;
      if (kt) {
        var s = Hn, r = Un;
        s = (r & ~(1 << 32 - Ue(r) - 1)).toString(32) + s, a = "_" + a + "R_" + s, s = co++, 0 < s && (a += "H" + s.toString(32)), a += "_";
      } else
        s = Xw++, a = "_" + a + "r_" + s.toString(32) + "_";
      return e.memoizedState = a;
    },
    useHostTransitionStatus: gf,
    useFormState: Z0,
    useActionState: Z0,
    useOptimistic: function(e) {
      var a = Ge();
      a.memoizedState = a.baseState = e;
      var s = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return a.queue = s, a = vf.bind(
        null,
        Rt,
        !0,
        s
      ), s.dispatch = a, [e, a];
    },
    useMemoCache: of,
    useCacheRefresh: function() {
      return Ge().memoizedState = Jw.bind(
        null,
        Rt
      );
    },
    useEffectEvent: function(e) {
      var a = Ge(), s = { impl: e };
      return a.memoizedState = s, function() {
        if ((qt & 2) !== 0)
          throw Error(l(440));
        return s.impl.apply(void 0, arguments);
      };
    }
  }, bf = {
    readContext: Le,
    use: fo,
    useCallback: s1,
    useContext: Le,
    useEffect: hf,
    useImperativeHandle: i1,
    useInsertionEffect: e1,
    useLayoutEffect: n1,
    useMemo: l1,
    useReducer: ho,
    useRef: J0,
    useState: function() {
      return ho(la);
    },
    useDebugValue: mf,
    useDeferredValue: function(e, a) {
      var s = me();
      return r1(
        s,
        Xt.memoizedState,
        e,
        a
      );
    },
    useTransition: function() {
      var e = ho(la)[0], a = me().memoizedState;
      return [
        typeof e == "boolean" ? e : Sl(e),
        a
      ];
    },
    useSyncExternalStore: k0,
    useId: f1,
    useHostTransitionStatus: gf,
    useFormState: Q0,
    useActionState: Q0,
    useOptimistic: function(e, a) {
      var s = me();
      return q0(s, Xt, e, a);
    },
    useMemoCache: of,
    useCacheRefresh: d1
  };
  bf.useEffectEvent = t1;
  var g1 = {
    readContext: Le,
    use: fo,
    useCallback: s1,
    useContext: Le,
    useEffect: hf,
    useImperativeHandle: i1,
    useInsertionEffect: e1,
    useLayoutEffect: n1,
    useMemo: l1,
    useReducer: uf,
    useRef: J0,
    useState: function() {
      return uf(la);
    },
    useDebugValue: mf,
    useDeferredValue: function(e, a) {
      var s = me();
      return Xt === null ? pf(s, e, a) : r1(
        s,
        Xt.memoizedState,
        e,
        a
      );
    },
    useTransition: function() {
      var e = uf(la)[0], a = me().memoizedState;
      return [
        typeof e == "boolean" ? e : Sl(e),
        a
      ];
    },
    useSyncExternalStore: k0,
    useId: f1,
    useHostTransitionStatus: gf,
    useFormState: I0,
    useActionState: I0,
    useOptimistic: function(e, a) {
      var s = me();
      return Xt !== null ? q0(s, Xt, e, a) : (s.baseState = e, [e, s.queue.dispatch]);
    },
    useMemoCache: of,
    useCacheRefresh: d1
  };
  g1.useEffectEvent = t1;
  function xf(e, a, s, r) {
    a = e.memoizedState, s = s(r, a), s = s == null ? a : v({}, a, s), e.memoizedState = s, e.lanes === 0 && (e.updateQueue.baseState = s);
  }
  var Sf = {
    enqueueSetState: function(e, a, s) {
      e = e._reactInternals;
      var r = fn(), f = Na(r);
      f.payload = a, s != null && (f.callback = s), a = Oa(e, f, r), a !== null && (en(a, e, r), gl(a, e, r));
    },
    enqueueReplaceState: function(e, a, s) {
      e = e._reactInternals;
      var r = fn(), f = Na(r);
      f.tag = 1, f.payload = a, s != null && (f.callback = s), a = Oa(e, f, r), a !== null && (en(a, e, r), gl(a, e, r));
    },
    enqueueForceUpdate: function(e, a) {
      e = e._reactInternals;
      var s = fn(), r = Na(s);
      r.tag = 2, a != null && (r.callback = a), a = Oa(e, r, s), a !== null && (en(a, e, s), gl(a, e, s));
    }
  };
  function v1(e, a, s, r, f, m, S) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, m, S) : a.prototype && a.prototype.isPureReactComponent ? !cl(s, r) || !cl(f, m) : !0;
  }
  function b1(e, a, s, r) {
    e = a.state, typeof a.componentWillReceiveProps == "function" && a.componentWillReceiveProps(s, r), typeof a.UNSAFE_componentWillReceiveProps == "function" && a.UNSAFE_componentWillReceiveProps(s, r), a.state !== e && Sf.enqueueReplaceState(a, a.state, null);
  }
  function bi(e, a) {
    var s = a;
    if ("ref" in a) {
      s = {};
      for (var r in a)
        r !== "ref" && (s[r] = a[r]);
    }
    if (e = e.defaultProps) {
      s === a && (s = v({}, s));
      for (var f in e)
        s[f] === void 0 && (s[f] = e[f]);
    }
    return s;
  }
  function x1(e) {
    Kr(e);
  }
  function S1(e) {
    console.error(e);
  }
  function w1(e) {
    Kr(e);
  }
  function go(e, a) {
    try {
      var s = e.onUncaughtError;
      s(a.value, { componentStack: a.stack });
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  function C1(e, a, s) {
    try {
      var r = e.onCaughtError;
      r(s.value, {
        componentStack: s.stack,
        errorBoundary: a.tag === 1 ? a.stateNode : null
      });
    } catch (f) {
      setTimeout(function() {
        throw f;
      });
    }
  }
  function wf(e, a, s) {
    return s = Na(s), s.tag = 3, s.payload = { element: null }, s.callback = function() {
      go(e, a);
    }, s;
  }
  function T1(e) {
    return e = Na(e), e.tag = 3, e;
  }
  function j1(e, a, s, r) {
    var f = s.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var m = r.value;
      e.payload = function() {
        return f(m);
      }, e.callback = function() {
        C1(a, s, r);
      };
    }
    var S = s.stateNode;
    S !== null && typeof S.componentDidCatch == "function" && (e.callback = function() {
      C1(a, s, r), typeof f != "function" && (za === null ? za = /* @__PURE__ */ new Set([this]) : za.add(this));
      var R = r.stack;
      this.componentDidCatch(r.value, {
        componentStack: R !== null ? R : ""
      });
    });
  }
  function t4(e, a, s, r, f) {
    if (s.flags |= 32768, r !== null && typeof r == "object" && typeof r.then == "function") {
      if (a = s.alternate, a !== null && os(
        a,
        s,
        f,
        !0
      ), s = rn.current, s !== null) {
        switch (s.tag) {
          case 31:
          case 13:
            return Sn === null ? _o() : s.alternate === null && oe === 0 && (oe = 3), s.flags &= -257, s.flags |= 65536, s.lanes = f, r === ao ? s.flags |= 16384 : (a = s.updateQueue, a === null ? s.updateQueue = /* @__PURE__ */ new Set([r]) : a.add(r), Kf(e, r, f)), !1;
          case 22:
            return s.flags |= 65536, r === ao ? s.flags |= 16384 : (a = s.updateQueue, a === null ? (a = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([r])
            }, s.updateQueue = a) : (s = a.retryQueue, s === null ? a.retryQueue = /* @__PURE__ */ new Set([r]) : s.add(r)), Kf(e, r, f)), !1;
        }
        throw Error(l(435, s.tag));
      }
      return Kf(e, r, f), _o(), !1;
    }
    if (kt)
      return a = rn.current, a !== null ? ((a.flags & 65536) === 0 && (a.flags |= 256), a.flags |= 65536, a.lanes = f, r !== Uu && (e = Error(l(422), { cause: r }), dl(gn(e, s)))) : (r !== Uu && (a = Error(l(423), {
        cause: r
      }), dl(
        gn(a, s)
      )), e = e.current.alternate, e.flags |= 65536, f &= -f, e.lanes |= f, r = gn(r, s), f = wf(
        e.stateNode,
        r,
        f
      ), Iu(e, f), oe !== 4 && (oe = 2)), !1;
    var m = Error(l(520), { cause: r });
    if (m = gn(m, s), Dl === null ? Dl = [m] : Dl.push(m), oe !== 4 && (oe = 2), a === null) return !0;
    r = gn(r, s), s = a;
    do {
      switch (s.tag) {
        case 3:
          return s.flags |= 65536, e = f & -f, s.lanes |= e, e = wf(s.stateNode, r, e), Iu(s, e), !1;
        case 1:
          if (a = s.type, m = s.stateNode, (s.flags & 128) === 0 && (typeof a.getDerivedStateFromError == "function" || m !== null && typeof m.componentDidCatch == "function" && (za === null || !za.has(m))))
            return s.flags |= 65536, f &= -f, s.lanes |= f, f = T1(f), j1(
              f,
              e,
              s,
              r
            ), Iu(s, f), !1;
      }
      s = s.return;
    } while (s !== null);
    return !1;
  }
  var Cf = Error(l(461)), xe = !1;
  function $e(e, a, s, r) {
    a.child = e === null ? _0(a, null, s, r) : gi(
      a,
      e.child,
      s,
      r
    );
  }
  function A1(e, a, s, r, f) {
    s = s.render;
    var m = a.ref;
    if ("ref" in r) {
      var S = {};
      for (var R in r)
        R !== "ref" && (S[R] = r[R]);
    } else S = r;
    return hi(a), r = af(
      e,
      a,
      s,
      S,
      m,
      f
    ), R = sf(), e !== null && !xe ? (lf(e, a, f), ra(e, a, f)) : (kt && R && Vu(a), a.flags |= 1, $e(e, a, r, f), a.child);
  }
  function E1(e, a, s, r, f) {
    if (e === null) {
      var m = s.type;
      return typeof m == "function" && !$u(m) && m.defaultProps === void 0 && s.compare === null ? (a.tag = 15, a.type = m, M1(
        e,
        a,
        m,
        r,
        f
      )) : (e = Ir(
        s.type,
        null,
        r,
        a,
        a.mode,
        f
      ), e.ref = a.ref, e.return = a, a.child = e);
    }
    if (m = e.child, !Df(e, f)) {
      var S = m.memoizedProps;
      if (s = s.compare, s = s !== null ? s : cl, s(S, r) && e.ref === a.ref)
        return ra(e, a, f);
    }
    return a.flags |= 1, e = ea(m, r), e.ref = a.ref, e.return = a, a.child = e;
  }
  function M1(e, a, s, r, f) {
    if (e !== null) {
      var m = e.memoizedProps;
      if (cl(m, r) && e.ref === a.ref)
        if (xe = !1, a.pendingProps = r = m, Df(e, f))
          (e.flags & 131072) !== 0 && (xe = !0);
        else
          return a.lanes = e.lanes, ra(e, a, f);
    }
    return Tf(
      e,
      a,
      s,
      r,
      f
    );
  }
  function _1(e, a, s, r) {
    var f = r.children, m = e !== null ? e.memoizedState : null;
    if (e === null && a.stateNode === null && (a.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), r.mode === "hidden") {
      if ((a.flags & 128) !== 0) {
        if (m = m !== null ? m.baseLanes | s : s, e !== null) {
          for (r = a.child = e.child, f = 0; r !== null; )
            f = f | r.lanes | r.childLanes, r = r.sibling;
          r = f & ~m;
        } else r = 0, a.child = null;
        return R1(
          e,
          a,
          m,
          s,
          r
        );
      }
      if ((s & 536870912) !== 0)
        a.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && eo(
          a,
          m !== null ? m.cachePool : null
        ), m !== null ? N0(a, m) : Wu(), O0(a);
      else
        return r = a.lanes = 536870912, R1(
          e,
          a,
          m !== null ? m.baseLanes | s : s,
          s,
          r
        );
    } else
      m !== null ? (eo(a, m.cachePool), N0(a, m), $a(), a.memoizedState = null) : (e !== null && eo(a, null), Wu(), $a());
    return $e(e, a, f, s), a.child;
  }
  function Tl(e, a) {
    return e !== null && e.tag === 22 || a.stateNode !== null || (a.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.sibling;
  }
  function R1(e, a, s, r, f) {
    var m = Ku();
    return m = m === null ? null : { parent: ve._currentValue, pool: m }, a.memoizedState = {
      baseLanes: s,
      cachePool: m
    }, e !== null && eo(a, null), Wu(), O0(a), e !== null && os(e, a, r, !0), a.childLanes = f, null;
  }
  function vo(e, a) {
    return a = xo(
      { mode: a.mode, children: a.children },
      e.mode
    ), a.ref = e.ref, e.child = a, a.return = e, a;
  }
  function D1(e, a, s) {
    return gi(a, e.child, null, s), e = vo(a, a.pendingProps), e.flags |= 2, on(a), a.memoizedState = null, e;
  }
  function e4(e, a, s) {
    var r = a.pendingProps, f = (a.flags & 128) !== 0;
    if (a.flags &= -129, e === null) {
      if (kt) {
        if (r.mode === "hidden")
          return e = vo(a, r), a.lanes = 536870912, Tl(null, e);
        if (ef(a), (e = te) ? (e = Yy(
          e,
          xn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (a.memoizedState = {
          dehydrated: e,
          treeContext: Ea !== null ? { id: Un, overflow: Hn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, s = m0(e), s.return = a, a.child = s, Oe = a, te = null)) : e = null, e === null) throw _a(a);
        return a.lanes = 536870912, null;
      }
      return vo(a, r);
    }
    var m = e.memoizedState;
    if (m !== null) {
      var S = m.dehydrated;
      if (ef(a), f)
        if (a.flags & 256)
          a.flags &= -257, a = D1(
            e,
            a,
            s
          );
        else if (a.memoizedState !== null)
          a.child = e.child, a.flags |= 128, a = null;
        else throw Error(l(558));
      else if (xe || os(e, a, s, !1), f = (s & e.childLanes) !== 0, xe || f) {
        if (r = Jt, r !== null && (S = zn(r, s), S !== 0 && S !== m.retryLane))
          throw m.retryLane = S, ci(e, S), en(r, e, S), Cf;
        _o(), a = D1(
          e,
          a,
          s
        );
      } else
        e = m.treeContext, te = wn(S.nextSibling), Oe = a, kt = !0, Ma = null, xn = !1, e !== null && g0(a, e), a = vo(a, r), a.flags |= 4096;
      return a;
    }
    return e = ea(e.child, {
      mode: r.mode,
      children: r.children
    }), e.ref = a.ref, a.child = e, e.return = a, e;
  }
  function bo(e, a) {
    var s = a.ref;
    if (s === null)
      e !== null && e.ref !== null && (a.flags |= 4194816);
    else {
      if (typeof s != "function" && typeof s != "object")
        throw Error(l(284));
      (e === null || e.ref !== s) && (a.flags |= 4194816);
    }
  }
  function Tf(e, a, s, r, f) {
    return hi(a), s = af(
      e,
      a,
      s,
      r,
      void 0,
      f
    ), r = sf(), e !== null && !xe ? (lf(e, a, f), ra(e, a, f)) : (kt && r && Vu(a), a.flags |= 1, $e(e, a, s, f), a.child);
  }
  function N1(e, a, s, r, f, m) {
    return hi(a), a.updateQueue = null, s = $0(
      a,
      r,
      s,
      f
    ), L0(e), r = sf(), e !== null && !xe ? (lf(e, a, m), ra(e, a, m)) : (kt && r && Vu(a), a.flags |= 1, $e(e, a, s, m), a.child);
  }
  function O1(e, a, s, r, f) {
    if (hi(a), a.stateNode === null) {
      var m = is, S = s.contextType;
      typeof S == "object" && S !== null && (m = Le(S)), m = new s(r, m), a.memoizedState = m.state !== null && m.state !== void 0 ? m.state : null, m.updater = Sf, a.stateNode = m, m._reactInternals = a, m = a.stateNode, m.props = r, m.state = a.memoizedState, m.refs = {}, Qu(a), S = s.contextType, m.context = typeof S == "object" && S !== null ? Le(S) : is, m.state = a.memoizedState, S = s.getDerivedStateFromProps, typeof S == "function" && (xf(
        a,
        s,
        S,
        r
      ), m.state = a.memoizedState), typeof s.getDerivedStateFromProps == "function" || typeof m.getSnapshotBeforeUpdate == "function" || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (S = m.state, typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount(), S !== m.state && Sf.enqueueReplaceState(m, m.state, null), bl(a, r, m, f), vl(), m.state = a.memoizedState), typeof m.componentDidMount == "function" && (a.flags |= 4194308), r = !0;
    } else if (e === null) {
      m = a.stateNode;
      var R = a.memoizedProps, k = bi(s, R);
      m.props = k;
      var Z = m.context, it = s.contextType;
      S = is, typeof it == "object" && it !== null && (S = Le(it));
      var rt = s.getDerivedStateFromProps;
      it = typeof rt == "function" || typeof m.getSnapshotBeforeUpdate == "function", R = a.pendingProps !== R, it || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (R || Z !== S) && b1(
        a,
        m,
        r,
        S
      ), Da = !1;
      var Q = a.memoizedState;
      m.state = Q, bl(a, r, m, f), vl(), Z = a.memoizedState, R || Q !== Z || Da ? (typeof rt == "function" && (xf(
        a,
        s,
        rt,
        r
      ), Z = a.memoizedState), (k = Da || v1(
        a,
        s,
        k,
        r,
        Q,
        Z,
        S
      )) ? (it || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (a.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (a.flags |= 4194308), a.memoizedProps = r, a.memoizedState = Z), m.props = r, m.state = Z, m.context = S, r = k) : (typeof m.componentDidMount == "function" && (a.flags |= 4194308), r = !1);
    } else {
      m = a.stateNode, Fu(e, a), S = a.memoizedProps, it = bi(s, S), m.props = it, rt = a.pendingProps, Q = m.context, Z = s.contextType, k = is, typeof Z == "object" && Z !== null && (k = Le(Z)), R = s.getDerivedStateFromProps, (Z = typeof R == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (S !== rt || Q !== k) && b1(
        a,
        m,
        r,
        k
      ), Da = !1, Q = a.memoizedState, m.state = Q, bl(a, r, m, f), vl();
      var W = a.memoizedState;
      S !== rt || Q !== W || Da || e !== null && e.dependencies !== null && Wr(e.dependencies) ? (typeof R == "function" && (xf(
        a,
        s,
        R,
        r
      ), W = a.memoizedState), (it = Da || v1(
        a,
        s,
        it,
        r,
        Q,
        W,
        k
      ) || e !== null && e.dependencies !== null && Wr(e.dependencies)) ? (Z || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(r, W, k), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(
        r,
        W,
        k
      )), typeof m.componentDidUpdate == "function" && (a.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (a.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || S === e.memoizedProps && Q === e.memoizedState || (a.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || S === e.memoizedProps && Q === e.memoizedState || (a.flags |= 1024), a.memoizedProps = r, a.memoizedState = W), m.props = r, m.state = W, m.context = k, r = it) : (typeof m.componentDidUpdate != "function" || S === e.memoizedProps && Q === e.memoizedState || (a.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || S === e.memoizedProps && Q === e.memoizedState || (a.flags |= 1024), r = !1);
    }
    return m = r, bo(e, a), r = (a.flags & 128) !== 0, m || r ? (m = a.stateNode, s = r && typeof s.getDerivedStateFromError != "function" ? null : m.render(), a.flags |= 1, e !== null && r ? (a.child = gi(
      a,
      e.child,
      null,
      f
    ), a.child = gi(
      a,
      null,
      s,
      f
    )) : $e(e, a, s, f), a.memoizedState = m.state, e = a.child) : e = ra(
      e,
      a,
      f
    ), e;
  }
  function L1(e, a, s, r) {
    return fi(), a.flags |= 256, $e(e, a, s, r), a.child;
  }
  var jf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Af(e) {
    return { baseLanes: e, cachePool: C0() };
  }
  function Ef(e, a, s) {
    return e = e !== null ? e.childLanes & ~s : 0, a && (e |= un), e;
  }
  function $1(e, a, s) {
    var r = a.pendingProps, f = !1, m = (a.flags & 128) !== 0, S;
    if ((S = m) || (S = e !== null && e.memoizedState === null ? !1 : (he.current & 2) !== 0), S && (f = !0, a.flags &= -129), S = (a.flags & 32) !== 0, a.flags &= -33, e === null) {
      if (kt) {
        if (f ? La(a) : $a(), (e = te) ? (e = Yy(
          e,
          xn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (a.memoizedState = {
          dehydrated: e,
          treeContext: Ea !== null ? { id: Un, overflow: Hn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, s = m0(e), s.return = a, a.child = s, Oe = a, te = null)) : e = null, e === null) throw _a(a);
        return cd(e) ? a.lanes = 32 : a.lanes = 536870912, null;
      }
      var R = r.children;
      return r = r.fallback, f ? ($a(), f = a.mode, R = xo(
        { mode: "hidden", children: R },
        f
      ), r = ui(
        r,
        f,
        s,
        null
      ), R.return = a, r.return = a, R.sibling = r, a.child = R, r = a.child, r.memoizedState = Af(s), r.childLanes = Ef(
        e,
        S,
        s
      ), a.memoizedState = jf, Tl(null, r)) : (La(a), Mf(a, R));
    }
    var k = e.memoizedState;
    if (k !== null && (R = k.dehydrated, R !== null)) {
      if (m)
        a.flags & 256 ? (La(a), a.flags &= -257, a = _f(
          e,
          a,
          s
        )) : a.memoizedState !== null ? ($a(), a.child = e.child, a.flags |= 128, a = null) : ($a(), R = r.fallback, f = a.mode, r = xo(
          { mode: "visible", children: r.children },
          f
        ), R = ui(
          R,
          f,
          s,
          null
        ), R.flags |= 2, r.return = a, R.return = a, r.sibling = R, a.child = r, gi(
          a,
          e.child,
          null,
          s
        ), r = a.child, r.memoizedState = Af(s), r.childLanes = Ef(
          e,
          S,
          s
        ), a.memoizedState = jf, a = Tl(null, r));
      else if (La(a), cd(R)) {
        if (S = R.nextSibling && R.nextSibling.dataset, S) var Z = S.dgst;
        S = Z, r = Error(l(419)), r.stack = "", r.digest = S, dl({ value: r, source: null, stack: null }), a = _f(
          e,
          a,
          s
        );
      } else if (xe || os(e, a, s, !1), S = (s & e.childLanes) !== 0, xe || S) {
        if (S = Jt, S !== null && (r = zn(S, s), r !== 0 && r !== k.retryLane))
          throw k.retryLane = r, ci(e, r), en(S, e, r), Cf;
        od(R) || _o(), a = _f(
          e,
          a,
          s
        );
      } else
        od(R) ? (a.flags |= 192, a.child = e.child, a = null) : (e = k.treeContext, te = wn(
          R.nextSibling
        ), Oe = a, kt = !0, Ma = null, xn = !1, e !== null && g0(a, e), a = Mf(
          a,
          r.children
        ), a.flags |= 4096);
      return a;
    }
    return f ? ($a(), R = r.fallback, f = a.mode, k = e.child, Z = k.sibling, r = ea(k, {
      mode: "hidden",
      children: r.children
    }), r.subtreeFlags = k.subtreeFlags & 65011712, Z !== null ? R = ea(
      Z,
      R
    ) : (R = ui(
      R,
      f,
      s,
      null
    ), R.flags |= 2), R.return = a, r.return = a, r.sibling = R, a.child = r, Tl(null, r), r = a.child, R = e.child.memoizedState, R === null ? R = Af(s) : (f = R.cachePool, f !== null ? (k = ve._currentValue, f = f.parent !== k ? { parent: k, pool: k } : f) : f = C0(), R = {
      baseLanes: R.baseLanes | s,
      cachePool: f
    }), r.memoizedState = R, r.childLanes = Ef(
      e,
      S,
      s
    ), a.memoizedState = jf, Tl(e.child, r)) : (La(a), s = e.child, e = s.sibling, s = ea(s, {
      mode: "visible",
      children: r.children
    }), s.return = a, s.sibling = null, e !== null && (S = a.deletions, S === null ? (a.deletions = [e], a.flags |= 16) : S.push(e)), a.child = s, a.memoizedState = null, s);
  }
  function Mf(e, a) {
    return a = xo(
      { mode: "visible", children: a },
      e.mode
    ), a.return = e, e.child = a;
  }
  function xo(e, a) {
    return e = ln(22, e, null, a), e.lanes = 0, e;
  }
  function _f(e, a, s) {
    return gi(a, e.child, null, s), e = Mf(
      a,
      a.pendingProps.children
    ), e.flags |= 2, a.memoizedState = null, e;
  }
  function k1(e, a, s) {
    e.lanes |= a;
    var r = e.alternate;
    r !== null && (r.lanes |= a), Yu(e.return, a, s);
  }
  function Rf(e, a, s, r, f, m) {
    var S = e.memoizedState;
    S === null ? e.memoizedState = {
      isBackwards: a,
      rendering: null,
      renderingStartTime: 0,
      last: r,
      tail: s,
      tailMode: f,
      treeForkCount: m
    } : (S.isBackwards = a, S.rendering = null, S.renderingStartTime = 0, S.last = r, S.tail = s, S.tailMode = f, S.treeForkCount = m);
  }
  function B1(e, a, s) {
    var r = a.pendingProps, f = r.revealOrder, m = r.tail;
    r = r.children;
    var S = he.current, R = (S & 2) !== 0;
    if (R ? (S = S & 1 | 2, a.flags |= 128) : S &= 1, G(he, S), $e(e, a, r, s), r = kt ? fl : 0, !R && e !== null && (e.flags & 128) !== 0)
      t: for (e = a.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && k1(e, s, a);
        else if (e.tag === 19)
          k1(e, s, a);
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
        for (s = a.child, f = null; s !== null; )
          e = s.alternate, e !== null && ro(e) === null && (f = s), s = s.sibling;
        s = f, s === null ? (f = a.child, a.child = null) : (f = s.sibling, s.sibling = null), Rf(
          a,
          !1,
          f,
          s,
          m,
          r
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (s = null, f = a.child, a.child = null; f !== null; ) {
          if (e = f.alternate, e !== null && ro(e) === null) {
            a.child = f;
            break;
          }
          e = f.sibling, f.sibling = s, s = f, f = e;
        }
        Rf(
          a,
          !0,
          s,
          null,
          m,
          r
        );
        break;
      case "together":
        Rf(
          a,
          !1,
          null,
          null,
          void 0,
          r
        );
        break;
      default:
        a.memoizedState = null;
    }
    return a.child;
  }
  function ra(e, a, s) {
    if (e !== null && (a.dependencies = e.dependencies), Va |= a.lanes, (s & a.childLanes) === 0)
      if (e !== null) {
        if (os(
          e,
          a,
          s,
          !1
        ), (s & a.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && a.child !== e.child)
      throw Error(l(153));
    if (a.child !== null) {
      for (e = a.child, s = ea(e, e.pendingProps), a.child = s, s.return = a; e.sibling !== null; )
        e = e.sibling, s = s.sibling = ea(e, e.pendingProps), s.return = a;
      s.sibling = null;
    }
    return a.child;
  }
  function Df(e, a) {
    return (e.lanes & a) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Wr(e)));
  }
  function n4(e, a, s) {
    switch (a.tag) {
      case 3:
        nt(a, a.stateNode.containerInfo), Ra(a, ve, e.memoizedState.cache), fi();
        break;
      case 27:
      case 5:
        ft(a);
        break;
      case 4:
        nt(a, a.stateNode.containerInfo);
        break;
      case 10:
        Ra(
          a,
          a.type,
          a.memoizedProps.value
        );
        break;
      case 31:
        if (a.memoizedState !== null)
          return a.flags |= 128, ef(a), null;
        break;
      case 13:
        var r = a.memoizedState;
        if (r !== null)
          return r.dehydrated !== null ? (La(a), a.flags |= 128, null) : (s & a.child.childLanes) !== 0 ? $1(e, a, s) : (La(a), e = ra(
            e,
            a,
            s
          ), e !== null ? e.sibling : null);
        La(a);
        break;
      case 19:
        var f = (e.flags & 128) !== 0;
        if (r = (s & a.childLanes) !== 0, r || (os(
          e,
          a,
          s,
          !1
        ), r = (s & a.childLanes) !== 0), f) {
          if (r)
            return B1(
              e,
              a,
              s
            );
          a.flags |= 128;
        }
        if (f = a.memoizedState, f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), G(he, he.current), r) break;
        return null;
      case 22:
        return a.lanes = 0, _1(
          e,
          a,
          s,
          a.pendingProps
        );
      case 24:
        Ra(a, ve, e.memoizedState.cache);
    }
    return ra(e, a, s);
  }
  function V1(e, a, s) {
    if (e !== null)
      if (e.memoizedProps !== a.pendingProps)
        xe = !0;
      else {
        if (!Df(e, s) && (a.flags & 128) === 0)
          return xe = !1, n4(
            e,
            a,
            s
          );
        xe = (e.flags & 131072) !== 0;
      }
    else
      xe = !1, kt && (a.flags & 1048576) !== 0 && y0(a, fl, a.index);
    switch (a.lanes = 0, a.tag) {
      case 16:
        t: {
          var r = a.pendingProps;
          if (e = pi(a.elementType), a.type = e, typeof e == "function")
            $u(e) ? (r = bi(e, r), a.tag = 1, a = O1(
              null,
              a,
              e,
              r,
              s
            )) : (a.tag = 0, a = Tf(
              null,
              a,
              e,
              r,
              s
            ));
          else {
            if (e != null) {
              var f = e.$$typeof;
              if (f === M) {
                a.tag = 11, a = A1(
                  null,
                  a,
                  e,
                  r,
                  s
                );
                break t;
              } else if (f === N) {
                a.tag = 14, a = E1(
                  null,
                  a,
                  e,
                  r,
                  s
                );
                break t;
              }
            }
            throw a = st(e) || e, Error(l(306, a, ""));
          }
        }
        return a;
      case 0:
        return Tf(
          e,
          a,
          a.type,
          a.pendingProps,
          s
        );
      case 1:
        return r = a.type, f = bi(
          r,
          a.pendingProps
        ), O1(
          e,
          a,
          r,
          f,
          s
        );
      case 3:
        t: {
          if (nt(
            a,
            a.stateNode.containerInfo
          ), e === null) throw Error(l(387));
          r = a.pendingProps;
          var m = a.memoizedState;
          f = m.element, Fu(e, a), bl(a, r, null, s);
          var S = a.memoizedState;
          if (r = S.cache, Ra(a, ve, r), r !== m.cache && Pu(
            a,
            [ve],
            s,
            !0
          ), vl(), r = S.element, m.isDehydrated)
            if (m = {
              element: r,
              isDehydrated: !1,
              cache: S.cache
            }, a.updateQueue.baseState = m, a.memoizedState = m, a.flags & 256) {
              a = L1(
                e,
                a,
                r,
                s
              );
              break t;
            } else if (r !== f) {
              f = gn(
                Error(l(424)),
                a
              ), dl(f), a = L1(
                e,
                a,
                r,
                s
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
              for (te = wn(e.firstChild), Oe = a, kt = !0, Ma = null, xn = !0, s = _0(
                a,
                null,
                r,
                s
              ), a.child = s; s; )
                s.flags = s.flags & -3 | 4096, s = s.sibling;
            }
          else {
            if (fi(), r === f) {
              a = ra(
                e,
                a,
                s
              );
              break t;
            }
            $e(e, a, r, s);
          }
          a = a.child;
        }
        return a;
      case 26:
        return bo(e, a), e === null ? (s = Qy(
          a.type,
          null,
          a.pendingProps,
          null
        )) ? a.memoizedState = s : kt || (s = a.type, e = a.pendingProps, r = ko(
          ct.current
        ).createElement(s), r[Wt] = a, r[Ne] = e, ke(r, s, e), Re(r), a.stateNode = r) : a.memoizedState = Qy(
          a.type,
          e.memoizedProps,
          a.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return ft(a), e === null && kt && (r = a.stateNode = Xy(
          a.type,
          a.pendingProps,
          ct.current
        ), Oe = a, xn = !0, f = te, Ya(a.type) ? (ud = f, te = wn(r.firstChild)) : te = f), $e(
          e,
          a,
          a.pendingProps.children,
          s
        ), bo(e, a), e === null && (a.flags |= 4194304), a.child;
      case 5:
        return e === null && kt && ((f = r = te) && (r = N4(
          r,
          a.type,
          a.pendingProps,
          xn
        ), r !== null ? (a.stateNode = r, Oe = a, te = wn(r.firstChild), xn = !1, f = !0) : f = !1), f || _a(a)), ft(a), f = a.type, m = a.pendingProps, S = e !== null ? e.memoizedProps : null, r = m.children, sd(f, m) ? r = null : S !== null && sd(f, S) && (a.flags |= 32), a.memoizedState !== null && (f = af(
          e,
          a,
          Kw,
          null,
          null,
          s
        ), zl._currentValue = f), bo(e, a), $e(e, a, r, s), a.child;
      case 6:
        return e === null && kt && ((e = s = te) && (s = O4(
          s,
          a.pendingProps,
          xn
        ), s !== null ? (a.stateNode = s, Oe = a, te = null, e = !0) : e = !1), e || _a(a)), null;
      case 13:
        return $1(e, a, s);
      case 4:
        return nt(
          a,
          a.stateNode.containerInfo
        ), r = a.pendingProps, e === null ? a.child = gi(
          a,
          null,
          r,
          s
        ) : $e(e, a, r, s), a.child;
      case 11:
        return A1(
          e,
          a,
          a.type,
          a.pendingProps,
          s
        );
      case 7:
        return $e(
          e,
          a,
          a.pendingProps,
          s
        ), a.child;
      case 8:
        return $e(
          e,
          a,
          a.pendingProps.children,
          s
        ), a.child;
      case 12:
        return $e(
          e,
          a,
          a.pendingProps.children,
          s
        ), a.child;
      case 10:
        return r = a.pendingProps, Ra(a, a.type, r.value), $e(e, a, r.children, s), a.child;
      case 9:
        return f = a.type._context, r = a.pendingProps.children, hi(a), f = Le(f), r = r(f), a.flags |= 1, $e(e, a, r, s), a.child;
      case 14:
        return E1(
          e,
          a,
          a.type,
          a.pendingProps,
          s
        );
      case 15:
        return M1(
          e,
          a,
          a.type,
          a.pendingProps,
          s
        );
      case 19:
        return B1(e, a, s);
      case 31:
        return e4(e, a, s);
      case 22:
        return _1(
          e,
          a,
          s,
          a.pendingProps
        );
      case 24:
        return hi(a), r = Le(ve), e === null ? (f = Ku(), f === null && (f = Jt, m = Gu(), f.pooledCache = m, m.refCount++, m !== null && (f.pooledCacheLanes |= s), f = m), a.memoizedState = { parent: r, cache: f }, Qu(a), Ra(a, ve, f)) : ((e.lanes & s) !== 0 && (Fu(e, a), bl(a, null, null, s), vl()), f = e.memoizedState, m = a.memoizedState, f.parent !== r ? (f = { parent: r, cache: r }, a.memoizedState = f, a.lanes === 0 && (a.memoizedState = a.updateQueue.baseState = f), Ra(a, ve, r)) : (r = m.cache, Ra(a, ve, r), r !== f.cache && Pu(
          a,
          [ve],
          s,
          !0
        ))), $e(
          e,
          a,
          a.pendingProps.children,
          s
        ), a.child;
      case 29:
        throw a.pendingProps;
    }
    throw Error(l(156, a.tag));
  }
  function oa(e) {
    e.flags |= 4;
  }
  function Nf(e, a, s, r, f) {
    if ((a = (e.mode & 32) !== 0) && (a = !1), a) {
      if (e.flags |= 16777216, (f & 335544128) === f)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (fy()) e.flags |= 8192;
        else
          throw yi = ao, Zu;
    } else e.flags &= -16777217;
  }
  function z1(e, a) {
    if (a.type !== "stylesheet" || (a.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !tg(a))
      if (fy()) e.flags |= 8192;
      else
        throw yi = ao, Zu;
  }
  function So(e, a) {
    a !== null && (e.flags |= 4), e.flags & 16384 && (a = e.tag !== 22 ? at() : 536870912, e.lanes |= a, xs |= a);
  }
  function jl(e, a) {
    if (!kt)
      switch (e.tailMode) {
        case "hidden":
          a = e.tail;
          for (var s = null; a !== null; )
            a.alternate !== null && (s = a), a = a.sibling;
          s === null ? e.tail = null : s.sibling = null;
          break;
        case "collapsed":
          s = e.tail;
          for (var r = null; s !== null; )
            s.alternate !== null && (r = s), s = s.sibling;
          r === null ? a || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
      }
  }
  function ee(e) {
    var a = e.alternate !== null && e.alternate.child === e.child, s = 0, r = 0;
    if (a)
      for (var f = e.child; f !== null; )
        s |= f.lanes | f.childLanes, r |= f.subtreeFlags & 65011712, r |= f.flags & 65011712, f.return = e, f = f.sibling;
    else
      for (f = e.child; f !== null; )
        s |= f.lanes | f.childLanes, r |= f.subtreeFlags, r |= f.flags, f.return = e, f = f.sibling;
    return e.subtreeFlags |= r, e.childLanes = s, a;
  }
  function a4(e, a, s) {
    var r = a.pendingProps;
    switch (zu(a), a.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return ee(a), null;
      case 1:
        return ee(a), null;
      case 3:
        return s = a.stateNode, r = null, e !== null && (r = e.memoizedState.cache), a.memoizedState.cache !== r && (a.flags |= 2048), ia(ve), dt(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), (e === null || e.child === null) && (rs(a) ? oa(a) : e === null || e.memoizedState.isDehydrated && (a.flags & 256) === 0 || (a.flags |= 1024, Hu())), ee(a), null;
      case 26:
        var f = a.type, m = a.memoizedState;
        return e === null ? (oa(a), m !== null ? (ee(a), z1(a, m)) : (ee(a), Nf(
          a,
          f,
          null,
          r,
          s
        ))) : m ? m !== e.memoizedState ? (oa(a), ee(a), z1(a, m)) : (ee(a), a.flags &= -16777217) : (e = e.memoizedProps, e !== r && oa(a), ee(a), Nf(
          a,
          f,
          e,
          r,
          s
        )), null;
      case 27:
        if (yt(a), s = ct.current, f = a.type, e !== null && a.stateNode != null)
          e.memoizedProps !== r && oa(a);
        else {
          if (!r) {
            if (a.stateNode === null)
              throw Error(l(166));
            return ee(a), null;
          }
          e = et.current, rs(a) ? v0(a) : (e = Xy(f, r, s), a.stateNode = e, oa(a));
        }
        return ee(a), null;
      case 5:
        if (yt(a), f = a.type, e !== null && a.stateNode != null)
          e.memoizedProps !== r && oa(a);
        else {
          if (!r) {
            if (a.stateNode === null)
              throw Error(l(166));
            return ee(a), null;
          }
          if (m = et.current, rs(a))
            v0(a);
          else {
            var S = ko(
              ct.current
            );
            switch (m) {
              case 1:
                m = S.createElementNS(
                  "http://www.w3.org/2000/svg",
                  f
                );
                break;
              case 2:
                m = S.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  f
                );
                break;
              default:
                switch (f) {
                  case "svg":
                    m = S.createElementNS(
                      "http://www.w3.org/2000/svg",
                      f
                    );
                    break;
                  case "math":
                    m = S.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      f
                    );
                    break;
                  case "script":
                    m = S.createElement("div"), m.innerHTML = "<script><\/script>", m = m.removeChild(
                      m.firstChild
                    );
                    break;
                  case "select":
                    m = typeof r.is == "string" ? S.createElement("select", {
                      is: r.is
                    }) : S.createElement("select"), r.multiple ? m.multiple = !0 : r.size && (m.size = r.size);
                    break;
                  default:
                    m = typeof r.is == "string" ? S.createElement(f, { is: r.is }) : S.createElement(f);
                }
            }
            m[Wt] = a, m[Ne] = r;
            t: for (S = a.child; S !== null; ) {
              if (S.tag === 5 || S.tag === 6)
                m.appendChild(S.stateNode);
              else if (S.tag !== 4 && S.tag !== 27 && S.child !== null) {
                S.child.return = S, S = S.child;
                continue;
              }
              if (S === a) break t;
              for (; S.sibling === null; ) {
                if (S.return === null || S.return === a)
                  break t;
                S = S.return;
              }
              S.sibling.return = S.return, S = S.sibling;
            }
            a.stateNode = m;
            t: switch (ke(m, f, r), f) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break t;
              case "img":
                r = !0;
                break t;
              default:
                r = !1;
            }
            r && oa(a);
          }
        }
        return ee(a), Nf(
          a,
          a.type,
          e === null ? null : e.memoizedProps,
          a.pendingProps,
          s
        ), null;
      case 6:
        if (e && a.stateNode != null)
          e.memoizedProps !== r && oa(a);
        else {
          if (typeof r != "string" && a.stateNode === null)
            throw Error(l(166));
          if (e = ct.current, rs(a)) {
            if (e = a.stateNode, s = a.memoizedProps, r = null, f = Oe, f !== null)
              switch (f.tag) {
                case 27:
                case 5:
                  r = f.memoizedProps;
              }
            e[Wt] = a, e = !!(e.nodeValue === s || r !== null && r.suppressHydrationWarning === !0 || $y(e.nodeValue, s)), e || _a(a, !0);
          } else
            e = ko(e).createTextNode(
              r
            ), e[Wt] = a, a.stateNode = e;
        }
        return ee(a), null;
      case 31:
        if (s = a.memoizedState, e === null || e.memoizedState !== null) {
          if (r = rs(a), s !== null) {
            if (e === null) {
              if (!r) throw Error(l(318));
              if (e = a.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(557));
              e[Wt] = a;
            } else
              fi(), (a.flags & 128) === 0 && (a.memoizedState = null), a.flags |= 4;
            ee(a), e = !1;
          } else
            s = Hu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = s), e = !0;
          if (!e)
            return a.flags & 256 ? (on(a), a) : (on(a), null);
          if ((a.flags & 128) !== 0)
            throw Error(l(558));
        }
        return ee(a), null;
      case 13:
        if (r = a.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (f = rs(a), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!f) throw Error(l(318));
              if (f = a.memoizedState, f = f !== null ? f.dehydrated : null, !f) throw Error(l(317));
              f[Wt] = a;
            } else
              fi(), (a.flags & 128) === 0 && (a.memoizedState = null), a.flags |= 4;
            ee(a), f = !1;
          } else
            f = Hu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = f), f = !0;
          if (!f)
            return a.flags & 256 ? (on(a), a) : (on(a), null);
        }
        return on(a), (a.flags & 128) !== 0 ? (a.lanes = s, a) : (s = r !== null, e = e !== null && e.memoizedState !== null, s && (r = a.child, f = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (f = r.alternate.memoizedState.cachePool.pool), m = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (m = r.memoizedState.cachePool.pool), m !== f && (r.flags |= 2048)), s !== e && s && (a.child.flags |= 8192), So(a, a.updateQueue), ee(a), null);
      case 4:
        return dt(), e === null && td(a.stateNode.containerInfo), ee(a), null;
      case 10:
        return ia(a.type), ee(a), null;
      case 19:
        if (q(he), r = a.memoizedState, r === null) return ee(a), null;
        if (f = (a.flags & 128) !== 0, m = r.rendering, m === null)
          if (f) jl(r, !1);
          else {
            if (oe !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = a.child; e !== null; ) {
                if (m = ro(e), m !== null) {
                  for (a.flags |= 128, jl(r, !1), e = m.updateQueue, a.updateQueue = e, So(a, e), a.subtreeFlags = 0, e = s, s = a.child; s !== null; )
                    h0(s, e), s = s.sibling;
                  return G(
                    he,
                    he.current & 1 | 2
                  ), kt && na(a, r.treeForkCount), a.child;
                }
                e = e.sibling;
              }
            r.tail !== null && ze() > Ao && (a.flags |= 128, f = !0, jl(r, !1), a.lanes = 4194304);
          }
        else {
          if (!f)
            if (e = ro(m), e !== null) {
              if (a.flags |= 128, f = !0, e = e.updateQueue, a.updateQueue = e, So(a, e), jl(r, !0), r.tail === null && r.tailMode === "hidden" && !m.alternate && !kt)
                return ee(a), null;
            } else
              2 * ze() - r.renderingStartTime > Ao && s !== 536870912 && (a.flags |= 128, f = !0, jl(r, !1), a.lanes = 4194304);
          r.isBackwards ? (m.sibling = a.child, a.child = m) : (e = r.last, e !== null ? e.sibling = m : a.child = m, r.last = m);
        }
        return r.tail !== null ? (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = ze(), e.sibling = null, s = he.current, G(
          he,
          f ? s & 1 | 2 : s & 1
        ), kt && na(a, r.treeForkCount), e) : (ee(a), null);
      case 22:
      case 23:
        return on(a), tf(), r = a.memoizedState !== null, e !== null ? e.memoizedState !== null !== r && (a.flags |= 8192) : r && (a.flags |= 8192), r ? (s & 536870912) !== 0 && (a.flags & 128) === 0 && (ee(a), a.subtreeFlags & 6 && (a.flags |= 8192)) : ee(a), s = a.updateQueue, s !== null && So(a, s.retryQueue), s = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (s = e.memoizedState.cachePool.pool), r = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (r = a.memoizedState.cachePool.pool), r !== s && (a.flags |= 2048), e !== null && q(mi), null;
      case 24:
        return s = null, e !== null && (s = e.memoizedState.cache), a.memoizedState.cache !== s && (a.flags |= 2048), ia(ve), ee(a), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, a.tag));
  }
  function i4(e, a) {
    switch (zu(a), a.tag) {
      case 1:
        return e = a.flags, e & 65536 ? (a.flags = e & -65537 | 128, a) : null;
      case 3:
        return ia(ve), dt(), e = a.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (a.flags = e & -65537 | 128, a) : null;
      case 26:
      case 27:
      case 5:
        return yt(a), null;
      case 31:
        if (a.memoizedState !== null) {
          if (on(a), a.alternate === null)
            throw Error(l(340));
          fi();
        }
        return e = a.flags, e & 65536 ? (a.flags = e & -65537 | 128, a) : null;
      case 13:
        if (on(a), e = a.memoizedState, e !== null && e.dehydrated !== null) {
          if (a.alternate === null)
            throw Error(l(340));
          fi();
        }
        return e = a.flags, e & 65536 ? (a.flags = e & -65537 | 128, a) : null;
      case 19:
        return q(he), null;
      case 4:
        return dt(), null;
      case 10:
        return ia(a.type), null;
      case 22:
      case 23:
        return on(a), tf(), e !== null && q(mi), e = a.flags, e & 65536 ? (a.flags = e & -65537 | 128, a) : null;
      case 24:
        return ia(ve), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function U1(e, a) {
    switch (zu(a), a.tag) {
      case 3:
        ia(ve), dt();
        break;
      case 26:
      case 27:
      case 5:
        yt(a);
        break;
      case 4:
        dt();
        break;
      case 31:
        a.memoizedState !== null && on(a);
        break;
      case 13:
        on(a);
        break;
      case 19:
        q(he);
        break;
      case 10:
        ia(a.type);
        break;
      case 22:
      case 23:
        on(a), tf(), e !== null && q(mi);
        break;
      case 24:
        ia(ve);
    }
  }
  function Al(e, a) {
    try {
      var s = a.updateQueue, r = s !== null ? s.lastEffect : null;
      if (r !== null) {
        var f = r.next;
        s = f;
        do {
          if ((s.tag & e) === e) {
            r = void 0;
            var m = s.create, S = s.inst;
            r = m(), S.destroy = r;
          }
          s = s.next;
        } while (s !== f);
      }
    } catch (R) {
      Gt(a, a.return, R);
    }
  }
  function ka(e, a, s) {
    try {
      var r = a.updateQueue, f = r !== null ? r.lastEffect : null;
      if (f !== null) {
        var m = f.next;
        r = m;
        do {
          if ((r.tag & e) === e) {
            var S = r.inst, R = S.destroy;
            if (R !== void 0) {
              S.destroy = void 0, f = a;
              var k = s, Z = R;
              try {
                Z();
              } catch (it) {
                Gt(
                  f,
                  k,
                  it
                );
              }
            }
          }
          r = r.next;
        } while (r !== m);
      }
    } catch (it) {
      Gt(a, a.return, it);
    }
  }
  function H1(e) {
    var a = e.updateQueue;
    if (a !== null) {
      var s = e.stateNode;
      try {
        D0(a, s);
      } catch (r) {
        Gt(e, e.return, r);
      }
    }
  }
  function q1(e, a, s) {
    s.props = bi(
      e.type,
      e.memoizedProps
    ), s.state = e.memoizedState;
    try {
      s.componentWillUnmount();
    } catch (r) {
      Gt(e, a, r);
    }
  }
  function El(e, a) {
    try {
      var s = e.ref;
      if (s !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var r = e.stateNode;
            break;
          case 30:
            r = e.stateNode;
            break;
          default:
            r = e.stateNode;
        }
        typeof s == "function" ? e.refCleanup = s(r) : s.current = r;
      }
    } catch (f) {
      Gt(e, a, f);
    }
  }
  function qn(e, a) {
    var s = e.ref, r = e.refCleanup;
    if (s !== null)
      if (typeof r == "function")
        try {
          r();
        } catch (f) {
          Gt(e, a, f);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof s == "function")
        try {
          s(null);
        } catch (f) {
          Gt(e, a, f);
        }
      else s.current = null;
  }
  function Y1(e) {
    var a = e.type, s = e.memoizedProps, r = e.stateNode;
    try {
      t: switch (a) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          s.autoFocus && r.focus();
          break t;
        case "img":
          s.src ? r.src = s.src : s.srcSet && (r.srcset = s.srcSet);
      }
    } catch (f) {
      Gt(e, e.return, f);
    }
  }
  function Of(e, a, s) {
    try {
      var r = e.stateNode;
      A4(r, e.type, s, a), r[Ne] = a;
    } catch (f) {
      Gt(e, e.return, f);
    }
  }
  function P1(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Ya(e.type) || e.tag === 4;
  }
  function Lf(e) {
    t: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || P1(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Ya(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue t;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function $f(e, a, s) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, a ? (s.nodeType === 9 ? s.body : s.nodeName === "HTML" ? s.ownerDocument.body : s).insertBefore(e, a) : (a = s.nodeType === 9 ? s.body : s.nodeName === "HTML" ? s.ownerDocument.body : s, a.appendChild(e), s = s._reactRootContainer, s != null || a.onclick !== null || (a.onclick = Wn));
    else if (r !== 4 && (r === 27 && Ya(e.type) && (s = e.stateNode, a = null), e = e.child, e !== null))
      for ($f(e, a, s), e = e.sibling; e !== null; )
        $f(e, a, s), e = e.sibling;
  }
  function wo(e, a, s) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, a ? s.insertBefore(e, a) : s.appendChild(e);
    else if (r !== 4 && (r === 27 && Ya(e.type) && (s = e.stateNode), e = e.child, e !== null))
      for (wo(e, a, s), e = e.sibling; e !== null; )
        wo(e, a, s), e = e.sibling;
  }
  function G1(e) {
    var a = e.stateNode, s = e.memoizedProps;
    try {
      for (var r = e.type, f = a.attributes; f.length; )
        a.removeAttributeNode(f[0]);
      ke(a, r, s), a[Wt] = e, a[Ne] = s;
    } catch (m) {
      Gt(e, e.return, m);
    }
  }
  var ca = !1, Se = !1, kf = !1, X1 = typeof WeakSet == "function" ? WeakSet : Set, De = null;
  function s4(e, a) {
    if (e = e.containerInfo, ad = Yo, e = i0(e), Mu(e)) {
      if ("selectionStart" in e)
        var s = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        t: {
          s = (s = e.ownerDocument) && s.defaultView || window;
          var r = s.getSelection && s.getSelection();
          if (r && r.rangeCount !== 0) {
            s = r.anchorNode;
            var f = r.anchorOffset, m = r.focusNode;
            r = r.focusOffset;
            try {
              s.nodeType, m.nodeType;
            } catch {
              s = null;
              break t;
            }
            var S = 0, R = -1, k = -1, Z = 0, it = 0, rt = e, Q = null;
            e: for (; ; ) {
              for (var W; rt !== s || f !== 0 && rt.nodeType !== 3 || (R = S + f), rt !== m || r !== 0 && rt.nodeType !== 3 || (k = S + r), rt.nodeType === 3 && (S += rt.nodeValue.length), (W = rt.firstChild) !== null; )
                Q = rt, rt = W;
              for (; ; ) {
                if (rt === e) break e;
                if (Q === s && ++Z === f && (R = S), Q === m && ++it === r && (k = S), (W = rt.nextSibling) !== null) break;
                rt = Q, Q = rt.parentNode;
              }
              rt = W;
            }
            s = R === -1 || k === -1 ? null : { start: R, end: k };
          } else s = null;
        }
      s = s || { start: 0, end: 0 };
    } else s = null;
    for (id = { focusedElem: e, selectionRange: s }, Yo = !1, De = a; De !== null; )
      if (a = De, e = a.child, (a.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = a, De = e;
      else
        for (; De !== null; ) {
          switch (a = De, m = a.alternate, e = a.flags, a.tag) {
            case 0:
              if ((e & 4) !== 0 && (e = a.updateQueue, e = e !== null ? e.events : null, e !== null))
                for (s = 0; s < e.length; s++)
                  f = e[s], f.ref.impl = f.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && m !== null) {
                e = void 0, s = a, f = m.memoizedProps, m = m.memoizedState, r = s.stateNode;
                try {
                  var bt = bi(
                    s.type,
                    f
                  );
                  e = r.getSnapshotBeforeUpdate(
                    bt,
                    m
                  ), r.__reactInternalSnapshotBeforeUpdate = e;
                } catch (Ct) {
                  Gt(
                    s,
                    s.return,
                    Ct
                  );
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (e = a.stateNode.containerInfo, s = e.nodeType, s === 9)
                  rd(e);
                else if (s === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      rd(e);
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
            e.return = a.return, De = e;
            break;
          }
          De = a.return;
        }
  }
  function K1(e, a, s) {
    var r = s.flags;
    switch (s.tag) {
      case 0:
      case 11:
      case 15:
        fa(e, s), r & 4 && Al(5, s);
        break;
      case 1:
        if (fa(e, s), r & 4)
          if (e = s.stateNode, a === null)
            try {
              e.componentDidMount();
            } catch (S) {
              Gt(s, s.return, S);
            }
          else {
            var f = bi(
              s.type,
              a.memoizedProps
            );
            a = a.memoizedState;
            try {
              e.componentDidUpdate(
                f,
                a,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (S) {
              Gt(
                s,
                s.return,
                S
              );
            }
          }
        r & 64 && H1(s), r & 512 && El(s, s.return);
        break;
      case 3:
        if (fa(e, s), r & 64 && (e = s.updateQueue, e !== null)) {
          if (a = null, s.child !== null)
            switch (s.child.tag) {
              case 27:
              case 5:
                a = s.child.stateNode;
                break;
              case 1:
                a = s.child.stateNode;
            }
          try {
            D0(e, a);
          } catch (S) {
            Gt(s, s.return, S);
          }
        }
        break;
      case 27:
        a === null && r & 4 && G1(s);
      case 26:
      case 5:
        fa(e, s), a === null && r & 4 && Y1(s), r & 512 && El(s, s.return);
        break;
      case 12:
        fa(e, s);
        break;
      case 31:
        fa(e, s), r & 4 && F1(e, s);
        break;
      case 13:
        fa(e, s), r & 4 && I1(e, s), r & 64 && (e = s.memoizedState, e !== null && (e = e.dehydrated, e !== null && (s = m4.bind(
          null,
          s
        ), L4(e, s))));
        break;
      case 22:
        if (r = s.memoizedState !== null || ca, !r) {
          a = a !== null && a.memoizedState !== null || Se, f = ca;
          var m = Se;
          ca = r, (Se = a) && !m ? da(
            e,
            s,
            (s.subtreeFlags & 8772) !== 0
          ) : fa(e, s), ca = f, Se = m;
        }
        break;
      case 30:
        break;
      default:
        fa(e, s);
    }
  }
  function Z1(e) {
    var a = e.alternate;
    a !== null && (e.alternate = null, Z1(a)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (a = e.stateNode, a !== null && fu(a)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var ae = null, Ie = !1;
  function ua(e, a, s) {
    for (s = s.child; s !== null; )
      Q1(e, a, s), s = s.sibling;
  }
  function Q1(e, a, s) {
    if (Ye && typeof Ye.onCommitFiberUnmount == "function")
      try {
        Ye.onCommitFiberUnmount(Ta, s);
      } catch {
      }
    switch (s.tag) {
      case 26:
        Se || qn(s, a), ua(
          e,
          a,
          s
        ), s.memoizedState ? s.memoizedState.count-- : s.stateNode && (s = s.stateNode, s.parentNode.removeChild(s));
        break;
      case 27:
        Se || qn(s, a);
        var r = ae, f = Ie;
        Ya(s.type) && (ae = s.stateNode, Ie = !1), ua(
          e,
          a,
          s
        ), kl(s.stateNode), ae = r, Ie = f;
        break;
      case 5:
        Se || qn(s, a);
      case 6:
        if (r = ae, f = Ie, ae = null, ua(
          e,
          a,
          s
        ), ae = r, Ie = f, ae !== null)
          if (Ie)
            try {
              (ae.nodeType === 9 ? ae.body : ae.nodeName === "HTML" ? ae.ownerDocument.body : ae).removeChild(s.stateNode);
            } catch (m) {
              Gt(
                s,
                a,
                m
              );
            }
          else
            try {
              ae.removeChild(s.stateNode);
            } catch (m) {
              Gt(
                s,
                a,
                m
              );
            }
        break;
      case 18:
        ae !== null && (Ie ? (e = ae, Hy(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          s.stateNode
        ), Ms(e)) : Hy(ae, s.stateNode));
        break;
      case 4:
        r = ae, f = Ie, ae = s.stateNode.containerInfo, Ie = !0, ua(
          e,
          a,
          s
        ), ae = r, Ie = f;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ka(2, s, a), Se || ka(4, s, a), ua(
          e,
          a,
          s
        );
        break;
      case 1:
        Se || (qn(s, a), r = s.stateNode, typeof r.componentWillUnmount == "function" && q1(
          s,
          a,
          r
        )), ua(
          e,
          a,
          s
        );
        break;
      case 21:
        ua(
          e,
          a,
          s
        );
        break;
      case 22:
        Se = (r = Se) || s.memoizedState !== null, ua(
          e,
          a,
          s
        ), Se = r;
        break;
      default:
        ua(
          e,
          a,
          s
        );
    }
  }
  function F1(e, a) {
    if (a.memoizedState === null && (e = a.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Ms(e);
      } catch (s) {
        Gt(a, a.return, s);
      }
    }
  }
  function I1(e, a) {
    if (a.memoizedState === null && (e = a.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Ms(e);
      } catch (s) {
        Gt(a, a.return, s);
      }
  }
  function l4(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var a = e.stateNode;
        return a === null && (a = e.stateNode = new X1()), a;
      case 22:
        return e = e.stateNode, a = e._retryCache, a === null && (a = e._retryCache = new X1()), a;
      default:
        throw Error(l(435, e.tag));
    }
  }
  function Co(e, a) {
    var s = l4(e);
    a.forEach(function(r) {
      if (!s.has(r)) {
        s.add(r);
        var f = p4.bind(null, e, r);
        r.then(f, f);
      }
    });
  }
  function Je(e, a) {
    var s = a.deletions;
    if (s !== null)
      for (var r = 0; r < s.length; r++) {
        var f = s[r], m = e, S = a, R = S;
        t: for (; R !== null; ) {
          switch (R.tag) {
            case 27:
              if (Ya(R.type)) {
                ae = R.stateNode, Ie = !1;
                break t;
              }
              break;
            case 5:
              ae = R.stateNode, Ie = !1;
              break t;
            case 3:
            case 4:
              ae = R.stateNode.containerInfo, Ie = !0;
              break t;
          }
          R = R.return;
        }
        if (ae === null) throw Error(l(160));
        Q1(m, S, f), ae = null, Ie = !1, m = f.alternate, m !== null && (m.return = null), f.return = null;
      }
    if (a.subtreeFlags & 13886)
      for (a = a.child; a !== null; )
        J1(a, e), a = a.sibling;
  }
  var Mn = null;
  function J1(e, a) {
    var s = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Je(a, e), We(e), r & 4 && (ka(3, e, e.return), Al(3, e), ka(5, e, e.return));
        break;
      case 1:
        Je(a, e), We(e), r & 512 && (Se || s === null || qn(s, s.return)), r & 64 && ca && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (s = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = s === null ? r : s.concat(r))));
        break;
      case 26:
        var f = Mn;
        if (Je(a, e), We(e), r & 512 && (Se || s === null || qn(s, s.return)), r & 4) {
          var m = s !== null ? s.memoizedState : null;
          if (r = e.memoizedState, s === null)
            if (r === null)
              if (e.stateNode === null) {
                t: {
                  r = e.type, s = e.memoizedProps, f = f.ownerDocument || f;
                  e: switch (r) {
                    case "title":
                      m = f.getElementsByTagName("title")[0], (!m || m[tl] || m[Wt] || m.namespaceURI === "http://www.w3.org/2000/svg" || m.hasAttribute("itemprop")) && (m = f.createElement(r), f.head.insertBefore(
                        m,
                        f.querySelector("head > title")
                      )), ke(m, r, s), m[Wt] = e, Re(m), r = m;
                      break t;
                    case "link":
                      var S = Jy(
                        "link",
                        "href",
                        f
                      ).get(r + (s.href || ""));
                      if (S) {
                        for (var R = 0; R < S.length; R++)
                          if (m = S[R], m.getAttribute("href") === (s.href == null || s.href === "" ? null : s.href) && m.getAttribute("rel") === (s.rel == null ? null : s.rel) && m.getAttribute("title") === (s.title == null ? null : s.title) && m.getAttribute("crossorigin") === (s.crossOrigin == null ? null : s.crossOrigin)) {
                            S.splice(R, 1);
                            break e;
                          }
                      }
                      m = f.createElement(r), ke(m, r, s), f.head.appendChild(m);
                      break;
                    case "meta":
                      if (S = Jy(
                        "meta",
                        "content",
                        f
                      ).get(r + (s.content || ""))) {
                        for (R = 0; R < S.length; R++)
                          if (m = S[R], m.getAttribute("content") === (s.content == null ? null : "" + s.content) && m.getAttribute("name") === (s.name == null ? null : s.name) && m.getAttribute("property") === (s.property == null ? null : s.property) && m.getAttribute("http-equiv") === (s.httpEquiv == null ? null : s.httpEquiv) && m.getAttribute("charset") === (s.charSet == null ? null : s.charSet)) {
                            S.splice(R, 1);
                            break e;
                          }
                      }
                      m = f.createElement(r), ke(m, r, s), f.head.appendChild(m);
                      break;
                    default:
                      throw Error(l(468, r));
                  }
                  m[Wt] = e, Re(m), r = m;
                }
                e.stateNode = r;
              } else
                Wy(
                  f,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Iy(
                f,
                r,
                e.memoizedProps
              );
          else
            m !== r ? (m === null ? s.stateNode !== null && (s = s.stateNode, s.parentNode.removeChild(s)) : m.count--, r === null ? Wy(
              f,
              e.type,
              e.stateNode
            ) : Iy(
              f,
              r,
              e.memoizedProps
            )) : r === null && e.stateNode !== null && Of(
              e,
              e.memoizedProps,
              s.memoizedProps
            );
        }
        break;
      case 27:
        Je(a, e), We(e), r & 512 && (Se || s === null || qn(s, s.return)), s !== null && r & 4 && Of(
          e,
          e.memoizedProps,
          s.memoizedProps
        );
        break;
      case 5:
        if (Je(a, e), We(e), r & 512 && (Se || s === null || qn(s, s.return)), e.flags & 32) {
          f = e.stateNode;
          try {
            Ii(f, "");
          } catch (bt) {
            Gt(e, e.return, bt);
          }
        }
        r & 4 && e.stateNode != null && (f = e.memoizedProps, Of(
          e,
          f,
          s !== null ? s.memoizedProps : f
        )), r & 1024 && (kf = !0);
        break;
      case 6:
        if (Je(a, e), We(e), r & 4) {
          if (e.stateNode === null)
            throw Error(l(162));
          r = e.memoizedProps, s = e.stateNode;
          try {
            s.nodeValue = r;
          } catch (bt) {
            Gt(e, e.return, bt);
          }
        }
        break;
      case 3:
        if (zo = null, f = Mn, Mn = Bo(a.containerInfo), Je(a, e), Mn = f, We(e), r & 4 && s !== null && s.memoizedState.isDehydrated)
          try {
            Ms(a.containerInfo);
          } catch (bt) {
            Gt(e, e.return, bt);
          }
        kf && (kf = !1, W1(e));
        break;
      case 4:
        r = Mn, Mn = Bo(
          e.stateNode.containerInfo
        ), Je(a, e), We(e), Mn = r;
        break;
      case 12:
        Je(a, e), We(e);
        break;
      case 31:
        Je(a, e), We(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Co(e, r)));
        break;
      case 13:
        Je(a, e), We(e), e.child.flags & 8192 && e.memoizedState !== null != (s !== null && s.memoizedState !== null) && (jo = ze()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Co(e, r)));
        break;
      case 22:
        f = e.memoizedState !== null;
        var k = s !== null && s.memoizedState !== null, Z = ca, it = Se;
        if (ca = Z || f, Se = it || k, Je(a, e), Se = it, ca = Z, We(e), r & 8192)
          t: for (a = e.stateNode, a._visibility = f ? a._visibility & -2 : a._visibility | 1, f && (s === null || k || ca || Se || xi(e)), s = null, a = e; ; ) {
            if (a.tag === 5 || a.tag === 26) {
              if (s === null) {
                k = s = a;
                try {
                  if (m = k.stateNode, f)
                    S = m.style, typeof S.setProperty == "function" ? S.setProperty("display", "none", "important") : S.display = "none";
                  else {
                    R = k.stateNode;
                    var rt = k.memoizedProps.style, Q = rt != null && rt.hasOwnProperty("display") ? rt.display : null;
                    R.style.display = Q == null || typeof Q == "boolean" ? "" : ("" + Q).trim();
                  }
                } catch (bt) {
                  Gt(k, k.return, bt);
                }
              }
            } else if (a.tag === 6) {
              if (s === null) {
                k = a;
                try {
                  k.stateNode.nodeValue = f ? "" : k.memoizedProps;
                } catch (bt) {
                  Gt(k, k.return, bt);
                }
              }
            } else if (a.tag === 18) {
              if (s === null) {
                k = a;
                try {
                  var W = k.stateNode;
                  f ? qy(W, !0) : qy(k.stateNode, !1);
                } catch (bt) {
                  Gt(k, k.return, bt);
                }
              }
            } else if ((a.tag !== 22 && a.tag !== 23 || a.memoizedState === null || a === e) && a.child !== null) {
              a.child.return = a, a = a.child;
              continue;
            }
            if (a === e) break t;
            for (; a.sibling === null; ) {
              if (a.return === null || a.return === e) break t;
              s === a && (s = null), a = a.return;
            }
            s === a && (s = null), a.sibling.return = a.return, a = a.sibling;
          }
        r & 4 && (r = e.updateQueue, r !== null && (s = r.retryQueue, s !== null && (r.retryQueue = null, Co(e, s))));
        break;
      case 19:
        Je(a, e), We(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Co(e, r)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Je(a, e), We(e);
    }
  }
  function We(e) {
    var a = e.flags;
    if (a & 2) {
      try {
        for (var s, r = e.return; r !== null; ) {
          if (P1(r)) {
            s = r;
            break;
          }
          r = r.return;
        }
        if (s == null) throw Error(l(160));
        switch (s.tag) {
          case 27:
            var f = s.stateNode, m = Lf(e);
            wo(e, m, f);
            break;
          case 5:
            var S = s.stateNode;
            s.flags & 32 && (Ii(S, ""), s.flags &= -33);
            var R = Lf(e);
            wo(e, R, S);
            break;
          case 3:
          case 4:
            var k = s.stateNode.containerInfo, Z = Lf(e);
            $f(
              e,
              Z,
              k
            );
            break;
          default:
            throw Error(l(161));
        }
      } catch (it) {
        Gt(e, e.return, it);
      }
      e.flags &= -3;
    }
    a & 4096 && (e.flags &= -4097);
  }
  function W1(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var a = e;
        W1(a), a.tag === 5 && a.flags & 1024 && a.stateNode.reset(), e = e.sibling;
      }
  }
  function fa(e, a) {
    if (a.subtreeFlags & 8772)
      for (a = a.child; a !== null; )
        K1(e, a.alternate, a), a = a.sibling;
  }
  function xi(e) {
    for (e = e.child; e !== null; ) {
      var a = e;
      switch (a.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ka(4, a, a.return), xi(a);
          break;
        case 1:
          qn(a, a.return);
          var s = a.stateNode;
          typeof s.componentWillUnmount == "function" && q1(
            a,
            a.return,
            s
          ), xi(a);
          break;
        case 27:
          kl(a.stateNode);
        case 26:
        case 5:
          qn(a, a.return), xi(a);
          break;
        case 22:
          a.memoizedState === null && xi(a);
          break;
        case 30:
          xi(a);
          break;
        default:
          xi(a);
      }
      e = e.sibling;
    }
  }
  function da(e, a, s) {
    for (s = s && (a.subtreeFlags & 8772) !== 0, a = a.child; a !== null; ) {
      var r = a.alternate, f = e, m = a, S = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          da(
            f,
            m,
            s
          ), Al(4, m);
          break;
        case 1:
          if (da(
            f,
            m,
            s
          ), r = m, f = r.stateNode, typeof f.componentDidMount == "function")
            try {
              f.componentDidMount();
            } catch (Z) {
              Gt(r, r.return, Z);
            }
          if (r = m, f = r.updateQueue, f !== null) {
            var R = r.stateNode;
            try {
              var k = f.shared.hiddenCallbacks;
              if (k !== null)
                for (f.shared.hiddenCallbacks = null, f = 0; f < k.length; f++)
                  R0(k[f], R);
            } catch (Z) {
              Gt(r, r.return, Z);
            }
          }
          s && S & 64 && H1(m), El(m, m.return);
          break;
        case 27:
          G1(m);
        case 26:
        case 5:
          da(
            f,
            m,
            s
          ), s && r === null && S & 4 && Y1(m), El(m, m.return);
          break;
        case 12:
          da(
            f,
            m,
            s
          );
          break;
        case 31:
          da(
            f,
            m,
            s
          ), s && S & 4 && F1(f, m);
          break;
        case 13:
          da(
            f,
            m,
            s
          ), s && S & 4 && I1(f, m);
          break;
        case 22:
          m.memoizedState === null && da(
            f,
            m,
            s
          ), El(m, m.return);
          break;
        case 30:
          break;
        default:
          da(
            f,
            m,
            s
          );
      }
      a = a.sibling;
    }
  }
  function Bf(e, a) {
    var s = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (s = e.memoizedState.cachePool.pool), e = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (e = a.memoizedState.cachePool.pool), e !== s && (e != null && e.refCount++, s != null && hl(s));
  }
  function Vf(e, a) {
    e = null, a.alternate !== null && (e = a.alternate.memoizedState.cache), a = a.memoizedState.cache, a !== e && (a.refCount++, e != null && hl(e));
  }
  function _n(e, a, s, r) {
    if (a.subtreeFlags & 10256)
      for (a = a.child; a !== null; )
        ty(
          e,
          a,
          s,
          r
        ), a = a.sibling;
  }
  function ty(e, a, s, r) {
    var f = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        _n(
          e,
          a,
          s,
          r
        ), f & 2048 && Al(9, a);
        break;
      case 1:
        _n(
          e,
          a,
          s,
          r
        );
        break;
      case 3:
        _n(
          e,
          a,
          s,
          r
        ), f & 2048 && (e = null, a.alternate !== null && (e = a.alternate.memoizedState.cache), a = a.memoizedState.cache, a !== e && (a.refCount++, e != null && hl(e)));
        break;
      case 12:
        if (f & 2048) {
          _n(
            e,
            a,
            s,
            r
          ), e = a.stateNode;
          try {
            var m = a.memoizedProps, S = m.id, R = m.onPostCommit;
            typeof R == "function" && R(
              S,
              a.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (k) {
            Gt(a, a.return, k);
          }
        } else
          _n(
            e,
            a,
            s,
            r
          );
        break;
      case 31:
        _n(
          e,
          a,
          s,
          r
        );
        break;
      case 13:
        _n(
          e,
          a,
          s,
          r
        );
        break;
      case 23:
        break;
      case 22:
        m = a.stateNode, S = a.alternate, a.memoizedState !== null ? m._visibility & 2 ? _n(
          e,
          a,
          s,
          r
        ) : Ml(e, a) : m._visibility & 2 ? _n(
          e,
          a,
          s,
          r
        ) : (m._visibility |= 2, gs(
          e,
          a,
          s,
          r,
          (a.subtreeFlags & 10256) !== 0 || !1
        )), f & 2048 && Bf(S, a);
        break;
      case 24:
        _n(
          e,
          a,
          s,
          r
        ), f & 2048 && Vf(a.alternate, a);
        break;
      default:
        _n(
          e,
          a,
          s,
          r
        );
    }
  }
  function gs(e, a, s, r, f) {
    for (f = f && ((a.subtreeFlags & 10256) !== 0 || !1), a = a.child; a !== null; ) {
      var m = e, S = a, R = s, k = r, Z = S.flags;
      switch (S.tag) {
        case 0:
        case 11:
        case 15:
          gs(
            m,
            S,
            R,
            k,
            f
          ), Al(8, S);
          break;
        case 23:
          break;
        case 22:
          var it = S.stateNode;
          S.memoizedState !== null ? it._visibility & 2 ? gs(
            m,
            S,
            R,
            k,
            f
          ) : Ml(
            m,
            S
          ) : (it._visibility |= 2, gs(
            m,
            S,
            R,
            k,
            f
          )), f && Z & 2048 && Bf(
            S.alternate,
            S
          );
          break;
        case 24:
          gs(
            m,
            S,
            R,
            k,
            f
          ), f && Z & 2048 && Vf(S.alternate, S);
          break;
        default:
          gs(
            m,
            S,
            R,
            k,
            f
          );
      }
      a = a.sibling;
    }
  }
  function Ml(e, a) {
    if (a.subtreeFlags & 10256)
      for (a = a.child; a !== null; ) {
        var s = e, r = a, f = r.flags;
        switch (r.tag) {
          case 22:
            Ml(s, r), f & 2048 && Bf(
              r.alternate,
              r
            );
            break;
          case 24:
            Ml(s, r), f & 2048 && Vf(r.alternate, r);
            break;
          default:
            Ml(s, r);
        }
        a = a.sibling;
      }
  }
  var _l = 8192;
  function vs(e, a, s) {
    if (e.subtreeFlags & _l)
      for (e = e.child; e !== null; )
        ey(
          e,
          a,
          s
        ), e = e.sibling;
  }
  function ey(e, a, s) {
    switch (e.tag) {
      case 26:
        vs(
          e,
          a,
          s
        ), e.flags & _l && e.memoizedState !== null && X4(
          s,
          Mn,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        vs(
          e,
          a,
          s
        );
        break;
      case 3:
      case 4:
        var r = Mn;
        Mn = Bo(e.stateNode.containerInfo), vs(
          e,
          a,
          s
        ), Mn = r;
        break;
      case 22:
        e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = _l, _l = 16777216, vs(
          e,
          a,
          s
        ), _l = r) : vs(
          e,
          a,
          s
        ));
        break;
      default:
        vs(
          e,
          a,
          s
        );
    }
  }
  function ny(e) {
    var a = e.alternate;
    if (a !== null && (e = a.child, e !== null)) {
      a.child = null;
      do
        a = e.sibling, e.sibling = null, e = a;
      while (e !== null);
    }
  }
  function Rl(e) {
    var a = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (a !== null)
        for (var s = 0; s < a.length; s++) {
          var r = a[s];
          De = r, iy(
            r,
            e
          );
        }
      ny(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        ay(e), e = e.sibling;
  }
  function ay(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Rl(e), e.flags & 2048 && ka(9, e, e.return);
        break;
      case 3:
        Rl(e);
        break;
      case 12:
        Rl(e);
        break;
      case 22:
        var a = e.stateNode;
        e.memoizedState !== null && a._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (a._visibility &= -3, To(e)) : Rl(e);
        break;
      default:
        Rl(e);
    }
  }
  function To(e) {
    var a = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (a !== null)
        for (var s = 0; s < a.length; s++) {
          var r = a[s];
          De = r, iy(
            r,
            e
          );
        }
      ny(e);
    }
    for (e = e.child; e !== null; ) {
      switch (a = e, a.tag) {
        case 0:
        case 11:
        case 15:
          ka(8, a, a.return), To(a);
          break;
        case 22:
          s = a.stateNode, s._visibility & 2 && (s._visibility &= -3, To(a));
          break;
        default:
          To(a);
      }
      e = e.sibling;
    }
  }
  function iy(e, a) {
    for (; De !== null; ) {
      var s = De;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          ka(8, s, a);
          break;
        case 23:
        case 22:
          if (s.memoizedState !== null && s.memoizedState.cachePool !== null) {
            var r = s.memoizedState.cachePool.pool;
            r != null && r.refCount++;
          }
          break;
        case 24:
          hl(s.memoizedState.cache);
      }
      if (r = s.child, r !== null) r.return = s, De = r;
      else
        t: for (s = e; De !== null; ) {
          r = De;
          var f = r.sibling, m = r.return;
          if (Z1(r), r === s) {
            De = null;
            break t;
          }
          if (f !== null) {
            f.return = m, De = f;
            break t;
          }
          De = m;
        }
    }
  }
  var r4 = {
    getCacheForType: function(e) {
      var a = Le(ve), s = a.data.get(e);
      return s === void 0 && (s = e(), a.data.set(e, s)), s;
    },
    cacheSignal: function() {
      return Le(ve).controller.signal;
    }
  }, o4 = typeof WeakMap == "function" ? WeakMap : Map, qt = 0, Jt = null, Nt = null, Lt = 0, Pt = 0, cn = null, Ba = !1, bs = !1, zf = !1, ha = 0, oe = 0, Va = 0, Si = 0, Uf = 0, un = 0, xs = 0, Dl = null, tn = null, Hf = !1, jo = 0, sy = 0, Ao = 1 / 0, Eo = null, za = null, je = 0, Ua = null, Ss = null, ma = 0, qf = 0, Yf = null, ly = null, Nl = 0, Pf = null;
  function fn() {
    return (qt & 2) !== 0 && Lt !== 0 ? Lt & -Lt : $.T !== null ? Ff() : ja();
  }
  function ry() {
    if (un === 0)
      if ((Lt & 536870912) === 0 || kt) {
        var e = qi;
        qi <<= 1, (qi & 3932160) === 0 && (qi = 262144), un = e;
      } else un = 536870912;
    return e = rn.current, e !== null && (e.flags |= 32), un;
  }
  function en(e, a, s) {
    (e === Jt && (Pt === 2 || Pt === 9) || e.cancelPendingCommit !== null) && (ws(e, 0), Ha(
      e,
      Lt,
      un,
      !1
    )), jt(e, s), ((qt & 2) === 0 || e !== Jt) && (e === Jt && ((qt & 2) === 0 && (Si |= s), oe === 4 && Ha(
      e,
      Lt,
      un,
      !1
    )), Yn(e));
  }
  function oy(e, a, s) {
    if ((qt & 6) !== 0) throw Error(l(327));
    var r = !s && (a & 127) === 0 && (a & e.expiredLanes) === 0 || ii(e, a), f = r ? f4(e, a) : Xf(e, a, !0), m = r;
    do {
      if (f === 0) {
        bs && !r && Ha(e, a, 0, !1);
        break;
      } else {
        if (s = e.current.alternate, m && !c4(s)) {
          f = Xf(e, a, !1), m = !1;
          continue;
        }
        if (f === 2) {
          if (m = a, e.errorRecoveryDisabledLanes & m)
            var S = 0;
          else
            S = e.pendingLanes & -536870913, S = S !== 0 ? S : S & 536870912 ? 536870912 : 0;
          if (S !== 0) {
            a = S;
            t: {
              var R = e;
              f = Dl;
              var k = R.current.memoizedState.isDehydrated;
              if (k && (ws(R, S).flags |= 256), S = Xf(
                R,
                S,
                !1
              ), S !== 2) {
                if (zf && !k) {
                  R.errorRecoveryDisabledLanes |= m, Si |= m, f = 4;
                  break t;
                }
                m = tn, tn = f, m !== null && (tn === null ? tn = m : tn.push.apply(
                  tn,
                  m
                ));
              }
              f = S;
            }
            if (m = !1, f !== 2) continue;
          }
        }
        if (f === 1) {
          ws(e, 0), Ha(e, a, 0, !0);
          break;
        }
        t: {
          switch (r = e, m = f, m) {
            case 0:
            case 1:
              throw Error(l(345));
            case 4:
              if ((a & 4194048) !== a) break;
            case 6:
              Ha(
                r,
                a,
                un,
                !Ba
              );
              break t;
            case 2:
              tn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(l(329));
          }
          if ((a & 62914560) === a && (f = jo + 300 - ze(), 10 < f)) {
            if (Ha(
              r,
              a,
              un,
              !Ba
            ), Pi(r, 0, !0) !== 0) break t;
            ma = a, r.timeoutHandle = zy(
              cy.bind(
                null,
                r,
                s,
                tn,
                Eo,
                Hf,
                a,
                un,
                Si,
                xs,
                Ba,
                m,
                "Throttled",
                -0,
                0
              ),
              f
            );
            break t;
          }
          cy(
            r,
            s,
            tn,
            Eo,
            Hf,
            a,
            un,
            Si,
            xs,
            Ba,
            m,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Yn(e);
  }
  function cy(e, a, s, r, f, m, S, R, k, Z, it, rt, Q, W) {
    if (e.timeoutHandle = -1, rt = a.subtreeFlags, rt & 8192 || (rt & 16785408) === 16785408) {
      rt = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Wn
      }, ey(
        a,
        m,
        rt
      );
      var bt = (m & 62914560) === m ? jo - ze() : (m & 4194048) === m ? sy - ze() : 0;
      if (bt = K4(
        rt,
        bt
      ), bt !== null) {
        ma = m, e.cancelPendingCommit = bt(
          gy.bind(
            null,
            e,
            a,
            m,
            s,
            r,
            f,
            S,
            R,
            k,
            it,
            rt,
            null,
            Q,
            W
          )
        ), Ha(e, m, S, !Z);
        return;
      }
    }
    gy(
      e,
      a,
      m,
      s,
      r,
      f,
      S,
      R,
      k
    );
  }
  function c4(e) {
    for (var a = e; ; ) {
      var s = a.tag;
      if ((s === 0 || s === 11 || s === 15) && a.flags & 16384 && (s = a.updateQueue, s !== null && (s = s.stores, s !== null)))
        for (var r = 0; r < s.length; r++) {
          var f = s[r], m = f.getSnapshot;
          f = f.value;
          try {
            if (!sn(m(), f)) return !1;
          } catch {
            return !1;
          }
        }
      if (s = a.child, a.subtreeFlags & 16384 && s !== null)
        s.return = a, a = s;
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
  function Ha(e, a, s, r) {
    a &= ~Uf, a &= ~Si, e.suspendedLanes |= a, e.pingedLanes &= ~a, r && (e.warmLanes |= a), r = e.expirationTimes;
    for (var f = a; 0 < f; ) {
      var m = 31 - Ue(f), S = 1 << m;
      r[m] = -1, f &= ~S;
    }
    s !== 0 && Vt(e, s, a);
  }
  function Mo() {
    return (qt & 6) === 0 ? (Ol(0), !1) : !0;
  }
  function Gf() {
    if (Nt !== null) {
      if (Pt === 0)
        var e = Nt.return;
      else
        e = Nt, aa = di = null, rf(e), ds = null, pl = 0, e = Nt;
      for (; e !== null; )
        U1(e.alternate, e), e = e.return;
      Nt = null;
    }
  }
  function ws(e, a) {
    var s = e.timeoutHandle;
    s !== -1 && (e.timeoutHandle = -1, _4(s)), s = e.cancelPendingCommit, s !== null && (e.cancelPendingCommit = null, s()), ma = 0, Gf(), Jt = e, Nt = s = ea(e.current, null), Lt = a, Pt = 0, cn = null, Ba = !1, bs = ii(e, a), zf = !1, xs = un = Uf = Si = Va = oe = 0, tn = Dl = null, Hf = !1, (a & 8) !== 0 && (a |= a & 32);
    var r = e.entangledLanes;
    if (r !== 0)
      for (e = e.entanglements, r &= a; 0 < r; ) {
        var f = 31 - Ue(r), m = 1 << f;
        a |= e[f], r &= ~m;
      }
    return ha = a, Zr(), s;
  }
  function uy(e, a) {
    Rt = null, $.H = Cl, a === fs || a === no ? (a = A0(), Pt = 3) : a === Zu ? (a = A0(), Pt = 4) : Pt = a === Cf ? 8 : a !== null && typeof a == "object" && typeof a.then == "function" ? 6 : 1, cn = a, Nt === null && (oe = 1, go(
      e,
      gn(a, e.current)
    ));
  }
  function fy() {
    var e = rn.current;
    return e === null ? !0 : (Lt & 4194048) === Lt ? Sn === null : (Lt & 62914560) === Lt || (Lt & 536870912) !== 0 ? e === Sn : !1;
  }
  function dy() {
    var e = $.H;
    return $.H = Cl, e === null ? Cl : e;
  }
  function hy() {
    var e = $.A;
    return $.A = r4, e;
  }
  function _o() {
    oe = 4, Ba || (Lt & 4194048) !== Lt && rn.current !== null || (bs = !0), (Va & 134217727) === 0 && (Si & 134217727) === 0 || Jt === null || Ha(
      Jt,
      Lt,
      un,
      !1
    );
  }
  function Xf(e, a, s) {
    var r = qt;
    qt |= 2;
    var f = dy(), m = hy();
    (Jt !== e || Lt !== a) && (Eo = null, ws(e, a)), a = !1;
    var S = oe;
    t: do
      try {
        if (Pt !== 0 && Nt !== null) {
          var R = Nt, k = cn;
          switch (Pt) {
            case 8:
              Gf(), S = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              rn.current === null && (a = !0);
              var Z = Pt;
              if (Pt = 0, cn = null, Cs(e, R, k, Z), s && bs) {
                S = 0;
                break t;
              }
              break;
            default:
              Z = Pt, Pt = 0, cn = null, Cs(e, R, k, Z);
          }
        }
        u4(), S = oe;
        break;
      } catch (it) {
        uy(e, it);
      }
    while (!0);
    return a && e.shellSuspendCounter++, aa = di = null, qt = r, $.H = f, $.A = m, Nt === null && (Jt = null, Lt = 0, Zr()), S;
  }
  function u4() {
    for (; Nt !== null; ) my(Nt);
  }
  function f4(e, a) {
    var s = qt;
    qt |= 2;
    var r = dy(), f = hy();
    Jt !== e || Lt !== a ? (Eo = null, Ao = ze() + 500, ws(e, a)) : bs = ii(
      e,
      a
    );
    t: do
      try {
        if (Pt !== 0 && Nt !== null) {
          a = Nt;
          var m = cn;
          e: switch (Pt) {
            case 1:
              Pt = 0, cn = null, Cs(e, a, m, 1);
              break;
            case 2:
            case 9:
              if (T0(m)) {
                Pt = 0, cn = null, py(a);
                break;
              }
              a = function() {
                Pt !== 2 && Pt !== 9 || Jt !== e || (Pt = 7), Yn(e);
              }, m.then(a, a);
              break t;
            case 3:
              Pt = 7;
              break t;
            case 4:
              Pt = 5;
              break t;
            case 7:
              T0(m) ? (Pt = 0, cn = null, py(a)) : (Pt = 0, cn = null, Cs(e, a, m, 7));
              break;
            case 5:
              var S = null;
              switch (Nt.tag) {
                case 26:
                  S = Nt.memoizedState;
                case 5:
                case 27:
                  var R = Nt;
                  if (S ? tg(S) : R.stateNode.complete) {
                    Pt = 0, cn = null;
                    var k = R.sibling;
                    if (k !== null) Nt = k;
                    else {
                      var Z = R.return;
                      Z !== null ? (Nt = Z, Ro(Z)) : Nt = null;
                    }
                    break e;
                  }
              }
              Pt = 0, cn = null, Cs(e, a, m, 5);
              break;
            case 6:
              Pt = 0, cn = null, Cs(e, a, m, 6);
              break;
            case 8:
              Gf(), oe = 6;
              break t;
            default:
              throw Error(l(462));
          }
        }
        d4();
        break;
      } catch (it) {
        uy(e, it);
      }
    while (!0);
    return aa = di = null, $.H = r, $.A = f, qt = s, Nt !== null ? 0 : (Jt = null, Lt = 0, Zr(), oe);
  }
  function d4() {
    for (; Nt !== null && !Js(); )
      my(Nt);
  }
  function my(e) {
    var a = V1(e.alternate, e, ha);
    e.memoizedProps = e.pendingProps, a === null ? Ro(e) : Nt = a;
  }
  function py(e) {
    var a = e, s = a.alternate;
    switch (a.tag) {
      case 15:
      case 0:
        a = N1(
          s,
          a,
          a.pendingProps,
          a.type,
          void 0,
          Lt
        );
        break;
      case 11:
        a = N1(
          s,
          a,
          a.pendingProps,
          a.type.render,
          a.ref,
          Lt
        );
        break;
      case 5:
        rf(a);
      default:
        U1(s, a), a = Nt = h0(a, ha), a = V1(s, a, ha);
    }
    e.memoizedProps = e.pendingProps, a === null ? Ro(e) : Nt = a;
  }
  function Cs(e, a, s, r) {
    aa = di = null, rf(a), ds = null, pl = 0;
    var f = a.return;
    try {
      if (t4(
        e,
        f,
        a,
        s,
        Lt
      )) {
        oe = 1, go(
          e,
          gn(s, e.current)
        ), Nt = null;
        return;
      }
    } catch (m) {
      if (f !== null) throw Nt = f, m;
      oe = 1, go(
        e,
        gn(s, e.current)
      ), Nt = null;
      return;
    }
    a.flags & 32768 ? (kt || r === 1 ? e = !0 : bs || (Lt & 536870912) !== 0 ? e = !1 : (Ba = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = rn.current, r !== null && r.tag === 13 && (r.flags |= 16384))), yy(a, e)) : Ro(a);
  }
  function Ro(e) {
    var a = e;
    do {
      if ((a.flags & 32768) !== 0) {
        yy(
          a,
          Ba
        );
        return;
      }
      e = a.return;
      var s = a4(
        a.alternate,
        a,
        ha
      );
      if (s !== null) {
        Nt = s;
        return;
      }
      if (a = a.sibling, a !== null) {
        Nt = a;
        return;
      }
      Nt = a = e;
    } while (a !== null);
    oe === 0 && (oe = 5);
  }
  function yy(e, a) {
    do {
      var s = i4(e.alternate, e);
      if (s !== null) {
        s.flags &= 32767, Nt = s;
        return;
      }
      if (s = e.return, s !== null && (s.flags |= 32768, s.subtreeFlags = 0, s.deletions = null), !a && (e = e.sibling, e !== null)) {
        Nt = e;
        return;
      }
      Nt = e = s;
    } while (e !== null);
    oe = 6, Nt = null;
  }
  function gy(e, a, s, r, f, m, S, R, k) {
    e.cancelPendingCommit = null;
    do
      Do();
    while (je !== 0);
    if ((qt & 6) !== 0) throw Error(l(327));
    if (a !== null) {
      if (a === e.current) throw Error(l(177));
      if (m = a.lanes | a.childLanes, m |= Ou, Pe(
        e,
        s,
        m,
        S,
        R,
        k
      ), e === Jt && (Nt = Jt = null, Lt = 0), Ss = a, Ua = e, ma = s, qf = m, Yf = f, ly = r, (a.subtreeFlags & 10256) !== 0 || (a.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, y4(zi, function() {
        return wy(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), r = (a.flags & 13878) !== 0, (a.subtreeFlags & 13878) !== 0 || r) {
        r = $.T, $.T = null, f = X.p, X.p = 2, S = qt, qt |= 4;
        try {
          s4(e, a, s);
        } finally {
          qt = S, X.p = f, $.T = r;
        }
      }
      je = 1, vy(), by(), xy();
    }
  }
  function vy() {
    if (je === 1) {
      je = 0;
      var e = Ua, a = Ss, s = (a.flags & 13878) !== 0;
      if ((a.subtreeFlags & 13878) !== 0 || s) {
        s = $.T, $.T = null;
        var r = X.p;
        X.p = 2;
        var f = qt;
        qt |= 4;
        try {
          J1(a, e);
          var m = id, S = i0(e.containerInfo), R = m.focusedElem, k = m.selectionRange;
          if (S !== R && R && R.ownerDocument && a0(
            R.ownerDocument.documentElement,
            R
          )) {
            if (k !== null && Mu(R)) {
              var Z = k.start, it = k.end;
              if (it === void 0 && (it = Z), "selectionStart" in R)
                R.selectionStart = Z, R.selectionEnd = Math.min(
                  it,
                  R.value.length
                );
              else {
                var rt = R.ownerDocument || document, Q = rt && rt.defaultView || window;
                if (Q.getSelection) {
                  var W = Q.getSelection(), bt = R.textContent.length, Ct = Math.min(k.start, bt), Zt = k.end === void 0 ? Ct : Math.min(k.end, bt);
                  !W.extend && Ct > Zt && (S = Zt, Zt = Ct, Ct = S);
                  var P = n0(
                    R,
                    Ct
                  ), z = n0(
                    R,
                    Zt
                  );
                  if (P && z && (W.rangeCount !== 1 || W.anchorNode !== P.node || W.anchorOffset !== P.offset || W.focusNode !== z.node || W.focusOffset !== z.offset)) {
                    var K = rt.createRange();
                    K.setStart(P.node, P.offset), W.removeAllRanges(), Ct > Zt ? (W.addRange(K), W.extend(z.node, z.offset)) : (K.setEnd(z.node, z.offset), W.addRange(K));
                  }
                }
              }
            }
            for (rt = [], W = R; W = W.parentNode; )
              W.nodeType === 1 && rt.push({
                element: W,
                left: W.scrollLeft,
                top: W.scrollTop
              });
            for (typeof R.focus == "function" && R.focus(), R = 0; R < rt.length; R++) {
              var lt = rt[R];
              lt.element.scrollLeft = lt.left, lt.element.scrollTop = lt.top;
            }
          }
          Yo = !!ad, id = ad = null;
        } finally {
          qt = f, X.p = r, $.T = s;
        }
      }
      e.current = a, je = 2;
    }
  }
  function by() {
    if (je === 2) {
      je = 0;
      var e = Ua, a = Ss, s = (a.flags & 8772) !== 0;
      if ((a.subtreeFlags & 8772) !== 0 || s) {
        s = $.T, $.T = null;
        var r = X.p;
        X.p = 2;
        var f = qt;
        qt |= 4;
        try {
          K1(e, a.alternate, a);
        } finally {
          qt = f, X.p = r, $.T = s;
        }
      }
      je = 3;
    }
  }
  function xy() {
    if (je === 4 || je === 3) {
      je = 0, Qn();
      var e = Ua, a = Ss, s = ma, r = ly;
      (a.subtreeFlags & 10256) !== 0 || (a.flags & 10256) !== 0 ? je = 5 : (je = 0, Ss = Ua = null, Sy(e, e.pendingLanes));
      var f = e.pendingLanes;
      if (f === 0 && (za = null), de(s), a = a.stateNode, Ye && typeof Ye.onCommitFiberRoot == "function")
        try {
          Ye.onCommitFiberRoot(
            Ta,
            a,
            void 0,
            (a.current.flags & 128) === 128
          );
        } catch {
        }
      if (r !== null) {
        a = $.T, f = X.p, X.p = 2, $.T = null;
        try {
          for (var m = e.onRecoverableError, S = 0; S < r.length; S++) {
            var R = r[S];
            m(R.value, {
              componentStack: R.stack
            });
          }
        } finally {
          $.T = a, X.p = f;
        }
      }
      (ma & 3) !== 0 && Do(), Yn(e), f = e.pendingLanes, (s & 261930) !== 0 && (f & 42) !== 0 ? e === Pf ? Nl++ : (Nl = 0, Pf = e) : Nl = 0, Ol(0);
    }
  }
  function Sy(e, a) {
    (e.pooledCacheLanes &= a) === 0 && (a = e.pooledCache, a != null && (e.pooledCache = null, hl(a)));
  }
  function Do() {
    return vy(), by(), xy(), wy();
  }
  function wy() {
    if (je !== 5) return !1;
    var e = Ua, a = qf;
    qf = 0;
    var s = de(ma), r = $.T, f = X.p;
    try {
      X.p = 32 > s ? 32 : s, $.T = null, s = Yf, Yf = null;
      var m = Ua, S = ma;
      if (je = 0, Ss = Ua = null, ma = 0, (qt & 6) !== 0) throw Error(l(331));
      var R = qt;
      if (qt |= 4, ay(m.current), ty(
        m,
        m.current,
        S,
        s
      ), qt = R, Ol(0, !1), Ye && typeof Ye.onPostCommitFiberRoot == "function")
        try {
          Ye.onPostCommitFiberRoot(Ta, m);
        } catch {
        }
      return !0;
    } finally {
      X.p = f, $.T = r, Sy(e, a);
    }
  }
  function Cy(e, a, s) {
    a = gn(s, a), a = wf(e.stateNode, a, 2), e = Oa(e, a, 2), e !== null && (jt(e, 2), Yn(e));
  }
  function Gt(e, a, s) {
    if (e.tag === 3)
      Cy(e, e, s);
    else
      for (; a !== null; ) {
        if (a.tag === 3) {
          Cy(
            a,
            e,
            s
          );
          break;
        } else if (a.tag === 1) {
          var r = a.stateNode;
          if (typeof a.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (za === null || !za.has(r))) {
            e = gn(s, e), s = T1(2), r = Oa(a, s, 2), r !== null && (j1(
              s,
              r,
              a,
              e
            ), jt(r, 2), Yn(r));
            break;
          }
        }
        a = a.return;
      }
  }
  function Kf(e, a, s) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new o4();
      var f = /* @__PURE__ */ new Set();
      r.set(a, f);
    } else
      f = r.get(a), f === void 0 && (f = /* @__PURE__ */ new Set(), r.set(a, f));
    f.has(s) || (zf = !0, f.add(s), e = h4.bind(null, e, a, s), a.then(e, e));
  }
  function h4(e, a, s) {
    var r = e.pingCache;
    r !== null && r.delete(a), e.pingedLanes |= e.suspendedLanes & s, e.warmLanes &= ~s, Jt === e && (Lt & s) === s && (oe === 4 || oe === 3 && (Lt & 62914560) === Lt && 300 > ze() - jo ? (qt & 2) === 0 && ws(e, 0) : Uf |= s, xs === Lt && (xs = 0)), Yn(e);
  }
  function Ty(e, a) {
    a === 0 && (a = at()), e = ci(e, a), e !== null && (jt(e, a), Yn(e));
  }
  function m4(e) {
    var a = e.memoizedState, s = 0;
    a !== null && (s = a.retryLane), Ty(e, s);
  }
  function p4(e, a) {
    var s = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var r = e.stateNode, f = e.memoizedState;
        f !== null && (s = f.retryLane);
        break;
      case 19:
        r = e.stateNode;
        break;
      case 22:
        r = e.stateNode._retryCache;
        break;
      default:
        throw Error(l(314));
    }
    r !== null && r.delete(a), Ty(e, s);
  }
  function y4(e, a) {
    return qe(e, a);
  }
  var No = null, Ts = null, Zf = !1, Oo = !1, Qf = !1, qa = 0;
  function Yn(e) {
    e !== Ts && e.next === null && (Ts === null ? No = Ts = e : Ts = Ts.next = e), Oo = !0, Zf || (Zf = !0, v4());
  }
  function Ol(e, a) {
    if (!Qf && Oo) {
      Qf = !0;
      do
        for (var s = !1, r = No; r !== null; ) {
          if (e !== 0) {
            var f = r.pendingLanes;
            if (f === 0) var m = 0;
            else {
              var S = r.suspendedLanes, R = r.pingedLanes;
              m = (1 << 31 - Ue(42 | e) + 1) - 1, m &= f & ~(S & ~R), m = m & 201326741 ? m & 201326741 | 1 : m ? m | 2 : 0;
            }
            m !== 0 && (s = !0, My(r, m));
          } else
            m = Lt, m = Pi(
              r,
              r === Jt ? m : 0,
              r.cancelPendingCommit !== null || r.timeoutHandle !== -1
            ), (m & 3) === 0 || ii(r, m) || (s = !0, My(r, m));
          r = r.next;
        }
      while (s);
      Qf = !1;
    }
  }
  function g4() {
    jy();
  }
  function jy() {
    Oo = Zf = !1;
    var e = 0;
    qa !== 0 && M4() && (e = qa);
    for (var a = ze(), s = null, r = No; r !== null; ) {
      var f = r.next, m = Ay(r, a);
      m === 0 ? (r.next = null, s === null ? No = f : s.next = f, f === null && (Ts = s)) : (s = r, (e !== 0 || (m & 3) !== 0) && (Oo = !0)), r = f;
    }
    je !== 0 && je !== 5 || Ol(e), qa !== 0 && (qa = 0);
  }
  function Ay(e, a) {
    for (var s = e.suspendedLanes, r = e.pingedLanes, f = e.expirationTimes, m = e.pendingLanes & -62914561; 0 < m; ) {
      var S = 31 - Ue(m), R = 1 << S, k = f[S];
      k === -1 ? ((R & s) === 0 || (R & r) !== 0) && (f[S] = cu(R, a)) : k <= a && (e.expiredLanes |= R), m &= ~R;
    }
    if (a = Jt, s = Lt, s = Pi(
      e,
      e === a ? s : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r = e.callbackNode, s === 0 || e === a && (Pt === 2 || Pt === 9) || e.cancelPendingCommit !== null)
      return r !== null && r !== null && wa(r), e.callbackNode = null, e.callbackPriority = 0;
    if ((s & 3) === 0 || ii(e, s)) {
      if (a = s & -s, a === e.callbackPriority) return a;
      switch (r !== null && wa(r), de(s)) {
        case 2:
        case 8:
          s = Ws;
          break;
        case 32:
          s = zi;
          break;
        case 268435456:
          s = Ca;
          break;
        default:
          s = zi;
      }
      return r = Ey.bind(null, e), s = qe(s, r), e.callbackPriority = a, e.callbackNode = s, a;
    }
    return r !== null && r !== null && wa(r), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Ey(e, a) {
    if (je !== 0 && je !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var s = e.callbackNode;
    if (Do() && e.callbackNode !== s)
      return null;
    var r = Lt;
    return r = Pi(
      e,
      e === Jt ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r === 0 ? null : (oy(e, r, a), Ay(e, ze()), e.callbackNode != null && e.callbackNode === s ? Ey.bind(null, e) : null);
  }
  function My(e, a) {
    if (Do()) return null;
    oy(e, a, !0);
  }
  function v4() {
    R4(function() {
      (qt & 6) !== 0 ? qe(
        su,
        g4
      ) : jy();
    });
  }
  function Ff() {
    if (qa === 0) {
      var e = cs;
      e === 0 && (e = Hi, Hi <<= 1, (Hi & 261888) === 0 && (Hi = 256)), qa = e;
    }
    return qa;
  }
  function _y(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Ur("" + e);
  }
  function Ry(e, a) {
    var s = a.ownerDocument.createElement("input");
    return s.name = a.name, s.value = a.value, e.id && s.setAttribute("form", e.id), a.parentNode.insertBefore(s, a), e = new FormData(e), s.parentNode.removeChild(s), e;
  }
  function b4(e, a, s, r, f) {
    if (a === "submit" && s && s.stateNode === f) {
      var m = _y(
        (f[Ne] || null).action
      ), S = r.submitter;
      S && (a = (a = S[Ne] || null) ? _y(a.formAction) : S.getAttribute("formAction"), a !== null && (m = a, S = null));
      var R = new Pr(
        "action",
        "action",
        null,
        r,
        f
      );
      e.push({
        event: R,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (r.defaultPrevented) {
                if (qa !== 0) {
                  var k = S ? Ry(f, S) : new FormData(f);
                  yf(
                    s,
                    {
                      pending: !0,
                      data: k,
                      method: f.method,
                      action: m
                    },
                    null,
                    k
                  );
                }
              } else
                typeof m == "function" && (R.preventDefault(), k = S ? Ry(f, S) : new FormData(f), yf(
                  s,
                  {
                    pending: !0,
                    data: k,
                    method: f.method,
                    action: m
                  },
                  m,
                  k
                ));
            },
            currentTarget: f
          }
        ]
      });
    }
  }
  for (var If = 0; If < Nu.length; If++) {
    var Jf = Nu[If], x4 = Jf.toLowerCase(), S4 = Jf[0].toUpperCase() + Jf.slice(1);
    En(
      x4,
      "on" + S4
    );
  }
  En(r0, "onAnimationEnd"), En(o0, "onAnimationIteration"), En(c0, "onAnimationStart"), En("dblclick", "onDoubleClick"), En("focusin", "onFocus"), En("focusout", "onBlur"), En(Bw, "onTransitionRun"), En(Vw, "onTransitionStart"), En(zw, "onTransitionCancel"), En(u0, "onTransitionEnd"), Qi("onMouseEnter", ["mouseout", "mouseover"]), Qi("onMouseLeave", ["mouseout", "mouseover"]), Qi("onPointerEnter", ["pointerout", "pointerover"]), Qi("onPointerLeave", ["pointerout", "pointerover"]), si(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), si(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), si("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), si(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), si(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), si(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Ll = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), w4 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ll)
  );
  function Dy(e, a) {
    a = (a & 4) !== 0;
    for (var s = 0; s < e.length; s++) {
      var r = e[s], f = r.event;
      r = r.listeners;
      t: {
        var m = void 0;
        if (a)
          for (var S = r.length - 1; 0 <= S; S--) {
            var R = r[S], k = R.instance, Z = R.currentTarget;
            if (R = R.listener, k !== m && f.isPropagationStopped())
              break t;
            m = R, f.currentTarget = Z;
            try {
              m(f);
            } catch (it) {
              Kr(it);
            }
            f.currentTarget = null, m = k;
          }
        else
          for (S = 0; S < r.length; S++) {
            if (R = r[S], k = R.instance, Z = R.currentTarget, R = R.listener, k !== m && f.isPropagationStopped())
              break t;
            m = R, f.currentTarget = Z;
            try {
              m(f);
            } catch (it) {
              Kr(it);
            }
            f.currentTarget = null, m = k;
          }
      }
    }
  }
  function Ot(e, a) {
    var s = a[uu];
    s === void 0 && (s = a[uu] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    s.has(r) || (Ny(a, e, 2, !1), s.add(r));
  }
  function Wf(e, a, s) {
    var r = 0;
    a && (r |= 4), Ny(
      s,
      e,
      r,
      a
    );
  }
  var Lo = "_reactListening" + Math.random().toString(36).slice(2);
  function td(e) {
    if (!e[Lo]) {
      e[Lo] = !0, jp.forEach(function(s) {
        s !== "selectionchange" && (w4.has(s) || Wf(s, !1, e), Wf(s, !0, e));
      });
      var a = e.nodeType === 9 ? e : e.ownerDocument;
      a === null || a[Lo] || (a[Lo] = !0, Wf("selectionchange", !1, a));
    }
  }
  function Ny(e, a, s, r) {
    switch (rg(a)) {
      case 2:
        var f = F4;
        break;
      case 8:
        f = I4;
        break;
      default:
        f = pd;
    }
    s = f.bind(
      null,
      a,
      s,
      e
    ), f = void 0, !bu || a !== "touchstart" && a !== "touchmove" && a !== "wheel" || (f = !0), r ? f !== void 0 ? e.addEventListener(a, s, {
      capture: !0,
      passive: f
    }) : e.addEventListener(a, s, !0) : f !== void 0 ? e.addEventListener(a, s, {
      passive: f
    }) : e.addEventListener(a, s, !1);
  }
  function ed(e, a, s, r, f) {
    var m = r;
    if ((a & 1) === 0 && (a & 2) === 0 && r !== null)
      t: for (; ; ) {
        if (r === null) return;
        var S = r.tag;
        if (S === 3 || S === 4) {
          var R = r.stateNode.containerInfo;
          if (R === f) break;
          if (S === 4)
            for (S = r.return; S !== null; ) {
              var k = S.tag;
              if ((k === 3 || k === 4) && S.stateNode.containerInfo === f)
                return;
              S = S.return;
            }
          for (; R !== null; ) {
            if (S = Xi(R), S === null) return;
            if (k = S.tag, k === 5 || k === 6 || k === 26 || k === 27) {
              r = m = S;
              continue t;
            }
            R = R.parentNode;
          }
        }
        r = r.return;
      }
    Bp(function() {
      var Z = m, it = gu(s), rt = [];
      t: {
        var Q = f0.get(e);
        if (Q !== void 0) {
          var W = Pr, bt = e;
          switch (e) {
            case "keypress":
              if (qr(s) === 0) break t;
            case "keydown":
            case "keyup":
              W = pw;
              break;
            case "focusin":
              bt = "focus", W = Cu;
              break;
            case "focusout":
              bt = "blur", W = Cu;
              break;
            case "beforeblur":
            case "afterblur":
              W = Cu;
              break;
            case "click":
              if (s.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              W = Up;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              W = aw;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              W = vw;
              break;
            case r0:
            case o0:
            case c0:
              W = lw;
              break;
            case u0:
              W = xw;
              break;
            case "scroll":
            case "scrollend":
              W = ew;
              break;
            case "wheel":
              W = ww;
              break;
            case "copy":
            case "cut":
            case "paste":
              W = ow;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              W = qp;
              break;
            case "toggle":
            case "beforetoggle":
              W = Tw;
          }
          var Ct = (a & 4) !== 0, Zt = !Ct && (e === "scroll" || e === "scrollend"), P = Ct ? Q !== null ? Q + "Capture" : null : Q;
          Ct = [];
          for (var z = Z, K; z !== null; ) {
            var lt = z;
            if (K = lt.stateNode, lt = lt.tag, lt !== 5 && lt !== 26 && lt !== 27 || K === null || P === null || (lt = nl(z, P), lt != null && Ct.push(
              $l(z, lt, K)
            )), Zt) break;
            z = z.return;
          }
          0 < Ct.length && (Q = new W(
            Q,
            bt,
            null,
            s,
            it
          ), rt.push({ event: Q, listeners: Ct }));
        }
      }
      if ((a & 7) === 0) {
        t: {
          if (Q = e === "mouseover" || e === "pointerover", W = e === "mouseout" || e === "pointerout", Q && s !== yu && (bt = s.relatedTarget || s.fromElement) && (Xi(bt) || bt[Gi]))
            break t;
          if ((W || Q) && (Q = it.window === it ? it : (Q = it.ownerDocument) ? Q.defaultView || Q.parentWindow : window, W ? (bt = s.relatedTarget || s.toElement, W = Z, bt = bt ? Xi(bt) : null, bt !== null && (Zt = c(bt), Ct = bt.tag, bt !== Zt || Ct !== 5 && Ct !== 27 && Ct !== 6) && (bt = null)) : (W = null, bt = Z), W !== bt)) {
            if (Ct = Up, lt = "onMouseLeave", P = "onMouseEnter", z = "mouse", (e === "pointerout" || e === "pointerover") && (Ct = qp, lt = "onPointerLeave", P = "onPointerEnter", z = "pointer"), Zt = W == null ? Q : el(W), K = bt == null ? Q : el(bt), Q = new Ct(
              lt,
              z + "leave",
              W,
              s,
              it
            ), Q.target = Zt, Q.relatedTarget = K, lt = null, Xi(it) === Z && (Ct = new Ct(
              P,
              z + "enter",
              bt,
              s,
              it
            ), Ct.target = K, Ct.relatedTarget = Zt, lt = Ct), Zt = lt, W && bt)
              e: {
                for (Ct = C4, P = W, z = bt, K = 0, lt = P; lt; lt = Ct(lt))
                  K++;
                lt = 0;
                for (var wt = z; wt; wt = Ct(wt))
                  lt++;
                for (; 0 < K - lt; )
                  P = Ct(P), K--;
                for (; 0 < lt - K; )
                  z = Ct(z), lt--;
                for (; K--; ) {
                  if (P === z || z !== null && P === z.alternate) {
                    Ct = P;
                    break e;
                  }
                  P = Ct(P), z = Ct(z);
                }
                Ct = null;
              }
            else Ct = null;
            W !== null && Oy(
              rt,
              Q,
              W,
              Ct,
              !1
            ), bt !== null && Zt !== null && Oy(
              rt,
              Zt,
              bt,
              Ct,
              !0
            );
          }
        }
        t: {
          if (Q = Z ? el(Z) : window, W = Q.nodeName && Q.nodeName.toLowerCase(), W === "select" || W === "input" && Q.type === "file")
            var Ut = Fp;
          else if (Zp(Q))
            if (Ip)
              Ut = Lw;
            else {
              Ut = Nw;
              var St = Dw;
            }
          else
            W = Q.nodeName, !W || W.toLowerCase() !== "input" || Q.type !== "checkbox" && Q.type !== "radio" ? Z && pu(Z.elementType) && (Ut = Fp) : Ut = Ow;
          if (Ut && (Ut = Ut(e, Z))) {
            Qp(
              rt,
              Ut,
              s,
              it
            );
            break t;
          }
          St && St(e, Q, Z), e === "focusout" && Z && Q.type === "number" && Z.memoizedProps.value != null && mu(Q, "number", Q.value);
        }
        switch (St = Z ? el(Z) : window, e) {
          case "focusin":
            (Zp(St) || St.contentEditable === "true") && (es = St, _u = Z, ul = null);
            break;
          case "focusout":
            ul = _u = es = null;
            break;
          case "mousedown":
            Ru = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Ru = !1, s0(rt, s, it);
            break;
          case "selectionchange":
            if (kw) break;
          case "keydown":
          case "keyup":
            s0(rt, s, it);
        }
        var Dt;
        if (ju)
          t: {
            switch (e) {
              case "compositionstart":
                var $t = "onCompositionStart";
                break t;
              case "compositionend":
                $t = "onCompositionEnd";
                break t;
              case "compositionupdate":
                $t = "onCompositionUpdate";
                break t;
            }
            $t = void 0;
          }
        else
          ts ? Xp(e, s) && ($t = "onCompositionEnd") : e === "keydown" && s.keyCode === 229 && ($t = "onCompositionStart");
        $t && (Yp && s.locale !== "ko" && (ts || $t !== "onCompositionStart" ? $t === "onCompositionEnd" && ts && (Dt = Vp()) : (Aa = it, xu = "value" in Aa ? Aa.value : Aa.textContent, ts = !0)), St = $o(Z, $t), 0 < St.length && ($t = new Hp(
          $t,
          e,
          null,
          s,
          it
        ), rt.push({ event: $t, listeners: St }), Dt ? $t.data = Dt : (Dt = Kp(s), Dt !== null && ($t.data = Dt)))), (Dt = Aw ? Ew(e, s) : Mw(e, s)) && ($t = $o(Z, "onBeforeInput"), 0 < $t.length && (St = new Hp(
          "onBeforeInput",
          "beforeinput",
          null,
          s,
          it
        ), rt.push({
          event: St,
          listeners: $t
        }), St.data = Dt)), b4(
          rt,
          e,
          Z,
          s,
          it
        );
      }
      Dy(rt, a);
    });
  }
  function $l(e, a, s) {
    return {
      instance: e,
      listener: a,
      currentTarget: s
    };
  }
  function $o(e, a) {
    for (var s = a + "Capture", r = []; e !== null; ) {
      var f = e, m = f.stateNode;
      if (f = f.tag, f !== 5 && f !== 26 && f !== 27 || m === null || (f = nl(e, s), f != null && r.unshift(
        $l(e, f, m)
      ), f = nl(e, a), f != null && r.push(
        $l(e, f, m)
      )), e.tag === 3) return r;
      e = e.return;
    }
    return [];
  }
  function C4(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Oy(e, a, s, r, f) {
    for (var m = a._reactName, S = []; s !== null && s !== r; ) {
      var R = s, k = R.alternate, Z = R.stateNode;
      if (R = R.tag, k !== null && k === r) break;
      R !== 5 && R !== 26 && R !== 27 || Z === null || (k = Z, f ? (Z = nl(s, m), Z != null && S.unshift(
        $l(s, Z, k)
      )) : f || (Z = nl(s, m), Z != null && S.push(
        $l(s, Z, k)
      ))), s = s.return;
    }
    S.length !== 0 && e.push({ event: a, listeners: S });
  }
  var T4 = /\r\n?/g, j4 = /\u0000|\uFFFD/g;
  function Ly(e) {
    return (typeof e == "string" ? e : "" + e).replace(T4, `
`).replace(j4, "");
  }
  function $y(e, a) {
    return a = Ly(a), Ly(e) === a;
  }
  function Kt(e, a, s, r, f, m) {
    switch (s) {
      case "children":
        typeof r == "string" ? a === "body" || a === "textarea" && r === "" || Ii(e, r) : (typeof r == "number" || typeof r == "bigint") && a !== "body" && Ii(e, "" + r);
        break;
      case "className":
        Vr(e, "class", r);
        break;
      case "tabIndex":
        Vr(e, "tabindex", r);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Vr(e, s, r);
        break;
      case "style":
        $p(e, r, m);
        break;
      case "data":
        if (a !== "object") {
          Vr(e, "data", r);
          break;
        }
      case "src":
      case "href":
        if (r === "" && (a !== "a" || s !== "href")) {
          e.removeAttribute(s);
          break;
        }
        if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
          e.removeAttribute(s);
          break;
        }
        r = Ur("" + r), e.setAttribute(s, r);
        break;
      case "action":
      case "formAction":
        if (typeof r == "function") {
          e.setAttribute(
            s,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof m == "function" && (s === "formAction" ? (a !== "input" && Kt(e, a, "name", f.name, f, null), Kt(
            e,
            a,
            "formEncType",
            f.formEncType,
            f,
            null
          ), Kt(
            e,
            a,
            "formMethod",
            f.formMethod,
            f,
            null
          ), Kt(
            e,
            a,
            "formTarget",
            f.formTarget,
            f,
            null
          )) : (Kt(e, a, "encType", f.encType, f, null), Kt(e, a, "method", f.method, f, null), Kt(e, a, "target", f.target, f, null)));
        if (r == null || typeof r == "symbol" || typeof r == "boolean") {
          e.removeAttribute(s);
          break;
        }
        r = Ur("" + r), e.setAttribute(s, r);
        break;
      case "onClick":
        r != null && (e.onclick = Wn);
        break;
      case "onScroll":
        r != null && Ot("scroll", e);
        break;
      case "onScrollEnd":
        r != null && Ot("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r))
            throw Error(l(61));
          if (s = r.__html, s != null) {
            if (f.children != null) throw Error(l(60));
            e.innerHTML = s;
          }
        }
        break;
      case "multiple":
        e.multiple = r && typeof r != "function" && typeof r != "symbol";
        break;
      case "muted":
        e.muted = r && typeof r != "function" && typeof r != "symbol";
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
        if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        s = Ur("" + r), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          s
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
        r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(s, "" + r) : e.removeAttribute(s);
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
        r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(s, "") : e.removeAttribute(s);
        break;
      case "capture":
      case "download":
        r === !0 ? e.setAttribute(s, "") : r !== !1 && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(s, r) : e.removeAttribute(s);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(s, r) : e.removeAttribute(s);
        break;
      case "rowSpan":
      case "start":
        r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(s) : e.setAttribute(s, r);
        break;
      case "popover":
        Ot("beforetoggle", e), Ot("toggle", e), Br(e, "popover", r);
        break;
      case "xlinkActuate":
        Jn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          r
        );
        break;
      case "xlinkArcrole":
        Jn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          r
        );
        break;
      case "xlinkRole":
        Jn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          r
        );
        break;
      case "xlinkShow":
        Jn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          r
        );
        break;
      case "xlinkTitle":
        Jn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          r
        );
        break;
      case "xlinkType":
        Jn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          r
        );
        break;
      case "xmlBase":
        Jn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          r
        );
        break;
      case "xmlLang":
        Jn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          r
        );
        break;
      case "xmlSpace":
        Jn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          r
        );
        break;
      case "is":
        Br(e, "is", r);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < s.length) || s[0] !== "o" && s[0] !== "O" || s[1] !== "n" && s[1] !== "N") && (s = W3.get(s) || s, Br(e, s, r));
    }
  }
  function nd(e, a, s, r, f, m) {
    switch (s) {
      case "style":
        $p(e, r, m);
        break;
      case "dangerouslySetInnerHTML":
        if (r != null) {
          if (typeof r != "object" || !("__html" in r))
            throw Error(l(61));
          if (s = r.__html, s != null) {
            if (f.children != null) throw Error(l(60));
            e.innerHTML = s;
          }
        }
        break;
      case "children":
        typeof r == "string" ? Ii(e, r) : (typeof r == "number" || typeof r == "bigint") && Ii(e, "" + r);
        break;
      case "onScroll":
        r != null && Ot("scroll", e);
        break;
      case "onScrollEnd":
        r != null && Ot("scrollend", e);
        break;
      case "onClick":
        r != null && (e.onclick = Wn);
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
        if (!Ap.hasOwnProperty(s))
          t: {
            if (s[0] === "o" && s[1] === "n" && (f = s.endsWith("Capture"), a = s.slice(2, f ? s.length - 7 : void 0), m = e[Ne] || null, m = m != null ? m[s] : null, typeof m == "function" && e.removeEventListener(a, m, f), typeof r == "function")) {
              typeof m != "function" && m !== null && (s in e ? e[s] = null : e.hasAttribute(s) && e.removeAttribute(s)), e.addEventListener(a, r, f);
              break t;
            }
            s in e ? e[s] = r : r === !0 ? e.setAttribute(s, "") : Br(e, s, r);
          }
    }
  }
  function ke(e, a, s) {
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
        Ot("error", e), Ot("load", e);
        var r = !1, f = !1, m;
        for (m in s)
          if (s.hasOwnProperty(m)) {
            var S = s[m];
            if (S != null)
              switch (m) {
                case "src":
                  r = !0;
                  break;
                case "srcSet":
                  f = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(l(137, a));
                default:
                  Kt(e, a, m, S, s, null);
              }
          }
        f && Kt(e, a, "srcSet", s.srcSet, s, null), r && Kt(e, a, "src", s.src, s, null);
        return;
      case "input":
        Ot("invalid", e);
        var R = m = S = f = null, k = null, Z = null;
        for (r in s)
          if (s.hasOwnProperty(r)) {
            var it = s[r];
            if (it != null)
              switch (r) {
                case "name":
                  f = it;
                  break;
                case "type":
                  S = it;
                  break;
                case "checked":
                  k = it;
                  break;
                case "defaultChecked":
                  Z = it;
                  break;
                case "value":
                  m = it;
                  break;
                case "defaultValue":
                  R = it;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (it != null)
                    throw Error(l(137, a));
                  break;
                default:
                  Kt(e, a, r, it, s, null);
              }
          }
        Dp(
          e,
          m,
          R,
          k,
          Z,
          S,
          f,
          !1
        );
        return;
      case "select":
        Ot("invalid", e), r = S = m = null;
        for (f in s)
          if (s.hasOwnProperty(f) && (R = s[f], R != null))
            switch (f) {
              case "value":
                m = R;
                break;
              case "defaultValue":
                S = R;
                break;
              case "multiple":
                r = R;
              default:
                Kt(e, a, f, R, s, null);
            }
        a = m, s = S, e.multiple = !!r, a != null ? Fi(e, !!r, a, !1) : s != null && Fi(e, !!r, s, !0);
        return;
      case "textarea":
        Ot("invalid", e), m = f = r = null;
        for (S in s)
          if (s.hasOwnProperty(S) && (R = s[S], R != null))
            switch (S) {
              case "value":
                r = R;
                break;
              case "defaultValue":
                f = R;
                break;
              case "children":
                m = R;
                break;
              case "dangerouslySetInnerHTML":
                if (R != null) throw Error(l(91));
                break;
              default:
                Kt(e, a, S, R, s, null);
            }
        Op(e, r, f, m);
        return;
      case "option":
        for (k in s)
          if (s.hasOwnProperty(k) && (r = s[k], r != null))
            switch (k) {
              case "selected":
                e.selected = r && typeof r != "function" && typeof r != "symbol";
                break;
              default:
                Kt(e, a, k, r, s, null);
            }
        return;
      case "dialog":
        Ot("beforetoggle", e), Ot("toggle", e), Ot("cancel", e), Ot("close", e);
        break;
      case "iframe":
      case "object":
        Ot("load", e);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Ll.length; r++)
          Ot(Ll[r], e);
        break;
      case "image":
        Ot("error", e), Ot("load", e);
        break;
      case "details":
        Ot("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Ot("error", e), Ot("load", e);
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
        for (Z in s)
          if (s.hasOwnProperty(Z) && (r = s[Z], r != null))
            switch (Z) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(l(137, a));
              default:
                Kt(e, a, Z, r, s, null);
            }
        return;
      default:
        if (pu(a)) {
          for (it in s)
            s.hasOwnProperty(it) && (r = s[it], r !== void 0 && nd(
              e,
              a,
              it,
              r,
              s,
              void 0
            ));
          return;
        }
    }
    for (R in s)
      s.hasOwnProperty(R) && (r = s[R], r != null && Kt(e, a, R, r, s, null));
  }
  function A4(e, a, s, r) {
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
        var f = null, m = null, S = null, R = null, k = null, Z = null, it = null;
        for (W in s) {
          var rt = s[W];
          if (s.hasOwnProperty(W) && rt != null)
            switch (W) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                k = rt;
              default:
                r.hasOwnProperty(W) || Kt(e, a, W, null, r, rt);
            }
        }
        for (var Q in r) {
          var W = r[Q];
          if (rt = s[Q], r.hasOwnProperty(Q) && (W != null || rt != null))
            switch (Q) {
              case "type":
                m = W;
                break;
              case "name":
                f = W;
                break;
              case "checked":
                Z = W;
                break;
              case "defaultChecked":
                it = W;
                break;
              case "value":
                S = W;
                break;
              case "defaultValue":
                R = W;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (W != null)
                  throw Error(l(137, a));
                break;
              default:
                W !== rt && Kt(
                  e,
                  a,
                  Q,
                  W,
                  r,
                  rt
                );
            }
        }
        hu(
          e,
          S,
          R,
          k,
          Z,
          it,
          m,
          f
        );
        return;
      case "select":
        W = S = R = Q = null;
        for (m in s)
          if (k = s[m], s.hasOwnProperty(m) && k != null)
            switch (m) {
              case "value":
                break;
              case "multiple":
                W = k;
              default:
                r.hasOwnProperty(m) || Kt(
                  e,
                  a,
                  m,
                  null,
                  r,
                  k
                );
            }
        for (f in r)
          if (m = r[f], k = s[f], r.hasOwnProperty(f) && (m != null || k != null))
            switch (f) {
              case "value":
                Q = m;
                break;
              case "defaultValue":
                R = m;
                break;
              case "multiple":
                S = m;
              default:
                m !== k && Kt(
                  e,
                  a,
                  f,
                  m,
                  r,
                  k
                );
            }
        a = R, s = S, r = W, Q != null ? Fi(e, !!s, Q, !1) : !!r != !!s && (a != null ? Fi(e, !!s, a, !0) : Fi(e, !!s, s ? [] : "", !1));
        return;
      case "textarea":
        W = Q = null;
        for (R in s)
          if (f = s[R], s.hasOwnProperty(R) && f != null && !r.hasOwnProperty(R))
            switch (R) {
              case "value":
                break;
              case "children":
                break;
              default:
                Kt(e, a, R, null, r, f);
            }
        for (S in r)
          if (f = r[S], m = s[S], r.hasOwnProperty(S) && (f != null || m != null))
            switch (S) {
              case "value":
                Q = f;
                break;
              case "defaultValue":
                W = f;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (f != null) throw Error(l(91));
                break;
              default:
                f !== m && Kt(e, a, S, f, r, m);
            }
        Np(e, Q, W);
        return;
      case "option":
        for (var bt in s)
          if (Q = s[bt], s.hasOwnProperty(bt) && Q != null && !r.hasOwnProperty(bt))
            switch (bt) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Kt(
                  e,
                  a,
                  bt,
                  null,
                  r,
                  Q
                );
            }
        for (k in r)
          if (Q = r[k], W = s[k], r.hasOwnProperty(k) && Q !== W && (Q != null || W != null))
            switch (k) {
              case "selected":
                e.selected = Q && typeof Q != "function" && typeof Q != "symbol";
                break;
              default:
                Kt(
                  e,
                  a,
                  k,
                  Q,
                  r,
                  W
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
        for (var Ct in s)
          Q = s[Ct], s.hasOwnProperty(Ct) && Q != null && !r.hasOwnProperty(Ct) && Kt(e, a, Ct, null, r, Q);
        for (Z in r)
          if (Q = r[Z], W = s[Z], r.hasOwnProperty(Z) && Q !== W && (Q != null || W != null))
            switch (Z) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (Q != null)
                  throw Error(l(137, a));
                break;
              default:
                Kt(
                  e,
                  a,
                  Z,
                  Q,
                  r,
                  W
                );
            }
        return;
      default:
        if (pu(a)) {
          for (var Zt in s)
            Q = s[Zt], s.hasOwnProperty(Zt) && Q !== void 0 && !r.hasOwnProperty(Zt) && nd(
              e,
              a,
              Zt,
              void 0,
              r,
              Q
            );
          for (it in r)
            Q = r[it], W = s[it], !r.hasOwnProperty(it) || Q === W || Q === void 0 && W === void 0 || nd(
              e,
              a,
              it,
              Q,
              r,
              W
            );
          return;
        }
    }
    for (var P in s)
      Q = s[P], s.hasOwnProperty(P) && Q != null && !r.hasOwnProperty(P) && Kt(e, a, P, null, r, Q);
    for (rt in r)
      Q = r[rt], W = s[rt], !r.hasOwnProperty(rt) || Q === W || Q == null && W == null || Kt(e, a, rt, Q, r, W);
  }
  function ky(e) {
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
  function E4() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, a = 0, s = performance.getEntriesByType("resource"), r = 0; r < s.length; r++) {
        var f = s[r], m = f.transferSize, S = f.initiatorType, R = f.duration;
        if (m && R && ky(S)) {
          for (S = 0, R = f.responseEnd, r += 1; r < s.length; r++) {
            var k = s[r], Z = k.startTime;
            if (Z > R) break;
            var it = k.transferSize, rt = k.initiatorType;
            it && ky(rt) && (k = k.responseEnd, S += it * (k < R ? 1 : (R - Z) / (k - Z)));
          }
          if (--r, a += 8 * (m + S) / (f.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return a / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var ad = null, id = null;
  function ko(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function By(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Vy(e, a) {
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
  function sd(e, a) {
    return e === "textarea" || e === "noscript" || typeof a.children == "string" || typeof a.children == "number" || typeof a.children == "bigint" || typeof a.dangerouslySetInnerHTML == "object" && a.dangerouslySetInnerHTML !== null && a.dangerouslySetInnerHTML.__html != null;
  }
  var ld = null;
  function M4() {
    var e = window.event;
    return e && e.type === "popstate" ? e === ld ? !1 : (ld = e, !0) : (ld = null, !1);
  }
  var zy = typeof setTimeout == "function" ? setTimeout : void 0, _4 = typeof clearTimeout == "function" ? clearTimeout : void 0, Uy = typeof Promise == "function" ? Promise : void 0, R4 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Uy < "u" ? function(e) {
    return Uy.resolve(null).then(e).catch(D4);
  } : zy;
  function D4(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Ya(e) {
    return e === "head";
  }
  function Hy(e, a) {
    var s = a, r = 0;
    do {
      var f = s.nextSibling;
      if (e.removeChild(s), f && f.nodeType === 8)
        if (s = f.data, s === "/$" || s === "/&") {
          if (r === 0) {
            e.removeChild(f), Ms(a);
            return;
          }
          r--;
        } else if (s === "$" || s === "$?" || s === "$~" || s === "$!" || s === "&")
          r++;
        else if (s === "html")
          kl(e.ownerDocument.documentElement);
        else if (s === "head") {
          s = e.ownerDocument.head, kl(s);
          for (var m = s.firstChild; m; ) {
            var S = m.nextSibling, R = m.nodeName;
            m[tl] || R === "SCRIPT" || R === "STYLE" || R === "LINK" && m.rel.toLowerCase() === "stylesheet" || s.removeChild(m), m = S;
          }
        } else
          s === "body" && kl(e.ownerDocument.body);
      s = f;
    } while (s);
    Ms(a);
  }
  function qy(e, a) {
    var s = e;
    e = 0;
    do {
      var r = s.nextSibling;
      if (s.nodeType === 1 ? a ? (s._stashedDisplay = s.style.display, s.style.display = "none") : (s.style.display = s._stashedDisplay || "", s.getAttribute("style") === "" && s.removeAttribute("style")) : s.nodeType === 3 && (a ? (s._stashedText = s.nodeValue, s.nodeValue = "") : s.nodeValue = s._stashedText || ""), r && r.nodeType === 8)
        if (s = r.data, s === "/$") {
          if (e === 0) break;
          e--;
        } else
          s !== "$" && s !== "$?" && s !== "$~" && s !== "$!" || e++;
      s = r;
    } while (s);
  }
  function rd(e) {
    var a = e.firstChild;
    for (a && a.nodeType === 10 && (a = a.nextSibling); a; ) {
      var s = a;
      switch (a = a.nextSibling, s.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          rd(s), fu(s);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (s.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(s);
    }
  }
  function N4(e, a, s, r) {
    for (; e.nodeType === 1; ) {
      var f = s;
      if (e.nodeName.toLowerCase() !== a.toLowerCase()) {
        if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (r) {
        if (!e[tl])
          switch (a) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (m = e.getAttribute("rel"), m === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (m !== f.rel || e.getAttribute("href") !== (f.href == null || f.href === "" ? null : f.href) || e.getAttribute("crossorigin") !== (f.crossOrigin == null ? null : f.crossOrigin) || e.getAttribute("title") !== (f.title == null ? null : f.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (m = e.getAttribute("src"), (m !== (f.src == null ? null : f.src) || e.getAttribute("type") !== (f.type == null ? null : f.type) || e.getAttribute("crossorigin") !== (f.crossOrigin == null ? null : f.crossOrigin)) && m && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (a === "input" && e.type === "hidden") {
        var m = f.name == null ? null : "" + f.name;
        if (f.type === "hidden" && e.getAttribute("name") === m)
          return e;
      } else return e;
      if (e = wn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function O4(e, a, s) {
    if (a === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !s || (e = wn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Yy(e, a) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = wn(e.nextSibling), e === null)) return null;
    return e;
  }
  function od(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function cd(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function L4(e, a) {
    var s = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = a;
    else if (e.data !== "$?" || s.readyState !== "loading")
      a();
    else {
      var r = function() {
        a(), s.removeEventListener("DOMContentLoaded", r);
      };
      s.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
    }
  }
  function wn(e) {
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
  var ud = null;
  function Py(e) {
    e = e.nextSibling;
    for (var a = 0; e; ) {
      if (e.nodeType === 8) {
        var s = e.data;
        if (s === "/$" || s === "/&") {
          if (a === 0)
            return wn(e.nextSibling);
          a--;
        } else
          s !== "$" && s !== "$!" && s !== "$?" && s !== "$~" && s !== "&" || a++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Gy(e) {
    e = e.previousSibling;
    for (var a = 0; e; ) {
      if (e.nodeType === 8) {
        var s = e.data;
        if (s === "$" || s === "$!" || s === "$?" || s === "$~" || s === "&") {
          if (a === 0) return e;
          a--;
        } else s !== "/$" && s !== "/&" || a++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Xy(e, a, s) {
    switch (a = ko(s), e) {
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
  function kl(e) {
    for (var a = e.attributes; a.length; )
      e.removeAttributeNode(a[0]);
    fu(e);
  }
  var Cn = /* @__PURE__ */ new Map(), Ky = /* @__PURE__ */ new Set();
  function Bo(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var pa = X.d;
  X.d = {
    f: $4,
    r: k4,
    D: B4,
    C: V4,
    L: z4,
    m: U4,
    X: q4,
    S: H4,
    M: Y4
  };
  function $4() {
    var e = pa.f(), a = Mo();
    return e || a;
  }
  function k4(e) {
    var a = Ki(e);
    a !== null && a.tag === 5 && a.type === "form" ? u1(a) : pa.r(e);
  }
  var js = typeof document > "u" ? null : document;
  function Zy(e, a, s) {
    var r = js;
    if (r && typeof a == "string" && a) {
      var f = pn(a);
      f = 'link[rel="' + e + '"][href="' + f + '"]', typeof s == "string" && (f += '[crossorigin="' + s + '"]'), Ky.has(f) || (Ky.add(f), e = { rel: e, crossOrigin: s, href: a }, r.querySelector(f) === null && (a = r.createElement("link"), ke(a, "link", e), Re(a), r.head.appendChild(a)));
    }
  }
  function B4(e) {
    pa.D(e), Zy("dns-prefetch", e, null);
  }
  function V4(e, a) {
    pa.C(e, a), Zy("preconnect", e, a);
  }
  function z4(e, a, s) {
    pa.L(e, a, s);
    var r = js;
    if (r && e && a) {
      var f = 'link[rel="preload"][as="' + pn(a) + '"]';
      a === "image" && s && s.imageSrcSet ? (f += '[imagesrcset="' + pn(
        s.imageSrcSet
      ) + '"]', typeof s.imageSizes == "string" && (f += '[imagesizes="' + pn(
        s.imageSizes
      ) + '"]')) : f += '[href="' + pn(e) + '"]';
      var m = f;
      switch (a) {
        case "style":
          m = As(e);
          break;
        case "script":
          m = Es(e);
      }
      Cn.has(m) || (e = v(
        {
          rel: "preload",
          href: a === "image" && s && s.imageSrcSet ? void 0 : e,
          as: a
        },
        s
      ), Cn.set(m, e), r.querySelector(f) !== null || a === "style" && r.querySelector(Bl(m)) || a === "script" && r.querySelector(Vl(m)) || (a = r.createElement("link"), ke(a, "link", e), Re(a), r.head.appendChild(a)));
    }
  }
  function U4(e, a) {
    pa.m(e, a);
    var s = js;
    if (s && e) {
      var r = a && typeof a.as == "string" ? a.as : "script", f = 'link[rel="modulepreload"][as="' + pn(r) + '"][href="' + pn(e) + '"]', m = f;
      switch (r) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          m = Es(e);
      }
      if (!Cn.has(m) && (e = v({ rel: "modulepreload", href: e }, a), Cn.set(m, e), s.querySelector(f) === null)) {
        switch (r) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (s.querySelector(Vl(m)))
              return;
        }
        r = s.createElement("link"), ke(r, "link", e), Re(r), s.head.appendChild(r);
      }
    }
  }
  function H4(e, a, s) {
    pa.S(e, a, s);
    var r = js;
    if (r && e) {
      var f = Zi(r).hoistableStyles, m = As(e);
      a = a || "default";
      var S = f.get(m);
      if (!S) {
        var R = { loading: 0, preload: null };
        if (S = r.querySelector(
          Bl(m)
        ))
          R.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": a },
            s
          ), (s = Cn.get(m)) && fd(e, s);
          var k = S = r.createElement("link");
          Re(k), ke(k, "link", e), k._p = new Promise(function(Z, it) {
            k.onload = Z, k.onerror = it;
          }), k.addEventListener("load", function() {
            R.loading |= 1;
          }), k.addEventListener("error", function() {
            R.loading |= 2;
          }), R.loading |= 4, Vo(S, a, r);
        }
        S = {
          type: "stylesheet",
          instance: S,
          count: 1,
          state: R
        }, f.set(m, S);
      }
    }
  }
  function q4(e, a) {
    pa.X(e, a);
    var s = js;
    if (s && e) {
      var r = Zi(s).hoistableScripts, f = Es(e), m = r.get(f);
      m || (m = s.querySelector(Vl(f)), m || (e = v({ src: e, async: !0 }, a), (a = Cn.get(f)) && dd(e, a), m = s.createElement("script"), Re(m), ke(m, "link", e), s.head.appendChild(m)), m = {
        type: "script",
        instance: m,
        count: 1,
        state: null
      }, r.set(f, m));
    }
  }
  function Y4(e, a) {
    pa.M(e, a);
    var s = js;
    if (s && e) {
      var r = Zi(s).hoistableScripts, f = Es(e), m = r.get(f);
      m || (m = s.querySelector(Vl(f)), m || (e = v({ src: e, async: !0, type: "module" }, a), (a = Cn.get(f)) && dd(e, a), m = s.createElement("script"), Re(m), ke(m, "link", e), s.head.appendChild(m)), m = {
        type: "script",
        instance: m,
        count: 1,
        state: null
      }, r.set(f, m));
    }
  }
  function Qy(e, a, s, r) {
    var f = (f = ct.current) ? Bo(f) : null;
    if (!f) throw Error(l(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof s.precedence == "string" && typeof s.href == "string" ? (a = As(s.href), s = Zi(
          f
        ).hoistableStyles, r = s.get(a), r || (r = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, s.set(a, r)), r) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (s.rel === "stylesheet" && typeof s.href == "string" && typeof s.precedence == "string") {
          e = As(s.href);
          var m = Zi(
            f
          ).hoistableStyles, S = m.get(e);
          if (S || (f = f.ownerDocument || f, S = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, m.set(e, S), (m = f.querySelector(
            Bl(e)
          )) && !m._p && (S.instance = m, S.state.loading = 5), Cn.has(e) || (s = {
            rel: "preload",
            as: "style",
            href: s.href,
            crossOrigin: s.crossOrigin,
            integrity: s.integrity,
            media: s.media,
            hrefLang: s.hrefLang,
            referrerPolicy: s.referrerPolicy
          }, Cn.set(e, s), m || P4(
            f,
            e,
            s,
            S.state
          ))), a && r === null)
            throw Error(l(528, ""));
          return S;
        }
        if (a && r !== null)
          throw Error(l(529, ""));
        return null;
      case "script":
        return a = s.async, s = s.src, typeof s == "string" && a && typeof a != "function" && typeof a != "symbol" ? (a = Es(s), s = Zi(
          f
        ).hoistableScripts, r = s.get(a), r || (r = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, s.set(a, r)), r) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(l(444, e));
    }
  }
  function As(e) {
    return 'href="' + pn(e) + '"';
  }
  function Bl(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Fy(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function P4(e, a, s, r) {
    e.querySelector('link[rel="preload"][as="style"][' + a + "]") ? r.loading = 1 : (a = e.createElement("link"), r.preload = a, a.addEventListener("load", function() {
      return r.loading |= 1;
    }), a.addEventListener("error", function() {
      return r.loading |= 2;
    }), ke(a, "link", s), Re(a), e.head.appendChild(a));
  }
  function Es(e) {
    return '[src="' + pn(e) + '"]';
  }
  function Vl(e) {
    return "script[async]" + e;
  }
  function Iy(e, a, s) {
    if (a.count++, a.instance === null)
      switch (a.type) {
        case "style":
          var r = e.querySelector(
            'style[data-href~="' + pn(s.href) + '"]'
          );
          if (r)
            return a.instance = r, Re(r), r;
          var f = v({}, s, {
            "data-href": s.href,
            "data-precedence": s.precedence,
            href: null,
            precedence: null
          });
          return r = (e.ownerDocument || e).createElement(
            "style"
          ), Re(r), ke(r, "style", f), Vo(r, s.precedence, e), a.instance = r;
        case "stylesheet":
          f = As(s.href);
          var m = e.querySelector(
            Bl(f)
          );
          if (m)
            return a.state.loading |= 4, a.instance = m, Re(m), m;
          r = Fy(s), (f = Cn.get(f)) && fd(r, f), m = (e.ownerDocument || e).createElement("link"), Re(m);
          var S = m;
          return S._p = new Promise(function(R, k) {
            S.onload = R, S.onerror = k;
          }), ke(m, "link", r), a.state.loading |= 4, Vo(m, s.precedence, e), a.instance = m;
        case "script":
          return m = Es(s.src), (f = e.querySelector(
            Vl(m)
          )) ? (a.instance = f, Re(f), f) : (r = s, (f = Cn.get(m)) && (r = v({}, s), dd(r, f)), e = e.ownerDocument || e, f = e.createElement("script"), Re(f), ke(f, "link", r), e.head.appendChild(f), a.instance = f);
        case "void":
          return null;
        default:
          throw Error(l(443, a.type));
      }
    else
      a.type === "stylesheet" && (a.state.loading & 4) === 0 && (r = a.instance, a.state.loading |= 4, Vo(r, s.precedence, e));
    return a.instance;
  }
  function Vo(e, a, s) {
    for (var r = s.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), f = r.length ? r[r.length - 1] : null, m = f, S = 0; S < r.length; S++) {
      var R = r[S];
      if (R.dataset.precedence === a) m = R;
      else if (m !== f) break;
    }
    m ? m.parentNode.insertBefore(e, m.nextSibling) : (a = s.nodeType === 9 ? s.head : s, a.insertBefore(e, a.firstChild));
  }
  function fd(e, a) {
    e.crossOrigin == null && (e.crossOrigin = a.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = a.referrerPolicy), e.title == null && (e.title = a.title);
  }
  function dd(e, a) {
    e.crossOrigin == null && (e.crossOrigin = a.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = a.referrerPolicy), e.integrity == null && (e.integrity = a.integrity);
  }
  var zo = null;
  function Jy(e, a, s) {
    if (zo === null) {
      var r = /* @__PURE__ */ new Map(), f = zo = /* @__PURE__ */ new Map();
      f.set(s, r);
    } else
      f = zo, r = f.get(s), r || (r = /* @__PURE__ */ new Map(), f.set(s, r));
    if (r.has(e)) return r;
    for (r.set(e, null), s = s.getElementsByTagName(e), f = 0; f < s.length; f++) {
      var m = s[f];
      if (!(m[tl] || m[Wt] || e === "link" && m.getAttribute("rel") === "stylesheet") && m.namespaceURI !== "http://www.w3.org/2000/svg") {
        var S = m.getAttribute(a) || "";
        S = e + S;
        var R = r.get(S);
        R ? R.push(m) : r.set(S, [m]);
      }
    }
    return r;
  }
  function Wy(e, a, s) {
    e = e.ownerDocument || e, e.head.insertBefore(
      s,
      a === "title" ? e.querySelector("head > title") : null
    );
  }
  function G4(e, a, s) {
    if (s === 1 || a.itemProp != null) return !1;
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
  function tg(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function X4(e, a, s, r) {
    if (s.type === "stylesheet" && (typeof r.media != "string" || matchMedia(r.media).matches !== !1) && (s.state.loading & 4) === 0) {
      if (s.instance === null) {
        var f = As(r.href), m = a.querySelector(
          Bl(f)
        );
        if (m) {
          a = m._p, a !== null && typeof a == "object" && typeof a.then == "function" && (e.count++, e = Uo.bind(e), a.then(e, e)), s.state.loading |= 4, s.instance = m, Re(m);
          return;
        }
        m = a.ownerDocument || a, r = Fy(r), (f = Cn.get(f)) && fd(r, f), m = m.createElement("link"), Re(m);
        var S = m;
        S._p = new Promise(function(R, k) {
          S.onload = R, S.onerror = k;
        }), ke(m, "link", r), s.instance = m;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(s, a), (a = s.state.preload) && (s.state.loading & 3) === 0 && (e.count++, s = Uo.bind(e), a.addEventListener("load", s), a.addEventListener("error", s));
    }
  }
  var hd = 0;
  function K4(e, a) {
    return e.stylesheets && e.count === 0 && qo(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(s) {
      var r = setTimeout(function() {
        if (e.stylesheets && qo(e, e.stylesheets), e.unsuspend) {
          var m = e.unsuspend;
          e.unsuspend = null, m();
        }
      }, 6e4 + a);
      0 < e.imgBytes && hd === 0 && (hd = 62500 * E4());
      var f = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && qo(e, e.stylesheets), e.unsuspend)) {
            var m = e.unsuspend;
            e.unsuspend = null, m();
          }
        },
        (e.imgBytes > hd ? 50 : 800) + a
      );
      return e.unsuspend = s, function() {
        e.unsuspend = null, clearTimeout(r), clearTimeout(f);
      };
    } : null;
  }
  function Uo() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) qo(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var Ho = null;
  function qo(e, a) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Ho = /* @__PURE__ */ new Map(), a.forEach(Z4, e), Ho = null, Uo.call(e));
  }
  function Z4(e, a) {
    if (!(a.state.loading & 4)) {
      var s = Ho.get(e);
      if (s) var r = s.get(null);
      else {
        s = /* @__PURE__ */ new Map(), Ho.set(e, s);
        for (var f = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), m = 0; m < f.length; m++) {
          var S = f[m];
          (S.nodeName === "LINK" || S.getAttribute("media") !== "not all") && (s.set(S.dataset.precedence, S), r = S);
        }
        r && s.set(null, r);
      }
      f = a.instance, S = f.getAttribute("data-precedence"), m = s.get(S) || r, m === r && s.set(null, f), s.set(S, f), this.count++, r = Uo.bind(this), f.addEventListener("load", r), f.addEventListener("error", r), m ? m.parentNode.insertBefore(f, m.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(f, e.firstChild)), a.state.loading |= 4;
    }
  }
  var zl = {
    $$typeof: E,
    Provider: null,
    Consumer: null,
    _currentValue: J,
    _currentValue2: J,
    _threadCount: 0
  };
  function Q4(e, a, s, r, f, m, S, R, k) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Bt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Bt(0), this.hiddenUpdates = Bt(null), this.identifierPrefix = r, this.onUncaughtError = f, this.onCaughtError = m, this.onRecoverableError = S, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = k, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function eg(e, a, s, r, f, m, S, R, k, Z, it, rt) {
    return e = new Q4(
      e,
      a,
      s,
      S,
      k,
      Z,
      it,
      rt,
      R
    ), a = 1, m === !0 && (a |= 24), m = ln(3, null, null, a), e.current = m, m.stateNode = e, a = Gu(), a.refCount++, e.pooledCache = a, a.refCount++, m.memoizedState = {
      element: r,
      isDehydrated: s,
      cache: a
    }, Qu(m), e;
  }
  function ng(e) {
    return e ? (e = is, e) : is;
  }
  function ag(e, a, s, r, f, m) {
    f = ng(f), r.context === null ? r.context = f : r.pendingContext = f, r = Na(a), r.payload = { element: s }, m = m === void 0 ? null : m, m !== null && (r.callback = m), s = Oa(e, r, a), s !== null && (en(s, e, a), gl(s, e, a));
  }
  function ig(e, a) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var s = e.retryLane;
      e.retryLane = s !== 0 && s < a ? s : a;
    }
  }
  function md(e, a) {
    ig(e, a), (e = e.alternate) && ig(e, a);
  }
  function sg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var a = ci(e, 67108864);
      a !== null && en(a, e, 67108864), md(e, 67108864);
    }
  }
  function lg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var a = fn();
      a = _e(a);
      var s = ci(e, a);
      s !== null && en(s, e, a), md(e, a);
    }
  }
  var Yo = !0;
  function F4(e, a, s, r) {
    var f = $.T;
    $.T = null;
    var m = X.p;
    try {
      X.p = 2, pd(e, a, s, r);
    } finally {
      X.p = m, $.T = f;
    }
  }
  function I4(e, a, s, r) {
    var f = $.T;
    $.T = null;
    var m = X.p;
    try {
      X.p = 8, pd(e, a, s, r);
    } finally {
      X.p = m, $.T = f;
    }
  }
  function pd(e, a, s, r) {
    if (Yo) {
      var f = yd(r);
      if (f === null)
        ed(
          e,
          a,
          r,
          Po,
          s
        ), og(e, r);
      else if (W4(
        f,
        e,
        a,
        s,
        r
      ))
        r.stopPropagation();
      else if (og(e, r), a & 4 && -1 < J4.indexOf(e)) {
        for (; f !== null; ) {
          var m = Ki(f);
          if (m !== null)
            switch (m.tag) {
              case 3:
                if (m = m.stateNode, m.current.memoizedState.isDehydrated) {
                  var S = Fn(m.pendingLanes);
                  if (S !== 0) {
                    var R = m;
                    for (R.pendingLanes |= 2, R.entangledLanes |= 2; S; ) {
                      var k = 1 << 31 - Ue(S);
                      R.entanglements[1] |= k, S &= ~k;
                    }
                    Yn(m), (qt & 6) === 0 && (Ao = ze() + 500, Ol(0));
                  }
                }
                break;
              case 31:
              case 13:
                R = ci(m, 2), R !== null && en(R, m, 2), Mo(), md(m, 2);
            }
          if (m = yd(r), m === null && ed(
            e,
            a,
            r,
            Po,
            s
          ), m === f) break;
          f = m;
        }
        f !== null && r.stopPropagation();
      } else
        ed(
          e,
          a,
          r,
          null,
          s
        );
    }
  }
  function yd(e) {
    return e = gu(e), gd(e);
  }
  var Po = null;
  function gd(e) {
    if (Po = null, e = Xi(e), e !== null) {
      var a = c(e);
      if (a === null) e = null;
      else {
        var s = a.tag;
        if (s === 13) {
          if (e = u(a), e !== null) return e;
          e = null;
        } else if (s === 31) {
          if (e = d(a), e !== null) return e;
          e = null;
        } else if (s === 3) {
          if (a.stateNode.current.memoizedState.isDehydrated)
            return a.tag === 3 ? a.stateNode.containerInfo : null;
          e = null;
        } else a !== e && (e = null);
      }
    }
    return Po = e, null;
  }
  function rg(e) {
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
        switch ($r()) {
          case su:
            return 2;
          case Ws:
            return 8;
          case zi:
          case kr:
            return 32;
          case Ca:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var vd = !1, Pa = null, Ga = null, Xa = null, Ul = /* @__PURE__ */ new Map(), Hl = /* @__PURE__ */ new Map(), Ka = [], J4 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function og(e, a) {
    switch (e) {
      case "focusin":
      case "focusout":
        Pa = null;
        break;
      case "dragenter":
      case "dragleave":
        Ga = null;
        break;
      case "mouseover":
      case "mouseout":
        Xa = null;
        break;
      case "pointerover":
      case "pointerout":
        Ul.delete(a.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Hl.delete(a.pointerId);
    }
  }
  function ql(e, a, s, r, f, m) {
    return e === null || e.nativeEvent !== m ? (e = {
      blockedOn: a,
      domEventName: s,
      eventSystemFlags: r,
      nativeEvent: m,
      targetContainers: [f]
    }, a !== null && (a = Ki(a), a !== null && sg(a)), e) : (e.eventSystemFlags |= r, a = e.targetContainers, f !== null && a.indexOf(f) === -1 && a.push(f), e);
  }
  function W4(e, a, s, r, f) {
    switch (a) {
      case "focusin":
        return Pa = ql(
          Pa,
          e,
          a,
          s,
          r,
          f
        ), !0;
      case "dragenter":
        return Ga = ql(
          Ga,
          e,
          a,
          s,
          r,
          f
        ), !0;
      case "mouseover":
        return Xa = ql(
          Xa,
          e,
          a,
          s,
          r,
          f
        ), !0;
      case "pointerover":
        var m = f.pointerId;
        return Ul.set(
          m,
          ql(
            Ul.get(m) || null,
            e,
            a,
            s,
            r,
            f
          )
        ), !0;
      case "gotpointercapture":
        return m = f.pointerId, Hl.set(
          m,
          ql(
            Hl.get(m) || null,
            e,
            a,
            s,
            r,
            f
          )
        ), !0;
    }
    return !1;
  }
  function cg(e) {
    var a = Xi(e.target);
    if (a !== null) {
      var s = c(a);
      if (s !== null) {
        if (a = s.tag, a === 13) {
          if (a = u(s), a !== null) {
            e.blockedOn = a, In(e.priority, function() {
              lg(s);
            });
            return;
          }
        } else if (a === 31) {
          if (a = d(s), a !== null) {
            e.blockedOn = a, In(e.priority, function() {
              lg(s);
            });
            return;
          }
        } else if (a === 3 && s.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = s.tag === 3 ? s.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Go(e) {
    if (e.blockedOn !== null) return !1;
    for (var a = e.targetContainers; 0 < a.length; ) {
      var s = yd(e.nativeEvent);
      if (s === null) {
        s = e.nativeEvent;
        var r = new s.constructor(
          s.type,
          s
        );
        yu = r, s.target.dispatchEvent(r), yu = null;
      } else
        return a = Ki(s), a !== null && sg(a), e.blockedOn = s, !1;
      a.shift();
    }
    return !0;
  }
  function ug(e, a, s) {
    Go(e) && s.delete(a);
  }
  function t5() {
    vd = !1, Pa !== null && Go(Pa) && (Pa = null), Ga !== null && Go(Ga) && (Ga = null), Xa !== null && Go(Xa) && (Xa = null), Ul.forEach(ug), Hl.forEach(ug);
  }
  function Xo(e, a) {
    e.blockedOn === a && (e.blockedOn = null, vd || (vd = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      t5
    )));
  }
  var Ko = null;
  function fg(e) {
    Ko !== e && (Ko = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        Ko === e && (Ko = null);
        for (var a = 0; a < e.length; a += 3) {
          var s = e[a], r = e[a + 1], f = e[a + 2];
          if (typeof r != "function") {
            if (gd(r || s) === null)
              continue;
            break;
          }
          var m = Ki(s);
          m !== null && (e.splice(a, 3), a -= 3, yf(
            m,
            {
              pending: !0,
              data: f,
              method: s.method,
              action: r
            },
            r,
            f
          ));
        }
      }
    ));
  }
  function Ms(e) {
    function a(k) {
      return Xo(k, e);
    }
    Pa !== null && Xo(Pa, e), Ga !== null && Xo(Ga, e), Xa !== null && Xo(Xa, e), Ul.forEach(a), Hl.forEach(a);
    for (var s = 0; s < Ka.length; s++) {
      var r = Ka[s];
      r.blockedOn === e && (r.blockedOn = null);
    }
    for (; 0 < Ka.length && (s = Ka[0], s.blockedOn === null); )
      cg(s), s.blockedOn === null && Ka.shift();
    if (s = (e.ownerDocument || e).$$reactFormReplay, s != null)
      for (r = 0; r < s.length; r += 3) {
        var f = s[r], m = s[r + 1], S = f[Ne] || null;
        if (typeof m == "function")
          S || fg(s);
        else if (S) {
          var R = null;
          if (m && m.hasAttribute("formAction")) {
            if (f = m, S = m[Ne] || null)
              R = S.formAction;
            else if (gd(f) !== null) continue;
          } else R = S.action;
          typeof R == "function" ? s[r + 1] = R : (s.splice(r, 3), r -= 3), fg(s);
        }
      }
  }
  function dg() {
    function e(m) {
      m.canIntercept && m.info === "react-transition" && m.intercept({
        handler: function() {
          return new Promise(function(S) {
            return f = S;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function a() {
      f !== null && (f(), f = null), r || setTimeout(s, 20);
    }
    function s() {
      if (!r && !navigation.transition) {
        var m = navigation.currentEntry;
        m && m.url != null && navigation.navigate(m.url, {
          state: m.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var r = !1, f = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", a), navigation.addEventListener("navigateerror", a), setTimeout(s, 100), function() {
        r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", a), navigation.removeEventListener("navigateerror", a), f !== null && (f(), f = null);
      };
    }
  }
  function bd(e) {
    this._internalRoot = e;
  }
  Zo.prototype.render = bd.prototype.render = function(e) {
    var a = this._internalRoot;
    if (a === null) throw Error(l(409));
    var s = a.current, r = fn();
    ag(s, r, e, a, null, null);
  }, Zo.prototype.unmount = bd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var a = e.containerInfo;
      ag(e.current, 2, null, e, null, null), Mo(), a[Gi] = null;
    }
  };
  function Zo(e) {
    this._internalRoot = e;
  }
  Zo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var a = ja();
      e = { blockedOn: null, target: e, priority: a };
      for (var s = 0; s < Ka.length && a !== 0 && a < Ka[s].priority; s++) ;
      Ka.splice(s, 0, e), s === 0 && cg(e);
    }
  };
  var hg = t.version;
  if (hg !== "19.2.7")
    throw Error(
      l(
        527,
        hg,
        "19.2.7"
      )
    );
  X.findDOMNode = function(e) {
    var a = e._reactInternals;
    if (a === void 0)
      throw typeof e.render == "function" ? Error(l(188)) : (e = Object.keys(e).join(","), Error(l(268, e)));
    return e = y(a), e = e !== null ? g(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var e5 = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: $,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Qo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Qo.isDisabled && Qo.supportsFiber)
      try {
        Ta = Qo.inject(
          e5
        ), Ye = Qo;
      } catch {
      }
  }
  return Pl.createRoot = function(e, a) {
    if (!o(e)) throw Error(l(299));
    var s = !1, r = "", f = x1, m = S1, S = w1;
    return a != null && (a.unstable_strictMode === !0 && (s = !0), a.identifierPrefix !== void 0 && (r = a.identifierPrefix), a.onUncaughtError !== void 0 && (f = a.onUncaughtError), a.onCaughtError !== void 0 && (m = a.onCaughtError), a.onRecoverableError !== void 0 && (S = a.onRecoverableError)), a = eg(
      e,
      1,
      !1,
      null,
      null,
      s,
      r,
      null,
      f,
      m,
      S,
      dg
    ), e[Gi] = a.current, td(e), new bd(a);
  }, Pl.hydrateRoot = function(e, a, s) {
    if (!o(e)) throw Error(l(299));
    var r = !1, f = "", m = x1, S = S1, R = w1, k = null;
    return s != null && (s.unstable_strictMode === !0 && (r = !0), s.identifierPrefix !== void 0 && (f = s.identifierPrefix), s.onUncaughtError !== void 0 && (m = s.onUncaughtError), s.onCaughtError !== void 0 && (S = s.onCaughtError), s.onRecoverableError !== void 0 && (R = s.onRecoverableError), s.formState !== void 0 && (k = s.formState)), a = eg(
      e,
      1,
      !0,
      a,
      s ?? null,
      r,
      f,
      k,
      m,
      S,
      R,
      dg
    ), a.context = ng(null), s = a.current, r = fn(), r = _e(r), f = Na(r), f.callback = null, Oa(s, f, r), s = r, a.current.lanes = s, jt(a, s), Yn(a), e[Gi] = a.current, td(e), new Zo(a);
  }, Pl.version = "19.2.7", Pl;
}
var Cg;
function h5() {
  if (Cg) return wd.exports;
  Cg = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (t) {
        console.error(t);
      }
  }
  return n(), wd.exports = d5(), wd.exports;
}
var Ds = h5(), Ad = { exports: {} }, Ed = {};
var Tg;
function m5() {
  if (Tg) return Ed;
  Tg = 1;
  var n = jr().__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  return Ed.c = function(t) {
    return n.H.useMemoCache(t);
  }, Ed;
}
var jg;
function p5() {
  return jg || (jg = 1, Ad.exports = m5()), Ad.exports;
}
var At = p5(), Md = { exports: {} }, _d = {};
var Ag;
function y5() {
  if (Ag) return _d;
  Ag = 1;
  var n = jr();
  function t(v, b) {
    return v === b && (v !== 0 || 1 / v === 1 / b) || v !== v && b !== b;
  }
  var i = typeof Object.is == "function" ? Object.is : t, l = n.useState, o = n.useEffect, c = n.useLayoutEffect, u = n.useDebugValue;
  function d(v, b) {
    var j = b(), w = l({ inst: { value: j, getSnapshot: b } }), T = w[0].inst, x = w[1];
    return c(
      function() {
        T.value = j, T.getSnapshot = b, p(T) && x({ inst: T });
      },
      [v, j, b]
    ), o(
      function() {
        return p(T) && x({ inst: T }), v(function() {
          p(T) && x({ inst: T });
        });
      },
      [v]
    ), u(j), j;
  }
  function p(v) {
    var b = v.getSnapshot;
    v = v.value;
    try {
      var j = b();
      return !i(v, j);
    } catch {
      return !0;
    }
  }
  function y(v, b) {
    return b();
  }
  var g = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? y : d;
  return _d.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : g, _d;
}
var Eg;
function g5() {
  return Eg || (Eg = 1, Md.exports = y5()), Md.exports;
}
var v5 = g5();
const b5 = o5.useInsertionEffect, x5 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", S5 = x5 ? C.useLayoutEffect : C.useEffect, w5 = b5 || S5, pb = (n) => {
  const t = C.useRef([n, (...i) => t[0](...i)]).current;
  return w5(() => {
    t[0] = n;
  }), t[1];
};
function cm(n, t) {
  n.indexOf(t) === -1 && n.push(t);
}
function Hs(n, t) {
  const i = n.indexOf(t);
  i > -1 && n.splice(i, 1);
}
const Kn = (n, t, i) => i > t ? t : i < n ? n : i;
let um = () => {
};
const Ja = {}, yb = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n), gb = (n) => typeof n == "object" && n !== null, vb = (n) => /^0[^.\s]+$/u.test(n);
// @__NO_SIDE_EFFECTS__
function bb(n) {
  let t;
  return () => (t === void 0 && (t = n()), t);
}
const An = /* @__NO_SIDE_EFFECTS__ */ (n) => n, Ar = (...n) => n.reduce((t, i) => (l) => i(t(l))), qs = /* @__NO_SIDE_EFFECTS__ */ (n, t, i) => {
  const l = t - n;
  return l ? (i - n) / l : 1;
};
class fm {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return cm(this.subscriptions, t), () => Hs(this.subscriptions, t);
  }
  notify(t, i, l) {
    const o = this.subscriptions.length;
    if (o)
      if (o === 1)
        this.subscriptions[0](t, i, l);
      else
        for (let c = 0; c < o; c++) {
          const u = this.subscriptions[c];
          u && u(t, i, l);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const an = /* @__NO_SIDE_EFFECTS__ */ (n) => n * 1e3, jn = /* @__NO_SIDE_EFFECTS__ */ (n) => n / 1e3, xb = /* @__NO_SIDE_EFFECTS__ */ (n, t) => t ? n * (1e3 / t) : 0, C5 = (n, t, i) => {
  const l = t - n;
  return ((i - n) % l + l) % l + n;
}, Sb = (n, t, i) => (((1 - 3 * i + 3 * t) * n + (3 * i - 6 * t)) * n + 3 * t) * n, T5 = 1e-7, j5 = 12;
function A5(n, t, i, l, o) {
  let c, u, d = 0;
  do
    u = t + (i - t) / 2, c = Sb(u, l, o) - n, c > 0 ? i = u : t = u;
  while (Math.abs(c) > T5 && ++d < j5);
  return u;
}
// @__NO_SIDE_EFFECTS__
function Er(n, t, i, l) {
  if (n === t && i === l)
    return An;
  const o = (c) => A5(c, 0, 1, n, i);
  return (c) => c === 0 || c === 1 ? c : Sb(o(c), t, l);
}
const wb = /* @__NO_SIDE_EFFECTS__ */ (n) => (t) => t <= 0.5 ? n(2 * t) / 2 : (2 - n(2 * (1 - t))) / 2, dm = /* @__NO_SIDE_EFFECTS__ */ (n) => (t) => 1 - n(1 - t), Cb = /* @__PURE__ */ Er(0.33, 1.53, 0.69, 0.99), hm = /* @__PURE__ */ dm(Cb), Tb = /* @__PURE__ */ wb(hm), jb = (n) => n >= 1 ? 1 : (n *= 2) < 1 ? 0.5 * hm(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))), mm = (n) => 1 - Math.sin(Math.acos(n)), Ab = /* @__PURE__ */ dm(mm), Eb = /* @__PURE__ */ wb(mm), E5 = /* @__PURE__ */ Er(0.42, 0, 1, 1), M5 = /* @__PURE__ */ Er(0, 0, 0.58, 1), Mb = /* @__PURE__ */ Er(0.42, 0, 0.58, 1), _b = /* @__NO_SIDE_EFFECTS__ */ (n) => Array.isArray(n) && typeof n[0] != "number";
// @__NO_SIDE_EFFECTS__
function Rb(n, t) {
  return /* @__PURE__ */ _b(n) ? n[C5(0, n.length, t)] : n;
}
const Db = /* @__NO_SIDE_EFFECTS__ */ (n) => Array.isArray(n) && typeof n[0] == "number", _5 = {
  linear: An,
  easeIn: E5,
  easeInOut: Mb,
  easeOut: M5,
  circIn: mm,
  circInOut: Eb,
  circOut: Ab,
  backIn: hm,
  backInOut: Tb,
  backOut: Cb,
  anticipate: jb
}, R5 = (n) => typeof n == "string", Mg = (n) => {
  if (/* @__PURE__ */ Db(n)) {
    um(n.length === 4);
    const [t, i, l, o] = n;
    return /* @__PURE__ */ Er(t, i, l, o);
  } else if (R5(n))
    return _5[n];
  return n;
}, pm = C.createContext({}), ym = C.createContext({ strict: !1 }), Ys = C.createContext({
  transformPagePoint: (n) => n,
  isStatic: !1,
  reducedMotion: "never"
}), Zc = /* @__PURE__ */ C.createContext({}), Fo = [
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
function D5(n) {
  let t = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), l = !1, o = !1;
  const c = /* @__PURE__ */ new WeakSet();
  let u = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function d(y) {
    c.has(y) && (p.schedule(y), n()), y(u);
  }
  const p = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (y, g = !1, v = !1) => {
      const j = v && l ? t : i;
      return g && c.add(y), j.add(y), y;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (y) => {
      i.delete(y), c.delete(y);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (y) => {
      if (u = y, l) {
        o = !0;
        return;
      }
      l = !0;
      const g = t;
      t = i, i = g, t.forEach(d), t.clear(), l = !1, o && (o = !1, p.process(y));
    }
  };
  return p;
}
const N5 = 40;
function Nb(n, t) {
  let i = !1, l = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, c = () => i = !0, u = Fo.reduce((E, M) => (E[M] = D5(c), E), {}), { setup: d, read: p, resolveKeyframes: y, preUpdate: g, update: v, preRender: b, render: j, postRender: w } = u, T = () => {
    const E = Ja.useManualTiming, M = E ? o.timestamp : performance.now();
    i = !1, E || (o.delta = l ? 1e3 / 60 : Math.max(Math.min(M - o.timestamp, N5), 1)), o.timestamp = M, o.isProcessing = !0, d.process(o), p.process(o), y.process(o), g.process(o), v.process(o), b.process(o), j.process(o), w.process(o), o.isProcessing = !1, i && t && (l = !1, n(T));
  }, x = () => {
    i = !0, l = !0, o.isProcessing || n(T);
  };
  return { schedule: Fo.reduce((E, M) => {
    const O = u[M];
    return E[M] = (D, N = !1, V = !1) => (i || x(), O.schedule(D, N, V)), E;
  }, {}), cancel: (E) => {
    for (let M = 0; M < Fo.length; M++)
      u[Fo[M]].cancel(E);
  }, state: o, steps: u };
}
const { schedule: It, cancel: ba, state: Be, steps: Rd } = /* @__PURE__ */ Nb(typeof requestAnimationFrame < "u" ? requestAnimationFrame : An, !0);
let pc;
function O5() {
  pc = void 0;
}
const Ke = {
  now: () => (pc === void 0 && Ke.set(Be.isProcessing || Ja.useManualTiming ? Be.timestamp : performance.now()), pc),
  set: (n) => {
    pc = n, queueMicrotask(O5);
  }
}, Ob = (n) => (t) => typeof t == "string" && t.startsWith(n), Lb = /* @__PURE__ */ Ob("--"), L5 = /* @__PURE__ */ Ob("var(--"), gm = (n) => L5(n) ? $5.test(n.split("/*")[0].trim()) : !1, $5 = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function _g(n) {
  return typeof n != "string" ? !1 : n.split("/*")[0].includes("var(--");
}
const Qs = {
  test: (n) => typeof n == "number",
  parse: parseFloat,
  transform: (n) => n
}, mr = {
  ...Qs,
  transform: (n) => Kn(0, 1, n)
}, Io = {
  ...Qs,
  default: 1
}, tr = (n) => Math.round(n * 1e5) / 1e5, vm = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function k5(n) {
  return n == null;
}
const B5 = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, bm = (n, t) => (i) => !!(typeof i == "string" && B5.test(i) && i.startsWith(n) || t && !k5(i) && Object.prototype.hasOwnProperty.call(i, t)), $b = (n, t, i) => (l) => {
  if (typeof l != "string")
    return l;
  const [o, c, u, d] = l.match(vm);
  return {
    [n]: parseFloat(o),
    [t]: parseFloat(c),
    [i]: parseFloat(u),
    alpha: d !== void 0 ? parseFloat(d) : 1
  };
}, V5 = (n) => Kn(0, 255, n), Dd = {
  ...Qs,
  transform: (n) => Math.round(V5(n))
}, Ri = {
  test: /* @__PURE__ */ bm("rgb", "red"),
  parse: /* @__PURE__ */ $b("red", "green", "blue"),
  transform: ({ red: n, green: t, blue: i, alpha: l = 1 }) => "rgba(" + Dd.transform(n) + ", " + Dd.transform(t) + ", " + Dd.transform(i) + ", " + tr(mr.transform(l)) + ")"
};
function z5(n) {
  let t = "", i = "", l = "", o = "";
  return n.length > 5 ? (t = n.substring(1, 3), i = n.substring(3, 5), l = n.substring(5, 7), o = n.substring(7, 9)) : (t = n.substring(1, 2), i = n.substring(2, 3), l = n.substring(3, 4), o = n.substring(4, 5), t += t, i += i, l += l, o += o), {
    red: parseInt(t, 16),
    green: parseInt(i, 16),
    blue: parseInt(l, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const hh = {
  test: /* @__PURE__ */ bm("#"),
  parse: z5,
  transform: Ri.transform
}, Mr = /* @__NO_SIDE_EFFECTS__ */ (n) => ({
  test: (t) => typeof t == "string" && t.endsWith(n) && t.split(" ").length === 1,
  parse: parseFloat,
  transform: (t) => `${t}${n}`
}), ya = /* @__PURE__ */ Mr("deg"), Xn = /* @__PURE__ */ Mr("%"), xt = /* @__PURE__ */ Mr("px"), U5 = /* @__PURE__ */ Mr("vh"), H5 = /* @__PURE__ */ Mr("vw"), Rg = {
  ...Xn,
  parse: (n) => Xn.parse(n) / 100,
  transform: (n) => Xn.transform(n * 100)
}, Os = {
  test: /* @__PURE__ */ bm("hsl", "hue"),
  parse: /* @__PURE__ */ $b("hue", "saturation", "lightness"),
  transform: ({ hue: n, saturation: t, lightness: i, alpha: l = 1 }) => "hsla(" + Math.round(n) + ", " + Xn.transform(tr(t)) + ", " + Xn.transform(tr(i)) + ", " + tr(mr.transform(l)) + ")"
}, Ce = {
  test: (n) => Ri.test(n) || hh.test(n) || Os.test(n),
  parse: (n) => Ri.test(n) ? Ri.parse(n) : Os.test(n) ? Os.parse(n) : hh.parse(n),
  transform: (n) => typeof n == "string" ? n : n.hasOwnProperty("red") ? Ri.transform(n) : Os.transform(n),
  getAnimatableNone: (n) => {
    const t = Ce.parse(n);
    return t.alpha = 0, Ce.transform(t);
  }
}, q5 = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function Y5(n) {
  return isNaN(n) && typeof n == "string" && (n.match(vm)?.length || 0) + (n.match(q5)?.length || 0) > 0;
}
const kb = "number", Bb = "color", P5 = "var", G5 = "var(", Dg = "${}", X5 = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Ps(n) {
  const t = n.toString(), i = [], l = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let c = 0;
  const d = t.replace(X5, (p) => (Ce.test(p) ? (l.color.push(c), o.push(Bb), i.push(Ce.parse(p))) : p.startsWith(G5) ? (l.var.push(c), o.push(P5), i.push(p)) : (l.number.push(c), o.push(kb), i.push(parseFloat(p))), ++c, Dg)).split(Dg);
  return { values: i, split: d, indexes: l, types: o };
}
function K5(n) {
  return Ps(n).values;
}
function Vb({ split: n, types: t }) {
  const i = n.length;
  return (l) => {
    let o = "";
    for (let c = 0; c < i; c++)
      if (o += n[c], l[c] !== void 0) {
        const u = t[c];
        u === kb ? o += tr(l[c]) : u === Bb ? o += Ce.transform(l[c]) : o += l[c];
      }
    return o;
  };
}
function Z5(n) {
  return Vb(Ps(n));
}
const Q5 = (n) => typeof n == "number" ? 0 : Ce.test(n) ? Ce.getAnimatableNone(n) : n, F5 = (n, t) => typeof n == "number" ? t?.trim().endsWith("/") ? n : 0 : Q5(n);
function I5(n) {
  const t = Ps(n);
  return Vb(t)(t.values.map((l, o) => F5(l, t.split[o])));
}
const kn = {
  test: Y5,
  parse: K5,
  createTransformer: Z5,
  getAnimatableNone: I5
};
function Nd(n, t, i) {
  return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? n + (t - n) * 6 * i : i < 1 / 2 ? t : i < 2 / 3 ? n + (t - n) * (2 / 3 - i) * 6 : n;
}
function J5({ hue: n, saturation: t, lightness: i, alpha: l }) {
  n /= 360, t /= 100, i /= 100;
  let o = 0, c = 0, u = 0;
  if (!t)
    o = c = u = i;
  else {
    const d = i < 0.5 ? i * (1 + t) : i + t - i * t, p = 2 * i - d;
    o = Nd(p, d, n + 1 / 3), c = Nd(p, d, n), u = Nd(p, d, n - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(c * 255),
    blue: Math.round(u * 255),
    alpha: l
  };
}
function Dc(n, t) {
  return (i) => i > 0 ? t : n;
}
const Ft = (n, t, i) => n + (t - n) * i, Od = (n, t, i) => {
  const l = n * n, o = i * (t * t - l) + l;
  return o < 0 ? 0 : Math.sqrt(o);
}, W5 = [hh, Ri, Os], t9 = (n) => W5.find((t) => t.test(n));
function Ng(n) {
  const t = t9(n);
  if (!t)
    return !1;
  let i = t.parse(n);
  return t === Os && (i = J5(i)), i;
}
const Og = (n, t) => {
  const i = Ng(n), l = Ng(t);
  if (!i || !l)
    return Dc(n, t);
  const o = { ...i };
  return (c) => (o.red = Od(i.red, l.red, c), o.green = Od(i.green, l.green, c), o.blue = Od(i.blue, l.blue, c), o.alpha = Ft(i.alpha, l.alpha, c), Ri.transform(o));
}, mh = /* @__PURE__ */ new Set(["none", "hidden"]);
function e9(n, t) {
  return mh.has(n) ? (i) => i <= 0 ? n : t : (i) => i >= 1 ? t : n;
}
function n9(n, t) {
  return (i) => Ft(n, t, i);
}
function xm(n) {
  return typeof n == "number" ? n9 : typeof n == "string" ? gm(n) ? Dc : Ce.test(n) ? Og : s9 : Array.isArray(n) ? zb : typeof n == "object" ? Ce.test(n) ? Og : a9 : Dc;
}
function zb(n, t) {
  const i = [...n], l = i.length, o = n.map((c, u) => xm(c)(c, t[u]));
  return (c) => {
    for (let u = 0; u < l; u++)
      i[u] = o[u](c);
    return i;
  };
}
function a9(n, t) {
  const i = { ...n, ...t }, l = {};
  for (const o in i)
    n[o] !== void 0 && t[o] !== void 0 && (l[o] = xm(n[o])(n[o], t[o]));
  return (o) => {
    for (const c in l)
      i[c] = l[c](o);
    return i;
  };
}
function i9(n, t) {
  const i = [], l = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < t.values.length; o++) {
    const c = t.types[o], u = n.indexes[c][l[c]], d = n.values[u] ?? 0;
    i[o] = d, l[c]++;
  }
  return i;
}
const s9 = (n, t) => {
  const i = kn.createTransformer(t), l = Ps(n), o = Ps(t);
  return l.indexes.var.length === o.indexes.var.length && l.indexes.color.length === o.indexes.color.length && l.indexes.number.length >= o.indexes.number.length ? mh.has(n) && !o.values.length || mh.has(t) && !l.values.length ? e9(n, t) : Ar(zb(i9(l, o), o.values), i) : Dc(n, t);
};
function Ub(n, t, i) {
  return typeof n == "number" && typeof t == "number" && typeof i == "number" ? Ft(n, t, i) : xm(n)(n, t);
}
const l9 = (n) => {
  const t = ({ timestamp: i }) => n(i);
  return {
    start: (i = !0) => It.update(t, i),
    stop: () => ba(t),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Be.isProcessing ? Be.timestamp : Ke.now()
  };
}, Hb = (n, t, i = 10) => {
  let l = "";
  const o = Math.max(Math.round(t / i), 2);
  for (let c = 0; c < o; c++)
    l += Math.round(n(c / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${l.substring(0, l.length - 2)})`;
}, Nc = 2e4;
function Sm(n) {
  let t = 0;
  const i = 50;
  let l = n.next(t);
  for (; !l.done && t < Nc; )
    t += i, l = n.next(t);
  return t >= Nc ? 1 / 0 : t;
}
function qb(n, t = 100, i) {
  const l = i({ ...n, keyframes: [0, t] }), o = Math.min(Sm(l), Nc);
  return {
    type: "keyframes",
    ease: (c) => l.next(o * c).value / t,
    duration: /* @__PURE__ */ jn(o)
  };
}
const ce = {
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
function ph(n, t) {
  return n * Math.sqrt(1 - t * t);
}
const r9 = 12;
function o9(n, t, i) {
  let l = i;
  for (let o = 1; o < r9; o++)
    l = l - n(l) / t(l);
  return l;
}
const Ld = 1e-3;
function c9({ duration: n = ce.duration, bounce: t = ce.bounce, velocity: i = ce.velocity, mass: l = ce.mass }) {
  let o, c, u = 1 - t;
  u = Kn(ce.minDamping, ce.maxDamping, u), n = Kn(ce.minDuration, ce.maxDuration, /* @__PURE__ */ jn(n)), u < 1 ? (o = (y) => {
    const g = y * u, v = g * n, b = g - i, j = ph(y, u), w = Math.exp(-v);
    return Ld - b / j * w;
  }, c = (y) => {
    const v = y * u * n, b = v * i + i, j = Math.pow(u, 2) * Math.pow(y, 2) * n, w = Math.exp(-v), T = ph(Math.pow(y, 2), u);
    return (-o(y) + Ld > 0 ? -1 : 1) * ((b - j) * w) / T;
  }) : (o = (y) => {
    const g = Math.exp(-y * n), v = (y - i) * n + 1;
    return -Ld + g * v;
  }, c = (y) => {
    const g = Math.exp(-y * n), v = (i - y) * (n * n);
    return g * v;
  });
  const d = 5 / n, p = o9(o, c, d);
  if (n = /* @__PURE__ */ an(n), isNaN(p))
    return {
      stiffness: ce.stiffness,
      damping: ce.damping,
      duration: n
    };
  {
    const y = Math.pow(p, 2) * l;
    return {
      stiffness: y,
      damping: u * 2 * Math.sqrt(l * y),
      duration: n
    };
  }
}
const u9 = ["duration", "bounce"], f9 = ["stiffness", "damping", "mass"];
function Lg(n, t) {
  return t.some((i) => n[i] !== void 0);
}
function d9(n) {
  let t = {
    velocity: ce.velocity,
    stiffness: ce.stiffness,
    damping: ce.damping,
    mass: ce.mass,
    isResolvedFromDuration: !1,
    ...n
  };
  if (!Lg(n, f9) && Lg(n, u9))
    if (t.velocity = 0, n.visualDuration) {
      const i = n.visualDuration, l = 2 * Math.PI / (i * 1.2), o = l * l, c = 2 * Kn(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(o);
      t = {
        ...t,
        mass: ce.mass,
        stiffness: o,
        damping: c
      };
    } else {
      const i = c9({ ...n, velocity: 0 });
      t = {
        ...t,
        ...i,
        mass: ce.mass
      }, t.isResolvedFromDuration = !0;
    }
  return t;
}
function pr(n = ce.visualDuration, t = ce.bounce) {
  const i = typeof n != "object" ? {
    visualDuration: n,
    keyframes: [0, 1],
    bounce: t
  } : n;
  let { restSpeed: l, restDelta: o } = i;
  const c = i.keyframes[0], u = i.keyframes[i.keyframes.length - 1], d = { done: !1, value: c }, { stiffness: p, damping: y, mass: g, duration: v, velocity: b, isResolvedFromDuration: j } = d9({
    ...i,
    velocity: -/* @__PURE__ */ jn(i.velocity || 0)
  }), w = b || 0, T = y / (2 * Math.sqrt(p * g)), x = u - c, A = /* @__PURE__ */ jn(Math.sqrt(p / g)), _ = Math.abs(x) < 5;
  l || (l = _ ? ce.restSpeed.granular : ce.restSpeed.default), o || (o = _ ? ce.restDelta.granular : ce.restDelta.default);
  let E, M, O, D, N, V;
  if (T < 1)
    O = ph(A, T), D = (w + T * A * x) / O, E = (B) => {
      const U = Math.exp(-T * A * B);
      return u - U * (D * Math.sin(O * B) + x * Math.cos(O * B));
    }, N = T * A * D + x * O, V = T * A * x - D * O, M = (B) => Math.exp(-T * A * B) * (N * Math.sin(O * B) + V * Math.cos(O * B));
  else if (T === 1) {
    E = (U) => u - Math.exp(-A * U) * (x + (w + A * x) * U);
    const B = w + A * x;
    M = (U) => Math.exp(-A * U) * (A * B * U - w);
  } else {
    const B = A * Math.sqrt(T * T - 1);
    E = (st) => {
      const I = Math.exp(-T * A * st), $ = Math.min(B * st, 300);
      return u - I * ((w + T * A * x) * Math.sinh($) + B * x * Math.cosh($)) / B;
    };
    const U = (w + T * A * x) / B, F = T * A * U - x * B, Y = T * A * x - U * B;
    M = (st) => {
      const I = Math.exp(-T * A * st), $ = Math.min(B * st, 300);
      return I * (F * Math.sinh($) + Y * Math.cosh($));
    };
  }
  const H = {
    calculatedDuration: j && v || null,
    velocity: (B) => /* @__PURE__ */ an(M(B)),
    next: (B) => {
      if (!j && T < 1) {
        const F = Math.exp(-T * A * B), Y = Math.sin(O * B), st = Math.cos(O * B), I = u - F * (D * Y + x * st), $ = /* @__PURE__ */ an(F * (N * Y + V * st));
        return d.done = Math.abs($) <= l && Math.abs(u - I) <= o, d.value = d.done ? u : I, d;
      }
      const U = E(B);
      if (j)
        d.done = B >= v;
      else {
        const F = /* @__PURE__ */ an(M(B));
        d.done = Math.abs(F) <= l && Math.abs(u - U) <= o;
      }
      return d.value = d.done ? u : U, d;
    },
    toString: () => {
      const B = Math.min(Sm(H), Nc), U = Hb((F) => H.next(B * F).value, B, 30);
      return B + "ms " + U;
    },
    toTransition: () => {
    }
  };
  return H;
}
pr.applyToOptions = (n) => {
  const t = qb(n, 100, pr);
  return n.ease = t.ease, n.duration = /* @__PURE__ */ an(t.duration), n.type = "keyframes", n;
};
const h9 = 5;
function Yb(n, t, i) {
  const l = Math.max(t - h9, 0);
  return /* @__PURE__ */ xb(i - n(l), t - l);
}
function yh({ keyframes: n, velocity: t = 0, power: i = 0.8, timeConstant: l = 325, bounceDamping: o = 10, bounceStiffness: c = 500, modifyTarget: u, min: d, max: p, restDelta: y = 0.5, restSpeed: g }) {
  const v = n[0], b = {
    done: !1,
    value: v
  }, j = (V) => d !== void 0 && V < d || p !== void 0 && V > p, w = (V) => d === void 0 ? p : p === void 0 || Math.abs(d - V) < Math.abs(p - V) ? d : p;
  let T = i * t;
  const x = v + T, A = u === void 0 ? x : u(x);
  A !== x && (T = A - v);
  const _ = (V) => -T * Math.exp(-V / l), E = (V) => A + _(V), M = (V) => {
    const H = _(V), B = E(V);
    b.done = Math.abs(H) <= y, b.value = b.done ? A : B;
  };
  let O, D;
  const N = (V) => {
    j(b.value) && (O = V, D = pr({
      keyframes: [b.value, w(b.value)],
      velocity: Yb(E, V, b.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: c,
      restDelta: y,
      restSpeed: g
    }));
  };
  return N(0), {
    calculatedDuration: null,
    next: (V) => {
      let H = !1;
      return !D && O === void 0 && (H = !0, M(V), N(V)), O !== void 0 && V >= O ? D.next(V - O) : (!H && M(V), b);
    }
  };
}
function m9(n, t, i) {
  const l = [], o = i || Ja.mix || Ub, c = n.length - 1;
  for (let u = 0; u < c; u++) {
    let d = o(n[u], n[u + 1]);
    if (t) {
      const p = Array.isArray(t) ? t[u] || An : t;
      d = Ar(p, d);
    }
    l.push(d);
  }
  return l;
}
function Pb(n, t, { clamp: i = !0, ease: l, mixer: o } = {}) {
  const c = n.length;
  if (um(c === t.length), c === 1)
    return () => t[0];
  if (c === 2 && t[0] === t[1])
    return () => t[1];
  const u = n[0] === n[1];
  n[0] > n[c - 1] && (n = [...n].reverse(), t = [...t].reverse());
  const d = m9(t, l, o), p = d.length, y = (g) => {
    if (u && g < n[0])
      return t[0];
    let v = 0;
    if (p > 1)
      for (; v < n.length - 2 && !(g < n[v + 1]); v++)
        ;
    const b = /* @__PURE__ */ qs(n[v], n[v + 1], g);
    return d[v](b);
  };
  return i ? (g) => y(Kn(n[0], n[c - 1], g)) : y;
}
function Gb(n, t) {
  const i = n[n.length - 1];
  for (let l = 1; l <= t; l++) {
    const o = /* @__PURE__ */ qs(0, t, l);
    n.push(Ft(i, 1, o));
  }
}
function Xb(n) {
  const t = [0];
  return Gb(t, n.length - 1), t;
}
function p9(n, t) {
  return n.map((i) => i * t);
}
function y9(n, t) {
  return n.map(() => t || Mb).splice(0, n.length - 1);
}
function er({ duration: n = 300, keyframes: t, times: i, ease: l = "easeInOut" }) {
  const o = /* @__PURE__ */ _b(l) ? l.map(Mg) : Mg(l), c = {
    done: !1,
    value: t[0]
  }, u = p9(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    i && i.length === t.length ? i : Xb(t),
    n
  ), d = Pb(u, t, {
    ease: Array.isArray(o) ? o : y9(t, o)
  });
  return {
    calculatedDuration: n,
    next: (p) => (c.value = d(p), c.done = p >= n, c)
  };
}
const g9 = (n) => n !== null;
function Qc(n, { repeat: t, repeatType: i = "loop" }, l, o = 1) {
  const c = n.filter(g9), d = o < 0 || t && i !== "loop" && t % 2 === 1 ? 0 : c.length - 1;
  return !d || l === void 0 ? c[d] : l;
}
const v9 = {
  decay: yh,
  inertia: yh,
  tween: er,
  keyframes: er,
  spring: pr
};
function Kb(n) {
  typeof n.type == "string" && (n.type = v9[n.type]);
}
class wm {
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
  then(t, i) {
    return this.finished.then(t, i);
  }
}
const b9 = (n) => n / 100;
class Oc extends wm {
  constructor(t) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: i } = this.options;
      i && i.updatedAt !== Ke.now() && this.tick(Ke.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = t, this.initAnimation(), this.play(), t.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: t } = this;
    Kb(t);
    const { type: i = er, repeat: l = 0, repeatDelay: o = 0, repeatType: c, velocity: u = 0 } = t;
    let { keyframes: d } = t;
    const p = i || er;
    p !== er && typeof d[0] != "number" && (this.mixKeyframes = Ar(b9, Ub(d[0], d[1])), d = [0, 100]);
    const y = p({ ...t, keyframes: d });
    c === "mirror" && (this.mirroredGenerator = p({
      ...t,
      keyframes: [...d].reverse(),
      velocity: -u
    })), y.calculatedDuration === null && (y.calculatedDuration = Sm(y));
    const { calculatedDuration: g } = y;
    this.calculatedDuration = g, this.resolvedDuration = g + o, this.totalDuration = this.resolvedDuration * (l + 1) - o, this.generator = y;
  }
  updateTime(t) {
    const i = Math.round(t - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = i;
  }
  tick(t, i = !1) {
    const { generator: l, totalDuration: o, mixKeyframes: c, mirroredGenerator: u, resolvedDuration: d, calculatedDuration: p } = this;
    if (this.startTime === null)
      return l.next(0);
    const { delay: y = 0, keyframes: g, repeat: v, repeatType: b, repeatDelay: j, type: w, onUpdate: T, finalKeyframe: x } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - o / this.speed, this.startTime)), i ? this.currentTime = t : this.updateTime(t);
    const A = this.currentTime - y * (this.playbackSpeed >= 0 ? 1 : -1), _ = this.playbackSpeed >= 0 ? A < 0 : A > o;
    this.currentTime = Math.max(A, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let E = this.currentTime, M = l;
    if (v) {
      const V = Math.min(this.currentTime, o) / d;
      let H = Math.floor(V), B = V % 1;
      !B && V >= 1 && (B = 1), B === 1 && H--, H = Math.min(H, v + 1), !!(H % 2) && (b === "reverse" ? (B = 1 - B, j && (B -= j / d)) : b === "mirror" && (M = u)), E = Kn(0, 1, B) * d;
    }
    let O;
    _ ? (this.delayState.value = g[0], O = this.delayState) : O = M.next(E), c && !_ && (O.value = c(O.value));
    let { done: D } = O;
    !_ && p !== null && (D = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const N = this.holdTime === null && (this.state === "finished" || this.state === "running" && D);
    return N && w !== yh && (O.value = Qc(g, this.options, x, this.speed)), T && T(O.value), N && this.finish(), O;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(t, i) {
    return this.finished.then(t, i);
  }
  get duration() {
    return /* @__PURE__ */ jn(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ jn(t);
  }
  get time() {
    return /* @__PURE__ */ jn(this.currentTime);
  }
  set time(t) {
    t = /* @__PURE__ */ an(t), this.currentTime = t, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = t, this.tick(t));
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
    const i = this.generator.next(t).value;
    return Yb((l) => this.generator.next(l).value, t, i);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    const i = this.playbackSpeed !== t;
    i && this.driver && this.updateTime(Ke.now()), this.playbackSpeed = t, i && this.driver && (this.time = /* @__PURE__ */ jn(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: t = l9, startTime: i } = this.options;
    this.driver || (this.driver = t((o) => this.tick(o))), this.options.onPlay?.();
    const l = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = l) : this.holdTime !== null ? this.startTime = l - this.holdTime : this.startTime || (this.startTime = i ?? l), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Ke.now()), this.holdTime = this.currentTime;
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
function x9(n) {
  for (let t = 1; t < n.length; t++)
    n[t] ?? (n[t] = n[t - 1]);
}
const Di = (n) => n * 180 / Math.PI, gh = (n) => {
  const t = Di(Math.atan2(n[1], n[0]));
  return vh(t);
}, S9 = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
  rotate: gh,
  rotateZ: gh,
  skewX: (n) => Di(Math.atan(n[1])),
  skewY: (n) => Di(Math.atan(n[2])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2
}, vh = (n) => (n = n % 360, n < 0 && (n += 360), n), $g = gh, kg = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]), Bg = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]), w9 = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: kg,
  scaleY: Bg,
  scale: (n) => (kg(n) + Bg(n)) / 2,
  rotateX: (n) => vh(Di(Math.atan2(n[6], n[5]))),
  rotateY: (n) => vh(Di(Math.atan2(-n[2], n[0]))),
  rotateZ: $g,
  rotate: $g,
  skewX: (n) => Di(Math.atan(n[4])),
  skewY: (n) => Di(Math.atan(n[1])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[4])) / 2
};
function bh(n) {
  return n.includes("scale") ? 1 : 0;
}
function xh(n, t) {
  if (!n || n === "none")
    return bh(t);
  const i = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let l, o;
  if (i)
    l = w9, o = i;
  else {
    const d = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    l = S9, o = d;
  }
  if (!o)
    return bh(t);
  const c = l[t], u = o[1].split(",").map(T9);
  return typeof c == "function" ? c(u) : u[c];
}
const C9 = (n, t) => {
  const { transform: i = "none" } = getComputedStyle(n);
  return xh(i, t);
};
function T9(n) {
  return parseFloat(n.trim());
}
const Fs = [
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
], Is = /* @__PURE__ */ new Set([...Fs, "pathRotation"]), Vg = (n) => n === Qs || n === xt, j9 = /* @__PURE__ */ new Set(["x", "y", "z"]), A9 = Fs.filter((n) => !j9.has(n));
function E9(n) {
  const t = [];
  return A9.forEach((i) => {
    const l = n.getValue(i);
    l !== void 0 && (t.push([i, l.get()]), l.set(i.startsWith("scale") ? 1 : 0));
  }), t;
}
const Ia = {
  // Dimensions
  width: ({ x: n }, { paddingLeft: t = "0", paddingRight: i = "0", boxSizing: l }) => {
    const o = n.max - n.min;
    return l === "border-box" ? o : o - parseFloat(t) - parseFloat(i);
  },
  height: ({ y: n }, { paddingTop: t = "0", paddingBottom: i = "0", boxSizing: l }) => {
    const o = n.max - n.min;
    return l === "border-box" ? o : o - parseFloat(t) - parseFloat(i);
  },
  top: (n, { top: t }) => parseFloat(t),
  left: (n, { left: t }) => parseFloat(t),
  bottom: ({ y: n }, { top: t }) => parseFloat(t) + (n.max - n.min),
  right: ({ x: n }, { left: t }) => parseFloat(t) + (n.max - n.min),
  // Transform
  x: (n, { transform: t }) => xh(t, "x"),
  y: (n, { transform: t }) => xh(t, "y")
};
Ia.translateX = Ia.x;
Ia.translateY = Ia.y;
const Oi = /* @__PURE__ */ new Set();
let Sh = !1, wh = !1, Ch = !1;
function Zb() {
  if (wh) {
    const n = Array.from(Oi).filter((l) => l.needsMeasurement), t = new Set(n.map((l) => l.element)), i = /* @__PURE__ */ new Map();
    t.forEach((l) => {
      const o = E9(l);
      o.length && (i.set(l, o), l.render());
    }), n.forEach((l) => l.measureInitialState()), t.forEach((l) => {
      l.render();
      const o = i.get(l);
      o && o.forEach(([c, u]) => {
        l.getValue(c)?.set(u);
      });
    }), n.forEach((l) => l.measureEndState()), n.forEach((l) => {
      l.suspendedScrollY !== void 0 && window.scrollTo(0, l.suspendedScrollY);
    });
  }
  wh = !1, Sh = !1, Oi.forEach((n) => n.complete(Ch)), Oi.clear();
}
function Qb() {
  Oi.forEach((n) => {
    n.readKeyframes(), n.needsMeasurement && (wh = !0);
  });
}
function M9() {
  Ch = !0, Qb(), Zb(), Ch = !1;
}
class Cm {
  constructor(t, i, l, o, c, u = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...t], this.onComplete = i, this.name = l, this.motionValue = o, this.element = c, this.isAsync = u;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (Oi.add(this), Sh || (Sh = !0, It.read(Qb), It.resolveKeyframes(Zb))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, name: i, element: l, motionValue: o } = this;
    if (t[0] === null) {
      const c = o?.get(), u = t[t.length - 1];
      if (c !== void 0)
        t[0] = c;
      else if (l && i) {
        const d = l.readValue(i, u);
        d != null && (t[0] = d);
      }
      t[0] === void 0 && (t[0] = u), o && c === void 0 && o.set(t[0]);
    }
    x9(t);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t), Oi.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (Oi.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const _9 = (n) => n.startsWith("--");
function Fb(n, t, i) {
  _9(t) ? n.style.setProperty(t, i) : n.style[t] = i;
}
const R9 = {};
function Ib(n, t) {
  const i = /* @__PURE__ */ bb(n);
  return () => R9[t] ?? i();
}
const D9 = /* @__PURE__ */ Ib(() => window.ScrollTimeline !== void 0, "scrollTimeline"), Jb = /* @__PURE__ */ Ib(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Ql = ([n, t, i, l]) => `cubic-bezier(${n}, ${t}, ${i}, ${l})`, zg = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ Ql([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ Ql([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ Ql([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ Ql([0.33, 1.53, 0.69, 0.99])
};
function Wb(n, t) {
  if (n)
    return typeof n == "function" ? Jb() ? Hb(n, t) : "ease-out" : /* @__PURE__ */ Db(n) ? Ql(n) : Array.isArray(n) ? n.map((i) => Wb(i, t) || zg.easeOut) : zg[n];
}
function N9(n, t, i, { delay: l = 0, duration: o = 300, repeat: c = 0, repeatType: u = "loop", ease: d = "easeOut", times: p } = {}, y = void 0) {
  const g = {
    [t]: i
  };
  p && (g.offset = p);
  const v = Wb(d, o);
  Array.isArray(v) && (g.easing = v);
  const b = {
    delay: l,
    duration: o,
    easing: Array.isArray(v) ? "linear" : v,
    fill: "both",
    iterations: c + 1,
    direction: u === "reverse" ? "alternate" : "normal"
  };
  return y && (b.pseudoElement = y), n.animate(g, b);
}
function Tm(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function O9({ type: n, ...t }) {
  return Tm(n) && Jb() ? n.applyToOptions(t) : (t.duration ?? (t.duration = 300), t.ease ?? (t.ease = "easeOut"), t);
}
class tx extends wm {
  constructor(t) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !t)
      return;
    const { element: i, name: l, keyframes: o, pseudoElement: c, allowFlatten: u = !1, finalKeyframe: d, onComplete: p } = t;
    this.isPseudoElement = !!c, this.allowFlatten = u, this.options = t, um(typeof t.type != "string");
    const y = O9(t);
    this.animation = N9(i, l, o, y, c), y.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !c) {
        const g = Qc(o, this.options, d, this.speed);
        this.updateMotionValue && this.updateMotionValue(g), Fb(i, l, g), this.animation.cancel();
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
    return /* @__PURE__ */ jn(Number(t));
  }
  get iterationDuration() {
    const { delay: t = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ jn(t);
  }
  get time() {
    return /* @__PURE__ */ jn(Number(this.animation.currentTime) || 0);
  }
  set time(t) {
    const i = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ an(t), i && this.animation.pause();
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
  attachTimeline({ timeline: t, rangeStart: i, rangeEnd: l, observe: o }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, t && D9() ? (this.animation.timeline = t, i && (this.animation.rangeStart = i), l && (this.animation.rangeEnd = l), An) : o(this);
  }
}
const ex = {
  anticipate: jb,
  backInOut: Tb,
  circInOut: Eb
};
function L9(n) {
  return n in ex;
}
function $9(n) {
  typeof n.ease == "string" && L9(n.ease) && (n.ease = ex[n.ease]);
}
const $d = 10;
class k9 extends tx {
  constructor(t) {
    $9(t), Kb(t), super(t), t.startTime !== void 0 && t.autoplay !== !1 && (this.startTime = t.startTime), this.options = t;
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
    const { motionValue: i, onUpdate: l, onComplete: o, element: c, ...u } = this.options;
    if (!i)
      return;
    if (t !== void 0) {
      i.set(t);
      return;
    }
    const d = new Oc({
      ...u,
      autoplay: !1
    }), p = Math.max($d, Ke.now() - this.startTime), y = Kn(0, $d, p - $d), g = d.sample(p).value, { name: v } = this.options;
    c && v && Fb(c, v, g), i.setWithVelocity(d.sample(Math.max(0, p - y)).value, g, y), d.stop();
  }
}
const Ug = (n, t) => t === "zIndex" ? !1 : !!(typeof n == "number" || Array.isArray(n) || typeof n == "string" && // It's animatable if we have a string
(kn.test(n) || n === "0") && // And it contains numbers and/or colors
!n.startsWith("url("));
function B9(n) {
  const t = n[0];
  if (n.length === 1)
    return !0;
  for (let i = 0; i < n.length; i++)
    if (n[i] !== t)
      return !0;
}
function V9(n, t, i, l) {
  const o = n[0];
  if (o === null)
    return !1;
  if (t === "display" || t === "visibility")
    return !0;
  const c = n[n.length - 1], u = Ug(o, t), d = Ug(c, t);
  return !u || !d ? !1 : B9(n) || (i === "spring" || Tm(i)) && l;
}
function Th(n) {
  n.duration = 0, n.type = "keyframes";
}
const nx = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), z9 = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function U9(n) {
  for (let t = 0; t < n.length; t++)
    if (typeof n[t] == "string" && z9.test(n[t]))
      return !0;
  return !1;
}
const H9 = /* @__PURE__ */ new Set([
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
]), q9 = /* @__PURE__ */ bb(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Y9(n) {
  const { motionValue: t, name: i, repeatDelay: l, repeatType: o, damping: c, type: u, keyframes: d } = n;
  if (!(t?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: y, transformTemplate: g } = t.owner.getProps();
  return q9() && i && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (nx.has(i) || H9.has(i) && U9(d)) && (i !== "transform" || !g) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !y && !l && o !== "mirror" && c !== 0 && u !== "inertia";
}
const P9 = 40;
class G9 extends wm {
  constructor({ autoplay: t = !0, delay: i = 0, type: l = "keyframes", repeat: o = 0, repeatDelay: c = 0, repeatType: u = "loop", keyframes: d, name: p, motionValue: y, element: g, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Ke.now();
    const b = {
      autoplay: t,
      delay: i,
      type: l,
      repeat: o,
      repeatDelay: c,
      repeatType: u,
      name: p,
      motionValue: y,
      element: g,
      ...v
    }, j = g?.KeyframeResolver || Cm;
    this.keyframeResolver = new j(d, (w, T, x) => this.onKeyframesResolved(w, T, b, !x), p, y, g), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(t, i, l, o) {
    this.keyframeResolver = void 0;
    const { name: c, type: u, velocity: d, delay: p, isHandoff: y, onUpdate: g } = l;
    this.resolvedAt = Ke.now();
    let v = !0;
    V9(t, c, u, d) || (v = !1, (Ja.instantAnimations || !p) && g?.(Qc(t, l, i)), t[0] = t[t.length - 1], Th(l), l.repeat = 0);
    const j = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > P9 ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: i,
      ...l,
      keyframes: t
    }, w = v && !y && Y9(j), T = j.motionValue?.owner?.current;
    let x;
    if (w)
      try {
        x = new k9({
          ...j,
          element: T
        });
      } catch {
        x = new Oc(j);
      }
    else
      x = new Oc(j);
    x.finished.then(() => {
      this.notifyFinished();
    }).catch(An), this.pendingTimeline && (this.stopTimeline = x.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = x;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(t, i) {
    return this.finished.finally(t).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), M9()), this._animation;
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
class X9 {
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
  setAll(t, i) {
    for (let l = 0; l < this.animations.length; l++)
      this.animations[l][t] = i;
  }
  attachTimeline(t) {
    const i = this.animations.map((l) => l.attachTimeline(t));
    return () => {
      i.forEach((l, o) => {
        l && l(), this.animations[o].stop();
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
    return Hg(this.animations, "duration");
  }
  get iterationDuration() {
    return Hg(this.animations, "iterationDuration");
  }
  runAll(t) {
    this.animations.forEach((i) => i[t]());
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
function Hg(n, t) {
  let i = 0;
  for (let l = 0; l < n.length; l++) {
    const o = n[l][t];
    o !== null && o > i && (i = o);
  }
  return i;
}
class K9 extends X9 {
  then(t, i) {
    return this.finished.finally(t).then(() => {
    });
  }
}
function ax(n, t, i, l = 0, o = 1) {
  const c = Array.from(n).sort((y, g) => y.sortNodePosition(g)).indexOf(t), u = n.size, d = (u - 1) * l;
  return typeof i == "function" ? i(c, u) : o === 1 ? c * l : d - c * l;
}
const qg = 30, Z9 = (n) => !isNaN(parseFloat(n)), nr = {
  current: void 0
};
class Q9 {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(t, i = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (l) => {
      const o = Ke.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(l), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const c of this.dependents)
          c.dirty();
    }, this.hasAnimated = !1, this.setCurrent(t), this.owner = i.owner;
  }
  setCurrent(t) {
    this.current = t, this.updatedAt = Ke.now(), this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = Z9(this.current));
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
  on(t, i) {
    this.events[t] || (this.events[t] = new fm());
    const l = this.events[t].add(i);
    return t === "change" ? () => {
      l(), It.read(() => {
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
  attach(t, i) {
    this.passiveEffect = t, this.stopPassiveEffect = i;
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
  setWithVelocity(t, i, l) {
    this.set(i), this.prev = void 0, this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt - l;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(t, i = !0) {
    this.updateAndNotify(t), this.prev = t, this.prevUpdatedAt = this.prevFrameValue = void 0, i && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
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
    return nr.current && nr.current.push(this), this.current;
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
    const t = Ke.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > qg)
      return 0;
    const i = Math.min(this.updatedAt - this.prevUpdatedAt, qg);
    return /* @__PURE__ */ xb(parseFloat(this.current) - parseFloat(this.prevFrameValue), i);
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
    return this.stop(), new Promise((i) => {
      this.hasAnimated = !0, this.animation = t(i), this.events.animationStart && this.events.animationStart.notify();
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
function Wa(n, t) {
  return new Q9(n, t);
}
function jm(n, t) {
  if (n?.inherit && t) {
    const { inherit: i, ...l } = n;
    return { ...t, ...l };
  }
  return n;
}
function Am(n, t) {
  const i = n?.[t] ?? n?.default ?? n;
  return i !== n ? jm(i, n) : i;
}
const F9 = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, I9 = (n) => ({
  type: "spring",
  stiffness: 550,
  damping: n === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), J9 = {
  type: "keyframes",
  duration: 0.8
}, W9 = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, t6 = (n, { keyframes: t }) => t.length > 2 ? J9 : Is.has(n) ? n.startsWith("scale") ? I9(t[1]) : F9 : W9, e6 = /* @__PURE__ */ new Set([
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
function n6(n) {
  for (const t in n)
    if (!e6.has(t))
      return !0;
  return !1;
}
const Em = (n, t, i, l = {}, o, c) => (u) => {
  const d = Am(l, n) || {}, p = d.delay || l.delay || 0;
  let { elapsed: y = 0 } = l;
  y = y - /* @__PURE__ */ an(p);
  const g = {
    keyframes: Array.isArray(i) ? i : [null, i],
    ease: "easeOut",
    velocity: t.getVelocity(),
    ...d,
    delay: -y,
    onUpdate: (b) => {
      t.set(b), d.onUpdate && d.onUpdate(b);
    },
    onComplete: () => {
      u(), d.onComplete && d.onComplete();
    },
    name: n,
    motionValue: t,
    element: c ? void 0 : o
  };
  n6(d) || Object.assign(g, t6(n, g)), g.duration && (g.duration = /* @__PURE__ */ an(g.duration)), g.repeatDelay && (g.repeatDelay = /* @__PURE__ */ an(g.repeatDelay)), g.from !== void 0 && (g.keyframes[0] = g.from);
  let v = !1;
  if ((g.type === !1 || g.duration === 0 && !g.repeatDelay) && (Th(g), g.delay === 0 && (v = !0)), (Ja.instantAnimations || Ja.skipAnimations || o?.shouldSkipAnimations || d.skipAnimations) && (v = !0, Th(g), g.delay = 0), g.allowFlatten = !d.type && !d.ease, v && !c && t.get() !== void 0) {
    const b = Qc(g.keyframes, d);
    if (b !== void 0) {
      It.update(() => {
        g.onUpdate(b), g.onComplete();
      });
      return;
    }
  }
  return d.isSync ? new Oc(g) : new G9(g);
}, a6 = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function i6(n) {
  const t = a6.exec(n);
  if (!t)
    return [,];
  const [, i, l, o] = t;
  return [`--${i ?? l}`, o];
}
function ix(n, t, i = 1) {
  const [l, o] = i6(n);
  if (!l)
    return;
  const c = window.getComputedStyle(t).getPropertyValue(l);
  if (c) {
    const u = c.trim();
    return yb(u) ? parseFloat(u) : u;
  }
  return gm(o) ? ix(o, t, i + 1) : o;
}
function Yg(n) {
  const t = [{}, {}];
  return n?.values.forEach((i, l) => {
    t[0][l] = i.get(), t[1][l] = i.getVelocity();
  }), t;
}
function Mm(n, t, i, l) {
  if (typeof t == "function") {
    const [o, c] = Yg(l);
    t = t(i !== void 0 ? i : n.custom, o, c);
  }
  if (typeof t == "string" && (t = n.variants && n.variants[t]), typeof t == "function") {
    const [o, c] = Yg(l);
    t = t(i !== void 0 ? i : n.custom, o, c);
  }
  return t;
}
function Li(n, t, i) {
  const l = n.getProps();
  return Mm(l, t, i !== void 0 ? i : l.custom, n);
}
const sx = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Fs
]), jh = (n) => Array.isArray(n);
function s6(n, t, i) {
  n.hasValue(t) ? n.getValue(t).set(i) : n.addValue(t, Wa(i));
}
function l6(n) {
  return jh(n) ? n[n.length - 1] || 0 : n;
}
function r6(n, t) {
  const i = Li(n, t);
  let { transitionEnd: l = {}, transition: o = {}, ...c } = i || {};
  c = { ...c, ...l };
  for (const u in c) {
    const d = l6(c[u]);
    s6(n, u, d);
  }
}
const Ee = (n) => !!(n && n.getVelocity);
function o6(n) {
  return !!(Ee(n) && n.add);
}
function Ah(n, t) {
  const i = n.getValue("willChange");
  if (o6(i))
    return i.add(t);
  if (!i && Ja.WillChange) {
    const l = new Ja.WillChange("auto");
    n.addValue("willChange", l), l.add(t);
  }
}
function _m(n) {
  return n.replace(/([A-Z])/g, (t) => `-${t.toLowerCase()}`);
}
const c6 = "framerAppearId", lx = "data-" + _m(c6);
function rx(n) {
  return n.props[lx];
}
function u6({ protectedKeys: n, needsAnimating: t }, i) {
  const l = n.hasOwnProperty(i) && t[i] !== !0;
  return t[i] = !1, l;
}
function Rm(n, t, { delay: i = 0, transitionOverride: l, type: o } = {}) {
  let { transition: c, transitionEnd: u, ...d } = t;
  const p = n.getDefaultTransition();
  c = c ? jm(c, p) : p;
  const y = c?.reduceMotion, g = c?.skipAnimations;
  l && (c = l);
  const v = [], b = o && n.animationState && n.animationState.getState()[o], j = c?.path;
  j && j.animateVisualElement(n, d, c, i, v);
  for (const w in d) {
    const T = n.getValue(w, n.latestValues[w] ?? null), x = d[w];
    if (x === void 0 || b && u6(b, w))
      continue;
    const A = {
      delay: i,
      ...Am(c || {}, w)
    };
    g && (A.skipAnimations = !0);
    const _ = T.get();
    if (_ !== void 0 && !T.isAnimating() && !Array.isArray(x) && x === _ && !A.velocity) {
      It.update(() => T.set(x));
      continue;
    }
    let E = !1;
    if (window.MotionHandoffAnimation) {
      const D = rx(n);
      if (D) {
        const N = window.MotionHandoffAnimation(D, w, It);
        N !== null && (A.startTime = N, E = !0);
      }
    }
    Ah(n, w);
    const M = y ?? n.shouldReduceMotion;
    T.start(Em(w, T, x, M && sx.has(w) ? { type: !1 } : A, n, E));
    const O = T.animation;
    O && v.push(O);
  }
  if (u) {
    const w = () => It.update(() => {
      u && r6(n, u);
    });
    v.length ? Promise.all(v).then(w) : w();
  }
  return v;
}
function Eh(n, t, i = {}) {
  const l = Li(n, t, i.type === "exit" ? n.presenceContext?.custom : void 0);
  let { transition: o = n.getDefaultTransition() || {} } = l || {};
  i.transitionOverride && (o = i.transitionOverride);
  const c = l ? () => Promise.all(Rm(n, l, i)) : () => Promise.resolve(), u = n.variantChildren && n.variantChildren.size ? (p = 0) => {
    const { delayChildren: y = 0, staggerChildren: g, staggerDirection: v } = o;
    return f6(n, t, p, y, g, v, i);
  } : () => Promise.resolve(), { when: d } = o;
  if (d) {
    const [p, y] = d === "beforeChildren" ? [c, u] : [u, c];
    return p().then(() => y());
  } else
    return Promise.all([c(), u(i.delay)]);
}
function f6(n, t, i = 0, l = 0, o = 0, c = 1, u) {
  const d = [];
  for (const p of n.variantChildren)
    p.notify("AnimationStart", t), d.push(Eh(p, t, {
      ...u,
      delay: i + (typeof l == "function" ? 0 : l) + ax(n.variantChildren, p, l, o, c)
    }).then(() => p.notify("AnimationComplete", t)));
  return Promise.all(d);
}
function d6(n, t, i = {}) {
  n.notify("AnimationStart", t);
  let l;
  if (Array.isArray(t)) {
    const o = t.map((c) => Eh(n, c, i));
    l = Promise.all(o);
  } else if (typeof t == "string")
    l = Eh(n, t, i);
  else {
    const o = typeof t == "function" ? Li(n, t, i.custom) : t;
    l = Promise.all(Rm(n, o, i));
  }
  return l.then(() => {
    n.notify("AnimationComplete", t);
  });
}
const h6 = {
  test: (n) => n === "auto",
  parse: (n) => n
}, ox = (n) => (t) => t.test(n), cx = [Qs, xt, Xn, ya, H5, U5, h6], Pg = (n) => cx.find(ox(n));
function m6(n) {
  return typeof n == "number" ? n === 0 : n !== null ? n === "none" || n === "0" || vb(n) : !0;
}
const p6 = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function y6(n) {
  const [t, i] = n.slice(0, -1).split("(");
  if (t === "drop-shadow")
    return n;
  const [l] = i.match(vm) || [];
  if (!l)
    return n;
  const o = i.replace(l, "");
  let c = p6.has(t) ? 1 : 0;
  return l !== i && (c *= 100), t + "(" + c + o + ")";
}
const g6 = /\b([a-z-]*)\(.*?\)/gu, Mh = {
  ...kn,
  getAnimatableNone: (n) => {
    const t = n.match(g6);
    return t ? t.map(y6).join(" ") : n;
  }
}, _h = {
  ...kn,
  getAnimatableNone: (n) => {
    const t = kn.parse(n);
    return kn.createTransformer(n)(t.map((l) => typeof l == "number" ? 0 : typeof l == "object" ? { ...l, alpha: 1 } : l));
  }
}, Gg = {
  ...Qs,
  transform: Math.round
}, v6 = {
  rotate: ya,
  /**
   * Internal channel for `transition.path` orientToPath. Composed onto
   * `rotate` at the transform-build sites so the user's `rotate` is
   * never read or overwritten. Not part of `transformPropOrder`.
   */
  pathRotation: ya,
  rotateX: ya,
  rotateY: ya,
  rotateZ: ya,
  scale: Io,
  scaleX: Io,
  scaleY: Io,
  scaleZ: Io,
  skew: ya,
  skewX: ya,
  skewY: ya,
  distance: xt,
  translateX: xt,
  translateY: xt,
  translateZ: xt,
  x: xt,
  y: xt,
  z: xt,
  perspective: xt,
  transformPerspective: xt,
  opacity: mr,
  originX: Rg,
  originY: Rg,
  originZ: xt
}, Lc = {
  // Border props
  borderWidth: xt,
  borderTopWidth: xt,
  borderRightWidth: xt,
  borderBottomWidth: xt,
  borderLeftWidth: xt,
  borderRadius: xt,
  borderTopLeftRadius: xt,
  borderTopRightRadius: xt,
  borderBottomRightRadius: xt,
  borderBottomLeftRadius: xt,
  // Positioning props
  width: xt,
  maxWidth: xt,
  height: xt,
  maxHeight: xt,
  top: xt,
  right: xt,
  bottom: xt,
  left: xt,
  inset: xt,
  insetBlock: xt,
  insetBlockStart: xt,
  insetBlockEnd: xt,
  insetInline: xt,
  insetInlineStart: xt,
  insetInlineEnd: xt,
  // Spacing props
  padding: xt,
  paddingTop: xt,
  paddingRight: xt,
  paddingBottom: xt,
  paddingLeft: xt,
  paddingBlock: xt,
  paddingBlockStart: xt,
  paddingBlockEnd: xt,
  paddingInline: xt,
  paddingInlineStart: xt,
  paddingInlineEnd: xt,
  margin: xt,
  marginTop: xt,
  marginRight: xt,
  marginBottom: xt,
  marginLeft: xt,
  marginBlock: xt,
  marginBlockStart: xt,
  marginBlockEnd: xt,
  marginInline: xt,
  marginInlineStart: xt,
  marginInlineEnd: xt,
  // Typography
  fontSize: xt,
  // Misc
  backgroundPositionX: xt,
  backgroundPositionY: xt,
  ...v6,
  zIndex: Gg,
  // SVG
  fillOpacity: mr,
  strokeOpacity: mr,
  numOctaves: Gg
}, b6 = {
  ...Lc,
  // Color props
  color: Ce,
  backgroundColor: Ce,
  outlineColor: Ce,
  fill: Ce,
  stroke: Ce,
  // Border props
  borderColor: Ce,
  borderTopColor: Ce,
  borderRightColor: Ce,
  borderBottomColor: Ce,
  borderLeftColor: Ce,
  filter: Mh,
  WebkitFilter: Mh,
  mask: _h,
  WebkitMask: _h
}, ux = (n) => b6[n], x6 = /* @__PURE__ */ new Set([Mh, _h]);
function fx(n, t) {
  let i = ux(n);
  return x6.has(i) || (i = kn), i.getAnimatableNone ? i.getAnimatableNone(t) : void 0;
}
const S6 = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function w6(n, t, i) {
  let l = 0, o;
  for (; l < n.length && !o; ) {
    const c = n[l];
    typeof c == "string" && !S6.has(c) && Ps(c).values.length && (o = n[l]), l++;
  }
  if (o && i)
    for (const c of t)
      n[c] = fx(i, o);
}
class C6 extends Cm {
  constructor(t, i, l, o, c) {
    super(t, i, l, o, c, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: t, element: i, name: l } = this;
    if (!i || !i.current)
      return;
    super.readKeyframes();
    for (let g = 0; g < t.length; g++) {
      let v = t[g];
      if (typeof v == "string" && (v = v.trim(), gm(v))) {
        const b = ix(v, i.current);
        b !== void 0 && (t[g] = b), g === t.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !sx.has(l) || t.length !== 2)
      return;
    const [o, c] = t, u = Pg(o), d = Pg(c), p = _g(o), y = _g(c);
    if (p !== y && Ia[l]) {
      this.needsMeasurement = !0;
      return;
    }
    if (u !== d)
      if (Vg(u) && Vg(d))
        for (let g = 0; g < t.length; g++) {
          const v = t[g];
          typeof v == "string" && (t[g] = parseFloat(v));
        }
      else Ia[l] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: i } = this, l = [];
    for (let o = 0; o < t.length; o++)
      (t[o] === null || m6(t[o])) && l.push(o);
    l.length && w6(t, l, i);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: i, name: l } = this;
    if (!t || !t.current)
      return;
    l === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Ia[l](t.measureViewportBox(), window.getComputedStyle(t.current)), i[0] = this.measuredOrigin;
    const o = i[i.length - 1];
    o !== void 0 && t.getValue(l, o).jump(o, !1);
  }
  measureEndState() {
    const { element: t, name: i, unresolvedKeyframes: l } = this;
    if (!t || !t.current)
      return;
    const o = t.getValue(i);
    o && o.jump(this.measuredOrigin, !1);
    const c = l.length - 1, u = l[c];
    l[c] = Ia[i](t.measureViewportBox(), window.getComputedStyle(t.current)), u !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = u), this.removedTransforms?.length && this.removedTransforms.forEach(([d, p]) => {
      t.getValue(d).set(p);
    }), this.resolveNoneKeyframes();
  }
}
const Dm = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
];
function Nm(n, t, i) {
  if (n == null)
    return [];
  if (n instanceof EventTarget)
    return [n];
  if (typeof n == "string") {
    let l = document;
    t && (l = t.current);
    const o = i?.[n] ?? l.querySelectorAll(n);
    return o ? Array.from(o) : [];
  }
  return Array.from(n).filter((l) => l != null);
}
const Rh = (n, t) => t && typeof n == "number" ? t.transform(n) : n;
function yc(n) {
  return gb(n) && "offsetHeight" in n && !("ownerSVGElement" in n);
}
const { schedule: Om } = /* @__PURE__ */ Nb(queueMicrotask, !1), Dn = {
  x: !1,
  y: !1
};
function dx() {
  return Dn.x || Dn.y;
}
function T6(n) {
  return n === "x" || n === "y" ? Dn[n] ? null : (Dn[n] = !0, () => {
    Dn[n] = !1;
  }) : Dn.x || Dn.y ? null : (Dn.x = Dn.y = !0, () => {
    Dn.x = Dn.y = !1;
  });
}
function hx(n, t) {
  const i = Nm(n), l = new AbortController(), o = {
    passive: !0,
    ...t,
    signal: l.signal
  };
  return [i, o, () => l.abort()];
}
function j6(n) {
  return !(n.pointerType === "touch" || dx());
}
function A6(n, t, i = {}) {
  const [l, o, c] = hx(n, i);
  return l.forEach((u) => {
    let d = !1, p = !1, y;
    const g = () => {
      u.removeEventListener("pointerleave", w);
    }, v = (x) => {
      y && (y(x), y = void 0), g();
    }, b = (x) => {
      d = !1, window.removeEventListener("pointerup", b), window.removeEventListener("pointercancel", b), p && (p = !1, v(x));
    }, j = () => {
      d = !0, window.addEventListener("pointerup", b, o), window.addEventListener("pointercancel", b, o);
    }, w = (x) => {
      if (x.pointerType !== "touch") {
        if (d) {
          p = !0;
          return;
        }
        v(x);
      }
    }, T = (x) => {
      if (!j6(x))
        return;
      p = !1;
      const A = t(u, x);
      typeof A == "function" && (y = A, u.addEventListener("pointerleave", w, o));
    };
    u.addEventListener("pointerenter", T, o), u.addEventListener("pointerdown", j, o);
  }), c;
}
const mx = (n, t) => t ? n === t ? !0 : mx(n, t.parentElement) : !1, Lm = (n) => n.pointerType === "mouse" ? typeof n.button != "number" || n.button <= 0 : n.isPrimary !== !1, E6 = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function M6(n) {
  return E6.has(n.tagName) || n.isContentEditable === !0;
}
const _6 = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function R6(n) {
  return _6.has(n.tagName) || n.isContentEditable === !0;
}
const gc = /* @__PURE__ */ new WeakSet();
function Xg(n) {
  return (t) => {
    t.key === "Enter" && n(t);
  };
}
function kd(n, t) {
  n.dispatchEvent(new PointerEvent("pointer" + t, { isPrimary: !0, bubbles: !0 }));
}
const D6 = (n, t) => {
  const i = n.currentTarget;
  if (!i)
    return;
  const l = Xg(() => {
    if (gc.has(i))
      return;
    kd(i, "down");
    const o = Xg(() => {
      kd(i, "up");
    }), c = () => kd(i, "cancel");
    i.addEventListener("keyup", o, t), i.addEventListener("blur", c, t);
  });
  i.addEventListener("keydown", l, t), i.addEventListener("blur", () => i.removeEventListener("keydown", l), t);
};
function Kg(n) {
  return Lm(n) && !dx();
}
const Zg = /* @__PURE__ */ new WeakSet();
function N6(n, t, i = {}) {
  const [l, o, c] = hx(n, i), u = (d) => {
    const p = d.currentTarget;
    if (!Kg(d) || Zg.has(d))
      return;
    gc.add(p), i.stopPropagation && Zg.add(d);
    const y = t(p, d), g = { ...o, capture: !0 }, v = (w, T) => {
      window.removeEventListener("pointerup", b, g), window.removeEventListener("pointercancel", j, g), gc.has(p) && gc.delete(p), Kg(w) && typeof y == "function" && y(w, { success: T });
    }, b = (w) => {
      v(w, p === window || p === document || i.useGlobalTarget || mx(p, w.target));
    }, j = (w) => {
      v(w, !1);
    };
    window.addEventListener("pointerup", b, g), window.addEventListener("pointercancel", j, g);
  };
  return l.forEach((d) => {
    (i.useGlobalTarget ? window : d).addEventListener("pointerdown", u, o), yc(d) && (d.addEventListener("focus", (y) => D6(y, o)), !M6(d) && !d.hasAttribute("tabindex") && (d.tabIndex = 0));
  }), c;
}
function Fc(n) {
  return gb(n) && "ownerSVGElement" in n;
}
const vc = /* @__PURE__ */ new WeakMap();
let bc;
const px = (n, t, i) => (l, o) => o && o[0] ? o[0][n + "Size"] : Fc(l) && "getBBox" in l ? l.getBBox()[t] : l[i], O6 = /* @__PURE__ */ px("inline", "width", "offsetWidth"), L6 = /* @__PURE__ */ px("block", "height", "offsetHeight");
function $6({ target: n, borderBoxSize: t }) {
  vc.get(n)?.forEach((i) => {
    i(n, {
      get width() {
        return O6(n, t);
      },
      get height() {
        return L6(n, t);
      }
    });
  });
}
function k6(n) {
  n.forEach($6);
}
function B6() {
  typeof ResizeObserver > "u" || (bc = new ResizeObserver(k6));
}
function V6(n, t) {
  bc || B6();
  const i = Nm(n);
  return i.forEach((l) => {
    let o = vc.get(l);
    o || (o = /* @__PURE__ */ new Set(), vc.set(l, o)), o.add(t), bc?.observe(l);
  }), () => {
    i.forEach((l) => {
      const o = vc.get(l);
      o?.delete(t), o?.size || bc?.unobserve(l);
    });
  };
}
const xc = /* @__PURE__ */ new Set();
let Ls;
function z6() {
  Ls = () => {
    const n = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    xc.forEach((t) => t(n));
  }, window.addEventListener("resize", Ls);
}
function U6(n) {
  return xc.add(n), Ls || z6(), () => {
    xc.delete(n), !xc.size && typeof Ls == "function" && (window.removeEventListener("resize", Ls), Ls = void 0);
  };
}
function Qg(n, t) {
  return typeof n == "function" ? U6(n) : V6(n, t);
}
function yx(n) {
  return Fc(n) && n.tagName === "svg";
}
function H6(...n) {
  const t = !Array.isArray(n[0]), i = t ? 0 : -1, l = n[0 + i], o = n[1 + i], c = n[2 + i], u = n[3 + i], d = Pb(o, c, u);
  return t ? d(l) : d;
}
const q6 = [...cx, Ce, kn], Y6 = (n) => q6.find(ox(n)), Fg = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), $s = () => ({
  x: Fg(),
  y: Fg()
}), Ig = () => ({ min: 0, max: 0 }), we = () => ({
  x: Ig(),
  y: Ig()
}), yr = /* @__PURE__ */ new WeakMap();
function Ic(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function gr(n) {
  return typeof n == "string" || Array.isArray(n);
}
const $m = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], km = ["initial", ...$m];
function Jc(n) {
  return Ic(n.animate) || km.some((t) => gr(n[t]));
}
function gx(n) {
  return !!(Jc(n) || n.variants);
}
function P6(n, t, i) {
  for (const l in t) {
    const o = t[l], c = i[l];
    if (Ee(o))
      n.addValue(l, o);
    else if (Ee(c))
      n.addValue(l, Wa(o, { owner: n }));
    else if (c !== o)
      if (n.hasValue(l)) {
        const u = n.getValue(l);
        u.liveStyle === !0 ? u.jump(o) : u.hasAnimated || u.set(o);
      } else {
        const u = n.getStaticValue(l);
        n.addValue(l, Wa(u !== void 0 ? u : o, { owner: n }));
      }
  }
  for (const l in i)
    t[l] === void 0 && n.removeValue(l);
  return t;
}
const $c = { current: null }, Bm = { current: !1 }, G6 = typeof window < "u";
function vx() {
  if (Bm.current = !0, !!G6)
    if (window.matchMedia) {
      const n = window.matchMedia("(prefers-reduced-motion)"), t = () => $c.current = n.matches;
      n.addEventListener("change", t), t();
    } else
      $c.current = !1;
}
const Jg = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let kc = {};
function bx(n) {
  kc = n;
}
function X6() {
  return kc;
}
class xx {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(t, i, l) {
    return {};
  }
  constructor({ parent: t, props: i, presenceContext: l, reducedMotionConfig: o, skipAnimations: c, blockInitialAnimation: u, visualState: d }, p = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Cm, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const j = Ke.now();
      this.renderScheduledAt < j && (this.renderScheduledAt = j, It.render(this.render, !1, !0));
    };
    const { latestValues: y, renderState: g } = d;
    this.latestValues = y, this.baseTarget = { ...y }, this.initialValues = i.initial ? { ...y } : {}, this.renderState = g, this.parent = t, this.props = i, this.presenceContext = l, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = c, this.options = p, this.blockInitialAnimation = !!u, this.isControllingVariants = Jc(i), this.isVariantNode = gx(i), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t && t.current);
    const { willChange: v, ...b } = this.scrapeMotionValuesFromProps(i, {}, this);
    for (const j in b) {
      const w = b[j];
      y[j] !== void 0 && Ee(w) && w.set(y[j]);
    }
  }
  mount(t) {
    if (this.hasBeenMounted)
      for (const i in this.initialValues)
        this.values.get(i)?.jump(this.initialValues[i]), this.latestValues[i] = this.initialValues[i];
    this.current = t, yr.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((i, l) => this.bindToMotionValue(l, i)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (Bm.current || vx(), this.shouldReduceMotion = $c.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), ba(this.notifyUpdate), ba(this.render), this.valueSubscriptions.forEach((t) => t()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const t in this.events)
      this.events[t].clear();
    for (const t in this.features) {
      const i = this.features[t];
      i && (i.unmount(), i.isMounted = !1);
    }
    this.current = null;
  }
  addChild(t) {
    this.children.add(t), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(t);
  }
  removeChild(t) {
    this.children.delete(t), this.enteringChildren && this.enteringChildren.delete(t);
  }
  bindToMotionValue(t, i) {
    if (this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)(), i.accelerate && nx.has(t) && this.current instanceof HTMLElement) {
      const { factory: u, keyframes: d, times: p, ease: y, duration: g } = i.accelerate, v = new tx({
        element: this.current,
        name: t,
        keyframes: d,
        times: p,
        ease: y,
        duration: /* @__PURE__ */ an(g)
      }), b = u(v);
      this.valueSubscriptions.set(t, () => {
        b(), v.cancel();
      });
      return;
    }
    const l = Is.has(t);
    l && this.onBindTransform && this.onBindTransform();
    const o = i.on("change", (u) => {
      this.latestValues[t] = u, this.props.onUpdate && It.preRender(this.notifyUpdate), l && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let c;
    typeof window < "u" && window.MotionCheckAppearSync && (c = window.MotionCheckAppearSync(this, t, i)), this.valueSubscriptions.set(t, () => {
      o(), c && c();
    });
  }
  sortNodePosition(t) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== t.type ? 0 : this.sortInstanceNodePosition(this.current, t.current);
  }
  updateFeatures() {
    let t = "animation";
    for (t in kc) {
      const i = kc[t];
      if (!i)
        continue;
      const { isEnabled: l, Feature: o } = i;
      if (!this.features[t] && o && l(this.props) && (this.features[t] = new o(this)), this.features[t]) {
        const c = this.features[t];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : we();
  }
  getStaticValue(t) {
    return this.latestValues[t];
  }
  setStaticValue(t, i) {
    this.latestValues[t] = i;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(t, i) {
    (t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = t, this.prevPresenceContext = this.presenceContext, this.presenceContext = i;
    for (let l = 0; l < Jg.length; l++) {
      const o = Jg[l];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const c = "on" + o, u = t[c];
      u && (this.propEventSubscriptions[o] = this.on(o, u));
    }
    this.prevMotionValues = P6(this, this.scrapeMotionValuesFromProps(t, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    const i = this.getClosestVariantNode();
    if (i)
      return i.variantChildren && i.variantChildren.add(t), () => i.variantChildren.delete(t);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(t, i) {
    const l = this.values.get(t);
    i !== l && (l && this.removeValue(t), this.bindToMotionValue(t, i), this.values.set(t, i), this.latestValues[t] = i.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(t) {
    this.values.delete(t);
    const i = this.valueSubscriptions.get(t);
    i && (i(), this.valueSubscriptions.delete(t)), delete this.latestValues[t], this.removeValueFromRenderState(t, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(t) {
    return this.values.has(t);
  }
  getValue(t, i) {
    if (this.props.values && this.props.values[t])
      return this.props.values[t];
    let l = this.values.get(t);
    return l === void 0 && i !== void 0 && (l = Wa(i === null ? void 0 : i, { owner: this }), this.addValue(t, l)), l;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(t, i) {
    let l = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : this.getBaseTargetFromProps(this.props, t) ?? this.readValueFromInstance(this.current, t, this.options);
    return l != null && (typeof l == "string" && (yb(l) || vb(l)) ? l = parseFloat(l) : !Y6(l) && kn.test(i) && (l = fx(t, i)), this.setBaseTarget(t, Ee(l) ? l.get() : l)), Ee(l) ? l.get() : l;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(t, i) {
    this.baseTarget[t] = i;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(t) {
    const { initial: i } = this.props;
    let l;
    if (typeof i == "string" || typeof i == "object") {
      const c = Mm(this.props, i, this.presenceContext?.custom);
      c && (l = c[t]);
    }
    if (i && l !== void 0)
      return l;
    const o = this.getBaseTargetFromProps(this.props, t);
    return o !== void 0 && !Ee(o) ? o : this.initialValues[t] !== void 0 && l === void 0 ? void 0 : this.baseTarget[t];
  }
  on(t, i) {
    return this.events[t] || (this.events[t] = new fm()), this.events[t].add(i);
  }
  notify(t, ...i) {
    this.events[t] && this.events[t].notify(...i);
  }
  scheduleRenderMicrotask() {
    Om.render(this.render);
  }
}
class Sx extends xx {
  constructor() {
    super(...arguments), this.KeyframeResolver = C6;
  }
  sortInstanceNodePosition(t, i) {
    return t.compareDocumentPosition(i) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(t, i) {
    const l = t.style;
    return l ? l[i] : void 0;
  }
  removeValueFromRenderState(t, { vars: i, style: l }) {
    delete i[t], delete l[t];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: t } = this.props;
    Ee(t) && (this.childSubscription = t.on("change", (i) => {
      this.current && (this.current.textContent = `${i}`);
    }));
  }
}
class ai {
  constructor(t) {
    this.isMounted = !1, this.node = t;
  }
  update() {
  }
}
function wx({ top: n, left: t, right: i, bottom: l }) {
  return {
    x: { min: t, max: i },
    y: { min: n, max: l }
  };
}
function K6({ x: n, y: t }) {
  return { top: t.min, right: n.max, bottom: t.max, left: n.min };
}
function Z6(n, t) {
  if (!t)
    return n;
  const i = t({ x: n.left, y: n.top }), l = t({ x: n.right, y: n.bottom });
  return {
    top: i.y,
    left: i.x,
    bottom: l.y,
    right: l.x
  };
}
function Bd(n) {
  return n === void 0 || n === 1;
}
function Dh({ scale: n, scaleX: t, scaleY: i }) {
  return !Bd(n) || !Bd(t) || !Bd(i);
}
function Ai(n) {
  return Dh(n) || Cx(n) || n.z || n.rotate || n.rotateX || n.rotateY || n.skewX || n.skewY;
}
function Cx(n) {
  return Wg(n.x) || Wg(n.y);
}
function Wg(n) {
  return n && n !== "0%";
}
function Bc(n, t, i) {
  const l = n - i, o = t * l;
  return i + o;
}
function tv(n, t, i, l, o) {
  return o !== void 0 && (n = Bc(n, o, l)), Bc(n, i, l) + t;
}
function Nh(n, t = 0, i = 1, l, o) {
  n.min = tv(n.min, t, i, l, o), n.max = tv(n.max, t, i, l, o);
}
function Tx(n, { x: t, y: i }) {
  Nh(n.x, t.translate, t.scale, t.originPoint), Nh(n.y, i.translate, i.scale, i.originPoint);
}
const ev = 0.999999999999, nv = 1.0000000000001;
function Q6(n, t, i, l = !1) {
  const o = i.length;
  if (!o)
    return;
  t.x = t.y = 1;
  let c, u;
  for (let d = 0; d < o; d++) {
    c = i[d], u = c.projectionDelta;
    const { visualElement: p } = c.options;
    p && p.props.style && p.props.style.display === "contents" || (l && c.options.layoutScroll && c.scroll && c !== c.root && (Gn(n.x, -c.scroll.offset.x), Gn(n.y, -c.scroll.offset.y)), u && (t.x *= u.x.scale, t.y *= u.y.scale, Tx(n, u)), l && Ai(c.latestValues) && Sc(n, c.latestValues, c.layout?.layoutBox));
  }
  t.x < nv && t.x > ev && (t.x = 1), t.y < nv && t.y > ev && (t.y = 1);
}
function Gn(n, t) {
  n.min += t, n.max += t;
}
function av(n, t, i, l, o = 0.5) {
  const c = Ft(n.min, n.max, o);
  Nh(n, t, i, c, l);
}
function iv(n, t) {
  return typeof n == "string" ? parseFloat(n) / 100 * (t.max - t.min) : n;
}
function Sc(n, t, i) {
  const l = i ?? n;
  av(n.x, iv(t.x, l.x), t.scaleX, t.scale, t.originX), av(n.y, iv(t.y, l.y), t.scaleY, t.scale, t.originY);
}
function jx(n, t) {
  return wx(Z6(n.getBoundingClientRect(), t));
}
function F6(n, t, i) {
  const l = jx(n, i), { scroll: o } = t;
  return o && (Gn(l.x, o.offset.x), Gn(l.y, o.offset.y)), l;
}
const I6 = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, J6 = Fs.length;
function W6(n, t, i) {
  let l = "", o = !0;
  for (let u = 0; u < J6; u++) {
    const d = Fs[u], p = n[d];
    if (p === void 0)
      continue;
    let y = !0;
    if (typeof p == "number")
      y = p === (d.startsWith("scale") ? 1 : 0);
    else {
      const g = parseFloat(p);
      y = d.startsWith("scale") ? g === 1 : g === 0;
    }
    if (!y || i) {
      const g = Rh(p, Lc[d]);
      if (!y) {
        o = !1;
        const v = I6[d] || d;
        l += `${v}(${g}) `;
      }
      i && (t[d] = g);
    }
  }
  const c = n.pathRotation;
  return c && (o = !1, l += `rotate(${Rh(c, Lc.pathRotation)}) `), l = l.trim(), i ? l = i(t, o ? "" : l) : o && (l = "none"), l;
}
function Vm(n, t, i) {
  const { style: l, vars: o, transformOrigin: c } = n;
  let u = !1, d = !1;
  for (const p in t) {
    const y = t[p];
    if (Is.has(p)) {
      u = !0;
      continue;
    } else if (Lb(p)) {
      o[p] = y;
      continue;
    } else {
      const g = Rh(y, Lc[p]);
      p.startsWith("origin") ? (d = !0, c[p] = g) : l[p] = g;
    }
  }
  if (t.transform || (u || i ? l.transform = W6(t, n.transform, i) : l.transform && (l.transform = "none")), d) {
    const { originX: p = "50%", originY: y = "50%", originZ: g = 0 } = c;
    l.transformOrigin = `${p} ${y} ${g}`;
  }
}
function Ax(n, { style: t, vars: i }, l, o) {
  const c = n.style;
  let u;
  for (u in t)
    c[u] = t[u];
  o?.applyProjectionStyles(c, l);
  for (u in i)
    c.setProperty(u, i[u]);
}
function sv(n, t) {
  return t.max === t.min ? 0 : n / (t.max - t.min) * 100;
}
const Gl = {
  correct: (n, t) => {
    if (!t.target)
      return n;
    if (typeof n == "string")
      if (xt.test(n))
        n = parseFloat(n);
      else
        return n;
    const i = sv(n, t.target.x), l = sv(n, t.target.y);
    return `${i}% ${l}%`;
  }
}, tC = {
  correct: (n, { treeScale: t, projectionDelta: i }) => {
    const l = n, o = kn.parse(n);
    if (o.length > 5)
      return l;
    const c = kn.createTransformer(n), u = typeof o[0] != "number" ? 1 : 0, d = i.x.scale * t.x, p = i.y.scale * t.y;
    o[0 + u] /= d, o[1 + u] /= p;
    const y = Ft(d, p, 0.5);
    return typeof o[2 + u] == "number" && (o[2 + u] /= y), typeof o[3 + u] == "number" && (o[3 + u] /= y), c(o);
  }
}, Oh = {
  borderRadius: {
    ...Gl,
    applyTo: [...Dm]
  },
  borderTopLeftRadius: Gl,
  borderTopRightRadius: Gl,
  borderBottomLeftRadius: Gl,
  borderBottomRightRadius: Gl,
  boxShadow: tC
};
function Ex(n, { layout: t, layoutId: i }) {
  return Is.has(n) || n.startsWith("origin") || (t || i !== void 0) && (!!Oh[n] || n === "opacity");
}
function zm(n, t, i) {
  const l = n.style, o = t?.style, c = {};
  if (!l)
    return c;
  for (const u in l)
    (Ee(l[u]) || o && Ee(o[u]) || Ex(u, n) || i?.getValue(u)?.liveStyle !== void 0) && (c[u] = l[u]);
  return c;
}
function eC(n) {
  return window.getComputedStyle(n);
}
class Mx extends Sx {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Ax;
  }
  readValueFromInstance(t, i) {
    if (Is.has(i))
      return this.projection?.isProjecting ? bh(i) : C9(t, i);
    {
      const l = eC(t), o = (Lb(i) ? l.getPropertyValue(i) : l[i]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: i }) {
    return jx(t, i);
  }
  build(t, i, l) {
    Vm(t, i, l.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, i, l) {
    return zm(t, i, l);
  }
}
function nC(n, t) {
  return n in t;
}
class aC extends xx {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(t, i) {
    if (nC(i, t)) {
      const l = t[i];
      if (typeof l == "string" || typeof l == "number")
        return l;
    }
  }
  getBaseTargetFromProps() {
  }
  removeValueFromRenderState(t, i) {
    delete i.output[t];
  }
  measureInstanceViewportBox() {
    return we();
  }
  build(t, i) {
    Object.assign(t.output, i);
  }
  renderInstance(t, { output: i }) {
    Object.assign(t, i);
  }
  sortInstanceNodePosition() {
    return 0;
  }
}
const iC = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, sC = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function lC(n, t, i = 1, l = 0, o = !0) {
  n.pathLength = 1;
  const c = o ? iC : sC;
  n[c.offset] = `${-l}`, n[c.array] = `${t} ${i}`;
}
const rC = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function _x(n, {
  attrX: t,
  attrY: i,
  attrScale: l,
  pathLength: o,
  pathSpacing: c = 1,
  pathOffset: u = 0,
  // This is object creation, which we try to avoid per-frame.
  ...d
}, p, y, g) {
  if (Vm(n, d, y), p) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  n.attrs = n.style, n.style = {};
  const { attrs: v, style: b } = n;
  v.transform && (b.transform = v.transform, delete v.transform), (b.transform || v.transformOrigin) && (b.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), b.transform && (b.transformBox = g?.transformBox ?? "fill-box", delete v.transformBox);
  for (const j of rC)
    v[j] !== void 0 && (b[j] = v[j], delete v[j]);
  t !== void 0 && (v.x = t), i !== void 0 && (v.y = i), l !== void 0 && (v.scale = l), o !== void 0 && lC(v, o, c, u, !1);
}
const Rx = /* @__PURE__ */ new Set([
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
]), Dx = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function oC(n, t, i, l) {
  Ax(n, t, void 0, l);
  for (const o in t.attrs)
    n.setAttribute(Rx.has(o) ? o : _m(o), t.attrs[o]);
}
function Nx(n, t, i) {
  const l = zm(n, t, i);
  for (const o in n)
    if (Ee(n[o]) || Ee(t[o])) {
      const c = Fs.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      l[c] = n[o];
    }
  return l;
}
class Ox extends Sx {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = we;
  }
  getBaseTargetFromProps(t, i) {
    return t[i];
  }
  readValueFromInstance(t, i) {
    if (Is.has(i)) {
      const l = ux(i);
      return l && l.default || 0;
    }
    return i = Rx.has(i) ? i : _m(i), t.getAttribute(i);
  }
  scrapeMotionValuesFromProps(t, i, l) {
    return Nx(t, i, l);
  }
  build(t, i, l) {
    _x(t, i, this.isSVGTag, l.transformTemplate, l.style);
  }
  renderInstance(t, i, l, o) {
    oC(t, i, l, o);
  }
  mount(t) {
    this.isSVGTag = Dx(t.tagName), super.mount(t);
  }
}
const cC = km.length;
function Lx(n) {
  if (!n)
    return;
  if (!n.isControllingVariants) {
    const i = n.parent ? Lx(n.parent) || {} : {};
    return n.props.initial !== void 0 && (i.initial = n.props.initial), i;
  }
  const t = {};
  for (let i = 0; i < cC; i++) {
    const l = km[i], o = n.props[l];
    (gr(o) || o === !1) && (t[l] = o);
  }
  return t;
}
function $x(n, t) {
  if (!Array.isArray(t))
    return !1;
  const i = t.length;
  if (i !== n.length)
    return !1;
  for (let l = 0; l < i; l++)
    if (t[l] !== n[l])
      return !1;
  return !0;
}
const uC = [...$m].reverse(), fC = $m.length;
function dC(n) {
  return (t) => Promise.all(t.map(({ animation: i, options: l }) => d6(n, i, l)));
}
function hC(n) {
  let t = dC(n), i = lv(), l = !0, o = !1;
  const c = (y) => (g, v) => {
    const b = Li(n, v, y === "exit" ? n.presenceContext?.custom : void 0);
    if (b) {
      const { transition: j, transitionEnd: w, ...T } = b;
      g = { ...g, ...T, ...w };
    }
    return g;
  };
  function u(y) {
    t = y(n);
  }
  function d(y) {
    const { props: g } = n, v = Lx(n.parent) || {}, b = [], j = /* @__PURE__ */ new Set();
    let w = {}, T = 1 / 0;
    for (let A = 0; A < fC; A++) {
      const _ = uC[A], E = i[_], M = g[_] !== void 0 ? g[_] : v[_], O = gr(M), D = _ === y ? E.isActive : null;
      D === !1 && (T = A);
      let N = M === v[_] && M !== g[_] && O;
      if (N && (l || o) && n.manuallyAnimateOnMount && (N = !1), E.protectedKeys = { ...w }, // If it isn't active and hasn't *just* been set as inactive
      !E.isActive && D === null || // If we didn't and don't have any defined prop for this animation type
      !M && !E.prevProp || // Or if the prop doesn't define an animation
      Ic(M) || typeof M == "boolean")
        continue;
      if (_ === "exit" && E.isActive && D !== !0) {
        E.prevResolvedValues && (w = {
          ...w,
          ...E.prevResolvedValues
        });
        continue;
      }
      const V = mC(E.prevProp, M);
      let H = V || // If we're making this variant active, we want to always make it active
      _ === y && E.isActive && !N && O || // If we removed a higher-priority variant (i is in reverse order)
      A > T && O, B = !1;
      const U = Array.isArray(M) ? M : [M];
      let F = U.reduce(c(_), {});
      D === !1 && (F = {});
      const { prevResolvedValues: Y = {} } = E, st = {
        ...Y,
        ...F
      }, I = (J) => {
        H = !0, j.has(J) && (B = !0, j.delete(J)), E.needsAnimating[J] = !0;
        const tt = n.getValue(J);
        tt && (tt.liveStyle = !1);
      };
      for (const J in st) {
        const tt = F[J], ut = Y[J];
        if (w.hasOwnProperty(J))
          continue;
        let L = !1;
        jh(tt) && jh(ut) ? L = !$x(tt, ut) || V : L = tt !== ut, L ? tt != null ? I(J) : j.add(J) : tt !== void 0 && j.has(J) ? I(J) : E.protectedKeys[J] = !0;
      }
      E.prevProp = M, E.prevResolvedValues = F, E.isActive && (w = { ...w, ...F }), (l || o) && n.blockInitialAnimation && (H = !1);
      const $ = N && V;
      H && (!$ || B) && b.push(...U.map((J) => {
        const tt = { type: _ };
        if (typeof J == "string" && (l || o) && !$ && n.manuallyAnimateOnMount && n.parent) {
          const { parent: ut } = n, L = Li(ut, J);
          if (ut.enteringChildren && L) {
            const { delayChildren: q } = L.transition || {};
            tt.delay = ax(ut.enteringChildren, n, q);
          }
        }
        return {
          animation: J,
          options: tt
        };
      }));
    }
    if (j.size) {
      const A = {};
      if (typeof g.initial != "boolean") {
        const _ = Li(n, Array.isArray(g.initial) ? g.initial[0] : g.initial);
        _ && _.transition && (A.transition = _.transition);
      }
      j.forEach((_) => {
        const E = n.getBaseTarget(_), M = n.getValue(_);
        M && (M.liveStyle = !0), A[_] = E ?? null;
      }), b.push({ animation: A });
    }
    let x = !!b.length;
    return l && (g.initial === !1 || g.initial === g.animate) && !n.manuallyAnimateOnMount && (x = !1), l = !1, o = !1, x ? t(b) : Promise.resolve();
  }
  function p(y, g) {
    if (i[y].isActive === g)
      return Promise.resolve();
    n.variantChildren?.forEach((b) => b.animationState?.setActive(y, g)), i[y].isActive = g;
    const v = d(y);
    for (const b in i)
      i[b].protectedKeys = {};
    return v;
  }
  return {
    animateChanges: d,
    setActive: p,
    setAnimateFunction: u,
    getState: () => i,
    reset: () => {
      i = lv(), o = !0;
    }
  };
}
function mC(n, t) {
  return typeof t == "string" ? t !== n : Array.isArray(t) ? !$x(t, n) : !1;
}
function wi(n = !1) {
  return {
    isActive: n,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function lv() {
  return {
    animate: wi(!0),
    whileInView: wi(),
    whileHover: wi(),
    whileTap: wi(),
    whileDrag: wi(),
    whileFocus: wi(),
    exit: wi()
  };
}
function Lh(n, t) {
  n.min = t.min, n.max = t.max;
}
function Rn(n, t) {
  Lh(n.x, t.x), Lh(n.y, t.y);
}
function rv(n, t) {
  n.translate = t.translate, n.scale = t.scale, n.originPoint = t.originPoint, n.origin = t.origin;
}
const kx = 1e-4, pC = 1 - kx, yC = 1 + kx, Bx = 0.01, gC = 0 - Bx, vC = 0 + Bx;
function Ze(n) {
  return n.max - n.min;
}
function bC(n, t, i) {
  return Math.abs(n - t) <= i;
}
function ov(n, t, i, l = 0.5) {
  n.origin = l, n.originPoint = Ft(t.min, t.max, n.origin), n.scale = Ze(i) / Ze(t), n.translate = Ft(i.min, i.max, n.origin) - n.originPoint, (n.scale >= pC && n.scale <= yC || isNaN(n.scale)) && (n.scale = 1), (n.translate >= gC && n.translate <= vC || isNaN(n.translate)) && (n.translate = 0);
}
function ar(n, t, i, l) {
  ov(n.x, t.x, i.x, l ? l.originX : void 0), ov(n.y, t.y, i.y, l ? l.originY : void 0);
}
function cv(n, t, i, l = 0) {
  const o = l ? Ft(i.min, i.max, l) : i.min;
  n.min = o + t.min, n.max = n.min + Ze(t);
}
function xC(n, t, i, l) {
  cv(n.x, t.x, i.x, l?.x), cv(n.y, t.y, i.y, l?.y);
}
function uv(n, t, i, l = 0) {
  const o = l ? Ft(i.min, i.max, l) : i.min;
  n.min = t.min - o, n.max = n.min + Ze(t);
}
function Vc(n, t, i, l) {
  uv(n.x, t.x, i.x, l?.x), uv(n.y, t.y, i.y, l?.y);
}
function fv(n, t, i, l, o) {
  return n -= t, n = Bc(n, 1 / i, l), o !== void 0 && (n = Bc(n, 1 / o, l)), n;
}
function SC(n, t = 0, i = 1, l = 0.5, o, c = n, u = n) {
  if (Xn.test(t) && (t = parseFloat(t), t = Ft(u.min, u.max, t / 100) - u.min), typeof t != "number")
    return;
  let d = Ft(c.min, c.max, l);
  n === c && (d -= t), n.min = fv(n.min, t, i, d, o), n.max = fv(n.max, t, i, d, o);
}
function dv(n, t, [i, l, o], c, u) {
  SC(n, t[i], t[l], t[o], t.scale, c, u);
}
const wC = ["x", "scaleX", "originX"], CC = ["y", "scaleY", "originY"];
function hv(n, t, i, l) {
  dv(n.x, t, wC, i ? i.x : void 0, l ? l.x : void 0), dv(n.y, t, CC, i ? i.y : void 0, l ? l.y : void 0);
}
function mv(n) {
  return n.translate === 0 && n.scale === 1;
}
function Vx(n) {
  return mv(n.x) && mv(n.y);
}
function pv(n, t) {
  return n.min === t.min && n.max === t.max;
}
function TC(n, t) {
  return pv(n.x, t.x) && pv(n.y, t.y);
}
function yv(n, t) {
  return Math.round(n.min) === Math.round(t.min) && Math.round(n.max) === Math.round(t.max);
}
function zx(n, t) {
  return yv(n.x, t.x) && yv(n.y, t.y);
}
function gv(n) {
  return Ze(n.x) / Ze(n.y);
}
function vv(n, t) {
  return n.translate === t.translate && n.scale === t.scale && n.originPoint === t.originPoint;
}
function Pn(n) {
  return [n("x"), n("y")];
}
function jC(n, t, i) {
  let l = "";
  const o = n.x.translate / t.x, c = n.y.translate / t.y, u = i?.z || 0;
  if ((o || c || u) && (l = `translate3d(${o}px, ${c}px, ${u}px) `), (t.x !== 1 || t.y !== 1) && (l += `scale(${1 / t.x}, ${1 / t.y}) `), i) {
    const { transformPerspective: y, rotate: g, pathRotation: v, rotateX: b, rotateY: j, skewX: w, skewY: T } = i;
    y && (l = `perspective(${y}px) ${l}`), g && (l += `rotate(${g}deg) `), v && (l += `rotate(${v}deg) `), b && (l += `rotateX(${b}deg) `), j && (l += `rotateY(${j}deg) `), w && (l += `skewX(${w}deg) `), T && (l += `skewY(${T}deg) `);
  }
  const d = n.x.scale * t.x, p = n.y.scale * t.y;
  return (d !== 1 || p !== 1) && (l += `scale(${d}, ${p})`), l || "none";
}
const AC = Dm.length, bv = (n) => typeof n == "string" ? parseFloat(n) : n, xv = (n) => typeof n == "number" || xt.test(n);
function EC(n, t, i, l, o, c) {
  o ? (n.opacity = Ft(0, i.opacity ?? 1, MC(l)), n.opacityExit = Ft(t.opacity ?? 1, 0, _C(l))) : c && (n.opacity = Ft(t.opacity ?? 1, i.opacity ?? 1, l));
  for (let u = 0; u < AC; u++) {
    const d = Dm[u];
    let p = Sv(t, d), y = Sv(i, d);
    if (p === void 0 && y === void 0)
      continue;
    p || (p = 0), y || (y = 0), p === 0 || y === 0 || xv(p) === xv(y) ? (n[d] = Math.max(Ft(bv(p), bv(y), l), 0), (Xn.test(y) || Xn.test(p)) && (n[d] += "%")) : n[d] = y;
  }
  (t.rotate || i.rotate) && (n.rotate = Ft(t.rotate || 0, i.rotate || 0, l));
}
function Sv(n, t) {
  return n[t] !== void 0 ? n[t] : n.borderRadius;
}
const MC = /* @__PURE__ */ Ux(0, 0.5, Ab), _C = /* @__PURE__ */ Ux(0.5, 0.95, An);
function Ux(n, t, i) {
  return (l) => l < n ? 0 : l > t ? 1 : i(/* @__PURE__ */ qs(n, t, l));
}
function Hx(n, t, i) {
  const l = Ee(n) ? n : Wa(n);
  return l.start(Em("", l, t, i)), l.animation;
}
function vr(n, t, i, l = { passive: !0 }) {
  return n.addEventListener(t, i, l), () => n.removeEventListener(t, i, l);
}
const RC = (n, t) => n.depth - t.depth;
class DC {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(t) {
    cm(this.children, t), this.isDirty = !0;
  }
  remove(t) {
    Hs(this.children, t), this.isDirty = !0;
  }
  forEach(t) {
    this.isDirty && this.children.sort(RC), this.isDirty = !1, this.children.forEach(t);
  }
}
function NC(n, t) {
  const i = Ke.now(), l = ({ timestamp: o }) => {
    const c = o - i;
    c >= t && (ba(l), n(c - t));
  };
  return It.setup(l, !0), () => ba(l);
}
function wc(n) {
  return Ee(n) ? n.get() : n;
}
class OC {
  constructor() {
    this.members = [];
  }
  add(t) {
    cm(this.members, t);
    for (let i = this.members.length - 1; i >= 0; i--) {
      const l = this.members[i];
      if (l === t || l === this.lead || l === this.prevLead)
        continue;
      const o = l.instance;
      (!o || o.isConnected === !1) && !l.snapshot && (Hs(this.members, l), l.unmount());
    }
    t.scheduleRender();
  }
  remove(t) {
    if (Hs(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead) {
      const i = this.members[this.members.length - 1];
      i && this.promote(i);
    }
  }
  relegate(t) {
    for (let i = this.members.indexOf(t) - 1; i >= 0; i--) {
      const l = this.members[i];
      if (l.isPresent !== !1 && l.instance?.isConnected !== !1)
        return this.promote(l), !0;
    }
    return !1;
  }
  promote(t, i) {
    const l = this.lead;
    if (t !== l && (this.prevLead = l, this.lead = t, t.show(), l)) {
      l.updateSnapshot(), t.scheduleRender();
      const { layoutDependency: o } = l.options, { layoutDependency: c } = t.options;
      (o === void 0 || o !== c) && (t.resumeFrom = l, i && (l.preserveOpacity = !0), l.snapshot && (t.snapshot = l.snapshot, t.snapshot.latestValues = l.animationValues || l.latestValues), t.root?.isUpdating && (t.isLayoutDirty = !0)), t.options.crossfade === !1 && l.hide();
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
const Cc = {
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
}, Vd = ["", "X", "Y", "Z"], LC = 1e3;
let $C = 0;
function zd(n, t, i, l) {
  const { latestValues: o } = t;
  o[n] && (i[n] = o[n], t.setStaticValue(n, 0), l && (l[n] = 0));
}
function qx(n) {
  if (n.hasCheckedOptimisedAppear = !0, n.root === n)
    return;
  const { visualElement: t } = n.options;
  if (!t)
    return;
  const i = rx(t);
  if (window.MotionHasOptimisedAnimation(i, "transform")) {
    const { layout: o, layoutId: c } = n.options;
    window.MotionCancelOptimisedAnimation(i, "transform", It, !(o || c));
  }
  const { parent: l } = n;
  l && !l.hasCheckedOptimisedAppear && qx(l);
}
function Yx({ attachResizeListener: n, defaultParent: t, measureScroll: i, checkIsScrollRoot: l, resetTransform: o }) {
  return class {
    constructor(u = {}, d = t?.()) {
      this.id = $C++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(VC), this.nodes.forEach(PC), this.nodes.forEach(GC), this.nodes.forEach(zC);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = u, this.root = d ? d.root || d : this, this.path = d ? [...d.path, d] : [], this.parent = d, this.depth = d ? d.depth + 1 : 0;
      for (let p = 0; p < this.path.length; p++)
        this.path[p].shouldResetTransform = !0;
      this.root === this && (this.nodes = new DC());
    }
    addEventListener(u, d) {
      return this.eventHandlers.has(u) || this.eventHandlers.set(u, new fm()), this.eventHandlers.get(u).add(d);
    }
    notifyListeners(u, ...d) {
      const p = this.eventHandlers.get(u);
      p && p.notify(...d);
    }
    hasListeners(u) {
      return this.eventHandlers.has(u);
    }
    /**
     * Lifecycles
     */
    mount(u) {
      if (this.instance)
        return;
      this.isSVG = Fc(u) && !yx(u), this.instance = u;
      const { layoutId: d, layout: p, visualElement: y } = this.options;
      if (y && !y.current && y.mount(u), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (p || d) && (this.isLayoutDirty = !0), n) {
        let g, v = 0;
        const b = () => this.root.updateBlockedByResize = !1;
        It.read(() => {
          v = window.innerWidth;
        }), n(u, () => {
          const j = window.innerWidth;
          j !== v && (v = j, this.root.updateBlockedByResize = !0, g && g(), g = NC(b, 250), Cc.hasAnimatedSinceResize && (Cc.hasAnimatedSinceResize = !1, this.nodes.forEach(Tv)));
        });
      }
      d && this.root.registerSharedNode(d, this), this.options.animate !== !1 && y && (d || p) && this.addEventListener("didUpdate", ({ delta: g, hasLayoutChanged: v, hasRelativeLayoutChanged: b, layout: j }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const w = this.options.transition || y.getDefaultTransition() || FC, { onLayoutAnimationStart: T, onLayoutAnimationComplete: x } = y.getProps(), A = !this.targetLayout || !zx(this.targetLayout, j), _ = !v && b;
        if (this.options.layoutRoot || this.resumeFrom || _ || v && (A || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const E = {
            ...Am(w, "layout"),
            onPlay: T,
            onComplete: x
          };
          (y.shouldReduceMotion || this.options.layoutRoot) && (E.delay = 0, E.type = !1), this.startAnimation(E), this.setAnimationOrigin(g, _, E.path);
        } else
          v || Tv(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = j;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const u = this.getStack();
      u && u.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), ba(this.updateProjection);
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
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(XC), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: u } = this.options;
      return u && u.getProps().transformTemplate;
    }
    willUpdate(u = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && qx(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let g = 0; g < this.path.length; g++) {
        const v = this.path[g];
        v.shouldResetTransform = !0, (typeof v.latestValues.x == "string" || typeof v.latestValues.y == "string") && (v.isLayoutDirty = !0), v.updateScroll("snapshot"), v.options.layoutRoot && v.willUpdate(!1);
      }
      const { layoutId: d, layout: p } = this.options;
      if (d === void 0 && !p)
        return;
      const y = this.getTransformTemplate();
      this.prevTransformTemplateValue = y ? y(this.latestValues, "") : void 0, this.updateSnapshot(), u && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        const p = this.updateBlockedByResize;
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), p && this.nodes.forEach(HC), this.nodes.forEach(wv);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Cv);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(qC), this.nodes.forEach(YC), this.nodes.forEach(kC), this.nodes.forEach(BC)) : this.nodes.forEach(Cv), this.clearAllSnapshots();
      const d = Ke.now();
      Be.delta = Kn(0, 1e3 / 60, d - Be.timestamp), Be.timestamp = d, Be.isProcessing = !0, Rd.update.process(Be), Rd.preRender.process(Be), Rd.render.process(Be), Be.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Om.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(UC), this.sharedNodes.forEach(KC);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, It.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      It.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !Ze(this.snapshot.measuredBox.x) && !Ze(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let p = 0; p < this.path.length; p++)
          this.path[p].updateScroll();
      const u = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = we()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: d } = this.options;
      d && d.notify("LayoutMeasure", this.layout.layoutBox, u ? u.layoutBox : void 0);
    }
    updateScroll(u = "measure") {
      let d = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === u && (d = !1), d && this.instance) {
        const p = l(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: u,
          isRoot: p,
          offset: i(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : p
        };
      }
    }
    resetTransform() {
      if (!o)
        return;
      const u = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, d = this.projectionDelta && !Vx(this.projectionDelta), p = this.getTransformTemplate(), y = p ? p(this.latestValues, "") : void 0, g = y !== this.prevTransformTemplateValue;
      u && this.instance && (d || Ai(this.latestValues) || g) && (o(this.instance, y), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(u = !0) {
      const d = this.measurePageBox();
      let p = this.removeElementScroll(d);
      return u && (p = this.removeTransform(p)), IC(p), {
        animationId: this.root.animationId,
        measuredBox: d,
        layoutBox: p,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: u } = this.options;
      if (!u)
        return we();
      const d = u.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(JC))) {
        const { scroll: y } = this.root;
        y && (Gn(d.x, y.offset.x), Gn(d.y, y.offset.y));
      }
      return d;
    }
    removeElementScroll(u) {
      const d = we();
      if (Rn(d, u), this.scroll?.wasRoot)
        return d;
      for (let p = 0; p < this.path.length; p++) {
        const y = this.path[p], { scroll: g, options: v } = y;
        y !== this.root && g && v.layoutScroll && (g.wasRoot && Rn(d, u), Gn(d.x, g.offset.x), Gn(d.y, g.offset.y));
      }
      return d;
    }
    applyTransform(u, d = !1, p) {
      const y = p || we();
      Rn(y, u);
      for (let g = 0; g < this.path.length; g++) {
        const v = this.path[g];
        !d && v.options.layoutScroll && v.scroll && v !== v.root && (Gn(y.x, -v.scroll.offset.x), Gn(y.y, -v.scroll.offset.y)), Ai(v.latestValues) && Sc(y, v.latestValues, v.layout?.layoutBox);
      }
      return Ai(this.latestValues) && Sc(y, this.latestValues, this.layout?.layoutBox), y;
    }
    removeTransform(u) {
      const d = we();
      Rn(d, u);
      for (let p = 0; p < this.path.length; p++) {
        const y = this.path[p];
        if (!Ai(y.latestValues))
          continue;
        let g;
        y.instance && (Dh(y.latestValues) && y.updateSnapshot(), g = we(), Rn(g, y.measurePageBox())), hv(d, y.latestValues, y.snapshot?.layoutBox, g);
      }
      return Ai(this.latestValues) && hv(d, this.latestValues), d;
    }
    setTargetDelta(u) {
      this.targetDelta = u, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(u) {
      this.options = {
        ...this.options,
        ...u,
        crossfade: u.crossfade !== void 0 ? u.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== Be.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(u = !1) {
      const d = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = d.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = d.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = d.isSharedProjectionDirty);
      const p = !!this.resumingFrom || this !== d;
      if (!(u || p && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: g, layoutId: v } = this.options;
      if (!this.layout || !(g || v))
        return;
      this.resolvedRelativeTargetAt = Be.timestamp;
      const b = this.getClosestProjectingParent();
      b && this.linkedParentVersion !== b.layoutVersion && !b.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && b && b.layout ? this.createRelativeTarget(b, this.layout.layoutBox, b.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = we(), this.targetWithTransforms = we()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), xC(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : Rn(this.target, this.layout.layoutBox), Tx(this.target, this.targetDelta)) : Rn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && b && !!b.resumingFrom == !!this.resumingFrom && !b.options.layoutScroll && b.target && this.animationProgress !== 1 ? this.createRelativeTarget(b, this.target, b.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Dh(this.parent.latestValues) || Cx(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(u, d, p) {
      this.relativeParent = u, this.linkedParentVersion = u.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = we(), this.relativeTargetOrigin = we(), Vc(this.relativeTargetOrigin, d, p, this.options.layoutAnchor || void 0), Rn(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const u = this.getLead(), d = !!this.resumingFrom || this !== u;
      let p = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (p = !1), d && (this.isSharedProjectionDirty || this.isTransformDirty) && (p = !1), this.resolvedRelativeTargetAt === Be.timestamp && (p = !1), p)
        return;
      const { layout: y, layoutId: g } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(y || g))
        return;
      Rn(this.layoutCorrected, this.layout.layoutBox);
      const v = this.treeScale.x, b = this.treeScale.y;
      Q6(this.layoutCorrected, this.treeScale, this.path, d), u.layout && !u.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (u.target = u.layout.layoutBox, u.targetWithTransforms = we());
      const { target: j } = u;
      if (!j) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (rv(this.prevProjectionDelta.x, this.projectionDelta.x), rv(this.prevProjectionDelta.y, this.projectionDelta.y)), ar(this.projectionDelta, this.layoutCorrected, j, this.latestValues), (this.treeScale.x !== v || this.treeScale.y !== b || !vv(this.projectionDelta.x, this.prevProjectionDelta.x) || !vv(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", j));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(u = !0) {
      if (this.options.visualElement?.scheduleRender(), u) {
        const d = this.getStack();
        d && d.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = $s(), this.projectionDelta = $s(), this.projectionDeltaWithTransform = $s();
    }
    setAnimationOrigin(u, d = !1, p) {
      const y = this.snapshot, g = y ? y.latestValues : {}, v = { ...this.latestValues }, b = $s();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !d;
      const j = we(), w = y ? y.source : void 0, T = this.layout ? this.layout.source : void 0, x = w !== T, A = this.getStack(), _ = !A || A.members.length <= 1, E = !!(x && !_ && this.options.crossfade === !0 && !this.path.some(QC));
      this.animationProgress = 0;
      let M;
      const O = p?.interpolateProjection(u);
      this.mixTargetDelta = (D) => {
        const N = D / 1e3, V = O?.(N);
        V ? (b.x.translate = V.x, b.x.scale = Ft(u.x.scale, 1, N), b.x.origin = u.x.origin, b.x.originPoint = u.x.originPoint, b.y.translate = V.y, b.y.scale = Ft(u.y.scale, 1, N), b.y.origin = u.y.origin, b.y.originPoint = u.y.originPoint) : (jv(b.x, u.x, N), jv(b.y, u.y, N)), this.setTargetDelta(b), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Vc(j, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), ZC(this.relativeTarget, this.relativeTargetOrigin, j, N), M && TC(this.relativeTarget, M) && (this.isProjectionDirty = !1), M || (M = we()), Rn(M, this.relativeTarget)), x && (this.animationValues = v, EC(v, g, this.latestValues, N, E, _)), V && V.rotate !== void 0 && (this.animationValues || (this.animationValues = v), this.animationValues.pathRotation = V.rotate), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = N;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(u) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (ba(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = It.update(() => {
        Cc.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = Wa(0)), this.motionValue.jump(0, !1), this.currentAnimation = Hx(this.motionValue, [0, 1e3], {
          ...u,
          velocity: 0,
          isSync: !0,
          onUpdate: (d) => {
            this.mixTargetDelta(d), u.onUpdate && u.onUpdate(d);
          },
          onComplete: () => {
            u.onComplete && u.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const u = this.getStack();
      u && u.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(LC), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const u = this.getLead();
      let { targetWithTransforms: d, target: p, layout: y, latestValues: g } = u;
      if (!(!d || !p || !y)) {
        if (this !== u && this.layout && y && Px(this.options.animationType, this.layout.layoutBox, y.layoutBox)) {
          p = this.target || we();
          const v = Ze(this.layout.layoutBox.x);
          p.x.min = u.target.x.min, p.x.max = p.x.min + v;
          const b = Ze(this.layout.layoutBox.y);
          p.y.min = u.target.y.min, p.y.max = p.y.min + b;
        }
        Rn(d, p), Sc(d, g), ar(this.projectionDeltaWithTransform, this.layoutCorrected, d, g);
      }
    }
    registerSharedNode(u, d) {
      this.sharedNodes.has(u) || this.sharedNodes.set(u, new OC()), this.sharedNodes.get(u).add(d);
      const y = d.options.initialPromotionConfig;
      d.promote({
        transition: y ? y.transition : void 0,
        preserveFollowOpacity: y && y.shouldPreserveFollowOpacity ? y.shouldPreserveFollowOpacity(d) : void 0
      });
    }
    isLead() {
      const u = this.getStack();
      return u ? u.lead === this : !0;
    }
    getLead() {
      const { layoutId: u } = this.options;
      return u ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: u } = this.options;
      return u ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: u } = this.options;
      if (u)
        return this.root.sharedNodes.get(u);
    }
    promote({ needsReset: u, transition: d, preserveFollowOpacity: p } = {}) {
      const y = this.getStack();
      y && y.promote(this, p), u && (this.projectionDelta = void 0, this.needsReset = !0), d && this.setOptions({ transition: d });
    }
    relegate() {
      const u = this.getStack();
      return u ? u.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: u } = this.options;
      if (!u)
        return;
      let d = !1;
      const { latestValues: p } = u;
      if ((p.z || p.rotate || p.rotateX || p.rotateY || p.rotateZ || p.skewX || p.skewY) && (d = !0), !d)
        return;
      const y = {};
      p.z && zd("z", u, y, this.animationValues);
      for (let g = 0; g < Vd.length; g++)
        zd(`rotate${Vd[g]}`, u, y, this.animationValues), zd(`skew${Vd[g]}`, u, y, this.animationValues);
      u.render();
      for (const g in y)
        u.setStaticValue(g, y[g]), this.animationValues && (this.animationValues[g] = y[g]);
      u.scheduleRender();
    }
    applyProjectionStyles(u, d) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        u.visibility = "hidden";
        return;
      }
      const p = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, u.visibility = "", u.opacity = "", u.pointerEvents = wc(d?.pointerEvents) || "", u.transform = p ? p(this.latestValues, "") : "none";
        return;
      }
      const y = this.getLead();
      if (!this.projectionDelta || !this.layout || !y.target) {
        this.options.layoutId && (u.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, u.pointerEvents = wc(d?.pointerEvents) || ""), this.hasProjected && !Ai(this.latestValues) && (u.transform = p ? p({}, "") : "none", this.hasProjected = !1);
        return;
      }
      u.visibility = "";
      const g = y.animationValues || y.latestValues;
      this.applyTransformsToTarget();
      let v = jC(this.projectionDeltaWithTransform, this.treeScale, g);
      p && (v = p(g, v)), u.transform = v;
      const { x: b, y: j } = this.projectionDelta;
      u.transformOrigin = `${b.origin * 100}% ${j.origin * 100}% 0`, y.animationValues ? u.opacity = y === this ? g.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : g.opacityExit : u.opacity = y === this ? g.opacity !== void 0 ? g.opacity : "" : g.opacityExit !== void 0 ? g.opacityExit : 0;
      for (const w in Oh) {
        if (g[w] === void 0)
          continue;
        const { correct: T, applyTo: x, isCSSVariable: A } = Oh[w], _ = v === "none" ? g[w] : T(g[w], y);
        if (x) {
          const E = x.length;
          for (let M = 0; M < E; M++)
            u[x[M]] = _;
        } else
          A ? this.options.visualElement.renderState.vars[w] = _ : u[w] = _;
      }
      this.options.layoutId && (u.pointerEvents = y === this ? wc(d?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((u) => u.currentAnimation?.stop()), this.root.nodes.forEach(wv), this.root.sharedNodes.clear();
    }
  };
}
function kC(n) {
  n.updateLayout();
}
function BC(n) {
  const t = n.resumeFrom?.snapshot || n.snapshot;
  if (n.isLead() && n.layout && t && n.hasListeners("didUpdate")) {
    const { layoutBox: i, measuredBox: l } = n.layout, { animationType: o } = n.options, c = t.source !== n.layout.source;
    if (o === "size")
      Pn((g) => {
        const v = c ? t.measuredBox[g] : t.layoutBox[g], b = Ze(v);
        v.min = i[g].min, v.max = v.min + b;
      });
    else if (o === "x" || o === "y") {
      const g = o === "x" ? "y" : "x";
      Lh(c ? t.measuredBox[g] : t.layoutBox[g], i[g]);
    } else Px(o, t.layoutBox, i) && Pn((g) => {
      const v = c ? t.measuredBox[g] : t.layoutBox[g], b = Ze(i[g]);
      v.max = v.min + b, n.relativeTarget && !n.currentAnimation && (n.isProjectionDirty = !0, n.relativeTarget[g].max = n.relativeTarget[g].min + b);
    });
    const u = $s();
    ar(u, i, t.layoutBox);
    const d = $s();
    c ? ar(d, n.applyTransform(l, !0), t.measuredBox) : ar(d, i, t.layoutBox);
    const p = !Vx(u);
    let y = !1;
    if (!n.resumeFrom) {
      const g = n.getClosestProjectingParent();
      if (g && !g.resumeFrom) {
        const { snapshot: v, layout: b } = g;
        if (v && b) {
          const j = n.options.layoutAnchor || void 0, w = we();
          Vc(w, t.layoutBox, v.layoutBox, j);
          const T = we();
          Vc(T, i, b.layoutBox, j), zx(w, T) || (y = !0), g.options.layoutRoot && (n.relativeTarget = T, n.relativeTargetOrigin = w, n.relativeParent = g);
        }
      }
    }
    n.notifyListeners("didUpdate", {
      layout: i,
      snapshot: t,
      delta: d,
      layoutDelta: u,
      hasLayoutChanged: p,
      hasRelativeLayoutChanged: y
    });
  } else if (n.isLead()) {
    const { onExitComplete: i } = n.options;
    i && i();
  }
  n.options.transition = void 0;
}
function VC(n) {
  n.parent && (n.isProjecting() || (n.isProjectionDirty = n.parent.isProjectionDirty), n.isSharedProjectionDirty || (n.isSharedProjectionDirty = !!(n.isProjectionDirty || n.parent.isProjectionDirty || n.parent.isSharedProjectionDirty)), n.isTransformDirty || (n.isTransformDirty = n.parent.isTransformDirty));
}
function zC(n) {
  n.isProjectionDirty = n.isSharedProjectionDirty = n.isTransformDirty = !1;
}
function UC(n) {
  n.clearSnapshot();
}
function wv(n) {
  n.clearMeasurements();
}
function HC(n) {
  n.isLayoutDirty = !0, n.updateLayout();
}
function Cv(n) {
  n.isLayoutDirty = !1;
}
function qC(n) {
  n.isAnimationBlocked && n.layout && !n.isLayoutDirty && (n.snapshot = n.layout, n.isLayoutDirty = !0);
}
function YC(n) {
  const { visualElement: t } = n.options;
  t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"), n.resetTransform();
}
function Tv(n) {
  n.finishAnimation(), n.targetDelta = n.relativeTarget = n.target = void 0, n.isProjectionDirty = !0;
}
function PC(n) {
  n.resolveTargetDelta();
}
function GC(n) {
  n.calcProjection();
}
function XC(n) {
  n.resetSkewAndRotation();
}
function KC(n) {
  n.removeLeadSnapshot();
}
function jv(n, t, i) {
  n.translate = Ft(t.translate, 0, i), n.scale = Ft(t.scale, 1, i), n.origin = t.origin, n.originPoint = t.originPoint;
}
function Av(n, t, i, l) {
  n.min = Ft(t.min, i.min, l), n.max = Ft(t.max, i.max, l);
}
function ZC(n, t, i, l) {
  Av(n.x, t.x, i.x, l), Av(n.y, t.y, i.y, l);
}
function QC(n) {
  return n.animationValues && n.animationValues.opacityExit !== void 0;
}
const FC = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, Ev = (n) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(n), Mv = Ev("applewebkit/") && !Ev("chrome/") ? Math.round : An;
function _v(n) {
  n.min = Mv(n.min), n.max = Mv(n.max);
}
function IC(n) {
  _v(n.x), _v(n.y);
}
function Px(n, t, i) {
  return n === "position" || n === "preserve-aspect" && !bC(gv(t), gv(i), 0.2);
}
function JC(n) {
  return n !== n.root && n.scroll?.wasRoot;
}
const WC = Yx({
  attachResizeListener: (n, t) => vr(n, "resize", t),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), Ud = {
  current: void 0
}, Gx = Yx({
  measureScroll: (n) => ({
    x: n.scrollLeft,
    y: n.scrollTop
  }),
  defaultParent: () => {
    if (!Ud.current) {
      const n = new WC({});
      n.mount(window), n.setOptions({ layoutScroll: !0 }), Ud.current = n;
    }
    return Ud.current;
  },
  resetTransform: (n, t) => {
    n.style.transform = t !== void 0 ? t : "none";
  },
  checkIsScrollRoot: (n) => window.getComputedStyle(n).position === "fixed"
});
function tT(n, t) {
  if (Jc(n)) {
    const { initial: i, animate: l } = n;
    return {
      initial: i === !1 || gr(i) ? i : void 0,
      animate: gr(l) ? l : void 0
    };
  }
  return n.inherit !== !1 ? t : {};
}
function eT(n) {
  const { initial: t, animate: i } = tT(n, C.useContext(Zc));
  return C.useMemo(() => ({ initial: t, animate: i }), [Rv(t), Rv(i)]);
}
function Rv(n) {
  return Array.isArray(n) ? n.join(" ") : n;
}
const Um = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function Xx(n, t, i) {
  for (const l in t)
    !Ee(t[l]) && !Ex(l, i) && (n[l] = t[l]);
}
function nT({ transformTemplate: n }, t) {
  return C.useMemo(() => {
    const i = Um();
    return Vm(i, t, n), Object.assign({}, i.vars, i.style);
  }, [t]);
}
function aT(n, t) {
  const i = n.style || {}, l = {};
  return Xx(l, i, n), Object.assign(l, nT(n, t)), l;
}
function iT(n, t) {
  const i = {}, l = aT(n, t);
  return n.drag && n.dragListener !== !1 && (i.draggable = !1, l.userSelect = l.WebkitUserSelect = l.WebkitTouchCallout = "none", l.touchAction = n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`), n.tabIndex === void 0 && (n.onTap || n.onTapStart || n.whileTap) && (i.tabIndex = 0), i.style = l, i;
}
const Kx = () => ({
  ...Um(),
  attrs: {}
});
function sT(n, t, i, l) {
  const o = C.useMemo(() => {
    const c = Kx();
    return _x(c, t, Dx(l), n.transformTemplate, n.style), {
      ...c.attrs,
      style: { ...c.style }
    };
  }, [t]);
  if (n.style) {
    const c = {};
    Xx(c, n.style, n), o.style = { ...c, ...o.style };
  }
  return o;
}
const lT = /* @__PURE__ */ new Set([
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
function zc(n) {
  return n.startsWith("while") || n.startsWith("drag") && n !== "draggable" || n.startsWith("layout") || n.startsWith("onTap") || n.startsWith("onPan") || n.startsWith("onLayout") || lT.has(n);
}
let Zx = (n) => !zc(n);
function Qx(n) {
  typeof n == "function" && (Zx = (t) => t.startsWith("on") ? !zc(t) : n(t));
}
try {
  Qx(require("@emotion/is-prop-valid").default);
} catch {
}
function rT(n, t, i) {
  const l = {};
  for (const o in n)
    o === "values" && typeof n.values == "object" || Ee(n[o]) || (Zx(o) || i === !0 && zc(o) || !t && !zc(o) || // If trying to use native HTML drag events, forward drag listeners
    n.draggable && o.startsWith("onDrag")) && (l[o] = n[o]);
  return l;
}
const oT = [
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
function Hm(n) {
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
      !!(oT.indexOf(n) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(n))
    )
  );
}
function cT(n, t, i, { latestValues: l }, o, c = !1, u) {
  const p = (u ?? Hm(n) ? sT : iT)(t, l, o, n), y = rT(t, typeof n == "string", c), g = n !== C.Fragment ? { ...y, ...p, ref: i } : {}, { children: v } = t, b = C.useMemo(() => Ee(v) ? v.get() : v, [v]);
  return C.createElement(n, {
    ...g,
    children: b
  });
}
const _r = /* @__PURE__ */ C.createContext(null);
function Vi(n) {
  const t = C.useRef(null);
  return t.current === null && (t.current = n()), t.current;
}
function uT({ scrapeMotionValuesFromProps: n, createRenderState: t }, i, l, o) {
  return {
    latestValues: fT(i, l, o, n),
    renderState: t()
  };
}
function fT(n, t, i, l) {
  const o = {}, c = l(n, {});
  for (const b in c)
    o[b] = wc(c[b]);
  let { initial: u, animate: d } = n;
  const p = Jc(n), y = gx(n);
  t && y && !p && n.inherit !== !1 && (u === void 0 && (u = t.initial), d === void 0 && (d = t.animate));
  let g = i ? i.initial === !1 : !1;
  g = g || u === !1;
  const v = g ? d : u;
  if (v && typeof v != "boolean" && !Ic(v)) {
    const b = Array.isArray(v) ? v : [v];
    for (let j = 0; j < b.length; j++) {
      const w = Mm(n, b[j]);
      if (w) {
        const { transitionEnd: T, transition: x, ...A } = w;
        for (const _ in A) {
          let E = A[_];
          if (Array.isArray(E)) {
            const M = g ? E.length - 1 : 0;
            E = E[M];
          }
          E !== null && (o[_] = E);
        }
        for (const _ in T)
          o[_] = T[_];
      }
    }
  }
  return o;
}
const Fx = (n) => (t, i) => {
  const l = C.useContext(Zc), o = C.useContext(_r), c = () => uT(n, t, l, o);
  return i ? c() : Vi(c);
}, dT = /* @__PURE__ */ Fx({
  scrapeMotionValuesFromProps: zm,
  createRenderState: Um
}), hT = /* @__PURE__ */ Fx({
  scrapeMotionValuesFromProps: Nx,
  createRenderState: Kx
}), Dv = {
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
let Nv = !1;
function mT() {
  if (Nv)
    return;
  const n = {};
  for (const t in Dv)
    n[t] = {
      isEnabled: (i) => Dv[t].some((l) => !!i[l])
    };
  bx(n), Nv = !0;
}
function Ix() {
  return mT(), X6();
}
function $h(n) {
  const t = Ix();
  for (const i in n)
    t[i] = {
      ...t[i],
      ...n[i]
    };
  bx(t);
}
const pT = Symbol.for("motionComponentSymbol");
function yT(n, t, i) {
  const l = C.useRef(i);
  C.useInsertionEffect(() => {
    l.current = i;
  });
  const o = C.useRef(null);
  return C.useCallback((c) => {
    c && n.onMount?.(c), t && (c ? t.mount(c) : t.unmount());
    const u = l.current;
    if (typeof u == "function")
      if (c) {
        const d = u(c);
        typeof d == "function" && (o.current = d);
      } else o.current ? (o.current(), o.current = null) : u(c);
    else u && (u.current = c);
  }, [t]);
}
const Jx = C.createContext({});
function Ns(n) {
  return n && typeof n == "object" && Object.prototype.hasOwnProperty.call(n, "current");
}
const gT = typeof window < "u", Wc = gT ? C.useLayoutEffect : C.useEffect;
function vT(n, t, i, l, o, c) {
  const { visualElement: u } = C.useContext(Zc), d = C.useContext(ym), p = C.useContext(_r), y = C.useContext(Ys), g = y.reducedMotion, v = y.skipAnimations, b = C.useRef(null), j = C.useRef(!1);
  l = l || d.renderer, !b.current && l && (b.current = l(n, {
    visualState: t,
    parent: u,
    props: i,
    presenceContext: p,
    blockInitialAnimation: p ? p.initial === !1 : !1,
    reducedMotionConfig: g,
    skipAnimations: v,
    isSVG: c
  }), j.current && b.current && (b.current.manuallyAnimateOnMount = !0));
  const w = b.current, T = C.useContext(Jx);
  w && !w.projection && o && (w.type === "html" || w.type === "svg") && bT(b.current, i, o, T);
  const x = C.useRef(!1);
  C.useInsertionEffect(() => {
    w && x.current && w.update(i, p);
  });
  const A = i[lx], _ = C.useRef(!!A && typeof window < "u" && !window.MotionHandoffIsComplete?.(A) && window.MotionHasOptimisedAnimation?.(A));
  return Wc(() => {
    j.current = !0, w && (x.current = !0, window.MotionIsMounted = !0, w.updateFeatures(), w.scheduleRenderMicrotask(), _.current && w.animationState && w.animationState.animateChanges());
  }), C.useEffect(() => {
    w && (!_.current && w.animationState && w.animationState.animateChanges(), _.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(A);
    }), _.current = !1), w.enteringChildren = void 0);
  }), w;
}
function bT(n, t, i, l) {
  const { layoutId: o, layout: c, drag: u, dragConstraints: d, layoutScroll: p, layoutRoot: y, layoutAnchor: g, layoutCrossfade: v } = t;
  n.projection = new i(n.latestValues, t["data-framer-portal-id"] ? void 0 : Wx(n.parent)), n.projection.setOptions({
    layoutId: o,
    layout: c,
    alwaysMeasureLayout: !!u || d && Ns(d),
    visualElement: n,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof c == "string" ? c : "both",
    initialPromotionConfig: l,
    crossfade: v,
    layoutScroll: p,
    layoutRoot: y,
    layoutAnchor: g
  });
}
function Wx(n) {
  if (n)
    return n.options.allowProjection !== !1 ? n.projection : Wx(n.parent);
}
function Tc(n, { forwardMotionProps: t = !1, type: i } = {}, l, o) {
  l && $h(l);
  const c = i ? i === "svg" : Hm(n), u = c ? hT : dT;
  function d(y, g) {
    let v;
    const b = {
      ...C.useContext(Ys),
      ...y,
      layoutId: xT(y)
    }, { isStatic: j } = b, w = eT(y), T = u(y, j);
    if (!j && typeof window < "u") {
      ST();
      const x = wT(b);
      v = x.MeasureLayout, w.visualElement = vT(n, T, b, o, x.ProjectionNode, c);
    }
    return h.jsxs(Zc.Provider, { value: w, children: [v && w.visualElement ? h.jsx(v, { visualElement: w.visualElement, ...b }) : null, cT(n, y, yT(T, w.visualElement, g), T, j, t, c)] });
  }
  d.displayName = `motion.${typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`}`;
  const p = C.forwardRef(d);
  return p[pT] = n, p;
}
function xT({ layoutId: n }) {
  const t = C.useContext(pm).id;
  return t && n !== void 0 ? t + "-" + n : n;
}
function ST(n, t) {
  C.useContext(ym).strict;
}
function wT(n) {
  const t = Ix(), { drag: i, layout: l } = t;
  if (!i && !l)
    return {};
  const o = { ...i, ...l };
  return {
    MeasureLayout: i?.isEnabled(n) || l?.isEnabled(n) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function qm(n, t) {
  return Tc(n, t);
}
const kh = /* @__PURE__ */ qm("button"), xa = /* @__PURE__ */ qm("div"), CT = /* @__PURE__ */ qm("span");
var TT = {
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
function jT({
  topLeftCornerRadius: n,
  topRightCornerRadius: t,
  bottomRightCornerRadius: i,
  bottomLeftCornerRadius: l,
  width: o,
  height: c
}) {
  const u = {
    topLeft: -1,
    topRight: -1,
    bottomLeft: -1,
    bottomRight: -1
  }, d = {
    topLeft: n,
    topRight: t,
    bottomLeft: l,
    bottomRight: i
  };
  Object.entries(d).sort(([, y], [, g]) => g - y).forEach(([y, g]) => {
    const v = TT[y], b = Math.min(
      ...v.map((j) => {
        const w = d[j.corner];
        if (g === 0 && w === 0)
          return 0;
        const T = u[j.corner], x = j.side === "top" || j.side === "bottom" ? o : c;
        return T >= 0 ? x - T : g / (g + w) * x;
      })
    );
    u[y] = b, d[y] = Math.min(g, b);
  });
  const p = (y) => ({
    radius: d[y],
    roundingAndSmoothingBudget: u[y]
  });
  return {
    topLeft: p("topLeft"),
    topRight: p("topRight"),
    bottomLeft: p("bottomLeft"),
    bottomRight: p("bottomRight")
  };
}
function Fl(n) {
  return n * Math.PI / 180;
}
function dn(n, ...t) {
  let i = n[0];
  for (let l = 0; l < t.length; l++) {
    const o = t[l];
    i += typeof o == "number" ? o.toFixed(4) : o ?? "", i += n[l + 1];
  }
  return i;
}
var br = {
  p: 0,
  pathSegment: () => ""
};
function On(n, t, i) {
  switch (i) {
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
function Ln(n, t, i) {
  switch (i) {
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
var AT = ({
  cornerRadius: n,
  roundingAndSmoothingBudget: t
}) => {
  const i = Math.min(n, t);
  return i <= 0 ? br : {
    p: i,
    pathSegment: (l) => {
      const o = On(i, i, l), c = Ln(i, i, l);
      return dn`a ${i} ${i} 0 0 1 ${o} ${c}`;
    }
  };
};
function Ym({
  cornerRadius: n,
  cornerSmoothing: t,
  preserveSmoothing: i,
  roundingAndSmoothingBudget: l
}) {
  if (n <= 0)
    return { a: 0, b: 0, c: 0, d: 0, p: 0, arcSectionLength: 0, cornerRadius: 0 };
  let o = (1 + t) * n;
  if (!i) {
    const w = l / n - 1;
    t = Math.min(t, w), o = Math.min(o, l);
  }
  const c = 90 * (1 - t), u = Math.sin(Fl(c / 2)) * n * Math.sqrt(2), d = (90 - c) / 2, p = n * Math.tan(Fl(d / 2)), y = 45 * t, g = p * Math.cos(Fl(y)), v = g * Math.tan(Fl(y));
  let b = (o - u - g - v) / 3, j = 2 * b;
  if (i && o > l) {
    const w = l - v - u - g, T = w / 6, x = w - T;
    b = Math.min(b, x), j = w - b, o = Math.min(o, l);
  }
  return { a: j, b, c: g, d: v, p: o, arcSectionLength: u, cornerRadius: n };
}
var ET = ({
  cornerRadius: n,
  smoothing: t,
  preserveSmoothing: i,
  roundingAndSmoothingBudget: l
}) => {
  const o = Ym({
    cornerRadius: n,
    cornerSmoothing: t,
    preserveSmoothing: i,
    roundingAndSmoothingBudget: l
  });
  return o.cornerRadius <= 0 ? br : {
    p: o.p,
    pathSegment: (c) => {
      switch (c) {
        case "TR":
          return MT(o);
        case "BR":
          return _T(o);
        case "BL":
          return RT(o);
        case "TL":
          return DT(o);
      }
    }
  };
};
function MT({
  cornerRadius: n,
  a: t,
  b: i,
  c: l,
  d: o,
  arcSectionLength: c
}) {
  return dn`c ${t} 0 ${t + i} 0 ${t + i + l} ${o} a ${n} ${n} 0 0 1 ${c} ${c} c ${o} ${l} ${o} ${i + l} ${o} ${t + i + l}`;
}
function _T({
  cornerRadius: n,
  a: t,
  b: i,
  c: l,
  d: o,
  arcSectionLength: c
}) {
  return dn`c 0 ${t} 0 ${t + i} ${-o} ${t + i + l} a ${n} ${n} 0 0 1 -${c} ${c} c ${-l} ${o} ${-(i + l)} ${o} ${-(t + i + l)} ${o}`;
}
function RT({
  cornerRadius: n,
  a: t,
  b: i,
  c: l,
  d: o,
  arcSectionLength: c
}) {
  return dn`c ${-t} 0 ${-(t + i)} 0 ${-(t + i + l)} ${-o} a ${n} ${n} 0 0 1 -${c} -${c} c ${-o} ${-l} ${-o} ${-(i + l)} ${-o} ${-(t + i + l)}`;
}
function DT({
  cornerRadius: n,
  a: t,
  b: i,
  c: l,
  d: o,
  arcSectionLength: c
}) {
  return dn`c 0 ${-t} 0 ${-(t + i)} ${o} ${-(t + i + l)} a ${n} ${n} 0 0 1 ${c} -${c} c ${l} ${-o} ${i + l} ${-o} ${t + i + l} ${-o}`;
}
var NT = ({
  cornerRadius: n,
  exponent: t,
  roundingAndSmoothingBudget: i
}) => {
  const l = Math.min(n, i);
  if (l <= 0) return br;
  const o = Number.isFinite(t) ? Math.max(2, t) : 4, c = 2 / o, u = o === 2 ? (b) => b : o === 4 ? Math.sqrt : o === 8 ? (b) => Math.sqrt(Math.sqrt(b)) : (b) => Math.pow(b, c), d = c - 1, p = o === 2 ? () => 1 : o === 4 ? (b) => 1 / Math.sqrt(b) : (b) => Math.pow(b, d), y = [0, Math.PI / 6, Math.PI / 3, Math.PI / 2], g = y.map((b, j) => {
    if (j === 0) return [0, 0];
    if (j === y.length - 1) return [l, l];
    const w = Math.sin(b), T = Math.cos(b);
    return [l * u(w), l * (1 - u(T))];
  }), v = y.map((b, j) => {
    if (j === 0) return [1, 0];
    if (j === y.length - 1) return [0, 1];
    const w = Math.sin(b), T = Math.cos(b), x = c * p(w) * T * l, A = c * p(T) * w * l, _ = Math.hypot(x, A) || 1;
    return [x / _, A / _];
  });
  return {
    p: l,
    pathSegment: (b) => {
      const j = [];
      for (let w = 0; w < y.length - 1; w++) {
        const [T, x] = g[w], [A, _] = g[w + 1], [E, M] = v[w], [O, D] = v[w + 1], N = (y[w] + y[w + 1]) / 2, V = Math.sin(N), H = Math.cos(N), B = l * u(V), U = l * (1 - u(H)), F = 8 / 3 * (B - (T + A) / 2), Y = 8 / 3 * (U - (x + _) / 2), st = O * M - D * E, I = st !== 0 ? (-D * F + O * Y) / st : 0, $ = st !== 0 ? (E * Y - M * F) / st : 0, X = T + I * E, J = x + I * M, tt = A - $ * O, ut = _ - $ * D, L = X - T, q = J - x, G = tt - T, et = ut - x, ot = A - T, ct = _ - x, ht = On(L, q, b), nt = Ln(L, q, b), dt = On(G, et, b), ft = Ln(G, et, b), yt = On(ot, ct, b), gt = Ln(ot, ct, b);
        j.push(dn`c ${ht} ${nt} ${dt} ${ft} ${yt} ${gt}`);
      }
      return j.join(" ");
    }
  };
};
function Ov(n, t, i, l) {
  if (l <= 0) return { x: 0, y: 0, theta: n };
  const c = l / 32;
  let u = 0, d = 0;
  for (let y = 1; y <= 32; y++) {
    const g = (y - 1) * c, v = g + c, b = (g + v) / 2, j = n + t * g + i / 2 * g * g, w = n + t * v + i / 2 * v * v, T = n + t * b + i / 2 * b * b;
    u += c / 6 * (Math.cos(j) + 4 * Math.cos(T) + Math.cos(w)), d += c / 6 * (Math.sin(j) + 4 * Math.sin(T) + Math.sin(w));
  }
  const p = n + t * l + i / 2 * l * l;
  return { x: u, y: d, theta: p };
}
var OT = 1e-6, LT = ({
  cornerRadius: n,
  smoothing: t,
  roundingAndSmoothingBudget: i
}) => {
  if (n <= 0) return br;
  const l = Math.max(0, Math.min(1, t)), o = n, c = Math.PI / 4 * l, u = Math.PI / 2 * o * l, d = u > 0 ? 1 / (o * u) : 0, { x: p, y } = u > 0 ? Ov(0, 0, d, u) : { x: 0, y: 0 }, { x: g, y: v } = u > 0 ? Ov(0, 0, d, u / 2) : { x: 0, y: 0 }, b = p - o * Math.sin(c), j = y + o * Math.cos(c), w = b + j;
  let T = w, x = o, A = p, _ = y, E = g, M = v;
  if (w > i && w > 0) {
    const H = i / w;
    T = i, x = o * H, A = p * H, _ = y * H, E = g * H, M = v * H;
  }
  if (T <= 0)
    return br;
  let O = 0, D = 0;
  if (u > 0) {
    const H = Math.cos(c), B = Math.sin(c);
    B > 1e-12 && (D = 8 / 3 * (_ / 2 - M) / B), O = 8 / 3 * (E - A / 2) + D * H;
  }
  const N = Math.PI / 2 - 2 * c, V = Math.abs(N) > OT;
  return {
    p: T,
    pathSegment: (H) => {
      const B = [];
      if (u > 0) {
        const U = O, F = 0, Y = A - D * Math.cos(c), st = _ - D * Math.sin(c), I = A, $ = _, X = On(U, F, H), J = Ln(U, F, H), tt = On(Y, st, H), ut = Ln(Y, st, H), L = On(I, $, H), q = Ln(I, $, H);
        B.push(dn`c ${X} ${J} ${tt} ${ut} ${L} ${q}`);
      }
      if (V) {
        const U = T - A - _, F = T - A - _, Y = On(U, F, H), st = Ln(U, F, H);
        B.push(dn`a ${x} ${x} 0 0 1 ${Y} ${st}`);
      }
      if (u > 0) {
        const U = D * Math.sin(c), F = D * Math.cos(c), Y = _, st = A - O, I = _, $ = A, X = On(U, F, H), J = Ln(U, F, H), tt = On(Y, st, H), ut = Ln(Y, st, H), L = On(I, $, H), q = Ln(I, $, H);
        B.push(dn`c ${X} ${J} ${tt} ${ut} ${L} ${q}`);
      }
      return B.join(" ");
    }
  };
}, $T = 4, kT = {
  arc: AT,
  squircle: ET,
  superellipse: NT,
  clothoid: LT
};
function BT(n) {
  return kT[n];
}
var VT = 64, Ci = /* @__PURE__ */ new Map();
function zT(n, t) {
  return n + "|" + t.cornerRadius + "|" + t.smoothing + "|" + t.exponent + "|" + (t.preserveSmoothing ? 1 : 0) + "|" + t.roundingAndSmoothingBudget;
}
function UT(n) {
  return !Number.isFinite(n.cornerRadius) || !Number.isFinite(n.smoothing) || !Number.isFinite(n.exponent) || !Number.isFinite(n.roundingAndSmoothingBudget);
}
function HT(n) {
  const t = {};
  return {
    p: n.p,
    pathSegment: (i) => {
      const l = t[i];
      if (l !== void 0) return l;
      const o = n.pathSegment(i);
      return t[i] = o, o;
    }
  };
}
function qT(n, t, i) {
  if (UT(i)) return t(i);
  const l = zT(n, i), o = Ci.get(l);
  if (o)
    return Ci.delete(l), Ci.set(l, o), o;
  const c = HT(t(i));
  if (Ci.size >= VT) {
    const u = Ci.keys().next().value;
    u !== void 0 && Ci.delete(u);
  }
  return Ci.set(l, c), c;
}
function Jo(n, t, i, l) {
  const o = Math.min(t, l / n - 1), c = Ym({
    cornerRadius: n,
    cornerSmoothing: o,
    preserveSmoothing: i,
    roundingAndSmoothingBudget: l
  }), u = c.a + c.b + c.c;
  return {
    p: c.p,
    a: c.a,
    b: c.b,
    c: c.c,
    d: c.d,
    e: u,
    ax: c.p - u,
    ay: n - c.d,
    R: n
  };
}
function YT({ a: n, b: t, c: i, d: l, e: o, ax: c, ay: u, R: d }) {
  return dn`c ${n} 0 ${n + t} 0 ${o} ${l} a ${d} ${d} 0 0 1 ${c} ${u} a ${d} ${d} 0 0 1 ${-c} ${u} c ${-i} ${l} ${-(t + i)} ${l} ${-o} ${l}`;
}
function PT({ a: n, b: t, c: i, d: l, e: o, ax: c, ay: u, R: d }) {
  return dn`c ${-n} 0 ${-(n + t)} 0 ${-o} ${-l} a ${d} ${d} 0 0 1 ${-c} ${-u} a ${d} ${d} 0 0 1 ${c} ${-u} c ${i} ${-l} ${t + i} ${-l} ${o} ${-l}`;
}
function GT({ a: n, b: t, c: i, d: l, e: o, ax: c, ay: u, R: d }) {
  return dn`c 0 ${-n} 0 ${-(n + t)} ${l} ${-o} a ${d} ${d} 0 0 1 ${u} ${-c} a ${d} ${d} 0 0 1 ${u} ${c} c ${l} ${i} ${l} ${t + i} ${l} ${o}`;
}
function XT({ a: n, b: t, c: i, d: l, e: o, ax: c, ay: u, R: d }) {
  return dn`c 0 ${n} 0 ${n + t} ${-l} ${o} a ${d} ${d} 0 0 1 ${-u} ${c} a ${d} ${d} 0 0 1 ${-u} ${-c} c ${-l} ${-i} ${-l} ${-(t + i)} ${-l} ${-o}`;
}
function Lv(n, t, i, l) {
  const o = Ym({
    cornerRadius: n,
    cornerSmoothing: t,
    preserveSmoothing: i,
    roundingAndSmoothingBudget: l
  }), c = Fl(45 * t);
  return {
    a: o.a,
    b: o.b,
    p: o.p,
    sin: Math.sin(c),
    cos: Math.cos(c)
  };
}
var $v = (n, t, i) => Math.max(0, Math.min(n / t - 1, i)), Ae = (n) => (Object.is(n, -0) ? 0 : n).toFixed(4);
function KT(n, t, i, l, o) {
  const c = Lv(i, $v(n / 2, i, l), o, n / 2), u = Lv(i, $v(t / 2, i, l), o, t / 2), d = (b, j, w, T, x, A) => {
    const _ = T === 0 ? c : u, E = A === 0 ? c : u, M = b + (w + x) * i, O = j + (T + A) * i, D = M - x * i * _.cos - w * i * _.sin, N = O - A * i * _.cos - T * i * _.sin, V = M - w * i * E.cos - x * i * E.sin, H = O - T * i * E.cos - A * i * E.sin, B = b + w * _.p, U = j + T * _.p, F = Math.hypot(V - D, H - N) > 1e-6, Y = F ? V : D, st = F ? H : N, I = b + x * E.p, $ = j + A * E.p;
    let X = `L ${Ae(B)} ${Ae(U)} `;
    return X += `c ${Ae(-w * _.a)} ${Ae(-T * _.a)} ${Ae(-w * (_.a + _.b))} ${Ae(-T * (_.a + _.b))} ${Ae(D - B)} ${Ae(N - U)} `, F && (X += `a ${Ae(i)} ${Ae(i)} 0 0 1 ${Ae(V - D)} ${Ae(H - N)} `), X += `c ${Ae(I - x * (E.a + E.b) - Y)} ${Ae($ - A * (E.a + E.b) - st)} ${Ae(I - x * E.a - Y)} ${Ae($ - A * E.a - st)} ${Ae(I - Y)} ${Ae($ - st)}`, X;
  }, p = d(n, 0, -1, 0, 0, 1), y = d(n, t, 0, -1, -1, 0), g = d(0, t, 1, 0, 0, -1), v = d(0, 0, 0, 1, 1, 0);
  return `M ${Ae(c.p)} 0 ${p} ${y} ${g} ${v} Z`;
}
var ZT = 0.6, QT = !0, FT = "squircle";
function tS(n) {
  return {
    radius: n.radius,
    curve: n.curve ?? FT,
    smoothing: n.smoothing ?? ZT,
    exponent: n.exponent ?? $T,
    preserveSmoothing: n.preserveSmoothing ?? QT
  };
}
function Wo(n) {
  return tS(typeof n == "number" ? { radius: n } : n ?? { radius: 0 });
}
function IT(n) {
  if ("radius" in n) {
    const t = tS(n);
    return { topLeft: t, topRight: t, bottomRight: t, bottomLeft: t };
  }
  return {
    topLeft: Wo(n.topLeft),
    topRight: Wo(n.topRight),
    bottomRight: Wo(n.bottomRight),
    bottomLeft: Wo(n.bottomLeft)
  };
}
function eS(n, t, i) {
  if (n <= 0 || t <= 0)
    return "M 0 0 H 0 V 0 H 0 Z";
  const l = IT(i);
  if (l.topLeft.radius <= 0 && l.topRight.radius <= 0 && l.bottomRight.radius <= 0 && l.bottomLeft.radius <= 0)
    return `M 0 0 H ${n} V ${t} H 0 Z`;
  const o = jT({
    topLeftCornerRadius: l.topLeft.radius,
    topRightCornerRadius: l.topRight.radius,
    bottomRightCornerRadius: l.bottomRight.radius,
    bottomLeftCornerRadius: l.bottomLeft.radius,
    width: n,
    height: t
  }), c = (_) => {
    const E = l[_], M = BT(E.curve);
    return qT(E.curve, M, {
      cornerRadius: o[_].radius,
      smoothing: E.smoothing,
      exponent: E.exponent,
      preserveSmoothing: E.preserveSmoothing,
      roundingAndSmoothingBudget: o[_].roundingAndSmoothingBudget
    });
  }, u = (_) => {
    let E;
    return () => E ?? (E = c(_));
  }, d = u("topLeft"), p = u("topRight"), y = u("bottomRight"), g = u("bottomLeft"), v = (_) => _.toFixed(4), b = (_) => _.length > 0 ? " " + _ : "", j = l.topLeft;
  if (JT(l)) {
    const _ = Math.min(j.radius, n / 2, t / 2), E = Math.min(n, t) / 2, M = 1e-9;
    if (_ > 0 && E > _ + M && E < (1 + j.smoothing) * _ - M)
      return KT(n, t, _, j.smoothing, j.preserveSmoothing);
  }
  const w = 1e-9, T = n >= t, x = T ? t / 2 : n / 2, A = (_, E) => {
    const M = l[_], O = l[E];
    return M.curve === "squircle" && O.curve === "squircle" && Math.abs(o[_].radius - x) < w && Math.abs(o[E].radius - x) < w && M.smoothing === O.smoothing && M.preserveSmoothing === O.preserveSmoothing;
  };
  if (T) {
    const _ = A("topRight", "bottomRight"), E = A("topLeft", "bottomLeft");
    if (_ || E) {
      const M = n / 2, O = _ ? Jo(x, l.topRight.smoothing, l.topRight.preserveSmoothing, M) : null, D = E ? Jo(x, l.topLeft.smoothing, l.topLeft.preserveSmoothing, M) : null;
      let N = "M " + v(D ? D.p : d().p) + " 0";
      return N += " L " + v(n - (O ? O.p : p().p)) + " 0", O ? N += " " + YT(O) : (N += b(p().pathSegment("TR")), N += " L " + v(n) + " " + v(y().p), N += " L " + v(n) + " " + v(t - y().p), N += b(y().pathSegment("BR"))), D ? (N += " L " + v(D.p) + " " + v(t), N += " " + PT(D)) : (N += " L " + v(n - g().p) + " " + v(t), N += " L " + v(g().p) + " " + v(t), N += b(g().pathSegment("BL")), N += " L 0 " + v(t - d().p), N += " L 0 " + v(d().p), N += b(d().pathSegment("TL"))), N + " Z";
    }
  } else {
    const _ = A("topLeft", "topRight"), E = A("bottomLeft", "bottomRight");
    if (_ || E) {
      const M = t / 2, O = _ ? Jo(x, l.topLeft.smoothing, l.topLeft.preserveSmoothing, M) : null, D = E ? Jo(x, l.bottomLeft.smoothing, l.bottomLeft.preserveSmoothing, M) : null;
      let N;
      return O ? N = "M 0 " + v(O.p) + " " + GT(O) : (N = "M " + v(d().p) + " 0", N += " L " + v(n - p().p) + " 0", N += b(p().pathSegment("TR"))), N += " L " + v(n) + " " + v(t - (D ? D.p : y().p)), D ? N += " " + XT(D) : (N += b(y().pathSegment("BR")), N += " L " + v(g().p) + " " + v(t), N += b(g().pathSegment("BL"))), O ? N += " L 0 " + v(O.p) : (N += " L 0 " + v(t - d().p), N += " L 0 " + v(d().p), N += b(d().pathSegment("TL"))), N + " Z";
    }
  }
  return "M " + v(d().p) + " 0 L " + v(n - p().p) + " 0" + b(p().pathSegment("TR")) + " L " + v(n) + " " + v(y().p) + " L " + v(n) + " " + v(t - y().p) + b(y().pathSegment("BR")) + " L " + v(n - g().p) + " " + v(t) + " L " + v(g().p) + " " + v(t) + b(g().pathSegment("BL")) + " L 0 " + v(t - d().p) + " L 0 " + v(d().p) + b(d().pathSegment("TL")) + " Z";
}
function JT(n) {
  const t = n.topLeft;
  return t.curve === "squircle" && [n.topRight, n.bottomRight, n.bottomLeft].every(
    (i) => i.curve === "squircle" && i.radius === t.radius && i.smoothing === t.smoothing && i.preserveSmoothing === t.preserveSmoothing
  );
}
function WT(n, t, i) {
  return `path("${eS(n, t, i)}")`;
}
var Qt = "http://www.w3.org/2000/svg", tj = 0;
function Pm() {
  return ++tj;
}
function nS(n) {
  const t = n.replace("#", "");
  return t.length === 3 ? "#" + t[0] + t[0] + t[1] + t[1] + t[2] + t[2] : "#" + t;
}
function aS(n) {
  const t = nS(n).replace("#", "");
  return `rgb(${parseInt(t.substring(0, 2), 16)},${parseInt(t.substring(2, 4), 16)},${parseInt(t.substring(4, 6), 16)})`;
}
var ej = {
  offsetX: 0,
  offsetY: 0,
  blur: 0,
  spread: 0,
  color: "#000",
  opacity: 0
};
function iS(n) {
  const t = /* @__PURE__ */ new Map(), i = JSON.stringify(n);
  return (l, o, c, u) => {
    const d = `${l}:${o}:${u}:${i}`;
    let p = t.get(d);
    return p === void 0 && (p = eS(l, o, c), t.set(d, p)), p;
  };
}
function sS(n, t) {
  if (t === 0) return n;
  if ("radius" in n)
    return { ...n, radius: Math.max(0, n.radius + t) };
  const i = (l) => {
    if (l !== void 0)
      return typeof l == "number" ? Math.max(0, l + t) : { ...l, radius: Math.max(0, l.radius + t) };
  };
  return {
    topLeft: i(n.topLeft),
    topRight: i(n.topRight),
    bottomRight: i(n.bottomRight),
    bottomLeft: i(n.bottomLeft)
  };
}
function Bh(n) {
  const t = nS(n).replace("#", ""), i = parseInt(t.substring(0, 2), 16), l = parseInt(t.substring(2, 4), 16), o = parseInt(t.substring(4, 6), 16);
  if (i === 0 && l === 0 && o === 0) return "#4c4c4c";
  const c = Math.round(i * 2 / 3), u = Math.round(l * 2 / 3), d = Math.round(o * 2 / 3);
  return "#" + (1 << 24 | c << 16 | u << 8 | d).toString(16).slice(1);
}
function Vh(n) {
  return typeof n == "object" && n !== null && "type" in n;
}
function nj(n) {
  const t = (90 - n) * Math.PI / 180;
  return {
    x1: 0.5 - 0.5 * Math.cos(t),
    y1: 0.5 + 0.5 * Math.sin(t),
    x2: 0.5 + 0.5 * Math.cos(t),
    y2: 0.5 - 0.5 * Math.sin(t)
  };
}
function lS(n, t) {
  for (; n.lastChild; ) n.removeChild(n.lastChild);
  for (const i of t) {
    const l = document.createElementNS(Qt, "stop");
    l.setAttribute("offset", String(i.offset)), l.setAttribute("stop-color", i.color), i.opacity !== void 0 && i.opacity !== 1 && l.setAttribute("stop-opacity", String(i.opacity)), n.appendChild(l);
  }
}
function aj(n, t, i) {
  const l = t.type === "linear" ? "linearGradient" : "radialGradient", o = document.createElementNS(Qt, l);
  return o.setAttribute("id", i), rS(o, t), lS(o, t.stops), n.appendChild(o), o;
}
function ij(n, t) {
  rS(n, t), lS(n, t.stops);
}
function rS(n, t) {
  if (t.type === "linear") {
    const i = nj(t.angle ?? 0);
    n.setAttribute("x1", String(i.x1)), n.setAttribute("y1", String(i.y1)), n.setAttribute("x2", String(i.x2)), n.setAttribute("y2", String(i.y2));
  } else
    n.setAttribute("cx", String(t.cx ?? 0.5)), n.setAttribute("cy", String(t.cy ?? 0.5)), n.setAttribute("r", String(t.r ?? 0.5));
}
function kv(n) {
  return { ...n, stops: n.stops.map((t) => ({ ...t, color: Bh(t.color) })) };
}
function zh(n, t, i, l) {
  n.setAttribute("x", String(-t)), n.setAttribute("y", String(-t)), n.setAttribute("width", String(i + t * 2)), n.setAttribute("height", String(l + t * 2));
}
function tc(n, t, i, l, o) {
  zh(n, i, l, o), zh(t, i, l, o);
}
function Hd(n, t, i) {
  const l = document.createElementNS(Qt, "mask");
  l.setAttribute("id", n), i && l.setAttribute("maskUnits", "userSpaceOnUse");
  const o = document.createElementNS(Qt, "rect");
  o.setAttribute("fill", "white");
  const c = document.createElementNS(Qt, "path");
  return c.setAttribute("fill", "none"), c.setAttribute("stroke", "black"), l.appendChild(o), l.appendChild(c), t.appendChild(l), { mask: l, rect: o, knockout: c };
}
function qd(n) {
  const t = document.createElementNS(Qt, "g"), i = document.createElementNS(Qt, "path");
  i.setAttribute("fill", "none"), n && i.setAttribute(n.attr, n.value), i.style.display = "none", t.appendChild(i);
  const l = document.createElementNS(Qt, "path");
  return l.setAttribute("fill", "none"), n && l.setAttribute(n.attr, n.value), l.style.display = "none", t.appendChild(l), { group: t, strokePath: i, grooveOverlay: l };
}
function jc(n, t) {
  const i = t === "main" ? "gradientEl" : "overlayGradientEl";
  n[i]?.remove(), n[i] = null;
}
function ec(n, t, i) {
  if (!Vh(n))
    return jc(t, i), n;
  const l = i === "main" ? "gradientEl" : "overlayGradientEl", o = i === "main" ? t.gradientId : t.overlayGradientId;
  return t[l] ? ij(t[l], n) : t[l] = aj(t.defs, n, o), `url(#${o})`;
}
function Yd(n, t, i, l, o) {
  if (!n || n.width <= 0 || n.opacity <= 0) {
    o.strokePath.style.display = "none", o.strokeGroup.removeAttribute("mask"), o.grooveOverlay.style.display = "none", jc(o, "main"), jc(o, "overlay");
    return;
  }
  const c = o.strokeMultiplier;
  o.strokePath.style.display = "", o.strokePath.setAttribute("d", t), o.strokePath.setAttribute("stroke", ec(n.color, o, "main")), o.strokePath.setAttribute("stroke-width", String(n.width * c)), o.strokePath.setAttribute("stroke-opacity", String(n.opacity));
  const u = n.style ?? "solid";
  switch (o.strokeGroup.removeAttribute("mask"), o.grooveOverlay.style.display = "none", o.strokePath.removeAttribute("stroke-dasharray"), o.strokePath.setAttribute("stroke-linecap", "butt"), u !== "groove" && u !== "ridge" && jc(o, "overlay"), u) {
    case "dashed": {
      const d = Math.max(0, n.dash ?? n.width * 3), p = Math.max(0, n.gap ?? n.width * 2);
      o.strokePath.setAttribute("stroke-dasharray", `${d} ${p}`), n.lineCap && o.strokePath.setAttribute("stroke-linecap", n.lineCap);
      break;
    }
    case "dotted": {
      const d = Math.max(0, n.dash ?? 0), p = Math.max(0, n.gap ?? n.width * 2);
      o.strokePath.setAttribute("stroke-dasharray", `${d} ${p}`), o.strokePath.setAttribute("stroke-linecap", n.lineCap ?? "round");
      break;
    }
    case "double":
      if (n.width >= 3) {
        const d = Math.round(n.width / 3);
        o.dblKnockout.setAttribute("d", t), o.dblKnockout.setAttribute("stroke-width", String(d * c)), o.dblRect.setAttribute("width", String(i)), o.dblRect.setAttribute("height", String(l)), o.padDblMask && o.padDblMask(n.width, i, l), o.strokeGroup.setAttribute("mask", `url(#${o.dblMaskId})`);
      }
      break;
    case "groove": {
      const d = Vh(n.color) ? kv(n.color) : Bh(n.color);
      o.strokePath.setAttribute("stroke", ec(d, o, "main")), o.grooveOverlay.style.display = "", o.grooveOverlay.setAttribute("d", t), o.grooveOverlay.setAttribute("stroke", ec(n.color, o, "overlay")), o.grooveOverlay.setAttribute("stroke-width", String(n.width * c / 2)), o.grooveOverlay.setAttribute("stroke-opacity", String(n.opacity));
      break;
    }
    case "ridge": {
      const d = Vh(n.color) ? kv(n.color) : Bh(n.color);
      o.grooveOverlay.style.display = "", o.grooveOverlay.setAttribute("d", t), o.grooveOverlay.setAttribute("stroke", ec(d, o, "overlay")), o.grooveOverlay.setAttribute("stroke-width", String(n.width * c / 2)), o.grooveOverlay.setAttribute("stroke-opacity", String(n.opacity));
      break;
    }
  }
}
function sj(n, t) {
  const i = Pm(), l = `sc-ishadow-mask-${i}`, o = document.createElementNS(Qt, "mask");
  o.setAttribute("id", l), o.setAttribute("maskUnits", "userSpaceOnUse");
  const c = document.createElementNS(Qt, "rect");
  c.setAttribute("fill", "white");
  const u = document.createElementNS(Qt, "path");
  u.setAttribute("fill", "black"), o.appendChild(c), o.appendChild(u), n.appendChild(o);
  const d = `sc-ishadow-blur-${i}`, p = document.createElementNS(Qt, "filter");
  p.setAttribute("id", d), p.setAttribute("x", "-200%"), p.setAttribute("y", "-200%"), p.setAttribute("width", "500%"), p.setAttribute("height", "500%"), p.setAttribute("color-interpolation-filters", "sRGB");
  const y = document.createElementNS(Qt, "feGaussianBlur");
  y.setAttribute("stdDeviation", "0"), p.appendChild(y), n.appendChild(p);
  const g = document.createElementNS(Qt, "g"), v = document.createElementNS(Qt, "rect");
  return v.setAttribute("mask", `url(#${l})`), v.style.display = "none", g.appendChild(v), t.appendChild(g), { maskId: l, mask: o, maskRect: c, maskCutout: u, filterId: d, filter: p, feBlur: y, blurGroup: g, rect: v };
}
function lj(n) {
  n.mask.remove(), n.filter.remove(), n.blurGroup.remove();
}
function rj(n) {
  const t = Pm(), i = `sc-clip-${t}`, l = `sc-mask-${t}`, o = document.createElementNS(Qt, "svg");
  o.style.position = "absolute", o.style.inset = "0", o.style.pointerEvents = "none", o.style.overflow = "visible", o.style.zIndex = "1", o.setAttribute("aria-hidden", "true");
  const c = document.createElementNS(Qt, "defs"), u = document.createElementNS(Qt, "clipPath");
  u.setAttribute("id", i);
  const d = document.createElementNS(Qt, "path");
  u.appendChild(d), c.appendChild(u);
  const p = document.createElementNS(Qt, "mask");
  p.setAttribute("id", l), p.setAttribute("maskUnits", "userSpaceOnUse");
  const y = document.createElementNS(Qt, "rect");
  y.setAttribute("fill", "white");
  const g = document.createElementNS(Qt, "path");
  g.setAttribute("fill", "black"), p.appendChild(y), p.appendChild(g), c.appendChild(p);
  const v = `sc-dbl-inner-${t}`, { rect: b, knockout: j } = Hd(v, c, !1), w = `sc-dbl-outer-${t}`, { mask: T, rect: x, knockout: A } = Hd(w, c, !0), _ = `sc-dbl-middle-${t}`, { mask: E, rect: M, knockout: O } = Hd(_, c, !0);
  o.appendChild(c);
  const D = document.createElementNS(Qt, "g");
  D.setAttribute("clip-path", `url(#${i})`), o.appendChild(D);
  const N = [], { group: V, strokePath: H, grooveOverlay: B } = qd({ attr: "clip-path", value: `url(#${i})` });
  o.appendChild(V);
  const { group: U, strokePath: F, grooveOverlay: Y } = qd({ attr: "mask", value: `url(#${l})` });
  o.appendChild(U);
  const { group: st, strokePath: I, grooveOverlay: $ } = qd();
  o.appendChild(st), n.appendChild(o);
  const X = {
    strokePath: H,
    grooveOverlay: B,
    strokeGroup: V,
    dblMaskId: v,
    dblKnockout: j,
    dblRect: b,
    strokeMultiplier: 2,
    defs: c,
    gradientEl: null,
    gradientId: `sc-grad-inner-${t}`,
    overlayGradientEl: null,
    overlayGradientId: `sc-grad-inner-ov-${t}`
  }, J = {
    strokePath: F,
    grooveOverlay: Y,
    strokeGroup: U,
    dblMaskId: w,
    dblKnockout: A,
    dblRect: x,
    strokeMultiplier: 2,
    defs: c,
    gradientEl: null,
    gradientId: `sc-grad-outer-${t}`,
    overlayGradientEl: null,
    overlayGradientId: `sc-grad-outer-ov-${t}`,
    padDblMask: (ut, L, q) => tc(T, x, ut, L, q)
  }, tt = {
    strokePath: I,
    grooveOverlay: $,
    strokeGroup: st,
    dblMaskId: _,
    dblKnockout: O,
    dblRect: M,
    strokeMultiplier: 1,
    defs: c,
    gradientEl: null,
    gradientId: `sc-grad-middle-${t}`,
    overlayGradientEl: null,
    overlayGradientId: `sc-grad-middle-ov-${t}`,
    padDblMask: (ut, L, q) => tc(E, M, ut, L, q)
  };
  return {
    update(ut, L, q, G) {
      if (q <= 0 || G <= 0) return;
      o.setAttribute("width", String(q)), o.setAttribute("height", String(G)), o.setAttribute("viewBox", `0 0 ${q} ${G}`);
      const et = iS(ut), ot = et(q, G, ut, 0);
      d.setAttribute("d", ot), g.setAttribute("d", ot), y.setAttribute("width", String(q)), y.setAttribute("height", String(G)), Yd(L.innerBorder, ot, q, G, X);
      const ct = L.outerBorder;
      ct && ct.width > 0 && ct.opacity > 0 && tc(p, y, ct.width, q, G), Yd(ct, ot, q, G, J), Yd(L.middleBorder, ot, q, G, tt);
      const ht = L.innerShadow, nt = ht == null ? [] : Array.isArray(ht) ? ht : [ht];
      for (; N.length < nt.length; )
        N.push(sj(c, D));
      for (; N.length > nt.length; )
        lj(N.pop());
      for (let dt = 0; dt < nt.length; dt++) {
        const ft = nt[dt], yt = N[dt];
        if (ft.opacity <= 0) {
          yt.rect.style.display = "none";
          continue;
        }
        yt.rect.style.display = "";
        const gt = ft.spread, ue = Math.max(ft.blur * 3, 20) + Math.max(Math.abs(ft.offsetX), Math.abs(ft.offsetY)) + Math.abs(gt);
        tc(yt.mask, yt.maskRect, ue, q, G);
        const mt = Math.max(1, q - gt * 2), _t = Math.max(1, G - gt * 2), ne = gt !== 0 ? sS(ut, -gt) : ut;
        yt.maskCutout.setAttribute("d", et(mt, _t, ne, -gt)), yt.maskCutout.setAttribute(
          "transform",
          `translate(${ft.offsetX + gt},${ft.offsetY + gt})`
        ), ft.blur > 0 ? (yt.feBlur.setAttribute("stdDeviation", String(ft.blur)), yt.blurGroup.setAttribute("filter", `url(#${yt.filterId})`)) : yt.blurGroup.removeAttribute("filter"), zh(yt.rect, ue, q, G), yt.rect.setAttribute("fill", aS(ft.color)), yt.rect.setAttribute("fill-opacity", String(ft.opacity));
      }
    },
    destroy() {
      o.remove();
    }
  };
}
function oj(n, t) {
  return Math.ceil(3 * n + Math.abs(t) + 1);
}
function cj(n, t, i, l) {
  n.setAttribute("x", String(-l)), n.setAttribute("y", String(-l)), n.setAttribute("width", String(t + 2 * l)), n.setAttribute("height", String(i + 2 * l));
}
function uj(n, t) {
  const i = `sc-shadow-${Pm()}`, l = document.createElementNS(Qt, "filter");
  l.setAttribute("id", i), l.setAttribute("filterUnits", "userSpaceOnUse"), l.setAttribute("color-interpolation-filters", "sRGB");
  const o = document.createElementNS(Qt, "feGaussianBlur");
  o.setAttribute("stdDeviation", "0"), l.appendChild(o), n.appendChild(l);
  const c = document.createElementNS(Qt, "path");
  return t.appendChild(c), { filterId: i, filterEl: l, feBlur: o, pathEl: c };
}
function fj(n) {
  n.filterEl.remove(), n.pathEl.remove();
}
function dj(n) {
  const t = n.style.isolation;
  n.style.isolation = "isolate";
  const i = document.createElementNS(Qt, "svg");
  i.style.cssText = "position:absolute;inset:0;overflow:visible;pointer-events:none;z-index:-1", i.setAttribute("width", "100%"), i.setAttribute("height", "100%"), i.setAttribute("aria-hidden", "true");
  const l = document.createElementNS(Qt, "defs");
  i.appendChild(l), n.appendChild(i);
  const o = [];
  return {
    update(c, u, d, p) {
      const y = Array.isArray(u) ? u : [u];
      if (!(d > 0 && p > 0 && y.some((j) => j.opacity > 0))) {
        i.style.display = "none";
        return;
      }
      for (; o.length < y.length; ) o.push(uj(l, i));
      for (; o.length > y.length; ) fj(o.pop());
      const v = iS(c);
      let b = !1;
      for (let j = 0; j < y.length; j++) {
        const w = y[j], T = o[y.length - 1 - j];
        if (w.opacity <= 0) {
          T.pathEl.style.display = "none";
          continue;
        }
        const x = w.spread, A = d + x * 2, _ = p + x * 2;
        if (A <= 0 || _ <= 0) {
          T.pathEl.style.display = "none";
          continue;
        }
        b = !0, T.pathEl.style.display = "";
        const E = aS(w.color), M = sS(c, x);
        if (T.pathEl.setAttribute("d", v(A, _, M, x)), T.pathEl.setAttribute("transform", `translate(${w.offsetX - x},${w.offsetY - x})`), T.pathEl.setAttribute("fill", E), T.pathEl.setAttribute("fill-opacity", String(w.opacity)), w.blur > 0) {
          const O = oj(w.blur, x);
          cj(T.filterEl, A, _, O), T.feBlur.setAttribute("stdDeviation", String(w.blur)), T.pathEl.setAttribute("filter", `url(#${T.filterId})`);
        } else
          T.pathEl.removeAttribute("filter");
      }
      i.style.display = b ? "" : "none";
    },
    destroy() {
      i.remove(), n.style.isolation = t;
    }
  };
}
var ir = null, Qa, Il = /* @__PURE__ */ new Map(), xr = /* @__PURE__ */ new Set();
function oS() {
  Qa = void 0;
  const n = [...xr];
  xr.clear();
  for (const t of n) {
    const i = Il.get(t);
    if (i) for (const l of [...i]) l();
  }
}
function hj() {
  return ir || (ir = new ResizeObserver((n) => {
    for (const t of n)
      xr.add(t.target);
    Qa === void 0 && (Qa = requestAnimationFrame(oS));
  })), ir;
}
function mj(n, t) {
  if (typeof ResizeObserver > "u") return () => {
  };
  const i = hj();
  let l = Il.get(n);
  return l || (l = /* @__PURE__ */ new Set(), Il.set(n, l), i.observe(n)), l.add(t), xr.add(n), Qa === void 0 && (Qa = requestAnimationFrame(oS)), () => {
    l.delete(t), l.size === 0 && (Il.delete(n), i.unobserve(n)), Il.size === 0 && (Qa !== void 0 && (cancelAnimationFrame(Qa), Qa = void 0), xr.clear(), ir?.disconnect(), ir = null);
  };
}
function pj(n) {
  const t = window.getComputedStyle(n), i = (y) => y.endsWith("px") ? parseFloat(y) : NaN, l = i(t.width), o = i(t.height);
  if (Number.isNaN(l) || Number.isNaN(o))
    return { width: n.offsetWidth, height: n.offsetHeight };
  if (t.boxSizing === "border-box")
    return { width: l, height: o };
  const c = (parseFloat(t.paddingLeft) || 0) + (parseFloat(t.paddingRight) || 0), u = (parseFloat(t.paddingTop) || 0) + (parseFloat(t.paddingBottom) || 0), d = (parseFloat(t.borderLeftWidth) || 0) + (parseFloat(t.borderRightWidth) || 0), p = (parseFloat(t.borderTopWidth) || 0) + (parseFloat(t.borderBottomWidth) || 0);
  return { width: l + c + d, height: o + u + p };
}
function cS(n) {
  const t = n.match(
    /^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)(?:\s*[,/]\s*([\d.]+))?\s*\)$/
  );
  if (!t) return;
  const i = Number(t[1]), l = Number(t[2]), o = Number(t[3]), c = t[4] !== void 0 ? Number(t[4]) : 1;
  return { hex: "#" + (1 << 24 | i << 16 | l << 8 | o).toString(16).slice(1), opacity: c };
}
function yj(n) {
  const t = getComputedStyle(n), i = t.borderTopStyle;
  if (i === "none" || i === "hidden") return;
  const l = parseFloat(t.borderTopWidth);
  if (l <= 0 || isNaN(l)) return;
  const o = cS(t.borderTopColor);
  if (!o || o.opacity <= 0) return;
  const u = {
    solid: "solid",
    dashed: "dashed",
    dotted: "dotted",
    double: "double",
    groove: "groove",
    ridge: "ridge"
  }[i];
  return {
    width: l,
    color: o.hex,
    opacity: o.opacity,
    ...u && u !== "solid" ? { style: u } : {}
  };
}
function gj(n) {
  if (!n || n === "none") return {};
  const t = [];
  let i = 0, l = 0;
  for (let u = 0; u < n.length; u++)
    n[u] === "(" ? i++ : n[u] === ")" ? i-- : n[u] === "," && i === 0 && (t.push(n.slice(l, u).trim()), l = u + 1);
  t.push(n.slice(l).trim());
  const o = [], c = [];
  for (const u of t) {
    const d = u.includes("inset"), p = u.replace("inset", "").trim(), y = p.match(/rgba?\([^)]+\)/);
    if (!y) continue;
    const g = cS(y[0]);
    if (!g || g.opacity <= 0) continue;
    const b = p.replace(y[0], "").trim().split(/\s+/).map(parseFloat).filter((w) => !isNaN(w));
    if (b.length < 2) continue;
    const j = {
      offsetX: b[0],
      offsetY: b[1],
      blur: b[2] ?? 0,
      spread: b[3] ?? 0,
      color: g.hex,
      opacity: g.opacity
    };
    (d ? c : o).push(j);
  }
  return {
    shadow: o.length > 0 ? o : void 0,
    innerShadow: c.length > 0 ? c : void 0
  };
}
function Bv(n) {
  const t = {
    border: n.style.border,
    boxShadow: n.style.boxShadow,
    paddingTop: n.style.paddingTop,
    paddingRight: n.style.paddingRight,
    paddingBottom: n.style.paddingBottom,
    paddingLeft: n.style.paddingLeft
  }, i = yj(n), l = getComputedStyle(n), { shadow: o, innerShadow: c } = gj(l.boxShadow), u = l.boxSizing, d = parseFloat(l.borderTopWidth) || 0, p = parseFloat(l.borderRightWidth) || 0, y = parseFloat(l.borderBottomWidth) || 0, g = parseFloat(l.borderLeftWidth) || 0, v = parseFloat(l.paddingTop) || 0, b = parseFloat(l.paddingRight) || 0, j = parseFloat(l.paddingBottom) || 0, w = parseFloat(l.paddingLeft) || 0;
  i && (n.style.border = "0"), (o || c) && (n.style.boxShadow = "none"), i && u === "content-box" && (d > 0 || p > 0 || y > 0 || g > 0) && (n.style.paddingTop = v + d + "px", n.style.paddingRight = b + p + "px", n.style.paddingBottom = j + y + "px", n.style.paddingLeft = w + g + "px");
  const T = {};
  return i && (T.innerBorder = i), o && (T.shadow = o), c && (T.innerShadow = c), { effects: T, savedStyles: t };
}
function Gm(n) {
  return n ? !!(n.innerBorder || n.outerBorder || n.middleBorder || n.innerShadow || n.shadow) : !1;
}
function uS(n, t) {
  return { ...n?.effects, ...t };
}
function Vv(n, t) {
  n.style.border = t.border, n.style.boxShadow = t.boxShadow, n.style.paddingTop = t.paddingTop, n.style.paddingRight = t.paddingRight, n.style.paddingBottom = t.paddingBottom, n.style.paddingLeft = t.paddingLeft;
}
var Vs = /* @__PURE__ */ new WeakMap();
function vj(n) {
  const t = Vs.get(n) ?? 0;
  if (t > 0)
    return Vs.set(n, t + 1), !0;
  const i = getComputedStyle(n).position;
  return i !== "static" && i !== "" ? !1 : (Vs.set(n, 1), n.style.position = "relative", !0);
}
function bj(n) {
  const t = Vs.get(n);
  t !== void 0 && (t <= 1 ? (Vs.delete(n), n.style.position = "") : Vs.set(n, t - 1));
}
var nc = typeof window < "u" ? C.useLayoutEffect : C.useEffect;
function xj(n, t, i, l, o, c) {
  i.update(n, t, o, c), l?.update(n, t.shadow ?? ej, o, c);
}
function Pd(n, t) {
  const i = uS(n.extracted, t.effectsPropRef.current);
  Gm(i) && fS(n, i, t.wrapperRefRef.current, t.skipShadowHandleRef.current);
  const { width: l, height: o } = pj(n.el);
  if (l <= 0 || o <= 0) return;
  const c = t.syncKeyRef.current;
  l === n.lastWidth && o === n.lastHeight && c === n.lastSyncKey || (n.lastWidth = l, n.lastHeight = o, n.lastSyncKey = c, n.el.style.clipPath = WT(l, o, t.optionsRef.current), n.el.setAttribute("data-state", "ready"), n.effectsHandle && xj(t.optionsRef.current, i, n.effectsHandle, n.shadowHandle, l, o));
}
function fS(n, t, i, l) {
  if (!n.anchor) {
    const o = i?.current ?? n.el.parentElement;
    if (!o) return;
    n.anchor = o, n.didAcquire = vj(o);
  }
  n.effectsHandle || (n.effectsHandle = rj(n.anchor)), !n.shadowHandle && t.shadow && !l && (n.shadowHandle = dj(n.anchor));
}
function dS(n, t, i) {
  const { wrapperRef: l, effects: o, autoEffects: c, skipShadowHandle: u, onExtractedShadow: d } = i ?? {}, p = C.useRef(t);
  p.current = t;
  const y = C.useRef(o);
  y.current = o;
  const g = C.useRef(l);
  g.current = l;
  const v = C.useRef(u ?? !1);
  v.current = u ?? !1;
  const b = C.useRef(d);
  b.current = d;
  const j = JSON.stringify(t), w = JSON.stringify(o ?? null), T = c ?? !0, x = u ?? !1, A = C.useRef("");
  A.current = `${j}|${w}`;
  const _ = C.useRef({
    optionsRef: p,
    effectsPropRef: y,
    wrapperRefRef: g,
    skipShadowHandleRef: v,
    onExtractedShadowRef: b,
    syncKeyRef: A
  }), E = C.useRef(null);
  nc(() => {
    const M = n.current;
    if (!M) return;
    const O = M.style.clipPath;
    M.setAttribute("data-slot", "smooth-corners"), M.setAttribute("data-state", "pending");
    const D = T ? Bv(M) : void 0, N = {
      el: M,
      savedClipPath: O,
      extracted: D,
      effectsHandle: void 0,
      shadowHandle: void 0,
      anchor: null,
      didAcquire: !1,
      lastWidth: 0,
      lastHeight: 0,
      lastSyncKey: null
    };
    E.current = N;
    const V = uS(N.extracted, y.current);
    Gm(V) && fS(N, V, g.current, v.current), b.current?.(N.extracted?.effects.shadow);
    const H = mj(M, () => Pd(N, _.current));
    return () => {
      H(), N.effectsHandle?.destroy(), N.shadowHandle?.destroy(), N.extracted && Vv(M, N.extracted.savedStyles), b.current?.(void 0), N.didAcquire && N.anchor && bj(N.anchor), E.current = null, M.style.clipPath = O, M.removeAttribute("data-slot"), M.removeAttribute("data-state");
    };
  }, [n]), nc(() => {
    const M = E.current;
    M && Pd(M, _.current);
  }), nc(() => {
    if (!x) return;
    const M = E.current;
    !M || !M.shadowHandle || (M.shadowHandle.destroy(), M.shadowHandle = void 0, M.lastSyncKey = null);
  }, [x]), nc(() => {
    const M = E.current;
    if (!M) return;
    const O = M.extracted !== void 0;
    if (T && !O)
      M.extracted = Bv(M.el);
    else if (!T && O)
      Vv(M.el, M.extracted.savedStyles), M.extracted = void 0;
    else
      return;
    b.current?.(M.extracted?.effects.shadow), M.lastSyncKey = null, Pd(M, _.current);
  }, [T]);
}
function hS(...n) {
  return (t) => {
    for (const i of n)
      i && (typeof i == "function" ? i(t) : i.current = t);
  };
}
function Sj(n, t) {
  const i = { ...n };
  for (const l of Object.keys(t)) {
    const o = t[l], c = i[l];
    /^on[A-Z]/.test(l) && typeof o == "function" ? typeof c == "function" ? i[l] = (...u) => {
      o(...u);
      const d = u[0];
      d && d.defaultPrevented || c(...u);
    } : i[l] = o : l === "className" ? i[l] = [c, o].filter(Boolean).join(" ") : l === "style" ? i[l] = { ...c, ...o } : i[l] = o;
  }
  return i;
}
function wj(n, t) {
  const { children: i, ...l } = n, o = C.Children.toArray(i);
  if (o.length === 0)
    throw new Error("Slot: `asChild` expects a single child element, received none.");
  if (o.length > 1)
    throw new Error(
      "Slot: `asChild` expects a single child element, received " + o.length + "."
    );
  const c = o[0];
  if (!C.isValidElement(c))
    throw new Error(
      "Slot: `asChild` expects a React element as its child (e.g. <button>), not a " + (typeof c == "string" ? "string." : typeof c + ".")
    );
  if (c.type === C.Fragment)
    throw new Error(
      "Slot: `asChild` expects a single element as its child, not a Fragment. Unwrap the Fragment so Slot can merge props onto a real element."
    );
  const u = c, d = u.props ?? {}, p = d.ref ?? u.ref, y = Sj(l, d);
  return C.cloneElement(u, {
    ...y,
    ref: hS(t, p)
  });
}
var Cj = C.forwardRef(wj);
function Tj(n) {
  const t = Array.isArray(n) ? n : [n], i = [];
  for (const l of t) {
    if (l.opacity <= 0) continue;
    const { offsetX: o, offsetY: c, blur: u, spread: d, color: p, opacity: y } = l, g = jj(p);
    i.push(
      `${o}px ${c}px ${u}px ${d}px rgba(${g.r},${g.g},${g.b},${y})`
    );
  }
  return i.join(", ");
}
function jj(n) {
  const t = n.replace("#", ""), i = t.length === 3 ? t[0] + t[0] + t[1] + t[1] + t[2] + t[2] : t;
  return {
    r: parseInt(i.substring(0, 2), 16),
    g: parseInt(i.substring(2, 4), 16),
    b: parseInt(i.substring(4, 6), 16)
  };
}
function Aj(n) {
  if ("radius" in n) return `${n.radius}px`;
  const t = (u) => u === void 0 ? 0 : typeof u == "number" ? u : u.radius, i = t(n.topLeft), l = t(n.topRight), o = t(n.bottomRight), c = t(n.bottomLeft);
  return `${i}px ${l}px ${o}px ${c}px`;
}
function Ej(n, t) {
  const {
    as: i,
    asChild: l,
    children: o,
    corners: c,
    innerBorder: u,
    outerBorder: d,
    middleBorder: p,
    innerShadow: y,
    shadow: g,
    autoEffects: v,
    shadowStrategy: b,
    ...j
  } = n, w = i ?? "div", T = C.useRef(null), x = C.useRef(null), A = C.useMemo(
    () => hS(T, t),
    [t]
  ), _ = c ?? { radius: 0 }, E = b === "box-shadow", M = E ? void 0 : g, [O, D] = C.useState(void 0), N = C.useCallback(
    (I) => D(I),
    []
  ), V = {
    innerBorder: u,
    outerBorder: d,
    middleBorder: p,
    innerShadow: y,
    shadow: M
  }, H = Gm(V), B = E ? g ?? O : void 0, U = (v ?? !0) || H || B !== void 0;
  dS(T, _, {
    wrapperRef: U ? x : void 0,
    effects: H ? V : void 0,
    autoEffects: v,
    skipShadowHandle: E,
    onExtractedShadow: E ? N : void 0
  });
  const Y = l ? C.createElement(Cj, { ...j, ref: A }, o) : C.createElement(w, { ...j, ref: A }, o);
  if (!U) return Y;
  let st = null;
  if (E && B !== void 0) {
    const I = Tj(B);
    if (I !== "") {
      const $ = {
        position: "absolute",
        inset: 0,
        borderRadius: Aj(_),
        boxShadow: I,
        pointerEvents: "none",
        zIndex: -1
      };
      st = C.createElement("div", {
        "aria-hidden": !0,
        "data-slot": "smooth-corners-box-shadow",
        style: $
      });
    }
  }
  return C.createElement(
    "div",
    {
      ref: x,
      style: {
        position: "relative",
        // `isolation: isolate` keeps the z-index:-1 sibling from sinking
        // behind ancestors — same trick the SVG path uses.
        ...st ? { isolation: "isolate" } : {}
      }
    },
    st,
    Y
  );
}
C.forwardRef(Ej);
function zv(n, t) {
  if (typeof n == "function")
    return n(t);
  n != null && (n.current = t);
}
function Mj(...n) {
  return (t) => {
    let i = !1;
    const l = n.map((o) => {
      const c = zv(o, t);
      return !i && typeof c == "function" && (i = !0), c;
    });
    if (i)
      return () => {
        for (let o = 0; o < l.length; o++) {
          const c = l[o];
          typeof c == "function" ? c() : zv(n[o], null);
        }
      };
  };
}
function _j(...n) {
  return C.useCallback(Mj(...n), n);
}
class Rj extends C.Component {
  getSnapshotBeforeUpdate(t) {
    const i = this.props.childRef.current;
    if (yc(i) && t.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const l = i.offsetParent, o = yc(l) && l.offsetWidth || 0, c = yc(l) && l.offsetHeight || 0, u = getComputedStyle(i), d = this.props.sizeRef.current;
      d.height = parseFloat(u.height), d.width = parseFloat(u.width), d.top = i.offsetTop, d.left = i.offsetLeft, d.right = o - d.width - d.left, d.bottom = c - d.height - d.top, d.direction = u.direction;
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
function Dj({ children: n, isPresent: t, anchorX: i, anchorY: l, root: o, pop: c }) {
  const u = C.useId(), d = C.useRef(null), p = C.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    direction: "ltr"
  }), { nonce: y } = C.useContext(Ys), g = n.props?.ref ?? n?.ref, v = _j(d, g);
  return C.useInsertionEffect(() => {
    const { width: b, height: j, top: w, left: T, right: x, bottom: A, direction: _ } = p.current;
    if (t || c === !1 || !d.current || !b || !j)
      return;
    const E = _ === "rtl", M = i === "left" ? E ? `right: ${x}` : `left: ${T}` : E ? `left: ${T}` : `right: ${x}`, O = l === "bottom" ? `bottom: ${A}` : `top: ${w}`;
    d.current.dataset.motionPopId = u;
    const D = document.createElement("style");
    y && (D.nonce = y);
    const N = o ?? document.head;
    return N.appendChild(D), D.sheet && D.sheet.insertRule(`
          [data-motion-pop-id="${u}"] {
            position: absolute !important;
            width: ${b}px !important;
            height: ${j}px !important;
            ${M}px !important;
            ${O}px !important;
          }
        `), () => {
      d.current?.removeAttribute("data-motion-pop-id"), N.contains(D) && N.removeChild(D);
    };
  }, [t]), h.jsx(Rj, { isPresent: t, childRef: d, sizeRef: p, pop: c, children: c === !1 ? n : C.cloneElement(n, { ref: v }) });
}
const Nj = ({ children: n, initial: t, isPresent: i, onExitComplete: l, custom: o, presenceAffectsLayout: c, mode: u, anchorX: d, anchorY: p, root: y }) => {
  const g = Vi(Oj), v = C.useId(), b = C.useRef(i), j = C.useRef(l);
  Wc(() => {
    b.current = i, j.current = l;
  });
  let w = !0, T = C.useMemo(() => (w = !1, {
    id: v,
    initial: t,
    isPresent: i,
    custom: o,
    onExitComplete: (x) => {
      g.set(x, !0);
      for (const A of g.values())
        if (!A)
          return;
      l && l();
    },
    register: (x) => (g.set(x, !1), () => {
      g.delete(x), !b.current && !g.size && j.current?.();
    })
  }), [i, g, l]);
  return c && w && (T = { ...T }), C.useMemo(() => {
    g.forEach((x, A) => g.set(A, !1));
  }, [i]), C.useEffect(() => {
    !i && !g.size && l && l();
  }, [i]), n = h.jsx(Dj, { pop: u === "popLayout", isPresent: i, anchorX: d, anchorY: p, root: y, children: n }), h.jsx(_r.Provider, { value: T, children: n });
};
function Oj() {
  return /* @__PURE__ */ new Map();
}
function mS(n = !0) {
  const t = C.useContext(_r);
  if (t === null)
    return [!0, null];
  const { isPresent: i, onExitComplete: l, register: o } = t, c = C.useId();
  C.useEffect(() => {
    if (n)
      return o(c);
  }, [n]);
  const u = C.useCallback(() => n && l && l(c), [c, l, n]);
  return !i && l ? [!1, u] : [!0];
}
function Lj() {
  return $j(C.useContext(_r));
}
function $j(n) {
  return n === null ? !0 : n.isPresent;
}
const ac = (n) => n.key || "";
function Uv(n) {
  const t = [];
  return C.Children.forEach(n, (i) => {
    C.isValidElement(i) && t.push(i);
  }), t;
}
const Gs = ({ children: n, custom: t, initial: i = !0, onExitComplete: l, presenceAffectsLayout: o = !0, mode: c = "sync", propagate: u = !1, anchorX: d = "left", anchorY: p = "top", root: y }) => {
  const [g, v] = mS(u), b = C.useMemo(() => Uv(n), [n]), j = u && !g ? [] : b.map(ac), w = C.useRef(!0), T = C.useRef(b), x = Vi(() => /* @__PURE__ */ new Map()), A = C.useRef(/* @__PURE__ */ new Set()), [_, E] = C.useState(b), [M, O] = C.useState(b);
  Wc(() => {
    w.current = !1, T.current = b;
    for (let V = 0; V < M.length; V++) {
      const H = ac(M[V]);
      j.includes(H) ? (x.delete(H), A.current.delete(H)) : x.get(H) !== !0 && x.set(H, !1);
    }
  }, [M, j.length, j.join("-")]);
  const D = [];
  if (b !== _) {
    let V = [...b];
    for (let H = 0; H < M.length; H++) {
      const B = M[H], U = ac(B);
      j.includes(U) || (V.splice(H, 0, B), D.push(B));
    }
    return c === "wait" && D.length && (V = D), O(Uv(V)), E(b), null;
  }
  const { forceRender: N } = C.useContext(pm);
  return h.jsx(h.Fragment, { children: M.map((V) => {
    const H = ac(V), B = u && !g ? !1 : b === M || j.includes(H), U = () => {
      if (A.current.has(H))
        return;
      if (x.has(H))
        A.current.add(H), x.set(H, !0);
      else
        return;
      let F = !0;
      x.forEach((Y) => {
        Y || (F = !1);
      }), F && (N?.(), O(T.current), u && v?.(), l && l());
    };
    return h.jsx(Nj, { isPresent: B, initial: !w.current || i ? void 0 : !1, custom: t, presenceAffectsLayout: o, mode: c, root: y, onExitComplete: B ? void 0 : U, anchorX: d, anchorY: p, children: V }, H);
  }) });
};
function kj({ children: n, features: t, strict: i = !1 }) {
  const [, l] = C.useState(!Gd(t)), o = C.useRef(void 0);
  if (!Gd(t)) {
    const { renderer: c, ...u } = t;
    o.current = c, $h(u);
  }
  return C.useEffect(() => {
    Gd(t) && t().then(({ renderer: c, ...u }) => {
      $h(u), o.current = c, l(!0);
    });
  }, []), h.jsx(ym.Provider, { value: { renderer: o.current, strict: i }, children: n });
}
function Gd(n) {
  return typeof n == "function";
}
function Xm({ children: n, isValidProp: t, ...i }) {
  t && Qx(t);
  const l = C.useContext(Ys);
  i = { ...l, ...i }, i.transition = jm(i.transition, l.transition), i.isStatic = Vi(() => i.isStatic);
  const o = C.useMemo(() => i, [
    JSON.stringify(i.transition),
    i.transformPagePoint,
    i.reducedMotion,
    i.skipAnimations
  ]);
  return h.jsx(Ys.Provider, { value: o, children: n });
}
function Bj(n, t) {
  if (typeof Proxy > "u")
    return Tc;
  const i = /* @__PURE__ */ new Map(), l = (c, u) => Tc(c, u, n, t), o = (c, u) => l(c, u);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (c, u) => u === "create" ? l : (i.has(u) || i.set(u, Tc(u, void 0, n, t)), i.get(u))
  });
}
const pS = (n, t) => t.isSVG ?? Hm(n) ? new Ox(t) : new Mx(t, {
  allowProjection: n !== C.Fragment
});
class Vj extends ai {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(t) {
    super(t), t.animationState || (t.animationState = hC(t));
  }
  updateAnimationControlsSubscription() {
    const { animate: t } = this.node.getProps();
    Ic(t) && (this.unmountControls = t.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: t } = this.node.getProps(), { animate: i } = this.node.prevProps || {};
    t !== i && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let zj = 0;
class Uj extends ai {
  constructor() {
    super(...arguments), this.id = zj++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: t, onExitComplete: i } = this.node.presenceContext, { isPresent: l } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || t === l)
      return;
    if (t && l === !1) {
      if (this.isExitComplete) {
        const { initial: c, custom: u } = this.node.getProps();
        if (typeof c == "string" || typeof c == "object" && c !== null && !Array.isArray(c)) {
          const d = Li(this.node, c, u);
          if (d) {
            const { transition: p, transitionEnd: y, ...g } = d;
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
    const o = this.node.animationState.setActive("exit", !t);
    i && !t && o.then(() => {
      this.isExitComplete = !0, i(this.id);
    });
  }
  mount() {
    const { register: t, onExitComplete: i } = this.node.presenceContext || {};
    i && i(this.id), t && (this.unmount = t(this.id));
  }
  unmount() {
  }
}
const yS = {
  animation: {
    Feature: Vj
  },
  exit: {
    Feature: Uj
  }
};
function Rr(n) {
  return {
    point: {
      x: n.pageX,
      y: n.pageY
    }
  };
}
const Hj = (n) => (t) => Lm(t) && n(t, Rr(t));
function sr(n, t, i, l) {
  return vr(n, t, Hj(i), l);
}
const gS = ({ current: n }) => n ? n.ownerDocument.defaultView : null, Hv = (n, t) => Math.abs(n - t);
function qj(n, t) {
  const i = Hv(n.x, t.x), l = Hv(n.y, t.y);
  return Math.sqrt(i ** 2 + l ** 2);
}
const qv = /* @__PURE__ */ new Set(["auto", "scroll"]);
class vS {
  constructor(t, i, { transformPagePoint: l, contextWindow: o = window, dragSnapToOrigin: c = !1, distanceThreshold: u = 3, element: d } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (w) => {
      this.handleScroll(w.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = ic(this.lastRawMoveEventInfo, this.transformPagePoint));
      const w = Xd(this.lastMoveEventInfo, this.history), T = this.startEvent !== null, x = qj(w.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!T && !x)
        return;
      const { point: A } = w, { timestamp: _ } = Be;
      this.history.push({ ...A, timestamp: _ });
      const { onStart: E, onMove: M } = this.handlers;
      T || (E && E(this.lastMoveEvent, w), this.startEvent = this.lastMoveEvent), M && M(this.lastMoveEvent, w);
    }, this.handlePointerMove = (w, T) => {
      this.lastMoveEvent = w, this.lastRawMoveEventInfo = T, this.lastMoveEventInfo = ic(T, this.transformPagePoint), It.update(this.updatePoint, !0);
    }, this.handlePointerUp = (w, T) => {
      this.end();
      const { onEnd: x, onSessionEnd: A, resumeAnimation: _ } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && _ && _(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const E = Xd(w.type === "pointercancel" ? this.lastMoveEventInfo : ic(T, this.transformPagePoint), this.history);
      this.startEvent && x && x(w, E), A && A(w, E);
    }, !Lm(t))
      return;
    this.dragSnapToOrigin = c, this.handlers = i, this.transformPagePoint = l, this.distanceThreshold = u, this.contextWindow = o || window;
    const p = Rr(t), y = ic(p, this.transformPagePoint), { point: g } = y, { timestamp: v } = Be;
    this.history = [{ ...g, timestamp: v }];
    const { onSessionStart: b } = i;
    b && b(t, Xd(y, this.history));
    const j = { passive: !0, capture: !0 };
    this.removeListeners = Ar(sr(this.contextWindow, "pointermove", this.handlePointerMove, j), sr(this.contextWindow, "pointerup", this.handlePointerUp, j), sr(this.contextWindow, "pointercancel", this.handlePointerUp, j)), d && this.startScrollTracking(d);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(t) {
    let i = t.parentElement;
    for (; i; ) {
      const l = getComputedStyle(i);
      (qv.has(l.overflowX) || qv.has(l.overflowY)) && this.scrollPositions.set(i, {
        x: i.scrollLeft,
        y: i.scrollTop
      }), i = i.parentElement;
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
    const i = this.scrollPositions.get(t);
    if (!i)
      return;
    const l = t === window, o = l ? { x: window.scrollX, y: window.scrollY } : {
      x: t.scrollLeft,
      y: t.scrollTop
    }, c = { x: o.x - i.x, y: o.y - i.y };
    c.x === 0 && c.y === 0 || (l ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += c.x, this.lastMoveEventInfo.point.y += c.y) : this.history.length > 0 && (this.history[0].x -= c.x, this.history[0].y -= c.y), this.scrollPositions.set(t, o), It.update(this.updatePoint, !0));
  }
  updateHandlers(t) {
    this.handlers = t;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), ba(this.updatePoint);
  }
}
function ic(n, t) {
  return t ? { point: t(n.point) } : n;
}
function Yv(n, t) {
  return { x: n.x - t.x, y: n.y - t.y };
}
function Xd({ point: n }, t) {
  return {
    point: n,
    delta: Yv(n, bS(t)),
    offset: Yv(n, Yj(t)),
    velocity: Pj(t, 0.1)
  };
}
function Yj(n) {
  return n[0];
}
function bS(n) {
  return n[n.length - 1];
}
function Pj(n, t) {
  if (n.length < 2)
    return { x: 0, y: 0 };
  let i = n.length - 1, l = null;
  const o = bS(n);
  for (; i >= 0 && (l = n[i], !(o.timestamp - l.timestamp > /* @__PURE__ */ an(t))); )
    i--;
  if (!l)
    return { x: 0, y: 0 };
  l === n[0] && n.length > 2 && o.timestamp - l.timestamp > /* @__PURE__ */ an(t) * 2 && (l = n[1]);
  const c = /* @__PURE__ */ jn(o.timestamp - l.timestamp);
  if (c === 0)
    return { x: 0, y: 0 };
  const u = {
    x: (o.x - l.x) / c,
    y: (o.y - l.y) / c
  };
  return u.x === 1 / 0 && (u.x = 0), u.y === 1 / 0 && (u.y = 0), u;
}
function Gj(n, { min: t, max: i }, l) {
  return t !== void 0 && n < t ? n = l ? Ft(t, n, l.min) : Math.max(n, t) : i !== void 0 && n > i && (n = l ? Ft(i, n, l.max) : Math.min(n, i)), n;
}
function Pv(n, t, i) {
  return {
    min: t !== void 0 ? n.min + t : void 0,
    max: i !== void 0 ? n.max + i - (n.max - n.min) : void 0
  };
}
function Xj(n, { top: t, left: i, bottom: l, right: o }) {
  return {
    x: Pv(n.x, i, o),
    y: Pv(n.y, t, l)
  };
}
function Gv(n, t) {
  let i = t.min - n.min, l = t.max - n.max;
  return t.max - t.min < n.max - n.min && ([i, l] = [l, i]), { min: i, max: l };
}
function Kj(n, t) {
  return {
    x: Gv(n.x, t.x),
    y: Gv(n.y, t.y)
  };
}
function Zj(n, t) {
  let i = 0.5;
  const l = Ze(n), o = Ze(t);
  return o > l ? i = /* @__PURE__ */ qs(t.min, t.max - l, n.min) : l > o && (i = /* @__PURE__ */ qs(n.min, n.max - o, t.min)), Kn(0, 1, i);
}
function Qj(n, t) {
  const i = {};
  return t.min !== void 0 && (i.min = t.min - n.min), t.max !== void 0 && (i.max = t.max - n.min), i;
}
const Uh = 0.35;
function Fj(n = Uh) {
  return n === !1 ? n = 0 : n === !0 && (n = Uh), {
    x: Xv(n, "left", "right"),
    y: Xv(n, "top", "bottom")
  };
}
function Xv(n, t, i) {
  return {
    min: Kv(n, t),
    max: Kv(n, i)
  };
}
function Kv(n, t) {
  return typeof n == "number" ? n : n[t] || 0;
}
const Ij = /* @__PURE__ */ new WeakMap();
class Jj {
  constructor(t) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = we(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = t;
  }
  start(t, { snapToCursor: i = !1, distanceThreshold: l } = {}) {
    const { presenceContext: o } = this.visualElement;
    if (o && o.isPresent === !1)
      return;
    const c = (v) => {
      i && this.snapToCursor(Rr(v).point), this.stopAnimation();
    }, u = (v, b) => {
      const { drag: j, dragPropagation: w, onDragStart: T } = this.getProps();
      if (j && !w && (this.openDragLock && this.openDragLock(), this.openDragLock = T6(j), !this.openDragLock))
        return;
      this.latestPointerEvent = v, this.latestPanInfo = b, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), Pn((A) => {
        let _ = this.getAxisMotionValue(A).get() || 0;
        if (Xn.test(_)) {
          const { projection: E } = this.visualElement;
          if (E && E.layout) {
            const M = E.layout.layoutBox[A];
            M && (_ = Ze(M) * (parseFloat(_) / 100));
          }
        }
        this.originPoint[A] = _;
      }), T && It.update(() => T(v, b), !1, !0), Ah(this.visualElement, "transform");
      const { animationState: x } = this.visualElement;
      x && x.setActive("whileDrag", !0);
    }, d = (v, b) => {
      this.latestPointerEvent = v, this.latestPanInfo = b;
      const { dragPropagation: j, dragDirectionLock: w, onDirectionLock: T, onDrag: x } = this.getProps();
      if (!j && !this.openDragLock)
        return;
      const { offset: A } = b;
      if (w && this.currentDirection === null) {
        this.currentDirection = tA(A), this.currentDirection !== null && T && T(this.currentDirection);
        return;
      }
      this.updateAxis("x", b.point, A), this.updateAxis("y", b.point, A), this.visualElement.render(), x && It.update(() => x(v, b), !1, !0);
    }, p = (v, b) => {
      this.latestPointerEvent = v, this.latestPanInfo = b, this.stop(v, b), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, y = () => {
      const { dragSnapToOrigin: v } = this.getProps();
      (v || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: g } = this.getProps();
    this.panSession = new vS(t, {
      onSessionStart: c,
      onStart: u,
      onMove: d,
      onSessionEnd: p,
      resumeAnimation: y
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: g,
      distanceThreshold: l,
      contextWindow: gS(this.visualElement),
      element: this.visualElement.current
    });
  }
  /**
   * @internal
   */
  stop(t, i) {
    const l = t || this.latestPointerEvent, o = i || this.latestPanInfo, c = this.isDragging;
    if (this.cancel(), !c || !o || !l)
      return;
    const { velocity: u } = o;
    this.startAnimation(u);
    const { onDragEnd: d } = this.getProps();
    d && It.postRender(() => d(l, o));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: t, animationState: i } = this.visualElement;
    t && (t.isAnimationBlocked = !1), this.endPanSession();
    const { dragPropagation: l } = this.getProps();
    !l && this.openDragLock && (this.openDragLock(), this.openDragLock = null), i && i.setActive("whileDrag", !1);
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
  updateAxis(t, i, l) {
    const { drag: o } = this.getProps();
    if (!l || !sc(t, o, this.currentDirection))
      return;
    const c = this.getAxisMotionValue(t);
    let u = this.originPoint[t] + l[t];
    this.constraints && this.constraints[t] && (u = Gj(u, this.constraints[t], this.elastic[t])), c.set(u);
  }
  resolveConstraints() {
    const { dragConstraints: t, dragElastic: i } = this.getProps(), l = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, o = this.constraints;
    t && Ns(t) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : t && l ? this.constraints = Xj(l.layoutBox, t) : this.constraints = !1, this.elastic = Fj(i), o !== this.constraints && !Ns(t) && l && this.constraints && !this.hasMutatedConstraints && Pn((c) => {
      this.constraints !== !1 && this.getAxisMotionValue(c) && (this.constraints[c] = Qj(l.layoutBox[c], this.constraints[c]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: t, onMeasureDragConstraints: i } = this.getProps();
    if (!t || !Ns(t))
      return !1;
    const l = t.current, { projection: o } = this.visualElement;
    if (!o || !o.layout)
      return !1;
    o.root && (o.root.scroll = void 0, o.root.updateScroll());
    const c = F6(l, o.root, this.visualElement.getTransformPagePoint());
    let u = Kj(o.layout.layoutBox, c);
    if (i) {
      const d = i(K6(u));
      this.hasMutatedConstraints = !!d, d && (u = wx(d));
    }
    return u;
  }
  startAnimation(t) {
    const { drag: i, dragMomentum: l, dragElastic: o, dragTransition: c, dragSnapToOrigin: u, onDragTransitionEnd: d } = this.getProps(), p = this.constraints || {}, y = Pn((g) => {
      if (!sc(g, i, this.currentDirection))
        return;
      let v = p && p[g] || {};
      (u === !0 || u === g) && (v = { min: 0, max: 0 });
      const b = o ? 200 : 1e6, j = o ? 40 : 1e7, w = {
        type: "inertia",
        velocity: l ? t[g] : 0,
        bounceStiffness: b,
        bounceDamping: j,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...c,
        ...v
      };
      return this.startAxisValueAnimation(g, w);
    });
    return Promise.all(y).then(d);
  }
  startAxisValueAnimation(t, i) {
    const l = this.getAxisMotionValue(t);
    return Ah(this.visualElement, t), l.start(Em(t, l, 0, i, this.visualElement, !1));
  }
  stopAnimation() {
    Pn((t) => this.getAxisMotionValue(t).stop());
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(t) {
    const i = `_drag${t.toUpperCase()}`, o = this.visualElement.getProps()[i];
    return o || this.visualElement.getValue(t, this.visualElement.latestValues[t] ?? 0);
  }
  snapToCursor(t) {
    Pn((i) => {
      const { drag: l } = this.getProps();
      if (!sc(i, l, this.currentDirection))
        return;
      const { projection: o } = this.visualElement, c = this.getAxisMotionValue(i);
      if (o && o.layout) {
        const { min: u, max: d } = o.layout.layoutBox[i], p = c.get() || 0;
        c.set(t[i] - Ft(u, d, 0.5) + p);
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
    const { drag: t, dragConstraints: i } = this.getProps(), { projection: l } = this.visualElement;
    if (!Ns(i) || !l || !this.constraints)
      return;
    this.stopAnimation();
    const o = { x: 0, y: 0 };
    Pn((u) => {
      const d = this.getAxisMotionValue(u);
      if (d && this.constraints !== !1) {
        const p = d.get();
        o[u] = Zj({ min: p, max: p }, this.constraints[u]);
      }
    });
    const { transformTemplate: c } = this.visualElement.getProps();
    this.visualElement.current.style.transform = c ? c({}, "") : "none", l.root && l.root.updateScroll(), l.updateLayout(), this.constraints = !1, this.resolveConstraints(), Pn((u) => {
      if (!sc(u, t, null))
        return;
      const d = this.getAxisMotionValue(u), { min: p, max: y } = this.constraints[u];
      d.set(Ft(p, y, o[u]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    Ij.set(this.visualElement, this);
    const t = this.visualElement.current, i = sr(t, "pointerdown", (y) => {
      const { drag: g, dragListener: v = !0 } = this.getProps(), b = y.target, j = b !== t && R6(b);
      g && v && !j && this.start(y);
    });
    let l;
    const o = () => {
      const { dragConstraints: y } = this.getProps();
      Ns(y) && y.current && (this.constraints = this.resolveRefConstraints(), l || (l = Wj(t, y.current, () => this.scalePositionWithinConstraints())));
    }, { projection: c } = this.visualElement, u = c.addEventListener("measure", o);
    c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()), It.read(o);
    const d = vr(window, "resize", () => this.scalePositionWithinConstraints()), p = c.addEventListener("didUpdate", (({ delta: y, hasLayoutChanged: g }) => {
      this.isDragging && g && (Pn((v) => {
        const b = this.getAxisMotionValue(v);
        b && (this.originPoint[v] += y[v].translate, b.set(b.get() + y[v].translate));
      }), this.visualElement.render());
    }));
    return () => {
      d(), i(), u(), p && p(), l && l();
    };
  }
  getProps() {
    const t = this.visualElement.getProps(), { drag: i = !1, dragDirectionLock: l = !1, dragPropagation: o = !1, dragConstraints: c = !1, dragElastic: u = Uh, dragMomentum: d = !0 } = t;
    return {
      ...t,
      drag: i,
      dragDirectionLock: l,
      dragPropagation: o,
      dragConstraints: c,
      dragElastic: u,
      dragMomentum: d
    };
  }
}
function Zv(n) {
  let t = !0;
  return () => {
    if (t) {
      t = !1;
      return;
    }
    n();
  };
}
function Wj(n, t, i) {
  const l = Qg(n, Zv(i)), o = Qg(t, Zv(i));
  return () => {
    l(), o();
  };
}
function sc(n, t, i) {
  return (t === !0 || t === n) && (i === null || i === n);
}
function tA(n, t = 10) {
  let i = null;
  return Math.abs(n.y) > t ? i = "y" : Math.abs(n.x) > t && (i = "x"), i;
}
class eA extends ai {
  constructor(t) {
    super(t), this.removeGroupControls = An, this.removeListeners = An, this.controls = new Jj(t);
  }
  mount() {
    const { dragControls: t } = this.node.getProps();
    t && (this.removeGroupControls = t.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || An;
  }
  update() {
    const { dragControls: t } = this.node.getProps(), { dragControls: i } = this.node.prevProps || {};
    t !== i && (this.removeGroupControls(), t && (this.removeGroupControls = t.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const Kd = (n) => (t, i) => {
  n && It.update(() => n(t, i), !1, !0);
};
class nA extends ai {
  constructor() {
    super(...arguments), this.removePointerDownListener = An;
  }
  onPointerDown(t) {
    this.session = new vS(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: gS(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: t, onPanStart: i, onPan: l, onPanEnd: o } = this.node.getProps();
    return {
      onSessionStart: Kd(t),
      onStart: Kd(i),
      onMove: Kd(l),
      onEnd: (c, u) => {
        delete this.session, o && It.postRender(() => o(c, u));
      }
    };
  }
  mount() {
    this.removePointerDownListener = sr(this.node.current, "pointerdown", (t) => this.onPointerDown(t));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let Zd = !1;
class aA extends C.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: t, layoutGroup: i, switchLayoutGroup: l, layoutId: o } = this.props, { projection: c } = t;
    c && (i.group && i.group.add(c), l && l.register && o && l.register(c), Zd && c.root.didUpdate(), c.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), c.setOptions({
      ...c.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), Cc.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(t) {
    const { layoutDependency: i, visualElement: l, drag: o, isPresent: c } = this.props, { projection: u } = l;
    return u && (u.isPresent = c, t.layoutDependency !== i && u.setOptions({
      ...u.options,
      layoutDependency: i
    }), Zd = !0, o || t.layoutDependency !== i || i === void 0 || t.isPresent !== c ? u.willUpdate() : this.safeToRemove(), t.isPresent !== c && (c ? u.promote() : u.relegate() || It.postRender(() => {
      const d = u.getStack();
      (!d || !d.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: t, layoutAnchor: i } = this.props, { projection: l } = t;
    l && (l.options.layoutAnchor = i, l.root.didUpdate(), Om.postRender(() => {
      !l.currentAnimation && l.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: t, layoutGroup: i, switchLayoutGroup: l } = this.props, { projection: o } = t;
    Zd = !0, o && (o.scheduleCheckAfterUnmount(), i && i.group && i.group.remove(o), l && l.deregister && l.deregister(o));
  }
  safeToRemove() {
    const { safeToRemove: t } = this.props;
    t && t();
  }
  render() {
    return null;
  }
}
function xS(n) {
  const [t, i] = mS(), l = C.useContext(pm);
  return h.jsx(aA, { ...n, layoutGroup: l, switchLayoutGroup: C.useContext(Jx), isPresent: t, safeToRemove: i });
}
const SS = {
  pan: {
    Feature: nA
  },
  drag: {
    Feature: eA,
    ProjectionNode: Gx,
    MeasureLayout: xS
  }
};
function Qv(n, t, i) {
  const { props: l } = n;
  n.animationState && l.whileHover && n.animationState.setActive("whileHover", i === "Start");
  const o = "onHover" + i, c = l[o];
  c && It.postRender(() => c(t, Rr(t)));
}
class iA extends ai {
  mount() {
    const { current: t } = this.node;
    t && (this.unmount = A6(t, (i, l) => (Qv(this.node, l, "Start"), (o) => Qv(this.node, o, "End"))));
  }
  unmount() {
  }
}
class sA extends ai {
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
    this.unmount = Ar(vr(this.node.current, "focus", () => this.onFocus()), vr(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Fv(n, t, i) {
  const { props: l } = n;
  if (n.current instanceof HTMLButtonElement && n.current.disabled)
    return;
  n.animationState && l.whileTap && n.animationState.setActive("whileTap", i === "Start");
  const o = "onTap" + (i === "End" ? "" : i), c = l[o];
  c && It.postRender(() => c(t, Rr(t)));
}
class lA extends ai {
  mount() {
    const { current: t } = this.node;
    if (!t)
      return;
    const { globalTapTarget: i, propagate: l } = this.node.props;
    this.unmount = N6(t, (o, c) => (Fv(this.node, c, "Start"), (u, { success: d }) => Fv(this.node, u, d ? "End" : "Cancel")), {
      useGlobalTarget: i,
      stopPropagation: l?.tap === !1
    });
  }
  unmount() {
  }
}
const Hh = /* @__PURE__ */ new WeakMap(), Qd = /* @__PURE__ */ new WeakMap(), rA = (n) => {
  const t = Hh.get(n.target);
  t && t(n);
}, oA = (n) => {
  n.forEach(rA);
};
function cA({ root: n, ...t }) {
  const i = n || document;
  Qd.has(i) || Qd.set(i, {});
  const l = Qd.get(i), o = JSON.stringify(t);
  return l[o] || (l[o] = new IntersectionObserver(oA, { root: n, ...t })), l[o];
}
function uA(n, t, i) {
  const l = cA(t);
  return Hh.set(n, i), l.observe(n), () => {
    Hh.delete(n), l.unobserve(n);
  };
}
const fA = {
  some: 0,
  all: 1
};
class dA extends ai {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: t = {} } = this.node.getProps(), { root: i, margin: l, amount: o = "some", once: c } = t, u = {
      root: i ? i.current : void 0,
      rootMargin: l,
      threshold: typeof o == "number" ? o : fA[o]
    }, d = (p) => {
      const { isIntersecting: y } = p;
      if (this.isInView === y || (this.isInView = y, c && !y && this.hasEnteredView))
        return;
      y && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", y);
      const { onViewportEnter: g, onViewportLeave: v } = this.node.getProps(), b = y ? g : v;
      b && b(p);
    };
    this.stopObserver = uA(this.node.current, u, d);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: t, prevProps: i } = this.node;
    ["amount", "margin", "root"].some(hA(t, i)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function hA({ viewport: n = {} }, { viewport: t = {} } = {}) {
  return (i) => n[i] !== t[i];
}
const wS = {
  inView: {
    Feature: dA
  },
  tap: {
    Feature: lA
  },
  focus: {
    Feature: sA
  },
  hover: {
    Feature: iA
  }
}, CS = {
  layout: {
    ProjectionNode: Gx,
    MeasureLayout: xS
  }
}, mA = {
  ...yS,
  ...wS,
  ...SS,
  ...CS
}, pA = /* @__PURE__ */ Bj(mA, pS), yA = {
  renderer: pS,
  ...yS,
  ...wS
}, gA = {
  ...yA,
  ...SS,
  ...CS
};
function Km(n) {
  const t = Vi(() => Wa(n)), { isStatic: i } = C.useContext(Ys);
  if (i) {
    const [, l] = C.useState(n);
    C.useEffect(() => t.on("change", l), []);
  }
  return t;
}
function TS(n, t) {
  const i = Km(t()), l = () => i.set(t());
  return l(), Wc(() => {
    const o = () => It.preRender(l, !1, !0), c = n.map((u) => u.on("change", o));
    return () => {
      c.forEach((u) => u()), ba(l);
    };
  }), i;
}
function vA(n) {
  nr.current = [], n();
  const t = TS(nr.current, n);
  return nr.current = void 0, t;
}
function qh(n, t, i, l) {
  if (typeof n == "function")
    return vA(n);
  const c = typeof t == "function" ? t : H6(t, i, l), u = Array.isArray(n) ? Iv(n, c) : Iv([n], ([p]) => c(p)), d = Array.isArray(n) ? void 0 : n.accelerate;
  return d && !d.isTransformed && typeof t != "function" && Array.isArray(i) && l?.clamp !== !1 && (u.accelerate = {
    ...d,
    times: t,
    keyframes: i,
    isTransformed: !0
  }), u;
}
function Iv(n, t) {
  const i = Vi(() => []);
  return TS(n, () => {
    i.length = 0;
    const l = n.length;
    for (let o = 0; o < l; o++)
      i[o] = n[o].get();
    return t(i);
  });
}
function bA() {
  !Bm.current && vx();
  const [n] = C.useState($c.current);
  return n;
}
function Zm(n) {
  return typeof n == "object" && !Array.isArray(n);
}
function jS(n, t, i, l) {
  return n == null ? [] : typeof n == "string" && Zm(t) ? Nm(n, i, l) : n instanceof NodeList ? Array.from(n) : Array.isArray(n) ? n.filter((o) => o != null) : [n];
}
function xA(n, t, i) {
  return n * (t + 1) + i * t;
}
function Jv(n, t, i, l) {
  return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, n + parseFloat(t)) : t === "<" ? i : t.startsWith("<") ? Math.max(0, i + parseFloat(t.slice(1))) : l.get(t) ?? n;
}
function SA(n, t, i) {
  for (let l = 0; l < n.length; l++) {
    const o = n[l];
    o.at > t && o.at < i && (Hs(n, o), l--);
  }
}
function wA(n, t, i, l, o, c) {
  SA(n, o, c);
  for (let u = 0; u < t.length; u++)
    n.push({
      value: t[u],
      at: Ft(o, c, l[u]),
      easing: /* @__PURE__ */ Rb(i, u)
    });
}
function CA(n, t, i = 0) {
  const l = t + 1 + t * i;
  for (let o = 0; o < n.length; o++)
    n[o] = n[o] / l;
}
function TA(n, t) {
  return n.at === t.at ? n.value === null ? 1 : t.value === null ? -1 : 0 : n.at - t.at;
}
const jA = "easeInOut", AA = 20;
function EA(n, { defaultTransition: t = {}, ...i } = {}, l, o) {
  const c = t.duration || 0.3, u = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), p = {}, y = /* @__PURE__ */ new Map();
  let g = 0, v = 0, b = 0;
  for (let j = 0; j < n.length; j++) {
    const w = n[j];
    if (typeof w == "string") {
      y.set(w, v);
      continue;
    } else if (!Array.isArray(w)) {
      y.set(w.name, Jv(v, w.at, g, y));
      continue;
    }
    let [T, x, A = {}] = w;
    A.at !== void 0 && (v = Jv(v, A.at, g, y));
    let _ = 0;
    const E = (M, O, D, N = 0, V = 0) => {
      const H = MA(M), { delay: B = 0, times: U = Xb(H), type: F = t.type || "keyframes", repeat: Y, repeatType: st, repeatDelay: I = 0, ...$ } = O;
      let { ease: X = t.ease || "easeOut", duration: J } = O;
      const tt = typeof B == "function" ? B(N, V) : B, ut = H.length, L = Tm(F) ? F : o?.[F || "keyframes"];
      if (ut <= 2 && L) {
        let ot = 100;
        if (ut === 2 && DA(H)) {
          const nt = H[1] - H[0];
          ot = Math.abs(nt);
        }
        const ct = {
          ...t,
          ...$
        };
        J !== void 0 && (ct.duration = /* @__PURE__ */ an(J));
        const ht = qb(ct, ot, L);
        X = ht.ease, J = ht.duration;
      }
      J ?? (J = c);
      const q = v + tt;
      U.length === 1 && U[0] === 0 && (U[1] = 1);
      const G = U.length - H.length;
      if (G > 0 && Gb(U, G), H.length === 1 && H.unshift(null), Y && Y < AA) {
        const ot = J > 0 ? I / J : 0;
        J = xA(J, Y, I);
        const ct = [...H], ht = [...U];
        X = Array.isArray(X) ? [...X] : [X];
        const nt = [...X], dt = st === "reverse" || st === "mirror";
        let ft = ct, yt = nt;
        dt && (ft = [...ct].reverse(), st === "reverse" && (yt = [...nt].reverse().map((gt) => typeof gt == "function" ? /* @__PURE__ */ dm(gt) : gt)));
        for (let gt = 0; gt < Y; gt++) {
          const ue = dt && gt % 2 === 0, mt = ue ? ft : ct, _t = ue ? yt : nt, ne = (gt + 1) * (1 + ot);
          ot > 0 && (H.push(H[H.length - 1]), U.push(ne), X.push("linear")), H.push(...mt);
          for (let fe = 0; fe < mt.length; fe++)
            U.push(ht[fe] + ne), X.push(fe === 0 ? "linear" : /* @__PURE__ */ Rb(_t, fe - 1));
        }
        CA(U, Y, ot);
      }
      const et = q + J;
      wA(D, H, X, U, q, et), _ = Math.max(tt + J, _), b = Math.max(et, b);
    };
    if (Ee(T)) {
      const M = Wv(T, d);
      E(x, A, t2("default", M));
    } else {
      const M = jS(T, x, l, p), O = M.length;
      for (let D = 0; D < O; D++) {
        x = x, A = A;
        const N = M[D], V = Wv(N, d);
        for (const H in x)
          E(x[H], _A(A, H), t2(H, V), D, O);
      }
    }
    g = v, v += _;
  }
  return d.forEach((j, w) => {
    for (const T in j) {
      const x = j[T];
      x.sort(TA);
      const A = [], _ = [], E = [];
      for (let N = 0; N < x.length; N++) {
        const { at: V, value: H, easing: B } = x[N];
        A.push(H), _.push(/* @__PURE__ */ qs(0, b, V)), E.push(B || "easeOut");
      }
      _[0] !== 0 && (_.unshift(0), A.unshift(A[0]), E.unshift(jA)), _[_.length - 1] !== 1 && (_.push(1), A.push(null)), u.has(w) || u.set(w, {
        keyframes: {},
        transition: {}
      });
      const M = u.get(w);
      M.keyframes[T] = A;
      const { type: O, ...D } = t;
      M.transition[T] = {
        ...D,
        duration: b,
        ease: E,
        times: _,
        ...i
      };
    }
  }), u;
}
function Wv(n, t) {
  return !t.has(n) && t.set(n, {}), t.get(n);
}
function t2(n, t) {
  return t[n] || (t[n] = []), t[n];
}
function MA(n) {
  return Array.isArray(n) ? n : [n];
}
function _A(n, t) {
  return n && n[t] ? {
    ...n,
    ...n[t]
  } : { ...n };
}
const RA = (n) => typeof n == "number", DA = (n) => n.every(RA);
function NA(n) {
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
  }, i = Fc(n) && !yx(n) ? new Ox(t) : new Mx(t);
  i.mount(n), yr.set(n, i);
}
function OA(n) {
  const t = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, i = new aC(t);
  i.mount(n), yr.set(n, i);
}
function LA(n, t) {
  return Ee(n) || typeof n == "number" || typeof n == "string" && !Zm(t);
}
function AS(n, t, i, l) {
  const o = [];
  if (LA(n, t))
    o.push(Hx(n, Zm(t) && t.default || t, i && (i.default || i)));
  else {
    if (n == null)
      return o;
    const c = jS(n, t, l), u = c.length;
    for (let d = 0; d < u; d++) {
      const p = c[d], y = p instanceof Element ? NA : OA;
      yr.has(p) || y(p);
      const g = yr.get(p), v = { ...i };
      "delay" in v && typeof v.delay == "function" && (v.delay = v.delay(d, u)), o.push(...Rm(g, { ...t, transition: v }, {}));
    }
  }
  return o;
}
function $A(n, t, i) {
  const l = [], o = n.map((u) => {
    if (Array.isArray(u) && typeof u[0] == "function") {
      const d = u[0], p = Wa(0);
      return p.on("change", d), u.length === 1 ? [p, [0, 1]] : u.length === 2 ? [p, [0, 1], u[1]] : [p, u[1], u[2]];
    }
    return u;
  });
  return EA(o, t, i, { spring: pr }).forEach(({ keyframes: u, transition: d }, p) => {
    l.push(...AS(p, u, d));
  }), l;
}
function kA(n) {
  return Array.isArray(n) && n.some(Array.isArray);
}
function BA(n = {}) {
  const { scope: t, reduceMotion: i, skipAnimations: l } = n;
  function o(c, u, d) {
    let p = [], y;
    const g = {};
    if (i !== void 0 && (g.reduceMotion = i), l !== void 0 && (g.skipAnimations = l), kA(c)) {
      const { onComplete: b, ...j } = u || {};
      typeof b == "function" && (y = b), p = $A(c, { ...g, ...j }, t);
    } else {
      const { onComplete: b, ...j } = d || {};
      typeof b == "function" && (y = b), p = AS(c, u, { ...g, ...j }, t);
    }
    const v = new K9(p);
    return y && v.finished.then(y), t && (t.animations.push(v), v.finished.then(() => {
      Hs(t.animations, v);
    })), v;
  }
  return o;
}
const lr = BA();
class VA {
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
  start(t, i) {
    this.componentControls.forEach((l) => {
      l.start(t.nativeEvent || t, i);
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
const zA = () => new VA();
function UA() {
  return Vi(zA);
}
const ki = pA, HA = new Intl.Segmenter(void 0, {
  granularity: "grapheme"
}), Bi = (n) => Array.from(HA.segment(n), (t) => t.segment), $i = (n) => n >= "0" && n <= "9";
function qA(n, t) {
  return (n % t + t) % t;
}
const lc = 8, YA = {
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
function PA(n, t) {
  const i = n.length, l = t.length, o = [];
  for (let p = 0; p <= i; p++) {
    o[p] = [];
    for (let y = 0; y <= l; y++)
      p === 0 || y === 0 ? o[p][y] = 0 : n[p - 1] === t[y - 1] ? o[p][y] = o[p - 1][y - 1] + 1 : o[p][y] = Math.max(o[p - 1][y], o[p][y - 1]);
  }
  const c = [];
  let u = i, d = l;
  for (; u > 0 && d > 0; )
    n[u - 1] === t[d - 1] ? (c.push([
      u - 1,
      d - 1
    ]), u--, d--) : o[u - 1][d] > o[u][d - 1] || o[u - 1][d] === o[u][d - 1] && u >= d ? u-- : d--;
  return c.reverse(), c;
}
function GA(n, t, i, l) {
  const o = Bi(n), c = Bi(t), u = PA(o, c), d = new Array(c.length).fill("");
  for (const [w, T] of u)
    d[T] = i[w];
  let p = l, y = 0;
  for (let w = 0; w < d.length; w++)
    d[w] || (d[w] = `c${p++}`, y++);
  const g = c.length - y, v = o.length - g, b = y + v, j = Math.max(c.length, o.length);
  return {
    keys: d,
    changeRatio: j > 0 ? b / j : 1,
    nextId: p
  };
}
function ES(n, t, i, l) {
  const o = (D) => parseFloat(D.replace(/[^0-9.-]/g, "")) || 0, c = Math.sign(o(t) - o(n)), u = Bi(n), d = Bi(t), p = (D) => {
    const N = D.findIndex((V) => $i(V));
    return N === -1 ? D.length : N;
  }, y = p(d), g = p(u), v = Math.min(y, g), b = new Array(d.length);
  let j = l;
  for (let D = 0; D < y; D++)
    b[D] = D < v && d[D] === u[D] ? i[D] : j++;
  const w = u.slice(g), T = d.slice(y), x = i.slice(g), A = Math.max(w.length, T.length), _ = [
    ...Array(Math.max(0, A - w.length)).fill(""),
    ...w
  ], E = [
    ...Array(Math.max(0, A - T.length)).fill(""),
    ...T
  ], M = [
    ...Array(Math.max(0, A - x.length)).fill(-1),
    ...x
  ], O = A - T.length;
  for (let D = 0; D < T.length; D++) {
    const N = O + D;
    b[y + D] = E[N] === _[N] && M[N] >= 0 ? M[N] : j++;
  }
  return {
    keys: b,
    direction: c,
    nextId: j
  };
}
function XA({ text: n, Component: t, transition: i, stagger: l, animateInitial: o, onComplete: c, className: u, style: d, rest: p }) {
  const y = Bi(n), g = C.useRef(y.length), [v, b] = C.useState(n), [j, w] = C.useState(() => y.map((_, E) => E)), T = C.useRef(1);
  if (n !== v) {
    const _ = ES(v, n, j, g.current);
    g.current = _.nextId, T.current = _.direction, w(_.keys), b(n);
  }
  const x = T.current, A = (() => {
    const _ = y.findIndex((E) => $i(E));
    return _ === -1 ? y.length : _;
  })();
  return /* @__PURE__ */ h.jsx(Xm, {
    transition: i,
    children: /* @__PURE__ */ h.jsx(t, {
      "aria-label": n,
      style: {
        display: "inline-flex",
        position: "relative",
        ...d
      },
      className: u,
      ...p,
      children: /* @__PURE__ */ h.jsx(Gs, {
        mode: "popLayout",
        initial: o,
        children: y.map((_, E) => {
          const M = E < A, O = M ? `pre-${E}` : `col-${y.length - 1 - E}`, D = E * l, N = E === y.length - 1;
          return /* @__PURE__ */ h.jsx(ki.span, {
            layout: "position",
            initial: M ? !1 : {
              opacity: 0
            },
            animate: M ? void 0 : {
              opacity: 1
            },
            exit: M ? void 0 : {
              opacity: 0
            },
            style: {
              display: "inline-block",
              position: "relative"
            },
            children: M ? /* @__PURE__ */ h.jsx("span", {
              style: {
                display: "inline-block",
                whiteSpace: "pre"
              },
              children: _
            }) : /* @__PURE__ */ h.jsx(Gs, {
              mode: "popLayout",
              initial: o,
              propagate: !0,
              children: /* @__PURE__ */ h.jsx(ki.span, {
                "aria-hidden": "true",
                initial: {
                  y: $i(_) ? x > 0 ? lc : -lc : 0,
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
                    delay: D
                  }
                },
                exit: {
                  y: $i(_) ? x > 0 ? -lc : lc : 0,
                  opacity: 0,
                  filter: "blur(2px)",
                  scale: 0.5,
                  transition: {
                    delay: D
                  }
                },
                onAnimationComplete: N && c ? c : void 0,
                style: {
                  display: "inline-block",
                  whiteSpace: "pre"
                },
                children: _
              }, j[E])
            })
          }, O);
        })
      })
    })
  });
}
function KA({ n, current: t }) {
  const i = qh(t, (l) => {
    let o = qA(n - l, 10);
    return o > 5 && (o -= 10), `${-Math.max(-1, Math.min(1, o)) * 100}%`;
  });
  return /* @__PURE__ */ h.jsx(ki.span, {
    "aria-hidden": !0,
    style: {
      position: "absolute",
      top: 0,
      left: "50%",
      x: "-50%",
      display: "inline-block",
      whiteSpace: "pre",
      y: i
    },
    children: n
  });
}
const ZA = [
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
], ks = "0.25em", e2 = `linear-gradient(to bottom, transparent 0%, black ${ks}, black calc(100% - ${ks}), transparent 100%)`;
function QA({ digit: n, direction: t, transition: i, delay: l, animateIn: o }) {
  const c = Lj(), u = Math.max(n, 1), d = o ? n - u * (t || 1) : n, p = Km(d), y = C.useRef(n), g = C.useRef(n), v = C.useRef(!0);
  if (n !== g.current) {
    const b = g.current;
    let j;
    t > 0 ? j = n >= b ? n - b : 10 - b + n : t < 0 ? j = b >= n ? -(b - n) : -(10 - n + b) : j = n - b, y.current += j, g.current = n;
  }
  return C.useEffect(() => {
    if (!c) {
      const b = Math.max(n, 1);
      lr(p, y.current + b * (t || 1), {
        ...i
      });
      return;
    }
    v.current && (v.current = !1, !o) || lr(p, y.current, {
      ...i,
      delay: l
    });
  }), /* @__PURE__ */ h.jsxs("span", {
    style: {
      display: "inline-block",
      position: "relative",
      verticalAlign: "top"
    },
    children: [
      /* @__PURE__ */ h.jsx("span", {
        style: {
          visibility: "hidden",
          whiteSpace: "pre",
          display: "inline-block"
        },
        children: "0"
      }),
      ZA.map((b) => /* @__PURE__ */ h.jsx(KA, {
        n: b,
        current: p
      }, b))
    ]
  });
}
function FA({ text: n, Component: t, transition: i, stagger: l, animateInitial: o, className: c, style: u, rest: d }) {
  const p = Bi(n), y = C.useRef(p.length), [g, v] = C.useState(n), [b, j] = C.useState(() => p.map((M, O) => O)), w = C.useRef(1), T = C.useRef(!1);
  if (C.useEffect(() => {
    T.current = !0;
  }, []), n !== g) {
    const M = ES(g, n, b, y.current);
    y.current = M.nextId, w.current = M.direction, j(M.keys), v(n);
  }
  const x = w.current, A = (() => {
    const M = p.findIndex((O) => $i(O));
    return M === -1 ? p.length : M;
  })(), _ = p.filter((M) => $i(M)).length;
  let E = 0;
  return /* @__PURE__ */ h.jsx(Xm, {
    transition: i,
    children: /* @__PURE__ */ h.jsx(t, {
      "aria-label": n,
      style: {
        display: "inline-flex",
        position: "relative",
        ...u
      },
      className: c,
      ...d,
      children: /* @__PURE__ */ h.jsx("span", {
        style: {
          display: "inline-flex",
          paddingTop: ks,
          paddingBottom: ks,
          marginTop: `calc(-1 * ${ks})`,
          marginBottom: `calc(-1 * ${ks})`,
          maskImage: e2,
          WebkitMaskImage: e2
        },
        children: /* @__PURE__ */ h.jsx(Gs, {
          mode: "popLayout",
          initial: o,
          children: p.map((M, O) => {
            const D = O < A, N = D ? `pre-${O}` : `col-${p.length - 1 - O}`;
            if (D || !$i(M))
              return /* @__PURE__ */ h.jsx(ki.span, {
                layout: "position",
                initial: !1,
                exit: D ? void 0 : {
                  opacity: 0
                },
                style: {
                  display: "inline-block",
                  whiteSpace: "pre"
                },
                children: M
              }, N);
            const V = (_ - 1 - E) * l;
            return E++, /* @__PURE__ */ h.jsx(ki.span, {
              layout: "position",
              initial: !1,
              exit: {
                opacity: 0
              },
              style: {
                display: "inline-block"
              },
              children: /* @__PURE__ */ h.jsx(QA, {
                digit: Number(M),
                direction: x,
                transition: i,
                delay: V,
                animateIn: T.current || o
              })
            }, N);
          })
        })
      })
    })
  });
}
function IA({ text: n, Component: t, transition: i, driftX: l, driftY: o, trend: c, animateInitial: u, onComplete: d, className: p, style: y, rest: g }) {
  const v = Bi(n), b = C.useRef(v.length), [j, w] = C.useState(n), [T, x] = C.useState(() => v.map((E, M) => `c${M}`)), [A, _] = C.useState(0);
  if (n !== j) {
    const E = GA(j, n, T, b.current);
    b.current = E.nextId, w(n), x(E.keys), _(E.changeRatio);
  }
  return /* @__PURE__ */ h.jsx(Xm, {
    transition: i,
    children: /* @__PURE__ */ h.jsx(t, {
      "aria-label": n,
      style: {
        display: "inline-flex",
        ...y
      },
      className: p,
      ...g,
      children: /* @__PURE__ */ h.jsx(Gs, {
        mode: "popLayout",
        initial: u,
        children: v.map((E, M) => {
          const O = T[M], D = v.length <= 1 ? 0 : M / (v.length - 1), N = (D - 0.5) * l * A, V = (D - 0.5) * o * A, H = c * 8 * A, B = M === v.length - 1;
          return /* @__PURE__ */ h.jsx(ki.span, {
            "aria-hidden": "true",
            layout: "position",
            initial: {
              opacity: 0,
              x: N,
              y: V + H,
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
              x: N,
              y: V - H,
              filter: "blur(4px)",
              scale: 0.85
            },
            onAnimationComplete: B && d ? d : void 0,
            style: {
              display: "inline-block",
              whiteSpace: "pre"
            },
            children: E
          }, O);
        })
      })
    })
  });
}
function JA({ children: n, transition: t }) {
  const [i, l] = C.useState(null), [o, c] = C.useState(0), u = C.useCallback((d) => {
    l(d);
  }, []);
  return C.useEffect(() => {
    if (!i) return;
    const d = new ResizeObserver(([p]) => {
      c(Math.ceil(p.contentRect.width));
    });
    return d.observe(i), () => d.disconnect();
  }, [
    i
  ]), /* @__PURE__ */ h.jsx(ki.span, {
    animate: {
      width: o > 0 ? o : "auto"
    },
    transition: t,
    style: {
      display: "inline-flex"
    },
    children: /* @__PURE__ */ h.jsx("span", {
      ref: u,
      style: {
        display: "inline-flex"
      },
      children: n
    })
  });
}
function Xs(n) {
  const { children: t, variant: i = "text", animation: l, as: o = "span", drift: { x: c = 15, y: u = 0 } = {}, trend: d = 0, stagger: p = 0.02, initial: y = !1, onComplete: g, autoSize: v = !0, className: b, style: j, ...w } = n, T = YA[l ?? (i === "number" ? "snappy" : "default")], x = {
    text: String(t ?? ""),
    Component: o,
    transition: T,
    stagger: p,
    animateInitial: y,
    onComplete: g,
    className: b,
    style: j,
    rest: w
  };
  let A;
  return i === "number" ? A = /* @__PURE__ */ h.jsx(XA, {
    ...x
  }) : i === "slots" ? A = /* @__PURE__ */ h.jsx(FA, {
    ...x
  }) : A = /* @__PURE__ */ h.jsx(IA, {
    ...x,
    driftX: c,
    driftY: u,
    trend: d
  }), v ? /* @__PURE__ */ h.jsx(JA, {
    transition: T,
    children: A
  }) : A;
}
var Dr = mb();
function WA(n, t) {
  if (n instanceof RegExp) return { keys: !1, pattern: n };
  var i, l, o, c, u = [], d = "", p = n.split("/");
  for (p[0] || p.shift(); o = p.shift(); )
    i = o[0], i === "*" ? (u.push(i), d += o[1] === "?" ? "(?:/(.*))?" : "/(.*)") : i === ":" ? (l = o.indexOf("?", 1), c = o.indexOf(".", 1), u.push(o.substring(1, ~l ? l : ~c ? c : o.length)), d += ~l && !~c ? "(?:/([^/]+?))?" : "/([^/]+?)", ~c && (d += (~l ? "?" : "") + "\\" + o.substring(c))) : d += "/" + o;
  return {
    keys: u,
    pattern: new RegExp("^" + d + (t ? "(?=$|/)" : "/?$"), "i")
  };
}
const tE = "popstate", Qm = "pushState", Fm = "replaceState", eE = "hashchange", n2 = [
  tE,
  Qm,
  Fm,
  eE
], nE = (n) => {
  for (const t of n2)
    addEventListener(t, n);
  return () => {
    for (const t of n2)
      removeEventListener(t, n);
  };
}, MS = (n, t) => v5.useSyncExternalStore(nE, n, t), a2 = () => location.search, aE = ({ ssrSearch: n } = {}) => MS(
  a2,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrSearch="?foo",
  // client hydrates with just <Router /> and reads from location.search
  n != null ? () => n : a2
), i2 = () => location.pathname, iE = ({ ssrPath: n } = {}) => MS(
  i2,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrPath="/foo",
  // client hydrates with just <Router /> and reads from location.pathname
  n != null ? () => n : i2
), sE = (n, { replace: t = !1, state: i = null } = {}) => history[t ? Fm : Qm](i, "", n), lE = (n = {}) => [iE(n), sE], s2 = Symbol.for("wouter_v3");
if (typeof history < "u" && typeof window[s2] > "u") {
  for (const n of [Qm, Fm]) {
    const t = history[n];
    history[n] = function() {
      const i = t.apply(this, arguments), l = new Event(n);
      return l.arguments = arguments, dispatchEvent(l), i;
    };
  }
  Object.defineProperty(window, s2, { value: !0 });
}
const rE = (n, t) => t.toLowerCase().indexOf(n.toLowerCase()) ? "~" + t : t.slice(n.length) || "/", _S = (n = "") => n === "/" ? "" : n, oE = (n, t) => n[0] === "~" ? n.slice(1) : _S(t) + n, cE = (n = "", t) => rE(l2(_S(n)), l2(t)), l2 = (n) => {
  try {
    return decodeURI(n);
  } catch {
    return n;
  }
}, uE = {
  hook: lE,
  searchHook: aE,
  parser: WA,
  base: "",
  // this option is used to override the current location during SSR
  ssrPath: void 0,
  ssrSearch: void 0,
  // optional context to track render state during SSR
  ssrContext: void 0,
  // customizes how `href` props are transformed for <Link />
  hrefs: (n) => n,
  // wraps navigate calls, useful for view transitions
  aroundNav: (n, t, i) => n(t, i)
}, fE = C.createContext(uE), dE = () => C.useContext(fE), hE = {};
C.createContext(hE);
const mE = (n) => {
  const [t, i] = n.hook(n);
  return [
    cE(n.base, t),
    pb(
      (l, o) => n.aroundNav(i, oE(l, n.base), o)
    )
  ];
}, pE = C.forwardRef((n, t) => {
  const i = dE(), [l, o] = mE(i), {
    to: c = "",
    href: u = c,
    onClick: d,
    asChild: p,
    children: y,
    className: g,
    /* eslint-disable no-unused-vars */
    replace: v,
    state: b,
    transition: j,
    /* eslint-enable no-unused-vars */
    ...w
  } = n, T = pb((A) => {
    A.ctrlKey || A.metaKey || A.altKey || A.shiftKey || A.button !== 0 || (d?.(A), A.defaultPrevented || (A.preventDefault(), o(u, n)));
  }), x = i.hrefs(
    u[0] === "~" ? u.slice(1) : i.base + u,
    i
    // pass router as a second argument for convinience
  );
  return p && C.isValidElement(y) ? C.cloneElement(y, { onClick: T, href: x }) : C.createElement("a", {
    ...w,
    onClick: T,
    href: x,
    // `className` can be a function to apply the class if this link is active
    className: g?.call ? g(l === u) : g,
    children: y,
    ref: t
  });
}), Im = Object.freeze({
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
}), tu = Object.freeze({
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
}), yE = "_root_xunnd_1", r2 = "_glassBackground_xunnd_5", o2 = "_glassShadow_xunnd_25", gE = "_glassBorder_1y4zy_1", vE = "_muted_1y4zy_15", Sr = (n) => {
  const t = At.c(2), {
    className: i,
    muted: l
  } = n, o = `${gE} ${l !== void 0 && l ? vE : ""} ${i === void 0 ? "" : i}`;
  let c;
  return t[0] !== o ? (c = /* @__PURE__ */ h.jsx("div", {
    className: o,
    "aria-hidden": "true"
  }), t[0] = o, t[1] = c) : c = t[1], c;
}, Jm = (n) => {
  const t = At.c(16);
  let i, l, o, c;
  t[0] !== n ? ({
    children: i,
    className: o,
    style: c,
    ...l
  } = n, t[0] = n, t[1] = i, t[2] = l, t[3] = o, t[4] = c) : (i = t[1], l = t[2], o = t[3], c = t[4]);
  const u = o === void 0 ? "" : o;
  let d;
  t[5] !== c ? (d = c === void 0 ? {} : c, t[5] = c, t[6] = d) : d = t[6];
  const p = d;
  if (!i) {
    let w;
    return t[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (w = /* @__PURE__ */ h.jsxs(h.Fragment, {
      children: [/* @__PURE__ */ h.jsx("div", {
        className: r2,
        "aria-hidden": "true"
      }), /* @__PURE__ */ h.jsx("div", {
        className: o2,
        "aria-hidden": "true"
      }), /* @__PURE__ */ h.jsx(Sr, {})]
    }), t[7] = w) : w = t[7], w;
  }
  const y = `${yE} ${u}`;
  let g, v, b;
  t[8] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (g = /* @__PURE__ */ h.jsx("div", {
    className: r2,
    "aria-hidden": "true"
  }), v = /* @__PURE__ */ h.jsx("div", {
    className: o2,
    "aria-hidden": "true"
  }), b = /* @__PURE__ */ h.jsx(Sr, {}), t[8] = g, t[9] = v, t[10] = b) : (g = t[8], v = t[9], b = t[10]);
  let j;
  return t[11] !== i || t[12] !== l || t[13] !== p || t[14] !== y ? (j = /* @__PURE__ */ h.jsxs("div", {
    className: y,
    style: p,
    ...l,
    children: [g, v, b, i]
  }), t[11] = i, t[12] = l, t[13] = p, t[14] = y, t[15] = j) : j = t[15], j;
}, bE = (n) => /* @__PURE__ */ C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ C.createElement("g", { id: "24_icon-fill/arrow-down" }, /* @__PURE__ */ C.createElement("path", { id: "Vector", d: "M11.2482 20.3129C11.6466 20.7682 12.3556 20.7682 12.7541 20.3129L17.5499 14.8314C18.1155 14.1849 17.6561 13.1732 16.797 13.1732H13.5011V5.67324C13.5011 4.84481 12.8295 4.17324 12.0011 4.17324C11.1727 4.17324 10.5011 4.84481 10.5011 5.67324V13.1732H7.20522C6.34614 13.1732 5.88678 14.1849 6.45229 14.8314L11.2482 20.3129Z", fill: "#3D3C3A" }))), xE = (n) => /* @__PURE__ */ C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ C.createElement("g", { id: "24_icon-fill/arrow-up" }, /* @__PURE__ */ C.createElement("path", { id: "Vector", d: "M11.2483 3.85905C11.6467 3.40376 12.3558 3.40375 12.7542 3.85905L17.5501 9.3405C18.1158 9.98708 17.6563 10.9997 16.7971 10.9997H13.5012V18.4997C13.501 19.3279 12.8295 19.9997 12.0012 19.9997C11.1729 19.9997 10.5014 19.3279 10.5012 18.4997V10.9997H7.20535C6.34619 10.9997 5.88666 9.98708 6.45242 9.3405L11.2483 3.85905Z", fill: "#3D3C3A" }))), SE = (n) => /* @__PURE__ */ C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ C.createElement("g", { id: "24_icon-fill/star" }, /* @__PURE__ */ C.createElement("path", { id: "Vector 234255911", d: "M11 16L15 12L11 8", stroke: "#3D3C3A", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }))), RS = "_redaction_dcm1f_1", DS = "_active_dcm1f_19", wE = "_sized_dcm1f_29", Fd = 1800, CE = 1.3, NS = /* @__PURE__ */ C.createContext(null), Wm = () => C.useContext(NS);
let Uc = [];
const TE = () => {
  const n = Uc;
  Uc = [];
  const t = performance.now(), i = n.map((l) => {
    const o = l.getBoundingClientRect().top + window.scrollY;
    return -(((t - o * CE) % Fd + Fd) % Fd);
  });
  n.forEach((l, o) => {
    l.style.setProperty("--wave-phase", `${Math.round(i[o])}ms`);
  });
}, tp = (n) => {
  n && (Uc.length === 0 && requestAnimationFrame(TE), Uc.push(n));
}, OS = (n) => n ? `${RS} ${DS}` : "", jE = 10, Ni = (n) => {
  const t = At.c(7), {
    active: i,
    width: l,
    children: o
  } = n, c = o != null && o !== "", u = l ?? (!c && i ? jE : void 0), d = i ? tp : void 0, p = `
                ${RS}
                ${i ? DS : ""}
                ${u ? wE : ""}`;
  let y;
  t[0] !== u ? (y = u ? {
    width: `${u}ch`
  } : void 0, t[0] = u, t[1] = y) : y = t[1];
  const g = c ? o : " ";
  let v;
  return t[2] !== d || t[3] !== p || t[4] !== y || t[5] !== g ? (v = /* @__PURE__ */ h.jsx("span", {
    ref: d,
    className: p,
    style: y,
    children: g
  }), t[2] = d, t[3] = p, t[4] = y, t[5] = g, t[6] = v) : v = t[6], v;
}, zs = (n) => {
  const t = At.c(6), {
    className: i,
    as: l,
    active: o
  } = n, c = i === void 0 ? "" : i, u = l === void 0 ? "div" : l, d = Wm(), p = o ?? d ?? !0, y = OS(p), g = p ? tp : void 0, v = `${c} ${y}`;
  let b;
  t[0] !== v ? (b = v.trim(), t[0] = v, t[1] = b) : b = t[1];
  let j;
  return t[2] !== u || t[3] !== g || t[4] !== b ? (j = /* @__PURE__ */ h.jsx(u, {
    ref: g,
    className: b
  }), t[2] = u, t[3] = g, t[4] = b, t[5] = j) : j = t[5], j;
}, LS = (n) => {
  const t = At.c(3), {
    active: i,
    children: l
  } = n, o = !!(i === void 0 || i);
  let c;
  return t[0] !== l || t[1] !== o ? (c = /* @__PURE__ */ h.jsx(NS.Provider, {
    value: o,
    children: l
  }), t[0] = l, t[1] = o, t[2] = c) : c = t[2], c;
}, ep = "_text_9l4iv_1", Hc = "_icon_9l4iv_28", $S = "_title32_9l4iv_34", kS = "_title24_9l4iv_35", BS = "_title20_9l4iv_36", VS = "_body_9l4iv_56", zS = "_subtitle_9l4iv_63", US = "_caption_9l4iv_70", AE = {
  text: ep,
  icon: Hc,
  title32: $S,
  title24: kS,
  title20: BS,
  body: VS,
  subtitle: zS,
  caption: US
}, EE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  body: VS,
  caption: US,
  default: AE,
  icon: Hc,
  subtitle: zS,
  text: ep,
  title20: BS,
  title24: kS,
  title32: $S
}, Symbol.toStringTag, { value: "Module" })), ME = {
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
}, pt = (n) => {
  const t = At.c(34);
  let i, l, o, c, u, d, p, y, g, v, b;
  t[0] !== n ? ({
    as: i,
    variant: v,
    weight: b,
    rounded: y,
    skeleton: g,
    caps: o,
    chevron: c,
    arrow: l,
    children: u,
    className: d,
    ...p
  } = n, t[0] = n, t[1] = i, t[2] = l, t[3] = o, t[4] = c, t[5] = u, t[6] = d, t[7] = p, t[8] = y, t[9] = g, t[10] = v, t[11] = b) : (i = t[1], l = t[2], o = t[3], c = t[4], u = t[5], d = t[6], p = t[7], y = t[8], g = t[9], v = t[10], b = t[11]);
  const j = v === void 0 ? "body" : v, w = Wm(), T = i || "div", x = g !== void 0 ? !!g : !!w, A = g !== void 0 || w !== null, _ = typeof g == "number" ? g : void 0;
  let E;
  t[12] !== x || t[13] !== u || t[14] !== A || t[15] !== _ ? (E = A ? /* @__PURE__ */ h.jsx(Ni, {
    active: x,
    width: _,
    children: u
  }) : u, t[12] = x, t[13] = u, t[14] = A, t[15] = _, t[16] = E) : E = t[16];
  const M = E, O = l?.direction === "down" ? bE : xE, D = `${ep} ${EE[ME[j] || "body"]} ${d || ""}`, N = y || void 0, V = o || void 0, H = x || void 0;
  let B;
  t[17] !== O || t[18] !== l?.direction ? (B = l?.direction && /* @__PURE__ */ h.jsx(O, {
    className: Hc
  }), t[17] = O, t[18] = l?.direction, t[19] = B) : B = t[19];
  let U;
  t[20] !== c ? (U = c && /* @__PURE__ */ h.jsx(SE, {
    className: Hc
  }), t[20] = c, t[21] = U) : U = t[21];
  let F;
  return t[22] !== T || t[23] !== M || t[24] !== p || t[25] !== D || t[26] !== N || t[27] !== V || t[28] !== H || t[29] !== B || t[30] !== U || t[31] !== j || t[32] !== b ? (F = /* @__PURE__ */ h.jsxs(T, {
    ...p,
    className: D,
    "data-variant": j,
    "data-weight": b,
    "data-rounded": N,
    "data-caps": V,
    "data-skeleton": H,
    children: [B, M, U]
  }), t[22] = T, t[23] = M, t[24] = p, t[25] = D, t[26] = N, t[27] = V, t[28] = H, t[29] = B, t[30] = U, t[31] = j, t[32] = b, t[33] = F) : F = t[33], F;
}, np = {
  skin: "apple",
  isApple: !0,
  isMaterial: !1,
  setSkin: () => {
  }
}, HS = /* @__PURE__ */ C.createContext(np), Nr = () => C.useContext(HS) || np;
function _E(n) {
  const t = At.c(3), {
    children: i
  } = n;
  let l;
  t[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (l = [], t[0] = l) : l = t[0], C.useEffect(RE, l);
  let o;
  return t[1] !== i ? (o = /* @__PURE__ */ h.jsx(HS.Provider, {
    value: np,
    children: i
  }), t[1] = i, t[2] = o) : o = t[2], o;
}
function RE() {
  document.body.classList.remove("material", "skin-switcher-active"), document.body.classList.add("apple");
}
const ap = "_button_1d7yf_1", qS = "_regular_1d7yf_21", YS = "_overlay_1d7yf_35", PS = "_secondary_1d7yf_42", GS = "_accent_1d7yf_47", ip = "_icon_1d7yf_53", sp = "_label_1d7yf_57", lp = "_content_1d7yf_61", DE = {
  button: ap,
  regular: qS,
  overlay: YS,
  secondary: PS,
  accent: GS,
  icon: ip,
  label: sp,
  content: lp
}, NE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accent: GS,
  button: ap,
  content: lp,
  default: DE,
  icon: ip,
  label: sp,
  overlay: YS,
  regular: qS,
  secondary: PS
}, Symbol.toStringTag, { value: "Module" })), c2 = (n) => {
  const t = At.c(16), {
    children: i,
    onClick: l,
    variant: o,
    ariaLabel: c,
    title: u
  } = n, d = o === void 0 ? "regular" : o, p = typeof i == "string", y = d === "regular" || d === "overlay", g = `${ap} ${NE[d]} ${p ? sp : ip}`;
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
  let j;
  t[2] !== y ? (j = y && /* @__PURE__ */ h.jsx(Sr, {
    muted: !0
  }), t[2] = y, t[3] = j) : j = t[3];
  let w;
  t[4] !== i || t[5] !== p ? (w = p ? /* @__PURE__ */ h.jsx(pt, {
    variant: "body",
    weight: "medium",
    children: i
  }) : i, t[4] = i, t[5] = p, t[6] = w) : w = t[6];
  let T;
  t[7] !== w ? (T = /* @__PURE__ */ h.jsx("span", {
    className: lp,
    children: w
  }), t[7] = w, t[8] = T) : T = t[8];
  let x;
  return t[9] !== c || t[10] !== l || t[11] !== g || t[12] !== j || t[13] !== T || t[14] !== u ? (x = /* @__PURE__ */ h.jsxs(kh, {
    type: "button",
    className: g,
    onClick: l,
    "aria-label": c,
    title: u,
    whileTap: v,
    transition: b,
    children: [j, T]
  }), t[9] = c, t[10] = l, t[11] = g, t[12] = j, t[13] = T, t[14] = u, t[15] = x) : x = t[15], x;
}, OE = /* @__PURE__ */ C.createContext(!1), LE = "_root_125i3_1", u2 = "_side_125i3_9", $E = "_trailing_125i3_18", kE = "_middle_125i3_22", BE = "_middleOverlay_125i3_31", VE = "_titlePill_125i3_35", zE = "_titleContent_125i3_45", UE = "_inModal_125i3_59", HE = (n) => {
  const t = At.c(32), {
    left: i,
    onLeft: l,
    leftVariant: o,
    leftAriaLabel: c,
    leftTitle: u,
    right: d,
    onRight: p,
    rightVariant: y,
    rightAriaLabel: g,
    rightTitle: v,
    overlay: b,
    titleGlass: j,
    children: w
  } = n, T = b === void 0 ? !1 : b, x = j === void 0 ? !1 : j, {
    isApple: A
  } = Nr(), _ = C.useContext(OE), E = T ? "overlay" : "regular";
  let M;
  t[0] !== w ? (M = /* @__PURE__ */ h.jsx(pt, {
    variant: "body",
    weight: "semibold",
    children: w
  }), t[0] = w, t[1] = M) : M = t[1];
  const O = M, D = `${LE} ${_ ? UE : ""}`;
  let N;
  t[2] !== E || t[3] !== i || t[4] !== c || t[5] !== u || t[6] !== o || t[7] !== l ? (N = i != null && /* @__PURE__ */ h.jsx(c2, {
    onClick: l,
    variant: o ?? E,
    ariaLabel: c,
    title: u,
    children: i
  }), t[2] = E, t[3] = i, t[4] = c, t[5] = u, t[6] = o, t[7] = l, t[8] = N) : N = t[8];
  let V;
  t[9] !== N ? (V = /* @__PURE__ */ h.jsx("div", {
    className: u2,
    children: N
  }), t[9] = N, t[10] = V) : V = t[10];
  let H;
  t[11] !== E || t[12] !== p || t[13] !== d || t[14] !== g || t[15] !== v || t[16] !== y ? (H = d != null && /* @__PURE__ */ h.jsx(c2, {
    onClick: p,
    variant: y ?? E,
    ariaLabel: g,
    title: v,
    children: d
  }), t[11] = E, t[12] = p, t[13] = d, t[14] = g, t[15] = v, t[16] = y, t[17] = H) : H = t[17];
  let B;
  t[18] !== H ? (B = /* @__PURE__ */ h.jsx("div", {
    className: `${u2} ${$E}`,
    children: H
  }), t[18] = H, t[19] = B) : B = t[19];
  const U = `${kE} ${T ? BE : ""}`;
  let F;
  t[20] !== A || t[21] !== O || t[22] !== x ? (F = A && x ? /* @__PURE__ */ h.jsxs("div", {
    className: VE,
    children: [/* @__PURE__ */ h.jsx(Jm, {}), /* @__PURE__ */ h.jsx("span", {
      className: zE,
      children: O
    })]
  }) : O, t[20] = A, t[21] = O, t[22] = x, t[23] = F) : F = t[23];
  let Y;
  t[24] !== F || t[25] !== U ? (Y = /* @__PURE__ */ h.jsx("div", {
    className: U,
    children: F
  }), t[24] = F, t[25] = U, t[26] = Y) : Y = t[26];
  let st;
  return t[27] !== Y || t[28] !== D || t[29] !== V || t[30] !== B ? (st = /* @__PURE__ */ h.jsxs("div", {
    className: D,
    "data-modal-drag": "",
    children: [V, B, Y]
  }), t[27] = Y, t[28] = D, t[29] = V, t[30] = B, t[31] = st) : st = t[31], st;
}, qE = /* @__PURE__ */ C.createContext({
  inDetailPane: !1
}), YE = () => C.useContext(qE), ie = () => {
}, rc = () => ({
  show: ie,
  hide: ie,
  enable: ie,
  disable: ie,
  showProgress: ie,
  hideProgress: ie,
  setParams: ie,
  setText: ie,
  onClick: ie,
  offClick: ie
}), PE = {
  initData: "",
  themeParams: {},
  viewportHeight: 0,
  BackButton: rc(),
  SettingsButton: rc(),
  MainButton: rc(),
  SecondaryButton: rc(),
  HapticFeedback: {
    impactOccurred: ie,
    notificationOccurred: ie,
    selectionChanged: ie
  },
  onEvent: ie,
  offEvent: ie,
  expand: ie,
  setHeaderColor: ie,
  setBackgroundColor: ie,
  setBottomBarColor: ie,
  disableVerticalSwipes: ie,
  enableVerticalSwipes: ie,
  requestFullscreen: ie,
  exitFullscreen: ie,
  shareToStory: ie
}, Sa = globalThis.Telegram?.WebApp ?? PE;
function GE(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Id = { exports: {} }, Jd, f2;
function XE() {
  if (f2) return Jd;
  f2 = 1;
  var n = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Jd = n, Jd;
}
var Wd, d2;
function KE() {
  if (d2) return Wd;
  d2 = 1;
  var n = /* @__PURE__ */ XE();
  function t() {
  }
  function i() {
  }
  return i.resetWarningCache = t, Wd = function() {
    function l(u, d, p, y, g, v) {
      if (v !== n) {
        var b = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw b.name = "Invariant Violation", b;
      }
    }
    l.isRequired = l;
    function o() {
      return l;
    }
    var c = {
      array: l,
      bigint: l,
      bool: l,
      func: l,
      number: l,
      object: l,
      string: l,
      symbol: l,
      any: l,
      arrayOf: o,
      element: l,
      elementType: l,
      instanceOf: o,
      node: l,
      objectOf: o,
      oneOf: o,
      oneOfType: o,
      shape: o,
      exact: o,
      checkPropTypes: i,
      resetWarningCache: t
    };
    return c.PropTypes = c, c;
  }, Wd;
}
var h2;
function ZE() {
  return h2 || (h2 = 1, Id.exports = /* @__PURE__ */ KE()()), Id.exports;
}
var QE = /* @__PURE__ */ ZE();
const $n = /* @__PURE__ */ GE(QE);
$n.func;
const rp = "_button_124dm_1", XS = "_filled_124dm_9", KS = "_tinted_124dm_14", ZS = "_plain_124dm_19", QS = "_outlined_124dm_24", FS = "_gray_124dm_28", IS = "_disabled_124dm_33", op = "_skeleton_124dm_38", JS = "_wave_124dm_1", FE = {
  button: rp,
  filled: XS,
  tinted: KS,
  plain: ZS,
  outlined: QS,
  gray: FS,
  disabled: IS,
  skeleton: op,
  wave: JS
}, IE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  button: rp,
  default: FE,
  disabled: IS,
  filled: XS,
  gray: FS,
  outlined: QS,
  plain: ZS,
  skeleton: op,
  tinted: KS,
  wave: JS
}, Symbol.toStringTag, { value: "Module" })), ti = (n) => {
  const t = At.c(34);
  let i, l, o, c, u;
  t[0] !== n ? ({
    variant: u,
    label: i,
    isShine: o,
    isFill: c,
    ...l
  } = n, t[0] = n, t[1] = i, t[2] = l, t[3] = o, t[4] = c, t[5] = u) : (i = t[1], l = t[2], o = t[3], c = t[4], u = t[5]);
  const d = o === void 0 ? !1 : o, p = c === void 0 ? !1 : c, {
    isApple: y
  } = Nr(), g = !!Wm(), v = OS(g);
  let b;
  t[6] !== p ? (b = p && {
    "data-fill": !0
  }, t[6] = p, t[7] = b) : b = t[7];
  let j;
  t[8] !== d || t[9] !== g || t[10] !== u ? (j = u === "filled" && d && !g && {
    "data-shine": !0
  }, t[8] = d, t[9] = g, t[10] = u, t[11] = j) : j = t[11];
  let w;
  t[12] !== b || t[13] !== j ? (w = {
    ...b,
    ...j
  }, t[12] = b, t[13] = j, t[14] = w) : w = t[14];
  const T = w;
  let x;
  t[15] !== i ? (x = /* @__PURE__ */ h.jsx(pt, {
    variant: "body",
    weight: "semibold",
    children: i
  }), t[15] = i, t[16] = x) : x = t[16];
  const A = x, _ = g ? tp : void 0, E = `${rp} ${IE[u]} ${g ? op : ""} ${v}`;
  let M;
  t[17] !== y || t[18] !== g ? (M = y && !g && {
    whileTap: {
      scale: 1.02
    }
  }, t[17] = y, t[18] = g, t[19] = M) : M = t[19];
  let O;
  t[20] !== g || t[21] !== u ? (O = u === "filled" && !g && /* @__PURE__ */ h.jsx(Sr, {}), t[20] = g, t[21] = u, t[22] = O) : O = t[22];
  let D;
  t[23] !== A || t[24] !== g ? (D = g ? /* @__PURE__ */ h.jsx(LS, {
    active: !1,
    children: A
  }) : A, t[23] = A, t[24] = g, t[25] = D) : D = t[25];
  let N;
  return t[26] !== T || t[27] !== l || t[28] !== O || t[29] !== D || t[30] !== _ || t[31] !== E || t[32] !== M ? (N = /* @__PURE__ */ h.jsxs(xa, {
    ref: _,
    ...M,
    ...T,
    ...l,
    className: l.className ? `${E} ${l.className}` : E,
    children: [O, D]
  }), t[26] = T, t[27] = l, t[28] = O, t[29] = D, t[30] = _, t[31] = E, t[32] = M, t[33] = N) : N = t[33], N;
};
function WS(n) {
  var t, i, l = "";
  if (typeof n == "string" || typeof n == "number") l += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var o = n.length;
    for (t = 0; t < o; t++) n[t] && (i = WS(n[t])) && (l && (l += " "), l += i);
  } else for (i in n) n[i] && (l && (l += " "), l += i);
  return l;
}
function JE() {
  for (var n, t, i = 0, l = "", o = arguments.length; i < o; i++) (n = arguments[i]) && (t = WS(n)) && (l && (l += " "), l += t);
  return l;
}
const WE = (...n) => JE(...n), rr = {
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
}, t8 = {
  hidden: {
    scale: 0,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: rr.DROPDOWN
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.25
    }
  }
}, t3 = "_overlay_qo6yx_1", e3 = "_opacity_qo6yx_2", cp = "_fadeIn_qo6yx_6", up = "_fadeOut_qo6yx_10", e8 = {
  overlay: t3,
  opacity: e3,
  fadeIn: cp,
  fadeOut: up,
  "overlay-out": "_overlay-out_qo6yx_1",
  "opacity-out": "_opacity-out_qo6yx_1"
}, n8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: e8,
  fadeIn: cp,
  fadeOut: up,
  opacity: e3,
  overlay: t3
}, Symbol.toStringTag, { value: "Module" })), a8 = typeof window < "u" && "ontouchstart" in window, i8 = 250;
function s8(n) {
  const t = At.c(21);
  let i;
  t[0] !== n ? (i = n === void 0 ? {} : n, t[0] = n, t[1] = i) : i = t[1];
  const {
    onTap: l,
    onTapOut: o,
    mode: c,
    disabled: u
  } = i, d = n8[c === void 0 ? "overlay" : c], [p, y] = C.useState(!1);
  let g;
  t[2] !== d ? (g = [d], t[2] = d, t[3] = g) : g = t[3];
  const [v, b] = C.useState(g), j = C.useRef();
  let w;
  t[4] !== d || t[5] !== o ? (w = () => {
    y(!1), b([d, up]), o?.(), j.current = window.setTimeout(() => {
      b([d]);
    }, i8);
  }, t[4] = d, t[5] = o, t[6] = w) : w = t[6];
  const T = w;
  let x;
  t[7] !== d || t[8] !== l ? (x = (N) => {
    clearTimeout(j.current), y(!0), b([d, cp]), l?.(N);
  }, t[7] = d, t[8] = l, t[9] = x) : x = t[9];
  const A = x;
  let _, E;
  t[10] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (_ = () => () => clearTimeout(j.current), E = [], t[10] = _, t[11] = E) : (_ = t[10], E = t[11]), C.useEffect(_, E);
  let M;
  t[12] !== u || t[13] !== A || t[14] !== T || t[15] !== p ? (M = a8 ? {
    onTouchStart: (N) => {
      u || (N.touches.length === 1 ? A({
        target: N.currentTarget,
        clientX: N.touches[0].clientX,
        clientY: N.touches[0].clientY
      }) : T());
    },
    onTouchEnd: () => {
      u || p && T();
    },
    onPointerMove: (N) => {
      p && N.pointerType === "touch" && (N.movementY !== 0 || N.movementX !== 0) && T();
    },
    onTouchCancel: () => {
      p && T();
    }
  } : {
    onMouseLeave: () => {
      p && T();
    },
    onMouseDown: (N) => {
      u || A({
        target: N.currentTarget,
        clientX: N.clientX,
        clientY: N.clientY
      });
    },
    onMouseUp: () => {
      u || p && T();
    },
    onContextMenu: () => {
      p && T();
    }
  }, t[12] = u, t[13] = A, t[14] = T, t[15] = p, t[16] = M) : M = t[16];
  const O = M;
  let D;
  return t[17] !== O || t[18] !== p || t[19] !== v ? (D = [p, O, v], t[17] = O, t[18] = p, t[19] = v, t[20] = D) : D = t[20], D;
}
const l8 = "_root_1oiyj_1", r8 = "_fade_1oiyj_22", o8 = "_ripples_1oiyj_30", c8 = "_ripple_1oiyj_30", u8 = "_tapped_1oiyj_47", oc = (...n) => n.filter(Boolean).join(" "), f8 = (n, t) => {
  const i = {
    ...n
  };
  for (const l of Object.keys(t)) {
    const o = n[l], c = t[l];
    i[l] = o ? (u) => {
      o(u), c(u);
    } : c;
  }
  return i;
}, nn = ({
  as: n = "div",
  children: t,
  className: i = "",
  mode: l = "overlay",
  disabled: o = !1,
  ...c
}) => {
  const {
    isApple: u,
    isMaterial: d
  } = Nr(), [p, y] = C.useState({}), [g, v, b] = s8({
    mode: l,
    disabled: o,
    onTap: ({
      target: T,
      clientX: x,
      clientY: A
    }) => {
      if (!d || !T) return;
      const {
        x: _,
        y: E,
        width: M,
        height: O
      } = T.getBoundingClientRect(), D = Math.max(M * 2, O * 2);
      y((N) => ({
        ...N,
        [`${performance.now()}`]: [x - _ - D / 2, A - E - D / 2, D]
      }));
    }
  }), j = l === "opacity", w = f8(c, v);
  return /* @__PURE__ */ h.jsxs(n, {
    ...w,
    disabled: o || void 0,
    className: oc(l8, i, j && oc(...b)),
    children: [t, u && !j && /* @__PURE__ */ h.jsx("div", {
      className: oc(r8, ...b)
    }), d && /* @__PURE__ */ h.jsx("div", {
      className: o8,
      children: Object.entries(p).map(([T, x]) => /* @__PURE__ */ h.jsx("span", {
        className: oc(c8, g && u8),
        style: {
          left: x[0],
          top: x[1],
          width: x[2],
          height: x[2]
        },
        onAnimationEnd: () => {
          g || y((A) => {
            const _ = {
              ...A
            };
            return delete _[T], _;
          });
        }
      }, T))
    })]
  });
}, d8 = "_label_1w5sq_1", h8 = "_accent_1w5sq_6", m8 = "_description_1w5sq_10", m2 = "_caption_1w5sq_14", p8 = (n) => {
  const t = At.c(15), {
    type: i,
    title: l,
    description: o,
    caption: c,
    bold: u
  } = n, d = u ? "medium" : "regular", p = `${d8} ${i === "Accent" ? h8 : ""}`;
  let y;
  t[0] !== l || t[1] !== d ? (y = /* @__PURE__ */ h.jsx(pt, {
    variant: "body",
    weight: d,
    children: l
  }), t[0] = l, t[1] = d, t[2] = y) : y = t[2];
  let g;
  t[3] !== p || t[4] !== y ? (g = /* @__PURE__ */ h.jsx("div", {
    className: p,
    children: y
  }), t[3] = p, t[4] = y, t[5] = g) : g = t[5];
  let v;
  t[6] !== c || t[7] !== o ? (v = o && /* @__PURE__ */ h.jsx("div", {
    className: c ? m8 : m2,
    children: /* @__PURE__ */ h.jsx(pt, {
      variant: c ? "subheadline1" : "subheadline2",
      weight: "regular",
      children: o
    })
  }), t[6] = c, t[7] = o, t[8] = v) : v = t[8];
  let b;
  t[9] !== c ? (b = c && /* @__PURE__ */ h.jsx("div", {
    className: m2,
    children: /* @__PURE__ */ h.jsx(pt, {
      variant: "subheadline2",
      weight: "regular",
      children: c
    })
  }), t[9] = c, t[10] = b) : b = t[10];
  let j;
  return t[11] !== g || t[12] !== v || t[13] !== b ? (j = /* @__PURE__ */ h.jsxs(h.Fragment, {
    children: [g, v, b]
  }), t[11] = g, t[12] = v, t[13] = b, t[14] = j) : j = t[14], j;
}, n3 = "_chevron_en74z_1", a3 = "_dropdown_en74z_8", fp = "_colorpicker_en74z_12", dp = "_picker_en74z_63", y8 = {
  chevron: n3,
  dropdown: a3,
  colorpicker: fp,
  picker: dp
}, p2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  chevron: n3,
  colorpicker: fp,
  default: y8,
  dropdown: a3,
  picker: dp
}, Symbol.toStringTag, { value: "Module" })), g8 = (n) => {
  const t = At.c(21), {
    type: i,
    className: l,
    children: o,
    value: c,
    onChange: u,
    inputRef: d,
    id: p,
    name: y,
    showValue: g
  } = n, v = y === void 0 ? "color" : y, b = g === void 0 ? !0 : g;
  if (i === "Picker") {
    let _;
    return t[0] !== o ? (_ = /* @__PURE__ */ h.jsx("div", {
      className: dp,
      children: /* @__PURE__ */ h.jsx(pt, {
        variant: "body",
        weight: "regular",
        children: o
      })
    }), t[0] = o, t[1] = _) : _ = t[1], _;
  }
  if (i === "ColorPicker") {
    const _ = p || v;
    let E;
    t[2] !== _ || t[3] !== d || t[4] !== v || t[5] !== u || t[6] !== c ? (E = /* @__PURE__ */ h.jsx("input", {
      ref: d,
      type: "color",
      value: c,
      onChange: u,
      name: v,
      id: _
    }), t[2] = _, t[3] = d, t[4] = v, t[5] = u, t[6] = c, t[7] = E) : E = t[7];
    let M;
    t[8] !== _ || t[9] !== b || t[10] !== c ? (M = b && /* @__PURE__ */ h.jsx("label", {
      htmlFor: _,
      children: /* @__PURE__ */ h.jsx(pt, {
        variant: "body",
        weight: "regular",
        children: c
      })
    }), t[8] = _, t[9] = b, t[10] = c, t[11] = M) : M = t[11];
    let O;
    return t[12] !== E || t[13] !== M ? (O = /* @__PURE__ */ h.jsxs("div", {
      className: fp,
      children: [E, M]
    }), t[12] = E, t[13] = M, t[14] = O) : O = t[14], O;
  }
  const j = p2[i.toLowerCase()], w = p2[l];
  let T;
  t[15] !== j || t[16] !== w ? (T = [j, w].filter(Boolean), t[15] = j, t[16] = w, t[17] = T) : T = t[17];
  const x = T.join(" ");
  let A;
  return t[18] !== o || t[19] !== x ? (A = /* @__PURE__ */ h.jsx("div", {
    className: x,
    children: o
  }), t[18] = o, t[19] = x, t[20] = A) : A = t[20], A;
}, v8 = (n) => /* @__PURE__ */ C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ C.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ C.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5ZM15.1016 9.01953C14.7891 8.70711 14.2821 8.70711 13.9697 9.01953L12.001 10.9873L10.0342 9.02051C9.72176 8.70809 9.21574 8.70809 8.90332 9.02051C8.5909 9.33293 8.5909 9.83895 8.90332 10.1514L10.8701 12.1191L9.02051 13.9697C8.70809 14.2821 8.70809 14.7882 9.02051 15.1006C9.33293 15.413 9.83895 15.413 10.1514 15.1006L12.001 13.25L13.8525 15.1016C14.165 15.414 14.672 15.414 14.9844 15.1016C15.2968 14.7891 15.2968 14.2821 14.9844 13.9697L13.1328 12.1182L15.1016 10.1514C15.414 9.83895 15.414 9.33195 15.1016 9.01953Z", fill: "#3D3C3A" }))), b8 = "_root_9aal5_1", x8 = "_input_9aal5_5", S8 = "_inputWithClearButton_9aal5_25", w8 = "_clearButtonIcon_9aal5_29", C8 = "_empty_9aal5_49", T8 = "_icon_9aal5_61", j8 = /* @__PURE__ */ C.forwardRef((n, t) => {
  const i = At.c(24);
  let l, o, c, u, d, p;
  i[0] !== n ? ({
    label: l,
    value: p,
    onChange: o,
    onClear: c,
    ...u
  } = n, d = (_) => {
    o(_.target.value);
  }, i[0] = n, i[1] = l, i[2] = o, i[3] = c, i[4] = u, i[5] = d, i[6] = p) : (l = i[1], o = i[2], c = i[3], u = i[4], d = i[5], p = i[6]);
  const y = d, g = !p && C8;
  let v;
  i[7] !== g ? (v = [b8, g].filter(Boolean), i[7] = g, i[8] = v) : v = i[8];
  const b = v.join(" "), j = `${x8} ${c ? S8 : ""}`, w = !o;
  let T;
  i[9] !== y || i[10] !== l || i[11] !== t || i[12] !== u || i[13] !== j || i[14] !== w || i[15] !== p ? (T = /* @__PURE__ */ h.jsx("input", {
    "aria-label": l,
    onChange: y,
    type: "text",
    className: j,
    placeholder: l,
    value: p,
    readOnly: w,
    ref: t,
    ...u
  }), i[9] = y, i[10] = l, i[11] = t, i[12] = u, i[13] = j, i[14] = w, i[15] = p, i[16] = T) : T = i[16];
  let x;
  i[17] !== l || i[18] !== c ? (x = c && /* @__PURE__ */ h.jsx("button", {
    type: "button",
    className: [T8, w8].filter(Boolean).join(" "),
    onClick: c,
    "aria-label": `Clear ${l}`,
    children: /* @__PURE__ */ h.jsx(v8, {})
  }), i[17] = l, i[18] = c, i[19] = x) : x = i[19];
  let A;
  return i[20] !== b || i[21] !== T || i[22] !== x ? (A = /* @__PURE__ */ h.jsxs(pt, {
    variant: "body",
    weight: "regular",
    className: b,
    children: [T, x]
  }), i[20] = b, i[21] = T, i[22] = x, i[23] = A) : A = i[23], A;
}), y2 = "_root_1aqfj_1";
function A8(n) {
  const t = At.c(15), {
    value: i,
    defaultValue: l,
    onChange: o,
    disabled: c,
    className: u
  } = n, d = l === void 0 ? !1 : l, p = c === void 0 ? !1 : c, y = i !== void 0, [g, v] = C.useState(d), b = y ? i : g;
  let j;
  t[0] !== o ? (j = (N) => {
    o && o(N);
  }, t[0] = o, t[1] = j) : j = t[1];
  const w = j;
  let T;
  t[2] !== b || t[3] !== w || t[4] !== y ? (T = () => {
    if (Sa.HapticFeedback.selectionChanged(), y) {
      w(!b);
      return;
    }
    v((N) => {
      const V = !N;
      return w(V), V;
    });
  }, t[2] = b, t[3] = w, t[4] = y, t[5] = T) : T = t[5];
  const x = T;
  let A;
  t[6] !== p || t[7] !== x ? (A = (N) => {
    N.stopPropagation(), !p && x();
  }, t[6] = p, t[7] = x, t[8] = A) : A = t[8];
  const _ = A, E = u ? `${y2} ${u}` : y2, M = p || void 0, O = p || void 0;
  let D;
  return t[9] !== b || t[10] !== E || t[11] !== _ || t[12] !== M || t[13] !== O ? (D = /* @__PURE__ */ h.jsx("div", {
    className: E,
    "data-state": b,
    "data-disabled": M,
    onClick: _,
    role: "switch",
    "aria-checked": b,
    "aria-disabled": O
  }), t[9] = b, t[10] = E, t[11] = _, t[12] = M, t[13] = O, t[14] = D) : D = t[14], D;
}
const E8 = (n) => {
  const t = At.c(29);
  let i, l, o, c, u, d, p;
  t[0] !== n ? ({
    start: c,
    children: i,
    value: p,
    defaultValue: u,
    onChange: l,
    disabled: d,
    ...o
  } = n, t[0] = n, t[1] = i, t[2] = l, t[3] = o, t[4] = c, t[5] = u, t[6] = d, t[7] = p) : (i = t[1], l = t[2], o = t[3], c = t[4], u = t[5], d = t[6], p = t[7]);
  const y = u === void 0 ? !1 : u, g = d === void 0 ? !1 : d, v = p !== void 0, [b, j] = C.useState(y), w = v ? p : b;
  let T;
  t[8] !== l ? (T = (N) => {
    l && l(N);
  }, t[8] = l, t[9] = T) : T = t[9];
  const x = T;
  let A;
  t[10] !== x || t[11] !== v ? (A = (N) => {
    v || j(N), x(N);
  }, t[10] = x, t[11] = v, t[12] = A) : A = t[12];
  const _ = A;
  let E;
  t[13] !== w || t[14] !== g || t[15] !== x || t[16] !== _ || t[17] !== v ? (E = () => {
    if (!g) {
      if (Sa.HapticFeedback.selectionChanged(), v) {
        _(!w);
        return;
      }
      j((N) => {
        const V = !N;
        return x(V), V;
      });
    }
  }, t[13] = w, t[14] = g, t[15] = x, t[16] = _, t[17] = v, t[18] = E) : E = t[18];
  const M = E;
  let O;
  t[19] !== w || t[20] !== g || t[21] !== _ ? (O = /* @__PURE__ */ h.jsx(ga.Part, {
    type: "Switch",
    children: /* @__PURE__ */ h.jsx(A8, {
      value: w,
      onChange: _,
      disabled: g
    })
  }), t[19] = w, t[20] = g, t[21] = _, t[22] = O) : O = t[22];
  let D;
  return t[23] !== i || t[24] !== M || t[25] !== o || t[26] !== c || t[27] !== O ? (D = /* @__PURE__ */ h.jsx(ga, {
    start: c,
    end: O,
    onClick: M,
    ...o,
    children: i
  }), t[23] = i, t[24] = M, t[25] = o, t[26] = c, t[27] = O, t[28] = D) : D = t[28], D;
}, g2 = "_root_146xt_10", M8 = "_start_146xt_32", _8 = "_image_146xt_37", R8 = "_icon_146xt_45", D8 = "_body_146xt_57", N8 = "_end_146xt_65", O8 = "_caption_146xt_76", L8 = "_label_146xt_80", $8 = (n) => {
  const t = At.c(28);
  let i, l, o, c, u, d, p;
  t[0] !== n ? ({
    as: d,
    start: u,
    children: i,
    end: l,
    onClick: o,
    tappable: p,
    ...c
  } = n, t[0] = n, t[1] = i, t[2] = l, t[3] = o, t[4] = c, t[5] = u, t[6] = d, t[7] = p) : (i = t[1], l = t[2], o = t[3], c = t[4], u = t[5], d = t[6], p = t[7]);
  const y = d === void 0 ? "div" : d, g = p ?? (o != null || y !== "div");
  let v;
  t[8] !== u ? (v = u && /* @__PURE__ */ h.jsx("div", {
    className: M8,
    children: u
  }), t[8] = u, t[9] = v) : v = t[9];
  let b;
  t[10] !== i ? (b = /* @__PURE__ */ h.jsx("div", {
    className: D8,
    children: i
  }), t[10] = i, t[11] = b) : b = t[11];
  let j;
  t[12] !== l ? (j = l && /* @__PURE__ */ h.jsx("div", {
    className: N8,
    children: l
  }), t[12] = l, t[13] = j) : j = t[13];
  let w;
  t[14] !== v || t[15] !== b || t[16] !== j ? (w = /* @__PURE__ */ h.jsxs(h.Fragment, {
    children: [v, b, j]
  }), t[14] = v, t[15] = b, t[16] = j, t[17] = w) : w = t[17];
  const T = w;
  if (!g) {
    let A;
    return t[18] !== y || t[19] !== T || t[20] !== o || t[21] !== c ? (A = /* @__PURE__ */ h.jsx(y, {
      className: g2,
      onClick: o,
      ...c,
      children: T
    }), t[18] = y, t[19] = T, t[20] = o, t[21] = c, t[22] = A) : A = t[22], A;
  }
  let x;
  return t[23] !== y || t[24] !== T || t[25] !== o || t[26] !== c ? (x = /* @__PURE__ */ h.jsx(nn, {
    as: y,
    className: g2,
    onClick: o,
    ...c,
    children: T
  }), t[23] = y, t[24] = T, t[25] = o, t[26] = c, t[27] = x) : x = t[27], x;
}, k8 = (n) => {
  const t = At.c(6), {
    type: i,
    src: l,
    iconType: o
  } = n, c = l === void 0 ? null : l, u = o === void 0 ? null : o;
  let d;
  t: switch (i) {
    case "Image": {
      let y;
      t[0] !== c ? (y = /* @__PURE__ */ h.jsx("img", {
        src: c,
        alt: "",
        className: _8
      }), t[0] = c, t[1] = y) : y = t[1], d = y;
      break t;
    }
    case "Icon": {
      let y;
      t[2] !== u ? (y = /* @__PURE__ */ h.jsx("div", {
        className: R8,
        children: u
      }), t[2] = u, t[3] = y) : y = t[3], d = y;
      break t;
    }
    default:
      d = null;
  }
  let p;
  return t[4] !== d ? (p = /* @__PURE__ */ h.jsx(h.Fragment, {
    children: d
  }), t[4] = d, t[5] = p) : p = t[5], p;
}, B8 = (n) => {
  const t = At.c(7), {
    label: i,
    caption: l
  } = n;
  let o;
  t[0] !== i ? (o = /* @__PURE__ */ h.jsx("div", {
    className: L8,
    children: /* @__PURE__ */ h.jsx(pt, {
      variant: "body",
      weight: "regular",
      children: i
    })
  }), t[0] = i, t[1] = o) : o = t[1];
  let c;
  t[2] !== l ? (c = l && /* @__PURE__ */ h.jsx("div", {
    className: O8,
    children: /* @__PURE__ */ h.jsx(pt, {
      variant: "subheadline2",
      weight: "regular",
      children: l
    })
  }), t[2] = l, t[3] = c) : c = t[3];
  let u;
  return t[4] !== o || t[5] !== c ? (u = /* @__PURE__ */ h.jsxs(h.Fragment, {
    children: [o, c]
  }), t[4] = o, t[5] = c, t[6] = u) : u = t[6], u;
}, ga = Object.assign($8, {
  Start: k8,
  End: B8,
  Part: g8,
  Text: p8,
  Editable: j8,
  Switch: E8
});
tu.section;
Im[16];
function V8(n, t, i) {
  const l = At.c(8);
  let o;
  l[0] !== i ? (o = {}, l[0] = i, l[1] = o) : o = l[1];
  const {
    enabled: c
  } = o, u = c === void 0 ? !0 : c, d = C.useRef(t);
  let p;
  l[2] !== t ? (p = () => {
    d.current = t;
  }, l[2] = t, l[3] = p) : p = l[3], C.useEffect(p);
  let y, g;
  l[4] !== u || l[5] !== n ? (y = () => {
    if (!u)
      return;
    const v = n.current;
    if (!v)
      return;
    const b = new ResizeObserver((j) => {
      d.current(j[0]);
    });
    return b.observe(v), () => b.disconnect();
  }, g = [n, u], l[4] = u, l[5] = n, l[6] = y, l[7] = g) : (y = l[6], g = l[7]), C.useEffect(y, g);
}
const Nn = (n, t, i) => Math.min(Math.max(n, t), i), z8 = (n, t) => {
  if (n === t) return !0;
  if (!n || !t) return !1;
  const i = Object.keys(n);
  if (i.length !== Object.keys(t).length) return !1;
  for (const l of i) if (n[l] !== t[l]) return !1;
  return !0;
};
function U8(n) {
  const t = At.c(32), {
    isOpen: i,
    triggerRef: l,
    contentRef: o,
    initialPosition: c,
    calculate: u,
    deps: d,
    equals: p
  } = n;
  let y;
  t[0] !== d ? (y = d === void 0 ? [] : d, t[0] = d, t[1] = y) : y = t[1];
  const g = y, v = p === void 0 ? z8 : p, [b, j] = C.useState(c), [w, T] = C.useState(!1), x = C.useRef(null);
  let A;
  t[2] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (A = () => {
    T(!1), x.current = null;
  }, t[2] = A) : A = t[2];
  const _ = A;
  let E;
  t[3] !== u || t[4] !== o || t[5] !== i || t[6] !== w || t[7] !== l ? (E = () => {
    if (!i || w || !l.current || !o.current)
      return;
    const V = l.current.getBoundingClientRect(), {
      width: H,
      height: B
    } = o.current.getBoundingClientRect();
    x.current = {
      width: H,
      height: B
    }, j(u(V, {
      width: H,
      height: B
    })), T(!0);
  }, t[3] = u, t[4] = o, t[5] = i, t[6] = w, t[7] = l, t[8] = E) : E = t[8];
  let M;
  t[9] !== u || t[10] !== o || t[11] !== g || t[12] !== i || t[13] !== w || t[14] !== l ? (M = [i, w, l, o, u, ...g], t[9] = u, t[10] = o, t[11] = g, t[12] = i, t[13] = w, t[14] = l, t[15] = M) : M = t[15], C.useLayoutEffect(E, M);
  let O;
  t[16] !== u || t[17] !== v || t[18] !== i || t[19] !== w || t[20] !== l ? (O = () => {
    if (!i || !w)
      return;
    let V = null;
    const H = () => {
      if (V = null, !l.current || !x.current)
        return;
      const U = l.current.getBoundingClientRect(), F = u(U, x.current);
      j((Y) => v(Y, F) ? Y : F);
    }, B = () => {
      V === null && (V = requestAnimationFrame(H));
    };
    return window.addEventListener("scroll", B, !0), window.addEventListener("resize", B), () => {
      V !== null && cancelAnimationFrame(V), window.removeEventListener("scroll", B, !0), window.removeEventListener("resize", B);
    };
  }, t[16] = u, t[17] = v, t[18] = i, t[19] = w, t[20] = l, t[21] = O) : O = t[21];
  let D;
  t[22] !== u || t[23] !== g || t[24] !== v || t[25] !== i || t[26] !== w || t[27] !== l ? (D = [i, w, l, u, v, ...g], t[22] = u, t[23] = g, t[24] = v, t[25] = i, t[26] = w, t[27] = l, t[28] = D) : D = t[28], C.useEffect(O, D);
  let N;
  return t[29] !== w || t[30] !== b ? (N = {
    position: b,
    isPositioned: w,
    resetPosition: _
  }, t[29] = w, t[30] = b, t[31] = N) : N = t[31], N;
}
const H8 = (n, t, ...i) => {
  const l = At.c(6), o = i, c = C.useRef(t);
  let u;
  l[0] !== t ? (u = () => {
    c.current = t;
  }, l[0] = t, l[1] = u) : u = l[1], C.useEffect(u);
  let d, p;
  l[2] !== n || l[3] !== o ? (d = () => {
    if (!n)
      return;
    const y = (g) => {
      o.every((v) => !v.current || !v.current.contains(g.target)) && c.current();
    };
    return document.addEventListener("mousedown", y), () => document.removeEventListener("mousedown", y);
  }, p = [n, ...o], l[2] = n, l[3] = o, l[4] = d, l[5] = p) : (d = l[4], p = l[5]), C.useEffect(d, p);
}, q8 = /* @__PURE__ */ C.createContext({
  colorScheme: "light",
  setColorScheme: () => {
  },
  toggleColorScheme: () => {
  }
}), Y8 = ["light", "dark"], Yh = (n) => Y8.includes(n), Ph = () => {
  if (typeof window > "u" || typeof document > "u")
    return null;
  const n = window.getComputedStyle(document.documentElement).getPropertyValue("--tg-color-scheme").trim();
  return Yh(n) ? n : null;
}, i3 = () => typeof window > "u" || !window.matchMedia ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light", P8 = () => Ph() ?? i3(), G8 = typeof window > "u" ? C.useEffect : C.useLayoutEffect, X8 = (n) => {
  const t = At.c(20), {
    children: i,
    defaultColorScheme: l,
    onColorSchemeChange: o
  } = n, [c, u] = C.useState(P8);
  let d;
  t[0] !== l ? (d = () => Yh(l) ? l : null, t[0] = l, t[1] = d) : d = t[1];
  const [p, y] = C.useState(d), g = p ?? c;
  let v;
  t[2] !== g || t[3] !== o ? (v = (D) => {
    const N = typeof D == "function" ? D(g) : D;
    Yh(N) && (y(N), o?.(N));
  }, t[2] = g, t[3] = o, t[4] = v) : v = t[4];
  const b = v;
  let j;
  t[5] !== g || t[6] !== b ? (j = () => {
    b(g === "dark" ? "light" : "dark");
  }, t[5] = g, t[6] = b, t[7] = j) : j = t[7];
  const w = j;
  let T, x;
  t[8] !== g ? (T = () => {
    document.documentElement.dataset.colorScheme = g, document.body.dataset.colorScheme = g;
  }, x = [g], t[8] = g, t[9] = T, t[10] = x) : (T = t[9], x = t[10]), G8(T, x);
  let A, _;
  t[11] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (A = () => {
    const D = () => {
      const H = Ph();
      if (H) {
        u(H);
        return;
      }
      u(i3());
    }, N = (H) => {
      Ph() || u(H.matches ? "dark" : "light");
    };
    D();
    const V = window.matchMedia("(prefers-color-scheme: dark)");
    return Sa.onEvent("themeChanged", D), V.addEventListener("change", N), () => {
      Sa.offEvent("themeChanged", D), V.removeEventListener("change", N);
    };
  }, _ = [], t[11] = A, t[12] = _) : (A = t[11], _ = t[12]), C.useEffect(A, _);
  let E;
  t[13] !== g || t[14] !== b || t[15] !== w ? (E = {
    colorScheme: g,
    setColorScheme: b,
    toggleColorScheme: w
  }, t[13] = g, t[14] = b, t[15] = w, t[16] = E) : E = t[16];
  const M = E;
  let O;
  return t[17] !== i || t[18] !== M ? (O = /* @__PURE__ */ h.jsx(q8.Provider, {
    value: M,
    children: i
  }), t[17] = i, t[18] = M, t[19] = O) : O = t[19], O;
}, K8 = /* @__PURE__ */ C.forwardRef((n, t) => {
  const i = At.c(11);
  let l, o, c, u;
  if (i[0] !== n) {
    const {
      to: y,
      onClick: g,
      children: v,
      ...b
    } = n;
    u = y, l = v, o = b, c = (j) => {
      g && g(j), j.defaultPrevented;
    }, i[0] = n, i[1] = l, i[2] = o, i[3] = c, i[4] = u;
  } else
    l = i[1], o = i[2], c = i[3], u = i[4];
  const d = c;
  let p;
  return i[5] !== l || i[6] !== d || i[7] !== o || i[8] !== t || i[9] !== u ? (p = /* @__PURE__ */ h.jsx(pE, {
    ref: t,
    href: u,
    onClick: d,
    ...o,
    children: l
  }), i[5] = l, i[6] = d, i[7] = o, i[8] = t, i[9] = u, i[10] = p) : p = i[10], p;
});
K8.displayName = "TransitionLink";
const s3 = ({
  children: n
}) => n;
s3.isModalPage = !0;
s3.propTypes = {
  id: $n.string.isRequired,
  children: $n.node
};
tu.modal;
Im[16];
const l3 = (n) => {
  const t = At.c(2), {
    children: i
  } = n;
  let l;
  return t[0] !== i ? (l = /* @__PURE__ */ h.jsx(kj, {
    features: gA,
    strict: !0,
    children: i
  }), t[0] = i, t[1] = l) : l = t[1], l;
}, {
  setHeaderColor: Z8,
  setBackgroundColor: Q8
} = Sa, ei = (n) => {
  const t = At.c(18), {
    children: i,
    mode: l,
    headerColor: o,
    backgroundColor: c,
    expandOnMount: u
  } = n, d = l === void 0 ? "secondary" : l, {
    inDetailPane: p,
    setPaneBackground: y
  } = YE();
  let g;
  t[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (g = {
    primary: "bg_color",
    secondary: "secondary_bg_color"
  }, t[0] = g) : g = t[0];
  const v = g;
  let b;
  t[1] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (b = {
    primary: "--tg-theme-bg-color",
    secondary: "--tg-theme-secondary-bg-color"
  }, t[1] = b) : b = t[1];
  const j = b, w = o ? `#${o}` : v[d], T = c ? `#${c}` : v[d], x = c ? `#${c}` : `var(${j[d]})`;
  let A, _;
  t[2] !== u ? (A = () => {
    u && Sa.expand();
  }, _ = [u], t[2] = u, t[3] = A, t[4] = _) : (A = t[3], _ = t[4]), C.useEffect(A, _);
  let E, M;
  t[5] !== x || t[6] !== p || t[7] !== T || t[8] !== w ? (E = () => {
    p || (Sa.initData ? (Q8(T), Z8(w)) : document.body.style.backgroundColor = x, document.body.style.setProperty("--page-background", x));
  }, M = [T, w, x, p], t[5] = x, t[6] = p, t[7] = T, t[8] = w, t[9] = E, t[10] = M) : (E = t[9], M = t[10]), C.useEffect(E, M);
  let O, D;
  t[11] !== x || t[12] !== p || t[13] !== y ? (O = () => {
    !p || !y || y(x);
  }, D = [p, y, x], t[11] = x, t[12] = p, t[13] = y, t[14] = O, t[15] = D) : (O = t[14], D = t[15]), C.useEffect(O, D);
  let N;
  return t[16] !== i ? (N = /* @__PURE__ */ h.jsx(h.Fragment, {
    children: i
  }), t[16] = i, t[17] = N) : N = t[17], N;
};
ei.propTypes = {
  children: $n.node,
  mode: $n.oneOf(["primary", "secondary"]),
  headerColor: $n.string,
  backgroundColor: $n.string,
  expandOnMount: $n.bool
};
const F8 = "_root_125s3_1", I8 = "_card_125s3_16", J8 = "_container_125s3_22", th = "flex justify-between gap-compact px-content py-10 text-section";
function v2(n) {
  const t = At.c(27);
  let i, l, o, c;
  switch (t[0] !== n ? ({
    type: o,
    title: l,
    value: c,
    ...i
  } = n, t[0] = n, t[1] = i, t[2] = l, t[3] = o, t[4] = c) : (i = t[1], l = t[2], o = t[3], c = t[4]), o) {
    case "Headline": {
      let u;
      t[5] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (u = WE(th, "text-foreground"), t[5] = u) : u = t[5];
      let d;
      t[6] !== l ? (d = /* @__PURE__ */ h.jsx(pt, {
        variant: "title3",
        weight: "bold",
        children: l
      }), t[6] = l, t[7] = d) : d = t[7];
      let p;
      t[8] !== c ? (p = c && /* @__PURE__ */ h.jsx(pt, {
        variant: "title3",
        weight: "bold",
        children: c
      }), t[8] = c, t[9] = p) : p = t[9];
      let y;
      return t[10] !== i || t[11] !== d || t[12] !== p ? (y = /* @__PURE__ */ h.jsxs("div", {
        className: u,
        ...i,
        children: [d, p]
      }), t[10] = i, t[11] = d, t[12] = p, t[13] = y) : y = t[13], y;
    }
    case "Footer": {
      let u;
      t[14] !== l ? (u = /* @__PURE__ */ h.jsx(pt, {
        variant: "footnote",
        children: l
      }), t[14] = l, t[15] = u) : u = t[15];
      let d;
      return t[16] !== i || t[17] !== u ? (d = /* @__PURE__ */ h.jsx("div", {
        className: th,
        ...i,
        children: u
      }), t[16] = i, t[17] = u, t[18] = d) : d = t[18], d;
    }
    default: {
      let u;
      t[19] !== l ? (u = /* @__PURE__ */ h.jsx(pt, {
        variant: "body",
        weight: "semibold",
        children: l
      }), t[19] = l, t[20] = u) : u = t[20];
      let d;
      t[21] !== c ? (d = c && /* @__PURE__ */ h.jsx(pt, {
        variant: "footnote",
        children: c
      }), t[21] = c, t[22] = d) : d = t[22];
      let p;
      return t[23] !== i || t[24] !== u || t[25] !== d ? (p = /* @__PURE__ */ h.jsxs("div", {
        className: th,
        ...i,
        children: [u, d]
      }), t[23] = i, t[24] = u, t[25] = d, t[26] = p) : p = t[26], p;
    }
  }
}
const W8 = tu.section, tM = Im[16], eM = 0.6, vt = (n) => {
  const t = At.c(6);
  let i, l;
  t[0] !== n ? ({
    children: i,
    ...l
  } = n, t[0] = n, t[1] = i, t[2] = l) : (i = t[1], l = t[2]);
  let o;
  return t[3] !== i || t[4] !== l ? (o = /* @__PURE__ */ h.jsx("section", {
    className: F8,
    ...l,
    children: i
  }), t[3] = i, t[4] = l, t[5] = o) : o = t[5], o;
}, nM = (n) => {
  const t = At.c(21);
  let i, l, o, c;
  t[0] !== n ? ({
    children: i,
    header: o,
    description: l,
    ...c
  } = n, t[0] = n, t[1] = i, t[2] = l, t[3] = o, t[4] = c) : (i = t[1], l = t[2], o = t[3], c = t[4]);
  const {
    isApple: u
  } = Nr(), d = C.useRef(null), p = C.useRef(null), y = u ? W8 : tM;
  let g;
  t[5] !== y ? (g = {
    radius: y,
    smoothing: eM
  }, t[5] = y, t[6] = g) : g = t[6];
  let v;
  t[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = {
    autoEffects: !1
  }, t[7] = v) : v = t[7], dS(u ? p : d, g, v);
  let b;
  t[8] !== o ? (b = o && /* @__PURE__ */ h.jsx(v2, {
    title: o
  }), t[8] = o, t[9] = b) : b = t[9];
  let j;
  t[10] !== i ? (j = /* @__PURE__ */ h.jsx("div", {
    ref: p,
    className: J8,
    children: i
  }), t[10] = i, t[11] = j) : j = t[11];
  let w;
  t[12] !== b || t[13] !== j ? (w = /* @__PURE__ */ h.jsxs("div", {
    ref: d,
    className: I8,
    children: [b, j]
  }), t[12] = b, t[13] = j, t[14] = w) : w = t[14];
  let T;
  t[15] !== l ? (T = l && /* @__PURE__ */ h.jsx(v2, {
    type: "Footer",
    title: l
  }), t[15] = l, t[16] = T) : T = t[16];
  let x;
  return t[17] !== c || t[18] !== w || t[19] !== T ? (x = /* @__PURE__ */ h.jsxs("section", {
    ...c,
    children: [w, T]
  }), t[17] = c, t[18] = w, t[19] = T, t[20] = x) : x = t[20], x;
};
vt.Item = nM;
const b2 = 1e3;
function aM(n, t, i = "vertical") {
  const l = n / t;
  if (Math.abs(l) >= Math.PI / 2) return null;
  const o = (t * Math.sin(l) - n).toFixed(2), c = (t * (Math.cos(l) - 1)).toFixed(2), u = (l * 180 / Math.PI).toFixed(2);
  return i === "horizontal" ? `perspective(${b2}px) translateX(${o}px) translateZ(${c}px) rotateY(${u}deg)` : `perspective(${b2}px) translateY(${o}px) translateZ(${c}px) rotateX(${-u}deg)`;
}
const iM = "_root_cnxqv_1", sM = "_icon_cnxqv_17", lM = "_content_cnxqv_42", rM = "_title_cnxqv_55", oM = "_description_cnxqv_56", cM = "_action_cnxqv_61", uM = "_link_cnxqv_61", fM = "_host_cnxqv_92", dM = "_host_top_cnxqv_105", hM = "_host_bottom_cnxqv_109", mM = "_item_cnxqv_114", pM = (n) => {
  const t = At.c(19), {
    icon: i,
    title: l,
    description: o,
    link: c,
    action: u
  } = n, d = !!o;
  let p;
  t[0] !== i ? (p = i ? /* @__PURE__ */ h.jsx("div", {
    className: sM,
    "aria-hidden": "true",
    children: i
  }) : null, t[0] = i, t[1] = p) : p = t[1];
  const y = d ? "semibold" : void 0;
  let g;
  t[2] !== y || t[3] !== l ? (g = /* @__PURE__ */ h.jsx(pt, {
    as: "p",
    className: rM,
    variant: "subheadline2",
    weight: y,
    children: l
  }), t[2] = y, t[3] = l, t[4] = g) : g = t[4];
  let v;
  t[5] !== o ? (v = o ? /* @__PURE__ */ h.jsx(pt, {
    as: "p",
    className: oM,
    variant: "subheadline2",
    children: o
  }) : null, t[5] = o, t[6] = v) : v = t[6];
  let b;
  t[7] !== c ? (b = c ? /* @__PURE__ */ h.jsx("button", {
    type: "button",
    className: uM,
    onClick: c.onClick,
    children: /* @__PURE__ */ h.jsx(pt, {
      as: "span",
      variant: "subheadline2",
      children: c.label
    })
  }) : null, t[7] = c, t[8] = b) : b = t[8];
  let j;
  t[9] !== g || t[10] !== v || t[11] !== b ? (j = /* @__PURE__ */ h.jsxs("div", {
    className: lM,
    children: [g, v, b]
  }), t[9] = g, t[10] = v, t[11] = b, t[12] = j) : j = t[12];
  let w;
  t[13] !== u ? (w = u ? /* @__PURE__ */ h.jsx("button", {
    type: "button",
    className: cM,
    onClick: u.onClick,
    children: /* @__PURE__ */ h.jsx(pt, {
      as: "span",
      variant: "body",
      children: u.label
    })
  }) : null, t[13] = u, t[14] = w) : w = t[14];
  let T;
  return t[15] !== p || t[16] !== j || t[17] !== w ? (T = /* @__PURE__ */ h.jsxs("div", {
    className: iM,
    role: "status",
    "aria-live": "polite",
    children: [p, j, w]
  }), t[15] = p, t[16] = j, t[17] = w, t[18] = T) : T = t[18], T;
};
$n.shape({
  label: $n.node.isRequired,
  onClick: $n.func
});
const yM = 4e3, gM = 100, vM = 500, bM = (n) => {
  if (n)
    try {
      Sa.HapticFeedback?.notificationOccurred(n);
    } catch {
    }
}, xM = (n) => {
  const t = At.c(45), {
    item: i,
    onDismiss: l
  } = n, {
    id: o,
    icon: c,
    title: u,
    description: d,
    link: p,
    action: y,
    position: g,
    duration: v,
    type: b
  } = i, j = g === void 0 ? "bottom" : g, w = v === void 0 ? yM : v, T = bA(), [x, A] = C.useState(!1), [_, E] = C.useState(0);
  let M;
  t[0] !== o || t[1] !== l ? (M = () => l(o), t[0] = o, t[1] = l, t[2] = M) : M = t[2];
  const O = M;
  let D, N;
  t[3] !== b ? (D = () => {
    bM(b);
  }, N = [b], t[3] = b, t[4] = D, t[5] = N) : (D = t[4], N = t[5]), C.useEffect(D, N);
  let V, H;
  t[6] !== O || t[7] !== w || t[8] !== x ? (V = () => {
    if (!w || x)
      return;
    const nt = setTimeout(O, w);
    return () => clearTimeout(nt);
  }, H = [w, x, O], t[6] = O, t[7] = w, t[8] = x, t[9] = V, t[10] = H) : (V = t[9], H = t[10]), C.useEffect(V, H);
  const B = j === "top" ? -32 : 32, U = b === "error";
  let F;
  t[11] !== T || t[12] !== B ? (F = T ? {
    opacity: 0
  } : {
    opacity: 0,
    y: B,
    scale: 0.96
  }, t[11] = T, t[12] = B, t[13] = F) : F = t[13];
  const Y = F;
  let st;
  t[14] !== U || t[15] !== T ? (st = T ? {
    opacity: 1
  } : {
    opacity: 1,
    y: 0,
    scale: 1,
    x: U ? [0, -10, 10, -7, 7, -3, 3, 0] : 0,
    transition: {
      default: rr.SNACKBAR,
      ...U && {
        x: {
          duration: 0.45,
          ease: "easeOut",
          delay: 0.18
        }
      }
    }
  }, t[14] = U, t[15] = T, t[16] = st) : st = t[16];
  const I = st;
  let $;
  t[17] !== _ || t[18] !== T || t[19] !== B ? ($ = T ? {
    opacity: 0,
    transition: {
      duration: 0.15
    }
  } : {
    opacity: 0,
    x: _ * 400,
    y: _ === 0 ? B : 0,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }, t[17] = _, t[18] = T, t[19] = B, t[20] = $) : $ = t[20];
  const X = $;
  let J;
  t[21] !== O ? (J = (nt, dt) => {
    A(!1);
    const ft = dt.offset.x, yt = dt.velocity.x;
    (Math.abs(ft) > gM || Math.abs(yt) > vM) && (E(ft >= 0 ? 1 : -1), O());
  }, t[21] = O, t[22] = J) : J = t[22];
  const tt = J;
  let ut;
  t[23] !== O ? (ut = (nt) => {
    if (nt)
      return {
        ...nt,
        onClick: () => {
          nt.onClick?.(), O();
        }
      };
  }, t[23] = O, t[24] = ut) : ut = t[24];
  const L = ut, q = T ? !1 : "x";
  let G;
  t[25] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (G = () => A(!0), t[25] = G) : G = t[25];
  let et;
  t[26] !== p || t[27] !== L ? (et = L(p), t[26] = p, t[27] = L, t[28] = et) : et = t[28];
  let ot;
  t[29] !== y || t[30] !== L ? (ot = L(y), t[29] = y, t[30] = L, t[31] = ot) : ot = t[31];
  let ct;
  t[32] !== d || t[33] !== c || t[34] !== et || t[35] !== ot || t[36] !== u ? (ct = /* @__PURE__ */ h.jsx(pM, {
    icon: c,
    title: u,
    description: d,
    link: et,
    action: ot
  }), t[32] = d, t[33] = c, t[34] = et, t[35] = ot, t[36] = u, t[37] = ct) : ct = t[37];
  let ht;
  return t[38] !== I || t[39] !== X || t[40] !== tt || t[41] !== Y || t[42] !== q || t[43] !== ct ? (ht = /* @__PURE__ */ h.jsx(xa, {
    className: mM,
    initial: Y,
    animate: I,
    exit: X,
    layout: !0,
    drag: q,
    dragSnapToOrigin: !0,
    dragElastic: 0.6,
    dragMomentum: !1,
    onDragStart: G,
    onDragEnd: tt,
    children: ct
  }), t[38] = I, t[39] = X, t[40] = tt, t[41] = Y, t[42] = q, t[43] = ct, t[44] = ht) : ht = t[44], ht;
}, r3 = {
  top: dM,
  bottom: hM
}, SM = Object.keys(r3), wM = (n) => {
  const t = At.c(5), {
    snackbars: i,
    onDismiss: l
  } = n;
  let o;
  t[0] !== l || t[1] !== i ? (o = SM.map((u) => {
    const d = i.filter((p) => (p.position ?? "bottom") === u);
    return /* @__PURE__ */ h.jsx("div", {
      className: `${fM} ${r3[u]}`,
      children: /* @__PURE__ */ h.jsx(Gs, {
        initial: !1,
        children: d.map((p) => /* @__PURE__ */ h.jsx(xM, {
          item: p,
          onDismiss: l
        }, p.id))
      })
    }, u);
  }), t[0] = l, t[1] = i, t[2] = o) : o = t[2];
  let c;
  return t[3] !== o ? (c = /* @__PURE__ */ Dr.createPortal(/* @__PURE__ */ h.jsx(h.Fragment, {
    children: o
  }), document.body), t[3] = o, t[4] = c) : c = t[4], c;
}, o3 = /* @__PURE__ */ C.createContext(null), CM = () => {
  const n = C.useContext(o3);
  if (!n)
    throw new Error("useSnackbar must be used inside <SnackbarProvider>");
  return n;
}, c3 = (n) => {
  const t = At.c(9), {
    children: i
  } = n;
  let l;
  t[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (l = [], t[0] = l) : l = t[0];
  const [o, c] = C.useState(l), u = C.useRef(0);
  let d;
  t[1] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (d = (w) => {
    c((T) => T.filter((x) => x.id !== w));
  }, t[1] = d) : d = t[1];
  const p = d;
  let y;
  t[2] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (y = (w) => {
    u.current = u.current + 1;
    const T = u.current;
    return c((x) => [...x, {
      id: T,
      ...w
    }]), T;
  }, t[2] = y) : y = t[2];
  const g = y;
  let v;
  t[3] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = {
    show: g,
    dismiss: p
  }, t[3] = v) : v = t[3];
  let b;
  t[4] !== o ? (b = /* @__PURE__ */ h.jsx(wM, {
    snackbars: o,
    onDismiss: p
  }), t[4] = o, t[5] = b) : b = t[5];
  let j;
  return t[6] !== i || t[7] !== b ? (j = /* @__PURE__ */ h.jsxs(o3.Provider, {
    value: v,
    children: [i, b]
  }), t[6] = i, t[7] = b, t[8] = j) : j = t[8], j;
}, TM = (n) => /* @__PURE__ */ C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ C.createElement("g", { id: "24_icon-fill/loader" }, /* @__PURE__ */ C.createElement("path", { id: "Vector", d: "M12 3.02148C16.9704 3.02148 20.9997 7.07957 21 12.0859C21 17.0925 16.9706 21.1514 12 21.1514C7.02944 21.1514 3 17.0925 3 12.0859C3.00026 11.5299 3.44787 11.0791 4 11.0791C4.55213 11.0791 4.99974 11.5299 5 12.0859C5 15.9799 8.13401 19.1367 12 19.1367C15.866 19.1367 19 15.9799 19 12.0859C18.9997 8.19215 15.8658 5.03613 12 5.03613C9.64439 5.03613 7.56033 6.20674 6.29004 8.00684C5.97018 8.46016 5.34566 8.56708 4.89551 8.24512C4.44533 7.92286 4.33924 7.29328 4.65918 6.83984C6.28848 4.53074 8.96935 3.02148 12 3.02148Z", fill: "#3D3C3A" }))), jM = "_centered_1ma1e_1", AM = "_spinner_1ma1e_8", eu = (n) => {
  const t = At.c(15);
  let i, l, o, c;
  t[0] !== n ? ({
    centered: i,
    className: l,
    size: c,
    ...o
  } = n, t[0] = n, t[1] = i, t[2] = l, t[3] = o, t[4] = c) : (i = t[1], l = t[2], o = t[3], c = t[4]);
  let u;
  t[5] !== l ? (u = [AM, l].filter(Boolean), t[5] = l, t[6] = u) : u = t[6];
  const d = u.join(" ");
  let p;
  t[7] !== c ? (p = c ? {
    width: c,
    height: c
  } : void 0, t[7] = c, t[8] = p) : p = t[8];
  const y = p;
  let g;
  t[9] !== d || t[10] !== o || t[11] !== y ? (g = /* @__PURE__ */ h.jsx(TM, {
    ...o,
    className: d,
    style: y
  }), t[9] = d, t[10] = o, t[11] = y, t[12] = g) : g = t[12];
  const v = g;
  if (i) {
    let b;
    return t[13] !== v ? (b = /* @__PURE__ */ h.jsx("div", {
      className: jM,
      children: v
    }), t[13] = v, t[14] = b) : b = t[14], b;
  }
  return v;
}, EM = "_root_warzp_1", MM = "_gradient_warzp_71", _M = "_clipPathContainer_warzp_113", RM = "_tab_1mynw_1", DM = "_icon_1mynw_37", NM = "_active_1mynw_62", u3 = (n) => {
  const t = At.c(21);
  let i, l, o, c, u, d;
  t[0] !== n ? ({
    isActive: l,
    onClick: c,
    label: o,
    icon: i,
    className: d,
    ...u
  } = n, t[0] = n, t[1] = i, t[2] = l, t[3] = o, t[4] = c, t[5] = u, t[6] = d) : (i = t[1], l = t[2], o = t[3], c = t[4], u = t[5], d = t[6]);
  const p = d === void 0 ? "" : d;
  let y;
  t[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (y = {
    type: "spring",
    stiffness: 800,
    damping: 50
  }, t[7] = y) : y = t[7];
  const g = `${RM} ${l ? NM : ""} ${p}`;
  let v;
  t[8] !== g ? (v = g.trim(), t[8] = g, t[9] = v) : v = t[9];
  let b;
  t[10] !== i ? (b = /* @__PURE__ */ h.jsx(xa, {
    layout: !0,
    className: DM,
    children: i
  }), t[10] = i, t[11] = b) : b = t[11];
  let j;
  t[12] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (j = {
    display: "inline-block"
  }, t[12] = j) : j = t[12];
  let w;
  t[13] !== o ? (w = /* @__PURE__ */ h.jsx(CT, {
    layout: !0,
    style: j,
    children: o
  }), t[13] = o, t[14] = w) : w = t[14];
  let T;
  return t[15] !== c || t[16] !== u || t[17] !== v || t[18] !== b || t[19] !== w ? (T = /* @__PURE__ */ h.jsxs(xa, {
    layout: !0,
    transition: y,
    ...u,
    className: v,
    onClick: c,
    children: [b, w]
  }), t[15] = c, t[16] = u, t[17] = v, t[18] = b, t[19] = w, t[20] = T) : T = t[20], T;
};
function OM({
  tabsLength: n,
  activeIndex: t,
  onSnapToSame: i,
  onSnapToNew: l,
  spring: o
}) {
  const c = C.useRef(null), [u, d] = C.useState(!1), [p, y] = C.useState(null), g = C.useRef(null), v = C.useRef(!1), b = C.useRef(null), j = C.useRef(0), w = 6, T = 100 / n, x = `calc(${T}% + 7.33px - 4px)`, A = `calc(${T * t}% - ${3.67 * t}px)`, _ = A, E = `calc(100% - (${A} + ${x}) - 2.33px * ${t})`, M = u && p != null ? `inset(0 ${100 - (p + T)}% 0 ${p}% round 100px)` : `inset(0 ${E} 0 ${_} round 100px)`, O = u ? {
    clipPath: {
      duration: 0
    }
  } : {
    clipPath: o
  }, D = (Y) => {
    const st = c.current;
    if (!st) return;
    const I = st.getBoundingClientRect(), $ = Y - I.left, X = I.width;
    if (X <= 0) return;
    const J = $ / X * 100, tt = Nn(J - T / 2, 0, 100 - T);
    y(tt);
  }, N = (Y) => {
    v.current = !0, b.current = Y.pointerId, j.current = Y.clientX;
  }, V = (Y) => {
    if (!(b.current != null && Y.pointerId !== b.current)) {
      if (!u) {
        if (!v.current) return;
        if (Math.abs(Y.clientX - j.current) >= w) {
          try {
            Y.currentTarget.setPointerCapture?.(Y.pointerId), g.current = Y.pointerId;
          } catch {
          }
          d(!0), D(Y.clientX), Y.preventDefault();
        }
        return;
      }
      g.current != null && Y.pointerId !== g.current || (D(Y.clientX), Y.preventDefault());
    }
  }, H = (Y) => {
    const st = c.current;
    let I = t;
    if (st && typeof Y == "number") {
      const $ = st.getBoundingClientRect(), X = Y - $.left, J = $.width;
      if (J > 0) {
        const tt = J / n;
        I = Nn(Math.round(X / tt - 0.5), 0, n - 1);
      }
    } else if (p != null) {
      const $ = 100 / n;
      I = Nn(Math.round(p / $), 0, n - 1);
    }
    I === t ? i?.() : l?.(I), d(!1), y(null), g.current = null;
  }, B = (Y) => {
    if (v.current = !1, b.current = null, !!u && !(g.current != null && Y.pointerId !== g.current)) {
      try {
        Y.currentTarget.releasePointerCapture?.(Y.pointerId);
      } catch {
      }
      H(Y.clientX), Y.preventDefault();
    }
  }, U = (Y) => {
    v.current = !1, b.current = null, u && (H(Y?.clientX), Y.preventDefault?.());
  }, F = (Y) => {
    u && H(Y?.clientX);
  };
  return C.useEffect(() => {
    const Y = () => {
      d(!1), y(null), g.current = null, v.current = !1, b.current = null;
    };
    return window.addEventListener("blur", Y), () => window.removeEventListener("blur", Y);
  }, []), {
    overlayRef: c,
    isDragging: u,
    animate: {
      clipPath: M
    },
    transition: O,
    handlers: {
      onPointerDown: N,
      onPointerMove: V,
      onPointerUp: B,
      onPointerCancel: U,
      onPointerLeave: F
    }
  };
}
function LM(n) {
  const t = At.c(40), {
    width: i,
    height: l,
    insets: o,
    innerHeight: c,
    className: u
  } = n;
  let d;
  t[0] !== o ? (d = o === void 0 ? {
    top: 21,
    right: 21,
    bottom: 21,
    left: 21
  } : o, t[0] = o, t[1] = d) : d = t[1];
  const p = d, y = c === void 0 ? 64 : c, g = C.useId();
  if (!i || !l)
    return null;
  const {
    top: v,
    right: b,
    bottom: j,
    left: w
  } = p, T = i + w + b, x = y + v + j, A = Math.max(0, T - w - b), _ = Math.min(y / 2, A / 2, 999), E = `grad-${g}`, M = `mask-${g}`, O = Math.max(w, b), D = Math.max(v, j), N = `0 0 ${T} ${x}`;
  let V;
  t[2] !== u ? (V = [MM, u].filter(Boolean), t[2] = u, t[3] = V) : V = t[3];
  const H = V.join(" "), B = `${O}px`, U = `${D}px`;
  let F;
  t[4] !== B || t[5] !== U ? (F = {
    "--overlay-padding-x": B,
    "--overlay-padding-y": U
  }, t[4] = B, t[5] = U, t[6] = F) : F = t[6];
  let Y, st;
  t[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (Y = /* @__PURE__ */ h.jsx("stop", {
    offset: "0%",
    stopColor: "var(--mask-color)",
    stopOpacity: "var(--mask-opacity-top)"
  }), st = /* @__PURE__ */ h.jsx("stop", {
    offset: "100%",
    stopColor: "var(--mask-color)",
    stopOpacity: "var(--mask-opacity-bottom)"
  }), t[7] = Y, t[8] = st) : (Y = t[7], st = t[8]);
  let I;
  t[9] !== E ? (I = /* @__PURE__ */ h.jsxs("linearGradient", {
    id: E,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1",
    children: [Y, st]
  }), t[9] = E, t[10] = I) : I = t[10];
  let $;
  t[11] !== x || t[12] !== T ? ($ = /* @__PURE__ */ h.jsx("rect", {
    x: "0",
    y: "0",
    width: T,
    height: x,
    fill: "var(--ui-static-white)"
  }), t[11] = x, t[12] = T, t[13] = $) : $ = t[13];
  let X;
  t[14] !== y || t[15] !== A || t[16] !== w || t[17] !== _ || t[18] !== v ? (X = /* @__PURE__ */ h.jsx("rect", {
    x: w,
    y: v,
    width: A,
    height: y,
    rx: _,
    ry: _,
    fill: "var(--ui-static-black)"
  }), t[14] = y, t[15] = A, t[16] = w, t[17] = _, t[18] = v, t[19] = X) : X = t[19];
  let J;
  t[20] !== M || t[21] !== $ || t[22] !== X ? (J = /* @__PURE__ */ h.jsxs("mask", {
    id: M,
    maskUnits: "userSpaceOnUse",
    children: [$, X]
  }), t[20] = M, t[21] = $, t[22] = X, t[23] = J) : J = t[23];
  let tt;
  t[24] !== I || t[25] !== J ? (tt = /* @__PURE__ */ h.jsxs("defs", {
    children: [I, J]
  }), t[24] = I, t[25] = J, t[26] = tt) : tt = t[26];
  const ut = `url(#${E})`, L = `url(#${M})`;
  let q;
  t[27] !== x || t[28] !== T || t[29] !== ut || t[30] !== L ? (q = /* @__PURE__ */ h.jsx("rect", {
    width: T,
    height: x,
    fill: ut,
    mask: L
  }), t[27] = x, t[28] = T, t[29] = ut, t[30] = L, t[31] = q) : q = t[31];
  let G;
  return t[32] !== x || t[33] !== T || t[34] !== tt || t[35] !== q || t[36] !== N || t[37] !== H || t[38] !== F ? (G = /* @__PURE__ */ h.jsxs("svg", {
    width: T,
    height: x,
    viewBox: N,
    preserveAspectRatio: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: H,
    style: F,
    "aria-hidden": !0,
    children: [tt, q]
  }), t[32] = x, t[33] = T, t[34] = tt, t[35] = q, t[36] = N, t[37] = H, t[38] = F, t[39] = G) : G = t[39], G;
}
const $M = (n) => {
  const t = At.c(24), {
    tabs: i,
    activeIndex: l,
    onChange: o
  } = n;
  let c;
  t[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (c = {
    type: "spring",
    stiffness: 800,
    damping: 50
  }, t[0] = c) : c = t[0];
  let u;
  t[1] !== l || t[2] !== o || t[3] !== i.length ? (u = {
    tabsLength: i.length,
    activeIndex: l,
    spring: c,
    onSnapToNew: o
  }, t[1] = l, t[2] = o, t[3] = i.length, t[4] = u) : u = t[4];
  const {
    overlayRef: d,
    animate: p,
    transition: y,
    handlers: g
  } = OM(u);
  let v;
  t[5] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = {
    opacity: 0
  }, t[5] = v) : v = t[5];
  let b;
  t[6] !== p ? (b = {
    opacity: 1,
    ...p
  }, t[6] = p, t[7] = b) : b = t[7];
  let j;
  t[8] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (j = {
    duration: 0.2
  }, t[8] = j) : j = t[8];
  let w;
  t[9] !== y.clipPath ? (w = {
    default: j,
    clipPath: y.clipPath
  }, t[9] = y.clipPath, t[10] = w) : w = t[10];
  let T;
  if (t[11] !== l || t[12] !== o || t[13] !== i) {
    let A;
    t[15] !== l || t[16] !== o ? (A = (_, E) => /* @__PURE__ */ h.jsx(u3, {
      isActive: E === l,
      onClick: () => o(E),
      "data-overlay": !0,
      ..._
    }, E), t[15] = l, t[16] = o, t[17] = A) : A = t[17], T = i.map(A), t[11] = l, t[12] = o, t[13] = i, t[14] = T;
  } else
    T = t[14];
  let x;
  return t[18] !== g || t[19] !== d || t[20] !== b || t[21] !== w || t[22] !== T ? (x = /* @__PURE__ */ h.jsx(xa, {
    className: _M,
    ref: d,
    ...g,
    initial: v,
    animate: b,
    transition: w,
    children: T
  }), t[18] = g, t[19] = d, t[20] = b, t[21] = w, t[22] = T, t[23] = x) : x = t[23], x;
}, kM = (n) => {
  const t = At.c(43), {
    tabs: i,
    onChange: l,
    defaultIndex: o
  } = n, c = o === void 0 ? 0 : o, {
    isApple: u
  } = Nr(), [d, p] = C.useState(c);
  let y, g;
  t[0] !== c ? (y = () => {
    p(c);
  }, g = [c], t[0] = c, t[1] = y, t[2] = g) : (y = t[1], g = t[2]), C.useEffect(y, g);
  let v, b;
  t[3] !== i.length ? (v = () => {
    p((tt) => Math.min(tt, i.length - 1));
  }, b = [i.length], t[3] = i.length, t[4] = v, t[5] = b) : (v = t[4], b = t[5]), C.useEffect(v, b);
  let j;
  t[6] !== d || t[7] !== l ? (j = (tt) => {
    tt !== d && (p(tt), l?.(tt));
  }, t[6] = d, t[7] = l, t[8] = j) : j = t[8];
  const w = j, T = C.useRef(null), [x, A] = C.useState(0);
  let _;
  t[9] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (_ = (tt) => {
    A(tt.contentRect.width);
  }, t[9] = _) : _ = t[9], V8(T, _);
  const E = i.length === 3 ? 54 : 21;
  let M;
  t[10] !== u || t[11] !== E ? (M = u ? {
    left: E,
    right: E,
    width: `calc(100% - ${E * 2}px)`
  } : {}, t[10] = u, t[11] = E, t[12] = M) : M = t[12];
  const O = M;
  let D;
  t[13] !== E ? (D = {
    top: 21,
    bottom: 21,
    left: E,
    right: E
  }, t[13] = E, t[14] = D) : D = t[14];
  const N = D;
  let V, H;
  t[15] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (V = {
    scale: 1.02
  }, H = {
    scale: {
      type: "spring",
      stiffness: 800,
      damping: 40
    }
  }, t[15] = V, t[16] = H) : (V = t[15], H = t[16]);
  let B;
  t[17] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (B = {
    display: "flex",
    width: "100%",
    position: "relative",
    zIndex: 1
  }, t[17] = B) : B = t[17];
  let U;
  if (t[18] !== d || t[19] !== w || t[20] !== i) {
    let tt;
    t[22] !== d || t[23] !== w ? (tt = (ut, L) => /* @__PURE__ */ h.jsx(u3, {
      isActive: L === d,
      onClick: () => w(L),
      ...ut
    }, L), t[22] = d, t[23] = w, t[24] = tt) : tt = t[24], U = i.map(tt), t[18] = d, t[19] = w, t[20] = i, t[21] = U;
  } else
    U = t[21];
  let F;
  t[25] !== U ? (F = /* @__PURE__ */ h.jsx("div", {
    style: B,
    children: U
  }), t[25] = U, t[26] = F) : F = t[26];
  let Y;
  t[27] !== d || t[28] !== w || t[29] !== i ? (Y = /* @__PURE__ */ h.jsx($M, {
    tabs: i,
    activeIndex: d,
    onChange: w
  }), t[27] = d, t[28] = w, t[29] = i, t[30] = Y) : Y = t[30];
  const st = u ? "visible" : "hidden";
  let I;
  t[31] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (I = /* @__PURE__ */ h.jsx(Sr, {}), t[31] = I) : I = t[31];
  let $;
  t[32] !== N || t[33] !== x ? ($ = /* @__PURE__ */ h.jsx(LM, {
    width: x,
    height: 64,
    insets: N
  }), t[32] = N, t[33] = x, t[34] = $) : $ = t[34];
  let X;
  t[35] !== st || t[36] !== $ ? (X = /* @__PURE__ */ h.jsxs(C.Activity, {
    mode: st,
    children: [I, $]
  }), t[35] = st, t[36] = $, t[37] = X) : X = t[37];
  let J;
  return t[38] !== O || t[39] !== F || t[40] !== Y || t[41] !== X ? (J = /* @__PURE__ */ h.jsxs(xa, {
    ref: T,
    className: EM,
    whileTap: V,
    transition: H,
    style: O,
    layout: !0,
    children: [F, Y, X]
  }), t[38] = O, t[39] = F, t[40] = Y, t[41] = X, t[42] = J) : J = t[42], J;
}, hp = "_badge_dqs9c_1", f3 = "_filled_dqs9c_19", d3 = "_tinted_dqs9c_24", h3 = "_gray_dqs9c_29", m3 = "_media_dqs9c_34", p3 = "_outlined_dqs9c_39", BM = {
  badge: hp,
  filled: f3,
  tinted: d3,
  gray: h3,
  media: m3,
  outlined: p3
}, VM = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  badge: hp,
  default: BM,
  filled: f3,
  gray: h3,
  media: m3,
  outlined: p3,
  tinted: d3
}, Symbol.toStringTag, { value: "Module" })), zM = (n) => {
  const t = At.c(35);
  let i, l, o, c, u, d, p, y;
  t[0] !== n ? ({
    variant: c,
    textVariant: u,
    circled: d,
    squared: p,
    style: o,
    className: l,
    children: i,
    ...y
  } = n, t[0] = n, t[1] = i, t[2] = l, t[3] = o, t[4] = c, t[5] = u, t[6] = d, t[7] = p, t[8] = y) : (i = t[1], l = t[2], o = t[3], c = t[4], u = t[5], d = t[6], p = t[7], y = t[8]);
  const g = c === void 0 ? "filled" : c, v = u === void 0 ? "body" : u, b = d === void 0 ? !1 : d, j = p === void 0 ? !1 : p;
  let w;
  t[9] !== b ? (w = b && {
    "data-circled": !0
  }, t[9] = b, t[10] = w) : w = t[10];
  let T;
  t[11] !== j ? (T = j && {
    "data-squared": !0
  }, t[11] = j, t[12] = T) : T = t[12];
  let x;
  t[13] !== w || t[14] !== T ? (x = {
    ...w,
    ...T
  }, t[13] = w, t[14] = T, t[15] = x) : x = t[15];
  const A = x, _ = o?.background || o?.backgroundColor || null;
  let E = o;
  if (g === "filled") {
    const D = _ || "var(--tg-theme-button-color)";
    let N;
    t[16] !== o ? (N = o?.color && {
      "--badge-text-color": o.color
    }, t[16] = o, t[17] = N) : N = t[17];
    let V;
    t[18] !== o || t[19] !== D || t[20] !== N ? (V = {
      ...o,
      "--badge-background": D,
      ...N
    }, t[18] = o, t[19] = D, t[20] = N, t[21] = V) : V = t[21], E = V;
  } else if (g === "tinted") {
    const D = o.color || _ || "var(--tg-theme-button-color)";
    let N;
    t[22] !== o.color ? (N = o?.color && {
      "--badge-text-color": o.color
    }, t[22] = o.color, t[23] = N) : N = t[23];
    let V;
    t[24] !== o || t[25] !== N || t[26] !== D ? (V = {
      ...o,
      "--badge-background": D,
      ...N
    }, t[24] = o, t[25] = N, t[26] = D, t[27] = V) : V = t[27], E = V;
  }
  const M = `${hp} ${VM[g]} ${l || ""}`;
  let O;
  return t[28] !== E || t[29] !== i || t[30] !== A || t[31] !== M || t[32] !== y || t[33] !== v ? (O = /* @__PURE__ */ h.jsx(pt, {
    variant: v,
    className: M,
    style: E,
    ...A,
    ...y,
    children: i
  }), t[28] = E, t[29] = i, t[30] = A, t[31] = M, t[32] = y, t[33] = v, t[34] = O) : O = t[34], O;
}, UM = "_container_1e3rp_1", HM = "_trigger_1e3rp_6", x2 = "_shell_1e3rp_20", qM = "_body_1e3rp_28", YM = "_compact_1e3rp_36", PM = "_withBadge_1e3rp_40", GM = "_badge_1e3rp_44", S2 = (n) => {
  const t = At.c(14), {
    content: i,
    badge: l,
    compact: o
  } = n, c = o ? YM : "", u = l && !o ? PM : "";
  let d;
  t[0] !== c || t[1] !== u ? (d = [qM, c, u].filter(Boolean), t[0] = c, t[1] = u, t[2] = d) : d = t[2];
  const p = d.join(" ");
  let y;
  t[3] !== l || t[4] !== o ? (y = l && !o && /* @__PURE__ */ h.jsx("span", {
    className: GM,
    children: /* @__PURE__ */ h.jsx(pt, {
      variant: "caption2",
      rounded: !0,
      caps: !0,
      weight: "semibold",
      children: l
    })
  }), t[3] = l, t[4] = o, t[5] = y) : y = t[5];
  const g = o ? "caption2" : "subheadline2", v = o ? "medium" : "regular";
  let b;
  t[6] !== i || t[7] !== g || t[8] !== v ? (b = /* @__PURE__ */ h.jsx(pt, {
    variant: g,
    weight: v,
    children: i
  }), t[6] = i, t[7] = g, t[8] = v, t[9] = b) : b = t[9];
  let j;
  return t[10] !== p || t[11] !== y || t[12] !== b ? (j = /* @__PURE__ */ h.jsxs("div", {
    className: p,
    children: [y, b]
  }), t[10] = p, t[11] = y, t[12] = b, t[13] = j) : j = t[13], j;
}, _s = 8, Tn = 8, XM = (n, t) => n.top === t.top && n.left === t.left && n.width === t.width && n.height === t.height && n.placement === t.placement && n.shape === t.shape && n.tailOffsetX === t.tailOffsetX && n.tailOffsetY === t.tailOffsetY && n.tailProtrusion === t.tailProtrusion && n.originX === t.originX && n.originY === t.originY, KM = (n, t) => n.reduce((i, l) => i === null || t[l] > t[i] ? l : i, null), ZM = (n, t, i) => {
  if (["top", "bottom", "left", "right"].includes(i))
    return i;
  const l = t.left !== t.right, o = Math.max(n.top, n.bottom), c = Math.min(n.top, n.bottom), u = o > 0 && (o - c) / o < 0.4;
  return l && u ? t.left ? "left" : "right" : t.bottom && t.top ? n.bottom >= n.top ? "bottom" : "top" : t.bottom ? "bottom" : t.top ? "top" : t.right && t.left ? n.right >= n.left ? "right" : "left" : t.right ? "right" : t.left ? "left" : KM(["bottom", "top", "right", "left"], n);
}, QM = (n, t, i, l, o, c) => {
  const {
    innerHeight: u,
    innerWidth: d
  } = window, p = {
    top: n.top,
    bottom: u - n.bottom,
    left: n.left,
    right: d - n.right
  }, y = t.height + o + _s + Tn, g = t.width + o + _s + Tn, v = {
    top: p.top >= y,
    bottom: p.bottom >= y,
    left: p.left >= g,
    right: p.right >= g
  }, b = ZM(p, v, c), j = b === "left" || b === "right", w = j ? l : i, T = Math.round(o * 0.8);
  if (j) {
    const B = t.height, U = n.top + n.height / 2, F = Math.max(Tn, u - B - Tn);
    let Y = Nn(U - B / 2, Tn, F), st = U - Y, I = "full";
    st < w / 2 ? (I = "half-start", Y = Nn(U, Tn, F), st = 0) : st > B - w / 2 && (I = "half-end", Y = Nn(U - B, Tn, F), st = B);
    const $ = I === "full" ? o : T, X = t.width + $, J = b === "left" ? n.left - _s - X : n.right + _s, tt = I === "full" ? st - w / 2 : 0;
    return {
      top: Math.round(Y),
      left: Math.round(J),
      width: Math.round(X),
      height: Math.round(B),
      placement: b,
      shape: I,
      tailOffsetX: 0,
      tailOffsetY: Math.round(tt),
      tailProtrusion: $,
      originX: b === "left" ? "100%" : "0%",
      originY: `${Nn(st / B * 100, 0, 100)}%`
    };
  }
  const x = t.width, A = n.left + n.width / 2, _ = Math.max(Tn, d - x - Tn);
  let E = Nn(A - x / 2, Tn, _), M = A - E, O = "full";
  M < w / 2 ? (O = "half-start", E = Nn(A, Tn, _), M = 0) : M > x - w / 2 && (O = "half-end", E = Nn(A - x, Tn, _), M = x);
  const D = O === "full" ? o : T, N = t.height + D, V = b === "top" ? n.top - _s - N : n.bottom + _s, H = O === "full" ? M - w / 2 : 0;
  return {
    top: Math.round(V),
    left: Math.round(E),
    width: Math.round(x),
    height: Math.round(N),
    placement: b,
    shape: O,
    tailOffsetX: Math.round(H),
    tailOffsetY: 0,
    tailProtrusion: D,
    originX: `${Nn(M / x * 100, 0, 100)}%`,
    originY: b === "top" ? "100%" : "0%"
  };
}, FM = {
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
}, IM = (n, t, i, l, o, c, u) => {
  const d = At.c(10);
  let p;
  d[0] !== u || d[1] !== o || d[2] !== c || d[3] !== l ? (p = (v, b) => QM(v, b, l, o, c, u), d[0] = u, d[1] = o, d[2] = c, d[3] = l, d[4] = p) : p = d[4];
  const y = p;
  let g;
  return d[5] !== y || d[6] !== n || d[7] !== i || d[8] !== t ? (g = {
    isOpen: n,
    triggerRef: t,
    contentRef: i,
    initialPosition: FM,
    calculate: y,
    equals: XM
  }, d[5] = y, d[6] = n, d[7] = i, d[8] = t, d[9] = g) : g = d[9], U8(g);
}, JM = 80, WM = 120, t_ = (n) => {
  const t = At.c(15), {
    onOpen: i,
    onClose: l
  } = n, o = C.useRef(null), c = C.useRef(null);
  let u;
  t[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (u = () => {
    o.current && (clearTimeout(o.current), o.current = null);
  }, t[0] = u) : u = t[0];
  const d = u;
  let p;
  t[1] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (p = () => {
    c.current && (clearTimeout(c.current), c.current = null);
  }, t[1] = p) : p = t[1];
  const y = p;
  let g, v;
  t[2] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (g = () => () => {
    d(), y();
  }, v = [d, y], t[2] = g, t[3] = v) : (g = t[2], v = t[3]), C.useEffect(g, v);
  let b;
  t[4] !== i ? (b = () => {
    y(), !o.current && (o.current = setTimeout(() => {
      o.current = null, i();
    }, JM));
  }, t[4] = i, t[5] = b) : b = t[5];
  const j = b;
  let w;
  t[6] !== l ? (w = () => {
    d(), !c.current && (c.current = setTimeout(() => {
      c.current = null, l();
    }, WM));
  }, t[6] = l, t[7] = w) : w = t[7];
  const T = w;
  let x;
  t[8] !== j ? (x = (O) => {
    O.pointerType !== "touch" && j();
  }, t[8] = j, t[9] = x) : x = t[9];
  const A = x;
  let _;
  t[10] !== T ? (_ = (O) => {
    O.pointerType !== "touch" && T();
  }, t[10] = T, t[11] = _) : _ = t[11];
  const E = _;
  let M;
  return t[12] !== A || t[13] !== E ? (M = {
    onPointerEnter: A,
    onPointerLeave: E,
    clearOpenTimer: d,
    clearCloseTimer: y
  }, t[12] = A, t[13] = E, t[14] = M) : M = t[14], M;
}, w2 = 32, C2 = 24, e_ = 9, n_ = 7, a_ = tu["tooltip-surface"], i_ = (n, t, i, l, o, c, u) => {
  const d = a_, p = [d, d, d, d];
  if (n !== "full") {
    const y = {
      "bottom:half-start": 0,
      "bottom:half-end": 1,
      "top:half-start": 2,
      "top:half-end": 3,
      "right:half-start": 0,
      "right:half-end": 2,
      "left:half-start": 1,
      "left:half-end": 3
    }[`${t}:${n}`];
    return p[y] = 0, p;
  }
  return t === "bottom" ? (p[0] = Math.min(d, o), p[1] = Math.min(d, i - (o + u))) : t === "top" ? (p[2] = Math.min(d, o), p[3] = Math.min(d, i - (o + u))) : t === "right" ? (p[0] = Math.min(d, c), p[2] = Math.min(d, l - (c + u))) : (p[1] = Math.min(d, c), p[3] = Math.min(d, l - (c + u))), p;
}, s_ = ({
  width: n,
  height: t,
  tailOffsetX: i,
  tailOffsetY: l,
  tailBreadth: o,
  tailProtrusion: c,
  placement: u,
  shape: d
}) => {
  const [p, y, g, v] = i_(d, u, n, t, i, l, o), b = d === "full" ? o : Math.round(o * 0.85), j = Math.min(2, Math.max(1, Math.floor(b / 10))), w = (x) => [x, x + o / 4, x + o * 3 / 8, x + o / 2, x + o * 5 / 8, x + o * 3 / 4, x + o];
  if (u === "bottom") {
    const x = c;
    if (d === "full") {
      const [A, _, E, M, O, D, N] = w(i);
      return `path("M ${p} ${x} L ${A} ${x} C ${_} ${x} ${E} 0 ${M} 0 C ${O} 0 ${D} ${x} ${N} ${x} L ${n - y} ${x} Q ${n} ${x} ${n} ${x + y} L ${n} ${t - v} Q ${n} ${t} ${n - v} ${t} L ${g} ${t} Q 0 ${t} 0 ${t - g} L 0 ${x + p} Q 0 ${x} ${p} ${x} Z")`;
    }
    return d === "half-end" ? `path("M ${p} ${x} L ${n - b / 2} ${x} C ${n - b / 4} ${x} ${n - b / 8 - j} 0 ${n - j} 0 Q ${n} 0 ${n} ${j} L ${n} ${t - v} Q ${n} ${t} ${n - v} ${t} L ${g} ${t} Q 0 ${t} 0 ${t - g} L 0 ${x + p} Q 0 ${x} ${p} ${x} Z")` : `path("M ${j} 0 C ${b / 8 + j} 0 ${b / 4} ${x} ${b / 2} ${x} L ${n - y} ${x} Q ${n} ${x} ${n} ${x + y} L ${n} ${t - v} Q ${n} ${t} ${n - v} ${t} L ${g} ${t} Q 0 ${t} 0 ${t - g} L 0 ${j} Q 0 0 ${j} 0 Z")`;
  }
  if (u === "top") {
    const x = t - c;
    if (d === "full") {
      const [A, _, E, M, O, D, N] = w(i);
      return `path("M ${p} 0 L ${n - y} 0 Q ${n} 0 ${n} ${y} L ${n} ${x - v} Q ${n} ${x} ${n - v} ${x} L ${N} ${x} C ${D} ${x} ${O} ${t} ${M} ${t} C ${E} ${t} ${_} ${x} ${A} ${x} L ${g} ${x} Q 0 ${x} 0 ${x - g} L 0 ${p} Q 0 0 ${p} 0 Z")`;
    }
    return d === "half-end" ? `path("M ${p} 0 L ${n - y} 0 Q ${n} 0 ${n} ${y} L ${n} ${t - j} Q ${n} ${t} ${n - j} ${t} C ${n - b / 8 - j} ${t} ${n - b / 4} ${x} ${n - b / 2} ${x} L ${g} ${x} Q 0 ${x} 0 ${x - g} L 0 ${p} Q 0 0 ${p} 0 Z")` : `path("M ${p} 0 L ${n - y} 0 Q ${n} 0 ${n} ${y} L ${n} ${x - v} Q ${n} ${x} ${n - v} ${x} L ${b / 2} ${x} C ${b / 4} ${x} ${b / 8 + j} ${t} ${j} ${t} Q 0 ${t} 0 ${t - j} L 0 ${p} Q 0 0 ${p} 0 Z")`;
  }
  if (u === "right") {
    const x = c;
    if (d === "full") {
      const [A, _, E, M, O, D, N] = w(l);
      return `path("M ${x + p} 0 L ${n - y} 0 Q ${n} 0 ${n} ${y} L ${n} ${t - v} Q ${n} ${t} ${n - v} ${t} L ${x + g} ${t} Q ${x} ${t} ${x} ${t - g} L ${x} ${N} C ${x} ${D} 0 ${O} 0 ${M} C 0 ${E} ${x} ${_} ${x} ${A} L ${x} ${p} Q ${x} 0 ${x + p} 0 Z")`;
    }
    return d === "half-end" ? `path("M ${x + p} 0 L ${n - y} 0 Q ${n} 0 ${n} ${y} L ${n} ${t - v} Q ${n} ${t} ${n - v} ${t} L ${j} ${t} Q 0 ${t} 0 ${t - j} C 0 ${t - j - b / 8} ${x} ${t - b / 4} ${x} ${t - b / 2} L ${x} ${p} Q ${x} 0 ${x + p} 0 Z")` : `path("M ${j} 0 L ${n - y} 0 Q ${n} 0 ${n} ${y} L ${n} ${t - v} Q ${n} ${t} ${n - v} ${t} L ${x + g} ${t} Q ${x} ${t} ${x} ${t - g} L ${x} ${b / 2} C ${x} ${b / 4} 0 ${b / 8 + j} 0 ${j} Q 0 0 ${j} 0 Z")`;
  }
  const T = n - c;
  if (d === "full") {
    const [x, A, _, E, M, O, D] = w(l);
    return `path("M ${p} 0 L ${T - y} 0 Q ${T} 0 ${T} ${y} L ${T} ${x} C ${T} ${A} ${n} ${_} ${n} ${E} C ${n} ${M} ${T} ${O} ${T} ${D} L ${T} ${t - v} Q ${T} ${t} ${T - v} ${t} L ${g} ${t} Q 0 ${t} 0 ${t - g} L 0 ${p} Q 0 0 ${p} 0 Z")`;
  }
  return d === "half-end" ? `path("M ${p} 0 L ${T - y} 0 Q ${T} 0 ${T} ${y} L ${T} ${t - b / 2} C ${T} ${t - b / 4} ${n} ${t - b / 8 - j} ${n} ${t - j} Q ${n} ${t} ${n - j} ${t} L ${g} ${t} Q 0 ${t} 0 ${t - g} L 0 ${p} Q 0 0 ${p} 0 Z")` : `path("M ${p} 0 L ${n - j} 0 Q ${n} 0 ${n} ${j} C ${n} ${j + b / 8} ${T} ${b / 4} ${T} ${b / 2} L ${T} ${t - v} Q ${T} ${t} ${T - v} ${t} L ${g} ${t} Q 0 ${t} 0 ${t - g} L 0 ${p} Q 0 0 ${p} 0 Z")`;
}, l_ = (n) => {
  const t = At.c(61), {
    content: i,
    badge: l,
    type: o,
    placement: c,
    children: u
  } = n, d = o === void 0 ? "regular" : o, p = c === void 0 ? "auto" : c, [y, g] = C.useState(!1), v = C.useRef(null), b = C.useRef(null), j = C.useRef(null), w = d === "compact", T = w ? n_ : e_, {
    position: x,
    isPositioned: A,
    resetPosition: _
  } = IM(y, v, b, w2, C2, T, p);
  let E;
  t[0] !== _ ? (E = () => {
    g(!0), _();
  }, t[0] = _, t[1] = E) : E = t[1];
  const M = E;
  let O;
  t[2] !== _ ? (O = () => {
    g(!1), _();
  }, t[2] = _, t[3] = O) : O = t[3];
  const D = O;
  let N;
  t[4] !== D || t[5] !== M ? (N = {
    onOpen: M,
    onClose: D
  }, t[4] = D, t[5] = M, t[6] = N) : N = t[6];
  const {
    onPointerEnter: V,
    onPointerLeave: H,
    clearOpenTimer: B,
    clearCloseTimer: U
  } = t_(N);
  let F;
  t[7] !== U || t[8] !== B || t[9] !== _ ? (F = () => {
    B(), U(), g(r_), _();
  }, t[7] = U, t[8] = B, t[9] = _, t[10] = F) : F = t[10];
  const Y = F;
  H8(y, D, v, b, j);
  let st, I;
  t[11] !== D || t[12] !== y ? (st = () => {
    if (!y)
      return;
    const ht = (nt) => {
      nt.key === "Escape" && (nt.preventDefault(), D(), v.current?.focus());
    };
    return document.addEventListener("keydown", ht), () => document.removeEventListener("keydown", ht);
  }, I = [y, D], t[11] = D, t[12] = y, t[13] = st, t[14] = I) : (st = t[13], I = t[14]), C.useEffect(st, I);
  let $;
  t[15] !== Y ? ($ = (ht) => {
    (ht.key === "Enter" || ht.key === " ") && (ht.preventDefault(), Y());
  }, t[15] = Y, t[16] = $) : $ = t[16];
  const X = $, J = x.placement === "left" || x.placement === "right" ? C2 : w2;
  let tt;
  t[17] !== A || t[18] !== x.height || t[19] !== x.left || t[20] !== x.originX || t[21] !== x.originY || t[22] !== x.placement || t[23] !== x.shape || t[24] !== x.tailOffsetX || t[25] !== x.tailOffsetY || t[26] !== x.tailProtrusion || t[27] !== x.top || t[28] !== x.width || t[29] !== J ? (tt = A ? {
    position: "fixed",
    top: x.top,
    left: x.left,
    transformOrigin: `${x.originX} ${x.originY}`,
    zIndex: 1e3,
    paddingTop: x.placement === "bottom" ? x.tailProtrusion : 0,
    paddingBottom: x.placement === "top" ? x.tailProtrusion : 0,
    paddingLeft: x.placement === "right" ? x.tailProtrusion : 0,
    paddingRight: x.placement === "left" ? x.tailProtrusion : 0,
    clipPath: s_({
      width: x.width,
      height: x.height,
      tailOffsetX: x.tailOffsetX,
      tailOffsetY: x.tailOffsetY,
      tailBreadth: J,
      tailProtrusion: x.tailProtrusion,
      placement: x.placement,
      shape: x.shape
    })
  } : null, t[17] = A, t[18] = x.height, t[19] = x.left, t[20] = x.originX, t[21] = x.originY, t[22] = x.placement, t[23] = x.shape, t[24] = x.tailOffsetX, t[25] = x.tailOffsetY, t[26] = x.tailProtrusion, t[27] = x.top, t[28] = x.width, t[29] = J, t[30] = tt) : tt = t[30];
  const ut = tt;
  let L;
  t[31] !== u || t[32] !== X || t[33] !== y || t[34] !== V || t[35] !== H || t[36] !== Y ? (L = /* @__PURE__ */ h.jsx("span", {
    className: HM,
    onClick: Y,
    onKeyDown: X,
    onPointerEnter: V,
    onPointerLeave: H,
    ref: v,
    role: "button",
    tabIndex: 0,
    "aria-expanded": y,
    "aria-haspopup": "dialog",
    children: u
  }), t[31] = u, t[32] = X, t[33] = y, t[34] = V, t[35] = H, t[36] = Y, t[37] = L) : L = t[37];
  let q;
  t[38] !== l || t[39] !== w || t[40] !== i || t[41] !== y || t[42] !== A ? (q = y && !A && /* @__PURE__ */ h.jsx("div", {
    ref: b,
    className: x2,
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      visibility: "hidden",
      zIndex: 1e3
    },
    children: /* @__PURE__ */ h.jsx(S2, {
      content: i,
      badge: l,
      compact: w
    })
  }), t[38] = l, t[39] = w, t[40] = i, t[41] = y, t[42] = A, t[43] = q) : q = t[43];
  let G;
  t[44] !== l || t[45] !== w || t[46] !== i || t[47] !== y || t[48] !== A || t[49] !== V || t[50] !== H || t[51] !== ut ? (G = y && A && /* @__PURE__ */ h.jsx(xa, {
    ref: j,
    role: "tooltip",
    className: x2,
    initial: "hidden",
    animate: "visible",
    exit: "exit",
    variants: t8,
    onPointerEnter: V,
    onPointerLeave: H,
    style: ut,
    children: /* @__PURE__ */ h.jsx(S2, {
      content: i,
      badge: l,
      compact: w
    })
  }), t[44] = l, t[45] = w, t[46] = i, t[47] = y, t[48] = A, t[49] = V, t[50] = H, t[51] = ut, t[52] = G) : G = t[52];
  let et;
  t[53] !== G ? (et = /* @__PURE__ */ h.jsx(Gs, {
    children: G
  }), t[53] = G, t[54] = et) : et = t[54];
  let ot;
  t[55] !== q || t[56] !== et ? (ot = /* @__PURE__ */ Dr.createPortal(/* @__PURE__ */ h.jsxs(h.Fragment, {
    children: [q, et]
  }), document.body), t[55] = q, t[56] = et, t[57] = ot) : ot = t[57];
  let ct;
  return t[58] !== L || t[59] !== ot ? (ct = /* @__PURE__ */ h.jsxs("span", {
    className: UM,
    children: [L, ot]
  }), t[58] = L, t[59] = ot, t[60] = ct) : ct = t[60], ct;
};
function r_(n) {
  return !n;
}
const T2 = "_root_1lgln_7", o_ = "_header_1lgln_21", j2 = "_button_1lgln_29", c_ = "_wheelContainer_1lgln_54", u_ = "_centerIndicator_1lgln_80", f_ = "_currentValue_1lgln_101", d_ = "_ticksContainer_1lgln_112", h_ = "_tick_1lgln_112", m_ = "_tickNumber_1lgln_143", p_ = "_tickMark_1lgln_153", y_ = 32, g_ = 8, Ei = y_ + g_, v_ = 0.6, wr = 1;
function A2(n, t) {
  const i = Math.round(-n / Ei);
  return i < 0 ? wr : i + 1 > t ? t : i + 1;
}
function E2(n, t) {
  return Math.min(t, Math.max(wr, n));
}
const b_ = (n) => {
  const t = At.c(41), {
    value: i,
    defaultValue: l,
    onChange: o,
    max: c,
    disabled: u,
    enableHaptic: d
  } = n, p = l === void 0 ? 1 : l, y = c === void 0 ? 40 : c, g = u === void 0 ? !1 : u, v = d === void 0 ? !0 : d, b = i !== void 0, [j, w] = C.useState(p), T = b ? i : j, [x, A] = C.useState(T), _ = C.useRef(T), E = C.useRef(T), M = Km(-(T - 1) * Ei), O = x !== T;
  O && A(T);
  let D, N;
  t[0] !== T ? (D = () => {
    _.current = T;
  }, N = [T], t[0] = T, t[1] = D, t[2] = N) : (D = t[1], N = t[2]), C.useEffect(D, N);
  let V;
  t[3] !== v || t[4] !== b || t[5] !== y || t[6] !== o ? (V = (et) => {
    const ot = E2(et, y);
    v && ot !== _.current && Sa.HapticFeedback.selectionChanged(), E.current = ot, b || w(ot), o?.(ot);
  }, t[3] = v, t[4] = b, t[5] = y, t[6] = o, t[7] = V) : V = t[7];
  const H = V;
  let B;
  t[8] !== g || t[9] !== H || t[10] !== M ? (B = (et, ot) => {
    const ct = ot === void 0 ? rr.GENTLE : ot;
    g || (lr(M, -(et - 1) * Ei, ct), H(et));
  }, t[8] = g, t[9] = H, t[10] = M, t[11] = B) : B = t[11];
  const U = B;
  let F;
  t[12] !== g || t[13] !== y || t[14] !== H || t[15] !== M ? (F = () => {
    if (g)
      return;
    const et = A2(M.get(), y);
    et !== _.current && H(et);
  }, t[12] = g, t[13] = y, t[14] = H, t[15] = M, t[16] = F) : F = t[16];
  const Y = F;
  let st;
  t[17] !== g || t[18] !== y || t[19] !== H || t[20] !== M ? (st = (et, ot) => {
    if (g)
      return;
    const ct = M.get(), ht = ot.velocity.x, nt = ct + ht * v_, dt = A2(nt, y), ft = -(dt - 1) * Ei;
    lr(M, ft, {
      ...rr.SNAP,
      velocity: ht
    }), H(dt);
  }, t[17] = g, t[18] = y, t[19] = H, t[20] = M, t[21] = st) : st = t[21];
  const I = st;
  let $, X;
  t[22] !== b || t[23] !== y || t[24] !== i || t[25] !== M ? ($ = () => {
    !b || i === void 0 || i !== E.current && (E.current = i, lr(M, -(E2(i, y) - 1) * Ei, rr.GENTLE));
  }, X = [i, b, y, M], t[22] = b, t[23] = y, t[24] = i, t[25] = M, t[26] = $, t[27] = X) : ($ = t[26], X = t[27]), C.useEffect($, X);
  const J = -(y - 1) * Ei;
  let tt;
  t[28] !== J ? (tt = {
    left: J,
    right: 0
  }, t[28] = J, t[29] = tt) : tt = t[29];
  const ut = tt;
  let L;
  t[30] !== y ? (L = Array.from({
    length: y - wr + 1
  }, x_), t[30] = y, t[31] = L) : L = t[31];
  const q = L;
  let G;
  return t[32] !== U || t[33] !== T || t[34] !== ut || t[35] !== Y || t[36] !== I || t[37] !== O || t[38] !== q || t[39] !== M ? (G = {
    currentValue: T,
    shouldAnimate: O,
    x: M,
    handleDrag: Y,
    handleDragEnd: I,
    animateToValue: U,
    dragConstraints: ut,
    ticks: q,
    min: wr
  }, t[32] = U, t[33] = T, t[34] = ut, t[35] = Y, t[36] = I, t[37] = O, t[38] = q, t[39] = M, t[40] = G) : G = t[40], G;
};
function x_(n, t) {
  return wr + t;
}
const S_ = (n) => {
  const t = At.c(16), {
    value: i,
    label: l,
    index: o,
    x: c,
    radius: u,
    onSelect: d
  } = n;
  let p;
  t[0] !== o || t[1] !== u ? (p = (A) => aM(o * Ei + A, u, "horizontal"), t[0] = o, t[1] = u, t[2] = p) : p = t[2];
  const y = qh(c, p), g = qh(y, w_);
  let v;
  t[3] !== y || t[4] !== g ? (v = {
    transform: y,
    visibility: g
  }, t[3] = y, t[4] = g, t[5] = v) : v = t[5];
  let b;
  t[6] !== d || t[7] !== i ? (b = () => d(i), t[6] = d, t[7] = i, t[8] = b) : b = t[8];
  const j = l ?? i;
  let w;
  t[9] !== j ? (w = /* @__PURE__ */ h.jsx("span", {
    className: m_,
    children: j
  }), t[9] = j, t[10] = w) : w = t[10];
  let T;
  t[11] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (T = /* @__PURE__ */ h.jsx("span", {
    className: p_
  }), t[11] = T) : T = t[11];
  let x;
  return t[12] !== v || t[13] !== b || t[14] !== w ? (x = /* @__PURE__ */ h.jsxs(xa, {
    className: h_,
    style: v,
    onClick: b,
    children: [w, T]
  }), t[12] = v, t[13] = b, t[14] = w, t[15] = x) : x = t[15], x;
};
function w_(n) {
  return n ? "visible" : "hidden";
}
const C_ = /* @__PURE__ */ h.jsx("div", {
  className: u_
}), T_ = 5, j_ = (n) => {
  const {
    value: t,
    defaultValue: i = 1,
    onChange: l,
    max: o = 40,
    prefix: c = "",
    suffix: u = "×",
    disabled: d = !1,
    enableHaptic: p = !0,
    className: y,
    formatTick: g,
    showValue: v = !0,
    showLimits: b = !0,
    indicator: j = "track",
    ariaLabel: w = "Value selector",
    ariaValueText: T,
    dragAreaRef: x
  } = n, A = C.useRef(null), _ = C.useRef(!1), [E, M] = C.useState(250), O = UA(), {
    currentValue: D,
    x: N,
    handleDrag: V,
    handleDragEnd: H,
    animateToValue: B,
    dragConstraints: U,
    ticks: F,
    min: Y
  } = b_({
    value: t,
    defaultValue: i,
    onChange: l,
    max: o,
    disabled: d,
    enableHaptic: p
  });
  C.useLayoutEffect(() => {
    const ft = A.current;
    if (!ft)
      return;
    const yt = () => {
      ft.clientWidth > 0 && M(ft.clientWidth / 2);
    };
    yt();
    const gt = new ResizeObserver(yt);
    return gt.observe(ft), () => gt.disconnect();
  }, []), C.useEffect(() => {
    const ft = x?.current;
    if (!ft || d)
      return;
    const yt = (gt) => O.start(gt);
    return ft.addEventListener("pointerdown", yt), () => ft.removeEventListener("pointerdown", yt);
  }, [x, O, d]);
  const st = (ft) => {
    d || _.current || B(ft);
  }, I = (ft) => {
    if (d)
      return;
    const yt = {
      ArrowLeft: () => B(Math.max(Y, D - 1)),
      ArrowDown: () => B(Math.max(Y, D - 1)),
      ArrowRight: () => B(Math.min(o, D + 1)),
      ArrowUp: () => B(Math.min(o, D + 1)),
      Home: () => B(Y),
      End: () => B(o)
    }[ft.key];
    yt && (ft.preventDefault(), yt());
  }, $ = y ? `${T2} ${y}` : T2, X = d || void 0, J = b ? /* @__PURE__ */ h.jsxs("div", {
    className: o_,
    children: [/* @__PURE__ */ h.jsx(kh, {
      className: j2,
      onClick: () => B(Y),
      disabled: d,
      whileTap: d ? void 0 : {
        scale: 0.95
      },
      children: "Min"
    }), /* @__PURE__ */ h.jsx(kh, {
      className: j2,
      onClick: () => B(o),
      disabled: d,
      whileTap: d ? void 0 : {
        scale: 0.95
      },
      children: "Max"
    })]
  }) : null, tt = v ? /* @__PURE__ */ h.jsxs("div", {
    className: f_,
    children: [c, /* @__PURE__ */ h.jsx(Xs, {
      variant: "number",
      animation: "snappy",
      style: {
        color: "inherit",
        fontSize: "inherit"
      },
      children: D
    }), u]
  }) : null, ut = d || void 0, L = d ? -1 : 0, q = {
    x: N
  }, G = d ? !1 : "x", et = !x, ot = () => {
    _.current = !1;
  }, ct = (ft, yt) => {
    Math.abs(yt.offset.x) > T_ && (_.current = !0), V();
  }, ht = F.map((ft, yt) => /* @__PURE__ */ h.jsx(S_, {
    value: ft,
    label: g ? g(ft) : ft,
    index: yt,
    x: N,
    radius: E,
    onSelect: st
  }, ft)), nt = /* @__PURE__ */ h.jsx(xa, {
    className: d_,
    style: q,
    drag: G,
    dragControls: O,
    dragListener: et,
    dragConstraints: U,
    dragElastic: 0.1,
    dragMomentum: !1,
    onPointerDown: ot,
    onDrag: ct,
    onDragEnd: H,
    children: ht
  }), dt = /* @__PURE__ */ h.jsxs("div", {
    ref: A,
    className: c_,
    role: "slider",
    "aria-label": w,
    "aria-valuemin": Y,
    "aria-valuemax": o,
    "aria-valuenow": D,
    "aria-valuetext": T,
    "aria-disabled": ut,
    tabIndex: L,
    onKeyDown: I,
    children: [C_, nt]
  });
  return /* @__PURE__ */ h.jsxs("div", {
    className: $,
    "data-disabled": X,
    "data-indicator": j,
    children: [J, tt, dt]
  });
}, ni = (n) => {
  const t = At.c(2), {
    children: i
  } = n;
  let l;
  return t[0] !== i ? (l = /* @__PURE__ */ h.jsx(l3, {
    children: /* @__PURE__ */ h.jsx(_E, {
      children: /* @__PURE__ */ h.jsx(X8, {
        children: /* @__PURE__ */ h.jsx(c3, {
          children: i
        })
      })
    })
  }), t[0] = i, t[1] = l) : l = t[1], l;
}, A_ = (n) => /* @__PURE__ */ C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ C.createElement("g", { id: "24_icon-fill/home" }, /* @__PURE__ */ C.createElement("path", { id: "Vector", d: "M11.2921 3.10288C11.7572 2.98914 12.243 2.98915 12.7081 3.10288C13.2396 3.23288 13.709 3.55457 14.2432 3.92027L19.2442 7.33335C19.6706 7.62361 20.0467 7.87916 20.3282 8.22788C20.5749 8.53357 20.7603 8.88486 20.8731 9.26206C21.0018 9.69232 21.0007 10.1491 21.0001 10.6673V16.9613C21.0001 17.4921 21.0004 17.9503 20.9698 18.3275C20.9375 18.7256 20.8656 19.1213 20.6729 19.5023C20.3853 20.0709 19.9269 20.5339 19.3624 20.8236C18.9841 21.0177 18.5907 21.0889 18.1954 21.1214C17.8209 21.1523 17.366 21.1527 16.8389 21.1527H7.16121C6.63427 21.1527 6.17922 21.1523 5.80476 21.1214C5.40975 21.0889 5.01682 21.0175 4.63875 20.8236C4.07426 20.5339 3.61484 20.0709 3.32722 19.5023C3.13458 19.1213 3.06265 18.7255 3.03035 18.3275C2.99975 17.9503 3.00006 17.4921 3.00008 16.9613V10.6673C2.99948 10.1491 2.99933 9.69232 3.12801 9.26206C3.24091 8.8848 3.42612 8.53359 3.67293 8.22788C3.95441 7.87922 4.32962 7.62355 4.75593 7.33335L9.75691 3.92027C10.2911 3.55462 10.7606 3.23292 11.2921 3.10288ZM10.5001 12.0882C9.94779 12.0882 9.50008 12.5359 9.50008 13.0882V16.1244C9.50008 16.6767 9.94779 17.1244 10.5001 17.1244H13.5001C14.0524 17.1244 14.5001 16.6767 14.5001 16.1244V13.0882C14.5001 12.5359 14.0524 12.0882 13.5001 12.0882H10.5001Z", fill: "currentColor" }))), E_ = (n) => /* @__PURE__ */ C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ C.createElement("g", { id: "24_icon-fill/calendar" }, /* @__PURE__ */ C.createElement("path", { id: "Union", d: "M19.6748 10.7998C19.9782 10.7998 20.1303 10.7997 20.2441 10.8633C20.3246 10.9083 20.3915 10.9752 20.4365 11.0557C20.5001 11.1695 20.5 11.3216 20.5 11.625V13.9004C20.5 16.329 20.5 17.5435 19.9902 18.4541C19.6298 19.0977 19.0977 19.6298 18.4541 19.9902C17.5435 20.5 16.329 20.5 13.9004 20.5H10.0996C7.67103 20.5 6.4565 20.5 5.5459 19.9902C4.90227 19.6298 4.37022 19.0977 4.00977 18.4541C3.5 17.5435 3.5 16.329 3.5 13.9004V11.625C3.5 11.3216 3.49986 11.1695 3.56348 11.0557C3.60853 10.9752 3.67541 10.9083 3.75586 10.8633C3.86967 10.7997 4.02177 10.7998 4.3252 10.7998H19.6748ZM16 1.5C16.5523 1.5 17 1.94772 17 2.5V3.58984C17.5949 3.66023 18.0539 3.78571 18.4541 4.00977C19.0977 4.37022 19.6298 4.90227 19.9902 5.5459C20.3615 6.20916 20.4605 7.03367 20.4873 8.37109C20.4933 8.67145 20.4965 8.8223 20.4336 8.93848C20.3896 9.01965 20.3215 9.08906 20.2412 9.13477C20.1263 9.20009 19.9733 9.2002 19.668 9.2002H4.33203C4.02672 9.2002 3.87368 9.20009 3.75879 9.13477C3.67854 9.08906 3.61044 9.01965 3.56641 8.93848C3.50351 8.8223 3.50669 8.67145 3.5127 8.37109C3.53947 7.03367 3.63847 6.20916 4.00977 5.5459C4.37022 4.90227 4.90227 4.37022 5.5459 4.00977C5.94613 3.78571 6.40508 3.66023 7 3.58984V2.5C7 1.94772 7.44772 1.5 8 1.5C8.55228 1.5 9 1.94772 9 2.5V3.50488C9.33664 3.50264 9.70183 3.5 10.0996 3.5H13.9004C14.2982 3.5 14.6634 3.50264 15 3.50488V2.5C15 1.94772 15.4477 1.5 16 1.5Z", fill: "#3D3C3A" }))), nu = (n) => /* @__PURE__ */ C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ C.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ C.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "#3D3C3A" }), /* @__PURE__ */ C.createElement("path", { id: "Vector 234255039", d: "M9 12.439L11.1818 14.8564L13.0909 11.8347L14.0455 10.3238L14.5227 9.56836", stroke: "white", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }))), M_ = (n) => /* @__PURE__ */ C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ C.createElement("path", { d: "M4 12.7778L9.75048 19.4689C9.97414 19.7292 10.3875 19.6919 10.561 19.3959L19 5", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round" })), Gh = (n) => /* @__PURE__ */ C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ C.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ C.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "#3D3C3A" }), /* @__PURE__ */ C.createElement("path", { id: "Vector 234255931", d: "M12 12.5V8", stroke: "white", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ C.createElement("circle", { id: "Ellipse 253668", cx: 1, cy: 1, r: 1, transform: "matrix(1 0 0 -1 11 17)", fill: "white" }))), __ = (n) => /* @__PURE__ */ C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ C.createElement("g", { id: "24_icon-fill/clock" }, /* @__PURE__ */ C.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5ZM12 6.2002C11.5582 6.2002 11.2002 6.55817 11.2002 7V12C11.2002 12.281 11.3479 12.541 11.5889 12.6855L14.0889 14.1855C14.4677 14.4127 14.9583 14.2899 15.1855 13.9111C15.4127 13.5323 15.2899 13.0417 14.9111 12.8145L12.7998 11.5469V7C12.7998 6.55817 12.4418 6.2002 12 6.2002Z", fill: "currentColor" }))), R_ = (n) => /* @__PURE__ */ C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ C.createElement("g", { id: "24_icon-fill/heart" }, /* @__PURE__ */ C.createElement("path", { id: "Vector", fillRule: "evenodd", clipRule: "evenodd", d: "M12 6.34213C13.1016 4.86137 14.8294 3.86287 16.9203 4.05233C19.9439 4.3263 22.0001 6.73448 22.0001 9.87524C22.0001 12.7458 20.4285 15.1633 18.5183 16.9571C16.6026 18.756 14.2269 20.0464 12.319 20.6691C12.1117 20.7368 11.8884 20.7368 11.6811 20.6691C9.77325 20.0464 7.39752 18.756 5.48179 16.9571C3.57156 15.1633 2 12.7458 2 9.87524C2 6.73448 4.05617 4.3263 7.07975 4.05233C9.17073 3.86287 10.8984 4.86142 12 6.34213Z", fill: "currentColor" }))), D_ = (n) => /* @__PURE__ */ C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ C.createElement("g", { id: "24_icon-fill/cup" }, /* @__PURE__ */ C.createElement("path", { id: "Vector", fillRule: "evenodd", clipRule: "evenodd", d: "M12.9992 3.02148C17.9698 3.02148 21.9992 5.27629 21.9992 8.05772C21.9992 12.0867 20.9992 21.1519 12.9992 21.1519C9.14215 21.1518 6.91501 19.043 5.63991 16.4088L4.98464 16.5417C2.90427 16.9606 0.88686 15.5799 0.507098 13.4776C0.136993 11.4266 1.46695 9.45421 3.49635 9.04529L4.01491 8.94004C4.0039 8.6258 3.99928 8.33024 3.99928 8.05772C3.99928 5.27633 8.02884 3.02156 12.9992 3.02148ZM3.88796 11.0204C2.92844 11.2139 2.30006 12.1467 2.47487 13.1166C2.65441 14.111 3.60814 14.7636 4.59206 14.5654L4.89284 14.5045C4.52286 13.3122 4.29975 12.0906 4.16823 10.9634L3.88796 11.0204ZM12.9992 5.03598C9.13341 5.03604 5.99928 6.38889 5.99928 8.05772C5.99928 9.72654 9.13341 11.0794 12.9992 11.0795C16.8652 11.0795 19.9992 9.72657 19.9992 8.05772C19.9992 6.38886 16.8652 5.03598 12.9992 5.03598Z", fill: "currentColor" }))), N_ = (n) => /* @__PURE__ */ C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ C.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ C.createElement("path", { id: "Vector 234255937", d: "M3.52765 9.90413C0.911528 15.9537 3.96635 21.1957 8.35342 22.5511C8.84167 22.702 9.19067 22.0789 8.92321 21.6434C8.19965 20.4654 7.47887 18.5753 8.56051 16.6478C8.64224 16.5022 8.85072 16.5146 8.93197 16.6605C9.95802 18.5031 10.9317 18.5031 10.9317 18.5031C10.9317 18.5031 8.86679 14.8896 11.7788 12.1893C11.8911 12.0851 12.0723 12.1349 12.1315 12.2762C13.3539 15.1909 17.8248 17.3143 14.8582 21.9344C14.6119 22.3181 14.8717 22.8388 15.3226 22.7712C20.4424 22.0038 22.208 16.0069 20.1757 11.4342C18.0862 6.73288 13.4876 7.04975 11.6828 2.26117C11.5637 1.9453 11.198 1.78379 10.9122 1.96333C7.99596 3.79495 6.34996 7.94875 7.37329 13.0655C6.01592 12.7262 5.08207 11.1162 4.57178 9.95361C4.37654 9.50881 3.72046 9.45827 3.52765 9.90413Z", fill: "currentColor" }))), y3 = (n) => /* @__PURE__ */ C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ C.createElement("g", { id: "24_icon-fill/cross" }, /* @__PURE__ */ C.createElement("path", { id: "Vector", d: "M16.2929 6.06242C16.6834 5.6719 17.3164 5.67191 17.707 6.06242C18.0975 6.45295 18.0975 7.08596 17.707 7.47649L13.414 11.7695L17.707 16.0624C18.0975 16.4529 18.0975 17.086 17.707 17.4765C17.3164 17.867 16.6834 17.867 16.2929 17.4765L11.9999 13.1835L7.70696 17.4765C7.31643 17.867 6.68342 17.867 6.29289 17.4765C5.90238 17.086 5.90237 16.4529 6.29289 16.0624L10.5859 11.7695L6.29289 7.47649C5.90237 7.08596 5.90237 6.45295 6.29289 6.06242C6.68342 5.6719 7.31643 5.6719 7.70696 6.06242L11.9999 10.3554L16.2929 6.06242Z", fill: "#3D3C3A" }))), g3 = (n) => /* @__PURE__ */ C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ C.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ C.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "currentColor" }), /* @__PURE__ */ C.createElement("path", { id: "Vector 234255931", d: "M12 12V16", stroke: "var(--background)", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ C.createElement("circle", { id: "Ellipse 253668", cx: 12, cy: 8.5, r: 1, fill: "var(--background)" }))), Ks = (n) => /* @__PURE__ */ C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ C.createElement("g", { id: "24_icon-fill/plus" }, /* @__PURE__ */ C.createElement("path", { id: "Vector", transform: "translate(5 4.769)", d: "M6 13C6 13 6 8 6 8C6 8 1 8 1 8C0.448 8 0 7.552 0 7C0 6.448 0.448 6 1 6C1 6 6 6 6 6C6 6 6 1 6 1C6 0.448 6.448 0 7 0C7.552 0 8 0.448 8 1C8 1 8 6 8 6C8 6 13 6 13 6C13.552 6 14 6.448 14 7C14 7.552 13.552 8 13 8C13 8 8 8 8 8C8 8 8 13 8 13C8 13.552 7.552 14 7 14C6.448 14 6 13.552 6 13Z", fill: "currentColor" }))), O_ = (n) => /* @__PURE__ */ C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ C.createElement("path", { d: "M16.5791 4.53223C18.0851 4.53223 18.8049 4.65337 19.5361 5.04297C20.1593 5.3751 20.654 5.86826 20.9873 6.48926C21.3783 7.21793 21.5 7.93502 21.5 9.43555V14.7383C21.5 16.2388 21.3783 16.9559 20.9873 17.6846C20.654 18.3056 20.1593 18.7987 19.5361 19.1309C18.8049 19.5205 18.0851 19.6416 16.5791 19.6416H7.4209C5.91493 19.6416 5.19509 19.5205 4.46387 19.1309C3.84066 18.7987 3.34603 18.3056 3.0127 17.6846C2.62169 16.9559 2.50002 16.2388 2.5 14.7383V9.43555C2.50003 7.93502 2.62167 7.21793 3.0127 6.48926C3.34603 5.86826 3.84066 5.3751 4.46387 5.04297C5.19509 4.65337 5.91494 4.53223 7.4209 4.53223H16.5791ZM10.1436 9.44043C9.76724 8.73388 8.75424 8.73388 8.37793 9.44043L5.78223 14.3125C5.42805 14.9784 5.91082 15.7829 6.66504 15.7832H17.0791C17.8878 15.7831 18.3617 14.8726 17.8984 14.21L16.2656 11.877C15.8829 11.3303 15.0819 11.3051 14.665 11.8262L12.998 13.9092C12.8634 14.0774 12.6005 14.0532 12.499 13.8633L10.1436 9.44043Z", fill: "currentColor" })), L_ = (n) => /* @__PURE__ */ C.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ C.createElement("path", { d: "M14.0996 3.5C16.3398 3.5 17.4608 3.49957 18.3164 3.93555C19.0689 4.31902 19.681 4.93109 20.0645 5.68359C20.5004 6.53924 20.5 7.66018 20.5 9.90039V14.0996C20.5 16.3398 20.5004 17.4608 20.0645 18.3164C19.681 19.0689 19.0689 19.681 18.3164 20.0645C17.4608 20.5004 16.3398 20.5 14.0996 20.5H9.90039C7.66018 20.5 6.53924 20.5004 5.68359 20.0645C4.93109 19.681 4.31902 19.0689 3.93555 18.3164C3.49957 17.4608 3.5 16.3398 3.5 14.0996V9.90039C3.5 7.66018 3.49957 6.53924 3.93555 5.68359C4.31902 4.93109 4.93109 4.31902 5.68359 3.93555C6.53924 3.49957 7.66018 3.5 9.90039 3.5H14.0996ZM9.5 8.2002C9.05817 8.2002 8.7002 8.55817 8.7002 9C8.7002 9.44183 9.05817 9.7998 9.5 9.7998H11.2002V15.5C11.2002 15.9418 11.5582 16.2998 12 16.2998C12.4418 16.2998 12.7998 15.9418 12.7998 15.5V9.7998H14.5C14.9418 9.7998 15.2998 9.44183 15.2998 9C15.2998 8.55817 14.9418 8.2002 14.5 8.2002H9.5Z", fill: "currentColor" })), $_ = {
  success: nu,
  error: Gh,
  warning: Gh,
  info: g3
};
let qc = null, M2 = !1;
const Xh = [];
function k_() {
  const n = CM();
  return C.useEffect(() => (qc = n.show, Xh.length && Xh.splice(0).forEach((t) => n.show(t)), () => {
    qc = null;
  })), null;
}
function B_() {
  if (M2 || typeof document > "u") return;
  M2 = !0;
  const n = document.createElement("div");
  n.setAttribute("data-aiwa-toast-host", ""), document.body.appendChild(n), Ds.createRoot(n).render(
    /* @__PURE__ */ h.jsx(l3, { children: /* @__PURE__ */ h.jsx(c3, { children: /* @__PURE__ */ h.jsx(k_, {}) }) })
  );
}
function v3(n, t = {}) {
  const i = typeof n == "string" ? { title: n, ...t } : { ...n };
  if (i.type && !i.icon) {
    const l = $_[i.type];
    l && (i.icon = /* @__PURE__ */ h.jsx(l, { className: "aiwa-toast-icon" }));
  }
  return B_(), qc ? qc(i) : (Xh.push(i), null);
}
function V_() {
  typeof window < "u" && (window.aiwaToast = v3);
}
const Zn = (n, ...t) => {
  const i = window[n];
  return typeof i == "function" ? i(...t) : void 0;
}, Ve = (n, ...t) => {
  const i = window[n];
  return typeof i == "function" ? i(...t) : null;
}, Yt = (n, t = {}) => {
  const i = Ve("aiwaApi", n, t);
  return i && typeof i.then == "function" ? i : Promise.reject(new Error("API bridge is unavailable"));
}, Mt = (n, t = {}) => v3(n, t), b3 = async (n, ...t) => {
  const i = await Ve(n, ...t);
  if (i && typeof i == "object" && i.ok === !0) return i;
  const l = i && typeof i == "object" ? i.message || i.text || i.error?.message : "";
  throw new Error(l || "Не удалось подтвердить сохранение. Попробуй ещё раз.");
}, Kh = (n) => `${Math.round(Number(n) || 0).toLocaleString("ru-RU")} ккал`, x3 = (n) => Zn("track", n), z_ = () => {
  const n = window.Telegram?.WebApp;
  n?.close && n.close();
}, Zs = async ({ nudge: n = !0, topic: t = "" } = {}) => {
  n && await Promise.race([
    Yt("/api/nudge", t ? { topic: t } : {}).catch(() => null),
    new Promise((c) => setTimeout(c, 2e3))
  ]);
  const i = window.Telegram?.WebApp, l = Ve("aiwaData")?.bot_username, o = typeof i?.openTelegramLink == "function" && (typeof i.isVersionAtLeast != "function" || i.isVersionAtLeast("6.1"));
  l && o && i.openTelegramLink(`https://t.me/${l}`), z_();
}, U_ = () => {
  const n = window.Telegram?.WebApp;
  return typeof n?.showPopup != "function" ? !1 : typeof n.isVersionAtLeast != "function" || n.isVersionAtLeast("6.2");
}, le = (n, t) => ({
  "aria-label": n,
  onClick: t,
  onKeyDown: (i) => {
    (i.key === "Enter" || i.key === " ") && (i.preventDefault(), t());
  },
  role: "button",
  tabIndex: 0
});
function S3() {
  const n = window.Telegram?.WebApp;
  if (Mt("Выписка готова и отправлена в чат бота.", { type: "success" }), typeof n?.showPopup == "function")
    try {
      n.showPopup({
        title: "Выписка готова",
        message: "PDF уже отправлен в чат. Нажми «ОК», чтобы вернуться к нему.",
        buttons: [{ id: "ok", type: "ok" }]
      }, () => n.close?.());
      return;
    } catch {
    }
  setTimeout(() => {
    try {
      n?.close?.();
    } catch {
    }
  }, 2200);
}
function Qe() {
  const n = typeof window.aiwaData == "function" ? window.aiwaData() : window.aiwaData, t = String(n?.today || "");
  if (/^\d{4}-\d{2}-\d{2}$/.test(t)) return t;
  const i = Object.fromEntries(
    new Intl.DateTimeFormat("en", { timeZone: "Europe/Moscow", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(/* @__PURE__ */ new Date()).filter((l) => l.type !== "literal").map((l) => [l.type, l.value])
  );
  return `${i.year}-${i.month}-${i.day}`;
}
const H_ = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"], q_ = (n = 30) => {
  const t = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    const l = /* @__PURE__ */ new Date(`${Qe()}T12:00:00`);
    l.setDate(l.getDate() - i);
    const o = `${l.getFullYear()}-${String(l.getMonth() + 1).padStart(2, "0")}-${String(l.getDate()).padStart(2, "0")}`;
    t.push({ iso: o, date: String(l.getDate()), label: H_[l.getDay()], today: i === 0 });
  }
  return t;
}, Y_ = /^\d{4}-\d{2}-\d{2}$/, P_ = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  timeZone: "Europe/Moscow"
}), w3 = Qe, C3 = (n) => {
  const t = String(n || "");
  if (!Y_.test(t)) return "";
  const i = /* @__PURE__ */ new Date(`${t}T00:00:00Z`);
  return !Number.isNaN(i.getTime()) && i.toISOString().slice(0, 10) === t ? t : "";
}, or = (n) => {
  const t = C3(n), i = Qe();
  return t && t <= i ? t : "";
}, Or = (n) => {
  const t = C3(n);
  if (!t) return "";
  const i = /* @__PURE__ */ new Date(`${t}T12:00:00+03:00`);
  return Number.isNaN(i.getTime()) ? "" : P_.format(i);
}, Zh = /* @__PURE__ */ new Set();
let Ac = "";
const cr = () => {
  const n = or(Ve("aiwaSelectedDay")), t = or(Ac);
  return n || t || Qe();
}, G_ = () => {
  const n = Ve("aiwaDayStrip");
  return Array.isArray(n) && n.length ? n : q_(30);
};
function T3(n) {
  const t = or(n);
  if (!t) return cr();
  const i = typeof window.aiwaSelectedDay == "function", l = typeof window.aiwaSelectDay == "function";
  return t === cr() && (i || !l) ? cr() : (Zn("aiwaSelectDay", t), Ac = or(Ve("aiwaSelectedDay")) || (i ? or(Ac) || Qe() : t), Zh.forEach((c) => c()), Ac);
}
const X_ = (n) => (Zh.add(n), () => {
  Zh.delete(n);
});
function mp() {
  return C.useSyncExternalStore(X_, cr, cr);
}
function pp({ title: n, size: t = "regular", ...i }) {
  return t === "large" ? /* @__PURE__ */ h.jsx("div", { className: "aiwa-panel-header is-large", children: /* @__PURE__ */ h.jsx(pt, { as: "h1", variant: "title1", weight: "bold", children: n }) }) : /* @__PURE__ */ h.jsx("div", { className: "aiwa-panel-header", children: /* @__PURE__ */ h.jsx(HE, { ...i, children: n }) });
}
function j3() {
  const n = typeof window > "u" ? {} : window, t = typeof n.aiwaData == "function" ? n.aiwaData() : n.aiwaData, i = n.Telegram?.WebApp?.initDataUnsafe?.user;
  return (t?.name || i?.first_name || "").trim();
}
function A3({ className: n = "", onClick: t, label: i = "Открыть профиль" }) {
  const c = (typeof window > "u" ? {} : window).Telegram?.WebApp?.initDataUnsafe?.user?.photo_url, u = (j3()[0] || "•").toUpperCase(), d = `aiwa-avatar-initial${n ? ` ${n}` : ""}`, p = /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
    u,
    c ? /* @__PURE__ */ h.jsx(
      "img",
      {
        className: "aiwa-avatar-photo",
        src: c,
        alt: "",
        onError: (y) => {
          y.currentTarget.style.display = "none";
        }
      }
    ) : null
  ] });
  return t ? /* @__PURE__ */ h.jsx("button", { type: "button", className: d, "aria-label": i, onClick: t, children: p }) : /* @__PURE__ */ h.jsx("span", { className: d, "aria-hidden": "true", children: p });
}
const K_ = 50;
let _2 = -1 / 0;
function Z_() {
  if (typeof window > "u") return;
  if (typeof window.haptic == "function") {
    window.haptic("impact", "light");
    return;
  }
  const n = performance.now();
  if (n - _2 < K_) return;
  _2 = n;
  const t = window.Telegram?.WebApp;
  if (t?.HapticFeedback && !(t.isVersionAtLeast && !t.isVersionAtLeast("6.1")))
    try {
      t.HapticFeedback.impactOccurred("light");
    } catch {
    }
}
const Q_ = 140;
function F_({ days: n, selectedIso: t = "", onSelect: i, onTick: l, onReset: o, dragAreaRef: c }) {
  const u = C.useRef(null), d = c || u, p = (n || []).filter((U) => !U.disabled), y = p.map((U) => U.iso).join("|"), g = `${t}\0${y}`, v = p.findIndex((U) => U.iso === t), b = (v >= 0 ? v : p.length - 1) + 1, j = p[b - 1]?.iso || "", [w, T] = C.useState(() => ({ key: g, value: b })), x = w.key === g ? w.value : b, A = p[x - 1], _ = C.useRef(null);
  _.current = { openable: p, selectedIso: t, onSelect: i, onReset: o, controlKey: g };
  const E = C.useRef(j), M = C.useRef(0), O = C.useRef(!1), D = C.useRef(null), N = (U, F) => {
    if (O.current || E.current !== U) return;
    const Y = _.current;
    if (Y.controlKey !== F) return;
    const st = Y.openable.find((J) => J.iso === U);
    if (!st || st.iso === Y.selectedIso || typeof Y.onSelect != "function") return;
    const I = Y.onSelect(st);
    if (typeof I != "string" || I === st.iso) return;
    let $ = Y.openable.findIndex((J) => J.iso === I);
    $ < 0 && ($ = Y.openable.findIndex((J) => J.iso === Y.selectedIso)), $ < 0 && ($ = Y.openable.length - 1);
    const X = Y.openable[$]?.iso || "";
    E.current = X, T({ key: F, value: $ + 1 }), typeof Y.onReset == "function" && Y.onReset();
  }, V = (U, F = g) => {
    clearTimeout(M.current), M.current = setTimeout(() => N(U, F), Q_);
  };
  D.current = V, C.useEffect(() => () => clearTimeout(M.current), []), C.useLayoutEffect(() => {
    E.current = j, clearTimeout(M.current);
  }, [j, g]), C.useEffect(() => {
    const U = d.current;
    if (!U) return;
    const F = () => {
      O.current = !0, clearTimeout(M.current);
    }, Y = () => {
      if (!O.current) return;
      O.current = !1;
      const st = E.current;
      st && D.current?.(st, _.current.controlKey);
    };
    return U.addEventListener("pointerdown", F), window.addEventListener("pointerup", Y), window.addEventListener("pointercancel", Y), () => {
      U.removeEventListener("pointerdown", F), window.removeEventListener("pointerup", Y), window.removeEventListener("pointercancel", Y);
    };
  }, [d, y]);
  const H = (U) => {
    const F = p[U - 1];
    if (!F) return;
    const Y = F.iso !== E.current, st = typeof window < "u" && typeof window.aiwaSelectDay == "function";
    Y && !st && Z_(), E.current = F.iso, T({ key: g, value: U }), typeof l == "function" && l(F), V(F.iso);
  };
  if (!p.length) return null;
  const B = /* @__PURE__ */ h.jsx(
    j_,
    {
      className: "aiwa-day-wheel",
      value: x,
      max: p.length,
      onChange: H,
      formatTick: (U) => p[U - 1]?.date,
      showValue: !1,
      showLimits: !1,
      indicator: "label",
      ariaLabel: "Выбор дня",
      ariaValueText: Or(A?.iso),
      dragAreaRef: d,
      enableHaptic: !1
    }
  );
  return c ? B : /* @__PURE__ */ h.jsx("div", { className: "aiwa-day-wheel-area", ref: u, children: B });
}
function I_(n) {
  const {
    days: t,
    selectedIso: i = "",
    heroValue: l,
    heroLabel: o = "",
    onSelect: c,
    previewDay: u,
    hero: d
  } = n, p = C.useRef(null), [y, g] = C.useState(null), v = C.useRef(null), b = (t || []).find((T) => T.today)?.iso;
  b && i === b && (v.current = { value: l, label: o }), C.useEffect(() => {
    g(null);
  }, [i]);
  const j = (T) => {
    if (typeof d == "function") {
      g({ baseIso: i, iso: T.iso });
      return;
    }
    const x = T.iso === b && v.current ? v.current : typeof u == "function" ? u(T.iso) : null;
    g(x ? {
      baseIso: i,
      iso: T.iso,
      value: x.value,
      label: x.label
    } : null);
  }, w = y?.baseIso === i && y.iso !== i ? y : null;
  return /* @__PURE__ */ h.jsxs("div", { className: "aiwa-day-overview", ref: p, children: [
    /* @__PURE__ */ h.jsx(
      F_,
      {
        days: t,
        selectedIso: i,
        onSelect: c,
        onTick: j,
        onReset: () => g(null),
        dragAreaRef: p
      }
    ),
    typeof d == "function" ? d(w ? w.iso : i) : /* @__PURE__ */ h.jsxs("div", { className: "aiwa-countdown", children: [
      /* @__PURE__ */ h.jsx(pt, { variant: "title1", weight: "semibold", children: /* @__PURE__ */ h.jsx(Xs, { variant: "number", animation: "snappy", children: w ? w.value : l }) }),
      /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: /* @__PURE__ */ h.jsx(Xs, { variant: "text", animation: "snappy", children: (w ? w.label : o) || "" }) })
    ] })
  ] });
}
function yp({
  title: n,
  days: t,
  selectedIso: i,
  onSelect: l,
  previewDay: o,
  heroValue: c,
  heroLabel: u,
  hero: d,
  action: p,
  onProfile: y,
  onCalendar: g
}) {
  const v = mp(), b = i ?? v;
  return /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
    /* @__PURE__ */ h.jsx(
      pp,
      {
        title: n || Or(b),
        left: /* @__PURE__ */ h.jsx(A3, {}),
        onLeft: y,
        leftAriaLabel: "Открыть профиль",
        right: /* @__PURE__ */ h.jsx(E_, {}),
        onRight: g,
        rightAriaLabel: "Открыть календарь"
      }
    ),
    /* @__PURE__ */ h.jsxs("div", { className: "aiwa-overview", children: [
      /* @__PURE__ */ h.jsx(
        I_,
        {
          days: t ?? G_(),
          selectedIso: b,
          heroValue: c,
          heroLabel: u,
          hero: d,
          previewDay: o,
          onSelect: l ?? ((j) => T3(j.iso))
        }
      ),
      p
    ] })
  ] });
}
const au = [
  ["Боль", [["cramps", "Спазмы"], ["head", "Голова"], ["breast", "Грудь"]]],
  ["Настроение", [["irrit", "Раздражительность"], ["anx", "Тревога"], ["low", "Апатия"]]],
  ["Тело", [["tired", "Усталость"], ["bloat", "Вздутие"], ["sweet", "Тянет на сладкое"]]],
  ["Кожа и сон", [["skin", "Высыпания"], ["insomnia", "Плохой сон"]]]
], Qh = {
  // One line each at the bar width: a wrapped hint pushes the bar over the grid.
  period: { label: "Месячные", hint: "нажми на день, чтобы отметить месячные", checked: (n) => n.actualPeriod },
  symptoms: { label: "Симптомы", hint: "нажми на день, чтобы записать симптомы", checked: (n) => n.logged },
  intimacy: { label: "Близость", hint: "нажми на день, чтобы отметить близость", checked: (n) => n.intimacy }
}, J_ = (n) => n.map((t) => ({ value: t, label: Qh[t].label })), W_ = [
  { label: "Месячные", variant: "tinted", token: "--aiwa-phase-menstrual" },
  { label: "Прогноз", variant: "outlined", token: "--aiwa-phase-menstrual" },
  { label: "Овуляция", variant: "tinted", token: "--aiwa-phase-ovulation" },
  { label: "Фолликулярная", variant: "tinted", token: "--aiwa-phase-follicular" },
  { label: "Лютеиновая", variant: "tinted", token: "--aiwa-phase-luteal" },
  { label: "Близость", variant: "tinted", token: "--aiwa-intimacy" }
], E3 = [[1, "Низкая"], [2, "Средняя"], [3, "Высокая"]], M3 = [[1, "Плохое"], [2, "Нормальное"], [3, "Хорошее"]], _3 = [
  { value: "breakfast", label: "Завтрак" },
  { value: "lunch", label: "Обед" },
  { value: "snack", label: "Перекус" },
  { value: "dinner", label: "Ужин" }
], t7 = (n) => ({
  title: n?.title || "",
  kcal: String(n?.kcal ?? ""),
  grams: String(n?.grams ?? ""),
  protein: String(n?.protein ?? ""),
  fat: String(n?.fat ?? ""),
  carbs: String(n?.carbs ?? ""),
  slot: n?.slot || "snack"
}), R2 = ["Силовая", "Кардио", "Пилатес", "Йога", "Ходьба", "Плавание", "Своё"], Ti = {
  Ноги: ["Присед", "Жим ногами", "Выпады", "Болгарские", "Румынская тяга", "Разгибания", "Сгибания", "Икры"],
  Спина: ["Вертикальная тяга", "Горизонтальная тяга", "Тяга в наклоне", "Становая", "Подтягивания", "Гиперэкстензия"],
  Грудь: ["Жим лёжа", "Жим гантелей", "Жим в наклоне", "Сведения", "Отжимания"],
  Плечи: ["Жим стоя", "Махи в стороны", "Махи в наклоне", "Протяжка"],
  Ягодицы: ["Ягодичный мост", "Отведение бедра", "Мах ногой", "Плие-присед"],
  Руки: ["Бицепс", "Молоток", "Разгибания трицепс", "Французский жим"],
  Кор: ["Планка", "Скручивания", "Подъём ног", "Русский твист"]
}, e7 = {
  Силовая: [],
  Кардио: ["Бег", "Велотренажёр", "Эллипс", "Гребля", "Скакалка"],
  Пилатес: ["Мат", "Реформер", "Мобилити", "Кор"],
  Йога: ["Виньяса", "Хатха", "Растяжка", "Дыхание"],
  Ходьба: ["Прогулка", "Скандинавская", "Быстрая ходьба"],
  Плавание: ["Кроль", "Брасс", "На спине"],
  Своё: []
}, Fh = [
  { value: "cycle", label: "Регулярный цикл" },
  { value: "fit", label: "Питание и нагрузка" },
  { value: "irregular", label: "Нерегулярный" },
  { value: "preg", label: "Беременность" },
  { value: "meno", label: "Менопауза" },
  { value: "none", label: "Нет месячных" },
  { value: "male", label: "Мужской режим" }
];
function n7(n, ...t) {
  C.useEffect(() => {
    const i = n.current;
    if (!i) return;
    const l = (o) => {
      if (o.ctrlKey || Math.abs(o.deltaX) > Math.abs(o.deltaY)) return;
      const c = i.scrollWidth - i.clientWidth;
      if (c <= 0) return;
      const u = Math.min(c, Math.max(0, i.scrollLeft + o.deltaY));
      u !== i.scrollLeft && (i.scrollLeft = u, o.preventDefault());
    };
    return i.addEventListener("wheel", l, { passive: !1 }), () => i.removeEventListener("wheel", l);
  }, [n, ...t]);
}
const D2 = "custom:";
function a7(n) {
  const t = n?.length ? n.flatMap(([, i]) => i) : au.flatMap(([, i]) => i.flat());
  return new Map(t);
}
function i7({ title: n = "Сегодня", checkin: t, symptomGroups: i, onSelect: l }) {
  const o = t?.symptoms ?? [], c = C.useRef(null);
  if (n7(c, o.length), !o.length) return null;
  const u = a7(i), d = l ?? (() => Zn("openHomePanel", "journal"));
  return /* @__PURE__ */ h.jsxs("div", { className: "aiwa-today", children: [
    /* @__PURE__ */ h.jsx(pt, { className: "aiwa-today-title", variant: "body", weight: "semibold", children: n }),
    /* @__PURE__ */ h.jsx("div", { className: "aiwa-today-chips", role: "group", "aria-label": n, ref: c, children: o.map((p) => {
      const y = p.startsWith(D2) ? p.slice(D2.length) : u.get(p) ?? p;
      return /* @__PURE__ */ h.jsx(
        nn,
        {
          as: "button",
          type: "button",
          mode: "opacity",
          className: "aiwa-today-chip",
          onClick: () => d(p),
          title: y,
          children: /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: y })
        },
        p
      );
    }) })
  ] });
}
const N2 = {
  primary: "filled",
  secondary: "filled",
  secondaryCanvas: "filled",
  outlined: "outlined"
};
function Te({
  variant: n = "primary",
  className: t,
  disabled: i = !1,
  loading: l = !1,
  label: o,
  onClick: c,
  onKeyDown: u,
  "aria-label": d,
  ...p
}) {
  const y = i || l, g = y ? void 0 : (v) => {
    typeof u == "function" && u(v), !(v.defaultPrevented || typeof c != "function") && (v.key === "Enter" || v.key === " ") && (v.preventDefault(), c(v));
  };
  return /* @__PURE__ */ h.jsx(
    ti,
    {
      ...p,
      ...t ? { className: t } : {},
      variant: N2[n] || N2.primary,
      label: l ? /* @__PURE__ */ h.jsxs("span", { className: "aiwa-button-spinner", children: [
        /* @__PURE__ */ h.jsx(eu, { size: 20, focusable: "false", "aria-hidden": "true" }),
        /* @__PURE__ */ h.jsxs("span", { className: "aiwa-visually-hidden", children: [
          o,
          /* @__PURE__ */ h.jsx("span", { children: " — выполняется" })
        ] })
      ] }) : o,
      "data-aiwa-button-variant": n,
      "data-loading": l || void 0,
      disabled: y || void 0,
      role: "button",
      tabIndex: y ? -1 : 0,
      "aria-disabled": y || void 0,
      "aria-busy": l || void 0,
      "aria-label": l && d ? `${d} — выполняется` : d,
      onClick: y ? void 0 : c,
      onKeyDown: g
    }
  );
}
const s7 = 5e3, R3 = (n, t) => Array.from(
  { length: t },
  (i, l) => `/assets/${n}/frame-${String(l).padStart(3, "0")}.png`
), l7 = R3("aiwa-sequence", 182), gp = R3("aiwa-card-sequence", 193);
function vp({ size: n, frames: t = l7, pauseMs: i = s7 }) {
  return /* @__PURE__ */ h.jsx(
    "span",
    {
      className: "aiwa-sequence",
      style: { "--aiwa-sequence-size": `${n}px` },
      "data-aiwa-sequence": "true",
      "data-sequence": t === gp ? "card" : "default",
      "data-pause-ms": i,
      "data-frame": 0,
      "aria-hidden": "true",
      children: /* @__PURE__ */ h.jsx("img", { src: t[0], alt: "", draggable: "false", decoding: "sync" })
    }
  );
}
function r7() {
  return /* @__PURE__ */ h.jsxs("div", { className: "aiwa-paper-ai-heading", children: [
    /* @__PURE__ */ h.jsx(vp, { size: 58, frames: gp, pauseMs: 0 }),
    /* @__PURE__ */ h.jsx("div", { children: /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "semibold", children: "Айва AI" }) })
  ] });
}
function o7(n) {
  return /* @__PURE__ */ h.jsx(ga, { ...n, "data-aiwa-cell": "true" });
}
const Tt = Object.assign(o7, {
  Start: ga.Start,
  End: ga.End,
  Part: ga.Part,
  Text: ga.Text,
  Editable: ga.Editable,
  Switch: ga.Switch
});
function Cr({
  message: n,
  detail: t,
  onDiscuss: i,
  chip: l = "",
  className: o = ""
}) {
  return /* @__PURE__ */ h.jsx(vt.Item, { className: `aiwa-insight-section ${o}`.trim(), children: /* @__PURE__ */ h.jsx(Tt, { "data-aiwa-insight-cell": "true", tappable: !1, children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-insight-content", children: [
    /* @__PURE__ */ h.jsx(r7, {}),
    l ? /* @__PURE__ */ h.jsx("span", { className: "aiwa-insight-chip", children: l }) : null,
    /* @__PURE__ */ h.jsx(pt, { className: "aiwa-insight-message", variant: "body", weight: "regular", children: n }),
    t ? /* @__PURE__ */ h.jsx(pt, { className: "aiwa-insight-detail", variant: "body", weight: "regular", children: t }) : null,
    i ? /* @__PURE__ */ h.jsx(
      Te,
      {
        variant: "secondary",
        label: "Обсудить с Айвой",
        isFill: !0,
        onClick: i
      }
    ) : null
  ] }) }) });
}
function c7({ aiText: n, aiChip: t = "" }) {
  return /* @__PURE__ */ h.jsx(
    Cr,
    {
      message: n,
      chip: t,
      onDiscuss: () => Zs()
    }
  );
}
function u7({ delay: n }) {
  return n ? /* @__PURE__ */ h.jsxs(vt.Item, { header: n.title, children: [
    /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsx(Tt.Text, { title: n.message, description: n.hint }) }),
    n.canSwitchToPregnancy ? /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ h.jsx(
      ti,
      {
        variant: "filled",
        label: "Перейти в режим беременности",
        isFill: !0,
        ...le("Перейти в режим беременности", () => Zn("switchPreg"))
      }
    ) }) }) : null
  ] }) : null;
}
function O2({ ok: n, pending: t = !1 }) {
  const i = t ? __ : n ? nu : Gh, l = t ? "aiwa-status is-pending" : n ? "aiwa-status is-ok" : "aiwa-status is-alert", o = t ? "Рассчитывается" : n ? "В пределах нормы" : "Требует внимания";
  return /* @__PURE__ */ h.jsx("span", { className: l, role: "img", "aria-label": o, children: /* @__PURE__ */ h.jsx(i, {}) });
}
const f7 = "Рассчитывается", d7 = (n) => {
  const t = String(n ?? "").trim();
  return !t || t === "—" || t === "–" || t === "-";
};
function h7({ label: n, value: t, ok: i }) {
  const l = d7(t), o = i ? "Значение в пределах нормы" : "Значения вышли за пределы нормы";
  return /* @__PURE__ */ h.jsx(
    Tt,
    {
      "data-aiwa-metric-cell": "true",
      tappable: !1,
      end: l ? /* @__PURE__ */ h.jsx(O2, { pending: !0 }) : /* @__PURE__ */ h.jsx(l_, { content: o, placement: "auto", children: /* @__PURE__ */ h.jsx("span", { className: "aiwa-metric-status-hit", children: /* @__PURE__ */ h.jsx(O2, { ok: i }) }) }),
      children: /* @__PURE__ */ h.jsx(Tt.Text, { title: n, description: l ? f7 : t })
    }
  );
}
function m7({ metrics: n, title: t = "Статистика" }) {
  return n?.length ? /* @__PURE__ */ h.jsx(vt.Item, { header: t, children: n.map((i) => /* @__PURE__ */ h.jsx(h7, { ...i }, i.label)) }) : null;
}
const p7 = C.lazy(() => import("./AiwaWebUiChart-aiwa-v187.js?v=r46").then((n) => ({
  default: n.AiwaWebUiChart
})));
function y7() {
  return /* @__PURE__ */ h.jsx("div", { className: "aiwa-area-chart-state is-loading", role: "status", "aria-label": "График загружается", children: /* @__PURE__ */ h.jsx("span", { className: "aiwa-area-chart-skeleton", "aria-hidden": "true" }) });
}
function L2({ title: n }) {
  return /* @__PURE__ */ h.jsxs("section", { className: "aiwa-chart-loading-section", children: [
    /* @__PURE__ */ h.jsx(
      pt,
      {
        as: "p",
        className: "aiwa-chart-loading-title",
        variant: "body",
        weight: "semibold",
        children: n
      }
    ),
    /* @__PURE__ */ h.jsx(y7, {})
  ] });
}
function g7({
  data: n,
  series: t,
  xKey: i,
  band: l = null,
  loading: o = !1,
  title: c = "Динамика цикла",
  emptyText: u = "Продолжай вести дневник, чтобы увидеть динамику цикла"
}) {
  return o ? /* @__PURE__ */ h.jsx(L2, { title: c }) : /* @__PURE__ */ h.jsx(C.Suspense, { fallback: /* @__PURE__ */ h.jsx(L2, { title: c }), children: /* @__PURE__ */ h.jsx(vt.Item, { header: c, children: /* @__PURE__ */ h.jsx(
    p7,
    {
      data: n,
      series: t,
      xKey: i,
      band: l,
      ariaLabel: c,
      emptyText: u
    }
  ) }) });
}
function v7({
  history: n,
  title: t = "История цикла",
  emptyTitle: i = "История пока пуста",
  emptyDescription: l = "Она появится после первой сохранённой менструации."
}) {
  const [o, c] = C.useState(!1), u = n || [], d = o ? u : u.slice(0, 3);
  return /* @__PURE__ */ h.jsxs(vt.Item, { header: t, children: [
    d.length ? d.map((p) => /* @__PURE__ */ h.jsx(Tt, { "data-aiwa-history-cell": "true", tappable: !1, children: /* @__PURE__ */ h.jsx(Tt.Text, { title: p.title, description: p.description }) }, p.key)) : /* @__PURE__ */ h.jsx(Tt, { "data-aiwa-history-cell": "true", tappable: !1, children: /* @__PURE__ */ h.jsx(Tt.Text, { title: i, description: l }) }),
    u.length > 3 ? /* @__PURE__ */ h.jsx(
      Tt,
      {
        as: "button",
        type: "button",
        "data-aiwa-row-variant": "compact",
        "aria-expanded": o,
        onClick: () => c((p) => !p),
        children: /* @__PURE__ */ h.jsx(Tt.Text, { type: "Accent", title: o ? "Свернуть" : "Показать все" })
      }
    ) : null
  ] });
}
let Fa = null;
const Ih = /* @__PURE__ */ new Set(), $2 = () => {
  for (const n of Ih) n(!!Fa);
}, Ec = () => !!Fa, D3 = (n) => (Ih.add(n), n(!!Fa), () => Ih.delete(n)), N3 = (n) => {
  if (Fa) return { owner: !1, promise: Fa };
  const t = Promise.resolve().then(() => Yt("/api/report", { period: n })).finally(() => {
    Fa === t && (Fa = null, $2());
  });
  return Fa = t, $2(), { owner: !0, promise: t };
}, b7 = Object.fromEntries(
  au.flatMap(([, n]) => n)
), x7 = { 1: "низкая энергия", 2: "средняя энергия", 3: "высокая энергия" }, S7 = { 1: "плохое настроение", 2: "нормальное настроение", 3: "хорошее настроение" }, w7 = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }), C7 = (n) => {
  const i = b7[n] || String(n).split(":").pop().replace(/_/g, " ").trim();
  return i ? i[0].toUpperCase() + i.slice(1) : "";
}, T7 = (n) => [
  ...(n.symptoms || []).map(C7),
  x7[n.energy],
  S7[n.mood]
].filter(Boolean).map((i) => i[0].toUpperCase() + i.slice(1)).join(" • ") || "Без деталей", j7 = (n) => {
  const t = /* @__PURE__ */ new Date(`${n}T12:00:00`);
  return Number.isNaN(t.getTime()) ? n : w7.format(t);
};
function A7() {
  const [n, t] = C.useState(null), [i, l] = C.useState(!1), [o, c] = C.useState(Ec);
  C.useEffect(() => {
    Yt("/api/log_history", {}).then((p) => t(p?.items || [])).catch(() => t([]));
  }, []), C.useEffect(() => D3(c), []);
  const u = async () => {
    const { owner: p, promise: y } = N3("all");
    if (!p) return;
    const g = await y.catch(() => null);
    g?.ok && g?.delivered ? S3() : Mt(g?.text || "Выписка временно недоступна", { type: "error" });
  };
  if (!n?.length) return null;
  const d = i ? n : n.slice(0, 3);
  return /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
    /* @__PURE__ */ h.jsxs(vt.Item, { header: "Журнал симптомов", children: [
      d.map((p) => /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsx(Tt.Text, { title: j7(p.d), description: T7(p) }) }, p.d)),
      n.length > 3 ? /* @__PURE__ */ h.jsx(
        Tt,
        {
          as: "button",
          type: "button",
          "data-aiwa-row-variant": "compact",
          onClick: () => l((p) => !p),
          children: /* @__PURE__ */ h.jsx(Tt.Text, { type: "Accent", title: i ? "Свернуть" : "Показать все" })
        }
      ) : null
    ] }),
    /* @__PURE__ */ h.jsx("div", { className: "aiwa-page-action", children: /* @__PURE__ */ h.jsx(
      Te,
      {
        variant: "secondaryCanvas",
        label: "Сформировать выписку",
        loading: o,
        isFill: !0,
        ...le("Сформировать выписку", u)
      }
    ) })
  ] });
}
const eh = {
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
}, E7 = (n) => {
  let t = Math.min(Math.max(Math.round(n) || 4, 4), 40);
  for (; t > 4 && !eh[t]; ) t -= 1;
  return { week: t, name: eh[t][0], size: eh[t][1] };
};
function M7({ pregnancy: n }) {
  const [t, i] = C.useState({});
  C.useEffect(() => {
    fetch("/assets/preg/manifest.json?v=1").then((d) => d.ok ? d.json() : {}).then((d) => i(d || {})).catch(() => {
    });
  }, []);
  const l = Math.min(Math.max(Number(n?.week) || 4, 1), 40), o = E7(l), c = t[String(o.week)], u = Math.min(100, Math.max(2, l / 40 * 100));
  return /* @__PURE__ */ h.jsx(vt.Item, { header: "Срок и малыш", children: /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-preg-progress", children: [
    /* @__PURE__ */ h.jsxs("div", { className: "aiwa-preg-track", role: "img", "aria-label": `${l} неделя из 40`, children: [
      /* @__PURE__ */ h.jsx("div", { className: "aiwa-preg-fill", style: { width: `${u}%` } }),
      /* @__PURE__ */ h.jsx("span", { className: "aiwa-preg-marker", style: { left: `${u}%` } })
    ] }),
    /* @__PURE__ */ h.jsx("div", { className: "aiwa-preg-trimesters", children: [1, 2, 3].map((d) => /* @__PURE__ */ h.jsxs(
      pt,
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
    /* @__PURE__ */ h.jsxs("div", { className: "aiwa-preg-fruit", children: [
      c ? /* @__PURE__ */ h.jsx("img", { src: c, alt: "", width: "64", height: "64", loading: "lazy" }) : null,
      /* @__PURE__ */ h.jsxs("div", { children: [
        /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "semibold", children: `${l} неделя` }),
        /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: `Малыш размером с ${o.name}, ${o.size}` })
      ] })
    ] })
  ] }) }) });
}
const Us = [];
let k2 = !1;
const O3 = () => typeof window < "u" ? window.Telegram?.WebApp?.BackButton : null, _7 = () => Us[Us.length - 1]?.(), B2 = () => {
  const n = O3();
  n && (Us.length ? n.show?.() : n.hide?.());
}, R7 = (n) => {
  const t = O3();
  return t && !k2 && (t.onClick?.(_7), k2 = !0), Us.push(n), B2(), () => {
    const i = Us.lastIndexOf(n);
    i !== -1 && Us.splice(i, 1), B2();
  };
};
function L3(n, t) {
  const i = C.useRef(t);
  i.current = t, C.useEffect(() => {
    if (n)
      return R7(() => i.current?.());
  }, [n]);
}
function Bn({ isOpen: n, onClose: t, onBack: i, children: l, ...o }) {
  return L3(n, i || t), C.useEffect(() => {
    if (!n) return;
    const c = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.body.style.overflow = c;
    };
  }, [n]), n ? Dr.createPortal(
    /* @__PURE__ */ h.jsx("div", { className: "aiwa-page", role: "dialog", "aria-modal": "true", ...o, children: l }),
    document.body
  ) : null;
}
function iu({
  label: n,
  active: t = !1,
  onClick: i,
  isFill: l = !1,
  surface: o = "container",
  end: c = null,
  className: u = "",
  ...d
}) {
  const p = c ? /* @__PURE__ */ h.jsxs("span", { className: "aiwa-chip-content", children: [
    /* @__PURE__ */ h.jsx("span", { className: "aiwa-chip-label", children: n }),
    c
  ] }) : n;
  return /* @__PURE__ */ h.jsx(
    nn,
    {
      as: "button",
      type: "button",
      mode: "opacity",
      className: `aiwa-chip${o === "canvas" ? " is-on-canvas" : ""}${l ? " is-fill" : ""}${u ? ` ${u}` : ""}`,
      "aria-pressed": t,
      onClick: i,
      ...d,
      children: /* @__PURE__ */ h.jsx(ti, { variant: t ? "tinted" : "gray", label: p, isFill: l })
    }
  );
}
function Jh({ label: n, active: t, onChange: i, variant: l = "default" }) {
  return /* @__PURE__ */ h.jsx(
    iu,
    {
      className: `aiwa-log-toggle is-${l}-toggle`,
      label: n,
      active: t,
      isFill: !0,
      surface: "canvas",
      "aria-label": `${n}: ${t ? "да" : "нет"}`,
      onClick: () => i(!t),
      end: /* @__PURE__ */ h.jsx("span", { className: "aiwa-log-toggle-mark", "aria-hidden": "true", children: t ? /* @__PURE__ */ h.jsx(nu, {}) : null })
    }
  );
}
function $3({ label: n, children: t }) {
  return /* @__PURE__ */ h.jsxs("div", { className: "aiwa-log-group", children: [
    /* @__PURE__ */ h.jsx(pt, { className: "aiwa-log-label", variant: "subheadline1", weight: "regular", children: n }),
    /* @__PURE__ */ h.jsx("div", { className: "aiwa-log-choices", role: "group", "aria-label": n, children: t })
  ] });
}
function Yc({ label: n, options: t, value: i, onChange: l }) {
  return /* @__PURE__ */ h.jsx($3, { label: n, children: t.map(([o, c]) => /* @__PURE__ */ h.jsx(
    iu,
    {
      label: c,
      active: i === o,
      onClick: () => l(o)
    },
    o
  )) });
}
function k3({ label: n, options: t, symptoms: i, onToggle: l }) {
  return /* @__PURE__ */ h.jsx($3, { label: n, children: t.map(([o, c]) => /* @__PURE__ */ h.jsx(
    iu,
    {
      label: c,
      active: i.includes(o),
      onClick: () => l(o)
    },
    o
  )) });
}
function pe({
  label: n,
  value: t,
  onChange: i = () => {
  },
  placeholder: l = "",
  type: o = "text",
  inputMode: c,
  multiline: u = !1,
  readOnly: d = !1,
  ...p
}) {
  const y = {
    ...p,
    inputMode: c,
    value: t,
    placeholder: l,
    readOnly: d,
    onChange: (g) => i(g.target.value)
  };
  return /* @__PURE__ */ h.jsxs("label", { className: "aiwa-field", children: [
    /* @__PURE__ */ h.jsx(pt, { variant: "caption1", weight: "regular", children: n }),
    u ? /* @__PURE__ */ h.jsx("textarea", { ...y }) : /* @__PURE__ */ h.jsx("input", { type: o, ...y })
  ] });
}
function B3({ value: n, onChange: t }) {
  return /* @__PURE__ */ h.jsx("div", { className: "aiwa-custom-symptom", children: /* @__PURE__ */ h.jsx(
    pe,
    {
      label: "Свой симптом",
      value: n,
      onChange: t,
      placeholder: "Например, тошнота",
      maxLength: 40
    }
  ) });
}
const nh = "custom:", V2 = (n) => [...new Set(
  n.map((t) => String(t || "").trim()).filter(Boolean)
)];
function V3({
  date: n,
  energy: t,
  mood: i,
  symptoms: l = [],
  custom: o = "",
  intimacy: c,
  period: u,
  includePeriod: d = !1
}) {
  const p = V2(l), y = p.filter((v) => !v.startsWith(nh)), g = p.filter((v) => v.startsWith(nh)).map((v) => v.slice(nh.length));
  return String(o || "").trim() && g.push(String(o).trim()), {
    date: n,
    energy: Number(t) || 0,
    mood: Number(i) || 0,
    symptoms: y,
    custom_symptoms: V2(g),
    intimacy: !!c,
    ...d ? { period: !!u } : {}
  };
}
function D7({
  isOpen: n,
  currentGeneration: t,
  startedGeneration: i,
  currentDate: l,
  targetDate: o
}) {
  return !!(n && l === o && (t === i || t > i));
}
const N7 = Object.freeze({});
function O7({ isOpen: n, onClose: t, checkin: i, symptomGroups: l, mode: o, dayIso: c }) {
  const u = Qe(), d = c || u, p = i || N7, y = d !== u, g = !y && !["preg", "meno", "male", "none", "fit"].includes(o), [v, b] = C.useState(p.symptoms || []), [j, w] = C.useState(p.energy || 0), [T, x] = C.useState(p.mood || 0), [A, _] = C.useState(!!p.period), [E, M] = C.useState(!!p.intimacy), [O, D] = C.useState(""), [N, V] = C.useState(!1), [H, B] = C.useState(0), U = C.useRef(null), F = C.useRef(0), Y = C.useRef({ generation: 0, open: !1 }), st = C.useRef(""), I = C.useRef(d);
  I.current = d, C.useLayoutEffect(() => {
    Y.current = {
      generation: Y.current.generation + (n ? 1 : 0),
      open: n
    };
  }, [n]), C.useEffect(() => {
    if (!n) return;
    if (U.current?.dayIso === d) {
      V(!0);
      return;
    }
    const tt = `${Y.current.generation}:${d}:${H}`;
    st.current !== tt && (st.current = tt, b(p.symptoms || []), w(p.energy || 0), x(p.mood || 0), _(!!p.period), M(!!p.intimacy), D(""), V(!!U.current));
  }, [n, H, d, p]);
  const $ = (tt) => {
    U.current || b((ut) => ut.includes(tt) ? ut.filter((L) => L !== tt) : [...ut, tt]);
  }, X = l?.length ? l : au, J = async () => {
    if (U.current) return;
    const tt = {
      id: ++F.current,
      generation: Y.current.generation,
      dayIso: I.current,
      payload: V3({
        date: I.current,
        energy: j,
        mood: T,
        symptoms: v,
        custom: O,
        intimacy: E,
        period: A,
        includePeriod: g
      })
    };
    U.current = tt, V(!0);
    const ut = () => D7({
      isOpen: Y.current.open,
      currentGeneration: Y.current.generation,
      startedGeneration: tt.generation,
      currentDate: I.current,
      targetDate: tt.dayIso
    });
    try {
      if (await b3("aiwaSaveJournal", tt.payload), !ut()) return;
      Mt("Сохранили в журнал", { type: "success" }), t();
    } catch (L) {
      if (!ut()) return;
      Mt(L?.message || "Не удалось сохранить", { type: "error" });
    } finally {
      if (U.current?.id === tt.id) {
        const L = Y.current.open && !ut();
        U.current = null, L ? (V(!0), B((q) => q + 1)) : V(!1);
      }
    }
  };
  return /* @__PURE__ */ h.jsxs(
    Bn,
    {
      isOpen: n,
      onClose: t,
      "data-aiwa-log-modal": "true",
      "aria-label": y ? "Журнал за выбранный день" : "Занести в журнал",
      children: [
        /* @__PURE__ */ h.jsx(pp, { size: "large", title: y ? `Журнал за ${(/* @__PURE__ */ new Date(c + "T00:00:00")).toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}` : "Занести в журнал" }),
        /* @__PURE__ */ h.jsx(
          "div",
          {
            className: "aiwa-log-scroll",
            "aria-busy": N || void 0,
            "aria-disabled": N || void 0,
            inert: N ? !0 : void 0,
            children: /* @__PURE__ */ h.jsxs(vt, { className: "aiwa-log-sections", children: [
              g ? /* @__PURE__ */ h.jsx(vt.Item, { children: /* @__PURE__ */ h.jsx(
                Jh,
                {
                  label: "Месячные",
                  variant: "period",
                  active: A,
                  onChange: (tt) => {
                    U.current || _(tt);
                  }
                }
              ) }) : null,
              /* @__PURE__ */ h.jsx(vt.Item, { children: /* @__PURE__ */ h.jsx(
                Yc,
                {
                  label: "Энергия",
                  options: E3,
                  value: j,
                  onChange: (tt) => {
                    U.current || w(tt);
                  }
                }
              ) }),
              /* @__PURE__ */ h.jsx(vt.Item, { children: /* @__PURE__ */ h.jsx(
                Yc,
                {
                  label: "Настроение",
                  options: M3,
                  value: T,
                  onChange: (tt) => {
                    U.current || x(tt);
                  }
                }
              ) }),
              X.map(([tt, ut]) => /* @__PURE__ */ h.jsx(vt.Item, { children: /* @__PURE__ */ h.jsx(k3, { label: tt, options: ut, symptoms: v, onToggle: $ }) }, tt)),
              /* @__PURE__ */ h.jsx(vt.Item, { children: /* @__PURE__ */ h.jsx(
                B3,
                {
                  value: O,
                  onChange: (tt) => {
                    U.current || D(tt);
                  }
                }
              ) }),
              o === "male" ? null : /* @__PURE__ */ h.jsx(vt.Item, { children: /* @__PURE__ */ h.jsx(
                Jh,
                {
                  label: "Близость",
                  active: E,
                  onChange: (tt) => {
                    U.current || M(tt);
                  }
                }
              ) })
            ] })
          }
        ),
        /* @__PURE__ */ h.jsx("div", { className: "aiwa-log-footer", children: /* @__PURE__ */ h.jsx(
          Te,
          {
            label: "Сохранить",
            loading: N,
            "data-haptic": "light",
            isFill: !0,
            ...le("Сохранить", J)
          }
        ) })
      ]
    }
  );
}
const z2 = (n, t = "") => [
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
function L7({
  day: n,
  interactive: t = !1,
  monthLabel: i = "",
  showTodayLabel: l = !1,
  variant: o = "",
  onSelect: c = null,
  marking: u = !1,
  checked: d = !1,
  // What the selection glyph is. «Близость» marks a day with the same heart the
  // calendar already uses for it outside marking mode, so the mark you are making
  // looks like the mark you will get; everything else keeps the neutral radio.
  markVariant: p = "radio"
}) {
  const y = u && p === "heart", g = [o ? `is-${o}` : "", u ? "is-marking" : ""].filter(Boolean).join(" "), v = u ? { iso: n.iso, today: n.today, muted: n.muted } : n, b = /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
    u ? null : /* @__PURE__ */ h.jsx("span", { className: "aiwa-date-cell-ring", "aria-hidden": "true" }),
    !u && n.cycleDay ? /* @__PURE__ */ h.jsx("span", { className: "aiwa-date-cell-cycleday", "aria-hidden": "true", children: n.cycleDay }) : null,
    /* @__PURE__ */ h.jsx(pt, { className: "aiwa-date-cell-number", variant: "body", weight: "regular", children: n.date }),
    u ? /* @__PURE__ */ h.jsx(
      "span",
      {
        className: `aiwa-date-cell-radio${y ? " is-heart" : ""}${d ? " is-checked" : ""}`,
        "aria-hidden": "true",
        children: y ? /* @__PURE__ */ h.jsx(R_, {}) : d ? /* @__PURE__ */ h.jsx(nu, {}) : null
      }
    ) : null,
    !u && n.phase && !n.actualPeriod && !n.predictedPeriod ? /* @__PURE__ */ h.jsx("span", { className: "aiwa-date-cell-dot", "aria-hidden": "true" }) : null,
    !u && n.intimacy ? /* @__PURE__ */ h.jsx("span", { className: "aiwa-date-cell-heart", "aria-hidden": "true", children: "♥" }) : null,
    l && n.today && !u ? /* @__PURE__ */ h.jsx(pt, { className: "aiwa-date-cell-today", variant: "caption1", weight: "regular", children: "Сегодня" }) : null
  ] });
  if (!t)
    return /* @__PURE__ */ h.jsx("div", { className: z2(v, g), "data-iso": n.iso, "aria-label": `${n.label || "День"}, ${n.date}`, children: b });
  const j = i || n.monthLabel || "", w = j ? `${n.date} ${j}` : `${n.label || "День"}, ${n.date}`, T = u ? d ? ", отмечено" : "" : `${n.actualPeriod ? ", отмечены месячные" : ""}${n.predictedPeriod ? ", прогноз месячных" : ""}${n.intimacy ? ", отмечена близость" : ""}`;
  return /* @__PURE__ */ h.jsx(
    nn,
    {
      as: "button",
      type: "button",
      mode: "opacity",
      disabled: n.disabled,
      "aria-label": `${w}${T}`,
      "aria-pressed": u ? d : typeof n.selected == "boolean" ? n.selected : void 0,
      className: z2(v, ["aiwa-calendar-day", g].filter(Boolean).join(" ")),
      "data-iso": n.iso,
      onClick: () => c ? c(n) : Zn("aiwaCalendarDay", n.iso),
      children: b
    }
  );
}
function $7({ icon: n, label: t, onClick: i, className: l = "", ...o }) {
  return /* @__PURE__ */ h.jsx(
    nn,
    {
      as: "button",
      type: "button",
      mode: "opacity",
      "aria-label": t,
      className: `aiwa-fab${l ? ` ${l}` : ""}`,
      onClick: i,
      ...o,
      children: /* @__PURE__ */ h.jsx(Jm, { className: "aiwa-fab-surface", children: /* @__PURE__ */ h.jsx("span", { className: "aiwa-fab-icon", "aria-hidden": "true", children: n }) })
    }
  );
}
const Xl = 8, U2 = 6, H2 = '[role="menuitem"]:not(:disabled)', k7 = [
  "a[href]",
  "button:not(:disabled)",
  "input:not(:disabled)",
  "select:not(:disabled)",
  "textarea:not(:disabled)",
  '[role="button"][tabindex]:not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])'
].join(","), B7 = '[data-aiwa-calendar-modal="true"],[aria-modal="true"]';
function V7(n, t, i) {
  return i < 1 ? -1 : n === "Home" ? 0 : n === "End" ? i - 1 : n === "ArrowDown" ? t < 0 ? 0 : (t + 1) % i : n === "ArrowUp" ? t < 0 ? i - 1 : (t - 1 + i) % i : t;
}
function z7(n) {
  return n?.restoreFocus !== !1;
}
function U7(n, t, i) {
  return t < 1 ? -1 : n < 0 ? i < 0 ? t - 1 : 0 : (n + (i < 0 ? -1 : 1) + t) % t;
}
function H7(n, t = null) {
  if (!n || t?.contains?.(n) || n.closest?.('.hidden,[inert],[hidden],[aria-hidden="true"]') || n.getAttribute?.("aria-disabled") === "true") return !1;
  const i = globalThis.getComputedStyle?.(n);
  if (i && (i.display === "none" || i.visibility === "hidden" || i.visibility === "collapse" || i.contentVisibility === "hidden")) return !1;
  const l = n.getClientRects?.();
  return !l || l.length > 0;
}
function q7(n, t = globalThis.document) {
  return n?.closest?.(B7) || t;
}
function Y7(n, t, i = null, l = globalThis.document) {
  if (!n || !l) return null;
  const c = [...q7(n, l)?.querySelectorAll?.(k7) || []].filter(
    (p) => H7(p, i)
  ), u = c.indexOf(n), d = U7(u, c.length, t);
  return c[d] || n;
}
function P7(n, t, i) {
  const l = window.innerWidth, o = window.innerHeight;
  let c = i === "end" ? n.right - t.width : n.left;
  c = Math.min(c, l - t.width - Xl), c = Math.max(Xl, c);
  const u = n.bottom + U2, d = n.top - U2 - t.height, p = u + t.height <= o - Xl, y = p || d < Xl ? u : d, g = p || d < Xl ? "top" : "bottom";
  return { top: y, left: c, originY: g };
}
function z3({ items: n, trigger: t, align: i = "start", className: l = "" }) {
  const [o, c] = C.useState(!1), [u, d] = C.useState({ top: 0, left: 0, originY: "top" }), p = C.useRef(null), y = C.useRef(null), g = C.useRef("first"), v = C.useId(), b = C.useId(), j = C.isValidElement(t) && t.props.id ? t.props.id : b, w = C.useCallback(() => p.current?.querySelector(
    'button, a[href], input, [role="button"], [tabindex]:not([tabindex="-1"])'
  ), []), T = C.useCallback(() => {
    w()?.focus?.({ preventScroll: !0 });
  }, [w]), x = C.useCallback((D) => {
    const N = w();
    N && Y7(
      N,
      D,
      y.current,
      N.ownerDocument || document
    )?.focus?.({ preventScroll: !0 });
  }, [w]), A = C.useCallback((D = !1) => {
    c(!1), D && setTimeout(T, 0);
  }, [T]), _ = C.useCallback((D = "first") => {
    g.current = D, c(!0);
  }, []);
  C.useLayoutEffect(() => {
    if (!o || !y.current || !p.current) return;
    const D = () => {
      const H = p.current.getBoundingClientRect(), B = { width: y.current.offsetWidth, height: y.current.offsetHeight };
      d(P7(H, B, i));
    };
    D();
    const N = [...y.current.querySelectorAll(H2)];
    return ((g.current === "last" ? N[N.length - 1] : N[0]) || y.current).focus?.({ preventScroll: !0 }), window.addEventListener("resize", D), window.addEventListener("scroll", D, !0), () => {
      window.removeEventListener("resize", D), window.removeEventListener("scroll", D, !0);
    };
  }, [o, i]), C.useEffect(() => {
    if (!o) return;
    const D = (V) => {
      y.current?.contains(V.target) || p.current?.contains(V.target) || A();
    }, N = (V) => {
      V.key === "Escape" && (V.preventDefault(), A(!0));
    };
    return document.addEventListener("pointerdown", D, !0), document.addEventListener("keydown", N), () => {
      document.removeEventListener("pointerdown", D, !0), document.removeEventListener("keydown", N);
    };
  }, [o, A]);
  const E = (D) => {
    D.disabled || (A(z7(D)), D.onSelect?.());
  }, M = (D) => {
    if (D.key === "Escape") {
      D.preventDefault(), D.stopPropagation(), A(!0);
      return;
    }
    if (D.key === "Tab") {
      D.preventDefault(), A(), setTimeout(() => x(D.shiftKey ? -1 : 1), 0);
      return;
    }
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(D.key)) return;
    const N = [...y.current?.querySelectorAll(H2) || []];
    if (!N.length) return;
    D.preventDefault();
    const V = N.indexOf(document.activeElement), H = V7(D.key, V, N.length);
    N[H]?.focus?.({ preventScroll: !0 });
  }, O = C.isValidElement(t) ? C.cloneElement(t, {
    id: j,
    "aria-haspopup": "menu",
    "aria-expanded": o,
    "aria-controls": o ? v : void 0,
    onClick: (D) => {
      t.props.onClick?.(D), !D.defaultPrevented && (o ? A() : _("first"));
    },
    onKeyDown: (D) => {
      t.props.onKeyDown?.(D), !D.defaultPrevented && (D.key === "ArrowDown" || D.key === "ArrowUp" ? (D.preventDefault(), _(D.key === "ArrowUp" ? "last" : "first")) : D.key === "Enter" || D.key === " " ? (D.preventDefault(), o ? A() : _("first")) : D.key === "Escape" && o && (D.preventDefault(), A(!0)));
    }
  }) : t;
  return /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
    /* @__PURE__ */ h.jsx(
      "div",
      {
        ref: p,
        className: `aiwa-action-menu-trigger${l ? ` ${l}` : ""}`,
        children: O
      }
    ),
    o && Dr.createPortal(
      /* @__PURE__ */ h.jsx(
        "div",
        {
          ref: y,
          id: v,
          role: "menu",
          "aria-labelledby": j,
          "aria-orientation": "vertical",
          tabIndex: -1,
          className: "aiwa-action-menu",
          "data-align": i,
          onKeyDown: M,
          style: {
            position: "fixed",
            top: u.top,
            left: u.left,
            transformOrigin: `${i === "end" ? "right" : "left"} ${u.originY}`
          },
          children: n.map((D) => /* @__PURE__ */ h.jsxs(
            "button",
            {
              type: "button",
              role: "menuitem",
              tabIndex: -1,
              disabled: D.disabled || void 0,
              className: "aiwa-action-menu-item",
              onClick: () => E(D),
              children: [
                D.icon ? /* @__PURE__ */ h.jsx("span", { className: "aiwa-action-menu-icon", "aria-hidden": "true", children: D.icon }) : null,
                /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: D.label })
              ]
            },
            D.label
          ))
        }
      ),
      document.body
    )
  ] });
}
function G7({ options: n, value: t, onChange: i, hint: l }) {
  return /* @__PURE__ */ h.jsxs(Jm, { className: "aiwa-mark-bar", role: "group", "aria-label": "Что отмечаем", children: [
    /* @__PURE__ */ h.jsx("div", { className: "aiwa-mark-bar-chips", children: n.map((o) => /* @__PURE__ */ h.jsx(
      iu,
      {
        label: o.label,
        active: t === o.value,
        onClick: () => i(o.value)
      },
      o.value
    )) }),
    l ? /* @__PURE__ */ h.jsx(pt, { className: "aiwa-mark-bar-hint", variant: "footnote", weight: "regular", role: "status", children: l }) : null
  ] });
}
let X7 = 0;
const q2 = /* @__PURE__ */ new Map(), Pc = (n) => Array.isArray(n) ? Object.freeze(n.map(Pc)) : !n || typeof n != "object" ? n : Object.freeze(Object.fromEntries(
  Object.entries(n).map(([t, i]) => [t, Pc(i)])
)), Lr = (n) => {
  const t = String(n || "");
  let i = q2.get(t);
  return i || (i = { active: null, completion: null, listeners: /* @__PURE__ */ new Set() }, q2.set(t, i)), i;
}, Jl = (n) => n ? {
  id: n.id,
  iso: n.iso,
  payload: n.payload,
  draft: n.draft
} : null, bp = (n) => {
  const t = Lr(n);
  return {
    active: Jl(t.active),
    completion: t.completion ? { ...t.completion } : null
  };
}, Mc = (n) => {
  const t = Lr(n), i = bp(n);
  for (const l of t.listeners) l(i);
}, ah = (n) => bp(n), K7 = (n, t) => {
  const i = Lr(n);
  return i.listeners.add(t), t(bp(n)), () => i.listeners.delete(t);
}, Z7 = (n, t, i, { draft: l = null } = {}) => {
  const o = Lr(n);
  if (o.active)
    return {
      owner: !1,
      operation: Jl(o.active),
      promise: o.active.promise
    };
  const c = {
    id: ++X7,
    iso: n,
    payload: Pc(t),
    draft: Pc(l)
  }, d = Promise.resolve().then(() => i(c.payload)).then(
    (p) => (o.active?.id === c.id && (o.active = null, o.completion = {
      ...Jl(c),
      status: "fulfilled",
      value: p,
      consumed: !1
    }, Mc(n)), p),
    (p) => {
      throw o.active?.id === c.id && (o.active = null, o.completion = {
        ...Jl(c),
        status: "rejected",
        error: p,
        consumed: !1
      }, Mc(n)), p;
    }
  );
  return o.completion = null, o.active = { ...c, promise: d }, Mc(n), { owner: !0, operation: Jl(c), promise: d };
}, Q7 = (n, t) => {
  const i = Lr(n);
  return !i.completion || i.completion.id !== t || i.completion.consumed ? !1 : (i.completion = { ...i.completion, consumed: !0 }, Mc(n), !0);
};
function F7({ iso: n, label: t, open: i, onClose: l, symptomGroups: o, showIntimacy: c = !0 }) {
  const [u, d] = C.useState([]), [p, y] = C.useState(0), [g, v] = C.useState(0), [b, j] = C.useState(!1), [w, T] = C.useState(""), [x, A] = C.useState(() => ah(n)), _ = C.useRef(""), E = C.useRef(0), M = C.useRef(n);
  M.current = n;
  const O = !!(x.active || x.completion && !x.completion.consumed);
  C.useEffect(() => K7(n, A), [n]), C.useLayoutEffect(() => {
    i && (E.current += 1);
  }, [i]), C.useEffect(() => {
    if (!n || !i) return;
    const B = ah(n), U = B.active || (B.completion && !B.completion.consumed ? B.completion : null), F = `${E.current}:${n}:${U?.id || "canonical"}`;
    if (_.current === F) return;
    if (_.current = F, U?.draft) {
      d(U.draft.symptoms), y(U.draft.energy), v(U.draft.mood), j(U.draft.intimacy), T(U.draft.custom);
      return;
    }
    const Y = Ve("getAiwaDayCheckin", n) || {};
    d(Y.symptoms || []), y(Y.energy || 0), v(Y.mood || 0), j(!!Y.intimacy), T("");
  }, [n, i]), C.useEffect(() => {
    const B = x.completion;
    !i || !B || B.consumed || Q7(n, B.id) && (B.status === "fulfilled" ? (Mt("Сохранено", { type: "success" }), l()) : Mt(B.error?.message || "Не удалось сохранить", { type: "error" }));
  }, [n, l, i, x.completion]);
  const D = () => {
    const B = ah(M.current);
    return !!(B.active || B.completion && !B.completion.consumed);
  }, N = (B) => {
    D() || d((U) => U.includes(B) ? U.filter((F) => F !== B) : [...U, B]);
  }, V = o?.length ? o : au, H = () => {
    const B = M.current;
    if (D()) return;
    const U = { energy: p, mood: g, symptoms: u, custom: w, intimacy: b }, F = V3({ date: B, ...U });
    Z7(
      B,
      F,
      (st) => b3("aiwaSaveJournal", st),
      { draft: U }
    ).promise.catch(() => {
    });
  };
  return /* @__PURE__ */ h.jsxs(
    Bn,
    {
      isOpen: i,
      onClose: l,
      "data-aiwa-day-log-modal": "true",
      "aria-label": t || "Журнал за выбранный день",
      children: [
        /* @__PURE__ */ h.jsx(pp, { size: "large", title: t || "Занести в журнал" }),
        /* @__PURE__ */ h.jsx(
          "div",
          {
            className: "aiwa-log-scroll",
            "aria-busy": O || void 0,
            "aria-disabled": O || void 0,
            inert: O ? !0 : void 0,
            children: /* @__PURE__ */ h.jsxs(vt, { className: "aiwa-log-sections", children: [
              /* @__PURE__ */ h.jsx(vt.Item, { children: /* @__PURE__ */ h.jsx(
                Yc,
                {
                  label: "Энергия",
                  options: E3,
                  value: p,
                  onChange: (B) => {
                    D() || y(B);
                  }
                }
              ) }),
              /* @__PURE__ */ h.jsx(vt.Item, { children: /* @__PURE__ */ h.jsx(
                Yc,
                {
                  label: "Настроение",
                  options: M3,
                  value: g,
                  onChange: (B) => {
                    D() || v(B);
                  }
                }
              ) }),
              V.map(([B, U]) => /* @__PURE__ */ h.jsx(vt.Item, { children: /* @__PURE__ */ h.jsx(k3, { label: B, options: U, symptoms: u, onToggle: N }) }, B)),
              /* @__PURE__ */ h.jsx(vt.Item, { children: /* @__PURE__ */ h.jsx(
                B3,
                {
                  value: w,
                  onChange: (B) => {
                    D() || T(B);
                  }
                }
              ) }),
              c ? /* @__PURE__ */ h.jsx(vt.Item, { children: /* @__PURE__ */ h.jsx(
                Jh,
                {
                  label: "Близость",
                  active: b,
                  onChange: (B) => {
                    D() || j(B);
                  }
                }
              ) }) : null
            ] })
          }
        ),
        /* @__PURE__ */ h.jsx("div", { className: "aiwa-log-footer", children: /* @__PURE__ */ h.jsx(
          Te,
          {
            label: "Сохранить",
            loading: O,
            "data-haptic": "light",
            isFill: !0,
            ...le("Сохранить", H)
          }
        ) })
      ]
    }
  );
}
const cc = (n, t = Qe()) => !!(n?.iso && !n.disabled && n.iso <= t);
function xp({ isOpen: n, onClose: t, mode: i, revision: l, symptomGroups: o }) {
  const [c, u] = C.useState(!1), [d, p] = C.useState(null), [y, g] = C.useState(!1), [v, b] = C.useState("period"), [j, w] = C.useState({}), T = C.useRef(Promise.resolve()), x = C.useRef(0), A = C.useRef(null), _ = Array.from({ length: 20 }, (I, $) => Ve("getAiwaCalendarMonth", $ - 12)).filter(Boolean), E = !["preg", "meno", "male", "none", "fit"].includes(i), M = J_(E ? ["period", "symptoms", "intimacy"] : ["symptoms", "intimacy"]), O = Qh[v] || Qh.symptoms, D = U_(), N = () => {
    g(!1), w({});
  }, V = (I) => {
    b(I), u(!1), g(!0);
  }, H = M.map((I) => ({
    label: I.label,
    // Selecting a mode replaces the FAB trigger. ActionMenu must not restore
    // focus to that unmounted node; the marking state owns the live target.
    restoreFocus: !1,
    onSelect: () => V(I.value)
  }));
  L3(n, y ? N : t);
  const B = C.useRef(null);
  C.useEffect(() => {
    if (!n) return;
    const I = B.current, $ = I?.querySelector('[data-current-month="true"]');
    I && $ && (I.scrollTop = Math.max(0, $.offsetTop - 8));
  }, [n]), C.useEffect(() => {
    n || (u(!1), p(null), g(!1), w({})), b(E ? "period" : "symptoms");
  }, [n, E]), C.useEffect(() => {
    !n || !y || A.current?.querySelector(".aiwa-calendar-done")?.focus({ preventScroll: !0 });
  }, [n, y]);
  const U = (I) => {
    const $ = j[`${v}:${I.iso}`];
    return typeof $ == "boolean" ? $ : !!O.checked(I);
  }, F = (I, $) => {
    const X = () => Ve(I, $);
    x.current += 1, T.current = T.current.then(X, X).then(() => {
      x.current -= 1, x.current === 0 && w({});
    });
  }, Y = Qe(), st = (I, $) => {
    if (cc(I, Y)) {
      if (!y) {
        p({ iso: I.iso, label: `${I.date} ${$}` });
        return;
      }
      if (v === "symptoms") {
        p({ iso: I.iso, label: `${I.date} ${$}` });
        return;
      }
      w((X) => ({ ...X, [`${v}:${I.iso}`]: !U(I) })), F(v === "period" ? "toggleCalendarPeriodDay" : "markPA", I.iso);
    }
  };
  return n ? Dr.createPortal(
    /* @__PURE__ */ h.jsxs(
      "div",
      {
        ref: A,
        className: "aiwa-calendar-page",
        "data-aiwa-calendar-modal": "true",
        "data-marking": y ? "true" : void 0,
        "data-markbar": y && !D ? "true" : void 0,
        role: "region",
        "aria-label": "Календарь",
        children: [
          /* @__PURE__ */ h.jsxs("div", { className: "aiwa-calendar-screen", "data-revision": l, role: "document", "aria-label": "Календарь", children: [
            /* @__PURE__ */ h.jsxs("div", { className: "aiwa-calendar-modeswitch", children: [
              y && D ? null : /* @__PURE__ */ h.jsxs(
                nn,
                {
                  as: "button",
                  type: "button",
                  mode: "opacity",
                  className: "aiwa-calendar-legend-toggle",
                  "aria-pressed": c,
                  "aria-label": c ? "Скрыть обозначения" : "Показать обозначения календаря",
                  onClick: () => u((I) => !I),
                  children: [
                    /* @__PURE__ */ h.jsx(g3, {}),
                    /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "semibold", children: "Обозначения" })
                  ]
                }
              ),
              y ? /* @__PURE__ */ h.jsx(
                nn,
                {
                  as: "button",
                  type: "button",
                  mode: "opacity",
                  className: "aiwa-calendar-done",
                  "aria-label": "Закончить отметки",
                  onClick: N,
                  children: /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "semibold", children: "Готово" })
                }
              ) : null
            ] }),
            c ? /* @__PURE__ */ h.jsxs("div", { className: "aiwa-calendar-help", role: "status", children: [
              /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "semibold", children: "Обозначения" }),
              /* @__PURE__ */ h.jsx("div", { className: "aiwa-calendar-legend", children: W_.map(({ label: I, variant: $, token: X }) => /* @__PURE__ */ h.jsx(
                zM,
                {
                  variant: $,
                  textVariant: "caption1",
                  weight: "semibold",
                  style: { color: `var(${X})` },
                  children: I
                },
                I
              )) })
            ] }) : null,
            /* @__PURE__ */ h.jsx("div", { className: "aiwa-calendar-scroll", ref: B, children: /* @__PURE__ */ h.jsx("div", { className: "aiwa-calendar-months", children: _.map((I) => /* @__PURE__ */ h.jsxs(
              "section",
              {
                className: "aiwa-calendar-month",
                "aria-label": I.label,
                "data-current-month": I.days.some(($) => $.today) ? "true" : void 0,
                children: [
                  /* @__PURE__ */ h.jsx(pt, { className: "aiwa-calendar-month-title", variant: "body", weight: "semibold", children: I.label || I.name }),
                  /* @__PURE__ */ h.jsx("div", { className: "aiwa-calendar-grid", children: I.days.map(($) => $.empty ? /* @__PURE__ */ h.jsx("span", { className: "aiwa-calendar-empty", "aria-hidden": "true" }, $.key) : /* @__PURE__ */ h.jsx(
                    L7,
                    {
                      day: $,
                      interactive: cc($, Y),
                      marking: y && cc($, Y),
                      checked: y && cc($, Y) && U($),
                      markVariant: v === "intimacy" ? "heart" : "radio",
                      monthLabel: I.label,
                      onSelect: (X) => st(X, I.name || I.label)
                    },
                    $.key
                  )) })
                ]
              },
              I.key || I.label
            )) }) })
          ] }),
          y && !D ? /* @__PURE__ */ h.jsx(
            G7,
            {
              options: M,
              value: v,
              onChange: b,
              hint: O.hint
            }
          ) : null,
          y ? null : /* @__PURE__ */ h.jsx(
            z3,
            {
              className: "aiwa-calendar-fab",
              align: "end",
              items: H,
              trigger: /* @__PURE__ */ h.jsx($7, { icon: /* @__PURE__ */ h.jsx(Ks, {}), label: "Отметить день" })
            }
          ),
          /* @__PURE__ */ h.jsx(
            F7,
            {
              iso: d?.iso,
              label: d?.label,
              open: !!d,
              onClose: () => p(null),
              symptomGroups: o,
              showIntimacy: !1
            }
          )
        ]
      }
    ),
    document.body
  ) : null;
}
function I7({ panel: n, onClose: t, checkin: i, symptomGroups: l, mode: o, revision: c, dayIso: u }) {
  return /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
    /* @__PURE__ */ h.jsx(O7, { isOpen: n === "journal", onClose: t, checkin: i, symptomGroups: l, mode: o, dayIso: u }),
    /* @__PURE__ */ h.jsx(xp, { isOpen: n === "calendar", onClose: t, mode: o, revision: c, symptomGroups: l })
  ] });
}
function zt({
  title: n,
  description: t,
  onClick: i,
  trailing: l,
  muted: o = !1,
  start: c,
  image: u,
  loading: d = !1,
  variant: p = "default",
  separateAction: y = !1,
  actionLabel: g
}) {
  const v = u || d || p === "extended" ? "extended" : "default", b = l !== void 0 ? l : i ? /* @__PURE__ */ h.jsx(Tt.Part, { type: "Chevron" }) : null, j = d ? /* @__PURE__ */ h.jsx("span", { className: "aiwa-cell-thumb aiwa-cell-thumb-loading", children: /* @__PURE__ */ h.jsx(eu, { size: 22 }) }) : u ? /* @__PURE__ */ h.jsx("span", { className: "aiwa-cell-thumb", children: /* @__PURE__ */ h.jsx("img", { src: u, alt: "", loading: "lazy" }) }) : c;
  return i && y ? /* @__PURE__ */ h.jsx(
    Tt,
    {
      "data-aiwa-row-variant": v,
      start: j,
      end: b,
      tappable: !1,
      as: "div",
      style: o ? { opacity: 0.65 } : void 0,
      children: /* @__PURE__ */ h.jsxs(
        "button",
        {
          type: "button",
          className: "aiwa-row-main-action",
          "aria-label": g,
          onClick: i,
          children: [
            /* @__PURE__ */ h.jsx("span", { className: "aiwa-row-main-title", children: /* @__PURE__ */ h.jsx(pt, { as: "span", variant: "body", weight: "regular", children: n }) }),
            t ? /* @__PURE__ */ h.jsx("span", { className: "aiwa-row-main-description", children: /* @__PURE__ */ h.jsx(pt, { as: "span", variant: "subheadline2", weight: "regular", children: t }) }) : null
          ]
        }
      )
    }
  ) : /* @__PURE__ */ h.jsx(
    Tt,
    {
      "data-aiwa-row-variant": v,
      start: j,
      end: b,
      onClick: i,
      tappable: !!i,
      as: i ? "button" : "div",
      type: i ? "button" : void 0,
      style: o ? { opacity: 0.65 } : void 0,
      children: /* @__PURE__ */ h.jsx(Tt.Text, { title: n, description: t || void 0 })
    }
  );
}
const J7 = {
  profile: ["height", "weight", "age", "cycle_len"],
  preferences: ["diet_note", "kcal_goal"],
  summary: ["send_time", "daily_summary_enabled"],
  "daily-summary": ["daily_summary_enabled"],
  proactive: ["proactive_enabled"],
  mode: ["cycle_len"]
}, Wh = (n = {}) => ({
  height: String(n.profile?.height || ""),
  weight: String(n.profile?.weight || ""),
  age: String(n.profile?.age || ""),
  cycle_len: String(n.cycle_len || ""),
  diet_note: n.profile?.diet_note || n.diet_note || "",
  kcal_goal: String(n.profile?.kcal_goal || n.kcal_goal || ""),
  send_time: n.send_time || "08:00",
  daily_summary_enabled: n.daily_summary_enabled !== !1,
  proactive_enabled: n.proactive_enabled !== !1
}), Y2 = (n) => {
  const t = n?.data || n?.snapshot, i = Number(n?.revision), l = n?.revision !== null && n?.revision !== void 0 && n?.revision !== "";
  return !t || typeof t != "object" || Array.isArray(t) || !l || !Number.isFinite(i) ? null : { data: t, revision: i };
}, W7 = (n, t) => Object.prototype.hasOwnProperty.call(n, t), P2 = (n) => !n || typeof n != "object" || Array.isArray(n) || ![
  "mode",
  "cycle",
  "last_period",
  "cycle_len",
  "periods",
  "cycles",
  "past_periods",
  "stats",
  "preg",
  "day",
  "phase",
  "days_to_next",
  "days_since",
  "status",
  "delay_days"
].every((i) => W7(n, i)) || !Array.isArray(n.periods) || !Array.isArray(n.cycles) || !Array.isArray(n.past_periods) || !n.stats || typeof n.stats != "object" || Array.isArray(n.stats) || ["cycle", "irregular"].includes(n.mode) && !Array.isArray(n.stats.history) ? !1 : n.mode === "preg" ? !!(n.preg && typeof n.preg == "object" && !n.cycle && n.periods.length === 0 && n.cycles.length === 0) : ["meno", "none", "male", "fit"].includes(n.mode) ? !n.cycle && n.preg === null && n.periods.length === 0 && n.cycles.length === 0 : ["cycle", "irregular"].includes(n.mode), tR = async (n, t, i) => {
  let l = null;
  try {
    l = await n("reloadSettingsData");
  } catch {
    l = null;
  }
  const o = Y2(l);
  if (o && (t !== "mode" || P2(o.data)))
    return o;
  let c = null;
  try {
    c = await n("applySettingsMutationReceipt", t, i);
  } catch {
    c = null;
  }
  const u = Y2(c);
  return u && t === "mode" && !P2(u.data) ? null : u;
}, eR = ({
  current: n,
  data: t,
  actionKey: i,
  draftVersion: l,
  submittedDraftVersion: o
}) => {
  if (l !== o) return n;
  const c = J7[i] || [];
  if (!c.length) return n;
  const u = Wh(t);
  return {
    ...n,
    ...Object.fromEntries(c.map((d) => [d, u[d]]))
  };
};
let nR = 0, Xe = null, _c = null;
const tm = /* @__PURE__ */ new Set(), Sp = () => ({
  active: Xe ? { id: Xe.id, key: Xe.key, ownerId: Xe.ownerId } : null,
  completion: _c
}), ih = () => {
  const n = Sp();
  for (const t of tm) t(n);
}, G2 = () => Sp(), Kl = () => !!Xe, aR = (n) => (tm.add(n), n(Sp()), () => tm.delete(n)), iR = ({
  isOpen: n,
  currentGeneration: t,
  startedGeneration: i,
  operationId: l,
  adoptedOperationId: o,
  adoptedGeneration: c
}) => !!(n && (t === i || l != null && l === o && t === c)), sR = (n, t, { ownerId: i = null } = {}) => {
  if (Xe)
    return {
      owner: !1,
      operation: { id: Xe.id, key: Xe.key, ownerId: Xe.ownerId },
      promise: Xe.promise
    };
  const l = { id: ++nR, key: n, ownerId: i }, c = Promise.resolve().then(t).then(
    (u) => (Xe?.id === l.id && (Xe = null, _c = { ...l, status: "fulfilled", value: u }, ih()), u),
    (u) => {
      throw Xe?.id === l.id && (Xe = null, _c = { ...l, status: "rejected", error: u }, ih()), u;
    }
  );
  return _c = null, Xe = { ...l, promise: c }, ih(), { owner: !0, operation: l, promise: c };
}, lR = [
  { value: "3", label: "3 месяца" },
  { value: "6", label: "6 месяцев" },
  { value: "all", label: "Весь период" }
], rR = /* @__PURE__ */ new Set(["copy-partner", "unlink-partner"]), X2 = (n) => Fh.find((t) => t.value === n)?.label || "Не выбран", oR = (n, t) => (
  // Both bridges are data-only. The receipt fallback is local and cannot
  // navigate; it prevents an acknowledged server write from leaving D stale.
  tR(Zn, n, t)
);
function Rs({ label: n, selected: t, disabled: i = !1, onClick: l }) {
  const o = (c) => {
    const u = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1
    }[c.key], d = c.key === "Home" ? "first" : c.key === "End" ? "last" : null;
    if (!u && !d) return;
    const y = [...c.currentTarget.closest('[role="radiogroup"]')?.querySelectorAll('[role="radio"]:not(:disabled)') || []];
    if (!y.length) return;
    c.preventDefault();
    const g = y.indexOf(c.currentTarget), v = d === "first" ? y[0] : d === "last" ? y[y.length - 1] : y[(g + u + y.length) % y.length];
    v?.focus(), v?.click();
  };
  return /* @__PURE__ */ h.jsx(
    Tt,
    {
      as: "button",
      type: "button",
      role: "radio",
      "aria-checked": t,
      "aria-disabled": i || void 0,
      disabled: i || void 0,
      tabIndex: i || !t ? -1 : 0,
      onClick: i || t ? void 0 : l,
      onKeyDown: o,
      end: t ? /* @__PURE__ */ h.jsx("span", { className: "aiwa-settings-check", "aria-hidden": "true", children: /* @__PURE__ */ h.jsx(M_, {}) }) : null,
      children: /* @__PURE__ */ h.jsx(Tt.Text, { title: n })
    }
  );
}
function wp({ isOpen: n, onClose: t }) {
  const [i, l] = C.useState("main"), [o, c] = C.useState(() => Ve("aiwaData") || {}), [u, d] = C.useState(null), [p, y] = C.useState("3"), [g, v] = C.useState({}), [b, j] = C.useState(Ec), [w, T] = C.useState(G2), x = C.useId(), A = C.useRef({ generation: 0, open: !1 }), _ = C.useRef(null), E = C.useRef(i), M = C.useRef(0), O = C.useRef(-1 / 0);
  E.current = i, C.useLayoutEffect(() => {
    A.current = {
      generation: A.current.generation + (n ? 1 : 0),
      open: n
    };
  }, [n]), C.useEffect(() => D3(j), []), C.useEffect(() => aR(T), []);
  const D = o.mode || Fh[0].value, N = D === "cycle", V = D === "male", H = j3(), B = w.active?.key || "", U = !!w.active, F = (nt, dt) => {
    M.current += 1, v((ft) => ({ ...ft, [nt]: dt }));
  }, Y = (nt) => {
    Kl() || l(nt);
  }, st = () => {
    E.current === "main" || Kl() ? t() : l("main");
  }, I = (nt, dt) => {
    !nt || nt.revision < O.current || (O.current = nt.revision, A.current.open && (c(nt.data), v((ft) => eR({
      current: ft,
      data: nt.data,
      actionKey: dt.key,
      draftVersion: M.current,
      submittedDraftVersion: dt.draftVersion
    }))));
  }, $ = async (nt, dt, ft, yt) => {
    const gt = await oR(nt, dt);
    return gt ? (I(gt, yt), gt) : (ft() && Mt(
      "Изменение сохранено, но данные профиля не обновились. Попробуй открыть профиль ещё раз.",
      { type: "error" }
    ), null);
  };
  C.useEffect(() => {
    if (!n) return;
    const nt = Ve("aiwaData") || {}, dt = G2().active, ft = dt?.key, yt = dt?.ownerId === x && !rR.has(ft), gt = Ec() && E.current === "report";
    !yt && !gt && l("main"), _.current = yt ? {
      id: dt.id,
      generation: A.current.generation
    } : null, d(null), j(Ec()), Kl() || (c(nt), v(Wh(nt)), M.current += 1);
  }, [n, x]), C.useEffect(() => {
    const nt = w.completion;
    if (!n || !nt || nt.value?.synced !== !0 || nt.ownerId === x || E.current !== "main") return;
    const dt = Ve("aiwaData") || {};
    c(dt), v(Wh(dt)), M.current += 1;
  }, [n, x, w.completion]);
  const X = async () => {
    if (Kl()) return;
    const nt = A.current.generation;
    l("partner");
    const dt = await Yt("/api/partner", {}).catch(() => null);
    A.current.open && A.current.generation === nt && d(dt || {});
  }, J = (nt, dt) => {
    if (Kl()) return null;
    const ft = {
      id: null,
      key: nt,
      generation: A.current.generation,
      draftVersion: M.current
    }, yt = () => iR({
      isOpen: A.current.open,
      currentGeneration: A.current.generation,
      startedGeneration: ft.generation,
      operationId: ft.id,
      adoptedOperationId: _.current?.id,
      adoptedGeneration: _.current?.generation
    }), gt = sR(
      nt,
      () => dt(yt, ft),
      { ownerId: x }
    );
    return ft.id = gt.operation.id, gt.owner ? (gt.promise.catch((ue) => {
      yt() && Mt(ue?.message || "Не получилось сохранить настройку", { type: "error" });
    }), gt.promise) : null;
  }, tt = () => J("profile", async (nt, dt) => {
    const ft = await Yt("/api/profile", {
      height: g.height,
      weight: g.weight,
      age: g.age,
      ...N ? { cycle_len: g.cycle_len } : {}
    }).catch(() => null);
    if (ft?.ok) {
      if (!await $(
        "profile",
        ft,
        nt,
        dt
      )) return { synced: !1 };
      if (!nt()) return { synced: !0 };
      Mt("Данные сохранены", { type: "success" }), l("main");
    } else nt() && Mt(ft?.text || (N ? "Проверь рост, вес, возраст и длину цикла" : "Проверь рост, вес и возраст"), { type: "error" });
    return { synced: !!ft?.ok };
  }), ut = () => J("preferences", async (nt, dt) => {
    const ft = await Yt("/api/prefs", {
      diet_note: g.diet_note,
      kcal_goal: g.kcal_goal
    }).catch(() => null);
    if (ft?.ok) {
      if (!await $(
        "preferences",
        ft,
        nt,
        dt
      )) return { synced: !1 };
      if (!nt()) return { synced: !0 };
      Mt("Предпочтения сохранены", { type: "success" }), l("main");
    } else nt() && Mt(ft?.text || "Не получилось сохранить предпочтения", { type: "error" });
    return { synced: !!ft?.ok };
  }), L = () => J("summary", async (nt, dt) => {
    const ft = String(g.send_time || ""), yt = g.daily_summary_enabled !== !1, gt = await Yt("/api/settime", {
      time: ft,
      daily_summary_enabled: yt
    }).catch(() => null);
    let ue = null;
    return gt?.ok && (ue = await $(
      "summary",
      gt,
      nt,
      dt
    ), !ue) ? { synced: !1 } : gt?.ok && gt.send_time === ft && gt.daily_summary_enabled === yt ? nt() ? (Mt("Время сводки сохранено", { type: "success" }), l("main"), { synced: !0 }) : { synced: !0 } : (nt() && Mt(gt?.text || (gt?.ok ? "Настройки сводки сохранены не полностью. Попробуй позже" : "Проверь время утренней сводки"), { type: "error" }), { synced: !1 });
  }), q = async () => {
    const nt = A.current.generation, { owner: dt, promise: ft } = N3(p);
    if (!dt) return;
    const yt = await ft.catch(() => null);
    if (yt?.ok && yt?.delivered) {
      S3();
      return;
    }
    A.current.open && A.current.generation === nt && Mt(yt?.text || "Выписка временно недоступна", { type: "error" });
  }, G = (nt) => J("proactive", async (dt, ft) => {
    const yt = g.proactive_enabled !== !1;
    v((mt) => ({ ...mt, proactive_enabled: nt }));
    const gt = await Yt("/api/proactive", { enabled: nt }).catch(() => null);
    return gt?.ok ? { synced: !!await $(
      "proactive",
      gt,
      dt,
      ft
    ) } : (A.current.open && M.current === ft.draftVersion && v((mt) => ({ ...mt, proactive_enabled: yt })), dt() && Mt("Не получилось изменить настройку", { type: "error" }), { synced: !1 });
  }), et = (nt) => J("daily-summary", async (dt, ft) => {
    const yt = g.daily_summary_enabled !== !1;
    v((mt) => ({ ...mt, daily_summary_enabled: nt }));
    const gt = await Yt("/api/daily-summary", { enabled: nt }).catch(() => null);
    return gt?.ok ? { synced: !!await $(
      "daily-summary",
      gt,
      dt,
      ft
    ) } : (A.current.open && M.current === ft.draftVersion && v((mt) => ({ ...mt, daily_summary_enabled: yt })), dt() && Mt("Не получилось изменить настройку", { type: "error" }), { synced: !1 });
  }), ot = (nt) => J("mode", async (dt, ft) => {
    const yt = await Yt("/api/mode", { mode: nt }).catch(() => null);
    return yt?.ok ? await $(
      "mode",
      yt,
      dt,
      ft
    ) ? dt() ? (Mt(`Режим: ${X2(nt)}`, {
      type: "success",
      description: yt.seeded_period ? "Дату месячных поставили на сегодня — поправь в календаре" : void 0
    }), t(), { synced: !0 }) : { synced: !0 } : { synced: !1 } : (dt() && Mt(yt?.text || "Не получилось сменить режим", { type: "error" }), { synced: !1 });
  }), ct = () => J("copy-partner", async (nt) => {
    if (u?.link) {
      try {
        if (await navigator.clipboard.writeText(u.link), !nt()) return { synced: !1 };
        Mt("Ссылка скопирована", { type: "success" });
      } catch {
        if (!nt()) return { synced: !1 };
        Mt("Ссылка готова — выдели и скопируй", { type: "error" });
      }
      return { synced: !1 };
    }
  }), ht = () => J("unlink-partner", async (nt, dt) => {
    const ft = await Yt("/api/partner", { action: "unlink" }).catch(() => null);
    if (ft?.ok) {
      if (!await $(
        "partner",
        ft,
        nt,
        dt
      )) return { synced: !1 };
      if (!nt()) return { synced: !0 };
      d({ linked: !1 }), Mt("Партнёр отключён", { type: "success" });
    } else nt() && Mt(ft?.text || "Не получилось отключить партнёра", { type: "error" });
    return { synced: !!ft?.ok };
  });
  return /* @__PURE__ */ h.jsx(
    Bn,
    {
      isOpen: n,
      onClose: t,
      onBack: st,
      "aria-label": "Профиль и настройки",
      children: /* @__PURE__ */ h.jsx(h.Fragment, { children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-sheet-scroll", "aria-busy": !!(B || b) || void 0, children: [
        i === "main" ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
          /* @__PURE__ */ h.jsxs("div", { className: "aiwa-profile-avatar", children: [
            /* @__PURE__ */ h.jsx(A3, {}),
            H ? /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "semibold", children: H }) : null
          ] }),
          /* @__PURE__ */ h.jsx(vt, { className: "aiwa-tma-blocks", children: /* @__PURE__ */ h.jsxs(vt.Item, { children: [
            /* @__PURE__ */ h.jsx(
              zt,
              {
                title: "Режим",
                trailing: /* @__PURE__ */ h.jsxs("span", { className: "aiwa-mode-value", children: [
                  /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: X2(D) }),
                  U ? null : /* @__PURE__ */ h.jsx(Tt.Part, { type: "Chevron" })
                ] }),
                onClick: U ? void 0 : () => Y("mode")
              }
            ),
            /* @__PURE__ */ h.jsx(zt, { title: V ? "Выписка по самочувствию" : "Выписка для врача", description: "PDF в чат бота", onClick: U ? void 0 : () => Y("report") }),
            /* @__PURE__ */ h.jsx(zt, { title: "Предпочтения по питанию", description: "ограничения и цель калорий", onClick: U ? void 0 : () => Y("preferences") }),
            /* @__PURE__ */ h.jsx(zt, { title: "Мои данные", description: N ? "рост · вес · возраст · цикл" : "рост · вес · возраст", onClick: U ? void 0 : () => Y("data") }),
            /* @__PURE__ */ h.jsx(zt, { title: "Утренняя сводка", description: g.daily_summary_enabled === !1 ? "выключена" : `${g.send_time || "08:00"} · МСК`, onClick: U ? void 0 : () => Y("summary") }),
            /* @__PURE__ */ h.jsx(
              zt,
              {
                title: "Проактивные сообщения",
                description: g.proactive_enabled === !1 ? "выключены" : "не больше одного в день",
                onClick: U ? void 0 : () => Y("proactive")
              }
            ),
            V ? null : /* @__PURE__ */ h.jsx(zt, { title: "Партнёр и близкие", description: "короткая бережная сводка", onClick: U ? void 0 : X })
          ] }) })
        ] }) : null,
        i === "mode" ? /* @__PURE__ */ h.jsx(vt, { className: "aiwa-tma-blocks aiwa-settings-page", children: /* @__PURE__ */ h.jsx(
          vt.Item,
          {
            header: "Режим Айвы",
            description: "Выбери режим, чтобы рекомендации и календарь учитывали твой текущий этап.",
            role: "radiogroup",
            "aria-label": "Режим Айвы",
            "aria-busy": B === "mode" || void 0,
            children: Fh.map((nt) => /* @__PURE__ */ h.jsx(
              Rs,
              {
                label: nt.label,
                selected: D === nt.value,
                disabled: U,
                onClick: () => ot(nt.value)
              },
              nt.value
            ))
          }
        ) }) : null,
        i === "data" ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
          /* @__PURE__ */ h.jsx(vt, { className: "aiwa-tma-blocks aiwa-settings-page", children: /* @__PURE__ */ h.jsx(
            vt.Item,
            {
              header: "Мои данные",
              description: N ? "Эти параметры помогают точнее рассчитывать питание, нагрузку и прогноз цикла." : "Эти параметры помогают точнее рассчитывать питание и нагрузку.",
              children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-settings-form aiwa-settings-form-grid", children: [
                /* @__PURE__ */ h.jsx(pe, { label: "Рост, см", value: g.height || "", onChange: (nt) => F("height", nt), inputMode: "decimal", disabled: U }),
                /* @__PURE__ */ h.jsx(pe, { label: "Вес, кг", value: g.weight || "", onChange: (nt) => F("weight", nt), inputMode: "decimal", disabled: U }),
                /* @__PURE__ */ h.jsx(pe, { label: "Возраст", value: g.age || "", onChange: (nt) => F("age", nt), inputMode: "numeric", disabled: U }),
                N ? /* @__PURE__ */ h.jsx(pe, { label: "Длина цикла", value: g.cycle_len || "", onChange: (nt) => F("cycle_len", nt), inputMode: "numeric", disabled: U }) : null
              ] })
            }
          ) }),
          /* @__PURE__ */ h.jsx("div", { className: "aiwa-page-action", children: /* @__PURE__ */ h.jsx(
            Te,
            {
              label: "Сохранить",
              loading: B === "profile",
              disabled: U && B !== "profile",
              isFill: !0,
              ...le("Сохранить данные", tt)
            }
          ) })
        ] }) : null,
        i === "preferences" ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
          /* @__PURE__ */ h.jsx(vt, { className: "aiwa-tma-blocks aiwa-settings-page", children: /* @__PURE__ */ h.jsx(
            vt.Item,
            {
              header: "Предпочтения по питанию",
              description: "Напиши только то, что важно учитывать Айве: ограничения, аллергии и желаемую калорийность.",
              children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-settings-form", children: [
                /* @__PURE__ */ h.jsx(
                  pe,
                  {
                    label: "Предпочтения и ограничения",
                    value: g.diet_note || "",
                    onChange: (nt) => F("diet_note", nt),
                    placeholder: "Например: без свинины, аллергия на орехи",
                    multiline: !0,
                    disabled: U
                  }
                ),
                /* @__PURE__ */ h.jsx(pe, { label: "Желаемые калории", value: g.kcal_goal || "", onChange: (nt) => F("kcal_goal", nt), inputMode: "numeric", disabled: U })
              ] })
            }
          ) }),
          /* @__PURE__ */ h.jsx("div", { className: "aiwa-page-action", children: /* @__PURE__ */ h.jsx(
            Te,
            {
              label: "Сохранить",
              loading: B === "preferences",
              disabled: U && B !== "preferences",
              isFill: !0,
              ...le("Сохранить предпочтения", ut)
            }
          ) })
        ] }) : null,
        i === "summary" ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
          /* @__PURE__ */ h.jsx(vt, { className: "aiwa-tma-blocks aiwa-settings-page", children: /* @__PURE__ */ h.jsxs(
            vt.Item,
            {
              header: "Утренняя сводка",
              description: "Айва пришлёт короткую сводку дня в чат в указанное время по Москве.",
              "aria-busy": B === "daily-summary" || B === "summary" || void 0,
              children: [
                /* @__PURE__ */ h.jsxs("div", { role: "radiogroup", "aria-label": "Утренняя сводка", children: [
                  /* @__PURE__ */ h.jsx(
                    Rs,
                    {
                      label: "Присылать утром",
                      selected: g.daily_summary_enabled !== !1,
                      disabled: U,
                      onClick: () => et(!0)
                    }
                  ),
                  /* @__PURE__ */ h.jsx(
                    Rs,
                    {
                      label: "Не присылать",
                      selected: g.daily_summary_enabled === !1,
                      disabled: U,
                      onClick: () => et(!1)
                    }
                  )
                ] }),
                /* @__PURE__ */ h.jsx("div", { className: "aiwa-settings-form", children: /* @__PURE__ */ h.jsx(pe, { label: "Время, МСК", type: "time", value: g.send_time || "08:00", onChange: (nt) => F("send_time", nt), disabled: U }) })
              ]
            }
          ) }),
          /* @__PURE__ */ h.jsx("div", { className: "aiwa-page-action", children: /* @__PURE__ */ h.jsx(
            Te,
            {
              label: "Сохранить",
              loading: B === "summary",
              disabled: U && B !== "summary",
              isFill: !0,
              ...le("Сохранить время сводки", L)
            }
          ) })
        ] }) : null,
        i === "proactive" ? /* @__PURE__ */ h.jsx(vt, { className: "aiwa-tma-blocks aiwa-settings-page", children: /* @__PURE__ */ h.jsxs(
          vt.Item,
          {
            header: "Проактивные сообщения",
            description: "Айва может сама написать, когда заметит важное изменение. Не больше одного сообщения в день.",
            role: "radiogroup",
            "aria-label": "Проактивные сообщения",
            "aria-busy": B === "proactive" || void 0,
            children: [
              /* @__PURE__ */ h.jsx(
                Rs,
                {
                  label: "Включены",
                  selected: g.proactive_enabled !== !1,
                  disabled: U,
                  onClick: () => G(!0)
                }
              ),
              /* @__PURE__ */ h.jsx(
                Rs,
                {
                  label: "Выключены",
                  selected: g.proactive_enabled === !1,
                  disabled: U,
                  onClick: () => G(!1)
                }
              )
            ]
          }
        ) }) : null,
        i === "report" ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
          /* @__PURE__ */ h.jsx(vt, { className: "aiwa-tma-blocks aiwa-settings-page", children: /* @__PURE__ */ h.jsx(
            vt.Item,
            {
              header: V ? "Выписка по самочувствию" : "Выписка для врача",
              description: V ? "Динамика энергии и дневник самочувствия придут PDF-файлом в чат бота." : "Циклы, динамика и дневник симптомов придут PDF-файлом в чат бота.",
              role: "radiogroup",
              "aria-label": "Период выписки",
              "aria-busy": b || void 0,
              children: lR.map((nt) => /* @__PURE__ */ h.jsx(
                Rs,
                {
                  label: nt.label,
                  selected: p === nt.value,
                  disabled: b || U,
                  onClick: () => y(nt.value)
                },
                nt.value
              ))
            }
          ) }),
          /* @__PURE__ */ h.jsx("div", { className: "aiwa-page-action", children: /* @__PURE__ */ h.jsx(
            Te,
            {
              label: "Собрать выписку",
              loading: b,
              disabled: U,
              isFill: !0,
              ...le("Собрать выписку", q)
            }
          ) })
        ] }) : null,
        i === "partner" ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
          /* @__PURE__ */ h.jsx(vt, { className: "aiwa-tma-blocks aiwa-settings-page", children: /* @__PURE__ */ h.jsxs(
            vt.Item,
            {
              header: "Партнёр и близкие",
              description: "Близкий получит только бережную сводку о поддержке и отдыхе — без календаря, интимных и медицинских деталей.",
              children: [
                u === null ? /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsx(Tt.Text, { title: "Готовлю ссылку…" }) }) : null,
                u?.linked ? /* @__PURE__ */ h.jsx(zt, { title: "Партнёр подключён", description: "Бережная сводка включена" }) : null,
                u?.link ? /* @__PURE__ */ h.jsx("div", { className: "aiwa-settings-form", children: /* @__PURE__ */ h.jsx(pe, { label: "Ссылка-приглашение", value: u.link, readOnly: !0, multiline: !0 }) }) : null,
                u && !u.linked && !u.link ? /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsx(Tt.Text, { title: "Ссылка доступна только в Telegram", description: "В боте можно использовать команду /partner" }) }) : null
              ]
            }
          ) }),
          u?.linked ? /* @__PURE__ */ h.jsx("div", { className: "aiwa-page-action", children: /* @__PURE__ */ h.jsx(
            Te,
            {
              label: "Отключить партнёра",
              loading: B === "unlink-partner",
              disabled: !!B && B !== "unlink-partner",
              isFill: !0,
              ...le("Отключить партнёра", ht)
            }
          ) }) : null,
          u?.link ? /* @__PURE__ */ h.jsx("div", { className: "aiwa-page-action", children: /* @__PURE__ */ h.jsx(
            Te,
            {
              label: "Скопировать ссылку",
              loading: B === "copy-partner",
              disabled: !!B && B !== "copy-partner",
              isFill: !0,
              ...le("Скопировать ссылку", ct)
            }
          ) }) : null
        ] }) : null
      ] }) })
    }
  );
}
const cR = (n) => {
  const t = Ve("homeSelectedDayPatch", n);
  return t ? { value: t.heroValue, label: t.countdownLabel } : null;
};
function uR(n) {
  return /* @__PURE__ */ h.jsx(ni, { children: /* @__PURE__ */ h.jsx(ei, { mode: "secondary", children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-deslop-home", children: [
    /* @__PURE__ */ h.jsx(
      yp,
      {
        title: n.dateText,
        days: n.week,
        selectedIso: n.selectedIso,
        heroValue: n.heroValue || `${n.countdown} дней`,
        heroLabel: n.countdownLabel,
        onSelect: n.onSelectDay ?? ((t) => T3(t.iso)),
        previewDay: n.previewDay ?? cR,
        onProfile: () => window.AiwaDeslop?.openProfile?.(),
        onCalendar: () => Zn("openHomePanel", "calendar"),
        action: /* @__PURE__ */ h.jsx(
          ti,
          {
            variant: "filled",
            label: /* @__PURE__ */ h.jsxs("span", { className: "aiwa-btn-icon-label", children: [
              /* @__PURE__ */ h.jsx(Ks, {}),
              " Занести в журнал"
            ] }),
            ...le("Занести в журнал", () => Zn("openHomePanel", "journal"))
          }
        )
      }
    ),
    /* @__PURE__ */ h.jsxs(vt, { className: "aiwa-tma-blocks", children: [
      /* @__PURE__ */ h.jsx(i7, { title: n.dayTitle, checkin: n.dayCheckin ?? n.checkin, symptomGroups: n.symptomGroups }),
      /* @__PURE__ */ h.jsx(c7, { aiText: n.aiText }),
      /* @__PURE__ */ h.jsx(u7, { delay: n.delay }),
      /* @__PURE__ */ h.jsx(m7, { metrics: n.metrics, title: n.statsTitle }),
      n.pregnancy ? /* @__PURE__ */ h.jsx(M7, { pregnancy: n.pregnancy }) : /* @__PURE__ */ h.jsx(
        g7,
        {
          data: n.chartData,
          series: n.chartSeries,
          title: n.chartTitle,
          band: n.chartBand,
          emptyText: n.chartEmptyText
        }
      ),
      n.mode === "meno" || n.mode === "preg" ? null : /* @__PURE__ */ h.jsx(
        v7,
        {
          history: n.history,
          title: n.historyTitle,
          emptyTitle: n.historyEmptyTitle,
          emptyDescription: n.historyEmptyDescription
        }
      ),
      /* @__PURE__ */ h.jsx(A7, {})
    ] }),
    /* @__PURE__ */ h.jsx(
      I7,
      {
        panel: n.panel,
        onClose: n.onPanelClose,
        checkin: n.dayCheckin ?? n.checkin,
        dayIso: n.selectedIso,
        symptomGroups: n.symptomGroups,
        mode: n.mode,
        revision: n.panelRevision
      }
    ),
    /* @__PURE__ */ h.jsx(wp, { isOpen: n.profileOpen, onClose: n.onProfileClose })
  ] }) }) });
}
const K2 = {
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
}, em = (n) => Array.from({ length: n }, (t, i) => i);
function fR({ kind: n }) {
  return n === "week" ? /* @__PURE__ */ h.jsxs("div", { className: "aiwa-overview", children: [
    /* @__PURE__ */ h.jsx("div", { className: "aiwa-week", children: em(7).map((t) => /* @__PURE__ */ h.jsx(zs, { className: "aiwa-skeleton-day" }, t)) }),
    /* @__PURE__ */ h.jsxs("div", { className: "aiwa-countdown", children: [
      /* @__PURE__ */ h.jsx(Ni, { active: !0, width: 2 }),
      /* @__PURE__ */ h.jsx(Ni, { active: !0, width: 18 })
    ] })
  ] }) : /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
    /* @__PURE__ */ h.jsx(zs, { className: "aiwa-skeleton-gauge" }),
    /* @__PURE__ */ h.jsx("div", { className: "aiwa-macro-grid", children: em(3).map((t) => /* @__PURE__ */ h.jsx(zs, { className: "aiwa-skeleton-macro" }, t)) })
  ] });
}
function U3({ title: n, variant: t = "food" }) {
  const { hero: i, sections: l } = K2[t] || K2.food;
  return /* @__PURE__ */ h.jsx(ni, { children: /* @__PURE__ */ h.jsx(ei, { mode: "secondary", children: /* @__PURE__ */ h.jsxs(
    "div",
    {
      className: `aiwa-paper-screen aiwa-screen-skeleton aiwa-${t}-screen`,
      role: "status",
      "aria-label": "Айва загружается",
      children: [
        /* @__PURE__ */ h.jsx(pt, { className: "aiwa-screen-title", variant: "title1", weight: "semibold", children: n }),
        /* @__PURE__ */ h.jsxs(LS, { active: !0, children: [
          /* @__PURE__ */ h.jsx(fR, { kind: i }),
          /* @__PURE__ */ h.jsx("div", { className: "aiwa-screen-cta", children: /* @__PURE__ */ h.jsx(zs, { className: "aiwa-skeleton-cta" }) }),
          /* @__PURE__ */ h.jsxs(vt, { className: "aiwa-tma-blocks", children: [
            /* @__PURE__ */ h.jsx(vt.Item, { className: "aiwa-insight-section", children: /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-insight-content", children: [
              /* @__PURE__ */ h.jsx(Ni, { active: !0, width: 30 }),
              /* @__PURE__ */ h.jsx(Ni, { active: !0, width: 26 }),
              /* @__PURE__ */ h.jsx(zs, { className: "aiwa-skeleton-insight-cta" })
            ] }) }) }),
            l.map((o) => /* @__PURE__ */ h.jsx(vt.Item, { header: o.header, children: em(o.rows).map((c) => /* @__PURE__ */ h.jsx(
              Tt,
              {
                tappable: !1,
                start: o.media ? /* @__PURE__ */ h.jsx(zs, { className: "aiwa-skeleton-thumb" }) : void 0,
                children: /* @__PURE__ */ h.jsx(
                  Tt.Text,
                  {
                    title: /* @__PURE__ */ h.jsx(Ni, { active: !0, width: 13 }),
                    description: /* @__PURE__ */ h.jsx(Ni, { active: !0, width: 22 })
                  }
                )
              },
              c
            )) }, o.header))
          ] })
        ] })
      ]
    }
  ) }) });
}
function sh({ label: n, value: t, target: i, macro: l, color: o }) {
  const c = i ? Math.min(100, Math.round(Number(t || 0) / Number(i) * 100)) : 0, u = o || (l ? `var(--aiwa-macro-${l})` : "var(--aiwa-accent)");
  return /* @__PURE__ */ h.jsxs("div", { className: "aiwa-macro-card", children: [
    /* @__PURE__ */ h.jsxs(pt, { variant: "body", weight: "semibold", children: [
      /* @__PURE__ */ h.jsx(Xs, { variant: "number", animation: "snappy", children: `${Math.round(t || 0)}${i ? "" : " г"}` }),
      i ? /* @__PURE__ */ h.jsxs("span", { className: "aiwa-macro-target", children: [
        " / ",
        Math.round(i),
        " г"
      ] }) : null
    ] }),
    /* @__PURE__ */ h.jsx(pt, { variant: "caption1", weight: "regular", children: n }),
    /* @__PURE__ */ h.jsx("span", { className: "aiwa-macro-track", style: { "--macro-color": u }, children: /* @__PURE__ */ h.jsx("span", { style: { width: `${c}%` } }) })
  ] });
}
const Z2 = "M 11 169 A 158 158 0 0 1 327 169", Q2 = Math.PI * 158, dR = 500, hR = (n) => 1 - (1 - n) ** 3;
function mR(n) {
  const [t, i] = C.useState(0), l = C.useRef(0), o = C.useRef(0);
  return C.useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      l.current = n, i(n);
      return;
    }
    const u = l.current, d = performance.now(), p = (y) => {
      const g = Math.min(1, (y - d) / dR), v = u + (n - u) * hR(g);
      l.current = v, i(v), g < 1 && (o.current = requestAnimationFrame(p));
    };
    return o.current = requestAnimationFrame(p), () => cancelAnimationFrame(o.current);
  }, [n]), t;
}
function pR({ kcal: n, kcalTarget: t }) {
  const i = Number(n || 0), l = Number(t || 0), o = mR(Math.min(1, i / Math.max(1, l))), c = o * Math.PI, u = 169 - 158 * Math.cos(c), d = 169 - 158 * Math.sin(c);
  return /* @__PURE__ */ h.jsxs("div", { className: "aiwa-food-gauge", children: [
    /* @__PURE__ */ h.jsxs("svg", { className: "aiwa-food-gauge-arc", viewBox: "0 0 338 180", width: "338", height: "180", fill: "none", children: [
      /* @__PURE__ */ h.jsx("path", { className: "aiwa-food-gauge-track", d: Z2 }),
      /* @__PURE__ */ h.jsx(
        "path",
        {
          className: "aiwa-food-gauge-progress",
          d: Z2,
          strokeDasharray: Q2,
          strokeDashoffset: Q2 * (1 - o)
        }
      ),
      /* @__PURE__ */ h.jsx("circle", { className: "aiwa-food-gauge-knob", cx: u, cy: d, r: "11" })
    ] }),
    /* @__PURE__ */ h.jsxs("div", { className: "aiwa-food-gauge-center", children: [
      /* @__PURE__ */ h.jsx(pt, { variant: "title1", weight: "semibold", children: /* @__PURE__ */ h.jsx(Xs, { variant: "number", animation: "snappy", children: Kh(i) }) }),
      /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: /* @__PURE__ */ h.jsx(Xs, { variant: "number", animation: "snappy", children: `из ${Kh(l)}` }) })
    ] })
  ] });
}
function ur({ label: n, options: t, value: i, onChange: l, surface: o = "container" }) {
  return /* @__PURE__ */ h.jsxs("div", { className: "aiwa-form-group", children: [
    n ? /* @__PURE__ */ h.jsx(pt, { className: "aiwa-form-label", variant: "body", weight: "semibold", children: n }) : null,
    /* @__PURE__ */ h.jsx("div", { className: `aiwa-choice-pills${o === "canvas" ? " is-on-canvas" : ""}`, role: "group", "aria-label": n, children: t.map((c) => {
      const u = typeof c == "string" ? { value: c, label: c } : c;
      return /* @__PURE__ */ h.jsx(
        nn,
        {
          as: "button",
          type: "button",
          mode: "opacity",
          className: i === u.value ? "aiwa-choice-pill is-active" : "aiwa-choice-pill",
          "aria-pressed": i === u.value,
          onClick: () => l(u.value),
          children: /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: u.label })
        },
        u.value
      );
    }) })
  ] });
}
const fr = (n, t) => Object.prototype.hasOwnProperty.call(n || {}, t), Rc = (n, t) => {
  if (!n || fr(n, "error")) return null;
  const i = n.diary && typeof n.diary == "object" ? n.diary : n, l = String(n.date ?? "").trim(), o = String(i.date ?? "").trim();
  if (l && o && l !== o) return null;
  const c = l || o;
  return c && c !== t ? null : c && !i.date ? { ...i, date: c } : i;
}, dr = (n) => Number(
  n?.assetRevision ?? n?.diary?.asset_revision ?? 0
), yR = () => {
  let n = 0;
  const t = /* @__PURE__ */ new Map();
  return {
    begin: () => (n += 1, n),
    accept: (i, l) => {
      const o = Number(l);
      if (!i || !Number.isSafeInteger(o) || o <= 0) return !0;
      const c = t.get(i) || 0;
      return o < c ? !1 : (t.set(i, o), !0);
    }
  };
}, F2 = (n, t, i) => t && n?.status === "loaded" ? n : i, gR = (n = {}, t = 0) => Object.fromEntries(
  Object.entries(n).filter(([, i]) => i?.status !== "loaded" || dr(i) >= Number(t || 0))
), vR = (n = {}, t = 0, i = []) => {
  const l = gR(n, t), o = /* @__PURE__ */ new Set([
    ...Object.keys(n).filter((c) => !fr(l, c)),
    ...i
  ]);
  for (const c of [...o]) {
    const u = n[c];
    if (u?.status === "loaded" && dr(u) >= Number(t || 0)) {
      o.delete(c);
      continue;
    }
    l[c] = {
      status: "stale-assets",
      diary: null,
      assetRevision: Number(t || 0),
      requiredAssetRevision: Number(t || 0)
    };
  }
  return { entries: l, stale: [...o] };
}, bR = (n = {}, t = {}) => {
  const i = { ...t };
  return delete i.asset_revision, delete i.recent, {
    ...n,
    ...i,
    asset_revision: n.asset_revision,
    recent: n.recent || {}
  };
}, xR = (n, t) => {
  const i = { ...n || {}, ...t || {} }, l = String(n?.title || "").trim().toLocaleLowerCase("ru-RU"), o = String(t?.title || "").trim().toLocaleLowerCase("ru-RU");
  if (l === o) return i;
  for (const c of Object.keys(i))
    (c === "image" || c === "fclass" || c === "content_hash" || c === "style_version" || c.startsWith("image_") || c.startsWith("asset_") || c.startsWith("canonical_")) && delete i[c];
  return i;
}, I2 = ({
  iso: n,
  today: t,
  diary: i,
  recent: l = {},
  explicit: o = {},
  canonicalVersion: c = 0,
  diaryAssetRevision: u = 0
}) => {
  if (n === t) return { status: "loaded", diary: i };
  const d = fr(o, n) ? o[n] : null, p = fr(l, n) ? Rc(l[n], n) : null;
  return Number(d?.requiredAssetRevision || 0) > Number(u || 0) && d?.status !== "loaded" ? {
    status: d?.status === "stale-assets" ? "loading" : d?.status,
    diary: null
  } : d?.status === "loaded" && (!p || Number(d.canonicalVersion ?? -1) >= c) ? d : p ? { status: "loaded", diary: p } : fr(l, n) ? { status: "error", diary: null } : d || { status: "loading", diary: null };
};
let va = null;
const hr = /* @__PURE__ */ new Map(), SR = /* @__PURE__ */ new Set([
  "date_out_of_range",
  "food_target_expired",
  "target_expired"
]), H3 = (n) => globalThis.crypto?.randomUUID?.() || `${n}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`, wR = (n) => JSON.stringify({
  title: String(n?.title || "").trim(),
  kcal: String(n?.kcal ?? "").trim(),
  protein: String(n?.protein ?? "").trim(),
  fat: String(n?.fat ?? "").trim(),
  carbs: String(n?.carbs ?? "").trim(),
  grams: String(n?.grams ?? "").trim(),
  slot: String(n?.slot || "")
}), J2 = (n) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(n || ""))) return null;
  const t = Date.parse(`${n}T00:00:00Z`);
  return !Number.isFinite(t) || new Date(t).toISOString().slice(0, 10) !== n ? null : Math.floor(t / 864e5);
}, CR = (n, t = Qe()) => {
  const i = J2(n), l = J2(t);
  if (i === null || l === null) return !1;
  const o = l - i;
  return o >= 0 && o <= 1;
}, TR = (n) => SR.has(n?.error), jR = (n, t = Qe(), i = () => H3("food-manual")) => {
  const l = wR(n);
  return (!va || va.fingerprint !== l || !CR(va.date, t)) && (va = { fingerprint: l, id: i(), date: t }), va;
}, AR = (n) => {
  va?.id === n && (va = null);
}, ER = (n) => {
  va?.id === n && (va = null);
}, MR = (n, t = () => H3("food-delete")) => {
  const i = String(n);
  return hr.has(i) || hr.set(i, t()), hr.get(i);
}, _R = (n, t) => {
  const i = String(n);
  hr.get(i) === t && hr.delete(i);
};
function W2({ meal: n, onSaved: t, onClose: i, choiceSurface: l = "container" }) {
  const [o, c] = C.useState(() => t7(n)), [u, d] = C.useState(!1), p = (g, v) => c((b) => ({ ...b, [g]: v })), y = async () => {
    if (u) return;
    if (!o.title.trim() && !String(o.kcal).trim()) {
      Mt("Укажи название или калории", { type: "error" });
      return;
    }
    d(!0);
    let g = null;
    try {
      g = n ? null : jR(o);
      const v = await Yt(n ? "/api/diary_edit" : "/api/food_manual", {
        ...n ? { id: n.id } : {},
        ...o,
        ...g ? {
          request_id: g.id,
          date: g.date
        } : {}
      });
      if (v?.ok === !1 || v?.error)
        throw g && TR(v) && ER(g.id), new Error(v.message || "Не получилось сохранить");
      g && AR(g.id), Mt(n ? "Приём обновлён" : "Приём добавлен", { type: "success" }), await t({
        type: n ? "edit" : "receipt",
        result: v,
        meal: n ? xR(n, o) : null
      }), i();
    } catch (v) {
      Mt(v.message || "Не получилось сохранить", { type: "error" });
    } finally {
      d(!1);
    }
  };
  return /* @__PURE__ */ h.jsxs("div", { className: "aiwa-form-stack", children: [
    /* @__PURE__ */ h.jsx(pe, { label: "Название", value: o.title, onChange: (g) => p("title", g), placeholder: "Например, творог и банан" }),
    /* @__PURE__ */ h.jsxs("div", { className: "aiwa-form-grid", children: [
      /* @__PURE__ */ h.jsx(pe, { label: "Ккал", value: o.kcal, onChange: (g) => p("kcal", g), inputMode: "decimal" }),
      /* @__PURE__ */ h.jsx(pe, { label: "Граммы", value: o.grams, onChange: (g) => p("grams", g), inputMode: "decimal" }),
      /* @__PURE__ */ h.jsx(pe, { label: "Белки", value: o.protein, onChange: (g) => p("protein", g), inputMode: "decimal" }),
      /* @__PURE__ */ h.jsx(pe, { label: "Жиры", value: o.fat, onChange: (g) => p("fat", g), inputMode: "decimal" }),
      /* @__PURE__ */ h.jsx(pe, { label: "Углеводы", value: o.carbs, onChange: (g) => p("carbs", g), inputMode: "decimal" })
    ] }),
    /* @__PURE__ */ h.jsx(
      ur,
      {
        label: "Приём пищи",
        options: _3,
        value: o.slot,
        onChange: (g) => p("slot", g),
        surface: l
      }
    ),
    /* @__PURE__ */ h.jsx(
      Te,
      {
        label: n ? "Сохранить изменения" : "Сохранить приём",
        loading: u,
        isFill: !0,
        ...le("Сохранить приём", y)
      }
    )
  ] });
}
function RR({ isOpen: n, onClose: t, onSaved: i, editingMeal: l = null }) {
  const [o, c] = C.useState("text"), [u, d] = C.useState(""), [p, y] = C.useState(!1);
  C.useEffect(() => {
    n && (x3("food"), c(l ? "manual" : "text"), d(""));
  }, [l, n]);
  const g = async () => {
    if (!(p || !u.trim())) {
      y(!0);
      try {
        const b = await Yt("/api/food_text", { text: u.trim() });
        if (!b?.ok) throw new Error(b?.message || "Не получилось разобрать приём");
        Mt(`Добавлено · ${b.rec?.kcal || 0} ккал`, { type: "success" }), await i({ type: "receipt", result: b }), t();
      } catch (b) {
        Mt(b.message || "Не получилось добавить", { type: "error" });
      } finally {
        y(!1);
      }
    }
  }, v = async (b) => {
    if (!(p || !b)) {
      y(!0);
      try {
        const j = window.aiwaUploadFoodPhoto;
        if (typeof j != "function") throw new Error("Загрузка фото недоступна");
        const w = await j(b);
        await i(w && typeof w == "object" ? { type: "receipt", result: w } : null), Mt("Приём добавлен", { type: "success" }), t();
      } catch (j) {
        Mt(j.message || "Не получилось разобрать фото", { type: "error" });
      } finally {
        y(!1);
      }
    }
  };
  return /* @__PURE__ */ h.jsx(Bn, { isOpen: n, onClose: t, "aria-label": l ? "Изменить приём пищи" : "Добавить приём пищи", children: /* @__PURE__ */ h.jsx("div", { children: /* @__PURE__ */ h.jsx("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: l ? /* @__PURE__ */ h.jsx(W2, { meal: l, onSaved: i, onClose: t, choiceSurface: "canvas" }) : /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
    /* @__PURE__ */ h.jsx(
      ur,
      {
        surface: "canvas",
        options: [
          { value: "photo", label: "Фото" },
          { value: "text", label: "Текст" },
          { value: "manual", label: "Вручную" }
        ],
        value: o,
        onChange: c
      }
    ),
    o === "photo" ? /* @__PURE__ */ h.jsxs("label", { className: `aiwa-upload-zone${p ? " is-busy" : ""}`, children: [
      p ? /* @__PURE__ */ h.jsx(eu, { size: 28 }) : null,
      /* @__PURE__ */ h.jsx(pt, { variant: "title3", weight: "semibold", children: p ? "Разбираю фото…" : "Сфотографировать еду" }),
      /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: p ? "Айва считает КБЖУ, это займёт несколько секунд." : "Айва распознает блюдо и посчитает КБЖУ." }),
      /* @__PURE__ */ h.jsx("input", { type: "file", accept: "image/*", capture: "environment", disabled: p, onChange: (b) => v(b.target.files?.[0]) })
    ] }) : null,
    o === "text" ? /* @__PURE__ */ h.jsxs("div", { className: "aiwa-form-stack", children: [
      /* @__PURE__ */ h.jsx(
        pe,
        {
          label: "Что было в приёме пищи?",
          value: u,
          onChange: d,
          placeholder: "Например: 200 г творога и банан",
          multiline: !0
        }
      ),
      /* @__PURE__ */ h.jsx(
        Te,
        {
          label: "Добавить приём",
          loading: p,
          isFill: !0,
          disabled: !u.trim(),
          ...le("Добавить приём", g)
        }
      )
    ] }) : null,
    o === "manual" ? /* @__PURE__ */ h.jsx(W2, { meal: null, onSaved: i, onClose: t, choiceSurface: "canvas" }) : null
  ] }) }) }) });
}
function DR({ isOpen: n, onClose: t, diary: i, onAdd: l, onEdit: o, onDelete: c, onReco: u, canAdd: d = !0, focusMealId: p = null }) {
  const y = i?.meals || [], g = i?.totals || {}, v = i?.target || {}, b = C.useRef(null);
  return C.useEffect(() => {
    if (!n || !p || !b.current) return;
    const j = window.setTimeout(() => {
      b.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 80);
    return () => window.clearTimeout(j);
  }, [n, p, y.length]), /* @__PURE__ */ h.jsx(Bn, { isOpen: n, onClose: t, "aria-label": "Дневник питания", children: /* @__PURE__ */ h.jsxs(vt, { className: "aiwa-tma-blocks", children: [
    /* @__PURE__ */ h.jsx(vt.Item, { children: /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsx(
      Tt.Text,
      {
        title: `${Math.round(g.kcal || 0)} ккал`,
        description: `из ${Math.round(v.kcal || 0) || "—"} ккал`,
        bold: !0
      }
    ) }) }),
    _3.map((j) => {
      const w = y.filter((T) => (T.slot || "snack") === j.value);
      return /* @__PURE__ */ h.jsx(vt.Item, { header: j.label, children: w.length ? w.map((T) => {
        const x = String(T.id) === String(p || "");
        return /* @__PURE__ */ h.jsx("div", { ref: x ? b : null, "aria-current": x ? "true" : void 0, children: /* @__PURE__ */ h.jsx(
          zt,
          {
            title: T.title,
            description: `${Math.round(T.kcal || 0)} ккал`,
            onClick: () => o(T),
            separateAction: !0,
            actionLabel: `Изменить ${T.title}, ${Math.round(T.kcal || 0)} ккал`,
            trailing: /* @__PURE__ */ h.jsx(
              nn,
              {
                as: "button",
                type: "button",
                mode: "opacity",
                "aria-label": `Удалить ${T.title}`,
                onClick: (A) => {
                  A.stopPropagation(), c(T.id);
                },
                children: /* @__PURE__ */ h.jsx(y3, {})
              }
            )
          }
        ) }, T.id);
      }) : d ? /* @__PURE__ */ h.jsx(Tt, { as: "button", type: "button", onClick: l, end: /* @__PURE__ */ h.jsx(Tt.Part, { type: "Chevron" }), children: /* @__PURE__ */ h.jsx(Tt.Text, { type: "Accent", title: "Добавить" }) }) : /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsx(Tt.Text, { title: "Нет записей" }) }) }, j.value);
    }),
    d || u ? /* @__PURE__ */ h.jsx(vt.Item, { children: /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-cell-actions", children: [
      d ? /* @__PURE__ */ h.jsx(ti, { variant: "filled", label: "Добавить приём", isFill: !0, ...le("Добавить приём", l) }) : null,
      u ? /* @__PURE__ */ h.jsx(ti, { variant: "filled", label: "Совет по дневнику", isFill: !0, ...le("Совет по дневнику", u) }) : null
    ] }) }) }) : null
  ] }) });
}
const NR = (n) => {
  const t = String(n || "").match(/\d[\d\s\u00a0]*/);
  return t ? `${t[0].trim()} калорий` : "";
};
function OR({ isOpen: n, meal: t, image: i, slotLabel: l = "", onClose: o, onAdd: c, busy: u = !1 }) {
  const [d, p] = C.useState(null), [y, g] = C.useState(!1), v = t?.dish || "";
  C.useEffect(() => {
    if (!n || !v) return;
    p(null), g(!1);
    let A = !0;
    return Yt("/api/recipe", { dish: v, kcal: t?.kcal }).then((_) => {
      A && (_?.steps?.length ? p(_) : g(!0));
    }).catch(() => A && g(!0)), () => {
      A = !1;
    };
  }, [n, v]);
  const b = d?.macros || {}, j = [b.protein && `Б ${b.protein}`, b.fat && `Ж ${b.fat}`, b.carbs && `У ${b.carbs}`].filter(Boolean).join(" · "), w = d?.kcal || t?.kcal, T = [w, j].filter(Boolean).join(" · "), x = [l, NR(w), d?.time].filter(Boolean).join(" · ");
  return /* @__PURE__ */ h.jsx(Bn, { isOpen: n, onClose: o, "aria-label": v ? `Рецепт: ${v}` : "Рецепт", children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-sheet-scroll aiwa-recipe-page", children: [
    /* @__PURE__ */ h.jsxs("header", { className: "aiwa-recipe-hero", children: [
      i ? /* @__PURE__ */ h.jsx("span", { className: "aiwa-recipe-image", children: /* @__PURE__ */ h.jsx("img", { src: i, alt: v }) }) : null,
      /* @__PURE__ */ h.jsxs("div", { className: "aiwa-recipe-heading", children: [
        /* @__PURE__ */ h.jsx(pt, { as: "h1", variant: "body", weight: "semibold", children: v }),
        x || t?.note ? /* @__PURE__ */ h.jsx(pt, { as: "p", variant: "subheadline2", weight: "regular", children: x || t?.note }) : null
      ] })
    ] }),
    /* @__PURE__ */ h.jsxs("main", { className: "aiwa-recipe-content", "aria-live": "polite", children: [
      !d && !y ? /* @__PURE__ */ h.jsxs("div", { className: "aiwa-recipe-status", role: "status", "aria-label": "Готовлю рецепт", children: [
        /* @__PURE__ */ h.jsx(eu, { size: "m" }),
        /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: "Айва пишет рецепт…" })
      ] }) : null,
      y ? /* @__PURE__ */ h.jsxs("section", { className: "aiwa-recipe-section", children: [
        /* @__PURE__ */ h.jsx(pt, { as: "h2", variant: "body", weight: "semibold", children: "Рецепт не собрался" }),
        /* @__PURE__ */ h.jsx(pt, { as: "p", variant: "body", weight: "regular", children: "Попробуй открыть блюдо ещё раз." })
      ] }) : null,
      d ? /* @__PURE__ */ h.jsxs("section", { className: "aiwa-recipe-section", children: [
        /* @__PURE__ */ h.jsx(pt, { as: "h2", variant: "body", weight: "semibold", children: "Питательность" }),
        /* @__PURE__ */ h.jsx(pt, { as: "p", variant: "body", weight: "regular", children: T || "—" }),
        d.micros?.length ? /* @__PURE__ */ h.jsx(pt, { as: "p", variant: "body", weight: "regular", children: d.micros.join("; ") }) : null
      ] }) : null,
      d?.ingredients?.length ? /* @__PURE__ */ h.jsxs("section", { className: "aiwa-recipe-section", children: [
        /* @__PURE__ */ h.jsx(pt, { as: "h2", variant: "body", weight: "semibold", children: "Ингредиенты" }),
        /* @__PURE__ */ h.jsx("ul", { className: "aiwa-recipe-list", children: d.ingredients.map((A) => /* @__PURE__ */ h.jsx("li", { children: /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: A }) }, A)) })
      ] }) : null,
      d?.steps?.length ? /* @__PURE__ */ h.jsxs("section", { className: "aiwa-recipe-section", children: [
        /* @__PURE__ */ h.jsx(pt, { as: "h2", variant: "body", weight: "semibold", children: "Приготовление" }),
        /* @__PURE__ */ h.jsx("ol", { className: "aiwa-recipe-list", children: d.steps.map((A, _) => /* @__PURE__ */ h.jsx("li", { value: _ + 1, children: /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: A }) }, A)) })
      ] }) : null
    ] }),
    /* @__PURE__ */ h.jsx("div", { className: "aiwa-recipe-action", children: /* @__PURE__ */ h.jsx(
      Te,
      {
        label: "Добавить в дневник",
        loading: u,
        isFill: !0,
        ...le("Добавить в дневник", c)
      }
    ) })
  ] }) });
}
function LR() {
  const n = /* @__PURE__ */ new Map();
  return {
    begin(t) {
      const i = (n.get(t) || 0) + 1;
      return n.set(t, i), i;
    },
    isCurrent(t, i) {
      return n.get(t) === i;
    }
  };
}
const $R = (n) => !!n && !(typeof n == "object" && Object.prototype.hasOwnProperty.call(n, "error")), q3 = {
  foodSection: () => Yt("/api/section", { kind: "food" }),
  diary: () => Yt("/api/diary", {}),
  trainingSection: () => Yt("/api/section", { kind: "training" }),
  train: () => Yt("/api/train", {})
}, Bs = /* @__PURE__ */ new Map(), uc = /* @__PURE__ */ new Map(), nm = /* @__PURE__ */ new Map(), Gc = /* @__PURE__ */ new Map(), am = LR(), fc = (n) => Object.fromEntries(n.map((t) => [t, Bs.get(t) ?? null])), kR = (n) => Object.fromEntries(n.map((t) => [t, Gc.get(t) ?? null])), im = (n, { force: t = !1, maxAgeMs: i = 1500 } = {}) => {
  if (!t) {
    const c = uc.get(n);
    if (c) return c;
    if (Bs.has(n) && Date.now() - (nm.get(n) || 0) <= i)
      return Promise.resolve(Bs.get(n));
  }
  const l = am.begin(n), o = q3[n]().catch((c) => ({ error: c?.message || "network" })).then((c) => (am.isCurrent(n, l) && ($R(c) ? (Bs.set(n, c), nm.set(n, Date.now()), Gc.delete(n)) : Gc.set(n, c?.error || "network")), uc.get(n) === o && uc.delete(n), Bs.get(n) ?? null));
  return uc.set(n, o), o;
}, BR = () => {
  Object.keys(q3).forEach((n) => {
    im(n);
  });
};
function Y3(n, t) {
  const [i, l] = C.useState(() => fc(n)), o = C.useRef(!1), c = C.useCallback(async (...d) => {
    const p = d.length ? d : n;
    await Promise.all(p.map((y) => im(y, { force: !0 }))), l(fc(n));
  }, [n]), u = C.useCallback((d, p) => {
    am.begin(d), Bs.set(d, p), nm.set(d, Date.now()), Gc.delete(d), l(fc(n));
  }, [n]);
  return C.useEffect(() => {
    let d = !0;
    const p = o.current;
    return o.current = !0, Promise.all(n.map((y) => im(y, { force: p }))).then(() => {
      d && l(fc(n));
    }), () => {
      d = !1;
    };
  }, t), [i, c, u, kR(n)];
}
const tb = ["foodSection", "diary"], P3 = "/assets/food/meal-placeholder.webp", Xc = (n) => String(n || "").toLowerCase().replace(/ё/g, "е").replace(/\s+/g, " ").trim(), eb = "?v=2", nb = (n, t) => {
  const i = Xc(t);
  if (!n || !i) return null;
  const l = n[String(t || "").trim()];
  if (l) return l + eb;
  for (const [o, c] of Object.entries(n))
    if (Xc(o) === i) return c + eb;
  return null;
}, VR = (n) => {
  const t = Xc([
    n?.title,
    ...Array.isArray(n?.items) ? n.items.map((l) => l?.name) : []
  ].filter(Boolean).join(" "));
  return Xc(n?.fclass) === "напиток" || /(кофе|чай|какао|вода|сок|напит|латте|капуч|морс|компот)/.test(t) ? "/assets/food/drink-placeholder.webp" : P3;
}, dc = (n, t) => Object.prototype.hasOwnProperty.call(n, t), zR = (n) => (n || []).reduce((t, i) => ({
  kcal: t.kcal + Number(i?.kcal || 0),
  protein: t.protein + Number(i?.protein || 0),
  fat: t.fat + Number(i?.fat || 0),
  carbs: t.carbs + Number(i?.carbs || 0)
}), { kcal: 0, protein: 0, fat: 0, carbs: 0 });
function ab({ mode: n, revision: t = 0 }) {
  const [i, l, o, c] = Y3(tb, [n, t]), [u, d] = C.useState(!1), [p, y] = C.useState(!1), [g, v] = C.useState({}), b = mp(), j = w3(), [w, T] = C.useState({}), [x, A] = C.useState(null), [_, E] = C.useState(!1), [M, O] = C.useState(null), [D, N] = C.useState(!1), [V, H] = C.useState(""), [B] = C.useState(() => Ve("aiwaConsumeOpenReceipt")), [U, F] = C.useState(null), [Y, st] = C.useState(null), [I, $] = C.useState(!1), X = C.useRef(null), J = C.useRef(null), tt = C.useRef({}), ut = C.useRef(/* @__PURE__ */ new Map()), L = C.useRef(0), q = C.useRef(/* @__PURE__ */ new Map()), G = C.useRef(null), et = C.useRef(0), ot = C.useRef(null);
  ot.current || (ot.current = yR());
  const ct = Math.max(
    Number(i.foodSection?.asset_revision || 0),
    Number(i.diary?.asset_revision || 0)
  ), ht = Number(i.diary?.asset_revision || 0), nt = C.useRef(ct);
  nt.current = Math.max(nt.current, ct), i.diary && i.diary !== G.current && (G.current = i.diary, et.current += 1), C.useEffect(() => {
    B?.tab === "food" && B?.view === "diary" && H("diary");
  }, [B]);
  const dt = C.useCallback((at, Bt) => {
    const jt = { ...tt.current, [at]: Bt };
    tt.current = jt, T(jt);
  }, []), ft = C.useCallback((at) => {
    tt.current = at, T(at);
  }, []), yt = C.useCallback((at) => {
    const Bt = tt.current, jt = [...ut.current.keys()], Pe = Number(at || 0) > ht ? Object.keys(i.diary?.recent || {}) : [], Vt = vR(
      Bt,
      at,
      [...jt, ...Pe]
    );
    if (!Vt.stale.length) return Vt.stale;
    for (const Me of Vt.stale)
      q.current.set(Me, ++L.current), ut.current.delete(Me);
    return ft(Vt.entries), Vt.stale;
  }, [i.diary?.recent, ht, ft]), gt = C.useCallback((at, { force: Bt = !1, preserveLoadedOnError: jt = !1 } = {}) => {
    const Pe = ut.current.get(at);
    if (Pe && !Bt) return Pe;
    const Vt = ++L.current;
    q.current.set(at, Vt);
    const Me = et.current, zn = nt.current, _e = tt.current[at], de = Number(
      _e?.requiredAssetRevision || (_e?.status === "stale-assets" ? dr(_e) : 0)
    ), ja = {
      status: "error",
      diary: null,
      ...de > 0 ? { requiredAssetRevision: de, assetRevision: de } : {}
    };
    jt && _e?.status === "loaded" || dt(at, {
      status: "loading",
      diary: null,
      ...de > 0 ? { requiredAssetRevision: de, assetRevision: de } : {}
    });
    const In = Yt("/api/diary", { d: at }).then((ge) => {
      const Wt = Rc(ge, at), Ne = Number(Wt?.asset_revision || 0);
      return Wt && (de <= 0 || Ne >= de) ? {
        status: "loaded",
        diary: Wt,
        canonicalVersion: Me,
        assetRevision: Math.max(
          Ne,
          zn
        )
      } : F2(_e, jt, ja);
    }).catch(() => F2(_e, jt, ja)).then((ge) => {
      if (q.current.get(at) === Vt) {
        dt(at, ge);
        const Wt = dr(ge);
        ge?.status === "loaded" && Wt > 0 && (nt.current = Math.max(
          nt.current,
          Wt
        ), yt(Wt));
      }
      return ge;
    }).finally(() => {
      ut.current.get(at) === In && ut.current.delete(at);
    });
    return ut.current.set(at, In), In;
  }, [dt, yt]), ue = !!i.foodSection?.refreshing, mt = C.useRef(0);
  C.useEffect(() => {
    if (!ue) {
      mt.current = 0;
      return;
    }
    if (mt.current >= 3) return;
    const at = Math.max(5e3, Number(i.foodSection?.retry_after_ms || 8e3)) + Math.floor(Math.random() * 2500), Bt = setTimeout(() => {
      document.visibilityState === "visible" && (mt.current += 1, l("foodSection"));
    }, at);
    return () => clearTimeout(Bt);
  }, [ue, i.foodSection, l]);
  const _t = C.useRef({ revision: null, attempts: 0 }), fe = [
    ...i.foodSection?.menu?.meals || [],
    ...i.diary?.meals || [],
    ...Object.values(i.diary?.recent || {}).flatMap((at) => at?.meals || []),
    ...Object.values(w).flatMap((at) => at?.diary?.meals || [])
  ].some((at) => at?.asset_state === "missing" || at?.image_source === "catalog_family" || at?.image_source === "catalog_canonical"), se = Math.max(
    nt.current,
    ct,
    ...Object.values(w).map(dr)
  );
  C.useEffect(() => {
    if (!fe) {
      _t.current = { revision: null, attempts: 0 };
      return;
    }
    _t.current.revision === null && (_t.current.revision = se);
    let at = !0, Bt = null;
    const jt = async () => {
      if (!(!at || _t.current.attempts >= 30)) {
        if (document.visibilityState === "visible") {
          const Pe = await Yt("/api/food-assets/revision", {}).catch(() => null), Vt = Number(Pe?.revision);
          if (Number.isFinite(Vt)) {
            const Me = _t.current.revision;
            _t.current.revision = Vt, nt.current = Math.max(nt.current, Vt), Me !== null && Vt !== Me && (yt(Vt), await l("foodSection", "diary"), at && b !== j && await gt(b, { force: !0 }));
          }
          _t.current.attempts += 1;
        }
        at && _t.current.attempts < 30 && (Bt = setTimeout(jt, 6e4 + Math.floor(Math.random() * 2e4)));
      }
    };
    return Bt = setTimeout(jt, 15e3 + Math.floor(Math.random() * 2e4)), () => {
      at = !1, Bt && clearTimeout(Bt);
    };
  }, [fe, yt, se, l, gt, b, j]), C.useEffect(() => {
    if (!ct) return;
    const at = yt(ct);
    b !== j && at.includes(b) && gt(b, { force: !0 });
  }, [ct, yt, gt, b, j]), C.useEffect(() => {
    fetch("/assets/food/manifest.json", { cache: "no-cache" }).then((at) => at.ok ? at.json() : {}).then((at) => v(at || {})).catch(() => {
    });
  }, []), C.useEffect(() => {
    if (!i.diary || !b || b === j) return;
    if (w[b]?.status === "stale-assets") {
      gt(b, { force: !0 });
      return;
    }
    dc(i.diary.recent || {}, b) || dc(w, b) || gt(b);
  }, [i.diary, w, gt, b, j]);
  const hn = async (at = null) => {
    const Bt = String(at?.targetIso || "").trim(), jt = String(
      at?.result?.date || at?.result?.diary?.date || (at?.type === "edit" || at?.type === "delete" ? Bt || b : j)
    ), Vt = !(at?.type === "edit" || at?.type === "delete") || ot.current.accept(
      jt,
      at?.mutationToken
    );
    let Me = !Vt && jt === b;
    const zn = at?.result ? Rc(at.result, jt) : null, _e = zn && Array.isArray(zn.meals) ? zn : null;
    if (Vt && _e) {
      const de = Number(_e.asset_revision || 0);
      de > 0 && (nt.current = Math.max(
        nt.current,
        de
      ), yt(de)), jt === j ? o("diary", bR(i.diary, _e)) : (dt(jt, {
        status: "loaded",
        diary: _e,
        canonicalVersion: et.current + 1,
        assetRevision: Math.max(
          Number(_e.asset_revision || 0),
          nt.current
        )
      }), dc(i.diary?.recent || {}, jt) && o("diary", {
        ...i.diary || {},
        recent: { ...i.diary?.recent || {}, [jt]: _e }
      }), Me = jt === b);
    }
    if (Vt && !_e && jt && jt !== j && (at?.type === "edit" || at?.type === "delete")) {
      const de = I2({
        iso: jt,
        today: j,
        diary: i.diary,
        recent: i.diary?.recent || {},
        explicit: tt.current,
        canonicalVersion: et.current,
        diaryAssetRevision: ht
      }).diary;
      if (de) {
        const ja = at.type === "delete" ? (de.meals || []).filter((ge) => ge.id !== at.id) : (de.meals || []).map((ge) => ge.id === at.meal?.id ? at.meal : ge), In = { ...de, meals: ja, totals: zR(ja), date: jt };
        dt(jt, {
          status: "loaded",
          diary: In,
          canonicalVersion: et.current + 1,
          assetRevision: nt.current
        }), dc(i.diary?.recent || {}, jt) && o("diary", {
          ...i.diary || {},
          ...Rc(at.result, j) || {},
          recent: { ...i.diary?.recent || {}, [jt]: In }
        }), Me = jt === b;
      }
    }
    await l("diary"), b && b !== j && await gt(b, {
      force: !0,
      preserveLoadedOnError: Me
    });
  }, qe = c.foodSection || c.diary, wa = () => l(...tb.filter((at) => c[at]));
  if (!i.foodSection || !i.diary)
    return qe ? /* @__PURE__ */ h.jsx(ni, { children: /* @__PURE__ */ h.jsx(ei, { mode: "secondary", children: /* @__PURE__ */ h.jsx("div", { className: "aiwa-paper-screen aiwa-food-screen", children: /* @__PURE__ */ h.jsx(vt, { className: "aiwa-tma-blocks", children: /* @__PURE__ */ h.jsx(vt.Item, { header: "Питание", children: /* @__PURE__ */ h.jsx(
      zt,
      {
        title: "Не удалось загрузить данные",
        description: "Нажми, чтобы попробовать ещё раз.",
        onClick: wa
      }
    ) }) }) }) }) }) : /* @__PURE__ */ h.jsx(U3, { title: "Питание", variant: "food" });
  const Js = i.foodSection, Qn = i.diary, ze = Qn.target || {}, $r = Js.menu?.meals || [], Ws = [
    { index: 0, value: "breakfast", label: "Завтрак" },
    { index: 1, value: "lunch", label: "Обед" },
    { index: $r.length >= 4 ? 3 : 2, value: "dinner", label: "Ужин" }
  ].map((at) => ({ ...at, meal: $r[at.index] })).filter((at) => at.meal).map((at) => ({
    ...at,
    // Server artwork is authoritative; the exact manifest match and the
    // meal placeholder are fallbacks only.
    image: at.meal.image_url || at.meal.image || nb(g, at.meal.dish) || P3
  })), zi = Qn.recent || {}, kr = (at) => I2({
    iso: at,
    today: j,
    diary: Qn,
    recent: zi,
    explicit: w,
    canonicalVersion: et.current,
    diaryAssetRevision: ht
  }), Ca = kr(b), Ui = Ca.diary, ye = b !== j;
  Ca.status === "loaded" && Ui && (J.current = Ui);
  const Ta = ye ? Ui?.meals || [] : (Qn.meals || []).slice().reverse(), Ye = ye ? `Приёмы за ${Or(b)}` : "Прошедшие приёмы", Vn = I || ye && Ca.status === "loading", Ue = ye && Ca.status === "error", lu = Ta.length > 0 || Vn || Ue, ru = () => gt(b, { force: !0 }), ou = (at) => {
    const Bt = kr(at);
    if (Bt.status === "error")
      return /* @__PURE__ */ h.jsxs("div", { className: "aiwa-countdown", role: "status", "aria-label": "Данные за выбранный день недоступны", children: [
        /* @__PURE__ */ h.jsx(pt, { variant: "title1", weight: "semibold", children: "—" }),
        /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: "Данные за этот день недоступны" })
      ] });
    const jt = Bt.diary || Bt.status === "loading" && J.current || Qn, Pe = jt.totals || {}, Vt = jt.target || ze, Me = (zn) => Number(Pe[zn] || 0);
    return /* @__PURE__ */ h.jsxs("div", { className: "aiwa-day-hero", "data-loading": Bt.status === "loading" ? "true" : void 0, children: [
      /* @__PURE__ */ h.jsx(
        pR,
        {
          kcal: Number(Pe.kcal || 0),
          kcalTarget: Number(Vt.kcal || Js.kcal || 0)
        }
      ),
      /* @__PURE__ */ h.jsxs("div", { className: "aiwa-macro-grid", children: [
        /* @__PURE__ */ h.jsx(sh, { label: "Жиры", value: Me("fat"), target: Vt.fat, macro: "fat" }),
        /* @__PURE__ */ h.jsx(sh, { label: "Белки", value: Me("protein"), target: Vt.protein, macro: "protein" }),
        /* @__PURE__ */ h.jsx(sh, { label: "Углеводы", value: Me("carbs"), target: Vt.carbs, macro: "carbs" })
      ] })
    ] });
  }, Hi = async () => {
    if (!D) {
      N(!0);
      try {
        const at = await Yt("/api/week_food_review", {}).catch(() => null);
        at?.review?.summary ? O(at.review) : O({ summary: at?.text || "Не получилось собрать разбор, попробуй чуть позже.", gaps: [], tips: [] });
      } finally {
        N(!1);
      }
    }
  }, qi = async (at, Bt) => {
    if (!(ye || _)) {
      E(!0);
      try {
        const jt = await Yt("/api/food_text", { text: at.dish || at.title, slot: Bt }).catch(() => null);
        jt?.ok ? (Mt("Добавлено в дневник", { type: "success" }), A(null), await hn({ type: "receipt", result: jt })) : Mt(jt?.message || "Не получилось добавить", { type: "error" });
      } finally {
        E(!1);
      }
    }
  }, Yi = async (at) => {
    const Bt = ot.current.begin(), jt = b, Pe = MR(at);
    try {
      const Vt = await Yt("/api/diary_del", { id: at, request_id: Pe });
      if (!Vt || Vt.error || Vt.ok === !1)
        throw new Error(Vt?.message || "Не получилось удалить приём");
      _R(at, Pe), Mt("Приём удалён", { type: "success" }), await hn({ type: "delete", id: at, result: Vt, mutationToken: Bt, targetIso: jt });
    } catch (Vt) {
      Mt(Vt?.message || "Не получилось удалить приём", { type: "error" });
    }
  }, Fn = () => {
    ye || (st(null), F(null), H("add"));
  }, Pi = async (at) => {
    if (!(ye || !at || I)) {
      $(!0);
      try {
        const Bt = window.aiwaUploadFoodPhoto;
        if (typeof Bt != "function") throw new Error("Загрузка фото недоступна");
        const jt = await Bt(at);
        await hn(jt && typeof jt == "object" ? { type: "receipt", result: jt } : null), Mt("Приём добавлен", { type: "success" });
      } catch (Bt) {
        Mt(Bt.message || "Не получилось разобрать фото", { type: "error" });
      } finally {
        $(!1);
      }
    }
  }, ii = async () => {
    ye || (await Yt("/api/food_prompt", {}).catch(() => null), Zs({ nudge: !1 }));
  }, cu = [
    { label: "Фото", icon: /* @__PURE__ */ h.jsx(O_, {}), onSelect: () => X.current?.click() },
    { label: "Текстом", icon: /* @__PURE__ */ h.jsx(L_, {}), onSelect: ii }
  ];
  return /* @__PURE__ */ h.jsx(ni, { children: /* @__PURE__ */ h.jsx(ei, { mode: "secondary", children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-paper-screen aiwa-food-screen", children: [
    /* @__PURE__ */ h.jsx(
      yp,
      {
        hero: ou,
        onProfile: () => d(!0),
        onCalendar: () => y(!0),
        action: ye ? null : /* @__PURE__ */ h.jsxs("div", { className: "aiwa-screen-cta", children: [
          /* @__PURE__ */ h.jsx(
            z3,
            {
              items: cu,
              trigger: /* @__PURE__ */ h.jsx(
                Te,
                {
                  "aria-label": "Добавить приём",
                  label: /* @__PURE__ */ h.jsxs("span", { className: "aiwa-btn-icon-label", children: [
                    /* @__PURE__ */ h.jsx(Ks, {}),
                    " Добавить приём"
                  ] })
                }
              )
            }
          ),
          /* @__PURE__ */ h.jsx(
            "input",
            {
              ref: X,
              type: "file",
              accept: "image/*",
              hidden: !0,
              onChange: (at) => {
                Pi(at.target.files?.[0]), at.target.value = "";
              }
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ h.jsxs(vt, { className: "aiwa-tma-blocks", children: [
      qe ? /* @__PURE__ */ h.jsx(vt.Item, { children: /* @__PURE__ */ h.jsx(
        zt,
        {
          title: "Не удалось обновить данные",
          description: "Показываем последнюю сохранённую версию. Нажми, чтобы повторить.",
          onClick: wa
        }
      ) }) : null,
      /* @__PURE__ */ h.jsx(
        Cr,
        {
          message: Js.text || "Выбираем простую еду с белком в каждом приёме.",
          onDiscuss: () => Zs({ topic: "food" })
        }
      ),
      !ye && ue ? /* @__PURE__ */ h.jsx(vt.Item, { header: "Меню на сегодня", children: /* @__PURE__ */ h.jsx(zt, { loading: !0, title: "Айва собирает меню…", description: "Завтрак, обед и ужин под фазу" }) }) : null,
      !ye && Ws.length ? /* @__PURE__ */ h.jsx(vt.Item, { header: "Меню на сегодня", children: Ws.map((at) => /* @__PURE__ */ h.jsx(
        zt,
        {
          image: at.image,
          title: at.meal.dish || "Рекомендация Айвы",
          description: [at.label, at.meal.kcal, at.meal.note].filter(Boolean).join(" · "),
          onClick: () => A(at)
        },
        at.value
      )) }) : null,
      lu ? /* @__PURE__ */ h.jsxs(vt.Item, { header: Ye, children: [
        I ? /* @__PURE__ */ h.jsx(zt, { loading: !0, title: "Разбираю фото…", description: "Айва считает КБЖУ" }) : null,
        ye && Ca.status === "loading" ? /* @__PURE__ */ h.jsx(zt, { loading: !0, title: "Загружаю…", description: "Дневник за выбранный день" }) : null,
        Ue ? /* @__PURE__ */ h.jsx(
          zt,
          {
            title: "Не удалось загрузить дневник",
            description: "Нажми, чтобы попробовать ещё раз.",
            onClick: ru
          }
        ) : null,
        Ta.map((at) => /* @__PURE__ */ h.jsx(
          zt,
          {
            image: at.image_url || nb(g, at.title) || VR(at),
            title: at.title,
            description: `${Kh(at.kcal)} · Б${Math.round(at.protein || 0)} · Ж${Math.round(at.fat || 0)} · У${Math.round(at.carbs || 0)}`,
            onClick: () => H("diary")
          },
          at.id
        )),
        M ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
          /* @__PURE__ */ h.jsx(Cr, { message: M.summary }),
          M.gaps?.length ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
            /* @__PURE__ */ h.jsx(zt, { title: "Чего не хватает", description: "" }),
            M.gaps.map((at) => /* @__PURE__ */ h.jsx(zt, { title: at }, at))
          ] }) : null,
          M.tips?.length ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
            /* @__PURE__ */ h.jsx(zt, { title: "Советы на неделю", description: "" }),
            M.tips.map((at, Bt) => /* @__PURE__ */ h.jsx(zt, { title: `${Bt + 1}. ${at}` }, at))
          ] }) : null
        ] }) : null,
        /* @__PURE__ */ h.jsx("div", { className: "aiwa-cell-actions aiwa-week-review-cta", children: /* @__PURE__ */ h.jsx(
          Te,
          {
            label: "Разобрать питание за неделю",
            loading: D,
            isFill: !0,
            ...le("Разобрать питание за неделю", Hi)
          }
        ) })
      ] }) : null
    ] }),
    /* @__PURE__ */ h.jsx(wp, { isOpen: u, onClose: () => d(!1) }),
    /* @__PURE__ */ h.jsx(
      xp,
      {
        isOpen: p,
        onClose: () => y(!1),
        mode: n,
        revision: t,
        symptomGroups: Ve("aiwaSymptomGroups")
      }
    ),
    /* @__PURE__ */ h.jsx(
      RR,
      {
        isOpen: V === "add" && (!ye || !!U),
        onClose: () => H(""),
        onSaved: (at) => hn(at?.type === "edit" ? {
          ...at,
          mutationToken: Y?.token,
          targetIso: Y?.targetIso
        } : at),
        editingMeal: U
      }
    ),
    /* @__PURE__ */ h.jsx(
      OR,
      {
        isOpen: !ye && !!x,
        meal: x?.meal,
        image: x?.image,
        slotLabel: x?.label,
        busy: _,
        onClose: () => A(null),
        onAdd: () => !ye && x && qi(x.meal, x.value)
      }
    ),
    /* @__PURE__ */ h.jsx(
      DR,
      {
        isOpen: V === "diary",
        onClose: () => H(""),
        diary: ye ? Ui || { meals: [], totals: {}, target: ze } : Qn,
        canAdd: !ye,
        focusMealId: B?.tab === "food" ? B?.record_id : null,
        onAdd: Fn,
        onEdit: (at) => {
          st({
            token: ot.current.begin(),
            targetIso: b
          }), F(at), H("add");
        },
        onDelete: Yi,
        onReco: ye ? void 0 : async () => {
          const at = await Yt("/api/diary_reco", {}).catch(() => null);
          Mt(at?.text || "Не удалось собрать совет");
        }
      }
    )
  ] }) }) });
}
const Kc = /* @__PURE__ */ new Map(), sm = (n) => Array.isArray(n) ? n.map(sm) : !n || typeof n != "object" ? n : Object.fromEntries(
  Object.keys(n).sort().map((t) => [t, sm(n[t])])
), UR = (n) => JSON.stringify(sm(n)), HR = () => globalThis.crypto?.randomUUID?.() || `workout-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`, qR = (n, t = HR) => {
  const i = UR(n);
  let l = Kc.get(i);
  return l || (l = { fingerprint: i, id: t() }, Kc.set(i, l)), l;
}, YR = (n) => !n || Kc.get(n.fingerprint)?.id !== n.id ? !1 : (Kc.delete(n.fingerprint), !0), PR = /^\d{4}-\d{2}-\d{2}$/, GR = 90, Tr = (n) => {
  const t = String(n || "");
  if (!PR.test(t)) return "";
  const i = /* @__PURE__ */ new Date(`${t}T00:00:00Z`);
  return !Number.isNaN(i.getTime()) && i.toISOString().slice(0, 10) === t ? t : "";
}, G3 = (n = Qe()) => {
  const t = Tr(n) || Qe(), i = /* @__PURE__ */ new Date(`${t}T00:00:00Z`);
  return i.setUTCDate(i.getUTCDate() - GR), i.toISOString().slice(0, 10);
}, Cp = (n, t = Qe()) => {
  const i = Tr(n), l = Tr(t);
  return !!(i && l && i >= G3(l) && i <= l);
}, XR = (n, t) => {
  const i = Tr(n);
  return Cp(i, t) ? i : t;
};
function KR({ isOpen: n, onClose: t, onSaved: i, suggested: l, favoriteTypes: o, initialDate: c, today: u = Qe() }) {
  const d = [
    ...R2.filter((G) => G !== "Своё"),
    ...(o || []).filter((G) => !R2.includes(G)),
    "Своё"
  ], p = Tr(u) || Qe(), y = XR(c, p), [g, v] = C.useState(y), [b, j] = C.useState("Силовая"), [w, T] = C.useState("45 мин"), [x, A] = C.useState("Нормально"), [_, E] = C.useState([]), [M, O] = C.useState({}), [D, N] = C.useState(""), [V, H] = C.useState(""), [B, U] = C.useState(!1), [F, Y] = C.useState(""), [st, I] = C.useState(null);
  C.useEffect(() => {
    if (!n) return;
    x3("workout");
    const G = l?.name || "", et = (l?.exercises || []).filter((ht) => ht?.name), ot = /ход|прогул/i.test(G) ? "Ходьба" : /пилатес/i.test(G) ? "Пилатес" : /йог|мобил|релиз|растяж/i.test(G) ? "Йога" : /кардио|бег|вело/i.test(G) ? "Кардио" : /плав/i.test(G) ? "Плавание" : "Силовая";
    j(ot), et.length ? (E(et.map((ht) => ht.name)), O(Object.fromEntries(et.map((ht) => [ht.name, { sets: ht.sets || "", reps: ht.reps || "" }])))) : (E(G ? [G] : []), O({})), N(""), H("");
    const ct = (l?.exercises || []).find((ht) => ht?.name)?.name;
    Y(ct && Object.keys(Ti).find((ht) => Ti[ht].includes(ct)) || ""), I(null), v(y);
  }, [n, l, y]);
  const $ = (G) => E((et) => et.includes(G) ? et.filter((ot) => ot !== G) : [...et, G]), X = b === "Силовая", J = (G) => Object.keys(Ti).find((et) => Ti[et].includes(G)) || null, tt = (G, et, ot) => O((ct) => ({ ...ct, [G]: { ...ct[G], [et]: ot } })), ut = (G, et) => {
    const ot = String(M[G]?.[et] ?? "").replace(",", ".").trim(), ct = Number(ot);
    return ot && Number.isFinite(ct) && ct > 0 ? ct : null;
  }, L = async () => {
    if (B) return;
    if (!Cp(g, p)) {
      Mt("Тренировку можно отметить за сегодня или за предыдущие 90 дней.", { type: "error" });
      return;
    }
    const G = [..._, ...D.trim() ? [D.trim()] : []];
    U(!0);
    try {
      const et = {
        date: g,
        type: b === "Своё" ? V.trim() || "Своё" : b,
        duration: w,
        rpe: x,
        items: G.map((ht) => ({
          name: ht,
          weight: X ? ut(ht, "w") : null,
          sets: X ? ut(ht, "sets") : null,
          reps: X ? ut(ht, "reps") : null,
          group: X ? J(ht) : null
        }))
      }, ot = qR(et), ct = await Yt("/api/workout", {
        ...et,
        request_id: ot.id
      });
      if (!ct?.ok) throw new Error(ct?.text || "Не получилось сохранить тренировку");
      await i?.({
        ...ct,
        requestedDate: g,
        date: ct.date || ct.d || g
      }), I({ text: ct.review || "", calories: ct.calories || 0 }), YR(ot);
    } catch (et) {
      Mt(et.message || "Не получилось сохранить", { type: "error" });
    } finally {
      U(!1);
    }
  }, q = (G) => /* @__PURE__ */ h.jsxs("div", { className: "aiwa-exercise-item", children: [
    /* @__PURE__ */ h.jsx(
      Tt,
      {
        as: "button",
        type: "button",
        "aria-pressed": _.includes(G),
        onClick: () => $(G),
        end: /* @__PURE__ */ h.jsx("span", { className: _.includes(G) ? "aiwa-check is-active" : "aiwa-check", children: _.includes(G) ? "✓" : /* @__PURE__ */ h.jsx(Ks, {}) }),
        children: /* @__PURE__ */ h.jsx(Tt.Text, { title: G })
      }
    ),
    X && _.includes(G) ? /* @__PURE__ */ h.jsxs("div", { className: "aiwa-exercise-nums", children: [
      /* @__PURE__ */ h.jsx(
        "input",
        {
          inputMode: "decimal",
          placeholder: "кг",
          "aria-label": `${G}: вес`,
          value: M[G]?.w ?? "",
          onChange: (et) => tt(G, "w", et.target.value)
        }
      ),
      /* @__PURE__ */ h.jsx(
        "input",
        {
          inputMode: "numeric",
          placeholder: "подходы",
          "aria-label": `${G}: подходы`,
          value: M[G]?.sets ?? "",
          onChange: (et) => tt(G, "sets", et.target.value)
        }
      ),
      /* @__PURE__ */ h.jsx(
        "input",
        {
          inputMode: "numeric",
          placeholder: "повторы",
          "aria-label": `${G}: повторы`,
          value: M[G]?.reps ?? "",
          onChange: (et) => tt(G, "reps", et.target.value)
        }
      )
    ] }) : null
  ] }, G);
  return st ? /* @__PURE__ */ h.jsx(Bn, { isOpen: n, onClose: t, "aria-label": "Разбор тренировки", children: /* @__PURE__ */ h.jsx("div", { children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ h.jsxs("div", { className: "aiwa-sheet-card aiwa-workout-review", children: [
      /* @__PURE__ */ h.jsx(pt, { variant: "title2", weight: "semibold", children: "Тренировка сохранена" }),
      /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: `Сожжено примерно ${st.calories} ккал.` }),
      st.text ? /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: st.text }) : null
    ] }),
    /* @__PURE__ */ h.jsx(Te, { label: "Понятно", isFill: !0, ...le("Закрыть разбор", t) })
  ] }) }) }) : /* @__PURE__ */ h.jsx(Bn, { isOpen: n, onClose: t, "aria-label": "Отметить тренировку", children: /* @__PURE__ */ h.jsx("div", { children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ h.jsx(
      pe,
      {
        label: "Когда",
        type: "date",
        min: G3(p),
        max: p,
        value: g,
        onChange: v
      }
    ),
    /* @__PURE__ */ h.jsx(ur, { surface: "canvas", label: "Тип тренировки", options: d, value: b, onChange: (G) => {
      j(G), E([]);
    } }),
    b === "Своё" ? /* @__PURE__ */ h.jsx(pe, { label: "Название тренировки", value: V, onChange: H, placeholder: "Напр. Сквош" }) : null,
    /* @__PURE__ */ h.jsx("div", { className: "aiwa-workout-exercises", children: /* @__PURE__ */ h.jsx(vt, { children: /* @__PURE__ */ h.jsxs(vt.Item, { header: "Упражнения", children: [
      X ? Object.keys(Ti).map((G) => {
        const et = Ti[G].filter((ht) => _.includes(ht)).length, ot = F === G, ct = et ? /* @__PURE__ */ h.jsx(pt, { variant: "caption1", weight: "regular", children: `выбрано ${et}` }) : ot ? /* @__PURE__ */ h.jsx(pt, { variant: "caption1", weight: "regular", children: "—" }) : /* @__PURE__ */ h.jsx("span", { className: "aiwa-exercise-add-icon", "aria-hidden": "true", children: /* @__PURE__ */ h.jsx(Ks, {}) });
        return /* @__PURE__ */ h.jsxs("div", { className: "aiwa-exercise-item", children: [
          /* @__PURE__ */ h.jsx(
            Tt,
            {
              as: "button",
              type: "button",
              "data-aiwa-exercise-group": "true",
              "aria-expanded": ot,
              onClick: () => Y(ot ? "" : G),
              end: ct,
              children: /* @__PURE__ */ h.jsx(Tt.Text, { title: G, bold: !0 })
            }
          ),
          ot ? Ti[G].map(q) : null
        ] }, G);
      }) : (e7[b] || []).map(q),
      /* @__PURE__ */ h.jsxs(Tt, { "data-aiwa-exercise-custom": "true", tappable: !1, children: [
        /* @__PURE__ */ h.jsx(pt, { variant: "caption1", weight: "regular", children: "Добавить своё" }),
        /* @__PURE__ */ h.jsx(Tt.Editable, { label: "Название упражнения", value: D, onChange: N })
      ] })
    ] }) }) }),
    /* @__PURE__ */ h.jsx(ur, { surface: "canvas", label: "Длительность", options: ["30 мин", "45 мин", "60+ мин"], value: w, onChange: T }),
    /* @__PURE__ */ h.jsx(ur, { surface: "canvas", label: "Как ощущалось", options: ["Легко", "Нормально", "Тяжело"], value: x, onChange: A }),
    /* @__PURE__ */ h.jsx(
      Te,
      {
        label: "Сохранить и разобрать",
        loading: B,
        isFill: !0,
        ...le("Сохранить и разобрать", L)
      }
    )
  ] }) }) });
}
function ZR({ isOpen: n, onClose: t, options: i, onSelect: l }) {
  return /* @__PURE__ */ h.jsx(Bn, { isOpen: n, onClose: t, children: /* @__PURE__ */ h.jsxs(vt, { className: "aiwa-tma-blocks", children: [
    /* @__PURE__ */ h.jsx(vt.Item, { children: /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsx(
      Tt.Text,
      {
        title: "Рекомендация на сегодня",
        description: "Выбери вариант, после которого останется запас сил."
      }
    ) }) }),
    /* @__PURE__ */ h.jsx(vt.Item, { children: i.map((o, c) => /* @__PURE__ */ h.jsx(
      zt,
      {
        title: o.name || `Вариант ${c + 1}`,
        description: o.how || o.benefit || o.detail,
        onClick: () => l(o)
      },
      o.name || c
    )) })
  ] }) });
}
function QR({ isOpen: n, onClose: t, state: i, onAdd: l }) {
  const o = i?.today || [];
  return /* @__PURE__ */ h.jsx(Bn, { isOpen: n, onClose: t, children: /* @__PURE__ */ h.jsxs(vt, { className: "aiwa-tma-blocks", children: [
    i?.last_review ? /* @__PURE__ */ h.jsx(
      Cr,
      {
        message: i.last_review.text || i.last_review,
        onDiscuss: () => Zs({ topic: "train" })
      }
    ) : null,
    /* @__PURE__ */ h.jsx(vt.Item, { header: "Неделя", children: (i?.week || []).map((c) => /* @__PURE__ */ h.jsx(
      zt,
      {
        title: c.dow,
        description: c.count ? `${c.type || "Тренировка"} · ${c.count}` : "Без тренировки",
        muted: !c.count
      },
      c.d
    )) }),
    o.length ? /* @__PURE__ */ h.jsx(vt.Item, { header: "Сегодня", children: o.map((c) => /* @__PURE__ */ h.jsx(
      zt,
      {
        title: c.type || "Тренировка",
        description: `${c.duration || "—"} · ${String(c.rpe || "").toLowerCase()}`
      },
      c.id
    )) }) : null,
    /* @__PURE__ */ h.jsx(vt.Item, { children: /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ h.jsx(
      ti,
      {
        variant: "filled",
        label: "Отметить тренировку",
        isFill: !0,
        ...le("Отметить тренировку", l)
      }
    ) }) }) })
  ] }) });
}
function FR({ isOpen: n, onClose: t, profile: i, onSaved: l }) {
  const [o, c] = C.useState(i || {});
  C.useEffect(() => {
    n && c(i || {});
  }, [n, i]);
  const u = (p, y) => c((g) => ({ ...g, [p]: y })), d = async () => {
    (await Yt("/api/train_profile", o).catch(() => null))?.ok ? (Mt("Тренировочный профиль сохранён", { type: "success" }), await l(), t()) : Mt("Не получилось сохранить", { type: "error" });
  };
  return /* @__PURE__ */ h.jsx(Bn, { isOpen: n, onClose: t, children: /* @__PURE__ */ h.jsx("div", { children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: "Расскажи, чем занимаешься и что важно беречь. Айва учтёт это в рекомендациях и разборе нагрузки." }),
    /* @__PURE__ */ h.jsx(pe, { label: "Формат", value: o.format || "", onChange: (p) => u("format", p), placeholder: "Зал и прогулки" }),
    /* @__PURE__ */ h.jsx(pe, { label: "Цель", value: o.goal || "", onChange: (p) => u("goal", p), placeholder: "Тонус и больше энергии" }),
    /* @__PURE__ */ h.jsx(pe, { label: "Ограничения", value: o.limits || "", onChange: (p) => u("limits", p), placeholder: "Например, бережём поясницу" }),
    /* @__PURE__ */ h.jsx(ti, { variant: "filled", label: "Сохранить", isFill: !0, ...le("Сохранить профиль", d) })
  ] }) }) });
}
const ib = ["trainingSection", "train"], sb = (n) => {
  const t = n % 100, i = n % 10;
  return t >= 11 && t <= 14 ? "тренировок" : i === 1 ? "тренировка" : i >= 2 && i <= 4 ? "тренировки" : "тренировок";
}, IR = (n = [], t = null) => {
  if (!t || typeof t != "object") return n;
  const i = t.id;
  return [...i == null ? n : n.filter((o) => o?.id !== i), t];
}, JR = (n, t) => {
  const i = n?.status === "loaded";
  return {
    status: i ? "loaded" : "partial",
    workouts: IR(i ? n.workouts : [], t),
    ...i ? {} : {
      message: "Тренировка сохранена, но день загрузился не полностью. Нажми, чтобы обновить."
    }
  };
}, WR = ({ iso: n, week: t = [], explicit: i = {} }) => {
  if (Object.prototype.hasOwnProperty.call(i, n)) return i[n];
  const l = t.find((o) => o.d === n);
  return l && Number(l.count || 0) === 0 ? { status: "loaded", workouts: [] } : void 0;
}, tD = ({ iso: n, week: t = [], explicit: i = {} }) => {
  if (Object.prototype.hasOwnProperty.call(i, n)) {
    const o = i[n];
    return o?.status === "loaded" || o?.status === "partial" ? o.workouts.length : null;
  }
  const l = t.find((o) => o.d === n);
  return l ? Number(l.count || 0) : null;
}, lb = ({ iso: n, today: t, status: i, count: l, weekCount: o = 0 }) => {
  if (n === t)
    return { value: String(o), label: `${sb(o)} на этой неделе` };
  if (i === "error") return { value: "—", label: "Данные за этот день недоступны" };
  if (i === "partial") {
    const u = Number(l || 0);
    return { value: String(u), label: "Тренировка сохранена · обнови день" };
  }
  if (i !== "loaded")
    return { value: "…", label: `Загружаю тренировки за ${Or(n)}` };
  const c = Number(l || 0);
  return { value: String(c), label: `${sb(c)} в этот день` };
}, eD = "/assets/train/workout-placeholder.webp", rb = (n) => n && n.image_url || eD;
function nD({ mode: n, revision: t = 0 }) {
  const [i, l, o, c] = Y3(ib, [n, t]), [u, d] = C.useState(!1), [p, y] = C.useState(!1), [g, v] = C.useState(""), [b, j] = C.useState(null), w = mp(), T = w3(), x = Cp(w, T), [A, _] = C.useState({}), E = C.useRef({}), M = C.useRef(0), O = C.useRef({}), [D, N] = C.useState(0), V = C.useRef(!0);
  C.useEffect(() => (V.current = !0, () => {
    V.current = !1;
  }), []), C.useEffect(() => {
    if (!i.train || !w || w === T) return;
    const mt = (i.train?.week || []).find((se) => se.d === w);
    if (mt && Number(mt.count || 0) === 0) return;
    const _t = E.current[w];
    if (_t && _t.status !== "retrying") return;
    const ne = ++M.current;
    O.current = { ...O.current, [w]: ne }, E.current = {
      ...E.current,
      [w]: { status: "loading", workouts: _t?.workouts || [] }
    }, _(E.current);
    const fe = (se) => {
      O.current[w] === ne && (E.current = { ...E.current, [w]: se }, V.current && _(E.current));
    };
    Yt("/api/train_day", { d: w }).then((se) => {
      if (!se?.ok || se.d && se.d !== w) {
        fe(_t?.workouts?.length ? {
          status: "partial",
          workouts: _t.workouts,
          message: se?.text || "Тренировка сохранена, но день не удалось обновить."
        } : {
          status: "error",
          workouts: [],
          message: se?.text || "Не получилось загрузить тренировки."
        });
        return;
      }
      fe({
        status: "loaded",
        workouts: Array.isArray(se.workouts) ? se.workouts : []
      });
    }).catch((se) => fe(_t?.workouts?.length ? {
      status: "partial",
      workouts: _t.workouts,
      message: se?.message || "Тренировка сохранена, но день не удалось обновить."
    } : {
      status: "error",
      workouts: [],
      message: se?.message || "Не получилось загрузить тренировки."
    }));
  }, [w, T, i.train, D]);
  const H = async (mt) => {
    const _t = String(mt?.date || ""), ne = !!(mt?.ok && _t);
    ne && (Array.isArray(mt.week) || Array.isArray(mt.today)) && o("train", {
      ...i.train || {},
      ...Array.isArray(mt.week) ? { week: mt.week } : {},
      ...Array.isArray(mt.today) ? { today: mt.today } : {}
    });
    const fe = ne && _t !== T ? ++M.current : 0, se = mt?.workout && typeof mt.workout == "object" ? mt.workout : null;
    let hn = null;
    if (fe) {
      O.current = {
        ...O.current,
        [_t]: fe
      };
      const qe = E.current[_t];
      hn = se ? JR(qe, se) : { status: "loading", workouts: [] }, E.current = { ...E.current, [_t]: hn }, _(E.current);
    }
    if (await l("train").catch(() => null), fe) {
      const qe = await Yt("/api/train_day", { d: _t }).catch(() => null);
      if (O.current[_t] !== fe) return;
      const wa = qe?.ok && (!qe.d || qe.d === _t) ? {
        status: "loaded",
        workouts: Array.isArray(qe.workouts) ? qe.workouts : []
      } : hn || {
        status: "error",
        workouts: [],
        message: qe?.text || "Тренировка сохранена, но день не удалось обновить."
      };
      E.current = { ...E.current, [_t]: wa }, V.current && _(E.current);
    }
  }, B = (mt) => {
    if (!mt || mt === T) return;
    const _t = E.current[mt], ne = {
      ...E.current,
      [mt]: { ..._t, status: "retrying" }
    };
    delete O.current[mt], E.current = ne, _(ne), N((fe) => fe + 1);
  }, U = c.trainingSection || c.train, F = () => l(...ib.filter((mt) => c[mt]));
  if (!i.trainingSection || !i.train)
    return U ? /* @__PURE__ */ h.jsx(ni, { children: /* @__PURE__ */ h.jsx(ei, { mode: "secondary", children: /* @__PURE__ */ h.jsx("div", { className: "aiwa-paper-screen aiwa-activity-screen", children: /* @__PURE__ */ h.jsx(vt, { className: "aiwa-tma-blocks", children: /* @__PURE__ */ h.jsx(vt.Item, { header: "Нагрузка", children: /* @__PURE__ */ h.jsx(
      zt,
      {
        title: "Не удалось загрузить данные",
        description: "Нажми, чтобы попробовать ещё раз.",
        onClick: F
      }
    ) }) }) }) }) }) : /* @__PURE__ */ h.jsx(U3, { title: "Нагрузка", variant: "activity" });
  const Y = i.trainingSection, st = i.train, I = Y.training || {}, $ = (I.options || []).slice(0, 4), X = st.today || [], J = st.week || [], tt = J.filter((mt) => mt.count).slice(-3).reverse(), ut = J.reduce((mt, _t) => mt + (_t.count || 0), 0), L = (mt = null) => x ? (j(mt), v("workout"), !0) : !1, q = w !== T, G = (mt) => WR({ iso: mt, week: J, explicit: A }), et = (mt) => tD({ iso: mt, week: J, explicit: A }), ot = lb({ iso: T, today: T, status: "loaded", weekCount: ut }), ct = (mt) => {
    const _t = G(mt);
    return lb({
      iso: mt,
      today: T,
      status: mt === T ? "loaded" : _t?.status,
      count: et(mt),
      weekCount: ut
    });
  }, ht = q ? ct(w) : ot, nt = q ? `Тренировки за ${Or(w)}` : "Прошедшие тренировки", dt = q ? G(w) : null, ft = q && (!dt || dt.status === "loading" || dt.status === "retrying"), yt = q && (dt?.status === "error" || dt?.status === "partial"), gt = q ? ["loaded", "partial", "loading", "retrying"].includes(dt?.status) ? dt.workouts : [] : X.slice().reverse(), ue = q ? ft || yt || gt.length > 0 : X.length > 0 || tt.length > 0;
  return /* @__PURE__ */ h.jsx(ni, { children: /* @__PURE__ */ h.jsx(ei, { mode: "secondary", children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-paper-screen aiwa-activity-screen", children: [
    /* @__PURE__ */ h.jsx(
      yp,
      {
        heroValue: ht.value,
        heroLabel: ht.label,
        previewDay: ct,
        onProfile: () => d(!0),
        onCalendar: () => y(!0),
        action: x ? /* @__PURE__ */ h.jsx(
          Te,
          {
            label: /* @__PURE__ */ h.jsxs("span", { className: "aiwa-btn-icon-label", children: [
              /* @__PURE__ */ h.jsx(Ks, {}),
              " Отметить тренировку"
            ] }),
            ...le("Отметить тренировку", () => L())
          }
        ) : /* @__PURE__ */ h.jsx(
          Te,
          {
            variant: "secondaryCanvas",
            label: "Этот день доступен только для просмотра",
            disabled: !0,
            isFill: !0
          }
        )
      }
    ),
    /* @__PURE__ */ h.jsxs(vt, { className: "aiwa-tma-blocks", children: [
      U ? /* @__PURE__ */ h.jsx(vt.Item, { children: /* @__PURE__ */ h.jsx(
        zt,
        {
          title: "Не удалось обновить данные",
          description: "Показываем последнюю сохранённую версию. Нажми, чтобы повторить.",
          onClick: F
        }
      ) }) : null,
      /* @__PURE__ */ h.jsx(
        Cr,
        {
          message: I.summary || Y.text || "Выбирай нагрузку, после которой станет легче, а не хуже.",
          detail: I.why,
          onDiscuss: () => Zs({ topic: "train" })
        }
      ),
      $.length ? /* @__PURE__ */ h.jsx(vt.Item, { header: "Варианты", children: $.map((mt, _t) => /* @__PURE__ */ h.jsx(
        zt,
        {
          image: rb(mt),
          title: [mt.name || `Вариант ${_t + 1}`, mt.duration].filter(Boolean).join(" · "),
          description: [
            (mt.exercises || []).map((ne) => [ne.name, ne.sets && ne.reps ? `${ne.sets}×${ne.reps}` : ""].filter(Boolean).join(" ")).join(", "),
            mt.tip || mt.benefit || mt.how || mt.detail
          ].filter(Boolean).join(" — "),
          onClick: x ? () => L(mt) : void 0
        },
        mt.name || _t
      )) }) : null,
      ue ? /* @__PURE__ */ h.jsxs(vt.Item, { header: nt, children: [
        ft ? /* @__PURE__ */ h.jsx(zt, { loading: !0, title: "Загружаю…", description: "Тренировки за выбранный день" }) : null,
        yt ? /* @__PURE__ */ h.jsx(
          zt,
          {
            title: "Повторить загрузку тренировок",
            description: dt.message,
            onClick: () => B(w)
          }
        ) : null,
        gt.length ? gt.map((mt) => /* @__PURE__ */ h.jsx(
          zt,
          {
            image: rb(mt),
            title: mt.type || "Тренировка",
            description: [
              q ? "" : "сегодня",
              mt.duration,
              mt.kcal ? `${Math.round(mt.kcal)} ккал` : "",
              String(mt.rpe || "").toLowerCase()
            ].filter(Boolean).join(" · "),
            onClick: q ? void 0 : () => v("history")
          },
          mt.id
        )) : ft || yt ? null : q ? /* @__PURE__ */ h.jsx(
          zt,
          {
            title: "В этот день тренировок нет",
            description: x ? "Выбери другой день или отметь тренировку." : "Этот день доступен только для просмотра."
          }
        ) : tt.length ? tt.map((mt) => /* @__PURE__ */ h.jsx(
          zt,
          {
            title: mt.type || "Тренировка",
            description: `${mt.d} · ${mt.count} запись`,
            onClick: x ? () => v("history") : void 0
          },
          mt.d
        )) : /* @__PURE__ */ h.jsx(
          zt,
          {
            title: "История пока пуста",
            description: "Отметь первую тренировку — Айва подготовит разбор.",
            onClick: () => v("history")
          }
        )
      ] }) : null,
      /* @__PURE__ */ h.jsx("div", { className: "aiwa-page-action", children: /* @__PURE__ */ h.jsx(
        Te,
        {
          variant: "secondaryCanvas",
          label: "Изменить предпочтения",
          isFill: !0,
          ...le("Изменить предпочтения", () => v("profile"))
        }
      ) })
    ] }),
    /* @__PURE__ */ h.jsx(wp, { isOpen: u, onClose: () => d(!1) }),
    /* @__PURE__ */ h.jsx(
      xp,
      {
        isOpen: p,
        onClose: () => y(!1),
        mode: n,
        symptomGroups: Ve("aiwaSymptomGroups")
      }
    ),
    /* @__PURE__ */ h.jsx(
      KR,
      {
        isOpen: x && g === "workout",
        onClose: () => v(""),
        onSaved: H,
        suggested: b,
        favoriteTypes: st.favorite_types || [],
        initialDate: w
      }
    ),
    /* @__PURE__ */ h.jsx(
      ZR,
      {
        isOpen: x && g === "variants",
        onClose: () => v(""),
        options: $,
        onSelect: (mt) => L(mt)
      }
    ),
    /* @__PURE__ */ h.jsx(
      QR,
      {
        isOpen: !q && g === "history",
        onClose: () => v(""),
        state: st,
        onAdd: () => L()
      }
    ),
    /* @__PURE__ */ h.jsx(FR, { isOpen: g === "profile", onClose: () => v(""), profile: st.profile, onSaved: H })
  ] }) }) });
}
const ob = () => globalThis.crypto?.randomUUID?.() || `req-${Date.now()}-${Math.random().toString(16).slice(2)}`;
function aD({ initialMessages: n = [] }) {
  const [t, i] = C.useState(() => n.map((x, A) => ({
    id: `initial-${A}`,
    role: x.role === "user" ? "user" : "assistant",
    text: x.text || "",
    suggestions: []
  }))), [l, o] = C.useState(""), [c, u] = C.useState(!1), [d, p] = C.useState(!1), y = dh.useRef(null), g = ["male", "fit"].includes(
    (typeof window.aiwaData == "function" ? window.aiwaData() : window.aiwaData)?.mode
  ), v = dh.useRef(null);
  C.useEffect(() => {
    t.length || i([{
      id: "hello",
      role: "assistant",
      text: g ? "Привет! Спроси меня о питании, тренировках или самочувствии. Я отвечу с учётом твоих данных." : "Привет! Спроси меня о цикле, питании, тренировках или самочувствии. Я отвечу с учётом твоих данных.",
      suggestions: ["Можно ли тренироваться?", "Что съесть сегодня?", "Как моё самочувствие?"]
    }]);
  }, [g, t.length]), C.useEffect(() => {
    v.current?.scrollIntoView({ block: "end" });
  }, [t, c]);
  const b = async (x, A) => {
    for (let _ = 0; _ < 90; _ += 1) {
      await new Promise((O) => window.setTimeout(O, 1e3));
      const E = await Yt("/api/journal_job", { job_id: x }).catch(() => null), M = E?.job?.status;
      if (!(!E || !["completed", "failed", "expired", "superseded"].includes(M))) {
        i((O) => O.map((D) => D.id === A ? {
          ...D,
          text: E.answer || (M === "completed" ? "Запись обработана." : "Не получилось обработать запись."),
          suggestions: E.suggestions || []
        } : D));
        return;
      }
    }
  }, j = async (x = l) => {
    const A = String(x || "").trim();
    if (!A || c) return;
    o(""), i((O) => [...O, { id: `user-${Date.now()}`, role: "user", text: A, suggestions: [] }]), u(!0);
    const _ = ob(), E = await Yt("/api/chat", { message: A, request_id: _ }).catch(() => null), M = `assistant-${_}`;
    i((O) => [...O, {
      id: M,
      role: "assistant",
      text: E?.answer || "Не получилось ответить, попробуй ещё раз.",
      suggestions: E?.suggestions || []
    }]), u(!1), E?.pending && E?.job?.id && b(E.job.id, M);
  }, w = async (x, A) => {
    u(!0);
    const _ = new FormData(), E = ob();
    _.append("initData", window.aiwaInit || ""), _.append("request_id", E), _.append("audio", x, A?.includes("mp4") ? "voice.mp4" : "voice.webm");
    try {
      const O = await (await fetch("/api/voice", { method: "POST", body: _ })).json();
      O.transcript && i((N) => [...N, { id: `voice-${Date.now()}`, role: "user", text: O.transcript, suggestions: [] }]);
      const D = `voice-answer-${E}`;
      i((N) => [...N, {
        id: D,
        role: "assistant",
        text: O.answer || "Не получилось распознать голос.",
        suggestions: O.suggestions || []
      }]), O?.pending && O?.job?.id && b(O.job.id, D);
    } catch {
      Mt("Не получилось отправить голос", { type: "error" });
    } finally {
      u(!1);
    }
  }, T = async () => {
    if (d) {
      y.current?.stop();
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      Mt("Голос недоступен в этом клиенте", { type: "error" });
      return;
    }
    try {
      const x = await navigator.mediaDevices.getUserMedia({ audio: !0 }), A = [], _ = new MediaRecorder(x);
      y.current = _, _.ondataavailable = (E) => {
        E.data?.size && A.push(E.data);
      }, _.onstop = () => {
        p(!1), x.getTracks().forEach((M) => M.stop());
        const E = new Blob(A, { type: _.mimeType || "audio/webm" });
        E.size > 900 && w(E, _.mimeType);
      }, _.start(), p(!0);
    } catch {
      Mt("Нет доступа к микрофону", { type: "error" });
    }
  };
  return /* @__PURE__ */ h.jsx(ni, { children: /* @__PURE__ */ h.jsx(ei, { mode: "secondary", children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-chat-screen", children: [
    /* @__PURE__ */ h.jsxs("div", { className: "aiwa-chat-header", children: [
      /* @__PURE__ */ h.jsx(vp, { size: 50, frames: gp, pauseMs: 0 }),
      /* @__PURE__ */ h.jsxs("div", { children: [
        /* @__PURE__ */ h.jsx(pt, { variant: "title3", weight: "semibold", children: "Айва" }),
        /* @__PURE__ */ h.jsx(pt, { variant: "caption1", weight: "regular", children: "учитывает твои данные" })
      ] }),
      /* @__PURE__ */ h.jsx(nn, { as: "button", type: "button", mode: "opacity", className: "aiwa-sheet-close", "aria-label": "Закрыть чат", onClick: () => Zn("go", "today"), children: /* @__PURE__ */ h.jsx(y3, {}) })
    ] }),
    /* @__PURE__ */ h.jsxs("div", { className: "aiwa-chat-messages", children: [
      t.map((x) => /* @__PURE__ */ h.jsxs("div", { className: x.role === "user" ? "aiwa-chat-bubble is-user" : "aiwa-chat-bubble is-ai", children: [
        /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: x.text }),
        x.suggestions?.length ? /* @__PURE__ */ h.jsx("div", { className: "aiwa-chat-suggestions", children: x.suggestions.slice(0, 3).map((A) => /* @__PURE__ */ h.jsx(nn, { as: "button", type: "button", mode: "opacity", onClick: () => j(A), children: /* @__PURE__ */ h.jsx(pt, { variant: "caption1", weight: "semibold", children: A }) }, A)) }) : null
      ] }, x.id)),
      c ? /* @__PURE__ */ h.jsx("div", { className: "aiwa-chat-bubble is-ai", children: /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: "Айва думает…" }) }) : null,
      /* @__PURE__ */ h.jsx("span", { ref: v })
    ] }),
    /* @__PURE__ */ h.jsxs("div", { className: "aiwa-chat-composer", children: [
      /* @__PURE__ */ h.jsx(
        "input",
        {
          value: l,
          placeholder: "Спроси Айву…",
          onChange: (x) => o(x.target.value),
          onKeyDown: (x) => {
            x.key === "Enter" && j();
          }
        }
      ),
      /* @__PURE__ */ h.jsx(nn, { as: "button", type: "button", mode: "opacity", className: d ? "aiwa-chat-icon is-recording" : "aiwa-chat-icon", "aria-label": "Голос", onClick: T, children: /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "semibold", children: d ? "■" : "Голос" }) }),
      /* @__PURE__ */ h.jsx(nn, { as: "button", type: "button", mode: "opacity", className: "aiwa-chat-send", "aria-label": "Отправить", onClick: () => j(), children: /* @__PURE__ */ h.jsx(pt, { variant: "title3", weight: "semibold", children: "↑" }) })
    ] })
  ] }) }) });
}
const iD = [
  { id: "today", label: "Главная", icon: /* @__PURE__ */ h.jsx(A_, {}) },
  { id: "food", label: "Питание", icon: /* @__PURE__ */ h.jsx(D_, {}) },
  { id: "train", label: "Нагрузка", icon: /* @__PURE__ */ h.jsx(N_, {}) }
];
function sD({ active: n }) {
  const t = iD, i = n === "stats" ? "today" : n, l = Math.max(0, t.findIndex((o) => o.id === i));
  return /* @__PURE__ */ h.jsx(ni, { children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-nav-root", "data-aiwa-nav": "true", children: [
    /* @__PURE__ */ h.jsx("div", { className: "aiwa-nav-tabbar-layer", children: /* @__PURE__ */ h.jsx(
      kM,
      {
        tabs: t.map(({ label: o, icon: c }) => ({ label: o, icon: c })),
        defaultIndex: l,
        onChange: (o) => Zn("go", t[o].id)
      }
    ) }),
    /* @__PURE__ */ h.jsx(
      nn,
      {
        as: "button",
        type: "button",
        mode: "opacity",
        className: "aiwa-nav-mascot",
        "aria-label": "Открыть Айву",
        onClick: () => Zs(),
        children: /* @__PURE__ */ h.jsx(vp, { size: 67 })
      }
    )
  ] }) });
}
let Mi = null, lh = null, _i = null, Wl = "", lm = !1, rm = 0, rh = null, cb = null, oh, Zl = null, ch = null, hc = {}, mc = 0, uh = null, ub = null, fb = {}, db = 0, fh = null, hb = null;
const ji = () => {
  !Mi || !_i || Mi.render(
    /* @__PURE__ */ h.jsx(
      uR,
      {
        ..._i,
        panel: Wl,
        panelRevision: rm,
        profileOpen: lm,
        onPanelClose: () => om.closePanel(),
        onProfileClose: () => om.closeProfile()
      }
    )
  );
}, om = {
  renderHome(n, t) {
    n && (lh !== n && (Mi?.unmount(), lh = n, Mi = Ds.createRoot(n)), _i = t, Wl = t.panel || Wl, ji());
  },
  patchHome(n) {
    !Mi || !_i || (_i = { ..._i, ...n }, ji());
  },
  openPanel(n) {
    Wl = n, window.HOME_PANEL = n, rm += 1, ji();
  },
  closePanel() {
    Wl = "", window.HOME_PANEL = "", ji();
  },
  openProfile() {
    lm = !0, ji();
  },
  closeProfile() {
    lm = !1, ji();
  },
  refreshPanel() {
    rm += 1, ji();
  },
  unmountHome() {
    Mi?.unmount(), Mi = null, lh = null, _i = null;
  },
  // Повторный вызов для уже смонтированного экрана = «перечитай данные»:
  // так host сбрасывает loadedFood/loadedTrain после правок профиля.
  renderFood(n, t = {}) {
    n && (ch !== n ? (Zl?.unmount(), ch = n, Zl = Ds.createRoot(n)) : mc += 1, hc = t, Zl.render(/* @__PURE__ */ h.jsx(ab, { ...hc, revision: mc })));
  },
  renderActivity(n, t = {}) {
    n && (ub !== n ? (uh?.unmount(), ub = n, uh = Ds.createRoot(n)) : db += 1, fb = t, uh.render(/* @__PURE__ */ h.jsx(nD, { ...fb, revision: db })));
  },
  renderChat(n, t = {}) {
    n && (hb !== n && (fh?.unmount(), hb = n, fh = Ds.createRoot(n)), fh.render(/* @__PURE__ */ h.jsx(aD, { initialMessages: t.messages || [] })));
  },
  refreshFood() {
    !ch || !Zl || (mc += 1, Zl.render(/* @__PURE__ */ h.jsx(ab, { ...hc, mode: Ve("aiwaMode") || hc.mode, revision: mc })));
  },
  /** Прогрев данных «Питания» и «Нагрузки» на старте — чтобы табы открывались сразу. */
  prefetch() {
    BR();
  },
  renderNav(n, t) {
    n && (cb !== n && (rh?.unmount(), cb = n, rh = Ds.createRoot(n), oh = void 0), oh !== t && (oh = t, rh.render(/* @__PURE__ */ h.jsx(sD, { active: t }))));
  }
};
function lD() {
  window.AiwaDeslop = om, V_(), window.dispatchEvent(new CustomEvent("aiwa:deslop-ready"));
}
lD();
export {
  o5 as R,
  jr as a,
  g5 as b,
  Dr as c,
  i5 as g,
  h as j,
  C as r,
  pt as t
};
