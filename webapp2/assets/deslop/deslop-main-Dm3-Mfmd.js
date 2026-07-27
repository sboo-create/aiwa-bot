function VS(a, e) {
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
function US(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var of = { exports: {} }, ts = {};
var $0;
function kS() {
  if ($0) return ts;
  $0 = 1;
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
  return ts.Fragment = e, ts.jsx = l, ts.jsxs = l, ts;
}
var G0;
function HS() {
  return G0 || (G0 = 1, of.exports = kS()), of.exports;
}
var m = HS(), rf = { exports: {} }, bt = {};
var Y0;
function qS() {
  if (Y0) return bt;
  Y0 = 1;
  var a = Symbol.for("react.transitional.element"), e = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), f = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), b = Symbol.iterator;
  function T(O) {
    return O === null || typeof O != "object" ? null : (O = b && O[b] || O["@@iterator"], typeof O == "function" ? O : null);
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
  function _(O, $, tt) {
    this.props = O, this.context = $, this.refs = A, this.updater = tt || S;
  }
  _.prototype.isReactComponent = {}, _.prototype.setState = function(O, $) {
    if (typeof O != "object" && typeof O != "function" && O != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, O, $, "setState");
  }, _.prototype.forceUpdate = function(O) {
    this.updater.enqueueForceUpdate(this, O, "forceUpdate");
  };
  function D() {
  }
  D.prototype = _.prototype;
  function j(O, $, tt) {
    this.props = O, this.context = $, this.refs = A, this.updater = tt || S;
  }
  var M = j.prototype = new D();
  M.constructor = j, w(M, _.prototype), M.isPureReactComponent = !0;
  var V = Array.isArray;
  function B() {
  }
  var R = { H: null, A: null, T: null, S: null }, k = Object.prototype.hasOwnProperty;
  function P(O, $, tt) {
    var st = tt.ref;
    return {
      $$typeof: a,
      type: O,
      key: $,
      ref: st !== void 0 ? st : null,
      props: tt
    };
  }
  function K(O, $) {
    return P(O.type, $, O.props);
  }
  function at(O) {
    return typeof O == "object" && O !== null && O.$$typeof === a;
  }
  function nt(O) {
    var $ = { "=": "=0", ":": "=2" };
    return "$" + O.replace(/[=:]/g, function(tt) {
      return $[tt];
    });
  }
  var I = /\/+/g;
  function Q(O, $) {
    return typeof O == "object" && O !== null && O.key != null ? nt("" + O.key) : $.toString(36);
  }
  function et(O) {
    switch (O.status) {
      case "fulfilled":
        return O.value;
      case "rejected":
        throw O.reason;
      default:
        switch (typeof O.status == "string" ? O.then(B, B) : (O.status = "pending", O.then(
          function($) {
            O.status === "pending" && (O.status = "fulfilled", O.value = $);
          },
          function($) {
            O.status === "pending" && (O.status = "rejected", O.reason = $);
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
  function N(O, $, tt, st, rt) {
    var ht = typeof O;
    (ht === "undefined" || ht === "boolean") && (O = null);
    var vt = !1;
    if (O === null) vt = !0;
    else
      switch (ht) {
        case "bigint":
        case "string":
        case "number":
          vt = !0;
          break;
        case "object":
          switch (O.$$typeof) {
            case a:
            case e:
              vt = !0;
              break;
            case g:
              return vt = O._init, N(
                vt(O._payload),
                $,
                tt,
                st,
                rt
              );
          }
      }
    if (vt)
      return rt = rt(O), vt = st === "" ? "." + Q(O, 0) : st, V(rt) ? (tt = "", vt != null && (tt = vt.replace(I, "$&/") + "/"), N(rt, $, tt, "", function(Pt) {
        return Pt;
      })) : rt != null && (at(rt) && (rt = K(
        rt,
        tt + (rt.key == null || O && O.key === rt.key ? "" : ("" + rt.key).replace(
          I,
          "$&/"
        ) + "/") + vt
      )), $.push(rt)), 1;
    vt = 0;
    var Dt = st === "" ? "." : st + ":";
    if (V(O))
      for (var Mt = 0; Mt < O.length; Mt++)
        st = O[Mt], ht = Dt + Q(st, Mt), vt += N(
          st,
          $,
          tt,
          ht,
          rt
        );
    else if (Mt = T(O), typeof Mt == "function")
      for (O = Mt.call(O), Mt = 0; !(st = O.next()).done; )
        st = st.value, ht = Dt + Q(st, Mt++), vt += N(
          st,
          $,
          tt,
          ht,
          rt
        );
    else if (ht === "object") {
      if (typeof O.then == "function")
        return N(
          et(O),
          $,
          tt,
          st,
          rt
        );
      throw $ = String(O), Error(
        "Objects are not valid as a React child (found: " + ($ === "[object Object]" ? "object with keys {" + Object.keys(O).join(", ") + "}" : $) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return vt;
  }
  function Y(O, $, tt) {
    if (O == null) return O;
    var st = [], rt = 0;
    return N(O, st, "", "", function(ht) {
      return $.call(tt, ht, rt++);
    }), st;
  }
  function J(O) {
    if (O._status === -1) {
      var $ = O._result;
      $ = $(), $.then(
        function(tt) {
          (O._status === 0 || O._status === -1) && (O._status = 1, O._result = tt);
        },
        function(tt) {
          (O._status === 0 || O._status === -1) && (O._status = 2, O._result = tt);
        }
      ), O._status === -1 && (O._status = 0, O._result = $);
    }
    if (O._status === 1) return O._result.default;
    throw O._result;
  }
  var it = typeof reportError == "function" ? reportError : function(O) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var $ = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof O == "object" && O !== null && typeof O.message == "string" ? String(O.message) : String(O),
        error: O
      });
      if (!window.dispatchEvent($)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", O);
      return;
    }
    console.error(O);
  }, ot = {
    map: Y,
    forEach: function(O, $, tt) {
      Y(
        O,
        function() {
          $.apply(this, arguments);
        },
        tt
      );
    },
    count: function(O) {
      var $ = 0;
      return Y(O, function() {
        $++;
      }), $;
    },
    toArray: function(O) {
      return Y(O, function($) {
        return $;
      }) || [];
    },
    only: function(O) {
      if (!at(O))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return O;
    }
  };
  return bt.Activity = v, bt.Children = ot, bt.Component = _, bt.Fragment = l, bt.Profiler = r, bt.PureComponent = j, bt.StrictMode = s, bt.Suspense = y, bt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = R, bt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(O) {
      return R.H.useMemoCache(O);
    }
  }, bt.cache = function(O) {
    return function() {
      return O.apply(null, arguments);
    };
  }, bt.cacheSignal = function() {
    return null;
  }, bt.cloneElement = function(O, $, tt) {
    if (O == null)
      throw Error(
        "The argument must be a React element, but you passed " + O + "."
      );
    var st = w({}, O.props), rt = O.key;
    if ($ != null)
      for (ht in $.key !== void 0 && (rt = "" + $.key), $)
        !k.call($, ht) || ht === "key" || ht === "__self" || ht === "__source" || ht === "ref" && $.ref === void 0 || (st[ht] = $[ht]);
    var ht = arguments.length - 2;
    if (ht === 1) st.children = tt;
    else if (1 < ht) {
      for (var vt = Array(ht), Dt = 0; Dt < ht; Dt++)
        vt[Dt] = arguments[Dt + 2];
      st.children = vt;
    }
    return P(O.type, rt, st);
  }, bt.createContext = function(O) {
    return O = {
      $$typeof: f,
      _currentValue: O,
      _currentValue2: O,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, O.Provider = O, O.Consumer = {
      $$typeof: c,
      _context: O
    }, O;
  }, bt.createElement = function(O, $, tt) {
    var st, rt = {}, ht = null;
    if ($ != null)
      for (st in $.key !== void 0 && (ht = "" + $.key), $)
        k.call($, st) && st !== "key" && st !== "__self" && st !== "__source" && (rt[st] = $[st]);
    var vt = arguments.length - 2;
    if (vt === 1) rt.children = tt;
    else if (1 < vt) {
      for (var Dt = Array(vt), Mt = 0; Mt < vt; Mt++)
        Dt[Mt] = arguments[Mt + 2];
      rt.children = Dt;
    }
    if (O && O.defaultProps)
      for (st in vt = O.defaultProps, vt)
        rt[st] === void 0 && (rt[st] = vt[st]);
    return P(O, ht, rt);
  }, bt.createRef = function() {
    return { current: null };
  }, bt.forwardRef = function(O) {
    return { $$typeof: h, render: O };
  }, bt.isValidElement = at, bt.lazy = function(O) {
    return {
      $$typeof: g,
      _payload: { _status: -1, _result: O },
      _init: J
    };
  }, bt.memo = function(O, $) {
    return {
      $$typeof: p,
      type: O,
      compare: $ === void 0 ? null : $
    };
  }, bt.startTransition = function(O) {
    var $ = R.T, tt = {};
    R.T = tt;
    try {
      var st = O(), rt = R.S;
      rt !== null && rt(tt, st), typeof st == "object" && st !== null && typeof st.then == "function" && st.then(B, it);
    } catch (ht) {
      it(ht);
    } finally {
      $ !== null && tt.types !== null && ($.types = tt.types), R.T = $;
    }
  }, bt.unstable_useCacheRefresh = function() {
    return R.H.useCacheRefresh();
  }, bt.use = function(O) {
    return R.H.use(O);
  }, bt.useActionState = function(O, $, tt) {
    return R.H.useActionState(O, $, tt);
  }, bt.useCallback = function(O, $) {
    return R.H.useCallback(O, $);
  }, bt.useContext = function(O) {
    return R.H.useContext(O);
  }, bt.useDebugValue = function() {
  }, bt.useDeferredValue = function(O, $) {
    return R.H.useDeferredValue(O, $);
  }, bt.useEffect = function(O, $) {
    return R.H.useEffect(O, $);
  }, bt.useEffectEvent = function(O) {
    return R.H.useEffectEvent(O);
  }, bt.useId = function() {
    return R.H.useId();
  }, bt.useImperativeHandle = function(O, $, tt) {
    return R.H.useImperativeHandle(O, $, tt);
  }, bt.useInsertionEffect = function(O, $) {
    return R.H.useInsertionEffect(O, $);
  }, bt.useLayoutEffect = function(O, $) {
    return R.H.useLayoutEffect(O, $);
  }, bt.useMemo = function(O, $) {
    return R.H.useMemo(O, $);
  }, bt.useOptimistic = function(O, $) {
    return R.H.useOptimistic(O, $);
  }, bt.useReducer = function(O, $, tt) {
    return R.H.useReducer(O, $, tt);
  }, bt.useRef = function(O) {
    return R.H.useRef(O);
  }, bt.useState = function(O) {
    return R.H.useState(O);
  }, bt.useSyncExternalStore = function(O, $, tt) {
    return R.H.useSyncExternalStore(
      O,
      $,
      tt
    );
  }, bt.useTransition = function() {
    return R.H.useTransition();
  }, bt.version = "19.2.7", bt;
}
var X0;
function ws() {
  return X0 || (X0 = 1, rf.exports = qS()), rf.exports;
}
var E = ws();
const Wf = /* @__PURE__ */ US(E), $S = /* @__PURE__ */ VS({
  __proto__: null,
  default: Wf
}, [E]);
var uf = { exports: {} }, es = {}, cf = { exports: {} }, ff = {};
var P0;
function GS() {
  return P0 || (P0 = 1, (function(a) {
    function e(N, Y) {
      var J = N.length;
      N.push(Y);
      t: for (; 0 < J; ) {
        var it = J - 1 >>> 1, ot = N[it];
        if (0 < r(ot, Y))
          N[it] = Y, N[J] = ot, J = it;
        else break t;
      }
    }
    function l(N) {
      return N.length === 0 ? null : N[0];
    }
    function s(N) {
      if (N.length === 0) return null;
      var Y = N[0], J = N.pop();
      if (J !== Y) {
        N[0] = J;
        t: for (var it = 0, ot = N.length, O = ot >>> 1; it < O; ) {
          var $ = 2 * (it + 1) - 1, tt = N[$], st = $ + 1, rt = N[st];
          if (0 > r(tt, J))
            st < ot && 0 > r(rt, tt) ? (N[it] = rt, N[st] = J, it = st) : (N[it] = tt, N[$] = J, it = $);
          else if (st < ot && 0 > r(rt, J))
            N[it] = rt, N[st] = J, it = st;
          else break t;
        }
      }
      return Y;
    }
    function r(N, Y) {
      var J = N.sortIndex - Y.sortIndex;
      return J !== 0 ? J : N.id - Y.id;
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
    var y = [], p = [], g = 1, v = null, b = 3, T = !1, S = !1, w = !1, A = !1, _ = typeof setTimeout == "function" ? setTimeout : null, D = typeof clearTimeout == "function" ? clearTimeout : null, j = typeof setImmediate < "u" ? setImmediate : null;
    function M(N) {
      for (var Y = l(p); Y !== null; ) {
        if (Y.callback === null) s(p);
        else if (Y.startTime <= N)
          s(p), Y.sortIndex = Y.expirationTime, e(y, Y);
        else break;
        Y = l(p);
      }
    }
    function V(N) {
      if (w = !1, M(N), !S)
        if (l(y) !== null)
          S = !0, B || (B = !0, nt());
        else {
          var Y = l(p);
          Y !== null && et(V, Y.startTime - N);
        }
    }
    var B = !1, R = -1, k = 5, P = -1;
    function K() {
      return A ? !0 : !(a.unstable_now() - P < k);
    }
    function at() {
      if (A = !1, B) {
        var N = a.unstable_now();
        P = N;
        var Y = !0;
        try {
          t: {
            S = !1, w && (w = !1, D(R), R = -1), T = !0;
            var J = b;
            try {
              e: {
                for (M(N), v = l(y); v !== null && !(v.expirationTime > N && K()); ) {
                  var it = v.callback;
                  if (typeof it == "function") {
                    v.callback = null, b = v.priorityLevel;
                    var ot = it(
                      v.expirationTime <= N
                    );
                    if (N = a.unstable_now(), typeof ot == "function") {
                      v.callback = ot, M(N), Y = !0;
                      break e;
                    }
                    v === l(y) && s(y), M(N);
                  } else s(y);
                  v = l(y);
                }
                if (v !== null) Y = !0;
                else {
                  var O = l(p);
                  O !== null && et(
                    V,
                    O.startTime - N
                  ), Y = !1;
                }
              }
              break t;
            } finally {
              v = null, b = J, T = !1;
            }
            Y = void 0;
          }
        } finally {
          Y ? nt() : B = !1;
        }
      }
    }
    var nt;
    if (typeof j == "function")
      nt = function() {
        j(at);
      };
    else if (typeof MessageChannel < "u") {
      var I = new MessageChannel(), Q = I.port2;
      I.port1.onmessage = at, nt = function() {
        Q.postMessage(null);
      };
    } else
      nt = function() {
        _(at, 0);
      };
    function et(N, Y) {
      R = _(function() {
        N(a.unstable_now());
      }, Y);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(N) {
      N.callback = null;
    }, a.unstable_forceFrameRate = function(N) {
      0 > N || 125 < N ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : k = 0 < N ? Math.floor(1e3 / N) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return b;
    }, a.unstable_next = function(N) {
      switch (b) {
        case 1:
        case 2:
        case 3:
          var Y = 3;
          break;
        default:
          Y = b;
      }
      var J = b;
      b = Y;
      try {
        return N();
      } finally {
        b = J;
      }
    }, a.unstable_requestPaint = function() {
      A = !0;
    }, a.unstable_runWithPriority = function(N, Y) {
      switch (N) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          N = 3;
      }
      var J = b;
      b = N;
      try {
        return Y();
      } finally {
        b = J;
      }
    }, a.unstable_scheduleCallback = function(N, Y, J) {
      var it = a.unstable_now();
      switch (typeof J == "object" && J !== null ? (J = J.delay, J = typeof J == "number" && 0 < J ? it + J : it) : J = it, N) {
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
      return ot = J + ot, N = {
        id: g++,
        callback: Y,
        priorityLevel: N,
        startTime: J,
        expirationTime: ot,
        sortIndex: -1
      }, J > it ? (N.sortIndex = J, e(p, N), l(y) === null && N === l(p) && (w ? (D(R), R = -1) : w = !0, et(V, J - it))) : (N.sortIndex = ot, e(y, N), S || T || (S = !0, B || (B = !0, nt()))), N;
    }, a.unstable_shouldYield = K, a.unstable_wrapCallback = function(N) {
      var Y = b;
      return function() {
        var J = b;
        b = Y;
        try {
          return N.apply(this, arguments);
        } finally {
          b = J;
        }
      };
    };
  })(ff)), ff;
}
var K0;
function YS() {
  return K0 || (K0 = 1, cf.exports = GS()), cf.exports;
}
var df = { exports: {} }, Ae = {};
var Z0;
function XS() {
  if (Z0) return Ae;
  Z0 = 1;
  var a = ws();
  function e(y) {
    var p = "https://react.dev/errors/" + y;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var g = 2; g < arguments.length; g++)
        p += "&args[]=" + encodeURIComponent(arguments[g]);
    }
    return "Minified React error #" + y + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  function c(y, p, g) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: r,
      key: v == null ? null : "" + v,
      children: y,
      containerInfo: p,
      implementation: g
    };
  }
  var f = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function h(y, p) {
    if (y === "font") return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return Ae.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, Ae.createPortal = function(y, p) {
    var g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(e(299));
    return c(y, p, null, g);
  }, Ae.flushSync = function(y) {
    var p = f.T, g = s.p;
    try {
      if (f.T = null, s.p = 2, y) return y();
    } finally {
      f.T = p, s.p = g, s.d.f();
    }
  }, Ae.preconnect = function(y, p) {
    typeof y == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, s.d.C(y, p));
  }, Ae.prefetchDNS = function(y) {
    typeof y == "string" && s.d.D(y);
  }, Ae.preinit = function(y, p) {
    if (typeof y == "string" && p && typeof p.as == "string") {
      var g = p.as, v = h(g, p.crossOrigin), b = typeof p.integrity == "string" ? p.integrity : void 0, T = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      g === "style" ? s.d.S(
        y,
        typeof p.precedence == "string" ? p.precedence : void 0,
        {
          crossOrigin: v,
          integrity: b,
          fetchPriority: T
        }
      ) : g === "script" && s.d.X(y, {
        crossOrigin: v,
        integrity: b,
        fetchPriority: T,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0
      });
    }
  }, Ae.preinitModule = function(y, p) {
    if (typeof y == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var g = h(
            p.as,
            p.crossOrigin
          );
          s.d.M(y, {
            crossOrigin: g,
            integrity: typeof p.integrity == "string" ? p.integrity : void 0,
            nonce: typeof p.nonce == "string" ? p.nonce : void 0
          });
        }
      } else p == null && s.d.M(y);
  }, Ae.preload = function(y, p) {
    if (typeof y == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var g = p.as, v = h(g, p.crossOrigin);
      s.d.L(y, g, {
        crossOrigin: v,
        integrity: typeof p.integrity == "string" ? p.integrity : void 0,
        nonce: typeof p.nonce == "string" ? p.nonce : void 0,
        type: typeof p.type == "string" ? p.type : void 0,
        fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0,
        referrerPolicy: typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0,
        imageSrcSet: typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0,
        imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0,
        media: typeof p.media == "string" ? p.media : void 0
      });
    }
  }, Ae.preloadModule = function(y, p) {
    if (typeof y == "string")
      if (p) {
        var g = h(p.as, p.crossOrigin);
        s.d.m(y, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: g,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else s.d.m(y);
  }, Ae.requestFormReset = function(y) {
    s.d.r(y);
  }, Ae.unstable_batchedUpdates = function(y, p) {
    return y(p);
  }, Ae.useFormState = function(y, p, g) {
    return f.H.useFormState(y, p, g);
  }, Ae.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, Ae.version = "19.2.7", Ae;
}
var Q0;
function cv() {
  if (Q0) return df.exports;
  Q0 = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (e) {
        console.error(e);
      }
  }
  return a(), df.exports = XS(), df.exports;
}
var F0;
function PS() {
  if (F0) return es;
  F0 = 1;
  var a = YS(), e = ws(), l = cv();
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
  function p(t) {
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
  var v = Object.assign, b = Symbol.for("react.element"), T = Symbol.for("react.transitional.element"), S = Symbol.for("react.portal"), w = Symbol.for("react.fragment"), A = Symbol.for("react.strict_mode"), _ = Symbol.for("react.profiler"), D = Symbol.for("react.consumer"), j = Symbol.for("react.context"), M = Symbol.for("react.forward_ref"), V = Symbol.for("react.suspense"), B = Symbol.for("react.suspense_list"), R = Symbol.for("react.memo"), k = Symbol.for("react.lazy"), P = Symbol.for("react.activity"), K = Symbol.for("react.memo_cache_sentinel"), at = Symbol.iterator;
  function nt(t) {
    return t === null || typeof t != "object" ? null : (t = at && t[at] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var I = Symbol.for("react.client.reference");
  function Q(t) {
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
      case V:
        return "Suspense";
      case B:
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
        case D:
          return (t._context.displayName || "Context") + ".Consumer";
        case M:
          var n = t.render;
          return t = t.displayName, t || (t = n.displayName || n.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case R:
          return n = t.displayName || null, n !== null ? n : Q(t.type) || "Memo";
        case k:
          n = t._payload, t = t._init;
          try {
            return Q(t(n));
          } catch {
          }
      }
    return null;
  }
  var et = Array.isArray, N = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Y = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, J = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, it = [], ot = -1;
  function O(t) {
    return { current: t };
  }
  function $(t) {
    0 > ot || (t.current = it[ot], it[ot] = null, ot--);
  }
  function tt(t, n) {
    ot++, it[ot] = t.current, t.current = n;
  }
  var st = O(null), rt = O(null), ht = O(null), vt = O(null);
  function Dt(t, n) {
    switch (tt(ht, n), tt(rt, t), tt(st, null), n.nodeType) {
      case 9:
      case 11:
        t = (t = n.documentElement) && (t = t.namespaceURI) ? f0(t) : 0;
        break;
      default:
        if (t = n.tagName, n = n.namespaceURI)
          n = f0(n), t = d0(n, t);
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
    $(st), tt(st, t);
  }
  function Mt() {
    $(st), $(rt), $(ht);
  }
  function Pt(t) {
    t.memoizedState !== null && tt(vt, t);
    var n = st.current, i = d0(n, t.type);
    n !== i && (tt(rt, t), tt(st, i));
  }
  function Kt(t) {
    rt.current === t && ($(st), $(rt)), vt.current === t && ($(vt), Fl._currentValue = J);
  }
  var Ee, Ea;
  function rn(t) {
    if (Ee === void 0)
      try {
        throw Error();
      } catch (i) {
        var n = i.stack.trim().match(/\n( *(at )?)/);
        Ee = n && n[1] || "", Ea = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Ee + t + Ea;
  }
  var Aa = !1;
  function dt(t, n) {
    if (!t || Aa) return "";
    Aa = !0;
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
      Aa = !1, Error.prepareStackTrace = i;
    }
    return (i = t ? t.displayName || t.name : "") ? rn(i) : "";
  }
  function te(t, n) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return rn(t.type);
      case 16:
        return rn("Lazy");
      case 13:
        return t.child !== n && n !== null ? rn("Suspense Fallback") : rn("Suspense");
      case 19:
        return rn("SuspenseList");
      case 0:
      case 15:
        return dt(t.type, !1);
      case 11:
        return dt(t.type.render, !1);
      case 1:
        return dt(t.type, !0);
      case 31:
        return rn("Activity");
      default:
        return "";
    }
  }
  function ja(t) {
    try {
      var n = "", i = null;
      do
        n += te(t, i), i = t, t = t.return;
      while (t);
      return n;
    } catch (o) {
      return `
Error generating stack: ` + o.message + `
` + o.stack;
    }
  }
  var Xr = Object.prototype.hasOwnProperty, Pr = a.unstable_scheduleCallback, Kr = a.unstable_cancelCallback, px = a.unstable_shouldYield, yx = a.unstable_requestPaint, Ve = a.unstable_now, gx = a.unstable_getCurrentPriorityLevel, Gh = a.unstable_ImmediatePriority, Yh = a.unstable_UserBlockingPriority, js = a.unstable_NormalPriority, vx = a.unstable_LowPriority, Xh = a.unstable_IdlePriority, bx = a.log, xx = a.unstable_setDisableYieldValue, rl = null, Ue = null;
  function Zn(t) {
    if (typeof bx == "function" && xx(t), Ue && typeof Ue.setStrictMode == "function")
      try {
        Ue.setStrictMode(rl, t);
      } catch {
      }
  }
  var ke = Math.clz32 ? Math.clz32 : Tx, Sx = Math.log, wx = Math.LN2;
  function Tx(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Sx(t) / wx | 0) | 0;
  }
  var Ms = 256, _s = 262144, Rs = 4194304;
  function Ma(t) {
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
  function Ds(t, n, i) {
    var o = t.pendingLanes;
    if (o === 0) return 0;
    var u = 0, d = t.suspendedLanes, x = t.pingedLanes;
    t = t.warmLanes;
    var C = o & 134217727;
    return C !== 0 ? (o = C & ~d, o !== 0 ? u = Ma(o) : (x &= C, x !== 0 ? u = Ma(x) : i || (i = C & ~t, i !== 0 && (u = Ma(i))))) : (C = o & ~d, C !== 0 ? u = Ma(C) : x !== 0 ? u = Ma(x) : i || (i = o & ~t, i !== 0 && (u = Ma(i)))), u === 0 ? 0 : n !== 0 && n !== u && (n & d) === 0 && (d = u & -u, i = n & -n, d >= i || d === 32 && (i & 4194048) !== 0) ? n : u;
  }
  function ul(t, n) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & n) === 0;
  }
  function Cx(t, n) {
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
  function Ph() {
    var t = Rs;
    return Rs <<= 1, (Rs & 62914560) === 0 && (Rs = 4194304), t;
  }
  function Zr(t) {
    for (var n = [], i = 0; 31 > i; i++) n.push(t);
    return n;
  }
  function cl(t, n) {
    t.pendingLanes |= n, n !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Ex(t, n, i, o, u, d) {
    var x = t.pendingLanes;
    t.pendingLanes = i, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= i, t.entangledLanes &= i, t.errorRecoveryDisabledLanes &= i, t.shellSuspendCounter = 0;
    var C = t.entanglements, z = t.expirationTimes, q = t.hiddenUpdates;
    for (i = x & ~i; 0 < i; ) {
      var Z = 31 - ke(i), W = 1 << Z;
      C[Z] = 0, z[Z] = -1;
      var G = q[Z];
      if (G !== null)
        for (q[Z] = null, Z = 0; Z < G.length; Z++) {
          var X = G[Z];
          X !== null && (X.lane &= -536870913);
        }
      i &= ~W;
    }
    o !== 0 && Kh(t, o, 0), d !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= d & ~(x & ~n));
  }
  function Kh(t, n, i) {
    t.pendingLanes |= n, t.suspendedLanes &= ~n;
    var o = 31 - ke(n);
    t.entangledLanes |= n, t.entanglements[o] = t.entanglements[o] | 1073741824 | i & 261930;
  }
  function Zh(t, n) {
    var i = t.entangledLanes |= n;
    for (t = t.entanglements; i; ) {
      var o = 31 - ke(i), u = 1 << o;
      u & n | t[o] & n && (t[o] |= n), i &= ~u;
    }
  }
  function Qh(t, n) {
    var i = n & -n;
    return i = (i & 42) !== 0 ? 1 : Qr(i), (i & (t.suspendedLanes | n)) !== 0 ? 0 : i;
  }
  function Qr(t) {
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
  function Fr(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Fh() {
    var t = Y.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : L0(t.type));
  }
  function Jh(t, n) {
    var i = Y.p;
    try {
      return Y.p = t, n();
    } finally {
      Y.p = i;
    }
  }
  var Qn = Math.random().toString(36).slice(2), ge = "__reactFiber$" + Qn, Re = "__reactProps$" + Qn, ii = "__reactContainer$" + Qn, Jr = "__reactEvents$" + Qn, Ax = "__reactListeners$" + Qn, jx = "__reactHandles$" + Qn, Wh = "__reactResources$" + Qn, fl = "__reactMarker$" + Qn;
  function Wr(t) {
    delete t[ge], delete t[Re], delete t[Jr], delete t[Ax], delete t[jx];
  }
  function li(t) {
    var n = t[ge];
    if (n) return n;
    for (var i = t.parentNode; i; ) {
      if (n = i[ii] || i[ge]) {
        if (i = n.alternate, n.child !== null || i !== null && i.child !== null)
          for (t = b0(t); t !== null; ) {
            if (i = t[ge]) return i;
            t = b0(t);
          }
        return n;
      }
      t = i, i = t.parentNode;
    }
    return null;
  }
  function si(t) {
    if (t = t[ge] || t[ii]) {
      var n = t.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return t;
    }
    return null;
  }
  function dl(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t.stateNode;
    throw Error(s(33));
  }
  function oi(t) {
    var n = t[Wh];
    return n || (n = t[Wh] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function pe(t) {
    t[fl] = !0;
  }
  var Ih = /* @__PURE__ */ new Set(), tm = {};
  function _a(t, n) {
    ri(t, n), ri(t + "Capture", n);
  }
  function ri(t, n) {
    for (tm[t] = n, t = 0; t < n.length; t++)
      Ih.add(n[t]);
  }
  var Mx = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), em = {}, nm = {};
  function _x(t) {
    return Xr.call(nm, t) ? !0 : Xr.call(em, t) ? !1 : Mx.test(t) ? nm[t] = !0 : (em[t] = !0, !1);
  }
  function Ns(t, n, i) {
    if (_x(n))
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
  function Os(t, n, i) {
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
  function Mn(t, n, i, o) {
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
  function Qe(t) {
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
  function am(t) {
    var n = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function Rx(t, n, i) {
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
  function Ir(t) {
    if (!t._valueTracker) {
      var n = am(t) ? "checked" : "value";
      t._valueTracker = Rx(
        t,
        n,
        "" + t[n]
      );
    }
  }
  function im(t) {
    if (!t) return !1;
    var n = t._valueTracker;
    if (!n) return !0;
    var i = n.getValue(), o = "";
    return t && (o = am(t) ? t.checked ? "true" : "false" : t.value), t = o, t !== i ? (n.setValue(t), !0) : !1;
  }
  function zs(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Dx = /[\n"\\]/g;
  function Fe(t) {
    return t.replace(
      Dx,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function tu(t, n, i, o, u, d, x, C) {
    t.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? t.type = x : t.removeAttribute("type"), n != null ? x === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + Qe(n)) : t.value !== "" + Qe(n) && (t.value = "" + Qe(n)) : x !== "submit" && x !== "reset" || t.removeAttribute("value"), n != null ? eu(t, x, Qe(n)) : i != null ? eu(t, x, Qe(i)) : o != null && t.removeAttribute("value"), u == null && d != null && (t.defaultChecked = !!d), u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"), C != null && typeof C != "function" && typeof C != "symbol" && typeof C != "boolean" ? t.name = "" + Qe(C) : t.removeAttribute("name");
  }
  function lm(t, n, i, o, u, d, x, C) {
    if (d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (t.type = d), n != null || i != null) {
      if (!(d !== "submit" && d !== "reset" || n != null)) {
        Ir(t);
        return;
      }
      i = i != null ? "" + Qe(i) : "", n = n != null ? "" + Qe(n) : i, C || n === t.value || (t.value = n), t.defaultValue = n;
    }
    o = o ?? u, o = typeof o != "function" && typeof o != "symbol" && !!o, t.checked = C ? t.checked : !!o, t.defaultChecked = !!o, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (t.name = x), Ir(t);
  }
  function eu(t, n, i) {
    n === "number" && zs(t.ownerDocument) === t || t.defaultValue === "" + i || (t.defaultValue = "" + i);
  }
  function ui(t, n, i, o) {
    if (t = t.options, n) {
      n = {};
      for (var u = 0; u < i.length; u++)
        n["$" + i[u]] = !0;
      for (i = 0; i < t.length; i++)
        u = n.hasOwnProperty("$" + t[i].value), t[i].selected !== u && (t[i].selected = u), u && o && (t[i].defaultSelected = !0);
    } else {
      for (i = "" + Qe(i), n = null, u = 0; u < t.length; u++) {
        if (t[u].value === i) {
          t[u].selected = !0, o && (t[u].defaultSelected = !0);
          return;
        }
        n !== null || t[u].disabled || (n = t[u]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function sm(t, n, i) {
    if (n != null && (n = "" + Qe(n), n !== t.value && (t.value = n), i == null)) {
      t.defaultValue !== n && (t.defaultValue = n);
      return;
    }
    t.defaultValue = i != null ? "" + Qe(i) : "";
  }
  function om(t, n, i, o) {
    if (n == null) {
      if (o != null) {
        if (i != null) throw Error(s(92));
        if (et(o)) {
          if (1 < o.length) throw Error(s(93));
          o = o[0];
        }
        i = o;
      }
      i == null && (i = ""), n = i;
    }
    i = Qe(n), t.defaultValue = i, o = t.textContent, o === i && o !== "" && o !== null && (t.value = o), Ir(t);
  }
  function ci(t, n) {
    if (n) {
      var i = t.firstChild;
      if (i && i === t.lastChild && i.nodeType === 3) {
        i.nodeValue = n;
        return;
      }
    }
    t.textContent = n;
  }
  var Nx = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function rm(t, n, i) {
    var o = n.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? o ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "" : o ? t.setProperty(n, i) : typeof i != "number" || i === 0 || Nx.has(n) ? n === "float" ? t.cssFloat = i : t[n] = ("" + i).trim() : t[n] = i + "px";
  }
  function um(t, n, i) {
    if (n != null && typeof n != "object")
      throw Error(s(62));
    if (t = t.style, i != null) {
      for (var o in i)
        !i.hasOwnProperty(o) || n != null && n.hasOwnProperty(o) || (o.indexOf("--") === 0 ? t.setProperty(o, "") : o === "float" ? t.cssFloat = "" : t[o] = "");
      for (var u in n)
        o = n[u], n.hasOwnProperty(u) && i[u] !== o && rm(t, u, o);
    } else
      for (var d in n)
        n.hasOwnProperty(d) && rm(t, d, n[d]);
  }
  function nu(t) {
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
  var Ox = /* @__PURE__ */ new Map([
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
  ]), zx = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ls(t) {
    return zx.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function _n() {
  }
  var au = null;
  function iu(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var fi = null, di = null;
  function cm(t) {
    var n = si(t);
    if (n && (t = n.stateNode)) {
      var i = t[Re] || null;
      t: switch (t = n.stateNode, n.type) {
        case "input":
          if (tu(
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
              'input[name="' + Fe(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < i.length; n++) {
              var o = i[n];
              if (o !== t && o.form === t.form) {
                var u = o[Re] || null;
                if (!u) throw Error(s(90));
                tu(
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
              o = i[n], o.form === t.form && im(o);
          }
          break t;
        case "textarea":
          sm(t, i.value, i.defaultValue);
          break t;
        case "select":
          n = i.value, n != null && ui(t, !!i.multiple, n, !1);
      }
    }
  }
  var lu = !1;
  function fm(t, n, i) {
    if (lu) return t(n, i);
    lu = !0;
    try {
      var o = t(n);
      return o;
    } finally {
      if (lu = !1, (fi !== null || di !== null) && (To(), fi && (n = fi, t = di, di = fi = null, cm(n), t)))
        for (n = 0; n < t.length; n++) cm(t[n]);
    }
  }
  function hl(t, n) {
    var i = t.stateNode;
    if (i === null) return null;
    var o = i[Re] || null;
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
  var Rn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), su = !1;
  if (Rn)
    try {
      var ml = {};
      Object.defineProperty(ml, "passive", {
        get: function() {
          su = !0;
        }
      }), window.addEventListener("test", ml, ml), window.removeEventListener("test", ml, ml);
    } catch {
      su = !1;
    }
  var Fn = null, ou = null, Bs = null;
  function dm() {
    if (Bs) return Bs;
    var t, n = ou, i = n.length, o, u = "value" in Fn ? Fn.value : Fn.textContent, d = u.length;
    for (t = 0; t < i && n[t] === u[t]; t++) ;
    var x = i - t;
    for (o = 1; o <= x && n[i - o] === u[d - o]; o++) ;
    return Bs = u.slice(t, 1 < o ? 1 - o : void 0);
  }
  function Vs(t) {
    var n = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Us() {
    return !0;
  }
  function hm() {
    return !1;
  }
  function De(t) {
    function n(i, o, u, d, x) {
      this._reactName = i, this._targetInst = u, this.type = o, this.nativeEvent = d, this.target = x, this.currentTarget = null;
      for (var C in t)
        t.hasOwnProperty(C) && (i = t[C], this[C] = i ? i(d) : d[C]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? Us : hm, this.isPropagationStopped = hm, this;
    }
    return v(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = Us);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = Us);
      },
      persist: function() {
      },
      isPersistent: Us
    }), n;
  }
  var Ra = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, ks = De(Ra), pl = v({}, Ra, { view: 0, detail: 0 }), Lx = De(pl), ru, uu, yl, Hs = v({}, pl, {
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
    getModifierState: fu,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== yl && (yl && t.type === "mousemove" ? (ru = t.screenX - yl.screenX, uu = t.screenY - yl.screenY) : uu = ru = 0, yl = t), ru);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : uu;
    }
  }), mm = De(Hs), Bx = v({}, Hs, { dataTransfer: 0 }), Vx = De(Bx), Ux = v({}, pl, { relatedTarget: 0 }), cu = De(Ux), kx = v({}, Ra, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Hx = De(kx), qx = v({}, Ra, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), $x = De(qx), Gx = v({}, Ra, { data: 0 }), pm = De(Gx), Yx = {
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
  }, Xx = {
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
  }, Px = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Kx(t) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(t) : (t = Px[t]) ? !!n[t] : !1;
  }
  function fu() {
    return Kx;
  }
  var Zx = v({}, pl, {
    key: function(t) {
      if (t.key) {
        var n = Yx[t.key] || t.key;
        if (n !== "Unidentified") return n;
      }
      return t.type === "keypress" ? (t = Vs(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Xx[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: fu,
    charCode: function(t) {
      return t.type === "keypress" ? Vs(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Vs(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Qx = De(Zx), Fx = v({}, Hs, {
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
  }), ym = De(Fx), Jx = v({}, pl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: fu
  }), Wx = De(Jx), Ix = v({}, Ra, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), t3 = De(Ix), e3 = v({}, Hs, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), n3 = De(e3), a3 = v({}, Ra, {
    newState: 0,
    oldState: 0
  }), i3 = De(a3), l3 = [9, 13, 27, 32], du = Rn && "CompositionEvent" in window, gl = null;
  Rn && "documentMode" in document && (gl = document.documentMode);
  var s3 = Rn && "TextEvent" in window && !gl, gm = Rn && (!du || gl && 8 < gl && 11 >= gl), vm = " ", bm = !1;
  function xm(t, n) {
    switch (t) {
      case "keyup":
        return l3.indexOf(n.keyCode) !== -1;
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
  function Sm(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var hi = !1;
  function o3(t, n) {
    switch (t) {
      case "compositionend":
        return Sm(n);
      case "keypress":
        return n.which !== 32 ? null : (bm = !0, vm);
      case "textInput":
        return t = n.data, t === vm && bm ? null : t;
      default:
        return null;
    }
  }
  function r3(t, n) {
    if (hi)
      return t === "compositionend" || !du && xm(t, n) ? (t = dm(), Bs = ou = Fn = null, hi = !1, t) : null;
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
        return gm && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var u3 = {
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
  function wm(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === "input" ? !!u3[t.type] : n === "textarea";
  }
  function Tm(t, n, i, o) {
    fi ? di ? di.push(o) : di = [o] : fi = o, n = Ro(n, "onChange"), 0 < n.length && (i = new ks(
      "onChange",
      "change",
      null,
      i,
      o
    ), t.push({ event: i, listeners: n }));
  }
  var vl = null, bl = null;
  function c3(t) {
    l0(t, 0);
  }
  function qs(t) {
    var n = dl(t);
    if (im(n)) return t;
  }
  function Cm(t, n) {
    if (t === "change") return n;
  }
  var Em = !1;
  if (Rn) {
    var hu;
    if (Rn) {
      var mu = "oninput" in document;
      if (!mu) {
        var Am = document.createElement("div");
        Am.setAttribute("oninput", "return;"), mu = typeof Am.oninput == "function";
      }
      hu = mu;
    } else hu = !1;
    Em = hu && (!document.documentMode || 9 < document.documentMode);
  }
  function jm() {
    vl && (vl.detachEvent("onpropertychange", Mm), bl = vl = null);
  }
  function Mm(t) {
    if (t.propertyName === "value" && qs(bl)) {
      var n = [];
      Tm(
        n,
        bl,
        t,
        iu(t)
      ), fm(c3, n);
    }
  }
  function f3(t, n, i) {
    t === "focusin" ? (jm(), vl = n, bl = i, vl.attachEvent("onpropertychange", Mm)) : t === "focusout" && jm();
  }
  function d3(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return qs(bl);
  }
  function h3(t, n) {
    if (t === "click") return qs(n);
  }
  function m3(t, n) {
    if (t === "input" || t === "change")
      return qs(n);
  }
  function p3(t, n) {
    return t === n && (t !== 0 || 1 / t === 1 / n) || t !== t && n !== n;
  }
  var He = typeof Object.is == "function" ? Object.is : p3;
  function xl(t, n) {
    if (He(t, n)) return !0;
    if (typeof t != "object" || t === null || typeof n != "object" || n === null)
      return !1;
    var i = Object.keys(t), o = Object.keys(n);
    if (i.length !== o.length) return !1;
    for (o = 0; o < i.length; o++) {
      var u = i[o];
      if (!Xr.call(n, u) || !He(t[u], n[u]))
        return !1;
    }
    return !0;
  }
  function _m(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Rm(t, n) {
    var i = _m(t);
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
      i = _m(i);
    }
  }
  function Dm(t, n) {
    return t && n ? t === n ? !0 : t && t.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Dm(t, n.parentNode) : "contains" in t ? t.contains(n) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Nm(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var n = zs(t.document); n instanceof t.HTMLIFrameElement; ) {
      try {
        var i = typeof n.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) t = n.contentWindow;
      else break;
      n = zs(t.document);
    }
    return n;
  }
  function pu(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n && (n === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || n === "textarea" || t.contentEditable === "true");
  }
  var y3 = Rn && "documentMode" in document && 11 >= document.documentMode, mi = null, yu = null, Sl = null, gu = !1;
  function Om(t, n, i) {
    var o = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    gu || mi == null || mi !== zs(o) || (o = mi, "selectionStart" in o && pu(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), Sl && xl(Sl, o) || (Sl = o, o = Ro(yu, "onSelect"), 0 < o.length && (n = new ks(
      "onSelect",
      "select",
      null,
      n,
      i
    ), t.push({ event: n, listeners: o }), n.target = mi)));
  }
  function Da(t, n) {
    var i = {};
    return i[t.toLowerCase()] = n.toLowerCase(), i["Webkit" + t] = "webkit" + n, i["Moz" + t] = "moz" + n, i;
  }
  var pi = {
    animationend: Da("Animation", "AnimationEnd"),
    animationiteration: Da("Animation", "AnimationIteration"),
    animationstart: Da("Animation", "AnimationStart"),
    transitionrun: Da("Transition", "TransitionRun"),
    transitionstart: Da("Transition", "TransitionStart"),
    transitioncancel: Da("Transition", "TransitionCancel"),
    transitionend: Da("Transition", "TransitionEnd")
  }, vu = {}, zm = {};
  Rn && (zm = document.createElement("div").style, "AnimationEvent" in window || (delete pi.animationend.animation, delete pi.animationiteration.animation, delete pi.animationstart.animation), "TransitionEvent" in window || delete pi.transitionend.transition);
  function Na(t) {
    if (vu[t]) return vu[t];
    if (!pi[t]) return t;
    var n = pi[t], i;
    for (i in n)
      if (n.hasOwnProperty(i) && i in zm)
        return vu[t] = n[i];
    return t;
  }
  var Lm = Na("animationend"), Bm = Na("animationiteration"), Vm = Na("animationstart"), g3 = Na("transitionrun"), v3 = Na("transitionstart"), b3 = Na("transitioncancel"), Um = Na("transitionend"), km = /* @__PURE__ */ new Map(), bu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  bu.push("scrollEnd");
  function un(t, n) {
    km.set(t, n), _a(n, [t]);
  }
  var $s = typeof reportError == "function" ? reportError : function(t) {
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
  }, Je = [], yi = 0, xu = 0;
  function Gs() {
    for (var t = yi, n = xu = yi = 0; n < t; ) {
      var i = Je[n];
      Je[n++] = null;
      var o = Je[n];
      Je[n++] = null;
      var u = Je[n];
      Je[n++] = null;
      var d = Je[n];
      if (Je[n++] = null, o !== null && u !== null) {
        var x = o.pending;
        x === null ? u.next = u : (u.next = x.next, x.next = u), o.pending = u;
      }
      d !== 0 && Hm(i, u, d);
    }
  }
  function Ys(t, n, i, o) {
    Je[yi++] = t, Je[yi++] = n, Je[yi++] = i, Je[yi++] = o, xu |= o, t.lanes |= o, t = t.alternate, t !== null && (t.lanes |= o);
  }
  function Su(t, n, i, o) {
    return Ys(t, n, i, o), Xs(t);
  }
  function Oa(t, n) {
    return Ys(t, null, null, n), Xs(t);
  }
  function Hm(t, n, i) {
    t.lanes |= i;
    var o = t.alternate;
    o !== null && (o.lanes |= i);
    for (var u = !1, d = t.return; d !== null; )
      d.childLanes |= i, o = d.alternate, o !== null && (o.childLanes |= i), d.tag === 22 && (t = d.stateNode, t === null || t._visibility & 1 || (u = !0)), t = d, d = d.return;
    return t.tag === 3 ? (d = t.stateNode, u && n !== null && (u = 31 - ke(i), t = d.hiddenUpdates, o = t[u], o === null ? t[u] = [n] : o.push(n), n.lane = i | 536870912), d) : null;
  }
  function Xs(t) {
    if (50 < Gl)
      throw Gl = 0, Rc = null, Error(s(185));
    for (var n = t.return; n !== null; )
      t = n, n = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var gi = {};
  function x3(t, n, i, o) {
    this.tag = t, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function qe(t, n, i, o) {
    return new x3(t, n, i, o);
  }
  function wu(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Dn(t, n) {
    var i = t.alternate;
    return i === null ? (i = qe(
      t.tag,
      n,
      t.key,
      t.mode
    ), i.elementType = t.elementType, i.type = t.type, i.stateNode = t.stateNode, i.alternate = t, t.alternate = i) : (i.pendingProps = n, i.type = t.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = t.flags & 65011712, i.childLanes = t.childLanes, i.lanes = t.lanes, i.child = t.child, i.memoizedProps = t.memoizedProps, i.memoizedState = t.memoizedState, i.updateQueue = t.updateQueue, n = t.dependencies, i.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, i.sibling = t.sibling, i.index = t.index, i.ref = t.ref, i.refCleanup = t.refCleanup, i;
  }
  function qm(t, n) {
    t.flags &= 65011714;
    var i = t.alternate;
    return i === null ? (t.childLanes = 0, t.lanes = n, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = i.childLanes, t.lanes = i.lanes, t.child = i.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = i.memoizedProps, t.memoizedState = i.memoizedState, t.updateQueue = i.updateQueue, t.type = i.type, n = i.dependencies, t.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), t;
  }
  function Ps(t, n, i, o, u, d) {
    var x = 0;
    if (o = t, typeof t == "function") wu(t) && (x = 1);
    else if (typeof t == "string")
      x = ES(
        t,
        i,
        st.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case P:
          return t = qe(31, i, n, u), t.elementType = P, t.lanes = d, t;
        case w:
          return za(i.children, u, d, n);
        case A:
          x = 8, u |= 24;
          break;
        case _:
          return t = qe(12, i, n, u | 2), t.elementType = _, t.lanes = d, t;
        case V:
          return t = qe(13, i, n, u), t.elementType = V, t.lanes = d, t;
        case B:
          return t = qe(19, i, n, u), t.elementType = B, t.lanes = d, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case j:
                x = 10;
                break t;
              case D:
                x = 9;
                break t;
              case M:
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
    return n = qe(x, i, n, u), n.elementType = t, n.type = o, n.lanes = d, n;
  }
  function za(t, n, i, o) {
    return t = qe(7, t, o, n), t.lanes = i, t;
  }
  function Tu(t, n, i) {
    return t = qe(6, t, null, n), t.lanes = i, t;
  }
  function $m(t) {
    var n = qe(18, null, null, 0);
    return n.stateNode = t, n;
  }
  function Cu(t, n, i) {
    return n = qe(
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
  var Gm = /* @__PURE__ */ new WeakMap();
  function We(t, n) {
    if (typeof t == "object" && t !== null) {
      var i = Gm.get(t);
      return i !== void 0 ? i : (n = {
        value: t,
        source: n,
        stack: ja(n)
      }, Gm.set(t, n), n);
    }
    return {
      value: t,
      source: n,
      stack: ja(n)
    };
  }
  var vi = [], bi = 0, Ks = null, wl = 0, Ie = [], tn = 0, Jn = null, xn = 1, Sn = "";
  function Nn(t, n) {
    vi[bi++] = wl, vi[bi++] = Ks, Ks = t, wl = n;
  }
  function Ym(t, n, i) {
    Ie[tn++] = xn, Ie[tn++] = Sn, Ie[tn++] = Jn, Jn = t;
    var o = xn;
    t = Sn;
    var u = 32 - ke(o) - 1;
    o &= ~(1 << u), i += 1;
    var d = 32 - ke(n) + u;
    if (30 < d) {
      var x = u - u % 5;
      d = (o & (1 << x) - 1).toString(32), o >>= x, u -= x, xn = 1 << 32 - ke(n) + u | i << u | o, Sn = d + t;
    } else
      xn = 1 << d | i << u | o, Sn = t;
  }
  function Eu(t) {
    t.return !== null && (Nn(t, 1), Ym(t, 1, 0));
  }
  function Au(t) {
    for (; t === Ks; )
      Ks = vi[--bi], vi[bi] = null, wl = vi[--bi], vi[bi] = null;
    for (; t === Jn; )
      Jn = Ie[--tn], Ie[tn] = null, Sn = Ie[--tn], Ie[tn] = null, xn = Ie[--tn], Ie[tn] = null;
  }
  function Xm(t, n) {
    Ie[tn++] = xn, Ie[tn++] = Sn, Ie[tn++] = Jn, xn = n.id, Sn = n.overflow, Jn = t;
  }
  var ve = null, Yt = null, jt = !1, Wn = null, en = !1, ju = Error(s(519));
  function In(t) {
    var n = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Tl(We(n, t)), ju;
  }
  function Pm(t) {
    var n = t.stateNode, i = t.type, o = t.memoizedProps;
    switch (n[ge] = t, n[Re] = o, i) {
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
        for (i = 0; i < Xl.length; i++)
          Ct(Xl[i], n);
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
        Ct("invalid", n), lm(
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
        Ct("invalid", n), om(n, o.value, o.defaultValue, o.children);
    }
    i = o.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || n.textContent === "" + i || o.suppressHydrationWarning === !0 || u0(n.textContent, i) ? (o.popover != null && (Ct("beforetoggle", n), Ct("toggle", n)), o.onScroll != null && Ct("scroll", n), o.onScrollEnd != null && Ct("scrollend", n), o.onClick != null && (n.onclick = _n), n = !0) : n = !1, n || In(t, !0);
  }
  function Km(t) {
    for (ve = t.return; ve; )
      switch (ve.tag) {
        case 5:
        case 31:
        case 13:
          en = !1;
          return;
        case 27:
        case 3:
          en = !0;
          return;
        default:
          ve = ve.return;
      }
  }
  function xi(t) {
    if (t !== ve) return !1;
    if (!jt) return Km(t), jt = !0, !1;
    var n = t.tag, i;
    if ((i = n !== 3 && n !== 27) && ((i = n === 5) && (i = t.type, i = !(i !== "form" && i !== "button") || Xc(t.type, t.memoizedProps)), i = !i), i && Yt && In(t), Km(t), n === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Yt = v0(t);
    } else if (n === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Yt = v0(t);
    } else
      n === 27 ? (n = Yt, ha(t.type) ? (t = Fc, Fc = null, Yt = t) : Yt = n) : Yt = ve ? an(t.stateNode.nextSibling) : null;
    return !0;
  }
  function La() {
    Yt = ve = null, jt = !1;
  }
  function Mu() {
    var t = Wn;
    return t !== null && (Le === null ? Le = t : Le.push.apply(
      Le,
      t
    ), Wn = null), t;
  }
  function Tl(t) {
    Wn === null ? Wn = [t] : Wn.push(t);
  }
  var _u = O(null), Ba = null, On = null;
  function ta(t, n, i) {
    tt(_u, n._currentValue), n._currentValue = i;
  }
  function zn(t) {
    t._currentValue = _u.current, $(_u);
  }
  function Ru(t, n, i) {
    for (; t !== null; ) {
      var o = t.alternate;
      if ((t.childLanes & n) !== n ? (t.childLanes |= n, o !== null && (o.childLanes |= n)) : o !== null && (o.childLanes & n) !== n && (o.childLanes |= n), t === i) break;
      t = t.return;
    }
  }
  function Du(t, n, i, o) {
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
              d.lanes |= i, C = d.alternate, C !== null && (C.lanes |= i), Ru(
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
        x.lanes |= i, d = x.alternate, d !== null && (d.lanes |= i), Ru(x, i, t), x = null;
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
  function Si(t, n, i, o) {
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
          He(u.pendingProps.value, x.value) || (t !== null ? t.push(C) : t = [C]);
        }
      } else if (u === vt.current) {
        if (x = u.alternate, x === null) throw Error(s(387));
        x.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(Fl) : t = [Fl]);
      }
      u = u.return;
    }
    t !== null && Du(
      n,
      t,
      i,
      o
    ), n.flags |= 262144;
  }
  function Zs(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!He(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Va(t) {
    Ba = t, On = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function be(t) {
    return Zm(Ba, t);
  }
  function Qs(t, n) {
    return Ba === null && Va(t), Zm(t, n);
  }
  function Zm(t, n) {
    var i = n._currentValue;
    if (n = { context: n, memoizedValue: i, next: null }, On === null) {
      if (t === null) throw Error(s(308));
      On = n, t.dependencies = { lanes: 0, firstContext: n }, t.flags |= 524288;
    } else On = On.next = n;
    return i;
  }
  var S3 = typeof AbortController < "u" ? AbortController : function() {
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
  }, w3 = a.unstable_scheduleCallback, T3 = a.unstable_NormalPriority, se = {
    $$typeof: j,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Nu() {
    return {
      controller: new S3(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Cl(t) {
    t.refCount--, t.refCount === 0 && w3(T3, function() {
      t.controller.abort();
    });
  }
  var El = null, Ou = 0, wi = 0, Ti = null;
  function C3(t, n) {
    if (El === null) {
      var i = El = [];
      Ou = 0, wi = Bc(), Ti = {
        status: "pending",
        value: void 0,
        then: function(o) {
          i.push(o);
        }
      };
    }
    return Ou++, n.then(Qm, Qm), n;
  }
  function Qm() {
    if (--Ou === 0 && El !== null) {
      Ti !== null && (Ti.status = "fulfilled");
      var t = El;
      El = null, wi = 0, Ti = null;
      for (var n = 0; n < t.length; n++) (0, t[n])();
    }
  }
  function E3(t, n) {
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
  var Fm = N.S;
  N.S = function(t, n) {
    O1 = Ve(), typeof n == "object" && n !== null && typeof n.then == "function" && C3(t, n), Fm !== null && Fm(t, n);
  };
  var Ua = O(null);
  function zu() {
    var t = Ua.current;
    return t !== null ? t : Ht.pooledCache;
  }
  function Fs(t, n) {
    n === null ? tt(Ua, Ua.current) : tt(Ua, n.pool);
  }
  function Jm() {
    var t = zu();
    return t === null ? null : { parent: se._currentValue, pool: t };
  }
  var Ci = Error(s(460)), Lu = Error(s(474)), Js = Error(s(542)), Ws = { then: function() {
  } };
  function Wm(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Im(t, n, i) {
    switch (i = t[i], i === void 0 ? t.push(n) : i !== n && (n.then(_n, _n), n = i), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw t = n.reason, ep(t), t;
      default:
        if (typeof n.status == "string") n.then(_n, _n);
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
            throw t = n.reason, ep(t), t;
        }
        throw Ha = n, Ci;
    }
  }
  function ka(t) {
    try {
      var n = t._init;
      return n(t._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (Ha = i, Ci) : i;
    }
  }
  var Ha = null;
  function tp() {
    if (Ha === null) throw Error(s(459));
    var t = Ha;
    return Ha = null, t;
  }
  function ep(t) {
    if (t === Ci || t === Js)
      throw Error(s(483));
  }
  var Ei = null, Al = 0;
  function Is(t) {
    var n = Al;
    return Al += 1, Ei === null && (Ei = []), Im(Ei, t, n);
  }
  function jl(t, n) {
    n = n.props.ref, t.ref = n !== void 0 ? n : null;
  }
  function to(t, n) {
    throw n.$$typeof === b ? Error(s(525)) : (t = Object.prototype.toString.call(n), Error(
      s(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : t
      )
    ));
  }
  function np(t) {
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
      return U = Dn(U, L), U.index = 0, U.sibling = null, U;
    }
    function d(U, L, H) {
      return U.index = H, t ? (H = U.alternate, H !== null ? (H = H.index, H < L ? (U.flags |= 67108866, L) : H) : (U.flags |= 67108866, L)) : (U.flags |= 1048576, L);
    }
    function x(U) {
      return t && U.alternate === null && (U.flags |= 67108866), U;
    }
    function C(U, L, H, F) {
      return L === null || L.tag !== 6 ? (L = Tu(H, U.mode, F), L.return = U, L) : (L = u(L, H), L.return = U, L);
    }
    function z(U, L, H, F) {
      var mt = H.type;
      return mt === w ? Z(
        U,
        L,
        H.props.children,
        F,
        H.key
      ) : L !== null && (L.elementType === mt || typeof mt == "object" && mt !== null && mt.$$typeof === k && ka(mt) === L.type) ? (L = u(L, H.props), jl(L, H), L.return = U, L) : (L = Ps(
        H.type,
        H.key,
        H.props,
        null,
        U.mode,
        F
      ), jl(L, H), L.return = U, L);
    }
    function q(U, L, H, F) {
      return L === null || L.tag !== 4 || L.stateNode.containerInfo !== H.containerInfo || L.stateNode.implementation !== H.implementation ? (L = Cu(H, U.mode, F), L.return = U, L) : (L = u(L, H.children || []), L.return = U, L);
    }
    function Z(U, L, H, F, mt) {
      return L === null || L.tag !== 7 ? (L = za(
        H,
        U.mode,
        F,
        mt
      ), L.return = U, L) : (L = u(L, H), L.return = U, L);
    }
    function W(U, L, H) {
      if (typeof L == "string" && L !== "" || typeof L == "number" || typeof L == "bigint")
        return L = Tu(
          "" + L,
          U.mode,
          H
        ), L.return = U, L;
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case T:
            return H = Ps(
              L.type,
              L.key,
              L.props,
              null,
              U.mode,
              H
            ), jl(H, L), H.return = U, H;
          case S:
            return L = Cu(
              L,
              U.mode,
              H
            ), L.return = U, L;
          case k:
            return L = ka(L), W(U, L, H);
        }
        if (et(L) || nt(L))
          return L = za(
            L,
            U.mode,
            H,
            null
          ), L.return = U, L;
        if (typeof L.then == "function")
          return W(U, Is(L), H);
        if (L.$$typeof === j)
          return W(
            U,
            Qs(U, L),
            H
          );
        to(U, L);
      }
      return null;
    }
    function G(U, L, H, F) {
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
            return H = ka(H), G(U, L, H, F);
        }
        if (et(H) || nt(H))
          return mt !== null ? null : Z(U, L, H, F, null);
        if (typeof H.then == "function")
          return G(
            U,
            L,
            Is(H),
            F
          );
        if (H.$$typeof === j)
          return G(
            U,
            L,
            Qs(U, H),
            F
          );
        to(U, H);
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
            return F = ka(F), X(
              U,
              L,
              H,
              F,
              mt
            );
        }
        if (et(F) || nt(F))
          return U = U.get(H) || null, Z(L, U, F, mt, null);
        if (typeof F.then == "function")
          return X(
            U,
            L,
            H,
            Is(F),
            mt
          );
        if (F.$$typeof === j)
          return X(
            U,
            L,
            H,
            Qs(L, F),
            mt
          );
        to(L, F);
      }
      return null;
    }
    function ut(U, L, H, F) {
      for (var mt = null, _t = null, ft = L, St = L = 0, At = null; ft !== null && St < H.length; St++) {
        ft.index > St ? (At = ft, ft = null) : At = ft.sibling;
        var Rt = G(
          U,
          ft,
          H[St],
          F
        );
        if (Rt === null) {
          ft === null && (ft = At);
          break;
        }
        t && ft && Rt.alternate === null && n(U, ft), L = d(Rt, L, St), _t === null ? mt = Rt : _t.sibling = Rt, _t = Rt, ft = At;
      }
      if (St === H.length)
        return i(U, ft), jt && Nn(U, St), mt;
      if (ft === null) {
        for (; St < H.length; St++)
          ft = W(U, H[St], F), ft !== null && (L = d(
            ft,
            L,
            St
          ), _t === null ? mt = ft : _t.sibling = ft, _t = ft);
        return jt && Nn(U, St), mt;
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
        ), _t === null ? mt = At : _t.sibling = At, _t = At);
      return t && ft.forEach(function(va) {
        return n(U, va);
      }), jt && Nn(U, St), mt;
    }
    function gt(U, L, H, F) {
      if (H == null) throw Error(s(151));
      for (var mt = null, _t = null, ft = L, St = L = 0, At = null, Rt = H.next(); ft !== null && !Rt.done; St++, Rt = H.next()) {
        ft.index > St ? (At = ft, ft = null) : At = ft.sibling;
        var va = G(U, ft, Rt.value, F);
        if (va === null) {
          ft === null && (ft = At);
          break;
        }
        t && ft && va.alternate === null && n(U, ft), L = d(va, L, St), _t === null ? mt = va : _t.sibling = va, _t = va, ft = At;
      }
      if (Rt.done)
        return i(U, ft), jt && Nn(U, St), mt;
      if (ft === null) {
        for (; !Rt.done; St++, Rt = H.next())
          Rt = W(U, Rt.value, F), Rt !== null && (L = d(Rt, L, St), _t === null ? mt = Rt : _t.sibling = Rt, _t = Rt);
        return jt && Nn(U, St), mt;
      }
      for (ft = o(ft); !Rt.done; St++, Rt = H.next())
        Rt = X(ft, U, St, Rt.value, F), Rt !== null && (t && Rt.alternate !== null && ft.delete(Rt.key === null ? St : Rt.key), L = d(Rt, L, St), _t === null ? mt = Rt : _t.sibling = Rt, _t = Rt);
      return t && ft.forEach(function(BS) {
        return n(U, BS);
      }), jt && Nn(U, St), mt;
    }
    function Ut(U, L, H, F) {
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
                  } else if (L.elementType === mt || typeof mt == "object" && mt !== null && mt.$$typeof === k && ka(mt) === L.type) {
                    i(
                      U,
                      L.sibling
                    ), F = u(L, H.props), jl(F, H), F.return = U, U = F;
                    break t;
                  }
                  i(U, L);
                  break;
                } else n(U, L);
                L = L.sibling;
              }
              H.type === w ? (F = za(
                H.props.children,
                U.mode,
                F,
                H.key
              ), F.return = U, U = F) : (F = Ps(
                H.type,
                H.key,
                H.props,
                null,
                U.mode,
                F
              ), jl(F, H), F.return = U, U = F);
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
              F = Cu(H, U.mode, F), F.return = U, U = F;
            }
            return x(U);
          case k:
            return H = ka(H), Ut(
              U,
              L,
              H,
              F
            );
        }
        if (et(H))
          return ut(
            U,
            L,
            H,
            F
          );
        if (nt(H)) {
          if (mt = nt(H), typeof mt != "function") throw Error(s(150));
          return H = mt.call(H), gt(
            U,
            L,
            H,
            F
          );
        }
        if (typeof H.then == "function")
          return Ut(
            U,
            L,
            Is(H),
            F
          );
        if (H.$$typeof === j)
          return Ut(
            U,
            L,
            Qs(U, H),
            F
          );
        to(U, H);
      }
      return typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint" ? (H = "" + H, L !== null && L.tag === 6 ? (i(U, L.sibling), F = u(L, H), F.return = U, U = F) : (i(U, L), F = Tu(H, U.mode, F), F.return = U, U = F), x(U)) : i(U, L);
    }
    return function(U, L, H, F) {
      try {
        Al = 0;
        var mt = Ut(
          U,
          L,
          H,
          F
        );
        return Ei = null, mt;
      } catch (ft) {
        if (ft === Ci || ft === Js) throw ft;
        var _t = qe(29, ft, null, U.mode);
        return _t.lanes = F, _t.return = U, _t;
      } finally {
      }
    };
  }
  var qa = np(!0), ap = np(!1), ea = !1;
  function Bu(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Vu(t, n) {
    t = t.updateQueue, n.updateQueue === t && (n.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function na(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function aa(t, n, i) {
    var o = t.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (Nt & 2) !== 0) {
      var u = o.pending;
      return u === null ? n.next = n : (n.next = u.next, u.next = n), o.pending = n, n = Xs(t), Hm(t, null, i), n;
    }
    return Ys(t, o, n, i), Xs(t);
  }
  function Ml(t, n, i) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (i & 4194048) !== 0)) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, Zh(t, i);
    }
  }
  function Uu(t, n) {
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
  var ku = !1;
  function _l() {
    if (ku) {
      var t = Ti;
      if (t !== null) throw t;
    }
  }
  function Rl(t, n, i, o) {
    ku = !1;
    var u = t.updateQueue;
    ea = !1;
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
        var G = C.lane & -536870913, X = G !== C.lane;
        if (X ? (Et & G) === G : (o & G) === G) {
          G !== 0 && G === wi && (ku = !0), Z !== null && (Z = Z.next = {
            lane: 0,
            tag: C.tag,
            payload: C.payload,
            callback: null,
            next: null
          });
          t: {
            var ut = t, gt = C;
            G = n;
            var Ut = i;
            switch (gt.tag) {
              case 1:
                if (ut = gt.payload, typeof ut == "function") {
                  W = ut.call(Ut, W, G);
                  break t;
                }
                W = ut;
                break t;
              case 3:
                ut.flags = ut.flags & -65537 | 128;
              case 0:
                if (ut = gt.payload, G = typeof ut == "function" ? ut.call(Ut, W, G) : ut, G == null) break t;
                W = v({}, W, G);
                break t;
              case 2:
                ea = !0;
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
          }, Z === null ? (q = Z = X, z = W) : Z = Z.next = X, x |= G;
        if (C = C.next, C === null) {
          if (C = u.shared.pending, C === null)
            break;
          X = C, C = X.next, X.next = null, u.lastBaseUpdate = X, u.shared.pending = null;
        }
      } while (!0);
      Z === null && (z = W), u.baseState = z, u.firstBaseUpdate = q, u.lastBaseUpdate = Z, d === null && (u.shared.lanes = 0), ra |= x, t.lanes = x, t.memoizedState = W;
    }
  }
  function ip(t, n) {
    if (typeof t != "function")
      throw Error(s(191, t));
    t.call(n);
  }
  function lp(t, n) {
    var i = t.callbacks;
    if (i !== null)
      for (t.callbacks = null, t = 0; t < i.length; t++)
        ip(i[t], n);
  }
  var Ai = O(null), eo = O(0);
  function sp(t, n) {
    t = Gn, tt(eo, t), tt(Ai, n), Gn = t | n.baseLanes;
  }
  function Hu() {
    tt(eo, Gn), tt(Ai, Ai.current);
  }
  function qu() {
    Gn = eo.current, $(Ai), $(eo);
  }
  var $e = O(null), nn = null;
  function ia(t) {
    var n = t.alternate;
    tt(ee, ee.current & 1), tt($e, t), nn === null && (n === null || Ai.current !== null || n.memoizedState !== null) && (nn = t);
  }
  function $u(t) {
    tt(ee, ee.current), tt($e, t), nn === null && (nn = t);
  }
  function op(t) {
    t.tag === 22 ? (tt(ee, ee.current), tt($e, t), nn === null && (nn = t)) : la();
  }
  function la() {
    tt(ee, ee.current), tt($e, $e.current);
  }
  function Ge(t) {
    $($e), nn === t && (nn = null), $(ee);
  }
  var ee = O(0);
  function no(t) {
    for (var n = t; n !== null; ) {
      if (n.tag === 13) {
        var i = n.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || Zc(i) || Qc(i)))
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
  var Ln = 0, xt = null, Bt = null, oe = null, ao = !1, ji = !1, $a = !1, io = 0, Dl = 0, Mi = null, A3 = 0;
  function Jt() {
    throw Error(s(321));
  }
  function Gu(t, n) {
    if (n === null) return !1;
    for (var i = 0; i < n.length && i < t.length; i++)
      if (!He(t[i], n[i])) return !1;
    return !0;
  }
  function Yu(t, n, i, o, u, d) {
    return Ln = d, xt = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, N.H = t === null || t.memoizedState === null ? Yp : lc, $a = !1, d = i(o, u), $a = !1, ji && (d = up(
      n,
      i,
      o,
      u
    )), rp(t), d;
  }
  function rp(t) {
    N.H = zl;
    var n = Bt !== null && Bt.next !== null;
    if (Ln = 0, oe = Bt = xt = null, ao = !1, Dl = 0, Mi = null, n) throw Error(s(300));
    t === null || re || (t = t.dependencies, t !== null && Zs(t) && (re = !0));
  }
  function up(t, n, i, o) {
    xt = t;
    var u = 0;
    do {
      if (ji && (Mi = null), Dl = 0, ji = !1, 25 <= u) throw Error(s(301));
      if (u += 1, oe = Bt = null, t.updateQueue != null) {
        var d = t.updateQueue;
        d.lastEffect = null, d.events = null, d.stores = null, d.memoCache != null && (d.memoCache.index = 0);
      }
      N.H = Xp, d = n(i, o);
    } while (ji);
    return d;
  }
  function j3() {
    var t = N.H, n = t.useState()[0];
    return n = typeof n.then == "function" ? Nl(n) : n, t = t.useState()[0], (Bt !== null ? Bt.memoizedState : null) !== t && (xt.flags |= 1024), n;
  }
  function Xu() {
    var t = io !== 0;
    return io = 0, t;
  }
  function Pu(t, n, i) {
    n.updateQueue = t.updateQueue, n.flags &= -2053, t.lanes &= ~i;
  }
  function Ku(t) {
    if (ao) {
      for (t = t.memoizedState; t !== null; ) {
        var n = t.queue;
        n !== null && (n.pending = null), t = t.next;
      }
      ao = !1;
    }
    Ln = 0, oe = Bt = xt = null, ji = !1, Dl = io = 0, Mi = null;
  }
  function je() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return oe === null ? xt.memoizedState = oe = t : oe = oe.next = t, oe;
  }
  function ne() {
    if (Bt === null) {
      var t = xt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Bt.next;
    var n = oe === null ? xt.memoizedState : oe.next;
    if (n !== null)
      oe = n, Bt = t;
    else {
      if (t === null)
        throw xt.alternate === null ? Error(s(467)) : Error(s(310));
      Bt = t, t = {
        memoizedState: Bt.memoizedState,
        baseState: Bt.baseState,
        baseQueue: Bt.baseQueue,
        queue: Bt.queue,
        next: null
      }, oe === null ? xt.memoizedState = oe = t : oe = oe.next = t;
    }
    return oe;
  }
  function lo() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Nl(t) {
    var n = Dl;
    return Dl += 1, Mi === null && (Mi = []), t = Im(Mi, t, n), n = xt, (oe === null ? n.memoizedState : oe.next) === null && (n = n.alternate, N.H = n === null || n.memoizedState === null ? Yp : lc), t;
  }
  function so(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Nl(t);
      if (t.$$typeof === j) return be(t);
    }
    throw Error(s(438, String(t)));
  }
  function Zu(t) {
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
    if (n == null && (n = { data: [], index: 0 }), i === null && (i = lo(), xt.updateQueue = i), i.memoCache = n, i = n.data[n.index], i === void 0)
      for (i = n.data[n.index] = Array(t), o = 0; o < t; o++)
        i[o] = K;
    return n.index++, i;
  }
  function Bn(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function oo(t) {
    var n = ne();
    return Qu(n, Bt, t);
  }
  function Qu(t, n, i) {
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
        if (W !== q.lane ? (Et & W) === W : (Ln & W) === W) {
          var G = q.revertLane;
          if (G === 0)
            z !== null && (z = z.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: q.action,
              hasEagerState: q.hasEagerState,
              eagerState: q.eagerState,
              next: null
            }), W === wi && (Z = !0);
          else if ((Ln & G) === G) {
            q = q.next, G === wi && (Z = !0);
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
            }, z === null ? (C = z = W, x = d) : z = z.next = W, xt.lanes |= G, ra |= G;
          W = q.action, $a && i(d, W), d = q.hasEagerState ? q.eagerState : i(d, W);
        } else
          G = {
            lane: W,
            revertLane: q.revertLane,
            gesture: q.gesture,
            action: q.action,
            hasEagerState: q.hasEagerState,
            eagerState: q.eagerState,
            next: null
          }, z === null ? (C = z = G, x = d) : z = z.next = G, xt.lanes |= W, ra |= W;
        q = q.next;
      } while (q !== null && q !== n);
      if (z === null ? x = d : z.next = C, !He(d, t.memoizedState) && (re = !0, Z && (i = Ti, i !== null)))
        throw i;
      t.memoizedState = d, t.baseState = x, t.baseQueue = z, o.lastRenderedState = d;
    }
    return u === null && (o.lanes = 0), [t.memoizedState, o.dispatch];
  }
  function Fu(t) {
    var n = ne(), i = n.queue;
    if (i === null) throw Error(s(311));
    i.lastRenderedReducer = t;
    var o = i.dispatch, u = i.pending, d = n.memoizedState;
    if (u !== null) {
      i.pending = null;
      var x = u = u.next;
      do
        d = t(d, x.action), x = x.next;
      while (x !== u);
      He(d, n.memoizedState) || (re = !0), n.memoizedState = d, n.baseQueue === null && (n.baseState = d), i.lastRenderedState = d;
    }
    return [d, o];
  }
  function cp(t, n, i) {
    var o = xt, u = ne(), d = jt;
    if (d) {
      if (i === void 0) throw Error(s(407));
      i = i();
    } else i = n();
    var x = !He(
      (Bt || u).memoizedState,
      i
    );
    if (x && (u.memoizedState = i, re = !0), u = u.queue, Iu(hp.bind(null, o, u, t), [
      t
    ]), u.getSnapshot !== n || x || oe !== null && oe.memoizedState.tag & 1) {
      if (o.flags |= 2048, _i(
        9,
        { destroy: void 0 },
        dp.bind(
          null,
          o,
          u,
          i,
          n
        ),
        null
      ), Ht === null) throw Error(s(349));
      d || (Ln & 127) !== 0 || fp(o, n, i);
    }
    return i;
  }
  function fp(t, n, i) {
    t.flags |= 16384, t = { getSnapshot: n, value: i }, n = xt.updateQueue, n === null ? (n = lo(), xt.updateQueue = n, n.stores = [t]) : (i = n.stores, i === null ? n.stores = [t] : i.push(t));
  }
  function dp(t, n, i, o) {
    n.value = i, n.getSnapshot = o, mp(n) && pp(t);
  }
  function hp(t, n, i) {
    return i(function() {
      mp(n) && pp(t);
    });
  }
  function mp(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var i = n();
      return !He(t, i);
    } catch {
      return !0;
    }
  }
  function pp(t) {
    var n = Oa(t, 2);
    n !== null && Be(n, t, 2);
  }
  function Ju(t) {
    var n = je();
    if (typeof t == "function") {
      var i = t;
      if (t = i(), $a) {
        Zn(!0);
        try {
          i();
        } finally {
          Zn(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = t, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Bn,
      lastRenderedState: t
    }, n;
  }
  function yp(t, n, i, o) {
    return t.baseState = i, Qu(
      t,
      Bt,
      typeof o == "function" ? o : Bn
    );
  }
  function M3(t, n, i, o, u) {
    if (co(t)) throw Error(s(485));
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
      N.T !== null ? i(!0) : d.isTransition = !1, o(d), i = n.pending, i === null ? (d.next = n.pending = d, gp(n, d)) : (d.next = i.next, n.pending = i.next = d);
    }
  }
  function gp(t, n) {
    var i = n.action, o = n.payload, u = t.state;
    if (n.isTransition) {
      var d = N.T, x = {};
      N.T = x;
      try {
        var C = i(u, o), z = N.S;
        z !== null && z(x, C), vp(t, n, C);
      } catch (q) {
        Wu(t, n, q);
      } finally {
        d !== null && x.types !== null && (d.types = x.types), N.T = d;
      }
    } else
      try {
        d = i(u, o), vp(t, n, d);
      } catch (q) {
        Wu(t, n, q);
      }
  }
  function vp(t, n, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(o) {
        bp(t, n, o);
      },
      function(o) {
        return Wu(t, n, o);
      }
    ) : bp(t, n, i);
  }
  function bp(t, n, i) {
    n.status = "fulfilled", n.value = i, xp(n), t.state = i, n = t.pending, n !== null && (i = n.next, i === n ? t.pending = null : (i = i.next, n.next = i, gp(t, i)));
  }
  function Wu(t, n, i) {
    var o = t.pending;
    if (t.pending = null, o !== null) {
      o = o.next;
      do
        n.status = "rejected", n.reason = i, xp(n), n = n.next;
      while (n !== o);
    }
    t.action = null;
  }
  function xp(t) {
    t = t.listeners;
    for (var n = 0; n < t.length; n++) (0, t[n])();
  }
  function Sp(t, n) {
    return n;
  }
  function wp(t, n) {
    if (jt) {
      var i = Ht.formState;
      if (i !== null) {
        t: {
          var o = xt;
          if (jt) {
            if (Yt) {
              e: {
                for (var u = Yt, d = en; u.nodeType !== 8; ) {
                  if (!d) {
                    u = null;
                    break e;
                  }
                  if (u = an(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break e;
                  }
                }
                d = u.data, u = d === "F!" || d === "F" ? u : null;
              }
              if (u) {
                Yt = an(
                  u.nextSibling
                ), o = u.data === "F!";
                break t;
              }
            }
            In(o);
          }
          o = !1;
        }
        o && (n = i[0]);
      }
    }
    return i = je(), i.memoizedState = i.baseState = n, o = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Sp,
      lastRenderedState: n
    }, i.queue = o, i = qp.bind(
      null,
      xt,
      o
    ), o.dispatch = i, o = Ju(!1), d = ic.bind(
      null,
      xt,
      !1,
      o.queue
    ), o = je(), u = {
      state: n,
      dispatch: null,
      action: t,
      pending: null
    }, o.queue = u, i = M3.bind(
      null,
      xt,
      u,
      d,
      i
    ), u.dispatch = i, o.memoizedState = t, [n, i, !1];
  }
  function Tp(t) {
    var n = ne();
    return Cp(n, Bt, t);
  }
  function Cp(t, n, i) {
    if (n = Qu(
      t,
      n,
      Sp
    )[0], t = oo(Bn)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var o = Nl(n);
      } catch (x) {
        throw x === Ci ? Js : x;
      }
    else o = n;
    n = ne();
    var u = n.queue, d = u.dispatch;
    return i !== n.memoizedState && (xt.flags |= 2048, _i(
      9,
      { destroy: void 0 },
      _3.bind(null, u, i),
      null
    )), [o, d, t];
  }
  function _3(t, n) {
    t.action = n;
  }
  function Ep(t) {
    var n = ne(), i = Bt;
    if (i !== null)
      return Cp(n, i, t);
    ne(), n = n.memoizedState, i = ne();
    var o = i.queue.dispatch;
    return i.memoizedState = t, [n, o, !1];
  }
  function _i(t, n, i, o) {
    return t = { tag: t, create: i, deps: o, inst: n, next: null }, n = xt.updateQueue, n === null && (n = lo(), xt.updateQueue = n), i = n.lastEffect, i === null ? n.lastEffect = t.next = t : (o = i.next, i.next = t, t.next = o, n.lastEffect = t), t;
  }
  function Ap() {
    return ne().memoizedState;
  }
  function ro(t, n, i, o) {
    var u = je();
    xt.flags |= t, u.memoizedState = _i(
      1 | n,
      { destroy: void 0 },
      i,
      o === void 0 ? null : o
    );
  }
  function uo(t, n, i, o) {
    var u = ne();
    o = o === void 0 ? null : o;
    var d = u.memoizedState.inst;
    Bt !== null && o !== null && Gu(o, Bt.memoizedState.deps) ? u.memoizedState = _i(n, d, i, o) : (xt.flags |= t, u.memoizedState = _i(
      1 | n,
      d,
      i,
      o
    ));
  }
  function jp(t, n) {
    ro(8390656, 8, t, n);
  }
  function Iu(t, n) {
    uo(2048, 8, t, n);
  }
  function R3(t) {
    xt.flags |= 4;
    var n = xt.updateQueue;
    if (n === null)
      n = lo(), xt.updateQueue = n, n.events = [t];
    else {
      var i = n.events;
      i === null ? n.events = [t] : i.push(t);
    }
  }
  function Mp(t) {
    var n = ne().memoizedState;
    return R3({ ref: n, nextImpl: t }), function() {
      if ((Nt & 2) !== 0) throw Error(s(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function _p(t, n) {
    return uo(4, 2, t, n);
  }
  function Rp(t, n) {
    return uo(4, 4, t, n);
  }
  function Dp(t, n) {
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
  function Np(t, n, i) {
    i = i != null ? i.concat([t]) : null, uo(4, 4, Dp.bind(null, n, t), i);
  }
  function tc() {
  }
  function Op(t, n) {
    var i = ne();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    return n !== null && Gu(n, o[1]) ? o[0] : (i.memoizedState = [t, n], t);
  }
  function zp(t, n) {
    var i = ne();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    if (n !== null && Gu(n, o[1]))
      return o[0];
    if (o = t(), $a) {
      Zn(!0);
      try {
        t();
      } finally {
        Zn(!1);
      }
    }
    return i.memoizedState = [o, n], o;
  }
  function ec(t, n, i) {
    return i === void 0 || (Ln & 1073741824) !== 0 && (Et & 261930) === 0 ? t.memoizedState = n : (t.memoizedState = i, t = L1(), xt.lanes |= t, ra |= t, i);
  }
  function Lp(t, n, i, o) {
    return He(i, n) ? i : Ai.current !== null ? (t = ec(t, i, o), He(t, n) || (re = !0), t) : (Ln & 42) === 0 || (Ln & 1073741824) !== 0 && (Et & 261930) === 0 ? (re = !0, t.memoizedState = i) : (t = L1(), xt.lanes |= t, ra |= t, n);
  }
  function Bp(t, n, i, o, u) {
    var d = Y.p;
    Y.p = d !== 0 && 8 > d ? d : 8;
    var x = N.T, C = {};
    N.T = C, ic(t, !1, n, i);
    try {
      var z = u(), q = N.S;
      if (q !== null && q(C, z), z !== null && typeof z == "object" && typeof z.then == "function") {
        var Z = E3(
          z,
          o
        );
        Ol(
          t,
          n,
          Z,
          Pe(t)
        );
      } else
        Ol(
          t,
          n,
          o,
          Pe(t)
        );
    } catch (W) {
      Ol(
        t,
        n,
        { then: function() {
        }, status: "rejected", reason: W },
        Pe()
      );
    } finally {
      Y.p = d, x !== null && C.types !== null && (x.types = C.types), N.T = x;
    }
  }
  function D3() {
  }
  function nc(t, n, i, o) {
    if (t.tag !== 5) throw Error(s(476));
    var u = Vp(t).queue;
    Bp(
      t,
      u,
      n,
      J,
      i === null ? D3 : function() {
        return Up(t), i(o);
      }
    );
  }
  function Vp(t) {
    var n = t.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: J,
      baseState: J,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Bn,
        lastRenderedState: J
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
        lastRenderedReducer: Bn,
        lastRenderedState: i
      },
      next: null
    }, t.memoizedState = n, t = t.alternate, t !== null && (t.memoizedState = n), n;
  }
  function Up(t) {
    var n = Vp(t);
    n.next === null && (n = t.alternate.memoizedState), Ol(
      t,
      n.next.queue,
      {},
      Pe()
    );
  }
  function ac() {
    return be(Fl);
  }
  function kp() {
    return ne().memoizedState;
  }
  function Hp() {
    return ne().memoizedState;
  }
  function N3(t) {
    for (var n = t.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var i = Pe();
          t = na(i);
          var o = aa(n, t, i);
          o !== null && (Be(o, n, i), Ml(o, n, i)), n = { cache: Nu() }, t.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function O3(t, n, i) {
    var o = Pe();
    i = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, co(t) ? $p(n, i) : (i = Su(t, n, i, o), i !== null && (Be(i, t, o), Gp(i, n, o)));
  }
  function qp(t, n, i) {
    var o = Pe();
    Ol(t, n, i, o);
  }
  function Ol(t, n, i, o) {
    var u = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (co(t)) $p(n, u);
    else {
      var d = t.alternate;
      if (t.lanes === 0 && (d === null || d.lanes === 0) && (d = n.lastRenderedReducer, d !== null))
        try {
          var x = n.lastRenderedState, C = d(x, i);
          if (u.hasEagerState = !0, u.eagerState = C, He(C, x))
            return Ys(t, n, u, 0), Ht === null && Gs(), !1;
        } catch {
        } finally {
        }
      if (i = Su(t, n, u, o), i !== null)
        return Be(i, t, o), Gp(i, n, o), !0;
    }
    return !1;
  }
  function ic(t, n, i, o) {
    if (o = {
      lane: 2,
      revertLane: Bc(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, co(t)) {
      if (n) throw Error(s(479));
    } else
      n = Su(
        t,
        i,
        o,
        2
      ), n !== null && Be(n, t, 2);
  }
  function co(t) {
    var n = t.alternate;
    return t === xt || n !== null && n === xt;
  }
  function $p(t, n) {
    ji = ao = !0;
    var i = t.pending;
    i === null ? n.next = n : (n.next = i.next, i.next = n), t.pending = n;
  }
  function Gp(t, n, i) {
    if ((i & 4194048) !== 0) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, Zh(t, i);
    }
  }
  var zl = {
    readContext: be,
    use: so,
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
  zl.useEffectEvent = Jt;
  var Yp = {
    readContext: be,
    use: so,
    useCallback: function(t, n) {
      return je().memoizedState = [
        t,
        n === void 0 ? null : n
      ], t;
    },
    useContext: be,
    useEffect: jp,
    useImperativeHandle: function(t, n, i) {
      i = i != null ? i.concat([t]) : null, ro(
        4194308,
        4,
        Dp.bind(null, n, t),
        i
      );
    },
    useLayoutEffect: function(t, n) {
      return ro(4194308, 4, t, n);
    },
    useInsertionEffect: function(t, n) {
      ro(4, 2, t, n);
    },
    useMemo: function(t, n) {
      var i = je();
      n = n === void 0 ? null : n;
      var o = t();
      if ($a) {
        Zn(!0);
        try {
          t();
        } finally {
          Zn(!1);
        }
      }
      return i.memoizedState = [o, n], o;
    },
    useReducer: function(t, n, i) {
      var o = je();
      if (i !== void 0) {
        var u = i(n);
        if ($a) {
          Zn(!0);
          try {
            i(n);
          } finally {
            Zn(!1);
          }
        }
      } else u = n;
      return o.memoizedState = o.baseState = u, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: u
      }, o.queue = t, t = t.dispatch = O3.bind(
        null,
        xt,
        t
      ), [o.memoizedState, t];
    },
    useRef: function(t) {
      var n = je();
      return t = { current: t }, n.memoizedState = t;
    },
    useState: function(t) {
      t = Ju(t);
      var n = t.queue, i = qp.bind(null, xt, n);
      return n.dispatch = i, [t.memoizedState, i];
    },
    useDebugValue: tc,
    useDeferredValue: function(t, n) {
      var i = je();
      return ec(i, t, n);
    },
    useTransition: function() {
      var t = Ju(!1);
      return t = Bp.bind(
        null,
        xt,
        t.queue,
        !0,
        !1
      ), je().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, n, i) {
      var o = xt, u = je();
      if (jt) {
        if (i === void 0)
          throw Error(s(407));
        i = i();
      } else {
        if (i = n(), Ht === null)
          throw Error(s(349));
        (Et & 127) !== 0 || fp(o, n, i);
      }
      u.memoizedState = i;
      var d = { value: i, getSnapshot: n };
      return u.queue = d, jp(hp.bind(null, o, d, t), [
        t
      ]), o.flags |= 2048, _i(
        9,
        { destroy: void 0 },
        dp.bind(
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
      var t = je(), n = Ht.identifierPrefix;
      if (jt) {
        var i = Sn, o = xn;
        i = (o & ~(1 << 32 - ke(o) - 1)).toString(32) + i, n = "_" + n + "R_" + i, i = io++, 0 < i && (n += "H" + i.toString(32)), n += "_";
      } else
        i = A3++, n = "_" + n + "r_" + i.toString(32) + "_";
      return t.memoizedState = n;
    },
    useHostTransitionStatus: ac,
    useFormState: wp,
    useActionState: wp,
    useOptimistic: function(t) {
      var n = je();
      n.memoizedState = n.baseState = t;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = i, n = ic.bind(
        null,
        xt,
        !0,
        i
      ), i.dispatch = n, [t, n];
    },
    useMemoCache: Zu,
    useCacheRefresh: function() {
      return je().memoizedState = N3.bind(
        null,
        xt
      );
    },
    useEffectEvent: function(t) {
      var n = je(), i = { impl: t };
      return n.memoizedState = i, function() {
        if ((Nt & 2) !== 0)
          throw Error(s(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, lc = {
    readContext: be,
    use: so,
    useCallback: Op,
    useContext: be,
    useEffect: Iu,
    useImperativeHandle: Np,
    useInsertionEffect: _p,
    useLayoutEffect: Rp,
    useMemo: zp,
    useReducer: oo,
    useRef: Ap,
    useState: function() {
      return oo(Bn);
    },
    useDebugValue: tc,
    useDeferredValue: function(t, n) {
      var i = ne();
      return Lp(
        i,
        Bt.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = oo(Bn)[0], n = ne().memoizedState;
      return [
        typeof t == "boolean" ? t : Nl(t),
        n
      ];
    },
    useSyncExternalStore: cp,
    useId: kp,
    useHostTransitionStatus: ac,
    useFormState: Tp,
    useActionState: Tp,
    useOptimistic: function(t, n) {
      var i = ne();
      return yp(i, Bt, t, n);
    },
    useMemoCache: Zu,
    useCacheRefresh: Hp
  };
  lc.useEffectEvent = Mp;
  var Xp = {
    readContext: be,
    use: so,
    useCallback: Op,
    useContext: be,
    useEffect: Iu,
    useImperativeHandle: Np,
    useInsertionEffect: _p,
    useLayoutEffect: Rp,
    useMemo: zp,
    useReducer: Fu,
    useRef: Ap,
    useState: function() {
      return Fu(Bn);
    },
    useDebugValue: tc,
    useDeferredValue: function(t, n) {
      var i = ne();
      return Bt === null ? ec(i, t, n) : Lp(
        i,
        Bt.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = Fu(Bn)[0], n = ne().memoizedState;
      return [
        typeof t == "boolean" ? t : Nl(t),
        n
      ];
    },
    useSyncExternalStore: cp,
    useId: kp,
    useHostTransitionStatus: ac,
    useFormState: Ep,
    useActionState: Ep,
    useOptimistic: function(t, n) {
      var i = ne();
      return Bt !== null ? yp(i, Bt, t, n) : (i.baseState = t, [t, i.queue.dispatch]);
    },
    useMemoCache: Zu,
    useCacheRefresh: Hp
  };
  Xp.useEffectEvent = Mp;
  function sc(t, n, i, o) {
    n = t.memoizedState, i = i(o, n), i = i == null ? n : v({}, n, i), t.memoizedState = i, t.lanes === 0 && (t.updateQueue.baseState = i);
  }
  var oc = {
    enqueueSetState: function(t, n, i) {
      t = t._reactInternals;
      var o = Pe(), u = na(o);
      u.payload = n, i != null && (u.callback = i), n = aa(t, u, o), n !== null && (Be(n, t, o), Ml(n, t, o));
    },
    enqueueReplaceState: function(t, n, i) {
      t = t._reactInternals;
      var o = Pe(), u = na(o);
      u.tag = 1, u.payload = n, i != null && (u.callback = i), n = aa(t, u, o), n !== null && (Be(n, t, o), Ml(n, t, o));
    },
    enqueueForceUpdate: function(t, n) {
      t = t._reactInternals;
      var i = Pe(), o = na(i);
      o.tag = 2, n != null && (o.callback = n), n = aa(t, o, i), n !== null && (Be(n, t, i), Ml(n, t, i));
    }
  };
  function Pp(t, n, i, o, u, d, x) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(o, d, x) : n.prototype && n.prototype.isPureReactComponent ? !xl(i, o) || !xl(u, d) : !0;
  }
  function Kp(t, n, i, o) {
    t = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(i, o), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(i, o), n.state !== t && oc.enqueueReplaceState(n, n.state, null);
  }
  function Ga(t, n) {
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
  function Zp(t) {
    $s(t);
  }
  function Qp(t) {
    console.error(t);
  }
  function Fp(t) {
    $s(t);
  }
  function fo(t, n) {
    try {
      var i = t.onUncaughtError;
      i(n.value, { componentStack: n.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function Jp(t, n, i) {
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
  function rc(t, n, i) {
    return i = na(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      fo(t, n);
    }, i;
  }
  function Wp(t) {
    return t = na(t), t.tag = 3, t;
  }
  function Ip(t, n, i, o) {
    var u = i.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var d = o.value;
      t.payload = function() {
        return u(d);
      }, t.callback = function() {
        Jp(n, i, o);
      };
    }
    var x = i.stateNode;
    x !== null && typeof x.componentDidCatch == "function" && (t.callback = function() {
      Jp(n, i, o), typeof u != "function" && (ua === null ? ua = /* @__PURE__ */ new Set([this]) : ua.add(this));
      var C = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: C !== null ? C : ""
      });
    });
  }
  function z3(t, n, i, o, u) {
    if (i.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (n = i.alternate, n !== null && Si(
        n,
        i,
        u,
        !0
      ), i = $e.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return nn === null ? Co() : i.alternate === null && Wt === 0 && (Wt = 3), i.flags &= -257, i.flags |= 65536, i.lanes = u, o === Ws ? i.flags |= 16384 : (n = i.updateQueue, n === null ? i.updateQueue = /* @__PURE__ */ new Set([o]) : n.add(o), Oc(t, o, u)), !1;
          case 22:
            return i.flags |= 65536, o === Ws ? i.flags |= 16384 : (n = i.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, i.updateQueue = n) : (i = n.retryQueue, i === null ? n.retryQueue = /* @__PURE__ */ new Set([o]) : i.add(o)), Oc(t, o, u)), !1;
        }
        throw Error(s(435, i.tag));
      }
      return Oc(t, o, u), Co(), !1;
    }
    if (jt)
      return n = $e.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = u, o !== ju && (t = Error(s(422), { cause: o }), Tl(We(t, i)))) : (o !== ju && (n = Error(s(423), {
        cause: o
      }), Tl(
        We(n, i)
      )), t = t.current.alternate, t.flags |= 65536, u &= -u, t.lanes |= u, o = We(o, i), u = rc(
        t.stateNode,
        o,
        u
      ), Uu(t, u), Wt !== 4 && (Wt = 2)), !1;
    var d = Error(s(520), { cause: o });
    if (d = We(d, i), $l === null ? $l = [d] : $l.push(d), Wt !== 4 && (Wt = 2), n === null) return !0;
    o = We(o, i), i = n;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, t = u & -u, i.lanes |= t, t = rc(i.stateNode, o, t), Uu(i, t), !1;
        case 1:
          if (n = i.type, d = i.stateNode, (i.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (ua === null || !ua.has(d))))
            return i.flags |= 65536, u &= -u, i.lanes |= u, u = Wp(u), Ip(
              u,
              t,
              i,
              o
            ), Uu(i, u), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var uc = Error(s(461)), re = !1;
  function xe(t, n, i, o) {
    n.child = t === null ? ap(n, null, i, o) : qa(
      n,
      t.child,
      i,
      o
    );
  }
  function t1(t, n, i, o, u) {
    i = i.render;
    var d = n.ref;
    if ("ref" in o) {
      var x = {};
      for (var C in o)
        C !== "ref" && (x[C] = o[C]);
    } else x = o;
    return Va(n), o = Yu(
      t,
      n,
      i,
      x,
      d,
      u
    ), C = Xu(), t !== null && !re ? (Pu(t, n, u), Vn(t, n, u)) : (jt && C && Eu(n), n.flags |= 1, xe(t, n, o, u), n.child);
  }
  function e1(t, n, i, o, u) {
    if (t === null) {
      var d = i.type;
      return typeof d == "function" && !wu(d) && d.defaultProps === void 0 && i.compare === null ? (n.tag = 15, n.type = d, n1(
        t,
        n,
        d,
        o,
        u
      )) : (t = Ps(
        i.type,
        null,
        o,
        n,
        n.mode,
        u
      ), t.ref = n.ref, t.return = n, n.child = t);
    }
    if (d = t.child, !gc(t, u)) {
      var x = d.memoizedProps;
      if (i = i.compare, i = i !== null ? i : xl, i(x, o) && t.ref === n.ref)
        return Vn(t, n, u);
    }
    return n.flags |= 1, t = Dn(d, o), t.ref = n.ref, t.return = n, n.child = t;
  }
  function n1(t, n, i, o, u) {
    if (t !== null) {
      var d = t.memoizedProps;
      if (xl(d, o) && t.ref === n.ref)
        if (re = !1, n.pendingProps = o = d, gc(t, u))
          (t.flags & 131072) !== 0 && (re = !0);
        else
          return n.lanes = t.lanes, Vn(t, n, u);
    }
    return cc(
      t,
      n,
      i,
      o,
      u
    );
  }
  function a1(t, n, i, o) {
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
        return i1(
          t,
          n,
          d,
          i,
          o
        );
      }
      if ((i & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Fs(
          n,
          d !== null ? d.cachePool : null
        ), d !== null ? sp(n, d) : Hu(), op(n);
      else
        return o = n.lanes = 536870912, i1(
          t,
          n,
          d !== null ? d.baseLanes | i : i,
          i,
          o
        );
    } else
      d !== null ? (Fs(n, d.cachePool), sp(n, d), la(), n.memoizedState = null) : (t !== null && Fs(n, null), Hu(), la());
    return xe(t, n, u, i), n.child;
  }
  function Ll(t, n) {
    return t !== null && t.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function i1(t, n, i, o, u) {
    var d = zu();
    return d = d === null ? null : { parent: se._currentValue, pool: d }, n.memoizedState = {
      baseLanes: i,
      cachePool: d
    }, t !== null && Fs(n, null), Hu(), op(n), t !== null && Si(t, n, o, !0), n.childLanes = u, null;
  }
  function ho(t, n) {
    return n = po(
      { mode: n.mode, children: n.children },
      t.mode
    ), n.ref = t.ref, t.child = n, n.return = t, n;
  }
  function l1(t, n, i) {
    return qa(n, t.child, null, i), t = ho(n, n.pendingProps), t.flags |= 2, Ge(n), n.memoizedState = null, t;
  }
  function L3(t, n, i) {
    var o = n.pendingProps, u = (n.flags & 128) !== 0;
    if (n.flags &= -129, t === null) {
      if (jt) {
        if (o.mode === "hidden")
          return t = ho(n, o), n.lanes = 536870912, Ll(null, t);
        if ($u(n), (t = Yt) ? (t = g0(
          t,
          en
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Jn !== null ? { id: xn, overflow: Sn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = $m(t), i.return = n, n.child = i, ve = n, Yt = null)) : t = null, t === null) throw In(n);
        return n.lanes = 536870912, null;
      }
      return ho(n, o);
    }
    var d = t.memoizedState;
    if (d !== null) {
      var x = d.dehydrated;
      if ($u(n), u)
        if (n.flags & 256)
          n.flags &= -257, n = l1(
            t,
            n,
            i
          );
        else if (n.memoizedState !== null)
          n.child = t.child, n.flags |= 128, n = null;
        else throw Error(s(558));
      else if (re || Si(t, n, i, !1), u = (i & t.childLanes) !== 0, re || u) {
        if (o = Ht, o !== null && (x = Qh(o, i), x !== 0 && x !== d.retryLane))
          throw d.retryLane = x, Oa(t, x), Be(o, t, x), uc;
        Co(), n = l1(
          t,
          n,
          i
        );
      } else
        t = d.treeContext, Yt = an(x.nextSibling), ve = n, jt = !0, Wn = null, en = !1, t !== null && Xm(n, t), n = ho(n, o), n.flags |= 4096;
      return n;
    }
    return t = Dn(t.child, {
      mode: o.mode,
      children: o.children
    }), t.ref = n.ref, n.child = t, t.return = n, t;
  }
  function mo(t, n) {
    var i = n.ref;
    if (i === null)
      t !== null && t.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(s(284));
      (t === null || t.ref !== i) && (n.flags |= 4194816);
    }
  }
  function cc(t, n, i, o, u) {
    return Va(n), i = Yu(
      t,
      n,
      i,
      o,
      void 0,
      u
    ), o = Xu(), t !== null && !re ? (Pu(t, n, u), Vn(t, n, u)) : (jt && o && Eu(n), n.flags |= 1, xe(t, n, i, u), n.child);
  }
  function s1(t, n, i, o, u, d) {
    return Va(n), n.updateQueue = null, i = up(
      n,
      o,
      i,
      u
    ), rp(t), o = Xu(), t !== null && !re ? (Pu(t, n, d), Vn(t, n, d)) : (jt && o && Eu(n), n.flags |= 1, xe(t, n, i, d), n.child);
  }
  function o1(t, n, i, o, u) {
    if (Va(n), n.stateNode === null) {
      var d = gi, x = i.contextType;
      typeof x == "object" && x !== null && (d = be(x)), d = new i(o, d), n.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, d.updater = oc, n.stateNode = d, d._reactInternals = n, d = n.stateNode, d.props = o, d.state = n.memoizedState, d.refs = {}, Bu(n), x = i.contextType, d.context = typeof x == "object" && x !== null ? be(x) : gi, d.state = n.memoizedState, x = i.getDerivedStateFromProps, typeof x == "function" && (sc(
        n,
        i,
        x,
        o
      ), d.state = n.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (x = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), x !== d.state && oc.enqueueReplaceState(d, d.state, null), Rl(n, o, d, u), _l(), d.state = n.memoizedState), typeof d.componentDidMount == "function" && (n.flags |= 4194308), o = !0;
    } else if (t === null) {
      d = n.stateNode;
      var C = n.memoizedProps, z = Ga(i, C);
      d.props = z;
      var q = d.context, Z = i.contextType;
      x = gi, typeof Z == "object" && Z !== null && (x = be(Z));
      var W = i.getDerivedStateFromProps;
      Z = typeof W == "function" || typeof d.getSnapshotBeforeUpdate == "function", C = n.pendingProps !== C, Z || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (C || q !== x) && Kp(
        n,
        d,
        o,
        x
      ), ea = !1;
      var G = n.memoizedState;
      d.state = G, Rl(n, o, d, u), _l(), q = n.memoizedState, C || G !== q || ea ? (typeof W == "function" && (sc(
        n,
        i,
        W,
        o
      ), q = n.memoizedState), (z = ea || Pp(
        n,
        i,
        z,
        o,
        G,
        q,
        x
      )) ? (Z || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = o, n.memoizedState = q), d.props = o, d.state = q, d.context = x, o = z) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), o = !1);
    } else {
      d = n.stateNode, Vu(t, n), x = n.memoizedProps, Z = Ga(i, x), d.props = Z, W = n.pendingProps, G = d.context, q = i.contextType, z = gi, typeof q == "object" && q !== null && (z = be(q)), C = i.getDerivedStateFromProps, (q = typeof C == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (x !== W || G !== z) && Kp(
        n,
        d,
        o,
        z
      ), ea = !1, G = n.memoizedState, d.state = G, Rl(n, o, d, u), _l();
      var X = n.memoizedState;
      x !== W || G !== X || ea || t !== null && t.dependencies !== null && Zs(t.dependencies) ? (typeof C == "function" && (sc(
        n,
        i,
        C,
        o
      ), X = n.memoizedState), (Z = ea || Pp(
        n,
        i,
        Z,
        o,
        G,
        X,
        z
      ) || t !== null && t.dependencies !== null && Zs(t.dependencies)) ? (q || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(o, X, z), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(
        o,
        X,
        z
      )), typeof d.componentDidUpdate == "function" && (n.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || x === t.memoizedProps && G === t.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || x === t.memoizedProps && G === t.memoizedState || (n.flags |= 1024), n.memoizedProps = o, n.memoizedState = X), d.props = o, d.state = X, d.context = z, o = Z) : (typeof d.componentDidUpdate != "function" || x === t.memoizedProps && G === t.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || x === t.memoizedProps && G === t.memoizedState || (n.flags |= 1024), o = !1);
    }
    return d = o, mo(t, n), o = (n.flags & 128) !== 0, d || o ? (d = n.stateNode, i = o && typeof i.getDerivedStateFromError != "function" ? null : d.render(), n.flags |= 1, t !== null && o ? (n.child = qa(
      n,
      t.child,
      null,
      u
    ), n.child = qa(
      n,
      null,
      i,
      u
    )) : xe(t, n, i, u), n.memoizedState = d.state, t = n.child) : t = Vn(
      t,
      n,
      u
    ), t;
  }
  function r1(t, n, i, o) {
    return La(), n.flags |= 256, xe(t, n, i, o), n.child;
  }
  var fc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function dc(t) {
    return { baseLanes: t, cachePool: Jm() };
  }
  function hc(t, n, i) {
    return t = t !== null ? t.childLanes & ~i : 0, n && (t |= Xe), t;
  }
  function u1(t, n, i) {
    var o = n.pendingProps, u = !1, d = (n.flags & 128) !== 0, x;
    if ((x = d) || (x = t !== null && t.memoizedState === null ? !1 : (ee.current & 2) !== 0), x && (u = !0, n.flags &= -129), x = (n.flags & 32) !== 0, n.flags &= -33, t === null) {
      if (jt) {
        if (u ? ia(n) : la(), (t = Yt) ? (t = g0(
          t,
          en
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Jn !== null ? { id: xn, overflow: Sn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = $m(t), i.return = n, n.child = i, ve = n, Yt = null)) : t = null, t === null) throw In(n);
        return Qc(t) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var C = o.children;
      return o = o.fallback, u ? (la(), u = n.mode, C = po(
        { mode: "hidden", children: C },
        u
      ), o = za(
        o,
        u,
        i,
        null
      ), C.return = n, o.return = n, C.sibling = o, n.child = C, o = n.child, o.memoizedState = dc(i), o.childLanes = hc(
        t,
        x,
        i
      ), n.memoizedState = fc, Ll(null, o)) : (ia(n), mc(n, C));
    }
    var z = t.memoizedState;
    if (z !== null && (C = z.dehydrated, C !== null)) {
      if (d)
        n.flags & 256 ? (ia(n), n.flags &= -257, n = pc(
          t,
          n,
          i
        )) : n.memoizedState !== null ? (la(), n.child = t.child, n.flags |= 128, n = null) : (la(), C = o.fallback, u = n.mode, o = po(
          { mode: "visible", children: o.children },
          u
        ), C = za(
          C,
          u,
          i,
          null
        ), C.flags |= 2, o.return = n, C.return = n, o.sibling = C, n.child = o, qa(
          n,
          t.child,
          null,
          i
        ), o = n.child, o.memoizedState = dc(i), o.childLanes = hc(
          t,
          x,
          i
        ), n.memoizedState = fc, n = Ll(null, o));
      else if (ia(n), Qc(C)) {
        if (x = C.nextSibling && C.nextSibling.dataset, x) var q = x.dgst;
        x = q, o = Error(s(419)), o.stack = "", o.digest = x, Tl({ value: o, source: null, stack: null }), n = pc(
          t,
          n,
          i
        );
      } else if (re || Si(t, n, i, !1), x = (i & t.childLanes) !== 0, re || x) {
        if (x = Ht, x !== null && (o = Qh(x, i), o !== 0 && o !== z.retryLane))
          throw z.retryLane = o, Oa(t, o), Be(x, t, o), uc;
        Zc(C) || Co(), n = pc(
          t,
          n,
          i
        );
      } else
        Zc(C) ? (n.flags |= 192, n.child = t.child, n = null) : (t = z.treeContext, Yt = an(
          C.nextSibling
        ), ve = n, jt = !0, Wn = null, en = !1, t !== null && Xm(n, t), n = mc(
          n,
          o.children
        ), n.flags |= 4096);
      return n;
    }
    return u ? (la(), C = o.fallback, u = n.mode, z = t.child, q = z.sibling, o = Dn(z, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = z.subtreeFlags & 65011712, q !== null ? C = Dn(
      q,
      C
    ) : (C = za(
      C,
      u,
      i,
      null
    ), C.flags |= 2), C.return = n, o.return = n, o.sibling = C, n.child = o, Ll(null, o), o = n.child, C = t.child.memoizedState, C === null ? C = dc(i) : (u = C.cachePool, u !== null ? (z = se._currentValue, u = u.parent !== z ? { parent: z, pool: z } : u) : u = Jm(), C = {
      baseLanes: C.baseLanes | i,
      cachePool: u
    }), o.memoizedState = C, o.childLanes = hc(
      t,
      x,
      i
    ), n.memoizedState = fc, Ll(t.child, o)) : (ia(n), i = t.child, t = i.sibling, i = Dn(i, {
      mode: "visible",
      children: o.children
    }), i.return = n, i.sibling = null, t !== null && (x = n.deletions, x === null ? (n.deletions = [t], n.flags |= 16) : x.push(t)), n.child = i, n.memoizedState = null, i);
  }
  function mc(t, n) {
    return n = po(
      { mode: "visible", children: n },
      t.mode
    ), n.return = t, t.child = n;
  }
  function po(t, n) {
    return t = qe(22, t, null, n), t.lanes = 0, t;
  }
  function pc(t, n, i) {
    return qa(n, t.child, null, i), t = mc(
      n,
      n.pendingProps.children
    ), t.flags |= 2, n.memoizedState = null, t;
  }
  function c1(t, n, i) {
    t.lanes |= n;
    var o = t.alternate;
    o !== null && (o.lanes |= n), Ru(t.return, n, i);
  }
  function yc(t, n, i, o, u, d) {
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
  function f1(t, n, i) {
    var o = n.pendingProps, u = o.revealOrder, d = o.tail;
    o = o.children;
    var x = ee.current, C = (x & 2) !== 0;
    if (C ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, tt(ee, x), xe(t, n, o, i), o = jt ? wl : 0, !C && t !== null && (t.flags & 128) !== 0)
      t: for (t = n.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && c1(t, i, n);
        else if (t.tag === 19)
          c1(t, i, n);
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
          t = i.alternate, t !== null && no(t) === null && (u = i), i = i.sibling;
        i = u, i === null ? (u = n.child, n.child = null) : (u = i.sibling, i.sibling = null), yc(
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
          if (t = u.alternate, t !== null && no(t) === null) {
            n.child = u;
            break;
          }
          t = u.sibling, u.sibling = i, i = u, u = t;
        }
        yc(
          n,
          !0,
          i,
          null,
          d,
          o
        );
        break;
      case "together":
        yc(
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
  function Vn(t, n, i) {
    if (t !== null && (n.dependencies = t.dependencies), ra |= n.lanes, (i & n.childLanes) === 0)
      if (t !== null) {
        if (Si(
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
      for (t = n.child, i = Dn(t, t.pendingProps), n.child = i, i.return = n; t.sibling !== null; )
        t = t.sibling, i = i.sibling = Dn(t, t.pendingProps), i.return = n;
      i.sibling = null;
    }
    return n.child;
  }
  function gc(t, n) {
    return (t.lanes & n) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Zs(t)));
  }
  function B3(t, n, i) {
    switch (n.tag) {
      case 3:
        Dt(n, n.stateNode.containerInfo), ta(n, se, t.memoizedState.cache), La();
        break;
      case 27:
      case 5:
        Pt(n);
        break;
      case 4:
        Dt(n, n.stateNode.containerInfo);
        break;
      case 10:
        ta(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, $u(n), null;
        break;
      case 13:
        var o = n.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (ia(n), n.flags |= 128, null) : (i & n.child.childLanes) !== 0 ? u1(t, n, i) : (ia(n), t = Vn(
            t,
            n,
            i
          ), t !== null ? t.sibling : null);
        ia(n);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (o = (i & n.childLanes) !== 0, o || (Si(
          t,
          n,
          i,
          !1
        ), o = (i & n.childLanes) !== 0), u) {
          if (o)
            return f1(
              t,
              n,
              i
            );
          n.flags |= 128;
        }
        if (u = n.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), tt(ee, ee.current), o) break;
        return null;
      case 22:
        return n.lanes = 0, a1(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        ta(n, se, t.memoizedState.cache);
    }
    return Vn(t, n, i);
  }
  function d1(t, n, i) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps)
        re = !0;
      else {
        if (!gc(t, i) && (n.flags & 128) === 0)
          return re = !1, B3(
            t,
            n,
            i
          );
        re = (t.flags & 131072) !== 0;
      }
    else
      re = !1, jt && (n.flags & 1048576) !== 0 && Ym(n, wl, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        t: {
          var o = n.pendingProps;
          if (t = ka(n.elementType), n.type = t, typeof t == "function")
            wu(t) ? (o = Ga(t, o), n.tag = 1, n = o1(
              null,
              n,
              t,
              o,
              i
            )) : (n.tag = 0, n = cc(
              null,
              n,
              t,
              o,
              i
            ));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === M) {
                n.tag = 11, n = t1(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break t;
              } else if (u === R) {
                n.tag = 14, n = e1(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break t;
              }
            }
            throw n = Q(t) || t, Error(s(306, n, ""));
          }
        }
        return n;
      case 0:
        return cc(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 1:
        return o = n.type, u = Ga(
          o,
          n.pendingProps
        ), o1(
          t,
          n,
          o,
          u,
          i
        );
      case 3:
        t: {
          if (Dt(
            n,
            n.stateNode.containerInfo
          ), t === null) throw Error(s(387));
          o = n.pendingProps;
          var d = n.memoizedState;
          u = d.element, Vu(t, n), Rl(n, o, null, i);
          var x = n.memoizedState;
          if (o = x.cache, ta(n, se, o), o !== d.cache && Du(
            n,
            [se],
            i,
            !0
          ), _l(), o = x.element, d.isDehydrated)
            if (d = {
              element: o,
              isDehydrated: !1,
              cache: x.cache
            }, n.updateQueue.baseState = d, n.memoizedState = d, n.flags & 256) {
              n = r1(
                t,
                n,
                o,
                i
              );
              break t;
            } else if (o !== u) {
              u = We(
                Error(s(424)),
                n
              ), Tl(u), n = r1(
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
              for (Yt = an(t.firstChild), ve = n, jt = !0, Wn = null, en = !0, i = ap(
                n,
                null,
                o,
                i
              ), n.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (La(), o === u) {
              n = Vn(
                t,
                n,
                i
              );
              break t;
            }
            xe(t, n, o, i);
          }
          n = n.child;
        }
        return n;
      case 26:
        return mo(t, n), t === null ? (i = T0(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = i : jt || (i = n.type, t = n.pendingProps, o = Do(
          ht.current
        ).createElement(i), o[ge] = n, o[Re] = t, Se(o, i, t), pe(o), n.stateNode = o) : n.memoizedState = T0(
          n.type,
          t.memoizedProps,
          n.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Pt(n), t === null && jt && (o = n.stateNode = x0(
          n.type,
          n.pendingProps,
          ht.current
        ), ve = n, en = !0, u = Yt, ha(n.type) ? (Fc = u, Yt = an(o.firstChild)) : Yt = u), xe(
          t,
          n,
          n.pendingProps.children,
          i
        ), mo(t, n), t === null && (n.flags |= 4194304), n.child;
      case 5:
        return t === null && jt && ((u = o = Yt) && (o = dS(
          o,
          n.type,
          n.pendingProps,
          en
        ), o !== null ? (n.stateNode = o, ve = n, Yt = an(o.firstChild), en = !1, u = !0) : u = !1), u || In(n)), Pt(n), u = n.type, d = n.pendingProps, x = t !== null ? t.memoizedProps : null, o = d.children, Xc(u, d) ? o = null : x !== null && Xc(u, x) && (n.flags |= 32), n.memoizedState !== null && (u = Yu(
          t,
          n,
          j3,
          null,
          null,
          i
        ), Fl._currentValue = u), mo(t, n), xe(t, n, o, i), n.child;
      case 6:
        return t === null && jt && ((t = i = Yt) && (i = hS(
          i,
          n.pendingProps,
          en
        ), i !== null ? (n.stateNode = i, ve = n, Yt = null, t = !0) : t = !1), t || In(n)), null;
      case 13:
        return u1(t, n, i);
      case 4:
        return Dt(
          n,
          n.stateNode.containerInfo
        ), o = n.pendingProps, t === null ? n.child = qa(
          n,
          null,
          o,
          i
        ) : xe(t, n, o, i), n.child;
      case 11:
        return t1(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 7:
        return xe(
          t,
          n,
          n.pendingProps,
          i
        ), n.child;
      case 8:
        return xe(
          t,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 12:
        return xe(
          t,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 10:
        return o = n.pendingProps, ta(n, n.type, o.value), xe(t, n, o.children, i), n.child;
      case 9:
        return u = n.type._context, o = n.pendingProps.children, Va(n), u = be(u), o = o(u), n.flags |= 1, xe(t, n, o, i), n.child;
      case 14:
        return e1(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 15:
        return n1(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 19:
        return f1(t, n, i);
      case 31:
        return L3(t, n, i);
      case 22:
        return a1(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        return Va(n), o = be(se), t === null ? (u = zu(), u === null && (u = Ht, d = Nu(), u.pooledCache = d, d.refCount++, d !== null && (u.pooledCacheLanes |= i), u = d), n.memoizedState = { parent: o, cache: u }, Bu(n), ta(n, se, u)) : ((t.lanes & i) !== 0 && (Vu(t, n), Rl(n, null, null, i), _l()), u = t.memoizedState, d = n.memoizedState, u.parent !== o ? (u = { parent: o, cache: o }, n.memoizedState = u, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = u), ta(n, se, o)) : (o = d.cache, ta(n, se, o), o !== u.cache && Du(
          n,
          [se],
          i,
          !0
        ))), xe(
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
  function Un(t) {
    t.flags |= 4;
  }
  function vc(t, n, i, o, u) {
    if ((n = (t.mode & 32) !== 0) && (n = !1), n) {
      if (t.flags |= 16777216, (u & 335544128) === u)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (k1()) t.flags |= 8192;
        else
          throw Ha = Ws, Lu;
    } else t.flags &= -16777217;
  }
  function h1(t, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !M0(n))
      if (k1()) t.flags |= 8192;
      else
        throw Ha = Ws, Lu;
  }
  function yo(t, n) {
    n !== null && (t.flags |= 4), t.flags & 16384 && (n = t.tag !== 22 ? Ph() : 536870912, t.lanes |= n, Oi |= n);
  }
  function Bl(t, n) {
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
  function V3(t, n, i) {
    var o = n.pendingProps;
    switch (Au(n), n.tag) {
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
        return i = n.stateNode, o = null, t !== null && (o = t.memoizedState.cache), n.memoizedState.cache !== o && (n.flags |= 2048), zn(se), Mt(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (t === null || t.child === null) && (xi(n) ? Un(n) : t === null || t.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Mu())), Xt(n), null;
      case 26:
        var u = n.type, d = n.memoizedState;
        return t === null ? (Un(n), d !== null ? (Xt(n), h1(n, d)) : (Xt(n), vc(
          n,
          u,
          null,
          o,
          i
        ))) : d ? d !== t.memoizedState ? (Un(n), Xt(n), h1(n, d)) : (Xt(n), n.flags &= -16777217) : (t = t.memoizedProps, t !== o && Un(n), Xt(n), vc(
          n,
          u,
          t,
          o,
          i
        )), null;
      case 27:
        if (Kt(n), i = ht.current, u = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && Un(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(s(166));
            return Xt(n), null;
          }
          t = st.current, xi(n) ? Pm(n) : (t = x0(u, o, i), n.stateNode = t, Un(n));
        }
        return Xt(n), null;
      case 5:
        if (Kt(n), u = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && Un(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(s(166));
            return Xt(n), null;
          }
          if (d = st.current, xi(n))
            Pm(n);
          else {
            var x = Do(
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
            d[ge] = n, d[Re] = o;
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
            t: switch (Se(d, u, o), u) {
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
            o && Un(n);
          }
        }
        return Xt(n), vc(
          n,
          n.type,
          t === null ? null : t.memoizedProps,
          n.pendingProps,
          i
        ), null;
      case 6:
        if (t && n.stateNode != null)
          t.memoizedProps !== o && Un(n);
        else {
          if (typeof o != "string" && n.stateNode === null)
            throw Error(s(166));
          if (t = ht.current, xi(n)) {
            if (t = n.stateNode, i = n.memoizedProps, o = null, u = ve, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  o = u.memoizedProps;
              }
            t[ge] = n, t = !!(t.nodeValue === i || o !== null && o.suppressHydrationWarning === !0 || u0(t.nodeValue, i)), t || In(n, !0);
          } else
            t = Do(t).createTextNode(
              o
            ), t[ge] = n, n.stateNode = t;
        }
        return Xt(n), null;
      case 31:
        if (i = n.memoizedState, t === null || t.memoizedState !== null) {
          if (o = xi(n), i !== null) {
            if (t === null) {
              if (!o) throw Error(s(318));
              if (t = n.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[ge] = n;
            } else
              La(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Xt(n), t = !1;
          } else
            i = Mu(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = i), t = !0;
          if (!t)
            return n.flags & 256 ? (Ge(n), n) : (Ge(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(s(558));
        }
        return Xt(n), null;
      case 13:
        if (o = n.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (u = xi(n), o !== null && o.dehydrated !== null) {
            if (t === null) {
              if (!u) throw Error(s(318));
              if (u = n.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[ge] = n;
            } else
              La(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Xt(n), u = !1;
          } else
            u = Mu(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return n.flags & 256 ? (Ge(n), n) : (Ge(n), null);
        }
        return Ge(n), (n.flags & 128) !== 0 ? (n.lanes = i, n) : (i = o !== null, t = t !== null && t.memoizedState !== null, i && (o = n.child, u = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (u = o.alternate.memoizedState.cachePool.pool), d = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (d = o.memoizedState.cachePool.pool), d !== u && (o.flags |= 2048)), i !== t && i && (n.child.flags |= 8192), yo(n, n.updateQueue), Xt(n), null);
      case 4:
        return Mt(), t === null && Hc(n.stateNode.containerInfo), Xt(n), null;
      case 10:
        return zn(n.type), Xt(n), null;
      case 19:
        if ($(ee), o = n.memoizedState, o === null) return Xt(n), null;
        if (u = (n.flags & 128) !== 0, d = o.rendering, d === null)
          if (u) Bl(o, !1);
          else {
            if (Wt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = n.child; t !== null; ) {
                if (d = no(t), d !== null) {
                  for (n.flags |= 128, Bl(o, !1), t = d.updateQueue, n.updateQueue = t, yo(n, t), n.subtreeFlags = 0, t = i, i = n.child; i !== null; )
                    qm(i, t), i = i.sibling;
                  return tt(
                    ee,
                    ee.current & 1 | 2
                  ), jt && Nn(n, o.treeForkCount), n.child;
                }
                t = t.sibling;
              }
            o.tail !== null && Ve() > So && (n.flags |= 128, u = !0, Bl(o, !1), n.lanes = 4194304);
          }
        else {
          if (!u)
            if (t = no(d), t !== null) {
              if (n.flags |= 128, u = !0, t = t.updateQueue, n.updateQueue = t, yo(n, t), Bl(o, !0), o.tail === null && o.tailMode === "hidden" && !d.alternate && !jt)
                return Xt(n), null;
            } else
              2 * Ve() - o.renderingStartTime > So && i !== 536870912 && (n.flags |= 128, u = !0, Bl(o, !1), n.lanes = 4194304);
          o.isBackwards ? (d.sibling = n.child, n.child = d) : (t = o.last, t !== null ? t.sibling = d : n.child = d, o.last = d);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Ve(), t.sibling = null, i = ee.current, tt(
          ee,
          u ? i & 1 | 2 : i & 1
        ), jt && Nn(n, o.treeForkCount), t) : (Xt(n), null);
      case 22:
      case 23:
        return Ge(n), qu(), o = n.memoizedState !== null, t !== null ? t.memoizedState !== null !== o && (n.flags |= 8192) : o && (n.flags |= 8192), o ? (i & 536870912) !== 0 && (n.flags & 128) === 0 && (Xt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Xt(n), i = n.updateQueue, i !== null && yo(n, i.retryQueue), i = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), o = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== i && (n.flags |= 2048), t !== null && $(Ua), null;
      case 24:
        return i = null, t !== null && (i = t.memoizedState.cache), n.memoizedState.cache !== i && (n.flags |= 2048), zn(se), Xt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, n.tag));
  }
  function U3(t, n) {
    switch (Au(n), n.tag) {
      case 1:
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 3:
        return zn(se), Mt(), t = n.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (n.flags = t & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Kt(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (Ge(n), n.alternate === null)
            throw Error(s(340));
          La();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 13:
        if (Ge(n), t = n.memoizedState, t !== null && t.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(s(340));
          La();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 19:
        return $(ee), null;
      case 4:
        return Mt(), null;
      case 10:
        return zn(n.type), null;
      case 22:
      case 23:
        return Ge(n), qu(), t !== null && $(Ua), t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 24:
        return zn(se), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function m1(t, n) {
    switch (Au(n), n.tag) {
      case 3:
        zn(se), Mt();
        break;
      case 26:
      case 27:
      case 5:
        Kt(n);
        break;
      case 4:
        Mt();
        break;
      case 31:
        n.memoizedState !== null && Ge(n);
        break;
      case 13:
        Ge(n);
        break;
      case 19:
        $(ee);
        break;
      case 10:
        zn(n.type);
        break;
      case 22:
      case 23:
        Ge(n), qu(), t !== null && $(Ua);
        break;
      case 24:
        zn(se);
    }
  }
  function Vl(t, n) {
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
  function sa(t, n, i) {
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
                Lt(
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
      Lt(n, n.return, Z);
    }
  }
  function p1(t) {
    var n = t.updateQueue;
    if (n !== null) {
      var i = t.stateNode;
      try {
        lp(n, i);
      } catch (o) {
        Lt(t, t.return, o);
      }
    }
  }
  function y1(t, n, i) {
    i.props = Ga(
      t.type,
      t.memoizedProps
    ), i.state = t.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (o) {
      Lt(t, n, o);
    }
  }
  function Ul(t, n) {
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
  function wn(t, n) {
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
  function g1(t) {
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
  function bc(t, n, i) {
    try {
      var o = t.stateNode;
      sS(o, t.type, i, n), o[Re] = n;
    } catch (u) {
      Lt(t, t.return, u);
    }
  }
  function v1(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && ha(t.type) || t.tag === 4;
  }
  function xc(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || v1(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && ha(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Sc(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(t, n) : (n = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, n.appendChild(t), i = i._reactRootContainer, i != null || n.onclick !== null || (n.onclick = _n));
    else if (o !== 4 && (o === 27 && ha(t.type) && (i = t.stateNode, n = null), t = t.child, t !== null))
      for (Sc(t, n, i), t = t.sibling; t !== null; )
        Sc(t, n, i), t = t.sibling;
  }
  function go(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? i.insertBefore(t, n) : i.appendChild(t);
    else if (o !== 4 && (o === 27 && ha(t.type) && (i = t.stateNode), t = t.child, t !== null))
      for (go(t, n, i), t = t.sibling; t !== null; )
        go(t, n, i), t = t.sibling;
  }
  function b1(t) {
    var n = t.stateNode, i = t.memoizedProps;
    try {
      for (var o = t.type, u = n.attributes; u.length; )
        n.removeAttributeNode(u[0]);
      Se(n, o, i), n[ge] = t, n[Re] = i;
    } catch (d) {
      Lt(t, t.return, d);
    }
  }
  var kn = !1, ue = !1, wc = !1, x1 = typeof WeakSet == "function" ? WeakSet : Set, ye = null;
  function k3(t, n) {
    if (t = t.containerInfo, Gc = Uo, t = Nm(t), pu(t)) {
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
            var x = 0, C = -1, z = -1, q = 0, Z = 0, W = t, G = null;
            e: for (; ; ) {
              for (var X; W !== i || u !== 0 && W.nodeType !== 3 || (C = x + u), W !== d || o !== 0 && W.nodeType !== 3 || (z = x + o), W.nodeType === 3 && (x += W.nodeValue.length), (X = W.firstChild) !== null; )
                G = W, W = X;
              for (; ; ) {
                if (W === t) break e;
                if (G === i && ++q === u && (C = x), G === d && ++Z === o && (z = x), (X = W.nextSibling) !== null) break;
                W = G, G = W.parentNode;
              }
              W = X;
            }
            i = C === -1 || z === -1 ? null : { start: C, end: z };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Yc = { focusedElem: t, selectionRange: i }, Uo = !1, ye = n; ye !== null; )
      if (n = ye, t = n.child, (n.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = n, ye = t;
      else
        for (; ye !== null; ) {
          switch (n = ye, d = n.alternate, t = n.flags, n.tag) {
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
                  var ut = Ga(
                    i.type,
                    u
                  );
                  t = o.getSnapshotBeforeUpdate(
                    ut,
                    d
                  ), o.__reactInternalSnapshotBeforeUpdate = t;
                } catch (gt) {
                  Lt(
                    i,
                    i.return,
                    gt
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = n.stateNode.containerInfo, i = t.nodeType, i === 9)
                  Kc(t);
                else if (i === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Kc(t);
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
            t.return = n.return, ye = t;
            break;
          }
          ye = n.return;
        }
  }
  function S1(t, n, i) {
    var o = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        qn(t, i), o & 4 && Vl(5, i);
        break;
      case 1:
        if (qn(t, i), o & 4)
          if (t = i.stateNode, n === null)
            try {
              t.componentDidMount();
            } catch (x) {
              Lt(i, i.return, x);
            }
          else {
            var u = Ga(
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
        o & 64 && p1(i), o & 512 && Ul(i, i.return);
        break;
      case 3:
        if (qn(t, i), o & 64 && (t = i.updateQueue, t !== null)) {
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
            lp(t, n);
          } catch (x) {
            Lt(i, i.return, x);
          }
        }
        break;
      case 27:
        n === null && o & 4 && b1(i);
      case 26:
      case 5:
        qn(t, i), n === null && o & 4 && g1(i), o & 512 && Ul(i, i.return);
        break;
      case 12:
        qn(t, i);
        break;
      case 31:
        qn(t, i), o & 4 && C1(t, i);
        break;
      case 13:
        qn(t, i), o & 4 && E1(t, i), o & 64 && (t = i.memoizedState, t !== null && (t = t.dehydrated, t !== null && (i = Z3.bind(
          null,
          i
        ), mS(t, i))));
        break;
      case 22:
        if (o = i.memoizedState !== null || kn, !o) {
          n = n !== null && n.memoizedState !== null || ue, u = kn;
          var d = ue;
          kn = o, (ue = n) && !d ? $n(
            t,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : qn(t, i), kn = u, ue = d;
        }
        break;
      case 30:
        break;
      default:
        qn(t, i);
    }
  }
  function w1(t) {
    var n = t.alternate;
    n !== null && (t.alternate = null, w1(n)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (n = t.stateNode, n !== null && Wr(n)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Zt = null, Ne = !1;
  function Hn(t, n, i) {
    for (i = i.child; i !== null; )
      T1(t, n, i), i = i.sibling;
  }
  function T1(t, n, i) {
    if (Ue && typeof Ue.onCommitFiberUnmount == "function")
      try {
        Ue.onCommitFiberUnmount(rl, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        ue || wn(i, n), Hn(
          t,
          n,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        ue || wn(i, n);
        var o = Zt, u = Ne;
        ha(i.type) && (Zt = i.stateNode, Ne = !1), Hn(
          t,
          n,
          i
        ), Kl(i.stateNode), Zt = o, Ne = u;
        break;
      case 5:
        ue || wn(i, n);
      case 6:
        if (o = Zt, u = Ne, Zt = null, Hn(
          t,
          n,
          i
        ), Zt = o, Ne = u, Zt !== null)
          if (Ne)
            try {
              (Zt.nodeType === 9 ? Zt.body : Zt.nodeName === "HTML" ? Zt.ownerDocument.body : Zt).removeChild(i.stateNode);
            } catch (d) {
              Lt(
                i,
                n,
                d
              );
            }
          else
            try {
              Zt.removeChild(i.stateNode);
            } catch (d) {
              Lt(
                i,
                n,
                d
              );
            }
        break;
      case 18:
        Zt !== null && (Ne ? (t = Zt, p0(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          i.stateNode
        ), qi(t)) : p0(Zt, i.stateNode));
        break;
      case 4:
        o = Zt, u = Ne, Zt = i.stateNode.containerInfo, Ne = !0, Hn(
          t,
          n,
          i
        ), Zt = o, Ne = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        sa(2, i, n), ue || sa(4, i, n), Hn(
          t,
          n,
          i
        );
        break;
      case 1:
        ue || (wn(i, n), o = i.stateNode, typeof o.componentWillUnmount == "function" && y1(
          i,
          n,
          o
        )), Hn(
          t,
          n,
          i
        );
        break;
      case 21:
        Hn(
          t,
          n,
          i
        );
        break;
      case 22:
        ue = (o = ue) || i.memoizedState !== null, Hn(
          t,
          n,
          i
        ), ue = o;
        break;
      default:
        Hn(
          t,
          n,
          i
        );
    }
  }
  function C1(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        qi(t);
      } catch (i) {
        Lt(n, n.return, i);
      }
    }
  }
  function E1(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        qi(t);
      } catch (i) {
        Lt(n, n.return, i);
      }
  }
  function H3(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var n = t.stateNode;
        return n === null && (n = t.stateNode = new x1()), n;
      case 22:
        return t = t.stateNode, n = t._retryCache, n === null && (n = t._retryCache = new x1()), n;
      default:
        throw Error(s(435, t.tag));
    }
  }
  function vo(t, n) {
    var i = H3(t);
    n.forEach(function(o) {
      if (!i.has(o)) {
        i.add(o);
        var u = Q3.bind(null, t, o);
        o.then(u, u);
      }
    });
  }
  function Oe(t, n) {
    var i = n.deletions;
    if (i !== null)
      for (var o = 0; o < i.length; o++) {
        var u = i[o], d = t, x = n, C = x;
        t: for (; C !== null; ) {
          switch (C.tag) {
            case 27:
              if (ha(C.type)) {
                Zt = C.stateNode, Ne = !1;
                break t;
              }
              break;
            case 5:
              Zt = C.stateNode, Ne = !1;
              break t;
            case 3:
            case 4:
              Zt = C.stateNode.containerInfo, Ne = !0;
              break t;
          }
          C = C.return;
        }
        if (Zt === null) throw Error(s(160));
        T1(d, x, u), Zt = null, Ne = !1, d = u.alternate, d !== null && (d.return = null), u.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        A1(n, t), n = n.sibling;
  }
  var cn = null;
  function A1(t, n) {
    var i = t.alternate, o = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Oe(n, t), ze(t), o & 4 && (sa(3, t, t.return), Vl(3, t), sa(5, t, t.return));
        break;
      case 1:
        Oe(n, t), ze(t), o & 512 && (ue || i === null || wn(i, i.return)), o & 64 && kn && (t = t.updateQueue, t !== null && (o = t.callbacks, o !== null && (i = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = i === null ? o : i.concat(o))));
        break;
      case 26:
        var u = cn;
        if (Oe(n, t), ze(t), o & 512 && (ue || i === null || wn(i, i.return)), o & 4) {
          var d = i !== null ? i.memoizedState : null;
          if (o = t.memoizedState, i === null)
            if (o === null)
              if (t.stateNode === null) {
                t: {
                  o = t.type, i = t.memoizedProps, u = u.ownerDocument || u;
                  e: switch (o) {
                    case "title":
                      d = u.getElementsByTagName("title")[0], (!d || d[fl] || d[ge] || d.namespaceURI === "http://www.w3.org/2000/svg" || d.hasAttribute("itemprop")) && (d = u.createElement(o), u.head.insertBefore(
                        d,
                        u.querySelector("head > title")
                      )), Se(d, o, i), d[ge] = t, pe(d), o = d;
                      break t;
                    case "link":
                      var x = A0(
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
                      d = u.createElement(o), Se(d, o, i), u.head.appendChild(d);
                      break;
                    case "meta":
                      if (x = A0(
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
                      d = u.createElement(o), Se(d, o, i), u.head.appendChild(d);
                      break;
                    default:
                      throw Error(s(468, o));
                  }
                  d[ge] = t, pe(d), o = d;
                }
                t.stateNode = o;
              } else
                j0(
                  u,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = E0(
                u,
                o,
                t.memoizedProps
              );
          else
            d !== o ? (d === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : d.count--, o === null ? j0(
              u,
              t.type,
              t.stateNode
            ) : E0(
              u,
              o,
              t.memoizedProps
            )) : o === null && t.stateNode !== null && bc(
              t,
              t.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        Oe(n, t), ze(t), o & 512 && (ue || i === null || wn(i, i.return)), i !== null && o & 4 && bc(
          t,
          t.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (Oe(n, t), ze(t), o & 512 && (ue || i === null || wn(i, i.return)), t.flags & 32) {
          u = t.stateNode;
          try {
            ci(u, "");
          } catch (ut) {
            Lt(t, t.return, ut);
          }
        }
        o & 4 && t.stateNode != null && (u = t.memoizedProps, bc(
          t,
          u,
          i !== null ? i.memoizedProps : u
        )), o & 1024 && (wc = !0);
        break;
      case 6:
        if (Oe(n, t), ze(t), o & 4) {
          if (t.stateNode === null)
            throw Error(s(162));
          o = t.memoizedProps, i = t.stateNode;
          try {
            i.nodeValue = o;
          } catch (ut) {
            Lt(t, t.return, ut);
          }
        }
        break;
      case 3:
        if (zo = null, u = cn, cn = No(n.containerInfo), Oe(n, t), cn = u, ze(t), o & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            qi(n.containerInfo);
          } catch (ut) {
            Lt(t, t.return, ut);
          }
        wc && (wc = !1, j1(t));
        break;
      case 4:
        o = cn, cn = No(
          t.stateNode.containerInfo
        ), Oe(n, t), ze(t), cn = o;
        break;
      case 12:
        Oe(n, t), ze(t);
        break;
      case 31:
        Oe(n, t), ze(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, vo(t, o)));
        break;
      case 13:
        Oe(n, t), ze(t), t.child.flags & 8192 && t.memoizedState !== null != (i !== null && i.memoizedState !== null) && (xo = Ve()), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, vo(t, o)));
        break;
      case 22:
        u = t.memoizedState !== null;
        var z = i !== null && i.memoizedState !== null, q = kn, Z = ue;
        if (kn = q || u, ue = Z || z, Oe(n, t), ue = Z, kn = q, ze(t), o & 8192)
          t: for (n = t.stateNode, n._visibility = u ? n._visibility & -2 : n._visibility | 1, u && (i === null || z || kn || ue || Ya(t)), i = null, n = t; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (i === null) {
                z = i = n;
                try {
                  if (d = z.stateNode, u)
                    x = d.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
                  else {
                    C = z.stateNode;
                    var W = z.memoizedProps.style, G = W != null && W.hasOwnProperty("display") ? W.display : null;
                    C.style.display = G == null || typeof G == "boolean" ? "" : ("" + G).trim();
                  }
                } catch (ut) {
                  Lt(z, z.return, ut);
                }
              }
            } else if (n.tag === 6) {
              if (i === null) {
                z = n;
                try {
                  z.stateNode.nodeValue = u ? "" : z.memoizedProps;
                } catch (ut) {
                  Lt(z, z.return, ut);
                }
              }
            } else if (n.tag === 18) {
              if (i === null) {
                z = n;
                try {
                  var X = z.stateNode;
                  u ? y0(X, !0) : y0(z.stateNode, !1);
                } catch (ut) {
                  Lt(z, z.return, ut);
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
        o & 4 && (o = t.updateQueue, o !== null && (i = o.retryQueue, i !== null && (o.retryQueue = null, vo(t, i))));
        break;
      case 19:
        Oe(n, t), ze(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, vo(t, o)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Oe(n, t), ze(t);
    }
  }
  function ze(t) {
    var n = t.flags;
    if (n & 2) {
      try {
        for (var i, o = t.return; o !== null; ) {
          if (v1(o)) {
            i = o;
            break;
          }
          o = o.return;
        }
        if (i == null) throw Error(s(160));
        switch (i.tag) {
          case 27:
            var u = i.stateNode, d = xc(t);
            go(t, d, u);
            break;
          case 5:
            var x = i.stateNode;
            i.flags & 32 && (ci(x, ""), i.flags &= -33);
            var C = xc(t);
            go(t, C, x);
            break;
          case 3:
          case 4:
            var z = i.stateNode.containerInfo, q = xc(t);
            Sc(
              t,
              q,
              z
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
  function j1(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var n = t;
        j1(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), t = t.sibling;
      }
  }
  function qn(t, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        S1(t, n.alternate, n), n = n.sibling;
  }
  function Ya(t) {
    for (t = t.child; t !== null; ) {
      var n = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          sa(4, n, n.return), Ya(n);
          break;
        case 1:
          wn(n, n.return);
          var i = n.stateNode;
          typeof i.componentWillUnmount == "function" && y1(
            n,
            n.return,
            i
          ), Ya(n);
          break;
        case 27:
          Kl(n.stateNode);
        case 26:
        case 5:
          wn(n, n.return), Ya(n);
          break;
        case 22:
          n.memoizedState === null && Ya(n);
          break;
        case 30:
          Ya(n);
          break;
        default:
          Ya(n);
      }
      t = t.sibling;
    }
  }
  function $n(t, n, i) {
    for (i = i && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var o = n.alternate, u = t, d = n, x = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          $n(
            u,
            d,
            i
          ), Vl(4, d);
          break;
        case 1:
          if ($n(
            u,
            d,
            i
          ), o = d, u = o.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (q) {
              Lt(o, o.return, q);
            }
          if (o = d, u = o.updateQueue, u !== null) {
            var C = o.stateNode;
            try {
              var z = u.shared.hiddenCallbacks;
              if (z !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < z.length; u++)
                  ip(z[u], C);
            } catch (q) {
              Lt(o, o.return, q);
            }
          }
          i && x & 64 && p1(d), Ul(d, d.return);
          break;
        case 27:
          b1(d);
        case 26:
        case 5:
          $n(
            u,
            d,
            i
          ), i && o === null && x & 4 && g1(d), Ul(d, d.return);
          break;
        case 12:
          $n(
            u,
            d,
            i
          );
          break;
        case 31:
          $n(
            u,
            d,
            i
          ), i && x & 4 && C1(u, d);
          break;
        case 13:
          $n(
            u,
            d,
            i
          ), i && x & 4 && E1(u, d);
          break;
        case 22:
          d.memoizedState === null && $n(
            u,
            d,
            i
          ), Ul(d, d.return);
          break;
        case 30:
          break;
        default:
          $n(
            u,
            d,
            i
          );
      }
      n = n.sibling;
    }
  }
  function Tc(t, n) {
    var i = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), t = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (t = n.memoizedState.cachePool.pool), t !== i && (t != null && t.refCount++, i != null && Cl(i));
  }
  function Cc(t, n) {
    t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Cl(t));
  }
  function fn(t, n, i, o) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        M1(
          t,
          n,
          i,
          o
        ), n = n.sibling;
  }
  function M1(t, n, i, o) {
    var u = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        fn(
          t,
          n,
          i,
          o
        ), u & 2048 && Vl(9, n);
        break;
      case 1:
        fn(
          t,
          n,
          i,
          o
        );
        break;
      case 3:
        fn(
          t,
          n,
          i,
          o
        ), u & 2048 && (t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Cl(t)));
        break;
      case 12:
        if (u & 2048) {
          fn(
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
            Lt(n, n.return, z);
          }
        } else
          fn(
            t,
            n,
            i,
            o
          );
        break;
      case 31:
        fn(
          t,
          n,
          i,
          o
        );
        break;
      case 13:
        fn(
          t,
          n,
          i,
          o
        );
        break;
      case 23:
        break;
      case 22:
        d = n.stateNode, x = n.alternate, n.memoizedState !== null ? d._visibility & 2 ? fn(
          t,
          n,
          i,
          o
        ) : kl(t, n) : d._visibility & 2 ? fn(
          t,
          n,
          i,
          o
        ) : (d._visibility |= 2, Ri(
          t,
          n,
          i,
          o,
          (n.subtreeFlags & 10256) !== 0 || !1
        )), u & 2048 && Tc(x, n);
        break;
      case 24:
        fn(
          t,
          n,
          i,
          o
        ), u & 2048 && Cc(n.alternate, n);
        break;
      default:
        fn(
          t,
          n,
          i,
          o
        );
    }
  }
  function Ri(t, n, i, o, u) {
    for (u = u && ((n.subtreeFlags & 10256) !== 0 || !1), n = n.child; n !== null; ) {
      var d = t, x = n, C = i, z = o, q = x.flags;
      switch (x.tag) {
        case 0:
        case 11:
        case 15:
          Ri(
            d,
            x,
            C,
            z,
            u
          ), Vl(8, x);
          break;
        case 23:
          break;
        case 22:
          var Z = x.stateNode;
          x.memoizedState !== null ? Z._visibility & 2 ? Ri(
            d,
            x,
            C,
            z,
            u
          ) : kl(
            d,
            x
          ) : (Z._visibility |= 2, Ri(
            d,
            x,
            C,
            z,
            u
          )), u && q & 2048 && Tc(
            x.alternate,
            x
          );
          break;
        case 24:
          Ri(
            d,
            x,
            C,
            z,
            u
          ), u && q & 2048 && Cc(x.alternate, x);
          break;
        default:
          Ri(
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
  function kl(t, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var i = t, o = n, u = o.flags;
        switch (o.tag) {
          case 22:
            kl(i, o), u & 2048 && Tc(
              o.alternate,
              o
            );
            break;
          case 24:
            kl(i, o), u & 2048 && Cc(o.alternate, o);
            break;
          default:
            kl(i, o);
        }
        n = n.sibling;
      }
  }
  var Hl = 8192;
  function Di(t, n, i) {
    if (t.subtreeFlags & Hl)
      for (t = t.child; t !== null; )
        _1(
          t,
          n,
          i
        ), t = t.sibling;
  }
  function _1(t, n, i) {
    switch (t.tag) {
      case 26:
        Di(
          t,
          n,
          i
        ), t.flags & Hl && t.memoizedState !== null && AS(
          i,
          cn,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Di(
          t,
          n,
          i
        );
        break;
      case 3:
      case 4:
        var o = cn;
        cn = No(t.stateNode.containerInfo), Di(
          t,
          n,
          i
        ), cn = o;
        break;
      case 22:
        t.memoizedState === null && (o = t.alternate, o !== null && o.memoizedState !== null ? (o = Hl, Hl = 16777216, Di(
          t,
          n,
          i
        ), Hl = o) : Di(
          t,
          n,
          i
        ));
        break;
      default:
        Di(
          t,
          n,
          i
        );
    }
  }
  function R1(t) {
    var n = t.alternate;
    if (n !== null && (t = n.child, t !== null)) {
      n.child = null;
      do
        n = t.sibling, t.sibling = null, t = n;
      while (t !== null);
    }
  }
  function ql(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          ye = o, N1(
            o,
            t
          );
        }
      R1(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        D1(t), t = t.sibling;
  }
  function D1(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        ql(t), t.flags & 2048 && sa(9, t, t.return);
        break;
      case 3:
        ql(t);
        break;
      case 12:
        ql(t);
        break;
      case 22:
        var n = t.stateNode;
        t.memoizedState !== null && n._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (n._visibility &= -3, bo(t)) : ql(t);
        break;
      default:
        ql(t);
    }
  }
  function bo(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          ye = o, N1(
            o,
            t
          );
        }
      R1(t);
    }
    for (t = t.child; t !== null; ) {
      switch (n = t, n.tag) {
        case 0:
        case 11:
        case 15:
          sa(8, n, n.return), bo(n);
          break;
        case 22:
          i = n.stateNode, i._visibility & 2 && (i._visibility &= -3, bo(n));
          break;
        default:
          bo(n);
      }
      t = t.sibling;
    }
  }
  function N1(t, n) {
    for (; ye !== null; ) {
      var i = ye;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          sa(8, i, n);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var o = i.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          Cl(i.memoizedState.cache);
      }
      if (o = i.child, o !== null) o.return = i, ye = o;
      else
        t: for (i = t; ye !== null; ) {
          o = ye;
          var u = o.sibling, d = o.return;
          if (w1(o), o === i) {
            ye = null;
            break t;
          }
          if (u !== null) {
            u.return = d, ye = u;
            break t;
          }
          ye = d;
        }
    }
  }
  var q3 = {
    getCacheForType: function(t) {
      var n = be(se), i = n.data.get(t);
      return i === void 0 && (i = t(), n.data.set(t, i)), i;
    },
    cacheSignal: function() {
      return be(se).controller.signal;
    }
  }, $3 = typeof WeakMap == "function" ? WeakMap : Map, Nt = 0, Ht = null, Tt = null, Et = 0, zt = 0, Ye = null, oa = !1, Ni = !1, Ec = !1, Gn = 0, Wt = 0, ra = 0, Xa = 0, Ac = 0, Xe = 0, Oi = 0, $l = null, Le = null, jc = !1, xo = 0, O1 = 0, So = 1 / 0, wo = null, ua = null, de = 0, ca = null, zi = null, Yn = 0, Mc = 0, _c = null, z1 = null, Gl = 0, Rc = null;
  function Pe() {
    return (Nt & 2) !== 0 && Et !== 0 ? Et & -Et : N.T !== null ? Bc() : Fh();
  }
  function L1() {
    if (Xe === 0)
      if ((Et & 536870912) === 0 || jt) {
        var t = _s;
        _s <<= 1, (_s & 3932160) === 0 && (_s = 262144), Xe = t;
      } else Xe = 536870912;
    return t = $e.current, t !== null && (t.flags |= 32), Xe;
  }
  function Be(t, n, i) {
    (t === Ht && (zt === 2 || zt === 9) || t.cancelPendingCommit !== null) && (Li(t, 0), fa(
      t,
      Et,
      Xe,
      !1
    )), cl(t, i), ((Nt & 2) === 0 || t !== Ht) && (t === Ht && ((Nt & 2) === 0 && (Xa |= i), Wt === 4 && fa(
      t,
      Et,
      Xe,
      !1
    )), Tn(t));
  }
  function B1(t, n, i) {
    if ((Nt & 6) !== 0) throw Error(s(327));
    var o = !i && (n & 127) === 0 && (n & t.expiredLanes) === 0 || ul(t, n), u = o ? X3(t, n) : Nc(t, n, !0), d = o;
    do {
      if (u === 0) {
        Ni && !o && fa(t, n, 0, !1);
        break;
      } else {
        if (i = t.current.alternate, d && !G3(i)) {
          u = Nc(t, n, !1), d = !1;
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
              u = $l;
              var z = C.current.memoizedState.isDehydrated;
              if (z && (Li(C, x).flags |= 256), x = Nc(
                C,
                x,
                !1
              ), x !== 2) {
                if (Ec && !z) {
                  C.errorRecoveryDisabledLanes |= d, Xa |= d, u = 4;
                  break t;
                }
                d = Le, Le = u, d !== null && (Le === null ? Le = d : Le.push.apply(
                  Le,
                  d
                ));
              }
              u = x;
            }
            if (d = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Li(t, 0), fa(t, n, 0, !0);
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
              fa(
                o,
                n,
                Xe,
                !oa
              );
              break t;
            case 2:
              Le = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(s(329));
          }
          if ((n & 62914560) === n && (u = xo + 300 - Ve(), 10 < u)) {
            if (fa(
              o,
              n,
              Xe,
              !oa
            ), Ds(o, 0, !0) !== 0) break t;
            Yn = n, o.timeoutHandle = h0(
              V1.bind(
                null,
                o,
                i,
                Le,
                wo,
                jc,
                n,
                Xe,
                Xa,
                Oi,
                oa,
                d,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break t;
          }
          V1(
            o,
            i,
            Le,
            wo,
            jc,
            n,
            Xe,
            Xa,
            Oi,
            oa,
            d,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Tn(t);
  }
  function V1(t, n, i, o, u, d, x, C, z, q, Z, W, G, X) {
    if (t.timeoutHandle = -1, W = n.subtreeFlags, W & 8192 || (W & 16785408) === 16785408) {
      W = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: _n
      }, _1(
        n,
        d,
        W
      );
      var ut = (d & 62914560) === d ? xo - Ve() : (d & 4194048) === d ? O1 - Ve() : 0;
      if (ut = jS(
        W,
        ut
      ), ut !== null) {
        Yn = d, t.cancelPendingCommit = ut(
          X1.bind(
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
            G,
            X
          )
        ), fa(t, d, x, !q);
        return;
      }
    }
    X1(
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
  function G3(t) {
    for (var n = t; ; ) {
      var i = n.tag;
      if ((i === 0 || i === 11 || i === 15) && n.flags & 16384 && (i = n.updateQueue, i !== null && (i = i.stores, i !== null)))
        for (var o = 0; o < i.length; o++) {
          var u = i[o], d = u.getSnapshot;
          u = u.value;
          try {
            if (!He(d(), u)) return !1;
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
  function fa(t, n, i, o) {
    n &= ~Ac, n &= ~Xa, t.suspendedLanes |= n, t.pingedLanes &= ~n, o && (t.warmLanes |= n), o = t.expirationTimes;
    for (var u = n; 0 < u; ) {
      var d = 31 - ke(u), x = 1 << d;
      o[d] = -1, u &= ~x;
    }
    i !== 0 && Kh(t, i, n);
  }
  function To() {
    return (Nt & 6) === 0 ? (Yl(0), !1) : !0;
  }
  function Dc() {
    if (Tt !== null) {
      if (zt === 0)
        var t = Tt.return;
      else
        t = Tt, On = Ba = null, Ku(t), Ei = null, Al = 0, t = Tt;
      for (; t !== null; )
        m1(t.alternate, t), t = t.return;
      Tt = null;
    }
  }
  function Li(t, n) {
    var i = t.timeoutHandle;
    i !== -1 && (t.timeoutHandle = -1, uS(i)), i = t.cancelPendingCommit, i !== null && (t.cancelPendingCommit = null, i()), Yn = 0, Dc(), Ht = t, Tt = i = Dn(t.current, null), Et = n, zt = 0, Ye = null, oa = !1, Ni = ul(t, n), Ec = !1, Oi = Xe = Ac = Xa = ra = Wt = 0, Le = $l = null, jc = !1, (n & 8) !== 0 && (n |= n & 32);
    var o = t.entangledLanes;
    if (o !== 0)
      for (t = t.entanglements, o &= n; 0 < o; ) {
        var u = 31 - ke(o), d = 1 << u;
        n |= t[u], o &= ~d;
      }
    return Gn = n, Gs(), i;
  }
  function U1(t, n) {
    xt = null, N.H = zl, n === Ci || n === Js ? (n = tp(), zt = 3) : n === Lu ? (n = tp(), zt = 4) : zt = n === uc ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Ye = n, Tt === null && (Wt = 1, fo(
      t,
      We(n, t.current)
    ));
  }
  function k1() {
    var t = $e.current;
    return t === null ? !0 : (Et & 4194048) === Et ? nn === null : (Et & 62914560) === Et || (Et & 536870912) !== 0 ? t === nn : !1;
  }
  function H1() {
    var t = N.H;
    return N.H = zl, t === null ? zl : t;
  }
  function q1() {
    var t = N.A;
    return N.A = q3, t;
  }
  function Co() {
    Wt = 4, oa || (Et & 4194048) !== Et && $e.current !== null || (Ni = !0), (ra & 134217727) === 0 && (Xa & 134217727) === 0 || Ht === null || fa(
      Ht,
      Et,
      Xe,
      !1
    );
  }
  function Nc(t, n, i) {
    var o = Nt;
    Nt |= 2;
    var u = H1(), d = q1();
    (Ht !== t || Et !== n) && (wo = null, Li(t, n)), n = !1;
    var x = Wt;
    t: do
      try {
        if (zt !== 0 && Tt !== null) {
          var C = Tt, z = Ye;
          switch (zt) {
            case 8:
              Dc(), x = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              $e.current === null && (n = !0);
              var q = zt;
              if (zt = 0, Ye = null, Bi(t, C, z, q), i && Ni) {
                x = 0;
                break t;
              }
              break;
            default:
              q = zt, zt = 0, Ye = null, Bi(t, C, z, q);
          }
        }
        Y3(), x = Wt;
        break;
      } catch (Z) {
        U1(t, Z);
      }
    while (!0);
    return n && t.shellSuspendCounter++, On = Ba = null, Nt = o, N.H = u, N.A = d, Tt === null && (Ht = null, Et = 0, Gs()), x;
  }
  function Y3() {
    for (; Tt !== null; ) $1(Tt);
  }
  function X3(t, n) {
    var i = Nt;
    Nt |= 2;
    var o = H1(), u = q1();
    Ht !== t || Et !== n ? (wo = null, So = Ve() + 500, Li(t, n)) : Ni = ul(
      t,
      n
    );
    t: do
      try {
        if (zt !== 0 && Tt !== null) {
          n = Tt;
          var d = Ye;
          e: switch (zt) {
            case 1:
              zt = 0, Ye = null, Bi(t, n, d, 1);
              break;
            case 2:
            case 9:
              if (Wm(d)) {
                zt = 0, Ye = null, G1(n);
                break;
              }
              n = function() {
                zt !== 2 && zt !== 9 || Ht !== t || (zt = 7), Tn(t);
              }, d.then(n, n);
              break t;
            case 3:
              zt = 7;
              break t;
            case 4:
              zt = 5;
              break t;
            case 7:
              Wm(d) ? (zt = 0, Ye = null, G1(n)) : (zt = 0, Ye = null, Bi(t, n, d, 7));
              break;
            case 5:
              var x = null;
              switch (Tt.tag) {
                case 26:
                  x = Tt.memoizedState;
                case 5:
                case 27:
                  var C = Tt;
                  if (x ? M0(x) : C.stateNode.complete) {
                    zt = 0, Ye = null;
                    var z = C.sibling;
                    if (z !== null) Tt = z;
                    else {
                      var q = C.return;
                      q !== null ? (Tt = q, Eo(q)) : Tt = null;
                    }
                    break e;
                  }
              }
              zt = 0, Ye = null, Bi(t, n, d, 5);
              break;
            case 6:
              zt = 0, Ye = null, Bi(t, n, d, 6);
              break;
            case 8:
              Dc(), Wt = 6;
              break t;
            default:
              throw Error(s(462));
          }
        }
        P3();
        break;
      } catch (Z) {
        U1(t, Z);
      }
    while (!0);
    return On = Ba = null, N.H = o, N.A = u, Nt = i, Tt !== null ? 0 : (Ht = null, Et = 0, Gs(), Wt);
  }
  function P3() {
    for (; Tt !== null && !px(); )
      $1(Tt);
  }
  function $1(t) {
    var n = d1(t.alternate, t, Gn);
    t.memoizedProps = t.pendingProps, n === null ? Eo(t) : Tt = n;
  }
  function G1(t) {
    var n = t, i = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = s1(
          i,
          n,
          n.pendingProps,
          n.type,
          void 0,
          Et
        );
        break;
      case 11:
        n = s1(
          i,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          Et
        );
        break;
      case 5:
        Ku(n);
      default:
        m1(i, n), n = Tt = qm(n, Gn), n = d1(i, n, Gn);
    }
    t.memoizedProps = t.pendingProps, n === null ? Eo(t) : Tt = n;
  }
  function Bi(t, n, i, o) {
    On = Ba = null, Ku(n), Ei = null, Al = 0;
    var u = n.return;
    try {
      if (z3(
        t,
        u,
        n,
        i,
        Et
      )) {
        Wt = 1, fo(
          t,
          We(i, t.current)
        ), Tt = null;
        return;
      }
    } catch (d) {
      if (u !== null) throw Tt = u, d;
      Wt = 1, fo(
        t,
        We(i, t.current)
      ), Tt = null;
      return;
    }
    n.flags & 32768 ? (jt || o === 1 ? t = !0 : Ni || (Et & 536870912) !== 0 ? t = !1 : (oa = t = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = $e.current, o !== null && o.tag === 13 && (o.flags |= 16384))), Y1(n, t)) : Eo(n);
  }
  function Eo(t) {
    var n = t;
    do {
      if ((n.flags & 32768) !== 0) {
        Y1(
          n,
          oa
        );
        return;
      }
      t = n.return;
      var i = V3(
        n.alternate,
        n,
        Gn
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
  function Y1(t, n) {
    do {
      var i = U3(t.alternate, t);
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
  function X1(t, n, i, o, u, d, x, C, z) {
    t.cancelPendingCommit = null;
    do
      Ao();
    while (de !== 0);
    if ((Nt & 6) !== 0) throw Error(s(327));
    if (n !== null) {
      if (n === t.current) throw Error(s(177));
      if (d = n.lanes | n.childLanes, d |= xu, Ex(
        t,
        i,
        d,
        x,
        C,
        z
      ), t === Ht && (Tt = Ht = null, Et = 0), zi = n, ca = t, Yn = i, Mc = d, _c = u, z1 = o, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, F3(js, function() {
        return F1(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), o = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || o) {
        o = N.T, N.T = null, u = Y.p, Y.p = 2, x = Nt, Nt |= 4;
        try {
          k3(t, n, i);
        } finally {
          Nt = x, Y.p = u, N.T = o;
        }
      }
      de = 1, P1(), K1(), Z1();
    }
  }
  function P1() {
    if (de === 1) {
      de = 0;
      var t = ca, n = zi, i = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || i) {
        i = N.T, N.T = null;
        var o = Y.p;
        Y.p = 2;
        var u = Nt;
        Nt |= 4;
        try {
          A1(n, t);
          var d = Yc, x = Nm(t.containerInfo), C = d.focusedElem, z = d.selectionRange;
          if (x !== C && C && C.ownerDocument && Dm(
            C.ownerDocument.documentElement,
            C
          )) {
            if (z !== null && pu(C)) {
              var q = z.start, Z = z.end;
              if (Z === void 0 && (Z = q), "selectionStart" in C)
                C.selectionStart = q, C.selectionEnd = Math.min(
                  Z,
                  C.value.length
                );
              else {
                var W = C.ownerDocument || document, G = W && W.defaultView || window;
                if (G.getSelection) {
                  var X = G.getSelection(), ut = C.textContent.length, gt = Math.min(z.start, ut), Ut = z.end === void 0 ? gt : Math.min(z.end, ut);
                  !X.extend && gt > Ut && (x = Ut, Ut = gt, gt = x);
                  var U = Rm(
                    C,
                    gt
                  ), L = Rm(
                    C,
                    Ut
                  );
                  if (U && L && (X.rangeCount !== 1 || X.anchorNode !== U.node || X.anchorOffset !== U.offset || X.focusNode !== L.node || X.focusOffset !== L.offset)) {
                    var H = W.createRange();
                    H.setStart(U.node, U.offset), X.removeAllRanges(), gt > Ut ? (X.addRange(H), X.extend(L.node, L.offset)) : (H.setEnd(L.node, L.offset), X.addRange(H));
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
          Uo = !!Gc, Yc = Gc = null;
        } finally {
          Nt = u, Y.p = o, N.T = i;
        }
      }
      t.current = n, de = 2;
    }
  }
  function K1() {
    if (de === 2) {
      de = 0;
      var t = ca, n = zi, i = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || i) {
        i = N.T, N.T = null;
        var o = Y.p;
        Y.p = 2;
        var u = Nt;
        Nt |= 4;
        try {
          S1(t, n.alternate, n);
        } finally {
          Nt = u, Y.p = o, N.T = i;
        }
      }
      de = 3;
    }
  }
  function Z1() {
    if (de === 4 || de === 3) {
      de = 0, yx();
      var t = ca, n = zi, i = Yn, o = z1;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? de = 5 : (de = 0, zi = ca = null, Q1(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (u === 0 && (ua = null), Fr(i), n = n.stateNode, Ue && typeof Ue.onCommitFiberRoot == "function")
        try {
          Ue.onCommitFiberRoot(
            rl,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (o !== null) {
        n = N.T, u = Y.p, Y.p = 2, N.T = null;
        try {
          for (var d = t.onRecoverableError, x = 0; x < o.length; x++) {
            var C = o[x];
            d(C.value, {
              componentStack: C.stack
            });
          }
        } finally {
          N.T = n, Y.p = u;
        }
      }
      (Yn & 3) !== 0 && Ao(), Tn(t), u = t.pendingLanes, (i & 261930) !== 0 && (u & 42) !== 0 ? t === Rc ? Gl++ : (Gl = 0, Rc = t) : Gl = 0, Yl(0);
    }
  }
  function Q1(t, n) {
    (t.pooledCacheLanes &= n) === 0 && (n = t.pooledCache, n != null && (t.pooledCache = null, Cl(n)));
  }
  function Ao() {
    return P1(), K1(), Z1(), F1();
  }
  function F1() {
    if (de !== 5) return !1;
    var t = ca, n = Mc;
    Mc = 0;
    var i = Fr(Yn), o = N.T, u = Y.p;
    try {
      Y.p = 32 > i ? 32 : i, N.T = null, i = _c, _c = null;
      var d = ca, x = Yn;
      if (de = 0, zi = ca = null, Yn = 0, (Nt & 6) !== 0) throw Error(s(331));
      var C = Nt;
      if (Nt |= 4, D1(d.current), M1(
        d,
        d.current,
        x,
        i
      ), Nt = C, Yl(0, !1), Ue && typeof Ue.onPostCommitFiberRoot == "function")
        try {
          Ue.onPostCommitFiberRoot(rl, d);
        } catch {
        }
      return !0;
    } finally {
      Y.p = u, N.T = o, Q1(t, n);
    }
  }
  function J1(t, n, i) {
    n = We(i, n), n = rc(t.stateNode, n, 2), t = aa(t, n, 2), t !== null && (cl(t, 2), Tn(t));
  }
  function Lt(t, n, i) {
    if (t.tag === 3)
      J1(t, t, i);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          J1(
            n,
            t,
            i
          );
          break;
        } else if (n.tag === 1) {
          var o = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (ua === null || !ua.has(o))) {
            t = We(i, t), i = Wp(2), o = aa(n, i, 2), o !== null && (Ip(
              i,
              o,
              n,
              t
            ), cl(o, 2), Tn(o));
            break;
          }
        }
        n = n.return;
      }
  }
  function Oc(t, n, i) {
    var o = t.pingCache;
    if (o === null) {
      o = t.pingCache = new $3();
      var u = /* @__PURE__ */ new Set();
      o.set(n, u);
    } else
      u = o.get(n), u === void 0 && (u = /* @__PURE__ */ new Set(), o.set(n, u));
    u.has(i) || (Ec = !0, u.add(i), t = K3.bind(null, t, n, i), n.then(t, t));
  }
  function K3(t, n, i) {
    var o = t.pingCache;
    o !== null && o.delete(n), t.pingedLanes |= t.suspendedLanes & i, t.warmLanes &= ~i, Ht === t && (Et & i) === i && (Wt === 4 || Wt === 3 && (Et & 62914560) === Et && 300 > Ve() - xo ? (Nt & 2) === 0 && Li(t, 0) : Ac |= i, Oi === Et && (Oi = 0)), Tn(t);
  }
  function W1(t, n) {
    n === 0 && (n = Ph()), t = Oa(t, n), t !== null && (cl(t, n), Tn(t));
  }
  function Z3(t) {
    var n = t.memoizedState, i = 0;
    n !== null && (i = n.retryLane), W1(t, i);
  }
  function Q3(t, n) {
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
    o !== null && o.delete(n), W1(t, i);
  }
  function F3(t, n) {
    return Pr(t, n);
  }
  var jo = null, Vi = null, zc = !1, Mo = !1, Lc = !1, da = 0;
  function Tn(t) {
    t !== Vi && t.next === null && (Vi === null ? jo = Vi = t : Vi = Vi.next = t), Mo = !0, zc || (zc = !0, W3());
  }
  function Yl(t, n) {
    if (!Lc && Mo) {
      Lc = !0;
      do
        for (var i = !1, o = jo; o !== null; ) {
          if (t !== 0) {
            var u = o.pendingLanes;
            if (u === 0) var d = 0;
            else {
              var x = o.suspendedLanes, C = o.pingedLanes;
              d = (1 << 31 - ke(42 | t) + 1) - 1, d &= u & ~(x & ~C), d = d & 201326741 ? d & 201326741 | 1 : d ? d | 2 : 0;
            }
            d !== 0 && (i = !0, n0(o, d));
          } else
            d = Et, d = Ds(
              o,
              o === Ht ? d : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (d & 3) === 0 || ul(o, d) || (i = !0, n0(o, d));
          o = o.next;
        }
      while (i);
      Lc = !1;
    }
  }
  function J3() {
    I1();
  }
  function I1() {
    Mo = zc = !1;
    var t = 0;
    da !== 0 && rS() && (t = da);
    for (var n = Ve(), i = null, o = jo; o !== null; ) {
      var u = o.next, d = t0(o, n);
      d === 0 ? (o.next = null, i === null ? jo = u : i.next = u, u === null && (Vi = i)) : (i = o, (t !== 0 || (d & 3) !== 0) && (Mo = !0)), o = u;
    }
    de !== 0 && de !== 5 || Yl(t), da !== 0 && (da = 0);
  }
  function t0(t, n) {
    for (var i = t.suspendedLanes, o = t.pingedLanes, u = t.expirationTimes, d = t.pendingLanes & -62914561; 0 < d; ) {
      var x = 31 - ke(d), C = 1 << x, z = u[x];
      z === -1 ? ((C & i) === 0 || (C & o) !== 0) && (u[x] = Cx(C, n)) : z <= n && (t.expiredLanes |= C), d &= ~C;
    }
    if (n = Ht, i = Et, i = Ds(
      t,
      t === n ? i : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o = t.callbackNode, i === 0 || t === n && (zt === 2 || zt === 9) || t.cancelPendingCommit !== null)
      return o !== null && o !== null && Kr(o), t.callbackNode = null, t.callbackPriority = 0;
    if ((i & 3) === 0 || ul(t, i)) {
      if (n = i & -i, n === t.callbackPriority) return n;
      switch (o !== null && Kr(o), Fr(i)) {
        case 2:
        case 8:
          i = Yh;
          break;
        case 32:
          i = js;
          break;
        case 268435456:
          i = Xh;
          break;
        default:
          i = js;
      }
      return o = e0.bind(null, t), i = Pr(i, o), t.callbackPriority = n, t.callbackNode = i, n;
    }
    return o !== null && o !== null && Kr(o), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function e0(t, n) {
    if (de !== 0 && de !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var i = t.callbackNode;
    if (Ao() && t.callbackNode !== i)
      return null;
    var o = Et;
    return o = Ds(
      t,
      t === Ht ? o : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o === 0 ? null : (B1(t, o, n), t0(t, Ve()), t.callbackNode != null && t.callbackNode === i ? e0.bind(null, t) : null);
  }
  function n0(t, n) {
    if (Ao()) return null;
    B1(t, n, !0);
  }
  function W3() {
    cS(function() {
      (Nt & 6) !== 0 ? Pr(
        Gh,
        J3
      ) : I1();
    });
  }
  function Bc() {
    if (da === 0) {
      var t = wi;
      t === 0 && (t = Ms, Ms <<= 1, (Ms & 261888) === 0 && (Ms = 256)), da = t;
    }
    return da;
  }
  function a0(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Ls("" + t);
  }
  function i0(t, n) {
    var i = n.ownerDocument.createElement("input");
    return i.name = n.name, i.value = n.value, t.id && i.setAttribute("form", t.id), n.parentNode.insertBefore(i, n), t = new FormData(t), i.parentNode.removeChild(i), t;
  }
  function I3(t, n, i, o, u) {
    if (n === "submit" && i && i.stateNode === u) {
      var d = a0(
        (u[Re] || null).action
      ), x = o.submitter;
      x && (n = (n = x[Re] || null) ? a0(n.formAction) : x.getAttribute("formAction"), n !== null && (d = n, x = null));
      var C = new ks(
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
                if (da !== 0) {
                  var z = x ? i0(u, x) : new FormData(u);
                  nc(
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
                typeof d == "function" && (C.preventDefault(), z = x ? i0(u, x) : new FormData(u), nc(
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
  for (var Vc = 0; Vc < bu.length; Vc++) {
    var Uc = bu[Vc], tS = Uc.toLowerCase(), eS = Uc[0].toUpperCase() + Uc.slice(1);
    un(
      tS,
      "on" + eS
    );
  }
  un(Lm, "onAnimationEnd"), un(Bm, "onAnimationIteration"), un(Vm, "onAnimationStart"), un("dblclick", "onDoubleClick"), un("focusin", "onFocus"), un("focusout", "onBlur"), un(g3, "onTransitionRun"), un(v3, "onTransitionStart"), un(b3, "onTransitionCancel"), un(Um, "onTransitionEnd"), ri("onMouseEnter", ["mouseout", "mouseover"]), ri("onMouseLeave", ["mouseout", "mouseover"]), ri("onPointerEnter", ["pointerout", "pointerover"]), ri("onPointerLeave", ["pointerout", "pointerover"]), _a(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), _a(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), _a("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), _a(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), _a(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), _a(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Xl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), nS = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Xl)
  );
  function l0(t, n) {
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
              $s(Z);
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
              $s(Z);
            }
            u.currentTarget = null, d = z;
          }
      }
    }
  }
  function Ct(t, n) {
    var i = n[Jr];
    i === void 0 && (i = n[Jr] = /* @__PURE__ */ new Set());
    var o = t + "__bubble";
    i.has(o) || (s0(n, t, 2, !1), i.add(o));
  }
  function kc(t, n, i) {
    var o = 0;
    n && (o |= 4), s0(
      i,
      t,
      o,
      n
    );
  }
  var _o = "_reactListening" + Math.random().toString(36).slice(2);
  function Hc(t) {
    if (!t[_o]) {
      t[_o] = !0, Ih.forEach(function(i) {
        i !== "selectionchange" && (nS.has(i) || kc(i, !1, t), kc(i, !0, t));
      });
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[_o] || (n[_o] = !0, kc("selectionchange", !1, n));
    }
  }
  function s0(t, n, i, o) {
    switch (L0(n)) {
      case 2:
        var u = RS;
        break;
      case 8:
        u = DS;
        break;
      default:
        u = ef;
    }
    i = u.bind(
      null,
      n,
      i,
      t
    ), u = void 0, !su || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (u = !0), o ? u !== void 0 ? t.addEventListener(n, i, {
      capture: !0,
      passive: u
    }) : t.addEventListener(n, i, !0) : u !== void 0 ? t.addEventListener(n, i, {
      passive: u
    }) : t.addEventListener(n, i, !1);
  }
  function qc(t, n, i, o, u) {
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
            if (x = li(C), x === null) return;
            if (z = x.tag, z === 5 || z === 6 || z === 26 || z === 27) {
              o = d = x;
              continue t;
            }
            C = C.parentNode;
          }
        }
        o = o.return;
      }
    fm(function() {
      var q = d, Z = iu(i), W = [];
      t: {
        var G = km.get(t);
        if (G !== void 0) {
          var X = ks, ut = t;
          switch (t) {
            case "keypress":
              if (Vs(i) === 0) break t;
            case "keydown":
            case "keyup":
              X = Qx;
              break;
            case "focusin":
              ut = "focus", X = cu;
              break;
            case "focusout":
              ut = "blur", X = cu;
              break;
            case "beforeblur":
            case "afterblur":
              X = cu;
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
              X = mm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              X = Vx;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              X = Wx;
              break;
            case Lm:
            case Bm:
            case Vm:
              X = Hx;
              break;
            case Um:
              X = t3;
              break;
            case "scroll":
            case "scrollend":
              X = Lx;
              break;
            case "wheel":
              X = n3;
              break;
            case "copy":
            case "cut":
            case "paste":
              X = $x;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              X = ym;
              break;
            case "toggle":
            case "beforetoggle":
              X = i3;
          }
          var gt = (n & 4) !== 0, Ut = !gt && (t === "scroll" || t === "scrollend"), U = gt ? G !== null ? G + "Capture" : null : G;
          gt = [];
          for (var L = q, H; L !== null; ) {
            var F = L;
            if (H = F.stateNode, F = F.tag, F !== 5 && F !== 26 && F !== 27 || H === null || U === null || (F = hl(L, U), F != null && gt.push(
              Pl(L, F, H)
            )), Ut) break;
            L = L.return;
          }
          0 < gt.length && (G = new X(
            G,
            ut,
            null,
            i,
            Z
          ), W.push({ event: G, listeners: gt }));
        }
      }
      if ((n & 7) === 0) {
        t: {
          if (G = t === "mouseover" || t === "pointerover", X = t === "mouseout" || t === "pointerout", G && i !== au && (ut = i.relatedTarget || i.fromElement) && (li(ut) || ut[ii]))
            break t;
          if ((X || G) && (G = Z.window === Z ? Z : (G = Z.ownerDocument) ? G.defaultView || G.parentWindow : window, X ? (ut = i.relatedTarget || i.toElement, X = q, ut = ut ? li(ut) : null, ut !== null && (Ut = c(ut), gt = ut.tag, ut !== Ut || gt !== 5 && gt !== 27 && gt !== 6) && (ut = null)) : (X = null, ut = q), X !== ut)) {
            if (gt = mm, F = "onMouseLeave", U = "onMouseEnter", L = "mouse", (t === "pointerout" || t === "pointerover") && (gt = ym, F = "onPointerLeave", U = "onPointerEnter", L = "pointer"), Ut = X == null ? G : dl(X), H = ut == null ? G : dl(ut), G = new gt(
              F,
              L + "leave",
              X,
              i,
              Z
            ), G.target = Ut, G.relatedTarget = H, F = null, li(Z) === q && (gt = new gt(
              U,
              L + "enter",
              ut,
              i,
              Z
            ), gt.target = H, gt.relatedTarget = Ut, F = gt), Ut = F, X && ut)
              e: {
                for (gt = aS, U = X, L = ut, H = 0, F = U; F; F = gt(F))
                  H++;
                F = 0;
                for (var mt = L; mt; mt = gt(mt))
                  F++;
                for (; 0 < H - F; )
                  U = gt(U), H--;
                for (; 0 < F - H; )
                  L = gt(L), F--;
                for (; H--; ) {
                  if (U === L || L !== null && U === L.alternate) {
                    gt = U;
                    break e;
                  }
                  U = gt(U), L = gt(L);
                }
                gt = null;
              }
            else gt = null;
            X !== null && o0(
              W,
              G,
              X,
              gt,
              !1
            ), ut !== null && Ut !== null && o0(
              W,
              Ut,
              ut,
              gt,
              !0
            );
          }
        }
        t: {
          if (G = q ? dl(q) : window, X = G.nodeName && G.nodeName.toLowerCase(), X === "select" || X === "input" && G.type === "file")
            var _t = Cm;
          else if (wm(G))
            if (Em)
              _t = m3;
            else {
              _t = d3;
              var ft = f3;
            }
          else
            X = G.nodeName, !X || X.toLowerCase() !== "input" || G.type !== "checkbox" && G.type !== "radio" ? q && nu(q.elementType) && (_t = Cm) : _t = h3;
          if (_t && (_t = _t(t, q))) {
            Tm(
              W,
              _t,
              i,
              Z
            );
            break t;
          }
          ft && ft(t, G, q), t === "focusout" && q && G.type === "number" && q.memoizedProps.value != null && eu(G, "number", G.value);
        }
        switch (ft = q ? dl(q) : window, t) {
          case "focusin":
            (wm(ft) || ft.contentEditable === "true") && (mi = ft, yu = q, Sl = null);
            break;
          case "focusout":
            Sl = yu = mi = null;
            break;
          case "mousedown":
            gu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            gu = !1, Om(W, i, Z);
            break;
          case "selectionchange":
            if (y3) break;
          case "keydown":
          case "keyup":
            Om(W, i, Z);
        }
        var St;
        if (du)
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
          hi ? xm(t, i) && (At = "onCompositionEnd") : t === "keydown" && i.keyCode === 229 && (At = "onCompositionStart");
        At && (gm && i.locale !== "ko" && (hi || At !== "onCompositionStart" ? At === "onCompositionEnd" && hi && (St = dm()) : (Fn = Z, ou = "value" in Fn ? Fn.value : Fn.textContent, hi = !0)), ft = Ro(q, At), 0 < ft.length && (At = new pm(
          At,
          t,
          null,
          i,
          Z
        ), W.push({ event: At, listeners: ft }), St ? At.data = St : (St = Sm(i), St !== null && (At.data = St)))), (St = s3 ? o3(t, i) : r3(t, i)) && (At = Ro(q, "onBeforeInput"), 0 < At.length && (ft = new pm(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          Z
        ), W.push({
          event: ft,
          listeners: At
        }), ft.data = St)), I3(
          W,
          t,
          q,
          i,
          Z
        );
      }
      l0(W, n);
    });
  }
  function Pl(t, n, i) {
    return {
      instance: t,
      listener: n,
      currentTarget: i
    };
  }
  function Ro(t, n) {
    for (var i = n + "Capture", o = []; t !== null; ) {
      var u = t, d = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || d === null || (u = hl(t, i), u != null && o.unshift(
        Pl(t, u, d)
      ), u = hl(t, n), u != null && o.push(
        Pl(t, u, d)
      )), t.tag === 3) return o;
      t = t.return;
    }
    return [];
  }
  function aS(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function o0(t, n, i, o, u) {
    for (var d = n._reactName, x = []; i !== null && i !== o; ) {
      var C = i, z = C.alternate, q = C.stateNode;
      if (C = C.tag, z !== null && z === o) break;
      C !== 5 && C !== 26 && C !== 27 || q === null || (z = q, u ? (q = hl(i, d), q != null && x.unshift(
        Pl(i, q, z)
      )) : u || (q = hl(i, d), q != null && x.push(
        Pl(i, q, z)
      ))), i = i.return;
    }
    x.length !== 0 && t.push({ event: n, listeners: x });
  }
  var iS = /\r\n?/g, lS = /\u0000|\uFFFD/g;
  function r0(t) {
    return (typeof t == "string" ? t : "" + t).replace(iS, `
`).replace(lS, "");
  }
  function u0(t, n) {
    return n = r0(n), r0(t) === n;
  }
  function Vt(t, n, i, o, u, d) {
    switch (i) {
      case "children":
        typeof o == "string" ? n === "body" || n === "textarea" && o === "" || ci(t, o) : (typeof o == "number" || typeof o == "bigint") && n !== "body" && ci(t, "" + o);
        break;
      case "className":
        Os(t, "class", o);
        break;
      case "tabIndex":
        Os(t, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Os(t, i, o);
        break;
      case "style":
        um(t, o, d);
        break;
      case "data":
        if (n !== "object") {
          Os(t, "data", o);
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
        o = Ls("" + o), t.setAttribute(i, o);
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
        o = Ls("" + o), t.setAttribute(i, o);
        break;
      case "onClick":
        o != null && (t.onclick = _n);
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
        i = Ls("" + o), t.setAttributeNS(
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
        Ct("beforetoggle", t), Ct("toggle", t), Ns(t, "popover", o);
        break;
      case "xlinkActuate":
        Mn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          o
        );
        break;
      case "xlinkArcrole":
        Mn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          o
        );
        break;
      case "xlinkRole":
        Mn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          o
        );
        break;
      case "xlinkShow":
        Mn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          o
        );
        break;
      case "xlinkTitle":
        Mn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          o
        );
        break;
      case "xlinkType":
        Mn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          o
        );
        break;
      case "xmlBase":
        Mn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          o
        );
        break;
      case "xmlLang":
        Mn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          o
        );
        break;
      case "xmlSpace":
        Mn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          o
        );
        break;
      case "is":
        Ns(t, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = Ox.get(i) || i, Ns(t, i, o));
    }
  }
  function $c(t, n, i, o, u, d) {
    switch (i) {
      case "style":
        um(t, o, d);
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
        typeof o == "string" ? ci(t, o) : (typeof o == "number" || typeof o == "bigint") && ci(t, "" + o);
        break;
      case "onScroll":
        o != null && Ct("scroll", t);
        break;
      case "onScrollEnd":
        o != null && Ct("scrollend", t);
        break;
      case "onClick":
        o != null && (t.onclick = _n);
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
        if (!tm.hasOwnProperty(i))
          t: {
            if (i[0] === "o" && i[1] === "n" && (u = i.endsWith("Capture"), n = i.slice(2, u ? i.length - 7 : void 0), d = t[Re] || null, d = d != null ? d[i] : null, typeof d == "function" && t.removeEventListener(n, d, u), typeof o == "function")) {
              typeof d != "function" && d !== null && (i in t ? t[i] = null : t.hasAttribute(i) && t.removeAttribute(i)), t.addEventListener(n, o, u);
              break t;
            }
            i in t ? t[i] = o : o === !0 ? t.setAttribute(i, "") : Ns(t, i, o);
          }
    }
  }
  function Se(t, n, i) {
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
                  Vt(t, n, d, x, i, null);
              }
          }
        u && Vt(t, n, "srcSet", i.srcSet, i, null), o && Vt(t, n, "src", i.src, i, null);
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
                  Vt(t, n, o, Z, i, null);
              }
          }
        lm(
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
                Vt(t, n, u, C, i, null);
            }
        n = d, i = x, t.multiple = !!o, n != null ? ui(t, !!o, n, !1) : i != null && ui(t, !!o, i, !0);
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
                Vt(t, n, x, C, i, null);
            }
        om(t, o, u, d);
        return;
      case "option":
        for (z in i)
          if (i.hasOwnProperty(z) && (o = i[z], o != null))
            switch (z) {
              case "selected":
                t.selected = o && typeof o != "function" && typeof o != "symbol";
                break;
              default:
                Vt(t, n, z, o, i, null);
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
        for (o = 0; o < Xl.length; o++)
          Ct(Xl[o], t);
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
                Vt(t, n, q, o, i, null);
            }
        return;
      default:
        if (nu(n)) {
          for (Z in i)
            i.hasOwnProperty(Z) && (o = i[Z], o !== void 0 && $c(
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
  function sS(t, n, i, o) {
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
        tu(
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
        X = x = C = G = null;
        for (d in i)
          if (z = i[d], i.hasOwnProperty(d) && z != null)
            switch (d) {
              case "value":
                break;
              case "multiple":
                X = z;
              default:
                o.hasOwnProperty(d) || Vt(
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
                G = d;
                break;
              case "defaultValue":
                C = d;
                break;
              case "multiple":
                x = d;
              default:
                d !== z && Vt(
                  t,
                  n,
                  u,
                  d,
                  o,
                  z
                );
            }
        n = C, i = x, o = X, G != null ? ui(t, !!i, G, !1) : !!o != !!i && (n != null ? ui(t, !!i, n, !0) : ui(t, !!i, i ? [] : "", !1));
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
        sm(t, G, X);
        return;
      case "option":
        for (var ut in i)
          if (G = i[ut], i.hasOwnProperty(ut) && G != null && !o.hasOwnProperty(ut))
            switch (ut) {
              case "selected":
                t.selected = !1;
                break;
              default:
                Vt(
                  t,
                  n,
                  ut,
                  null,
                  o,
                  G
                );
            }
        for (z in o)
          if (G = o[z], X = i[z], o.hasOwnProperty(z) && G !== X && (G != null || X != null))
            switch (z) {
              case "selected":
                t.selected = G && typeof G != "function" && typeof G != "symbol";
                break;
              default:
                Vt(
                  t,
                  n,
                  z,
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
        for (var gt in i)
          G = i[gt], i.hasOwnProperty(gt) && G != null && !o.hasOwnProperty(gt) && Vt(t, n, gt, null, o, G);
        for (q in o)
          if (G = o[q], X = i[q], o.hasOwnProperty(q) && G !== X && (G != null || X != null))
            switch (q) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (G != null)
                  throw Error(s(137, n));
                break;
              default:
                Vt(
                  t,
                  n,
                  q,
                  G,
                  o,
                  X
                );
            }
        return;
      default:
        if (nu(n)) {
          for (var Ut in i)
            G = i[Ut], i.hasOwnProperty(Ut) && G !== void 0 && !o.hasOwnProperty(Ut) && $c(
              t,
              n,
              Ut,
              void 0,
              o,
              G
            );
          for (Z in o)
            G = o[Z], X = i[Z], !o.hasOwnProperty(Z) || G === X || G === void 0 && X === void 0 || $c(
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
  function c0(t) {
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
  function oS() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, n = 0, i = performance.getEntriesByType("resource"), o = 0; o < i.length; o++) {
        var u = i[o], d = u.transferSize, x = u.initiatorType, C = u.duration;
        if (d && C && c0(x)) {
          for (x = 0, C = u.responseEnd, o += 1; o < i.length; o++) {
            var z = i[o], q = z.startTime;
            if (q > C) break;
            var Z = z.transferSize, W = z.initiatorType;
            Z && c0(W) && (z = z.responseEnd, x += Z * (z < C ? 1 : (C - q) / (z - q)));
          }
          if (--o, n += 8 * (d + x) / (u.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return n / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Gc = null, Yc = null;
  function Do(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function f0(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function d0(t, n) {
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
  function Xc(t, n) {
    return t === "textarea" || t === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Pc = null;
  function rS() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Pc ? !1 : (Pc = t, !0) : (Pc = null, !1);
  }
  var h0 = typeof setTimeout == "function" ? setTimeout : void 0, uS = typeof clearTimeout == "function" ? clearTimeout : void 0, m0 = typeof Promise == "function" ? Promise : void 0, cS = typeof queueMicrotask == "function" ? queueMicrotask : typeof m0 < "u" ? function(t) {
    return m0.resolve(null).then(t).catch(fS);
  } : h0;
  function fS(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function ha(t) {
    return t === "head";
  }
  function p0(t, n) {
    var i = n, o = 0;
    do {
      var u = i.nextSibling;
      if (t.removeChild(i), u && u.nodeType === 8)
        if (i = u.data, i === "/$" || i === "/&") {
          if (o === 0) {
            t.removeChild(u), qi(n);
            return;
          }
          o--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          o++;
        else if (i === "html")
          Kl(t.ownerDocument.documentElement);
        else if (i === "head") {
          i = t.ownerDocument.head, Kl(i);
          for (var d = i.firstChild; d; ) {
            var x = d.nextSibling, C = d.nodeName;
            d[fl] || C === "SCRIPT" || C === "STYLE" || C === "LINK" && d.rel.toLowerCase() === "stylesheet" || i.removeChild(d), d = x;
          }
        } else
          i === "body" && Kl(t.ownerDocument.body);
      i = u;
    } while (i);
    qi(n);
  }
  function y0(t, n) {
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
  function Kc(t) {
    var n = t.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var i = n;
      switch (n = n.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Kc(i), Wr(i);
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
  function dS(t, n, i, o) {
    for (; t.nodeType === 1; ) {
      var u = i;
      if (t.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!o && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (o) {
        if (!t[fl])
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
      if (t = an(t.nextSibling), t === null) break;
    }
    return null;
  }
  function hS(t, n, i) {
    if (n === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !i || (t = an(t.nextSibling), t === null)) return null;
    return t;
  }
  function g0(t, n) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = an(t.nextSibling), t === null)) return null;
    return t;
  }
  function Zc(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Qc(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function mS(t, n) {
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
  function an(t) {
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
  var Fc = null;
  function v0(t) {
    t = t.nextSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var i = t.data;
        if (i === "/$" || i === "/&") {
          if (n === 0)
            return an(t.nextSibling);
          n--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function b0(t) {
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
  function x0(t, n, i) {
    switch (n = Do(i), t) {
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
  function Kl(t) {
    for (var n = t.attributes; n.length; )
      t.removeAttributeNode(n[0]);
    Wr(t);
  }
  var ln = /* @__PURE__ */ new Map(), S0 = /* @__PURE__ */ new Set();
  function No(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Xn = Y.d;
  Y.d = {
    f: pS,
    r: yS,
    D: gS,
    C: vS,
    L: bS,
    m: xS,
    X: wS,
    S: SS,
    M: TS
  };
  function pS() {
    var t = Xn.f(), n = To();
    return t || n;
  }
  function yS(t) {
    var n = si(t);
    n !== null && n.tag === 5 && n.type === "form" ? Up(n) : Xn.r(t);
  }
  var Ui = typeof document > "u" ? null : document;
  function w0(t, n, i) {
    var o = Ui;
    if (o && typeof n == "string" && n) {
      var u = Fe(n);
      u = 'link[rel="' + t + '"][href="' + u + '"]', typeof i == "string" && (u += '[crossorigin="' + i + '"]'), S0.has(u) || (S0.add(u), t = { rel: t, crossOrigin: i, href: n }, o.querySelector(u) === null && (n = o.createElement("link"), Se(n, "link", t), pe(n), o.head.appendChild(n)));
    }
  }
  function gS(t) {
    Xn.D(t), w0("dns-prefetch", t, null);
  }
  function vS(t, n) {
    Xn.C(t, n), w0("preconnect", t, n);
  }
  function bS(t, n, i) {
    Xn.L(t, n, i);
    var o = Ui;
    if (o && t && n) {
      var u = 'link[rel="preload"][as="' + Fe(n) + '"]';
      n === "image" && i && i.imageSrcSet ? (u += '[imagesrcset="' + Fe(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (u += '[imagesizes="' + Fe(
        i.imageSizes
      ) + '"]')) : u += '[href="' + Fe(t) + '"]';
      var d = u;
      switch (n) {
        case "style":
          d = ki(t);
          break;
        case "script":
          d = Hi(t);
      }
      ln.has(d) || (t = v(
        {
          rel: "preload",
          href: n === "image" && i && i.imageSrcSet ? void 0 : t,
          as: n
        },
        i
      ), ln.set(d, t), o.querySelector(u) !== null || n === "style" && o.querySelector(Zl(d)) || n === "script" && o.querySelector(Ql(d)) || (n = o.createElement("link"), Se(n, "link", t), pe(n), o.head.appendChild(n)));
    }
  }
  function xS(t, n) {
    Xn.m(t, n);
    var i = Ui;
    if (i && t) {
      var o = n && typeof n.as == "string" ? n.as : "script", u = 'link[rel="modulepreload"][as="' + Fe(o) + '"][href="' + Fe(t) + '"]', d = u;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          d = Hi(t);
      }
      if (!ln.has(d) && (t = v({ rel: "modulepreload", href: t }, n), ln.set(d, t), i.querySelector(u) === null)) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(Ql(d)))
              return;
        }
        o = i.createElement("link"), Se(o, "link", t), pe(o), i.head.appendChild(o);
      }
    }
  }
  function SS(t, n, i) {
    Xn.S(t, n, i);
    var o = Ui;
    if (o && t) {
      var u = oi(o).hoistableStyles, d = ki(t);
      n = n || "default";
      var x = u.get(d);
      if (!x) {
        var C = { loading: 0, preload: null };
        if (x = o.querySelector(
          Zl(d)
        ))
          C.loading = 5;
        else {
          t = v(
            { rel: "stylesheet", href: t, "data-precedence": n },
            i
          ), (i = ln.get(d)) && Jc(t, i);
          var z = x = o.createElement("link");
          pe(z), Se(z, "link", t), z._p = new Promise(function(q, Z) {
            z.onload = q, z.onerror = Z;
          }), z.addEventListener("load", function() {
            C.loading |= 1;
          }), z.addEventListener("error", function() {
            C.loading |= 2;
          }), C.loading |= 4, Oo(x, n, o);
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
  function wS(t, n) {
    Xn.X(t, n);
    var i = Ui;
    if (i && t) {
      var o = oi(i).hoistableScripts, u = Hi(t), d = o.get(u);
      d || (d = i.querySelector(Ql(u)), d || (t = v({ src: t, async: !0 }, n), (n = ln.get(u)) && Wc(t, n), d = i.createElement("script"), pe(d), Se(d, "link", t), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, o.set(u, d));
    }
  }
  function TS(t, n) {
    Xn.M(t, n);
    var i = Ui;
    if (i && t) {
      var o = oi(i).hoistableScripts, u = Hi(t), d = o.get(u);
      d || (d = i.querySelector(Ql(u)), d || (t = v({ src: t, async: !0, type: "module" }, n), (n = ln.get(u)) && Wc(t, n), d = i.createElement("script"), pe(d), Se(d, "link", t), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, o.set(u, d));
    }
  }
  function T0(t, n, i, o) {
    var u = (u = ht.current) ? No(u) : null;
    if (!u) throw Error(s(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (n = ki(i.href), i = oi(
          u
        ).hoistableStyles, o = i.get(n), o || (o = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          t = ki(i.href);
          var d = oi(
            u
          ).hoistableStyles, x = d.get(t);
          if (x || (u = u.ownerDocument || u, x = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, d.set(t, x), (d = u.querySelector(
            Zl(t)
          )) && !d._p && (x.instance = d, x.state.loading = 5), ln.has(t) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, ln.set(t, i), d || CS(
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
        return n = i.async, i = i.src, typeof i == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = Hi(i), i = oi(
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
  function ki(t) {
    return 'href="' + Fe(t) + '"';
  }
  function Zl(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function C0(t) {
    return v({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function CS(t, n, i, o) {
    t.querySelector('link[rel="preload"][as="style"][' + n + "]") ? o.loading = 1 : (n = t.createElement("link"), o.preload = n, n.addEventListener("load", function() {
      return o.loading |= 1;
    }), n.addEventListener("error", function() {
      return o.loading |= 2;
    }), Se(n, "link", i), pe(n), t.head.appendChild(n));
  }
  function Hi(t) {
    return '[src="' + Fe(t) + '"]';
  }
  function Ql(t) {
    return "script[async]" + t;
  }
  function E0(t, n, i) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var o = t.querySelector(
            'style[data-href~="' + Fe(i.href) + '"]'
          );
          if (o)
            return n.instance = o, pe(o), o;
          var u = v({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return o = (t.ownerDocument || t).createElement(
            "style"
          ), pe(o), Se(o, "style", u), Oo(o, i.precedence, t), n.instance = o;
        case "stylesheet":
          u = ki(i.href);
          var d = t.querySelector(
            Zl(u)
          );
          if (d)
            return n.state.loading |= 4, n.instance = d, pe(d), d;
          o = C0(i), (u = ln.get(u)) && Jc(o, u), d = (t.ownerDocument || t).createElement("link"), pe(d);
          var x = d;
          return x._p = new Promise(function(C, z) {
            x.onload = C, x.onerror = z;
          }), Se(d, "link", o), n.state.loading |= 4, Oo(d, i.precedence, t), n.instance = d;
        case "script":
          return d = Hi(i.src), (u = t.querySelector(
            Ql(d)
          )) ? (n.instance = u, pe(u), u) : (o = i, (u = ln.get(d)) && (o = v({}, i), Wc(o, u)), t = t.ownerDocument || t, u = t.createElement("script"), pe(u), Se(u, "link", o), t.head.appendChild(u), n.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (o = n.instance, n.state.loading |= 4, Oo(o, i.precedence, t));
    return n.instance;
  }
  function Oo(t, n, i) {
    for (var o = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = o.length ? o[o.length - 1] : null, d = u, x = 0; x < o.length; x++) {
      var C = o[x];
      if (C.dataset.precedence === n) d = C;
      else if (d !== u) break;
    }
    d ? d.parentNode.insertBefore(t, d.nextSibling) : (n = i.nodeType === 9 ? i.head : i, n.insertBefore(t, n.firstChild));
  }
  function Jc(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.title == null && (t.title = n.title);
  }
  function Wc(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.integrity == null && (t.integrity = n.integrity);
  }
  var zo = null;
  function A0(t, n, i) {
    if (zo === null) {
      var o = /* @__PURE__ */ new Map(), u = zo = /* @__PURE__ */ new Map();
      u.set(i, o);
    } else
      u = zo, o = u.get(i), o || (o = /* @__PURE__ */ new Map(), u.set(i, o));
    if (o.has(t)) return o;
    for (o.set(t, null), i = i.getElementsByTagName(t), u = 0; u < i.length; u++) {
      var d = i[u];
      if (!(d[fl] || d[ge] || t === "link" && d.getAttribute("rel") === "stylesheet") && d.namespaceURI !== "http://www.w3.org/2000/svg") {
        var x = d.getAttribute(n) || "";
        x = t + x;
        var C = o.get(x);
        C ? C.push(d) : o.set(x, [d]);
      }
    }
    return o;
  }
  function j0(t, n, i) {
    t = t.ownerDocument || t, t.head.insertBefore(
      i,
      n === "title" ? t.querySelector("head > title") : null
    );
  }
  function ES(t, n, i) {
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
  function M0(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function AS(t, n, i, o) {
    if (i.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var u = ki(o.href), d = n.querySelector(
          Zl(u)
        );
        if (d) {
          n = d._p, n !== null && typeof n == "object" && typeof n.then == "function" && (t.count++, t = Lo.bind(t), n.then(t, t)), i.state.loading |= 4, i.instance = d, pe(d);
          return;
        }
        d = n.ownerDocument || n, o = C0(o), (u = ln.get(u)) && Jc(o, u), d = d.createElement("link"), pe(d);
        var x = d;
        x._p = new Promise(function(C, z) {
          x.onload = C, x.onerror = z;
        }), Se(d, "link", o), i.instance = d;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(i, n), (n = i.state.preload) && (i.state.loading & 3) === 0 && (t.count++, i = Lo.bind(t), n.addEventListener("load", i), n.addEventListener("error", i));
    }
  }
  var Ic = 0;
  function jS(t, n) {
    return t.stylesheets && t.count === 0 && Vo(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(i) {
      var o = setTimeout(function() {
        if (t.stylesheets && Vo(t, t.stylesheets), t.unsuspend) {
          var d = t.unsuspend;
          t.unsuspend = null, d();
        }
      }, 6e4 + n);
      0 < t.imgBytes && Ic === 0 && (Ic = 62500 * oS());
      var u = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Vo(t, t.stylesheets), t.unsuspend)) {
            var d = t.unsuspend;
            t.unsuspend = null, d();
          }
        },
        (t.imgBytes > Ic ? 50 : 800) + n
      );
      return t.unsuspend = i, function() {
        t.unsuspend = null, clearTimeout(o), clearTimeout(u);
      };
    } : null;
  }
  function Lo() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Vo(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var Bo = null;
  function Vo(t, n) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Bo = /* @__PURE__ */ new Map(), n.forEach(MS, t), Bo = null, Lo.call(t));
  }
  function MS(t, n) {
    if (!(n.state.loading & 4)) {
      var i = Bo.get(t);
      if (i) var o = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), Bo.set(t, i);
        for (var u = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), d = 0; d < u.length; d++) {
          var x = u[d];
          (x.nodeName === "LINK" || x.getAttribute("media") !== "not all") && (i.set(x.dataset.precedence, x), o = x);
        }
        o && i.set(null, o);
      }
      u = n.instance, x = u.getAttribute("data-precedence"), d = i.get(x) || o, d === o && i.set(null, u), i.set(x, u), this.count++, o = Lo.bind(this), u.addEventListener("load", o), u.addEventListener("error", o), d ? d.parentNode.insertBefore(u, d.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(u, t.firstChild)), n.state.loading |= 4;
    }
  }
  var Fl = {
    $$typeof: j,
    Provider: null,
    Consumer: null,
    _currentValue: J,
    _currentValue2: J,
    _threadCount: 0
  };
  function _S(t, n, i, o, u, d, x, C, z) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Zr(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Zr(0), this.hiddenUpdates = Zr(null), this.identifierPrefix = o, this.onUncaughtError = u, this.onCaughtError = d, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = z, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function _0(t, n, i, o, u, d, x, C, z, q, Z, W) {
    return t = new _S(
      t,
      n,
      i,
      x,
      z,
      q,
      Z,
      W,
      C
    ), n = 1, d === !0 && (n |= 24), d = qe(3, null, null, n), t.current = d, d.stateNode = t, n = Nu(), n.refCount++, t.pooledCache = n, n.refCount++, d.memoizedState = {
      element: o,
      isDehydrated: i,
      cache: n
    }, Bu(d), t;
  }
  function R0(t) {
    return t ? (t = gi, t) : gi;
  }
  function D0(t, n, i, o, u, d) {
    u = R0(u), o.context === null ? o.context = u : o.pendingContext = u, o = na(n), o.payload = { element: i }, d = d === void 0 ? null : d, d !== null && (o.callback = d), i = aa(t, o, n), i !== null && (Be(i, t, n), Ml(i, t, n));
  }
  function N0(t, n) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var i = t.retryLane;
      t.retryLane = i !== 0 && i < n ? i : n;
    }
  }
  function tf(t, n) {
    N0(t, n), (t = t.alternate) && N0(t, n);
  }
  function O0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Oa(t, 67108864);
      n !== null && Be(n, t, 67108864), tf(t, 67108864);
    }
  }
  function z0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Pe();
      n = Qr(n);
      var i = Oa(t, n);
      i !== null && Be(i, t, n), tf(t, n);
    }
  }
  var Uo = !0;
  function RS(t, n, i, o) {
    var u = N.T;
    N.T = null;
    var d = Y.p;
    try {
      Y.p = 2, ef(t, n, i, o);
    } finally {
      Y.p = d, N.T = u;
    }
  }
  function DS(t, n, i, o) {
    var u = N.T;
    N.T = null;
    var d = Y.p;
    try {
      Y.p = 8, ef(t, n, i, o);
    } finally {
      Y.p = d, N.T = u;
    }
  }
  function ef(t, n, i, o) {
    if (Uo) {
      var u = nf(o);
      if (u === null)
        qc(
          t,
          n,
          o,
          ko,
          i
        ), B0(t, o);
      else if (OS(
        u,
        t,
        n,
        i,
        o
      ))
        o.stopPropagation();
      else if (B0(t, o), n & 4 && -1 < NS.indexOf(t)) {
        for (; u !== null; ) {
          var d = si(u);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (d = d.stateNode, d.current.memoizedState.isDehydrated) {
                  var x = Ma(d.pendingLanes);
                  if (x !== 0) {
                    var C = d;
                    for (C.pendingLanes |= 2, C.entangledLanes |= 2; x; ) {
                      var z = 1 << 31 - ke(x);
                      C.entanglements[1] |= z, x &= ~z;
                    }
                    Tn(d), (Nt & 6) === 0 && (So = Ve() + 500, Yl(0));
                  }
                }
                break;
              case 31:
              case 13:
                C = Oa(d, 2), C !== null && Be(C, d, 2), To(), tf(d, 2);
            }
          if (d = nf(o), d === null && qc(
            t,
            n,
            o,
            ko,
            i
          ), d === u) break;
          u = d;
        }
        u !== null && o.stopPropagation();
      } else
        qc(
          t,
          n,
          o,
          null,
          i
        );
    }
  }
  function nf(t) {
    return t = iu(t), af(t);
  }
  var ko = null;
  function af(t) {
    if (ko = null, t = li(t), t !== null) {
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
    return ko = t, null;
  }
  function L0(t) {
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
        switch (gx()) {
          case Gh:
            return 2;
          case Yh:
            return 8;
          case js:
          case vx:
            return 32;
          case Xh:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var lf = !1, ma = null, pa = null, ya = null, Jl = /* @__PURE__ */ new Map(), Wl = /* @__PURE__ */ new Map(), ga = [], NS = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function B0(t, n) {
    switch (t) {
      case "focusin":
      case "focusout":
        ma = null;
        break;
      case "dragenter":
      case "dragleave":
        pa = null;
        break;
      case "mouseover":
      case "mouseout":
        ya = null;
        break;
      case "pointerover":
      case "pointerout":
        Jl.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Wl.delete(n.pointerId);
    }
  }
  function Il(t, n, i, o, u, d) {
    return t === null || t.nativeEvent !== d ? (t = {
      blockedOn: n,
      domEventName: i,
      eventSystemFlags: o,
      nativeEvent: d,
      targetContainers: [u]
    }, n !== null && (n = si(n), n !== null && O0(n)), t) : (t.eventSystemFlags |= o, n = t.targetContainers, u !== null && n.indexOf(u) === -1 && n.push(u), t);
  }
  function OS(t, n, i, o, u) {
    switch (n) {
      case "focusin":
        return ma = Il(
          ma,
          t,
          n,
          i,
          o,
          u
        ), !0;
      case "dragenter":
        return pa = Il(
          pa,
          t,
          n,
          i,
          o,
          u
        ), !0;
      case "mouseover":
        return ya = Il(
          ya,
          t,
          n,
          i,
          o,
          u
        ), !0;
      case "pointerover":
        var d = u.pointerId;
        return Jl.set(
          d,
          Il(
            Jl.get(d) || null,
            t,
            n,
            i,
            o,
            u
          )
        ), !0;
      case "gotpointercapture":
        return d = u.pointerId, Wl.set(
          d,
          Il(
            Wl.get(d) || null,
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
  function V0(t) {
    var n = li(t.target);
    if (n !== null) {
      var i = c(n);
      if (i !== null) {
        if (n = i.tag, n === 13) {
          if (n = f(i), n !== null) {
            t.blockedOn = n, Jh(t.priority, function() {
              z0(i);
            });
            return;
          }
        } else if (n === 31) {
          if (n = h(i), n !== null) {
            t.blockedOn = n, Jh(t.priority, function() {
              z0(i);
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
  function Ho(t) {
    if (t.blockedOn !== null) return !1;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var i = nf(t.nativeEvent);
      if (i === null) {
        i = t.nativeEvent;
        var o = new i.constructor(
          i.type,
          i
        );
        au = o, i.target.dispatchEvent(o), au = null;
      } else
        return n = si(i), n !== null && O0(n), t.blockedOn = i, !1;
      n.shift();
    }
    return !0;
  }
  function U0(t, n, i) {
    Ho(t) && i.delete(n);
  }
  function zS() {
    lf = !1, ma !== null && Ho(ma) && (ma = null), pa !== null && Ho(pa) && (pa = null), ya !== null && Ho(ya) && (ya = null), Jl.forEach(U0), Wl.forEach(U0);
  }
  function qo(t, n) {
    t.blockedOn === n && (t.blockedOn = null, lf || (lf = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      zS
    )));
  }
  var $o = null;
  function k0(t) {
    $o !== t && ($o = t, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        $o === t && ($o = null);
        for (var n = 0; n < t.length; n += 3) {
          var i = t[n], o = t[n + 1], u = t[n + 2];
          if (typeof o != "function") {
            if (af(o || i) === null)
              continue;
            break;
          }
          var d = si(i);
          d !== null && (t.splice(n, 3), n -= 3, nc(
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
  function qi(t) {
    function n(z) {
      return qo(z, t);
    }
    ma !== null && qo(ma, t), pa !== null && qo(pa, t), ya !== null && qo(ya, t), Jl.forEach(n), Wl.forEach(n);
    for (var i = 0; i < ga.length; i++) {
      var o = ga[i];
      o.blockedOn === t && (o.blockedOn = null);
    }
    for (; 0 < ga.length && (i = ga[0], i.blockedOn === null); )
      V0(i), i.blockedOn === null && ga.shift();
    if (i = (t.ownerDocument || t).$$reactFormReplay, i != null)
      for (o = 0; o < i.length; o += 3) {
        var u = i[o], d = i[o + 1], x = u[Re] || null;
        if (typeof d == "function")
          x || k0(i);
        else if (x) {
          var C = null;
          if (d && d.hasAttribute("formAction")) {
            if (u = d, x = d[Re] || null)
              C = x.formAction;
            else if (af(u) !== null) continue;
          } else C = x.action;
          typeof C == "function" ? i[o + 1] = C : (i.splice(o, 3), o -= 3), k0(i);
        }
      }
  }
  function H0() {
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
  function sf(t) {
    this._internalRoot = t;
  }
  Go.prototype.render = sf.prototype.render = function(t) {
    var n = this._internalRoot;
    if (n === null) throw Error(s(409));
    var i = n.current, o = Pe();
    D0(i, o, t, n, null, null);
  }, Go.prototype.unmount = sf.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var n = t.containerInfo;
      D0(t.current, 2, null, t, null, null), To(), n[ii] = null;
    }
  };
  function Go(t) {
    this._internalRoot = t;
  }
  Go.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var n = Fh();
      t = { blockedOn: null, target: t, priority: n };
      for (var i = 0; i < ga.length && n !== 0 && n < ga[i].priority; i++) ;
      ga.splice(i, 0, t), i === 0 && V0(t);
    }
  };
  var q0 = e.version;
  if (q0 !== "19.2.7")
    throw Error(
      s(
        527,
        q0,
        "19.2.7"
      )
    );
  Y.findDOMNode = function(t) {
    var n = t._reactInternals;
    if (n === void 0)
      throw typeof t.render == "function" ? Error(s(188)) : (t = Object.keys(t).join(","), Error(s(268, t)));
    return t = p(n), t = t !== null ? g(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var LS = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: N,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Yo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Yo.isDisabled && Yo.supportsFiber)
      try {
        rl = Yo.inject(
          LS
        ), Ue = Yo;
      } catch {
      }
  }
  return es.createRoot = function(t, n) {
    if (!r(t)) throw Error(s(299));
    var i = !1, o = "", u = Zp, d = Qp, x = Fp;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (u = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (x = n.onRecoverableError)), n = _0(
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
      H0
    ), t[ii] = n.current, Hc(t), new sf(n);
  }, es.hydrateRoot = function(t, n, i) {
    if (!r(t)) throw Error(s(299));
    var o = !1, u = "", d = Zp, x = Qp, C = Fp, z = null;
    return i != null && (i.unstable_strictMode === !0 && (o = !0), i.identifierPrefix !== void 0 && (u = i.identifierPrefix), i.onUncaughtError !== void 0 && (d = i.onUncaughtError), i.onCaughtError !== void 0 && (x = i.onCaughtError), i.onRecoverableError !== void 0 && (C = i.onRecoverableError), i.formState !== void 0 && (z = i.formState)), n = _0(
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
      H0
    ), n.context = R0(null), i = n.current, o = Pe(), o = Qr(o), u = na(o), u.callback = null, aa(i, u, o), i = o, n.current.lanes = i, cl(n, i), Tn(n), t[ii] = n.current, Hc(t), new Go(n);
  }, es.version = "19.2.7", es;
}
var J0;
function KS() {
  if (J0) return uf.exports;
  J0 = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (e) {
        console.error(e);
      }
  }
  return a(), uf.exports = PS(), uf.exports;
}
var $i = KS(), hf = { exports: {} }, mf = {};
var W0;
function ZS() {
  if (W0) return mf;
  W0 = 1;
  var a = ws().__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  return mf.c = function(e) {
    return a.H.useMemoCache(e);
  }, mf;
}
var I0;
function QS() {
  return I0 || (I0 = 1, hf.exports = ZS()), hf.exports;
}
var wt = QS(), pf = { exports: {} }, yf = {};
var ty;
function FS() {
  if (ty) return yf;
  ty = 1;
  var a = ws();
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
  function p(v, b) {
    return b();
  }
  var g = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? p : h;
  return yf.useSyncExternalStore = a.useSyncExternalStore !== void 0 ? a.useSyncExternalStore : g, yf;
}
var ey;
function JS() {
  return ey || (ey = 1, pf.exports = FS()), pf.exports;
}
var WS = JS();
const IS = $S.useInsertionEffect, t4 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", e4 = t4 ? E.useLayoutEffect : E.useEffect, n4 = IS || e4, fv = (a) => {
  const e = E.useRef([a, (...l) => e[0](...l)]).current;
  return n4(() => {
    e[0] = a;
  }), e[1];
};
function Ud(a, e) {
  a.indexOf(e) === -1 && a.push(e);
}
function gr(a, e) {
  const l = a.indexOf(e);
  l > -1 && a.splice(l, 1);
}
const jn = (a, e, l) => l > e ? e : l < a ? a : l;
let kd = () => {
};
const Sa = {}, dv = (a) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(a), hv = (a) => typeof a == "object" && a !== null, mv = (a) => /^0[^.\s]+$/u.test(a);
// @__NO_SIDE_EFFECTS__
function pv(a) {
  let e;
  return () => (e === void 0 && (e = a()), e);
}
const on = /* @__NO_SIDE_EFFECTS__ */ (a) => a, Ts = (...a) => a.reduce((e, l) => (s) => l(e(s))), ms = /* @__NO_SIDE_EFFECTS__ */ (a, e, l) => {
  const s = e - a;
  return s ? (l - a) / s : 1;
};
class Hd {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return Ud(this.subscriptions, e), () => gr(this.subscriptions, e);
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
const Ke = /* @__NO_SIDE_EFFECTS__ */ (a) => a * 1e3, sn = /* @__NO_SIDE_EFFECTS__ */ (a) => a / 1e3, yv = /* @__NO_SIDE_EFFECTS__ */ (a, e) => e ? a * (1e3 / e) : 0, gv = (a, e, l) => (((1 - 3 * l + 3 * e) * a + (3 * l - 6 * e)) * a + 3 * e) * a, a4 = 1e-7, i4 = 12;
function l4(a, e, l, s, r) {
  let c, f, h = 0;
  do
    f = e + (l - e) / 2, c = gv(f, s, r) - a, c > 0 ? l = f : e = f;
  while (Math.abs(c) > a4 && ++h < i4);
  return f;
}
// @__NO_SIDE_EFFECTS__
function Cs(a, e, l, s) {
  if (a === e && l === s)
    return on;
  const r = (c) => l4(c, 0, 1, a, l);
  return (c) => c === 0 || c === 1 ? c : gv(r(c), e, s);
}
const vv = /* @__NO_SIDE_EFFECTS__ */ (a) => (e) => e <= 0.5 ? a(2 * e) / 2 : (2 - a(2 * (1 - e))) / 2, bv = /* @__NO_SIDE_EFFECTS__ */ (a) => (e) => 1 - a(1 - e), xv = /* @__PURE__ */ Cs(0.33, 1.53, 0.69, 0.99), qd = /* @__PURE__ */ bv(xv), Sv = /* @__PURE__ */ vv(qd), wv = (a) => a >= 1 ? 1 : (a *= 2) < 1 ? 0.5 * qd(a) : 0.5 * (2 - Math.pow(2, -10 * (a - 1))), $d = (a) => 1 - Math.sin(Math.acos(a)), Tv = /* @__PURE__ */ bv($d), Cv = /* @__PURE__ */ vv($d), s4 = /* @__PURE__ */ Cs(0.42, 0, 1, 1), o4 = /* @__PURE__ */ Cs(0, 0, 0.58, 1), Ev = /* @__PURE__ */ Cs(0.42, 0, 0.58, 1), r4 = /* @__NO_SIDE_EFFECTS__ */ (a) => Array.isArray(a) && typeof a[0] != "number", Av = /* @__NO_SIDE_EFFECTS__ */ (a) => Array.isArray(a) && typeof a[0] == "number", u4 = {
  linear: on,
  easeIn: s4,
  easeInOut: Ev,
  easeOut: o4,
  circIn: $d,
  circInOut: Cv,
  circOut: Tv,
  backIn: qd,
  backInOut: Sv,
  backOut: xv,
  anticipate: wv
}, c4 = (a) => typeof a == "string", ny = (a) => {
  if (/* @__PURE__ */ Av(a)) {
    kd(a.length === 4);
    const [e, l, s, r] = a;
    return /* @__PURE__ */ Cs(e, l, s, r);
  } else if (c4(a))
    return u4[a];
  return a;
}, Gd = E.createContext({}), Yd = E.createContext({ strict: !1 }), Xd = E.createContext({
  transformPagePoint: (a) => a,
  isStatic: !1,
  reducedMotion: "never"
}), Nr = /* @__PURE__ */ E.createContext({}), Xo = [
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
function f4(a) {
  let e = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), s = !1, r = !1;
  const c = /* @__PURE__ */ new WeakSet();
  let f = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function h(p) {
    c.has(p) && (y.schedule(p), a()), p(f);
  }
  const y = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (p, g = !1, v = !1) => {
      const T = v && s ? e : l;
      return g && c.add(p), T.add(p), p;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (p) => {
      l.delete(p), c.delete(p);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (p) => {
      if (f = p, s) {
        r = !0;
        return;
      }
      s = !0;
      const g = e;
      e = l, l = g, e.forEach(h), e.clear(), s = !1, r && (r = !1, y.process(p));
    }
  };
  return y;
}
const d4 = 40;
function jv(a, e) {
  let l = !1, s = !0;
  const r = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, c = () => l = !0, f = Xo.reduce((j, M) => (j[M] = f4(c), j), {}), { setup: h, read: y, resolveKeyframes: p, preUpdate: g, update: v, preRender: b, render: T, postRender: S } = f, w = () => {
    const j = Sa.useManualTiming, M = j ? r.timestamp : performance.now();
    l = !1, j || (r.delta = s ? 1e3 / 60 : Math.max(Math.min(M - r.timestamp, d4), 1)), r.timestamp = M, r.isProcessing = !0, h.process(r), y.process(r), p.process(r), g.process(r), v.process(r), b.process(r), T.process(r), S.process(r), r.isProcessing = !1, l && e && (s = !1, a(w));
  }, A = () => {
    l = !0, s = !0, r.isProcessing || a(w);
  };
  return { schedule: Xo.reduce((j, M) => {
    const V = f[M];
    return j[M] = (B, R = !1, k = !1) => (l || A(), V.schedule(B, R, k)), j;
  }, {}), cancel: (j) => {
    for (let M = 0; M < Xo.length; M++)
      f[Xo[M]].cancel(j);
  }, state: r, steps: f };
}
const { schedule: $t, cancel: wa, state: we, steps: gf } = /* @__PURE__ */ jv(typeof requestAnimationFrame < "u" ? requestAnimationFrame : on, !0);
let or;
function h4() {
  or = void 0;
}
const Me = {
  now: () => (or === void 0 && Me.set(we.isProcessing || Sa.useManualTiming ? we.timestamp : performance.now()), or),
  set: (a) => {
    or = a, queueMicrotask(h4);
  }
}, Mv = (a) => (e) => typeof e == "string" && e.startsWith(a), _v = /* @__PURE__ */ Mv("--"), m4 = /* @__PURE__ */ Mv("var(--"), Pd = (a) => m4(a) ? p4.test(a.split("/*")[0].trim()) : !1, p4 = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function ay(a) {
  return typeof a != "string" ? !1 : a.split("/*")[0].includes("var(--");
}
const nl = {
  test: (a) => typeof a == "number",
  parse: parseFloat,
  transform: (a) => a
}, ps = {
  ...nl,
  transform: (a) => jn(0, 1, a)
}, Po = {
  ...nl,
  default: 1
}, us = (a) => Math.round(a * 1e5) / 1e5, Kd = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function y4(a) {
  return a == null;
}
const g4 = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Zd = (a, e) => (l) => !!(typeof l == "string" && g4.test(l) && l.startsWith(a) || e && !y4(l) && Object.prototype.hasOwnProperty.call(l, e)), Rv = (a, e, l) => (s) => {
  if (typeof s != "string")
    return s;
  const [r, c, f, h] = s.match(Kd);
  return {
    [a]: parseFloat(r),
    [e]: parseFloat(c),
    [l]: parseFloat(f),
    alpha: h !== void 0 ? parseFloat(h) : 1
  };
}, v4 = (a) => jn(0, 255, a), vf = {
  ...nl,
  transform: (a) => Math.round(v4(a))
}, Ia = {
  test: /* @__PURE__ */ Zd("rgb", "red"),
  parse: /* @__PURE__ */ Rv("red", "green", "blue"),
  transform: ({ red: a, green: e, blue: l, alpha: s = 1 }) => "rgba(" + vf.transform(a) + ", " + vf.transform(e) + ", " + vf.transform(l) + ", " + us(ps.transform(s)) + ")"
};
function b4(a) {
  let e = "", l = "", s = "", r = "";
  return a.length > 5 ? (e = a.substring(1, 3), l = a.substring(3, 5), s = a.substring(5, 7), r = a.substring(7, 9)) : (e = a.substring(1, 2), l = a.substring(2, 3), s = a.substring(3, 4), r = a.substring(4, 5), e += e, l += l, s += s, r += r), {
    red: parseInt(e, 16),
    green: parseInt(l, 16),
    blue: parseInt(s, 16),
    alpha: r ? parseInt(r, 16) / 255 : 1
  };
}
const If = {
  test: /* @__PURE__ */ Zd("#"),
  parse: b4,
  transform: Ia.transform
}, Es = /* @__NO_SIDE_EFFECTS__ */ (a) => ({
  test: (e) => typeof e == "string" && e.endsWith(a) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${a}`
}), Pn = /* @__PURE__ */ Es("deg"), An = /* @__PURE__ */ Es("%"), ct = /* @__PURE__ */ Es("px"), x4 = /* @__PURE__ */ Es("vh"), S4 = /* @__PURE__ */ Es("vw"), iy = {
  ...An,
  parse: (a) => An.parse(a) / 100,
  transform: (a) => An.transform(a * 100)
}, Yi = {
  test: /* @__PURE__ */ Zd("hsl", "hue"),
  parse: /* @__PURE__ */ Rv("hue", "saturation", "lightness"),
  transform: ({ hue: a, saturation: e, lightness: l, alpha: s = 1 }) => "hsla(" + Math.round(a) + ", " + An.transform(us(e)) + ", " + An.transform(us(l)) + ", " + us(ps.transform(s)) + ")"
}, ce = {
  test: (a) => Ia.test(a) || If.test(a) || Yi.test(a),
  parse: (a) => Ia.test(a) ? Ia.parse(a) : Yi.test(a) ? Yi.parse(a) : If.parse(a),
  transform: (a) => typeof a == "string" ? a : a.hasOwnProperty("red") ? Ia.transform(a) : Yi.transform(a),
  getAnimatableNone: (a) => {
    const e = ce.parse(a);
    return e.alpha = 0, ce.transform(e);
  }
}, w4 = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function T4(a) {
  return isNaN(a) && typeof a == "string" && (a.match(Kd)?.length || 0) + (a.match(w4)?.length || 0) > 0;
}
const Dv = "number", Nv = "color", C4 = "var", E4 = "var(", ly = "${}", A4 = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Wi(a) {
  const e = a.toString(), l = [], s = {
    color: [],
    number: [],
    var: []
  }, r = [];
  let c = 0;
  const h = e.replace(A4, (y) => (ce.test(y) ? (s.color.push(c), r.push(Nv), l.push(ce.parse(y))) : y.startsWith(E4) ? (s.var.push(c), r.push(C4), l.push(y)) : (s.number.push(c), r.push(Dv), l.push(parseFloat(y))), ++c, ly)).split(ly);
  return { values: l, split: h, indexes: s, types: r };
}
function j4(a) {
  return Wi(a).values;
}
function Ov({ split: a, types: e }) {
  const l = a.length;
  return (s) => {
    let r = "";
    for (let c = 0; c < l; c++)
      if (r += a[c], s[c] !== void 0) {
        const f = e[c];
        f === Dv ? r += us(s[c]) : f === Nv ? r += ce.transform(s[c]) : r += s[c];
      }
    return r;
  };
}
function M4(a) {
  return Ov(Wi(a));
}
const _4 = (a) => typeof a == "number" ? 0 : ce.test(a) ? ce.getAnimatableNone(a) : a, R4 = (a, e) => typeof a == "number" ? e?.trim().endsWith("/") ? a : 0 : _4(a);
function D4(a) {
  const e = Wi(a);
  return Ov(e)(e.values.map((s, r) => R4(s, e.split[r])));
}
const gn = {
  test: T4,
  parse: j4,
  createTransformer: M4,
  getAnimatableNone: D4
};
function bf(a, e, l) {
  return l < 0 && (l += 1), l > 1 && (l -= 1), l < 1 / 6 ? a + (e - a) * 6 * l : l < 1 / 2 ? e : l < 2 / 3 ? a + (e - a) * (2 / 3 - l) * 6 : a;
}
function N4({ hue: a, saturation: e, lightness: l, alpha: s }) {
  a /= 360, e /= 100, l /= 100;
  let r = 0, c = 0, f = 0;
  if (!e)
    r = c = f = l;
  else {
    const h = l < 0.5 ? l * (1 + e) : l + e - l * e, y = 2 * l - h;
    r = bf(y, h, a + 1 / 3), c = bf(y, h, a), f = bf(y, h, a - 1 / 3);
  }
  return {
    red: Math.round(r * 255),
    green: Math.round(c * 255),
    blue: Math.round(f * 255),
    alpha: s
  };
}
function vr(a, e) {
  return (l) => l > 0 ? e : a;
}
const qt = (a, e, l) => a + (e - a) * l, xf = (a, e, l) => {
  const s = a * a, r = l * (e * e - s) + s;
  return r < 0 ? 0 : Math.sqrt(r);
}, O4 = [If, Ia, Yi], z4 = (a) => O4.find((e) => e.test(a));
function sy(a) {
  const e = z4(a);
  if (!e)
    return !1;
  let l = e.parse(a);
  return e === Yi && (l = N4(l)), l;
}
const oy = (a, e) => {
  const l = sy(a), s = sy(e);
  if (!l || !s)
    return vr(a, e);
  const r = { ...l };
  return (c) => (r.red = xf(l.red, s.red, c), r.green = xf(l.green, s.green, c), r.blue = xf(l.blue, s.blue, c), r.alpha = qt(l.alpha, s.alpha, c), Ia.transform(r));
}, td = /* @__PURE__ */ new Set(["none", "hidden"]);
function L4(a, e) {
  return td.has(a) ? (l) => l <= 0 ? a : e : (l) => l >= 1 ? e : a;
}
function B4(a, e) {
  return (l) => qt(a, e, l);
}
function Qd(a) {
  return typeof a == "number" ? B4 : typeof a == "string" ? Pd(a) ? vr : ce.test(a) ? oy : k4 : Array.isArray(a) ? zv : typeof a == "object" ? ce.test(a) ? oy : V4 : vr;
}
function zv(a, e) {
  const l = [...a], s = l.length, r = a.map((c, f) => Qd(c)(c, e[f]));
  return (c) => {
    for (let f = 0; f < s; f++)
      l[f] = r[f](c);
    return l;
  };
}
function V4(a, e) {
  const l = { ...a, ...e }, s = {};
  for (const r in l)
    a[r] !== void 0 && e[r] !== void 0 && (s[r] = Qd(a[r])(a[r], e[r]));
  return (r) => {
    for (const c in s)
      l[c] = s[c](r);
    return l;
  };
}
function U4(a, e) {
  const l = [], s = { color: 0, var: 0, number: 0 };
  for (let r = 0; r < e.values.length; r++) {
    const c = e.types[r], f = a.indexes[c][s[c]], h = a.values[f] ?? 0;
    l[r] = h, s[c]++;
  }
  return l;
}
const k4 = (a, e) => {
  const l = gn.createTransformer(e), s = Wi(a), r = Wi(e);
  return s.indexes.var.length === r.indexes.var.length && s.indexes.color.length === r.indexes.color.length && s.indexes.number.length >= r.indexes.number.length ? td.has(a) && !r.values.length || td.has(e) && !s.values.length ? L4(a, e) : Ts(zv(U4(s, r), r.values), l) : vr(a, e);
};
function Lv(a, e, l) {
  return typeof a == "number" && typeof e == "number" && typeof l == "number" ? qt(a, e, l) : Qd(a)(a, e);
}
const H4 = (a) => {
  const e = ({ timestamp: l }) => a(l);
  return {
    start: (l = !0) => $t.update(e, l),
    stop: () => wa(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => we.isProcessing ? we.timestamp : Me.now()
  };
}, Bv = (a, e, l = 10) => {
  let s = "";
  const r = Math.max(Math.round(e / l), 2);
  for (let c = 0; c < r; c++)
    s += Math.round(a(c / (r - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, br = 2e4;
function Fd(a) {
  let e = 0;
  const l = 50;
  let s = a.next(e);
  for (; !s.done && e < br; )
    e += l, s = a.next(e);
  return e >= br ? 1 / 0 : e;
}
function q4(a, e = 100, l) {
  const s = l({ ...a, keyframes: [0, e] }), r = Math.min(Fd(s), br);
  return {
    type: "keyframes",
    ease: (c) => s.next(r * c).value / e,
    duration: /* @__PURE__ */ sn(r)
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
function ed(a, e) {
  return a * Math.sqrt(1 - e * e);
}
const $4 = 12;
function G4(a, e, l) {
  let s = l;
  for (let r = 1; r < $4; r++)
    s = s - a(s) / e(s);
  return s;
}
const Sf = 1e-3;
function Y4({ duration: a = It.duration, bounce: e = It.bounce, velocity: l = It.velocity, mass: s = It.mass }) {
  let r, c, f = 1 - e;
  f = jn(It.minDamping, It.maxDamping, f), a = jn(It.minDuration, It.maxDuration, /* @__PURE__ */ sn(a)), f < 1 ? (r = (p) => {
    const g = p * f, v = g * a, b = g - l, T = ed(p, f), S = Math.exp(-v);
    return Sf - b / T * S;
  }, c = (p) => {
    const v = p * f * a, b = v * l + l, T = Math.pow(f, 2) * Math.pow(p, 2) * a, S = Math.exp(-v), w = ed(Math.pow(p, 2), f);
    return (-r(p) + Sf > 0 ? -1 : 1) * ((b - T) * S) / w;
  }) : (r = (p) => {
    const g = Math.exp(-p * a), v = (p - l) * a + 1;
    return -Sf + g * v;
  }, c = (p) => {
    const g = Math.exp(-p * a), v = (l - p) * (a * a);
    return g * v;
  });
  const h = 5 / a, y = G4(r, c, h);
  if (a = /* @__PURE__ */ Ke(a), isNaN(y))
    return {
      stiffness: It.stiffness,
      damping: It.damping,
      duration: a
    };
  {
    const p = Math.pow(y, 2) * s;
    return {
      stiffness: p,
      damping: f * 2 * Math.sqrt(s * p),
      duration: a
    };
  }
}
const X4 = ["duration", "bounce"], P4 = ["stiffness", "damping", "mass"];
function ry(a, e) {
  return e.some((l) => a[l] !== void 0);
}
function K4(a) {
  let e = {
    velocity: It.velocity,
    stiffness: It.stiffness,
    damping: It.damping,
    mass: It.mass,
    isResolvedFromDuration: !1,
    ...a
  };
  if (!ry(a, P4) && ry(a, X4))
    if (e.velocity = 0, a.visualDuration) {
      const l = a.visualDuration, s = 2 * Math.PI / (l * 1.2), r = s * s, c = 2 * jn(0.05, 1, 1 - (a.bounce || 0)) * Math.sqrt(r);
      e = {
        ...e,
        mass: It.mass,
        stiffness: r,
        damping: c
      };
    } else {
      const l = Y4({ ...a, velocity: 0 });
      e = {
        ...e,
        ...l,
        mass: It.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function xr(a = It.visualDuration, e = It.bounce) {
  const l = typeof a != "object" ? {
    visualDuration: a,
    keyframes: [0, 1],
    bounce: e
  } : a;
  let { restSpeed: s, restDelta: r } = l;
  const c = l.keyframes[0], f = l.keyframes[l.keyframes.length - 1], h = { done: !1, value: c }, { stiffness: y, damping: p, mass: g, duration: v, velocity: b, isResolvedFromDuration: T } = K4({
    ...l,
    velocity: -/* @__PURE__ */ sn(l.velocity || 0)
  }), S = b || 0, w = p / (2 * Math.sqrt(y * g)), A = f - c, _ = /* @__PURE__ */ sn(Math.sqrt(y / g)), D = Math.abs(A) < 5;
  s || (s = D ? It.restSpeed.granular : It.restSpeed.default), r || (r = D ? It.restDelta.granular : It.restDelta.default);
  let j, M, V, B, R, k;
  if (w < 1)
    V = ed(_, w), B = (S + w * _ * A) / V, j = (K) => {
      const at = Math.exp(-w * _ * K);
      return f - at * (B * Math.sin(V * K) + A * Math.cos(V * K));
    }, R = w * _ * B + A * V, k = w * _ * A - B * V, M = (K) => Math.exp(-w * _ * K) * (R * Math.sin(V * K) + k * Math.cos(V * K));
  else if (w === 1) {
    j = (at) => f - Math.exp(-_ * at) * (A + (S + _ * A) * at);
    const K = S + _ * A;
    M = (at) => Math.exp(-_ * at) * (_ * K * at - S);
  } else {
    const K = _ * Math.sqrt(w * w - 1);
    j = (Q) => {
      const et = Math.exp(-w * _ * Q), N = Math.min(K * Q, 300);
      return f - et * ((S + w * _ * A) * Math.sinh(N) + K * A * Math.cosh(N)) / K;
    };
    const at = (S + w * _ * A) / K, nt = w * _ * at - A * K, I = w * _ * A - at * K;
    M = (Q) => {
      const et = Math.exp(-w * _ * Q), N = Math.min(K * Q, 300);
      return et * (nt * Math.sinh(N) + I * Math.cosh(N));
    };
  }
  const P = {
    calculatedDuration: T && v || null,
    velocity: (K) => /* @__PURE__ */ Ke(M(K)),
    next: (K) => {
      if (!T && w < 1) {
        const nt = Math.exp(-w * _ * K), I = Math.sin(V * K), Q = Math.cos(V * K), et = f - nt * (B * I + A * Q), N = /* @__PURE__ */ Ke(nt * (R * I + k * Q));
        return h.done = Math.abs(N) <= s && Math.abs(f - et) <= r, h.value = h.done ? f : et, h;
      }
      const at = j(K);
      if (T)
        h.done = K >= v;
      else {
        const nt = /* @__PURE__ */ Ke(M(K));
        h.done = Math.abs(nt) <= s && Math.abs(f - at) <= r;
      }
      return h.value = h.done ? f : at, h;
    },
    toString: () => {
      const K = Math.min(Fd(P), br), at = Bv((nt) => P.next(K * nt).value, K, 30);
      return K + "ms " + at;
    },
    toTransition: () => {
    }
  };
  return P;
}
xr.applyToOptions = (a) => {
  const e = q4(a, 100, xr);
  return a.ease = e.ease, a.duration = /* @__PURE__ */ Ke(e.duration), a.type = "keyframes", a;
};
const Z4 = 5;
function Vv(a, e, l) {
  const s = Math.max(e - Z4, 0);
  return /* @__PURE__ */ yv(l - a(s), e - s);
}
function nd({ keyframes: a, velocity: e = 0, power: l = 0.8, timeConstant: s = 325, bounceDamping: r = 10, bounceStiffness: c = 500, modifyTarget: f, min: h, max: y, restDelta: p = 0.5, restSpeed: g }) {
  const v = a[0], b = {
    done: !1,
    value: v
  }, T = (k) => h !== void 0 && k < h || y !== void 0 && k > y, S = (k) => h === void 0 ? y : y === void 0 || Math.abs(h - k) < Math.abs(y - k) ? h : y;
  let w = l * e;
  const A = v + w, _ = f === void 0 ? A : f(A);
  _ !== A && (w = _ - v);
  const D = (k) => -w * Math.exp(-k / s), j = (k) => _ + D(k), M = (k) => {
    const P = D(k), K = j(k);
    b.done = Math.abs(P) <= p, b.value = b.done ? _ : K;
  };
  let V, B;
  const R = (k) => {
    T(b.value) && (V = k, B = xr({
      keyframes: [b.value, S(b.value)],
      velocity: Vv(j, k, b.value),
      // TODO: This should be passing * 1000
      damping: r,
      stiffness: c,
      restDelta: p,
      restSpeed: g
    }));
  };
  return R(0), {
    calculatedDuration: null,
    next: (k) => {
      let P = !1;
      return !B && V === void 0 && (P = !0, M(k), R(k)), V !== void 0 && k >= V ? B.next(k - V) : (!P && M(k), b);
    }
  };
}
function Q4(a, e, l) {
  const s = [], r = l || Sa.mix || Lv, c = a.length - 1;
  for (let f = 0; f < c; f++) {
    let h = r(a[f], a[f + 1]);
    if (e) {
      const y = Array.isArray(e) ? e[f] || on : e;
      h = Ts(y, h);
    }
    s.push(h);
  }
  return s;
}
function F4(a, e, { clamp: l = !0, ease: s, mixer: r } = {}) {
  const c = a.length;
  if (kd(c === e.length), c === 1)
    return () => e[0];
  if (c === 2 && e[0] === e[1])
    return () => e[1];
  const f = a[0] === a[1];
  a[0] > a[c - 1] && (a = [...a].reverse(), e = [...e].reverse());
  const h = Q4(e, s, r), y = h.length, p = (g) => {
    if (f && g < a[0])
      return e[0];
    let v = 0;
    if (y > 1)
      for (; v < a.length - 2 && !(g < a[v + 1]); v++)
        ;
    const b = /* @__PURE__ */ ms(a[v], a[v + 1], g);
    return h[v](b);
  };
  return l ? (g) => p(jn(a[0], a[c - 1], g)) : p;
}
function J4(a, e) {
  const l = a[a.length - 1];
  for (let s = 1; s <= e; s++) {
    const r = /* @__PURE__ */ ms(0, e, s);
    a.push(qt(l, 1, r));
  }
}
function W4(a) {
  const e = [0];
  return J4(e, a.length - 1), e;
}
function I4(a, e) {
  return a.map((l) => l * e);
}
function t5(a, e) {
  return a.map(() => e || Ev).splice(0, a.length - 1);
}
function cs({ duration: a = 300, keyframes: e, times: l, ease: s = "easeInOut" }) {
  const r = /* @__PURE__ */ r4(s) ? s.map(ny) : ny(s), c = {
    done: !1,
    value: e[0]
  }, f = I4(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    l && l.length === e.length ? l : W4(e),
    a
  ), h = F4(f, e, {
    ease: Array.isArray(r) ? r : t5(e, r)
  });
  return {
    calculatedDuration: a,
    next: (y) => (c.value = h(y), c.done = y >= a, c)
  };
}
const e5 = (a) => a !== null;
function Or(a, { repeat: e, repeatType: l = "loop" }, s, r = 1) {
  const c = a.filter(e5), h = r < 0 || e && l !== "loop" && e % 2 === 1 ? 0 : c.length - 1;
  return !h || s === void 0 ? c[h] : s;
}
const n5 = {
  decay: nd,
  inertia: nd,
  tween: cs,
  keyframes: cs,
  spring: xr
};
function Uv(a) {
  typeof a.type == "string" && (a.type = n5[a.type]);
}
class Jd {
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
const a5 = (a) => a / 100;
class Sr extends Jd {
  constructor(e) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: l } = this.options;
      l && l.updatedAt !== Me.now() && this.tick(Me.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: e } = this;
    Uv(e);
    const { type: l = cs, repeat: s = 0, repeatDelay: r = 0, repeatType: c, velocity: f = 0 } = e;
    let { keyframes: h } = e;
    const y = l || cs;
    y !== cs && typeof h[0] != "number" && (this.mixKeyframes = Ts(a5, Lv(h[0], h[1])), h = [0, 100]);
    const p = y({ ...e, keyframes: h });
    c === "mirror" && (this.mirroredGenerator = y({
      ...e,
      keyframes: [...h].reverse(),
      velocity: -f
    })), p.calculatedDuration === null && (p.calculatedDuration = Fd(p));
    const { calculatedDuration: g } = p;
    this.calculatedDuration = g, this.resolvedDuration = g + r, this.totalDuration = this.resolvedDuration * (s + 1) - r, this.generator = p;
  }
  updateTime(e) {
    const l = Math.round(e - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = l;
  }
  tick(e, l = !1) {
    const { generator: s, totalDuration: r, mixKeyframes: c, mirroredGenerator: f, resolvedDuration: h, calculatedDuration: y } = this;
    if (this.startTime === null)
      return s.next(0);
    const { delay: p = 0, keyframes: g, repeat: v, repeatType: b, repeatDelay: T, type: S, onUpdate: w, finalKeyframe: A } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - r / this.speed, this.startTime)), l ? this.currentTime = e : this.updateTime(e);
    const _ = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), D = this.playbackSpeed >= 0 ? _ < 0 : _ > r;
    this.currentTime = Math.max(_, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = r);
    let j = this.currentTime, M = s;
    if (v) {
      const k = Math.min(this.currentTime, r) / h;
      let P = Math.floor(k), K = k % 1;
      !K && k >= 1 && (K = 1), K === 1 && P--, P = Math.min(P, v + 1), !!(P % 2) && (b === "reverse" ? (K = 1 - K, T && (K -= T / h)) : b === "mirror" && (M = f)), j = jn(0, 1, K) * h;
    }
    let V;
    D ? (this.delayState.value = g[0], V = this.delayState) : V = M.next(j), c && !D && (V.value = c(V.value));
    let { done: B } = V;
    !D && y !== null && (B = this.playbackSpeed >= 0 ? this.currentTime >= r : this.currentTime <= 0);
    const R = this.holdTime === null && (this.state === "finished" || this.state === "running" && B);
    return R && S !== nd && (V.value = Or(g, this.options, A, this.speed)), w && w(V.value), R && this.finish(), V;
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
    return /* @__PURE__ */ sn(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ sn(e);
  }
  get time() {
    return /* @__PURE__ */ sn(this.currentTime);
  }
  set time(e) {
    e = /* @__PURE__ */ Ke(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = e, this.tick(e));
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
    return Vv((s) => this.generator.next(s).value, e, l);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    const l = this.playbackSpeed !== e;
    l && this.driver && this.updateTime(Me.now()), this.playbackSpeed = e, l && this.driver && (this.time = /* @__PURE__ */ sn(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: e = H4, startTime: l } = this.options;
    this.driver || (this.driver = e((r) => this.tick(r))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = l ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(Me.now()), this.holdTime = this.currentTime;
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
function i5(a) {
  for (let e = 1; e < a.length; e++)
    a[e] ?? (a[e] = a[e - 1]);
}
const ti = (a) => a * 180 / Math.PI, ad = (a) => {
  const e = ti(Math.atan2(a[1], a[0]));
  return id(e);
}, l5 = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (a) => (Math.abs(a[0]) + Math.abs(a[3])) / 2,
  rotate: ad,
  rotateZ: ad,
  skewX: (a) => ti(Math.atan(a[1])),
  skewY: (a) => ti(Math.atan(a[2])),
  skew: (a) => (Math.abs(a[1]) + Math.abs(a[2])) / 2
}, id = (a) => (a = a % 360, a < 0 && (a += 360), a), uy = ad, cy = (a) => Math.sqrt(a[0] * a[0] + a[1] * a[1]), fy = (a) => Math.sqrt(a[4] * a[4] + a[5] * a[5]), s5 = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: cy,
  scaleY: fy,
  scale: (a) => (cy(a) + fy(a)) / 2,
  rotateX: (a) => id(ti(Math.atan2(a[6], a[5]))),
  rotateY: (a) => id(ti(Math.atan2(-a[2], a[0]))),
  rotateZ: uy,
  rotate: uy,
  skewX: (a) => ti(Math.atan(a[4])),
  skewY: (a) => ti(Math.atan(a[1])),
  skew: (a) => (Math.abs(a[1]) + Math.abs(a[4])) / 2
};
function ld(a) {
  return a.includes("scale") ? 1 : 0;
}
function sd(a, e) {
  if (!a || a === "none")
    return ld(e);
  const l = a.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, r;
  if (l)
    s = s5, r = l;
  else {
    const h = a.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = l5, r = h;
  }
  if (!r)
    return ld(e);
  const c = s[e], f = r[1].split(",").map(r5);
  return typeof c == "function" ? c(f) : f[c];
}
const o5 = (a, e) => {
  const { transform: l = "none" } = getComputedStyle(a);
  return sd(l, e);
};
function r5(a) {
  return parseFloat(a.trim());
}
const al = [
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
], il = /* @__PURE__ */ new Set([...al, "pathRotation"]), dy = (a) => a === nl || a === ct, u5 = /* @__PURE__ */ new Set(["x", "y", "z"]), c5 = al.filter((a) => !u5.has(a));
function f5(a) {
  const e = [];
  return c5.forEach((l) => {
    const s = a.getValue(l);
    s !== void 0 && (e.push([l, s.get()]), s.set(l.startsWith("scale") ? 1 : 0));
  }), e;
}
const xa = {
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
  x: (a, { transform: e }) => sd(e, "x"),
  y: (a, { transform: e }) => sd(e, "y")
};
xa.translateX = xa.x;
xa.translateY = xa.y;
const ni = /* @__PURE__ */ new Set();
let od = !1, rd = !1, ud = !1;
function kv() {
  if (rd) {
    const a = Array.from(ni).filter((s) => s.needsMeasurement), e = new Set(a.map((s) => s.element)), l = /* @__PURE__ */ new Map();
    e.forEach((s) => {
      const r = f5(s);
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
  rd = !1, od = !1, ni.forEach((a) => a.complete(ud)), ni.clear();
}
function Hv() {
  ni.forEach((a) => {
    a.readKeyframes(), a.needsMeasurement && (rd = !0);
  });
}
function d5() {
  ud = !0, Hv(), kv(), ud = !1;
}
class Wd {
  constructor(e, l, s, r, c, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = l, this.name = s, this.motionValue = r, this.element = c, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (ni.add(this), od || (od = !0, $t.read(Hv), $t.resolveKeyframes(kv))) : (this.readKeyframes(), this.complete());
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
    i5(e);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), ni.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (ni.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const h5 = (a) => a.startsWith("--");
function qv(a, e, l) {
  h5(e) ? a.style.setProperty(e, l) : a.style[e] = l;
}
const m5 = {};
function $v(a, e) {
  const l = /* @__PURE__ */ pv(a);
  return () => m5[e] ?? l();
}
const p5 = /* @__PURE__ */ $v(() => window.ScrollTimeline !== void 0, "scrollTimeline"), Gv = /* @__PURE__ */ $v(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), ls = ([a, e, l, s]) => `cubic-bezier(${a}, ${e}, ${l}, ${s})`, hy = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ ls([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ ls([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ ls([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ ls([0.33, 1.53, 0.69, 0.99])
};
function Yv(a, e) {
  if (a)
    return typeof a == "function" ? Gv() ? Bv(a, e) : "ease-out" : /* @__PURE__ */ Av(a) ? ls(a) : Array.isArray(a) ? a.map((l) => Yv(l, e) || hy.easeOut) : hy[a];
}
function y5(a, e, l, { delay: s = 0, duration: r = 300, repeat: c = 0, repeatType: f = "loop", ease: h = "easeOut", times: y } = {}, p = void 0) {
  const g = {
    [e]: l
  };
  y && (g.offset = y);
  const v = Yv(h, r);
  Array.isArray(v) && (g.easing = v);
  const b = {
    delay: s,
    duration: r,
    easing: Array.isArray(v) ? "linear" : v,
    fill: "both",
    iterations: c + 1,
    direction: f === "reverse" ? "alternate" : "normal"
  };
  return p && (b.pseudoElement = p), a.animate(g, b);
}
function Xv(a) {
  return typeof a == "function" && "applyToOptions" in a;
}
function g5({ type: a, ...e }) {
  return Xv(a) && Gv() ? a.applyToOptions(e) : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
}
class Pv extends Jd {
  constructor(e) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e)
      return;
    const { element: l, name: s, keyframes: r, pseudoElement: c, allowFlatten: f = !1, finalKeyframe: h, onComplete: y } = e;
    this.isPseudoElement = !!c, this.allowFlatten = f, this.options = e, kd(typeof e.type != "string");
    const p = g5(e);
    this.animation = y5(l, s, r, p, c), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !c) {
        const g = Or(r, this.options, h, this.speed);
        this.updateMotionValue && this.updateMotionValue(g), qv(l, s, g), this.animation.cancel();
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
    return /* @__PURE__ */ sn(Number(e));
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ sn(e);
  }
  get time() {
    return /* @__PURE__ */ sn(Number(this.animation.currentTime) || 0);
  }
  set time(e) {
    const l = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ Ke(e), l && this.animation.pause();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && p5() ? (this.animation.timeline = e, l && (this.animation.rangeStart = l), s && (this.animation.rangeEnd = s), on) : r(this);
  }
}
const Kv = {
  anticipate: wv,
  backInOut: Sv,
  circInOut: Cv
};
function v5(a) {
  return a in Kv;
}
function b5(a) {
  typeof a.ease == "string" && v5(a.ease) && (a.ease = Kv[a.ease]);
}
const wf = 10;
class x5 extends Pv {
  constructor(e) {
    b5(e), Uv(e), super(e), e.startTime !== void 0 && e.autoplay !== !1 && (this.startTime = e.startTime), this.options = e;
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
    const h = new Sr({
      ...f,
      autoplay: !1
    }), y = Math.max(wf, Me.now() - this.startTime), p = jn(0, wf, y - wf), g = h.sample(y).value, { name: v } = this.options;
    c && v && qv(c, v, g), l.setWithVelocity(h.sample(Math.max(0, y - p)).value, g, p), h.stop();
  }
}
const my = (a, e) => e === "zIndex" ? !1 : !!(typeof a == "number" || Array.isArray(a) || typeof a == "string" && // It's animatable if we have a string
(gn.test(a) || a === "0") && // And it contains numbers and/or colors
!a.startsWith("url("));
function S5(a) {
  const e = a[0];
  if (a.length === 1)
    return !0;
  for (let l = 0; l < a.length; l++)
    if (a[l] !== e)
      return !0;
}
function w5(a, e, l, s) {
  const r = a[0];
  if (r === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const c = a[a.length - 1], f = my(r, e), h = my(c, e);
  return !f || !h ? !1 : S5(a) || (l === "spring" || Xv(l)) && s;
}
function cd(a) {
  a.duration = 0, a.type = "keyframes";
}
const Zv = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), T5 = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function C5(a) {
  for (let e = 0; e < a.length; e++)
    if (typeof a[e] == "string" && T5.test(a[e]))
      return !0;
  return !1;
}
const E5 = /* @__PURE__ */ new Set([
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
]), A5 = /* @__PURE__ */ pv(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function j5(a) {
  const { motionValue: e, name: l, repeatDelay: s, repeatType: r, damping: c, type: f, keyframes: h } = a;
  if (!(e?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: p, transformTemplate: g } = e.owner.getProps();
  return A5() && l && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (Zv.has(l) || E5.has(l) && C5(h)) && (l !== "transform" || !g) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !p && !s && r !== "mirror" && c !== 0 && f !== "inertia";
}
const M5 = 40;
class _5 extends Jd {
  constructor({ autoplay: e = !0, delay: l = 0, type: s = "keyframes", repeat: r = 0, repeatDelay: c = 0, repeatType: f = "loop", keyframes: h, name: y, motionValue: p, element: g, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = Me.now();
    const b = {
      autoplay: e,
      delay: l,
      type: s,
      repeat: r,
      repeatDelay: c,
      repeatType: f,
      name: y,
      motionValue: p,
      element: g,
      ...v
    }, T = g?.KeyframeResolver || Wd;
    this.keyframeResolver = new T(h, (S, w, A) => this.onKeyframesResolved(S, w, b, !A), y, p, g), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(e, l, s, r) {
    this.keyframeResolver = void 0;
    const { name: c, type: f, velocity: h, delay: y, isHandoff: p, onUpdate: g } = s;
    this.resolvedAt = Me.now();
    let v = !0;
    w5(e, c, f, h) || (v = !1, (Sa.instantAnimations || !y) && g?.(Or(e, s, l)), e[0] = e[e.length - 1], cd(s), s.repeat = 0);
    const T = {
      startTime: r ? this.resolvedAt ? this.resolvedAt - this.createdAt > M5 ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: l,
      ...s,
      keyframes: e
    }, S = v && !p && j5(T), w = T.motionValue?.owner?.current;
    let A;
    if (S)
      try {
        A = new x5({
          ...T,
          element: w
        });
      } catch {
        A = new Sr(T);
      }
    else
      A = new Sr(T);
    A.finished.then(() => {
      this.notifyFinished();
    }).catch(on), this.pendingTimeline && (this.stopTimeline = A.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = A;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(e, l) {
    return this.finished.finally(e).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), d5()), this._animation;
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
function Qv(a, e, l, s = 0, r = 1) {
  const c = Array.from(a).sort((p, g) => p.sortNodePosition(g)).indexOf(e), f = a.size, h = (f - 1) * s;
  return typeof l == "function" ? l(c, f) : r === 1 ? c * s : h - c * s;
}
const py = 30, R5 = (a) => !isNaN(parseFloat(a));
class D5 {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(e, l = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const r = Me.now();
      if (this.updatedAt !== r && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const c of this.dependents)
          c.dirty();
    }, this.hasAnimated = !1, this.setCurrent(e), this.owner = l.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = Me.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = R5(this.current));
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
    this.events[e] || (this.events[e] = new Hd());
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
    const e = Me.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > py)
      return 0;
    const l = Math.min(this.updatedAt - this.prevUpdatedAt, py);
    return /* @__PURE__ */ yv(parseFloat(this.current) - parseFloat(this.prevFrameValue), l);
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
function Ii(a, e) {
  return new D5(a, e);
}
function Fv(a, e) {
  if (a?.inherit && e) {
    const { inherit: l, ...s } = a;
    return { ...e, ...s };
  }
  return a;
}
function Id(a, e) {
  const l = a?.[e] ?? a?.default ?? a;
  return l !== a ? Fv(l, a) : l;
}
const N5 = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, O5 = (a) => ({
  type: "spring",
  stiffness: 550,
  damping: a === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), z5 = {
  type: "keyframes",
  duration: 0.8
}, L5 = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, B5 = (a, { keyframes: e }) => e.length > 2 ? z5 : il.has(a) ? a.startsWith("scale") ? O5(e[1]) : N5 : L5, V5 = /* @__PURE__ */ new Set([
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
function U5(a) {
  for (const e in a)
    if (!V5.has(e))
      return !0;
  return !1;
}
const th = (a, e, l, s = {}, r, c) => (f) => {
  const h = Id(s, a) || {}, y = h.delay || s.delay || 0;
  let { elapsed: p = 0 } = s;
  p = p - /* @__PURE__ */ Ke(y);
  const g = {
    keyframes: Array.isArray(l) ? l : [null, l],
    ease: "easeOut",
    velocity: e.getVelocity(),
    ...h,
    delay: -p,
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
  U5(h) || Object.assign(g, B5(a, g)), g.duration && (g.duration = /* @__PURE__ */ Ke(g.duration)), g.repeatDelay && (g.repeatDelay = /* @__PURE__ */ Ke(g.repeatDelay)), g.from !== void 0 && (g.keyframes[0] = g.from);
  let v = !1;
  if ((g.type === !1 || g.duration === 0 && !g.repeatDelay) && (cd(g), g.delay === 0 && (v = !0)), (Sa.instantAnimations || Sa.skipAnimations || r?.shouldSkipAnimations || h.skipAnimations) && (v = !0, cd(g), g.delay = 0), g.allowFlatten = !h.type && !h.ease, v && !c && e.get() !== void 0) {
    const b = Or(g.keyframes, h);
    if (b !== void 0) {
      $t.update(() => {
        g.onUpdate(b), g.onComplete();
      });
      return;
    }
  }
  return h.isSync ? new Sr(g) : new _5(g);
}, k5 = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function H5(a) {
  const e = k5.exec(a);
  if (!e)
    return [,];
  const [, l, s, r] = e;
  return [`--${l ?? s}`, r];
}
function Jv(a, e, l = 1) {
  const [s, r] = H5(a);
  if (!s)
    return;
  const c = window.getComputedStyle(e).getPropertyValue(s);
  if (c) {
    const f = c.trim();
    return dv(f) ? parseFloat(f) : f;
  }
  return Pd(r) ? Jv(r, e, l + 1) : r;
}
function yy(a) {
  const e = [{}, {}];
  return a?.values.forEach((l, s) => {
    e[0][s] = l.get(), e[1][s] = l.getVelocity();
  }), e;
}
function eh(a, e, l, s) {
  if (typeof e == "function") {
    const [r, c] = yy(s);
    e = e(l !== void 0 ? l : a.custom, r, c);
  }
  if (typeof e == "string" && (e = a.variants && a.variants[e]), typeof e == "function") {
    const [r, c] = yy(s);
    e = e(l !== void 0 ? l : a.custom, r, c);
  }
  return e;
}
function ai(a, e, l) {
  const s = a.getProps();
  return eh(s, e, l !== void 0 ? l : s.custom, a);
}
const Wv = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...al
]), fd = (a) => Array.isArray(a);
function q5(a, e, l) {
  a.hasValue(e) ? a.getValue(e).set(l) : a.addValue(e, Ii(l));
}
function $5(a) {
  return fd(a) ? a[a.length - 1] || 0 : a;
}
function G5(a, e) {
  const l = ai(a, e);
  let { transitionEnd: s = {}, transition: r = {}, ...c } = l || {};
  c = { ...c, ...s };
  for (const f in c) {
    const h = $5(c[f]);
    q5(a, f, h);
  }
}
const Te = (a) => !!(a && a.getVelocity);
function Y5(a) {
  return !!(Te(a) && a.add);
}
function dd(a, e) {
  const l = a.getValue("willChange");
  if (Y5(l))
    return l.add(e);
  if (!l && Sa.WillChange) {
    const s = new Sa.WillChange("auto");
    a.addValue("willChange", s), s.add(e);
  }
}
function nh(a) {
  return a.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
const X5 = "framerAppearId", Iv = "data-" + nh(X5);
function t2(a) {
  return a.props[Iv];
}
function P5({ protectedKeys: a, needsAnimating: e }, l) {
  const s = a.hasOwnProperty(l) && e[l] !== !0;
  return e[l] = !1, s;
}
function e2(a, e, { delay: l = 0, transitionOverride: s, type: r } = {}) {
  let { transition: c, transitionEnd: f, ...h } = e;
  const y = a.getDefaultTransition();
  c = c ? Fv(c, y) : y;
  const p = c?.reduceMotion, g = c?.skipAnimations;
  s && (c = s);
  const v = [], b = r && a.animationState && a.animationState.getState()[r], T = c?.path;
  T && T.animateVisualElement(a, h, c, l, v);
  for (const S in h) {
    const w = a.getValue(S, a.latestValues[S] ?? null), A = h[S];
    if (A === void 0 || b && P5(b, S))
      continue;
    const _ = {
      delay: l,
      ...Id(c || {}, S)
    };
    g && (_.skipAnimations = !0);
    const D = w.get();
    if (D !== void 0 && !w.isAnimating() && !Array.isArray(A) && A === D && !_.velocity) {
      $t.update(() => w.set(A));
      continue;
    }
    let j = !1;
    if (window.MotionHandoffAnimation) {
      const B = t2(a);
      if (B) {
        const R = window.MotionHandoffAnimation(B, S, $t);
        R !== null && (_.startTime = R, j = !0);
      }
    }
    dd(a, S);
    const M = p ?? a.shouldReduceMotion;
    w.start(th(S, w, A, M && Wv.has(S) ? { type: !1 } : _, a, j));
    const V = w.animation;
    V && v.push(V);
  }
  if (f) {
    const S = () => $t.update(() => {
      f && G5(a, f);
    });
    v.length ? Promise.all(v).then(S) : S();
  }
  return v;
}
function hd(a, e, l = {}) {
  const s = ai(a, e, l.type === "exit" ? a.presenceContext?.custom : void 0);
  let { transition: r = a.getDefaultTransition() || {} } = s || {};
  l.transitionOverride && (r = l.transitionOverride);
  const c = s ? () => Promise.all(e2(a, s, l)) : () => Promise.resolve(), f = a.variantChildren && a.variantChildren.size ? (y = 0) => {
    const { delayChildren: p = 0, staggerChildren: g, staggerDirection: v } = r;
    return K5(a, e, y, p, g, v, l);
  } : () => Promise.resolve(), { when: h } = r;
  if (h) {
    const [y, p] = h === "beforeChildren" ? [c, f] : [f, c];
    return y().then(() => p());
  } else
    return Promise.all([c(), f(l.delay)]);
}
function K5(a, e, l = 0, s = 0, r = 0, c = 1, f) {
  const h = [];
  for (const y of a.variantChildren)
    y.notify("AnimationStart", e), h.push(hd(y, e, {
      ...f,
      delay: l + (typeof s == "function" ? 0 : s) + Qv(a.variantChildren, y, s, r, c)
    }).then(() => y.notify("AnimationComplete", e)));
  return Promise.all(h);
}
function Z5(a, e, l = {}) {
  a.notify("AnimationStart", e);
  let s;
  if (Array.isArray(e)) {
    const r = e.map((c) => hd(a, c, l));
    s = Promise.all(r);
  } else if (typeof e == "string")
    s = hd(a, e, l);
  else {
    const r = typeof e == "function" ? ai(a, e, l.custom) : e;
    s = Promise.all(e2(a, r, l));
  }
  return s.then(() => {
    a.notify("AnimationComplete", e);
  });
}
const Q5 = {
  test: (a) => a === "auto",
  parse: (a) => a
}, n2 = (a) => (e) => e.test(a), a2 = [nl, ct, An, Pn, S4, x4, Q5], gy = (a) => a2.find(n2(a));
function F5(a) {
  return typeof a == "number" ? a === 0 : a !== null ? a === "none" || a === "0" || mv(a) : !0;
}
const J5 = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function W5(a) {
  const [e, l] = a.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return a;
  const [s] = l.match(Kd) || [];
  if (!s)
    return a;
  const r = l.replace(s, "");
  let c = J5.has(e) ? 1 : 0;
  return s !== l && (c *= 100), e + "(" + c + r + ")";
}
const I5 = /\b([a-z-]*)\(.*?\)/gu, md = {
  ...gn,
  getAnimatableNone: (a) => {
    const e = a.match(I5);
    return e ? e.map(W5).join(" ") : a;
  }
}, pd = {
  ...gn,
  getAnimatableNone: (a) => {
    const e = gn.parse(a);
    return gn.createTransformer(a)(e.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, vy = {
  ...nl,
  transform: Math.round
}, t9 = {
  rotate: Pn,
  /**
   * Internal channel for `transition.path` orientToPath. Composed onto
   * `rotate` at the transform-build sites so the user's `rotate` is
   * never read or overwritten. Not part of `transformPropOrder`.
   */
  pathRotation: Pn,
  rotateX: Pn,
  rotateY: Pn,
  rotateZ: Pn,
  scale: Po,
  scaleX: Po,
  scaleY: Po,
  scaleZ: Po,
  skew: Pn,
  skewX: Pn,
  skewY: Pn,
  distance: ct,
  translateX: ct,
  translateY: ct,
  translateZ: ct,
  x: ct,
  y: ct,
  z: ct,
  perspective: ct,
  transformPerspective: ct,
  opacity: ps,
  originX: iy,
  originY: iy,
  originZ: ct
}, wr = {
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
  ...t9,
  zIndex: vy,
  // SVG
  fillOpacity: ps,
  strokeOpacity: ps,
  numOctaves: vy
}, e9 = {
  ...wr,
  // Color props
  color: ce,
  backgroundColor: ce,
  outlineColor: ce,
  fill: ce,
  stroke: ce,
  // Border props
  borderColor: ce,
  borderTopColor: ce,
  borderRightColor: ce,
  borderBottomColor: ce,
  borderLeftColor: ce,
  filter: md,
  WebkitFilter: md,
  mask: pd,
  WebkitMask: pd
}, i2 = (a) => e9[a], n9 = /* @__PURE__ */ new Set([md, pd]);
function l2(a, e) {
  let l = i2(a);
  return n9.has(l) || (l = gn), l.getAnimatableNone ? l.getAnimatableNone(e) : void 0;
}
const a9 = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function i9(a, e, l) {
  let s = 0, r;
  for (; s < a.length && !r; ) {
    const c = a[s];
    typeof c == "string" && !a9.has(c) && Wi(c).values.length && (r = a[s]), s++;
  }
  if (r && l)
    for (const c of e)
      a[c] = l2(l, r);
}
class l9 extends Wd {
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
      if (typeof v == "string" && (v = v.trim(), Pd(v))) {
        const b = Jv(v, l.current);
        b !== void 0 && (e[g] = b), g === e.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !Wv.has(s) || e.length !== 2)
      return;
    const [r, c] = e, f = gy(r), h = gy(c), y = ay(r), p = ay(c);
    if (y !== p && xa[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (f !== h)
      if (dy(f) && dy(h))
        for (let g = 0; g < e.length; g++) {
          const v = e[g];
          typeof v == "string" && (e[g] = parseFloat(v));
        }
      else xa[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: l } = this, s = [];
    for (let r = 0; r < e.length; r++)
      (e[r] === null || F5(e[r])) && s.push(r);
    s.length && i9(e, s, l);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: l, name: s } = this;
    if (!e || !e.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = xa[s](e.measureViewportBox(), window.getComputedStyle(e.current)), l[0] = this.measuredOrigin;
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
    s[c] = xa[l](e.measureViewportBox(), window.getComputedStyle(e.current)), f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f), this.removedTransforms?.length && this.removedTransforms.forEach(([h, y]) => {
      e.getValue(h).set(y);
    }), this.resolveNoneKeyframes();
  }
}
const ah = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
];
function s2(a, e, l) {
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
const yd = (a, e) => e && typeof a == "number" ? e.transform(a) : a;
function rr(a) {
  return hv(a) && "offsetHeight" in a && !("ownerSVGElement" in a);
}
const { schedule: ih } = /* @__PURE__ */ jv(queueMicrotask, !1), hn = {
  x: !1,
  y: !1
};
function o2() {
  return hn.x || hn.y;
}
function s9(a) {
  return a === "x" || a === "y" ? hn[a] ? null : (hn[a] = !0, () => {
    hn[a] = !1;
  }) : hn.x || hn.y ? null : (hn.x = hn.y = !0, () => {
    hn.x = hn.y = !1;
  });
}
function r2(a, e) {
  const l = s2(a), s = new AbortController(), r = {
    passive: !0,
    ...e,
    signal: s.signal
  };
  return [l, r, () => s.abort()];
}
function o9(a) {
  return !(a.pointerType === "touch" || o2());
}
function r9(a, e, l = {}) {
  const [s, r, c] = r2(a, l);
  return s.forEach((f) => {
    let h = !1, y = !1, p;
    const g = () => {
      f.removeEventListener("pointerleave", S);
    }, v = (A) => {
      p && (p(A), p = void 0), g();
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
      if (!o9(A))
        return;
      y = !1;
      const _ = e(f, A);
      typeof _ == "function" && (p = _, f.addEventListener("pointerleave", S, r));
    };
    f.addEventListener("pointerenter", w, r), f.addEventListener("pointerdown", T, r);
  }), c;
}
const u2 = (a, e) => e ? a === e ? !0 : u2(a, e.parentElement) : !1, lh = (a) => a.pointerType === "mouse" ? typeof a.button != "number" || a.button <= 0 : a.isPrimary !== !1, u9 = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function c9(a) {
  return u9.has(a.tagName) || a.isContentEditable === !0;
}
const f9 = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function d9(a) {
  return f9.has(a.tagName) || a.isContentEditable === !0;
}
const ur = /* @__PURE__ */ new WeakSet();
function by(a) {
  return (e) => {
    e.key === "Enter" && a(e);
  };
}
function Tf(a, e) {
  a.dispatchEvent(new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }));
}
const h9 = (a, e) => {
  const l = a.currentTarget;
  if (!l)
    return;
  const s = by(() => {
    if (ur.has(l))
      return;
    Tf(l, "down");
    const r = by(() => {
      Tf(l, "up");
    }), c = () => Tf(l, "cancel");
    l.addEventListener("keyup", r, e), l.addEventListener("blur", c, e);
  });
  l.addEventListener("keydown", s, e), l.addEventListener("blur", () => l.removeEventListener("keydown", s), e);
};
function xy(a) {
  return lh(a) && !o2();
}
const Sy = /* @__PURE__ */ new WeakSet();
function m9(a, e, l = {}) {
  const [s, r, c] = r2(a, l), f = (h) => {
    const y = h.currentTarget;
    if (!xy(h) || Sy.has(h))
      return;
    ur.add(y), l.stopPropagation && Sy.add(h);
    const p = e(y, h), g = { ...r, capture: !0 }, v = (S, w) => {
      window.removeEventListener("pointerup", b, g), window.removeEventListener("pointercancel", T, g), ur.has(y) && ur.delete(y), xy(S) && typeof p == "function" && p(S, { success: w });
    }, b = (S) => {
      v(S, y === window || y === document || l.useGlobalTarget || u2(y, S.target));
    }, T = (S) => {
      v(S, !1);
    };
    window.addEventListener("pointerup", b, g), window.addEventListener("pointercancel", T, g);
  };
  return s.forEach((h) => {
    (l.useGlobalTarget ? window : h).addEventListener("pointerdown", f, r), rr(h) && (h.addEventListener("focus", (p) => h9(p, r)), !c9(h) && !h.hasAttribute("tabindex") && (h.tabIndex = 0));
  }), c;
}
function sh(a) {
  return hv(a) && "ownerSVGElement" in a;
}
const cr = /* @__PURE__ */ new WeakMap();
let fr;
const c2 = (a, e, l) => (s, r) => r && r[0] ? r[0][a + "Size"] : sh(s) && "getBBox" in s ? s.getBBox()[e] : s[l], p9 = /* @__PURE__ */ c2("inline", "width", "offsetWidth"), y9 = /* @__PURE__ */ c2("block", "height", "offsetHeight");
function g9({ target: a, borderBoxSize: e }) {
  cr.get(a)?.forEach((l) => {
    l(a, {
      get width() {
        return p9(a, e);
      },
      get height() {
        return y9(a, e);
      }
    });
  });
}
function v9(a) {
  a.forEach(g9);
}
function b9() {
  typeof ResizeObserver > "u" || (fr = new ResizeObserver(v9));
}
function x9(a, e) {
  fr || b9();
  const l = s2(a);
  return l.forEach((s) => {
    let r = cr.get(s);
    r || (r = /* @__PURE__ */ new Set(), cr.set(s, r)), r.add(e), fr?.observe(s);
  }), () => {
    l.forEach((s) => {
      const r = cr.get(s);
      r?.delete(e), r?.size || fr?.unobserve(s);
    });
  };
}
const dr = /* @__PURE__ */ new Set();
let Xi;
function S9() {
  Xi = () => {
    const a = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    dr.forEach((e) => e(a));
  }, window.addEventListener("resize", Xi);
}
function w9(a) {
  return dr.add(a), Xi || S9(), () => {
    dr.delete(a), !dr.size && typeof Xi == "function" && (window.removeEventListener("resize", Xi), Xi = void 0);
  };
}
function wy(a, e) {
  return typeof a == "function" ? w9(a) : x9(a, e);
}
function T9(a) {
  return sh(a) && a.tagName === "svg";
}
const C9 = [...a2, ce, gn], E9 = (a) => C9.find(n2(a)), Ty = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Pi = () => ({
  x: Ty(),
  y: Ty()
}), Cy = () => ({ min: 0, max: 0 }), me = () => ({
  x: Cy(),
  y: Cy()
}), A9 = /* @__PURE__ */ new WeakMap();
function zr(a) {
  return a !== null && typeof a == "object" && typeof a.start == "function";
}
function ys(a) {
  return typeof a == "string" || Array.isArray(a);
}
const oh = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], rh = ["initial", ...oh];
function Lr(a) {
  return zr(a.animate) || rh.some((e) => ys(a[e]));
}
function f2(a) {
  return !!(Lr(a) || a.variants);
}
function j9(a, e, l) {
  for (const s in e) {
    const r = e[s], c = l[s];
    if (Te(r))
      a.addValue(s, r);
    else if (Te(c))
      a.addValue(s, Ii(r, { owner: a }));
    else if (c !== r)
      if (a.hasValue(s)) {
        const f = a.getValue(s);
        f.liveStyle === !0 ? f.jump(r) : f.hasAnimated || f.set(r);
      } else {
        const f = a.getStaticValue(s);
        a.addValue(s, Ii(f !== void 0 ? f : r, { owner: a }));
      }
  }
  for (const s in l)
    e[s] === void 0 && a.removeValue(s);
  return e;
}
const Tr = { current: null }, uh = { current: !1 }, M9 = typeof window < "u";
function d2() {
  if (uh.current = !0, !!M9)
    if (window.matchMedia) {
      const a = window.matchMedia("(prefers-reduced-motion)"), e = () => Tr.current = a.matches;
      a.addEventListener("change", e), e();
    } else
      Tr.current = !1;
}
const Ey = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let Cr = {};
function h2(a) {
  Cr = a;
}
function _9() {
  return Cr;
}
class R9 {
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
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Wd, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const T = Me.now();
      this.renderScheduledAt < T && (this.renderScheduledAt = T, $t.render(this.render, !1, !0));
    };
    const { latestValues: p, renderState: g } = h;
    this.latestValues = p, this.baseTarget = { ...p }, this.initialValues = l.initial ? { ...p } : {}, this.renderState = g, this.parent = e, this.props = l, this.presenceContext = s, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = r, this.skipAnimationsConfig = c, this.options = y, this.blockInitialAnimation = !!f, this.isControllingVariants = Lr(l), this.isVariantNode = f2(l), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: v, ...b } = this.scrapeMotionValuesFromProps(l, {}, this);
    for (const T in b) {
      const S = b[T];
      p[T] !== void 0 && Te(S) && S.set(p[T]);
    }
  }
  mount(e) {
    if (this.hasBeenMounted)
      for (const l in this.initialValues)
        this.values.get(l)?.jump(this.initialValues[l]), this.latestValues[l] = this.initialValues[l];
    this.current = e, A9.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((l, s) => this.bindToMotionValue(s, l)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (uh.current || d2(), this.shouldReduceMotion = Tr.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), wa(this.notifyUpdate), wa(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    if (this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)(), l.accelerate && Zv.has(e) && this.current instanceof HTMLElement) {
      const { factory: f, keyframes: h, times: y, ease: p, duration: g } = l.accelerate, v = new Pv({
        element: this.current,
        name: e,
        keyframes: h,
        times: y,
        ease: p,
        duration: /* @__PURE__ */ Ke(g)
      }), b = f(v);
      this.valueSubscriptions.set(e, () => {
        b(), v.cancel();
      });
      return;
    }
    const s = il.has(e);
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
    for (e in Cr) {
      const l = Cr[e];
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
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : me();
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
    for (let s = 0; s < Ey.length; s++) {
      const r = Ey[s];
      this.propEventSubscriptions[r] && (this.propEventSubscriptions[r](), delete this.propEventSubscriptions[r]);
      const c = "on" + r, f = e[c];
      f && (this.propEventSubscriptions[r] = this.on(r, f));
    }
    this.prevMotionValues = j9(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return s === void 0 && l !== void 0 && (s = Ii(l === null ? void 0 : l, { owner: this }), this.addValue(e, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(e, l) {
    let s = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
    return s != null && (typeof s == "string" && (dv(s) || mv(s)) ? s = parseFloat(s) : !E9(s) && gn.test(l) && (s = l2(e, l)), this.setBaseTarget(e, Te(s) ? s.get() : s)), Te(s) ? s.get() : s;
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
      const c = eh(this.props, l, this.presenceContext?.custom);
      c && (s = c[e]);
    }
    if (l && s !== void 0)
      return s;
    const r = this.getBaseTargetFromProps(this.props, e);
    return r !== void 0 && !Te(r) ? r : this.initialValues[e] !== void 0 && s === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, l) {
    return this.events[e] || (this.events[e] = new Hd()), this.events[e].add(l);
  }
  notify(e, ...l) {
    this.events[e] && this.events[e].notify(...l);
  }
  scheduleRenderMicrotask() {
    ih.render(this.render);
  }
}
class m2 extends R9 {
  constructor() {
    super(...arguments), this.KeyframeResolver = l9;
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
    Te(e) && (this.childSubscription = e.on("change", (l) => {
      this.current && (this.current.textContent = `${l}`);
    }));
  }
}
class Ca {
  constructor(e) {
    this.isMounted = !1, this.node = e;
  }
  update() {
  }
}
function p2({ top: a, left: e, right: l, bottom: s }) {
  return {
    x: { min: e, max: l },
    y: { min: a, max: s }
  };
}
function D9({ x: a, y: e }) {
  return { top: e.min, right: a.max, bottom: e.max, left: a.min };
}
function N9(a, e) {
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
function Cf(a) {
  return a === void 0 || a === 1;
}
function gd({ scale: a, scaleX: e, scaleY: l }) {
  return !Cf(a) || !Cf(e) || !Cf(l);
}
function Fa(a) {
  return gd(a) || y2(a) || a.z || a.rotate || a.rotateX || a.rotateY || a.skewX || a.skewY;
}
function y2(a) {
  return Ay(a.x) || Ay(a.y);
}
function Ay(a) {
  return a && a !== "0%";
}
function Er(a, e, l) {
  const s = a - l, r = e * s;
  return l + r;
}
function jy(a, e, l, s, r) {
  return r !== void 0 && (a = Er(a, r, s)), Er(a, l, s) + e;
}
function vd(a, e = 0, l = 1, s, r) {
  a.min = jy(a.min, e, l, s, r), a.max = jy(a.max, e, l, s, r);
}
function g2(a, { x: e, y: l }) {
  vd(a.x, e.translate, e.scale, e.originPoint), vd(a.y, l.translate, l.scale, l.originPoint);
}
const My = 0.999999999999, _y = 1.0000000000001;
function O9(a, e, l, s = !1) {
  const r = l.length;
  if (!r)
    return;
  e.x = e.y = 1;
  let c, f;
  for (let h = 0; h < r; h++) {
    c = l[h], f = c.projectionDelta;
    const { visualElement: y } = c.options;
    y && y.props.style && y.props.style.display === "contents" || (s && c.options.layoutScroll && c.scroll && c !== c.root && (En(a.x, -c.scroll.offset.x), En(a.y, -c.scroll.offset.y)), f && (e.x *= f.x.scale, e.y *= f.y.scale, g2(a, f)), s && Fa(c.latestValues) && hr(a, c.latestValues, c.layout?.layoutBox));
  }
  e.x < _y && e.x > My && (e.x = 1), e.y < _y && e.y > My && (e.y = 1);
}
function En(a, e) {
  a.min += e, a.max += e;
}
function Ry(a, e, l, s, r = 0.5) {
  const c = qt(a.min, a.max, r);
  vd(a, e, l, c, s);
}
function Dy(a, e) {
  return typeof a == "string" ? parseFloat(a) / 100 * (e.max - e.min) : a;
}
function hr(a, e, l) {
  const s = l ?? a;
  Ry(a.x, Dy(e.x, s.x), e.scaleX, e.scale, e.originX), Ry(a.y, Dy(e.y, s.y), e.scaleY, e.scale, e.originY);
}
function v2(a, e) {
  return p2(N9(a.getBoundingClientRect(), e));
}
function z9(a, e, l) {
  const s = v2(a, l), { scroll: r } = e;
  return r && (En(s.x, r.offset.x), En(s.y, r.offset.y)), s;
}
const L9 = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, B9 = al.length;
function V9(a, e, l) {
  let s = "", r = !0;
  for (let f = 0; f < B9; f++) {
    const h = al[f], y = a[h];
    if (y === void 0)
      continue;
    let p = !0;
    if (typeof y == "number")
      p = y === (h.startsWith("scale") ? 1 : 0);
    else {
      const g = parseFloat(y);
      p = h.startsWith("scale") ? g === 1 : g === 0;
    }
    if (!p || l) {
      const g = yd(y, wr[h]);
      if (!p) {
        r = !1;
        const v = L9[h] || h;
        s += `${v}(${g}) `;
      }
      l && (e[h] = g);
    }
  }
  const c = a.pathRotation;
  return c && (r = !1, s += `rotate(${yd(c, wr.pathRotation)}) `), s = s.trim(), l ? s = l(e, r ? "" : s) : r && (s = "none"), s;
}
function ch(a, e, l) {
  const { style: s, vars: r, transformOrigin: c } = a;
  let f = !1, h = !1;
  for (const y in e) {
    const p = e[y];
    if (il.has(y)) {
      f = !0;
      continue;
    } else if (_v(y)) {
      r[y] = p;
      continue;
    } else {
      const g = yd(p, wr[y]);
      y.startsWith("origin") ? (h = !0, c[y] = g) : s[y] = g;
    }
  }
  if (e.transform || (f || l ? s.transform = V9(e, a.transform, l) : s.transform && (s.transform = "none")), h) {
    const { originX: y = "50%", originY: p = "50%", originZ: g = 0 } = c;
    s.transformOrigin = `${y} ${p} ${g}`;
  }
}
function b2(a, { style: e, vars: l }, s, r) {
  const c = a.style;
  let f;
  for (f in e)
    c[f] = e[f];
  r?.applyProjectionStyles(c, s);
  for (f in l)
    c.setProperty(f, l[f]);
}
function Ny(a, e) {
  return e.max === e.min ? 0 : a / (e.max - e.min) * 100;
}
const ns = {
  correct: (a, e) => {
    if (!e.target)
      return a;
    if (typeof a == "string")
      if (ct.test(a))
        a = parseFloat(a);
      else
        return a;
    const l = Ny(a, e.target.x), s = Ny(a, e.target.y);
    return `${l}% ${s}%`;
  }
}, U9 = {
  correct: (a, { treeScale: e, projectionDelta: l }) => {
    const s = a, r = gn.parse(a);
    if (r.length > 5)
      return s;
    const c = gn.createTransformer(a), f = typeof r[0] != "number" ? 1 : 0, h = l.x.scale * e.x, y = l.y.scale * e.y;
    r[0 + f] /= h, r[1 + f] /= y;
    const p = qt(h, y, 0.5);
    return typeof r[2 + f] == "number" && (r[2 + f] /= p), typeof r[3 + f] == "number" && (r[3 + f] /= p), c(r);
  }
}, bd = {
  borderRadius: {
    ...ns,
    applyTo: [...ah]
  },
  borderTopLeftRadius: ns,
  borderTopRightRadius: ns,
  borderBottomLeftRadius: ns,
  borderBottomRightRadius: ns,
  boxShadow: U9
};
function x2(a, { layout: e, layoutId: l }) {
  return il.has(a) || a.startsWith("origin") || (e || l !== void 0) && (!!bd[a] || a === "opacity");
}
function fh(a, e, l) {
  const s = a.style, r = e?.style, c = {};
  if (!s)
    return c;
  for (const f in s)
    (Te(s[f]) || r && Te(r[f]) || x2(f, a) || l?.getValue(f)?.liveStyle !== void 0) && (c[f] = s[f]);
  return c;
}
function k9(a) {
  return window.getComputedStyle(a);
}
class H9 extends m2 {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = b2;
  }
  readValueFromInstance(e, l) {
    if (il.has(l))
      return this.projection?.isProjecting ? ld(l) : o5(e, l);
    {
      const s = k9(e), r = (_v(l) ? s.getPropertyValue(l) : s[l]) || 0;
      return typeof r == "string" ? r.trim() : r;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: l }) {
    return v2(e, l);
  }
  build(e, l, s) {
    ch(e, l, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, l, s) {
    return fh(e, l, s);
  }
}
const q9 = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, $9 = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function G9(a, e, l = 1, s = 0, r = !0) {
  a.pathLength = 1;
  const c = r ? q9 : $9;
  a[c.offset] = `${-s}`, a[c.array] = `${e} ${l}`;
}
const Y9 = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function S2(a, {
  attrX: e,
  attrY: l,
  attrScale: s,
  pathLength: r,
  pathSpacing: c = 1,
  pathOffset: f = 0,
  // This is object creation, which we try to avoid per-frame.
  ...h
}, y, p, g) {
  if (ch(a, h, p), y) {
    a.style.viewBox && (a.attrs.viewBox = a.style.viewBox);
    return;
  }
  a.attrs = a.style, a.style = {};
  const { attrs: v, style: b } = a;
  v.transform && (b.transform = v.transform, delete v.transform), (b.transform || v.transformOrigin) && (b.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), b.transform && (b.transformBox = g?.transformBox ?? "fill-box", delete v.transformBox);
  for (const T of Y9)
    v[T] !== void 0 && (b[T] = v[T], delete v[T]);
  e !== void 0 && (v.x = e), l !== void 0 && (v.y = l), s !== void 0 && (v.scale = s), r !== void 0 && G9(v, r, c, f, !1);
}
const w2 = /* @__PURE__ */ new Set([
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
]), T2 = (a) => typeof a == "string" && a.toLowerCase() === "svg";
function X9(a, e, l, s) {
  b2(a, e, void 0, s);
  for (const r in e.attrs)
    a.setAttribute(w2.has(r) ? r : nh(r), e.attrs[r]);
}
function C2(a, e, l) {
  const s = fh(a, e, l);
  for (const r in a)
    if (Te(a[r]) || Te(e[r])) {
      const c = al.indexOf(r) !== -1 ? "attr" + r.charAt(0).toUpperCase() + r.substring(1) : r;
      s[c] = a[r];
    }
  return s;
}
class P9 extends m2 {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = me;
  }
  getBaseTargetFromProps(e, l) {
    return e[l];
  }
  readValueFromInstance(e, l) {
    if (il.has(l)) {
      const s = i2(l);
      return s && s.default || 0;
    }
    return l = w2.has(l) ? l : nh(l), e.getAttribute(l);
  }
  scrapeMotionValuesFromProps(e, l, s) {
    return C2(e, l, s);
  }
  build(e, l, s) {
    S2(e, l, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(e, l, s, r) {
    X9(e, l, s, r);
  }
  mount(e) {
    this.isSVGTag = T2(e.tagName), super.mount(e);
  }
}
const K9 = rh.length;
function E2(a) {
  if (!a)
    return;
  if (!a.isControllingVariants) {
    const l = a.parent ? E2(a.parent) || {} : {};
    return a.props.initial !== void 0 && (l.initial = a.props.initial), l;
  }
  const e = {};
  for (let l = 0; l < K9; l++) {
    const s = rh[l], r = a.props[s];
    (ys(r) || r === !1) && (e[s] = r);
  }
  return e;
}
function A2(a, e) {
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
const Z9 = [...oh].reverse(), Q9 = oh.length;
function F9(a) {
  return (e) => Promise.all(e.map(({ animation: l, options: s }) => Z5(a, l, s)));
}
function J9(a) {
  let e = F9(a), l = Oy(), s = !0, r = !1;
  const c = (p) => (g, v) => {
    const b = ai(a, v, p === "exit" ? a.presenceContext?.custom : void 0);
    if (b) {
      const { transition: T, transitionEnd: S, ...w } = b;
      g = { ...g, ...w, ...S };
    }
    return g;
  };
  function f(p) {
    e = p(a);
  }
  function h(p) {
    const { props: g } = a, v = E2(a.parent) || {}, b = [], T = /* @__PURE__ */ new Set();
    let S = {}, w = 1 / 0;
    for (let _ = 0; _ < Q9; _++) {
      const D = Z9[_], j = l[D], M = g[D] !== void 0 ? g[D] : v[D], V = ys(M), B = D === p ? j.isActive : null;
      B === !1 && (w = _);
      let R = M === v[D] && M !== g[D] && V;
      if (R && (s || r) && a.manuallyAnimateOnMount && (R = !1), j.protectedKeys = { ...S }, // If it isn't active and hasn't *just* been set as inactive
      !j.isActive && B === null || // If we didn't and don't have any defined prop for this animation type
      !M && !j.prevProp || // Or if the prop doesn't define an animation
      zr(M) || typeof M == "boolean")
        continue;
      if (D === "exit" && j.isActive && B !== !0) {
        j.prevResolvedValues && (S = {
          ...S,
          ...j.prevResolvedValues
        });
        continue;
      }
      const k = W9(j.prevProp, M);
      let P = k || // If we're making this variant active, we want to always make it active
      D === p && j.isActive && !R && V || // If we removed a higher-priority variant (i is in reverse order)
      _ > w && V, K = !1;
      const at = Array.isArray(M) ? M : [M];
      let nt = at.reduce(c(D), {});
      B === !1 && (nt = {});
      const { prevResolvedValues: I = {} } = j, Q = {
        ...I,
        ...nt
      }, et = (J) => {
        P = !0, T.has(J) && (K = !0, T.delete(J)), j.needsAnimating[J] = !0;
        const it = a.getValue(J);
        it && (it.liveStyle = !1);
      };
      for (const J in Q) {
        const it = nt[J], ot = I[J];
        if (S.hasOwnProperty(J))
          continue;
        let O = !1;
        fd(it) && fd(ot) ? O = !A2(it, ot) || k : O = it !== ot, O ? it != null ? et(J) : T.add(J) : it !== void 0 && T.has(J) ? et(J) : j.protectedKeys[J] = !0;
      }
      j.prevProp = M, j.prevResolvedValues = nt, j.isActive && (S = { ...S, ...nt }), (s || r) && a.blockInitialAnimation && (P = !1);
      const N = R && k;
      P && (!N || K) && b.push(...at.map((J) => {
        const it = { type: D };
        if (typeof J == "string" && (s || r) && !N && a.manuallyAnimateOnMount && a.parent) {
          const { parent: ot } = a, O = ai(ot, J);
          if (ot.enteringChildren && O) {
            const { delayChildren: $ } = O.transition || {};
            it.delay = Qv(ot.enteringChildren, a, $);
          }
        }
        return {
          animation: J,
          options: it
        };
      }));
    }
    if (T.size) {
      const _ = {};
      if (typeof g.initial != "boolean") {
        const D = ai(a, Array.isArray(g.initial) ? g.initial[0] : g.initial);
        D && D.transition && (_.transition = D.transition);
      }
      T.forEach((D) => {
        const j = a.getBaseTarget(D), M = a.getValue(D);
        M && (M.liveStyle = !0), _[D] = j ?? null;
      }), b.push({ animation: _ });
    }
    let A = !!b.length;
    return s && (g.initial === !1 || g.initial === g.animate) && !a.manuallyAnimateOnMount && (A = !1), s = !1, r = !1, A ? e(b) : Promise.resolve();
  }
  function y(p, g) {
    if (l[p].isActive === g)
      return Promise.resolve();
    a.variantChildren?.forEach((b) => b.animationState?.setActive(p, g)), l[p].isActive = g;
    const v = h(p);
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
      l = Oy(), r = !0;
    }
  };
}
function W9(a, e) {
  return typeof e == "string" ? e !== a : Array.isArray(e) ? !A2(e, a) : !1;
}
function Pa(a = !1) {
  return {
    isActive: a,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Oy() {
  return {
    animate: Pa(!0),
    whileInView: Pa(),
    whileHover: Pa(),
    whileTap: Pa(),
    whileDrag: Pa(),
    whileFocus: Pa(),
    exit: Pa()
  };
}
function xd(a, e) {
  a.min = e.min, a.max = e.max;
}
function dn(a, e) {
  xd(a.x, e.x), xd(a.y, e.y);
}
function zy(a, e) {
  a.translate = e.translate, a.scale = e.scale, a.originPoint = e.originPoint, a.origin = e.origin;
}
const j2 = 1e-4, I9 = 1 - j2, tw = 1 + j2, M2 = 0.01, ew = 0 - M2, nw = 0 + M2;
function _e(a) {
  return a.max - a.min;
}
function aw(a, e, l) {
  return Math.abs(a - e) <= l;
}
function Ly(a, e, l, s = 0.5) {
  a.origin = s, a.originPoint = qt(e.min, e.max, a.origin), a.scale = _e(l) / _e(e), a.translate = qt(l.min, l.max, a.origin) - a.originPoint, (a.scale >= I9 && a.scale <= tw || isNaN(a.scale)) && (a.scale = 1), (a.translate >= ew && a.translate <= nw || isNaN(a.translate)) && (a.translate = 0);
}
function fs(a, e, l, s) {
  Ly(a.x, e.x, l.x, s ? s.originX : void 0), Ly(a.y, e.y, l.y, s ? s.originY : void 0);
}
function By(a, e, l, s = 0) {
  const r = s ? qt(l.min, l.max, s) : l.min;
  a.min = r + e.min, a.max = a.min + _e(e);
}
function iw(a, e, l, s) {
  By(a.x, e.x, l.x, s?.x), By(a.y, e.y, l.y, s?.y);
}
function Vy(a, e, l, s = 0) {
  const r = s ? qt(l.min, l.max, s) : l.min;
  a.min = e.min - r, a.max = a.min + _e(e);
}
function Ar(a, e, l, s) {
  Vy(a.x, e.x, l.x, s?.x), Vy(a.y, e.y, l.y, s?.y);
}
function Uy(a, e, l, s, r) {
  return a -= e, a = Er(a, 1 / l, s), r !== void 0 && (a = Er(a, 1 / r, s)), a;
}
function lw(a, e = 0, l = 1, s = 0.5, r, c = a, f = a) {
  if (An.test(e) && (e = parseFloat(e), e = qt(f.min, f.max, e / 100) - f.min), typeof e != "number")
    return;
  let h = qt(c.min, c.max, s);
  a === c && (h -= e), a.min = Uy(a.min, e, l, h, r), a.max = Uy(a.max, e, l, h, r);
}
function ky(a, e, [l, s, r], c, f) {
  lw(a, e[l], e[s], e[r], e.scale, c, f);
}
const sw = ["x", "scaleX", "originX"], ow = ["y", "scaleY", "originY"];
function Hy(a, e, l, s) {
  ky(a.x, e, sw, l ? l.x : void 0, s ? s.x : void 0), ky(a.y, e, ow, l ? l.y : void 0, s ? s.y : void 0);
}
function qy(a) {
  return a.translate === 0 && a.scale === 1;
}
function _2(a) {
  return qy(a.x) && qy(a.y);
}
function $y(a, e) {
  return a.min === e.min && a.max === e.max;
}
function rw(a, e) {
  return $y(a.x, e.x) && $y(a.y, e.y);
}
function Gy(a, e) {
  return Math.round(a.min) === Math.round(e.min) && Math.round(a.max) === Math.round(e.max);
}
function R2(a, e) {
  return Gy(a.x, e.x) && Gy(a.y, e.y);
}
function Yy(a) {
  return _e(a.x) / _e(a.y);
}
function Xy(a, e) {
  return a.translate === e.translate && a.scale === e.scale && a.originPoint === e.originPoint;
}
function Cn(a) {
  return [a("x"), a("y")];
}
function uw(a, e, l) {
  let s = "";
  const r = a.x.translate / e.x, c = a.y.translate / e.y, f = l?.z || 0;
  if ((r || c || f) && (s = `translate3d(${r}px, ${c}px, ${f}px) `), (e.x !== 1 || e.y !== 1) && (s += `scale(${1 / e.x}, ${1 / e.y}) `), l) {
    const { transformPerspective: p, rotate: g, pathRotation: v, rotateX: b, rotateY: T, skewX: S, skewY: w } = l;
    p && (s = `perspective(${p}px) ${s}`), g && (s += `rotate(${g}deg) `), v && (s += `rotate(${v}deg) `), b && (s += `rotateX(${b}deg) `), T && (s += `rotateY(${T}deg) `), S && (s += `skewX(${S}deg) `), w && (s += `skewY(${w}deg) `);
  }
  const h = a.x.scale * e.x, y = a.y.scale * e.y;
  return (h !== 1 || y !== 1) && (s += `scale(${h}, ${y})`), s || "none";
}
const cw = ah.length, Py = (a) => typeof a == "string" ? parseFloat(a) : a, Ky = (a) => typeof a == "number" || ct.test(a);
function fw(a, e, l, s, r, c) {
  r ? (a.opacity = qt(0, l.opacity ?? 1, dw(s)), a.opacityExit = qt(e.opacity ?? 1, 0, hw(s))) : c && (a.opacity = qt(e.opacity ?? 1, l.opacity ?? 1, s));
  for (let f = 0; f < cw; f++) {
    const h = ah[f];
    let y = Zy(e, h), p = Zy(l, h);
    if (y === void 0 && p === void 0)
      continue;
    y || (y = 0), p || (p = 0), y === 0 || p === 0 || Ky(y) === Ky(p) ? (a[h] = Math.max(qt(Py(y), Py(p), s), 0), (An.test(p) || An.test(y)) && (a[h] += "%")) : a[h] = p;
  }
  (e.rotate || l.rotate) && (a.rotate = qt(e.rotate || 0, l.rotate || 0, s));
}
function Zy(a, e) {
  return a[e] !== void 0 ? a[e] : a.borderRadius;
}
const dw = /* @__PURE__ */ D2(0, 0.5, Tv), hw = /* @__PURE__ */ D2(0.5, 0.95, on);
function D2(a, e, l) {
  return (s) => s < a ? 0 : s > e ? 1 : l(/* @__PURE__ */ ms(a, e, s));
}
function mw(a, e, l) {
  const s = Te(a) ? a : Ii(a);
  return s.start(th("", s, e, l)), s.animation;
}
function gs(a, e, l, s = { passive: !0 }) {
  return a.addEventListener(e, l, s), () => a.removeEventListener(e, l, s);
}
const pw = (a, e) => a.depth - e.depth;
class yw {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(e) {
    Ud(this.children, e), this.isDirty = !0;
  }
  remove(e) {
    gr(this.children, e), this.isDirty = !0;
  }
  forEach(e) {
    this.isDirty && this.children.sort(pw), this.isDirty = !1, this.children.forEach(e);
  }
}
function gw(a, e) {
  const l = Me.now(), s = ({ timestamp: r }) => {
    const c = r - l;
    c >= e && (wa(s), a(c - e));
  };
  return $t.setup(s, !0), () => wa(s);
}
function mr(a) {
  return Te(a) ? a.get() : a;
}
class vw {
  constructor() {
    this.members = [];
  }
  add(e) {
    Ud(this.members, e);
    for (let l = this.members.length - 1; l >= 0; l--) {
      const s = this.members[l];
      if (s === e || s === this.lead || s === this.prevLead)
        continue;
      const r = s.instance;
      (!r || r.isConnected === !1) && !s.snapshot && (gr(this.members, s), s.unmount());
    }
    e.scheduleRender();
  }
  remove(e) {
    if (gr(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead) {
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
const pr = {
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
}, Ef = ["", "X", "Y", "Z"], bw = 1e3;
let xw = 0;
function Af(a, e, l, s) {
  const { latestValues: r } = e;
  r[a] && (l[a] = r[a], e.setStaticValue(a, 0), s && (s[a] = 0));
}
function N2(a) {
  if (a.hasCheckedOptimisedAppear = !0, a.root === a)
    return;
  const { visualElement: e } = a.options;
  if (!e)
    return;
  const l = t2(e);
  if (window.MotionHasOptimisedAnimation(l, "transform")) {
    const { layout: r, layoutId: c } = a.options;
    window.MotionCancelOptimisedAnimation(l, "transform", $t, !(r || c));
  }
  const { parent: s } = a;
  s && !s.hasCheckedOptimisedAppear && N2(s);
}
function O2({ attachResizeListener: a, defaultParent: e, measureScroll: l, checkIsScrollRoot: s, resetTransform: r }) {
  return class {
    constructor(f = {}, h = e?.()) {
      this.id = xw++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(Tw), this.nodes.forEach(_w), this.nodes.forEach(Rw), this.nodes.forEach(Cw);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = f, this.root = h ? h.root || h : this, this.path = h ? [...h.path, h] : [], this.parent = h, this.depth = h ? h.depth + 1 : 0;
      for (let y = 0; y < this.path.length; y++)
        this.path[y].shouldResetTransform = !0;
      this.root === this && (this.nodes = new yw());
    }
    addEventListener(f, h) {
      return this.eventHandlers.has(f) || this.eventHandlers.set(f, new Hd()), this.eventHandlers.get(f).add(h);
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
      this.isSVG = sh(f) && !T9(f), this.instance = f;
      const { layoutId: h, layout: y, visualElement: p } = this.options;
      if (p && !p.current && p.mount(f), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (y || h) && (this.isLayoutDirty = !0), a) {
        let g, v = 0;
        const b = () => this.root.updateBlockedByResize = !1;
        $t.read(() => {
          v = window.innerWidth;
        }), a(f, () => {
          const T = window.innerWidth;
          T !== v && (v = T, this.root.updateBlockedByResize = !0, g && g(), g = gw(b, 250), pr.hasAnimatedSinceResize && (pr.hasAnimatedSinceResize = !1, this.nodes.forEach(Jy)));
        });
      }
      h && this.root.registerSharedNode(h, this), this.options.animate !== !1 && p && (h || y) && this.addEventListener("didUpdate", ({ delta: g, hasLayoutChanged: v, hasRelativeLayoutChanged: b, layout: T }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const S = this.options.transition || p.getDefaultTransition() || Lw, { onLayoutAnimationStart: w, onLayoutAnimationComplete: A } = p.getProps(), _ = !this.targetLayout || !R2(this.targetLayout, T), D = !v && b;
        if (this.options.layoutRoot || this.resumeFrom || D || v && (_ || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const j = {
            ...Id(S, "layout"),
            onPlay: w,
            onComplete: A
          };
          (p.shouldReduceMotion || this.options.layoutRoot) && (j.delay = 0, j.type = !1), this.startAnimation(j), this.setAnimationOrigin(g, D, j.path);
        } else
          v || Jy(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = T;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const f = this.getStack();
      f && f.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), wa(this.updateProjection);
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
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(Dw), this.animationId++);
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
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && N2(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let g = 0; g < this.path.length; g++) {
        const v = this.path[g];
        v.shouldResetTransform = !0, (typeof v.latestValues.x == "string" || typeof v.latestValues.y == "string") && (v.isLayoutDirty = !0), v.updateScroll("snapshot"), v.options.layoutRoot && v.willUpdate(!1);
      }
      const { layoutId: h, layout: y } = this.options;
      if (h === void 0 && !y)
        return;
      const p = this.getTransformTemplate();
      this.prevTransformTemplateValue = p ? p(this.latestValues, "") : void 0, this.updateSnapshot(), f && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        const y = this.updateBlockedByResize;
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), y && this.nodes.forEach(Aw), this.nodes.forEach(Qy);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Fy);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(jw), this.nodes.forEach(Mw), this.nodes.forEach(Sw), this.nodes.forEach(ww)) : this.nodes.forEach(Fy), this.clearAllSnapshots();
      const h = Me.now();
      we.delta = jn(0, 1e3 / 60, h - we.timestamp), we.timestamp = h, we.isProcessing = !0, gf.update.process(we), gf.preRender.process(we), gf.render.process(we), we.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, ih.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(Ew), this.sharedNodes.forEach(Nw);
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
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !_e(this.snapshot.measuredBox.x) && !_e(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let y = 0; y < this.path.length; y++)
          this.path[y].updateScroll();
      const f = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = me()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
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
      const f = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, h = this.projectionDelta && !_2(this.projectionDelta), y = this.getTransformTemplate(), p = y ? y(this.latestValues, "") : void 0, g = p !== this.prevTransformTemplateValue;
      f && this.instance && (h || Fa(this.latestValues) || g) && (r(this.instance, p), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(f = !0) {
      const h = this.measurePageBox();
      let y = this.removeElementScroll(h);
      return f && (y = this.removeTransform(y)), Bw(y), {
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
        return me();
      const h = f.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(Vw))) {
        const { scroll: p } = this.root;
        p && (En(h.x, p.offset.x), En(h.y, p.offset.y));
      }
      return h;
    }
    removeElementScroll(f) {
      const h = me();
      if (dn(h, f), this.scroll?.wasRoot)
        return h;
      for (let y = 0; y < this.path.length; y++) {
        const p = this.path[y], { scroll: g, options: v } = p;
        p !== this.root && g && v.layoutScroll && (g.wasRoot && dn(h, f), En(h.x, g.offset.x), En(h.y, g.offset.y));
      }
      return h;
    }
    applyTransform(f, h = !1, y) {
      const p = y || me();
      dn(p, f);
      for (let g = 0; g < this.path.length; g++) {
        const v = this.path[g];
        !h && v.options.layoutScroll && v.scroll && v !== v.root && (En(p.x, -v.scroll.offset.x), En(p.y, -v.scroll.offset.y)), Fa(v.latestValues) && hr(p, v.latestValues, v.layout?.layoutBox);
      }
      return Fa(this.latestValues) && hr(p, this.latestValues, this.layout?.layoutBox), p;
    }
    removeTransform(f) {
      const h = me();
      dn(h, f);
      for (let y = 0; y < this.path.length; y++) {
        const p = this.path[y];
        if (!Fa(p.latestValues))
          continue;
        let g;
        p.instance && (gd(p.latestValues) && p.updateSnapshot(), g = me(), dn(g, p.measurePageBox())), Hy(h, p.latestValues, p.snapshot?.layoutBox, g);
      }
      return Fa(this.latestValues) && Hy(h, this.latestValues), h;
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
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== we.timestamp && this.relativeParent.resolveTargetDelta(!0);
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
      this.resolvedRelativeTargetAt = we.timestamp;
      const b = this.getClosestProjectingParent();
      b && this.linkedParentVersion !== b.layoutVersion && !b.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && b && b.layout ? this.createRelativeTarget(b, this.layout.layoutBox, b.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = me(), this.targetWithTransforms = me()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), iw(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : dn(this.target, this.layout.layoutBox), g2(this.target, this.targetDelta)) : dn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && b && !!b.resumingFrom == !!this.resumingFrom && !b.options.layoutScroll && b.target && this.animationProgress !== 1 ? this.createRelativeTarget(b, this.target, b.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || gd(this.parent.latestValues) || y2(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(f, h, y) {
      this.relativeParent = f, this.linkedParentVersion = f.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = me(), this.relativeTargetOrigin = me(), Ar(this.relativeTargetOrigin, h, y, this.options.layoutAnchor || void 0), dn(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const f = this.getLead(), h = !!this.resumingFrom || this !== f;
      let y = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (y = !1), h && (this.isSharedProjectionDirty || this.isTransformDirty) && (y = !1), this.resolvedRelativeTargetAt === we.timestamp && (y = !1), y)
        return;
      const { layout: p, layoutId: g } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(p || g))
        return;
      dn(this.layoutCorrected, this.layout.layoutBox);
      const v = this.treeScale.x, b = this.treeScale.y;
      O9(this.layoutCorrected, this.treeScale, this.path, h), f.layout && !f.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (f.target = f.layout.layoutBox, f.targetWithTransforms = me());
      const { target: T } = f;
      if (!T) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (zy(this.prevProjectionDelta.x, this.projectionDelta.x), zy(this.prevProjectionDelta.y, this.projectionDelta.y)), fs(this.projectionDelta, this.layoutCorrected, T, this.latestValues), (this.treeScale.x !== v || this.treeScale.y !== b || !Xy(this.projectionDelta.x, this.prevProjectionDelta.x) || !Xy(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", T));
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
      this.prevProjectionDelta = Pi(), this.projectionDelta = Pi(), this.projectionDeltaWithTransform = Pi();
    }
    setAnimationOrigin(f, h = !1, y) {
      const p = this.snapshot, g = p ? p.latestValues : {}, v = { ...this.latestValues }, b = Pi();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !h;
      const T = me(), S = p ? p.source : void 0, w = this.layout ? this.layout.source : void 0, A = S !== w, _ = this.getStack(), D = !_ || _.members.length <= 1, j = !!(A && !D && this.options.crossfade === !0 && !this.path.some(zw));
      this.animationProgress = 0;
      let M;
      const V = y?.interpolateProjection(f);
      this.mixTargetDelta = (B) => {
        const R = B / 1e3, k = V?.(R);
        k ? (b.x.translate = k.x, b.x.scale = qt(f.x.scale, 1, R), b.x.origin = f.x.origin, b.x.originPoint = f.x.originPoint, b.y.translate = k.y, b.y.scale = qt(f.y.scale, 1, R), b.y.origin = f.y.origin, b.y.originPoint = f.y.originPoint) : (Wy(b.x, f.x, R), Wy(b.y, f.y, R)), this.setTargetDelta(b), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Ar(T, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), Ow(this.relativeTarget, this.relativeTargetOrigin, T, R), M && rw(this.relativeTarget, M) && (this.isProjectionDirty = !1), M || (M = me()), dn(M, this.relativeTarget)), A && (this.animationValues = v, fw(v, g, this.latestValues, R, j, D)), k && k.rotate !== void 0 && (this.animationValues || (this.animationValues = v), this.animationValues.pathRotation = k.rotate), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = R;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(f) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (wa(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = $t.update(() => {
        pr.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = Ii(0)), this.motionValue.jump(0, !1), this.currentAnimation = mw(this.motionValue, [0, 1e3], {
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
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(bw), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const f = this.getLead();
      let { targetWithTransforms: h, target: y, layout: p, latestValues: g } = f;
      if (!(!h || !y || !p)) {
        if (this !== f && this.layout && p && z2(this.options.animationType, this.layout.layoutBox, p.layoutBox)) {
          y = this.target || me();
          const v = _e(this.layout.layoutBox.x);
          y.x.min = f.target.x.min, y.x.max = y.x.min + v;
          const b = _e(this.layout.layoutBox.y);
          y.y.min = f.target.y.min, y.y.max = y.y.min + b;
        }
        dn(h, y), hr(h, g), fs(this.projectionDeltaWithTransform, this.layoutCorrected, h, g);
      }
    }
    registerSharedNode(f, h) {
      this.sharedNodes.has(f) || this.sharedNodes.set(f, new vw()), this.sharedNodes.get(f).add(h);
      const p = h.options.initialPromotionConfig;
      h.promote({
        transition: p ? p.transition : void 0,
        preserveFollowOpacity: p && p.shouldPreserveFollowOpacity ? p.shouldPreserveFollowOpacity(h) : void 0
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
      const p = this.getStack();
      p && p.promote(this, y), f && (this.projectionDelta = void 0, this.needsReset = !0), h && this.setOptions({ transition: h });
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
      const p = {};
      y.z && Af("z", f, p, this.animationValues);
      for (let g = 0; g < Ef.length; g++)
        Af(`rotate${Ef[g]}`, f, p, this.animationValues), Af(`skew${Ef[g]}`, f, p, this.animationValues);
      f.render();
      for (const g in p)
        f.setStaticValue(g, p[g]), this.animationValues && (this.animationValues[g] = p[g]);
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
        this.needsReset = !1, f.visibility = "", f.opacity = "", f.pointerEvents = mr(h?.pointerEvents) || "", f.transform = y ? y(this.latestValues, "") : "none";
        return;
      }
      const p = this.getLead();
      if (!this.projectionDelta || !this.layout || !p.target) {
        this.options.layoutId && (f.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, f.pointerEvents = mr(h?.pointerEvents) || ""), this.hasProjected && !Fa(this.latestValues) && (f.transform = y ? y({}, "") : "none", this.hasProjected = !1);
        return;
      }
      f.visibility = "";
      const g = p.animationValues || p.latestValues;
      this.applyTransformsToTarget();
      let v = uw(this.projectionDeltaWithTransform, this.treeScale, g);
      y && (v = y(g, v)), f.transform = v;
      const { x: b, y: T } = this.projectionDelta;
      f.transformOrigin = `${b.origin * 100}% ${T.origin * 100}% 0`, p.animationValues ? f.opacity = p === this ? g.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : g.opacityExit : f.opacity = p === this ? g.opacity !== void 0 ? g.opacity : "" : g.opacityExit !== void 0 ? g.opacityExit : 0;
      for (const S in bd) {
        if (g[S] === void 0)
          continue;
        const { correct: w, applyTo: A, isCSSVariable: _ } = bd[S], D = v === "none" ? g[S] : w(g[S], p);
        if (A) {
          const j = A.length;
          for (let M = 0; M < j; M++)
            f[A[M]] = D;
        } else
          _ ? this.options.visualElement.renderState.vars[S] = D : f[S] = D;
      }
      this.options.layoutId && (f.pointerEvents = p === this ? mr(h?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((f) => f.currentAnimation?.stop()), this.root.nodes.forEach(Qy), this.root.sharedNodes.clear();
    }
  };
}
function Sw(a) {
  a.updateLayout();
}
function ww(a) {
  const e = a.resumeFrom?.snapshot || a.snapshot;
  if (a.isLead() && a.layout && e && a.hasListeners("didUpdate")) {
    const { layoutBox: l, measuredBox: s } = a.layout, { animationType: r } = a.options, c = e.source !== a.layout.source;
    if (r === "size")
      Cn((g) => {
        const v = c ? e.measuredBox[g] : e.layoutBox[g], b = _e(v);
        v.min = l[g].min, v.max = v.min + b;
      });
    else if (r === "x" || r === "y") {
      const g = r === "x" ? "y" : "x";
      xd(c ? e.measuredBox[g] : e.layoutBox[g], l[g]);
    } else z2(r, e.layoutBox, l) && Cn((g) => {
      const v = c ? e.measuredBox[g] : e.layoutBox[g], b = _e(l[g]);
      v.max = v.min + b, a.relativeTarget && !a.currentAnimation && (a.isProjectionDirty = !0, a.relativeTarget[g].max = a.relativeTarget[g].min + b);
    });
    const f = Pi();
    fs(f, l, e.layoutBox);
    const h = Pi();
    c ? fs(h, a.applyTransform(s, !0), e.measuredBox) : fs(h, l, e.layoutBox);
    const y = !_2(f);
    let p = !1;
    if (!a.resumeFrom) {
      const g = a.getClosestProjectingParent();
      if (g && !g.resumeFrom) {
        const { snapshot: v, layout: b } = g;
        if (v && b) {
          const T = a.options.layoutAnchor || void 0, S = me();
          Ar(S, e.layoutBox, v.layoutBox, T);
          const w = me();
          Ar(w, l, b.layoutBox, T), R2(S, w) || (p = !0), g.options.layoutRoot && (a.relativeTarget = w, a.relativeTargetOrigin = S, a.relativeParent = g);
        }
      }
    }
    a.notifyListeners("didUpdate", {
      layout: l,
      snapshot: e,
      delta: h,
      layoutDelta: f,
      hasLayoutChanged: y,
      hasRelativeLayoutChanged: p
    });
  } else if (a.isLead()) {
    const { onExitComplete: l } = a.options;
    l && l();
  }
  a.options.transition = void 0;
}
function Tw(a) {
  a.parent && (a.isProjecting() || (a.isProjectionDirty = a.parent.isProjectionDirty), a.isSharedProjectionDirty || (a.isSharedProjectionDirty = !!(a.isProjectionDirty || a.parent.isProjectionDirty || a.parent.isSharedProjectionDirty)), a.isTransformDirty || (a.isTransformDirty = a.parent.isTransformDirty));
}
function Cw(a) {
  a.isProjectionDirty = a.isSharedProjectionDirty = a.isTransformDirty = !1;
}
function Ew(a) {
  a.clearSnapshot();
}
function Qy(a) {
  a.clearMeasurements();
}
function Aw(a) {
  a.isLayoutDirty = !0, a.updateLayout();
}
function Fy(a) {
  a.isLayoutDirty = !1;
}
function jw(a) {
  a.isAnimationBlocked && a.layout && !a.isLayoutDirty && (a.snapshot = a.layout, a.isLayoutDirty = !0);
}
function Mw(a) {
  const { visualElement: e } = a.options;
  e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), a.resetTransform();
}
function Jy(a) {
  a.finishAnimation(), a.targetDelta = a.relativeTarget = a.target = void 0, a.isProjectionDirty = !0;
}
function _w(a) {
  a.resolveTargetDelta();
}
function Rw(a) {
  a.calcProjection();
}
function Dw(a) {
  a.resetSkewAndRotation();
}
function Nw(a) {
  a.removeLeadSnapshot();
}
function Wy(a, e, l) {
  a.translate = qt(e.translate, 0, l), a.scale = qt(e.scale, 1, l), a.origin = e.origin, a.originPoint = e.originPoint;
}
function Iy(a, e, l, s) {
  a.min = qt(e.min, l.min, s), a.max = qt(e.max, l.max, s);
}
function Ow(a, e, l, s) {
  Iy(a.x, e.x, l.x, s), Iy(a.y, e.y, l.y, s);
}
function zw(a) {
  return a.animationValues && a.animationValues.opacityExit !== void 0;
}
const Lw = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, tg = (a) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(a), eg = tg("applewebkit/") && !tg("chrome/") ? Math.round : on;
function ng(a) {
  a.min = eg(a.min), a.max = eg(a.max);
}
function Bw(a) {
  ng(a.x), ng(a.y);
}
function z2(a, e, l) {
  return a === "position" || a === "preserve-aspect" && !aw(Yy(e), Yy(l), 0.2);
}
function Vw(a) {
  return a !== a.root && a.scroll?.wasRoot;
}
const Uw = O2({
  attachResizeListener: (a, e) => gs(a, "resize", e),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), jf = {
  current: void 0
}, L2 = O2({
  measureScroll: (a) => ({
    x: a.scrollLeft,
    y: a.scrollTop
  }),
  defaultParent: () => {
    if (!jf.current) {
      const a = new Uw({});
      a.mount(window), a.setOptions({ layoutScroll: !0 }), jf.current = a;
    }
    return jf.current;
  },
  resetTransform: (a, e) => {
    a.style.transform = e !== void 0 ? e : "none";
  },
  checkIsScrollRoot: (a) => window.getComputedStyle(a).position === "fixed"
});
function kw(a, e) {
  if (Lr(a)) {
    const { initial: l, animate: s } = a;
    return {
      initial: l === !1 || ys(l) ? l : void 0,
      animate: ys(s) ? s : void 0
    };
  }
  return a.inherit !== !1 ? e : {};
}
function Hw(a) {
  const { initial: e, animate: l } = kw(a, E.useContext(Nr));
  return E.useMemo(() => ({ initial: e, animate: l }), [ag(e), ag(l)]);
}
function ag(a) {
  return Array.isArray(a) ? a.join(" ") : a;
}
const dh = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function B2(a, e, l) {
  for (const s in e)
    !Te(e[s]) && !x2(s, l) && (a[s] = e[s]);
}
function qw({ transformTemplate: a }, e) {
  return E.useMemo(() => {
    const l = dh();
    return ch(l, e, a), Object.assign({}, l.vars, l.style);
  }, [e]);
}
function $w(a, e) {
  const l = a.style || {}, s = {};
  return B2(s, l, a), Object.assign(s, qw(a, e)), s;
}
function Gw(a, e) {
  const l = {}, s = $w(a, e);
  return a.drag && a.dragListener !== !1 && (l.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = a.drag === !0 ? "none" : `pan-${a.drag === "x" ? "y" : "x"}`), a.tabIndex === void 0 && (a.onTap || a.onTapStart || a.whileTap) && (l.tabIndex = 0), l.style = s, l;
}
const V2 = () => ({
  ...dh(),
  attrs: {}
});
function Yw(a, e, l, s) {
  const r = E.useMemo(() => {
    const c = V2();
    return S2(c, e, T2(s), a.transformTemplate, a.style), {
      ...c.attrs,
      style: { ...c.style }
    };
  }, [e]);
  if (a.style) {
    const c = {};
    B2(c, a.style, a), r.style = { ...c, ...r.style };
  }
  return r;
}
const Xw = /* @__PURE__ */ new Set([
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
function jr(a) {
  return a.startsWith("while") || a.startsWith("drag") && a !== "draggable" || a.startsWith("layout") || a.startsWith("onTap") || a.startsWith("onPan") || a.startsWith("onLayout") || Xw.has(a);
}
let U2 = (a) => !jr(a);
function Pw(a) {
  typeof a == "function" && (U2 = (e) => e.startsWith("on") ? !jr(e) : a(e));
}
try {
  Pw(require("@emotion/is-prop-valid").default);
} catch {
}
function Kw(a, e, l) {
  const s = {};
  for (const r in a)
    r === "values" && typeof a.values == "object" || Te(a[r]) || (U2(r) || l === !0 && jr(r) || !e && !jr(r) || // If trying to use native HTML drag events, forward drag listeners
    a.draggable && r.startsWith("onDrag")) && (s[r] = a[r]);
  return s;
}
const Zw = [
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
function hh(a) {
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
      !!(Zw.indexOf(a) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(a))
    )
  );
}
function Qw(a, e, l, { latestValues: s }, r, c = !1, f) {
  const y = (f ?? hh(a) ? Yw : Gw)(e, s, r, a), p = Kw(e, typeof a == "string", c), g = a !== E.Fragment ? { ...p, ...y, ref: l } : {}, { children: v } = e, b = E.useMemo(() => Te(v) ? v.get() : v, [v]);
  return E.createElement(a, {
    ...g,
    children: b
  });
}
const Br = /* @__PURE__ */ E.createContext(null);
function mh(a) {
  const e = E.useRef(null);
  return e.current === null && (e.current = a()), e.current;
}
function Fw({ scrapeMotionValuesFromProps: a, createRenderState: e }, l, s, r) {
  return {
    latestValues: Jw(l, s, r, a),
    renderState: e()
  };
}
function Jw(a, e, l, s) {
  const r = {}, c = s(a, {});
  for (const b in c)
    r[b] = mr(c[b]);
  let { initial: f, animate: h } = a;
  const y = Lr(a), p = f2(a);
  e && p && !y && a.inherit !== !1 && (f === void 0 && (f = e.initial), h === void 0 && (h = e.animate));
  let g = l ? l.initial === !1 : !1;
  g = g || f === !1;
  const v = g ? h : f;
  if (v && typeof v != "boolean" && !zr(v)) {
    const b = Array.isArray(v) ? v : [v];
    for (let T = 0; T < b.length; T++) {
      const S = eh(a, b[T]);
      if (S) {
        const { transitionEnd: w, transition: A, ..._ } = S;
        for (const D in _) {
          let j = _[D];
          if (Array.isArray(j)) {
            const M = g ? j.length - 1 : 0;
            j = j[M];
          }
          j !== null && (r[D] = j);
        }
        for (const D in w)
          r[D] = w[D];
      }
    }
  }
  return r;
}
const k2 = (a) => (e, l) => {
  const s = E.useContext(Nr), r = E.useContext(Br), c = () => Fw(a, e, s, r);
  return l ? c() : mh(c);
}, Ww = /* @__PURE__ */ k2({
  scrapeMotionValuesFromProps: fh,
  createRenderState: dh
}), Iw = /* @__PURE__ */ k2({
  scrapeMotionValuesFromProps: C2,
  createRenderState: V2
}), ig = {
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
let lg = !1;
function t6() {
  if (lg)
    return;
  const a = {};
  for (const e in ig)
    a[e] = {
      isEnabled: (l) => ig[e].some((s) => !!l[s])
    };
  h2(a), lg = !0;
}
function H2() {
  return t6(), _9();
}
function sg(a) {
  const e = H2();
  for (const l in a)
    e[l] = {
      ...e[l],
      ...a[l]
    };
  h2(e);
}
const e6 = Symbol.for("motionComponentSymbol");
function n6(a, e, l) {
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
const q2 = E.createContext({});
function Gi(a) {
  return a && typeof a == "object" && Object.prototype.hasOwnProperty.call(a, "current");
}
const a6 = typeof window < "u", ph = a6 ? E.useLayoutEffect : E.useEffect;
function i6(a, e, l, s, r, c) {
  const { visualElement: f } = E.useContext(Nr), h = E.useContext(Yd), y = E.useContext(Br), p = E.useContext(Xd), g = p.reducedMotion, v = p.skipAnimations, b = E.useRef(null), T = E.useRef(!1);
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
  const S = b.current, w = E.useContext(q2);
  S && !S.projection && r && (S.type === "html" || S.type === "svg") && l6(b.current, l, r, w);
  const A = E.useRef(!1);
  E.useInsertionEffect(() => {
    S && A.current && S.update(l, y);
  });
  const _ = l[Iv], D = E.useRef(!!_ && typeof window < "u" && !window.MotionHandoffIsComplete?.(_) && window.MotionHasOptimisedAnimation?.(_));
  return ph(() => {
    T.current = !0, S && (A.current = !0, window.MotionIsMounted = !0, S.updateFeatures(), S.scheduleRenderMicrotask(), D.current && S.animationState && S.animationState.animateChanges());
  }), E.useEffect(() => {
    S && (!D.current && S.animationState && S.animationState.animateChanges(), D.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(_);
    }), D.current = !1), S.enteringChildren = void 0);
  }), S;
}
function l6(a, e, l, s) {
  const { layoutId: r, layout: c, drag: f, dragConstraints: h, layoutScroll: y, layoutRoot: p, layoutAnchor: g, layoutCrossfade: v } = e;
  a.projection = new l(a.latestValues, e["data-framer-portal-id"] ? void 0 : $2(a.parent)), a.projection.setOptions({
    layoutId: r,
    layout: c,
    alwaysMeasureLayout: !!f || h && Gi(h),
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
    layoutRoot: p,
    layoutAnchor: g
  });
}
function $2(a) {
  if (a)
    return a.options.allowProjection !== !1 ? a.projection : $2(a.parent);
}
function s6(a, { forwardMotionProps: e = !1, type: l } = {}, s, r) {
  const c = l ? l === "svg" : hh(a), f = c ? Iw : Ww;
  function h(p, g) {
    let v;
    const b = {
      ...E.useContext(Xd),
      ...p,
      layoutId: o6(p)
    }, { isStatic: T } = b, S = Hw(p), w = f(p, T);
    if (!T && typeof window < "u") {
      r6();
      const A = u6(b);
      v = A.MeasureLayout, S.visualElement = i6(a, w, b, r, A.ProjectionNode, c);
    }
    return m.jsxs(Nr.Provider, { value: S, children: [v && S.visualElement ? m.jsx(v, { visualElement: S.visualElement, ...b }) : null, Qw(a, p, n6(w, S.visualElement, g), w, T, e, c)] });
  }
  h.displayName = `motion.${typeof a == "string" ? a : `create(${a.displayName ?? a.name ?? ""})`}`;
  const y = E.forwardRef(h);
  return y[e6] = a, y;
}
function o6({ layoutId: a }) {
  const e = E.useContext(Gd).id;
  return e && a !== void 0 ? e + "-" + a : a;
}
function r6(a, e) {
  E.useContext(Yd).strict;
}
function u6(a) {
  const e = H2(), { drag: l, layout: s } = e;
  if (!l && !s)
    return {};
  const r = { ...l, ...s };
  return {
    MeasureLayout: l?.isEnabled(a) || s?.isEnabled(a) ? r.MeasureLayout : void 0,
    ProjectionNode: r.ProjectionNode
  };
}
function yh(a, e) {
  return s6(a, e);
}
const c6 = /* @__PURE__ */ yh("button"), tl = /* @__PURE__ */ yh("div"), f6 = /* @__PURE__ */ yh("span");
var d6 = {
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
function h6({
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
  Object.entries(h).sort(([, p], [, g]) => g - p).forEach(([p, g]) => {
    const v = d6[p], b = Math.min(
      ...v.map((T) => {
        const S = h[T.corner];
        if (g === 0 && S === 0)
          return 0;
        const w = f[T.corner], A = T.side === "top" || T.side === "bottom" ? r : c;
        return w >= 0 ? A - w : g / (g + S) * A;
      })
    );
    f[p] = b, h[p] = Math.min(g, b);
  });
  const y = (p) => ({
    radius: h[p],
    roundingAndSmoothingBudget: f[p]
  });
  return {
    topLeft: y("topLeft"),
    topRight: y("topRight"),
    bottomLeft: y("bottomLeft"),
    bottomRight: y("bottomRight")
  };
}
function ss(a) {
  return a * Math.PI / 180;
}
function Ze(a, ...e) {
  let l = a[0];
  for (let s = 0; s < e.length; s++) {
    const r = e[s];
    l += typeof r == "number" ? r.toFixed(4) : r ?? "", l += a[s + 1];
  }
  return l;
}
var vs = {
  p: 0,
  pathSegment: () => ""
};
function mn(a, e, l) {
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
function pn(a, e, l) {
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
var m6 = ({
  cornerRadius: a,
  roundingAndSmoothingBudget: e
}) => {
  const l = Math.min(a, e);
  return l <= 0 ? vs : {
    p: l,
    pathSegment: (s) => {
      const r = mn(l, l, s), c = pn(l, l, s);
      return Ze`a ${l} ${l} 0 0 1 ${r} ${c}`;
    }
  };
};
function gh({
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
  const c = 90 * (1 - e), f = Math.sin(ss(c / 2)) * a * Math.sqrt(2), h = (90 - c) / 2, y = a * Math.tan(ss(h / 2)), p = 45 * e, g = y * Math.cos(ss(p)), v = g * Math.tan(ss(p));
  let b = (r - f - g - v) / 3, T = 2 * b;
  if (l && r > s) {
    const S = s - v - f - g, w = S / 6, A = S - w;
    b = Math.min(b, A), T = S - b, r = Math.min(r, s);
  }
  return { a: T, b, c: g, d: v, p: r, arcSectionLength: f, cornerRadius: a };
}
var p6 = ({
  cornerRadius: a,
  smoothing: e,
  preserveSmoothing: l,
  roundingAndSmoothingBudget: s
}) => {
  const r = gh({
    cornerRadius: a,
    cornerSmoothing: e,
    preserveSmoothing: l,
    roundingAndSmoothingBudget: s
  });
  return r.cornerRadius <= 0 ? vs : {
    p: r.p,
    pathSegment: (c) => {
      switch (c) {
        case "TR":
          return y6(r);
        case "BR":
          return g6(r);
        case "BL":
          return v6(r);
        case "TL":
          return b6(r);
      }
    }
  };
};
function y6({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Ze`c ${e} 0 ${e + l} 0 ${e + l + s} ${r} a ${a} ${a} 0 0 1 ${c} ${c} c ${r} ${s} ${r} ${l + s} ${r} ${e + l + s}`;
}
function g6({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Ze`c 0 ${e} 0 ${e + l} ${-r} ${e + l + s} a ${a} ${a} 0 0 1 -${c} ${c} c ${-s} ${r} ${-(l + s)} ${r} ${-(e + l + s)} ${r}`;
}
function v6({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Ze`c ${-e} 0 ${-(e + l)} 0 ${-(e + l + s)} ${-r} a ${a} ${a} 0 0 1 -${c} -${c} c ${-r} ${-s} ${-r} ${-(l + s)} ${-r} ${-(e + l + s)}`;
}
function b6({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Ze`c 0 ${-e} 0 ${-(e + l)} ${r} ${-(e + l + s)} a ${a} ${a} 0 0 1 ${c} -${c} c ${s} ${-r} ${l + s} ${-r} ${e + l + s} ${-r}`;
}
var x6 = ({
  cornerRadius: a,
  exponent: e,
  roundingAndSmoothingBudget: l
}) => {
  const s = Math.min(a, l);
  if (s <= 0) return vs;
  const r = Number.isFinite(e) ? Math.max(2, e) : 4, c = 2 / r, f = r === 2 ? (b) => b : r === 4 ? Math.sqrt : r === 8 ? (b) => Math.sqrt(Math.sqrt(b)) : (b) => Math.pow(b, c), h = c - 1, y = r === 2 ? () => 1 : r === 4 ? (b) => 1 / Math.sqrt(b) : (b) => Math.pow(b, h), p = [0, Math.PI / 6, Math.PI / 3, Math.PI / 2], g = p.map((b, T) => {
    if (T === 0) return [0, 0];
    if (T === p.length - 1) return [s, s];
    const S = Math.sin(b), w = Math.cos(b);
    return [s * f(S), s * (1 - f(w))];
  }), v = p.map((b, T) => {
    if (T === 0) return [1, 0];
    if (T === p.length - 1) return [0, 1];
    const S = Math.sin(b), w = Math.cos(b), A = c * y(S) * w * s, _ = c * y(w) * S * s, D = Math.hypot(A, _) || 1;
    return [A / D, _ / D];
  });
  return {
    p: s,
    pathSegment: (b) => {
      const T = [];
      for (let S = 0; S < p.length - 1; S++) {
        const [w, A] = g[S], [_, D] = g[S + 1], [j, M] = v[S], [V, B] = v[S + 1], R = (p[S] + p[S + 1]) / 2, k = Math.sin(R), P = Math.cos(R), K = s * f(k), at = s * (1 - f(P)), nt = 8 / 3 * (K - (w + _) / 2), I = 8 / 3 * (at - (A + D) / 2), Q = V * M - B * j, et = Q !== 0 ? (-B * nt + V * I) / Q : 0, N = Q !== 0 ? (j * I - M * nt) / Q : 0, Y = w + et * j, J = A + et * M, it = _ - N * V, ot = D - N * B, O = Y - w, $ = J - A, tt = it - w, st = ot - A, rt = _ - w, ht = D - A, vt = mn(O, $, b), Dt = pn(O, $, b), Mt = mn(tt, st, b), Pt = pn(tt, st, b), Kt = mn(rt, ht, b), Ee = pn(rt, ht, b);
        T.push(Ze`c ${vt} ${Dt} ${Mt} ${Pt} ${Kt} ${Ee}`);
      }
      return T.join(" ");
    }
  };
};
function og(a, e, l, s) {
  if (s <= 0) return { x: 0, y: 0, theta: a };
  const c = s / 32;
  let f = 0, h = 0;
  for (let p = 1; p <= 32; p++) {
    const g = (p - 1) * c, v = g + c, b = (g + v) / 2, T = a + e * g + l / 2 * g * g, S = a + e * v + l / 2 * v * v, w = a + e * b + l / 2 * b * b;
    f += c / 6 * (Math.cos(T) + 4 * Math.cos(w) + Math.cos(S)), h += c / 6 * (Math.sin(T) + 4 * Math.sin(w) + Math.sin(S));
  }
  const y = a + e * s + l / 2 * s * s;
  return { x: f, y: h, theta: y };
}
var S6 = 1e-6, w6 = ({
  cornerRadius: a,
  smoothing: e,
  roundingAndSmoothingBudget: l
}) => {
  if (a <= 0) return vs;
  const s = Math.max(0, Math.min(1, e)), r = a, c = Math.PI / 4 * s, f = Math.PI / 2 * r * s, h = f > 0 ? 1 / (r * f) : 0, { x: y, y: p } = f > 0 ? og(0, 0, h, f) : { x: 0, y: 0 }, { x: g, y: v } = f > 0 ? og(0, 0, h, f / 2) : { x: 0, y: 0 }, b = y - r * Math.sin(c), T = p + r * Math.cos(c), S = b + T;
  let w = S, A = r, _ = y, D = p, j = g, M = v;
  if (S > l && S > 0) {
    const P = l / S;
    w = l, A = r * P, _ = y * P, D = p * P, j = g * P, M = v * P;
  }
  if (w <= 0)
    return vs;
  let V = 0, B = 0;
  if (f > 0) {
    const P = Math.cos(c), K = Math.sin(c);
    K > 1e-12 && (B = 8 / 3 * (D / 2 - M) / K), V = 8 / 3 * (j - _ / 2) + B * P;
  }
  const R = Math.PI / 2 - 2 * c, k = Math.abs(R) > S6;
  return {
    p: w,
    pathSegment: (P) => {
      const K = [];
      if (f > 0) {
        const at = V, nt = 0, I = _ - B * Math.cos(c), Q = D - B * Math.sin(c), et = _, N = D, Y = mn(at, nt, P), J = pn(at, nt, P), it = mn(I, Q, P), ot = pn(I, Q, P), O = mn(et, N, P), $ = pn(et, N, P);
        K.push(Ze`c ${Y} ${J} ${it} ${ot} ${O} ${$}`);
      }
      if (k) {
        const at = w - _ - D, nt = w - _ - D, I = mn(at, nt, P), Q = pn(at, nt, P);
        K.push(Ze`a ${A} ${A} 0 0 1 ${I} ${Q}`);
      }
      if (f > 0) {
        const at = B * Math.sin(c), nt = B * Math.cos(c), I = D, Q = _ - V, et = D, N = _, Y = mn(at, nt, P), J = pn(at, nt, P), it = mn(I, Q, P), ot = pn(I, Q, P), O = mn(et, N, P), $ = pn(et, N, P);
        K.push(Ze`c ${Y} ${J} ${it} ${ot} ${O} ${$}`);
      }
      return K.join(" ");
    }
  };
}, T6 = 4, C6 = {
  arc: m6,
  squircle: p6,
  superellipse: x6,
  clothoid: w6
};
function E6(a) {
  return C6[a];
}
var A6 = 64, Ka = /* @__PURE__ */ new Map();
function j6(a, e) {
  return a + "|" + e.cornerRadius + "|" + e.smoothing + "|" + e.exponent + "|" + (e.preserveSmoothing ? 1 : 0) + "|" + e.roundingAndSmoothingBudget;
}
function M6(a) {
  return !Number.isFinite(a.cornerRadius) || !Number.isFinite(a.smoothing) || !Number.isFinite(a.exponent) || !Number.isFinite(a.roundingAndSmoothingBudget);
}
function _6(a) {
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
function R6(a, e, l) {
  if (M6(l)) return e(l);
  const s = j6(a, l), r = Ka.get(s);
  if (r)
    return Ka.delete(s), Ka.set(s, r), r;
  const c = _6(e(l));
  if (Ka.size >= A6) {
    const f = Ka.keys().next().value;
    f !== void 0 && Ka.delete(f);
  }
  return Ka.set(s, c), c;
}
function Ko(a, e, l, s) {
  const r = Math.min(e, s / a - 1), c = gh({
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
function D6({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Ze`c ${a} 0 ${a + e} 0 ${r} ${s} a ${h} ${h} 0 0 1 ${c} ${f} a ${h} ${h} 0 0 1 ${-c} ${f} c ${-l} ${s} ${-(e + l)} ${s} ${-r} ${s}`;
}
function N6({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Ze`c ${-a} 0 ${-(a + e)} 0 ${-r} ${-s} a ${h} ${h} 0 0 1 ${-c} ${-f} a ${h} ${h} 0 0 1 ${c} ${-f} c ${l} ${-s} ${e + l} ${-s} ${r} ${-s}`;
}
function O6({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Ze`c 0 ${-a} 0 ${-(a + e)} ${s} ${-r} a ${h} ${h} 0 0 1 ${f} ${-c} a ${h} ${h} 0 0 1 ${f} ${c} c ${s} ${l} ${s} ${e + l} ${s} ${r}`;
}
function z6({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Ze`c 0 ${a} 0 ${a + e} ${-s} ${r} a ${h} ${h} 0 0 1 ${-f} ${c} a ${h} ${h} 0 0 1 ${-f} ${-c} c ${-s} ${-l} ${-s} ${-(e + l)} ${-s} ${-r}`;
}
function rg(a, e, l, s) {
  const r = gh({
    cornerRadius: a,
    cornerSmoothing: e,
    preserveSmoothing: l,
    roundingAndSmoothingBudget: s
  }), c = ss(45 * e);
  return {
    a: r.a,
    b: r.b,
    p: r.p,
    sin: Math.sin(c),
    cos: Math.cos(c)
  };
}
var ug = (a, e, l) => Math.max(0, Math.min(a / e - 1, l)), he = (a) => (Object.is(a, -0) ? 0 : a).toFixed(4);
function L6(a, e, l, s, r) {
  const c = rg(l, ug(a / 2, l, s), r, a / 2), f = rg(l, ug(e / 2, l, s), r, e / 2), h = (b, T, S, w, A, _) => {
    const D = w === 0 ? c : f, j = _ === 0 ? c : f, M = b + (S + A) * l, V = T + (w + _) * l, B = M - A * l * D.cos - S * l * D.sin, R = V - _ * l * D.cos - w * l * D.sin, k = M - S * l * j.cos - A * l * j.sin, P = V - w * l * j.cos - _ * l * j.sin, K = b + S * D.p, at = T + w * D.p, nt = Math.hypot(k - B, P - R) > 1e-6, I = nt ? k : B, Q = nt ? P : R, et = b + A * j.p, N = T + _ * j.p;
    let Y = `L ${he(K)} ${he(at)} `;
    return Y += `c ${he(-S * D.a)} ${he(-w * D.a)} ${he(-S * (D.a + D.b))} ${he(-w * (D.a + D.b))} ${he(B - K)} ${he(R - at)} `, nt && (Y += `a ${he(l)} ${he(l)} 0 0 1 ${he(k - B)} ${he(P - R)} `), Y += `c ${he(et - A * (j.a + j.b) - I)} ${he(N - _ * (j.a + j.b) - Q)} ${he(et - A * j.a - I)} ${he(N - _ * j.a - Q)} ${he(et - I)} ${he(N - Q)}`, Y;
  }, y = h(a, 0, -1, 0, 0, 1), p = h(a, e, 0, -1, -1, 0), g = h(0, e, 1, 0, 0, -1), v = h(0, 0, 0, 1, 1, 0);
  return `M ${he(c.p)} 0 ${y} ${p} ${g} ${v} Z`;
}
var B6 = 0.6, V6 = !0, U6 = "squircle";
function G2(a) {
  return {
    radius: a.radius,
    curve: a.curve ?? U6,
    smoothing: a.smoothing ?? B6,
    exponent: a.exponent ?? T6,
    preserveSmoothing: a.preserveSmoothing ?? V6
  };
}
function Zo(a) {
  return G2(typeof a == "number" ? { radius: a } : a ?? { radius: 0 });
}
function k6(a) {
  if ("radius" in a) {
    const e = G2(a);
    return { topLeft: e, topRight: e, bottomRight: e, bottomLeft: e };
  }
  return {
    topLeft: Zo(a.topLeft),
    topRight: Zo(a.topRight),
    bottomRight: Zo(a.bottomRight),
    bottomLeft: Zo(a.bottomLeft)
  };
}
function Y2(a, e, l) {
  if (a <= 0 || e <= 0)
    return "M 0 0 H 0 V 0 H 0 Z";
  const s = k6(l);
  if (s.topLeft.radius <= 0 && s.topRight.radius <= 0 && s.bottomRight.radius <= 0 && s.bottomLeft.radius <= 0)
    return `M 0 0 H ${a} V ${e} H 0 Z`;
  const r = h6({
    topLeftCornerRadius: s.topLeft.radius,
    topRightCornerRadius: s.topRight.radius,
    bottomRightCornerRadius: s.bottomRight.radius,
    bottomLeftCornerRadius: s.bottomLeft.radius,
    width: a,
    height: e
  }), c = (D) => {
    const j = s[D], M = E6(j.curve);
    return R6(j.curve, M, {
      cornerRadius: r[D].radius,
      smoothing: j.smoothing,
      exponent: j.exponent,
      preserveSmoothing: j.preserveSmoothing,
      roundingAndSmoothingBudget: r[D].roundingAndSmoothingBudget
    });
  }, f = (D) => {
    let j;
    return () => j ?? (j = c(D));
  }, h = f("topLeft"), y = f("topRight"), p = f("bottomRight"), g = f("bottomLeft"), v = (D) => D.toFixed(4), b = (D) => D.length > 0 ? " " + D : "", T = s.topLeft;
  if (H6(s)) {
    const D = Math.min(T.radius, a / 2, e / 2), j = Math.min(a, e) / 2, M = 1e-9;
    if (D > 0 && j > D + M && j < (1 + T.smoothing) * D - M)
      return L6(a, e, D, T.smoothing, T.preserveSmoothing);
  }
  const S = 1e-9, w = a >= e, A = w ? e / 2 : a / 2, _ = (D, j) => {
    const M = s[D], V = s[j];
    return M.curve === "squircle" && V.curve === "squircle" && Math.abs(r[D].radius - A) < S && Math.abs(r[j].radius - A) < S && M.smoothing === V.smoothing && M.preserveSmoothing === V.preserveSmoothing;
  };
  if (w) {
    const D = _("topRight", "bottomRight"), j = _("topLeft", "bottomLeft");
    if (D || j) {
      const M = a / 2, V = D ? Ko(A, s.topRight.smoothing, s.topRight.preserveSmoothing, M) : null, B = j ? Ko(A, s.topLeft.smoothing, s.topLeft.preserveSmoothing, M) : null;
      let R = "M " + v(B ? B.p : h().p) + " 0";
      return R += " L " + v(a - (V ? V.p : y().p)) + " 0", V ? R += " " + D6(V) : (R += b(y().pathSegment("TR")), R += " L " + v(a) + " " + v(p().p), R += " L " + v(a) + " " + v(e - p().p), R += b(p().pathSegment("BR"))), B ? (R += " L " + v(B.p) + " " + v(e), R += " " + N6(B)) : (R += " L " + v(a - g().p) + " " + v(e), R += " L " + v(g().p) + " " + v(e), R += b(g().pathSegment("BL")), R += " L 0 " + v(e - h().p), R += " L 0 " + v(h().p), R += b(h().pathSegment("TL"))), R + " Z";
    }
  } else {
    const D = _("topLeft", "topRight"), j = _("bottomLeft", "bottomRight");
    if (D || j) {
      const M = e / 2, V = D ? Ko(A, s.topLeft.smoothing, s.topLeft.preserveSmoothing, M) : null, B = j ? Ko(A, s.bottomLeft.smoothing, s.bottomLeft.preserveSmoothing, M) : null;
      let R;
      return V ? R = "M 0 " + v(V.p) + " " + O6(V) : (R = "M " + v(h().p) + " 0", R += " L " + v(a - y().p) + " 0", R += b(y().pathSegment("TR"))), R += " L " + v(a) + " " + v(e - (B ? B.p : p().p)), B ? R += " " + z6(B) : (R += b(p().pathSegment("BR")), R += " L " + v(g().p) + " " + v(e), R += b(g().pathSegment("BL"))), V ? R += " L 0 " + v(V.p) : (R += " L 0 " + v(e - h().p), R += " L 0 " + v(h().p), R += b(h().pathSegment("TL"))), R + " Z";
    }
  }
  return "M " + v(h().p) + " 0 L " + v(a - y().p) + " 0" + b(y().pathSegment("TR")) + " L " + v(a) + " " + v(p().p) + " L " + v(a) + " " + v(e - p().p) + b(p().pathSegment("BR")) + " L " + v(a - g().p) + " " + v(e) + " L " + v(g().p) + " " + v(e) + b(g().pathSegment("BL")) + " L 0 " + v(e - h().p) + " L 0 " + v(h().p) + b(h().pathSegment("TL")) + " Z";
}
function H6(a) {
  const e = a.topLeft;
  return e.curve === "squircle" && [a.topRight, a.bottomRight, a.bottomLeft].every(
    (l) => l.curve === "squircle" && l.radius === e.radius && l.smoothing === e.smoothing && l.preserveSmoothing === e.preserveSmoothing
  );
}
function q6(a, e, l) {
  return `path("${Y2(a, e, l)}")`;
}
var kt = "http://www.w3.org/2000/svg", $6 = 0;
function vh() {
  return ++$6;
}
function X2(a) {
  const e = a.replace("#", "");
  return e.length === 3 ? "#" + e[0] + e[0] + e[1] + e[1] + e[2] + e[2] : "#" + e;
}
function P2(a) {
  const e = X2(a).replace("#", "");
  return `rgb(${parseInt(e.substring(0, 2), 16)},${parseInt(e.substring(2, 4), 16)},${parseInt(e.substring(4, 6), 16)})`;
}
var G6 = {
  offsetX: 0,
  offsetY: 0,
  blur: 0,
  spread: 0,
  color: "#000",
  opacity: 0
};
function K2(a) {
  const e = /* @__PURE__ */ new Map(), l = JSON.stringify(a);
  return (s, r, c, f) => {
    const h = `${s}:${r}:${f}:${l}`;
    let y = e.get(h);
    return y === void 0 && (y = Y2(s, r, c), e.set(h, y)), y;
  };
}
function Z2(a, e) {
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
function Sd(a) {
  const e = X2(a).replace("#", ""), l = parseInt(e.substring(0, 2), 16), s = parseInt(e.substring(2, 4), 16), r = parseInt(e.substring(4, 6), 16);
  if (l === 0 && s === 0 && r === 0) return "#4c4c4c";
  const c = Math.round(l * 2 / 3), f = Math.round(s * 2 / 3), h = Math.round(r * 2 / 3);
  return "#" + (1 << 24 | c << 16 | f << 8 | h).toString(16).slice(1);
}
function wd(a) {
  return typeof a == "object" && a !== null && "type" in a;
}
function Y6(a) {
  const e = (90 - a) * Math.PI / 180;
  return {
    x1: 0.5 - 0.5 * Math.cos(e),
    y1: 0.5 + 0.5 * Math.sin(e),
    x2: 0.5 + 0.5 * Math.cos(e),
    y2: 0.5 - 0.5 * Math.sin(e)
  };
}
function Q2(a, e) {
  for (; a.lastChild; ) a.removeChild(a.lastChild);
  for (const l of e) {
    const s = document.createElementNS(kt, "stop");
    s.setAttribute("offset", String(l.offset)), s.setAttribute("stop-color", l.color), l.opacity !== void 0 && l.opacity !== 1 && s.setAttribute("stop-opacity", String(l.opacity)), a.appendChild(s);
  }
}
function X6(a, e, l) {
  const s = e.type === "linear" ? "linearGradient" : "radialGradient", r = document.createElementNS(kt, s);
  return r.setAttribute("id", l), F2(r, e), Q2(r, e.stops), a.appendChild(r), r;
}
function P6(a, e) {
  F2(a, e), Q2(a, e.stops);
}
function F2(a, e) {
  if (e.type === "linear") {
    const l = Y6(e.angle ?? 0);
    a.setAttribute("x1", String(l.x1)), a.setAttribute("y1", String(l.y1)), a.setAttribute("x2", String(l.x2)), a.setAttribute("y2", String(l.y2));
  } else
    a.setAttribute("cx", String(e.cx ?? 0.5)), a.setAttribute("cy", String(e.cy ?? 0.5)), a.setAttribute("r", String(e.r ?? 0.5));
}
function cg(a) {
  return { ...a, stops: a.stops.map((e) => ({ ...e, color: Sd(e.color) })) };
}
function Td(a, e, l, s) {
  a.setAttribute("x", String(-e)), a.setAttribute("y", String(-e)), a.setAttribute("width", String(l + e * 2)), a.setAttribute("height", String(s + e * 2));
}
function Qo(a, e, l, s, r) {
  Td(a, l, s, r), Td(e, l, s, r);
}
function Mf(a, e, l) {
  const s = document.createElementNS(kt, "mask");
  s.setAttribute("id", a), l && s.setAttribute("maskUnits", "userSpaceOnUse");
  const r = document.createElementNS(kt, "rect");
  r.setAttribute("fill", "white");
  const c = document.createElementNS(kt, "path");
  return c.setAttribute("fill", "none"), c.setAttribute("stroke", "black"), s.appendChild(r), s.appendChild(c), e.appendChild(s), { mask: s, rect: r, knockout: c };
}
function _f(a) {
  const e = document.createElementNS(kt, "g"), l = document.createElementNS(kt, "path");
  l.setAttribute("fill", "none"), a && l.setAttribute(a.attr, a.value), l.style.display = "none", e.appendChild(l);
  const s = document.createElementNS(kt, "path");
  return s.setAttribute("fill", "none"), a && s.setAttribute(a.attr, a.value), s.style.display = "none", e.appendChild(s), { group: e, strokePath: l, grooveOverlay: s };
}
function yr(a, e) {
  const l = e === "main" ? "gradientEl" : "overlayGradientEl";
  a[l]?.remove(), a[l] = null;
}
function Fo(a, e, l) {
  if (!wd(a))
    return yr(e, l), a;
  const s = l === "main" ? "gradientEl" : "overlayGradientEl", r = l === "main" ? e.gradientId : e.overlayGradientId;
  return e[s] ? P6(e[s], a) : e[s] = X6(e.defs, a, r), `url(#${r})`;
}
function Rf(a, e, l, s, r) {
  if (!a || a.width <= 0 || a.opacity <= 0) {
    r.strokePath.style.display = "none", r.strokeGroup.removeAttribute("mask"), r.grooveOverlay.style.display = "none", yr(r, "main"), yr(r, "overlay");
    return;
  }
  const c = r.strokeMultiplier;
  r.strokePath.style.display = "", r.strokePath.setAttribute("d", e), r.strokePath.setAttribute("stroke", Fo(a.color, r, "main")), r.strokePath.setAttribute("stroke-width", String(a.width * c)), r.strokePath.setAttribute("stroke-opacity", String(a.opacity));
  const f = a.style ?? "solid";
  switch (r.strokeGroup.removeAttribute("mask"), r.grooveOverlay.style.display = "none", r.strokePath.removeAttribute("stroke-dasharray"), r.strokePath.setAttribute("stroke-linecap", "butt"), f !== "groove" && f !== "ridge" && yr(r, "overlay"), f) {
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
      const h = wd(a.color) ? cg(a.color) : Sd(a.color);
      r.strokePath.setAttribute("stroke", Fo(h, r, "main")), r.grooveOverlay.style.display = "", r.grooveOverlay.setAttribute("d", e), r.grooveOverlay.setAttribute("stroke", Fo(a.color, r, "overlay")), r.grooveOverlay.setAttribute("stroke-width", String(a.width * c / 2)), r.grooveOverlay.setAttribute("stroke-opacity", String(a.opacity));
      break;
    }
    case "ridge": {
      const h = wd(a.color) ? cg(a.color) : Sd(a.color);
      r.grooveOverlay.style.display = "", r.grooveOverlay.setAttribute("d", e), r.grooveOverlay.setAttribute("stroke", Fo(h, r, "overlay")), r.grooveOverlay.setAttribute("stroke-width", String(a.width * c / 2)), r.grooveOverlay.setAttribute("stroke-opacity", String(a.opacity));
      break;
    }
  }
}
function K6(a, e) {
  const l = vh(), s = `sc-ishadow-mask-${l}`, r = document.createElementNS(kt, "mask");
  r.setAttribute("id", s), r.setAttribute("maskUnits", "userSpaceOnUse");
  const c = document.createElementNS(kt, "rect");
  c.setAttribute("fill", "white");
  const f = document.createElementNS(kt, "path");
  f.setAttribute("fill", "black"), r.appendChild(c), r.appendChild(f), a.appendChild(r);
  const h = `sc-ishadow-blur-${l}`, y = document.createElementNS(kt, "filter");
  y.setAttribute("id", h), y.setAttribute("x", "-200%"), y.setAttribute("y", "-200%"), y.setAttribute("width", "500%"), y.setAttribute("height", "500%"), y.setAttribute("color-interpolation-filters", "sRGB");
  const p = document.createElementNS(kt, "feGaussianBlur");
  p.setAttribute("stdDeviation", "0"), y.appendChild(p), a.appendChild(y);
  const g = document.createElementNS(kt, "g"), v = document.createElementNS(kt, "rect");
  return v.setAttribute("mask", `url(#${s})`), v.style.display = "none", g.appendChild(v), e.appendChild(g), { maskId: s, mask: r, maskRect: c, maskCutout: f, filterId: h, filter: y, feBlur: p, blurGroup: g, rect: v };
}
function Z6(a) {
  a.mask.remove(), a.filter.remove(), a.blurGroup.remove();
}
function Q6(a) {
  const e = vh(), l = `sc-clip-${e}`, s = `sc-mask-${e}`, r = document.createElementNS(kt, "svg");
  r.style.position = "absolute", r.style.inset = "0", r.style.pointerEvents = "none", r.style.overflow = "visible", r.style.zIndex = "1", r.setAttribute("aria-hidden", "true");
  const c = document.createElementNS(kt, "defs"), f = document.createElementNS(kt, "clipPath");
  f.setAttribute("id", l);
  const h = document.createElementNS(kt, "path");
  f.appendChild(h), c.appendChild(f);
  const y = document.createElementNS(kt, "mask");
  y.setAttribute("id", s), y.setAttribute("maskUnits", "userSpaceOnUse");
  const p = document.createElementNS(kt, "rect");
  p.setAttribute("fill", "white");
  const g = document.createElementNS(kt, "path");
  g.setAttribute("fill", "black"), y.appendChild(p), y.appendChild(g), c.appendChild(y);
  const v = `sc-dbl-inner-${e}`, { rect: b, knockout: T } = Mf(v, c, !1), S = `sc-dbl-outer-${e}`, { mask: w, rect: A, knockout: _ } = Mf(S, c, !0), D = `sc-dbl-middle-${e}`, { mask: j, rect: M, knockout: V } = Mf(D, c, !0);
  r.appendChild(c);
  const B = document.createElementNS(kt, "g");
  B.setAttribute("clip-path", `url(#${l})`), r.appendChild(B);
  const R = [], { group: k, strokePath: P, grooveOverlay: K } = _f({ attr: "clip-path", value: `url(#${l})` });
  r.appendChild(k);
  const { group: at, strokePath: nt, grooveOverlay: I } = _f({ attr: "mask", value: `url(#${s})` });
  r.appendChild(at);
  const { group: Q, strokePath: et, grooveOverlay: N } = _f();
  r.appendChild(Q), a.appendChild(r);
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
  }, J = {
    strokePath: nt,
    grooveOverlay: I,
    strokeGroup: at,
    dblMaskId: S,
    dblKnockout: _,
    dblRect: A,
    strokeMultiplier: 2,
    defs: c,
    gradientEl: null,
    gradientId: `sc-grad-outer-${e}`,
    overlayGradientEl: null,
    overlayGradientId: `sc-grad-outer-ov-${e}`,
    padDblMask: (ot, O, $) => Qo(w, A, ot, O, $)
  }, it = {
    strokePath: et,
    grooveOverlay: N,
    strokeGroup: Q,
    dblMaskId: D,
    dblKnockout: V,
    dblRect: M,
    strokeMultiplier: 1,
    defs: c,
    gradientEl: null,
    gradientId: `sc-grad-middle-${e}`,
    overlayGradientEl: null,
    overlayGradientId: `sc-grad-middle-ov-${e}`,
    padDblMask: (ot, O, $) => Qo(j, M, ot, O, $)
  };
  return {
    update(ot, O, $, tt) {
      if ($ <= 0 || tt <= 0) return;
      r.setAttribute("width", String($)), r.setAttribute("height", String(tt)), r.setAttribute("viewBox", `0 0 ${$} ${tt}`);
      const st = K2(ot), rt = st($, tt, ot, 0);
      h.setAttribute("d", rt), g.setAttribute("d", rt), p.setAttribute("width", String($)), p.setAttribute("height", String(tt)), Rf(O.innerBorder, rt, $, tt, Y);
      const ht = O.outerBorder;
      ht && ht.width > 0 && ht.opacity > 0 && Qo(y, p, ht.width, $, tt), Rf(ht, rt, $, tt, J), Rf(O.middleBorder, rt, $, tt, it);
      const vt = O.innerShadow, Dt = vt == null ? [] : Array.isArray(vt) ? vt : [vt];
      for (; R.length < Dt.length; )
        R.push(K6(c, B));
      for (; R.length > Dt.length; )
        Z6(R.pop());
      for (let Mt = 0; Mt < Dt.length; Mt++) {
        const Pt = Dt[Mt], Kt = R[Mt];
        if (Pt.opacity <= 0) {
          Kt.rect.style.display = "none";
          continue;
        }
        Kt.rect.style.display = "";
        const Ee = Pt.spread, Ea = Math.max(Pt.blur * 3, 20) + Math.max(Math.abs(Pt.offsetX), Math.abs(Pt.offsetY)) + Math.abs(Ee);
        Qo(Kt.mask, Kt.maskRect, Ea, $, tt);
        const rn = Math.max(1, $ - Ee * 2), Aa = Math.max(1, tt - Ee * 2), dt = Ee !== 0 ? Z2(ot, -Ee) : ot;
        Kt.maskCutout.setAttribute("d", st(rn, Aa, dt, -Ee)), Kt.maskCutout.setAttribute(
          "transform",
          `translate(${Pt.offsetX + Ee},${Pt.offsetY + Ee})`
        ), Pt.blur > 0 ? (Kt.feBlur.setAttribute("stdDeviation", String(Pt.blur)), Kt.blurGroup.setAttribute("filter", `url(#${Kt.filterId})`)) : Kt.blurGroup.removeAttribute("filter"), Td(Kt.rect, Ea, $, tt), Kt.rect.setAttribute("fill", P2(Pt.color)), Kt.rect.setAttribute("fill-opacity", String(Pt.opacity));
      }
    },
    destroy() {
      r.remove();
    }
  };
}
function F6(a, e) {
  return Math.ceil(3 * a + Math.abs(e) + 1);
}
function J6(a, e, l, s) {
  a.setAttribute("x", String(-s)), a.setAttribute("y", String(-s)), a.setAttribute("width", String(e + 2 * s)), a.setAttribute("height", String(l + 2 * s));
}
function W6(a, e) {
  const l = `sc-shadow-${vh()}`, s = document.createElementNS(kt, "filter");
  s.setAttribute("id", l), s.setAttribute("filterUnits", "userSpaceOnUse"), s.setAttribute("color-interpolation-filters", "sRGB");
  const r = document.createElementNS(kt, "feGaussianBlur");
  r.setAttribute("stdDeviation", "0"), s.appendChild(r), a.appendChild(s);
  const c = document.createElementNS(kt, "path");
  return e.appendChild(c), { filterId: l, filterEl: s, feBlur: r, pathEl: c };
}
function I6(a) {
  a.filterEl.remove(), a.pathEl.remove();
}
function tT(a) {
  const e = a.style.isolation;
  a.style.isolation = "isolate";
  const l = document.createElementNS(kt, "svg");
  l.style.cssText = "position:absolute;inset:0;overflow:visible;pointer-events:none;z-index:-1", l.setAttribute("width", "100%"), l.setAttribute("height", "100%"), l.setAttribute("aria-hidden", "true");
  const s = document.createElementNS(kt, "defs");
  l.appendChild(s), a.appendChild(l);
  const r = [];
  return {
    update(c, f, h, y) {
      const p = Array.isArray(f) ? f : [f];
      if (!(h > 0 && y > 0 && p.some((T) => T.opacity > 0))) {
        l.style.display = "none";
        return;
      }
      for (; r.length < p.length; ) r.push(W6(s, l));
      for (; r.length > p.length; ) I6(r.pop());
      const v = K2(c);
      let b = !1;
      for (let T = 0; T < p.length; T++) {
        const S = p[T], w = r[p.length - 1 - T];
        if (S.opacity <= 0) {
          w.pathEl.style.display = "none";
          continue;
        }
        const A = S.spread, _ = h + A * 2, D = y + A * 2;
        if (_ <= 0 || D <= 0) {
          w.pathEl.style.display = "none";
          continue;
        }
        b = !0, w.pathEl.style.display = "";
        const j = P2(S.color), M = Z2(c, A);
        if (w.pathEl.setAttribute("d", v(_, D, M, A)), w.pathEl.setAttribute("transform", `translate(${S.offsetX - A},${S.offsetY - A})`), w.pathEl.setAttribute("fill", j), w.pathEl.setAttribute("fill-opacity", String(S.opacity)), S.blur > 0) {
          const V = F6(S.blur, A);
          J6(w.filterEl, _, D, V), w.feBlur.setAttribute("stdDeviation", String(S.blur)), w.pathEl.setAttribute("filter", `url(#${w.filterId})`);
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
var ds = null, ba, os = /* @__PURE__ */ new Map(), bs = /* @__PURE__ */ new Set();
function J2() {
  ba = void 0;
  const a = [...bs];
  bs.clear();
  for (const e of a) {
    const l = os.get(e);
    if (l) for (const s of [...l]) s();
  }
}
function eT() {
  return ds || (ds = new ResizeObserver((a) => {
    for (const e of a)
      bs.add(e.target);
    ba === void 0 && (ba = requestAnimationFrame(J2));
  })), ds;
}
function nT(a, e) {
  if (typeof ResizeObserver > "u") return () => {
  };
  const l = eT();
  let s = os.get(a);
  return s || (s = /* @__PURE__ */ new Set(), os.set(a, s), l.observe(a)), s.add(e), bs.add(a), ba === void 0 && (ba = requestAnimationFrame(J2)), () => {
    s.delete(e), s.size === 0 && (os.delete(a), l.unobserve(a)), os.size === 0 && (ba !== void 0 && (cancelAnimationFrame(ba), ba = void 0), bs.clear(), ds?.disconnect(), ds = null);
  };
}
function aT(a) {
  const e = window.getComputedStyle(a), l = (p) => p.endsWith("px") ? parseFloat(p) : NaN, s = l(e.width), r = l(e.height);
  if (Number.isNaN(s) || Number.isNaN(r))
    return { width: a.offsetWidth, height: a.offsetHeight };
  if (e.boxSizing === "border-box")
    return { width: s, height: r };
  const c = (parseFloat(e.paddingLeft) || 0) + (parseFloat(e.paddingRight) || 0), f = (parseFloat(e.paddingTop) || 0) + (parseFloat(e.paddingBottom) || 0), h = (parseFloat(e.borderLeftWidth) || 0) + (parseFloat(e.borderRightWidth) || 0), y = (parseFloat(e.borderTopWidth) || 0) + (parseFloat(e.borderBottomWidth) || 0);
  return { width: s + c + h, height: r + f + y };
}
function W2(a) {
  const e = a.match(
    /^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)(?:\s*[,/]\s*([\d.]+))?\s*\)$/
  );
  if (!e) return;
  const l = Number(e[1]), s = Number(e[2]), r = Number(e[3]), c = e[4] !== void 0 ? Number(e[4]) : 1;
  return { hex: "#" + (1 << 24 | l << 16 | s << 8 | r).toString(16).slice(1), opacity: c };
}
function iT(a) {
  const e = getComputedStyle(a), l = e.borderTopStyle;
  if (l === "none" || l === "hidden") return;
  const s = parseFloat(e.borderTopWidth);
  if (s <= 0 || isNaN(s)) return;
  const r = W2(e.borderTopColor);
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
function lT(a) {
  if (!a || a === "none") return {};
  const e = [];
  let l = 0, s = 0;
  for (let f = 0; f < a.length; f++)
    a[f] === "(" ? l++ : a[f] === ")" ? l-- : a[f] === "," && l === 0 && (e.push(a.slice(s, f).trim()), s = f + 1);
  e.push(a.slice(s).trim());
  const r = [], c = [];
  for (const f of e) {
    const h = f.includes("inset"), y = f.replace("inset", "").trim(), p = y.match(/rgba?\([^)]+\)/);
    if (!p) continue;
    const g = W2(p[0]);
    if (!g || g.opacity <= 0) continue;
    const b = y.replace(p[0], "").trim().split(/\s+/).map(parseFloat).filter((S) => !isNaN(S));
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
function fg(a) {
  const e = {
    border: a.style.border,
    boxShadow: a.style.boxShadow,
    paddingTop: a.style.paddingTop,
    paddingRight: a.style.paddingRight,
    paddingBottom: a.style.paddingBottom,
    paddingLeft: a.style.paddingLeft
  }, l = iT(a), s = getComputedStyle(a), { shadow: r, innerShadow: c } = lT(s.boxShadow), f = s.boxSizing, h = parseFloat(s.borderTopWidth) || 0, y = parseFloat(s.borderRightWidth) || 0, p = parseFloat(s.borderBottomWidth) || 0, g = parseFloat(s.borderLeftWidth) || 0, v = parseFloat(s.paddingTop) || 0, b = parseFloat(s.paddingRight) || 0, T = parseFloat(s.paddingBottom) || 0, S = parseFloat(s.paddingLeft) || 0;
  l && (a.style.border = "0"), (r || c) && (a.style.boxShadow = "none"), l && f === "content-box" && (h > 0 || y > 0 || p > 0 || g > 0) && (a.style.paddingTop = v + h + "px", a.style.paddingRight = b + y + "px", a.style.paddingBottom = T + p + "px", a.style.paddingLeft = S + g + "px");
  const w = {};
  return l && (w.innerBorder = l), r && (w.shadow = r), c && (w.innerShadow = c), { effects: w, savedStyles: e };
}
function bh(a) {
  return a ? !!(a.innerBorder || a.outerBorder || a.middleBorder || a.innerShadow || a.shadow) : !1;
}
function I2(a, e) {
  return { ...a?.effects, ...e };
}
function dg(a, e) {
  a.style.border = e.border, a.style.boxShadow = e.boxShadow, a.style.paddingTop = e.paddingTop, a.style.paddingRight = e.paddingRight, a.style.paddingBottom = e.paddingBottom, a.style.paddingLeft = e.paddingLeft;
}
var Zi = /* @__PURE__ */ new WeakMap();
function sT(a) {
  const e = Zi.get(a) ?? 0;
  if (e > 0)
    return Zi.set(a, e + 1), !0;
  const l = getComputedStyle(a).position;
  return l !== "static" && l !== "" ? !1 : (Zi.set(a, 1), a.style.position = "relative", !0);
}
function oT(a) {
  const e = Zi.get(a);
  e !== void 0 && (e <= 1 ? (Zi.delete(a), a.style.position = "") : Zi.set(a, e - 1));
}
var Jo = typeof window < "u" ? E.useLayoutEffect : E.useEffect;
function rT(a, e, l, s, r, c) {
  l.update(a, e, r, c), s?.update(a, e.shadow ?? G6, r, c);
}
function Df(a, e) {
  const l = I2(a.extracted, e.effectsPropRef.current);
  bh(l) && tb(a, l, e.wrapperRefRef.current, e.skipShadowHandleRef.current);
  const { width: s, height: r } = aT(a.el);
  if (s <= 0 || r <= 0) return;
  const c = e.syncKeyRef.current;
  s === a.lastWidth && r === a.lastHeight && c === a.lastSyncKey || (a.lastWidth = s, a.lastHeight = r, a.lastSyncKey = c, a.el.style.clipPath = q6(s, r, e.optionsRef.current), a.el.setAttribute("data-state", "ready"), a.effectsHandle && rT(e.optionsRef.current, l, a.effectsHandle, a.shadowHandle, s, r));
}
function tb(a, e, l, s) {
  if (!a.anchor) {
    const r = l?.current ?? a.el.parentElement;
    if (!r) return;
    a.anchor = r, a.didAcquire = sT(r);
  }
  a.effectsHandle || (a.effectsHandle = Q6(a.anchor)), !a.shadowHandle && e.shadow && !s && (a.shadowHandle = tT(a.anchor));
}
function eb(a, e, l) {
  const { wrapperRef: s, effects: r, autoEffects: c, skipShadowHandle: f, onExtractedShadow: h } = l ?? {}, y = E.useRef(e);
  y.current = e;
  const p = E.useRef(r);
  p.current = r;
  const g = E.useRef(s);
  g.current = s;
  const v = E.useRef(f ?? !1);
  v.current = f ?? !1;
  const b = E.useRef(h);
  b.current = h;
  const T = JSON.stringify(e), S = JSON.stringify(r ?? null), w = c ?? !0, A = f ?? !1, _ = E.useRef("");
  _.current = `${T}|${S}`;
  const D = E.useRef({
    optionsRef: y,
    effectsPropRef: p,
    wrapperRefRef: g,
    skipShadowHandleRef: v,
    onExtractedShadowRef: b,
    syncKeyRef: _
  }), j = E.useRef(null);
  Jo(() => {
    const M = a.current;
    if (!M) return;
    const V = M.style.clipPath;
    M.setAttribute("data-slot", "smooth-corners"), M.setAttribute("data-state", "pending");
    const B = w ? fg(M) : void 0, R = {
      el: M,
      savedClipPath: V,
      extracted: B,
      effectsHandle: void 0,
      shadowHandle: void 0,
      anchor: null,
      didAcquire: !1,
      lastWidth: 0,
      lastHeight: 0,
      lastSyncKey: null
    };
    j.current = R;
    const k = I2(R.extracted, p.current);
    bh(k) && tb(R, k, g.current, v.current), b.current?.(R.extracted?.effects.shadow);
    const P = nT(M, () => Df(R, D.current));
    return () => {
      P(), R.effectsHandle?.destroy(), R.shadowHandle?.destroy(), R.extracted && dg(M, R.extracted.savedStyles), b.current?.(void 0), R.didAcquire && R.anchor && oT(R.anchor), j.current = null, M.style.clipPath = V, M.removeAttribute("data-slot"), M.removeAttribute("data-state");
    };
  }, [a]), Jo(() => {
    const M = j.current;
    M && Df(M, D.current);
  }), Jo(() => {
    if (!A) return;
    const M = j.current;
    !M || !M.shadowHandle || (M.shadowHandle.destroy(), M.shadowHandle = void 0, M.lastSyncKey = null);
  }, [A]), Jo(() => {
    const M = j.current;
    if (!M) return;
    const V = M.extracted !== void 0;
    if (w && !V)
      M.extracted = fg(M.el);
    else if (!w && V)
      dg(M.el, M.extracted.savedStyles), M.extracted = void 0;
    else
      return;
    b.current?.(M.extracted?.effects.shadow), M.lastSyncKey = null, Df(M, D.current);
  }, [w]);
}
function nb(...a) {
  return (e) => {
    for (const l of a)
      l && (typeof l == "function" ? l(e) : l.current = e);
  };
}
function uT(a, e) {
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
function cT(a, e) {
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
  const f = c, h = f.props ?? {}, y = h.ref ?? f.ref, p = uT(s, h);
  return E.cloneElement(f, {
    ...p,
    ref: nb(e, y)
  });
}
var fT = E.forwardRef(cT);
function dT(a) {
  const e = Array.isArray(a) ? a : [a], l = [];
  for (const s of e) {
    if (s.opacity <= 0) continue;
    const { offsetX: r, offsetY: c, blur: f, spread: h, color: y, opacity: p } = s, g = hT(y);
    l.push(
      `${r}px ${c}px ${f}px ${h}px rgba(${g.r},${g.g},${g.b},${p})`
    );
  }
  return l.join(", ");
}
function hT(a) {
  const e = a.replace("#", ""), l = e.length === 3 ? e[0] + e[0] + e[1] + e[1] + e[2] + e[2] : e;
  return {
    r: parseInt(l.substring(0, 2), 16),
    g: parseInt(l.substring(2, 4), 16),
    b: parseInt(l.substring(4, 6), 16)
  };
}
function mT(a) {
  if ("radius" in a) return `${a.radius}px`;
  const e = (f) => f === void 0 ? 0 : typeof f == "number" ? f : f.radius, l = e(a.topLeft), s = e(a.topRight), r = e(a.bottomRight), c = e(a.bottomLeft);
  return `${l}px ${s}px ${r}px ${c}px`;
}
function pT(a, e) {
  const {
    as: l,
    asChild: s,
    children: r,
    corners: c,
    innerBorder: f,
    outerBorder: h,
    middleBorder: y,
    innerShadow: p,
    shadow: g,
    autoEffects: v,
    shadowStrategy: b,
    ...T
  } = a, S = l ?? "div", w = E.useRef(null), A = E.useRef(null), _ = E.useMemo(
    () => nb(w, e),
    [e]
  ), D = c ?? { radius: 0 }, j = b === "box-shadow", M = j ? void 0 : g, [V, B] = E.useState(void 0), R = E.useCallback(
    (et) => B(et),
    []
  ), k = {
    innerBorder: f,
    outerBorder: h,
    middleBorder: y,
    innerShadow: p,
    shadow: M
  }, P = bh(k), K = j ? g ?? V : void 0, at = (v ?? !0) || P || K !== void 0;
  eb(w, D, {
    wrapperRef: at ? A : void 0,
    effects: P ? k : void 0,
    autoEffects: v,
    skipShadowHandle: j,
    onExtractedShadow: j ? R : void 0
  });
  const I = s ? E.createElement(fT, { ...T, ref: _ }, r) : E.createElement(S, { ...T, ref: _ }, r);
  if (!at) return I;
  let Q = null;
  if (j && K !== void 0) {
    const et = dT(K);
    if (et !== "") {
      const N = {
        position: "absolute",
        inset: 0,
        borderRadius: mT(D),
        boxShadow: et,
        pointerEvents: "none",
        zIndex: -1
      };
      Q = E.createElement("div", {
        "aria-hidden": !0,
        "data-slot": "smooth-corners-box-shadow",
        style: N
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
        ...Q ? { isolation: "isolate" } : {}
      }
    },
    Q,
    I
  );
}
E.forwardRef(pT);
function hg(a, e) {
  if (typeof a == "function")
    return a(e);
  a != null && (a.current = e);
}
function yT(...a) {
  return (e) => {
    let l = !1;
    const s = a.map((r) => {
      const c = hg(r, e);
      return !l && typeof c == "function" && (l = !0), c;
    });
    if (l)
      return () => {
        for (let r = 0; r < s.length; r++) {
          const c = s[r];
          typeof c == "function" ? c() : hg(a[r], null);
        }
      };
  };
}
function gT(...a) {
  return E.useCallback(yT(...a), a);
}
class vT extends E.Component {
  getSnapshotBeforeUpdate(e) {
    const l = this.props.childRef.current;
    if (rr(l) && e.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = l.offsetParent, r = rr(s) && s.offsetWidth || 0, c = rr(s) && s.offsetHeight || 0, f = getComputedStyle(l), h = this.props.sizeRef.current;
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
function bT({ children: a, isPresent: e, anchorX: l, anchorY: s, root: r, pop: c }) {
  const f = E.useId(), h = E.useRef(null), y = E.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    direction: "ltr"
  }), { nonce: p } = E.useContext(Xd), g = a.props?.ref ?? a?.ref, v = gT(h, g);
  return E.useInsertionEffect(() => {
    const { width: b, height: T, top: S, left: w, right: A, bottom: _, direction: D } = y.current;
    if (e || c === !1 || !h.current || !b || !T)
      return;
    const j = D === "rtl", M = l === "left" ? j ? `right: ${A}` : `left: ${w}` : j ? `left: ${w}` : `right: ${A}`, V = s === "bottom" ? `bottom: ${_}` : `top: ${S}`;
    h.current.dataset.motionPopId = f;
    const B = document.createElement("style");
    p && (B.nonce = p);
    const R = r ?? document.head;
    return R.appendChild(B), B.sheet && B.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${b}px !important;
            height: ${T}px !important;
            ${M}px !important;
            ${V}px !important;
          }
        `), () => {
      h.current?.removeAttribute("data-motion-pop-id"), R.contains(B) && R.removeChild(B);
    };
  }, [e]), m.jsx(vT, { isPresent: e, childRef: h, sizeRef: y, pop: c, children: c === !1 ? a : E.cloneElement(a, { ref: v }) });
}
const xT = ({ children: a, initial: e, isPresent: l, onExitComplete: s, custom: r, presenceAffectsLayout: c, mode: f, anchorX: h, anchorY: y, root: p }) => {
  const g = mh(ST), v = E.useId(), b = E.useRef(l), T = E.useRef(s);
  ph(() => {
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
  }, [l]), a = m.jsx(bT, { pop: f === "popLayout", isPresent: l, anchorX: h, anchorY: y, root: p, children: a }), m.jsx(Br.Provider, { value: w, children: a });
};
function ST() {
  return /* @__PURE__ */ new Map();
}
function ab(a = !0) {
  const e = E.useContext(Br);
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
const Wo = (a) => a.key || "";
function mg(a) {
  const e = [];
  return E.Children.forEach(a, (l) => {
    E.isValidElement(l) && e.push(l);
  }), e;
}
const wT = ({ children: a, custom: e, initial: l = !0, onExitComplete: s, presenceAffectsLayout: r = !0, mode: c = "sync", propagate: f = !1, anchorX: h = "left", anchorY: y = "top", root: p }) => {
  const [g, v] = ab(f), b = E.useMemo(() => mg(a), [a]), T = f && !g ? [] : b.map(Wo), S = E.useRef(!0), w = E.useRef(b), A = mh(() => /* @__PURE__ */ new Map()), _ = E.useRef(/* @__PURE__ */ new Set()), [D, j] = E.useState(b), [M, V] = E.useState(b);
  ph(() => {
    S.current = !1, w.current = b;
    for (let k = 0; k < M.length; k++) {
      const P = Wo(M[k]);
      T.includes(P) ? (A.delete(P), _.current.delete(P)) : A.get(P) !== !0 && A.set(P, !1);
    }
  }, [M, T.length, T.join("-")]);
  const B = [];
  if (b !== D) {
    let k = [...b];
    for (let P = 0; P < M.length; P++) {
      const K = M[P], at = Wo(K);
      T.includes(at) || (k.splice(P, 0, K), B.push(K));
    }
    return c === "wait" && B.length && (k = B), V(mg(k)), j(b), null;
  }
  const { forceRender: R } = E.useContext(Gd);
  return m.jsx(m.Fragment, { children: M.map((k) => {
    const P = Wo(k), K = f && !g ? !1 : b === M || T.includes(P), at = () => {
      if (_.current.has(P))
        return;
      if (A.has(P))
        _.current.add(P), A.set(P, !0);
      else
        return;
      let nt = !0;
      A.forEach((I) => {
        I || (nt = !1);
      }), nt && (R?.(), V(w.current), f && v?.(), s && s());
    };
    return m.jsx(xT, { isPresent: K, initial: !S.current || l ? void 0 : !1, custom: e, presenceAffectsLayout: r, mode: c, root: p, onExitComplete: K ? void 0 : at, anchorX: h, anchorY: y, children: k }, P);
  }) });
};
function TT({ children: a, features: e, strict: l = !1 }) {
  const [, s] = E.useState(!Nf(e)), r = E.useRef(void 0);
  if (!Nf(e)) {
    const { renderer: c, ...f } = e;
    r.current = c, sg(f);
  }
  return E.useEffect(() => {
    Nf(e) && e().then(({ renderer: c, ...f }) => {
      sg(f), r.current = c, s(!0);
    });
  }, []), m.jsx(Yd.Provider, { value: { renderer: r.current, strict: l }, children: a });
}
function Nf(a) {
  return typeof a == "function";
}
const CT = (a, e) => e.isSVG ?? hh(a) ? new P9(e) : new H9(e, {
  allowProjection: a !== E.Fragment
});
class ET extends Ca {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(e) {
    super(e), e.animationState || (e.animationState = J9(e));
  }
  updateAnimationControlsSubscription() {
    const { animate: e } = this.node.getProps();
    zr(e) && (this.unmountControls = e.subscribe(this.node));
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
let AT = 0;
class jT extends Ca {
  constructor() {
    super(...arguments), this.id = AT++, this.isExitComplete = !1;
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
          const h = ai(this.node, c, f);
          if (h) {
            const { transition: y, transitionEnd: p, ...g } = h;
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
const MT = {
  animation: {
    Feature: ET
  },
  exit: {
    Feature: jT
  }
};
function As(a) {
  return {
    point: {
      x: a.pageX,
      y: a.pageY
    }
  };
}
const _T = (a) => (e) => lh(e) && a(e, As(e));
function hs(a, e, l, s) {
  return gs(a, e, _T(l), s);
}
const ib = ({ current: a }) => a ? a.ownerDocument.defaultView : null, pg = (a, e) => Math.abs(a - e);
function RT(a, e) {
  const l = pg(a.x, e.x), s = pg(a.y, e.y);
  return Math.sqrt(l ** 2 + s ** 2);
}
const yg = /* @__PURE__ */ new Set(["auto", "scroll"]);
class lb {
  constructor(e, l, { transformPagePoint: s, contextWindow: r = window, dragSnapToOrigin: c = !1, distanceThreshold: f = 3, element: h } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (S) => {
      this.handleScroll(S.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = Io(this.lastRawMoveEventInfo, this.transformPagePoint));
      const S = Of(this.lastMoveEventInfo, this.history), w = this.startEvent !== null, A = RT(S.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!w && !A)
        return;
      const { point: _ } = S, { timestamp: D } = we;
      this.history.push({ ..._, timestamp: D });
      const { onStart: j, onMove: M } = this.handlers;
      w || (j && j(this.lastMoveEvent, S), this.startEvent = this.lastMoveEvent), M && M(this.lastMoveEvent, S);
    }, this.handlePointerMove = (S, w) => {
      this.lastMoveEvent = S, this.lastRawMoveEventInfo = w, this.lastMoveEventInfo = Io(w, this.transformPagePoint), $t.update(this.updatePoint, !0);
    }, this.handlePointerUp = (S, w) => {
      this.end();
      const { onEnd: A, onSessionEnd: _, resumeAnimation: D } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && D && D(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const j = Of(S.type === "pointercancel" ? this.lastMoveEventInfo : Io(w, this.transformPagePoint), this.history);
      this.startEvent && A && A(S, j), _ && _(S, j);
    }, !lh(e))
      return;
    this.dragSnapToOrigin = c, this.handlers = l, this.transformPagePoint = s, this.distanceThreshold = f, this.contextWindow = r || window;
    const y = As(e), p = Io(y, this.transformPagePoint), { point: g } = p, { timestamp: v } = we;
    this.history = [{ ...g, timestamp: v }];
    const { onSessionStart: b } = l;
    b && b(e, Of(p, this.history));
    const T = { passive: !0, capture: !0 };
    this.removeListeners = Ts(hs(this.contextWindow, "pointermove", this.handlePointerMove, T), hs(this.contextWindow, "pointerup", this.handlePointerUp, T), hs(this.contextWindow, "pointercancel", this.handlePointerUp, T)), h && this.startScrollTracking(h);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(e) {
    let l = e.parentElement;
    for (; l; ) {
      const s = getComputedStyle(l);
      (yg.has(s.overflowX) || yg.has(s.overflowY)) && this.scrollPositions.set(l, {
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
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), wa(this.updatePoint);
  }
}
function Io(a, e) {
  return e ? { point: e(a.point) } : a;
}
function gg(a, e) {
  return { x: a.x - e.x, y: a.y - e.y };
}
function Of({ point: a }, e) {
  return {
    point: a,
    delta: gg(a, sb(e)),
    offset: gg(a, DT(e)),
    velocity: NT(e, 0.1)
  };
}
function DT(a) {
  return a[0];
}
function sb(a) {
  return a[a.length - 1];
}
function NT(a, e) {
  if (a.length < 2)
    return { x: 0, y: 0 };
  let l = a.length - 1, s = null;
  const r = sb(a);
  for (; l >= 0 && (s = a[l], !(r.timestamp - s.timestamp > /* @__PURE__ */ Ke(e))); )
    l--;
  if (!s)
    return { x: 0, y: 0 };
  s === a[0] && a.length > 2 && r.timestamp - s.timestamp > /* @__PURE__ */ Ke(e) * 2 && (s = a[1]);
  const c = /* @__PURE__ */ sn(r.timestamp - s.timestamp);
  if (c === 0)
    return { x: 0, y: 0 };
  const f = {
    x: (r.x - s.x) / c,
    y: (r.y - s.y) / c
  };
  return f.x === 1 / 0 && (f.x = 0), f.y === 1 / 0 && (f.y = 0), f;
}
function OT(a, { min: e, max: l }, s) {
  return e !== void 0 && a < e ? a = s ? qt(e, a, s.min) : Math.max(a, e) : l !== void 0 && a > l && (a = s ? qt(l, a, s.max) : Math.min(a, l)), a;
}
function vg(a, e, l) {
  return {
    min: e !== void 0 ? a.min + e : void 0,
    max: l !== void 0 ? a.max + l - (a.max - a.min) : void 0
  };
}
function zT(a, { top: e, left: l, bottom: s, right: r }) {
  return {
    x: vg(a.x, l, r),
    y: vg(a.y, e, s)
  };
}
function bg(a, e) {
  let l = e.min - a.min, s = e.max - a.max;
  return e.max - e.min < a.max - a.min && ([l, s] = [s, l]), { min: l, max: s };
}
function LT(a, e) {
  return {
    x: bg(a.x, e.x),
    y: bg(a.y, e.y)
  };
}
function BT(a, e) {
  let l = 0.5;
  const s = _e(a), r = _e(e);
  return r > s ? l = /* @__PURE__ */ ms(e.min, e.max - s, a.min) : s > r && (l = /* @__PURE__ */ ms(a.min, a.max - r, e.min)), jn(0, 1, l);
}
function VT(a, e) {
  const l = {};
  return e.min !== void 0 && (l.min = e.min - a.min), e.max !== void 0 && (l.max = e.max - a.min), l;
}
const Cd = 0.35;
function UT(a = Cd) {
  return a === !1 ? a = 0 : a === !0 && (a = Cd), {
    x: xg(a, "left", "right"),
    y: xg(a, "top", "bottom")
  };
}
function xg(a, e, l) {
  return {
    min: Sg(a, e),
    max: Sg(a, l)
  };
}
function Sg(a, e) {
  return typeof a == "number" ? a : a[e] || 0;
}
const kT = /* @__PURE__ */ new WeakMap();
class HT {
  constructor(e) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = me(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = e;
  }
  start(e, { snapToCursor: l = !1, distanceThreshold: s } = {}) {
    const { presenceContext: r } = this.visualElement;
    if (r && r.isPresent === !1)
      return;
    const c = (v) => {
      l && this.snapToCursor(As(v).point), this.stopAnimation();
    }, f = (v, b) => {
      const { drag: T, dragPropagation: S, onDragStart: w } = this.getProps();
      if (T && !S && (this.openDragLock && this.openDragLock(), this.openDragLock = s9(T), !this.openDragLock))
        return;
      this.latestPointerEvent = v, this.latestPanInfo = b, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), Cn((_) => {
        let D = this.getAxisMotionValue(_).get() || 0;
        if (An.test(D)) {
          const { projection: j } = this.visualElement;
          if (j && j.layout) {
            const M = j.layout.layoutBox[_];
            M && (D = _e(M) * (parseFloat(D) / 100));
          }
        }
        this.originPoint[_] = D;
      }), w && $t.update(() => w(v, b), !1, !0), dd(this.visualElement, "transform");
      const { animationState: A } = this.visualElement;
      A && A.setActive("whileDrag", !0);
    }, h = (v, b) => {
      this.latestPointerEvent = v, this.latestPanInfo = b;
      const { dragPropagation: T, dragDirectionLock: S, onDirectionLock: w, onDrag: A } = this.getProps();
      if (!T && !this.openDragLock)
        return;
      const { offset: _ } = b;
      if (S && this.currentDirection === null) {
        this.currentDirection = $T(_), this.currentDirection !== null && w && w(this.currentDirection);
        return;
      }
      this.updateAxis("x", b.point, _), this.updateAxis("y", b.point, _), this.visualElement.render(), A && $t.update(() => A(v, b), !1, !0);
    }, y = (v, b) => {
      this.latestPointerEvent = v, this.latestPanInfo = b, this.stop(v, b), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, p = () => {
      const { dragSnapToOrigin: v } = this.getProps();
      (v || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: g } = this.getProps();
    this.panSession = new lb(e, {
      onSessionStart: c,
      onStart: f,
      onMove: h,
      onSessionEnd: y,
      resumeAnimation: p
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: g,
      distanceThreshold: s,
      contextWindow: ib(this.visualElement),
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
    if (!s || !tr(e, r, this.currentDirection))
      return;
    const c = this.getAxisMotionValue(e);
    let f = this.originPoint[e] + s[e];
    this.constraints && this.constraints[e] && (f = OT(f, this.constraints[e], this.elastic[e])), c.set(f);
  }
  resolveConstraints() {
    const { dragConstraints: e, dragElastic: l } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, r = this.constraints;
    e && Gi(e) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : e && s ? this.constraints = zT(s.layoutBox, e) : this.constraints = !1, this.elastic = UT(l), r !== this.constraints && !Gi(e) && s && this.constraints && !this.hasMutatedConstraints && Cn((c) => {
      this.constraints !== !1 && this.getAxisMotionValue(c) && (this.constraints[c] = VT(s.layoutBox[c], this.constraints[c]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: l } = this.getProps();
    if (!e || !Gi(e))
      return !1;
    const s = e.current, { projection: r } = this.visualElement;
    if (!r || !r.layout)
      return !1;
    r.root && (r.root.scroll = void 0, r.root.updateScroll());
    const c = z9(s, r.root, this.visualElement.getTransformPagePoint());
    let f = LT(r.layout.layoutBox, c);
    if (l) {
      const h = l(D9(f));
      this.hasMutatedConstraints = !!h, h && (f = p2(h));
    }
    return f;
  }
  startAnimation(e) {
    const { drag: l, dragMomentum: s, dragElastic: r, dragTransition: c, dragSnapToOrigin: f, onDragTransitionEnd: h } = this.getProps(), y = this.constraints || {}, p = Cn((g) => {
      if (!tr(g, l, this.currentDirection))
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
    return Promise.all(p).then(h);
  }
  startAxisValueAnimation(e, l) {
    const s = this.getAxisMotionValue(e);
    return dd(this.visualElement, e), s.start(th(e, s, 0, l, this.visualElement, !1));
  }
  stopAnimation() {
    Cn((e) => this.getAxisMotionValue(e).stop());
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
    Cn((l) => {
      const { drag: s } = this.getProps();
      if (!tr(l, s, this.currentDirection))
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
    if (!Gi(l) || !s || !this.constraints)
      return;
    this.stopAnimation();
    const r = { x: 0, y: 0 };
    Cn((f) => {
      const h = this.getAxisMotionValue(f);
      if (h && this.constraints !== !1) {
        const y = h.get();
        r[f] = BT({ min: y, max: y }, this.constraints[f]);
      }
    });
    const { transformTemplate: c } = this.visualElement.getProps();
    this.visualElement.current.style.transform = c ? c({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.constraints = !1, this.resolveConstraints(), Cn((f) => {
      if (!tr(f, e, null))
        return;
      const h = this.getAxisMotionValue(f), { min: y, max: p } = this.constraints[f];
      h.set(qt(y, p, r[f]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    kT.set(this.visualElement, this);
    const e = this.visualElement.current, l = hs(e, "pointerdown", (p) => {
      const { drag: g, dragListener: v = !0 } = this.getProps(), b = p.target, T = b !== e && d9(b);
      g && v && !T && this.start(p);
    });
    let s;
    const r = () => {
      const { dragConstraints: p } = this.getProps();
      Gi(p) && p.current && (this.constraints = this.resolveRefConstraints(), s || (s = qT(e, p.current, () => this.scalePositionWithinConstraints())));
    }, { projection: c } = this.visualElement, f = c.addEventListener("measure", r);
    c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()), $t.read(r);
    const h = gs(window, "resize", () => this.scalePositionWithinConstraints()), y = c.addEventListener("didUpdate", (({ delta: p, hasLayoutChanged: g }) => {
      this.isDragging && g && (Cn((v) => {
        const b = this.getAxisMotionValue(v);
        b && (this.originPoint[v] += p[v].translate, b.set(b.get() + p[v].translate));
      }), this.visualElement.render());
    }));
    return () => {
      h(), l(), f(), y && y(), s && s();
    };
  }
  getProps() {
    const e = this.visualElement.getProps(), { drag: l = !1, dragDirectionLock: s = !1, dragPropagation: r = !1, dragConstraints: c = !1, dragElastic: f = Cd, dragMomentum: h = !0 } = e;
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
function wg(a) {
  let e = !0;
  return () => {
    if (e) {
      e = !1;
      return;
    }
    a();
  };
}
function qT(a, e, l) {
  const s = wy(a, wg(l)), r = wy(e, wg(l));
  return () => {
    s(), r();
  };
}
function tr(a, e, l) {
  return (e === !0 || e === a) && (l === null || l === a);
}
function $T(a, e = 10) {
  let l = null;
  return Math.abs(a.y) > e ? l = "y" : Math.abs(a.x) > e && (l = "x"), l;
}
class GT extends Ca {
  constructor(e) {
    super(e), this.removeGroupControls = on, this.removeListeners = on, this.controls = new HT(e);
  }
  mount() {
    const { dragControls: e } = this.node.getProps();
    e && (this.removeGroupControls = e.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || on;
  }
  update() {
    const { dragControls: e } = this.node.getProps(), { dragControls: l } = this.node.prevProps || {};
    e !== l && (this.removeGroupControls(), e && (this.removeGroupControls = e.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const zf = (a) => (e, l) => {
  a && $t.update(() => a(e, l), !1, !0);
};
class YT extends Ca {
  constructor() {
    super(...arguments), this.removePointerDownListener = on;
  }
  onPointerDown(e) {
    this.session = new lb(e, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: ib(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: e, onPanStart: l, onPan: s, onPanEnd: r } = this.node.getProps();
    return {
      onSessionStart: zf(e),
      onStart: zf(l),
      onMove: zf(s),
      onEnd: (c, f) => {
        delete this.session, r && $t.postRender(() => r(c, f));
      }
    };
  }
  mount() {
    this.removePointerDownListener = hs(this.node.current, "pointerdown", (e) => this.onPointerDown(e));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let Lf = !1;
class XT extends E.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: e, layoutGroup: l, switchLayoutGroup: s, layoutId: r } = this.props, { projection: c } = e;
    c && (l.group && l.group.add(c), s && s.register && r && s.register(c), Lf && c.root.didUpdate(), c.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), c.setOptions({
      ...c.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), pr.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(e) {
    const { layoutDependency: l, visualElement: s, drag: r, isPresent: c } = this.props, { projection: f } = s;
    return f && (f.isPresent = c, e.layoutDependency !== l && f.setOptions({
      ...f.options,
      layoutDependency: l
    }), Lf = !0, r || e.layoutDependency !== l || l === void 0 || e.isPresent !== c ? f.willUpdate() : this.safeToRemove(), e.isPresent !== c && (c ? f.promote() : f.relegate() || $t.postRender(() => {
      const h = f.getStack();
      (!h || !h.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: e, layoutAnchor: l } = this.props, { projection: s } = e;
    s && (s.options.layoutAnchor = l, s.root.didUpdate(), ih.postRender(() => {
      !s.currentAnimation && s.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: e, layoutGroup: l, switchLayoutGroup: s } = this.props, { projection: r } = e;
    Lf = !0, r && (r.scheduleCheckAfterUnmount(), l && l.group && l.group.remove(r), s && s.deregister && s.deregister(r));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function ob(a) {
  const [e, l] = ab(), s = E.useContext(Gd);
  return m.jsx(XT, { ...a, layoutGroup: s, switchLayoutGroup: E.useContext(q2), isPresent: e, safeToRemove: l });
}
const PT = {
  pan: {
    Feature: YT
  },
  drag: {
    Feature: GT,
    ProjectionNode: L2,
    MeasureLayout: ob
  }
};
function Tg(a, e, l) {
  const { props: s } = a;
  a.animationState && s.whileHover && a.animationState.setActive("whileHover", l === "Start");
  const r = "onHover" + l, c = s[r];
  c && $t.postRender(() => c(e, As(e)));
}
class KT extends Ca {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = r9(e, (l, s) => (Tg(this.node, s, "Start"), (r) => Tg(this.node, r, "End"))));
  }
  unmount() {
  }
}
class ZT extends Ca {
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
    this.unmount = Ts(gs(this.node.current, "focus", () => this.onFocus()), gs(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Cg(a, e, l) {
  const { props: s } = a;
  if (a.current instanceof HTMLButtonElement && a.current.disabled)
    return;
  a.animationState && s.whileTap && a.animationState.setActive("whileTap", l === "Start");
  const r = "onTap" + (l === "End" ? "" : l), c = s[r];
  c && $t.postRender(() => c(e, As(e)));
}
class QT extends Ca {
  mount() {
    const { current: e } = this.node;
    if (!e)
      return;
    const { globalTapTarget: l, propagate: s } = this.node.props;
    this.unmount = m9(e, (r, c) => (Cg(this.node, c, "Start"), (f, { success: h }) => Cg(this.node, f, h ? "End" : "Cancel")), {
      useGlobalTarget: l,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const Ed = /* @__PURE__ */ new WeakMap(), Bf = /* @__PURE__ */ new WeakMap(), FT = (a) => {
  const e = Ed.get(a.target);
  e && e(a);
}, JT = (a) => {
  a.forEach(FT);
};
function WT({ root: a, ...e }) {
  const l = a || document;
  Bf.has(l) || Bf.set(l, {});
  const s = Bf.get(l), r = JSON.stringify(e);
  return s[r] || (s[r] = new IntersectionObserver(JT, { root: a, ...e })), s[r];
}
function IT(a, e, l) {
  const s = WT(e);
  return Ed.set(a, l), s.observe(a), () => {
    Ed.delete(a), s.unobserve(a);
  };
}
const tC = {
  some: 0,
  all: 1
};
class eC extends Ca {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: e = {} } = this.node.getProps(), { root: l, margin: s, amount: r = "some", once: c } = e, f = {
      root: l ? l.current : void 0,
      rootMargin: s,
      threshold: typeof r == "number" ? r : tC[r]
    }, h = (y) => {
      const { isIntersecting: p } = y;
      if (this.isInView === p || (this.isInView = p, c && !p && this.hasEnteredView))
        return;
      p && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", p);
      const { onViewportEnter: g, onViewportLeave: v } = this.node.getProps(), b = p ? g : v;
      b && b(y);
    };
    this.stopObserver = IT(this.node.current, f, h);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: e, prevProps: l } = this.node;
    ["amount", "margin", "root"].some(nC(e, l)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function nC({ viewport: a = {} }, { viewport: e = {} } = {}) {
  return (l) => a[l] !== e[l];
}
const aC = {
  inView: {
    Feature: eC
  },
  tap: {
    Feature: QT
  },
  focus: {
    Feature: ZT
  },
  hover: {
    Feature: KT
  }
}, iC = {
  layout: {
    ProjectionNode: L2,
    MeasureLayout: ob
  }
}, lC = {
  renderer: CT,
  ...MT,
  ...aC
}, sC = {
  ...lC,
  ...PT,
  ...iC
};
function oC() {
  !uh.current && d2();
  const [a] = E.useState(Tr.current);
  return a;
}
var Vr = cv();
function rC(a, e) {
  if (a instanceof RegExp) return { keys: !1, pattern: a };
  var l, s, r, c, f = [], h = "", y = a.split("/");
  for (y[0] || y.shift(); r = y.shift(); )
    l = r[0], l === "*" ? (f.push(l), h += r[1] === "?" ? "(?:/(.*))?" : "/(.*)") : l === ":" ? (s = r.indexOf("?", 1), c = r.indexOf(".", 1), f.push(r.substring(1, ~s ? s : ~c ? c : r.length)), h += ~s && !~c ? "(?:/([^/]+?))?" : "/([^/]+?)", ~c && (h += (~s ? "?" : "") + "\\" + r.substring(c))) : h += "/" + r;
  return {
    keys: f,
    pattern: new RegExp("^" + h + (e ? "(?=$|/)" : "/?$"), "i")
  };
}
const uC = "popstate", xh = "pushState", Sh = "replaceState", cC = "hashchange", Eg = [
  uC,
  xh,
  Sh,
  cC
], fC = (a) => {
  for (const e of Eg)
    addEventListener(e, a);
  return () => {
    for (const e of Eg)
      removeEventListener(e, a);
  };
}, rb = (a, e) => WS.useSyncExternalStore(fC, a, e), Ag = () => location.search, dC = ({ ssrSearch: a } = {}) => rb(
  Ag,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrSearch="?foo",
  // client hydrates with just <Router /> and reads from location.search
  a != null ? () => a : Ag
), jg = () => location.pathname, hC = ({ ssrPath: a } = {}) => rb(
  jg,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrPath="/foo",
  // client hydrates with just <Router /> and reads from location.pathname
  a != null ? () => a : jg
), mC = (a, { replace: e = !1, state: l = null } = {}) => history[e ? Sh : xh](l, "", a), pC = (a = {}) => [hC(a), mC], Mg = Symbol.for("wouter_v3");
if (typeof history < "u" && typeof window[Mg] > "u") {
  for (const a of [xh, Sh]) {
    const e = history[a];
    history[a] = function() {
      const l = e.apply(this, arguments), s = new Event(a);
      return s.arguments = arguments, dispatchEvent(s), l;
    };
  }
  Object.defineProperty(window, Mg, { value: !0 });
}
const yC = (a, e) => e.toLowerCase().indexOf(a.toLowerCase()) ? "~" + e : e.slice(a.length) || "/", ub = (a = "") => a === "/" ? "" : a, gC = (a, e) => a[0] === "~" ? a.slice(1) : ub(e) + a, vC = (a = "", e) => yC(_g(ub(a)), _g(e)), _g = (a) => {
  try {
    return decodeURI(a);
  } catch {
    return a;
  }
}, bC = {
  hook: pC,
  searchHook: dC,
  parser: rC,
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
}, xC = E.createContext(bC), SC = () => E.useContext(xC), wC = {};
E.createContext(wC);
const TC = (a) => {
  const [e, l] = a.hook(a);
  return [
    vC(a.base, e),
    fv(
      (s, r) => a.aroundNav(l, gC(s, a.base), r)
    )
  ];
}, CC = E.forwardRef((a, e) => {
  const l = SC(), [s, r] = TC(l), {
    to: c = "",
    href: f = c,
    onClick: h,
    asChild: y,
    children: p,
    className: g,
    /* eslint-disable no-unused-vars */
    replace: v,
    state: b,
    transition: T,
    /* eslint-enable no-unused-vars */
    ...S
  } = a, w = fv((_) => {
    _.ctrlKey || _.metaKey || _.altKey || _.shiftKey || _.button !== 0 || (h?.(_), _.defaultPrevented || (_.preventDefault(), r(f, a)));
  }), A = l.hrefs(
    f[0] === "~" ? f.slice(1) : l.base + f,
    l
    // pass router as a second argument for convinience
  );
  return y && E.isValidElement(p) ? E.cloneElement(p, { onClick: w, href: A }) : E.createElement("a", {
    ...S,
    onClick: w,
    href: A,
    // `className` can be a function to apply the class if this link is active
    className: g?.call ? g(s === f) : g,
    children: p,
    ref: e
  });
}), wh = Object.freeze({
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
}), Ur = Object.freeze({
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
}), EC = "_root_xunnd_1", Rg = "_glassBackground_xunnd_5", Dg = "_glassShadow_xunnd_25", AC = "_glassBorder_1y4zy_1", jC = "_muted_1y4zy_15", xs = (a) => {
  const e = wt.c(2), {
    className: l,
    muted: s
  } = a, r = `${AC} ${s !== void 0 && s ? jC : ""} ${l === void 0 ? "" : l}`;
  let c;
  return e[0] !== r ? (c = /* @__PURE__ */ m.jsx("div", {
    className: r,
    "aria-hidden": "true"
  }), e[0] = r, e[1] = c) : c = e[1], c;
}, Th = (a) => {
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
    return e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (S = /* @__PURE__ */ m.jsxs(m.Fragment, {
      children: [/* @__PURE__ */ m.jsx("div", {
        className: Rg,
        "aria-hidden": "true"
      }), /* @__PURE__ */ m.jsx("div", {
        className: Dg,
        "aria-hidden": "true"
      }), /* @__PURE__ */ m.jsx(xs, {})]
    }), e[7] = S) : S = e[7], S;
  }
  const p = `${EC} ${f}`;
  let g, v, b;
  e[8] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (g = /* @__PURE__ */ m.jsx("div", {
    className: Rg,
    "aria-hidden": "true"
  }), v = /* @__PURE__ */ m.jsx("div", {
    className: Dg,
    "aria-hidden": "true"
  }), b = /* @__PURE__ */ m.jsx(xs, {}), e[8] = g, e[9] = v, e[10] = b) : (g = e[8], v = e[9], b = e[10]);
  let T;
  return e[11] !== l || e[12] !== s || e[13] !== y || e[14] !== p ? (T = /* @__PURE__ */ m.jsxs("div", {
    className: p,
    style: y,
    ...s,
    children: [g, v, b, l]
  }), e[11] = l, e[12] = s, e[13] = y, e[14] = p, e[15] = T) : T = e[15], T;
}, MC = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/arrow-down" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M11.2482 20.3129C11.6466 20.7682 12.3556 20.7682 12.7541 20.3129L17.5499 14.8314C18.1155 14.1849 17.6561 13.1732 16.797 13.1732H13.5011V5.67324C13.5011 4.84481 12.8295 4.17324 12.0011 4.17324C11.1727 4.17324 10.5011 4.84481 10.5011 5.67324V13.1732H7.20522C6.34614 13.1732 5.88678 14.1849 6.45229 14.8314L11.2482 20.3129Z", fill: "#3D3C3A" }))), _C = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/arrow-up" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M11.2483 3.85905C11.6467 3.40376 12.3558 3.40375 12.7542 3.85905L17.5501 9.3405C18.1158 9.98708 17.6563 10.9997 16.7971 10.9997H13.5012V18.4997C13.501 19.3279 12.8295 19.9997 12.0012 19.9997C11.1729 19.9997 10.5014 19.3279 10.5012 18.4997V10.9997H7.20535C6.34619 10.9997 5.88666 9.98708 6.45242 9.3405L11.2483 3.85905Z", fill: "#3D3C3A" }))), RC = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/star" }, /* @__PURE__ */ E.createElement("path", { id: "Vector 234255911", d: "M11 16L15 12L11 8", stroke: "#3D3C3A", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }))), cb = "_redaction_dcm1f_1", fb = "_active_dcm1f_19", DC = "_sized_dcm1f_29", Vf = 1800, NC = 1.3, db = /* @__PURE__ */ E.createContext(null), kr = () => E.useContext(db);
let Mr = [];
const OC = () => {
  const a = Mr;
  Mr = [];
  const e = performance.now(), l = a.map((s) => {
    const r = s.getBoundingClientRect().top + window.scrollY;
    return -(((e - r * NC) % Vf + Vf) % Vf);
  });
  a.forEach((s, r) => {
    s.style.setProperty("--wave-phase", `${Math.round(l[r])}ms`);
  });
}, Hr = (a) => {
  a && (Mr.length === 0 && requestAnimationFrame(OC), Mr.push(a));
}, Ch = (a) => a ? `${cb} ${fb}` : "", zC = 10, ei = (a) => {
  const e = wt.c(7), {
    active: l,
    width: s,
    children: r
  } = a, c = r != null && r !== "", f = s ?? (!c && l ? zC : void 0), h = l ? Hr : void 0, y = `
                ${cb}
                ${l ? fb : ""}
                ${f ? DC : ""}`;
  let p;
  e[0] !== f ? (p = f ? {
    width: `${f}ch`
  } : void 0, e[0] = f, e[1] = p) : p = e[1];
  const g = c ? r : " ";
  let v;
  return e[2] !== h || e[3] !== y || e[4] !== p || e[5] !== g ? (v = /* @__PURE__ */ m.jsx("span", {
    ref: h,
    className: y,
    style: p,
    children: g
  }), e[2] = h, e[3] = y, e[4] = p, e[5] = g, e[6] = v) : v = e[6], v;
}, Qi = (a) => {
  const e = wt.c(6), {
    className: l,
    as: s,
    active: r
  } = a, c = l === void 0 ? "" : l, f = s === void 0 ? "div" : s, h = kr(), y = r ?? h ?? !0, p = Ch(y), g = y ? Hr : void 0, v = `${c} ${p}`;
  let b;
  e[0] !== v ? (b = v.trim(), e[0] = v, e[1] = b) : b = e[1];
  let T;
  return e[2] !== f || e[3] !== g || e[4] !== b ? (T = /* @__PURE__ */ m.jsx(f, {
    ref: g,
    className: b
  }), e[2] = f, e[3] = g, e[4] = b, e[5] = T) : T = e[5], T;
}, hb = (a) => {
  const e = wt.c(3), {
    active: l,
    children: s
  } = a, r = !!(l === void 0 || l);
  let c;
  return e[0] !== s || e[1] !== r ? (c = /* @__PURE__ */ m.jsx(db.Provider, {
    value: r,
    children: s
  }), e[0] = s, e[1] = r, e[2] = c) : c = e[2], c;
}, Eh = "_text_9l4iv_1", _r = "_icon_9l4iv_28", mb = "_title32_9l4iv_34", pb = "_title24_9l4iv_35", yb = "_title20_9l4iv_36", gb = "_body_9l4iv_56", vb = "_subtitle_9l4iv_63", bb = "_caption_9l4iv_70", LC = {
  text: Eh,
  icon: _r,
  title32: mb,
  title24: pb,
  title20: yb,
  body: gb,
  subtitle: vb,
  caption: bb
}, BC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  body: gb,
  caption: bb,
  default: LC,
  icon: _r,
  subtitle: vb,
  text: Eh,
  title20: yb,
  title24: pb,
  title32: mb
}, Symbol.toStringTag, { value: "Module" })), VC = {
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
  let l, s, r, c, f, h, y, p, g, v, b;
  e[0] !== a ? ({
    as: l,
    variant: v,
    weight: b,
    rounded: p,
    skeleton: g,
    caps: r,
    chevron: c,
    arrow: s,
    children: f,
    className: h,
    ...y
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c, e[5] = f, e[6] = h, e[7] = y, e[8] = p, e[9] = g, e[10] = v, e[11] = b) : (l = e[1], s = e[2], r = e[3], c = e[4], f = e[5], h = e[6], y = e[7], p = e[8], g = e[9], v = e[10], b = e[11]);
  const T = v === void 0 ? "body" : v, S = kr(), w = l || "div", A = g !== void 0 ? !!g : !!S, _ = g !== void 0 || S !== null, D = typeof g == "number" ? g : void 0;
  let j;
  e[12] !== A || e[13] !== f || e[14] !== _ || e[15] !== D ? (j = _ ? /* @__PURE__ */ m.jsx(ei, {
    active: A,
    width: D,
    children: f
  }) : f, e[12] = A, e[13] = f, e[14] = _, e[15] = D, e[16] = j) : j = e[16];
  const M = j, V = s?.direction === "down" ? MC : _C, B = `${Eh} ${BC[VC[T] || "body"]} ${h || ""}`, R = p || void 0, k = r || void 0, P = A || void 0;
  let K;
  e[17] !== V || e[18] !== s?.direction ? (K = s?.direction && /* @__PURE__ */ m.jsx(V, {
    className: _r
  }), e[17] = V, e[18] = s?.direction, e[19] = K) : K = e[19];
  let at;
  e[20] !== c ? (at = c && /* @__PURE__ */ m.jsx(RC, {
    className: _r
  }), e[20] = c, e[21] = at) : at = e[21];
  let nt;
  return e[22] !== w || e[23] !== M || e[24] !== y || e[25] !== B || e[26] !== R || e[27] !== k || e[28] !== P || e[29] !== K || e[30] !== at || e[31] !== T || e[32] !== b ? (nt = /* @__PURE__ */ m.jsxs(w, {
    ...y,
    className: B,
    "data-variant": T,
    "data-weight": b,
    "data-rounded": R,
    "data-caps": k,
    "data-skeleton": P,
    children: [K, M, at]
  }), e[22] = w, e[23] = M, e[24] = y, e[25] = B, e[26] = R, e[27] = k, e[28] = P, e[29] = K, e[30] = at, e[31] = T, e[32] = b, e[33] = nt) : nt = e[33], nt;
}, Ah = {
  skin: "apple",
  isApple: !0,
  isMaterial: !1,
  setSkin: () => {
  }
}, xb = /* @__PURE__ */ E.createContext(Ah), ll = () => E.useContext(xb) || Ah;
function UC(a) {
  const e = wt.c(3), {
    children: l
  } = a;
  let s;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (s = [], e[0] = s) : s = e[0], E.useEffect(kC, s);
  let r;
  return e[1] !== l ? (r = /* @__PURE__ */ m.jsx(xb.Provider, {
    value: Ah,
    children: l
  }), e[1] = l, e[2] = r) : r = e[2], r;
}
function kC() {
  document.body.classList.remove("material", "skin-switcher-active"), document.body.classList.add("apple");
}
const jh = "_button_1d7yf_1", Sb = "_regular_1d7yf_21", wb = "_overlay_1d7yf_35", Tb = "_secondary_1d7yf_42", Cb = "_accent_1d7yf_47", Mh = "_icon_1d7yf_53", _h = "_label_1d7yf_57", Rh = "_content_1d7yf_61", HC = {
  button: jh,
  regular: Sb,
  overlay: wb,
  secondary: Tb,
  accent: Cb,
  icon: Mh,
  label: _h,
  content: Rh
}, qC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accent: Cb,
  button: jh,
  content: Rh,
  default: HC,
  icon: Mh,
  label: _h,
  overlay: wb,
  regular: Sb,
  secondary: Tb
}, Symbol.toStringTag, { value: "Module" })), Ng = (a) => {
  const e = wt.c(16), {
    children: l,
    onClick: s,
    variant: r,
    ariaLabel: c,
    title: f
  } = a, h = r === void 0 ? "regular" : r, y = typeof l == "string", p = h === "regular" || h === "overlay", g = `${jh} ${qC[h]} ${y ? _h : Mh}`;
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
  e[2] !== p ? (T = p && /* @__PURE__ */ m.jsx(xs, {
    muted: !0
  }), e[2] = p, e[3] = T) : T = e[3];
  let S;
  e[4] !== l || e[5] !== y ? (S = y ? /* @__PURE__ */ m.jsx(lt, {
    variant: "body",
    weight: "medium",
    children: l
  }) : l, e[4] = l, e[5] = y, e[6] = S) : S = e[6];
  let w;
  e[7] !== S ? (w = /* @__PURE__ */ m.jsx("span", {
    className: Rh,
    children: S
  }), e[7] = S, e[8] = w) : w = e[8];
  let A;
  return e[9] !== c || e[10] !== s || e[11] !== g || e[12] !== T || e[13] !== w || e[14] !== f ? (A = /* @__PURE__ */ m.jsxs(c6, {
    type: "button",
    className: g,
    onClick: s,
    "aria-label": c,
    title: f,
    whileTap: v,
    transition: b,
    children: [T, w]
  }), e[9] = c, e[10] = s, e[11] = g, e[12] = T, e[13] = w, e[14] = f, e[15] = A) : A = e[15], A;
}, $C = /* @__PURE__ */ E.createContext(!1), GC = "_root_125i3_1", Og = "_side_125i3_9", YC = "_trailing_125i3_18", XC = "_middle_125i3_22", PC = "_middleOverlay_125i3_31", KC = "_titlePill_125i3_35", ZC = "_titleContent_125i3_45", QC = "_inModal_125i3_59", FC = (a) => {
  const e = wt.c(32), {
    left: l,
    onLeft: s,
    leftVariant: r,
    leftAriaLabel: c,
    leftTitle: f,
    right: h,
    onRight: y,
    rightVariant: p,
    rightAriaLabel: g,
    rightTitle: v,
    overlay: b,
    titleGlass: T,
    children: S
  } = a, w = b === void 0 ? !1 : b, A = T === void 0 ? !1 : T, {
    isApple: _
  } = ll(), D = E.useContext($C), j = w ? "overlay" : "regular";
  let M;
  e[0] !== S ? (M = /* @__PURE__ */ m.jsx(lt, {
    variant: "body",
    weight: "semibold",
    children: S
  }), e[0] = S, e[1] = M) : M = e[1];
  const V = M, B = `${GC} ${D ? QC : ""}`;
  let R;
  e[2] !== j || e[3] !== l || e[4] !== c || e[5] !== f || e[6] !== r || e[7] !== s ? (R = l != null && /* @__PURE__ */ m.jsx(Ng, {
    onClick: s,
    variant: r ?? j,
    ariaLabel: c,
    title: f,
    children: l
  }), e[2] = j, e[3] = l, e[4] = c, e[5] = f, e[6] = r, e[7] = s, e[8] = R) : R = e[8];
  let k;
  e[9] !== R ? (k = /* @__PURE__ */ m.jsx("div", {
    className: Og,
    children: R
  }), e[9] = R, e[10] = k) : k = e[10];
  let P;
  e[11] !== j || e[12] !== y || e[13] !== h || e[14] !== g || e[15] !== v || e[16] !== p ? (P = h != null && /* @__PURE__ */ m.jsx(Ng, {
    onClick: y,
    variant: p ?? j,
    ariaLabel: g,
    title: v,
    children: h
  }), e[11] = j, e[12] = y, e[13] = h, e[14] = g, e[15] = v, e[16] = p, e[17] = P) : P = e[17];
  let K;
  e[18] !== P ? (K = /* @__PURE__ */ m.jsx("div", {
    className: `${Og} ${YC}`,
    children: P
  }), e[18] = P, e[19] = K) : K = e[19];
  const at = `${XC} ${w ? PC : ""}`;
  let nt;
  e[20] !== _ || e[21] !== V || e[22] !== A ? (nt = _ && A ? /* @__PURE__ */ m.jsxs("div", {
    className: KC,
    children: [/* @__PURE__ */ m.jsx(Th, {}), /* @__PURE__ */ m.jsx("span", {
      className: ZC,
      children: V
    })]
  }) : V, e[20] = _, e[21] = V, e[22] = A, e[23] = nt) : nt = e[23];
  let I;
  e[24] !== nt || e[25] !== at ? (I = /* @__PURE__ */ m.jsx("div", {
    className: at,
    children: nt
  }), e[24] = nt, e[25] = at, e[26] = I) : I = e[26];
  let Q;
  return e[27] !== I || e[28] !== B || e[29] !== k || e[30] !== K ? (Q = /* @__PURE__ */ m.jsxs("div", {
    className: B,
    "data-modal-drag": "",
    children: [k, K, I]
  }), e[27] = I, e[28] = B, e[29] = k, e[30] = K, e[31] = Q) : Q = e[31], Q;
}, JC = /* @__PURE__ */ E.createContext({
  inDetailPane: !1
}), WC = () => E.useContext(JC), Qt = () => {
}, er = () => ({
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
}), IC = {
  initData: "",
  themeParams: {},
  viewportHeight: 0,
  BackButton: er(),
  SettingsButton: er(),
  MainButton: er(),
  SecondaryButton: er(),
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
}, Ta = globalThis.Telegram?.WebApp ?? IC;
function t8(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var Uf = { exports: {} }, kf, zg;
function e8() {
  if (zg) return kf;
  zg = 1;
  var a = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return kf = a, kf;
}
var Hf, Lg;
function n8() {
  if (Lg) return Hf;
  Lg = 1;
  var a = /* @__PURE__ */ e8();
  function e() {
  }
  function l() {
  }
  return l.resetWarningCache = e, Hf = function() {
    function s(f, h, y, p, g, v) {
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
  }, Hf;
}
var Bg;
function a8() {
  return Bg || (Bg = 1, Uf.exports = /* @__PURE__ */ n8()()), Uf.exports;
}
var i8 = /* @__PURE__ */ a8();
const yn = /* @__PURE__ */ t8(i8);
yn.func;
const Dh = "_button_124dm_1", Eb = "_filled_124dm_9", Ab = "_tinted_124dm_14", jb = "_plain_124dm_19", Mb = "_outlined_124dm_24", _b = "_gray_124dm_28", Rb = "_disabled_124dm_33", Nh = "_skeleton_124dm_38", Db = "_wave_124dm_1", l8 = {
  button: Dh,
  filled: Eb,
  tinted: Ab,
  plain: jb,
  outlined: Mb,
  gray: _b,
  disabled: Rb,
  skeleton: Nh,
  wave: Db
}, s8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  button: Dh,
  default: l8,
  disabled: Rb,
  filled: Eb,
  gray: _b,
  outlined: Mb,
  plain: jb,
  skeleton: Nh,
  tinted: Ab,
  wave: Db
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
    isApple: p
  } = ll(), g = !!kr(), v = Ch(g);
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
  e[15] !== l ? (A = /* @__PURE__ */ m.jsx(lt, {
    variant: "body",
    weight: "semibold",
    children: l
  }), e[15] = l, e[16] = A) : A = e[16];
  const _ = A, D = g ? Hr : void 0, j = `${Dh} ${s8[f]} ${g ? Nh : ""} ${v}`;
  let M;
  e[17] !== p || e[18] !== g ? (M = p && !g && {
    whileTap: {
      scale: 1.02
    }
  }, e[17] = p, e[18] = g, e[19] = M) : M = e[19];
  let V;
  e[20] !== g || e[21] !== f ? (V = f === "filled" && !g && /* @__PURE__ */ m.jsx(xs, {}), e[20] = g, e[21] = f, e[22] = V) : V = e[22];
  let B;
  e[23] !== _ || e[24] !== g ? (B = g ? /* @__PURE__ */ m.jsx(hb, {
    active: !1,
    children: _
  }) : _, e[23] = _, e[24] = g, e[25] = B) : B = e[25];
  let R;
  return e[26] !== w || e[27] !== s || e[28] !== V || e[29] !== B || e[30] !== D || e[31] !== j || e[32] !== M ? (R = /* @__PURE__ */ m.jsxs(tl, {
    ref: D,
    className: j,
    ...M,
    ...w,
    ...s,
    children: [V, B]
  }), e[26] = w, e[27] = s, e[28] = V, e[29] = B, e[30] = D, e[31] = j, e[32] = M, e[33] = R) : R = e[33], R;
};
function Nb(a) {
  var e, l, s = "";
  if (typeof a == "string" || typeof a == "number") s += a;
  else if (typeof a == "object") if (Array.isArray(a)) {
    var r = a.length;
    for (e = 0; e < r; e++) a[e] && (l = Nb(a[e])) && (s && (s += " "), s += l);
  } else for (l in a) a[l] && (s && (s += " "), s += l);
  return s;
}
function o8() {
  for (var a, e, l = 0, s = "", r = arguments.length; l < r; l++) (a = arguments[l]) && (e = Nb(a)) && (s && (s += " "), s += e);
  return s;
}
const Ob = (...a) => o8(...a), r8 = {
  SNACKBAR: {
    type: "spring",
    stiffness: 280,
    damping: 26
  }
}, zb = "_overlay_qo6yx_1", Lb = "_opacity_qo6yx_2", Oh = "_fadeIn_qo6yx_6", zh = "_fadeOut_qo6yx_10", u8 = {
  overlay: zb,
  opacity: Lb,
  fadeIn: Oh,
  fadeOut: zh,
  "overlay-out": "_overlay-out_qo6yx_1",
  "opacity-out": "_opacity-out_qo6yx_1"
}, c8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: u8,
  fadeIn: Oh,
  fadeOut: zh,
  opacity: Lb,
  overlay: zb
}, Symbol.toStringTag, { value: "Module" })), f8 = typeof window < "u" && "ontouchstart" in window, d8 = 250;
function h8(a) {
  const e = wt.c(21);
  let l;
  e[0] !== a ? (l = a === void 0 ? {} : a, e[0] = a, e[1] = l) : l = e[1];
  const {
    onTap: s,
    onTapOut: r,
    mode: c,
    disabled: f
  } = l, h = c8[c === void 0 ? "overlay" : c], [y, p] = E.useState(!1);
  let g;
  e[2] !== h ? (g = [h], e[2] = h, e[3] = g) : g = e[3];
  const [v, b] = E.useState(g), T = E.useRef();
  let S;
  e[4] !== h || e[5] !== r ? (S = () => {
    p(!1), b([h, zh]), r?.(), T.current = window.setTimeout(() => {
      b([h]);
    }, d8);
  }, e[4] = h, e[5] = r, e[6] = S) : S = e[6];
  const w = S;
  let A;
  e[7] !== h || e[8] !== s ? (A = (R) => {
    clearTimeout(T.current), p(!0), b([h, Oh]), s?.(R);
  }, e[7] = h, e[8] = s, e[9] = A) : A = e[9];
  const _ = A;
  let D, j;
  e[10] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (D = () => () => clearTimeout(T.current), j = [], e[10] = D, e[11] = j) : (D = e[10], j = e[11]), E.useEffect(D, j);
  let M;
  e[12] !== f || e[13] !== _ || e[14] !== w || e[15] !== y ? (M = f8 ? {
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
  }, e[12] = f, e[13] = _, e[14] = w, e[15] = y, e[16] = M) : M = e[16];
  const V = M;
  let B;
  return e[17] !== V || e[18] !== y || e[19] !== v ? (B = [y, V, v], e[17] = V, e[18] = y, e[19] = v, e[20] = B) : B = e[20], B;
}
const m8 = "_root_1oiyj_1", p8 = "_fade_1oiyj_22", y8 = "_ripples_1oiyj_30", g8 = "_ripple_1oiyj_30", v8 = "_tapped_1oiyj_47", nr = (...a) => a.filter(Boolean).join(" "), b8 = (a, e) => {
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
}, Ce = ({
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
  } = ll(), [y, p] = E.useState({}), [g, v, b] = h8({
    mode: s,
    disabled: r,
    onTap: ({
      target: w,
      clientX: A,
      clientY: _
    }) => {
      if (!h || !w) return;
      const {
        x: D,
        y: j,
        width: M,
        height: V
      } = w.getBoundingClientRect(), B = Math.max(M * 2, V * 2);
      p((R) => ({
        ...R,
        [`${performance.now()}`]: [A - D - B / 2, _ - j - B / 2, B]
      }));
    }
  }), T = s === "opacity", S = b8(c, v);
  return /* @__PURE__ */ m.jsxs(a, {
    ...S,
    disabled: r || void 0,
    className: nr(m8, l, T && nr(...b)),
    children: [e, f && !T && /* @__PURE__ */ m.jsx("div", {
      className: nr(p8, ...b)
    }), h && /* @__PURE__ */ m.jsx("div", {
      className: y8,
      children: Object.entries(y).map(([w, A]) => /* @__PURE__ */ m.jsx("span", {
        className: nr(g8, g && v8),
        style: {
          left: A[0],
          top: A[1],
          width: A[2],
          height: A[2]
        },
        onAnimationEnd: () => {
          g || p((_) => {
            const D = {
              ..._
            };
            return delete D[w], D;
          });
        }
      }, w))
    })]
  });
}, x8 = "_label_1w5sq_1", S8 = "_accent_1w5sq_6", w8 = "_description_1w5sq_10", Vg = "_caption_1w5sq_14", T8 = (a) => {
  const e = wt.c(15), {
    type: l,
    title: s,
    description: r,
    caption: c,
    bold: f
  } = a, h = f ? "medium" : "regular", y = `${x8} ${l === "Accent" ? S8 : ""}`;
  let p;
  e[0] !== s || e[1] !== h ? (p = /* @__PURE__ */ m.jsx(lt, {
    variant: "body",
    weight: h,
    children: s
  }), e[0] = s, e[1] = h, e[2] = p) : p = e[2];
  let g;
  e[3] !== y || e[4] !== p ? (g = /* @__PURE__ */ m.jsx("div", {
    className: y,
    children: p
  }), e[3] = y, e[4] = p, e[5] = g) : g = e[5];
  let v;
  e[6] !== c || e[7] !== r ? (v = r && /* @__PURE__ */ m.jsx("div", {
    className: c ? w8 : Vg,
    children: /* @__PURE__ */ m.jsx(lt, {
      variant: c ? "subheadline1" : "subheadline2",
      weight: "regular",
      children: r
    })
  }), e[6] = c, e[7] = r, e[8] = v) : v = e[8];
  let b;
  e[9] !== c ? (b = c && /* @__PURE__ */ m.jsx("div", {
    className: Vg,
    children: /* @__PURE__ */ m.jsx(lt, {
      variant: "subheadline2",
      weight: "regular",
      children: c
    })
  }), e[9] = c, e[10] = b) : b = e[10];
  let T;
  return e[11] !== g || e[12] !== v || e[13] !== b ? (T = /* @__PURE__ */ m.jsxs(m.Fragment, {
    children: [g, v, b]
  }), e[11] = g, e[12] = v, e[13] = b, e[14] = T) : T = e[14], T;
}, Bb = "_chevron_en74z_1", Vb = "_dropdown_en74z_8", Lh = "_colorpicker_en74z_12", Bh = "_picker_en74z_63", C8 = {
  chevron: Bb,
  dropdown: Vb,
  colorpicker: Lh,
  picker: Bh
}, Ug = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  chevron: Bb,
  colorpicker: Lh,
  default: C8,
  dropdown: Vb,
  picker: Bh
}, Symbol.toStringTag, { value: "Module" })), E8 = (a) => {
  const e = wt.c(21), {
    type: l,
    className: s,
    children: r,
    value: c,
    onChange: f,
    inputRef: h,
    id: y,
    name: p,
    showValue: g
  } = a, v = p === void 0 ? "color" : p, b = g === void 0 ? !0 : g;
  if (l === "Picker") {
    let D;
    return e[0] !== r ? (D = /* @__PURE__ */ m.jsx("div", {
      className: Bh,
      children: /* @__PURE__ */ m.jsx(lt, {
        variant: "body",
        weight: "regular",
        children: r
      })
    }), e[0] = r, e[1] = D) : D = e[1], D;
  }
  if (l === "ColorPicker") {
    const D = y || v;
    let j;
    e[2] !== D || e[3] !== h || e[4] !== v || e[5] !== f || e[6] !== c ? (j = /* @__PURE__ */ m.jsx("input", {
      ref: h,
      type: "color",
      value: c,
      onChange: f,
      name: v,
      id: D
    }), e[2] = D, e[3] = h, e[4] = v, e[5] = f, e[6] = c, e[7] = j) : j = e[7];
    let M;
    e[8] !== D || e[9] !== b || e[10] !== c ? (M = b && /* @__PURE__ */ m.jsx("label", {
      htmlFor: D,
      children: /* @__PURE__ */ m.jsx(lt, {
        variant: "body",
        weight: "regular",
        children: c
      })
    }), e[8] = D, e[9] = b, e[10] = c, e[11] = M) : M = e[11];
    let V;
    return e[12] !== j || e[13] !== M ? (V = /* @__PURE__ */ m.jsxs("div", {
      className: Lh,
      children: [j, M]
    }), e[12] = j, e[13] = M, e[14] = V) : V = e[14], V;
  }
  const T = Ug[l.toLowerCase()], S = Ug[s];
  let w;
  e[15] !== T || e[16] !== S ? (w = [T, S].filter(Boolean), e[15] = T, e[16] = S, e[17] = w) : w = e[17];
  const A = w.join(" ");
  let _;
  return e[18] !== r || e[19] !== A ? (_ = /* @__PURE__ */ m.jsx("div", {
    className: A,
    children: r
  }), e[18] = r, e[19] = A, e[20] = _) : _ = e[20], _;
}, A8 = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5ZM15.1016 9.01953C14.7891 8.70711 14.2821 8.70711 13.9697 9.01953L12.001 10.9873L10.0342 9.02051C9.72176 8.70809 9.21574 8.70809 8.90332 9.02051C8.5909 9.33293 8.5909 9.83895 8.90332 10.1514L10.8701 12.1191L9.02051 13.9697C8.70809 14.2821 8.70809 14.7882 9.02051 15.1006C9.33293 15.413 9.83895 15.413 10.1514 15.1006L12.001 13.25L13.8525 15.1016C14.165 15.414 14.672 15.414 14.9844 15.1016C15.2968 14.7891 15.2968 14.2821 14.9844 13.9697L13.1328 12.1182L15.1016 10.1514C15.414 9.83895 15.414 9.33195 15.1016 9.01953Z", fill: "#3D3C3A" }))), j8 = "_root_9aal5_1", M8 = "_input_9aal5_5", _8 = "_inputWithClearButton_9aal5_25", R8 = "_clearButtonIcon_9aal5_29", D8 = "_empty_9aal5_49", N8 = "_icon_9aal5_61", O8 = /* @__PURE__ */ E.forwardRef((a, e) => {
  const l = wt.c(24);
  let s, r, c, f, h, y;
  l[0] !== a ? ({
    label: s,
    value: y,
    onChange: r,
    onClear: c,
    ...f
  } = a, h = (D) => {
    r(D.target.value);
  }, l[0] = a, l[1] = s, l[2] = r, l[3] = c, l[4] = f, l[5] = h, l[6] = y) : (s = l[1], r = l[2], c = l[3], f = l[4], h = l[5], y = l[6]);
  const p = h, g = !y && D8;
  let v;
  l[7] !== g ? (v = [j8, g].filter(Boolean), l[7] = g, l[8] = v) : v = l[8];
  const b = v.join(" "), T = `${M8} ${c ? _8 : ""}`, S = !r;
  let w;
  l[9] !== p || l[10] !== s || l[11] !== e || l[12] !== f || l[13] !== T || l[14] !== S || l[15] !== y ? (w = /* @__PURE__ */ m.jsx("input", {
    "aria-label": s,
    onChange: p,
    type: "text",
    className: T,
    placeholder: s,
    value: y,
    readOnly: S,
    ref: e,
    ...f
  }), l[9] = p, l[10] = s, l[11] = e, l[12] = f, l[13] = T, l[14] = S, l[15] = y, l[16] = w) : w = l[16];
  let A;
  l[17] !== s || l[18] !== c ? (A = c && /* @__PURE__ */ m.jsx("button", {
    type: "button",
    className: [N8, R8].filter(Boolean).join(" "),
    onClick: c,
    "aria-label": `Clear ${s}`,
    children: /* @__PURE__ */ m.jsx(A8, {})
  }), l[17] = s, l[18] = c, l[19] = A) : A = l[19];
  let _;
  return l[20] !== b || l[21] !== w || l[22] !== A ? (_ = /* @__PURE__ */ m.jsxs(lt, {
    variant: "body",
    weight: "regular",
    className: b,
    children: [w, A]
  }), l[20] = b, l[21] = w, l[22] = A, l[23] = _) : _ = l[23], _;
}), kg = "_root_1aqfj_1";
function z8(a) {
  const e = wt.c(15), {
    value: l,
    defaultValue: s,
    onChange: r,
    disabled: c,
    className: f
  } = a, h = s === void 0 ? !1 : s, y = c === void 0 ? !1 : c, p = l !== void 0, [g, v] = E.useState(h), b = p ? l : g;
  let T;
  e[0] !== r ? (T = (R) => {
    r && r(R);
  }, e[0] = r, e[1] = T) : T = e[1];
  const S = T;
  let w;
  e[2] !== b || e[3] !== S || e[4] !== p ? (w = () => {
    if (Ta.HapticFeedback.selectionChanged(), p) {
      S(!b);
      return;
    }
    v((R) => {
      const k = !R;
      return S(k), k;
    });
  }, e[2] = b, e[3] = S, e[4] = p, e[5] = w) : w = e[5];
  const A = w;
  let _;
  e[6] !== y || e[7] !== A ? (_ = (R) => {
    R.stopPropagation(), !y && A();
  }, e[6] = y, e[7] = A, e[8] = _) : _ = e[8];
  const D = _, j = f ? `${kg} ${f}` : kg, M = y || void 0, V = y || void 0;
  let B;
  return e[9] !== b || e[10] !== j || e[11] !== D || e[12] !== M || e[13] !== V ? (B = /* @__PURE__ */ m.jsx("div", {
    className: j,
    "data-state": b,
    "data-disabled": M,
    onClick: D,
    role: "switch",
    "aria-checked": b,
    "aria-disabled": V
  }), e[9] = b, e[10] = j, e[11] = D, e[12] = M, e[13] = V, e[14] = B) : B = e[14], B;
}
const L8 = (a) => {
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
  const p = f === void 0 ? !1 : f, g = h === void 0 ? !1 : h, v = y !== void 0, [b, T] = E.useState(p), S = v ? y : b;
  let w;
  e[8] !== s ? (w = (R) => {
    s && s(R);
  }, e[8] = s, e[9] = w) : w = e[9];
  const A = w;
  let _;
  e[10] !== A || e[11] !== v ? (_ = (R) => {
    v || T(R), A(R);
  }, e[10] = A, e[11] = v, e[12] = _) : _ = e[12];
  const D = _;
  let j;
  e[13] !== S || e[14] !== g || e[15] !== A || e[16] !== D || e[17] !== v ? (j = () => {
    if (!g) {
      if (Ta.HapticFeedback.selectionChanged(), v) {
        D(!S);
        return;
      }
      T((R) => {
        const k = !R;
        return A(k), k;
      });
    }
  }, e[13] = S, e[14] = g, e[15] = A, e[16] = D, e[17] = v, e[18] = j) : j = e[18];
  const M = j;
  let V;
  e[19] !== S || e[20] !== g || e[21] !== D ? (V = /* @__PURE__ */ m.jsx(Kn.Part, {
    type: "Switch",
    children: /* @__PURE__ */ m.jsx(z8, {
      value: S,
      onChange: D,
      disabled: g
    })
  }), e[19] = S, e[20] = g, e[21] = D, e[22] = V) : V = e[22];
  let B;
  return e[23] !== l || e[24] !== M || e[25] !== r || e[26] !== c || e[27] !== V ? (B = /* @__PURE__ */ m.jsx(Kn, {
    start: c,
    end: V,
    onClick: M,
    ...r,
    children: l
  }), e[23] = l, e[24] = M, e[25] = r, e[26] = c, e[27] = V, e[28] = B) : B = e[28], B;
}, Hg = "_root_146xt_10", B8 = "_start_146xt_32", V8 = "_image_146xt_37", U8 = "_icon_146xt_45", k8 = "_body_146xt_57", H8 = "_end_146xt_65", q8 = "_caption_146xt_76", $8 = "_label_146xt_80", G8 = (a) => {
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
  const p = h === void 0 ? "div" : h, g = y ?? (r != null || p !== "div");
  let v;
  e[8] !== f ? (v = f && /* @__PURE__ */ m.jsx("div", {
    className: B8,
    children: f
  }), e[8] = f, e[9] = v) : v = e[9];
  let b;
  e[10] !== l ? (b = /* @__PURE__ */ m.jsx("div", {
    className: k8,
    children: l
  }), e[10] = l, e[11] = b) : b = e[11];
  let T;
  e[12] !== s ? (T = s && /* @__PURE__ */ m.jsx("div", {
    className: H8,
    children: s
  }), e[12] = s, e[13] = T) : T = e[13];
  let S;
  e[14] !== v || e[15] !== b || e[16] !== T ? (S = /* @__PURE__ */ m.jsxs(m.Fragment, {
    children: [v, b, T]
  }), e[14] = v, e[15] = b, e[16] = T, e[17] = S) : S = e[17];
  const w = S;
  if (!g) {
    let _;
    return e[18] !== p || e[19] !== w || e[20] !== r || e[21] !== c ? (_ = /* @__PURE__ */ m.jsx(p, {
      className: Hg,
      onClick: r,
      ...c,
      children: w
    }), e[18] = p, e[19] = w, e[20] = r, e[21] = c, e[22] = _) : _ = e[22], _;
  }
  let A;
  return e[23] !== p || e[24] !== w || e[25] !== r || e[26] !== c ? (A = /* @__PURE__ */ m.jsx(Ce, {
    as: p,
    className: Hg,
    onClick: r,
    ...c,
    children: w
  }), e[23] = p, e[24] = w, e[25] = r, e[26] = c, e[27] = A) : A = e[27], A;
}, Y8 = (a) => {
  const e = wt.c(6), {
    type: l,
    src: s,
    iconType: r
  } = a, c = s === void 0 ? null : s, f = r === void 0 ? null : r;
  let h;
  t: switch (l) {
    case "Image": {
      let p;
      e[0] !== c ? (p = /* @__PURE__ */ m.jsx("img", {
        src: c,
        alt: "",
        className: V8
      }), e[0] = c, e[1] = p) : p = e[1], h = p;
      break t;
    }
    case "Icon": {
      let p;
      e[2] !== f ? (p = /* @__PURE__ */ m.jsx("div", {
        className: U8,
        children: f
      }), e[2] = f, e[3] = p) : p = e[3], h = p;
      break t;
    }
    default:
      h = null;
  }
  let y;
  return e[4] !== h ? (y = /* @__PURE__ */ m.jsx(m.Fragment, {
    children: h
  }), e[4] = h, e[5] = y) : y = e[5], y;
}, X8 = (a) => {
  const e = wt.c(7), {
    label: l,
    caption: s
  } = a;
  let r;
  e[0] !== l ? (r = /* @__PURE__ */ m.jsx("div", {
    className: $8,
    children: /* @__PURE__ */ m.jsx(lt, {
      variant: "body",
      weight: "regular",
      children: l
    })
  }), e[0] = l, e[1] = r) : r = e[1];
  let c;
  e[2] !== s ? (c = s && /* @__PURE__ */ m.jsx("div", {
    className: q8,
    children: /* @__PURE__ */ m.jsx(lt, {
      variant: "subheadline2",
      weight: "regular",
      children: s
    })
  }), e[2] = s, e[3] = c) : c = e[3];
  let f;
  return e[4] !== r || e[5] !== c ? (f = /* @__PURE__ */ m.jsxs(m.Fragment, {
    children: [r, c]
  }), e[4] = r, e[5] = c, e[6] = f) : f = e[6], f;
}, Kn = Object.assign(G8, {
  Start: Y8,
  End: X8,
  Part: E8,
  Text: T8,
  Editable: O8,
  Switch: L8
});
Ur.section;
wh[16];
function P8(a, e, l) {
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
  let p, g;
  s[4] !== f || s[5] !== a ? (p = () => {
    if (!f)
      return;
    const v = a.current;
    if (!v)
      return;
    const b = new ResizeObserver((T) => {
      h.current(T[0]);
    });
    return b.observe(v), () => b.disconnect();
  }, g = [a, f], s[4] = f, s[5] = a, s[6] = p, s[7] = g) : (p = s[6], g = s[7]), E.useEffect(p, g);
}
const qf = (a, e, l) => Math.min(Math.max(a, e), l), K8 = /* @__PURE__ */ E.createContext({
  colorScheme: "light",
  setColorScheme: () => {
  },
  toggleColorScheme: () => {
  }
}), Z8 = ["light", "dark"], Ad = (a) => Z8.includes(a), jd = () => {
  if (typeof window > "u" || typeof document > "u")
    return null;
  const a = window.getComputedStyle(document.documentElement).getPropertyValue("--tg-color-scheme").trim();
  return Ad(a) ? a : null;
}, Ub = () => typeof window > "u" || !window.matchMedia ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light", Q8 = () => jd() ?? Ub(), F8 = typeof window > "u" ? E.useEffect : E.useLayoutEffect, J8 = (a) => {
  const e = wt.c(20), {
    children: l,
    defaultColorScheme: s,
    onColorSchemeChange: r
  } = a, [c, f] = E.useState(Q8);
  let h;
  e[0] !== s ? (h = () => Ad(s) ? s : null, e[0] = s, e[1] = h) : h = e[1];
  const [y, p] = E.useState(h), g = y ?? c;
  let v;
  e[2] !== g || e[3] !== r ? (v = (B) => {
    const R = typeof B == "function" ? B(g) : B;
    Ad(R) && (p(R), r?.(R));
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
  }, A = [g], e[8] = g, e[9] = w, e[10] = A) : (w = e[9], A = e[10]), F8(w, A);
  let _, D;
  e[11] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (_ = () => {
    const B = () => {
      const P = jd();
      if (P) {
        f(P);
        return;
      }
      f(Ub());
    }, R = (P) => {
      jd() || f(P.matches ? "dark" : "light");
    };
    B();
    const k = window.matchMedia("(prefers-color-scheme: dark)");
    return Ta.onEvent("themeChanged", B), k.addEventListener("change", R), () => {
      Ta.offEvent("themeChanged", B), k.removeEventListener("change", R);
    };
  }, D = [], e[11] = _, e[12] = D) : (_ = e[11], D = e[12]), E.useEffect(_, D);
  let j;
  e[13] !== g || e[14] !== b || e[15] !== S ? (j = {
    colorScheme: g,
    setColorScheme: b,
    toggleColorScheme: S
  }, e[13] = g, e[14] = b, e[15] = S, e[16] = j) : j = e[16];
  const M = j;
  let V;
  return e[17] !== l || e[18] !== M ? (V = /* @__PURE__ */ m.jsx(K8.Provider, {
    value: M,
    children: l
  }), e[17] = l, e[18] = M, e[19] = V) : V = e[19], V;
}, W8 = ({
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
}, I8 = (a) => {
  const e = wt.c(15);
  let l, s, r;
  e[0] !== a ? ({
    className: l,
    onLoad: s,
    ...r
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r) : (l = e[1], s = e[2], r = e[3]);
  let c;
  e[4] !== r ? (c = () => W8(r), e[4] = r, e[5] = c) : c = e[5];
  const [f, h] = E.useState(c);
  let y;
  e[6] !== s ? (y = (b) => {
    h(!0), s?.(b);
  }, e[6] = s, e[7] = y) : y = e[7];
  const p = f && "opacity-100";
  let g;
  e[8] !== l || e[9] !== p ? (g = Ob("rounded-[inherit] opacity-0 transition-opacity duration-250 ease-[cubic-bezier(0.23,1,0.32,1)]", p, l), e[8] = l, e[9] = p, e[10] = g) : g = e[10];
  let v;
  return e[11] !== r || e[12] !== y || e[13] !== g ? (v = /* @__PURE__ */ m.jsx("img", {
    onLoad: y,
    className: g,
    ...r
  }), e[11] = r, e[12] = y, e[13] = g, e[14] = v) : v = e[14], v;
}, tE = "_img_95uc6_1", eE = "_imgRedacted_95uc6_9", nE = "_shapeCircle_95uc6_13", aE = "_shapeRounded_95uc6_21", iE = /* @__PURE__ */ E.forwardRef((a, e) => {
  const l = wt.c(14), {
    size: s,
    className: r,
    style: c,
    src: f,
    shape: h
  } = a;
  let y = s === void 0 ? 40 : s;
  const p = h === void 0 ? "circle" : h, {
    isMaterial: g
  } = ll(), v = !!kr(), b = Ch(v);
  g && (y = 42);
  let T;
  l[0] !== v || l[1] !== e ? (T = (j) => {
    v && Hr(j), typeof e == "function" ? e(j) : e && (e.current = j);
  }, l[0] = v, l[1] = e, l[2] = T) : T = l[2];
  const S = `
                    ${p === "circle" ? nE : ""}
                    ${p === "rounded" ? aE : ""}
                    ${b}
                    ${r || ""}`;
  let w;
  l[3] !== y || l[4] !== c ? (w = {
    width: y,
    height: y,
    ...c
  }, l[3] = y, l[4] = c, l[5] = w) : w = l[5];
  const A = `${tE} ${v ? eE : ""}`;
  let _;
  l[6] !== f || l[7] !== A ? (_ = /* @__PURE__ */ m.jsx(I8, {
    src: f,
    className: A
  }), l[6] = f, l[7] = A, l[8] = _) : _ = l[8];
  let D;
  return l[9] !== T || l[10] !== S || l[11] !== w || l[12] !== _ ? (D = /* @__PURE__ */ m.jsx("div", {
    ref: T,
    className: S,
    style: w,
    children: _
  }), l[9] = T, l[10] = S, l[11] = w, l[12] = _, l[13] = D) : D = l[13], D;
}), lE = /* @__PURE__ */ E.forwardRef((a, e) => {
  const l = wt.c(11);
  let s, r, c, f;
  if (l[0] !== a) {
    const {
      to: p,
      onClick: g,
      children: v,
      ...b
    } = a;
    f = p, s = v, r = b, c = (T) => {
      g && g(T), T.defaultPrevented;
    }, l[0] = a, l[1] = s, l[2] = r, l[3] = c, l[4] = f;
  } else
    s = l[1], r = l[2], c = l[3], f = l[4];
  const h = c;
  let y;
  return l[5] !== s || l[6] !== h || l[7] !== r || l[8] !== e || l[9] !== f ? (y = /* @__PURE__ */ m.jsx(CC, {
    ref: e,
    href: f,
    onClick: h,
    ...r,
    children: s
  }), l[5] = s, l[6] = h, l[7] = r, l[8] = e, l[9] = f, l[10] = y) : y = l[10], y;
});
lE.displayName = "TransitionLink";
const kb = ({
  children: a
}) => a;
kb.isModalPage = !0;
kb.propTypes = {
  id: yn.string.isRequired,
  children: yn.node
};
Ur.modal;
wh[16];
const sE = (a) => {
  const e = wt.c(2), {
    children: l
  } = a;
  let s;
  return e[0] !== l ? (s = /* @__PURE__ */ m.jsx(TT, {
    features: sC,
    strict: !0,
    children: l
  }), e[0] = l, e[1] = s) : s = e[1], s;
}, {
  setHeaderColor: oE,
  setBackgroundColor: rE
} = Ta, sl = (a) => {
  const e = wt.c(18), {
    children: l,
    mode: s,
    headerColor: r,
    backgroundColor: c,
    expandOnMount: f
  } = a, h = s === void 0 ? "secondary" : s, {
    inDetailPane: y,
    setPaneBackground: p
  } = WC();
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
  let _, D;
  e[2] !== f ? (_ = () => {
    f && Ta.expand();
  }, D = [f], e[2] = f, e[3] = _, e[4] = D) : (_ = e[3], D = e[4]), E.useEffect(_, D);
  let j, M;
  e[5] !== A || e[6] !== y || e[7] !== w || e[8] !== S ? (j = () => {
    y || (Ta.initData ? (rE(w), oE(S)) : document.body.style.backgroundColor = A, document.body.style.setProperty("--page-background", A));
  }, M = [w, S, A, y], e[5] = A, e[6] = y, e[7] = w, e[8] = S, e[9] = j, e[10] = M) : (j = e[9], M = e[10]), E.useEffect(j, M);
  let V, B;
  e[11] !== A || e[12] !== y || e[13] !== p ? (V = () => {
    !y || !p || p(A);
  }, B = [y, p, A], e[11] = A, e[12] = y, e[13] = p, e[14] = V, e[15] = B) : (V = e[14], B = e[15]), E.useEffect(V, B);
  let R;
  return e[16] !== l ? (R = /* @__PURE__ */ m.jsx(m.Fragment, {
    children: l
  }), e[16] = l, e[17] = R) : R = e[17], R;
};
sl.propTypes = {
  children: yn.node,
  mode: yn.oneOf(["primary", "secondary"]),
  headerColor: yn.string,
  backgroundColor: yn.string,
  expandOnMount: yn.bool
};
const uE = "_root_125s3_1", cE = "_card_125s3_16", fE = "_container_125s3_22", $f = "flex justify-between gap-compact px-content py-10 text-section";
function qg(a) {
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
      e[5] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (f = Ob($f, "text-foreground"), e[5] = f) : f = e[5];
      let h;
      e[6] !== s ? (h = /* @__PURE__ */ m.jsx(lt, {
        variant: "title3",
        weight: "bold",
        children: s
      }), e[6] = s, e[7] = h) : h = e[7];
      let y;
      e[8] !== c ? (y = c && /* @__PURE__ */ m.jsx(lt, {
        variant: "title3",
        weight: "bold",
        children: c
      }), e[8] = c, e[9] = y) : y = e[9];
      let p;
      return e[10] !== l || e[11] !== h || e[12] !== y ? (p = /* @__PURE__ */ m.jsxs("div", {
        className: f,
        ...l,
        children: [h, y]
      }), e[10] = l, e[11] = h, e[12] = y, e[13] = p) : p = e[13], p;
    }
    case "Footer": {
      let f;
      e[14] !== s ? (f = /* @__PURE__ */ m.jsx(lt, {
        variant: "footnote",
        children: s
      }), e[14] = s, e[15] = f) : f = e[15];
      let h;
      return e[16] !== l || e[17] !== f ? (h = /* @__PURE__ */ m.jsx("div", {
        className: $f,
        ...l,
        children: f
      }), e[16] = l, e[17] = f, e[18] = h) : h = e[18], h;
    }
    default: {
      let f;
      e[19] !== s ? (f = /* @__PURE__ */ m.jsx(lt, {
        variant: "body",
        weight: "semibold",
        children: s
      }), e[19] = s, e[20] = f) : f = e[20];
      let h;
      e[21] !== c ? (h = c && /* @__PURE__ */ m.jsx(lt, {
        variant: "footnote",
        children: c
      }), e[21] = c, e[22] = h) : h = e[22];
      let y;
      return e[23] !== l || e[24] !== f || e[25] !== h ? (y = /* @__PURE__ */ m.jsxs("div", {
        className: $f,
        ...l,
        children: [f, h]
      }), e[23] = l, e[24] = f, e[25] = h, e[26] = y) : y = e[26], y;
    }
  }
}
const dE = Ur.section, hE = wh[16], mE = 0.6, yt = (a) => {
  const e = wt.c(6);
  let l, s;
  e[0] !== a ? ({
    children: l,
    ...s
  } = a, e[0] = a, e[1] = l, e[2] = s) : (l = e[1], s = e[2]);
  let r;
  return e[3] !== l || e[4] !== s ? (r = /* @__PURE__ */ m.jsx("section", {
    className: uE,
    ...s,
    children: l
  }), e[3] = l, e[4] = s, e[5] = r) : r = e[5], r;
}, pE = (a) => {
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
  } = ll(), h = E.useRef(null), y = E.useRef(null), p = f ? dE : hE;
  let g;
  e[5] !== p ? (g = {
    radius: p,
    smoothing: mE
  }, e[5] = p, e[6] = g) : g = e[6];
  let v;
  e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = {
    autoEffects: !1
  }, e[7] = v) : v = e[7], eb(f ? y : h, g, v);
  let b;
  e[8] !== r ? (b = r && /* @__PURE__ */ m.jsx(qg, {
    title: r
  }), e[8] = r, e[9] = b) : b = e[9];
  let T;
  e[10] !== l ? (T = /* @__PURE__ */ m.jsx("div", {
    ref: y,
    className: fE,
    children: l
  }), e[10] = l, e[11] = T) : T = e[11];
  let S;
  e[12] !== b || e[13] !== T ? (S = /* @__PURE__ */ m.jsxs("div", {
    ref: h,
    className: cE,
    children: [b, T]
  }), e[12] = b, e[13] = T, e[14] = S) : S = e[14];
  let w;
  e[15] !== s ? (w = s && /* @__PURE__ */ m.jsx(qg, {
    type: "Footer",
    title: s
  }), e[15] = s, e[16] = w) : w = e[16];
  let A;
  return e[17] !== c || e[18] !== S || e[19] !== w ? (A = /* @__PURE__ */ m.jsxs("section", {
    ...c,
    children: [S, w]
  }), e[17] = c, e[18] = S, e[19] = w, e[20] = A) : A = e[20], A;
};
yt.Item = pE;
const yE = "_root_cnxqv_1", gE = "_icon_cnxqv_17", vE = "_content_cnxqv_42", bE = "_title_cnxqv_55", xE = "_description_cnxqv_56", SE = "_action_cnxqv_61", wE = "_link_cnxqv_61", TE = "_host_cnxqv_92", CE = "_host_top_cnxqv_105", EE = "_host_bottom_cnxqv_109", AE = "_item_cnxqv_114", jE = (a) => {
  const e = wt.c(19), {
    icon: l,
    title: s,
    description: r,
    link: c,
    action: f
  } = a, h = !!r;
  let y;
  e[0] !== l ? (y = l ? /* @__PURE__ */ m.jsx("div", {
    className: gE,
    "aria-hidden": "true",
    children: l
  }) : null, e[0] = l, e[1] = y) : y = e[1];
  const p = h ? "semibold" : void 0;
  let g;
  e[2] !== p || e[3] !== s ? (g = /* @__PURE__ */ m.jsx(lt, {
    as: "p",
    className: bE,
    variant: "subheadline2",
    weight: p,
    children: s
  }), e[2] = p, e[3] = s, e[4] = g) : g = e[4];
  let v;
  e[5] !== r ? (v = r ? /* @__PURE__ */ m.jsx(lt, {
    as: "p",
    className: xE,
    variant: "subheadline2",
    children: r
  }) : null, e[5] = r, e[6] = v) : v = e[6];
  let b;
  e[7] !== c ? (b = c ? /* @__PURE__ */ m.jsx("button", {
    type: "button",
    className: wE,
    onClick: c.onClick,
    children: /* @__PURE__ */ m.jsx(lt, {
      as: "span",
      variant: "subheadline2",
      children: c.label
    })
  }) : null, e[7] = c, e[8] = b) : b = e[8];
  let T;
  e[9] !== g || e[10] !== v || e[11] !== b ? (T = /* @__PURE__ */ m.jsxs("div", {
    className: vE,
    children: [g, v, b]
  }), e[9] = g, e[10] = v, e[11] = b, e[12] = T) : T = e[12];
  let S;
  e[13] !== f ? (S = f ? /* @__PURE__ */ m.jsx("button", {
    type: "button",
    className: SE,
    onClick: f.onClick,
    children: /* @__PURE__ */ m.jsx(lt, {
      as: "span",
      variant: "body",
      children: f.label
    })
  }) : null, e[13] = f, e[14] = S) : S = e[14];
  let w;
  return e[15] !== y || e[16] !== T || e[17] !== S ? (w = /* @__PURE__ */ m.jsxs("div", {
    className: yE,
    role: "status",
    "aria-live": "polite",
    children: [y, T, S]
  }), e[15] = y, e[16] = T, e[17] = S, e[18] = w) : w = e[18], w;
};
yn.shape({
  label: yn.node.isRequired,
  onClick: yn.func
});
const ME = 4e3, _E = 100, RE = 500, DE = (a) => {
  if (a)
    try {
      Ta.HapticFeedback?.notificationOccurred(a);
    } catch {
    }
}, NE = (a) => {
  const e = wt.c(45), {
    item: l,
    onDismiss: s
  } = a, {
    id: r,
    icon: c,
    title: f,
    description: h,
    link: y,
    action: p,
    position: g,
    duration: v,
    type: b
  } = l, T = g === void 0 ? "bottom" : g, S = v === void 0 ? ME : v, w = oC(), [A, _] = E.useState(!1), [D, j] = E.useState(0);
  let M;
  e[0] !== r || e[1] !== s ? (M = () => s(r), e[0] = r, e[1] = s, e[2] = M) : M = e[2];
  const V = M;
  let B, R;
  e[3] !== b ? (B = () => {
    DE(b);
  }, R = [b], e[3] = b, e[4] = B, e[5] = R) : (B = e[4], R = e[5]), E.useEffect(B, R);
  let k, P;
  e[6] !== V || e[7] !== S || e[8] !== A ? (k = () => {
    if (!S || A)
      return;
    const Dt = setTimeout(V, S);
    return () => clearTimeout(Dt);
  }, P = [S, A, V], e[6] = V, e[7] = S, e[8] = A, e[9] = k, e[10] = P) : (k = e[9], P = e[10]), E.useEffect(k, P);
  const K = T === "top" ? -32 : 32, at = b === "error";
  let nt;
  e[11] !== w || e[12] !== K ? (nt = w ? {
    opacity: 0
  } : {
    opacity: 0,
    y: K,
    scale: 0.96
  }, e[11] = w, e[12] = K, e[13] = nt) : nt = e[13];
  const I = nt;
  let Q;
  e[14] !== at || e[15] !== w ? (Q = w ? {
    opacity: 1
  } : {
    opacity: 1,
    y: 0,
    scale: 1,
    x: at ? [0, -10, 10, -7, 7, -3, 3, 0] : 0,
    transition: {
      default: r8.SNACKBAR,
      ...at && {
        x: {
          duration: 0.45,
          ease: "easeOut",
          delay: 0.18
        }
      }
    }
  }, e[14] = at, e[15] = w, e[16] = Q) : Q = e[16];
  const et = Q;
  let N;
  e[17] !== D || e[18] !== w || e[19] !== K ? (N = w ? {
    opacity: 0,
    transition: {
      duration: 0.15
    }
  } : {
    opacity: 0,
    x: D * 400,
    y: D === 0 ? K : 0,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }, e[17] = D, e[18] = w, e[19] = K, e[20] = N) : N = e[20];
  const Y = N;
  let J;
  e[21] !== V ? (J = (Dt, Mt) => {
    _(!1);
    const Pt = Mt.offset.x, Kt = Mt.velocity.x;
    (Math.abs(Pt) > _E || Math.abs(Kt) > RE) && (j(Pt >= 0 ? 1 : -1), V());
  }, e[21] = V, e[22] = J) : J = e[22];
  const it = J;
  let ot;
  e[23] !== V ? (ot = (Dt) => {
    if (Dt)
      return {
        ...Dt,
        onClick: () => {
          Dt.onClick?.(), V();
        }
      };
  }, e[23] = V, e[24] = ot) : ot = e[24];
  const O = ot, $ = w ? !1 : "x";
  let tt;
  e[25] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (tt = () => _(!0), e[25] = tt) : tt = e[25];
  let st;
  e[26] !== y || e[27] !== O ? (st = O(y), e[26] = y, e[27] = O, e[28] = st) : st = e[28];
  let rt;
  e[29] !== p || e[30] !== O ? (rt = O(p), e[29] = p, e[30] = O, e[31] = rt) : rt = e[31];
  let ht;
  e[32] !== h || e[33] !== c || e[34] !== st || e[35] !== rt || e[36] !== f ? (ht = /* @__PURE__ */ m.jsx(jE, {
    icon: c,
    title: f,
    description: h,
    link: st,
    action: rt
  }), e[32] = h, e[33] = c, e[34] = st, e[35] = rt, e[36] = f, e[37] = ht) : ht = e[37];
  let vt;
  return e[38] !== et || e[39] !== Y || e[40] !== it || e[41] !== I || e[42] !== $ || e[43] !== ht ? (vt = /* @__PURE__ */ m.jsx(tl, {
    className: AE,
    initial: I,
    animate: et,
    exit: Y,
    layout: !0,
    drag: $,
    dragSnapToOrigin: !0,
    dragElastic: 0.6,
    dragMomentum: !1,
    onDragStart: tt,
    onDragEnd: it,
    children: ht
  }), e[38] = et, e[39] = Y, e[40] = it, e[41] = I, e[42] = $, e[43] = ht, e[44] = vt) : vt = e[44], vt;
}, Hb = {
  top: CE,
  bottom: EE
}, OE = Object.keys(Hb), zE = (a) => {
  const e = wt.c(5), {
    snackbars: l,
    onDismiss: s
  } = a;
  let r;
  e[0] !== s || e[1] !== l ? (r = OE.map((f) => {
    const h = l.filter((y) => (y.position ?? "bottom") === f);
    return /* @__PURE__ */ m.jsx("div", {
      className: `${TE} ${Hb[f]}`,
      children: /* @__PURE__ */ m.jsx(wT, {
        initial: !1,
        children: h.map((y) => /* @__PURE__ */ m.jsx(NE, {
          item: y,
          onDismiss: s
        }, y.id))
      })
    }, f);
  }), e[0] = s, e[1] = l, e[2] = r) : r = e[2];
  let c;
  return e[3] !== r ? (c = /* @__PURE__ */ Vr.createPortal(/* @__PURE__ */ m.jsx(m.Fragment, {
    children: r
  }), document.body), e[3] = r, e[4] = c) : c = e[4], c;
}, qb = /* @__PURE__ */ E.createContext(null), LE = () => {
  const a = E.useContext(qb);
  if (!a)
    throw new Error("useSnackbar must be used inside <SnackbarProvider>");
  return a;
}, $b = (a) => {
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
  let p;
  e[2] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (p = (S) => {
    f.current = f.current + 1;
    const w = f.current;
    return c((A) => [...A, {
      id: w,
      ...S
    }]), w;
  }, e[2] = p) : p = e[2];
  const g = p;
  let v;
  e[3] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = {
    show: g,
    dismiss: y
  }, e[3] = v) : v = e[3];
  let b;
  e[4] !== r ? (b = /* @__PURE__ */ m.jsx(zE, {
    snackbars: r,
    onDismiss: y
  }), e[4] = r, e[5] = b) : b = e[5];
  let T;
  return e[6] !== l || e[7] !== b ? (T = /* @__PURE__ */ m.jsxs(qb.Provider, {
    value: v,
    children: [l, b]
  }), e[6] = l, e[7] = b, e[8] = T) : T = e[8], T;
}, BE = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/loader" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M12 3.02148C16.9704 3.02148 20.9997 7.07957 21 12.0859C21 17.0925 16.9706 21.1514 12 21.1514C7.02944 21.1514 3 17.0925 3 12.0859C3.00026 11.5299 3.44787 11.0791 4 11.0791C4.55213 11.0791 4.99974 11.5299 5 12.0859C5 15.9799 8.13401 19.1367 12 19.1367C15.866 19.1367 19 15.9799 19 12.0859C18.9997 8.19215 15.8658 5.03613 12 5.03613C9.64439 5.03613 7.56033 6.20674 6.29004 8.00684C5.97018 8.46016 5.34566 8.56708 4.89551 8.24512C4.44533 7.92286 4.33924 7.29328 4.65918 6.83984C6.28848 4.53074 8.96935 3.02148 12 3.02148Z", fill: "#3D3C3A" }))), VE = "_centered_1ma1e_1", UE = "_spinner_1ma1e_8", Vh = (a) => {
  const e = wt.c(15);
  let l, s, r, c;
  e[0] !== a ? ({
    centered: l,
    className: s,
    size: c,
    ...r
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c) : (l = e[1], s = e[2], r = e[3], c = e[4]);
  let f;
  e[5] !== s ? (f = [UE, s].filter(Boolean), e[5] = s, e[6] = f) : f = e[6];
  const h = f.join(" ");
  let y;
  e[7] !== c ? (y = c ? {
    width: c,
    height: c
  } : void 0, e[7] = c, e[8] = y) : y = e[8];
  const p = y;
  let g;
  e[9] !== h || e[10] !== r || e[11] !== p ? (g = /* @__PURE__ */ m.jsx(BE, {
    ...r,
    className: h,
    style: p
  }), e[9] = h, e[10] = r, e[11] = p, e[12] = g) : g = e[12];
  const v = g;
  if (l) {
    let b;
    return e[13] !== v ? (b = /* @__PURE__ */ m.jsx("div", {
      className: VE,
      children: v
    }), e[13] = v, e[14] = b) : b = e[14], b;
  }
  return v;
}, kE = "_root_warzp_1", HE = "_gradient_warzp_71", qE = "_clipPathContainer_warzp_113", $E = "_tab_1mynw_1", GE = "_icon_1mynw_37", YE = "_active_1mynw_62", Gb = (a) => {
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
  let p;
  e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (p = {
    type: "spring",
    stiffness: 800,
    damping: 50
  }, e[7] = p) : p = e[7];
  const g = `${$E} ${s ? YE : ""} ${y}`;
  let v;
  e[8] !== g ? (v = g.trim(), e[8] = g, e[9] = v) : v = e[9];
  let b;
  e[10] !== l ? (b = /* @__PURE__ */ m.jsx(tl, {
    layout: !0,
    className: GE,
    children: l
  }), e[10] = l, e[11] = b) : b = e[11];
  let T;
  e[12] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (T = {
    display: "inline-block"
  }, e[12] = T) : T = e[12];
  let S;
  e[13] !== r ? (S = /* @__PURE__ */ m.jsx(f6, {
    layout: !0,
    style: T,
    children: r
  }), e[13] = r, e[14] = S) : S = e[14];
  let w;
  return e[15] !== c || e[16] !== f || e[17] !== v || e[18] !== b || e[19] !== S ? (w = /* @__PURE__ */ m.jsxs(tl, {
    layout: !0,
    transition: p,
    ...f,
    className: v,
    onClick: c,
    children: [b, S]
  }), e[15] = c, e[16] = f, e[17] = v, e[18] = b, e[19] = S, e[20] = w) : w = e[20], w;
};
function XE({
  tabsLength: a,
  activeIndex: e,
  onSnapToSame: l,
  onSnapToNew: s,
  spring: r
}) {
  const c = E.useRef(null), [f, h] = E.useState(!1), [y, p] = E.useState(null), g = E.useRef(null), v = E.useRef(!1), b = E.useRef(null), T = E.useRef(0), S = 6, w = 100 / a, A = `calc(${w}% + 7.33px - 4px)`, _ = `calc(${w * e}% - ${3.67 * e}px)`, D = _, j = `calc(100% - (${_} + ${A}) - 2.33px * ${e})`, M = f && y != null ? `inset(0 ${100 - (y + w)}% 0 ${y}% round 100px)` : `inset(0 ${j} 0 ${D} round 100px)`, V = f ? {
    clipPath: {
      duration: 0
    }
  } : {
    clipPath: r
  }, B = (I) => {
    const Q = c.current;
    if (!Q) return;
    const et = Q.getBoundingClientRect(), N = I - et.left, Y = et.width;
    if (Y <= 0) return;
    const J = N / Y * 100, it = qf(J - w / 2, 0, 100 - w);
    p(it);
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
          h(!0), B(I.clientX), I.preventDefault();
        }
        return;
      }
      g.current != null && I.pointerId !== g.current || (B(I.clientX), I.preventDefault());
    }
  }, P = (I) => {
    const Q = c.current;
    let et = e;
    if (Q && typeof I == "number") {
      const N = Q.getBoundingClientRect(), Y = I - N.left, J = N.width;
      if (J > 0) {
        const it = J / a;
        et = qf(Math.round(Y / it - 0.5), 0, a - 1);
      }
    } else if (y != null) {
      const N = 100 / a;
      et = qf(Math.round(y / N), 0, a - 1);
    }
    et === e ? l?.() : s?.(et), h(!1), p(null), g.current = null;
  }, K = (I) => {
    if (v.current = !1, b.current = null, !!f && !(g.current != null && I.pointerId !== g.current)) {
      try {
        I.currentTarget.releasePointerCapture?.(I.pointerId);
      } catch {
      }
      P(I.clientX), I.preventDefault();
    }
  }, at = (I) => {
    v.current = !1, b.current = null, f && (P(I?.clientX), I.preventDefault?.());
  }, nt = (I) => {
    f && P(I?.clientX);
  };
  return E.useEffect(() => {
    const I = () => {
      h(!1), p(null), g.current = null, v.current = !1, b.current = null;
    };
    return window.addEventListener("blur", I), () => window.removeEventListener("blur", I);
  }, []), {
    overlayRef: c,
    isDragging: f,
    animate: {
      clipPath: M
    },
    transition: V,
    handlers: {
      onPointerDown: R,
      onPointerMove: k,
      onPointerUp: K,
      onPointerCancel: at,
      onPointerLeave: nt
    }
  };
}
function PE(a) {
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
  const y = h, p = c === void 0 ? 64 : c, g = E.useId();
  if (!l || !s)
    return null;
  const {
    top: v,
    right: b,
    bottom: T,
    left: S
  } = y, w = l + S + b, A = p + v + T, _ = Math.max(0, w - S - b), D = Math.min(p / 2, _ / 2, 999), j = `grad-${g}`, M = `mask-${g}`, V = Math.max(S, b), B = Math.max(v, T), R = `0 0 ${w} ${A}`;
  let k;
  e[2] !== f ? (k = [HE, f].filter(Boolean), e[2] = f, e[3] = k) : k = e[3];
  const P = k.join(" "), K = `${V}px`, at = `${B}px`;
  let nt;
  e[4] !== K || e[5] !== at ? (nt = {
    "--overlay-padding-x": K,
    "--overlay-padding-y": at
  }, e[4] = K, e[5] = at, e[6] = nt) : nt = e[6];
  let I, Q;
  e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (I = /* @__PURE__ */ m.jsx("stop", {
    offset: "0%",
    stopColor: "var(--mask-color)",
    stopOpacity: "var(--mask-opacity-top)"
  }), Q = /* @__PURE__ */ m.jsx("stop", {
    offset: "100%",
    stopColor: "var(--mask-color)",
    stopOpacity: "var(--mask-opacity-bottom)"
  }), e[7] = I, e[8] = Q) : (I = e[7], Q = e[8]);
  let et;
  e[9] !== j ? (et = /* @__PURE__ */ m.jsxs("linearGradient", {
    id: j,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1",
    children: [I, Q]
  }), e[9] = j, e[10] = et) : et = e[10];
  let N;
  e[11] !== A || e[12] !== w ? (N = /* @__PURE__ */ m.jsx("rect", {
    x: "0",
    y: "0",
    width: w,
    height: A,
    fill: "var(--ui-static-white)"
  }), e[11] = A, e[12] = w, e[13] = N) : N = e[13];
  let Y;
  e[14] !== p || e[15] !== _ || e[16] !== S || e[17] !== D || e[18] !== v ? (Y = /* @__PURE__ */ m.jsx("rect", {
    x: S,
    y: v,
    width: _,
    height: p,
    rx: D,
    ry: D,
    fill: "var(--ui-static-black)"
  }), e[14] = p, e[15] = _, e[16] = S, e[17] = D, e[18] = v, e[19] = Y) : Y = e[19];
  let J;
  e[20] !== M || e[21] !== N || e[22] !== Y ? (J = /* @__PURE__ */ m.jsxs("mask", {
    id: M,
    maskUnits: "userSpaceOnUse",
    children: [N, Y]
  }), e[20] = M, e[21] = N, e[22] = Y, e[23] = J) : J = e[23];
  let it;
  e[24] !== et || e[25] !== J ? (it = /* @__PURE__ */ m.jsxs("defs", {
    children: [et, J]
  }), e[24] = et, e[25] = J, e[26] = it) : it = e[26];
  const ot = `url(#${j})`, O = `url(#${M})`;
  let $;
  e[27] !== A || e[28] !== w || e[29] !== ot || e[30] !== O ? ($ = /* @__PURE__ */ m.jsx("rect", {
    width: w,
    height: A,
    fill: ot,
    mask: O
  }), e[27] = A, e[28] = w, e[29] = ot, e[30] = O, e[31] = $) : $ = e[31];
  let tt;
  return e[32] !== A || e[33] !== w || e[34] !== it || e[35] !== $ || e[36] !== R || e[37] !== P || e[38] !== nt ? (tt = /* @__PURE__ */ m.jsxs("svg", {
    width: w,
    height: A,
    viewBox: R,
    preserveAspectRatio: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: P,
    style: nt,
    "aria-hidden": !0,
    children: [it, $]
  }), e[32] = A, e[33] = w, e[34] = it, e[35] = $, e[36] = R, e[37] = P, e[38] = nt, e[39] = tt) : tt = e[39], tt;
}
const KE = (a) => {
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
    transition: p,
    handlers: g
  } = XE(f);
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
  e[9] !== p.clipPath ? (S = {
    default: T,
    clipPath: p.clipPath
  }, e[9] = p.clipPath, e[10] = S) : S = e[10];
  let w;
  if (e[11] !== s || e[12] !== r || e[13] !== l) {
    let _;
    e[15] !== s || e[16] !== r ? (_ = (D, j) => /* @__PURE__ */ m.jsx(Gb, {
      isActive: j === s,
      onClick: () => r(j),
      "data-overlay": !0,
      ...D
    }, j), e[15] = s, e[16] = r, e[17] = _) : _ = e[17], w = l.map(_), e[11] = s, e[12] = r, e[13] = l, e[14] = w;
  } else
    w = e[14];
  let A;
  return e[18] !== g || e[19] !== h || e[20] !== b || e[21] !== S || e[22] !== w ? (A = /* @__PURE__ */ m.jsx(tl, {
    className: qE,
    ref: h,
    ...g,
    initial: v,
    animate: b,
    transition: S,
    children: w
  }), e[18] = g, e[19] = h, e[20] = b, e[21] = S, e[22] = w, e[23] = A) : A = e[23], A;
}, ZE = (a) => {
  const e = wt.c(43), {
    tabs: l,
    onChange: s,
    defaultIndex: r
  } = a, c = r === void 0 ? 0 : r, {
    isApple: f
  } = ll(), [h, y] = E.useState(c);
  let p, g;
  e[0] !== c ? (p = () => {
    y(c);
  }, g = [c], e[0] = c, e[1] = p, e[2] = g) : (p = e[1], g = e[2]), E.useEffect(p, g);
  let v, b;
  e[3] !== l.length ? (v = () => {
    y((it) => Math.min(it, l.length - 1));
  }, b = [l.length], e[3] = l.length, e[4] = v, e[5] = b) : (v = e[4], b = e[5]), E.useEffect(v, b);
  let T;
  e[6] !== h || e[7] !== s ? (T = (it) => {
    it !== h && (y(it), s?.(it));
  }, e[6] = h, e[7] = s, e[8] = T) : T = e[8];
  const S = T, w = E.useRef(null), [A, _] = E.useState(0);
  let D;
  e[9] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (D = (it) => {
    _(it.contentRect.width);
  }, e[9] = D) : D = e[9], P8(w, D);
  const j = l.length === 3 ? 54 : 21;
  let M;
  e[10] !== f || e[11] !== j ? (M = f ? {
    left: j,
    right: j,
    width: `calc(100% - ${j * 2}px)`
  } : {}, e[10] = f, e[11] = j, e[12] = M) : M = e[12];
  const V = M;
  let B;
  e[13] !== j ? (B = {
    top: 21,
    bottom: 21,
    left: j,
    right: j
  }, e[13] = j, e[14] = B) : B = e[14];
  const R = B;
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
  let at;
  if (e[18] !== h || e[19] !== S || e[20] !== l) {
    let it;
    e[22] !== h || e[23] !== S ? (it = (ot, O) => /* @__PURE__ */ m.jsx(Gb, {
      isActive: O === h,
      onClick: () => S(O),
      ...ot
    }, O), e[22] = h, e[23] = S, e[24] = it) : it = e[24], at = l.map(it), e[18] = h, e[19] = S, e[20] = l, e[21] = at;
  } else
    at = e[21];
  let nt;
  e[25] !== at ? (nt = /* @__PURE__ */ m.jsx("div", {
    style: K,
    children: at
  }), e[25] = at, e[26] = nt) : nt = e[26];
  let I;
  e[27] !== h || e[28] !== S || e[29] !== l ? (I = /* @__PURE__ */ m.jsx(KE, {
    tabs: l,
    activeIndex: h,
    onChange: S
  }), e[27] = h, e[28] = S, e[29] = l, e[30] = I) : I = e[30];
  const Q = f ? "visible" : "hidden";
  let et;
  e[31] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (et = /* @__PURE__ */ m.jsx(xs, {}), e[31] = et) : et = e[31];
  let N;
  e[32] !== R || e[33] !== A ? (N = /* @__PURE__ */ m.jsx(PE, {
    width: A,
    height: 64,
    insets: R
  }), e[32] = R, e[33] = A, e[34] = N) : N = e[34];
  let Y;
  e[35] !== Q || e[36] !== N ? (Y = /* @__PURE__ */ m.jsxs(E.Activity, {
    mode: Q,
    children: [et, N]
  }), e[35] = Q, e[36] = N, e[37] = Y) : Y = e[37];
  let J;
  return e[38] !== V || e[39] !== nt || e[40] !== I || e[41] !== Y ? (J = /* @__PURE__ */ m.jsxs(tl, {
    ref: w,
    className: kE,
    whileTap: k,
    transition: P,
    style: V,
    layout: !0,
    children: [nt, I, Y]
  }), e[38] = V, e[39] = nt, e[40] = I, e[41] = Y, e[42] = J) : J = e[42], J;
}, Uh = "_badge_dqs9c_1", Yb = "_filled_dqs9c_19", Xb = "_tinted_dqs9c_24", Pb = "_gray_dqs9c_29", Kb = "_media_dqs9c_34", Zb = "_outlined_dqs9c_39", QE = {
  badge: Uh,
  filled: Yb,
  tinted: Xb,
  gray: Pb,
  media: Kb,
  outlined: Zb
}, FE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  badge: Uh,
  default: QE,
  filled: Yb,
  gray: Pb,
  media: Kb,
  outlined: Zb,
  tinted: Xb
}, Symbol.toStringTag, { value: "Module" })), JE = (a) => {
  const e = wt.c(35);
  let l, s, r, c, f, h, y, p;
  e[0] !== a ? ({
    variant: c,
    textVariant: f,
    circled: h,
    squared: y,
    style: r,
    className: s,
    children: l,
    ...p
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c, e[5] = f, e[6] = h, e[7] = y, e[8] = p) : (l = e[1], s = e[2], r = e[3], c = e[4], f = e[5], h = e[6], y = e[7], p = e[8]);
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
  const _ = A, D = r?.background || r?.backgroundColor || null;
  let j = r;
  if (g === "filled") {
    const B = D || "var(--tg-theme-button-color)";
    let R;
    e[16] !== r ? (R = r?.color && {
      "--badge-text-color": r.color
    }, e[16] = r, e[17] = R) : R = e[17];
    let k;
    e[18] !== r || e[19] !== B || e[20] !== R ? (k = {
      ...r,
      "--badge-background": B,
      ...R
    }, e[18] = r, e[19] = B, e[20] = R, e[21] = k) : k = e[21], j = k;
  } else if (g === "tinted") {
    const B = r.color || D || "var(--tg-theme-button-color)";
    let R;
    e[22] !== r.color ? (R = r?.color && {
      "--badge-text-color": r.color
    }, e[22] = r.color, e[23] = R) : R = e[23];
    let k;
    e[24] !== r || e[25] !== R || e[26] !== B ? (k = {
      ...r,
      "--badge-background": B,
      ...R
    }, e[24] = r, e[25] = R, e[26] = B, e[27] = k) : k = e[27], j = k;
  }
  const M = `${Uh} ${FE[g]} ${s || ""}`;
  let V;
  return e[28] !== j || e[29] !== l || e[30] !== _ || e[31] !== M || e[32] !== p || e[33] !== v ? (V = /* @__PURE__ */ m.jsx(lt, {
    variant: v,
    className: M,
    style: j,
    ..._,
    ...p,
    children: l
  }), e[28] = j, e[29] = l, e[30] = _, e[31] = M, e[32] = p, e[33] = v, e[34] = V) : V = e[34], V;
};
Ur["tooltip-surface"];
const ol = (a) => {
  const e = wt.c(2), {
    children: l
  } = a;
  let s;
  return e[0] !== l ? (s = /* @__PURE__ */ m.jsx(sE, {
    children: /* @__PURE__ */ m.jsx(UC, {
      children: /* @__PURE__ */ m.jsx(J8, {
        children: /* @__PURE__ */ m.jsx($b, {
          children: l
        })
      })
    })
  }), e[0] = l, e[1] = s) : s = e[1], s;
}, WE = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/home" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M11.2921 3.10288C11.7572 2.98914 12.243 2.98915 12.7081 3.10288C13.2396 3.23288 13.709 3.55457 14.2432 3.92027L19.2442 7.33335C19.6706 7.62361 20.0467 7.87916 20.3282 8.22788C20.5749 8.53357 20.7603 8.88486 20.8731 9.26206C21.0018 9.69232 21.0007 10.1491 21.0001 10.6673V16.9613C21.0001 17.4921 21.0004 17.9503 20.9698 18.3275C20.9375 18.7256 20.8656 19.1213 20.6729 19.5023C20.3853 20.0709 19.9269 20.5339 19.3624 20.8236C18.9841 21.0177 18.5907 21.0889 18.1954 21.1214C17.8209 21.1523 17.366 21.1527 16.8389 21.1527H7.16121C6.63427 21.1527 6.17922 21.1523 5.80476 21.1214C5.40975 21.0889 5.01682 21.0175 4.63875 20.8236C4.07426 20.5339 3.61484 20.0709 3.32722 19.5023C3.13458 19.1213 3.06265 18.7255 3.03035 18.3275C2.99975 17.9503 3.00006 17.4921 3.00008 16.9613V10.6673C2.99948 10.1491 2.99933 9.69232 3.12801 9.26206C3.24091 8.8848 3.42612 8.53359 3.67293 8.22788C3.95441 7.87922 4.32962 7.62355 4.75593 7.33335L9.75691 3.92027C10.2911 3.55462 10.7606 3.23292 11.2921 3.10288ZM10.5001 12.0882C9.94779 12.0882 9.50008 12.5359 9.50008 13.0882V16.1244C9.50008 16.6767 9.94779 17.1244 10.5001 17.1244H13.5001C14.0524 17.1244 14.5001 16.6767 14.5001 16.1244V13.0882C14.5001 12.5359 14.0524 12.0882 13.5001 12.0882H10.5001Z", fill: "currentColor" }))), IE = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/calendar" }, /* @__PURE__ */ E.createElement("path", { id: "Union", d: "M19.6748 10.7998C19.9782 10.7998 20.1303 10.7997 20.2441 10.8633C20.3246 10.9083 20.3915 10.9752 20.4365 11.0557C20.5001 11.1695 20.5 11.3216 20.5 11.625V13.9004C20.5 16.329 20.5 17.5435 19.9902 18.4541C19.6298 19.0977 19.0977 19.6298 18.4541 19.9902C17.5435 20.5 16.329 20.5 13.9004 20.5H10.0996C7.67103 20.5 6.4565 20.5 5.5459 19.9902C4.90227 19.6298 4.37022 19.0977 4.00977 18.4541C3.5 17.5435 3.5 16.329 3.5 13.9004V11.625C3.5 11.3216 3.49986 11.1695 3.56348 11.0557C3.60853 10.9752 3.67541 10.9083 3.75586 10.8633C3.86967 10.7997 4.02177 10.7998 4.3252 10.7998H19.6748ZM16 1.5C16.5523 1.5 17 1.94772 17 2.5V3.58984C17.5949 3.66023 18.0539 3.78571 18.4541 4.00977C19.0977 4.37022 19.6298 4.90227 19.9902 5.5459C20.3615 6.20916 20.4605 7.03367 20.4873 8.37109C20.4933 8.67145 20.4965 8.8223 20.4336 8.93848C20.3896 9.01965 20.3215 9.08906 20.2412 9.13477C20.1263 9.20009 19.9733 9.2002 19.668 9.2002H4.33203C4.02672 9.2002 3.87368 9.20009 3.75879 9.13477C3.67854 9.08906 3.61044 9.01965 3.56641 8.93848C3.50351 8.8223 3.50669 8.67145 3.5127 8.37109C3.53947 7.03367 3.63847 6.20916 4.00977 5.5459C4.37022 4.90227 4.90227 4.37022 5.5459 4.00977C5.94613 3.78571 6.40508 3.66023 7 3.58984V2.5C7 1.94772 7.44772 1.5 8 1.5C8.55228 1.5 9 1.94772 9 2.5V3.50488C9.33664 3.50264 9.70183 3.5 10.0996 3.5H13.9004C14.2982 3.5 14.6634 3.50264 15 3.50488V2.5C15 1.94772 15.4477 1.5 16 1.5Z", fill: "#3D3C3A" }))), qr = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "#3D3C3A" }), /* @__PURE__ */ E.createElement("path", { id: "Vector 234255039", d: "M9 12.439L11.1818 14.8564L13.0909 11.8347L14.0455 10.3238L14.5227 9.56836", stroke: "white", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }))), Md = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "#3D3C3A" }), /* @__PURE__ */ E.createElement("path", { id: "Vector 234255931", d: "M12 12.5V8", stroke: "white", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ E.createElement("circle", { id: "Ellipse 253668", cx: 1, cy: 1, r: 1, transform: "matrix(1 0 0 -1 11 17)", fill: "white" }))), tA = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/heart" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", fillRule: "evenodd", clipRule: "evenodd", d: "M12 6.34213C13.1016 4.86137 14.8294 3.86287 16.9203 4.05233C19.9439 4.3263 22.0001 6.73448 22.0001 9.87524C22.0001 12.7458 20.4285 15.1633 18.5183 16.9571C16.6026 18.756 14.2269 20.0464 12.319 20.6691C12.1117 20.7368 11.8884 20.7368 11.6811 20.6691C9.77325 20.0464 7.39752 18.756 5.48179 16.9571C3.57156 15.1633 2 12.7458 2 9.87524C2 6.73448 4.05617 4.3263 7.07975 4.05233C9.17073 3.86287 10.8984 4.86142 12 6.34213Z", fill: "currentColor" }))), eA = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/cup" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", fillRule: "evenodd", clipRule: "evenodd", d: "M12.9992 3.02148C17.9698 3.02148 21.9992 5.27629 21.9992 8.05772C21.9992 12.0867 20.9992 21.1519 12.9992 21.1519C9.14215 21.1518 6.91501 19.043 5.63991 16.4088L4.98464 16.5417C2.90427 16.9606 0.88686 15.5799 0.507098 13.4776C0.136993 11.4266 1.46695 9.45421 3.49635 9.04529L4.01491 8.94004C4.0039 8.6258 3.99928 8.33024 3.99928 8.05772C3.99928 5.27633 8.02884 3.02156 12.9992 3.02148ZM3.88796 11.0204C2.92844 11.2139 2.30006 12.1467 2.47487 13.1166C2.65441 14.111 3.60814 14.7636 4.59206 14.5654L4.89284 14.5045C4.52286 13.3122 4.29975 12.0906 4.16823 10.9634L3.88796 11.0204ZM12.9992 5.03598C9.13341 5.03604 5.99928 6.38889 5.99928 8.05772C5.99928 9.72654 9.13341 11.0794 12.9992 11.0795C16.8652 11.0795 19.9992 9.72657 19.9992 8.05772C19.9992 6.38886 16.8652 5.03598 12.9992 5.03598Z", fill: "currentColor" }))), nA = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ E.createElement("path", { id: "Vector 234255937", d: "M3.52765 9.90413C0.911528 15.9537 3.96635 21.1957 8.35342 22.5511C8.84167 22.702 9.19067 22.0789 8.92321 21.6434C8.19965 20.4654 7.47887 18.5753 8.56051 16.6478C8.64224 16.5022 8.85072 16.5146 8.93197 16.6605C9.95802 18.5031 10.9317 18.5031 10.9317 18.5031C10.9317 18.5031 8.86679 14.8896 11.7788 12.1893C11.8911 12.0851 12.0723 12.1349 12.1315 12.2762C13.3539 15.1909 17.8248 17.3143 14.8582 21.9344C14.6119 22.3181 14.8717 22.8388 15.3226 22.7712C20.4424 22.0038 22.208 16.0069 20.1757 11.4342C18.0862 6.73288 13.4876 7.04975 11.6828 2.26117C11.5637 1.9453 11.198 1.78379 10.9122 1.96333C7.99596 3.79495 6.34996 7.94875 7.37329 13.0655C6.01592 12.7262 5.08207 11.1162 4.57178 9.95361C4.37654 9.50881 3.72046 9.45827 3.52765 9.90413Z", fill: "currentColor" }))), Qb = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/cross" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M16.2929 6.06242C16.6834 5.6719 17.3164 5.67191 17.707 6.06242C18.0975 6.45295 18.0975 7.08596 17.707 7.47649L13.414 11.7695L17.707 16.0624C18.0975 16.4529 18.0975 17.086 17.707 17.4765C17.3164 17.867 16.6834 17.867 16.2929 17.4765L11.9999 13.1835L7.70696 17.4765C7.31643 17.867 6.68342 17.867 6.29289 17.4765C5.90238 17.086 5.90237 16.4529 6.29289 16.0624L10.5859 11.7695L6.29289 7.47649C5.90237 7.08596 5.90237 6.45295 6.29289 6.06242C6.68342 5.6719 7.31643 5.6719 7.70696 6.06242L11.9999 10.3554L16.2929 6.06242Z", fill: "#3D3C3A" }))), Fb = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "currentColor" }), /* @__PURE__ */ E.createElement("path", { id: "Vector 234255931", d: "M12 12V16", stroke: "var(--background)", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ E.createElement("circle", { id: "Ellipse 253668", cx: 12, cy: 8.5, r: 1, fill: "var(--background)" }))), $r = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/plus" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", transform: "translate(5 4.769)", d: "M6 13C6 13 6 8 6 8C6 8 1 8 1 8C0.448 8 0 7.552 0 7C0 6.448 0.448 6 1 6C1 6 6 6 6 6C6 6 6 1 6 1C6 0.448 6.448 0 7 0C7.552 0 8 0.448 8 1C8 1 8 6 8 6C8 6 13 6 13 6C13.552 6 14 6.448 14 7C14 7.552 13.552 8 13 8C13 8 8 8 8 8C8 8 8 13 8 13C8 13.552 7.552 14 7 14C6.448 14 6 13.552 6 13Z", fill: "currentColor" }))), aA = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("path", { d: "M16.5791 4.53223C18.0851 4.53223 18.8049 4.65337 19.5361 5.04297C20.1593 5.3751 20.654 5.86826 20.9873 6.48926C21.3783 7.21793 21.5 7.93502 21.5 9.43555V14.7383C21.5 16.2388 21.3783 16.9559 20.9873 17.6846C20.654 18.3056 20.1593 18.7987 19.5361 19.1309C18.8049 19.5205 18.0851 19.6416 16.5791 19.6416H7.4209C5.91493 19.6416 5.19509 19.5205 4.46387 19.1309C3.84066 18.7987 3.34603 18.3056 3.0127 17.6846C2.62169 16.9559 2.50002 16.2388 2.5 14.7383V9.43555C2.50003 7.93502 2.62167 7.21793 3.0127 6.48926C3.34603 5.86826 3.84066 5.3751 4.46387 5.04297C5.19509 4.65337 5.91494 4.53223 7.4209 4.53223H16.5791ZM10.1436 9.44043C9.76724 8.73388 8.75424 8.73388 8.37793 9.44043L5.78223 14.3125C5.42805 14.9784 5.91082 15.7829 6.66504 15.7832H17.0791C17.8878 15.7831 18.3617 14.8726 17.8984 14.21L16.2656 11.877C15.8829 11.3303 15.0819 11.3051 14.665 11.8262L12.998 13.9092C12.8634 14.0774 12.6005 14.0532 12.499 13.8633L10.1436 9.44043Z", fill: "currentColor" })), iA = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("path", { d: "M14.0996 3.5C16.3398 3.5 17.4608 3.49957 18.3164 3.93555C19.0689 4.31902 19.681 4.93109 20.0645 5.68359C20.5004 6.53924 20.5 7.66018 20.5 9.90039V14.0996C20.5 16.3398 20.5004 17.4608 20.0645 18.3164C19.681 19.0689 19.0689 19.681 18.3164 20.0645C17.4608 20.5004 16.3398 20.5 14.0996 20.5H9.90039C7.66018 20.5 6.53924 20.5004 5.68359 20.0645C4.93109 19.681 4.31902 19.0689 3.93555 18.3164C3.49957 17.4608 3.5 16.3398 3.5 14.0996V9.90039C3.5 7.66018 3.49957 6.53924 3.93555 5.68359C4.31902 4.93109 4.93109 4.31902 5.68359 3.93555C6.53924 3.49957 7.66018 3.5 9.90039 3.5H14.0996ZM9.5 8.2002C9.05817 8.2002 8.7002 8.55817 8.7002 9C8.7002 9.44183 9.05817 9.7998 9.5 9.7998H11.2002V15.5C11.2002 15.9418 11.5582 16.2998 12 16.2998C12.4418 16.2998 12.7998 15.9418 12.7998 15.5V9.7998H14.5C14.9418 9.7998 15.2998 9.44183 15.2998 9C15.2998 8.55817 14.9418 8.2002 14.5 8.2002H9.5Z", fill: "currentColor" })), lA = {
  success: qr,
  error: Md,
  warning: Md,
  info: Fb
};
let Rr = null, $g = !1;
const _d = [];
function sA() {
  const a = LE();
  return E.useEffect(() => (Rr = a.show, _d.length && _d.splice(0).forEach((e) => a.show(e)), () => {
    Rr = null;
  })), null;
}
function oA() {
  if ($g || typeof document > "u") return;
  $g = !0;
  const a = document.createElement("div");
  a.setAttribute("data-aiwa-toast-host", ""), document.body.appendChild(a), $i.createRoot(a).render(
    /* @__PURE__ */ m.jsx($b, { children: /* @__PURE__ */ m.jsx(sA, {}) })
  );
}
function Jb(a, e = {}) {
  const l = typeof a == "string" ? { title: a, ...e } : { ...a };
  if (l.type && !l.icon) {
    const s = lA[l.type];
    s && (l.icon = /* @__PURE__ */ m.jsx(s, {}));
  }
  return oA(), Rr ? Rr(l) : (_d.push(l), null);
}
function rA() {
  typeof window < "u" && (window.aiwaToast = Jb);
}
const vn = (a, ...e) => {
  const l = window[a];
  typeof l == "function" && l(...e);
}, ie = (a, ...e) => {
  const l = window[a];
  return typeof l == "function" ? l(...e) : null;
}, Gt = (a, e = {}) => {
  const l = ie("aiwaApi", a, e);
  return l && typeof l.then == "function" ? l : Promise.reject(new Error("API bridge is unavailable"));
}, Ot = (a, e = {}) => Jb(a, e), Rd = (a) => `${Math.round(Number(a) || 0).toLocaleString("ru-RU")} ккал`, Wb = (a) => vn("track", a), uA = () => {
  const a = window.Telegram?.WebApp;
  a?.close && a.close();
}, el = async ({ nudge: a = !0, topic: e = "" } = {}) => {
  a && await Promise.race([
    Gt("/api/nudge", e ? { topic: e } : {}).catch(() => null),
    new Promise((c) => setTimeout(c, 2e3))
  ]);
  const l = window.Telegram?.WebApp, s = ie("aiwaData")?.bot_username, r = typeof l?.openTelegramLink == "function" && (typeof l.isVersionAtLeast != "function" || l.isVersionAtLeast("6.1"));
  s && r && l.openTelegramLink(`https://t.me/${s}`), uA();
}, cA = () => {
  const a = window.Telegram?.WebApp;
  return typeof a?.showPopup != "function" ? !1 : typeof a.isVersionAtLeast != "function" || a.isVersionAtLeast("6.2");
}, le = (a, e) => ({
  "aria-label": a,
  onClick: e,
  onKeyDown: (l) => {
    (l.key === "Enter" || l.key === " ") && (l.preventDefault(), e());
  },
  role: "button",
  tabIndex: 0
});
function kh({ title: a, size: e = "regular", ...l }) {
  return e === "large" ? /* @__PURE__ */ m.jsx("div", { className: "aiwa-panel-header is-large", children: /* @__PURE__ */ m.jsx(lt, { as: "h1", variant: "title1", weight: "bold", children: a }) }) : /* @__PURE__ */ m.jsx("div", { className: "aiwa-panel-header", children: /* @__PURE__ */ m.jsx(FC, { ...l, children: a }) });
}
const Gg = (a, e = "") => [
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
function Ib({
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
  const p = f && y === "heart", g = [r ? `is-${r}` : "", f ? "is-marking" : ""].filter(Boolean).join(" "), v = f ? { iso: a.iso, today: a.today, muted: a.muted } : a, b = /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
    f ? null : /* @__PURE__ */ m.jsx("span", { className: "aiwa-date-cell-ring", "aria-hidden": "true" }),
    /* @__PURE__ */ m.jsx(lt, { className: "aiwa-date-cell-number", variant: "body", weight: "regular", children: a.date }),
    f ? /* @__PURE__ */ m.jsx(
      "span",
      {
        className: `aiwa-date-cell-radio${p ? " is-heart" : ""}${h ? " is-checked" : ""}`,
        "aria-hidden": "true",
        children: p ? /* @__PURE__ */ m.jsx(tA, {}) : h ? /* @__PURE__ */ m.jsx(qr, {}) : null
      }
    ) : null,
    !f && a.phase && !a.actualPeriod && !a.predictedPeriod ? /* @__PURE__ */ m.jsx("span", { className: "aiwa-date-cell-dot", "aria-hidden": "true" }) : null,
    !f && a.intimacy ? /* @__PURE__ */ m.jsx("span", { className: "aiwa-date-cell-heart", "aria-hidden": "true", children: "♥" }) : null,
    s && a.today && !f ? /* @__PURE__ */ m.jsx(lt, { className: "aiwa-date-cell-today", variant: "caption1", weight: "regular", children: "Сегодня" }) : null
  ] });
  if (!e)
    return /* @__PURE__ */ m.jsx("div", { className: Gg(v, g), "data-iso": a.iso, "aria-label": `${a.label || "День"}, ${a.date}`, children: b });
  const T = l || a.monthLabel || "", S = T ? `${a.date} ${T}` : `${a.label || "День"}, ${a.date}`, w = f ? h ? ", отмечено" : "" : `${a.actualPeriod ? ", отмечены месячные" : ""}${a.predictedPeriod ? ", прогноз месячных" : ""}${a.intimacy ? ", отмечена близость" : ""}`;
  return /* @__PURE__ */ m.jsx(
    Ce,
    {
      as: "button",
      type: "button",
      mode: "opacity",
      disabled: a.disabled,
      "aria-label": `${S}${w}`,
      "aria-pressed": f ? h : typeof a.selected == "boolean" ? a.selected : void 0,
      className: Gg(v, ["aiwa-calendar-day", g].filter(Boolean).join(" ")),
      "data-iso": a.iso,
      onClick: () => c ? c(a) : vn("aiwaCalendarDay", a.iso),
      children: b
    }
  );
}
function tx(a, ...e) {
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
const fA = 140;
function Yg(a, e) {
  const l = a.scrollWidth - a.clientWidth, s = e.offsetLeft - (a.clientWidth - e.offsetWidth) / 2;
  return Math.min(l, Math.max(0, s));
}
function dA(a) {
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
function Hh({ days: a, selectedIso: e = "", onSelect: l = null }) {
  const s = typeof l == "function", r = E.useRef(null), c = E.useRef(null);
  c.current = { days: a, selectedIso: e, onSelect: l };
  const f = E.useRef("");
  return tx(r, a?.length), E.useLayoutEffect(() => {
    const h = r.current;
    if (!h) return;
    const y = f.current;
    if (f.current = "", y && y === e || h.scrollWidth - h.clientWidth <= 0) return;
    const g = h.querySelector(e ? `[data-iso="${e}"]` : ".is-today");
    g && (h.scrollLeft = Yg(h, g));
  }, [e, a?.length]), E.useEffect(() => {
    const h = r.current;
    if (!h || !s) return;
    let y = 0, p = !1, g = !1;
    const v = () => {
      if (y = 0, p || !g) return;
      g = !1;
      const _ = dA(h);
      if (!_) return;
      const { days: D, selectedIso: j, onSelect: M } = c.current, V = D?.find((R) => R.iso === _.dataset.iso);
      if (!V) return;
      V.iso !== j && (f.current = V.iso, M(V));
      const B = Yg(h, _);
      if (Math.abs(B - h.scrollLeft) > 0.5) {
        const R = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        h.scrollTo({ left: B, behavior: R ? "auto" : "smooth" });
      }
    }, b = () => {
      y && clearTimeout(y), y = setTimeout(v, fA);
    }, T = () => {
      p && (g = !0), b();
    }, S = () => {
      p = !0;
    }, w = () => {
      p = !1, b();
    }, A = () => {
      g = !0;
    };
    return h.addEventListener("scroll", T, { passive: !0 }), h.addEventListener("touchstart", S, { passive: !0 }), h.addEventListener("touchend", w, { passive: !0 }), h.addEventListener("touchcancel", w, { passive: !0 }), h.addEventListener("wheel", A, { passive: !0 }), () => {
      y && clearTimeout(y), h.removeEventListener("scroll", T), h.removeEventListener("touchstart", S), h.removeEventListener("touchend", w), h.removeEventListener("touchcancel", w), h.removeEventListener("wheel", A);
    };
  }, [s]), /* @__PURE__ */ m.jsx(
    "div",
    {
      className: "aiwa-week",
      role: s ? "group" : void 0,
      "data-selection": e ? "true" : void 0,
      "aria-label": s ? "Выбор дня" : "Текущая неделя",
      ref: r,
      children: a.map((h) => /* @__PURE__ */ m.jsx(
        Ib,
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
const Gr = [
  ["Боль", [["cramps", "Спазмы"], ["head", "Голова"], ["breast", "Грудь"]]],
  ["Настроение", [["irrit", "Раздражительность"], ["anx", "Тревога"], ["low", "Апатия"]]],
  ["Тело", [["tired", "Усталость"], ["bloat", "Вздутие"], ["sweet", "Тянет на сладкое"]]],
  ["Кожа и сон", [["skin", "Высыпания"], ["insomnia", "Плохой сон"]]]
], Dd = {
  // One line each at the bar width: a wrapped hint pushes the bar over the grid.
  period: { label: "Месячные", hint: "нажми на день, чтобы отметить месячные", checked: (a) => a.actualPeriod },
  symptoms: { label: "Симптомы", hint: "нажми на день, чтобы записать симптомы", checked: (a) => a.logged },
  intimacy: { label: "Близость", hint: "нажми на день, чтобы отметить близость", checked: (a) => a.intimacy }
}, hA = (a) => a.map((e) => ({ value: e, label: Dd[e].label })), mA = [
  { label: "Месячные", variant: "tinted", token: "--aiwa-phase-menstrual" },
  { label: "Прогноз", variant: "outlined", token: "--aiwa-phase-menstrual" },
  { label: "Овуляция", variant: "tinted", token: "--aiwa-phase-ovulation" },
  { label: "Фолликулярная", variant: "tinted", token: "--aiwa-phase-follicular" },
  { label: "Лютеиновая", variant: "tinted", token: "--aiwa-phase-luteal" },
  { label: "Близость", variant: "tinted", token: "--aiwa-intimacy" }
], ex = [[1, "Низкая"], [2, "Средняя"], [3, "Высокая"]], nx = [[1, "Плохое"], [2, "Нормальное"], [3, "Хорошее"]], pA = "/assets/food/pancakes.png", ax = [
  { value: "breakfast", label: "Завтрак" },
  { value: "lunch", label: "Обед" },
  { value: "snack", label: "Перекус" },
  { value: "dinner", label: "Ужин" }
], yA = (a) => ({
  title: a?.title || "",
  kcal: String(a?.kcal ?? ""),
  grams: String(a?.grams ?? ""),
  protein: String(a?.protein ?? ""),
  fat: String(a?.fat ?? ""),
  carbs: String(a?.carbs ?? ""),
  slot: a?.slot || "snack"
}), gA = ["Силовая", "Кардио", "Йога", "Ходьба", "Плавание", "Своё"], Za = {
  Ноги: ["Присед", "Жим ногами", "Выпады", "Болгарские", "Румынская тяга", "Разгибания", "Сгибания", "Икры"],
  Спина: ["Вертикальная тяга", "Горизонтальная тяга", "Тяга в наклоне", "Становая", "Подтягивания", "Гиперэкстензия"],
  Грудь: ["Жим лёжа", "Жим гантелей", "Жим в наклоне", "Сведения", "Отжимания"],
  Плечи: ["Жим стоя", "Махи в стороны", "Махи в наклоне", "Протяжка"],
  Ягодицы: ["Ягодичный мост", "Отведение бедра", "Мах ногой", "Плие-присед"],
  Руки: ["Бицепс", "Молоток", "Разгибания трицепс", "Французский жим"],
  Кор: ["Планка", "Скручивания", "Подъём ног", "Русский твист"]
}, vA = {
  Силовая: [],
  Кардио: ["Бег", "Велотренажёр", "Эллипс", "Гребля", "Скакалка"],
  Йога: ["Виньяса", "Хатха", "Растяжка", "Пилатес", "Дыхание"],
  Ходьба: ["Прогулка", "Скандинавская", "Быстрая ходьба"],
  Плавание: ["Кроль", "Брасс", "На спине"],
  Своё: []
}, bA = [
  { value: "cycle", label: "Регулярный цикл" },
  { value: "irregular", label: "Нерегулярный" },
  { value: "preg", label: "Беременность" },
  { value: "meno", label: "Менопауза" },
  { value: "none", label: "Нет месячных" }
], Xg = "custom:";
function xA(a) {
  const e = a?.length ? a.flatMap(([, l]) => l) : Gr.flatMap(([, l]) => l.flat());
  return new Map(e);
}
function SA({ title: a = "Сегодня", checkin: e, symptomGroups: l, onSelect: s }) {
  const r = e?.symptoms ?? [], c = E.useRef(null);
  if (tx(c, r.length), !r.length) return null;
  const f = xA(l), h = s ?? (() => vn("openHomePanel", "journal"));
  return /* @__PURE__ */ m.jsxs("div", { className: "aiwa-today", children: [
    /* @__PURE__ */ m.jsx(lt, { className: "aiwa-today-title", variant: "body", weight: "semibold", children: a }),
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-today-chips", role: "group", "aria-label": a, ref: c, children: r.map((y) => {
      const p = y.startsWith(Xg) ? y.slice(Xg.length) : f.get(y) ?? y;
      return /* @__PURE__ */ m.jsx(
        Ce,
        {
          as: "button",
          type: "button",
          mode: "opacity",
          className: "aiwa-today-chip",
          onClick: () => h(y),
          title: p,
          children: /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: p })
        },
        y
      );
    }) })
  ] });
}
const Pg = 1e3 / 40, wA = 5e3, ix = (a, e) => Array.from(
  { length: e },
  (l, s) => `/assets/${a}/frame-${String(s).padStart(3, "0")}.png`
), TA = ix("aiwa-sequence", 182), qh = ix("aiwa-card-sequence", 193), Gf = /* @__PURE__ */ new Map(), CA = (a) => (Gf.has(a) || Gf.set(
  a,
  Promise.all(a.map((e) => new Promise((l) => {
    const s = new Image();
    s.onload = l, s.onerror = l, s.src = e;
  })))
), Gf.get(a));
function $h({ size: a, frames: e = TA, pauseMs: l = wA }) {
  const [s, r] = E.useState(0);
  return E.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let f = !1, h = 0, y = 0;
    const p = () => {
      let g = 0;
      r(g), h = window.setInterval(() => {
        g += 1, r(g), g === e.length - 1 && (window.clearInterval(h), y = window.setTimeout(p, l || Pg));
      }, Pg);
    };
    return CA(e).then(() => {
      f || p();
    }), () => {
      f = !0, window.clearInterval(h), window.clearTimeout(y);
    };
  }, [e, l]), /* @__PURE__ */ m.jsx(
    "span",
    {
      className: "aiwa-sequence",
      style: { "--aiwa-sequence-size": `${a}px` },
      "data-aiwa-sequence": "true",
      "data-sequence": e === qh ? "card" : "default",
      "data-pause-ms": l,
      "data-frame": s,
      "aria-hidden": "true",
      children: /* @__PURE__ */ m.jsx("img", { src: e[s], alt: "", draggable: "false" })
    }
  );
}
function EA() {
  return /* @__PURE__ */ m.jsxs("div", { className: "aiwa-paper-ai-heading", children: [
    /* @__PURE__ */ m.jsx($h, { size: 58, frames: qh, pauseMs: 0 }),
    /* @__PURE__ */ m.jsx("div", { children: /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "semibold", children: "Айва AI" }) })
  ] });
}
function AA(a) {
  return /* @__PURE__ */ m.jsx(Kn, { ...a, "data-aiwa-cell": "true" });
}
const pt = Object.assign(AA, {
  Start: Kn.Start,
  End: Kn.End,
  Part: Kn.Part,
  Text: Kn.Text,
  Editable: Kn.Editable,
  Switch: Kn.Switch
});
function Ss({
  message: a,
  detail: e,
  onDiscuss: l,
  className: s = ""
}) {
  return /* @__PURE__ */ m.jsx(yt.Item, { className: `aiwa-insight-section ${s}`.trim(), children: /* @__PURE__ */ m.jsx(pt, { "data-aiwa-insight-cell": "true", tappable: !1, children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-insight-content", children: [
    /* @__PURE__ */ m.jsx(EA, {}),
    /* @__PURE__ */ m.jsx(lt, { className: "aiwa-insight-message", variant: "body", weight: "regular", children: a }),
    e ? /* @__PURE__ */ m.jsx(lt, { className: "aiwa-insight-detail", variant: "body", weight: "regular", children: e }) : null,
    l ? /* @__PURE__ */ m.jsx(
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
function jA({ aiText: a }) {
  return /* @__PURE__ */ m.jsx(
    Ss,
    {
      message: a,
      onDiscuss: () => el()
    }
  );
}
function MA({ delay: a }) {
  return a ? /* @__PURE__ */ m.jsxs(yt.Item, { header: a.title, children: [
    /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsx(pt.Text, { title: a.message, description: a.hint }) }),
    a.canSwitchToPregnancy ? /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ m.jsx(
      Ft,
      {
        variant: "filled",
        label: "Перейти в режим беременности",
        isFill: !0,
        ...le("Перейти в режим беременности", () => vn("switchPreg"))
      }
    ) }) }) : null
  ] }) : null;
}
function _A({ ok: a }) {
  const e = a ? qr : Md;
  return /* @__PURE__ */ m.jsx("span", { className: a ? "aiwa-status is-ok" : "aiwa-status is-alert", "aria-label": a ? "В пределах нормы" : "Требует внимания", children: /* @__PURE__ */ m.jsx(e, {}) });
}
function RA({ label: a, value: e, ok: l }) {
  return /* @__PURE__ */ m.jsx(pt, { "data-aiwa-metric-cell": "true", tappable: !1, end: /* @__PURE__ */ m.jsx(_A, { ok: l }), children: /* @__PURE__ */ m.jsx(pt.Text, { title: a, description: e }) });
}
function DA({ metrics: a, title: e = "Статистика" }) {
  return a?.length ? /* @__PURE__ */ m.jsx(yt.Item, { header: e, children: a.map((l) => /* @__PURE__ */ m.jsx(RA, { ...l }, l.label)) }) : null;
}
const NA = E.lazy(() => import("./AiwaWebUiChart-D6hB5HBY.js").then((a) => ({
  default: a.AiwaWebUiChart
})));
function OA() {
  return /* @__PURE__ */ m.jsx("div", { className: "aiwa-area-chart-state is-loading", role: "status", "aria-label": "График загружается", children: /* @__PURE__ */ m.jsx("span", { className: "aiwa-area-chart-skeleton", "aria-hidden": "true" }) });
}
function zA({
  data: a,
  series: e,
  xKey: l,
  band: s = null,
  loading: r = !1,
  title: c = "Динамика цикла",
  emptyText: f = "Добавь ещё один завершённый цикл — здесь появится график."
}) {
  return /* @__PURE__ */ m.jsx(yt.Item, { header: c, children: /* @__PURE__ */ m.jsx(E.Suspense, { fallback: /* @__PURE__ */ m.jsx(OA, {}), children: /* @__PURE__ */ m.jsx(
    NA,
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
function LA({
  history: a,
  title: e = "История цикла",
  emptyTitle: l = "История пока пуста",
  emptyDescription: s = "Она появится после первой сохранённой менструации."
}) {
  const [r, c] = E.useState(!1), f = a || [], h = r ? f : f.slice(0, 3);
  return /* @__PURE__ */ m.jsxs(yt.Item, { header: e, children: [
    h.length ? h.map((y) => /* @__PURE__ */ m.jsx(pt, { "data-aiwa-history-cell": "true", tappable: !1, children: /* @__PURE__ */ m.jsx(pt.Text, { title: y.title, description: y.description }) }, y.key)) : /* @__PURE__ */ m.jsx(pt, { "data-aiwa-history-cell": "true", tappable: !1, children: /* @__PURE__ */ m.jsx(pt.Text, { title: l, description: s }) }),
    f.length > 3 ? /* @__PURE__ */ m.jsx(
      pt,
      {
        as: "button",
        type: "button",
        onClick: () => c((y) => !y),
        end: /* @__PURE__ */ m.jsx(pt.Part, { type: "Chevron" }),
        children: /* @__PURE__ */ m.jsx(pt.Text, { type: "Accent", title: r ? "Свернуть" : "Показать все" })
      }
    ) : null
  ] });
}
const BA = Object.fromEntries(
  Gr.flatMap(([, a]) => a)
), VA = { 1: "низкая энергия", 2: "средняя энергия", 3: "высокая энергия" }, UA = { 1: "плохое настроение", 2: "нормальное настроение", 3: "хорошее настроение" }, kA = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }), HA = (a) => {
  const l = BA[a] || String(a).split(":").pop().replace(/_/g, " ").trim();
  return l ? l[0].toUpperCase() + l.slice(1) : "";
}, qA = (a) => [
  ...(a.symptoms || []).map(HA),
  VA[a.energy],
  UA[a.mood]
].filter(Boolean).map((l) => l[0].toUpperCase() + l.slice(1)).join(" • ") || "Без деталей", $A = (a) => {
  const e = /* @__PURE__ */ new Date(`${a}T12:00:00`);
  return Number.isNaN(e.getTime()) ? a : kA.format(e);
};
function GA() {
  const [a, e] = E.useState(null), [l, s] = E.useState(!1), [r, c] = E.useState(!1);
  E.useEffect(() => {
    Gt("/api/log_history", {}).then((y) => e(y?.items || [])).catch(() => e([]));
  }, []);
  const f = async () => {
    if (!r) {
      c(!0);
      try {
        const y = await Gt("/api/report", { period: "all" }).catch(() => null);
        y?.ok ? Ot("Выписка отправлена в чат бота", { type: "success" }) : Ot(y?.text || "Выписка временно недоступна", { type: "error" });
      } finally {
        c(!1);
      }
    }
  };
  if (!a) return null;
  const h = l ? a : a.slice(0, 3);
  return /* @__PURE__ */ m.jsxs(yt.Item, { header: "Журнал симптомов", children: [
    h.length ? h.map((y) => /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsx(pt.Text, { title: $A(y.d), description: qA(y) }) }, y.d)) : /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsx(pt.Text, { title: "Записей пока нет", description: "Отмечай самочувствие в журнале — здесь появится история." }) }),
    a.length > 3 ? /* @__PURE__ */ m.jsx(
      pt,
      {
        as: "button",
        type: "button",
        onClick: () => s((y) => !y),
        end: /* @__PURE__ */ m.jsx(pt.Part, { type: "Chevron" }),
        children: /* @__PURE__ */ m.jsx(pt.Text, { type: "Accent", title: l ? "Свернуть" : "Показать все" })
      }
    ) : null,
    /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ m.jsx(
      Ft,
      {
        variant: "filled",
        label: r ? "Собираю…" : "Сформировать выписку",
        isFill: !0,
        disabled: r,
        ...le("Сформировать выписку", f)
      }
    ) }) })
  ] });
}
const Yf = {
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
}, YA = (a) => {
  let e = Math.min(Math.max(Math.round(a) || 4, 4), 40);
  for (; e > 4 && !Yf[e]; ) e -= 1;
  return { week: e, name: Yf[e][0], size: Yf[e][1] };
};
function XA({ pregnancy: a }) {
  const [e, l] = E.useState({});
  E.useEffect(() => {
    fetch("/assets/preg/manifest.json?v=1").then((h) => h.ok ? h.json() : {}).then((h) => l(h || {})).catch(() => {
    });
  }, []);
  const s = Math.min(Math.max(Number(a?.week) || 4, 1), 40), r = YA(s), c = e[String(r.week)], f = Math.min(100, Math.max(2, s / 40 * 100));
  return /* @__PURE__ */ m.jsx(yt.Item, { header: "Срок и малыш", children: /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-preg-progress", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-preg-track", role: "img", "aria-label": `${s} неделя из 40`, children: [
      /* @__PURE__ */ m.jsx("div", { className: "aiwa-preg-fill", style: { width: `${f}%` } }),
      /* @__PURE__ */ m.jsx("span", { className: "aiwa-preg-marker", style: { left: `${f}%` } })
    ] }),
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-preg-trimesters", children: [1, 2, 3].map((h) => /* @__PURE__ */ m.jsxs(
      lt,
      {
        variant: "caption1",
        weight: a?.trimester === h ? "semibold" : "regular",
        className: a?.trimester === h ? "is-current" : "",
        children: [
          h,
          " триместр"
        ]
      },
      h
    )) }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-preg-fruit", children: [
      c ? /* @__PURE__ */ m.jsx("img", { src: c, alt: "", width: "64", height: "64", loading: "lazy" }) : null,
      /* @__PURE__ */ m.jsxs("div", { children: [
        /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "semibold", children: `${s} неделя` }),
        /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: `Малыш размером с ${r.name}, ${r.size}` })
      ] })
    ] })
  ] }) }) });
}
const Fi = [];
let Kg = !1;
const lx = () => typeof window < "u" ? window.Telegram?.WebApp?.BackButton : null, PA = () => Fi[Fi.length - 1]?.(), Zg = () => {
  const a = lx();
  a && (Fi.length ? a.show?.() : a.hide?.());
}, KA = (a) => {
  const e = lx();
  return e && !Kg && (e.onClick?.(PA), Kg = !0), Fi.push(a), Zg(), () => {
    const l = Fi.lastIndexOf(a);
    l !== -1 && Fi.splice(l, 1), Zg();
  };
};
function sx(a, e) {
  const l = E.useRef(e);
  l.current = e, E.useEffect(() => {
    if (a)
      return KA(() => l.current?.());
  }, [a]);
}
function bn({ isOpen: a, onClose: e, onBack: l, children: s, ...r }) {
  return sx(a, l || e), E.useEffect(() => {
    if (!a) return;
    const c = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.body.style.overflow = c;
    };
  }, [a]), a ? Vr.createPortal(
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-page", role: "dialog", "aria-modal": "true", ...r, children: s }),
    document.body
  ) : null;
}
function Yr({
  label: a,
  active: e = !1,
  onClick: l,
  isFill: s = !1,
  end: r = null,
  className: c = "",
  ...f
}) {
  const h = r ? /* @__PURE__ */ m.jsxs("span", { className: "aiwa-chip-content", children: [
    /* @__PURE__ */ m.jsx("span", { className: "aiwa-chip-label", children: a }),
    r
  ] }) : a;
  return /* @__PURE__ */ m.jsx(
    Ce,
    {
      as: "button",
      type: "button",
      mode: "opacity",
      className: `aiwa-chip${s ? " is-fill" : ""}${c ? ` ${c}` : ""}`,
      "aria-pressed": e,
      onClick: l,
      ...f,
      children: /* @__PURE__ */ m.jsx(Ft, { variant: e ? "tinted" : "gray", label: h, isFill: s })
    }
  );
}
function Nd({ label: a, active: e, onChange: l, variant: s = "default" }) {
  return /* @__PURE__ */ m.jsx(
    Yr,
    {
      className: `aiwa-log-toggle is-${s}-toggle`,
      label: a,
      active: e,
      isFill: !0,
      "aria-label": `${a}: ${e ? "да" : "нет"}`,
      onClick: () => l(!e),
      end: /* @__PURE__ */ m.jsx("span", { className: "aiwa-log-toggle-mark", "aria-hidden": "true", children: e ? /* @__PURE__ */ m.jsx(qr, {}) : null })
    }
  );
}
function ox({ label: a, children: e }) {
  return /* @__PURE__ */ m.jsxs("div", { className: "aiwa-log-group", children: [
    /* @__PURE__ */ m.jsx(lt, { className: "aiwa-log-label", variant: "subheadline1", weight: "regular", children: a }),
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-log-choices", role: "group", "aria-label": a, children: e })
  ] });
}
function Dr({ label: a, options: e, value: l, onChange: s }) {
  return /* @__PURE__ */ m.jsx(ox, { label: a, children: e.map(([r, c]) => /* @__PURE__ */ m.jsx(
    Yr,
    {
      label: c,
      active: l === r,
      onClick: () => s(r)
    },
    r
  )) });
}
function rx({ label: a, options: e, symptoms: l, onToggle: s }) {
  return /* @__PURE__ */ m.jsx(ox, { label: a, children: e.map(([r, c]) => /* @__PURE__ */ m.jsx(
    Yr,
    {
      label: c,
      active: l.includes(r),
      onClick: () => s(r)
    },
    r
  )) });
}
function ae({
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
  const p = {
    ...y,
    inputMode: c,
    value: e,
    placeholder: s,
    readOnly: h,
    onChange: (g) => l(g.target.value)
  };
  return /* @__PURE__ */ m.jsxs("label", { className: "aiwa-field", children: [
    /* @__PURE__ */ m.jsx(lt, { variant: "caption1", weight: "regular", children: a }),
    f ? /* @__PURE__ */ m.jsx("textarea", { ...p }) : /* @__PURE__ */ m.jsx("input", { type: r, ...p })
  ] });
}
function ux({ value: a, onChange: e }) {
  return /* @__PURE__ */ m.jsx("div", { className: "aiwa-custom-symptom", children: /* @__PURE__ */ m.jsx(
    ae,
    {
      label: "Свой симптом",
      value: a,
      onChange: e,
      placeholder: "Например, тошнота",
      maxLength: 40
    }
  ) });
}
function ZA({ isOpen: a, onClose: e, checkin: l, symptomGroups: s, mode: r }) {
  const [c, f] = E.useState(l.symptoms || []), [h, y] = E.useState(l.energy || 0), [p, g] = E.useState(l.mood || 0), [v, b] = E.useState(!!l.period), [T, S] = E.useState(!!l.intimacy), [w, A] = E.useState(""), [_, D] = E.useState(!1);
  E.useEffect(() => {
    a && (f(l.symptoms || []), y(l.energy || 0), g(l.mood || 0), b(!!l.period), S(!!l.intimacy), A(""), D(!1));
  }, [a]);
  const j = (B) => {
    f((R) => R.includes(B) ? R.filter((k) => k !== B) : [...R, B]);
  }, M = s?.length ? s : Gr, V = async () => {
    if (_) return;
    const B = l.symptoms || [], R = w.trim();
    D(!0);
    try {
      let k = !1;
      v !== !!l.period && (await ie("toggleTodayPeriod"), k = !0), h !== (l.energy || 0) && (await ie("setCheckin", "energy", h), k = !0), p !== (l.mood || 0) && (await ie("setCheckin", "mood", p), k = !0);
      for (const P of c.filter((K) => !B.includes(K)))
        await ie("toggleSym", P);
      for (const P of B.filter((K) => !c.includes(K)))
        await ie("toggleSym", P);
      T !== !!l.intimacy && await ie("toggleTodayIntimacy"), R && (await ie("addCustomSym", R), k = !0), k || Ot("Сохранено", { type: "success" }), e();
    } catch (k) {
      Ot(k?.message || "Не удалось сохранить", { type: "error" });
    } finally {
      D(!1);
    }
  };
  return /* @__PURE__ */ m.jsxs(
    bn,
    {
      isOpen: a,
      onClose: e,
      "data-aiwa-log-modal": "true",
      children: [
        /* @__PURE__ */ m.jsx(kh, { size: "large", title: "Занести в журнал" }),
        /* @__PURE__ */ m.jsx("div", { className: "aiwa-log-scroll", children: /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-log-sections", children: [
          r !== "preg" && r !== "meno" ? /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(Nd, { label: "Месячные", variant: "period", active: v, onChange: b }) }) : null,
          /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(
            Dr,
            {
              label: "Энергия",
              options: ex,
              value: h,
              onChange: y
            }
          ) }),
          /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(
            Dr,
            {
              label: "Настроение",
              options: nx,
              value: p,
              onChange: g
            }
          ) }),
          M.map(([B, R]) => /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(rx, { label: B, options: R, symptoms: c, onToggle: j }) }, B)),
          /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(ux, { value: w, onChange: A }) }),
          /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(Nd, { label: "Близость", active: T, onChange: S }) })
        ] }) }),
        /* @__PURE__ */ m.jsx("div", { className: "aiwa-log-footer", children: /* @__PURE__ */ m.jsx(
          Ft,
          {
            variant: "filled",
            label: _ ? "Сохраняю…" : "Сохранить",
            isFill: !0,
            ...le("Сохранить", V)
          }
        ) })
      ]
    }
  );
}
function QA({ icon: a, label: e, onClick: l, className: s = "", ...r }) {
  return /* @__PURE__ */ m.jsx(
    Ce,
    {
      as: "button",
      type: "button",
      mode: "opacity",
      "aria-label": e,
      className: `aiwa-fab${s ? ` ${s}` : ""}`,
      onClick: l,
      ...r,
      children: /* @__PURE__ */ m.jsx(Th, { className: "aiwa-fab-surface", children: /* @__PURE__ */ m.jsx("span", { className: "aiwa-fab-icon", "aria-hidden": "true", children: a }) })
    }
  );
}
const as = 8, Qg = 6;
function FA(a, e, l) {
  const s = window.innerWidth, r = window.innerHeight;
  let c = l === "end" ? a.right - e.width : a.left;
  c = Math.min(c, s - e.width - as), c = Math.max(as, c);
  const f = a.bottom + Qg, h = a.top - Qg - e.height, y = f + e.height <= r - as, p = y || h < as ? f : h, g = y || h < as ? "top" : "bottom";
  return { top: p, left: c, originY: g };
}
function cx({ items: a, trigger: e, align: l = "start", className: s = "" }) {
  const [r, c] = E.useState(!1), [f, h] = E.useState({ top: 0, left: 0, originY: "top" }), y = E.useRef(null), p = E.useRef(null), g = E.useCallback(() => {
    c(!1);
  }, []);
  E.useLayoutEffect(() => {
    if (!r || !p.current || !y.current) return;
    const b = () => {
      const T = y.current.getBoundingClientRect(), S = { width: p.current.offsetWidth, height: p.current.offsetHeight };
      h(FA(T, S, l));
    };
    return b(), window.addEventListener("resize", b), window.addEventListener("scroll", b, !0), () => {
      window.removeEventListener("resize", b), window.removeEventListener("scroll", b, !0);
    };
  }, [r, l]), E.useEffect(() => {
    if (!r) return;
    const b = (S) => {
      p.current?.contains(S.target) || y.current?.contains(S.target) || g();
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
  return /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
    /* @__PURE__ */ m.jsx(
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
    r && Vr.createPortal(
      /* @__PURE__ */ m.jsx(
        "div",
        {
          ref: p,
          role: "menu",
          className: "aiwa-action-menu",
          "data-align": l,
          style: {
            position: "fixed",
            top: f.top,
            left: f.left,
            transformOrigin: `${l === "end" ? "right" : "left"} ${f.originY}`
          },
          children: a.map((b) => /* @__PURE__ */ m.jsxs(
            "button",
            {
              type: "button",
              role: "menuitem",
              className: "aiwa-action-menu-item",
              onClick: () => v(b),
              children: [
                b.icon ? /* @__PURE__ */ m.jsx("span", { className: "aiwa-action-menu-icon", "aria-hidden": "true", children: b.icon }) : null,
                /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: b.label })
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
function JA({ options: a, value: e, onChange: l, hint: s }) {
  return /* @__PURE__ */ m.jsxs(Th, { className: "aiwa-mark-bar", role: "group", "aria-label": "Что отмечаем", children: [
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-mark-bar-chips", children: a.map((r) => /* @__PURE__ */ m.jsx(
      Yr,
      {
        label: r.label,
        active: e === r.value,
        onClick: () => l(r.value)
      },
      r.value
    )) }),
    s ? /* @__PURE__ */ m.jsx(lt, { className: "aiwa-mark-bar-hint", variant: "footnote", weight: "regular", role: "status", children: s }) : null
  ] });
}
function WA({ iso: a, label: e, open: l, onClose: s, symptomGroups: r, showIntimacy: c = !0 }) {
  const [f, h] = E.useState({}), [y, p] = E.useState([]), [g, v] = E.useState(0), [b, T] = E.useState(0), [S, w] = E.useState(!1), [A, _] = E.useState(""), [D, j] = E.useState(!1);
  E.useEffect(() => {
    if (!a || !l) return;
    const R = ie("getAiwaDayCheckin", a) || {};
    h(R), p(R.symptoms || []), v(R.energy || 0), T(R.mood || 0), w(!!R.intimacy), _(""), j(!1);
  }, [a, l]);
  const M = (R) => {
    p((k) => k.includes(R) ? k.filter((P) => P !== R) : [...k, R]);
  }, V = r?.length ? r : Gr, B = async () => {
    if (D) return;
    const R = f.symptoms || [], k = A.trim();
    j(!0);
    try {
      g !== (f.energy || 0) && await ie("setDayCheckin", a, "energy", g), b !== (f.mood || 0) && await ie("setDayCheckin", a, "mood", b);
      for (const P of y.filter((K) => !R.includes(K)))
        await ie("toggleDaySym", a, P);
      for (const P of R.filter((K) => !y.includes(K)))
        await ie("toggleDaySym", a, P);
      S !== !!f.intimacy && await ie("markPA", a), k ? await ie("addDayCustomSym", a, k) : Ot("Сохранено", { type: "success" }), s();
    } catch (P) {
      Ot(P?.message || "Не удалось сохранить", { type: "error" });
    } finally {
      j(!1);
    }
  };
  return /* @__PURE__ */ m.jsxs(
    bn,
    {
      isOpen: l,
      onClose: s,
      "data-aiwa-day-log-modal": "true",
      children: [
        /* @__PURE__ */ m.jsx(kh, { size: "large", title: e || "Занести в журнал" }),
        /* @__PURE__ */ m.jsx("div", { className: "aiwa-log-scroll", children: /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-log-sections", children: [
          /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(
            Dr,
            {
              label: "Энергия",
              options: ex,
              value: g,
              onChange: v
            }
          ) }),
          /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(
            Dr,
            {
              label: "Настроение",
              options: nx,
              value: b,
              onChange: T
            }
          ) }),
          V.map(([R, k]) => /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(rx, { label: R, options: k, symptoms: y, onToggle: M }) }, R)),
          /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(ux, { value: A, onChange: _ }) }),
          c ? /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(Nd, { label: "Близость", active: S, onChange: w }) }) : null
        ] }) }),
        /* @__PURE__ */ m.jsx("div", { className: "aiwa-log-footer", children: /* @__PURE__ */ m.jsx(
          Ft,
          {
            variant: "filled",
            label: D ? "Сохраняю…" : "Сохранить",
            isFill: !0,
            ...le("Сохранить", B)
          }
        ) })
      ]
    }
  );
}
function IA({ isOpen: a, onClose: e, mode: l, revision: s, symptomGroups: r }) {
  const [c, f] = E.useState(!1), [h, y] = E.useState(null), [p, g] = E.useState(!1), [v, b] = E.useState("period"), [T, S] = E.useState({}), w = E.useRef(Promise.resolve()), A = E.useRef(0), _ = Array.from({ length: 20 }, (Q, et) => ie("getAiwaCalendarMonth", et - 12)).filter(Boolean), D = l !== "preg" && l !== "meno", j = hA(D ? ["period", "symptoms", "intimacy"] : ["symptoms", "intimacy"]), M = Dd[v] || Dd.symptoms, V = cA(), B = () => {
    g(!1), S({});
  }, R = (Q) => {
    b(Q), f(!1), g(!0);
  }, k = j.map((Q) => ({
    label: Q.label,
    onSelect: () => R(Q.value)
  }));
  sx(a, p ? B : e);
  const P = E.useRef(null);
  E.useEffect(() => {
    if (!a) return;
    const Q = P.current, et = Q?.querySelector('[data-current-month="true"]');
    Q && et && (Q.scrollTop = Math.max(0, et.offsetTop - 8));
  }, [a]), E.useEffect(() => {
    a || (f(!1), y(null), g(!1), S({})), b(D ? "period" : "symptoms");
  }, [a, D]);
  const K = (Q) => {
    const et = T[`${v}:${Q.iso}`];
    return typeof et == "boolean" ? et : !!M.checked(Q);
  }, at = (Q, et) => {
    const N = () => ie(Q, et);
    A.current += 1, w.current = w.current.then(N, N).then(() => {
      A.current -= 1, A.current === 0 && S({});
    });
  }, nt = (() => {
    const Q = /* @__PURE__ */ new Date();
    return `${Q.getFullYear()}-${String(Q.getMonth() + 1).padStart(2, "0")}-${String(Q.getDate()).padStart(2, "0")}`;
  })(), I = (Q, et) => {
    if (!p) {
      Q.iso && Q.iso <= nt && y({ iso: Q.iso, label: `${Q.date} ${et}` });
      return;
    }
    if (v === "symptoms") {
      y({ iso: Q.iso, label: `${Q.date} ${et}` });
      return;
    }
    S((N) => ({ ...N, [`${v}:${Q.iso}`]: !K(Q) })), at(v === "period" ? "toggleCalendarPeriodDay" : "markPA", Q.iso);
  };
  return a ? Vr.createPortal(
    /* @__PURE__ */ m.jsxs(
      "div",
      {
        className: "aiwa-calendar-page",
        "data-aiwa-calendar-modal": "true",
        "data-marking": p ? "true" : void 0,
        "data-markbar": p && !V ? "true" : void 0,
        role: "region",
        "aria-label": "Календарь",
        children: [
          /* @__PURE__ */ m.jsxs("div", { className: "aiwa-calendar-screen", "data-revision": s, role: "document", "aria-label": "Календарь", children: [
            /* @__PURE__ */ m.jsxs("div", { className: "aiwa-calendar-modeswitch", children: [
              p && V ? null : /* @__PURE__ */ m.jsxs(
                Ce,
                {
                  as: "button",
                  type: "button",
                  mode: "opacity",
                  className: "aiwa-calendar-legend-toggle",
                  "aria-pressed": c,
                  "aria-label": c ? "Скрыть обозначения" : "Показать обозначения календаря",
                  onClick: () => f((Q) => !Q),
                  children: [
                    /* @__PURE__ */ m.jsx(Fb, {}),
                    /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "semibold", children: "Обозначения" })
                  ]
                }
              ),
              p ? /* @__PURE__ */ m.jsx(
                Ce,
                {
                  as: "button",
                  type: "button",
                  mode: "opacity",
                  className: "aiwa-calendar-done",
                  "aria-label": "Закончить отметки",
                  onClick: B,
                  children: /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "semibold", children: "Готово" })
                }
              ) : null
            ] }),
            c ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-calendar-help", role: "status", children: [
              /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "semibold", children: "Обозначения" }),
              /* @__PURE__ */ m.jsx("div", { className: "aiwa-calendar-legend", children: mA.map(({ label: Q, variant: et, token: N }) => /* @__PURE__ */ m.jsx(
                JE,
                {
                  variant: et,
                  textVariant: "caption1",
                  weight: "semibold",
                  style: { color: `var(${N})` },
                  children: Q
                },
                Q
              )) })
            ] }) : null,
            /* @__PURE__ */ m.jsx("div", { className: "aiwa-calendar-scroll", ref: P, children: /* @__PURE__ */ m.jsx("div", { className: "aiwa-calendar-months", children: _.map((Q) => /* @__PURE__ */ m.jsxs(
              "section",
              {
                className: "aiwa-calendar-month",
                "aria-label": Q.label,
                "data-current-month": Q.days.some((et) => et.today) ? "true" : void 0,
                children: [
                  /* @__PURE__ */ m.jsx(lt, { className: "aiwa-calendar-month-title", variant: "body", weight: "semibold", children: Q.label || Q.name }),
                  /* @__PURE__ */ m.jsx("div", { className: "aiwa-calendar-grid", children: Q.days.map((et) => et.empty ? /* @__PURE__ */ m.jsx("span", { className: "aiwa-calendar-empty", "aria-hidden": "true" }, et.key) : /* @__PURE__ */ m.jsx(
                    Ib,
                    {
                      day: et,
                      interactive: p || !!(et.iso && et.iso <= nt),
                      marking: p,
                      checked: p && K(et),
                      markVariant: v === "intimacy" ? "heart" : "radio",
                      monthLabel: Q.label,
                      onSelect: (N) => I(N, Q.name || Q.label)
                    },
                    et.key
                  )) })
                ]
              },
              Q.key || Q.label
            )) }) })
          ] }),
          p && !V ? /* @__PURE__ */ m.jsx(
            JA,
            {
              options: j,
              value: v,
              onChange: b,
              hint: M.hint
            }
          ) : null,
          p ? null : /* @__PURE__ */ m.jsx(
            cx,
            {
              className: "aiwa-calendar-fab",
              align: "end",
              items: k,
              trigger: /* @__PURE__ */ m.jsx(QA, { icon: /* @__PURE__ */ m.jsx($r, {}), label: "Отметить день" })
            }
          ),
          /* @__PURE__ */ m.jsx(
            WA,
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
function tj({ panel: a, onClose: e, checkin: l, symptomGroups: s, mode: r, revision: c }) {
  return /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
    /* @__PURE__ */ m.jsx(ZA, { isOpen: a === "journal", onClose: e, checkin: l, symptomGroups: s, mode: r }),
    /* @__PURE__ */ m.jsx(IA, { isOpen: a === "calendar", onClose: e, mode: r, revision: c, symptomGroups: s })
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
  const y = s !== void 0 ? s : l ? /* @__PURE__ */ m.jsx(pt.Part, { type: "Chevron" }) : null, p = h ? /* @__PURE__ */ m.jsx("span", { className: "aiwa-cell-thumb aiwa-cell-thumb-loading", children: /* @__PURE__ */ m.jsx(Vh, { size: 22 }) }) : f ? /* @__PURE__ */ m.jsx("span", { className: "aiwa-cell-thumb", children: /* @__PURE__ */ m.jsx("img", { src: f, alt: "", loading: "lazy" }) }) : c;
  return /* @__PURE__ */ m.jsx(
    pt,
    {
      start: p,
      end: y,
      onClick: l,
      tappable: !!l,
      as: l ? "button" : "div",
      type: l ? "button" : void 0,
      "aria-label": a,
      style: r ? { opacity: 0.65 } : void 0,
      children: /* @__PURE__ */ m.jsx(pt.Text, { title: a, description: e || void 0 })
    }
  );
}
function Ji({ label: a, options: e, value: l, onChange: s }) {
  return /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-group", children: [
    a ? /* @__PURE__ */ m.jsx(lt, { className: "aiwa-form-label", variant: "body", weight: "semibold", children: a }) : null,
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-choice-pills", role: "group", "aria-label": a, children: e.map((r) => {
      const c = typeof r == "string" ? { value: r, label: r } : r;
      return /* @__PURE__ */ m.jsx(
        Ce,
        {
          as: "button",
          type: "button",
          mode: "opacity",
          className: l === c.value ? "aiwa-choice-pill is-active" : "aiwa-choice-pill",
          "aria-pressed": l === c.value,
          onClick: () => s(c.value),
          children: /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: c.label })
        },
        c.value
      );
    }) })
  ] });
}
function ej({ isOpen: a, onClose: e }) {
  const [l, s] = E.useState("main"), [r, c] = E.useState(() => ie("aiwaData") || {}), [f, h] = E.useState(null), [y, p] = E.useState("3"), [g, v] = E.useState({});
  E.useEffect(() => {
    if (!a) return;
    const j = ie("aiwaData") || {};
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
    const j = await Gt("/api/partner", {}).catch(() => null);
    h(j || {});
  }, T = async () => {
    const j = await Gt("/api/profile", {
      height: g.height,
      weight: g.weight,
      age: g.age,
      cycle_len: g.cycle_len
    }).catch(() => null), M = await Gt("/api/prefs", {
      diet_note: g.diet_note,
      kcal_goal: g.kcal_goal
    }).catch(() => null), V = await Gt("/api/settime", { time: g.send_time }).catch(() => null);
    j?.ok && M?.ok && V?.ok ? (Ot("Данные сохранены", { type: "success" }), vn("reloadAfterEdit"), s("main")) : Ot(j?.text || "Проверь рост, вес, возраст и время", { type: "error" });
  }, S = async () => {
    const j = await Gt("/api/report", { period: y }).catch(() => null);
    j?.ok ? (Ot("Выписка отправлена в чат бота", { type: "success" }), s("main")) : Ot(j?.text || "Выписка временно недоступна", { type: "error" });
  }, w = async (j) => {
    const M = g.proactive_enabled !== !1;
    v((B) => ({ ...B, proactive_enabled: j })), (await Gt("/api/proactive", { enabled: j }).catch(() => null))?.ok || (v((B) => ({ ...B, proactive_enabled: M })), Ot("Не получилось изменить настройку", { type: "error" }));
  }, A = (j) => {
    e(), vn("chooseMode", j);
  }, _ = async () => {
    if (f?.link)
      try {
        await navigator.clipboard.writeText(f.link), Ot("Ссылка скопирована", { type: "success" });
      } catch {
        Ot("Ссылка готова — выдели и скопируй");
      }
  }, D = async () => {
    (await Gt("/api/partner", { action: "unlink" }).catch(() => null))?.ok && (h({ linked: !1 }), Ot("Партнёр отключён", { type: "success" }));
  };
  return /* @__PURE__ */ m.jsx(
    bn,
    {
      isOpen: a,
      onClose: e,
      onBack: l === "main" ? e : () => s("main"),
      children: /* @__PURE__ */ m.jsx(m.Fragment, { children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-sheet-scroll", children: [
        l === "main" ? /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
          /* @__PURE__ */ m.jsxs("div", { className: "aiwa-profile-modes", children: [
            /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "semibold", children: "Режим" }),
            /* @__PURE__ */ m.jsx("div", { className: "aiwa-choice-pills", children: bA.map((j) => /* @__PURE__ */ m.jsx(
              Ce,
              {
                as: "button",
                type: "button",
                mode: "opacity",
                className: r.mode === j.value ? "aiwa-choice-pill is-active" : "aiwa-choice-pill",
                "aria-pressed": r.mode === j.value,
                onClick: () => A(j.value),
                children: /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: j.label })
              },
              j.value
            )) })
          ] }),
          /* @__PURE__ */ m.jsx(yt, { className: "aiwa-tma-blocks", children: /* @__PURE__ */ m.jsxs(yt.Item, { children: [
            /* @__PURE__ */ m.jsx(fe, { title: "Выписка для врача", description: "PDF в чат бота", onClick: () => s("report") }),
            /* @__PURE__ */ m.jsx(fe, { title: "Предпочтения по питанию", description: "ограничения и цель калорий", onClick: () => s("data") }),
            /* @__PURE__ */ m.jsx(fe, { title: "Мои данные", description: "рост · вес · возраст · цикл", onClick: () => s("data") }),
            /* @__PURE__ */ m.jsx(fe, { title: "Утренняя сводка", description: `${g.send_time || "08:00"} · МСК`, onClick: () => s("summary") }),
            /* @__PURE__ */ m.jsx(
              pt.Switch,
              {
                value: g.proactive_enabled !== !1,
                onChange: w,
                children: /* @__PURE__ */ m.jsx(
                  pt.Text,
                  {
                    title: "Проактивные сообщения",
                    description: g.proactive_enabled === !1 ? "выключены" : "не больше одного в день"
                  }
                )
              }
            ),
            /* @__PURE__ */ m.jsx(fe, { title: "Партнёр и близкие", description: "короткая бережная сводка", onClick: b })
          ] }) })
        ] }) : null,
        l === "data" ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-stack", children: [
          /* @__PURE__ */ m.jsx(lt, { variant: "title3", weight: "semibold", children: "Параметры тела" }),
          /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-grid", children: [
            /* @__PURE__ */ m.jsx(ae, { label: "Рост, см", value: g.height || "", onChange: (j) => v((M) => ({ ...M, height: j })), inputMode: "decimal" }),
            /* @__PURE__ */ m.jsx(ae, { label: "Вес, кг", value: g.weight || "", onChange: (j) => v((M) => ({ ...M, weight: j })), inputMode: "decimal" }),
            /* @__PURE__ */ m.jsx(ae, { label: "Возраст", value: g.age || "", onChange: (j) => v((M) => ({ ...M, age: j })), inputMode: "numeric" }),
            /* @__PURE__ */ m.jsx(ae, { label: "Длина цикла", value: g.cycle_len || "", onChange: (j) => v((M) => ({ ...M, cycle_len: j })), inputMode: "numeric" })
          ] }),
          /* @__PURE__ */ m.jsx(lt, { variant: "title3", weight: "semibold", children: "Питание" }),
          /* @__PURE__ */ m.jsx(
            ae,
            {
              label: "Предпочтения и ограничения",
              value: g.diet_note || "",
              onChange: (j) => v((M) => ({ ...M, diet_note: j })),
              placeholder: "Например: без свинины, аллергия на орехи",
              multiline: !0
            }
          ),
          /* @__PURE__ */ m.jsx(ae, { label: "Желаемые калории", value: g.kcal_goal || "", onChange: (j) => v((M) => ({ ...M, kcal_goal: j })), inputMode: "numeric" }),
          /* @__PURE__ */ m.jsx(Ft, { variant: "filled", label: "Сохранить", isFill: !0, ...le("Сохранить данные", T) })
        ] }) : null,
        l === "summary" ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-stack", children: [
          /* @__PURE__ */ m.jsx(lt, { variant: "title3", weight: "semibold", children: "Утренняя сводка" }),
          /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: "Каждое утро Айва присылает сводку дня в чат — выбери удобное время (МСК)." }),
          /* @__PURE__ */ m.jsx(ae, { label: "Время утренней сводки", type: "time", value: g.send_time || "08:00", onChange: (j) => v((M) => ({ ...M, send_time: j })) }),
          /* @__PURE__ */ m.jsx(Ft, { variant: "filled", label: "Сохранить", isFill: !0, ...le("Сохранить время сводки", T) })
        ] }) : null,
        l === "report" ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-stack", children: [
          /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: "Циклы, динамика и дневник симптомов придут PDF-файлом в чат бота." }),
          /* @__PURE__ */ m.jsx(
            Ji,
            {
              options: [
                { value: "3", label: "3 месяца" },
                { value: "6", label: "6 месяцев" },
                { value: "all", label: "Весь период" }
              ],
              value: y,
              onChange: p
            }
          ),
          /* @__PURE__ */ m.jsx(Ft, { variant: "filled", label: "Собрать выписку", isFill: !0, ...le("Собрать выписку", S) })
        ] }) : null,
        l === "partner" ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-stack", children: [
          /* @__PURE__ */ m.jsxs("div", { className: "aiwa-paper-card", children: [
            /* @__PURE__ */ m.jsx(lt, { variant: "title3", weight: "semibold", children: "Бережная сводка для близкого" }),
            /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: "Айва расскажет, когда особенно нужны поддержка и отдых — без интимных и медицинских деталей." })
          ] }),
          f === null ? /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: "Готовлю ссылку…" }) : null,
          f?.linked ? /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
            /* @__PURE__ */ m.jsx("div", { className: "aiwa-sheet-card", children: /* @__PURE__ */ m.jsx(fe, { title: "Партнёр подключён", description: "Получает только бережную сводку без календаря и приватных заметок." }) }),
            /* @__PURE__ */ m.jsx(Ft, { variant: "filled", label: "Отключить партнёра", isFill: !0, ...le("Отключить партнёра", D) })
          ] }) : null,
          f?.link ? /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
            /* @__PURE__ */ m.jsx(ae, { label: "Ссылка-приглашение", value: f.link, readOnly: !0, multiline: !0 }),
            /* @__PURE__ */ m.jsx(Ft, { variant: "filled", label: "Скопировать ссылку", isFill: !0, ...le("Скопировать ссылку", _) })
          ] }) : null,
          f && !f.linked && !f.link ? /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: "Ссылка доступна после запуска из Telegram. В боте можно использовать команду /partner." }) : null
        ] }) : null
      ] }) })
    }
  );
}
function nj() {
  const a = window.Telegram?.WebApp?.initDataUnsafe?.user, e = a?.photo_url;
  if (e) return /* @__PURE__ */ m.jsx(iE, { src: e, size: 36 });
  const s = ((typeof window.aiwaData == "function" ? window.aiwaData() : window.aiwaData)?.name || a?.first_name || "").trim();
  return /* @__PURE__ */ m.jsx("span", { className: "aiwa-avatar-initial", "aria-hidden": "true", children: (s[0] || "•").toUpperCase() });
}
function aj(a) {
  return /* @__PURE__ */ m.jsx(ol, { children: /* @__PURE__ */ m.jsx(sl, { mode: "secondary", children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-deslop-home", children: [
    /* @__PURE__ */ m.jsx(
      kh,
      {
        title: a.dateText,
        left: /* @__PURE__ */ m.jsx(nj, {}),
        onLeft: () => window.AiwaDeslop?.openProfile?.(),
        leftAriaLabel: "Открыть профиль",
        right: /* @__PURE__ */ m.jsx(IE, {}),
        onRight: () => vn("openHomePanel", "calendar"),
        rightAriaLabel: "Открыть календарь"
      }
    ),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-overview", children: [
      /* @__PURE__ */ m.jsx(
        Hh,
        {
          days: a.week,
          selectedIso: a.selectedIso,
          onSelect: a.onSelectDay ?? ((e) => vn("aiwaSelectDay", e.iso))
        }
      ),
      /* @__PURE__ */ m.jsxs("div", { className: "aiwa-countdown", children: [
        /* @__PURE__ */ m.jsx(lt, { variant: "title1", weight: "semibold", children: a.heroValue || `${a.countdown} дней` }),
        /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: a.countdownLabel })
      ] }),
      /* @__PURE__ */ m.jsx(
        Ft,
        {
          variant: "filled",
          label: /* @__PURE__ */ m.jsxs("span", { className: "aiwa-btn-icon-label", children: [
            /* @__PURE__ */ m.jsx($r, {}),
            " Занести в журнал"
          ] }),
          ...le("Занести в журнал", () => vn("openHomePanel", "journal"))
        }
      )
    ] }),
    /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-tma-blocks", children: [
      /* @__PURE__ */ m.jsx(SA, { title: a.dayTitle, checkin: a.dayCheckin ?? a.checkin, symptomGroups: a.symptomGroups }),
      /* @__PURE__ */ m.jsx(jA, { aiText: a.aiText }),
      /* @__PURE__ */ m.jsx(MA, { delay: a.delay }),
      /* @__PURE__ */ m.jsx(DA, { metrics: a.metrics, title: a.statsTitle }),
      a.pregnancy ? /* @__PURE__ */ m.jsx(XA, { pregnancy: a.pregnancy }) : /* @__PURE__ */ m.jsx(
        zA,
        {
          data: a.chartData,
          series: a.chartSeries,
          title: a.chartTitle,
          band: a.chartBand,
          emptyText: a.chartEmptyText
        }
      ),
      a.mode === "meno" ? null : /* @__PURE__ */ m.jsx(
        LA,
        {
          history: a.history,
          title: a.historyTitle,
          emptyTitle: a.historyEmptyTitle,
          emptyDescription: a.historyEmptyDescription
        }
      ),
      /* @__PURE__ */ m.jsx(GA, {})
    ] }),
    /* @__PURE__ */ m.jsx(
      tj,
      {
        panel: a.panel,
        onClose: a.onPanelClose,
        checkin: a.checkin,
        symptomGroups: a.symptomGroups,
        mode: a.mode,
        revision: a.panelRevision
      }
    ),
    /* @__PURE__ */ m.jsx(ej, { isOpen: a.profileOpen, onClose: a.onProfileClose })
  ] }) }) });
}
const Fg = {
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
}, Od = (a) => Array.from({ length: a }, (e, l) => l);
function ij({ kind: a }) {
  return a === "week" ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-overview", children: [
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-week", children: Od(7).map((e) => /* @__PURE__ */ m.jsx(Qi, { className: "aiwa-skeleton-day" }, e)) }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-countdown", children: [
      /* @__PURE__ */ m.jsx(ei, { active: !0, width: 2 }),
      /* @__PURE__ */ m.jsx(ei, { active: !0, width: 18 })
    ] })
  ] }) : /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
    /* @__PURE__ */ m.jsx(Qi, { className: "aiwa-skeleton-gauge" }),
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-macro-grid", children: Od(3).map((e) => /* @__PURE__ */ m.jsx(Qi, { className: "aiwa-skeleton-macro" }, e)) })
  ] });
}
function fx({ title: a, variant: e = "food" }) {
  const { hero: l, sections: s } = Fg[e] || Fg.food;
  return /* @__PURE__ */ m.jsx(ol, { children: /* @__PURE__ */ m.jsx(sl, { mode: "secondary", children: /* @__PURE__ */ m.jsxs("div", { className: `aiwa-paper-screen aiwa-screen-skeleton aiwa-${e}-screen`, children: [
    /* @__PURE__ */ m.jsx(lt, { className: "aiwa-screen-title", variant: "title1", weight: "semibold", children: a }),
    /* @__PURE__ */ m.jsxs(hb, { active: !0, children: [
      /* @__PURE__ */ m.jsx(ij, { kind: l }),
      /* @__PURE__ */ m.jsx("div", { className: "aiwa-screen-cta", children: /* @__PURE__ */ m.jsx(Qi, { className: "aiwa-skeleton-cta" }) }),
      /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-tma-blocks", children: [
        /* @__PURE__ */ m.jsx(yt.Item, { className: "aiwa-insight-section", children: /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-insight-content", children: [
          /* @__PURE__ */ m.jsx(ei, { active: !0, width: 30 }),
          /* @__PURE__ */ m.jsx(ei, { active: !0, width: 26 }),
          /* @__PURE__ */ m.jsx(Qi, { className: "aiwa-skeleton-insight-cta" })
        ] }) }) }),
        s.map((r) => /* @__PURE__ */ m.jsx(yt.Item, { header: r.header, children: Od(r.rows).map((c) => /* @__PURE__ */ m.jsx(
          pt,
          {
            tappable: !1,
            start: r.media ? /* @__PURE__ */ m.jsx(Qi, { className: "aiwa-skeleton-thumb" }) : void 0,
            children: /* @__PURE__ */ m.jsx(
              pt.Text,
              {
                title: /* @__PURE__ */ m.jsx(ei, { active: !0, width: 13 }),
                description: /* @__PURE__ */ m.jsx(ei, { active: !0, width: 22 })
              }
            )
          },
          c
        )) }, r.header))
      ] })
    ] })
  ] }) }) });
}
function Xf({ label: a, value: e, target: l, macro: s, color: r }) {
  const c = l ? Math.min(100, Math.round(Number(e || 0) / Number(l) * 100)) : 0, f = r || (s ? `var(--aiwa-macro-${s})` : "var(--aiwa-accent)");
  return /* @__PURE__ */ m.jsxs("div", { className: "aiwa-macro-card", children: [
    /* @__PURE__ */ m.jsxs(lt, { variant: "body", weight: "semibold", children: [
      Math.round(e || 0),
      l ? null : " г",
      l ? /* @__PURE__ */ m.jsxs("span", { children: [
        " / ",
        Math.round(l),
        " г"
      ] }) : null
    ] }),
    /* @__PURE__ */ m.jsx(lt, { variant: "caption1", weight: "regular", children: a }),
    /* @__PURE__ */ m.jsx("span", { className: "aiwa-macro-track", style: { "--macro-color": f }, children: /* @__PURE__ */ m.jsx("span", { style: { width: `${c}%` } }) })
  ] });
}
const Jg = "M 11 169 A 158 158 0 0 1 327 169", Wg = Math.PI * 158, lj = 500, sj = (a) => 1 - (1 - a) ** 3;
function oj(a) {
  const [e, l] = E.useState(0), s = E.useRef(0), r = E.useRef(0);
  return E.useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      s.current = a, l(a);
      return;
    }
    const f = s.current, h = performance.now(), y = (p) => {
      const g = Math.min(1, (p - h) / lj), v = f + (a - f) * sj(g);
      s.current = v, l(v), g < 1 && (r.current = requestAnimationFrame(y));
    };
    return r.current = requestAnimationFrame(y), () => cancelAnimationFrame(r.current);
  }, [a]), e;
}
function rj({ kcal: a, kcalTarget: e }) {
  const l = Number(a || 0), s = Number(e || 0), r = oj(Math.min(1, l / Math.max(1, s))), c = r * Math.PI, f = 169 - 158 * Math.cos(c), h = 169 - 158 * Math.sin(c);
  return /* @__PURE__ */ m.jsxs("div", { className: "aiwa-food-gauge", children: [
    /* @__PURE__ */ m.jsxs("svg", { className: "aiwa-food-gauge-arc", viewBox: "0 0 338 180", width: "338", height: "180", fill: "none", children: [
      /* @__PURE__ */ m.jsx("path", { className: "aiwa-food-gauge-track", d: Jg }),
      /* @__PURE__ */ m.jsx(
        "path",
        {
          className: "aiwa-food-gauge-progress",
          d: Jg,
          strokeDasharray: Wg,
          strokeDashoffset: Wg * (1 - r)
        }
      ),
      /* @__PURE__ */ m.jsx("circle", { className: "aiwa-food-gauge-knob", cx: f, cy: h, r: "11" })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-food-gauge-center", children: [
      /* @__PURE__ */ m.jsx(lt, { variant: "title1", weight: "semibold", children: Rd(l) }),
      /* @__PURE__ */ m.jsxs(lt, { variant: "body", weight: "regular", children: [
        "из ",
        Rd(s)
      ] })
    ] })
  ] });
}
function Ig({ meal: a, onSaved: e, onClose: l }) {
  const [s, r] = E.useState(() => yA(a)), [c, f] = E.useState(!1), h = (p, g) => r((v) => ({ ...v, [p]: g })), y = async () => {
    if (!s.title.trim() && !String(s.kcal).trim()) {
      Ot("Укажи название или калории", { type: "error" });
      return;
    }
    f(!0);
    try {
      const p = await Gt(a ? "/api/diary_edit" : "/api/food_manual", {
        ...a ? { id: a.id } : {},
        ...s
      });
      if (p?.ok === !1 || p?.error) throw new Error(p.message || "Не получилось сохранить");
      Ot(a ? "Приём обновлён" : "Приём добавлен", { type: "success" }), await e(), l();
    } catch (p) {
      Ot(p.message || "Не получилось сохранить", { type: "error" });
    } finally {
      f(!1);
    }
  };
  return /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-stack", children: [
    /* @__PURE__ */ m.jsx(ae, { label: "Название", value: s.title, onChange: (p) => h("title", p), placeholder: "Например, творог и банан" }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-grid", children: [
      /* @__PURE__ */ m.jsx(ae, { label: "Ккал", value: s.kcal, onChange: (p) => h("kcal", p), inputMode: "decimal" }),
      /* @__PURE__ */ m.jsx(ae, { label: "Граммы", value: s.grams, onChange: (p) => h("grams", p), inputMode: "decimal" }),
      /* @__PURE__ */ m.jsx(ae, { label: "Белки", value: s.protein, onChange: (p) => h("protein", p), inputMode: "decimal" }),
      /* @__PURE__ */ m.jsx(ae, { label: "Жиры", value: s.fat, onChange: (p) => h("fat", p), inputMode: "decimal" }),
      /* @__PURE__ */ m.jsx(ae, { label: "Углеводы", value: s.carbs, onChange: (p) => h("carbs", p), inputMode: "decimal" })
    ] }),
    /* @__PURE__ */ m.jsx(Ji, { label: "Приём пищи", options: ax, value: s.slot, onChange: (p) => h("slot", p) }),
    /* @__PURE__ */ m.jsx(
      Ft,
      {
        variant: "filled",
        label: c ? "Сохраняю…" : a ? "Сохранить изменения" : "Сохранить приём",
        isFill: !0,
        disabled: c,
        ...le("Сохранить приём", y)
      }
    )
  ] });
}
function uj({ isOpen: a, onClose: e, onSaved: l, editingMeal: s = null }) {
  const [r, c] = E.useState("text"), [f, h] = E.useState(""), [y, p] = E.useState(!1);
  E.useEffect(() => {
    a && (Wb("food"), c(s ? "manual" : "text"), h(""));
  }, [s, a]);
  const g = async () => {
    if (f.trim()) {
      p(!0);
      try {
        const b = await Gt("/api/food_text", { text: f.trim() });
        if (!b?.ok) throw new Error(b?.message || "Не получилось разобрать приём");
        Ot(`Добавлено · ${b.rec?.kcal || 0} ккал`, { type: "success" }), await l(), e();
      } catch (b) {
        Ot(b.message || "Не получилось добавить", { type: "error" });
      } finally {
        p(!1);
      }
    }
  }, v = async (b) => {
    if (b) {
      p(!0);
      try {
        const T = window.aiwaUploadFoodPhoto;
        if (typeof T != "function") throw new Error("Загрузка фото недоступна");
        await T(b), await l(), e();
      } catch (T) {
        Ot(T.message || "Не получилось разобрать фото", { type: "error" });
      } finally {
        p(!1);
      }
    }
  };
  return /* @__PURE__ */ m.jsx(bn, { isOpen: a, onClose: e, children: /* @__PURE__ */ m.jsx("div", { children: /* @__PURE__ */ m.jsx("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: s ? /* @__PURE__ */ m.jsx(Ig, { meal: s, onSaved: l, onClose: e }) : /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
    /* @__PURE__ */ m.jsx(
      Ji,
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
    r === "photo" ? /* @__PURE__ */ m.jsxs("label", { className: `aiwa-upload-zone${y ? " is-busy" : ""}`, children: [
      y ? /* @__PURE__ */ m.jsx(Vh, { size: 28 }) : null,
      /* @__PURE__ */ m.jsx(lt, { variant: "title3", weight: "semibold", children: y ? "Разбираю фото…" : "Сфотографировать еду" }),
      /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: y ? "Айва считает КБЖУ, это займёт несколько секунд." : "Айва распознает блюдо и посчитает КБЖУ." }),
      /* @__PURE__ */ m.jsx("input", { type: "file", accept: "image/*", capture: "environment", disabled: y, onChange: (b) => v(b.target.files?.[0]) })
    ] }) : null,
    r === "text" ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-stack", children: [
      /* @__PURE__ */ m.jsx(
        ae,
        {
          label: "Что съела?",
          value: f,
          onChange: h,
          placeholder: "Например: 200 г творога и банан",
          multiline: !0
        }
      ),
      /* @__PURE__ */ m.jsx(
        Ft,
        {
          variant: "filled",
          label: y ? "Считаю…" : "Добавить приём",
          isFill: !0,
          disabled: y || !f.trim(),
          ...le("Добавить приём", g)
        }
      )
    ] }) : null,
    r === "manual" ? /* @__PURE__ */ m.jsx(Ig, { meal: null, onSaved: l, onClose: e }) : null
  ] }) }) }) });
}
function cj({ isOpen: a, onClose: e, diary: l, onAdd: s, onEdit: r, onDelete: c, onReco: f }) {
  const h = l?.meals || [], y = l?.totals || {}, p = l?.target || {};
  return /* @__PURE__ */ m.jsx(bn, { isOpen: a, onClose: e, children: /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-tma-blocks", children: [
    /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsx(
      pt.Text,
      {
        title: `${Math.round(y.kcal || 0)} ккал`,
        description: `из ${Math.round(p.kcal || 0) || "—"} ккал`,
        bold: !0
      }
    ) }) }),
    ax.map((g) => {
      const v = h.filter((b) => (b.slot || "snack") === g.value);
      return /* @__PURE__ */ m.jsx(yt.Item, { header: g.label, children: v.length ? v.map((b) => /* @__PURE__ */ m.jsx(
        fe,
        {
          title: b.title,
          description: `${Math.round(b.kcal || 0)} ккал`,
          onClick: () => r(b),
          trailing: /* @__PURE__ */ m.jsx(
            Ce,
            {
              as: "button",
              type: "button",
              mode: "opacity",
              "aria-label": `Удалить ${b.title}`,
              onClick: (T) => {
                T.stopPropagation(), c(b.id);
              },
              children: /* @__PURE__ */ m.jsx(Qb, {})
            }
          )
        },
        b.id
      )) : /* @__PURE__ */ m.jsx(pt, { as: "button", type: "button", onClick: s, end: /* @__PURE__ */ m.jsx(pt.Part, { type: "Chevron" }), children: /* @__PURE__ */ m.jsx(pt.Text, { type: "Accent", title: "Добавить" }) }) }, g.value);
    }),
    /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-cell-actions", children: [
      /* @__PURE__ */ m.jsx(Ft, { variant: "filled", label: "Добавить приём", isFill: !0, ...le("Добавить приём", s) }),
      /* @__PURE__ */ m.jsx(Ft, { variant: "filled", label: "Совет по дневнику", isFill: !0, ...le("Совет по дневнику", f) })
    ] }) }) })
  ] }) });
}
function fj({ isOpen: a, meal: e, slotLabel: l = "", onClose: s, onAdd: r, busy: c = !1 }) {
  const [f, h] = E.useState(null), [y, p] = E.useState(!1), g = e?.dish || "";
  E.useEffect(() => {
    if (!a || !g) return;
    h(null), p(!1);
    let S = !0;
    return Gt("/api/recipe", { dish: g }).then((w) => {
      S && (w?.steps?.length ? h(w) : p(!0));
    }).catch(() => S && p(!0)), () => {
      S = !1;
    };
  }, [a, g]);
  const v = f?.macros || {}, b = [v.protein && `Б ${v.protein}`, v.fat && `Ж ${v.fat}`, v.carbs && `У ${v.carbs}`].filter(Boolean).join(" · "), T = [l, e?.kcal, f?.time].filter(Boolean).join(" · ");
  return /* @__PURE__ */ m.jsx(bn, { isOpen: a, onClose: s, children: /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-tma-blocks", children: [
    /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsx(pt.Text, { title: g, description: T || e?.note || "", bold: !0 }) }) }),
    !f && !y ? /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-cell-actions", "aria-label": "Готовлю рецепт", children: [
      /* @__PURE__ */ m.jsx(Vh, { size: "m" }),
      /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: "Айва пишет рецепт…" })
    ] }) }) }) : null,
    y ? /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsx(pt.Text, { title: "Рецепт не собрался", description: "Попробуй открыть блюдо ещё раз." }) }) }) : null,
    f ? /* @__PURE__ */ m.jsx(yt.Item, { header: "Питательность", children: /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsx(
      pt.Text,
      {
        title: [f.kcal, b].filter(Boolean).join(" · ") || "—",
        description: (f.micros || []).join("; ")
      }
    ) }) }) : null,
    f?.ingredients?.length ? /* @__PURE__ */ m.jsx(yt.Item, { header: "Ингредиенты", children: f.ingredients.map((S) => /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsx(pt.Text, { title: S }) }, S)) }) : null,
    f?.steps?.length ? /* @__PURE__ */ m.jsx(yt.Item, { header: "Приготовление", children: f.steps.map((S, w) => /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsx(pt.Text, { title: `${w + 1}. ${S}` }) }, S)) }) : null,
    /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ m.jsx(
      Ft,
      {
        variant: "filled",
        label: c ? "Добавляю…" : "Добавить в дневник",
        isFill: !0,
        disabled: c,
        ...le("Добавить в дневник", r)
      }
    ) }) }) })
  ] }) });
}
const dx = {
  foodSection: () => Gt("/api/section", { kind: "food" }),
  diary: () => Gt("/api/diary", {}),
  trainingSection: () => Gt("/api/section", { kind: "training" }),
  train: () => Gt("/api/train", {})
}, Ki = /* @__PURE__ */ new Map(), ar = /* @__PURE__ */ new Map(), ir = (a) => Object.fromEntries(a.map((e) => [e, Ki.get(e) ?? null])), zd = (a, { force: e = !1 } = {}) => {
  if (!e) {
    if (Ki.has(a)) return Promise.resolve(Ki.get(a));
    const s = ar.get(a);
    if (s) return s;
  }
  const l = dx[a]().catch(() => null).then((s) => (s && Ki.set(a, s), ar.get(a) === l && ar.delete(a), Ki.get(a) ?? null));
  return ar.set(a, l), l;
}, dj = () => {
  Object.keys(dx).forEach((a) => {
    zd(a);
  });
};
function hx(a, e) {
  const [l, s] = E.useState(() => ir(a)), r = E.useRef(!1), c = E.useCallback(async (...h) => {
    const y = h.length ? h : a;
    await Promise.all(y.map((p) => zd(p, { force: !0 }))), s(ir(a));
  }, [a]), f = E.useCallback((h, y) => {
    Ki.set(h, y), s(ir(a));
  }, [a]);
  return E.useEffect(() => {
    let h = !0;
    const y = r.current;
    return r.current = !0, Promise.all(a.map((p) => zd(p, { force: y }))).then(() => {
      h && s(ir(a));
    }), () => {
      h = !1;
    };
  }, e), [l, c, f];
}
const hj = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"], mx = (a = 30) => {
  const e = [];
  for (let l = a - 1; l >= 0; l -= 1) {
    const s = /* @__PURE__ */ new Date();
    s.setDate(s.getDate() - l);
    const r = `${s.getFullYear()}-${String(s.getMonth() + 1).padStart(2, "0")}-${String(s.getDate()).padStart(2, "0")}`;
    e.push({ iso: r, date: String(s.getDate()), label: hj[s.getDay()], today: l === 0 });
  }
  return e;
}, mj = ["foodSection", "diary"], pj = "/assets/paper-food-placeholder.png", tv = (a) => String(a || "").toLowerCase().replace(/ё/g, "е"), ev = "?v=2", nv = (a, e) => {
  const l = tv(e).trim();
  if (!a || !l) return null;
  const s = a[String(e || "").trim()];
  if (s) return s + ev;
  let r = null, c = 0;
  for (const [f, h] of Object.entries(a)) {
    const y = tv(f);
    if (y === l) return h;
    const p = y.split(/[^а-яa-z0-9]+/).filter((v) => v.length > 3);
    let g = 0;
    for (const v of p) l.includes(v.slice(0, 4)) && (g += v.length > 5 ? 2 : 1);
    g > c && (c = g, r = h);
  }
  return c >= 2 ? r + ev : null;
}, yj = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" });
function av({ mode: a, revision: e = 0 }) {
  const [l, s, r] = hx(mj, [a, e]), [c, f] = E.useState({}), [h, y] = E.useState(""), [p, g] = E.useState(null), [v, b] = E.useState(null), [T, S] = E.useState(!1), [w, A] = E.useState(null), [_, D] = E.useState(!1), [j, M] = E.useState(""), [V, B] = E.useState(null), [R, k] = E.useState(!1), P = E.useRef(null), K = !!l.foodSection && !(l.foodSection.menu?.meals || []).length, at = E.useRef(0);
  E.useEffect(() => {
    if (!K) {
      at.current = 0;
      return;
    }
    if (at.current >= 5) return;
    const dt = [1500, 3e3, 5e3, 9e3, 15e3][at.current], te = setTimeout(() => {
      at.current += 1, s("foodSection");
    }, dt);
    return () => clearTimeout(te);
  }, [K, l.foodSection]), E.useEffect(() => {
    fetch("/assets/food/manifest.json?v=2").then((dt) => dt.ok ? dt.json() : {}).then((dt) => f(dt || {})).catch(() => {
    });
  }, []);
  const nt = () => s("diary");
  if (!l.foodSection || !l.diary) return /* @__PURE__ */ m.jsx(fx, { title: "Питание", variant: "food" });
  const I = l.foodSection, Q = l.diary, et = Q.totals || {}, N = Q.target || {}, Y = I.menu?.meals || [], it = [
    { index: 0, value: "breakfast", label: "Завтрак" },
    { index: 1, value: "lunch", label: "Обед" },
    { index: Y.length >= 4 ? 3 : 2, value: "dinner", label: "Ужин" }
  ].map((dt) => ({ ...dt, meal: Y[dt.index] })).filter((dt) => dt.meal), ot = Number(N.kcal || I.kcal || 0), O = Number(et.kcal || 0), $ = (dt) => Number(et[dt] || 0), tt = mx(30), st = tt[tt.length - 1].iso, rt = !!(h && h !== st), ht = rt ? p?.meals || [] : (Q.meals || []).slice().reverse();
  let vt = "Прошедшие приёмы";
  if (rt) {
    const dt = /* @__PURE__ */ new Date(`${h}T12:00:00`);
    vt = Number.isNaN(dt.getTime()) ? "Приёмы за день" : `Приёмы за ${yj.format(dt)}`;
  }
  const Dt = async () => {
    if (!_) {
      D(!0);
      try {
        const dt = await Gt("/api/week_food_review", {}).catch(() => null);
        A(dt?.text || "Не получилось собрать разбор, попробуй чуть позже.");
      } finally {
        D(!1);
      }
    }
  }, Mt = async (dt) => {
    const te = typeof dt == "string" ? dt : dt?.iso || "";
    if (y(te), !te || te === st) {
      g(null);
      return;
    }
    g(null);
    const ja = await Gt("/api/diary", { d: te }).catch(() => null);
    g(ja || { meals: [] });
  }, Pt = async (dt, te) => {
    if (!T) {
      S(!0);
      try {
        const ja = await Gt("/api/food_text", { text: dt.dish || dt.title, slot: te }).catch(() => null);
        ja?.ok ? (Ot("Добавлено в дневник", { type: "success" }), b(null), await nt()) : Ot(ja?.message || "Не получилось добавить", { type: "error" });
      } finally {
        S(!1);
      }
    }
  }, Kt = async (dt) => {
    const te = await Gt("/api/diary_del", { id: dt }).catch(() => null);
    te && !te.error && (r("diary", { meals: te.meals || [], totals: te.totals || {}, target: te.target || N }), Ot("Приём удалён", { type: "success" }));
  }, Ee = () => {
    B(null), M("add");
  }, Ea = async (dt) => {
    if (!(!dt || R)) {
      k(!0);
      try {
        const te = window.aiwaUploadFoodPhoto;
        if (typeof te != "function") throw new Error("Загрузка фото недоступна");
        await te(dt), await nt();
      } catch (te) {
        Ot(te.message || "Не получилось разобрать фото", { type: "error" });
      } finally {
        k(!1);
      }
    }
  }, rn = async () => {
    await Gt("/api/food_prompt", {}).catch(() => null), el({ nudge: !1 });
  }, Aa = [
    { label: "Фото", icon: /* @__PURE__ */ m.jsx(aA, {}), onSelect: () => P.current?.click() },
    { label: "Текстом", icon: /* @__PURE__ */ m.jsx(iA, {}), onSelect: rn }
  ];
  return /* @__PURE__ */ m.jsx(ol, { children: /* @__PURE__ */ m.jsx(sl, { mode: "secondary", children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-paper-screen aiwa-food-screen", children: [
    /* @__PURE__ */ m.jsx(lt, { className: "aiwa-screen-title", variant: "title1", weight: "semibold", children: "Питание" }),
    /* @__PURE__ */ m.jsx(rj, { kcal: O, kcalTarget: ot }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-macro-grid", children: [
      /* @__PURE__ */ m.jsx(Xf, { label: "Жиры", value: $("fat"), target: N.fat, macro: "fat" }),
      /* @__PURE__ */ m.jsx(Xf, { label: "Белки", value: $("protein"), target: N.protein, macro: "protein" }),
      /* @__PURE__ */ m.jsx(Xf, { label: "Углеводы", value: $("carbs"), target: N.carbs, macro: "carbs" })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-screen-cta", children: [
      /* @__PURE__ */ m.jsx(
        cx,
        {
          items: Aa,
          trigger: /* @__PURE__ */ m.jsx(
            Ft,
            {
              variant: "filled",
              "aria-label": "Добавить приём",
              label: /* @__PURE__ */ m.jsxs("span", { className: "aiwa-btn-icon-label", children: [
                /* @__PURE__ */ m.jsx($r, {}),
                " Добавить приём"
              ] })
            }
          )
        }
      ),
      /* @__PURE__ */ m.jsx(
        "input",
        {
          ref: P,
          type: "file",
          accept: "image/*",
          hidden: !0,
          onChange: (dt) => {
            Ea(dt.target.files?.[0]), dt.target.value = "";
          }
        }
      )
    ] }),
    /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-tma-blocks", children: [
      /* @__PURE__ */ m.jsx(
        Ss,
        {
          message: I.text || "Выбираем простую еду с белком в каждом приёме.",
          onDiscuss: () => el({ topic: "food" })
        }
      ),
      K ? /* @__PURE__ */ m.jsx(yt.Item, { header: "Меню на сегодня", children: /* @__PURE__ */ m.jsx(fe, { loading: !0, title: "Айва собирает меню…", description: "Завтрак, обед и ужин под фазу" }) }) : null,
      it.length ? /* @__PURE__ */ m.jsx(yt.Item, { header: "Меню на сегодня", children: it.map((dt) => /* @__PURE__ */ m.jsx(
        fe,
        {
          image: dt.meal.image || nv(c, dt.meal.dish) || pj,
          title: dt.meal.dish || "Рекомендация Айвы",
          description: [dt.label, dt.meal.kcal, dt.meal.note].filter(Boolean).join(" · "),
          onClick: () => b(dt)
        },
        dt.value
      )) }) : null,
      /* @__PURE__ */ m.jsxs(yt.Item, { header: vt, children: [
        /* @__PURE__ */ m.jsx("div", { className: "aiwa-food-history-week", children: /* @__PURE__ */ m.jsx(Hh, { days: tt, selectedIso: h || st, onSelect: Mt }) }),
        R ? /* @__PURE__ */ m.jsx(fe, { loading: !0, title: "Разбираю фото…", description: "Айва считает КБЖУ" }) : null,
        rt && !p ? /* @__PURE__ */ m.jsx(fe, { loading: !0, title: "Загружаю…", description: "Дневник за выбранный день" }) : null,
        ht.length ? ht.map((dt) => /* @__PURE__ */ m.jsx(
          fe,
          {
            image: nv(c, dt.title) || pA,
            title: dt.title,
            description: `${Rd(dt.kcal)} · Б${Math.round(dt.protein || 0)} · Ж${Math.round(dt.fat || 0)} · У${Math.round(dt.carbs || 0)}`,
            onClick: rt ? void 0 : () => M("diary")
          },
          dt.id
        )) : R || rt && !p ? null : /* @__PURE__ */ m.jsx(
          fe,
          {
            title: rt ? "В этот день записей нет" : "Дневник пока пуст",
            description: rt ? "Дневник за этот день пуст." : "Добавь первый приём — фото, текстом или вручную.",
            onClick: rt ? void 0 : () => M("diary")
          }
        ),
        w ? /* @__PURE__ */ m.jsx(Ss, { message: w }) : null,
        /* @__PURE__ */ m.jsx("div", { className: "aiwa-cell-actions aiwa-week-review-cta", children: /* @__PURE__ */ m.jsx(
          Ft,
          {
            variant: "filled",
            label: _ ? "Разбираю неделю…" : "Разобрать питание за неделю",
            isFill: !0,
            disabled: _,
            ...le("Разобрать питание за неделю", Dt)
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ m.jsx(
      uj,
      {
        isOpen: j === "add",
        onClose: () => M(""),
        onSaved: nt,
        editingMeal: V
      }
    ),
    /* @__PURE__ */ m.jsx(
      fj,
      {
        isOpen: !!v,
        meal: v?.meal,
        slotLabel: v?.label,
        busy: T,
        onClose: () => b(null),
        onAdd: () => v && Pt(v.meal, v.value)
      }
    ),
    /* @__PURE__ */ m.jsx(
      cj,
      {
        isOpen: j === "diary",
        onClose: () => M(""),
        diary: Q,
        onAdd: Ee,
        onEdit: (dt) => {
          B(dt), M("add");
        },
        onDelete: Kt,
        onReco: async () => {
          const dt = await Gt("/api/diary_reco", {}).catch(() => null);
          Ot(dt?.text || "Не удалось собрать совет");
        }
      }
    )
  ] }) }) });
}
function gj({ isOpen: a, onClose: e, onSaved: l, suggested: s }) {
  const r = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), [c, f] = E.useState(r), [h, y] = E.useState("Силовая"), [p, g] = E.useState("45 мин"), [v, b] = E.useState("Нормально"), [T, S] = E.useState([]), [w, A] = E.useState({}), [_, D] = E.useState(""), [j, M] = E.useState(!1), [V, B] = E.useState(""), [R, k] = E.useState(null);
  E.useEffect(() => {
    if (!a) return;
    Wb("workout");
    const N = s?.name || "", Y = (s?.exercises || []).filter((ot) => ot?.name), J = /ход|прогул/i.test(N) ? "Ходьба" : /йог|мобил|релиз|растяж/i.test(N) ? "Йога" : /кардио|бег|вело/i.test(N) ? "Кардио" : /плав/i.test(N) ? "Плавание" : "Силовая";
    y(J), Y.length ? (S(Y.map((ot) => ot.name)), A(Object.fromEntries(Y.map((ot) => [ot.name, { sets: ot.sets || "", reps: ot.reps || "" }])))) : (S(N ? [N] : []), A({})), D("");
    const it = (s?.exercises || []).find((ot) => ot?.name)?.name;
    B(it && Object.keys(Za).find((ot) => Za[ot].includes(it)) || ""), k(null), f(r);
  }, [a, s, r]);
  const P = (N) => S((Y) => Y.includes(N) ? Y.filter((J) => J !== N) : [...Y, N]), K = h === "Силовая", at = (N) => Object.keys(Za).find((Y) => Za[Y].includes(N)) || null, nt = (N, Y, J) => A((it) => ({ ...it, [N]: { ...it[N], [Y]: J } })), I = (N, Y) => {
    const J = String(w[N]?.[Y] ?? "").replace(",", ".").trim(), it = Number(J);
    return J && Number.isFinite(it) && it > 0 ? it : null;
  }, Q = async () => {
    const N = [...T, ..._.trim() ? [_.trim()] : []];
    M(!0);
    try {
      const Y = await Gt("/api/workout", {
        date: c,
        type: h,
        duration: p,
        rpe: v,
        items: N.map((J) => ({
          name: J,
          weight: K ? I(J, "w") : null,
          sets: K ? I(J, "sets") : null,
          reps: K ? I(J, "reps") : null,
          group: K ? at(J) : null
        }))
      });
      if (!Y?.ok) throw new Error(Y?.text || "Не получилось сохранить тренировку");
      await l(), k({ text: Y.review || "", calories: Y.calories || 0 });
    } catch (Y) {
      Ot(Y.message || "Не получилось сохранить", { type: "error" });
    } finally {
      M(!1);
    }
  }, et = (N) => /* @__PURE__ */ m.jsxs("div", { children: [
    /* @__PURE__ */ m.jsxs(
      Ce,
      {
        as: "button",
        type: "button",
        mode: "opacity",
        className: "aiwa-exercise-row",
        "aria-pressed": T.includes(N),
        onClick: () => P(N),
        children: [
          /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: N }),
          /* @__PURE__ */ m.jsx("span", { className: T.includes(N) ? "aiwa-check is-active" : "aiwa-check", children: T.includes(N) ? "✓" : "+" })
        ]
      }
    ),
    K && T.includes(N) ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-exercise-nums", children: [
      /* @__PURE__ */ m.jsx(
        "input",
        {
          inputMode: "decimal",
          placeholder: "кг",
          "aria-label": `${N}: вес`,
          value: w[N]?.w ?? "",
          onChange: (Y) => nt(N, "w", Y.target.value)
        }
      ),
      /* @__PURE__ */ m.jsx(
        "input",
        {
          inputMode: "numeric",
          placeholder: "подходы",
          "aria-label": `${N}: подходы`,
          value: w[N]?.sets ?? "",
          onChange: (Y) => nt(N, "sets", Y.target.value)
        }
      ),
      /* @__PURE__ */ m.jsx(
        "input",
        {
          inputMode: "numeric",
          placeholder: "повторы",
          "aria-label": `${N}: повторы`,
          value: w[N]?.reps ?? "",
          onChange: (Y) => nt(N, "reps", Y.target.value)
        }
      )
    ] }) : null
  ] }, N);
  return R ? /* @__PURE__ */ m.jsx(bn, { isOpen: a, onClose: e, children: /* @__PURE__ */ m.jsx("div", { children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-sheet-card aiwa-workout-review", children: [
      /* @__PURE__ */ m.jsx(lt, { variant: "title2", weight: "semibold", children: "Тренировка сохранена" }),
      /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: `Сожжено примерно ${R.calories} ккал.` }),
      R.text ? /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: R.text }) : null
    ] }),
    /* @__PURE__ */ m.jsx(Ft, { variant: "filled", label: "Понятно", isFill: !0, ...le("Закрыть разбор", e) })
  ] }) }) }) : /* @__PURE__ */ m.jsx(bn, { isOpen: a, onClose: e, children: /* @__PURE__ */ m.jsx("div", { children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ m.jsx(ae, { label: "Когда", type: "date", value: c, onChange: f }),
    /* @__PURE__ */ m.jsx(Ji, { label: "Что делала", options: gA, value: h, onChange: (N) => {
      y(N), S([]);
    } }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-group", children: [
      /* @__PURE__ */ m.jsx(lt, { className: "aiwa-form-label", variant: "body", weight: "semibold", children: "Упражнения" }),
      /* @__PURE__ */ m.jsxs("div", { className: "aiwa-sheet-card", children: [
        K ? Object.keys(Za).map((N) => {
          const Y = Za[N].filter((it) => T.includes(it)).length, J = V === N;
          return /* @__PURE__ */ m.jsxs("div", { children: [
            /* @__PURE__ */ m.jsxs(
              Ce,
              {
                as: "button",
                type: "button",
                mode: "opacity",
                className: "aiwa-exercise-row aiwa-exercise-group",
                "aria-expanded": J,
                onClick: () => B(J ? "" : N),
                children: [
                  /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "semibold", children: N }),
                  /* @__PURE__ */ m.jsx(lt, { variant: "caption1", weight: "regular", children: Y ? `выбрано ${Y}` : J ? "—" : "+" })
                ]
              }
            ),
            J ? Za[N].map(et) : null
          ] }, N);
        }) : (vA[h] || []).map(et),
        /* @__PURE__ */ m.jsx(ae, { label: "Добавить своё", value: _, onChange: D, placeholder: "Название упражнения" })
      ] })
    ] }),
    /* @__PURE__ */ m.jsx(Ji, { label: "Длительность", options: ["30 мин", "45 мин", "60+ мин"], value: p, onChange: g }),
    /* @__PURE__ */ m.jsx(Ji, { label: "Как ощущалось", options: ["Легко", "Нормально", "Тяжело"], value: v, onChange: b }),
    /* @__PURE__ */ m.jsx(
      Ft,
      {
        variant: "filled",
        label: j ? "Сохраняю…" : "Сохранить и разобрать",
        isFill: !0,
        disabled: j,
        ...le("Сохранить и разобрать", Q)
      }
    )
  ] }) }) });
}
function vj({ isOpen: a, onClose: e, options: l, onSelect: s }) {
  return /* @__PURE__ */ m.jsx(bn, { isOpen: a, onClose: e, children: /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-tma-blocks", children: [
    /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsx(
      pt.Text,
      {
        title: "Рекомендация на сегодня",
        description: "Выбери вариант, после которого останется запас сил."
      }
    ) }) }),
    /* @__PURE__ */ m.jsx(yt.Item, { children: l.map((r, c) => /* @__PURE__ */ m.jsx(
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
function bj({ isOpen: a, onClose: e, state: l, onAdd: s }) {
  const r = l?.today || [];
  return /* @__PURE__ */ m.jsx(bn, { isOpen: a, onClose: e, children: /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-tma-blocks", children: [
    l?.last_review ? /* @__PURE__ */ m.jsx(
      Ss,
      {
        message: l.last_review.text || l.last_review,
        onDiscuss: () => el({ topic: "train" })
      }
    ) : null,
    /* @__PURE__ */ m.jsx(yt.Item, { header: "Неделя", children: (l?.week || []).map((c) => /* @__PURE__ */ m.jsx(
      fe,
      {
        title: c.dow,
        description: c.count ? `${c.type || "Тренировка"} · ${c.count}` : "Без тренировки",
        muted: !c.count
      },
      c.d
    )) }),
    r.length ? /* @__PURE__ */ m.jsx(yt.Item, { header: "Сегодня", children: r.map((c) => /* @__PURE__ */ m.jsx(
      fe,
      {
        title: c.type || "Тренировка",
        description: `${c.duration || "—"} · ${String(c.rpe || "").toLowerCase()}`
      },
      c.id
    )) }) : null,
    /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ m.jsx(
      Ft,
      {
        variant: "filled",
        label: "Отметить тренировку",
        isFill: !0,
        ...le("Отметить тренировку", s)
      }
    ) }) }) })
  ] }) });
}
function xj({ isOpen: a, onClose: e, profile: l, onSaved: s }) {
  const [r, c] = E.useState(l || {});
  E.useEffect(() => {
    a && c(l || {});
  }, [a, l]);
  const f = (y, p) => c((g) => ({ ...g, [y]: p })), h = async () => {
    (await Gt("/api/train_profile", r).catch(() => null))?.ok ? (Ot("Тренировочный профиль сохранён", { type: "success" }), await s(), e()) : Ot("Не получилось сохранить", { type: "error" });
  };
  return /* @__PURE__ */ m.jsx(bn, { isOpen: a, onClose: e, children: /* @__PURE__ */ m.jsx("div", { children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: "Расскажи, чем занимаешься и что важно беречь. Айва учтёт это в рекомендациях и разборе нагрузки." }),
    /* @__PURE__ */ m.jsx(ae, { label: "Формат", value: r.format || "", onChange: (y) => f("format", y), placeholder: "Зал и прогулки" }),
    /* @__PURE__ */ m.jsx(ae, { label: "Цель", value: r.goal || "", onChange: (y) => f("goal", y), placeholder: "Тонус и больше энергии" }),
    /* @__PURE__ */ m.jsx(ae, { label: "Ограничения", value: r.limits || "", onChange: (y) => f("limits", y), placeholder: "Например, бережём поясницу" }),
    /* @__PURE__ */ m.jsx(Ft, { variant: "filled", label: "Сохранить", isFill: !0, ...le("Сохранить профиль", h) })
  ] }) }) });
}
const Sj = ["trainingSection", "train"], wj = (a) => {
  const e = a % 100, l = a % 10;
  return e >= 11 && e <= 14 ? "тренировок" : l === 1 ? "тренировка" : l >= 2 && l <= 4 ? "тренировки" : "тренировок";
}, Tj = (a) => {
  const e = new Set((a || []).filter((l) => l.count).map((l) => l.d));
  return mx(30).map((l) => ({ ...l, workout: e.has(l.iso) }));
}, iv = (a, ...e) => {
  for (const s of e) {
    const r = a?.[String(s || "").trim()];
    if (r) return r + "?v=1";
  }
  const l = e.filter(Boolean).join(" ").toLowerCase();
  for (const [s, r] of Object.entries(a || {}))
    if (l.includes(s.toLowerCase())) return r + "?v=1";
  return null;
};
function Cj({ mode: a, revision: e = 0 }) {
  const [l, s] = hx(Sj, [a, e]), [r, c] = E.useState(""), [f, h] = E.useState(null), [y, p] = E.useState({});
  E.useEffect(() => {
    fetch("/assets/train/manifest.json?v=1").then((M) => M.ok ? M.json() : {}).then((M) => p(M || {})).catch(() => {
    });
  }, []);
  const g = () => s("train");
  if (!l.trainingSection || !l.train) return /* @__PURE__ */ m.jsx(fx, { title: "Нагрузка", variant: "activity" });
  const v = l.trainingSection, b = l.train, T = v.training || {}, S = (T.options || []).slice(0, 4), w = b.today || [], A = b.week || [], _ = A.filter((M) => M.count).slice(-3).reverse(), D = A.reduce((M, V) => M + (V.count || 0), 0), j = (M = null) => {
    h(M), c("workout");
  };
  return /* @__PURE__ */ m.jsx(ol, { children: /* @__PURE__ */ m.jsx(sl, { mode: "secondary", children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-paper-screen aiwa-activity-screen", children: [
    /* @__PURE__ */ m.jsx(lt, { className: "aiwa-screen-title", variant: "title1", weight: "semibold", children: "Нагрузка" }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-overview", children: [
      /* @__PURE__ */ m.jsx(Hh, { days: Tj(A) }),
      /* @__PURE__ */ m.jsxs("div", { className: "aiwa-countdown", children: [
        /* @__PURE__ */ m.jsx(lt, { variant: "title1", weight: "semibold", children: D }),
        /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: `${wj(D)} на этой неделе` })
      ] }),
      /* @__PURE__ */ m.jsx(
        Ft,
        {
          variant: "filled",
          label: /* @__PURE__ */ m.jsxs("span", { className: "aiwa-btn-icon-label", children: [
            /* @__PURE__ */ m.jsx($r, {}),
            " Отметить тренировку"
          ] }),
          ...le("Отметить тренировку", () => j())
        }
      )
    ] }),
    /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-tma-blocks", children: [
      /* @__PURE__ */ m.jsx(
        Ss,
        {
          message: T.summary || v.text || "Выбирай нагрузку, после которой станет легче, а не хуже.",
          detail: T.why,
          onDiscuss: () => el({ topic: "train" })
        }
      ),
      S.length ? /* @__PURE__ */ m.jsx(yt.Item, { header: "Варианты", children: S.map((M, V) => /* @__PURE__ */ m.jsx(
        fe,
        {
          image: iv(y, M.name),
          title: [M.name || `Вариант ${V + 1}`, M.duration].filter(Boolean).join(" · "),
          description: [
            (M.exercises || []).map((B) => [B.name, B.sets && B.reps ? `${B.sets}×${B.reps}` : ""].filter(Boolean).join(" ")).join(", "),
            M.tip || M.benefit || M.how || M.detail
          ].filter(Boolean).join(" — "),
          onClick: () => j(M)
        },
        M.name || V
      )) }) : null,
      /* @__PURE__ */ m.jsx(yt.Item, { header: "Прошедшие тренировки", children: w.length ? w.slice().reverse().map((M) => /* @__PURE__ */ m.jsx(
        fe,
        {
          image: iv(y, M.type),
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
      )) : _.length ? _.map((M) => /* @__PURE__ */ m.jsx(
        fe,
        {
          title: M.type || "Тренировка",
          description: `${M.d} · ${M.count} запись`,
          onClick: () => c("history")
        },
        M.d
      )) : /* @__PURE__ */ m.jsx(
        fe,
        {
          title: "История пока пуста",
          description: "Отметь первую тренировку — Айва подготовит разбор.",
          onClick: () => c("history")
        }
      ) }),
      /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(
        pt,
        {
          as: "button",
          type: "button",
          onClick: () => c("profile"),
          end: /* @__PURE__ */ m.jsx(pt.Part, { type: "Chevron" }),
          children: /* @__PURE__ */ m.jsx(pt.Text, { title: "Настроить тренировочный профиль", bold: !0 })
        }
      ) })
    ] }),
    /* @__PURE__ */ m.jsx(gj, { isOpen: r === "workout", onClose: () => c(""), onSaved: g, suggested: f }),
    /* @__PURE__ */ m.jsx(
      vj,
      {
        isOpen: r === "variants",
        onClose: () => c(""),
        options: S,
        onSelect: (M) => j(M)
      }
    ),
    /* @__PURE__ */ m.jsx(bj, { isOpen: r === "history", onClose: () => c(""), state: b, onAdd: () => j() }),
    /* @__PURE__ */ m.jsx(xj, { isOpen: r === "profile", onClose: () => c(""), profile: b.profile, onSaved: g })
  ] }) }) });
}
function Ej({ initialMessages: a = [] }) {
  const [e, l] = E.useState(() => a.map((S, w) => ({
    id: `initial-${w}`,
    role: S.role === "user" ? "user" : "assistant",
    text: S.text || "",
    suggestions: []
  }))), [s, r] = E.useState(""), [c, f] = E.useState(!1), [h, y] = E.useState(!1), p = Wf.useRef(null), g = Wf.useRef(null);
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
    const A = await Gt("/api/chat", { message: w }).catch(() => null);
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
      const D = await (await fetch("/api/voice", { method: "POST", body: A })).json();
      D.transcript && l((j) => [...j, { id: `voice-${Date.now()}`, role: "user", text: D.transcript, suggestions: [] }]), l((j) => [...j, {
        id: `voice-answer-${Date.now()}`,
        role: "assistant",
        text: D.answer || "Не получилось распознать голос.",
        suggestions: D.suggestions || []
      }]);
    } catch {
      Ot("Не получилось отправить голос", { type: "error" });
    } finally {
      f(!1);
    }
  }, T = async () => {
    if (h) {
      p.current?.stop();
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      Ot("Голос недоступен в этом клиенте", { type: "error" });
      return;
    }
    try {
      const S = await navigator.mediaDevices.getUserMedia({ audio: !0 }), w = [], A = new MediaRecorder(S);
      p.current = A, A.ondataavailable = (_) => {
        _.data?.size && w.push(_.data);
      }, A.onstop = () => {
        y(!1), S.getTracks().forEach((D) => D.stop());
        const _ = new Blob(w, { type: A.mimeType || "audio/webm" });
        _.size > 900 && b(_, A.mimeType);
      }, A.start(), y(!0);
    } catch {
      Ot("Нет доступа к микрофону", { type: "error" });
    }
  };
  return /* @__PURE__ */ m.jsx(ol, { children: /* @__PURE__ */ m.jsx(sl, { mode: "secondary", children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-chat-screen", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-chat-header", children: [
      /* @__PURE__ */ m.jsx($h, { size: 50, frames: qh, pauseMs: 0 }),
      /* @__PURE__ */ m.jsxs("div", { children: [
        /* @__PURE__ */ m.jsx(lt, { variant: "title3", weight: "semibold", children: "Айва" }),
        /* @__PURE__ */ m.jsx(lt, { variant: "caption1", weight: "regular", children: "учитывает твои данные" })
      ] }),
      /* @__PURE__ */ m.jsx(Ce, { as: "button", type: "button", mode: "opacity", className: "aiwa-sheet-close", "aria-label": "Закрыть чат", onClick: () => vn("go", "today"), children: /* @__PURE__ */ m.jsx(Qb, {}) })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-chat-messages", children: [
      e.map((S) => /* @__PURE__ */ m.jsxs("div", { className: S.role === "user" ? "aiwa-chat-bubble is-user" : "aiwa-chat-bubble is-ai", children: [
        /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: S.text }),
        S.suggestions?.length ? /* @__PURE__ */ m.jsx("div", { className: "aiwa-chat-suggestions", children: S.suggestions.slice(0, 3).map((w) => /* @__PURE__ */ m.jsx(Ce, { as: "button", type: "button", mode: "opacity", onClick: () => v(w), children: /* @__PURE__ */ m.jsx(lt, { variant: "caption1", weight: "semibold", children: w }) }, w)) }) : null
      ] }, S.id)),
      c ? /* @__PURE__ */ m.jsx("div", { className: "aiwa-chat-bubble is-ai", children: /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: "Айва думает…" }) }) : null,
      /* @__PURE__ */ m.jsx("span", { ref: g })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-chat-composer", children: [
      /* @__PURE__ */ m.jsx(
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
      /* @__PURE__ */ m.jsx(Ce, { as: "button", type: "button", mode: "opacity", className: h ? "aiwa-chat-icon is-recording" : "aiwa-chat-icon", "aria-label": "Голос", onClick: T, children: /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "semibold", children: h ? "■" : "Голос" }) }),
      /* @__PURE__ */ m.jsx(Ce, { as: "button", type: "button", mode: "opacity", className: "aiwa-chat-send", "aria-label": "Отправить", onClick: () => v(), children: /* @__PURE__ */ m.jsx(lt, { variant: "title3", weight: "semibold", children: "↑" }) })
    ] })
  ] }) }) });
}
const Pf = [
  { id: "today", label: "Главная", icon: /* @__PURE__ */ m.jsx(WE, {}) },
  { id: "food", label: "Питание", icon: /* @__PURE__ */ m.jsx(eA, {}) },
  { id: "train", label: "Нагрузка", icon: /* @__PURE__ */ m.jsx(nA, {}) }
];
function Aj({ active: a }) {
  const e = a === "stats" ? "today" : a, l = Math.max(0, Pf.findIndex((s) => s.id === e));
  return /* @__PURE__ */ m.jsx(ol, { children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-nav-root", "data-aiwa-nav": "true", children: [
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-nav-tabbar-layer", children: /* @__PURE__ */ m.jsx(
      ZE,
      {
        tabs: Pf.map(({ label: s, icon: r }) => ({ label: s, icon: r })),
        defaultIndex: l,
        onChange: (s) => vn("go", Pf[s].id)
      }
    ) }),
    /* @__PURE__ */ m.jsx(
      Ce,
      {
        as: "button",
        type: "button",
        mode: "opacity",
        className: "aiwa-nav-mascot",
        "aria-label": "Открыть Айву",
        onClick: () => el(),
        children: /* @__PURE__ */ m.jsx($h, { size: 67 })
      }
    )
  ] }) });
}
let Ja = null, Kf = null, Wa = null, rs = "", Ld = !1, Bd = 0, Zf = null, lv = null, is = null, Qf = null, lr = {}, sr = 0, Ff = null, sv = null, ov = {}, rv = 0, Jf = null, uv = null;
const Qa = () => {
  !Ja || !Wa || Ja.render(
    /* @__PURE__ */ m.jsx(
      aj,
      {
        ...Wa,
        panel: rs,
        panelRevision: Bd,
        profileOpen: Ld,
        onPanelClose: () => Vd.closePanel(),
        onProfileClose: () => Vd.closeProfile()
      }
    )
  );
}, Vd = {
  renderHome(a, e) {
    a && (Kf !== a && (Ja?.unmount(), Kf = a, Ja = $i.createRoot(a)), Wa = e, rs = e.panel || rs, Qa());
  },
  patchHome(a) {
    !Ja || !Wa || (Wa = { ...Wa, ...a }, Qa());
  },
  openPanel(a) {
    rs = a, window.HOME_PANEL = a, Bd += 1, Qa();
  },
  closePanel() {
    rs = "", window.HOME_PANEL = "", Qa();
  },
  openProfile() {
    Ld = !0, Qa();
  },
  closeProfile() {
    Ld = !1, Qa();
  },
  refreshPanel() {
    Bd += 1, Qa();
  },
  unmountHome() {
    Ja?.unmount(), Ja = null, Kf = null, Wa = null;
  },
  // Повторный вызов для уже смонтированного экрана = «перечитай данные»:
  // так host сбрасывает loadedFood/loadedTrain после правок профиля.
  renderFood(a, e = {}) {
    a && (Qf !== a ? (is?.unmount(), Qf = a, is = $i.createRoot(a)) : sr += 1, lr = e, is.render(/* @__PURE__ */ m.jsx(av, { ...lr, revision: sr })));
  },
  renderActivity(a, e = {}) {
    a && (sv !== a ? (Ff?.unmount(), sv = a, Ff = $i.createRoot(a)) : rv += 1, ov = e, Ff.render(/* @__PURE__ */ m.jsx(Cj, { ...ov, revision: rv })));
  },
  renderChat(a, e = {}) {
    a && (uv !== a && (Jf?.unmount(), uv = a, Jf = $i.createRoot(a)), Jf.render(/* @__PURE__ */ m.jsx(Ej, { initialMessages: e.messages || [] })));
  },
  refreshFood() {
    !Qf || !is || (sr += 1, is.render(/* @__PURE__ */ m.jsx(av, { ...lr, mode: ie("aiwaMode") || lr.mode, revision: sr })));
  },
  /** Прогрев данных «Питания» и «Нагрузки» на старте — чтобы табы открывались сразу. */
  prefetch() {
    dj();
  },
  renderNav(a, e) {
    a && (lv !== a && (Zf?.unmount(), lv = a, Zf = $i.createRoot(a)), Zf.render(/* @__PURE__ */ m.jsx(Aj, { active: e })));
  }
};
function jj() {
  window.AiwaDeslop = Vd, rA(), window.dispatchEvent(new CustomEvent("aiwa:deslop-ready"));
}
jj();
export {
  $S as R,
  ws as a,
  JS as b,
  Vr as c,
  US as g,
  m as j,
  E as r
};
