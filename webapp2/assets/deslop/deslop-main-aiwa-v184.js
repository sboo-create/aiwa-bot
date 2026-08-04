function e5(n, t) {
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
function n5(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var bd = { exports: {} }, Yl = {};
var hg;
function a5() {
  if (hg) return Yl;
  hg = 1;
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
var mg;
function i5() {
  return mg || (mg = 1, bd.exports = a5()), bd.exports;
}
var h = i5(), xd = { exports: {} }, Et = {};
var pg;
function s5() {
  if (pg) return Et;
  pg = 1;
  var n = Symbol.for("react.transitional.element"), t = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), u = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), y = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), b = Symbol.iterator;
  function j(O) {
    return O === null || typeof O != "object" ? null : (O = b && O[b] || O["@@iterator"], typeof O == "function" ? O : null);
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
  }, C = Object.assign, x = {};
  function A(O, q, Y) {
    this.props = O, this.context = q, this.refs = x, this.updater = Y || w;
  }
  A.prototype.isReactComponent = {}, A.prototype.setState = function(O, q) {
    if (typeof O != "object" && typeof O != "function" && O != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, O, q, "setState");
  }, A.prototype.forceUpdate = function(O) {
    this.updater.enqueueForceUpdate(this, O, "forceUpdate");
  };
  function R() {
  }
  R.prototype = A.prototype;
  function M(O, q, Y) {
    this.props = O, this.context = q, this.refs = x, this.updater = Y || w;
  }
  var _ = M.prototype = new R();
  _.constructor = M, C(_, A.prototype), _.isPureReactComponent = !0;
  var L = Array.isArray;
  function N() {
  }
  var D = { H: null, A: null, T: null, S: null }, V = Object.prototype.hasOwnProperty;
  function H(O, q, Y) {
    var et = Y.ref;
    return {
      $$typeof: n,
      type: O,
      key: q,
      ref: et !== void 0 ? et : null,
      props: Y
    };
  }
  function B(O, q) {
    return H(O.type, q, O.props);
  }
  function U(O) {
    return typeof O == "object" && O !== null && O.$$typeof === n;
  }
  function I(O) {
    var q = { "=": "=0", ":": "=2" };
    return "$" + O.replace(/[=:]/g, function(Y) {
      return q[Y];
    });
  }
  var P = /\/+/g;
  function it(O, q) {
    return typeof O == "object" && O !== null && O.key != null ? I("" + O.key) : q.toString(36);
  }
  function J(O) {
    switch (O.status) {
      case "fulfilled":
        return O.value;
      case "rejected":
        throw O.reason;
      default:
        switch (typeof O.status == "string" ? O.then(N, N) : (O.status = "pending", O.then(
          function(q) {
            O.status === "pending" && (O.status = "fulfilled", O.value = q);
          },
          function(q) {
            O.status === "pending" && (O.status = "rejected", O.reason = q);
          }
        )), O.status) {
          case "fulfilled":
            return O.value;
          case "rejected":
            throw O.reason;
        }
    }
    throw O;
  }
  function $(O, q, Y, et, ot) {
    var ct = typeof O;
    (ct === "undefined" || ct === "boolean") && (O = null);
    var ft = !1;
    if (O === null) ft = !0;
    else
      switch (ct) {
        case "bigint":
        case "string":
        case "number":
          ft = !0;
          break;
        case "object":
          switch (O.$$typeof) {
            case n:
            case t:
              ft = !0;
              break;
            case g:
              return ft = O._init, $(
                ft(O._payload),
                q,
                Y,
                et,
                ot
              );
          }
      }
    if (ft)
      return ot = ot(O), ft = et === "" ? "." + it(O, 0) : et, L(ot) ? (Y = "", ft != null && (Y = ft.replace(P, "$&/") + "/"), $(ot, q, Y, "", function(ut) {
        return ut;
      })) : ot != null && (U(ot) && (ot = B(
        ot,
        Y + (ot.key == null || O && O.key === ot.key ? "" : ("" + ot.key).replace(
          P,
          "$&/"
        ) + "/") + ft
      )), q.push(ot)), 1;
    ft = 0;
    var nt = et === "" ? "." : et + ":";
    if (L(O))
      for (var mt = 0; mt < O.length; mt++)
        et = O[mt], ct = nt + it(et, mt), ft += $(
          et,
          q,
          Y,
          ct,
          ot
        );
    else if (mt = j(O), typeof mt == "function")
      for (O = mt.call(O), mt = 0; !(et = O.next()).done; )
        et = et.value, ct = nt + it(et, mt++), ft += $(
          et,
          q,
          Y,
          ct,
          ot
        );
    else if (ct === "object") {
      if (typeof O.then == "function")
        return $(
          J(O),
          q,
          Y,
          et,
          ot
        );
      throw q = String(O), Error(
        "Objects are not valid as a React child (found: " + (q === "[object Object]" ? "object with keys {" + Object.keys(O).join(", ") + "}" : q) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return ft;
  }
  function X(O, q, Y) {
    if (O == null) return O;
    var et = [], ot = 0;
    return $(O, et, "", "", function(ct) {
      return q.call(Y, ct, ot++);
    }), et;
  }
  function F(O) {
    if (O._status === -1) {
      var q = O._result;
      q = q(), q.then(
        function(Y) {
          (O._status === 0 || O._status === -1) && (O._status = 1, O._result = Y);
        },
        function(Y) {
          (O._status === 0 || O._status === -1) && (O._status = 2, O._result = Y);
        }
      ), O._status === -1 && (O._status = 0, O._result = q);
    }
    if (O._status === 1) return O._result.default;
    throw O._result;
  }
  var tt = typeof reportError == "function" ? reportError : function(O) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var q = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof O == "object" && O !== null && typeof O.message == "string" ? String(O.message) : String(O),
        error: O
      });
      if (!window.dispatchEvent(q)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", O);
      return;
    }
    console.error(O);
  }, dt = {
    map: X,
    forEach: function(O, q, Y) {
      X(
        O,
        function() {
          q.apply(this, arguments);
        },
        Y
      );
    },
    count: function(O) {
      var q = 0;
      return X(O, function() {
        q++;
      }), q;
    },
    toArray: function(O) {
      return X(O, function(q) {
        return q;
      }) || [];
    },
    only: function(O) {
      if (!U(O))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return O;
    }
  };
  return Et.Activity = v, Et.Children = dt, Et.Component = A, Et.Fragment = i, Et.Profiler = o, Et.PureComponent = M, Et.StrictMode = l, Et.Suspense = p, Et.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = D, Et.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(O) {
      return D.H.useMemoCache(O);
    }
  }, Et.cache = function(O) {
    return function() {
      return O.apply(null, arguments);
    };
  }, Et.cacheSignal = function() {
    return null;
  }, Et.cloneElement = function(O, q, Y) {
    if (O == null)
      throw Error(
        "The argument must be a React element, but you passed " + O + "."
      );
    var et = C({}, O.props), ot = O.key;
    if (q != null)
      for (ct in q.key !== void 0 && (ot = "" + q.key), q)
        !V.call(q, ct) || ct === "key" || ct === "__self" || ct === "__source" || ct === "ref" && q.ref === void 0 || (et[ct] = q[ct]);
    var ct = arguments.length - 2;
    if (ct === 1) et.children = Y;
    else if (1 < ct) {
      for (var ft = Array(ct), nt = 0; nt < ct; nt++)
        ft[nt] = arguments[nt + 2];
      et.children = ft;
    }
    return H(O.type, ot, et);
  }, Et.createContext = function(O) {
    return O = {
      $$typeof: u,
      _currentValue: O,
      _currentValue2: O,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, O.Provider = O, O.Consumer = {
      $$typeof: c,
      _context: O
    }, O;
  }, Et.createElement = function(O, q, Y) {
    var et, ot = {}, ct = null;
    if (q != null)
      for (et in q.key !== void 0 && (ct = "" + q.key), q)
        V.call(q, et) && et !== "key" && et !== "__self" && et !== "__source" && (ot[et] = q[et]);
    var ft = arguments.length - 2;
    if (ft === 1) ot.children = Y;
    else if (1 < ft) {
      for (var nt = Array(ft), mt = 0; mt < ft; mt++)
        nt[mt] = arguments[mt + 2];
      ot.children = nt;
    }
    if (O && O.defaultProps)
      for (et in ft = O.defaultProps, ft)
        ot[et] === void 0 && (ot[et] = ft[et]);
    return H(O, ct, ot);
  }, Et.createRef = function() {
    return { current: null };
  }, Et.forwardRef = function(O) {
    return { $$typeof: d, render: O };
  }, Et.isValidElement = U, Et.lazy = function(O) {
    return {
      $$typeof: g,
      _payload: { _status: -1, _result: O },
      _init: F
    };
  }, Et.memo = function(O, q) {
    return {
      $$typeof: y,
      type: O,
      compare: q === void 0 ? null : q
    };
  }, Et.startTransition = function(O) {
    var q = D.T, Y = {};
    D.T = Y;
    try {
      var et = O(), ot = D.S;
      ot !== null && ot(Y, et), typeof et == "object" && et !== null && typeof et.then == "function" && et.then(N, tt);
    } catch (ct) {
      tt(ct);
    } finally {
      q !== null && Y.types !== null && (q.types = Y.types), D.T = q;
    }
  }, Et.unstable_useCacheRefresh = function() {
    return D.H.useCacheRefresh();
  }, Et.use = function(O) {
    return D.H.use(O);
  }, Et.useActionState = function(O, q, Y) {
    return D.H.useActionState(O, q, Y);
  }, Et.useCallback = function(O, q) {
    return D.H.useCallback(O, q);
  }, Et.useContext = function(O) {
    return D.H.useContext(O);
  }, Et.useDebugValue = function() {
  }, Et.useDeferredValue = function(O, q) {
    return D.H.useDeferredValue(O, q);
  }, Et.useEffect = function(O, q) {
    return D.H.useEffect(O, q);
  }, Et.useEffectEvent = function(O) {
    return D.H.useEffectEvent(O);
  }, Et.useId = function() {
    return D.H.useId();
  }, Et.useImperativeHandle = function(O, q, Y) {
    return D.H.useImperativeHandle(O, q, Y);
  }, Et.useInsertionEffect = function(O, q) {
    return D.H.useInsertionEffect(O, q);
  }, Et.useLayoutEffect = function(O, q) {
    return D.H.useLayoutEffect(O, q);
  }, Et.useMemo = function(O, q) {
    return D.H.useMemo(O, q);
  }, Et.useOptimistic = function(O, q) {
    return D.H.useOptimistic(O, q);
  }, Et.useReducer = function(O, q, Y) {
    return D.H.useReducer(O, q, Y);
  }, Et.useRef = function(O) {
    return D.H.useRef(O);
  }, Et.useState = function(O) {
    return D.H.useState(O);
  }, Et.useSyncExternalStore = function(O, q, Y) {
    return D.H.useSyncExternalStore(
      O,
      q,
      Y
    );
  }, Et.useTransition = function() {
    return D.H.useTransition();
  }, Et.version = "19.2.7", Et;
}
var yg;
function jr() {
  return yg || (yg = 1, xd.exports = s5()), xd.exports;
}
var T = jr();
const uh = /* @__PURE__ */ n5(T), l5 = /* @__PURE__ */ e5({
  __proto__: null,
  default: uh
}, [T]);
var Sd = { exports: {} }, Pl = {}, wd = { exports: {} }, Cd = {};
var gg;
function r5() {
  return gg || (gg = 1, (function(n) {
    function t($, X) {
      var F = $.length;
      $.push(X);
      t: for (; 0 < F; ) {
        var tt = F - 1 >>> 1, dt = $[tt];
        if (0 < o(dt, X))
          $[tt] = X, $[F] = dt, F = tt;
        else break t;
      }
    }
    function i($) {
      return $.length === 0 ? null : $[0];
    }
    function l($) {
      if ($.length === 0) return null;
      var X = $[0], F = $.pop();
      if (F !== X) {
        $[0] = F;
        t: for (var tt = 0, dt = $.length, O = dt >>> 1; tt < O; ) {
          var q = 2 * (tt + 1) - 1, Y = $[q], et = q + 1, ot = $[et];
          if (0 > o(Y, F))
            et < dt && 0 > o(ot, Y) ? ($[tt] = ot, $[et] = F, tt = et) : ($[tt] = Y, $[q] = F, tt = q);
          else if (et < dt && 0 > o(ot, F))
            $[tt] = ot, $[et] = F, tt = et;
          else break t;
        }
      }
      return X;
    }
    function o($, X) {
      var F = $.sortIndex - X.sortIndex;
      return F !== 0 ? F : $.id - X.id;
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
    var p = [], y = [], g = 1, v = null, b = 3, j = !1, w = !1, C = !1, x = !1, A = typeof setTimeout == "function" ? setTimeout : null, R = typeof clearTimeout == "function" ? clearTimeout : null, M = typeof setImmediate < "u" ? setImmediate : null;
    function _($) {
      for (var X = i(y); X !== null; ) {
        if (X.callback === null) l(y);
        else if (X.startTime <= $)
          l(y), X.sortIndex = X.expirationTime, t(p, X);
        else break;
        X = i(y);
      }
    }
    function L($) {
      if (C = !1, _($), !w)
        if (i(p) !== null)
          w = !0, N || (N = !0, I());
        else {
          var X = i(y);
          X !== null && J(L, X.startTime - $);
        }
    }
    var N = !1, D = -1, V = 5, H = -1;
    function B() {
      return x ? !0 : !(n.unstable_now() - H < V);
    }
    function U() {
      if (x = !1, N) {
        var $ = n.unstable_now();
        H = $;
        var X = !0;
        try {
          t: {
            w = !1, C && (C = !1, R(D), D = -1), j = !0;
            var F = b;
            try {
              e: {
                for (_($), v = i(p); v !== null && !(v.expirationTime > $ && B()); ) {
                  var tt = v.callback;
                  if (typeof tt == "function") {
                    v.callback = null, b = v.priorityLevel;
                    var dt = tt(
                      v.expirationTime <= $
                    );
                    if ($ = n.unstable_now(), typeof dt == "function") {
                      v.callback = dt, _($), X = !0;
                      break e;
                    }
                    v === i(p) && l(p), _($);
                  } else l(p);
                  v = i(p);
                }
                if (v !== null) X = !0;
                else {
                  var O = i(y);
                  O !== null && J(
                    L,
                    O.startTime - $
                  ), X = !1;
                }
              }
              break t;
            } finally {
              v = null, b = F, j = !1;
            }
            X = void 0;
          }
        } finally {
          X ? I() : N = !1;
        }
      }
    }
    var I;
    if (typeof M == "function")
      I = function() {
        M(U);
      };
    else if (typeof MessageChannel < "u") {
      var P = new MessageChannel(), it = P.port2;
      P.port1.onmessage = U, I = function() {
        it.postMessage(null);
      };
    } else
      I = function() {
        A(U, 0);
      };
    function J($, X) {
      D = A(function() {
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
      var F = b;
      b = X;
      try {
        return $();
      } finally {
        b = F;
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
      var F = b;
      b = $;
      try {
        return X();
      } finally {
        b = F;
      }
    }, n.unstable_scheduleCallback = function($, X, F) {
      var tt = n.unstable_now();
      switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? tt + F : tt) : F = tt, $) {
        case 1:
          var dt = -1;
          break;
        case 2:
          dt = 250;
          break;
        case 5:
          dt = 1073741823;
          break;
        case 4:
          dt = 1e4;
          break;
        default:
          dt = 5e3;
      }
      return dt = F + dt, $ = {
        id: g++,
        callback: X,
        priorityLevel: $,
        startTime: F,
        expirationTime: dt,
        sortIndex: -1
      }, F > tt ? ($.sortIndex = F, t(y, $), i(p) === null && $ === i(y) && (C ? (R(D), D = -1) : C = !0, J(L, F - tt))) : ($.sortIndex = dt, t(p, $), w || j || (w = !0, N || (N = !0, I()))), $;
    }, n.unstable_shouldYield = B, n.unstable_wrapCallback = function($) {
      var X = b;
      return function() {
        var F = b;
        b = X;
        try {
          return $.apply(this, arguments);
        } finally {
          b = F;
        }
      };
    };
  })(Cd)), Cd;
}
var vg;
function o5() {
  return vg || (vg = 1, wd.exports = r5()), wd.exports;
}
var Td = { exports: {} }, ze = {};
var bg;
function c5() {
  if (bg) return ze;
  bg = 1;
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
  return ze.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = l, ze.createPortal = function(p, y) {
    var g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!y || y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11)
      throw Error(t(299));
    return c(p, y, null, g);
  }, ze.flushSync = function(p) {
    var y = u.T, g = l.p;
    try {
      if (u.T = null, l.p = 2, p) return p();
    } finally {
      u.T = y, l.p = g, l.d.f();
    }
  }, ze.preconnect = function(p, y) {
    typeof p == "string" && (y ? (y = y.crossOrigin, y = typeof y == "string" ? y === "use-credentials" ? y : "" : void 0) : y = null, l.d.C(p, y));
  }, ze.prefetchDNS = function(p) {
    typeof p == "string" && l.d.D(p);
  }, ze.preinit = function(p, y) {
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
  }, ze.preinitModule = function(p, y) {
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
  }, ze.preload = function(p, y) {
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
  }, ze.preloadModule = function(p, y) {
    if (typeof p == "string")
      if (y) {
        var g = d(y.as, y.crossOrigin);
        l.d.m(p, {
          as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
          crossOrigin: g,
          integrity: typeof y.integrity == "string" ? y.integrity : void 0
        });
      } else l.d.m(p);
  }, ze.requestFormReset = function(p) {
    l.d.r(p);
  }, ze.unstable_batchedUpdates = function(p, y) {
    return p(y);
  }, ze.useFormState = function(p, y, g) {
    return u.H.useFormState(p, y, g);
  }, ze.useFormStatus = function() {
    return u.H.useHostTransitionStatus();
  }, ze.version = "19.2.7", ze;
}
var xg;
function db() {
  if (xg) return Td.exports;
  xg = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (t) {
        console.error(t);
      }
  }
  return n(), Td.exports = c5(), Td.exports;
}
var Sg;
function u5() {
  if (Sg) return Pl;
  Sg = 1;
  var n = o5(), t = jr(), i = db();
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
        for (var S = !1, E = f.child; E; ) {
          if (E === s) {
            S = !0, s = f, r = m;
            break;
          }
          if (E === r) {
            S = !0, r = f, s = m;
            break;
          }
          E = E.sibling;
        }
        if (!S) {
          for (E = m.child; E; ) {
            if (E === s) {
              S = !0, s = m, r = f;
              break;
            }
            if (E === r) {
              S = !0, r = m, s = f;
              break;
            }
            E = E.sibling;
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
  var v = Object.assign, b = Symbol.for("react.element"), j = Symbol.for("react.transitional.element"), w = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), x = Symbol.for("react.strict_mode"), A = Symbol.for("react.profiler"), R = Symbol.for("react.consumer"), M = Symbol.for("react.context"), _ = Symbol.for("react.forward_ref"), L = Symbol.for("react.suspense"), N = Symbol.for("react.suspense_list"), D = Symbol.for("react.memo"), V = Symbol.for("react.lazy"), H = Symbol.for("react.activity"), B = Symbol.for("react.memo_cache_sentinel"), U = Symbol.iterator;
  function I(e) {
    return e === null || typeof e != "object" ? null : (e = U && e[U] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var P = Symbol.for("react.client.reference");
  function it(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === P ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case C:
        return "Fragment";
      case A:
        return "Profiler";
      case x:
        return "StrictMode";
      case L:
        return "Suspense";
      case N:
        return "SuspenseList";
      case H:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case w:
          return "Portal";
        case M:
          return e.displayName || "Context";
        case R:
          return (e._context.displayName || "Context") + ".Consumer";
        case _:
          var a = e.render;
          return e = e.displayName, e || (e = a.displayName || a.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case D:
          return a = e.displayName || null, a !== null ? a : it(e.type) || "Memo";
        case V:
          a = e._payload, e = e._init;
          try {
            return it(e(a));
          } catch {
          }
      }
    return null;
  }
  var J = Array.isArray, $ = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, X = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, tt = [], dt = -1;
  function O(e) {
    return { current: e };
  }
  function q(e) {
    0 > dt || (e.current = tt[dt], tt[dt] = null, dt--);
  }
  function Y(e, a) {
    dt++, tt[dt] = e.current, e.current = a;
  }
  var et = O(null), ot = O(null), ct = O(null), ft = O(null);
  function nt(e, a) {
    switch (Y(ct, a), Y(ot, e), Y(et, null), a.nodeType) {
      case 9:
      case 11:
        e = (e = a.documentElement) && (e = e.namespaceURI) ? ky(e) : 0;
        break;
      default:
        if (e = a.tagName, a = a.namespaceURI)
          a = ky(a), e = By(a, e);
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
    q(et), Y(et, e);
  }
  function mt() {
    q(et), q(ot), q(ct);
  }
  function ut(e) {
    e.memoizedState !== null && Y(ft, e);
    var a = et.current, s = By(a, e.type);
    a !== s && (Y(ot, e), Y(et, s));
  }
  function yt(e) {
    ot.current === e && (q(et), q(ot)), ft.current === e && (q(ft), zl._currentValue = F);
  }
  var xt, ce;
  function ht(e) {
    if (xt === void 0)
      try {
        throw Error();
      } catch (s) {
        var a = s.stack.trim().match(/\n( *(at )?)/);
        xt = a && a[1] || "", ce = -1 < s.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < s.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + xt + e + ce;
  }
  var $t = !1;
  function Wt(e, a) {
    if (!e || $t) return "";
    $t = !0;
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
      var m = r.DetermineComponentFrameRoot(), S = m[0], E = m[1];
      if (S && E) {
        var k = S.split(`
`), Z = E.split(`
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
                  var st = `
` + k[r].replace(" at new ", " at ");
                  return e.displayName && st.includes("<anonymous>") && (st = st.replace("<anonymous>", e.displayName)), st;
                }
              while (1 <= r && 0 <= f);
            break;
          }
      }
    } finally {
      $t = !1, Error.prepareStackTrace = s;
    }
    return (s = e ? e.displayName || e.name : "") ? ht(s) : "";
  }
  function ue(e, a) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return ht(e.type);
      case 16:
        return ht("Lazy");
      case 13:
        return e.child !== a && a !== null ? ht("Suspense Fallback") : ht("Suspense");
      case 19:
        return ht("SuspenseList");
      case 0:
      case 15:
        return Wt(e.type, !1);
      case 11:
        return Wt(e.type.render, !1);
      case 1:
        return Wt(e.type, !0);
      case 31:
        return ht("Activity");
      default:
        return "";
    }
  }
  function te(e) {
    try {
      var a = "", s = null;
      do
        a += ue(e, s), s = e, e = e.return;
      while (e);
      return a;
    } catch (r) {
      return `
Error generating stack: ` + r.message + `
` + r.stack;
    }
  }
  var zn = Object.prototype.hasOwnProperty, He = n.unstable_scheduleCallback, Fn = n.unstable_cancelCallback, In = n.unstable_shouldYield, $r = n.unstable_requestPaint, Be = n.unstable_now, wp = n.unstable_getCurrentPriorityLevel, Ws = n.unstable_ImmediatePriority, kr = n.unstable_UserBlockingPriority, ai = n.unstable_NormalPriority, ii = n.unstable_LowPriority, si = n.unstable_IdlePriority, pe = n.log, Br = n.unstable_setDisableYieldValue, li = null, qe = null;
  function En(e) {
    if (typeof pe == "function" && Br(e), qe && typeof qe.setStrictMode == "function")
      try {
        qe.setStrictMode(li, e);
      } catch {
      }
  }
  var Ye = Math.clz32 ? Math.clz32 : ou, lu = Math.log, ru = Math.LN2;
  function ou(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (lu(e) / ru | 0) | 0;
  }
  var qi = 256, Yi = 262144, Pi = 4194304;
  function Jn(e) {
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
  function Gi(e, a, s) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var f = 0, m = e.suspendedLanes, S = e.pingedLanes;
    e = e.warmLanes;
    var E = r & 134217727;
    return E !== 0 ? (r = E & ~m, r !== 0 ? f = Jn(r) : (S &= E, S !== 0 ? f = Jn(S) : s || (s = E & ~e, s !== 0 && (f = Jn(s))))) : (E = r & ~m, E !== 0 ? f = Jn(E) : S !== 0 ? f = Jn(S) : s || (s = r & ~e, s !== 0 && (f = Jn(s)))), f === 0 ? 0 : a !== 0 && a !== f && (a & m) === 0 && (m = f & -f, s = a & -a, m >= s || m === 32 && (s & 4194048) !== 0) ? a : f;
  }
  function ri(e, a) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & a) === 0;
  }
  function at(e, a) {
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
  function Bt() {
    var e = Pi;
    return Pi <<= 1, (Pi & 62914560) === 0 && (Pi = 4194304), e;
  }
  function At(e) {
    for (var a = [], s = 0; 31 > s; s++) a.push(e);
    return a;
  }
  function Te(e, a) {
    e.pendingLanes |= a, a !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Vt(e, a, s, r, f, m) {
    var S = e.pendingLanes;
    e.pendingLanes = s, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= s, e.entangledLanes &= s, e.errorRecoveryDisabledLanes &= s, e.shellSuspendCounter = 0;
    var E = e.entanglements, k = e.expirationTimes, Z = e.hiddenUpdates;
    for (s = S & ~s; 0 < s; ) {
      var st = 31 - Ye(s), rt = 1 << st;
      E[st] = 0, k[st] = -1;
      var Q = Z[st];
      if (Q !== null)
        for (Z[st] = null, st = 0; st < Q.length; st++) {
          var W = Q[st];
          W !== null && (W.lane &= -536870913);
        }
      s &= ~rt;
    }
    r !== 0 && Me(e, r, 0), m !== 0 && f === 0 && e.tag !== 0 && (e.suspendedLanes |= m & ~(S & ~a));
  }
  function Me(e, a, s) {
    e.pendingLanes |= a, e.suspendedLanes &= ~a;
    var r = 31 - Ye(a);
    e.entangledLanes |= a, e.entanglements[r] = e.entanglements[r] | 1073741824 | s & 261930;
  }
  function Un(e, a) {
    var s = e.entangledLanes |= a;
    for (e = e.entanglements; s; ) {
      var r = 31 - Ye(s), f = 1 << r;
      f & a | e[r] & a && (e[r] |= a), s &= ~f;
    }
  }
  function De(e, a) {
    var s = a & -a;
    return s = (s & 42) !== 0 ? 1 : fe(s), (s & (e.suspendedLanes | a)) !== 0 ? 0 : s;
  }
  function fe(e) {
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
  function Wn(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function ta() {
    var e = X.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : lg(e.type));
  }
  function Qe(e, a) {
    var s = X.p;
    try {
      return X.p = e, a();
    } finally {
      X.p = s;
    }
  }
  var Ve = Math.random().toString(36).slice(2), ye = "__reactFiber$" + Ve, Fe = "__reactProps$" + Ve, Xi = "__reactContainer$" + Ve, cu = "__reactEvents$" + Ve, P3 = "__reactListeners$" + Ve, G3 = "__reactHandles$" + Ve, Cp = "__reactResources$" + Ve, tl = "__reactMarker$" + Ve;
  function uu(e) {
    delete e[ye], delete e[Fe], delete e[cu], delete e[P3], delete e[G3];
  }
  function Ki(e) {
    var a = e[ye];
    if (a) return a;
    for (var s = e.parentNode; s; ) {
      if (a = s[Xi] || s[ye]) {
        if (s = a.alternate, a.child !== null || s !== null && s.child !== null)
          for (e = Py(e); e !== null; ) {
            if (s = e[ye]) return s;
            e = Py(e);
          }
        return a;
      }
      e = s, s = e.parentNode;
    }
    return null;
  }
  function Zi(e) {
    if (e = e[ye] || e[Xi]) {
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
  function Qi(e) {
    var a = e[Cp];
    return a || (a = e[Cp] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), a;
  }
  function _e(e) {
    e[tl] = !0;
  }
  var Tp = /* @__PURE__ */ new Set(), jp = {};
  function oi(e, a) {
    Fi(e, a), Fi(e + "Capture", a);
  }
  function Fi(e, a) {
    for (jp[e] = a, e = 0; e < a.length; e++)
      Tp.add(a[e]);
  }
  var X3 = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Ap = {}, Ep = {};
  function K3(e) {
    return zn.call(Ep, e) ? !0 : zn.call(Ap, e) ? !1 : X3.test(e) ? Ep[e] = !0 : (Ap[e] = !0, !1);
  }
  function Vr(e, a, s) {
    if (K3(a))
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
  function zr(e, a, s) {
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
  function ea(e, a, s, r) {
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
  function Mp(e) {
    var a = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (a === "checkbox" || a === "radio");
  }
  function Z3(e, a, s) {
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
  function fu(e) {
    if (!e._valueTracker) {
      var a = Mp(e) ? "checked" : "value";
      e._valueTracker = Z3(
        e,
        a,
        "" + e[a]
      );
    }
  }
  function _p(e) {
    if (!e) return !1;
    var a = e._valueTracker;
    if (!a) return !0;
    var s = a.getValue(), r = "";
    return e && (r = Mp(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== s ? (a.setValue(e), !0) : !1;
  }
  function Ur(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var Q3 = /[\n"\\]/g;
  function pn(e) {
    return e.replace(
      Q3,
      function(a) {
        return "\\" + a.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function du(e, a, s, r, f, m, S, E) {
    e.name = "", S != null && typeof S != "function" && typeof S != "symbol" && typeof S != "boolean" ? e.type = S : e.removeAttribute("type"), a != null ? S === "number" ? (a === 0 && e.value === "" || e.value != a) && (e.value = "" + mn(a)) : e.value !== "" + mn(a) && (e.value = "" + mn(a)) : S !== "submit" && S !== "reset" || e.removeAttribute("value"), a != null ? hu(e, S, mn(a)) : s != null ? hu(e, S, mn(s)) : r != null && e.removeAttribute("value"), f == null && m != null && (e.defaultChecked = !!m), f != null && (e.checked = f && typeof f != "function" && typeof f != "symbol"), E != null && typeof E != "function" && typeof E != "symbol" && typeof E != "boolean" ? e.name = "" + mn(E) : e.removeAttribute("name");
  }
  function Rp(e, a, s, r, f, m, S, E) {
    if (m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (e.type = m), a != null || s != null) {
      if (!(m !== "submit" && m !== "reset" || a != null)) {
        fu(e);
        return;
      }
      s = s != null ? "" + mn(s) : "", a = a != null ? "" + mn(a) : s, E || a === e.value || (e.value = a), e.defaultValue = a;
    }
    r = r ?? f, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = E ? e.checked : !!r, e.defaultChecked = !!r, S != null && typeof S != "function" && typeof S != "symbol" && typeof S != "boolean" && (e.name = S), fu(e);
  }
  function hu(e, a, s) {
    a === "number" && Ur(e.ownerDocument) === e || e.defaultValue === "" + s || (e.defaultValue = "" + s);
  }
  function Ii(e, a, s, r) {
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
  function Dp(e, a, s) {
    if (a != null && (a = "" + mn(a), a !== e.value && (e.value = a), s == null)) {
      e.defaultValue !== a && (e.defaultValue = a);
      return;
    }
    e.defaultValue = s != null ? "" + mn(s) : "";
  }
  function Np(e, a, s, r) {
    if (a == null) {
      if (r != null) {
        if (s != null) throw Error(l(92));
        if (J(r)) {
          if (1 < r.length) throw Error(l(93));
          r = r[0];
        }
        s = r;
      }
      s == null && (s = ""), a = s;
    }
    s = mn(a), e.defaultValue = s, r = e.textContent, r === s && r !== "" && r !== null && (e.value = r), fu(e);
  }
  function Ji(e, a) {
    if (a) {
      var s = e.firstChild;
      if (s && s === e.lastChild && s.nodeType === 3) {
        s.nodeValue = a;
        return;
      }
    }
    e.textContent = a;
  }
  var F3 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Op(e, a, s) {
    var r = a.indexOf("--") === 0;
    s == null || typeof s == "boolean" || s === "" ? r ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "" : r ? e.setProperty(a, s) : typeof s != "number" || s === 0 || F3.has(a) ? a === "float" ? e.cssFloat = s : e[a] = ("" + s).trim() : e[a] = s + "px";
  }
  function Lp(e, a, s) {
    if (a != null && typeof a != "object")
      throw Error(l(62));
    if (e = e.style, s != null) {
      for (var r in s)
        !s.hasOwnProperty(r) || a != null && a.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
      for (var f in a)
        r = a[f], a.hasOwnProperty(f) && s[f] !== r && Op(e, f, r);
    } else
      for (var m in a)
        a.hasOwnProperty(m) && Op(e, m, a[m]);
  }
  function mu(e) {
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
  var I3 = /* @__PURE__ */ new Map([
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
  ]), J3 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Hr(e) {
    return J3.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function na() {
  }
  var pu = null;
  function yu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Wi = null, ts = null;
  function $p(e) {
    var a = Zi(e);
    if (a && (e = a.stateNode)) {
      var s = e[Fe] || null;
      t: switch (e = a.stateNode, a.type) {
        case "input":
          if (du(
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
                var f = r[Fe] || null;
                if (!f) throw Error(l(90));
                du(
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
              r = s[a], r.form === e.form && _p(r);
          }
          break t;
        case "textarea":
          Dp(e, s.value, s.defaultValue);
          break t;
        case "select":
          a = s.value, a != null && Ii(e, !!s.multiple, a, !1);
      }
    }
  }
  var gu = !1;
  function kp(e, a, s) {
    if (gu) return e(a, s);
    gu = !0;
    try {
      var r = e(a);
      return r;
    } finally {
      if (gu = !1, (Wi !== null || ts !== null) && (_o(), Wi && (a = Wi, e = ts, ts = Wi = null, $p(a), e)))
        for (a = 0; a < e.length; a++) $p(e[a]);
    }
  }
  function nl(e, a) {
    var s = e.stateNode;
    if (s === null) return null;
    var r = s[Fe] || null;
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
  var aa = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), vu = !1;
  if (aa)
    try {
      var al = {};
      Object.defineProperty(al, "passive", {
        get: function() {
          vu = !0;
        }
      }), window.addEventListener("test", al, al), window.removeEventListener("test", al, al);
    } catch {
      vu = !1;
    }
  var ja = null, bu = null, qr = null;
  function Bp() {
    if (qr) return qr;
    var e, a = bu, s = a.length, r, f = "value" in ja ? ja.value : ja.textContent, m = f.length;
    for (e = 0; e < s && a[e] === f[e]; e++) ;
    var S = s - e;
    for (r = 1; r <= S && a[s - r] === f[m - r]; r++) ;
    return qr = f.slice(e, 1 < r ? 1 - r : void 0);
  }
  function Yr(e) {
    var a = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && a === 13 && (e = 13)) : e = a, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Pr() {
    return !0;
  }
  function Vp() {
    return !1;
  }
  function Ie(e) {
    function a(s, r, f, m, S) {
      this._reactName = s, this._targetInst = f, this.type = r, this.nativeEvent = m, this.target = S, this.currentTarget = null;
      for (var E in e)
        e.hasOwnProperty(E) && (s = e[E], this[E] = s ? s(m) : m[E]);
      return this.isDefaultPrevented = (m.defaultPrevented != null ? m.defaultPrevented : m.returnValue === !1) ? Pr : Vp, this.isPropagationStopped = Vp, this;
    }
    return v(a.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var s = this.nativeEvent;
        s && (s.preventDefault ? s.preventDefault() : typeof s.returnValue != "unknown" && (s.returnValue = !1), this.isDefaultPrevented = Pr);
      },
      stopPropagation: function() {
        var s = this.nativeEvent;
        s && (s.stopPropagation ? s.stopPropagation() : typeof s.cancelBubble != "unknown" && (s.cancelBubble = !0), this.isPropagationStopped = Pr);
      },
      persist: function() {
      },
      isPersistent: Pr
    }), a;
  }
  var ci = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Gr = Ie(ci), il = v({}, ci, { view: 0, detail: 0 }), W3 = Ie(il), xu, Su, sl, Xr = v({}, il, {
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
    getModifierState: Cu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== sl && (sl && e.type === "mousemove" ? (xu = e.screenX - sl.screenX, Su = e.screenY - sl.screenY) : Su = xu = 0, sl = e), xu);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Su;
    }
  }), zp = Ie(Xr), tw = v({}, Xr, { dataTransfer: 0 }), ew = Ie(tw), nw = v({}, il, { relatedTarget: 0 }), wu = Ie(nw), aw = v({}, ci, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), iw = Ie(aw), sw = v({}, ci, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), lw = Ie(sw), rw = v({}, ci, { data: 0 }), Up = Ie(rw), ow = {
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
  }, cw = {
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
  }, uw = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function fw(e) {
    var a = this.nativeEvent;
    return a.getModifierState ? a.getModifierState(e) : (e = uw[e]) ? !!a[e] : !1;
  }
  function Cu() {
    return fw;
  }
  var dw = v({}, il, {
    key: function(e) {
      if (e.key) {
        var a = ow[e.key] || e.key;
        if (a !== "Unidentified") return a;
      }
      return e.type === "keypress" ? (e = Yr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? cw[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Cu,
    charCode: function(e) {
      return e.type === "keypress" ? Yr(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Yr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), hw = Ie(dw), mw = v({}, Xr, {
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
  }), Hp = Ie(mw), pw = v({}, il, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Cu
  }), yw = Ie(pw), gw = v({}, ci, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), vw = Ie(gw), bw = v({}, Xr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), xw = Ie(bw), Sw = v({}, ci, {
    newState: 0,
    oldState: 0
  }), ww = Ie(Sw), Cw = [9, 13, 27, 32], Tu = aa && "CompositionEvent" in window, ll = null;
  aa && "documentMode" in document && (ll = document.documentMode);
  var Tw = aa && "TextEvent" in window && !ll, qp = aa && (!Tu || ll && 8 < ll && 11 >= ll), Yp = " ", Pp = !1;
  function Gp(e, a) {
    switch (e) {
      case "keyup":
        return Cw.indexOf(a.keyCode) !== -1;
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
  function Xp(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var es = !1;
  function jw(e, a) {
    switch (e) {
      case "compositionend":
        return Xp(a);
      case "keypress":
        return a.which !== 32 ? null : (Pp = !0, Yp);
      case "textInput":
        return e = a.data, e === Yp && Pp ? null : e;
      default:
        return null;
    }
  }
  function Aw(e, a) {
    if (es)
      return e === "compositionend" || !Tu && Gp(e, a) ? (e = Bp(), qr = bu = ja = null, es = !1, e) : null;
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
        return qp && a.locale !== "ko" ? null : a.data;
      default:
        return null;
    }
  }
  var Ew = {
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
  function Kp(e) {
    var a = e && e.nodeName && e.nodeName.toLowerCase();
    return a === "input" ? !!Ew[e.type] : a === "textarea";
  }
  function Zp(e, a, s, r) {
    Wi ? ts ? ts.push(r) : ts = [r] : Wi = r, a = ko(a, "onChange"), 0 < a.length && (s = new Gr(
      "onChange",
      "change",
      null,
      s,
      r
    ), e.push({ event: s, listeners: a }));
  }
  var rl = null, ol = null;
  function Mw(e) {
    Ry(e, 0);
  }
  function Kr(e) {
    var a = el(e);
    if (_p(a)) return e;
  }
  function Qp(e, a) {
    if (e === "change") return a;
  }
  var Fp = !1;
  if (aa) {
    var ju;
    if (aa) {
      var Au = "oninput" in document;
      if (!Au) {
        var Ip = document.createElement("div");
        Ip.setAttribute("oninput", "return;"), Au = typeof Ip.oninput == "function";
      }
      ju = Au;
    } else ju = !1;
    Fp = ju && (!document.documentMode || 9 < document.documentMode);
  }
  function Jp() {
    rl && (rl.detachEvent("onpropertychange", Wp), ol = rl = null);
  }
  function Wp(e) {
    if (e.propertyName === "value" && Kr(ol)) {
      var a = [];
      Zp(
        a,
        ol,
        e,
        yu(e)
      ), kp(Mw, a);
    }
  }
  function _w(e, a, s) {
    e === "focusin" ? (Jp(), rl = a, ol = s, rl.attachEvent("onpropertychange", Wp)) : e === "focusout" && Jp();
  }
  function Rw(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Kr(ol);
  }
  function Dw(e, a) {
    if (e === "click") return Kr(a);
  }
  function Nw(e, a) {
    if (e === "input" || e === "change")
      return Kr(a);
  }
  function Ow(e, a) {
    return e === a && (e !== 0 || 1 / e === 1 / a) || e !== e && a !== a;
  }
  var ln = typeof Object.is == "function" ? Object.is : Ow;
  function cl(e, a) {
    if (ln(e, a)) return !0;
    if (typeof e != "object" || e === null || typeof a != "object" || a === null)
      return !1;
    var s = Object.keys(e), r = Object.keys(a);
    if (s.length !== r.length) return !1;
    for (r = 0; r < s.length; r++) {
      var f = s[r];
      if (!zn.call(a, f) || !ln(e[f], a[f]))
        return !1;
    }
    return !0;
  }
  function t0(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function e0(e, a) {
    var s = t0(e);
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
      s = t0(s);
    }
  }
  function n0(e, a) {
    return e && a ? e === a ? !0 : e && e.nodeType === 3 ? !1 : a && a.nodeType === 3 ? n0(e, a.parentNode) : "contains" in e ? e.contains(a) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(a) & 16) : !1 : !1;
  }
  function a0(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var a = Ur(e.document); a instanceof e.HTMLIFrameElement; ) {
      try {
        var s = typeof a.contentWindow.location.href == "string";
      } catch {
        s = !1;
      }
      if (s) e = a.contentWindow;
      else break;
      a = Ur(e.document);
    }
    return a;
  }
  function Eu(e) {
    var a = e && e.nodeName && e.nodeName.toLowerCase();
    return a && (a === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || a === "textarea" || e.contentEditable === "true");
  }
  var Lw = aa && "documentMode" in document && 11 >= document.documentMode, ns = null, Mu = null, ul = null, _u = !1;
  function i0(e, a, s) {
    var r = s.window === s ? s.document : s.nodeType === 9 ? s : s.ownerDocument;
    _u || ns == null || ns !== Ur(r) || (r = ns, "selectionStart" in r && Eu(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
      anchorNode: r.anchorNode,
      anchorOffset: r.anchorOffset,
      focusNode: r.focusNode,
      focusOffset: r.focusOffset
    }), ul && cl(ul, r) || (ul = r, r = ko(Mu, "onSelect"), 0 < r.length && (a = new Gr(
      "onSelect",
      "select",
      null,
      a,
      s
    ), e.push({ event: a, listeners: r }), a.target = ns)));
  }
  function ui(e, a) {
    var s = {};
    return s[e.toLowerCase()] = a.toLowerCase(), s["Webkit" + e] = "webkit" + a, s["Moz" + e] = "moz" + a, s;
  }
  var as = {
    animationend: ui("Animation", "AnimationEnd"),
    animationiteration: ui("Animation", "AnimationIteration"),
    animationstart: ui("Animation", "AnimationStart"),
    transitionrun: ui("Transition", "TransitionRun"),
    transitionstart: ui("Transition", "TransitionStart"),
    transitioncancel: ui("Transition", "TransitionCancel"),
    transitionend: ui("Transition", "TransitionEnd")
  }, Ru = {}, s0 = {};
  aa && (s0 = document.createElement("div").style, "AnimationEvent" in window || (delete as.animationend.animation, delete as.animationiteration.animation, delete as.animationstart.animation), "TransitionEvent" in window || delete as.transitionend.transition);
  function fi(e) {
    if (Ru[e]) return Ru[e];
    if (!as[e]) return e;
    var a = as[e], s;
    for (s in a)
      if (a.hasOwnProperty(s) && s in s0)
        return Ru[e] = a[s];
    return e;
  }
  var l0 = fi("animationend"), r0 = fi("animationiteration"), o0 = fi("animationstart"), $w = fi("transitionrun"), kw = fi("transitionstart"), Bw = fi("transitioncancel"), c0 = fi("transitionend"), u0 = /* @__PURE__ */ new Map(), Du = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Du.push("scrollEnd");
  function Mn(e, a) {
    u0.set(e, a), oi(a, [e]);
  }
  var Zr = typeof reportError == "function" ? reportError : function(e) {
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
  }, yn = [], is = 0, Nu = 0;
  function Qr() {
    for (var e = is, a = Nu = is = 0; a < e; ) {
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
      m !== 0 && f0(s, f, m);
    }
  }
  function Fr(e, a, s, r) {
    yn[is++] = e, yn[is++] = a, yn[is++] = s, yn[is++] = r, Nu |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
  }
  function Ou(e, a, s, r) {
    return Fr(e, a, s, r), Ir(e);
  }
  function di(e, a) {
    return Fr(e, null, null, a), Ir(e);
  }
  function f0(e, a, s) {
    e.lanes |= s;
    var r = e.alternate;
    r !== null && (r.lanes |= s);
    for (var f = !1, m = e.return; m !== null; )
      m.childLanes |= s, r = m.alternate, r !== null && (r.childLanes |= s), m.tag === 22 && (e = m.stateNode, e === null || e._visibility & 1 || (f = !0)), e = m, m = m.return;
    return e.tag === 3 ? (m = e.stateNode, f && a !== null && (f = 31 - Ye(s), e = m.hiddenUpdates, r = e[f], r === null ? e[f] = [a] : r.push(a), a.lane = s | 536870912), m) : null;
  }
  function Ir(e) {
    if (50 < Nl)
      throw Nl = 0, Yf = null, Error(l(185));
    for (var a = e.return; a !== null; )
      e = a, a = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var ss = {};
  function Vw(e, a, s, r) {
    this.tag = e, this.key = s, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = a, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function rn(e, a, s, r) {
    return new Vw(e, a, s, r);
  }
  function Lu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function ia(e, a) {
    var s = e.alternate;
    return s === null ? (s = rn(
      e.tag,
      a,
      e.key,
      e.mode
    ), s.elementType = e.elementType, s.type = e.type, s.stateNode = e.stateNode, s.alternate = e, e.alternate = s) : (s.pendingProps = a, s.type = e.type, s.flags = 0, s.subtreeFlags = 0, s.deletions = null), s.flags = e.flags & 65011712, s.childLanes = e.childLanes, s.lanes = e.lanes, s.child = e.child, s.memoizedProps = e.memoizedProps, s.memoizedState = e.memoizedState, s.updateQueue = e.updateQueue, a = e.dependencies, s.dependencies = a === null ? null : { lanes: a.lanes, firstContext: a.firstContext }, s.sibling = e.sibling, s.index = e.index, s.ref = e.ref, s.refCleanup = e.refCleanup, s;
  }
  function d0(e, a) {
    e.flags &= 65011714;
    var s = e.alternate;
    return s === null ? (e.childLanes = 0, e.lanes = a, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = s.childLanes, e.lanes = s.lanes, e.child = s.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = s.memoizedProps, e.memoizedState = s.memoizedState, e.updateQueue = s.updateQueue, e.type = s.type, a = s.dependencies, e.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }), e;
  }
  function Jr(e, a, s, r, f, m) {
    var S = 0;
    if (r = e, typeof e == "function") Lu(e) && (S = 1);
    else if (typeof e == "string")
      S = Y4(
        e,
        s,
        et.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      t: switch (e) {
        case H:
          return e = rn(31, s, a, f), e.elementType = H, e.lanes = m, e;
        case C:
          return hi(s.children, f, m, a);
        case x:
          S = 8, f |= 24;
          break;
        case A:
          return e = rn(12, s, a, f | 2), e.elementType = A, e.lanes = m, e;
        case L:
          return e = rn(13, s, a, f), e.elementType = L, e.lanes = m, e;
        case N:
          return e = rn(19, s, a, f), e.elementType = N, e.lanes = m, e;
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case M:
                S = 10;
                break t;
              case R:
                S = 9;
                break t;
              case _:
                S = 11;
                break t;
              case D:
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
    return a = rn(S, s, a, f), a.elementType = e, a.type = r, a.lanes = m, a;
  }
  function hi(e, a, s, r) {
    return e = rn(7, e, r, a), e.lanes = s, e;
  }
  function $u(e, a, s) {
    return e = rn(6, e, null, a), e.lanes = s, e;
  }
  function h0(e) {
    var a = rn(18, null, null, 0);
    return a.stateNode = e, a;
  }
  function ku(e, a, s) {
    return a = rn(
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
  var m0 = /* @__PURE__ */ new WeakMap();
  function gn(e, a) {
    if (typeof e == "object" && e !== null) {
      var s = m0.get(e);
      return s !== void 0 ? s : (a = {
        value: e,
        source: a,
        stack: te(a)
      }, m0.set(e, a), a);
    }
    return {
      value: e,
      source: a,
      stack: te(a)
    };
  }
  var ls = [], rs = 0, Wr = null, fl = 0, vn = [], bn = 0, Aa = null, Hn = 1, qn = "";
  function sa(e, a) {
    ls[rs++] = fl, ls[rs++] = Wr, Wr = e, fl = a;
  }
  function p0(e, a, s) {
    vn[bn++] = Hn, vn[bn++] = qn, vn[bn++] = Aa, Aa = e;
    var r = Hn;
    e = qn;
    var f = 32 - Ye(r) - 1;
    r &= ~(1 << f), s += 1;
    var m = 32 - Ye(a) + f;
    if (30 < m) {
      var S = f - f % 5;
      m = (r & (1 << S) - 1).toString(32), r >>= S, f -= S, Hn = 1 << 32 - Ye(a) + f | s << f | r, qn = m + e;
    } else
      Hn = 1 << m | s << f | r, qn = e;
  }
  function Bu(e) {
    e.return !== null && (sa(e, 1), p0(e, 1, 0));
  }
  function Vu(e) {
    for (; e === Wr; )
      Wr = ls[--rs], ls[rs] = null, fl = ls[--rs], ls[rs] = null;
    for (; e === Aa; )
      Aa = vn[--bn], vn[bn] = null, qn = vn[--bn], vn[bn] = null, Hn = vn[--bn], vn[bn] = null;
  }
  function y0(e, a) {
    vn[bn++] = Hn, vn[bn++] = qn, vn[bn++] = Aa, Hn = a.id, qn = a.overflow, Aa = e;
  }
  var Ne = null, ee = null, kt = !1, Ea = null, xn = !1, zu = Error(l(519));
  function Ma(e) {
    var a = Error(
      l(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw dl(gn(a, e)), zu;
  }
  function g0(e) {
    var a = e.stateNode, s = e.type, r = e.memoizedProps;
    switch (a[ye] = e, a[Fe] = r, s) {
      case "dialog":
        Nt("cancel", a), Nt("close", a);
        break;
      case "iframe":
      case "object":
      case "embed":
        Nt("load", a);
        break;
      case "video":
      case "audio":
        for (s = 0; s < Ll.length; s++)
          Nt(Ll[s], a);
        break;
      case "source":
        Nt("error", a);
        break;
      case "img":
      case "image":
      case "link":
        Nt("error", a), Nt("load", a);
        break;
      case "details":
        Nt("toggle", a);
        break;
      case "input":
        Nt("invalid", a), Rp(
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
        Nt("invalid", a);
        break;
      case "textarea":
        Nt("invalid", a), Np(a, r.value, r.defaultValue, r.children);
    }
    s = r.children, typeof s != "string" && typeof s != "number" && typeof s != "bigint" || a.textContent === "" + s || r.suppressHydrationWarning === !0 || Ly(a.textContent, s) ? (r.popover != null && (Nt("beforetoggle", a), Nt("toggle", a)), r.onScroll != null && Nt("scroll", a), r.onScrollEnd != null && Nt("scrollend", a), r.onClick != null && (a.onclick = na), a = !0) : a = !1, a || Ma(e, !0);
  }
  function v0(e) {
    for (Ne = e.return; Ne; )
      switch (Ne.tag) {
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
          Ne = Ne.return;
      }
  }
  function os(e) {
    if (e !== Ne) return !1;
    if (!kt) return v0(e), kt = !0, !1;
    var a = e.tag, s;
    if ((s = a !== 3 && a !== 27) && ((s = a === 5) && (s = e.type, s = !(s !== "form" && s !== "button") || id(e.type, e.memoizedProps)), s = !s), s && ee && Ma(e), v0(e), a === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      ee = Yy(e);
    } else if (a === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(317));
      ee = Yy(e);
    } else
      a === 27 ? (a = ee, qa(e.type) ? (e = cd, cd = null, ee = e) : ee = a) : ee = Ne ? wn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function mi() {
    ee = Ne = null, kt = !1;
  }
  function Uu() {
    var e = Ea;
    return e !== null && (en === null ? en = e : en.push.apply(
      en,
      e
    ), Ea = null), e;
  }
  function dl(e) {
    Ea === null ? Ea = [e] : Ea.push(e);
  }
  var Hu = O(null), pi = null, la = null;
  function _a(e, a, s) {
    Y(Hu, a._currentValue), a._currentValue = s;
  }
  function ra(e) {
    e._currentValue = Hu.current, q(Hu);
  }
  function qu(e, a, s) {
    for (; e !== null; ) {
      var r = e.alternate;
      if ((e.childLanes & a) !== a ? (e.childLanes |= a, r !== null && (r.childLanes |= a)) : r !== null && (r.childLanes & a) !== a && (r.childLanes |= a), e === s) break;
      e = e.return;
    }
  }
  function Yu(e, a, s, r) {
    var f = e.child;
    for (f !== null && (f.return = e); f !== null; ) {
      var m = f.dependencies;
      if (m !== null) {
        var S = f.child;
        m = m.firstContext;
        t: for (; m !== null; ) {
          var E = m;
          m = f;
          for (var k = 0; k < a.length; k++)
            if (E.context === a[k]) {
              m.lanes |= s, E = m.alternate, E !== null && (E.lanes |= s), qu(
                m.return,
                s,
                e
              ), r || (S = null);
              break t;
            }
          m = E.next;
        }
      } else if (f.tag === 18) {
        if (S = f.return, S === null) throw Error(l(341));
        S.lanes |= s, m = S.alternate, m !== null && (m.lanes |= s), qu(S, s, e), S = null;
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
  function cs(e, a, s, r) {
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
          var E = f.type;
          ln(f.pendingProps.value, S.value) || (e !== null ? e.push(E) : e = [E]);
        }
      } else if (f === ft.current) {
        if (S = f.alternate, S === null) throw Error(l(387));
        S.memoizedState.memoizedState !== f.memoizedState.memoizedState && (e !== null ? e.push(zl) : e = [zl]);
      }
      f = f.return;
    }
    e !== null && Yu(
      a,
      e,
      s,
      r
    ), a.flags |= 262144;
  }
  function to(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!ln(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function yi(e) {
    pi = e, la = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Oe(e) {
    return b0(pi, e);
  }
  function eo(e, a) {
    return pi === null && yi(e), b0(e, a);
  }
  function b0(e, a) {
    var s = a._currentValue;
    if (a = { context: a, memoizedValue: s, next: null }, la === null) {
      if (e === null) throw Error(l(308));
      la = a, e.dependencies = { lanes: 0, firstContext: a }, e.flags |= 524288;
    } else la = la.next = a;
    return s;
  }
  var zw = typeof AbortController < "u" ? AbortController : function() {
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
  }, Uw = n.unstable_scheduleCallback, Hw = n.unstable_NormalPriority, ge = {
    $$typeof: M,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Pu() {
    return {
      controller: new zw(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function hl(e) {
    e.refCount--, e.refCount === 0 && Uw(Hw, function() {
      e.controller.abort();
    });
  }
  var ml = null, Gu = 0, us = 0, fs = null;
  function qw(e, a) {
    if (ml === null) {
      var s = ml = [];
      Gu = 0, us = Qf(), fs = {
        status: "pending",
        value: void 0,
        then: function(r) {
          s.push(r);
        }
      };
    }
    return Gu++, a.then(x0, x0), a;
  }
  function x0() {
    if (--Gu === 0 && ml !== null) {
      fs !== null && (fs.status = "fulfilled");
      var e = ml;
      ml = null, us = 0, fs = null;
      for (var a = 0; a < e.length; a++) (0, e[a])();
    }
  }
  function Yw(e, a) {
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
  var S0 = $.S;
  $.S = function(e, a) {
    iy = Be(), typeof a == "object" && a !== null && typeof a.then == "function" && qw(e, a), S0 !== null && S0(e, a);
  };
  var gi = O(null);
  function Xu() {
    var e = gi.current;
    return e !== null ? e : Jt.pooledCache;
  }
  function no(e, a) {
    a === null ? Y(gi, gi.current) : Y(gi, a.pool);
  }
  function w0() {
    var e = Xu();
    return e === null ? null : { parent: ge._currentValue, pool: e };
  }
  var ds = Error(l(460)), Ku = Error(l(474)), ao = Error(l(542)), io = { then: function() {
  } };
  function C0(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function T0(e, a, s) {
    switch (s = e[s], s === void 0 ? e.push(a) : s !== a && (a.then(na, na), a = s), a.status) {
      case "fulfilled":
        return a.value;
      case "rejected":
        throw e = a.reason, A0(e), e;
      default:
        if (typeof a.status == "string") a.then(na, na);
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
            throw e = a.reason, A0(e), e;
        }
        throw bi = a, ds;
    }
  }
  function vi(e) {
    try {
      var a = e._init;
      return a(e._payload);
    } catch (s) {
      throw s !== null && typeof s == "object" && typeof s.then == "function" ? (bi = s, ds) : s;
    }
  }
  var bi = null;
  function j0() {
    if (bi === null) throw Error(l(459));
    var e = bi;
    return bi = null, e;
  }
  function A0(e) {
    if (e === ds || e === ao)
      throw Error(l(483));
  }
  var hs = null, pl = 0;
  function so(e) {
    var a = pl;
    return pl += 1, hs === null && (hs = []), T0(hs, e, a);
  }
  function yl(e, a) {
    a = a.props.ref, e.ref = a !== void 0 ? a : null;
  }
  function lo(e, a) {
    throw a.$$typeof === b ? Error(l(525)) : (e = Object.prototype.toString.call(a), Error(
      l(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : e
      )
    ));
  }
  function E0(e) {
    function a(G, z) {
      if (e) {
        var K = G.deletions;
        K === null ? (G.deletions = [z], G.flags |= 16) : K.push(z);
      }
    }
    function s(G, z) {
      if (!e) return null;
      for (; z !== null; )
        a(G, z), z = z.sibling;
      return null;
    }
    function r(G) {
      for (var z = /* @__PURE__ */ new Map(); G !== null; )
        G.key !== null ? z.set(G.key, G) : z.set(G.index, G), G = G.sibling;
      return z;
    }
    function f(G, z) {
      return G = ia(G, z), G.index = 0, G.sibling = null, G;
    }
    function m(G, z, K) {
      return G.index = K, e ? (K = G.alternate, K !== null ? (K = K.index, K < z ? (G.flags |= 67108866, z) : K) : (G.flags |= 67108866, z)) : (G.flags |= 1048576, z);
    }
    function S(G) {
      return e && G.alternate === null && (G.flags |= 67108866), G;
    }
    function E(G, z, K, lt) {
      return z === null || z.tag !== 6 ? (z = $u(K, G.mode, lt), z.return = G, z) : (z = f(z, K), z.return = G, z);
    }
    function k(G, z, K, lt) {
      var wt = K.type;
      return wt === C ? st(
        G,
        z,
        K.props.children,
        lt,
        K.key
      ) : z !== null && (z.elementType === wt || typeof wt == "object" && wt !== null && wt.$$typeof === V && vi(wt) === z.type) ? (z = f(z, K.props), yl(z, K), z.return = G, z) : (z = Jr(
        K.type,
        K.key,
        K.props,
        null,
        G.mode,
        lt
      ), yl(z, K), z.return = G, z);
    }
    function Z(G, z, K, lt) {
      return z === null || z.tag !== 4 || z.stateNode.containerInfo !== K.containerInfo || z.stateNode.implementation !== K.implementation ? (z = ku(K, G.mode, lt), z.return = G, z) : (z = f(z, K.children || []), z.return = G, z);
    }
    function st(G, z, K, lt, wt) {
      return z === null || z.tag !== 7 ? (z = hi(
        K,
        G.mode,
        lt,
        wt
      ), z.return = G, z) : (z = f(z, K), z.return = G, z);
    }
    function rt(G, z, K) {
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return z = $u(
          "" + z,
          G.mode,
          K
        ), z.return = G, z;
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case j:
            return K = Jr(
              z.type,
              z.key,
              z.props,
              null,
              G.mode,
              K
            ), yl(K, z), K.return = G, K;
          case w:
            return z = ku(
              z,
              G.mode,
              K
            ), z.return = G, z;
          case V:
            return z = vi(z), rt(G, z, K);
        }
        if (J(z) || I(z))
          return z = hi(
            z,
            G.mode,
            K,
            null
          ), z.return = G, z;
        if (typeof z.then == "function")
          return rt(G, so(z), K);
        if (z.$$typeof === M)
          return rt(
            G,
            eo(G, z),
            K
          );
        lo(G, z);
      }
      return null;
    }
    function Q(G, z, K, lt) {
      var wt = z !== null ? z.key : null;
      if (typeof K == "string" && K !== "" || typeof K == "number" || typeof K == "bigint")
        return wt !== null ? null : E(G, z, "" + K, lt);
      if (typeof K == "object" && K !== null) {
        switch (K.$$typeof) {
          case j:
            return K.key === wt ? k(G, z, K, lt) : null;
          case w:
            return K.key === wt ? Z(G, z, K, lt) : null;
          case V:
            return K = vi(K), Q(G, z, K, lt);
        }
        if (J(K) || I(K))
          return wt !== null ? null : st(G, z, K, lt, null);
        if (typeof K.then == "function")
          return Q(
            G,
            z,
            so(K),
            lt
          );
        if (K.$$typeof === M)
          return Q(
            G,
            z,
            eo(G, K),
            lt
          );
        lo(G, K);
      }
      return null;
    }
    function W(G, z, K, lt, wt) {
      if (typeof lt == "string" && lt !== "" || typeof lt == "number" || typeof lt == "bigint")
        return G = G.get(K) || null, E(z, G, "" + lt, wt);
      if (typeof lt == "object" && lt !== null) {
        switch (lt.$$typeof) {
          case j:
            return G = G.get(
              lt.key === null ? K : lt.key
            ) || null, k(z, G, lt, wt);
          case w:
            return G = G.get(
              lt.key === null ? K : lt.key
            ) || null, Z(z, G, lt, wt);
          case V:
            return lt = vi(lt), W(
              G,
              z,
              K,
              lt,
              wt
            );
        }
        if (J(lt) || I(lt))
          return G = G.get(K) || null, st(z, G, lt, wt, null);
        if (typeof lt.then == "function")
          return W(
            G,
            z,
            K,
            so(lt),
            wt
          );
        if (lt.$$typeof === M)
          return W(
            G,
            z,
            K,
            eo(z, lt),
            wt
          );
        lo(z, lt);
      }
      return null;
    }
    function vt(G, z, K, lt) {
      for (var wt = null, Ut = null, St = z, Rt = z = 0, Lt = null; St !== null && Rt < K.length; Rt++) {
        St.index > Rt ? (Lt = St, St = null) : Lt = St.sibling;
        var Ht = Q(
          G,
          St,
          K[Rt],
          lt
        );
        if (Ht === null) {
          St === null && (St = Lt);
          break;
        }
        e && St && Ht.alternate === null && a(G, St), z = m(Ht, z, Rt), Ut === null ? wt = Ht : Ut.sibling = Ht, Ut = Ht, St = Lt;
      }
      if (Rt === K.length)
        return s(G, St), kt && sa(G, Rt), wt;
      if (St === null) {
        for (; Rt < K.length; Rt++)
          St = rt(G, K[Rt], lt), St !== null && (z = m(
            St,
            z,
            Rt
          ), Ut === null ? wt = St : Ut.sibling = St, Ut = St);
        return kt && sa(G, Rt), wt;
      }
      for (St = r(St); Rt < K.length; Rt++)
        Lt = W(
          St,
          G,
          Rt,
          K[Rt],
          lt
        ), Lt !== null && (e && Lt.alternate !== null && St.delete(
          Lt.key === null ? Rt : Lt.key
        ), z = m(
          Lt,
          z,
          Rt
        ), Ut === null ? wt = Lt : Ut.sibling = Lt, Ut = Lt);
      return e && St.forEach(function(Ka) {
        return a(G, Ka);
      }), kt && sa(G, Rt), wt;
    }
    function Ct(G, z, K, lt) {
      if (K == null) throw Error(l(151));
      for (var wt = null, Ut = null, St = z, Rt = z = 0, Lt = null, Ht = K.next(); St !== null && !Ht.done; Rt++, Ht = K.next()) {
        St.index > Rt ? (Lt = St, St = null) : Lt = St.sibling;
        var Ka = Q(G, St, Ht.value, lt);
        if (Ka === null) {
          St === null && (St = Lt);
          break;
        }
        e && St && Ka.alternate === null && a(G, St), z = m(Ka, z, Rt), Ut === null ? wt = Ka : Ut.sibling = Ka, Ut = Ka, St = Lt;
      }
      if (Ht.done)
        return s(G, St), kt && sa(G, Rt), wt;
      if (St === null) {
        for (; !Ht.done; Rt++, Ht = K.next())
          Ht = rt(G, Ht.value, lt), Ht !== null && (z = m(Ht, z, Rt), Ut === null ? wt = Ht : Ut.sibling = Ht, Ut = Ht);
        return kt && sa(G, Rt), wt;
      }
      for (St = r(St); !Ht.done; Rt++, Ht = K.next())
        Ht = W(St, G, Rt, Ht.value, lt), Ht !== null && (e && Ht.alternate !== null && St.delete(Ht.key === null ? Rt : Ht.key), z = m(Ht, z, Rt), Ut === null ? wt = Ht : Ut.sibling = Ht, Ut = Ht);
      return e && St.forEach(function(t5) {
        return a(G, t5);
      }), kt && sa(G, Rt), wt;
    }
    function Zt(G, z, K, lt) {
      if (typeof K == "object" && K !== null && K.type === C && K.key === null && (K = K.props.children), typeof K == "object" && K !== null) {
        switch (K.$$typeof) {
          case j:
            t: {
              for (var wt = K.key; z !== null; ) {
                if (z.key === wt) {
                  if (wt = K.type, wt === C) {
                    if (z.tag === 7) {
                      s(
                        G,
                        z.sibling
                      ), lt = f(
                        z,
                        K.props.children
                      ), lt.return = G, G = lt;
                      break t;
                    }
                  } else if (z.elementType === wt || typeof wt == "object" && wt !== null && wt.$$typeof === V && vi(wt) === z.type) {
                    s(
                      G,
                      z.sibling
                    ), lt = f(z, K.props), yl(lt, K), lt.return = G, G = lt;
                    break t;
                  }
                  s(G, z);
                  break;
                } else a(G, z);
                z = z.sibling;
              }
              K.type === C ? (lt = hi(
                K.props.children,
                G.mode,
                lt,
                K.key
              ), lt.return = G, G = lt) : (lt = Jr(
                K.type,
                K.key,
                K.props,
                null,
                G.mode,
                lt
              ), yl(lt, K), lt.return = G, G = lt);
            }
            return S(G);
          case w:
            t: {
              for (wt = K.key; z !== null; ) {
                if (z.key === wt)
                  if (z.tag === 4 && z.stateNode.containerInfo === K.containerInfo && z.stateNode.implementation === K.implementation) {
                    s(
                      G,
                      z.sibling
                    ), lt = f(z, K.children || []), lt.return = G, G = lt;
                    break t;
                  } else {
                    s(G, z);
                    break;
                  }
                else a(G, z);
                z = z.sibling;
              }
              lt = ku(K, G.mode, lt), lt.return = G, G = lt;
            }
            return S(G);
          case V:
            return K = vi(K), Zt(
              G,
              z,
              K,
              lt
            );
        }
        if (J(K))
          return vt(
            G,
            z,
            K,
            lt
          );
        if (I(K)) {
          if (wt = I(K), typeof wt != "function") throw Error(l(150));
          return K = wt.call(K), Ct(
            G,
            z,
            K,
            lt
          );
        }
        if (typeof K.then == "function")
          return Zt(
            G,
            z,
            so(K),
            lt
          );
        if (K.$$typeof === M)
          return Zt(
            G,
            z,
            eo(G, K),
            lt
          );
        lo(G, K);
      }
      return typeof K == "string" && K !== "" || typeof K == "number" || typeof K == "bigint" ? (K = "" + K, z !== null && z.tag === 6 ? (s(G, z.sibling), lt = f(z, K), lt.return = G, G = lt) : (s(G, z), lt = $u(K, G.mode, lt), lt.return = G, G = lt), S(G)) : s(G, z);
    }
    return function(G, z, K, lt) {
      try {
        pl = 0;
        var wt = Zt(
          G,
          z,
          K,
          lt
        );
        return hs = null, wt;
      } catch (St) {
        if (St === ds || St === ao) throw St;
        var Ut = rn(29, St, null, G.mode);
        return Ut.lanes = lt, Ut.return = G, Ut;
      } finally {
      }
    };
  }
  var xi = E0(!0), M0 = E0(!1), Ra = !1;
  function Zu(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Qu(e, a) {
    e = e.updateQueue, a.updateQueue === e && (a.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Da(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Na(e, a, s) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, (qt & 2) !== 0) {
      var f = r.pending;
      return f === null ? a.next = a : (a.next = f.next, f.next = a), r.pending = a, a = Ir(e), f0(e, null, s), a;
    }
    return Fr(e, r, a, s), Ir(e);
  }
  function gl(e, a, s) {
    if (a = a.updateQueue, a !== null && (a = a.shared, (s & 4194048) !== 0)) {
      var r = a.lanes;
      r &= e.pendingLanes, s |= r, a.lanes = s, Un(e, s);
    }
  }
  function Fu(e, a) {
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
  var Iu = !1;
  function vl() {
    if (Iu) {
      var e = fs;
      if (e !== null) throw e;
    }
  }
  function bl(e, a, s, r) {
    Iu = !1;
    var f = e.updateQueue;
    Ra = !1;
    var m = f.firstBaseUpdate, S = f.lastBaseUpdate, E = f.shared.pending;
    if (E !== null) {
      f.shared.pending = null;
      var k = E, Z = k.next;
      k.next = null, S === null ? m = Z : S.next = Z, S = k;
      var st = e.alternate;
      st !== null && (st = st.updateQueue, E = st.lastBaseUpdate, E !== S && (E === null ? st.firstBaseUpdate = Z : E.next = Z, st.lastBaseUpdate = k));
    }
    if (m !== null) {
      var rt = f.baseState;
      S = 0, st = Z = k = null, E = m;
      do {
        var Q = E.lane & -536870913, W = Q !== E.lane;
        if (W ? (Ot & Q) === Q : (r & Q) === Q) {
          Q !== 0 && Q === us && (Iu = !0), st !== null && (st = st.next = {
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: null,
            next: null
          });
          t: {
            var vt = e, Ct = E;
            Q = a;
            var Zt = s;
            switch (Ct.tag) {
              case 1:
                if (vt = Ct.payload, typeof vt == "function") {
                  rt = vt.call(Zt, rt, Q);
                  break t;
                }
                rt = vt;
                break t;
              case 3:
                vt.flags = vt.flags & -65537 | 128;
              case 0:
                if (vt = Ct.payload, Q = typeof vt == "function" ? vt.call(Zt, rt, Q) : vt, Q == null) break t;
                rt = v({}, rt, Q);
                break t;
              case 2:
                Ra = !0;
            }
          }
          Q = E.callback, Q !== null && (e.flags |= 64, W && (e.flags |= 8192), W = f.callbacks, W === null ? f.callbacks = [Q] : W.push(Q));
        } else
          W = {
            lane: Q,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          }, st === null ? (Z = st = W, k = rt) : st = st.next = W, S |= Q;
        if (E = E.next, E === null) {
          if (E = f.shared.pending, E === null)
            break;
          W = E, E = W.next, W.next = null, f.lastBaseUpdate = W, f.shared.pending = null;
        }
      } while (!0);
      st === null && (k = rt), f.baseState = k, f.firstBaseUpdate = Z, f.lastBaseUpdate = st, m === null && (f.shared.lanes = 0), Ba |= S, e.lanes = S, e.memoizedState = rt;
    }
  }
  function _0(e, a) {
    if (typeof e != "function")
      throw Error(l(191, e));
    e.call(a);
  }
  function R0(e, a) {
    var s = e.callbacks;
    if (s !== null)
      for (e.callbacks = null, e = 0; e < s.length; e++)
        _0(s[e], a);
  }
  var ms = O(null), ro = O(0);
  function D0(e, a) {
    e = ya, Y(ro, e), Y(ms, a), ya = e | a.baseLanes;
  }
  function Ju() {
    Y(ro, ya), Y(ms, ms.current);
  }
  function Wu() {
    ya = ro.current, q(ms), q(ro);
  }
  var on = O(null), Sn = null;
  function Oa(e) {
    var a = e.alternate;
    Y(de, de.current & 1), Y(on, e), Sn === null && (a === null || ms.current !== null || a.memoizedState !== null) && (Sn = e);
  }
  function tf(e) {
    Y(de, de.current), Y(on, e), Sn === null && (Sn = e);
  }
  function N0(e) {
    e.tag === 22 ? (Y(de, de.current), Y(on, e), Sn === null && (Sn = e)) : La();
  }
  function La() {
    Y(de, de.current), Y(on, on.current);
  }
  function cn(e) {
    q(on), Sn === e && (Sn = null), q(de);
  }
  var de = O(0);
  function oo(e) {
    for (var a = e; a !== null; ) {
      if (a.tag === 13) {
        var s = a.memoizedState;
        if (s !== null && (s = s.dehydrated, s === null || rd(s) || od(s)))
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
  var oa = 0, _t = null, Xt = null, ve = null, co = !1, ps = !1, Si = !1, uo = 0, xl = 0, ys = null, Pw = 0;
  function le() {
    throw Error(l(321));
  }
  function ef(e, a) {
    if (a === null) return !1;
    for (var s = 0; s < a.length && s < e.length; s++)
      if (!ln(e[s], a[s])) return !1;
    return !0;
  }
  function nf(e, a, s, r, f, m) {
    return oa = m, _t = a, a.memoizedState = null, a.updateQueue = null, a.lanes = 0, $.H = e === null || e.memoizedState === null ? p1 : vf, Si = !1, m = s(r, f), Si = !1, ps && (m = L0(
      a,
      s,
      r,
      f
    )), O0(e), m;
  }
  function O0(e) {
    $.H = Cl;
    var a = Xt !== null && Xt.next !== null;
    if (oa = 0, ve = Xt = _t = null, co = !1, xl = 0, ys = null, a) throw Error(l(300));
    e === null || be || (e = e.dependencies, e !== null && to(e) && (be = !0));
  }
  function L0(e, a, s, r) {
    _t = e;
    var f = 0;
    do {
      if (ps && (ys = null), xl = 0, ps = !1, 25 <= f) throw Error(l(301));
      if (f += 1, ve = Xt = null, e.updateQueue != null) {
        var m = e.updateQueue;
        m.lastEffect = null, m.events = null, m.stores = null, m.memoCache != null && (m.memoCache.index = 0);
      }
      $.H = y1, m = a(s, r);
    } while (ps);
    return m;
  }
  function Gw() {
    var e = $.H, a = e.useState()[0];
    return a = typeof a.then == "function" ? Sl(a) : a, e = e.useState()[0], (Xt !== null ? Xt.memoizedState : null) !== e && (_t.flags |= 1024), a;
  }
  function af() {
    var e = uo !== 0;
    return uo = 0, e;
  }
  function sf(e, a, s) {
    a.updateQueue = e.updateQueue, a.flags &= -2053, e.lanes &= ~s;
  }
  function lf(e) {
    if (co) {
      for (e = e.memoizedState; e !== null; ) {
        var a = e.queue;
        a !== null && (a.pending = null), e = e.next;
      }
      co = !1;
    }
    oa = 0, ve = Xt = _t = null, ps = !1, xl = uo = 0, ys = null;
  }
  function Pe() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return ve === null ? _t.memoizedState = ve = e : ve = ve.next = e, ve;
  }
  function he() {
    if (Xt === null) {
      var e = _t.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Xt.next;
    var a = ve === null ? _t.memoizedState : ve.next;
    if (a !== null)
      ve = a, Xt = e;
    else {
      if (e === null)
        throw _t.alternate === null ? Error(l(467)) : Error(l(310));
      Xt = e, e = {
        memoizedState: Xt.memoizedState,
        baseState: Xt.baseState,
        baseQueue: Xt.baseQueue,
        queue: Xt.queue,
        next: null
      }, ve === null ? _t.memoizedState = ve = e : ve = ve.next = e;
    }
    return ve;
  }
  function fo() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Sl(e) {
    var a = xl;
    return xl += 1, ys === null && (ys = []), e = T0(ys, e, a), a = _t, (ve === null ? a.memoizedState : ve.next) === null && (a = a.alternate, $.H = a === null || a.memoizedState === null ? p1 : vf), e;
  }
  function ho(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Sl(e);
      if (e.$$typeof === M) return Oe(e);
    }
    throw Error(l(438, String(e)));
  }
  function rf(e) {
    var a = null, s = _t.updateQueue;
    if (s !== null && (a = s.memoCache), a == null) {
      var r = _t.alternate;
      r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (a = {
        data: r.data.map(function(f) {
          return f.slice();
        }),
        index: 0
      })));
    }
    if (a == null && (a = { data: [], index: 0 }), s === null && (s = fo(), _t.updateQueue = s), s.memoCache = a, s = a.data[a.index], s === void 0)
      for (s = a.data[a.index] = Array(e), r = 0; r < e; r++)
        s[r] = B;
    return a.index++, s;
  }
  function ca(e, a) {
    return typeof a == "function" ? a(e) : a;
  }
  function mo(e) {
    var a = he();
    return of(a, Xt, e);
  }
  function of(e, a, s) {
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
      var E = S = null, k = null, Z = a, st = !1;
      do {
        var rt = Z.lane & -536870913;
        if (rt !== Z.lane ? (Ot & rt) === rt : (oa & rt) === rt) {
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
            }), rt === us && (st = !0);
          else if ((oa & Q) === Q) {
            Z = Z.next, Q === us && (st = !0);
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
            }, k === null ? (E = k = rt, S = m) : k = k.next = rt, _t.lanes |= Q, Ba |= Q;
          rt = Z.action, Si && s(m, rt), m = Z.hasEagerState ? Z.eagerState : s(m, rt);
        } else
          Q = {
            lane: rt,
            revertLane: Z.revertLane,
            gesture: Z.gesture,
            action: Z.action,
            hasEagerState: Z.hasEagerState,
            eagerState: Z.eagerState,
            next: null
          }, k === null ? (E = k = Q, S = m) : k = k.next = Q, _t.lanes |= rt, Ba |= rt;
        Z = Z.next;
      } while (Z !== null && Z !== a);
      if (k === null ? S = m : k.next = E, !ln(m, e.memoizedState) && (be = !0, st && (s = fs, s !== null)))
        throw s;
      e.memoizedState = m, e.baseState = S, e.baseQueue = k, r.lastRenderedState = m;
    }
    return f === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
  }
  function cf(e) {
    var a = he(), s = a.queue;
    if (s === null) throw Error(l(311));
    s.lastRenderedReducer = e;
    var r = s.dispatch, f = s.pending, m = a.memoizedState;
    if (f !== null) {
      s.pending = null;
      var S = f = f.next;
      do
        m = e(m, S.action), S = S.next;
      while (S !== f);
      ln(m, a.memoizedState) || (be = !0), a.memoizedState = m, a.baseQueue === null && (a.baseState = m), s.lastRenderedState = m;
    }
    return [m, r];
  }
  function $0(e, a, s) {
    var r = _t, f = he(), m = kt;
    if (m) {
      if (s === void 0) throw Error(l(407));
      s = s();
    } else s = a();
    var S = !ln(
      (Xt || f).memoizedState,
      s
    );
    if (S && (f.memoizedState = s, be = !0), f = f.queue, df(V0.bind(null, r, f, e), [
      e
    ]), f.getSnapshot !== a || S || ve !== null && ve.memoizedState.tag & 1) {
      if (r.flags |= 2048, gs(
        9,
        { destroy: void 0 },
        B0.bind(
          null,
          r,
          f,
          s,
          a
        ),
        null
      ), Jt === null) throw Error(l(349));
      m || (oa & 127) !== 0 || k0(r, a, s);
    }
    return s;
  }
  function k0(e, a, s) {
    e.flags |= 16384, e = { getSnapshot: a, value: s }, a = _t.updateQueue, a === null ? (a = fo(), _t.updateQueue = a, a.stores = [e]) : (s = a.stores, s === null ? a.stores = [e] : s.push(e));
  }
  function B0(e, a, s, r) {
    a.value = s, a.getSnapshot = r, z0(a) && U0(e);
  }
  function V0(e, a, s) {
    return s(function() {
      z0(a) && U0(e);
    });
  }
  function z0(e) {
    var a = e.getSnapshot;
    e = e.value;
    try {
      var s = a();
      return !ln(e, s);
    } catch {
      return !0;
    }
  }
  function U0(e) {
    var a = di(e, 2);
    a !== null && nn(a, e, 2);
  }
  function uf(e) {
    var a = Pe();
    if (typeof e == "function") {
      var s = e;
      if (e = s(), Si) {
        En(!0);
        try {
          s();
        } finally {
          En(!1);
        }
      }
    }
    return a.memoizedState = a.baseState = e, a.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ca,
      lastRenderedState: e
    }, a;
  }
  function H0(e, a, s, r) {
    return e.baseState = s, of(
      e,
      Xt,
      typeof r == "function" ? r : ca
    );
  }
  function Xw(e, a, s, r, f) {
    if (go(e)) throw Error(l(485));
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
      $.T !== null ? s(!0) : m.isTransition = !1, r(m), s = a.pending, s === null ? (m.next = a.pending = m, q0(a, m)) : (m.next = s.next, a.pending = s.next = m);
    }
  }
  function q0(e, a) {
    var s = a.action, r = a.payload, f = e.state;
    if (a.isTransition) {
      var m = $.T, S = {};
      $.T = S;
      try {
        var E = s(f, r), k = $.S;
        k !== null && k(S, E), Y0(e, a, E);
      } catch (Z) {
        ff(e, a, Z);
      } finally {
        m !== null && S.types !== null && (m.types = S.types), $.T = m;
      }
    } else
      try {
        m = s(f, r), Y0(e, a, m);
      } catch (Z) {
        ff(e, a, Z);
      }
  }
  function Y0(e, a, s) {
    s !== null && typeof s == "object" && typeof s.then == "function" ? s.then(
      function(r) {
        P0(e, a, r);
      },
      function(r) {
        return ff(e, a, r);
      }
    ) : P0(e, a, s);
  }
  function P0(e, a, s) {
    a.status = "fulfilled", a.value = s, G0(a), e.state = s, a = e.pending, a !== null && (s = a.next, s === a ? e.pending = null : (s = s.next, a.next = s, q0(e, s)));
  }
  function ff(e, a, s) {
    var r = e.pending;
    if (e.pending = null, r !== null) {
      r = r.next;
      do
        a.status = "rejected", a.reason = s, G0(a), a = a.next;
      while (a !== r);
    }
    e.action = null;
  }
  function G0(e) {
    e = e.listeners;
    for (var a = 0; a < e.length; a++) (0, e[a])();
  }
  function X0(e, a) {
    return a;
  }
  function K0(e, a) {
    if (kt) {
      var s = Jt.formState;
      if (s !== null) {
        t: {
          var r = _t;
          if (kt) {
            if (ee) {
              e: {
                for (var f = ee, m = xn; f.nodeType !== 8; ) {
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
                ee = wn(
                  f.nextSibling
                ), r = f.data === "F!";
                break t;
              }
            }
            Ma(r);
          }
          r = !1;
        }
        r && (a = s[0]);
      }
    }
    return s = Pe(), s.memoizedState = s.baseState = a, r = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: X0,
      lastRenderedState: a
    }, s.queue = r, s = d1.bind(
      null,
      _t,
      r
    ), r.dispatch = s, r = uf(!1), m = gf.bind(
      null,
      _t,
      !1,
      r.queue
    ), r = Pe(), f = {
      state: a,
      dispatch: null,
      action: e,
      pending: null
    }, r.queue = f, s = Xw.bind(
      null,
      _t,
      f,
      m,
      s
    ), f.dispatch = s, r.memoizedState = e, [a, s, !1];
  }
  function Z0(e) {
    var a = he();
    return Q0(a, Xt, e);
  }
  function Q0(e, a, s) {
    if (a = of(
      e,
      a,
      X0
    )[0], e = mo(ca)[0], typeof a == "object" && a !== null && typeof a.then == "function")
      try {
        var r = Sl(a);
      } catch (S) {
        throw S === ds ? ao : S;
      }
    else r = a;
    a = he();
    var f = a.queue, m = f.dispatch;
    return s !== a.memoizedState && (_t.flags |= 2048, gs(
      9,
      { destroy: void 0 },
      Kw.bind(null, f, s),
      null
    )), [r, m, e];
  }
  function Kw(e, a) {
    e.action = a;
  }
  function F0(e) {
    var a = he(), s = Xt;
    if (s !== null)
      return Q0(a, s, e);
    he(), a = a.memoizedState, s = he();
    var r = s.queue.dispatch;
    return s.memoizedState = e, [a, r, !1];
  }
  function gs(e, a, s, r) {
    return e = { tag: e, create: s, deps: r, inst: a, next: null }, a = _t.updateQueue, a === null && (a = fo(), _t.updateQueue = a), s = a.lastEffect, s === null ? a.lastEffect = e.next = e : (r = s.next, s.next = e, e.next = r, a.lastEffect = e), e;
  }
  function I0() {
    return he().memoizedState;
  }
  function po(e, a, s, r) {
    var f = Pe();
    _t.flags |= e, f.memoizedState = gs(
      1 | a,
      { destroy: void 0 },
      s,
      r === void 0 ? null : r
    );
  }
  function yo(e, a, s, r) {
    var f = he();
    r = r === void 0 ? null : r;
    var m = f.memoizedState.inst;
    Xt !== null && r !== null && ef(r, Xt.memoizedState.deps) ? f.memoizedState = gs(a, m, s, r) : (_t.flags |= e, f.memoizedState = gs(
      1 | a,
      m,
      s,
      r
    ));
  }
  function J0(e, a) {
    po(8390656, 8, e, a);
  }
  function df(e, a) {
    yo(2048, 8, e, a);
  }
  function Zw(e) {
    _t.flags |= 4;
    var a = _t.updateQueue;
    if (a === null)
      a = fo(), _t.updateQueue = a, a.events = [e];
    else {
      var s = a.events;
      s === null ? a.events = [e] : s.push(e);
    }
  }
  function W0(e) {
    var a = he().memoizedState;
    return Zw({ ref: a, nextImpl: e }), function() {
      if ((qt & 2) !== 0) throw Error(l(440));
      return a.impl.apply(void 0, arguments);
    };
  }
  function t1(e, a) {
    return yo(4, 2, e, a);
  }
  function e1(e, a) {
    return yo(4, 4, e, a);
  }
  function n1(e, a) {
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
  function a1(e, a, s) {
    s = s != null ? s.concat([e]) : null, yo(4, 4, n1.bind(null, a, e), s);
  }
  function hf() {
  }
  function i1(e, a) {
    var s = he();
    a = a === void 0 ? null : a;
    var r = s.memoizedState;
    return a !== null && ef(a, r[1]) ? r[0] : (s.memoizedState = [e, a], e);
  }
  function s1(e, a) {
    var s = he();
    a = a === void 0 ? null : a;
    var r = s.memoizedState;
    if (a !== null && ef(a, r[1]))
      return r[0];
    if (r = e(), Si) {
      En(!0);
      try {
        e();
      } finally {
        En(!1);
      }
    }
    return s.memoizedState = [r, a], r;
  }
  function mf(e, a, s) {
    return s === void 0 || (oa & 1073741824) !== 0 && (Ot & 261930) === 0 ? e.memoizedState = a : (e.memoizedState = s, e = ly(), _t.lanes |= e, Ba |= e, s);
  }
  function l1(e, a, s, r) {
    return ln(s, a) ? s : ms.current !== null ? (e = mf(e, s, r), ln(e, a) || (be = !0), e) : (oa & 42) === 0 || (oa & 1073741824) !== 0 && (Ot & 261930) === 0 ? (be = !0, e.memoizedState = s) : (e = ly(), _t.lanes |= e, Ba |= e, a);
  }
  function r1(e, a, s, r, f) {
    var m = X.p;
    X.p = m !== 0 && 8 > m ? m : 8;
    var S = $.T, E = {};
    $.T = E, gf(e, !1, a, s);
    try {
      var k = f(), Z = $.S;
      if (Z !== null && Z(E, k), k !== null && typeof k == "object" && typeof k.then == "function") {
        var st = Yw(
          k,
          r
        );
        wl(
          e,
          a,
          st,
          dn(e)
        );
      } else
        wl(
          e,
          a,
          r,
          dn(e)
        );
    } catch (rt) {
      wl(
        e,
        a,
        { then: function() {
        }, status: "rejected", reason: rt },
        dn()
      );
    } finally {
      X.p = m, S !== null && E.types !== null && (S.types = E.types), $.T = S;
    }
  }
  function Qw() {
  }
  function pf(e, a, s, r) {
    if (e.tag !== 5) throw Error(l(476));
    var f = o1(e).queue;
    r1(
      e,
      f,
      a,
      F,
      s === null ? Qw : function() {
        return c1(e), s(r);
      }
    );
  }
  function o1(e) {
    var a = e.memoizedState;
    if (a !== null) return a;
    a = {
      memoizedState: F,
      baseState: F,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ca,
        lastRenderedState: F
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
        lastRenderedReducer: ca,
        lastRenderedState: s
      },
      next: null
    }, e.memoizedState = a, e = e.alternate, e !== null && (e.memoizedState = a), a;
  }
  function c1(e) {
    var a = o1(e);
    a.next === null && (a = e.alternate.memoizedState), wl(
      e,
      a.next.queue,
      {},
      dn()
    );
  }
  function yf() {
    return Oe(zl);
  }
  function u1() {
    return he().memoizedState;
  }
  function f1() {
    return he().memoizedState;
  }
  function Fw(e) {
    for (var a = e.return; a !== null; ) {
      switch (a.tag) {
        case 24:
        case 3:
          var s = dn();
          e = Da(s);
          var r = Na(a, e, s);
          r !== null && (nn(r, a, s), gl(r, a, s)), a = { cache: Pu() }, e.payload = a;
          return;
      }
      a = a.return;
    }
  }
  function Iw(e, a, s) {
    var r = dn();
    s = {
      lane: r,
      revertLane: 0,
      gesture: null,
      action: s,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, go(e) ? h1(a, s) : (s = Ou(e, a, s, r), s !== null && (nn(s, e, r), m1(s, a, r)));
  }
  function d1(e, a, s) {
    var r = dn();
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
    if (go(e)) h1(a, f);
    else {
      var m = e.alternate;
      if (e.lanes === 0 && (m === null || m.lanes === 0) && (m = a.lastRenderedReducer, m !== null))
        try {
          var S = a.lastRenderedState, E = m(S, s);
          if (f.hasEagerState = !0, f.eagerState = E, ln(E, S))
            return Fr(e, a, f, 0), Jt === null && Qr(), !1;
        } catch {
        } finally {
        }
      if (s = Ou(e, a, f, r), s !== null)
        return nn(s, e, r), m1(s, a, r), !0;
    }
    return !1;
  }
  function gf(e, a, s, r) {
    if (r = {
      lane: 2,
      revertLane: Qf(),
      gesture: null,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, go(e)) {
      if (a) throw Error(l(479));
    } else
      a = Ou(
        e,
        s,
        r,
        2
      ), a !== null && nn(a, e, 2);
  }
  function go(e) {
    var a = e.alternate;
    return e === _t || a !== null && a === _t;
  }
  function h1(e, a) {
    ps = co = !0;
    var s = e.pending;
    s === null ? a.next = a : (a.next = s.next, s.next = a), e.pending = a;
  }
  function m1(e, a, s) {
    if ((s & 4194048) !== 0) {
      var r = a.lanes;
      r &= e.pendingLanes, s |= r, a.lanes = s, Un(e, s);
    }
  }
  var Cl = {
    readContext: Oe,
    use: ho,
    useCallback: le,
    useContext: le,
    useEffect: le,
    useImperativeHandle: le,
    useLayoutEffect: le,
    useInsertionEffect: le,
    useMemo: le,
    useReducer: le,
    useRef: le,
    useState: le,
    useDebugValue: le,
    useDeferredValue: le,
    useTransition: le,
    useSyncExternalStore: le,
    useId: le,
    useHostTransitionStatus: le,
    useFormState: le,
    useActionState: le,
    useOptimistic: le,
    useMemoCache: le,
    useCacheRefresh: le
  };
  Cl.useEffectEvent = le;
  var p1 = {
    readContext: Oe,
    use: ho,
    useCallback: function(e, a) {
      return Pe().memoizedState = [
        e,
        a === void 0 ? null : a
      ], e;
    },
    useContext: Oe,
    useEffect: J0,
    useImperativeHandle: function(e, a, s) {
      s = s != null ? s.concat([e]) : null, po(
        4194308,
        4,
        n1.bind(null, a, e),
        s
      );
    },
    useLayoutEffect: function(e, a) {
      return po(4194308, 4, e, a);
    },
    useInsertionEffect: function(e, a) {
      po(4, 2, e, a);
    },
    useMemo: function(e, a) {
      var s = Pe();
      a = a === void 0 ? null : a;
      var r = e();
      if (Si) {
        En(!0);
        try {
          e();
        } finally {
          En(!1);
        }
      }
      return s.memoizedState = [r, a], r;
    },
    useReducer: function(e, a, s) {
      var r = Pe();
      if (s !== void 0) {
        var f = s(a);
        if (Si) {
          En(!0);
          try {
            s(a);
          } finally {
            En(!1);
          }
        }
      } else f = a;
      return r.memoizedState = r.baseState = f, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: f
      }, r.queue = e, e = e.dispatch = Iw.bind(
        null,
        _t,
        e
      ), [r.memoizedState, e];
    },
    useRef: function(e) {
      var a = Pe();
      return e = { current: e }, a.memoizedState = e;
    },
    useState: function(e) {
      e = uf(e);
      var a = e.queue, s = d1.bind(null, _t, a);
      return a.dispatch = s, [e.memoizedState, s];
    },
    useDebugValue: hf,
    useDeferredValue: function(e, a) {
      var s = Pe();
      return mf(s, e, a);
    },
    useTransition: function() {
      var e = uf(!1);
      return e = r1.bind(
        null,
        _t,
        e.queue,
        !0,
        !1
      ), Pe().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, a, s) {
      var r = _t, f = Pe();
      if (kt) {
        if (s === void 0)
          throw Error(l(407));
        s = s();
      } else {
        if (s = a(), Jt === null)
          throw Error(l(349));
        (Ot & 127) !== 0 || k0(r, a, s);
      }
      f.memoizedState = s;
      var m = { value: s, getSnapshot: a };
      return f.queue = m, J0(V0.bind(null, r, m, e), [
        e
      ]), r.flags |= 2048, gs(
        9,
        { destroy: void 0 },
        B0.bind(
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
      var e = Pe(), a = Jt.identifierPrefix;
      if (kt) {
        var s = qn, r = Hn;
        s = (r & ~(1 << 32 - Ye(r) - 1)).toString(32) + s, a = "_" + a + "R_" + s, s = uo++, 0 < s && (a += "H" + s.toString(32)), a += "_";
      } else
        s = Pw++, a = "_" + a + "r_" + s.toString(32) + "_";
      return e.memoizedState = a;
    },
    useHostTransitionStatus: yf,
    useFormState: K0,
    useActionState: K0,
    useOptimistic: function(e) {
      var a = Pe();
      a.memoizedState = a.baseState = e;
      var s = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return a.queue = s, a = gf.bind(
        null,
        _t,
        !0,
        s
      ), s.dispatch = a, [e, a];
    },
    useMemoCache: rf,
    useCacheRefresh: function() {
      return Pe().memoizedState = Fw.bind(
        null,
        _t
      );
    },
    useEffectEvent: function(e) {
      var a = Pe(), s = { impl: e };
      return a.memoizedState = s, function() {
        if ((qt & 2) !== 0)
          throw Error(l(440));
        return s.impl.apply(void 0, arguments);
      };
    }
  }, vf = {
    readContext: Oe,
    use: ho,
    useCallback: i1,
    useContext: Oe,
    useEffect: df,
    useImperativeHandle: a1,
    useInsertionEffect: t1,
    useLayoutEffect: e1,
    useMemo: s1,
    useReducer: mo,
    useRef: I0,
    useState: function() {
      return mo(ca);
    },
    useDebugValue: hf,
    useDeferredValue: function(e, a) {
      var s = he();
      return l1(
        s,
        Xt.memoizedState,
        e,
        a
      );
    },
    useTransition: function() {
      var e = mo(ca)[0], a = he().memoizedState;
      return [
        typeof e == "boolean" ? e : Sl(e),
        a
      ];
    },
    useSyncExternalStore: $0,
    useId: u1,
    useHostTransitionStatus: yf,
    useFormState: Z0,
    useActionState: Z0,
    useOptimistic: function(e, a) {
      var s = he();
      return H0(s, Xt, e, a);
    },
    useMemoCache: rf,
    useCacheRefresh: f1
  };
  vf.useEffectEvent = W0;
  var y1 = {
    readContext: Oe,
    use: ho,
    useCallback: i1,
    useContext: Oe,
    useEffect: df,
    useImperativeHandle: a1,
    useInsertionEffect: t1,
    useLayoutEffect: e1,
    useMemo: s1,
    useReducer: cf,
    useRef: I0,
    useState: function() {
      return cf(ca);
    },
    useDebugValue: hf,
    useDeferredValue: function(e, a) {
      var s = he();
      return Xt === null ? mf(s, e, a) : l1(
        s,
        Xt.memoizedState,
        e,
        a
      );
    },
    useTransition: function() {
      var e = cf(ca)[0], a = he().memoizedState;
      return [
        typeof e == "boolean" ? e : Sl(e),
        a
      ];
    },
    useSyncExternalStore: $0,
    useId: u1,
    useHostTransitionStatus: yf,
    useFormState: F0,
    useActionState: F0,
    useOptimistic: function(e, a) {
      var s = he();
      return Xt !== null ? H0(s, Xt, e, a) : (s.baseState = e, [e, s.queue.dispatch]);
    },
    useMemoCache: rf,
    useCacheRefresh: f1
  };
  y1.useEffectEvent = W0;
  function bf(e, a, s, r) {
    a = e.memoizedState, s = s(r, a), s = s == null ? a : v({}, a, s), e.memoizedState = s, e.lanes === 0 && (e.updateQueue.baseState = s);
  }
  var xf = {
    enqueueSetState: function(e, a, s) {
      e = e._reactInternals;
      var r = dn(), f = Da(r);
      f.payload = a, s != null && (f.callback = s), a = Na(e, f, r), a !== null && (nn(a, e, r), gl(a, e, r));
    },
    enqueueReplaceState: function(e, a, s) {
      e = e._reactInternals;
      var r = dn(), f = Da(r);
      f.tag = 1, f.payload = a, s != null && (f.callback = s), a = Na(e, f, r), a !== null && (nn(a, e, r), gl(a, e, r));
    },
    enqueueForceUpdate: function(e, a) {
      e = e._reactInternals;
      var s = dn(), r = Da(s);
      r.tag = 2, a != null && (r.callback = a), a = Na(e, r, s), a !== null && (nn(a, e, s), gl(a, e, s));
    }
  };
  function g1(e, a, s, r, f, m, S) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, m, S) : a.prototype && a.prototype.isPureReactComponent ? !cl(s, r) || !cl(f, m) : !0;
  }
  function v1(e, a, s, r) {
    e = a.state, typeof a.componentWillReceiveProps == "function" && a.componentWillReceiveProps(s, r), typeof a.UNSAFE_componentWillReceiveProps == "function" && a.UNSAFE_componentWillReceiveProps(s, r), a.state !== e && xf.enqueueReplaceState(a, a.state, null);
  }
  function wi(e, a) {
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
  function b1(e) {
    Zr(e);
  }
  function x1(e) {
    console.error(e);
  }
  function S1(e) {
    Zr(e);
  }
  function vo(e, a) {
    try {
      var s = e.onUncaughtError;
      s(a.value, { componentStack: a.stack });
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  function w1(e, a, s) {
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
  function Sf(e, a, s) {
    return s = Da(s), s.tag = 3, s.payload = { element: null }, s.callback = function() {
      vo(e, a);
    }, s;
  }
  function C1(e) {
    return e = Da(e), e.tag = 3, e;
  }
  function T1(e, a, s, r) {
    var f = s.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var m = r.value;
      e.payload = function() {
        return f(m);
      }, e.callback = function() {
        w1(a, s, r);
      };
    }
    var S = s.stateNode;
    S !== null && typeof S.componentDidCatch == "function" && (e.callback = function() {
      w1(a, s, r), typeof f != "function" && (Va === null ? Va = /* @__PURE__ */ new Set([this]) : Va.add(this));
      var E = r.stack;
      this.componentDidCatch(r.value, {
        componentStack: E !== null ? E : ""
      });
    });
  }
  function Jw(e, a, s, r, f) {
    if (s.flags |= 32768, r !== null && typeof r == "object" && typeof r.then == "function") {
      if (a = s.alternate, a !== null && cs(
        a,
        s,
        f,
        !0
      ), s = on.current, s !== null) {
        switch (s.tag) {
          case 31:
          case 13:
            return Sn === null ? Ro() : s.alternate === null && re === 0 && (re = 3), s.flags &= -257, s.flags |= 65536, s.lanes = f, r === io ? s.flags |= 16384 : (a = s.updateQueue, a === null ? s.updateQueue = /* @__PURE__ */ new Set([r]) : a.add(r), Xf(e, r, f)), !1;
          case 22:
            return s.flags |= 65536, r === io ? s.flags |= 16384 : (a = s.updateQueue, a === null ? (a = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([r])
            }, s.updateQueue = a) : (s = a.retryQueue, s === null ? a.retryQueue = /* @__PURE__ */ new Set([r]) : s.add(r)), Xf(e, r, f)), !1;
        }
        throw Error(l(435, s.tag));
      }
      return Xf(e, r, f), Ro(), !1;
    }
    if (kt)
      return a = on.current, a !== null ? ((a.flags & 65536) === 0 && (a.flags |= 256), a.flags |= 65536, a.lanes = f, r !== zu && (e = Error(l(422), { cause: r }), dl(gn(e, s)))) : (r !== zu && (a = Error(l(423), {
        cause: r
      }), dl(
        gn(a, s)
      )), e = e.current.alternate, e.flags |= 65536, f &= -f, e.lanes |= f, r = gn(r, s), f = Sf(
        e.stateNode,
        r,
        f
      ), Fu(e, f), re !== 4 && (re = 2)), !1;
    var m = Error(l(520), { cause: r });
    if (m = gn(m, s), Dl === null ? Dl = [m] : Dl.push(m), re !== 4 && (re = 2), a === null) return !0;
    r = gn(r, s), s = a;
    do {
      switch (s.tag) {
        case 3:
          return s.flags |= 65536, e = f & -f, s.lanes |= e, e = Sf(s.stateNode, r, e), Fu(s, e), !1;
        case 1:
          if (a = s.type, m = s.stateNode, (s.flags & 128) === 0 && (typeof a.getDerivedStateFromError == "function" || m !== null && typeof m.componentDidCatch == "function" && (Va === null || !Va.has(m))))
            return s.flags |= 65536, f &= -f, s.lanes |= f, f = C1(f), T1(
              f,
              e,
              s,
              r
            ), Fu(s, f), !1;
      }
      s = s.return;
    } while (s !== null);
    return !1;
  }
  var wf = Error(l(461)), be = !1;
  function Le(e, a, s, r) {
    a.child = e === null ? M0(a, null, s, r) : xi(
      a,
      e.child,
      s,
      r
    );
  }
  function j1(e, a, s, r, f) {
    s = s.render;
    var m = a.ref;
    if ("ref" in r) {
      var S = {};
      for (var E in r)
        E !== "ref" && (S[E] = r[E]);
    } else S = r;
    return yi(a), r = nf(
      e,
      a,
      s,
      S,
      m,
      f
    ), E = af(), e !== null && !be ? (sf(e, a, f), ua(e, a, f)) : (kt && E && Bu(a), a.flags |= 1, Le(e, a, r, f), a.child);
  }
  function A1(e, a, s, r, f) {
    if (e === null) {
      var m = s.type;
      return typeof m == "function" && !Lu(m) && m.defaultProps === void 0 && s.compare === null ? (a.tag = 15, a.type = m, E1(
        e,
        a,
        m,
        r,
        f
      )) : (e = Jr(
        s.type,
        null,
        r,
        a,
        a.mode,
        f
      ), e.ref = a.ref, e.return = a, a.child = e);
    }
    if (m = e.child, !Rf(e, f)) {
      var S = m.memoizedProps;
      if (s = s.compare, s = s !== null ? s : cl, s(S, r) && e.ref === a.ref)
        return ua(e, a, f);
    }
    return a.flags |= 1, e = ia(m, r), e.ref = a.ref, e.return = a, a.child = e;
  }
  function E1(e, a, s, r, f) {
    if (e !== null) {
      var m = e.memoizedProps;
      if (cl(m, r) && e.ref === a.ref)
        if (be = !1, a.pendingProps = r = m, Rf(e, f))
          (e.flags & 131072) !== 0 && (be = !0);
        else
          return a.lanes = e.lanes, ua(e, a, f);
    }
    return Cf(
      e,
      a,
      s,
      r,
      f
    );
  }
  function M1(e, a, s, r) {
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
        return _1(
          e,
          a,
          m,
          s,
          r
        );
      }
      if ((s & 536870912) !== 0)
        a.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && no(
          a,
          m !== null ? m.cachePool : null
        ), m !== null ? D0(a, m) : Ju(), N0(a);
      else
        return r = a.lanes = 536870912, _1(
          e,
          a,
          m !== null ? m.baseLanes | s : s,
          s,
          r
        );
    } else
      m !== null ? (no(a, m.cachePool), D0(a, m), La(), a.memoizedState = null) : (e !== null && no(a, null), Ju(), La());
    return Le(e, a, f, s), a.child;
  }
  function Tl(e, a) {
    return e !== null && e.tag === 22 || a.stateNode !== null || (a.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), a.sibling;
  }
  function _1(e, a, s, r, f) {
    var m = Xu();
    return m = m === null ? null : { parent: ge._currentValue, pool: m }, a.memoizedState = {
      baseLanes: s,
      cachePool: m
    }, e !== null && no(a, null), Ju(), N0(a), e !== null && cs(e, a, r, !0), a.childLanes = f, null;
  }
  function bo(e, a) {
    return a = So(
      { mode: a.mode, children: a.children },
      e.mode
    ), a.ref = e.ref, e.child = a, a.return = e, a;
  }
  function R1(e, a, s) {
    return xi(a, e.child, null, s), e = bo(a, a.pendingProps), e.flags |= 2, cn(a), a.memoizedState = null, e;
  }
  function Ww(e, a, s) {
    var r = a.pendingProps, f = (a.flags & 128) !== 0;
    if (a.flags &= -129, e === null) {
      if (kt) {
        if (r.mode === "hidden")
          return e = bo(a, r), a.lanes = 536870912, Tl(null, e);
        if (tf(a), (e = ee) ? (e = qy(
          e,
          xn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (a.memoizedState = {
          dehydrated: e,
          treeContext: Aa !== null ? { id: Hn, overflow: qn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, s = h0(e), s.return = a, a.child = s, Ne = a, ee = null)) : e = null, e === null) throw Ma(a);
        return a.lanes = 536870912, null;
      }
      return bo(a, r);
    }
    var m = e.memoizedState;
    if (m !== null) {
      var S = m.dehydrated;
      if (tf(a), f)
        if (a.flags & 256)
          a.flags &= -257, a = R1(
            e,
            a,
            s
          );
        else if (a.memoizedState !== null)
          a.child = e.child, a.flags |= 128, a = null;
        else throw Error(l(558));
      else if (be || cs(e, a, s, !1), f = (s & e.childLanes) !== 0, be || f) {
        if (r = Jt, r !== null && (S = De(r, s), S !== 0 && S !== m.retryLane))
          throw m.retryLane = S, di(e, S), nn(r, e, S), wf;
        Ro(), a = R1(
          e,
          a,
          s
        );
      } else
        e = m.treeContext, ee = wn(S.nextSibling), Ne = a, kt = !0, Ea = null, xn = !1, e !== null && y0(a, e), a = bo(a, r), a.flags |= 4096;
      return a;
    }
    return e = ia(e.child, {
      mode: r.mode,
      children: r.children
    }), e.ref = a.ref, a.child = e, e.return = a, e;
  }
  function xo(e, a) {
    var s = a.ref;
    if (s === null)
      e !== null && e.ref !== null && (a.flags |= 4194816);
    else {
      if (typeof s != "function" && typeof s != "object")
        throw Error(l(284));
      (e === null || e.ref !== s) && (a.flags |= 4194816);
    }
  }
  function Cf(e, a, s, r, f) {
    return yi(a), s = nf(
      e,
      a,
      s,
      r,
      void 0,
      f
    ), r = af(), e !== null && !be ? (sf(e, a, f), ua(e, a, f)) : (kt && r && Bu(a), a.flags |= 1, Le(e, a, s, f), a.child);
  }
  function D1(e, a, s, r, f, m) {
    return yi(a), a.updateQueue = null, s = L0(
      a,
      r,
      s,
      f
    ), O0(e), r = af(), e !== null && !be ? (sf(e, a, m), ua(e, a, m)) : (kt && r && Bu(a), a.flags |= 1, Le(e, a, s, m), a.child);
  }
  function N1(e, a, s, r, f) {
    if (yi(a), a.stateNode === null) {
      var m = ss, S = s.contextType;
      typeof S == "object" && S !== null && (m = Oe(S)), m = new s(r, m), a.memoizedState = m.state !== null && m.state !== void 0 ? m.state : null, m.updater = xf, a.stateNode = m, m._reactInternals = a, m = a.stateNode, m.props = r, m.state = a.memoizedState, m.refs = {}, Zu(a), S = s.contextType, m.context = typeof S == "object" && S !== null ? Oe(S) : ss, m.state = a.memoizedState, S = s.getDerivedStateFromProps, typeof S == "function" && (bf(
        a,
        s,
        S,
        r
      ), m.state = a.memoizedState), typeof s.getDerivedStateFromProps == "function" || typeof m.getSnapshotBeforeUpdate == "function" || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (S = m.state, typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount(), S !== m.state && xf.enqueueReplaceState(m, m.state, null), bl(a, r, m, f), vl(), m.state = a.memoizedState), typeof m.componentDidMount == "function" && (a.flags |= 4194308), r = !0;
    } else if (e === null) {
      m = a.stateNode;
      var E = a.memoizedProps, k = wi(s, E);
      m.props = k;
      var Z = m.context, st = s.contextType;
      S = ss, typeof st == "object" && st !== null && (S = Oe(st));
      var rt = s.getDerivedStateFromProps;
      st = typeof rt == "function" || typeof m.getSnapshotBeforeUpdate == "function", E = a.pendingProps !== E, st || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (E || Z !== S) && v1(
        a,
        m,
        r,
        S
      ), Ra = !1;
      var Q = a.memoizedState;
      m.state = Q, bl(a, r, m, f), vl(), Z = a.memoizedState, E || Q !== Z || Ra ? (typeof rt == "function" && (bf(
        a,
        s,
        rt,
        r
      ), Z = a.memoizedState), (k = Ra || g1(
        a,
        s,
        k,
        r,
        Q,
        Z,
        S
      )) ? (st || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (a.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (a.flags |= 4194308), a.memoizedProps = r, a.memoizedState = Z), m.props = r, m.state = Z, m.context = S, r = k) : (typeof m.componentDidMount == "function" && (a.flags |= 4194308), r = !1);
    } else {
      m = a.stateNode, Qu(e, a), S = a.memoizedProps, st = wi(s, S), m.props = st, rt = a.pendingProps, Q = m.context, Z = s.contextType, k = ss, typeof Z == "object" && Z !== null && (k = Oe(Z)), E = s.getDerivedStateFromProps, (Z = typeof E == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (S !== rt || Q !== k) && v1(
        a,
        m,
        r,
        k
      ), Ra = !1, Q = a.memoizedState, m.state = Q, bl(a, r, m, f), vl();
      var W = a.memoizedState;
      S !== rt || Q !== W || Ra || e !== null && e.dependencies !== null && to(e.dependencies) ? (typeof E == "function" && (bf(
        a,
        s,
        E,
        r
      ), W = a.memoizedState), (st = Ra || g1(
        a,
        s,
        st,
        r,
        Q,
        W,
        k
      ) || e !== null && e.dependencies !== null && to(e.dependencies)) ? (Z || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(r, W, k), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(
        r,
        W,
        k
      )), typeof m.componentDidUpdate == "function" && (a.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (a.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || S === e.memoizedProps && Q === e.memoizedState || (a.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || S === e.memoizedProps && Q === e.memoizedState || (a.flags |= 1024), a.memoizedProps = r, a.memoizedState = W), m.props = r, m.state = W, m.context = k, r = st) : (typeof m.componentDidUpdate != "function" || S === e.memoizedProps && Q === e.memoizedState || (a.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || S === e.memoizedProps && Q === e.memoizedState || (a.flags |= 1024), r = !1);
    }
    return m = r, xo(e, a), r = (a.flags & 128) !== 0, m || r ? (m = a.stateNode, s = r && typeof s.getDerivedStateFromError != "function" ? null : m.render(), a.flags |= 1, e !== null && r ? (a.child = xi(
      a,
      e.child,
      null,
      f
    ), a.child = xi(
      a,
      null,
      s,
      f
    )) : Le(e, a, s, f), a.memoizedState = m.state, e = a.child) : e = ua(
      e,
      a,
      f
    ), e;
  }
  function O1(e, a, s, r) {
    return mi(), a.flags |= 256, Le(e, a, s, r), a.child;
  }
  var Tf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function jf(e) {
    return { baseLanes: e, cachePool: w0() };
  }
  function Af(e, a, s) {
    return e = e !== null ? e.childLanes & ~s : 0, a && (e |= fn), e;
  }
  function L1(e, a, s) {
    var r = a.pendingProps, f = !1, m = (a.flags & 128) !== 0, S;
    if ((S = m) || (S = e !== null && e.memoizedState === null ? !1 : (de.current & 2) !== 0), S && (f = !0, a.flags &= -129), S = (a.flags & 32) !== 0, a.flags &= -33, e === null) {
      if (kt) {
        if (f ? Oa(a) : La(), (e = ee) ? (e = qy(
          e,
          xn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (a.memoizedState = {
          dehydrated: e,
          treeContext: Aa !== null ? { id: Hn, overflow: qn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, s = h0(e), s.return = a, a.child = s, Ne = a, ee = null)) : e = null, e === null) throw Ma(a);
        return od(e) ? a.lanes = 32 : a.lanes = 536870912, null;
      }
      var E = r.children;
      return r = r.fallback, f ? (La(), f = a.mode, E = So(
        { mode: "hidden", children: E },
        f
      ), r = hi(
        r,
        f,
        s,
        null
      ), E.return = a, r.return = a, E.sibling = r, a.child = E, r = a.child, r.memoizedState = jf(s), r.childLanes = Af(
        e,
        S,
        s
      ), a.memoizedState = Tf, Tl(null, r)) : (Oa(a), Ef(a, E));
    }
    var k = e.memoizedState;
    if (k !== null && (E = k.dehydrated, E !== null)) {
      if (m)
        a.flags & 256 ? (Oa(a), a.flags &= -257, a = Mf(
          e,
          a,
          s
        )) : a.memoizedState !== null ? (La(), a.child = e.child, a.flags |= 128, a = null) : (La(), E = r.fallback, f = a.mode, r = So(
          { mode: "visible", children: r.children },
          f
        ), E = hi(
          E,
          f,
          s,
          null
        ), E.flags |= 2, r.return = a, E.return = a, r.sibling = E, a.child = r, xi(
          a,
          e.child,
          null,
          s
        ), r = a.child, r.memoizedState = jf(s), r.childLanes = Af(
          e,
          S,
          s
        ), a.memoizedState = Tf, a = Tl(null, r));
      else if (Oa(a), od(E)) {
        if (S = E.nextSibling && E.nextSibling.dataset, S) var Z = S.dgst;
        S = Z, r = Error(l(419)), r.stack = "", r.digest = S, dl({ value: r, source: null, stack: null }), a = Mf(
          e,
          a,
          s
        );
      } else if (be || cs(e, a, s, !1), S = (s & e.childLanes) !== 0, be || S) {
        if (S = Jt, S !== null && (r = De(S, s), r !== 0 && r !== k.retryLane))
          throw k.retryLane = r, di(e, r), nn(S, e, r), wf;
        rd(E) || Ro(), a = Mf(
          e,
          a,
          s
        );
      } else
        rd(E) ? (a.flags |= 192, a.child = e.child, a = null) : (e = k.treeContext, ee = wn(
          E.nextSibling
        ), Ne = a, kt = !0, Ea = null, xn = !1, e !== null && y0(a, e), a = Ef(
          a,
          r.children
        ), a.flags |= 4096);
      return a;
    }
    return f ? (La(), E = r.fallback, f = a.mode, k = e.child, Z = k.sibling, r = ia(k, {
      mode: "hidden",
      children: r.children
    }), r.subtreeFlags = k.subtreeFlags & 65011712, Z !== null ? E = ia(
      Z,
      E
    ) : (E = hi(
      E,
      f,
      s,
      null
    ), E.flags |= 2), E.return = a, r.return = a, r.sibling = E, a.child = r, Tl(null, r), r = a.child, E = e.child.memoizedState, E === null ? E = jf(s) : (f = E.cachePool, f !== null ? (k = ge._currentValue, f = f.parent !== k ? { parent: k, pool: k } : f) : f = w0(), E = {
      baseLanes: E.baseLanes | s,
      cachePool: f
    }), r.memoizedState = E, r.childLanes = Af(
      e,
      S,
      s
    ), a.memoizedState = Tf, Tl(e.child, r)) : (Oa(a), s = e.child, e = s.sibling, s = ia(s, {
      mode: "visible",
      children: r.children
    }), s.return = a, s.sibling = null, e !== null && (S = a.deletions, S === null ? (a.deletions = [e], a.flags |= 16) : S.push(e)), a.child = s, a.memoizedState = null, s);
  }
  function Ef(e, a) {
    return a = So(
      { mode: "visible", children: a },
      e.mode
    ), a.return = e, e.child = a;
  }
  function So(e, a) {
    return e = rn(22, e, null, a), e.lanes = 0, e;
  }
  function Mf(e, a, s) {
    return xi(a, e.child, null, s), e = Ef(
      a,
      a.pendingProps.children
    ), e.flags |= 2, a.memoizedState = null, e;
  }
  function $1(e, a, s) {
    e.lanes |= a;
    var r = e.alternate;
    r !== null && (r.lanes |= a), qu(e.return, a, s);
  }
  function _f(e, a, s, r, f, m) {
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
  function k1(e, a, s) {
    var r = a.pendingProps, f = r.revealOrder, m = r.tail;
    r = r.children;
    var S = de.current, E = (S & 2) !== 0;
    if (E ? (S = S & 1 | 2, a.flags |= 128) : S &= 1, Y(de, S), Le(e, a, r, s), r = kt ? fl : 0, !E && e !== null && (e.flags & 128) !== 0)
      t: for (e = a.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && $1(e, s, a);
        else if (e.tag === 19)
          $1(e, s, a);
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
          e = s.alternate, e !== null && oo(e) === null && (f = s), s = s.sibling;
        s = f, s === null ? (f = a.child, a.child = null) : (f = s.sibling, s.sibling = null), _f(
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
          if (e = f.alternate, e !== null && oo(e) === null) {
            a.child = f;
            break;
          }
          e = f.sibling, f.sibling = s, s = f, f = e;
        }
        _f(
          a,
          !0,
          s,
          null,
          m,
          r
        );
        break;
      case "together":
        _f(
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
  function ua(e, a, s) {
    if (e !== null && (a.dependencies = e.dependencies), Ba |= a.lanes, (s & a.childLanes) === 0)
      if (e !== null) {
        if (cs(
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
      for (e = a.child, s = ia(e, e.pendingProps), a.child = s, s.return = a; e.sibling !== null; )
        e = e.sibling, s = s.sibling = ia(e, e.pendingProps), s.return = a;
      s.sibling = null;
    }
    return a.child;
  }
  function Rf(e, a) {
    return (e.lanes & a) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && to(e)));
  }
  function t4(e, a, s) {
    switch (a.tag) {
      case 3:
        nt(a, a.stateNode.containerInfo), _a(a, ge, e.memoizedState.cache), mi();
        break;
      case 27:
      case 5:
        ut(a);
        break;
      case 4:
        nt(a, a.stateNode.containerInfo);
        break;
      case 10:
        _a(
          a,
          a.type,
          a.memoizedProps.value
        );
        break;
      case 31:
        if (a.memoizedState !== null)
          return a.flags |= 128, tf(a), null;
        break;
      case 13:
        var r = a.memoizedState;
        if (r !== null)
          return r.dehydrated !== null ? (Oa(a), a.flags |= 128, null) : (s & a.child.childLanes) !== 0 ? L1(e, a, s) : (Oa(a), e = ua(
            e,
            a,
            s
          ), e !== null ? e.sibling : null);
        Oa(a);
        break;
      case 19:
        var f = (e.flags & 128) !== 0;
        if (r = (s & a.childLanes) !== 0, r || (cs(
          e,
          a,
          s,
          !1
        ), r = (s & a.childLanes) !== 0), f) {
          if (r)
            return k1(
              e,
              a,
              s
            );
          a.flags |= 128;
        }
        if (f = a.memoizedState, f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), Y(de, de.current), r) break;
        return null;
      case 22:
        return a.lanes = 0, M1(
          e,
          a,
          s,
          a.pendingProps
        );
      case 24:
        _a(a, ge, e.memoizedState.cache);
    }
    return ua(e, a, s);
  }
  function B1(e, a, s) {
    if (e !== null)
      if (e.memoizedProps !== a.pendingProps)
        be = !0;
      else {
        if (!Rf(e, s) && (a.flags & 128) === 0)
          return be = !1, t4(
            e,
            a,
            s
          );
        be = (e.flags & 131072) !== 0;
      }
    else
      be = !1, kt && (a.flags & 1048576) !== 0 && p0(a, fl, a.index);
    switch (a.lanes = 0, a.tag) {
      case 16:
        t: {
          var r = a.pendingProps;
          if (e = vi(a.elementType), a.type = e, typeof e == "function")
            Lu(e) ? (r = wi(e, r), a.tag = 1, a = N1(
              null,
              a,
              e,
              r,
              s
            )) : (a.tag = 0, a = Cf(
              null,
              a,
              e,
              r,
              s
            ));
          else {
            if (e != null) {
              var f = e.$$typeof;
              if (f === _) {
                a.tag = 11, a = j1(
                  null,
                  a,
                  e,
                  r,
                  s
                );
                break t;
              } else if (f === D) {
                a.tag = 14, a = A1(
                  null,
                  a,
                  e,
                  r,
                  s
                );
                break t;
              }
            }
            throw a = it(e) || e, Error(l(306, a, ""));
          }
        }
        return a;
      case 0:
        return Cf(
          e,
          a,
          a.type,
          a.pendingProps,
          s
        );
      case 1:
        return r = a.type, f = wi(
          r,
          a.pendingProps
        ), N1(
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
          f = m.element, Qu(e, a), bl(a, r, null, s);
          var S = a.memoizedState;
          if (r = S.cache, _a(a, ge, r), r !== m.cache && Yu(
            a,
            [ge],
            s,
            !0
          ), vl(), r = S.element, m.isDehydrated)
            if (m = {
              element: r,
              isDehydrated: !1,
              cache: S.cache
            }, a.updateQueue.baseState = m, a.memoizedState = m, a.flags & 256) {
              a = O1(
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
              ), dl(f), a = O1(
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
              for (ee = wn(e.firstChild), Ne = a, kt = !0, Ea = null, xn = !0, s = M0(
                a,
                null,
                r,
                s
              ), a.child = s; s; )
                s.flags = s.flags & -3 | 4096, s = s.sibling;
            }
          else {
            if (mi(), r === f) {
              a = ua(
                e,
                a,
                s
              );
              break t;
            }
            Le(e, a, r, s);
          }
          a = a.child;
        }
        return a;
      case 26:
        return xo(e, a), e === null ? (s = Zy(
          a.type,
          null,
          a.pendingProps,
          null
        )) ? a.memoizedState = s : kt || (s = a.type, e = a.pendingProps, r = Bo(
          ct.current
        ).createElement(s), r[ye] = a, r[Fe] = e, $e(r, s, e), _e(r), a.stateNode = r) : a.memoizedState = Zy(
          a.type,
          e.memoizedProps,
          a.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return ut(a), e === null && kt && (r = a.stateNode = Gy(
          a.type,
          a.pendingProps,
          ct.current
        ), Ne = a, xn = !0, f = ee, qa(a.type) ? (cd = f, ee = wn(r.firstChild)) : ee = f), Le(
          e,
          a,
          a.pendingProps.children,
          s
        ), xo(e, a), e === null && (a.flags |= 4194304), a.child;
      case 5:
        return e === null && kt && ((f = r = ee) && (r = R4(
          r,
          a.type,
          a.pendingProps,
          xn
        ), r !== null ? (a.stateNode = r, Ne = a, ee = wn(r.firstChild), xn = !1, f = !0) : f = !1), f || Ma(a)), ut(a), f = a.type, m = a.pendingProps, S = e !== null ? e.memoizedProps : null, r = m.children, id(f, m) ? r = null : S !== null && id(f, S) && (a.flags |= 32), a.memoizedState !== null && (f = nf(
          e,
          a,
          Gw,
          null,
          null,
          s
        ), zl._currentValue = f), xo(e, a), Le(e, a, r, s), a.child;
      case 6:
        return e === null && kt && ((e = s = ee) && (s = D4(
          s,
          a.pendingProps,
          xn
        ), s !== null ? (a.stateNode = s, Ne = a, ee = null, e = !0) : e = !1), e || Ma(a)), null;
      case 13:
        return L1(e, a, s);
      case 4:
        return nt(
          a,
          a.stateNode.containerInfo
        ), r = a.pendingProps, e === null ? a.child = xi(
          a,
          null,
          r,
          s
        ) : Le(e, a, r, s), a.child;
      case 11:
        return j1(
          e,
          a,
          a.type,
          a.pendingProps,
          s
        );
      case 7:
        return Le(
          e,
          a,
          a.pendingProps,
          s
        ), a.child;
      case 8:
        return Le(
          e,
          a,
          a.pendingProps.children,
          s
        ), a.child;
      case 12:
        return Le(
          e,
          a,
          a.pendingProps.children,
          s
        ), a.child;
      case 10:
        return r = a.pendingProps, _a(a, a.type, r.value), Le(e, a, r.children, s), a.child;
      case 9:
        return f = a.type._context, r = a.pendingProps.children, yi(a), f = Oe(f), r = r(f), a.flags |= 1, Le(e, a, r, s), a.child;
      case 14:
        return A1(
          e,
          a,
          a.type,
          a.pendingProps,
          s
        );
      case 15:
        return E1(
          e,
          a,
          a.type,
          a.pendingProps,
          s
        );
      case 19:
        return k1(e, a, s);
      case 31:
        return Ww(e, a, s);
      case 22:
        return M1(
          e,
          a,
          s,
          a.pendingProps
        );
      case 24:
        return yi(a), r = Oe(ge), e === null ? (f = Xu(), f === null && (f = Jt, m = Pu(), f.pooledCache = m, m.refCount++, m !== null && (f.pooledCacheLanes |= s), f = m), a.memoizedState = { parent: r, cache: f }, Zu(a), _a(a, ge, f)) : ((e.lanes & s) !== 0 && (Qu(e, a), bl(a, null, null, s), vl()), f = e.memoizedState, m = a.memoizedState, f.parent !== r ? (f = { parent: r, cache: r }, a.memoizedState = f, a.lanes === 0 && (a.memoizedState = a.updateQueue.baseState = f), _a(a, ge, r)) : (r = m.cache, _a(a, ge, r), r !== f.cache && Yu(
          a,
          [ge],
          s,
          !0
        ))), Le(
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
  function fa(e) {
    e.flags |= 4;
  }
  function Df(e, a, s, r, f) {
    if ((a = (e.mode & 32) !== 0) && (a = !1), a) {
      if (e.flags |= 16777216, (f & 335544128) === f)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (uy()) e.flags |= 8192;
        else
          throw bi = io, Ku;
    } else e.flags &= -16777217;
  }
  function V1(e, a) {
    if (a.type !== "stylesheet" || (a.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !Wy(a))
      if (uy()) e.flags |= 8192;
      else
        throw bi = io, Ku;
  }
  function wo(e, a) {
    a !== null && (e.flags |= 4), e.flags & 16384 && (a = e.tag !== 22 ? Bt() : 536870912, e.lanes |= a, Ss |= a);
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
  function ne(e) {
    var a = e.alternate !== null && e.alternate.child === e.child, s = 0, r = 0;
    if (a)
      for (var f = e.child; f !== null; )
        s |= f.lanes | f.childLanes, r |= f.subtreeFlags & 65011712, r |= f.flags & 65011712, f.return = e, f = f.sibling;
    else
      for (f = e.child; f !== null; )
        s |= f.lanes | f.childLanes, r |= f.subtreeFlags, r |= f.flags, f.return = e, f = f.sibling;
    return e.subtreeFlags |= r, e.childLanes = s, a;
  }
  function e4(e, a, s) {
    var r = a.pendingProps;
    switch (Vu(a), a.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return ne(a), null;
      case 1:
        return ne(a), null;
      case 3:
        return s = a.stateNode, r = null, e !== null && (r = e.memoizedState.cache), a.memoizedState.cache !== r && (a.flags |= 2048), ra(ge), mt(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), (e === null || e.child === null) && (os(a) ? fa(a) : e === null || e.memoizedState.isDehydrated && (a.flags & 256) === 0 || (a.flags |= 1024, Uu())), ne(a), null;
      case 26:
        var f = a.type, m = a.memoizedState;
        return e === null ? (fa(a), m !== null ? (ne(a), V1(a, m)) : (ne(a), Df(
          a,
          f,
          null,
          r,
          s
        ))) : m ? m !== e.memoizedState ? (fa(a), ne(a), V1(a, m)) : (ne(a), a.flags &= -16777217) : (e = e.memoizedProps, e !== r && fa(a), ne(a), Df(
          a,
          f,
          e,
          r,
          s
        )), null;
      case 27:
        if (yt(a), s = ct.current, f = a.type, e !== null && a.stateNode != null)
          e.memoizedProps !== r && fa(a);
        else {
          if (!r) {
            if (a.stateNode === null)
              throw Error(l(166));
            return ne(a), null;
          }
          e = et.current, os(a) ? g0(a) : (e = Gy(f, r, s), a.stateNode = e, fa(a));
        }
        return ne(a), null;
      case 5:
        if (yt(a), f = a.type, e !== null && a.stateNode != null)
          e.memoizedProps !== r && fa(a);
        else {
          if (!r) {
            if (a.stateNode === null)
              throw Error(l(166));
            return ne(a), null;
          }
          if (m = et.current, os(a))
            g0(a);
          else {
            var S = Bo(
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
            m[ye] = a, m[Fe] = r;
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
            t: switch ($e(m, f, r), f) {
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
            r && fa(a);
          }
        }
        return ne(a), Df(
          a,
          a.type,
          e === null ? null : e.memoizedProps,
          a.pendingProps,
          s
        ), null;
      case 6:
        if (e && a.stateNode != null)
          e.memoizedProps !== r && fa(a);
        else {
          if (typeof r != "string" && a.stateNode === null)
            throw Error(l(166));
          if (e = ct.current, os(a)) {
            if (e = a.stateNode, s = a.memoizedProps, r = null, f = Ne, f !== null)
              switch (f.tag) {
                case 27:
                case 5:
                  r = f.memoizedProps;
              }
            e[ye] = a, e = !!(e.nodeValue === s || r !== null && r.suppressHydrationWarning === !0 || Ly(e.nodeValue, s)), e || Ma(a, !0);
          } else
            e = Bo(e).createTextNode(
              r
            ), e[ye] = a, a.stateNode = e;
        }
        return ne(a), null;
      case 31:
        if (s = a.memoizedState, e === null || e.memoizedState !== null) {
          if (r = os(a), s !== null) {
            if (e === null) {
              if (!r) throw Error(l(318));
              if (e = a.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(l(557));
              e[ye] = a;
            } else
              mi(), (a.flags & 128) === 0 && (a.memoizedState = null), a.flags |= 4;
            ne(a), e = !1;
          } else
            s = Uu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = s), e = !0;
          if (!e)
            return a.flags & 256 ? (cn(a), a) : (cn(a), null);
          if ((a.flags & 128) !== 0)
            throw Error(l(558));
        }
        return ne(a), null;
      case 13:
        if (r = a.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (f = os(a), r !== null && r.dehydrated !== null) {
            if (e === null) {
              if (!f) throw Error(l(318));
              if (f = a.memoizedState, f = f !== null ? f.dehydrated : null, !f) throw Error(l(317));
              f[ye] = a;
            } else
              mi(), (a.flags & 128) === 0 && (a.memoizedState = null), a.flags |= 4;
            ne(a), f = !1;
          } else
            f = Uu(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = f), f = !0;
          if (!f)
            return a.flags & 256 ? (cn(a), a) : (cn(a), null);
        }
        return cn(a), (a.flags & 128) !== 0 ? (a.lanes = s, a) : (s = r !== null, e = e !== null && e.memoizedState !== null, s && (r = a.child, f = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (f = r.alternate.memoizedState.cachePool.pool), m = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (m = r.memoizedState.cachePool.pool), m !== f && (r.flags |= 2048)), s !== e && s && (a.child.flags |= 8192), wo(a, a.updateQueue), ne(a), null);
      case 4:
        return mt(), e === null && Wf(a.stateNode.containerInfo), ne(a), null;
      case 10:
        return ra(a.type), ne(a), null;
      case 19:
        if (q(de), r = a.memoizedState, r === null) return ne(a), null;
        if (f = (a.flags & 128) !== 0, m = r.rendering, m === null)
          if (f) jl(r, !1);
          else {
            if (re !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = a.child; e !== null; ) {
                if (m = oo(e), m !== null) {
                  for (a.flags |= 128, jl(r, !1), e = m.updateQueue, a.updateQueue = e, wo(a, e), a.subtreeFlags = 0, e = s, s = a.child; s !== null; )
                    d0(s, e), s = s.sibling;
                  return Y(
                    de,
                    de.current & 1 | 2
                  ), kt && sa(a, r.treeForkCount), a.child;
                }
                e = e.sibling;
              }
            r.tail !== null && Be() > Eo && (a.flags |= 128, f = !0, jl(r, !1), a.lanes = 4194304);
          }
        else {
          if (!f)
            if (e = oo(m), e !== null) {
              if (a.flags |= 128, f = !0, e = e.updateQueue, a.updateQueue = e, wo(a, e), jl(r, !0), r.tail === null && r.tailMode === "hidden" && !m.alternate && !kt)
                return ne(a), null;
            } else
              2 * Be() - r.renderingStartTime > Eo && s !== 536870912 && (a.flags |= 128, f = !0, jl(r, !1), a.lanes = 4194304);
          r.isBackwards ? (m.sibling = a.child, a.child = m) : (e = r.last, e !== null ? e.sibling = m : a.child = m, r.last = m);
        }
        return r.tail !== null ? (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Be(), e.sibling = null, s = de.current, Y(
          de,
          f ? s & 1 | 2 : s & 1
        ), kt && sa(a, r.treeForkCount), e) : (ne(a), null);
      case 22:
      case 23:
        return cn(a), Wu(), r = a.memoizedState !== null, e !== null ? e.memoizedState !== null !== r && (a.flags |= 8192) : r && (a.flags |= 8192), r ? (s & 536870912) !== 0 && (a.flags & 128) === 0 && (ne(a), a.subtreeFlags & 6 && (a.flags |= 8192)) : ne(a), s = a.updateQueue, s !== null && wo(a, s.retryQueue), s = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (s = e.memoizedState.cachePool.pool), r = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (r = a.memoizedState.cachePool.pool), r !== s && (a.flags |= 2048), e !== null && q(gi), null;
      case 24:
        return s = null, e !== null && (s = e.memoizedState.cache), a.memoizedState.cache !== s && (a.flags |= 2048), ra(ge), ne(a), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(l(156, a.tag));
  }
  function n4(e, a) {
    switch (Vu(a), a.tag) {
      case 1:
        return e = a.flags, e & 65536 ? (a.flags = e & -65537 | 128, a) : null;
      case 3:
        return ra(ge), mt(), e = a.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (a.flags = e & -65537 | 128, a) : null;
      case 26:
      case 27:
      case 5:
        return yt(a), null;
      case 31:
        if (a.memoizedState !== null) {
          if (cn(a), a.alternate === null)
            throw Error(l(340));
          mi();
        }
        return e = a.flags, e & 65536 ? (a.flags = e & -65537 | 128, a) : null;
      case 13:
        if (cn(a), e = a.memoizedState, e !== null && e.dehydrated !== null) {
          if (a.alternate === null)
            throw Error(l(340));
          mi();
        }
        return e = a.flags, e & 65536 ? (a.flags = e & -65537 | 128, a) : null;
      case 19:
        return q(de), null;
      case 4:
        return mt(), null;
      case 10:
        return ra(a.type), null;
      case 22:
      case 23:
        return cn(a), Wu(), e !== null && q(gi), e = a.flags, e & 65536 ? (a.flags = e & -65537 | 128, a) : null;
      case 24:
        return ra(ge), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function z1(e, a) {
    switch (Vu(a), a.tag) {
      case 3:
        ra(ge), mt();
        break;
      case 26:
      case 27:
      case 5:
        yt(a);
        break;
      case 4:
        mt();
        break;
      case 31:
        a.memoizedState !== null && cn(a);
        break;
      case 13:
        cn(a);
        break;
      case 19:
        q(de);
        break;
      case 10:
        ra(a.type);
        break;
      case 22:
      case 23:
        cn(a), Wu(), e !== null && q(gi);
        break;
      case 24:
        ra(ge);
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
    } catch (E) {
      Gt(a, a.return, E);
    }
  }
  function $a(e, a, s) {
    try {
      var r = a.updateQueue, f = r !== null ? r.lastEffect : null;
      if (f !== null) {
        var m = f.next;
        r = m;
        do {
          if ((r.tag & e) === e) {
            var S = r.inst, E = S.destroy;
            if (E !== void 0) {
              S.destroy = void 0, f = a;
              var k = s, Z = E;
              try {
                Z();
              } catch (st) {
                Gt(
                  f,
                  k,
                  st
                );
              }
            }
          }
          r = r.next;
        } while (r !== m);
      }
    } catch (st) {
      Gt(a, a.return, st);
    }
  }
  function U1(e) {
    var a = e.updateQueue;
    if (a !== null) {
      var s = e.stateNode;
      try {
        R0(a, s);
      } catch (r) {
        Gt(e, e.return, r);
      }
    }
  }
  function H1(e, a, s) {
    s.props = wi(
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
  function Yn(e, a) {
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
  function q1(e) {
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
  function Nf(e, a, s) {
    try {
      var r = e.stateNode;
      T4(r, e.type, s, a), r[Fe] = a;
    } catch (f) {
      Gt(e, e.return, f);
    }
  }
  function Y1(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && qa(e.type) || e.tag === 4;
  }
  function Of(e) {
    t: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Y1(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && qa(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue t;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Lf(e, a, s) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, a ? (s.nodeType === 9 ? s.body : s.nodeName === "HTML" ? s.ownerDocument.body : s).insertBefore(e, a) : (a = s.nodeType === 9 ? s.body : s.nodeName === "HTML" ? s.ownerDocument.body : s, a.appendChild(e), s = s._reactRootContainer, s != null || a.onclick !== null || (a.onclick = na));
    else if (r !== 4 && (r === 27 && qa(e.type) && (s = e.stateNode, a = null), e = e.child, e !== null))
      for (Lf(e, a, s), e = e.sibling; e !== null; )
        Lf(e, a, s), e = e.sibling;
  }
  function Co(e, a, s) {
    var r = e.tag;
    if (r === 5 || r === 6)
      e = e.stateNode, a ? s.insertBefore(e, a) : s.appendChild(e);
    else if (r !== 4 && (r === 27 && qa(e.type) && (s = e.stateNode), e = e.child, e !== null))
      for (Co(e, a, s), e = e.sibling; e !== null; )
        Co(e, a, s), e = e.sibling;
  }
  function P1(e) {
    var a = e.stateNode, s = e.memoizedProps;
    try {
      for (var r = e.type, f = a.attributes; f.length; )
        a.removeAttributeNode(f[0]);
      $e(a, r, s), a[ye] = e, a[Fe] = s;
    } catch (m) {
      Gt(e, e.return, m);
    }
  }
  var da = !1, xe = !1, $f = !1, G1 = typeof WeakSet == "function" ? WeakSet : Set, Re = null;
  function a4(e, a) {
    if (e = e.containerInfo, nd = Po, e = a0(e), Eu(e)) {
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
            var S = 0, E = -1, k = -1, Z = 0, st = 0, rt = e, Q = null;
            e: for (; ; ) {
              for (var W; rt !== s || f !== 0 && rt.nodeType !== 3 || (E = S + f), rt !== m || r !== 0 && rt.nodeType !== 3 || (k = S + r), rt.nodeType === 3 && (S += rt.nodeValue.length), (W = rt.firstChild) !== null; )
                Q = rt, rt = W;
              for (; ; ) {
                if (rt === e) break e;
                if (Q === s && ++Z === f && (E = S), Q === m && ++st === r && (k = S), (W = rt.nextSibling) !== null) break;
                rt = Q, Q = rt.parentNode;
              }
              rt = W;
            }
            s = E === -1 || k === -1 ? null : { start: E, end: k };
          } else s = null;
        }
      s = s || { start: 0, end: 0 };
    } else s = null;
    for (ad = { focusedElem: e, selectionRange: s }, Po = !1, Re = a; Re !== null; )
      if (a = Re, e = a.child, (a.subtreeFlags & 1028) !== 0 && e !== null)
        e.return = a, Re = e;
      else
        for (; Re !== null; ) {
          switch (a = Re, m = a.alternate, e = a.flags, a.tag) {
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
                  var vt = wi(
                    s.type,
                    f
                  );
                  e = r.getSnapshotBeforeUpdate(
                    vt,
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
                  ld(e);
                else if (s === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      ld(e);
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
            e.return = a.return, Re = e;
            break;
          }
          Re = a.return;
        }
  }
  function X1(e, a, s) {
    var r = s.flags;
    switch (s.tag) {
      case 0:
      case 11:
      case 15:
        ma(e, s), r & 4 && Al(5, s);
        break;
      case 1:
        if (ma(e, s), r & 4)
          if (e = s.stateNode, a === null)
            try {
              e.componentDidMount();
            } catch (S) {
              Gt(s, s.return, S);
            }
          else {
            var f = wi(
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
        r & 64 && U1(s), r & 512 && El(s, s.return);
        break;
      case 3:
        if (ma(e, s), r & 64 && (e = s.updateQueue, e !== null)) {
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
            R0(e, a);
          } catch (S) {
            Gt(s, s.return, S);
          }
        }
        break;
      case 27:
        a === null && r & 4 && P1(s);
      case 26:
      case 5:
        ma(e, s), a === null && r & 4 && q1(s), r & 512 && El(s, s.return);
        break;
      case 12:
        ma(e, s);
        break;
      case 31:
        ma(e, s), r & 4 && Q1(e, s);
        break;
      case 13:
        ma(e, s), r & 4 && F1(e, s), r & 64 && (e = s.memoizedState, e !== null && (e = e.dehydrated, e !== null && (s = d4.bind(
          null,
          s
        ), N4(e, s))));
        break;
      case 22:
        if (r = s.memoizedState !== null || da, !r) {
          a = a !== null && a.memoizedState !== null || xe, f = da;
          var m = xe;
          da = r, (xe = a) && !m ? pa(
            e,
            s,
            (s.subtreeFlags & 8772) !== 0
          ) : ma(e, s), da = f, xe = m;
        }
        break;
      case 30:
        break;
      default:
        ma(e, s);
    }
  }
  function K1(e) {
    var a = e.alternate;
    a !== null && (e.alternate = null, K1(a)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (a = e.stateNode, a !== null && uu(a)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var ae = null, Je = !1;
  function ha(e, a, s) {
    for (s = s.child; s !== null; )
      Z1(e, a, s), s = s.sibling;
  }
  function Z1(e, a, s) {
    if (qe && typeof qe.onCommitFiberUnmount == "function")
      try {
        qe.onCommitFiberUnmount(li, s);
      } catch {
      }
    switch (s.tag) {
      case 26:
        xe || Yn(s, a), ha(
          e,
          a,
          s
        ), s.memoizedState ? s.memoizedState.count-- : s.stateNode && (s = s.stateNode, s.parentNode.removeChild(s));
        break;
      case 27:
        xe || Yn(s, a);
        var r = ae, f = Je;
        qa(s.type) && (ae = s.stateNode, Je = !1), ha(
          e,
          a,
          s
        ), kl(s.stateNode), ae = r, Je = f;
        break;
      case 5:
        xe || Yn(s, a);
      case 6:
        if (r = ae, f = Je, ae = null, ha(
          e,
          a,
          s
        ), ae = r, Je = f, ae !== null)
          if (Je)
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
        ae !== null && (Je ? (e = ae, Uy(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          s.stateNode
        ), _s(e)) : Uy(ae, s.stateNode));
        break;
      case 4:
        r = ae, f = Je, ae = s.stateNode.containerInfo, Je = !0, ha(
          e,
          a,
          s
        ), ae = r, Je = f;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        $a(2, s, a), xe || $a(4, s, a), ha(
          e,
          a,
          s
        );
        break;
      case 1:
        xe || (Yn(s, a), r = s.stateNode, typeof r.componentWillUnmount == "function" && H1(
          s,
          a,
          r
        )), ha(
          e,
          a,
          s
        );
        break;
      case 21:
        ha(
          e,
          a,
          s
        );
        break;
      case 22:
        xe = (r = xe) || s.memoizedState !== null, ha(
          e,
          a,
          s
        ), xe = r;
        break;
      default:
        ha(
          e,
          a,
          s
        );
    }
  }
  function Q1(e, a) {
    if (a.memoizedState === null && (e = a.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        _s(e);
      } catch (s) {
        Gt(a, a.return, s);
      }
    }
  }
  function F1(e, a) {
    if (a.memoizedState === null && (e = a.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        _s(e);
      } catch (s) {
        Gt(a, a.return, s);
      }
  }
  function i4(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var a = e.stateNode;
        return a === null && (a = e.stateNode = new G1()), a;
      case 22:
        return e = e.stateNode, a = e._retryCache, a === null && (a = e._retryCache = new G1()), a;
      default:
        throw Error(l(435, e.tag));
    }
  }
  function To(e, a) {
    var s = i4(e);
    a.forEach(function(r) {
      if (!s.has(r)) {
        s.add(r);
        var f = h4.bind(null, e, r);
        r.then(f, f);
      }
    });
  }
  function We(e, a) {
    var s = a.deletions;
    if (s !== null)
      for (var r = 0; r < s.length; r++) {
        var f = s[r], m = e, S = a, E = S;
        t: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (qa(E.type)) {
                ae = E.stateNode, Je = !1;
                break t;
              }
              break;
            case 5:
              ae = E.stateNode, Je = !1;
              break t;
            case 3:
            case 4:
              ae = E.stateNode.containerInfo, Je = !0;
              break t;
          }
          E = E.return;
        }
        if (ae === null) throw Error(l(160));
        Z1(m, S, f), ae = null, Je = !1, m = f.alternate, m !== null && (m.return = null), f.return = null;
      }
    if (a.subtreeFlags & 13886)
      for (a = a.child; a !== null; )
        I1(a, e), a = a.sibling;
  }
  var _n = null;
  function I1(e, a) {
    var s = e.alternate, r = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        We(a, e), tn(e), r & 4 && ($a(3, e, e.return), Al(3, e), $a(5, e, e.return));
        break;
      case 1:
        We(a, e), tn(e), r & 512 && (xe || s === null || Yn(s, s.return)), r & 64 && da && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (s = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = s === null ? r : s.concat(r))));
        break;
      case 26:
        var f = _n;
        if (We(a, e), tn(e), r & 512 && (xe || s === null || Yn(s, s.return)), r & 4) {
          var m = s !== null ? s.memoizedState : null;
          if (r = e.memoizedState, s === null)
            if (r === null)
              if (e.stateNode === null) {
                t: {
                  r = e.type, s = e.memoizedProps, f = f.ownerDocument || f;
                  e: switch (r) {
                    case "title":
                      m = f.getElementsByTagName("title")[0], (!m || m[tl] || m[ye] || m.namespaceURI === "http://www.w3.org/2000/svg" || m.hasAttribute("itemprop")) && (m = f.createElement(r), f.head.insertBefore(
                        m,
                        f.querySelector("head > title")
                      )), $e(m, r, s), m[ye] = e, _e(m), r = m;
                      break t;
                    case "link":
                      var S = Iy(
                        "link",
                        "href",
                        f
                      ).get(r + (s.href || ""));
                      if (S) {
                        for (var E = 0; E < S.length; E++)
                          if (m = S[E], m.getAttribute("href") === (s.href == null || s.href === "" ? null : s.href) && m.getAttribute("rel") === (s.rel == null ? null : s.rel) && m.getAttribute("title") === (s.title == null ? null : s.title) && m.getAttribute("crossorigin") === (s.crossOrigin == null ? null : s.crossOrigin)) {
                            S.splice(E, 1);
                            break e;
                          }
                      }
                      m = f.createElement(r), $e(m, r, s), f.head.appendChild(m);
                      break;
                    case "meta":
                      if (S = Iy(
                        "meta",
                        "content",
                        f
                      ).get(r + (s.content || ""))) {
                        for (E = 0; E < S.length; E++)
                          if (m = S[E], m.getAttribute("content") === (s.content == null ? null : "" + s.content) && m.getAttribute("name") === (s.name == null ? null : s.name) && m.getAttribute("property") === (s.property == null ? null : s.property) && m.getAttribute("http-equiv") === (s.httpEquiv == null ? null : s.httpEquiv) && m.getAttribute("charset") === (s.charSet == null ? null : s.charSet)) {
                            S.splice(E, 1);
                            break e;
                          }
                      }
                      m = f.createElement(r), $e(m, r, s), f.head.appendChild(m);
                      break;
                    default:
                      throw Error(l(468, r));
                  }
                  m[ye] = e, _e(m), r = m;
                }
                e.stateNode = r;
              } else
                Jy(
                  f,
                  e.type,
                  e.stateNode
                );
            else
              e.stateNode = Fy(
                f,
                r,
                e.memoizedProps
              );
          else
            m !== r ? (m === null ? s.stateNode !== null && (s = s.stateNode, s.parentNode.removeChild(s)) : m.count--, r === null ? Jy(
              f,
              e.type,
              e.stateNode
            ) : Fy(
              f,
              r,
              e.memoizedProps
            )) : r === null && e.stateNode !== null && Nf(
              e,
              e.memoizedProps,
              s.memoizedProps
            );
        }
        break;
      case 27:
        We(a, e), tn(e), r & 512 && (xe || s === null || Yn(s, s.return)), s !== null && r & 4 && Nf(
          e,
          e.memoizedProps,
          s.memoizedProps
        );
        break;
      case 5:
        if (We(a, e), tn(e), r & 512 && (xe || s === null || Yn(s, s.return)), e.flags & 32) {
          f = e.stateNode;
          try {
            Ji(f, "");
          } catch (vt) {
            Gt(e, e.return, vt);
          }
        }
        r & 4 && e.stateNode != null && (f = e.memoizedProps, Nf(
          e,
          f,
          s !== null ? s.memoizedProps : f
        )), r & 1024 && ($f = !0);
        break;
      case 6:
        if (We(a, e), tn(e), r & 4) {
          if (e.stateNode === null)
            throw Error(l(162));
          r = e.memoizedProps, s = e.stateNode;
          try {
            s.nodeValue = r;
          } catch (vt) {
            Gt(e, e.return, vt);
          }
        }
        break;
      case 3:
        if (Uo = null, f = _n, _n = Vo(a.containerInfo), We(a, e), _n = f, tn(e), r & 4 && s !== null && s.memoizedState.isDehydrated)
          try {
            _s(a.containerInfo);
          } catch (vt) {
            Gt(e, e.return, vt);
          }
        $f && ($f = !1, J1(e));
        break;
      case 4:
        r = _n, _n = Vo(
          e.stateNode.containerInfo
        ), We(a, e), tn(e), _n = r;
        break;
      case 12:
        We(a, e), tn(e);
        break;
      case 31:
        We(a, e), tn(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, To(e, r)));
        break;
      case 13:
        We(a, e), tn(e), e.child.flags & 8192 && e.memoizedState !== null != (s !== null && s.memoizedState !== null) && (Ao = Be()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, To(e, r)));
        break;
      case 22:
        f = e.memoizedState !== null;
        var k = s !== null && s.memoizedState !== null, Z = da, st = xe;
        if (da = Z || f, xe = st || k, We(a, e), xe = st, da = Z, tn(e), r & 8192)
          t: for (a = e.stateNode, a._visibility = f ? a._visibility & -2 : a._visibility | 1, f && (s === null || k || da || xe || Ci(e)), s = null, a = e; ; ) {
            if (a.tag === 5 || a.tag === 26) {
              if (s === null) {
                k = s = a;
                try {
                  if (m = k.stateNode, f)
                    S = m.style, typeof S.setProperty == "function" ? S.setProperty("display", "none", "important") : S.display = "none";
                  else {
                    E = k.stateNode;
                    var rt = k.memoizedProps.style, Q = rt != null && rt.hasOwnProperty("display") ? rt.display : null;
                    E.style.display = Q == null || typeof Q == "boolean" ? "" : ("" + Q).trim();
                  }
                } catch (vt) {
                  Gt(k, k.return, vt);
                }
              }
            } else if (a.tag === 6) {
              if (s === null) {
                k = a;
                try {
                  k.stateNode.nodeValue = f ? "" : k.memoizedProps;
                } catch (vt) {
                  Gt(k, k.return, vt);
                }
              }
            } else if (a.tag === 18) {
              if (s === null) {
                k = a;
                try {
                  var W = k.stateNode;
                  f ? Hy(W, !0) : Hy(k.stateNode, !1);
                } catch (vt) {
                  Gt(k, k.return, vt);
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
        r & 4 && (r = e.updateQueue, r !== null && (s = r.retryQueue, s !== null && (r.retryQueue = null, To(e, s))));
        break;
      case 19:
        We(a, e), tn(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, To(e, r)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        We(a, e), tn(e);
    }
  }
  function tn(e) {
    var a = e.flags;
    if (a & 2) {
      try {
        for (var s, r = e.return; r !== null; ) {
          if (Y1(r)) {
            s = r;
            break;
          }
          r = r.return;
        }
        if (s == null) throw Error(l(160));
        switch (s.tag) {
          case 27:
            var f = s.stateNode, m = Of(e);
            Co(e, m, f);
            break;
          case 5:
            var S = s.stateNode;
            s.flags & 32 && (Ji(S, ""), s.flags &= -33);
            var E = Of(e);
            Co(e, E, S);
            break;
          case 3:
          case 4:
            var k = s.stateNode.containerInfo, Z = Of(e);
            Lf(
              e,
              Z,
              k
            );
            break;
          default:
            throw Error(l(161));
        }
      } catch (st) {
        Gt(e, e.return, st);
      }
      e.flags &= -3;
    }
    a & 4096 && (e.flags &= -4097);
  }
  function J1(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var a = e;
        J1(a), a.tag === 5 && a.flags & 1024 && a.stateNode.reset(), e = e.sibling;
      }
  }
  function ma(e, a) {
    if (a.subtreeFlags & 8772)
      for (a = a.child; a !== null; )
        X1(e, a.alternate, a), a = a.sibling;
  }
  function Ci(e) {
    for (e = e.child; e !== null; ) {
      var a = e;
      switch (a.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          $a(4, a, a.return), Ci(a);
          break;
        case 1:
          Yn(a, a.return);
          var s = a.stateNode;
          typeof s.componentWillUnmount == "function" && H1(
            a,
            a.return,
            s
          ), Ci(a);
          break;
        case 27:
          kl(a.stateNode);
        case 26:
        case 5:
          Yn(a, a.return), Ci(a);
          break;
        case 22:
          a.memoizedState === null && Ci(a);
          break;
        case 30:
          Ci(a);
          break;
        default:
          Ci(a);
      }
      e = e.sibling;
    }
  }
  function pa(e, a, s) {
    for (s = s && (a.subtreeFlags & 8772) !== 0, a = a.child; a !== null; ) {
      var r = a.alternate, f = e, m = a, S = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          pa(
            f,
            m,
            s
          ), Al(4, m);
          break;
        case 1:
          if (pa(
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
            var E = r.stateNode;
            try {
              var k = f.shared.hiddenCallbacks;
              if (k !== null)
                for (f.shared.hiddenCallbacks = null, f = 0; f < k.length; f++)
                  _0(k[f], E);
            } catch (Z) {
              Gt(r, r.return, Z);
            }
          }
          s && S & 64 && U1(m), El(m, m.return);
          break;
        case 27:
          P1(m);
        case 26:
        case 5:
          pa(
            f,
            m,
            s
          ), s && r === null && S & 4 && q1(m), El(m, m.return);
          break;
        case 12:
          pa(
            f,
            m,
            s
          );
          break;
        case 31:
          pa(
            f,
            m,
            s
          ), s && S & 4 && Q1(f, m);
          break;
        case 13:
          pa(
            f,
            m,
            s
          ), s && S & 4 && F1(f, m);
          break;
        case 22:
          m.memoizedState === null && pa(
            f,
            m,
            s
          ), El(m, m.return);
          break;
        case 30:
          break;
        default:
          pa(
            f,
            m,
            s
          );
      }
      a = a.sibling;
    }
  }
  function kf(e, a) {
    var s = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (s = e.memoizedState.cachePool.pool), e = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (e = a.memoizedState.cachePool.pool), e !== s && (e != null && e.refCount++, s != null && hl(s));
  }
  function Bf(e, a) {
    e = null, a.alternate !== null && (e = a.alternate.memoizedState.cache), a = a.memoizedState.cache, a !== e && (a.refCount++, e != null && hl(e));
  }
  function Rn(e, a, s, r) {
    if (a.subtreeFlags & 10256)
      for (a = a.child; a !== null; )
        W1(
          e,
          a,
          s,
          r
        ), a = a.sibling;
  }
  function W1(e, a, s, r) {
    var f = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Rn(
          e,
          a,
          s,
          r
        ), f & 2048 && Al(9, a);
        break;
      case 1:
        Rn(
          e,
          a,
          s,
          r
        );
        break;
      case 3:
        Rn(
          e,
          a,
          s,
          r
        ), f & 2048 && (e = null, a.alternate !== null && (e = a.alternate.memoizedState.cache), a = a.memoizedState.cache, a !== e && (a.refCount++, e != null && hl(e)));
        break;
      case 12:
        if (f & 2048) {
          Rn(
            e,
            a,
            s,
            r
          ), e = a.stateNode;
          try {
            var m = a.memoizedProps, S = m.id, E = m.onPostCommit;
            typeof E == "function" && E(
              S,
              a.alternate === null ? "mount" : "update",
              e.passiveEffectDuration,
              -0
            );
          } catch (k) {
            Gt(a, a.return, k);
          }
        } else
          Rn(
            e,
            a,
            s,
            r
          );
        break;
      case 31:
        Rn(
          e,
          a,
          s,
          r
        );
        break;
      case 13:
        Rn(
          e,
          a,
          s,
          r
        );
        break;
      case 23:
        break;
      case 22:
        m = a.stateNode, S = a.alternate, a.memoizedState !== null ? m._visibility & 2 ? Rn(
          e,
          a,
          s,
          r
        ) : Ml(e, a) : m._visibility & 2 ? Rn(
          e,
          a,
          s,
          r
        ) : (m._visibility |= 2, vs(
          e,
          a,
          s,
          r,
          (a.subtreeFlags & 10256) !== 0 || !1
        )), f & 2048 && kf(S, a);
        break;
      case 24:
        Rn(
          e,
          a,
          s,
          r
        ), f & 2048 && Bf(a.alternate, a);
        break;
      default:
        Rn(
          e,
          a,
          s,
          r
        );
    }
  }
  function vs(e, a, s, r, f) {
    for (f = f && ((a.subtreeFlags & 10256) !== 0 || !1), a = a.child; a !== null; ) {
      var m = e, S = a, E = s, k = r, Z = S.flags;
      switch (S.tag) {
        case 0:
        case 11:
        case 15:
          vs(
            m,
            S,
            E,
            k,
            f
          ), Al(8, S);
          break;
        case 23:
          break;
        case 22:
          var st = S.stateNode;
          S.memoizedState !== null ? st._visibility & 2 ? vs(
            m,
            S,
            E,
            k,
            f
          ) : Ml(
            m,
            S
          ) : (st._visibility |= 2, vs(
            m,
            S,
            E,
            k,
            f
          )), f && Z & 2048 && kf(
            S.alternate,
            S
          );
          break;
        case 24:
          vs(
            m,
            S,
            E,
            k,
            f
          ), f && Z & 2048 && Bf(S.alternate, S);
          break;
        default:
          vs(
            m,
            S,
            E,
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
            Ml(s, r), f & 2048 && kf(
              r.alternate,
              r
            );
            break;
          case 24:
            Ml(s, r), f & 2048 && Bf(r.alternate, r);
            break;
          default:
            Ml(s, r);
        }
        a = a.sibling;
      }
  }
  var _l = 8192;
  function bs(e, a, s) {
    if (e.subtreeFlags & _l)
      for (e = e.child; e !== null; )
        ty(
          e,
          a,
          s
        ), e = e.sibling;
  }
  function ty(e, a, s) {
    switch (e.tag) {
      case 26:
        bs(
          e,
          a,
          s
        ), e.flags & _l && e.memoizedState !== null && P4(
          s,
          _n,
          e.memoizedState,
          e.memoizedProps
        );
        break;
      case 5:
        bs(
          e,
          a,
          s
        );
        break;
      case 3:
      case 4:
        var r = _n;
        _n = Vo(e.stateNode.containerInfo), bs(
          e,
          a,
          s
        ), _n = r;
        break;
      case 22:
        e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = _l, _l = 16777216, bs(
          e,
          a,
          s
        ), _l = r) : bs(
          e,
          a,
          s
        ));
        break;
      default:
        bs(
          e,
          a,
          s
        );
    }
  }
  function ey(e) {
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
          Re = r, ay(
            r,
            e
          );
        }
      ey(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        ny(e), e = e.sibling;
  }
  function ny(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Rl(e), e.flags & 2048 && $a(9, e, e.return);
        break;
      case 3:
        Rl(e);
        break;
      case 12:
        Rl(e);
        break;
      case 22:
        var a = e.stateNode;
        e.memoizedState !== null && a._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (a._visibility &= -3, jo(e)) : Rl(e);
        break;
      default:
        Rl(e);
    }
  }
  function jo(e) {
    var a = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (a !== null)
        for (var s = 0; s < a.length; s++) {
          var r = a[s];
          Re = r, ay(
            r,
            e
          );
        }
      ey(e);
    }
    for (e = e.child; e !== null; ) {
      switch (a = e, a.tag) {
        case 0:
        case 11:
        case 15:
          $a(8, a, a.return), jo(a);
          break;
        case 22:
          s = a.stateNode, s._visibility & 2 && (s._visibility &= -3, jo(a));
          break;
        default:
          jo(a);
      }
      e = e.sibling;
    }
  }
  function ay(e, a) {
    for (; Re !== null; ) {
      var s = Re;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          $a(8, s, a);
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
      if (r = s.child, r !== null) r.return = s, Re = r;
      else
        t: for (s = e; Re !== null; ) {
          r = Re;
          var f = r.sibling, m = r.return;
          if (K1(r), r === s) {
            Re = null;
            break t;
          }
          if (f !== null) {
            f.return = m, Re = f;
            break t;
          }
          Re = m;
        }
    }
  }
  var s4 = {
    getCacheForType: function(e) {
      var a = Oe(ge), s = a.data.get(e);
      return s === void 0 && (s = e(), a.data.set(e, s)), s;
    },
    cacheSignal: function() {
      return Oe(ge).controller.signal;
    }
  }, l4 = typeof WeakMap == "function" ? WeakMap : Map, qt = 0, Jt = null, Dt = null, Ot = 0, Pt = 0, un = null, ka = !1, xs = !1, Vf = !1, ya = 0, re = 0, Ba = 0, Ti = 0, zf = 0, fn = 0, Ss = 0, Dl = null, en = null, Uf = !1, Ao = 0, iy = 0, Eo = 1 / 0, Mo = null, Va = null, je = 0, za = null, ws = null, ga = 0, Hf = 0, qf = null, sy = null, Nl = 0, Yf = null;
  function dn() {
    return (qt & 2) !== 0 && Ot !== 0 ? Ot & -Ot : $.T !== null ? Qf() : ta();
  }
  function ly() {
    if (fn === 0)
      if ((Ot & 536870912) === 0 || kt) {
        var e = Yi;
        Yi <<= 1, (Yi & 3932160) === 0 && (Yi = 262144), fn = e;
      } else fn = 536870912;
    return e = on.current, e !== null && (e.flags |= 32), fn;
  }
  function nn(e, a, s) {
    (e === Jt && (Pt === 2 || Pt === 9) || e.cancelPendingCommit !== null) && (Cs(e, 0), Ua(
      e,
      Ot,
      fn,
      !1
    )), Te(e, s), ((qt & 2) === 0 || e !== Jt) && (e === Jt && ((qt & 2) === 0 && (Ti |= s), re === 4 && Ua(
      e,
      Ot,
      fn,
      !1
    )), Pn(e));
  }
  function ry(e, a, s) {
    if ((qt & 6) !== 0) throw Error(l(327));
    var r = !s && (a & 127) === 0 && (a & e.expiredLanes) === 0 || ri(e, a), f = r ? c4(e, a) : Gf(e, a, !0), m = r;
    do {
      if (f === 0) {
        xs && !r && Ua(e, a, 0, !1);
        break;
      } else {
        if (s = e.current.alternate, m && !r4(s)) {
          f = Gf(e, a, !1), m = !1;
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
              var E = e;
              f = Dl;
              var k = E.current.memoizedState.isDehydrated;
              if (k && (Cs(E, S).flags |= 256), S = Gf(
                E,
                S,
                !1
              ), S !== 2) {
                if (Vf && !k) {
                  E.errorRecoveryDisabledLanes |= m, Ti |= m, f = 4;
                  break t;
                }
                m = en, en = f, m !== null && (en === null ? en = m : en.push.apply(
                  en,
                  m
                ));
              }
              f = S;
            }
            if (m = !1, f !== 2) continue;
          }
        }
        if (f === 1) {
          Cs(e, 0), Ua(e, a, 0, !0);
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
              Ua(
                r,
                a,
                fn,
                !ka
              );
              break t;
            case 2:
              en = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(l(329));
          }
          if ((a & 62914560) === a && (f = Ao + 300 - Be(), 10 < f)) {
            if (Ua(
              r,
              a,
              fn,
              !ka
            ), Gi(r, 0, !0) !== 0) break t;
            ga = a, r.timeoutHandle = Vy(
              oy.bind(
                null,
                r,
                s,
                en,
                Mo,
                Uf,
                a,
                fn,
                Ti,
                Ss,
                ka,
                m,
                "Throttled",
                -0,
                0
              ),
              f
            );
            break t;
          }
          oy(
            r,
            s,
            en,
            Mo,
            Uf,
            a,
            fn,
            Ti,
            Ss,
            ka,
            m,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Pn(e);
  }
  function oy(e, a, s, r, f, m, S, E, k, Z, st, rt, Q, W) {
    if (e.timeoutHandle = -1, rt = a.subtreeFlags, rt & 8192 || (rt & 16785408) === 16785408) {
      rt = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: na
      }, ty(
        a,
        m,
        rt
      );
      var vt = (m & 62914560) === m ? Ao - Be() : (m & 4194048) === m ? iy - Be() : 0;
      if (vt = G4(
        rt,
        vt
      ), vt !== null) {
        ga = m, e.cancelPendingCommit = vt(
          yy.bind(
            null,
            e,
            a,
            m,
            s,
            r,
            f,
            S,
            E,
            k,
            st,
            rt,
            null,
            Q,
            W
          )
        ), Ua(e, m, S, !Z);
        return;
      }
    }
    yy(
      e,
      a,
      m,
      s,
      r,
      f,
      S,
      E,
      k
    );
  }
  function r4(e) {
    for (var a = e; ; ) {
      var s = a.tag;
      if ((s === 0 || s === 11 || s === 15) && a.flags & 16384 && (s = a.updateQueue, s !== null && (s = s.stores, s !== null)))
        for (var r = 0; r < s.length; r++) {
          var f = s[r], m = f.getSnapshot;
          f = f.value;
          try {
            if (!ln(m(), f)) return !1;
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
  function Ua(e, a, s, r) {
    a &= ~zf, a &= ~Ti, e.suspendedLanes |= a, e.pingedLanes &= ~a, r && (e.warmLanes |= a), r = e.expirationTimes;
    for (var f = a; 0 < f; ) {
      var m = 31 - Ye(f), S = 1 << m;
      r[m] = -1, f &= ~S;
    }
    s !== 0 && Me(e, s, a);
  }
  function _o() {
    return (qt & 6) === 0 ? (Ol(0), !1) : !0;
  }
  function Pf() {
    if (Dt !== null) {
      if (Pt === 0)
        var e = Dt.return;
      else
        e = Dt, la = pi = null, lf(e), hs = null, pl = 0, e = Dt;
      for (; e !== null; )
        z1(e.alternate, e), e = e.return;
      Dt = null;
    }
  }
  function Cs(e, a) {
    var s = e.timeoutHandle;
    s !== -1 && (e.timeoutHandle = -1, E4(s)), s = e.cancelPendingCommit, s !== null && (e.cancelPendingCommit = null, s()), ga = 0, Pf(), Jt = e, Dt = s = ia(e.current, null), Ot = a, Pt = 0, un = null, ka = !1, xs = ri(e, a), Vf = !1, Ss = fn = zf = Ti = Ba = re = 0, en = Dl = null, Uf = !1, (a & 8) !== 0 && (a |= a & 32);
    var r = e.entangledLanes;
    if (r !== 0)
      for (e = e.entanglements, r &= a; 0 < r; ) {
        var f = 31 - Ye(r), m = 1 << f;
        a |= e[f], r &= ~m;
      }
    return ya = a, Qr(), s;
  }
  function cy(e, a) {
    _t = null, $.H = Cl, a === ds || a === ao ? (a = j0(), Pt = 3) : a === Ku ? (a = j0(), Pt = 4) : Pt = a === wf ? 8 : a !== null && typeof a == "object" && typeof a.then == "function" ? 6 : 1, un = a, Dt === null && (re = 1, vo(
      e,
      gn(a, e.current)
    ));
  }
  function uy() {
    var e = on.current;
    return e === null ? !0 : (Ot & 4194048) === Ot ? Sn === null : (Ot & 62914560) === Ot || (Ot & 536870912) !== 0 ? e === Sn : !1;
  }
  function fy() {
    var e = $.H;
    return $.H = Cl, e === null ? Cl : e;
  }
  function dy() {
    var e = $.A;
    return $.A = s4, e;
  }
  function Ro() {
    re = 4, ka || (Ot & 4194048) !== Ot && on.current !== null || (xs = !0), (Ba & 134217727) === 0 && (Ti & 134217727) === 0 || Jt === null || Ua(
      Jt,
      Ot,
      fn,
      !1
    );
  }
  function Gf(e, a, s) {
    var r = qt;
    qt |= 2;
    var f = fy(), m = dy();
    (Jt !== e || Ot !== a) && (Mo = null, Cs(e, a)), a = !1;
    var S = re;
    t: do
      try {
        if (Pt !== 0 && Dt !== null) {
          var E = Dt, k = un;
          switch (Pt) {
            case 8:
              Pf(), S = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              on.current === null && (a = !0);
              var Z = Pt;
              if (Pt = 0, un = null, Ts(e, E, k, Z), s && xs) {
                S = 0;
                break t;
              }
              break;
            default:
              Z = Pt, Pt = 0, un = null, Ts(e, E, k, Z);
          }
        }
        o4(), S = re;
        break;
      } catch (st) {
        cy(e, st);
      }
    while (!0);
    return a && e.shellSuspendCounter++, la = pi = null, qt = r, $.H = f, $.A = m, Dt === null && (Jt = null, Ot = 0, Qr()), S;
  }
  function o4() {
    for (; Dt !== null; ) hy(Dt);
  }
  function c4(e, a) {
    var s = qt;
    qt |= 2;
    var r = fy(), f = dy();
    Jt !== e || Ot !== a ? (Mo = null, Eo = Be() + 500, Cs(e, a)) : xs = ri(
      e,
      a
    );
    t: do
      try {
        if (Pt !== 0 && Dt !== null) {
          a = Dt;
          var m = un;
          e: switch (Pt) {
            case 1:
              Pt = 0, un = null, Ts(e, a, m, 1);
              break;
            case 2:
            case 9:
              if (C0(m)) {
                Pt = 0, un = null, my(a);
                break;
              }
              a = function() {
                Pt !== 2 && Pt !== 9 || Jt !== e || (Pt = 7), Pn(e);
              }, m.then(a, a);
              break t;
            case 3:
              Pt = 7;
              break t;
            case 4:
              Pt = 5;
              break t;
            case 7:
              C0(m) ? (Pt = 0, un = null, my(a)) : (Pt = 0, un = null, Ts(e, a, m, 7));
              break;
            case 5:
              var S = null;
              switch (Dt.tag) {
                case 26:
                  S = Dt.memoizedState;
                case 5:
                case 27:
                  var E = Dt;
                  if (S ? Wy(S) : E.stateNode.complete) {
                    Pt = 0, un = null;
                    var k = E.sibling;
                    if (k !== null) Dt = k;
                    else {
                      var Z = E.return;
                      Z !== null ? (Dt = Z, Do(Z)) : Dt = null;
                    }
                    break e;
                  }
              }
              Pt = 0, un = null, Ts(e, a, m, 5);
              break;
            case 6:
              Pt = 0, un = null, Ts(e, a, m, 6);
              break;
            case 8:
              Pf(), re = 6;
              break t;
            default:
              throw Error(l(462));
          }
        }
        u4();
        break;
      } catch (st) {
        cy(e, st);
      }
    while (!0);
    return la = pi = null, $.H = r, $.A = f, qt = s, Dt !== null ? 0 : (Jt = null, Ot = 0, Qr(), re);
  }
  function u4() {
    for (; Dt !== null && !In(); )
      hy(Dt);
  }
  function hy(e) {
    var a = B1(e.alternate, e, ya);
    e.memoizedProps = e.pendingProps, a === null ? Do(e) : Dt = a;
  }
  function my(e) {
    var a = e, s = a.alternate;
    switch (a.tag) {
      case 15:
      case 0:
        a = D1(
          s,
          a,
          a.pendingProps,
          a.type,
          void 0,
          Ot
        );
        break;
      case 11:
        a = D1(
          s,
          a,
          a.pendingProps,
          a.type.render,
          a.ref,
          Ot
        );
        break;
      case 5:
        lf(a);
      default:
        z1(s, a), a = Dt = d0(a, ya), a = B1(s, a, ya);
    }
    e.memoizedProps = e.pendingProps, a === null ? Do(e) : Dt = a;
  }
  function Ts(e, a, s, r) {
    la = pi = null, lf(a), hs = null, pl = 0;
    var f = a.return;
    try {
      if (Jw(
        e,
        f,
        a,
        s,
        Ot
      )) {
        re = 1, vo(
          e,
          gn(s, e.current)
        ), Dt = null;
        return;
      }
    } catch (m) {
      if (f !== null) throw Dt = f, m;
      re = 1, vo(
        e,
        gn(s, e.current)
      ), Dt = null;
      return;
    }
    a.flags & 32768 ? (kt || r === 1 ? e = !0 : xs || (Ot & 536870912) !== 0 ? e = !1 : (ka = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = on.current, r !== null && r.tag === 13 && (r.flags |= 16384))), py(a, e)) : Do(a);
  }
  function Do(e) {
    var a = e;
    do {
      if ((a.flags & 32768) !== 0) {
        py(
          a,
          ka
        );
        return;
      }
      e = a.return;
      var s = e4(
        a.alternate,
        a,
        ya
      );
      if (s !== null) {
        Dt = s;
        return;
      }
      if (a = a.sibling, a !== null) {
        Dt = a;
        return;
      }
      Dt = a = e;
    } while (a !== null);
    re === 0 && (re = 5);
  }
  function py(e, a) {
    do {
      var s = n4(e.alternate, e);
      if (s !== null) {
        s.flags &= 32767, Dt = s;
        return;
      }
      if (s = e.return, s !== null && (s.flags |= 32768, s.subtreeFlags = 0, s.deletions = null), !a && (e = e.sibling, e !== null)) {
        Dt = e;
        return;
      }
      Dt = e = s;
    } while (e !== null);
    re = 6, Dt = null;
  }
  function yy(e, a, s, r, f, m, S, E, k) {
    e.cancelPendingCommit = null;
    do
      No();
    while (je !== 0);
    if ((qt & 6) !== 0) throw Error(l(327));
    if (a !== null) {
      if (a === e.current) throw Error(l(177));
      if (m = a.lanes | a.childLanes, m |= Nu, Vt(
        e,
        s,
        m,
        S,
        E,
        k
      ), e === Jt && (Dt = Jt = null, Ot = 0), ws = a, za = e, ga = s, Hf = m, qf = f, sy = r, (a.subtreeFlags & 10256) !== 0 || (a.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, m4(ai, function() {
        return Sy(), null;
      })) : (e.callbackNode = null, e.callbackPriority = 0), r = (a.flags & 13878) !== 0, (a.subtreeFlags & 13878) !== 0 || r) {
        r = $.T, $.T = null, f = X.p, X.p = 2, S = qt, qt |= 4;
        try {
          a4(e, a, s);
        } finally {
          qt = S, X.p = f, $.T = r;
        }
      }
      je = 1, gy(), vy(), by();
    }
  }
  function gy() {
    if (je === 1) {
      je = 0;
      var e = za, a = ws, s = (a.flags & 13878) !== 0;
      if ((a.subtreeFlags & 13878) !== 0 || s) {
        s = $.T, $.T = null;
        var r = X.p;
        X.p = 2;
        var f = qt;
        qt |= 4;
        try {
          I1(a, e);
          var m = ad, S = a0(e.containerInfo), E = m.focusedElem, k = m.selectionRange;
          if (S !== E && E && E.ownerDocument && n0(
            E.ownerDocument.documentElement,
            E
          )) {
            if (k !== null && Eu(E)) {
              var Z = k.start, st = k.end;
              if (st === void 0 && (st = Z), "selectionStart" in E)
                E.selectionStart = Z, E.selectionEnd = Math.min(
                  st,
                  E.value.length
                );
              else {
                var rt = E.ownerDocument || document, Q = rt && rt.defaultView || window;
                if (Q.getSelection) {
                  var W = Q.getSelection(), vt = E.textContent.length, Ct = Math.min(k.start, vt), Zt = k.end === void 0 ? Ct : Math.min(k.end, vt);
                  !W.extend && Ct > Zt && (S = Zt, Zt = Ct, Ct = S);
                  var G = e0(
                    E,
                    Ct
                  ), z = e0(
                    E,
                    Zt
                  );
                  if (G && z && (W.rangeCount !== 1 || W.anchorNode !== G.node || W.anchorOffset !== G.offset || W.focusNode !== z.node || W.focusOffset !== z.offset)) {
                    var K = rt.createRange();
                    K.setStart(G.node, G.offset), W.removeAllRanges(), Ct > Zt ? (W.addRange(K), W.extend(z.node, z.offset)) : (K.setEnd(z.node, z.offset), W.addRange(K));
                  }
                }
              }
            }
            for (rt = [], W = E; W = W.parentNode; )
              W.nodeType === 1 && rt.push({
                element: W,
                left: W.scrollLeft,
                top: W.scrollTop
              });
            for (typeof E.focus == "function" && E.focus(), E = 0; E < rt.length; E++) {
              var lt = rt[E];
              lt.element.scrollLeft = lt.left, lt.element.scrollTop = lt.top;
            }
          }
          Po = !!nd, ad = nd = null;
        } finally {
          qt = f, X.p = r, $.T = s;
        }
      }
      e.current = a, je = 2;
    }
  }
  function vy() {
    if (je === 2) {
      je = 0;
      var e = za, a = ws, s = (a.flags & 8772) !== 0;
      if ((a.subtreeFlags & 8772) !== 0 || s) {
        s = $.T, $.T = null;
        var r = X.p;
        X.p = 2;
        var f = qt;
        qt |= 4;
        try {
          X1(e, a.alternate, a);
        } finally {
          qt = f, X.p = r, $.T = s;
        }
      }
      je = 3;
    }
  }
  function by() {
    if (je === 4 || je === 3) {
      je = 0, $r();
      var e = za, a = ws, s = ga, r = sy;
      (a.subtreeFlags & 10256) !== 0 || (a.flags & 10256) !== 0 ? je = 5 : (je = 0, ws = za = null, xy(e, e.pendingLanes));
      var f = e.pendingLanes;
      if (f === 0 && (Va = null), Wn(s), a = a.stateNode, qe && typeof qe.onCommitFiberRoot == "function")
        try {
          qe.onCommitFiberRoot(
            li,
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
            var E = r[S];
            m(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          $.T = a, X.p = f;
        }
      }
      (ga & 3) !== 0 && No(), Pn(e), f = e.pendingLanes, (s & 261930) !== 0 && (f & 42) !== 0 ? e === Yf ? Nl++ : (Nl = 0, Yf = e) : Nl = 0, Ol(0);
    }
  }
  function xy(e, a) {
    (e.pooledCacheLanes &= a) === 0 && (a = e.pooledCache, a != null && (e.pooledCache = null, hl(a)));
  }
  function No() {
    return gy(), vy(), by(), Sy();
  }
  function Sy() {
    if (je !== 5) return !1;
    var e = za, a = Hf;
    Hf = 0;
    var s = Wn(ga), r = $.T, f = X.p;
    try {
      X.p = 32 > s ? 32 : s, $.T = null, s = qf, qf = null;
      var m = za, S = ga;
      if (je = 0, ws = za = null, ga = 0, (qt & 6) !== 0) throw Error(l(331));
      var E = qt;
      if (qt |= 4, ny(m.current), W1(
        m,
        m.current,
        S,
        s
      ), qt = E, Ol(0, !1), qe && typeof qe.onPostCommitFiberRoot == "function")
        try {
          qe.onPostCommitFiberRoot(li, m);
        } catch {
        }
      return !0;
    } finally {
      X.p = f, $.T = r, xy(e, a);
    }
  }
  function wy(e, a, s) {
    a = gn(s, a), a = Sf(e.stateNode, a, 2), e = Na(e, a, 2), e !== null && (Te(e, 2), Pn(e));
  }
  function Gt(e, a, s) {
    if (e.tag === 3)
      wy(e, e, s);
    else
      for (; a !== null; ) {
        if (a.tag === 3) {
          wy(
            a,
            e,
            s
          );
          break;
        } else if (a.tag === 1) {
          var r = a.stateNode;
          if (typeof a.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Va === null || !Va.has(r))) {
            e = gn(s, e), s = C1(2), r = Na(a, s, 2), r !== null && (T1(
              s,
              r,
              a,
              e
            ), Te(r, 2), Pn(r));
            break;
          }
        }
        a = a.return;
      }
  }
  function Xf(e, a, s) {
    var r = e.pingCache;
    if (r === null) {
      r = e.pingCache = new l4();
      var f = /* @__PURE__ */ new Set();
      r.set(a, f);
    } else
      f = r.get(a), f === void 0 && (f = /* @__PURE__ */ new Set(), r.set(a, f));
    f.has(s) || (Vf = !0, f.add(s), e = f4.bind(null, e, a, s), a.then(e, e));
  }
  function f4(e, a, s) {
    var r = e.pingCache;
    r !== null && r.delete(a), e.pingedLanes |= e.suspendedLanes & s, e.warmLanes &= ~s, Jt === e && (Ot & s) === s && (re === 4 || re === 3 && (Ot & 62914560) === Ot && 300 > Be() - Ao ? (qt & 2) === 0 && Cs(e, 0) : zf |= s, Ss === Ot && (Ss = 0)), Pn(e);
  }
  function Cy(e, a) {
    a === 0 && (a = Bt()), e = di(e, a), e !== null && (Te(e, a), Pn(e));
  }
  function d4(e) {
    var a = e.memoizedState, s = 0;
    a !== null && (s = a.retryLane), Cy(e, s);
  }
  function h4(e, a) {
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
    r !== null && r.delete(a), Cy(e, s);
  }
  function m4(e, a) {
    return He(e, a);
  }
  var Oo = null, js = null, Kf = !1, Lo = !1, Zf = !1, Ha = 0;
  function Pn(e) {
    e !== js && e.next === null && (js === null ? Oo = js = e : js = js.next = e), Lo = !0, Kf || (Kf = !0, y4());
  }
  function Ol(e, a) {
    if (!Zf && Lo) {
      Zf = !0;
      do
        for (var s = !1, r = Oo; r !== null; ) {
          if (e !== 0) {
            var f = r.pendingLanes;
            if (f === 0) var m = 0;
            else {
              var S = r.suspendedLanes, E = r.pingedLanes;
              m = (1 << 31 - Ye(42 | e) + 1) - 1, m &= f & ~(S & ~E), m = m & 201326741 ? m & 201326741 | 1 : m ? m | 2 : 0;
            }
            m !== 0 && (s = !0, Ey(r, m));
          } else
            m = Ot, m = Gi(
              r,
              r === Jt ? m : 0,
              r.cancelPendingCommit !== null || r.timeoutHandle !== -1
            ), (m & 3) === 0 || ri(r, m) || (s = !0, Ey(r, m));
          r = r.next;
        }
      while (s);
      Zf = !1;
    }
  }
  function p4() {
    Ty();
  }
  function Ty() {
    Lo = Kf = !1;
    var e = 0;
    Ha !== 0 && A4() && (e = Ha);
    for (var a = Be(), s = null, r = Oo; r !== null; ) {
      var f = r.next, m = jy(r, a);
      m === 0 ? (r.next = null, s === null ? Oo = f : s.next = f, f === null && (js = s)) : (s = r, (e !== 0 || (m & 3) !== 0) && (Lo = !0)), r = f;
    }
    je !== 0 && je !== 5 || Ol(e), Ha !== 0 && (Ha = 0);
  }
  function jy(e, a) {
    for (var s = e.suspendedLanes, r = e.pingedLanes, f = e.expirationTimes, m = e.pendingLanes & -62914561; 0 < m; ) {
      var S = 31 - Ye(m), E = 1 << S, k = f[S];
      k === -1 ? ((E & s) === 0 || (E & r) !== 0) && (f[S] = at(E, a)) : k <= a && (e.expiredLanes |= E), m &= ~E;
    }
    if (a = Jt, s = Ot, s = Gi(
      e,
      e === a ? s : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r = e.callbackNode, s === 0 || e === a && (Pt === 2 || Pt === 9) || e.cancelPendingCommit !== null)
      return r !== null && r !== null && Fn(r), e.callbackNode = null, e.callbackPriority = 0;
    if ((s & 3) === 0 || ri(e, s)) {
      if (a = s & -s, a === e.callbackPriority) return a;
      switch (r !== null && Fn(r), Wn(s)) {
        case 2:
        case 8:
          s = kr;
          break;
        case 32:
          s = ai;
          break;
        case 268435456:
          s = si;
          break;
        default:
          s = ai;
      }
      return r = Ay.bind(null, e), s = He(s, r), e.callbackPriority = a, e.callbackNode = s, a;
    }
    return r !== null && r !== null && Fn(r), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function Ay(e, a) {
    if (je !== 0 && je !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var s = e.callbackNode;
    if (No() && e.callbackNode !== s)
      return null;
    var r = Ot;
    return r = Gi(
      e,
      e === Jt ? r : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), r === 0 ? null : (ry(e, r, a), jy(e, Be()), e.callbackNode != null && e.callbackNode === s ? Ay.bind(null, e) : null);
  }
  function Ey(e, a) {
    if (No()) return null;
    ry(e, a, !0);
  }
  function y4() {
    M4(function() {
      (qt & 6) !== 0 ? He(
        Ws,
        p4
      ) : Ty();
    });
  }
  function Qf() {
    if (Ha === 0) {
      var e = us;
      e === 0 && (e = qi, qi <<= 1, (qi & 261888) === 0 && (qi = 256)), Ha = e;
    }
    return Ha;
  }
  function My(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Hr("" + e);
  }
  function _y(e, a) {
    var s = a.ownerDocument.createElement("input");
    return s.name = a.name, s.value = a.value, e.id && s.setAttribute("form", e.id), a.parentNode.insertBefore(s, a), e = new FormData(e), s.parentNode.removeChild(s), e;
  }
  function g4(e, a, s, r, f) {
    if (a === "submit" && s && s.stateNode === f) {
      var m = My(
        (f[Fe] || null).action
      ), S = r.submitter;
      S && (a = (a = S[Fe] || null) ? My(a.formAction) : S.getAttribute("formAction"), a !== null && (m = a, S = null));
      var E = new Gr(
        "action",
        "action",
        null,
        r,
        f
      );
      e.push({
        event: E,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (r.defaultPrevented) {
                if (Ha !== 0) {
                  var k = S ? _y(f, S) : new FormData(f);
                  pf(
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
                typeof m == "function" && (E.preventDefault(), k = S ? _y(f, S) : new FormData(f), pf(
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
  for (var Ff = 0; Ff < Du.length; Ff++) {
    var If = Du[Ff], v4 = If.toLowerCase(), b4 = If[0].toUpperCase() + If.slice(1);
    Mn(
      v4,
      "on" + b4
    );
  }
  Mn(l0, "onAnimationEnd"), Mn(r0, "onAnimationIteration"), Mn(o0, "onAnimationStart"), Mn("dblclick", "onDoubleClick"), Mn("focusin", "onFocus"), Mn("focusout", "onBlur"), Mn($w, "onTransitionRun"), Mn(kw, "onTransitionStart"), Mn(Bw, "onTransitionCancel"), Mn(c0, "onTransitionEnd"), Fi("onMouseEnter", ["mouseout", "mouseover"]), Fi("onMouseLeave", ["mouseout", "mouseover"]), Fi("onPointerEnter", ["pointerout", "pointerover"]), Fi("onPointerLeave", ["pointerout", "pointerover"]), oi(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), oi(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), oi("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), oi(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), oi(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), oi(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Ll = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), x4 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ll)
  );
  function Ry(e, a) {
    a = (a & 4) !== 0;
    for (var s = 0; s < e.length; s++) {
      var r = e[s], f = r.event;
      r = r.listeners;
      t: {
        var m = void 0;
        if (a)
          for (var S = r.length - 1; 0 <= S; S--) {
            var E = r[S], k = E.instance, Z = E.currentTarget;
            if (E = E.listener, k !== m && f.isPropagationStopped())
              break t;
            m = E, f.currentTarget = Z;
            try {
              m(f);
            } catch (st) {
              Zr(st);
            }
            f.currentTarget = null, m = k;
          }
        else
          for (S = 0; S < r.length; S++) {
            if (E = r[S], k = E.instance, Z = E.currentTarget, E = E.listener, k !== m && f.isPropagationStopped())
              break t;
            m = E, f.currentTarget = Z;
            try {
              m(f);
            } catch (st) {
              Zr(st);
            }
            f.currentTarget = null, m = k;
          }
      }
    }
  }
  function Nt(e, a) {
    var s = a[cu];
    s === void 0 && (s = a[cu] = /* @__PURE__ */ new Set());
    var r = e + "__bubble";
    s.has(r) || (Dy(a, e, 2, !1), s.add(r));
  }
  function Jf(e, a, s) {
    var r = 0;
    a && (r |= 4), Dy(
      s,
      e,
      r,
      a
    );
  }
  var $o = "_reactListening" + Math.random().toString(36).slice(2);
  function Wf(e) {
    if (!e[$o]) {
      e[$o] = !0, Tp.forEach(function(s) {
        s !== "selectionchange" && (x4.has(s) || Jf(s, !1, e), Jf(s, !0, e));
      });
      var a = e.nodeType === 9 ? e : e.ownerDocument;
      a === null || a[$o] || (a[$o] = !0, Jf("selectionchange", !1, a));
    }
  }
  function Dy(e, a, s, r) {
    switch (lg(a)) {
      case 2:
        var f = Z4;
        break;
      case 8:
        f = Q4;
        break;
      default:
        f = md;
    }
    s = f.bind(
      null,
      a,
      s,
      e
    ), f = void 0, !vu || a !== "touchstart" && a !== "touchmove" && a !== "wheel" || (f = !0), r ? f !== void 0 ? e.addEventListener(a, s, {
      capture: !0,
      passive: f
    }) : e.addEventListener(a, s, !0) : f !== void 0 ? e.addEventListener(a, s, {
      passive: f
    }) : e.addEventListener(a, s, !1);
  }
  function td(e, a, s, r, f) {
    var m = r;
    if ((a & 1) === 0 && (a & 2) === 0 && r !== null)
      t: for (; ; ) {
        if (r === null) return;
        var S = r.tag;
        if (S === 3 || S === 4) {
          var E = r.stateNode.containerInfo;
          if (E === f) break;
          if (S === 4)
            for (S = r.return; S !== null; ) {
              var k = S.tag;
              if ((k === 3 || k === 4) && S.stateNode.containerInfo === f)
                return;
              S = S.return;
            }
          for (; E !== null; ) {
            if (S = Ki(E), S === null) return;
            if (k = S.tag, k === 5 || k === 6 || k === 26 || k === 27) {
              r = m = S;
              continue t;
            }
            E = E.parentNode;
          }
        }
        r = r.return;
      }
    kp(function() {
      var Z = m, st = yu(s), rt = [];
      t: {
        var Q = u0.get(e);
        if (Q !== void 0) {
          var W = Gr, vt = e;
          switch (e) {
            case "keypress":
              if (Yr(s) === 0) break t;
            case "keydown":
            case "keyup":
              W = hw;
              break;
            case "focusin":
              vt = "focus", W = wu;
              break;
            case "focusout":
              vt = "blur", W = wu;
              break;
            case "beforeblur":
            case "afterblur":
              W = wu;
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
              W = zp;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              W = ew;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              W = yw;
              break;
            case l0:
            case r0:
            case o0:
              W = iw;
              break;
            case c0:
              W = vw;
              break;
            case "scroll":
            case "scrollend":
              W = W3;
              break;
            case "wheel":
              W = xw;
              break;
            case "copy":
            case "cut":
            case "paste":
              W = lw;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              W = Hp;
              break;
            case "toggle":
            case "beforetoggle":
              W = ww;
          }
          var Ct = (a & 4) !== 0, Zt = !Ct && (e === "scroll" || e === "scrollend"), G = Ct ? Q !== null ? Q + "Capture" : null : Q;
          Ct = [];
          for (var z = Z, K; z !== null; ) {
            var lt = z;
            if (K = lt.stateNode, lt = lt.tag, lt !== 5 && lt !== 26 && lt !== 27 || K === null || G === null || (lt = nl(z, G), lt != null && Ct.push(
              $l(z, lt, K)
            )), Zt) break;
            z = z.return;
          }
          0 < Ct.length && (Q = new W(
            Q,
            vt,
            null,
            s,
            st
          ), rt.push({ event: Q, listeners: Ct }));
        }
      }
      if ((a & 7) === 0) {
        t: {
          if (Q = e === "mouseover" || e === "pointerover", W = e === "mouseout" || e === "pointerout", Q && s !== pu && (vt = s.relatedTarget || s.fromElement) && (Ki(vt) || vt[Xi]))
            break t;
          if ((W || Q) && (Q = st.window === st ? st : (Q = st.ownerDocument) ? Q.defaultView || Q.parentWindow : window, W ? (vt = s.relatedTarget || s.toElement, W = Z, vt = vt ? Ki(vt) : null, vt !== null && (Zt = c(vt), Ct = vt.tag, vt !== Zt || Ct !== 5 && Ct !== 27 && Ct !== 6) && (vt = null)) : (W = null, vt = Z), W !== vt)) {
            if (Ct = zp, lt = "onMouseLeave", G = "onMouseEnter", z = "mouse", (e === "pointerout" || e === "pointerover") && (Ct = Hp, lt = "onPointerLeave", G = "onPointerEnter", z = "pointer"), Zt = W == null ? Q : el(W), K = vt == null ? Q : el(vt), Q = new Ct(
              lt,
              z + "leave",
              W,
              s,
              st
            ), Q.target = Zt, Q.relatedTarget = K, lt = null, Ki(st) === Z && (Ct = new Ct(
              G,
              z + "enter",
              vt,
              s,
              st
            ), Ct.target = K, Ct.relatedTarget = Zt, lt = Ct), Zt = lt, W && vt)
              e: {
                for (Ct = S4, G = W, z = vt, K = 0, lt = G; lt; lt = Ct(lt))
                  K++;
                lt = 0;
                for (var wt = z; wt; wt = Ct(wt))
                  lt++;
                for (; 0 < K - lt; )
                  G = Ct(G), K--;
                for (; 0 < lt - K; )
                  z = Ct(z), lt--;
                for (; K--; ) {
                  if (G === z || z !== null && G === z.alternate) {
                    Ct = G;
                    break e;
                  }
                  G = Ct(G), z = Ct(z);
                }
                Ct = null;
              }
            else Ct = null;
            W !== null && Ny(
              rt,
              Q,
              W,
              Ct,
              !1
            ), vt !== null && Zt !== null && Ny(
              rt,
              Zt,
              vt,
              Ct,
              !0
            );
          }
        }
        t: {
          if (Q = Z ? el(Z) : window, W = Q.nodeName && Q.nodeName.toLowerCase(), W === "select" || W === "input" && Q.type === "file")
            var Ut = Qp;
          else if (Kp(Q))
            if (Fp)
              Ut = Nw;
            else {
              Ut = Rw;
              var St = _w;
            }
          else
            W = Q.nodeName, !W || W.toLowerCase() !== "input" || Q.type !== "checkbox" && Q.type !== "radio" ? Z && mu(Z.elementType) && (Ut = Qp) : Ut = Dw;
          if (Ut && (Ut = Ut(e, Z))) {
            Zp(
              rt,
              Ut,
              s,
              st
            );
            break t;
          }
          St && St(e, Q, Z), e === "focusout" && Z && Q.type === "number" && Z.memoizedProps.value != null && hu(Q, "number", Q.value);
        }
        switch (St = Z ? el(Z) : window, e) {
          case "focusin":
            (Kp(St) || St.contentEditable === "true") && (ns = St, Mu = Z, ul = null);
            break;
          case "focusout":
            ul = Mu = ns = null;
            break;
          case "mousedown":
            _u = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            _u = !1, i0(rt, s, st);
            break;
          case "selectionchange":
            if (Lw) break;
          case "keydown":
          case "keyup":
            i0(rt, s, st);
        }
        var Rt;
        if (Tu)
          t: {
            switch (e) {
              case "compositionstart":
                var Lt = "onCompositionStart";
                break t;
              case "compositionend":
                Lt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                Lt = "onCompositionUpdate";
                break t;
            }
            Lt = void 0;
          }
        else
          es ? Gp(e, s) && (Lt = "onCompositionEnd") : e === "keydown" && s.keyCode === 229 && (Lt = "onCompositionStart");
        Lt && (qp && s.locale !== "ko" && (es || Lt !== "onCompositionStart" ? Lt === "onCompositionEnd" && es && (Rt = Bp()) : (ja = st, bu = "value" in ja ? ja.value : ja.textContent, es = !0)), St = ko(Z, Lt), 0 < St.length && (Lt = new Up(
          Lt,
          e,
          null,
          s,
          st
        ), rt.push({ event: Lt, listeners: St }), Rt ? Lt.data = Rt : (Rt = Xp(s), Rt !== null && (Lt.data = Rt)))), (Rt = Tw ? jw(e, s) : Aw(e, s)) && (Lt = ko(Z, "onBeforeInput"), 0 < Lt.length && (St = new Up(
          "onBeforeInput",
          "beforeinput",
          null,
          s,
          st
        ), rt.push({
          event: St,
          listeners: Lt
        }), St.data = Rt)), g4(
          rt,
          e,
          Z,
          s,
          st
        );
      }
      Ry(rt, a);
    });
  }
  function $l(e, a, s) {
    return {
      instance: e,
      listener: a,
      currentTarget: s
    };
  }
  function ko(e, a) {
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
  function S4(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Ny(e, a, s, r, f) {
    for (var m = a._reactName, S = []; s !== null && s !== r; ) {
      var E = s, k = E.alternate, Z = E.stateNode;
      if (E = E.tag, k !== null && k === r) break;
      E !== 5 && E !== 26 && E !== 27 || Z === null || (k = Z, f ? (Z = nl(s, m), Z != null && S.unshift(
        $l(s, Z, k)
      )) : f || (Z = nl(s, m), Z != null && S.push(
        $l(s, Z, k)
      ))), s = s.return;
    }
    S.length !== 0 && e.push({ event: a, listeners: S });
  }
  var w4 = /\r\n?/g, C4 = /\u0000|\uFFFD/g;
  function Oy(e) {
    return (typeof e == "string" ? e : "" + e).replace(w4, `
`).replace(C4, "");
  }
  function Ly(e, a) {
    return a = Oy(a), Oy(e) === a;
  }
  function Kt(e, a, s, r, f, m) {
    switch (s) {
      case "children":
        typeof r == "string" ? a === "body" || a === "textarea" && r === "" || Ji(e, r) : (typeof r == "number" || typeof r == "bigint") && a !== "body" && Ji(e, "" + r);
        break;
      case "className":
        zr(e, "class", r);
        break;
      case "tabIndex":
        zr(e, "tabindex", r);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        zr(e, s, r);
        break;
      case "style":
        Lp(e, r, m);
        break;
      case "data":
        if (a !== "object") {
          zr(e, "data", r);
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
        r = Hr("" + r), e.setAttribute(s, r);
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
        r = Hr("" + r), e.setAttribute(s, r);
        break;
      case "onClick":
        r != null && (e.onclick = na);
        break;
      case "onScroll":
        r != null && Nt("scroll", e);
        break;
      case "onScrollEnd":
        r != null && Nt("scrollend", e);
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
        s = Hr("" + r), e.setAttributeNS(
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
        Nt("beforetoggle", e), Nt("toggle", e), Vr(e, "popover", r);
        break;
      case "xlinkActuate":
        ea(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          r
        );
        break;
      case "xlinkArcrole":
        ea(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          r
        );
        break;
      case "xlinkRole":
        ea(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          r
        );
        break;
      case "xlinkShow":
        ea(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          r
        );
        break;
      case "xlinkTitle":
        ea(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          r
        );
        break;
      case "xlinkType":
        ea(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          r
        );
        break;
      case "xmlBase":
        ea(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          r
        );
        break;
      case "xmlLang":
        ea(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          r
        );
        break;
      case "xmlSpace":
        ea(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          r
        );
        break;
      case "is":
        Vr(e, "is", r);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < s.length) || s[0] !== "o" && s[0] !== "O" || s[1] !== "n" && s[1] !== "N") && (s = I3.get(s) || s, Vr(e, s, r));
    }
  }
  function ed(e, a, s, r, f, m) {
    switch (s) {
      case "style":
        Lp(e, r, m);
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
        typeof r == "string" ? Ji(e, r) : (typeof r == "number" || typeof r == "bigint") && Ji(e, "" + r);
        break;
      case "onScroll":
        r != null && Nt("scroll", e);
        break;
      case "onScrollEnd":
        r != null && Nt("scrollend", e);
        break;
      case "onClick":
        r != null && (e.onclick = na);
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
        if (!jp.hasOwnProperty(s))
          t: {
            if (s[0] === "o" && s[1] === "n" && (f = s.endsWith("Capture"), a = s.slice(2, f ? s.length - 7 : void 0), m = e[Fe] || null, m = m != null ? m[s] : null, typeof m == "function" && e.removeEventListener(a, m, f), typeof r == "function")) {
              typeof m != "function" && m !== null && (s in e ? e[s] = null : e.hasAttribute(s) && e.removeAttribute(s)), e.addEventListener(a, r, f);
              break t;
            }
            s in e ? e[s] = r : r === !0 ? e.setAttribute(s, "") : Vr(e, s, r);
          }
    }
  }
  function $e(e, a, s) {
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
        Nt("error", e), Nt("load", e);
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
        Nt("invalid", e);
        var E = m = S = f = null, k = null, Z = null;
        for (r in s)
          if (s.hasOwnProperty(r)) {
            var st = s[r];
            if (st != null)
              switch (r) {
                case "name":
                  f = st;
                  break;
                case "type":
                  S = st;
                  break;
                case "checked":
                  k = st;
                  break;
                case "defaultChecked":
                  Z = st;
                  break;
                case "value":
                  m = st;
                  break;
                case "defaultValue":
                  E = st;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (st != null)
                    throw Error(l(137, a));
                  break;
                default:
                  Kt(e, a, r, st, s, null);
              }
          }
        Rp(
          e,
          m,
          E,
          k,
          Z,
          S,
          f,
          !1
        );
        return;
      case "select":
        Nt("invalid", e), r = S = m = null;
        for (f in s)
          if (s.hasOwnProperty(f) && (E = s[f], E != null))
            switch (f) {
              case "value":
                m = E;
                break;
              case "defaultValue":
                S = E;
                break;
              case "multiple":
                r = E;
              default:
                Kt(e, a, f, E, s, null);
            }
        a = m, s = S, e.multiple = !!r, a != null ? Ii(e, !!r, a, !1) : s != null && Ii(e, !!r, s, !0);
        return;
      case "textarea":
        Nt("invalid", e), m = f = r = null;
        for (S in s)
          if (s.hasOwnProperty(S) && (E = s[S], E != null))
            switch (S) {
              case "value":
                r = E;
                break;
              case "defaultValue":
                f = E;
                break;
              case "children":
                m = E;
                break;
              case "dangerouslySetInnerHTML":
                if (E != null) throw Error(l(91));
                break;
              default:
                Kt(e, a, S, E, s, null);
            }
        Np(e, r, f, m);
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
        Nt("beforetoggle", e), Nt("toggle", e), Nt("cancel", e), Nt("close", e);
        break;
      case "iframe":
      case "object":
        Nt("load", e);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Ll.length; r++)
          Nt(Ll[r], e);
        break;
      case "image":
        Nt("error", e), Nt("load", e);
        break;
      case "details":
        Nt("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        Nt("error", e), Nt("load", e);
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
        if (mu(a)) {
          for (st in s)
            s.hasOwnProperty(st) && (r = s[st], r !== void 0 && ed(
              e,
              a,
              st,
              r,
              s,
              void 0
            ));
          return;
        }
    }
    for (E in s)
      s.hasOwnProperty(E) && (r = s[E], r != null && Kt(e, a, E, r, s, null));
  }
  function T4(e, a, s, r) {
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
        var f = null, m = null, S = null, E = null, k = null, Z = null, st = null;
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
                st = W;
                break;
              case "value":
                S = W;
                break;
              case "defaultValue":
                E = W;
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
        du(
          e,
          S,
          E,
          k,
          Z,
          st,
          m,
          f
        );
        return;
      case "select":
        W = S = E = Q = null;
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
                E = m;
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
        a = E, s = S, r = W, Q != null ? Ii(e, !!s, Q, !1) : !!r != !!s && (a != null ? Ii(e, !!s, a, !0) : Ii(e, !!s, s ? [] : "", !1));
        return;
      case "textarea":
        W = Q = null;
        for (E in s)
          if (f = s[E], s.hasOwnProperty(E) && f != null && !r.hasOwnProperty(E))
            switch (E) {
              case "value":
                break;
              case "children":
                break;
              default:
                Kt(e, a, E, null, r, f);
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
        Dp(e, Q, W);
        return;
      case "option":
        for (var vt in s)
          if (Q = s[vt], s.hasOwnProperty(vt) && Q != null && !r.hasOwnProperty(vt))
            switch (vt) {
              case "selected":
                e.selected = !1;
                break;
              default:
                Kt(
                  e,
                  a,
                  vt,
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
        if (mu(a)) {
          for (var Zt in s)
            Q = s[Zt], s.hasOwnProperty(Zt) && Q !== void 0 && !r.hasOwnProperty(Zt) && ed(
              e,
              a,
              Zt,
              void 0,
              r,
              Q
            );
          for (st in r)
            Q = r[st], W = s[st], !r.hasOwnProperty(st) || Q === W || Q === void 0 && W === void 0 || ed(
              e,
              a,
              st,
              Q,
              r,
              W
            );
          return;
        }
    }
    for (var G in s)
      Q = s[G], s.hasOwnProperty(G) && Q != null && !r.hasOwnProperty(G) && Kt(e, a, G, null, r, Q);
    for (rt in r)
      Q = r[rt], W = s[rt], !r.hasOwnProperty(rt) || Q === W || Q == null && W == null || Kt(e, a, rt, Q, r, W);
  }
  function $y(e) {
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
  function j4() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, a = 0, s = performance.getEntriesByType("resource"), r = 0; r < s.length; r++) {
        var f = s[r], m = f.transferSize, S = f.initiatorType, E = f.duration;
        if (m && E && $y(S)) {
          for (S = 0, E = f.responseEnd, r += 1; r < s.length; r++) {
            var k = s[r], Z = k.startTime;
            if (Z > E) break;
            var st = k.transferSize, rt = k.initiatorType;
            st && $y(rt) && (k = k.responseEnd, S += st * (k < E ? 1 : (E - Z) / (k - Z)));
          }
          if (--r, a += 8 * (m + S) / (f.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return a / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var nd = null, ad = null;
  function Bo(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function ky(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function By(e, a) {
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
  function id(e, a) {
    return e === "textarea" || e === "noscript" || typeof a.children == "string" || typeof a.children == "number" || typeof a.children == "bigint" || typeof a.dangerouslySetInnerHTML == "object" && a.dangerouslySetInnerHTML !== null && a.dangerouslySetInnerHTML.__html != null;
  }
  var sd = null;
  function A4() {
    var e = window.event;
    return e && e.type === "popstate" ? e === sd ? !1 : (sd = e, !0) : (sd = null, !1);
  }
  var Vy = typeof setTimeout == "function" ? setTimeout : void 0, E4 = typeof clearTimeout == "function" ? clearTimeout : void 0, zy = typeof Promise == "function" ? Promise : void 0, M4 = typeof queueMicrotask == "function" ? queueMicrotask : typeof zy < "u" ? function(e) {
    return zy.resolve(null).then(e).catch(_4);
  } : Vy;
  function _4(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function qa(e) {
    return e === "head";
  }
  function Uy(e, a) {
    var s = a, r = 0;
    do {
      var f = s.nextSibling;
      if (e.removeChild(s), f && f.nodeType === 8)
        if (s = f.data, s === "/$" || s === "/&") {
          if (r === 0) {
            e.removeChild(f), _s(a);
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
            var S = m.nextSibling, E = m.nodeName;
            m[tl] || E === "SCRIPT" || E === "STYLE" || E === "LINK" && m.rel.toLowerCase() === "stylesheet" || s.removeChild(m), m = S;
          }
        } else
          s === "body" && kl(e.ownerDocument.body);
      s = f;
    } while (s);
    _s(a);
  }
  function Hy(e, a) {
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
  function ld(e) {
    var a = e.firstChild;
    for (a && a.nodeType === 10 && (a = a.nextSibling); a; ) {
      var s = a;
      switch (a = a.nextSibling, s.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          ld(s), uu(s);
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
  function R4(e, a, s, r) {
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
  function D4(e, a, s) {
    if (a === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !s || (e = wn(e.nextSibling), e === null)) return null;
    return e;
  }
  function qy(e, a) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = wn(e.nextSibling), e === null)) return null;
    return e;
  }
  function rd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function od(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function N4(e, a) {
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
  var cd = null;
  function Yy(e) {
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
  function Py(e) {
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
  function Gy(e, a, s) {
    switch (a = Bo(s), e) {
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
    uu(e);
  }
  var Cn = /* @__PURE__ */ new Map(), Xy = /* @__PURE__ */ new Set();
  function Vo(e) {
    return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
  }
  var va = X.d;
  X.d = {
    f: O4,
    r: L4,
    D: $4,
    C: k4,
    L: B4,
    m: V4,
    X: U4,
    S: z4,
    M: H4
  };
  function O4() {
    var e = va.f(), a = _o();
    return e || a;
  }
  function L4(e) {
    var a = Zi(e);
    a !== null && a.tag === 5 && a.type === "form" ? c1(a) : va.r(e);
  }
  var As = typeof document > "u" ? null : document;
  function Ky(e, a, s) {
    var r = As;
    if (r && typeof a == "string" && a) {
      var f = pn(a);
      f = 'link[rel="' + e + '"][href="' + f + '"]', typeof s == "string" && (f += '[crossorigin="' + s + '"]'), Xy.has(f) || (Xy.add(f), e = { rel: e, crossOrigin: s, href: a }, r.querySelector(f) === null && (a = r.createElement("link"), $e(a, "link", e), _e(a), r.head.appendChild(a)));
    }
  }
  function $4(e) {
    va.D(e), Ky("dns-prefetch", e, null);
  }
  function k4(e, a) {
    va.C(e, a), Ky("preconnect", e, a);
  }
  function B4(e, a, s) {
    va.L(e, a, s);
    var r = As;
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
          m = Es(e);
          break;
        case "script":
          m = Ms(e);
      }
      Cn.has(m) || (e = v(
        {
          rel: "preload",
          href: a === "image" && s && s.imageSrcSet ? void 0 : e,
          as: a
        },
        s
      ), Cn.set(m, e), r.querySelector(f) !== null || a === "style" && r.querySelector(Bl(m)) || a === "script" && r.querySelector(Vl(m)) || (a = r.createElement("link"), $e(a, "link", e), _e(a), r.head.appendChild(a)));
    }
  }
  function V4(e, a) {
    va.m(e, a);
    var s = As;
    if (s && e) {
      var r = a && typeof a.as == "string" ? a.as : "script", f = 'link[rel="modulepreload"][as="' + pn(r) + '"][href="' + pn(e) + '"]', m = f;
      switch (r) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          m = Ms(e);
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
        r = s.createElement("link"), $e(r, "link", e), _e(r), s.head.appendChild(r);
      }
    }
  }
  function z4(e, a, s) {
    va.S(e, a, s);
    var r = As;
    if (r && e) {
      var f = Qi(r).hoistableStyles, m = Es(e);
      a = a || "default";
      var S = f.get(m);
      if (!S) {
        var E = { loading: 0, preload: null };
        if (S = r.querySelector(
          Bl(m)
        ))
          E.loading = 5;
        else {
          e = v(
            { rel: "stylesheet", href: e, "data-precedence": a },
            s
          ), (s = Cn.get(m)) && ud(e, s);
          var k = S = r.createElement("link");
          _e(k), $e(k, "link", e), k._p = new Promise(function(Z, st) {
            k.onload = Z, k.onerror = st;
          }), k.addEventListener("load", function() {
            E.loading |= 1;
          }), k.addEventListener("error", function() {
            E.loading |= 2;
          }), E.loading |= 4, zo(S, a, r);
        }
        S = {
          type: "stylesheet",
          instance: S,
          count: 1,
          state: E
        }, f.set(m, S);
      }
    }
  }
  function U4(e, a) {
    va.X(e, a);
    var s = As;
    if (s && e) {
      var r = Qi(s).hoistableScripts, f = Ms(e), m = r.get(f);
      m || (m = s.querySelector(Vl(f)), m || (e = v({ src: e, async: !0 }, a), (a = Cn.get(f)) && fd(e, a), m = s.createElement("script"), _e(m), $e(m, "link", e), s.head.appendChild(m)), m = {
        type: "script",
        instance: m,
        count: 1,
        state: null
      }, r.set(f, m));
    }
  }
  function H4(e, a) {
    va.M(e, a);
    var s = As;
    if (s && e) {
      var r = Qi(s).hoistableScripts, f = Ms(e), m = r.get(f);
      m || (m = s.querySelector(Vl(f)), m || (e = v({ src: e, async: !0, type: "module" }, a), (a = Cn.get(f)) && fd(e, a), m = s.createElement("script"), _e(m), $e(m, "link", e), s.head.appendChild(m)), m = {
        type: "script",
        instance: m,
        count: 1,
        state: null
      }, r.set(f, m));
    }
  }
  function Zy(e, a, s, r) {
    var f = (f = ct.current) ? Vo(f) : null;
    if (!f) throw Error(l(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof s.precedence == "string" && typeof s.href == "string" ? (a = Es(s.href), s = Qi(
          f
        ).hoistableStyles, r = s.get(a), r || (r = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, s.set(a, r)), r) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (s.rel === "stylesheet" && typeof s.href == "string" && typeof s.precedence == "string") {
          e = Es(s.href);
          var m = Qi(
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
          }, Cn.set(e, s), m || q4(
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
        return a = s.async, s = s.src, typeof s == "string" && a && typeof a != "function" && typeof a != "symbol" ? (a = Ms(s), s = Qi(
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
  function Es(e) {
    return 'href="' + pn(e) + '"';
  }
  function Bl(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Qy(e) {
    return v({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function q4(e, a, s, r) {
    e.querySelector('link[rel="preload"][as="style"][' + a + "]") ? r.loading = 1 : (a = e.createElement("link"), r.preload = a, a.addEventListener("load", function() {
      return r.loading |= 1;
    }), a.addEventListener("error", function() {
      return r.loading |= 2;
    }), $e(a, "link", s), _e(a), e.head.appendChild(a));
  }
  function Ms(e) {
    return '[src="' + pn(e) + '"]';
  }
  function Vl(e) {
    return "script[async]" + e;
  }
  function Fy(e, a, s) {
    if (a.count++, a.instance === null)
      switch (a.type) {
        case "style":
          var r = e.querySelector(
            'style[data-href~="' + pn(s.href) + '"]'
          );
          if (r)
            return a.instance = r, _e(r), r;
          var f = v({}, s, {
            "data-href": s.href,
            "data-precedence": s.precedence,
            href: null,
            precedence: null
          });
          return r = (e.ownerDocument || e).createElement(
            "style"
          ), _e(r), $e(r, "style", f), zo(r, s.precedence, e), a.instance = r;
        case "stylesheet":
          f = Es(s.href);
          var m = e.querySelector(
            Bl(f)
          );
          if (m)
            return a.state.loading |= 4, a.instance = m, _e(m), m;
          r = Qy(s), (f = Cn.get(f)) && ud(r, f), m = (e.ownerDocument || e).createElement("link"), _e(m);
          var S = m;
          return S._p = new Promise(function(E, k) {
            S.onload = E, S.onerror = k;
          }), $e(m, "link", r), a.state.loading |= 4, zo(m, s.precedence, e), a.instance = m;
        case "script":
          return m = Ms(s.src), (f = e.querySelector(
            Vl(m)
          )) ? (a.instance = f, _e(f), f) : (r = s, (f = Cn.get(m)) && (r = v({}, s), fd(r, f)), e = e.ownerDocument || e, f = e.createElement("script"), _e(f), $e(f, "link", r), e.head.appendChild(f), a.instance = f);
        case "void":
          return null;
        default:
          throw Error(l(443, a.type));
      }
    else
      a.type === "stylesheet" && (a.state.loading & 4) === 0 && (r = a.instance, a.state.loading |= 4, zo(r, s.precedence, e));
    return a.instance;
  }
  function zo(e, a, s) {
    for (var r = s.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), f = r.length ? r[r.length - 1] : null, m = f, S = 0; S < r.length; S++) {
      var E = r[S];
      if (E.dataset.precedence === a) m = E;
      else if (m !== f) break;
    }
    m ? m.parentNode.insertBefore(e, m.nextSibling) : (a = s.nodeType === 9 ? s.head : s, a.insertBefore(e, a.firstChild));
  }
  function ud(e, a) {
    e.crossOrigin == null && (e.crossOrigin = a.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = a.referrerPolicy), e.title == null && (e.title = a.title);
  }
  function fd(e, a) {
    e.crossOrigin == null && (e.crossOrigin = a.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = a.referrerPolicy), e.integrity == null && (e.integrity = a.integrity);
  }
  var Uo = null;
  function Iy(e, a, s) {
    if (Uo === null) {
      var r = /* @__PURE__ */ new Map(), f = Uo = /* @__PURE__ */ new Map();
      f.set(s, r);
    } else
      f = Uo, r = f.get(s), r || (r = /* @__PURE__ */ new Map(), f.set(s, r));
    if (r.has(e)) return r;
    for (r.set(e, null), s = s.getElementsByTagName(e), f = 0; f < s.length; f++) {
      var m = s[f];
      if (!(m[tl] || m[ye] || e === "link" && m.getAttribute("rel") === "stylesheet") && m.namespaceURI !== "http://www.w3.org/2000/svg") {
        var S = m.getAttribute(a) || "";
        S = e + S;
        var E = r.get(S);
        E ? E.push(m) : r.set(S, [m]);
      }
    }
    return r;
  }
  function Jy(e, a, s) {
    e = e.ownerDocument || e, e.head.insertBefore(
      s,
      a === "title" ? e.querySelector("head > title") : null
    );
  }
  function Y4(e, a, s) {
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
  function Wy(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function P4(e, a, s, r) {
    if (s.type === "stylesheet" && (typeof r.media != "string" || matchMedia(r.media).matches !== !1) && (s.state.loading & 4) === 0) {
      if (s.instance === null) {
        var f = Es(r.href), m = a.querySelector(
          Bl(f)
        );
        if (m) {
          a = m._p, a !== null && typeof a == "object" && typeof a.then == "function" && (e.count++, e = Ho.bind(e), a.then(e, e)), s.state.loading |= 4, s.instance = m, _e(m);
          return;
        }
        m = a.ownerDocument || a, r = Qy(r), (f = Cn.get(f)) && ud(r, f), m = m.createElement("link"), _e(m);
        var S = m;
        S._p = new Promise(function(E, k) {
          S.onload = E, S.onerror = k;
        }), $e(m, "link", r), s.instance = m;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(s, a), (a = s.state.preload) && (s.state.loading & 3) === 0 && (e.count++, s = Ho.bind(e), a.addEventListener("load", s), a.addEventListener("error", s));
    }
  }
  var dd = 0;
  function G4(e, a) {
    return e.stylesheets && e.count === 0 && Yo(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(s) {
      var r = setTimeout(function() {
        if (e.stylesheets && Yo(e, e.stylesheets), e.unsuspend) {
          var m = e.unsuspend;
          e.unsuspend = null, m();
        }
      }, 6e4 + a);
      0 < e.imgBytes && dd === 0 && (dd = 62500 * j4());
      var f = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Yo(e, e.stylesheets), e.unsuspend)) {
            var m = e.unsuspend;
            e.unsuspend = null, m();
          }
        },
        (e.imgBytes > dd ? 50 : 800) + a
      );
      return e.unsuspend = s, function() {
        e.unsuspend = null, clearTimeout(r), clearTimeout(f);
      };
    } : null;
  }
  function Ho() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Yo(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        this.unsuspend = null, e();
      }
    }
  }
  var qo = null;
  function Yo(e, a) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, qo = /* @__PURE__ */ new Map(), a.forEach(X4, e), qo = null, Ho.call(e));
  }
  function X4(e, a) {
    if (!(a.state.loading & 4)) {
      var s = qo.get(e);
      if (s) var r = s.get(null);
      else {
        s = /* @__PURE__ */ new Map(), qo.set(e, s);
        for (var f = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), m = 0; m < f.length; m++) {
          var S = f[m];
          (S.nodeName === "LINK" || S.getAttribute("media") !== "not all") && (s.set(S.dataset.precedence, S), r = S);
        }
        r && s.set(null, r);
      }
      f = a.instance, S = f.getAttribute("data-precedence"), m = s.get(S) || r, m === r && s.set(null, f), s.set(S, f), this.count++, r = Ho.bind(this), f.addEventListener("load", r), f.addEventListener("error", r), m ? m.parentNode.insertBefore(f, m.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(f, e.firstChild)), a.state.loading |= 4;
    }
  }
  var zl = {
    $$typeof: M,
    Provider: null,
    Consumer: null,
    _currentValue: F,
    _currentValue2: F,
    _threadCount: 0
  };
  function K4(e, a, s, r, f, m, S, E, k) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = At(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = At(0), this.hiddenUpdates = At(null), this.identifierPrefix = r, this.onUncaughtError = f, this.onCaughtError = m, this.onRecoverableError = S, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = k, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function tg(e, a, s, r, f, m, S, E, k, Z, st, rt) {
    return e = new K4(
      e,
      a,
      s,
      S,
      k,
      Z,
      st,
      rt,
      E
    ), a = 1, m === !0 && (a |= 24), m = rn(3, null, null, a), e.current = m, m.stateNode = e, a = Pu(), a.refCount++, e.pooledCache = a, a.refCount++, m.memoizedState = {
      element: r,
      isDehydrated: s,
      cache: a
    }, Zu(m), e;
  }
  function eg(e) {
    return e ? (e = ss, e) : ss;
  }
  function ng(e, a, s, r, f, m) {
    f = eg(f), r.context === null ? r.context = f : r.pendingContext = f, r = Da(a), r.payload = { element: s }, m = m === void 0 ? null : m, m !== null && (r.callback = m), s = Na(e, r, a), s !== null && (nn(s, e, a), gl(s, e, a));
  }
  function ag(e, a) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var s = e.retryLane;
      e.retryLane = s !== 0 && s < a ? s : a;
    }
  }
  function hd(e, a) {
    ag(e, a), (e = e.alternate) && ag(e, a);
  }
  function ig(e) {
    if (e.tag === 13 || e.tag === 31) {
      var a = di(e, 67108864);
      a !== null && nn(a, e, 67108864), hd(e, 67108864);
    }
  }
  function sg(e) {
    if (e.tag === 13 || e.tag === 31) {
      var a = dn();
      a = fe(a);
      var s = di(e, a);
      s !== null && nn(s, e, a), hd(e, a);
    }
  }
  var Po = !0;
  function Z4(e, a, s, r) {
    var f = $.T;
    $.T = null;
    var m = X.p;
    try {
      X.p = 2, md(e, a, s, r);
    } finally {
      X.p = m, $.T = f;
    }
  }
  function Q4(e, a, s, r) {
    var f = $.T;
    $.T = null;
    var m = X.p;
    try {
      X.p = 8, md(e, a, s, r);
    } finally {
      X.p = m, $.T = f;
    }
  }
  function md(e, a, s, r) {
    if (Po) {
      var f = pd(r);
      if (f === null)
        td(
          e,
          a,
          r,
          Go,
          s
        ), rg(e, r);
      else if (I4(
        f,
        e,
        a,
        s,
        r
      ))
        r.stopPropagation();
      else if (rg(e, r), a & 4 && -1 < F4.indexOf(e)) {
        for (; f !== null; ) {
          var m = Zi(f);
          if (m !== null)
            switch (m.tag) {
              case 3:
                if (m = m.stateNode, m.current.memoizedState.isDehydrated) {
                  var S = Jn(m.pendingLanes);
                  if (S !== 0) {
                    var E = m;
                    for (E.pendingLanes |= 2, E.entangledLanes |= 2; S; ) {
                      var k = 1 << 31 - Ye(S);
                      E.entanglements[1] |= k, S &= ~k;
                    }
                    Pn(m), (qt & 6) === 0 && (Eo = Be() + 500, Ol(0));
                  }
                }
                break;
              case 31:
              case 13:
                E = di(m, 2), E !== null && nn(E, m, 2), _o(), hd(m, 2);
            }
          if (m = pd(r), m === null && td(
            e,
            a,
            r,
            Go,
            s
          ), m === f) break;
          f = m;
        }
        f !== null && r.stopPropagation();
      } else
        td(
          e,
          a,
          r,
          null,
          s
        );
    }
  }
  function pd(e) {
    return e = yu(e), yd(e);
  }
  var Go = null;
  function yd(e) {
    if (Go = null, e = Ki(e), e !== null) {
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
    return Go = e, null;
  }
  function lg(e) {
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
        switch (wp()) {
          case Ws:
            return 2;
          case kr:
            return 8;
          case ai:
          case ii:
            return 32;
          case si:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var gd = !1, Ya = null, Pa = null, Ga = null, Ul = /* @__PURE__ */ new Map(), Hl = /* @__PURE__ */ new Map(), Xa = [], F4 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function rg(e, a) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ya = null;
        break;
      case "dragenter":
      case "dragleave":
        Pa = null;
        break;
      case "mouseover":
      case "mouseout":
        Ga = null;
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
    }, a !== null && (a = Zi(a), a !== null && ig(a)), e) : (e.eventSystemFlags |= r, a = e.targetContainers, f !== null && a.indexOf(f) === -1 && a.push(f), e);
  }
  function I4(e, a, s, r, f) {
    switch (a) {
      case "focusin":
        return Ya = ql(
          Ya,
          e,
          a,
          s,
          r,
          f
        ), !0;
      case "dragenter":
        return Pa = ql(
          Pa,
          e,
          a,
          s,
          r,
          f
        ), !0;
      case "mouseover":
        return Ga = ql(
          Ga,
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
  function og(e) {
    var a = Ki(e.target);
    if (a !== null) {
      var s = c(a);
      if (s !== null) {
        if (a = s.tag, a === 13) {
          if (a = u(s), a !== null) {
            e.blockedOn = a, Qe(e.priority, function() {
              sg(s);
            });
            return;
          }
        } else if (a === 31) {
          if (a = d(s), a !== null) {
            e.blockedOn = a, Qe(e.priority, function() {
              sg(s);
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
  function Xo(e) {
    if (e.blockedOn !== null) return !1;
    for (var a = e.targetContainers; 0 < a.length; ) {
      var s = pd(e.nativeEvent);
      if (s === null) {
        s = e.nativeEvent;
        var r = new s.constructor(
          s.type,
          s
        );
        pu = r, s.target.dispatchEvent(r), pu = null;
      } else
        return a = Zi(s), a !== null && ig(a), e.blockedOn = s, !1;
      a.shift();
    }
    return !0;
  }
  function cg(e, a, s) {
    Xo(e) && s.delete(a);
  }
  function J4() {
    gd = !1, Ya !== null && Xo(Ya) && (Ya = null), Pa !== null && Xo(Pa) && (Pa = null), Ga !== null && Xo(Ga) && (Ga = null), Ul.forEach(cg), Hl.forEach(cg);
  }
  function Ko(e, a) {
    e.blockedOn === a && (e.blockedOn = null, gd || (gd = !0, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      J4
    )));
  }
  var Zo = null;
  function ug(e) {
    Zo !== e && (Zo = e, n.unstable_scheduleCallback(
      n.unstable_NormalPriority,
      function() {
        Zo === e && (Zo = null);
        for (var a = 0; a < e.length; a += 3) {
          var s = e[a], r = e[a + 1], f = e[a + 2];
          if (typeof r != "function") {
            if (yd(r || s) === null)
              continue;
            break;
          }
          var m = Zi(s);
          m !== null && (e.splice(a, 3), a -= 3, pf(
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
  function _s(e) {
    function a(k) {
      return Ko(k, e);
    }
    Ya !== null && Ko(Ya, e), Pa !== null && Ko(Pa, e), Ga !== null && Ko(Ga, e), Ul.forEach(a), Hl.forEach(a);
    for (var s = 0; s < Xa.length; s++) {
      var r = Xa[s];
      r.blockedOn === e && (r.blockedOn = null);
    }
    for (; 0 < Xa.length && (s = Xa[0], s.blockedOn === null); )
      og(s), s.blockedOn === null && Xa.shift();
    if (s = (e.ownerDocument || e).$$reactFormReplay, s != null)
      for (r = 0; r < s.length; r += 3) {
        var f = s[r], m = s[r + 1], S = f[Fe] || null;
        if (typeof m == "function")
          S || ug(s);
        else if (S) {
          var E = null;
          if (m && m.hasAttribute("formAction")) {
            if (f = m, S = m[Fe] || null)
              E = S.formAction;
            else if (yd(f) !== null) continue;
          } else E = S.action;
          typeof E == "function" ? s[r + 1] = E : (s.splice(r, 3), r -= 3), ug(s);
        }
      }
  }
  function fg() {
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
  function vd(e) {
    this._internalRoot = e;
  }
  Qo.prototype.render = vd.prototype.render = function(e) {
    var a = this._internalRoot;
    if (a === null) throw Error(l(409));
    var s = a.current, r = dn();
    ng(s, r, e, a, null, null);
  }, Qo.prototype.unmount = vd.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var a = e.containerInfo;
      ng(e.current, 2, null, e, null, null), _o(), a[Xi] = null;
    }
  };
  function Qo(e) {
    this._internalRoot = e;
  }
  Qo.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var a = ta();
      e = { blockedOn: null, target: e, priority: a };
      for (var s = 0; s < Xa.length && a !== 0 && a < Xa[s].priority; s++) ;
      Xa.splice(s, 0, e), s === 0 && og(e);
    }
  };
  var dg = t.version;
  if (dg !== "19.2.7")
    throw Error(
      l(
        527,
        dg,
        "19.2.7"
      )
    );
  X.findDOMNode = function(e) {
    var a = e._reactInternals;
    if (a === void 0)
      throw typeof e.render == "function" ? Error(l(188)) : (e = Object.keys(e).join(","), Error(l(268, e)));
    return e = y(a), e = e !== null ? g(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var W4 = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: $,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Fo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Fo.isDisabled && Fo.supportsFiber)
      try {
        li = Fo.inject(
          W4
        ), qe = Fo;
      } catch {
      }
  }
  return Pl.createRoot = function(e, a) {
    if (!o(e)) throw Error(l(299));
    var s = !1, r = "", f = b1, m = x1, S = S1;
    return a != null && (a.unstable_strictMode === !0 && (s = !0), a.identifierPrefix !== void 0 && (r = a.identifierPrefix), a.onUncaughtError !== void 0 && (f = a.onUncaughtError), a.onCaughtError !== void 0 && (m = a.onCaughtError), a.onRecoverableError !== void 0 && (S = a.onRecoverableError)), a = tg(
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
      fg
    ), e[Xi] = a.current, Wf(e), new vd(a);
  }, Pl.hydrateRoot = function(e, a, s) {
    if (!o(e)) throw Error(l(299));
    var r = !1, f = "", m = b1, S = x1, E = S1, k = null;
    return s != null && (s.unstable_strictMode === !0 && (r = !0), s.identifierPrefix !== void 0 && (f = s.identifierPrefix), s.onUncaughtError !== void 0 && (m = s.onUncaughtError), s.onCaughtError !== void 0 && (S = s.onCaughtError), s.onRecoverableError !== void 0 && (E = s.onRecoverableError), s.formState !== void 0 && (k = s.formState)), a = tg(
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
      E,
      fg
    ), a.context = eg(null), s = a.current, r = dn(), r = fe(r), f = Da(r), f.callback = null, Na(s, f, r), s = r, a.current.lanes = s, Te(a, s), Pn(a), e[Xi] = a.current, Wf(e), new Qo(a);
  }, Pl.version = "19.2.7", Pl;
}
var wg;
function f5() {
  if (wg) return Sd.exports;
  wg = 1;
  function n() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
      } catch (t) {
        console.error(t);
      }
  }
  return n(), Sd.exports = u5(), Sd.exports;
}
var Ns = f5(), jd = { exports: {} }, Ad = {};
var Cg;
function d5() {
  if (Cg) return Ad;
  Cg = 1;
  var n = jr().__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  return Ad.c = function(t) {
    return n.H.useMemoCache(t);
  }, Ad;
}
var Tg;
function h5() {
  return Tg || (Tg = 1, jd.exports = d5()), jd.exports;
}
var jt = h5(), Ed = { exports: {} }, Md = {};
var jg;
function m5() {
  if (jg) return Md;
  jg = 1;
  var n = jr();
  function t(v, b) {
    return v === b && (v !== 0 || 1 / v === 1 / b) || v !== v && b !== b;
  }
  var i = typeof Object.is == "function" ? Object.is : t, l = n.useState, o = n.useEffect, c = n.useLayoutEffect, u = n.useDebugValue;
  function d(v, b) {
    var j = b(), w = l({ inst: { value: j, getSnapshot: b } }), C = w[0].inst, x = w[1];
    return c(
      function() {
        C.value = j, C.getSnapshot = b, p(C) && x({ inst: C });
      },
      [v, j, b]
    ), o(
      function() {
        return p(C) && x({ inst: C }), v(function() {
          p(C) && x({ inst: C });
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
  return Md.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : g, Md;
}
var Ag;
function p5() {
  return Ag || (Ag = 1, Ed.exports = m5()), Ed.exports;
}
var y5 = p5();
const g5 = l5.useInsertionEffect, v5 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", b5 = v5 ? T.useLayoutEffect : T.useEffect, x5 = g5 || b5, hb = (n) => {
  const t = T.useRef([n, (...i) => t[0](...i)]).current;
  return x5(() => {
    t[0] = n;
  }), t[1];
};
function rm(n, t) {
  n.indexOf(t) === -1 && n.push(t);
}
function qs(n, t) {
  const i = n.indexOf(t);
  i > -1 && n.splice(i, 1);
}
const Zn = (n, t, i) => i > t ? t : i < n ? n : i;
let om = () => {
};
const Ia = {}, mb = (n) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(n), pb = (n) => typeof n == "object" && n !== null, yb = (n) => /^0[^.\s]+$/u.test(n);
// @__NO_SIDE_EFFECTS__
function gb(n) {
  let t;
  return () => (t === void 0 && (t = n()), t);
}
const An = /* @__NO_SIDE_EFFECTS__ */ (n) => n, Ar = (...n) => n.reduce((t, i) => (l) => i(t(l))), Ys = /* @__NO_SIDE_EFFECTS__ */ (n, t, i) => {
  const l = t - n;
  return l ? (i - n) / l : 1;
};
class cm {
  constructor() {
    this.subscriptions = [];
  }
  add(t) {
    return rm(this.subscriptions, t), () => qs(this.subscriptions, t);
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
const sn = /* @__NO_SIDE_EFFECTS__ */ (n) => n * 1e3, jn = /* @__NO_SIDE_EFFECTS__ */ (n) => n / 1e3, vb = /* @__NO_SIDE_EFFECTS__ */ (n, t) => t ? n * (1e3 / t) : 0, S5 = (n, t, i) => {
  const l = t - n;
  return ((i - n) % l + l) % l + n;
}, bb = (n, t, i) => (((1 - 3 * i + 3 * t) * n + (3 * i - 6 * t)) * n + 3 * t) * n, w5 = 1e-7, C5 = 12;
function T5(n, t, i, l, o) {
  let c, u, d = 0;
  do
    u = t + (i - t) / 2, c = bb(u, l, o) - n, c > 0 ? i = u : t = u;
  while (Math.abs(c) > w5 && ++d < C5);
  return u;
}
// @__NO_SIDE_EFFECTS__
function Er(n, t, i, l) {
  if (n === t && i === l)
    return An;
  const o = (c) => T5(c, 0, 1, n, i);
  return (c) => c === 0 || c === 1 ? c : bb(o(c), t, l);
}
const xb = /* @__NO_SIDE_EFFECTS__ */ (n) => (t) => t <= 0.5 ? n(2 * t) / 2 : (2 - n(2 * (1 - t))) / 2, um = /* @__NO_SIDE_EFFECTS__ */ (n) => (t) => 1 - n(1 - t), Sb = /* @__PURE__ */ Er(0.33, 1.53, 0.69, 0.99), fm = /* @__PURE__ */ um(Sb), wb = /* @__PURE__ */ xb(fm), Cb = (n) => n >= 1 ? 1 : (n *= 2) < 1 ? 0.5 * fm(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1))), dm = (n) => 1 - Math.sin(Math.acos(n)), Tb = /* @__PURE__ */ um(dm), jb = /* @__PURE__ */ xb(dm), j5 = /* @__PURE__ */ Er(0.42, 0, 1, 1), A5 = /* @__PURE__ */ Er(0, 0, 0.58, 1), Ab = /* @__PURE__ */ Er(0.42, 0, 0.58, 1), Eb = /* @__NO_SIDE_EFFECTS__ */ (n) => Array.isArray(n) && typeof n[0] != "number";
// @__NO_SIDE_EFFECTS__
function Mb(n, t) {
  return /* @__PURE__ */ Eb(n) ? n[S5(0, n.length, t)] : n;
}
const _b = /* @__NO_SIDE_EFFECTS__ */ (n) => Array.isArray(n) && typeof n[0] == "number", E5 = {
  linear: An,
  easeIn: j5,
  easeInOut: Ab,
  easeOut: A5,
  circIn: dm,
  circInOut: jb,
  circOut: Tb,
  backIn: fm,
  backInOut: wb,
  backOut: Sb,
  anticipate: Cb
}, M5 = (n) => typeof n == "string", Eg = (n) => {
  if (/* @__PURE__ */ _b(n)) {
    om(n.length === 4);
    const [t, i, l, o] = n;
    return /* @__PURE__ */ Er(t, i, l, o);
  } else if (M5(n))
    return E5[n];
  return n;
}, hm = T.createContext({}), mm = T.createContext({ strict: !1 }), Ps = T.createContext({
  transformPagePoint: (n) => n,
  isStatic: !1,
  reducedMotion: "never"
}), Qc = /* @__PURE__ */ T.createContext({}), Io = [
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
function _5(n) {
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
const R5 = 40;
function Rb(n, t) {
  let i = !1, l = !0;
  const o = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, c = () => i = !0, u = Io.reduce((M, _) => (M[_] = _5(c), M), {}), { setup: d, read: p, resolveKeyframes: y, preUpdate: g, update: v, preRender: b, render: j, postRender: w } = u, C = () => {
    const M = Ia.useManualTiming, _ = M ? o.timestamp : performance.now();
    i = !1, M || (o.delta = l ? 1e3 / 60 : Math.max(Math.min(_ - o.timestamp, R5), 1)), o.timestamp = _, o.isProcessing = !0, d.process(o), p.process(o), y.process(o), g.process(o), v.process(o), b.process(o), j.process(o), w.process(o), o.isProcessing = !1, i && t && (l = !1, n(C));
  }, x = () => {
    i = !0, l = !0, o.isProcessing || n(C);
  };
  return { schedule: Io.reduce((M, _) => {
    const L = u[_];
    return M[_] = (N, D = !1, V = !1) => (i || x(), L.schedule(N, D, V)), M;
  }, {}), cancel: (M) => {
    for (let _ = 0; _ < Io.length; _++)
      u[Io[_]].cancel(M);
  }, state: o, steps: u };
}
const { schedule: It, cancel: wa, state: ke, steps: _d } = /* @__PURE__ */ Rb(typeof requestAnimationFrame < "u" ? requestAnimationFrame : An, !0);
let yc;
function D5() {
  yc = void 0;
}
const Xe = {
  now: () => (yc === void 0 && Xe.set(ke.isProcessing || Ia.useManualTiming ? ke.timestamp : performance.now()), yc),
  set: (n) => {
    yc = n, queueMicrotask(D5);
  }
}, Db = (n) => (t) => typeof t == "string" && t.startsWith(n), Nb = /* @__PURE__ */ Db("--"), N5 = /* @__PURE__ */ Db("var(--"), pm = (n) => N5(n) ? O5.test(n.split("/*")[0].trim()) : !1, O5 = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function Mg(n) {
  return typeof n != "string" ? !1 : n.split("/*")[0].includes("var(--");
}
const Fs = {
  test: (n) => typeof n == "number",
  parse: parseFloat,
  transform: (n) => n
}, mr = {
  ...Fs,
  transform: (n) => Zn(0, 1, n)
}, Jo = {
  ...Fs,
  default: 1
}, tr = (n) => Math.round(n * 1e5) / 1e5, ym = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function L5(n) {
  return n == null;
}
const $5 = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, gm = (n, t) => (i) => !!(typeof i == "string" && $5.test(i) && i.startsWith(n) || t && !L5(i) && Object.prototype.hasOwnProperty.call(i, t)), Ob = (n, t, i) => (l) => {
  if (typeof l != "string")
    return l;
  const [o, c, u, d] = l.match(ym);
  return {
    [n]: parseFloat(o),
    [t]: parseFloat(c),
    [i]: parseFloat(u),
    alpha: d !== void 0 ? parseFloat(d) : 1
  };
}, k5 = (n) => Zn(0, 255, n), Rd = {
  ...Fs,
  transform: (n) => Math.round(k5(n))
}, Oi = {
  test: /* @__PURE__ */ gm("rgb", "red"),
  parse: /* @__PURE__ */ Ob("red", "green", "blue"),
  transform: ({ red: n, green: t, blue: i, alpha: l = 1 }) => "rgba(" + Rd.transform(n) + ", " + Rd.transform(t) + ", " + Rd.transform(i) + ", " + tr(mr.transform(l)) + ")"
};
function B5(n) {
  let t = "", i = "", l = "", o = "";
  return n.length > 5 ? (t = n.substring(1, 3), i = n.substring(3, 5), l = n.substring(5, 7), o = n.substring(7, 9)) : (t = n.substring(1, 2), i = n.substring(2, 3), l = n.substring(3, 4), o = n.substring(4, 5), t += t, i += i, l += l, o += o), {
    red: parseInt(t, 16),
    green: parseInt(i, 16),
    blue: parseInt(l, 16),
    alpha: o ? parseInt(o, 16) / 255 : 1
  };
}
const fh = {
  test: /* @__PURE__ */ gm("#"),
  parse: B5,
  transform: Oi.transform
}, Mr = /* @__NO_SIDE_EFFECTS__ */ (n) => ({
  test: (t) => typeof t == "string" && t.endsWith(n) && t.split(" ").length === 1,
  parse: parseFloat,
  transform: (t) => `${t}${n}`
}), ba = /* @__PURE__ */ Mr("deg"), Kn = /* @__PURE__ */ Mr("%"), bt = /* @__PURE__ */ Mr("px"), V5 = /* @__PURE__ */ Mr("vh"), z5 = /* @__PURE__ */ Mr("vw"), _g = {
  ...Kn,
  parse: (n) => Kn.parse(n) / 100,
  transform: (n) => Kn.transform(n * 100)
}, Ls = {
  test: /* @__PURE__ */ gm("hsl", "hue"),
  parse: /* @__PURE__ */ Ob("hue", "saturation", "lightness"),
  transform: ({ hue: n, saturation: t, lightness: i, alpha: l = 1 }) => "hsla(" + Math.round(n) + ", " + Kn.transform(tr(t)) + ", " + Kn.transform(tr(i)) + ", " + tr(mr.transform(l)) + ")"
}, we = {
  test: (n) => Oi.test(n) || fh.test(n) || Ls.test(n),
  parse: (n) => Oi.test(n) ? Oi.parse(n) : Ls.test(n) ? Ls.parse(n) : fh.parse(n),
  transform: (n) => typeof n == "string" ? n : n.hasOwnProperty("red") ? Oi.transform(n) : Ls.transform(n),
  getAnimatableNone: (n) => {
    const t = we.parse(n);
    return t.alpha = 0, we.transform(t);
  }
}, U5 = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function H5(n) {
  return isNaN(n) && typeof n == "string" && (n.match(ym)?.length || 0) + (n.match(U5)?.length || 0) > 0;
}
const Lb = "number", $b = "color", q5 = "var", Y5 = "var(", Rg = "${}", P5 = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Gs(n) {
  const t = n.toString(), i = [], l = {
    color: [],
    number: [],
    var: []
  }, o = [];
  let c = 0;
  const d = t.replace(P5, (p) => (we.test(p) ? (l.color.push(c), o.push($b), i.push(we.parse(p))) : p.startsWith(Y5) ? (l.var.push(c), o.push(q5), i.push(p)) : (l.number.push(c), o.push(Lb), i.push(parseFloat(p))), ++c, Rg)).split(Rg);
  return { values: i, split: d, indexes: l, types: o };
}
function G5(n) {
  return Gs(n).values;
}
function kb({ split: n, types: t }) {
  const i = n.length;
  return (l) => {
    let o = "";
    for (let c = 0; c < i; c++)
      if (o += n[c], l[c] !== void 0) {
        const u = t[c];
        u === Lb ? o += tr(l[c]) : u === $b ? o += we.transform(l[c]) : o += l[c];
      }
    return o;
  };
}
function X5(n) {
  return kb(Gs(n));
}
const K5 = (n) => typeof n == "number" ? 0 : we.test(n) ? we.getAnimatableNone(n) : n, Z5 = (n, t) => typeof n == "number" ? t?.trim().endsWith("/") ? n : 0 : K5(n);
function Q5(n) {
  const t = Gs(n);
  return kb(t)(t.values.map((l, o) => Z5(l, t.split[o])));
}
const Bn = {
  test: H5,
  parse: G5,
  createTransformer: X5,
  getAnimatableNone: Q5
};
function Dd(n, t, i) {
  return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? n + (t - n) * 6 * i : i < 1 / 2 ? t : i < 2 / 3 ? n + (t - n) * (2 / 3 - i) * 6 : n;
}
function F5({ hue: n, saturation: t, lightness: i, alpha: l }) {
  n /= 360, t /= 100, i /= 100;
  let o = 0, c = 0, u = 0;
  if (!t)
    o = c = u = i;
  else {
    const d = i < 0.5 ? i * (1 + t) : i + t - i * t, p = 2 * i - d;
    o = Dd(p, d, n + 1 / 3), c = Dd(p, d, n), u = Dd(p, d, n - 1 / 3);
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(c * 255),
    blue: Math.round(u * 255),
    alpha: l
  };
}
function Nc(n, t) {
  return (i) => i > 0 ? t : n;
}
const Ft = (n, t, i) => n + (t - n) * i, Nd = (n, t, i) => {
  const l = n * n, o = i * (t * t - l) + l;
  return o < 0 ? 0 : Math.sqrt(o);
}, I5 = [fh, Oi, Ls], J5 = (n) => I5.find((t) => t.test(n));
function Dg(n) {
  const t = J5(n);
  if (!t)
    return !1;
  let i = t.parse(n);
  return t === Ls && (i = F5(i)), i;
}
const Ng = (n, t) => {
  const i = Dg(n), l = Dg(t);
  if (!i || !l)
    return Nc(n, t);
  const o = { ...i };
  return (c) => (o.red = Nd(i.red, l.red, c), o.green = Nd(i.green, l.green, c), o.blue = Nd(i.blue, l.blue, c), o.alpha = Ft(i.alpha, l.alpha, c), Oi.transform(o));
}, dh = /* @__PURE__ */ new Set(["none", "hidden"]);
function W5(n, t) {
  return dh.has(n) ? (i) => i <= 0 ? n : t : (i) => i >= 1 ? t : n;
}
function t9(n, t) {
  return (i) => Ft(n, t, i);
}
function vm(n) {
  return typeof n == "number" ? t9 : typeof n == "string" ? pm(n) ? Nc : we.test(n) ? Ng : a9 : Array.isArray(n) ? Bb : typeof n == "object" ? we.test(n) ? Ng : e9 : Nc;
}
function Bb(n, t) {
  const i = [...n], l = i.length, o = n.map((c, u) => vm(c)(c, t[u]));
  return (c) => {
    for (let u = 0; u < l; u++)
      i[u] = o[u](c);
    return i;
  };
}
function e9(n, t) {
  const i = { ...n, ...t }, l = {};
  for (const o in i)
    n[o] !== void 0 && t[o] !== void 0 && (l[o] = vm(n[o])(n[o], t[o]));
  return (o) => {
    for (const c in l)
      i[c] = l[c](o);
    return i;
  };
}
function n9(n, t) {
  const i = [], l = { color: 0, var: 0, number: 0 };
  for (let o = 0; o < t.values.length; o++) {
    const c = t.types[o], u = n.indexes[c][l[c]], d = n.values[u] ?? 0;
    i[o] = d, l[c]++;
  }
  return i;
}
const a9 = (n, t) => {
  const i = Bn.createTransformer(t), l = Gs(n), o = Gs(t);
  return l.indexes.var.length === o.indexes.var.length && l.indexes.color.length === o.indexes.color.length && l.indexes.number.length >= o.indexes.number.length ? dh.has(n) && !o.values.length || dh.has(t) && !l.values.length ? W5(n, t) : Ar(Bb(n9(l, o), o.values), i) : Nc(n, t);
};
function Vb(n, t, i) {
  return typeof n == "number" && typeof t == "number" && typeof i == "number" ? Ft(n, t, i) : vm(n)(n, t);
}
const i9 = (n) => {
  const t = ({ timestamp: i }) => n(i);
  return {
    start: (i = !0) => It.update(t, i),
    stop: () => wa(t),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => ke.isProcessing ? ke.timestamp : Xe.now()
  };
}, zb = (n, t, i = 10) => {
  let l = "";
  const o = Math.max(Math.round(t / i), 2);
  for (let c = 0; c < o; c++)
    l += Math.round(n(c / (o - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${l.substring(0, l.length - 2)})`;
}, Oc = 2e4;
function bm(n) {
  let t = 0;
  const i = 50;
  let l = n.next(t);
  for (; !l.done && t < Oc; )
    t += i, l = n.next(t);
  return t >= Oc ? 1 / 0 : t;
}
function Ub(n, t = 100, i) {
  const l = i({ ...n, keyframes: [0, t] }), o = Math.min(bm(l), Oc);
  return {
    type: "keyframes",
    ease: (c) => l.next(o * c).value / t,
    duration: /* @__PURE__ */ jn(o)
  };
}
const oe = {
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
function hh(n, t) {
  return n * Math.sqrt(1 - t * t);
}
const s9 = 12;
function l9(n, t, i) {
  let l = i;
  for (let o = 1; o < s9; o++)
    l = l - n(l) / t(l);
  return l;
}
const Od = 1e-3;
function r9({ duration: n = oe.duration, bounce: t = oe.bounce, velocity: i = oe.velocity, mass: l = oe.mass }) {
  let o, c, u = 1 - t;
  u = Zn(oe.minDamping, oe.maxDamping, u), n = Zn(oe.minDuration, oe.maxDuration, /* @__PURE__ */ jn(n)), u < 1 ? (o = (y) => {
    const g = y * u, v = g * n, b = g - i, j = hh(y, u), w = Math.exp(-v);
    return Od - b / j * w;
  }, c = (y) => {
    const v = y * u * n, b = v * i + i, j = Math.pow(u, 2) * Math.pow(y, 2) * n, w = Math.exp(-v), C = hh(Math.pow(y, 2), u);
    return (-o(y) + Od > 0 ? -1 : 1) * ((b - j) * w) / C;
  }) : (o = (y) => {
    const g = Math.exp(-y * n), v = (y - i) * n + 1;
    return -Od + g * v;
  }, c = (y) => {
    const g = Math.exp(-y * n), v = (i - y) * (n * n);
    return g * v;
  });
  const d = 5 / n, p = l9(o, c, d);
  if (n = /* @__PURE__ */ sn(n), isNaN(p))
    return {
      stiffness: oe.stiffness,
      damping: oe.damping,
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
const o9 = ["duration", "bounce"], c9 = ["stiffness", "damping", "mass"];
function Og(n, t) {
  return t.some((i) => n[i] !== void 0);
}
function u9(n) {
  let t = {
    velocity: oe.velocity,
    stiffness: oe.stiffness,
    damping: oe.damping,
    mass: oe.mass,
    isResolvedFromDuration: !1,
    ...n
  };
  if (!Og(n, c9) && Og(n, o9))
    if (t.velocity = 0, n.visualDuration) {
      const i = n.visualDuration, l = 2 * Math.PI / (i * 1.2), o = l * l, c = 2 * Zn(0.05, 1, 1 - (n.bounce || 0)) * Math.sqrt(o);
      t = {
        ...t,
        mass: oe.mass,
        stiffness: o,
        damping: c
      };
    } else {
      const i = r9({ ...n, velocity: 0 });
      t = {
        ...t,
        ...i,
        mass: oe.mass
      }, t.isResolvedFromDuration = !0;
    }
  return t;
}
function pr(n = oe.visualDuration, t = oe.bounce) {
  const i = typeof n != "object" ? {
    visualDuration: n,
    keyframes: [0, 1],
    bounce: t
  } : n;
  let { restSpeed: l, restDelta: o } = i;
  const c = i.keyframes[0], u = i.keyframes[i.keyframes.length - 1], d = { done: !1, value: c }, { stiffness: p, damping: y, mass: g, duration: v, velocity: b, isResolvedFromDuration: j } = u9({
    ...i,
    velocity: -/* @__PURE__ */ jn(i.velocity || 0)
  }), w = b || 0, C = y / (2 * Math.sqrt(p * g)), x = u - c, A = /* @__PURE__ */ jn(Math.sqrt(p / g)), R = Math.abs(x) < 5;
  l || (l = R ? oe.restSpeed.granular : oe.restSpeed.default), o || (o = R ? oe.restDelta.granular : oe.restDelta.default);
  let M, _, L, N, D, V;
  if (C < 1)
    L = hh(A, C), N = (w + C * A * x) / L, M = (B) => {
      const U = Math.exp(-C * A * B);
      return u - U * (N * Math.sin(L * B) + x * Math.cos(L * B));
    }, D = C * A * N + x * L, V = C * A * x - N * L, _ = (B) => Math.exp(-C * A * B) * (D * Math.sin(L * B) + V * Math.cos(L * B));
  else if (C === 1) {
    M = (U) => u - Math.exp(-A * U) * (x + (w + A * x) * U);
    const B = w + A * x;
    _ = (U) => Math.exp(-A * U) * (A * B * U - w);
  } else {
    const B = A * Math.sqrt(C * C - 1);
    M = (it) => {
      const J = Math.exp(-C * A * it), $ = Math.min(B * it, 300);
      return u - J * ((w + C * A * x) * Math.sinh($) + B * x * Math.cosh($)) / B;
    };
    const U = (w + C * A * x) / B, I = C * A * U - x * B, P = C * A * x - U * B;
    _ = (it) => {
      const J = Math.exp(-C * A * it), $ = Math.min(B * it, 300);
      return J * (I * Math.sinh($) + P * Math.cosh($));
    };
  }
  const H = {
    calculatedDuration: j && v || null,
    velocity: (B) => /* @__PURE__ */ sn(_(B)),
    next: (B) => {
      if (!j && C < 1) {
        const I = Math.exp(-C * A * B), P = Math.sin(L * B), it = Math.cos(L * B), J = u - I * (N * P + x * it), $ = /* @__PURE__ */ sn(I * (D * P + V * it));
        return d.done = Math.abs($) <= l && Math.abs(u - J) <= o, d.value = d.done ? u : J, d;
      }
      const U = M(B);
      if (j)
        d.done = B >= v;
      else {
        const I = /* @__PURE__ */ sn(_(B));
        d.done = Math.abs(I) <= l && Math.abs(u - U) <= o;
      }
      return d.value = d.done ? u : U, d;
    },
    toString: () => {
      const B = Math.min(bm(H), Oc), U = zb((I) => H.next(B * I).value, B, 30);
      return B + "ms " + U;
    },
    toTransition: () => {
    }
  };
  return H;
}
pr.applyToOptions = (n) => {
  const t = Ub(n, 100, pr);
  return n.ease = t.ease, n.duration = /* @__PURE__ */ sn(t.duration), n.type = "keyframes", n;
};
const f9 = 5;
function Hb(n, t, i) {
  const l = Math.max(t - f9, 0);
  return /* @__PURE__ */ vb(i - n(l), t - l);
}
function mh({ keyframes: n, velocity: t = 0, power: i = 0.8, timeConstant: l = 325, bounceDamping: o = 10, bounceStiffness: c = 500, modifyTarget: u, min: d, max: p, restDelta: y = 0.5, restSpeed: g }) {
  const v = n[0], b = {
    done: !1,
    value: v
  }, j = (V) => d !== void 0 && V < d || p !== void 0 && V > p, w = (V) => d === void 0 ? p : p === void 0 || Math.abs(d - V) < Math.abs(p - V) ? d : p;
  let C = i * t;
  const x = v + C, A = u === void 0 ? x : u(x);
  A !== x && (C = A - v);
  const R = (V) => -C * Math.exp(-V / l), M = (V) => A + R(V), _ = (V) => {
    const H = R(V), B = M(V);
    b.done = Math.abs(H) <= y, b.value = b.done ? A : B;
  };
  let L, N;
  const D = (V) => {
    j(b.value) && (L = V, N = pr({
      keyframes: [b.value, w(b.value)],
      velocity: Hb(M, V, b.value),
      // TODO: This should be passing * 1000
      damping: o,
      stiffness: c,
      restDelta: y,
      restSpeed: g
    }));
  };
  return D(0), {
    calculatedDuration: null,
    next: (V) => {
      let H = !1;
      return !N && L === void 0 && (H = !0, _(V), D(V)), L !== void 0 && V >= L ? N.next(V - L) : (!H && _(V), b);
    }
  };
}
function d9(n, t, i) {
  const l = [], o = i || Ia.mix || Vb, c = n.length - 1;
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
function qb(n, t, { clamp: i = !0, ease: l, mixer: o } = {}) {
  const c = n.length;
  if (om(c === t.length), c === 1)
    return () => t[0];
  if (c === 2 && t[0] === t[1])
    return () => t[1];
  const u = n[0] === n[1];
  n[0] > n[c - 1] && (n = [...n].reverse(), t = [...t].reverse());
  const d = d9(t, l, o), p = d.length, y = (g) => {
    if (u && g < n[0])
      return t[0];
    let v = 0;
    if (p > 1)
      for (; v < n.length - 2 && !(g < n[v + 1]); v++)
        ;
    const b = /* @__PURE__ */ Ys(n[v], n[v + 1], g);
    return d[v](b);
  };
  return i ? (g) => y(Zn(n[0], n[c - 1], g)) : y;
}
function Yb(n, t) {
  const i = n[n.length - 1];
  for (let l = 1; l <= t; l++) {
    const o = /* @__PURE__ */ Ys(0, t, l);
    n.push(Ft(i, 1, o));
  }
}
function Pb(n) {
  const t = [0];
  return Yb(t, n.length - 1), t;
}
function h9(n, t) {
  return n.map((i) => i * t);
}
function m9(n, t) {
  return n.map(() => t || Ab).splice(0, n.length - 1);
}
function er({ duration: n = 300, keyframes: t, times: i, ease: l = "easeInOut" }) {
  const o = /* @__PURE__ */ Eb(l) ? l.map(Eg) : Eg(l), c = {
    done: !1,
    value: t[0]
  }, u = h9(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    i && i.length === t.length ? i : Pb(t),
    n
  ), d = qb(u, t, {
    ease: Array.isArray(o) ? o : m9(t, o)
  });
  return {
    calculatedDuration: n,
    next: (p) => (c.value = d(p), c.done = p >= n, c)
  };
}
const p9 = (n) => n !== null;
function Fc(n, { repeat: t, repeatType: i = "loop" }, l, o = 1) {
  const c = n.filter(p9), d = o < 0 || t && i !== "loop" && t % 2 === 1 ? 0 : c.length - 1;
  return !d || l === void 0 ? c[d] : l;
}
const y9 = {
  decay: mh,
  inertia: mh,
  tween: er,
  keyframes: er,
  spring: pr
};
function Gb(n) {
  typeof n.type == "string" && (n.type = y9[n.type]);
}
class xm {
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
const g9 = (n) => n / 100;
class Lc extends xm {
  constructor(t) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: i } = this.options;
      i && i.updatedAt !== Xe.now() && this.tick(Xe.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = t, this.initAnimation(), this.play(), t.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: t } = this;
    Gb(t);
    const { type: i = er, repeat: l = 0, repeatDelay: o = 0, repeatType: c, velocity: u = 0 } = t;
    let { keyframes: d } = t;
    const p = i || er;
    p !== er && typeof d[0] != "number" && (this.mixKeyframes = Ar(g9, Vb(d[0], d[1])), d = [0, 100]);
    const y = p({ ...t, keyframes: d });
    c === "mirror" && (this.mirroredGenerator = p({
      ...t,
      keyframes: [...d].reverse(),
      velocity: -u
    })), y.calculatedDuration === null && (y.calculatedDuration = bm(y));
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
    const { delay: y = 0, keyframes: g, repeat: v, repeatType: b, repeatDelay: j, type: w, onUpdate: C, finalKeyframe: x } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - o / this.speed, this.startTime)), i ? this.currentTime = t : this.updateTime(t);
    const A = this.currentTime - y * (this.playbackSpeed >= 0 ? 1 : -1), R = this.playbackSpeed >= 0 ? A < 0 : A > o;
    this.currentTime = Math.max(A, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
    let M = this.currentTime, _ = l;
    if (v) {
      const V = Math.min(this.currentTime, o) / d;
      let H = Math.floor(V), B = V % 1;
      !B && V >= 1 && (B = 1), B === 1 && H--, H = Math.min(H, v + 1), !!(H % 2) && (b === "reverse" ? (B = 1 - B, j && (B -= j / d)) : b === "mirror" && (_ = u)), M = Zn(0, 1, B) * d;
    }
    let L;
    R ? (this.delayState.value = g[0], L = this.delayState) : L = _.next(M), c && !R && (L.value = c(L.value));
    let { done: N } = L;
    !R && p !== null && (N = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
    const D = this.holdTime === null && (this.state === "finished" || this.state === "running" && N);
    return D && w !== mh && (L.value = Fc(g, this.options, x, this.speed)), C && C(L.value), D && this.finish(), L;
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
    t = /* @__PURE__ */ sn(t), this.currentTime = t, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = t, this.tick(t));
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
    return Hb((l) => this.generator.next(l).value, t, i);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(t) {
    const i = this.playbackSpeed !== t;
    i && this.driver && this.updateTime(Xe.now()), this.playbackSpeed = t, i && this.driver && (this.time = /* @__PURE__ */ jn(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: t = i9, startTime: i } = this.options;
    this.driver || (this.driver = t((o) => this.tick(o))), this.options.onPlay?.();
    const l = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = l) : this.holdTime !== null ? this.startTime = l - this.holdTime : this.startTime || (this.startTime = i ?? l), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Xe.now()), this.holdTime = this.currentTime;
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
function v9(n) {
  for (let t = 1; t < n.length; t++)
    n[t] ?? (n[t] = n[t - 1]);
}
const Li = (n) => n * 180 / Math.PI, ph = (n) => {
  const t = Li(Math.atan2(n[1], n[0]));
  return yh(t);
}, b9 = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (n) => (Math.abs(n[0]) + Math.abs(n[3])) / 2,
  rotate: ph,
  rotateZ: ph,
  skewX: (n) => Li(Math.atan(n[1])),
  skewY: (n) => Li(Math.atan(n[2])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[2])) / 2
}, yh = (n) => (n = n % 360, n < 0 && (n += 360), n), Lg = ph, $g = (n) => Math.sqrt(n[0] * n[0] + n[1] * n[1]), kg = (n) => Math.sqrt(n[4] * n[4] + n[5] * n[5]), x9 = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: $g,
  scaleY: kg,
  scale: (n) => ($g(n) + kg(n)) / 2,
  rotateX: (n) => yh(Li(Math.atan2(n[6], n[5]))),
  rotateY: (n) => yh(Li(Math.atan2(-n[2], n[0]))),
  rotateZ: Lg,
  rotate: Lg,
  skewX: (n) => Li(Math.atan(n[4])),
  skewY: (n) => Li(Math.atan(n[1])),
  skew: (n) => (Math.abs(n[1]) + Math.abs(n[4])) / 2
};
function gh(n) {
  return n.includes("scale") ? 1 : 0;
}
function vh(n, t) {
  if (!n || n === "none")
    return gh(t);
  const i = n.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let l, o;
  if (i)
    l = x9, o = i;
  else {
    const d = n.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    l = b9, o = d;
  }
  if (!o)
    return gh(t);
  const c = l[t], u = o[1].split(",").map(w9);
  return typeof c == "function" ? c(u) : u[c];
}
const S9 = (n, t) => {
  const { transform: i = "none" } = getComputedStyle(n);
  return vh(i, t);
};
function w9(n) {
  return parseFloat(n.trim());
}
const Is = [
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
], Js = /* @__PURE__ */ new Set([...Is, "pathRotation"]), Bg = (n) => n === Fs || n === bt, C9 = /* @__PURE__ */ new Set(["x", "y", "z"]), T9 = Is.filter((n) => !C9.has(n));
function j9(n) {
  const t = [];
  return T9.forEach((i) => {
    const l = n.getValue(i);
    l !== void 0 && (t.push([i, l.get()]), l.set(i.startsWith("scale") ? 1 : 0));
  }), t;
}
const Fa = {
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
  x: (n, { transform: t }) => vh(t, "x"),
  y: (n, { transform: t }) => vh(t, "y")
};
Fa.translateX = Fa.x;
Fa.translateY = Fa.y;
const ki = /* @__PURE__ */ new Set();
let bh = !1, xh = !1, Sh = !1;
function Xb() {
  if (xh) {
    const n = Array.from(ki).filter((l) => l.needsMeasurement), t = new Set(n.map((l) => l.element)), i = /* @__PURE__ */ new Map();
    t.forEach((l) => {
      const o = j9(l);
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
  xh = !1, bh = !1, ki.forEach((n) => n.complete(Sh)), ki.clear();
}
function Kb() {
  ki.forEach((n) => {
    n.readKeyframes(), n.needsMeasurement && (xh = !0);
  });
}
function A9() {
  Sh = !0, Kb(), Xb(), Sh = !1;
}
class Sm {
  constructor(t, i, l, o, c, u = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...t], this.onComplete = i, this.name = l, this.motionValue = o, this.element = c, this.isAsync = u;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (ki.add(this), bh || (bh = !0, It.read(Kb), It.resolveKeyframes(Xb))) : (this.readKeyframes(), this.complete());
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
    v9(t);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t), ki.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (ki.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const E9 = (n) => n.startsWith("--");
function Zb(n, t, i) {
  E9(t) ? n.style.setProperty(t, i) : n.style[t] = i;
}
const M9 = {};
function Qb(n, t) {
  const i = /* @__PURE__ */ gb(n);
  return () => M9[t] ?? i();
}
const _9 = /* @__PURE__ */ Qb(() => window.ScrollTimeline !== void 0, "scrollTimeline"), Fb = /* @__PURE__ */ Qb(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), Ql = ([n, t, i, l]) => `cubic-bezier(${n}, ${t}, ${i}, ${l})`, Vg = {
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
function Ib(n, t) {
  if (n)
    return typeof n == "function" ? Fb() ? zb(n, t) : "ease-out" : /* @__PURE__ */ _b(n) ? Ql(n) : Array.isArray(n) ? n.map((i) => Ib(i, t) || Vg.easeOut) : Vg[n];
}
function R9(n, t, i, { delay: l = 0, duration: o = 300, repeat: c = 0, repeatType: u = "loop", ease: d = "easeOut", times: p } = {}, y = void 0) {
  const g = {
    [t]: i
  };
  p && (g.offset = p);
  const v = Ib(d, o);
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
function wm(n) {
  return typeof n == "function" && "applyToOptions" in n;
}
function D9({ type: n, ...t }) {
  return wm(n) && Fb() ? n.applyToOptions(t) : (t.duration ?? (t.duration = 300), t.ease ?? (t.ease = "easeOut"), t);
}
class Jb extends xm {
  constructor(t) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !t)
      return;
    const { element: i, name: l, keyframes: o, pseudoElement: c, allowFlatten: u = !1, finalKeyframe: d, onComplete: p } = t;
    this.isPseudoElement = !!c, this.allowFlatten = u, this.options = t, om(typeof t.type != "string");
    const y = D9(t);
    this.animation = R9(i, l, o, y, c), y.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !c) {
        const g = Fc(o, this.options, d, this.speed);
        this.updateMotionValue && this.updateMotionValue(g), Zb(i, l, g), this.animation.cancel();
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
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ sn(t), i && this.animation.pause();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, t && _9() ? (this.animation.timeline = t, i && (this.animation.rangeStart = i), l && (this.animation.rangeEnd = l), An) : o(this);
  }
}
const Wb = {
  anticipate: Cb,
  backInOut: wb,
  circInOut: jb
};
function N9(n) {
  return n in Wb;
}
function O9(n) {
  typeof n.ease == "string" && N9(n.ease) && (n.ease = Wb[n.ease]);
}
const Ld = 10;
class L9 extends Jb {
  constructor(t) {
    O9(t), Gb(t), super(t), t.startTime !== void 0 && t.autoplay !== !1 && (this.startTime = t.startTime), this.options = t;
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
    const d = new Lc({
      ...u,
      autoplay: !1
    }), p = Math.max(Ld, Xe.now() - this.startTime), y = Zn(0, Ld, p - Ld), g = d.sample(p).value, { name: v } = this.options;
    c && v && Zb(c, v, g), i.setWithVelocity(d.sample(Math.max(0, p - y)).value, g, y), d.stop();
  }
}
const zg = (n, t) => t === "zIndex" ? !1 : !!(typeof n == "number" || Array.isArray(n) || typeof n == "string" && // It's animatable if we have a string
(Bn.test(n) || n === "0") && // And it contains numbers and/or colors
!n.startsWith("url("));
function $9(n) {
  const t = n[0];
  if (n.length === 1)
    return !0;
  for (let i = 0; i < n.length; i++)
    if (n[i] !== t)
      return !0;
}
function k9(n, t, i, l) {
  const o = n[0];
  if (o === null)
    return !1;
  if (t === "display" || t === "visibility")
    return !0;
  const c = n[n.length - 1], u = zg(o, t), d = zg(c, t);
  return !u || !d ? !1 : $9(n) || (i === "spring" || wm(i)) && l;
}
function wh(n) {
  n.duration = 0, n.type = "keyframes";
}
const tx = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), B9 = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function V9(n) {
  for (let t = 0; t < n.length; t++)
    if (typeof n[t] == "string" && B9.test(n[t]))
      return !0;
  return !1;
}
const z9 = /* @__PURE__ */ new Set([
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
]), U9 = /* @__PURE__ */ gb(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function H9(n) {
  const { motionValue: t, name: i, repeatDelay: l, repeatType: o, damping: c, type: u, keyframes: d } = n;
  if (!(t?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: y, transformTemplate: g } = t.owner.getProps();
  return U9() && i && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (tx.has(i) || z9.has(i) && V9(d)) && (i !== "transform" || !g) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !y && !l && o !== "mirror" && c !== 0 && u !== "inertia";
}
const q9 = 40;
class Y9 extends xm {
  constructor({ autoplay: t = !0, delay: i = 0, type: l = "keyframes", repeat: o = 0, repeatDelay: c = 0, repeatType: u = "loop", keyframes: d, name: p, motionValue: y, element: g, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Xe.now();
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
    }, j = g?.KeyframeResolver || Sm;
    this.keyframeResolver = new j(d, (w, C, x) => this.onKeyframesResolved(w, C, b, !x), p, y, g), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(t, i, l, o) {
    this.keyframeResolver = void 0;
    const { name: c, type: u, velocity: d, delay: p, isHandoff: y, onUpdate: g } = l;
    this.resolvedAt = Xe.now();
    let v = !0;
    k9(t, c, u, d) || (v = !1, (Ia.instantAnimations || !p) && g?.(Fc(t, l, i)), t[0] = t[t.length - 1], wh(l), l.repeat = 0);
    const j = {
      startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > q9 ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: i,
      ...l,
      keyframes: t
    }, w = v && !y && H9(j), C = j.motionValue?.owner?.current;
    let x;
    if (w)
      try {
        x = new L9({
          ...j,
          element: C
        });
      } catch {
        x = new Lc(j);
      }
    else
      x = new Lc(j);
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
    return this._animation || (this.keyframeResolver?.resume(), A9()), this._animation;
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
class P9 {
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
    return Ug(this.animations, "duration");
  }
  get iterationDuration() {
    return Ug(this.animations, "iterationDuration");
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
function Ug(n, t) {
  let i = 0;
  for (let l = 0; l < n.length; l++) {
    const o = n[l][t];
    o !== null && o > i && (i = o);
  }
  return i;
}
class G9 extends P9 {
  then(t, i) {
    return this.finished.finally(t).then(() => {
    });
  }
}
function ex(n, t, i, l = 0, o = 1) {
  const c = Array.from(n).sort((y, g) => y.sortNodePosition(g)).indexOf(t), u = n.size, d = (u - 1) * l;
  return typeof i == "function" ? i(c, u) : o === 1 ? c * l : d - c * l;
}
const Hg = 30, X9 = (n) => !isNaN(parseFloat(n)), nr = {
  current: void 0
};
class K9 {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(t, i = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (l) => {
      const o = Xe.now();
      if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(l), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const c of this.dependents)
          c.dirty();
    }, this.hasAnimated = !1, this.setCurrent(t), this.owner = i.owner;
  }
  setCurrent(t) {
    this.current = t, this.updatedAt = Xe.now(), this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = X9(this.current));
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
    this.events[t] || (this.events[t] = new cm());
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
    const t = Xe.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > Hg)
      return 0;
    const i = Math.min(this.updatedAt - this.prevUpdatedAt, Hg);
    return /* @__PURE__ */ vb(parseFloat(this.current) - parseFloat(this.prevFrameValue), i);
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
function Ja(n, t) {
  return new K9(n, t);
}
function Cm(n, t) {
  if (n?.inherit && t) {
    const { inherit: i, ...l } = n;
    return { ...t, ...l };
  }
  return n;
}
function Tm(n, t) {
  const i = n?.[t] ?? n?.default ?? n;
  return i !== n ? Cm(i, n) : i;
}
const Z9 = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, Q9 = (n) => ({
  type: "spring",
  stiffness: 550,
  damping: n === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), F9 = {
  type: "keyframes",
  duration: 0.8
}, I9 = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, J9 = (n, { keyframes: t }) => t.length > 2 ? F9 : Js.has(n) ? n.startsWith("scale") ? Q9(t[1]) : Z9 : I9, W9 = /* @__PURE__ */ new Set([
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
function t6(n) {
  for (const t in n)
    if (!W9.has(t))
      return !0;
  return !1;
}
const jm = (n, t, i, l = {}, o, c) => (u) => {
  const d = Tm(l, n) || {}, p = d.delay || l.delay || 0;
  let { elapsed: y = 0 } = l;
  y = y - /* @__PURE__ */ sn(p);
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
  t6(d) || Object.assign(g, J9(n, g)), g.duration && (g.duration = /* @__PURE__ */ sn(g.duration)), g.repeatDelay && (g.repeatDelay = /* @__PURE__ */ sn(g.repeatDelay)), g.from !== void 0 && (g.keyframes[0] = g.from);
  let v = !1;
  if ((g.type === !1 || g.duration === 0 && !g.repeatDelay) && (wh(g), g.delay === 0 && (v = !0)), (Ia.instantAnimations || Ia.skipAnimations || o?.shouldSkipAnimations || d.skipAnimations) && (v = !0, wh(g), g.delay = 0), g.allowFlatten = !d.type && !d.ease, v && !c && t.get() !== void 0) {
    const b = Fc(g.keyframes, d);
    if (b !== void 0) {
      It.update(() => {
        g.onUpdate(b), g.onComplete();
      });
      return;
    }
  }
  return d.isSync ? new Lc(g) : new Y9(g);
}, e6 = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function n6(n) {
  const t = e6.exec(n);
  if (!t)
    return [,];
  const [, i, l, o] = t;
  return [`--${i ?? l}`, o];
}
function nx(n, t, i = 1) {
  const [l, o] = n6(n);
  if (!l)
    return;
  const c = window.getComputedStyle(t).getPropertyValue(l);
  if (c) {
    const u = c.trim();
    return mb(u) ? parseFloat(u) : u;
  }
  return pm(o) ? nx(o, t, i + 1) : o;
}
function qg(n) {
  const t = [{}, {}];
  return n?.values.forEach((i, l) => {
    t[0][l] = i.get(), t[1][l] = i.getVelocity();
  }), t;
}
function Am(n, t, i, l) {
  if (typeof t == "function") {
    const [o, c] = qg(l);
    t = t(i !== void 0 ? i : n.custom, o, c);
  }
  if (typeof t == "string" && (t = n.variants && n.variants[t]), typeof t == "function") {
    const [o, c] = qg(l);
    t = t(i !== void 0 ? i : n.custom, o, c);
  }
  return t;
}
function Bi(n, t, i) {
  const l = n.getProps();
  return Am(l, t, i !== void 0 ? i : l.custom, n);
}
const ax = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...Is
]), Ch = (n) => Array.isArray(n);
function a6(n, t, i) {
  n.hasValue(t) ? n.getValue(t).set(i) : n.addValue(t, Ja(i));
}
function i6(n) {
  return Ch(n) ? n[n.length - 1] || 0 : n;
}
function s6(n, t) {
  const i = Bi(n, t);
  let { transitionEnd: l = {}, transition: o = {}, ...c } = i || {};
  c = { ...c, ...l };
  for (const u in c) {
    const d = i6(c[u]);
    a6(n, u, d);
  }
}
const Ee = (n) => !!(n && n.getVelocity);
function l6(n) {
  return !!(Ee(n) && n.add);
}
function Th(n, t) {
  const i = n.getValue("willChange");
  if (l6(i))
    return i.add(t);
  if (!i && Ia.WillChange) {
    const l = new Ia.WillChange("auto");
    n.addValue("willChange", l), l.add(t);
  }
}
function Em(n) {
  return n.replace(/([A-Z])/g, (t) => `-${t.toLowerCase()}`);
}
const r6 = "framerAppearId", ix = "data-" + Em(r6);
function sx(n) {
  return n.props[ix];
}
function o6({ protectedKeys: n, needsAnimating: t }, i) {
  const l = n.hasOwnProperty(i) && t[i] !== !0;
  return t[i] = !1, l;
}
function Mm(n, t, { delay: i = 0, transitionOverride: l, type: o } = {}) {
  let { transition: c, transitionEnd: u, ...d } = t;
  const p = n.getDefaultTransition();
  c = c ? Cm(c, p) : p;
  const y = c?.reduceMotion, g = c?.skipAnimations;
  l && (c = l);
  const v = [], b = o && n.animationState && n.animationState.getState()[o], j = c?.path;
  j && j.animateVisualElement(n, d, c, i, v);
  for (const w in d) {
    const C = n.getValue(w, n.latestValues[w] ?? null), x = d[w];
    if (x === void 0 || b && o6(b, w))
      continue;
    const A = {
      delay: i,
      ...Tm(c || {}, w)
    };
    g && (A.skipAnimations = !0);
    const R = C.get();
    if (R !== void 0 && !C.isAnimating() && !Array.isArray(x) && x === R && !A.velocity) {
      It.update(() => C.set(x));
      continue;
    }
    let M = !1;
    if (window.MotionHandoffAnimation) {
      const N = sx(n);
      if (N) {
        const D = window.MotionHandoffAnimation(N, w, It);
        D !== null && (A.startTime = D, M = !0);
      }
    }
    Th(n, w);
    const _ = y ?? n.shouldReduceMotion;
    C.start(jm(w, C, x, _ && ax.has(w) ? { type: !1 } : A, n, M));
    const L = C.animation;
    L && v.push(L);
  }
  if (u) {
    const w = () => It.update(() => {
      u && s6(n, u);
    });
    v.length ? Promise.all(v).then(w) : w();
  }
  return v;
}
function jh(n, t, i = {}) {
  const l = Bi(n, t, i.type === "exit" ? n.presenceContext?.custom : void 0);
  let { transition: o = n.getDefaultTransition() || {} } = l || {};
  i.transitionOverride && (o = i.transitionOverride);
  const c = l ? () => Promise.all(Mm(n, l, i)) : () => Promise.resolve(), u = n.variantChildren && n.variantChildren.size ? (p = 0) => {
    const { delayChildren: y = 0, staggerChildren: g, staggerDirection: v } = o;
    return c6(n, t, p, y, g, v, i);
  } : () => Promise.resolve(), { when: d } = o;
  if (d) {
    const [p, y] = d === "beforeChildren" ? [c, u] : [u, c];
    return p().then(() => y());
  } else
    return Promise.all([c(), u(i.delay)]);
}
function c6(n, t, i = 0, l = 0, o = 0, c = 1, u) {
  const d = [];
  for (const p of n.variantChildren)
    p.notify("AnimationStart", t), d.push(jh(p, t, {
      ...u,
      delay: i + (typeof l == "function" ? 0 : l) + ex(n.variantChildren, p, l, o, c)
    }).then(() => p.notify("AnimationComplete", t)));
  return Promise.all(d);
}
function u6(n, t, i = {}) {
  n.notify("AnimationStart", t);
  let l;
  if (Array.isArray(t)) {
    const o = t.map((c) => jh(n, c, i));
    l = Promise.all(o);
  } else if (typeof t == "string")
    l = jh(n, t, i);
  else {
    const o = typeof t == "function" ? Bi(n, t, i.custom) : t;
    l = Promise.all(Mm(n, o, i));
  }
  return l.then(() => {
    n.notify("AnimationComplete", t);
  });
}
const f6 = {
  test: (n) => n === "auto",
  parse: (n) => n
}, lx = (n) => (t) => t.test(n), rx = [Fs, bt, Kn, ba, z5, V5, f6], Yg = (n) => rx.find(lx(n));
function d6(n) {
  return typeof n == "number" ? n === 0 : n !== null ? n === "none" || n === "0" || yb(n) : !0;
}
const h6 = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function m6(n) {
  const [t, i] = n.slice(0, -1).split("(");
  if (t === "drop-shadow")
    return n;
  const [l] = i.match(ym) || [];
  if (!l)
    return n;
  const o = i.replace(l, "");
  let c = h6.has(t) ? 1 : 0;
  return l !== i && (c *= 100), t + "(" + c + o + ")";
}
const p6 = /\b([a-z-]*)\(.*?\)/gu, Ah = {
  ...Bn,
  getAnimatableNone: (n) => {
    const t = n.match(p6);
    return t ? t.map(m6).join(" ") : n;
  }
}, Eh = {
  ...Bn,
  getAnimatableNone: (n) => {
    const t = Bn.parse(n);
    return Bn.createTransformer(n)(t.map((l) => typeof l == "number" ? 0 : typeof l == "object" ? { ...l, alpha: 1 } : l));
  }
}, Pg = {
  ...Fs,
  transform: Math.round
}, y6 = {
  rotate: ba,
  /**
   * Internal channel for `transition.path` orientToPath. Composed onto
   * `rotate` at the transform-build sites so the user's `rotate` is
   * never read or overwritten. Not part of `transformPropOrder`.
   */
  pathRotation: ba,
  rotateX: ba,
  rotateY: ba,
  rotateZ: ba,
  scale: Jo,
  scaleX: Jo,
  scaleY: Jo,
  scaleZ: Jo,
  skew: ba,
  skewX: ba,
  skewY: ba,
  distance: bt,
  translateX: bt,
  translateY: bt,
  translateZ: bt,
  x: bt,
  y: bt,
  z: bt,
  perspective: bt,
  transformPerspective: bt,
  opacity: mr,
  originX: _g,
  originY: _g,
  originZ: bt
}, $c = {
  // Border props
  borderWidth: bt,
  borderTopWidth: bt,
  borderRightWidth: bt,
  borderBottomWidth: bt,
  borderLeftWidth: bt,
  borderRadius: bt,
  borderTopLeftRadius: bt,
  borderTopRightRadius: bt,
  borderBottomRightRadius: bt,
  borderBottomLeftRadius: bt,
  // Positioning props
  width: bt,
  maxWidth: bt,
  height: bt,
  maxHeight: bt,
  top: bt,
  right: bt,
  bottom: bt,
  left: bt,
  inset: bt,
  insetBlock: bt,
  insetBlockStart: bt,
  insetBlockEnd: bt,
  insetInline: bt,
  insetInlineStart: bt,
  insetInlineEnd: bt,
  // Spacing props
  padding: bt,
  paddingTop: bt,
  paddingRight: bt,
  paddingBottom: bt,
  paddingLeft: bt,
  paddingBlock: bt,
  paddingBlockStart: bt,
  paddingBlockEnd: bt,
  paddingInline: bt,
  paddingInlineStart: bt,
  paddingInlineEnd: bt,
  margin: bt,
  marginTop: bt,
  marginRight: bt,
  marginBottom: bt,
  marginLeft: bt,
  marginBlock: bt,
  marginBlockStart: bt,
  marginBlockEnd: bt,
  marginInline: bt,
  marginInlineStart: bt,
  marginInlineEnd: bt,
  // Typography
  fontSize: bt,
  // Misc
  backgroundPositionX: bt,
  backgroundPositionY: bt,
  ...y6,
  zIndex: Pg,
  // SVG
  fillOpacity: mr,
  strokeOpacity: mr,
  numOctaves: Pg
}, g6 = {
  ...$c,
  // Color props
  color: we,
  backgroundColor: we,
  outlineColor: we,
  fill: we,
  stroke: we,
  // Border props
  borderColor: we,
  borderTopColor: we,
  borderRightColor: we,
  borderBottomColor: we,
  borderLeftColor: we,
  filter: Ah,
  WebkitFilter: Ah,
  mask: Eh,
  WebkitMask: Eh
}, ox = (n) => g6[n], v6 = /* @__PURE__ */ new Set([Ah, Eh]);
function cx(n, t) {
  let i = ox(n);
  return v6.has(i) || (i = Bn), i.getAnimatableNone ? i.getAnimatableNone(t) : void 0;
}
const b6 = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function x6(n, t, i) {
  let l = 0, o;
  for (; l < n.length && !o; ) {
    const c = n[l];
    typeof c == "string" && !b6.has(c) && Gs(c).values.length && (o = n[l]), l++;
  }
  if (o && i)
    for (const c of t)
      n[c] = cx(i, o);
}
class S6 extends Sm {
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
      if (typeof v == "string" && (v = v.trim(), pm(v))) {
        const b = nx(v, i.current);
        b !== void 0 && (t[g] = b), g === t.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !ax.has(l) || t.length !== 2)
      return;
    const [o, c] = t, u = Yg(o), d = Yg(c), p = Mg(o), y = Mg(c);
    if (p !== y && Fa[l]) {
      this.needsMeasurement = !0;
      return;
    }
    if (u !== d)
      if (Bg(u) && Bg(d))
        for (let g = 0; g < t.length; g++) {
          const v = t[g];
          typeof v == "string" && (t[g] = parseFloat(v));
        }
      else Fa[l] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: t, name: i } = this, l = [];
    for (let o = 0; o < t.length; o++)
      (t[o] === null || d6(t[o])) && l.push(o);
    l.length && x6(t, l, i);
  }
  measureInitialState() {
    const { element: t, unresolvedKeyframes: i, name: l } = this;
    if (!t || !t.current)
      return;
    l === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Fa[l](t.measureViewportBox(), window.getComputedStyle(t.current)), i[0] = this.measuredOrigin;
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
    l[c] = Fa[i](t.measureViewportBox(), window.getComputedStyle(t.current)), u !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = u), this.removedTransforms?.length && this.removedTransforms.forEach(([d, p]) => {
      t.getValue(d).set(p);
    }), this.resolveNoneKeyframes();
  }
}
const _m = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
];
function Rm(n, t, i) {
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
const Mh = (n, t) => t && typeof n == "number" ? t.transform(n) : n;
function gc(n) {
  return pb(n) && "offsetHeight" in n && !("ownerSVGElement" in n);
}
const { schedule: Dm } = /* @__PURE__ */ Rb(queueMicrotask, !1), Nn = {
  x: !1,
  y: !1
};
function ux() {
  return Nn.x || Nn.y;
}
function w6(n) {
  return n === "x" || n === "y" ? Nn[n] ? null : (Nn[n] = !0, () => {
    Nn[n] = !1;
  }) : Nn.x || Nn.y ? null : (Nn.x = Nn.y = !0, () => {
    Nn.x = Nn.y = !1;
  });
}
function fx(n, t) {
  const i = Rm(n), l = new AbortController(), o = {
    passive: !0,
    ...t,
    signal: l.signal
  };
  return [i, o, () => l.abort()];
}
function C6(n) {
  return !(n.pointerType === "touch" || ux());
}
function T6(n, t, i = {}) {
  const [l, o, c] = fx(n, i);
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
    }, C = (x) => {
      if (!C6(x))
        return;
      p = !1;
      const A = t(u, x);
      typeof A == "function" && (y = A, u.addEventListener("pointerleave", w, o));
    };
    u.addEventListener("pointerenter", C, o), u.addEventListener("pointerdown", j, o);
  }), c;
}
const dx = (n, t) => t ? n === t ? !0 : dx(n, t.parentElement) : !1, Nm = (n) => n.pointerType === "mouse" ? typeof n.button != "number" || n.button <= 0 : n.isPrimary !== !1, j6 = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function A6(n) {
  return j6.has(n.tagName) || n.isContentEditable === !0;
}
const E6 = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function M6(n) {
  return E6.has(n.tagName) || n.isContentEditable === !0;
}
const vc = /* @__PURE__ */ new WeakSet();
function Gg(n) {
  return (t) => {
    t.key === "Enter" && n(t);
  };
}
function $d(n, t) {
  n.dispatchEvent(new PointerEvent("pointer" + t, { isPrimary: !0, bubbles: !0 }));
}
const _6 = (n, t) => {
  const i = n.currentTarget;
  if (!i)
    return;
  const l = Gg(() => {
    if (vc.has(i))
      return;
    $d(i, "down");
    const o = Gg(() => {
      $d(i, "up");
    }), c = () => $d(i, "cancel");
    i.addEventListener("keyup", o, t), i.addEventListener("blur", c, t);
  });
  i.addEventListener("keydown", l, t), i.addEventListener("blur", () => i.removeEventListener("keydown", l), t);
};
function Xg(n) {
  return Nm(n) && !ux();
}
const Kg = /* @__PURE__ */ new WeakSet();
function R6(n, t, i = {}) {
  const [l, o, c] = fx(n, i), u = (d) => {
    const p = d.currentTarget;
    if (!Xg(d) || Kg.has(d))
      return;
    vc.add(p), i.stopPropagation && Kg.add(d);
    const y = t(p, d), g = { ...o, capture: !0 }, v = (w, C) => {
      window.removeEventListener("pointerup", b, g), window.removeEventListener("pointercancel", j, g), vc.has(p) && vc.delete(p), Xg(w) && typeof y == "function" && y(w, { success: C });
    }, b = (w) => {
      v(w, p === window || p === document || i.useGlobalTarget || dx(p, w.target));
    }, j = (w) => {
      v(w, !1);
    };
    window.addEventListener("pointerup", b, g), window.addEventListener("pointercancel", j, g);
  };
  return l.forEach((d) => {
    (i.useGlobalTarget ? window : d).addEventListener("pointerdown", u, o), gc(d) && (d.addEventListener("focus", (y) => _6(y, o)), !A6(d) && !d.hasAttribute("tabindex") && (d.tabIndex = 0));
  }), c;
}
function Ic(n) {
  return pb(n) && "ownerSVGElement" in n;
}
const bc = /* @__PURE__ */ new WeakMap();
let xc;
const hx = (n, t, i) => (l, o) => o && o[0] ? o[0][n + "Size"] : Ic(l) && "getBBox" in l ? l.getBBox()[t] : l[i], D6 = /* @__PURE__ */ hx("inline", "width", "offsetWidth"), N6 = /* @__PURE__ */ hx("block", "height", "offsetHeight");
function O6({ target: n, borderBoxSize: t }) {
  bc.get(n)?.forEach((i) => {
    i(n, {
      get width() {
        return D6(n, t);
      },
      get height() {
        return N6(n, t);
      }
    });
  });
}
function L6(n) {
  n.forEach(O6);
}
function $6() {
  typeof ResizeObserver > "u" || (xc = new ResizeObserver(L6));
}
function k6(n, t) {
  xc || $6();
  const i = Rm(n);
  return i.forEach((l) => {
    let o = bc.get(l);
    o || (o = /* @__PURE__ */ new Set(), bc.set(l, o)), o.add(t), xc?.observe(l);
  }), () => {
    i.forEach((l) => {
      const o = bc.get(l);
      o?.delete(t), o?.size || xc?.unobserve(l);
    });
  };
}
const Sc = /* @__PURE__ */ new Set();
let $s;
function B6() {
  $s = () => {
    const n = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    Sc.forEach((t) => t(n));
  }, window.addEventListener("resize", $s);
}
function V6(n) {
  return Sc.add(n), $s || B6(), () => {
    Sc.delete(n), !Sc.size && typeof $s == "function" && (window.removeEventListener("resize", $s), $s = void 0);
  };
}
function Zg(n, t) {
  return typeof n == "function" ? V6(n) : k6(n, t);
}
function mx(n) {
  return Ic(n) && n.tagName === "svg";
}
function z6(...n) {
  const t = !Array.isArray(n[0]), i = t ? 0 : -1, l = n[0 + i], o = n[1 + i], c = n[2 + i], u = n[3 + i], d = qb(o, c, u);
  return t ? d(l) : d;
}
const U6 = [...rx, we, Bn], H6 = (n) => U6.find(lx(n)), Qg = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), ks = () => ({
  x: Qg(),
  y: Qg()
}), Fg = () => ({ min: 0, max: 0 }), Se = () => ({
  x: Fg(),
  y: Fg()
}), yr = /* @__PURE__ */ new WeakMap();
function Jc(n) {
  return n !== null && typeof n == "object" && typeof n.start == "function";
}
function gr(n) {
  return typeof n == "string" || Array.isArray(n);
}
const Om = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], Lm = ["initial", ...Om];
function Wc(n) {
  return Jc(n.animate) || Lm.some((t) => gr(n[t]));
}
function px(n) {
  return !!(Wc(n) || n.variants);
}
function q6(n, t, i) {
  for (const l in t) {
    const o = t[l], c = i[l];
    if (Ee(o))
      n.addValue(l, o);
    else if (Ee(c))
      n.addValue(l, Ja(o, { owner: n }));
    else if (c !== o)
      if (n.hasValue(l)) {
        const u = n.getValue(l);
        u.liveStyle === !0 ? u.jump(o) : u.hasAnimated || u.set(o);
      } else {
        const u = n.getStaticValue(l);
        n.addValue(l, Ja(u !== void 0 ? u : o, { owner: n }));
      }
  }
  for (const l in i)
    t[l] === void 0 && n.removeValue(l);
  return t;
}
const kc = { current: null }, $m = { current: !1 }, Y6 = typeof window < "u";
function yx() {
  if ($m.current = !0, !!Y6)
    if (window.matchMedia) {
      const n = window.matchMedia("(prefers-reduced-motion)"), t = () => kc.current = n.matches;
      n.addEventListener("change", t), t();
    } else
      kc.current = !1;
}
const Ig = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let Bc = {};
function gx(n) {
  Bc = n;
}
function P6() {
  return Bc;
}
class vx {
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
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Sm, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const j = Xe.now();
      this.renderScheduledAt < j && (this.renderScheduledAt = j, It.render(this.render, !1, !0));
    };
    const { latestValues: y, renderState: g } = d;
    this.latestValues = y, this.baseTarget = { ...y }, this.initialValues = i.initial ? { ...y } : {}, this.renderState = g, this.parent = t, this.props = i, this.presenceContext = l, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = c, this.options = p, this.blockInitialAnimation = !!u, this.isControllingVariants = Wc(i), this.isVariantNode = px(i), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t && t.current);
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
    this.current = t, yr.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((i, l) => this.bindToMotionValue(l, i)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : ($m.current || yx(), this.shouldReduceMotion = kc.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), wa(this.notifyUpdate), wa(this.render), this.valueSubscriptions.forEach((t) => t()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    if (this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)(), i.accelerate && tx.has(t) && this.current instanceof HTMLElement) {
      const { factory: u, keyframes: d, times: p, ease: y, duration: g } = i.accelerate, v = new Jb({
        element: this.current,
        name: t,
        keyframes: d,
        times: p,
        ease: y,
        duration: /* @__PURE__ */ sn(g)
      }), b = u(v);
      this.valueSubscriptions.set(t, () => {
        b(), v.cancel();
      });
      return;
    }
    const l = Js.has(t);
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
    for (t in Bc) {
      const i = Bc[t];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Se();
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
    for (let l = 0; l < Ig.length; l++) {
      const o = Ig[l];
      this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
      const c = "on" + o, u = t[c];
      u && (this.propEventSubscriptions[o] = this.on(o, u));
    }
    this.prevMotionValues = q6(this, this.scrapeMotionValuesFromProps(t, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return l === void 0 && i !== void 0 && (l = Ja(i === null ? void 0 : i, { owner: this }), this.addValue(t, l)), l;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(t, i) {
    let l = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : this.getBaseTargetFromProps(this.props, t) ?? this.readValueFromInstance(this.current, t, this.options);
    return l != null && (typeof l == "string" && (mb(l) || yb(l)) ? l = parseFloat(l) : !H6(l) && Bn.test(i) && (l = cx(t, i)), this.setBaseTarget(t, Ee(l) ? l.get() : l)), Ee(l) ? l.get() : l;
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
      const c = Am(this.props, i, this.presenceContext?.custom);
      c && (l = c[t]);
    }
    if (i && l !== void 0)
      return l;
    const o = this.getBaseTargetFromProps(this.props, t);
    return o !== void 0 && !Ee(o) ? o : this.initialValues[t] !== void 0 && l === void 0 ? void 0 : this.baseTarget[t];
  }
  on(t, i) {
    return this.events[t] || (this.events[t] = new cm()), this.events[t].add(i);
  }
  notify(t, ...i) {
    this.events[t] && this.events[t].notify(...i);
  }
  scheduleRenderMicrotask() {
    Dm.render(this.render);
  }
}
class bx extends vx {
  constructor() {
    super(...arguments), this.KeyframeResolver = S6;
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
class ni {
  constructor(t) {
    this.isMounted = !1, this.node = t;
  }
  update() {
  }
}
function xx({ top: n, left: t, right: i, bottom: l }) {
  return {
    x: { min: t, max: i },
    y: { min: n, max: l }
  };
}
function G6({ x: n, y: t }) {
  return { top: t.min, right: n.max, bottom: t.max, left: n.min };
}
function X6(n, t) {
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
function kd(n) {
  return n === void 0 || n === 1;
}
function _h({ scale: n, scaleX: t, scaleY: i }) {
  return !kd(n) || !kd(t) || !kd(i);
}
function _i(n) {
  return _h(n) || Sx(n) || n.z || n.rotate || n.rotateX || n.rotateY || n.skewX || n.skewY;
}
function Sx(n) {
  return Jg(n.x) || Jg(n.y);
}
function Jg(n) {
  return n && n !== "0%";
}
function Vc(n, t, i) {
  const l = n - i, o = t * l;
  return i + o;
}
function Wg(n, t, i, l, o) {
  return o !== void 0 && (n = Vc(n, o, l)), Vc(n, i, l) + t;
}
function Rh(n, t = 0, i = 1, l, o) {
  n.min = Wg(n.min, t, i, l, o), n.max = Wg(n.max, t, i, l, o);
}
function wx(n, { x: t, y: i }) {
  Rh(n.x, t.translate, t.scale, t.originPoint), Rh(n.y, i.translate, i.scale, i.originPoint);
}
const tv = 0.999999999999, ev = 1.0000000000001;
function K6(n, t, i, l = !1) {
  const o = i.length;
  if (!o)
    return;
  t.x = t.y = 1;
  let c, u;
  for (let d = 0; d < o; d++) {
    c = i[d], u = c.projectionDelta;
    const { visualElement: p } = c.options;
    p && p.props.style && p.props.style.display === "contents" || (l && c.options.layoutScroll && c.scroll && c !== c.root && (Xn(n.x, -c.scroll.offset.x), Xn(n.y, -c.scroll.offset.y)), u && (t.x *= u.x.scale, t.y *= u.y.scale, wx(n, u)), l && _i(c.latestValues) && wc(n, c.latestValues, c.layout?.layoutBox));
  }
  t.x < ev && t.x > tv && (t.x = 1), t.y < ev && t.y > tv && (t.y = 1);
}
function Xn(n, t) {
  n.min += t, n.max += t;
}
function nv(n, t, i, l, o = 0.5) {
  const c = Ft(n.min, n.max, o);
  Rh(n, t, i, c, l);
}
function av(n, t) {
  return typeof n == "string" ? parseFloat(n) / 100 * (t.max - t.min) : n;
}
function wc(n, t, i) {
  const l = i ?? n;
  nv(n.x, av(t.x, l.x), t.scaleX, t.scale, t.originX), nv(n.y, av(t.y, l.y), t.scaleY, t.scale, t.originY);
}
function Cx(n, t) {
  return xx(X6(n.getBoundingClientRect(), t));
}
function Z6(n, t, i) {
  const l = Cx(n, i), { scroll: o } = t;
  return o && (Xn(l.x, o.offset.x), Xn(l.y, o.offset.y)), l;
}
const Q6 = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, F6 = Is.length;
function I6(n, t, i) {
  let l = "", o = !0;
  for (let u = 0; u < F6; u++) {
    const d = Is[u], p = n[d];
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
      const g = Mh(p, $c[d]);
      if (!y) {
        o = !1;
        const v = Q6[d] || d;
        l += `${v}(${g}) `;
      }
      i && (t[d] = g);
    }
  }
  const c = n.pathRotation;
  return c && (o = !1, l += `rotate(${Mh(c, $c.pathRotation)}) `), l = l.trim(), i ? l = i(t, o ? "" : l) : o && (l = "none"), l;
}
function km(n, t, i) {
  const { style: l, vars: o, transformOrigin: c } = n;
  let u = !1, d = !1;
  for (const p in t) {
    const y = t[p];
    if (Js.has(p)) {
      u = !0;
      continue;
    } else if (Nb(p)) {
      o[p] = y;
      continue;
    } else {
      const g = Mh(y, $c[p]);
      p.startsWith("origin") ? (d = !0, c[p] = g) : l[p] = g;
    }
  }
  if (t.transform || (u || i ? l.transform = I6(t, n.transform, i) : l.transform && (l.transform = "none")), d) {
    const { originX: p = "50%", originY: y = "50%", originZ: g = 0 } = c;
    l.transformOrigin = `${p} ${y} ${g}`;
  }
}
function Tx(n, { style: t, vars: i }, l, o) {
  const c = n.style;
  let u;
  for (u in t)
    c[u] = t[u];
  o?.applyProjectionStyles(c, l);
  for (u in i)
    c.setProperty(u, i[u]);
}
function iv(n, t) {
  return t.max === t.min ? 0 : n / (t.max - t.min) * 100;
}
const Gl = {
  correct: (n, t) => {
    if (!t.target)
      return n;
    if (typeof n == "string")
      if (bt.test(n))
        n = parseFloat(n);
      else
        return n;
    const i = iv(n, t.target.x), l = iv(n, t.target.y);
    return `${i}% ${l}%`;
  }
}, J6 = {
  correct: (n, { treeScale: t, projectionDelta: i }) => {
    const l = n, o = Bn.parse(n);
    if (o.length > 5)
      return l;
    const c = Bn.createTransformer(n), u = typeof o[0] != "number" ? 1 : 0, d = i.x.scale * t.x, p = i.y.scale * t.y;
    o[0 + u] /= d, o[1 + u] /= p;
    const y = Ft(d, p, 0.5);
    return typeof o[2 + u] == "number" && (o[2 + u] /= y), typeof o[3 + u] == "number" && (o[3 + u] /= y), c(o);
  }
}, Dh = {
  borderRadius: {
    ...Gl,
    applyTo: [..._m]
  },
  borderTopLeftRadius: Gl,
  borderTopRightRadius: Gl,
  borderBottomLeftRadius: Gl,
  borderBottomRightRadius: Gl,
  boxShadow: J6
};
function jx(n, { layout: t, layoutId: i }) {
  return Js.has(n) || n.startsWith("origin") || (t || i !== void 0) && (!!Dh[n] || n === "opacity");
}
function Bm(n, t, i) {
  const l = n.style, o = t?.style, c = {};
  if (!l)
    return c;
  for (const u in l)
    (Ee(l[u]) || o && Ee(o[u]) || jx(u, n) || i?.getValue(u)?.liveStyle !== void 0) && (c[u] = l[u]);
  return c;
}
function W6(n) {
  return window.getComputedStyle(n);
}
class Ax extends bx {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Tx;
  }
  readValueFromInstance(t, i) {
    if (Js.has(i))
      return this.projection?.isProjecting ? gh(i) : S9(t, i);
    {
      const l = W6(t), o = (Nb(i) ? l.getPropertyValue(i) : l[i]) || 0;
      return typeof o == "string" ? o.trim() : o;
    }
  }
  measureInstanceViewportBox(t, { transformPagePoint: i }) {
    return Cx(t, i);
  }
  build(t, i, l) {
    km(t, i, l.transformTemplate);
  }
  scrapeMotionValuesFromProps(t, i, l) {
    return Bm(t, i, l);
  }
}
function tC(n, t) {
  return n in t;
}
class eC extends vx {
  constructor() {
    super(...arguments), this.type = "object";
  }
  readValueFromInstance(t, i) {
    if (tC(i, t)) {
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
    return Se();
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
const nC = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, aC = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function iC(n, t, i = 1, l = 0, o = !0) {
  n.pathLength = 1;
  const c = o ? nC : aC;
  n[c.offset] = `${-l}`, n[c.array] = `${t} ${i}`;
}
const sC = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function Ex(n, {
  attrX: t,
  attrY: i,
  attrScale: l,
  pathLength: o,
  pathSpacing: c = 1,
  pathOffset: u = 0,
  // This is object creation, which we try to avoid per-frame.
  ...d
}, p, y, g) {
  if (km(n, d, y), p) {
    n.style.viewBox && (n.attrs.viewBox = n.style.viewBox);
    return;
  }
  n.attrs = n.style, n.style = {};
  const { attrs: v, style: b } = n;
  v.transform && (b.transform = v.transform, delete v.transform), (b.transform || v.transformOrigin) && (b.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), b.transform && (b.transformBox = g?.transformBox ?? "fill-box", delete v.transformBox);
  for (const j of sC)
    v[j] !== void 0 && (b[j] = v[j], delete v[j]);
  t !== void 0 && (v.x = t), i !== void 0 && (v.y = i), l !== void 0 && (v.scale = l), o !== void 0 && iC(v, o, c, u, !1);
}
const Mx = /* @__PURE__ */ new Set([
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
]), _x = (n) => typeof n == "string" && n.toLowerCase() === "svg";
function lC(n, t, i, l) {
  Tx(n, t, void 0, l);
  for (const o in t.attrs)
    n.setAttribute(Mx.has(o) ? o : Em(o), t.attrs[o]);
}
function Rx(n, t, i) {
  const l = Bm(n, t, i);
  for (const o in n)
    if (Ee(n[o]) || Ee(t[o])) {
      const c = Is.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
      l[c] = n[o];
    }
  return l;
}
class Dx extends bx {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Se;
  }
  getBaseTargetFromProps(t, i) {
    return t[i];
  }
  readValueFromInstance(t, i) {
    if (Js.has(i)) {
      const l = ox(i);
      return l && l.default || 0;
    }
    return i = Mx.has(i) ? i : Em(i), t.getAttribute(i);
  }
  scrapeMotionValuesFromProps(t, i, l) {
    return Rx(t, i, l);
  }
  build(t, i, l) {
    Ex(t, i, this.isSVGTag, l.transformTemplate, l.style);
  }
  renderInstance(t, i, l, o) {
    lC(t, i, l, o);
  }
  mount(t) {
    this.isSVGTag = _x(t.tagName), super.mount(t);
  }
}
const rC = Lm.length;
function Nx(n) {
  if (!n)
    return;
  if (!n.isControllingVariants) {
    const i = n.parent ? Nx(n.parent) || {} : {};
    return n.props.initial !== void 0 && (i.initial = n.props.initial), i;
  }
  const t = {};
  for (let i = 0; i < rC; i++) {
    const l = Lm[i], o = n.props[l];
    (gr(o) || o === !1) && (t[l] = o);
  }
  return t;
}
function Ox(n, t) {
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
const oC = [...Om].reverse(), cC = Om.length;
function uC(n) {
  return (t) => Promise.all(t.map(({ animation: i, options: l }) => u6(n, i, l)));
}
function fC(n) {
  let t = uC(n), i = sv(), l = !0, o = !1;
  const c = (y) => (g, v) => {
    const b = Bi(n, v, y === "exit" ? n.presenceContext?.custom : void 0);
    if (b) {
      const { transition: j, transitionEnd: w, ...C } = b;
      g = { ...g, ...C, ...w };
    }
    return g;
  };
  function u(y) {
    t = y(n);
  }
  function d(y) {
    const { props: g } = n, v = Nx(n.parent) || {}, b = [], j = /* @__PURE__ */ new Set();
    let w = {}, C = 1 / 0;
    for (let A = 0; A < cC; A++) {
      const R = oC[A], M = i[R], _ = g[R] !== void 0 ? g[R] : v[R], L = gr(_), N = R === y ? M.isActive : null;
      N === !1 && (C = A);
      let D = _ === v[R] && _ !== g[R] && L;
      if (D && (l || o) && n.manuallyAnimateOnMount && (D = !1), M.protectedKeys = { ...w }, // If it isn't active and hasn't *just* been set as inactive
      !M.isActive && N === null || // If we didn't and don't have any defined prop for this animation type
      !_ && !M.prevProp || // Or if the prop doesn't define an animation
      Jc(_) || typeof _ == "boolean")
        continue;
      if (R === "exit" && M.isActive && N !== !0) {
        M.prevResolvedValues && (w = {
          ...w,
          ...M.prevResolvedValues
        });
        continue;
      }
      const V = dC(M.prevProp, _);
      let H = V || // If we're making this variant active, we want to always make it active
      R === y && M.isActive && !D && L || // If we removed a higher-priority variant (i is in reverse order)
      A > C && L, B = !1;
      const U = Array.isArray(_) ? _ : [_];
      let I = U.reduce(c(R), {});
      N === !1 && (I = {});
      const { prevResolvedValues: P = {} } = M, it = {
        ...P,
        ...I
      }, J = (F) => {
        H = !0, j.has(F) && (B = !0, j.delete(F)), M.needsAnimating[F] = !0;
        const tt = n.getValue(F);
        tt && (tt.liveStyle = !1);
      };
      for (const F in it) {
        const tt = I[F], dt = P[F];
        if (w.hasOwnProperty(F))
          continue;
        let O = !1;
        Ch(tt) && Ch(dt) ? O = !Ox(tt, dt) || V : O = tt !== dt, O ? tt != null ? J(F) : j.add(F) : tt !== void 0 && j.has(F) ? J(F) : M.protectedKeys[F] = !0;
      }
      M.prevProp = _, M.prevResolvedValues = I, M.isActive && (w = { ...w, ...I }), (l || o) && n.blockInitialAnimation && (H = !1);
      const $ = D && V;
      H && (!$ || B) && b.push(...U.map((F) => {
        const tt = { type: R };
        if (typeof F == "string" && (l || o) && !$ && n.manuallyAnimateOnMount && n.parent) {
          const { parent: dt } = n, O = Bi(dt, F);
          if (dt.enteringChildren && O) {
            const { delayChildren: q } = O.transition || {};
            tt.delay = ex(dt.enteringChildren, n, q);
          }
        }
        return {
          animation: F,
          options: tt
        };
      }));
    }
    if (j.size) {
      const A = {};
      if (typeof g.initial != "boolean") {
        const R = Bi(n, Array.isArray(g.initial) ? g.initial[0] : g.initial);
        R && R.transition && (A.transition = R.transition);
      }
      j.forEach((R) => {
        const M = n.getBaseTarget(R), _ = n.getValue(R);
        _ && (_.liveStyle = !0), A[R] = M ?? null;
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
      i = sv(), o = !0;
    }
  };
}
function dC(n, t) {
  return typeof t == "string" ? t !== n : Array.isArray(t) ? !Ox(t, n) : !1;
}
function ji(n = !1) {
  return {
    isActive: n,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function sv() {
  return {
    animate: ji(!0),
    whileInView: ji(),
    whileHover: ji(),
    whileTap: ji(),
    whileDrag: ji(),
    whileFocus: ji(),
    exit: ji()
  };
}
function Nh(n, t) {
  n.min = t.min, n.max = t.max;
}
function Dn(n, t) {
  Nh(n.x, t.x), Nh(n.y, t.y);
}
function lv(n, t) {
  n.translate = t.translate, n.scale = t.scale, n.originPoint = t.originPoint, n.origin = t.origin;
}
const Lx = 1e-4, hC = 1 - Lx, mC = 1 + Lx, $x = 0.01, pC = 0 - $x, yC = 0 + $x;
function Ke(n) {
  return n.max - n.min;
}
function gC(n, t, i) {
  return Math.abs(n - t) <= i;
}
function rv(n, t, i, l = 0.5) {
  n.origin = l, n.originPoint = Ft(t.min, t.max, n.origin), n.scale = Ke(i) / Ke(t), n.translate = Ft(i.min, i.max, n.origin) - n.originPoint, (n.scale >= hC && n.scale <= mC || isNaN(n.scale)) && (n.scale = 1), (n.translate >= pC && n.translate <= yC || isNaN(n.translate)) && (n.translate = 0);
}
function ar(n, t, i, l) {
  rv(n.x, t.x, i.x, l ? l.originX : void 0), rv(n.y, t.y, i.y, l ? l.originY : void 0);
}
function ov(n, t, i, l = 0) {
  const o = l ? Ft(i.min, i.max, l) : i.min;
  n.min = o + t.min, n.max = n.min + Ke(t);
}
function vC(n, t, i, l) {
  ov(n.x, t.x, i.x, l?.x), ov(n.y, t.y, i.y, l?.y);
}
function cv(n, t, i, l = 0) {
  const o = l ? Ft(i.min, i.max, l) : i.min;
  n.min = t.min - o, n.max = n.min + Ke(t);
}
function zc(n, t, i, l) {
  cv(n.x, t.x, i.x, l?.x), cv(n.y, t.y, i.y, l?.y);
}
function uv(n, t, i, l, o) {
  return n -= t, n = Vc(n, 1 / i, l), o !== void 0 && (n = Vc(n, 1 / o, l)), n;
}
function bC(n, t = 0, i = 1, l = 0.5, o, c = n, u = n) {
  if (Kn.test(t) && (t = parseFloat(t), t = Ft(u.min, u.max, t / 100) - u.min), typeof t != "number")
    return;
  let d = Ft(c.min, c.max, l);
  n === c && (d -= t), n.min = uv(n.min, t, i, d, o), n.max = uv(n.max, t, i, d, o);
}
function fv(n, t, [i, l, o], c, u) {
  bC(n, t[i], t[l], t[o], t.scale, c, u);
}
const xC = ["x", "scaleX", "originX"], SC = ["y", "scaleY", "originY"];
function dv(n, t, i, l) {
  fv(n.x, t, xC, i ? i.x : void 0, l ? l.x : void 0), fv(n.y, t, SC, i ? i.y : void 0, l ? l.y : void 0);
}
function hv(n) {
  return n.translate === 0 && n.scale === 1;
}
function kx(n) {
  return hv(n.x) && hv(n.y);
}
function mv(n, t) {
  return n.min === t.min && n.max === t.max;
}
function wC(n, t) {
  return mv(n.x, t.x) && mv(n.y, t.y);
}
function pv(n, t) {
  return Math.round(n.min) === Math.round(t.min) && Math.round(n.max) === Math.round(t.max);
}
function Bx(n, t) {
  return pv(n.x, t.x) && pv(n.y, t.y);
}
function yv(n) {
  return Ke(n.x) / Ke(n.y);
}
function gv(n, t) {
  return n.translate === t.translate && n.scale === t.scale && n.originPoint === t.originPoint;
}
function Gn(n) {
  return [n("x"), n("y")];
}
function CC(n, t, i) {
  let l = "";
  const o = n.x.translate / t.x, c = n.y.translate / t.y, u = i?.z || 0;
  if ((o || c || u) && (l = `translate3d(${o}px, ${c}px, ${u}px) `), (t.x !== 1 || t.y !== 1) && (l += `scale(${1 / t.x}, ${1 / t.y}) `), i) {
    const { transformPerspective: y, rotate: g, pathRotation: v, rotateX: b, rotateY: j, skewX: w, skewY: C } = i;
    y && (l = `perspective(${y}px) ${l}`), g && (l += `rotate(${g}deg) `), v && (l += `rotate(${v}deg) `), b && (l += `rotateX(${b}deg) `), j && (l += `rotateY(${j}deg) `), w && (l += `skewX(${w}deg) `), C && (l += `skewY(${C}deg) `);
  }
  const d = n.x.scale * t.x, p = n.y.scale * t.y;
  return (d !== 1 || p !== 1) && (l += `scale(${d}, ${p})`), l || "none";
}
const TC = _m.length, vv = (n) => typeof n == "string" ? parseFloat(n) : n, bv = (n) => typeof n == "number" || bt.test(n);
function jC(n, t, i, l, o, c) {
  o ? (n.opacity = Ft(0, i.opacity ?? 1, AC(l)), n.opacityExit = Ft(t.opacity ?? 1, 0, EC(l))) : c && (n.opacity = Ft(t.opacity ?? 1, i.opacity ?? 1, l));
  for (let u = 0; u < TC; u++) {
    const d = _m[u];
    let p = xv(t, d), y = xv(i, d);
    if (p === void 0 && y === void 0)
      continue;
    p || (p = 0), y || (y = 0), p === 0 || y === 0 || bv(p) === bv(y) ? (n[d] = Math.max(Ft(vv(p), vv(y), l), 0), (Kn.test(y) || Kn.test(p)) && (n[d] += "%")) : n[d] = y;
  }
  (t.rotate || i.rotate) && (n.rotate = Ft(t.rotate || 0, i.rotate || 0, l));
}
function xv(n, t) {
  return n[t] !== void 0 ? n[t] : n.borderRadius;
}
const AC = /* @__PURE__ */ Vx(0, 0.5, Tb), EC = /* @__PURE__ */ Vx(0.5, 0.95, An);
function Vx(n, t, i) {
  return (l) => l < n ? 0 : l > t ? 1 : i(/* @__PURE__ */ Ys(n, t, l));
}
function zx(n, t, i) {
  const l = Ee(n) ? n : Ja(n);
  return l.start(jm("", l, t, i)), l.animation;
}
function vr(n, t, i, l = { passive: !0 }) {
  return n.addEventListener(t, i, l), () => n.removeEventListener(t, i, l);
}
const MC = (n, t) => n.depth - t.depth;
class _C {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(t) {
    rm(this.children, t), this.isDirty = !0;
  }
  remove(t) {
    qs(this.children, t), this.isDirty = !0;
  }
  forEach(t) {
    this.isDirty && this.children.sort(MC), this.isDirty = !1, this.children.forEach(t);
  }
}
function RC(n, t) {
  const i = Xe.now(), l = ({ timestamp: o }) => {
    const c = o - i;
    c >= t && (wa(l), n(c - t));
  };
  return It.setup(l, !0), () => wa(l);
}
function Cc(n) {
  return Ee(n) ? n.get() : n;
}
class DC {
  constructor() {
    this.members = [];
  }
  add(t) {
    rm(this.members, t);
    for (let i = this.members.length - 1; i >= 0; i--) {
      const l = this.members[i];
      if (l === t || l === this.lead || l === this.prevLead)
        continue;
      const o = l.instance;
      (!o || o.isConnected === !1) && !l.snapshot && (qs(this.members, l), l.unmount());
    }
    t.scheduleRender();
  }
  remove(t) {
    if (qs(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead) {
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
const Tc = {
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
}, Bd = ["", "X", "Y", "Z"], NC = 1e3;
let OC = 0;
function Vd(n, t, i, l) {
  const { latestValues: o } = t;
  o[n] && (i[n] = o[n], t.setStaticValue(n, 0), l && (l[n] = 0));
}
function Ux(n) {
  if (n.hasCheckedOptimisedAppear = !0, n.root === n)
    return;
  const { visualElement: t } = n.options;
  if (!t)
    return;
  const i = sx(t);
  if (window.MotionHasOptimisedAnimation(i, "transform")) {
    const { layout: o, layoutId: c } = n.options;
    window.MotionCancelOptimisedAnimation(i, "transform", It, !(o || c));
  }
  const { parent: l } = n;
  l && !l.hasCheckedOptimisedAppear && Ux(l);
}
function Hx({ attachResizeListener: n, defaultParent: t, measureScroll: i, checkIsScrollRoot: l, resetTransform: o }) {
  return class {
    constructor(u = {}, d = t?.()) {
      this.id = OC++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(kC), this.nodes.forEach(qC), this.nodes.forEach(YC), this.nodes.forEach(BC);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = u, this.root = d ? d.root || d : this, this.path = d ? [...d.path, d] : [], this.parent = d, this.depth = d ? d.depth + 1 : 0;
      for (let p = 0; p < this.path.length; p++)
        this.path[p].shouldResetTransform = !0;
      this.root === this && (this.nodes = new _C());
    }
    addEventListener(u, d) {
      return this.eventHandlers.has(u) || this.eventHandlers.set(u, new cm()), this.eventHandlers.get(u).add(d);
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
      this.isSVG = Ic(u) && !mx(u), this.instance = u;
      const { layoutId: d, layout: p, visualElement: y } = this.options;
      if (y && !y.current && y.mount(u), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (p || d) && (this.isLayoutDirty = !0), n) {
        let g, v = 0;
        const b = () => this.root.updateBlockedByResize = !1;
        It.read(() => {
          v = window.innerWidth;
        }), n(u, () => {
          const j = window.innerWidth;
          j !== v && (v = j, this.root.updateBlockedByResize = !0, g && g(), g = RC(b, 250), Tc.hasAnimatedSinceResize && (Tc.hasAnimatedSinceResize = !1, this.nodes.forEach(Cv)));
        });
      }
      d && this.root.registerSharedNode(d, this), this.options.animate !== !1 && y && (d || p) && this.addEventListener("didUpdate", ({ delta: g, hasLayoutChanged: v, hasRelativeLayoutChanged: b, layout: j }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const w = this.options.transition || y.getDefaultTransition() || ZC, { onLayoutAnimationStart: C, onLayoutAnimationComplete: x } = y.getProps(), A = !this.targetLayout || !Bx(this.targetLayout, j), R = !v && b;
        if (this.options.layoutRoot || this.resumeFrom || R || v && (A || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const M = {
            ...Tm(w, "layout"),
            onPlay: C,
            onComplete: x
          };
          (y.shouldReduceMotion || this.options.layoutRoot) && (M.delay = 0, M.type = !1), this.startAnimation(M), this.setAnimationOrigin(g, R, M.path);
        } else
          v || Cv(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = j;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const u = this.getStack();
      u && u.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), wa(this.updateProjection);
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
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(PC), this.animationId++);
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
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Ux(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
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
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), p && this.nodes.forEach(zC), this.nodes.forEach(Sv);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(wv);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(UC), this.nodes.forEach(HC), this.nodes.forEach(LC), this.nodes.forEach($C)) : this.nodes.forEach(wv), this.clearAllSnapshots();
      const d = Xe.now();
      ke.delta = Zn(0, 1e3 / 60, d - ke.timestamp), ke.timestamp = d, ke.isProcessing = !0, _d.update.process(ke), _d.preRender.process(ke), _d.render.process(ke), ke.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Dm.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(VC), this.sharedNodes.forEach(GC);
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
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !Ke(this.snapshot.measuredBox.x) && !Ke(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let p = 0; p < this.path.length; p++)
          this.path[p].updateScroll();
      const u = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = Se()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
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
      const u = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, d = this.projectionDelta && !kx(this.projectionDelta), p = this.getTransformTemplate(), y = p ? p(this.latestValues, "") : void 0, g = y !== this.prevTransformTemplateValue;
      u && this.instance && (d || _i(this.latestValues) || g) && (o(this.instance, y), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(u = !0) {
      const d = this.measurePageBox();
      let p = this.removeElementScroll(d);
      return u && (p = this.removeTransform(p)), QC(p), {
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
        return Se();
      const d = u.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(FC))) {
        const { scroll: y } = this.root;
        y && (Xn(d.x, y.offset.x), Xn(d.y, y.offset.y));
      }
      return d;
    }
    removeElementScroll(u) {
      const d = Se();
      if (Dn(d, u), this.scroll?.wasRoot)
        return d;
      for (let p = 0; p < this.path.length; p++) {
        const y = this.path[p], { scroll: g, options: v } = y;
        y !== this.root && g && v.layoutScroll && (g.wasRoot && Dn(d, u), Xn(d.x, g.offset.x), Xn(d.y, g.offset.y));
      }
      return d;
    }
    applyTransform(u, d = !1, p) {
      const y = p || Se();
      Dn(y, u);
      for (let g = 0; g < this.path.length; g++) {
        const v = this.path[g];
        !d && v.options.layoutScroll && v.scroll && v !== v.root && (Xn(y.x, -v.scroll.offset.x), Xn(y.y, -v.scroll.offset.y)), _i(v.latestValues) && wc(y, v.latestValues, v.layout?.layoutBox);
      }
      return _i(this.latestValues) && wc(y, this.latestValues, this.layout?.layoutBox), y;
    }
    removeTransform(u) {
      const d = Se();
      Dn(d, u);
      for (let p = 0; p < this.path.length; p++) {
        const y = this.path[p];
        if (!_i(y.latestValues))
          continue;
        let g;
        y.instance && (_h(y.latestValues) && y.updateSnapshot(), g = Se(), Dn(g, y.measurePageBox())), dv(d, y.latestValues, y.snapshot?.layoutBox, g);
      }
      return _i(this.latestValues) && dv(d, this.latestValues), d;
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
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== ke.timestamp && this.relativeParent.resolveTargetDelta(!0);
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
      this.resolvedRelativeTargetAt = ke.timestamp;
      const b = this.getClosestProjectingParent();
      b && this.linkedParentVersion !== b.layoutVersion && !b.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && b && b.layout ? this.createRelativeTarget(b, this.layout.layoutBox, b.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = Se(), this.targetWithTransforms = Se()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), vC(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : Dn(this.target, this.layout.layoutBox), wx(this.target, this.targetDelta)) : Dn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && b && !!b.resumingFrom == !!this.resumingFrom && !b.options.layoutScroll && b.target && this.animationProgress !== 1 ? this.createRelativeTarget(b, this.target, b.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || _h(this.parent.latestValues) || Sx(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(u, d, p) {
      this.relativeParent = u, this.linkedParentVersion = u.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = Se(), this.relativeTargetOrigin = Se(), zc(this.relativeTargetOrigin, d, p, this.options.layoutAnchor || void 0), Dn(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const u = this.getLead(), d = !!this.resumingFrom || this !== u;
      let p = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (p = !1), d && (this.isSharedProjectionDirty || this.isTransformDirty) && (p = !1), this.resolvedRelativeTargetAt === ke.timestamp && (p = !1), p)
        return;
      const { layout: y, layoutId: g } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(y || g))
        return;
      Dn(this.layoutCorrected, this.layout.layoutBox);
      const v = this.treeScale.x, b = this.treeScale.y;
      K6(this.layoutCorrected, this.treeScale, this.path, d), u.layout && !u.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (u.target = u.layout.layoutBox, u.targetWithTransforms = Se());
      const { target: j } = u;
      if (!j) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (lv(this.prevProjectionDelta.x, this.projectionDelta.x), lv(this.prevProjectionDelta.y, this.projectionDelta.y)), ar(this.projectionDelta, this.layoutCorrected, j, this.latestValues), (this.treeScale.x !== v || this.treeScale.y !== b || !gv(this.projectionDelta.x, this.prevProjectionDelta.x) || !gv(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", j));
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
      this.prevProjectionDelta = ks(), this.projectionDelta = ks(), this.projectionDeltaWithTransform = ks();
    }
    setAnimationOrigin(u, d = !1, p) {
      const y = this.snapshot, g = y ? y.latestValues : {}, v = { ...this.latestValues }, b = ks();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !d;
      const j = Se(), w = y ? y.source : void 0, C = this.layout ? this.layout.source : void 0, x = w !== C, A = this.getStack(), R = !A || A.members.length <= 1, M = !!(x && !R && this.options.crossfade === !0 && !this.path.some(KC));
      this.animationProgress = 0;
      let _;
      const L = p?.interpolateProjection(u);
      this.mixTargetDelta = (N) => {
        const D = N / 1e3, V = L?.(D);
        V ? (b.x.translate = V.x, b.x.scale = Ft(u.x.scale, 1, D), b.x.origin = u.x.origin, b.x.originPoint = u.x.originPoint, b.y.translate = V.y, b.y.scale = Ft(u.y.scale, 1, D), b.y.origin = u.y.origin, b.y.originPoint = u.y.originPoint) : (Tv(b.x, u.x, D), Tv(b.y, u.y, D)), this.setTargetDelta(b), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (zc(j, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), XC(this.relativeTarget, this.relativeTargetOrigin, j, D), _ && wC(this.relativeTarget, _) && (this.isProjectionDirty = !1), _ || (_ = Se()), Dn(_, this.relativeTarget)), x && (this.animationValues = v, jC(v, g, this.latestValues, D, M, R)), V && V.rotate !== void 0 && (this.animationValues || (this.animationValues = v), this.animationValues.pathRotation = V.rotate), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = D;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(u) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (wa(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = It.update(() => {
        Tc.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = Ja(0)), this.motionValue.jump(0, !1), this.currentAnimation = zx(this.motionValue, [0, 1e3], {
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
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(NC), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const u = this.getLead();
      let { targetWithTransforms: d, target: p, layout: y, latestValues: g } = u;
      if (!(!d || !p || !y)) {
        if (this !== u && this.layout && y && qx(this.options.animationType, this.layout.layoutBox, y.layoutBox)) {
          p = this.target || Se();
          const v = Ke(this.layout.layoutBox.x);
          p.x.min = u.target.x.min, p.x.max = p.x.min + v;
          const b = Ke(this.layout.layoutBox.y);
          p.y.min = u.target.y.min, p.y.max = p.y.min + b;
        }
        Dn(d, p), wc(d, g), ar(this.projectionDeltaWithTransform, this.layoutCorrected, d, g);
      }
    }
    registerSharedNode(u, d) {
      this.sharedNodes.has(u) || this.sharedNodes.set(u, new DC()), this.sharedNodes.get(u).add(d);
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
      p.z && Vd("z", u, y, this.animationValues);
      for (let g = 0; g < Bd.length; g++)
        Vd(`rotate${Bd[g]}`, u, y, this.animationValues), Vd(`skew${Bd[g]}`, u, y, this.animationValues);
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
        this.needsReset = !1, u.visibility = "", u.opacity = "", u.pointerEvents = Cc(d?.pointerEvents) || "", u.transform = p ? p(this.latestValues, "") : "none";
        return;
      }
      const y = this.getLead();
      if (!this.projectionDelta || !this.layout || !y.target) {
        this.options.layoutId && (u.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, u.pointerEvents = Cc(d?.pointerEvents) || ""), this.hasProjected && !_i(this.latestValues) && (u.transform = p ? p({}, "") : "none", this.hasProjected = !1);
        return;
      }
      u.visibility = "";
      const g = y.animationValues || y.latestValues;
      this.applyTransformsToTarget();
      let v = CC(this.projectionDeltaWithTransform, this.treeScale, g);
      p && (v = p(g, v)), u.transform = v;
      const { x: b, y: j } = this.projectionDelta;
      u.transformOrigin = `${b.origin * 100}% ${j.origin * 100}% 0`, y.animationValues ? u.opacity = y === this ? g.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : g.opacityExit : u.opacity = y === this ? g.opacity !== void 0 ? g.opacity : "" : g.opacityExit !== void 0 ? g.opacityExit : 0;
      for (const w in Dh) {
        if (g[w] === void 0)
          continue;
        const { correct: C, applyTo: x, isCSSVariable: A } = Dh[w], R = v === "none" ? g[w] : C(g[w], y);
        if (x) {
          const M = x.length;
          for (let _ = 0; _ < M; _++)
            u[x[_]] = R;
        } else
          A ? this.options.visualElement.renderState.vars[w] = R : u[w] = R;
      }
      this.options.layoutId && (u.pointerEvents = y === this ? Cc(d?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((u) => u.currentAnimation?.stop()), this.root.nodes.forEach(Sv), this.root.sharedNodes.clear();
    }
  };
}
function LC(n) {
  n.updateLayout();
}
function $C(n) {
  const t = n.resumeFrom?.snapshot || n.snapshot;
  if (n.isLead() && n.layout && t && n.hasListeners("didUpdate")) {
    const { layoutBox: i, measuredBox: l } = n.layout, { animationType: o } = n.options, c = t.source !== n.layout.source;
    if (o === "size")
      Gn((g) => {
        const v = c ? t.measuredBox[g] : t.layoutBox[g], b = Ke(v);
        v.min = i[g].min, v.max = v.min + b;
      });
    else if (o === "x" || o === "y") {
      const g = o === "x" ? "y" : "x";
      Nh(c ? t.measuredBox[g] : t.layoutBox[g], i[g]);
    } else qx(o, t.layoutBox, i) && Gn((g) => {
      const v = c ? t.measuredBox[g] : t.layoutBox[g], b = Ke(i[g]);
      v.max = v.min + b, n.relativeTarget && !n.currentAnimation && (n.isProjectionDirty = !0, n.relativeTarget[g].max = n.relativeTarget[g].min + b);
    });
    const u = ks();
    ar(u, i, t.layoutBox);
    const d = ks();
    c ? ar(d, n.applyTransform(l, !0), t.measuredBox) : ar(d, i, t.layoutBox);
    const p = !kx(u);
    let y = !1;
    if (!n.resumeFrom) {
      const g = n.getClosestProjectingParent();
      if (g && !g.resumeFrom) {
        const { snapshot: v, layout: b } = g;
        if (v && b) {
          const j = n.options.layoutAnchor || void 0, w = Se();
          zc(w, t.layoutBox, v.layoutBox, j);
          const C = Se();
          zc(C, i, b.layoutBox, j), Bx(w, C) || (y = !0), g.options.layoutRoot && (n.relativeTarget = C, n.relativeTargetOrigin = w, n.relativeParent = g);
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
function kC(n) {
  n.parent && (n.isProjecting() || (n.isProjectionDirty = n.parent.isProjectionDirty), n.isSharedProjectionDirty || (n.isSharedProjectionDirty = !!(n.isProjectionDirty || n.parent.isProjectionDirty || n.parent.isSharedProjectionDirty)), n.isTransformDirty || (n.isTransformDirty = n.parent.isTransformDirty));
}
function BC(n) {
  n.isProjectionDirty = n.isSharedProjectionDirty = n.isTransformDirty = !1;
}
function VC(n) {
  n.clearSnapshot();
}
function Sv(n) {
  n.clearMeasurements();
}
function zC(n) {
  n.isLayoutDirty = !0, n.updateLayout();
}
function wv(n) {
  n.isLayoutDirty = !1;
}
function UC(n) {
  n.isAnimationBlocked && n.layout && !n.isLayoutDirty && (n.snapshot = n.layout, n.isLayoutDirty = !0);
}
function HC(n) {
  const { visualElement: t } = n.options;
  t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"), n.resetTransform();
}
function Cv(n) {
  n.finishAnimation(), n.targetDelta = n.relativeTarget = n.target = void 0, n.isProjectionDirty = !0;
}
function qC(n) {
  n.resolveTargetDelta();
}
function YC(n) {
  n.calcProjection();
}
function PC(n) {
  n.resetSkewAndRotation();
}
function GC(n) {
  n.removeLeadSnapshot();
}
function Tv(n, t, i) {
  n.translate = Ft(t.translate, 0, i), n.scale = Ft(t.scale, 1, i), n.origin = t.origin, n.originPoint = t.originPoint;
}
function jv(n, t, i, l) {
  n.min = Ft(t.min, i.min, l), n.max = Ft(t.max, i.max, l);
}
function XC(n, t, i, l) {
  jv(n.x, t.x, i.x, l), jv(n.y, t.y, i.y, l);
}
function KC(n) {
  return n.animationValues && n.animationValues.opacityExit !== void 0;
}
const ZC = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, Av = (n) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(n), Ev = Av("applewebkit/") && !Av("chrome/") ? Math.round : An;
function Mv(n) {
  n.min = Ev(n.min), n.max = Ev(n.max);
}
function QC(n) {
  Mv(n.x), Mv(n.y);
}
function qx(n, t, i) {
  return n === "position" || n === "preserve-aspect" && !gC(yv(t), yv(i), 0.2);
}
function FC(n) {
  return n !== n.root && n.scroll?.wasRoot;
}
const IC = Hx({
  attachResizeListener: (n, t) => vr(n, "resize", t),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), zd = {
  current: void 0
}, Yx = Hx({
  measureScroll: (n) => ({
    x: n.scrollLeft,
    y: n.scrollTop
  }),
  defaultParent: () => {
    if (!zd.current) {
      const n = new IC({});
      n.mount(window), n.setOptions({ layoutScroll: !0 }), zd.current = n;
    }
    return zd.current;
  },
  resetTransform: (n, t) => {
    n.style.transform = t !== void 0 ? t : "none";
  },
  checkIsScrollRoot: (n) => window.getComputedStyle(n).position === "fixed"
});
function JC(n, t) {
  if (Wc(n)) {
    const { initial: i, animate: l } = n;
    return {
      initial: i === !1 || gr(i) ? i : void 0,
      animate: gr(l) ? l : void 0
    };
  }
  return n.inherit !== !1 ? t : {};
}
function WC(n) {
  const { initial: t, animate: i } = JC(n, T.useContext(Qc));
  return T.useMemo(() => ({ initial: t, animate: i }), [_v(t), _v(i)]);
}
function _v(n) {
  return Array.isArray(n) ? n.join(" ") : n;
}
const Vm = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function Px(n, t, i) {
  for (const l in t)
    !Ee(t[l]) && !jx(l, i) && (n[l] = t[l]);
}
function tT({ transformTemplate: n }, t) {
  return T.useMemo(() => {
    const i = Vm();
    return km(i, t, n), Object.assign({}, i.vars, i.style);
  }, [t]);
}
function eT(n, t) {
  const i = n.style || {}, l = {};
  return Px(l, i, n), Object.assign(l, tT(n, t)), l;
}
function nT(n, t) {
  const i = {}, l = eT(n, t);
  return n.drag && n.dragListener !== !1 && (i.draggable = !1, l.userSelect = l.WebkitUserSelect = l.WebkitTouchCallout = "none", l.touchAction = n.drag === !0 ? "none" : `pan-${n.drag === "x" ? "y" : "x"}`), n.tabIndex === void 0 && (n.onTap || n.onTapStart || n.whileTap) && (i.tabIndex = 0), i.style = l, i;
}
const Gx = () => ({
  ...Vm(),
  attrs: {}
});
function aT(n, t, i, l) {
  const o = T.useMemo(() => {
    const c = Gx();
    return Ex(c, t, _x(l), n.transformTemplate, n.style), {
      ...c.attrs,
      style: { ...c.style }
    };
  }, [t]);
  if (n.style) {
    const c = {};
    Px(c, n.style, n), o.style = { ...c, ...o.style };
  }
  return o;
}
const iT = /* @__PURE__ */ new Set([
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
function Uc(n) {
  return n.startsWith("while") || n.startsWith("drag") && n !== "draggable" || n.startsWith("layout") || n.startsWith("onTap") || n.startsWith("onPan") || n.startsWith("onLayout") || iT.has(n);
}
let Xx = (n) => !Uc(n);
function Kx(n) {
  typeof n == "function" && (Xx = (t) => t.startsWith("on") ? !Uc(t) : n(t));
}
try {
  Kx(require("@emotion/is-prop-valid").default);
} catch {
}
function sT(n, t, i) {
  const l = {};
  for (const o in n)
    o === "values" && typeof n.values == "object" || Ee(n[o]) || (Xx(o) || i === !0 && Uc(o) || !t && !Uc(o) || // If trying to use native HTML drag events, forward drag listeners
    n.draggable && o.startsWith("onDrag")) && (l[o] = n[o]);
  return l;
}
const lT = [
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
function zm(n) {
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
      !!(lT.indexOf(n) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(n))
    )
  );
}
function rT(n, t, i, { latestValues: l }, o, c = !1, u) {
  const p = (u ?? zm(n) ? aT : nT)(t, l, o, n), y = sT(t, typeof n == "string", c), g = n !== T.Fragment ? { ...y, ...p, ref: i } : {}, { children: v } = t, b = T.useMemo(() => Ee(v) ? v.get() : v, [v]);
  return T.createElement(n, {
    ...g,
    children: b
  });
}
const _r = /* @__PURE__ */ T.createContext(null);
function Hi(n) {
  const t = T.useRef(null);
  return t.current === null && (t.current = n()), t.current;
}
function oT({ scrapeMotionValuesFromProps: n, createRenderState: t }, i, l, o) {
  return {
    latestValues: cT(i, l, o, n),
    renderState: t()
  };
}
function cT(n, t, i, l) {
  const o = {}, c = l(n, {});
  for (const b in c)
    o[b] = Cc(c[b]);
  let { initial: u, animate: d } = n;
  const p = Wc(n), y = px(n);
  t && y && !p && n.inherit !== !1 && (u === void 0 && (u = t.initial), d === void 0 && (d = t.animate));
  let g = i ? i.initial === !1 : !1;
  g = g || u === !1;
  const v = g ? d : u;
  if (v && typeof v != "boolean" && !Jc(v)) {
    const b = Array.isArray(v) ? v : [v];
    for (let j = 0; j < b.length; j++) {
      const w = Am(n, b[j]);
      if (w) {
        const { transitionEnd: C, transition: x, ...A } = w;
        for (const R in A) {
          let M = A[R];
          if (Array.isArray(M)) {
            const _ = g ? M.length - 1 : 0;
            M = M[_];
          }
          M !== null && (o[R] = M);
        }
        for (const R in C)
          o[R] = C[R];
      }
    }
  }
  return o;
}
const Zx = (n) => (t, i) => {
  const l = T.useContext(Qc), o = T.useContext(_r), c = () => oT(n, t, l, o);
  return i ? c() : Hi(c);
}, uT = /* @__PURE__ */ Zx({
  scrapeMotionValuesFromProps: Bm,
  createRenderState: Vm
}), fT = /* @__PURE__ */ Zx({
  scrapeMotionValuesFromProps: Rx,
  createRenderState: Gx
}), Rv = {
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
let Dv = !1;
function dT() {
  if (Dv)
    return;
  const n = {};
  for (const t in Rv)
    n[t] = {
      isEnabled: (i) => Rv[t].some((l) => !!i[l])
    };
  gx(n), Dv = !0;
}
function Qx() {
  return dT(), P6();
}
function Oh(n) {
  const t = Qx();
  for (const i in n)
    t[i] = {
      ...t[i],
      ...n[i]
    };
  gx(t);
}
const hT = Symbol.for("motionComponentSymbol");
function mT(n, t, i) {
  const l = T.useRef(i);
  T.useInsertionEffect(() => {
    l.current = i;
  });
  const o = T.useRef(null);
  return T.useCallback((c) => {
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
const Fx = T.createContext({});
function Os(n) {
  return n && typeof n == "object" && Object.prototype.hasOwnProperty.call(n, "current");
}
const pT = typeof window < "u", tu = pT ? T.useLayoutEffect : T.useEffect;
function yT(n, t, i, l, o, c) {
  const { visualElement: u } = T.useContext(Qc), d = T.useContext(mm), p = T.useContext(_r), y = T.useContext(Ps), g = y.reducedMotion, v = y.skipAnimations, b = T.useRef(null), j = T.useRef(!1);
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
  const w = b.current, C = T.useContext(Fx);
  w && !w.projection && o && (w.type === "html" || w.type === "svg") && gT(b.current, i, o, C);
  const x = T.useRef(!1);
  T.useInsertionEffect(() => {
    w && x.current && w.update(i, p);
  });
  const A = i[ix], R = T.useRef(!!A && typeof window < "u" && !window.MotionHandoffIsComplete?.(A) && window.MotionHasOptimisedAnimation?.(A));
  return tu(() => {
    j.current = !0, w && (x.current = !0, window.MotionIsMounted = !0, w.updateFeatures(), w.scheduleRenderMicrotask(), R.current && w.animationState && w.animationState.animateChanges());
  }), T.useEffect(() => {
    w && (!R.current && w.animationState && w.animationState.animateChanges(), R.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(A);
    }), R.current = !1), w.enteringChildren = void 0);
  }), w;
}
function gT(n, t, i, l) {
  const { layoutId: o, layout: c, drag: u, dragConstraints: d, layoutScroll: p, layoutRoot: y, layoutAnchor: g, layoutCrossfade: v } = t;
  n.projection = new i(n.latestValues, t["data-framer-portal-id"] ? void 0 : Ix(n.parent)), n.projection.setOptions({
    layoutId: o,
    layout: c,
    alwaysMeasureLayout: !!u || d && Os(d),
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
function Ix(n) {
  if (n)
    return n.options.allowProjection !== !1 ? n.projection : Ix(n.parent);
}
function jc(n, { forwardMotionProps: t = !1, type: i } = {}, l, o) {
  l && Oh(l);
  const c = i ? i === "svg" : zm(n), u = c ? fT : uT;
  function d(y, g) {
    let v;
    const b = {
      ...T.useContext(Ps),
      ...y,
      layoutId: vT(y)
    }, { isStatic: j } = b, w = WC(y), C = u(y, j);
    if (!j && typeof window < "u") {
      bT();
      const x = xT(b);
      v = x.MeasureLayout, w.visualElement = yT(n, C, b, o, x.ProjectionNode, c);
    }
    return h.jsxs(Qc.Provider, { value: w, children: [v && w.visualElement ? h.jsx(v, { visualElement: w.visualElement, ...b }) : null, rT(n, y, mT(C, w.visualElement, g), C, j, t, c)] });
  }
  d.displayName = `motion.${typeof n == "string" ? n : `create(${n.displayName ?? n.name ?? ""})`}`;
  const p = T.forwardRef(d);
  return p[hT] = n, p;
}
function vT({ layoutId: n }) {
  const t = T.useContext(hm).id;
  return t && n !== void 0 ? t + "-" + n : n;
}
function bT(n, t) {
  T.useContext(mm).strict;
}
function xT(n) {
  const t = Qx(), { drag: i, layout: l } = t;
  if (!i && !l)
    return {};
  const o = { ...i, ...l };
  return {
    MeasureLayout: i?.isEnabled(n) || l?.isEnabled(n) ? o.MeasureLayout : void 0,
    ProjectionNode: o.ProjectionNode
  };
}
function Um(n, t) {
  return jc(n, t);
}
const Lh = /* @__PURE__ */ Um("button"), Ca = /* @__PURE__ */ Um("div"), ST = /* @__PURE__ */ Um("span");
var wT = {
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
function CT({
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
    const v = wT[y], b = Math.min(
      ...v.map((j) => {
        const w = d[j.corner];
        if (g === 0 && w === 0)
          return 0;
        const C = u[j.corner], x = j.side === "top" || j.side === "bottom" ? o : c;
        return C >= 0 ? x - C : g / (g + w) * x;
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
function hn(n, ...t) {
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
function Ln(n, t, i) {
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
function $n(n, t, i) {
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
var TT = ({
  cornerRadius: n,
  roundingAndSmoothingBudget: t
}) => {
  const i = Math.min(n, t);
  return i <= 0 ? br : {
    p: i,
    pathSegment: (l) => {
      const o = Ln(i, i, l), c = $n(i, i, l);
      return hn`a ${i} ${i} 0 0 1 ${o} ${c}`;
    }
  };
};
function Hm({
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
    const w = l - v - u - g, C = w / 6, x = w - C;
    b = Math.min(b, x), j = w - b, o = Math.min(o, l);
  }
  return { a: j, b, c: g, d: v, p: o, arcSectionLength: u, cornerRadius: n };
}
var jT = ({
  cornerRadius: n,
  smoothing: t,
  preserveSmoothing: i,
  roundingAndSmoothingBudget: l
}) => {
  const o = Hm({
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
          return AT(o);
        case "BR":
          return ET(o);
        case "BL":
          return MT(o);
        case "TL":
          return _T(o);
      }
    }
  };
};
function AT({
  cornerRadius: n,
  a: t,
  b: i,
  c: l,
  d: o,
  arcSectionLength: c
}) {
  return hn`c ${t} 0 ${t + i} 0 ${t + i + l} ${o} a ${n} ${n} 0 0 1 ${c} ${c} c ${o} ${l} ${o} ${i + l} ${o} ${t + i + l}`;
}
function ET({
  cornerRadius: n,
  a: t,
  b: i,
  c: l,
  d: o,
  arcSectionLength: c
}) {
  return hn`c 0 ${t} 0 ${t + i} ${-o} ${t + i + l} a ${n} ${n} 0 0 1 -${c} ${c} c ${-l} ${o} ${-(i + l)} ${o} ${-(t + i + l)} ${o}`;
}
function MT({
  cornerRadius: n,
  a: t,
  b: i,
  c: l,
  d: o,
  arcSectionLength: c
}) {
  return hn`c ${-t} 0 ${-(t + i)} 0 ${-(t + i + l)} ${-o} a ${n} ${n} 0 0 1 -${c} -${c} c ${-o} ${-l} ${-o} ${-(i + l)} ${-o} ${-(t + i + l)}`;
}
function _T({
  cornerRadius: n,
  a: t,
  b: i,
  c: l,
  d: o,
  arcSectionLength: c
}) {
  return hn`c 0 ${-t} 0 ${-(t + i)} ${o} ${-(t + i + l)} a ${n} ${n} 0 0 1 ${c} -${c} c ${l} ${-o} ${i + l} ${-o} ${t + i + l} ${-o}`;
}
var RT = ({
  cornerRadius: n,
  exponent: t,
  roundingAndSmoothingBudget: i
}) => {
  const l = Math.min(n, i);
  if (l <= 0) return br;
  const o = Number.isFinite(t) ? Math.max(2, t) : 4, c = 2 / o, u = o === 2 ? (b) => b : o === 4 ? Math.sqrt : o === 8 ? (b) => Math.sqrt(Math.sqrt(b)) : (b) => Math.pow(b, c), d = c - 1, p = o === 2 ? () => 1 : o === 4 ? (b) => 1 / Math.sqrt(b) : (b) => Math.pow(b, d), y = [0, Math.PI / 6, Math.PI / 3, Math.PI / 2], g = y.map((b, j) => {
    if (j === 0) return [0, 0];
    if (j === y.length - 1) return [l, l];
    const w = Math.sin(b), C = Math.cos(b);
    return [l * u(w), l * (1 - u(C))];
  }), v = y.map((b, j) => {
    if (j === 0) return [1, 0];
    if (j === y.length - 1) return [0, 1];
    const w = Math.sin(b), C = Math.cos(b), x = c * p(w) * C * l, A = c * p(C) * w * l, R = Math.hypot(x, A) || 1;
    return [x / R, A / R];
  });
  return {
    p: l,
    pathSegment: (b) => {
      const j = [];
      for (let w = 0; w < y.length - 1; w++) {
        const [C, x] = g[w], [A, R] = g[w + 1], [M, _] = v[w], [L, N] = v[w + 1], D = (y[w] + y[w + 1]) / 2, V = Math.sin(D), H = Math.cos(D), B = l * u(V), U = l * (1 - u(H)), I = 8 / 3 * (B - (C + A) / 2), P = 8 / 3 * (U - (x + R) / 2), it = L * _ - N * M, J = it !== 0 ? (-N * I + L * P) / it : 0, $ = it !== 0 ? (M * P - _ * I) / it : 0, X = C + J * M, F = x + J * _, tt = A - $ * L, dt = R - $ * N, O = X - C, q = F - x, Y = tt - C, et = dt - x, ot = A - C, ct = R - x, ft = Ln(O, q, b), nt = $n(O, q, b), mt = Ln(Y, et, b), ut = $n(Y, et, b), yt = Ln(ot, ct, b), xt = $n(ot, ct, b);
        j.push(hn`c ${ft} ${nt} ${mt} ${ut} ${yt} ${xt}`);
      }
      return j.join(" ");
    }
  };
};
function Nv(n, t, i, l) {
  if (l <= 0) return { x: 0, y: 0, theta: n };
  const c = l / 32;
  let u = 0, d = 0;
  for (let y = 1; y <= 32; y++) {
    const g = (y - 1) * c, v = g + c, b = (g + v) / 2, j = n + t * g + i / 2 * g * g, w = n + t * v + i / 2 * v * v, C = n + t * b + i / 2 * b * b;
    u += c / 6 * (Math.cos(j) + 4 * Math.cos(C) + Math.cos(w)), d += c / 6 * (Math.sin(j) + 4 * Math.sin(C) + Math.sin(w));
  }
  const p = n + t * l + i / 2 * l * l;
  return { x: u, y: d, theta: p };
}
var DT = 1e-6, NT = ({
  cornerRadius: n,
  smoothing: t,
  roundingAndSmoothingBudget: i
}) => {
  if (n <= 0) return br;
  const l = Math.max(0, Math.min(1, t)), o = n, c = Math.PI / 4 * l, u = Math.PI / 2 * o * l, d = u > 0 ? 1 / (o * u) : 0, { x: p, y } = u > 0 ? Nv(0, 0, d, u) : { x: 0, y: 0 }, { x: g, y: v } = u > 0 ? Nv(0, 0, d, u / 2) : { x: 0, y: 0 }, b = p - o * Math.sin(c), j = y + o * Math.cos(c), w = b + j;
  let C = w, x = o, A = p, R = y, M = g, _ = v;
  if (w > i && w > 0) {
    const H = i / w;
    C = i, x = o * H, A = p * H, R = y * H, M = g * H, _ = v * H;
  }
  if (C <= 0)
    return br;
  let L = 0, N = 0;
  if (u > 0) {
    const H = Math.cos(c), B = Math.sin(c);
    B > 1e-12 && (N = 8 / 3 * (R / 2 - _) / B), L = 8 / 3 * (M - A / 2) + N * H;
  }
  const D = Math.PI / 2 - 2 * c, V = Math.abs(D) > DT;
  return {
    p: C,
    pathSegment: (H) => {
      const B = [];
      if (u > 0) {
        const U = L, I = 0, P = A - N * Math.cos(c), it = R - N * Math.sin(c), J = A, $ = R, X = Ln(U, I, H), F = $n(U, I, H), tt = Ln(P, it, H), dt = $n(P, it, H), O = Ln(J, $, H), q = $n(J, $, H);
        B.push(hn`c ${X} ${F} ${tt} ${dt} ${O} ${q}`);
      }
      if (V) {
        const U = C - A - R, I = C - A - R, P = Ln(U, I, H), it = $n(U, I, H);
        B.push(hn`a ${x} ${x} 0 0 1 ${P} ${it}`);
      }
      if (u > 0) {
        const U = N * Math.sin(c), I = N * Math.cos(c), P = R, it = A - L, J = R, $ = A, X = Ln(U, I, H), F = $n(U, I, H), tt = Ln(P, it, H), dt = $n(P, it, H), O = Ln(J, $, H), q = $n(J, $, H);
        B.push(hn`c ${X} ${F} ${tt} ${dt} ${O} ${q}`);
      }
      return B.join(" ");
    }
  };
}, OT = 4, LT = {
  arc: TT,
  squircle: jT,
  superellipse: RT,
  clothoid: NT
};
function $T(n) {
  return LT[n];
}
var kT = 64, Ai = /* @__PURE__ */ new Map();
function BT(n, t) {
  return n + "|" + t.cornerRadius + "|" + t.smoothing + "|" + t.exponent + "|" + (t.preserveSmoothing ? 1 : 0) + "|" + t.roundingAndSmoothingBudget;
}
function VT(n) {
  return !Number.isFinite(n.cornerRadius) || !Number.isFinite(n.smoothing) || !Number.isFinite(n.exponent) || !Number.isFinite(n.roundingAndSmoothingBudget);
}
function zT(n) {
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
function UT(n, t, i) {
  if (VT(i)) return t(i);
  const l = BT(n, i), o = Ai.get(l);
  if (o)
    return Ai.delete(l), Ai.set(l, o), o;
  const c = zT(t(i));
  if (Ai.size >= kT) {
    const u = Ai.keys().next().value;
    u !== void 0 && Ai.delete(u);
  }
  return Ai.set(l, c), c;
}
function Wo(n, t, i, l) {
  const o = Math.min(t, l / n - 1), c = Hm({
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
function HT({ a: n, b: t, c: i, d: l, e: o, ax: c, ay: u, R: d }) {
  return hn`c ${n} 0 ${n + t} 0 ${o} ${l} a ${d} ${d} 0 0 1 ${c} ${u} a ${d} ${d} 0 0 1 ${-c} ${u} c ${-i} ${l} ${-(t + i)} ${l} ${-o} ${l}`;
}
function qT({ a: n, b: t, c: i, d: l, e: o, ax: c, ay: u, R: d }) {
  return hn`c ${-n} 0 ${-(n + t)} 0 ${-o} ${-l} a ${d} ${d} 0 0 1 ${-c} ${-u} a ${d} ${d} 0 0 1 ${c} ${-u} c ${i} ${-l} ${t + i} ${-l} ${o} ${-l}`;
}
function YT({ a: n, b: t, c: i, d: l, e: o, ax: c, ay: u, R: d }) {
  return hn`c 0 ${-n} 0 ${-(n + t)} ${l} ${-o} a ${d} ${d} 0 0 1 ${u} ${-c} a ${d} ${d} 0 0 1 ${u} ${c} c ${l} ${i} ${l} ${t + i} ${l} ${o}`;
}
function PT({ a: n, b: t, c: i, d: l, e: o, ax: c, ay: u, R: d }) {
  return hn`c 0 ${n} 0 ${n + t} ${-l} ${o} a ${d} ${d} 0 0 1 ${-u} ${c} a ${d} ${d} 0 0 1 ${-u} ${-c} c ${-l} ${-i} ${-l} ${-(t + i)} ${-l} ${-o}`;
}
function Ov(n, t, i, l) {
  const o = Hm({
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
var Lv = (n, t, i) => Math.max(0, Math.min(n / t - 1, i)), Ae = (n) => (Object.is(n, -0) ? 0 : n).toFixed(4);
function GT(n, t, i, l, o) {
  const c = Ov(i, Lv(n / 2, i, l), o, n / 2), u = Ov(i, Lv(t / 2, i, l), o, t / 2), d = (b, j, w, C, x, A) => {
    const R = C === 0 ? c : u, M = A === 0 ? c : u, _ = b + (w + x) * i, L = j + (C + A) * i, N = _ - x * i * R.cos - w * i * R.sin, D = L - A * i * R.cos - C * i * R.sin, V = _ - w * i * M.cos - x * i * M.sin, H = L - C * i * M.cos - A * i * M.sin, B = b + w * R.p, U = j + C * R.p, I = Math.hypot(V - N, H - D) > 1e-6, P = I ? V : N, it = I ? H : D, J = b + x * M.p, $ = j + A * M.p;
    let X = `L ${Ae(B)} ${Ae(U)} `;
    return X += `c ${Ae(-w * R.a)} ${Ae(-C * R.a)} ${Ae(-w * (R.a + R.b))} ${Ae(-C * (R.a + R.b))} ${Ae(N - B)} ${Ae(D - U)} `, I && (X += `a ${Ae(i)} ${Ae(i)} 0 0 1 ${Ae(V - N)} ${Ae(H - D)} `), X += `c ${Ae(J - x * (M.a + M.b) - P)} ${Ae($ - A * (M.a + M.b) - it)} ${Ae(J - x * M.a - P)} ${Ae($ - A * M.a - it)} ${Ae(J - P)} ${Ae($ - it)}`, X;
  }, p = d(n, 0, -1, 0, 0, 1), y = d(n, t, 0, -1, -1, 0), g = d(0, t, 1, 0, 0, -1), v = d(0, 0, 0, 1, 1, 0);
  return `M ${Ae(c.p)} 0 ${p} ${y} ${g} ${v} Z`;
}
var XT = 0.6, KT = !0, ZT = "squircle";
function Jx(n) {
  return {
    radius: n.radius,
    curve: n.curve ?? ZT,
    smoothing: n.smoothing ?? XT,
    exponent: n.exponent ?? OT,
    preserveSmoothing: n.preserveSmoothing ?? KT
  };
}
function tc(n) {
  return Jx(typeof n == "number" ? { radius: n } : n ?? { radius: 0 });
}
function QT(n) {
  if ("radius" in n) {
    const t = Jx(n);
    return { topLeft: t, topRight: t, bottomRight: t, bottomLeft: t };
  }
  return {
    topLeft: tc(n.topLeft),
    topRight: tc(n.topRight),
    bottomRight: tc(n.bottomRight),
    bottomLeft: tc(n.bottomLeft)
  };
}
function Wx(n, t, i) {
  if (n <= 0 || t <= 0)
    return "M 0 0 H 0 V 0 H 0 Z";
  const l = QT(i);
  if (l.topLeft.radius <= 0 && l.topRight.radius <= 0 && l.bottomRight.radius <= 0 && l.bottomLeft.radius <= 0)
    return `M 0 0 H ${n} V ${t} H 0 Z`;
  const o = CT({
    topLeftCornerRadius: l.topLeft.radius,
    topRightCornerRadius: l.topRight.radius,
    bottomRightCornerRadius: l.bottomRight.radius,
    bottomLeftCornerRadius: l.bottomLeft.radius,
    width: n,
    height: t
  }), c = (R) => {
    const M = l[R], _ = $T(M.curve);
    return UT(M.curve, _, {
      cornerRadius: o[R].radius,
      smoothing: M.smoothing,
      exponent: M.exponent,
      preserveSmoothing: M.preserveSmoothing,
      roundingAndSmoothingBudget: o[R].roundingAndSmoothingBudget
    });
  }, u = (R) => {
    let M;
    return () => M ?? (M = c(R));
  }, d = u("topLeft"), p = u("topRight"), y = u("bottomRight"), g = u("bottomLeft"), v = (R) => R.toFixed(4), b = (R) => R.length > 0 ? " " + R : "", j = l.topLeft;
  if (FT(l)) {
    const R = Math.min(j.radius, n / 2, t / 2), M = Math.min(n, t) / 2, _ = 1e-9;
    if (R > 0 && M > R + _ && M < (1 + j.smoothing) * R - _)
      return GT(n, t, R, j.smoothing, j.preserveSmoothing);
  }
  const w = 1e-9, C = n >= t, x = C ? t / 2 : n / 2, A = (R, M) => {
    const _ = l[R], L = l[M];
    return _.curve === "squircle" && L.curve === "squircle" && Math.abs(o[R].radius - x) < w && Math.abs(o[M].radius - x) < w && _.smoothing === L.smoothing && _.preserveSmoothing === L.preserveSmoothing;
  };
  if (C) {
    const R = A("topRight", "bottomRight"), M = A("topLeft", "bottomLeft");
    if (R || M) {
      const _ = n / 2, L = R ? Wo(x, l.topRight.smoothing, l.topRight.preserveSmoothing, _) : null, N = M ? Wo(x, l.topLeft.smoothing, l.topLeft.preserveSmoothing, _) : null;
      let D = "M " + v(N ? N.p : d().p) + " 0";
      return D += " L " + v(n - (L ? L.p : p().p)) + " 0", L ? D += " " + HT(L) : (D += b(p().pathSegment("TR")), D += " L " + v(n) + " " + v(y().p), D += " L " + v(n) + " " + v(t - y().p), D += b(y().pathSegment("BR"))), N ? (D += " L " + v(N.p) + " " + v(t), D += " " + qT(N)) : (D += " L " + v(n - g().p) + " " + v(t), D += " L " + v(g().p) + " " + v(t), D += b(g().pathSegment("BL")), D += " L 0 " + v(t - d().p), D += " L 0 " + v(d().p), D += b(d().pathSegment("TL"))), D + " Z";
    }
  } else {
    const R = A("topLeft", "topRight"), M = A("bottomLeft", "bottomRight");
    if (R || M) {
      const _ = t / 2, L = R ? Wo(x, l.topLeft.smoothing, l.topLeft.preserveSmoothing, _) : null, N = M ? Wo(x, l.bottomLeft.smoothing, l.bottomLeft.preserveSmoothing, _) : null;
      let D;
      return L ? D = "M 0 " + v(L.p) + " " + YT(L) : (D = "M " + v(d().p) + " 0", D += " L " + v(n - p().p) + " 0", D += b(p().pathSegment("TR"))), D += " L " + v(n) + " " + v(t - (N ? N.p : y().p)), N ? D += " " + PT(N) : (D += b(y().pathSegment("BR")), D += " L " + v(g().p) + " " + v(t), D += b(g().pathSegment("BL"))), L ? D += " L 0 " + v(L.p) : (D += " L 0 " + v(t - d().p), D += " L 0 " + v(d().p), D += b(d().pathSegment("TL"))), D + " Z";
    }
  }
  return "M " + v(d().p) + " 0 L " + v(n - p().p) + " 0" + b(p().pathSegment("TR")) + " L " + v(n) + " " + v(y().p) + " L " + v(n) + " " + v(t - y().p) + b(y().pathSegment("BR")) + " L " + v(n - g().p) + " " + v(t) + " L " + v(g().p) + " " + v(t) + b(g().pathSegment("BL")) + " L 0 " + v(t - d().p) + " L 0 " + v(d().p) + b(d().pathSegment("TL")) + " Z";
}
function FT(n) {
  const t = n.topLeft;
  return t.curve === "squircle" && [n.topRight, n.bottomRight, n.bottomLeft].every(
    (i) => i.curve === "squircle" && i.radius === t.radius && i.smoothing === t.smoothing && i.preserveSmoothing === t.preserveSmoothing
  );
}
function IT(n, t, i) {
  return `path("${Wx(n, t, i)}")`;
}
var Qt = "http://www.w3.org/2000/svg", JT = 0;
function qm() {
  return ++JT;
}
function tS(n) {
  const t = n.replace("#", "");
  return t.length === 3 ? "#" + t[0] + t[0] + t[1] + t[1] + t[2] + t[2] : "#" + t;
}
function eS(n) {
  const t = tS(n).replace("#", "");
  return `rgb(${parseInt(t.substring(0, 2), 16)},${parseInt(t.substring(2, 4), 16)},${parseInt(t.substring(4, 6), 16)})`;
}
var WT = {
  offsetX: 0,
  offsetY: 0,
  blur: 0,
  spread: 0,
  color: "#000",
  opacity: 0
};
function nS(n) {
  const t = /* @__PURE__ */ new Map(), i = JSON.stringify(n);
  return (l, o, c, u) => {
    const d = `${l}:${o}:${u}:${i}`;
    let p = t.get(d);
    return p === void 0 && (p = Wx(l, o, c), t.set(d, p)), p;
  };
}
function aS(n, t) {
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
function $h(n) {
  const t = tS(n).replace("#", ""), i = parseInt(t.substring(0, 2), 16), l = parseInt(t.substring(2, 4), 16), o = parseInt(t.substring(4, 6), 16);
  if (i === 0 && l === 0 && o === 0) return "#4c4c4c";
  const c = Math.round(i * 2 / 3), u = Math.round(l * 2 / 3), d = Math.round(o * 2 / 3);
  return "#" + (1 << 24 | c << 16 | u << 8 | d).toString(16).slice(1);
}
function kh(n) {
  return typeof n == "object" && n !== null && "type" in n;
}
function tj(n) {
  const t = (90 - n) * Math.PI / 180;
  return {
    x1: 0.5 - 0.5 * Math.cos(t),
    y1: 0.5 + 0.5 * Math.sin(t),
    x2: 0.5 + 0.5 * Math.cos(t),
    y2: 0.5 - 0.5 * Math.sin(t)
  };
}
function iS(n, t) {
  for (; n.lastChild; ) n.removeChild(n.lastChild);
  for (const i of t) {
    const l = document.createElementNS(Qt, "stop");
    l.setAttribute("offset", String(i.offset)), l.setAttribute("stop-color", i.color), i.opacity !== void 0 && i.opacity !== 1 && l.setAttribute("stop-opacity", String(i.opacity)), n.appendChild(l);
  }
}
function ej(n, t, i) {
  const l = t.type === "linear" ? "linearGradient" : "radialGradient", o = document.createElementNS(Qt, l);
  return o.setAttribute("id", i), sS(o, t), iS(o, t.stops), n.appendChild(o), o;
}
function nj(n, t) {
  sS(n, t), iS(n, t.stops);
}
function sS(n, t) {
  if (t.type === "linear") {
    const i = tj(t.angle ?? 0);
    n.setAttribute("x1", String(i.x1)), n.setAttribute("y1", String(i.y1)), n.setAttribute("x2", String(i.x2)), n.setAttribute("y2", String(i.y2));
  } else
    n.setAttribute("cx", String(t.cx ?? 0.5)), n.setAttribute("cy", String(t.cy ?? 0.5)), n.setAttribute("r", String(t.r ?? 0.5));
}
function $v(n) {
  return { ...n, stops: n.stops.map((t) => ({ ...t, color: $h(t.color) })) };
}
function Bh(n, t, i, l) {
  n.setAttribute("x", String(-t)), n.setAttribute("y", String(-t)), n.setAttribute("width", String(i + t * 2)), n.setAttribute("height", String(l + t * 2));
}
function ec(n, t, i, l, o) {
  Bh(n, i, l, o), Bh(t, i, l, o);
}
function Ud(n, t, i) {
  const l = document.createElementNS(Qt, "mask");
  l.setAttribute("id", n), i && l.setAttribute("maskUnits", "userSpaceOnUse");
  const o = document.createElementNS(Qt, "rect");
  o.setAttribute("fill", "white");
  const c = document.createElementNS(Qt, "path");
  return c.setAttribute("fill", "none"), c.setAttribute("stroke", "black"), l.appendChild(o), l.appendChild(c), t.appendChild(l), { mask: l, rect: o, knockout: c };
}
function Hd(n) {
  const t = document.createElementNS(Qt, "g"), i = document.createElementNS(Qt, "path");
  i.setAttribute("fill", "none"), n && i.setAttribute(n.attr, n.value), i.style.display = "none", t.appendChild(i);
  const l = document.createElementNS(Qt, "path");
  return l.setAttribute("fill", "none"), n && l.setAttribute(n.attr, n.value), l.style.display = "none", t.appendChild(l), { group: t, strokePath: i, grooveOverlay: l };
}
function Ac(n, t) {
  const i = t === "main" ? "gradientEl" : "overlayGradientEl";
  n[i]?.remove(), n[i] = null;
}
function nc(n, t, i) {
  if (!kh(n))
    return Ac(t, i), n;
  const l = i === "main" ? "gradientEl" : "overlayGradientEl", o = i === "main" ? t.gradientId : t.overlayGradientId;
  return t[l] ? nj(t[l], n) : t[l] = ej(t.defs, n, o), `url(#${o})`;
}
function qd(n, t, i, l, o) {
  if (!n || n.width <= 0 || n.opacity <= 0) {
    o.strokePath.style.display = "none", o.strokeGroup.removeAttribute("mask"), o.grooveOverlay.style.display = "none", Ac(o, "main"), Ac(o, "overlay");
    return;
  }
  const c = o.strokeMultiplier;
  o.strokePath.style.display = "", o.strokePath.setAttribute("d", t), o.strokePath.setAttribute("stroke", nc(n.color, o, "main")), o.strokePath.setAttribute("stroke-width", String(n.width * c)), o.strokePath.setAttribute("stroke-opacity", String(n.opacity));
  const u = n.style ?? "solid";
  switch (o.strokeGroup.removeAttribute("mask"), o.grooveOverlay.style.display = "none", o.strokePath.removeAttribute("stroke-dasharray"), o.strokePath.setAttribute("stroke-linecap", "butt"), u !== "groove" && u !== "ridge" && Ac(o, "overlay"), u) {
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
      const d = kh(n.color) ? $v(n.color) : $h(n.color);
      o.strokePath.setAttribute("stroke", nc(d, o, "main")), o.grooveOverlay.style.display = "", o.grooveOverlay.setAttribute("d", t), o.grooveOverlay.setAttribute("stroke", nc(n.color, o, "overlay")), o.grooveOverlay.setAttribute("stroke-width", String(n.width * c / 2)), o.grooveOverlay.setAttribute("stroke-opacity", String(n.opacity));
      break;
    }
    case "ridge": {
      const d = kh(n.color) ? $v(n.color) : $h(n.color);
      o.grooveOverlay.style.display = "", o.grooveOverlay.setAttribute("d", t), o.grooveOverlay.setAttribute("stroke", nc(d, o, "overlay")), o.grooveOverlay.setAttribute("stroke-width", String(n.width * c / 2)), o.grooveOverlay.setAttribute("stroke-opacity", String(n.opacity));
      break;
    }
  }
}
function aj(n, t) {
  const i = qm(), l = `sc-ishadow-mask-${i}`, o = document.createElementNS(Qt, "mask");
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
function ij(n) {
  n.mask.remove(), n.filter.remove(), n.blurGroup.remove();
}
function sj(n) {
  const t = qm(), i = `sc-clip-${t}`, l = `sc-mask-${t}`, o = document.createElementNS(Qt, "svg");
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
  const v = `sc-dbl-inner-${t}`, { rect: b, knockout: j } = Ud(v, c, !1), w = `sc-dbl-outer-${t}`, { mask: C, rect: x, knockout: A } = Ud(w, c, !0), R = `sc-dbl-middle-${t}`, { mask: M, rect: _, knockout: L } = Ud(R, c, !0);
  o.appendChild(c);
  const N = document.createElementNS(Qt, "g");
  N.setAttribute("clip-path", `url(#${i})`), o.appendChild(N);
  const D = [], { group: V, strokePath: H, grooveOverlay: B } = Hd({ attr: "clip-path", value: `url(#${i})` });
  o.appendChild(V);
  const { group: U, strokePath: I, grooveOverlay: P } = Hd({ attr: "mask", value: `url(#${l})` });
  o.appendChild(U);
  const { group: it, strokePath: J, grooveOverlay: $ } = Hd();
  o.appendChild(it), n.appendChild(o);
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
  }, F = {
    strokePath: I,
    grooveOverlay: P,
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
    padDblMask: (dt, O, q) => ec(C, x, dt, O, q)
  }, tt = {
    strokePath: J,
    grooveOverlay: $,
    strokeGroup: it,
    dblMaskId: R,
    dblKnockout: L,
    dblRect: _,
    strokeMultiplier: 1,
    defs: c,
    gradientEl: null,
    gradientId: `sc-grad-middle-${t}`,
    overlayGradientEl: null,
    overlayGradientId: `sc-grad-middle-ov-${t}`,
    padDblMask: (dt, O, q) => ec(M, _, dt, O, q)
  };
  return {
    update(dt, O, q, Y) {
      if (q <= 0 || Y <= 0) return;
      o.setAttribute("width", String(q)), o.setAttribute("height", String(Y)), o.setAttribute("viewBox", `0 0 ${q} ${Y}`);
      const et = nS(dt), ot = et(q, Y, dt, 0);
      d.setAttribute("d", ot), g.setAttribute("d", ot), y.setAttribute("width", String(q)), y.setAttribute("height", String(Y)), qd(O.innerBorder, ot, q, Y, X);
      const ct = O.outerBorder;
      ct && ct.width > 0 && ct.opacity > 0 && ec(p, y, ct.width, q, Y), qd(ct, ot, q, Y, F), qd(O.middleBorder, ot, q, Y, tt);
      const ft = O.innerShadow, nt = ft == null ? [] : Array.isArray(ft) ? ft : [ft];
      for (; D.length < nt.length; )
        D.push(aj(c, N));
      for (; D.length > nt.length; )
        ij(D.pop());
      for (let mt = 0; mt < nt.length; mt++) {
        const ut = nt[mt], yt = D[mt];
        if (ut.opacity <= 0) {
          yt.rect.style.display = "none";
          continue;
        }
        yt.rect.style.display = "";
        const xt = ut.spread, ce = Math.max(ut.blur * 3, 20) + Math.max(Math.abs(ut.offsetX), Math.abs(ut.offsetY)) + Math.abs(xt);
        ec(yt.mask, yt.maskRect, ce, q, Y);
        const ht = Math.max(1, q - xt * 2), $t = Math.max(1, Y - xt * 2), Wt = xt !== 0 ? aS(dt, -xt) : dt;
        yt.maskCutout.setAttribute("d", et(ht, $t, Wt, -xt)), yt.maskCutout.setAttribute(
          "transform",
          `translate(${ut.offsetX + xt},${ut.offsetY + xt})`
        ), ut.blur > 0 ? (yt.feBlur.setAttribute("stdDeviation", String(ut.blur)), yt.blurGroup.setAttribute("filter", `url(#${yt.filterId})`)) : yt.blurGroup.removeAttribute("filter"), Bh(yt.rect, ce, q, Y), yt.rect.setAttribute("fill", eS(ut.color)), yt.rect.setAttribute("fill-opacity", String(ut.opacity));
      }
    },
    destroy() {
      o.remove();
    }
  };
}
function lj(n, t) {
  return Math.ceil(3 * n + Math.abs(t) + 1);
}
function rj(n, t, i, l) {
  n.setAttribute("x", String(-l)), n.setAttribute("y", String(-l)), n.setAttribute("width", String(t + 2 * l)), n.setAttribute("height", String(i + 2 * l));
}
function oj(n, t) {
  const i = `sc-shadow-${qm()}`, l = document.createElementNS(Qt, "filter");
  l.setAttribute("id", i), l.setAttribute("filterUnits", "userSpaceOnUse"), l.setAttribute("color-interpolation-filters", "sRGB");
  const o = document.createElementNS(Qt, "feGaussianBlur");
  o.setAttribute("stdDeviation", "0"), l.appendChild(o), n.appendChild(l);
  const c = document.createElementNS(Qt, "path");
  return t.appendChild(c), { filterId: i, filterEl: l, feBlur: o, pathEl: c };
}
function cj(n) {
  n.filterEl.remove(), n.pathEl.remove();
}
function uj(n) {
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
      for (; o.length < y.length; ) o.push(oj(l, i));
      for (; o.length > y.length; ) cj(o.pop());
      const v = nS(c);
      let b = !1;
      for (let j = 0; j < y.length; j++) {
        const w = y[j], C = o[y.length - 1 - j];
        if (w.opacity <= 0) {
          C.pathEl.style.display = "none";
          continue;
        }
        const x = w.spread, A = d + x * 2, R = p + x * 2;
        if (A <= 0 || R <= 0) {
          C.pathEl.style.display = "none";
          continue;
        }
        b = !0, C.pathEl.style.display = "";
        const M = eS(w.color), _ = aS(c, x);
        if (C.pathEl.setAttribute("d", v(A, R, _, x)), C.pathEl.setAttribute("transform", `translate(${w.offsetX - x},${w.offsetY - x})`), C.pathEl.setAttribute("fill", M), C.pathEl.setAttribute("fill-opacity", String(w.opacity)), w.blur > 0) {
          const L = lj(w.blur, x);
          rj(C.filterEl, A, R, L), C.feBlur.setAttribute("stdDeviation", String(w.blur)), C.pathEl.setAttribute("filter", `url(#${C.filterId})`);
        } else
          C.pathEl.removeAttribute("filter");
      }
      i.style.display = b ? "" : "none";
    },
    destroy() {
      i.remove(), n.style.isolation = t;
    }
  };
}
var ir = null, Za, Il = /* @__PURE__ */ new Map(), xr = /* @__PURE__ */ new Set();
function lS() {
  Za = void 0;
  const n = [...xr];
  xr.clear();
  for (const t of n) {
    const i = Il.get(t);
    if (i) for (const l of [...i]) l();
  }
}
function fj() {
  return ir || (ir = new ResizeObserver((n) => {
    for (const t of n)
      xr.add(t.target);
    Za === void 0 && (Za = requestAnimationFrame(lS));
  })), ir;
}
function dj(n, t) {
  if (typeof ResizeObserver > "u") return () => {
  };
  const i = fj();
  let l = Il.get(n);
  return l || (l = /* @__PURE__ */ new Set(), Il.set(n, l), i.observe(n)), l.add(t), xr.add(n), Za === void 0 && (Za = requestAnimationFrame(lS)), () => {
    l.delete(t), l.size === 0 && (Il.delete(n), i.unobserve(n)), Il.size === 0 && (Za !== void 0 && (cancelAnimationFrame(Za), Za = void 0), xr.clear(), ir?.disconnect(), ir = null);
  };
}
function hj(n) {
  const t = window.getComputedStyle(n), i = (y) => y.endsWith("px") ? parseFloat(y) : NaN, l = i(t.width), o = i(t.height);
  if (Number.isNaN(l) || Number.isNaN(o))
    return { width: n.offsetWidth, height: n.offsetHeight };
  if (t.boxSizing === "border-box")
    return { width: l, height: o };
  const c = (parseFloat(t.paddingLeft) || 0) + (parseFloat(t.paddingRight) || 0), u = (parseFloat(t.paddingTop) || 0) + (parseFloat(t.paddingBottom) || 0), d = (parseFloat(t.borderLeftWidth) || 0) + (parseFloat(t.borderRightWidth) || 0), p = (parseFloat(t.borderTopWidth) || 0) + (parseFloat(t.borderBottomWidth) || 0);
  return { width: l + c + d, height: o + u + p };
}
function rS(n) {
  const t = n.match(
    /^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)(?:\s*[,/]\s*([\d.]+))?\s*\)$/
  );
  if (!t) return;
  const i = Number(t[1]), l = Number(t[2]), o = Number(t[3]), c = t[4] !== void 0 ? Number(t[4]) : 1;
  return { hex: "#" + (1 << 24 | i << 16 | l << 8 | o).toString(16).slice(1), opacity: c };
}
function mj(n) {
  const t = getComputedStyle(n), i = t.borderTopStyle;
  if (i === "none" || i === "hidden") return;
  const l = parseFloat(t.borderTopWidth);
  if (l <= 0 || isNaN(l)) return;
  const o = rS(t.borderTopColor);
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
function pj(n) {
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
    const g = rS(y[0]);
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
function kv(n) {
  const t = {
    border: n.style.border,
    boxShadow: n.style.boxShadow,
    paddingTop: n.style.paddingTop,
    paddingRight: n.style.paddingRight,
    paddingBottom: n.style.paddingBottom,
    paddingLeft: n.style.paddingLeft
  }, i = mj(n), l = getComputedStyle(n), { shadow: o, innerShadow: c } = pj(l.boxShadow), u = l.boxSizing, d = parseFloat(l.borderTopWidth) || 0, p = parseFloat(l.borderRightWidth) || 0, y = parseFloat(l.borderBottomWidth) || 0, g = parseFloat(l.borderLeftWidth) || 0, v = parseFloat(l.paddingTop) || 0, b = parseFloat(l.paddingRight) || 0, j = parseFloat(l.paddingBottom) || 0, w = parseFloat(l.paddingLeft) || 0;
  i && (n.style.border = "0"), (o || c) && (n.style.boxShadow = "none"), i && u === "content-box" && (d > 0 || p > 0 || y > 0 || g > 0) && (n.style.paddingTop = v + d + "px", n.style.paddingRight = b + p + "px", n.style.paddingBottom = j + y + "px", n.style.paddingLeft = w + g + "px");
  const C = {};
  return i && (C.innerBorder = i), o && (C.shadow = o), c && (C.innerShadow = c), { effects: C, savedStyles: t };
}
function Ym(n) {
  return n ? !!(n.innerBorder || n.outerBorder || n.middleBorder || n.innerShadow || n.shadow) : !1;
}
function oS(n, t) {
  return { ...n?.effects, ...t };
}
function Bv(n, t) {
  n.style.border = t.border, n.style.boxShadow = t.boxShadow, n.style.paddingTop = t.paddingTop, n.style.paddingRight = t.paddingRight, n.style.paddingBottom = t.paddingBottom, n.style.paddingLeft = t.paddingLeft;
}
var zs = /* @__PURE__ */ new WeakMap();
function yj(n) {
  const t = zs.get(n) ?? 0;
  if (t > 0)
    return zs.set(n, t + 1), !0;
  const i = getComputedStyle(n).position;
  return i !== "static" && i !== "" ? !1 : (zs.set(n, 1), n.style.position = "relative", !0);
}
function gj(n) {
  const t = zs.get(n);
  t !== void 0 && (t <= 1 ? (zs.delete(n), n.style.position = "") : zs.set(n, t - 1));
}
var ac = typeof window < "u" ? T.useLayoutEffect : T.useEffect;
function vj(n, t, i, l, o, c) {
  i.update(n, t, o, c), l?.update(n, t.shadow ?? WT, o, c);
}
function Yd(n, t) {
  const i = oS(n.extracted, t.effectsPropRef.current);
  Ym(i) && cS(n, i, t.wrapperRefRef.current, t.skipShadowHandleRef.current);
  const { width: l, height: o } = hj(n.el);
  if (l <= 0 || o <= 0) return;
  const c = t.syncKeyRef.current;
  l === n.lastWidth && o === n.lastHeight && c === n.lastSyncKey || (n.lastWidth = l, n.lastHeight = o, n.lastSyncKey = c, n.el.style.clipPath = IT(l, o, t.optionsRef.current), n.el.setAttribute("data-state", "ready"), n.effectsHandle && vj(t.optionsRef.current, i, n.effectsHandle, n.shadowHandle, l, o));
}
function cS(n, t, i, l) {
  if (!n.anchor) {
    const o = i?.current ?? n.el.parentElement;
    if (!o) return;
    n.anchor = o, n.didAcquire = yj(o);
  }
  n.effectsHandle || (n.effectsHandle = sj(n.anchor)), !n.shadowHandle && t.shadow && !l && (n.shadowHandle = uj(n.anchor));
}
function uS(n, t, i) {
  const { wrapperRef: l, effects: o, autoEffects: c, skipShadowHandle: u, onExtractedShadow: d } = i ?? {}, p = T.useRef(t);
  p.current = t;
  const y = T.useRef(o);
  y.current = o;
  const g = T.useRef(l);
  g.current = l;
  const v = T.useRef(u ?? !1);
  v.current = u ?? !1;
  const b = T.useRef(d);
  b.current = d;
  const j = JSON.stringify(t), w = JSON.stringify(o ?? null), C = c ?? !0, x = u ?? !1, A = T.useRef("");
  A.current = `${j}|${w}`;
  const R = T.useRef({
    optionsRef: p,
    effectsPropRef: y,
    wrapperRefRef: g,
    skipShadowHandleRef: v,
    onExtractedShadowRef: b,
    syncKeyRef: A
  }), M = T.useRef(null);
  ac(() => {
    const _ = n.current;
    if (!_) return;
    const L = _.style.clipPath;
    _.setAttribute("data-slot", "smooth-corners"), _.setAttribute("data-state", "pending");
    const N = C ? kv(_) : void 0, D = {
      el: _,
      savedClipPath: L,
      extracted: N,
      effectsHandle: void 0,
      shadowHandle: void 0,
      anchor: null,
      didAcquire: !1,
      lastWidth: 0,
      lastHeight: 0,
      lastSyncKey: null
    };
    M.current = D;
    const V = oS(D.extracted, y.current);
    Ym(V) && cS(D, V, g.current, v.current), b.current?.(D.extracted?.effects.shadow);
    const H = dj(_, () => Yd(D, R.current));
    return () => {
      H(), D.effectsHandle?.destroy(), D.shadowHandle?.destroy(), D.extracted && Bv(_, D.extracted.savedStyles), b.current?.(void 0), D.didAcquire && D.anchor && gj(D.anchor), M.current = null, _.style.clipPath = L, _.removeAttribute("data-slot"), _.removeAttribute("data-state");
    };
  }, [n]), ac(() => {
    const _ = M.current;
    _ && Yd(_, R.current);
  }), ac(() => {
    if (!x) return;
    const _ = M.current;
    !_ || !_.shadowHandle || (_.shadowHandle.destroy(), _.shadowHandle = void 0, _.lastSyncKey = null);
  }, [x]), ac(() => {
    const _ = M.current;
    if (!_) return;
    const L = _.extracted !== void 0;
    if (C && !L)
      _.extracted = kv(_.el);
    else if (!C && L)
      Bv(_.el, _.extracted.savedStyles), _.extracted = void 0;
    else
      return;
    b.current?.(_.extracted?.effects.shadow), _.lastSyncKey = null, Yd(_, R.current);
  }, [C]);
}
function fS(...n) {
  return (t) => {
    for (const i of n)
      i && (typeof i == "function" ? i(t) : i.current = t);
  };
}
function bj(n, t) {
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
function xj(n, t) {
  const { children: i, ...l } = n, o = T.Children.toArray(i);
  if (o.length === 0)
    throw new Error("Slot: `asChild` expects a single child element, received none.");
  if (o.length > 1)
    throw new Error(
      "Slot: `asChild` expects a single child element, received " + o.length + "."
    );
  const c = o[0];
  if (!T.isValidElement(c))
    throw new Error(
      "Slot: `asChild` expects a React element as its child (e.g. <button>), not a " + (typeof c == "string" ? "string." : typeof c + ".")
    );
  if (c.type === T.Fragment)
    throw new Error(
      "Slot: `asChild` expects a single element as its child, not a Fragment. Unwrap the Fragment so Slot can merge props onto a real element."
    );
  const u = c, d = u.props ?? {}, p = d.ref ?? u.ref, y = bj(l, d);
  return T.cloneElement(u, {
    ...y,
    ref: fS(t, p)
  });
}
var Sj = T.forwardRef(xj);
function wj(n) {
  const t = Array.isArray(n) ? n : [n], i = [];
  for (const l of t) {
    if (l.opacity <= 0) continue;
    const { offsetX: o, offsetY: c, blur: u, spread: d, color: p, opacity: y } = l, g = Cj(p);
    i.push(
      `${o}px ${c}px ${u}px ${d}px rgba(${g.r},${g.g},${g.b},${y})`
    );
  }
  return i.join(", ");
}
function Cj(n) {
  const t = n.replace("#", ""), i = t.length === 3 ? t[0] + t[0] + t[1] + t[1] + t[2] + t[2] : t;
  return {
    r: parseInt(i.substring(0, 2), 16),
    g: parseInt(i.substring(2, 4), 16),
    b: parseInt(i.substring(4, 6), 16)
  };
}
function Tj(n) {
  if ("radius" in n) return `${n.radius}px`;
  const t = (u) => u === void 0 ? 0 : typeof u == "number" ? u : u.radius, i = t(n.topLeft), l = t(n.topRight), o = t(n.bottomRight), c = t(n.bottomLeft);
  return `${i}px ${l}px ${o}px ${c}px`;
}
function jj(n, t) {
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
  } = n, w = i ?? "div", C = T.useRef(null), x = T.useRef(null), A = T.useMemo(
    () => fS(C, t),
    [t]
  ), R = c ?? { radius: 0 }, M = b === "box-shadow", _ = M ? void 0 : g, [L, N] = T.useState(void 0), D = T.useCallback(
    (J) => N(J),
    []
  ), V = {
    innerBorder: u,
    outerBorder: d,
    middleBorder: p,
    innerShadow: y,
    shadow: _
  }, H = Ym(V), B = M ? g ?? L : void 0, U = (v ?? !0) || H || B !== void 0;
  uS(C, R, {
    wrapperRef: U ? x : void 0,
    effects: H ? V : void 0,
    autoEffects: v,
    skipShadowHandle: M,
    onExtractedShadow: M ? D : void 0
  });
  const P = l ? T.createElement(Sj, { ...j, ref: A }, o) : T.createElement(w, { ...j, ref: A }, o);
  if (!U) return P;
  let it = null;
  if (M && B !== void 0) {
    const J = wj(B);
    if (J !== "") {
      const $ = {
        position: "absolute",
        inset: 0,
        borderRadius: Tj(R),
        boxShadow: J,
        pointerEvents: "none",
        zIndex: -1
      };
      it = T.createElement("div", {
        "aria-hidden": !0,
        "data-slot": "smooth-corners-box-shadow",
        style: $
      });
    }
  }
  return T.createElement(
    "div",
    {
      ref: x,
      style: {
        position: "relative",
        // `isolation: isolate` keeps the z-index:-1 sibling from sinking
        // behind ancestors — same trick the SVG path uses.
        ...it ? { isolation: "isolate" } : {}
      }
    },
    it,
    P
  );
}
T.forwardRef(jj);
function Vv(n, t) {
  if (typeof n == "function")
    return n(t);
  n != null && (n.current = t);
}
function Aj(...n) {
  return (t) => {
    let i = !1;
    const l = n.map((o) => {
      const c = Vv(o, t);
      return !i && typeof c == "function" && (i = !0), c;
    });
    if (i)
      return () => {
        for (let o = 0; o < l.length; o++) {
          const c = l[o];
          typeof c == "function" ? c() : Vv(n[o], null);
        }
      };
  };
}
function Ej(...n) {
  return T.useCallback(Aj(...n), n);
}
class Mj extends T.Component {
  getSnapshotBeforeUpdate(t) {
    const i = this.props.childRef.current;
    if (gc(i) && t.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const l = i.offsetParent, o = gc(l) && l.offsetWidth || 0, c = gc(l) && l.offsetHeight || 0, u = getComputedStyle(i), d = this.props.sizeRef.current;
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
function _j({ children: n, isPresent: t, anchorX: i, anchorY: l, root: o, pop: c }) {
  const u = T.useId(), d = T.useRef(null), p = T.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    direction: "ltr"
  }), { nonce: y } = T.useContext(Ps), g = n.props?.ref ?? n?.ref, v = Ej(d, g);
  return T.useInsertionEffect(() => {
    const { width: b, height: j, top: w, left: C, right: x, bottom: A, direction: R } = p.current;
    if (t || c === !1 || !d.current || !b || !j)
      return;
    const M = R === "rtl", _ = i === "left" ? M ? `right: ${x}` : `left: ${C}` : M ? `left: ${C}` : `right: ${x}`, L = l === "bottom" ? `bottom: ${A}` : `top: ${w}`;
    d.current.dataset.motionPopId = u;
    const N = document.createElement("style");
    y && (N.nonce = y);
    const D = o ?? document.head;
    return D.appendChild(N), N.sheet && N.sheet.insertRule(`
          [data-motion-pop-id="${u}"] {
            position: absolute !important;
            width: ${b}px !important;
            height: ${j}px !important;
            ${_}px !important;
            ${L}px !important;
          }
        `), () => {
      d.current?.removeAttribute("data-motion-pop-id"), D.contains(N) && D.removeChild(N);
    };
  }, [t]), h.jsx(Mj, { isPresent: t, childRef: d, sizeRef: p, pop: c, children: c === !1 ? n : T.cloneElement(n, { ref: v }) });
}
const Rj = ({ children: n, initial: t, isPresent: i, onExitComplete: l, custom: o, presenceAffectsLayout: c, mode: u, anchorX: d, anchorY: p, root: y }) => {
  const g = Hi(Dj), v = T.useId(), b = T.useRef(i), j = T.useRef(l);
  tu(() => {
    b.current = i, j.current = l;
  });
  let w = !0, C = T.useMemo(() => (w = !1, {
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
  return c && w && (C = { ...C }), T.useMemo(() => {
    g.forEach((x, A) => g.set(A, !1));
  }, [i]), T.useEffect(() => {
    !i && !g.size && l && l();
  }, [i]), n = h.jsx(_j, { pop: u === "popLayout", isPresent: i, anchorX: d, anchorY: p, root: y, children: n }), h.jsx(_r.Provider, { value: C, children: n });
};
function Dj() {
  return /* @__PURE__ */ new Map();
}
function dS(n = !0) {
  const t = T.useContext(_r);
  if (t === null)
    return [!0, null];
  const { isPresent: i, onExitComplete: l, register: o } = t, c = T.useId();
  T.useEffect(() => {
    if (n)
      return o(c);
  }, [n]);
  const u = T.useCallback(() => n && l && l(c), [c, l, n]);
  return !i && l ? [!1, u] : [!0];
}
function Nj() {
  return Oj(T.useContext(_r));
}
function Oj(n) {
  return n === null ? !0 : n.isPresent;
}
const ic = (n) => n.key || "";
function zv(n) {
  const t = [];
  return T.Children.forEach(n, (i) => {
    T.isValidElement(i) && t.push(i);
  }), t;
}
const Xs = ({ children: n, custom: t, initial: i = !0, onExitComplete: l, presenceAffectsLayout: o = !0, mode: c = "sync", propagate: u = !1, anchorX: d = "left", anchorY: p = "top", root: y }) => {
  const [g, v] = dS(u), b = T.useMemo(() => zv(n), [n]), j = u && !g ? [] : b.map(ic), w = T.useRef(!0), C = T.useRef(b), x = Hi(() => /* @__PURE__ */ new Map()), A = T.useRef(/* @__PURE__ */ new Set()), [R, M] = T.useState(b), [_, L] = T.useState(b);
  tu(() => {
    w.current = !1, C.current = b;
    for (let V = 0; V < _.length; V++) {
      const H = ic(_[V]);
      j.includes(H) ? (x.delete(H), A.current.delete(H)) : x.get(H) !== !0 && x.set(H, !1);
    }
  }, [_, j.length, j.join("-")]);
  const N = [];
  if (b !== R) {
    let V = [...b];
    for (let H = 0; H < _.length; H++) {
      const B = _[H], U = ic(B);
      j.includes(U) || (V.splice(H, 0, B), N.push(B));
    }
    return c === "wait" && N.length && (V = N), L(zv(V)), M(b), null;
  }
  const { forceRender: D } = T.useContext(hm);
  return h.jsx(h.Fragment, { children: _.map((V) => {
    const H = ic(V), B = u && !g ? !1 : b === _ || j.includes(H), U = () => {
      if (A.current.has(H))
        return;
      if (x.has(H))
        A.current.add(H), x.set(H, !0);
      else
        return;
      let I = !0;
      x.forEach((P) => {
        P || (I = !1);
      }), I && (D?.(), L(C.current), u && v?.(), l && l());
    };
    return h.jsx(Rj, { isPresent: B, initial: !w.current || i ? void 0 : !1, custom: t, presenceAffectsLayout: o, mode: c, root: y, onExitComplete: B ? void 0 : U, anchorX: d, anchorY: p, children: V }, H);
  }) });
};
function Lj({ children: n, features: t, strict: i = !1 }) {
  const [, l] = T.useState(!Pd(t)), o = T.useRef(void 0);
  if (!Pd(t)) {
    const { renderer: c, ...u } = t;
    o.current = c, Oh(u);
  }
  return T.useEffect(() => {
    Pd(t) && t().then(({ renderer: c, ...u }) => {
      Oh(u), o.current = c, l(!0);
    });
  }, []), h.jsx(mm.Provider, { value: { renderer: o.current, strict: i }, children: n });
}
function Pd(n) {
  return typeof n == "function";
}
function Pm({ children: n, isValidProp: t, ...i }) {
  t && Kx(t);
  const l = T.useContext(Ps);
  i = { ...l, ...i }, i.transition = Cm(i.transition, l.transition), i.isStatic = Hi(() => i.isStatic);
  const o = T.useMemo(() => i, [
    JSON.stringify(i.transition),
    i.transformPagePoint,
    i.reducedMotion,
    i.skipAnimations
  ]);
  return h.jsx(Ps.Provider, { value: o, children: n });
}
function $j(n, t) {
  if (typeof Proxy > "u")
    return jc;
  const i = /* @__PURE__ */ new Map(), l = (c, u) => jc(c, u, n, t), o = (c, u) => l(c, u);
  return new Proxy(o, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (c, u) => u === "create" ? l : (i.has(u) || i.set(u, jc(u, void 0, n, t)), i.get(u))
  });
}
const hS = (n, t) => t.isSVG ?? zm(n) ? new Dx(t) : new Ax(t, {
  allowProjection: n !== T.Fragment
});
class kj extends ni {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(t) {
    super(t), t.animationState || (t.animationState = fC(t));
  }
  updateAnimationControlsSubscription() {
    const { animate: t } = this.node.getProps();
    Jc(t) && (this.unmountControls = t.subscribe(this.node));
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
let Bj = 0;
class Vj extends ni {
  constructor() {
    super(...arguments), this.id = Bj++, this.isExitComplete = !1;
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
          const d = Bi(this.node, c, u);
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
const mS = {
  animation: {
    Feature: kj
  },
  exit: {
    Feature: Vj
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
const zj = (n) => (t) => Nm(t) && n(t, Rr(t));
function sr(n, t, i, l) {
  return vr(n, t, zj(i), l);
}
const pS = ({ current: n }) => n ? n.ownerDocument.defaultView : null, Uv = (n, t) => Math.abs(n - t);
function Uj(n, t) {
  const i = Uv(n.x, t.x), l = Uv(n.y, t.y);
  return Math.sqrt(i ** 2 + l ** 2);
}
const Hv = /* @__PURE__ */ new Set(["auto", "scroll"]);
class yS {
  constructor(t, i, { transformPagePoint: l, contextWindow: o = window, dragSnapToOrigin: c = !1, distanceThreshold: u = 3, element: d } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (w) => {
      this.handleScroll(w.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = sc(this.lastRawMoveEventInfo, this.transformPagePoint));
      const w = Gd(this.lastMoveEventInfo, this.history), C = this.startEvent !== null, x = Uj(w.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!C && !x)
        return;
      const { point: A } = w, { timestamp: R } = ke;
      this.history.push({ ...A, timestamp: R });
      const { onStart: M, onMove: _ } = this.handlers;
      C || (M && M(this.lastMoveEvent, w), this.startEvent = this.lastMoveEvent), _ && _(this.lastMoveEvent, w);
    }, this.handlePointerMove = (w, C) => {
      this.lastMoveEvent = w, this.lastRawMoveEventInfo = C, this.lastMoveEventInfo = sc(C, this.transformPagePoint), It.update(this.updatePoint, !0);
    }, this.handlePointerUp = (w, C) => {
      this.end();
      const { onEnd: x, onSessionEnd: A, resumeAnimation: R } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && R && R(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const M = Gd(w.type === "pointercancel" ? this.lastMoveEventInfo : sc(C, this.transformPagePoint), this.history);
      this.startEvent && x && x(w, M), A && A(w, M);
    }, !Nm(t))
      return;
    this.dragSnapToOrigin = c, this.handlers = i, this.transformPagePoint = l, this.distanceThreshold = u, this.contextWindow = o || window;
    const p = Rr(t), y = sc(p, this.transformPagePoint), { point: g } = y, { timestamp: v } = ke;
    this.history = [{ ...g, timestamp: v }];
    const { onSessionStart: b } = i;
    b && b(t, Gd(y, this.history));
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
      (Hv.has(l.overflowX) || Hv.has(l.overflowY)) && this.scrollPositions.set(i, {
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
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), wa(this.updatePoint);
  }
}
function sc(n, t) {
  return t ? { point: t(n.point) } : n;
}
function qv(n, t) {
  return { x: n.x - t.x, y: n.y - t.y };
}
function Gd({ point: n }, t) {
  return {
    point: n,
    delta: qv(n, gS(t)),
    offset: qv(n, Hj(t)),
    velocity: qj(t, 0.1)
  };
}
function Hj(n) {
  return n[0];
}
function gS(n) {
  return n[n.length - 1];
}
function qj(n, t) {
  if (n.length < 2)
    return { x: 0, y: 0 };
  let i = n.length - 1, l = null;
  const o = gS(n);
  for (; i >= 0 && (l = n[i], !(o.timestamp - l.timestamp > /* @__PURE__ */ sn(t))); )
    i--;
  if (!l)
    return { x: 0, y: 0 };
  l === n[0] && n.length > 2 && o.timestamp - l.timestamp > /* @__PURE__ */ sn(t) * 2 && (l = n[1]);
  const c = /* @__PURE__ */ jn(o.timestamp - l.timestamp);
  if (c === 0)
    return { x: 0, y: 0 };
  const u = {
    x: (o.x - l.x) / c,
    y: (o.y - l.y) / c
  };
  return u.x === 1 / 0 && (u.x = 0), u.y === 1 / 0 && (u.y = 0), u;
}
function Yj(n, { min: t, max: i }, l) {
  return t !== void 0 && n < t ? n = l ? Ft(t, n, l.min) : Math.max(n, t) : i !== void 0 && n > i && (n = l ? Ft(i, n, l.max) : Math.min(n, i)), n;
}
function Yv(n, t, i) {
  return {
    min: t !== void 0 ? n.min + t : void 0,
    max: i !== void 0 ? n.max + i - (n.max - n.min) : void 0
  };
}
function Pj(n, { top: t, left: i, bottom: l, right: o }) {
  return {
    x: Yv(n.x, i, o),
    y: Yv(n.y, t, l)
  };
}
function Pv(n, t) {
  let i = t.min - n.min, l = t.max - n.max;
  return t.max - t.min < n.max - n.min && ([i, l] = [l, i]), { min: i, max: l };
}
function Gj(n, t) {
  return {
    x: Pv(n.x, t.x),
    y: Pv(n.y, t.y)
  };
}
function Xj(n, t) {
  let i = 0.5;
  const l = Ke(n), o = Ke(t);
  return o > l ? i = /* @__PURE__ */ Ys(t.min, t.max - l, n.min) : l > o && (i = /* @__PURE__ */ Ys(n.min, n.max - o, t.min)), Zn(0, 1, i);
}
function Kj(n, t) {
  const i = {};
  return t.min !== void 0 && (i.min = t.min - n.min), t.max !== void 0 && (i.max = t.max - n.min), i;
}
const Vh = 0.35;
function Zj(n = Vh) {
  return n === !1 ? n = 0 : n === !0 && (n = Vh), {
    x: Gv(n, "left", "right"),
    y: Gv(n, "top", "bottom")
  };
}
function Gv(n, t, i) {
  return {
    min: Xv(n, t),
    max: Xv(n, i)
  };
}
function Xv(n, t) {
  return typeof n == "number" ? n : n[t] || 0;
}
const Qj = /* @__PURE__ */ new WeakMap();
class Fj {
  constructor(t) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = Se(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = t;
  }
  start(t, { snapToCursor: i = !1, distanceThreshold: l } = {}) {
    const { presenceContext: o } = this.visualElement;
    if (o && o.isPresent === !1)
      return;
    const c = (v) => {
      i && this.snapToCursor(Rr(v).point), this.stopAnimation();
    }, u = (v, b) => {
      const { drag: j, dragPropagation: w, onDragStart: C } = this.getProps();
      if (j && !w && (this.openDragLock && this.openDragLock(), this.openDragLock = w6(j), !this.openDragLock))
        return;
      this.latestPointerEvent = v, this.latestPanInfo = b, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), Gn((A) => {
        let R = this.getAxisMotionValue(A).get() || 0;
        if (Kn.test(R)) {
          const { projection: M } = this.visualElement;
          if (M && M.layout) {
            const _ = M.layout.layoutBox[A];
            _ && (R = Ke(_) * (parseFloat(R) / 100));
          }
        }
        this.originPoint[A] = R;
      }), C && It.update(() => C(v, b), !1, !0), Th(this.visualElement, "transform");
      const { animationState: x } = this.visualElement;
      x && x.setActive("whileDrag", !0);
    }, d = (v, b) => {
      this.latestPointerEvent = v, this.latestPanInfo = b;
      const { dragPropagation: j, dragDirectionLock: w, onDirectionLock: C, onDrag: x } = this.getProps();
      if (!j && !this.openDragLock)
        return;
      const { offset: A } = b;
      if (w && this.currentDirection === null) {
        this.currentDirection = Jj(A), this.currentDirection !== null && C && C(this.currentDirection);
        return;
      }
      this.updateAxis("x", b.point, A), this.updateAxis("y", b.point, A), this.visualElement.render(), x && It.update(() => x(v, b), !1, !0);
    }, p = (v, b) => {
      this.latestPointerEvent = v, this.latestPanInfo = b, this.stop(v, b), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, y = () => {
      const { dragSnapToOrigin: v } = this.getProps();
      (v || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: g } = this.getProps();
    this.panSession = new yS(t, {
      onSessionStart: c,
      onStart: u,
      onMove: d,
      onSessionEnd: p,
      resumeAnimation: y
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: g,
      distanceThreshold: l,
      contextWindow: pS(this.visualElement),
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
    if (!l || !lc(t, o, this.currentDirection))
      return;
    const c = this.getAxisMotionValue(t);
    let u = this.originPoint[t] + l[t];
    this.constraints && this.constraints[t] && (u = Yj(u, this.constraints[t], this.elastic[t])), c.set(u);
  }
  resolveConstraints() {
    const { dragConstraints: t, dragElastic: i } = this.getProps(), l = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, o = this.constraints;
    t && Os(t) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : t && l ? this.constraints = Pj(l.layoutBox, t) : this.constraints = !1, this.elastic = Zj(i), o !== this.constraints && !Os(t) && l && this.constraints && !this.hasMutatedConstraints && Gn((c) => {
      this.constraints !== !1 && this.getAxisMotionValue(c) && (this.constraints[c] = Kj(l.layoutBox[c], this.constraints[c]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: t, onMeasureDragConstraints: i } = this.getProps();
    if (!t || !Os(t))
      return !1;
    const l = t.current, { projection: o } = this.visualElement;
    if (!o || !o.layout)
      return !1;
    o.root && (o.root.scroll = void 0, o.root.updateScroll());
    const c = Z6(l, o.root, this.visualElement.getTransformPagePoint());
    let u = Gj(o.layout.layoutBox, c);
    if (i) {
      const d = i(G6(u));
      this.hasMutatedConstraints = !!d, d && (u = xx(d));
    }
    return u;
  }
  startAnimation(t) {
    const { drag: i, dragMomentum: l, dragElastic: o, dragTransition: c, dragSnapToOrigin: u, onDragTransitionEnd: d } = this.getProps(), p = this.constraints || {}, y = Gn((g) => {
      if (!lc(g, i, this.currentDirection))
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
    return Th(this.visualElement, t), l.start(jm(t, l, 0, i, this.visualElement, !1));
  }
  stopAnimation() {
    Gn((t) => this.getAxisMotionValue(t).stop());
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
    Gn((i) => {
      const { drag: l } = this.getProps();
      if (!lc(i, l, this.currentDirection))
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
    if (!Os(i) || !l || !this.constraints)
      return;
    this.stopAnimation();
    const o = { x: 0, y: 0 };
    Gn((u) => {
      const d = this.getAxisMotionValue(u);
      if (d && this.constraints !== !1) {
        const p = d.get();
        o[u] = Xj({ min: p, max: p }, this.constraints[u]);
      }
    });
    const { transformTemplate: c } = this.visualElement.getProps();
    this.visualElement.current.style.transform = c ? c({}, "") : "none", l.root && l.root.updateScroll(), l.updateLayout(), this.constraints = !1, this.resolveConstraints(), Gn((u) => {
      if (!lc(u, t, null))
        return;
      const d = this.getAxisMotionValue(u), { min: p, max: y } = this.constraints[u];
      d.set(Ft(p, y, o[u]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    Qj.set(this.visualElement, this);
    const t = this.visualElement.current, i = sr(t, "pointerdown", (y) => {
      const { drag: g, dragListener: v = !0 } = this.getProps(), b = y.target, j = b !== t && M6(b);
      g && v && !j && this.start(y);
    });
    let l;
    const o = () => {
      const { dragConstraints: y } = this.getProps();
      Os(y) && y.current && (this.constraints = this.resolveRefConstraints(), l || (l = Ij(t, y.current, () => this.scalePositionWithinConstraints())));
    }, { projection: c } = this.visualElement, u = c.addEventListener("measure", o);
    c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()), It.read(o);
    const d = vr(window, "resize", () => this.scalePositionWithinConstraints()), p = c.addEventListener("didUpdate", (({ delta: y, hasLayoutChanged: g }) => {
      this.isDragging && g && (Gn((v) => {
        const b = this.getAxisMotionValue(v);
        b && (this.originPoint[v] += y[v].translate, b.set(b.get() + y[v].translate));
      }), this.visualElement.render());
    }));
    return () => {
      d(), i(), u(), p && p(), l && l();
    };
  }
  getProps() {
    const t = this.visualElement.getProps(), { drag: i = !1, dragDirectionLock: l = !1, dragPropagation: o = !1, dragConstraints: c = !1, dragElastic: u = Vh, dragMomentum: d = !0 } = t;
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
function Kv(n) {
  let t = !0;
  return () => {
    if (t) {
      t = !1;
      return;
    }
    n();
  };
}
function Ij(n, t, i) {
  const l = Zg(n, Kv(i)), o = Zg(t, Kv(i));
  return () => {
    l(), o();
  };
}
function lc(n, t, i) {
  return (t === !0 || t === n) && (i === null || i === n);
}
function Jj(n, t = 10) {
  let i = null;
  return Math.abs(n.y) > t ? i = "y" : Math.abs(n.x) > t && (i = "x"), i;
}
class Wj extends ni {
  constructor(t) {
    super(t), this.removeGroupControls = An, this.removeListeners = An, this.controls = new Fj(t);
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
const Xd = (n) => (t, i) => {
  n && It.update(() => n(t, i), !1, !0);
};
class tA extends ni {
  constructor() {
    super(...arguments), this.removePointerDownListener = An;
  }
  onPointerDown(t) {
    this.session = new yS(t, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: pS(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: t, onPanStart: i, onPan: l, onPanEnd: o } = this.node.getProps();
    return {
      onSessionStart: Xd(t),
      onStart: Xd(i),
      onMove: Xd(l),
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
let Kd = !1;
class eA extends T.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: t, layoutGroup: i, switchLayoutGroup: l, layoutId: o } = this.props, { projection: c } = t;
    c && (i.group && i.group.add(c), l && l.register && o && l.register(c), Kd && c.root.didUpdate(), c.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), c.setOptions({
      ...c.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), Tc.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(t) {
    const { layoutDependency: i, visualElement: l, drag: o, isPresent: c } = this.props, { projection: u } = l;
    return u && (u.isPresent = c, t.layoutDependency !== i && u.setOptions({
      ...u.options,
      layoutDependency: i
    }), Kd = !0, o || t.layoutDependency !== i || i === void 0 || t.isPresent !== c ? u.willUpdate() : this.safeToRemove(), t.isPresent !== c && (c ? u.promote() : u.relegate() || It.postRender(() => {
      const d = u.getStack();
      (!d || !d.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: t, layoutAnchor: i } = this.props, { projection: l } = t;
    l && (l.options.layoutAnchor = i, l.root.didUpdate(), Dm.postRender(() => {
      !l.currentAnimation && l.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: t, layoutGroup: i, switchLayoutGroup: l } = this.props, { projection: o } = t;
    Kd = !0, o && (o.scheduleCheckAfterUnmount(), i && i.group && i.group.remove(o), l && l.deregister && l.deregister(o));
  }
  safeToRemove() {
    const { safeToRemove: t } = this.props;
    t && t();
  }
  render() {
    return null;
  }
}
function vS(n) {
  const [t, i] = dS(), l = T.useContext(hm);
  return h.jsx(eA, { ...n, layoutGroup: l, switchLayoutGroup: T.useContext(Fx), isPresent: t, safeToRemove: i });
}
const bS = {
  pan: {
    Feature: tA
  },
  drag: {
    Feature: Wj,
    ProjectionNode: Yx,
    MeasureLayout: vS
  }
};
function Zv(n, t, i) {
  const { props: l } = n;
  n.animationState && l.whileHover && n.animationState.setActive("whileHover", i === "Start");
  const o = "onHover" + i, c = l[o];
  c && It.postRender(() => c(t, Rr(t)));
}
class nA extends ni {
  mount() {
    const { current: t } = this.node;
    t && (this.unmount = T6(t, (i, l) => (Zv(this.node, l, "Start"), (o) => Zv(this.node, o, "End"))));
  }
  unmount() {
  }
}
class aA extends ni {
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
function Qv(n, t, i) {
  const { props: l } = n;
  if (n.current instanceof HTMLButtonElement && n.current.disabled)
    return;
  n.animationState && l.whileTap && n.animationState.setActive("whileTap", i === "Start");
  const o = "onTap" + (i === "End" ? "" : i), c = l[o];
  c && It.postRender(() => c(t, Rr(t)));
}
class iA extends ni {
  mount() {
    const { current: t } = this.node;
    if (!t)
      return;
    const { globalTapTarget: i, propagate: l } = this.node.props;
    this.unmount = R6(t, (o, c) => (Qv(this.node, c, "Start"), (u, { success: d }) => Qv(this.node, u, d ? "End" : "Cancel")), {
      useGlobalTarget: i,
      stopPropagation: l?.tap === !1
    });
  }
  unmount() {
  }
}
const zh = /* @__PURE__ */ new WeakMap(), Zd = /* @__PURE__ */ new WeakMap(), sA = (n) => {
  const t = zh.get(n.target);
  t && t(n);
}, lA = (n) => {
  n.forEach(sA);
};
function rA({ root: n, ...t }) {
  const i = n || document;
  Zd.has(i) || Zd.set(i, {});
  const l = Zd.get(i), o = JSON.stringify(t);
  return l[o] || (l[o] = new IntersectionObserver(lA, { root: n, ...t })), l[o];
}
function oA(n, t, i) {
  const l = rA(t);
  return zh.set(n, i), l.observe(n), () => {
    zh.delete(n), l.unobserve(n);
  };
}
const cA = {
  some: 0,
  all: 1
};
class uA extends ni {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: t = {} } = this.node.getProps(), { root: i, margin: l, amount: o = "some", once: c } = t, u = {
      root: i ? i.current : void 0,
      rootMargin: l,
      threshold: typeof o == "number" ? o : cA[o]
    }, d = (p) => {
      const { isIntersecting: y } = p;
      if (this.isInView === y || (this.isInView = y, c && !y && this.hasEnteredView))
        return;
      y && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", y);
      const { onViewportEnter: g, onViewportLeave: v } = this.node.getProps(), b = y ? g : v;
      b && b(p);
    };
    this.stopObserver = oA(this.node.current, u, d);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: t, prevProps: i } = this.node;
    ["amount", "margin", "root"].some(fA(t, i)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function fA({ viewport: n = {} }, { viewport: t = {} } = {}) {
  return (i) => n[i] !== t[i];
}
const xS = {
  inView: {
    Feature: uA
  },
  tap: {
    Feature: iA
  },
  focus: {
    Feature: aA
  },
  hover: {
    Feature: nA
  }
}, SS = {
  layout: {
    ProjectionNode: Yx,
    MeasureLayout: vS
  }
}, dA = {
  ...mS,
  ...xS,
  ...bS,
  ...SS
}, hA = /* @__PURE__ */ $j(dA, hS), mA = {
  renderer: hS,
  ...mS,
  ...xS
}, pA = {
  ...mA,
  ...bS,
  ...SS
};
function Gm(n) {
  const t = Hi(() => Ja(n)), { isStatic: i } = T.useContext(Ps);
  if (i) {
    const [, l] = T.useState(n);
    T.useEffect(() => t.on("change", l), []);
  }
  return t;
}
function wS(n, t) {
  const i = Gm(t()), l = () => i.set(t());
  return l(), tu(() => {
    const o = () => It.preRender(l, !1, !0), c = n.map((u) => u.on("change", o));
    return () => {
      c.forEach((u) => u()), wa(l);
    };
  }), i;
}
function yA(n) {
  nr.current = [], n();
  const t = wS(nr.current, n);
  return nr.current = void 0, t;
}
function Uh(n, t, i, l) {
  if (typeof n == "function")
    return yA(n);
  const c = typeof t == "function" ? t : z6(t, i, l), u = Array.isArray(n) ? Fv(n, c) : Fv([n], ([p]) => c(p)), d = Array.isArray(n) ? void 0 : n.accelerate;
  return d && !d.isTransformed && typeof t != "function" && Array.isArray(i) && l?.clamp !== !1 && (u.accelerate = {
    ...d,
    times: t,
    keyframes: i,
    isTransformed: !0
  }), u;
}
function Fv(n, t) {
  const i = Hi(() => []);
  return wS(n, () => {
    i.length = 0;
    const l = n.length;
    for (let o = 0; o < l; o++)
      i[o] = n[o].get();
    return t(i);
  });
}
function gA() {
  !$m.current && yx();
  const [n] = T.useState(kc.current);
  return n;
}
function Xm(n) {
  return typeof n == "object" && !Array.isArray(n);
}
function CS(n, t, i, l) {
  return n == null ? [] : typeof n == "string" && Xm(t) ? Rm(n, i, l) : n instanceof NodeList ? Array.from(n) : Array.isArray(n) ? n.filter((o) => o != null) : [n];
}
function vA(n, t, i) {
  return n * (t + 1) + i * t;
}
function Iv(n, t, i, l) {
  return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, n + parseFloat(t)) : t === "<" ? i : t.startsWith("<") ? Math.max(0, i + parseFloat(t.slice(1))) : l.get(t) ?? n;
}
function bA(n, t, i) {
  for (let l = 0; l < n.length; l++) {
    const o = n[l];
    o.at > t && o.at < i && (qs(n, o), l--);
  }
}
function xA(n, t, i, l, o, c) {
  bA(n, o, c);
  for (let u = 0; u < t.length; u++)
    n.push({
      value: t[u],
      at: Ft(o, c, l[u]),
      easing: /* @__PURE__ */ Mb(i, u)
    });
}
function SA(n, t, i = 0) {
  const l = t + 1 + t * i;
  for (let o = 0; o < n.length; o++)
    n[o] = n[o] / l;
}
function wA(n, t) {
  return n.at === t.at ? n.value === null ? 1 : t.value === null ? -1 : 0 : n.at - t.at;
}
const CA = "easeInOut", TA = 20;
function jA(n, { defaultTransition: t = {}, ...i } = {}, l, o) {
  const c = t.duration || 0.3, u = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), p = {}, y = /* @__PURE__ */ new Map();
  let g = 0, v = 0, b = 0;
  for (let j = 0; j < n.length; j++) {
    const w = n[j];
    if (typeof w == "string") {
      y.set(w, v);
      continue;
    } else if (!Array.isArray(w)) {
      y.set(w.name, Iv(v, w.at, g, y));
      continue;
    }
    let [C, x, A = {}] = w;
    A.at !== void 0 && (v = Iv(v, A.at, g, y));
    let R = 0;
    const M = (_, L, N, D = 0, V = 0) => {
      const H = AA(_), { delay: B = 0, times: U = Pb(H), type: I = t.type || "keyframes", repeat: P, repeatType: it, repeatDelay: J = 0, ...$ } = L;
      let { ease: X = t.ease || "easeOut", duration: F } = L;
      const tt = typeof B == "function" ? B(D, V) : B, dt = H.length, O = wm(I) ? I : o?.[I || "keyframes"];
      if (dt <= 2 && O) {
        let ot = 100;
        if (dt === 2 && _A(H)) {
          const nt = H[1] - H[0];
          ot = Math.abs(nt);
        }
        const ct = {
          ...t,
          ...$
        };
        F !== void 0 && (ct.duration = /* @__PURE__ */ sn(F));
        const ft = Ub(ct, ot, O);
        X = ft.ease, F = ft.duration;
      }
      F ?? (F = c);
      const q = v + tt;
      U.length === 1 && U[0] === 0 && (U[1] = 1);
      const Y = U.length - H.length;
      if (Y > 0 && Yb(U, Y), H.length === 1 && H.unshift(null), P && P < TA) {
        const ot = F > 0 ? J / F : 0;
        F = vA(F, P, J);
        const ct = [...H], ft = [...U];
        X = Array.isArray(X) ? [...X] : [X];
        const nt = [...X], mt = it === "reverse" || it === "mirror";
        let ut = ct, yt = nt;
        mt && (ut = [...ct].reverse(), it === "reverse" && (yt = [...nt].reverse().map((xt) => typeof xt == "function" ? /* @__PURE__ */ um(xt) : xt)));
        for (let xt = 0; xt < P; xt++) {
          const ce = mt && xt % 2 === 0, ht = ce ? ut : ct, $t = ce ? yt : nt, Wt = (xt + 1) * (1 + ot);
          ot > 0 && (H.push(H[H.length - 1]), U.push(Wt), X.push("linear")), H.push(...ht);
          for (let ue = 0; ue < ht.length; ue++)
            U.push(ft[ue] + Wt), X.push(ue === 0 ? "linear" : /* @__PURE__ */ Mb($t, ue - 1));
        }
        SA(U, P, ot);
      }
      const et = q + F;
      xA(N, H, X, U, q, et), R = Math.max(tt + F, R), b = Math.max(et, b);
    };
    if (Ee(C)) {
      const _ = Jv(C, d);
      M(x, A, Wv("default", _));
    } else {
      const _ = CS(C, x, l, p), L = _.length;
      for (let N = 0; N < L; N++) {
        x = x, A = A;
        const D = _[N], V = Jv(D, d);
        for (const H in x)
          M(x[H], EA(A, H), Wv(H, V), N, L);
      }
    }
    g = v, v += R;
  }
  return d.forEach((j, w) => {
    for (const C in j) {
      const x = j[C];
      x.sort(wA);
      const A = [], R = [], M = [];
      for (let D = 0; D < x.length; D++) {
        const { at: V, value: H, easing: B } = x[D];
        A.push(H), R.push(/* @__PURE__ */ Ys(0, b, V)), M.push(B || "easeOut");
      }
      R[0] !== 0 && (R.unshift(0), A.unshift(A[0]), M.unshift(CA)), R[R.length - 1] !== 1 && (R.push(1), A.push(null)), u.has(w) || u.set(w, {
        keyframes: {},
        transition: {}
      });
      const _ = u.get(w);
      _.keyframes[C] = A;
      const { type: L, ...N } = t;
      _.transition[C] = {
        ...N,
        duration: b,
        ease: M,
        times: R,
        ...i
      };
    }
  }), u;
}
function Jv(n, t) {
  return !t.has(n) && t.set(n, {}), t.get(n);
}
function Wv(n, t) {
  return t[n] || (t[n] = []), t[n];
}
function AA(n) {
  return Array.isArray(n) ? n : [n];
}
function EA(n, t) {
  return n && n[t] ? {
    ...n,
    ...n[t]
  } : { ...n };
}
const MA = (n) => typeof n == "number", _A = (n) => n.every(MA);
function RA(n) {
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
  }, i = Ic(n) && !mx(n) ? new Dx(t) : new Ax(t);
  i.mount(n), yr.set(n, i);
}
function DA(n) {
  const t = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  }, i = new eC(t);
  i.mount(n), yr.set(n, i);
}
function NA(n, t) {
  return Ee(n) || typeof n == "number" || typeof n == "string" && !Xm(t);
}
function TS(n, t, i, l) {
  const o = [];
  if (NA(n, t))
    o.push(zx(n, Xm(t) && t.default || t, i && (i.default || i)));
  else {
    if (n == null)
      return o;
    const c = CS(n, t, l), u = c.length;
    for (let d = 0; d < u; d++) {
      const p = c[d], y = p instanceof Element ? RA : DA;
      yr.has(p) || y(p);
      const g = yr.get(p), v = { ...i };
      "delay" in v && typeof v.delay == "function" && (v.delay = v.delay(d, u)), o.push(...Mm(g, { ...t, transition: v }, {}));
    }
  }
  return o;
}
function OA(n, t, i) {
  const l = [], o = n.map((u) => {
    if (Array.isArray(u) && typeof u[0] == "function") {
      const d = u[0], p = Ja(0);
      return p.on("change", d), u.length === 1 ? [p, [0, 1]] : u.length === 2 ? [p, [0, 1], u[1]] : [p, u[1], u[2]];
    }
    return u;
  });
  return jA(o, t, i, { spring: pr }).forEach(({ keyframes: u, transition: d }, p) => {
    l.push(...TS(p, u, d));
  }), l;
}
function LA(n) {
  return Array.isArray(n) && n.some(Array.isArray);
}
function $A(n = {}) {
  const { scope: t, reduceMotion: i, skipAnimations: l } = n;
  function o(c, u, d) {
    let p = [], y;
    const g = {};
    if (i !== void 0 && (g.reduceMotion = i), l !== void 0 && (g.skipAnimations = l), LA(c)) {
      const { onComplete: b, ...j } = u || {};
      typeof b == "function" && (y = b), p = OA(c, { ...g, ...j }, t);
    } else {
      const { onComplete: b, ...j } = d || {};
      typeof b == "function" && (y = b), p = TS(c, u, { ...g, ...j }, t);
    }
    const v = new G9(p);
    return y && v.finished.then(y), t && (t.animations.push(v), v.finished.then(() => {
      qs(t.animations, v);
    })), v;
  }
  return o;
}
const lr = $A();
class kA {
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
const BA = () => new kA();
function VA() {
  return Hi(BA);
}
const zi = hA, zA = new Intl.Segmenter(void 0, {
  granularity: "grapheme"
}), Ui = (n) => Array.from(zA.segment(n), (t) => t.segment), Vi = (n) => n >= "0" && n <= "9";
function UA(n, t) {
  return (n % t + t) % t;
}
const rc = 8, HA = {
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
function qA(n, t) {
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
function YA(n, t, i, l) {
  const o = Ui(n), c = Ui(t), u = qA(o, c), d = new Array(c.length).fill("");
  for (const [w, C] of u)
    d[C] = i[w];
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
function jS(n, t, i, l) {
  const o = (N) => parseFloat(N.replace(/[^0-9.-]/g, "")) || 0, c = Math.sign(o(t) - o(n)), u = Ui(n), d = Ui(t), p = (N) => {
    const D = N.findIndex((V) => Vi(V));
    return D === -1 ? N.length : D;
  }, y = p(d), g = p(u), v = Math.min(y, g), b = new Array(d.length);
  let j = l;
  for (let N = 0; N < y; N++)
    b[N] = N < v && d[N] === u[N] ? i[N] : j++;
  const w = u.slice(g), C = d.slice(y), x = i.slice(g), A = Math.max(w.length, C.length), R = [
    ...Array(Math.max(0, A - w.length)).fill(""),
    ...w
  ], M = [
    ...Array(Math.max(0, A - C.length)).fill(""),
    ...C
  ], _ = [
    ...Array(Math.max(0, A - x.length)).fill(-1),
    ...x
  ], L = A - C.length;
  for (let N = 0; N < C.length; N++) {
    const D = L + N;
    b[y + N] = M[D] === R[D] && _[D] >= 0 ? _[D] : j++;
  }
  return {
    keys: b,
    direction: c,
    nextId: j
  };
}
function PA({ text: n, Component: t, transition: i, stagger: l, animateInitial: o, onComplete: c, className: u, style: d, rest: p }) {
  const y = Ui(n), g = T.useRef(y.length), [v, b] = T.useState(n), [j, w] = T.useState(() => y.map((R, M) => M)), C = T.useRef(1);
  if (n !== v) {
    const R = jS(v, n, j, g.current);
    g.current = R.nextId, C.current = R.direction, w(R.keys), b(n);
  }
  const x = C.current, A = (() => {
    const R = y.findIndex((M) => Vi(M));
    return R === -1 ? y.length : R;
  })();
  return /* @__PURE__ */ h.jsx(Pm, {
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
      children: /* @__PURE__ */ h.jsx(Xs, {
        mode: "popLayout",
        initial: o,
        children: y.map((R, M) => {
          const _ = M < A, L = _ ? `pre-${M}` : `col-${y.length - 1 - M}`, N = M * l, D = M === y.length - 1;
          return /* @__PURE__ */ h.jsx(zi.span, {
            layout: "position",
            initial: _ ? !1 : {
              opacity: 0
            },
            animate: _ ? void 0 : {
              opacity: 1
            },
            exit: _ ? void 0 : {
              opacity: 0
            },
            style: {
              display: "inline-block",
              position: "relative"
            },
            children: _ ? /* @__PURE__ */ h.jsx("span", {
              style: {
                display: "inline-block",
                whiteSpace: "pre"
              },
              children: R
            }) : /* @__PURE__ */ h.jsx(Xs, {
              mode: "popLayout",
              initial: o,
              propagate: !0,
              children: /* @__PURE__ */ h.jsx(zi.span, {
                "aria-hidden": "true",
                initial: {
                  y: Vi(R) ? x > 0 ? rc : -rc : 0,
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
                    delay: N
                  }
                },
                exit: {
                  y: Vi(R) ? x > 0 ? -rc : rc : 0,
                  opacity: 0,
                  filter: "blur(2px)",
                  scale: 0.5,
                  transition: {
                    delay: N
                  }
                },
                onAnimationComplete: D && c ? c : void 0,
                style: {
                  display: "inline-block",
                  whiteSpace: "pre"
                },
                children: R
              }, j[M])
            })
          }, L);
        })
      })
    })
  });
}
function GA({ n, current: t }) {
  const i = Uh(t, (l) => {
    let o = UA(n - l, 10);
    return o > 5 && (o -= 10), `${-Math.max(-1, Math.min(1, o)) * 100}%`;
  });
  return /* @__PURE__ */ h.jsx(zi.span, {
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
const XA = [
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
], Bs = "0.25em", t2 = `linear-gradient(to bottom, transparent 0%, black ${Bs}, black calc(100% - ${Bs}), transparent 100%)`;
function KA({ digit: n, direction: t, transition: i, delay: l, animateIn: o }) {
  const c = Nj(), u = Math.max(n, 1), d = o ? n - u * (t || 1) : n, p = Gm(d), y = T.useRef(n), g = T.useRef(n), v = T.useRef(!0);
  if (n !== g.current) {
    const b = g.current;
    let j;
    t > 0 ? j = n >= b ? n - b : 10 - b + n : t < 0 ? j = b >= n ? -(b - n) : -(10 - n + b) : j = n - b, y.current += j, g.current = n;
  }
  return T.useEffect(() => {
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
      XA.map((b) => /* @__PURE__ */ h.jsx(GA, {
        n: b,
        current: p
      }, b))
    ]
  });
}
function ZA({ text: n, Component: t, transition: i, stagger: l, animateInitial: o, className: c, style: u, rest: d }) {
  const p = Ui(n), y = T.useRef(p.length), [g, v] = T.useState(n), [b, j] = T.useState(() => p.map((_, L) => L)), w = T.useRef(1), C = T.useRef(!1);
  if (T.useEffect(() => {
    C.current = !0;
  }, []), n !== g) {
    const _ = jS(g, n, b, y.current);
    y.current = _.nextId, w.current = _.direction, j(_.keys), v(n);
  }
  const x = w.current, A = (() => {
    const _ = p.findIndex((L) => Vi(L));
    return _ === -1 ? p.length : _;
  })(), R = p.filter((_) => Vi(_)).length;
  let M = 0;
  return /* @__PURE__ */ h.jsx(Pm, {
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
          paddingTop: Bs,
          paddingBottom: Bs,
          marginTop: `calc(-1 * ${Bs})`,
          marginBottom: `calc(-1 * ${Bs})`,
          maskImage: t2,
          WebkitMaskImage: t2
        },
        children: /* @__PURE__ */ h.jsx(Xs, {
          mode: "popLayout",
          initial: o,
          children: p.map((_, L) => {
            const N = L < A, D = N ? `pre-${L}` : `col-${p.length - 1 - L}`;
            if (N || !Vi(_))
              return /* @__PURE__ */ h.jsx(zi.span, {
                layout: "position",
                initial: !1,
                exit: N ? void 0 : {
                  opacity: 0
                },
                style: {
                  display: "inline-block",
                  whiteSpace: "pre"
                },
                children: _
              }, D);
            const V = (R - 1 - M) * l;
            return M++, /* @__PURE__ */ h.jsx(zi.span, {
              layout: "position",
              initial: !1,
              exit: {
                opacity: 0
              },
              style: {
                display: "inline-block"
              },
              children: /* @__PURE__ */ h.jsx(KA, {
                digit: Number(_),
                direction: x,
                transition: i,
                delay: V,
                animateIn: C.current || o
              })
            }, D);
          })
        })
      })
    })
  });
}
function QA({ text: n, Component: t, transition: i, driftX: l, driftY: o, trend: c, animateInitial: u, onComplete: d, className: p, style: y, rest: g }) {
  const v = Ui(n), b = T.useRef(v.length), [j, w] = T.useState(n), [C, x] = T.useState(() => v.map((M, _) => `c${_}`)), [A, R] = T.useState(0);
  if (n !== j) {
    const M = YA(j, n, C, b.current);
    b.current = M.nextId, w(n), x(M.keys), R(M.changeRatio);
  }
  return /* @__PURE__ */ h.jsx(Pm, {
    transition: i,
    children: /* @__PURE__ */ h.jsx(t, {
      "aria-label": n,
      style: {
        display: "inline-flex",
        ...y
      },
      className: p,
      ...g,
      children: /* @__PURE__ */ h.jsx(Xs, {
        mode: "popLayout",
        initial: u,
        children: v.map((M, _) => {
          const L = C[_], N = v.length <= 1 ? 0 : _ / (v.length - 1), D = (N - 0.5) * l * A, V = (N - 0.5) * o * A, H = c * 8 * A, B = _ === v.length - 1;
          return /* @__PURE__ */ h.jsx(zi.span, {
            "aria-hidden": "true",
            layout: "position",
            initial: {
              opacity: 0,
              x: D,
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
              x: D,
              y: V - H,
              filter: "blur(4px)",
              scale: 0.85
            },
            onAnimationComplete: B && d ? d : void 0,
            style: {
              display: "inline-block",
              whiteSpace: "pre"
            },
            children: M
          }, L);
        })
      })
    })
  });
}
function FA({ children: n, transition: t }) {
  const [i, l] = T.useState(null), [o, c] = T.useState(0), u = T.useCallback((d) => {
    l(d);
  }, []);
  return T.useEffect(() => {
    if (!i) return;
    const d = new ResizeObserver(([p]) => {
      c(Math.ceil(p.contentRect.width));
    });
    return d.observe(i), () => d.disconnect();
  }, [
    i
  ]), /* @__PURE__ */ h.jsx(zi.span, {
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
function Ks(n) {
  const { children: t, variant: i = "text", animation: l, as: o = "span", drift: { x: c = 15, y: u = 0 } = {}, trend: d = 0, stagger: p = 0.02, initial: y = !1, onComplete: g, autoSize: v = !0, className: b, style: j, ...w } = n, C = HA[l ?? (i === "number" ? "snappy" : "default")], x = {
    text: String(t ?? ""),
    Component: o,
    transition: C,
    stagger: p,
    animateInitial: y,
    onComplete: g,
    className: b,
    style: j,
    rest: w
  };
  let A;
  return i === "number" ? A = /* @__PURE__ */ h.jsx(PA, {
    ...x
  }) : i === "slots" ? A = /* @__PURE__ */ h.jsx(ZA, {
    ...x
  }) : A = /* @__PURE__ */ h.jsx(QA, {
    ...x,
    driftX: c,
    driftY: u,
    trend: d
  }), v ? /* @__PURE__ */ h.jsx(FA, {
    transition: C,
    children: A
  }) : A;
}
var Dr = db();
function IA(n, t) {
  if (n instanceof RegExp) return { keys: !1, pattern: n };
  var i, l, o, c, u = [], d = "", p = n.split("/");
  for (p[0] || p.shift(); o = p.shift(); )
    i = o[0], i === "*" ? (u.push(i), d += o[1] === "?" ? "(?:/(.*))?" : "/(.*)") : i === ":" ? (l = o.indexOf("?", 1), c = o.indexOf(".", 1), u.push(o.substring(1, ~l ? l : ~c ? c : o.length)), d += ~l && !~c ? "(?:/([^/]+?))?" : "/([^/]+?)", ~c && (d += (~l ? "?" : "") + "\\" + o.substring(c))) : d += "/" + o;
  return {
    keys: u,
    pattern: new RegExp("^" + d + (t ? "(?=$|/)" : "/?$"), "i")
  };
}
const JA = "popstate", Km = "pushState", Zm = "replaceState", WA = "hashchange", e2 = [
  JA,
  Km,
  Zm,
  WA
], tE = (n) => {
  for (const t of e2)
    addEventListener(t, n);
  return () => {
    for (const t of e2)
      removeEventListener(t, n);
  };
}, AS = (n, t) => y5.useSyncExternalStore(tE, n, t), n2 = () => location.search, eE = ({ ssrSearch: n } = {}) => AS(
  n2,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrSearch="?foo",
  // client hydrates with just <Router /> and reads from location.search
  n != null ? () => n : n2
), a2 = () => location.pathname, nE = ({ ssrPath: n } = {}) => AS(
  a2,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrPath="/foo",
  // client hydrates with just <Router /> and reads from location.pathname
  n != null ? () => n : a2
), aE = (n, { replace: t = !1, state: i = null } = {}) => history[t ? Zm : Km](i, "", n), iE = (n = {}) => [nE(n), aE], i2 = Symbol.for("wouter_v3");
if (typeof history < "u" && typeof window[i2] > "u") {
  for (const n of [Km, Zm]) {
    const t = history[n];
    history[n] = function() {
      const i = t.apply(this, arguments), l = new Event(n);
      return l.arguments = arguments, dispatchEvent(l), i;
    };
  }
  Object.defineProperty(window, i2, { value: !0 });
}
const sE = (n, t) => t.toLowerCase().indexOf(n.toLowerCase()) ? "~" + t : t.slice(n.length) || "/", ES = (n = "") => n === "/" ? "" : n, lE = (n, t) => n[0] === "~" ? n.slice(1) : ES(t) + n, rE = (n = "", t) => sE(s2(ES(n)), s2(t)), s2 = (n) => {
  try {
    return decodeURI(n);
  } catch {
    return n;
  }
}, oE = {
  hook: iE,
  searchHook: eE,
  parser: IA,
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
}, cE = T.createContext(oE), uE = () => T.useContext(cE), fE = {};
T.createContext(fE);
const dE = (n) => {
  const [t, i] = n.hook(n);
  return [
    rE(n.base, t),
    hb(
      (l, o) => n.aroundNav(i, lE(l, n.base), o)
    )
  ];
}, hE = T.forwardRef((n, t) => {
  const i = uE(), [l, o] = dE(i), {
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
  } = n, C = hb((A) => {
    A.ctrlKey || A.metaKey || A.altKey || A.shiftKey || A.button !== 0 || (d?.(A), A.defaultPrevented || (A.preventDefault(), o(u, n)));
  }), x = i.hrefs(
    u[0] === "~" ? u.slice(1) : i.base + u,
    i
    // pass router as a second argument for convinience
  );
  return p && T.isValidElement(y) ? T.cloneElement(y, { onClick: C, href: x }) : T.createElement("a", {
    ...w,
    onClick: C,
    href: x,
    // `className` can be a function to apply the class if this link is active
    className: g?.call ? g(l === u) : g,
    children: y,
    ref: t
  });
}), Qm = Object.freeze({
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
}), eu = Object.freeze({
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
}), mE = "_root_xunnd_1", l2 = "_glassBackground_xunnd_5", r2 = "_glassShadow_xunnd_25", pE = "_glassBorder_1y4zy_1", yE = "_muted_1y4zy_15", Sr = (n) => {
  const t = jt.c(2), {
    className: i,
    muted: l
  } = n, o = `${pE} ${l !== void 0 && l ? yE : ""} ${i === void 0 ? "" : i}`;
  let c;
  return t[0] !== o ? (c = /* @__PURE__ */ h.jsx("div", {
    className: o,
    "aria-hidden": "true"
  }), t[0] = o, t[1] = c) : c = t[1], c;
}, Fm = (n) => {
  const t = jt.c(16);
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
        className: l2,
        "aria-hidden": "true"
      }), /* @__PURE__ */ h.jsx("div", {
        className: r2,
        "aria-hidden": "true"
      }), /* @__PURE__ */ h.jsx(Sr, {})]
    }), t[7] = w) : w = t[7], w;
  }
  const y = `${mE} ${u}`;
  let g, v, b;
  t[8] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (g = /* @__PURE__ */ h.jsx("div", {
    className: l2,
    "aria-hidden": "true"
  }), v = /* @__PURE__ */ h.jsx("div", {
    className: r2,
    "aria-hidden": "true"
  }), b = /* @__PURE__ */ h.jsx(Sr, {}), t[8] = g, t[9] = v, t[10] = b) : (g = t[8], v = t[9], b = t[10]);
  let j;
  return t[11] !== i || t[12] !== l || t[13] !== p || t[14] !== y ? (j = /* @__PURE__ */ h.jsxs("div", {
    className: y,
    style: p,
    ...l,
    children: [g, v, b, i]
  }), t[11] = i, t[12] = l, t[13] = p, t[14] = y, t[15] = j) : j = t[15], j;
}, gE = (n) => /* @__PURE__ */ T.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ T.createElement("g", { id: "24_icon-fill/arrow-down" }, /* @__PURE__ */ T.createElement("path", { id: "Vector", d: "M11.2482 20.3129C11.6466 20.7682 12.3556 20.7682 12.7541 20.3129L17.5499 14.8314C18.1155 14.1849 17.6561 13.1732 16.797 13.1732H13.5011V5.67324C13.5011 4.84481 12.8295 4.17324 12.0011 4.17324C11.1727 4.17324 10.5011 4.84481 10.5011 5.67324V13.1732H7.20522C6.34614 13.1732 5.88678 14.1849 6.45229 14.8314L11.2482 20.3129Z", fill: "#3D3C3A" }))), vE = (n) => /* @__PURE__ */ T.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ T.createElement("g", { id: "24_icon-fill/arrow-up" }, /* @__PURE__ */ T.createElement("path", { id: "Vector", d: "M11.2483 3.85905C11.6467 3.40376 12.3558 3.40375 12.7542 3.85905L17.5501 9.3405C18.1158 9.98708 17.6563 10.9997 16.7971 10.9997H13.5012V18.4997C13.501 19.3279 12.8295 19.9997 12.0012 19.9997C11.1729 19.9997 10.5014 19.3279 10.5012 18.4997V10.9997H7.20535C6.34619 10.9997 5.88666 9.98708 6.45242 9.3405L11.2483 3.85905Z", fill: "#3D3C3A" }))), bE = (n) => /* @__PURE__ */ T.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ T.createElement("g", { id: "24_icon-fill/star" }, /* @__PURE__ */ T.createElement("path", { id: "Vector 234255911", d: "M11 16L15 12L11 8", stroke: "#3D3C3A", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }))), MS = "_redaction_dcm1f_1", _S = "_active_dcm1f_19", xE = "_sized_dcm1f_29", Qd = 1800, SE = 1.3, RS = /* @__PURE__ */ T.createContext(null), Im = () => T.useContext(RS);
let Hc = [];
const wE = () => {
  const n = Hc;
  Hc = [];
  const t = performance.now(), i = n.map((l) => {
    const o = l.getBoundingClientRect().top + window.scrollY;
    return -(((t - o * SE) % Qd + Qd) % Qd);
  });
  n.forEach((l, o) => {
    l.style.setProperty("--wave-phase", `${Math.round(i[o])}ms`);
  });
}, Jm = (n) => {
  n && (Hc.length === 0 && requestAnimationFrame(wE), Hc.push(n));
}, DS = (n) => n ? `${MS} ${_S}` : "", CE = 10, $i = (n) => {
  const t = jt.c(7), {
    active: i,
    width: l,
    children: o
  } = n, c = o != null && o !== "", u = l ?? (!c && i ? CE : void 0), d = i ? Jm : void 0, p = `
                ${MS}
                ${i ? _S : ""}
                ${u ? xE : ""}`;
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
}, Us = (n) => {
  const t = jt.c(6), {
    className: i,
    as: l,
    active: o
  } = n, c = i === void 0 ? "" : i, u = l === void 0 ? "div" : l, d = Im(), p = o ?? d ?? !0, y = DS(p), g = p ? Jm : void 0, v = `${c} ${y}`;
  let b;
  t[0] !== v ? (b = v.trim(), t[0] = v, t[1] = b) : b = t[1];
  let j;
  return t[2] !== u || t[3] !== g || t[4] !== b ? (j = /* @__PURE__ */ h.jsx(u, {
    ref: g,
    className: b
  }), t[2] = u, t[3] = g, t[4] = b, t[5] = j) : j = t[5], j;
}, NS = (n) => {
  const t = jt.c(3), {
    active: i,
    children: l
  } = n, o = !!(i === void 0 || i);
  let c;
  return t[0] !== l || t[1] !== o ? (c = /* @__PURE__ */ h.jsx(RS.Provider, {
    value: o,
    children: l
  }), t[0] = l, t[1] = o, t[2] = c) : c = t[2], c;
}, Wm = "_text_9l4iv_1", qc = "_icon_9l4iv_28", OS = "_title32_9l4iv_34", LS = "_title24_9l4iv_35", $S = "_title20_9l4iv_36", kS = "_body_9l4iv_56", BS = "_subtitle_9l4iv_63", VS = "_caption_9l4iv_70", TE = {
  text: Wm,
  icon: qc,
  title32: OS,
  title24: LS,
  title20: $S,
  body: kS,
  subtitle: BS,
  caption: VS
}, jE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  body: kS,
  caption: VS,
  default: TE,
  icon: qc,
  subtitle: BS,
  text: Wm,
  title20: $S,
  title24: LS,
  title32: OS
}, Symbol.toStringTag, { value: "Module" })), AE = {
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
  const t = jt.c(34);
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
  const j = v === void 0 ? "body" : v, w = Im(), C = i || "div", x = g !== void 0 ? !!g : !!w, A = g !== void 0 || w !== null, R = typeof g == "number" ? g : void 0;
  let M;
  t[12] !== x || t[13] !== u || t[14] !== A || t[15] !== R ? (M = A ? /* @__PURE__ */ h.jsx($i, {
    active: x,
    width: R,
    children: u
  }) : u, t[12] = x, t[13] = u, t[14] = A, t[15] = R, t[16] = M) : M = t[16];
  const _ = M, L = l?.direction === "down" ? gE : vE, N = `${Wm} ${jE[AE[j] || "body"]} ${d || ""}`, D = y || void 0, V = o || void 0, H = x || void 0;
  let B;
  t[17] !== L || t[18] !== l?.direction ? (B = l?.direction && /* @__PURE__ */ h.jsx(L, {
    className: qc
  }), t[17] = L, t[18] = l?.direction, t[19] = B) : B = t[19];
  let U;
  t[20] !== c ? (U = c && /* @__PURE__ */ h.jsx(bE, {
    className: qc
  }), t[20] = c, t[21] = U) : U = t[21];
  let I;
  return t[22] !== C || t[23] !== _ || t[24] !== p || t[25] !== N || t[26] !== D || t[27] !== V || t[28] !== H || t[29] !== B || t[30] !== U || t[31] !== j || t[32] !== b ? (I = /* @__PURE__ */ h.jsxs(C, {
    ...p,
    className: N,
    "data-variant": j,
    "data-weight": b,
    "data-rounded": D,
    "data-caps": V,
    "data-skeleton": H,
    children: [B, _, U]
  }), t[22] = C, t[23] = _, t[24] = p, t[25] = N, t[26] = D, t[27] = V, t[28] = H, t[29] = B, t[30] = U, t[31] = j, t[32] = b, t[33] = I) : I = t[33], I;
}, tp = {
  skin: "apple",
  isApple: !0,
  isMaterial: !1,
  setSkin: () => {
  }
}, zS = /* @__PURE__ */ T.createContext(tp), Nr = () => T.useContext(zS) || tp;
function EE(n) {
  const t = jt.c(3), {
    children: i
  } = n;
  let l;
  t[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (l = [], t[0] = l) : l = t[0], T.useEffect(ME, l);
  let o;
  return t[1] !== i ? (o = /* @__PURE__ */ h.jsx(zS.Provider, {
    value: tp,
    children: i
  }), t[1] = i, t[2] = o) : o = t[2], o;
}
function ME() {
  document.body.classList.remove("material", "skin-switcher-active"), document.body.classList.add("apple");
}
const ep = "_button_1d7yf_1", US = "_regular_1d7yf_21", HS = "_overlay_1d7yf_35", qS = "_secondary_1d7yf_42", YS = "_accent_1d7yf_47", np = "_icon_1d7yf_53", ap = "_label_1d7yf_57", ip = "_content_1d7yf_61", _E = {
  button: ep,
  regular: US,
  overlay: HS,
  secondary: qS,
  accent: YS,
  icon: np,
  label: ap,
  content: ip
}, RE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accent: YS,
  button: ep,
  content: ip,
  default: _E,
  icon: np,
  label: ap,
  overlay: HS,
  regular: US,
  secondary: qS
}, Symbol.toStringTag, { value: "Module" })), o2 = (n) => {
  const t = jt.c(16), {
    children: i,
    onClick: l,
    variant: o,
    ariaLabel: c,
    title: u
  } = n, d = o === void 0 ? "regular" : o, p = typeof i == "string", y = d === "regular" || d === "overlay", g = `${ep} ${RE[d]} ${p ? ap : np}`;
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
  let C;
  t[7] !== w ? (C = /* @__PURE__ */ h.jsx("span", {
    className: ip,
    children: w
  }), t[7] = w, t[8] = C) : C = t[8];
  let x;
  return t[9] !== c || t[10] !== l || t[11] !== g || t[12] !== j || t[13] !== C || t[14] !== u ? (x = /* @__PURE__ */ h.jsxs(Lh, {
    type: "button",
    className: g,
    onClick: l,
    "aria-label": c,
    title: u,
    whileTap: v,
    transition: b,
    children: [j, C]
  }), t[9] = c, t[10] = l, t[11] = g, t[12] = j, t[13] = C, t[14] = u, t[15] = x) : x = t[15], x;
}, DE = /* @__PURE__ */ T.createContext(!1), NE = "_root_125i3_1", c2 = "_side_125i3_9", OE = "_trailing_125i3_18", LE = "_middle_125i3_22", $E = "_middleOverlay_125i3_31", kE = "_titlePill_125i3_35", BE = "_titleContent_125i3_45", VE = "_inModal_125i3_59", zE = (n) => {
  const t = jt.c(32), {
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
  } = n, C = b === void 0 ? !1 : b, x = j === void 0 ? !1 : j, {
    isApple: A
  } = Nr(), R = T.useContext(DE), M = C ? "overlay" : "regular";
  let _;
  t[0] !== w ? (_ = /* @__PURE__ */ h.jsx(pt, {
    variant: "body",
    weight: "semibold",
    children: w
  }), t[0] = w, t[1] = _) : _ = t[1];
  const L = _, N = `${NE} ${R ? VE : ""}`;
  let D;
  t[2] !== M || t[3] !== i || t[4] !== c || t[5] !== u || t[6] !== o || t[7] !== l ? (D = i != null && /* @__PURE__ */ h.jsx(o2, {
    onClick: l,
    variant: o ?? M,
    ariaLabel: c,
    title: u,
    children: i
  }), t[2] = M, t[3] = i, t[4] = c, t[5] = u, t[6] = o, t[7] = l, t[8] = D) : D = t[8];
  let V;
  t[9] !== D ? (V = /* @__PURE__ */ h.jsx("div", {
    className: c2,
    children: D
  }), t[9] = D, t[10] = V) : V = t[10];
  let H;
  t[11] !== M || t[12] !== p || t[13] !== d || t[14] !== g || t[15] !== v || t[16] !== y ? (H = d != null && /* @__PURE__ */ h.jsx(o2, {
    onClick: p,
    variant: y ?? M,
    ariaLabel: g,
    title: v,
    children: d
  }), t[11] = M, t[12] = p, t[13] = d, t[14] = g, t[15] = v, t[16] = y, t[17] = H) : H = t[17];
  let B;
  t[18] !== H ? (B = /* @__PURE__ */ h.jsx("div", {
    className: `${c2} ${OE}`,
    children: H
  }), t[18] = H, t[19] = B) : B = t[19];
  const U = `${LE} ${C ? $E : ""}`;
  let I;
  t[20] !== A || t[21] !== L || t[22] !== x ? (I = A && x ? /* @__PURE__ */ h.jsxs("div", {
    className: kE,
    children: [/* @__PURE__ */ h.jsx(Fm, {}), /* @__PURE__ */ h.jsx("span", {
      className: BE,
      children: L
    })]
  }) : L, t[20] = A, t[21] = L, t[22] = x, t[23] = I) : I = t[23];
  let P;
  t[24] !== I || t[25] !== U ? (P = /* @__PURE__ */ h.jsx("div", {
    className: U,
    children: I
  }), t[24] = I, t[25] = U, t[26] = P) : P = t[26];
  let it;
  return t[27] !== P || t[28] !== N || t[29] !== V || t[30] !== B ? (it = /* @__PURE__ */ h.jsxs("div", {
    className: N,
    "data-modal-drag": "",
    children: [V, B, P]
  }), t[27] = P, t[28] = N, t[29] = V, t[30] = B, t[31] = it) : it = t[31], it;
}, UE = /* @__PURE__ */ T.createContext({
  inDetailPane: !1
}), HE = () => T.useContext(UE), ie = () => {
}, oc = () => ({
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
}), qE = {
  initData: "",
  themeParams: {},
  viewportHeight: 0,
  BackButton: oc(),
  SettingsButton: oc(),
  MainButton: oc(),
  SecondaryButton: oc(),
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
}, Ta = globalThis.Telegram?.WebApp ?? qE;
function YE(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Fd = { exports: {} }, Id, u2;
function PE() {
  if (u2) return Id;
  u2 = 1;
  var n = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Id = n, Id;
}
var Jd, f2;
function GE() {
  if (f2) return Jd;
  f2 = 1;
  var n = /* @__PURE__ */ PE();
  function t() {
  }
  function i() {
  }
  return i.resetWarningCache = t, Jd = function() {
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
  }, Jd;
}
var d2;
function XE() {
  return d2 || (d2 = 1, Fd.exports = /* @__PURE__ */ GE()()), Fd.exports;
}
var KE = /* @__PURE__ */ XE();
const kn = /* @__PURE__ */ YE(KE);
kn.func;
const sp = "_button_124dm_1", PS = "_filled_124dm_9", GS = "_tinted_124dm_14", XS = "_plain_124dm_19", KS = "_outlined_124dm_24", ZS = "_gray_124dm_28", QS = "_disabled_124dm_33", lp = "_skeleton_124dm_38", FS = "_wave_124dm_1", ZE = {
  button: sp,
  filled: PS,
  tinted: GS,
  plain: XS,
  outlined: KS,
  gray: ZS,
  disabled: QS,
  skeleton: lp,
  wave: FS
}, QE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  button: sp,
  default: ZE,
  disabled: QS,
  filled: PS,
  gray: ZS,
  outlined: KS,
  plain: XS,
  skeleton: lp,
  tinted: GS,
  wave: FS
}, Symbol.toStringTag, { value: "Module" })), Wa = (n) => {
  const t = jt.c(34);
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
  } = Nr(), g = !!Im(), v = DS(g);
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
  const C = w;
  let x;
  t[15] !== i ? (x = /* @__PURE__ */ h.jsx(pt, {
    variant: "body",
    weight: "semibold",
    children: i
  }), t[15] = i, t[16] = x) : x = t[16];
  const A = x, R = g ? Jm : void 0, M = `${sp} ${QE[u]} ${g ? lp : ""} ${v}`;
  let _;
  t[17] !== y || t[18] !== g ? (_ = y && !g && {
    whileTap: {
      scale: 1.02
    }
  }, t[17] = y, t[18] = g, t[19] = _) : _ = t[19];
  let L;
  t[20] !== g || t[21] !== u ? (L = u === "filled" && !g && /* @__PURE__ */ h.jsx(Sr, {}), t[20] = g, t[21] = u, t[22] = L) : L = t[22];
  let N;
  t[23] !== A || t[24] !== g ? (N = g ? /* @__PURE__ */ h.jsx(NS, {
    active: !1,
    children: A
  }) : A, t[23] = A, t[24] = g, t[25] = N) : N = t[25];
  let D;
  return t[26] !== C || t[27] !== l || t[28] !== L || t[29] !== N || t[30] !== R || t[31] !== M || t[32] !== _ ? (D = /* @__PURE__ */ h.jsxs(Ca, {
    ref: R,
    ..._,
    ...C,
    ...l,
    className: l.className ? `${M} ${l.className}` : M,
    children: [L, N]
  }), t[26] = C, t[27] = l, t[28] = L, t[29] = N, t[30] = R, t[31] = M, t[32] = _, t[33] = D) : D = t[33], D;
};
function IS(n) {
  var t, i, l = "";
  if (typeof n == "string" || typeof n == "number") l += n;
  else if (typeof n == "object") if (Array.isArray(n)) {
    var o = n.length;
    for (t = 0; t < o; t++) n[t] && (i = IS(n[t])) && (l && (l += " "), l += i);
  } else for (i in n) n[i] && (l && (l += " "), l += i);
  return l;
}
function FE() {
  for (var n, t, i = 0, l = "", o = arguments.length; i < o; i++) (n = arguments[i]) && (t = IS(n)) && (l && (l += " "), l += t);
  return l;
}
const IE = (...n) => FE(...n), rr = {
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
}, JE = {
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
}, JS = "_overlay_qo6yx_1", WS = "_opacity_qo6yx_2", rp = "_fadeIn_qo6yx_6", op = "_fadeOut_qo6yx_10", WE = {
  overlay: JS,
  opacity: WS,
  fadeIn: rp,
  fadeOut: op,
  "overlay-out": "_overlay-out_qo6yx_1",
  "opacity-out": "_opacity-out_qo6yx_1"
}, t8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: WE,
  fadeIn: rp,
  fadeOut: op,
  opacity: WS,
  overlay: JS
}, Symbol.toStringTag, { value: "Module" })), e8 = typeof window < "u" && "ontouchstart" in window, n8 = 250;
function a8(n) {
  const t = jt.c(21);
  let i;
  t[0] !== n ? (i = n === void 0 ? {} : n, t[0] = n, t[1] = i) : i = t[1];
  const {
    onTap: l,
    onTapOut: o,
    mode: c,
    disabled: u
  } = i, d = t8[c === void 0 ? "overlay" : c], [p, y] = T.useState(!1);
  let g;
  t[2] !== d ? (g = [d], t[2] = d, t[3] = g) : g = t[3];
  const [v, b] = T.useState(g), j = T.useRef();
  let w;
  t[4] !== d || t[5] !== o ? (w = () => {
    y(!1), b([d, op]), o?.(), j.current = window.setTimeout(() => {
      b([d]);
    }, n8);
  }, t[4] = d, t[5] = o, t[6] = w) : w = t[6];
  const C = w;
  let x;
  t[7] !== d || t[8] !== l ? (x = (D) => {
    clearTimeout(j.current), y(!0), b([d, rp]), l?.(D);
  }, t[7] = d, t[8] = l, t[9] = x) : x = t[9];
  const A = x;
  let R, M;
  t[10] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (R = () => () => clearTimeout(j.current), M = [], t[10] = R, t[11] = M) : (R = t[10], M = t[11]), T.useEffect(R, M);
  let _;
  t[12] !== u || t[13] !== A || t[14] !== C || t[15] !== p ? (_ = e8 ? {
    onTouchStart: (D) => {
      u || (D.touches.length === 1 ? A({
        target: D.currentTarget,
        clientX: D.touches[0].clientX,
        clientY: D.touches[0].clientY
      }) : C());
    },
    onTouchEnd: () => {
      u || p && C();
    },
    onPointerMove: (D) => {
      p && D.pointerType === "touch" && (D.movementY !== 0 || D.movementX !== 0) && C();
    },
    onTouchCancel: () => {
      p && C();
    }
  } : {
    onMouseLeave: () => {
      p && C();
    },
    onMouseDown: (D) => {
      u || A({
        target: D.currentTarget,
        clientX: D.clientX,
        clientY: D.clientY
      });
    },
    onMouseUp: () => {
      u || p && C();
    },
    onContextMenu: () => {
      p && C();
    }
  }, t[12] = u, t[13] = A, t[14] = C, t[15] = p, t[16] = _) : _ = t[16];
  const L = _;
  let N;
  return t[17] !== L || t[18] !== p || t[19] !== v ? (N = [p, L, v], t[17] = L, t[18] = p, t[19] = v, t[20] = N) : N = t[20], N;
}
const i8 = "_root_1oiyj_1", s8 = "_fade_1oiyj_22", l8 = "_ripples_1oiyj_30", r8 = "_ripple_1oiyj_30", o8 = "_tapped_1oiyj_47", cc = (...n) => n.filter(Boolean).join(" "), c8 = (n, t) => {
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
}, an = ({
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
  } = Nr(), [p, y] = T.useState({}), [g, v, b] = a8({
    mode: l,
    disabled: o,
    onTap: ({
      target: C,
      clientX: x,
      clientY: A
    }) => {
      if (!d || !C) return;
      const {
        x: R,
        y: M,
        width: _,
        height: L
      } = C.getBoundingClientRect(), N = Math.max(_ * 2, L * 2);
      y((D) => ({
        ...D,
        [`${performance.now()}`]: [x - R - N / 2, A - M - N / 2, N]
      }));
    }
  }), j = l === "opacity", w = c8(c, v);
  return /* @__PURE__ */ h.jsxs(n, {
    ...w,
    disabled: o || void 0,
    className: cc(i8, i, j && cc(...b)),
    children: [t, u && !j && /* @__PURE__ */ h.jsx("div", {
      className: cc(s8, ...b)
    }), d && /* @__PURE__ */ h.jsx("div", {
      className: l8,
      children: Object.entries(p).map(([C, x]) => /* @__PURE__ */ h.jsx("span", {
        className: cc(r8, g && o8),
        style: {
          left: x[0],
          top: x[1],
          width: x[2],
          height: x[2]
        },
        onAnimationEnd: () => {
          g || y((A) => {
            const R = {
              ...A
            };
            return delete R[C], R;
          });
        }
      }, C))
    })]
  });
}, u8 = "_label_1w5sq_1", f8 = "_accent_1w5sq_6", d8 = "_description_1w5sq_10", h2 = "_caption_1w5sq_14", h8 = (n) => {
  const t = jt.c(15), {
    type: i,
    title: l,
    description: o,
    caption: c,
    bold: u
  } = n, d = u ? "medium" : "regular", p = `${u8} ${i === "Accent" ? f8 : ""}`;
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
    className: c ? d8 : h2,
    children: /* @__PURE__ */ h.jsx(pt, {
      variant: c ? "subheadline1" : "subheadline2",
      weight: "regular",
      children: o
    })
  }), t[6] = c, t[7] = o, t[8] = v) : v = t[8];
  let b;
  t[9] !== c ? (b = c && /* @__PURE__ */ h.jsx("div", {
    className: h2,
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
}, t3 = "_chevron_en74z_1", e3 = "_dropdown_en74z_8", cp = "_colorpicker_en74z_12", up = "_picker_en74z_63", m8 = {
  chevron: t3,
  dropdown: e3,
  colorpicker: cp,
  picker: up
}, m2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  chevron: t3,
  colorpicker: cp,
  default: m8,
  dropdown: e3,
  picker: up
}, Symbol.toStringTag, { value: "Module" })), p8 = (n) => {
  const t = jt.c(21), {
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
    let R;
    return t[0] !== o ? (R = /* @__PURE__ */ h.jsx("div", {
      className: up,
      children: /* @__PURE__ */ h.jsx(pt, {
        variant: "body",
        weight: "regular",
        children: o
      })
    }), t[0] = o, t[1] = R) : R = t[1], R;
  }
  if (i === "ColorPicker") {
    const R = p || v;
    let M;
    t[2] !== R || t[3] !== d || t[4] !== v || t[5] !== u || t[6] !== c ? (M = /* @__PURE__ */ h.jsx("input", {
      ref: d,
      type: "color",
      value: c,
      onChange: u,
      name: v,
      id: R
    }), t[2] = R, t[3] = d, t[4] = v, t[5] = u, t[6] = c, t[7] = M) : M = t[7];
    let _;
    t[8] !== R || t[9] !== b || t[10] !== c ? (_ = b && /* @__PURE__ */ h.jsx("label", {
      htmlFor: R,
      children: /* @__PURE__ */ h.jsx(pt, {
        variant: "body",
        weight: "regular",
        children: c
      })
    }), t[8] = R, t[9] = b, t[10] = c, t[11] = _) : _ = t[11];
    let L;
    return t[12] !== M || t[13] !== _ ? (L = /* @__PURE__ */ h.jsxs("div", {
      className: cp,
      children: [M, _]
    }), t[12] = M, t[13] = _, t[14] = L) : L = t[14], L;
  }
  const j = m2[i.toLowerCase()], w = m2[l];
  let C;
  t[15] !== j || t[16] !== w ? (C = [j, w].filter(Boolean), t[15] = j, t[16] = w, t[17] = C) : C = t[17];
  const x = C.join(" ");
  let A;
  return t[18] !== o || t[19] !== x ? (A = /* @__PURE__ */ h.jsx("div", {
    className: x,
    children: o
  }), t[18] = o, t[19] = x, t[20] = A) : A = t[20], A;
}, y8 = (n) => /* @__PURE__ */ T.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ T.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ T.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5ZM15.1016 9.01953C14.7891 8.70711 14.2821 8.70711 13.9697 9.01953L12.001 10.9873L10.0342 9.02051C9.72176 8.70809 9.21574 8.70809 8.90332 9.02051C8.5909 9.33293 8.5909 9.83895 8.90332 10.1514L10.8701 12.1191L9.02051 13.9697C8.70809 14.2821 8.70809 14.7882 9.02051 15.1006C9.33293 15.413 9.83895 15.413 10.1514 15.1006L12.001 13.25L13.8525 15.1016C14.165 15.414 14.672 15.414 14.9844 15.1016C15.2968 14.7891 15.2968 14.2821 14.9844 13.9697L13.1328 12.1182L15.1016 10.1514C15.414 9.83895 15.414 9.33195 15.1016 9.01953Z", fill: "#3D3C3A" }))), g8 = "_root_9aal5_1", v8 = "_input_9aal5_5", b8 = "_inputWithClearButton_9aal5_25", x8 = "_clearButtonIcon_9aal5_29", S8 = "_empty_9aal5_49", w8 = "_icon_9aal5_61", C8 = /* @__PURE__ */ T.forwardRef((n, t) => {
  const i = jt.c(24);
  let l, o, c, u, d, p;
  i[0] !== n ? ({
    label: l,
    value: p,
    onChange: o,
    onClear: c,
    ...u
  } = n, d = (R) => {
    o(R.target.value);
  }, i[0] = n, i[1] = l, i[2] = o, i[3] = c, i[4] = u, i[5] = d, i[6] = p) : (l = i[1], o = i[2], c = i[3], u = i[4], d = i[5], p = i[6]);
  const y = d, g = !p && S8;
  let v;
  i[7] !== g ? (v = [g8, g].filter(Boolean), i[7] = g, i[8] = v) : v = i[8];
  const b = v.join(" "), j = `${v8} ${c ? b8 : ""}`, w = !o;
  let C;
  i[9] !== y || i[10] !== l || i[11] !== t || i[12] !== u || i[13] !== j || i[14] !== w || i[15] !== p ? (C = /* @__PURE__ */ h.jsx("input", {
    "aria-label": l,
    onChange: y,
    type: "text",
    className: j,
    placeholder: l,
    value: p,
    readOnly: w,
    ref: t,
    ...u
  }), i[9] = y, i[10] = l, i[11] = t, i[12] = u, i[13] = j, i[14] = w, i[15] = p, i[16] = C) : C = i[16];
  let x;
  i[17] !== l || i[18] !== c ? (x = c && /* @__PURE__ */ h.jsx("button", {
    type: "button",
    className: [w8, x8].filter(Boolean).join(" "),
    onClick: c,
    "aria-label": `Clear ${l}`,
    children: /* @__PURE__ */ h.jsx(y8, {})
  }), i[17] = l, i[18] = c, i[19] = x) : x = i[19];
  let A;
  return i[20] !== b || i[21] !== C || i[22] !== x ? (A = /* @__PURE__ */ h.jsxs(pt, {
    variant: "body",
    weight: "regular",
    className: b,
    children: [C, x]
  }), i[20] = b, i[21] = C, i[22] = x, i[23] = A) : A = i[23], A;
}), p2 = "_root_1aqfj_1";
function T8(n) {
  const t = jt.c(15), {
    value: i,
    defaultValue: l,
    onChange: o,
    disabled: c,
    className: u
  } = n, d = l === void 0 ? !1 : l, p = c === void 0 ? !1 : c, y = i !== void 0, [g, v] = T.useState(d), b = y ? i : g;
  let j;
  t[0] !== o ? (j = (D) => {
    o && o(D);
  }, t[0] = o, t[1] = j) : j = t[1];
  const w = j;
  let C;
  t[2] !== b || t[3] !== w || t[4] !== y ? (C = () => {
    if (Ta.HapticFeedback.selectionChanged(), y) {
      w(!b);
      return;
    }
    v((D) => {
      const V = !D;
      return w(V), V;
    });
  }, t[2] = b, t[3] = w, t[4] = y, t[5] = C) : C = t[5];
  const x = C;
  let A;
  t[6] !== p || t[7] !== x ? (A = (D) => {
    D.stopPropagation(), !p && x();
  }, t[6] = p, t[7] = x, t[8] = A) : A = t[8];
  const R = A, M = u ? `${p2} ${u}` : p2, _ = p || void 0, L = p || void 0;
  let N;
  return t[9] !== b || t[10] !== M || t[11] !== R || t[12] !== _ || t[13] !== L ? (N = /* @__PURE__ */ h.jsx("div", {
    className: M,
    "data-state": b,
    "data-disabled": _,
    onClick: R,
    role: "switch",
    "aria-checked": b,
    "aria-disabled": L
  }), t[9] = b, t[10] = M, t[11] = R, t[12] = _, t[13] = L, t[14] = N) : N = t[14], N;
}
const j8 = (n) => {
  const t = jt.c(29);
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
  const y = u === void 0 ? !1 : u, g = d === void 0 ? !1 : d, v = p !== void 0, [b, j] = T.useState(y), w = v ? p : b;
  let C;
  t[8] !== l ? (C = (D) => {
    l && l(D);
  }, t[8] = l, t[9] = C) : C = t[9];
  const x = C;
  let A;
  t[10] !== x || t[11] !== v ? (A = (D) => {
    v || j(D), x(D);
  }, t[10] = x, t[11] = v, t[12] = A) : A = t[12];
  const R = A;
  let M;
  t[13] !== w || t[14] !== g || t[15] !== x || t[16] !== R || t[17] !== v ? (M = () => {
    if (!g) {
      if (Ta.HapticFeedback.selectionChanged(), v) {
        R(!w);
        return;
      }
      j((D) => {
        const V = !D;
        return x(V), V;
      });
    }
  }, t[13] = w, t[14] = g, t[15] = x, t[16] = R, t[17] = v, t[18] = M) : M = t[18];
  const _ = M;
  let L;
  t[19] !== w || t[20] !== g || t[21] !== R ? (L = /* @__PURE__ */ h.jsx(xa.Part, {
    type: "Switch",
    children: /* @__PURE__ */ h.jsx(T8, {
      value: w,
      onChange: R,
      disabled: g
    })
  }), t[19] = w, t[20] = g, t[21] = R, t[22] = L) : L = t[22];
  let N;
  return t[23] !== i || t[24] !== _ || t[25] !== o || t[26] !== c || t[27] !== L ? (N = /* @__PURE__ */ h.jsx(xa, {
    start: c,
    end: L,
    onClick: _,
    ...o,
    children: i
  }), t[23] = i, t[24] = _, t[25] = o, t[26] = c, t[27] = L, t[28] = N) : N = t[28], N;
}, y2 = "_root_146xt_10", A8 = "_start_146xt_32", E8 = "_image_146xt_37", M8 = "_icon_146xt_45", _8 = "_body_146xt_57", R8 = "_end_146xt_65", D8 = "_caption_146xt_76", N8 = "_label_146xt_80", O8 = (n) => {
  const t = jt.c(28);
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
    className: A8,
    children: u
  }), t[8] = u, t[9] = v) : v = t[9];
  let b;
  t[10] !== i ? (b = /* @__PURE__ */ h.jsx("div", {
    className: _8,
    children: i
  }), t[10] = i, t[11] = b) : b = t[11];
  let j;
  t[12] !== l ? (j = l && /* @__PURE__ */ h.jsx("div", {
    className: R8,
    children: l
  }), t[12] = l, t[13] = j) : j = t[13];
  let w;
  t[14] !== v || t[15] !== b || t[16] !== j ? (w = /* @__PURE__ */ h.jsxs(h.Fragment, {
    children: [v, b, j]
  }), t[14] = v, t[15] = b, t[16] = j, t[17] = w) : w = t[17];
  const C = w;
  if (!g) {
    let A;
    return t[18] !== y || t[19] !== C || t[20] !== o || t[21] !== c ? (A = /* @__PURE__ */ h.jsx(y, {
      className: y2,
      onClick: o,
      ...c,
      children: C
    }), t[18] = y, t[19] = C, t[20] = o, t[21] = c, t[22] = A) : A = t[22], A;
  }
  let x;
  return t[23] !== y || t[24] !== C || t[25] !== o || t[26] !== c ? (x = /* @__PURE__ */ h.jsx(an, {
    as: y,
    className: y2,
    onClick: o,
    ...c,
    children: C
  }), t[23] = y, t[24] = C, t[25] = o, t[26] = c, t[27] = x) : x = t[27], x;
}, L8 = (n) => {
  const t = jt.c(6), {
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
        className: E8
      }), t[0] = c, t[1] = y) : y = t[1], d = y;
      break t;
    }
    case "Icon": {
      let y;
      t[2] !== u ? (y = /* @__PURE__ */ h.jsx("div", {
        className: M8,
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
}, $8 = (n) => {
  const t = jt.c(7), {
    label: i,
    caption: l
  } = n;
  let o;
  t[0] !== i ? (o = /* @__PURE__ */ h.jsx("div", {
    className: N8,
    children: /* @__PURE__ */ h.jsx(pt, {
      variant: "body",
      weight: "regular",
      children: i
    })
  }), t[0] = i, t[1] = o) : o = t[1];
  let c;
  t[2] !== l ? (c = l && /* @__PURE__ */ h.jsx("div", {
    className: D8,
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
}, xa = Object.assign(O8, {
  Start: L8,
  End: $8,
  Part: p8,
  Text: h8,
  Editable: C8,
  Switch: j8
});
eu.section;
Qm[16];
function k8(n, t, i) {
  const l = jt.c(8);
  let o;
  l[0] !== i ? (o = {}, l[0] = i, l[1] = o) : o = l[1];
  const {
    enabled: c
  } = o, u = c === void 0 ? !0 : c, d = T.useRef(t);
  let p;
  l[2] !== t ? (p = () => {
    d.current = t;
  }, l[2] = t, l[3] = p) : p = l[3], T.useEffect(p);
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
  }, g = [n, u], l[4] = u, l[5] = n, l[6] = y, l[7] = g) : (y = l[6], g = l[7]), T.useEffect(y, g);
}
const On = (n, t, i) => Math.min(Math.max(n, t), i), B8 = (n, t) => {
  if (n === t) return !0;
  if (!n || !t) return !1;
  const i = Object.keys(n);
  if (i.length !== Object.keys(t).length) return !1;
  for (const l of i) if (n[l] !== t[l]) return !1;
  return !0;
};
function V8(n) {
  const t = jt.c(32), {
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
  const g = y, v = p === void 0 ? B8 : p, [b, j] = T.useState(c), [w, C] = T.useState(!1), x = T.useRef(null);
  let A;
  t[2] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (A = () => {
    C(!1), x.current = null;
  }, t[2] = A) : A = t[2];
  const R = A;
  let M;
  t[3] !== u || t[4] !== o || t[5] !== i || t[6] !== w || t[7] !== l ? (M = () => {
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
    })), C(!0);
  }, t[3] = u, t[4] = o, t[5] = i, t[6] = w, t[7] = l, t[8] = M) : M = t[8];
  let _;
  t[9] !== u || t[10] !== o || t[11] !== g || t[12] !== i || t[13] !== w || t[14] !== l ? (_ = [i, w, l, o, u, ...g], t[9] = u, t[10] = o, t[11] = g, t[12] = i, t[13] = w, t[14] = l, t[15] = _) : _ = t[15], T.useLayoutEffect(M, _);
  let L;
  t[16] !== u || t[17] !== v || t[18] !== i || t[19] !== w || t[20] !== l ? (L = () => {
    if (!i || !w)
      return;
    let V = null;
    const H = () => {
      if (V = null, !l.current || !x.current)
        return;
      const U = l.current.getBoundingClientRect(), I = u(U, x.current);
      j((P) => v(P, I) ? P : I);
    }, B = () => {
      V === null && (V = requestAnimationFrame(H));
    };
    return window.addEventListener("scroll", B, !0), window.addEventListener("resize", B), () => {
      V !== null && cancelAnimationFrame(V), window.removeEventListener("scroll", B, !0), window.removeEventListener("resize", B);
    };
  }, t[16] = u, t[17] = v, t[18] = i, t[19] = w, t[20] = l, t[21] = L) : L = t[21];
  let N;
  t[22] !== u || t[23] !== g || t[24] !== v || t[25] !== i || t[26] !== w || t[27] !== l ? (N = [i, w, l, u, v, ...g], t[22] = u, t[23] = g, t[24] = v, t[25] = i, t[26] = w, t[27] = l, t[28] = N) : N = t[28], T.useEffect(L, N);
  let D;
  return t[29] !== w || t[30] !== b ? (D = {
    position: b,
    isPositioned: w,
    resetPosition: R
  }, t[29] = w, t[30] = b, t[31] = D) : D = t[31], D;
}
const z8 = (n, t, ...i) => {
  const l = jt.c(6), o = i, c = T.useRef(t);
  let u;
  l[0] !== t ? (u = () => {
    c.current = t;
  }, l[0] = t, l[1] = u) : u = l[1], T.useEffect(u);
  let d, p;
  l[2] !== n || l[3] !== o ? (d = () => {
    if (!n)
      return;
    const y = (g) => {
      o.every((v) => !v.current || !v.current.contains(g.target)) && c.current();
    };
    return document.addEventListener("mousedown", y), () => document.removeEventListener("mousedown", y);
  }, p = [n, ...o], l[2] = n, l[3] = o, l[4] = d, l[5] = p) : (d = l[4], p = l[5]), T.useEffect(d, p);
}, U8 = /* @__PURE__ */ T.createContext({
  colorScheme: "light",
  setColorScheme: () => {
  },
  toggleColorScheme: () => {
  }
}), H8 = ["light", "dark"], Hh = (n) => H8.includes(n), qh = () => {
  if (typeof window > "u" || typeof document > "u")
    return null;
  const n = window.getComputedStyle(document.documentElement).getPropertyValue("--tg-color-scheme").trim();
  return Hh(n) ? n : null;
}, n3 = () => typeof window > "u" || !window.matchMedia ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light", q8 = () => qh() ?? n3(), Y8 = typeof window > "u" ? T.useEffect : T.useLayoutEffect, P8 = (n) => {
  const t = jt.c(20), {
    children: i,
    defaultColorScheme: l,
    onColorSchemeChange: o
  } = n, [c, u] = T.useState(q8);
  let d;
  t[0] !== l ? (d = () => Hh(l) ? l : null, t[0] = l, t[1] = d) : d = t[1];
  const [p, y] = T.useState(d), g = p ?? c;
  let v;
  t[2] !== g || t[3] !== o ? (v = (N) => {
    const D = typeof N == "function" ? N(g) : N;
    Hh(D) && (y(D), o?.(D));
  }, t[2] = g, t[3] = o, t[4] = v) : v = t[4];
  const b = v;
  let j;
  t[5] !== g || t[6] !== b ? (j = () => {
    b(g === "dark" ? "light" : "dark");
  }, t[5] = g, t[6] = b, t[7] = j) : j = t[7];
  const w = j;
  let C, x;
  t[8] !== g ? (C = () => {
    document.documentElement.dataset.colorScheme = g, document.body.dataset.colorScheme = g;
  }, x = [g], t[8] = g, t[9] = C, t[10] = x) : (C = t[9], x = t[10]), Y8(C, x);
  let A, R;
  t[11] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (A = () => {
    const N = () => {
      const H = qh();
      if (H) {
        u(H);
        return;
      }
      u(n3());
    }, D = (H) => {
      qh() || u(H.matches ? "dark" : "light");
    };
    N();
    const V = window.matchMedia("(prefers-color-scheme: dark)");
    return Ta.onEvent("themeChanged", N), V.addEventListener("change", D), () => {
      Ta.offEvent("themeChanged", N), V.removeEventListener("change", D);
    };
  }, R = [], t[11] = A, t[12] = R) : (A = t[11], R = t[12]), T.useEffect(A, R);
  let M;
  t[13] !== g || t[14] !== b || t[15] !== w ? (M = {
    colorScheme: g,
    setColorScheme: b,
    toggleColorScheme: w
  }, t[13] = g, t[14] = b, t[15] = w, t[16] = M) : M = t[16];
  const _ = M;
  let L;
  return t[17] !== i || t[18] !== _ ? (L = /* @__PURE__ */ h.jsx(U8.Provider, {
    value: _,
    children: i
  }), t[17] = i, t[18] = _, t[19] = L) : L = t[19], L;
}, G8 = /* @__PURE__ */ T.forwardRef((n, t) => {
  const i = jt.c(11);
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
  return i[5] !== l || i[6] !== d || i[7] !== o || i[8] !== t || i[9] !== u ? (p = /* @__PURE__ */ h.jsx(hE, {
    ref: t,
    href: u,
    onClick: d,
    ...o,
    children: l
  }), i[5] = l, i[6] = d, i[7] = o, i[8] = t, i[9] = u, i[10] = p) : p = i[10], p;
});
G8.displayName = "TransitionLink";
const a3 = ({
  children: n
}) => n;
a3.isModalPage = !0;
a3.propTypes = {
  id: kn.string.isRequired,
  children: kn.node
};
eu.modal;
Qm[16];
const i3 = (n) => {
  const t = jt.c(2), {
    children: i
  } = n;
  let l;
  return t[0] !== i ? (l = /* @__PURE__ */ h.jsx(Lj, {
    features: pA,
    strict: !0,
    children: i
  }), t[0] = i, t[1] = l) : l = t[1], l;
}, {
  setHeaderColor: X8,
  setBackgroundColor: K8
} = Ta, ti = (n) => {
  const t = jt.c(18), {
    children: i,
    mode: l,
    headerColor: o,
    backgroundColor: c,
    expandOnMount: u
  } = n, d = l === void 0 ? "secondary" : l, {
    inDetailPane: p,
    setPaneBackground: y
  } = HE();
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
  const j = b, w = o ? `#${o}` : v[d], C = c ? `#${c}` : v[d], x = c ? `#${c}` : `var(${j[d]})`;
  let A, R;
  t[2] !== u ? (A = () => {
    u && Ta.expand();
  }, R = [u], t[2] = u, t[3] = A, t[4] = R) : (A = t[3], R = t[4]), T.useEffect(A, R);
  let M, _;
  t[5] !== x || t[6] !== p || t[7] !== C || t[8] !== w ? (M = () => {
    p || (Ta.initData ? (K8(C), X8(w)) : document.body.style.backgroundColor = x, document.body.style.setProperty("--page-background", x));
  }, _ = [C, w, x, p], t[5] = x, t[6] = p, t[7] = C, t[8] = w, t[9] = M, t[10] = _) : (M = t[9], _ = t[10]), T.useEffect(M, _);
  let L, N;
  t[11] !== x || t[12] !== p || t[13] !== y ? (L = () => {
    !p || !y || y(x);
  }, N = [p, y, x], t[11] = x, t[12] = p, t[13] = y, t[14] = L, t[15] = N) : (L = t[14], N = t[15]), T.useEffect(L, N);
  let D;
  return t[16] !== i ? (D = /* @__PURE__ */ h.jsx(h.Fragment, {
    children: i
  }), t[16] = i, t[17] = D) : D = t[17], D;
};
ti.propTypes = {
  children: kn.node,
  mode: kn.oneOf(["primary", "secondary"]),
  headerColor: kn.string,
  backgroundColor: kn.string,
  expandOnMount: kn.bool
};
const Z8 = "_root_125s3_1", Q8 = "_card_125s3_16", F8 = "_container_125s3_22", Wd = "flex justify-between gap-compact px-content py-10 text-section";
function g2(n) {
  const t = jt.c(27);
  let i, l, o, c;
  switch (t[0] !== n ? ({
    type: o,
    title: l,
    value: c,
    ...i
  } = n, t[0] = n, t[1] = i, t[2] = l, t[3] = o, t[4] = c) : (i = t[1], l = t[2], o = t[3], c = t[4]), o) {
    case "Headline": {
      let u;
      t[5] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (u = IE(Wd, "text-foreground"), t[5] = u) : u = t[5];
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
        className: Wd,
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
        className: Wd,
        ...i,
        children: [u, d]
      }), t[23] = i, t[24] = u, t[25] = d, t[26] = p) : p = t[26], p;
    }
  }
}
const I8 = eu.section, J8 = Qm[16], W8 = 0.6, gt = (n) => {
  const t = jt.c(6);
  let i, l;
  t[0] !== n ? ({
    children: i,
    ...l
  } = n, t[0] = n, t[1] = i, t[2] = l) : (i = t[1], l = t[2]);
  let o;
  return t[3] !== i || t[4] !== l ? (o = /* @__PURE__ */ h.jsx("section", {
    className: Z8,
    ...l,
    children: i
  }), t[3] = i, t[4] = l, t[5] = o) : o = t[5], o;
}, tM = (n) => {
  const t = jt.c(21);
  let i, l, o, c;
  t[0] !== n ? ({
    children: i,
    header: o,
    description: l,
    ...c
  } = n, t[0] = n, t[1] = i, t[2] = l, t[3] = o, t[4] = c) : (i = t[1], l = t[2], o = t[3], c = t[4]);
  const {
    isApple: u
  } = Nr(), d = T.useRef(null), p = T.useRef(null), y = u ? I8 : J8;
  let g;
  t[5] !== y ? (g = {
    radius: y,
    smoothing: W8
  }, t[5] = y, t[6] = g) : g = t[6];
  let v;
  t[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = {
    autoEffects: !1
  }, t[7] = v) : v = t[7], uS(u ? p : d, g, v);
  let b;
  t[8] !== o ? (b = o && /* @__PURE__ */ h.jsx(g2, {
    title: o
  }), t[8] = o, t[9] = b) : b = t[9];
  let j;
  t[10] !== i ? (j = /* @__PURE__ */ h.jsx("div", {
    ref: p,
    className: F8,
    children: i
  }), t[10] = i, t[11] = j) : j = t[11];
  let w;
  t[12] !== b || t[13] !== j ? (w = /* @__PURE__ */ h.jsxs("div", {
    ref: d,
    className: Q8,
    children: [b, j]
  }), t[12] = b, t[13] = j, t[14] = w) : w = t[14];
  let C;
  t[15] !== l ? (C = l && /* @__PURE__ */ h.jsx(g2, {
    type: "Footer",
    title: l
  }), t[15] = l, t[16] = C) : C = t[16];
  let x;
  return t[17] !== c || t[18] !== w || t[19] !== C ? (x = /* @__PURE__ */ h.jsxs("section", {
    ...c,
    children: [w, C]
  }), t[17] = c, t[18] = w, t[19] = C, t[20] = x) : x = t[20], x;
};
gt.Item = tM;
const v2 = 1e3;
function eM(n, t, i = "vertical") {
  const l = n / t;
  if (Math.abs(l) >= Math.PI / 2) return null;
  const o = (t * Math.sin(l) - n).toFixed(2), c = (t * (Math.cos(l) - 1)).toFixed(2), u = (l * 180 / Math.PI).toFixed(2);
  return i === "horizontal" ? `perspective(${v2}px) translateX(${o}px) translateZ(${c}px) rotateY(${u}deg)` : `perspective(${v2}px) translateY(${o}px) translateZ(${c}px) rotateX(${-u}deg)`;
}
const nM = "_root_cnxqv_1", aM = "_icon_cnxqv_17", iM = "_content_cnxqv_42", sM = "_title_cnxqv_55", lM = "_description_cnxqv_56", rM = "_action_cnxqv_61", oM = "_link_cnxqv_61", cM = "_host_cnxqv_92", uM = "_host_top_cnxqv_105", fM = "_host_bottom_cnxqv_109", dM = "_item_cnxqv_114", hM = (n) => {
  const t = jt.c(19), {
    icon: i,
    title: l,
    description: o,
    link: c,
    action: u
  } = n, d = !!o;
  let p;
  t[0] !== i ? (p = i ? /* @__PURE__ */ h.jsx("div", {
    className: aM,
    "aria-hidden": "true",
    children: i
  }) : null, t[0] = i, t[1] = p) : p = t[1];
  const y = d ? "semibold" : void 0;
  let g;
  t[2] !== y || t[3] !== l ? (g = /* @__PURE__ */ h.jsx(pt, {
    as: "p",
    className: sM,
    variant: "subheadline2",
    weight: y,
    children: l
  }), t[2] = y, t[3] = l, t[4] = g) : g = t[4];
  let v;
  t[5] !== o ? (v = o ? /* @__PURE__ */ h.jsx(pt, {
    as: "p",
    className: lM,
    variant: "subheadline2",
    children: o
  }) : null, t[5] = o, t[6] = v) : v = t[6];
  let b;
  t[7] !== c ? (b = c ? /* @__PURE__ */ h.jsx("button", {
    type: "button",
    className: oM,
    onClick: c.onClick,
    children: /* @__PURE__ */ h.jsx(pt, {
      as: "span",
      variant: "subheadline2",
      children: c.label
    })
  }) : null, t[7] = c, t[8] = b) : b = t[8];
  let j;
  t[9] !== g || t[10] !== v || t[11] !== b ? (j = /* @__PURE__ */ h.jsxs("div", {
    className: iM,
    children: [g, v, b]
  }), t[9] = g, t[10] = v, t[11] = b, t[12] = j) : j = t[12];
  let w;
  t[13] !== u ? (w = u ? /* @__PURE__ */ h.jsx("button", {
    type: "button",
    className: rM,
    onClick: u.onClick,
    children: /* @__PURE__ */ h.jsx(pt, {
      as: "span",
      variant: "body",
      children: u.label
    })
  }) : null, t[13] = u, t[14] = w) : w = t[14];
  let C;
  return t[15] !== p || t[16] !== j || t[17] !== w ? (C = /* @__PURE__ */ h.jsxs("div", {
    className: nM,
    role: "status",
    "aria-live": "polite",
    children: [p, j, w]
  }), t[15] = p, t[16] = j, t[17] = w, t[18] = C) : C = t[18], C;
};
kn.shape({
  label: kn.node.isRequired,
  onClick: kn.func
});
const mM = 4e3, pM = 100, yM = 500, gM = (n) => {
  if (n)
    try {
      Ta.HapticFeedback?.notificationOccurred(n);
    } catch {
    }
}, vM = (n) => {
  const t = jt.c(45), {
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
  } = i, j = g === void 0 ? "bottom" : g, w = v === void 0 ? mM : v, C = gA(), [x, A] = T.useState(!1), [R, M] = T.useState(0);
  let _;
  t[0] !== o || t[1] !== l ? (_ = () => l(o), t[0] = o, t[1] = l, t[2] = _) : _ = t[2];
  const L = _;
  let N, D;
  t[3] !== b ? (N = () => {
    gM(b);
  }, D = [b], t[3] = b, t[4] = N, t[5] = D) : (N = t[4], D = t[5]), T.useEffect(N, D);
  let V, H;
  t[6] !== L || t[7] !== w || t[8] !== x ? (V = () => {
    if (!w || x)
      return;
    const nt = setTimeout(L, w);
    return () => clearTimeout(nt);
  }, H = [w, x, L], t[6] = L, t[7] = w, t[8] = x, t[9] = V, t[10] = H) : (V = t[9], H = t[10]), T.useEffect(V, H);
  const B = j === "top" ? -32 : 32, U = b === "error";
  let I;
  t[11] !== C || t[12] !== B ? (I = C ? {
    opacity: 0
  } : {
    opacity: 0,
    y: B,
    scale: 0.96
  }, t[11] = C, t[12] = B, t[13] = I) : I = t[13];
  const P = I;
  let it;
  t[14] !== U || t[15] !== C ? (it = C ? {
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
  }, t[14] = U, t[15] = C, t[16] = it) : it = t[16];
  const J = it;
  let $;
  t[17] !== R || t[18] !== C || t[19] !== B ? ($ = C ? {
    opacity: 0,
    transition: {
      duration: 0.15
    }
  } : {
    opacity: 0,
    x: R * 400,
    y: R === 0 ? B : 0,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }, t[17] = R, t[18] = C, t[19] = B, t[20] = $) : $ = t[20];
  const X = $;
  let F;
  t[21] !== L ? (F = (nt, mt) => {
    A(!1);
    const ut = mt.offset.x, yt = mt.velocity.x;
    (Math.abs(ut) > pM || Math.abs(yt) > yM) && (M(ut >= 0 ? 1 : -1), L());
  }, t[21] = L, t[22] = F) : F = t[22];
  const tt = F;
  let dt;
  t[23] !== L ? (dt = (nt) => {
    if (nt)
      return {
        ...nt,
        onClick: () => {
          nt.onClick?.(), L();
        }
      };
  }, t[23] = L, t[24] = dt) : dt = t[24];
  const O = dt, q = C ? !1 : "x";
  let Y;
  t[25] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (Y = () => A(!0), t[25] = Y) : Y = t[25];
  let et;
  t[26] !== p || t[27] !== O ? (et = O(p), t[26] = p, t[27] = O, t[28] = et) : et = t[28];
  let ot;
  t[29] !== y || t[30] !== O ? (ot = O(y), t[29] = y, t[30] = O, t[31] = ot) : ot = t[31];
  let ct;
  t[32] !== d || t[33] !== c || t[34] !== et || t[35] !== ot || t[36] !== u ? (ct = /* @__PURE__ */ h.jsx(hM, {
    icon: c,
    title: u,
    description: d,
    link: et,
    action: ot
  }), t[32] = d, t[33] = c, t[34] = et, t[35] = ot, t[36] = u, t[37] = ct) : ct = t[37];
  let ft;
  return t[38] !== J || t[39] !== X || t[40] !== tt || t[41] !== P || t[42] !== q || t[43] !== ct ? (ft = /* @__PURE__ */ h.jsx(Ca, {
    className: dM,
    initial: P,
    animate: J,
    exit: X,
    layout: !0,
    drag: q,
    dragSnapToOrigin: !0,
    dragElastic: 0.6,
    dragMomentum: !1,
    onDragStart: Y,
    onDragEnd: tt,
    children: ct
  }), t[38] = J, t[39] = X, t[40] = tt, t[41] = P, t[42] = q, t[43] = ct, t[44] = ft) : ft = t[44], ft;
}, s3 = {
  top: uM,
  bottom: fM
}, bM = Object.keys(s3), xM = (n) => {
  const t = jt.c(5), {
    snackbars: i,
    onDismiss: l
  } = n;
  let o;
  t[0] !== l || t[1] !== i ? (o = bM.map((u) => {
    const d = i.filter((p) => (p.position ?? "bottom") === u);
    return /* @__PURE__ */ h.jsx("div", {
      className: `${cM} ${s3[u]}`,
      children: /* @__PURE__ */ h.jsx(Xs, {
        initial: !1,
        children: d.map((p) => /* @__PURE__ */ h.jsx(vM, {
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
}, l3 = /* @__PURE__ */ T.createContext(null), SM = () => {
  const n = T.useContext(l3);
  if (!n)
    throw new Error("useSnackbar must be used inside <SnackbarProvider>");
  return n;
}, r3 = (n) => {
  const t = jt.c(9), {
    children: i
  } = n;
  let l;
  t[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (l = [], t[0] = l) : l = t[0];
  const [o, c] = T.useState(l), u = T.useRef(0);
  let d;
  t[1] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (d = (w) => {
    c((C) => C.filter((x) => x.id !== w));
  }, t[1] = d) : d = t[1];
  const p = d;
  let y;
  t[2] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (y = (w) => {
    u.current = u.current + 1;
    const C = u.current;
    return c((x) => [...x, {
      id: C,
      ...w
    }]), C;
  }, t[2] = y) : y = t[2];
  const g = y;
  let v;
  t[3] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = {
    show: g,
    dismiss: p
  }, t[3] = v) : v = t[3];
  let b;
  t[4] !== o ? (b = /* @__PURE__ */ h.jsx(xM, {
    snackbars: o,
    onDismiss: p
  }), t[4] = o, t[5] = b) : b = t[5];
  let j;
  return t[6] !== i || t[7] !== b ? (j = /* @__PURE__ */ h.jsxs(l3.Provider, {
    value: v,
    children: [i, b]
  }), t[6] = i, t[7] = b, t[8] = j) : j = t[8], j;
}, wM = (n) => /* @__PURE__ */ T.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ T.createElement("g", { id: "24_icon-fill/loader" }, /* @__PURE__ */ T.createElement("path", { id: "Vector", d: "M12 3.02148C16.9704 3.02148 20.9997 7.07957 21 12.0859C21 17.0925 16.9706 21.1514 12 21.1514C7.02944 21.1514 3 17.0925 3 12.0859C3.00026 11.5299 3.44787 11.0791 4 11.0791C4.55213 11.0791 4.99974 11.5299 5 12.0859C5 15.9799 8.13401 19.1367 12 19.1367C15.866 19.1367 19 15.9799 19 12.0859C18.9997 8.19215 15.8658 5.03613 12 5.03613C9.64439 5.03613 7.56033 6.20674 6.29004 8.00684C5.97018 8.46016 5.34566 8.56708 4.89551 8.24512C4.44533 7.92286 4.33924 7.29328 4.65918 6.83984C6.28848 4.53074 8.96935 3.02148 12 3.02148Z", fill: "#3D3C3A" }))), CM = "_centered_1ma1e_1", TM = "_spinner_1ma1e_8", nu = (n) => {
  const t = jt.c(15);
  let i, l, o, c;
  t[0] !== n ? ({
    centered: i,
    className: l,
    size: c,
    ...o
  } = n, t[0] = n, t[1] = i, t[2] = l, t[3] = o, t[4] = c) : (i = t[1], l = t[2], o = t[3], c = t[4]);
  let u;
  t[5] !== l ? (u = [TM, l].filter(Boolean), t[5] = l, t[6] = u) : u = t[6];
  const d = u.join(" ");
  let p;
  t[7] !== c ? (p = c ? {
    width: c,
    height: c
  } : void 0, t[7] = c, t[8] = p) : p = t[8];
  const y = p;
  let g;
  t[9] !== d || t[10] !== o || t[11] !== y ? (g = /* @__PURE__ */ h.jsx(wM, {
    ...o,
    className: d,
    style: y
  }), t[9] = d, t[10] = o, t[11] = y, t[12] = g) : g = t[12];
  const v = g;
  if (i) {
    let b;
    return t[13] !== v ? (b = /* @__PURE__ */ h.jsx("div", {
      className: CM,
      children: v
    }), t[13] = v, t[14] = b) : b = t[14], b;
  }
  return v;
}, jM = "_root_warzp_1", AM = "_gradient_warzp_71", EM = "_clipPathContainer_warzp_113", MM = "_tab_1mynw_1", _M = "_icon_1mynw_37", RM = "_active_1mynw_62", o3 = (n) => {
  const t = jt.c(21);
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
  const g = `${MM} ${l ? RM : ""} ${p}`;
  let v;
  t[8] !== g ? (v = g.trim(), t[8] = g, t[9] = v) : v = t[9];
  let b;
  t[10] !== i ? (b = /* @__PURE__ */ h.jsx(Ca, {
    layout: !0,
    className: _M,
    children: i
  }), t[10] = i, t[11] = b) : b = t[11];
  let j;
  t[12] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (j = {
    display: "inline-block"
  }, t[12] = j) : j = t[12];
  let w;
  t[13] !== o ? (w = /* @__PURE__ */ h.jsx(ST, {
    layout: !0,
    style: j,
    children: o
  }), t[13] = o, t[14] = w) : w = t[14];
  let C;
  return t[15] !== c || t[16] !== u || t[17] !== v || t[18] !== b || t[19] !== w ? (C = /* @__PURE__ */ h.jsxs(Ca, {
    layout: !0,
    transition: y,
    ...u,
    className: v,
    onClick: c,
    children: [b, w]
  }), t[15] = c, t[16] = u, t[17] = v, t[18] = b, t[19] = w, t[20] = C) : C = t[20], C;
};
function DM({
  tabsLength: n,
  activeIndex: t,
  onSnapToSame: i,
  onSnapToNew: l,
  spring: o
}) {
  const c = T.useRef(null), [u, d] = T.useState(!1), [p, y] = T.useState(null), g = T.useRef(null), v = T.useRef(!1), b = T.useRef(null), j = T.useRef(0), w = 6, C = 100 / n, x = `calc(${C}% + 7.33px - 4px)`, A = `calc(${C * t}% - ${3.67 * t}px)`, R = A, M = `calc(100% - (${A} + ${x}) - 2.33px * ${t})`, _ = u && p != null ? `inset(0 ${100 - (p + C)}% 0 ${p}% round 100px)` : `inset(0 ${M} 0 ${R} round 100px)`, L = u ? {
    clipPath: {
      duration: 0
    }
  } : {
    clipPath: o
  }, N = (P) => {
    const it = c.current;
    if (!it) return;
    const J = it.getBoundingClientRect(), $ = P - J.left, X = J.width;
    if (X <= 0) return;
    const F = $ / X * 100, tt = On(F - C / 2, 0, 100 - C);
    y(tt);
  }, D = (P) => {
    v.current = !0, b.current = P.pointerId, j.current = P.clientX;
  }, V = (P) => {
    if (!(b.current != null && P.pointerId !== b.current)) {
      if (!u) {
        if (!v.current) return;
        if (Math.abs(P.clientX - j.current) >= w) {
          try {
            P.currentTarget.setPointerCapture?.(P.pointerId), g.current = P.pointerId;
          } catch {
          }
          d(!0), N(P.clientX), P.preventDefault();
        }
        return;
      }
      g.current != null && P.pointerId !== g.current || (N(P.clientX), P.preventDefault());
    }
  }, H = (P) => {
    const it = c.current;
    let J = t;
    if (it && typeof P == "number") {
      const $ = it.getBoundingClientRect(), X = P - $.left, F = $.width;
      if (F > 0) {
        const tt = F / n;
        J = On(Math.round(X / tt - 0.5), 0, n - 1);
      }
    } else if (p != null) {
      const $ = 100 / n;
      J = On(Math.round(p / $), 0, n - 1);
    }
    J === t ? i?.() : l?.(J), d(!1), y(null), g.current = null;
  }, B = (P) => {
    if (v.current = !1, b.current = null, !!u && !(g.current != null && P.pointerId !== g.current)) {
      try {
        P.currentTarget.releasePointerCapture?.(P.pointerId);
      } catch {
      }
      H(P.clientX), P.preventDefault();
    }
  }, U = (P) => {
    v.current = !1, b.current = null, u && (H(P?.clientX), P.preventDefault?.());
  }, I = (P) => {
    u && H(P?.clientX);
  };
  return T.useEffect(() => {
    const P = () => {
      d(!1), y(null), g.current = null, v.current = !1, b.current = null;
    };
    return window.addEventListener("blur", P), () => window.removeEventListener("blur", P);
  }, []), {
    overlayRef: c,
    isDragging: u,
    animate: {
      clipPath: _
    },
    transition: L,
    handlers: {
      onPointerDown: D,
      onPointerMove: V,
      onPointerUp: B,
      onPointerCancel: U,
      onPointerLeave: I
    }
  };
}
function NM(n) {
  const t = jt.c(40), {
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
  const p = d, y = c === void 0 ? 64 : c, g = T.useId();
  if (!i || !l)
    return null;
  const {
    top: v,
    right: b,
    bottom: j,
    left: w
  } = p, C = i + w + b, x = y + v + j, A = Math.max(0, C - w - b), R = Math.min(y / 2, A / 2, 999), M = `grad-${g}`, _ = `mask-${g}`, L = Math.max(w, b), N = Math.max(v, j), D = `0 0 ${C} ${x}`;
  let V;
  t[2] !== u ? (V = [AM, u].filter(Boolean), t[2] = u, t[3] = V) : V = t[3];
  const H = V.join(" "), B = `${L}px`, U = `${N}px`;
  let I;
  t[4] !== B || t[5] !== U ? (I = {
    "--overlay-padding-x": B,
    "--overlay-padding-y": U
  }, t[4] = B, t[5] = U, t[6] = I) : I = t[6];
  let P, it;
  t[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (P = /* @__PURE__ */ h.jsx("stop", {
    offset: "0%",
    stopColor: "var(--mask-color)",
    stopOpacity: "var(--mask-opacity-top)"
  }), it = /* @__PURE__ */ h.jsx("stop", {
    offset: "100%",
    stopColor: "var(--mask-color)",
    stopOpacity: "var(--mask-opacity-bottom)"
  }), t[7] = P, t[8] = it) : (P = t[7], it = t[8]);
  let J;
  t[9] !== M ? (J = /* @__PURE__ */ h.jsxs("linearGradient", {
    id: M,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1",
    children: [P, it]
  }), t[9] = M, t[10] = J) : J = t[10];
  let $;
  t[11] !== x || t[12] !== C ? ($ = /* @__PURE__ */ h.jsx("rect", {
    x: "0",
    y: "0",
    width: C,
    height: x,
    fill: "var(--ui-static-white)"
  }), t[11] = x, t[12] = C, t[13] = $) : $ = t[13];
  let X;
  t[14] !== y || t[15] !== A || t[16] !== w || t[17] !== R || t[18] !== v ? (X = /* @__PURE__ */ h.jsx("rect", {
    x: w,
    y: v,
    width: A,
    height: y,
    rx: R,
    ry: R,
    fill: "var(--ui-static-black)"
  }), t[14] = y, t[15] = A, t[16] = w, t[17] = R, t[18] = v, t[19] = X) : X = t[19];
  let F;
  t[20] !== _ || t[21] !== $ || t[22] !== X ? (F = /* @__PURE__ */ h.jsxs("mask", {
    id: _,
    maskUnits: "userSpaceOnUse",
    children: [$, X]
  }), t[20] = _, t[21] = $, t[22] = X, t[23] = F) : F = t[23];
  let tt;
  t[24] !== J || t[25] !== F ? (tt = /* @__PURE__ */ h.jsxs("defs", {
    children: [J, F]
  }), t[24] = J, t[25] = F, t[26] = tt) : tt = t[26];
  const dt = `url(#${M})`, O = `url(#${_})`;
  let q;
  t[27] !== x || t[28] !== C || t[29] !== dt || t[30] !== O ? (q = /* @__PURE__ */ h.jsx("rect", {
    width: C,
    height: x,
    fill: dt,
    mask: O
  }), t[27] = x, t[28] = C, t[29] = dt, t[30] = O, t[31] = q) : q = t[31];
  let Y;
  return t[32] !== x || t[33] !== C || t[34] !== tt || t[35] !== q || t[36] !== D || t[37] !== H || t[38] !== I ? (Y = /* @__PURE__ */ h.jsxs("svg", {
    width: C,
    height: x,
    viewBox: D,
    preserveAspectRatio: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: H,
    style: I,
    "aria-hidden": !0,
    children: [tt, q]
  }), t[32] = x, t[33] = C, t[34] = tt, t[35] = q, t[36] = D, t[37] = H, t[38] = I, t[39] = Y) : Y = t[39], Y;
}
const OM = (n) => {
  const t = jt.c(24), {
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
  } = DM(u);
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
  let C;
  if (t[11] !== l || t[12] !== o || t[13] !== i) {
    let A;
    t[15] !== l || t[16] !== o ? (A = (R, M) => /* @__PURE__ */ h.jsx(o3, {
      isActive: M === l,
      onClick: () => o(M),
      "data-overlay": !0,
      ...R
    }, M), t[15] = l, t[16] = o, t[17] = A) : A = t[17], C = i.map(A), t[11] = l, t[12] = o, t[13] = i, t[14] = C;
  } else
    C = t[14];
  let x;
  return t[18] !== g || t[19] !== d || t[20] !== b || t[21] !== w || t[22] !== C ? (x = /* @__PURE__ */ h.jsx(Ca, {
    className: EM,
    ref: d,
    ...g,
    initial: v,
    animate: b,
    transition: w,
    children: C
  }), t[18] = g, t[19] = d, t[20] = b, t[21] = w, t[22] = C, t[23] = x) : x = t[23], x;
}, LM = (n) => {
  const t = jt.c(43), {
    tabs: i,
    onChange: l,
    defaultIndex: o
  } = n, c = o === void 0 ? 0 : o, {
    isApple: u
  } = Nr(), [d, p] = T.useState(c);
  let y, g;
  t[0] !== c ? (y = () => {
    p(c);
  }, g = [c], t[0] = c, t[1] = y, t[2] = g) : (y = t[1], g = t[2]), T.useEffect(y, g);
  let v, b;
  t[3] !== i.length ? (v = () => {
    p((tt) => Math.min(tt, i.length - 1));
  }, b = [i.length], t[3] = i.length, t[4] = v, t[5] = b) : (v = t[4], b = t[5]), T.useEffect(v, b);
  let j;
  t[6] !== d || t[7] !== l ? (j = (tt) => {
    tt !== d && (p(tt), l?.(tt));
  }, t[6] = d, t[7] = l, t[8] = j) : j = t[8];
  const w = j, C = T.useRef(null), [x, A] = T.useState(0);
  let R;
  t[9] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (R = (tt) => {
    A(tt.contentRect.width);
  }, t[9] = R) : R = t[9], k8(C, R);
  const M = i.length === 3 ? 54 : 21;
  let _;
  t[10] !== u || t[11] !== M ? (_ = u ? {
    left: M,
    right: M,
    width: `calc(100% - ${M * 2}px)`
  } : {}, t[10] = u, t[11] = M, t[12] = _) : _ = t[12];
  const L = _;
  let N;
  t[13] !== M ? (N = {
    top: 21,
    bottom: 21,
    left: M,
    right: M
  }, t[13] = M, t[14] = N) : N = t[14];
  const D = N;
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
    t[22] !== d || t[23] !== w ? (tt = (dt, O) => /* @__PURE__ */ h.jsx(o3, {
      isActive: O === d,
      onClick: () => w(O),
      ...dt
    }, O), t[22] = d, t[23] = w, t[24] = tt) : tt = t[24], U = i.map(tt), t[18] = d, t[19] = w, t[20] = i, t[21] = U;
  } else
    U = t[21];
  let I;
  t[25] !== U ? (I = /* @__PURE__ */ h.jsx("div", {
    style: B,
    children: U
  }), t[25] = U, t[26] = I) : I = t[26];
  let P;
  t[27] !== d || t[28] !== w || t[29] !== i ? (P = /* @__PURE__ */ h.jsx(OM, {
    tabs: i,
    activeIndex: d,
    onChange: w
  }), t[27] = d, t[28] = w, t[29] = i, t[30] = P) : P = t[30];
  const it = u ? "visible" : "hidden";
  let J;
  t[31] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (J = /* @__PURE__ */ h.jsx(Sr, {}), t[31] = J) : J = t[31];
  let $;
  t[32] !== D || t[33] !== x ? ($ = /* @__PURE__ */ h.jsx(NM, {
    width: x,
    height: 64,
    insets: D
  }), t[32] = D, t[33] = x, t[34] = $) : $ = t[34];
  let X;
  t[35] !== it || t[36] !== $ ? (X = /* @__PURE__ */ h.jsxs(T.Activity, {
    mode: it,
    children: [J, $]
  }), t[35] = it, t[36] = $, t[37] = X) : X = t[37];
  let F;
  return t[38] !== L || t[39] !== I || t[40] !== P || t[41] !== X ? (F = /* @__PURE__ */ h.jsxs(Ca, {
    ref: C,
    className: jM,
    whileTap: V,
    transition: H,
    style: L,
    layout: !0,
    children: [I, P, X]
  }), t[38] = L, t[39] = I, t[40] = P, t[41] = X, t[42] = F) : F = t[42], F;
}, fp = "_badge_dqs9c_1", c3 = "_filled_dqs9c_19", u3 = "_tinted_dqs9c_24", f3 = "_gray_dqs9c_29", d3 = "_media_dqs9c_34", h3 = "_outlined_dqs9c_39", $M = {
  badge: fp,
  filled: c3,
  tinted: u3,
  gray: f3,
  media: d3,
  outlined: h3
}, kM = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  badge: fp,
  default: $M,
  filled: c3,
  gray: f3,
  media: d3,
  outlined: h3,
  tinted: u3
}, Symbol.toStringTag, { value: "Module" })), BM = (n) => {
  const t = jt.c(35);
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
  let C;
  t[11] !== j ? (C = j && {
    "data-squared": !0
  }, t[11] = j, t[12] = C) : C = t[12];
  let x;
  t[13] !== w || t[14] !== C ? (x = {
    ...w,
    ...C
  }, t[13] = w, t[14] = C, t[15] = x) : x = t[15];
  const A = x, R = o?.background || o?.backgroundColor || null;
  let M = o;
  if (g === "filled") {
    const N = R || "var(--tg-theme-button-color)";
    let D;
    t[16] !== o ? (D = o?.color && {
      "--badge-text-color": o.color
    }, t[16] = o, t[17] = D) : D = t[17];
    let V;
    t[18] !== o || t[19] !== N || t[20] !== D ? (V = {
      ...o,
      "--badge-background": N,
      ...D
    }, t[18] = o, t[19] = N, t[20] = D, t[21] = V) : V = t[21], M = V;
  } else if (g === "tinted") {
    const N = o.color || R || "var(--tg-theme-button-color)";
    let D;
    t[22] !== o.color ? (D = o?.color && {
      "--badge-text-color": o.color
    }, t[22] = o.color, t[23] = D) : D = t[23];
    let V;
    t[24] !== o || t[25] !== D || t[26] !== N ? (V = {
      ...o,
      "--badge-background": N,
      ...D
    }, t[24] = o, t[25] = D, t[26] = N, t[27] = V) : V = t[27], M = V;
  }
  const _ = `${fp} ${kM[g]} ${l || ""}`;
  let L;
  return t[28] !== M || t[29] !== i || t[30] !== A || t[31] !== _ || t[32] !== y || t[33] !== v ? (L = /* @__PURE__ */ h.jsx(pt, {
    variant: v,
    className: _,
    style: M,
    ...A,
    ...y,
    children: i
  }), t[28] = M, t[29] = i, t[30] = A, t[31] = _, t[32] = y, t[33] = v, t[34] = L) : L = t[34], L;
}, VM = "_container_1e3rp_1", zM = "_trigger_1e3rp_6", b2 = "_shell_1e3rp_20", UM = "_body_1e3rp_28", HM = "_compact_1e3rp_36", qM = "_withBadge_1e3rp_40", YM = "_badge_1e3rp_44", x2 = (n) => {
  const t = jt.c(14), {
    content: i,
    badge: l,
    compact: o
  } = n, c = o ? HM : "", u = l && !o ? qM : "";
  let d;
  t[0] !== c || t[1] !== u ? (d = [UM, c, u].filter(Boolean), t[0] = c, t[1] = u, t[2] = d) : d = t[2];
  const p = d.join(" ");
  let y;
  t[3] !== l || t[4] !== o ? (y = l && !o && /* @__PURE__ */ h.jsx("span", {
    className: YM,
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
}, Rs = 8, Tn = 8, PM = (n, t) => n.top === t.top && n.left === t.left && n.width === t.width && n.height === t.height && n.placement === t.placement && n.shape === t.shape && n.tailOffsetX === t.tailOffsetX && n.tailOffsetY === t.tailOffsetY && n.tailProtrusion === t.tailProtrusion && n.originX === t.originX && n.originY === t.originY, GM = (n, t) => n.reduce((i, l) => i === null || t[l] > t[i] ? l : i, null), XM = (n, t, i) => {
  if (["top", "bottom", "left", "right"].includes(i))
    return i;
  const l = t.left !== t.right, o = Math.max(n.top, n.bottom), c = Math.min(n.top, n.bottom), u = o > 0 && (o - c) / o < 0.4;
  return l && u ? t.left ? "left" : "right" : t.bottom && t.top ? n.bottom >= n.top ? "bottom" : "top" : t.bottom ? "bottom" : t.top ? "top" : t.right && t.left ? n.right >= n.left ? "right" : "left" : t.right ? "right" : t.left ? "left" : GM(["bottom", "top", "right", "left"], n);
}, KM = (n, t, i, l, o, c) => {
  const {
    innerHeight: u,
    innerWidth: d
  } = window, p = {
    top: n.top,
    bottom: u - n.bottom,
    left: n.left,
    right: d - n.right
  }, y = t.height + o + Rs + Tn, g = t.width + o + Rs + Tn, v = {
    top: p.top >= y,
    bottom: p.bottom >= y,
    left: p.left >= g,
    right: p.right >= g
  }, b = XM(p, v, c), j = b === "left" || b === "right", w = j ? l : i, C = Math.round(o * 0.8);
  if (j) {
    const B = t.height, U = n.top + n.height / 2, I = Math.max(Tn, u - B - Tn);
    let P = On(U - B / 2, Tn, I), it = U - P, J = "full";
    it < w / 2 ? (J = "half-start", P = On(U, Tn, I), it = 0) : it > B - w / 2 && (J = "half-end", P = On(U - B, Tn, I), it = B);
    const $ = J === "full" ? o : C, X = t.width + $, F = b === "left" ? n.left - Rs - X : n.right + Rs, tt = J === "full" ? it - w / 2 : 0;
    return {
      top: Math.round(P),
      left: Math.round(F),
      width: Math.round(X),
      height: Math.round(B),
      placement: b,
      shape: J,
      tailOffsetX: 0,
      tailOffsetY: Math.round(tt),
      tailProtrusion: $,
      originX: b === "left" ? "100%" : "0%",
      originY: `${On(it / B * 100, 0, 100)}%`
    };
  }
  const x = t.width, A = n.left + n.width / 2, R = Math.max(Tn, d - x - Tn);
  let M = On(A - x / 2, Tn, R), _ = A - M, L = "full";
  _ < w / 2 ? (L = "half-start", M = On(A, Tn, R), _ = 0) : _ > x - w / 2 && (L = "half-end", M = On(A - x, Tn, R), _ = x);
  const N = L === "full" ? o : C, D = t.height + N, V = b === "top" ? n.top - Rs - D : n.bottom + Rs, H = L === "full" ? _ - w / 2 : 0;
  return {
    top: Math.round(V),
    left: Math.round(M),
    width: Math.round(x),
    height: Math.round(D),
    placement: b,
    shape: L,
    tailOffsetX: Math.round(H),
    tailOffsetY: 0,
    tailProtrusion: N,
    originX: `${On(_ / x * 100, 0, 100)}%`,
    originY: b === "top" ? "100%" : "0%"
  };
}, ZM = {
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
}, QM = (n, t, i, l, o, c, u) => {
  const d = jt.c(10);
  let p;
  d[0] !== u || d[1] !== o || d[2] !== c || d[3] !== l ? (p = (v, b) => KM(v, b, l, o, c, u), d[0] = u, d[1] = o, d[2] = c, d[3] = l, d[4] = p) : p = d[4];
  const y = p;
  let g;
  return d[5] !== y || d[6] !== n || d[7] !== i || d[8] !== t ? (g = {
    isOpen: n,
    triggerRef: t,
    contentRef: i,
    initialPosition: ZM,
    calculate: y,
    equals: PM
  }, d[5] = y, d[6] = n, d[7] = i, d[8] = t, d[9] = g) : g = d[9], V8(g);
}, FM = 80, IM = 120, JM = (n) => {
  const t = jt.c(15), {
    onOpen: i,
    onClose: l
  } = n, o = T.useRef(null), c = T.useRef(null);
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
  }, v = [d, y], t[2] = g, t[3] = v) : (g = t[2], v = t[3]), T.useEffect(g, v);
  let b;
  t[4] !== i ? (b = () => {
    y(), !o.current && (o.current = setTimeout(() => {
      o.current = null, i();
    }, FM));
  }, t[4] = i, t[5] = b) : b = t[5];
  const j = b;
  let w;
  t[6] !== l ? (w = () => {
    d(), !c.current && (c.current = setTimeout(() => {
      c.current = null, l();
    }, IM));
  }, t[6] = l, t[7] = w) : w = t[7];
  const C = w;
  let x;
  t[8] !== j ? (x = (L) => {
    L.pointerType !== "touch" && j();
  }, t[8] = j, t[9] = x) : x = t[9];
  const A = x;
  let R;
  t[10] !== C ? (R = (L) => {
    L.pointerType !== "touch" && C();
  }, t[10] = C, t[11] = R) : R = t[11];
  const M = R;
  let _;
  return t[12] !== A || t[13] !== M ? (_ = {
    onPointerEnter: A,
    onPointerLeave: M,
    clearOpenTimer: d,
    clearCloseTimer: y
  }, t[12] = A, t[13] = M, t[14] = _) : _ = t[14], _;
}, S2 = 32, w2 = 24, WM = 9, t_ = 7, e_ = eu["tooltip-surface"], n_ = (n, t, i, l, o, c, u) => {
  const d = e_, p = [d, d, d, d];
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
}, a_ = ({
  width: n,
  height: t,
  tailOffsetX: i,
  tailOffsetY: l,
  tailBreadth: o,
  tailProtrusion: c,
  placement: u,
  shape: d
}) => {
  const [p, y, g, v] = n_(d, u, n, t, i, l, o), b = d === "full" ? o : Math.round(o * 0.85), j = Math.min(2, Math.max(1, Math.floor(b / 10))), w = (x) => [x, x + o / 4, x + o * 3 / 8, x + o / 2, x + o * 5 / 8, x + o * 3 / 4, x + o];
  if (u === "bottom") {
    const x = c;
    if (d === "full") {
      const [A, R, M, _, L, N, D] = w(i);
      return `path("M ${p} ${x} L ${A} ${x} C ${R} ${x} ${M} 0 ${_} 0 C ${L} 0 ${N} ${x} ${D} ${x} L ${n - y} ${x} Q ${n} ${x} ${n} ${x + y} L ${n} ${t - v} Q ${n} ${t} ${n - v} ${t} L ${g} ${t} Q 0 ${t} 0 ${t - g} L 0 ${x + p} Q 0 ${x} ${p} ${x} Z")`;
    }
    return d === "half-end" ? `path("M ${p} ${x} L ${n - b / 2} ${x} C ${n - b / 4} ${x} ${n - b / 8 - j} 0 ${n - j} 0 Q ${n} 0 ${n} ${j} L ${n} ${t - v} Q ${n} ${t} ${n - v} ${t} L ${g} ${t} Q 0 ${t} 0 ${t - g} L 0 ${x + p} Q 0 ${x} ${p} ${x} Z")` : `path("M ${j} 0 C ${b / 8 + j} 0 ${b / 4} ${x} ${b / 2} ${x} L ${n - y} ${x} Q ${n} ${x} ${n} ${x + y} L ${n} ${t - v} Q ${n} ${t} ${n - v} ${t} L ${g} ${t} Q 0 ${t} 0 ${t - g} L 0 ${j} Q 0 0 ${j} 0 Z")`;
  }
  if (u === "top") {
    const x = t - c;
    if (d === "full") {
      const [A, R, M, _, L, N, D] = w(i);
      return `path("M ${p} 0 L ${n - y} 0 Q ${n} 0 ${n} ${y} L ${n} ${x - v} Q ${n} ${x} ${n - v} ${x} L ${D} ${x} C ${N} ${x} ${L} ${t} ${_} ${t} C ${M} ${t} ${R} ${x} ${A} ${x} L ${g} ${x} Q 0 ${x} 0 ${x - g} L 0 ${p} Q 0 0 ${p} 0 Z")`;
    }
    return d === "half-end" ? `path("M ${p} 0 L ${n - y} 0 Q ${n} 0 ${n} ${y} L ${n} ${t - j} Q ${n} ${t} ${n - j} ${t} C ${n - b / 8 - j} ${t} ${n - b / 4} ${x} ${n - b / 2} ${x} L ${g} ${x} Q 0 ${x} 0 ${x - g} L 0 ${p} Q 0 0 ${p} 0 Z")` : `path("M ${p} 0 L ${n - y} 0 Q ${n} 0 ${n} ${y} L ${n} ${x - v} Q ${n} ${x} ${n - v} ${x} L ${b / 2} ${x} C ${b / 4} ${x} ${b / 8 + j} ${t} ${j} ${t} Q 0 ${t} 0 ${t - j} L 0 ${p} Q 0 0 ${p} 0 Z")`;
  }
  if (u === "right") {
    const x = c;
    if (d === "full") {
      const [A, R, M, _, L, N, D] = w(l);
      return `path("M ${x + p} 0 L ${n - y} 0 Q ${n} 0 ${n} ${y} L ${n} ${t - v} Q ${n} ${t} ${n - v} ${t} L ${x + g} ${t} Q ${x} ${t} ${x} ${t - g} L ${x} ${D} C ${x} ${N} 0 ${L} 0 ${_} C 0 ${M} ${x} ${R} ${x} ${A} L ${x} ${p} Q ${x} 0 ${x + p} 0 Z")`;
    }
    return d === "half-end" ? `path("M ${x + p} 0 L ${n - y} 0 Q ${n} 0 ${n} ${y} L ${n} ${t - v} Q ${n} ${t} ${n - v} ${t} L ${j} ${t} Q 0 ${t} 0 ${t - j} C 0 ${t - j - b / 8} ${x} ${t - b / 4} ${x} ${t - b / 2} L ${x} ${p} Q ${x} 0 ${x + p} 0 Z")` : `path("M ${j} 0 L ${n - y} 0 Q ${n} 0 ${n} ${y} L ${n} ${t - v} Q ${n} ${t} ${n - v} ${t} L ${x + g} ${t} Q ${x} ${t} ${x} ${t - g} L ${x} ${b / 2} C ${x} ${b / 4} 0 ${b / 8 + j} 0 ${j} Q 0 0 ${j} 0 Z")`;
  }
  const C = n - c;
  if (d === "full") {
    const [x, A, R, M, _, L, N] = w(l);
    return `path("M ${p} 0 L ${C - y} 0 Q ${C} 0 ${C} ${y} L ${C} ${x} C ${C} ${A} ${n} ${R} ${n} ${M} C ${n} ${_} ${C} ${L} ${C} ${N} L ${C} ${t - v} Q ${C} ${t} ${C - v} ${t} L ${g} ${t} Q 0 ${t} 0 ${t - g} L 0 ${p} Q 0 0 ${p} 0 Z")`;
  }
  return d === "half-end" ? `path("M ${p} 0 L ${C - y} 0 Q ${C} 0 ${C} ${y} L ${C} ${t - b / 2} C ${C} ${t - b / 4} ${n} ${t - b / 8 - j} ${n} ${t - j} Q ${n} ${t} ${n - j} ${t} L ${g} ${t} Q 0 ${t} 0 ${t - g} L 0 ${p} Q 0 0 ${p} 0 Z")` : `path("M ${p} 0 L ${n - j} 0 Q ${n} 0 ${n} ${j} C ${n} ${j + b / 8} ${C} ${b / 4} ${C} ${b / 2} L ${C} ${t - v} Q ${C} ${t} ${C - v} ${t} L ${g} ${t} Q 0 ${t} 0 ${t - g} L 0 ${p} Q 0 0 ${p} 0 Z")`;
}, i_ = (n) => {
  const t = jt.c(61), {
    content: i,
    badge: l,
    type: o,
    placement: c,
    children: u
  } = n, d = o === void 0 ? "regular" : o, p = c === void 0 ? "auto" : c, [y, g] = T.useState(!1), v = T.useRef(null), b = T.useRef(null), j = T.useRef(null), w = d === "compact", C = w ? t_ : WM, {
    position: x,
    isPositioned: A,
    resetPosition: R
  } = QM(y, v, b, S2, w2, C, p);
  let M;
  t[0] !== R ? (M = () => {
    g(!0), R();
  }, t[0] = R, t[1] = M) : M = t[1];
  const _ = M;
  let L;
  t[2] !== R ? (L = () => {
    g(!1), R();
  }, t[2] = R, t[3] = L) : L = t[3];
  const N = L;
  let D;
  t[4] !== N || t[5] !== _ ? (D = {
    onOpen: _,
    onClose: N
  }, t[4] = N, t[5] = _, t[6] = D) : D = t[6];
  const {
    onPointerEnter: V,
    onPointerLeave: H,
    clearOpenTimer: B,
    clearCloseTimer: U
  } = JM(D);
  let I;
  t[7] !== U || t[8] !== B || t[9] !== R ? (I = () => {
    B(), U(), g(s_), R();
  }, t[7] = U, t[8] = B, t[9] = R, t[10] = I) : I = t[10];
  const P = I;
  z8(y, N, v, b, j);
  let it, J;
  t[11] !== N || t[12] !== y ? (it = () => {
    if (!y)
      return;
    const ft = (nt) => {
      nt.key === "Escape" && (nt.preventDefault(), N(), v.current?.focus());
    };
    return document.addEventListener("keydown", ft), () => document.removeEventListener("keydown", ft);
  }, J = [y, N], t[11] = N, t[12] = y, t[13] = it, t[14] = J) : (it = t[13], J = t[14]), T.useEffect(it, J);
  let $;
  t[15] !== P ? ($ = (ft) => {
    (ft.key === "Enter" || ft.key === " ") && (ft.preventDefault(), P());
  }, t[15] = P, t[16] = $) : $ = t[16];
  const X = $, F = x.placement === "left" || x.placement === "right" ? w2 : S2;
  let tt;
  t[17] !== A || t[18] !== x.height || t[19] !== x.left || t[20] !== x.originX || t[21] !== x.originY || t[22] !== x.placement || t[23] !== x.shape || t[24] !== x.tailOffsetX || t[25] !== x.tailOffsetY || t[26] !== x.tailProtrusion || t[27] !== x.top || t[28] !== x.width || t[29] !== F ? (tt = A ? {
    position: "fixed",
    top: x.top,
    left: x.left,
    transformOrigin: `${x.originX} ${x.originY}`,
    zIndex: 1e3,
    paddingTop: x.placement === "bottom" ? x.tailProtrusion : 0,
    paddingBottom: x.placement === "top" ? x.tailProtrusion : 0,
    paddingLeft: x.placement === "right" ? x.tailProtrusion : 0,
    paddingRight: x.placement === "left" ? x.tailProtrusion : 0,
    clipPath: a_({
      width: x.width,
      height: x.height,
      tailOffsetX: x.tailOffsetX,
      tailOffsetY: x.tailOffsetY,
      tailBreadth: F,
      tailProtrusion: x.tailProtrusion,
      placement: x.placement,
      shape: x.shape
    })
  } : null, t[17] = A, t[18] = x.height, t[19] = x.left, t[20] = x.originX, t[21] = x.originY, t[22] = x.placement, t[23] = x.shape, t[24] = x.tailOffsetX, t[25] = x.tailOffsetY, t[26] = x.tailProtrusion, t[27] = x.top, t[28] = x.width, t[29] = F, t[30] = tt) : tt = t[30];
  const dt = tt;
  let O;
  t[31] !== u || t[32] !== X || t[33] !== y || t[34] !== V || t[35] !== H || t[36] !== P ? (O = /* @__PURE__ */ h.jsx("span", {
    className: zM,
    onClick: P,
    onKeyDown: X,
    onPointerEnter: V,
    onPointerLeave: H,
    ref: v,
    role: "button",
    tabIndex: 0,
    "aria-expanded": y,
    "aria-haspopup": "dialog",
    children: u
  }), t[31] = u, t[32] = X, t[33] = y, t[34] = V, t[35] = H, t[36] = P, t[37] = O) : O = t[37];
  let q;
  t[38] !== l || t[39] !== w || t[40] !== i || t[41] !== y || t[42] !== A ? (q = y && !A && /* @__PURE__ */ h.jsx("div", {
    ref: b,
    className: b2,
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      visibility: "hidden",
      zIndex: 1e3
    },
    children: /* @__PURE__ */ h.jsx(x2, {
      content: i,
      badge: l,
      compact: w
    })
  }), t[38] = l, t[39] = w, t[40] = i, t[41] = y, t[42] = A, t[43] = q) : q = t[43];
  let Y;
  t[44] !== l || t[45] !== w || t[46] !== i || t[47] !== y || t[48] !== A || t[49] !== V || t[50] !== H || t[51] !== dt ? (Y = y && A && /* @__PURE__ */ h.jsx(Ca, {
    ref: j,
    role: "tooltip",
    className: b2,
    initial: "hidden",
    animate: "visible",
    exit: "exit",
    variants: JE,
    onPointerEnter: V,
    onPointerLeave: H,
    style: dt,
    children: /* @__PURE__ */ h.jsx(x2, {
      content: i,
      badge: l,
      compact: w
    })
  }), t[44] = l, t[45] = w, t[46] = i, t[47] = y, t[48] = A, t[49] = V, t[50] = H, t[51] = dt, t[52] = Y) : Y = t[52];
  let et;
  t[53] !== Y ? (et = /* @__PURE__ */ h.jsx(Xs, {
    children: Y
  }), t[53] = Y, t[54] = et) : et = t[54];
  let ot;
  t[55] !== q || t[56] !== et ? (ot = /* @__PURE__ */ Dr.createPortal(/* @__PURE__ */ h.jsxs(h.Fragment, {
    children: [q, et]
  }), document.body), t[55] = q, t[56] = et, t[57] = ot) : ot = t[57];
  let ct;
  return t[58] !== O || t[59] !== ot ? (ct = /* @__PURE__ */ h.jsxs("span", {
    className: VM,
    children: [O, ot]
  }), t[58] = O, t[59] = ot, t[60] = ct) : ct = t[60], ct;
};
function s_(n) {
  return !n;
}
const C2 = "_root_1lgln_7", l_ = "_header_1lgln_21", T2 = "_button_1lgln_29", r_ = "_wheelContainer_1lgln_54", o_ = "_centerIndicator_1lgln_80", c_ = "_currentValue_1lgln_101", u_ = "_ticksContainer_1lgln_112", f_ = "_tick_1lgln_112", d_ = "_tickNumber_1lgln_143", h_ = "_tickMark_1lgln_153", m_ = 32, p_ = 8, Ri = m_ + p_, y_ = 0.6, wr = 1;
function j2(n, t) {
  const i = Math.round(-n / Ri);
  return i < 0 ? wr : i + 1 > t ? t : i + 1;
}
function A2(n, t) {
  return Math.min(t, Math.max(wr, n));
}
const g_ = (n) => {
  const t = jt.c(41), {
    value: i,
    defaultValue: l,
    onChange: o,
    max: c,
    disabled: u,
    enableHaptic: d
  } = n, p = l === void 0 ? 1 : l, y = c === void 0 ? 40 : c, g = u === void 0 ? !1 : u, v = d === void 0 ? !0 : d, b = i !== void 0, [j, w] = T.useState(p), C = b ? i : j, [x, A] = T.useState(C), R = T.useRef(C), M = T.useRef(C), _ = Gm(-(C - 1) * Ri), L = x !== C;
  L && A(C);
  let N, D;
  t[0] !== C ? (N = () => {
    R.current = C;
  }, D = [C], t[0] = C, t[1] = N, t[2] = D) : (N = t[1], D = t[2]), T.useEffect(N, D);
  let V;
  t[3] !== v || t[4] !== b || t[5] !== y || t[6] !== o ? (V = (et) => {
    const ot = A2(et, y);
    v && ot !== R.current && Ta.HapticFeedback.selectionChanged(), M.current = ot, b || w(ot), o?.(ot);
  }, t[3] = v, t[4] = b, t[5] = y, t[6] = o, t[7] = V) : V = t[7];
  const H = V;
  let B;
  t[8] !== g || t[9] !== H || t[10] !== _ ? (B = (et, ot) => {
    const ct = ot === void 0 ? rr.GENTLE : ot;
    g || (lr(_, -(et - 1) * Ri, ct), H(et));
  }, t[8] = g, t[9] = H, t[10] = _, t[11] = B) : B = t[11];
  const U = B;
  let I;
  t[12] !== g || t[13] !== y || t[14] !== H || t[15] !== _ ? (I = () => {
    if (g)
      return;
    const et = j2(_.get(), y);
    et !== R.current && H(et);
  }, t[12] = g, t[13] = y, t[14] = H, t[15] = _, t[16] = I) : I = t[16];
  const P = I;
  let it;
  t[17] !== g || t[18] !== y || t[19] !== H || t[20] !== _ ? (it = (et, ot) => {
    if (g)
      return;
    const ct = _.get(), ft = ot.velocity.x, nt = ct + ft * y_, mt = j2(nt, y), ut = -(mt - 1) * Ri;
    lr(_, ut, {
      ...rr.SNAP,
      velocity: ft
    }), H(mt);
  }, t[17] = g, t[18] = y, t[19] = H, t[20] = _, t[21] = it) : it = t[21];
  const J = it;
  let $, X;
  t[22] !== b || t[23] !== y || t[24] !== i || t[25] !== _ ? ($ = () => {
    !b || i === void 0 || i !== M.current && (M.current = i, lr(_, -(A2(i, y) - 1) * Ri, rr.GENTLE));
  }, X = [i, b, y, _], t[22] = b, t[23] = y, t[24] = i, t[25] = _, t[26] = $, t[27] = X) : ($ = t[26], X = t[27]), T.useEffect($, X);
  const F = -(y - 1) * Ri;
  let tt;
  t[28] !== F ? (tt = {
    left: F,
    right: 0
  }, t[28] = F, t[29] = tt) : tt = t[29];
  const dt = tt;
  let O;
  t[30] !== y ? (O = Array.from({
    length: y - wr + 1
  }, v_), t[30] = y, t[31] = O) : O = t[31];
  const q = O;
  let Y;
  return t[32] !== U || t[33] !== C || t[34] !== dt || t[35] !== P || t[36] !== J || t[37] !== L || t[38] !== q || t[39] !== _ ? (Y = {
    currentValue: C,
    shouldAnimate: L,
    x: _,
    handleDrag: P,
    handleDragEnd: J,
    animateToValue: U,
    dragConstraints: dt,
    ticks: q,
    min: wr
  }, t[32] = U, t[33] = C, t[34] = dt, t[35] = P, t[36] = J, t[37] = L, t[38] = q, t[39] = _, t[40] = Y) : Y = t[40], Y;
};
function v_(n, t) {
  return wr + t;
}
const b_ = (n) => {
  const t = jt.c(16), {
    value: i,
    label: l,
    index: o,
    x: c,
    radius: u,
    onSelect: d
  } = n;
  let p;
  t[0] !== o || t[1] !== u ? (p = (A) => eM(o * Ri + A, u, "horizontal"), t[0] = o, t[1] = u, t[2] = p) : p = t[2];
  const y = Uh(c, p), g = Uh(y, x_);
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
    className: d_,
    children: j
  }), t[9] = j, t[10] = w) : w = t[10];
  let C;
  t[11] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (C = /* @__PURE__ */ h.jsx("span", {
    className: h_
  }), t[11] = C) : C = t[11];
  let x;
  return t[12] !== v || t[13] !== b || t[14] !== w ? (x = /* @__PURE__ */ h.jsxs(Ca, {
    className: f_,
    style: v,
    onClick: b,
    children: [w, C]
  }), t[12] = v, t[13] = b, t[14] = w, t[15] = x) : x = t[15], x;
};
function x_(n) {
  return n ? "visible" : "hidden";
}
const S_ = /* @__PURE__ */ h.jsx("div", {
  className: o_
}), w_ = 5, C_ = (n) => {
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
    ariaValueText: C,
    dragAreaRef: x
  } = n, A = T.useRef(null), R = T.useRef(!1), [M, _] = T.useState(250), L = VA(), {
    currentValue: N,
    x: D,
    handleDrag: V,
    handleDragEnd: H,
    animateToValue: B,
    dragConstraints: U,
    ticks: I,
    min: P
  } = g_({
    value: t,
    defaultValue: i,
    onChange: l,
    max: o,
    disabled: d,
    enableHaptic: p
  });
  T.useLayoutEffect(() => {
    const ut = A.current;
    if (!ut)
      return;
    const yt = () => {
      ut.clientWidth > 0 && _(ut.clientWidth / 2);
    };
    yt();
    const xt = new ResizeObserver(yt);
    return xt.observe(ut), () => xt.disconnect();
  }, []), T.useEffect(() => {
    const ut = x?.current;
    if (!ut || d)
      return;
    const yt = (xt) => L.start(xt);
    return ut.addEventListener("pointerdown", yt), () => ut.removeEventListener("pointerdown", yt);
  }, [x, L, d]);
  const it = (ut) => {
    d || R.current || B(ut);
  }, J = (ut) => {
    if (d)
      return;
    const yt = {
      ArrowLeft: () => B(Math.max(P, N - 1)),
      ArrowDown: () => B(Math.max(P, N - 1)),
      ArrowRight: () => B(Math.min(o, N + 1)),
      ArrowUp: () => B(Math.min(o, N + 1)),
      Home: () => B(P),
      End: () => B(o)
    }[ut.key];
    yt && (ut.preventDefault(), yt());
  }, $ = y ? `${C2} ${y}` : C2, X = d || void 0, F = b ? /* @__PURE__ */ h.jsxs("div", {
    className: l_,
    children: [/* @__PURE__ */ h.jsx(Lh, {
      className: T2,
      onClick: () => B(P),
      disabled: d,
      whileTap: d ? void 0 : {
        scale: 0.95
      },
      children: "Min"
    }), /* @__PURE__ */ h.jsx(Lh, {
      className: T2,
      onClick: () => B(o),
      disabled: d,
      whileTap: d ? void 0 : {
        scale: 0.95
      },
      children: "Max"
    })]
  }) : null, tt = v ? /* @__PURE__ */ h.jsxs("div", {
    className: c_,
    children: [c, /* @__PURE__ */ h.jsx(Ks, {
      variant: "number",
      animation: "snappy",
      style: {
        color: "inherit",
        fontSize: "inherit"
      },
      children: N
    }), u]
  }) : null, dt = d || void 0, O = d ? -1 : 0, q = {
    x: D
  }, Y = d ? !1 : "x", et = !x, ot = () => {
    R.current = !1;
  }, ct = (ut, yt) => {
    Math.abs(yt.offset.x) > w_ && (R.current = !0), V();
  }, ft = I.map((ut, yt) => /* @__PURE__ */ h.jsx(b_, {
    value: ut,
    label: g ? g(ut) : ut,
    index: yt,
    x: D,
    radius: M,
    onSelect: it
  }, ut)), nt = /* @__PURE__ */ h.jsx(Ca, {
    className: u_,
    style: q,
    drag: Y,
    dragControls: L,
    dragListener: et,
    dragConstraints: U,
    dragElastic: 0.1,
    dragMomentum: !1,
    onPointerDown: ot,
    onDrag: ct,
    onDragEnd: H,
    children: ft
  }), mt = /* @__PURE__ */ h.jsxs("div", {
    ref: A,
    className: r_,
    role: "slider",
    "aria-label": w,
    "aria-valuemin": P,
    "aria-valuemax": o,
    "aria-valuenow": N,
    "aria-valuetext": C,
    "aria-disabled": dt,
    tabIndex: O,
    onKeyDown: J,
    children: [S_, nt]
  });
  return /* @__PURE__ */ h.jsxs("div", {
    className: $,
    "data-disabled": X,
    "data-indicator": j,
    children: [F, tt, mt]
  });
}, ei = (n) => {
  const t = jt.c(2), {
    children: i
  } = n;
  let l;
  return t[0] !== i ? (l = /* @__PURE__ */ h.jsx(i3, {
    children: /* @__PURE__ */ h.jsx(EE, {
      children: /* @__PURE__ */ h.jsx(P8, {
        children: /* @__PURE__ */ h.jsx(r3, {
          children: i
        })
      })
    })
  }), t[0] = i, t[1] = l) : l = t[1], l;
}, T_ = (n) => /* @__PURE__ */ T.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ T.createElement("g", { id: "24_icon-fill/home" }, /* @__PURE__ */ T.createElement("path", { id: "Vector", d: "M11.2921 3.10288C11.7572 2.98914 12.243 2.98915 12.7081 3.10288C13.2396 3.23288 13.709 3.55457 14.2432 3.92027L19.2442 7.33335C19.6706 7.62361 20.0467 7.87916 20.3282 8.22788C20.5749 8.53357 20.7603 8.88486 20.8731 9.26206C21.0018 9.69232 21.0007 10.1491 21.0001 10.6673V16.9613C21.0001 17.4921 21.0004 17.9503 20.9698 18.3275C20.9375 18.7256 20.8656 19.1213 20.6729 19.5023C20.3853 20.0709 19.9269 20.5339 19.3624 20.8236C18.9841 21.0177 18.5907 21.0889 18.1954 21.1214C17.8209 21.1523 17.366 21.1527 16.8389 21.1527H7.16121C6.63427 21.1527 6.17922 21.1523 5.80476 21.1214C5.40975 21.0889 5.01682 21.0175 4.63875 20.8236C4.07426 20.5339 3.61484 20.0709 3.32722 19.5023C3.13458 19.1213 3.06265 18.7255 3.03035 18.3275C2.99975 17.9503 3.00006 17.4921 3.00008 16.9613V10.6673C2.99948 10.1491 2.99933 9.69232 3.12801 9.26206C3.24091 8.8848 3.42612 8.53359 3.67293 8.22788C3.95441 7.87922 4.32962 7.62355 4.75593 7.33335L9.75691 3.92027C10.2911 3.55462 10.7606 3.23292 11.2921 3.10288ZM10.5001 12.0882C9.94779 12.0882 9.50008 12.5359 9.50008 13.0882V16.1244C9.50008 16.6767 9.94779 17.1244 10.5001 17.1244H13.5001C14.0524 17.1244 14.5001 16.6767 14.5001 16.1244V13.0882C14.5001 12.5359 14.0524 12.0882 13.5001 12.0882H10.5001Z", fill: "currentColor" }))), j_ = (n) => /* @__PURE__ */ T.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ T.createElement("g", { id: "24_icon-fill/calendar" }, /* @__PURE__ */ T.createElement("path", { id: "Union", d: "M19.6748 10.7998C19.9782 10.7998 20.1303 10.7997 20.2441 10.8633C20.3246 10.9083 20.3915 10.9752 20.4365 11.0557C20.5001 11.1695 20.5 11.3216 20.5 11.625V13.9004C20.5 16.329 20.5 17.5435 19.9902 18.4541C19.6298 19.0977 19.0977 19.6298 18.4541 19.9902C17.5435 20.5 16.329 20.5 13.9004 20.5H10.0996C7.67103 20.5 6.4565 20.5 5.5459 19.9902C4.90227 19.6298 4.37022 19.0977 4.00977 18.4541C3.5 17.5435 3.5 16.329 3.5 13.9004V11.625C3.5 11.3216 3.49986 11.1695 3.56348 11.0557C3.60853 10.9752 3.67541 10.9083 3.75586 10.8633C3.86967 10.7997 4.02177 10.7998 4.3252 10.7998H19.6748ZM16 1.5C16.5523 1.5 17 1.94772 17 2.5V3.58984C17.5949 3.66023 18.0539 3.78571 18.4541 4.00977C19.0977 4.37022 19.6298 4.90227 19.9902 5.5459C20.3615 6.20916 20.4605 7.03367 20.4873 8.37109C20.4933 8.67145 20.4965 8.8223 20.4336 8.93848C20.3896 9.01965 20.3215 9.08906 20.2412 9.13477C20.1263 9.20009 19.9733 9.2002 19.668 9.2002H4.33203C4.02672 9.2002 3.87368 9.20009 3.75879 9.13477C3.67854 9.08906 3.61044 9.01965 3.56641 8.93848C3.50351 8.8223 3.50669 8.67145 3.5127 8.37109C3.53947 7.03367 3.63847 6.20916 4.00977 5.5459C4.37022 4.90227 4.90227 4.37022 5.5459 4.00977C5.94613 3.78571 6.40508 3.66023 7 3.58984V2.5C7 1.94772 7.44772 1.5 8 1.5C8.55228 1.5 9 1.94772 9 2.5V3.50488C9.33664 3.50264 9.70183 3.5 10.0996 3.5H13.9004C14.2982 3.5 14.6634 3.50264 15 3.50488V2.5C15 1.94772 15.4477 1.5 16 1.5Z", fill: "#3D3C3A" }))), au = (n) => /* @__PURE__ */ T.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ T.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ T.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "#3D3C3A" }), /* @__PURE__ */ T.createElement("path", { id: "Vector 234255039", d: "M9 12.439L11.1818 14.8564L13.0909 11.8347L14.0455 10.3238L14.5227 9.56836", stroke: "white", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }))), A_ = (n) => /* @__PURE__ */ T.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ T.createElement("path", { d: "M4 12.7778L9.75048 19.4689C9.97414 19.7292 10.3875 19.6919 10.561 19.3959L19 5", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round" })), Yh = (n) => /* @__PURE__ */ T.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ T.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ T.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "#3D3C3A" }), /* @__PURE__ */ T.createElement("path", { id: "Vector 234255931", d: "M12 12.5V8", stroke: "white", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ T.createElement("circle", { id: "Ellipse 253668", cx: 1, cy: 1, r: 1, transform: "matrix(1 0 0 -1 11 17)", fill: "white" }))), E_ = (n) => /* @__PURE__ */ T.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ T.createElement("g", { id: "24_icon-fill/clock" }, /* @__PURE__ */ T.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5ZM12 6.2002C11.5582 6.2002 11.2002 6.55817 11.2002 7V12C11.2002 12.281 11.3479 12.541 11.5889 12.6855L14.0889 14.1855C14.4677 14.4127 14.9583 14.2899 15.1855 13.9111C15.4127 13.5323 15.2899 13.0417 14.9111 12.8145L12.7998 11.5469V7C12.7998 6.55817 12.4418 6.2002 12 6.2002Z", fill: "currentColor" }))), M_ = (n) => /* @__PURE__ */ T.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ T.createElement("g", { id: "24_icon-fill/heart" }, /* @__PURE__ */ T.createElement("path", { id: "Vector", fillRule: "evenodd", clipRule: "evenodd", d: "M12 6.34213C13.1016 4.86137 14.8294 3.86287 16.9203 4.05233C19.9439 4.3263 22.0001 6.73448 22.0001 9.87524C22.0001 12.7458 20.4285 15.1633 18.5183 16.9571C16.6026 18.756 14.2269 20.0464 12.319 20.6691C12.1117 20.7368 11.8884 20.7368 11.6811 20.6691C9.77325 20.0464 7.39752 18.756 5.48179 16.9571C3.57156 15.1633 2 12.7458 2 9.87524C2 6.73448 4.05617 4.3263 7.07975 4.05233C9.17073 3.86287 10.8984 4.86142 12 6.34213Z", fill: "currentColor" }))), __ = (n) => /* @__PURE__ */ T.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ T.createElement("g", { id: "24_icon-fill/cup" }, /* @__PURE__ */ T.createElement("path", { id: "Vector", fillRule: "evenodd", clipRule: "evenodd", d: "M12.9992 3.02148C17.9698 3.02148 21.9992 5.27629 21.9992 8.05772C21.9992 12.0867 20.9992 21.1519 12.9992 21.1519C9.14215 21.1518 6.91501 19.043 5.63991 16.4088L4.98464 16.5417C2.90427 16.9606 0.88686 15.5799 0.507098 13.4776C0.136993 11.4266 1.46695 9.45421 3.49635 9.04529L4.01491 8.94004C4.0039 8.6258 3.99928 8.33024 3.99928 8.05772C3.99928 5.27633 8.02884 3.02156 12.9992 3.02148ZM3.88796 11.0204C2.92844 11.2139 2.30006 12.1467 2.47487 13.1166C2.65441 14.111 3.60814 14.7636 4.59206 14.5654L4.89284 14.5045C4.52286 13.3122 4.29975 12.0906 4.16823 10.9634L3.88796 11.0204ZM12.9992 5.03598C9.13341 5.03604 5.99928 6.38889 5.99928 8.05772C5.99928 9.72654 9.13341 11.0794 12.9992 11.0795C16.8652 11.0795 19.9992 9.72657 19.9992 8.05772C19.9992 6.38886 16.8652 5.03598 12.9992 5.03598Z", fill: "currentColor" }))), R_ = (n) => /* @__PURE__ */ T.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ T.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ T.createElement("path", { id: "Vector 234255937", d: "M3.52765 9.90413C0.911528 15.9537 3.96635 21.1957 8.35342 22.5511C8.84167 22.702 9.19067 22.0789 8.92321 21.6434C8.19965 20.4654 7.47887 18.5753 8.56051 16.6478C8.64224 16.5022 8.85072 16.5146 8.93197 16.6605C9.95802 18.5031 10.9317 18.5031 10.9317 18.5031C10.9317 18.5031 8.86679 14.8896 11.7788 12.1893C11.8911 12.0851 12.0723 12.1349 12.1315 12.2762C13.3539 15.1909 17.8248 17.3143 14.8582 21.9344C14.6119 22.3181 14.8717 22.8388 15.3226 22.7712C20.4424 22.0038 22.208 16.0069 20.1757 11.4342C18.0862 6.73288 13.4876 7.04975 11.6828 2.26117C11.5637 1.9453 11.198 1.78379 10.9122 1.96333C7.99596 3.79495 6.34996 7.94875 7.37329 13.0655C6.01592 12.7262 5.08207 11.1162 4.57178 9.95361C4.37654 9.50881 3.72046 9.45827 3.52765 9.90413Z", fill: "currentColor" }))), m3 = (n) => /* @__PURE__ */ T.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ T.createElement("g", { id: "24_icon-fill/cross" }, /* @__PURE__ */ T.createElement("path", { id: "Vector", d: "M16.2929 6.06242C16.6834 5.6719 17.3164 5.67191 17.707 6.06242C18.0975 6.45295 18.0975 7.08596 17.707 7.47649L13.414 11.7695L17.707 16.0624C18.0975 16.4529 18.0975 17.086 17.707 17.4765C17.3164 17.867 16.6834 17.867 16.2929 17.4765L11.9999 13.1835L7.70696 17.4765C7.31643 17.867 6.68342 17.867 6.29289 17.4765C5.90238 17.086 5.90237 16.4529 6.29289 16.0624L10.5859 11.7695L6.29289 7.47649C5.90237 7.08596 5.90237 6.45295 6.29289 6.06242C6.68342 5.6719 7.31643 5.6719 7.70696 6.06242L11.9999 10.3554L16.2929 6.06242Z", fill: "#3D3C3A" }))), p3 = (n) => /* @__PURE__ */ T.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ T.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ T.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "currentColor" }), /* @__PURE__ */ T.createElement("path", { id: "Vector 234255931", d: "M12 12V16", stroke: "var(--background)", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ T.createElement("circle", { id: "Ellipse 253668", cx: 12, cy: 8.5, r: 1, fill: "var(--background)" }))), Zs = (n) => /* @__PURE__ */ T.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ T.createElement("g", { id: "24_icon-fill/plus" }, /* @__PURE__ */ T.createElement("path", { id: "Vector", transform: "translate(5 4.769)", d: "M6 13C6 13 6 8 6 8C6 8 1 8 1 8C0.448 8 0 7.552 0 7C0 6.448 0.448 6 1 6C1 6 6 6 6 6C6 6 6 1 6 1C6 0.448 6.448 0 7 0C7.552 0 8 0.448 8 1C8 1 8 6 8 6C8 6 13 6 13 6C13.552 6 14 6.448 14 7C14 7.552 13.552 8 13 8C13 8 8 8 8 8C8 8 8 13 8 13C8 13.552 7.552 14 7 14C6.448 14 6 13.552 6 13Z", fill: "currentColor" }))), D_ = (n) => /* @__PURE__ */ T.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ T.createElement("path", { d: "M16.5791 4.53223C18.0851 4.53223 18.8049 4.65337 19.5361 5.04297C20.1593 5.3751 20.654 5.86826 20.9873 6.48926C21.3783 7.21793 21.5 7.93502 21.5 9.43555V14.7383C21.5 16.2388 21.3783 16.9559 20.9873 17.6846C20.654 18.3056 20.1593 18.7987 19.5361 19.1309C18.8049 19.5205 18.0851 19.6416 16.5791 19.6416H7.4209C5.91493 19.6416 5.19509 19.5205 4.46387 19.1309C3.84066 18.7987 3.34603 18.3056 3.0127 17.6846C2.62169 16.9559 2.50002 16.2388 2.5 14.7383V9.43555C2.50003 7.93502 2.62167 7.21793 3.0127 6.48926C3.34603 5.86826 3.84066 5.3751 4.46387 5.04297C5.19509 4.65337 5.91494 4.53223 7.4209 4.53223H16.5791ZM10.1436 9.44043C9.76724 8.73388 8.75424 8.73388 8.37793 9.44043L5.78223 14.3125C5.42805 14.9784 5.91082 15.7829 6.66504 15.7832H17.0791C17.8878 15.7831 18.3617 14.8726 17.8984 14.21L16.2656 11.877C15.8829 11.3303 15.0819 11.3051 14.665 11.8262L12.998 13.9092C12.8634 14.0774 12.6005 14.0532 12.499 13.8633L10.1436 9.44043Z", fill: "currentColor" })), N_ = (n) => /* @__PURE__ */ T.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...n }, /* @__PURE__ */ T.createElement("path", { d: "M14.0996 3.5C16.3398 3.5 17.4608 3.49957 18.3164 3.93555C19.0689 4.31902 19.681 4.93109 20.0645 5.68359C20.5004 6.53924 20.5 7.66018 20.5 9.90039V14.0996C20.5 16.3398 20.5004 17.4608 20.0645 18.3164C19.681 19.0689 19.0689 19.681 18.3164 20.0645C17.4608 20.5004 16.3398 20.5 14.0996 20.5H9.90039C7.66018 20.5 6.53924 20.5004 5.68359 20.0645C4.93109 19.681 4.31902 19.0689 3.93555 18.3164C3.49957 17.4608 3.5 16.3398 3.5 14.0996V9.90039C3.5 7.66018 3.49957 6.53924 3.93555 5.68359C4.31902 4.93109 4.93109 4.31902 5.68359 3.93555C6.53924 3.49957 7.66018 3.5 9.90039 3.5H14.0996ZM9.5 8.2002C9.05817 8.2002 8.7002 8.55817 8.7002 9C8.7002 9.44183 9.05817 9.7998 9.5 9.7998H11.2002V15.5C11.2002 15.9418 11.5582 16.2998 12 16.2998C12.4418 16.2998 12.7998 15.9418 12.7998 15.5V9.7998H14.5C14.9418 9.7998 15.2998 9.44183 15.2998 9C15.2998 8.55817 14.9418 8.2002 14.5 8.2002H9.5Z", fill: "currentColor" })), O_ = {
  success: au,
  error: Yh,
  warning: Yh,
  info: p3
};
let Yc = null, E2 = !1;
const Ph = [];
function L_() {
  const n = SM();
  return T.useEffect(() => (Yc = n.show, Ph.length && Ph.splice(0).forEach((t) => n.show(t)), () => {
    Yc = null;
  })), null;
}
function $_() {
  if (E2 || typeof document > "u") return;
  E2 = !0;
  const n = document.createElement("div");
  n.setAttribute("data-aiwa-toast-host", ""), document.body.appendChild(n), Ns.createRoot(n).render(
    /* @__PURE__ */ h.jsx(i3, { children: /* @__PURE__ */ h.jsx(r3, { children: /* @__PURE__ */ h.jsx(L_, {}) }) })
  );
}
function y3(n, t = {}) {
  const i = typeof n == "string" ? { title: n, ...t } : { ...n };
  if (i.type && !i.icon) {
    const l = O_[i.type];
    l && (i.icon = /* @__PURE__ */ h.jsx(l, { className: "aiwa-toast-icon" }));
  }
  return $_(), Yc ? Yc(i) : (Ph.push(i), null);
}
function k_() {
  typeof window < "u" && (window.aiwaToast = y3);
}
const Qn = (n, ...t) => {
  const i = window[n];
  return typeof i == "function" ? i(...t) : void 0;
}, Ue = (n, ...t) => {
  const i = window[n];
  return typeof i == "function" ? i(...t) : null;
}, Yt = (n, t = {}) => {
  const i = Ue("aiwaApi", n, t);
  return i && typeof i.then == "function" ? i : Promise.reject(new Error("API bridge is unavailable"));
}, Mt = (n, t = {}) => y3(n, t), g3 = async (n, ...t) => {
  const i = await Ue(n, ...t);
  if (i && typeof i == "object" && i.ok === !0) return i;
  const l = i && typeof i == "object" ? i.message || i.text || i.error?.message : "";
  throw new Error(l || "Не удалось подтвердить сохранение. Попробуй ещё раз.");
}, Gh = (n) => `${Math.round(Number(n) || 0).toLocaleString("ru-RU")} ккал`, v3 = (n) => Qn("track", n), B_ = () => {
  const n = window.Telegram?.WebApp;
  n?.close && n.close();
}, Qs = async ({ nudge: n = !0, topic: t = "" } = {}) => {
  n && await Promise.race([
    Yt("/api/nudge", t ? { topic: t } : {}).catch(() => null),
    new Promise((c) => setTimeout(c, 2e3))
  ]);
  const i = window.Telegram?.WebApp, l = Ue("aiwaData")?.bot_username, o = typeof i?.openTelegramLink == "function" && (typeof i.isVersionAtLeast != "function" || i.isVersionAtLeast("6.1"));
  l && o && i.openTelegramLink(`https://t.me/${l}`), B_();
}, V_ = () => {
  const n = window.Telegram?.WebApp;
  return typeof n?.showPopup != "function" ? !1 : typeof n.isVersionAtLeast != "function" || n.isVersionAtLeast("6.2");
}, se = (n, t) => ({
  "aria-label": n,
  onClick: t,
  onKeyDown: (i) => {
    (i.key === "Enter" || i.key === " ") && (i.preventDefault(), t());
  },
  role: "button",
  tabIndex: 0
});
function b3() {
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
function Ze() {
  const n = typeof window.aiwaData == "function" ? window.aiwaData() : window.aiwaData, t = String(n?.today || "");
  if (/^\d{4}-\d{2}-\d{2}$/.test(t)) return t;
  const i = Object.fromEntries(
    new Intl.DateTimeFormat("en", { timeZone: "Europe/Moscow", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(/* @__PURE__ */ new Date()).filter((l) => l.type !== "literal").map((l) => [l.type, l.value])
  );
  return `${i.year}-${i.month}-${i.day}`;
}
const z_ = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"], U_ = (n = 30) => {
  const t = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    const l = /* @__PURE__ */ new Date(`${Ze()}T12:00:00`);
    l.setDate(l.getDate() - i);
    const o = `${l.getFullYear()}-${String(l.getMonth() + 1).padStart(2, "0")}-${String(l.getDate()).padStart(2, "0")}`;
    t.push({ iso: o, date: String(l.getDate()), label: z_[l.getDay()], today: i === 0 });
  }
  return t;
}, H_ = /^\d{4}-\d{2}-\d{2}$/, q_ = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  timeZone: "Europe/Moscow"
}), x3 = Ze, S3 = (n) => {
  const t = String(n || "");
  if (!H_.test(t)) return "";
  const i = /* @__PURE__ */ new Date(`${t}T00:00:00Z`);
  return !Number.isNaN(i.getTime()) && i.toISOString().slice(0, 10) === t ? t : "";
}, or = (n) => {
  const t = S3(n), i = Ze();
  return t && t <= i ? t : "";
}, Or = (n) => {
  const t = S3(n);
  if (!t) return "";
  const i = /* @__PURE__ */ new Date(`${t}T12:00:00+03:00`);
  return Number.isNaN(i.getTime()) ? "" : q_.format(i);
}, Xh = /* @__PURE__ */ new Set();
let Ec = "";
const cr = () => {
  const n = or(Ue("aiwaSelectedDay")), t = or(Ec);
  return n || t || Ze();
}, Y_ = () => {
  const n = Ue("aiwaDayStrip");
  return Array.isArray(n) && n.length ? n : U_(30);
};
function w3(n) {
  const t = or(n);
  if (!t) return cr();
  const i = typeof window.aiwaSelectedDay == "function", l = typeof window.aiwaSelectDay == "function";
  return t === cr() && (i || !l) ? cr() : (Qn("aiwaSelectDay", t), Ec = or(Ue("aiwaSelectedDay")) || (i ? or(Ec) || Ze() : t), Xh.forEach((c) => c()), Ec);
}
const P_ = (n) => (Xh.add(n), () => {
  Xh.delete(n);
});
function dp() {
  return T.useSyncExternalStore(P_, cr, cr);
}
function hp({ title: n, size: t = "regular", ...i }) {
  return t === "large" ? /* @__PURE__ */ h.jsx("div", { className: "aiwa-panel-header is-large", children: /* @__PURE__ */ h.jsx(pt, { as: "h1", variant: "title1", weight: "bold", children: n }) }) : /* @__PURE__ */ h.jsx("div", { className: "aiwa-panel-header", children: /* @__PURE__ */ h.jsx(zE, { ...i, children: n }) });
}
function C3() {
  const n = typeof window > "u" ? {} : window, t = typeof n.aiwaData == "function" ? n.aiwaData() : n.aiwaData, i = n.Telegram?.WebApp?.initDataUnsafe?.user;
  return (t?.name || i?.first_name || "").trim();
}
function T3({ className: n = "", onClick: t, label: i = "Открыть профиль" }) {
  const c = (typeof window > "u" ? {} : window).Telegram?.WebApp?.initDataUnsafe?.user?.photo_url, u = (C3()[0] || "•").toUpperCase(), d = `aiwa-avatar-initial${n ? ` ${n}` : ""}`, p = /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
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
const G_ = 50;
let M2 = -1 / 0;
function X_() {
  if (typeof window > "u") return;
  if (typeof window.haptic == "function") {
    window.haptic("impact", "light");
    return;
  }
  const n = performance.now();
  if (n - M2 < G_) return;
  M2 = n;
  const t = window.Telegram?.WebApp;
  if (t?.HapticFeedback && !(t.isVersionAtLeast && !t.isVersionAtLeast("6.1")))
    try {
      t.HapticFeedback.impactOccurred("light");
    } catch {
    }
}
const K_ = 140;
function Z_({ days: n, selectedIso: t = "", onSelect: i, onTick: l, onReset: o, dragAreaRef: c }) {
  const u = T.useRef(null), d = c || u, p = (n || []).filter((U) => !U.disabled), y = p.map((U) => U.iso).join("|"), g = `${t}\0${y}`, v = p.findIndex((U) => U.iso === t), b = (v >= 0 ? v : p.length - 1) + 1, j = p[b - 1]?.iso || "", [w, C] = T.useState(() => ({ key: g, value: b })), x = w.key === g ? w.value : b, A = p[x - 1], R = T.useRef(null);
  R.current = { openable: p, selectedIso: t, onSelect: i, onReset: o, controlKey: g };
  const M = T.useRef(j), _ = T.useRef(0), L = T.useRef(!1), N = T.useRef(null), D = (U, I) => {
    if (L.current || M.current !== U) return;
    const P = R.current;
    if (P.controlKey !== I) return;
    const it = P.openable.find((F) => F.iso === U);
    if (!it || it.iso === P.selectedIso || typeof P.onSelect != "function") return;
    const J = P.onSelect(it);
    if (typeof J != "string" || J === it.iso) return;
    let $ = P.openable.findIndex((F) => F.iso === J);
    $ < 0 && ($ = P.openable.findIndex((F) => F.iso === P.selectedIso)), $ < 0 && ($ = P.openable.length - 1);
    const X = P.openable[$]?.iso || "";
    M.current = X, C({ key: I, value: $ + 1 }), typeof P.onReset == "function" && P.onReset();
  }, V = (U, I = g) => {
    clearTimeout(_.current), _.current = setTimeout(() => D(U, I), K_);
  };
  N.current = V, T.useEffect(() => () => clearTimeout(_.current), []), T.useLayoutEffect(() => {
    M.current = j, clearTimeout(_.current);
  }, [j, g]), T.useEffect(() => {
    const U = d.current;
    if (!U) return;
    const I = () => {
      L.current = !0, clearTimeout(_.current);
    }, P = () => {
      if (!L.current) return;
      L.current = !1;
      const it = M.current;
      it && N.current?.(it, R.current.controlKey);
    };
    return U.addEventListener("pointerdown", I), window.addEventListener("pointerup", P), window.addEventListener("pointercancel", P), () => {
      U.removeEventListener("pointerdown", I), window.removeEventListener("pointerup", P), window.removeEventListener("pointercancel", P);
    };
  }, [d, y]);
  const H = (U) => {
    const I = p[U - 1];
    if (!I) return;
    const P = I.iso !== M.current, it = typeof window < "u" && typeof window.aiwaSelectDay == "function";
    P && !it && X_(), M.current = I.iso, C({ key: g, value: U }), typeof l == "function" && l(I), V(I.iso);
  };
  if (!p.length) return null;
  const B = /* @__PURE__ */ h.jsx(
    C_,
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
function Q_(n) {
  const {
    days: t,
    selectedIso: i = "",
    heroValue: l,
    heroLabel: o = "",
    onSelect: c,
    previewDay: u,
    hero: d
  } = n, p = T.useRef(null), [y, g] = T.useState(null), v = T.useRef(null), b = (t || []).find((C) => C.today)?.iso;
  b && i === b && (v.current = { value: l, label: o }), T.useEffect(() => {
    g(null);
  }, [i]);
  const j = (C) => {
    if (typeof d == "function") {
      g({ baseIso: i, iso: C.iso });
      return;
    }
    const x = C.iso === b && v.current ? v.current : typeof u == "function" ? u(C.iso) : null;
    g(x ? {
      baseIso: i,
      iso: C.iso,
      value: x.value,
      label: x.label
    } : null);
  }, w = y?.baseIso === i && y.iso !== i ? y : null;
  return /* @__PURE__ */ h.jsxs("div", { className: "aiwa-day-overview", ref: p, children: [
    /* @__PURE__ */ h.jsx(
      Z_,
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
      /* @__PURE__ */ h.jsx(pt, { variant: "title1", weight: "semibold", children: /* @__PURE__ */ h.jsx(Ks, { variant: "number", animation: "snappy", children: w ? w.value : l }) }),
      /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: /* @__PURE__ */ h.jsx(Ks, { variant: "text", animation: "snappy", children: (w ? w.label : o) || "" }) })
    ] })
  ] });
}
function mp({
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
  const v = dp(), b = i ?? v;
  return /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
    /* @__PURE__ */ h.jsx(
      hp,
      {
        title: n || Or(b),
        left: /* @__PURE__ */ h.jsx(T3, {}),
        onLeft: y,
        leftAriaLabel: "Открыть профиль",
        right: /* @__PURE__ */ h.jsx(j_, {}),
        onRight: g,
        rightAriaLabel: "Открыть календарь"
      }
    ),
    /* @__PURE__ */ h.jsxs("div", { className: "aiwa-overview", children: [
      /* @__PURE__ */ h.jsx(
        Q_,
        {
          days: t ?? Y_(),
          selectedIso: b,
          heroValue: c,
          heroLabel: u,
          hero: d,
          previewDay: o,
          onSelect: l ?? ((j) => w3(j.iso))
        }
      ),
      p
    ] })
  ] });
}
const iu = [
  ["Боль", [["cramps", "Спазмы"], ["head", "Голова"], ["breast", "Грудь"]]],
  ["Настроение", [["irrit", "Раздражительность"], ["anx", "Тревога"], ["low", "Апатия"]]],
  ["Тело", [["tired", "Усталость"], ["bloat", "Вздутие"], ["sweet", "Тянет на сладкое"]]],
  ["Кожа и сон", [["skin", "Высыпания"], ["insomnia", "Плохой сон"]]]
], Kh = {
  // One line each at the bar width: a wrapped hint pushes the bar over the grid.
  period: { label: "Месячные", hint: "нажми на день, чтобы отметить месячные", checked: (n) => n.actualPeriod },
  symptoms: { label: "Симптомы", hint: "нажми на день, чтобы записать симптомы", checked: (n) => n.logged },
  intimacy: { label: "Близость", hint: "нажми на день, чтобы отметить близость", checked: (n) => n.intimacy }
}, F_ = (n) => n.map((t) => ({ value: t, label: Kh[t].label })), I_ = [
  { label: "Месячные", variant: "tinted", token: "--aiwa-phase-menstrual" },
  { label: "Прогноз", variant: "outlined", token: "--aiwa-phase-menstrual" },
  { label: "Овуляция", variant: "tinted", token: "--aiwa-phase-ovulation" },
  { label: "Фолликулярная", variant: "tinted", token: "--aiwa-phase-follicular" },
  { label: "Лютеиновая", variant: "tinted", token: "--aiwa-phase-luteal" },
  { label: "Близость", variant: "tinted", token: "--aiwa-intimacy" }
], j3 = [[1, "Низкая"], [2, "Средняя"], [3, "Высокая"]], A3 = [[1, "Плохое"], [2, "Нормальное"], [3, "Хорошее"]], E3 = [
  { value: "breakfast", label: "Завтрак" },
  { value: "lunch", label: "Обед" },
  { value: "snack", label: "Перекус" },
  { value: "dinner", label: "Ужин" }
], J_ = (n) => ({
  title: n?.title || "",
  kcal: String(n?.kcal ?? ""),
  grams: String(n?.grams ?? ""),
  protein: String(n?.protein ?? ""),
  fat: String(n?.fat ?? ""),
  carbs: String(n?.carbs ?? ""),
  slot: n?.slot || "snack"
}), _2 = ["Силовая", "Кардио", "Пилатес", "Йога", "Ходьба", "Плавание", "Своё"], Ei = {
  Ноги: ["Присед", "Жим ногами", "Выпады", "Болгарские", "Румынская тяга", "Разгибания", "Сгибания", "Икры"],
  Спина: ["Вертикальная тяга", "Горизонтальная тяга", "Тяга в наклоне", "Становая", "Подтягивания", "Гиперэкстензия"],
  Грудь: ["Жим лёжа", "Жим гантелей", "Жим в наклоне", "Сведения", "Отжимания"],
  Плечи: ["Жим стоя", "Махи в стороны", "Махи в наклоне", "Протяжка"],
  Ягодицы: ["Ягодичный мост", "Отведение бедра", "Мах ногой", "Плие-присед"],
  Руки: ["Бицепс", "Молоток", "Разгибания трицепс", "Французский жим"],
  Кор: ["Планка", "Скручивания", "Подъём ног", "Русский твист"]
}, W_ = {
  Силовая: [],
  Кардио: ["Бег", "Велотренажёр", "Эллипс", "Гребля", "Скакалка"],
  Пилатес: ["Мат", "Реформер", "Мобилити", "Кор"],
  Йога: ["Виньяса", "Хатха", "Растяжка", "Дыхание"],
  Ходьба: ["Прогулка", "Скандинавская", "Быстрая ходьба"],
  Плавание: ["Кроль", "Брасс", "На спине"],
  Своё: []
}, Zh = [
  { value: "cycle", label: "Регулярный цикл" },
  { value: "irregular", label: "Нерегулярный" },
  { value: "preg", label: "Беременность" },
  { value: "meno", label: "Менопауза" },
  { value: "none", label: "Нет месячных" },
  { value: "male", label: "Мужской режим" }
];
function t7(n, ...t) {
  T.useEffect(() => {
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
const R2 = "custom:";
function e7(n) {
  const t = n?.length ? n.flatMap(([, i]) => i) : iu.flatMap(([, i]) => i.flat());
  return new Map(t);
}
function n7({ title: n = "Сегодня", checkin: t, symptomGroups: i, onSelect: l }) {
  const o = t?.symptoms ?? [], c = T.useRef(null);
  if (t7(c, o.length), !o.length) return null;
  const u = e7(i), d = l ?? (() => Qn("openHomePanel", "journal"));
  return /* @__PURE__ */ h.jsxs("div", { className: "aiwa-today", children: [
    /* @__PURE__ */ h.jsx(pt, { className: "aiwa-today-title", variant: "body", weight: "semibold", children: n }),
    /* @__PURE__ */ h.jsx("div", { className: "aiwa-today-chips", role: "group", "aria-label": n, ref: c, children: o.map((p) => {
      const y = p.startsWith(R2) ? p.slice(R2.length) : u.get(p) ?? p;
      return /* @__PURE__ */ h.jsx(
        an,
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
const D2 = {
  primary: "filled",
  secondary: "filled",
  secondaryCanvas: "filled",
  outlined: "outlined"
};
function Ce({
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
    Wa,
    {
      ...p,
      ...t ? { className: t } : {},
      variant: D2[n] || D2.primary,
      label: l ? /* @__PURE__ */ h.jsxs("span", { className: "aiwa-button-spinner", children: [
        /* @__PURE__ */ h.jsx(nu, { size: 20, focusable: "false", "aria-hidden": "true" }),
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
const a7 = 5e3, M3 = (n, t) => Array.from(
  { length: t },
  (i, l) => `/assets/${n}/frame-${String(l).padStart(3, "0")}.png`
), i7 = M3("aiwa-sequence", 182), pp = M3("aiwa-card-sequence", 193);
function yp({ size: n, frames: t = i7, pauseMs: i = a7 }) {
  return /* @__PURE__ */ h.jsx(
    "span",
    {
      className: "aiwa-sequence",
      style: { "--aiwa-sequence-size": `${n}px` },
      "data-aiwa-sequence": "true",
      "data-sequence": t === pp ? "card" : "default",
      "data-pause-ms": i,
      "data-frame": 0,
      "aria-hidden": "true",
      children: /* @__PURE__ */ h.jsx("img", { src: t[0], alt: "", draggable: "false", decoding: "sync" })
    }
  );
}
function s7() {
  return /* @__PURE__ */ h.jsxs("div", { className: "aiwa-paper-ai-heading", children: [
    /* @__PURE__ */ h.jsx(yp, { size: 58, frames: pp, pauseMs: 0 }),
    /* @__PURE__ */ h.jsx("div", { children: /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "semibold", children: "Айва AI" }) })
  ] });
}
function l7(n) {
  return /* @__PURE__ */ h.jsx(xa, { ...n, "data-aiwa-cell": "true" });
}
const Tt = Object.assign(l7, {
  Start: xa.Start,
  End: xa.End,
  Part: xa.Part,
  Text: xa.Text,
  Editable: xa.Editable,
  Switch: xa.Switch
});
function Cr({
  message: n,
  detail: t,
  onDiscuss: i,
  chip: l = "",
  className: o = ""
}) {
  return /* @__PURE__ */ h.jsx(gt.Item, { className: `aiwa-insight-section ${o}`.trim(), children: /* @__PURE__ */ h.jsx(Tt, { "data-aiwa-insight-cell": "true", tappable: !1, children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-insight-content", children: [
    /* @__PURE__ */ h.jsx(s7, {}),
    l ? /* @__PURE__ */ h.jsx("span", { className: "aiwa-insight-chip", children: l }) : null,
    /* @__PURE__ */ h.jsx(pt, { className: "aiwa-insight-message", variant: "body", weight: "regular", children: n }),
    t ? /* @__PURE__ */ h.jsx(pt, { className: "aiwa-insight-detail", variant: "body", weight: "regular", children: t }) : null,
    i ? /* @__PURE__ */ h.jsx(
      Ce,
      {
        variant: "secondary",
        label: "Обсудить с Айвой",
        isFill: !0,
        onClick: i
      }
    ) : null
  ] }) }) });
}
function r7({ aiText: n, aiChip: t = "" }) {
  return /* @__PURE__ */ h.jsx(
    Cr,
    {
      message: n,
      chip: t,
      onDiscuss: () => Qs()
    }
  );
}
function o7({ delay: n }) {
  return n ? /* @__PURE__ */ h.jsxs(gt.Item, { header: n.title, children: [
    /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsx(Tt.Text, { title: n.message, description: n.hint }) }),
    n.canSwitchToPregnancy ? /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ h.jsx(
      Wa,
      {
        variant: "filled",
        label: "Перейти в режим беременности",
        isFill: !0,
        ...se("Перейти в режим беременности", () => Qn("switchPreg"))
      }
    ) }) }) : null
  ] }) : null;
}
function N2({ ok: n, pending: t = !1 }) {
  const i = t ? E_ : n ? au : Yh, l = t ? "aiwa-status is-pending" : n ? "aiwa-status is-ok" : "aiwa-status is-alert", o = t ? "Рассчитывается" : n ? "В пределах нормы" : "Требует внимания";
  return /* @__PURE__ */ h.jsx("span", { className: l, role: "img", "aria-label": o, children: /* @__PURE__ */ h.jsx(i, {}) });
}
const c7 = "Рассчитывается", u7 = (n) => {
  const t = String(n ?? "").trim();
  return !t || t === "—" || t === "–" || t === "-";
};
function f7({ label: n, value: t, ok: i }) {
  const l = u7(t), o = i ? "Значение в пределах нормы" : "Значения вышли за пределы нормы";
  return /* @__PURE__ */ h.jsx(
    Tt,
    {
      "data-aiwa-metric-cell": "true",
      tappable: !1,
      end: l ? /* @__PURE__ */ h.jsx(N2, { pending: !0 }) : /* @__PURE__ */ h.jsx(i_, { content: o, placement: "auto", children: /* @__PURE__ */ h.jsx("span", { className: "aiwa-metric-status-hit", children: /* @__PURE__ */ h.jsx(N2, { ok: i }) }) }),
      children: /* @__PURE__ */ h.jsx(Tt.Text, { title: n, description: l ? c7 : t })
    }
  );
}
function d7({ metrics: n, title: t = "Статистика" }) {
  return n?.length ? /* @__PURE__ */ h.jsx(gt.Item, { header: t, children: n.map((i) => /* @__PURE__ */ h.jsx(f7, { ...i }, i.label)) }) : null;
}
const h7 = T.lazy(() => import("./AiwaWebUiChart-aiwa-v184.js?v=r43").then((n) => ({
  default: n.AiwaWebUiChart
})));
function m7() {
  return /* @__PURE__ */ h.jsx("div", { className: "aiwa-area-chart-state is-loading", role: "status", "aria-label": "График загружается", children: /* @__PURE__ */ h.jsx("span", { className: "aiwa-area-chart-skeleton", "aria-hidden": "true" }) });
}
function O2({ title: n }) {
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
    /* @__PURE__ */ h.jsx(m7, {})
  ] });
}
function p7({
  data: n,
  series: t,
  xKey: i,
  band: l = null,
  loading: o = !1,
  title: c = "Динамика цикла",
  emptyText: u = "Продолжай вести дневник, чтобы увидеть динамику цикла"
}) {
  return o ? /* @__PURE__ */ h.jsx(O2, { title: c }) : /* @__PURE__ */ h.jsx(T.Suspense, { fallback: /* @__PURE__ */ h.jsx(O2, { title: c }), children: /* @__PURE__ */ h.jsx(gt.Item, { header: c, children: /* @__PURE__ */ h.jsx(
    h7,
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
function y7({
  history: n,
  title: t = "История цикла",
  emptyTitle: i = "История пока пуста",
  emptyDescription: l = "Она появится после первой сохранённой менструации."
}) {
  const [o, c] = T.useState(!1), u = n || [], d = o ? u : u.slice(0, 3);
  return /* @__PURE__ */ h.jsxs(gt.Item, { header: t, children: [
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
let Qa = null;
const Qh = /* @__PURE__ */ new Set(), L2 = () => {
  for (const n of Qh) n(!!Qa);
}, Mc = () => !!Qa, _3 = (n) => (Qh.add(n), n(!!Qa), () => Qh.delete(n)), R3 = (n) => {
  if (Qa) return { owner: !1, promise: Qa };
  const t = Promise.resolve().then(() => Yt("/api/report", { period: n })).finally(() => {
    Qa === t && (Qa = null, L2());
  });
  return Qa = t, L2(), { owner: !0, promise: t };
}, g7 = Object.fromEntries(
  iu.flatMap(([, n]) => n)
), v7 = { 1: "низкая энергия", 2: "средняя энергия", 3: "высокая энергия" }, b7 = { 1: "плохое настроение", 2: "нормальное настроение", 3: "хорошее настроение" }, x7 = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }), S7 = (n) => {
  const i = g7[n] || String(n).split(":").pop().replace(/_/g, " ").trim();
  return i ? i[0].toUpperCase() + i.slice(1) : "";
}, w7 = (n) => [
  ...(n.symptoms || []).map(S7),
  v7[n.energy],
  b7[n.mood]
].filter(Boolean).map((i) => i[0].toUpperCase() + i.slice(1)).join(" • ") || "Без деталей", C7 = (n) => {
  const t = /* @__PURE__ */ new Date(`${n}T12:00:00`);
  return Number.isNaN(t.getTime()) ? n : x7.format(t);
};
function T7() {
  const [n, t] = T.useState(null), [i, l] = T.useState(!1), [o, c] = T.useState(Mc);
  T.useEffect(() => {
    Yt("/api/log_history", {}).then((p) => t(p?.items || [])).catch(() => t([]));
  }, []), T.useEffect(() => _3(c), []);
  const u = async () => {
    const { owner: p, promise: y } = R3("all");
    if (!p) return;
    const g = await y.catch(() => null);
    g?.ok && g?.delivered ? b3() : Mt(g?.text || "Выписка временно недоступна", { type: "error" });
  };
  if (!n?.length) return null;
  const d = i ? n : n.slice(0, 3);
  return /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
    /* @__PURE__ */ h.jsxs(gt.Item, { header: "Журнал симптомов", children: [
      d.map((p) => /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsx(Tt.Text, { title: C7(p.d), description: w7(p) }) }, p.d)),
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
      Ce,
      {
        variant: "secondaryCanvas",
        label: "Сформировать выписку",
        loading: o,
        isFill: !0,
        ...se("Сформировать выписку", u)
      }
    ) })
  ] });
}
const th = {
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
}, j7 = (n) => {
  let t = Math.min(Math.max(Math.round(n) || 4, 4), 40);
  for (; t > 4 && !th[t]; ) t -= 1;
  return { week: t, name: th[t][0], size: th[t][1] };
};
function A7({ pregnancy: n }) {
  const [t, i] = T.useState({});
  T.useEffect(() => {
    fetch("/assets/preg/manifest.json?v=1").then((d) => d.ok ? d.json() : {}).then((d) => i(d || {})).catch(() => {
    });
  }, []);
  const l = Math.min(Math.max(Number(n?.week) || 4, 1), 40), o = j7(l), c = t[String(o.week)], u = Math.min(100, Math.max(2, l / 40 * 100));
  return /* @__PURE__ */ h.jsx(gt.Item, { header: "Срок и малыш", children: /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-preg-progress", children: [
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
const Hs = [];
let $2 = !1;
const D3 = () => typeof window < "u" ? window.Telegram?.WebApp?.BackButton : null, E7 = () => Hs[Hs.length - 1]?.(), k2 = () => {
  const n = D3();
  n && (Hs.length ? n.show?.() : n.hide?.());
}, M7 = (n) => {
  const t = D3();
  return t && !$2 && (t.onClick?.(E7), $2 = !0), Hs.push(n), k2(), () => {
    const i = Hs.lastIndexOf(n);
    i !== -1 && Hs.splice(i, 1), k2();
  };
};
function N3(n, t) {
  const i = T.useRef(t);
  i.current = t, T.useEffect(() => {
    if (n)
      return M7(() => i.current?.());
  }, [n]);
}
function Vn({ isOpen: n, onClose: t, onBack: i, children: l, ...o }) {
  return N3(n, i || t), T.useEffect(() => {
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
function su({
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
    an,
    {
      as: "button",
      type: "button",
      mode: "opacity",
      className: `aiwa-chip${o === "canvas" ? " is-on-canvas" : ""}${l ? " is-fill" : ""}${u ? ` ${u}` : ""}`,
      "aria-pressed": t,
      onClick: i,
      ...d,
      children: /* @__PURE__ */ h.jsx(Wa, { variant: t ? "tinted" : "gray", label: p, isFill: l })
    }
  );
}
function Fh({ label: n, active: t, onChange: i, variant: l = "default" }) {
  return /* @__PURE__ */ h.jsx(
    su,
    {
      className: `aiwa-log-toggle is-${l}-toggle`,
      label: n,
      active: t,
      isFill: !0,
      surface: "canvas",
      "aria-label": `${n}: ${t ? "да" : "нет"}`,
      onClick: () => i(!t),
      end: /* @__PURE__ */ h.jsx("span", { className: "aiwa-log-toggle-mark", "aria-hidden": "true", children: t ? /* @__PURE__ */ h.jsx(au, {}) : null })
    }
  );
}
function O3({ label: n, children: t }) {
  return /* @__PURE__ */ h.jsxs("div", { className: "aiwa-log-group", children: [
    /* @__PURE__ */ h.jsx(pt, { className: "aiwa-log-label", variant: "subheadline1", weight: "regular", children: n }),
    /* @__PURE__ */ h.jsx("div", { className: "aiwa-log-choices", role: "group", "aria-label": n, children: t })
  ] });
}
function Pc({ label: n, options: t, value: i, onChange: l }) {
  return /* @__PURE__ */ h.jsx(O3, { label: n, children: t.map(([o, c]) => /* @__PURE__ */ h.jsx(
    su,
    {
      label: c,
      active: i === o,
      onClick: () => l(o)
    },
    o
  )) });
}
function L3({ label: n, options: t, symptoms: i, onToggle: l }) {
  return /* @__PURE__ */ h.jsx(O3, { label: n, children: t.map(([o, c]) => /* @__PURE__ */ h.jsx(
    su,
    {
      label: c,
      active: i.includes(o),
      onClick: () => l(o)
    },
    o
  )) });
}
function me({
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
function $3({ value: n, onChange: t }) {
  return /* @__PURE__ */ h.jsx("div", { className: "aiwa-custom-symptom", children: /* @__PURE__ */ h.jsx(
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
const eh = "custom:", B2 = (n) => [...new Set(
  n.map((t) => String(t || "").trim()).filter(Boolean)
)];
function k3({
  date: n,
  energy: t,
  mood: i,
  symptoms: l = [],
  custom: o = "",
  intimacy: c,
  period: u,
  includePeriod: d = !1
}) {
  const p = B2(l), y = p.filter((v) => !v.startsWith(eh)), g = p.filter((v) => v.startsWith(eh)).map((v) => v.slice(eh.length));
  return String(o || "").trim() && g.push(String(o).trim()), {
    date: n,
    energy: Number(t) || 0,
    mood: Number(i) || 0,
    symptoms: y,
    custom_symptoms: B2(g),
    intimacy: !!c,
    ...d ? { period: !!u } : {}
  };
}
function _7({
  isOpen: n,
  currentGeneration: t,
  startedGeneration: i,
  currentDate: l,
  targetDate: o
}) {
  return !!(n && l === o && (t === i || t > i));
}
const R7 = Object.freeze({});
function D7({ isOpen: n, onClose: t, checkin: i, symptomGroups: l, mode: o, dayIso: c }) {
  const u = Ze(), d = c || u, p = i || R7, y = d !== u, g = !y && !["preg", "meno", "male", "none"].includes(o), [v, b] = T.useState(p.symptoms || []), [j, w] = T.useState(p.energy || 0), [C, x] = T.useState(p.mood || 0), [A, R] = T.useState(!!p.period), [M, _] = T.useState(!!p.intimacy), [L, N] = T.useState(""), [D, V] = T.useState(!1), [H, B] = T.useState(0), U = T.useRef(null), I = T.useRef(0), P = T.useRef({ generation: 0, open: !1 }), it = T.useRef(""), J = T.useRef(d);
  J.current = d, T.useLayoutEffect(() => {
    P.current = {
      generation: P.current.generation + (n ? 1 : 0),
      open: n
    };
  }, [n]), T.useEffect(() => {
    if (!n) return;
    if (U.current?.dayIso === d) {
      V(!0);
      return;
    }
    const tt = `${P.current.generation}:${d}:${H}`;
    it.current !== tt && (it.current = tt, b(p.symptoms || []), w(p.energy || 0), x(p.mood || 0), R(!!p.period), _(!!p.intimacy), N(""), V(!!U.current));
  }, [n, H, d, p]);
  const $ = (tt) => {
    U.current || b((dt) => dt.includes(tt) ? dt.filter((O) => O !== tt) : [...dt, tt]);
  }, X = l?.length ? l : iu, F = async () => {
    if (U.current) return;
    const tt = {
      id: ++I.current,
      generation: P.current.generation,
      dayIso: J.current,
      payload: k3({
        date: J.current,
        energy: j,
        mood: C,
        symptoms: v,
        custom: L,
        intimacy: M,
        period: A,
        includePeriod: g
      })
    };
    U.current = tt, V(!0);
    const dt = () => _7({
      isOpen: P.current.open,
      currentGeneration: P.current.generation,
      startedGeneration: tt.generation,
      currentDate: J.current,
      targetDate: tt.dayIso
    });
    try {
      if (await g3("aiwaSaveJournal", tt.payload), !dt()) return;
      Mt("Сохранили в журнал", { type: "success" }), t();
    } catch (O) {
      if (!dt()) return;
      Mt(O?.message || "Не удалось сохранить", { type: "error" });
    } finally {
      if (U.current?.id === tt.id) {
        const O = P.current.open && !dt();
        U.current = null, O ? (V(!0), B((q) => q + 1)) : V(!1);
      }
    }
  };
  return /* @__PURE__ */ h.jsxs(
    Vn,
    {
      isOpen: n,
      onClose: t,
      "data-aiwa-log-modal": "true",
      "aria-label": y ? "Журнал за выбранный день" : "Занести в журнал",
      children: [
        /* @__PURE__ */ h.jsx(hp, { size: "large", title: y ? `Журнал за ${(/* @__PURE__ */ new Date(c + "T00:00:00")).toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}` : "Занести в журнал" }),
        /* @__PURE__ */ h.jsx(
          "div",
          {
            className: "aiwa-log-scroll",
            "aria-busy": D || void 0,
            "aria-disabled": D || void 0,
            inert: D ? !0 : void 0,
            children: /* @__PURE__ */ h.jsxs(gt, { className: "aiwa-log-sections", children: [
              g ? /* @__PURE__ */ h.jsx(gt.Item, { children: /* @__PURE__ */ h.jsx(
                Fh,
                {
                  label: "Месячные",
                  variant: "period",
                  active: A,
                  onChange: (tt) => {
                    U.current || R(tt);
                  }
                }
              ) }) : null,
              /* @__PURE__ */ h.jsx(gt.Item, { children: /* @__PURE__ */ h.jsx(
                Pc,
                {
                  label: "Энергия",
                  options: j3,
                  value: j,
                  onChange: (tt) => {
                    U.current || w(tt);
                  }
                }
              ) }),
              /* @__PURE__ */ h.jsx(gt.Item, { children: /* @__PURE__ */ h.jsx(
                Pc,
                {
                  label: "Настроение",
                  options: A3,
                  value: C,
                  onChange: (tt) => {
                    U.current || x(tt);
                  }
                }
              ) }),
              X.map(([tt, dt]) => /* @__PURE__ */ h.jsx(gt.Item, { children: /* @__PURE__ */ h.jsx(L3, { label: tt, options: dt, symptoms: v, onToggle: $ }) }, tt)),
              /* @__PURE__ */ h.jsx(gt.Item, { children: /* @__PURE__ */ h.jsx(
                $3,
                {
                  value: L,
                  onChange: (tt) => {
                    U.current || N(tt);
                  }
                }
              ) }),
              o === "male" ? null : /* @__PURE__ */ h.jsx(gt.Item, { children: /* @__PURE__ */ h.jsx(
                Fh,
                {
                  label: "Близость",
                  active: M,
                  onChange: (tt) => {
                    U.current || _(tt);
                  }
                }
              ) })
            ] })
          }
        ),
        /* @__PURE__ */ h.jsx("div", { className: "aiwa-log-footer", children: /* @__PURE__ */ h.jsx(
          Ce,
          {
            label: "Сохранить",
            loading: D,
            "data-haptic": "light",
            isFill: !0,
            ...se("Сохранить", F)
          }
        ) })
      ]
    }
  );
}
const V2 = (n, t = "") => [
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
function N7({
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
        children: y ? /* @__PURE__ */ h.jsx(M_, {}) : d ? /* @__PURE__ */ h.jsx(au, {}) : null
      }
    ) : null,
    !u && n.phase && !n.actualPeriod && !n.predictedPeriod ? /* @__PURE__ */ h.jsx("span", { className: "aiwa-date-cell-dot", "aria-hidden": "true" }) : null,
    !u && n.intimacy ? /* @__PURE__ */ h.jsx("span", { className: "aiwa-date-cell-heart", "aria-hidden": "true", children: "♥" }) : null,
    l && n.today && !u ? /* @__PURE__ */ h.jsx(pt, { className: "aiwa-date-cell-today", variant: "caption1", weight: "regular", children: "Сегодня" }) : null
  ] });
  if (!t)
    return /* @__PURE__ */ h.jsx("div", { className: V2(v, g), "data-iso": n.iso, "aria-label": `${n.label || "День"}, ${n.date}`, children: b });
  const j = i || n.monthLabel || "", w = j ? `${n.date} ${j}` : `${n.label || "День"}, ${n.date}`, C = u ? d ? ", отмечено" : "" : `${n.actualPeriod ? ", отмечены месячные" : ""}${n.predictedPeriod ? ", прогноз месячных" : ""}${n.intimacy ? ", отмечена близость" : ""}`;
  return /* @__PURE__ */ h.jsx(
    an,
    {
      as: "button",
      type: "button",
      mode: "opacity",
      disabled: n.disabled,
      "aria-label": `${w}${C}`,
      "aria-pressed": u ? d : typeof n.selected == "boolean" ? n.selected : void 0,
      className: V2(v, ["aiwa-calendar-day", g].filter(Boolean).join(" ")),
      "data-iso": n.iso,
      onClick: () => c ? c(n) : Qn("aiwaCalendarDay", n.iso),
      children: b
    }
  );
}
function O7({ icon: n, label: t, onClick: i, className: l = "", ...o }) {
  return /* @__PURE__ */ h.jsx(
    an,
    {
      as: "button",
      type: "button",
      mode: "opacity",
      "aria-label": t,
      className: `aiwa-fab${l ? ` ${l}` : ""}`,
      onClick: i,
      ...o,
      children: /* @__PURE__ */ h.jsx(Fm, { className: "aiwa-fab-surface", children: /* @__PURE__ */ h.jsx("span", { className: "aiwa-fab-icon", "aria-hidden": "true", children: n }) })
    }
  );
}
const Xl = 8, z2 = 6, U2 = '[role="menuitem"]:not(:disabled)', L7 = [
  "a[href]",
  "button:not(:disabled)",
  "input:not(:disabled)",
  "select:not(:disabled)",
  "textarea:not(:disabled)",
  '[role="button"][tabindex]:not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])'
].join(","), $7 = '[data-aiwa-calendar-modal="true"],[aria-modal="true"]';
function k7(n, t, i) {
  return i < 1 ? -1 : n === "Home" ? 0 : n === "End" ? i - 1 : n === "ArrowDown" ? t < 0 ? 0 : (t + 1) % i : n === "ArrowUp" ? t < 0 ? i - 1 : (t - 1 + i) % i : t;
}
function B7(n) {
  return n?.restoreFocus !== !1;
}
function V7(n, t, i) {
  return t < 1 ? -1 : n < 0 ? i < 0 ? t - 1 : 0 : (n + (i < 0 ? -1 : 1) + t) % t;
}
function z7(n, t = null) {
  if (!n || t?.contains?.(n) || n.closest?.('.hidden,[inert],[hidden],[aria-hidden="true"]') || n.getAttribute?.("aria-disabled") === "true") return !1;
  const i = globalThis.getComputedStyle?.(n);
  if (i && (i.display === "none" || i.visibility === "hidden" || i.visibility === "collapse" || i.contentVisibility === "hidden")) return !1;
  const l = n.getClientRects?.();
  return !l || l.length > 0;
}
function U7(n, t = globalThis.document) {
  return n?.closest?.($7) || t;
}
function H7(n, t, i = null, l = globalThis.document) {
  if (!n || !l) return null;
  const c = [...U7(n, l)?.querySelectorAll?.(L7) || []].filter(
    (p) => z7(p, i)
  ), u = c.indexOf(n), d = V7(u, c.length, t);
  return c[d] || n;
}
function q7(n, t, i) {
  const l = window.innerWidth, o = window.innerHeight;
  let c = i === "end" ? n.right - t.width : n.left;
  c = Math.min(c, l - t.width - Xl), c = Math.max(Xl, c);
  const u = n.bottom + z2, d = n.top - z2 - t.height, p = u + t.height <= o - Xl, y = p || d < Xl ? u : d, g = p || d < Xl ? "top" : "bottom";
  return { top: y, left: c, originY: g };
}
function B3({ items: n, trigger: t, align: i = "start", className: l = "" }) {
  const [o, c] = T.useState(!1), [u, d] = T.useState({ top: 0, left: 0, originY: "top" }), p = T.useRef(null), y = T.useRef(null), g = T.useRef("first"), v = T.useId(), b = T.useId(), j = T.isValidElement(t) && t.props.id ? t.props.id : b, w = T.useCallback(() => p.current?.querySelector(
    'button, a[href], input, [role="button"], [tabindex]:not([tabindex="-1"])'
  ), []), C = T.useCallback(() => {
    w()?.focus?.({ preventScroll: !0 });
  }, [w]), x = T.useCallback((N) => {
    const D = w();
    D && H7(
      D,
      N,
      y.current,
      D.ownerDocument || document
    )?.focus?.({ preventScroll: !0 });
  }, [w]), A = T.useCallback((N = !1) => {
    c(!1), N && setTimeout(C, 0);
  }, [C]), R = T.useCallback((N = "first") => {
    g.current = N, c(!0);
  }, []);
  T.useLayoutEffect(() => {
    if (!o || !y.current || !p.current) return;
    const N = () => {
      const H = p.current.getBoundingClientRect(), B = { width: y.current.offsetWidth, height: y.current.offsetHeight };
      d(q7(H, B, i));
    };
    N();
    const D = [...y.current.querySelectorAll(U2)];
    return ((g.current === "last" ? D[D.length - 1] : D[0]) || y.current).focus?.({ preventScroll: !0 }), window.addEventListener("resize", N), window.addEventListener("scroll", N, !0), () => {
      window.removeEventListener("resize", N), window.removeEventListener("scroll", N, !0);
    };
  }, [o, i]), T.useEffect(() => {
    if (!o) return;
    const N = (V) => {
      y.current?.contains(V.target) || p.current?.contains(V.target) || A();
    }, D = (V) => {
      V.key === "Escape" && (V.preventDefault(), A(!0));
    };
    return document.addEventListener("pointerdown", N, !0), document.addEventListener("keydown", D), () => {
      document.removeEventListener("pointerdown", N, !0), document.removeEventListener("keydown", D);
    };
  }, [o, A]);
  const M = (N) => {
    N.disabled || (A(B7(N)), N.onSelect?.());
  }, _ = (N) => {
    if (N.key === "Escape") {
      N.preventDefault(), N.stopPropagation(), A(!0);
      return;
    }
    if (N.key === "Tab") {
      N.preventDefault(), A(), setTimeout(() => x(N.shiftKey ? -1 : 1), 0);
      return;
    }
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(N.key)) return;
    const D = [...y.current?.querySelectorAll(U2) || []];
    if (!D.length) return;
    N.preventDefault();
    const V = D.indexOf(document.activeElement), H = k7(N.key, V, D.length);
    D[H]?.focus?.({ preventScroll: !0 });
  }, L = T.isValidElement(t) ? T.cloneElement(t, {
    id: j,
    "aria-haspopup": "menu",
    "aria-expanded": o,
    "aria-controls": o ? v : void 0,
    onClick: (N) => {
      t.props.onClick?.(N), !N.defaultPrevented && (o ? A() : R("first"));
    },
    onKeyDown: (N) => {
      t.props.onKeyDown?.(N), !N.defaultPrevented && (N.key === "ArrowDown" || N.key === "ArrowUp" ? (N.preventDefault(), R(N.key === "ArrowUp" ? "last" : "first")) : N.key === "Enter" || N.key === " " ? (N.preventDefault(), o ? A() : R("first")) : N.key === "Escape" && o && (N.preventDefault(), A(!0)));
    }
  }) : t;
  return /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
    /* @__PURE__ */ h.jsx(
      "div",
      {
        ref: p,
        className: `aiwa-action-menu-trigger${l ? ` ${l}` : ""}`,
        children: L
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
          onKeyDown: _,
          style: {
            position: "fixed",
            top: u.top,
            left: u.left,
            transformOrigin: `${i === "end" ? "right" : "left"} ${u.originY}`
          },
          children: n.map((N) => /* @__PURE__ */ h.jsxs(
            "button",
            {
              type: "button",
              role: "menuitem",
              tabIndex: -1,
              disabled: N.disabled || void 0,
              className: "aiwa-action-menu-item",
              onClick: () => M(N),
              children: [
                N.icon ? /* @__PURE__ */ h.jsx("span", { className: "aiwa-action-menu-icon", "aria-hidden": "true", children: N.icon }) : null,
                /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: N.label })
              ]
            },
            N.label
          ))
        }
      ),
      document.body
    )
  ] });
}
function Y7({ options: n, value: t, onChange: i, hint: l }) {
  return /* @__PURE__ */ h.jsxs(Fm, { className: "aiwa-mark-bar", role: "group", "aria-label": "Что отмечаем", children: [
    /* @__PURE__ */ h.jsx("div", { className: "aiwa-mark-bar-chips", children: n.map((o) => /* @__PURE__ */ h.jsx(
      su,
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
let P7 = 0;
const H2 = /* @__PURE__ */ new Map(), Gc = (n) => Array.isArray(n) ? Object.freeze(n.map(Gc)) : !n || typeof n != "object" ? n : Object.freeze(Object.fromEntries(
  Object.entries(n).map(([t, i]) => [t, Gc(i)])
)), Lr = (n) => {
  const t = String(n || "");
  let i = H2.get(t);
  return i || (i = { active: null, completion: null, listeners: /* @__PURE__ */ new Set() }, H2.set(t, i)), i;
}, Jl = (n) => n ? {
  id: n.id,
  iso: n.iso,
  payload: n.payload,
  draft: n.draft
} : null, gp = (n) => {
  const t = Lr(n);
  return {
    active: Jl(t.active),
    completion: t.completion ? { ...t.completion } : null
  };
}, _c = (n) => {
  const t = Lr(n), i = gp(n);
  for (const l of t.listeners) l(i);
}, nh = (n) => gp(n), G7 = (n, t) => {
  const i = Lr(n);
  return i.listeners.add(t), t(gp(n)), () => i.listeners.delete(t);
}, X7 = (n, t, i, { draft: l = null } = {}) => {
  const o = Lr(n);
  if (o.active)
    return {
      owner: !1,
      operation: Jl(o.active),
      promise: o.active.promise
    };
  const c = {
    id: ++P7,
    iso: n,
    payload: Gc(t),
    draft: Gc(l)
  }, d = Promise.resolve().then(() => i(c.payload)).then(
    (p) => (o.active?.id === c.id && (o.active = null, o.completion = {
      ...Jl(c),
      status: "fulfilled",
      value: p,
      consumed: !1
    }, _c(n)), p),
    (p) => {
      throw o.active?.id === c.id && (o.active = null, o.completion = {
        ...Jl(c),
        status: "rejected",
        error: p,
        consumed: !1
      }, _c(n)), p;
    }
  );
  return o.completion = null, o.active = { ...c, promise: d }, _c(n), { owner: !0, operation: Jl(c), promise: d };
}, K7 = (n, t) => {
  const i = Lr(n);
  return !i.completion || i.completion.id !== t || i.completion.consumed ? !1 : (i.completion = { ...i.completion, consumed: !0 }, _c(n), !0);
};
function Z7({ iso: n, label: t, open: i, onClose: l, symptomGroups: o, showIntimacy: c = !0 }) {
  const [u, d] = T.useState([]), [p, y] = T.useState(0), [g, v] = T.useState(0), [b, j] = T.useState(!1), [w, C] = T.useState(""), [x, A] = T.useState(() => nh(n)), R = T.useRef(""), M = T.useRef(0), _ = T.useRef(n);
  _.current = n;
  const L = !!(x.active || x.completion && !x.completion.consumed);
  T.useEffect(() => G7(n, A), [n]), T.useLayoutEffect(() => {
    i && (M.current += 1);
  }, [i]), T.useEffect(() => {
    if (!n || !i) return;
    const B = nh(n), U = B.active || (B.completion && !B.completion.consumed ? B.completion : null), I = `${M.current}:${n}:${U?.id || "canonical"}`;
    if (R.current === I) return;
    if (R.current = I, U?.draft) {
      d(U.draft.symptoms), y(U.draft.energy), v(U.draft.mood), j(U.draft.intimacy), C(U.draft.custom);
      return;
    }
    const P = Ue("getAiwaDayCheckin", n) || {};
    d(P.symptoms || []), y(P.energy || 0), v(P.mood || 0), j(!!P.intimacy), C("");
  }, [n, i]), T.useEffect(() => {
    const B = x.completion;
    !i || !B || B.consumed || K7(n, B.id) && (B.status === "fulfilled" ? (Mt("Сохранено", { type: "success" }), l()) : Mt(B.error?.message || "Не удалось сохранить", { type: "error" }));
  }, [n, l, i, x.completion]);
  const N = () => {
    const B = nh(_.current);
    return !!(B.active || B.completion && !B.completion.consumed);
  }, D = (B) => {
    N() || d((U) => U.includes(B) ? U.filter((I) => I !== B) : [...U, B]);
  }, V = o?.length ? o : iu, H = () => {
    const B = _.current;
    if (N()) return;
    const U = { energy: p, mood: g, symptoms: u, custom: w, intimacy: b }, I = k3({ date: B, ...U });
    X7(
      B,
      I,
      (it) => g3("aiwaSaveJournal", it),
      { draft: U }
    ).promise.catch(() => {
    });
  };
  return /* @__PURE__ */ h.jsxs(
    Vn,
    {
      isOpen: i,
      onClose: l,
      "data-aiwa-day-log-modal": "true",
      "aria-label": t || "Журнал за выбранный день",
      children: [
        /* @__PURE__ */ h.jsx(hp, { size: "large", title: t || "Занести в журнал" }),
        /* @__PURE__ */ h.jsx(
          "div",
          {
            className: "aiwa-log-scroll",
            "aria-busy": L || void 0,
            "aria-disabled": L || void 0,
            inert: L ? !0 : void 0,
            children: /* @__PURE__ */ h.jsxs(gt, { className: "aiwa-log-sections", children: [
              /* @__PURE__ */ h.jsx(gt.Item, { children: /* @__PURE__ */ h.jsx(
                Pc,
                {
                  label: "Энергия",
                  options: j3,
                  value: p,
                  onChange: (B) => {
                    N() || y(B);
                  }
                }
              ) }),
              /* @__PURE__ */ h.jsx(gt.Item, { children: /* @__PURE__ */ h.jsx(
                Pc,
                {
                  label: "Настроение",
                  options: A3,
                  value: g,
                  onChange: (B) => {
                    N() || v(B);
                  }
                }
              ) }),
              V.map(([B, U]) => /* @__PURE__ */ h.jsx(gt.Item, { children: /* @__PURE__ */ h.jsx(L3, { label: B, options: U, symptoms: u, onToggle: D }) }, B)),
              /* @__PURE__ */ h.jsx(gt.Item, { children: /* @__PURE__ */ h.jsx(
                $3,
                {
                  value: w,
                  onChange: (B) => {
                    N() || C(B);
                  }
                }
              ) }),
              c ? /* @__PURE__ */ h.jsx(gt.Item, { children: /* @__PURE__ */ h.jsx(
                Fh,
                {
                  label: "Близость",
                  active: b,
                  onChange: (B) => {
                    N() || j(B);
                  }
                }
              ) }) : null
            ] })
          }
        ),
        /* @__PURE__ */ h.jsx("div", { className: "aiwa-log-footer", children: /* @__PURE__ */ h.jsx(
          Ce,
          {
            label: "Сохранить",
            loading: L,
            "data-haptic": "light",
            isFill: !0,
            ...se("Сохранить", H)
          }
        ) })
      ]
    }
  );
}
const uc = (n, t = Ze()) => !!(n?.iso && !n.disabled && n.iso <= t);
function vp({ isOpen: n, onClose: t, mode: i, revision: l, symptomGroups: o }) {
  const [c, u] = T.useState(!1), [d, p] = T.useState(null), [y, g] = T.useState(!1), [v, b] = T.useState("period"), [j, w] = T.useState({}), C = T.useRef(Promise.resolve()), x = T.useRef(0), A = T.useRef(null), R = Array.from({ length: 20 }, (J, $) => Ue("getAiwaCalendarMonth", $ - 12)).filter(Boolean), M = !["preg", "meno", "male", "none"].includes(i), _ = F_(M ? ["period", "symptoms", "intimacy"] : ["symptoms", "intimacy"]), L = Kh[v] || Kh.symptoms, N = V_(), D = () => {
    g(!1), w({});
  }, V = (J) => {
    b(J), u(!1), g(!0);
  }, H = _.map((J) => ({
    label: J.label,
    // Selecting a mode replaces the FAB trigger. ActionMenu must not restore
    // focus to that unmounted node; the marking state owns the live target.
    restoreFocus: !1,
    onSelect: () => V(J.value)
  }));
  N3(n, y ? D : t);
  const B = T.useRef(null);
  T.useEffect(() => {
    if (!n) return;
    const J = B.current, $ = J?.querySelector('[data-current-month="true"]');
    J && $ && (J.scrollTop = Math.max(0, $.offsetTop - 8));
  }, [n]), T.useEffect(() => {
    n || (u(!1), p(null), g(!1), w({})), b(M ? "period" : "symptoms");
  }, [n, M]), T.useEffect(() => {
    !n || !y || A.current?.querySelector(".aiwa-calendar-done")?.focus({ preventScroll: !0 });
  }, [n, y]);
  const U = (J) => {
    const $ = j[`${v}:${J.iso}`];
    return typeof $ == "boolean" ? $ : !!L.checked(J);
  }, I = (J, $) => {
    const X = () => Ue(J, $);
    x.current += 1, C.current = C.current.then(X, X).then(() => {
      x.current -= 1, x.current === 0 && w({});
    });
  }, P = Ze(), it = (J, $) => {
    if (uc(J, P)) {
      if (!y) {
        p({ iso: J.iso, label: `${J.date} ${$}` });
        return;
      }
      if (v === "symptoms") {
        p({ iso: J.iso, label: `${J.date} ${$}` });
        return;
      }
      w((X) => ({ ...X, [`${v}:${J.iso}`]: !U(J) })), I(v === "period" ? "toggleCalendarPeriodDay" : "markPA", J.iso);
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
        "data-markbar": y && !N ? "true" : void 0,
        role: "region",
        "aria-label": "Календарь",
        children: [
          /* @__PURE__ */ h.jsxs("div", { className: "aiwa-calendar-screen", "data-revision": l, role: "document", "aria-label": "Календарь", children: [
            /* @__PURE__ */ h.jsxs("div", { className: "aiwa-calendar-modeswitch", children: [
              y && N ? null : /* @__PURE__ */ h.jsxs(
                an,
                {
                  as: "button",
                  type: "button",
                  mode: "opacity",
                  className: "aiwa-calendar-legend-toggle",
                  "aria-pressed": c,
                  "aria-label": c ? "Скрыть обозначения" : "Показать обозначения календаря",
                  onClick: () => u((J) => !J),
                  children: [
                    /* @__PURE__ */ h.jsx(p3, {}),
                    /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "semibold", children: "Обозначения" })
                  ]
                }
              ),
              y ? /* @__PURE__ */ h.jsx(
                an,
                {
                  as: "button",
                  type: "button",
                  mode: "opacity",
                  className: "aiwa-calendar-done",
                  "aria-label": "Закончить отметки",
                  onClick: D,
                  children: /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "semibold", children: "Готово" })
                }
              ) : null
            ] }),
            c ? /* @__PURE__ */ h.jsxs("div", { className: "aiwa-calendar-help", role: "status", children: [
              /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "semibold", children: "Обозначения" }),
              /* @__PURE__ */ h.jsx("div", { className: "aiwa-calendar-legend", children: I_.map(({ label: J, variant: $, token: X }) => /* @__PURE__ */ h.jsx(
                BM,
                {
                  variant: $,
                  textVariant: "caption1",
                  weight: "semibold",
                  style: { color: `var(${X})` },
                  children: J
                },
                J
              )) })
            ] }) : null,
            /* @__PURE__ */ h.jsx("div", { className: "aiwa-calendar-scroll", ref: B, children: /* @__PURE__ */ h.jsx("div", { className: "aiwa-calendar-months", children: R.map((J) => /* @__PURE__ */ h.jsxs(
              "section",
              {
                className: "aiwa-calendar-month",
                "aria-label": J.label,
                "data-current-month": J.days.some(($) => $.today) ? "true" : void 0,
                children: [
                  /* @__PURE__ */ h.jsx(pt, { className: "aiwa-calendar-month-title", variant: "body", weight: "semibold", children: J.label || J.name }),
                  /* @__PURE__ */ h.jsx("div", { className: "aiwa-calendar-grid", children: J.days.map(($) => $.empty ? /* @__PURE__ */ h.jsx("span", { className: "aiwa-calendar-empty", "aria-hidden": "true" }, $.key) : /* @__PURE__ */ h.jsx(
                    N7,
                    {
                      day: $,
                      interactive: uc($, P),
                      marking: y && uc($, P),
                      checked: y && uc($, P) && U($),
                      markVariant: v === "intimacy" ? "heart" : "radio",
                      monthLabel: J.label,
                      onSelect: (X) => it(X, J.name || J.label)
                    },
                    $.key
                  )) })
                ]
              },
              J.key || J.label
            )) }) })
          ] }),
          y && !N ? /* @__PURE__ */ h.jsx(
            Y7,
            {
              options: _,
              value: v,
              onChange: b,
              hint: L.hint
            }
          ) : null,
          y ? null : /* @__PURE__ */ h.jsx(
            B3,
            {
              className: "aiwa-calendar-fab",
              align: "end",
              items: H,
              trigger: /* @__PURE__ */ h.jsx(O7, { icon: /* @__PURE__ */ h.jsx(Zs, {}), label: "Отметить день" })
            }
          ),
          /* @__PURE__ */ h.jsx(
            Z7,
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
function Q7({ panel: n, onClose: t, checkin: i, symptomGroups: l, mode: o, revision: c, dayIso: u }) {
  return /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
    /* @__PURE__ */ h.jsx(D7, { isOpen: n === "journal", onClose: t, checkin: i, symptomGroups: l, mode: o, dayIso: u }),
    /* @__PURE__ */ h.jsx(vp, { isOpen: n === "calendar", onClose: t, mode: o, revision: c, symptomGroups: l })
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
  const v = u || d || p === "extended" ? "extended" : "default", b = l !== void 0 ? l : i ? /* @__PURE__ */ h.jsx(Tt.Part, { type: "Chevron" }) : null, j = d ? /* @__PURE__ */ h.jsx("span", { className: "aiwa-cell-thumb aiwa-cell-thumb-loading", children: /* @__PURE__ */ h.jsx(nu, { size: 22 }) }) : u ? /* @__PURE__ */ h.jsx("span", { className: "aiwa-cell-thumb", children: /* @__PURE__ */ h.jsx("img", { src: u, alt: "", loading: "lazy" }) }) : c;
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
const F7 = {
  profile: ["height", "weight", "age", "cycle_len"],
  preferences: ["diet_note", "kcal_goal"],
  summary: ["send_time", "daily_summary_enabled"],
  "daily-summary": ["daily_summary_enabled"],
  proactive: ["proactive_enabled"],
  mode: ["cycle_len"]
}, Ih = (n = {}) => ({
  height: String(n.profile?.height || ""),
  weight: String(n.profile?.weight || ""),
  age: String(n.profile?.age || ""),
  cycle_len: String(n.cycle_len || ""),
  diet_note: n.profile?.diet_note || n.diet_note || "",
  kcal_goal: String(n.profile?.kcal_goal || n.kcal_goal || ""),
  send_time: n.send_time || "08:00",
  daily_summary_enabled: n.daily_summary_enabled !== !1,
  proactive_enabled: n.proactive_enabled !== !1
}), q2 = (n) => {
  const t = n?.data || n?.snapshot, i = Number(n?.revision), l = n?.revision !== null && n?.revision !== void 0 && n?.revision !== "";
  return !t || typeof t != "object" || Array.isArray(t) || !l || !Number.isFinite(i) ? null : { data: t, revision: i };
}, I7 = (n, t) => Object.prototype.hasOwnProperty.call(n, t), Y2 = (n) => !n || typeof n != "object" || Array.isArray(n) || ![
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
].every((i) => I7(n, i)) || !Array.isArray(n.periods) || !Array.isArray(n.cycles) || !Array.isArray(n.past_periods) || !n.stats || typeof n.stats != "object" || Array.isArray(n.stats) || ["cycle", "irregular"].includes(n.mode) && !Array.isArray(n.stats.history) ? !1 : n.mode === "preg" ? !!(n.preg && typeof n.preg == "object" && !n.cycle && n.periods.length === 0 && n.cycles.length === 0) : ["meno", "none", "male"].includes(n.mode) ? !n.cycle && n.preg === null && n.periods.length === 0 && n.cycles.length === 0 : ["cycle", "irregular"].includes(n.mode), J7 = async (n, t, i) => {
  let l = null;
  try {
    l = await n("reloadSettingsData");
  } catch {
    l = null;
  }
  const o = q2(l);
  if (o && (t !== "mode" || Y2(o.data)))
    return o;
  let c = null;
  try {
    c = await n("applySettingsMutationReceipt", t, i);
  } catch {
    c = null;
  }
  const u = q2(c);
  return u && t === "mode" && !Y2(u.data) ? null : u;
}, W7 = ({
  current: n,
  data: t,
  actionKey: i,
  draftVersion: l,
  submittedDraftVersion: o
}) => {
  if (l !== o) return n;
  const c = F7[i] || [];
  if (!c.length) return n;
  const u = Ih(t);
  return {
    ...n,
    ...Object.fromEntries(c.map((d) => [d, u[d]]))
  };
};
let tR = 0, Ge = null, Rc = null;
const Jh = /* @__PURE__ */ new Set(), bp = () => ({
  active: Ge ? { id: Ge.id, key: Ge.key, ownerId: Ge.ownerId } : null,
  completion: Rc
}), ah = () => {
  const n = bp();
  for (const t of Jh) t(n);
}, P2 = () => bp(), Kl = () => !!Ge, eR = (n) => (Jh.add(n), n(bp()), () => Jh.delete(n)), nR = ({
  isOpen: n,
  currentGeneration: t,
  startedGeneration: i,
  operationId: l,
  adoptedOperationId: o,
  adoptedGeneration: c
}) => !!(n && (t === i || l != null && l === o && t === c)), aR = (n, t, { ownerId: i = null } = {}) => {
  if (Ge)
    return {
      owner: !1,
      operation: { id: Ge.id, key: Ge.key, ownerId: Ge.ownerId },
      promise: Ge.promise
    };
  const l = { id: ++tR, key: n, ownerId: i }, c = Promise.resolve().then(t).then(
    (u) => (Ge?.id === l.id && (Ge = null, Rc = { ...l, status: "fulfilled", value: u }, ah()), u),
    (u) => {
      throw Ge?.id === l.id && (Ge = null, Rc = { ...l, status: "rejected", error: u }, ah()), u;
    }
  );
  return Rc = null, Ge = { ...l, promise: c }, ah(), { owner: !0, operation: l, promise: c };
}, iR = [
  { value: "3", label: "3 месяца" },
  { value: "6", label: "6 месяцев" },
  { value: "all", label: "Весь период" }
], sR = /* @__PURE__ */ new Set(["copy-partner", "unlink-partner"]), G2 = (n) => Zh.find((t) => t.value === n)?.label || "Не выбран", lR = (n, t) => (
  // Both bridges are data-only. The receipt fallback is local and cannot
  // navigate; it prevents an acknowledged server write from leaving D stale.
  J7(Qn, n, t)
);
function Ds({ label: n, selected: t, disabled: i = !1, onClick: l }) {
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
      end: t ? /* @__PURE__ */ h.jsx("span", { className: "aiwa-settings-check", "aria-hidden": "true", children: /* @__PURE__ */ h.jsx(A_, {}) }) : null,
      children: /* @__PURE__ */ h.jsx(Tt.Text, { title: n })
    }
  );
}
function xp({ isOpen: n, onClose: t }) {
  const [i, l] = T.useState("main"), [o, c] = T.useState(() => Ue("aiwaData") || {}), [u, d] = T.useState(null), [p, y] = T.useState("3"), [g, v] = T.useState({}), [b, j] = T.useState(Mc), [w, C] = T.useState(P2), x = T.useId(), A = T.useRef({ generation: 0, open: !1 }), R = T.useRef(null), M = T.useRef(i), _ = T.useRef(0), L = T.useRef(-1 / 0);
  M.current = i, T.useLayoutEffect(() => {
    A.current = {
      generation: A.current.generation + (n ? 1 : 0),
      open: n
    };
  }, [n]), T.useEffect(() => _3(j), []), T.useEffect(() => eR(C), []);
  const N = o.mode || Zh[0].value, D = N === "cycle", V = N === "male", H = C3(), B = w.active?.key || "", U = !!w.active, I = (nt, mt) => {
    _.current += 1, v((ut) => ({ ...ut, [nt]: mt }));
  }, P = (nt) => {
    Kl() || l(nt);
  }, it = () => {
    M.current === "main" || Kl() ? t() : l("main");
  }, J = (nt, mt) => {
    !nt || nt.revision < L.current || (L.current = nt.revision, A.current.open && (c(nt.data), v((ut) => W7({
      current: ut,
      data: nt.data,
      actionKey: mt.key,
      draftVersion: _.current,
      submittedDraftVersion: mt.draftVersion
    }))));
  }, $ = async (nt, mt, ut, yt) => {
    const xt = await lR(nt, mt);
    return xt ? (J(xt, yt), xt) : (ut() && Mt(
      "Изменение сохранено, но данные профиля не обновились. Попробуй открыть профиль ещё раз.",
      { type: "error" }
    ), null);
  };
  T.useEffect(() => {
    if (!n) return;
    const nt = Ue("aiwaData") || {}, mt = P2().active, ut = mt?.key, yt = mt?.ownerId === x && !sR.has(ut), xt = Mc() && M.current === "report";
    !yt && !xt && l("main"), R.current = yt ? {
      id: mt.id,
      generation: A.current.generation
    } : null, d(null), j(Mc()), Kl() || (c(nt), v(Ih(nt)), _.current += 1);
  }, [n, x]), T.useEffect(() => {
    const nt = w.completion;
    if (!n || !nt || nt.value?.synced !== !0 || nt.ownerId === x || M.current !== "main") return;
    const mt = Ue("aiwaData") || {};
    c(mt), v(Ih(mt)), _.current += 1;
  }, [n, x, w.completion]);
  const X = async () => {
    if (Kl()) return;
    const nt = A.current.generation;
    l("partner");
    const mt = await Yt("/api/partner", {}).catch(() => null);
    A.current.open && A.current.generation === nt && d(mt || {});
  }, F = (nt, mt) => {
    if (Kl()) return null;
    const ut = {
      id: null,
      key: nt,
      generation: A.current.generation,
      draftVersion: _.current
    }, yt = () => nR({
      isOpen: A.current.open,
      currentGeneration: A.current.generation,
      startedGeneration: ut.generation,
      operationId: ut.id,
      adoptedOperationId: R.current?.id,
      adoptedGeneration: R.current?.generation
    }), xt = aR(
      nt,
      () => mt(yt, ut),
      { ownerId: x }
    );
    return ut.id = xt.operation.id, xt.owner ? (xt.promise.catch((ce) => {
      yt() && Mt(ce?.message || "Не получилось сохранить настройку", { type: "error" });
    }), xt.promise) : null;
  }, tt = () => F("profile", async (nt, mt) => {
    const ut = await Yt("/api/profile", {
      height: g.height,
      weight: g.weight,
      age: g.age,
      ...D ? { cycle_len: g.cycle_len } : {}
    }).catch(() => null);
    if (ut?.ok) {
      if (!await $(
        "profile",
        ut,
        nt,
        mt
      )) return { synced: !1 };
      if (!nt()) return { synced: !0 };
      Mt("Данные сохранены", { type: "success" }), l("main");
    } else nt() && Mt(ut?.text || (D ? "Проверь рост, вес, возраст и длину цикла" : "Проверь рост, вес и возраст"), { type: "error" });
    return { synced: !!ut?.ok };
  }), dt = () => F("preferences", async (nt, mt) => {
    const ut = await Yt("/api/prefs", {
      diet_note: g.diet_note,
      kcal_goal: g.kcal_goal
    }).catch(() => null);
    if (ut?.ok) {
      if (!await $(
        "preferences",
        ut,
        nt,
        mt
      )) return { synced: !1 };
      if (!nt()) return { synced: !0 };
      Mt("Предпочтения сохранены", { type: "success" }), l("main");
    } else nt() && Mt(ut?.text || "Не получилось сохранить предпочтения", { type: "error" });
    return { synced: !!ut?.ok };
  }), O = () => F("summary", async (nt, mt) => {
    const ut = String(g.send_time || ""), yt = g.daily_summary_enabled !== !1, xt = await Yt("/api/settime", {
      time: ut,
      daily_summary_enabled: yt
    }).catch(() => null);
    let ce = null;
    return xt?.ok && (ce = await $(
      "summary",
      xt,
      nt,
      mt
    ), !ce) ? { synced: !1 } : xt?.ok && xt.send_time === ut && xt.daily_summary_enabled === yt ? nt() ? (Mt("Время сводки сохранено", { type: "success" }), l("main"), { synced: !0 }) : { synced: !0 } : (nt() && Mt(xt?.text || (xt?.ok ? "Настройки сводки сохранены не полностью. Попробуй позже" : "Проверь время утренней сводки"), { type: "error" }), { synced: !1 });
  }), q = async () => {
    const nt = A.current.generation, { owner: mt, promise: ut } = R3(p);
    if (!mt) return;
    const yt = await ut.catch(() => null);
    if (yt?.ok && yt?.delivered) {
      b3();
      return;
    }
    A.current.open && A.current.generation === nt && Mt(yt?.text || "Выписка временно недоступна", { type: "error" });
  }, Y = (nt) => F("proactive", async (mt, ut) => {
    const yt = g.proactive_enabled !== !1;
    v((ht) => ({ ...ht, proactive_enabled: nt }));
    const xt = await Yt("/api/proactive", { enabled: nt }).catch(() => null);
    return xt?.ok ? { synced: !!await $(
      "proactive",
      xt,
      mt,
      ut
    ) } : (A.current.open && _.current === ut.draftVersion && v((ht) => ({ ...ht, proactive_enabled: yt })), mt() && Mt("Не получилось изменить настройку", { type: "error" }), { synced: !1 });
  }), et = (nt) => F("daily-summary", async (mt, ut) => {
    const yt = g.daily_summary_enabled !== !1;
    v((ht) => ({ ...ht, daily_summary_enabled: nt }));
    const xt = await Yt("/api/daily-summary", { enabled: nt }).catch(() => null);
    return xt?.ok ? { synced: !!await $(
      "daily-summary",
      xt,
      mt,
      ut
    ) } : (A.current.open && _.current === ut.draftVersion && v((ht) => ({ ...ht, daily_summary_enabled: yt })), mt() && Mt("Не получилось изменить настройку", { type: "error" }), { synced: !1 });
  }), ot = (nt) => F("mode", async (mt, ut) => {
    const yt = await Yt("/api/mode", { mode: nt }).catch(() => null);
    return yt?.ok ? await $(
      "mode",
      yt,
      mt,
      ut
    ) ? mt() ? (Mt(`Режим: ${G2(nt)}`, {
      type: "success",
      description: yt.seeded_period ? "Дату месячных поставили на сегодня — поправь в календаре" : void 0
    }), t(), { synced: !0 }) : { synced: !0 } : { synced: !1 } : (mt() && Mt(yt?.text || "Не получилось сменить режим", { type: "error" }), { synced: !1 });
  }), ct = () => F("copy-partner", async (nt) => {
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
  }), ft = () => F("unlink-partner", async (nt, mt) => {
    const ut = await Yt("/api/partner", { action: "unlink" }).catch(() => null);
    if (ut?.ok) {
      if (!await $(
        "partner",
        ut,
        nt,
        mt
      )) return { synced: !1 };
      if (!nt()) return { synced: !0 };
      d({ linked: !1 }), Mt("Партнёр отключён", { type: "success" });
    } else nt() && Mt(ut?.text || "Не получилось отключить партнёра", { type: "error" });
    return { synced: !!ut?.ok };
  });
  return /* @__PURE__ */ h.jsx(
    Vn,
    {
      isOpen: n,
      onClose: t,
      onBack: it,
      "aria-label": "Профиль и настройки",
      children: /* @__PURE__ */ h.jsx(h.Fragment, { children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-sheet-scroll", "aria-busy": !!(B || b) || void 0, children: [
        i === "main" ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
          /* @__PURE__ */ h.jsxs("div", { className: "aiwa-profile-avatar", children: [
            /* @__PURE__ */ h.jsx(T3, {}),
            H ? /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "semibold", children: H }) : null
          ] }),
          /* @__PURE__ */ h.jsx(gt, { className: "aiwa-tma-blocks", children: /* @__PURE__ */ h.jsxs(gt.Item, { children: [
            /* @__PURE__ */ h.jsx(
              zt,
              {
                title: "Режим",
                trailing: /* @__PURE__ */ h.jsxs("span", { className: "aiwa-mode-value", children: [
                  /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: G2(N) }),
                  U ? null : /* @__PURE__ */ h.jsx(Tt.Part, { type: "Chevron" })
                ] }),
                onClick: U ? void 0 : () => P("mode")
              }
            ),
            /* @__PURE__ */ h.jsx(zt, { title: V ? "Выписка по самочувствию" : "Выписка для врача", description: "PDF в чат бота", onClick: U ? void 0 : () => P("report") }),
            /* @__PURE__ */ h.jsx(zt, { title: "Предпочтения по питанию", description: "ограничения и цель калорий", onClick: U ? void 0 : () => P("preferences") }),
            /* @__PURE__ */ h.jsx(zt, { title: "Мои данные", description: D ? "рост · вес · возраст · цикл" : "рост · вес · возраст", onClick: U ? void 0 : () => P("data") }),
            /* @__PURE__ */ h.jsx(zt, { title: "Утренняя сводка", description: g.daily_summary_enabled === !1 ? "выключена" : `${g.send_time || "08:00"} · МСК`, onClick: U ? void 0 : () => P("summary") }),
            /* @__PURE__ */ h.jsx(
              zt,
              {
                title: "Проактивные сообщения",
                description: g.proactive_enabled === !1 ? "выключены" : "не больше одного в день",
                onClick: U ? void 0 : () => P("proactive")
              }
            ),
            V ? null : /* @__PURE__ */ h.jsx(zt, { title: "Партнёр и близкие", description: "короткая бережная сводка", onClick: U ? void 0 : X })
          ] }) })
        ] }) : null,
        i === "mode" ? /* @__PURE__ */ h.jsx(gt, { className: "aiwa-tma-blocks aiwa-settings-page", children: /* @__PURE__ */ h.jsx(
          gt.Item,
          {
            header: "Режим Айвы",
            description: "Выбери режим, чтобы рекомендации и календарь учитывали твой текущий этап.",
            role: "radiogroup",
            "aria-label": "Режим Айвы",
            "aria-busy": B === "mode" || void 0,
            children: Zh.map((nt) => /* @__PURE__ */ h.jsx(
              Ds,
              {
                label: nt.label,
                selected: N === nt.value,
                disabled: U,
                onClick: () => ot(nt.value)
              },
              nt.value
            ))
          }
        ) }) : null,
        i === "data" ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
          /* @__PURE__ */ h.jsx(gt, { className: "aiwa-tma-blocks aiwa-settings-page", children: /* @__PURE__ */ h.jsx(
            gt.Item,
            {
              header: "Мои данные",
              description: D ? "Эти параметры помогают точнее рассчитывать питание, нагрузку и прогноз цикла." : "Эти параметры помогают точнее рассчитывать питание и нагрузку.",
              children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-settings-form aiwa-settings-form-grid", children: [
                /* @__PURE__ */ h.jsx(me, { label: "Рост, см", value: g.height || "", onChange: (nt) => I("height", nt), inputMode: "decimal", disabled: U }),
                /* @__PURE__ */ h.jsx(me, { label: "Вес, кг", value: g.weight || "", onChange: (nt) => I("weight", nt), inputMode: "decimal", disabled: U }),
                /* @__PURE__ */ h.jsx(me, { label: "Возраст", value: g.age || "", onChange: (nt) => I("age", nt), inputMode: "numeric", disabled: U }),
                D ? /* @__PURE__ */ h.jsx(me, { label: "Длина цикла", value: g.cycle_len || "", onChange: (nt) => I("cycle_len", nt), inputMode: "numeric", disabled: U }) : null
              ] })
            }
          ) }),
          /* @__PURE__ */ h.jsx("div", { className: "aiwa-page-action", children: /* @__PURE__ */ h.jsx(
            Ce,
            {
              label: "Сохранить",
              loading: B === "profile",
              disabled: U && B !== "profile",
              isFill: !0,
              ...se("Сохранить данные", tt)
            }
          ) })
        ] }) : null,
        i === "preferences" ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
          /* @__PURE__ */ h.jsx(gt, { className: "aiwa-tma-blocks aiwa-settings-page", children: /* @__PURE__ */ h.jsx(
            gt.Item,
            {
              header: "Предпочтения по питанию",
              description: "Напиши только то, что важно учитывать Айве: ограничения, аллергии и желаемую калорийность.",
              children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-settings-form", children: [
                /* @__PURE__ */ h.jsx(
                  me,
                  {
                    label: "Предпочтения и ограничения",
                    value: g.diet_note || "",
                    onChange: (nt) => I("diet_note", nt),
                    placeholder: "Например: без свинины, аллергия на орехи",
                    multiline: !0,
                    disabled: U
                  }
                ),
                /* @__PURE__ */ h.jsx(me, { label: "Желаемые калории", value: g.kcal_goal || "", onChange: (nt) => I("kcal_goal", nt), inputMode: "numeric", disabled: U })
              ] })
            }
          ) }),
          /* @__PURE__ */ h.jsx("div", { className: "aiwa-page-action", children: /* @__PURE__ */ h.jsx(
            Ce,
            {
              label: "Сохранить",
              loading: B === "preferences",
              disabled: U && B !== "preferences",
              isFill: !0,
              ...se("Сохранить предпочтения", dt)
            }
          ) })
        ] }) : null,
        i === "summary" ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
          /* @__PURE__ */ h.jsx(gt, { className: "aiwa-tma-blocks aiwa-settings-page", children: /* @__PURE__ */ h.jsxs(
            gt.Item,
            {
              header: "Утренняя сводка",
              description: "Айва пришлёт короткую сводку дня в чат в указанное время по Москве.",
              "aria-busy": B === "daily-summary" || B === "summary" || void 0,
              children: [
                /* @__PURE__ */ h.jsxs("div", { role: "radiogroup", "aria-label": "Утренняя сводка", children: [
                  /* @__PURE__ */ h.jsx(
                    Ds,
                    {
                      label: "Присылать утром",
                      selected: g.daily_summary_enabled !== !1,
                      disabled: U,
                      onClick: () => et(!0)
                    }
                  ),
                  /* @__PURE__ */ h.jsx(
                    Ds,
                    {
                      label: "Не присылать",
                      selected: g.daily_summary_enabled === !1,
                      disabled: U,
                      onClick: () => et(!1)
                    }
                  )
                ] }),
                /* @__PURE__ */ h.jsx("div", { className: "aiwa-settings-form", children: /* @__PURE__ */ h.jsx(me, { label: "Время, МСК", type: "time", value: g.send_time || "08:00", onChange: (nt) => I("send_time", nt), disabled: U }) })
              ]
            }
          ) }),
          /* @__PURE__ */ h.jsx("div", { className: "aiwa-page-action", children: /* @__PURE__ */ h.jsx(
            Ce,
            {
              label: "Сохранить",
              loading: B === "summary",
              disabled: U && B !== "summary",
              isFill: !0,
              ...se("Сохранить время сводки", O)
            }
          ) })
        ] }) : null,
        i === "proactive" ? /* @__PURE__ */ h.jsx(gt, { className: "aiwa-tma-blocks aiwa-settings-page", children: /* @__PURE__ */ h.jsxs(
          gt.Item,
          {
            header: "Проактивные сообщения",
            description: "Айва может сама написать, когда заметит важное изменение. Не больше одного сообщения в день.",
            role: "radiogroup",
            "aria-label": "Проактивные сообщения",
            "aria-busy": B === "proactive" || void 0,
            children: [
              /* @__PURE__ */ h.jsx(
                Ds,
                {
                  label: "Включены",
                  selected: g.proactive_enabled !== !1,
                  disabled: U,
                  onClick: () => Y(!0)
                }
              ),
              /* @__PURE__ */ h.jsx(
                Ds,
                {
                  label: "Выключены",
                  selected: g.proactive_enabled === !1,
                  disabled: U,
                  onClick: () => Y(!1)
                }
              )
            ]
          }
        ) }) : null,
        i === "report" ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
          /* @__PURE__ */ h.jsx(gt, { className: "aiwa-tma-blocks aiwa-settings-page", children: /* @__PURE__ */ h.jsx(
            gt.Item,
            {
              header: V ? "Выписка по самочувствию" : "Выписка для врача",
              description: V ? "Динамика энергии и дневник самочувствия придут PDF-файлом в чат бота." : "Циклы, динамика и дневник симптомов придут PDF-файлом в чат бота.",
              role: "radiogroup",
              "aria-label": "Период выписки",
              "aria-busy": b || void 0,
              children: iR.map((nt) => /* @__PURE__ */ h.jsx(
                Ds,
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
            Ce,
            {
              label: "Собрать выписку",
              loading: b,
              disabled: U,
              isFill: !0,
              ...se("Собрать выписку", q)
            }
          ) })
        ] }) : null,
        i === "partner" ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
          /* @__PURE__ */ h.jsx(gt, { className: "aiwa-tma-blocks aiwa-settings-page", children: /* @__PURE__ */ h.jsxs(
            gt.Item,
            {
              header: "Партнёр и близкие",
              description: "Близкий получит только бережную сводку о поддержке и отдыхе — без календаря, интимных и медицинских деталей.",
              children: [
                u === null ? /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsx(Tt.Text, { title: "Готовлю ссылку…" }) }) : null,
                u?.linked ? /* @__PURE__ */ h.jsx(zt, { title: "Партнёр подключён", description: "Бережная сводка включена" }) : null,
                u?.link ? /* @__PURE__ */ h.jsx("div", { className: "aiwa-settings-form", children: /* @__PURE__ */ h.jsx(me, { label: "Ссылка-приглашение", value: u.link, readOnly: !0, multiline: !0 }) }) : null,
                u && !u.linked && !u.link ? /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsx(Tt.Text, { title: "Ссылка доступна только в Telegram", description: "В боте можно использовать команду /partner" }) }) : null
              ]
            }
          ) }),
          u?.linked ? /* @__PURE__ */ h.jsx("div", { className: "aiwa-page-action", children: /* @__PURE__ */ h.jsx(
            Ce,
            {
              label: "Отключить партнёра",
              loading: B === "unlink-partner",
              disabled: !!B && B !== "unlink-partner",
              isFill: !0,
              ...se("Отключить партнёра", ft)
            }
          ) }) : null,
          u?.link ? /* @__PURE__ */ h.jsx("div", { className: "aiwa-page-action", children: /* @__PURE__ */ h.jsx(
            Ce,
            {
              label: "Скопировать ссылку",
              loading: B === "copy-partner",
              disabled: !!B && B !== "copy-partner",
              isFill: !0,
              ...se("Скопировать ссылку", ct)
            }
          ) }) : null
        ] }) : null
      ] }) })
    }
  );
}
const rR = (n) => {
  const t = Ue("homeSelectedDayPatch", n);
  return t ? { value: t.heroValue, label: t.countdownLabel } : null;
};
function oR(n) {
  return /* @__PURE__ */ h.jsx(ei, { children: /* @__PURE__ */ h.jsx(ti, { mode: "secondary", children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-deslop-home", children: [
    /* @__PURE__ */ h.jsx(
      mp,
      {
        title: n.dateText,
        days: n.week,
        selectedIso: n.selectedIso,
        heroValue: n.heroValue || `${n.countdown} дней`,
        heroLabel: n.countdownLabel,
        onSelect: n.onSelectDay ?? ((t) => w3(t.iso)),
        previewDay: n.previewDay ?? rR,
        onProfile: () => window.AiwaDeslop?.openProfile?.(),
        onCalendar: () => Qn("openHomePanel", "calendar"),
        action: /* @__PURE__ */ h.jsx(
          Wa,
          {
            variant: "filled",
            label: /* @__PURE__ */ h.jsxs("span", { className: "aiwa-btn-icon-label", children: [
              /* @__PURE__ */ h.jsx(Zs, {}),
              " Занести в журнал"
            ] }),
            ...se("Занести в журнал", () => Qn("openHomePanel", "journal"))
          }
        )
      }
    ),
    /* @__PURE__ */ h.jsxs(gt, { className: "aiwa-tma-blocks", children: [
      /* @__PURE__ */ h.jsx(n7, { title: n.dayTitle, checkin: n.dayCheckin ?? n.checkin, symptomGroups: n.symptomGroups }),
      /* @__PURE__ */ h.jsx(r7, { aiText: n.aiText }),
      /* @__PURE__ */ h.jsx(o7, { delay: n.delay }),
      /* @__PURE__ */ h.jsx(d7, { metrics: n.metrics, title: n.statsTitle }),
      n.pregnancy ? /* @__PURE__ */ h.jsx(A7, { pregnancy: n.pregnancy }) : /* @__PURE__ */ h.jsx(
        p7,
        {
          data: n.chartData,
          series: n.chartSeries,
          title: n.chartTitle,
          band: n.chartBand,
          emptyText: n.chartEmptyText
        }
      ),
      n.mode === "meno" || n.mode === "preg" ? null : /* @__PURE__ */ h.jsx(
        y7,
        {
          history: n.history,
          title: n.historyTitle,
          emptyTitle: n.historyEmptyTitle,
          emptyDescription: n.historyEmptyDescription
        }
      ),
      /* @__PURE__ */ h.jsx(T7, {})
    ] }),
    /* @__PURE__ */ h.jsx(
      Q7,
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
    /* @__PURE__ */ h.jsx(xp, { isOpen: n.profileOpen, onClose: n.onProfileClose })
  ] }) }) });
}
const X2 = {
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
}, Wh = (n) => Array.from({ length: n }, (t, i) => i);
function cR({ kind: n }) {
  return n === "week" ? /* @__PURE__ */ h.jsxs("div", { className: "aiwa-overview", children: [
    /* @__PURE__ */ h.jsx("div", { className: "aiwa-week", children: Wh(7).map((t) => /* @__PURE__ */ h.jsx(Us, { className: "aiwa-skeleton-day" }, t)) }),
    /* @__PURE__ */ h.jsxs("div", { className: "aiwa-countdown", children: [
      /* @__PURE__ */ h.jsx($i, { active: !0, width: 2 }),
      /* @__PURE__ */ h.jsx($i, { active: !0, width: 18 })
    ] })
  ] }) : /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
    /* @__PURE__ */ h.jsx(Us, { className: "aiwa-skeleton-gauge" }),
    /* @__PURE__ */ h.jsx("div", { className: "aiwa-macro-grid", children: Wh(3).map((t) => /* @__PURE__ */ h.jsx(Us, { className: "aiwa-skeleton-macro" }, t)) })
  ] });
}
function V3({ title: n, variant: t = "food" }) {
  const { hero: i, sections: l } = X2[t] || X2.food;
  return /* @__PURE__ */ h.jsx(ei, { children: /* @__PURE__ */ h.jsx(ti, { mode: "secondary", children: /* @__PURE__ */ h.jsxs(
    "div",
    {
      className: `aiwa-paper-screen aiwa-screen-skeleton aiwa-${t}-screen`,
      role: "status",
      "aria-label": "Айва загружается",
      children: [
        /* @__PURE__ */ h.jsx(pt, { className: "aiwa-screen-title", variant: "title1", weight: "semibold", children: n }),
        /* @__PURE__ */ h.jsxs(NS, { active: !0, children: [
          /* @__PURE__ */ h.jsx(cR, { kind: i }),
          /* @__PURE__ */ h.jsx("div", { className: "aiwa-screen-cta", children: /* @__PURE__ */ h.jsx(Us, { className: "aiwa-skeleton-cta" }) }),
          /* @__PURE__ */ h.jsxs(gt, { className: "aiwa-tma-blocks", children: [
            /* @__PURE__ */ h.jsx(gt.Item, { className: "aiwa-insight-section", children: /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-insight-content", children: [
              /* @__PURE__ */ h.jsx($i, { active: !0, width: 30 }),
              /* @__PURE__ */ h.jsx($i, { active: !0, width: 26 }),
              /* @__PURE__ */ h.jsx(Us, { className: "aiwa-skeleton-insight-cta" })
            ] }) }) }),
            l.map((o) => /* @__PURE__ */ h.jsx(gt.Item, { header: o.header, children: Wh(o.rows).map((c) => /* @__PURE__ */ h.jsx(
              Tt,
              {
                tappable: !1,
                start: o.media ? /* @__PURE__ */ h.jsx(Us, { className: "aiwa-skeleton-thumb" }) : void 0,
                children: /* @__PURE__ */ h.jsx(
                  Tt.Text,
                  {
                    title: /* @__PURE__ */ h.jsx($i, { active: !0, width: 13 }),
                    description: /* @__PURE__ */ h.jsx($i, { active: !0, width: 22 })
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
function ih({ label: n, value: t, target: i, macro: l, color: o }) {
  const c = i ? Math.min(100, Math.round(Number(t || 0) / Number(i) * 100)) : 0, u = o || (l ? `var(--aiwa-macro-${l})` : "var(--aiwa-accent)");
  return /* @__PURE__ */ h.jsxs("div", { className: "aiwa-macro-card", children: [
    /* @__PURE__ */ h.jsxs(pt, { variant: "body", weight: "semibold", children: [
      /* @__PURE__ */ h.jsx(Ks, { variant: "number", animation: "snappy", children: `${Math.round(t || 0)}${i ? "" : " г"}` }),
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
const K2 = "M 11 169 A 158 158 0 0 1 327 169", Z2 = Math.PI * 158, uR = 500, fR = (n) => 1 - (1 - n) ** 3;
function dR(n) {
  const [t, i] = T.useState(0), l = T.useRef(0), o = T.useRef(0);
  return T.useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      l.current = n, i(n);
      return;
    }
    const u = l.current, d = performance.now(), p = (y) => {
      const g = Math.min(1, (y - d) / uR), v = u + (n - u) * fR(g);
      l.current = v, i(v), g < 1 && (o.current = requestAnimationFrame(p));
    };
    return o.current = requestAnimationFrame(p), () => cancelAnimationFrame(o.current);
  }, [n]), t;
}
function hR({ kcal: n, kcalTarget: t }) {
  const i = Number(n || 0), l = Number(t || 0), o = dR(Math.min(1, i / Math.max(1, l))), c = o * Math.PI, u = 169 - 158 * Math.cos(c), d = 169 - 158 * Math.sin(c);
  return /* @__PURE__ */ h.jsxs("div", { className: "aiwa-food-gauge", children: [
    /* @__PURE__ */ h.jsxs("svg", { className: "aiwa-food-gauge-arc", viewBox: "0 0 338 180", width: "338", height: "180", fill: "none", children: [
      /* @__PURE__ */ h.jsx("path", { className: "aiwa-food-gauge-track", d: K2 }),
      /* @__PURE__ */ h.jsx(
        "path",
        {
          className: "aiwa-food-gauge-progress",
          d: K2,
          strokeDasharray: Z2,
          strokeDashoffset: Z2 * (1 - o)
        }
      ),
      /* @__PURE__ */ h.jsx("circle", { className: "aiwa-food-gauge-knob", cx: u, cy: d, r: "11" })
    ] }),
    /* @__PURE__ */ h.jsxs("div", { className: "aiwa-food-gauge-center", children: [
      /* @__PURE__ */ h.jsx(pt, { variant: "title1", weight: "semibold", children: /* @__PURE__ */ h.jsx(Ks, { variant: "number", animation: "snappy", children: Gh(i) }) }),
      /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: /* @__PURE__ */ h.jsx(Ks, { variant: "number", animation: "snappy", children: `из ${Gh(l)}` }) })
    ] })
  ] });
}
function ur({ label: n, options: t, value: i, onChange: l, surface: o = "container" }) {
  return /* @__PURE__ */ h.jsxs("div", { className: "aiwa-form-group", children: [
    n ? /* @__PURE__ */ h.jsx(pt, { className: "aiwa-form-label", variant: "body", weight: "semibold", children: n }) : null,
    /* @__PURE__ */ h.jsx("div", { className: `aiwa-choice-pills${o === "canvas" ? " is-on-canvas" : ""}`, role: "group", "aria-label": n, children: t.map((c) => {
      const u = typeof c == "string" ? { value: c, label: c } : c;
      return /* @__PURE__ */ h.jsx(
        an,
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
const fr = (n, t) => Object.prototype.hasOwnProperty.call(n || {}, t), Dc = (n, t) => {
  if (!n || fr(n, "error")) return null;
  const i = n.diary && typeof n.diary == "object" ? n.diary : n, l = String(n.date ?? "").trim(), o = String(i.date ?? "").trim();
  if (l && o && l !== o) return null;
  const c = l || o;
  return c && c !== t ? null : c && !i.date ? { ...i, date: c } : i;
}, dr = (n) => Number(
  n?.assetRevision ?? n?.diary?.asset_revision ?? 0
), mR = () => {
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
}, Q2 = (n, t, i) => t && n?.status === "loaded" ? n : i, pR = (n = {}, t = 0) => Object.fromEntries(
  Object.entries(n).filter(([, i]) => i?.status !== "loaded" || dr(i) >= Number(t || 0))
), yR = (n = {}, t = 0, i = []) => {
  const l = pR(n, t), o = /* @__PURE__ */ new Set([
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
}, gR = (n = {}, t = {}) => {
  const i = { ...t };
  return delete i.asset_revision, delete i.recent, {
    ...n,
    ...i,
    asset_revision: n.asset_revision,
    recent: n.recent || {}
  };
}, vR = (n, t) => {
  const i = { ...n || {}, ...t || {} }, l = String(n?.title || "").trim().toLocaleLowerCase("ru-RU"), o = String(t?.title || "").trim().toLocaleLowerCase("ru-RU");
  if (l === o) return i;
  for (const c of Object.keys(i))
    (c === "image" || c === "fclass" || c === "content_hash" || c === "style_version" || c.startsWith("image_") || c.startsWith("asset_") || c.startsWith("canonical_")) && delete i[c];
  return i;
}, F2 = ({
  iso: n,
  today: t,
  diary: i,
  recent: l = {},
  explicit: o = {},
  canonicalVersion: c = 0,
  diaryAssetRevision: u = 0
}) => {
  if (n === t) return { status: "loaded", diary: i };
  const d = fr(o, n) ? o[n] : null, p = fr(l, n) ? Dc(l[n], n) : null;
  return Number(d?.requiredAssetRevision || 0) > Number(u || 0) && d?.status !== "loaded" ? {
    status: d?.status === "stale-assets" ? "loading" : d?.status,
    diary: null
  } : d?.status === "loaded" && (!p || Number(d.canonicalVersion ?? -1) >= c) ? d : p ? { status: "loaded", diary: p } : fr(l, n) ? { status: "error", diary: null } : d || { status: "loading", diary: null };
};
let Sa = null;
const hr = /* @__PURE__ */ new Map(), bR = /* @__PURE__ */ new Set([
  "date_out_of_range",
  "food_target_expired",
  "target_expired"
]), z3 = (n) => globalThis.crypto?.randomUUID?.() || `${n}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`, xR = (n) => JSON.stringify({
  title: String(n?.title || "").trim(),
  kcal: String(n?.kcal ?? "").trim(),
  protein: String(n?.protein ?? "").trim(),
  fat: String(n?.fat ?? "").trim(),
  carbs: String(n?.carbs ?? "").trim(),
  grams: String(n?.grams ?? "").trim(),
  slot: String(n?.slot || "")
}), I2 = (n) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(n || ""))) return null;
  const t = Date.parse(`${n}T00:00:00Z`);
  return !Number.isFinite(t) || new Date(t).toISOString().slice(0, 10) !== n ? null : Math.floor(t / 864e5);
}, SR = (n, t = Ze()) => {
  const i = I2(n), l = I2(t);
  if (i === null || l === null) return !1;
  const o = l - i;
  return o >= 0 && o <= 1;
}, wR = (n) => bR.has(n?.error), CR = (n, t = Ze(), i = () => z3("food-manual")) => {
  const l = xR(n);
  return (!Sa || Sa.fingerprint !== l || !SR(Sa.date, t)) && (Sa = { fingerprint: l, id: i(), date: t }), Sa;
}, TR = (n) => {
  Sa?.id === n && (Sa = null);
}, jR = (n) => {
  Sa?.id === n && (Sa = null);
}, AR = (n, t = () => z3("food-delete")) => {
  const i = String(n);
  return hr.has(i) || hr.set(i, t()), hr.get(i);
}, ER = (n, t) => {
  const i = String(n);
  hr.get(i) === t && hr.delete(i);
};
function J2({ meal: n, onSaved: t, onClose: i, choiceSurface: l = "container" }) {
  const [o, c] = T.useState(() => J_(n)), [u, d] = T.useState(!1), p = (g, v) => c((b) => ({ ...b, [g]: v })), y = async () => {
    if (u) return;
    if (!o.title.trim() && !String(o.kcal).trim()) {
      Mt("Укажи название или калории", { type: "error" });
      return;
    }
    d(!0);
    let g = null;
    try {
      g = n ? null : CR(o);
      const v = await Yt(n ? "/api/diary_edit" : "/api/food_manual", {
        ...n ? { id: n.id } : {},
        ...o,
        ...g ? {
          request_id: g.id,
          date: g.date
        } : {}
      });
      if (v?.ok === !1 || v?.error)
        throw g && wR(v) && jR(g.id), new Error(v.message || "Не получилось сохранить");
      g && TR(g.id), Mt(n ? "Приём обновлён" : "Приём добавлен", { type: "success" }), await t({
        type: n ? "edit" : "receipt",
        result: v,
        meal: n ? vR(n, o) : null
      }), i();
    } catch (v) {
      Mt(v.message || "Не получилось сохранить", { type: "error" });
    } finally {
      d(!1);
    }
  };
  return /* @__PURE__ */ h.jsxs("div", { className: "aiwa-form-stack", children: [
    /* @__PURE__ */ h.jsx(me, { label: "Название", value: o.title, onChange: (g) => p("title", g), placeholder: "Например, творог и банан" }),
    /* @__PURE__ */ h.jsxs("div", { className: "aiwa-form-grid", children: [
      /* @__PURE__ */ h.jsx(me, { label: "Ккал", value: o.kcal, onChange: (g) => p("kcal", g), inputMode: "decimal" }),
      /* @__PURE__ */ h.jsx(me, { label: "Граммы", value: o.grams, onChange: (g) => p("grams", g), inputMode: "decimal" }),
      /* @__PURE__ */ h.jsx(me, { label: "Белки", value: o.protein, onChange: (g) => p("protein", g), inputMode: "decimal" }),
      /* @__PURE__ */ h.jsx(me, { label: "Жиры", value: o.fat, onChange: (g) => p("fat", g), inputMode: "decimal" }),
      /* @__PURE__ */ h.jsx(me, { label: "Углеводы", value: o.carbs, onChange: (g) => p("carbs", g), inputMode: "decimal" })
    ] }),
    /* @__PURE__ */ h.jsx(
      ur,
      {
        label: "Приём пищи",
        options: E3,
        value: o.slot,
        onChange: (g) => p("slot", g),
        surface: l
      }
    ),
    /* @__PURE__ */ h.jsx(
      Ce,
      {
        label: n ? "Сохранить изменения" : "Сохранить приём",
        loading: u,
        isFill: !0,
        ...se("Сохранить приём", y)
      }
    )
  ] });
}
function MR({ isOpen: n, onClose: t, onSaved: i, editingMeal: l = null }) {
  const [o, c] = T.useState("text"), [u, d] = T.useState(""), [p, y] = T.useState(!1);
  T.useEffect(() => {
    n && (v3("food"), c(l ? "manual" : "text"), d(""));
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
  return /* @__PURE__ */ h.jsx(Vn, { isOpen: n, onClose: t, "aria-label": l ? "Изменить приём пищи" : "Добавить приём пищи", children: /* @__PURE__ */ h.jsx("div", { children: /* @__PURE__ */ h.jsx("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: l ? /* @__PURE__ */ h.jsx(J2, { meal: l, onSaved: i, onClose: t, choiceSurface: "canvas" }) : /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
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
      p ? /* @__PURE__ */ h.jsx(nu, { size: 28 }) : null,
      /* @__PURE__ */ h.jsx(pt, { variant: "title3", weight: "semibold", children: p ? "Разбираю фото…" : "Сфотографировать еду" }),
      /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: p ? "Айва считает КБЖУ, это займёт несколько секунд." : "Айва распознает блюдо и посчитает КБЖУ." }),
      /* @__PURE__ */ h.jsx("input", { type: "file", accept: "image/*", capture: "environment", disabled: p, onChange: (b) => v(b.target.files?.[0]) })
    ] }) : null,
    o === "text" ? /* @__PURE__ */ h.jsxs("div", { className: "aiwa-form-stack", children: [
      /* @__PURE__ */ h.jsx(
        me,
        {
          label: "Что было в приёме пищи?",
          value: u,
          onChange: d,
          placeholder: "Например: 200 г творога и банан",
          multiline: !0
        }
      ),
      /* @__PURE__ */ h.jsx(
        Ce,
        {
          label: "Добавить приём",
          loading: p,
          isFill: !0,
          disabled: !u.trim(),
          ...se("Добавить приём", g)
        }
      )
    ] }) : null,
    o === "manual" ? /* @__PURE__ */ h.jsx(J2, { meal: null, onSaved: i, onClose: t, choiceSurface: "canvas" }) : null
  ] }) }) }) });
}
function _R({ isOpen: n, onClose: t, diary: i, onAdd: l, onEdit: o, onDelete: c, onReco: u, canAdd: d = !0 }) {
  const p = i?.meals || [], y = i?.totals || {}, g = i?.target || {};
  return /* @__PURE__ */ h.jsx(Vn, { isOpen: n, onClose: t, "aria-label": "Дневник питания", children: /* @__PURE__ */ h.jsxs(gt, { className: "aiwa-tma-blocks", children: [
    /* @__PURE__ */ h.jsx(gt.Item, { children: /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsx(
      Tt.Text,
      {
        title: `${Math.round(y.kcal || 0)} ккал`,
        description: `из ${Math.round(g.kcal || 0) || "—"} ккал`,
        bold: !0
      }
    ) }) }),
    E3.map((v) => {
      const b = p.filter((j) => (j.slot || "snack") === v.value);
      return /* @__PURE__ */ h.jsx(gt.Item, { header: v.label, children: b.length ? b.map((j) => /* @__PURE__ */ h.jsx(
        zt,
        {
          title: j.title,
          description: `${Math.round(j.kcal || 0)} ккал`,
          onClick: () => o(j),
          separateAction: !0,
          actionLabel: `Изменить ${j.title}, ${Math.round(j.kcal || 0)} ккал`,
          trailing: /* @__PURE__ */ h.jsx(
            an,
            {
              as: "button",
              type: "button",
              mode: "opacity",
              "aria-label": `Удалить ${j.title}`,
              onClick: (w) => {
                w.stopPropagation(), c(j.id);
              },
              children: /* @__PURE__ */ h.jsx(m3, {})
            }
          )
        },
        j.id
      )) : d ? /* @__PURE__ */ h.jsx(Tt, { as: "button", type: "button", onClick: l, end: /* @__PURE__ */ h.jsx(Tt.Part, { type: "Chevron" }), children: /* @__PURE__ */ h.jsx(Tt.Text, { type: "Accent", title: "Добавить" }) }) : /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsx(Tt.Text, { title: "Нет записей" }) }) }, v.value);
    }),
    d || u ? /* @__PURE__ */ h.jsx(gt.Item, { children: /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-cell-actions", children: [
      d ? /* @__PURE__ */ h.jsx(Wa, { variant: "filled", label: "Добавить приём", isFill: !0, ...se("Добавить приём", l) }) : null,
      u ? /* @__PURE__ */ h.jsx(Wa, { variant: "filled", label: "Совет по дневнику", isFill: !0, ...se("Совет по дневнику", u) }) : null
    ] }) }) }) : null
  ] }) });
}
const RR = (n) => {
  const t = String(n || "").match(/\d[\d\s\u00a0]*/);
  return t ? `${t[0].trim()} калорий` : "";
};
function DR({ isOpen: n, meal: t, image: i, slotLabel: l = "", onClose: o, onAdd: c, busy: u = !1 }) {
  const [d, p] = T.useState(null), [y, g] = T.useState(!1), v = t?.dish || "";
  T.useEffect(() => {
    if (!n || !v) return;
    p(null), g(!1);
    let A = !0;
    return Yt("/api/recipe", { dish: v, kcal: t?.kcal }).then((R) => {
      A && (R?.steps?.length ? p(R) : g(!0));
    }).catch(() => A && g(!0)), () => {
      A = !1;
    };
  }, [n, v]);
  const b = d?.macros || {}, j = [b.protein && `Б ${b.protein}`, b.fat && `Ж ${b.fat}`, b.carbs && `У ${b.carbs}`].filter(Boolean).join(" · "), w = d?.kcal || t?.kcal, C = [w, j].filter(Boolean).join(" · "), x = [l, RR(w), d?.time].filter(Boolean).join(" · ");
  return /* @__PURE__ */ h.jsx(Vn, { isOpen: n, onClose: o, "aria-label": v ? `Рецепт: ${v}` : "Рецепт", children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-sheet-scroll aiwa-recipe-page", children: [
    /* @__PURE__ */ h.jsxs("header", { className: "aiwa-recipe-hero", children: [
      i ? /* @__PURE__ */ h.jsx("span", { className: "aiwa-recipe-image", children: /* @__PURE__ */ h.jsx("img", { src: i, alt: v }) }) : null,
      /* @__PURE__ */ h.jsxs("div", { className: "aiwa-recipe-heading", children: [
        /* @__PURE__ */ h.jsx(pt, { as: "h1", variant: "body", weight: "semibold", children: v }),
        x || t?.note ? /* @__PURE__ */ h.jsx(pt, { as: "p", variant: "subheadline2", weight: "regular", children: x || t?.note }) : null
      ] })
    ] }),
    /* @__PURE__ */ h.jsxs("main", { className: "aiwa-recipe-content", "aria-live": "polite", children: [
      !d && !y ? /* @__PURE__ */ h.jsxs("div", { className: "aiwa-recipe-status", role: "status", "aria-label": "Готовлю рецепт", children: [
        /* @__PURE__ */ h.jsx(nu, { size: "m" }),
        /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: "Айва пишет рецепт…" })
      ] }) : null,
      y ? /* @__PURE__ */ h.jsxs("section", { className: "aiwa-recipe-section", children: [
        /* @__PURE__ */ h.jsx(pt, { as: "h2", variant: "body", weight: "semibold", children: "Рецепт не собрался" }),
        /* @__PURE__ */ h.jsx(pt, { as: "p", variant: "body", weight: "regular", children: "Попробуй открыть блюдо ещё раз." })
      ] }) : null,
      d ? /* @__PURE__ */ h.jsxs("section", { className: "aiwa-recipe-section", children: [
        /* @__PURE__ */ h.jsx(pt, { as: "h2", variant: "body", weight: "semibold", children: "Питательность" }),
        /* @__PURE__ */ h.jsx(pt, { as: "p", variant: "body", weight: "regular", children: C || "—" }),
        d.micros?.length ? /* @__PURE__ */ h.jsx(pt, { as: "p", variant: "body", weight: "regular", children: d.micros.join("; ") }) : null
      ] }) : null,
      d?.ingredients?.length ? /* @__PURE__ */ h.jsxs("section", { className: "aiwa-recipe-section", children: [
        /* @__PURE__ */ h.jsx(pt, { as: "h2", variant: "body", weight: "semibold", children: "Ингредиенты" }),
        /* @__PURE__ */ h.jsx("ul", { className: "aiwa-recipe-list", children: d.ingredients.map((A) => /* @__PURE__ */ h.jsx("li", { children: /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: A }) }, A)) })
      ] }) : null,
      d?.steps?.length ? /* @__PURE__ */ h.jsxs("section", { className: "aiwa-recipe-section", children: [
        /* @__PURE__ */ h.jsx(pt, { as: "h2", variant: "body", weight: "semibold", children: "Приготовление" }),
        /* @__PURE__ */ h.jsx("ol", { className: "aiwa-recipe-list", children: d.steps.map((A, R) => /* @__PURE__ */ h.jsx("li", { value: R + 1, children: /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: A }) }, A)) })
      ] }) : null
    ] }),
    /* @__PURE__ */ h.jsx("div", { className: "aiwa-recipe-action", children: /* @__PURE__ */ h.jsx(
      Ce,
      {
        label: "Добавить в дневник",
        loading: u,
        isFill: !0,
        ...se("Добавить в дневник", c)
      }
    ) })
  ] }) });
}
function NR() {
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
const OR = (n) => !!n && !(typeof n == "object" && Object.prototype.hasOwnProperty.call(n, "error")), U3 = {
  foodSection: () => Yt("/api/section", { kind: "food" }),
  diary: () => Yt("/api/diary", {}),
  trainingSection: () => Yt("/api/section", { kind: "training" }),
  train: () => Yt("/api/train", {})
}, Vs = /* @__PURE__ */ new Map(), fc = /* @__PURE__ */ new Map(), tm = /* @__PURE__ */ new Map(), Xc = /* @__PURE__ */ new Map(), em = NR(), dc = (n) => Object.fromEntries(n.map((t) => [t, Vs.get(t) ?? null])), LR = (n) => Object.fromEntries(n.map((t) => [t, Xc.get(t) ?? null])), nm = (n, { force: t = !1, maxAgeMs: i = 1500 } = {}) => {
  if (!t) {
    const c = fc.get(n);
    if (c) return c;
    if (Vs.has(n) && Date.now() - (tm.get(n) || 0) <= i)
      return Promise.resolve(Vs.get(n));
  }
  const l = em.begin(n), o = U3[n]().catch((c) => ({ error: c?.message || "network" })).then((c) => (em.isCurrent(n, l) && (OR(c) ? (Vs.set(n, c), tm.set(n, Date.now()), Xc.delete(n)) : Xc.set(n, c?.error || "network")), fc.get(n) === o && fc.delete(n), Vs.get(n) ?? null));
  return fc.set(n, o), o;
}, $R = () => {
  Object.keys(U3).forEach((n) => {
    nm(n);
  });
};
function H3(n, t) {
  const [i, l] = T.useState(() => dc(n)), o = T.useRef(!1), c = T.useCallback(async (...d) => {
    const p = d.length ? d : n;
    await Promise.all(p.map((y) => nm(y, { force: !0 }))), l(dc(n));
  }, [n]), u = T.useCallback((d, p) => {
    em.begin(d), Vs.set(d, p), tm.set(d, Date.now()), Xc.delete(d), l(dc(n));
  }, [n]);
  return T.useEffect(() => {
    let d = !0;
    const p = o.current;
    return o.current = !0, Promise.all(n.map((y) => nm(y, { force: p }))).then(() => {
      d && l(dc(n));
    }), () => {
      d = !1;
    };
  }, t), [i, c, u, LR(n)];
}
const W2 = ["foodSection", "diary"], q3 = "/assets/food/meal-placeholder.webp", Kc = (n) => String(n || "").toLowerCase().replace(/ё/g, "е").replace(/\s+/g, " ").trim(), tb = "?v=2", eb = (n, t) => {
  const i = Kc(t);
  if (!n || !i) return null;
  const l = n[String(t || "").trim()];
  if (l) return l + tb;
  for (const [o, c] of Object.entries(n))
    if (Kc(o) === i) return c + tb;
  return null;
}, kR = (n) => {
  const t = Kc([
    n?.title,
    ...Array.isArray(n?.items) ? n.items.map((l) => l?.name) : []
  ].filter(Boolean).join(" "));
  return Kc(n?.fclass) === "напиток" || /(кофе|чай|какао|вода|сок|напит|латте|капуч|морс|компот)/.test(t) ? "/assets/food/drink-placeholder.webp" : q3;
}, hc = (n, t) => Object.prototype.hasOwnProperty.call(n, t), BR = (n) => (n || []).reduce((t, i) => ({
  kcal: t.kcal + Number(i?.kcal || 0),
  protein: t.protein + Number(i?.protein || 0),
  fat: t.fat + Number(i?.fat || 0),
  carbs: t.carbs + Number(i?.carbs || 0)
}), { kcal: 0, protein: 0, fat: 0, carbs: 0 });
function nb({ mode: n, revision: t = 0 }) {
  const [i, l, o, c] = H3(W2, [n, t]), [u, d] = T.useState(!1), [p, y] = T.useState(!1), [g, v] = T.useState({}), b = dp(), j = x3(), [w, C] = T.useState({}), [x, A] = T.useState(null), [R, M] = T.useState(!1), [_, L] = T.useState(null), [N, D] = T.useState(!1), [V, H] = T.useState(""), [B, U] = T.useState(null), [I, P] = T.useState(null), [it, J] = T.useState(!1), $ = T.useRef(null), X = T.useRef(null), F = T.useRef({}), tt = T.useRef(/* @__PURE__ */ new Map()), dt = T.useRef(0), O = T.useRef(/* @__PURE__ */ new Map()), q = T.useRef(null), Y = T.useRef(0), et = T.useRef(null);
  et.current || (et.current = mR());
  const ot = Math.max(
    Number(i.foodSection?.asset_revision || 0),
    Number(i.diary?.asset_revision || 0)
  ), ct = Number(i.diary?.asset_revision || 0), ft = T.useRef(ot);
  ft.current = Math.max(ft.current, ot), i.diary && i.diary !== q.current && (q.current = i.diary, Y.current += 1);
  const nt = T.useCallback((at, Bt) => {
    const At = { ...F.current, [at]: Bt };
    F.current = At, C(At);
  }, []), mt = T.useCallback((at) => {
    F.current = at, C(at);
  }, []), ut = T.useCallback((at) => {
    const Bt = F.current, At = [...tt.current.keys()], Te = Number(at || 0) > ct ? Object.keys(i.diary?.recent || {}) : [], Vt = yR(
      Bt,
      at,
      [...At, ...Te]
    );
    if (!Vt.stale.length) return Vt.stale;
    for (const Me of Vt.stale)
      O.current.set(Me, ++dt.current), tt.current.delete(Me);
    return mt(Vt.entries), Vt.stale;
  }, [i.diary?.recent, ct, mt]), yt = T.useCallback((at, { force: Bt = !1, preserveLoadedOnError: At = !1 } = {}) => {
    const Te = tt.current.get(at);
    if (Te && !Bt) return Te;
    const Vt = ++dt.current;
    O.current.set(at, Vt);
    const Me = Y.current, Un = ft.current, De = F.current[at], fe = Number(
      De?.requiredAssetRevision || (De?.status === "stale-assets" ? dr(De) : 0)
    ), Wn = {
      status: "error",
      diary: null,
      ...fe > 0 ? { requiredAssetRevision: fe, assetRevision: fe } : {}
    };
    At && De?.status === "loaded" || nt(at, {
      status: "loading",
      diary: null,
      ...fe > 0 ? { requiredAssetRevision: fe, assetRevision: fe } : {}
    });
    const ta = Yt("/api/diary", { d: at }).then((Qe) => {
      const Ve = Dc(Qe, at), ye = Number(Ve?.asset_revision || 0);
      return Ve && (fe <= 0 || ye >= fe) ? {
        status: "loaded",
        diary: Ve,
        canonicalVersion: Me,
        assetRevision: Math.max(
          ye,
          Un
        )
      } : Q2(De, At, Wn);
    }).catch(() => Q2(De, At, Wn)).then((Qe) => {
      if (O.current.get(at) === Vt) {
        nt(at, Qe);
        const Ve = dr(Qe);
        Qe?.status === "loaded" && Ve > 0 && (ft.current = Math.max(
          ft.current,
          Ve
        ), ut(Ve));
      }
      return Qe;
    }).finally(() => {
      tt.current.get(at) === ta && tt.current.delete(at);
    });
    return tt.current.set(at, ta), ta;
  }, [nt, ut]), xt = !!i.foodSection?.refreshing, ce = T.useRef(0);
  T.useEffect(() => {
    if (!xt) {
      ce.current = 0;
      return;
    }
    if (ce.current >= 3) return;
    const at = Math.max(5e3, Number(i.foodSection?.retry_after_ms || 8e3)) + Math.floor(Math.random() * 2500), Bt = setTimeout(() => {
      document.visibilityState === "visible" && (ce.current += 1, l("foodSection"));
    }, at);
    return () => clearTimeout(Bt);
  }, [xt, i.foodSection, l]);
  const ht = T.useRef({ revision: null, attempts: 0 }), Wt = [
    ...i.foodSection?.menu?.meals || [],
    ...i.diary?.meals || [],
    ...Object.values(i.diary?.recent || {}).flatMap((at) => at?.meals || []),
    ...Object.values(w).flatMap((at) => at?.diary?.meals || [])
  ].some((at) => at?.asset_state === "missing" || at?.image_source === "catalog_family" || at?.image_source === "catalog_canonical"), ue = Math.max(
    ft.current,
    ot,
    ...Object.values(w).map(dr)
  );
  T.useEffect(() => {
    if (!Wt) {
      ht.current = { revision: null, attempts: 0 };
      return;
    }
    ht.current.revision === null && (ht.current.revision = ue);
    let at = !0, Bt = null;
    const At = async () => {
      if (!(!at || ht.current.attempts >= 30)) {
        if (document.visibilityState === "visible") {
          const Te = await Yt("/api/food-assets/revision", {}).catch(() => null), Vt = Number(Te?.revision);
          if (Number.isFinite(Vt)) {
            const Me = ht.current.revision;
            ht.current.revision = Vt, ft.current = Math.max(ft.current, Vt), Me !== null && Vt !== Me && (ut(Vt), await l("foodSection", "diary"), at && b !== j && await yt(b, { force: !0 }));
          }
          ht.current.attempts += 1;
        }
        at && ht.current.attempts < 30 && (Bt = setTimeout(At, 6e4 + Math.floor(Math.random() * 2e4)));
      }
    };
    return Bt = setTimeout(At, 15e3 + Math.floor(Math.random() * 2e4)), () => {
      at = !1, Bt && clearTimeout(Bt);
    };
  }, [Wt, ut, ue, l, yt, b, j]), T.useEffect(() => {
    if (!ot) return;
    const at = ut(ot);
    b !== j && at.includes(b) && yt(b, { force: !0 });
  }, [ot, ut, yt, b, j]), T.useEffect(() => {
    fetch("/assets/food/manifest.json", { cache: "no-cache" }).then((at) => at.ok ? at.json() : {}).then((at) => v(at || {})).catch(() => {
    });
  }, []), T.useEffect(() => {
    if (!i.diary || !b || b === j) return;
    if (w[b]?.status === "stale-assets") {
      yt(b, { force: !0 });
      return;
    }
    hc(i.diary.recent || {}, b) || hc(w, b) || yt(b);
  }, [i.diary, w, yt, b, j]);
  const te = async (at = null) => {
    const Bt = String(at?.targetIso || "").trim(), At = String(
      at?.result?.date || at?.result?.diary?.date || (at?.type === "edit" || at?.type === "delete" ? Bt || b : j)
    ), Vt = !(at?.type === "edit" || at?.type === "delete") || et.current.accept(
      At,
      at?.mutationToken
    );
    let Me = !Vt && At === b;
    const Un = at?.result ? Dc(at.result, At) : null, De = Un && Array.isArray(Un.meals) ? Un : null;
    if (Vt && De) {
      const fe = Number(De.asset_revision || 0);
      fe > 0 && (ft.current = Math.max(
        ft.current,
        fe
      ), ut(fe)), At === j ? o("diary", gR(i.diary, De)) : (nt(At, {
        status: "loaded",
        diary: De,
        canonicalVersion: Y.current + 1,
        assetRevision: Math.max(
          Number(De.asset_revision || 0),
          ft.current
        )
      }), hc(i.diary?.recent || {}, At) && o("diary", {
        ...i.diary || {},
        recent: { ...i.diary?.recent || {}, [At]: De }
      }), Me = At === b);
    }
    if (Vt && !De && At && At !== j && (at?.type === "edit" || at?.type === "delete")) {
      const fe = F2({
        iso: At,
        today: j,
        diary: i.diary,
        recent: i.diary?.recent || {},
        explicit: F.current,
        canonicalVersion: Y.current,
        diaryAssetRevision: ct
      }).diary;
      if (fe) {
        const Wn = at.type === "delete" ? (fe.meals || []).filter((Qe) => Qe.id !== at.id) : (fe.meals || []).map((Qe) => Qe.id === at.meal?.id ? at.meal : Qe), ta = { ...fe, meals: Wn, totals: BR(Wn), date: At };
        nt(At, {
          status: "loaded",
          diary: ta,
          canonicalVersion: Y.current + 1,
          assetRevision: ft.current
        }), hc(i.diary?.recent || {}, At) && o("diary", {
          ...i.diary || {},
          ...Dc(at.result, j) || {},
          recent: { ...i.diary?.recent || {}, [At]: ta }
        }), Me = At === b;
      }
    }
    await l("diary"), b && b !== j && await yt(b, {
      force: !0,
      preserveLoadedOnError: Me
    });
  }, zn = c.foodSection || c.diary, He = () => l(...W2.filter((at) => c[at]));
  if (!i.foodSection || !i.diary)
    return zn ? /* @__PURE__ */ h.jsx(ei, { children: /* @__PURE__ */ h.jsx(ti, { mode: "secondary", children: /* @__PURE__ */ h.jsx("div", { className: "aiwa-paper-screen aiwa-food-screen", children: /* @__PURE__ */ h.jsx(gt, { className: "aiwa-tma-blocks", children: /* @__PURE__ */ h.jsx(gt.Item, { header: "Питание", children: /* @__PURE__ */ h.jsx(
      zt,
      {
        title: "Не удалось загрузить данные",
        description: "Нажми, чтобы попробовать ещё раз.",
        onClick: He
      }
    ) }) }) }) }) }) : /* @__PURE__ */ h.jsx(V3, { title: "Питание", variant: "food" });
  const Fn = i.foodSection, In = i.diary, $r = In.target || {}, Be = Fn.menu?.meals || [], Ws = [
    { index: 0, value: "breakfast", label: "Завтрак" },
    { index: 1, value: "lunch", label: "Обед" },
    { index: Be.length >= 4 ? 3 : 2, value: "dinner", label: "Ужин" }
  ].map((at) => ({ ...at, meal: Be[at.index] })).filter((at) => at.meal).map((at) => ({
    ...at,
    // Server artwork is authoritative; the exact manifest match and the
    // meal placeholder are fallbacks only.
    image: at.meal.image_url || at.meal.image || eb(g, at.meal.dish) || q3
  })), kr = In.recent || {}, ai = (at) => F2({
    iso: at,
    today: j,
    diary: In,
    recent: kr,
    explicit: w,
    canonicalVersion: Y.current,
    diaryAssetRevision: ct
  }), ii = ai(b), si = ii.diary, pe = b !== j;
  ii.status === "loaded" && si && (X.current = si);
  const Br = pe ? si?.meals || [] : (In.meals || []).slice().reverse(), li = pe ? `Приёмы за ${Or(b)}` : "Прошедшие приёмы", qe = it || pe && ii.status === "loading", En = pe && ii.status === "error", Ye = Br.length > 0 || qe || En, lu = () => yt(b, { force: !0 }), ru = (at) => {
    const Bt = ai(at);
    if (Bt.status === "error")
      return /* @__PURE__ */ h.jsxs("div", { className: "aiwa-countdown", role: "status", "aria-label": "Данные за выбранный день недоступны", children: [
        /* @__PURE__ */ h.jsx(pt, { variant: "title1", weight: "semibold", children: "—" }),
        /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: "Данные за этот день недоступны" })
      ] });
    const At = Bt.diary || Bt.status === "loading" && X.current || In, Te = At.totals || {}, Vt = At.target || $r, Me = (Un) => Number(Te[Un] || 0);
    return /* @__PURE__ */ h.jsxs("div", { className: "aiwa-day-hero", "data-loading": Bt.status === "loading" ? "true" : void 0, children: [
      /* @__PURE__ */ h.jsx(
        hR,
        {
          kcal: Number(Te.kcal || 0),
          kcalTarget: Number(Vt.kcal || Fn.kcal || 0)
        }
      ),
      /* @__PURE__ */ h.jsxs("div", { className: "aiwa-macro-grid", children: [
        /* @__PURE__ */ h.jsx(ih, { label: "Жиры", value: Me("fat"), target: Vt.fat, macro: "fat" }),
        /* @__PURE__ */ h.jsx(ih, { label: "Белки", value: Me("protein"), target: Vt.protein, macro: "protein" }),
        /* @__PURE__ */ h.jsx(ih, { label: "Углеводы", value: Me("carbs"), target: Vt.carbs, macro: "carbs" })
      ] })
    ] });
  }, ou = async () => {
    if (!N) {
      D(!0);
      try {
        const at = await Yt("/api/week_food_review", {}).catch(() => null);
        at?.review?.summary ? L(at.review) : L({ summary: at?.text || "Не получилось собрать разбор, попробуй чуть позже.", gaps: [], tips: [] });
      } finally {
        D(!1);
      }
    }
  }, qi = async (at, Bt) => {
    if (!(pe || R)) {
      M(!0);
      try {
        const At = await Yt("/api/food_text", { text: at.dish || at.title, slot: Bt }).catch(() => null);
        At?.ok ? (Mt("Добавлено в дневник", { type: "success" }), A(null), await te({ type: "receipt", result: At })) : Mt(At?.message || "Не получилось добавить", { type: "error" });
      } finally {
        M(!1);
      }
    }
  }, Yi = async (at) => {
    const Bt = et.current.begin(), At = b, Te = AR(at);
    try {
      const Vt = await Yt("/api/diary_del", { id: at, request_id: Te });
      if (!Vt || Vt.error || Vt.ok === !1)
        throw new Error(Vt?.message || "Не получилось удалить приём");
      ER(at, Te), Mt("Приём удалён", { type: "success" }), await te({ type: "delete", id: at, result: Vt, mutationToken: Bt, targetIso: At });
    } catch (Vt) {
      Mt(Vt?.message || "Не получилось удалить приём", { type: "error" });
    }
  }, Pi = () => {
    pe || (P(null), U(null), H("add"));
  }, Jn = async (at) => {
    if (!(pe || !at || it)) {
      J(!0);
      try {
        const Bt = window.aiwaUploadFoodPhoto;
        if (typeof Bt != "function") throw new Error("Загрузка фото недоступна");
        const At = await Bt(at);
        await te(At && typeof At == "object" ? { type: "receipt", result: At } : null), Mt("Приём добавлен", { type: "success" });
      } catch (Bt) {
        Mt(Bt.message || "Не получилось разобрать фото", { type: "error" });
      } finally {
        J(!1);
      }
    }
  }, Gi = async () => {
    pe || (await Yt("/api/food_prompt", {}).catch(() => null), Qs({ nudge: !1 }));
  }, ri = [
    { label: "Фото", icon: /* @__PURE__ */ h.jsx(D_, {}), onSelect: () => $.current?.click() },
    { label: "Текстом", icon: /* @__PURE__ */ h.jsx(N_, {}), onSelect: Gi }
  ];
  return /* @__PURE__ */ h.jsx(ei, { children: /* @__PURE__ */ h.jsx(ti, { mode: "secondary", children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-paper-screen aiwa-food-screen", children: [
    /* @__PURE__ */ h.jsx(
      mp,
      {
        hero: ru,
        onProfile: () => d(!0),
        onCalendar: () => y(!0),
        action: pe ? null : /* @__PURE__ */ h.jsxs("div", { className: "aiwa-screen-cta", children: [
          /* @__PURE__ */ h.jsx(
            B3,
            {
              items: ri,
              trigger: /* @__PURE__ */ h.jsx(
                Ce,
                {
                  "aria-label": "Добавить приём",
                  label: /* @__PURE__ */ h.jsxs("span", { className: "aiwa-btn-icon-label", children: [
                    /* @__PURE__ */ h.jsx(Zs, {}),
                    " Добавить приём"
                  ] })
                }
              )
            }
          ),
          /* @__PURE__ */ h.jsx(
            "input",
            {
              ref: $,
              type: "file",
              accept: "image/*",
              hidden: !0,
              onChange: (at) => {
                Jn(at.target.files?.[0]), at.target.value = "";
              }
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ h.jsxs(gt, { className: "aiwa-tma-blocks", children: [
      zn ? /* @__PURE__ */ h.jsx(gt.Item, { children: /* @__PURE__ */ h.jsx(
        zt,
        {
          title: "Не удалось обновить данные",
          description: "Показываем последнюю сохранённую версию. Нажми, чтобы повторить.",
          onClick: He
        }
      ) }) : null,
      /* @__PURE__ */ h.jsx(
        Cr,
        {
          message: Fn.text || "Выбираем простую еду с белком в каждом приёме.",
          onDiscuss: () => Qs({ topic: "food" })
        }
      ),
      !pe && xt ? /* @__PURE__ */ h.jsx(gt.Item, { header: "Меню на сегодня", children: /* @__PURE__ */ h.jsx(zt, { loading: !0, title: "Айва собирает меню…", description: "Завтрак, обед и ужин под фазу" }) }) : null,
      !pe && Ws.length ? /* @__PURE__ */ h.jsx(gt.Item, { header: "Меню на сегодня", children: Ws.map((at) => /* @__PURE__ */ h.jsx(
        zt,
        {
          image: at.image,
          title: at.meal.dish || "Рекомендация Айвы",
          description: [at.label, at.meal.kcal, at.meal.note].filter(Boolean).join(" · "),
          onClick: () => A(at)
        },
        at.value
      )) }) : null,
      Ye ? /* @__PURE__ */ h.jsxs(gt.Item, { header: li, children: [
        it ? /* @__PURE__ */ h.jsx(zt, { loading: !0, title: "Разбираю фото…", description: "Айва считает КБЖУ" }) : null,
        pe && ii.status === "loading" ? /* @__PURE__ */ h.jsx(zt, { loading: !0, title: "Загружаю…", description: "Дневник за выбранный день" }) : null,
        En ? /* @__PURE__ */ h.jsx(
          zt,
          {
            title: "Не удалось загрузить дневник",
            description: "Нажми, чтобы попробовать ещё раз.",
            onClick: lu
          }
        ) : null,
        Br.map((at) => /* @__PURE__ */ h.jsx(
          zt,
          {
            image: at.image_url || eb(g, at.title) || kR(at),
            title: at.title,
            description: `${Gh(at.kcal)} · Б${Math.round(at.protein || 0)} · Ж${Math.round(at.fat || 0)} · У${Math.round(at.carbs || 0)}`,
            onClick: () => H("diary")
          },
          at.id
        )),
        _ ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
          /* @__PURE__ */ h.jsx(Cr, { message: _.summary }),
          _.gaps?.length ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
            /* @__PURE__ */ h.jsx(zt, { title: "Чего не хватает", description: "" }),
            _.gaps.map((at) => /* @__PURE__ */ h.jsx(zt, { title: at }, at))
          ] }) : null,
          _.tips?.length ? /* @__PURE__ */ h.jsxs(h.Fragment, { children: [
            /* @__PURE__ */ h.jsx(zt, { title: "Советы на неделю", description: "" }),
            _.tips.map((at, Bt) => /* @__PURE__ */ h.jsx(zt, { title: `${Bt + 1}. ${at}` }, at))
          ] }) : null
        ] }) : null,
        /* @__PURE__ */ h.jsx("div", { className: "aiwa-cell-actions aiwa-week-review-cta", children: /* @__PURE__ */ h.jsx(
          Ce,
          {
            label: "Разобрать питание за неделю",
            loading: N,
            isFill: !0,
            ...se("Разобрать питание за неделю", ou)
          }
        ) })
      ] }) : null
    ] }),
    /* @__PURE__ */ h.jsx(xp, { isOpen: u, onClose: () => d(!1) }),
    /* @__PURE__ */ h.jsx(
      vp,
      {
        isOpen: p,
        onClose: () => y(!1),
        mode: n,
        revision: t,
        symptomGroups: Ue("aiwaSymptomGroups")
      }
    ),
    /* @__PURE__ */ h.jsx(
      MR,
      {
        isOpen: V === "add" && (!pe || !!B),
        onClose: () => H(""),
        onSaved: (at) => te(at?.type === "edit" ? {
          ...at,
          mutationToken: I?.token,
          targetIso: I?.targetIso
        } : at),
        editingMeal: B
      }
    ),
    /* @__PURE__ */ h.jsx(
      DR,
      {
        isOpen: !pe && !!x,
        meal: x?.meal,
        image: x?.image,
        slotLabel: x?.label,
        busy: R,
        onClose: () => A(null),
        onAdd: () => !pe && x && qi(x.meal, x.value)
      }
    ),
    /* @__PURE__ */ h.jsx(
      _R,
      {
        isOpen: V === "diary",
        onClose: () => H(""),
        diary: pe ? si || { meals: [], totals: {}, target: $r } : In,
        canAdd: !pe,
        onAdd: Pi,
        onEdit: (at) => {
          P({
            token: et.current.begin(),
            targetIso: b
          }), U(at), H("add");
        },
        onDelete: Yi,
        onReco: pe ? void 0 : async () => {
          const at = await Yt("/api/diary_reco", {}).catch(() => null);
          Mt(at?.text || "Не удалось собрать совет");
        }
      }
    )
  ] }) }) });
}
const Zc = /* @__PURE__ */ new Map(), am = (n) => Array.isArray(n) ? n.map(am) : !n || typeof n != "object" ? n : Object.fromEntries(
  Object.keys(n).sort().map((t) => [t, am(n[t])])
), VR = (n) => JSON.stringify(am(n)), zR = () => globalThis.crypto?.randomUUID?.() || `workout-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`, UR = (n, t = zR) => {
  const i = VR(n);
  let l = Zc.get(i);
  return l || (l = { fingerprint: i, id: t() }, Zc.set(i, l)), l;
}, HR = (n) => !n || Zc.get(n.fingerprint)?.id !== n.id ? !1 : (Zc.delete(n.fingerprint), !0), qR = /^\d{4}-\d{2}-\d{2}$/, YR = 90, Tr = (n) => {
  const t = String(n || "");
  if (!qR.test(t)) return "";
  const i = /* @__PURE__ */ new Date(`${t}T00:00:00Z`);
  return !Number.isNaN(i.getTime()) && i.toISOString().slice(0, 10) === t ? t : "";
}, Y3 = (n = Ze()) => {
  const t = Tr(n) || Ze(), i = /* @__PURE__ */ new Date(`${t}T00:00:00Z`);
  return i.setUTCDate(i.getUTCDate() - YR), i.toISOString().slice(0, 10);
}, Sp = (n, t = Ze()) => {
  const i = Tr(n), l = Tr(t);
  return !!(i && l && i >= Y3(l) && i <= l);
}, PR = (n, t) => {
  const i = Tr(n);
  return Sp(i, t) ? i : t;
};
function GR({ isOpen: n, onClose: t, onSaved: i, suggested: l, favoriteTypes: o, initialDate: c, today: u = Ze() }) {
  const d = [
    ..._2.filter((Y) => Y !== "Своё"),
    ...(o || []).filter((Y) => !_2.includes(Y)),
    "Своё"
  ], p = Tr(u) || Ze(), y = PR(c, p), [g, v] = T.useState(y), [b, j] = T.useState("Силовая"), [w, C] = T.useState("45 мин"), [x, A] = T.useState("Нормально"), [R, M] = T.useState([]), [_, L] = T.useState({}), [N, D] = T.useState(""), [V, H] = T.useState(""), [B, U] = T.useState(!1), [I, P] = T.useState(""), [it, J] = T.useState(null);
  T.useEffect(() => {
    if (!n) return;
    v3("workout");
    const Y = l?.name || "", et = (l?.exercises || []).filter((ft) => ft?.name), ot = /ход|прогул/i.test(Y) ? "Ходьба" : /пилатес/i.test(Y) ? "Пилатес" : /йог|мобил|релиз|растяж/i.test(Y) ? "Йога" : /кардио|бег|вело/i.test(Y) ? "Кардио" : /плав/i.test(Y) ? "Плавание" : "Силовая";
    j(ot), et.length ? (M(et.map((ft) => ft.name)), L(Object.fromEntries(et.map((ft) => [ft.name, { sets: ft.sets || "", reps: ft.reps || "" }])))) : (M(Y ? [Y] : []), L({})), D(""), H("");
    const ct = (l?.exercises || []).find((ft) => ft?.name)?.name;
    P(ct && Object.keys(Ei).find((ft) => Ei[ft].includes(ct)) || ""), J(null), v(y);
  }, [n, l, y]);
  const $ = (Y) => M((et) => et.includes(Y) ? et.filter((ot) => ot !== Y) : [...et, Y]), X = b === "Силовая", F = (Y) => Object.keys(Ei).find((et) => Ei[et].includes(Y)) || null, tt = (Y, et, ot) => L((ct) => ({ ...ct, [Y]: { ...ct[Y], [et]: ot } })), dt = (Y, et) => {
    const ot = String(_[Y]?.[et] ?? "").replace(",", ".").trim(), ct = Number(ot);
    return ot && Number.isFinite(ct) && ct > 0 ? ct : null;
  }, O = async () => {
    if (B) return;
    if (!Sp(g, p)) {
      Mt("Тренировку можно отметить за сегодня или за предыдущие 90 дней.", { type: "error" });
      return;
    }
    const Y = [...R, ...N.trim() ? [N.trim()] : []];
    U(!0);
    try {
      const et = {
        date: g,
        type: b === "Своё" ? V.trim() || "Своё" : b,
        duration: w,
        rpe: x,
        items: Y.map((ft) => ({
          name: ft,
          weight: X ? dt(ft, "w") : null,
          sets: X ? dt(ft, "sets") : null,
          reps: X ? dt(ft, "reps") : null,
          group: X ? F(ft) : null
        }))
      }, ot = UR(et), ct = await Yt("/api/workout", {
        ...et,
        request_id: ot.id
      });
      if (!ct?.ok) throw new Error(ct?.text || "Не получилось сохранить тренировку");
      await i?.({
        ...ct,
        requestedDate: g,
        date: ct.date || ct.d || g
      }), J({ text: ct.review || "", calories: ct.calories || 0 }), HR(ot);
    } catch (et) {
      Mt(et.message || "Не получилось сохранить", { type: "error" });
    } finally {
      U(!1);
    }
  }, q = (Y) => /* @__PURE__ */ h.jsxs("div", { className: "aiwa-exercise-item", children: [
    /* @__PURE__ */ h.jsx(
      Tt,
      {
        as: "button",
        type: "button",
        "aria-pressed": R.includes(Y),
        onClick: () => $(Y),
        end: /* @__PURE__ */ h.jsx("span", { className: R.includes(Y) ? "aiwa-check is-active" : "aiwa-check", children: R.includes(Y) ? "✓" : /* @__PURE__ */ h.jsx(Zs, {}) }),
        children: /* @__PURE__ */ h.jsx(Tt.Text, { title: Y })
      }
    ),
    X && R.includes(Y) ? /* @__PURE__ */ h.jsxs("div", { className: "aiwa-exercise-nums", children: [
      /* @__PURE__ */ h.jsx(
        "input",
        {
          inputMode: "decimal",
          placeholder: "кг",
          "aria-label": `${Y}: вес`,
          value: _[Y]?.w ?? "",
          onChange: (et) => tt(Y, "w", et.target.value)
        }
      ),
      /* @__PURE__ */ h.jsx(
        "input",
        {
          inputMode: "numeric",
          placeholder: "подходы",
          "aria-label": `${Y}: подходы`,
          value: _[Y]?.sets ?? "",
          onChange: (et) => tt(Y, "sets", et.target.value)
        }
      ),
      /* @__PURE__ */ h.jsx(
        "input",
        {
          inputMode: "numeric",
          placeholder: "повторы",
          "aria-label": `${Y}: повторы`,
          value: _[Y]?.reps ?? "",
          onChange: (et) => tt(Y, "reps", et.target.value)
        }
      )
    ] }) : null
  ] }, Y);
  return it ? /* @__PURE__ */ h.jsx(Vn, { isOpen: n, onClose: t, "aria-label": "Разбор тренировки", children: /* @__PURE__ */ h.jsx("div", { children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ h.jsxs("div", { className: "aiwa-sheet-card aiwa-workout-review", children: [
      /* @__PURE__ */ h.jsx(pt, { variant: "title2", weight: "semibold", children: "Тренировка сохранена" }),
      /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: `Сожжено примерно ${it.calories} ккал.` }),
      it.text ? /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: it.text }) : null
    ] }),
    /* @__PURE__ */ h.jsx(Ce, { label: "Понятно", isFill: !0, ...se("Закрыть разбор", t) })
  ] }) }) }) : /* @__PURE__ */ h.jsx(Vn, { isOpen: n, onClose: t, "aria-label": "Отметить тренировку", children: /* @__PURE__ */ h.jsx("div", { children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ h.jsx(
      me,
      {
        label: "Когда",
        type: "date",
        min: Y3(p),
        max: p,
        value: g,
        onChange: v
      }
    ),
    /* @__PURE__ */ h.jsx(ur, { surface: "canvas", label: "Что делала", options: d, value: b, onChange: (Y) => {
      j(Y), M([]);
    } }),
    b === "Своё" ? /* @__PURE__ */ h.jsx(me, { label: "Название тренировки", value: V, onChange: H, placeholder: "Напр. Сквош" }) : null,
    /* @__PURE__ */ h.jsx("div", { className: "aiwa-workout-exercises", children: /* @__PURE__ */ h.jsx(gt, { children: /* @__PURE__ */ h.jsxs(gt.Item, { header: "Упражнения", children: [
      X ? Object.keys(Ei).map((Y) => {
        const et = Ei[Y].filter((ft) => R.includes(ft)).length, ot = I === Y, ct = et ? /* @__PURE__ */ h.jsx(pt, { variant: "caption1", weight: "regular", children: `выбрано ${et}` }) : ot ? /* @__PURE__ */ h.jsx(pt, { variant: "caption1", weight: "regular", children: "—" }) : /* @__PURE__ */ h.jsx("span", { className: "aiwa-exercise-add-icon", "aria-hidden": "true", children: /* @__PURE__ */ h.jsx(Zs, {}) });
        return /* @__PURE__ */ h.jsxs("div", { className: "aiwa-exercise-item", children: [
          /* @__PURE__ */ h.jsx(
            Tt,
            {
              as: "button",
              type: "button",
              "data-aiwa-exercise-group": "true",
              "aria-expanded": ot,
              onClick: () => P(ot ? "" : Y),
              end: ct,
              children: /* @__PURE__ */ h.jsx(Tt.Text, { title: Y, bold: !0 })
            }
          ),
          ot ? Ei[Y].map(q) : null
        ] }, Y);
      }) : (W_[b] || []).map(q),
      /* @__PURE__ */ h.jsxs(Tt, { "data-aiwa-exercise-custom": "true", tappable: !1, children: [
        /* @__PURE__ */ h.jsx(pt, { variant: "caption1", weight: "regular", children: "Добавить своё" }),
        /* @__PURE__ */ h.jsx(Tt.Editable, { label: "Название упражнения", value: N, onChange: D })
      ] })
    ] }) }) }),
    /* @__PURE__ */ h.jsx(ur, { surface: "canvas", label: "Длительность", options: ["30 мин", "45 мин", "60+ мин"], value: w, onChange: C }),
    /* @__PURE__ */ h.jsx(ur, { surface: "canvas", label: "Как ощущалось", options: ["Легко", "Нормально", "Тяжело"], value: x, onChange: A }),
    /* @__PURE__ */ h.jsx(
      Ce,
      {
        label: "Сохранить и разобрать",
        loading: B,
        isFill: !0,
        ...se("Сохранить и разобрать", O)
      }
    )
  ] }) }) });
}
function XR({ isOpen: n, onClose: t, options: i, onSelect: l }) {
  return /* @__PURE__ */ h.jsx(Vn, { isOpen: n, onClose: t, children: /* @__PURE__ */ h.jsxs(gt, { className: "aiwa-tma-blocks", children: [
    /* @__PURE__ */ h.jsx(gt.Item, { children: /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsx(
      Tt.Text,
      {
        title: "Рекомендация на сегодня",
        description: "Выбери вариант, после которого останется запас сил."
      }
    ) }) }),
    /* @__PURE__ */ h.jsx(gt.Item, { children: i.map((o, c) => /* @__PURE__ */ h.jsx(
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
function KR({ isOpen: n, onClose: t, state: i, onAdd: l }) {
  const o = i?.today || [];
  return /* @__PURE__ */ h.jsx(Vn, { isOpen: n, onClose: t, children: /* @__PURE__ */ h.jsxs(gt, { className: "aiwa-tma-blocks", children: [
    i?.last_review ? /* @__PURE__ */ h.jsx(
      Cr,
      {
        message: i.last_review.text || i.last_review,
        onDiscuss: () => Qs({ topic: "train" })
      }
    ) : null,
    /* @__PURE__ */ h.jsx(gt.Item, { header: "Неделя", children: (i?.week || []).map((c) => /* @__PURE__ */ h.jsx(
      zt,
      {
        title: c.dow,
        description: c.count ? `${c.type || "Тренировка"} · ${c.count}` : "Без тренировки",
        muted: !c.count
      },
      c.d
    )) }),
    o.length ? /* @__PURE__ */ h.jsx(gt.Item, { header: "Сегодня", children: o.map((c) => /* @__PURE__ */ h.jsx(
      zt,
      {
        title: c.type || "Тренировка",
        description: `${c.duration || "—"} · ${String(c.rpe || "").toLowerCase()}`
      },
      c.id
    )) }) : null,
    /* @__PURE__ */ h.jsx(gt.Item, { children: /* @__PURE__ */ h.jsx(Tt, { tappable: !1, children: /* @__PURE__ */ h.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ h.jsx(
      Wa,
      {
        variant: "filled",
        label: "Отметить тренировку",
        isFill: !0,
        ...se("Отметить тренировку", l)
      }
    ) }) }) })
  ] }) });
}
function ZR({ isOpen: n, onClose: t, profile: i, onSaved: l }) {
  const [o, c] = T.useState(i || {});
  T.useEffect(() => {
    n && c(i || {});
  }, [n, i]);
  const u = (p, y) => c((g) => ({ ...g, [p]: y })), d = async () => {
    (await Yt("/api/train_profile", o).catch(() => null))?.ok ? (Mt("Тренировочный профиль сохранён", { type: "success" }), await l(), t()) : Mt("Не получилось сохранить", { type: "error" });
  };
  return /* @__PURE__ */ h.jsx(Vn, { isOpen: n, onClose: t, children: /* @__PURE__ */ h.jsx("div", { children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: "Расскажи, чем занимаешься и что важно беречь. Айва учтёт это в рекомендациях и разборе нагрузки." }),
    /* @__PURE__ */ h.jsx(me, { label: "Формат", value: o.format || "", onChange: (p) => u("format", p), placeholder: "Зал и прогулки" }),
    /* @__PURE__ */ h.jsx(me, { label: "Цель", value: o.goal || "", onChange: (p) => u("goal", p), placeholder: "Тонус и больше энергии" }),
    /* @__PURE__ */ h.jsx(me, { label: "Ограничения", value: o.limits || "", onChange: (p) => u("limits", p), placeholder: "Например, бережём поясницу" }),
    /* @__PURE__ */ h.jsx(Wa, { variant: "filled", label: "Сохранить", isFill: !0, ...se("Сохранить профиль", d) })
  ] }) }) });
}
const ab = ["trainingSection", "train"], ib = (n) => {
  const t = n % 100, i = n % 10;
  return t >= 11 && t <= 14 ? "тренировок" : i === 1 ? "тренировка" : i >= 2 && i <= 4 ? "тренировки" : "тренировок";
}, QR = (n = [], t = null) => {
  if (!t || typeof t != "object") return n;
  const i = t.id;
  return [...i == null ? n : n.filter((o) => o?.id !== i), t];
}, FR = (n, t) => {
  const i = n?.status === "loaded";
  return {
    status: i ? "loaded" : "partial",
    workouts: QR(i ? n.workouts : [], t),
    ...i ? {} : {
      message: "Тренировка сохранена, но день загрузился не полностью. Нажми, чтобы обновить."
    }
  };
}, IR = ({ iso: n, week: t = [], explicit: i = {} }) => {
  if (Object.prototype.hasOwnProperty.call(i, n)) return i[n];
  const l = t.find((o) => o.d === n);
  return l && Number(l.count || 0) === 0 ? { status: "loaded", workouts: [] } : void 0;
}, JR = ({ iso: n, week: t = [], explicit: i = {} }) => {
  if (Object.prototype.hasOwnProperty.call(i, n)) {
    const o = i[n];
    return o?.status === "loaded" || o?.status === "partial" ? o.workouts.length : null;
  }
  const l = t.find((o) => o.d === n);
  return l ? Number(l.count || 0) : null;
}, sb = ({ iso: n, today: t, status: i, count: l, weekCount: o = 0 }) => {
  if (n === t)
    return { value: String(o), label: `${ib(o)} на этой неделе` };
  if (i === "error") return { value: "—", label: "Данные за этот день недоступны" };
  if (i === "partial") {
    const u = Number(l || 0);
    return { value: String(u), label: "Тренировка сохранена · обнови день" };
  }
  if (i !== "loaded")
    return { value: "…", label: `Загружаю тренировки за ${Or(n)}` };
  const c = Number(l || 0);
  return { value: String(c), label: `${ib(c)} в этот день` };
}, WR = "/assets/train/workout-placeholder.webp", lb = (n) => n && n.image_url || WR;
function tD({ mode: n, revision: t = 0 }) {
  const [i, l, o, c] = H3(ab, [n, t]), [u, d] = T.useState(!1), [p, y] = T.useState(!1), [g, v] = T.useState(""), [b, j] = T.useState(null), w = dp(), C = x3(), x = Sp(w, C), [A, R] = T.useState({}), M = T.useRef({}), _ = T.useRef(0), L = T.useRef({}), [N, D] = T.useState(0), V = T.useRef(!0);
  T.useEffect(() => (V.current = !0, () => {
    V.current = !1;
  }), []), T.useEffect(() => {
    if (!i.train || !w || w === C) return;
    const ht = (i.train?.week || []).find((te) => te.d === w);
    if (ht && Number(ht.count || 0) === 0) return;
    const $t = M.current[w];
    if ($t && $t.status !== "retrying") return;
    const Wt = ++_.current;
    L.current = { ...L.current, [w]: Wt }, M.current = {
      ...M.current,
      [w]: { status: "loading", workouts: $t?.workouts || [] }
    }, R(M.current);
    const ue = (te) => {
      L.current[w] === Wt && (M.current = { ...M.current, [w]: te }, V.current && R(M.current));
    };
    Yt("/api/train_day", { d: w }).then((te) => {
      if (!te?.ok || te.d && te.d !== w) {
        ue($t?.workouts?.length ? {
          status: "partial",
          workouts: $t.workouts,
          message: te?.text || "Тренировка сохранена, но день не удалось обновить."
        } : {
          status: "error",
          workouts: [],
          message: te?.text || "Не получилось загрузить тренировки."
        });
        return;
      }
      ue({
        status: "loaded",
        workouts: Array.isArray(te.workouts) ? te.workouts : []
      });
    }).catch((te) => ue($t?.workouts?.length ? {
      status: "partial",
      workouts: $t.workouts,
      message: te?.message || "Тренировка сохранена, но день не удалось обновить."
    } : {
      status: "error",
      workouts: [],
      message: te?.message || "Не получилось загрузить тренировки."
    }));
  }, [w, C, i.train, N]);
  const H = async (ht) => {
    const $t = String(ht?.date || ""), Wt = !!(ht?.ok && $t);
    Wt && (Array.isArray(ht.week) || Array.isArray(ht.today)) && o("train", {
      ...i.train || {},
      ...Array.isArray(ht.week) ? { week: ht.week } : {},
      ...Array.isArray(ht.today) ? { today: ht.today } : {}
    });
    const ue = Wt && $t !== C ? ++_.current : 0, te = ht?.workout && typeof ht.workout == "object" ? ht.workout : null;
    let zn = null;
    if (ue) {
      L.current = {
        ...L.current,
        [$t]: ue
      };
      const He = M.current[$t];
      zn = te ? FR(He, te) : { status: "loading", workouts: [] }, M.current = { ...M.current, [$t]: zn }, R(M.current);
    }
    if (await l("train").catch(() => null), ue) {
      const He = await Yt("/api/train_day", { d: $t }).catch(() => null);
      if (L.current[$t] !== ue) return;
      const Fn = He?.ok && (!He.d || He.d === $t) ? {
        status: "loaded",
        workouts: Array.isArray(He.workouts) ? He.workouts : []
      } : zn || {
        status: "error",
        workouts: [],
        message: He?.text || "Тренировка сохранена, но день не удалось обновить."
      };
      M.current = { ...M.current, [$t]: Fn }, V.current && R(M.current);
    }
  }, B = (ht) => {
    if (!ht || ht === C) return;
    const $t = M.current[ht], Wt = {
      ...M.current,
      [ht]: { ...$t, status: "retrying" }
    };
    delete L.current[ht], M.current = Wt, R(Wt), D((ue) => ue + 1);
  }, U = c.trainingSection || c.train, I = () => l(...ab.filter((ht) => c[ht]));
  if (!i.trainingSection || !i.train)
    return U ? /* @__PURE__ */ h.jsx(ei, { children: /* @__PURE__ */ h.jsx(ti, { mode: "secondary", children: /* @__PURE__ */ h.jsx("div", { className: "aiwa-paper-screen aiwa-activity-screen", children: /* @__PURE__ */ h.jsx(gt, { className: "aiwa-tma-blocks", children: /* @__PURE__ */ h.jsx(gt.Item, { header: "Нагрузка", children: /* @__PURE__ */ h.jsx(
      zt,
      {
        title: "Не удалось загрузить данные",
        description: "Нажми, чтобы попробовать ещё раз.",
        onClick: I
      }
    ) }) }) }) }) }) : /* @__PURE__ */ h.jsx(V3, { title: "Нагрузка", variant: "activity" });
  const P = i.trainingSection, it = i.train, J = P.training || {}, $ = (J.options || []).slice(0, 4), X = it.today || [], F = it.week || [], tt = F.filter((ht) => ht.count).slice(-3).reverse(), dt = F.reduce((ht, $t) => ht + ($t.count || 0), 0), O = (ht = null) => x ? (j(ht), v("workout"), !0) : !1, q = w !== C, Y = (ht) => IR({ iso: ht, week: F, explicit: A }), et = (ht) => JR({ iso: ht, week: F, explicit: A }), ot = sb({ iso: C, today: C, status: "loaded", weekCount: dt }), ct = (ht) => {
    const $t = Y(ht);
    return sb({
      iso: ht,
      today: C,
      status: ht === C ? "loaded" : $t?.status,
      count: et(ht),
      weekCount: dt
    });
  }, ft = q ? ct(w) : ot, nt = q ? `Тренировки за ${Or(w)}` : "Прошедшие тренировки", mt = q ? Y(w) : null, ut = q && (!mt || mt.status === "loading" || mt.status === "retrying"), yt = q && (mt?.status === "error" || mt?.status === "partial"), xt = q ? ["loaded", "partial", "loading", "retrying"].includes(mt?.status) ? mt.workouts : [] : X.slice().reverse(), ce = q ? ut || yt || xt.length > 0 : X.length > 0 || tt.length > 0;
  return /* @__PURE__ */ h.jsx(ei, { children: /* @__PURE__ */ h.jsx(ti, { mode: "secondary", children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-paper-screen aiwa-activity-screen", children: [
    /* @__PURE__ */ h.jsx(
      mp,
      {
        heroValue: ft.value,
        heroLabel: ft.label,
        previewDay: ct,
        onProfile: () => d(!0),
        onCalendar: () => y(!0),
        action: x ? /* @__PURE__ */ h.jsx(
          Ce,
          {
            label: /* @__PURE__ */ h.jsxs("span", { className: "aiwa-btn-icon-label", children: [
              /* @__PURE__ */ h.jsx(Zs, {}),
              " Отметить тренировку"
            ] }),
            ...se("Отметить тренировку", () => O())
          }
        ) : /* @__PURE__ */ h.jsx(
          Ce,
          {
            variant: "secondaryCanvas",
            label: "Этот день доступен только для просмотра",
            disabled: !0,
            isFill: !0
          }
        )
      }
    ),
    /* @__PURE__ */ h.jsxs(gt, { className: "aiwa-tma-blocks", children: [
      U ? /* @__PURE__ */ h.jsx(gt.Item, { children: /* @__PURE__ */ h.jsx(
        zt,
        {
          title: "Не удалось обновить данные",
          description: "Показываем последнюю сохранённую версию. Нажми, чтобы повторить.",
          onClick: I
        }
      ) }) : null,
      /* @__PURE__ */ h.jsx(
        Cr,
        {
          message: J.summary || P.text || "Выбирай нагрузку, после которой станет легче, а не хуже.",
          detail: J.why,
          onDiscuss: () => Qs({ topic: "train" })
        }
      ),
      $.length ? /* @__PURE__ */ h.jsx(gt.Item, { header: "Варианты", children: $.map((ht, $t) => /* @__PURE__ */ h.jsx(
        zt,
        {
          image: lb(ht),
          title: [ht.name || `Вариант ${$t + 1}`, ht.duration].filter(Boolean).join(" · "),
          description: [
            (ht.exercises || []).map((Wt) => [Wt.name, Wt.sets && Wt.reps ? `${Wt.sets}×${Wt.reps}` : ""].filter(Boolean).join(" ")).join(", "),
            ht.tip || ht.benefit || ht.how || ht.detail
          ].filter(Boolean).join(" — "),
          onClick: x ? () => O(ht) : void 0
        },
        ht.name || $t
      )) }) : null,
      ce ? /* @__PURE__ */ h.jsxs(gt.Item, { header: nt, children: [
        ut ? /* @__PURE__ */ h.jsx(zt, { loading: !0, title: "Загружаю…", description: "Тренировки за выбранный день" }) : null,
        yt ? /* @__PURE__ */ h.jsx(
          zt,
          {
            title: "Повторить загрузку тренировок",
            description: mt.message,
            onClick: () => B(w)
          }
        ) : null,
        xt.length ? xt.map((ht) => /* @__PURE__ */ h.jsx(
          zt,
          {
            image: lb(ht),
            title: ht.type || "Тренировка",
            description: [
              q ? "" : "сегодня",
              ht.duration,
              ht.kcal ? `${Math.round(ht.kcal)} ккал` : "",
              String(ht.rpe || "").toLowerCase()
            ].filter(Boolean).join(" · "),
            onClick: q ? void 0 : () => v("history")
          },
          ht.id
        )) : ut || yt ? null : q ? /* @__PURE__ */ h.jsx(
          zt,
          {
            title: "В этот день тренировок нет",
            description: x ? "Выбери другой день или отметь тренировку." : "Этот день доступен только для просмотра."
          }
        ) : tt.length ? tt.map((ht) => /* @__PURE__ */ h.jsx(
          zt,
          {
            title: ht.type || "Тренировка",
            description: `${ht.d} · ${ht.count} запись`,
            onClick: x ? () => v("history") : void 0
          },
          ht.d
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
        Ce,
        {
          variant: "secondaryCanvas",
          label: "Изменить предпочтения",
          isFill: !0,
          ...se("Изменить предпочтения", () => v("profile"))
        }
      ) })
    ] }),
    /* @__PURE__ */ h.jsx(xp, { isOpen: u, onClose: () => d(!1) }),
    /* @__PURE__ */ h.jsx(
      vp,
      {
        isOpen: p,
        onClose: () => y(!1),
        mode: n,
        symptomGroups: Ue("aiwaSymptomGroups")
      }
    ),
    /* @__PURE__ */ h.jsx(
      GR,
      {
        isOpen: x && g === "workout",
        onClose: () => v(""),
        onSaved: H,
        suggested: b,
        favoriteTypes: it.favorite_types || [],
        initialDate: w
      }
    ),
    /* @__PURE__ */ h.jsx(
      XR,
      {
        isOpen: x && g === "variants",
        onClose: () => v(""),
        options: $,
        onSelect: (ht) => O(ht)
      }
    ),
    /* @__PURE__ */ h.jsx(
      KR,
      {
        isOpen: !q && g === "history",
        onClose: () => v(""),
        state: it,
        onAdd: () => O()
      }
    ),
    /* @__PURE__ */ h.jsx(ZR, { isOpen: g === "profile", onClose: () => v(""), profile: it.profile, onSaved: H })
  ] }) }) });
}
function eD({ initialMessages: n = [] }) {
  const [t, i] = T.useState(() => n.map((C, x) => ({
    id: `initial-${x}`,
    role: C.role === "user" ? "user" : "assistant",
    text: C.text || "",
    suggestions: []
  }))), [l, o] = T.useState(""), [c, u] = T.useState(!1), [d, p] = T.useState(!1), y = uh.useRef(null), g = (typeof window.aiwaData == "function" ? window.aiwaData() : window.aiwaData)?.mode === "male", v = uh.useRef(null);
  T.useEffect(() => {
    t.length || i([{
      id: "hello",
      role: "assistant",
      text: g ? "Привет! Спроси меня о питании, тренировках или самочувствии. Я отвечу с учётом твоих данных." : "Привет! Спроси меня о цикле, питании, тренировках или самочувствии. Я отвечу с учётом твоих данных.",
      suggestions: ["Можно ли тренироваться?", "Что съесть сегодня?", "Как моё самочувствие?"]
    }]);
  }, []), T.useEffect(() => {
    v.current?.scrollIntoView({ block: "end" });
  }, [t, c]);
  const b = async (C = l) => {
    const x = String(C || "").trim();
    if (!x || c) return;
    o(""), i((R) => [...R, { id: `user-${Date.now()}`, role: "user", text: x, suggestions: [] }]), u(!0);
    const A = await Yt("/api/chat", { message: x }).catch(() => null);
    i((R) => [...R, {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      text: A?.answer || "Не получилось ответить, попробуй ещё раз.",
      suggestions: A?.suggestions || []
    }]), u(!1);
  }, j = async (C, x) => {
    u(!0);
    const A = new FormData();
    A.append("initData", window.aiwaInit || ""), A.append("audio", C, x?.includes("mp4") ? "voice.mp4" : "voice.webm");
    try {
      const M = await (await fetch("/api/voice", { method: "POST", body: A })).json();
      M.transcript && i((_) => [..._, { id: `voice-${Date.now()}`, role: "user", text: M.transcript, suggestions: [] }]), i((_) => [..._, {
        id: `voice-answer-${Date.now()}`,
        role: "assistant",
        text: M.answer || "Не получилось распознать голос.",
        suggestions: M.suggestions || []
      }]);
    } catch {
      Mt("Не получилось отправить голос", { type: "error" });
    } finally {
      u(!1);
    }
  }, w = async () => {
    if (d) {
      y.current?.stop();
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      Mt("Голос недоступен в этом клиенте", { type: "error" });
      return;
    }
    try {
      const C = await navigator.mediaDevices.getUserMedia({ audio: !0 }), x = [], A = new MediaRecorder(C);
      y.current = A, A.ondataavailable = (R) => {
        R.data?.size && x.push(R.data);
      }, A.onstop = () => {
        p(!1), C.getTracks().forEach((M) => M.stop());
        const R = new Blob(x, { type: A.mimeType || "audio/webm" });
        R.size > 900 && j(R, A.mimeType);
      }, A.start(), p(!0);
    } catch {
      Mt("Нет доступа к микрофону", { type: "error" });
    }
  };
  return /* @__PURE__ */ h.jsx(ei, { children: /* @__PURE__ */ h.jsx(ti, { mode: "secondary", children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-chat-screen", children: [
    /* @__PURE__ */ h.jsxs("div", { className: "aiwa-chat-header", children: [
      /* @__PURE__ */ h.jsx(yp, { size: 50, frames: pp, pauseMs: 0 }),
      /* @__PURE__ */ h.jsxs("div", { children: [
        /* @__PURE__ */ h.jsx(pt, { variant: "title3", weight: "semibold", children: "Айва" }),
        /* @__PURE__ */ h.jsx(pt, { variant: "caption1", weight: "regular", children: "учитывает твои данные" })
      ] }),
      /* @__PURE__ */ h.jsx(an, { as: "button", type: "button", mode: "opacity", className: "aiwa-sheet-close", "aria-label": "Закрыть чат", onClick: () => Qn("go", "today"), children: /* @__PURE__ */ h.jsx(m3, {}) })
    ] }),
    /* @__PURE__ */ h.jsxs("div", { className: "aiwa-chat-messages", children: [
      t.map((C) => /* @__PURE__ */ h.jsxs("div", { className: C.role === "user" ? "aiwa-chat-bubble is-user" : "aiwa-chat-bubble is-ai", children: [
        /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: C.text }),
        C.suggestions?.length ? /* @__PURE__ */ h.jsx("div", { className: "aiwa-chat-suggestions", children: C.suggestions.slice(0, 3).map((x) => /* @__PURE__ */ h.jsx(an, { as: "button", type: "button", mode: "opacity", onClick: () => b(x), children: /* @__PURE__ */ h.jsx(pt, { variant: "caption1", weight: "semibold", children: x }) }, x)) }) : null
      ] }, C.id)),
      c ? /* @__PURE__ */ h.jsx("div", { className: "aiwa-chat-bubble is-ai", children: /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "regular", children: "Айва думает…" }) }) : null,
      /* @__PURE__ */ h.jsx("span", { ref: v })
    ] }),
    /* @__PURE__ */ h.jsxs("div", { className: "aiwa-chat-composer", children: [
      /* @__PURE__ */ h.jsx(
        "input",
        {
          value: l,
          placeholder: "Спроси Айву…",
          onChange: (C) => o(C.target.value),
          onKeyDown: (C) => {
            C.key === "Enter" && b();
          }
        }
      ),
      /* @__PURE__ */ h.jsx(an, { as: "button", type: "button", mode: "opacity", className: d ? "aiwa-chat-icon is-recording" : "aiwa-chat-icon", "aria-label": "Голос", onClick: w, children: /* @__PURE__ */ h.jsx(pt, { variant: "body", weight: "semibold", children: d ? "■" : "Голос" }) }),
      /* @__PURE__ */ h.jsx(an, { as: "button", type: "button", mode: "opacity", className: "aiwa-chat-send", "aria-label": "Отправить", onClick: () => b(), children: /* @__PURE__ */ h.jsx(pt, { variant: "title3", weight: "semibold", children: "↑" }) })
    ] })
  ] }) }) });
}
const nD = [
  { id: "today", label: "Главная", icon: /* @__PURE__ */ h.jsx(T_, {}) },
  { id: "food", label: "Питание", icon: /* @__PURE__ */ h.jsx(__, {}) },
  { id: "train", label: "Нагрузка", icon: /* @__PURE__ */ h.jsx(R_, {}) }
];
function aD({ active: n }) {
  const t = nD, i = n === "stats" ? "today" : n, l = Math.max(0, t.findIndex((o) => o.id === i));
  return /* @__PURE__ */ h.jsx(ei, { children: /* @__PURE__ */ h.jsxs("div", { className: "aiwa-nav-root", "data-aiwa-nav": "true", children: [
    /* @__PURE__ */ h.jsx("div", { className: "aiwa-nav-tabbar-layer", children: /* @__PURE__ */ h.jsx(
      LM,
      {
        tabs: t.map(({ label: o, icon: c }) => ({ label: o, icon: c })),
        defaultIndex: l,
        onChange: (o) => Qn("go", t[o].id)
      }
    ) }),
    /* @__PURE__ */ h.jsx(
      an,
      {
        as: "button",
        type: "button",
        mode: "opacity",
        className: "aiwa-nav-mascot",
        "aria-label": "Открыть Айву",
        onClick: () => Qs(),
        children: /* @__PURE__ */ h.jsx(yp, { size: 67 })
      }
    )
  ] }) });
}
let Di = null, sh = null, Ni = null, Wl = "", im = !1, sm = 0, lh = null, rb = null, Zl = null, rh = null, mc = {}, pc = 0, oh = null, ob = null, cb = {}, ub = 0, ch = null, fb = null;
const Mi = () => {
  !Di || !Ni || Di.render(
    /* @__PURE__ */ h.jsx(
      oR,
      {
        ...Ni,
        panel: Wl,
        panelRevision: sm,
        profileOpen: im,
        onPanelClose: () => lm.closePanel(),
        onProfileClose: () => lm.closeProfile()
      }
    )
  );
}, lm = {
  renderHome(n, t) {
    n && (sh !== n && (Di?.unmount(), sh = n, Di = Ns.createRoot(n)), Ni = t, Wl = t.panel || Wl, Mi());
  },
  patchHome(n) {
    !Di || !Ni || (Ni = { ...Ni, ...n }, Mi());
  },
  openPanel(n) {
    Wl = n, window.HOME_PANEL = n, sm += 1, Mi();
  },
  closePanel() {
    Wl = "", window.HOME_PANEL = "", Mi();
  },
  openProfile() {
    im = !0, Mi();
  },
  closeProfile() {
    im = !1, Mi();
  },
  refreshPanel() {
    sm += 1, Mi();
  },
  unmountHome() {
    Di?.unmount(), Di = null, sh = null, Ni = null;
  },
  // Повторный вызов для уже смонтированного экрана = «перечитай данные»:
  // так host сбрасывает loadedFood/loadedTrain после правок профиля.
  renderFood(n, t = {}) {
    n && (rh !== n ? (Zl?.unmount(), rh = n, Zl = Ns.createRoot(n)) : pc += 1, mc = t, Zl.render(/* @__PURE__ */ h.jsx(nb, { ...mc, revision: pc })));
  },
  renderActivity(n, t = {}) {
    n && (ob !== n ? (oh?.unmount(), ob = n, oh = Ns.createRoot(n)) : ub += 1, cb = t, oh.render(/* @__PURE__ */ h.jsx(tD, { ...cb, revision: ub })));
  },
  renderChat(n, t = {}) {
    n && (fb !== n && (ch?.unmount(), fb = n, ch = Ns.createRoot(n)), ch.render(/* @__PURE__ */ h.jsx(eD, { initialMessages: t.messages || [] })));
  },
  refreshFood() {
    !rh || !Zl || (pc += 1, Zl.render(/* @__PURE__ */ h.jsx(nb, { ...mc, mode: Ue("aiwaMode") || mc.mode, revision: pc })));
  },
  /** Прогрев данных «Питания» и «Нагрузки» на старте — чтобы табы открывались сразу. */
  prefetch() {
    $R();
  },
  renderNav(n, t) {
    n && (rb !== n && (lh?.unmount(), rb = n, lh = Ns.createRoot(n)), lh.render(/* @__PURE__ */ h.jsx(aD, { active: t })));
  }
};
function iD() {
  window.AiwaDeslop = lm, k_(), window.dispatchEvent(new CustomEvent("aiwa:deslop-ready"));
}
iD();
export {
  l5 as R,
  jr as a,
  p5 as b,
  Dr as c,
  n5 as g,
  h as j,
  T as r,
  pt as t
};
