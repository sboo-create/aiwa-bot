function U3(a, e) {
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
function k3(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var sf = { exports: {} }, es = {};
var Y0;
function H3() {
  if (Y0) return es;
  Y0 = 1;
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
  return es.Fragment = e, es.jsx = l, es.jsxs = l, es;
}
var X0;
function q3() {
  return X0 || (X0 = 1, sf.exports = H3()), sf.exports;
}
var m = q3(), of = { exports: {} }, bt = {};
var P0;
function $3() {
  if (P0) return bt;
  P0 = 1;
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
  }, w = Object.assign, j = {};
  function M(O, Y, tt) {
    this.props = O, this.context = Y, this.refs = j, this.updater = tt || S;
  }
  M.prototype.isReactComponent = {}, M.prototype.setState = function(O, Y) {
    if (typeof O != "object" && typeof O != "function" && O != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, O, Y, "setState");
  }, M.prototype.forceUpdate = function(O) {
    this.updater.enqueueForceUpdate(this, O, "forceUpdate");
  };
  function D() {
  }
  D.prototype = M.prototype;
  function A(O, Y, tt) {
    this.props = O, this.context = Y, this.refs = j, this.updater = tt || S;
  }
  var R = A.prototype = new D();
  R.constructor = A, w(R, M.prototype), R.isPureReactComponent = !0;
  var B = Array.isArray;
  function U() {
  }
  var _ = { H: null, A: null, T: null, S: null }, H = Object.prototype.hasOwnProperty;
  function P(O, Y, tt) {
    var ot = tt.ref;
    return {
      $$typeof: a,
      type: O,
      key: Y,
      ref: ot !== void 0 ? ot : null,
      props: tt
    };
  }
  function K(O, Y) {
    return P(O.type, Y, O.props);
  }
  function it(O) {
    return typeof O == "object" && O !== null && O.$$typeof === a;
  }
  function at(O) {
    var Y = { "=": "=0", ":": "=2" };
    return "$" + O.replace(/[=:]/g, function(tt) {
      return Y[tt];
    });
  }
  var I = /\/+/g;
  function F(O, Y) {
    return typeof O == "object" && O !== null && O.key != null ? at("" + O.key) : Y.toString(36);
  }
  function et(O) {
    switch (O.status) {
      case "fulfilled":
        return O.value;
      case "rejected":
        throw O.reason;
      default:
        switch (typeof O.status == "string" ? O.then(U, U) : (O.status = "pending", O.then(
          function(Y) {
            O.status === "pending" && (O.status = "fulfilled", O.value = Y);
          },
          function(Y) {
            O.status === "pending" && (O.status = "rejected", O.reason = Y);
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
  function N(O, Y, tt, ot, dt) {
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
                Y,
                tt,
                ot,
                dt
              );
          }
      }
    if (vt)
      return dt = dt(O), vt = ot === "" ? "." + F(O, 0) : ot, B(dt) ? (tt = "", vt != null && (tt = vt.replace(I, "$&/") + "/"), N(dt, Y, tt, "", function(Xt) {
        return Xt;
      })) : dt != null && (it(dt) && (dt = K(
        dt,
        tt + (dt.key == null || O && O.key === dt.key ? "" : ("" + dt.key).replace(
          I,
          "$&/"
        ) + "/") + vt
      )), Y.push(dt)), 1;
    vt = 0;
    var _t = ot === "" ? "." : ot + ":";
    if (B(O))
      for (var wt = 0; wt < O.length; wt++)
        ot = O[wt], ht = _t + F(ot, wt), vt += N(
          ot,
          Y,
          tt,
          ht,
          dt
        );
    else if (wt = T(O), typeof wt == "function")
      for (O = wt.call(O), wt = 0; !(ot = O.next()).done; )
        ot = ot.value, ht = _t + F(ot, wt++), vt += N(
          ot,
          Y,
          tt,
          ht,
          dt
        );
    else if (ht === "object") {
      if (typeof O.then == "function")
        return N(
          et(O),
          Y,
          tt,
          ot,
          dt
        );
      throw Y = String(O), Error(
        "Objects are not valid as a React child (found: " + (Y === "[object Object]" ? "object with keys {" + Object.keys(O).join(", ") + "}" : Y) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return vt;
  }
  function V(O, Y, tt) {
    if (O == null) return O;
    var ot = [], dt = 0;
    return N(O, ot, "", "", function(ht) {
      return Y.call(tt, ht, dt++);
    }), ot;
  }
  function Z(O) {
    if (O._status === -1) {
      var Y = O._result;
      Y = Y(), Y.then(
        function(tt) {
          (O._status === 0 || O._status === -1) && (O._status = 1, O._result = tt);
        },
        function(tt) {
          (O._status === 0 || O._status === -1) && (O._status = 2, O._result = tt);
        }
      ), O._status === -1 && (O._status = 0, O._result = Y);
    }
    if (O._status === 1) return O._result.default;
    throw O._result;
  }
  var nt = typeof reportError == "function" ? reportError : function(O) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var Y = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof O == "object" && O !== null && typeof O.message == "string" ? String(O.message) : String(O),
        error: O
      });
      if (!window.dispatchEvent(Y)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", O);
      return;
    }
    console.error(O);
  }, st = {
    map: V,
    forEach: function(O, Y, tt) {
      V(
        O,
        function() {
          Y.apply(this, arguments);
        },
        tt
      );
    },
    count: function(O) {
      var Y = 0;
      return V(O, function() {
        Y++;
      }), Y;
    },
    toArray: function(O) {
      return V(O, function(Y) {
        return Y;
      }) || [];
    },
    only: function(O) {
      if (!it(O))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return O;
    }
  };
  return bt.Activity = v, bt.Children = st, bt.Component = M, bt.Fragment = l, bt.Profiler = r, bt.PureComponent = A, bt.StrictMode = s, bt.Suspense = y, bt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = _, bt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(O) {
      return _.H.useMemoCache(O);
    }
  }, bt.cache = function(O) {
    return function() {
      return O.apply(null, arguments);
    };
  }, bt.cacheSignal = function() {
    return null;
  }, bt.cloneElement = function(O, Y, tt) {
    if (O == null)
      throw Error(
        "The argument must be a React element, but you passed " + O + "."
      );
    var ot = w({}, O.props), dt = O.key;
    if (Y != null)
      for (ht in Y.key !== void 0 && (dt = "" + Y.key), Y)
        !H.call(Y, ht) || ht === "key" || ht === "__self" || ht === "__source" || ht === "ref" && Y.ref === void 0 || (ot[ht] = Y[ht]);
    var ht = arguments.length - 2;
    if (ht === 1) ot.children = tt;
    else if (1 < ht) {
      for (var vt = Array(ht), _t = 0; _t < ht; _t++)
        vt[_t] = arguments[_t + 2];
      ot.children = vt;
    }
    return P(O.type, dt, ot);
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
  }, bt.createElement = function(O, Y, tt) {
    var ot, dt = {}, ht = null;
    if (Y != null)
      for (ot in Y.key !== void 0 && (ht = "" + Y.key), Y)
        H.call(Y, ot) && ot !== "key" && ot !== "__self" && ot !== "__source" && (dt[ot] = Y[ot]);
    var vt = arguments.length - 2;
    if (vt === 1) dt.children = tt;
    else if (1 < vt) {
      for (var _t = Array(vt), wt = 0; wt < vt; wt++)
        _t[wt] = arguments[wt + 2];
      dt.children = _t;
    }
    if (O && O.defaultProps)
      for (ot in vt = O.defaultProps, vt)
        dt[ot] === void 0 && (dt[ot] = vt[ot]);
    return P(O, ht, dt);
  }, bt.createRef = function() {
    return { current: null };
  }, bt.forwardRef = function(O) {
    return { $$typeof: h, render: O };
  }, bt.isValidElement = it, bt.lazy = function(O) {
    return {
      $$typeof: g,
      _payload: { _status: -1, _result: O },
      _init: Z
    };
  }, bt.memo = function(O, Y) {
    return {
      $$typeof: p,
      type: O,
      compare: Y === void 0 ? null : Y
    };
  }, bt.startTransition = function(O) {
    var Y = _.T, tt = {};
    _.T = tt;
    try {
      var ot = O(), dt = _.S;
      dt !== null && dt(tt, ot), typeof ot == "object" && ot !== null && typeof ot.then == "function" && ot.then(U, nt);
    } catch (ht) {
      nt(ht);
    } finally {
      Y !== null && tt.types !== null && (Y.types = tt.types), _.T = Y;
    }
  }, bt.unstable_useCacheRefresh = function() {
    return _.H.useCacheRefresh();
  }, bt.use = function(O) {
    return _.H.use(O);
  }, bt.useActionState = function(O, Y, tt) {
    return _.H.useActionState(O, Y, tt);
  }, bt.useCallback = function(O, Y) {
    return _.H.useCallback(O, Y);
  }, bt.useContext = function(O) {
    return _.H.useContext(O);
  }, bt.useDebugValue = function() {
  }, bt.useDeferredValue = function(O, Y) {
    return _.H.useDeferredValue(O, Y);
  }, bt.useEffect = function(O, Y) {
    return _.H.useEffect(O, Y);
  }, bt.useEffectEvent = function(O) {
    return _.H.useEffectEvent(O);
  }, bt.useId = function() {
    return _.H.useId();
  }, bt.useImperativeHandle = function(O, Y, tt) {
    return _.H.useImperativeHandle(O, Y, tt);
  }, bt.useInsertionEffect = function(O, Y) {
    return _.H.useInsertionEffect(O, Y);
  }, bt.useLayoutEffect = function(O, Y) {
    return _.H.useLayoutEffect(O, Y);
  }, bt.useMemo = function(O, Y) {
    return _.H.useMemo(O, Y);
  }, bt.useOptimistic = function(O, Y) {
    return _.H.useOptimistic(O, Y);
  }, bt.useReducer = function(O, Y, tt) {
    return _.H.useReducer(O, Y, tt);
  }, bt.useRef = function(O) {
    return _.H.useRef(O);
  }, bt.useState = function(O) {
    return _.H.useState(O);
  }, bt.useSyncExternalStore = function(O, Y, tt) {
    return _.H.useSyncExternalStore(
      O,
      Y,
      tt
    );
  }, bt.useTransition = function() {
    return _.H.useTransition();
  }, bt.version = "19.2.7", bt;
}
var K0;
function Ts() {
  return K0 || (K0 = 1, of.exports = $3()), of.exports;
}
var E = Ts();
const Jf = /* @__PURE__ */ k3(E), G3 = /* @__PURE__ */ U3({
  __proto__: null,
  default: Jf
}, [E]);
var rf = { exports: {} }, ns = {}, uf = { exports: {} }, cf = {};
var Z0;
function Y3() {
  return Z0 || (Z0 = 1, (function(a) {
    function e(N, V) {
      var Z = N.length;
      N.push(V);
      t: for (; 0 < Z; ) {
        var nt = Z - 1 >>> 1, st = N[nt];
        if (0 < r(st, V))
          N[nt] = V, N[Z] = st, Z = nt;
        else break t;
      }
    }
    function l(N) {
      return N.length === 0 ? null : N[0];
    }
    function s(N) {
      if (N.length === 0) return null;
      var V = N[0], Z = N.pop();
      if (Z !== V) {
        N[0] = Z;
        t: for (var nt = 0, st = N.length, O = st >>> 1; nt < O; ) {
          var Y = 2 * (nt + 1) - 1, tt = N[Y], ot = Y + 1, dt = N[ot];
          if (0 > r(tt, Z))
            ot < st && 0 > r(dt, tt) ? (N[nt] = dt, N[ot] = Z, nt = ot) : (N[nt] = tt, N[Y] = Z, nt = Y);
          else if (ot < st && 0 > r(dt, Z))
            N[nt] = dt, N[ot] = Z, nt = ot;
          else break t;
        }
      }
      return V;
    }
    function r(N, V) {
      var Z = N.sortIndex - V.sortIndex;
      return Z !== 0 ? Z : N.id - V.id;
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
    var y = [], p = [], g = 1, v = null, b = 3, T = !1, S = !1, w = !1, j = !1, M = typeof setTimeout == "function" ? setTimeout : null, D = typeof clearTimeout == "function" ? clearTimeout : null, A = typeof setImmediate < "u" ? setImmediate : null;
    function R(N) {
      for (var V = l(p); V !== null; ) {
        if (V.callback === null) s(p);
        else if (V.startTime <= N)
          s(p), V.sortIndex = V.expirationTime, e(y, V);
        else break;
        V = l(p);
      }
    }
    function B(N) {
      if (w = !1, R(N), !S)
        if (l(y) !== null)
          S = !0, U || (U = !0, at());
        else {
          var V = l(p);
          V !== null && et(B, V.startTime - N);
        }
    }
    var U = !1, _ = -1, H = 5, P = -1;
    function K() {
      return j ? !0 : !(a.unstable_now() - P < H);
    }
    function it() {
      if (j = !1, U) {
        var N = a.unstable_now();
        P = N;
        var V = !0;
        try {
          t: {
            S = !1, w && (w = !1, D(_), _ = -1), T = !0;
            var Z = b;
            try {
              e: {
                for (R(N), v = l(y); v !== null && !(v.expirationTime > N && K()); ) {
                  var nt = v.callback;
                  if (typeof nt == "function") {
                    v.callback = null, b = v.priorityLevel;
                    var st = nt(
                      v.expirationTime <= N
                    );
                    if (N = a.unstable_now(), typeof st == "function") {
                      v.callback = st, R(N), V = !0;
                      break e;
                    }
                    v === l(y) && s(y), R(N);
                  } else s(y);
                  v = l(y);
                }
                if (v !== null) V = !0;
                else {
                  var O = l(p);
                  O !== null && et(
                    B,
                    O.startTime - N
                  ), V = !1;
                }
              }
              break t;
            } finally {
              v = null, b = Z, T = !1;
            }
            V = void 0;
          }
        } finally {
          V ? at() : U = !1;
        }
      }
    }
    var at;
    if (typeof A == "function")
      at = function() {
        A(it);
      };
    else if (typeof MessageChannel < "u") {
      var I = new MessageChannel(), F = I.port2;
      I.port1.onmessage = it, at = function() {
        F.postMessage(null);
      };
    } else
      at = function() {
        M(it, 0);
      };
    function et(N, V) {
      _ = M(function() {
        N(a.unstable_now());
      }, V);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(N) {
      N.callback = null;
    }, a.unstable_forceFrameRate = function(N) {
      0 > N || 125 < N ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : H = 0 < N ? Math.floor(1e3 / N) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return b;
    }, a.unstable_next = function(N) {
      switch (b) {
        case 1:
        case 2:
        case 3:
          var V = 3;
          break;
        default:
          V = b;
      }
      var Z = b;
      b = V;
      try {
        return N();
      } finally {
        b = Z;
      }
    }, a.unstable_requestPaint = function() {
      j = !0;
    }, a.unstable_runWithPriority = function(N, V) {
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
      var Z = b;
      b = N;
      try {
        return V();
      } finally {
        b = Z;
      }
    }, a.unstable_scheduleCallback = function(N, V, Z) {
      var nt = a.unstable_now();
      switch (typeof Z == "object" && Z !== null ? (Z = Z.delay, Z = typeof Z == "number" && 0 < Z ? nt + Z : nt) : Z = nt, N) {
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
      return st = Z + st, N = {
        id: g++,
        callback: V,
        priorityLevel: N,
        startTime: Z,
        expirationTime: st,
        sortIndex: -1
      }, Z > nt ? (N.sortIndex = Z, e(p, N), l(y) === null && N === l(p) && (w ? (D(_), _ = -1) : w = !0, et(B, Z - nt))) : (N.sortIndex = st, e(y, N), S || T || (S = !0, U || (U = !0, at()))), N;
    }, a.unstable_shouldYield = K, a.unstable_wrapCallback = function(N) {
      var V = b;
      return function() {
        var Z = b;
        b = V;
        try {
          return N.apply(this, arguments);
        } finally {
          b = Z;
        }
      };
    };
  })(cf)), cf;
}
var Q0;
function X3() {
  return Q0 || (Q0 = 1, uf.exports = Y3()), uf.exports;
}
var ff = { exports: {} }, je = {};
var F0;
function P3() {
  if (F0) return je;
  F0 = 1;
  var a = Ts();
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
  return je.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, je.createPortal = function(y, p) {
    var g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(e(299));
    return c(y, p, null, g);
  }, je.flushSync = function(y) {
    var p = f.T, g = s.p;
    try {
      if (f.T = null, s.p = 2, y) return y();
    } finally {
      f.T = p, s.p = g, s.d.f();
    }
  }, je.preconnect = function(y, p) {
    typeof y == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, s.d.C(y, p));
  }, je.prefetchDNS = function(y) {
    typeof y == "string" && s.d.D(y);
  }, je.preinit = function(y, p) {
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
  }, je.preinitModule = function(y, p) {
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
  }, je.preload = function(y, p) {
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
  }, je.preloadModule = function(y, p) {
    if (typeof y == "string")
      if (p) {
        var g = h(p.as, p.crossOrigin);
        s.d.m(y, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: g,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else s.d.m(y);
  }, je.requestFormReset = function(y) {
    s.d.r(y);
  }, je.unstable_batchedUpdates = function(y, p) {
    return y(p);
  }, je.useFormState = function(y, p, g) {
    return f.H.useFormState(y, p, g);
  }, je.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, je.version = "19.2.7", je;
}
var J0;
function dv() {
  if (J0) return ff.exports;
  J0 = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (e) {
        console.error(e);
      }
  }
  return a(), ff.exports = P3(), ff.exports;
}
var W0;
function K3() {
  if (W0) return ns;
  W0 = 1;
  var a = X3(), e = Ts(), l = dv();
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
  var v = Object.assign, b = Symbol.for("react.element"), T = Symbol.for("react.transitional.element"), S = Symbol.for("react.portal"), w = Symbol.for("react.fragment"), j = Symbol.for("react.strict_mode"), M = Symbol.for("react.profiler"), D = Symbol.for("react.consumer"), A = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), B = Symbol.for("react.suspense"), U = Symbol.for("react.suspense_list"), _ = Symbol.for("react.memo"), H = Symbol.for("react.lazy"), P = Symbol.for("react.activity"), K = Symbol.for("react.memo_cache_sentinel"), it = Symbol.iterator;
  function at(t) {
    return t === null || typeof t != "object" ? null : (t = it && t[it] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var I = Symbol.for("react.client.reference");
  function F(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === I ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case w:
        return "Fragment";
      case M:
        return "Profiler";
      case j:
        return "StrictMode";
      case B:
        return "Suspense";
      case U:
        return "SuspenseList";
      case P:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case S:
          return "Portal";
        case A:
          return t.displayName || "Context";
        case D:
          return (t._context.displayName || "Context") + ".Consumer";
        case R:
          var n = t.render;
          return t = t.displayName, t || (t = n.displayName || n.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case _:
          return n = t.displayName || null, n !== null ? n : F(t.type) || "Memo";
        case H:
          n = t._payload, t = t._init;
          try {
            return F(t(n));
          } catch {
          }
      }
    return null;
  }
  var et = Array.isArray, N = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, V = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Z = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, nt = [], st = -1;
  function O(t) {
    return { current: t };
  }
  function Y(t) {
    0 > st || (t.current = nt[st], nt[st] = null, st--);
  }
  function tt(t, n) {
    st++, nt[st] = t.current, t.current = n;
  }
  var ot = O(null), dt = O(null), ht = O(null), vt = O(null);
  function _t(t, n) {
    switch (tt(ht, n), tt(dt, t), tt(ot, null), n.nodeType) {
      case 9:
      case 11:
        t = (t = n.documentElement) && (t = t.namespaceURI) ? h0(t) : 0;
        break;
      default:
        if (t = n.tagName, n = n.namespaceURI)
          n = h0(n), t = m0(n, t);
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
    Y(ot), tt(ot, t);
  }
  function wt() {
    Y(ot), Y(dt), Y(ht);
  }
  function Xt(t) {
    t.memoizedState !== null && tt(vt, t);
    var n = ot.current, i = m0(n, t.type);
    n !== i && (tt(dt, t), tt(ot, i));
  }
  function Pt(t) {
    dt.current === t && (Y(ot), Y(dt)), vt.current === t && (Y(vt), Jl._currentValue = Z);
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
  var ja = !1;
  function Aa(t, n) {
    if (!t || ja) return "";
    ja = !0;
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
`), $ = C.split(`
`);
        for (u = o = 0; o < z.length && !z[o].includes("DetermineComponentFrameRoot"); )
          o++;
        for (; u < $.length && !$[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (o === z.length || u === $.length)
          for (o = z.length - 1, u = $.length - 1; 1 <= o && 0 <= u && z[o] !== $[u]; )
            u--;
        for (; 1 <= o && 0 <= u; o--, u--)
          if (z[o] !== $[u]) {
            if (o !== 1 || u !== 1)
              do
                if (o--, u--, 0 > u || z[o] !== $[u]) {
                  var Q = `
` + z[o].replace(" at new ", " at ");
                  return t.displayName && Q.includes("<anonymous>") && (Q = Q.replace("<anonymous>", t.displayName)), Q;
                }
              while (1 <= o && 0 <= u);
            break;
          }
      }
    } finally {
      ja = !1, Error.prepareStackTrace = i;
    }
    return (i = t ? t.displayName || t.name : "") ? rn(i) : "";
  }
  function Pr(t, n) {
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
        return Aa(t.type, !1);
      case 11:
        return Aa(t.type.render, !1);
      case 1:
        return Aa(t.type, !0);
      case 31:
        return rn("Activity");
      default:
        return "";
    }
  }
  function _s(t) {
    try {
      var n = "", i = null;
      do
        n += Pr(t, i), i = t, t = t.return;
      while (t);
      return n;
    } catch (o) {
      return `
Error generating stack: ` + o.message + `
` + o.stack;
    }
  }
  var rl = Object.prototype.hasOwnProperty, rt = a.unstable_scheduleCallback, Kt = a.unstable_cancelCallback, ii = a.unstable_shouldYield, gx = a.unstable_requestPaint, Ve = a.unstable_now, vx = a.unstable_getCurrentPriorityLevel, Xh = a.unstable_ImmediatePriority, Ph = a.unstable_UserBlockingPriority, Ds = a.unstable_NormalPriority, bx = a.unstable_LowPriority, Kh = a.unstable_IdlePriority, xx = a.log, Sx = a.unstable_setDisableYieldValue, ul = null, Ue = null;
  function Zn(t) {
    if (typeof xx == "function" && Sx(t), Ue && typeof Ue.setStrictMode == "function")
      try {
        Ue.setStrictMode(ul, t);
      } catch {
      }
  }
  var ke = Math.clz32 ? Math.clz32 : Cx, wx = Math.log, Tx = Math.LN2;
  function Cx(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (wx(t) / Tx | 0) | 0;
  }
  var Rs = 256, Ns = 262144, Os = 4194304;
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
  function zs(t, n, i) {
    var o = t.pendingLanes;
    if (o === 0) return 0;
    var u = 0, d = t.suspendedLanes, x = t.pingedLanes;
    t = t.warmLanes;
    var C = o & 134217727;
    return C !== 0 ? (o = C & ~d, o !== 0 ? u = Ma(o) : (x &= C, x !== 0 ? u = Ma(x) : i || (i = C & ~t, i !== 0 && (u = Ma(i))))) : (C = o & ~d, C !== 0 ? u = Ma(C) : x !== 0 ? u = Ma(x) : i || (i = o & ~t, i !== 0 && (u = Ma(i)))), u === 0 ? 0 : n !== 0 && n !== u && (n & d) === 0 && (d = u & -u, i = n & -n, d >= i || d === 32 && (i & 4194048) !== 0) ? n : u;
  }
  function cl(t, n) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & n) === 0;
  }
  function Ex(t, n) {
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
  function Zh() {
    var t = Os;
    return Os <<= 1, (Os & 62914560) === 0 && (Os = 4194304), t;
  }
  function Kr(t) {
    for (var n = [], i = 0; 31 > i; i++) n.push(t);
    return n;
  }
  function fl(t, n) {
    t.pendingLanes |= n, n !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function jx(t, n, i, o, u, d) {
    var x = t.pendingLanes;
    t.pendingLanes = i, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= i, t.entangledLanes &= i, t.errorRecoveryDisabledLanes &= i, t.shellSuspendCounter = 0;
    var C = t.entanglements, z = t.expirationTimes, $ = t.hiddenUpdates;
    for (i = x & ~i; 0 < i; ) {
      var Q = 31 - ke(i), W = 1 << Q;
      C[Q] = 0, z[Q] = -1;
      var G = $[Q];
      if (G !== null)
        for ($[Q] = null, Q = 0; Q < G.length; Q++) {
          var X = G[Q];
          X !== null && (X.lane &= -536870913);
        }
      i &= ~W;
    }
    o !== 0 && Qh(t, o, 0), d !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= d & ~(x & ~n));
  }
  function Qh(t, n, i) {
    t.pendingLanes |= n, t.suspendedLanes &= ~n;
    var o = 31 - ke(n);
    t.entangledLanes |= n, t.entanglements[o] = t.entanglements[o] | 1073741824 | i & 261930;
  }
  function Fh(t, n) {
    var i = t.entangledLanes |= n;
    for (t = t.entanglements; i; ) {
      var o = 31 - ke(i), u = 1 << o;
      u & n | t[o] & n && (t[o] |= n), i &= ~u;
    }
  }
  function Jh(t, n) {
    var i = n & -n;
    return i = (i & 42) !== 0 ? 1 : Zr(i), (i & (t.suspendedLanes | n)) !== 0 ? 0 : i;
  }
  function Zr(t) {
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
  function Qr(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Wh() {
    var t = V.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : V0(t.type));
  }
  function Ih(t, n) {
    var i = V.p;
    try {
      return V.p = t, n();
    } finally {
      V.p = i;
    }
  }
  var Qn = Math.random().toString(36).slice(2), ge = "__reactFiber$" + Qn, De = "__reactProps$" + Qn, li = "__reactContainer$" + Qn, Fr = "__reactEvents$" + Qn, Ax = "__reactListeners$" + Qn, Mx = "__reactHandles$" + Qn, tm = "__reactResources$" + Qn, dl = "__reactMarker$" + Qn;
  function Jr(t) {
    delete t[ge], delete t[De], delete t[Fr], delete t[Ax], delete t[Mx];
  }
  function si(t) {
    var n = t[ge];
    if (n) return n;
    for (var i = t.parentNode; i; ) {
      if (n = i[li] || i[ge]) {
        if (i = n.alternate, n.child !== null || i !== null && i.child !== null)
          for (t = S0(t); t !== null; ) {
            if (i = t[ge]) return i;
            t = S0(t);
          }
        return n;
      }
      t = i, i = t.parentNode;
    }
    return null;
  }
  function oi(t) {
    if (t = t[ge] || t[li]) {
      var n = t.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return t;
    }
    return null;
  }
  function hl(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t.stateNode;
    throw Error(s(33));
  }
  function ri(t) {
    var n = t[tm];
    return n || (n = t[tm] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function pe(t) {
    t[dl] = !0;
  }
  var em = /* @__PURE__ */ new Set(), nm = {};
  function _a(t, n) {
    ui(t, n), ui(t + "Capture", n);
  }
  function ui(t, n) {
    for (nm[t] = n, t = 0; t < n.length; t++)
      em.add(n[t]);
  }
  var _x = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), am = {}, im = {};
  function Dx(t) {
    return rl.call(im, t) ? !0 : rl.call(am, t) ? !1 : _x.test(t) ? im[t] = !0 : (am[t] = !0, !1);
  }
  function Ls(t, n, i) {
    if (Dx(n))
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
  function Bs(t, n, i) {
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
  function lm(t) {
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
  function Wr(t) {
    if (!t._valueTracker) {
      var n = lm(t) ? "checked" : "value";
      t._valueTracker = Rx(
        t,
        n,
        "" + t[n]
      );
    }
  }
  function sm(t) {
    if (!t) return !1;
    var n = t._valueTracker;
    if (!n) return !0;
    var i = n.getValue(), o = "";
    return t && (o = lm(t) ? t.checked ? "true" : "false" : t.value), t = o, t !== i ? (n.setValue(t), !0) : !1;
  }
  function Vs(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Nx = /[\n"\\]/g;
  function Fe(t) {
    return t.replace(
      Nx,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ir(t, n, i, o, u, d, x, C) {
    t.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? t.type = x : t.removeAttribute("type"), n != null ? x === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + Qe(n)) : t.value !== "" + Qe(n) && (t.value = "" + Qe(n)) : x !== "submit" && x !== "reset" || t.removeAttribute("value"), n != null ? tu(t, x, Qe(n)) : i != null ? tu(t, x, Qe(i)) : o != null && t.removeAttribute("value"), u == null && d != null && (t.defaultChecked = !!d), u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"), C != null && typeof C != "function" && typeof C != "symbol" && typeof C != "boolean" ? t.name = "" + Qe(C) : t.removeAttribute("name");
  }
  function om(t, n, i, o, u, d, x, C) {
    if (d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (t.type = d), n != null || i != null) {
      if (!(d !== "submit" && d !== "reset" || n != null)) {
        Wr(t);
        return;
      }
      i = i != null ? "" + Qe(i) : "", n = n != null ? "" + Qe(n) : i, C || n === t.value || (t.value = n), t.defaultValue = n;
    }
    o = o ?? u, o = typeof o != "function" && typeof o != "symbol" && !!o, t.checked = C ? t.checked : !!o, t.defaultChecked = !!o, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (t.name = x), Wr(t);
  }
  function tu(t, n, i) {
    n === "number" && Vs(t.ownerDocument) === t || t.defaultValue === "" + i || (t.defaultValue = "" + i);
  }
  function ci(t, n, i, o) {
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
  function rm(t, n, i) {
    if (n != null && (n = "" + Qe(n), n !== t.value && (t.value = n), i == null)) {
      t.defaultValue !== n && (t.defaultValue = n);
      return;
    }
    t.defaultValue = i != null ? "" + Qe(i) : "";
  }
  function um(t, n, i, o) {
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
    i = Qe(n), t.defaultValue = i, o = t.textContent, o === i && o !== "" && o !== null && (t.value = o), Wr(t);
  }
  function fi(t, n) {
    if (n) {
      var i = t.firstChild;
      if (i && i === t.lastChild && i.nodeType === 3) {
        i.nodeValue = n;
        return;
      }
    }
    t.textContent = n;
  }
  var Ox = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function cm(t, n, i) {
    var o = n.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? o ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "" : o ? t.setProperty(n, i) : typeof i != "number" || i === 0 || Ox.has(n) ? n === "float" ? t.cssFloat = i : t[n] = ("" + i).trim() : t[n] = i + "px";
  }
  function fm(t, n, i) {
    if (n != null && typeof n != "object")
      throw Error(s(62));
    if (t = t.style, i != null) {
      for (var o in i)
        !i.hasOwnProperty(o) || n != null && n.hasOwnProperty(o) || (o.indexOf("--") === 0 ? t.setProperty(o, "") : o === "float" ? t.cssFloat = "" : t[o] = "");
      for (var u in n)
        o = n[u], n.hasOwnProperty(u) && i[u] !== o && cm(t, u, o);
    } else
      for (var d in n)
        n.hasOwnProperty(d) && cm(t, d, n[d]);
  }
  function eu(t) {
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
  var zx = /* @__PURE__ */ new Map([
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
  ]), Lx = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Us(t) {
    return Lx.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function _n() {
  }
  var nu = null;
  function au(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var di = null, hi = null;
  function dm(t) {
    var n = oi(t);
    if (n && (t = n.stateNode)) {
      var i = t[De] || null;
      t: switch (t = n.stateNode, n.type) {
        case "input":
          if (Ir(
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
                var u = o[De] || null;
                if (!u) throw Error(s(90));
                Ir(
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
              o = i[n], o.form === t.form && sm(o);
          }
          break t;
        case "textarea":
          rm(t, i.value, i.defaultValue);
          break t;
        case "select":
          n = i.value, n != null && ci(t, !!i.multiple, n, !1);
      }
    }
  }
  var iu = !1;
  function hm(t, n, i) {
    if (iu) return t(n, i);
    iu = !0;
    try {
      var o = t(n);
      return o;
    } finally {
      if (iu = !1, (di !== null || hi !== null) && (jo(), di && (n = di, t = hi, hi = di = null, dm(n), t)))
        for (n = 0; n < t.length; n++) dm(t[n]);
    }
  }
  function ml(t, n) {
    var i = t.stateNode;
    if (i === null) return null;
    var o = i[De] || null;
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
  var Dn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), lu = !1;
  if (Dn)
    try {
      var pl = {};
      Object.defineProperty(pl, "passive", {
        get: function() {
          lu = !0;
        }
      }), window.addEventListener("test", pl, pl), window.removeEventListener("test", pl, pl);
    } catch {
      lu = !1;
    }
  var Fn = null, su = null, ks = null;
  function mm() {
    if (ks) return ks;
    var t, n = su, i = n.length, o, u = "value" in Fn ? Fn.value : Fn.textContent, d = u.length;
    for (t = 0; t < i && n[t] === u[t]; t++) ;
    var x = i - t;
    for (o = 1; o <= x && n[i - o] === u[d - o]; o++) ;
    return ks = u.slice(t, 1 < o ? 1 - o : void 0);
  }
  function Hs(t) {
    var n = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function qs() {
    return !0;
  }
  function pm() {
    return !1;
  }
  function Re(t) {
    function n(i, o, u, d, x) {
      this._reactName = i, this._targetInst = u, this.type = o, this.nativeEvent = d, this.target = x, this.currentTarget = null;
      for (var C in t)
        t.hasOwnProperty(C) && (i = t[C], this[C] = i ? i(d) : d[C]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? qs : pm, this.isPropagationStopped = pm, this;
    }
    return v(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = qs);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = qs);
      },
      persist: function() {
      },
      isPersistent: qs
    }), n;
  }
  var Da = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, $s = Re(Da), yl = v({}, Da, { view: 0, detail: 0 }), Bx = Re(yl), ou, ru, gl, Gs = v({}, yl, {
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
    getModifierState: cu,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== gl && (gl && t.type === "mousemove" ? (ou = t.screenX - gl.screenX, ru = t.screenY - gl.screenY) : ru = ou = 0, gl = t), ou);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : ru;
    }
  }), ym = Re(Gs), Vx = v({}, Gs, { dataTransfer: 0 }), Ux = Re(Vx), kx = v({}, yl, { relatedTarget: 0 }), uu = Re(kx), Hx = v({}, Da, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), qx = Re(Hx), $x = v({}, Da, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Gx = Re($x), Yx = v({}, Da, { data: 0 }), gm = Re(Yx), Xx = {
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
  }, Px = {
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
  }, Kx = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Zx(t) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(t) : (t = Kx[t]) ? !!n[t] : !1;
  }
  function cu() {
    return Zx;
  }
  var Qx = v({}, yl, {
    key: function(t) {
      if (t.key) {
        var n = Xx[t.key] || t.key;
        if (n !== "Unidentified") return n;
      }
      return t.type === "keypress" ? (t = Hs(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Px[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: cu,
    charCode: function(t) {
      return t.type === "keypress" ? Hs(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Hs(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Fx = Re(Qx), Jx = v({}, Gs, {
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
  }), vm = Re(Jx), Wx = v({}, yl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: cu
  }), Ix = Re(Wx), tS = v({}, Da, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), eS = Re(tS), nS = v({}, Gs, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), aS = Re(nS), iS = v({}, Da, {
    newState: 0,
    oldState: 0
  }), lS = Re(iS), sS = [9, 13, 27, 32], fu = Dn && "CompositionEvent" in window, vl = null;
  Dn && "documentMode" in document && (vl = document.documentMode);
  var oS = Dn && "TextEvent" in window && !vl, bm = Dn && (!fu || vl && 8 < vl && 11 >= vl), xm = " ", Sm = !1;
  function wm(t, n) {
    switch (t) {
      case "keyup":
        return sS.indexOf(n.keyCode) !== -1;
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
  function Tm(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var mi = !1;
  function rS(t, n) {
    switch (t) {
      case "compositionend":
        return Tm(n);
      case "keypress":
        return n.which !== 32 ? null : (Sm = !0, xm);
      case "textInput":
        return t = n.data, t === xm && Sm ? null : t;
      default:
        return null;
    }
  }
  function uS(t, n) {
    if (mi)
      return t === "compositionend" || !fu && wm(t, n) ? (t = mm(), ks = su = Fn = null, mi = !1, t) : null;
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
        return bm && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var cS = {
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
  function Cm(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === "input" ? !!cS[t.type] : n === "textarea";
  }
  function Em(t, n, i, o) {
    di ? hi ? hi.push(o) : hi = [o] : di = o, n = Oo(n, "onChange"), 0 < n.length && (i = new $s(
      "onChange",
      "change",
      null,
      i,
      o
    ), t.push({ event: i, listeners: n }));
  }
  var bl = null, xl = null;
  function fS(t) {
    o0(t, 0);
  }
  function Ys(t) {
    var n = hl(t);
    if (sm(n)) return t;
  }
  function jm(t, n) {
    if (t === "change") return n;
  }
  var Am = !1;
  if (Dn) {
    var du;
    if (Dn) {
      var hu = "oninput" in document;
      if (!hu) {
        var Mm = document.createElement("div");
        Mm.setAttribute("oninput", "return;"), hu = typeof Mm.oninput == "function";
      }
      du = hu;
    } else du = !1;
    Am = du && (!document.documentMode || 9 < document.documentMode);
  }
  function _m() {
    bl && (bl.detachEvent("onpropertychange", Dm), xl = bl = null);
  }
  function Dm(t) {
    if (t.propertyName === "value" && Ys(xl)) {
      var n = [];
      Em(
        n,
        xl,
        t,
        au(t)
      ), hm(fS, n);
    }
  }
  function dS(t, n, i) {
    t === "focusin" ? (_m(), bl = n, xl = i, bl.attachEvent("onpropertychange", Dm)) : t === "focusout" && _m();
  }
  function hS(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Ys(xl);
  }
  function mS(t, n) {
    if (t === "click") return Ys(n);
  }
  function pS(t, n) {
    if (t === "input" || t === "change")
      return Ys(n);
  }
  function yS(t, n) {
    return t === n && (t !== 0 || 1 / t === 1 / n) || t !== t && n !== n;
  }
  var He = typeof Object.is == "function" ? Object.is : yS;
  function Sl(t, n) {
    if (He(t, n)) return !0;
    if (typeof t != "object" || t === null || typeof n != "object" || n === null)
      return !1;
    var i = Object.keys(t), o = Object.keys(n);
    if (i.length !== o.length) return !1;
    for (o = 0; o < i.length; o++) {
      var u = i[o];
      if (!rl.call(n, u) || !He(t[u], n[u]))
        return !1;
    }
    return !0;
  }
  function Rm(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Nm(t, n) {
    var i = Rm(t);
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
      i = Rm(i);
    }
  }
  function Om(t, n) {
    return t && n ? t === n ? !0 : t && t.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Om(t, n.parentNode) : "contains" in t ? t.contains(n) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function zm(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var n = Vs(t.document); n instanceof t.HTMLIFrameElement; ) {
      try {
        var i = typeof n.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) t = n.contentWindow;
      else break;
      n = Vs(t.document);
    }
    return n;
  }
  function mu(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n && (n === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || n === "textarea" || t.contentEditable === "true");
  }
  var gS = Dn && "documentMode" in document && 11 >= document.documentMode, pi = null, pu = null, wl = null, yu = !1;
  function Lm(t, n, i) {
    var o = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    yu || pi == null || pi !== Vs(o) || (o = pi, "selectionStart" in o && mu(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), wl && Sl(wl, o) || (wl = o, o = Oo(pu, "onSelect"), 0 < o.length && (n = new $s(
      "onSelect",
      "select",
      null,
      n,
      i
    ), t.push({ event: n, listeners: o }), n.target = pi)));
  }
  function Ra(t, n) {
    var i = {};
    return i[t.toLowerCase()] = n.toLowerCase(), i["Webkit" + t] = "webkit" + n, i["Moz" + t] = "moz" + n, i;
  }
  var yi = {
    animationend: Ra("Animation", "AnimationEnd"),
    animationiteration: Ra("Animation", "AnimationIteration"),
    animationstart: Ra("Animation", "AnimationStart"),
    transitionrun: Ra("Transition", "TransitionRun"),
    transitionstart: Ra("Transition", "TransitionStart"),
    transitioncancel: Ra("Transition", "TransitionCancel"),
    transitionend: Ra("Transition", "TransitionEnd")
  }, gu = {}, Bm = {};
  Dn && (Bm = document.createElement("div").style, "AnimationEvent" in window || (delete yi.animationend.animation, delete yi.animationiteration.animation, delete yi.animationstart.animation), "TransitionEvent" in window || delete yi.transitionend.transition);
  function Na(t) {
    if (gu[t]) return gu[t];
    if (!yi[t]) return t;
    var n = yi[t], i;
    for (i in n)
      if (n.hasOwnProperty(i) && i in Bm)
        return gu[t] = n[i];
    return t;
  }
  var Vm = Na("animationend"), Um = Na("animationiteration"), km = Na("animationstart"), vS = Na("transitionrun"), bS = Na("transitionstart"), xS = Na("transitioncancel"), Hm = Na("transitionend"), qm = /* @__PURE__ */ new Map(), vu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  vu.push("scrollEnd");
  function un(t, n) {
    qm.set(t, n), _a(n, [t]);
  }
  var Xs = typeof reportError == "function" ? reportError : function(t) {
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
  }, Je = [], gi = 0, bu = 0;
  function Ps() {
    for (var t = gi, n = bu = gi = 0; n < t; ) {
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
      d !== 0 && $m(i, u, d);
    }
  }
  function Ks(t, n, i, o) {
    Je[gi++] = t, Je[gi++] = n, Je[gi++] = i, Je[gi++] = o, bu |= o, t.lanes |= o, t = t.alternate, t !== null && (t.lanes |= o);
  }
  function xu(t, n, i, o) {
    return Ks(t, n, i, o), Zs(t);
  }
  function Oa(t, n) {
    return Ks(t, null, null, n), Zs(t);
  }
  function $m(t, n, i) {
    t.lanes |= i;
    var o = t.alternate;
    o !== null && (o.lanes |= i);
    for (var u = !1, d = t.return; d !== null; )
      d.childLanes |= i, o = d.alternate, o !== null && (o.childLanes |= i), d.tag === 22 && (t = d.stateNode, t === null || t._visibility & 1 || (u = !0)), t = d, d = d.return;
    return t.tag === 3 ? (d = t.stateNode, u && n !== null && (u = 31 - ke(i), t = d.hiddenUpdates, o = t[u], o === null ? t[u] = [n] : o.push(n), n.lane = i | 536870912), d) : null;
  }
  function Zs(t) {
    if (50 < Yl)
      throw Yl = 0, _c = null, Error(s(185));
    for (var n = t.return; n !== null; )
      t = n, n = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var vi = {};
  function SS(t, n, i, o) {
    this.tag = t, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function qe(t, n, i, o) {
    return new SS(t, n, i, o);
  }
  function Su(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Rn(t, n) {
    var i = t.alternate;
    return i === null ? (i = qe(
      t.tag,
      n,
      t.key,
      t.mode
    ), i.elementType = t.elementType, i.type = t.type, i.stateNode = t.stateNode, i.alternate = t, t.alternate = i) : (i.pendingProps = n, i.type = t.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = t.flags & 65011712, i.childLanes = t.childLanes, i.lanes = t.lanes, i.child = t.child, i.memoizedProps = t.memoizedProps, i.memoizedState = t.memoizedState, i.updateQueue = t.updateQueue, n = t.dependencies, i.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, i.sibling = t.sibling, i.index = t.index, i.ref = t.ref, i.refCleanup = t.refCleanup, i;
  }
  function Gm(t, n) {
    t.flags &= 65011714;
    var i = t.alternate;
    return i === null ? (t.childLanes = 0, t.lanes = n, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = i.childLanes, t.lanes = i.lanes, t.child = i.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = i.memoizedProps, t.memoizedState = i.memoizedState, t.updateQueue = i.updateQueue, t.type = i.type, n = i.dependencies, t.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), t;
  }
  function Qs(t, n, i, o, u, d) {
    var x = 0;
    if (o = t, typeof t == "function") Su(t) && (x = 1);
    else if (typeof t == "string")
      x = j3(
        t,
        i,
        ot.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case P:
          return t = qe(31, i, n, u), t.elementType = P, t.lanes = d, t;
        case w:
          return za(i.children, u, d, n);
        case j:
          x = 8, u |= 24;
          break;
        case M:
          return t = qe(12, i, n, u | 2), t.elementType = M, t.lanes = d, t;
        case B:
          return t = qe(13, i, n, u), t.elementType = B, t.lanes = d, t;
        case U:
          return t = qe(19, i, n, u), t.elementType = U, t.lanes = d, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case A:
                x = 10;
                break t;
              case D:
                x = 9;
                break t;
              case R:
                x = 11;
                break t;
              case _:
                x = 14;
                break t;
              case H:
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
  function wu(t, n, i) {
    return t = qe(6, t, null, n), t.lanes = i, t;
  }
  function Ym(t) {
    var n = qe(18, null, null, 0);
    return n.stateNode = t, n;
  }
  function Tu(t, n, i) {
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
  var Xm = /* @__PURE__ */ new WeakMap();
  function We(t, n) {
    if (typeof t == "object" && t !== null) {
      var i = Xm.get(t);
      return i !== void 0 ? i : (n = {
        value: t,
        source: n,
        stack: _s(n)
      }, Xm.set(t, n), n);
    }
    return {
      value: t,
      source: n,
      stack: _s(n)
    };
  }
  var bi = [], xi = 0, Fs = null, Tl = 0, Ie = [], tn = 0, Jn = null, xn = 1, Sn = "";
  function Nn(t, n) {
    bi[xi++] = Tl, bi[xi++] = Fs, Fs = t, Tl = n;
  }
  function Pm(t, n, i) {
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
  function Cu(t) {
    t.return !== null && (Nn(t, 1), Pm(t, 1, 0));
  }
  function Eu(t) {
    for (; t === Fs; )
      Fs = bi[--xi], bi[xi] = null, Tl = bi[--xi], bi[xi] = null;
    for (; t === Jn; )
      Jn = Ie[--tn], Ie[tn] = null, Sn = Ie[--tn], Ie[tn] = null, xn = Ie[--tn], Ie[tn] = null;
  }
  function Km(t, n) {
    Ie[tn++] = xn, Ie[tn++] = Sn, Ie[tn++] = Jn, xn = n.id, Sn = n.overflow, Jn = t;
  }
  var ve = null, Zt = null, Mt = !1, Wn = null, en = !1, ju = Error(s(519));
  function In(t) {
    var n = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Cl(We(n, t)), ju;
  }
  function Zm(t) {
    var n = t.stateNode, i = t.type, o = t.memoizedProps;
    switch (n[ge] = t, n[De] = o, i) {
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
        for (i = 0; i < Pl.length; i++)
          Et(Pl[i], n);
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
        Et("invalid", n), om(
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
        Et("invalid", n), um(n, o.value, o.defaultValue, o.children);
    }
    i = o.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || n.textContent === "" + i || o.suppressHydrationWarning === !0 || f0(n.textContent, i) ? (o.popover != null && (Et("beforetoggle", n), Et("toggle", n)), o.onScroll != null && Et("scroll", n), o.onScrollEnd != null && Et("scrollend", n), o.onClick != null && (n.onclick = _n), n = !0) : n = !1, n || In(t, !0);
  }
  function Qm(t) {
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
  function Si(t) {
    if (t !== ve) return !1;
    if (!Mt) return Qm(t), Mt = !0, !1;
    var n = t.tag, i;
    if ((i = n !== 3 && n !== 27) && ((i = n === 5) && (i = t.type, i = !(i !== "form" && i !== "button") || Yc(t.type, t.memoizedProps)), i = !i), i && Zt && In(t), Qm(t), n === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Zt = x0(t);
    } else if (n === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Zt = x0(t);
    } else
      n === 27 ? (n = Zt, ha(t.type) ? (t = Qc, Qc = null, Zt = t) : Zt = n) : Zt = ve ? an(t.stateNode.nextSibling) : null;
    return !0;
  }
  function La() {
    Zt = ve = null, Mt = !1;
  }
  function Au() {
    var t = Wn;
    return t !== null && (Le === null ? Le = t : Le.push.apply(
      Le,
      t
    ), Wn = null), t;
  }
  function Cl(t) {
    Wn === null ? Wn = [t] : Wn.push(t);
  }
  var Mu = O(null), Ba = null, On = null;
  function ta(t, n, i) {
    tt(Mu, n._currentValue), n._currentValue = i;
  }
  function zn(t) {
    t._currentValue = Mu.current, Y(Mu);
  }
  function _u(t, n, i) {
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
              d.lanes |= i, C = d.alternate, C !== null && (C.lanes |= i), _u(
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
        x.lanes |= i, d = x.alternate, d !== null && (d.lanes |= i), _u(x, i, t), x = null;
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
  function wi(t, n, i, o) {
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
        x.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(Jl) : t = [Jl]);
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
  function Js(t) {
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
    return Fm(Ba, t);
  }
  function Ws(t, n) {
    return Ba === null && Va(t), Fm(t, n);
  }
  function Fm(t, n) {
    var i = n._currentValue;
    if (n = { context: n, memoizedValue: i, next: null }, On === null) {
      if (t === null) throw Error(s(308));
      On = n, t.dependencies = { lanes: 0, firstContext: n }, t.flags |= 524288;
    } else On = On.next = n;
    return i;
  }
  var wS = typeof AbortController < "u" ? AbortController : function() {
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
  }, TS = a.unstable_scheduleCallback, CS = a.unstable_NormalPriority, oe = {
    $$typeof: A,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ru() {
    return {
      controller: new wS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function El(t) {
    t.refCount--, t.refCount === 0 && TS(CS, function() {
      t.controller.abort();
    });
  }
  var jl = null, Nu = 0, Ti = 0, Ci = null;
  function ES(t, n) {
    if (jl === null) {
      var i = jl = [];
      Nu = 0, Ti = Lc(), Ci = {
        status: "pending",
        value: void 0,
        then: function(o) {
          i.push(o);
        }
      };
    }
    return Nu++, n.then(Jm, Jm), n;
  }
  function Jm() {
    if (--Nu === 0 && jl !== null) {
      Ci !== null && (Ci.status = "fulfilled");
      var t = jl;
      jl = null, Ti = 0, Ci = null;
      for (var n = 0; n < t.length; n++) (0, t[n])();
    }
  }
  function jS(t, n) {
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
  var Wm = N.S;
  N.S = function(t, n) {
    L1 = Ve(), typeof n == "object" && n !== null && typeof n.then == "function" && ES(t, n), Wm !== null && Wm(t, n);
  };
  var Ua = O(null);
  function Ou() {
    var t = Ua.current;
    return t !== null ? t : Ht.pooledCache;
  }
  function Is(t, n) {
    n === null ? tt(Ua, Ua.current) : tt(Ua, n.pool);
  }
  function Im() {
    var t = Ou();
    return t === null ? null : { parent: oe._currentValue, pool: t };
  }
  var Ei = Error(s(460)), zu = Error(s(474)), to = Error(s(542)), eo = { then: function() {
  } };
  function tp(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function ep(t, n, i) {
    switch (i = t[i], i === void 0 ? t.push(n) : i !== n && (n.then(_n, _n), n = i), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw t = n.reason, ap(t), t;
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
            throw t = n.reason, ap(t), t;
        }
        throw Ha = n, Ei;
    }
  }
  function ka(t) {
    try {
      var n = t._init;
      return n(t._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? (Ha = i, Ei) : i;
    }
  }
  var Ha = null;
  function np() {
    if (Ha === null) throw Error(s(459));
    var t = Ha;
    return Ha = null, t;
  }
  function ap(t) {
    if (t === Ei || t === to)
      throw Error(s(483));
  }
  var ji = null, Al = 0;
  function no(t) {
    var n = Al;
    return Al += 1, ji === null && (ji = []), ep(ji, t, n);
  }
  function Ml(t, n) {
    n = n.props.ref, t.ref = n !== void 0 ? n : null;
  }
  function ao(t, n) {
    throw n.$$typeof === b ? Error(s(525)) : (t = Object.prototype.toString.call(n), Error(
      s(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : t
      )
    ));
  }
  function ip(t) {
    function n(k, L) {
      if (t) {
        var q = k.deletions;
        q === null ? (k.deletions = [L], k.flags |= 16) : q.push(L);
      }
    }
    function i(k, L) {
      if (!t) return null;
      for (; L !== null; )
        n(k, L), L = L.sibling;
      return null;
    }
    function o(k) {
      for (var L = /* @__PURE__ */ new Map(); k !== null; )
        k.key !== null ? L.set(k.key, k) : L.set(k.index, k), k = k.sibling;
      return L;
    }
    function u(k, L) {
      return k = Rn(k, L), k.index = 0, k.sibling = null, k;
    }
    function d(k, L, q) {
      return k.index = q, t ? (q = k.alternate, q !== null ? (q = q.index, q < L ? (k.flags |= 67108866, L) : q) : (k.flags |= 67108866, L)) : (k.flags |= 1048576, L);
    }
    function x(k) {
      return t && k.alternate === null && (k.flags |= 67108866), k;
    }
    function C(k, L, q, J) {
      return L === null || L.tag !== 6 ? (L = wu(q, k.mode, J), L.return = k, L) : (L = u(L, q), L.return = k, L);
    }
    function z(k, L, q, J) {
      var mt = q.type;
      return mt === w ? Q(
        k,
        L,
        q.props.children,
        J,
        q.key
      ) : L !== null && (L.elementType === mt || typeof mt == "object" && mt !== null && mt.$$typeof === H && ka(mt) === L.type) ? (L = u(L, q.props), Ml(L, q), L.return = k, L) : (L = Qs(
        q.type,
        q.key,
        q.props,
        null,
        k.mode,
        J
      ), Ml(L, q), L.return = k, L);
    }
    function $(k, L, q, J) {
      return L === null || L.tag !== 4 || L.stateNode.containerInfo !== q.containerInfo || L.stateNode.implementation !== q.implementation ? (L = Tu(q, k.mode, J), L.return = k, L) : (L = u(L, q.children || []), L.return = k, L);
    }
    function Q(k, L, q, J, mt) {
      return L === null || L.tag !== 7 ? (L = za(
        q,
        k.mode,
        J,
        mt
      ), L.return = k, L) : (L = u(L, q), L.return = k, L);
    }
    function W(k, L, q) {
      if (typeof L == "string" && L !== "" || typeof L == "number" || typeof L == "bigint")
        return L = wu(
          "" + L,
          k.mode,
          q
        ), L.return = k, L;
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case T:
            return q = Qs(
              L.type,
              L.key,
              L.props,
              null,
              k.mode,
              q
            ), Ml(q, L), q.return = k, q;
          case S:
            return L = Tu(
              L,
              k.mode,
              q
            ), L.return = k, L;
          case H:
            return L = ka(L), W(k, L, q);
        }
        if (et(L) || at(L))
          return L = za(
            L,
            k.mode,
            q,
            null
          ), L.return = k, L;
        if (typeof L.then == "function")
          return W(k, no(L), q);
        if (L.$$typeof === A)
          return W(
            k,
            Ws(k, L),
            q
          );
        ao(k, L);
      }
      return null;
    }
    function G(k, L, q, J) {
      var mt = L !== null ? L.key : null;
      if (typeof q == "string" && q !== "" || typeof q == "number" || typeof q == "bigint")
        return mt !== null ? null : C(k, L, "" + q, J);
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case T:
            return q.key === mt ? z(k, L, q, J) : null;
          case S:
            return q.key === mt ? $(k, L, q, J) : null;
          case H:
            return q = ka(q), G(k, L, q, J);
        }
        if (et(q) || at(q))
          return mt !== null ? null : Q(k, L, q, J, null);
        if (typeof q.then == "function")
          return G(
            k,
            L,
            no(q),
            J
          );
        if (q.$$typeof === A)
          return G(
            k,
            L,
            Ws(k, q),
            J
          );
        ao(k, q);
      }
      return null;
    }
    function X(k, L, q, J, mt) {
      if (typeof J == "string" && J !== "" || typeof J == "number" || typeof J == "bigint")
        return k = k.get(q) || null, C(L, k, "" + J, mt);
      if (typeof J == "object" && J !== null) {
        switch (J.$$typeof) {
          case T:
            return k = k.get(
              J.key === null ? q : J.key
            ) || null, z(L, k, J, mt);
          case S:
            return k = k.get(
              J.key === null ? q : J.key
            ) || null, $(L, k, J, mt);
          case H:
            return J = ka(J), X(
              k,
              L,
              q,
              J,
              mt
            );
        }
        if (et(J) || at(J))
          return k = k.get(q) || null, Q(L, k, J, mt, null);
        if (typeof J.then == "function")
          return X(
            k,
            L,
            q,
            no(J),
            mt
          );
        if (J.$$typeof === A)
          return X(
            k,
            L,
            q,
            Ws(L, J),
            mt
          );
        ao(L, J);
      }
      return null;
    }
    function ut(k, L, q, J) {
      for (var mt = null, Dt = null, ft = L, St = L = 0, At = null; ft !== null && St < q.length; St++) {
        ft.index > St ? (At = ft, ft = null) : At = ft.sibling;
        var Rt = G(
          k,
          ft,
          q[St],
          J
        );
        if (Rt === null) {
          ft === null && (ft = At);
          break;
        }
        t && ft && Rt.alternate === null && n(k, ft), L = d(Rt, L, St), Dt === null ? mt = Rt : Dt.sibling = Rt, Dt = Rt, ft = At;
      }
      if (St === q.length)
        return i(k, ft), Mt && Nn(k, St), mt;
      if (ft === null) {
        for (; St < q.length; St++)
          ft = W(k, q[St], J), ft !== null && (L = d(
            ft,
            L,
            St
          ), Dt === null ? mt = ft : Dt.sibling = ft, Dt = ft);
        return Mt && Nn(k, St), mt;
      }
      for (ft = o(ft); St < q.length; St++)
        At = X(
          ft,
          k,
          St,
          q[St],
          J
        ), At !== null && (t && At.alternate !== null && ft.delete(
          At.key === null ? St : At.key
        ), L = d(
          At,
          L,
          St
        ), Dt === null ? mt = At : Dt.sibling = At, Dt = At);
      return t && ft.forEach(function(va) {
        return n(k, va);
      }), Mt && Nn(k, St), mt;
    }
    function gt(k, L, q, J) {
      if (q == null) throw Error(s(151));
      for (var mt = null, Dt = null, ft = L, St = L = 0, At = null, Rt = q.next(); ft !== null && !Rt.done; St++, Rt = q.next()) {
        ft.index > St ? (At = ft, ft = null) : At = ft.sibling;
        var va = G(k, ft, Rt.value, J);
        if (va === null) {
          ft === null && (ft = At);
          break;
        }
        t && ft && va.alternate === null && n(k, ft), L = d(va, L, St), Dt === null ? mt = va : Dt.sibling = va, Dt = va, ft = At;
      }
      if (Rt.done)
        return i(k, ft), Mt && Nn(k, St), mt;
      if (ft === null) {
        for (; !Rt.done; St++, Rt = q.next())
          Rt = W(k, Rt.value, J), Rt !== null && (L = d(Rt, L, St), Dt === null ? mt = Rt : Dt.sibling = Rt, Dt = Rt);
        return Mt && Nn(k, St), mt;
      }
      for (ft = o(ft); !Rt.done; St++, Rt = q.next())
        Rt = X(ft, k, St, Rt.value, J), Rt !== null && (t && Rt.alternate !== null && ft.delete(Rt.key === null ? St : Rt.key), L = d(Rt, L, St), Dt === null ? mt = Rt : Dt.sibling = Rt, Dt = Rt);
      return t && ft.forEach(function(V3) {
        return n(k, V3);
      }), Mt && Nn(k, St), mt;
    }
    function Ut(k, L, q, J) {
      if (typeof q == "object" && q !== null && q.type === w && q.key === null && (q = q.props.children), typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case T:
            t: {
              for (var mt = q.key; L !== null; ) {
                if (L.key === mt) {
                  if (mt = q.type, mt === w) {
                    if (L.tag === 7) {
                      i(
                        k,
                        L.sibling
                      ), J = u(
                        L,
                        q.props.children
                      ), J.return = k, k = J;
                      break t;
                    }
                  } else if (L.elementType === mt || typeof mt == "object" && mt !== null && mt.$$typeof === H && ka(mt) === L.type) {
                    i(
                      k,
                      L.sibling
                    ), J = u(L, q.props), Ml(J, q), J.return = k, k = J;
                    break t;
                  }
                  i(k, L);
                  break;
                } else n(k, L);
                L = L.sibling;
              }
              q.type === w ? (J = za(
                q.props.children,
                k.mode,
                J,
                q.key
              ), J.return = k, k = J) : (J = Qs(
                q.type,
                q.key,
                q.props,
                null,
                k.mode,
                J
              ), Ml(J, q), J.return = k, k = J);
            }
            return x(k);
          case S:
            t: {
              for (mt = q.key; L !== null; ) {
                if (L.key === mt)
                  if (L.tag === 4 && L.stateNode.containerInfo === q.containerInfo && L.stateNode.implementation === q.implementation) {
                    i(
                      k,
                      L.sibling
                    ), J = u(L, q.children || []), J.return = k, k = J;
                    break t;
                  } else {
                    i(k, L);
                    break;
                  }
                else n(k, L);
                L = L.sibling;
              }
              J = Tu(q, k.mode, J), J.return = k, k = J;
            }
            return x(k);
          case H:
            return q = ka(q), Ut(
              k,
              L,
              q,
              J
            );
        }
        if (et(q))
          return ut(
            k,
            L,
            q,
            J
          );
        if (at(q)) {
          if (mt = at(q), typeof mt != "function") throw Error(s(150));
          return q = mt.call(q), gt(
            k,
            L,
            q,
            J
          );
        }
        if (typeof q.then == "function")
          return Ut(
            k,
            L,
            no(q),
            J
          );
        if (q.$$typeof === A)
          return Ut(
            k,
            L,
            Ws(k, q),
            J
          );
        ao(k, q);
      }
      return typeof q == "string" && q !== "" || typeof q == "number" || typeof q == "bigint" ? (q = "" + q, L !== null && L.tag === 6 ? (i(k, L.sibling), J = u(L, q), J.return = k, k = J) : (i(k, L), J = wu(q, k.mode, J), J.return = k, k = J), x(k)) : i(k, L);
    }
    return function(k, L, q, J) {
      try {
        Al = 0;
        var mt = Ut(
          k,
          L,
          q,
          J
        );
        return ji = null, mt;
      } catch (ft) {
        if (ft === Ei || ft === to) throw ft;
        var Dt = qe(29, ft, null, k.mode);
        return Dt.lanes = J, Dt.return = k, Dt;
      } finally {
      }
    };
  }
  var qa = ip(!0), lp = ip(!1), ea = !1;
  function Lu(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Bu(t, n) {
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
      return u === null ? n.next = n : (n.next = u.next, u.next = n), o.pending = n, n = Zs(t), $m(t, null, i), n;
    }
    return Ks(t, o, n, i), Zs(t);
  }
  function _l(t, n, i) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (i & 4194048) !== 0)) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, Fh(t, i);
    }
  }
  function Vu(t, n) {
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
  var Uu = !1;
  function Dl() {
    if (Uu) {
      var t = Ci;
      if (t !== null) throw t;
    }
  }
  function Rl(t, n, i, o) {
    Uu = !1;
    var u = t.updateQueue;
    ea = !1;
    var d = u.firstBaseUpdate, x = u.lastBaseUpdate, C = u.shared.pending;
    if (C !== null) {
      u.shared.pending = null;
      var z = C, $ = z.next;
      z.next = null, x === null ? d = $ : x.next = $, x = z;
      var Q = t.alternate;
      Q !== null && (Q = Q.updateQueue, C = Q.lastBaseUpdate, C !== x && (C === null ? Q.firstBaseUpdate = $ : C.next = $, Q.lastBaseUpdate = z));
    }
    if (d !== null) {
      var W = u.baseState;
      x = 0, Q = $ = z = null, C = d;
      do {
        var G = C.lane & -536870913, X = G !== C.lane;
        if (X ? (jt & G) === G : (o & G) === G) {
          G !== 0 && G === Ti && (Uu = !0), Q !== null && (Q = Q.next = {
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
          }, Q === null ? ($ = Q = X, z = W) : Q = Q.next = X, x |= G;
        if (C = C.next, C === null) {
          if (C = u.shared.pending, C === null)
            break;
          X = C, C = X.next, X.next = null, u.lastBaseUpdate = X, u.shared.pending = null;
        }
      } while (!0);
      Q === null && (z = W), u.baseState = z, u.firstBaseUpdate = $, u.lastBaseUpdate = Q, d === null && (u.shared.lanes = 0), ra |= x, t.lanes = x, t.memoizedState = W;
    }
  }
  function sp(t, n) {
    if (typeof t != "function")
      throw Error(s(191, t));
    t.call(n);
  }
  function op(t, n) {
    var i = t.callbacks;
    if (i !== null)
      for (t.callbacks = null, t = 0; t < i.length; t++)
        sp(i[t], n);
  }
  var Ai = O(null), io = O(0);
  function rp(t, n) {
    t = Gn, tt(io, t), tt(Ai, n), Gn = t | n.baseLanes;
  }
  function ku() {
    tt(io, Gn), tt(Ai, Ai.current);
  }
  function Hu() {
    Gn = io.current, Y(Ai), Y(io);
  }
  var $e = O(null), nn = null;
  function ia(t) {
    var n = t.alternate;
    tt(ne, ne.current & 1), tt($e, t), nn === null && (n === null || Ai.current !== null || n.memoizedState !== null) && (nn = t);
  }
  function qu(t) {
    tt(ne, ne.current), tt($e, t), nn === null && (nn = t);
  }
  function up(t) {
    t.tag === 22 ? (tt(ne, ne.current), tt($e, t), nn === null && (nn = t)) : la();
  }
  function la() {
    tt(ne, ne.current), tt($e, $e.current);
  }
  function Ge(t) {
    Y($e), nn === t && (nn = null), Y(ne);
  }
  var ne = O(0);
  function lo(t) {
    for (var n = t; n !== null; ) {
      if (n.tag === 13) {
        var i = n.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || Kc(i) || Zc(i)))
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
  var Ln = 0, xt = null, Bt = null, re = null, so = !1, Mi = !1, $a = !1, oo = 0, Nl = 0, _i = null, AS = 0;
  function It() {
    throw Error(s(321));
  }
  function $u(t, n) {
    if (n === null) return !1;
    for (var i = 0; i < n.length && i < t.length; i++)
      if (!He(t[i], n[i])) return !1;
    return !0;
  }
  function Gu(t, n, i, o, u, d) {
    return Ln = d, xt = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, N.H = t === null || t.memoizedState === null ? Pp : ic, $a = !1, d = i(o, u), $a = !1, Mi && (d = fp(
      n,
      i,
      o,
      u
    )), cp(t), d;
  }
  function cp(t) {
    N.H = Ll;
    var n = Bt !== null && Bt.next !== null;
    if (Ln = 0, re = Bt = xt = null, so = !1, Nl = 0, _i = null, n) throw Error(s(300));
    t === null || ue || (t = t.dependencies, t !== null && Js(t) && (ue = !0));
  }
  function fp(t, n, i, o) {
    xt = t;
    var u = 0;
    do {
      if (Mi && (_i = null), Nl = 0, Mi = !1, 25 <= u) throw Error(s(301));
      if (u += 1, re = Bt = null, t.updateQueue != null) {
        var d = t.updateQueue;
        d.lastEffect = null, d.events = null, d.stores = null, d.memoCache != null && (d.memoCache.index = 0);
      }
      N.H = Kp, d = n(i, o);
    } while (Mi);
    return d;
  }
  function MS() {
    var t = N.H, n = t.useState()[0];
    return n = typeof n.then == "function" ? Ol(n) : n, t = t.useState()[0], (Bt !== null ? Bt.memoizedState : null) !== t && (xt.flags |= 1024), n;
  }
  function Yu() {
    var t = oo !== 0;
    return oo = 0, t;
  }
  function Xu(t, n, i) {
    n.updateQueue = t.updateQueue, n.flags &= -2053, t.lanes &= ~i;
  }
  function Pu(t) {
    if (so) {
      for (t = t.memoizedState; t !== null; ) {
        var n = t.queue;
        n !== null && (n.pending = null), t = t.next;
      }
      so = !1;
    }
    Ln = 0, re = Bt = xt = null, Mi = !1, Nl = oo = 0, _i = null;
  }
  function Ae() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return re === null ? xt.memoizedState = re = t : re = re.next = t, re;
  }
  function ae() {
    if (Bt === null) {
      var t = xt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Bt.next;
    var n = re === null ? xt.memoizedState : re.next;
    if (n !== null)
      re = n, Bt = t;
    else {
      if (t === null)
        throw xt.alternate === null ? Error(s(467)) : Error(s(310));
      Bt = t, t = {
        memoizedState: Bt.memoizedState,
        baseState: Bt.baseState,
        baseQueue: Bt.baseQueue,
        queue: Bt.queue,
        next: null
      }, re === null ? xt.memoizedState = re = t : re = re.next = t;
    }
    return re;
  }
  function ro() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ol(t) {
    var n = Nl;
    return Nl += 1, _i === null && (_i = []), t = ep(_i, t, n), n = xt, (re === null ? n.memoizedState : re.next) === null && (n = n.alternate, N.H = n === null || n.memoizedState === null ? Pp : ic), t;
  }
  function uo(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Ol(t);
      if (t.$$typeof === A) return be(t);
    }
    throw Error(s(438, String(t)));
  }
  function Ku(t) {
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
    if (n == null && (n = { data: [], index: 0 }), i === null && (i = ro(), xt.updateQueue = i), i.memoCache = n, i = n.data[n.index], i === void 0)
      for (i = n.data[n.index] = Array(t), o = 0; o < t; o++)
        i[o] = K;
    return n.index++, i;
  }
  function Bn(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function co(t) {
    var n = ae();
    return Zu(n, Bt, t);
  }
  function Zu(t, n, i) {
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
      var C = x = null, z = null, $ = n, Q = !1;
      do {
        var W = $.lane & -536870913;
        if (W !== $.lane ? (jt & W) === W : (Ln & W) === W) {
          var G = $.revertLane;
          if (G === 0)
            z !== null && (z = z.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: $.action,
              hasEagerState: $.hasEagerState,
              eagerState: $.eagerState,
              next: null
            }), W === Ti && (Q = !0);
          else if ((Ln & G) === G) {
            $ = $.next, G === Ti && (Q = !0);
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
            }, z === null ? (C = z = W, x = d) : z = z.next = W, xt.lanes |= G, ra |= G;
          W = $.action, $a && i(d, W), d = $.hasEagerState ? $.eagerState : i(d, W);
        } else
          G = {
            lane: W,
            revertLane: $.revertLane,
            gesture: $.gesture,
            action: $.action,
            hasEagerState: $.hasEagerState,
            eagerState: $.eagerState,
            next: null
          }, z === null ? (C = z = G, x = d) : z = z.next = G, xt.lanes |= W, ra |= W;
        $ = $.next;
      } while ($ !== null && $ !== n);
      if (z === null ? x = d : z.next = C, !He(d, t.memoizedState) && (ue = !0, Q && (i = Ci, i !== null)))
        throw i;
      t.memoizedState = d, t.baseState = x, t.baseQueue = z, o.lastRenderedState = d;
    }
    return u === null && (o.lanes = 0), [t.memoizedState, o.dispatch];
  }
  function Qu(t) {
    var n = ae(), i = n.queue;
    if (i === null) throw Error(s(311));
    i.lastRenderedReducer = t;
    var o = i.dispatch, u = i.pending, d = n.memoizedState;
    if (u !== null) {
      i.pending = null;
      var x = u = u.next;
      do
        d = t(d, x.action), x = x.next;
      while (x !== u);
      He(d, n.memoizedState) || (ue = !0), n.memoizedState = d, n.baseQueue === null && (n.baseState = d), i.lastRenderedState = d;
    }
    return [d, o];
  }
  function dp(t, n, i) {
    var o = xt, u = ae(), d = Mt;
    if (d) {
      if (i === void 0) throw Error(s(407));
      i = i();
    } else i = n();
    var x = !He(
      (Bt || u).memoizedState,
      i
    );
    if (x && (u.memoizedState = i, ue = !0), u = u.queue, Wu(pp.bind(null, o, u, t), [
      t
    ]), u.getSnapshot !== n || x || re !== null && re.memoizedState.tag & 1) {
      if (o.flags |= 2048, Di(
        9,
        { destroy: void 0 },
        mp.bind(
          null,
          o,
          u,
          i,
          n
        ),
        null
      ), Ht === null) throw Error(s(349));
      d || (Ln & 127) !== 0 || hp(o, n, i);
    }
    return i;
  }
  function hp(t, n, i) {
    t.flags |= 16384, t = { getSnapshot: n, value: i }, n = xt.updateQueue, n === null ? (n = ro(), xt.updateQueue = n, n.stores = [t]) : (i = n.stores, i === null ? n.stores = [t] : i.push(t));
  }
  function mp(t, n, i, o) {
    n.value = i, n.getSnapshot = o, yp(n) && gp(t);
  }
  function pp(t, n, i) {
    return i(function() {
      yp(n) && gp(t);
    });
  }
  function yp(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var i = n();
      return !He(t, i);
    } catch {
      return !0;
    }
  }
  function gp(t) {
    var n = Oa(t, 2);
    n !== null && Be(n, t, 2);
  }
  function Fu(t) {
    var n = Ae();
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
  function vp(t, n, i, o) {
    return t.baseState = i, Zu(
      t,
      Bt,
      typeof o == "function" ? o : Bn
    );
  }
  function _S(t, n, i, o, u) {
    if (mo(t)) throw Error(s(485));
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
      N.T !== null ? i(!0) : d.isTransition = !1, o(d), i = n.pending, i === null ? (d.next = n.pending = d, bp(n, d)) : (d.next = i.next, n.pending = i.next = d);
    }
  }
  function bp(t, n) {
    var i = n.action, o = n.payload, u = t.state;
    if (n.isTransition) {
      var d = N.T, x = {};
      N.T = x;
      try {
        var C = i(u, o), z = N.S;
        z !== null && z(x, C), xp(t, n, C);
      } catch ($) {
        Ju(t, n, $);
      } finally {
        d !== null && x.types !== null && (d.types = x.types), N.T = d;
      }
    } else
      try {
        d = i(u, o), xp(t, n, d);
      } catch ($) {
        Ju(t, n, $);
      }
  }
  function xp(t, n, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(o) {
        Sp(t, n, o);
      },
      function(o) {
        return Ju(t, n, o);
      }
    ) : Sp(t, n, i);
  }
  function Sp(t, n, i) {
    n.status = "fulfilled", n.value = i, wp(n), t.state = i, n = t.pending, n !== null && (i = n.next, i === n ? t.pending = null : (i = i.next, n.next = i, bp(t, i)));
  }
  function Ju(t, n, i) {
    var o = t.pending;
    if (t.pending = null, o !== null) {
      o = o.next;
      do
        n.status = "rejected", n.reason = i, wp(n), n = n.next;
      while (n !== o);
    }
    t.action = null;
  }
  function wp(t) {
    t = t.listeners;
    for (var n = 0; n < t.length; n++) (0, t[n])();
  }
  function Tp(t, n) {
    return n;
  }
  function Cp(t, n) {
    if (Mt) {
      var i = Ht.formState;
      if (i !== null) {
        t: {
          var o = xt;
          if (Mt) {
            if (Zt) {
              e: {
                for (var u = Zt, d = en; u.nodeType !== 8; ) {
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
                Zt = an(
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
    return i = Ae(), i.memoizedState = i.baseState = n, o = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Tp,
      lastRenderedState: n
    }, i.queue = o, i = Gp.bind(
      null,
      xt,
      o
    ), o.dispatch = i, o = Fu(!1), d = ac.bind(
      null,
      xt,
      !1,
      o.queue
    ), o = Ae(), u = {
      state: n,
      dispatch: null,
      action: t,
      pending: null
    }, o.queue = u, i = _S.bind(
      null,
      xt,
      u,
      d,
      i
    ), u.dispatch = i, o.memoizedState = t, [n, i, !1];
  }
  function Ep(t) {
    var n = ae();
    return jp(n, Bt, t);
  }
  function jp(t, n, i) {
    if (n = Zu(
      t,
      n,
      Tp
    )[0], t = co(Bn)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var o = Ol(n);
      } catch (x) {
        throw x === Ei ? to : x;
      }
    else o = n;
    n = ae();
    var u = n.queue, d = u.dispatch;
    return i !== n.memoizedState && (xt.flags |= 2048, Di(
      9,
      { destroy: void 0 },
      DS.bind(null, u, i),
      null
    )), [o, d, t];
  }
  function DS(t, n) {
    t.action = n;
  }
  function Ap(t) {
    var n = ae(), i = Bt;
    if (i !== null)
      return jp(n, i, t);
    ae(), n = n.memoizedState, i = ae();
    var o = i.queue.dispatch;
    return i.memoizedState = t, [n, o, !1];
  }
  function Di(t, n, i, o) {
    return t = { tag: t, create: i, deps: o, inst: n, next: null }, n = xt.updateQueue, n === null && (n = ro(), xt.updateQueue = n), i = n.lastEffect, i === null ? n.lastEffect = t.next = t : (o = i.next, i.next = t, t.next = o, n.lastEffect = t), t;
  }
  function Mp() {
    return ae().memoizedState;
  }
  function fo(t, n, i, o) {
    var u = Ae();
    xt.flags |= t, u.memoizedState = Di(
      1 | n,
      { destroy: void 0 },
      i,
      o === void 0 ? null : o
    );
  }
  function ho(t, n, i, o) {
    var u = ae();
    o = o === void 0 ? null : o;
    var d = u.memoizedState.inst;
    Bt !== null && o !== null && $u(o, Bt.memoizedState.deps) ? u.memoizedState = Di(n, d, i, o) : (xt.flags |= t, u.memoizedState = Di(
      1 | n,
      d,
      i,
      o
    ));
  }
  function _p(t, n) {
    fo(8390656, 8, t, n);
  }
  function Wu(t, n) {
    ho(2048, 8, t, n);
  }
  function RS(t) {
    xt.flags |= 4;
    var n = xt.updateQueue;
    if (n === null)
      n = ro(), xt.updateQueue = n, n.events = [t];
    else {
      var i = n.events;
      i === null ? n.events = [t] : i.push(t);
    }
  }
  function Dp(t) {
    var n = ae().memoizedState;
    return RS({ ref: n, nextImpl: t }), function() {
      if ((Nt & 2) !== 0) throw Error(s(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Rp(t, n) {
    return ho(4, 2, t, n);
  }
  function Np(t, n) {
    return ho(4, 4, t, n);
  }
  function Op(t, n) {
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
  function zp(t, n, i) {
    i = i != null ? i.concat([t]) : null, ho(4, 4, Op.bind(null, n, t), i);
  }
  function Iu() {
  }
  function Lp(t, n) {
    var i = ae();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    return n !== null && $u(n, o[1]) ? o[0] : (i.memoizedState = [t, n], t);
  }
  function Bp(t, n) {
    var i = ae();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    if (n !== null && $u(n, o[1]))
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
  function tc(t, n, i) {
    return i === void 0 || (Ln & 1073741824) !== 0 && (jt & 261930) === 0 ? t.memoizedState = n : (t.memoizedState = i, t = V1(), xt.lanes |= t, ra |= t, i);
  }
  function Vp(t, n, i, o) {
    return He(i, n) ? i : Ai.current !== null ? (t = tc(t, i, o), He(t, n) || (ue = !0), t) : (Ln & 42) === 0 || (Ln & 1073741824) !== 0 && (jt & 261930) === 0 ? (ue = !0, t.memoizedState = i) : (t = V1(), xt.lanes |= t, ra |= t, n);
  }
  function Up(t, n, i, o, u) {
    var d = V.p;
    V.p = d !== 0 && 8 > d ? d : 8;
    var x = N.T, C = {};
    N.T = C, ac(t, !1, n, i);
    try {
      var z = u(), $ = N.S;
      if ($ !== null && $(C, z), z !== null && typeof z == "object" && typeof z.then == "function") {
        var Q = jS(
          z,
          o
        );
        zl(
          t,
          n,
          Q,
          Pe(t)
        );
      } else
        zl(
          t,
          n,
          o,
          Pe(t)
        );
    } catch (W) {
      zl(
        t,
        n,
        { then: function() {
        }, status: "rejected", reason: W },
        Pe()
      );
    } finally {
      V.p = d, x !== null && C.types !== null && (x.types = C.types), N.T = x;
    }
  }
  function NS() {
  }
  function ec(t, n, i, o) {
    if (t.tag !== 5) throw Error(s(476));
    var u = kp(t).queue;
    Up(
      t,
      u,
      n,
      Z,
      i === null ? NS : function() {
        return Hp(t), i(o);
      }
    );
  }
  function kp(t) {
    var n = t.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: Z,
      baseState: Z,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Bn,
        lastRenderedState: Z
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
  function Hp(t) {
    var n = kp(t);
    n.next === null && (n = t.alternate.memoizedState), zl(
      t,
      n.next.queue,
      {},
      Pe()
    );
  }
  function nc() {
    return be(Jl);
  }
  function qp() {
    return ae().memoizedState;
  }
  function $p() {
    return ae().memoizedState;
  }
  function OS(t) {
    for (var n = t.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var i = Pe();
          t = na(i);
          var o = aa(n, t, i);
          o !== null && (Be(o, n, i), _l(o, n, i)), n = { cache: Ru() }, t.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function zS(t, n, i) {
    var o = Pe();
    i = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, mo(t) ? Yp(n, i) : (i = xu(t, n, i, o), i !== null && (Be(i, t, o), Xp(i, n, o)));
  }
  function Gp(t, n, i) {
    var o = Pe();
    zl(t, n, i, o);
  }
  function zl(t, n, i, o) {
    var u = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (mo(t)) Yp(n, u);
    else {
      var d = t.alternate;
      if (t.lanes === 0 && (d === null || d.lanes === 0) && (d = n.lastRenderedReducer, d !== null))
        try {
          var x = n.lastRenderedState, C = d(x, i);
          if (u.hasEagerState = !0, u.eagerState = C, He(C, x))
            return Ks(t, n, u, 0), Ht === null && Ps(), !1;
        } catch {
        } finally {
        }
      if (i = xu(t, n, u, o), i !== null)
        return Be(i, t, o), Xp(i, n, o), !0;
    }
    return !1;
  }
  function ac(t, n, i, o) {
    if (o = {
      lane: 2,
      revertLane: Lc(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, mo(t)) {
      if (n) throw Error(s(479));
    } else
      n = xu(
        t,
        i,
        o,
        2
      ), n !== null && Be(n, t, 2);
  }
  function mo(t) {
    var n = t.alternate;
    return t === xt || n !== null && n === xt;
  }
  function Yp(t, n) {
    Mi = so = !0;
    var i = t.pending;
    i === null ? n.next = n : (n.next = i.next, i.next = n), t.pending = n;
  }
  function Xp(t, n, i) {
    if ((i & 4194048) !== 0) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, Fh(t, i);
    }
  }
  var Ll = {
    readContext: be,
    use: uo,
    useCallback: It,
    useContext: It,
    useEffect: It,
    useImperativeHandle: It,
    useLayoutEffect: It,
    useInsertionEffect: It,
    useMemo: It,
    useReducer: It,
    useRef: It,
    useState: It,
    useDebugValue: It,
    useDeferredValue: It,
    useTransition: It,
    useSyncExternalStore: It,
    useId: It,
    useHostTransitionStatus: It,
    useFormState: It,
    useActionState: It,
    useOptimistic: It,
    useMemoCache: It,
    useCacheRefresh: It
  };
  Ll.useEffectEvent = It;
  var Pp = {
    readContext: be,
    use: uo,
    useCallback: function(t, n) {
      return Ae().memoizedState = [
        t,
        n === void 0 ? null : n
      ], t;
    },
    useContext: be,
    useEffect: _p,
    useImperativeHandle: function(t, n, i) {
      i = i != null ? i.concat([t]) : null, fo(
        4194308,
        4,
        Op.bind(null, n, t),
        i
      );
    },
    useLayoutEffect: function(t, n) {
      return fo(4194308, 4, t, n);
    },
    useInsertionEffect: function(t, n) {
      fo(4, 2, t, n);
    },
    useMemo: function(t, n) {
      var i = Ae();
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
      var o = Ae();
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
      }, o.queue = t, t = t.dispatch = zS.bind(
        null,
        xt,
        t
      ), [o.memoizedState, t];
    },
    useRef: function(t) {
      var n = Ae();
      return t = { current: t }, n.memoizedState = t;
    },
    useState: function(t) {
      t = Fu(t);
      var n = t.queue, i = Gp.bind(null, xt, n);
      return n.dispatch = i, [t.memoizedState, i];
    },
    useDebugValue: Iu,
    useDeferredValue: function(t, n) {
      var i = Ae();
      return tc(i, t, n);
    },
    useTransition: function() {
      var t = Fu(!1);
      return t = Up.bind(
        null,
        xt,
        t.queue,
        !0,
        !1
      ), Ae().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, n, i) {
      var o = xt, u = Ae();
      if (Mt) {
        if (i === void 0)
          throw Error(s(407));
        i = i();
      } else {
        if (i = n(), Ht === null)
          throw Error(s(349));
        (jt & 127) !== 0 || hp(o, n, i);
      }
      u.memoizedState = i;
      var d = { value: i, getSnapshot: n };
      return u.queue = d, _p(pp.bind(null, o, d, t), [
        t
      ]), o.flags |= 2048, Di(
        9,
        { destroy: void 0 },
        mp.bind(
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
      var t = Ae(), n = Ht.identifierPrefix;
      if (Mt) {
        var i = Sn, o = xn;
        i = (o & ~(1 << 32 - ke(o) - 1)).toString(32) + i, n = "_" + n + "R_" + i, i = oo++, 0 < i && (n += "H" + i.toString(32)), n += "_";
      } else
        i = AS++, n = "_" + n + "r_" + i.toString(32) + "_";
      return t.memoizedState = n;
    },
    useHostTransitionStatus: nc,
    useFormState: Cp,
    useActionState: Cp,
    useOptimistic: function(t) {
      var n = Ae();
      n.memoizedState = n.baseState = t;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = i, n = ac.bind(
        null,
        xt,
        !0,
        i
      ), i.dispatch = n, [t, n];
    },
    useMemoCache: Ku,
    useCacheRefresh: function() {
      return Ae().memoizedState = OS.bind(
        null,
        xt
      );
    },
    useEffectEvent: function(t) {
      var n = Ae(), i = { impl: t };
      return n.memoizedState = i, function() {
        if ((Nt & 2) !== 0)
          throw Error(s(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, ic = {
    readContext: be,
    use: uo,
    useCallback: Lp,
    useContext: be,
    useEffect: Wu,
    useImperativeHandle: zp,
    useInsertionEffect: Rp,
    useLayoutEffect: Np,
    useMemo: Bp,
    useReducer: co,
    useRef: Mp,
    useState: function() {
      return co(Bn);
    },
    useDebugValue: Iu,
    useDeferredValue: function(t, n) {
      var i = ae();
      return Vp(
        i,
        Bt.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = co(Bn)[0], n = ae().memoizedState;
      return [
        typeof t == "boolean" ? t : Ol(t),
        n
      ];
    },
    useSyncExternalStore: dp,
    useId: qp,
    useHostTransitionStatus: nc,
    useFormState: Ep,
    useActionState: Ep,
    useOptimistic: function(t, n) {
      var i = ae();
      return vp(i, Bt, t, n);
    },
    useMemoCache: Ku,
    useCacheRefresh: $p
  };
  ic.useEffectEvent = Dp;
  var Kp = {
    readContext: be,
    use: uo,
    useCallback: Lp,
    useContext: be,
    useEffect: Wu,
    useImperativeHandle: zp,
    useInsertionEffect: Rp,
    useLayoutEffect: Np,
    useMemo: Bp,
    useReducer: Qu,
    useRef: Mp,
    useState: function() {
      return Qu(Bn);
    },
    useDebugValue: Iu,
    useDeferredValue: function(t, n) {
      var i = ae();
      return Bt === null ? tc(i, t, n) : Vp(
        i,
        Bt.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = Qu(Bn)[0], n = ae().memoizedState;
      return [
        typeof t == "boolean" ? t : Ol(t),
        n
      ];
    },
    useSyncExternalStore: dp,
    useId: qp,
    useHostTransitionStatus: nc,
    useFormState: Ap,
    useActionState: Ap,
    useOptimistic: function(t, n) {
      var i = ae();
      return Bt !== null ? vp(i, Bt, t, n) : (i.baseState = t, [t, i.queue.dispatch]);
    },
    useMemoCache: Ku,
    useCacheRefresh: $p
  };
  Kp.useEffectEvent = Dp;
  function lc(t, n, i, o) {
    n = t.memoizedState, i = i(o, n), i = i == null ? n : v({}, n, i), t.memoizedState = i, t.lanes === 0 && (t.updateQueue.baseState = i);
  }
  var sc = {
    enqueueSetState: function(t, n, i) {
      t = t._reactInternals;
      var o = Pe(), u = na(o);
      u.payload = n, i != null && (u.callback = i), n = aa(t, u, o), n !== null && (Be(n, t, o), _l(n, t, o));
    },
    enqueueReplaceState: function(t, n, i) {
      t = t._reactInternals;
      var o = Pe(), u = na(o);
      u.tag = 1, u.payload = n, i != null && (u.callback = i), n = aa(t, u, o), n !== null && (Be(n, t, o), _l(n, t, o));
    },
    enqueueForceUpdate: function(t, n) {
      t = t._reactInternals;
      var i = Pe(), o = na(i);
      o.tag = 2, n != null && (o.callback = n), n = aa(t, o, i), n !== null && (Be(n, t, i), _l(n, t, i));
    }
  };
  function Zp(t, n, i, o, u, d, x) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(o, d, x) : n.prototype && n.prototype.isPureReactComponent ? !Sl(i, o) || !Sl(u, d) : !0;
  }
  function Qp(t, n, i, o) {
    t = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(i, o), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(i, o), n.state !== t && sc.enqueueReplaceState(n, n.state, null);
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
  function Fp(t) {
    Xs(t);
  }
  function Jp(t) {
    console.error(t);
  }
  function Wp(t) {
    Xs(t);
  }
  function po(t, n) {
    try {
      var i = t.onUncaughtError;
      i(n.value, { componentStack: n.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function Ip(t, n, i) {
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
  function oc(t, n, i) {
    return i = na(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      po(t, n);
    }, i;
  }
  function t1(t) {
    return t = na(t), t.tag = 3, t;
  }
  function e1(t, n, i, o) {
    var u = i.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var d = o.value;
      t.payload = function() {
        return u(d);
      }, t.callback = function() {
        Ip(n, i, o);
      };
    }
    var x = i.stateNode;
    x !== null && typeof x.componentDidCatch == "function" && (t.callback = function() {
      Ip(n, i, o), typeof u != "function" && (ua === null ? ua = /* @__PURE__ */ new Set([this]) : ua.add(this));
      var C = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: C !== null ? C : ""
      });
    });
  }
  function LS(t, n, i, o, u) {
    if (i.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (n = i.alternate, n !== null && wi(
        n,
        i,
        u,
        !0
      ), i = $e.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return nn === null ? Ao() : i.alternate === null && te === 0 && (te = 3), i.flags &= -257, i.flags |= 65536, i.lanes = u, o === eo ? i.flags |= 16384 : (n = i.updateQueue, n === null ? i.updateQueue = /* @__PURE__ */ new Set([o]) : n.add(o), Nc(t, o, u)), !1;
          case 22:
            return i.flags |= 65536, o === eo ? i.flags |= 16384 : (n = i.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, i.updateQueue = n) : (i = n.retryQueue, i === null ? n.retryQueue = /* @__PURE__ */ new Set([o]) : i.add(o)), Nc(t, o, u)), !1;
        }
        throw Error(s(435, i.tag));
      }
      return Nc(t, o, u), Ao(), !1;
    }
    if (Mt)
      return n = $e.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = u, o !== ju && (t = Error(s(422), { cause: o }), Cl(We(t, i)))) : (o !== ju && (n = Error(s(423), {
        cause: o
      }), Cl(
        We(n, i)
      )), t = t.current.alternate, t.flags |= 65536, u &= -u, t.lanes |= u, o = We(o, i), u = oc(
        t.stateNode,
        o,
        u
      ), Vu(t, u), te !== 4 && (te = 2)), !1;
    var d = Error(s(520), { cause: o });
    if (d = We(d, i), Gl === null ? Gl = [d] : Gl.push(d), te !== 4 && (te = 2), n === null) return !0;
    o = We(o, i), i = n;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, t = u & -u, i.lanes |= t, t = oc(i.stateNode, o, t), Vu(i, t), !1;
        case 1:
          if (n = i.type, d = i.stateNode, (i.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (ua === null || !ua.has(d))))
            return i.flags |= 65536, u &= -u, i.lanes |= u, u = t1(u), e1(
              u,
              t,
              i,
              o
            ), Vu(i, u), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var rc = Error(s(461)), ue = !1;
  function xe(t, n, i, o) {
    n.child = t === null ? lp(n, null, i, o) : qa(
      n,
      t.child,
      i,
      o
    );
  }
  function n1(t, n, i, o, u) {
    i = i.render;
    var d = n.ref;
    if ("ref" in o) {
      var x = {};
      for (var C in o)
        C !== "ref" && (x[C] = o[C]);
    } else x = o;
    return Va(n), o = Gu(
      t,
      n,
      i,
      x,
      d,
      u
    ), C = Yu(), t !== null && !ue ? (Xu(t, n, u), Vn(t, n, u)) : (Mt && C && Cu(n), n.flags |= 1, xe(t, n, o, u), n.child);
  }
  function a1(t, n, i, o, u) {
    if (t === null) {
      var d = i.type;
      return typeof d == "function" && !Su(d) && d.defaultProps === void 0 && i.compare === null ? (n.tag = 15, n.type = d, i1(
        t,
        n,
        d,
        o,
        u
      )) : (t = Qs(
        i.type,
        null,
        o,
        n,
        n.mode,
        u
      ), t.ref = n.ref, t.return = n, n.child = t);
    }
    if (d = t.child, !yc(t, u)) {
      var x = d.memoizedProps;
      if (i = i.compare, i = i !== null ? i : Sl, i(x, o) && t.ref === n.ref)
        return Vn(t, n, u);
    }
    return n.flags |= 1, t = Rn(d, o), t.ref = n.ref, t.return = n, n.child = t;
  }
  function i1(t, n, i, o, u) {
    if (t !== null) {
      var d = t.memoizedProps;
      if (Sl(d, o) && t.ref === n.ref)
        if (ue = !1, n.pendingProps = o = d, yc(t, u))
          (t.flags & 131072) !== 0 && (ue = !0);
        else
          return n.lanes = t.lanes, Vn(t, n, u);
    }
    return uc(
      t,
      n,
      i,
      o,
      u
    );
  }
  function l1(t, n, i, o) {
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
        return s1(
          t,
          n,
          d,
          i,
          o
        );
      }
      if ((i & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Is(
          n,
          d !== null ? d.cachePool : null
        ), d !== null ? rp(n, d) : ku(), up(n);
      else
        return o = n.lanes = 536870912, s1(
          t,
          n,
          d !== null ? d.baseLanes | i : i,
          i,
          o
        );
    } else
      d !== null ? (Is(n, d.cachePool), rp(n, d), la(), n.memoizedState = null) : (t !== null && Is(n, null), ku(), la());
    return xe(t, n, u, i), n.child;
  }
  function Bl(t, n) {
    return t !== null && t.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function s1(t, n, i, o, u) {
    var d = Ou();
    return d = d === null ? null : { parent: oe._currentValue, pool: d }, n.memoizedState = {
      baseLanes: i,
      cachePool: d
    }, t !== null && Is(n, null), ku(), up(n), t !== null && wi(t, n, o, !0), n.childLanes = u, null;
  }
  function yo(t, n) {
    return n = vo(
      { mode: n.mode, children: n.children },
      t.mode
    ), n.ref = t.ref, t.child = n, n.return = t, n;
  }
  function o1(t, n, i) {
    return qa(n, t.child, null, i), t = yo(n, n.pendingProps), t.flags |= 2, Ge(n), n.memoizedState = null, t;
  }
  function BS(t, n, i) {
    var o = n.pendingProps, u = (n.flags & 128) !== 0;
    if (n.flags &= -129, t === null) {
      if (Mt) {
        if (o.mode === "hidden")
          return t = yo(n, o), n.lanes = 536870912, Bl(null, t);
        if (qu(n), (t = Zt) ? (t = b0(
          t,
          en
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Jn !== null ? { id: xn, overflow: Sn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Ym(t), i.return = n, n.child = i, ve = n, Zt = null)) : t = null, t === null) throw In(n);
        return n.lanes = 536870912, null;
      }
      return yo(n, o);
    }
    var d = t.memoizedState;
    if (d !== null) {
      var x = d.dehydrated;
      if (qu(n), u)
        if (n.flags & 256)
          n.flags &= -257, n = o1(
            t,
            n,
            i
          );
        else if (n.memoizedState !== null)
          n.child = t.child, n.flags |= 128, n = null;
        else throw Error(s(558));
      else if (ue || wi(t, n, i, !1), u = (i & t.childLanes) !== 0, ue || u) {
        if (o = Ht, o !== null && (x = Jh(o, i), x !== 0 && x !== d.retryLane))
          throw d.retryLane = x, Oa(t, x), Be(o, t, x), rc;
        Ao(), n = o1(
          t,
          n,
          i
        );
      } else
        t = d.treeContext, Zt = an(x.nextSibling), ve = n, Mt = !0, Wn = null, en = !1, t !== null && Km(n, t), n = yo(n, o), n.flags |= 4096;
      return n;
    }
    return t = Rn(t.child, {
      mode: o.mode,
      children: o.children
    }), t.ref = n.ref, n.child = t, t.return = n, t;
  }
  function go(t, n) {
    var i = n.ref;
    if (i === null)
      t !== null && t.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(s(284));
      (t === null || t.ref !== i) && (n.flags |= 4194816);
    }
  }
  function uc(t, n, i, o, u) {
    return Va(n), i = Gu(
      t,
      n,
      i,
      o,
      void 0,
      u
    ), o = Yu(), t !== null && !ue ? (Xu(t, n, u), Vn(t, n, u)) : (Mt && o && Cu(n), n.flags |= 1, xe(t, n, i, u), n.child);
  }
  function r1(t, n, i, o, u, d) {
    return Va(n), n.updateQueue = null, i = fp(
      n,
      o,
      i,
      u
    ), cp(t), o = Yu(), t !== null && !ue ? (Xu(t, n, d), Vn(t, n, d)) : (Mt && o && Cu(n), n.flags |= 1, xe(t, n, i, d), n.child);
  }
  function u1(t, n, i, o, u) {
    if (Va(n), n.stateNode === null) {
      var d = vi, x = i.contextType;
      typeof x == "object" && x !== null && (d = be(x)), d = new i(o, d), n.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, d.updater = sc, n.stateNode = d, d._reactInternals = n, d = n.stateNode, d.props = o, d.state = n.memoizedState, d.refs = {}, Lu(n), x = i.contextType, d.context = typeof x == "object" && x !== null ? be(x) : vi, d.state = n.memoizedState, x = i.getDerivedStateFromProps, typeof x == "function" && (lc(
        n,
        i,
        x,
        o
      ), d.state = n.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (x = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), x !== d.state && sc.enqueueReplaceState(d, d.state, null), Rl(n, o, d, u), Dl(), d.state = n.memoizedState), typeof d.componentDidMount == "function" && (n.flags |= 4194308), o = !0;
    } else if (t === null) {
      d = n.stateNode;
      var C = n.memoizedProps, z = Ga(i, C);
      d.props = z;
      var $ = d.context, Q = i.contextType;
      x = vi, typeof Q == "object" && Q !== null && (x = be(Q));
      var W = i.getDerivedStateFromProps;
      Q = typeof W == "function" || typeof d.getSnapshotBeforeUpdate == "function", C = n.pendingProps !== C, Q || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (C || $ !== x) && Qp(
        n,
        d,
        o,
        x
      ), ea = !1;
      var G = n.memoizedState;
      d.state = G, Rl(n, o, d, u), Dl(), $ = n.memoizedState, C || G !== $ || ea ? (typeof W == "function" && (lc(
        n,
        i,
        W,
        o
      ), $ = n.memoizedState), (z = ea || Zp(
        n,
        i,
        z,
        o,
        G,
        $,
        x
      )) ? (Q || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = o, n.memoizedState = $), d.props = o, d.state = $, d.context = x, o = z) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), o = !1);
    } else {
      d = n.stateNode, Bu(t, n), x = n.memoizedProps, Q = Ga(i, x), d.props = Q, W = n.pendingProps, G = d.context, $ = i.contextType, z = vi, typeof $ == "object" && $ !== null && (z = be($)), C = i.getDerivedStateFromProps, ($ = typeof C == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (x !== W || G !== z) && Qp(
        n,
        d,
        o,
        z
      ), ea = !1, G = n.memoizedState, d.state = G, Rl(n, o, d, u), Dl();
      var X = n.memoizedState;
      x !== W || G !== X || ea || t !== null && t.dependencies !== null && Js(t.dependencies) ? (typeof C == "function" && (lc(
        n,
        i,
        C,
        o
      ), X = n.memoizedState), (Q = ea || Zp(
        n,
        i,
        Q,
        o,
        G,
        X,
        z
      ) || t !== null && t.dependencies !== null && Js(t.dependencies)) ? ($ || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(o, X, z), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(
        o,
        X,
        z
      )), typeof d.componentDidUpdate == "function" && (n.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || x === t.memoizedProps && G === t.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || x === t.memoizedProps && G === t.memoizedState || (n.flags |= 1024), n.memoizedProps = o, n.memoizedState = X), d.props = o, d.state = X, d.context = z, o = Q) : (typeof d.componentDidUpdate != "function" || x === t.memoizedProps && G === t.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || x === t.memoizedProps && G === t.memoizedState || (n.flags |= 1024), o = !1);
    }
    return d = o, go(t, n), o = (n.flags & 128) !== 0, d || o ? (d = n.stateNode, i = o && typeof i.getDerivedStateFromError != "function" ? null : d.render(), n.flags |= 1, t !== null && o ? (n.child = qa(
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
  function c1(t, n, i, o) {
    return La(), n.flags |= 256, xe(t, n, i, o), n.child;
  }
  var cc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function fc(t) {
    return { baseLanes: t, cachePool: Im() };
  }
  function dc(t, n, i) {
    return t = t !== null ? t.childLanes & ~i : 0, n && (t |= Xe), t;
  }
  function f1(t, n, i) {
    var o = n.pendingProps, u = !1, d = (n.flags & 128) !== 0, x;
    if ((x = d) || (x = t !== null && t.memoizedState === null ? !1 : (ne.current & 2) !== 0), x && (u = !0, n.flags &= -129), x = (n.flags & 32) !== 0, n.flags &= -33, t === null) {
      if (Mt) {
        if (u ? ia(n) : la(), (t = Zt) ? (t = b0(
          t,
          en
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: Jn !== null ? { id: xn, overflow: Sn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Ym(t), i.return = n, n.child = i, ve = n, Zt = null)) : t = null, t === null) throw In(n);
        return Zc(t) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var C = o.children;
      return o = o.fallback, u ? (la(), u = n.mode, C = vo(
        { mode: "hidden", children: C },
        u
      ), o = za(
        o,
        u,
        i,
        null
      ), C.return = n, o.return = n, C.sibling = o, n.child = C, o = n.child, o.memoizedState = fc(i), o.childLanes = dc(
        t,
        x,
        i
      ), n.memoizedState = cc, Bl(null, o)) : (ia(n), hc(n, C));
    }
    var z = t.memoizedState;
    if (z !== null && (C = z.dehydrated, C !== null)) {
      if (d)
        n.flags & 256 ? (ia(n), n.flags &= -257, n = mc(
          t,
          n,
          i
        )) : n.memoizedState !== null ? (la(), n.child = t.child, n.flags |= 128, n = null) : (la(), C = o.fallback, u = n.mode, o = vo(
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
        ), o = n.child, o.memoizedState = fc(i), o.childLanes = dc(
          t,
          x,
          i
        ), n.memoizedState = cc, n = Bl(null, o));
      else if (ia(n), Zc(C)) {
        if (x = C.nextSibling && C.nextSibling.dataset, x) var $ = x.dgst;
        x = $, o = Error(s(419)), o.stack = "", o.digest = x, Cl({ value: o, source: null, stack: null }), n = mc(
          t,
          n,
          i
        );
      } else if (ue || wi(t, n, i, !1), x = (i & t.childLanes) !== 0, ue || x) {
        if (x = Ht, x !== null && (o = Jh(x, i), o !== 0 && o !== z.retryLane))
          throw z.retryLane = o, Oa(t, o), Be(x, t, o), rc;
        Kc(C) || Ao(), n = mc(
          t,
          n,
          i
        );
      } else
        Kc(C) ? (n.flags |= 192, n.child = t.child, n = null) : (t = z.treeContext, Zt = an(
          C.nextSibling
        ), ve = n, Mt = !0, Wn = null, en = !1, t !== null && Km(n, t), n = hc(
          n,
          o.children
        ), n.flags |= 4096);
      return n;
    }
    return u ? (la(), C = o.fallback, u = n.mode, z = t.child, $ = z.sibling, o = Rn(z, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = z.subtreeFlags & 65011712, $ !== null ? C = Rn(
      $,
      C
    ) : (C = za(
      C,
      u,
      i,
      null
    ), C.flags |= 2), C.return = n, o.return = n, o.sibling = C, n.child = o, Bl(null, o), o = n.child, C = t.child.memoizedState, C === null ? C = fc(i) : (u = C.cachePool, u !== null ? (z = oe._currentValue, u = u.parent !== z ? { parent: z, pool: z } : u) : u = Im(), C = {
      baseLanes: C.baseLanes | i,
      cachePool: u
    }), o.memoizedState = C, o.childLanes = dc(
      t,
      x,
      i
    ), n.memoizedState = cc, Bl(t.child, o)) : (ia(n), i = t.child, t = i.sibling, i = Rn(i, {
      mode: "visible",
      children: o.children
    }), i.return = n, i.sibling = null, t !== null && (x = n.deletions, x === null ? (n.deletions = [t], n.flags |= 16) : x.push(t)), n.child = i, n.memoizedState = null, i);
  }
  function hc(t, n) {
    return n = vo(
      { mode: "visible", children: n },
      t.mode
    ), n.return = t, t.child = n;
  }
  function vo(t, n) {
    return t = qe(22, t, null, n), t.lanes = 0, t;
  }
  function mc(t, n, i) {
    return qa(n, t.child, null, i), t = hc(
      n,
      n.pendingProps.children
    ), t.flags |= 2, n.memoizedState = null, t;
  }
  function d1(t, n, i) {
    t.lanes |= n;
    var o = t.alternate;
    o !== null && (o.lanes |= n), _u(t.return, n, i);
  }
  function pc(t, n, i, o, u, d) {
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
  function h1(t, n, i) {
    var o = n.pendingProps, u = o.revealOrder, d = o.tail;
    o = o.children;
    var x = ne.current, C = (x & 2) !== 0;
    if (C ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, tt(ne, x), xe(t, n, o, i), o = Mt ? Tl : 0, !C && t !== null && (t.flags & 128) !== 0)
      t: for (t = n.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && d1(t, i, n);
        else if (t.tag === 19)
          d1(t, i, n);
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
          t = i.alternate, t !== null && lo(t) === null && (u = i), i = i.sibling;
        i = u, i === null ? (u = n.child, n.child = null) : (u = i.sibling, i.sibling = null), pc(
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
          if (t = u.alternate, t !== null && lo(t) === null) {
            n.child = u;
            break;
          }
          t = u.sibling, u.sibling = i, i = u, u = t;
        }
        pc(
          n,
          !0,
          i,
          null,
          d,
          o
        );
        break;
      case "together":
        pc(
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
        if (wi(
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
  function yc(t, n) {
    return (t.lanes & n) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Js(t)));
  }
  function VS(t, n, i) {
    switch (n.tag) {
      case 3:
        _t(n, n.stateNode.containerInfo), ta(n, oe, t.memoizedState.cache), La();
        break;
      case 27:
      case 5:
        Xt(n);
        break;
      case 4:
        _t(n, n.stateNode.containerInfo);
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
          return n.flags |= 128, qu(n), null;
        break;
      case 13:
        var o = n.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (ia(n), n.flags |= 128, null) : (i & n.child.childLanes) !== 0 ? f1(t, n, i) : (ia(n), t = Vn(
            t,
            n,
            i
          ), t !== null ? t.sibling : null);
        ia(n);
        break;
      case 19:
        var u = (t.flags & 128) !== 0;
        if (o = (i & n.childLanes) !== 0, o || (wi(
          t,
          n,
          i,
          !1
        ), o = (i & n.childLanes) !== 0), u) {
          if (o)
            return h1(
              t,
              n,
              i
            );
          n.flags |= 128;
        }
        if (u = n.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), tt(ne, ne.current), o) break;
        return null;
      case 22:
        return n.lanes = 0, l1(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        ta(n, oe, t.memoizedState.cache);
    }
    return Vn(t, n, i);
  }
  function m1(t, n, i) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps)
        ue = !0;
      else {
        if (!yc(t, i) && (n.flags & 128) === 0)
          return ue = !1, VS(
            t,
            n,
            i
          );
        ue = (t.flags & 131072) !== 0;
      }
    else
      ue = !1, Mt && (n.flags & 1048576) !== 0 && Pm(n, Tl, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        t: {
          var o = n.pendingProps;
          if (t = ka(n.elementType), n.type = t, typeof t == "function")
            Su(t) ? (o = Ga(t, o), n.tag = 1, n = u1(
              null,
              n,
              t,
              o,
              i
            )) : (n.tag = 0, n = uc(
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
                n.tag = 11, n = n1(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break t;
              } else if (u === _) {
                n.tag = 14, n = a1(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break t;
              }
            }
            throw n = F(t) || t, Error(s(306, n, ""));
          }
        }
        return n;
      case 0:
        return uc(
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
        ), u1(
          t,
          n,
          o,
          u,
          i
        );
      case 3:
        t: {
          if (_t(
            n,
            n.stateNode.containerInfo
          ), t === null) throw Error(s(387));
          o = n.pendingProps;
          var d = n.memoizedState;
          u = d.element, Bu(t, n), Rl(n, o, null, i);
          var x = n.memoizedState;
          if (o = x.cache, ta(n, oe, o), o !== d.cache && Du(
            n,
            [oe],
            i,
            !0
          ), Dl(), o = x.element, d.isDehydrated)
            if (d = {
              element: o,
              isDehydrated: !1,
              cache: x.cache
            }, n.updateQueue.baseState = d, n.memoizedState = d, n.flags & 256) {
              n = c1(
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
              ), Cl(u), n = c1(
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
              for (Zt = an(t.firstChild), ve = n, Mt = !0, Wn = null, en = !0, i = lp(
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
        return go(t, n), t === null ? (i = E0(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = i : Mt || (i = n.type, t = n.pendingProps, o = zo(
          ht.current
        ).createElement(i), o[ge] = n, o[De] = t, Se(o, i, t), pe(o), n.stateNode = o) : n.memoizedState = E0(
          n.type,
          t.memoizedProps,
          n.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Xt(n), t === null && Mt && (o = n.stateNode = w0(
          n.type,
          n.pendingProps,
          ht.current
        ), ve = n, en = !0, u = Zt, ha(n.type) ? (Qc = u, Zt = an(o.firstChild)) : Zt = u), xe(
          t,
          n,
          n.pendingProps.children,
          i
        ), go(t, n), t === null && (n.flags |= 4194304), n.child;
      case 5:
        return t === null && Mt && ((u = o = Zt) && (o = h3(
          o,
          n.type,
          n.pendingProps,
          en
        ), o !== null ? (n.stateNode = o, ve = n, Zt = an(o.firstChild), en = !1, u = !0) : u = !1), u || In(n)), Xt(n), u = n.type, d = n.pendingProps, x = t !== null ? t.memoizedProps : null, o = d.children, Yc(u, d) ? o = null : x !== null && Yc(u, x) && (n.flags |= 32), n.memoizedState !== null && (u = Gu(
          t,
          n,
          MS,
          null,
          null,
          i
        ), Jl._currentValue = u), go(t, n), xe(t, n, o, i), n.child;
      case 6:
        return t === null && Mt && ((t = i = Zt) && (i = m3(
          i,
          n.pendingProps,
          en
        ), i !== null ? (n.stateNode = i, ve = n, Zt = null, t = !0) : t = !1), t || In(n)), null;
      case 13:
        return f1(t, n, i);
      case 4:
        return _t(
          n,
          n.stateNode.containerInfo
        ), o = n.pendingProps, t === null ? n.child = qa(
          n,
          null,
          o,
          i
        ) : xe(t, n, o, i), n.child;
      case 11:
        return n1(
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
        return a1(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 15:
        return i1(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 19:
        return h1(t, n, i);
      case 31:
        return BS(t, n, i);
      case 22:
        return l1(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        return Va(n), o = be(oe), t === null ? (u = Ou(), u === null && (u = Ht, d = Ru(), u.pooledCache = d, d.refCount++, d !== null && (u.pooledCacheLanes |= i), u = d), n.memoizedState = { parent: o, cache: u }, Lu(n), ta(n, oe, u)) : ((t.lanes & i) !== 0 && (Bu(t, n), Rl(n, null, null, i), Dl()), u = t.memoizedState, d = n.memoizedState, u.parent !== o ? (u = { parent: o, cache: o }, n.memoizedState = u, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = u), ta(n, oe, o)) : (o = d.cache, ta(n, oe, o), o !== u.cache && Du(
          n,
          [oe],
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
  function gc(t, n, i, o, u) {
    if ((n = (t.mode & 32) !== 0) && (n = !1), n) {
      if (t.flags |= 16777216, (u & 335544128) === u)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (q1()) t.flags |= 8192;
        else
          throw Ha = eo, zu;
    } else t.flags &= -16777217;
  }
  function p1(t, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !D0(n))
      if (q1()) t.flags |= 8192;
      else
        throw Ha = eo, zu;
  }
  function bo(t, n) {
    n !== null && (t.flags |= 4), t.flags & 16384 && (n = t.tag !== 22 ? Zh() : 536870912, t.lanes |= n, zi |= n);
  }
  function Vl(t, n) {
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
  function Qt(t) {
    var n = t.alternate !== null && t.alternate.child === t.child, i = 0, o = 0;
    if (n)
      for (var u = t.child; u !== null; )
        i |= u.lanes | u.childLanes, o |= u.subtreeFlags & 65011712, o |= u.flags & 65011712, u.return = t, u = u.sibling;
    else
      for (u = t.child; u !== null; )
        i |= u.lanes | u.childLanes, o |= u.subtreeFlags, o |= u.flags, u.return = t, u = u.sibling;
    return t.subtreeFlags |= o, t.childLanes = i, n;
  }
  function US(t, n, i) {
    var o = n.pendingProps;
    switch (Eu(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Qt(n), null;
      case 1:
        return Qt(n), null;
      case 3:
        return i = n.stateNode, o = null, t !== null && (o = t.memoizedState.cache), n.memoizedState.cache !== o && (n.flags |= 2048), zn(oe), wt(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (t === null || t.child === null) && (Si(n) ? Un(n) : t === null || t.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Au())), Qt(n), null;
      case 26:
        var u = n.type, d = n.memoizedState;
        return t === null ? (Un(n), d !== null ? (Qt(n), p1(n, d)) : (Qt(n), gc(
          n,
          u,
          null,
          o,
          i
        ))) : d ? d !== t.memoizedState ? (Un(n), Qt(n), p1(n, d)) : (Qt(n), n.flags &= -16777217) : (t = t.memoizedProps, t !== o && Un(n), Qt(n), gc(
          n,
          u,
          t,
          o,
          i
        )), null;
      case 27:
        if (Pt(n), i = ht.current, u = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && Un(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(s(166));
            return Qt(n), null;
          }
          t = ot.current, Si(n) ? Zm(n) : (t = w0(u, o, i), n.stateNode = t, Un(n));
        }
        return Qt(n), null;
      case 5:
        if (Pt(n), u = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && Un(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(s(166));
            return Qt(n), null;
          }
          if (d = ot.current, Si(n))
            Zm(n);
          else {
            var x = zo(
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
            d[ge] = n, d[De] = o;
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
        return Qt(n), gc(
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
          if (t = ht.current, Si(n)) {
            if (t = n.stateNode, i = n.memoizedProps, o = null, u = ve, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  o = u.memoizedProps;
              }
            t[ge] = n, t = !!(t.nodeValue === i || o !== null && o.suppressHydrationWarning === !0 || f0(t.nodeValue, i)), t || In(n, !0);
          } else
            t = zo(t).createTextNode(
              o
            ), t[ge] = n, n.stateNode = t;
        }
        return Qt(n), null;
      case 31:
        if (i = n.memoizedState, t === null || t.memoizedState !== null) {
          if (o = Si(n), i !== null) {
            if (t === null) {
              if (!o) throw Error(s(318));
              if (t = n.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[ge] = n;
            } else
              La(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Qt(n), t = !1;
          } else
            i = Au(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = i), t = !0;
          if (!t)
            return n.flags & 256 ? (Ge(n), n) : (Ge(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(s(558));
        }
        return Qt(n), null;
      case 13:
        if (o = n.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (u = Si(n), o !== null && o.dehydrated !== null) {
            if (t === null) {
              if (!u) throw Error(s(318));
              if (u = n.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[ge] = n;
            } else
              La(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Qt(n), u = !1;
          } else
            u = Au(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return n.flags & 256 ? (Ge(n), n) : (Ge(n), null);
        }
        return Ge(n), (n.flags & 128) !== 0 ? (n.lanes = i, n) : (i = o !== null, t = t !== null && t.memoizedState !== null, i && (o = n.child, u = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (u = o.alternate.memoizedState.cachePool.pool), d = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (d = o.memoizedState.cachePool.pool), d !== u && (o.flags |= 2048)), i !== t && i && (n.child.flags |= 8192), bo(n, n.updateQueue), Qt(n), null);
      case 4:
        return wt(), t === null && kc(n.stateNode.containerInfo), Qt(n), null;
      case 10:
        return zn(n.type), Qt(n), null;
      case 19:
        if (Y(ne), o = n.memoizedState, o === null) return Qt(n), null;
        if (u = (n.flags & 128) !== 0, d = o.rendering, d === null)
          if (u) Vl(o, !1);
          else {
            if (te !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = n.child; t !== null; ) {
                if (d = lo(t), d !== null) {
                  for (n.flags |= 128, Vl(o, !1), t = d.updateQueue, n.updateQueue = t, bo(n, t), n.subtreeFlags = 0, t = i, i = n.child; i !== null; )
                    Gm(i, t), i = i.sibling;
                  return tt(
                    ne,
                    ne.current & 1 | 2
                  ), Mt && Nn(n, o.treeForkCount), n.child;
                }
                t = t.sibling;
              }
            o.tail !== null && Ve() > Co && (n.flags |= 128, u = !0, Vl(o, !1), n.lanes = 4194304);
          }
        else {
          if (!u)
            if (t = lo(d), t !== null) {
              if (n.flags |= 128, u = !0, t = t.updateQueue, n.updateQueue = t, bo(n, t), Vl(o, !0), o.tail === null && o.tailMode === "hidden" && !d.alternate && !Mt)
                return Qt(n), null;
            } else
              2 * Ve() - o.renderingStartTime > Co && i !== 536870912 && (n.flags |= 128, u = !0, Vl(o, !1), n.lanes = 4194304);
          o.isBackwards ? (d.sibling = n.child, n.child = d) : (t = o.last, t !== null ? t.sibling = d : n.child = d, o.last = d);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = Ve(), t.sibling = null, i = ne.current, tt(
          ne,
          u ? i & 1 | 2 : i & 1
        ), Mt && Nn(n, o.treeForkCount), t) : (Qt(n), null);
      case 22:
      case 23:
        return Ge(n), Hu(), o = n.memoizedState !== null, t !== null ? t.memoizedState !== null !== o && (n.flags |= 8192) : o && (n.flags |= 8192), o ? (i & 536870912) !== 0 && (n.flags & 128) === 0 && (Qt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Qt(n), i = n.updateQueue, i !== null && bo(n, i.retryQueue), i = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), o = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== i && (n.flags |= 2048), t !== null && Y(Ua), null;
      case 24:
        return i = null, t !== null && (i = t.memoizedState.cache), n.memoizedState.cache !== i && (n.flags |= 2048), zn(oe), Qt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, n.tag));
  }
  function kS(t, n) {
    switch (Eu(n), n.tag) {
      case 1:
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 3:
        return zn(oe), wt(), t = n.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (n.flags = t & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Pt(n), null;
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
        return Y(ne), null;
      case 4:
        return wt(), null;
      case 10:
        return zn(n.type), null;
      case 22:
      case 23:
        return Ge(n), Hu(), t !== null && Y(Ua), t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 24:
        return zn(oe), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function y1(t, n) {
    switch (Eu(n), n.tag) {
      case 3:
        zn(oe), wt();
        break;
      case 26:
      case 27:
      case 5:
        Pt(n);
        break;
      case 4:
        wt();
        break;
      case 31:
        n.memoizedState !== null && Ge(n);
        break;
      case 13:
        Ge(n);
        break;
      case 19:
        Y(ne);
        break;
      case 10:
        zn(n.type);
        break;
      case 22:
      case 23:
        Ge(n), Hu(), t !== null && Y(Ua);
        break;
      case 24:
        zn(oe);
    }
  }
  function Ul(t, n) {
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
              var z = i, $ = C;
              try {
                $();
              } catch (Q) {
                Lt(
                  u,
                  z,
                  Q
                );
              }
            }
          }
          o = o.next;
        } while (o !== d);
      }
    } catch (Q) {
      Lt(n, n.return, Q);
    }
  }
  function g1(t) {
    var n = t.updateQueue;
    if (n !== null) {
      var i = t.stateNode;
      try {
        op(n, i);
      } catch (o) {
        Lt(t, t.return, o);
      }
    }
  }
  function v1(t, n, i) {
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
  function kl(t, n) {
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
  function b1(t) {
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
  function vc(t, n, i) {
    try {
      var o = t.stateNode;
      o3(o, t.type, i, n), o[De] = n;
    } catch (u) {
      Lt(t, t.return, u);
    }
  }
  function x1(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && ha(t.type) || t.tag === 4;
  }
  function bc(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || x1(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && ha(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function xc(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(t, n) : (n = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, n.appendChild(t), i = i._reactRootContainer, i != null || n.onclick !== null || (n.onclick = _n));
    else if (o !== 4 && (o === 27 && ha(t.type) && (i = t.stateNode, n = null), t = t.child, t !== null))
      for (xc(t, n, i), t = t.sibling; t !== null; )
        xc(t, n, i), t = t.sibling;
  }
  function xo(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? i.insertBefore(t, n) : i.appendChild(t);
    else if (o !== 4 && (o === 27 && ha(t.type) && (i = t.stateNode), t = t.child, t !== null))
      for (xo(t, n, i), t = t.sibling; t !== null; )
        xo(t, n, i), t = t.sibling;
  }
  function S1(t) {
    var n = t.stateNode, i = t.memoizedProps;
    try {
      for (var o = t.type, u = n.attributes; u.length; )
        n.removeAttributeNode(u[0]);
      Se(n, o, i), n[ge] = t, n[De] = i;
    } catch (d) {
      Lt(t, t.return, d);
    }
  }
  var kn = !1, ce = !1, Sc = !1, w1 = typeof WeakSet == "function" ? WeakSet : Set, ye = null;
  function HS(t, n) {
    if (t = t.containerInfo, $c = qo, t = zm(t), mu(t)) {
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
            var x = 0, C = -1, z = -1, $ = 0, Q = 0, W = t, G = null;
            e: for (; ; ) {
              for (var X; W !== i || u !== 0 && W.nodeType !== 3 || (C = x + u), W !== d || o !== 0 && W.nodeType !== 3 || (z = x + o), W.nodeType === 3 && (x += W.nodeValue.length), (X = W.firstChild) !== null; )
                G = W, W = X;
              for (; ; ) {
                if (W === t) break e;
                if (G === i && ++$ === u && (C = x), G === d && ++Q === o && (z = x), (X = W.nextSibling) !== null) break;
                W = G, G = W.parentNode;
              }
              W = X;
            }
            i = C === -1 || z === -1 ? null : { start: C, end: z };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Gc = { focusedElem: t, selectionRange: i }, qo = !1, ye = n; ye !== null; )
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
                  Pc(t);
                else if (i === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Pc(t);
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
  function T1(t, n, i) {
    var o = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        qn(t, i), o & 4 && Ul(5, i);
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
        o & 64 && g1(i), o & 512 && kl(i, i.return);
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
            op(t, n);
          } catch (x) {
            Lt(i, i.return, x);
          }
        }
        break;
      case 27:
        n === null && o & 4 && S1(i);
      case 26:
      case 5:
        qn(t, i), n === null && o & 4 && b1(i), o & 512 && kl(i, i.return);
        break;
      case 12:
        qn(t, i);
        break;
      case 31:
        qn(t, i), o & 4 && j1(t, i);
        break;
      case 13:
        qn(t, i), o & 4 && A1(t, i), o & 64 && (t = i.memoizedState, t !== null && (t = t.dehydrated, t !== null && (i = QS.bind(
          null,
          i
        ), p3(t, i))));
        break;
      case 22:
        if (o = i.memoizedState !== null || kn, !o) {
          n = n !== null && n.memoizedState !== null || ce, u = kn;
          var d = ce;
          kn = o, (ce = n) && !d ? $n(
            t,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : qn(t, i), kn = u, ce = d;
        }
        break;
      case 30:
        break;
      default:
        qn(t, i);
    }
  }
  function C1(t) {
    var n = t.alternate;
    n !== null && (t.alternate = null, C1(n)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (n = t.stateNode, n !== null && Jr(n)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Ft = null, Ne = !1;
  function Hn(t, n, i) {
    for (i = i.child; i !== null; )
      E1(t, n, i), i = i.sibling;
  }
  function E1(t, n, i) {
    if (Ue && typeof Ue.onCommitFiberUnmount == "function")
      try {
        Ue.onCommitFiberUnmount(ul, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        ce || wn(i, n), Hn(
          t,
          n,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        ce || wn(i, n);
        var o = Ft, u = Ne;
        ha(i.type) && (Ft = i.stateNode, Ne = !1), Hn(
          t,
          n,
          i
        ), Zl(i.stateNode), Ft = o, Ne = u;
        break;
      case 5:
        ce || wn(i, n);
      case 6:
        if (o = Ft, u = Ne, Ft = null, Hn(
          t,
          n,
          i
        ), Ft = o, Ne = u, Ft !== null)
          if (Ne)
            try {
              (Ft.nodeType === 9 ? Ft.body : Ft.nodeName === "HTML" ? Ft.ownerDocument.body : Ft).removeChild(i.stateNode);
            } catch (d) {
              Lt(
                i,
                n,
                d
              );
            }
          else
            try {
              Ft.removeChild(i.stateNode);
            } catch (d) {
              Lt(
                i,
                n,
                d
              );
            }
        break;
      case 18:
        Ft !== null && (Ne ? (t = Ft, g0(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          i.stateNode
        ), $i(t)) : g0(Ft, i.stateNode));
        break;
      case 4:
        o = Ft, u = Ne, Ft = i.stateNode.containerInfo, Ne = !0, Hn(
          t,
          n,
          i
        ), Ft = o, Ne = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        sa(2, i, n), ce || sa(4, i, n), Hn(
          t,
          n,
          i
        );
        break;
      case 1:
        ce || (wn(i, n), o = i.stateNode, typeof o.componentWillUnmount == "function" && v1(
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
        ce = (o = ce) || i.memoizedState !== null, Hn(
          t,
          n,
          i
        ), ce = o;
        break;
      default:
        Hn(
          t,
          n,
          i
        );
    }
  }
  function j1(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        $i(t);
      } catch (i) {
        Lt(n, n.return, i);
      }
    }
  }
  function A1(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        $i(t);
      } catch (i) {
        Lt(n, n.return, i);
      }
  }
  function qS(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var n = t.stateNode;
        return n === null && (n = t.stateNode = new w1()), n;
      case 22:
        return t = t.stateNode, n = t._retryCache, n === null && (n = t._retryCache = new w1()), n;
      default:
        throw Error(s(435, t.tag));
    }
  }
  function So(t, n) {
    var i = qS(t);
    n.forEach(function(o) {
      if (!i.has(o)) {
        i.add(o);
        var u = FS.bind(null, t, o);
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
                Ft = C.stateNode, Ne = !1;
                break t;
              }
              break;
            case 5:
              Ft = C.stateNode, Ne = !1;
              break t;
            case 3:
            case 4:
              Ft = C.stateNode.containerInfo, Ne = !0;
              break t;
          }
          C = C.return;
        }
        if (Ft === null) throw Error(s(160));
        E1(d, x, u), Ft = null, Ne = !1, d = u.alternate, d !== null && (d.return = null), u.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        M1(n, t), n = n.sibling;
  }
  var cn = null;
  function M1(t, n) {
    var i = t.alternate, o = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Oe(n, t), ze(t), o & 4 && (sa(3, t, t.return), Ul(3, t), sa(5, t, t.return));
        break;
      case 1:
        Oe(n, t), ze(t), o & 512 && (ce || i === null || wn(i, i.return)), o & 64 && kn && (t = t.updateQueue, t !== null && (o = t.callbacks, o !== null && (i = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = i === null ? o : i.concat(o))));
        break;
      case 26:
        var u = cn;
        if (Oe(n, t), ze(t), o & 512 && (ce || i === null || wn(i, i.return)), o & 4) {
          var d = i !== null ? i.memoizedState : null;
          if (o = t.memoizedState, i === null)
            if (o === null)
              if (t.stateNode === null) {
                t: {
                  o = t.type, i = t.memoizedProps, u = u.ownerDocument || u;
                  e: switch (o) {
                    case "title":
                      d = u.getElementsByTagName("title")[0], (!d || d[dl] || d[ge] || d.namespaceURI === "http://www.w3.org/2000/svg" || d.hasAttribute("itemprop")) && (d = u.createElement(o), u.head.insertBefore(
                        d,
                        u.querySelector("head > title")
                      )), Se(d, o, i), d[ge] = t, pe(d), o = d;
                      break t;
                    case "link":
                      var x = M0(
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
                      if (x = M0(
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
                _0(
                  u,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = A0(
                u,
                o,
                t.memoizedProps
              );
          else
            d !== o ? (d === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : d.count--, o === null ? _0(
              u,
              t.type,
              t.stateNode
            ) : A0(
              u,
              o,
              t.memoizedProps
            )) : o === null && t.stateNode !== null && vc(
              t,
              t.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        Oe(n, t), ze(t), o & 512 && (ce || i === null || wn(i, i.return)), i !== null && o & 4 && vc(
          t,
          t.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (Oe(n, t), ze(t), o & 512 && (ce || i === null || wn(i, i.return)), t.flags & 32) {
          u = t.stateNode;
          try {
            fi(u, "");
          } catch (ut) {
            Lt(t, t.return, ut);
          }
        }
        o & 4 && t.stateNode != null && (u = t.memoizedProps, vc(
          t,
          u,
          i !== null ? i.memoizedProps : u
        )), o & 1024 && (Sc = !0);
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
        if (Vo = null, u = cn, cn = Lo(n.containerInfo), Oe(n, t), cn = u, ze(t), o & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            $i(n.containerInfo);
          } catch (ut) {
            Lt(t, t.return, ut);
          }
        Sc && (Sc = !1, _1(t));
        break;
      case 4:
        o = cn, cn = Lo(
          t.stateNode.containerInfo
        ), Oe(n, t), ze(t), cn = o;
        break;
      case 12:
        Oe(n, t), ze(t);
        break;
      case 31:
        Oe(n, t), ze(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, So(t, o)));
        break;
      case 13:
        Oe(n, t), ze(t), t.child.flags & 8192 && t.memoizedState !== null != (i !== null && i.memoizedState !== null) && (To = Ve()), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, So(t, o)));
        break;
      case 22:
        u = t.memoizedState !== null;
        var z = i !== null && i.memoizedState !== null, $ = kn, Q = ce;
        if (kn = $ || u, ce = Q || z, Oe(n, t), ce = Q, kn = $, ze(t), o & 8192)
          t: for (n = t.stateNode, n._visibility = u ? n._visibility & -2 : n._visibility | 1, u && (i === null || z || kn || ce || Ya(t)), i = null, n = t; ; ) {
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
                  u ? v0(X, !0) : v0(z.stateNode, !1);
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
        o & 4 && (o = t.updateQueue, o !== null && (i = o.retryQueue, i !== null && (o.retryQueue = null, So(t, i))));
        break;
      case 19:
        Oe(n, t), ze(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, So(t, o)));
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
          if (x1(o)) {
            i = o;
            break;
          }
          o = o.return;
        }
        if (i == null) throw Error(s(160));
        switch (i.tag) {
          case 27:
            var u = i.stateNode, d = bc(t);
            xo(t, d, u);
            break;
          case 5:
            var x = i.stateNode;
            i.flags & 32 && (fi(x, ""), i.flags &= -33);
            var C = bc(t);
            xo(t, C, x);
            break;
          case 3:
          case 4:
            var z = i.stateNode.containerInfo, $ = bc(t);
            xc(
              t,
              $,
              z
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (Q) {
        Lt(t, t.return, Q);
      }
      t.flags &= -3;
    }
    n & 4096 && (t.flags &= -4097);
  }
  function _1(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var n = t;
        _1(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), t = t.sibling;
      }
  }
  function qn(t, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        T1(t, n.alternate, n), n = n.sibling;
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
          typeof i.componentWillUnmount == "function" && v1(
            n,
            n.return,
            i
          ), Ya(n);
          break;
        case 27:
          Zl(n.stateNode);
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
          ), Ul(4, d);
          break;
        case 1:
          if ($n(
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
              var z = u.shared.hiddenCallbacks;
              if (z !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < z.length; u++)
                  sp(z[u], C);
            } catch ($) {
              Lt(o, o.return, $);
            }
          }
          i && x & 64 && g1(d), kl(d, d.return);
          break;
        case 27:
          S1(d);
        case 26:
        case 5:
          $n(
            u,
            d,
            i
          ), i && o === null && x & 4 && b1(d), kl(d, d.return);
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
          ), i && x & 4 && j1(u, d);
          break;
        case 13:
          $n(
            u,
            d,
            i
          ), i && x & 4 && A1(u, d);
          break;
        case 22:
          d.memoizedState === null && $n(
            u,
            d,
            i
          ), kl(d, d.return);
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
  function wc(t, n) {
    var i = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), t = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (t = n.memoizedState.cachePool.pool), t !== i && (t != null && t.refCount++, i != null && El(i));
  }
  function Tc(t, n) {
    t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && El(t));
  }
  function fn(t, n, i, o) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        D1(
          t,
          n,
          i,
          o
        ), n = n.sibling;
  }
  function D1(t, n, i, o) {
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
        ), u & 2048 && Ul(9, n);
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
        ), u & 2048 && (t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && El(t)));
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
        ) : Hl(t, n) : d._visibility & 2 ? fn(
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
        )), u & 2048 && wc(x, n);
        break;
      case 24:
        fn(
          t,
          n,
          i,
          o
        ), u & 2048 && Tc(n.alternate, n);
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
      var d = t, x = n, C = i, z = o, $ = x.flags;
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
          ), Ul(8, x);
          break;
        case 23:
          break;
        case 22:
          var Q = x.stateNode;
          x.memoizedState !== null ? Q._visibility & 2 ? Ri(
            d,
            x,
            C,
            z,
            u
          ) : Hl(
            d,
            x
          ) : (Q._visibility |= 2, Ri(
            d,
            x,
            C,
            z,
            u
          )), u && $ & 2048 && wc(
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
          ), u && $ & 2048 && Tc(x.alternate, x);
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
  function Hl(t, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var i = t, o = n, u = o.flags;
        switch (o.tag) {
          case 22:
            Hl(i, o), u & 2048 && wc(
              o.alternate,
              o
            );
            break;
          case 24:
            Hl(i, o), u & 2048 && Tc(o.alternate, o);
            break;
          default:
            Hl(i, o);
        }
        n = n.sibling;
      }
  }
  var ql = 8192;
  function Ni(t, n, i) {
    if (t.subtreeFlags & ql)
      for (t = t.child; t !== null; )
        R1(
          t,
          n,
          i
        ), t = t.sibling;
  }
  function R1(t, n, i) {
    switch (t.tag) {
      case 26:
        Ni(
          t,
          n,
          i
        ), t.flags & ql && t.memoizedState !== null && A3(
          i,
          cn,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        Ni(
          t,
          n,
          i
        );
        break;
      case 3:
      case 4:
        var o = cn;
        cn = Lo(t.stateNode.containerInfo), Ni(
          t,
          n,
          i
        ), cn = o;
        break;
      case 22:
        t.memoizedState === null && (o = t.alternate, o !== null && o.memoizedState !== null ? (o = ql, ql = 16777216, Ni(
          t,
          n,
          i
        ), ql = o) : Ni(
          t,
          n,
          i
        ));
        break;
      default:
        Ni(
          t,
          n,
          i
        );
    }
  }
  function N1(t) {
    var n = t.alternate;
    if (n !== null && (t = n.child, t !== null)) {
      n.child = null;
      do
        n = t.sibling, t.sibling = null, t = n;
      while (t !== null);
    }
  }
  function $l(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          ye = o, z1(
            o,
            t
          );
        }
      N1(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        O1(t), t = t.sibling;
  }
  function O1(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        $l(t), t.flags & 2048 && sa(9, t, t.return);
        break;
      case 3:
        $l(t);
        break;
      case 12:
        $l(t);
        break;
      case 22:
        var n = t.stateNode;
        t.memoizedState !== null && n._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (n._visibility &= -3, wo(t)) : $l(t);
        break;
      default:
        $l(t);
    }
  }
  function wo(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          ye = o, z1(
            o,
            t
          );
        }
      N1(t);
    }
    for (t = t.child; t !== null; ) {
      switch (n = t, n.tag) {
        case 0:
        case 11:
        case 15:
          sa(8, n, n.return), wo(n);
          break;
        case 22:
          i = n.stateNode, i._visibility & 2 && (i._visibility &= -3, wo(n));
          break;
        default:
          wo(n);
      }
      t = t.sibling;
    }
  }
  function z1(t, n) {
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
          El(i.memoizedState.cache);
      }
      if (o = i.child, o !== null) o.return = i, ye = o;
      else
        t: for (i = t; ye !== null; ) {
          o = ye;
          var u = o.sibling, d = o.return;
          if (C1(o), o === i) {
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
  var $S = {
    getCacheForType: function(t) {
      var n = be(oe), i = n.data.get(t);
      return i === void 0 && (i = t(), n.data.set(t, i)), i;
    },
    cacheSignal: function() {
      return be(oe).controller.signal;
    }
  }, GS = typeof WeakMap == "function" ? WeakMap : Map, Nt = 0, Ht = null, Ct = null, jt = 0, zt = 0, Ye = null, oa = !1, Oi = !1, Cc = !1, Gn = 0, te = 0, ra = 0, Xa = 0, Ec = 0, Xe = 0, zi = 0, Gl = null, Le = null, jc = !1, To = 0, L1 = 0, Co = 1 / 0, Eo = null, ua = null, de = 0, ca = null, Li = null, Yn = 0, Ac = 0, Mc = null, B1 = null, Yl = 0, _c = null;
  function Pe() {
    return (Nt & 2) !== 0 && jt !== 0 ? jt & -jt : N.T !== null ? Lc() : Wh();
  }
  function V1() {
    if (Xe === 0)
      if ((jt & 536870912) === 0 || Mt) {
        var t = Ns;
        Ns <<= 1, (Ns & 3932160) === 0 && (Ns = 262144), Xe = t;
      } else Xe = 536870912;
    return t = $e.current, t !== null && (t.flags |= 32), Xe;
  }
  function Be(t, n, i) {
    (t === Ht && (zt === 2 || zt === 9) || t.cancelPendingCommit !== null) && (Bi(t, 0), fa(
      t,
      jt,
      Xe,
      !1
    )), fl(t, i), ((Nt & 2) === 0 || t !== Ht) && (t === Ht && ((Nt & 2) === 0 && (Xa |= i), te === 4 && fa(
      t,
      jt,
      Xe,
      !1
    )), Tn(t));
  }
  function U1(t, n, i) {
    if ((Nt & 6) !== 0) throw Error(s(327));
    var o = !i && (n & 127) === 0 && (n & t.expiredLanes) === 0 || cl(t, n), u = o ? PS(t, n) : Rc(t, n, !0), d = o;
    do {
      if (u === 0) {
        Oi && !o && fa(t, n, 0, !1);
        break;
      } else {
        if (i = t.current.alternate, d && !YS(i)) {
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
              u = Gl;
              var z = C.current.memoizedState.isDehydrated;
              if (z && (Bi(C, x).flags |= 256), x = Rc(
                C,
                x,
                !1
              ), x !== 2) {
                if (Cc && !z) {
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
          Bi(t, 0), fa(t, n, 0, !0);
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
          if ((n & 62914560) === n && (u = To + 300 - Ve(), 10 < u)) {
            if (fa(
              o,
              n,
              Xe,
              !oa
            ), zs(o, 0, !0) !== 0) break t;
            Yn = n, o.timeoutHandle = p0(
              k1.bind(
                null,
                o,
                i,
                Le,
                Eo,
                jc,
                n,
                Xe,
                Xa,
                zi,
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
          k1(
            o,
            i,
            Le,
            Eo,
            jc,
            n,
            Xe,
            Xa,
            zi,
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
  function k1(t, n, i, o, u, d, x, C, z, $, Q, W, G, X) {
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
      }, R1(
        n,
        d,
        W
      );
      var ut = (d & 62914560) === d ? To - Ve() : (d & 4194048) === d ? L1 - Ve() : 0;
      if (ut = M3(
        W,
        ut
      ), ut !== null) {
        Yn = d, t.cancelPendingCommit = ut(
          K1.bind(
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
            Q,
            W,
            null,
            G,
            X
          )
        ), fa(t, d, x, !$);
        return;
      }
    }
    K1(
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
  function YS(t) {
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
    n &= ~Ec, n &= ~Xa, t.suspendedLanes |= n, t.pingedLanes &= ~n, o && (t.warmLanes |= n), o = t.expirationTimes;
    for (var u = n; 0 < u; ) {
      var d = 31 - ke(u), x = 1 << d;
      o[d] = -1, u &= ~x;
    }
    i !== 0 && Qh(t, i, n);
  }
  function jo() {
    return (Nt & 6) === 0 ? (Xl(0), !1) : !0;
  }
  function Dc() {
    if (Ct !== null) {
      if (zt === 0)
        var t = Ct.return;
      else
        t = Ct, On = Ba = null, Pu(t), ji = null, Al = 0, t = Ct;
      for (; t !== null; )
        y1(t.alternate, t), t = t.return;
      Ct = null;
    }
  }
  function Bi(t, n) {
    var i = t.timeoutHandle;
    i !== -1 && (t.timeoutHandle = -1, c3(i)), i = t.cancelPendingCommit, i !== null && (t.cancelPendingCommit = null, i()), Yn = 0, Dc(), Ht = t, Ct = i = Rn(t.current, null), jt = n, zt = 0, Ye = null, oa = !1, Oi = cl(t, n), Cc = !1, zi = Xe = Ec = Xa = ra = te = 0, Le = Gl = null, jc = !1, (n & 8) !== 0 && (n |= n & 32);
    var o = t.entangledLanes;
    if (o !== 0)
      for (t = t.entanglements, o &= n; 0 < o; ) {
        var u = 31 - ke(o), d = 1 << u;
        n |= t[u], o &= ~d;
      }
    return Gn = n, Ps(), i;
  }
  function H1(t, n) {
    xt = null, N.H = Ll, n === Ei || n === to ? (n = np(), zt = 3) : n === zu ? (n = np(), zt = 4) : zt = n === rc ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Ye = n, Ct === null && (te = 1, po(
      t,
      We(n, t.current)
    ));
  }
  function q1() {
    var t = $e.current;
    return t === null ? !0 : (jt & 4194048) === jt ? nn === null : (jt & 62914560) === jt || (jt & 536870912) !== 0 ? t === nn : !1;
  }
  function $1() {
    var t = N.H;
    return N.H = Ll, t === null ? Ll : t;
  }
  function G1() {
    var t = N.A;
    return N.A = $S, t;
  }
  function Ao() {
    te = 4, oa || (jt & 4194048) !== jt && $e.current !== null || (Oi = !0), (ra & 134217727) === 0 && (Xa & 134217727) === 0 || Ht === null || fa(
      Ht,
      jt,
      Xe,
      !1
    );
  }
  function Rc(t, n, i) {
    var o = Nt;
    Nt |= 2;
    var u = $1(), d = G1();
    (Ht !== t || jt !== n) && (Eo = null, Bi(t, n)), n = !1;
    var x = te;
    t: do
      try {
        if (zt !== 0 && Ct !== null) {
          var C = Ct, z = Ye;
          switch (zt) {
            case 8:
              Dc(), x = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              $e.current === null && (n = !0);
              var $ = zt;
              if (zt = 0, Ye = null, Vi(t, C, z, $), i && Oi) {
                x = 0;
                break t;
              }
              break;
            default:
              $ = zt, zt = 0, Ye = null, Vi(t, C, z, $);
          }
        }
        XS(), x = te;
        break;
      } catch (Q) {
        H1(t, Q);
      }
    while (!0);
    return n && t.shellSuspendCounter++, On = Ba = null, Nt = o, N.H = u, N.A = d, Ct === null && (Ht = null, jt = 0, Ps()), x;
  }
  function XS() {
    for (; Ct !== null; ) Y1(Ct);
  }
  function PS(t, n) {
    var i = Nt;
    Nt |= 2;
    var o = $1(), u = G1();
    Ht !== t || jt !== n ? (Eo = null, Co = Ve() + 500, Bi(t, n)) : Oi = cl(
      t,
      n
    );
    t: do
      try {
        if (zt !== 0 && Ct !== null) {
          n = Ct;
          var d = Ye;
          e: switch (zt) {
            case 1:
              zt = 0, Ye = null, Vi(t, n, d, 1);
              break;
            case 2:
            case 9:
              if (tp(d)) {
                zt = 0, Ye = null, X1(n);
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
              tp(d) ? (zt = 0, Ye = null, X1(n)) : (zt = 0, Ye = null, Vi(t, n, d, 7));
              break;
            case 5:
              var x = null;
              switch (Ct.tag) {
                case 26:
                  x = Ct.memoizedState;
                case 5:
                case 27:
                  var C = Ct;
                  if (x ? D0(x) : C.stateNode.complete) {
                    zt = 0, Ye = null;
                    var z = C.sibling;
                    if (z !== null) Ct = z;
                    else {
                      var $ = C.return;
                      $ !== null ? (Ct = $, Mo($)) : Ct = null;
                    }
                    break e;
                  }
              }
              zt = 0, Ye = null, Vi(t, n, d, 5);
              break;
            case 6:
              zt = 0, Ye = null, Vi(t, n, d, 6);
              break;
            case 8:
              Dc(), te = 6;
              break t;
            default:
              throw Error(s(462));
          }
        }
        KS();
        break;
      } catch (Q) {
        H1(t, Q);
      }
    while (!0);
    return On = Ba = null, N.H = o, N.A = u, Nt = i, Ct !== null ? 0 : (Ht = null, jt = 0, Ps(), te);
  }
  function KS() {
    for (; Ct !== null && !ii(); )
      Y1(Ct);
  }
  function Y1(t) {
    var n = m1(t.alternate, t, Gn);
    t.memoizedProps = t.pendingProps, n === null ? Mo(t) : Ct = n;
  }
  function X1(t) {
    var n = t, i = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = r1(
          i,
          n,
          n.pendingProps,
          n.type,
          void 0,
          jt
        );
        break;
      case 11:
        n = r1(
          i,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          jt
        );
        break;
      case 5:
        Pu(n);
      default:
        y1(i, n), n = Ct = Gm(n, Gn), n = m1(i, n, Gn);
    }
    t.memoizedProps = t.pendingProps, n === null ? Mo(t) : Ct = n;
  }
  function Vi(t, n, i, o) {
    On = Ba = null, Pu(n), ji = null, Al = 0;
    var u = n.return;
    try {
      if (LS(
        t,
        u,
        n,
        i,
        jt
      )) {
        te = 1, po(
          t,
          We(i, t.current)
        ), Ct = null;
        return;
      }
    } catch (d) {
      if (u !== null) throw Ct = u, d;
      te = 1, po(
        t,
        We(i, t.current)
      ), Ct = null;
      return;
    }
    n.flags & 32768 ? (Mt || o === 1 ? t = !0 : Oi || (jt & 536870912) !== 0 ? t = !1 : (oa = t = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = $e.current, o !== null && o.tag === 13 && (o.flags |= 16384))), P1(n, t)) : Mo(n);
  }
  function Mo(t) {
    var n = t;
    do {
      if ((n.flags & 32768) !== 0) {
        P1(
          n,
          oa
        );
        return;
      }
      t = n.return;
      var i = US(
        n.alternate,
        n,
        Gn
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
    te === 0 && (te = 5);
  }
  function P1(t, n) {
    do {
      var i = kS(t.alternate, t);
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
    te = 6, Ct = null;
  }
  function K1(t, n, i, o, u, d, x, C, z) {
    t.cancelPendingCommit = null;
    do
      _o();
    while (de !== 0);
    if ((Nt & 6) !== 0) throw Error(s(327));
    if (n !== null) {
      if (n === t.current) throw Error(s(177));
      if (d = n.lanes | n.childLanes, d |= bu, jx(
        t,
        i,
        d,
        x,
        C,
        z
      ), t === Ht && (Ct = Ht = null, jt = 0), Li = n, ca = t, Yn = i, Ac = d, Mc = u, B1 = o, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, JS(Ds, function() {
        return W1(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), o = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || o) {
        o = N.T, N.T = null, u = V.p, V.p = 2, x = Nt, Nt |= 4;
        try {
          HS(t, n, i);
        } finally {
          Nt = x, V.p = u, N.T = o;
        }
      }
      de = 1, Z1(), Q1(), F1();
    }
  }
  function Z1() {
    if (de === 1) {
      de = 0;
      var t = ca, n = Li, i = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || i) {
        i = N.T, N.T = null;
        var o = V.p;
        V.p = 2;
        var u = Nt;
        Nt |= 4;
        try {
          M1(n, t);
          var d = Gc, x = zm(t.containerInfo), C = d.focusedElem, z = d.selectionRange;
          if (x !== C && C && C.ownerDocument && Om(
            C.ownerDocument.documentElement,
            C
          )) {
            if (z !== null && mu(C)) {
              var $ = z.start, Q = z.end;
              if (Q === void 0 && (Q = $), "selectionStart" in C)
                C.selectionStart = $, C.selectionEnd = Math.min(
                  Q,
                  C.value.length
                );
              else {
                var W = C.ownerDocument || document, G = W && W.defaultView || window;
                if (G.getSelection) {
                  var X = G.getSelection(), ut = C.textContent.length, gt = Math.min(z.start, ut), Ut = z.end === void 0 ? gt : Math.min(z.end, ut);
                  !X.extend && gt > Ut && (x = Ut, Ut = gt, gt = x);
                  var k = Nm(
                    C,
                    gt
                  ), L = Nm(
                    C,
                    Ut
                  );
                  if (k && L && (X.rangeCount !== 1 || X.anchorNode !== k.node || X.anchorOffset !== k.offset || X.focusNode !== L.node || X.focusOffset !== L.offset)) {
                    var q = W.createRange();
                    q.setStart(k.node, k.offset), X.removeAllRanges(), gt > Ut ? (X.addRange(q), X.extend(L.node, L.offset)) : (q.setEnd(L.node, L.offset), X.addRange(q));
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
              var J = W[C];
              J.element.scrollLeft = J.left, J.element.scrollTop = J.top;
            }
          }
          qo = !!$c, Gc = $c = null;
        } finally {
          Nt = u, V.p = o, N.T = i;
        }
      }
      t.current = n, de = 2;
    }
  }
  function Q1() {
    if (de === 2) {
      de = 0;
      var t = ca, n = Li, i = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || i) {
        i = N.T, N.T = null;
        var o = V.p;
        V.p = 2;
        var u = Nt;
        Nt |= 4;
        try {
          T1(t, n.alternate, n);
        } finally {
          Nt = u, V.p = o, N.T = i;
        }
      }
      de = 3;
    }
  }
  function F1() {
    if (de === 4 || de === 3) {
      de = 0, gx();
      var t = ca, n = Li, i = Yn, o = B1;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? de = 5 : (de = 0, Li = ca = null, J1(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (u === 0 && (ua = null), Qr(i), n = n.stateNode, Ue && typeof Ue.onCommitFiberRoot == "function")
        try {
          Ue.onCommitFiberRoot(
            ul,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (o !== null) {
        n = N.T, u = V.p, V.p = 2, N.T = null;
        try {
          for (var d = t.onRecoverableError, x = 0; x < o.length; x++) {
            var C = o[x];
            d(C.value, {
              componentStack: C.stack
            });
          }
        } finally {
          N.T = n, V.p = u;
        }
      }
      (Yn & 3) !== 0 && _o(), Tn(t), u = t.pendingLanes, (i & 261930) !== 0 && (u & 42) !== 0 ? t === _c ? Yl++ : (Yl = 0, _c = t) : Yl = 0, Xl(0);
    }
  }
  function J1(t, n) {
    (t.pooledCacheLanes &= n) === 0 && (n = t.pooledCache, n != null && (t.pooledCache = null, El(n)));
  }
  function _o() {
    return Z1(), Q1(), F1(), W1();
  }
  function W1() {
    if (de !== 5) return !1;
    var t = ca, n = Ac;
    Ac = 0;
    var i = Qr(Yn), o = N.T, u = V.p;
    try {
      V.p = 32 > i ? 32 : i, N.T = null, i = Mc, Mc = null;
      var d = ca, x = Yn;
      if (de = 0, Li = ca = null, Yn = 0, (Nt & 6) !== 0) throw Error(s(331));
      var C = Nt;
      if (Nt |= 4, O1(d.current), D1(
        d,
        d.current,
        x,
        i
      ), Nt = C, Xl(0, !1), Ue && typeof Ue.onPostCommitFiberRoot == "function")
        try {
          Ue.onPostCommitFiberRoot(ul, d);
        } catch {
        }
      return !0;
    } finally {
      V.p = u, N.T = o, J1(t, n);
    }
  }
  function I1(t, n, i) {
    n = We(i, n), n = oc(t.stateNode, n, 2), t = aa(t, n, 2), t !== null && (fl(t, 2), Tn(t));
  }
  function Lt(t, n, i) {
    if (t.tag === 3)
      I1(t, t, i);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          I1(
            n,
            t,
            i
          );
          break;
        } else if (n.tag === 1) {
          var o = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (ua === null || !ua.has(o))) {
            t = We(i, t), i = t1(2), o = aa(n, i, 2), o !== null && (e1(
              i,
              o,
              n,
              t
            ), fl(o, 2), Tn(o));
            break;
          }
        }
        n = n.return;
      }
  }
  function Nc(t, n, i) {
    var o = t.pingCache;
    if (o === null) {
      o = t.pingCache = new GS();
      var u = /* @__PURE__ */ new Set();
      o.set(n, u);
    } else
      u = o.get(n), u === void 0 && (u = /* @__PURE__ */ new Set(), o.set(n, u));
    u.has(i) || (Cc = !0, u.add(i), t = ZS.bind(null, t, n, i), n.then(t, t));
  }
  function ZS(t, n, i) {
    var o = t.pingCache;
    o !== null && o.delete(n), t.pingedLanes |= t.suspendedLanes & i, t.warmLanes &= ~i, Ht === t && (jt & i) === i && (te === 4 || te === 3 && (jt & 62914560) === jt && 300 > Ve() - To ? (Nt & 2) === 0 && Bi(t, 0) : Ec |= i, zi === jt && (zi = 0)), Tn(t);
  }
  function t0(t, n) {
    n === 0 && (n = Zh()), t = Oa(t, n), t !== null && (fl(t, n), Tn(t));
  }
  function QS(t) {
    var n = t.memoizedState, i = 0;
    n !== null && (i = n.retryLane), t0(t, i);
  }
  function FS(t, n) {
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
    o !== null && o.delete(n), t0(t, i);
  }
  function JS(t, n) {
    return rt(t, n);
  }
  var Do = null, Ui = null, Oc = !1, Ro = !1, zc = !1, da = 0;
  function Tn(t) {
    t !== Ui && t.next === null && (Ui === null ? Do = Ui = t : Ui = Ui.next = t), Ro = !0, Oc || (Oc = !0, IS());
  }
  function Xl(t, n) {
    if (!zc && Ro) {
      zc = !0;
      do
        for (var i = !1, o = Do; o !== null; ) {
          if (t !== 0) {
            var u = o.pendingLanes;
            if (u === 0) var d = 0;
            else {
              var x = o.suspendedLanes, C = o.pingedLanes;
              d = (1 << 31 - ke(42 | t) + 1) - 1, d &= u & ~(x & ~C), d = d & 201326741 ? d & 201326741 | 1 : d ? d | 2 : 0;
            }
            d !== 0 && (i = !0, i0(o, d));
          } else
            d = jt, d = zs(
              o,
              o === Ht ? d : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (d & 3) === 0 || cl(o, d) || (i = !0, i0(o, d));
          o = o.next;
        }
      while (i);
      zc = !1;
    }
  }
  function WS() {
    e0();
  }
  function e0() {
    Ro = Oc = !1;
    var t = 0;
    da !== 0 && u3() && (t = da);
    for (var n = Ve(), i = null, o = Do; o !== null; ) {
      var u = o.next, d = n0(o, n);
      d === 0 ? (o.next = null, i === null ? Do = u : i.next = u, u === null && (Ui = i)) : (i = o, (t !== 0 || (d & 3) !== 0) && (Ro = !0)), o = u;
    }
    de !== 0 && de !== 5 || Xl(t), da !== 0 && (da = 0);
  }
  function n0(t, n) {
    for (var i = t.suspendedLanes, o = t.pingedLanes, u = t.expirationTimes, d = t.pendingLanes & -62914561; 0 < d; ) {
      var x = 31 - ke(d), C = 1 << x, z = u[x];
      z === -1 ? ((C & i) === 0 || (C & o) !== 0) && (u[x] = Ex(C, n)) : z <= n && (t.expiredLanes |= C), d &= ~C;
    }
    if (n = Ht, i = jt, i = zs(
      t,
      t === n ? i : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o = t.callbackNode, i === 0 || t === n && (zt === 2 || zt === 9) || t.cancelPendingCommit !== null)
      return o !== null && o !== null && Kt(o), t.callbackNode = null, t.callbackPriority = 0;
    if ((i & 3) === 0 || cl(t, i)) {
      if (n = i & -i, n === t.callbackPriority) return n;
      switch (o !== null && Kt(o), Qr(i)) {
        case 2:
        case 8:
          i = Ph;
          break;
        case 32:
          i = Ds;
          break;
        case 268435456:
          i = Kh;
          break;
        default:
          i = Ds;
      }
      return o = a0.bind(null, t), i = rt(i, o), t.callbackPriority = n, t.callbackNode = i, n;
    }
    return o !== null && o !== null && Kt(o), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function a0(t, n) {
    if (de !== 0 && de !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var i = t.callbackNode;
    if (_o() && t.callbackNode !== i)
      return null;
    var o = jt;
    return o = zs(
      t,
      t === Ht ? o : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o === 0 ? null : (U1(t, o, n), n0(t, Ve()), t.callbackNode != null && t.callbackNode === i ? a0.bind(null, t) : null);
  }
  function i0(t, n) {
    if (_o()) return null;
    U1(t, n, !0);
  }
  function IS() {
    f3(function() {
      (Nt & 6) !== 0 ? rt(
        Xh,
        WS
      ) : e0();
    });
  }
  function Lc() {
    if (da === 0) {
      var t = Ti;
      t === 0 && (t = Rs, Rs <<= 1, (Rs & 261888) === 0 && (Rs = 256)), da = t;
    }
    return da;
  }
  function l0(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Us("" + t);
  }
  function s0(t, n) {
    var i = n.ownerDocument.createElement("input");
    return i.name = n.name, i.value = n.value, t.id && i.setAttribute("form", t.id), n.parentNode.insertBefore(i, n), t = new FormData(t), i.parentNode.removeChild(i), t;
  }
  function t3(t, n, i, o, u) {
    if (n === "submit" && i && i.stateNode === u) {
      var d = l0(
        (u[De] || null).action
      ), x = o.submitter;
      x && (n = (n = x[De] || null) ? l0(n.formAction) : x.getAttribute("formAction"), n !== null && (d = n, x = null));
      var C = new $s(
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
                  var z = x ? s0(u, x) : new FormData(u);
                  ec(
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
                typeof d == "function" && (C.preventDefault(), z = x ? s0(u, x) : new FormData(u), ec(
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
  for (var Bc = 0; Bc < vu.length; Bc++) {
    var Vc = vu[Bc], e3 = Vc.toLowerCase(), n3 = Vc[0].toUpperCase() + Vc.slice(1);
    un(
      e3,
      "on" + n3
    );
  }
  un(Vm, "onAnimationEnd"), un(Um, "onAnimationIteration"), un(km, "onAnimationStart"), un("dblclick", "onDoubleClick"), un("focusin", "onFocus"), un("focusout", "onBlur"), un(vS, "onTransitionRun"), un(bS, "onTransitionStart"), un(xS, "onTransitionCancel"), un(Hm, "onTransitionEnd"), ui("onMouseEnter", ["mouseout", "mouseover"]), ui("onMouseLeave", ["mouseout", "mouseover"]), ui("onPointerEnter", ["pointerout", "pointerover"]), ui("onPointerLeave", ["pointerout", "pointerover"]), _a(
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
  var Pl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), a3 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Pl)
  );
  function o0(t, n) {
    n = (n & 4) !== 0;
    for (var i = 0; i < t.length; i++) {
      var o = t[i], u = o.event;
      o = o.listeners;
      t: {
        var d = void 0;
        if (n)
          for (var x = o.length - 1; 0 <= x; x--) {
            var C = o[x], z = C.instance, $ = C.currentTarget;
            if (C = C.listener, z !== d && u.isPropagationStopped())
              break t;
            d = C, u.currentTarget = $;
            try {
              d(u);
            } catch (Q) {
              Xs(Q);
            }
            u.currentTarget = null, d = z;
          }
        else
          for (x = 0; x < o.length; x++) {
            if (C = o[x], z = C.instance, $ = C.currentTarget, C = C.listener, z !== d && u.isPropagationStopped())
              break t;
            d = C, u.currentTarget = $;
            try {
              d(u);
            } catch (Q) {
              Xs(Q);
            }
            u.currentTarget = null, d = z;
          }
      }
    }
  }
  function Et(t, n) {
    var i = n[Fr];
    i === void 0 && (i = n[Fr] = /* @__PURE__ */ new Set());
    var o = t + "__bubble";
    i.has(o) || (r0(n, t, 2, !1), i.add(o));
  }
  function Uc(t, n, i) {
    var o = 0;
    n && (o |= 4), r0(
      i,
      t,
      o,
      n
    );
  }
  var No = "_reactListening" + Math.random().toString(36).slice(2);
  function kc(t) {
    if (!t[No]) {
      t[No] = !0, em.forEach(function(i) {
        i !== "selectionchange" && (a3.has(i) || Uc(i, !1, t), Uc(i, !0, t));
      });
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[No] || (n[No] = !0, Uc("selectionchange", !1, n));
    }
  }
  function r0(t, n, i, o) {
    switch (V0(n)) {
      case 2:
        var u = R3;
        break;
      case 8:
        u = N3;
        break;
      default:
        u = tf;
    }
    i = u.bind(
      null,
      n,
      i,
      t
    ), u = void 0, !lu || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (u = !0), o ? u !== void 0 ? t.addEventListener(n, i, {
      capture: !0,
      passive: u
    }) : t.addEventListener(n, i, !0) : u !== void 0 ? t.addEventListener(n, i, {
      passive: u
    }) : t.addEventListener(n, i, !1);
  }
  function Hc(t, n, i, o, u) {
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
            if (x = si(C), x === null) return;
            if (z = x.tag, z === 5 || z === 6 || z === 26 || z === 27) {
              o = d = x;
              continue t;
            }
            C = C.parentNode;
          }
        }
        o = o.return;
      }
    hm(function() {
      var $ = d, Q = au(i), W = [];
      t: {
        var G = qm.get(t);
        if (G !== void 0) {
          var X = $s, ut = t;
          switch (t) {
            case "keypress":
              if (Hs(i) === 0) break t;
            case "keydown":
            case "keyup":
              X = Fx;
              break;
            case "focusin":
              ut = "focus", X = uu;
              break;
            case "focusout":
              ut = "blur", X = uu;
              break;
            case "beforeblur":
            case "afterblur":
              X = uu;
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
              X = ym;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              X = Ux;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              X = Ix;
              break;
            case Vm:
            case Um:
            case km:
              X = qx;
              break;
            case Hm:
              X = eS;
              break;
            case "scroll":
            case "scrollend":
              X = Bx;
              break;
            case "wheel":
              X = aS;
              break;
            case "copy":
            case "cut":
            case "paste":
              X = Gx;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              X = vm;
              break;
            case "toggle":
            case "beforetoggle":
              X = lS;
          }
          var gt = (n & 4) !== 0, Ut = !gt && (t === "scroll" || t === "scrollend"), k = gt ? G !== null ? G + "Capture" : null : G;
          gt = [];
          for (var L = $, q; L !== null; ) {
            var J = L;
            if (q = J.stateNode, J = J.tag, J !== 5 && J !== 26 && J !== 27 || q === null || k === null || (J = ml(L, k), J != null && gt.push(
              Kl(L, J, q)
            )), Ut) break;
            L = L.return;
          }
          0 < gt.length && (G = new X(
            G,
            ut,
            null,
            i,
            Q
          ), W.push({ event: G, listeners: gt }));
        }
      }
      if ((n & 7) === 0) {
        t: {
          if (G = t === "mouseover" || t === "pointerover", X = t === "mouseout" || t === "pointerout", G && i !== nu && (ut = i.relatedTarget || i.fromElement) && (si(ut) || ut[li]))
            break t;
          if ((X || G) && (G = Q.window === Q ? Q : (G = Q.ownerDocument) ? G.defaultView || G.parentWindow : window, X ? (ut = i.relatedTarget || i.toElement, X = $, ut = ut ? si(ut) : null, ut !== null && (Ut = c(ut), gt = ut.tag, ut !== Ut || gt !== 5 && gt !== 27 && gt !== 6) && (ut = null)) : (X = null, ut = $), X !== ut)) {
            if (gt = ym, J = "onMouseLeave", k = "onMouseEnter", L = "mouse", (t === "pointerout" || t === "pointerover") && (gt = vm, J = "onPointerLeave", k = "onPointerEnter", L = "pointer"), Ut = X == null ? G : hl(X), q = ut == null ? G : hl(ut), G = new gt(
              J,
              L + "leave",
              X,
              i,
              Q
            ), G.target = Ut, G.relatedTarget = q, J = null, si(Q) === $ && (gt = new gt(
              k,
              L + "enter",
              ut,
              i,
              Q
            ), gt.target = q, gt.relatedTarget = Ut, J = gt), Ut = J, X && ut)
              e: {
                for (gt = i3, k = X, L = ut, q = 0, J = k; J; J = gt(J))
                  q++;
                J = 0;
                for (var mt = L; mt; mt = gt(mt))
                  J++;
                for (; 0 < q - J; )
                  k = gt(k), q--;
                for (; 0 < J - q; )
                  L = gt(L), J--;
                for (; q--; ) {
                  if (k === L || L !== null && k === L.alternate) {
                    gt = k;
                    break e;
                  }
                  k = gt(k), L = gt(L);
                }
                gt = null;
              }
            else gt = null;
            X !== null && u0(
              W,
              G,
              X,
              gt,
              !1
            ), ut !== null && Ut !== null && u0(
              W,
              Ut,
              ut,
              gt,
              !0
            );
          }
        }
        t: {
          if (G = $ ? hl($) : window, X = G.nodeName && G.nodeName.toLowerCase(), X === "select" || X === "input" && G.type === "file")
            var Dt = jm;
          else if (Cm(G))
            if (Am)
              Dt = pS;
            else {
              Dt = hS;
              var ft = dS;
            }
          else
            X = G.nodeName, !X || X.toLowerCase() !== "input" || G.type !== "checkbox" && G.type !== "radio" ? $ && eu($.elementType) && (Dt = jm) : Dt = mS;
          if (Dt && (Dt = Dt(t, $))) {
            Em(
              W,
              Dt,
              i,
              Q
            );
            break t;
          }
          ft && ft(t, G, $), t === "focusout" && $ && G.type === "number" && $.memoizedProps.value != null && tu(G, "number", G.value);
        }
        switch (ft = $ ? hl($) : window, t) {
          case "focusin":
            (Cm(ft) || ft.contentEditable === "true") && (pi = ft, pu = $, wl = null);
            break;
          case "focusout":
            wl = pu = pi = null;
            break;
          case "mousedown":
            yu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            yu = !1, Lm(W, i, Q);
            break;
          case "selectionchange":
            if (gS) break;
          case "keydown":
          case "keyup":
            Lm(W, i, Q);
        }
        var St;
        if (fu)
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
          mi ? wm(t, i) && (At = "onCompositionEnd") : t === "keydown" && i.keyCode === 229 && (At = "onCompositionStart");
        At && (bm && i.locale !== "ko" && (mi || At !== "onCompositionStart" ? At === "onCompositionEnd" && mi && (St = mm()) : (Fn = Q, su = "value" in Fn ? Fn.value : Fn.textContent, mi = !0)), ft = Oo($, At), 0 < ft.length && (At = new gm(
          At,
          t,
          null,
          i,
          Q
        ), W.push({ event: At, listeners: ft }), St ? At.data = St : (St = Tm(i), St !== null && (At.data = St)))), (St = oS ? rS(t, i) : uS(t, i)) && (At = Oo($, "onBeforeInput"), 0 < At.length && (ft = new gm(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          Q
        ), W.push({
          event: ft,
          listeners: At
        }), ft.data = St)), t3(
          W,
          t,
          $,
          i,
          Q
        );
      }
      o0(W, n);
    });
  }
  function Kl(t, n, i) {
    return {
      instance: t,
      listener: n,
      currentTarget: i
    };
  }
  function Oo(t, n) {
    for (var i = n + "Capture", o = []; t !== null; ) {
      var u = t, d = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || d === null || (u = ml(t, i), u != null && o.unshift(
        Kl(t, u, d)
      ), u = ml(t, n), u != null && o.push(
        Kl(t, u, d)
      )), t.tag === 3) return o;
      t = t.return;
    }
    return [];
  }
  function i3(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function u0(t, n, i, o, u) {
    for (var d = n._reactName, x = []; i !== null && i !== o; ) {
      var C = i, z = C.alternate, $ = C.stateNode;
      if (C = C.tag, z !== null && z === o) break;
      C !== 5 && C !== 26 && C !== 27 || $ === null || (z = $, u ? ($ = ml(i, d), $ != null && x.unshift(
        Kl(i, $, z)
      )) : u || ($ = ml(i, d), $ != null && x.push(
        Kl(i, $, z)
      ))), i = i.return;
    }
    x.length !== 0 && t.push({ event: n, listeners: x });
  }
  var l3 = /\r\n?/g, s3 = /\u0000|\uFFFD/g;
  function c0(t) {
    return (typeof t == "string" ? t : "" + t).replace(l3, `
`).replace(s3, "");
  }
  function f0(t, n) {
    return n = c0(n), c0(t) === n;
  }
  function Vt(t, n, i, o, u, d) {
    switch (i) {
      case "children":
        typeof o == "string" ? n === "body" || n === "textarea" && o === "" || fi(t, o) : (typeof o == "number" || typeof o == "bigint") && n !== "body" && fi(t, "" + o);
        break;
      case "className":
        Bs(t, "class", o);
        break;
      case "tabIndex":
        Bs(t, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Bs(t, i, o);
        break;
      case "style":
        fm(t, o, d);
        break;
      case "data":
        if (n !== "object") {
          Bs(t, "data", o);
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
        o = Us("" + o), t.setAttribute(i, o);
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
        o = Us("" + o), t.setAttribute(i, o);
        break;
      case "onClick":
        o != null && (t.onclick = _n);
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
        i = Us("" + o), t.setAttributeNS(
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
        Et("beforetoggle", t), Et("toggle", t), Ls(t, "popover", o);
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
        Ls(t, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = zx.get(i) || i, Ls(t, i, o));
    }
  }
  function qc(t, n, i, o, u, d) {
    switch (i) {
      case "style":
        fm(t, o, d);
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
        typeof o == "string" ? fi(t, o) : (typeof o == "number" || typeof o == "bigint") && fi(t, "" + o);
        break;
      case "onScroll":
        o != null && Et("scroll", t);
        break;
      case "onScrollEnd":
        o != null && Et("scrollend", t);
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
        if (!nm.hasOwnProperty(i))
          t: {
            if (i[0] === "o" && i[1] === "n" && (u = i.endsWith("Capture"), n = i.slice(2, u ? i.length - 7 : void 0), d = t[De] || null, d = d != null ? d[i] : null, typeof d == "function" && t.removeEventListener(n, d, u), typeof o == "function")) {
              typeof d != "function" && d !== null && (i in t ? t[i] = null : t.hasAttribute(i) && t.removeAttribute(i)), t.addEventListener(n, o, u);
              break t;
            }
            i in t ? t[i] = o : o === !0 ? t.setAttribute(i, "") : Ls(t, i, o);
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
        var C = d = x = u = null, z = null, $ = null;
        for (o in i)
          if (i.hasOwnProperty(o)) {
            var Q = i[o];
            if (Q != null)
              switch (o) {
                case "name":
                  u = Q;
                  break;
                case "type":
                  x = Q;
                  break;
                case "checked":
                  z = Q;
                  break;
                case "defaultChecked":
                  $ = Q;
                  break;
                case "value":
                  d = Q;
                  break;
                case "defaultValue":
                  C = Q;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Q != null)
                    throw Error(s(137, n));
                  break;
                default:
                  Vt(t, n, o, Q, i, null);
              }
          }
        om(
          t,
          d,
          C,
          z,
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
        n = d, i = x, t.multiple = !!o, n != null ? ci(t, !!o, n, !1) : i != null && ci(t, !!o, i, !0);
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
        um(t, o, u, d);
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
        Et("beforetoggle", t), Et("toggle", t), Et("cancel", t), Et("close", t);
        break;
      case "iframe":
      case "object":
        Et("load", t);
        break;
      case "video":
      case "audio":
        for (o = 0; o < Pl.length; o++)
          Et(Pl[o], t);
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
        if (eu(n)) {
          for (Q in i)
            i.hasOwnProperty(Q) && (o = i[Q], o !== void 0 && qc(
              t,
              n,
              Q,
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
  function o3(t, n, i, o) {
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
        var u = null, d = null, x = null, C = null, z = null, $ = null, Q = null;
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
                $ = X;
                break;
              case "defaultChecked":
                Q = X;
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
        Ir(
          t,
          x,
          C,
          z,
          $,
          Q,
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
        n = C, i = x, o = X, G != null ? ci(t, !!i, G, !1) : !!o != !!i && (n != null ? ci(t, !!i, n, !0) : ci(t, !!i, i ? [] : "", !1));
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
        rm(t, G, X);
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
        if (eu(n)) {
          for (var Ut in i)
            G = i[Ut], i.hasOwnProperty(Ut) && G !== void 0 && !o.hasOwnProperty(Ut) && qc(
              t,
              n,
              Ut,
              void 0,
              o,
              G
            );
          for (Q in o)
            G = o[Q], X = i[Q], !o.hasOwnProperty(Q) || G === X || G === void 0 && X === void 0 || qc(
              t,
              n,
              Q,
              G,
              o,
              X
            );
          return;
        }
    }
    for (var k in i)
      G = i[k], i.hasOwnProperty(k) && G != null && !o.hasOwnProperty(k) && Vt(t, n, k, null, o, G);
    for (W in o)
      G = o[W], X = i[W], !o.hasOwnProperty(W) || G === X || G == null && X == null || Vt(t, n, W, G, o, X);
  }
  function d0(t) {
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
  function r3() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, n = 0, i = performance.getEntriesByType("resource"), o = 0; o < i.length; o++) {
        var u = i[o], d = u.transferSize, x = u.initiatorType, C = u.duration;
        if (d && C && d0(x)) {
          for (x = 0, C = u.responseEnd, o += 1; o < i.length; o++) {
            var z = i[o], $ = z.startTime;
            if ($ > C) break;
            var Q = z.transferSize, W = z.initiatorType;
            Q && d0(W) && (z = z.responseEnd, x += Q * (z < C ? 1 : (C - $) / (z - $)));
          }
          if (--o, n += 8 * (d + x) / (u.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return n / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var $c = null, Gc = null;
  function zo(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function h0(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function m0(t, n) {
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
  function Yc(t, n) {
    return t === "textarea" || t === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Xc = null;
  function u3() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Xc ? !1 : (Xc = t, !0) : (Xc = null, !1);
  }
  var p0 = typeof setTimeout == "function" ? setTimeout : void 0, c3 = typeof clearTimeout == "function" ? clearTimeout : void 0, y0 = typeof Promise == "function" ? Promise : void 0, f3 = typeof queueMicrotask == "function" ? queueMicrotask : typeof y0 < "u" ? function(t) {
    return y0.resolve(null).then(t).catch(d3);
  } : p0;
  function d3(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function ha(t) {
    return t === "head";
  }
  function g0(t, n) {
    var i = n, o = 0;
    do {
      var u = i.nextSibling;
      if (t.removeChild(i), u && u.nodeType === 8)
        if (i = u.data, i === "/$" || i === "/&") {
          if (o === 0) {
            t.removeChild(u), $i(n);
            return;
          }
          o--;
        } else if (i === "$" || i === "$?" || i === "$~" || i === "$!" || i === "&")
          o++;
        else if (i === "html")
          Zl(t.ownerDocument.documentElement);
        else if (i === "head") {
          i = t.ownerDocument.head, Zl(i);
          for (var d = i.firstChild; d; ) {
            var x = d.nextSibling, C = d.nodeName;
            d[dl] || C === "SCRIPT" || C === "STYLE" || C === "LINK" && d.rel.toLowerCase() === "stylesheet" || i.removeChild(d), d = x;
          }
        } else
          i === "body" && Zl(t.ownerDocument.body);
      i = u;
    } while (i);
    $i(n);
  }
  function v0(t, n) {
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
  function Pc(t) {
    var n = t.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var i = n;
      switch (n = n.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Pc(i), Jr(i);
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
  function h3(t, n, i, o) {
    for (; t.nodeType === 1; ) {
      var u = i;
      if (t.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!o && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (o) {
        if (!t[dl])
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
  function m3(t, n, i) {
    if (n === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !i || (t = an(t.nextSibling), t === null)) return null;
    return t;
  }
  function b0(t, n) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = an(t.nextSibling), t === null)) return null;
    return t;
  }
  function Kc(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Zc(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function p3(t, n) {
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
  var Qc = null;
  function x0(t) {
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
  function S0(t) {
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
  function w0(t, n, i) {
    switch (n = zo(i), t) {
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
  function Zl(t) {
    for (var n = t.attributes; n.length; )
      t.removeAttributeNode(n[0]);
    Jr(t);
  }
  var ln = /* @__PURE__ */ new Map(), T0 = /* @__PURE__ */ new Set();
  function Lo(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Xn = V.d;
  V.d = {
    f: y3,
    r: g3,
    D: v3,
    C: b3,
    L: x3,
    m: S3,
    X: T3,
    S: w3,
    M: C3
  };
  function y3() {
    var t = Xn.f(), n = jo();
    return t || n;
  }
  function g3(t) {
    var n = oi(t);
    n !== null && n.tag === 5 && n.type === "form" ? Hp(n) : Xn.r(t);
  }
  var ki = typeof document > "u" ? null : document;
  function C0(t, n, i) {
    var o = ki;
    if (o && typeof n == "string" && n) {
      var u = Fe(n);
      u = 'link[rel="' + t + '"][href="' + u + '"]', typeof i == "string" && (u += '[crossorigin="' + i + '"]'), T0.has(u) || (T0.add(u), t = { rel: t, crossOrigin: i, href: n }, o.querySelector(u) === null && (n = o.createElement("link"), Se(n, "link", t), pe(n), o.head.appendChild(n)));
    }
  }
  function v3(t) {
    Xn.D(t), C0("dns-prefetch", t, null);
  }
  function b3(t, n) {
    Xn.C(t, n), C0("preconnect", t, n);
  }
  function x3(t, n, i) {
    Xn.L(t, n, i);
    var o = ki;
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
          d = Hi(t);
          break;
        case "script":
          d = qi(t);
      }
      ln.has(d) || (t = v(
        {
          rel: "preload",
          href: n === "image" && i && i.imageSrcSet ? void 0 : t,
          as: n
        },
        i
      ), ln.set(d, t), o.querySelector(u) !== null || n === "style" && o.querySelector(Ql(d)) || n === "script" && o.querySelector(Fl(d)) || (n = o.createElement("link"), Se(n, "link", t), pe(n), o.head.appendChild(n)));
    }
  }
  function S3(t, n) {
    Xn.m(t, n);
    var i = ki;
    if (i && t) {
      var o = n && typeof n.as == "string" ? n.as : "script", u = 'link[rel="modulepreload"][as="' + Fe(o) + '"][href="' + Fe(t) + '"]', d = u;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          d = qi(t);
      }
      if (!ln.has(d) && (t = v({ rel: "modulepreload", href: t }, n), ln.set(d, t), i.querySelector(u) === null)) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(Fl(d)))
              return;
        }
        o = i.createElement("link"), Se(o, "link", t), pe(o), i.head.appendChild(o);
      }
    }
  }
  function w3(t, n, i) {
    Xn.S(t, n, i);
    var o = ki;
    if (o && t) {
      var u = ri(o).hoistableStyles, d = Hi(t);
      n = n || "default";
      var x = u.get(d);
      if (!x) {
        var C = { loading: 0, preload: null };
        if (x = o.querySelector(
          Ql(d)
        ))
          C.loading = 5;
        else {
          t = v(
            { rel: "stylesheet", href: t, "data-precedence": n },
            i
          ), (i = ln.get(d)) && Fc(t, i);
          var z = x = o.createElement("link");
          pe(z), Se(z, "link", t), z._p = new Promise(function($, Q) {
            z.onload = $, z.onerror = Q;
          }), z.addEventListener("load", function() {
            C.loading |= 1;
          }), z.addEventListener("error", function() {
            C.loading |= 2;
          }), C.loading |= 4, Bo(x, n, o);
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
  function T3(t, n) {
    Xn.X(t, n);
    var i = ki;
    if (i && t) {
      var o = ri(i).hoistableScripts, u = qi(t), d = o.get(u);
      d || (d = i.querySelector(Fl(u)), d || (t = v({ src: t, async: !0 }, n), (n = ln.get(u)) && Jc(t, n), d = i.createElement("script"), pe(d), Se(d, "link", t), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, o.set(u, d));
    }
  }
  function C3(t, n) {
    Xn.M(t, n);
    var i = ki;
    if (i && t) {
      var o = ri(i).hoistableScripts, u = qi(t), d = o.get(u);
      d || (d = i.querySelector(Fl(u)), d || (t = v({ src: t, async: !0, type: "module" }, n), (n = ln.get(u)) && Jc(t, n), d = i.createElement("script"), pe(d), Se(d, "link", t), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, o.set(u, d));
    }
  }
  function E0(t, n, i, o) {
    var u = (u = ht.current) ? Lo(u) : null;
    if (!u) throw Error(s(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof i.precedence == "string" && typeof i.href == "string" ? (n = Hi(i.href), i = ri(
          u
        ).hoistableStyles, o = i.get(n), o || (o = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, i.set(n, o)), o) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (i.rel === "stylesheet" && typeof i.href == "string" && typeof i.precedence == "string") {
          t = Hi(i.href);
          var d = ri(
            u
          ).hoistableStyles, x = d.get(t);
          if (x || (u = u.ownerDocument || u, x = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, d.set(t, x), (d = u.querySelector(
            Ql(t)
          )) && !d._p && (x.instance = d, x.state.loading = 5), ln.has(t) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, ln.set(t, i), d || E3(
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
        return n = i.async, i = i.src, typeof i == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = qi(i), i = ri(
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
  function Hi(t) {
    return 'href="' + Fe(t) + '"';
  }
  function Ql(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function j0(t) {
    return v({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function E3(t, n, i, o) {
    t.querySelector('link[rel="preload"][as="style"][' + n + "]") ? o.loading = 1 : (n = t.createElement("link"), o.preload = n, n.addEventListener("load", function() {
      return o.loading |= 1;
    }), n.addEventListener("error", function() {
      return o.loading |= 2;
    }), Se(n, "link", i), pe(n), t.head.appendChild(n));
  }
  function qi(t) {
    return '[src="' + Fe(t) + '"]';
  }
  function Fl(t) {
    return "script[async]" + t;
  }
  function A0(t, n, i) {
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
          ), pe(o), Se(o, "style", u), Bo(o, i.precedence, t), n.instance = o;
        case "stylesheet":
          u = Hi(i.href);
          var d = t.querySelector(
            Ql(u)
          );
          if (d)
            return n.state.loading |= 4, n.instance = d, pe(d), d;
          o = j0(i), (u = ln.get(u)) && Fc(o, u), d = (t.ownerDocument || t).createElement("link"), pe(d);
          var x = d;
          return x._p = new Promise(function(C, z) {
            x.onload = C, x.onerror = z;
          }), Se(d, "link", o), n.state.loading |= 4, Bo(d, i.precedence, t), n.instance = d;
        case "script":
          return d = qi(i.src), (u = t.querySelector(
            Fl(d)
          )) ? (n.instance = u, pe(u), u) : (o = i, (u = ln.get(d)) && (o = v({}, i), Jc(o, u)), t = t.ownerDocument || t, u = t.createElement("script"), pe(u), Se(u, "link", o), t.head.appendChild(u), n.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (o = n.instance, n.state.loading |= 4, Bo(o, i.precedence, t));
    return n.instance;
  }
  function Bo(t, n, i) {
    for (var o = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = o.length ? o[o.length - 1] : null, d = u, x = 0; x < o.length; x++) {
      var C = o[x];
      if (C.dataset.precedence === n) d = C;
      else if (d !== u) break;
    }
    d ? d.parentNode.insertBefore(t, d.nextSibling) : (n = i.nodeType === 9 ? i.head : i, n.insertBefore(t, n.firstChild));
  }
  function Fc(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.title == null && (t.title = n.title);
  }
  function Jc(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.integrity == null && (t.integrity = n.integrity);
  }
  var Vo = null;
  function M0(t, n, i) {
    if (Vo === null) {
      var o = /* @__PURE__ */ new Map(), u = Vo = /* @__PURE__ */ new Map();
      u.set(i, o);
    } else
      u = Vo, o = u.get(i), o || (o = /* @__PURE__ */ new Map(), u.set(i, o));
    if (o.has(t)) return o;
    for (o.set(t, null), i = i.getElementsByTagName(t), u = 0; u < i.length; u++) {
      var d = i[u];
      if (!(d[dl] || d[ge] || t === "link" && d.getAttribute("rel") === "stylesheet") && d.namespaceURI !== "http://www.w3.org/2000/svg") {
        var x = d.getAttribute(n) || "";
        x = t + x;
        var C = o.get(x);
        C ? C.push(d) : o.set(x, [d]);
      }
    }
    return o;
  }
  function _0(t, n, i) {
    t = t.ownerDocument || t, t.head.insertBefore(
      i,
      n === "title" ? t.querySelector("head > title") : null
    );
  }
  function j3(t, n, i) {
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
  function D0(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function A3(t, n, i, o) {
    if (i.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var u = Hi(o.href), d = n.querySelector(
          Ql(u)
        );
        if (d) {
          n = d._p, n !== null && typeof n == "object" && typeof n.then == "function" && (t.count++, t = Uo.bind(t), n.then(t, t)), i.state.loading |= 4, i.instance = d, pe(d);
          return;
        }
        d = n.ownerDocument || n, o = j0(o), (u = ln.get(u)) && Fc(o, u), d = d.createElement("link"), pe(d);
        var x = d;
        x._p = new Promise(function(C, z) {
          x.onload = C, x.onerror = z;
        }), Se(d, "link", o), i.instance = d;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(i, n), (n = i.state.preload) && (i.state.loading & 3) === 0 && (t.count++, i = Uo.bind(t), n.addEventListener("load", i), n.addEventListener("error", i));
    }
  }
  var Wc = 0;
  function M3(t, n) {
    return t.stylesheets && t.count === 0 && Ho(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(i) {
      var o = setTimeout(function() {
        if (t.stylesheets && Ho(t, t.stylesheets), t.unsuspend) {
          var d = t.unsuspend;
          t.unsuspend = null, d();
        }
      }, 6e4 + n);
      0 < t.imgBytes && Wc === 0 && (Wc = 62500 * r3());
      var u = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Ho(t, t.stylesheets), t.unsuspend)) {
            var d = t.unsuspend;
            t.unsuspend = null, d();
          }
        },
        (t.imgBytes > Wc ? 50 : 800) + n
      );
      return t.unsuspend = i, function() {
        t.unsuspend = null, clearTimeout(o), clearTimeout(u);
      };
    } : null;
  }
  function Uo() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Ho(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var ko = null;
  function Ho(t, n) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, ko = /* @__PURE__ */ new Map(), n.forEach(_3, t), ko = null, Uo.call(t));
  }
  function _3(t, n) {
    if (!(n.state.loading & 4)) {
      var i = ko.get(t);
      if (i) var o = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), ko.set(t, i);
        for (var u = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), d = 0; d < u.length; d++) {
          var x = u[d];
          (x.nodeName === "LINK" || x.getAttribute("media") !== "not all") && (i.set(x.dataset.precedence, x), o = x);
        }
        o && i.set(null, o);
      }
      u = n.instance, x = u.getAttribute("data-precedence"), d = i.get(x) || o, d === o && i.set(null, u), i.set(x, u), this.count++, o = Uo.bind(this), u.addEventListener("load", o), u.addEventListener("error", o), d ? d.parentNode.insertBefore(u, d.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(u, t.firstChild)), n.state.loading |= 4;
    }
  }
  var Jl = {
    $$typeof: A,
    Provider: null,
    Consumer: null,
    _currentValue: Z,
    _currentValue2: Z,
    _threadCount: 0
  };
  function D3(t, n, i, o, u, d, x, C, z) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Kr(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Kr(0), this.hiddenUpdates = Kr(null), this.identifierPrefix = o, this.onUncaughtError = u, this.onCaughtError = d, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = z, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function R0(t, n, i, o, u, d, x, C, z, $, Q, W) {
    return t = new D3(
      t,
      n,
      i,
      x,
      z,
      $,
      Q,
      W,
      C
    ), n = 1, d === !0 && (n |= 24), d = qe(3, null, null, n), t.current = d, d.stateNode = t, n = Ru(), n.refCount++, t.pooledCache = n, n.refCount++, d.memoizedState = {
      element: o,
      isDehydrated: i,
      cache: n
    }, Lu(d), t;
  }
  function N0(t) {
    return t ? (t = vi, t) : vi;
  }
  function O0(t, n, i, o, u, d) {
    u = N0(u), o.context === null ? o.context = u : o.pendingContext = u, o = na(n), o.payload = { element: i }, d = d === void 0 ? null : d, d !== null && (o.callback = d), i = aa(t, o, n), i !== null && (Be(i, t, n), _l(i, t, n));
  }
  function z0(t, n) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var i = t.retryLane;
      t.retryLane = i !== 0 && i < n ? i : n;
    }
  }
  function Ic(t, n) {
    z0(t, n), (t = t.alternate) && z0(t, n);
  }
  function L0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Oa(t, 67108864);
      n !== null && Be(n, t, 67108864), Ic(t, 67108864);
    }
  }
  function B0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Pe();
      n = Zr(n);
      var i = Oa(t, n);
      i !== null && Be(i, t, n), Ic(t, n);
    }
  }
  var qo = !0;
  function R3(t, n, i, o) {
    var u = N.T;
    N.T = null;
    var d = V.p;
    try {
      V.p = 2, tf(t, n, i, o);
    } finally {
      V.p = d, N.T = u;
    }
  }
  function N3(t, n, i, o) {
    var u = N.T;
    N.T = null;
    var d = V.p;
    try {
      V.p = 8, tf(t, n, i, o);
    } finally {
      V.p = d, N.T = u;
    }
  }
  function tf(t, n, i, o) {
    if (qo) {
      var u = ef(o);
      if (u === null)
        Hc(
          t,
          n,
          o,
          $o,
          i
        ), U0(t, o);
      else if (z3(
        u,
        t,
        n,
        i,
        o
      ))
        o.stopPropagation();
      else if (U0(t, o), n & 4 && -1 < O3.indexOf(t)) {
        for (; u !== null; ) {
          var d = oi(u);
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
                    Tn(d), (Nt & 6) === 0 && (Co = Ve() + 500, Xl(0));
                  }
                }
                break;
              case 31:
              case 13:
                C = Oa(d, 2), C !== null && Be(C, d, 2), jo(), Ic(d, 2);
            }
          if (d = ef(o), d === null && Hc(
            t,
            n,
            o,
            $o,
            i
          ), d === u) break;
          u = d;
        }
        u !== null && o.stopPropagation();
      } else
        Hc(
          t,
          n,
          o,
          null,
          i
        );
    }
  }
  function ef(t) {
    return t = au(t), nf(t);
  }
  var $o = null;
  function nf(t) {
    if ($o = null, t = si(t), t !== null) {
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
    return $o = t, null;
  }
  function V0(t) {
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
        switch (vx()) {
          case Xh:
            return 2;
          case Ph:
            return 8;
          case Ds:
          case bx:
            return 32;
          case Kh:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var af = !1, ma = null, pa = null, ya = null, Wl = /* @__PURE__ */ new Map(), Il = /* @__PURE__ */ new Map(), ga = [], O3 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function U0(t, n) {
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
        Wl.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Il.delete(n.pointerId);
    }
  }
  function ts(t, n, i, o, u, d) {
    return t === null || t.nativeEvent !== d ? (t = {
      blockedOn: n,
      domEventName: i,
      eventSystemFlags: o,
      nativeEvent: d,
      targetContainers: [u]
    }, n !== null && (n = oi(n), n !== null && L0(n)), t) : (t.eventSystemFlags |= o, n = t.targetContainers, u !== null && n.indexOf(u) === -1 && n.push(u), t);
  }
  function z3(t, n, i, o, u) {
    switch (n) {
      case "focusin":
        return ma = ts(
          ma,
          t,
          n,
          i,
          o,
          u
        ), !0;
      case "dragenter":
        return pa = ts(
          pa,
          t,
          n,
          i,
          o,
          u
        ), !0;
      case "mouseover":
        return ya = ts(
          ya,
          t,
          n,
          i,
          o,
          u
        ), !0;
      case "pointerover":
        var d = u.pointerId;
        return Wl.set(
          d,
          ts(
            Wl.get(d) || null,
            t,
            n,
            i,
            o,
            u
          )
        ), !0;
      case "gotpointercapture":
        return d = u.pointerId, Il.set(
          d,
          ts(
            Il.get(d) || null,
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
  function k0(t) {
    var n = si(t.target);
    if (n !== null) {
      var i = c(n);
      if (i !== null) {
        if (n = i.tag, n === 13) {
          if (n = f(i), n !== null) {
            t.blockedOn = n, Ih(t.priority, function() {
              B0(i);
            });
            return;
          }
        } else if (n === 31) {
          if (n = h(i), n !== null) {
            t.blockedOn = n, Ih(t.priority, function() {
              B0(i);
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
  function Go(t) {
    if (t.blockedOn !== null) return !1;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var i = ef(t.nativeEvent);
      if (i === null) {
        i = t.nativeEvent;
        var o = new i.constructor(
          i.type,
          i
        );
        nu = o, i.target.dispatchEvent(o), nu = null;
      } else
        return n = oi(i), n !== null && L0(n), t.blockedOn = i, !1;
      n.shift();
    }
    return !0;
  }
  function H0(t, n, i) {
    Go(t) && i.delete(n);
  }
  function L3() {
    af = !1, ma !== null && Go(ma) && (ma = null), pa !== null && Go(pa) && (pa = null), ya !== null && Go(ya) && (ya = null), Wl.forEach(H0), Il.forEach(H0);
  }
  function Yo(t, n) {
    t.blockedOn === n && (t.blockedOn = null, af || (af = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      L3
    )));
  }
  var Xo = null;
  function q0(t) {
    Xo !== t && (Xo = t, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        Xo === t && (Xo = null);
        for (var n = 0; n < t.length; n += 3) {
          var i = t[n], o = t[n + 1], u = t[n + 2];
          if (typeof o != "function") {
            if (nf(o || i) === null)
              continue;
            break;
          }
          var d = oi(i);
          d !== null && (t.splice(n, 3), n -= 3, ec(
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
  function $i(t) {
    function n(z) {
      return Yo(z, t);
    }
    ma !== null && Yo(ma, t), pa !== null && Yo(pa, t), ya !== null && Yo(ya, t), Wl.forEach(n), Il.forEach(n);
    for (var i = 0; i < ga.length; i++) {
      var o = ga[i];
      o.blockedOn === t && (o.blockedOn = null);
    }
    for (; 0 < ga.length && (i = ga[0], i.blockedOn === null); )
      k0(i), i.blockedOn === null && ga.shift();
    if (i = (t.ownerDocument || t).$$reactFormReplay, i != null)
      for (o = 0; o < i.length; o += 3) {
        var u = i[o], d = i[o + 1], x = u[De] || null;
        if (typeof d == "function")
          x || q0(i);
        else if (x) {
          var C = null;
          if (d && d.hasAttribute("formAction")) {
            if (u = d, x = d[De] || null)
              C = x.formAction;
            else if (nf(u) !== null) continue;
          } else C = x.action;
          typeof C == "function" ? i[o + 1] = C : (i.splice(o, 3), o -= 3), q0(i);
        }
      }
  }
  function $0() {
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
  function lf(t) {
    this._internalRoot = t;
  }
  Po.prototype.render = lf.prototype.render = function(t) {
    var n = this._internalRoot;
    if (n === null) throw Error(s(409));
    var i = n.current, o = Pe();
    O0(i, o, t, n, null, null);
  }, Po.prototype.unmount = lf.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var n = t.containerInfo;
      O0(t.current, 2, null, t, null, null), jo(), n[li] = null;
    }
  };
  function Po(t) {
    this._internalRoot = t;
  }
  Po.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var n = Wh();
      t = { blockedOn: null, target: t, priority: n };
      for (var i = 0; i < ga.length && n !== 0 && n < ga[i].priority; i++) ;
      ga.splice(i, 0, t), i === 0 && k0(t);
    }
  };
  var G0 = e.version;
  if (G0 !== "19.2.7")
    throw Error(
      s(
        527,
        G0,
        "19.2.7"
      )
    );
  V.findDOMNode = function(t) {
    var n = t._reactInternals;
    if (n === void 0)
      throw typeof t.render == "function" ? Error(s(188)) : (t = Object.keys(t).join(","), Error(s(268, t)));
    return t = p(n), t = t !== null ? g(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var B3 = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: N,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ko = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ko.isDisabled && Ko.supportsFiber)
      try {
        ul = Ko.inject(
          B3
        ), Ue = Ko;
      } catch {
      }
  }
  return ns.createRoot = function(t, n) {
    if (!r(t)) throw Error(s(299));
    var i = !1, o = "", u = Fp, d = Jp, x = Wp;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (u = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (x = n.onRecoverableError)), n = R0(
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
      $0
    ), t[li] = n.current, kc(t), new lf(n);
  }, ns.hydrateRoot = function(t, n, i) {
    if (!r(t)) throw Error(s(299));
    var o = !1, u = "", d = Fp, x = Jp, C = Wp, z = null;
    return i != null && (i.unstable_strictMode === !0 && (o = !0), i.identifierPrefix !== void 0 && (u = i.identifierPrefix), i.onUncaughtError !== void 0 && (d = i.onUncaughtError), i.onCaughtError !== void 0 && (x = i.onCaughtError), i.onRecoverableError !== void 0 && (C = i.onRecoverableError), i.formState !== void 0 && (z = i.formState)), n = R0(
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
      $0
    ), n.context = N0(null), i = n.current, o = Pe(), o = Zr(o), u = na(o), u.callback = null, aa(i, u, o), i = o, n.current.lanes = i, fl(n, i), Tn(n), t[li] = n.current, kc(t), new Po(n);
  }, ns.version = "19.2.7", ns;
}
var I0;
function Z3() {
  if (I0) return rf.exports;
  I0 = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (e) {
        console.error(e);
      }
  }
  return a(), rf.exports = K3(), rf.exports;
}
var Gi = Z3(), df = { exports: {} }, hf = {};
var ty;
function Q3() {
  if (ty) return hf;
  ty = 1;
  var a = Ts().__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  return hf.c = function(e) {
    return a.H.useMemoCache(e);
  }, hf;
}
var ey;
function F3() {
  return ey || (ey = 1, df.exports = Q3()), df.exports;
}
var Tt = F3(), mf = { exports: {} }, pf = {};
var ny;
function J3() {
  if (ny) return pf;
  ny = 1;
  var a = Ts();
  function e(v, b) {
    return v === b && (v !== 0 || 1 / v === 1 / b) || v !== v && b !== b;
  }
  var l = typeof Object.is == "function" ? Object.is : e, s = a.useState, r = a.useEffect, c = a.useLayoutEffect, f = a.useDebugValue;
  function h(v, b) {
    var T = b(), S = s({ inst: { value: T, getSnapshot: b } }), w = S[0].inst, j = S[1];
    return c(
      function() {
        w.value = T, w.getSnapshot = b, y(w) && j({ inst: w });
      },
      [v, T, b]
    ), r(
      function() {
        return y(w) && j({ inst: w }), v(function() {
          y(w) && j({ inst: w });
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
  return pf.useSyncExternalStore = a.useSyncExternalStore !== void 0 ? a.useSyncExternalStore : g, pf;
}
var ay;
function W3() {
  return ay || (ay = 1, mf.exports = J3()), mf.exports;
}
var I3 = W3();
const t4 = G3.useInsertionEffect, e4 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", n4 = e4 ? E.useLayoutEffect : E.useEffect, a4 = t4 || n4, hv = (a) => {
  const e = E.useRef([a, (...l) => e[0](...l)]).current;
  return a4(() => {
    e[0] = a;
  }), e[1];
};
function Ud(a, e) {
  a.indexOf(e) === -1 && a.push(e);
}
function xr(a, e) {
  const l = a.indexOf(e);
  l > -1 && a.splice(l, 1);
}
const An = (a, e, l) => l > e ? e : l < a ? a : l;
let kd = () => {
};
const Sa = {}, mv = (a) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(a), pv = (a) => typeof a == "object" && a !== null, yv = (a) => /^0[^.\s]+$/u.test(a);
// @__NO_SIDE_EFFECTS__
function gv(a) {
  let e;
  return () => (e === void 0 && (e = a()), e);
}
const on = /* @__NO_SIDE_EFFECTS__ */ (a) => a, Cs = (...a) => a.reduce((e, l) => (s) => l(e(s))), ps = /* @__NO_SIDE_EFFECTS__ */ (a, e, l) => {
  const s = e - a;
  return s ? (l - a) / s : 1;
};
class Hd {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return Ud(this.subscriptions, e), () => xr(this.subscriptions, e);
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
const Ke = /* @__NO_SIDE_EFFECTS__ */ (a) => a * 1e3, sn = /* @__NO_SIDE_EFFECTS__ */ (a) => a / 1e3, vv = /* @__NO_SIDE_EFFECTS__ */ (a, e) => e ? a * (1e3 / e) : 0, bv = (a, e, l) => (((1 - 3 * l + 3 * e) * a + (3 * l - 6 * e)) * a + 3 * e) * a, i4 = 1e-7, l4 = 12;
function s4(a, e, l, s, r) {
  let c, f, h = 0;
  do
    f = e + (l - e) / 2, c = bv(f, s, r) - a, c > 0 ? l = f : e = f;
  while (Math.abs(c) > i4 && ++h < l4);
  return f;
}
// @__NO_SIDE_EFFECTS__
function Es(a, e, l, s) {
  if (a === e && l === s)
    return on;
  const r = (c) => s4(c, 0, 1, a, l);
  return (c) => c === 0 || c === 1 ? c : bv(r(c), e, s);
}
const xv = /* @__NO_SIDE_EFFECTS__ */ (a) => (e) => e <= 0.5 ? a(2 * e) / 2 : (2 - a(2 * (1 - e))) / 2, Sv = /* @__NO_SIDE_EFFECTS__ */ (a) => (e) => 1 - a(1 - e), wv = /* @__PURE__ */ Es(0.33, 1.53, 0.69, 0.99), qd = /* @__PURE__ */ Sv(wv), Tv = /* @__PURE__ */ xv(qd), Cv = (a) => a >= 1 ? 1 : (a *= 2) < 1 ? 0.5 * qd(a) : 0.5 * (2 - Math.pow(2, -10 * (a - 1))), $d = (a) => 1 - Math.sin(Math.acos(a)), Ev = /* @__PURE__ */ Sv($d), jv = /* @__PURE__ */ xv($d), o4 = /* @__PURE__ */ Es(0.42, 0, 1, 1), r4 = /* @__PURE__ */ Es(0, 0, 0.58, 1), Av = /* @__PURE__ */ Es(0.42, 0, 0.58, 1), u4 = /* @__NO_SIDE_EFFECTS__ */ (a) => Array.isArray(a) && typeof a[0] != "number", Mv = /* @__NO_SIDE_EFFECTS__ */ (a) => Array.isArray(a) && typeof a[0] == "number", c4 = {
  linear: on,
  easeIn: o4,
  easeInOut: Av,
  easeOut: r4,
  circIn: $d,
  circInOut: jv,
  circOut: Ev,
  backIn: qd,
  backInOut: Tv,
  backOut: wv,
  anticipate: Cv
}, f4 = (a) => typeof a == "string", iy = (a) => {
  if (/* @__PURE__ */ Mv(a)) {
    kd(a.length === 4);
    const [e, l, s, r] = a;
    return /* @__PURE__ */ Es(e, l, s, r);
  } else if (f4(a))
    return c4[a];
  return a;
}, Gd = E.createContext({}), Yd = E.createContext({ strict: !1 }), Xd = E.createContext({
  transformPagePoint: (a) => a,
  isStatic: !1,
  reducedMotion: "never"
}), Lr = /* @__PURE__ */ E.createContext({}), Zo = [
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
function d4(a) {
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
const h4 = 40;
function _v(a, e) {
  let l = !1, s = !0;
  const r = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, c = () => l = !0, f = Zo.reduce((A, R) => (A[R] = d4(c), A), {}), { setup: h, read: y, resolveKeyframes: p, preUpdate: g, update: v, preRender: b, render: T, postRender: S } = f, w = () => {
    const A = Sa.useManualTiming, R = A ? r.timestamp : performance.now();
    l = !1, A || (r.delta = s ? 1e3 / 60 : Math.max(Math.min(R - r.timestamp, h4), 1)), r.timestamp = R, r.isProcessing = !0, h.process(r), y.process(r), p.process(r), g.process(r), v.process(r), b.process(r), T.process(r), S.process(r), r.isProcessing = !1, l && e && (s = !1, a(w));
  }, j = () => {
    l = !0, s = !0, r.isProcessing || a(w);
  };
  return { schedule: Zo.reduce((A, R) => {
    const B = f[R];
    return A[R] = (U, _ = !1, H = !1) => (l || j(), B.schedule(U, _, H)), A;
  }, {}), cancel: (A) => {
    for (let R = 0; R < Zo.length; R++)
      f[Zo[R]].cancel(A);
  }, state: r, steps: f };
}
const { schedule: Gt, cancel: wa, state: we, steps: yf } = /* @__PURE__ */ _v(typeof requestAnimationFrame < "u" ? requestAnimationFrame : on, !0);
let cr;
function m4() {
  cr = void 0;
}
const Me = {
  now: () => (cr === void 0 && Me.set(we.isProcessing || Sa.useManualTiming ? we.timestamp : performance.now()), cr),
  set: (a) => {
    cr = a, queueMicrotask(m4);
  }
}, Dv = (a) => (e) => typeof e == "string" && e.startsWith(a), Rv = /* @__PURE__ */ Dv("--"), p4 = /* @__PURE__ */ Dv("var(--"), Pd = (a) => p4(a) ? y4.test(a.split("/*")[0].trim()) : !1, y4 = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function ly(a) {
  return typeof a != "string" ? !1 : a.split("/*")[0].includes("var(--");
}
const al = {
  test: (a) => typeof a == "number",
  parse: parseFloat,
  transform: (a) => a
}, ys = {
  ...al,
  transform: (a) => An(0, 1, a)
}, Qo = {
  ...al,
  default: 1
}, cs = (a) => Math.round(a * 1e5) / 1e5, Kd = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function g4(a) {
  return a == null;
}
const v4 = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Zd = (a, e) => (l) => !!(typeof l == "string" && v4.test(l) && l.startsWith(a) || e && !g4(l) && Object.prototype.hasOwnProperty.call(l, e)), Nv = (a, e, l) => (s) => {
  if (typeof s != "string")
    return s;
  const [r, c, f, h] = s.match(Kd);
  return {
    [a]: parseFloat(r),
    [e]: parseFloat(c),
    [l]: parseFloat(f),
    alpha: h !== void 0 ? parseFloat(h) : 1
  };
}, b4 = (a) => An(0, 255, a), gf = {
  ...al,
  transform: (a) => Math.round(b4(a))
}, Ia = {
  test: /* @__PURE__ */ Zd("rgb", "red"),
  parse: /* @__PURE__ */ Nv("red", "green", "blue"),
  transform: ({ red: a, green: e, blue: l, alpha: s = 1 }) => "rgba(" + gf.transform(a) + ", " + gf.transform(e) + ", " + gf.transform(l) + ", " + cs(ys.transform(s)) + ")"
};
function x4(a) {
  let e = "", l = "", s = "", r = "";
  return a.length > 5 ? (e = a.substring(1, 3), l = a.substring(3, 5), s = a.substring(5, 7), r = a.substring(7, 9)) : (e = a.substring(1, 2), l = a.substring(2, 3), s = a.substring(3, 4), r = a.substring(4, 5), e += e, l += l, s += s, r += r), {
    red: parseInt(e, 16),
    green: parseInt(l, 16),
    blue: parseInt(s, 16),
    alpha: r ? parseInt(r, 16) / 255 : 1
  };
}
const Wf = {
  test: /* @__PURE__ */ Zd("#"),
  parse: x4,
  transform: Ia.transform
}, js = /* @__NO_SIDE_EFFECTS__ */ (a) => ({
  test: (e) => typeof e == "string" && e.endsWith(a) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${a}`
}), Pn = /* @__PURE__ */ js("deg"), jn = /* @__PURE__ */ js("%"), ct = /* @__PURE__ */ js("px"), S4 = /* @__PURE__ */ js("vh"), w4 = /* @__PURE__ */ js("vw"), sy = {
  ...jn,
  parse: (a) => jn.parse(a) / 100,
  transform: (a) => jn.transform(a * 100)
}, Xi = {
  test: /* @__PURE__ */ Zd("hsl", "hue"),
  parse: /* @__PURE__ */ Nv("hue", "saturation", "lightness"),
  transform: ({ hue: a, saturation: e, lightness: l, alpha: s = 1 }) => "hsla(" + Math.round(a) + ", " + jn.transform(cs(e)) + ", " + jn.transform(cs(l)) + ", " + cs(ys.transform(s)) + ")"
}, fe = {
  test: (a) => Ia.test(a) || Wf.test(a) || Xi.test(a),
  parse: (a) => Ia.test(a) ? Ia.parse(a) : Xi.test(a) ? Xi.parse(a) : Wf.parse(a),
  transform: (a) => typeof a == "string" ? a : a.hasOwnProperty("red") ? Ia.transform(a) : Xi.transform(a),
  getAnimatableNone: (a) => {
    const e = fe.parse(a);
    return e.alpha = 0, fe.transform(e);
  }
}, T4 = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function C4(a) {
  return isNaN(a) && typeof a == "string" && (a.match(Kd)?.length || 0) + (a.match(T4)?.length || 0) > 0;
}
const Ov = "number", zv = "color", E4 = "var", j4 = "var(", oy = "${}", A4 = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Ii(a) {
  const e = a.toString(), l = [], s = {
    color: [],
    number: [],
    var: []
  }, r = [];
  let c = 0;
  const h = e.replace(A4, (y) => (fe.test(y) ? (s.color.push(c), r.push(zv), l.push(fe.parse(y))) : y.startsWith(j4) ? (s.var.push(c), r.push(E4), l.push(y)) : (s.number.push(c), r.push(Ov), l.push(parseFloat(y))), ++c, oy)).split(oy);
  return { values: l, split: h, indexes: s, types: r };
}
function M4(a) {
  return Ii(a).values;
}
function Lv({ split: a, types: e }) {
  const l = a.length;
  return (s) => {
    let r = "";
    for (let c = 0; c < l; c++)
      if (r += a[c], s[c] !== void 0) {
        const f = e[c];
        f === Ov ? r += cs(s[c]) : f === zv ? r += fe.transform(s[c]) : r += s[c];
      }
    return r;
  };
}
function _4(a) {
  return Lv(Ii(a));
}
const D4 = (a) => typeof a == "number" ? 0 : fe.test(a) ? fe.getAnimatableNone(a) : a, R4 = (a, e) => typeof a == "number" ? e?.trim().endsWith("/") ? a : 0 : D4(a);
function N4(a) {
  const e = Ii(a);
  return Lv(e)(e.values.map((s, r) => R4(s, e.split[r])));
}
const gn = {
  test: C4,
  parse: M4,
  createTransformer: _4,
  getAnimatableNone: N4
};
function vf(a, e, l) {
  return l < 0 && (l += 1), l > 1 && (l -= 1), l < 1 / 6 ? a + (e - a) * 6 * l : l < 1 / 2 ? e : l < 2 / 3 ? a + (e - a) * (2 / 3 - l) * 6 : a;
}
function O4({ hue: a, saturation: e, lightness: l, alpha: s }) {
  a /= 360, e /= 100, l /= 100;
  let r = 0, c = 0, f = 0;
  if (!e)
    r = c = f = l;
  else {
    const h = l < 0.5 ? l * (1 + e) : l + e - l * e, y = 2 * l - h;
    r = vf(y, h, a + 1 / 3), c = vf(y, h, a), f = vf(y, h, a - 1 / 3);
  }
  return {
    red: Math.round(r * 255),
    green: Math.round(c * 255),
    blue: Math.round(f * 255),
    alpha: s
  };
}
function Sr(a, e) {
  return (l) => l > 0 ? e : a;
}
const $t = (a, e, l) => a + (e - a) * l, bf = (a, e, l) => {
  const s = a * a, r = l * (e * e - s) + s;
  return r < 0 ? 0 : Math.sqrt(r);
}, z4 = [Wf, Ia, Xi], L4 = (a) => z4.find((e) => e.test(a));
function ry(a) {
  const e = L4(a);
  if (!e)
    return !1;
  let l = e.parse(a);
  return e === Xi && (l = O4(l)), l;
}
const uy = (a, e) => {
  const l = ry(a), s = ry(e);
  if (!l || !s)
    return Sr(a, e);
  const r = { ...l };
  return (c) => (r.red = bf(l.red, s.red, c), r.green = bf(l.green, s.green, c), r.blue = bf(l.blue, s.blue, c), r.alpha = $t(l.alpha, s.alpha, c), Ia.transform(r));
}, If = /* @__PURE__ */ new Set(["none", "hidden"]);
function B4(a, e) {
  return If.has(a) ? (l) => l <= 0 ? a : e : (l) => l >= 1 ? e : a;
}
function V4(a, e) {
  return (l) => $t(a, e, l);
}
function Qd(a) {
  return typeof a == "number" ? V4 : typeof a == "string" ? Pd(a) ? Sr : fe.test(a) ? uy : H4 : Array.isArray(a) ? Bv : typeof a == "object" ? fe.test(a) ? uy : U4 : Sr;
}
function Bv(a, e) {
  const l = [...a], s = l.length, r = a.map((c, f) => Qd(c)(c, e[f]));
  return (c) => {
    for (let f = 0; f < s; f++)
      l[f] = r[f](c);
    return l;
  };
}
function U4(a, e) {
  const l = { ...a, ...e }, s = {};
  for (const r in l)
    a[r] !== void 0 && e[r] !== void 0 && (s[r] = Qd(a[r])(a[r], e[r]));
  return (r) => {
    for (const c in s)
      l[c] = s[c](r);
    return l;
  };
}
function k4(a, e) {
  const l = [], s = { color: 0, var: 0, number: 0 };
  for (let r = 0; r < e.values.length; r++) {
    const c = e.types[r], f = a.indexes[c][s[c]], h = a.values[f] ?? 0;
    l[r] = h, s[c]++;
  }
  return l;
}
const H4 = (a, e) => {
  const l = gn.createTransformer(e), s = Ii(a), r = Ii(e);
  return s.indexes.var.length === r.indexes.var.length && s.indexes.color.length === r.indexes.color.length && s.indexes.number.length >= r.indexes.number.length ? If.has(a) && !r.values.length || If.has(e) && !s.values.length ? B4(a, e) : Cs(Bv(k4(s, r), r.values), l) : Sr(a, e);
};
function Vv(a, e, l) {
  return typeof a == "number" && typeof e == "number" && typeof l == "number" ? $t(a, e, l) : Qd(a)(a, e);
}
const q4 = (a) => {
  const e = ({ timestamp: l }) => a(l);
  return {
    start: (l = !0) => Gt.update(e, l),
    stop: () => wa(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => we.isProcessing ? we.timestamp : Me.now()
  };
}, Uv = (a, e, l = 10) => {
  let s = "";
  const r = Math.max(Math.round(e / l), 2);
  for (let c = 0; c < r; c++)
    s += Math.round(a(c / (r - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, wr = 2e4;
function Fd(a) {
  let e = 0;
  const l = 50;
  let s = a.next(e);
  for (; !s.done && e < wr; )
    e += l, s = a.next(e);
  return e >= wr ? 1 / 0 : e;
}
function $4(a, e = 100, l) {
  const s = l({ ...a, keyframes: [0, e] }), r = Math.min(Fd(s), wr);
  return {
    type: "keyframes",
    ease: (c) => s.next(r * c).value / e,
    duration: /* @__PURE__ */ sn(r)
  };
}
const ee = {
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
function td(a, e) {
  return a * Math.sqrt(1 - e * e);
}
const G4 = 12;
function Y4(a, e, l) {
  let s = l;
  for (let r = 1; r < G4; r++)
    s = s - a(s) / e(s);
  return s;
}
const xf = 1e-3;
function X4({ duration: a = ee.duration, bounce: e = ee.bounce, velocity: l = ee.velocity, mass: s = ee.mass }) {
  let r, c, f = 1 - e;
  f = An(ee.minDamping, ee.maxDamping, f), a = An(ee.minDuration, ee.maxDuration, /* @__PURE__ */ sn(a)), f < 1 ? (r = (p) => {
    const g = p * f, v = g * a, b = g - l, T = td(p, f), S = Math.exp(-v);
    return xf - b / T * S;
  }, c = (p) => {
    const v = p * f * a, b = v * l + l, T = Math.pow(f, 2) * Math.pow(p, 2) * a, S = Math.exp(-v), w = td(Math.pow(p, 2), f);
    return (-r(p) + xf > 0 ? -1 : 1) * ((b - T) * S) / w;
  }) : (r = (p) => {
    const g = Math.exp(-p * a), v = (p - l) * a + 1;
    return -xf + g * v;
  }, c = (p) => {
    const g = Math.exp(-p * a), v = (l - p) * (a * a);
    return g * v;
  });
  const h = 5 / a, y = Y4(r, c, h);
  if (a = /* @__PURE__ */ Ke(a), isNaN(y))
    return {
      stiffness: ee.stiffness,
      damping: ee.damping,
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
const P4 = ["duration", "bounce"], K4 = ["stiffness", "damping", "mass"];
function cy(a, e) {
  return e.some((l) => a[l] !== void 0);
}
function Z4(a) {
  let e = {
    velocity: ee.velocity,
    stiffness: ee.stiffness,
    damping: ee.damping,
    mass: ee.mass,
    isResolvedFromDuration: !1,
    ...a
  };
  if (!cy(a, K4) && cy(a, P4))
    if (e.velocity = 0, a.visualDuration) {
      const l = a.visualDuration, s = 2 * Math.PI / (l * 1.2), r = s * s, c = 2 * An(0.05, 1, 1 - (a.bounce || 0)) * Math.sqrt(r);
      e = {
        ...e,
        mass: ee.mass,
        stiffness: r,
        damping: c
      };
    } else {
      const l = X4({ ...a, velocity: 0 });
      e = {
        ...e,
        ...l,
        mass: ee.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function Tr(a = ee.visualDuration, e = ee.bounce) {
  const l = typeof a != "object" ? {
    visualDuration: a,
    keyframes: [0, 1],
    bounce: e
  } : a;
  let { restSpeed: s, restDelta: r } = l;
  const c = l.keyframes[0], f = l.keyframes[l.keyframes.length - 1], h = { done: !1, value: c }, { stiffness: y, damping: p, mass: g, duration: v, velocity: b, isResolvedFromDuration: T } = Z4({
    ...l,
    velocity: -/* @__PURE__ */ sn(l.velocity || 0)
  }), S = b || 0, w = p / (2 * Math.sqrt(y * g)), j = f - c, M = /* @__PURE__ */ sn(Math.sqrt(y / g)), D = Math.abs(j) < 5;
  s || (s = D ? ee.restSpeed.granular : ee.restSpeed.default), r || (r = D ? ee.restDelta.granular : ee.restDelta.default);
  let A, R, B, U, _, H;
  if (w < 1)
    B = td(M, w), U = (S + w * M * j) / B, A = (K) => {
      const it = Math.exp(-w * M * K);
      return f - it * (U * Math.sin(B * K) + j * Math.cos(B * K));
    }, _ = w * M * U + j * B, H = w * M * j - U * B, R = (K) => Math.exp(-w * M * K) * (_ * Math.sin(B * K) + H * Math.cos(B * K));
  else if (w === 1) {
    A = (it) => f - Math.exp(-M * it) * (j + (S + M * j) * it);
    const K = S + M * j;
    R = (it) => Math.exp(-M * it) * (M * K * it - S);
  } else {
    const K = M * Math.sqrt(w * w - 1);
    A = (F) => {
      const et = Math.exp(-w * M * F), N = Math.min(K * F, 300);
      return f - et * ((S + w * M * j) * Math.sinh(N) + K * j * Math.cosh(N)) / K;
    };
    const it = (S + w * M * j) / K, at = w * M * it - j * K, I = w * M * j - it * K;
    R = (F) => {
      const et = Math.exp(-w * M * F), N = Math.min(K * F, 300);
      return et * (at * Math.sinh(N) + I * Math.cosh(N));
    };
  }
  const P = {
    calculatedDuration: T && v || null,
    velocity: (K) => /* @__PURE__ */ Ke(R(K)),
    next: (K) => {
      if (!T && w < 1) {
        const at = Math.exp(-w * M * K), I = Math.sin(B * K), F = Math.cos(B * K), et = f - at * (U * I + j * F), N = /* @__PURE__ */ Ke(at * (_ * I + H * F));
        return h.done = Math.abs(N) <= s && Math.abs(f - et) <= r, h.value = h.done ? f : et, h;
      }
      const it = A(K);
      if (T)
        h.done = K >= v;
      else {
        const at = /* @__PURE__ */ Ke(R(K));
        h.done = Math.abs(at) <= s && Math.abs(f - it) <= r;
      }
      return h.value = h.done ? f : it, h;
    },
    toString: () => {
      const K = Math.min(Fd(P), wr), it = Uv((at) => P.next(K * at).value, K, 30);
      return K + "ms " + it;
    },
    toTransition: () => {
    }
  };
  return P;
}
Tr.applyToOptions = (a) => {
  const e = $4(a, 100, Tr);
  return a.ease = e.ease, a.duration = /* @__PURE__ */ Ke(e.duration), a.type = "keyframes", a;
};
const Q4 = 5;
function kv(a, e, l) {
  const s = Math.max(e - Q4, 0);
  return /* @__PURE__ */ vv(l - a(s), e - s);
}
function ed({ keyframes: a, velocity: e = 0, power: l = 0.8, timeConstant: s = 325, bounceDamping: r = 10, bounceStiffness: c = 500, modifyTarget: f, min: h, max: y, restDelta: p = 0.5, restSpeed: g }) {
  const v = a[0], b = {
    done: !1,
    value: v
  }, T = (H) => h !== void 0 && H < h || y !== void 0 && H > y, S = (H) => h === void 0 ? y : y === void 0 || Math.abs(h - H) < Math.abs(y - H) ? h : y;
  let w = l * e;
  const j = v + w, M = f === void 0 ? j : f(j);
  M !== j && (w = M - v);
  const D = (H) => -w * Math.exp(-H / s), A = (H) => M + D(H), R = (H) => {
    const P = D(H), K = A(H);
    b.done = Math.abs(P) <= p, b.value = b.done ? M : K;
  };
  let B, U;
  const _ = (H) => {
    T(b.value) && (B = H, U = Tr({
      keyframes: [b.value, S(b.value)],
      velocity: kv(A, H, b.value),
      // TODO: This should be passing * 1000
      damping: r,
      stiffness: c,
      restDelta: p,
      restSpeed: g
    }));
  };
  return _(0), {
    calculatedDuration: null,
    next: (H) => {
      let P = !1;
      return !U && B === void 0 && (P = !0, R(H), _(H)), B !== void 0 && H >= B ? U.next(H - B) : (!P && R(H), b);
    }
  };
}
function F4(a, e, l) {
  const s = [], r = l || Sa.mix || Vv, c = a.length - 1;
  for (let f = 0; f < c; f++) {
    let h = r(a[f], a[f + 1]);
    if (e) {
      const y = Array.isArray(e) ? e[f] || on : e;
      h = Cs(y, h);
    }
    s.push(h);
  }
  return s;
}
function J4(a, e, { clamp: l = !0, ease: s, mixer: r } = {}) {
  const c = a.length;
  if (kd(c === e.length), c === 1)
    return () => e[0];
  if (c === 2 && e[0] === e[1])
    return () => e[1];
  const f = a[0] === a[1];
  a[0] > a[c - 1] && (a = [...a].reverse(), e = [...e].reverse());
  const h = F4(e, s, r), y = h.length, p = (g) => {
    if (f && g < a[0])
      return e[0];
    let v = 0;
    if (y > 1)
      for (; v < a.length - 2 && !(g < a[v + 1]); v++)
        ;
    const b = /* @__PURE__ */ ps(a[v], a[v + 1], g);
    return h[v](b);
  };
  return l ? (g) => p(An(a[0], a[c - 1], g)) : p;
}
function W4(a, e) {
  const l = a[a.length - 1];
  for (let s = 1; s <= e; s++) {
    const r = /* @__PURE__ */ ps(0, e, s);
    a.push($t(l, 1, r));
  }
}
function I4(a) {
  const e = [0];
  return W4(e, a.length - 1), e;
}
function t5(a, e) {
  return a.map((l) => l * e);
}
function e5(a, e) {
  return a.map(() => e || Av).splice(0, a.length - 1);
}
function fs({ duration: a = 300, keyframes: e, times: l, ease: s = "easeInOut" }) {
  const r = /* @__PURE__ */ u4(s) ? s.map(iy) : iy(s), c = {
    done: !1,
    value: e[0]
  }, f = t5(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    l && l.length === e.length ? l : I4(e),
    a
  ), h = J4(f, e, {
    ease: Array.isArray(r) ? r : e5(e, r)
  });
  return {
    calculatedDuration: a,
    next: (y) => (c.value = h(y), c.done = y >= a, c)
  };
}
const n5 = (a) => a !== null;
function Br(a, { repeat: e, repeatType: l = "loop" }, s, r = 1) {
  const c = a.filter(n5), h = r < 0 || e && l !== "loop" && e % 2 === 1 ? 0 : c.length - 1;
  return !h || s === void 0 ? c[h] : s;
}
const a5 = {
  decay: ed,
  inertia: ed,
  tween: fs,
  keyframes: fs,
  spring: Tr
};
function Hv(a) {
  typeof a.type == "string" && (a.type = a5[a.type]);
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
const i5 = (a) => a / 100;
class Cr extends Jd {
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
    Hv(e);
    const { type: l = fs, repeat: s = 0, repeatDelay: r = 0, repeatType: c, velocity: f = 0 } = e;
    let { keyframes: h } = e;
    const y = l || fs;
    y !== fs && typeof h[0] != "number" && (this.mixKeyframes = Cs(i5, Vv(h[0], h[1])), h = [0, 100]);
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
    const { delay: p = 0, keyframes: g, repeat: v, repeatType: b, repeatDelay: T, type: S, onUpdate: w, finalKeyframe: j } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - r / this.speed, this.startTime)), l ? this.currentTime = e : this.updateTime(e);
    const M = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), D = this.playbackSpeed >= 0 ? M < 0 : M > r;
    this.currentTime = Math.max(M, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = r);
    let A = this.currentTime, R = s;
    if (v) {
      const H = Math.min(this.currentTime, r) / h;
      let P = Math.floor(H), K = H % 1;
      !K && H >= 1 && (K = 1), K === 1 && P--, P = Math.min(P, v + 1), !!(P % 2) && (b === "reverse" ? (K = 1 - K, T && (K -= T / h)) : b === "mirror" && (R = f)), A = An(0, 1, K) * h;
    }
    let B;
    D ? (this.delayState.value = g[0], B = this.delayState) : B = R.next(A), c && !D && (B.value = c(B.value));
    let { done: U } = B;
    !D && y !== null && (U = this.playbackSpeed >= 0 ? this.currentTime >= r : this.currentTime <= 0);
    const _ = this.holdTime === null && (this.state === "finished" || this.state === "running" && U);
    return _ && S !== ed && (B.value = Br(g, this.options, j, this.speed)), w && w(B.value), _ && this.finish(), B;
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
    return kv((s) => this.generator.next(s).value, e, l);
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
    const { driver: e = q4, startTime: l } = this.options;
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
function l5(a) {
  for (let e = 1; e < a.length; e++)
    a[e] ?? (a[e] = a[e - 1]);
}
const ti = (a) => a * 180 / Math.PI, nd = (a) => {
  const e = ti(Math.atan2(a[1], a[0]));
  return ad(e);
}, s5 = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (a) => (Math.abs(a[0]) + Math.abs(a[3])) / 2,
  rotate: nd,
  rotateZ: nd,
  skewX: (a) => ti(Math.atan(a[1])),
  skewY: (a) => ti(Math.atan(a[2])),
  skew: (a) => (Math.abs(a[1]) + Math.abs(a[2])) / 2
}, ad = (a) => (a = a % 360, a < 0 && (a += 360), a), fy = nd, dy = (a) => Math.sqrt(a[0] * a[0] + a[1] * a[1]), hy = (a) => Math.sqrt(a[4] * a[4] + a[5] * a[5]), o5 = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: dy,
  scaleY: hy,
  scale: (a) => (dy(a) + hy(a)) / 2,
  rotateX: (a) => ad(ti(Math.atan2(a[6], a[5]))),
  rotateY: (a) => ad(ti(Math.atan2(-a[2], a[0]))),
  rotateZ: fy,
  rotate: fy,
  skewX: (a) => ti(Math.atan(a[4])),
  skewY: (a) => ti(Math.atan(a[1])),
  skew: (a) => (Math.abs(a[1]) + Math.abs(a[4])) / 2
};
function id(a) {
  return a.includes("scale") ? 1 : 0;
}
function ld(a, e) {
  if (!a || a === "none")
    return id(e);
  const l = a.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, r;
  if (l)
    s = o5, r = l;
  else {
    const h = a.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = s5, r = h;
  }
  if (!r)
    return id(e);
  const c = s[e], f = r[1].split(",").map(u5);
  return typeof c == "function" ? c(f) : f[c];
}
const r5 = (a, e) => {
  const { transform: l = "none" } = getComputedStyle(a);
  return ld(l, e);
};
function u5(a) {
  return parseFloat(a.trim());
}
const il = [
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
], ll = /* @__PURE__ */ new Set([...il, "pathRotation"]), my = (a) => a === al || a === ct, c5 = /* @__PURE__ */ new Set(["x", "y", "z"]), f5 = il.filter((a) => !c5.has(a));
function d5(a) {
  const e = [];
  return f5.forEach((l) => {
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
  x: (a, { transform: e }) => ld(e, "x"),
  y: (a, { transform: e }) => ld(e, "y")
};
xa.translateX = xa.x;
xa.translateY = xa.y;
const ni = /* @__PURE__ */ new Set();
let sd = !1, od = !1, rd = !1;
function qv() {
  if (od) {
    const a = Array.from(ni).filter((s) => s.needsMeasurement), e = new Set(a.map((s) => s.element)), l = /* @__PURE__ */ new Map();
    e.forEach((s) => {
      const r = d5(s);
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
  od = !1, sd = !1, ni.forEach((a) => a.complete(rd)), ni.clear();
}
function $v() {
  ni.forEach((a) => {
    a.readKeyframes(), a.needsMeasurement && (od = !0);
  });
}
function h5() {
  rd = !0, $v(), qv(), rd = !1;
}
class Wd {
  constructor(e, l, s, r, c, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = l, this.name = s, this.motionValue = r, this.element = c, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (ni.add(this), sd || (sd = !0, Gt.read($v), Gt.resolveKeyframes(qv))) : (this.readKeyframes(), this.complete());
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
    l5(e);
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
const m5 = (a) => a.startsWith("--");
function Gv(a, e, l) {
  m5(e) ? a.style.setProperty(e, l) : a.style[e] = l;
}
const p5 = {};
function Yv(a, e) {
  const l = /* @__PURE__ */ gv(a);
  return () => p5[e] ?? l();
}
const y5 = /* @__PURE__ */ Yv(() => window.ScrollTimeline !== void 0, "scrollTimeline"), Xv = /* @__PURE__ */ Yv(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), ss = ([a, e, l, s]) => `cubic-bezier(${a}, ${e}, ${l}, ${s})`, py = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ ss([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ ss([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ ss([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ ss([0.33, 1.53, 0.69, 0.99])
};
function Pv(a, e) {
  if (a)
    return typeof a == "function" ? Xv() ? Uv(a, e) : "ease-out" : /* @__PURE__ */ Mv(a) ? ss(a) : Array.isArray(a) ? a.map((l) => Pv(l, e) || py.easeOut) : py[a];
}
function g5(a, e, l, { delay: s = 0, duration: r = 300, repeat: c = 0, repeatType: f = "loop", ease: h = "easeOut", times: y } = {}, p = void 0) {
  const g = {
    [e]: l
  };
  y && (g.offset = y);
  const v = Pv(h, r);
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
function Kv(a) {
  return typeof a == "function" && "applyToOptions" in a;
}
function v5({ type: a, ...e }) {
  return Kv(a) && Xv() ? a.applyToOptions(e) : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
}
class Zv extends Jd {
  constructor(e) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e)
      return;
    const { element: l, name: s, keyframes: r, pseudoElement: c, allowFlatten: f = !1, finalKeyframe: h, onComplete: y } = e;
    this.isPseudoElement = !!c, this.allowFlatten = f, this.options = e, kd(typeof e.type != "string");
    const p = v5(e);
    this.animation = g5(l, s, r, p, c), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !c) {
        const g = Br(r, this.options, h, this.speed);
        this.updateMotionValue && this.updateMotionValue(g), Gv(l, s, g), this.animation.cancel();
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && y5() ? (this.animation.timeline = e, l && (this.animation.rangeStart = l), s && (this.animation.rangeEnd = s), on) : r(this);
  }
}
const Qv = {
  anticipate: Cv,
  backInOut: Tv,
  circInOut: jv
};
function b5(a) {
  return a in Qv;
}
function x5(a) {
  typeof a.ease == "string" && b5(a.ease) && (a.ease = Qv[a.ease]);
}
const Sf = 10;
class S5 extends Zv {
  constructor(e) {
    x5(e), Hv(e), super(e), e.startTime !== void 0 && e.autoplay !== !1 && (this.startTime = e.startTime), this.options = e;
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
    const h = new Cr({
      ...f,
      autoplay: !1
    }), y = Math.max(Sf, Me.now() - this.startTime), p = An(0, Sf, y - Sf), g = h.sample(y).value, { name: v } = this.options;
    c && v && Gv(c, v, g), l.setWithVelocity(h.sample(Math.max(0, y - p)).value, g, p), h.stop();
  }
}
const yy = (a, e) => e === "zIndex" ? !1 : !!(typeof a == "number" || Array.isArray(a) || typeof a == "string" && // It's animatable if we have a string
(gn.test(a) || a === "0") && // And it contains numbers and/or colors
!a.startsWith("url("));
function w5(a) {
  const e = a[0];
  if (a.length === 1)
    return !0;
  for (let l = 0; l < a.length; l++)
    if (a[l] !== e)
      return !0;
}
function T5(a, e, l, s) {
  const r = a[0];
  if (r === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const c = a[a.length - 1], f = yy(r, e), h = yy(c, e);
  return !f || !h ? !1 : w5(a) || (l === "spring" || Kv(l)) && s;
}
function ud(a) {
  a.duration = 0, a.type = "keyframes";
}
const Fv = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), C5 = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function E5(a) {
  for (let e = 0; e < a.length; e++)
    if (typeof a[e] == "string" && C5.test(a[e]))
      return !0;
  return !1;
}
const j5 = /* @__PURE__ */ new Set([
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
]), A5 = /* @__PURE__ */ gv(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function M5(a) {
  const { motionValue: e, name: l, repeatDelay: s, repeatType: r, damping: c, type: f, keyframes: h } = a;
  if (!(e?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: p, transformTemplate: g } = e.owner.getProps();
  return A5() && l && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (Fv.has(l) || j5.has(l) && E5(h)) && (l !== "transform" || !g) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !p && !s && r !== "mirror" && c !== 0 && f !== "inertia";
}
const _5 = 40;
class D5 extends Jd {
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
    this.keyframeResolver = new T(h, (S, w, j) => this.onKeyframesResolved(S, w, b, !j), y, p, g), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(e, l, s, r) {
    this.keyframeResolver = void 0;
    const { name: c, type: f, velocity: h, delay: y, isHandoff: p, onUpdate: g } = s;
    this.resolvedAt = Me.now();
    let v = !0;
    T5(e, c, f, h) || (v = !1, (Sa.instantAnimations || !y) && g?.(Br(e, s, l)), e[0] = e[e.length - 1], ud(s), s.repeat = 0);
    const T = {
      startTime: r ? this.resolvedAt ? this.resolvedAt - this.createdAt > _5 ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: l,
      ...s,
      keyframes: e
    }, S = v && !p && M5(T), w = T.motionValue?.owner?.current;
    let j;
    if (S)
      try {
        j = new S5({
          ...T,
          element: w
        });
      } catch {
        j = new Cr(T);
      }
    else
      j = new Cr(T);
    j.finished.then(() => {
      this.notifyFinished();
    }).catch(on), this.pendingTimeline && (this.stopTimeline = j.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = j;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(e, l) {
    return this.finished.finally(e).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), h5()), this._animation;
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
function Jv(a, e, l, s = 0, r = 1) {
  const c = Array.from(a).sort((p, g) => p.sortNodePosition(g)).indexOf(e), f = a.size, h = (f - 1) * s;
  return typeof l == "function" ? l(c, f) : r === 1 ? c * s : h - c * s;
}
const gy = 30, R5 = (a) => !isNaN(parseFloat(a));
class N5 {
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
    const e = Me.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > gy)
      return 0;
    const l = Math.min(this.updatedAt - this.prevUpdatedAt, gy);
    return /* @__PURE__ */ vv(parseFloat(this.current) - parseFloat(this.prevFrameValue), l);
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
function tl(a, e) {
  return new N5(a, e);
}
function Wv(a, e) {
  if (a?.inherit && e) {
    const { inherit: l, ...s } = a;
    return { ...e, ...s };
  }
  return a;
}
function Id(a, e) {
  const l = a?.[e] ?? a?.default ?? a;
  return l !== a ? Wv(l, a) : l;
}
const O5 = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, z5 = (a) => ({
  type: "spring",
  stiffness: 550,
  damping: a === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), L5 = {
  type: "keyframes",
  duration: 0.8
}, B5 = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, V5 = (a, { keyframes: e }) => e.length > 2 ? L5 : ll.has(a) ? a.startsWith("scale") ? z5(e[1]) : O5 : B5, U5 = /* @__PURE__ */ new Set([
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
function k5(a) {
  for (const e in a)
    if (!U5.has(e))
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
  k5(h) || Object.assign(g, V5(a, g)), g.duration && (g.duration = /* @__PURE__ */ Ke(g.duration)), g.repeatDelay && (g.repeatDelay = /* @__PURE__ */ Ke(g.repeatDelay)), g.from !== void 0 && (g.keyframes[0] = g.from);
  let v = !1;
  if ((g.type === !1 || g.duration === 0 && !g.repeatDelay) && (ud(g), g.delay === 0 && (v = !0)), (Sa.instantAnimations || Sa.skipAnimations || r?.shouldSkipAnimations || h.skipAnimations) && (v = !0, ud(g), g.delay = 0), g.allowFlatten = !h.type && !h.ease, v && !c && e.get() !== void 0) {
    const b = Br(g.keyframes, h);
    if (b !== void 0) {
      Gt.update(() => {
        g.onUpdate(b), g.onComplete();
      });
      return;
    }
  }
  return h.isSync ? new Cr(g) : new D5(g);
}, H5 = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function q5(a) {
  const e = H5.exec(a);
  if (!e)
    return [,];
  const [, l, s, r] = e;
  return [`--${l ?? s}`, r];
}
function Iv(a, e, l = 1) {
  const [s, r] = q5(a);
  if (!s)
    return;
  const c = window.getComputedStyle(e).getPropertyValue(s);
  if (c) {
    const f = c.trim();
    return mv(f) ? parseFloat(f) : f;
  }
  return Pd(r) ? Iv(r, e, l + 1) : r;
}
function vy(a) {
  const e = [{}, {}];
  return a?.values.forEach((l, s) => {
    e[0][s] = l.get(), e[1][s] = l.getVelocity();
  }), e;
}
function eh(a, e, l, s) {
  if (typeof e == "function") {
    const [r, c] = vy(s);
    e = e(l !== void 0 ? l : a.custom, r, c);
  }
  if (typeof e == "string" && (e = a.variants && a.variants[e]), typeof e == "function") {
    const [r, c] = vy(s);
    e = e(l !== void 0 ? l : a.custom, r, c);
  }
  return e;
}
function ai(a, e, l) {
  const s = a.getProps();
  return eh(s, e, l !== void 0 ? l : s.custom, a);
}
const t2 = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...il
]), cd = (a) => Array.isArray(a);
function $5(a, e, l) {
  a.hasValue(e) ? a.getValue(e).set(l) : a.addValue(e, tl(l));
}
function G5(a) {
  return cd(a) ? a[a.length - 1] || 0 : a;
}
function Y5(a, e) {
  const l = ai(a, e);
  let { transitionEnd: s = {}, transition: r = {}, ...c } = l || {};
  c = { ...c, ...s };
  for (const f in c) {
    const h = G5(c[f]);
    $5(a, f, h);
  }
}
const Te = (a) => !!(a && a.getVelocity);
function X5(a) {
  return !!(Te(a) && a.add);
}
function fd(a, e) {
  const l = a.getValue("willChange");
  if (X5(l))
    return l.add(e);
  if (!l && Sa.WillChange) {
    const s = new Sa.WillChange("auto");
    a.addValue("willChange", s), s.add(e);
  }
}
function nh(a) {
  return a.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
const P5 = "framerAppearId", e2 = "data-" + nh(P5);
function n2(a) {
  return a.props[e2];
}
function K5({ protectedKeys: a, needsAnimating: e }, l) {
  const s = a.hasOwnProperty(l) && e[l] !== !0;
  return e[l] = !1, s;
}
function a2(a, e, { delay: l = 0, transitionOverride: s, type: r } = {}) {
  let { transition: c, transitionEnd: f, ...h } = e;
  const y = a.getDefaultTransition();
  c = c ? Wv(c, y) : y;
  const p = c?.reduceMotion, g = c?.skipAnimations;
  s && (c = s);
  const v = [], b = r && a.animationState && a.animationState.getState()[r], T = c?.path;
  T && T.animateVisualElement(a, h, c, l, v);
  for (const S in h) {
    const w = a.getValue(S, a.latestValues[S] ?? null), j = h[S];
    if (j === void 0 || b && K5(b, S))
      continue;
    const M = {
      delay: l,
      ...Id(c || {}, S)
    };
    g && (M.skipAnimations = !0);
    const D = w.get();
    if (D !== void 0 && !w.isAnimating() && !Array.isArray(j) && j === D && !M.velocity) {
      Gt.update(() => w.set(j));
      continue;
    }
    let A = !1;
    if (window.MotionHandoffAnimation) {
      const U = n2(a);
      if (U) {
        const _ = window.MotionHandoffAnimation(U, S, Gt);
        _ !== null && (M.startTime = _, A = !0);
      }
    }
    fd(a, S);
    const R = p ?? a.shouldReduceMotion;
    w.start(th(S, w, j, R && t2.has(S) ? { type: !1 } : M, a, A));
    const B = w.animation;
    B && v.push(B);
  }
  if (f) {
    const S = () => Gt.update(() => {
      f && Y5(a, f);
    });
    v.length ? Promise.all(v).then(S) : S();
  }
  return v;
}
function dd(a, e, l = {}) {
  const s = ai(a, e, l.type === "exit" ? a.presenceContext?.custom : void 0);
  let { transition: r = a.getDefaultTransition() || {} } = s || {};
  l.transitionOverride && (r = l.transitionOverride);
  const c = s ? () => Promise.all(a2(a, s, l)) : () => Promise.resolve(), f = a.variantChildren && a.variantChildren.size ? (y = 0) => {
    const { delayChildren: p = 0, staggerChildren: g, staggerDirection: v } = r;
    return Z5(a, e, y, p, g, v, l);
  } : () => Promise.resolve(), { when: h } = r;
  if (h) {
    const [y, p] = h === "beforeChildren" ? [c, f] : [f, c];
    return y().then(() => p());
  } else
    return Promise.all([c(), f(l.delay)]);
}
function Z5(a, e, l = 0, s = 0, r = 0, c = 1, f) {
  const h = [];
  for (const y of a.variantChildren)
    y.notify("AnimationStart", e), h.push(dd(y, e, {
      ...f,
      delay: l + (typeof s == "function" ? 0 : s) + Jv(a.variantChildren, y, s, r, c)
    }).then(() => y.notify("AnimationComplete", e)));
  return Promise.all(h);
}
function Q5(a, e, l = {}) {
  a.notify("AnimationStart", e);
  let s;
  if (Array.isArray(e)) {
    const r = e.map((c) => dd(a, c, l));
    s = Promise.all(r);
  } else if (typeof e == "string")
    s = dd(a, e, l);
  else {
    const r = typeof e == "function" ? ai(a, e, l.custom) : e;
    s = Promise.all(a2(a, r, l));
  }
  return s.then(() => {
    a.notify("AnimationComplete", e);
  });
}
const F5 = {
  test: (a) => a === "auto",
  parse: (a) => a
}, i2 = (a) => (e) => e.test(a), l2 = [al, ct, jn, Pn, w4, S4, F5], by = (a) => l2.find(i2(a));
function J5(a) {
  return typeof a == "number" ? a === 0 : a !== null ? a === "none" || a === "0" || yv(a) : !0;
}
const W5 = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function I5(a) {
  const [e, l] = a.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return a;
  const [s] = l.match(Kd) || [];
  if (!s)
    return a;
  const r = l.replace(s, "");
  let c = W5.has(e) ? 1 : 0;
  return s !== l && (c *= 100), e + "(" + c + r + ")";
}
const tw = /\b([a-z-]*)\(.*?\)/gu, hd = {
  ...gn,
  getAnimatableNone: (a) => {
    const e = a.match(tw);
    return e ? e.map(I5).join(" ") : a;
  }
}, md = {
  ...gn,
  getAnimatableNone: (a) => {
    const e = gn.parse(a);
    return gn.createTransformer(a)(e.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, xy = {
  ...al,
  transform: Math.round
}, ew = {
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
  scale: Qo,
  scaleX: Qo,
  scaleY: Qo,
  scaleZ: Qo,
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
  opacity: ys,
  originX: sy,
  originY: sy,
  originZ: ct
}, Er = {
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
  ...ew,
  zIndex: xy,
  // SVG
  fillOpacity: ys,
  strokeOpacity: ys,
  numOctaves: xy
}, nw = {
  ...Er,
  // Color props
  color: fe,
  backgroundColor: fe,
  outlineColor: fe,
  fill: fe,
  stroke: fe,
  // Border props
  borderColor: fe,
  borderTopColor: fe,
  borderRightColor: fe,
  borderBottomColor: fe,
  borderLeftColor: fe,
  filter: hd,
  WebkitFilter: hd,
  mask: md,
  WebkitMask: md
}, s2 = (a) => nw[a], aw = /* @__PURE__ */ new Set([hd, md]);
function o2(a, e) {
  let l = s2(a);
  return aw.has(l) || (l = gn), l.getAnimatableNone ? l.getAnimatableNone(e) : void 0;
}
const iw = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function lw(a, e, l) {
  let s = 0, r;
  for (; s < a.length && !r; ) {
    const c = a[s];
    typeof c == "string" && !iw.has(c) && Ii(c).values.length && (r = a[s]), s++;
  }
  if (r && l)
    for (const c of e)
      a[c] = o2(l, r);
}
class sw extends Wd {
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
        const b = Iv(v, l.current);
        b !== void 0 && (e[g] = b), g === e.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !t2.has(s) || e.length !== 2)
      return;
    const [r, c] = e, f = by(r), h = by(c), y = ly(r), p = ly(c);
    if (y !== p && xa[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (f !== h)
      if (my(f) && my(h))
        for (let g = 0; g < e.length; g++) {
          const v = e[g];
          typeof v == "string" && (e[g] = parseFloat(v));
        }
      else xa[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: l } = this, s = [];
    for (let r = 0; r < e.length; r++)
      (e[r] === null || J5(e[r])) && s.push(r);
    s.length && lw(e, s, l);
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
function r2(a, e, l) {
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
const pd = (a, e) => e && typeof a == "number" ? e.transform(a) : a;
function fr(a) {
  return pv(a) && "offsetHeight" in a && !("ownerSVGElement" in a);
}
const { schedule: ih } = /* @__PURE__ */ _v(queueMicrotask, !1), hn = {
  x: !1,
  y: !1
};
function u2() {
  return hn.x || hn.y;
}
function ow(a) {
  return a === "x" || a === "y" ? hn[a] ? null : (hn[a] = !0, () => {
    hn[a] = !1;
  }) : hn.x || hn.y ? null : (hn.x = hn.y = !0, () => {
    hn.x = hn.y = !1;
  });
}
function c2(a, e) {
  const l = r2(a), s = new AbortController(), r = {
    passive: !0,
    ...e,
    signal: s.signal
  };
  return [l, r, () => s.abort()];
}
function rw(a) {
  return !(a.pointerType === "touch" || u2());
}
function uw(a, e, l = {}) {
  const [s, r, c] = c2(a, l);
  return s.forEach((f) => {
    let h = !1, y = !1, p;
    const g = () => {
      f.removeEventListener("pointerleave", S);
    }, v = (j) => {
      p && (p(j), p = void 0), g();
    }, b = (j) => {
      h = !1, window.removeEventListener("pointerup", b), window.removeEventListener("pointercancel", b), y && (y = !1, v(j));
    }, T = () => {
      h = !0, window.addEventListener("pointerup", b, r), window.addEventListener("pointercancel", b, r);
    }, S = (j) => {
      if (j.pointerType !== "touch") {
        if (h) {
          y = !0;
          return;
        }
        v(j);
      }
    }, w = (j) => {
      if (!rw(j))
        return;
      y = !1;
      const M = e(f, j);
      typeof M == "function" && (p = M, f.addEventListener("pointerleave", S, r));
    };
    f.addEventListener("pointerenter", w, r), f.addEventListener("pointerdown", T, r);
  }), c;
}
const f2 = (a, e) => e ? a === e ? !0 : f2(a, e.parentElement) : !1, lh = (a) => a.pointerType === "mouse" ? typeof a.button != "number" || a.button <= 0 : a.isPrimary !== !1, cw = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function fw(a) {
  return cw.has(a.tagName) || a.isContentEditable === !0;
}
const dw = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function hw(a) {
  return dw.has(a.tagName) || a.isContentEditable === !0;
}
const dr = /* @__PURE__ */ new WeakSet();
function Sy(a) {
  return (e) => {
    e.key === "Enter" && a(e);
  };
}
function wf(a, e) {
  a.dispatchEvent(new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }));
}
const mw = (a, e) => {
  const l = a.currentTarget;
  if (!l)
    return;
  const s = Sy(() => {
    if (dr.has(l))
      return;
    wf(l, "down");
    const r = Sy(() => {
      wf(l, "up");
    }), c = () => wf(l, "cancel");
    l.addEventListener("keyup", r, e), l.addEventListener("blur", c, e);
  });
  l.addEventListener("keydown", s, e), l.addEventListener("blur", () => l.removeEventListener("keydown", s), e);
};
function wy(a) {
  return lh(a) && !u2();
}
const Ty = /* @__PURE__ */ new WeakSet();
function pw(a, e, l = {}) {
  const [s, r, c] = c2(a, l), f = (h) => {
    const y = h.currentTarget;
    if (!wy(h) || Ty.has(h))
      return;
    dr.add(y), l.stopPropagation && Ty.add(h);
    const p = e(y, h), g = { ...r, capture: !0 }, v = (S, w) => {
      window.removeEventListener("pointerup", b, g), window.removeEventListener("pointercancel", T, g), dr.has(y) && dr.delete(y), wy(S) && typeof p == "function" && p(S, { success: w });
    }, b = (S) => {
      v(S, y === window || y === document || l.useGlobalTarget || f2(y, S.target));
    }, T = (S) => {
      v(S, !1);
    };
    window.addEventListener("pointerup", b, g), window.addEventListener("pointercancel", T, g);
  };
  return s.forEach((h) => {
    (l.useGlobalTarget ? window : h).addEventListener("pointerdown", f, r), fr(h) && (h.addEventListener("focus", (p) => mw(p, r)), !fw(h) && !h.hasAttribute("tabindex") && (h.tabIndex = 0));
  }), c;
}
function sh(a) {
  return pv(a) && "ownerSVGElement" in a;
}
const hr = /* @__PURE__ */ new WeakMap();
let mr;
const d2 = (a, e, l) => (s, r) => r && r[0] ? r[0][a + "Size"] : sh(s) && "getBBox" in s ? s.getBBox()[e] : s[l], yw = /* @__PURE__ */ d2("inline", "width", "offsetWidth"), gw = /* @__PURE__ */ d2("block", "height", "offsetHeight");
function vw({ target: a, borderBoxSize: e }) {
  hr.get(a)?.forEach((l) => {
    l(a, {
      get width() {
        return yw(a, e);
      },
      get height() {
        return gw(a, e);
      }
    });
  });
}
function bw(a) {
  a.forEach(vw);
}
function xw() {
  typeof ResizeObserver > "u" || (mr = new ResizeObserver(bw));
}
function Sw(a, e) {
  mr || xw();
  const l = r2(a);
  return l.forEach((s) => {
    let r = hr.get(s);
    r || (r = /* @__PURE__ */ new Set(), hr.set(s, r)), r.add(e), mr?.observe(s);
  }), () => {
    l.forEach((s) => {
      const r = hr.get(s);
      r?.delete(e), r?.size || mr?.unobserve(s);
    });
  };
}
const pr = /* @__PURE__ */ new Set();
let Pi;
function ww() {
  Pi = () => {
    const a = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    pr.forEach((e) => e(a));
  }, window.addEventListener("resize", Pi);
}
function Tw(a) {
  return pr.add(a), Pi || ww(), () => {
    pr.delete(a), !pr.size && typeof Pi == "function" && (window.removeEventListener("resize", Pi), Pi = void 0);
  };
}
function Cy(a, e) {
  return typeof a == "function" ? Tw(a) : Sw(a, e);
}
function Cw(a) {
  return sh(a) && a.tagName === "svg";
}
const Ew = [...l2, fe, gn], jw = (a) => Ew.find(i2(a)), Ey = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Ki = () => ({
  x: Ey(),
  y: Ey()
}), jy = () => ({ min: 0, max: 0 }), me = () => ({
  x: jy(),
  y: jy()
}), Aw = /* @__PURE__ */ new WeakMap();
function Vr(a) {
  return a !== null && typeof a == "object" && typeof a.start == "function";
}
function gs(a) {
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
function Ur(a) {
  return Vr(a.animate) || rh.some((e) => gs(a[e]));
}
function h2(a) {
  return !!(Ur(a) || a.variants);
}
function Mw(a, e, l) {
  for (const s in e) {
    const r = e[s], c = l[s];
    if (Te(r))
      a.addValue(s, r);
    else if (Te(c))
      a.addValue(s, tl(r, { owner: a }));
    else if (c !== r)
      if (a.hasValue(s)) {
        const f = a.getValue(s);
        f.liveStyle === !0 ? f.jump(r) : f.hasAnimated || f.set(r);
      } else {
        const f = a.getStaticValue(s);
        a.addValue(s, tl(f !== void 0 ? f : r, { owner: a }));
      }
  }
  for (const s in l)
    e[s] === void 0 && a.removeValue(s);
  return e;
}
const jr = { current: null }, uh = { current: !1 }, _w = typeof window < "u";
function m2() {
  if (uh.current = !0, !!_w)
    if (window.matchMedia) {
      const a = window.matchMedia("(prefers-reduced-motion)"), e = () => jr.current = a.matches;
      a.addEventListener("change", e), e();
    } else
      jr.current = !1;
}
const Ay = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let Ar = {};
function p2(a) {
  Ar = a;
}
function Dw() {
  return Ar;
}
class Rw {
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
      this.renderScheduledAt < T && (this.renderScheduledAt = T, Gt.render(this.render, !1, !0));
    };
    const { latestValues: p, renderState: g } = h;
    this.latestValues = p, this.baseTarget = { ...p }, this.initialValues = l.initial ? { ...p } : {}, this.renderState = g, this.parent = e, this.props = l, this.presenceContext = s, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = r, this.skipAnimationsConfig = c, this.options = y, this.blockInitialAnimation = !!f, this.isControllingVariants = Ur(l), this.isVariantNode = h2(l), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
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
    this.current = e, Aw.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((l, s) => this.bindToMotionValue(s, l)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (uh.current || m2(), this.shouldReduceMotion = jr.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
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
    if (this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)(), l.accelerate && Fv.has(e) && this.current instanceof HTMLElement) {
      const { factory: f, keyframes: h, times: y, ease: p, duration: g } = l.accelerate, v = new Zv({
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
    const s = ll.has(e);
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
    for (e in Ar) {
      const l = Ar[e];
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
    for (let s = 0; s < Ay.length; s++) {
      const r = Ay[s];
      this.propEventSubscriptions[r] && (this.propEventSubscriptions[r](), delete this.propEventSubscriptions[r]);
      const c = "on" + r, f = e[c];
      f && (this.propEventSubscriptions[r] = this.on(r, f));
    }
    this.prevMotionValues = Mw(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return s === void 0 && l !== void 0 && (s = tl(l === null ? void 0 : l, { owner: this }), this.addValue(e, s)), s;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(e, l) {
    let s = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
    return s != null && (typeof s == "string" && (mv(s) || yv(s)) ? s = parseFloat(s) : !jw(s) && gn.test(l) && (s = o2(e, l)), this.setBaseTarget(e, Te(s) ? s.get() : s)), Te(s) ? s.get() : s;
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
class y2 extends Rw {
  constructor() {
    super(...arguments), this.KeyframeResolver = sw;
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
function g2({ top: a, left: e, right: l, bottom: s }) {
  return {
    x: { min: e, max: l },
    y: { min: a, max: s }
  };
}
function Nw({ x: a, y: e }) {
  return { top: e.min, right: a.max, bottom: e.max, left: a.min };
}
function Ow(a, e) {
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
function Tf(a) {
  return a === void 0 || a === 1;
}
function yd({ scale: a, scaleX: e, scaleY: l }) {
  return !Tf(a) || !Tf(e) || !Tf(l);
}
function Fa(a) {
  return yd(a) || v2(a) || a.z || a.rotate || a.rotateX || a.rotateY || a.skewX || a.skewY;
}
function v2(a) {
  return My(a.x) || My(a.y);
}
function My(a) {
  return a && a !== "0%";
}
function Mr(a, e, l) {
  const s = a - l, r = e * s;
  return l + r;
}
function _y(a, e, l, s, r) {
  return r !== void 0 && (a = Mr(a, r, s)), Mr(a, l, s) + e;
}
function gd(a, e = 0, l = 1, s, r) {
  a.min = _y(a.min, e, l, s, r), a.max = _y(a.max, e, l, s, r);
}
function b2(a, { x: e, y: l }) {
  gd(a.x, e.translate, e.scale, e.originPoint), gd(a.y, l.translate, l.scale, l.originPoint);
}
const Dy = 0.999999999999, Ry = 1.0000000000001;
function zw(a, e, l, s = !1) {
  const r = l.length;
  if (!r)
    return;
  e.x = e.y = 1;
  let c, f;
  for (let h = 0; h < r; h++) {
    c = l[h], f = c.projectionDelta;
    const { visualElement: y } = c.options;
    y && y.props.style && y.props.style.display === "contents" || (s && c.options.layoutScroll && c.scroll && c !== c.root && (En(a.x, -c.scroll.offset.x), En(a.y, -c.scroll.offset.y)), f && (e.x *= f.x.scale, e.y *= f.y.scale, b2(a, f)), s && Fa(c.latestValues) && yr(a, c.latestValues, c.layout?.layoutBox));
  }
  e.x < Ry && e.x > Dy && (e.x = 1), e.y < Ry && e.y > Dy && (e.y = 1);
}
function En(a, e) {
  a.min += e, a.max += e;
}
function Ny(a, e, l, s, r = 0.5) {
  const c = $t(a.min, a.max, r);
  gd(a, e, l, c, s);
}
function Oy(a, e) {
  return typeof a == "string" ? parseFloat(a) / 100 * (e.max - e.min) : a;
}
function yr(a, e, l) {
  const s = l ?? a;
  Ny(a.x, Oy(e.x, s.x), e.scaleX, e.scale, e.originX), Ny(a.y, Oy(e.y, s.y), e.scaleY, e.scale, e.originY);
}
function x2(a, e) {
  return g2(Ow(a.getBoundingClientRect(), e));
}
function Lw(a, e, l) {
  const s = x2(a, l), { scroll: r } = e;
  return r && (En(s.x, r.offset.x), En(s.y, r.offset.y)), s;
}
const Bw = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Vw = il.length;
function Uw(a, e, l) {
  let s = "", r = !0;
  for (let f = 0; f < Vw; f++) {
    const h = il[f], y = a[h];
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
      const g = pd(y, Er[h]);
      if (!p) {
        r = !1;
        const v = Bw[h] || h;
        s += `${v}(${g}) `;
      }
      l && (e[h] = g);
    }
  }
  const c = a.pathRotation;
  return c && (r = !1, s += `rotate(${pd(c, Er.pathRotation)}) `), s = s.trim(), l ? s = l(e, r ? "" : s) : r && (s = "none"), s;
}
function ch(a, e, l) {
  const { style: s, vars: r, transformOrigin: c } = a;
  let f = !1, h = !1;
  for (const y in e) {
    const p = e[y];
    if (ll.has(y)) {
      f = !0;
      continue;
    } else if (Rv(y)) {
      r[y] = p;
      continue;
    } else {
      const g = pd(p, Er[y]);
      y.startsWith("origin") ? (h = !0, c[y] = g) : s[y] = g;
    }
  }
  if (e.transform || (f || l ? s.transform = Uw(e, a.transform, l) : s.transform && (s.transform = "none")), h) {
    const { originX: y = "50%", originY: p = "50%", originZ: g = 0 } = c;
    s.transformOrigin = `${y} ${p} ${g}`;
  }
}
function S2(a, { style: e, vars: l }, s, r) {
  const c = a.style;
  let f;
  for (f in e)
    c[f] = e[f];
  r?.applyProjectionStyles(c, s);
  for (f in l)
    c.setProperty(f, l[f]);
}
function zy(a, e) {
  return e.max === e.min ? 0 : a / (e.max - e.min) * 100;
}
const as = {
  correct: (a, e) => {
    if (!e.target)
      return a;
    if (typeof a == "string")
      if (ct.test(a))
        a = parseFloat(a);
      else
        return a;
    const l = zy(a, e.target.x), s = zy(a, e.target.y);
    return `${l}% ${s}%`;
  }
}, kw = {
  correct: (a, { treeScale: e, projectionDelta: l }) => {
    const s = a, r = gn.parse(a);
    if (r.length > 5)
      return s;
    const c = gn.createTransformer(a), f = typeof r[0] != "number" ? 1 : 0, h = l.x.scale * e.x, y = l.y.scale * e.y;
    r[0 + f] /= h, r[1 + f] /= y;
    const p = $t(h, y, 0.5);
    return typeof r[2 + f] == "number" && (r[2 + f] /= p), typeof r[3 + f] == "number" && (r[3 + f] /= p), c(r);
  }
}, vd = {
  borderRadius: {
    ...as,
    applyTo: [...ah]
  },
  borderTopLeftRadius: as,
  borderTopRightRadius: as,
  borderBottomLeftRadius: as,
  borderBottomRightRadius: as,
  boxShadow: kw
};
function w2(a, { layout: e, layoutId: l }) {
  return ll.has(a) || a.startsWith("origin") || (e || l !== void 0) && (!!vd[a] || a === "opacity");
}
function fh(a, e, l) {
  const s = a.style, r = e?.style, c = {};
  if (!s)
    return c;
  for (const f in s)
    (Te(s[f]) || r && Te(r[f]) || w2(f, a) || l?.getValue(f)?.liveStyle !== void 0) && (c[f] = s[f]);
  return c;
}
function Hw(a) {
  return window.getComputedStyle(a);
}
class qw extends y2 {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = S2;
  }
  readValueFromInstance(e, l) {
    if (ll.has(l))
      return this.projection?.isProjecting ? id(l) : r5(e, l);
    {
      const s = Hw(e), r = (Rv(l) ? s.getPropertyValue(l) : s[l]) || 0;
      return typeof r == "string" ? r.trim() : r;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: l }) {
    return x2(e, l);
  }
  build(e, l, s) {
    ch(e, l, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, l, s) {
    return fh(e, l, s);
  }
}
const $w = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Gw = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Yw(a, e, l = 1, s = 0, r = !0) {
  a.pathLength = 1;
  const c = r ? $w : Gw;
  a[c.offset] = `${-s}`, a[c.array] = `${e} ${l}`;
}
const Xw = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function T2(a, {
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
  for (const T of Xw)
    v[T] !== void 0 && (b[T] = v[T], delete v[T]);
  e !== void 0 && (v.x = e), l !== void 0 && (v.y = l), s !== void 0 && (v.scale = s), r !== void 0 && Yw(v, r, c, f, !1);
}
const C2 = /* @__PURE__ */ new Set([
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
]), E2 = (a) => typeof a == "string" && a.toLowerCase() === "svg";
function Pw(a, e, l, s) {
  S2(a, e, void 0, s);
  for (const r in e.attrs)
    a.setAttribute(C2.has(r) ? r : nh(r), e.attrs[r]);
}
function j2(a, e, l) {
  const s = fh(a, e, l);
  for (const r in a)
    if (Te(a[r]) || Te(e[r])) {
      const c = il.indexOf(r) !== -1 ? "attr" + r.charAt(0).toUpperCase() + r.substring(1) : r;
      s[c] = a[r];
    }
  return s;
}
class Kw extends y2 {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = me;
  }
  getBaseTargetFromProps(e, l) {
    return e[l];
  }
  readValueFromInstance(e, l) {
    if (ll.has(l)) {
      const s = s2(l);
      return s && s.default || 0;
    }
    return l = C2.has(l) ? l : nh(l), e.getAttribute(l);
  }
  scrapeMotionValuesFromProps(e, l, s) {
    return j2(e, l, s);
  }
  build(e, l, s) {
    T2(e, l, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(e, l, s, r) {
    Pw(e, l, s, r);
  }
  mount(e) {
    this.isSVGTag = E2(e.tagName), super.mount(e);
  }
}
const Zw = rh.length;
function A2(a) {
  if (!a)
    return;
  if (!a.isControllingVariants) {
    const l = a.parent ? A2(a.parent) || {} : {};
    return a.props.initial !== void 0 && (l.initial = a.props.initial), l;
  }
  const e = {};
  for (let l = 0; l < Zw; l++) {
    const s = rh[l], r = a.props[s];
    (gs(r) || r === !1) && (e[s] = r);
  }
  return e;
}
function M2(a, e) {
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
const Qw = [...oh].reverse(), Fw = oh.length;
function Jw(a) {
  return (e) => Promise.all(e.map(({ animation: l, options: s }) => Q5(a, l, s)));
}
function Ww(a) {
  let e = Jw(a), l = Ly(), s = !0, r = !1;
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
    const { props: g } = a, v = A2(a.parent) || {}, b = [], T = /* @__PURE__ */ new Set();
    let S = {}, w = 1 / 0;
    for (let M = 0; M < Fw; M++) {
      const D = Qw[M], A = l[D], R = g[D] !== void 0 ? g[D] : v[D], B = gs(R), U = D === p ? A.isActive : null;
      U === !1 && (w = M);
      let _ = R === v[D] && R !== g[D] && B;
      if (_ && (s || r) && a.manuallyAnimateOnMount && (_ = !1), A.protectedKeys = { ...S }, // If it isn't active and hasn't *just* been set as inactive
      !A.isActive && U === null || // If we didn't and don't have any defined prop for this animation type
      !R && !A.prevProp || // Or if the prop doesn't define an animation
      Vr(R) || typeof R == "boolean")
        continue;
      if (D === "exit" && A.isActive && U !== !0) {
        A.prevResolvedValues && (S = {
          ...S,
          ...A.prevResolvedValues
        });
        continue;
      }
      const H = Iw(A.prevProp, R);
      let P = H || // If we're making this variant active, we want to always make it active
      D === p && A.isActive && !_ && B || // If we removed a higher-priority variant (i is in reverse order)
      M > w && B, K = !1;
      const it = Array.isArray(R) ? R : [R];
      let at = it.reduce(c(D), {});
      U === !1 && (at = {});
      const { prevResolvedValues: I = {} } = A, F = {
        ...I,
        ...at
      }, et = (Z) => {
        P = !0, T.has(Z) && (K = !0, T.delete(Z)), A.needsAnimating[Z] = !0;
        const nt = a.getValue(Z);
        nt && (nt.liveStyle = !1);
      };
      for (const Z in F) {
        const nt = at[Z], st = I[Z];
        if (S.hasOwnProperty(Z))
          continue;
        let O = !1;
        cd(nt) && cd(st) ? O = !M2(nt, st) || H : O = nt !== st, O ? nt != null ? et(Z) : T.add(Z) : nt !== void 0 && T.has(Z) ? et(Z) : A.protectedKeys[Z] = !0;
      }
      A.prevProp = R, A.prevResolvedValues = at, A.isActive && (S = { ...S, ...at }), (s || r) && a.blockInitialAnimation && (P = !1);
      const N = _ && H;
      P && (!N || K) && b.push(...it.map((Z) => {
        const nt = { type: D };
        if (typeof Z == "string" && (s || r) && !N && a.manuallyAnimateOnMount && a.parent) {
          const { parent: st } = a, O = ai(st, Z);
          if (st.enteringChildren && O) {
            const { delayChildren: Y } = O.transition || {};
            nt.delay = Jv(st.enteringChildren, a, Y);
          }
        }
        return {
          animation: Z,
          options: nt
        };
      }));
    }
    if (T.size) {
      const M = {};
      if (typeof g.initial != "boolean") {
        const D = ai(a, Array.isArray(g.initial) ? g.initial[0] : g.initial);
        D && D.transition && (M.transition = D.transition);
      }
      T.forEach((D) => {
        const A = a.getBaseTarget(D), R = a.getValue(D);
        R && (R.liveStyle = !0), M[D] = A ?? null;
      }), b.push({ animation: M });
    }
    let j = !!b.length;
    return s && (g.initial === !1 || g.initial === g.animate) && !a.manuallyAnimateOnMount && (j = !1), s = !1, r = !1, j ? e(b) : Promise.resolve();
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
      l = Ly(), r = !0;
    }
  };
}
function Iw(a, e) {
  return typeof e == "string" ? e !== a : Array.isArray(e) ? !M2(e, a) : !1;
}
function Pa(a = !1) {
  return {
    isActive: a,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Ly() {
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
function bd(a, e) {
  a.min = e.min, a.max = e.max;
}
function dn(a, e) {
  bd(a.x, e.x), bd(a.y, e.y);
}
function By(a, e) {
  a.translate = e.translate, a.scale = e.scale, a.originPoint = e.originPoint, a.origin = e.origin;
}
const _2 = 1e-4, t9 = 1 - _2, e9 = 1 + _2, D2 = 0.01, n9 = 0 - D2, a9 = 0 + D2;
function _e(a) {
  return a.max - a.min;
}
function i9(a, e, l) {
  return Math.abs(a - e) <= l;
}
function Vy(a, e, l, s = 0.5) {
  a.origin = s, a.originPoint = $t(e.min, e.max, a.origin), a.scale = _e(l) / _e(e), a.translate = $t(l.min, l.max, a.origin) - a.originPoint, (a.scale >= t9 && a.scale <= e9 || isNaN(a.scale)) && (a.scale = 1), (a.translate >= n9 && a.translate <= a9 || isNaN(a.translate)) && (a.translate = 0);
}
function ds(a, e, l, s) {
  Vy(a.x, e.x, l.x, s ? s.originX : void 0), Vy(a.y, e.y, l.y, s ? s.originY : void 0);
}
function Uy(a, e, l, s = 0) {
  const r = s ? $t(l.min, l.max, s) : l.min;
  a.min = r + e.min, a.max = a.min + _e(e);
}
function l9(a, e, l, s) {
  Uy(a.x, e.x, l.x, s?.x), Uy(a.y, e.y, l.y, s?.y);
}
function ky(a, e, l, s = 0) {
  const r = s ? $t(l.min, l.max, s) : l.min;
  a.min = e.min - r, a.max = a.min + _e(e);
}
function _r(a, e, l, s) {
  ky(a.x, e.x, l.x, s?.x), ky(a.y, e.y, l.y, s?.y);
}
function Hy(a, e, l, s, r) {
  return a -= e, a = Mr(a, 1 / l, s), r !== void 0 && (a = Mr(a, 1 / r, s)), a;
}
function s9(a, e = 0, l = 1, s = 0.5, r, c = a, f = a) {
  if (jn.test(e) && (e = parseFloat(e), e = $t(f.min, f.max, e / 100) - f.min), typeof e != "number")
    return;
  let h = $t(c.min, c.max, s);
  a === c && (h -= e), a.min = Hy(a.min, e, l, h, r), a.max = Hy(a.max, e, l, h, r);
}
function qy(a, e, [l, s, r], c, f) {
  s9(a, e[l], e[s], e[r], e.scale, c, f);
}
const o9 = ["x", "scaleX", "originX"], r9 = ["y", "scaleY", "originY"];
function $y(a, e, l, s) {
  qy(a.x, e, o9, l ? l.x : void 0, s ? s.x : void 0), qy(a.y, e, r9, l ? l.y : void 0, s ? s.y : void 0);
}
function Gy(a) {
  return a.translate === 0 && a.scale === 1;
}
function R2(a) {
  return Gy(a.x) && Gy(a.y);
}
function Yy(a, e) {
  return a.min === e.min && a.max === e.max;
}
function u9(a, e) {
  return Yy(a.x, e.x) && Yy(a.y, e.y);
}
function Xy(a, e) {
  return Math.round(a.min) === Math.round(e.min) && Math.round(a.max) === Math.round(e.max);
}
function N2(a, e) {
  return Xy(a.x, e.x) && Xy(a.y, e.y);
}
function Py(a) {
  return _e(a.x) / _e(a.y);
}
function Ky(a, e) {
  return a.translate === e.translate && a.scale === e.scale && a.originPoint === e.originPoint;
}
function Cn(a) {
  return [a("x"), a("y")];
}
function c9(a, e, l) {
  let s = "";
  const r = a.x.translate / e.x, c = a.y.translate / e.y, f = l?.z || 0;
  if ((r || c || f) && (s = `translate3d(${r}px, ${c}px, ${f}px) `), (e.x !== 1 || e.y !== 1) && (s += `scale(${1 / e.x}, ${1 / e.y}) `), l) {
    const { transformPerspective: p, rotate: g, pathRotation: v, rotateX: b, rotateY: T, skewX: S, skewY: w } = l;
    p && (s = `perspective(${p}px) ${s}`), g && (s += `rotate(${g}deg) `), v && (s += `rotate(${v}deg) `), b && (s += `rotateX(${b}deg) `), T && (s += `rotateY(${T}deg) `), S && (s += `skewX(${S}deg) `), w && (s += `skewY(${w}deg) `);
  }
  const h = a.x.scale * e.x, y = a.y.scale * e.y;
  return (h !== 1 || y !== 1) && (s += `scale(${h}, ${y})`), s || "none";
}
const f9 = ah.length, Zy = (a) => typeof a == "string" ? parseFloat(a) : a, Qy = (a) => typeof a == "number" || ct.test(a);
function d9(a, e, l, s, r, c) {
  r ? (a.opacity = $t(0, l.opacity ?? 1, h9(s)), a.opacityExit = $t(e.opacity ?? 1, 0, m9(s))) : c && (a.opacity = $t(e.opacity ?? 1, l.opacity ?? 1, s));
  for (let f = 0; f < f9; f++) {
    const h = ah[f];
    let y = Fy(e, h), p = Fy(l, h);
    if (y === void 0 && p === void 0)
      continue;
    y || (y = 0), p || (p = 0), y === 0 || p === 0 || Qy(y) === Qy(p) ? (a[h] = Math.max($t(Zy(y), Zy(p), s), 0), (jn.test(p) || jn.test(y)) && (a[h] += "%")) : a[h] = p;
  }
  (e.rotate || l.rotate) && (a.rotate = $t(e.rotate || 0, l.rotate || 0, s));
}
function Fy(a, e) {
  return a[e] !== void 0 ? a[e] : a.borderRadius;
}
const h9 = /* @__PURE__ */ O2(0, 0.5, Ev), m9 = /* @__PURE__ */ O2(0.5, 0.95, on);
function O2(a, e, l) {
  return (s) => s < a ? 0 : s > e ? 1 : l(/* @__PURE__ */ ps(a, e, s));
}
function p9(a, e, l) {
  const s = Te(a) ? a : tl(a);
  return s.start(th("", s, e, l)), s.animation;
}
function vs(a, e, l, s = { passive: !0 }) {
  return a.addEventListener(e, l, s), () => a.removeEventListener(e, l, s);
}
const y9 = (a, e) => a.depth - e.depth;
class g9 {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(e) {
    Ud(this.children, e), this.isDirty = !0;
  }
  remove(e) {
    xr(this.children, e), this.isDirty = !0;
  }
  forEach(e) {
    this.isDirty && this.children.sort(y9), this.isDirty = !1, this.children.forEach(e);
  }
}
function v9(a, e) {
  const l = Me.now(), s = ({ timestamp: r }) => {
    const c = r - l;
    c >= e && (wa(s), a(c - e));
  };
  return Gt.setup(s, !0), () => wa(s);
}
function gr(a) {
  return Te(a) ? a.get() : a;
}
class b9 {
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
      (!r || r.isConnected === !1) && !s.snapshot && (xr(this.members, s), s.unmount());
    }
    e.scheduleRender();
  }
  remove(e) {
    if (xr(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead) {
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
const vr = {
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
}, Cf = ["", "X", "Y", "Z"], x9 = 1e3;
let S9 = 0;
function Ef(a, e, l, s) {
  const { latestValues: r } = e;
  r[a] && (l[a] = r[a], e.setStaticValue(a, 0), s && (s[a] = 0));
}
function z2(a) {
  if (a.hasCheckedOptimisedAppear = !0, a.root === a)
    return;
  const { visualElement: e } = a.options;
  if (!e)
    return;
  const l = n2(e);
  if (window.MotionHasOptimisedAnimation(l, "transform")) {
    const { layout: r, layoutId: c } = a.options;
    window.MotionCancelOptimisedAnimation(l, "transform", Gt, !(r || c));
  }
  const { parent: s } = a;
  s && !s.hasCheckedOptimisedAppear && z2(s);
}
function L2({ attachResizeListener: a, defaultParent: e, measureScroll: l, checkIsScrollRoot: s, resetTransform: r }) {
  return class {
    constructor(f = {}, h = e?.()) {
      this.id = S9++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(C9), this.nodes.forEach(D9), this.nodes.forEach(R9), this.nodes.forEach(E9);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = f, this.root = h ? h.root || h : this, this.path = h ? [...h.path, h] : [], this.parent = h, this.depth = h ? h.depth + 1 : 0;
      for (let y = 0; y < this.path.length; y++)
        this.path[y].shouldResetTransform = !0;
      this.root === this && (this.nodes = new g9());
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
      this.isSVG = sh(f) && !Cw(f), this.instance = f;
      const { layoutId: h, layout: y, visualElement: p } = this.options;
      if (p && !p.current && p.mount(f), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (y || h) && (this.isLayoutDirty = !0), a) {
        let g, v = 0;
        const b = () => this.root.updateBlockedByResize = !1;
        Gt.read(() => {
          v = window.innerWidth;
        }), a(f, () => {
          const T = window.innerWidth;
          T !== v && (v = T, this.root.updateBlockedByResize = !0, g && g(), g = v9(b, 250), vr.hasAnimatedSinceResize && (vr.hasAnimatedSinceResize = !1, this.nodes.forEach(Iy)));
        });
      }
      h && this.root.registerSharedNode(h, this), this.options.animate !== !1 && p && (h || y) && this.addEventListener("didUpdate", ({ delta: g, hasLayoutChanged: v, hasRelativeLayoutChanged: b, layout: T }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const S = this.options.transition || p.getDefaultTransition() || B9, { onLayoutAnimationStart: w, onLayoutAnimationComplete: j } = p.getProps(), M = !this.targetLayout || !N2(this.targetLayout, T), D = !v && b;
        if (this.options.layoutRoot || this.resumeFrom || D || v && (M || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const A = {
            ...Id(S, "layout"),
            onPlay: w,
            onComplete: j
          };
          (p.shouldReduceMotion || this.options.layoutRoot) && (A.delay = 0, A.type = !1), this.startAnimation(A), this.setAnimationOrigin(g, D, A.path);
        } else
          v || Iy(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
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
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(N9), this.animationId++);
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
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && z2(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
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
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), y && this.nodes.forEach(A9), this.nodes.forEach(Jy);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Wy);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(M9), this.nodes.forEach(_9), this.nodes.forEach(w9), this.nodes.forEach(T9)) : this.nodes.forEach(Wy), this.clearAllSnapshots();
      const h = Me.now();
      we.delta = An(0, 1e3 / 60, h - we.timestamp), we.timestamp = h, we.isProcessing = !0, yf.update.process(we), yf.preRender.process(we), yf.render.process(we), we.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, ih.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(j9), this.sharedNodes.forEach(O9);
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
      const f = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, h = this.projectionDelta && !R2(this.projectionDelta), y = this.getTransformTemplate(), p = y ? y(this.latestValues, "") : void 0, g = p !== this.prevTransformTemplateValue;
      f && this.instance && (h || Fa(this.latestValues) || g) && (r(this.instance, p), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(f = !0) {
      const h = this.measurePageBox();
      let y = this.removeElementScroll(h);
      return f && (y = this.removeTransform(y)), V9(y), {
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
      if (!(this.scroll?.wasRoot || this.path.some(U9))) {
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
        !h && v.options.layoutScroll && v.scroll && v !== v.root && (En(p.x, -v.scroll.offset.x), En(p.y, -v.scroll.offset.y)), Fa(v.latestValues) && yr(p, v.latestValues, v.layout?.layoutBox);
      }
      return Fa(this.latestValues) && yr(p, this.latestValues, this.layout?.layoutBox), p;
    }
    removeTransform(f) {
      const h = me();
      dn(h, f);
      for (let y = 0; y < this.path.length; y++) {
        const p = this.path[y];
        if (!Fa(p.latestValues))
          continue;
        let g;
        p.instance && (yd(p.latestValues) && p.updateSnapshot(), g = me(), dn(g, p.measurePageBox())), $y(h, p.latestValues, p.snapshot?.layoutBox, g);
      }
      return Fa(this.latestValues) && $y(h, this.latestValues), h;
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
      b && this.linkedParentVersion !== b.layoutVersion && !b.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && b && b.layout ? this.createRelativeTarget(b, this.layout.layoutBox, b.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = me(), this.targetWithTransforms = me()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), l9(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : dn(this.target, this.layout.layoutBox), b2(this.target, this.targetDelta)) : dn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && b && !!b.resumingFrom == !!this.resumingFrom && !b.options.layoutScroll && b.target && this.animationProgress !== 1 ? this.createRelativeTarget(b, this.target, b.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || yd(this.parent.latestValues) || v2(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(f, h, y) {
      this.relativeParent = f, this.linkedParentVersion = f.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = me(), this.relativeTargetOrigin = me(), _r(this.relativeTargetOrigin, h, y, this.options.layoutAnchor || void 0), dn(this.relativeTarget, this.relativeTargetOrigin);
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
      zw(this.layoutCorrected, this.treeScale, this.path, h), f.layout && !f.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (f.target = f.layout.layoutBox, f.targetWithTransforms = me());
      const { target: T } = f;
      if (!T) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (By(this.prevProjectionDelta.x, this.projectionDelta.x), By(this.prevProjectionDelta.y, this.projectionDelta.y)), ds(this.projectionDelta, this.layoutCorrected, T, this.latestValues), (this.treeScale.x !== v || this.treeScale.y !== b || !Ky(this.projectionDelta.x, this.prevProjectionDelta.x) || !Ky(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", T));
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
      this.prevProjectionDelta = Ki(), this.projectionDelta = Ki(), this.projectionDeltaWithTransform = Ki();
    }
    setAnimationOrigin(f, h = !1, y) {
      const p = this.snapshot, g = p ? p.latestValues : {}, v = { ...this.latestValues }, b = Ki();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !h;
      const T = me(), S = p ? p.source : void 0, w = this.layout ? this.layout.source : void 0, j = S !== w, M = this.getStack(), D = !M || M.members.length <= 1, A = !!(j && !D && this.options.crossfade === !0 && !this.path.some(L9));
      this.animationProgress = 0;
      let R;
      const B = y?.interpolateProjection(f);
      this.mixTargetDelta = (U) => {
        const _ = U / 1e3, H = B?.(_);
        H ? (b.x.translate = H.x, b.x.scale = $t(f.x.scale, 1, _), b.x.origin = f.x.origin, b.x.originPoint = f.x.originPoint, b.y.translate = H.y, b.y.scale = $t(f.y.scale, 1, _), b.y.origin = f.y.origin, b.y.originPoint = f.y.originPoint) : (tg(b.x, f.x, _), tg(b.y, f.y, _)), this.setTargetDelta(b), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (_r(T, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), z9(this.relativeTarget, this.relativeTargetOrigin, T, _), R && u9(this.relativeTarget, R) && (this.isProjectionDirty = !1), R || (R = me()), dn(R, this.relativeTarget)), j && (this.animationValues = v, d9(v, g, this.latestValues, _, A, D)), H && H.rotate !== void 0 && (this.animationValues || (this.animationValues = v), this.animationValues.pathRotation = H.rotate), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = _;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(f) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (wa(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = Gt.update(() => {
        vr.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = tl(0)), this.motionValue.jump(0, !1), this.currentAnimation = p9(this.motionValue, [0, 1e3], {
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
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(x9), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const f = this.getLead();
      let { targetWithTransforms: h, target: y, layout: p, latestValues: g } = f;
      if (!(!h || !y || !p)) {
        if (this !== f && this.layout && p && B2(this.options.animationType, this.layout.layoutBox, p.layoutBox)) {
          y = this.target || me();
          const v = _e(this.layout.layoutBox.x);
          y.x.min = f.target.x.min, y.x.max = y.x.min + v;
          const b = _e(this.layout.layoutBox.y);
          y.y.min = f.target.y.min, y.y.max = y.y.min + b;
        }
        dn(h, y), yr(h, g), ds(this.projectionDeltaWithTransform, this.layoutCorrected, h, g);
      }
    }
    registerSharedNode(f, h) {
      this.sharedNodes.has(f) || this.sharedNodes.set(f, new b9()), this.sharedNodes.get(f).add(h);
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
      y.z && Ef("z", f, p, this.animationValues);
      for (let g = 0; g < Cf.length; g++)
        Ef(`rotate${Cf[g]}`, f, p, this.animationValues), Ef(`skew${Cf[g]}`, f, p, this.animationValues);
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
        this.needsReset = !1, f.visibility = "", f.opacity = "", f.pointerEvents = gr(h?.pointerEvents) || "", f.transform = y ? y(this.latestValues, "") : "none";
        return;
      }
      const p = this.getLead();
      if (!this.projectionDelta || !this.layout || !p.target) {
        this.options.layoutId && (f.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, f.pointerEvents = gr(h?.pointerEvents) || ""), this.hasProjected && !Fa(this.latestValues) && (f.transform = y ? y({}, "") : "none", this.hasProjected = !1);
        return;
      }
      f.visibility = "";
      const g = p.animationValues || p.latestValues;
      this.applyTransformsToTarget();
      let v = c9(this.projectionDeltaWithTransform, this.treeScale, g);
      y && (v = y(g, v)), f.transform = v;
      const { x: b, y: T } = this.projectionDelta;
      f.transformOrigin = `${b.origin * 100}% ${T.origin * 100}% 0`, p.animationValues ? f.opacity = p === this ? g.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : g.opacityExit : f.opacity = p === this ? g.opacity !== void 0 ? g.opacity : "" : g.opacityExit !== void 0 ? g.opacityExit : 0;
      for (const S in vd) {
        if (g[S] === void 0)
          continue;
        const { correct: w, applyTo: j, isCSSVariable: M } = vd[S], D = v === "none" ? g[S] : w(g[S], p);
        if (j) {
          const A = j.length;
          for (let R = 0; R < A; R++)
            f[j[R]] = D;
        } else
          M ? this.options.visualElement.renderState.vars[S] = D : f[S] = D;
      }
      this.options.layoutId && (f.pointerEvents = p === this ? gr(h?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((f) => f.currentAnimation?.stop()), this.root.nodes.forEach(Jy), this.root.sharedNodes.clear();
    }
  };
}
function w9(a) {
  a.updateLayout();
}
function T9(a) {
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
      bd(c ? e.measuredBox[g] : e.layoutBox[g], l[g]);
    } else B2(r, e.layoutBox, l) && Cn((g) => {
      const v = c ? e.measuredBox[g] : e.layoutBox[g], b = _e(l[g]);
      v.max = v.min + b, a.relativeTarget && !a.currentAnimation && (a.isProjectionDirty = !0, a.relativeTarget[g].max = a.relativeTarget[g].min + b);
    });
    const f = Ki();
    ds(f, l, e.layoutBox);
    const h = Ki();
    c ? ds(h, a.applyTransform(s, !0), e.measuredBox) : ds(h, l, e.layoutBox);
    const y = !R2(f);
    let p = !1;
    if (!a.resumeFrom) {
      const g = a.getClosestProjectingParent();
      if (g && !g.resumeFrom) {
        const { snapshot: v, layout: b } = g;
        if (v && b) {
          const T = a.options.layoutAnchor || void 0, S = me();
          _r(S, e.layoutBox, v.layoutBox, T);
          const w = me();
          _r(w, l, b.layoutBox, T), N2(S, w) || (p = !0), g.options.layoutRoot && (a.relativeTarget = w, a.relativeTargetOrigin = S, a.relativeParent = g);
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
function C9(a) {
  a.parent && (a.isProjecting() || (a.isProjectionDirty = a.parent.isProjectionDirty), a.isSharedProjectionDirty || (a.isSharedProjectionDirty = !!(a.isProjectionDirty || a.parent.isProjectionDirty || a.parent.isSharedProjectionDirty)), a.isTransformDirty || (a.isTransformDirty = a.parent.isTransformDirty));
}
function E9(a) {
  a.isProjectionDirty = a.isSharedProjectionDirty = a.isTransformDirty = !1;
}
function j9(a) {
  a.clearSnapshot();
}
function Jy(a) {
  a.clearMeasurements();
}
function A9(a) {
  a.isLayoutDirty = !0, a.updateLayout();
}
function Wy(a) {
  a.isLayoutDirty = !1;
}
function M9(a) {
  a.isAnimationBlocked && a.layout && !a.isLayoutDirty && (a.snapshot = a.layout, a.isLayoutDirty = !0);
}
function _9(a) {
  const { visualElement: e } = a.options;
  e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), a.resetTransform();
}
function Iy(a) {
  a.finishAnimation(), a.targetDelta = a.relativeTarget = a.target = void 0, a.isProjectionDirty = !0;
}
function D9(a) {
  a.resolveTargetDelta();
}
function R9(a) {
  a.calcProjection();
}
function N9(a) {
  a.resetSkewAndRotation();
}
function O9(a) {
  a.removeLeadSnapshot();
}
function tg(a, e, l) {
  a.translate = $t(e.translate, 0, l), a.scale = $t(e.scale, 1, l), a.origin = e.origin, a.originPoint = e.originPoint;
}
function eg(a, e, l, s) {
  a.min = $t(e.min, l.min, s), a.max = $t(e.max, l.max, s);
}
function z9(a, e, l, s) {
  eg(a.x, e.x, l.x, s), eg(a.y, e.y, l.y, s);
}
function L9(a) {
  return a.animationValues && a.animationValues.opacityExit !== void 0;
}
const B9 = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, ng = (a) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(a), ag = ng("applewebkit/") && !ng("chrome/") ? Math.round : on;
function ig(a) {
  a.min = ag(a.min), a.max = ag(a.max);
}
function V9(a) {
  ig(a.x), ig(a.y);
}
function B2(a, e, l) {
  return a === "position" || a === "preserve-aspect" && !i9(Py(e), Py(l), 0.2);
}
function U9(a) {
  return a !== a.root && a.scroll?.wasRoot;
}
const k9 = L2({
  attachResizeListener: (a, e) => vs(a, "resize", e),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), jf = {
  current: void 0
}, V2 = L2({
  measureScroll: (a) => ({
    x: a.scrollLeft,
    y: a.scrollTop
  }),
  defaultParent: () => {
    if (!jf.current) {
      const a = new k9({});
      a.mount(window), a.setOptions({ layoutScroll: !0 }), jf.current = a;
    }
    return jf.current;
  },
  resetTransform: (a, e) => {
    a.style.transform = e !== void 0 ? e : "none";
  },
  checkIsScrollRoot: (a) => window.getComputedStyle(a).position === "fixed"
});
function H9(a, e) {
  if (Ur(a)) {
    const { initial: l, animate: s } = a;
    return {
      initial: l === !1 || gs(l) ? l : void 0,
      animate: gs(s) ? s : void 0
    };
  }
  return a.inherit !== !1 ? e : {};
}
function q9(a) {
  const { initial: e, animate: l } = H9(a, E.useContext(Lr));
  return E.useMemo(() => ({ initial: e, animate: l }), [lg(e), lg(l)]);
}
function lg(a) {
  return Array.isArray(a) ? a.join(" ") : a;
}
const dh = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function U2(a, e, l) {
  for (const s in e)
    !Te(e[s]) && !w2(s, l) && (a[s] = e[s]);
}
function $9({ transformTemplate: a }, e) {
  return E.useMemo(() => {
    const l = dh();
    return ch(l, e, a), Object.assign({}, l.vars, l.style);
  }, [e]);
}
function G9(a, e) {
  const l = a.style || {}, s = {};
  return U2(s, l, a), Object.assign(s, $9(a, e)), s;
}
function Y9(a, e) {
  const l = {}, s = G9(a, e);
  return a.drag && a.dragListener !== !1 && (l.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = a.drag === !0 ? "none" : `pan-${a.drag === "x" ? "y" : "x"}`), a.tabIndex === void 0 && (a.onTap || a.onTapStart || a.whileTap) && (l.tabIndex = 0), l.style = s, l;
}
const k2 = () => ({
  ...dh(),
  attrs: {}
});
function X9(a, e, l, s) {
  const r = E.useMemo(() => {
    const c = k2();
    return T2(c, e, E2(s), a.transformTemplate, a.style), {
      ...c.attrs,
      style: { ...c.style }
    };
  }, [e]);
  if (a.style) {
    const c = {};
    U2(c, a.style, a), r.style = { ...c, ...r.style };
  }
  return r;
}
const P9 = /* @__PURE__ */ new Set([
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
function Dr(a) {
  return a.startsWith("while") || a.startsWith("drag") && a !== "draggable" || a.startsWith("layout") || a.startsWith("onTap") || a.startsWith("onPan") || a.startsWith("onLayout") || P9.has(a);
}
let H2 = (a) => !Dr(a);
function K9(a) {
  typeof a == "function" && (H2 = (e) => e.startsWith("on") ? !Dr(e) : a(e));
}
try {
  K9(require("@emotion/is-prop-valid").default);
} catch {
}
function Z9(a, e, l) {
  const s = {};
  for (const r in a)
    r === "values" && typeof a.values == "object" || Te(a[r]) || (H2(r) || l === !0 && Dr(r) || !e && !Dr(r) || // If trying to use native HTML drag events, forward drag listeners
    a.draggable && r.startsWith("onDrag")) && (s[r] = a[r]);
  return s;
}
const Q9 = [
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
      !!(Q9.indexOf(a) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(a))
    )
  );
}
function F9(a, e, l, { latestValues: s }, r, c = !1, f) {
  const y = (f ?? hh(a) ? X9 : Y9)(e, s, r, a), p = Z9(e, typeof a == "string", c), g = a !== E.Fragment ? { ...p, ...y, ref: l } : {}, { children: v } = e, b = E.useMemo(() => Te(v) ? v.get() : v, [v]);
  return E.createElement(a, {
    ...g,
    children: b
  });
}
const kr = /* @__PURE__ */ E.createContext(null);
function mh(a) {
  const e = E.useRef(null);
  return e.current === null && (e.current = a()), e.current;
}
function J9({ scrapeMotionValuesFromProps: a, createRenderState: e }, l, s, r) {
  return {
    latestValues: W9(l, s, r, a),
    renderState: e()
  };
}
function W9(a, e, l, s) {
  const r = {}, c = s(a, {});
  for (const b in c)
    r[b] = gr(c[b]);
  let { initial: f, animate: h } = a;
  const y = Ur(a), p = h2(a);
  e && p && !y && a.inherit !== !1 && (f === void 0 && (f = e.initial), h === void 0 && (h = e.animate));
  let g = l ? l.initial === !1 : !1;
  g = g || f === !1;
  const v = g ? h : f;
  if (v && typeof v != "boolean" && !Vr(v)) {
    const b = Array.isArray(v) ? v : [v];
    for (let T = 0; T < b.length; T++) {
      const S = eh(a, b[T]);
      if (S) {
        const { transitionEnd: w, transition: j, ...M } = S;
        for (const D in M) {
          let A = M[D];
          if (Array.isArray(A)) {
            const R = g ? A.length - 1 : 0;
            A = A[R];
          }
          A !== null && (r[D] = A);
        }
        for (const D in w)
          r[D] = w[D];
      }
    }
  }
  return r;
}
const q2 = (a) => (e, l) => {
  const s = E.useContext(Lr), r = E.useContext(kr), c = () => J9(a, e, s, r);
  return l ? c() : mh(c);
}, I9 = /* @__PURE__ */ q2({
  scrapeMotionValuesFromProps: fh,
  createRenderState: dh
}), t6 = /* @__PURE__ */ q2({
  scrapeMotionValuesFromProps: j2,
  createRenderState: k2
}), sg = {
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
let og = !1;
function e6() {
  if (og)
    return;
  const a = {};
  for (const e in sg)
    a[e] = {
      isEnabled: (l) => sg[e].some((s) => !!l[s])
    };
  p2(a), og = !0;
}
function $2() {
  return e6(), Dw();
}
function rg(a) {
  const e = $2();
  for (const l in a)
    e[l] = {
      ...e[l],
      ...a[l]
    };
  p2(e);
}
const n6 = Symbol.for("motionComponentSymbol");
function a6(a, e, l) {
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
const G2 = E.createContext({});
function Yi(a) {
  return a && typeof a == "object" && Object.prototype.hasOwnProperty.call(a, "current");
}
const i6 = typeof window < "u", ph = i6 ? E.useLayoutEffect : E.useEffect;
function l6(a, e, l, s, r, c) {
  const { visualElement: f } = E.useContext(Lr), h = E.useContext(Yd), y = E.useContext(kr), p = E.useContext(Xd), g = p.reducedMotion, v = p.skipAnimations, b = E.useRef(null), T = E.useRef(!1);
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
  const S = b.current, w = E.useContext(G2);
  S && !S.projection && r && (S.type === "html" || S.type === "svg") && s6(b.current, l, r, w);
  const j = E.useRef(!1);
  E.useInsertionEffect(() => {
    S && j.current && S.update(l, y);
  });
  const M = l[e2], D = E.useRef(!!M && typeof window < "u" && !window.MotionHandoffIsComplete?.(M) && window.MotionHasOptimisedAnimation?.(M));
  return ph(() => {
    T.current = !0, S && (j.current = !0, window.MotionIsMounted = !0, S.updateFeatures(), S.scheduleRenderMicrotask(), D.current && S.animationState && S.animationState.animateChanges());
  }), E.useEffect(() => {
    S && (!D.current && S.animationState && S.animationState.animateChanges(), D.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(M);
    }), D.current = !1), S.enteringChildren = void 0);
  }), S;
}
function s6(a, e, l, s) {
  const { layoutId: r, layout: c, drag: f, dragConstraints: h, layoutScroll: y, layoutRoot: p, layoutAnchor: g, layoutCrossfade: v } = e;
  a.projection = new l(a.latestValues, e["data-framer-portal-id"] ? void 0 : Y2(a.parent)), a.projection.setOptions({
    layoutId: r,
    layout: c,
    alwaysMeasureLayout: !!f || h && Yi(h),
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
function Y2(a) {
  if (a)
    return a.options.allowProjection !== !1 ? a.projection : Y2(a.parent);
}
function o6(a, { forwardMotionProps: e = !1, type: l } = {}, s, r) {
  const c = l ? l === "svg" : hh(a), f = c ? t6 : I9;
  function h(p, g) {
    let v;
    const b = {
      ...E.useContext(Xd),
      ...p,
      layoutId: r6(p)
    }, { isStatic: T } = b, S = q9(p), w = f(p, T);
    if (!T && typeof window < "u") {
      u6();
      const j = c6(b);
      v = j.MeasureLayout, S.visualElement = l6(a, w, b, r, j.ProjectionNode, c);
    }
    return m.jsxs(Lr.Provider, { value: S, children: [v && S.visualElement ? m.jsx(v, { visualElement: S.visualElement, ...b }) : null, F9(a, p, a6(w, S.visualElement, g), w, T, e, c)] });
  }
  h.displayName = `motion.${typeof a == "string" ? a : `create(${a.displayName ?? a.name ?? ""})`}`;
  const y = E.forwardRef(h);
  return y[n6] = a, y;
}
function r6({ layoutId: a }) {
  const e = E.useContext(Gd).id;
  return e && a !== void 0 ? e + "-" + a : a;
}
function u6(a, e) {
  E.useContext(Yd).strict;
}
function c6(a) {
  const e = $2(), { drag: l, layout: s } = e;
  if (!l && !s)
    return {};
  const r = { ...l, ...s };
  return {
    MeasureLayout: l?.isEnabled(a) || s?.isEnabled(a) ? r.MeasureLayout : void 0,
    ProjectionNode: r.ProjectionNode
  };
}
function yh(a, e) {
  return o6(a, e);
}
const f6 = /* @__PURE__ */ yh("button"), el = /* @__PURE__ */ yh("div"), d6 = /* @__PURE__ */ yh("span");
var h6 = {
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
function m6({
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
    const v = h6[p], b = Math.min(
      ...v.map((T) => {
        const S = h[T.corner];
        if (g === 0 && S === 0)
          return 0;
        const w = f[T.corner], j = T.side === "top" || T.side === "bottom" ? r : c;
        return w >= 0 ? j - w : g / (g + S) * j;
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
function os(a) {
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
var bs = {
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
var p6 = ({
  cornerRadius: a,
  roundingAndSmoothingBudget: e
}) => {
  const l = Math.min(a, e);
  return l <= 0 ? bs : {
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
  const c = 90 * (1 - e), f = Math.sin(os(c / 2)) * a * Math.sqrt(2), h = (90 - c) / 2, y = a * Math.tan(os(h / 2)), p = 45 * e, g = y * Math.cos(os(p)), v = g * Math.tan(os(p));
  let b = (r - f - g - v) / 3, T = 2 * b;
  if (l && r > s) {
    const S = s - v - f - g, w = S / 6, j = S - w;
    b = Math.min(b, j), T = S - b, r = Math.min(r, s);
  }
  return { a: T, b, c: g, d: v, p: r, arcSectionLength: f, cornerRadius: a };
}
var y6 = ({
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
  return r.cornerRadius <= 0 ? bs : {
    p: r.p,
    pathSegment: (c) => {
      switch (c) {
        case "TR":
          return g6(r);
        case "BR":
          return v6(r);
        case "BL":
          return b6(r);
        case "TL":
          return x6(r);
      }
    }
  };
};
function g6({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Ze`c ${e} 0 ${e + l} 0 ${e + l + s} ${r} a ${a} ${a} 0 0 1 ${c} ${c} c ${r} ${s} ${r} ${l + s} ${r} ${e + l + s}`;
}
function v6({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Ze`c 0 ${e} 0 ${e + l} ${-r} ${e + l + s} a ${a} ${a} 0 0 1 -${c} ${c} c ${-s} ${r} ${-(l + s)} ${r} ${-(e + l + s)} ${r}`;
}
function b6({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Ze`c ${-e} 0 ${-(e + l)} 0 ${-(e + l + s)} ${-r} a ${a} ${a} 0 0 1 -${c} -${c} c ${-r} ${-s} ${-r} ${-(l + s)} ${-r} ${-(e + l + s)}`;
}
function x6({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Ze`c 0 ${-e} 0 ${-(e + l)} ${r} ${-(e + l + s)} a ${a} ${a} 0 0 1 ${c} -${c} c ${s} ${-r} ${l + s} ${-r} ${e + l + s} ${-r}`;
}
var S6 = ({
  cornerRadius: a,
  exponent: e,
  roundingAndSmoothingBudget: l
}) => {
  const s = Math.min(a, l);
  if (s <= 0) return bs;
  const r = Number.isFinite(e) ? Math.max(2, e) : 4, c = 2 / r, f = r === 2 ? (b) => b : r === 4 ? Math.sqrt : r === 8 ? (b) => Math.sqrt(Math.sqrt(b)) : (b) => Math.pow(b, c), h = c - 1, y = r === 2 ? () => 1 : r === 4 ? (b) => 1 / Math.sqrt(b) : (b) => Math.pow(b, h), p = [0, Math.PI / 6, Math.PI / 3, Math.PI / 2], g = p.map((b, T) => {
    if (T === 0) return [0, 0];
    if (T === p.length - 1) return [s, s];
    const S = Math.sin(b), w = Math.cos(b);
    return [s * f(S), s * (1 - f(w))];
  }), v = p.map((b, T) => {
    if (T === 0) return [1, 0];
    if (T === p.length - 1) return [0, 1];
    const S = Math.sin(b), w = Math.cos(b), j = c * y(S) * w * s, M = c * y(w) * S * s, D = Math.hypot(j, M) || 1;
    return [j / D, M / D];
  });
  return {
    p: s,
    pathSegment: (b) => {
      const T = [];
      for (let S = 0; S < p.length - 1; S++) {
        const [w, j] = g[S], [M, D] = g[S + 1], [A, R] = v[S], [B, U] = v[S + 1], _ = (p[S] + p[S + 1]) / 2, H = Math.sin(_), P = Math.cos(_), K = s * f(H), it = s * (1 - f(P)), at = 8 / 3 * (K - (w + M) / 2), I = 8 / 3 * (it - (j + D) / 2), F = B * R - U * A, et = F !== 0 ? (-U * at + B * I) / F : 0, N = F !== 0 ? (A * I - R * at) / F : 0, V = w + et * A, Z = j + et * R, nt = M - N * B, st = D - N * U, O = V - w, Y = Z - j, tt = nt - w, ot = st - j, dt = M - w, ht = D - j, vt = mn(O, Y, b), _t = pn(O, Y, b), wt = mn(tt, ot, b), Xt = pn(tt, ot, b), Pt = mn(dt, ht, b), Ee = pn(dt, ht, b);
        T.push(Ze`c ${vt} ${_t} ${wt} ${Xt} ${Pt} ${Ee}`);
      }
      return T.join(" ");
    }
  };
};
function ug(a, e, l, s) {
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
var w6 = 1e-6, T6 = ({
  cornerRadius: a,
  smoothing: e,
  roundingAndSmoothingBudget: l
}) => {
  if (a <= 0) return bs;
  const s = Math.max(0, Math.min(1, e)), r = a, c = Math.PI / 4 * s, f = Math.PI / 2 * r * s, h = f > 0 ? 1 / (r * f) : 0, { x: y, y: p } = f > 0 ? ug(0, 0, h, f) : { x: 0, y: 0 }, { x: g, y: v } = f > 0 ? ug(0, 0, h, f / 2) : { x: 0, y: 0 }, b = y - r * Math.sin(c), T = p + r * Math.cos(c), S = b + T;
  let w = S, j = r, M = y, D = p, A = g, R = v;
  if (S > l && S > 0) {
    const P = l / S;
    w = l, j = r * P, M = y * P, D = p * P, A = g * P, R = v * P;
  }
  if (w <= 0)
    return bs;
  let B = 0, U = 0;
  if (f > 0) {
    const P = Math.cos(c), K = Math.sin(c);
    K > 1e-12 && (U = 8 / 3 * (D / 2 - R) / K), B = 8 / 3 * (A - M / 2) + U * P;
  }
  const _ = Math.PI / 2 - 2 * c, H = Math.abs(_) > w6;
  return {
    p: w,
    pathSegment: (P) => {
      const K = [];
      if (f > 0) {
        const it = B, at = 0, I = M - U * Math.cos(c), F = D - U * Math.sin(c), et = M, N = D, V = mn(it, at, P), Z = pn(it, at, P), nt = mn(I, F, P), st = pn(I, F, P), O = mn(et, N, P), Y = pn(et, N, P);
        K.push(Ze`c ${V} ${Z} ${nt} ${st} ${O} ${Y}`);
      }
      if (H) {
        const it = w - M - D, at = w - M - D, I = mn(it, at, P), F = pn(it, at, P);
        K.push(Ze`a ${j} ${j} 0 0 1 ${I} ${F}`);
      }
      if (f > 0) {
        const it = U * Math.sin(c), at = U * Math.cos(c), I = D, F = M - B, et = D, N = M, V = mn(it, at, P), Z = pn(it, at, P), nt = mn(I, F, P), st = pn(I, F, P), O = mn(et, N, P), Y = pn(et, N, P);
        K.push(Ze`c ${V} ${Z} ${nt} ${st} ${O} ${Y}`);
      }
      return K.join(" ");
    }
  };
}, C6 = 4, E6 = {
  arc: p6,
  squircle: y6,
  superellipse: S6,
  clothoid: T6
};
function j6(a) {
  return E6[a];
}
var A6 = 64, Ka = /* @__PURE__ */ new Map();
function M6(a, e) {
  return a + "|" + e.cornerRadius + "|" + e.smoothing + "|" + e.exponent + "|" + (e.preserveSmoothing ? 1 : 0) + "|" + e.roundingAndSmoothingBudget;
}
function _6(a) {
  return !Number.isFinite(a.cornerRadius) || !Number.isFinite(a.smoothing) || !Number.isFinite(a.exponent) || !Number.isFinite(a.roundingAndSmoothingBudget);
}
function D6(a) {
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
  if (_6(l)) return e(l);
  const s = M6(a, l), r = Ka.get(s);
  if (r)
    return Ka.delete(s), Ka.set(s, r), r;
  const c = D6(e(l));
  if (Ka.size >= A6) {
    const f = Ka.keys().next().value;
    f !== void 0 && Ka.delete(f);
  }
  return Ka.set(s, c), c;
}
function Fo(a, e, l, s) {
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
function N6({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Ze`c ${a} 0 ${a + e} 0 ${r} ${s} a ${h} ${h} 0 0 1 ${c} ${f} a ${h} ${h} 0 0 1 ${-c} ${f} c ${-l} ${s} ${-(e + l)} ${s} ${-r} ${s}`;
}
function O6({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Ze`c ${-a} 0 ${-(a + e)} 0 ${-r} ${-s} a ${h} ${h} 0 0 1 ${-c} ${-f} a ${h} ${h} 0 0 1 ${c} ${-f} c ${l} ${-s} ${e + l} ${-s} ${r} ${-s}`;
}
function z6({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Ze`c 0 ${-a} 0 ${-(a + e)} ${s} ${-r} a ${h} ${h} 0 0 1 ${f} ${-c} a ${h} ${h} 0 0 1 ${f} ${c} c ${s} ${l} ${s} ${e + l} ${s} ${r}`;
}
function L6({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Ze`c 0 ${a} 0 ${a + e} ${-s} ${r} a ${h} ${h} 0 0 1 ${-f} ${c} a ${h} ${h} 0 0 1 ${-f} ${-c} c ${-s} ${-l} ${-s} ${-(e + l)} ${-s} ${-r}`;
}
function cg(a, e, l, s) {
  const r = gh({
    cornerRadius: a,
    cornerSmoothing: e,
    preserveSmoothing: l,
    roundingAndSmoothingBudget: s
  }), c = os(45 * e);
  return {
    a: r.a,
    b: r.b,
    p: r.p,
    sin: Math.sin(c),
    cos: Math.cos(c)
  };
}
var fg = (a, e, l) => Math.max(0, Math.min(a / e - 1, l)), he = (a) => (Object.is(a, -0) ? 0 : a).toFixed(4);
function B6(a, e, l, s, r) {
  const c = cg(l, fg(a / 2, l, s), r, a / 2), f = cg(l, fg(e / 2, l, s), r, e / 2), h = (b, T, S, w, j, M) => {
    const D = w === 0 ? c : f, A = M === 0 ? c : f, R = b + (S + j) * l, B = T + (w + M) * l, U = R - j * l * D.cos - S * l * D.sin, _ = B - M * l * D.cos - w * l * D.sin, H = R - S * l * A.cos - j * l * A.sin, P = B - w * l * A.cos - M * l * A.sin, K = b + S * D.p, it = T + w * D.p, at = Math.hypot(H - U, P - _) > 1e-6, I = at ? H : U, F = at ? P : _, et = b + j * A.p, N = T + M * A.p;
    let V = `L ${he(K)} ${he(it)} `;
    return V += `c ${he(-S * D.a)} ${he(-w * D.a)} ${he(-S * (D.a + D.b))} ${he(-w * (D.a + D.b))} ${he(U - K)} ${he(_ - it)} `, at && (V += `a ${he(l)} ${he(l)} 0 0 1 ${he(H - U)} ${he(P - _)} `), V += `c ${he(et - j * (A.a + A.b) - I)} ${he(N - M * (A.a + A.b) - F)} ${he(et - j * A.a - I)} ${he(N - M * A.a - F)} ${he(et - I)} ${he(N - F)}`, V;
  }, y = h(a, 0, -1, 0, 0, 1), p = h(a, e, 0, -1, -1, 0), g = h(0, e, 1, 0, 0, -1), v = h(0, 0, 0, 1, 1, 0);
  return `M ${he(c.p)} 0 ${y} ${p} ${g} ${v} Z`;
}
var V6 = 0.6, U6 = !0, k6 = "squircle";
function X2(a) {
  return {
    radius: a.radius,
    curve: a.curve ?? k6,
    smoothing: a.smoothing ?? V6,
    exponent: a.exponent ?? C6,
    preserveSmoothing: a.preserveSmoothing ?? U6
  };
}
function Jo(a) {
  return X2(typeof a == "number" ? { radius: a } : a ?? { radius: 0 });
}
function H6(a) {
  if ("radius" in a) {
    const e = X2(a);
    return { topLeft: e, topRight: e, bottomRight: e, bottomLeft: e };
  }
  return {
    topLeft: Jo(a.topLeft),
    topRight: Jo(a.topRight),
    bottomRight: Jo(a.bottomRight),
    bottomLeft: Jo(a.bottomLeft)
  };
}
function P2(a, e, l) {
  if (a <= 0 || e <= 0)
    return "M 0 0 H 0 V 0 H 0 Z";
  const s = H6(l);
  if (s.topLeft.radius <= 0 && s.topRight.radius <= 0 && s.bottomRight.radius <= 0 && s.bottomLeft.radius <= 0)
    return `M 0 0 H ${a} V ${e} H 0 Z`;
  const r = m6({
    topLeftCornerRadius: s.topLeft.radius,
    topRightCornerRadius: s.topRight.radius,
    bottomRightCornerRadius: s.bottomRight.radius,
    bottomLeftCornerRadius: s.bottomLeft.radius,
    width: a,
    height: e
  }), c = (D) => {
    const A = s[D], R = j6(A.curve);
    return R6(A.curve, R, {
      cornerRadius: r[D].radius,
      smoothing: A.smoothing,
      exponent: A.exponent,
      preserveSmoothing: A.preserveSmoothing,
      roundingAndSmoothingBudget: r[D].roundingAndSmoothingBudget
    });
  }, f = (D) => {
    let A;
    return () => A ?? (A = c(D));
  }, h = f("topLeft"), y = f("topRight"), p = f("bottomRight"), g = f("bottomLeft"), v = (D) => D.toFixed(4), b = (D) => D.length > 0 ? " " + D : "", T = s.topLeft;
  if (q6(s)) {
    const D = Math.min(T.radius, a / 2, e / 2), A = Math.min(a, e) / 2, R = 1e-9;
    if (D > 0 && A > D + R && A < (1 + T.smoothing) * D - R)
      return B6(a, e, D, T.smoothing, T.preserveSmoothing);
  }
  const S = 1e-9, w = a >= e, j = w ? e / 2 : a / 2, M = (D, A) => {
    const R = s[D], B = s[A];
    return R.curve === "squircle" && B.curve === "squircle" && Math.abs(r[D].radius - j) < S && Math.abs(r[A].radius - j) < S && R.smoothing === B.smoothing && R.preserveSmoothing === B.preserveSmoothing;
  };
  if (w) {
    const D = M("topRight", "bottomRight"), A = M("topLeft", "bottomLeft");
    if (D || A) {
      const R = a / 2, B = D ? Fo(j, s.topRight.smoothing, s.topRight.preserveSmoothing, R) : null, U = A ? Fo(j, s.topLeft.smoothing, s.topLeft.preserveSmoothing, R) : null;
      let _ = "M " + v(U ? U.p : h().p) + " 0";
      return _ += " L " + v(a - (B ? B.p : y().p)) + " 0", B ? _ += " " + N6(B) : (_ += b(y().pathSegment("TR")), _ += " L " + v(a) + " " + v(p().p), _ += " L " + v(a) + " " + v(e - p().p), _ += b(p().pathSegment("BR"))), U ? (_ += " L " + v(U.p) + " " + v(e), _ += " " + O6(U)) : (_ += " L " + v(a - g().p) + " " + v(e), _ += " L " + v(g().p) + " " + v(e), _ += b(g().pathSegment("BL")), _ += " L 0 " + v(e - h().p), _ += " L 0 " + v(h().p), _ += b(h().pathSegment("TL"))), _ + " Z";
    }
  } else {
    const D = M("topLeft", "topRight"), A = M("bottomLeft", "bottomRight");
    if (D || A) {
      const R = e / 2, B = D ? Fo(j, s.topLeft.smoothing, s.topLeft.preserveSmoothing, R) : null, U = A ? Fo(j, s.bottomLeft.smoothing, s.bottomLeft.preserveSmoothing, R) : null;
      let _;
      return B ? _ = "M 0 " + v(B.p) + " " + z6(B) : (_ = "M " + v(h().p) + " 0", _ += " L " + v(a - y().p) + " 0", _ += b(y().pathSegment("TR"))), _ += " L " + v(a) + " " + v(e - (U ? U.p : p().p)), U ? _ += " " + L6(U) : (_ += b(p().pathSegment("BR")), _ += " L " + v(g().p) + " " + v(e), _ += b(g().pathSegment("BL"))), B ? _ += " L 0 " + v(B.p) : (_ += " L 0 " + v(e - h().p), _ += " L 0 " + v(h().p), _ += b(h().pathSegment("TL"))), _ + " Z";
    }
  }
  return "M " + v(h().p) + " 0 L " + v(a - y().p) + " 0" + b(y().pathSegment("TR")) + " L " + v(a) + " " + v(p().p) + " L " + v(a) + " " + v(e - p().p) + b(p().pathSegment("BR")) + " L " + v(a - g().p) + " " + v(e) + " L " + v(g().p) + " " + v(e) + b(g().pathSegment("BL")) + " L 0 " + v(e - h().p) + " L 0 " + v(h().p) + b(h().pathSegment("TL")) + " Z";
}
function q6(a) {
  const e = a.topLeft;
  return e.curve === "squircle" && [a.topRight, a.bottomRight, a.bottomLeft].every(
    (l) => l.curve === "squircle" && l.radius === e.radius && l.smoothing === e.smoothing && l.preserveSmoothing === e.preserveSmoothing
  );
}
function $6(a, e, l) {
  return `path("${P2(a, e, l)}")`;
}
var kt = "http://www.w3.org/2000/svg", G6 = 0;
function vh() {
  return ++G6;
}
function K2(a) {
  const e = a.replace("#", "");
  return e.length === 3 ? "#" + e[0] + e[0] + e[1] + e[1] + e[2] + e[2] : "#" + e;
}
function Z2(a) {
  const e = K2(a).replace("#", "");
  return `rgb(${parseInt(e.substring(0, 2), 16)},${parseInt(e.substring(2, 4), 16)},${parseInt(e.substring(4, 6), 16)})`;
}
var Y6 = {
  offsetX: 0,
  offsetY: 0,
  blur: 0,
  spread: 0,
  color: "#000",
  opacity: 0
};
function Q2(a) {
  const e = /* @__PURE__ */ new Map(), l = JSON.stringify(a);
  return (s, r, c, f) => {
    const h = `${s}:${r}:${f}:${l}`;
    let y = e.get(h);
    return y === void 0 && (y = P2(s, r, c), e.set(h, y)), y;
  };
}
function F2(a, e) {
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
function xd(a) {
  const e = K2(a).replace("#", ""), l = parseInt(e.substring(0, 2), 16), s = parseInt(e.substring(2, 4), 16), r = parseInt(e.substring(4, 6), 16);
  if (l === 0 && s === 0 && r === 0) return "#4c4c4c";
  const c = Math.round(l * 2 / 3), f = Math.round(s * 2 / 3), h = Math.round(r * 2 / 3);
  return "#" + (1 << 24 | c << 16 | f << 8 | h).toString(16).slice(1);
}
function Sd(a) {
  return typeof a == "object" && a !== null && "type" in a;
}
function X6(a) {
  const e = (90 - a) * Math.PI / 180;
  return {
    x1: 0.5 - 0.5 * Math.cos(e),
    y1: 0.5 + 0.5 * Math.sin(e),
    x2: 0.5 + 0.5 * Math.cos(e),
    y2: 0.5 - 0.5 * Math.sin(e)
  };
}
function J2(a, e) {
  for (; a.lastChild; ) a.removeChild(a.lastChild);
  for (const l of e) {
    const s = document.createElementNS(kt, "stop");
    s.setAttribute("offset", String(l.offset)), s.setAttribute("stop-color", l.color), l.opacity !== void 0 && l.opacity !== 1 && s.setAttribute("stop-opacity", String(l.opacity)), a.appendChild(s);
  }
}
function P6(a, e, l) {
  const s = e.type === "linear" ? "linearGradient" : "radialGradient", r = document.createElementNS(kt, s);
  return r.setAttribute("id", l), W2(r, e), J2(r, e.stops), a.appendChild(r), r;
}
function K6(a, e) {
  W2(a, e), J2(a, e.stops);
}
function W2(a, e) {
  if (e.type === "linear") {
    const l = X6(e.angle ?? 0);
    a.setAttribute("x1", String(l.x1)), a.setAttribute("y1", String(l.y1)), a.setAttribute("x2", String(l.x2)), a.setAttribute("y2", String(l.y2));
  } else
    a.setAttribute("cx", String(e.cx ?? 0.5)), a.setAttribute("cy", String(e.cy ?? 0.5)), a.setAttribute("r", String(e.r ?? 0.5));
}
function dg(a) {
  return { ...a, stops: a.stops.map((e) => ({ ...e, color: xd(e.color) })) };
}
function wd(a, e, l, s) {
  a.setAttribute("x", String(-e)), a.setAttribute("y", String(-e)), a.setAttribute("width", String(l + e * 2)), a.setAttribute("height", String(s + e * 2));
}
function Wo(a, e, l, s, r) {
  wd(a, l, s, r), wd(e, l, s, r);
}
function Af(a, e, l) {
  const s = document.createElementNS(kt, "mask");
  s.setAttribute("id", a), l && s.setAttribute("maskUnits", "userSpaceOnUse");
  const r = document.createElementNS(kt, "rect");
  r.setAttribute("fill", "white");
  const c = document.createElementNS(kt, "path");
  return c.setAttribute("fill", "none"), c.setAttribute("stroke", "black"), s.appendChild(r), s.appendChild(c), e.appendChild(s), { mask: s, rect: r, knockout: c };
}
function Mf(a) {
  const e = document.createElementNS(kt, "g"), l = document.createElementNS(kt, "path");
  l.setAttribute("fill", "none"), a && l.setAttribute(a.attr, a.value), l.style.display = "none", e.appendChild(l);
  const s = document.createElementNS(kt, "path");
  return s.setAttribute("fill", "none"), a && s.setAttribute(a.attr, a.value), s.style.display = "none", e.appendChild(s), { group: e, strokePath: l, grooveOverlay: s };
}
function br(a, e) {
  const l = e === "main" ? "gradientEl" : "overlayGradientEl";
  a[l]?.remove(), a[l] = null;
}
function Io(a, e, l) {
  if (!Sd(a))
    return br(e, l), a;
  const s = l === "main" ? "gradientEl" : "overlayGradientEl", r = l === "main" ? e.gradientId : e.overlayGradientId;
  return e[s] ? K6(e[s], a) : e[s] = P6(e.defs, a, r), `url(#${r})`;
}
function _f(a, e, l, s, r) {
  if (!a || a.width <= 0 || a.opacity <= 0) {
    r.strokePath.style.display = "none", r.strokeGroup.removeAttribute("mask"), r.grooveOverlay.style.display = "none", br(r, "main"), br(r, "overlay");
    return;
  }
  const c = r.strokeMultiplier;
  r.strokePath.style.display = "", r.strokePath.setAttribute("d", e), r.strokePath.setAttribute("stroke", Io(a.color, r, "main")), r.strokePath.setAttribute("stroke-width", String(a.width * c)), r.strokePath.setAttribute("stroke-opacity", String(a.opacity));
  const f = a.style ?? "solid";
  switch (r.strokeGroup.removeAttribute("mask"), r.grooveOverlay.style.display = "none", r.strokePath.removeAttribute("stroke-dasharray"), r.strokePath.setAttribute("stroke-linecap", "butt"), f !== "groove" && f !== "ridge" && br(r, "overlay"), f) {
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
      const h = Sd(a.color) ? dg(a.color) : xd(a.color);
      r.strokePath.setAttribute("stroke", Io(h, r, "main")), r.grooveOverlay.style.display = "", r.grooveOverlay.setAttribute("d", e), r.grooveOverlay.setAttribute("stroke", Io(a.color, r, "overlay")), r.grooveOverlay.setAttribute("stroke-width", String(a.width * c / 2)), r.grooveOverlay.setAttribute("stroke-opacity", String(a.opacity));
      break;
    }
    case "ridge": {
      const h = Sd(a.color) ? dg(a.color) : xd(a.color);
      r.grooveOverlay.style.display = "", r.grooveOverlay.setAttribute("d", e), r.grooveOverlay.setAttribute("stroke", Io(h, r, "overlay")), r.grooveOverlay.setAttribute("stroke-width", String(a.width * c / 2)), r.grooveOverlay.setAttribute("stroke-opacity", String(a.opacity));
      break;
    }
  }
}
function Z6(a, e) {
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
function Q6(a) {
  a.mask.remove(), a.filter.remove(), a.blurGroup.remove();
}
function F6(a) {
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
  const v = `sc-dbl-inner-${e}`, { rect: b, knockout: T } = Af(v, c, !1), S = `sc-dbl-outer-${e}`, { mask: w, rect: j, knockout: M } = Af(S, c, !0), D = `sc-dbl-middle-${e}`, { mask: A, rect: R, knockout: B } = Af(D, c, !0);
  r.appendChild(c);
  const U = document.createElementNS(kt, "g");
  U.setAttribute("clip-path", `url(#${l})`), r.appendChild(U);
  const _ = [], { group: H, strokePath: P, grooveOverlay: K } = Mf({ attr: "clip-path", value: `url(#${l})` });
  r.appendChild(H);
  const { group: it, strokePath: at, grooveOverlay: I } = Mf({ attr: "mask", value: `url(#${s})` });
  r.appendChild(it);
  const { group: F, strokePath: et, grooveOverlay: N } = Mf();
  r.appendChild(F), a.appendChild(r);
  const V = {
    strokePath: P,
    grooveOverlay: K,
    strokeGroup: H,
    dblMaskId: v,
    dblKnockout: T,
    dblRect: b,
    strokeMultiplier: 2,
    defs: c,
    gradientEl: null,
    gradientId: `sc-grad-inner-${e}`,
    overlayGradientEl: null,
    overlayGradientId: `sc-grad-inner-ov-${e}`
  }, Z = {
    strokePath: at,
    grooveOverlay: I,
    strokeGroup: it,
    dblMaskId: S,
    dblKnockout: M,
    dblRect: j,
    strokeMultiplier: 2,
    defs: c,
    gradientEl: null,
    gradientId: `sc-grad-outer-${e}`,
    overlayGradientEl: null,
    overlayGradientId: `sc-grad-outer-ov-${e}`,
    padDblMask: (st, O, Y) => Wo(w, j, st, O, Y)
  }, nt = {
    strokePath: et,
    grooveOverlay: N,
    strokeGroup: F,
    dblMaskId: D,
    dblKnockout: B,
    dblRect: R,
    strokeMultiplier: 1,
    defs: c,
    gradientEl: null,
    gradientId: `sc-grad-middle-${e}`,
    overlayGradientEl: null,
    overlayGradientId: `sc-grad-middle-ov-${e}`,
    padDblMask: (st, O, Y) => Wo(A, R, st, O, Y)
  };
  return {
    update(st, O, Y, tt) {
      if (Y <= 0 || tt <= 0) return;
      r.setAttribute("width", String(Y)), r.setAttribute("height", String(tt)), r.setAttribute("viewBox", `0 0 ${Y} ${tt}`);
      const ot = Q2(st), dt = ot(Y, tt, st, 0);
      h.setAttribute("d", dt), g.setAttribute("d", dt), p.setAttribute("width", String(Y)), p.setAttribute("height", String(tt)), _f(O.innerBorder, dt, Y, tt, V);
      const ht = O.outerBorder;
      ht && ht.width > 0 && ht.opacity > 0 && Wo(y, p, ht.width, Y, tt), _f(ht, dt, Y, tt, Z), _f(O.middleBorder, dt, Y, tt, nt);
      const vt = O.innerShadow, _t = vt == null ? [] : Array.isArray(vt) ? vt : [vt];
      for (; _.length < _t.length; )
        _.push(Z6(c, U));
      for (; _.length > _t.length; )
        Q6(_.pop());
      for (let wt = 0; wt < _t.length; wt++) {
        const Xt = _t[wt], Pt = _[wt];
        if (Xt.opacity <= 0) {
          Pt.rect.style.display = "none";
          continue;
        }
        Pt.rect.style.display = "";
        const Ee = Xt.spread, Ea = Math.max(Xt.blur * 3, 20) + Math.max(Math.abs(Xt.offsetX), Math.abs(Xt.offsetY)) + Math.abs(Ee);
        Wo(Pt.mask, Pt.maskRect, Ea, Y, tt);
        const rn = Math.max(1, Y - Ee * 2), ja = Math.max(1, tt - Ee * 2), Aa = Ee !== 0 ? F2(st, -Ee) : st;
        Pt.maskCutout.setAttribute("d", ot(rn, ja, Aa, -Ee)), Pt.maskCutout.setAttribute(
          "transform",
          `translate(${Xt.offsetX + Ee},${Xt.offsetY + Ee})`
        ), Xt.blur > 0 ? (Pt.feBlur.setAttribute("stdDeviation", String(Xt.blur)), Pt.blurGroup.setAttribute("filter", `url(#${Pt.filterId})`)) : Pt.blurGroup.removeAttribute("filter"), wd(Pt.rect, Ea, Y, tt), Pt.rect.setAttribute("fill", Z2(Xt.color)), Pt.rect.setAttribute("fill-opacity", String(Xt.opacity));
      }
    },
    destroy() {
      r.remove();
    }
  };
}
function J6(a, e) {
  return Math.ceil(3 * a + Math.abs(e) + 1);
}
function W6(a, e, l, s) {
  a.setAttribute("x", String(-s)), a.setAttribute("y", String(-s)), a.setAttribute("width", String(e + 2 * s)), a.setAttribute("height", String(l + 2 * s));
}
function I6(a, e) {
  const l = `sc-shadow-${vh()}`, s = document.createElementNS(kt, "filter");
  s.setAttribute("id", l), s.setAttribute("filterUnits", "userSpaceOnUse"), s.setAttribute("color-interpolation-filters", "sRGB");
  const r = document.createElementNS(kt, "feGaussianBlur");
  r.setAttribute("stdDeviation", "0"), s.appendChild(r), a.appendChild(s);
  const c = document.createElementNS(kt, "path");
  return e.appendChild(c), { filterId: l, filterEl: s, feBlur: r, pathEl: c };
}
function tT(a) {
  a.filterEl.remove(), a.pathEl.remove();
}
function eT(a) {
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
      for (; r.length < p.length; ) r.push(I6(s, l));
      for (; r.length > p.length; ) tT(r.pop());
      const v = Q2(c);
      let b = !1;
      for (let T = 0; T < p.length; T++) {
        const S = p[T], w = r[p.length - 1 - T];
        if (S.opacity <= 0) {
          w.pathEl.style.display = "none";
          continue;
        }
        const j = S.spread, M = h + j * 2, D = y + j * 2;
        if (M <= 0 || D <= 0) {
          w.pathEl.style.display = "none";
          continue;
        }
        b = !0, w.pathEl.style.display = "";
        const A = Z2(S.color), R = F2(c, j);
        if (w.pathEl.setAttribute("d", v(M, D, R, j)), w.pathEl.setAttribute("transform", `translate(${S.offsetX - j},${S.offsetY - j})`), w.pathEl.setAttribute("fill", A), w.pathEl.setAttribute("fill-opacity", String(S.opacity)), S.blur > 0) {
          const B = J6(S.blur, j);
          W6(w.filterEl, M, D, B), w.feBlur.setAttribute("stdDeviation", String(S.blur)), w.pathEl.setAttribute("filter", `url(#${w.filterId})`);
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
var hs = null, ba, rs = /* @__PURE__ */ new Map(), xs = /* @__PURE__ */ new Set();
function I2() {
  ba = void 0;
  const a = [...xs];
  xs.clear();
  for (const e of a) {
    const l = rs.get(e);
    if (l) for (const s of [...l]) s();
  }
}
function nT() {
  return hs || (hs = new ResizeObserver((a) => {
    for (const e of a)
      xs.add(e.target);
    ba === void 0 && (ba = requestAnimationFrame(I2));
  })), hs;
}
function aT(a, e) {
  if (typeof ResizeObserver > "u") return () => {
  };
  const l = nT();
  let s = rs.get(a);
  return s || (s = /* @__PURE__ */ new Set(), rs.set(a, s), l.observe(a)), s.add(e), xs.add(a), ba === void 0 && (ba = requestAnimationFrame(I2)), () => {
    s.delete(e), s.size === 0 && (rs.delete(a), l.unobserve(a)), rs.size === 0 && (ba !== void 0 && (cancelAnimationFrame(ba), ba = void 0), xs.clear(), hs?.disconnect(), hs = null);
  };
}
function iT(a) {
  const e = window.getComputedStyle(a), l = (p) => p.endsWith("px") ? parseFloat(p) : NaN, s = l(e.width), r = l(e.height);
  if (Number.isNaN(s) || Number.isNaN(r))
    return { width: a.offsetWidth, height: a.offsetHeight };
  if (e.boxSizing === "border-box")
    return { width: s, height: r };
  const c = (parseFloat(e.paddingLeft) || 0) + (parseFloat(e.paddingRight) || 0), f = (parseFloat(e.paddingTop) || 0) + (parseFloat(e.paddingBottom) || 0), h = (parseFloat(e.borderLeftWidth) || 0) + (parseFloat(e.borderRightWidth) || 0), y = (parseFloat(e.borderTopWidth) || 0) + (parseFloat(e.borderBottomWidth) || 0);
  return { width: s + c + h, height: r + f + y };
}
function tb(a) {
  const e = a.match(
    /^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)(?:\s*[,/]\s*([\d.]+))?\s*\)$/
  );
  if (!e) return;
  const l = Number(e[1]), s = Number(e[2]), r = Number(e[3]), c = e[4] !== void 0 ? Number(e[4]) : 1;
  return { hex: "#" + (1 << 24 | l << 16 | s << 8 | r).toString(16).slice(1), opacity: c };
}
function lT(a) {
  const e = getComputedStyle(a), l = e.borderTopStyle;
  if (l === "none" || l === "hidden") return;
  const s = parseFloat(e.borderTopWidth);
  if (s <= 0 || isNaN(s)) return;
  const r = tb(e.borderTopColor);
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
function sT(a) {
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
    const g = tb(p[0]);
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
function hg(a) {
  const e = {
    border: a.style.border,
    boxShadow: a.style.boxShadow,
    paddingTop: a.style.paddingTop,
    paddingRight: a.style.paddingRight,
    paddingBottom: a.style.paddingBottom,
    paddingLeft: a.style.paddingLeft
  }, l = lT(a), s = getComputedStyle(a), { shadow: r, innerShadow: c } = sT(s.boxShadow), f = s.boxSizing, h = parseFloat(s.borderTopWidth) || 0, y = parseFloat(s.borderRightWidth) || 0, p = parseFloat(s.borderBottomWidth) || 0, g = parseFloat(s.borderLeftWidth) || 0, v = parseFloat(s.paddingTop) || 0, b = parseFloat(s.paddingRight) || 0, T = parseFloat(s.paddingBottom) || 0, S = parseFloat(s.paddingLeft) || 0;
  l && (a.style.border = "0"), (r || c) && (a.style.boxShadow = "none"), l && f === "content-box" && (h > 0 || y > 0 || p > 0 || g > 0) && (a.style.paddingTop = v + h + "px", a.style.paddingRight = b + y + "px", a.style.paddingBottom = T + p + "px", a.style.paddingLeft = S + g + "px");
  const w = {};
  return l && (w.innerBorder = l), r && (w.shadow = r), c && (w.innerShadow = c), { effects: w, savedStyles: e };
}
function bh(a) {
  return a ? !!(a.innerBorder || a.outerBorder || a.middleBorder || a.innerShadow || a.shadow) : !1;
}
function eb(a, e) {
  return { ...a?.effects, ...e };
}
function mg(a, e) {
  a.style.border = e.border, a.style.boxShadow = e.boxShadow, a.style.paddingTop = e.paddingTop, a.style.paddingRight = e.paddingRight, a.style.paddingBottom = e.paddingBottom, a.style.paddingLeft = e.paddingLeft;
}
var Qi = /* @__PURE__ */ new WeakMap();
function oT(a) {
  const e = Qi.get(a) ?? 0;
  if (e > 0)
    return Qi.set(a, e + 1), !0;
  const l = getComputedStyle(a).position;
  return l !== "static" && l !== "" ? !1 : (Qi.set(a, 1), a.style.position = "relative", !0);
}
function rT(a) {
  const e = Qi.get(a);
  e !== void 0 && (e <= 1 ? (Qi.delete(a), a.style.position = "") : Qi.set(a, e - 1));
}
var tr = typeof window < "u" ? E.useLayoutEffect : E.useEffect;
function uT(a, e, l, s, r, c) {
  l.update(a, e, r, c), s?.update(a, e.shadow ?? Y6, r, c);
}
function Df(a, e) {
  const l = eb(a.extracted, e.effectsPropRef.current);
  bh(l) && nb(a, l, e.wrapperRefRef.current, e.skipShadowHandleRef.current);
  const { width: s, height: r } = iT(a.el);
  if (s <= 0 || r <= 0) return;
  const c = e.syncKeyRef.current;
  s === a.lastWidth && r === a.lastHeight && c === a.lastSyncKey || (a.lastWidth = s, a.lastHeight = r, a.lastSyncKey = c, a.el.style.clipPath = $6(s, r, e.optionsRef.current), a.el.setAttribute("data-state", "ready"), a.effectsHandle && uT(e.optionsRef.current, l, a.effectsHandle, a.shadowHandle, s, r));
}
function nb(a, e, l, s) {
  if (!a.anchor) {
    const r = l?.current ?? a.el.parentElement;
    if (!r) return;
    a.anchor = r, a.didAcquire = oT(r);
  }
  a.effectsHandle || (a.effectsHandle = F6(a.anchor)), !a.shadowHandle && e.shadow && !s && (a.shadowHandle = eT(a.anchor));
}
function ab(a, e, l) {
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
  const T = JSON.stringify(e), S = JSON.stringify(r ?? null), w = c ?? !0, j = f ?? !1, M = E.useRef("");
  M.current = `${T}|${S}`;
  const D = E.useRef({
    optionsRef: y,
    effectsPropRef: p,
    wrapperRefRef: g,
    skipShadowHandleRef: v,
    onExtractedShadowRef: b,
    syncKeyRef: M
  }), A = E.useRef(null);
  tr(() => {
    const R = a.current;
    if (!R) return;
    const B = R.style.clipPath;
    R.setAttribute("data-slot", "smooth-corners"), R.setAttribute("data-state", "pending");
    const U = w ? hg(R) : void 0, _ = {
      el: R,
      savedClipPath: B,
      extracted: U,
      effectsHandle: void 0,
      shadowHandle: void 0,
      anchor: null,
      didAcquire: !1,
      lastWidth: 0,
      lastHeight: 0,
      lastSyncKey: null
    };
    A.current = _;
    const H = eb(_.extracted, p.current);
    bh(H) && nb(_, H, g.current, v.current), b.current?.(_.extracted?.effects.shadow);
    const P = aT(R, () => Df(_, D.current));
    return () => {
      P(), _.effectsHandle?.destroy(), _.shadowHandle?.destroy(), _.extracted && mg(R, _.extracted.savedStyles), b.current?.(void 0), _.didAcquire && _.anchor && rT(_.anchor), A.current = null, R.style.clipPath = B, R.removeAttribute("data-slot"), R.removeAttribute("data-state");
    };
  }, [a]), tr(() => {
    const R = A.current;
    R && Df(R, D.current);
  }), tr(() => {
    if (!j) return;
    const R = A.current;
    !R || !R.shadowHandle || (R.shadowHandle.destroy(), R.shadowHandle = void 0, R.lastSyncKey = null);
  }, [j]), tr(() => {
    const R = A.current;
    if (!R) return;
    const B = R.extracted !== void 0;
    if (w && !B)
      R.extracted = hg(R.el);
    else if (!w && B)
      mg(R.el, R.extracted.savedStyles), R.extracted = void 0;
    else
      return;
    b.current?.(R.extracted?.effects.shadow), R.lastSyncKey = null, Df(R, D.current);
  }, [w]);
}
function ib(...a) {
  return (e) => {
    for (const l of a)
      l && (typeof l == "function" ? l(e) : l.current = e);
  };
}
function cT(a, e) {
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
function fT(a, e) {
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
  const f = c, h = f.props ?? {}, y = h.ref ?? f.ref, p = cT(s, h);
  return E.cloneElement(f, {
    ...p,
    ref: ib(e, y)
  });
}
var dT = E.forwardRef(fT);
function hT(a) {
  const e = Array.isArray(a) ? a : [a], l = [];
  for (const s of e) {
    if (s.opacity <= 0) continue;
    const { offsetX: r, offsetY: c, blur: f, spread: h, color: y, opacity: p } = s, g = mT(y);
    l.push(
      `${r}px ${c}px ${f}px ${h}px rgba(${g.r},${g.g},${g.b},${p})`
    );
  }
  return l.join(", ");
}
function mT(a) {
  const e = a.replace("#", ""), l = e.length === 3 ? e[0] + e[0] + e[1] + e[1] + e[2] + e[2] : e;
  return {
    r: parseInt(l.substring(0, 2), 16),
    g: parseInt(l.substring(2, 4), 16),
    b: parseInt(l.substring(4, 6), 16)
  };
}
function pT(a) {
  if ("radius" in a) return `${a.radius}px`;
  const e = (f) => f === void 0 ? 0 : typeof f == "number" ? f : f.radius, l = e(a.topLeft), s = e(a.topRight), r = e(a.bottomRight), c = e(a.bottomLeft);
  return `${l}px ${s}px ${r}px ${c}px`;
}
function yT(a, e) {
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
  } = a, S = l ?? "div", w = E.useRef(null), j = E.useRef(null), M = E.useMemo(
    () => ib(w, e),
    [e]
  ), D = c ?? { radius: 0 }, A = b === "box-shadow", R = A ? void 0 : g, [B, U] = E.useState(void 0), _ = E.useCallback(
    (et) => U(et),
    []
  ), H = {
    innerBorder: f,
    outerBorder: h,
    middleBorder: y,
    innerShadow: p,
    shadow: R
  }, P = bh(H), K = A ? g ?? B : void 0, it = (v ?? !0) || P || K !== void 0;
  ab(w, D, {
    wrapperRef: it ? j : void 0,
    effects: P ? H : void 0,
    autoEffects: v,
    skipShadowHandle: A,
    onExtractedShadow: A ? _ : void 0
  });
  const I = s ? E.createElement(dT, { ...T, ref: M }, r) : E.createElement(S, { ...T, ref: M }, r);
  if (!it) return I;
  let F = null;
  if (A && K !== void 0) {
    const et = hT(K);
    if (et !== "") {
      const N = {
        position: "absolute",
        inset: 0,
        borderRadius: pT(D),
        boxShadow: et,
        pointerEvents: "none",
        zIndex: -1
      };
      F = E.createElement("div", {
        "aria-hidden": !0,
        "data-slot": "smooth-corners-box-shadow",
        style: N
      });
    }
  }
  return E.createElement(
    "div",
    {
      ref: j,
      style: {
        position: "relative",
        // `isolation: isolate` keeps the z-index:-1 sibling from sinking
        // behind ancestors — same trick the SVG path uses.
        ...F ? { isolation: "isolate" } : {}
      }
    },
    F,
    I
  );
}
E.forwardRef(yT);
function pg(a, e) {
  if (typeof a == "function")
    return a(e);
  a != null && (a.current = e);
}
function gT(...a) {
  return (e) => {
    let l = !1;
    const s = a.map((r) => {
      const c = pg(r, e);
      return !l && typeof c == "function" && (l = !0), c;
    });
    if (l)
      return () => {
        for (let r = 0; r < s.length; r++) {
          const c = s[r];
          typeof c == "function" ? c() : pg(a[r], null);
        }
      };
  };
}
function vT(...a) {
  return E.useCallback(gT(...a), a);
}
class bT extends E.Component {
  getSnapshotBeforeUpdate(e) {
    const l = this.props.childRef.current;
    if (fr(l) && e.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = l.offsetParent, r = fr(s) && s.offsetWidth || 0, c = fr(s) && s.offsetHeight || 0, f = getComputedStyle(l), h = this.props.sizeRef.current;
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
function xT({ children: a, isPresent: e, anchorX: l, anchorY: s, root: r, pop: c }) {
  const f = E.useId(), h = E.useRef(null), y = E.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    direction: "ltr"
  }), { nonce: p } = E.useContext(Xd), g = a.props?.ref ?? a?.ref, v = vT(h, g);
  return E.useInsertionEffect(() => {
    const { width: b, height: T, top: S, left: w, right: j, bottom: M, direction: D } = y.current;
    if (e || c === !1 || !h.current || !b || !T)
      return;
    const A = D === "rtl", R = l === "left" ? A ? `right: ${j}` : `left: ${w}` : A ? `left: ${w}` : `right: ${j}`, B = s === "bottom" ? `bottom: ${M}` : `top: ${S}`;
    h.current.dataset.motionPopId = f;
    const U = document.createElement("style");
    p && (U.nonce = p);
    const _ = r ?? document.head;
    return _.appendChild(U), U.sheet && U.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${b}px !important;
            height: ${T}px !important;
            ${R}px !important;
            ${B}px !important;
          }
        `), () => {
      h.current?.removeAttribute("data-motion-pop-id"), _.contains(U) && _.removeChild(U);
    };
  }, [e]), m.jsx(bT, { isPresent: e, childRef: h, sizeRef: y, pop: c, children: c === !1 ? a : E.cloneElement(a, { ref: v }) });
}
const ST = ({ children: a, initial: e, isPresent: l, onExitComplete: s, custom: r, presenceAffectsLayout: c, mode: f, anchorX: h, anchorY: y, root: p }) => {
  const g = mh(wT), v = E.useId(), b = E.useRef(l), T = E.useRef(s);
  ph(() => {
    b.current = l, T.current = s;
  });
  let S = !0, w = E.useMemo(() => (S = !1, {
    id: v,
    initial: e,
    isPresent: l,
    custom: r,
    onExitComplete: (j) => {
      g.set(j, !0);
      for (const M of g.values())
        if (!M)
          return;
      s && s();
    },
    register: (j) => (g.set(j, !1), () => {
      g.delete(j), !b.current && !g.size && T.current?.();
    })
  }), [l, g, s]);
  return c && S && (w = { ...w }), E.useMemo(() => {
    g.forEach((j, M) => g.set(M, !1));
  }, [l]), E.useEffect(() => {
    !l && !g.size && s && s();
  }, [l]), a = m.jsx(xT, { pop: f === "popLayout", isPresent: l, anchorX: h, anchorY: y, root: p, children: a }), m.jsx(kr.Provider, { value: w, children: a });
};
function wT() {
  return /* @__PURE__ */ new Map();
}
function lb(a = !0) {
  const e = E.useContext(kr);
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
const er = (a) => a.key || "";
function yg(a) {
  const e = [];
  return E.Children.forEach(a, (l) => {
    E.isValidElement(l) && e.push(l);
  }), e;
}
const TT = ({ children: a, custom: e, initial: l = !0, onExitComplete: s, presenceAffectsLayout: r = !0, mode: c = "sync", propagate: f = !1, anchorX: h = "left", anchorY: y = "top", root: p }) => {
  const [g, v] = lb(f), b = E.useMemo(() => yg(a), [a]), T = f && !g ? [] : b.map(er), S = E.useRef(!0), w = E.useRef(b), j = mh(() => /* @__PURE__ */ new Map()), M = E.useRef(/* @__PURE__ */ new Set()), [D, A] = E.useState(b), [R, B] = E.useState(b);
  ph(() => {
    S.current = !1, w.current = b;
    for (let H = 0; H < R.length; H++) {
      const P = er(R[H]);
      T.includes(P) ? (j.delete(P), M.current.delete(P)) : j.get(P) !== !0 && j.set(P, !1);
    }
  }, [R, T.length, T.join("-")]);
  const U = [];
  if (b !== D) {
    let H = [...b];
    for (let P = 0; P < R.length; P++) {
      const K = R[P], it = er(K);
      T.includes(it) || (H.splice(P, 0, K), U.push(K));
    }
    return c === "wait" && U.length && (H = U), B(yg(H)), A(b), null;
  }
  const { forceRender: _ } = E.useContext(Gd);
  return m.jsx(m.Fragment, { children: R.map((H) => {
    const P = er(H), K = f && !g ? !1 : b === R || T.includes(P), it = () => {
      if (M.current.has(P))
        return;
      if (j.has(P))
        M.current.add(P), j.set(P, !0);
      else
        return;
      let at = !0;
      j.forEach((I) => {
        I || (at = !1);
      }), at && (_?.(), B(w.current), f && v?.(), s && s());
    };
    return m.jsx(ST, { isPresent: K, initial: !S.current || l ? void 0 : !1, custom: e, presenceAffectsLayout: r, mode: c, root: p, onExitComplete: K ? void 0 : it, anchorX: h, anchorY: y, children: H }, P);
  }) });
};
function CT({ children: a, features: e, strict: l = !1 }) {
  const [, s] = E.useState(!Rf(e)), r = E.useRef(void 0);
  if (!Rf(e)) {
    const { renderer: c, ...f } = e;
    r.current = c, rg(f);
  }
  return E.useEffect(() => {
    Rf(e) && e().then(({ renderer: c, ...f }) => {
      rg(f), r.current = c, s(!0);
    });
  }, []), m.jsx(Yd.Provider, { value: { renderer: r.current, strict: l }, children: a });
}
function Rf(a) {
  return typeof a == "function";
}
const ET = (a, e) => e.isSVG ?? hh(a) ? new Kw(e) : new qw(e, {
  allowProjection: a !== E.Fragment
});
class jT extends Ca {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(e) {
    super(e), e.animationState || (e.animationState = Ww(e));
  }
  updateAnimationControlsSubscription() {
    const { animate: e } = this.node.getProps();
    Vr(e) && (this.unmountControls = e.subscribe(this.node));
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
class MT extends Ca {
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
const _T = {
  animation: {
    Feature: jT
  },
  exit: {
    Feature: MT
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
const DT = (a) => (e) => lh(e) && a(e, As(e));
function ms(a, e, l, s) {
  return vs(a, e, DT(l), s);
}
const sb = ({ current: a }) => a ? a.ownerDocument.defaultView : null, gg = (a, e) => Math.abs(a - e);
function RT(a, e) {
  const l = gg(a.x, e.x), s = gg(a.y, e.y);
  return Math.sqrt(l ** 2 + s ** 2);
}
const vg = /* @__PURE__ */ new Set(["auto", "scroll"]);
class ob {
  constructor(e, l, { transformPagePoint: s, contextWindow: r = window, dragSnapToOrigin: c = !1, distanceThreshold: f = 3, element: h } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (S) => {
      this.handleScroll(S.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = nr(this.lastRawMoveEventInfo, this.transformPagePoint));
      const S = Nf(this.lastMoveEventInfo, this.history), w = this.startEvent !== null, j = RT(S.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!w && !j)
        return;
      const { point: M } = S, { timestamp: D } = we;
      this.history.push({ ...M, timestamp: D });
      const { onStart: A, onMove: R } = this.handlers;
      w || (A && A(this.lastMoveEvent, S), this.startEvent = this.lastMoveEvent), R && R(this.lastMoveEvent, S);
    }, this.handlePointerMove = (S, w) => {
      this.lastMoveEvent = S, this.lastRawMoveEventInfo = w, this.lastMoveEventInfo = nr(w, this.transformPagePoint), Gt.update(this.updatePoint, !0);
    }, this.handlePointerUp = (S, w) => {
      this.end();
      const { onEnd: j, onSessionEnd: M, resumeAnimation: D } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && D && D(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const A = Nf(S.type === "pointercancel" ? this.lastMoveEventInfo : nr(w, this.transformPagePoint), this.history);
      this.startEvent && j && j(S, A), M && M(S, A);
    }, !lh(e))
      return;
    this.dragSnapToOrigin = c, this.handlers = l, this.transformPagePoint = s, this.distanceThreshold = f, this.contextWindow = r || window;
    const y = As(e), p = nr(y, this.transformPagePoint), { point: g } = p, { timestamp: v } = we;
    this.history = [{ ...g, timestamp: v }];
    const { onSessionStart: b } = l;
    b && b(e, Nf(p, this.history));
    const T = { passive: !0, capture: !0 };
    this.removeListeners = Cs(ms(this.contextWindow, "pointermove", this.handlePointerMove, T), ms(this.contextWindow, "pointerup", this.handlePointerUp, T), ms(this.contextWindow, "pointercancel", this.handlePointerUp, T)), h && this.startScrollTracking(h);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(e) {
    let l = e.parentElement;
    for (; l; ) {
      const s = getComputedStyle(l);
      (vg.has(s.overflowX) || vg.has(s.overflowY)) && this.scrollPositions.set(l, {
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
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), wa(this.updatePoint);
  }
}
function nr(a, e) {
  return e ? { point: e(a.point) } : a;
}
function bg(a, e) {
  return { x: a.x - e.x, y: a.y - e.y };
}
function Nf({ point: a }, e) {
  return {
    point: a,
    delta: bg(a, rb(e)),
    offset: bg(a, NT(e)),
    velocity: OT(e, 0.1)
  };
}
function NT(a) {
  return a[0];
}
function rb(a) {
  return a[a.length - 1];
}
function OT(a, e) {
  if (a.length < 2)
    return { x: 0, y: 0 };
  let l = a.length - 1, s = null;
  const r = rb(a);
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
function zT(a, { min: e, max: l }, s) {
  return e !== void 0 && a < e ? a = s ? $t(e, a, s.min) : Math.max(a, e) : l !== void 0 && a > l && (a = s ? $t(l, a, s.max) : Math.min(a, l)), a;
}
function xg(a, e, l) {
  return {
    min: e !== void 0 ? a.min + e : void 0,
    max: l !== void 0 ? a.max + l - (a.max - a.min) : void 0
  };
}
function LT(a, { top: e, left: l, bottom: s, right: r }) {
  return {
    x: xg(a.x, l, r),
    y: xg(a.y, e, s)
  };
}
function Sg(a, e) {
  let l = e.min - a.min, s = e.max - a.max;
  return e.max - e.min < a.max - a.min && ([l, s] = [s, l]), { min: l, max: s };
}
function BT(a, e) {
  return {
    x: Sg(a.x, e.x),
    y: Sg(a.y, e.y)
  };
}
function VT(a, e) {
  let l = 0.5;
  const s = _e(a), r = _e(e);
  return r > s ? l = /* @__PURE__ */ ps(e.min, e.max - s, a.min) : s > r && (l = /* @__PURE__ */ ps(a.min, a.max - r, e.min)), An(0, 1, l);
}
function UT(a, e) {
  const l = {};
  return e.min !== void 0 && (l.min = e.min - a.min), e.max !== void 0 && (l.max = e.max - a.min), l;
}
const Td = 0.35;
function kT(a = Td) {
  return a === !1 ? a = 0 : a === !0 && (a = Td), {
    x: wg(a, "left", "right"),
    y: wg(a, "top", "bottom")
  };
}
function wg(a, e, l) {
  return {
    min: Tg(a, e),
    max: Tg(a, l)
  };
}
function Tg(a, e) {
  return typeof a == "number" ? a : a[e] || 0;
}
const HT = /* @__PURE__ */ new WeakMap();
class qT {
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
      if (T && !S && (this.openDragLock && this.openDragLock(), this.openDragLock = ow(T), !this.openDragLock))
        return;
      this.latestPointerEvent = v, this.latestPanInfo = b, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), Cn((M) => {
        let D = this.getAxisMotionValue(M).get() || 0;
        if (jn.test(D)) {
          const { projection: A } = this.visualElement;
          if (A && A.layout) {
            const R = A.layout.layoutBox[M];
            R && (D = _e(R) * (parseFloat(D) / 100));
          }
        }
        this.originPoint[M] = D;
      }), w && Gt.update(() => w(v, b), !1, !0), fd(this.visualElement, "transform");
      const { animationState: j } = this.visualElement;
      j && j.setActive("whileDrag", !0);
    }, h = (v, b) => {
      this.latestPointerEvent = v, this.latestPanInfo = b;
      const { dragPropagation: T, dragDirectionLock: S, onDirectionLock: w, onDrag: j } = this.getProps();
      if (!T && !this.openDragLock)
        return;
      const { offset: M } = b;
      if (S && this.currentDirection === null) {
        this.currentDirection = GT(M), this.currentDirection !== null && w && w(this.currentDirection);
        return;
      }
      this.updateAxis("x", b.point, M), this.updateAxis("y", b.point, M), this.visualElement.render(), j && Gt.update(() => j(v, b), !1, !0);
    }, y = (v, b) => {
      this.latestPointerEvent = v, this.latestPanInfo = b, this.stop(v, b), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, p = () => {
      const { dragSnapToOrigin: v } = this.getProps();
      (v || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: g } = this.getProps();
    this.panSession = new ob(e, {
      onSessionStart: c,
      onStart: f,
      onMove: h,
      onSessionEnd: y,
      resumeAnimation: p
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: g,
      distanceThreshold: s,
      contextWindow: sb(this.visualElement),
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
    if (!s || !ar(e, r, this.currentDirection))
      return;
    const c = this.getAxisMotionValue(e);
    let f = this.originPoint[e] + s[e];
    this.constraints && this.constraints[e] && (f = zT(f, this.constraints[e], this.elastic[e])), c.set(f);
  }
  resolveConstraints() {
    const { dragConstraints: e, dragElastic: l } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, r = this.constraints;
    e && Yi(e) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : e && s ? this.constraints = LT(s.layoutBox, e) : this.constraints = !1, this.elastic = kT(l), r !== this.constraints && !Yi(e) && s && this.constraints && !this.hasMutatedConstraints && Cn((c) => {
      this.constraints !== !1 && this.getAxisMotionValue(c) && (this.constraints[c] = UT(s.layoutBox[c], this.constraints[c]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: l } = this.getProps();
    if (!e || !Yi(e))
      return !1;
    const s = e.current, { projection: r } = this.visualElement;
    if (!r || !r.layout)
      return !1;
    r.root && (r.root.scroll = void 0, r.root.updateScroll());
    const c = Lw(s, r.root, this.visualElement.getTransformPagePoint());
    let f = BT(r.layout.layoutBox, c);
    if (l) {
      const h = l(Nw(f));
      this.hasMutatedConstraints = !!h, h && (f = g2(h));
    }
    return f;
  }
  startAnimation(e) {
    const { drag: l, dragMomentum: s, dragElastic: r, dragTransition: c, dragSnapToOrigin: f, onDragTransitionEnd: h } = this.getProps(), y = this.constraints || {}, p = Cn((g) => {
      if (!ar(g, l, this.currentDirection))
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
    return fd(this.visualElement, e), s.start(th(e, s, 0, l, this.visualElement, !1));
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
      if (!ar(l, s, this.currentDirection))
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
    if (!Yi(l) || !s || !this.constraints)
      return;
    this.stopAnimation();
    const r = { x: 0, y: 0 };
    Cn((f) => {
      const h = this.getAxisMotionValue(f);
      if (h && this.constraints !== !1) {
        const y = h.get();
        r[f] = VT({ min: y, max: y }, this.constraints[f]);
      }
    });
    const { transformTemplate: c } = this.visualElement.getProps();
    this.visualElement.current.style.transform = c ? c({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.constraints = !1, this.resolveConstraints(), Cn((f) => {
      if (!ar(f, e, null))
        return;
      const h = this.getAxisMotionValue(f), { min: y, max: p } = this.constraints[f];
      h.set($t(y, p, r[f]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    HT.set(this.visualElement, this);
    const e = this.visualElement.current, l = ms(e, "pointerdown", (p) => {
      const { drag: g, dragListener: v = !0 } = this.getProps(), b = p.target, T = b !== e && hw(b);
      g && v && !T && this.start(p);
    });
    let s;
    const r = () => {
      const { dragConstraints: p } = this.getProps();
      Yi(p) && p.current && (this.constraints = this.resolveRefConstraints(), s || (s = $T(e, p.current, () => this.scalePositionWithinConstraints())));
    }, { projection: c } = this.visualElement, f = c.addEventListener("measure", r);
    c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()), Gt.read(r);
    const h = vs(window, "resize", () => this.scalePositionWithinConstraints()), y = c.addEventListener("didUpdate", (({ delta: p, hasLayoutChanged: g }) => {
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
    const e = this.visualElement.getProps(), { drag: l = !1, dragDirectionLock: s = !1, dragPropagation: r = !1, dragConstraints: c = !1, dragElastic: f = Td, dragMomentum: h = !0 } = e;
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
function Cg(a) {
  let e = !0;
  return () => {
    if (e) {
      e = !1;
      return;
    }
    a();
  };
}
function $T(a, e, l) {
  const s = Cy(a, Cg(l)), r = Cy(e, Cg(l));
  return () => {
    s(), r();
  };
}
function ar(a, e, l) {
  return (e === !0 || e === a) && (l === null || l === a);
}
function GT(a, e = 10) {
  let l = null;
  return Math.abs(a.y) > e ? l = "y" : Math.abs(a.x) > e && (l = "x"), l;
}
class YT extends Ca {
  constructor(e) {
    super(e), this.removeGroupControls = on, this.removeListeners = on, this.controls = new qT(e);
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
const Of = (a) => (e, l) => {
  a && Gt.update(() => a(e, l), !1, !0);
};
class XT extends Ca {
  constructor() {
    super(...arguments), this.removePointerDownListener = on;
  }
  onPointerDown(e) {
    this.session = new ob(e, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: sb(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: e, onPanStart: l, onPan: s, onPanEnd: r } = this.node.getProps();
    return {
      onSessionStart: Of(e),
      onStart: Of(l),
      onMove: Of(s),
      onEnd: (c, f) => {
        delete this.session, r && Gt.postRender(() => r(c, f));
      }
    };
  }
  mount() {
    this.removePointerDownListener = ms(this.node.current, "pointerdown", (e) => this.onPointerDown(e));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let zf = !1;
class PT extends E.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: e, layoutGroup: l, switchLayoutGroup: s, layoutId: r } = this.props, { projection: c } = e;
    c && (l.group && l.group.add(c), s && s.register && r && s.register(c), zf && c.root.didUpdate(), c.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), c.setOptions({
      ...c.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), vr.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(e) {
    const { layoutDependency: l, visualElement: s, drag: r, isPresent: c } = this.props, { projection: f } = s;
    return f && (f.isPresent = c, e.layoutDependency !== l && f.setOptions({
      ...f.options,
      layoutDependency: l
    }), zf = !0, r || e.layoutDependency !== l || l === void 0 || e.isPresent !== c ? f.willUpdate() : this.safeToRemove(), e.isPresent !== c && (c ? f.promote() : f.relegate() || Gt.postRender(() => {
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
    zf = !0, r && (r.scheduleCheckAfterUnmount(), l && l.group && l.group.remove(r), s && s.deregister && s.deregister(r));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function ub(a) {
  const [e, l] = lb(), s = E.useContext(Gd);
  return m.jsx(PT, { ...a, layoutGroup: s, switchLayoutGroup: E.useContext(G2), isPresent: e, safeToRemove: l });
}
const KT = {
  pan: {
    Feature: XT
  },
  drag: {
    Feature: YT,
    ProjectionNode: V2,
    MeasureLayout: ub
  }
};
function Eg(a, e, l) {
  const { props: s } = a;
  a.animationState && s.whileHover && a.animationState.setActive("whileHover", l === "Start");
  const r = "onHover" + l, c = s[r];
  c && Gt.postRender(() => c(e, As(e)));
}
class ZT extends Ca {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = uw(e, (l, s) => (Eg(this.node, s, "Start"), (r) => Eg(this.node, r, "End"))));
  }
  unmount() {
  }
}
class QT extends Ca {
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
    this.unmount = Cs(vs(this.node.current, "focus", () => this.onFocus()), vs(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function jg(a, e, l) {
  const { props: s } = a;
  if (a.current instanceof HTMLButtonElement && a.current.disabled)
    return;
  a.animationState && s.whileTap && a.animationState.setActive("whileTap", l === "Start");
  const r = "onTap" + (l === "End" ? "" : l), c = s[r];
  c && Gt.postRender(() => c(e, As(e)));
}
class FT extends Ca {
  mount() {
    const { current: e } = this.node;
    if (!e)
      return;
    const { globalTapTarget: l, propagate: s } = this.node.props;
    this.unmount = pw(e, (r, c) => (jg(this.node, c, "Start"), (f, { success: h }) => jg(this.node, f, h ? "End" : "Cancel")), {
      useGlobalTarget: l,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const Cd = /* @__PURE__ */ new WeakMap(), Lf = /* @__PURE__ */ new WeakMap(), JT = (a) => {
  const e = Cd.get(a.target);
  e && e(a);
}, WT = (a) => {
  a.forEach(JT);
};
function IT({ root: a, ...e }) {
  const l = a || document;
  Lf.has(l) || Lf.set(l, {});
  const s = Lf.get(l), r = JSON.stringify(e);
  return s[r] || (s[r] = new IntersectionObserver(WT, { root: a, ...e })), s[r];
}
function tC(a, e, l) {
  const s = IT(e);
  return Cd.set(a, l), s.observe(a), () => {
    Cd.delete(a), s.unobserve(a);
  };
}
const eC = {
  some: 0,
  all: 1
};
class nC extends Ca {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: e = {} } = this.node.getProps(), { root: l, margin: s, amount: r = "some", once: c } = e, f = {
      root: l ? l.current : void 0,
      rootMargin: s,
      threshold: typeof r == "number" ? r : eC[r]
    }, h = (y) => {
      const { isIntersecting: p } = y;
      if (this.isInView === p || (this.isInView = p, c && !p && this.hasEnteredView))
        return;
      p && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", p);
      const { onViewportEnter: g, onViewportLeave: v } = this.node.getProps(), b = p ? g : v;
      b && b(y);
    };
    this.stopObserver = tC(this.node.current, f, h);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: e, prevProps: l } = this.node;
    ["amount", "margin", "root"].some(aC(e, l)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function aC({ viewport: a = {} }, { viewport: e = {} } = {}) {
  return (l) => a[l] !== e[l];
}
const iC = {
  inView: {
    Feature: nC
  },
  tap: {
    Feature: FT
  },
  focus: {
    Feature: QT
  },
  hover: {
    Feature: ZT
  }
}, lC = {
  layout: {
    ProjectionNode: V2,
    MeasureLayout: ub
  }
}, sC = {
  renderer: ET,
  ..._T,
  ...iC
}, oC = {
  ...sC,
  ...KT,
  ...lC
};
function rC() {
  !uh.current && m2();
  const [a] = E.useState(jr.current);
  return a;
}
var Hr = dv();
function uC(a, e) {
  if (a instanceof RegExp) return { keys: !1, pattern: a };
  var l, s, r, c, f = [], h = "", y = a.split("/");
  for (y[0] || y.shift(); r = y.shift(); )
    l = r[0], l === "*" ? (f.push(l), h += r[1] === "?" ? "(?:/(.*))?" : "/(.*)") : l === ":" ? (s = r.indexOf("?", 1), c = r.indexOf(".", 1), f.push(r.substring(1, ~s ? s : ~c ? c : r.length)), h += ~s && !~c ? "(?:/([^/]+?))?" : "/([^/]+?)", ~c && (h += (~s ? "?" : "") + "\\" + r.substring(c))) : h += "/" + r;
  return {
    keys: f,
    pattern: new RegExp("^" + h + (e ? "(?=$|/)" : "/?$"), "i")
  };
}
const cC = "popstate", xh = "pushState", Sh = "replaceState", fC = "hashchange", Ag = [
  cC,
  xh,
  Sh,
  fC
], dC = (a) => {
  for (const e of Ag)
    addEventListener(e, a);
  return () => {
    for (const e of Ag)
      removeEventListener(e, a);
  };
}, cb = (a, e) => I3.useSyncExternalStore(dC, a, e), Mg = () => location.search, hC = ({ ssrSearch: a } = {}) => cb(
  Mg,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrSearch="?foo",
  // client hydrates with just <Router /> and reads from location.search
  a != null ? () => a : Mg
), _g = () => location.pathname, mC = ({ ssrPath: a } = {}) => cb(
  _g,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrPath="/foo",
  // client hydrates with just <Router /> and reads from location.pathname
  a != null ? () => a : _g
), pC = (a, { replace: e = !1, state: l = null } = {}) => history[e ? Sh : xh](l, "", a), yC = (a = {}) => [mC(a), pC], Dg = Symbol.for("wouter_v3");
if (typeof history < "u" && typeof window[Dg] > "u") {
  for (const a of [xh, Sh]) {
    const e = history[a];
    history[a] = function() {
      const l = e.apply(this, arguments), s = new Event(a);
      return s.arguments = arguments, dispatchEvent(s), l;
    };
  }
  Object.defineProperty(window, Dg, { value: !0 });
}
const gC = (a, e) => e.toLowerCase().indexOf(a.toLowerCase()) ? "~" + e : e.slice(a.length) || "/", fb = (a = "") => a === "/" ? "" : a, vC = (a, e) => a[0] === "~" ? a.slice(1) : fb(e) + a, bC = (a = "", e) => gC(Rg(fb(a)), Rg(e)), Rg = (a) => {
  try {
    return decodeURI(a);
  } catch {
    return a;
  }
}, xC = {
  hook: yC,
  searchHook: hC,
  parser: uC,
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
}, SC = E.createContext(xC), wC = () => E.useContext(SC), TC = {};
E.createContext(TC);
const CC = (a) => {
  const [e, l] = a.hook(a);
  return [
    bC(a.base, e),
    hv(
      (s, r) => a.aroundNav(l, vC(s, a.base), r)
    )
  ];
}, EC = E.forwardRef((a, e) => {
  const l = wC(), [s, r] = CC(l), {
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
  } = a, w = hv((M) => {
    M.ctrlKey || M.metaKey || M.altKey || M.shiftKey || M.button !== 0 || (h?.(M), M.defaultPrevented || (M.preventDefault(), r(f, a)));
  }), j = l.hrefs(
    f[0] === "~" ? f.slice(1) : l.base + f,
    l
    // pass router as a second argument for convinience
  );
  return y && E.isValidElement(p) ? E.cloneElement(p, { onClick: w, href: j }) : E.createElement("a", {
    ...S,
    onClick: w,
    href: j,
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
}), qr = Object.freeze({
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
}), jC = "_root_xunnd_1", Ng = "_glassBackground_xunnd_5", Og = "_glassShadow_xunnd_25", AC = "_glassBorder_1y4zy_1", MC = "_muted_1y4zy_15", Ss = (a) => {
  const e = Tt.c(2), {
    className: l,
    muted: s
  } = a, r = `${AC} ${s !== void 0 && s ? MC : ""} ${l === void 0 ? "" : l}`;
  let c;
  return e[0] !== r ? (c = /* @__PURE__ */ m.jsx("div", {
    className: r,
    "aria-hidden": "true"
  }), e[0] = r, e[1] = c) : c = e[1], c;
}, Th = (a) => {
  const e = Tt.c(16);
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
        className: Ng,
        "aria-hidden": "true"
      }), /* @__PURE__ */ m.jsx("div", {
        className: Og,
        "aria-hidden": "true"
      }), /* @__PURE__ */ m.jsx(Ss, {})]
    }), e[7] = S) : S = e[7], S;
  }
  const p = `${jC} ${f}`;
  let g, v, b;
  e[8] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (g = /* @__PURE__ */ m.jsx("div", {
    className: Ng,
    "aria-hidden": "true"
  }), v = /* @__PURE__ */ m.jsx("div", {
    className: Og,
    "aria-hidden": "true"
  }), b = /* @__PURE__ */ m.jsx(Ss, {}), e[8] = g, e[9] = v, e[10] = b) : (g = e[8], v = e[9], b = e[10]);
  let T;
  return e[11] !== l || e[12] !== s || e[13] !== y || e[14] !== p ? (T = /* @__PURE__ */ m.jsxs("div", {
    className: p,
    style: y,
    ...s,
    children: [g, v, b, l]
  }), e[11] = l, e[12] = s, e[13] = y, e[14] = p, e[15] = T) : T = e[15], T;
}, _C = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/arrow-down" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M11.2482 20.3129C11.6466 20.7682 12.3556 20.7682 12.7541 20.3129L17.5499 14.8314C18.1155 14.1849 17.6561 13.1732 16.797 13.1732H13.5011V5.67324C13.5011 4.84481 12.8295 4.17324 12.0011 4.17324C11.1727 4.17324 10.5011 4.84481 10.5011 5.67324V13.1732H7.20522C6.34614 13.1732 5.88678 14.1849 6.45229 14.8314L11.2482 20.3129Z", fill: "#3D3C3A" }))), DC = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/arrow-up" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M11.2483 3.85905C11.6467 3.40376 12.3558 3.40375 12.7542 3.85905L17.5501 9.3405C18.1158 9.98708 17.6563 10.9997 16.7971 10.9997H13.5012V18.4997C13.501 19.3279 12.8295 19.9997 12.0012 19.9997C11.1729 19.9997 10.5014 19.3279 10.5012 18.4997V10.9997H7.20535C6.34619 10.9997 5.88666 9.98708 6.45242 9.3405L11.2483 3.85905Z", fill: "#3D3C3A" }))), RC = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/star" }, /* @__PURE__ */ E.createElement("path", { id: "Vector 234255911", d: "M11 16L15 12L11 8", stroke: "#3D3C3A", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }))), db = "_redaction_dcm1f_1", hb = "_active_dcm1f_19", NC = "_sized_dcm1f_29", Bf = 1800, OC = 1.3, mb = /* @__PURE__ */ E.createContext(null), Ch = () => E.useContext(mb);
let Rr = [];
const zC = () => {
  const a = Rr;
  Rr = [];
  const e = performance.now(), l = a.map((s) => {
    const r = s.getBoundingClientRect().top + window.scrollY;
    return -(((e - r * OC) % Bf + Bf) % Bf);
  });
  a.forEach((s, r) => {
    s.style.setProperty("--wave-phase", `${Math.round(l[r])}ms`);
  });
}, Eh = (a) => {
  a && (Rr.length === 0 && requestAnimationFrame(zC), Rr.push(a));
}, pb = (a) => a ? `${db} ${hb}` : "", LC = 10, ei = (a) => {
  const e = Tt.c(7), {
    active: l,
    width: s,
    children: r
  } = a, c = r != null && r !== "", f = s ?? (!c && l ? LC : void 0), h = l ? Eh : void 0, y = `
                ${db}
                ${l ? hb : ""}
                ${f ? NC : ""}`;
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
}, Fi = (a) => {
  const e = Tt.c(6), {
    className: l,
    as: s,
    active: r
  } = a, c = l === void 0 ? "" : l, f = s === void 0 ? "div" : s, h = Ch(), y = r ?? h ?? !0, p = pb(y), g = y ? Eh : void 0, v = `${c} ${p}`;
  let b;
  e[0] !== v ? (b = v.trim(), e[0] = v, e[1] = b) : b = e[1];
  let T;
  return e[2] !== f || e[3] !== g || e[4] !== b ? (T = /* @__PURE__ */ m.jsx(f, {
    ref: g,
    className: b
  }), e[2] = f, e[3] = g, e[4] = b, e[5] = T) : T = e[5], T;
}, yb = (a) => {
  const e = Tt.c(3), {
    active: l,
    children: s
  } = a, r = !!(l === void 0 || l);
  let c;
  return e[0] !== s || e[1] !== r ? (c = /* @__PURE__ */ m.jsx(mb.Provider, {
    value: r,
    children: s
  }), e[0] = s, e[1] = r, e[2] = c) : c = e[2], c;
}, jh = "_text_9l4iv_1", Nr = "_icon_9l4iv_28", gb = "_title32_9l4iv_34", vb = "_title24_9l4iv_35", bb = "_title20_9l4iv_36", xb = "_body_9l4iv_56", Sb = "_subtitle_9l4iv_63", wb = "_caption_9l4iv_70", BC = {
  text: jh,
  icon: Nr,
  title32: gb,
  title24: vb,
  title20: bb,
  body: xb,
  subtitle: Sb,
  caption: wb
}, VC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  body: xb,
  caption: wb,
  default: BC,
  icon: Nr,
  subtitle: Sb,
  text: jh,
  title20: bb,
  title24: vb,
  title32: gb
}, Symbol.toStringTag, { value: "Module" })), UC = {
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
  const e = Tt.c(34);
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
  const T = v === void 0 ? "body" : v, S = Ch(), w = l || "div", j = g !== void 0 ? !!g : !!S, M = g !== void 0 || S !== null, D = typeof g == "number" ? g : void 0;
  let A;
  e[12] !== j || e[13] !== f || e[14] !== M || e[15] !== D ? (A = M ? /* @__PURE__ */ m.jsx(ei, {
    active: j,
    width: D,
    children: f
  }) : f, e[12] = j, e[13] = f, e[14] = M, e[15] = D, e[16] = A) : A = e[16];
  const R = A, B = s?.direction === "down" ? _C : DC, U = `${jh} ${VC[UC[T] || "body"]} ${h || ""}`, _ = p || void 0, H = r || void 0, P = j || void 0;
  let K;
  e[17] !== B || e[18] !== s?.direction ? (K = s?.direction && /* @__PURE__ */ m.jsx(B, {
    className: Nr
  }), e[17] = B, e[18] = s?.direction, e[19] = K) : K = e[19];
  let it;
  e[20] !== c ? (it = c && /* @__PURE__ */ m.jsx(RC, {
    className: Nr
  }), e[20] = c, e[21] = it) : it = e[21];
  let at;
  return e[22] !== w || e[23] !== R || e[24] !== y || e[25] !== U || e[26] !== _ || e[27] !== H || e[28] !== P || e[29] !== K || e[30] !== it || e[31] !== T || e[32] !== b ? (at = /* @__PURE__ */ m.jsxs(w, {
    ...y,
    className: U,
    "data-variant": T,
    "data-weight": b,
    "data-rounded": _,
    "data-caps": H,
    "data-skeleton": P,
    children: [K, R, it]
  }), e[22] = w, e[23] = R, e[24] = y, e[25] = U, e[26] = _, e[27] = H, e[28] = P, e[29] = K, e[30] = it, e[31] = T, e[32] = b, e[33] = at) : at = e[33], at;
}, Ah = {
  skin: "apple",
  isApple: !0,
  isMaterial: !1,
  setSkin: () => {
  }
}, Tb = /* @__PURE__ */ E.createContext(Ah), Ms = () => E.useContext(Tb) || Ah;
function kC(a) {
  const e = Tt.c(3), {
    children: l
  } = a;
  let s;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (s = [], e[0] = s) : s = e[0], E.useEffect(HC, s);
  let r;
  return e[1] !== l ? (r = /* @__PURE__ */ m.jsx(Tb.Provider, {
    value: Ah,
    children: l
  }), e[1] = l, e[2] = r) : r = e[2], r;
}
function HC() {
  document.body.classList.remove("material", "skin-switcher-active"), document.body.classList.add("apple");
}
const Mh = "_button_1d7yf_1", Cb = "_regular_1d7yf_21", Eb = "_overlay_1d7yf_35", jb = "_secondary_1d7yf_42", Ab = "_accent_1d7yf_47", _h = "_icon_1d7yf_53", Dh = "_label_1d7yf_57", Rh = "_content_1d7yf_61", qC = {
  button: Mh,
  regular: Cb,
  overlay: Eb,
  secondary: jb,
  accent: Ab,
  icon: _h,
  label: Dh,
  content: Rh
}, $C = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accent: Ab,
  button: Mh,
  content: Rh,
  default: qC,
  icon: _h,
  label: Dh,
  overlay: Eb,
  regular: Cb,
  secondary: jb
}, Symbol.toStringTag, { value: "Module" })), zg = (a) => {
  const e = Tt.c(16), {
    children: l,
    onClick: s,
    variant: r,
    ariaLabel: c,
    title: f
  } = a, h = r === void 0 ? "regular" : r, y = typeof l == "string", p = h === "regular" || h === "overlay", g = `${Mh} ${$C[h]} ${y ? Dh : _h}`;
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
  e[2] !== p ? (T = p && /* @__PURE__ */ m.jsx(Ss, {
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
  let j;
  return e[9] !== c || e[10] !== s || e[11] !== g || e[12] !== T || e[13] !== w || e[14] !== f ? (j = /* @__PURE__ */ m.jsxs(f6, {
    type: "button",
    className: g,
    onClick: s,
    "aria-label": c,
    title: f,
    whileTap: v,
    transition: b,
    children: [T, w]
  }), e[9] = c, e[10] = s, e[11] = g, e[12] = T, e[13] = w, e[14] = f, e[15] = j) : j = e[15], j;
}, GC = /* @__PURE__ */ E.createContext(!1), YC = "_root_125i3_1", Lg = "_side_125i3_9", XC = "_trailing_125i3_18", PC = "_middle_125i3_22", KC = "_middleOverlay_125i3_31", ZC = "_titlePill_125i3_35", QC = "_titleContent_125i3_45", FC = "_inModal_125i3_59", JC = (a) => {
  const e = Tt.c(32), {
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
  } = a, w = b === void 0 ? !1 : b, j = T === void 0 ? !1 : T, {
    isApple: M
  } = Ms(), D = E.useContext(GC), A = w ? "overlay" : "regular";
  let R;
  e[0] !== S ? (R = /* @__PURE__ */ m.jsx(lt, {
    variant: "body",
    weight: "semibold",
    children: S
  }), e[0] = S, e[1] = R) : R = e[1];
  const B = R, U = `${YC} ${D ? FC : ""}`;
  let _;
  e[2] !== A || e[3] !== l || e[4] !== c || e[5] !== f || e[6] !== r || e[7] !== s ? (_ = l != null && /* @__PURE__ */ m.jsx(zg, {
    onClick: s,
    variant: r ?? A,
    ariaLabel: c,
    title: f,
    children: l
  }), e[2] = A, e[3] = l, e[4] = c, e[5] = f, e[6] = r, e[7] = s, e[8] = _) : _ = e[8];
  let H;
  e[9] !== _ ? (H = /* @__PURE__ */ m.jsx("div", {
    className: Lg,
    children: _
  }), e[9] = _, e[10] = H) : H = e[10];
  let P;
  e[11] !== A || e[12] !== y || e[13] !== h || e[14] !== g || e[15] !== v || e[16] !== p ? (P = h != null && /* @__PURE__ */ m.jsx(zg, {
    onClick: y,
    variant: p ?? A,
    ariaLabel: g,
    title: v,
    children: h
  }), e[11] = A, e[12] = y, e[13] = h, e[14] = g, e[15] = v, e[16] = p, e[17] = P) : P = e[17];
  let K;
  e[18] !== P ? (K = /* @__PURE__ */ m.jsx("div", {
    className: `${Lg} ${XC}`,
    children: P
  }), e[18] = P, e[19] = K) : K = e[19];
  const it = `${PC} ${w ? KC : ""}`;
  let at;
  e[20] !== M || e[21] !== B || e[22] !== j ? (at = M && j ? /* @__PURE__ */ m.jsxs("div", {
    className: ZC,
    children: [/* @__PURE__ */ m.jsx(Th, {}), /* @__PURE__ */ m.jsx("span", {
      className: QC,
      children: B
    })]
  }) : B, e[20] = M, e[21] = B, e[22] = j, e[23] = at) : at = e[23];
  let I;
  e[24] !== at || e[25] !== it ? (I = /* @__PURE__ */ m.jsx("div", {
    className: it,
    children: at
  }), e[24] = at, e[25] = it, e[26] = I) : I = e[26];
  let F;
  return e[27] !== I || e[28] !== U || e[29] !== H || e[30] !== K ? (F = /* @__PURE__ */ m.jsxs("div", {
    className: U,
    "data-modal-drag": "",
    children: [H, K, I]
  }), e[27] = I, e[28] = U, e[29] = H, e[30] = K, e[31] = F) : F = e[31], F;
}, WC = /* @__PURE__ */ E.createContext({
  inDetailPane: !1
}), IC = () => E.useContext(WC), Jt = () => {
}, ir = () => ({
  show: Jt,
  hide: Jt,
  enable: Jt,
  disable: Jt,
  showProgress: Jt,
  hideProgress: Jt,
  setParams: Jt,
  setText: Jt,
  onClick: Jt,
  offClick: Jt
}), t8 = {
  initData: "",
  themeParams: {},
  viewportHeight: 0,
  BackButton: ir(),
  SettingsButton: ir(),
  MainButton: ir(),
  SecondaryButton: ir(),
  HapticFeedback: {
    impactOccurred: Jt,
    notificationOccurred: Jt,
    selectionChanged: Jt
  },
  onEvent: Jt,
  offEvent: Jt,
  expand: Jt,
  setHeaderColor: Jt,
  setBackgroundColor: Jt,
  setBottomBarColor: Jt,
  disableVerticalSwipes: Jt,
  enableVerticalSwipes: Jt,
  requestFullscreen: Jt,
  exitFullscreen: Jt,
  shareToStory: Jt
}, Ta = globalThis.Telegram?.WebApp ?? t8;
function e8(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var Vf = { exports: {} }, Uf, Bg;
function n8() {
  if (Bg) return Uf;
  Bg = 1;
  var a = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Uf = a, Uf;
}
var kf, Vg;
function a8() {
  if (Vg) return kf;
  Vg = 1;
  var a = /* @__PURE__ */ n8();
  function e() {
  }
  function l() {
  }
  return l.resetWarningCache = e, kf = function() {
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
  }, kf;
}
var Ug;
function i8() {
  return Ug || (Ug = 1, Vf.exports = /* @__PURE__ */ a8()()), Vf.exports;
}
var l8 = /* @__PURE__ */ i8();
const yn = /* @__PURE__ */ e8(l8);
yn.func;
const Nh = "_button_124dm_1", Mb = "_filled_124dm_9", _b = "_tinted_124dm_14", Db = "_plain_124dm_19", Rb = "_outlined_124dm_24", Nb = "_gray_124dm_28", Ob = "_disabled_124dm_33", Oh = "_skeleton_124dm_38", zb = "_wave_124dm_1", s8 = {
  button: Nh,
  filled: Mb,
  tinted: _b,
  plain: Db,
  outlined: Rb,
  gray: Nb,
  disabled: Ob,
  skeleton: Oh,
  wave: zb
}, o8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  button: Nh,
  default: s8,
  disabled: Ob,
  filled: Mb,
  gray: Nb,
  outlined: Rb,
  plain: Db,
  skeleton: Oh,
  tinted: _b,
  wave: zb
}, Symbol.toStringTag, { value: "Module" })), Wt = (a) => {
  const e = Tt.c(34);
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
  } = Ms(), g = !!Ch(), v = pb(g);
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
  let j;
  e[15] !== l ? (j = /* @__PURE__ */ m.jsx(lt, {
    variant: "body",
    weight: "semibold",
    children: l
  }), e[15] = l, e[16] = j) : j = e[16];
  const M = j, D = g ? Eh : void 0, A = `${Nh} ${o8[f]} ${g ? Oh : ""} ${v}`;
  let R;
  e[17] !== p || e[18] !== g ? (R = p && !g && {
    whileTap: {
      scale: 1.02
    }
  }, e[17] = p, e[18] = g, e[19] = R) : R = e[19];
  let B;
  e[20] !== g || e[21] !== f ? (B = f === "filled" && !g && /* @__PURE__ */ m.jsx(Ss, {}), e[20] = g, e[21] = f, e[22] = B) : B = e[22];
  let U;
  e[23] !== M || e[24] !== g ? (U = g ? /* @__PURE__ */ m.jsx(yb, {
    active: !1,
    children: M
  }) : M, e[23] = M, e[24] = g, e[25] = U) : U = e[25];
  let _;
  return e[26] !== w || e[27] !== s || e[28] !== B || e[29] !== U || e[30] !== D || e[31] !== A || e[32] !== R ? (_ = /* @__PURE__ */ m.jsxs(el, {
    ref: D,
    className: A,
    ...R,
    ...w,
    ...s,
    children: [B, U]
  }), e[26] = w, e[27] = s, e[28] = B, e[29] = U, e[30] = D, e[31] = A, e[32] = R, e[33] = _) : _ = e[33], _;
};
function Lb(a) {
  var e, l, s = "";
  if (typeof a == "string" || typeof a == "number") s += a;
  else if (typeof a == "object") if (Array.isArray(a)) {
    var r = a.length;
    for (e = 0; e < r; e++) a[e] && (l = Lb(a[e])) && (s && (s += " "), s += l);
  } else for (l in a) a[l] && (s && (s += " "), s += l);
  return s;
}
function r8() {
  for (var a, e, l = 0, s = "", r = arguments.length; l < r; l++) (a = arguments[l]) && (e = Lb(a)) && (s && (s += " "), s += e);
  return s;
}
const u8 = (...a) => r8(...a), c8 = {
  SNACKBAR: {
    type: "spring",
    stiffness: 280,
    damping: 26
  }
}, Bb = "_overlay_qo6yx_1", Vb = "_opacity_qo6yx_2", zh = "_fadeIn_qo6yx_6", Lh = "_fadeOut_qo6yx_10", f8 = {
  overlay: Bb,
  opacity: Vb,
  fadeIn: zh,
  fadeOut: Lh,
  "overlay-out": "_overlay-out_qo6yx_1",
  "opacity-out": "_opacity-out_qo6yx_1"
}, d8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: f8,
  fadeIn: zh,
  fadeOut: Lh,
  opacity: Vb,
  overlay: Bb
}, Symbol.toStringTag, { value: "Module" })), h8 = typeof window < "u" && "ontouchstart" in window, m8 = 250;
function p8(a) {
  const e = Tt.c(21);
  let l;
  e[0] !== a ? (l = a === void 0 ? {} : a, e[0] = a, e[1] = l) : l = e[1];
  const {
    onTap: s,
    onTapOut: r,
    mode: c,
    disabled: f
  } = l, h = d8[c === void 0 ? "overlay" : c], [y, p] = E.useState(!1);
  let g;
  e[2] !== h ? (g = [h], e[2] = h, e[3] = g) : g = e[3];
  const [v, b] = E.useState(g), T = E.useRef();
  let S;
  e[4] !== h || e[5] !== r ? (S = () => {
    p(!1), b([h, Lh]), r?.(), T.current = window.setTimeout(() => {
      b([h]);
    }, m8);
  }, e[4] = h, e[5] = r, e[6] = S) : S = e[6];
  const w = S;
  let j;
  e[7] !== h || e[8] !== s ? (j = (_) => {
    clearTimeout(T.current), p(!0), b([h, zh]), s?.(_);
  }, e[7] = h, e[8] = s, e[9] = j) : j = e[9];
  const M = j;
  let D, A;
  e[10] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (D = () => () => clearTimeout(T.current), A = [], e[10] = D, e[11] = A) : (D = e[10], A = e[11]), E.useEffect(D, A);
  let R;
  e[12] !== f || e[13] !== M || e[14] !== w || e[15] !== y ? (R = h8 ? {
    onTouchStart: (_) => {
      f || (_.touches.length === 1 ? M({
        target: _.currentTarget,
        clientX: _.touches[0].clientX,
        clientY: _.touches[0].clientY
      }) : w());
    },
    onTouchEnd: () => {
      f || y && w();
    },
    onPointerMove: (_) => {
      y && _.pointerType === "touch" && (_.movementY !== 0 || _.movementX !== 0) && w();
    },
    onTouchCancel: () => {
      y && w();
    }
  } : {
    onMouseLeave: () => {
      y && w();
    },
    onMouseDown: (_) => {
      f || M({
        target: _.currentTarget,
        clientX: _.clientX,
        clientY: _.clientY
      });
    },
    onMouseUp: () => {
      f || y && w();
    },
    onContextMenu: () => {
      y && w();
    }
  }, e[12] = f, e[13] = M, e[14] = w, e[15] = y, e[16] = R) : R = e[16];
  const B = R;
  let U;
  return e[17] !== B || e[18] !== y || e[19] !== v ? (U = [y, B, v], e[17] = B, e[18] = y, e[19] = v, e[20] = U) : U = e[20], U;
}
const y8 = "_root_1oiyj_1", g8 = "_fade_1oiyj_22", v8 = "_ripples_1oiyj_30", b8 = "_ripple_1oiyj_30", x8 = "_tapped_1oiyj_47", lr = (...a) => a.filter(Boolean).join(" "), S8 = (a, e) => {
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
  } = Ms(), [y, p] = E.useState({}), [g, v, b] = p8({
    mode: s,
    disabled: r,
    onTap: ({
      target: w,
      clientX: j,
      clientY: M
    }) => {
      if (!h || !w) return;
      const {
        x: D,
        y: A,
        width: R,
        height: B
      } = w.getBoundingClientRect(), U = Math.max(R * 2, B * 2);
      p((_) => ({
        ..._,
        [`${performance.now()}`]: [j - D - U / 2, M - A - U / 2, U]
      }));
    }
  }), T = s === "opacity", S = S8(c, v);
  return /* @__PURE__ */ m.jsxs(a, {
    ...S,
    disabled: r || void 0,
    className: lr(y8, l, T && lr(...b)),
    children: [e, f && !T && /* @__PURE__ */ m.jsx("div", {
      className: lr(g8, ...b)
    }), h && /* @__PURE__ */ m.jsx("div", {
      className: v8,
      children: Object.entries(y).map(([w, j]) => /* @__PURE__ */ m.jsx("span", {
        className: lr(b8, g && x8),
        style: {
          left: j[0],
          top: j[1],
          width: j[2],
          height: j[2]
        },
        onAnimationEnd: () => {
          g || p((M) => {
            const D = {
              ...M
            };
            return delete D[w], D;
          });
        }
      }, w))
    })]
  });
}, w8 = "_label_1w5sq_1", T8 = "_accent_1w5sq_6", C8 = "_description_1w5sq_10", kg = "_caption_1w5sq_14", E8 = (a) => {
  const e = Tt.c(15), {
    type: l,
    title: s,
    description: r,
    caption: c,
    bold: f
  } = a, h = f ? "medium" : "regular", y = `${w8} ${l === "Accent" ? T8 : ""}`;
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
    className: c ? C8 : kg,
    children: /* @__PURE__ */ m.jsx(lt, {
      variant: c ? "subheadline1" : "subheadline2",
      weight: "regular",
      children: r
    })
  }), e[6] = c, e[7] = r, e[8] = v) : v = e[8];
  let b;
  e[9] !== c ? (b = c && /* @__PURE__ */ m.jsx("div", {
    className: kg,
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
}, Ub = "_chevron_en74z_1", kb = "_dropdown_en74z_8", Bh = "_colorpicker_en74z_12", Vh = "_picker_en74z_63", j8 = {
  chevron: Ub,
  dropdown: kb,
  colorpicker: Bh,
  picker: Vh
}, Hg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  chevron: Ub,
  colorpicker: Bh,
  default: j8,
  dropdown: kb,
  picker: Vh
}, Symbol.toStringTag, { value: "Module" })), A8 = (a) => {
  const e = Tt.c(21), {
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
      className: Vh,
      children: /* @__PURE__ */ m.jsx(lt, {
        variant: "body",
        weight: "regular",
        children: r
      })
    }), e[0] = r, e[1] = D) : D = e[1], D;
  }
  if (l === "ColorPicker") {
    const D = y || v;
    let A;
    e[2] !== D || e[3] !== h || e[4] !== v || e[5] !== f || e[6] !== c ? (A = /* @__PURE__ */ m.jsx("input", {
      ref: h,
      type: "color",
      value: c,
      onChange: f,
      name: v,
      id: D
    }), e[2] = D, e[3] = h, e[4] = v, e[5] = f, e[6] = c, e[7] = A) : A = e[7];
    let R;
    e[8] !== D || e[9] !== b || e[10] !== c ? (R = b && /* @__PURE__ */ m.jsx("label", {
      htmlFor: D,
      children: /* @__PURE__ */ m.jsx(lt, {
        variant: "body",
        weight: "regular",
        children: c
      })
    }), e[8] = D, e[9] = b, e[10] = c, e[11] = R) : R = e[11];
    let B;
    return e[12] !== A || e[13] !== R ? (B = /* @__PURE__ */ m.jsxs("div", {
      className: Bh,
      children: [A, R]
    }), e[12] = A, e[13] = R, e[14] = B) : B = e[14], B;
  }
  const T = Hg[l.toLowerCase()], S = Hg[s];
  let w;
  e[15] !== T || e[16] !== S ? (w = [T, S].filter(Boolean), e[15] = T, e[16] = S, e[17] = w) : w = e[17];
  const j = w.join(" ");
  let M;
  return e[18] !== r || e[19] !== j ? (M = /* @__PURE__ */ m.jsx("div", {
    className: j,
    children: r
  }), e[18] = r, e[19] = j, e[20] = M) : M = e[20], M;
}, M8 = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5ZM15.1016 9.01953C14.7891 8.70711 14.2821 8.70711 13.9697 9.01953L12.001 10.9873L10.0342 9.02051C9.72176 8.70809 9.21574 8.70809 8.90332 9.02051C8.5909 9.33293 8.5909 9.83895 8.90332 10.1514L10.8701 12.1191L9.02051 13.9697C8.70809 14.2821 8.70809 14.7882 9.02051 15.1006C9.33293 15.413 9.83895 15.413 10.1514 15.1006L12.001 13.25L13.8525 15.1016C14.165 15.414 14.672 15.414 14.9844 15.1016C15.2968 14.7891 15.2968 14.2821 14.9844 13.9697L13.1328 12.1182L15.1016 10.1514C15.414 9.83895 15.414 9.33195 15.1016 9.01953Z", fill: "#3D3C3A" }))), _8 = "_root_9aal5_1", D8 = "_input_9aal5_5", R8 = "_inputWithClearButton_9aal5_25", N8 = "_clearButtonIcon_9aal5_29", O8 = "_empty_9aal5_49", z8 = "_icon_9aal5_61", L8 = /* @__PURE__ */ E.forwardRef((a, e) => {
  const l = Tt.c(24);
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
  const p = h, g = !y && O8;
  let v;
  l[7] !== g ? (v = [_8, g].filter(Boolean), l[7] = g, l[8] = v) : v = l[8];
  const b = v.join(" "), T = `${D8} ${c ? R8 : ""}`, S = !r;
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
  let j;
  l[17] !== s || l[18] !== c ? (j = c && /* @__PURE__ */ m.jsx("button", {
    type: "button",
    className: [z8, N8].filter(Boolean).join(" "),
    onClick: c,
    "aria-label": `Clear ${s}`,
    children: /* @__PURE__ */ m.jsx(M8, {})
  }), l[17] = s, l[18] = c, l[19] = j) : j = l[19];
  let M;
  return l[20] !== b || l[21] !== w || l[22] !== j ? (M = /* @__PURE__ */ m.jsxs(lt, {
    variant: "body",
    weight: "regular",
    className: b,
    children: [w, j]
  }), l[20] = b, l[21] = w, l[22] = j, l[23] = M) : M = l[23], M;
}), qg = "_root_1aqfj_1";
function B8(a) {
  const e = Tt.c(15), {
    value: l,
    defaultValue: s,
    onChange: r,
    disabled: c,
    className: f
  } = a, h = s === void 0 ? !1 : s, y = c === void 0 ? !1 : c, p = l !== void 0, [g, v] = E.useState(h), b = p ? l : g;
  let T;
  e[0] !== r ? (T = (_) => {
    r && r(_);
  }, e[0] = r, e[1] = T) : T = e[1];
  const S = T;
  let w;
  e[2] !== b || e[3] !== S || e[4] !== p ? (w = () => {
    if (Ta.HapticFeedback.selectionChanged(), p) {
      S(!b);
      return;
    }
    v((_) => {
      const H = !_;
      return S(H), H;
    });
  }, e[2] = b, e[3] = S, e[4] = p, e[5] = w) : w = e[5];
  const j = w;
  let M;
  e[6] !== y || e[7] !== j ? (M = (_) => {
    _.stopPropagation(), !y && j();
  }, e[6] = y, e[7] = j, e[8] = M) : M = e[8];
  const D = M, A = f ? `${qg} ${f}` : qg, R = y || void 0, B = y || void 0;
  let U;
  return e[9] !== b || e[10] !== A || e[11] !== D || e[12] !== R || e[13] !== B ? (U = /* @__PURE__ */ m.jsx("div", {
    className: A,
    "data-state": b,
    "data-disabled": R,
    onClick: D,
    role: "switch",
    "aria-checked": b,
    "aria-disabled": B
  }), e[9] = b, e[10] = A, e[11] = D, e[12] = R, e[13] = B, e[14] = U) : U = e[14], U;
}
const V8 = (a) => {
  const e = Tt.c(29);
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
  e[8] !== s ? (w = (_) => {
    s && s(_);
  }, e[8] = s, e[9] = w) : w = e[9];
  const j = w;
  let M;
  e[10] !== j || e[11] !== v ? (M = (_) => {
    v || T(_), j(_);
  }, e[10] = j, e[11] = v, e[12] = M) : M = e[12];
  const D = M;
  let A;
  e[13] !== S || e[14] !== g || e[15] !== j || e[16] !== D || e[17] !== v ? (A = () => {
    if (!g) {
      if (Ta.HapticFeedback.selectionChanged(), v) {
        D(!S);
        return;
      }
      T((_) => {
        const H = !_;
        return j(H), H;
      });
    }
  }, e[13] = S, e[14] = g, e[15] = j, e[16] = D, e[17] = v, e[18] = A) : A = e[18];
  const R = A;
  let B;
  e[19] !== S || e[20] !== g || e[21] !== D ? (B = /* @__PURE__ */ m.jsx(Kn.Part, {
    type: "Switch",
    children: /* @__PURE__ */ m.jsx(B8, {
      value: S,
      onChange: D,
      disabled: g
    })
  }), e[19] = S, e[20] = g, e[21] = D, e[22] = B) : B = e[22];
  let U;
  return e[23] !== l || e[24] !== R || e[25] !== r || e[26] !== c || e[27] !== B ? (U = /* @__PURE__ */ m.jsx(Kn, {
    start: c,
    end: B,
    onClick: R,
    ...r,
    children: l
  }), e[23] = l, e[24] = R, e[25] = r, e[26] = c, e[27] = B, e[28] = U) : U = e[28], U;
}, $g = "_root_146xt_10", U8 = "_start_146xt_32", k8 = "_image_146xt_37", H8 = "_icon_146xt_45", q8 = "_body_146xt_57", $8 = "_end_146xt_65", G8 = "_caption_146xt_76", Y8 = "_label_146xt_80", X8 = (a) => {
  const e = Tt.c(28);
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
    className: U8,
    children: f
  }), e[8] = f, e[9] = v) : v = e[9];
  let b;
  e[10] !== l ? (b = /* @__PURE__ */ m.jsx("div", {
    className: q8,
    children: l
  }), e[10] = l, e[11] = b) : b = e[11];
  let T;
  e[12] !== s ? (T = s && /* @__PURE__ */ m.jsx("div", {
    className: $8,
    children: s
  }), e[12] = s, e[13] = T) : T = e[13];
  let S;
  e[14] !== v || e[15] !== b || e[16] !== T ? (S = /* @__PURE__ */ m.jsxs(m.Fragment, {
    children: [v, b, T]
  }), e[14] = v, e[15] = b, e[16] = T, e[17] = S) : S = e[17];
  const w = S;
  if (!g) {
    let M;
    return e[18] !== p || e[19] !== w || e[20] !== r || e[21] !== c ? (M = /* @__PURE__ */ m.jsx(p, {
      className: $g,
      onClick: r,
      ...c,
      children: w
    }), e[18] = p, e[19] = w, e[20] = r, e[21] = c, e[22] = M) : M = e[22], M;
  }
  let j;
  return e[23] !== p || e[24] !== w || e[25] !== r || e[26] !== c ? (j = /* @__PURE__ */ m.jsx(Ce, {
    as: p,
    className: $g,
    onClick: r,
    ...c,
    children: w
  }), e[23] = p, e[24] = w, e[25] = r, e[26] = c, e[27] = j) : j = e[27], j;
}, P8 = (a) => {
  const e = Tt.c(6), {
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
        className: k8
      }), e[0] = c, e[1] = p) : p = e[1], h = p;
      break t;
    }
    case "Icon": {
      let p;
      e[2] !== f ? (p = /* @__PURE__ */ m.jsx("div", {
        className: H8,
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
}, K8 = (a) => {
  const e = Tt.c(7), {
    label: l,
    caption: s
  } = a;
  let r;
  e[0] !== l ? (r = /* @__PURE__ */ m.jsx("div", {
    className: Y8,
    children: /* @__PURE__ */ m.jsx(lt, {
      variant: "body",
      weight: "regular",
      children: l
    })
  }), e[0] = l, e[1] = r) : r = e[1];
  let c;
  e[2] !== s ? (c = s && /* @__PURE__ */ m.jsx("div", {
    className: G8,
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
}, Kn = Object.assign(X8, {
  Start: P8,
  End: K8,
  Part: A8,
  Text: E8,
  Editable: L8,
  Switch: V8
});
qr.section;
wh[16];
function Z8(a, e, l) {
  const s = Tt.c(8);
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
const Hf = (a, e, l) => Math.min(Math.max(a, e), l), Q8 = /* @__PURE__ */ E.createContext({
  colorScheme: "light",
  setColorScheme: () => {
  },
  toggleColorScheme: () => {
  }
}), F8 = ["light", "dark"], Ed = (a) => F8.includes(a), jd = () => {
  if (typeof window > "u" || typeof document > "u")
    return null;
  const a = window.getComputedStyle(document.documentElement).getPropertyValue("--tg-color-scheme").trim();
  return Ed(a) ? a : null;
}, Hb = () => typeof window > "u" || !window.matchMedia ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light", J8 = () => jd() ?? Hb(), W8 = typeof window > "u" ? E.useEffect : E.useLayoutEffect, I8 = (a) => {
  const e = Tt.c(20), {
    children: l,
    defaultColorScheme: s,
    onColorSchemeChange: r
  } = a, [c, f] = E.useState(J8);
  let h;
  e[0] !== s ? (h = () => Ed(s) ? s : null, e[0] = s, e[1] = h) : h = e[1];
  const [y, p] = E.useState(h), g = y ?? c;
  let v;
  e[2] !== g || e[3] !== r ? (v = (U) => {
    const _ = typeof U == "function" ? U(g) : U;
    Ed(_) && (p(_), r?.(_));
  }, e[2] = g, e[3] = r, e[4] = v) : v = e[4];
  const b = v;
  let T;
  e[5] !== g || e[6] !== b ? (T = () => {
    b(g === "dark" ? "light" : "dark");
  }, e[5] = g, e[6] = b, e[7] = T) : T = e[7];
  const S = T;
  let w, j;
  e[8] !== g ? (w = () => {
    document.documentElement.dataset.colorScheme = g, document.body.dataset.colorScheme = g;
  }, j = [g], e[8] = g, e[9] = w, e[10] = j) : (w = e[9], j = e[10]), W8(w, j);
  let M, D;
  e[11] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (M = () => {
    const U = () => {
      const P = jd();
      if (P) {
        f(P);
        return;
      }
      f(Hb());
    }, _ = (P) => {
      jd() || f(P.matches ? "dark" : "light");
    };
    U();
    const H = window.matchMedia("(prefers-color-scheme: dark)");
    return Ta.onEvent("themeChanged", U), H.addEventListener("change", _), () => {
      Ta.offEvent("themeChanged", U), H.removeEventListener("change", _);
    };
  }, D = [], e[11] = M, e[12] = D) : (M = e[11], D = e[12]), E.useEffect(M, D);
  let A;
  e[13] !== g || e[14] !== b || e[15] !== S ? (A = {
    colorScheme: g,
    setColorScheme: b,
    toggleColorScheme: S
  }, e[13] = g, e[14] = b, e[15] = S, e[16] = A) : A = e[16];
  const R = A;
  let B;
  return e[17] !== l || e[18] !== R ? (B = /* @__PURE__ */ m.jsx(Q8.Provider, {
    value: R,
    children: l
  }), e[17] = l, e[18] = R, e[19] = B) : B = e[19], B;
}, tE = /* @__PURE__ */ E.forwardRef((a, e) => {
  const l = Tt.c(11);
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
  return l[5] !== s || l[6] !== h || l[7] !== r || l[8] !== e || l[9] !== f ? (y = /* @__PURE__ */ m.jsx(EC, {
    ref: e,
    href: f,
    onClick: h,
    ...r,
    children: s
  }), l[5] = s, l[6] = h, l[7] = r, l[8] = e, l[9] = f, l[10] = y) : y = l[10], y;
});
tE.displayName = "TransitionLink";
const qb = ({
  children: a
}) => a;
qb.isModalPage = !0;
qb.propTypes = {
  id: yn.string.isRequired,
  children: yn.node
};
qr.modal;
wh[16];
const eE = (a) => {
  const e = Tt.c(2), {
    children: l
  } = a;
  let s;
  return e[0] !== l ? (s = /* @__PURE__ */ m.jsx(CT, {
    features: oC,
    strict: !0,
    children: l
  }), e[0] = l, e[1] = s) : s = e[1], s;
}, {
  setHeaderColor: nE,
  setBackgroundColor: aE
} = Ta, sl = (a) => {
  const e = Tt.c(18), {
    children: l,
    mode: s,
    headerColor: r,
    backgroundColor: c,
    expandOnMount: f
  } = a, h = s === void 0 ? "secondary" : s, {
    inDetailPane: y,
    setPaneBackground: p
  } = IC();
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
  const T = b, S = r ? `#${r}` : v[h], w = c ? `#${c}` : v[h], j = c ? `#${c}` : `var(${T[h]})`;
  let M, D;
  e[2] !== f ? (M = () => {
    f && Ta.expand();
  }, D = [f], e[2] = f, e[3] = M, e[4] = D) : (M = e[3], D = e[4]), E.useEffect(M, D);
  let A, R;
  e[5] !== j || e[6] !== y || e[7] !== w || e[8] !== S ? (A = () => {
    y || (Ta.initData ? (aE(w), nE(S)) : document.body.style.backgroundColor = j, document.body.style.setProperty("--page-background", j));
  }, R = [w, S, j, y], e[5] = j, e[6] = y, e[7] = w, e[8] = S, e[9] = A, e[10] = R) : (A = e[9], R = e[10]), E.useEffect(A, R);
  let B, U;
  e[11] !== j || e[12] !== y || e[13] !== p ? (B = () => {
    !y || !p || p(j);
  }, U = [y, p, j], e[11] = j, e[12] = y, e[13] = p, e[14] = B, e[15] = U) : (B = e[14], U = e[15]), E.useEffect(B, U);
  let _;
  return e[16] !== l ? (_ = /* @__PURE__ */ m.jsx(m.Fragment, {
    children: l
  }), e[16] = l, e[17] = _) : _ = e[17], _;
};
sl.propTypes = {
  children: yn.node,
  mode: yn.oneOf(["primary", "secondary"]),
  headerColor: yn.string,
  backgroundColor: yn.string,
  expandOnMount: yn.bool
};
const iE = "_root_125s3_1", lE = "_card_125s3_16", sE = "_container_125s3_22", qf = "flex justify-between gap-compact px-content py-10 text-section";
function Gg(a) {
  const e = Tt.c(27);
  let l, s, r, c;
  switch (e[0] !== a ? ({
    type: r,
    title: s,
    value: c,
    ...l
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c) : (l = e[1], s = e[2], r = e[3], c = e[4]), r) {
    case "Headline": {
      let f;
      e[5] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (f = u8(qf, "text-foreground"), e[5] = f) : f = e[5];
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
        className: qf,
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
        className: qf,
        ...l,
        children: [f, h]
      }), e[23] = l, e[24] = f, e[25] = h, e[26] = y) : y = e[26], y;
    }
  }
}
const oE = qr.section, rE = wh[16], uE = 0.6, yt = (a) => {
  const e = Tt.c(6);
  let l, s;
  e[0] !== a ? ({
    children: l,
    ...s
  } = a, e[0] = a, e[1] = l, e[2] = s) : (l = e[1], s = e[2]);
  let r;
  return e[3] !== l || e[4] !== s ? (r = /* @__PURE__ */ m.jsx("section", {
    className: iE,
    ...s,
    children: l
  }), e[3] = l, e[4] = s, e[5] = r) : r = e[5], r;
}, cE = (a) => {
  const e = Tt.c(21);
  let l, s, r, c;
  e[0] !== a ? ({
    children: l,
    header: r,
    description: s,
    ...c
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c) : (l = e[1], s = e[2], r = e[3], c = e[4]);
  const {
    isApple: f
  } = Ms(), h = E.useRef(null), y = E.useRef(null), p = f ? oE : rE;
  let g;
  e[5] !== p ? (g = {
    radius: p,
    smoothing: uE
  }, e[5] = p, e[6] = g) : g = e[6];
  let v;
  e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = {
    autoEffects: !1
  }, e[7] = v) : v = e[7], ab(f ? y : h, g, v);
  let b;
  e[8] !== r ? (b = r && /* @__PURE__ */ m.jsx(Gg, {
    title: r
  }), e[8] = r, e[9] = b) : b = e[9];
  let T;
  e[10] !== l ? (T = /* @__PURE__ */ m.jsx("div", {
    ref: y,
    className: sE,
    children: l
  }), e[10] = l, e[11] = T) : T = e[11];
  let S;
  e[12] !== b || e[13] !== T ? (S = /* @__PURE__ */ m.jsxs("div", {
    ref: h,
    className: lE,
    children: [b, T]
  }), e[12] = b, e[13] = T, e[14] = S) : S = e[14];
  let w;
  e[15] !== s ? (w = s && /* @__PURE__ */ m.jsx(Gg, {
    type: "Footer",
    title: s
  }), e[15] = s, e[16] = w) : w = e[16];
  let j;
  return e[17] !== c || e[18] !== S || e[19] !== w ? (j = /* @__PURE__ */ m.jsxs("section", {
    ...c,
    children: [S, w]
  }), e[17] = c, e[18] = S, e[19] = w, e[20] = j) : j = e[20], j;
};
yt.Item = cE;
const fE = "_root_cnxqv_1", dE = "_icon_cnxqv_17", hE = "_content_cnxqv_42", mE = "_title_cnxqv_55", pE = "_description_cnxqv_56", yE = "_action_cnxqv_61", gE = "_link_cnxqv_61", vE = "_host_cnxqv_92", bE = "_host_top_cnxqv_105", xE = "_host_bottom_cnxqv_109", SE = "_item_cnxqv_114", wE = (a) => {
  const e = Tt.c(19), {
    icon: l,
    title: s,
    description: r,
    link: c,
    action: f
  } = a, h = !!r;
  let y;
  e[0] !== l ? (y = l ? /* @__PURE__ */ m.jsx("div", {
    className: dE,
    "aria-hidden": "true",
    children: l
  }) : null, e[0] = l, e[1] = y) : y = e[1];
  const p = h ? "semibold" : void 0;
  let g;
  e[2] !== p || e[3] !== s ? (g = /* @__PURE__ */ m.jsx(lt, {
    as: "p",
    className: mE,
    variant: "subheadline2",
    weight: p,
    children: s
  }), e[2] = p, e[3] = s, e[4] = g) : g = e[4];
  let v;
  e[5] !== r ? (v = r ? /* @__PURE__ */ m.jsx(lt, {
    as: "p",
    className: pE,
    variant: "subheadline2",
    children: r
  }) : null, e[5] = r, e[6] = v) : v = e[6];
  let b;
  e[7] !== c ? (b = c ? /* @__PURE__ */ m.jsx("button", {
    type: "button",
    className: gE,
    onClick: c.onClick,
    children: /* @__PURE__ */ m.jsx(lt, {
      as: "span",
      variant: "subheadline2",
      children: c.label
    })
  }) : null, e[7] = c, e[8] = b) : b = e[8];
  let T;
  e[9] !== g || e[10] !== v || e[11] !== b ? (T = /* @__PURE__ */ m.jsxs("div", {
    className: hE,
    children: [g, v, b]
  }), e[9] = g, e[10] = v, e[11] = b, e[12] = T) : T = e[12];
  let S;
  e[13] !== f ? (S = f ? /* @__PURE__ */ m.jsx("button", {
    type: "button",
    className: yE,
    onClick: f.onClick,
    children: /* @__PURE__ */ m.jsx(lt, {
      as: "span",
      variant: "body",
      children: f.label
    })
  }) : null, e[13] = f, e[14] = S) : S = e[14];
  let w;
  return e[15] !== y || e[16] !== T || e[17] !== S ? (w = /* @__PURE__ */ m.jsxs("div", {
    className: fE,
    role: "status",
    "aria-live": "polite",
    children: [y, T, S]
  }), e[15] = y, e[16] = T, e[17] = S, e[18] = w) : w = e[18], w;
};
yn.shape({
  label: yn.node.isRequired,
  onClick: yn.func
});
const TE = 4e3, CE = 100, EE = 500, jE = (a) => {
  if (a)
    try {
      Ta.HapticFeedback?.notificationOccurred(a);
    } catch {
    }
}, AE = (a) => {
  const e = Tt.c(45), {
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
  } = l, T = g === void 0 ? "bottom" : g, S = v === void 0 ? TE : v, w = rC(), [j, M] = E.useState(!1), [D, A] = E.useState(0);
  let R;
  e[0] !== r || e[1] !== s ? (R = () => s(r), e[0] = r, e[1] = s, e[2] = R) : R = e[2];
  const B = R;
  let U, _;
  e[3] !== b ? (U = () => {
    jE(b);
  }, _ = [b], e[3] = b, e[4] = U, e[5] = _) : (U = e[4], _ = e[5]), E.useEffect(U, _);
  let H, P;
  e[6] !== B || e[7] !== S || e[8] !== j ? (H = () => {
    if (!S || j)
      return;
    const _t = setTimeout(B, S);
    return () => clearTimeout(_t);
  }, P = [S, j, B], e[6] = B, e[7] = S, e[8] = j, e[9] = H, e[10] = P) : (H = e[9], P = e[10]), E.useEffect(H, P);
  const K = T === "top" ? -32 : 32, it = b === "error";
  let at;
  e[11] !== w || e[12] !== K ? (at = w ? {
    opacity: 0
  } : {
    opacity: 0,
    y: K,
    scale: 0.96
  }, e[11] = w, e[12] = K, e[13] = at) : at = e[13];
  const I = at;
  let F;
  e[14] !== it || e[15] !== w ? (F = w ? {
    opacity: 1
  } : {
    opacity: 1,
    y: 0,
    scale: 1,
    x: it ? [0, -10, 10, -7, 7, -3, 3, 0] : 0,
    transition: {
      default: c8.SNACKBAR,
      ...it && {
        x: {
          duration: 0.45,
          ease: "easeOut",
          delay: 0.18
        }
      }
    }
  }, e[14] = it, e[15] = w, e[16] = F) : F = e[16];
  const et = F;
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
  const V = N;
  let Z;
  e[21] !== B ? (Z = (_t, wt) => {
    M(!1);
    const Xt = wt.offset.x, Pt = wt.velocity.x;
    (Math.abs(Xt) > CE || Math.abs(Pt) > EE) && (A(Xt >= 0 ? 1 : -1), B());
  }, e[21] = B, e[22] = Z) : Z = e[22];
  const nt = Z;
  let st;
  e[23] !== B ? (st = (_t) => {
    if (_t)
      return {
        ..._t,
        onClick: () => {
          _t.onClick?.(), B();
        }
      };
  }, e[23] = B, e[24] = st) : st = e[24];
  const O = st, Y = w ? !1 : "x";
  let tt;
  e[25] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (tt = () => M(!0), e[25] = tt) : tt = e[25];
  let ot;
  e[26] !== y || e[27] !== O ? (ot = O(y), e[26] = y, e[27] = O, e[28] = ot) : ot = e[28];
  let dt;
  e[29] !== p || e[30] !== O ? (dt = O(p), e[29] = p, e[30] = O, e[31] = dt) : dt = e[31];
  let ht;
  e[32] !== h || e[33] !== c || e[34] !== ot || e[35] !== dt || e[36] !== f ? (ht = /* @__PURE__ */ m.jsx(wE, {
    icon: c,
    title: f,
    description: h,
    link: ot,
    action: dt
  }), e[32] = h, e[33] = c, e[34] = ot, e[35] = dt, e[36] = f, e[37] = ht) : ht = e[37];
  let vt;
  return e[38] !== et || e[39] !== V || e[40] !== nt || e[41] !== I || e[42] !== Y || e[43] !== ht ? (vt = /* @__PURE__ */ m.jsx(el, {
    className: SE,
    initial: I,
    animate: et,
    exit: V,
    layout: !0,
    drag: Y,
    dragSnapToOrigin: !0,
    dragElastic: 0.6,
    dragMomentum: !1,
    onDragStart: tt,
    onDragEnd: nt,
    children: ht
  }), e[38] = et, e[39] = V, e[40] = nt, e[41] = I, e[42] = Y, e[43] = ht, e[44] = vt) : vt = e[44], vt;
}, $b = {
  top: bE,
  bottom: xE
}, ME = Object.keys($b), _E = (a) => {
  const e = Tt.c(5), {
    snackbars: l,
    onDismiss: s
  } = a;
  let r;
  e[0] !== s || e[1] !== l ? (r = ME.map((f) => {
    const h = l.filter((y) => (y.position ?? "bottom") === f);
    return /* @__PURE__ */ m.jsx("div", {
      className: `${vE} ${$b[f]}`,
      children: /* @__PURE__ */ m.jsx(TT, {
        initial: !1,
        children: h.map((y) => /* @__PURE__ */ m.jsx(AE, {
          item: y,
          onDismiss: s
        }, y.id))
      })
    }, f);
  }), e[0] = s, e[1] = l, e[2] = r) : r = e[2];
  let c;
  return e[3] !== r ? (c = /* @__PURE__ */ Hr.createPortal(/* @__PURE__ */ m.jsx(m.Fragment, {
    children: r
  }), document.body), e[3] = r, e[4] = c) : c = e[4], c;
}, Gb = /* @__PURE__ */ E.createContext(null), DE = () => {
  const a = E.useContext(Gb);
  if (!a)
    throw new Error("useSnackbar must be used inside <SnackbarProvider>");
  return a;
}, Yb = (a) => {
  const e = Tt.c(9), {
    children: l
  } = a;
  let s;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (s = [], e[0] = s) : s = e[0];
  const [r, c] = E.useState(s), f = E.useRef(0);
  let h;
  e[1] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (h = (S) => {
    c((w) => w.filter((j) => j.id !== S));
  }, e[1] = h) : h = e[1];
  const y = h;
  let p;
  e[2] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (p = (S) => {
    f.current = f.current + 1;
    const w = f.current;
    return c((j) => [...j, {
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
  e[4] !== r ? (b = /* @__PURE__ */ m.jsx(_E, {
    snackbars: r,
    onDismiss: y
  }), e[4] = r, e[5] = b) : b = e[5];
  let T;
  return e[6] !== l || e[7] !== b ? (T = /* @__PURE__ */ m.jsxs(Gb.Provider, {
    value: v,
    children: [l, b]
  }), e[6] = l, e[7] = b, e[8] = T) : T = e[8], T;
}, RE = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/loader" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M12 3.02148C16.9704 3.02148 20.9997 7.07957 21 12.0859C21 17.0925 16.9706 21.1514 12 21.1514C7.02944 21.1514 3 17.0925 3 12.0859C3.00026 11.5299 3.44787 11.0791 4 11.0791C4.55213 11.0791 4.99974 11.5299 5 12.0859C5 15.9799 8.13401 19.1367 12 19.1367C15.866 19.1367 19 15.9799 19 12.0859C18.9997 8.19215 15.8658 5.03613 12 5.03613C9.64439 5.03613 7.56033 6.20674 6.29004 8.00684C5.97018 8.46016 5.34566 8.56708 4.89551 8.24512C4.44533 7.92286 4.33924 7.29328 4.65918 6.83984C6.28848 4.53074 8.96935 3.02148 12 3.02148Z", fill: "#3D3C3A" }))), NE = "_centered_1ma1e_1", OE = "_spinner_1ma1e_8", Uh = (a) => {
  const e = Tt.c(15);
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
  const p = y;
  let g;
  e[9] !== h || e[10] !== r || e[11] !== p ? (g = /* @__PURE__ */ m.jsx(RE, {
    ...r,
    className: h,
    style: p
  }), e[9] = h, e[10] = r, e[11] = p, e[12] = g) : g = e[12];
  const v = g;
  if (l) {
    let b;
    return e[13] !== v ? (b = /* @__PURE__ */ m.jsx("div", {
      className: NE,
      children: v
    }), e[13] = v, e[14] = b) : b = e[14], b;
  }
  return v;
}, zE = "_root_warzp_1", LE = "_gradient_warzp_71", BE = "_clipPathContainer_warzp_113", VE = "_tab_1mynw_1", UE = "_icon_1mynw_37", kE = "_active_1mynw_62", Xb = (a) => {
  const e = Tt.c(21);
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
  const g = `${VE} ${s ? kE : ""} ${y}`;
  let v;
  e[8] !== g ? (v = g.trim(), e[8] = g, e[9] = v) : v = e[9];
  let b;
  e[10] !== l ? (b = /* @__PURE__ */ m.jsx(el, {
    layout: !0,
    className: UE,
    children: l
  }), e[10] = l, e[11] = b) : b = e[11];
  let T;
  e[12] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (T = {
    display: "inline-block"
  }, e[12] = T) : T = e[12];
  let S;
  e[13] !== r ? (S = /* @__PURE__ */ m.jsx(d6, {
    layout: !0,
    style: T,
    children: r
  }), e[13] = r, e[14] = S) : S = e[14];
  let w;
  return e[15] !== c || e[16] !== f || e[17] !== v || e[18] !== b || e[19] !== S ? (w = /* @__PURE__ */ m.jsxs(el, {
    layout: !0,
    transition: p,
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
  const c = E.useRef(null), [f, h] = E.useState(!1), [y, p] = E.useState(null), g = E.useRef(null), v = E.useRef(!1), b = E.useRef(null), T = E.useRef(0), S = 6, w = 100 / a, j = `calc(${w}% + 7.33px - 4px)`, M = `calc(${w * e}% - ${3.67 * e}px)`, D = M, A = `calc(100% - (${M} + ${j}) - 2.33px * ${e})`, R = f && y != null ? `inset(0 ${100 - (y + w)}% 0 ${y}% round 100px)` : `inset(0 ${A} 0 ${D} round 100px)`, B = f ? {
    clipPath: {
      duration: 0
    }
  } : {
    clipPath: r
  }, U = (I) => {
    const F = c.current;
    if (!F) return;
    const et = F.getBoundingClientRect(), N = I - et.left, V = et.width;
    if (V <= 0) return;
    const Z = N / V * 100, nt = Hf(Z - w / 2, 0, 100 - w);
    p(nt);
  }, _ = (I) => {
    v.current = !0, b.current = I.pointerId, T.current = I.clientX;
  }, H = (I) => {
    if (!(b.current != null && I.pointerId !== b.current)) {
      if (!f) {
        if (!v.current) return;
        if (Math.abs(I.clientX - T.current) >= S) {
          try {
            I.currentTarget.setPointerCapture?.(I.pointerId), g.current = I.pointerId;
          } catch {
          }
          h(!0), U(I.clientX), I.preventDefault();
        }
        return;
      }
      g.current != null && I.pointerId !== g.current || (U(I.clientX), I.preventDefault());
    }
  }, P = (I) => {
    const F = c.current;
    let et = e;
    if (F && typeof I == "number") {
      const N = F.getBoundingClientRect(), V = I - N.left, Z = N.width;
      if (Z > 0) {
        const nt = Z / a;
        et = Hf(Math.round(V / nt - 0.5), 0, a - 1);
      }
    } else if (y != null) {
      const N = 100 / a;
      et = Hf(Math.round(y / N), 0, a - 1);
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
  }, it = (I) => {
    v.current = !1, b.current = null, f && (P(I?.clientX), I.preventDefault?.());
  }, at = (I) => {
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
      clipPath: R
    },
    transition: B,
    handlers: {
      onPointerDown: _,
      onPointerMove: H,
      onPointerUp: K,
      onPointerCancel: it,
      onPointerLeave: at
    }
  };
}
function qE(a) {
  const e = Tt.c(40), {
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
  } = y, w = l + S + b, j = p + v + T, M = Math.max(0, w - S - b), D = Math.min(p / 2, M / 2, 999), A = `grad-${g}`, R = `mask-${g}`, B = Math.max(S, b), U = Math.max(v, T), _ = `0 0 ${w} ${j}`;
  let H;
  e[2] !== f ? (H = [LE, f].filter(Boolean), e[2] = f, e[3] = H) : H = e[3];
  const P = H.join(" "), K = `${B}px`, it = `${U}px`;
  let at;
  e[4] !== K || e[5] !== it ? (at = {
    "--overlay-padding-x": K,
    "--overlay-padding-y": it
  }, e[4] = K, e[5] = it, e[6] = at) : at = e[6];
  let I, F;
  e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (I = /* @__PURE__ */ m.jsx("stop", {
    offset: "0%",
    stopColor: "var(--mask-color)",
    stopOpacity: "var(--mask-opacity-top)"
  }), F = /* @__PURE__ */ m.jsx("stop", {
    offset: "100%",
    stopColor: "var(--mask-color)",
    stopOpacity: "var(--mask-opacity-bottom)"
  }), e[7] = I, e[8] = F) : (I = e[7], F = e[8]);
  let et;
  e[9] !== A ? (et = /* @__PURE__ */ m.jsxs("linearGradient", {
    id: A,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1",
    children: [I, F]
  }), e[9] = A, e[10] = et) : et = e[10];
  let N;
  e[11] !== j || e[12] !== w ? (N = /* @__PURE__ */ m.jsx("rect", {
    x: "0",
    y: "0",
    width: w,
    height: j,
    fill: "var(--ui-static-white)"
  }), e[11] = j, e[12] = w, e[13] = N) : N = e[13];
  let V;
  e[14] !== p || e[15] !== M || e[16] !== S || e[17] !== D || e[18] !== v ? (V = /* @__PURE__ */ m.jsx("rect", {
    x: S,
    y: v,
    width: M,
    height: p,
    rx: D,
    ry: D,
    fill: "var(--ui-static-black)"
  }), e[14] = p, e[15] = M, e[16] = S, e[17] = D, e[18] = v, e[19] = V) : V = e[19];
  let Z;
  e[20] !== R || e[21] !== N || e[22] !== V ? (Z = /* @__PURE__ */ m.jsxs("mask", {
    id: R,
    maskUnits: "userSpaceOnUse",
    children: [N, V]
  }), e[20] = R, e[21] = N, e[22] = V, e[23] = Z) : Z = e[23];
  let nt;
  e[24] !== et || e[25] !== Z ? (nt = /* @__PURE__ */ m.jsxs("defs", {
    children: [et, Z]
  }), e[24] = et, e[25] = Z, e[26] = nt) : nt = e[26];
  const st = `url(#${A})`, O = `url(#${R})`;
  let Y;
  e[27] !== j || e[28] !== w || e[29] !== st || e[30] !== O ? (Y = /* @__PURE__ */ m.jsx("rect", {
    width: w,
    height: j,
    fill: st,
    mask: O
  }), e[27] = j, e[28] = w, e[29] = st, e[30] = O, e[31] = Y) : Y = e[31];
  let tt;
  return e[32] !== j || e[33] !== w || e[34] !== nt || e[35] !== Y || e[36] !== _ || e[37] !== P || e[38] !== at ? (tt = /* @__PURE__ */ m.jsxs("svg", {
    width: w,
    height: j,
    viewBox: _,
    preserveAspectRatio: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: P,
    style: at,
    "aria-hidden": !0,
    children: [nt, Y]
  }), e[32] = j, e[33] = w, e[34] = nt, e[35] = Y, e[36] = _, e[37] = P, e[38] = at, e[39] = tt) : tt = e[39], tt;
}
const $E = (a) => {
  const e = Tt.c(24), {
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
  e[9] !== p.clipPath ? (S = {
    default: T,
    clipPath: p.clipPath
  }, e[9] = p.clipPath, e[10] = S) : S = e[10];
  let w;
  if (e[11] !== s || e[12] !== r || e[13] !== l) {
    let M;
    e[15] !== s || e[16] !== r ? (M = (D, A) => /* @__PURE__ */ m.jsx(Xb, {
      isActive: A === s,
      onClick: () => r(A),
      "data-overlay": !0,
      ...D
    }, A), e[15] = s, e[16] = r, e[17] = M) : M = e[17], w = l.map(M), e[11] = s, e[12] = r, e[13] = l, e[14] = w;
  } else
    w = e[14];
  let j;
  return e[18] !== g || e[19] !== h || e[20] !== b || e[21] !== S || e[22] !== w ? (j = /* @__PURE__ */ m.jsx(el, {
    className: BE,
    ref: h,
    ...g,
    initial: v,
    animate: b,
    transition: S,
    children: w
  }), e[18] = g, e[19] = h, e[20] = b, e[21] = S, e[22] = w, e[23] = j) : j = e[23], j;
}, GE = (a) => {
  const e = Tt.c(43), {
    tabs: l,
    onChange: s,
    defaultIndex: r
  } = a, c = r === void 0 ? 0 : r, {
    isApple: f
  } = Ms(), [h, y] = E.useState(c);
  let p, g;
  e[0] !== c ? (p = () => {
    y(c);
  }, g = [c], e[0] = c, e[1] = p, e[2] = g) : (p = e[1], g = e[2]), E.useEffect(p, g);
  let v, b;
  e[3] !== l.length ? (v = () => {
    y((nt) => Math.min(nt, l.length - 1));
  }, b = [l.length], e[3] = l.length, e[4] = v, e[5] = b) : (v = e[4], b = e[5]), E.useEffect(v, b);
  let T;
  e[6] !== h || e[7] !== s ? (T = (nt) => {
    nt !== h && (y(nt), s?.(nt));
  }, e[6] = h, e[7] = s, e[8] = T) : T = e[8];
  const S = T, w = E.useRef(null), [j, M] = E.useState(0);
  let D;
  e[9] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (D = (nt) => {
    M(nt.contentRect.width);
  }, e[9] = D) : D = e[9], Z8(w, D);
  const A = l.length === 3 ? 54 : 21;
  let R;
  e[10] !== f || e[11] !== A ? (R = f ? {
    left: A,
    right: A,
    width: `calc(100% - ${A * 2}px)`
  } : {}, e[10] = f, e[11] = A, e[12] = R) : R = e[12];
  const B = R;
  let U;
  e[13] !== A ? (U = {
    top: 21,
    bottom: 21,
    left: A,
    right: A
  }, e[13] = A, e[14] = U) : U = e[14];
  const _ = U;
  let H, P;
  e[15] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (H = {
    scale: 1.02
  }, P = {
    scale: {
      type: "spring",
      stiffness: 800,
      damping: 40
    }
  }, e[15] = H, e[16] = P) : (H = e[15], P = e[16]);
  let K;
  e[17] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (K = {
    display: "flex",
    width: "100%",
    position: "relative",
    zIndex: 1
  }, e[17] = K) : K = e[17];
  let it;
  if (e[18] !== h || e[19] !== S || e[20] !== l) {
    let nt;
    e[22] !== h || e[23] !== S ? (nt = (st, O) => /* @__PURE__ */ m.jsx(Xb, {
      isActive: O === h,
      onClick: () => S(O),
      ...st
    }, O), e[22] = h, e[23] = S, e[24] = nt) : nt = e[24], it = l.map(nt), e[18] = h, e[19] = S, e[20] = l, e[21] = it;
  } else
    it = e[21];
  let at;
  e[25] !== it ? (at = /* @__PURE__ */ m.jsx("div", {
    style: K,
    children: it
  }), e[25] = it, e[26] = at) : at = e[26];
  let I;
  e[27] !== h || e[28] !== S || e[29] !== l ? (I = /* @__PURE__ */ m.jsx($E, {
    tabs: l,
    activeIndex: h,
    onChange: S
  }), e[27] = h, e[28] = S, e[29] = l, e[30] = I) : I = e[30];
  const F = f ? "visible" : "hidden";
  let et;
  e[31] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (et = /* @__PURE__ */ m.jsx(Ss, {}), e[31] = et) : et = e[31];
  let N;
  e[32] !== _ || e[33] !== j ? (N = /* @__PURE__ */ m.jsx(qE, {
    width: j,
    height: 64,
    insets: _
  }), e[32] = _, e[33] = j, e[34] = N) : N = e[34];
  let V;
  e[35] !== F || e[36] !== N ? (V = /* @__PURE__ */ m.jsxs(E.Activity, {
    mode: F,
    children: [et, N]
  }), e[35] = F, e[36] = N, e[37] = V) : V = e[37];
  let Z;
  return e[38] !== B || e[39] !== at || e[40] !== I || e[41] !== V ? (Z = /* @__PURE__ */ m.jsxs(el, {
    ref: w,
    className: zE,
    whileTap: H,
    transition: P,
    style: B,
    layout: !0,
    children: [at, I, V]
  }), e[38] = B, e[39] = at, e[40] = I, e[41] = V, e[42] = Z) : Z = e[42], Z;
}, kh = "_badge_dqs9c_1", Pb = "_filled_dqs9c_19", Kb = "_tinted_dqs9c_24", Zb = "_gray_dqs9c_29", Qb = "_media_dqs9c_34", Fb = "_outlined_dqs9c_39", YE = {
  badge: kh,
  filled: Pb,
  tinted: Kb,
  gray: Zb,
  media: Qb,
  outlined: Fb
}, XE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  badge: kh,
  default: YE,
  filled: Pb,
  gray: Zb,
  media: Qb,
  outlined: Fb,
  tinted: Kb
}, Symbol.toStringTag, { value: "Module" })), PE = (a) => {
  const e = Tt.c(35);
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
  let j;
  e[13] !== S || e[14] !== w ? (j = {
    ...S,
    ...w
  }, e[13] = S, e[14] = w, e[15] = j) : j = e[15];
  const M = j, D = r?.background || r?.backgroundColor || null;
  let A = r;
  if (g === "filled") {
    const U = D || "var(--tg-theme-button-color)";
    let _;
    e[16] !== r ? (_ = r?.color && {
      "--badge-text-color": r.color
    }, e[16] = r, e[17] = _) : _ = e[17];
    let H;
    e[18] !== r || e[19] !== U || e[20] !== _ ? (H = {
      ...r,
      "--badge-background": U,
      ..._
    }, e[18] = r, e[19] = U, e[20] = _, e[21] = H) : H = e[21], A = H;
  } else if (g === "tinted") {
    const U = r.color || D || "var(--tg-theme-button-color)";
    let _;
    e[22] !== r.color ? (_ = r?.color && {
      "--badge-text-color": r.color
    }, e[22] = r.color, e[23] = _) : _ = e[23];
    let H;
    e[24] !== r || e[25] !== _ || e[26] !== U ? (H = {
      ...r,
      "--badge-background": U,
      ..._
    }, e[24] = r, e[25] = _, e[26] = U, e[27] = H) : H = e[27], A = H;
  }
  const R = `${kh} ${XE[g]} ${s || ""}`;
  let B;
  return e[28] !== A || e[29] !== l || e[30] !== M || e[31] !== R || e[32] !== p || e[33] !== v ? (B = /* @__PURE__ */ m.jsx(lt, {
    variant: v,
    className: R,
    style: A,
    ...M,
    ...p,
    children: l
  }), e[28] = A, e[29] = l, e[30] = M, e[31] = R, e[32] = p, e[33] = v, e[34] = B) : B = e[34], B;
};
qr["tooltip-surface"];
const ol = (a) => {
  const e = Tt.c(2), {
    children: l
  } = a;
  let s;
  return e[0] !== l ? (s = /* @__PURE__ */ m.jsx(eE, {
    children: /* @__PURE__ */ m.jsx(kC, {
      children: /* @__PURE__ */ m.jsx(I8, {
        children: /* @__PURE__ */ m.jsx(Yb, {
          children: l
        })
      })
    })
  }), e[0] = l, e[1] = s) : s = e[1], s;
}, KE = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/home" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M11.2921 3.10288C11.7572 2.98914 12.243 2.98915 12.7081 3.10288C13.2396 3.23288 13.709 3.55457 14.2432 3.92027L19.2442 7.33335C19.6706 7.62361 20.0467 7.87916 20.3282 8.22788C20.5749 8.53357 20.7603 8.88486 20.8731 9.26206C21.0018 9.69232 21.0007 10.1491 21.0001 10.6673V16.9613C21.0001 17.4921 21.0004 17.9503 20.9698 18.3275C20.9375 18.7256 20.8656 19.1213 20.6729 19.5023C20.3853 20.0709 19.9269 20.5339 19.3624 20.8236C18.9841 21.0177 18.5907 21.0889 18.1954 21.1214C17.8209 21.1523 17.366 21.1527 16.8389 21.1527H7.16121C6.63427 21.1527 6.17922 21.1523 5.80476 21.1214C5.40975 21.0889 5.01682 21.0175 4.63875 20.8236C4.07426 20.5339 3.61484 20.0709 3.32722 19.5023C3.13458 19.1213 3.06265 18.7255 3.03035 18.3275C2.99975 17.9503 3.00006 17.4921 3.00008 16.9613V10.6673C2.99948 10.1491 2.99933 9.69232 3.12801 9.26206C3.24091 8.8848 3.42612 8.53359 3.67293 8.22788C3.95441 7.87922 4.32962 7.62355 4.75593 7.33335L9.75691 3.92027C10.2911 3.55462 10.7606 3.23292 11.2921 3.10288ZM10.5001 12.0882C9.94779 12.0882 9.50008 12.5359 9.50008 13.0882V16.1244C9.50008 16.6767 9.94779 17.1244 10.5001 17.1244H13.5001C14.0524 17.1244 14.5001 16.6767 14.5001 16.1244V13.0882C14.5001 12.5359 14.0524 12.0882 13.5001 12.0882H10.5001Z", fill: "currentColor" }))), ZE = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/calendar" }, /* @__PURE__ */ E.createElement("path", { id: "Union", d: "M19.6748 10.7998C19.9782 10.7998 20.1303 10.7997 20.2441 10.8633C20.3246 10.9083 20.3915 10.9752 20.4365 11.0557C20.5001 11.1695 20.5 11.3216 20.5 11.625V13.9004C20.5 16.329 20.5 17.5435 19.9902 18.4541C19.6298 19.0977 19.0977 19.6298 18.4541 19.9902C17.5435 20.5 16.329 20.5 13.9004 20.5H10.0996C7.67103 20.5 6.4565 20.5 5.5459 19.9902C4.90227 19.6298 4.37022 19.0977 4.00977 18.4541C3.5 17.5435 3.5 16.329 3.5 13.9004V11.625C3.5 11.3216 3.49986 11.1695 3.56348 11.0557C3.60853 10.9752 3.67541 10.9083 3.75586 10.8633C3.86967 10.7997 4.02177 10.7998 4.3252 10.7998H19.6748ZM16 1.5C16.5523 1.5 17 1.94772 17 2.5V3.58984C17.5949 3.66023 18.0539 3.78571 18.4541 4.00977C19.0977 4.37022 19.6298 4.90227 19.9902 5.5459C20.3615 6.20916 20.4605 7.03367 20.4873 8.37109C20.4933 8.67145 20.4965 8.8223 20.4336 8.93848C20.3896 9.01965 20.3215 9.08906 20.2412 9.13477C20.1263 9.20009 19.9733 9.2002 19.668 9.2002H4.33203C4.02672 9.2002 3.87368 9.20009 3.75879 9.13477C3.67854 9.08906 3.61044 9.01965 3.56641 8.93848C3.50351 8.8223 3.50669 8.67145 3.5127 8.37109C3.53947 7.03367 3.63847 6.20916 4.00977 5.5459C4.37022 4.90227 4.90227 4.37022 5.5459 4.00977C5.94613 3.78571 6.40508 3.66023 7 3.58984V2.5C7 1.94772 7.44772 1.5 8 1.5C8.55228 1.5 9 1.94772 9 2.5V3.50488C9.33664 3.50264 9.70183 3.5 10.0996 3.5H13.9004C14.2982 3.5 14.6634 3.50264 15 3.50488V2.5C15 1.94772 15.4477 1.5 16 1.5Z", fill: "#3D3C3A" }))), $r = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "#3D3C3A" }), /* @__PURE__ */ E.createElement("path", { id: "Vector 234255039", d: "M9 12.439L11.1818 14.8564L13.0909 11.8347L14.0455 10.3238L14.5227 9.56836", stroke: "white", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }))), Ad = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "#3D3C3A" }), /* @__PURE__ */ E.createElement("path", { id: "Vector 234255931", d: "M12 12.5V8", stroke: "white", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ E.createElement("circle", { id: "Ellipse 253668", cx: 1, cy: 1, r: 1, transform: "matrix(1 0 0 -1 11 17)", fill: "white" }))), QE = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/heart" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", fillRule: "evenodd", clipRule: "evenodd", d: "M12 6.34213C13.1016 4.86137 14.8294 3.86287 16.9203 4.05233C19.9439 4.3263 22.0001 6.73448 22.0001 9.87524C22.0001 12.7458 20.4285 15.1633 18.5183 16.9571C16.6026 18.756 14.2269 20.0464 12.319 20.6691C12.1117 20.7368 11.8884 20.7368 11.6811 20.6691C9.77325 20.0464 7.39752 18.756 5.48179 16.9571C3.57156 15.1633 2 12.7458 2 9.87524C2 6.73448 4.05617 4.3263 7.07975 4.05233C9.17073 3.86287 10.8984 4.86142 12 6.34213Z", fill: "currentColor" }))), FE = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/cup" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", fillRule: "evenodd", clipRule: "evenodd", d: "M12.9992 3.02148C17.9698 3.02148 21.9992 5.27629 21.9992 8.05772C21.9992 12.0867 20.9992 21.1519 12.9992 21.1519C9.14215 21.1518 6.91501 19.043 5.63991 16.4088L4.98464 16.5417C2.90427 16.9606 0.88686 15.5799 0.507098 13.4776C0.136993 11.4266 1.46695 9.45421 3.49635 9.04529L4.01491 8.94004C4.0039 8.6258 3.99928 8.33024 3.99928 8.05772C3.99928 5.27633 8.02884 3.02156 12.9992 3.02148ZM3.88796 11.0204C2.92844 11.2139 2.30006 12.1467 2.47487 13.1166C2.65441 14.111 3.60814 14.7636 4.59206 14.5654L4.89284 14.5045C4.52286 13.3122 4.29975 12.0906 4.16823 10.9634L3.88796 11.0204ZM12.9992 5.03598C9.13341 5.03604 5.99928 6.38889 5.99928 8.05772C5.99928 9.72654 9.13341 11.0794 12.9992 11.0795C16.8652 11.0795 19.9992 9.72657 19.9992 8.05772C19.9992 6.38886 16.8652 5.03598 12.9992 5.03598Z", fill: "currentColor" }))), JE = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ E.createElement("path", { id: "Vector 234255937", d: "M3.52765 9.90413C0.911528 15.9537 3.96635 21.1957 8.35342 22.5511C8.84167 22.702 9.19067 22.0789 8.92321 21.6434C8.19965 20.4654 7.47887 18.5753 8.56051 16.6478C8.64224 16.5022 8.85072 16.5146 8.93197 16.6605C9.95802 18.5031 10.9317 18.5031 10.9317 18.5031C10.9317 18.5031 8.86679 14.8896 11.7788 12.1893C11.8911 12.0851 12.0723 12.1349 12.1315 12.2762C13.3539 15.1909 17.8248 17.3143 14.8582 21.9344C14.6119 22.3181 14.8717 22.8388 15.3226 22.7712C20.4424 22.0038 22.208 16.0069 20.1757 11.4342C18.0862 6.73288 13.4876 7.04975 11.6828 2.26117C11.5637 1.9453 11.198 1.78379 10.9122 1.96333C7.99596 3.79495 6.34996 7.94875 7.37329 13.0655C6.01592 12.7262 5.08207 11.1162 4.57178 9.95361C4.37654 9.50881 3.72046 9.45827 3.52765 9.90413Z", fill: "currentColor" }))), Jb = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/cross" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M16.2929 6.06242C16.6834 5.6719 17.3164 5.67191 17.707 6.06242C18.0975 6.45295 18.0975 7.08596 17.707 7.47649L13.414 11.7695L17.707 16.0624C18.0975 16.4529 18.0975 17.086 17.707 17.4765C17.3164 17.867 16.6834 17.867 16.2929 17.4765L11.9999 13.1835L7.70696 17.4765C7.31643 17.867 6.68342 17.867 6.29289 17.4765C5.90238 17.086 5.90237 16.4529 6.29289 16.0624L10.5859 11.7695L6.29289 7.47649C5.90237 7.08596 5.90237 6.45295 6.29289 6.06242C6.68342 5.6719 7.31643 5.6719 7.70696 6.06242L11.9999 10.3554L16.2929 6.06242Z", fill: "#3D3C3A" }))), Wb = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "currentColor" }), /* @__PURE__ */ E.createElement("path", { id: "Vector 234255931", d: "M12 12V16", stroke: "var(--background)", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ E.createElement("circle", { id: "Ellipse 253668", cx: 12, cy: 8.5, r: 1, fill: "var(--background)" }))), Gr = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("g", { id: "24_icon-fill/plus" }, /* @__PURE__ */ E.createElement("path", { id: "Vector", transform: "translate(5 4.769)", d: "M6 13C6 13 6 8 6 8C6 8 1 8 1 8C0.448 8 0 7.552 0 7C0 6.448 0.448 6 1 6C1 6 6 6 6 6C6 6 6 1 6 1C6 0.448 6.448 0 7 0C7.552 0 8 0.448 8 1C8 1 8 6 8 6C8 6 13 6 13 6C13.552 6 14 6.448 14 7C14 7.552 13.552 8 13 8C13 8 8 8 8 8C8 8 8 13 8 13C8 13.552 7.552 14 7 14C6.448 14 6 13.552 6 13Z", fill: "currentColor" }))), WE = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("path", { d: "M16.5791 4.53223C18.0851 4.53223 18.8049 4.65337 19.5361 5.04297C20.1593 5.3751 20.654 5.86826 20.9873 6.48926C21.3783 7.21793 21.5 7.93502 21.5 9.43555V14.7383C21.5 16.2388 21.3783 16.9559 20.9873 17.6846C20.654 18.3056 20.1593 18.7987 19.5361 19.1309C18.8049 19.5205 18.0851 19.6416 16.5791 19.6416H7.4209C5.91493 19.6416 5.19509 19.5205 4.46387 19.1309C3.84066 18.7987 3.34603 18.3056 3.0127 17.6846C2.62169 16.9559 2.50002 16.2388 2.5 14.7383V9.43555C2.50003 7.93502 2.62167 7.21793 3.0127 6.48926C3.34603 5.86826 3.84066 5.3751 4.46387 5.04297C5.19509 4.65337 5.91494 4.53223 7.4209 4.53223H16.5791ZM10.1436 9.44043C9.76724 8.73388 8.75424 8.73388 8.37793 9.44043L5.78223 14.3125C5.42805 14.9784 5.91082 15.7829 6.66504 15.7832H17.0791C17.8878 15.7831 18.3617 14.8726 17.8984 14.21L16.2656 11.877C15.8829 11.3303 15.0819 11.3051 14.665 11.8262L12.998 13.9092C12.8634 14.0774 12.6005 14.0532 12.499 13.8633L10.1436 9.44043Z", fill: "currentColor" })), IE = (a) => /* @__PURE__ */ E.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ E.createElement("path", { d: "M14.0996 3.5C16.3398 3.5 17.4608 3.49957 18.3164 3.93555C19.0689 4.31902 19.681 4.93109 20.0645 5.68359C20.5004 6.53924 20.5 7.66018 20.5 9.90039V14.0996C20.5 16.3398 20.5004 17.4608 20.0645 18.3164C19.681 19.0689 19.0689 19.681 18.3164 20.0645C17.4608 20.5004 16.3398 20.5 14.0996 20.5H9.90039C7.66018 20.5 6.53924 20.5004 5.68359 20.0645C4.93109 19.681 4.31902 19.0689 3.93555 18.3164C3.49957 17.4608 3.5 16.3398 3.5 14.0996V9.90039C3.5 7.66018 3.49957 6.53924 3.93555 5.68359C4.31902 4.93109 4.93109 4.31902 5.68359 3.93555C6.53924 3.49957 7.66018 3.5 9.90039 3.5H14.0996ZM9.5 8.2002C9.05817 8.2002 8.7002 8.55817 8.7002 9C8.7002 9.44183 9.05817 9.7998 9.5 9.7998H11.2002V15.5C11.2002 15.9418 11.5582 16.2998 12 16.2998C12.4418 16.2998 12.7998 15.9418 12.7998 15.5V9.7998H14.5C14.9418 9.7998 15.2998 9.44183 15.2998 9C15.2998 8.55817 14.9418 8.2002 14.5 8.2002H9.5Z", fill: "currentColor" })), tj = {
  success: $r,
  error: Ad,
  warning: Ad,
  info: Wb
};
let Or = null, Yg = !1;
const Md = [];
function ej() {
  const a = DE();
  return E.useEffect(() => (Or = a.show, Md.length && Md.splice(0).forEach((e) => a.show(e)), () => {
    Or = null;
  })), null;
}
function nj() {
  if (Yg || typeof document > "u") return;
  Yg = !0;
  const a = document.createElement("div");
  a.setAttribute("data-aiwa-toast-host", ""), document.body.appendChild(a), Gi.createRoot(a).render(
    /* @__PURE__ */ m.jsx(Yb, { children: /* @__PURE__ */ m.jsx(ej, {}) })
  );
}
function Ib(a, e = {}) {
  const l = typeof a == "string" ? { title: a, ...e } : { ...a };
  if (l.type && !l.icon) {
    const s = tj[l.type];
    s && (l.icon = /* @__PURE__ */ m.jsx(s, {}));
  }
  return nj(), Or ? Or(l) : (Md.push(l), null);
}
function aj() {
  typeof window < "u" && (window.aiwaToast = Ib);
}
const vn = (a, ...e) => {
  const l = window[a];
  typeof l == "function" && l(...e);
}, le = (a, ...e) => {
  const l = window[a];
  return typeof l == "function" ? l(...e) : null;
}, qt = (a, e = {}) => {
  const l = le("aiwaApi", a, e);
  return l && typeof l.then == "function" ? l : Promise.reject(new Error("API bridge is unavailable"));
}, Ot = (a, e = {}) => Ib(a, e), _d = (a) => `${Math.round(Number(a) || 0).toLocaleString("ru-RU")} ккал`, tx = (a) => vn("track", a), ij = () => {
  const a = window.Telegram?.WebApp;
  a?.close && a.close();
}, nl = async ({ nudge: a = !0, topic: e = "" } = {}) => {
  a && await Promise.race([
    qt("/api/nudge", e ? { topic: e } : {}).catch(() => null),
    new Promise((c) => setTimeout(c, 2e3))
  ]);
  const l = window.Telegram?.WebApp, s = le("aiwaData")?.bot_username, r = typeof l?.openTelegramLink == "function" && (typeof l.isVersionAtLeast != "function" || l.isVersionAtLeast("6.1"));
  s && r && l.openTelegramLink(`https://t.me/${s}`), ij();
}, lj = () => {
  const a = window.Telegram?.WebApp;
  return typeof a?.showPopup != "function" ? !1 : typeof a.isVersionAtLeast != "function" || a.isVersionAtLeast("6.2");
}, se = (a, e) => ({
  "aria-label": a,
  onClick: e,
  onKeyDown: (l) => {
    (l.key === "Enter" || l.key === " ") && (l.preventDefault(), e());
  },
  role: "button",
  tabIndex: 0
});
function Hh({ title: a, size: e = "regular", ...l }) {
  return e === "large" ? /* @__PURE__ */ m.jsx("div", { className: "aiwa-panel-header is-large", children: /* @__PURE__ */ m.jsx(lt, { as: "h1", variant: "title1", weight: "bold", children: a }) }) : /* @__PURE__ */ m.jsx("div", { className: "aiwa-panel-header", children: /* @__PURE__ */ m.jsx(JC, { ...l, children: a }) });
}
const Xg = (a, e = "") => [
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
function ex({
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
    !f && a.cycleDay ? /* @__PURE__ */ m.jsx("span", { className: "aiwa-date-cell-cycleday", "aria-hidden": "true", children: a.cycleDay }) : null,
    /* @__PURE__ */ m.jsx(lt, { className: "aiwa-date-cell-number", variant: "body", weight: "regular", children: a.date }),
    f ? /* @__PURE__ */ m.jsx(
      "span",
      {
        className: `aiwa-date-cell-radio${p ? " is-heart" : ""}${h ? " is-checked" : ""}`,
        "aria-hidden": "true",
        children: p ? /* @__PURE__ */ m.jsx(QE, {}) : h ? /* @__PURE__ */ m.jsx($r, {}) : null
      }
    ) : null,
    !f && a.phase && !a.actualPeriod && !a.predictedPeriod ? /* @__PURE__ */ m.jsx("span", { className: "aiwa-date-cell-dot", "aria-hidden": "true" }) : null,
    !f && a.intimacy ? /* @__PURE__ */ m.jsx("span", { className: "aiwa-date-cell-heart", "aria-hidden": "true", children: "♥" }) : null,
    s && a.today && !f ? /* @__PURE__ */ m.jsx(lt, { className: "aiwa-date-cell-today", variant: "caption1", weight: "regular", children: "Сегодня" }) : null
  ] });
  if (!e)
    return /* @__PURE__ */ m.jsx("div", { className: Xg(v, g), "data-iso": a.iso, "aria-label": `${a.label || "День"}, ${a.date}`, children: b });
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
      className: Xg(v, ["aiwa-calendar-day", g].filter(Boolean).join(" ")),
      "data-iso": a.iso,
      onClick: () => c ? c(a) : vn("aiwaCalendarDay", a.iso),
      children: b
    }
  );
}
function nx(a, ...e) {
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
const sj = 140;
function Pg(a, e) {
  const l = a.scrollWidth - a.clientWidth, s = e.offsetLeft - (a.clientWidth - e.offsetWidth) / 2;
  return Math.min(l, Math.max(0, s));
}
function oj(a) {
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
function qh({ days: a, selectedIso: e = "", onSelect: l = null }) {
  const s = typeof l == "function", r = E.useRef(null), c = E.useRef(null);
  c.current = { days: a, selectedIso: e, onSelect: l };
  const f = E.useRef("");
  return nx(r, a?.length), E.useLayoutEffect(() => {
    const h = r.current;
    if (!h) return;
    const y = f.current;
    if (f.current = "", y && y === e || h.scrollWidth - h.clientWidth <= 0) return;
    const g = h.querySelector(e ? `[data-iso="${e}"]` : ".is-today");
    g && (h.scrollLeft = Pg(h, g));
  }, [e, a?.length]), E.useEffect(() => {
    const h = r.current;
    if (!h || !s) return;
    let y = 0, p = !1, g = !1;
    const v = () => {
      if (y = 0, p || !g) return;
      g = !1;
      const M = oj(h);
      if (!M) return;
      const { days: D, selectedIso: A, onSelect: R } = c.current, B = D?.find((_) => _.iso === M.dataset.iso);
      if (!B) return;
      B.iso !== A && (f.current = B.iso, R(B));
      const U = Pg(h, M);
      if (Math.abs(U - h.scrollLeft) > 0.5) {
        const _ = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        h.scrollTo({ left: U, behavior: _ ? "auto" : "smooth" });
      }
    }, b = () => {
      y && clearTimeout(y), y = setTimeout(v, sj);
    }, T = () => {
      p && (g = !0), b();
    }, S = () => {
      p = !0;
    }, w = () => {
      p = !1, b();
    }, j = () => {
      g = !0;
    };
    return h.addEventListener("scroll", T, { passive: !0 }), h.addEventListener("touchstart", S, { passive: !0 }), h.addEventListener("touchend", w, { passive: !0 }), h.addEventListener("touchcancel", w, { passive: !0 }), h.addEventListener("wheel", j, { passive: !0 }), () => {
      y && clearTimeout(y), h.removeEventListener("scroll", T), h.removeEventListener("touchstart", S), h.removeEventListener("touchend", w), h.removeEventListener("touchcancel", w), h.removeEventListener("wheel", j);
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
        ex,
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
const Yr = [
  ["Боль", [["cramps", "Спазмы"], ["head", "Голова"], ["breast", "Грудь"]]],
  ["Настроение", [["irrit", "Раздражительность"], ["anx", "Тревога"], ["low", "Апатия"]]],
  ["Тело", [["tired", "Усталость"], ["bloat", "Вздутие"], ["sweet", "Тянет на сладкое"]]],
  ["Кожа и сон", [["skin", "Высыпания"], ["insomnia", "Плохой сон"]]]
], Dd = {
  // One line each at the bar width: a wrapped hint pushes the bar over the grid.
  period: { label: "Месячные", hint: "нажми на день, чтобы отметить месячные", checked: (a) => a.actualPeriod },
  symptoms: { label: "Симптомы", hint: "нажми на день, чтобы записать симптомы", checked: (a) => a.logged },
  intimacy: { label: "Близость", hint: "нажми на день, чтобы отметить близость", checked: (a) => a.intimacy }
}, rj = (a) => a.map((e) => ({ value: e, label: Dd[e].label })), uj = [
  { label: "Месячные", variant: "tinted", token: "--aiwa-phase-menstrual" },
  { label: "Прогноз", variant: "outlined", token: "--aiwa-phase-menstrual" },
  { label: "Овуляция", variant: "tinted", token: "--aiwa-phase-ovulation" },
  { label: "Фолликулярная", variant: "tinted", token: "--aiwa-phase-follicular" },
  { label: "Лютеиновая", variant: "tinted", token: "--aiwa-phase-luteal" },
  { label: "Близость", variant: "tinted", token: "--aiwa-intimacy" }
], ax = [[1, "Низкая"], [2, "Средняя"], [3, "Высокая"]], ix = [[1, "Плохое"], [2, "Нормальное"], [3, "Хорошее"]], cj = "/assets/paper-food-placeholder.png", lx = [
  { value: "breakfast", label: "Завтрак" },
  { value: "lunch", label: "Обед" },
  { value: "snack", label: "Перекус" },
  { value: "dinner", label: "Ужин" }
], fj = (a) => ({
  title: a?.title || "",
  kcal: String(a?.kcal ?? ""),
  grams: String(a?.grams ?? ""),
  protein: String(a?.protein ?? ""),
  fat: String(a?.fat ?? ""),
  carbs: String(a?.carbs ?? ""),
  slot: a?.slot || "snack"
}), dj = ["Силовая", "Кардио", "Йога", "Ходьба", "Плавание", "Своё"], Za = {
  Ноги: ["Присед", "Жим ногами", "Выпады", "Болгарские", "Румынская тяга", "Разгибания", "Сгибания", "Икры"],
  Спина: ["Вертикальная тяга", "Горизонтальная тяга", "Тяга в наклоне", "Становая", "Подтягивания", "Гиперэкстензия"],
  Грудь: ["Жим лёжа", "Жим гантелей", "Жим в наклоне", "Сведения", "Отжимания"],
  Плечи: ["Жим стоя", "Махи в стороны", "Махи в наклоне", "Протяжка"],
  Ягодицы: ["Ягодичный мост", "Отведение бедра", "Мах ногой", "Плие-присед"],
  Руки: ["Бицепс", "Молоток", "Разгибания трицепс", "Французский жим"],
  Кор: ["Планка", "Скручивания", "Подъём ног", "Русский твист"]
}, hj = {
  Силовая: [],
  Кардио: ["Бег", "Велотренажёр", "Эллипс", "Гребля", "Скакалка"],
  Йога: ["Виньяса", "Хатха", "Растяжка", "Пилатес", "Дыхание"],
  Ходьба: ["Прогулка", "Скандинавская", "Быстрая ходьба"],
  Плавание: ["Кроль", "Брасс", "На спине"],
  Своё: []
}, mj = [
  { value: "cycle", label: "Регулярный цикл" },
  { value: "irregular", label: "Нерегулярный" },
  { value: "preg", label: "Беременность" },
  { value: "meno", label: "Менопауза" },
  { value: "none", label: "Нет месячных" },
  { value: "male", label: "Мужской режим" }
], Kg = "custom:";
function pj(a) {
  const e = a?.length ? a.flatMap(([, l]) => l) : Yr.flatMap(([, l]) => l.flat());
  return new Map(e);
}
function yj({ title: a = "Сегодня", checkin: e, symptomGroups: l, onSelect: s }) {
  const r = e?.symptoms ?? [], c = E.useRef(null);
  if (nx(c, r.length), !r.length) return null;
  const f = pj(l), h = s ?? (() => vn("openHomePanel", "journal"));
  return /* @__PURE__ */ m.jsxs("div", { className: "aiwa-today", children: [
    /* @__PURE__ */ m.jsx(lt, { className: "aiwa-today-title", variant: "body", weight: "semibold", children: a }),
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-today-chips", role: "group", "aria-label": a, ref: c, children: r.map((y) => {
      const p = y.startsWith(Kg) ? y.slice(Kg.length) : f.get(y) ?? y;
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
const Zg = 1e3 / 40, gj = 5e3, sx = (a, e) => Array.from(
  { length: e },
  (l, s) => `/assets/${a}/frame-${String(s).padStart(3, "0")}.png`
), vj = sx("aiwa-sequence", 182), $h = sx("aiwa-card-sequence", 193), $f = /* @__PURE__ */ new Map(), bj = (a) => ($f.has(a) || $f.set(
  a,
  Promise.all(a.map((e) => new Promise((l) => {
    const s = new Image();
    s.onload = l, s.onerror = l, s.src = e;
  })))
), $f.get(a));
function Gh({ size: a, frames: e = vj, pauseMs: l = gj }) {
  return /* @__PURE__ */ m.jsx(
    "span",
    {
      className: "aiwa-sequence",
      style: { "--aiwa-sequence-size": `${a}px` },
      "data-aiwa-sequence": "true",
      "data-sequence": e === $h ? "card" : "default",
      "data-pause-ms": l,
      "data-frame": 0,
      "aria-hidden": "true",
      children: /* @__PURE__ */ m.jsx("img", { src: e[0], alt: "", draggable: "false", decoding: "sync" })
    }
  );
}
function xj() {
  return /* @__PURE__ */ m.jsxs("div", { className: "aiwa-paper-ai-heading", children: [
    /* @__PURE__ */ m.jsx(Gh, { size: 58, frames: $h, pauseMs: 0 }),
    /* @__PURE__ */ m.jsx("div", { children: /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "semibold", children: "Айва AI" }) })
  ] });
}
function Sj(a) {
  return /* @__PURE__ */ m.jsx(Kn, { ...a, "data-aiwa-cell": "true" });
}
const pt = Object.assign(Sj, {
  Start: Kn.Start,
  End: Kn.End,
  Part: Kn.Part,
  Text: Kn.Text,
  Editable: Kn.Editable,
  Switch: Kn.Switch
});
function ws({
  message: a,
  detail: e,
  onDiscuss: l,
  chip: s = "",
  className: r = ""
}) {
  return /* @__PURE__ */ m.jsx(yt.Item, { className: `aiwa-insight-section ${r}`.trim(), children: /* @__PURE__ */ m.jsx(pt, { "data-aiwa-insight-cell": "true", tappable: !1, children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-insight-content", children: [
    /* @__PURE__ */ m.jsx(xj, {}),
    s ? /* @__PURE__ */ m.jsx("span", { className: "aiwa-insight-chip", children: s }) : null,
    /* @__PURE__ */ m.jsx(lt, { className: "aiwa-insight-message", variant: "body", weight: "regular", children: a }),
    e ? /* @__PURE__ */ m.jsx(lt, { className: "aiwa-insight-detail", variant: "body", weight: "regular", children: e }) : null,
    l ? /* @__PURE__ */ m.jsx(
      Wt,
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
function wj({ aiText: a, aiChip: e = "" }) {
  return /* @__PURE__ */ m.jsx(
    ws,
    {
      message: a,
      chip: e,
      onDiscuss: () => nl()
    }
  );
}
function Tj({ delay: a }) {
  return a ? /* @__PURE__ */ m.jsxs(yt.Item, { header: a.title, children: [
    /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsx(pt.Text, { title: a.message, description: a.hint }) }),
    a.canSwitchToPregnancy ? /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ m.jsx(
      Wt,
      {
        variant: "filled",
        label: "Перейти в режим беременности",
        isFill: !0,
        ...se("Перейти в режим беременности", () => vn("switchPreg"))
      }
    ) }) }) : null
  ] }) : null;
}
function Cj({ ok: a }) {
  const e = a ? $r : Ad;
  return /* @__PURE__ */ m.jsx("span", { className: a ? "aiwa-status is-ok" : "aiwa-status is-alert", "aria-label": a ? "В пределах нормы" : "Требует внимания", children: /* @__PURE__ */ m.jsx(e, {}) });
}
function Ej({ label: a, value: e, ok: l }) {
  return /* @__PURE__ */ m.jsx(pt, { "data-aiwa-metric-cell": "true", tappable: !1, end: /* @__PURE__ */ m.jsx(Cj, { ok: l }), children: /* @__PURE__ */ m.jsx(pt.Text, { title: a, description: e }) });
}
function jj({ metrics: a, title: e = "Статистика" }) {
  return a?.length ? /* @__PURE__ */ m.jsx(yt.Item, { header: e, children: a.map((l) => /* @__PURE__ */ m.jsx(Ej, { ...l }, l.label)) }) : null;
}
const Aj = E.lazy(() => import("./AiwaWebUiChart-aiwa-v162.js").then((a) => ({
  default: a.AiwaWebUiChart
})));
function Mj() {
  return /* @__PURE__ */ m.jsx("div", { className: "aiwa-area-chart-state is-loading", role: "status", "aria-label": "График загружается", children: /* @__PURE__ */ m.jsx("span", { className: "aiwa-area-chart-skeleton", "aria-hidden": "true" }) });
}
function _j({
  data: a,
  series: e,
  xKey: l,
  band: s = null,
  loading: r = !1,
  title: c = "Динамика цикла",
  emptyText: f = "Добавь ещё один завершённый цикл — здесь появится график."
}) {
  return /* @__PURE__ */ m.jsx(yt.Item, { header: c, children: /* @__PURE__ */ m.jsx(E.Suspense, { fallback: /* @__PURE__ */ m.jsx(Mj, {}), children: /* @__PURE__ */ m.jsx(
    Aj,
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
function Dj({
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
const Rj = Object.fromEntries(
  Yr.flatMap(([, a]) => a)
), Nj = { 1: "низкая энергия", 2: "средняя энергия", 3: "высокая энергия" }, Oj = { 1: "плохое настроение", 2: "нормальное настроение", 3: "хорошее настроение" }, zj = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }), Lj = (a) => {
  const l = Rj[a] || String(a).split(":").pop().replace(/_/g, " ").trim();
  return l ? l[0].toUpperCase() + l.slice(1) : "";
}, Bj = (a) => [
  ...(a.symptoms || []).map(Lj),
  Nj[a.energy],
  Oj[a.mood]
].filter(Boolean).map((l) => l[0].toUpperCase() + l.slice(1)).join(" • ") || "Без деталей", Vj = (a) => {
  const e = /* @__PURE__ */ new Date(`${a}T12:00:00`);
  return Number.isNaN(e.getTime()) ? a : zj.format(e);
};
function Uj() {
  const [a, e] = E.useState(null), [l, s] = E.useState(!1), [r, c] = E.useState(!1);
  E.useEffect(() => {
    qt("/api/log_history", {}).then((y) => e(y?.items || [])).catch(() => e([]));
  }, []);
  const f = async () => {
    if (!r) {
      c(!0);
      try {
        const y = await qt("/api/report", { period: "all" }).catch(() => null);
        y?.ok ? Ot("Выписка отправлена в чат бота", { type: "success" }) : Ot(y?.text || "Выписка временно недоступна", { type: "error" });
      } finally {
        c(!1);
      }
    }
  };
  if (!a) return null;
  const h = l ? a : a.slice(0, 3);
  return /* @__PURE__ */ m.jsxs(yt.Item, { header: "Журнал симптомов", children: [
    h.length ? h.map((y) => /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsx(pt.Text, { title: Vj(y.d), description: Bj(y) }) }, y.d)) : /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsx(pt.Text, { title: "Записей пока нет", description: "Отмечай самочувствие в журнале — здесь появится история." }) }),
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
      Wt,
      {
        variant: "filled",
        label: r ? "Собираю…" : "Сформировать выписку",
        isFill: !0,
        disabled: r,
        ...se("Сформировать выписку", f)
      }
    ) }) })
  ] });
}
const Gf = {
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
}, kj = (a) => {
  let e = Math.min(Math.max(Math.round(a) || 4, 4), 40);
  for (; e > 4 && !Gf[e]; ) e -= 1;
  return { week: e, name: Gf[e][0], size: Gf[e][1] };
};
function Hj({ pregnancy: a }) {
  const [e, l] = E.useState({});
  E.useEffect(() => {
    fetch("/assets/preg/manifest.json?v=1").then((h) => h.ok ? h.json() : {}).then((h) => l(h || {})).catch(() => {
    });
  }, []);
  const s = Math.min(Math.max(Number(a?.week) || 4, 1), 40), r = kj(s), c = e[String(r.week)], f = Math.min(100, Math.max(2, s / 40 * 100));
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
const Ji = [];
let Qg = !1;
const ox = () => typeof window < "u" ? window.Telegram?.WebApp?.BackButton : null, qj = () => Ji[Ji.length - 1]?.(), Fg = () => {
  const a = ox();
  a && (Ji.length ? a.show?.() : a.hide?.());
}, $j = (a) => {
  const e = ox();
  return e && !Qg && (e.onClick?.(qj), Qg = !0), Ji.push(a), Fg(), () => {
    const l = Ji.lastIndexOf(a);
    l !== -1 && Ji.splice(l, 1), Fg();
  };
};
function rx(a, e) {
  const l = E.useRef(e);
  l.current = e, E.useEffect(() => {
    if (a)
      return $j(() => l.current?.());
  }, [a]);
}
function bn({ isOpen: a, onClose: e, onBack: l, children: s, ...r }) {
  return rx(a, l || e), E.useEffect(() => {
    if (!a) return;
    const c = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.body.style.overflow = c;
    };
  }, [a]), a ? Hr.createPortal(
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-page", role: "dialog", "aria-modal": "true", ...r, children: s }),
    document.body
  ) : null;
}
function Xr({
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
      children: /* @__PURE__ */ m.jsx(Wt, { variant: e ? "tinted" : "gray", label: h, isFill: s })
    }
  );
}
function Rd({ label: a, active: e, onChange: l, variant: s = "default" }) {
  return /* @__PURE__ */ m.jsx(
    Xr,
    {
      className: `aiwa-log-toggle is-${s}-toggle`,
      label: a,
      active: e,
      isFill: !0,
      "aria-label": `${a}: ${e ? "да" : "нет"}`,
      onClick: () => l(!e),
      end: /* @__PURE__ */ m.jsx("span", { className: "aiwa-log-toggle-mark", "aria-hidden": "true", children: e ? /* @__PURE__ */ m.jsx($r, {}) : null })
    }
  );
}
function ux({ label: a, children: e }) {
  return /* @__PURE__ */ m.jsxs("div", { className: "aiwa-log-group", children: [
    /* @__PURE__ */ m.jsx(lt, { className: "aiwa-log-label", variant: "subheadline1", weight: "regular", children: a }),
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-log-choices", role: "group", "aria-label": a, children: e })
  ] });
}
function zr({ label: a, options: e, value: l, onChange: s }) {
  return /* @__PURE__ */ m.jsx(ux, { label: a, children: e.map(([r, c]) => /* @__PURE__ */ m.jsx(
    Xr,
    {
      label: c,
      active: l === r,
      onClick: () => s(r)
    },
    r
  )) });
}
function cx({ label: a, options: e, symptoms: l, onToggle: s }) {
  return /* @__PURE__ */ m.jsx(ux, { label: a, children: e.map(([r, c]) => /* @__PURE__ */ m.jsx(
    Xr,
    {
      label: c,
      active: l.includes(r),
      onClick: () => s(r)
    },
    r
  )) });
}
function ie({
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
function fx({ value: a, onChange: e }) {
  return /* @__PURE__ */ m.jsx("div", { className: "aiwa-custom-symptom", children: /* @__PURE__ */ m.jsx(
    ie,
    {
      label: "Свой симптом",
      value: a,
      onChange: e,
      placeholder: "Например, тошнота",
      maxLength: 40
    }
  ) });
}
function Gj({ isOpen: a, onClose: e, checkin: l, symptomGroups: s, mode: r }) {
  const [c, f] = E.useState(l.symptoms || []), [h, y] = E.useState(l.energy || 0), [p, g] = E.useState(l.mood || 0), [v, b] = E.useState(!!l.period), [T, S] = E.useState(!!l.intimacy), [w, j] = E.useState(""), [M, D] = E.useState(!1);
  E.useEffect(() => {
    a && (f(l.symptoms || []), y(l.energy || 0), g(l.mood || 0), b(!!l.period), S(!!l.intimacy), j(""), D(!1));
  }, [a]);
  const A = (U) => {
    f((_) => _.includes(U) ? _.filter((H) => H !== U) : [..._, U]);
  }, R = s?.length ? s : Yr, B = async () => {
    if (M) return;
    const U = l.symptoms || [], _ = w.trim();
    D(!0);
    try {
      let H = !1;
      v !== !!l.period && (await le("toggleTodayPeriod"), H = !0), h !== (l.energy || 0) && (await le("setCheckin", "energy", h), H = !0), p !== (l.mood || 0) && (await le("setCheckin", "mood", p), H = !0);
      for (const P of c.filter((K) => !U.includes(K)))
        await le("toggleSym", P);
      for (const P of U.filter((K) => !c.includes(K)))
        await le("toggleSym", P);
      T !== !!l.intimacy && await le("toggleTodayIntimacy"), _ && (await le("addCustomSym", _), H = !0), H || Ot("Сохранено", { type: "success" }), e();
    } catch (H) {
      Ot(H?.message || "Не удалось сохранить", { type: "error" });
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
        /* @__PURE__ */ m.jsx(Hh, { size: "large", title: "Занести в журнал" }),
        /* @__PURE__ */ m.jsx("div", { className: "aiwa-log-scroll", children: /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-log-sections", children: [
          r !== "preg" && r !== "meno" ? /* @__PURE__ */ m.jsx(yt.Item, { children: r === "male" ? null : /* @__PURE__ */ m.jsx(Rd, { label: "Месячные", variant: "period", active: v, onChange: b }) }) : null,
          /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(
            zr,
            {
              label: "Энергия",
              options: ax,
              value: h,
              onChange: y
            }
          ) }),
          /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(
            zr,
            {
              label: "Настроение",
              options: ix,
              value: p,
              onChange: g
            }
          ) }),
          R.map(([U, _]) => /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(cx, { label: U, options: _, symptoms: c, onToggle: A }) }, U)),
          /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(fx, { value: w, onChange: j }) }),
          /* @__PURE__ */ m.jsx(yt.Item, { children: r === "male" ? null : /* @__PURE__ */ m.jsx(Rd, { label: "Близость", active: T, onChange: S }) })
        ] }) }),
        /* @__PURE__ */ m.jsx("div", { className: "aiwa-log-footer", children: /* @__PURE__ */ m.jsx(
          Wt,
          {
            variant: "filled",
            label: M ? "Сохраняю…" : "Сохранить",
            isFill: !0,
            ...se("Сохранить", B)
          }
        ) })
      ]
    }
  );
}
function Yj({ icon: a, label: e, onClick: l, className: s = "", ...r }) {
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
const is = 8, Jg = 6;
function Xj(a, e, l) {
  const s = window.innerWidth, r = window.innerHeight;
  let c = l === "end" ? a.right - e.width : a.left;
  c = Math.min(c, s - e.width - is), c = Math.max(is, c);
  const f = a.bottom + Jg, h = a.top - Jg - e.height, y = f + e.height <= r - is, p = y || h < is ? f : h, g = y || h < is ? "top" : "bottom";
  return { top: p, left: c, originY: g };
}
function dx({ items: a, trigger: e, align: l = "start", className: s = "" }) {
  const [r, c] = E.useState(!1), [f, h] = E.useState({ top: 0, left: 0, originY: "top" }), y = E.useRef(null), p = E.useRef(null), g = E.useCallback(() => {
    c(!1);
  }, []);
  E.useLayoutEffect(() => {
    if (!r || !p.current || !y.current) return;
    const b = () => {
      const T = y.current.getBoundingClientRect(), S = { width: p.current.offsetWidth, height: p.current.offsetHeight };
      h(Xj(T, S, l));
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
    r && Hr.createPortal(
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
function Pj({ options: a, value: e, onChange: l, hint: s }) {
  return /* @__PURE__ */ m.jsxs(Th, { className: "aiwa-mark-bar", role: "group", "aria-label": "Что отмечаем", children: [
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-mark-bar-chips", children: a.map((r) => /* @__PURE__ */ m.jsx(
      Xr,
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
function Kj({ iso: a, label: e, open: l, onClose: s, symptomGroups: r, showIntimacy: c = !0 }) {
  const [f, h] = E.useState({}), [y, p] = E.useState([]), [g, v] = E.useState(0), [b, T] = E.useState(0), [S, w] = E.useState(!1), [j, M] = E.useState(""), [D, A] = E.useState(!1);
  E.useEffect(() => {
    if (!a || !l) return;
    const _ = le("getAiwaDayCheckin", a) || {};
    h(_), p(_.symptoms || []), v(_.energy || 0), T(_.mood || 0), w(!!_.intimacy), M(""), A(!1);
  }, [a, l]);
  const R = (_) => {
    p((H) => H.includes(_) ? H.filter((P) => P !== _) : [...H, _]);
  }, B = r?.length ? r : Yr, U = async () => {
    if (D) return;
    const _ = f.symptoms || [], H = j.trim();
    A(!0);
    try {
      g !== (f.energy || 0) && await le("setDayCheckin", a, "energy", g), b !== (f.mood || 0) && await le("setDayCheckin", a, "mood", b);
      for (const P of y.filter((K) => !_.includes(K)))
        await le("toggleDaySym", a, P);
      for (const P of _.filter((K) => !y.includes(K)))
        await le("toggleDaySym", a, P);
      S !== !!f.intimacy && await le("markPA", a), H ? await le("addDayCustomSym", a, H) : Ot("Сохранено", { type: "success" }), s();
    } catch (P) {
      Ot(P?.message || "Не удалось сохранить", { type: "error" });
    } finally {
      A(!1);
    }
  };
  return /* @__PURE__ */ m.jsxs(
    bn,
    {
      isOpen: l,
      onClose: s,
      "data-aiwa-day-log-modal": "true",
      children: [
        /* @__PURE__ */ m.jsx(Hh, { size: "large", title: e || "Занести в журнал" }),
        /* @__PURE__ */ m.jsx("div", { className: "aiwa-log-scroll", children: /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-log-sections", children: [
          /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(
            zr,
            {
              label: "Энергия",
              options: ax,
              value: g,
              onChange: v
            }
          ) }),
          /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(
            zr,
            {
              label: "Настроение",
              options: ix,
              value: b,
              onChange: T
            }
          ) }),
          B.map(([_, H]) => /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(cx, { label: _, options: H, symptoms: y, onToggle: R }) }, _)),
          /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(fx, { value: j, onChange: M }) }),
          c ? /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(Rd, { label: "Близость", active: S, onChange: w }) }) : null
        ] }) }),
        /* @__PURE__ */ m.jsx("div", { className: "aiwa-log-footer", children: /* @__PURE__ */ m.jsx(
          Wt,
          {
            variant: "filled",
            label: D ? "Сохраняю…" : "Сохранить",
            isFill: !0,
            ...se("Сохранить", U)
          }
        ) })
      ]
    }
  );
}
function Zj({ isOpen: a, onClose: e, mode: l, revision: s, symptomGroups: r }) {
  const [c, f] = E.useState(!1), [h, y] = E.useState(null), [p, g] = E.useState(!1), [v, b] = E.useState("period"), [T, S] = E.useState({}), w = E.useRef(Promise.resolve()), j = E.useRef(0), M = Array.from({ length: 20 }, (F, et) => le("getAiwaCalendarMonth", et - 12)).filter(Boolean), D = l !== "preg" && l !== "meno" && l !== "male", A = rj(D ? ["period", "symptoms", "intimacy"] : ["symptoms", "intimacy"]), R = Dd[v] || Dd.symptoms, B = lj(), U = () => {
    g(!1), S({});
  }, _ = (F) => {
    b(F), f(!1), g(!0);
  }, H = A.map((F) => ({
    label: F.label,
    onSelect: () => _(F.value)
  }));
  rx(a, p ? U : e);
  const P = E.useRef(null);
  E.useEffect(() => {
    if (!a) return;
    const F = P.current, et = F?.querySelector('[data-current-month="true"]');
    F && et && (F.scrollTop = Math.max(0, et.offsetTop - 8));
  }, [a]), E.useEffect(() => {
    a || (f(!1), y(null), g(!1), S({})), b(D ? "period" : "symptoms");
  }, [a, D]);
  const K = (F) => {
    const et = T[`${v}:${F.iso}`];
    return typeof et == "boolean" ? et : !!R.checked(F);
  }, it = (F, et) => {
    const N = () => le(F, et);
    j.current += 1, w.current = w.current.then(N, N).then(() => {
      j.current -= 1, j.current === 0 && S({});
    });
  }, at = (() => {
    const F = /* @__PURE__ */ new Date();
    return `${F.getFullYear()}-${String(F.getMonth() + 1).padStart(2, "0")}-${String(F.getDate()).padStart(2, "0")}`;
  })(), I = (F, et) => {
    if (!p) {
      F.iso && F.iso <= at && y({ iso: F.iso, label: `${F.date} ${et}` });
      return;
    }
    if (v === "symptoms") {
      y({ iso: F.iso, label: `${F.date} ${et}` });
      return;
    }
    S((N) => ({ ...N, [`${v}:${F.iso}`]: !K(F) })), it(v === "period" ? "toggleCalendarPeriodDay" : "markPA", F.iso);
  };
  return a ? Hr.createPortal(
    /* @__PURE__ */ m.jsxs(
      "div",
      {
        className: "aiwa-calendar-page",
        "data-aiwa-calendar-modal": "true",
        "data-marking": p ? "true" : void 0,
        "data-markbar": p && !B ? "true" : void 0,
        role: "region",
        "aria-label": "Календарь",
        children: [
          /* @__PURE__ */ m.jsxs("div", { className: "aiwa-calendar-screen", "data-revision": s, role: "document", "aria-label": "Календарь", children: [
            /* @__PURE__ */ m.jsxs("div", { className: "aiwa-calendar-modeswitch", children: [
              p && B ? null : /* @__PURE__ */ m.jsxs(
                Ce,
                {
                  as: "button",
                  type: "button",
                  mode: "opacity",
                  className: "aiwa-calendar-legend-toggle",
                  "aria-pressed": c,
                  "aria-label": c ? "Скрыть обозначения" : "Показать обозначения календаря",
                  onClick: () => f((F) => !F),
                  children: [
                    /* @__PURE__ */ m.jsx(Wb, {}),
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
                  onClick: U,
                  children: /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "semibold", children: "Готово" })
                }
              ) : null
            ] }),
            c ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-calendar-help", role: "status", children: [
              /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "semibold", children: "Обозначения" }),
              /* @__PURE__ */ m.jsx("div", { className: "aiwa-calendar-legend", children: uj.map(({ label: F, variant: et, token: N }) => /* @__PURE__ */ m.jsx(
                PE,
                {
                  variant: et,
                  textVariant: "caption1",
                  weight: "semibold",
                  style: { color: `var(${N})` },
                  children: F
                },
                F
              )) })
            ] }) : null,
            /* @__PURE__ */ m.jsx("div", { className: "aiwa-calendar-scroll", ref: P, children: /* @__PURE__ */ m.jsx("div", { className: "aiwa-calendar-months", children: M.map((F) => /* @__PURE__ */ m.jsxs(
              "section",
              {
                className: "aiwa-calendar-month",
                "aria-label": F.label,
                "data-current-month": F.days.some((et) => et.today) ? "true" : void 0,
                children: [
                  /* @__PURE__ */ m.jsx(lt, { className: "aiwa-calendar-month-title", variant: "body", weight: "semibold", children: F.label || F.name }),
                  /* @__PURE__ */ m.jsx("div", { className: "aiwa-calendar-grid", children: F.days.map((et) => et.empty ? /* @__PURE__ */ m.jsx("span", { className: "aiwa-calendar-empty", "aria-hidden": "true" }, et.key) : /* @__PURE__ */ m.jsx(
                    ex,
                    {
                      day: et,
                      interactive: p || !!(et.iso && et.iso <= at),
                      marking: p,
                      checked: p && K(et),
                      markVariant: v === "intimacy" ? "heart" : "radio",
                      monthLabel: F.label,
                      onSelect: (N) => I(N, F.name || F.label)
                    },
                    et.key
                  )) })
                ]
              },
              F.key || F.label
            )) }) })
          ] }),
          p && !B ? /* @__PURE__ */ m.jsx(
            Pj,
            {
              options: A,
              value: v,
              onChange: b,
              hint: R.hint
            }
          ) : null,
          p ? null : /* @__PURE__ */ m.jsx(
            dx,
            {
              className: "aiwa-calendar-fab",
              align: "end",
              items: H,
              trigger: /* @__PURE__ */ m.jsx(Yj, { icon: /* @__PURE__ */ m.jsx(Gr, {}), label: "Отметить день" })
            }
          ),
          /* @__PURE__ */ m.jsx(
            Kj,
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
function Qj({ panel: a, onClose: e, checkin: l, symptomGroups: s, mode: r, revision: c }) {
  return /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
    /* @__PURE__ */ m.jsx(Gj, { isOpen: a === "journal", onClose: e, checkin: l, symptomGroups: s, mode: r }),
    /* @__PURE__ */ m.jsx(Zj, { isOpen: a === "calendar", onClose: e, mode: r, revision: c, symptomGroups: s })
  ] });
}
function Yt({
  title: a,
  description: e,
  onClick: l,
  trailing: s,
  muted: r = !1,
  start: c,
  image: f,
  loading: h = !1
}) {
  const y = s !== void 0 ? s : l ? /* @__PURE__ */ m.jsx(pt.Part, { type: "Chevron" }) : null, p = h ? /* @__PURE__ */ m.jsx("span", { className: "aiwa-cell-thumb aiwa-cell-thumb-loading", children: /* @__PURE__ */ m.jsx(Uh, { size: 22 }) }) : f ? /* @__PURE__ */ m.jsx("span", { className: "aiwa-cell-thumb", children: /* @__PURE__ */ m.jsx("img", { src: f, alt: "", loading: "lazy" }) }) : c;
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
function Wi({ label: a, options: e, value: l, onChange: s }) {
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
function Yh({ isOpen: a, onClose: e }) {
  const [l, s] = E.useState("main"), [r, c] = E.useState(() => le("aiwaData") || {}), [f, h] = E.useState(null), [y, p] = E.useState("3"), [g, v] = E.useState({});
  E.useEffect(() => {
    if (!a) return;
    const A = le("aiwaData") || {};
    c(A), s("main"), h(null), v({
      height: String(A.profile?.height || ""),
      weight: String(A.profile?.weight || ""),
      age: String(A.profile?.age || ""),
      cycle_len: String(A.cycle_len || ""),
      diet_note: A.profile?.diet_note || A.diet_note || "",
      kcal_goal: String(A.profile?.kcal_goal || A.kcal_goal || ""),
      send_time: A.send_time || "08:00",
      proactive_enabled: A.proactive_enabled !== !1
    });
  }, [a]);
  const b = async () => {
    s("partner");
    const A = await qt("/api/partner", {}).catch(() => null);
    h(A || {});
  }, T = async () => {
    const A = await qt("/api/profile", {
      height: g.height,
      weight: g.weight,
      age: g.age,
      ...r.mode === "cycle" ? { cycle_len: g.cycle_len } : {}
    }).catch(() => null), R = await qt("/api/prefs", {
      diet_note: g.diet_note,
      kcal_goal: g.kcal_goal
    }).catch(() => null), B = await qt("/api/settime", { time: g.send_time }).catch(() => null);
    A?.ok && R?.ok && B?.ok ? (Ot("Данные сохранены", { type: "success" }), vn("reloadAfterEdit"), s("main")) : Ot(A?.text || "Проверь рост, вес, возраст и время", { type: "error" });
  }, S = async () => {
    const A = await qt("/api/report", { period: y }).catch(() => null);
    A?.ok ? (Ot("Выписка отправлена в чат бота", { type: "success" }), s("main")) : Ot(A?.text || "Выписка временно недоступна", { type: "error" });
  }, w = async (A) => {
    const R = g.proactive_enabled !== !1;
    v((U) => ({ ...U, proactive_enabled: A })), (await qt("/api/proactive", { enabled: A }).catch(() => null))?.ok || (v((U) => ({ ...U, proactive_enabled: R })), Ot("Не получилось изменить настройку", { type: "error" }));
  }, j = (A) => {
    e(), vn("chooseMode", A);
  }, M = async () => {
    if (f?.link)
      try {
        await navigator.clipboard.writeText(f.link), Ot("Ссылка скопирована", { type: "success" });
      } catch {
        Ot("Ссылка готова — выдели и скопируй");
      }
  }, D = async () => {
    (await qt("/api/partner", { action: "unlink" }).catch(() => null))?.ok && (h({ linked: !1 }), Ot("Партнёр отключён", { type: "success" }));
  };
  return /* @__PURE__ */ m.jsx(
    bn,
    {
      isOpen: a,
      onClose: e,
      onBack: l === "main" ? e : () => s("main"),
      children: /* @__PURE__ */ m.jsx(m.Fragment, { children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-sheet-scroll", children: [
        l === "main" ? /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
          r.mode === "male" ? null : /* @__PURE__ */ m.jsxs("div", { className: "aiwa-profile-modes", children: [
            /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "semibold", children: "Режим" }),
            /* @__PURE__ */ m.jsx("div", { className: "aiwa-choice-pills", children: mj.map((A) => /* @__PURE__ */ m.jsx(
              Ce,
              {
                as: "button",
                type: "button",
                mode: "opacity",
                className: r.mode === A.value ? "aiwa-choice-pill is-active" : "aiwa-choice-pill",
                "aria-pressed": r.mode === A.value,
                onClick: () => j(A.value),
                children: /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: A.label })
              },
              A.value
            )) })
          ] }),
          /* @__PURE__ */ m.jsx(yt, { className: "aiwa-tma-blocks", children: /* @__PURE__ */ m.jsxs(yt.Item, { children: [
            /* @__PURE__ */ m.jsx(Yt, { title: r.mode === "male" ? "Выписка по самочувствию" : "Выписка для врача", description: "PDF в чат бота", onClick: () => s("report") }),
            /* @__PURE__ */ m.jsx(Yt, { title: "Предпочтения по питанию", description: "ограничения и цель калорий", onClick: () => s("data") }),
            /* @__PURE__ */ m.jsx(Yt, { title: "Мои данные", description: r.mode === "male" ? "рост · вес · возраст" : "рост · вес · возраст · цикл", onClick: () => s("data") }),
            /* @__PURE__ */ m.jsx(Yt, { title: "Утренняя сводка", description: `${g.send_time || "08:00"} · МСК`, onClick: () => s("summary") }),
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
            r.mode === "male" ? null : /* @__PURE__ */ m.jsx(Yt, { title: "Партнёр и близкие", description: "короткая бережная сводка", onClick: b })
          ] }) })
        ] }) : null,
        l === "data" ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-stack", children: [
          /* @__PURE__ */ m.jsx(lt, { variant: "title3", weight: "semibold", children: "Параметры тела" }),
          /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-grid", children: [
            /* @__PURE__ */ m.jsx(ie, { label: "Рост, см", value: g.height || "", onChange: (A) => v((R) => ({ ...R, height: A })), inputMode: "decimal" }),
            /* @__PURE__ */ m.jsx(ie, { label: "Вес, кг", value: g.weight || "", onChange: (A) => v((R) => ({ ...R, weight: A })), inputMode: "decimal" }),
            /* @__PURE__ */ m.jsx(ie, { label: "Возраст", value: g.age || "", onChange: (A) => v((R) => ({ ...R, age: A })), inputMode: "numeric" }),
            r.mode === "cycle" ? /* @__PURE__ */ m.jsx(ie, { label: "Длина цикла", value: g.cycle_len || "", onChange: (A) => v((R) => ({ ...R, cycle_len: A })), inputMode: "numeric" }) : null
          ] }),
          /* @__PURE__ */ m.jsx(lt, { variant: "title3", weight: "semibold", children: "Питание" }),
          /* @__PURE__ */ m.jsx(
            ie,
            {
              label: "Предпочтения и ограничения",
              value: g.diet_note || "",
              onChange: (A) => v((R) => ({ ...R, diet_note: A })),
              placeholder: "Например: без свинины, аллергия на орехи",
              multiline: !0
            }
          ),
          /* @__PURE__ */ m.jsx(ie, { label: "Желаемые калории", value: g.kcal_goal || "", onChange: (A) => v((R) => ({ ...R, kcal_goal: A })), inputMode: "numeric" }),
          /* @__PURE__ */ m.jsx(Wt, { variant: "filled", label: "Сохранить", isFill: !0, ...se("Сохранить данные", T) })
        ] }) : null,
        l === "summary" ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-stack", children: [
          /* @__PURE__ */ m.jsx(lt, { variant: "title3", weight: "semibold", children: "Утренняя сводка" }),
          /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: "Каждое утро Айва присылает сводку дня в чат — выбери удобное время (МСК)." }),
          /* @__PURE__ */ m.jsx(ie, { label: "Время утренней сводки", type: "time", value: g.send_time || "08:00", onChange: (A) => v((R) => ({ ...R, send_time: A })) }),
          /* @__PURE__ */ m.jsx(Wt, { variant: "filled", label: "Сохранить", isFill: !0, ...se("Сохранить время сводки", T) })
        ] }) : null,
        l === "report" ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-stack", children: [
          /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: r.mode === "male" ? "Динамика энергии и дневник самочувствия придут PDF-файлом в чат бота." : "Циклы, динамика и дневник симптомов придут PDF-файлом в чат бота." }),
          /* @__PURE__ */ m.jsx(
            Wi,
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
          /* @__PURE__ */ m.jsx(Wt, { variant: "filled", label: "Собрать выписку", isFill: !0, ...se("Собрать выписку", S) })
        ] }) : null,
        l === "partner" ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-stack", children: [
          /* @__PURE__ */ m.jsxs("div", { className: "aiwa-paper-card", children: [
            /* @__PURE__ */ m.jsx(lt, { variant: "title3", weight: "semibold", children: "Бережная сводка для близкого" }),
            /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: "Айва расскажет, когда особенно нужны поддержка и отдых — без интимных и медицинских деталей." })
          ] }),
          f === null ? /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: "Готовлю ссылку…" }) : null,
          f?.linked ? /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
            /* @__PURE__ */ m.jsx("div", { className: "aiwa-sheet-card", children: /* @__PURE__ */ m.jsx(Yt, { title: "Партнёр подключён", description: "Получает только бережную сводку без календаря и приватных заметок." }) }),
            /* @__PURE__ */ m.jsx(Wt, { variant: "filled", label: "Отключить партнёра", isFill: !0, ...se("Отключить партнёра", D) })
          ] }) : null,
          f?.link ? /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
            /* @__PURE__ */ m.jsx(ie, { label: "Ссылка-приглашение", value: f.link, readOnly: !0, multiline: !0 }),
            /* @__PURE__ */ m.jsx(Wt, { variant: "filled", label: "Скопировать ссылку", isFill: !0, ...se("Скопировать ссылку", M) })
          ] }) : null,
          f && !f.linked && !f.link ? /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: "Ссылка доступна после запуска из Telegram. В боте можно использовать команду /partner." }) : null
        ] }) : null
      ] }) })
    }
  );
}
function Fj() {
  const a = window.Telegram?.WebApp?.initDataUnsafe?.user, e = a?.photo_url, s = ((typeof window.aiwaData == "function" ? window.aiwaData() : window.aiwaData)?.name || a?.first_name || "").trim();
  return /* @__PURE__ */ m.jsxs("span", { className: "aiwa-avatar-initial", "aria-hidden": "true", children: [
    (s[0] || "•").toUpperCase(),
    e ? /* @__PURE__ */ m.jsx(
      "img",
      {
        className: "aiwa-avatar-photo",
        src: e,
        alt: "",
        onError: (r) => {
          r.currentTarget.style.display = "none";
        }
      }
    ) : null
  ] });
}
function Jj(a) {
  return /* @__PURE__ */ m.jsx(ol, { children: /* @__PURE__ */ m.jsx(sl, { mode: "secondary", children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-deslop-home", children: [
    /* @__PURE__ */ m.jsx(
      Hh,
      {
        title: a.dateText,
        left: /* @__PURE__ */ m.jsx(Fj, {}),
        onLeft: () => window.AiwaDeslop?.openProfile?.(),
        leftAriaLabel: "Открыть профиль",
        right: /* @__PURE__ */ m.jsx(ZE, {}),
        onRight: () => vn("openHomePanel", "calendar"),
        rightAriaLabel: "Открыть календарь"
      }
    ),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-overview", children: [
      /* @__PURE__ */ m.jsx(
        qh,
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
        Wt,
        {
          variant: "filled",
          label: /* @__PURE__ */ m.jsxs("span", { className: "aiwa-btn-icon-label", children: [
            /* @__PURE__ */ m.jsx(Gr, {}),
            " Занести в журнал"
          ] }),
          ...se("Занести в журнал", () => vn("openHomePanel", "journal"))
        }
      )
    ] }),
    /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-tma-blocks", children: [
      /* @__PURE__ */ m.jsx(yj, { title: a.dayTitle, checkin: a.dayCheckin ?? a.checkin, symptomGroups: a.symptomGroups }),
      /* @__PURE__ */ m.jsx(wj, { aiText: a.aiText }),
      /* @__PURE__ */ m.jsx(Tj, { delay: a.delay }),
      /* @__PURE__ */ m.jsx(jj, { metrics: a.metrics, title: a.statsTitle }),
      a.pregnancy ? /* @__PURE__ */ m.jsx(Hj, { pregnancy: a.pregnancy }) : /* @__PURE__ */ m.jsx(
        _j,
        {
          data: a.chartData,
          series: a.chartSeries,
          title: a.chartTitle,
          band: a.chartBand,
          emptyText: a.chartEmptyText
        }
      ),
      a.mode === "meno" || a.mode === "preg" ? null : /* @__PURE__ */ m.jsx(
        Dj,
        {
          history: a.history,
          title: a.historyTitle,
          emptyTitle: a.historyEmptyTitle,
          emptyDescription: a.historyEmptyDescription
        }
      ),
      /* @__PURE__ */ m.jsx(Uj, {})
    ] }),
    /* @__PURE__ */ m.jsx(
      Qj,
      {
        panel: a.panel,
        onClose: a.onPanelClose,
        checkin: a.checkin,
        symptomGroups: a.symptomGroups,
        mode: a.mode,
        revision: a.panelRevision
      }
    ),
    /* @__PURE__ */ m.jsx(Yh, { isOpen: a.profileOpen, onClose: a.onProfileClose })
  ] }) }) });
}
const Wg = {
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
}, Nd = (a) => Array.from({ length: a }, (e, l) => l);
function Wj({ kind: a }) {
  return a === "week" ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-overview", children: [
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-week", children: Nd(7).map((e) => /* @__PURE__ */ m.jsx(Fi, { className: "aiwa-skeleton-day" }, e)) }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-countdown", children: [
      /* @__PURE__ */ m.jsx(ei, { active: !0, width: 2 }),
      /* @__PURE__ */ m.jsx(ei, { active: !0, width: 18 })
    ] })
  ] }) : /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
    /* @__PURE__ */ m.jsx(Fi, { className: "aiwa-skeleton-gauge" }),
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-macro-grid", children: Nd(3).map((e) => /* @__PURE__ */ m.jsx(Fi, { className: "aiwa-skeleton-macro" }, e)) })
  ] });
}
function hx({ title: a, variant: e = "food" }) {
  const { hero: l, sections: s } = Wg[e] || Wg.food;
  return /* @__PURE__ */ m.jsx(ol, { children: /* @__PURE__ */ m.jsx(sl, { mode: "secondary", children: /* @__PURE__ */ m.jsxs("div", { className: `aiwa-paper-screen aiwa-screen-skeleton aiwa-${e}-screen`, children: [
    /* @__PURE__ */ m.jsx(lt, { className: "aiwa-screen-title", variant: "title1", weight: "semibold", children: a }),
    /* @__PURE__ */ m.jsxs(yb, { active: !0, children: [
      /* @__PURE__ */ m.jsx(Wj, { kind: l }),
      /* @__PURE__ */ m.jsx("div", { className: "aiwa-screen-cta", children: /* @__PURE__ */ m.jsx(Fi, { className: "aiwa-skeleton-cta" }) }),
      /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-tma-blocks", children: [
        /* @__PURE__ */ m.jsx(yt.Item, { className: "aiwa-insight-section", children: /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-insight-content", children: [
          /* @__PURE__ */ m.jsx(ei, { active: !0, width: 30 }),
          /* @__PURE__ */ m.jsx(ei, { active: !0, width: 26 }),
          /* @__PURE__ */ m.jsx(Fi, { className: "aiwa-skeleton-insight-cta" })
        ] }) }) }),
        s.map((r) => /* @__PURE__ */ m.jsx(yt.Item, { header: r.header, children: Nd(r.rows).map((c) => /* @__PURE__ */ m.jsx(
          pt,
          {
            tappable: !1,
            start: r.media ? /* @__PURE__ */ m.jsx(Fi, { className: "aiwa-skeleton-thumb" }) : void 0,
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
function Yf({ label: a, value: e, target: l, macro: s, color: r }) {
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
const Ig = "M 11 169 A 158 158 0 0 1 327 169", tv = Math.PI * 158, Ij = 500, tA = (a) => 1 - (1 - a) ** 3;
function eA(a) {
  const [e, l] = E.useState(0), s = E.useRef(0), r = E.useRef(0);
  return E.useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      s.current = a, l(a);
      return;
    }
    const f = s.current, h = performance.now(), y = (p) => {
      const g = Math.min(1, (p - h) / Ij), v = f + (a - f) * tA(g);
      s.current = v, l(v), g < 1 && (r.current = requestAnimationFrame(y));
    };
    return r.current = requestAnimationFrame(y), () => cancelAnimationFrame(r.current);
  }, [a]), e;
}
function nA({ kcal: a, kcalTarget: e }) {
  const l = Number(a || 0), s = Number(e || 0), r = eA(Math.min(1, l / Math.max(1, s))), c = r * Math.PI, f = 169 - 158 * Math.cos(c), h = 169 - 158 * Math.sin(c);
  return /* @__PURE__ */ m.jsxs("div", { className: "aiwa-food-gauge", children: [
    /* @__PURE__ */ m.jsxs("svg", { className: "aiwa-food-gauge-arc", viewBox: "0 0 338 180", width: "338", height: "180", fill: "none", children: [
      /* @__PURE__ */ m.jsx("path", { className: "aiwa-food-gauge-track", d: Ig }),
      /* @__PURE__ */ m.jsx(
        "path",
        {
          className: "aiwa-food-gauge-progress",
          d: Ig,
          strokeDasharray: tv,
          strokeDashoffset: tv * (1 - r)
        }
      ),
      /* @__PURE__ */ m.jsx("circle", { className: "aiwa-food-gauge-knob", cx: f, cy: h, r: "11" })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-food-gauge-center", children: [
      /* @__PURE__ */ m.jsx(lt, { variant: "title1", weight: "semibold", children: _d(l) }),
      /* @__PURE__ */ m.jsxs(lt, { variant: "body", weight: "regular", children: [
        "из ",
        _d(s)
      ] })
    ] })
  ] });
}
function ev({ meal: a, onSaved: e, onClose: l }) {
  const [s, r] = E.useState(() => fj(a)), [c, f] = E.useState(!1), h = (p, g) => r((v) => ({ ...v, [p]: g })), y = async () => {
    if (!s.title.trim() && !String(s.kcal).trim()) {
      Ot("Укажи название или калории", { type: "error" });
      return;
    }
    f(!0);
    try {
      const p = await qt(a ? "/api/diary_edit" : "/api/food_manual", {
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
    /* @__PURE__ */ m.jsx(ie, { label: "Название", value: s.title, onChange: (p) => h("title", p), placeholder: "Например, творог и банан" }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-grid", children: [
      /* @__PURE__ */ m.jsx(ie, { label: "Ккал", value: s.kcal, onChange: (p) => h("kcal", p), inputMode: "decimal" }),
      /* @__PURE__ */ m.jsx(ie, { label: "Граммы", value: s.grams, onChange: (p) => h("grams", p), inputMode: "decimal" }),
      /* @__PURE__ */ m.jsx(ie, { label: "Белки", value: s.protein, onChange: (p) => h("protein", p), inputMode: "decimal" }),
      /* @__PURE__ */ m.jsx(ie, { label: "Жиры", value: s.fat, onChange: (p) => h("fat", p), inputMode: "decimal" }),
      /* @__PURE__ */ m.jsx(ie, { label: "Углеводы", value: s.carbs, onChange: (p) => h("carbs", p), inputMode: "decimal" })
    ] }),
    /* @__PURE__ */ m.jsx(Wi, { label: "Приём пищи", options: lx, value: s.slot, onChange: (p) => h("slot", p) }),
    /* @__PURE__ */ m.jsx(
      Wt,
      {
        variant: "filled",
        label: c ? "Сохраняю…" : a ? "Сохранить изменения" : "Сохранить приём",
        isFill: !0,
        disabled: c,
        ...se("Сохранить приём", y)
      }
    )
  ] });
}
function aA({ isOpen: a, onClose: e, onSaved: l, editingMeal: s = null }) {
  const [r, c] = E.useState("text"), [f, h] = E.useState(""), [y, p] = E.useState(!1);
  E.useEffect(() => {
    a && (tx("food"), c(s ? "manual" : "text"), h(""));
  }, [s, a]);
  const g = async () => {
    if (f.trim()) {
      p(!0);
      try {
        const b = await qt("/api/food_text", { text: f.trim() });
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
  return /* @__PURE__ */ m.jsx(bn, { isOpen: a, onClose: e, children: /* @__PURE__ */ m.jsx("div", { children: /* @__PURE__ */ m.jsx("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: s ? /* @__PURE__ */ m.jsx(ev, { meal: s, onSaved: l, onClose: e }) : /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
    /* @__PURE__ */ m.jsx(
      Wi,
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
      y ? /* @__PURE__ */ m.jsx(Uh, { size: 28 }) : null,
      /* @__PURE__ */ m.jsx(lt, { variant: "title3", weight: "semibold", children: y ? "Разбираю фото…" : "Сфотографировать еду" }),
      /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: y ? "Айва считает КБЖУ, это займёт несколько секунд." : "Айва распознает блюдо и посчитает КБЖУ." }),
      /* @__PURE__ */ m.jsx("input", { type: "file", accept: "image/*", capture: "environment", disabled: y, onChange: (b) => v(b.target.files?.[0]) })
    ] }) : null,
    r === "text" ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-stack", children: [
      /* @__PURE__ */ m.jsx(
        ie,
        {
          label: "Что съела?",
          value: f,
          onChange: h,
          placeholder: "Например: 200 г творога и банан",
          multiline: !0
        }
      ),
      /* @__PURE__ */ m.jsx(
        Wt,
        {
          variant: "filled",
          label: y ? "Считаю…" : "Добавить приём",
          isFill: !0,
          disabled: y || !f.trim(),
          ...se("Добавить приём", g)
        }
      )
    ] }) : null,
    r === "manual" ? /* @__PURE__ */ m.jsx(ev, { meal: null, onSaved: l, onClose: e }) : null
  ] }) }) }) });
}
function iA({ isOpen: a, onClose: e, diary: l, onAdd: s, onEdit: r, onDelete: c, onReco: f }) {
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
    lx.map((g) => {
      const v = h.filter((b) => (b.slot || "snack") === g.value);
      return /* @__PURE__ */ m.jsx(yt.Item, { header: g.label, children: v.length ? v.map((b) => /* @__PURE__ */ m.jsx(
        Yt,
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
              children: /* @__PURE__ */ m.jsx(Jb, {})
            }
          )
        },
        b.id
      )) : /* @__PURE__ */ m.jsx(pt, { as: "button", type: "button", onClick: s, end: /* @__PURE__ */ m.jsx(pt.Part, { type: "Chevron" }), children: /* @__PURE__ */ m.jsx(pt.Text, { type: "Accent", title: "Добавить" }) }) }, g.value);
    }),
    /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-cell-actions", children: [
      /* @__PURE__ */ m.jsx(Wt, { variant: "filled", label: "Добавить приём", isFill: !0, ...se("Добавить приём", s) }),
      /* @__PURE__ */ m.jsx(Wt, { variant: "filled", label: "Совет по дневнику", isFill: !0, ...se("Совет по дневнику", f) })
    ] }) }) })
  ] }) });
}
function lA({ isOpen: a, meal: e, slotLabel: l = "", onClose: s, onAdd: r, busy: c = !1 }) {
  const [f, h] = E.useState(null), [y, p] = E.useState(!1), g = e?.dish || "";
  E.useEffect(() => {
    if (!a || !g) return;
    h(null), p(!1);
    let S = !0;
    return qt("/api/recipe", { dish: g }).then((w) => {
      S && (w?.steps?.length ? h(w) : p(!0));
    }).catch(() => S && p(!0)), () => {
      S = !1;
    };
  }, [a, g]);
  const v = f?.macros || {}, b = [v.protein && `Б ${v.protein}`, v.fat && `Ж ${v.fat}`, v.carbs && `У ${v.carbs}`].filter(Boolean).join(" · "), T = [l, e?.kcal, f?.time].filter(Boolean).join(" · ");
  return /* @__PURE__ */ m.jsx(bn, { isOpen: a, onClose: s, children: /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-tma-blocks", children: [
    /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsx(pt.Text, { title: g, description: T || e?.note || "", bold: !0 }) }) }),
    !f && !y ? /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-cell-actions", "aria-label": "Готовлю рецепт", children: [
      /* @__PURE__ */ m.jsx(Uh, { size: "m" }),
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
      Wt,
      {
        variant: "filled",
        label: c ? "Добавляю…" : "Добавить в дневник",
        isFill: !0,
        disabled: c,
        ...se("Добавить в дневник", r)
      }
    ) }) }) })
  ] }) });
}
const mx = {
  foodSection: () => qt("/api/section", { kind: "food" }),
  diary: () => qt("/api/diary", {}),
  trainingSection: () => qt("/api/section", { kind: "training" }),
  train: () => qt("/api/train", {})
}, Zi = /* @__PURE__ */ new Map(), sr = /* @__PURE__ */ new Map(), aiwaCacheTs = /* @__PURE__ */ new Map(), or = (a) => Object.fromEntries(a.map((e) => [e, Zi.get(e) ?? null])), Od = (a, { force: e = !1, maxAgeMs: l = 1500 } = {}) => {
  const s = sr.get(a);
  if (s) return s;
  if (!e && Zi.has(a) && Date.now() - (aiwaCacheTs.get(a) || 0) <= l)
    return Promise.resolve(Zi.get(a));
  const r = mx[a]().catch(() => null).then((c) => (c && (Zi.set(a, c), aiwaCacheTs.set(a, Date.now())), sr.get(a) === r && sr.delete(a), Zi.get(a) ?? null));
  return sr.set(a, r), r;
}, sA = () => {
  Object.keys(mx).forEach((a) => {
    Od(a);
  });
};
function px(a, e) {
  const [l, s] = E.useState(() => or(a)), r = E.useRef(!1), c = E.useCallback(async (...h) => {
    const y = h.length ? h : a;
    await Promise.all(y.map((p) => Od(p, { force: !0 }))), s(or(a));
  }, [a]), f = E.useCallback((h, y) => {
    Zi.set(h, y), aiwaCacheTs.set(h, Date.now()), s(or(a));
  }, [a]);
  return E.useEffect(() => {
    let h = !0;
    const y = r.current;
    return r.current = !0, Promise.all(a.map((p) => Od(p, { force: y }))).then(() => {
      h && s(or(a));
    }), () => {
      h = !1;
    };
  }, e), [l, c, f];
}
const oA = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"], yx = (a = 30) => {
  const e = [];
  for (let l = a - 1; l >= 0; l -= 1) {
    const s = /* @__PURE__ */ new Date();
    s.setDate(s.getDate() - l);
    const r = `${s.getFullYear()}-${String(s.getMonth() + 1).padStart(2, "0")}-${String(s.getDate()).padStart(2, "0")}`;
    e.push({ iso: r, date: String(s.getDate()), label: oA[s.getDay()], today: l === 0 });
  }
  return e;
}, rA = ["foodSection", "diary"], uA = "/assets/paper-food-placeholder.png", zd = (a) => String(a || "").toLowerCase().replace(/ё/g, "е"), Xf = "?v=2", nv = (a) => zd(a).split(/[^а-яa-z0-9]+/).filter((e) => e.length >= 3), cA = (a, e) => {
  const l = Math.min(4, a.length, e.length);
  return a.slice(0, l) === e.slice(0, l);
}, av = (a, e) => {
  const l = zd(e).trim();
  if (!a || !l) return null;
  const s = a[String(e || "").trim()];
  if (s) return s + Xf;
  const r = nv(e);
  if (!r.length) return null;
  let c = null, f = 0, h = 0;
  for (const [y, p] of Object.entries(a)) {
    if (zd(y) === l) return p + Xf;
    const v = nv(y);
    if (!v.length) continue;
    const b = v.filter((S) => r.some((w) => cA(S, w))).length, T = b / v.length;
    b > 0 && (T > h || T === h && b > f) && (h = T, f = b, c = p);
  }
  return h >= 0.5 ? c + Xf : null;
}, foodFallbackImage = (a) => {
  const e = zd([a?.title, ...Array.isArray(a?.items) ? a.items.map((l) => l?.name) : []].filter(Boolean).join(" "));
  return zd(a?.fclass) === "напиток" || /(кофе|чай|какао|вода|сок|напит|латте|капуч|морс|компот)/.test(e) ? "/assets/food/drink-cup.svg?v=1" : uA;
}, fA = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" });
function iv({ mode: a, revision: e = 0 }) {
  const [l, s, r] = px(rA, [a, e]), c = typeof window.aiwaData == "function" ? window.aiwaData() : window.aiwaData, f = c?.mode === "male", [h, y] = E.useState(!1), [p, g] = E.useState({}), [v, b] = E.useState(""), [T, S] = E.useState(null), [w, j] = E.useState(null), [M, D] = E.useState(!1), [A, R] = E.useState(null), [B, U] = E.useState(!1), [_, H] = E.useState(""), [P, K] = E.useState(null), [it, at] = E.useState(!1), I = E.useRef(null), F = !!l.foodSection && !(l.foodSection.menu?.meals || []).length, et = E.useRef(0);
  E.useEffect(() => {
    if (!F) {
      et.current = 0;
      return;
    }
    if (et.current >= 5) return;
    const rt = [1500, 3e3, 5e3, 9e3, 15e3][et.current], Kt = setTimeout(() => {
      et.current += 1, s("foodSection");
    }, rt);
    return () => clearTimeout(Kt);
  }, [F, l.foodSection]), E.useEffect(() => {
    fetch("/assets/food/manifest.json?v=2").then((rt) => rt.ok ? rt.json() : {}).then((rt) => g(rt || {})).catch(() => {
    });
  }, []);
  const N = () => s("diary");
  if (!l.foodSection || !l.diary) return /* @__PURE__ */ m.jsx(hx, { title: "Питание", variant: "food" });
  const V = l.foodSection, Z = l.diary, nt = Z.totals || {}, st = Z.target || {}, O = V.menu?.meals || [], tt = [
    { index: 0, value: "breakfast", label: "Завтрак" },
    { index: 1, value: "lunch", label: "Обед" },
    { index: O.length >= 4 ? 3 : 2, value: "dinner", label: "Ужин" }
  ].map((rt) => ({ ...rt, meal: O[rt.index] })).filter((rt) => rt.meal), ot = Number(st.kcal || V.kcal || 0), dt = Number(nt.kcal || 0), ht = (rt) => Number(nt[rt] || 0), vt = yx(30), _t = vt[vt.length - 1].iso, wt = !!(v && v !== _t), Xt = wt ? T?.meals || [] : (Z.meals || []).slice().reverse();
  let Pt = "Прошедшие приёмы";
  if (wt) {
    const rt = /* @__PURE__ */ new Date(`${v}T12:00:00`);
    Pt = Number.isNaN(rt.getTime()) ? "Приёмы за день" : `Приёмы за ${fA.format(rt)}`;
  }
  const Ee = async () => {
    if (!B) {
      U(!0);
      try {
        const rt = await qt("/api/week_food_review", {}).catch(() => null);
        rt?.review?.summary ? R(rt.review) : R({ summary: rt?.text || "Не получилось собрать разбор, попробуй чуть позже.", gaps: [], tips: [] });
      } finally {
        U(!1);
      }
    }
  }, Ea = async (rt) => {
    const Kt = typeof rt == "string" ? rt : rt?.iso || "";
    if (b(Kt), !Kt || Kt === _t) {
      S(null);
      return;
    }
    const ii = Z.recent?.[Kt];
    if (ii) {
      S(ii);
      return;
    }
    S(null);
    const nt = await qt("/api/diary", { d: Kt }).catch(() => null);
    S(nt || { meals: [] });
  }, rn = async (rt, Kt) => {
    if (!M) {
      D(!0);
      try {
        const ii = await qt("/api/food_text", { text: rt.dish || rt.title, slot: Kt }).catch(() => null);
        ii?.ok ? (Ot("Добавлено в дневник", { type: "success" }), j(null), await N()) : Ot(ii?.message || "Не получилось добавить", { type: "error" });
      } finally {
        D(!1);
      }
    }
  }, ja = async (rt) => {
    const Kt = await qt("/api/diary_del", { id: rt }).catch(() => null);
    Kt && !Kt.error && (r("diary", { meals: Kt.meals || [], totals: Kt.totals || {}, target: Kt.target || st }), Ot("Приём удалён", { type: "success" }));
  }, Aa = () => {
    K(null), H("add");
  }, Pr = async (rt) => {
    if (!(!rt || it)) {
      at(!0);
      try {
        const Kt = window.aiwaUploadFoodPhoto;
        if (typeof Kt != "function") throw new Error("Загрузка фото недоступна");
        await Kt(rt), await N();
      } catch (Kt) {
        Ot(Kt.message || "Не получилось разобрать фото", { type: "error" });
      } finally {
        at(!1);
      }
    }
  }, _s = async () => {
    await qt("/api/food_prompt", {}).catch(() => null), nl({ nudge: !1 });
  }, rl = [
    { label: "Фото", icon: /* @__PURE__ */ m.jsx(WE, {}), onSelect: () => I.current?.click() },
    { label: "Текстом", icon: /* @__PURE__ */ m.jsx(IE, {}), onSelect: _s }
  ];
  return /* @__PURE__ */ m.jsx(ol, { children: /* @__PURE__ */ m.jsx(sl, { mode: "secondary", children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-paper-screen aiwa-food-screen", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-screen-titlebar", children: [
      /* @__PURE__ */ m.jsx(lt, { className: "aiwa-screen-title", variant: "title1", weight: "semibold", children: "Питание" }),
      f ? /* @__PURE__ */ m.jsx(
        "button",
        {
          type: "button",
          className: "aiwa-avatar-initial aiwa-screen-profile",
          "aria-label": "Открыть профиль",
          onClick: () => y(!0),
          children: /* @__PURE__ */ m.jsx(Fj, {})
        }
      ) : null
    ] }),
    /* @__PURE__ */ m.jsx(nA, { kcal: dt, kcalTarget: ot }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-macro-grid", children: [
      /* @__PURE__ */ m.jsx(Yf, { label: "Жиры", value: ht("fat"), target: st.fat, macro: "fat" }),
      /* @__PURE__ */ m.jsx(Yf, { label: "Белки", value: ht("protein"), target: st.protein, macro: "protein" }),
      /* @__PURE__ */ m.jsx(Yf, { label: "Углеводы", value: ht("carbs"), target: st.carbs, macro: "carbs" })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-screen-cta", children: [
      /* @__PURE__ */ m.jsx(
        dx,
        {
          items: rl,
          trigger: /* @__PURE__ */ m.jsx(
            Wt,
            {
              variant: "filled",
              "aria-label": "Добавить приём",
              label: /* @__PURE__ */ m.jsxs("span", { className: "aiwa-btn-icon-label", children: [
                /* @__PURE__ */ m.jsx(Gr, {}),
                " Добавить приём"
              ] })
            }
          )
        }
      ),
      /* @__PURE__ */ m.jsx(
        "input",
        {
          ref: I,
          type: "file",
          accept: "image/*",
          hidden: !0,
          onChange: (rt) => {
            Pr(rt.target.files?.[0]), rt.target.value = "";
          }
        }
      )
    ] }),
    /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-tma-blocks", children: [
      /* @__PURE__ */ m.jsx(
        ws,
        {
          message: V.text || "Выбираем простую еду с белком в каждом приёме.",
          onDiscuss: () => nl({ topic: "food" })
        }
      ),
      F ? /* @__PURE__ */ m.jsx(yt.Item, { header: "Меню на сегодня", children: /* @__PURE__ */ m.jsx(Yt, { loading: !0, title: "Айва собирает меню…", description: "Завтрак, обед и ужин под фазу" }) }) : null,
      tt.length ? /* @__PURE__ */ m.jsx(yt.Item, { header: "Меню на сегодня", children: tt.map((rt) => /* @__PURE__ */ m.jsx(
        Yt,
        {
          image: rt.meal.image || av(p, rt.meal.dish) || uA,
          title: rt.meal.dish || "Рекомендация Айвы",
          description: [rt.label, rt.meal.kcal, rt.meal.note].filter(Boolean).join(" · "),
          onClick: () => j(rt)
        },
        rt.value
      )) }) : null,
      /* @__PURE__ */ m.jsxs(yt.Item, { header: Pt, children: [
        /* @__PURE__ */ m.jsx("div", { className: "aiwa-food-history-week", children: /* @__PURE__ */ m.jsx(qh, { days: vt, selectedIso: v || _t, onSelect: Ea }) }),
        it ? /* @__PURE__ */ m.jsx(Yt, { loading: !0, title: "Разбираю фото…", description: "Айва считает КБЖУ" }) : null,
        wt && !T ? /* @__PURE__ */ m.jsx(Yt, { loading: !0, title: "Загружаю…", description: "Дневник за выбранный день" }) : null,
        Xt.length ? Xt.map((rt) => /* @__PURE__ */ m.jsx(
          Yt,
          {
            image: av(p, rt.title) || foodFallbackImage(rt) || cj,
            title: rt.title,
            description: `${_d(rt.kcal)} · Б${Math.round(rt.protein || 0)} · Ж${Math.round(rt.fat || 0)} · У${Math.round(rt.carbs || 0)}`,
            onClick: wt ? void 0 : () => H("diary")
          },
          rt.id
        )) : it || wt && !T ? null : /* @__PURE__ */ m.jsx(
          Yt,
          {
            title: wt ? "В этот день записей нет" : "Дневник пока пуст",
            description: wt ? "Дневник за этот день пуст." : "Добавь первый приём — фото, текстом или вручную.",
            onClick: wt ? void 0 : () => H("diary")
          }
        ),
        A ? /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
          /* @__PURE__ */ m.jsx(ws, { message: A.summary }),
          A.gaps?.length ? /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
            /* @__PURE__ */ m.jsx(Yt, { title: "Чего не хватает", description: "" }),
            A.gaps.map((rt) => /* @__PURE__ */ m.jsx(Yt, { title: rt }, rt))
          ] }) : null,
          A.tips?.length ? /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
            /* @__PURE__ */ m.jsx(Yt, { title: "Советы на неделю", description: "" }),
            A.tips.map((rt, Kt) => /* @__PURE__ */ m.jsx(Yt, { title: `${Kt + 1}. ${rt}` }, rt))
          ] }) : null
        ] }) : null,
        /* @__PURE__ */ m.jsx("div", { className: "aiwa-cell-actions aiwa-week-review-cta", children: /* @__PURE__ */ m.jsx(
          Wt,
          {
            variant: "filled",
            label: B ? "Разбираю неделю…" : "Разобрать питание за неделю",
            isFill: !0,
            disabled: B,
            ...se("Разобрать питание за неделю", Ee)
          }
        ) })
      ] })
    ] }),
    f ? /* @__PURE__ */ m.jsx(Yh, { isOpen: h, onClose: () => y(!1) }) : null,
    /* @__PURE__ */ m.jsx(
      aA,
      {
        isOpen: _ === "add",
        onClose: () => H(""),
        onSaved: N,
        editingMeal: P
      }
    ),
    /* @__PURE__ */ m.jsx(
      lA,
      {
        isOpen: !!w,
        meal: w?.meal,
        slotLabel: w?.label,
        busy: M,
        onClose: () => j(null),
        onAdd: () => w && rn(w.meal, w.value)
      }
    ),
    /* @__PURE__ */ m.jsx(
      iA,
      {
        isOpen: _ === "diary",
        onClose: () => H(""),
        diary: Z,
        onAdd: Aa,
        onEdit: (rt) => {
          K(rt), H("add");
        },
        onDelete: ja,
        onReco: async () => {
          const rt = await qt("/api/diary_reco", {}).catch(() => null);
          Ot(rt?.text || "Не удалось собрать совет");
        }
      }
    )
  ] }) }) });
}
function dA({ isOpen: a, onClose: e, onSaved: l, suggested: s }) {
  const r = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), [c, f] = E.useState(r), [h, y] = E.useState("Силовая"), [p, g] = E.useState("45 мин"), [v, b] = E.useState("Нормально"), [T, S] = E.useState([]), [w, j] = E.useState({}), [M, D] = E.useState(""), [A, R] = E.useState(!1), [B, U] = E.useState(""), [_, H] = E.useState(null);
  E.useEffect(() => {
    if (!a) return;
    tx("workout");
    const N = s?.name || "", V = (s?.exercises || []).filter((st) => st?.name), Z = /ход|прогул/i.test(N) ? "Ходьба" : /йог|мобил|релиз|растяж/i.test(N) ? "Йога" : /кардио|бег|вело/i.test(N) ? "Кардио" : /плав/i.test(N) ? "Плавание" : "Силовая";
    y(Z), V.length ? (S(V.map((st) => st.name)), j(Object.fromEntries(V.map((st) => [st.name, { sets: st.sets || "", reps: st.reps || "" }])))) : (S(N ? [N] : []), j({})), D("");
    const nt = (s?.exercises || []).find((st) => st?.name)?.name;
    U(nt && Object.keys(Za).find((st) => Za[st].includes(nt)) || ""), H(null), f(r);
  }, [a, s, r]);
  const P = (N) => S((V) => V.includes(N) ? V.filter((Z) => Z !== N) : [...V, N]), K = h === "Силовая", it = (N) => Object.keys(Za).find((V) => Za[V].includes(N)) || null, at = (N, V, Z) => j((nt) => ({ ...nt, [N]: { ...nt[N], [V]: Z } })), I = (N, V) => {
    const Z = String(w[N]?.[V] ?? "").replace(",", ".").trim(), nt = Number(Z);
    return Z && Number.isFinite(nt) && nt > 0 ? nt : null;
  }, F = async () => {
    const N = [...T, ...M.trim() ? [M.trim()] : []];
    R(!0);
    try {
      const V = await qt("/api/workout", {
        date: c,
        type: h,
        duration: p,
        rpe: v,
        items: N.map((Z) => ({
          name: Z,
          weight: K ? I(Z, "w") : null,
          sets: K ? I(Z, "sets") : null,
          reps: K ? I(Z, "reps") : null,
          group: K ? it(Z) : null
        }))
      });
      if (!V?.ok) throw new Error(V?.text || "Не получилось сохранить тренировку");
      await l(), H({ text: V.review || "", calories: V.calories || 0 });
    } catch (V) {
      Ot(V.message || "Не получилось сохранить", { type: "error" });
    } finally {
      R(!1);
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
          onChange: (V) => at(N, "w", V.target.value)
        }
      ),
      /* @__PURE__ */ m.jsx(
        "input",
        {
          inputMode: "numeric",
          placeholder: "подходы",
          "aria-label": `${N}: подходы`,
          value: w[N]?.sets ?? "",
          onChange: (V) => at(N, "sets", V.target.value)
        }
      ),
      /* @__PURE__ */ m.jsx(
        "input",
        {
          inputMode: "numeric",
          placeholder: "повторы",
          "aria-label": `${N}: повторы`,
          value: w[N]?.reps ?? "",
          onChange: (V) => at(N, "reps", V.target.value)
        }
      )
    ] }) : null
  ] }, N);
  return _ ? /* @__PURE__ */ m.jsx(bn, { isOpen: a, onClose: e, children: /* @__PURE__ */ m.jsx("div", { children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-sheet-card aiwa-workout-review", children: [
      /* @__PURE__ */ m.jsx(lt, { variant: "title2", weight: "semibold", children: "Тренировка сохранена" }),
      /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: `Сожжено примерно ${_.calories} ккал.` }),
      _.text ? /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: _.text }) : null
    ] }),
    /* @__PURE__ */ m.jsx(Wt, { variant: "filled", label: "Понятно", isFill: !0, ...se("Закрыть разбор", e) })
  ] }) }) }) : /* @__PURE__ */ m.jsx(bn, { isOpen: a, onClose: e, children: /* @__PURE__ */ m.jsx("div", { children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ m.jsx(ie, { label: "Когда", type: "date", value: c, onChange: f }),
    /* @__PURE__ */ m.jsx(Wi, { label: "Что делала", options: dj, value: h, onChange: (N) => {
      y(N), S([]);
    } }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-group", children: [
      /* @__PURE__ */ m.jsx(lt, { className: "aiwa-form-label", variant: "body", weight: "semibold", children: "Упражнения" }),
      /* @__PURE__ */ m.jsxs("div", { className: "aiwa-sheet-card", children: [
        K ? Object.keys(Za).map((N) => {
          const V = Za[N].filter((nt) => T.includes(nt)).length, Z = B === N;
          return /* @__PURE__ */ m.jsxs("div", { children: [
            /* @__PURE__ */ m.jsxs(
              Ce,
              {
                as: "button",
                type: "button",
                mode: "opacity",
                className: "aiwa-exercise-row aiwa-exercise-group",
                "aria-expanded": Z,
                onClick: () => U(Z ? "" : N),
                children: [
                  /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "semibold", children: N }),
                  /* @__PURE__ */ m.jsx(lt, { variant: "caption1", weight: "regular", children: V ? `выбрано ${V}` : Z ? "—" : "+" })
                ]
              }
            ),
            Z ? Za[N].map(et) : null
          ] }, N);
        }) : (hj[h] || []).map(et),
        /* @__PURE__ */ m.jsx(ie, { label: "Добавить своё", value: M, onChange: D, placeholder: "Название упражнения" })
      ] })
    ] }),
    /* @__PURE__ */ m.jsx(Wi, { label: "Длительность", options: ["30 мин", "45 мин", "60+ мин"], value: p, onChange: g }),
    /* @__PURE__ */ m.jsx(Wi, { label: "Как ощущалось", options: ["Легко", "Нормально", "Тяжело"], value: v, onChange: b }),
    /* @__PURE__ */ m.jsx(
      Wt,
      {
        variant: "filled",
        label: A ? "Сохраняю…" : "Сохранить и разобрать",
        isFill: !0,
        disabled: A,
        ...se("Сохранить и разобрать", F)
      }
    )
  ] }) }) });
}
function hA({ isOpen: a, onClose: e, options: l, onSelect: s }) {
  return /* @__PURE__ */ m.jsx(bn, { isOpen: a, onClose: e, children: /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-tma-blocks", children: [
    /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsx(
      pt.Text,
      {
        title: "Рекомендация на сегодня",
        description: "Выбери вариант, после которого останется запас сил."
      }
    ) }) }),
    /* @__PURE__ */ m.jsx(yt.Item, { children: l.map((r, c) => /* @__PURE__ */ m.jsx(
      Yt,
      {
        title: r.name || `Вариант ${c + 1}`,
        description: r.how || r.benefit || r.detail,
        onClick: () => s(r)
      },
      r.name || c
    )) })
  ] }) });
}
function mA({ isOpen: a, onClose: e, state: l, onAdd: s }) {
  const r = l?.today || [];
  return /* @__PURE__ */ m.jsx(bn, { isOpen: a, onClose: e, children: /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-tma-blocks", children: [
    l?.last_review ? /* @__PURE__ */ m.jsx(
      ws,
      {
        message: l.last_review.text || l.last_review,
        onDiscuss: () => nl({ topic: "train" })
      }
    ) : null,
    /* @__PURE__ */ m.jsx(yt.Item, { header: "Неделя", children: (l?.week || []).map((c) => /* @__PURE__ */ m.jsx(
      Yt,
      {
        title: c.dow,
        description: c.count ? `${c.type || "Тренировка"} · ${c.count}` : "Без тренировки",
        muted: !c.count
      },
      c.d
    )) }),
    r.length ? /* @__PURE__ */ m.jsx(yt.Item, { header: "Сегодня", children: r.map((c) => /* @__PURE__ */ m.jsx(
      Yt,
      {
        title: c.type || "Тренировка",
        description: `${c.duration || "—"} · ${String(c.rpe || "").toLowerCase()}`
      },
      c.id
    )) }) : null,
    /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(pt, { tappable: !1, children: /* @__PURE__ */ m.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ m.jsx(
      Wt,
      {
        variant: "filled",
        label: "Отметить тренировку",
        isFill: !0,
        ...se("Отметить тренировку", s)
      }
    ) }) }) })
  ] }) });
}
function pA({ isOpen: a, onClose: e, profile: l, onSaved: s }) {
  const [r, c] = E.useState(l || {});
  E.useEffect(() => {
    a && c(l || {});
  }, [a, l]);
  const f = (y, p) => c((g) => ({ ...g, [y]: p })), h = async () => {
    (await qt("/api/train_profile", r).catch(() => null))?.ok ? (Ot("Тренировочный профиль сохранён", { type: "success" }), await s(), e()) : Ot("Не получилось сохранить", { type: "error" });
  };
  return /* @__PURE__ */ m.jsx(bn, { isOpen: a, onClose: e, children: /* @__PURE__ */ m.jsx("div", { children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: "Расскажи, чем занимаешься и что важно беречь. Айва учтёт это в рекомендациях и разборе нагрузки." }),
    /* @__PURE__ */ m.jsx(ie, { label: "Формат", value: r.format || "", onChange: (y) => f("format", y), placeholder: "Зал и прогулки" }),
    /* @__PURE__ */ m.jsx(ie, { label: "Цель", value: r.goal || "", onChange: (y) => f("goal", y), placeholder: "Тонус и больше энергии" }),
    /* @__PURE__ */ m.jsx(ie, { label: "Ограничения", value: r.limits || "", onChange: (y) => f("limits", y), placeholder: "Например, бережём поясницу" }),
    /* @__PURE__ */ m.jsx(Wt, { variant: "filled", label: "Сохранить", isFill: !0, ...se("Сохранить профиль", h) })
  ] }) }) });
}
const yA = ["trainingSection", "train"], gA = (a) => {
  const e = a % 100, l = a % 10;
  return e >= 11 && e <= 14 ? "тренировок" : l === 1 ? "тренировка" : l >= 2 && l <= 4 ? "тренировки" : "тренировок";
}, vA = (a) => {
  const e = new Set((a || []).filter((l) => l.count).map((l) => l.d));
  return yx(30).map((l) => ({ ...l, workout: e.has(l.iso) }));
}, bA = [
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
], lv = (a, ...e) => {
  if (!a) return null;
  for (const s of e) {
    const r = a[String(s || "").trim()];
    if (r) return r + "?v=1";
  }
  const l = e.filter(Boolean).join(" ").toLowerCase();
  for (const [s, r] of Object.entries(a))
    if (l.includes(s.toLowerCase())) return r + "?v=1";
  for (const [s, r] of bA)
    if (l.includes(s) && a[r]) return a[r] + "?v=1";
  return a.Силовая && /трениров/.test(l) ? a.Силовая + "?v=1" : null;
};
function xA({ mode: a, revision: e = 0 }) {
  const [l, s] = px(yA, [a, e]), r = typeof window.aiwaData == "function" ? window.aiwaData() : window.aiwaData, c = r?.mode === "male", [f, h] = E.useState(!1), [y, p] = E.useState(""), [g, v] = E.useState(null), [b, T] = E.useState({}), [S, w] = E.useState(""), [j, M] = E.useState(null);
  E.useEffect(() => {
    fetch("/assets/train/manifest.json?v=1").then((V) => V.ok ? V.json() : {}).then((V) => T(V || {})).catch(() => {
    });
  }, []);
  const D = () => s("train");
  if (!l.trainingSection || !l.train) return /* @__PURE__ */ m.jsx(hx, { title: "Нагрузка", variant: "activity" });
  const A = l.trainingSection, R = l.train, B = A.training || {}, U = (B.options || []).slice(0, 4), _ = R.today || [], H = R.week || [], P = H.filter((V) => V.count).slice(-3).reverse(), K = H.reduce((V, Z) => V + (Z.count || 0), 0), it = (V = null) => {
    v(V), p("workout");
  }, at = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), I = !!(S && S !== at), F = async (V) => {
    const Z = typeof V == "string" ? V : V?.iso || "";
    if (w(Z), !Z || Z === at) {
      M(null);
      return;
    }
    M(null);
    const nt = await qt("/api/train_day", { d: Z }).catch(() => null);
    M(nt?.workouts || []);
  }, et = (() => {
    if (!I) return "Прошедшие тренировки";
    const V = /* @__PURE__ */ new Date(`${S}T12:00:00`);
    return Number.isNaN(V.getTime()) ? "Тренировки за день" : `Тренировки за ${new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }).format(V)}`;
  })(), N = I ? j || [] : _.slice().reverse();
  return /* @__PURE__ */ m.jsx(ol, { children: /* @__PURE__ */ m.jsx(sl, { mode: "secondary", children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-paper-screen aiwa-activity-screen", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-screen-titlebar", children: [
      /* @__PURE__ */ m.jsx(lt, { className: "aiwa-screen-title", variant: "title1", weight: "semibold", children: "Нагрузка" }),
      c ? /* @__PURE__ */ m.jsx(
        "button",
        {
          type: "button",
          className: "aiwa-avatar-initial aiwa-screen-profile",
          "aria-label": "Открыть профиль",
          onClick: () => h(!0),
          children: /* @__PURE__ */ m.jsx(Fj, {})
        }
      ) : null
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-overview", children: [
      /* @__PURE__ */ m.jsx(qh, { days: vA(H), selectedIso: S || at, onSelect: F }),
      /* @__PURE__ */ m.jsxs("div", { className: "aiwa-countdown", children: [
        /* @__PURE__ */ m.jsx(lt, { variant: "title1", weight: "semibold", children: K }),
        /* @__PURE__ */ m.jsx(lt, { variant: "body", weight: "regular", children: `${gA(K)} на этой неделе` })
      ] }),
      /* @__PURE__ */ m.jsx(
        Wt,
        {
          variant: "filled",
          label: /* @__PURE__ */ m.jsxs("span", { className: "aiwa-btn-icon-label", children: [
            /* @__PURE__ */ m.jsx(Gr, {}),
            " Отметить тренировку"
          ] }),
          ...se("Отметить тренировку", () => it())
        }
      )
    ] }),
    /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-tma-blocks", children: [
      /* @__PURE__ */ m.jsx(
        ws,
        {
          message: B.summary || A.text || "Выбирай нагрузку, после которой станет легче, а не хуже.",
          detail: B.why,
          onDiscuss: () => nl({ topic: "train" })
        }
      ),
      U.length ? /* @__PURE__ */ m.jsx(yt.Item, { header: "Варианты", children: U.map((V, Z) => /* @__PURE__ */ m.jsx(
        Yt,
        {
          image: lv(b, V.name),
          title: [V.name || `Вариант ${Z + 1}`, V.duration].filter(Boolean).join(" · "),
          description: [
            (V.exercises || []).map((nt) => [nt.name, nt.sets && nt.reps ? `${nt.sets}×${nt.reps}` : ""].filter(Boolean).join(" ")).join(", "),
            V.tip || V.benefit || V.how || V.detail
          ].filter(Boolean).join(" — "),
          onClick: () => it(V)
        },
        V.name || Z
      )) }) : null,
      /* @__PURE__ */ m.jsxs(yt.Item, { header: et, children: [
        I && !j ? /* @__PURE__ */ m.jsx(Yt, { loading: !0, title: "Загружаю…", description: "Тренировки за выбранный день" }) : null,
        N.length ? N.map((V) => /* @__PURE__ */ m.jsx(
          Yt,
          {
            image: lv(b, V.type),
            title: V.type || "Тренировка",
            description: [
              I ? "" : "сегодня",
              V.duration,
              V.kcal ? `${Math.round(V.kcal)} ккал` : "",
              String(V.rpe || "").toLowerCase()
            ].filter(Boolean).join(" · "),
            onClick: () => p("history")
          },
          V.id
        )) : I && !j ? null : I ? /* @__PURE__ */ m.jsx(Yt, { title: "В этот день тренировок нет", description: "Выбери другой день или отметь тренировку." }) : P.length ? P.map((V) => /* @__PURE__ */ m.jsx(
          Yt,
          {
            title: V.type || "Тренировка",
            description: `${V.d} · ${V.count} запись`,
            onClick: () => p("history")
          },
          V.d
        )) : /* @__PURE__ */ m.jsx(
          Yt,
          {
            title: "История пока пуста",
            description: "Отметь первую тренировку — Айва подготовит разбор.",
            onClick: () => p("history")
          }
        )
      ] }),
      /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(
        pt,
        {
          as: "button",
          type: "button",
          onClick: () => p("profile"),
          end: /* @__PURE__ */ m.jsx(pt.Part, { type: "Chevron" }),
          children: /* @__PURE__ */ m.jsx(pt.Text, { title: "Настроить тренировочный профиль", bold: !0 })
        }
      ) })
    ] }),
    c ? /* @__PURE__ */ m.jsx(Yh, { isOpen: f, onClose: () => h(!1) }) : null,
    /* @__PURE__ */ m.jsx(dA, { isOpen: y === "workout", onClose: () => p(""), onSaved: D, suggested: g }),
    /* @__PURE__ */ m.jsx(
      hA,
      {
        isOpen: y === "variants",
        onClose: () => p(""),
        options: U,
        onSelect: (V) => it(V)
      }
    ),
    /* @__PURE__ */ m.jsx(mA, { isOpen: y === "history", onClose: () => p(""), state: R, onAdd: () => it() }),
    /* @__PURE__ */ m.jsx(pA, { isOpen: y === "profile", onClose: () => p(""), profile: R.profile, onSaved: D })
  ] }) }) });
}
function SA({ initialMessages: a = [] }) {
  const [e, l] = E.useState(() => a.map((S, w) => ({
    id: `initial-${w}`,
    role: S.role === "user" ? "user" : "assistant",
    text: S.text || "",
    suggestions: []
  }))), [s, r] = E.useState(""), [c, f] = E.useState(!1), [h, y] = E.useState(!1), p = Jf.useRef(null), g = Jf.useRef(null);
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
    r(""), l((M) => [...M, { id: `user-${Date.now()}`, role: "user", text: w, suggestions: [] }]), f(!0);
    const j = await qt("/api/chat", { message: w }).catch(() => null);
    l((M) => [...M, {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      text: j?.answer || "Не получилось ответить, попробуй ещё раз.",
      suggestions: j?.suggestions || []
    }]), f(!1);
  }, b = async (S, w) => {
    f(!0);
    const j = new FormData();
    j.append("initData", window.aiwaInit || ""), j.append("audio", S, w?.includes("mp4") ? "voice.mp4" : "voice.webm");
    try {
      const D = await (await fetch("/api/voice", { method: "POST", body: j })).json();
      D.transcript && l((A) => [...A, { id: `voice-${Date.now()}`, role: "user", text: D.transcript, suggestions: [] }]), l((A) => [...A, {
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
      const S = await navigator.mediaDevices.getUserMedia({ audio: !0 }), w = [], j = new MediaRecorder(S);
      p.current = j, j.ondataavailable = (M) => {
        M.data?.size && w.push(M.data);
      }, j.onstop = () => {
        y(!1), S.getTracks().forEach((D) => D.stop());
        const M = new Blob(w, { type: j.mimeType || "audio/webm" });
        M.size > 900 && b(M, j.mimeType);
      }, j.start(), y(!0);
    } catch {
      Ot("Нет доступа к микрофону", { type: "error" });
    }
  };
  return /* @__PURE__ */ m.jsx(ol, { children: /* @__PURE__ */ m.jsx(sl, { mode: "secondary", children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-chat-screen", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-chat-header", children: [
      /* @__PURE__ */ m.jsx(Gh, { size: 50, frames: $h, pauseMs: 0 }),
      /* @__PURE__ */ m.jsxs("div", { children: [
        /* @__PURE__ */ m.jsx(lt, { variant: "title3", weight: "semibold", children: "Айва" }),
        /* @__PURE__ */ m.jsx(lt, { variant: "caption1", weight: "regular", children: "учитывает твои данные" })
      ] }),
      /* @__PURE__ */ m.jsx(Ce, { as: "button", type: "button", mode: "opacity", className: "aiwa-sheet-close", "aria-label": "Закрыть чат", onClick: () => vn("go", "today"), children: /* @__PURE__ */ m.jsx(Jb, {}) })
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
const sv = [
  { id: "today", label: "Главная", icon: /* @__PURE__ */ m.jsx(KE, {}) },
  { id: "food", label: "Питание", icon: /* @__PURE__ */ m.jsx(FE, {}) },
  { id: "train", label: "Нагрузка", icon: /* @__PURE__ */ m.jsx(JE, {}) }
];
function wA({ active: a }) {
  const s = sv, r = a === "stats" ? "today" : a, c = Math.max(0, s.findIndex((f) => f.id === r));
  return /* @__PURE__ */ m.jsx(ol, { children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-nav-root", "data-aiwa-nav": "true", children: [
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-nav-tabbar-layer", children: /* @__PURE__ */ m.jsx(
      GE,
      {
        tabs: s.map(({ label: f, icon: h }) => ({ label: f, icon: h })),
        defaultIndex: c,
        onChange: (f) => vn("go", s[f].id)
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
        onClick: () => nl(),
        children: /* @__PURE__ */ m.jsx(Gh, { size: 67 })
      }
    )
  ] }) });
}
let Ja = null, Pf = null, Wa = null, us = "", Ld = !1, Bd = 0, Kf = null, ov = null, ls = null, Zf = null, rr = {}, ur = 0, Qf = null, rv = null, uv = {}, cv = 0, Ff = null, fv = null;
const Qa = () => {
  !Ja || !Wa || Ja.render(
    /* @__PURE__ */ m.jsx(
      Jj,
      {
        ...Wa,
        panel: us,
        panelRevision: Bd,
        profileOpen: Ld,
        onPanelClose: () => Vd.closePanel(),
        onProfileClose: () => Vd.closeProfile()
      }
    )
  );
}, Vd = {
  renderHome(a, e) {
    a && (Pf !== a && (Ja?.unmount(), Pf = a, Ja = Gi.createRoot(a)), Wa = e, us = e.panel || us, Qa());
  },
  patchHome(a) {
    !Ja || !Wa || (Wa = { ...Wa, ...a }, Qa());
  },
  openPanel(a) {
    us = a, window.HOME_PANEL = a, Bd += 1, Qa();
  },
  closePanel() {
    us = "", window.HOME_PANEL = "", Qa();
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
    Ja?.unmount(), Ja = null, Pf = null, Wa = null;
  },
  // Повторный вызов для уже смонтированного экрана = «перечитай данные»:
  // так host сбрасывает loadedFood/loadedTrain после правок профиля.
  renderFood(a, e = {}) {
    a && (Zf !== a ? (ls?.unmount(), Zf = a, ls = Gi.createRoot(a)) : ur += 1, rr = e, ls.render(/* @__PURE__ */ m.jsx(iv, { ...rr, revision: ur })));
  },
  renderActivity(a, e = {}) {
    a && (rv !== a ? (Qf?.unmount(), rv = a, Qf = Gi.createRoot(a)) : cv += 1, uv = e, Qf.render(/* @__PURE__ */ m.jsx(xA, { ...uv, revision: cv })));
  },
  renderChat(a, e = {}) {
    a && (fv !== a && (Ff?.unmount(), fv = a, Ff = Gi.createRoot(a)), Ff.render(/* @__PURE__ */ m.jsx(SA, { initialMessages: e.messages || [] })));
  },
  refreshFood() {
    !Zf || !ls || (ur += 1, ls.render(/* @__PURE__ */ m.jsx(iv, { ...rr, mode: le("aiwaMode") || rr.mode, revision: ur })));
  },
  /** Прогрев данных «Питания» и «Нагрузки» на старте — чтобы табы открывались сразу. */
  prefetch() {
    sA();
  },
  renderNav(a, e) {
    a && (ov !== a && (Kf?.unmount(), ov = a, Kf = Gi.createRoot(a)), Kf.render(/* @__PURE__ */ m.jsx(wA, { active: e })));
  }
};
function TA() {
  window.AiwaDeslop = Vd, aj(), window.dispatchEvent(new CustomEvent("aiwa:deslop-ready"));
}
TA();
export {
  G3 as R,
  Ts as a,
  W3 as b,
  Hr as c,
  k3 as g,
  m as j,
  E as r
};
