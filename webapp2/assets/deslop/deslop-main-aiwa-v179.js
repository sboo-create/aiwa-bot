function H3(a, e) {
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
function $3(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var hf = { exports: {} }, as = {};
var Z0;
function q3() {
  if (Z0) return as;
  Z0 = 1;
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
  return as.Fragment = e, as.jsx = l, as.jsxs = l, as;
}
var Q0;
function Y3() {
  return Q0 || (Q0 = 1, hf.exports = q3()), hf.exports;
}
var m = Y3(), mf = { exports: {} }, bt = {};
var F0;
function G3() {
  if (F0) return bt;
  F0 = 1;
  var a = Symbol.for("react.transitional.element"), e = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), c = Symbol.for("react.consumer"), f = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), p = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), v = Symbol.for("react.activity"), b = Symbol.iterator;
  function T(_) {
    return _ === null || typeof _ != "object" ? null : (_ = b && _[b] || _["@@iterator"], typeof _ == "function" ? _ : null);
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
  }, S = Object.assign, E = {};
  function M(_, U, I) {
    this.props = _, this.context = U, this.refs = E, this.updater = I || w;
  }
  M.prototype.isReactComponent = {}, M.prototype.setState = function(_, U) {
    if (typeof _ != "object" && typeof _ != "function" && _ != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, _, U, "setState");
  }, M.prototype.forceUpdate = function(_) {
    this.updater.enqueueForceUpdate(this, _, "forceUpdate");
  };
  function R() {
  }
  R.prototype = M.prototype;
  function D(_, U, I) {
    this.props = _, this.context = U, this.refs = E, this.updater = I || w;
  }
  var N = D.prototype = new R();
  N.constructor = D, S(N, M.prototype), N.isPureReactComponent = !0;
  var V = Array.isArray;
  function z() {
  }
  var A = { H: null, A: null, T: null, S: null }, H = Object.prototype.hasOwnProperty;
  function G(_, U, I) {
    var lt = I.ref;
    return {
      $$typeof: a,
      type: _,
      key: U,
      ref: lt !== void 0 ? lt : null,
      props: I
    };
  }
  function K(_, U) {
    return G(_.type, U, _.props);
  }
  function nt(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === a;
  }
  function at(_) {
    var U = { "=": "=0", ":": "=2" };
    return "$" + _.replace(/[=:]/g, function(I) {
      return U[I];
    });
  }
  var tt = /\/+/g;
  function Z(_, U) {
    return typeof _ == "object" && _ !== null && _.key != null ? at("" + _.key) : U.toString(36);
  }
  function it(_) {
    switch (_.status) {
      case "fulfilled":
        return _.value;
      case "rejected":
        throw _.reason;
      default:
        switch (typeof _.status == "string" ? _.then(z, z) : (_.status = "pending", _.then(
          function(U) {
            _.status === "pending" && (_.status = "fulfilled", _.value = U);
          },
          function(U) {
            _.status === "pending" && (_.status = "rejected", _.reason = U);
          }
        )), _.status) {
          case "fulfilled":
            return _.value;
          case "rejected":
            throw _.reason;
        }
    }
    throw _;
  }
  function L(_, U, I, lt, ft) {
    var pt = typeof _;
    (pt === "undefined" || pt === "boolean") && (_ = null);
    var vt = !1;
    if (_ === null) vt = !0;
    else
      switch (pt) {
        case "bigint":
        case "string":
        case "number":
          vt = !0;
          break;
        case "object":
          switch (_.$$typeof) {
            case a:
            case e:
              vt = !0;
              break;
            case g:
              return vt = _._init, L(
                vt(_._payload),
                U,
                I,
                lt,
                ft
              );
          }
      }
    if (vt)
      return ft = ft(_), vt = lt === "" ? "." + Z(_, 0) : lt, V(ft) ? (I = "", vt != null && (I = vt.replace(tt, "$&/") + "/"), L(ft, U, I, "", function(Pt) {
        return Pt;
      })) : ft != null && (nt(ft) && (ft = K(
        ft,
        I + (ft.key == null || _ && _.key === ft.key ? "" : ("" + ft.key).replace(
          tt,
          "$&/"
        ) + "/") + vt
      )), U.push(ft)), 1;
    vt = 0;
    var Rt = lt === "" ? "." : lt + ":";
    if (V(_))
      for (var Mt = 0; Mt < _.length; Mt++)
        lt = _[Mt], pt = Rt + Z(lt, Mt), vt += L(
          lt,
          U,
          I,
          pt,
          ft
        );
    else if (Mt = T(_), typeof Mt == "function")
      for (_ = Mt.call(_), Mt = 0; !(lt = _.next()).done; )
        lt = lt.value, pt = Rt + Z(lt, Mt++), vt += L(
          lt,
          U,
          I,
          pt,
          ft
        );
    else if (pt === "object") {
      if (typeof _.then == "function")
        return L(
          it(_),
          U,
          I,
          lt,
          ft
        );
      throw U = String(_), Error(
        "Objects are not valid as a React child (found: " + (U === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : U) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return vt;
  }
  function $(_, U, I) {
    if (_ == null) return _;
    var lt = [], ft = 0;
    return L(_, lt, "", "", function(pt) {
      return U.call(I, pt, ft++);
    }), lt;
  }
  function et(_) {
    if (_._status === -1) {
      var U = _._result;
      U = U(), U.then(
        function(I) {
          (_._status === 0 || _._status === -1) && (_._status = 1, _._result = I);
        },
        function(I) {
          (_._status === 0 || _._status === -1) && (_._status = 2, _._result = I);
        }
      ), _._status === -1 && (_._status = 0, _._result = U);
    }
    if (_._status === 1) return _._result.default;
    throw _._result;
  }
  var st = typeof reportError == "function" ? reportError : function(_) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var U = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof _ == "object" && _ !== null && typeof _.message == "string" ? String(_.message) : String(_),
        error: _
      });
      if (!window.dispatchEvent(U)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", _);
      return;
    }
    console.error(_);
  }, J = {
    map: $,
    forEach: function(_, U, I) {
      $(
        _,
        function() {
          U.apply(this, arguments);
        },
        I
      );
    },
    count: function(_) {
      var U = 0;
      return $(_, function() {
        U++;
      }), U;
    },
    toArray: function(_) {
      return $(_, function(U) {
        return U;
      }) || [];
    },
    only: function(_) {
      if (!nt(_))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return _;
    }
  };
  return bt.Activity = v, bt.Children = J, bt.Component = M, bt.Fragment = l, bt.Profiler = r, bt.PureComponent = D, bt.StrictMode = s, bt.Suspense = y, bt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = A, bt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(_) {
      return A.H.useMemoCache(_);
    }
  }, bt.cache = function(_) {
    return function() {
      return _.apply(null, arguments);
    };
  }, bt.cacheSignal = function() {
    return null;
  }, bt.cloneElement = function(_, U, I) {
    if (_ == null)
      throw Error(
        "The argument must be a React element, but you passed " + _ + "."
      );
    var lt = S({}, _.props), ft = _.key;
    if (U != null)
      for (pt in U.key !== void 0 && (ft = "" + U.key), U)
        !H.call(U, pt) || pt === "key" || pt === "__self" || pt === "__source" || pt === "ref" && U.ref === void 0 || (lt[pt] = U[pt]);
    var pt = arguments.length - 2;
    if (pt === 1) lt.children = I;
    else if (1 < pt) {
      for (var vt = Array(pt), Rt = 0; Rt < pt; Rt++)
        vt[Rt] = arguments[Rt + 2];
      lt.children = vt;
    }
    return G(_.type, ft, lt);
  }, bt.createContext = function(_) {
    return _ = {
      $$typeof: f,
      _currentValue: _,
      _currentValue2: _,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, _.Provider = _, _.Consumer = {
      $$typeof: c,
      _context: _
    }, _;
  }, bt.createElement = function(_, U, I) {
    var lt, ft = {}, pt = null;
    if (U != null)
      for (lt in U.key !== void 0 && (pt = "" + U.key), U)
        H.call(U, lt) && lt !== "key" && lt !== "__self" && lt !== "__source" && (ft[lt] = U[lt]);
    var vt = arguments.length - 2;
    if (vt === 1) ft.children = I;
    else if (1 < vt) {
      for (var Rt = Array(vt), Mt = 0; Mt < vt; Mt++)
        Rt[Mt] = arguments[Mt + 2];
      ft.children = Rt;
    }
    if (_ && _.defaultProps)
      for (lt in vt = _.defaultProps, vt)
        ft[lt] === void 0 && (ft[lt] = vt[lt]);
    return G(_, pt, ft);
  }, bt.createRef = function() {
    return { current: null };
  }, bt.forwardRef = function(_) {
    return { $$typeof: h, render: _ };
  }, bt.isValidElement = nt, bt.lazy = function(_) {
    return {
      $$typeof: g,
      _payload: { _status: -1, _result: _ },
      _init: et
    };
  }, bt.memo = function(_, U) {
    return {
      $$typeof: p,
      type: _,
      compare: U === void 0 ? null : U
    };
  }, bt.startTransition = function(_) {
    var U = A.T, I = {};
    A.T = I;
    try {
      var lt = _(), ft = A.S;
      ft !== null && ft(I, lt), typeof lt == "object" && lt !== null && typeof lt.then == "function" && lt.then(z, st);
    } catch (pt) {
      st(pt);
    } finally {
      U !== null && I.types !== null && (U.types = I.types), A.T = U;
    }
  }, bt.unstable_useCacheRefresh = function() {
    return A.H.useCacheRefresh();
  }, bt.use = function(_) {
    return A.H.use(_);
  }, bt.useActionState = function(_, U, I) {
    return A.H.useActionState(_, U, I);
  }, bt.useCallback = function(_, U) {
    return A.H.useCallback(_, U);
  }, bt.useContext = function(_) {
    return A.H.useContext(_);
  }, bt.useDebugValue = function() {
  }, bt.useDeferredValue = function(_, U) {
    return A.H.useDeferredValue(_, U);
  }, bt.useEffect = function(_, U) {
    return A.H.useEffect(_, U);
  }, bt.useEffectEvent = function(_) {
    return A.H.useEffectEvent(_);
  }, bt.useId = function() {
    return A.H.useId();
  }, bt.useImperativeHandle = function(_, U, I) {
    return A.H.useImperativeHandle(_, U, I);
  }, bt.useInsertionEffect = function(_, U) {
    return A.H.useInsertionEffect(_, U);
  }, bt.useLayoutEffect = function(_, U) {
    return A.H.useLayoutEffect(_, U);
  }, bt.useMemo = function(_, U) {
    return A.H.useMemo(_, U);
  }, bt.useOptimistic = function(_, U) {
    return A.H.useOptimistic(_, U);
  }, bt.useReducer = function(_, U, I) {
    return A.H.useReducer(_, U, I);
  }, bt.useRef = function(_) {
    return A.H.useRef(_);
  }, bt.useState = function(_) {
    return A.H.useState(_);
  }, bt.useSyncExternalStore = function(_, U, I) {
    return A.H.useSyncExternalStore(
      _,
      U,
      I
    );
  }, bt.useTransition = function() {
    return A.H.useTransition();
  }, bt.version = "19.2.7", bt;
}
var J0;
function js() {
  return J0 || (J0 = 1, mf.exports = G3()), mf.exports;
}
var j = js();
const nd = /* @__PURE__ */ $3(j), X3 = /* @__PURE__ */ H3({
  __proto__: null,
  default: nd
}, [j]);
var pf = { exports: {} }, is = {}, yf = { exports: {} }, gf = {};
var W0;
function P3() {
  return W0 || (W0 = 1, (function(a) {
    function e(L, $) {
      var et = L.length;
      L.push($);
      t: for (; 0 < et; ) {
        var st = et - 1 >>> 1, J = L[st];
        if (0 < r(J, $))
          L[st] = $, L[et] = J, et = st;
        else break t;
      }
    }
    function l(L) {
      return L.length === 0 ? null : L[0];
    }
    function s(L) {
      if (L.length === 0) return null;
      var $ = L[0], et = L.pop();
      if (et !== $) {
        L[0] = et;
        t: for (var st = 0, J = L.length, _ = J >>> 1; st < _; ) {
          var U = 2 * (st + 1) - 1, I = L[U], lt = U + 1, ft = L[lt];
          if (0 > r(I, et))
            lt < J && 0 > r(ft, I) ? (L[st] = ft, L[lt] = et, st = lt) : (L[st] = I, L[U] = et, st = U);
          else if (lt < J && 0 > r(ft, et))
            L[st] = ft, L[lt] = et, st = lt;
          else break t;
        }
      }
      return $;
    }
    function r(L, $) {
      var et = L.sortIndex - $.sortIndex;
      return et !== 0 ? et : L.id - $.id;
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
    var y = [], p = [], g = 1, v = null, b = 3, T = !1, w = !1, S = !1, E = !1, M = typeof setTimeout == "function" ? setTimeout : null, R = typeof clearTimeout == "function" ? clearTimeout : null, D = typeof setImmediate < "u" ? setImmediate : null;
    function N(L) {
      for (var $ = l(p); $ !== null; ) {
        if ($.callback === null) s(p);
        else if ($.startTime <= L)
          s(p), $.sortIndex = $.expirationTime, e(y, $);
        else break;
        $ = l(p);
      }
    }
    function V(L) {
      if (S = !1, N(L), !w)
        if (l(y) !== null)
          w = !0, z || (z = !0, at());
        else {
          var $ = l(p);
          $ !== null && it(V, $.startTime - L);
        }
    }
    var z = !1, A = -1, H = 5, G = -1;
    function K() {
      return E ? !0 : !(a.unstable_now() - G < H);
    }
    function nt() {
      if (E = !1, z) {
        var L = a.unstable_now();
        G = L;
        var $ = !0;
        try {
          t: {
            w = !1, S && (S = !1, R(A), A = -1), T = !0;
            var et = b;
            try {
              e: {
                for (N(L), v = l(y); v !== null && !(v.expirationTime > L && K()); ) {
                  var st = v.callback;
                  if (typeof st == "function") {
                    v.callback = null, b = v.priorityLevel;
                    var J = st(
                      v.expirationTime <= L
                    );
                    if (L = a.unstable_now(), typeof J == "function") {
                      v.callback = J, N(L), $ = !0;
                      break e;
                    }
                    v === l(y) && s(y), N(L);
                  } else s(y);
                  v = l(y);
                }
                if (v !== null) $ = !0;
                else {
                  var _ = l(p);
                  _ !== null && it(
                    V,
                    _.startTime - L
                  ), $ = !1;
                }
              }
              break t;
            } finally {
              v = null, b = et, T = !1;
            }
            $ = void 0;
          }
        } finally {
          $ ? at() : z = !1;
        }
      }
    }
    var at;
    if (typeof D == "function")
      at = function() {
        D(nt);
      };
    else if (typeof MessageChannel < "u") {
      var tt = new MessageChannel(), Z = tt.port2;
      tt.port1.onmessage = nt, at = function() {
        Z.postMessage(null);
      };
    } else
      at = function() {
        M(nt, 0);
      };
    function it(L, $) {
      A = M(function() {
        L(a.unstable_now());
      }, $);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(L) {
      L.callback = null;
    }, a.unstable_forceFrameRate = function(L) {
      0 > L || 125 < L ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : H = 0 < L ? Math.floor(1e3 / L) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return b;
    }, a.unstable_next = function(L) {
      switch (b) {
        case 1:
        case 2:
        case 3:
          var $ = 3;
          break;
        default:
          $ = b;
      }
      var et = b;
      b = $;
      try {
        return L();
      } finally {
        b = et;
      }
    }, a.unstable_requestPaint = function() {
      E = !0;
    }, a.unstable_runWithPriority = function(L, $) {
      switch (L) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          L = 3;
      }
      var et = b;
      b = L;
      try {
        return $();
      } finally {
        b = et;
      }
    }, a.unstable_scheduleCallback = function(L, $, et) {
      var st = a.unstable_now();
      switch (typeof et == "object" && et !== null ? (et = et.delay, et = typeof et == "number" && 0 < et ? st + et : st) : et = st, L) {
        case 1:
          var J = -1;
          break;
        case 2:
          J = 250;
          break;
        case 5:
          J = 1073741823;
          break;
        case 4:
          J = 1e4;
          break;
        default:
          J = 5e3;
      }
      return J = et + J, L = {
        id: g++,
        callback: $,
        priorityLevel: L,
        startTime: et,
        expirationTime: J,
        sortIndex: -1
      }, et > st ? (L.sortIndex = et, e(p, L), l(y) === null && L === l(p) && (S ? (R(A), A = -1) : S = !0, it(V, et - st))) : (L.sortIndex = J, e(y, L), w || T || (w = !0, z || (z = !0, at()))), L;
    }, a.unstable_shouldYield = K, a.unstable_wrapCallback = function(L) {
      var $ = b;
      return function() {
        var et = b;
        b = $;
        try {
          return L.apply(this, arguments);
        } finally {
          b = et;
        }
      };
    };
  })(gf)), gf;
}
var I0;
function K3() {
  return I0 || (I0 = 1, yf.exports = P3()), yf.exports;
}
var vf = { exports: {} }, Ee = {};
var ty;
function Z3() {
  if (ty) return Ee;
  ty = 1;
  var a = js();
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
  return Ee.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, Ee.createPortal = function(y, p) {
    var g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(e(299));
    return c(y, p, null, g);
  }, Ee.flushSync = function(y) {
    var p = f.T, g = s.p;
    try {
      if (f.T = null, s.p = 2, y) return y();
    } finally {
      f.T = p, s.p = g, s.d.f();
    }
  }, Ee.preconnect = function(y, p) {
    typeof y == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, s.d.C(y, p));
  }, Ee.prefetchDNS = function(y) {
    typeof y == "string" && s.d.D(y);
  }, Ee.preinit = function(y, p) {
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
  }, Ee.preinitModule = function(y, p) {
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
  }, Ee.preload = function(y, p) {
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
  }, Ee.preloadModule = function(y, p) {
    if (typeof y == "string")
      if (p) {
        var g = h(p.as, p.crossOrigin);
        s.d.m(y, {
          as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0,
          crossOrigin: g,
          integrity: typeof p.integrity == "string" ? p.integrity : void 0
        });
      } else s.d.m(y);
  }, Ee.requestFormReset = function(y) {
    s.d.r(y);
  }, Ee.unstable_batchedUpdates = function(y, p) {
    return y(p);
  }, Ee.useFormState = function(y, p, g) {
    return f.H.useFormState(y, p, g);
  }, Ee.useFormStatus = function() {
    return f.H.useHostTransitionStatus();
  }, Ee.version = "19.2.7", Ee;
}
var ey;
function pv() {
  if (ey) return vf.exports;
  ey = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (e) {
        console.error(e);
      }
  }
  return a(), vf.exports = Z3(), vf.exports;
}
var ny;
function Q3() {
  if (ny) return is;
  ny = 1;
  var a = K3(), e = js(), l = pv();
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
  var v = Object.assign, b = Symbol.for("react.element"), T = Symbol.for("react.transitional.element"), w = Symbol.for("react.portal"), S = Symbol.for("react.fragment"), E = Symbol.for("react.strict_mode"), M = Symbol.for("react.profiler"), R = Symbol.for("react.consumer"), D = Symbol.for("react.context"), N = Symbol.for("react.forward_ref"), V = Symbol.for("react.suspense"), z = Symbol.for("react.suspense_list"), A = Symbol.for("react.memo"), H = Symbol.for("react.lazy"), G = Symbol.for("react.activity"), K = Symbol.for("react.memo_cache_sentinel"), nt = Symbol.iterator;
  function at(t) {
    return t === null || typeof t != "object" ? null : (t = nt && t[nt] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var tt = Symbol.for("react.client.reference");
  function Z(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === tt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case S:
        return "Fragment";
      case M:
        return "Profiler";
      case E:
        return "StrictMode";
      case V:
        return "Suspense";
      case z:
        return "SuspenseList";
      case G:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case w:
          return "Portal";
        case D:
          return t.displayName || "Context";
        case R:
          return (t._context.displayName || "Context") + ".Consumer";
        case N:
          var n = t.render;
          return t = t.displayName, t || (t = n.displayName || n.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case A:
          return n = t.displayName || null, n !== null ? n : Z(t.type) || "Memo";
        case H:
          n = t._payload, t = t._init;
          try {
            return Z(t(n));
          } catch {
          }
      }
    return null;
  }
  var it = Array.isArray, L = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $ = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, et = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, st = [], J = -1;
  function _(t) {
    return { current: t };
  }
  function U(t) {
    0 > J || (t.current = st[J], st[J] = null, J--);
  }
  function I(t, n) {
    J++, st[J] = t.current, t.current = n;
  }
  var lt = _(null), ft = _(null), pt = _(null), vt = _(null);
  function Rt(t, n) {
    switch (I(pt, n), I(ft, t), I(lt, null), n.nodeType) {
      case 9:
      case 11:
        t = (t = n.documentElement) && (t = t.namespaceURI) ? g0(t) : 0;
        break;
      default:
        if (t = n.tagName, n = n.namespaceURI)
          n = g0(n), t = v0(n, t);
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
    U(lt), I(lt, t);
  }
  function Mt() {
    U(lt), U(ft), U(pt);
  }
  function Pt(t) {
    t.memoizedState !== null && I(vt, t);
    var n = lt.current, i = v0(n, t.type);
    n !== i && (I(ft, t), I(lt, i));
  }
  function Kt(t) {
    ft.current === t && (U(lt), U(ft)), vt.current === t && (U(vt), Il._currentValue = et);
  }
  var pe, Ae;
  function Qe(t) {
    if (pe === void 0)
      try {
        throw Error();
      } catch (i) {
        var n = i.stack.trim().match(/\n( *(at )?)/);
        pe = n && n[1] || "", Ae = -1 < i.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < i.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + pe + t + Ae;
  }
  var Qn = !1;
  function Ma(t, n) {
    if (!t || Qn) return "";
    Qn = !0;
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
                } catch (P) {
                  var X = P;
                }
                Reflect.construct(t, [], W);
              } else {
                try {
                  W.call();
                } catch (P) {
                  X = P;
                }
                t.call(W.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (P) {
                X = P;
              }
              (W = t()) && typeof W.catch == "function" && W.catch(function() {
              });
            }
          } catch (P) {
            if (P && X && typeof P.stack == "string")
              return [P.stack, X.stack];
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
`), Y = C.split(`
`);
        for (u = o = 0; o < O.length && !O[o].includes("DetermineComponentFrameRoot"); )
          o++;
        for (; u < Y.length && !Y[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (o === O.length || u === Y.length)
          for (o = O.length - 1, u = Y.length - 1; 1 <= o && 0 <= u && O[o] !== Y[u]; )
            u--;
        for (; 1 <= o && 0 <= u; o--, u--)
          if (O[o] !== Y[u]) {
            if (o !== 1 || u !== 1)
              do
                if (o--, u--, 0 > u || O[o] !== Y[u]) {
                  var Q = `
` + O[o].replace(" at new ", " at ");
                  return t.displayName && Q.includes("<anonymous>") && (Q = Q.replace("<anonymous>", t.displayName)), Q;
                }
              while (1 <= o && 0 <= u);
            break;
          }
      }
    } finally {
      Qn = !1, Error.prepareStackTrace = i;
    }
    return (i = t ? t.displayName || t.name : "") ? Qe(i) : "";
  }
  function Jr(t, n) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Qe(t.type);
      case 16:
        return Qe("Lazy");
      case 13:
        return t.child !== n && n !== null ? Qe("Suspense Fallback") : Qe("Suspense");
      case 19:
        return Qe("SuspenseList");
      case 0:
      case 15:
        return Ma(t.type, !1);
      case 11:
        return Ma(t.type.render, !1);
      case 1:
        return Ma(t.type, !0);
      case 31:
        return Qe("Activity");
      default:
        return "";
    }
  }
  function Rs(t) {
    try {
      var n = "", i = null;
      do
        n += Jr(t, i), i = t, t = t.return;
      while (t);
      return n;
    } catch (o) {
      return `
Error generating stack: ` + o.message + `
` + o.stack;
    }
  }
  var rl = Object.prototype.hasOwnProperty, ul = a.unstable_scheduleCallback, cl = a.unstable_cancelCallback, Wr = a.unstable_shouldYield, Ir = a.unstable_requestPaint, ot = a.unstable_now, Vt = a.unstable_getCurrentPriorityLevel, xn = a.unstable_ImmediatePriority, Ns = a.unstable_UserBlockingPriority, Fn = a.unstable_NormalPriority, Os = a.unstable_LowPriority, Jh = a.unstable_IdlePriority, wx = a.log, Tx = a.unstable_setDisableYieldValue, fl = null, ke = null;
  function Jn(t) {
    if (typeof wx == "function" && Tx(t), ke && typeof ke.setStrictMode == "function")
      try {
        ke.setStrictMode(fl, t);
      } catch {
      }
  }
  var Ue = Math.clz32 ? Math.clz32 : Ex, Cx = Math.log, jx = Math.LN2;
  function Ex(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Cx(t) / jx | 0) | 0;
  }
  var zs = 256, Bs = 262144, Ls = 4194304;
  function _a(t) {
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
  function Vs(t, n, i) {
    var o = t.pendingLanes;
    if (o === 0) return 0;
    var u = 0, d = t.suspendedLanes, x = t.pingedLanes;
    t = t.warmLanes;
    var C = o & 134217727;
    return C !== 0 ? (o = C & ~d, o !== 0 ? u = _a(o) : (x &= C, x !== 0 ? u = _a(x) : i || (i = C & ~t, i !== 0 && (u = _a(i))))) : (C = o & ~d, C !== 0 ? u = _a(C) : x !== 0 ? u = _a(x) : i || (i = o & ~t, i !== 0 && (u = _a(i)))), u === 0 ? 0 : n !== 0 && n !== u && (n & d) === 0 && (d = u & -u, i = n & -n, d >= i || d === 32 && (i & 4194048) !== 0) ? n : u;
  }
  function dl(t, n) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & n) === 0;
  }
  function Ax(t, n) {
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
  function Wh() {
    var t = Ls;
    return Ls <<= 1, (Ls & 62914560) === 0 && (Ls = 4194304), t;
  }
  function tu(t) {
    for (var n = [], i = 0; 31 > i; i++) n.push(t);
    return n;
  }
  function hl(t, n) {
    t.pendingLanes |= n, n !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Mx(t, n, i, o, u, d) {
    var x = t.pendingLanes;
    t.pendingLanes = i, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= i, t.entangledLanes &= i, t.errorRecoveryDisabledLanes &= i, t.shellSuspendCounter = 0;
    var C = t.entanglements, O = t.expirationTimes, Y = t.hiddenUpdates;
    for (i = x & ~i; 0 < i; ) {
      var Q = 31 - Ue(i), W = 1 << Q;
      C[Q] = 0, O[Q] = -1;
      var X = Y[Q];
      if (X !== null)
        for (Y[Q] = null, Q = 0; Q < X.length; Q++) {
          var P = X[Q];
          P !== null && (P.lane &= -536870913);
        }
      i &= ~W;
    }
    o !== 0 && Ih(t, o, 0), d !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= d & ~(x & ~n));
  }
  function Ih(t, n, i) {
    t.pendingLanes |= n, t.suspendedLanes &= ~n;
    var o = 31 - Ue(n);
    t.entangledLanes |= n, t.entanglements[o] = t.entanglements[o] | 1073741824 | i & 261930;
  }
  function tm(t, n) {
    var i = t.entangledLanes |= n;
    for (t = t.entanglements; i; ) {
      var o = 31 - Ue(i), u = 1 << o;
      u & n | t[o] & n && (t[o] |= n), i &= ~u;
    }
  }
  function em(t, n) {
    var i = n & -n;
    return i = (i & 42) !== 0 ? 1 : eu(i), (i & (t.suspendedLanes | n)) !== 0 ? 0 : i;
  }
  function eu(t) {
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
  function nu(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function nm() {
    var t = $.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : $0(t.type));
  }
  function am(t, n) {
    var i = $.p;
    try {
      return $.p = t, n();
    } finally {
      $.p = i;
    }
  }
  var Wn = Math.random().toString(36).slice(2), ve = "__reactFiber$" + Wn, Re = "__reactProps$" + Wn, li = "__reactContainer$" + Wn, au = "__reactEvents$" + Wn, _x = "__reactListeners$" + Wn, Dx = "__reactHandles$" + Wn, im = "__reactResources$" + Wn, ml = "__reactMarker$" + Wn;
  function iu(t) {
    delete t[ve], delete t[Re], delete t[au], delete t[_x], delete t[Dx];
  }
  function si(t) {
    var n = t[ve];
    if (n) return n;
    for (var i = t.parentNode; i; ) {
      if (n = i[li] || i[ve]) {
        if (i = n.alternate, n.child !== null || i !== null && i.child !== null)
          for (t = j0(t); t !== null; ) {
            if (i = t[ve]) return i;
            t = j0(t);
          }
        return n;
      }
      t = i, i = t.parentNode;
    }
    return null;
  }
  function oi(t) {
    if (t = t[ve] || t[li]) {
      var n = t.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return t;
    }
    return null;
  }
  function pl(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return t.stateNode;
    throw Error(s(33));
  }
  function ri(t) {
    var n = t[im];
    return n || (n = t[im] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function ye(t) {
    t[ml] = !0;
  }
  var lm = /* @__PURE__ */ new Set(), sm = {};
  function Da(t, n) {
    ui(t, n), ui(t + "Capture", n);
  }
  function ui(t, n) {
    for (sm[t] = n, t = 0; t < n.length; t++)
      lm.add(n[t]);
  }
  var Rx = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), om = {}, rm = {};
  function Nx(t) {
    return rl.call(rm, t) ? !0 : rl.call(om, t) ? !1 : Rx.test(t) ? rm[t] = !0 : (om[t] = !0, !1);
  }
  function ks(t, n, i) {
    if (Nx(n))
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
  function Us(t, n, i) {
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
  function _n(t, n, i, o) {
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
  function Fe(t) {
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
  function um(t) {
    var n = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function Ox(t, n, i) {
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
  function lu(t) {
    if (!t._valueTracker) {
      var n = um(t) ? "checked" : "value";
      t._valueTracker = Ox(
        t,
        n,
        "" + t[n]
      );
    }
  }
  function cm(t) {
    if (!t) return !1;
    var n = t._valueTracker;
    if (!n) return !0;
    var i = n.getValue(), o = "";
    return t && (o = um(t) ? t.checked ? "true" : "false" : t.value), t = o, t !== i ? (n.setValue(t), !0) : !1;
  }
  function Hs(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var zx = /[\n"\\]/g;
  function Je(t) {
    return t.replace(
      zx,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function su(t, n, i, o, u, d, x, C) {
    t.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? t.type = x : t.removeAttribute("type"), n != null ? x === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + Fe(n)) : t.value !== "" + Fe(n) && (t.value = "" + Fe(n)) : x !== "submit" && x !== "reset" || t.removeAttribute("value"), n != null ? ou(t, x, Fe(n)) : i != null ? ou(t, x, Fe(i)) : o != null && t.removeAttribute("value"), u == null && d != null && (t.defaultChecked = !!d), u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"), C != null && typeof C != "function" && typeof C != "symbol" && typeof C != "boolean" ? t.name = "" + Fe(C) : t.removeAttribute("name");
  }
  function fm(t, n, i, o, u, d, x, C) {
    if (d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (t.type = d), n != null || i != null) {
      if (!(d !== "submit" && d !== "reset" || n != null)) {
        lu(t);
        return;
      }
      i = i != null ? "" + Fe(i) : "", n = n != null ? "" + Fe(n) : i, C || n === t.value || (t.value = n), t.defaultValue = n;
    }
    o = o ?? u, o = typeof o != "function" && typeof o != "symbol" && !!o, t.checked = C ? t.checked : !!o, t.defaultChecked = !!o, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (t.name = x), lu(t);
  }
  function ou(t, n, i) {
    n === "number" && Hs(t.ownerDocument) === t || t.defaultValue === "" + i || (t.defaultValue = "" + i);
  }
  function ci(t, n, i, o) {
    if (t = t.options, n) {
      n = {};
      for (var u = 0; u < i.length; u++)
        n["$" + i[u]] = !0;
      for (i = 0; i < t.length; i++)
        u = n.hasOwnProperty("$" + t[i].value), t[i].selected !== u && (t[i].selected = u), u && o && (t[i].defaultSelected = !0);
    } else {
      for (i = "" + Fe(i), n = null, u = 0; u < t.length; u++) {
        if (t[u].value === i) {
          t[u].selected = !0, o && (t[u].defaultSelected = !0);
          return;
        }
        n !== null || t[u].disabled || (n = t[u]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function dm(t, n, i) {
    if (n != null && (n = "" + Fe(n), n !== t.value && (t.value = n), i == null)) {
      t.defaultValue !== n && (t.defaultValue = n);
      return;
    }
    t.defaultValue = i != null ? "" + Fe(i) : "";
  }
  function hm(t, n, i, o) {
    if (n == null) {
      if (o != null) {
        if (i != null) throw Error(s(92));
        if (it(o)) {
          if (1 < o.length) throw Error(s(93));
          o = o[0];
        }
        i = o;
      }
      i == null && (i = ""), n = i;
    }
    i = Fe(n), t.defaultValue = i, o = t.textContent, o === i && o !== "" && o !== null && (t.value = o), lu(t);
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
  var Bx = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function mm(t, n, i) {
    var o = n.indexOf("--") === 0;
    i == null || typeof i == "boolean" || i === "" ? o ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "" : o ? t.setProperty(n, i) : typeof i != "number" || i === 0 || Bx.has(n) ? n === "float" ? t.cssFloat = i : t[n] = ("" + i).trim() : t[n] = i + "px";
  }
  function pm(t, n, i) {
    if (n != null && typeof n != "object")
      throw Error(s(62));
    if (t = t.style, i != null) {
      for (var o in i)
        !i.hasOwnProperty(o) || n != null && n.hasOwnProperty(o) || (o.indexOf("--") === 0 ? t.setProperty(o, "") : o === "float" ? t.cssFloat = "" : t[o] = "");
      for (var u in n)
        o = n[u], n.hasOwnProperty(u) && i[u] !== o && mm(t, u, o);
    } else
      for (var d in n)
        n.hasOwnProperty(d) && mm(t, d, n[d]);
  }
  function ru(t) {
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
  var Lx = /* @__PURE__ */ new Map([
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
  ]), Vx = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function $s(t) {
    return Vx.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Dn() {
  }
  var uu = null;
  function cu(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var di = null, hi = null;
  function ym(t) {
    var n = oi(t);
    if (n && (t = n.stateNode)) {
      var i = t[Re] || null;
      t: switch (t = n.stateNode, n.type) {
        case "input":
          if (su(
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
              'input[name="' + Je(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < i.length; n++) {
              var o = i[n];
              if (o !== t && o.form === t.form) {
                var u = o[Re] || null;
                if (!u) throw Error(s(90));
                su(
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
              o = i[n], o.form === t.form && cm(o);
          }
          break t;
        case "textarea":
          dm(t, i.value, i.defaultValue);
          break t;
        case "select":
          n = i.value, n != null && ci(t, !!i.multiple, n, !1);
      }
    }
  }
  var fu = !1;
  function gm(t, n, i) {
    if (fu) return t(n, i);
    fu = !0;
    try {
      var o = t(n);
      return o;
    } finally {
      if (fu = !1, (di !== null || hi !== null) && (_o(), di && (n = di, t = hi, hi = di = null, ym(n), t)))
        for (n = 0; n < t.length; n++) ym(t[n]);
    }
  }
  function yl(t, n) {
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
  var Rn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), du = !1;
  if (Rn)
    try {
      var gl = {};
      Object.defineProperty(gl, "passive", {
        get: function() {
          du = !0;
        }
      }), window.addEventListener("test", gl, gl), window.removeEventListener("test", gl, gl);
    } catch {
      du = !1;
    }
  var In = null, hu = null, qs = null;
  function vm() {
    if (qs) return qs;
    var t, n = hu, i = n.length, o, u = "value" in In ? In.value : In.textContent, d = u.length;
    for (t = 0; t < i && n[t] === u[t]; t++) ;
    var x = i - t;
    for (o = 1; o <= x && n[i - o] === u[d - o]; o++) ;
    return qs = u.slice(t, 1 < o ? 1 - o : void 0);
  }
  function Ys(t) {
    var n = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Gs() {
    return !0;
  }
  function bm() {
    return !1;
  }
  function Ne(t) {
    function n(i, o, u, d, x) {
      this._reactName = i, this._targetInst = u, this.type = o, this.nativeEvent = d, this.target = x, this.currentTarget = null;
      for (var C in t)
        t.hasOwnProperty(C) && (i = t[C], this[C] = i ? i(d) : d[C]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? Gs : bm, this.isPropagationStopped = bm, this;
    }
    return v(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var i = this.nativeEvent;
        i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = Gs);
      },
      stopPropagation: function() {
        var i = this.nativeEvent;
        i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = Gs);
      },
      persist: function() {
      },
      isPersistent: Gs
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
  }, Xs = Ne(Ra), vl = v({}, Ra, { view: 0, detail: 0 }), kx = Ne(vl), mu, pu, bl, Ps = v({}, vl, {
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
    getModifierState: gu,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== bl && (bl && t.type === "mousemove" ? (mu = t.screenX - bl.screenX, pu = t.screenY - bl.screenY) : pu = mu = 0, bl = t), mu);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : pu;
    }
  }), xm = Ne(Ps), Ux = v({}, Ps, { dataTransfer: 0 }), Hx = Ne(Ux), $x = v({}, vl, { relatedTarget: 0 }), yu = Ne($x), qx = v({}, Ra, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Yx = Ne(qx), Gx = v({}, Ra, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Xx = Ne(Gx), Px = v({}, Ra, { data: 0 }), Sm = Ne(Px), Kx = {
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
  }, Zx = {
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
  }, Qx = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Fx(t) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(t) : (t = Qx[t]) ? !!n[t] : !1;
  }
  function gu() {
    return Fx;
  }
  var Jx = v({}, vl, {
    key: function(t) {
      if (t.key) {
        var n = Kx[t.key] || t.key;
        if (n !== "Unidentified") return n;
      }
      return t.type === "keypress" ? (t = Ys(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Zx[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: gu,
    charCode: function(t) {
      return t.type === "keypress" ? Ys(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Ys(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Wx = Ne(Jx), Ix = v({}, Ps, {
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
  }), wm = Ne(Ix), tS = v({}, vl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: gu
  }), eS = Ne(tS), nS = v({}, Ra, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), aS = Ne(nS), iS = v({}, Ps, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), lS = Ne(iS), sS = v({}, Ra, {
    newState: 0,
    oldState: 0
  }), oS = Ne(sS), rS = [9, 13, 27, 32], vu = Rn && "CompositionEvent" in window, xl = null;
  Rn && "documentMode" in document && (xl = document.documentMode);
  var uS = Rn && "TextEvent" in window && !xl, Tm = Rn && (!vu || xl && 8 < xl && 11 >= xl), Cm = " ", jm = !1;
  function Em(t, n) {
    switch (t) {
      case "keyup":
        return rS.indexOf(n.keyCode) !== -1;
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
  function Am(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var mi = !1;
  function cS(t, n) {
    switch (t) {
      case "compositionend":
        return Am(n);
      case "keypress":
        return n.which !== 32 ? null : (jm = !0, Cm);
      case "textInput":
        return t = n.data, t === Cm && jm ? null : t;
      default:
        return null;
    }
  }
  function fS(t, n) {
    if (mi)
      return t === "compositionend" || !vu && Em(t, n) ? (t = vm(), qs = hu = In = null, mi = !1, t) : null;
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
        return Tm && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var dS = {
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
  function Mm(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === "input" ? !!dS[t.type] : n === "textarea";
  }
  function _m(t, n, i, o) {
    di ? hi ? hi.push(o) : hi = [o] : di = o, n = Lo(n, "onChange"), 0 < n.length && (i = new Xs(
      "onChange",
      "change",
      null,
      i,
      o
    ), t.push({ event: i, listeners: n }));
  }
  var Sl = null, wl = null;
  function hS(t) {
    f0(t, 0);
  }
  function Ks(t) {
    var n = pl(t);
    if (cm(n)) return t;
  }
  function Dm(t, n) {
    if (t === "change") return n;
  }
  var Rm = !1;
  if (Rn) {
    var bu;
    if (Rn) {
      var xu = "oninput" in document;
      if (!xu) {
        var Nm = document.createElement("div");
        Nm.setAttribute("oninput", "return;"), xu = typeof Nm.oninput == "function";
      }
      bu = xu;
    } else bu = !1;
    Rm = bu && (!document.documentMode || 9 < document.documentMode);
  }
  function Om() {
    Sl && (Sl.detachEvent("onpropertychange", zm), wl = Sl = null);
  }
  function zm(t) {
    if (t.propertyName === "value" && Ks(wl)) {
      var n = [];
      _m(
        n,
        wl,
        t,
        cu(t)
      ), gm(hS, n);
    }
  }
  function mS(t, n, i) {
    t === "focusin" ? (Om(), Sl = n, wl = i, Sl.attachEvent("onpropertychange", zm)) : t === "focusout" && Om();
  }
  function pS(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Ks(wl);
  }
  function yS(t, n) {
    if (t === "click") return Ks(n);
  }
  function gS(t, n) {
    if (t === "input" || t === "change")
      return Ks(n);
  }
  function vS(t, n) {
    return t === n && (t !== 0 || 1 / t === 1 / n) || t !== t && n !== n;
  }
  var He = typeof Object.is == "function" ? Object.is : vS;
  function Tl(t, n) {
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
  function Bm(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Lm(t, n) {
    var i = Bm(t);
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
      i = Bm(i);
    }
  }
  function Vm(t, n) {
    return t && n ? t === n ? !0 : t && t.nodeType === 3 ? !1 : n && n.nodeType === 3 ? Vm(t, n.parentNode) : "contains" in t ? t.contains(n) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function km(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var n = Hs(t.document); n instanceof t.HTMLIFrameElement; ) {
      try {
        var i = typeof n.contentWindow.location.href == "string";
      } catch {
        i = !1;
      }
      if (i) t = n.contentWindow;
      else break;
      n = Hs(t.document);
    }
    return n;
  }
  function Su(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n && (n === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || n === "textarea" || t.contentEditable === "true");
  }
  var bS = Rn && "documentMode" in document && 11 >= document.documentMode, pi = null, wu = null, Cl = null, Tu = !1;
  function Um(t, n, i) {
    var o = i.window === i ? i.document : i.nodeType === 9 ? i : i.ownerDocument;
    Tu || pi == null || pi !== Hs(o) || (o = pi, "selectionStart" in o && Su(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = {
      anchorNode: o.anchorNode,
      anchorOffset: o.anchorOffset,
      focusNode: o.focusNode,
      focusOffset: o.focusOffset
    }), Cl && Tl(Cl, o) || (Cl = o, o = Lo(wu, "onSelect"), 0 < o.length && (n = new Xs(
      "onSelect",
      "select",
      null,
      n,
      i
    ), t.push({ event: n, listeners: o }), n.target = pi)));
  }
  function Na(t, n) {
    var i = {};
    return i[t.toLowerCase()] = n.toLowerCase(), i["Webkit" + t] = "webkit" + n, i["Moz" + t] = "moz" + n, i;
  }
  var yi = {
    animationend: Na("Animation", "AnimationEnd"),
    animationiteration: Na("Animation", "AnimationIteration"),
    animationstart: Na("Animation", "AnimationStart"),
    transitionrun: Na("Transition", "TransitionRun"),
    transitionstart: Na("Transition", "TransitionStart"),
    transitioncancel: Na("Transition", "TransitionCancel"),
    transitionend: Na("Transition", "TransitionEnd")
  }, Cu = {}, Hm = {};
  Rn && (Hm = document.createElement("div").style, "AnimationEvent" in window || (delete yi.animationend.animation, delete yi.animationiteration.animation, delete yi.animationstart.animation), "TransitionEvent" in window || delete yi.transitionend.transition);
  function Oa(t) {
    if (Cu[t]) return Cu[t];
    if (!yi[t]) return t;
    var n = yi[t], i;
    for (i in n)
      if (n.hasOwnProperty(i) && i in Hm)
        return Cu[t] = n[i];
    return t;
  }
  var $m = Oa("animationend"), qm = Oa("animationiteration"), Ym = Oa("animationstart"), xS = Oa("transitionrun"), SS = Oa("transitionstart"), wS = Oa("transitioncancel"), Gm = Oa("transitionend"), Xm = /* @__PURE__ */ new Map(), ju = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  ju.push("scrollEnd");
  function un(t, n) {
    Xm.set(t, n), Da(n, [t]);
  }
  var Zs = typeof reportError == "function" ? reportError : function(t) {
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
  }, We = [], gi = 0, Eu = 0;
  function Qs() {
    for (var t = gi, n = Eu = gi = 0; n < t; ) {
      var i = We[n];
      We[n++] = null;
      var o = We[n];
      We[n++] = null;
      var u = We[n];
      We[n++] = null;
      var d = We[n];
      if (We[n++] = null, o !== null && u !== null) {
        var x = o.pending;
        x === null ? u.next = u : (u.next = x.next, x.next = u), o.pending = u;
      }
      d !== 0 && Pm(i, u, d);
    }
  }
  function Fs(t, n, i, o) {
    We[gi++] = t, We[gi++] = n, We[gi++] = i, We[gi++] = o, Eu |= o, t.lanes |= o, t = t.alternate, t !== null && (t.lanes |= o);
  }
  function Au(t, n, i, o) {
    return Fs(t, n, i, o), Js(t);
  }
  function za(t, n) {
    return Fs(t, null, null, n), Js(t);
  }
  function Pm(t, n, i) {
    t.lanes |= i;
    var o = t.alternate;
    o !== null && (o.lanes |= i);
    for (var u = !1, d = t.return; d !== null; )
      d.childLanes |= i, o = d.alternate, o !== null && (o.childLanes |= i), d.tag === 22 && (t = d.stateNode, t === null || t._visibility & 1 || (u = !0)), t = d, d = d.return;
    return t.tag === 3 ? (d = t.stateNode, u && n !== null && (u = 31 - Ue(i), t = d.hiddenUpdates, o = t[u], o === null ? t[u] = [n] : o.push(n), n.lane = i | 536870912), d) : null;
  }
  function Js(t) {
    if (50 < Pl)
      throw Pl = 0, Lc = null, Error(s(185));
    for (var n = t.return; n !== null; )
      t = n, n = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var vi = {};
  function TS(t, n, i, o) {
    this.tag = t, this.key = i, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function $e(t, n, i, o) {
    return new TS(t, n, i, o);
  }
  function Mu(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Nn(t, n) {
    var i = t.alternate;
    return i === null ? (i = $e(
      t.tag,
      n,
      t.key,
      t.mode
    ), i.elementType = t.elementType, i.type = t.type, i.stateNode = t.stateNode, i.alternate = t, t.alternate = i) : (i.pendingProps = n, i.type = t.type, i.flags = 0, i.subtreeFlags = 0, i.deletions = null), i.flags = t.flags & 65011712, i.childLanes = t.childLanes, i.lanes = t.lanes, i.child = t.child, i.memoizedProps = t.memoizedProps, i.memoizedState = t.memoizedState, i.updateQueue = t.updateQueue, n = t.dependencies, i.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, i.sibling = t.sibling, i.index = t.index, i.ref = t.ref, i.refCleanup = t.refCleanup, i;
  }
  function Km(t, n) {
    t.flags &= 65011714;
    var i = t.alternate;
    return i === null ? (t.childLanes = 0, t.lanes = n, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = i.childLanes, t.lanes = i.lanes, t.child = i.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = i.memoizedProps, t.memoizedState = i.memoizedState, t.updateQueue = i.updateQueue, t.type = i.type, n = i.dependencies, t.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), t;
  }
  function Ws(t, n, i, o, u, d) {
    var x = 0;
    if (o = t, typeof t == "function") Mu(t) && (x = 1);
    else if (typeof t == "string")
      x = M3(
        t,
        i,
        lt.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case G:
          return t = $e(31, i, n, u), t.elementType = G, t.lanes = d, t;
        case S:
          return Ba(i.children, u, d, n);
        case E:
          x = 8, u |= 24;
          break;
        case M:
          return t = $e(12, i, n, u | 2), t.elementType = M, t.lanes = d, t;
        case V:
          return t = $e(13, i, n, u), t.elementType = V, t.lanes = d, t;
        case z:
          return t = $e(19, i, n, u), t.elementType = z, t.lanes = d, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case D:
                x = 10;
                break t;
              case R:
                x = 9;
                break t;
              case N:
                x = 11;
                break t;
              case A:
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
    return n = $e(x, i, n, u), n.elementType = t, n.type = o, n.lanes = d, n;
  }
  function Ba(t, n, i, o) {
    return t = $e(7, t, o, n), t.lanes = i, t;
  }
  function _u(t, n, i) {
    return t = $e(6, t, null, n), t.lanes = i, t;
  }
  function Zm(t) {
    var n = $e(18, null, null, 0);
    return n.stateNode = t, n;
  }
  function Du(t, n, i) {
    return n = $e(
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
  var Qm = /* @__PURE__ */ new WeakMap();
  function Ie(t, n) {
    if (typeof t == "object" && t !== null) {
      var i = Qm.get(t);
      return i !== void 0 ? i : (n = {
        value: t,
        source: n,
        stack: Rs(n)
      }, Qm.set(t, n), n);
    }
    return {
      value: t,
      source: n,
      stack: Rs(n)
    };
  }
  var bi = [], xi = 0, Is = null, jl = 0, tn = [], en = 0, ta = null, Sn = 1, wn = "";
  function On(t, n) {
    bi[xi++] = jl, bi[xi++] = Is, Is = t, jl = n;
  }
  function Fm(t, n, i) {
    tn[en++] = Sn, tn[en++] = wn, tn[en++] = ta, ta = t;
    var o = Sn;
    t = wn;
    var u = 32 - Ue(o) - 1;
    o &= ~(1 << u), i += 1;
    var d = 32 - Ue(n) + u;
    if (30 < d) {
      var x = u - u % 5;
      d = (o & (1 << x) - 1).toString(32), o >>= x, u -= x, Sn = 1 << 32 - Ue(n) + u | i << u | o, wn = d + t;
    } else
      Sn = 1 << d | i << u | o, wn = t;
  }
  function Ru(t) {
    t.return !== null && (On(t, 1), Fm(t, 1, 0));
  }
  function Nu(t) {
    for (; t === Is; )
      Is = bi[--xi], bi[xi] = null, jl = bi[--xi], bi[xi] = null;
    for (; t === ta; )
      ta = tn[--en], tn[en] = null, wn = tn[--en], tn[en] = null, Sn = tn[--en], tn[en] = null;
  }
  function Jm(t, n) {
    tn[en++] = Sn, tn[en++] = wn, tn[en++] = ta, Sn = n.id, wn = n.overflow, ta = t;
  }
  var be = null, Qt = null, At = !1, ea = null, nn = !1, Ou = Error(s(519));
  function na(t) {
    var n = Error(
      s(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw El(Ie(n, t)), Ou;
  }
  function Wm(t) {
    var n = t.stateNode, i = t.type, o = t.memoizedProps;
    switch (n[ve] = t, n[Re] = o, i) {
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
        for (i = 0; i < Zl.length; i++)
          Ct(Zl[i], n);
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
        Ct("invalid", n), fm(
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
        Ct("invalid", n), hm(n, o.value, o.defaultValue, o.children);
    }
    i = o.children, typeof i != "string" && typeof i != "number" && typeof i != "bigint" || n.textContent === "" + i || o.suppressHydrationWarning === !0 || p0(n.textContent, i) ? (o.popover != null && (Ct("beforetoggle", n), Ct("toggle", n)), o.onScroll != null && Ct("scroll", n), o.onScrollEnd != null && Ct("scrollend", n), o.onClick != null && (n.onclick = Dn), n = !0) : n = !1, n || na(t, !0);
  }
  function Im(t) {
    for (be = t.return; be; )
      switch (be.tag) {
        case 5:
        case 31:
        case 13:
          nn = !1;
          return;
        case 27:
        case 3:
          nn = !0;
          return;
        default:
          be = be.return;
      }
  }
  function Si(t) {
    if (t !== be) return !1;
    if (!At) return Im(t), At = !0, !1;
    var n = t.tag, i;
    if ((i = n !== 3 && n !== 27) && ((i = n === 5) && (i = t.type, i = !(i !== "form" && i !== "button") || Jc(t.type, t.memoizedProps)), i = !i), i && Qt && na(t), Im(t), n === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Qt = C0(t);
    } else if (n === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(317));
      Qt = C0(t);
    } else
      n === 27 ? (n = Qt, ya(t.type) ? (t = nf, nf = null, Qt = t) : Qt = n) : Qt = be ? ln(t.stateNode.nextSibling) : null;
    return !0;
  }
  function La() {
    Qt = be = null, At = !1;
  }
  function zu() {
    var t = ea;
    return t !== null && (Le === null ? Le = t : Le.push.apply(
      Le,
      t
    ), ea = null), t;
  }
  function El(t) {
    ea === null ? ea = [t] : ea.push(t);
  }
  var Bu = _(null), Va = null, zn = null;
  function aa(t, n, i) {
    I(Bu, n._currentValue), n._currentValue = i;
  }
  function Bn(t) {
    t._currentValue = Bu.current, U(Bu);
  }
  function Lu(t, n, i) {
    for (; t !== null; ) {
      var o = t.alternate;
      if ((t.childLanes & n) !== n ? (t.childLanes |= n, o !== null && (o.childLanes |= n)) : o !== null && (o.childLanes & n) !== n && (o.childLanes |= n), t === i) break;
      t = t.return;
    }
  }
  function Vu(t, n, i, o) {
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
              d.lanes |= i, C = d.alternate, C !== null && (C.lanes |= i), Lu(
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
        x.lanes |= i, d = x.alternate, d !== null && (d.lanes |= i), Lu(x, i, t), x = null;
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
        x.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(Il) : t = [Il]);
      }
      u = u.return;
    }
    t !== null && Vu(
      n,
      t,
      i,
      o
    ), n.flags |= 262144;
  }
  function to(t) {
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
  function ka(t) {
    Va = t, zn = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function xe(t) {
    return tp(Va, t);
  }
  function eo(t, n) {
    return Va === null && ka(t), tp(t, n);
  }
  function tp(t, n) {
    var i = n._currentValue;
    if (n = { context: n, memoizedValue: i, next: null }, zn === null) {
      if (t === null) throw Error(s(308));
      zn = n, t.dependencies = { lanes: 0, firstContext: n }, t.flags |= 524288;
    } else zn = zn.next = n;
    return i;
  }
  var CS = typeof AbortController < "u" ? AbortController : function() {
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
  }, jS = a.unstable_scheduleCallback, ES = a.unstable_NormalPriority, oe = {
    $$typeof: D,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function ku() {
    return {
      controller: new CS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Al(t) {
    t.refCount--, t.refCount === 0 && jS(ES, function() {
      t.controller.abort();
    });
  }
  var Ml = null, Uu = 0, Ti = 0, Ci = null;
  function AS(t, n) {
    if (Ml === null) {
      var i = Ml = [];
      Uu = 0, Ti = qc(), Ci = {
        status: "pending",
        value: void 0,
        then: function(o) {
          i.push(o);
        }
      };
    }
    return Uu++, n.then(ep, ep), n;
  }
  function ep() {
    if (--Uu === 0 && Ml !== null) {
      Ci !== null && (Ci.status = "fulfilled");
      var t = Ml;
      Ml = null, Ti = 0, Ci = null;
      for (var n = 0; n < t.length; n++) (0, t[n])();
    }
  }
  function MS(t, n) {
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
  var np = L.S;
  L.S = function(t, n) {
    U1 = ot(), typeof n == "object" && n !== null && typeof n.then == "function" && AS(t, n), np !== null && np(t, n);
  };
  var Ua = _(null);
  function Hu() {
    var t = Ua.current;
    return t !== null ? t : qt.pooledCache;
  }
  function no(t, n) {
    n === null ? I(Ua, Ua.current) : I(Ua, n.pool);
  }
  function ap() {
    var t = Hu();
    return t === null ? null : { parent: oe._currentValue, pool: t };
  }
  var ji = Error(s(460)), $u = Error(s(474)), ao = Error(s(542)), io = { then: function() {
  } };
  function ip(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function lp(t, n, i) {
    switch (i = t[i], i === void 0 ? t.push(n) : i !== n && (n.then(Dn, Dn), n = i), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw t = n.reason, op(t), t;
      default:
        if (typeof n.status == "string") n.then(Dn, Dn);
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
            throw t = n.reason, op(t), t;
        }
        throw $a = n, ji;
    }
  }
  function Ha(t) {
    try {
      var n = t._init;
      return n(t._payload);
    } catch (i) {
      throw i !== null && typeof i == "object" && typeof i.then == "function" ? ($a = i, ji) : i;
    }
  }
  var $a = null;
  function sp() {
    if ($a === null) throw Error(s(459));
    var t = $a;
    return $a = null, t;
  }
  function op(t) {
    if (t === ji || t === ao)
      throw Error(s(483));
  }
  var Ei = null, _l = 0;
  function lo(t) {
    var n = _l;
    return _l += 1, Ei === null && (Ei = []), lp(Ei, t, n);
  }
  function Dl(t, n) {
    n = n.props.ref, t.ref = n !== void 0 ? n : null;
  }
  function so(t, n) {
    throw n.$$typeof === b ? Error(s(525)) : (t = Object.prototype.toString.call(n), Error(
      s(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : t
      )
    ));
  }
  function rp(t) {
    function n(k, B) {
      if (t) {
        var q = k.deletions;
        q === null ? (k.deletions = [B], k.flags |= 16) : q.push(B);
      }
    }
    function i(k, B) {
      if (!t) return null;
      for (; B !== null; )
        n(k, B), B = B.sibling;
      return null;
    }
    function o(k) {
      for (var B = /* @__PURE__ */ new Map(); k !== null; )
        k.key !== null ? B.set(k.key, k) : B.set(k.index, k), k = k.sibling;
      return B;
    }
    function u(k, B) {
      return k = Nn(k, B), k.index = 0, k.sibling = null, k;
    }
    function d(k, B, q) {
      return k.index = q, t ? (q = k.alternate, q !== null ? (q = q.index, q < B ? (k.flags |= 67108866, B) : q) : (k.flags |= 67108866, B)) : (k.flags |= 1048576, B);
    }
    function x(k) {
      return t && k.alternate === null && (k.flags |= 67108866), k;
    }
    function C(k, B, q, F) {
      return B === null || B.tag !== 6 ? (B = _u(q, k.mode, F), B.return = k, B) : (B = u(B, q), B.return = k, B);
    }
    function O(k, B, q, F) {
      var mt = q.type;
      return mt === S ? Q(
        k,
        B,
        q.props.children,
        F,
        q.key
      ) : B !== null && (B.elementType === mt || typeof mt == "object" && mt !== null && mt.$$typeof === H && Ha(mt) === B.type) ? (B = u(B, q.props), Dl(B, q), B.return = k, B) : (B = Ws(
        q.type,
        q.key,
        q.props,
        null,
        k.mode,
        F
      ), Dl(B, q), B.return = k, B);
    }
    function Y(k, B, q, F) {
      return B === null || B.tag !== 4 || B.stateNode.containerInfo !== q.containerInfo || B.stateNode.implementation !== q.implementation ? (B = Du(q, k.mode, F), B.return = k, B) : (B = u(B, q.children || []), B.return = k, B);
    }
    function Q(k, B, q, F, mt) {
      return B === null || B.tag !== 7 ? (B = Ba(
        q,
        k.mode,
        F,
        mt
      ), B.return = k, B) : (B = u(B, q), B.return = k, B);
    }
    function W(k, B, q) {
      if (typeof B == "string" && B !== "" || typeof B == "number" || typeof B == "bigint")
        return B = _u(
          "" + B,
          k.mode,
          q
        ), B.return = k, B;
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case T:
            return q = Ws(
              B.type,
              B.key,
              B.props,
              null,
              k.mode,
              q
            ), Dl(q, B), q.return = k, q;
          case w:
            return B = Du(
              B,
              k.mode,
              q
            ), B.return = k, B;
          case H:
            return B = Ha(B), W(k, B, q);
        }
        if (it(B) || at(B))
          return B = Ba(
            B,
            k.mode,
            q,
            null
          ), B.return = k, B;
        if (typeof B.then == "function")
          return W(k, lo(B), q);
        if (B.$$typeof === D)
          return W(
            k,
            eo(k, B),
            q
          );
        so(k, B);
      }
      return null;
    }
    function X(k, B, q, F) {
      var mt = B !== null ? B.key : null;
      if (typeof q == "string" && q !== "" || typeof q == "number" || typeof q == "bigint")
        return mt !== null ? null : C(k, B, "" + q, F);
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case T:
            return q.key === mt ? O(k, B, q, F) : null;
          case w:
            return q.key === mt ? Y(k, B, q, F) : null;
          case H:
            return q = Ha(q), X(k, B, q, F);
        }
        if (it(q) || at(q))
          return mt !== null ? null : Q(k, B, q, F, null);
        if (typeof q.then == "function")
          return X(
            k,
            B,
            lo(q),
            F
          );
        if (q.$$typeof === D)
          return X(
            k,
            B,
            eo(k, q),
            F
          );
        so(k, q);
      }
      return null;
    }
    function P(k, B, q, F, mt) {
      if (typeof F == "string" && F !== "" || typeof F == "number" || typeof F == "bigint")
        return k = k.get(q) || null, C(B, k, "" + F, mt);
      if (typeof F == "object" && F !== null) {
        switch (F.$$typeof) {
          case T:
            return k = k.get(
              F.key === null ? q : F.key
            ) || null, O(B, k, F, mt);
          case w:
            return k = k.get(
              F.key === null ? q : F.key
            ) || null, Y(B, k, F, mt);
          case H:
            return F = Ha(F), P(
              k,
              B,
              q,
              F,
              mt
            );
        }
        if (it(F) || at(F))
          return k = k.get(q) || null, Q(B, k, F, mt, null);
        if (typeof F.then == "function")
          return P(
            k,
            B,
            q,
            lo(F),
            mt
          );
        if (F.$$typeof === D)
          return P(
            k,
            B,
            q,
            eo(B, F),
            mt
          );
        so(B, F);
      }
      return null;
    }
    function ut(k, B, q, F) {
      for (var mt = null, _t = null, dt = B, St = B = 0, Et = null; dt !== null && St < q.length; St++) {
        dt.index > St ? (Et = dt, dt = null) : Et = dt.sibling;
        var Dt = X(
          k,
          dt,
          q[St],
          F
        );
        if (Dt === null) {
          dt === null && (dt = Et);
          break;
        }
        t && dt && Dt.alternate === null && n(k, dt), B = d(Dt, B, St), _t === null ? mt = Dt : _t.sibling = Dt, _t = Dt, dt = Et;
      }
      if (St === q.length)
        return i(k, dt), At && On(k, St), mt;
      if (dt === null) {
        for (; St < q.length; St++)
          dt = W(k, q[St], F), dt !== null && (B = d(
            dt,
            B,
            St
          ), _t === null ? mt = dt : _t.sibling = dt, _t = dt);
        return At && On(k, St), mt;
      }
      for (dt = o(dt); St < q.length; St++)
        Et = P(
          dt,
          k,
          St,
          q[St],
          F
        ), Et !== null && (t && Et.alternate !== null && dt.delete(
          Et.key === null ? St : Et.key
        ), B = d(
          Et,
          B,
          St
        ), _t === null ? mt = Et : _t.sibling = Et, _t = Et);
      return t && dt.forEach(function(Sa) {
        return n(k, Sa);
      }), At && On(k, St), mt;
    }
    function gt(k, B, q, F) {
      if (q == null) throw Error(s(151));
      for (var mt = null, _t = null, dt = B, St = B = 0, Et = null, Dt = q.next(); dt !== null && !Dt.done; St++, Dt = q.next()) {
        dt.index > St ? (Et = dt, dt = null) : Et = dt.sibling;
        var Sa = X(k, dt, Dt.value, F);
        if (Sa === null) {
          dt === null && (dt = Et);
          break;
        }
        t && dt && Sa.alternate === null && n(k, dt), B = d(Sa, B, St), _t === null ? mt = Sa : _t.sibling = Sa, _t = Sa, dt = Et;
      }
      if (Dt.done)
        return i(k, dt), At && On(k, St), mt;
      if (dt === null) {
        for (; !Dt.done; St++, Dt = q.next())
          Dt = W(k, Dt.value, F), Dt !== null && (B = d(Dt, B, St), _t === null ? mt = Dt : _t.sibling = Dt, _t = Dt);
        return At && On(k, St), mt;
      }
      for (dt = o(dt); !Dt.done; St++, Dt = q.next())
        Dt = P(dt, k, St, Dt.value, F), Dt !== null && (t && Dt.alternate !== null && dt.delete(Dt.key === null ? St : Dt.key), B = d(Dt, B, St), _t === null ? mt = Dt : _t.sibling = Dt, _t = Dt);
      return t && dt.forEach(function(U3) {
        return n(k, U3);
      }), At && On(k, St), mt;
    }
    function Ht(k, B, q, F) {
      if (typeof q == "object" && q !== null && q.type === S && q.key === null && (q = q.props.children), typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case T:
            t: {
              for (var mt = q.key; B !== null; ) {
                if (B.key === mt) {
                  if (mt = q.type, mt === S) {
                    if (B.tag === 7) {
                      i(
                        k,
                        B.sibling
                      ), F = u(
                        B,
                        q.props.children
                      ), F.return = k, k = F;
                      break t;
                    }
                  } else if (B.elementType === mt || typeof mt == "object" && mt !== null && mt.$$typeof === H && Ha(mt) === B.type) {
                    i(
                      k,
                      B.sibling
                    ), F = u(B, q.props), Dl(F, q), F.return = k, k = F;
                    break t;
                  }
                  i(k, B);
                  break;
                } else n(k, B);
                B = B.sibling;
              }
              q.type === S ? (F = Ba(
                q.props.children,
                k.mode,
                F,
                q.key
              ), F.return = k, k = F) : (F = Ws(
                q.type,
                q.key,
                q.props,
                null,
                k.mode,
                F
              ), Dl(F, q), F.return = k, k = F);
            }
            return x(k);
          case w:
            t: {
              for (mt = q.key; B !== null; ) {
                if (B.key === mt)
                  if (B.tag === 4 && B.stateNode.containerInfo === q.containerInfo && B.stateNode.implementation === q.implementation) {
                    i(
                      k,
                      B.sibling
                    ), F = u(B, q.children || []), F.return = k, k = F;
                    break t;
                  } else {
                    i(k, B);
                    break;
                  }
                else n(k, B);
                B = B.sibling;
              }
              F = Du(q, k.mode, F), F.return = k, k = F;
            }
            return x(k);
          case H:
            return q = Ha(q), Ht(
              k,
              B,
              q,
              F
            );
        }
        if (it(q))
          return ut(
            k,
            B,
            q,
            F
          );
        if (at(q)) {
          if (mt = at(q), typeof mt != "function") throw Error(s(150));
          return q = mt.call(q), gt(
            k,
            B,
            q,
            F
          );
        }
        if (typeof q.then == "function")
          return Ht(
            k,
            B,
            lo(q),
            F
          );
        if (q.$$typeof === D)
          return Ht(
            k,
            B,
            eo(k, q),
            F
          );
        so(k, q);
      }
      return typeof q == "string" && q !== "" || typeof q == "number" || typeof q == "bigint" ? (q = "" + q, B !== null && B.tag === 6 ? (i(k, B.sibling), F = u(B, q), F.return = k, k = F) : (i(k, B), F = _u(q, k.mode, F), F.return = k, k = F), x(k)) : i(k, B);
    }
    return function(k, B, q, F) {
      try {
        _l = 0;
        var mt = Ht(
          k,
          B,
          q,
          F
        );
        return Ei = null, mt;
      } catch (dt) {
        if (dt === ji || dt === ao) throw dt;
        var _t = $e(29, dt, null, k.mode);
        return _t.lanes = F, _t.return = k, _t;
      } finally {
      }
    };
  }
  var qa = rp(!0), up = rp(!1), ia = !1;
  function qu(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Yu(t, n) {
    t = t.updateQueue, n.updateQueue === t && (n.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function la(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function sa(t, n, i) {
    var o = t.updateQueue;
    if (o === null) return null;
    if (o = o.shared, (Nt & 2) !== 0) {
      var u = o.pending;
      return u === null ? n.next = n : (n.next = u.next, u.next = n), o.pending = n, n = Js(t), Pm(t, null, i), n;
    }
    return Fs(t, o, n, i), Js(t);
  }
  function Rl(t, n, i) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (i & 4194048) !== 0)) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, tm(t, i);
    }
  }
  function Gu(t, n) {
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
  var Xu = !1;
  function Nl() {
    if (Xu) {
      var t = Ci;
      if (t !== null) throw t;
    }
  }
  function Ol(t, n, i, o) {
    Xu = !1;
    var u = t.updateQueue;
    ia = !1;
    var d = u.firstBaseUpdate, x = u.lastBaseUpdate, C = u.shared.pending;
    if (C !== null) {
      u.shared.pending = null;
      var O = C, Y = O.next;
      O.next = null, x === null ? d = Y : x.next = Y, x = O;
      var Q = t.alternate;
      Q !== null && (Q = Q.updateQueue, C = Q.lastBaseUpdate, C !== x && (C === null ? Q.firstBaseUpdate = Y : C.next = Y, Q.lastBaseUpdate = O));
    }
    if (d !== null) {
      var W = u.baseState;
      x = 0, Q = Y = O = null, C = d;
      do {
        var X = C.lane & -536870913, P = X !== C.lane;
        if (P ? (jt & X) === X : (o & X) === X) {
          X !== 0 && X === Ti && (Xu = !0), Q !== null && (Q = Q.next = {
            lane: 0,
            tag: C.tag,
            payload: C.payload,
            callback: null,
            next: null
          });
          t: {
            var ut = t, gt = C;
            X = n;
            var Ht = i;
            switch (gt.tag) {
              case 1:
                if (ut = gt.payload, typeof ut == "function") {
                  W = ut.call(Ht, W, X);
                  break t;
                }
                W = ut;
                break t;
              case 3:
                ut.flags = ut.flags & -65537 | 128;
              case 0:
                if (ut = gt.payload, X = typeof ut == "function" ? ut.call(Ht, W, X) : ut, X == null) break t;
                W = v({}, W, X);
                break t;
              case 2:
                ia = !0;
            }
          }
          X = C.callback, X !== null && (t.flags |= 64, P && (t.flags |= 8192), P = u.callbacks, P === null ? u.callbacks = [X] : P.push(X));
        } else
          P = {
            lane: X,
            tag: C.tag,
            payload: C.payload,
            callback: C.callback,
            next: null
          }, Q === null ? (Y = Q = P, O = W) : Q = Q.next = P, x |= X;
        if (C = C.next, C === null) {
          if (C = u.shared.pending, C === null)
            break;
          P = C, C = P.next, P.next = null, u.lastBaseUpdate = P, u.shared.pending = null;
        }
      } while (!0);
      Q === null && (O = W), u.baseState = O, u.firstBaseUpdate = Y, u.lastBaseUpdate = Q, d === null && (u.shared.lanes = 0), fa |= x, t.lanes = x, t.memoizedState = W;
    }
  }
  function cp(t, n) {
    if (typeof t != "function")
      throw Error(s(191, t));
    t.call(n);
  }
  function fp(t, n) {
    var i = t.callbacks;
    if (i !== null)
      for (t.callbacks = null, t = 0; t < i.length; t++)
        cp(i[t], n);
  }
  var Ai = _(null), oo = _(0);
  function dp(t, n) {
    t = Gn, I(oo, t), I(Ai, n), Gn = t | n.baseLanes;
  }
  function Pu() {
    I(oo, Gn), I(Ai, Ai.current);
  }
  function Ku() {
    Gn = oo.current, U(Ai), U(oo);
  }
  var qe = _(null), an = null;
  function oa(t) {
    var n = t.alternate;
    I(ie, ie.current & 1), I(qe, t), an === null && (n === null || Ai.current !== null || n.memoizedState !== null) && (an = t);
  }
  function Zu(t) {
    I(ie, ie.current), I(qe, t), an === null && (an = t);
  }
  function hp(t) {
    t.tag === 22 ? (I(ie, ie.current), I(qe, t), an === null && (an = t)) : ra();
  }
  function ra() {
    I(ie, ie.current), I(qe, qe.current);
  }
  function Ye(t) {
    U(qe), an === t && (an = null), U(ie);
  }
  var ie = _(0);
  function ro(t) {
    for (var n = t; n !== null; ) {
      if (n.tag === 13) {
        var i = n.memoizedState;
        if (i !== null && (i = i.dehydrated, i === null || tf(i) || ef(i)))
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
  var Ln = 0, xt = null, kt = null, re = null, uo = !1, Mi = !1, Ya = !1, co = 0, zl = 0, _i = null, _S = 0;
  function te() {
    throw Error(s(321));
  }
  function Qu(t, n) {
    if (n === null) return !1;
    for (var i = 0; i < n.length && i < t.length; i++)
      if (!He(t[i], n[i])) return !1;
    return !0;
  }
  function Fu(t, n, i, o, u, d) {
    return Ln = d, xt = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, L.H = t === null || t.memoizedState === null ? Fp : fc, Ya = !1, d = i(o, u), Ya = !1, Mi && (d = pp(
      n,
      i,
      o,
      u
    )), mp(t), d;
  }
  function mp(t) {
    L.H = Vl;
    var n = kt !== null && kt.next !== null;
    if (Ln = 0, re = kt = xt = null, uo = !1, zl = 0, _i = null, n) throw Error(s(300));
    t === null || ue || (t = t.dependencies, t !== null && to(t) && (ue = !0));
  }
  function pp(t, n, i, o) {
    xt = t;
    var u = 0;
    do {
      if (Mi && (_i = null), zl = 0, Mi = !1, 25 <= u) throw Error(s(301));
      if (u += 1, re = kt = null, t.updateQueue != null) {
        var d = t.updateQueue;
        d.lastEffect = null, d.events = null, d.stores = null, d.memoCache != null && (d.memoCache.index = 0);
      }
      L.H = Jp, d = n(i, o);
    } while (Mi);
    return d;
  }
  function DS() {
    var t = L.H, n = t.useState()[0];
    return n = typeof n.then == "function" ? Bl(n) : n, t = t.useState()[0], (kt !== null ? kt.memoizedState : null) !== t && (xt.flags |= 1024), n;
  }
  function Ju() {
    var t = co !== 0;
    return co = 0, t;
  }
  function Wu(t, n, i) {
    n.updateQueue = t.updateQueue, n.flags &= -2053, t.lanes &= ~i;
  }
  function Iu(t) {
    if (uo) {
      for (t = t.memoizedState; t !== null; ) {
        var n = t.queue;
        n !== null && (n.pending = null), t = t.next;
      }
      uo = !1;
    }
    Ln = 0, re = kt = xt = null, Mi = !1, zl = co = 0, _i = null;
  }
  function Me() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return re === null ? xt.memoizedState = re = t : re = re.next = t, re;
  }
  function le() {
    if (kt === null) {
      var t = xt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = kt.next;
    var n = re === null ? xt.memoizedState : re.next;
    if (n !== null)
      re = n, kt = t;
    else {
      if (t === null)
        throw xt.alternate === null ? Error(s(467)) : Error(s(310));
      kt = t, t = {
        memoizedState: kt.memoizedState,
        baseState: kt.baseState,
        baseQueue: kt.baseQueue,
        queue: kt.queue,
        next: null
      }, re === null ? xt.memoizedState = re = t : re = re.next = t;
    }
    return re;
  }
  function fo() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Bl(t) {
    var n = zl;
    return zl += 1, _i === null && (_i = []), t = lp(_i, t, n), n = xt, (re === null ? n.memoizedState : re.next) === null && (n = n.alternate, L.H = n === null || n.memoizedState === null ? Fp : fc), t;
  }
  function ho(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Bl(t);
      if (t.$$typeof === D) return xe(t);
    }
    throw Error(s(438, String(t)));
  }
  function tc(t) {
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
    if (n == null && (n = { data: [], index: 0 }), i === null && (i = fo(), xt.updateQueue = i), i.memoCache = n, i = n.data[n.index], i === void 0)
      for (i = n.data[n.index] = Array(t), o = 0; o < t; o++)
        i[o] = K;
    return n.index++, i;
  }
  function Vn(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function mo(t) {
    var n = le();
    return ec(n, kt, t);
  }
  function ec(t, n, i) {
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
      var C = x = null, O = null, Y = n, Q = !1;
      do {
        var W = Y.lane & -536870913;
        if (W !== Y.lane ? (jt & W) === W : (Ln & W) === W) {
          var X = Y.revertLane;
          if (X === 0)
            O !== null && (O = O.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: Y.action,
              hasEagerState: Y.hasEagerState,
              eagerState: Y.eagerState,
              next: null
            }), W === Ti && (Q = !0);
          else if ((Ln & X) === X) {
            Y = Y.next, X === Ti && (Q = !0);
            continue;
          } else
            W = {
              lane: 0,
              revertLane: Y.revertLane,
              gesture: null,
              action: Y.action,
              hasEagerState: Y.hasEagerState,
              eagerState: Y.eagerState,
              next: null
            }, O === null ? (C = O = W, x = d) : O = O.next = W, xt.lanes |= X, fa |= X;
          W = Y.action, Ya && i(d, W), d = Y.hasEagerState ? Y.eagerState : i(d, W);
        } else
          X = {
            lane: W,
            revertLane: Y.revertLane,
            gesture: Y.gesture,
            action: Y.action,
            hasEagerState: Y.hasEagerState,
            eagerState: Y.eagerState,
            next: null
          }, O === null ? (C = O = X, x = d) : O = O.next = X, xt.lanes |= W, fa |= W;
        Y = Y.next;
      } while (Y !== null && Y !== n);
      if (O === null ? x = d : O.next = C, !He(d, t.memoizedState) && (ue = !0, Q && (i = Ci, i !== null)))
        throw i;
      t.memoizedState = d, t.baseState = x, t.baseQueue = O, o.lastRenderedState = d;
    }
    return u === null && (o.lanes = 0), [t.memoizedState, o.dispatch];
  }
  function nc(t) {
    var n = le(), i = n.queue;
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
  function yp(t, n, i) {
    var o = xt, u = le(), d = At;
    if (d) {
      if (i === void 0) throw Error(s(407));
      i = i();
    } else i = n();
    var x = !He(
      (kt || u).memoizedState,
      i
    );
    if (x && (u.memoizedState = i, ue = !0), u = u.queue, lc(bp.bind(null, o, u, t), [
      t
    ]), u.getSnapshot !== n || x || re !== null && re.memoizedState.tag & 1) {
      if (o.flags |= 2048, Di(
        9,
        { destroy: void 0 },
        vp.bind(
          null,
          o,
          u,
          i,
          n
        ),
        null
      ), qt === null) throw Error(s(349));
      d || (Ln & 127) !== 0 || gp(o, n, i);
    }
    return i;
  }
  function gp(t, n, i) {
    t.flags |= 16384, t = { getSnapshot: n, value: i }, n = xt.updateQueue, n === null ? (n = fo(), xt.updateQueue = n, n.stores = [t]) : (i = n.stores, i === null ? n.stores = [t] : i.push(t));
  }
  function vp(t, n, i, o) {
    n.value = i, n.getSnapshot = o, xp(n) && Sp(t);
  }
  function bp(t, n, i) {
    return i(function() {
      xp(n) && Sp(t);
    });
  }
  function xp(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var i = n();
      return !He(t, i);
    } catch {
      return !0;
    }
  }
  function Sp(t) {
    var n = za(t, 2);
    n !== null && Ve(n, t, 2);
  }
  function ac(t) {
    var n = Me();
    if (typeof t == "function") {
      var i = t;
      if (t = i(), Ya) {
        Jn(!0);
        try {
          i();
        } finally {
          Jn(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = t, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Vn,
      lastRenderedState: t
    }, n;
  }
  function wp(t, n, i, o) {
    return t.baseState = i, ec(
      t,
      kt,
      typeof o == "function" ? o : Vn
    );
  }
  function RS(t, n, i, o, u) {
    if (go(t)) throw Error(s(485));
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
      L.T !== null ? i(!0) : d.isTransition = !1, o(d), i = n.pending, i === null ? (d.next = n.pending = d, Tp(n, d)) : (d.next = i.next, n.pending = i.next = d);
    }
  }
  function Tp(t, n) {
    var i = n.action, o = n.payload, u = t.state;
    if (n.isTransition) {
      var d = L.T, x = {};
      L.T = x;
      try {
        var C = i(u, o), O = L.S;
        O !== null && O(x, C), Cp(t, n, C);
      } catch (Y) {
        ic(t, n, Y);
      } finally {
        d !== null && x.types !== null && (d.types = x.types), L.T = d;
      }
    } else
      try {
        d = i(u, o), Cp(t, n, d);
      } catch (Y) {
        ic(t, n, Y);
      }
  }
  function Cp(t, n, i) {
    i !== null && typeof i == "object" && typeof i.then == "function" ? i.then(
      function(o) {
        jp(t, n, o);
      },
      function(o) {
        return ic(t, n, o);
      }
    ) : jp(t, n, i);
  }
  function jp(t, n, i) {
    n.status = "fulfilled", n.value = i, Ep(n), t.state = i, n = t.pending, n !== null && (i = n.next, i === n ? t.pending = null : (i = i.next, n.next = i, Tp(t, i)));
  }
  function ic(t, n, i) {
    var o = t.pending;
    if (t.pending = null, o !== null) {
      o = o.next;
      do
        n.status = "rejected", n.reason = i, Ep(n), n = n.next;
      while (n !== o);
    }
    t.action = null;
  }
  function Ep(t) {
    t = t.listeners;
    for (var n = 0; n < t.length; n++) (0, t[n])();
  }
  function Ap(t, n) {
    return n;
  }
  function Mp(t, n) {
    if (At) {
      var i = qt.formState;
      if (i !== null) {
        t: {
          var o = xt;
          if (At) {
            if (Qt) {
              e: {
                for (var u = Qt, d = nn; u.nodeType !== 8; ) {
                  if (!d) {
                    u = null;
                    break e;
                  }
                  if (u = ln(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break e;
                  }
                }
                d = u.data, u = d === "F!" || d === "F" ? u : null;
              }
              if (u) {
                Qt = ln(
                  u.nextSibling
                ), o = u.data === "F!";
                break t;
              }
            }
            na(o);
          }
          o = !1;
        }
        o && (n = i[0]);
      }
    }
    return i = Me(), i.memoizedState = i.baseState = n, o = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ap,
      lastRenderedState: n
    }, i.queue = o, i = Kp.bind(
      null,
      xt,
      o
    ), o.dispatch = i, o = ac(!1), d = cc.bind(
      null,
      xt,
      !1,
      o.queue
    ), o = Me(), u = {
      state: n,
      dispatch: null,
      action: t,
      pending: null
    }, o.queue = u, i = RS.bind(
      null,
      xt,
      u,
      d,
      i
    ), u.dispatch = i, o.memoizedState = t, [n, i, !1];
  }
  function _p(t) {
    var n = le();
    return Dp(n, kt, t);
  }
  function Dp(t, n, i) {
    if (n = ec(
      t,
      n,
      Ap
    )[0], t = mo(Vn)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var o = Bl(n);
      } catch (x) {
        throw x === ji ? ao : x;
      }
    else o = n;
    n = le();
    var u = n.queue, d = u.dispatch;
    return i !== n.memoizedState && (xt.flags |= 2048, Di(
      9,
      { destroy: void 0 },
      NS.bind(null, u, i),
      null
    )), [o, d, t];
  }
  function NS(t, n) {
    t.action = n;
  }
  function Rp(t) {
    var n = le(), i = kt;
    if (i !== null)
      return Dp(n, i, t);
    le(), n = n.memoizedState, i = le();
    var o = i.queue.dispatch;
    return i.memoizedState = t, [n, o, !1];
  }
  function Di(t, n, i, o) {
    return t = { tag: t, create: i, deps: o, inst: n, next: null }, n = xt.updateQueue, n === null && (n = fo(), xt.updateQueue = n), i = n.lastEffect, i === null ? n.lastEffect = t.next = t : (o = i.next, i.next = t, t.next = o, n.lastEffect = t), t;
  }
  function Np() {
    return le().memoizedState;
  }
  function po(t, n, i, o) {
    var u = Me();
    xt.flags |= t, u.memoizedState = Di(
      1 | n,
      { destroy: void 0 },
      i,
      o === void 0 ? null : o
    );
  }
  function yo(t, n, i, o) {
    var u = le();
    o = o === void 0 ? null : o;
    var d = u.memoizedState.inst;
    kt !== null && o !== null && Qu(o, kt.memoizedState.deps) ? u.memoizedState = Di(n, d, i, o) : (xt.flags |= t, u.memoizedState = Di(
      1 | n,
      d,
      i,
      o
    ));
  }
  function Op(t, n) {
    po(8390656, 8, t, n);
  }
  function lc(t, n) {
    yo(2048, 8, t, n);
  }
  function OS(t) {
    xt.flags |= 4;
    var n = xt.updateQueue;
    if (n === null)
      n = fo(), xt.updateQueue = n, n.events = [t];
    else {
      var i = n.events;
      i === null ? n.events = [t] : i.push(t);
    }
  }
  function zp(t) {
    var n = le().memoizedState;
    return OS({ ref: n, nextImpl: t }), function() {
      if ((Nt & 2) !== 0) throw Error(s(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function Bp(t, n) {
    return yo(4, 2, t, n);
  }
  function Lp(t, n) {
    return yo(4, 4, t, n);
  }
  function Vp(t, n) {
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
  function kp(t, n, i) {
    i = i != null ? i.concat([t]) : null, yo(4, 4, Vp.bind(null, n, t), i);
  }
  function sc() {
  }
  function Up(t, n) {
    var i = le();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    return n !== null && Qu(n, o[1]) ? o[0] : (i.memoizedState = [t, n], t);
  }
  function Hp(t, n) {
    var i = le();
    n = n === void 0 ? null : n;
    var o = i.memoizedState;
    if (n !== null && Qu(n, o[1]))
      return o[0];
    if (o = t(), Ya) {
      Jn(!0);
      try {
        t();
      } finally {
        Jn(!1);
      }
    }
    return i.memoizedState = [o, n], o;
  }
  function oc(t, n, i) {
    return i === void 0 || (Ln & 1073741824) !== 0 && (jt & 261930) === 0 ? t.memoizedState = n : (t.memoizedState = i, t = $1(), xt.lanes |= t, fa |= t, i);
  }
  function $p(t, n, i, o) {
    return He(i, n) ? i : Ai.current !== null ? (t = oc(t, i, o), He(t, n) || (ue = !0), t) : (Ln & 42) === 0 || (Ln & 1073741824) !== 0 && (jt & 261930) === 0 ? (ue = !0, t.memoizedState = i) : (t = $1(), xt.lanes |= t, fa |= t, n);
  }
  function qp(t, n, i, o, u) {
    var d = $.p;
    $.p = d !== 0 && 8 > d ? d : 8;
    var x = L.T, C = {};
    L.T = C, cc(t, !1, n, i);
    try {
      var O = u(), Y = L.S;
      if (Y !== null && Y(C, O), O !== null && typeof O == "object" && typeof O.then == "function") {
        var Q = MS(
          O,
          o
        );
        Ll(
          t,
          n,
          Q,
          Pe(t)
        );
      } else
        Ll(
          t,
          n,
          o,
          Pe(t)
        );
    } catch (W) {
      Ll(
        t,
        n,
        { then: function() {
        }, status: "rejected", reason: W },
        Pe()
      );
    } finally {
      $.p = d, x !== null && C.types !== null && (x.types = C.types), L.T = x;
    }
  }
  function zS() {
  }
  function rc(t, n, i, o) {
    if (t.tag !== 5) throw Error(s(476));
    var u = Yp(t).queue;
    qp(
      t,
      u,
      n,
      et,
      i === null ? zS : function() {
        return Gp(t), i(o);
      }
    );
  }
  function Yp(t) {
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
        lastRenderedReducer: Vn,
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
        lastRenderedReducer: Vn,
        lastRenderedState: i
      },
      next: null
    }, t.memoizedState = n, t = t.alternate, t !== null && (t.memoizedState = n), n;
  }
  function Gp(t) {
    var n = Yp(t);
    n.next === null && (n = t.alternate.memoizedState), Ll(
      t,
      n.next.queue,
      {},
      Pe()
    );
  }
  function uc() {
    return xe(Il);
  }
  function Xp() {
    return le().memoizedState;
  }
  function Pp() {
    return le().memoizedState;
  }
  function BS(t) {
    for (var n = t.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var i = Pe();
          t = la(i);
          var o = sa(n, t, i);
          o !== null && (Ve(o, n, i), Rl(o, n, i)), n = { cache: ku() }, t.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function LS(t, n, i) {
    var o = Pe();
    i = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, go(t) ? Zp(n, i) : (i = Au(t, n, i, o), i !== null && (Ve(i, t, o), Qp(i, n, o)));
  }
  function Kp(t, n, i) {
    var o = Pe();
    Ll(t, n, i, o);
  }
  function Ll(t, n, i, o) {
    var u = {
      lane: o,
      revertLane: 0,
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (go(t)) Zp(n, u);
    else {
      var d = t.alternate;
      if (t.lanes === 0 && (d === null || d.lanes === 0) && (d = n.lastRenderedReducer, d !== null))
        try {
          var x = n.lastRenderedState, C = d(x, i);
          if (u.hasEagerState = !0, u.eagerState = C, He(C, x))
            return Fs(t, n, u, 0), qt === null && Qs(), !1;
        } catch {
        } finally {
        }
      if (i = Au(t, n, u, o), i !== null)
        return Ve(i, t, o), Qp(i, n, o), !0;
    }
    return !1;
  }
  function cc(t, n, i, o) {
    if (o = {
      lane: 2,
      revertLane: qc(),
      gesture: null,
      action: o,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, go(t)) {
      if (n) throw Error(s(479));
    } else
      n = Au(
        t,
        i,
        o,
        2
      ), n !== null && Ve(n, t, 2);
  }
  function go(t) {
    var n = t.alternate;
    return t === xt || n !== null && n === xt;
  }
  function Zp(t, n) {
    Mi = uo = !0;
    var i = t.pending;
    i === null ? n.next = n : (n.next = i.next, i.next = n), t.pending = n;
  }
  function Qp(t, n, i) {
    if ((i & 4194048) !== 0) {
      var o = n.lanes;
      o &= t.pendingLanes, i |= o, n.lanes = i, tm(t, i);
    }
  }
  var Vl = {
    readContext: xe,
    use: ho,
    useCallback: te,
    useContext: te,
    useEffect: te,
    useImperativeHandle: te,
    useLayoutEffect: te,
    useInsertionEffect: te,
    useMemo: te,
    useReducer: te,
    useRef: te,
    useState: te,
    useDebugValue: te,
    useDeferredValue: te,
    useTransition: te,
    useSyncExternalStore: te,
    useId: te,
    useHostTransitionStatus: te,
    useFormState: te,
    useActionState: te,
    useOptimistic: te,
    useMemoCache: te,
    useCacheRefresh: te
  };
  Vl.useEffectEvent = te;
  var Fp = {
    readContext: xe,
    use: ho,
    useCallback: function(t, n) {
      return Me().memoizedState = [
        t,
        n === void 0 ? null : n
      ], t;
    },
    useContext: xe,
    useEffect: Op,
    useImperativeHandle: function(t, n, i) {
      i = i != null ? i.concat([t]) : null, po(
        4194308,
        4,
        Vp.bind(null, n, t),
        i
      );
    },
    useLayoutEffect: function(t, n) {
      return po(4194308, 4, t, n);
    },
    useInsertionEffect: function(t, n) {
      po(4, 2, t, n);
    },
    useMemo: function(t, n) {
      var i = Me();
      n = n === void 0 ? null : n;
      var o = t();
      if (Ya) {
        Jn(!0);
        try {
          t();
        } finally {
          Jn(!1);
        }
      }
      return i.memoizedState = [o, n], o;
    },
    useReducer: function(t, n, i) {
      var o = Me();
      if (i !== void 0) {
        var u = i(n);
        if (Ya) {
          Jn(!0);
          try {
            i(n);
          } finally {
            Jn(!1);
          }
        }
      } else u = n;
      return o.memoizedState = o.baseState = u, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: u
      }, o.queue = t, t = t.dispatch = LS.bind(
        null,
        xt,
        t
      ), [o.memoizedState, t];
    },
    useRef: function(t) {
      var n = Me();
      return t = { current: t }, n.memoizedState = t;
    },
    useState: function(t) {
      t = ac(t);
      var n = t.queue, i = Kp.bind(null, xt, n);
      return n.dispatch = i, [t.memoizedState, i];
    },
    useDebugValue: sc,
    useDeferredValue: function(t, n) {
      var i = Me();
      return oc(i, t, n);
    },
    useTransition: function() {
      var t = ac(!1);
      return t = qp.bind(
        null,
        xt,
        t.queue,
        !0,
        !1
      ), Me().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, n, i) {
      var o = xt, u = Me();
      if (At) {
        if (i === void 0)
          throw Error(s(407));
        i = i();
      } else {
        if (i = n(), qt === null)
          throw Error(s(349));
        (jt & 127) !== 0 || gp(o, n, i);
      }
      u.memoizedState = i;
      var d = { value: i, getSnapshot: n };
      return u.queue = d, Op(bp.bind(null, o, d, t), [
        t
      ]), o.flags |= 2048, Di(
        9,
        { destroy: void 0 },
        vp.bind(
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
      var t = Me(), n = qt.identifierPrefix;
      if (At) {
        var i = wn, o = Sn;
        i = (o & ~(1 << 32 - Ue(o) - 1)).toString(32) + i, n = "_" + n + "R_" + i, i = co++, 0 < i && (n += "H" + i.toString(32)), n += "_";
      } else
        i = _S++, n = "_" + n + "r_" + i.toString(32) + "_";
      return t.memoizedState = n;
    },
    useHostTransitionStatus: uc,
    useFormState: Mp,
    useActionState: Mp,
    useOptimistic: function(t) {
      var n = Me();
      n.memoizedState = n.baseState = t;
      var i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = i, n = cc.bind(
        null,
        xt,
        !0,
        i
      ), i.dispatch = n, [t, n];
    },
    useMemoCache: tc,
    useCacheRefresh: function() {
      return Me().memoizedState = BS.bind(
        null,
        xt
      );
    },
    useEffectEvent: function(t) {
      var n = Me(), i = { impl: t };
      return n.memoizedState = i, function() {
        if ((Nt & 2) !== 0)
          throw Error(s(440));
        return i.impl.apply(void 0, arguments);
      };
    }
  }, fc = {
    readContext: xe,
    use: ho,
    useCallback: Up,
    useContext: xe,
    useEffect: lc,
    useImperativeHandle: kp,
    useInsertionEffect: Bp,
    useLayoutEffect: Lp,
    useMemo: Hp,
    useReducer: mo,
    useRef: Np,
    useState: function() {
      return mo(Vn);
    },
    useDebugValue: sc,
    useDeferredValue: function(t, n) {
      var i = le();
      return $p(
        i,
        kt.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = mo(Vn)[0], n = le().memoizedState;
      return [
        typeof t == "boolean" ? t : Bl(t),
        n
      ];
    },
    useSyncExternalStore: yp,
    useId: Xp,
    useHostTransitionStatus: uc,
    useFormState: _p,
    useActionState: _p,
    useOptimistic: function(t, n) {
      var i = le();
      return wp(i, kt, t, n);
    },
    useMemoCache: tc,
    useCacheRefresh: Pp
  };
  fc.useEffectEvent = zp;
  var Jp = {
    readContext: xe,
    use: ho,
    useCallback: Up,
    useContext: xe,
    useEffect: lc,
    useImperativeHandle: kp,
    useInsertionEffect: Bp,
    useLayoutEffect: Lp,
    useMemo: Hp,
    useReducer: nc,
    useRef: Np,
    useState: function() {
      return nc(Vn);
    },
    useDebugValue: sc,
    useDeferredValue: function(t, n) {
      var i = le();
      return kt === null ? oc(i, t, n) : $p(
        i,
        kt.memoizedState,
        t,
        n
      );
    },
    useTransition: function() {
      var t = nc(Vn)[0], n = le().memoizedState;
      return [
        typeof t == "boolean" ? t : Bl(t),
        n
      ];
    },
    useSyncExternalStore: yp,
    useId: Xp,
    useHostTransitionStatus: uc,
    useFormState: Rp,
    useActionState: Rp,
    useOptimistic: function(t, n) {
      var i = le();
      return kt !== null ? wp(i, kt, t, n) : (i.baseState = t, [t, i.queue.dispatch]);
    },
    useMemoCache: tc,
    useCacheRefresh: Pp
  };
  Jp.useEffectEvent = zp;
  function dc(t, n, i, o) {
    n = t.memoizedState, i = i(o, n), i = i == null ? n : v({}, n, i), t.memoizedState = i, t.lanes === 0 && (t.updateQueue.baseState = i);
  }
  var hc = {
    enqueueSetState: function(t, n, i) {
      t = t._reactInternals;
      var o = Pe(), u = la(o);
      u.payload = n, i != null && (u.callback = i), n = sa(t, u, o), n !== null && (Ve(n, t, o), Rl(n, t, o));
    },
    enqueueReplaceState: function(t, n, i) {
      t = t._reactInternals;
      var o = Pe(), u = la(o);
      u.tag = 1, u.payload = n, i != null && (u.callback = i), n = sa(t, u, o), n !== null && (Ve(n, t, o), Rl(n, t, o));
    },
    enqueueForceUpdate: function(t, n) {
      t = t._reactInternals;
      var i = Pe(), o = la(i);
      o.tag = 2, n != null && (o.callback = n), n = sa(t, o, i), n !== null && (Ve(n, t, i), Rl(n, t, i));
    }
  };
  function Wp(t, n, i, o, u, d, x) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(o, d, x) : n.prototype && n.prototype.isPureReactComponent ? !Tl(i, o) || !Tl(u, d) : !0;
  }
  function Ip(t, n, i, o) {
    t = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(i, o), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(i, o), n.state !== t && hc.enqueueReplaceState(n, n.state, null);
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
  function t1(t) {
    Zs(t);
  }
  function e1(t) {
    console.error(t);
  }
  function n1(t) {
    Zs(t);
  }
  function vo(t, n) {
    try {
      var i = t.onUncaughtError;
      i(n.value, { componentStack: n.stack });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function a1(t, n, i) {
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
  function mc(t, n, i) {
    return i = la(i), i.tag = 3, i.payload = { element: null }, i.callback = function() {
      vo(t, n);
    }, i;
  }
  function i1(t) {
    return t = la(t), t.tag = 3, t;
  }
  function l1(t, n, i, o) {
    var u = i.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var d = o.value;
      t.payload = function() {
        return u(d);
      }, t.callback = function() {
        a1(n, i, o);
      };
    }
    var x = i.stateNode;
    x !== null && typeof x.componentDidCatch == "function" && (t.callback = function() {
      a1(n, i, o), typeof u != "function" && (da === null ? da = /* @__PURE__ */ new Set([this]) : da.add(this));
      var C = o.stack;
      this.componentDidCatch(o.value, {
        componentStack: C !== null ? C : ""
      });
    });
  }
  function VS(t, n, i, o, u) {
    if (i.flags |= 32768, o !== null && typeof o == "object" && typeof o.then == "function") {
      if (n = i.alternate, n !== null && wi(
        n,
        i,
        u,
        !0
      ), i = qe.current, i !== null) {
        switch (i.tag) {
          case 31:
          case 13:
            return an === null ? Do() : i.alternate === null && ee === 0 && (ee = 3), i.flags &= -257, i.flags |= 65536, i.lanes = u, o === io ? i.flags |= 16384 : (n = i.updateQueue, n === null ? i.updateQueue = /* @__PURE__ */ new Set([o]) : n.add(o), Uc(t, o, u)), !1;
          case 22:
            return i.flags |= 65536, o === io ? i.flags |= 16384 : (n = i.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([o])
            }, i.updateQueue = n) : (i = n.retryQueue, i === null ? n.retryQueue = /* @__PURE__ */ new Set([o]) : i.add(o)), Uc(t, o, u)), !1;
        }
        throw Error(s(435, i.tag));
      }
      return Uc(t, o, u), Do(), !1;
    }
    if (At)
      return n = qe.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = u, o !== Ou && (t = Error(s(422), { cause: o }), El(Ie(t, i)))) : (o !== Ou && (n = Error(s(423), {
        cause: o
      }), El(
        Ie(n, i)
      )), t = t.current.alternate, t.flags |= 65536, u &= -u, t.lanes |= u, o = Ie(o, i), u = mc(
        t.stateNode,
        o,
        u
      ), Gu(t, u), ee !== 4 && (ee = 2)), !1;
    var d = Error(s(520), { cause: o });
    if (d = Ie(d, i), Xl === null ? Xl = [d] : Xl.push(d), ee !== 4 && (ee = 2), n === null) return !0;
    o = Ie(o, i), i = n;
    do {
      switch (i.tag) {
        case 3:
          return i.flags |= 65536, t = u & -u, i.lanes |= t, t = mc(i.stateNode, o, t), Gu(i, t), !1;
        case 1:
          if (n = i.type, d = i.stateNode, (i.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (da === null || !da.has(d))))
            return i.flags |= 65536, u &= -u, i.lanes |= u, u = i1(u), l1(
              u,
              t,
              i,
              o
            ), Gu(i, u), !1;
      }
      i = i.return;
    } while (i !== null);
    return !1;
  }
  var pc = Error(s(461)), ue = !1;
  function Se(t, n, i, o) {
    n.child = t === null ? up(n, null, i, o) : qa(
      n,
      t.child,
      i,
      o
    );
  }
  function s1(t, n, i, o, u) {
    i = i.render;
    var d = n.ref;
    if ("ref" in o) {
      var x = {};
      for (var C in o)
        C !== "ref" && (x[C] = o[C]);
    } else x = o;
    return ka(n), o = Fu(
      t,
      n,
      i,
      x,
      d,
      u
    ), C = Ju(), t !== null && !ue ? (Wu(t, n, u), kn(t, n, u)) : (At && C && Ru(n), n.flags |= 1, Se(t, n, o, u), n.child);
  }
  function o1(t, n, i, o, u) {
    if (t === null) {
      var d = i.type;
      return typeof d == "function" && !Mu(d) && d.defaultProps === void 0 && i.compare === null ? (n.tag = 15, n.type = d, r1(
        t,
        n,
        d,
        o,
        u
      )) : (t = Ws(
        i.type,
        null,
        o,
        n,
        n.mode,
        u
      ), t.ref = n.ref, t.return = n, n.child = t);
    }
    if (d = t.child, !Tc(t, u)) {
      var x = d.memoizedProps;
      if (i = i.compare, i = i !== null ? i : Tl, i(x, o) && t.ref === n.ref)
        return kn(t, n, u);
    }
    return n.flags |= 1, t = Nn(d, o), t.ref = n.ref, t.return = n, n.child = t;
  }
  function r1(t, n, i, o, u) {
    if (t !== null) {
      var d = t.memoizedProps;
      if (Tl(d, o) && t.ref === n.ref)
        if (ue = !1, n.pendingProps = o = d, Tc(t, u))
          (t.flags & 131072) !== 0 && (ue = !0);
        else
          return n.lanes = t.lanes, kn(t, n, u);
    }
    return yc(
      t,
      n,
      i,
      o,
      u
    );
  }
  function u1(t, n, i, o) {
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
        return c1(
          t,
          n,
          d,
          i,
          o
        );
      }
      if ((i & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && no(
          n,
          d !== null ? d.cachePool : null
        ), d !== null ? dp(n, d) : Pu(), hp(n);
      else
        return o = n.lanes = 536870912, c1(
          t,
          n,
          d !== null ? d.baseLanes | i : i,
          i,
          o
        );
    } else
      d !== null ? (no(n, d.cachePool), dp(n, d), ra(), n.memoizedState = null) : (t !== null && no(n, null), Pu(), ra());
    return Se(t, n, u, i), n.child;
  }
  function kl(t, n) {
    return t !== null && t.tag === 22 || n.stateNode !== null || (n.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), n.sibling;
  }
  function c1(t, n, i, o, u) {
    var d = Hu();
    return d = d === null ? null : { parent: oe._currentValue, pool: d }, n.memoizedState = {
      baseLanes: i,
      cachePool: d
    }, t !== null && no(n, null), Pu(), hp(n), t !== null && wi(t, n, o, !0), n.childLanes = u, null;
  }
  function bo(t, n) {
    return n = So(
      { mode: n.mode, children: n.children },
      t.mode
    ), n.ref = t.ref, t.child = n, n.return = t, n;
  }
  function f1(t, n, i) {
    return qa(n, t.child, null, i), t = bo(n, n.pendingProps), t.flags |= 2, Ye(n), n.memoizedState = null, t;
  }
  function kS(t, n, i) {
    var o = n.pendingProps, u = (n.flags & 128) !== 0;
    if (n.flags &= -129, t === null) {
      if (At) {
        if (o.mode === "hidden")
          return t = bo(n, o), n.lanes = 536870912, kl(null, t);
        if (Zu(n), (t = Qt) ? (t = T0(
          t,
          nn
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: ta !== null ? { id: Sn, overflow: wn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Zm(t), i.return = n, n.child = i, be = n, Qt = null)) : t = null, t === null) throw na(n);
        return n.lanes = 536870912, null;
      }
      return bo(n, o);
    }
    var d = t.memoizedState;
    if (d !== null) {
      var x = d.dehydrated;
      if (Zu(n), u)
        if (n.flags & 256)
          n.flags &= -257, n = f1(
            t,
            n,
            i
          );
        else if (n.memoizedState !== null)
          n.child = t.child, n.flags |= 128, n = null;
        else throw Error(s(558));
      else if (ue || wi(t, n, i, !1), u = (i & t.childLanes) !== 0, ue || u) {
        if (o = qt, o !== null && (x = em(o, i), x !== 0 && x !== d.retryLane))
          throw d.retryLane = x, za(t, x), Ve(o, t, x), pc;
        Do(), n = f1(
          t,
          n,
          i
        );
      } else
        t = d.treeContext, Qt = ln(x.nextSibling), be = n, At = !0, ea = null, nn = !1, t !== null && Jm(n, t), n = bo(n, o), n.flags |= 4096;
      return n;
    }
    return t = Nn(t.child, {
      mode: o.mode,
      children: o.children
    }), t.ref = n.ref, n.child = t, t.return = n, t;
  }
  function xo(t, n) {
    var i = n.ref;
    if (i === null)
      t !== null && t.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof i != "function" && typeof i != "object")
        throw Error(s(284));
      (t === null || t.ref !== i) && (n.flags |= 4194816);
    }
  }
  function yc(t, n, i, o, u) {
    return ka(n), i = Fu(
      t,
      n,
      i,
      o,
      void 0,
      u
    ), o = Ju(), t !== null && !ue ? (Wu(t, n, u), kn(t, n, u)) : (At && o && Ru(n), n.flags |= 1, Se(t, n, i, u), n.child);
  }
  function d1(t, n, i, o, u, d) {
    return ka(n), n.updateQueue = null, i = pp(
      n,
      o,
      i,
      u
    ), mp(t), o = Ju(), t !== null && !ue ? (Wu(t, n, d), kn(t, n, d)) : (At && o && Ru(n), n.flags |= 1, Se(t, n, i, d), n.child);
  }
  function h1(t, n, i, o, u) {
    if (ka(n), n.stateNode === null) {
      var d = vi, x = i.contextType;
      typeof x == "object" && x !== null && (d = xe(x)), d = new i(o, d), n.memoizedState = d.state !== null && d.state !== void 0 ? d.state : null, d.updater = hc, n.stateNode = d, d._reactInternals = n, d = n.stateNode, d.props = o, d.state = n.memoizedState, d.refs = {}, qu(n), x = i.contextType, d.context = typeof x == "object" && x !== null ? xe(x) : vi, d.state = n.memoizedState, x = i.getDerivedStateFromProps, typeof x == "function" && (dc(
        n,
        i,
        x,
        o
      ), d.state = n.memoizedState), typeof i.getDerivedStateFromProps == "function" || typeof d.getSnapshotBeforeUpdate == "function" || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (x = d.state, typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount(), x !== d.state && hc.enqueueReplaceState(d, d.state, null), Ol(n, o, d, u), Nl(), d.state = n.memoizedState), typeof d.componentDidMount == "function" && (n.flags |= 4194308), o = !0;
    } else if (t === null) {
      d = n.stateNode;
      var C = n.memoizedProps, O = Ga(i, C);
      d.props = O;
      var Y = d.context, Q = i.contextType;
      x = vi, typeof Q == "object" && Q !== null && (x = xe(Q));
      var W = i.getDerivedStateFromProps;
      Q = typeof W == "function" || typeof d.getSnapshotBeforeUpdate == "function", C = n.pendingProps !== C, Q || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (C || Y !== x) && Ip(
        n,
        d,
        o,
        x
      ), ia = !1;
      var X = n.memoizedState;
      d.state = X, Ol(n, o, d, u), Nl(), Y = n.memoizedState, C || X !== Y || ia ? (typeof W == "function" && (dc(
        n,
        i,
        W,
        o
      ), Y = n.memoizedState), (O = ia || Wp(
        n,
        i,
        O,
        o,
        X,
        Y,
        x
      )) ? (Q || typeof d.UNSAFE_componentWillMount != "function" && typeof d.componentWillMount != "function" || (typeof d.componentWillMount == "function" && d.componentWillMount(), typeof d.UNSAFE_componentWillMount == "function" && d.UNSAFE_componentWillMount()), typeof d.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = o, n.memoizedState = Y), d.props = o, d.state = Y, d.context = x, o = O) : (typeof d.componentDidMount == "function" && (n.flags |= 4194308), o = !1);
    } else {
      d = n.stateNode, Yu(t, n), x = n.memoizedProps, Q = Ga(i, x), d.props = Q, W = n.pendingProps, X = d.context, Y = i.contextType, O = vi, typeof Y == "object" && Y !== null && (O = xe(Y)), C = i.getDerivedStateFromProps, (Y = typeof C == "function" || typeof d.getSnapshotBeforeUpdate == "function") || typeof d.UNSAFE_componentWillReceiveProps != "function" && typeof d.componentWillReceiveProps != "function" || (x !== W || X !== O) && Ip(
        n,
        d,
        o,
        O
      ), ia = !1, X = n.memoizedState, d.state = X, Ol(n, o, d, u), Nl();
      var P = n.memoizedState;
      x !== W || X !== P || ia || t !== null && t.dependencies !== null && to(t.dependencies) ? (typeof C == "function" && (dc(
        n,
        i,
        C,
        o
      ), P = n.memoizedState), (Q = ia || Wp(
        n,
        i,
        Q,
        o,
        X,
        P,
        O
      ) || t !== null && t.dependencies !== null && to(t.dependencies)) ? (Y || typeof d.UNSAFE_componentWillUpdate != "function" && typeof d.componentWillUpdate != "function" || (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(o, P, O), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(
        o,
        P,
        O
      )), typeof d.componentDidUpdate == "function" && (n.flags |= 4), typeof d.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof d.componentDidUpdate != "function" || x === t.memoizedProps && X === t.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || x === t.memoizedProps && X === t.memoizedState || (n.flags |= 1024), n.memoizedProps = o, n.memoizedState = P), d.props = o, d.state = P, d.context = O, o = Q) : (typeof d.componentDidUpdate != "function" || x === t.memoizedProps && X === t.memoizedState || (n.flags |= 4), typeof d.getSnapshotBeforeUpdate != "function" || x === t.memoizedProps && X === t.memoizedState || (n.flags |= 1024), o = !1);
    }
    return d = o, xo(t, n), o = (n.flags & 128) !== 0, d || o ? (d = n.stateNode, i = o && typeof i.getDerivedStateFromError != "function" ? null : d.render(), n.flags |= 1, t !== null && o ? (n.child = qa(
      n,
      t.child,
      null,
      u
    ), n.child = qa(
      n,
      null,
      i,
      u
    )) : Se(t, n, i, u), n.memoizedState = d.state, t = n.child) : t = kn(
      t,
      n,
      u
    ), t;
  }
  function m1(t, n, i, o) {
    return La(), n.flags |= 256, Se(t, n, i, o), n.child;
  }
  var gc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function vc(t) {
    return { baseLanes: t, cachePool: ap() };
  }
  function bc(t, n, i) {
    return t = t !== null ? t.childLanes & ~i : 0, n && (t |= Xe), t;
  }
  function p1(t, n, i) {
    var o = n.pendingProps, u = !1, d = (n.flags & 128) !== 0, x;
    if ((x = d) || (x = t !== null && t.memoizedState === null ? !1 : (ie.current & 2) !== 0), x && (u = !0, n.flags &= -129), x = (n.flags & 32) !== 0, n.flags &= -33, t === null) {
      if (At) {
        if (u ? oa(n) : ra(), (t = Qt) ? (t = T0(
          t,
          nn
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (n.memoizedState = {
          dehydrated: t,
          treeContext: ta !== null ? { id: Sn, overflow: wn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, i = Zm(t), i.return = n, n.child = i, be = n, Qt = null)) : t = null, t === null) throw na(n);
        return ef(t) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      var C = o.children;
      return o = o.fallback, u ? (ra(), u = n.mode, C = So(
        { mode: "hidden", children: C },
        u
      ), o = Ba(
        o,
        u,
        i,
        null
      ), C.return = n, o.return = n, C.sibling = o, n.child = C, o = n.child, o.memoizedState = vc(i), o.childLanes = bc(
        t,
        x,
        i
      ), n.memoizedState = gc, kl(null, o)) : (oa(n), xc(n, C));
    }
    var O = t.memoizedState;
    if (O !== null && (C = O.dehydrated, C !== null)) {
      if (d)
        n.flags & 256 ? (oa(n), n.flags &= -257, n = Sc(
          t,
          n,
          i
        )) : n.memoizedState !== null ? (ra(), n.child = t.child, n.flags |= 128, n = null) : (ra(), C = o.fallback, u = n.mode, o = So(
          { mode: "visible", children: o.children },
          u
        ), C = Ba(
          C,
          u,
          i,
          null
        ), C.flags |= 2, o.return = n, C.return = n, o.sibling = C, n.child = o, qa(
          n,
          t.child,
          null,
          i
        ), o = n.child, o.memoizedState = vc(i), o.childLanes = bc(
          t,
          x,
          i
        ), n.memoizedState = gc, n = kl(null, o));
      else if (oa(n), ef(C)) {
        if (x = C.nextSibling && C.nextSibling.dataset, x) var Y = x.dgst;
        x = Y, o = Error(s(419)), o.stack = "", o.digest = x, El({ value: o, source: null, stack: null }), n = Sc(
          t,
          n,
          i
        );
      } else if (ue || wi(t, n, i, !1), x = (i & t.childLanes) !== 0, ue || x) {
        if (x = qt, x !== null && (o = em(x, i), o !== 0 && o !== O.retryLane))
          throw O.retryLane = o, za(t, o), Ve(x, t, o), pc;
        tf(C) || Do(), n = Sc(
          t,
          n,
          i
        );
      } else
        tf(C) ? (n.flags |= 192, n.child = t.child, n = null) : (t = O.treeContext, Qt = ln(
          C.nextSibling
        ), be = n, At = !0, ea = null, nn = !1, t !== null && Jm(n, t), n = xc(
          n,
          o.children
        ), n.flags |= 4096);
      return n;
    }
    return u ? (ra(), C = o.fallback, u = n.mode, O = t.child, Y = O.sibling, o = Nn(O, {
      mode: "hidden",
      children: o.children
    }), o.subtreeFlags = O.subtreeFlags & 65011712, Y !== null ? C = Nn(
      Y,
      C
    ) : (C = Ba(
      C,
      u,
      i,
      null
    ), C.flags |= 2), C.return = n, o.return = n, o.sibling = C, n.child = o, kl(null, o), o = n.child, C = t.child.memoizedState, C === null ? C = vc(i) : (u = C.cachePool, u !== null ? (O = oe._currentValue, u = u.parent !== O ? { parent: O, pool: O } : u) : u = ap(), C = {
      baseLanes: C.baseLanes | i,
      cachePool: u
    }), o.memoizedState = C, o.childLanes = bc(
      t,
      x,
      i
    ), n.memoizedState = gc, kl(t.child, o)) : (oa(n), i = t.child, t = i.sibling, i = Nn(i, {
      mode: "visible",
      children: o.children
    }), i.return = n, i.sibling = null, t !== null && (x = n.deletions, x === null ? (n.deletions = [t], n.flags |= 16) : x.push(t)), n.child = i, n.memoizedState = null, i);
  }
  function xc(t, n) {
    return n = So(
      { mode: "visible", children: n },
      t.mode
    ), n.return = t, t.child = n;
  }
  function So(t, n) {
    return t = $e(22, t, null, n), t.lanes = 0, t;
  }
  function Sc(t, n, i) {
    return qa(n, t.child, null, i), t = xc(
      n,
      n.pendingProps.children
    ), t.flags |= 2, n.memoizedState = null, t;
  }
  function y1(t, n, i) {
    t.lanes |= n;
    var o = t.alternate;
    o !== null && (o.lanes |= n), Lu(t.return, n, i);
  }
  function wc(t, n, i, o, u, d) {
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
  function g1(t, n, i) {
    var o = n.pendingProps, u = o.revealOrder, d = o.tail;
    o = o.children;
    var x = ie.current, C = (x & 2) !== 0;
    if (C ? (x = x & 1 | 2, n.flags |= 128) : x &= 1, I(ie, x), Se(t, n, o, i), o = At ? jl : 0, !C && t !== null && (t.flags & 128) !== 0)
      t: for (t = n.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && y1(t, i, n);
        else if (t.tag === 19)
          y1(t, i, n);
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
          t = i.alternate, t !== null && ro(t) === null && (u = i), i = i.sibling;
        i = u, i === null ? (u = n.child, n.child = null) : (u = i.sibling, i.sibling = null), wc(
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
          if (t = u.alternate, t !== null && ro(t) === null) {
            n.child = u;
            break;
          }
          t = u.sibling, u.sibling = i, i = u, u = t;
        }
        wc(
          n,
          !0,
          i,
          null,
          d,
          o
        );
        break;
      case "together":
        wc(
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
  function kn(t, n, i) {
    if (t !== null && (n.dependencies = t.dependencies), fa |= n.lanes, (i & n.childLanes) === 0)
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
      for (t = n.child, i = Nn(t, t.pendingProps), n.child = i, i.return = n; t.sibling !== null; )
        t = t.sibling, i = i.sibling = Nn(t, t.pendingProps), i.return = n;
      i.sibling = null;
    }
    return n.child;
  }
  function Tc(t, n) {
    return (t.lanes & n) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && to(t)));
  }
  function US(t, n, i) {
    switch (n.tag) {
      case 3:
        Rt(n, n.stateNode.containerInfo), aa(n, oe, t.memoizedState.cache), La();
        break;
      case 27:
      case 5:
        Pt(n);
        break;
      case 4:
        Rt(n, n.stateNode.containerInfo);
        break;
      case 10:
        aa(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, Zu(n), null;
        break;
      case 13:
        var o = n.memoizedState;
        if (o !== null)
          return o.dehydrated !== null ? (oa(n), n.flags |= 128, null) : (i & n.child.childLanes) !== 0 ? p1(t, n, i) : (oa(n), t = kn(
            t,
            n,
            i
          ), t !== null ? t.sibling : null);
        oa(n);
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
            return g1(
              t,
              n,
              i
            );
          n.flags |= 128;
        }
        if (u = n.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), I(ie, ie.current), o) break;
        return null;
      case 22:
        return n.lanes = 0, u1(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        aa(n, oe, t.memoizedState.cache);
    }
    return kn(t, n, i);
  }
  function v1(t, n, i) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps)
        ue = !0;
      else {
        if (!Tc(t, i) && (n.flags & 128) === 0)
          return ue = !1, US(
            t,
            n,
            i
          );
        ue = (t.flags & 131072) !== 0;
      }
    else
      ue = !1, At && (n.flags & 1048576) !== 0 && Fm(n, jl, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        t: {
          var o = n.pendingProps;
          if (t = Ha(n.elementType), n.type = t, typeof t == "function")
            Mu(t) ? (o = Ga(t, o), n.tag = 1, n = h1(
              null,
              n,
              t,
              o,
              i
            )) : (n.tag = 0, n = yc(
              null,
              n,
              t,
              o,
              i
            ));
          else {
            if (t != null) {
              var u = t.$$typeof;
              if (u === N) {
                n.tag = 11, n = s1(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break t;
              } else if (u === A) {
                n.tag = 14, n = o1(
                  null,
                  n,
                  t,
                  o,
                  i
                );
                break t;
              }
            }
            throw n = Z(t) || t, Error(s(306, n, ""));
          }
        }
        return n;
      case 0:
        return yc(
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
        ), h1(
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
          u = d.element, Yu(t, n), Ol(n, o, null, i);
          var x = n.memoizedState;
          if (o = x.cache, aa(n, oe, o), o !== d.cache && Vu(
            n,
            [oe],
            i,
            !0
          ), Nl(), o = x.element, d.isDehydrated)
            if (d = {
              element: o,
              isDehydrated: !1,
              cache: x.cache
            }, n.updateQueue.baseState = d, n.memoizedState = d, n.flags & 256) {
              n = m1(
                t,
                n,
                o,
                i
              );
              break t;
            } else if (o !== u) {
              u = Ie(
                Error(s(424)),
                n
              ), El(u), n = m1(
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
              for (Qt = ln(t.firstChild), be = n, At = !0, ea = null, nn = !0, i = up(
                n,
                null,
                o,
                i
              ), n.child = i; i; )
                i.flags = i.flags & -3 | 4096, i = i.sibling;
            }
          else {
            if (La(), o === u) {
              n = kn(
                t,
                n,
                i
              );
              break t;
            }
            Se(t, n, o, i);
          }
          n = n.child;
        }
        return n;
      case 26:
        return xo(t, n), t === null ? (i = _0(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = i : At || (i = n.type, t = n.pendingProps, o = Vo(
          pt.current
        ).createElement(i), o[ve] = n, o[Re] = t, we(o, i, t), ye(o), n.stateNode = o) : n.memoizedState = _0(
          n.type,
          t.memoizedProps,
          n.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Pt(n), t === null && At && (o = n.stateNode = E0(
          n.type,
          n.pendingProps,
          pt.current
        ), be = n, nn = !0, u = Qt, ya(n.type) ? (nf = u, Qt = ln(o.firstChild)) : Qt = u), Se(
          t,
          n,
          n.pendingProps.children,
          i
        ), xo(t, n), t === null && (n.flags |= 4194304), n.child;
      case 5:
        return t === null && At && ((u = o = Qt) && (o = p3(
          o,
          n.type,
          n.pendingProps,
          nn
        ), o !== null ? (n.stateNode = o, be = n, Qt = ln(o.firstChild), nn = !1, u = !0) : u = !1), u || na(n)), Pt(n), u = n.type, d = n.pendingProps, x = t !== null ? t.memoizedProps : null, o = d.children, Jc(u, d) ? o = null : x !== null && Jc(u, x) && (n.flags |= 32), n.memoizedState !== null && (u = Fu(
          t,
          n,
          DS,
          null,
          null,
          i
        ), Il._currentValue = u), xo(t, n), Se(t, n, o, i), n.child;
      case 6:
        return t === null && At && ((t = i = Qt) && (i = y3(
          i,
          n.pendingProps,
          nn
        ), i !== null ? (n.stateNode = i, be = n, Qt = null, t = !0) : t = !1), t || na(n)), null;
      case 13:
        return p1(t, n, i);
      case 4:
        return Rt(
          n,
          n.stateNode.containerInfo
        ), o = n.pendingProps, t === null ? n.child = qa(
          n,
          null,
          o,
          i
        ) : Se(t, n, o, i), n.child;
      case 11:
        return s1(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 7:
        return Se(
          t,
          n,
          n.pendingProps,
          i
        ), n.child;
      case 8:
        return Se(
          t,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 12:
        return Se(
          t,
          n,
          n.pendingProps.children,
          i
        ), n.child;
      case 10:
        return o = n.pendingProps, aa(n, n.type, o.value), Se(t, n, o.children, i), n.child;
      case 9:
        return u = n.type._context, o = n.pendingProps.children, ka(n), u = xe(u), o = o(u), n.flags |= 1, Se(t, n, o, i), n.child;
      case 14:
        return o1(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 15:
        return r1(
          t,
          n,
          n.type,
          n.pendingProps,
          i
        );
      case 19:
        return g1(t, n, i);
      case 31:
        return kS(t, n, i);
      case 22:
        return u1(
          t,
          n,
          i,
          n.pendingProps
        );
      case 24:
        return ka(n), o = xe(oe), t === null ? (u = Hu(), u === null && (u = qt, d = ku(), u.pooledCache = d, d.refCount++, d !== null && (u.pooledCacheLanes |= i), u = d), n.memoizedState = { parent: o, cache: u }, qu(n), aa(n, oe, u)) : ((t.lanes & i) !== 0 && (Yu(t, n), Ol(n, null, null, i), Nl()), u = t.memoizedState, d = n.memoizedState, u.parent !== o ? (u = { parent: o, cache: o }, n.memoizedState = u, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = u), aa(n, oe, o)) : (o = d.cache, aa(n, oe, o), o !== u.cache && Vu(
          n,
          [oe],
          i,
          !0
        ))), Se(
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
  function Cc(t, n, i, o, u) {
    if ((n = (t.mode & 32) !== 0) && (n = !1), n) {
      if (t.flags |= 16777216, (u & 335544128) === u)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (X1()) t.flags |= 8192;
        else
          throw $a = io, $u;
    } else t.flags &= -16777217;
  }
  function b1(t, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !z0(n))
      if (X1()) t.flags |= 8192;
      else
        throw $a = io, $u;
  }
  function wo(t, n) {
    n !== null && (t.flags |= 4), t.flags & 16384 && (n = t.tag !== 22 ? Wh() : 536870912, t.lanes |= n, zi |= n);
  }
  function Ul(t, n) {
    if (!At)
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
  function Ft(t) {
    var n = t.alternate !== null && t.alternate.child === t.child, i = 0, o = 0;
    if (n)
      for (var u = t.child; u !== null; )
        i |= u.lanes | u.childLanes, o |= u.subtreeFlags & 65011712, o |= u.flags & 65011712, u.return = t, u = u.sibling;
    else
      for (u = t.child; u !== null; )
        i |= u.lanes | u.childLanes, o |= u.subtreeFlags, o |= u.flags, u.return = t, u = u.sibling;
    return t.subtreeFlags |= o, t.childLanes = i, n;
  }
  function HS(t, n, i) {
    var o = n.pendingProps;
    switch (Nu(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ft(n), null;
      case 1:
        return Ft(n), null;
      case 3:
        return i = n.stateNode, o = null, t !== null && (o = t.memoizedState.cache), n.memoizedState.cache !== o && (n.flags |= 2048), Bn(oe), Mt(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), (t === null || t.child === null) && (Si(n) ? Un(n) : t === null || t.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, zu())), Ft(n), null;
      case 26:
        var u = n.type, d = n.memoizedState;
        return t === null ? (Un(n), d !== null ? (Ft(n), b1(n, d)) : (Ft(n), Cc(
          n,
          u,
          null,
          o,
          i
        ))) : d ? d !== t.memoizedState ? (Un(n), Ft(n), b1(n, d)) : (Ft(n), n.flags &= -16777217) : (t = t.memoizedProps, t !== o && Un(n), Ft(n), Cc(
          n,
          u,
          t,
          o,
          i
        )), null;
      case 27:
        if (Kt(n), i = pt.current, u = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && Un(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(s(166));
            return Ft(n), null;
          }
          t = lt.current, Si(n) ? Wm(n) : (t = E0(u, o, i), n.stateNode = t, Un(n));
        }
        return Ft(n), null;
      case 5:
        if (Kt(n), u = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== o && Un(n);
        else {
          if (!o) {
            if (n.stateNode === null)
              throw Error(s(166));
            return Ft(n), null;
          }
          if (d = lt.current, Si(n))
            Wm(n);
          else {
            var x = Vo(
              pt.current
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
            d[ve] = n, d[Re] = o;
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
            t: switch (we(d, u, o), u) {
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
        return Ft(n), Cc(
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
          if (t = pt.current, Si(n)) {
            if (t = n.stateNode, i = n.memoizedProps, o = null, u = be, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  o = u.memoizedProps;
              }
            t[ve] = n, t = !!(t.nodeValue === i || o !== null && o.suppressHydrationWarning === !0 || p0(t.nodeValue, i)), t || na(n, !0);
          } else
            t = Vo(t).createTextNode(
              o
            ), t[ve] = n, n.stateNode = t;
        }
        return Ft(n), null;
      case 31:
        if (i = n.memoizedState, t === null || t.memoizedState !== null) {
          if (o = Si(n), i !== null) {
            if (t === null) {
              if (!o) throw Error(s(318));
              if (t = n.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(s(557));
              t[ve] = n;
            } else
              La(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Ft(n), t = !1;
          } else
            i = zu(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = i), t = !0;
          if (!t)
            return n.flags & 256 ? (Ye(n), n) : (Ye(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(s(558));
        }
        return Ft(n), null;
      case 13:
        if (o = n.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (u = Si(n), o !== null && o.dehydrated !== null) {
            if (t === null) {
              if (!u) throw Error(s(318));
              if (u = n.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(s(317));
              u[ve] = n;
            } else
              La(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Ft(n), u = !1;
          } else
            u = zu(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return n.flags & 256 ? (Ye(n), n) : (Ye(n), null);
        }
        return Ye(n), (n.flags & 128) !== 0 ? (n.lanes = i, n) : (i = o !== null, t = t !== null && t.memoizedState !== null, i && (o = n.child, u = null, o.alternate !== null && o.alternate.memoizedState !== null && o.alternate.memoizedState.cachePool !== null && (u = o.alternate.memoizedState.cachePool.pool), d = null, o.memoizedState !== null && o.memoizedState.cachePool !== null && (d = o.memoizedState.cachePool.pool), d !== u && (o.flags |= 2048)), i !== t && i && (n.child.flags |= 8192), wo(n, n.updateQueue), Ft(n), null);
      case 4:
        return Mt(), t === null && Pc(n.stateNode.containerInfo), Ft(n), null;
      case 10:
        return Bn(n.type), Ft(n), null;
      case 19:
        if (U(ie), o = n.memoizedState, o === null) return Ft(n), null;
        if (u = (n.flags & 128) !== 0, d = o.rendering, d === null)
          if (u) Ul(o, !1);
          else {
            if (ee !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = n.child; t !== null; ) {
                if (d = ro(t), d !== null) {
                  for (n.flags |= 128, Ul(o, !1), t = d.updateQueue, n.updateQueue = t, wo(n, t), n.subtreeFlags = 0, t = i, i = n.child; i !== null; )
                    Km(i, t), i = i.sibling;
                  return I(
                    ie,
                    ie.current & 1 | 2
                  ), At && On(n, o.treeForkCount), n.child;
                }
                t = t.sibling;
              }
            o.tail !== null && ot() > Ao && (n.flags |= 128, u = !0, Ul(o, !1), n.lanes = 4194304);
          }
        else {
          if (!u)
            if (t = ro(d), t !== null) {
              if (n.flags |= 128, u = !0, t = t.updateQueue, n.updateQueue = t, wo(n, t), Ul(o, !0), o.tail === null && o.tailMode === "hidden" && !d.alternate && !At)
                return Ft(n), null;
            } else
              2 * ot() - o.renderingStartTime > Ao && i !== 536870912 && (n.flags |= 128, u = !0, Ul(o, !1), n.lanes = 4194304);
          o.isBackwards ? (d.sibling = n.child, n.child = d) : (t = o.last, t !== null ? t.sibling = d : n.child = d, o.last = d);
        }
        return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = ot(), t.sibling = null, i = ie.current, I(
          ie,
          u ? i & 1 | 2 : i & 1
        ), At && On(n, o.treeForkCount), t) : (Ft(n), null);
      case 22:
      case 23:
        return Ye(n), Ku(), o = n.memoizedState !== null, t !== null ? t.memoizedState !== null !== o && (n.flags |= 8192) : o && (n.flags |= 8192), o ? (i & 536870912) !== 0 && (n.flags & 128) === 0 && (Ft(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Ft(n), i = n.updateQueue, i !== null && wo(n, i.retryQueue), i = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), o = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (o = n.memoizedState.cachePool.pool), o !== i && (n.flags |= 2048), t !== null && U(Ua), null;
      case 24:
        return i = null, t !== null && (i = t.memoizedState.cache), n.memoizedState.cache !== i && (n.flags |= 2048), Bn(oe), Ft(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(s(156, n.tag));
  }
  function $S(t, n) {
    switch (Nu(n), n.tag) {
      case 1:
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 3:
        return Bn(oe), Mt(), t = n.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (n.flags = t & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Kt(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (Ye(n), n.alternate === null)
            throw Error(s(340));
          La();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 13:
        if (Ye(n), t = n.memoizedState, t !== null && t.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(s(340));
          La();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 19:
        return U(ie), null;
      case 4:
        return Mt(), null;
      case 10:
        return Bn(n.type), null;
      case 22:
      case 23:
        return Ye(n), Ku(), t !== null && U(Ua), t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 24:
        return Bn(oe), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function x1(t, n) {
    switch (Nu(n), n.tag) {
      case 3:
        Bn(oe), Mt();
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
        n.memoizedState !== null && Ye(n);
        break;
      case 13:
        Ye(n);
        break;
      case 19:
        U(ie);
        break;
      case 10:
        Bn(n.type);
        break;
      case 22:
      case 23:
        Ye(n), Ku(), t !== null && U(Ua);
        break;
      case 24:
        Bn(oe);
    }
  }
  function Hl(t, n) {
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
  function ua(t, n, i) {
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
              var O = i, Y = C;
              try {
                Y();
              } catch (Q) {
                Bt(
                  u,
                  O,
                  Q
                );
              }
            }
          }
          o = o.next;
        } while (o !== d);
      }
    } catch (Q) {
      Bt(n, n.return, Q);
    }
  }
  function S1(t) {
    var n = t.updateQueue;
    if (n !== null) {
      var i = t.stateNode;
      try {
        fp(n, i);
      } catch (o) {
        Bt(t, t.return, o);
      }
    }
  }
  function w1(t, n, i) {
    i.props = Ga(
      t.type,
      t.memoizedProps
    ), i.state = t.memoizedState;
    try {
      i.componentWillUnmount();
    } catch (o) {
      Bt(t, n, o);
    }
  }
  function $l(t, n) {
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
  function Tn(t, n) {
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
  function T1(t) {
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
  function jc(t, n, i) {
    try {
      var o = t.stateNode;
      u3(o, t.type, i, n), o[Re] = n;
    } catch (u) {
      Bt(t, t.return, u);
    }
  }
  function C1(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && ya(t.type) || t.tag === 4;
  }
  function Ec(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || C1(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && ya(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Ac(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? (i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i).insertBefore(t, n) : (n = i.nodeType === 9 ? i.body : i.nodeName === "HTML" ? i.ownerDocument.body : i, n.appendChild(t), i = i._reactRootContainer, i != null || n.onclick !== null || (n.onclick = Dn));
    else if (o !== 4 && (o === 27 && ya(t.type) && (i = t.stateNode, n = null), t = t.child, t !== null))
      for (Ac(t, n, i), t = t.sibling; t !== null; )
        Ac(t, n, i), t = t.sibling;
  }
  function To(t, n, i) {
    var o = t.tag;
    if (o === 5 || o === 6)
      t = t.stateNode, n ? i.insertBefore(t, n) : i.appendChild(t);
    else if (o !== 4 && (o === 27 && ya(t.type) && (i = t.stateNode), t = t.child, t !== null))
      for (To(t, n, i), t = t.sibling; t !== null; )
        To(t, n, i), t = t.sibling;
  }
  function j1(t) {
    var n = t.stateNode, i = t.memoizedProps;
    try {
      for (var o = t.type, u = n.attributes; u.length; )
        n.removeAttributeNode(u[0]);
      we(n, o, i), n[ve] = t, n[Re] = i;
    } catch (d) {
      Bt(t, t.return, d);
    }
  }
  var Hn = !1, ce = !1, Mc = !1, E1 = typeof WeakSet == "function" ? WeakSet : Set, ge = null;
  function qS(t, n) {
    if (t = t.containerInfo, Qc = Go, t = km(t), Su(t)) {
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
            var x = 0, C = -1, O = -1, Y = 0, Q = 0, W = t, X = null;
            e: for (; ; ) {
              for (var P; W !== i || u !== 0 && W.nodeType !== 3 || (C = x + u), W !== d || o !== 0 && W.nodeType !== 3 || (O = x + o), W.nodeType === 3 && (x += W.nodeValue.length), (P = W.firstChild) !== null; )
                X = W, W = P;
              for (; ; ) {
                if (W === t) break e;
                if (X === i && ++Y === u && (C = x), X === d && ++Q === o && (O = x), (P = W.nextSibling) !== null) break;
                W = X, X = W.parentNode;
              }
              W = P;
            }
            i = C === -1 || O === -1 ? null : { start: C, end: O };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Fc = { focusedElem: t, selectionRange: i }, Go = !1, ge = n; ge !== null; )
      if (n = ge, t = n.child, (n.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = n, ge = t;
      else
        for (; ge !== null; ) {
          switch (n = ge, d = n.alternate, t = n.flags, n.tag) {
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
                  Bt(
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
                  Ic(t);
                else if (i === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Ic(t);
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
            t.return = n.return, ge = t;
            break;
          }
          ge = n.return;
        }
  }
  function A1(t, n, i) {
    var o = i.flags;
    switch (i.tag) {
      case 0:
      case 11:
      case 15:
        qn(t, i), o & 4 && Hl(5, i);
        break;
      case 1:
        if (qn(t, i), o & 4)
          if (t = i.stateNode, n === null)
            try {
              t.componentDidMount();
            } catch (x) {
              Bt(i, i.return, x);
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
              Bt(
                i,
                i.return,
                x
              );
            }
          }
        o & 64 && S1(i), o & 512 && $l(i, i.return);
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
            fp(t, n);
          } catch (x) {
            Bt(i, i.return, x);
          }
        }
        break;
      case 27:
        n === null && o & 4 && j1(i);
      case 26:
      case 5:
        qn(t, i), n === null && o & 4 && T1(i), o & 512 && $l(i, i.return);
        break;
      case 12:
        qn(t, i);
        break;
      case 31:
        qn(t, i), o & 4 && D1(t, i);
        break;
      case 13:
        qn(t, i), o & 4 && R1(t, i), o & 64 && (t = i.memoizedState, t !== null && (t = t.dehydrated, t !== null && (i = JS.bind(
          null,
          i
        ), g3(t, i))));
        break;
      case 22:
        if (o = i.memoizedState !== null || Hn, !o) {
          n = n !== null && n.memoizedState !== null || ce, u = Hn;
          var d = ce;
          Hn = o, (ce = n) && !d ? Yn(
            t,
            i,
            (i.subtreeFlags & 8772) !== 0
          ) : qn(t, i), Hn = u, ce = d;
        }
        break;
      case 30:
        break;
      default:
        qn(t, i);
    }
  }
  function M1(t) {
    var n = t.alternate;
    n !== null && (t.alternate = null, M1(n)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (n = t.stateNode, n !== null && iu(n)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Jt = null, Oe = !1;
  function $n(t, n, i) {
    for (i = i.child; i !== null; )
      _1(t, n, i), i = i.sibling;
  }
  function _1(t, n, i) {
    if (ke && typeof ke.onCommitFiberUnmount == "function")
      try {
        ke.onCommitFiberUnmount(fl, i);
      } catch {
      }
    switch (i.tag) {
      case 26:
        ce || Tn(i, n), $n(
          t,
          n,
          i
        ), i.memoizedState ? i.memoizedState.count-- : i.stateNode && (i = i.stateNode, i.parentNode.removeChild(i));
        break;
      case 27:
        ce || Tn(i, n);
        var o = Jt, u = Oe;
        ya(i.type) && (Jt = i.stateNode, Oe = !1), $n(
          t,
          n,
          i
        ), Fl(i.stateNode), Jt = o, Oe = u;
        break;
      case 5:
        ce || Tn(i, n);
      case 6:
        if (o = Jt, u = Oe, Jt = null, $n(
          t,
          n,
          i
        ), Jt = o, Oe = u, Jt !== null)
          if (Oe)
            try {
              (Jt.nodeType === 9 ? Jt.body : Jt.nodeName === "HTML" ? Jt.ownerDocument.body : Jt).removeChild(i.stateNode);
            } catch (d) {
              Bt(
                i,
                n,
                d
              );
            }
          else
            try {
              Jt.removeChild(i.stateNode);
            } catch (d) {
              Bt(
                i,
                n,
                d
              );
            }
        break;
      case 18:
        Jt !== null && (Oe ? (t = Jt, S0(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          i.stateNode
        ), qi(t)) : S0(Jt, i.stateNode));
        break;
      case 4:
        o = Jt, u = Oe, Jt = i.stateNode.containerInfo, Oe = !0, $n(
          t,
          n,
          i
        ), Jt = o, Oe = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ua(2, i, n), ce || ua(4, i, n), $n(
          t,
          n,
          i
        );
        break;
      case 1:
        ce || (Tn(i, n), o = i.stateNode, typeof o.componentWillUnmount == "function" && w1(
          i,
          n,
          o
        )), $n(
          t,
          n,
          i
        );
        break;
      case 21:
        $n(
          t,
          n,
          i
        );
        break;
      case 22:
        ce = (o = ce) || i.memoizedState !== null, $n(
          t,
          n,
          i
        ), ce = o;
        break;
      default:
        $n(
          t,
          n,
          i
        );
    }
  }
  function D1(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        qi(t);
      } catch (i) {
        Bt(n, n.return, i);
      }
    }
  }
  function R1(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        qi(t);
      } catch (i) {
        Bt(n, n.return, i);
      }
  }
  function YS(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var n = t.stateNode;
        return n === null && (n = t.stateNode = new E1()), n;
      case 22:
        return t = t.stateNode, n = t._retryCache, n === null && (n = t._retryCache = new E1()), n;
      default:
        throw Error(s(435, t.tag));
    }
  }
  function Co(t, n) {
    var i = YS(t);
    n.forEach(function(o) {
      if (!i.has(o)) {
        i.add(o);
        var u = WS.bind(null, t, o);
        o.then(u, u);
      }
    });
  }
  function ze(t, n) {
    var i = n.deletions;
    if (i !== null)
      for (var o = 0; o < i.length; o++) {
        var u = i[o], d = t, x = n, C = x;
        t: for (; C !== null; ) {
          switch (C.tag) {
            case 27:
              if (ya(C.type)) {
                Jt = C.stateNode, Oe = !1;
                break t;
              }
              break;
            case 5:
              Jt = C.stateNode, Oe = !1;
              break t;
            case 3:
            case 4:
              Jt = C.stateNode.containerInfo, Oe = !0;
              break t;
          }
          C = C.return;
        }
        if (Jt === null) throw Error(s(160));
        _1(d, x, u), Jt = null, Oe = !1, d = u.alternate, d !== null && (d.return = null), u.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        N1(n, t), n = n.sibling;
  }
  var cn = null;
  function N1(t, n) {
    var i = t.alternate, o = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ze(n, t), Be(t), o & 4 && (ua(3, t, t.return), Hl(3, t), ua(5, t, t.return));
        break;
      case 1:
        ze(n, t), Be(t), o & 512 && (ce || i === null || Tn(i, i.return)), o & 64 && Hn && (t = t.updateQueue, t !== null && (o = t.callbacks, o !== null && (i = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = i === null ? o : i.concat(o))));
        break;
      case 26:
        var u = cn;
        if (ze(n, t), Be(t), o & 512 && (ce || i === null || Tn(i, i.return)), o & 4) {
          var d = i !== null ? i.memoizedState : null;
          if (o = t.memoizedState, i === null)
            if (o === null)
              if (t.stateNode === null) {
                t: {
                  o = t.type, i = t.memoizedProps, u = u.ownerDocument || u;
                  e: switch (o) {
                    case "title":
                      d = u.getElementsByTagName("title")[0], (!d || d[ml] || d[ve] || d.namespaceURI === "http://www.w3.org/2000/svg" || d.hasAttribute("itemprop")) && (d = u.createElement(o), u.head.insertBefore(
                        d,
                        u.querySelector("head > title")
                      )), we(d, o, i), d[ve] = t, ye(d), o = d;
                      break t;
                    case "link":
                      var x = N0(
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
                      d = u.createElement(o), we(d, o, i), u.head.appendChild(d);
                      break;
                    case "meta":
                      if (x = N0(
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
                      d = u.createElement(o), we(d, o, i), u.head.appendChild(d);
                      break;
                    default:
                      throw Error(s(468, o));
                  }
                  d[ve] = t, ye(d), o = d;
                }
                t.stateNode = o;
              } else
                O0(
                  u,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = R0(
                u,
                o,
                t.memoizedProps
              );
          else
            d !== o ? (d === null ? i.stateNode !== null && (i = i.stateNode, i.parentNode.removeChild(i)) : d.count--, o === null ? O0(
              u,
              t.type,
              t.stateNode
            ) : R0(
              u,
              o,
              t.memoizedProps
            )) : o === null && t.stateNode !== null && jc(
              t,
              t.memoizedProps,
              i.memoizedProps
            );
        }
        break;
      case 27:
        ze(n, t), Be(t), o & 512 && (ce || i === null || Tn(i, i.return)), i !== null && o & 4 && jc(
          t,
          t.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (ze(n, t), Be(t), o & 512 && (ce || i === null || Tn(i, i.return)), t.flags & 32) {
          u = t.stateNode;
          try {
            fi(u, "");
          } catch (ut) {
            Bt(t, t.return, ut);
          }
        }
        o & 4 && t.stateNode != null && (u = t.memoizedProps, jc(
          t,
          u,
          i !== null ? i.memoizedProps : u
        )), o & 1024 && (Mc = !0);
        break;
      case 6:
        if (ze(n, t), Be(t), o & 4) {
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
        if (Ho = null, u = cn, cn = ko(n.containerInfo), ze(n, t), cn = u, Be(t), o & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            qi(n.containerInfo);
          } catch (ut) {
            Bt(t, t.return, ut);
          }
        Mc && (Mc = !1, O1(t));
        break;
      case 4:
        o = cn, cn = ko(
          t.stateNode.containerInfo
        ), ze(n, t), Be(t), cn = o;
        break;
      case 12:
        ze(n, t), Be(t);
        break;
      case 31:
        ze(n, t), Be(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Co(t, o)));
        break;
      case 13:
        ze(n, t), Be(t), t.child.flags & 8192 && t.memoizedState !== null != (i !== null && i.memoizedState !== null) && (Eo = ot()), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Co(t, o)));
        break;
      case 22:
        u = t.memoizedState !== null;
        var O = i !== null && i.memoizedState !== null, Y = Hn, Q = ce;
        if (Hn = Y || u, ce = Q || O, ze(n, t), ce = Q, Hn = Y, Be(t), o & 8192)
          t: for (n = t.stateNode, n._visibility = u ? n._visibility & -2 : n._visibility | 1, u && (i === null || O || Hn || ce || Xa(t)), i = null, n = t; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (i === null) {
                O = i = n;
                try {
                  if (d = O.stateNode, u)
                    x = d.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
                  else {
                    C = O.stateNode;
                    var W = O.memoizedProps.style, X = W != null && W.hasOwnProperty("display") ? W.display : null;
                    C.style.display = X == null || typeof X == "boolean" ? "" : ("" + X).trim();
                  }
                } catch (ut) {
                  Bt(O, O.return, ut);
                }
              }
            } else if (n.tag === 6) {
              if (i === null) {
                O = n;
                try {
                  O.stateNode.nodeValue = u ? "" : O.memoizedProps;
                } catch (ut) {
                  Bt(O, O.return, ut);
                }
              }
            } else if (n.tag === 18) {
              if (i === null) {
                O = n;
                try {
                  var P = O.stateNode;
                  u ? w0(P, !0) : w0(O.stateNode, !1);
                } catch (ut) {
                  Bt(O, O.return, ut);
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
        o & 4 && (o = t.updateQueue, o !== null && (i = o.retryQueue, i !== null && (o.retryQueue = null, Co(t, i))));
        break;
      case 19:
        ze(n, t), Be(t), o & 4 && (o = t.updateQueue, o !== null && (t.updateQueue = null, Co(t, o)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ze(n, t), Be(t);
    }
  }
  function Be(t) {
    var n = t.flags;
    if (n & 2) {
      try {
        for (var i, o = t.return; o !== null; ) {
          if (C1(o)) {
            i = o;
            break;
          }
          o = o.return;
        }
        if (i == null) throw Error(s(160));
        switch (i.tag) {
          case 27:
            var u = i.stateNode, d = Ec(t);
            To(t, d, u);
            break;
          case 5:
            var x = i.stateNode;
            i.flags & 32 && (fi(x, ""), i.flags &= -33);
            var C = Ec(t);
            To(t, C, x);
            break;
          case 3:
          case 4:
            var O = i.stateNode.containerInfo, Y = Ec(t);
            Ac(
              t,
              Y,
              O
            );
            break;
          default:
            throw Error(s(161));
        }
      } catch (Q) {
        Bt(t, t.return, Q);
      }
      t.flags &= -3;
    }
    n & 4096 && (t.flags &= -4097);
  }
  function O1(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var n = t;
        O1(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), t = t.sibling;
      }
  }
  function qn(t, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        A1(t, n.alternate, n), n = n.sibling;
  }
  function Xa(t) {
    for (t = t.child; t !== null; ) {
      var n = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ua(4, n, n.return), Xa(n);
          break;
        case 1:
          Tn(n, n.return);
          var i = n.stateNode;
          typeof i.componentWillUnmount == "function" && w1(
            n,
            n.return,
            i
          ), Xa(n);
          break;
        case 27:
          Fl(n.stateNode);
        case 26:
        case 5:
          Tn(n, n.return), Xa(n);
          break;
        case 22:
          n.memoizedState === null && Xa(n);
          break;
        case 30:
          Xa(n);
          break;
        default:
          Xa(n);
      }
      t = t.sibling;
    }
  }
  function Yn(t, n, i) {
    for (i = i && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var o = n.alternate, u = t, d = n, x = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          Yn(
            u,
            d,
            i
          ), Hl(4, d);
          break;
        case 1:
          if (Yn(
            u,
            d,
            i
          ), o = d, u = o.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (Y) {
              Bt(o, o.return, Y);
            }
          if (o = d, u = o.updateQueue, u !== null) {
            var C = o.stateNode;
            try {
              var O = u.shared.hiddenCallbacks;
              if (O !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < O.length; u++)
                  cp(O[u], C);
            } catch (Y) {
              Bt(o, o.return, Y);
            }
          }
          i && x & 64 && S1(d), $l(d, d.return);
          break;
        case 27:
          j1(d);
        case 26:
        case 5:
          Yn(
            u,
            d,
            i
          ), i && o === null && x & 4 && T1(d), $l(d, d.return);
          break;
        case 12:
          Yn(
            u,
            d,
            i
          );
          break;
        case 31:
          Yn(
            u,
            d,
            i
          ), i && x & 4 && D1(u, d);
          break;
        case 13:
          Yn(
            u,
            d,
            i
          ), i && x & 4 && R1(u, d);
          break;
        case 22:
          d.memoizedState === null && Yn(
            u,
            d,
            i
          ), $l(d, d.return);
          break;
        case 30:
          break;
        default:
          Yn(
            u,
            d,
            i
          );
      }
      n = n.sibling;
    }
  }
  function _c(t, n) {
    var i = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), t = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (t = n.memoizedState.cachePool.pool), t !== i && (t != null && t.refCount++, i != null && Al(i));
  }
  function Dc(t, n) {
    t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Al(t));
  }
  function fn(t, n, i, o) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        z1(
          t,
          n,
          i,
          o
        ), n = n.sibling;
  }
  function z1(t, n, i, o) {
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
        ), u & 2048 && Hl(9, n);
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
        ), u & 2048 && (t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && Al(t)));
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
          } catch (O) {
            Bt(n, n.return, O);
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
        ) : ql(t, n) : d._visibility & 2 ? fn(
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
        )), u & 2048 && _c(x, n);
        break;
      case 24:
        fn(
          t,
          n,
          i,
          o
        ), u & 2048 && Dc(n.alternate, n);
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
      var d = t, x = n, C = i, O = o, Y = x.flags;
      switch (x.tag) {
        case 0:
        case 11:
        case 15:
          Ri(
            d,
            x,
            C,
            O,
            u
          ), Hl(8, x);
          break;
        case 23:
          break;
        case 22:
          var Q = x.stateNode;
          x.memoizedState !== null ? Q._visibility & 2 ? Ri(
            d,
            x,
            C,
            O,
            u
          ) : ql(
            d,
            x
          ) : (Q._visibility |= 2, Ri(
            d,
            x,
            C,
            O,
            u
          )), u && Y & 2048 && _c(
            x.alternate,
            x
          );
          break;
        case 24:
          Ri(
            d,
            x,
            C,
            O,
            u
          ), u && Y & 2048 && Dc(x.alternate, x);
          break;
        default:
          Ri(
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
  function ql(t, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var i = t, o = n, u = o.flags;
        switch (o.tag) {
          case 22:
            ql(i, o), u & 2048 && _c(
              o.alternate,
              o
            );
            break;
          case 24:
            ql(i, o), u & 2048 && Dc(o.alternate, o);
            break;
          default:
            ql(i, o);
        }
        n = n.sibling;
      }
  }
  var Yl = 8192;
  function Ni(t, n, i) {
    if (t.subtreeFlags & Yl)
      for (t = t.child; t !== null; )
        B1(
          t,
          n,
          i
        ), t = t.sibling;
  }
  function B1(t, n, i) {
    switch (t.tag) {
      case 26:
        Ni(
          t,
          n,
          i
        ), t.flags & Yl && t.memoizedState !== null && _3(
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
        cn = ko(t.stateNode.containerInfo), Ni(
          t,
          n,
          i
        ), cn = o;
        break;
      case 22:
        t.memoizedState === null && (o = t.alternate, o !== null && o.memoizedState !== null ? (o = Yl, Yl = 16777216, Ni(
          t,
          n,
          i
        ), Yl = o) : Ni(
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
  function L1(t) {
    var n = t.alternate;
    if (n !== null && (t = n.child, t !== null)) {
      n.child = null;
      do
        n = t.sibling, t.sibling = null, t = n;
      while (t !== null);
    }
  }
  function Gl(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          ge = o, k1(
            o,
            t
          );
        }
      L1(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        V1(t), t = t.sibling;
  }
  function V1(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Gl(t), t.flags & 2048 && ua(9, t, t.return);
        break;
      case 3:
        Gl(t);
        break;
      case 12:
        Gl(t);
        break;
      case 22:
        var n = t.stateNode;
        t.memoizedState !== null && n._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (n._visibility &= -3, jo(t)) : Gl(t);
        break;
      default:
        Gl(t);
    }
  }
  function jo(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = n[i];
          ge = o, k1(
            o,
            t
          );
        }
      L1(t);
    }
    for (t = t.child; t !== null; ) {
      switch (n = t, n.tag) {
        case 0:
        case 11:
        case 15:
          ua(8, n, n.return), jo(n);
          break;
        case 22:
          i = n.stateNode, i._visibility & 2 && (i._visibility &= -3, jo(n));
          break;
        default:
          jo(n);
      }
      t = t.sibling;
    }
  }
  function k1(t, n) {
    for (; ge !== null; ) {
      var i = ge;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          ua(8, i, n);
          break;
        case 23:
        case 22:
          if (i.memoizedState !== null && i.memoizedState.cachePool !== null) {
            var o = i.memoizedState.cachePool.pool;
            o != null && o.refCount++;
          }
          break;
        case 24:
          Al(i.memoizedState.cache);
      }
      if (o = i.child, o !== null) o.return = i, ge = o;
      else
        t: for (i = t; ge !== null; ) {
          o = ge;
          var u = o.sibling, d = o.return;
          if (M1(o), o === i) {
            ge = null;
            break t;
          }
          if (u !== null) {
            u.return = d, ge = u;
            break t;
          }
          ge = d;
        }
    }
  }
  var GS = {
    getCacheForType: function(t) {
      var n = xe(oe), i = n.data.get(t);
      return i === void 0 && (i = t(), n.data.set(t, i)), i;
    },
    cacheSignal: function() {
      return xe(oe).controller.signal;
    }
  }, XS = typeof WeakMap == "function" ? WeakMap : Map, Nt = 0, qt = null, Tt = null, jt = 0, zt = 0, Ge = null, ca = !1, Oi = !1, Rc = !1, Gn = 0, ee = 0, fa = 0, Pa = 0, Nc = 0, Xe = 0, zi = 0, Xl = null, Le = null, Oc = !1, Eo = 0, U1 = 0, Ao = 1 / 0, Mo = null, da = null, de = 0, ha = null, Bi = null, Xn = 0, zc = 0, Bc = null, H1 = null, Pl = 0, Lc = null;
  function Pe() {
    return (Nt & 2) !== 0 && jt !== 0 ? jt & -jt : L.T !== null ? qc() : nm();
  }
  function $1() {
    if (Xe === 0)
      if ((jt & 536870912) === 0 || At) {
        var t = Bs;
        Bs <<= 1, (Bs & 3932160) === 0 && (Bs = 262144), Xe = t;
      } else Xe = 536870912;
    return t = qe.current, t !== null && (t.flags |= 32), Xe;
  }
  function Ve(t, n, i) {
    (t === qt && (zt === 2 || zt === 9) || t.cancelPendingCommit !== null) && (Li(t, 0), ma(
      t,
      jt,
      Xe,
      !1
    )), hl(t, i), ((Nt & 2) === 0 || t !== qt) && (t === qt && ((Nt & 2) === 0 && (Pa |= i), ee === 4 && ma(
      t,
      jt,
      Xe,
      !1
    )), Cn(t));
  }
  function q1(t, n, i) {
    if ((Nt & 6) !== 0) throw Error(s(327));
    var o = !i && (n & 127) === 0 && (n & t.expiredLanes) === 0 || dl(t, n), u = o ? ZS(t, n) : kc(t, n, !0), d = o;
    do {
      if (u === 0) {
        Oi && !o && ma(t, n, 0, !1);
        break;
      } else {
        if (i = t.current.alternate, d && !PS(i)) {
          u = kc(t, n, !1), d = !1;
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
              u = Xl;
              var O = C.current.memoizedState.isDehydrated;
              if (O && (Li(C, x).flags |= 256), x = kc(
                C,
                x,
                !1
              ), x !== 2) {
                if (Rc && !O) {
                  C.errorRecoveryDisabledLanes |= d, Pa |= d, u = 4;
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
          Li(t, 0), ma(t, n, 0, !0);
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
              ma(
                o,
                n,
                Xe,
                !ca
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
          if ((n & 62914560) === n && (u = Eo + 300 - ot(), 10 < u)) {
            if (ma(
              o,
              n,
              Xe,
              !ca
            ), Vs(o, 0, !0) !== 0) break t;
            Xn = n, o.timeoutHandle = b0(
              Y1.bind(
                null,
                o,
                i,
                Le,
                Mo,
                Oc,
                n,
                Xe,
                Pa,
                zi,
                ca,
                d,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break t;
          }
          Y1(
            o,
            i,
            Le,
            Mo,
            Oc,
            n,
            Xe,
            Pa,
            zi,
            ca,
            d,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Cn(t);
  }
  function Y1(t, n, i, o, u, d, x, C, O, Y, Q, W, X, P) {
    if (t.timeoutHandle = -1, W = n.subtreeFlags, W & 8192 || (W & 16785408) === 16785408) {
      W = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Dn
      }, B1(
        n,
        d,
        W
      );
      var ut = (d & 62914560) === d ? Eo - ot() : (d & 4194048) === d ? U1 - ot() : 0;
      if (ut = D3(
        W,
        ut
      ), ut !== null) {
        Xn = d, t.cancelPendingCommit = ut(
          J1.bind(
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
            Q,
            W,
            null,
            X,
            P
          )
        ), ma(t, d, x, !Y);
        return;
      }
    }
    J1(
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
  function PS(t) {
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
  function ma(t, n, i, o) {
    n &= ~Nc, n &= ~Pa, t.suspendedLanes |= n, t.pingedLanes &= ~n, o && (t.warmLanes |= n), o = t.expirationTimes;
    for (var u = n; 0 < u; ) {
      var d = 31 - Ue(u), x = 1 << d;
      o[d] = -1, u &= ~x;
    }
    i !== 0 && Ih(t, i, n);
  }
  function _o() {
    return (Nt & 6) === 0 ? (Kl(0), !1) : !0;
  }
  function Vc() {
    if (Tt !== null) {
      if (zt === 0)
        var t = Tt.return;
      else
        t = Tt, zn = Va = null, Iu(t), Ei = null, _l = 0, t = Tt;
      for (; t !== null; )
        x1(t.alternate, t), t = t.return;
      Tt = null;
    }
  }
  function Li(t, n) {
    var i = t.timeoutHandle;
    i !== -1 && (t.timeoutHandle = -1, d3(i)), i = t.cancelPendingCommit, i !== null && (t.cancelPendingCommit = null, i()), Xn = 0, Vc(), qt = t, Tt = i = Nn(t.current, null), jt = n, zt = 0, Ge = null, ca = !1, Oi = dl(t, n), Rc = !1, zi = Xe = Nc = Pa = fa = ee = 0, Le = Xl = null, Oc = !1, (n & 8) !== 0 && (n |= n & 32);
    var o = t.entangledLanes;
    if (o !== 0)
      for (t = t.entanglements, o &= n; 0 < o; ) {
        var u = 31 - Ue(o), d = 1 << u;
        n |= t[u], o &= ~d;
      }
    return Gn = n, Qs(), i;
  }
  function G1(t, n) {
    xt = null, L.H = Vl, n === ji || n === ao ? (n = sp(), zt = 3) : n === $u ? (n = sp(), zt = 4) : zt = n === pc ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Ge = n, Tt === null && (ee = 1, vo(
      t,
      Ie(n, t.current)
    ));
  }
  function X1() {
    var t = qe.current;
    return t === null ? !0 : (jt & 4194048) === jt ? an === null : (jt & 62914560) === jt || (jt & 536870912) !== 0 ? t === an : !1;
  }
  function P1() {
    var t = L.H;
    return L.H = Vl, t === null ? Vl : t;
  }
  function K1() {
    var t = L.A;
    return L.A = GS, t;
  }
  function Do() {
    ee = 4, ca || (jt & 4194048) !== jt && qe.current !== null || (Oi = !0), (fa & 134217727) === 0 && (Pa & 134217727) === 0 || qt === null || ma(
      qt,
      jt,
      Xe,
      !1
    );
  }
  function kc(t, n, i) {
    var o = Nt;
    Nt |= 2;
    var u = P1(), d = K1();
    (qt !== t || jt !== n) && (Mo = null, Li(t, n)), n = !1;
    var x = ee;
    t: do
      try {
        if (zt !== 0 && Tt !== null) {
          var C = Tt, O = Ge;
          switch (zt) {
            case 8:
              Vc(), x = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              qe.current === null && (n = !0);
              var Y = zt;
              if (zt = 0, Ge = null, Vi(t, C, O, Y), i && Oi) {
                x = 0;
                break t;
              }
              break;
            default:
              Y = zt, zt = 0, Ge = null, Vi(t, C, O, Y);
          }
        }
        KS(), x = ee;
        break;
      } catch (Q) {
        G1(t, Q);
      }
    while (!0);
    return n && t.shellSuspendCounter++, zn = Va = null, Nt = o, L.H = u, L.A = d, Tt === null && (qt = null, jt = 0, Qs()), x;
  }
  function KS() {
    for (; Tt !== null; ) Z1(Tt);
  }
  function ZS(t, n) {
    var i = Nt;
    Nt |= 2;
    var o = P1(), u = K1();
    qt !== t || jt !== n ? (Mo = null, Ao = ot() + 500, Li(t, n)) : Oi = dl(
      t,
      n
    );
    t: do
      try {
        if (zt !== 0 && Tt !== null) {
          n = Tt;
          var d = Ge;
          e: switch (zt) {
            case 1:
              zt = 0, Ge = null, Vi(t, n, d, 1);
              break;
            case 2:
            case 9:
              if (ip(d)) {
                zt = 0, Ge = null, Q1(n);
                break;
              }
              n = function() {
                zt !== 2 && zt !== 9 || qt !== t || (zt = 7), Cn(t);
              }, d.then(n, n);
              break t;
            case 3:
              zt = 7;
              break t;
            case 4:
              zt = 5;
              break t;
            case 7:
              ip(d) ? (zt = 0, Ge = null, Q1(n)) : (zt = 0, Ge = null, Vi(t, n, d, 7));
              break;
            case 5:
              var x = null;
              switch (Tt.tag) {
                case 26:
                  x = Tt.memoizedState;
                case 5:
                case 27:
                  var C = Tt;
                  if (x ? z0(x) : C.stateNode.complete) {
                    zt = 0, Ge = null;
                    var O = C.sibling;
                    if (O !== null) Tt = O;
                    else {
                      var Y = C.return;
                      Y !== null ? (Tt = Y, Ro(Y)) : Tt = null;
                    }
                    break e;
                  }
              }
              zt = 0, Ge = null, Vi(t, n, d, 5);
              break;
            case 6:
              zt = 0, Ge = null, Vi(t, n, d, 6);
              break;
            case 8:
              Vc(), ee = 6;
              break t;
            default:
              throw Error(s(462));
          }
        }
        QS();
        break;
      } catch (Q) {
        G1(t, Q);
      }
    while (!0);
    return zn = Va = null, L.H = o, L.A = u, Nt = i, Tt !== null ? 0 : (qt = null, jt = 0, Qs(), ee);
  }
  function QS() {
    for (; Tt !== null && !Wr(); )
      Z1(Tt);
  }
  function Z1(t) {
    var n = v1(t.alternate, t, Gn);
    t.memoizedProps = t.pendingProps, n === null ? Ro(t) : Tt = n;
  }
  function Q1(t) {
    var n = t, i = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = d1(
          i,
          n,
          n.pendingProps,
          n.type,
          void 0,
          jt
        );
        break;
      case 11:
        n = d1(
          i,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          jt
        );
        break;
      case 5:
        Iu(n);
      default:
        x1(i, n), n = Tt = Km(n, Gn), n = v1(i, n, Gn);
    }
    t.memoizedProps = t.pendingProps, n === null ? Ro(t) : Tt = n;
  }
  function Vi(t, n, i, o) {
    zn = Va = null, Iu(n), Ei = null, _l = 0;
    var u = n.return;
    try {
      if (VS(
        t,
        u,
        n,
        i,
        jt
      )) {
        ee = 1, vo(
          t,
          Ie(i, t.current)
        ), Tt = null;
        return;
      }
    } catch (d) {
      if (u !== null) throw Tt = u, d;
      ee = 1, vo(
        t,
        Ie(i, t.current)
      ), Tt = null;
      return;
    }
    n.flags & 32768 ? (At || o === 1 ? t = !0 : Oi || (jt & 536870912) !== 0 ? t = !1 : (ca = t = !0, (o === 2 || o === 9 || o === 3 || o === 6) && (o = qe.current, o !== null && o.tag === 13 && (o.flags |= 16384))), F1(n, t)) : Ro(n);
  }
  function Ro(t) {
    var n = t;
    do {
      if ((n.flags & 32768) !== 0) {
        F1(
          n,
          ca
        );
        return;
      }
      t = n.return;
      var i = HS(
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
    ee === 0 && (ee = 5);
  }
  function F1(t, n) {
    do {
      var i = $S(t.alternate, t);
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
    ee = 6, Tt = null;
  }
  function J1(t, n, i, o, u, d, x, C, O) {
    t.cancelPendingCommit = null;
    do
      No();
    while (de !== 0);
    if ((Nt & 6) !== 0) throw Error(s(327));
    if (n !== null) {
      if (n === t.current) throw Error(s(177));
      if (d = n.lanes | n.childLanes, d |= Eu, Mx(
        t,
        i,
        d,
        x,
        C,
        O
      ), t === qt && (Tt = qt = null, jt = 0), Bi = n, ha = t, Xn = i, zc = d, Bc = u, H1 = o, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, IS(Fn, function() {
        return n0(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), o = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || o) {
        o = L.T, L.T = null, u = $.p, $.p = 2, x = Nt, Nt |= 4;
        try {
          qS(t, n, i);
        } finally {
          Nt = x, $.p = u, L.T = o;
        }
      }
      de = 1, W1(), I1(), t0();
    }
  }
  function W1() {
    if (de === 1) {
      de = 0;
      var t = ha, n = Bi, i = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || i) {
        i = L.T, L.T = null;
        var o = $.p;
        $.p = 2;
        var u = Nt;
        Nt |= 4;
        try {
          N1(n, t);
          var d = Fc, x = km(t.containerInfo), C = d.focusedElem, O = d.selectionRange;
          if (x !== C && C && C.ownerDocument && Vm(
            C.ownerDocument.documentElement,
            C
          )) {
            if (O !== null && Su(C)) {
              var Y = O.start, Q = O.end;
              if (Q === void 0 && (Q = Y), "selectionStart" in C)
                C.selectionStart = Y, C.selectionEnd = Math.min(
                  Q,
                  C.value.length
                );
              else {
                var W = C.ownerDocument || document, X = W && W.defaultView || window;
                if (X.getSelection) {
                  var P = X.getSelection(), ut = C.textContent.length, gt = Math.min(O.start, ut), Ht = O.end === void 0 ? gt : Math.min(O.end, ut);
                  !P.extend && gt > Ht && (x = Ht, Ht = gt, gt = x);
                  var k = Lm(
                    C,
                    gt
                  ), B = Lm(
                    C,
                    Ht
                  );
                  if (k && B && (P.rangeCount !== 1 || P.anchorNode !== k.node || P.anchorOffset !== k.offset || P.focusNode !== B.node || P.focusOffset !== B.offset)) {
                    var q = W.createRange();
                    q.setStart(k.node, k.offset), P.removeAllRanges(), gt > Ht ? (P.addRange(q), P.extend(B.node, B.offset)) : (q.setEnd(B.node, B.offset), P.addRange(q));
                  }
                }
              }
            }
            for (W = [], P = C; P = P.parentNode; )
              P.nodeType === 1 && W.push({
                element: P,
                left: P.scrollLeft,
                top: P.scrollTop
              });
            for (typeof C.focus == "function" && C.focus(), C = 0; C < W.length; C++) {
              var F = W[C];
              F.element.scrollLeft = F.left, F.element.scrollTop = F.top;
            }
          }
          Go = !!Qc, Fc = Qc = null;
        } finally {
          Nt = u, $.p = o, L.T = i;
        }
      }
      t.current = n, de = 2;
    }
  }
  function I1() {
    if (de === 2) {
      de = 0;
      var t = ha, n = Bi, i = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || i) {
        i = L.T, L.T = null;
        var o = $.p;
        $.p = 2;
        var u = Nt;
        Nt |= 4;
        try {
          A1(t, n.alternate, n);
        } finally {
          Nt = u, $.p = o, L.T = i;
        }
      }
      de = 3;
    }
  }
  function t0() {
    if (de === 4 || de === 3) {
      de = 0, Ir();
      var t = ha, n = Bi, i = Xn, o = H1;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? de = 5 : (de = 0, Bi = ha = null, e0(t, t.pendingLanes));
      var u = t.pendingLanes;
      if (u === 0 && (da = null), nu(i), n = n.stateNode, ke && typeof ke.onCommitFiberRoot == "function")
        try {
          ke.onCommitFiberRoot(
            fl,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (o !== null) {
        n = L.T, u = $.p, $.p = 2, L.T = null;
        try {
          for (var d = t.onRecoverableError, x = 0; x < o.length; x++) {
            var C = o[x];
            d(C.value, {
              componentStack: C.stack
            });
          }
        } finally {
          L.T = n, $.p = u;
        }
      }
      (Xn & 3) !== 0 && No(), Cn(t), u = t.pendingLanes, (i & 261930) !== 0 && (u & 42) !== 0 ? t === Lc ? Pl++ : (Pl = 0, Lc = t) : Pl = 0, Kl(0);
    }
  }
  function e0(t, n) {
    (t.pooledCacheLanes &= n) === 0 && (n = t.pooledCache, n != null && (t.pooledCache = null, Al(n)));
  }
  function No() {
    return W1(), I1(), t0(), n0();
  }
  function n0() {
    if (de !== 5) return !1;
    var t = ha, n = zc;
    zc = 0;
    var i = nu(Xn), o = L.T, u = $.p;
    try {
      $.p = 32 > i ? 32 : i, L.T = null, i = Bc, Bc = null;
      var d = ha, x = Xn;
      if (de = 0, Bi = ha = null, Xn = 0, (Nt & 6) !== 0) throw Error(s(331));
      var C = Nt;
      if (Nt |= 4, V1(d.current), z1(
        d,
        d.current,
        x,
        i
      ), Nt = C, Kl(0, !1), ke && typeof ke.onPostCommitFiberRoot == "function")
        try {
          ke.onPostCommitFiberRoot(fl, d);
        } catch {
        }
      return !0;
    } finally {
      $.p = u, L.T = o, e0(t, n);
    }
  }
  function a0(t, n, i) {
    n = Ie(i, n), n = mc(t.stateNode, n, 2), t = sa(t, n, 2), t !== null && (hl(t, 2), Cn(t));
  }
  function Bt(t, n, i) {
    if (t.tag === 3)
      a0(t, t, i);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          a0(
            n,
            t,
            i
          );
          break;
        } else if (n.tag === 1) {
          var o = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (da === null || !da.has(o))) {
            t = Ie(i, t), i = i1(2), o = sa(n, i, 2), o !== null && (l1(
              i,
              o,
              n,
              t
            ), hl(o, 2), Cn(o));
            break;
          }
        }
        n = n.return;
      }
  }
  function Uc(t, n, i) {
    var o = t.pingCache;
    if (o === null) {
      o = t.pingCache = new XS();
      var u = /* @__PURE__ */ new Set();
      o.set(n, u);
    } else
      u = o.get(n), u === void 0 && (u = /* @__PURE__ */ new Set(), o.set(n, u));
    u.has(i) || (Rc = !0, u.add(i), t = FS.bind(null, t, n, i), n.then(t, t));
  }
  function FS(t, n, i) {
    var o = t.pingCache;
    o !== null && o.delete(n), t.pingedLanes |= t.suspendedLanes & i, t.warmLanes &= ~i, qt === t && (jt & i) === i && (ee === 4 || ee === 3 && (jt & 62914560) === jt && 300 > ot() - Eo ? (Nt & 2) === 0 && Li(t, 0) : Nc |= i, zi === jt && (zi = 0)), Cn(t);
  }
  function i0(t, n) {
    n === 0 && (n = Wh()), t = za(t, n), t !== null && (hl(t, n), Cn(t));
  }
  function JS(t) {
    var n = t.memoizedState, i = 0;
    n !== null && (i = n.retryLane), i0(t, i);
  }
  function WS(t, n) {
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
    o !== null && o.delete(n), i0(t, i);
  }
  function IS(t, n) {
    return ul(t, n);
  }
  var Oo = null, ki = null, Hc = !1, zo = !1, $c = !1, pa = 0;
  function Cn(t) {
    t !== ki && t.next === null && (ki === null ? Oo = ki = t : ki = ki.next = t), zo = !0, Hc || (Hc = !0, e3());
  }
  function Kl(t, n) {
    if (!$c && zo) {
      $c = !0;
      do
        for (var i = !1, o = Oo; o !== null; ) {
          if (t !== 0) {
            var u = o.pendingLanes;
            if (u === 0) var d = 0;
            else {
              var x = o.suspendedLanes, C = o.pingedLanes;
              d = (1 << 31 - Ue(42 | t) + 1) - 1, d &= u & ~(x & ~C), d = d & 201326741 ? d & 201326741 | 1 : d ? d | 2 : 0;
            }
            d !== 0 && (i = !0, r0(o, d));
          } else
            d = jt, d = Vs(
              o,
              o === qt ? d : 0,
              o.cancelPendingCommit !== null || o.timeoutHandle !== -1
            ), (d & 3) === 0 || dl(o, d) || (i = !0, r0(o, d));
          o = o.next;
        }
      while (i);
      $c = !1;
    }
  }
  function t3() {
    l0();
  }
  function l0() {
    zo = Hc = !1;
    var t = 0;
    pa !== 0 && f3() && (t = pa);
    for (var n = ot(), i = null, o = Oo; o !== null; ) {
      var u = o.next, d = s0(o, n);
      d === 0 ? (o.next = null, i === null ? Oo = u : i.next = u, u === null && (ki = i)) : (i = o, (t !== 0 || (d & 3) !== 0) && (zo = !0)), o = u;
    }
    de !== 0 && de !== 5 || Kl(t), pa !== 0 && (pa = 0);
  }
  function s0(t, n) {
    for (var i = t.suspendedLanes, o = t.pingedLanes, u = t.expirationTimes, d = t.pendingLanes & -62914561; 0 < d; ) {
      var x = 31 - Ue(d), C = 1 << x, O = u[x];
      O === -1 ? ((C & i) === 0 || (C & o) !== 0) && (u[x] = Ax(C, n)) : O <= n && (t.expiredLanes |= C), d &= ~C;
    }
    if (n = qt, i = jt, i = Vs(
      t,
      t === n ? i : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o = t.callbackNode, i === 0 || t === n && (zt === 2 || zt === 9) || t.cancelPendingCommit !== null)
      return o !== null && o !== null && cl(o), t.callbackNode = null, t.callbackPriority = 0;
    if ((i & 3) === 0 || dl(t, i)) {
      if (n = i & -i, n === t.callbackPriority) return n;
      switch (o !== null && cl(o), nu(i)) {
        case 2:
        case 8:
          i = Ns;
          break;
        case 32:
          i = Fn;
          break;
        case 268435456:
          i = Jh;
          break;
        default:
          i = Fn;
      }
      return o = o0.bind(null, t), i = ul(i, o), t.callbackPriority = n, t.callbackNode = i, n;
    }
    return o !== null && o !== null && cl(o), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function o0(t, n) {
    if (de !== 0 && de !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var i = t.callbackNode;
    if (No() && t.callbackNode !== i)
      return null;
    var o = jt;
    return o = Vs(
      t,
      t === qt ? o : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), o === 0 ? null : (q1(t, o, n), s0(t, ot()), t.callbackNode != null && t.callbackNode === i ? o0.bind(null, t) : null);
  }
  function r0(t, n) {
    if (No()) return null;
    q1(t, n, !0);
  }
  function e3() {
    h3(function() {
      (Nt & 6) !== 0 ? ul(
        xn,
        t3
      ) : l0();
    });
  }
  function qc() {
    if (pa === 0) {
      var t = Ti;
      t === 0 && (t = zs, zs <<= 1, (zs & 261888) === 0 && (zs = 256)), pa = t;
    }
    return pa;
  }
  function u0(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : $s("" + t);
  }
  function c0(t, n) {
    var i = n.ownerDocument.createElement("input");
    return i.name = n.name, i.value = n.value, t.id && i.setAttribute("form", t.id), n.parentNode.insertBefore(i, n), t = new FormData(t), i.parentNode.removeChild(i), t;
  }
  function n3(t, n, i, o, u) {
    if (n === "submit" && i && i.stateNode === u) {
      var d = u0(
        (u[Re] || null).action
      ), x = o.submitter;
      x && (n = (n = x[Re] || null) ? u0(n.formAction) : x.getAttribute("formAction"), n !== null && (d = n, x = null));
      var C = new Xs(
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
                if (pa !== 0) {
                  var O = x ? c0(u, x) : new FormData(u);
                  rc(
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
                typeof d == "function" && (C.preventDefault(), O = x ? c0(u, x) : new FormData(u), rc(
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
  for (var Yc = 0; Yc < ju.length; Yc++) {
    var Gc = ju[Yc], a3 = Gc.toLowerCase(), i3 = Gc[0].toUpperCase() + Gc.slice(1);
    un(
      a3,
      "on" + i3
    );
  }
  un($m, "onAnimationEnd"), un(qm, "onAnimationIteration"), un(Ym, "onAnimationStart"), un("dblclick", "onDoubleClick"), un("focusin", "onFocus"), un("focusout", "onBlur"), un(xS, "onTransitionRun"), un(SS, "onTransitionStart"), un(wS, "onTransitionCancel"), un(Gm, "onTransitionEnd"), ui("onMouseEnter", ["mouseout", "mouseover"]), ui("onMouseLeave", ["mouseout", "mouseover"]), ui("onPointerEnter", ["pointerout", "pointerover"]), ui("onPointerLeave", ["pointerout", "pointerover"]), Da(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Da(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Da("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Da(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Da(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Da(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Zl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), l3 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Zl)
  );
  function f0(t, n) {
    n = (n & 4) !== 0;
    for (var i = 0; i < t.length; i++) {
      var o = t[i], u = o.event;
      o = o.listeners;
      t: {
        var d = void 0;
        if (n)
          for (var x = o.length - 1; 0 <= x; x--) {
            var C = o[x], O = C.instance, Y = C.currentTarget;
            if (C = C.listener, O !== d && u.isPropagationStopped())
              break t;
            d = C, u.currentTarget = Y;
            try {
              d(u);
            } catch (Q) {
              Zs(Q);
            }
            u.currentTarget = null, d = O;
          }
        else
          for (x = 0; x < o.length; x++) {
            if (C = o[x], O = C.instance, Y = C.currentTarget, C = C.listener, O !== d && u.isPropagationStopped())
              break t;
            d = C, u.currentTarget = Y;
            try {
              d(u);
            } catch (Q) {
              Zs(Q);
            }
            u.currentTarget = null, d = O;
          }
      }
    }
  }
  function Ct(t, n) {
    var i = n[au];
    i === void 0 && (i = n[au] = /* @__PURE__ */ new Set());
    var o = t + "__bubble";
    i.has(o) || (d0(n, t, 2, !1), i.add(o));
  }
  function Xc(t, n, i) {
    var o = 0;
    n && (o |= 4), d0(
      i,
      t,
      o,
      n
    );
  }
  var Bo = "_reactListening" + Math.random().toString(36).slice(2);
  function Pc(t) {
    if (!t[Bo]) {
      t[Bo] = !0, lm.forEach(function(i) {
        i !== "selectionchange" && (l3.has(i) || Xc(i, !1, t), Xc(i, !0, t));
      });
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[Bo] || (n[Bo] = !0, Xc("selectionchange", !1, n));
    }
  }
  function d0(t, n, i, o) {
    switch ($0(n)) {
      case 2:
        var u = O3;
        break;
      case 8:
        u = z3;
        break;
      default:
        u = rf;
    }
    i = u.bind(
      null,
      n,
      i,
      t
    ), u = void 0, !du || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (u = !0), o ? u !== void 0 ? t.addEventListener(n, i, {
      capture: !0,
      passive: u
    }) : t.addEventListener(n, i, !0) : u !== void 0 ? t.addEventListener(n, i, {
      passive: u
    }) : t.addEventListener(n, i, !1);
  }
  function Kc(t, n, i, o, u) {
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
            if (x = si(C), x === null) return;
            if (O = x.tag, O === 5 || O === 6 || O === 26 || O === 27) {
              o = d = x;
              continue t;
            }
            C = C.parentNode;
          }
        }
        o = o.return;
      }
    gm(function() {
      var Y = d, Q = cu(i), W = [];
      t: {
        var X = Xm.get(t);
        if (X !== void 0) {
          var P = Xs, ut = t;
          switch (t) {
            case "keypress":
              if (Ys(i) === 0) break t;
            case "keydown":
            case "keyup":
              P = Wx;
              break;
            case "focusin":
              ut = "focus", P = yu;
              break;
            case "focusout":
              ut = "blur", P = yu;
              break;
            case "beforeblur":
            case "afterblur":
              P = yu;
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
              P = xm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              P = Hx;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              P = eS;
              break;
            case $m:
            case qm:
            case Ym:
              P = Yx;
              break;
            case Gm:
              P = aS;
              break;
            case "scroll":
            case "scrollend":
              P = kx;
              break;
            case "wheel":
              P = lS;
              break;
            case "copy":
            case "cut":
            case "paste":
              P = Xx;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              P = wm;
              break;
            case "toggle":
            case "beforetoggle":
              P = oS;
          }
          var gt = (n & 4) !== 0, Ht = !gt && (t === "scroll" || t === "scrollend"), k = gt ? X !== null ? X + "Capture" : null : X;
          gt = [];
          for (var B = Y, q; B !== null; ) {
            var F = B;
            if (q = F.stateNode, F = F.tag, F !== 5 && F !== 26 && F !== 27 || q === null || k === null || (F = yl(B, k), F != null && gt.push(
              Ql(B, F, q)
            )), Ht) break;
            B = B.return;
          }
          0 < gt.length && (X = new P(
            X,
            ut,
            null,
            i,
            Q
          ), W.push({ event: X, listeners: gt }));
        }
      }
      if ((n & 7) === 0) {
        t: {
          if (X = t === "mouseover" || t === "pointerover", P = t === "mouseout" || t === "pointerout", X && i !== uu && (ut = i.relatedTarget || i.fromElement) && (si(ut) || ut[li]))
            break t;
          if ((P || X) && (X = Q.window === Q ? Q : (X = Q.ownerDocument) ? X.defaultView || X.parentWindow : window, P ? (ut = i.relatedTarget || i.toElement, P = Y, ut = ut ? si(ut) : null, ut !== null && (Ht = c(ut), gt = ut.tag, ut !== Ht || gt !== 5 && gt !== 27 && gt !== 6) && (ut = null)) : (P = null, ut = Y), P !== ut)) {
            if (gt = xm, F = "onMouseLeave", k = "onMouseEnter", B = "mouse", (t === "pointerout" || t === "pointerover") && (gt = wm, F = "onPointerLeave", k = "onPointerEnter", B = "pointer"), Ht = P == null ? X : pl(P), q = ut == null ? X : pl(ut), X = new gt(
              F,
              B + "leave",
              P,
              i,
              Q
            ), X.target = Ht, X.relatedTarget = q, F = null, si(Q) === Y && (gt = new gt(
              k,
              B + "enter",
              ut,
              i,
              Q
            ), gt.target = q, gt.relatedTarget = Ht, F = gt), Ht = F, P && ut)
              e: {
                for (gt = s3, k = P, B = ut, q = 0, F = k; F; F = gt(F))
                  q++;
                F = 0;
                for (var mt = B; mt; mt = gt(mt))
                  F++;
                for (; 0 < q - F; )
                  k = gt(k), q--;
                for (; 0 < F - q; )
                  B = gt(B), F--;
                for (; q--; ) {
                  if (k === B || B !== null && k === B.alternate) {
                    gt = k;
                    break e;
                  }
                  k = gt(k), B = gt(B);
                }
                gt = null;
              }
            else gt = null;
            P !== null && h0(
              W,
              X,
              P,
              gt,
              !1
            ), ut !== null && Ht !== null && h0(
              W,
              Ht,
              ut,
              gt,
              !0
            );
          }
        }
        t: {
          if (X = Y ? pl(Y) : window, P = X.nodeName && X.nodeName.toLowerCase(), P === "select" || P === "input" && X.type === "file")
            var _t = Dm;
          else if (Mm(X))
            if (Rm)
              _t = gS;
            else {
              _t = pS;
              var dt = mS;
            }
          else
            P = X.nodeName, !P || P.toLowerCase() !== "input" || X.type !== "checkbox" && X.type !== "radio" ? Y && ru(Y.elementType) && (_t = Dm) : _t = yS;
          if (_t && (_t = _t(t, Y))) {
            _m(
              W,
              _t,
              i,
              Q
            );
            break t;
          }
          dt && dt(t, X, Y), t === "focusout" && Y && X.type === "number" && Y.memoizedProps.value != null && ou(X, "number", X.value);
        }
        switch (dt = Y ? pl(Y) : window, t) {
          case "focusin":
            (Mm(dt) || dt.contentEditable === "true") && (pi = dt, wu = Y, Cl = null);
            break;
          case "focusout":
            Cl = wu = pi = null;
            break;
          case "mousedown":
            Tu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Tu = !1, Um(W, i, Q);
            break;
          case "selectionchange":
            if (bS) break;
          case "keydown":
          case "keyup":
            Um(W, i, Q);
        }
        var St;
        if (vu)
          t: {
            switch (t) {
              case "compositionstart":
                var Et = "onCompositionStart";
                break t;
              case "compositionend":
                Et = "onCompositionEnd";
                break t;
              case "compositionupdate":
                Et = "onCompositionUpdate";
                break t;
            }
            Et = void 0;
          }
        else
          mi ? Em(t, i) && (Et = "onCompositionEnd") : t === "keydown" && i.keyCode === 229 && (Et = "onCompositionStart");
        Et && (Tm && i.locale !== "ko" && (mi || Et !== "onCompositionStart" ? Et === "onCompositionEnd" && mi && (St = vm()) : (In = Q, hu = "value" in In ? In.value : In.textContent, mi = !0)), dt = Lo(Y, Et), 0 < dt.length && (Et = new Sm(
          Et,
          t,
          null,
          i,
          Q
        ), W.push({ event: Et, listeners: dt }), St ? Et.data = St : (St = Am(i), St !== null && (Et.data = St)))), (St = uS ? cS(t, i) : fS(t, i)) && (Et = Lo(Y, "onBeforeInput"), 0 < Et.length && (dt = new Sm(
          "onBeforeInput",
          "beforeinput",
          null,
          i,
          Q
        ), W.push({
          event: dt,
          listeners: Et
        }), dt.data = St)), n3(
          W,
          t,
          Y,
          i,
          Q
        );
      }
      f0(W, n);
    });
  }
  function Ql(t, n, i) {
    return {
      instance: t,
      listener: n,
      currentTarget: i
    };
  }
  function Lo(t, n) {
    for (var i = n + "Capture", o = []; t !== null; ) {
      var u = t, d = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || d === null || (u = yl(t, i), u != null && o.unshift(
        Ql(t, u, d)
      ), u = yl(t, n), u != null && o.push(
        Ql(t, u, d)
      )), t.tag === 3) return o;
      t = t.return;
    }
    return [];
  }
  function s3(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function h0(t, n, i, o, u) {
    for (var d = n._reactName, x = []; i !== null && i !== o; ) {
      var C = i, O = C.alternate, Y = C.stateNode;
      if (C = C.tag, O !== null && O === o) break;
      C !== 5 && C !== 26 && C !== 27 || Y === null || (O = Y, u ? (Y = yl(i, d), Y != null && x.unshift(
        Ql(i, Y, O)
      )) : u || (Y = yl(i, d), Y != null && x.push(
        Ql(i, Y, O)
      ))), i = i.return;
    }
    x.length !== 0 && t.push({ event: n, listeners: x });
  }
  var o3 = /\r\n?/g, r3 = /\u0000|\uFFFD/g;
  function m0(t) {
    return (typeof t == "string" ? t : "" + t).replace(o3, `
`).replace(r3, "");
  }
  function p0(t, n) {
    return n = m0(n), m0(t) === n;
  }
  function Ut(t, n, i, o, u, d) {
    switch (i) {
      case "children":
        typeof o == "string" ? n === "body" || n === "textarea" && o === "" || fi(t, o) : (typeof o == "number" || typeof o == "bigint") && n !== "body" && fi(t, "" + o);
        break;
      case "className":
        Us(t, "class", o);
        break;
      case "tabIndex":
        Us(t, "tabindex", o);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Us(t, i, o);
        break;
      case "style":
        pm(t, o, d);
        break;
      case "data":
        if (n !== "object") {
          Us(t, "data", o);
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
        o = $s("" + o), t.setAttribute(i, o);
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
        o = $s("" + o), t.setAttribute(i, o);
        break;
      case "onClick":
        o != null && (t.onclick = Dn);
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
        i = $s("" + o), t.setAttributeNS(
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
        Ct("beforetoggle", t), Ct("toggle", t), ks(t, "popover", o);
        break;
      case "xlinkActuate":
        _n(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          o
        );
        break;
      case "xlinkArcrole":
        _n(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          o
        );
        break;
      case "xlinkRole":
        _n(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          o
        );
        break;
      case "xlinkShow":
        _n(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          o
        );
        break;
      case "xlinkTitle":
        _n(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          o
        );
        break;
      case "xlinkType":
        _n(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          o
        );
        break;
      case "xmlBase":
        _n(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          o
        );
        break;
      case "xmlLang":
        _n(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          o
        );
        break;
      case "xmlSpace":
        _n(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          o
        );
        break;
      case "is":
        ks(t, "is", o);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < i.length) || i[0] !== "o" && i[0] !== "O" || i[1] !== "n" && i[1] !== "N") && (i = Lx.get(i) || i, ks(t, i, o));
    }
  }
  function Zc(t, n, i, o, u, d) {
    switch (i) {
      case "style":
        pm(t, o, d);
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
        o != null && Ct("scroll", t);
        break;
      case "onScrollEnd":
        o != null && Ct("scrollend", t);
        break;
      case "onClick":
        o != null && (t.onclick = Dn);
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
        if (!sm.hasOwnProperty(i))
          t: {
            if (i[0] === "o" && i[1] === "n" && (u = i.endsWith("Capture"), n = i.slice(2, u ? i.length - 7 : void 0), d = t[Re] || null, d = d != null ? d[i] : null, typeof d == "function" && t.removeEventListener(n, d, u), typeof o == "function")) {
              typeof d != "function" && d !== null && (i in t ? t[i] = null : t.hasAttribute(i) && t.removeAttribute(i)), t.addEventListener(n, o, u);
              break t;
            }
            i in t ? t[i] = o : o === !0 ? t.setAttribute(i, "") : ks(t, i, o);
          }
    }
  }
  function we(t, n, i) {
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
        var C = d = x = u = null, O = null, Y = null;
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
                  O = Q;
                  break;
                case "defaultChecked":
                  Y = Q;
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
                  Ut(t, n, o, Q, i, null);
              }
          }
        fm(
          t,
          d,
          C,
          O,
          Y,
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
        n = d, i = x, t.multiple = !!o, n != null ? ci(t, !!o, n, !1) : i != null && ci(t, !!o, i, !0);
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
        hm(t, o, u, d);
        return;
      case "option":
        for (O in i)
          if (i.hasOwnProperty(O) && (o = i[O], o != null))
            switch (O) {
              case "selected":
                t.selected = o && typeof o != "function" && typeof o != "symbol";
                break;
              default:
                Ut(t, n, O, o, i, null);
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
        for (o = 0; o < Zl.length; o++)
          Ct(Zl[o], t);
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
        for (Y in i)
          if (i.hasOwnProperty(Y) && (o = i[Y], o != null))
            switch (Y) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, n));
              default:
                Ut(t, n, Y, o, i, null);
            }
        return;
      default:
        if (ru(n)) {
          for (Q in i)
            i.hasOwnProperty(Q) && (o = i[Q], o !== void 0 && Zc(
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
      i.hasOwnProperty(C) && (o = i[C], o != null && Ut(t, n, C, o, i, null));
  }
  function u3(t, n, i, o) {
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
        var u = null, d = null, x = null, C = null, O = null, Y = null, Q = null;
        for (P in i) {
          var W = i[P];
          if (i.hasOwnProperty(P) && W != null)
            switch (P) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                O = W;
              default:
                o.hasOwnProperty(P) || Ut(t, n, P, null, o, W);
            }
        }
        for (var X in o) {
          var P = o[X];
          if (W = i[X], o.hasOwnProperty(X) && (P != null || W != null))
            switch (X) {
              case "type":
                d = P;
                break;
              case "name":
                u = P;
                break;
              case "checked":
                Y = P;
                break;
              case "defaultChecked":
                Q = P;
                break;
              case "value":
                x = P;
                break;
              case "defaultValue":
                C = P;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (P != null)
                  throw Error(s(137, n));
                break;
              default:
                P !== W && Ut(
                  t,
                  n,
                  X,
                  P,
                  o,
                  W
                );
            }
        }
        su(
          t,
          x,
          C,
          O,
          Y,
          Q,
          d,
          u
        );
        return;
      case "select":
        P = x = C = X = null;
        for (d in i)
          if (O = i[d], i.hasOwnProperty(d) && O != null)
            switch (d) {
              case "value":
                break;
              case "multiple":
                P = O;
              default:
                o.hasOwnProperty(d) || Ut(
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
                X = d;
                break;
              case "defaultValue":
                C = d;
                break;
              case "multiple":
                x = d;
              default:
                d !== O && Ut(
                  t,
                  n,
                  u,
                  d,
                  o,
                  O
                );
            }
        n = C, i = x, o = P, X != null ? ci(t, !!i, X, !1) : !!o != !!i && (n != null ? ci(t, !!i, n, !0) : ci(t, !!i, i ? [] : "", !1));
        return;
      case "textarea":
        P = X = null;
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
                X = u;
                break;
              case "defaultValue":
                P = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(s(91));
                break;
              default:
                u !== d && Ut(t, n, x, u, o, d);
            }
        dm(t, X, P);
        return;
      case "option":
        for (var ut in i)
          if (X = i[ut], i.hasOwnProperty(ut) && X != null && !o.hasOwnProperty(ut))
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
                  X
                );
            }
        for (O in o)
          if (X = o[O], P = i[O], o.hasOwnProperty(O) && X !== P && (X != null || P != null))
            switch (O) {
              case "selected":
                t.selected = X && typeof X != "function" && typeof X != "symbol";
                break;
              default:
                Ut(
                  t,
                  n,
                  O,
                  X,
                  o,
                  P
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
          X = i[gt], i.hasOwnProperty(gt) && X != null && !o.hasOwnProperty(gt) && Ut(t, n, gt, null, o, X);
        for (Y in o)
          if (X = o[Y], P = i[Y], o.hasOwnProperty(Y) && X !== P && (X != null || P != null))
            switch (Y) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (X != null)
                  throw Error(s(137, n));
                break;
              default:
                Ut(
                  t,
                  n,
                  Y,
                  X,
                  o,
                  P
                );
            }
        return;
      default:
        if (ru(n)) {
          for (var Ht in i)
            X = i[Ht], i.hasOwnProperty(Ht) && X !== void 0 && !o.hasOwnProperty(Ht) && Zc(
              t,
              n,
              Ht,
              void 0,
              o,
              X
            );
          for (Q in o)
            X = o[Q], P = i[Q], !o.hasOwnProperty(Q) || X === P || X === void 0 && P === void 0 || Zc(
              t,
              n,
              Q,
              X,
              o,
              P
            );
          return;
        }
    }
    for (var k in i)
      X = i[k], i.hasOwnProperty(k) && X != null && !o.hasOwnProperty(k) && Ut(t, n, k, null, o, X);
    for (W in o)
      X = o[W], P = i[W], !o.hasOwnProperty(W) || X === P || X == null && P == null || Ut(t, n, W, X, o, P);
  }
  function y0(t) {
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
  function c3() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, n = 0, i = performance.getEntriesByType("resource"), o = 0; o < i.length; o++) {
        var u = i[o], d = u.transferSize, x = u.initiatorType, C = u.duration;
        if (d && C && y0(x)) {
          for (x = 0, C = u.responseEnd, o += 1; o < i.length; o++) {
            var O = i[o], Y = O.startTime;
            if (Y > C) break;
            var Q = O.transferSize, W = O.initiatorType;
            Q && y0(W) && (O = O.responseEnd, x += Q * (O < C ? 1 : (C - Y) / (O - Y)));
          }
          if (--o, n += 8 * (d + x) / (u.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return n / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Qc = null, Fc = null;
  function Vo(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function g0(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function v0(t, n) {
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
  function Jc(t, n) {
    return t === "textarea" || t === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Wc = null;
  function f3() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Wc ? !1 : (Wc = t, !0) : (Wc = null, !1);
  }
  var b0 = typeof setTimeout == "function" ? setTimeout : void 0, d3 = typeof clearTimeout == "function" ? clearTimeout : void 0, x0 = typeof Promise == "function" ? Promise : void 0, h3 = typeof queueMicrotask == "function" ? queueMicrotask : typeof x0 < "u" ? function(t) {
    return x0.resolve(null).then(t).catch(m3);
  } : b0;
  function m3(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function ya(t) {
    return t === "head";
  }
  function S0(t, n) {
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
          Fl(t.ownerDocument.documentElement);
        else if (i === "head") {
          i = t.ownerDocument.head, Fl(i);
          for (var d = i.firstChild; d; ) {
            var x = d.nextSibling, C = d.nodeName;
            d[ml] || C === "SCRIPT" || C === "STYLE" || C === "LINK" && d.rel.toLowerCase() === "stylesheet" || i.removeChild(d), d = x;
          }
        } else
          i === "body" && Fl(t.ownerDocument.body);
      i = u;
    } while (i);
    qi(n);
  }
  function w0(t, n) {
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
  function Ic(t) {
    var n = t.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var i = n;
      switch (n = n.nextSibling, i.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Ic(i), iu(i);
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
  function p3(t, n, i, o) {
    for (; t.nodeType === 1; ) {
      var u = i;
      if (t.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!o && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (o) {
        if (!t[ml])
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
      if (t = ln(t.nextSibling), t === null) break;
    }
    return null;
  }
  function y3(t, n, i) {
    if (n === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !i || (t = ln(t.nextSibling), t === null)) return null;
    return t;
  }
  function T0(t, n) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = ln(t.nextSibling), t === null)) return null;
    return t;
  }
  function tf(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function ef(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function g3(t, n) {
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
  function ln(t) {
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
  var nf = null;
  function C0(t) {
    t = t.nextSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var i = t.data;
        if (i === "/$" || i === "/&") {
          if (n === 0)
            return ln(t.nextSibling);
          n--;
        } else
          i !== "$" && i !== "$!" && i !== "$?" && i !== "$~" && i !== "&" || n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function j0(t) {
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
  function E0(t, n, i) {
    switch (n = Vo(i), t) {
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
  function Fl(t) {
    for (var n = t.attributes; n.length; )
      t.removeAttributeNode(n[0]);
    iu(t);
  }
  var sn = /* @__PURE__ */ new Map(), A0 = /* @__PURE__ */ new Set();
  function ko(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Pn = $.d;
  $.d = {
    f: v3,
    r: b3,
    D: x3,
    C: S3,
    L: w3,
    m: T3,
    X: j3,
    S: C3,
    M: E3
  };
  function v3() {
    var t = Pn.f(), n = _o();
    return t || n;
  }
  function b3(t) {
    var n = oi(t);
    n !== null && n.tag === 5 && n.type === "form" ? Gp(n) : Pn.r(t);
  }
  var Ui = typeof document > "u" ? null : document;
  function M0(t, n, i) {
    var o = Ui;
    if (o && typeof n == "string" && n) {
      var u = Je(n);
      u = 'link[rel="' + t + '"][href="' + u + '"]', typeof i == "string" && (u += '[crossorigin="' + i + '"]'), A0.has(u) || (A0.add(u), t = { rel: t, crossOrigin: i, href: n }, o.querySelector(u) === null && (n = o.createElement("link"), we(n, "link", t), ye(n), o.head.appendChild(n)));
    }
  }
  function x3(t) {
    Pn.D(t), M0("dns-prefetch", t, null);
  }
  function S3(t, n) {
    Pn.C(t, n), M0("preconnect", t, n);
  }
  function w3(t, n, i) {
    Pn.L(t, n, i);
    var o = Ui;
    if (o && t && n) {
      var u = 'link[rel="preload"][as="' + Je(n) + '"]';
      n === "image" && i && i.imageSrcSet ? (u += '[imagesrcset="' + Je(
        i.imageSrcSet
      ) + '"]', typeof i.imageSizes == "string" && (u += '[imagesizes="' + Je(
        i.imageSizes
      ) + '"]')) : u += '[href="' + Je(t) + '"]';
      var d = u;
      switch (n) {
        case "style":
          d = Hi(t);
          break;
        case "script":
          d = $i(t);
      }
      sn.has(d) || (t = v(
        {
          rel: "preload",
          href: n === "image" && i && i.imageSrcSet ? void 0 : t,
          as: n
        },
        i
      ), sn.set(d, t), o.querySelector(u) !== null || n === "style" && o.querySelector(Jl(d)) || n === "script" && o.querySelector(Wl(d)) || (n = o.createElement("link"), we(n, "link", t), ye(n), o.head.appendChild(n)));
    }
  }
  function T3(t, n) {
    Pn.m(t, n);
    var i = Ui;
    if (i && t) {
      var o = n && typeof n.as == "string" ? n.as : "script", u = 'link[rel="modulepreload"][as="' + Je(o) + '"][href="' + Je(t) + '"]', d = u;
      switch (o) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          d = $i(t);
      }
      if (!sn.has(d) && (t = v({ rel: "modulepreload", href: t }, n), sn.set(d, t), i.querySelector(u) === null)) {
        switch (o) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (i.querySelector(Wl(d)))
              return;
        }
        o = i.createElement("link"), we(o, "link", t), ye(o), i.head.appendChild(o);
      }
    }
  }
  function C3(t, n, i) {
    Pn.S(t, n, i);
    var o = Ui;
    if (o && t) {
      var u = ri(o).hoistableStyles, d = Hi(t);
      n = n || "default";
      var x = u.get(d);
      if (!x) {
        var C = { loading: 0, preload: null };
        if (x = o.querySelector(
          Jl(d)
        ))
          C.loading = 5;
        else {
          t = v(
            { rel: "stylesheet", href: t, "data-precedence": n },
            i
          ), (i = sn.get(d)) && af(t, i);
          var O = x = o.createElement("link");
          ye(O), we(O, "link", t), O._p = new Promise(function(Y, Q) {
            O.onload = Y, O.onerror = Q;
          }), O.addEventListener("load", function() {
            C.loading |= 1;
          }), O.addEventListener("error", function() {
            C.loading |= 2;
          }), C.loading |= 4, Uo(x, n, o);
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
  function j3(t, n) {
    Pn.X(t, n);
    var i = Ui;
    if (i && t) {
      var o = ri(i).hoistableScripts, u = $i(t), d = o.get(u);
      d || (d = i.querySelector(Wl(u)), d || (t = v({ src: t, async: !0 }, n), (n = sn.get(u)) && lf(t, n), d = i.createElement("script"), ye(d), we(d, "link", t), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, o.set(u, d));
    }
  }
  function E3(t, n) {
    Pn.M(t, n);
    var i = Ui;
    if (i && t) {
      var o = ri(i).hoistableScripts, u = $i(t), d = o.get(u);
      d || (d = i.querySelector(Wl(u)), d || (t = v({ src: t, async: !0, type: "module" }, n), (n = sn.get(u)) && lf(t, n), d = i.createElement("script"), ye(d), we(d, "link", t), i.head.appendChild(d)), d = {
        type: "script",
        instance: d,
        count: 1,
        state: null
      }, o.set(u, d));
    }
  }
  function _0(t, n, i, o) {
    var u = (u = pt.current) ? ko(u) : null;
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
            Jl(t)
          )) && !d._p && (x.instance = d, x.state.loading = 5), sn.has(t) || (i = {
            rel: "preload",
            as: "style",
            href: i.href,
            crossOrigin: i.crossOrigin,
            integrity: i.integrity,
            media: i.media,
            hrefLang: i.hrefLang,
            referrerPolicy: i.referrerPolicy
          }, sn.set(t, i), d || A3(
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
        return n = i.async, i = i.src, typeof i == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = $i(i), i = ri(
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
    return 'href="' + Je(t) + '"';
  }
  function Jl(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function D0(t) {
    return v({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function A3(t, n, i, o) {
    t.querySelector('link[rel="preload"][as="style"][' + n + "]") ? o.loading = 1 : (n = t.createElement("link"), o.preload = n, n.addEventListener("load", function() {
      return o.loading |= 1;
    }), n.addEventListener("error", function() {
      return o.loading |= 2;
    }), we(n, "link", i), ye(n), t.head.appendChild(n));
  }
  function $i(t) {
    return '[src="' + Je(t) + '"]';
  }
  function Wl(t) {
    return "script[async]" + t;
  }
  function R0(t, n, i) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var o = t.querySelector(
            'style[data-href~="' + Je(i.href) + '"]'
          );
          if (o)
            return n.instance = o, ye(o), o;
          var u = v({}, i, {
            "data-href": i.href,
            "data-precedence": i.precedence,
            href: null,
            precedence: null
          });
          return o = (t.ownerDocument || t).createElement(
            "style"
          ), ye(o), we(o, "style", u), Uo(o, i.precedence, t), n.instance = o;
        case "stylesheet":
          u = Hi(i.href);
          var d = t.querySelector(
            Jl(u)
          );
          if (d)
            return n.state.loading |= 4, n.instance = d, ye(d), d;
          o = D0(i), (u = sn.get(u)) && af(o, u), d = (t.ownerDocument || t).createElement("link"), ye(d);
          var x = d;
          return x._p = new Promise(function(C, O) {
            x.onload = C, x.onerror = O;
          }), we(d, "link", o), n.state.loading |= 4, Uo(d, i.precedence, t), n.instance = d;
        case "script":
          return d = $i(i.src), (u = t.querySelector(
            Wl(d)
          )) ? (n.instance = u, ye(u), u) : (o = i, (u = sn.get(d)) && (o = v({}, i), lf(o, u)), t = t.ownerDocument || t, u = t.createElement("script"), ye(u), we(u, "link", o), t.head.appendChild(u), n.instance = u);
        case "void":
          return null;
        default:
          throw Error(s(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (o = n.instance, n.state.loading |= 4, Uo(o, i.precedence, t));
    return n.instance;
  }
  function Uo(t, n, i) {
    for (var o = i.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = o.length ? o[o.length - 1] : null, d = u, x = 0; x < o.length; x++) {
      var C = o[x];
      if (C.dataset.precedence === n) d = C;
      else if (d !== u) break;
    }
    d ? d.parentNode.insertBefore(t, d.nextSibling) : (n = i.nodeType === 9 ? i.head : i, n.insertBefore(t, n.firstChild));
  }
  function af(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.title == null && (t.title = n.title);
  }
  function lf(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.integrity == null && (t.integrity = n.integrity);
  }
  var Ho = null;
  function N0(t, n, i) {
    if (Ho === null) {
      var o = /* @__PURE__ */ new Map(), u = Ho = /* @__PURE__ */ new Map();
      u.set(i, o);
    } else
      u = Ho, o = u.get(i), o || (o = /* @__PURE__ */ new Map(), u.set(i, o));
    if (o.has(t)) return o;
    for (o.set(t, null), i = i.getElementsByTagName(t), u = 0; u < i.length; u++) {
      var d = i[u];
      if (!(d[ml] || d[ve] || t === "link" && d.getAttribute("rel") === "stylesheet") && d.namespaceURI !== "http://www.w3.org/2000/svg") {
        var x = d.getAttribute(n) || "";
        x = t + x;
        var C = o.get(x);
        C ? C.push(d) : o.set(x, [d]);
      }
    }
    return o;
  }
  function O0(t, n, i) {
    t = t.ownerDocument || t, t.head.insertBefore(
      i,
      n === "title" ? t.querySelector("head > title") : null
    );
  }
  function M3(t, n, i) {
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
  function z0(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function _3(t, n, i, o) {
    if (i.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (i.state.loading & 4) === 0) {
      if (i.instance === null) {
        var u = Hi(o.href), d = n.querySelector(
          Jl(u)
        );
        if (d) {
          n = d._p, n !== null && typeof n == "object" && typeof n.then == "function" && (t.count++, t = $o.bind(t), n.then(t, t)), i.state.loading |= 4, i.instance = d, ye(d);
          return;
        }
        d = n.ownerDocument || n, o = D0(o), (u = sn.get(u)) && af(o, u), d = d.createElement("link"), ye(d);
        var x = d;
        x._p = new Promise(function(C, O) {
          x.onload = C, x.onerror = O;
        }), we(d, "link", o), i.instance = d;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(i, n), (n = i.state.preload) && (i.state.loading & 3) === 0 && (t.count++, i = $o.bind(t), n.addEventListener("load", i), n.addEventListener("error", i));
    }
  }
  var sf = 0;
  function D3(t, n) {
    return t.stylesheets && t.count === 0 && Yo(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(i) {
      var o = setTimeout(function() {
        if (t.stylesheets && Yo(t, t.stylesheets), t.unsuspend) {
          var d = t.unsuspend;
          t.unsuspend = null, d();
        }
      }, 6e4 + n);
      0 < t.imgBytes && sf === 0 && (sf = 62500 * c3());
      var u = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Yo(t, t.stylesheets), t.unsuspend)) {
            var d = t.unsuspend;
            t.unsuspend = null, d();
          }
        },
        (t.imgBytes > sf ? 50 : 800) + n
      );
      return t.unsuspend = i, function() {
        t.unsuspend = null, clearTimeout(o), clearTimeout(u);
      };
    } : null;
  }
  function $o() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) Yo(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var qo = null;
  function Yo(t, n) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, qo = /* @__PURE__ */ new Map(), n.forEach(R3, t), qo = null, $o.call(t));
  }
  function R3(t, n) {
    if (!(n.state.loading & 4)) {
      var i = qo.get(t);
      if (i) var o = i.get(null);
      else {
        i = /* @__PURE__ */ new Map(), qo.set(t, i);
        for (var u = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), d = 0; d < u.length; d++) {
          var x = u[d];
          (x.nodeName === "LINK" || x.getAttribute("media") !== "not all") && (i.set(x.dataset.precedence, x), o = x);
        }
        o && i.set(null, o);
      }
      u = n.instance, x = u.getAttribute("data-precedence"), d = i.get(x) || o, d === o && i.set(null, u), i.set(x, u), this.count++, o = $o.bind(this), u.addEventListener("load", o), u.addEventListener("error", o), d ? d.parentNode.insertBefore(u, d.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(u, t.firstChild)), n.state.loading |= 4;
    }
  }
  var Il = {
    $$typeof: D,
    Provider: null,
    Consumer: null,
    _currentValue: et,
    _currentValue2: et,
    _threadCount: 0
  };
  function N3(t, n, i, o, u, d, x, C, O) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = tu(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = tu(0), this.hiddenUpdates = tu(null), this.identifierPrefix = o, this.onUncaughtError = u, this.onCaughtError = d, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = O, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function B0(t, n, i, o, u, d, x, C, O, Y, Q, W) {
    return t = new N3(
      t,
      n,
      i,
      x,
      O,
      Y,
      Q,
      W,
      C
    ), n = 1, d === !0 && (n |= 24), d = $e(3, null, null, n), t.current = d, d.stateNode = t, n = ku(), n.refCount++, t.pooledCache = n, n.refCount++, d.memoizedState = {
      element: o,
      isDehydrated: i,
      cache: n
    }, qu(d), t;
  }
  function L0(t) {
    return t ? (t = vi, t) : vi;
  }
  function V0(t, n, i, o, u, d) {
    u = L0(u), o.context === null ? o.context = u : o.pendingContext = u, o = la(n), o.payload = { element: i }, d = d === void 0 ? null : d, d !== null && (o.callback = d), i = sa(t, o, n), i !== null && (Ve(i, t, n), Rl(i, t, n));
  }
  function k0(t, n) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var i = t.retryLane;
      t.retryLane = i !== 0 && i < n ? i : n;
    }
  }
  function of(t, n) {
    k0(t, n), (t = t.alternate) && k0(t, n);
  }
  function U0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = za(t, 67108864);
      n !== null && Ve(n, t, 67108864), of(t, 67108864);
    }
  }
  function H0(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Pe();
      n = eu(n);
      var i = za(t, n);
      i !== null && Ve(i, t, n), of(t, n);
    }
  }
  var Go = !0;
  function O3(t, n, i, o) {
    var u = L.T;
    L.T = null;
    var d = $.p;
    try {
      $.p = 2, rf(t, n, i, o);
    } finally {
      $.p = d, L.T = u;
    }
  }
  function z3(t, n, i, o) {
    var u = L.T;
    L.T = null;
    var d = $.p;
    try {
      $.p = 8, rf(t, n, i, o);
    } finally {
      $.p = d, L.T = u;
    }
  }
  function rf(t, n, i, o) {
    if (Go) {
      var u = uf(o);
      if (u === null)
        Kc(
          t,
          n,
          o,
          Xo,
          i
        ), q0(t, o);
      else if (L3(
        u,
        t,
        n,
        i,
        o
      ))
        o.stopPropagation();
      else if (q0(t, o), n & 4 && -1 < B3.indexOf(t)) {
        for (; u !== null; ) {
          var d = oi(u);
          if (d !== null)
            switch (d.tag) {
              case 3:
                if (d = d.stateNode, d.current.memoizedState.isDehydrated) {
                  var x = _a(d.pendingLanes);
                  if (x !== 0) {
                    var C = d;
                    for (C.pendingLanes |= 2, C.entangledLanes |= 2; x; ) {
                      var O = 1 << 31 - Ue(x);
                      C.entanglements[1] |= O, x &= ~O;
                    }
                    Cn(d), (Nt & 6) === 0 && (Ao = ot() + 500, Kl(0));
                  }
                }
                break;
              case 31:
              case 13:
                C = za(d, 2), C !== null && Ve(C, d, 2), _o(), of(d, 2);
            }
          if (d = uf(o), d === null && Kc(
            t,
            n,
            o,
            Xo,
            i
          ), d === u) break;
          u = d;
        }
        u !== null && o.stopPropagation();
      } else
        Kc(
          t,
          n,
          o,
          null,
          i
        );
    }
  }
  function uf(t) {
    return t = cu(t), cf(t);
  }
  var Xo = null;
  function cf(t) {
    if (Xo = null, t = si(t), t !== null) {
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
    return Xo = t, null;
  }
  function $0(t) {
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
        switch (Vt()) {
          case xn:
            return 2;
          case Ns:
            return 8;
          case Fn:
          case Os:
            return 32;
          case Jh:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ff = !1, ga = null, va = null, ba = null, ts = /* @__PURE__ */ new Map(), es = /* @__PURE__ */ new Map(), xa = [], B3 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function q0(t, n) {
    switch (t) {
      case "focusin":
      case "focusout":
        ga = null;
        break;
      case "dragenter":
      case "dragleave":
        va = null;
        break;
      case "mouseover":
      case "mouseout":
        ba = null;
        break;
      case "pointerover":
      case "pointerout":
        ts.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        es.delete(n.pointerId);
    }
  }
  function ns(t, n, i, o, u, d) {
    return t === null || t.nativeEvent !== d ? (t = {
      blockedOn: n,
      domEventName: i,
      eventSystemFlags: o,
      nativeEvent: d,
      targetContainers: [u]
    }, n !== null && (n = oi(n), n !== null && U0(n)), t) : (t.eventSystemFlags |= o, n = t.targetContainers, u !== null && n.indexOf(u) === -1 && n.push(u), t);
  }
  function L3(t, n, i, o, u) {
    switch (n) {
      case "focusin":
        return ga = ns(
          ga,
          t,
          n,
          i,
          o,
          u
        ), !0;
      case "dragenter":
        return va = ns(
          va,
          t,
          n,
          i,
          o,
          u
        ), !0;
      case "mouseover":
        return ba = ns(
          ba,
          t,
          n,
          i,
          o,
          u
        ), !0;
      case "pointerover":
        var d = u.pointerId;
        return ts.set(
          d,
          ns(
            ts.get(d) || null,
            t,
            n,
            i,
            o,
            u
          )
        ), !0;
      case "gotpointercapture":
        return d = u.pointerId, es.set(
          d,
          ns(
            es.get(d) || null,
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
  function Y0(t) {
    var n = si(t.target);
    if (n !== null) {
      var i = c(n);
      if (i !== null) {
        if (n = i.tag, n === 13) {
          if (n = f(i), n !== null) {
            t.blockedOn = n, am(t.priority, function() {
              H0(i);
            });
            return;
          }
        } else if (n === 31) {
          if (n = h(i), n !== null) {
            t.blockedOn = n, am(t.priority, function() {
              H0(i);
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
  function Po(t) {
    if (t.blockedOn !== null) return !1;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var i = uf(t.nativeEvent);
      if (i === null) {
        i = t.nativeEvent;
        var o = new i.constructor(
          i.type,
          i
        );
        uu = o, i.target.dispatchEvent(o), uu = null;
      } else
        return n = oi(i), n !== null && U0(n), t.blockedOn = i, !1;
      n.shift();
    }
    return !0;
  }
  function G0(t, n, i) {
    Po(t) && i.delete(n);
  }
  function V3() {
    ff = !1, ga !== null && Po(ga) && (ga = null), va !== null && Po(va) && (va = null), ba !== null && Po(ba) && (ba = null), ts.forEach(G0), es.forEach(G0);
  }
  function Ko(t, n) {
    t.blockedOn === n && (t.blockedOn = null, ff || (ff = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      V3
    )));
  }
  var Zo = null;
  function X0(t) {
    Zo !== t && (Zo = t, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        Zo === t && (Zo = null);
        for (var n = 0; n < t.length; n += 3) {
          var i = t[n], o = t[n + 1], u = t[n + 2];
          if (typeof o != "function") {
            if (cf(o || i) === null)
              continue;
            break;
          }
          var d = oi(i);
          d !== null && (t.splice(n, 3), n -= 3, rc(
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
    function n(O) {
      return Ko(O, t);
    }
    ga !== null && Ko(ga, t), va !== null && Ko(va, t), ba !== null && Ko(ba, t), ts.forEach(n), es.forEach(n);
    for (var i = 0; i < xa.length; i++) {
      var o = xa[i];
      o.blockedOn === t && (o.blockedOn = null);
    }
    for (; 0 < xa.length && (i = xa[0], i.blockedOn === null); )
      Y0(i), i.blockedOn === null && xa.shift();
    if (i = (t.ownerDocument || t).$$reactFormReplay, i != null)
      for (o = 0; o < i.length; o += 3) {
        var u = i[o], d = i[o + 1], x = u[Re] || null;
        if (typeof d == "function")
          x || X0(i);
        else if (x) {
          var C = null;
          if (d && d.hasAttribute("formAction")) {
            if (u = d, x = d[Re] || null)
              C = x.formAction;
            else if (cf(u) !== null) continue;
          } else C = x.action;
          typeof C == "function" ? i[o + 1] = C : (i.splice(o, 3), o -= 3), X0(i);
        }
      }
  }
  function P0() {
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
  function df(t) {
    this._internalRoot = t;
  }
  Qo.prototype.render = df.prototype.render = function(t) {
    var n = this._internalRoot;
    if (n === null) throw Error(s(409));
    var i = n.current, o = Pe();
    V0(i, o, t, n, null, null);
  }, Qo.prototype.unmount = df.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var n = t.containerInfo;
      V0(t.current, 2, null, t, null, null), _o(), n[li] = null;
    }
  };
  function Qo(t) {
    this._internalRoot = t;
  }
  Qo.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var n = nm();
      t = { blockedOn: null, target: t, priority: n };
      for (var i = 0; i < xa.length && n !== 0 && n < xa[i].priority; i++) ;
      xa.splice(i, 0, t), i === 0 && Y0(t);
    }
  };
  var K0 = e.version;
  if (K0 !== "19.2.7")
    throw Error(
      s(
        527,
        K0,
        "19.2.7"
      )
    );
  $.findDOMNode = function(t) {
    var n = t._reactInternals;
    if (n === void 0)
      throw typeof t.render == "function" ? Error(s(188)) : (t = Object.keys(t).join(","), Error(s(268, t)));
    return t = p(n), t = t !== null ? g(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var k3 = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: L,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Fo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Fo.isDisabled && Fo.supportsFiber)
      try {
        fl = Fo.inject(
          k3
        ), ke = Fo;
      } catch {
      }
  }
  return is.createRoot = function(t, n) {
    if (!r(t)) throw Error(s(299));
    var i = !1, o = "", u = t1, d = e1, x = n1;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (u = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (x = n.onRecoverableError)), n = B0(
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
      P0
    ), t[li] = n.current, Pc(t), new df(n);
  }, is.hydrateRoot = function(t, n, i) {
    if (!r(t)) throw Error(s(299));
    var o = !1, u = "", d = t1, x = e1, C = n1, O = null;
    return i != null && (i.unstable_strictMode === !0 && (o = !0), i.identifierPrefix !== void 0 && (u = i.identifierPrefix), i.onUncaughtError !== void 0 && (d = i.onUncaughtError), i.onCaughtError !== void 0 && (x = i.onCaughtError), i.onRecoverableError !== void 0 && (C = i.onRecoverableError), i.formState !== void 0 && (O = i.formState)), n = B0(
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
      P0
    ), n.context = L0(null), i = n.current, o = Pe(), o = eu(o), u = la(o), u.callback = null, sa(i, u, o), i = o, n.current.lanes = i, hl(n, i), Cn(n), t[li] = n.current, Pc(t), new Qo(n);
  }, is.version = "19.2.7", is;
}
var ay;
function F3() {
  if (ay) return pf.exports;
  ay = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (e) {
        console.error(e);
      }
  }
  return a(), pf.exports = Q3(), pf.exports;
}
var Yi = F3(), bf = { exports: {} }, xf = {};
var iy;
function J3() {
  if (iy) return xf;
  iy = 1;
  var a = js().__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  return xf.c = function(e) {
    return a.H.useMemoCache(e);
  }, xf;
}
var ly;
function W3() {
  return ly || (ly = 1, bf.exports = J3()), bf.exports;
}
var wt = W3(), Sf = { exports: {} }, wf = {};
var sy;
function I3() {
  if (sy) return wf;
  sy = 1;
  var a = js();
  function e(v, b) {
    return v === b && (v !== 0 || 1 / v === 1 / b) || v !== v && b !== b;
  }
  var l = typeof Object.is == "function" ? Object.is : e, s = a.useState, r = a.useEffect, c = a.useLayoutEffect, f = a.useDebugValue;
  function h(v, b) {
    var T = b(), w = s({ inst: { value: T, getSnapshot: b } }), S = w[0].inst, E = w[1];
    return c(
      function() {
        S.value = T, S.getSnapshot = b, y(S) && E({ inst: S });
      },
      [v, T, b]
    ), r(
      function() {
        return y(S) && E({ inst: S }), v(function() {
          y(S) && E({ inst: S });
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
  return wf.useSyncExternalStore = a.useSyncExternalStore !== void 0 ? a.useSyncExternalStore : g, wf;
}
var oy;
function t4() {
  return oy || (oy = 1, Sf.exports = I3()), Sf.exports;
}
var e4 = t4();
const n4 = X3.useInsertionEffect, a4 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", i4 = a4 ? j.useLayoutEffect : j.useEffect, l4 = n4 || i4, yv = (a) => {
  const e = j.useRef([a, (...l) => e[0](...l)]).current;
  return l4(() => {
    e[0] = a;
  }), e[1];
};
function Yd(a, e) {
  a.indexOf(e) === -1 && a.push(e);
}
function Tr(a, e) {
  const l = a.indexOf(e);
  l > -1 && a.splice(l, 1);
}
const Mn = (a, e, l) => l > e ? e : l < a ? a : l;
let Gd = () => {
};
const Ca = {}, gv = (a) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(a), vv = (a) => typeof a == "object" && a !== null, bv = (a) => /^0[^.\s]+$/u.test(a);
// @__NO_SIDE_EFFECTS__
function xv(a) {
  let e;
  return () => (e === void 0 && (e = a()), e);
}
const rn = /* @__NO_SIDE_EFFECTS__ */ (a) => a, Es = (...a) => a.reduce((e, l) => (s) => l(e(s))), gs = /* @__NO_SIDE_EFFECTS__ */ (a, e, l) => {
  const s = e - a;
  return s ? (l - a) / s : 1;
};
class Xd {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return Yd(this.subscriptions, e), () => Tr(this.subscriptions, e);
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
const Ke = /* @__NO_SIDE_EFFECTS__ */ (a) => a * 1e3, on = /* @__NO_SIDE_EFFECTS__ */ (a) => a / 1e3, Sv = /* @__NO_SIDE_EFFECTS__ */ (a, e) => e ? a * (1e3 / e) : 0, wv = (a, e, l) => (((1 - 3 * l + 3 * e) * a + (3 * l - 6 * e)) * a + 3 * e) * a, s4 = 1e-7, o4 = 12;
function r4(a, e, l, s, r) {
  let c, f, h = 0;
  do
    f = e + (l - e) / 2, c = wv(f, s, r) - a, c > 0 ? l = f : e = f;
  while (Math.abs(c) > s4 && ++h < o4);
  return f;
}
// @__NO_SIDE_EFFECTS__
function As(a, e, l, s) {
  if (a === e && l === s)
    return rn;
  const r = (c) => r4(c, 0, 1, a, l);
  return (c) => c === 0 || c === 1 ? c : wv(r(c), e, s);
}
const Tv = /* @__NO_SIDE_EFFECTS__ */ (a) => (e) => e <= 0.5 ? a(2 * e) / 2 : (2 - a(2 * (1 - e))) / 2, Cv = /* @__NO_SIDE_EFFECTS__ */ (a) => (e) => 1 - a(1 - e), jv = /* @__PURE__ */ As(0.33, 1.53, 0.69, 0.99), Pd = /* @__PURE__ */ Cv(jv), Ev = /* @__PURE__ */ Tv(Pd), Av = (a) => a >= 1 ? 1 : (a *= 2) < 1 ? 0.5 * Pd(a) : 0.5 * (2 - Math.pow(2, -10 * (a - 1))), Kd = (a) => 1 - Math.sin(Math.acos(a)), Mv = /* @__PURE__ */ Cv(Kd), _v = /* @__PURE__ */ Tv(Kd), u4 = /* @__PURE__ */ As(0.42, 0, 1, 1), c4 = /* @__PURE__ */ As(0, 0, 0.58, 1), Dv = /* @__PURE__ */ As(0.42, 0, 0.58, 1), f4 = /* @__NO_SIDE_EFFECTS__ */ (a) => Array.isArray(a) && typeof a[0] != "number", Rv = /* @__NO_SIDE_EFFECTS__ */ (a) => Array.isArray(a) && typeof a[0] == "number", d4 = {
  linear: rn,
  easeIn: u4,
  easeInOut: Dv,
  easeOut: c4,
  circIn: Kd,
  circInOut: _v,
  circOut: Mv,
  backIn: Pd,
  backInOut: Ev,
  backOut: jv,
  anticipate: Av
}, h4 = (a) => typeof a == "string", ry = (a) => {
  if (/* @__PURE__ */ Rv(a)) {
    Gd(a.length === 4);
    const [e, l, s, r] = a;
    return /* @__PURE__ */ As(e, l, s, r);
  } else if (h4(a))
    return d4[a];
  return a;
}, Zd = j.createContext({}), Qd = j.createContext({ strict: !1 }), Fd = j.createContext({
  transformPagePoint: (a) => a,
  isStatic: !1,
  reducedMotion: "never"
}), Ur = /* @__PURE__ */ j.createContext({}), Jo = [
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
function m4(a) {
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
const p4 = 40;
function Nv(a, e) {
  let l = !1, s = !0;
  const r = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, c = () => l = !0, f = Jo.reduce((D, N) => (D[N] = m4(c), D), {}), { setup: h, read: y, resolveKeyframes: p, preUpdate: g, update: v, preRender: b, render: T, postRender: w } = f, S = () => {
    const D = Ca.useManualTiming, N = D ? r.timestamp : performance.now();
    l = !1, D || (r.delta = s ? 1e3 / 60 : Math.max(Math.min(N - r.timestamp, p4), 1)), r.timestamp = N, r.isProcessing = !0, h.process(r), y.process(r), p.process(r), g.process(r), v.process(r), b.process(r), T.process(r), w.process(r), r.isProcessing = !1, l && e && (s = !1, a(S));
  }, E = () => {
    l = !0, s = !0, r.isProcessing || a(S);
  };
  return { schedule: Jo.reduce((D, N) => {
    const V = f[N];
    return D[N] = (z, A = !1, H = !1) => (l || E(), V.schedule(z, A, H)), D;
  }, {}), cancel: (D) => {
    for (let N = 0; N < Jo.length; N++)
      f[Jo[N]].cancel(D);
  }, state: r, steps: f };
}
const { schedule: Xt, cancel: ja, state: Te, steps: Tf } = /* @__PURE__ */ Nv(typeof requestAnimationFrame < "u" ? requestAnimationFrame : rn, !0);
let hr;
function y4() {
  hr = void 0;
}
const _e = {
  now: () => (hr === void 0 && _e.set(Te.isProcessing || Ca.useManualTiming ? Te.timestamp : performance.now()), hr),
  set: (a) => {
    hr = a, queueMicrotask(y4);
  }
}, Ov = (a) => (e) => typeof e == "string" && e.startsWith(a), zv = /* @__PURE__ */ Ov("--"), g4 = /* @__PURE__ */ Ov("var(--"), Jd = (a) => g4(a) ? v4.test(a.split("/*")[0].trim()) : !1, v4 = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function uy(a) {
  return typeof a != "string" ? !1 : a.split("/*")[0].includes("var(--");
}
const al = {
  test: (a) => typeof a == "number",
  parse: parseFloat,
  transform: (a) => a
}, vs = {
  ...al,
  transform: (a) => Mn(0, 1, a)
}, Wo = {
  ...al,
  default: 1
}, ds = (a) => Math.round(a * 1e5) / 1e5, Wd = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function b4(a) {
  return a == null;
}
const x4 = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Id = (a, e) => (l) => !!(typeof l == "string" && x4.test(l) && l.startsWith(a) || e && !b4(l) && Object.prototype.hasOwnProperty.call(l, e)), Bv = (a, e, l) => (s) => {
  if (typeof s != "string")
    return s;
  const [r, c, f, h] = s.match(Wd);
  return {
    [a]: parseFloat(r),
    [e]: parseFloat(c),
    [l]: parseFloat(f),
    alpha: h !== void 0 ? parseFloat(h) : 1
  };
}, S4 = (a) => Mn(0, 255, a), Cf = {
  ...al,
  transform: (a) => Math.round(S4(a))
}, ti = {
  test: /* @__PURE__ */ Id("rgb", "red"),
  parse: /* @__PURE__ */ Bv("red", "green", "blue"),
  transform: ({ red: a, green: e, blue: l, alpha: s = 1 }) => "rgba(" + Cf.transform(a) + ", " + Cf.transform(e) + ", " + Cf.transform(l) + ", " + ds(vs.transform(s)) + ")"
};
function w4(a) {
  let e = "", l = "", s = "", r = "";
  return a.length > 5 ? (e = a.substring(1, 3), l = a.substring(3, 5), s = a.substring(5, 7), r = a.substring(7, 9)) : (e = a.substring(1, 2), l = a.substring(2, 3), s = a.substring(3, 4), r = a.substring(4, 5), e += e, l += l, s += s, r += r), {
    red: parseInt(e, 16),
    green: parseInt(l, 16),
    blue: parseInt(s, 16),
    alpha: r ? parseInt(r, 16) / 255 : 1
  };
}
const ad = {
  test: /* @__PURE__ */ Id("#"),
  parse: w4,
  transform: ti.transform
}, Ms = /* @__NO_SIDE_EFFECTS__ */ (a) => ({
  test: (e) => typeof e == "string" && e.endsWith(a) && e.split(" ").length === 1,
  parse: parseFloat,
  transform: (e) => `${e}${a}`
}), Kn = /* @__PURE__ */ Ms("deg"), An = /* @__PURE__ */ Ms("%"), ct = /* @__PURE__ */ Ms("px"), T4 = /* @__PURE__ */ Ms("vh"), C4 = /* @__PURE__ */ Ms("vw"), cy = {
  ...An,
  parse: (a) => An.parse(a) / 100,
  transform: (a) => An.transform(a * 100)
}, Xi = {
  test: /* @__PURE__ */ Id("hsl", "hue"),
  parse: /* @__PURE__ */ Bv("hue", "saturation", "lightness"),
  transform: ({ hue: a, saturation: e, lightness: l, alpha: s = 1 }) => "hsla(" + Math.round(a) + ", " + An.transform(ds(e)) + ", " + An.transform(ds(l)) + ", " + ds(vs.transform(s)) + ")"
}, fe = {
  test: (a) => ti.test(a) || ad.test(a) || Xi.test(a),
  parse: (a) => ti.test(a) ? ti.parse(a) : Xi.test(a) ? Xi.parse(a) : ad.parse(a),
  transform: (a) => typeof a == "string" ? a : a.hasOwnProperty("red") ? ti.transform(a) : Xi.transform(a),
  getAnimatableNone: (a) => {
    const e = fe.parse(a);
    return e.alpha = 0, fe.transform(e);
  }
}, j4 = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function E4(a) {
  return isNaN(a) && typeof a == "string" && (a.match(Wd)?.length || 0) + (a.match(j4)?.length || 0) > 0;
}
const Lv = "number", Vv = "color", A4 = "var", M4 = "var(", fy = "${}", _4 = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Ii(a) {
  const e = a.toString(), l = [], s = {
    color: [],
    number: [],
    var: []
  }, r = [];
  let c = 0;
  const h = e.replace(_4, (y) => (fe.test(y) ? (s.color.push(c), r.push(Vv), l.push(fe.parse(y))) : y.startsWith(M4) ? (s.var.push(c), r.push(A4), l.push(y)) : (s.number.push(c), r.push(Lv), l.push(parseFloat(y))), ++c, fy)).split(fy);
  return { values: l, split: h, indexes: s, types: r };
}
function D4(a) {
  return Ii(a).values;
}
function kv({ split: a, types: e }) {
  const l = a.length;
  return (s) => {
    let r = "";
    for (let c = 0; c < l; c++)
      if (r += a[c], s[c] !== void 0) {
        const f = e[c];
        f === Lv ? r += ds(s[c]) : f === Vv ? r += fe.transform(s[c]) : r += s[c];
      }
    return r;
  };
}
function R4(a) {
  return kv(Ii(a));
}
const N4 = (a) => typeof a == "number" ? 0 : fe.test(a) ? fe.getAnimatableNone(a) : a, O4 = (a, e) => typeof a == "number" ? e?.trim().endsWith("/") ? a : 0 : N4(a);
function z4(a) {
  const e = Ii(a);
  return kv(e)(e.values.map((s, r) => O4(s, e.split[r])));
}
const gn = {
  test: E4,
  parse: D4,
  createTransformer: R4,
  getAnimatableNone: z4
};
function jf(a, e, l) {
  return l < 0 && (l += 1), l > 1 && (l -= 1), l < 1 / 6 ? a + (e - a) * 6 * l : l < 1 / 2 ? e : l < 2 / 3 ? a + (e - a) * (2 / 3 - l) * 6 : a;
}
function B4({ hue: a, saturation: e, lightness: l, alpha: s }) {
  a /= 360, e /= 100, l /= 100;
  let r = 0, c = 0, f = 0;
  if (!e)
    r = c = f = l;
  else {
    const h = l < 0.5 ? l * (1 + e) : l + e - l * e, y = 2 * l - h;
    r = jf(y, h, a + 1 / 3), c = jf(y, h, a), f = jf(y, h, a - 1 / 3);
  }
  return {
    red: Math.round(r * 255),
    green: Math.round(c * 255),
    blue: Math.round(f * 255),
    alpha: s
  };
}
function Cr(a, e) {
  return (l) => l > 0 ? e : a;
}
const Gt = (a, e, l) => a + (e - a) * l, Ef = (a, e, l) => {
  const s = a * a, r = l * (e * e - s) + s;
  return r < 0 ? 0 : Math.sqrt(r);
}, L4 = [ad, ti, Xi], V4 = (a) => L4.find((e) => e.test(a));
function dy(a) {
  const e = V4(a);
  if (!e)
    return !1;
  let l = e.parse(a);
  return e === Xi && (l = B4(l)), l;
}
const hy = (a, e) => {
  const l = dy(a), s = dy(e);
  if (!l || !s)
    return Cr(a, e);
  const r = { ...l };
  return (c) => (r.red = Ef(l.red, s.red, c), r.green = Ef(l.green, s.green, c), r.blue = Ef(l.blue, s.blue, c), r.alpha = Gt(l.alpha, s.alpha, c), ti.transform(r));
}, id = /* @__PURE__ */ new Set(["none", "hidden"]);
function k4(a, e) {
  return id.has(a) ? (l) => l <= 0 ? a : e : (l) => l >= 1 ? e : a;
}
function U4(a, e) {
  return (l) => Gt(a, e, l);
}
function th(a) {
  return typeof a == "number" ? U4 : typeof a == "string" ? Jd(a) ? Cr : fe.test(a) ? hy : q4 : Array.isArray(a) ? Uv : typeof a == "object" ? fe.test(a) ? hy : H4 : Cr;
}
function Uv(a, e) {
  const l = [...a], s = l.length, r = a.map((c, f) => th(c)(c, e[f]));
  return (c) => {
    for (let f = 0; f < s; f++)
      l[f] = r[f](c);
    return l;
  };
}
function H4(a, e) {
  const l = { ...a, ...e }, s = {};
  for (const r in l)
    a[r] !== void 0 && e[r] !== void 0 && (s[r] = th(a[r])(a[r], e[r]));
  return (r) => {
    for (const c in s)
      l[c] = s[c](r);
    return l;
  };
}
function $4(a, e) {
  const l = [], s = { color: 0, var: 0, number: 0 };
  for (let r = 0; r < e.values.length; r++) {
    const c = e.types[r], f = a.indexes[c][s[c]], h = a.values[f] ?? 0;
    l[r] = h, s[c]++;
  }
  return l;
}
const q4 = (a, e) => {
  const l = gn.createTransformer(e), s = Ii(a), r = Ii(e);
  return s.indexes.var.length === r.indexes.var.length && s.indexes.color.length === r.indexes.color.length && s.indexes.number.length >= r.indexes.number.length ? id.has(a) && !r.values.length || id.has(e) && !s.values.length ? k4(a, e) : Es(Uv($4(s, r), r.values), l) : Cr(a, e);
};
function Hv(a, e, l) {
  return typeof a == "number" && typeof e == "number" && typeof l == "number" ? Gt(a, e, l) : th(a)(a, e);
}
const Y4 = (a) => {
  const e = ({ timestamp: l }) => a(l);
  return {
    start: (l = !0) => Xt.update(e, l),
    stop: () => ja(e),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Te.isProcessing ? Te.timestamp : _e.now()
  };
}, $v = (a, e, l = 10) => {
  let s = "";
  const r = Math.max(Math.round(e / l), 2);
  for (let c = 0; c < r; c++)
    s += Math.round(a(c / (r - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${s.substring(0, s.length - 2)})`;
}, jr = 2e4;
function eh(a) {
  let e = 0;
  const l = 50;
  let s = a.next(e);
  for (; !s.done && e < jr; )
    e += l, s = a.next(e);
  return e >= jr ? 1 / 0 : e;
}
function G4(a, e = 100, l) {
  const s = l({ ...a, keyframes: [0, e] }), r = Math.min(eh(s), jr);
  return {
    type: "keyframes",
    ease: (c) => s.next(r * c).value / e,
    duration: /* @__PURE__ */ on(r)
  };
}
const ne = {
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
function ld(a, e) {
  return a * Math.sqrt(1 - e * e);
}
const X4 = 12;
function P4(a, e, l) {
  let s = l;
  for (let r = 1; r < X4; r++)
    s = s - a(s) / e(s);
  return s;
}
const Af = 1e-3;
function K4({ duration: a = ne.duration, bounce: e = ne.bounce, velocity: l = ne.velocity, mass: s = ne.mass }) {
  let r, c, f = 1 - e;
  f = Mn(ne.minDamping, ne.maxDamping, f), a = Mn(ne.minDuration, ne.maxDuration, /* @__PURE__ */ on(a)), f < 1 ? (r = (p) => {
    const g = p * f, v = g * a, b = g - l, T = ld(p, f), w = Math.exp(-v);
    return Af - b / T * w;
  }, c = (p) => {
    const v = p * f * a, b = v * l + l, T = Math.pow(f, 2) * Math.pow(p, 2) * a, w = Math.exp(-v), S = ld(Math.pow(p, 2), f);
    return (-r(p) + Af > 0 ? -1 : 1) * ((b - T) * w) / S;
  }) : (r = (p) => {
    const g = Math.exp(-p * a), v = (p - l) * a + 1;
    return -Af + g * v;
  }, c = (p) => {
    const g = Math.exp(-p * a), v = (l - p) * (a * a);
    return g * v;
  });
  const h = 5 / a, y = P4(r, c, h);
  if (a = /* @__PURE__ */ Ke(a), isNaN(y))
    return {
      stiffness: ne.stiffness,
      damping: ne.damping,
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
const Z4 = ["duration", "bounce"], Q4 = ["stiffness", "damping", "mass"];
function my(a, e) {
  return e.some((l) => a[l] !== void 0);
}
function F4(a) {
  let e = {
    velocity: ne.velocity,
    stiffness: ne.stiffness,
    damping: ne.damping,
    mass: ne.mass,
    isResolvedFromDuration: !1,
    ...a
  };
  if (!my(a, Q4) && my(a, Z4))
    if (e.velocity = 0, a.visualDuration) {
      const l = a.visualDuration, s = 2 * Math.PI / (l * 1.2), r = s * s, c = 2 * Mn(0.05, 1, 1 - (a.bounce || 0)) * Math.sqrt(r);
      e = {
        ...e,
        mass: ne.mass,
        stiffness: r,
        damping: c
      };
    } else {
      const l = K4({ ...a, velocity: 0 });
      e = {
        ...e,
        ...l,
        mass: ne.mass
      }, e.isResolvedFromDuration = !0;
    }
  return e;
}
function Er(a = ne.visualDuration, e = ne.bounce) {
  const l = typeof a != "object" ? {
    visualDuration: a,
    keyframes: [0, 1],
    bounce: e
  } : a;
  let { restSpeed: s, restDelta: r } = l;
  const c = l.keyframes[0], f = l.keyframes[l.keyframes.length - 1], h = { done: !1, value: c }, { stiffness: y, damping: p, mass: g, duration: v, velocity: b, isResolvedFromDuration: T } = F4({
    ...l,
    velocity: -/* @__PURE__ */ on(l.velocity || 0)
  }), w = b || 0, S = p / (2 * Math.sqrt(y * g)), E = f - c, M = /* @__PURE__ */ on(Math.sqrt(y / g)), R = Math.abs(E) < 5;
  s || (s = R ? ne.restSpeed.granular : ne.restSpeed.default), r || (r = R ? ne.restDelta.granular : ne.restDelta.default);
  let D, N, V, z, A, H;
  if (S < 1)
    V = ld(M, S), z = (w + S * M * E) / V, D = (K) => {
      const nt = Math.exp(-S * M * K);
      return f - nt * (z * Math.sin(V * K) + E * Math.cos(V * K));
    }, A = S * M * z + E * V, H = S * M * E - z * V, N = (K) => Math.exp(-S * M * K) * (A * Math.sin(V * K) + H * Math.cos(V * K));
  else if (S === 1) {
    D = (nt) => f - Math.exp(-M * nt) * (E + (w + M * E) * nt);
    const K = w + M * E;
    N = (nt) => Math.exp(-M * nt) * (M * K * nt - w);
  } else {
    const K = M * Math.sqrt(S * S - 1);
    D = (Z) => {
      const it = Math.exp(-S * M * Z), L = Math.min(K * Z, 300);
      return f - it * ((w + S * M * E) * Math.sinh(L) + K * E * Math.cosh(L)) / K;
    };
    const nt = (w + S * M * E) / K, at = S * M * nt - E * K, tt = S * M * E - nt * K;
    N = (Z) => {
      const it = Math.exp(-S * M * Z), L = Math.min(K * Z, 300);
      return it * (at * Math.sinh(L) + tt * Math.cosh(L));
    };
  }
  const G = {
    calculatedDuration: T && v || null,
    velocity: (K) => /* @__PURE__ */ Ke(N(K)),
    next: (K) => {
      if (!T && S < 1) {
        const at = Math.exp(-S * M * K), tt = Math.sin(V * K), Z = Math.cos(V * K), it = f - at * (z * tt + E * Z), L = /* @__PURE__ */ Ke(at * (A * tt + H * Z));
        return h.done = Math.abs(L) <= s && Math.abs(f - it) <= r, h.value = h.done ? f : it, h;
      }
      const nt = D(K);
      if (T)
        h.done = K >= v;
      else {
        const at = /* @__PURE__ */ Ke(N(K));
        h.done = Math.abs(at) <= s && Math.abs(f - nt) <= r;
      }
      return h.value = h.done ? f : nt, h;
    },
    toString: () => {
      const K = Math.min(eh(G), jr), nt = $v((at) => G.next(K * at).value, K, 30);
      return K + "ms " + nt;
    },
    toTransition: () => {
    }
  };
  return G;
}
Er.applyToOptions = (a) => {
  const e = G4(a, 100, Er);
  return a.ease = e.ease, a.duration = /* @__PURE__ */ Ke(e.duration), a.type = "keyframes", a;
};
const J4 = 5;
function qv(a, e, l) {
  const s = Math.max(e - J4, 0);
  return /* @__PURE__ */ Sv(l - a(s), e - s);
}
function sd({ keyframes: a, velocity: e = 0, power: l = 0.8, timeConstant: s = 325, bounceDamping: r = 10, bounceStiffness: c = 500, modifyTarget: f, min: h, max: y, restDelta: p = 0.5, restSpeed: g }) {
  const v = a[0], b = {
    done: !1,
    value: v
  }, T = (H) => h !== void 0 && H < h || y !== void 0 && H > y, w = (H) => h === void 0 ? y : y === void 0 || Math.abs(h - H) < Math.abs(y - H) ? h : y;
  let S = l * e;
  const E = v + S, M = f === void 0 ? E : f(E);
  M !== E && (S = M - v);
  const R = (H) => -S * Math.exp(-H / s), D = (H) => M + R(H), N = (H) => {
    const G = R(H), K = D(H);
    b.done = Math.abs(G) <= p, b.value = b.done ? M : K;
  };
  let V, z;
  const A = (H) => {
    T(b.value) && (V = H, z = Er({
      keyframes: [b.value, w(b.value)],
      velocity: qv(D, H, b.value),
      // TODO: This should be passing * 1000
      damping: r,
      stiffness: c,
      restDelta: p,
      restSpeed: g
    }));
  };
  return A(0), {
    calculatedDuration: null,
    next: (H) => {
      let G = !1;
      return !z && V === void 0 && (G = !0, N(H), A(H)), V !== void 0 && H >= V ? z.next(H - V) : (!G && N(H), b);
    }
  };
}
function W4(a, e, l) {
  const s = [], r = l || Ca.mix || Hv, c = a.length - 1;
  for (let f = 0; f < c; f++) {
    let h = r(a[f], a[f + 1]);
    if (e) {
      const y = Array.isArray(e) ? e[f] || rn : e;
      h = Es(y, h);
    }
    s.push(h);
  }
  return s;
}
function I4(a, e, { clamp: l = !0, ease: s, mixer: r } = {}) {
  const c = a.length;
  if (Gd(c === e.length), c === 1)
    return () => e[0];
  if (c === 2 && e[0] === e[1])
    return () => e[1];
  const f = a[0] === a[1];
  a[0] > a[c - 1] && (a = [...a].reverse(), e = [...e].reverse());
  const h = W4(e, s, r), y = h.length, p = (g) => {
    if (f && g < a[0])
      return e[0];
    let v = 0;
    if (y > 1)
      for (; v < a.length - 2 && !(g < a[v + 1]); v++)
        ;
    const b = /* @__PURE__ */ gs(a[v], a[v + 1], g);
    return h[v](b);
  };
  return l ? (g) => p(Mn(a[0], a[c - 1], g)) : p;
}
function t5(a, e) {
  const l = a[a.length - 1];
  for (let s = 1; s <= e; s++) {
    const r = /* @__PURE__ */ gs(0, e, s);
    a.push(Gt(l, 1, r));
  }
}
function e5(a) {
  const e = [0];
  return t5(e, a.length - 1), e;
}
function n5(a, e) {
  return a.map((l) => l * e);
}
function a5(a, e) {
  return a.map(() => e || Dv).splice(0, a.length - 1);
}
function hs({ duration: a = 300, keyframes: e, times: l, ease: s = "easeInOut" }) {
  const r = /* @__PURE__ */ f4(s) ? s.map(ry) : ry(s), c = {
    done: !1,
    value: e[0]
  }, f = n5(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    l && l.length === e.length ? l : e5(e),
    a
  ), h = I4(f, e, {
    ease: Array.isArray(r) ? r : a5(e, r)
  });
  return {
    calculatedDuration: a,
    next: (y) => (c.value = h(y), c.done = y >= a, c)
  };
}
const i5 = (a) => a !== null;
function Hr(a, { repeat: e, repeatType: l = "loop" }, s, r = 1) {
  const c = a.filter(i5), h = r < 0 || e && l !== "loop" && e % 2 === 1 ? 0 : c.length - 1;
  return !h || s === void 0 ? c[h] : s;
}
const l5 = {
  decay: sd,
  inertia: sd,
  tween: hs,
  keyframes: hs,
  spring: Er
};
function Yv(a) {
  typeof a.type == "string" && (a.type = l5[a.type]);
}
class nh {
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
const s5 = (a) => a / 100;
class Ar extends nh {
  constructor(e) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: l } = this.options;
      l && l.updatedAt !== _e.now() && this.tick(_e.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: e } = this;
    Yv(e);
    const { type: l = hs, repeat: s = 0, repeatDelay: r = 0, repeatType: c, velocity: f = 0 } = e;
    let { keyframes: h } = e;
    const y = l || hs;
    y !== hs && typeof h[0] != "number" && (this.mixKeyframes = Es(s5, Hv(h[0], h[1])), h = [0, 100]);
    const p = y({ ...e, keyframes: h });
    c === "mirror" && (this.mirroredGenerator = y({
      ...e,
      keyframes: [...h].reverse(),
      velocity: -f
    })), p.calculatedDuration === null && (p.calculatedDuration = eh(p));
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
    const { delay: p = 0, keyframes: g, repeat: v, repeatType: b, repeatDelay: T, type: w, onUpdate: S, finalKeyframe: E } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - r / this.speed, this.startTime)), l ? this.currentTime = e : this.updateTime(e);
    const M = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), R = this.playbackSpeed >= 0 ? M < 0 : M > r;
    this.currentTime = Math.max(M, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = r);
    let D = this.currentTime, N = s;
    if (v) {
      const H = Math.min(this.currentTime, r) / h;
      let G = Math.floor(H), K = H % 1;
      !K && H >= 1 && (K = 1), K === 1 && G--, G = Math.min(G, v + 1), !!(G % 2) && (b === "reverse" ? (K = 1 - K, T && (K -= T / h)) : b === "mirror" && (N = f)), D = Mn(0, 1, K) * h;
    }
    let V;
    R ? (this.delayState.value = g[0], V = this.delayState) : V = N.next(D), c && !R && (V.value = c(V.value));
    let { done: z } = V;
    !R && y !== null && (z = this.playbackSpeed >= 0 ? this.currentTime >= r : this.currentTime <= 0);
    const A = this.holdTime === null && (this.state === "finished" || this.state === "running" && z);
    return A && w !== sd && (V.value = Hr(g, this.options, E, this.speed)), S && S(V.value), A && this.finish(), V;
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
    return /* @__PURE__ */ on(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ on(e);
  }
  get time() {
    return /* @__PURE__ */ on(this.currentTime);
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
    return qv((s) => this.generator.next(s).value, e, l);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(e) {
    const l = this.playbackSpeed !== e;
    l && this.driver && this.updateTime(_e.now()), this.playbackSpeed = e, l && this.driver && (this.time = /* @__PURE__ */ on(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: e = Y4, startTime: l } = this.options;
    this.driver || (this.driver = e((r) => this.tick(r))), this.options.onPlay?.();
    const s = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime !== null ? this.startTime = s - this.holdTime : this.startTime || (this.startTime = l ?? s), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(_e.now()), this.holdTime = this.currentTime;
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
function o5(a) {
  for (let e = 1; e < a.length; e++)
    a[e] ?? (a[e] = a[e - 1]);
}
const ei = (a) => a * 180 / Math.PI, od = (a) => {
  const e = ei(Math.atan2(a[1], a[0]));
  return rd(e);
}, r5 = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (a) => (Math.abs(a[0]) + Math.abs(a[3])) / 2,
  rotate: od,
  rotateZ: od,
  skewX: (a) => ei(Math.atan(a[1])),
  skewY: (a) => ei(Math.atan(a[2])),
  skew: (a) => (Math.abs(a[1]) + Math.abs(a[2])) / 2
}, rd = (a) => (a = a % 360, a < 0 && (a += 360), a), py = od, yy = (a) => Math.sqrt(a[0] * a[0] + a[1] * a[1]), gy = (a) => Math.sqrt(a[4] * a[4] + a[5] * a[5]), u5 = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: yy,
  scaleY: gy,
  scale: (a) => (yy(a) + gy(a)) / 2,
  rotateX: (a) => rd(ei(Math.atan2(a[6], a[5]))),
  rotateY: (a) => rd(ei(Math.atan2(-a[2], a[0]))),
  rotateZ: py,
  rotate: py,
  skewX: (a) => ei(Math.atan(a[4])),
  skewY: (a) => ei(Math.atan(a[1])),
  skew: (a) => (Math.abs(a[1]) + Math.abs(a[4])) / 2
};
function ud(a) {
  return a.includes("scale") ? 1 : 0;
}
function cd(a, e) {
  if (!a || a === "none")
    return ud(e);
  const l = a.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let s, r;
  if (l)
    s = u5, r = l;
  else {
    const h = a.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    s = r5, r = h;
  }
  if (!r)
    return ud(e);
  const c = s[e], f = r[1].split(",").map(f5);
  return typeof c == "function" ? c(f) : f[c];
}
const c5 = (a, e) => {
  const { transform: l = "none" } = getComputedStyle(a);
  return cd(l, e);
};
function f5(a) {
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
], ll = /* @__PURE__ */ new Set([...il, "pathRotation"]), vy = (a) => a === al || a === ct, d5 = /* @__PURE__ */ new Set(["x", "y", "z"]), h5 = il.filter((a) => !d5.has(a));
function m5(a) {
  const e = [];
  return h5.forEach((l) => {
    const s = a.getValue(l);
    s !== void 0 && (e.push([l, s.get()]), s.set(l.startsWith("scale") ? 1 : 0));
  }), e;
}
const Ta = {
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
  x: (a, { transform: e }) => cd(e, "x"),
  y: (a, { transform: e }) => cd(e, "y")
};
Ta.translateX = Ta.x;
Ta.translateY = Ta.y;
const ai = /* @__PURE__ */ new Set();
let fd = !1, dd = !1, hd = !1;
function Gv() {
  if (dd) {
    const a = Array.from(ai).filter((s) => s.needsMeasurement), e = new Set(a.map((s) => s.element)), l = /* @__PURE__ */ new Map();
    e.forEach((s) => {
      const r = m5(s);
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
  dd = !1, fd = !1, ai.forEach((a) => a.complete(hd)), ai.clear();
}
function Xv() {
  ai.forEach((a) => {
    a.readKeyframes(), a.needsMeasurement && (dd = !0);
  });
}
function p5() {
  hd = !0, Xv(), Gv(), hd = !1;
}
class ah {
  constructor(e, l, s, r, c, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = l, this.name = s, this.motionValue = r, this.element = c, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? (ai.add(this), fd || (fd = !0, Xt.read(Xv), Xt.resolveKeyframes(Gv))) : (this.readKeyframes(), this.complete());
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
    o5(e);
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
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), ai.delete(this);
  }
  cancel() {
    this.state === "scheduled" && (ai.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const y5 = (a) => a.startsWith("--");
function Pv(a, e, l) {
  y5(e) ? a.style.setProperty(e, l) : a.style[e] = l;
}
const g5 = {};
function Kv(a, e) {
  const l = /* @__PURE__ */ xv(a);
  return () => g5[e] ?? l();
}
const v5 = /* @__PURE__ */ Kv(() => window.ScrollTimeline !== void 0, "scrollTimeline"), Zv = /* @__PURE__ */ Kv(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), rs = ([a, e, l, s]) => `cubic-bezier(${a}, ${e}, ${l}, ${s})`, by = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ rs([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ rs([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ rs([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ rs([0.33, 1.53, 0.69, 0.99])
};
function Qv(a, e) {
  if (a)
    return typeof a == "function" ? Zv() ? $v(a, e) : "ease-out" : /* @__PURE__ */ Rv(a) ? rs(a) : Array.isArray(a) ? a.map((l) => Qv(l, e) || by.easeOut) : by[a];
}
function b5(a, e, l, { delay: s = 0, duration: r = 300, repeat: c = 0, repeatType: f = "loop", ease: h = "easeOut", times: y } = {}, p = void 0) {
  const g = {
    [e]: l
  };
  y && (g.offset = y);
  const v = Qv(h, r);
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
function Fv(a) {
  return typeof a == "function" && "applyToOptions" in a;
}
function x5({ type: a, ...e }) {
  return Fv(a) && Zv() ? a.applyToOptions(e) : (e.duration ?? (e.duration = 300), e.ease ?? (e.ease = "easeOut"), e);
}
class Jv extends nh {
  constructor(e) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e)
      return;
    const { element: l, name: s, keyframes: r, pseudoElement: c, allowFlatten: f = !1, finalKeyframe: h, onComplete: y } = e;
    this.isPseudoElement = !!c, this.allowFlatten = f, this.options = e, Gd(typeof e.type != "string");
    const p = x5(e);
    this.animation = b5(l, s, r, p, c), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !c) {
        const g = Hr(r, this.options, h, this.speed);
        this.updateMotionValue && this.updateMotionValue(g), Pv(l, s, g), this.animation.cancel();
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
    return /* @__PURE__ */ on(Number(e));
  }
  get iterationDuration() {
    const { delay: e = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ on(e);
  }
  get time() {
    return /* @__PURE__ */ on(Number(this.animation.currentTime) || 0);
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
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && v5() ? (this.animation.timeline = e, l && (this.animation.rangeStart = l), s && (this.animation.rangeEnd = s), rn) : r(this);
  }
}
const Wv = {
  anticipate: Av,
  backInOut: Ev,
  circInOut: _v
};
function S5(a) {
  return a in Wv;
}
function w5(a) {
  typeof a.ease == "string" && S5(a.ease) && (a.ease = Wv[a.ease]);
}
const Mf = 10;
class T5 extends Jv {
  constructor(e) {
    w5(e), Yv(e), super(e), e.startTime !== void 0 && e.autoplay !== !1 && (this.startTime = e.startTime), this.options = e;
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
    const h = new Ar({
      ...f,
      autoplay: !1
    }), y = Math.max(Mf, _e.now() - this.startTime), p = Mn(0, Mf, y - Mf), g = h.sample(y).value, { name: v } = this.options;
    c && v && Pv(c, v, g), l.setWithVelocity(h.sample(Math.max(0, y - p)).value, g, p), h.stop();
  }
}
const xy = (a, e) => e === "zIndex" ? !1 : !!(typeof a == "number" || Array.isArray(a) || typeof a == "string" && // It's animatable if we have a string
(gn.test(a) || a === "0") && // And it contains numbers and/or colors
!a.startsWith("url("));
function C5(a) {
  const e = a[0];
  if (a.length === 1)
    return !0;
  for (let l = 0; l < a.length; l++)
    if (a[l] !== e)
      return !0;
}
function j5(a, e, l, s) {
  const r = a[0];
  if (r === null)
    return !1;
  if (e === "display" || e === "visibility")
    return !0;
  const c = a[a.length - 1], f = xy(r, e), h = xy(c, e);
  return !f || !h ? !1 : C5(a) || (l === "spring" || Fv(l)) && s;
}
function md(a) {
  a.duration = 0, a.type = "keyframes";
}
const Iv = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform"
  // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
  // or until we implement support for linear() easing.
  // "background-color"
]), E5 = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function A5(a) {
  for (let e = 0; e < a.length; e++)
    if (typeof a[e] == "string" && E5.test(a[e]))
      return !0;
  return !1;
}
const M5 = /* @__PURE__ */ new Set([
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
]), _5 = /* @__PURE__ */ xv(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function D5(a) {
  const { motionValue: e, name: l, repeatDelay: s, repeatType: r, damping: c, type: f, keyframes: h } = a;
  if (!(e?.owner?.current instanceof HTMLElement))
    return !1;
  const { onUpdate: p, transformTemplate: g } = e.owner.getProps();
  return _5() && l && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (Iv.has(l) || M5.has(l) && A5(h)) && (l !== "transform" || !g) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !p && !s && r !== "mirror" && c !== 0 && f !== "inertia";
}
const R5 = 40;
class N5 extends nh {
  constructor({ autoplay: e = !0, delay: l = 0, type: s = "keyframes", repeat: r = 0, repeatDelay: c = 0, repeatType: f = "loop", keyframes: h, name: y, motionValue: p, element: g, ...v }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = _e.now();
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
    }, T = g?.KeyframeResolver || ah;
    this.keyframeResolver = new T(h, (w, S, E) => this.onKeyframesResolved(w, S, b, !E), y, p, g), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(e, l, s, r) {
    this.keyframeResolver = void 0;
    const { name: c, type: f, velocity: h, delay: y, isHandoff: p, onUpdate: g } = s;
    this.resolvedAt = _e.now();
    let v = !0;
    j5(e, c, f, h) || (v = !1, (Ca.instantAnimations || !y) && g?.(Hr(e, s, l)), e[0] = e[e.length - 1], md(s), s.repeat = 0);
    const T = {
      startTime: r ? this.resolvedAt ? this.resolvedAt - this.createdAt > R5 ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: l,
      ...s,
      keyframes: e
    }, w = v && !p && D5(T), S = T.motionValue?.owner?.current;
    let E;
    if (w)
      try {
        E = new T5({
          ...T,
          element: S
        });
      } catch {
        E = new Ar(T);
      }
    else
      E = new Ar(T);
    E.finished.then(() => {
      this.notifyFinished();
    }).catch(rn), this.pendingTimeline && (this.stopTimeline = E.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = E;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(e, l) {
    return this.finished.finally(e).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), p5()), this._animation;
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
function t2(a, e, l, s = 0, r = 1) {
  const c = Array.from(a).sort((p, g) => p.sortNodePosition(g)).indexOf(e), f = a.size, h = (f - 1) * s;
  return typeof l == "function" ? l(c, f) : r === 1 ? c * s : h - c * s;
}
const Sy = 30, O5 = (a) => !isNaN(parseFloat(a));
class z5 {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(e, l = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (s) => {
      const r = _e.now();
      if (this.updatedAt !== r && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(s), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const c of this.dependents)
          c.dirty();
    }, this.hasAnimated = !1, this.setCurrent(e), this.owner = l.owner;
  }
  setCurrent(e) {
    this.current = e, this.updatedAt = _e.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = O5(this.current));
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
    this.events[e] || (this.events[e] = new Xd());
    const s = this.events[e].add(l);
    return e === "change" ? () => {
      s(), Xt.read(() => {
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
    const e = _e.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > Sy)
      return 0;
    const l = Math.min(this.updatedAt - this.prevUpdatedAt, Sy);
    return /* @__PURE__ */ Sv(parseFloat(this.current) - parseFloat(this.prevFrameValue), l);
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
  return new z5(a, e);
}
function e2(a, e) {
  if (a?.inherit && e) {
    const { inherit: l, ...s } = a;
    return { ...e, ...s };
  }
  return a;
}
function ih(a, e) {
  const l = a?.[e] ?? a?.default ?? a;
  return l !== a ? e2(l, a) : l;
}
const B5 = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, L5 = (a) => ({
  type: "spring",
  stiffness: 550,
  damping: a === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), V5 = {
  type: "keyframes",
  duration: 0.8
}, k5 = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, U5 = (a, { keyframes: e }) => e.length > 2 ? V5 : ll.has(a) ? a.startsWith("scale") ? L5(e[1]) : B5 : k5, H5 = /* @__PURE__ */ new Set([
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
function $5(a) {
  for (const e in a)
    if (!H5.has(e))
      return !0;
  return !1;
}
const lh = (a, e, l, s = {}, r, c) => (f) => {
  const h = ih(s, a) || {}, y = h.delay || s.delay || 0;
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
  $5(h) || Object.assign(g, U5(a, g)), g.duration && (g.duration = /* @__PURE__ */ Ke(g.duration)), g.repeatDelay && (g.repeatDelay = /* @__PURE__ */ Ke(g.repeatDelay)), g.from !== void 0 && (g.keyframes[0] = g.from);
  let v = !1;
  if ((g.type === !1 || g.duration === 0 && !g.repeatDelay) && (md(g), g.delay === 0 && (v = !0)), (Ca.instantAnimations || Ca.skipAnimations || r?.shouldSkipAnimations || h.skipAnimations) && (v = !0, md(g), g.delay = 0), g.allowFlatten = !h.type && !h.ease, v && !c && e.get() !== void 0) {
    const b = Hr(g.keyframes, h);
    if (b !== void 0) {
      Xt.update(() => {
        g.onUpdate(b), g.onComplete();
      });
      return;
    }
  }
  return h.isSync ? new Ar(g) : new N5(g);
}, q5 = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function Y5(a) {
  const e = q5.exec(a);
  if (!e)
    return [,];
  const [, l, s, r] = e;
  return [`--${l ?? s}`, r];
}
function n2(a, e, l = 1) {
  const [s, r] = Y5(a);
  if (!s)
    return;
  const c = window.getComputedStyle(e).getPropertyValue(s);
  if (c) {
    const f = c.trim();
    return gv(f) ? parseFloat(f) : f;
  }
  return Jd(r) ? n2(r, e, l + 1) : r;
}
function wy(a) {
  const e = [{}, {}];
  return a?.values.forEach((l, s) => {
    e[0][s] = l.get(), e[1][s] = l.getVelocity();
  }), e;
}
function sh(a, e, l, s) {
  if (typeof e == "function") {
    const [r, c] = wy(s);
    e = e(l !== void 0 ? l : a.custom, r, c);
  }
  if (typeof e == "string" && (e = a.variants && a.variants[e]), typeof e == "function") {
    const [r, c] = wy(s);
    e = e(l !== void 0 ? l : a.custom, r, c);
  }
  return e;
}
function ii(a, e, l) {
  const s = a.getProps();
  return sh(s, e, l !== void 0 ? l : s.custom, a);
}
const a2 = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...il
]), pd = (a) => Array.isArray(a);
function G5(a, e, l) {
  a.hasValue(e) ? a.getValue(e).set(l) : a.addValue(e, tl(l));
}
function X5(a) {
  return pd(a) ? a[a.length - 1] || 0 : a;
}
function P5(a, e) {
  const l = ii(a, e);
  let { transitionEnd: s = {}, transition: r = {}, ...c } = l || {};
  c = { ...c, ...s };
  for (const f in c) {
    const h = X5(c[f]);
    G5(a, f, h);
  }
}
const Ce = (a) => !!(a && a.getVelocity);
function K5(a) {
  return !!(Ce(a) && a.add);
}
function yd(a, e) {
  const l = a.getValue("willChange");
  if (K5(l))
    return l.add(e);
  if (!l && Ca.WillChange) {
    const s = new Ca.WillChange("auto");
    a.addValue("willChange", s), s.add(e);
  }
}
function oh(a) {
  return a.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
const Z5 = "framerAppearId", i2 = "data-" + oh(Z5);
function l2(a) {
  return a.props[i2];
}
function Q5({ protectedKeys: a, needsAnimating: e }, l) {
  const s = a.hasOwnProperty(l) && e[l] !== !0;
  return e[l] = !1, s;
}
function s2(a, e, { delay: l = 0, transitionOverride: s, type: r } = {}) {
  let { transition: c, transitionEnd: f, ...h } = e;
  const y = a.getDefaultTransition();
  c = c ? e2(c, y) : y;
  const p = c?.reduceMotion, g = c?.skipAnimations;
  s && (c = s);
  const v = [], b = r && a.animationState && a.animationState.getState()[r], T = c?.path;
  T && T.animateVisualElement(a, h, c, l, v);
  for (const w in h) {
    const S = a.getValue(w, a.latestValues[w] ?? null), E = h[w];
    if (E === void 0 || b && Q5(b, w))
      continue;
    const M = {
      delay: l,
      ...ih(c || {}, w)
    };
    g && (M.skipAnimations = !0);
    const R = S.get();
    if (R !== void 0 && !S.isAnimating() && !Array.isArray(E) && E === R && !M.velocity) {
      Xt.update(() => S.set(E));
      continue;
    }
    let D = !1;
    if (window.MotionHandoffAnimation) {
      const z = l2(a);
      if (z) {
        const A = window.MotionHandoffAnimation(z, w, Xt);
        A !== null && (M.startTime = A, D = !0);
      }
    }
    yd(a, w);
    const N = p ?? a.shouldReduceMotion;
    S.start(lh(w, S, E, N && a2.has(w) ? { type: !1 } : M, a, D));
    const V = S.animation;
    V && v.push(V);
  }
  if (f) {
    const w = () => Xt.update(() => {
      f && P5(a, f);
    });
    v.length ? Promise.all(v).then(w) : w();
  }
  return v;
}
function gd(a, e, l = {}) {
  const s = ii(a, e, l.type === "exit" ? a.presenceContext?.custom : void 0);
  let { transition: r = a.getDefaultTransition() || {} } = s || {};
  l.transitionOverride && (r = l.transitionOverride);
  const c = s ? () => Promise.all(s2(a, s, l)) : () => Promise.resolve(), f = a.variantChildren && a.variantChildren.size ? (y = 0) => {
    const { delayChildren: p = 0, staggerChildren: g, staggerDirection: v } = r;
    return F5(a, e, y, p, g, v, l);
  } : () => Promise.resolve(), { when: h } = r;
  if (h) {
    const [y, p] = h === "beforeChildren" ? [c, f] : [f, c];
    return y().then(() => p());
  } else
    return Promise.all([c(), f(l.delay)]);
}
function F5(a, e, l = 0, s = 0, r = 0, c = 1, f) {
  const h = [];
  for (const y of a.variantChildren)
    y.notify("AnimationStart", e), h.push(gd(y, e, {
      ...f,
      delay: l + (typeof s == "function" ? 0 : s) + t2(a.variantChildren, y, s, r, c)
    }).then(() => y.notify("AnimationComplete", e)));
  return Promise.all(h);
}
function J5(a, e, l = {}) {
  a.notify("AnimationStart", e);
  let s;
  if (Array.isArray(e)) {
    const r = e.map((c) => gd(a, c, l));
    s = Promise.all(r);
  } else if (typeof e == "string")
    s = gd(a, e, l);
  else {
    const r = typeof e == "function" ? ii(a, e, l.custom) : e;
    s = Promise.all(s2(a, r, l));
  }
  return s.then(() => {
    a.notify("AnimationComplete", e);
  });
}
const W5 = {
  test: (a) => a === "auto",
  parse: (a) => a
}, o2 = (a) => (e) => e.test(a), r2 = [al, ct, An, Kn, C4, T4, W5], Ty = (a) => r2.find(o2(a));
function I5(a) {
  return typeof a == "number" ? a === 0 : a !== null ? a === "none" || a === "0" || bv(a) : !0;
}
const tw = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function ew(a) {
  const [e, l] = a.slice(0, -1).split("(");
  if (e === "drop-shadow")
    return a;
  const [s] = l.match(Wd) || [];
  if (!s)
    return a;
  const r = l.replace(s, "");
  let c = tw.has(e) ? 1 : 0;
  return s !== l && (c *= 100), e + "(" + c + r + ")";
}
const nw = /\b([a-z-]*)\(.*?\)/gu, vd = {
  ...gn,
  getAnimatableNone: (a) => {
    const e = a.match(nw);
    return e ? e.map(ew).join(" ") : a;
  }
}, bd = {
  ...gn,
  getAnimatableNone: (a) => {
    const e = gn.parse(a);
    return gn.createTransformer(a)(e.map((s) => typeof s == "number" ? 0 : typeof s == "object" ? { ...s, alpha: 1 } : s));
  }
}, Cy = {
  ...al,
  transform: Math.round
}, aw = {
  rotate: Kn,
  /**
   * Internal channel for `transition.path` orientToPath. Composed onto
   * `rotate` at the transform-build sites so the user's `rotate` is
   * never read or overwritten. Not part of `transformPropOrder`.
   */
  pathRotation: Kn,
  rotateX: Kn,
  rotateY: Kn,
  rotateZ: Kn,
  scale: Wo,
  scaleX: Wo,
  scaleY: Wo,
  scaleZ: Wo,
  skew: Kn,
  skewX: Kn,
  skewY: Kn,
  distance: ct,
  translateX: ct,
  translateY: ct,
  translateZ: ct,
  x: ct,
  y: ct,
  z: ct,
  perspective: ct,
  transformPerspective: ct,
  opacity: vs,
  originX: cy,
  originY: cy,
  originZ: ct
}, Mr = {
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
  ...aw,
  zIndex: Cy,
  // SVG
  fillOpacity: vs,
  strokeOpacity: vs,
  numOctaves: Cy
}, iw = {
  ...Mr,
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
  filter: vd,
  WebkitFilter: vd,
  mask: bd,
  WebkitMask: bd
}, u2 = (a) => iw[a], lw = /* @__PURE__ */ new Set([vd, bd]);
function c2(a, e) {
  let l = u2(a);
  return lw.has(l) || (l = gn), l.getAnimatableNone ? l.getAnimatableNone(e) : void 0;
}
const sw = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function ow(a, e, l) {
  let s = 0, r;
  for (; s < a.length && !r; ) {
    const c = a[s];
    typeof c == "string" && !sw.has(c) && Ii(c).values.length && (r = a[s]), s++;
  }
  if (r && l)
    for (const c of e)
      a[c] = c2(l, r);
}
class rw extends ah {
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
      if (typeof v == "string" && (v = v.trim(), Jd(v))) {
        const b = n2(v, l.current);
        b !== void 0 && (e[g] = b), g === e.length - 1 && (this.finalKeyframe = v);
      }
    }
    if (this.resolveNoneKeyframes(), !a2.has(s) || e.length !== 2)
      return;
    const [r, c] = e, f = Ty(r), h = Ty(c), y = uy(r), p = uy(c);
    if (y !== p && Ta[s]) {
      this.needsMeasurement = !0;
      return;
    }
    if (f !== h)
      if (vy(f) && vy(h))
        for (let g = 0; g < e.length; g++) {
          const v = e[g];
          typeof v == "string" && (e[g] = parseFloat(v));
        }
      else Ta[s] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: e, name: l } = this, s = [];
    for (let r = 0; r < e.length; r++)
      (e[r] === null || I5(e[r])) && s.push(r);
    s.length && ow(e, s, l);
  }
  measureInitialState() {
    const { element: e, unresolvedKeyframes: l, name: s } = this;
    if (!e || !e.current)
      return;
    s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Ta[s](e.measureViewportBox(), window.getComputedStyle(e.current)), l[0] = this.measuredOrigin;
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
    s[c] = Ta[l](e.measureViewportBox(), window.getComputedStyle(e.current)), f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f), this.removedTransforms?.length && this.removedTransforms.forEach(([h, y]) => {
      e.getValue(h).set(y);
    }), this.resolveNoneKeyframes();
  }
}
const rh = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
];
function f2(a, e, l) {
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
const xd = (a, e) => e && typeof a == "number" ? e.transform(a) : a;
function mr(a) {
  return vv(a) && "offsetHeight" in a && !("ownerSVGElement" in a);
}
const { schedule: uh } = /* @__PURE__ */ Nv(queueMicrotask, !1), hn = {
  x: !1,
  y: !1
};
function d2() {
  return hn.x || hn.y;
}
function uw(a) {
  return a === "x" || a === "y" ? hn[a] ? null : (hn[a] = !0, () => {
    hn[a] = !1;
  }) : hn.x || hn.y ? null : (hn.x = hn.y = !0, () => {
    hn.x = hn.y = !1;
  });
}
function h2(a, e) {
  const l = f2(a), s = new AbortController(), r = {
    passive: !0,
    ...e,
    signal: s.signal
  };
  return [l, r, () => s.abort()];
}
function cw(a) {
  return !(a.pointerType === "touch" || d2());
}
function fw(a, e, l = {}) {
  const [s, r, c] = h2(a, l);
  return s.forEach((f) => {
    let h = !1, y = !1, p;
    const g = () => {
      f.removeEventListener("pointerleave", w);
    }, v = (E) => {
      p && (p(E), p = void 0), g();
    }, b = (E) => {
      h = !1, window.removeEventListener("pointerup", b), window.removeEventListener("pointercancel", b), y && (y = !1, v(E));
    }, T = () => {
      h = !0, window.addEventListener("pointerup", b, r), window.addEventListener("pointercancel", b, r);
    }, w = (E) => {
      if (E.pointerType !== "touch") {
        if (h) {
          y = !0;
          return;
        }
        v(E);
      }
    }, S = (E) => {
      if (!cw(E))
        return;
      y = !1;
      const M = e(f, E);
      typeof M == "function" && (p = M, f.addEventListener("pointerleave", w, r));
    };
    f.addEventListener("pointerenter", S, r), f.addEventListener("pointerdown", T, r);
  }), c;
}
const m2 = (a, e) => e ? a === e ? !0 : m2(a, e.parentElement) : !1, ch = (a) => a.pointerType === "mouse" ? typeof a.button != "number" || a.button <= 0 : a.isPrimary !== !1, dw = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function hw(a) {
  return dw.has(a.tagName) || a.isContentEditable === !0;
}
const mw = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function pw(a) {
  return mw.has(a.tagName) || a.isContentEditable === !0;
}
const pr = /* @__PURE__ */ new WeakSet();
function jy(a) {
  return (e) => {
    e.key === "Enter" && a(e);
  };
}
function _f(a, e) {
  a.dispatchEvent(new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 }));
}
const yw = (a, e) => {
  const l = a.currentTarget;
  if (!l)
    return;
  const s = jy(() => {
    if (pr.has(l))
      return;
    _f(l, "down");
    const r = jy(() => {
      _f(l, "up");
    }), c = () => _f(l, "cancel");
    l.addEventListener("keyup", r, e), l.addEventListener("blur", c, e);
  });
  l.addEventListener("keydown", s, e), l.addEventListener("blur", () => l.removeEventListener("keydown", s), e);
};
function Ey(a) {
  return ch(a) && !d2();
}
const Ay = /* @__PURE__ */ new WeakSet();
function gw(a, e, l = {}) {
  const [s, r, c] = h2(a, l), f = (h) => {
    const y = h.currentTarget;
    if (!Ey(h) || Ay.has(h))
      return;
    pr.add(y), l.stopPropagation && Ay.add(h);
    const p = e(y, h), g = { ...r, capture: !0 }, v = (w, S) => {
      window.removeEventListener("pointerup", b, g), window.removeEventListener("pointercancel", T, g), pr.has(y) && pr.delete(y), Ey(w) && typeof p == "function" && p(w, { success: S });
    }, b = (w) => {
      v(w, y === window || y === document || l.useGlobalTarget || m2(y, w.target));
    }, T = (w) => {
      v(w, !1);
    };
    window.addEventListener("pointerup", b, g), window.addEventListener("pointercancel", T, g);
  };
  return s.forEach((h) => {
    (l.useGlobalTarget ? window : h).addEventListener("pointerdown", f, r), mr(h) && (h.addEventListener("focus", (p) => yw(p, r)), !hw(h) && !h.hasAttribute("tabindex") && (h.tabIndex = 0));
  }), c;
}
function fh(a) {
  return vv(a) && "ownerSVGElement" in a;
}
const yr = /* @__PURE__ */ new WeakMap();
let gr;
const p2 = (a, e, l) => (s, r) => r && r[0] ? r[0][a + "Size"] : fh(s) && "getBBox" in s ? s.getBBox()[e] : s[l], vw = /* @__PURE__ */ p2("inline", "width", "offsetWidth"), bw = /* @__PURE__ */ p2("block", "height", "offsetHeight");
function xw({ target: a, borderBoxSize: e }) {
  yr.get(a)?.forEach((l) => {
    l(a, {
      get width() {
        return vw(a, e);
      },
      get height() {
        return bw(a, e);
      }
    });
  });
}
function Sw(a) {
  a.forEach(xw);
}
function ww() {
  typeof ResizeObserver > "u" || (gr = new ResizeObserver(Sw));
}
function Tw(a, e) {
  gr || ww();
  const l = f2(a);
  return l.forEach((s) => {
    let r = yr.get(s);
    r || (r = /* @__PURE__ */ new Set(), yr.set(s, r)), r.add(e), gr?.observe(s);
  }), () => {
    l.forEach((s) => {
      const r = yr.get(s);
      r?.delete(e), r?.size || gr?.unobserve(s);
    });
  };
}
const vr = /* @__PURE__ */ new Set();
let Pi;
function Cw() {
  Pi = () => {
    const a = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    vr.forEach((e) => e(a));
  }, window.addEventListener("resize", Pi);
}
function jw(a) {
  return vr.add(a), Pi || Cw(), () => {
    vr.delete(a), !vr.size && typeof Pi == "function" && (window.removeEventListener("resize", Pi), Pi = void 0);
  };
}
function My(a, e) {
  return typeof a == "function" ? jw(a) : Tw(a, e);
}
function Ew(a) {
  return fh(a) && a.tagName === "svg";
}
const Aw = [...r2, fe, gn], Mw = (a) => Aw.find(o2(a)), _y = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Ki = () => ({
  x: _y(),
  y: _y()
}), Dy = () => ({ min: 0, max: 0 }), me = () => ({
  x: Dy(),
  y: Dy()
}), _w = /* @__PURE__ */ new WeakMap();
function $r(a) {
  return a !== null && typeof a == "object" && typeof a.start == "function";
}
function bs(a) {
  return typeof a == "string" || Array.isArray(a);
}
const dh = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], hh = ["initial", ...dh];
function qr(a) {
  return $r(a.animate) || hh.some((e) => bs(a[e]));
}
function y2(a) {
  return !!(qr(a) || a.variants);
}
function Dw(a, e, l) {
  for (const s in e) {
    const r = e[s], c = l[s];
    if (Ce(r))
      a.addValue(s, r);
    else if (Ce(c))
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
const _r = { current: null }, mh = { current: !1 }, Rw = typeof window < "u";
function g2() {
  if (mh.current = !0, !!Rw)
    if (window.matchMedia) {
      const a = window.matchMedia("(prefers-reduced-motion)"), e = () => _r.current = a.matches;
      a.addEventListener("change", e), e();
    } else
      _r.current = !1;
}
const Ry = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let Dr = {};
function v2(a) {
  Dr = a;
}
function Nw() {
  return Dr;
}
class Ow {
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
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = ah, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const T = _e.now();
      this.renderScheduledAt < T && (this.renderScheduledAt = T, Xt.render(this.render, !1, !0));
    };
    const { latestValues: p, renderState: g } = h;
    this.latestValues = p, this.baseTarget = { ...p }, this.initialValues = l.initial ? { ...p } : {}, this.renderState = g, this.parent = e, this.props = l, this.presenceContext = s, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = r, this.skipAnimationsConfig = c, this.options = y, this.blockInitialAnimation = !!f, this.isControllingVariants = qr(l), this.isVariantNode = y2(l), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
    const { willChange: v, ...b } = this.scrapeMotionValuesFromProps(l, {}, this);
    for (const T in b) {
      const w = b[T];
      p[T] !== void 0 && Ce(w) && w.set(p[T]);
    }
  }
  mount(e) {
    if (this.hasBeenMounted)
      for (const l in this.initialValues)
        this.values.get(l)?.jump(this.initialValues[l]), this.latestValues[l] = this.initialValues[l];
    this.current = e, _w.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((l, s) => this.bindToMotionValue(s, l)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (mh.current || g2(), this.shouldReduceMotion = _r.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), ja(this.notifyUpdate), ja(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
    if (this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)(), l.accelerate && Iv.has(e) && this.current instanceof HTMLElement) {
      const { factory: f, keyframes: h, times: y, ease: p, duration: g } = l.accelerate, v = new Jv({
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
      this.latestValues[e] = f, this.props.onUpdate && Xt.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
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
    for (e in Dr) {
      const l = Dr[e];
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
    for (let s = 0; s < Ry.length; s++) {
      const r = Ry[s];
      this.propEventSubscriptions[r] && (this.propEventSubscriptions[r](), delete this.propEventSubscriptions[r]);
      const c = "on" + r, f = e[c];
      f && (this.propEventSubscriptions[r] = this.on(r, f));
    }
    this.prevMotionValues = Dw(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
    return s != null && (typeof s == "string" && (gv(s) || bv(s)) ? s = parseFloat(s) : !Mw(s) && gn.test(l) && (s = c2(e, l)), this.setBaseTarget(e, Ce(s) ? s.get() : s)), Ce(s) ? s.get() : s;
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
      const c = sh(this.props, l, this.presenceContext?.custom);
      c && (s = c[e]);
    }
    if (l && s !== void 0)
      return s;
    const r = this.getBaseTargetFromProps(this.props, e);
    return r !== void 0 && !Ce(r) ? r : this.initialValues[e] !== void 0 && s === void 0 ? void 0 : this.baseTarget[e];
  }
  on(e, l) {
    return this.events[e] || (this.events[e] = new Xd()), this.events[e].add(l);
  }
  notify(e, ...l) {
    this.events[e] && this.events[e].notify(...l);
  }
  scheduleRenderMicrotask() {
    uh.render(this.render);
  }
}
class b2 extends Ow {
  constructor() {
    super(...arguments), this.KeyframeResolver = rw;
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
    Ce(e) && (this.childSubscription = e.on("change", (l) => {
      this.current && (this.current.textContent = `${l}`);
    }));
  }
}
class Aa {
  constructor(e) {
    this.isMounted = !1, this.node = e;
  }
  update() {
  }
}
function x2({ top: a, left: e, right: l, bottom: s }) {
  return {
    x: { min: e, max: l },
    y: { min: a, max: s }
  };
}
function zw({ x: a, y: e }) {
  return { top: e.min, right: a.max, bottom: e.max, left: a.min };
}
function Bw(a, e) {
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
function Df(a) {
  return a === void 0 || a === 1;
}
function Sd({ scale: a, scaleX: e, scaleY: l }) {
  return !Df(a) || !Df(e) || !Df(l);
}
function Ja(a) {
  return Sd(a) || S2(a) || a.z || a.rotate || a.rotateX || a.rotateY || a.skewX || a.skewY;
}
function S2(a) {
  return Ny(a.x) || Ny(a.y);
}
function Ny(a) {
  return a && a !== "0%";
}
function Rr(a, e, l) {
  const s = a - l, r = e * s;
  return l + r;
}
function Oy(a, e, l, s, r) {
  return r !== void 0 && (a = Rr(a, r, s)), Rr(a, l, s) + e;
}
function wd(a, e = 0, l = 1, s, r) {
  a.min = Oy(a.min, e, l, s, r), a.max = Oy(a.max, e, l, s, r);
}
function w2(a, { x: e, y: l }) {
  wd(a.x, e.translate, e.scale, e.originPoint), wd(a.y, l.translate, l.scale, l.originPoint);
}
const zy = 0.999999999999, By = 1.0000000000001;
function Lw(a, e, l, s = !1) {
  const r = l.length;
  if (!r)
    return;
  e.x = e.y = 1;
  let c, f;
  for (let h = 0; h < r; h++) {
    c = l[h], f = c.projectionDelta;
    const { visualElement: y } = c.options;
    y && y.props.style && y.props.style.display === "contents" || (s && c.options.layoutScroll && c.scroll && c !== c.root && (En(a.x, -c.scroll.offset.x), En(a.y, -c.scroll.offset.y)), f && (e.x *= f.x.scale, e.y *= f.y.scale, w2(a, f)), s && Ja(c.latestValues) && br(a, c.latestValues, c.layout?.layoutBox));
  }
  e.x < By && e.x > zy && (e.x = 1), e.y < By && e.y > zy && (e.y = 1);
}
function En(a, e) {
  a.min += e, a.max += e;
}
function Ly(a, e, l, s, r = 0.5) {
  const c = Gt(a.min, a.max, r);
  wd(a, e, l, c, s);
}
function Vy(a, e) {
  return typeof a == "string" ? parseFloat(a) / 100 * (e.max - e.min) : a;
}
function br(a, e, l) {
  const s = l ?? a;
  Ly(a.x, Vy(e.x, s.x), e.scaleX, e.scale, e.originX), Ly(a.y, Vy(e.y, s.y), e.scaleY, e.scale, e.originY);
}
function T2(a, e) {
  return x2(Bw(a.getBoundingClientRect(), e));
}
function Vw(a, e, l) {
  const s = T2(a, l), { scroll: r } = e;
  return r && (En(s.x, r.offset.x), En(s.y, r.offset.y)), s;
}
const kw = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, Uw = il.length;
function Hw(a, e, l) {
  let s = "", r = !0;
  for (let f = 0; f < Uw; f++) {
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
      const g = xd(y, Mr[h]);
      if (!p) {
        r = !1;
        const v = kw[h] || h;
        s += `${v}(${g}) `;
      }
      l && (e[h] = g);
    }
  }
  const c = a.pathRotation;
  return c && (r = !1, s += `rotate(${xd(c, Mr.pathRotation)}) `), s = s.trim(), l ? s = l(e, r ? "" : s) : r && (s = "none"), s;
}
function ph(a, e, l) {
  const { style: s, vars: r, transformOrigin: c } = a;
  let f = !1, h = !1;
  for (const y in e) {
    const p = e[y];
    if (ll.has(y)) {
      f = !0;
      continue;
    } else if (zv(y)) {
      r[y] = p;
      continue;
    } else {
      const g = xd(p, Mr[y]);
      y.startsWith("origin") ? (h = !0, c[y] = g) : s[y] = g;
    }
  }
  if (e.transform || (f || l ? s.transform = Hw(e, a.transform, l) : s.transform && (s.transform = "none")), h) {
    const { originX: y = "50%", originY: p = "50%", originZ: g = 0 } = c;
    s.transformOrigin = `${y} ${p} ${g}`;
  }
}
function C2(a, { style: e, vars: l }, s, r) {
  const c = a.style;
  let f;
  for (f in e)
    c[f] = e[f];
  r?.applyProjectionStyles(c, s);
  for (f in l)
    c.setProperty(f, l[f]);
}
function ky(a, e) {
  return e.max === e.min ? 0 : a / (e.max - e.min) * 100;
}
const ls = {
  correct: (a, e) => {
    if (!e.target)
      return a;
    if (typeof a == "string")
      if (ct.test(a))
        a = parseFloat(a);
      else
        return a;
    const l = ky(a, e.target.x), s = ky(a, e.target.y);
    return `${l}% ${s}%`;
  }
}, $w = {
  correct: (a, { treeScale: e, projectionDelta: l }) => {
    const s = a, r = gn.parse(a);
    if (r.length > 5)
      return s;
    const c = gn.createTransformer(a), f = typeof r[0] != "number" ? 1 : 0, h = l.x.scale * e.x, y = l.y.scale * e.y;
    r[0 + f] /= h, r[1 + f] /= y;
    const p = Gt(h, y, 0.5);
    return typeof r[2 + f] == "number" && (r[2 + f] /= p), typeof r[3 + f] == "number" && (r[3 + f] /= p), c(r);
  }
}, Td = {
  borderRadius: {
    ...ls,
    applyTo: [...rh]
  },
  borderTopLeftRadius: ls,
  borderTopRightRadius: ls,
  borderBottomLeftRadius: ls,
  borderBottomRightRadius: ls,
  boxShadow: $w
};
function j2(a, { layout: e, layoutId: l }) {
  return ll.has(a) || a.startsWith("origin") || (e || l !== void 0) && (!!Td[a] || a === "opacity");
}
function yh(a, e, l) {
  const s = a.style, r = e?.style, c = {};
  if (!s)
    return c;
  for (const f in s)
    (Ce(s[f]) || r && Ce(r[f]) || j2(f, a) || l?.getValue(f)?.liveStyle !== void 0) && (c[f] = s[f]);
  return c;
}
function qw(a) {
  return window.getComputedStyle(a);
}
class Yw extends b2 {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = C2;
  }
  readValueFromInstance(e, l) {
    if (ll.has(l))
      return this.projection?.isProjecting ? ud(l) : c5(e, l);
    {
      const s = qw(e), r = (zv(l) ? s.getPropertyValue(l) : s[l]) || 0;
      return typeof r == "string" ? r.trim() : r;
    }
  }
  measureInstanceViewportBox(e, { transformPagePoint: l }) {
    return T2(e, l);
  }
  build(e, l, s) {
    ph(e, l, s.transformTemplate);
  }
  scrapeMotionValuesFromProps(e, l, s) {
    return yh(e, l, s);
  }
}
const Gw = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, Xw = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function Pw(a, e, l = 1, s = 0, r = !0) {
  a.pathLength = 1;
  const c = r ? Gw : Xw;
  a[c.offset] = `${-s}`, a[c.array] = `${e} ${l}`;
}
const Kw = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function E2(a, {
  attrX: e,
  attrY: l,
  attrScale: s,
  pathLength: r,
  pathSpacing: c = 1,
  pathOffset: f = 0,
  // This is object creation, which we try to avoid per-frame.
  ...h
}, y, p, g) {
  if (ph(a, h, p), y) {
    a.style.viewBox && (a.attrs.viewBox = a.style.viewBox);
    return;
  }
  a.attrs = a.style, a.style = {};
  const { attrs: v, style: b } = a;
  v.transform && (b.transform = v.transform, delete v.transform), (b.transform || v.transformOrigin) && (b.transformOrigin = v.transformOrigin ?? "50% 50%", delete v.transformOrigin), b.transform && (b.transformBox = g?.transformBox ?? "fill-box", delete v.transformBox);
  for (const T of Kw)
    v[T] !== void 0 && (b[T] = v[T], delete v[T]);
  e !== void 0 && (v.x = e), l !== void 0 && (v.y = l), s !== void 0 && (v.scale = s), r !== void 0 && Pw(v, r, c, f, !1);
}
const A2 = /* @__PURE__ */ new Set([
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
]), M2 = (a) => typeof a == "string" && a.toLowerCase() === "svg";
function Zw(a, e, l, s) {
  C2(a, e, void 0, s);
  for (const r in e.attrs)
    a.setAttribute(A2.has(r) ? r : oh(r), e.attrs[r]);
}
function _2(a, e, l) {
  const s = yh(a, e, l);
  for (const r in a)
    if (Ce(a[r]) || Ce(e[r])) {
      const c = il.indexOf(r) !== -1 ? "attr" + r.charAt(0).toUpperCase() + r.substring(1) : r;
      s[c] = a[r];
    }
  return s;
}
class Qw extends b2 {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = me;
  }
  getBaseTargetFromProps(e, l) {
    return e[l];
  }
  readValueFromInstance(e, l) {
    if (ll.has(l)) {
      const s = u2(l);
      return s && s.default || 0;
    }
    return l = A2.has(l) ? l : oh(l), e.getAttribute(l);
  }
  scrapeMotionValuesFromProps(e, l, s) {
    return _2(e, l, s);
  }
  build(e, l, s) {
    E2(e, l, this.isSVGTag, s.transformTemplate, s.style);
  }
  renderInstance(e, l, s, r) {
    Zw(e, l, s, r);
  }
  mount(e) {
    this.isSVGTag = M2(e.tagName), super.mount(e);
  }
}
const Fw = hh.length;
function D2(a) {
  if (!a)
    return;
  if (!a.isControllingVariants) {
    const l = a.parent ? D2(a.parent) || {} : {};
    return a.props.initial !== void 0 && (l.initial = a.props.initial), l;
  }
  const e = {};
  for (let l = 0; l < Fw; l++) {
    const s = hh[l], r = a.props[s];
    (bs(r) || r === !1) && (e[s] = r);
  }
  return e;
}
function R2(a, e) {
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
const Jw = [...dh].reverse(), Ww = dh.length;
function Iw(a) {
  return (e) => Promise.all(e.map(({ animation: l, options: s }) => J5(a, l, s)));
}
function t9(a) {
  let e = Iw(a), l = Uy(), s = !0, r = !1;
  const c = (p) => (g, v) => {
    const b = ii(a, v, p === "exit" ? a.presenceContext?.custom : void 0);
    if (b) {
      const { transition: T, transitionEnd: w, ...S } = b;
      g = { ...g, ...S, ...w };
    }
    return g;
  };
  function f(p) {
    e = p(a);
  }
  function h(p) {
    const { props: g } = a, v = D2(a.parent) || {}, b = [], T = /* @__PURE__ */ new Set();
    let w = {}, S = 1 / 0;
    for (let M = 0; M < Ww; M++) {
      const R = Jw[M], D = l[R], N = g[R] !== void 0 ? g[R] : v[R], V = bs(N), z = R === p ? D.isActive : null;
      z === !1 && (S = M);
      let A = N === v[R] && N !== g[R] && V;
      if (A && (s || r) && a.manuallyAnimateOnMount && (A = !1), D.protectedKeys = { ...w }, // If it isn't active and hasn't *just* been set as inactive
      !D.isActive && z === null || // If we didn't and don't have any defined prop for this animation type
      !N && !D.prevProp || // Or if the prop doesn't define an animation
      $r(N) || typeof N == "boolean")
        continue;
      if (R === "exit" && D.isActive && z !== !0) {
        D.prevResolvedValues && (w = {
          ...w,
          ...D.prevResolvedValues
        });
        continue;
      }
      const H = e9(D.prevProp, N);
      let G = H || // If we're making this variant active, we want to always make it active
      R === p && D.isActive && !A && V || // If we removed a higher-priority variant (i is in reverse order)
      M > S && V, K = !1;
      const nt = Array.isArray(N) ? N : [N];
      let at = nt.reduce(c(R), {});
      z === !1 && (at = {});
      const { prevResolvedValues: tt = {} } = D, Z = {
        ...tt,
        ...at
      }, it = (et) => {
        G = !0, T.has(et) && (K = !0, T.delete(et)), D.needsAnimating[et] = !0;
        const st = a.getValue(et);
        st && (st.liveStyle = !1);
      };
      for (const et in Z) {
        const st = at[et], J = tt[et];
        if (w.hasOwnProperty(et))
          continue;
        let _ = !1;
        pd(st) && pd(J) ? _ = !R2(st, J) || H : _ = st !== J, _ ? st != null ? it(et) : T.add(et) : st !== void 0 && T.has(et) ? it(et) : D.protectedKeys[et] = !0;
      }
      D.prevProp = N, D.prevResolvedValues = at, D.isActive && (w = { ...w, ...at }), (s || r) && a.blockInitialAnimation && (G = !1);
      const L = A && H;
      G && (!L || K) && b.push(...nt.map((et) => {
        const st = { type: R };
        if (typeof et == "string" && (s || r) && !L && a.manuallyAnimateOnMount && a.parent) {
          const { parent: J } = a, _ = ii(J, et);
          if (J.enteringChildren && _) {
            const { delayChildren: U } = _.transition || {};
            st.delay = t2(J.enteringChildren, a, U);
          }
        }
        return {
          animation: et,
          options: st
        };
      }));
    }
    if (T.size) {
      const M = {};
      if (typeof g.initial != "boolean") {
        const R = ii(a, Array.isArray(g.initial) ? g.initial[0] : g.initial);
        R && R.transition && (M.transition = R.transition);
      }
      T.forEach((R) => {
        const D = a.getBaseTarget(R), N = a.getValue(R);
        N && (N.liveStyle = !0), M[R] = D ?? null;
      }), b.push({ animation: M });
    }
    let E = !!b.length;
    return s && (g.initial === !1 || g.initial === g.animate) && !a.manuallyAnimateOnMount && (E = !1), s = !1, r = !1, E ? e(b) : Promise.resolve();
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
      l = Uy(), r = !0;
    }
  };
}
function e9(a, e) {
  return typeof e == "string" ? e !== a : Array.isArray(e) ? !R2(e, a) : !1;
}
function Ka(a = !1) {
  return {
    isActive: a,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function Uy() {
  return {
    animate: Ka(!0),
    whileInView: Ka(),
    whileHover: Ka(),
    whileTap: Ka(),
    whileDrag: Ka(),
    whileFocus: Ka(),
    exit: Ka()
  };
}
function Cd(a, e) {
  a.min = e.min, a.max = e.max;
}
function dn(a, e) {
  Cd(a.x, e.x), Cd(a.y, e.y);
}
function Hy(a, e) {
  a.translate = e.translate, a.scale = e.scale, a.originPoint = e.originPoint, a.origin = e.origin;
}
const N2 = 1e-4, n9 = 1 - N2, a9 = 1 + N2, O2 = 0.01, i9 = 0 - O2, l9 = 0 + O2;
function De(a) {
  return a.max - a.min;
}
function s9(a, e, l) {
  return Math.abs(a - e) <= l;
}
function $y(a, e, l, s = 0.5) {
  a.origin = s, a.originPoint = Gt(e.min, e.max, a.origin), a.scale = De(l) / De(e), a.translate = Gt(l.min, l.max, a.origin) - a.originPoint, (a.scale >= n9 && a.scale <= a9 || isNaN(a.scale)) && (a.scale = 1), (a.translate >= i9 && a.translate <= l9 || isNaN(a.translate)) && (a.translate = 0);
}
function ms(a, e, l, s) {
  $y(a.x, e.x, l.x, s ? s.originX : void 0), $y(a.y, e.y, l.y, s ? s.originY : void 0);
}
function qy(a, e, l, s = 0) {
  const r = s ? Gt(l.min, l.max, s) : l.min;
  a.min = r + e.min, a.max = a.min + De(e);
}
function o9(a, e, l, s) {
  qy(a.x, e.x, l.x, s?.x), qy(a.y, e.y, l.y, s?.y);
}
function Yy(a, e, l, s = 0) {
  const r = s ? Gt(l.min, l.max, s) : l.min;
  a.min = e.min - r, a.max = a.min + De(e);
}
function Nr(a, e, l, s) {
  Yy(a.x, e.x, l.x, s?.x), Yy(a.y, e.y, l.y, s?.y);
}
function Gy(a, e, l, s, r) {
  return a -= e, a = Rr(a, 1 / l, s), r !== void 0 && (a = Rr(a, 1 / r, s)), a;
}
function r9(a, e = 0, l = 1, s = 0.5, r, c = a, f = a) {
  if (An.test(e) && (e = parseFloat(e), e = Gt(f.min, f.max, e / 100) - f.min), typeof e != "number")
    return;
  let h = Gt(c.min, c.max, s);
  a === c && (h -= e), a.min = Gy(a.min, e, l, h, r), a.max = Gy(a.max, e, l, h, r);
}
function Xy(a, e, [l, s, r], c, f) {
  r9(a, e[l], e[s], e[r], e.scale, c, f);
}
const u9 = ["x", "scaleX", "originX"], c9 = ["y", "scaleY", "originY"];
function Py(a, e, l, s) {
  Xy(a.x, e, u9, l ? l.x : void 0, s ? s.x : void 0), Xy(a.y, e, c9, l ? l.y : void 0, s ? s.y : void 0);
}
function Ky(a) {
  return a.translate === 0 && a.scale === 1;
}
function z2(a) {
  return Ky(a.x) && Ky(a.y);
}
function Zy(a, e) {
  return a.min === e.min && a.max === e.max;
}
function f9(a, e) {
  return Zy(a.x, e.x) && Zy(a.y, e.y);
}
function Qy(a, e) {
  return Math.round(a.min) === Math.round(e.min) && Math.round(a.max) === Math.round(e.max);
}
function B2(a, e) {
  return Qy(a.x, e.x) && Qy(a.y, e.y);
}
function Fy(a) {
  return De(a.x) / De(a.y);
}
function Jy(a, e) {
  return a.translate === e.translate && a.scale === e.scale && a.originPoint === e.originPoint;
}
function jn(a) {
  return [a("x"), a("y")];
}
function d9(a, e, l) {
  let s = "";
  const r = a.x.translate / e.x, c = a.y.translate / e.y, f = l?.z || 0;
  if ((r || c || f) && (s = `translate3d(${r}px, ${c}px, ${f}px) `), (e.x !== 1 || e.y !== 1) && (s += `scale(${1 / e.x}, ${1 / e.y}) `), l) {
    const { transformPerspective: p, rotate: g, pathRotation: v, rotateX: b, rotateY: T, skewX: w, skewY: S } = l;
    p && (s = `perspective(${p}px) ${s}`), g && (s += `rotate(${g}deg) `), v && (s += `rotate(${v}deg) `), b && (s += `rotateX(${b}deg) `), T && (s += `rotateY(${T}deg) `), w && (s += `skewX(${w}deg) `), S && (s += `skewY(${S}deg) `);
  }
  const h = a.x.scale * e.x, y = a.y.scale * e.y;
  return (h !== 1 || y !== 1) && (s += `scale(${h}, ${y})`), s || "none";
}
const h9 = rh.length, Wy = (a) => typeof a == "string" ? parseFloat(a) : a, Iy = (a) => typeof a == "number" || ct.test(a);
function m9(a, e, l, s, r, c) {
  r ? (a.opacity = Gt(0, l.opacity ?? 1, p9(s)), a.opacityExit = Gt(e.opacity ?? 1, 0, y9(s))) : c && (a.opacity = Gt(e.opacity ?? 1, l.opacity ?? 1, s));
  for (let f = 0; f < h9; f++) {
    const h = rh[f];
    let y = tg(e, h), p = tg(l, h);
    if (y === void 0 && p === void 0)
      continue;
    y || (y = 0), p || (p = 0), y === 0 || p === 0 || Iy(y) === Iy(p) ? (a[h] = Math.max(Gt(Wy(y), Wy(p), s), 0), (An.test(p) || An.test(y)) && (a[h] += "%")) : a[h] = p;
  }
  (e.rotate || l.rotate) && (a.rotate = Gt(e.rotate || 0, l.rotate || 0, s));
}
function tg(a, e) {
  return a[e] !== void 0 ? a[e] : a.borderRadius;
}
const p9 = /* @__PURE__ */ L2(0, 0.5, Mv), y9 = /* @__PURE__ */ L2(0.5, 0.95, rn);
function L2(a, e, l) {
  return (s) => s < a ? 0 : s > e ? 1 : l(/* @__PURE__ */ gs(a, e, s));
}
function g9(a, e, l) {
  const s = Ce(a) ? a : tl(a);
  return s.start(lh("", s, e, l)), s.animation;
}
function xs(a, e, l, s = { passive: !0 }) {
  return a.addEventListener(e, l, s), () => a.removeEventListener(e, l, s);
}
const v9 = (a, e) => a.depth - e.depth;
class b9 {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(e) {
    Yd(this.children, e), this.isDirty = !0;
  }
  remove(e) {
    Tr(this.children, e), this.isDirty = !0;
  }
  forEach(e) {
    this.isDirty && this.children.sort(v9), this.isDirty = !1, this.children.forEach(e);
  }
}
function x9(a, e) {
  const l = _e.now(), s = ({ timestamp: r }) => {
    const c = r - l;
    c >= e && (ja(s), a(c - e));
  };
  return Xt.setup(s, !0), () => ja(s);
}
function xr(a) {
  return Ce(a) ? a.get() : a;
}
class S9 {
  constructor() {
    this.members = [];
  }
  add(e) {
    Yd(this.members, e);
    for (let l = this.members.length - 1; l >= 0; l--) {
      const s = this.members[l];
      if (s === e || s === this.lead || s === this.prevLead)
        continue;
      const r = s.instance;
      (!r || r.isConnected === !1) && !s.snapshot && (Tr(this.members, s), s.unmount());
    }
    e.scheduleRender();
  }
  remove(e) {
    if (Tr(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead) {
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
const Sr = {
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
}, Rf = ["", "X", "Y", "Z"], w9 = 1e3;
let T9 = 0;
function Nf(a, e, l, s) {
  const { latestValues: r } = e;
  r[a] && (l[a] = r[a], e.setStaticValue(a, 0), s && (s[a] = 0));
}
function V2(a) {
  if (a.hasCheckedOptimisedAppear = !0, a.root === a)
    return;
  const { visualElement: e } = a.options;
  if (!e)
    return;
  const l = l2(e);
  if (window.MotionHasOptimisedAnimation(l, "transform")) {
    const { layout: r, layoutId: c } = a.options;
    window.MotionCancelOptimisedAnimation(l, "transform", Xt, !(r || c));
  }
  const { parent: s } = a;
  s && !s.hasCheckedOptimisedAppear && V2(s);
}
function k2({ attachResizeListener: a, defaultParent: e, measureScroll: l, checkIsScrollRoot: s, resetTransform: r }) {
  return class {
    constructor(f = {}, h = e?.()) {
      this.id = T9++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(E9), this.nodes.forEach(N9), this.nodes.forEach(O9), this.nodes.forEach(A9);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = f, this.root = h ? h.root || h : this, this.path = h ? [...h.path, h] : [], this.parent = h, this.depth = h ? h.depth + 1 : 0;
      for (let y = 0; y < this.path.length; y++)
        this.path[y].shouldResetTransform = !0;
      this.root === this && (this.nodes = new b9());
    }
    addEventListener(f, h) {
      return this.eventHandlers.has(f) || this.eventHandlers.set(f, new Xd()), this.eventHandlers.get(f).add(h);
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
      this.isSVG = fh(f) && !Ew(f), this.instance = f;
      const { layoutId: h, layout: y, visualElement: p } = this.options;
      if (p && !p.current && p.mount(f), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (y || h) && (this.isLayoutDirty = !0), a) {
        let g, v = 0;
        const b = () => this.root.updateBlockedByResize = !1;
        Xt.read(() => {
          v = window.innerWidth;
        }), a(f, () => {
          const T = window.innerWidth;
          T !== v && (v = T, this.root.updateBlockedByResize = !0, g && g(), g = x9(b, 250), Sr.hasAnimatedSinceResize && (Sr.hasAnimatedSinceResize = !1, this.nodes.forEach(ag)));
        });
      }
      h && this.root.registerSharedNode(h, this), this.options.animate !== !1 && p && (h || y) && this.addEventListener("didUpdate", ({ delta: g, hasLayoutChanged: v, hasRelativeLayoutChanged: b, layout: T }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const w = this.options.transition || p.getDefaultTransition() || k9, { onLayoutAnimationStart: S, onLayoutAnimationComplete: E } = p.getProps(), M = !this.targetLayout || !B2(this.targetLayout, T), R = !v && b;
        if (this.options.layoutRoot || this.resumeFrom || R || v && (M || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const D = {
            ...ih(w, "layout"),
            onPlay: S,
            onComplete: E
          };
          (p.shouldReduceMotion || this.options.layoutRoot) && (D.delay = 0, D.type = !1), this.startAnimation(D), this.setAnimationOrigin(g, R, D.path);
        } else
          v || ag(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = T;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const f = this.getStack();
      f && f.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), ja(this.updateProjection);
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
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(z9), this.animationId++);
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
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && V2(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
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
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), y && this.nodes.forEach(_9), this.nodes.forEach(eg);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(ng);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(D9), this.nodes.forEach(R9), this.nodes.forEach(C9), this.nodes.forEach(j9)) : this.nodes.forEach(ng), this.clearAllSnapshots();
      const h = _e.now();
      Te.delta = Mn(0, 1e3 / 60, h - Te.timestamp), Te.timestamp = h, Te.isProcessing = !0, Tf.update.process(Te), Tf.preRender.process(Te), Tf.render.process(Te), Te.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, uh.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(M9), this.sharedNodes.forEach(B9);
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
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !De(this.snapshot.measuredBox.x) && !De(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
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
      const f = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, h = this.projectionDelta && !z2(this.projectionDelta), y = this.getTransformTemplate(), p = y ? y(this.latestValues, "") : void 0, g = p !== this.prevTransformTemplateValue;
      f && this.instance && (h || Ja(this.latestValues) || g) && (r(this.instance, p), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(f = !0) {
      const h = this.measurePageBox();
      let y = this.removeElementScroll(h);
      return f && (y = this.removeTransform(y)), U9(y), {
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
      if (!(this.scroll?.wasRoot || this.path.some(H9))) {
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
        !h && v.options.layoutScroll && v.scroll && v !== v.root && (En(p.x, -v.scroll.offset.x), En(p.y, -v.scroll.offset.y)), Ja(v.latestValues) && br(p, v.latestValues, v.layout?.layoutBox);
      }
      return Ja(this.latestValues) && br(p, this.latestValues, this.layout?.layoutBox), p;
    }
    removeTransform(f) {
      const h = me();
      dn(h, f);
      for (let y = 0; y < this.path.length; y++) {
        const p = this.path[y];
        if (!Ja(p.latestValues))
          continue;
        let g;
        p.instance && (Sd(p.latestValues) && p.updateSnapshot(), g = me(), dn(g, p.measurePageBox())), Py(h, p.latestValues, p.snapshot?.layoutBox, g);
      }
      return Ja(this.latestValues) && Py(h, this.latestValues), h;
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
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== Te.timestamp && this.relativeParent.resolveTargetDelta(!0);
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
      this.resolvedRelativeTargetAt = Te.timestamp;
      const b = this.getClosestProjectingParent();
      b && this.linkedParentVersion !== b.layoutVersion && !b.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && b && b.layout ? this.createRelativeTarget(b, this.layout.layoutBox, b.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = me(), this.targetWithTransforms = me()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), o9(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : dn(this.target, this.layout.layoutBox), w2(this.target, this.targetDelta)) : dn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && b && !!b.resumingFrom == !!this.resumingFrom && !b.options.layoutScroll && b.target && this.animationProgress !== 1 ? this.createRelativeTarget(b, this.target, b.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || Sd(this.parent.latestValues) || S2(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(f, h, y) {
      this.relativeParent = f, this.linkedParentVersion = f.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = me(), this.relativeTargetOrigin = me(), Nr(this.relativeTargetOrigin, h, y, this.options.layoutAnchor || void 0), dn(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const f = this.getLead(), h = !!this.resumingFrom || this !== f;
      let y = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (y = !1), h && (this.isSharedProjectionDirty || this.isTransformDirty) && (y = !1), this.resolvedRelativeTargetAt === Te.timestamp && (y = !1), y)
        return;
      const { layout: p, layoutId: g } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(p || g))
        return;
      dn(this.layoutCorrected, this.layout.layoutBox);
      const v = this.treeScale.x, b = this.treeScale.y;
      Lw(this.layoutCorrected, this.treeScale, this.path, h), f.layout && !f.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (f.target = f.layout.layoutBox, f.targetWithTransforms = me());
      const { target: T } = f;
      if (!T) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Hy(this.prevProjectionDelta.x, this.projectionDelta.x), Hy(this.prevProjectionDelta.y, this.projectionDelta.y)), ms(this.projectionDelta, this.layoutCorrected, T, this.latestValues), (this.treeScale.x !== v || this.treeScale.y !== b || !Jy(this.projectionDelta.x, this.prevProjectionDelta.x) || !Jy(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", T));
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
      const T = me(), w = p ? p.source : void 0, S = this.layout ? this.layout.source : void 0, E = w !== S, M = this.getStack(), R = !M || M.members.length <= 1, D = !!(E && !R && this.options.crossfade === !0 && !this.path.some(V9));
      this.animationProgress = 0;
      let N;
      const V = y?.interpolateProjection(f);
      this.mixTargetDelta = (z) => {
        const A = z / 1e3, H = V?.(A);
        H ? (b.x.translate = H.x, b.x.scale = Gt(f.x.scale, 1, A), b.x.origin = f.x.origin, b.x.originPoint = f.x.originPoint, b.y.translate = H.y, b.y.scale = Gt(f.y.scale, 1, A), b.y.origin = f.y.origin, b.y.originPoint = f.y.originPoint) : (ig(b.x, f.x, A), ig(b.y, f.y, A)), this.setTargetDelta(b), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Nr(T, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), L9(this.relativeTarget, this.relativeTargetOrigin, T, A), N && f9(this.relativeTarget, N) && (this.isProjectionDirty = !1), N || (N = me()), dn(N, this.relativeTarget)), E && (this.animationValues = v, m9(v, g, this.latestValues, A, D, R)), H && H.rotate !== void 0 && (this.animationValues || (this.animationValues = v), this.animationValues.pathRotation = H.rotate), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = A;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(f) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (ja(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = Xt.update(() => {
        Sr.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = tl(0)), this.motionValue.jump(0, !1), this.currentAnimation = g9(this.motionValue, [0, 1e3], {
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
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(w9), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const f = this.getLead();
      let { targetWithTransforms: h, target: y, layout: p, latestValues: g } = f;
      if (!(!h || !y || !p)) {
        if (this !== f && this.layout && p && U2(this.options.animationType, this.layout.layoutBox, p.layoutBox)) {
          y = this.target || me();
          const v = De(this.layout.layoutBox.x);
          y.x.min = f.target.x.min, y.x.max = y.x.min + v;
          const b = De(this.layout.layoutBox.y);
          y.y.min = f.target.y.min, y.y.max = y.y.min + b;
        }
        dn(h, y), br(h, g), ms(this.projectionDeltaWithTransform, this.layoutCorrected, h, g);
      }
    }
    registerSharedNode(f, h) {
      this.sharedNodes.has(f) || this.sharedNodes.set(f, new S9()), this.sharedNodes.get(f).add(h);
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
      y.z && Nf("z", f, p, this.animationValues);
      for (let g = 0; g < Rf.length; g++)
        Nf(`rotate${Rf[g]}`, f, p, this.animationValues), Nf(`skew${Rf[g]}`, f, p, this.animationValues);
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
        this.needsReset = !1, f.visibility = "", f.opacity = "", f.pointerEvents = xr(h?.pointerEvents) || "", f.transform = y ? y(this.latestValues, "") : "none";
        return;
      }
      const p = this.getLead();
      if (!this.projectionDelta || !this.layout || !p.target) {
        this.options.layoutId && (f.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, f.pointerEvents = xr(h?.pointerEvents) || ""), this.hasProjected && !Ja(this.latestValues) && (f.transform = y ? y({}, "") : "none", this.hasProjected = !1);
        return;
      }
      f.visibility = "";
      const g = p.animationValues || p.latestValues;
      this.applyTransformsToTarget();
      let v = d9(this.projectionDeltaWithTransform, this.treeScale, g);
      y && (v = y(g, v)), f.transform = v;
      const { x: b, y: T } = this.projectionDelta;
      f.transformOrigin = `${b.origin * 100}% ${T.origin * 100}% 0`, p.animationValues ? f.opacity = p === this ? g.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : g.opacityExit : f.opacity = p === this ? g.opacity !== void 0 ? g.opacity : "" : g.opacityExit !== void 0 ? g.opacityExit : 0;
      for (const w in Td) {
        if (g[w] === void 0)
          continue;
        const { correct: S, applyTo: E, isCSSVariable: M } = Td[w], R = v === "none" ? g[w] : S(g[w], p);
        if (E) {
          const D = E.length;
          for (let N = 0; N < D; N++)
            f[E[N]] = R;
        } else
          M ? this.options.visualElement.renderState.vars[w] = R : f[w] = R;
      }
      this.options.layoutId && (f.pointerEvents = p === this ? xr(h?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((f) => f.currentAnimation?.stop()), this.root.nodes.forEach(eg), this.root.sharedNodes.clear();
    }
  };
}
function C9(a) {
  a.updateLayout();
}
function j9(a) {
  const e = a.resumeFrom?.snapshot || a.snapshot;
  if (a.isLead() && a.layout && e && a.hasListeners("didUpdate")) {
    const { layoutBox: l, measuredBox: s } = a.layout, { animationType: r } = a.options, c = e.source !== a.layout.source;
    if (r === "size")
      jn((g) => {
        const v = c ? e.measuredBox[g] : e.layoutBox[g], b = De(v);
        v.min = l[g].min, v.max = v.min + b;
      });
    else if (r === "x" || r === "y") {
      const g = r === "x" ? "y" : "x";
      Cd(c ? e.measuredBox[g] : e.layoutBox[g], l[g]);
    } else U2(r, e.layoutBox, l) && jn((g) => {
      const v = c ? e.measuredBox[g] : e.layoutBox[g], b = De(l[g]);
      v.max = v.min + b, a.relativeTarget && !a.currentAnimation && (a.isProjectionDirty = !0, a.relativeTarget[g].max = a.relativeTarget[g].min + b);
    });
    const f = Ki();
    ms(f, l, e.layoutBox);
    const h = Ki();
    c ? ms(h, a.applyTransform(s, !0), e.measuredBox) : ms(h, l, e.layoutBox);
    const y = !z2(f);
    let p = !1;
    if (!a.resumeFrom) {
      const g = a.getClosestProjectingParent();
      if (g && !g.resumeFrom) {
        const { snapshot: v, layout: b } = g;
        if (v && b) {
          const T = a.options.layoutAnchor || void 0, w = me();
          Nr(w, e.layoutBox, v.layoutBox, T);
          const S = me();
          Nr(S, l, b.layoutBox, T), B2(w, S) || (p = !0), g.options.layoutRoot && (a.relativeTarget = S, a.relativeTargetOrigin = w, a.relativeParent = g);
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
function E9(a) {
  a.parent && (a.isProjecting() || (a.isProjectionDirty = a.parent.isProjectionDirty), a.isSharedProjectionDirty || (a.isSharedProjectionDirty = !!(a.isProjectionDirty || a.parent.isProjectionDirty || a.parent.isSharedProjectionDirty)), a.isTransformDirty || (a.isTransformDirty = a.parent.isTransformDirty));
}
function A9(a) {
  a.isProjectionDirty = a.isSharedProjectionDirty = a.isTransformDirty = !1;
}
function M9(a) {
  a.clearSnapshot();
}
function eg(a) {
  a.clearMeasurements();
}
function _9(a) {
  a.isLayoutDirty = !0, a.updateLayout();
}
function ng(a) {
  a.isLayoutDirty = !1;
}
function D9(a) {
  a.isAnimationBlocked && a.layout && !a.isLayoutDirty && (a.snapshot = a.layout, a.isLayoutDirty = !0);
}
function R9(a) {
  const { visualElement: e } = a.options;
  e && e.getProps().onBeforeLayoutMeasure && e.notify("BeforeLayoutMeasure"), a.resetTransform();
}
function ag(a) {
  a.finishAnimation(), a.targetDelta = a.relativeTarget = a.target = void 0, a.isProjectionDirty = !0;
}
function N9(a) {
  a.resolveTargetDelta();
}
function O9(a) {
  a.calcProjection();
}
function z9(a) {
  a.resetSkewAndRotation();
}
function B9(a) {
  a.removeLeadSnapshot();
}
function ig(a, e, l) {
  a.translate = Gt(e.translate, 0, l), a.scale = Gt(e.scale, 1, l), a.origin = e.origin, a.originPoint = e.originPoint;
}
function lg(a, e, l, s) {
  a.min = Gt(e.min, l.min, s), a.max = Gt(e.max, l.max, s);
}
function L9(a, e, l, s) {
  lg(a.x, e.x, l.x, s), lg(a.y, e.y, l.y, s);
}
function V9(a) {
  return a.animationValues && a.animationValues.opacityExit !== void 0;
}
const k9 = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, sg = (a) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(a), og = sg("applewebkit/") && !sg("chrome/") ? Math.round : rn;
function rg(a) {
  a.min = og(a.min), a.max = og(a.max);
}
function U9(a) {
  rg(a.x), rg(a.y);
}
function U2(a, e, l) {
  return a === "position" || a === "preserve-aspect" && !s9(Fy(e), Fy(l), 0.2);
}
function H9(a) {
  return a !== a.root && a.scroll?.wasRoot;
}
const $9 = k2({
  attachResizeListener: (a, e) => xs(a, "resize", e),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), Of = {
  current: void 0
}, H2 = k2({
  measureScroll: (a) => ({
    x: a.scrollLeft,
    y: a.scrollTop
  }),
  defaultParent: () => {
    if (!Of.current) {
      const a = new $9({});
      a.mount(window), a.setOptions({ layoutScroll: !0 }), Of.current = a;
    }
    return Of.current;
  },
  resetTransform: (a, e) => {
    a.style.transform = e !== void 0 ? e : "none";
  },
  checkIsScrollRoot: (a) => window.getComputedStyle(a).position === "fixed"
});
function q9(a, e) {
  if (qr(a)) {
    const { initial: l, animate: s } = a;
    return {
      initial: l === !1 || bs(l) ? l : void 0,
      animate: bs(s) ? s : void 0
    };
  }
  return a.inherit !== !1 ? e : {};
}
function Y9(a) {
  const { initial: e, animate: l } = q9(a, j.useContext(Ur));
  return j.useMemo(() => ({ initial: e, animate: l }), [ug(e), ug(l)]);
}
function ug(a) {
  return Array.isArray(a) ? a.join(" ") : a;
}
const gh = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function $2(a, e, l) {
  for (const s in e)
    !Ce(e[s]) && !j2(s, l) && (a[s] = e[s]);
}
function G9({ transformTemplate: a }, e) {
  return j.useMemo(() => {
    const l = gh();
    return ph(l, e, a), Object.assign({}, l.vars, l.style);
  }, [e]);
}
function X9(a, e) {
  const l = a.style || {}, s = {};
  return $2(s, l, a), Object.assign(s, G9(a, e)), s;
}
function P9(a, e) {
  const l = {}, s = X9(a, e);
  return a.drag && a.dragListener !== !1 && (l.draggable = !1, s.userSelect = s.WebkitUserSelect = s.WebkitTouchCallout = "none", s.touchAction = a.drag === !0 ? "none" : `pan-${a.drag === "x" ? "y" : "x"}`), a.tabIndex === void 0 && (a.onTap || a.onTapStart || a.whileTap) && (l.tabIndex = 0), l.style = s, l;
}
const q2 = () => ({
  ...gh(),
  attrs: {}
});
function K9(a, e, l, s) {
  const r = j.useMemo(() => {
    const c = q2();
    return E2(c, e, M2(s), a.transformTemplate, a.style), {
      ...c.attrs,
      style: { ...c.style }
    };
  }, [e]);
  if (a.style) {
    const c = {};
    $2(c, a.style, a), r.style = { ...c, ...r.style };
  }
  return r;
}
const Z9 = /* @__PURE__ */ new Set([
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
function Or(a) {
  return a.startsWith("while") || a.startsWith("drag") && a !== "draggable" || a.startsWith("layout") || a.startsWith("onTap") || a.startsWith("onPan") || a.startsWith("onLayout") || Z9.has(a);
}
let Y2 = (a) => !Or(a);
function Q9(a) {
  typeof a == "function" && (Y2 = (e) => e.startsWith("on") ? !Or(e) : a(e));
}
try {
  Q9(require("@emotion/is-prop-valid").default);
} catch {
}
function F9(a, e, l) {
  const s = {};
  for (const r in a)
    r === "values" && typeof a.values == "object" || Ce(a[r]) || (Y2(r) || l === !0 && Or(r) || !e && !Or(r) || // If trying to use native HTML drag events, forward drag listeners
    a.draggable && r.startsWith("onDrag")) && (s[r] = a[r]);
  return s;
}
const J9 = [
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
function vh(a) {
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
      !!(J9.indexOf(a) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(a))
    )
  );
}
function W9(a, e, l, { latestValues: s }, r, c = !1, f) {
  const y = (f ?? vh(a) ? K9 : P9)(e, s, r, a), p = F9(e, typeof a == "string", c), g = a !== j.Fragment ? { ...p, ...y, ref: l } : {}, { children: v } = e, b = j.useMemo(() => Ce(v) ? v.get() : v, [v]);
  return j.createElement(a, {
    ...g,
    children: b
  });
}
const Yr = /* @__PURE__ */ j.createContext(null);
function bh(a) {
  const e = j.useRef(null);
  return e.current === null && (e.current = a()), e.current;
}
function I9({ scrapeMotionValuesFromProps: a, createRenderState: e }, l, s, r) {
  return {
    latestValues: t6(l, s, r, a),
    renderState: e()
  };
}
function t6(a, e, l, s) {
  const r = {}, c = s(a, {});
  for (const b in c)
    r[b] = xr(c[b]);
  let { initial: f, animate: h } = a;
  const y = qr(a), p = y2(a);
  e && p && !y && a.inherit !== !1 && (f === void 0 && (f = e.initial), h === void 0 && (h = e.animate));
  let g = l ? l.initial === !1 : !1;
  g = g || f === !1;
  const v = g ? h : f;
  if (v && typeof v != "boolean" && !$r(v)) {
    const b = Array.isArray(v) ? v : [v];
    for (let T = 0; T < b.length; T++) {
      const w = sh(a, b[T]);
      if (w) {
        const { transitionEnd: S, transition: E, ...M } = w;
        for (const R in M) {
          let D = M[R];
          if (Array.isArray(D)) {
            const N = g ? D.length - 1 : 0;
            D = D[N];
          }
          D !== null && (r[R] = D);
        }
        for (const R in S)
          r[R] = S[R];
      }
    }
  }
  return r;
}
const G2 = (a) => (e, l) => {
  const s = j.useContext(Ur), r = j.useContext(Yr), c = () => I9(a, e, s, r);
  return l ? c() : bh(c);
}, e6 = /* @__PURE__ */ G2({
  scrapeMotionValuesFromProps: yh,
  createRenderState: gh
}), n6 = /* @__PURE__ */ G2({
  scrapeMotionValuesFromProps: _2,
  createRenderState: q2
}), cg = {
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
let fg = !1;
function a6() {
  if (fg)
    return;
  const a = {};
  for (const e in cg)
    a[e] = {
      isEnabled: (l) => cg[e].some((s) => !!l[s])
    };
  v2(a), fg = !0;
}
function X2() {
  return a6(), Nw();
}
function dg(a) {
  const e = X2();
  for (const l in a)
    e[l] = {
      ...e[l],
      ...a[l]
    };
  v2(e);
}
const i6 = Symbol.for("motionComponentSymbol");
function l6(a, e, l) {
  const s = j.useRef(l);
  j.useInsertionEffect(() => {
    s.current = l;
  });
  const r = j.useRef(null);
  return j.useCallback((c) => {
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
const P2 = j.createContext({});
function Gi(a) {
  return a && typeof a == "object" && Object.prototype.hasOwnProperty.call(a, "current");
}
const s6 = typeof window < "u", xh = s6 ? j.useLayoutEffect : j.useEffect;
function o6(a, e, l, s, r, c) {
  const { visualElement: f } = j.useContext(Ur), h = j.useContext(Qd), y = j.useContext(Yr), p = j.useContext(Fd), g = p.reducedMotion, v = p.skipAnimations, b = j.useRef(null), T = j.useRef(!1);
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
  const w = b.current, S = j.useContext(P2);
  w && !w.projection && r && (w.type === "html" || w.type === "svg") && r6(b.current, l, r, S);
  const E = j.useRef(!1);
  j.useInsertionEffect(() => {
    w && E.current && w.update(l, y);
  });
  const M = l[i2], R = j.useRef(!!M && typeof window < "u" && !window.MotionHandoffIsComplete?.(M) && window.MotionHasOptimisedAnimation?.(M));
  return xh(() => {
    T.current = !0, w && (E.current = !0, window.MotionIsMounted = !0, w.updateFeatures(), w.scheduleRenderMicrotask(), R.current && w.animationState && w.animationState.animateChanges());
  }), j.useEffect(() => {
    w && (!R.current && w.animationState && w.animationState.animateChanges(), R.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(M);
    }), R.current = !1), w.enteringChildren = void 0);
  }), w;
}
function r6(a, e, l, s) {
  const { layoutId: r, layout: c, drag: f, dragConstraints: h, layoutScroll: y, layoutRoot: p, layoutAnchor: g, layoutCrossfade: v } = e;
  a.projection = new l(a.latestValues, e["data-framer-portal-id"] ? void 0 : K2(a.parent)), a.projection.setOptions({
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
function K2(a) {
  if (a)
    return a.options.allowProjection !== !1 ? a.projection : K2(a.parent);
}
function u6(a, { forwardMotionProps: e = !1, type: l } = {}, s, r) {
  const c = l ? l === "svg" : vh(a), f = c ? n6 : e6;
  function h(p, g) {
    let v;
    const b = {
      ...j.useContext(Fd),
      ...p,
      layoutId: c6(p)
    }, { isStatic: T } = b, w = Y9(p), S = f(p, T);
    if (!T && typeof window < "u") {
      f6();
      const E = d6(b);
      v = E.MeasureLayout, w.visualElement = o6(a, S, b, r, E.ProjectionNode, c);
    }
    return m.jsxs(Ur.Provider, { value: w, children: [v && w.visualElement ? m.jsx(v, { visualElement: w.visualElement, ...b }) : null, W9(a, p, l6(S, w.visualElement, g), S, T, e, c)] });
  }
  h.displayName = `motion.${typeof a == "string" ? a : `create(${a.displayName ?? a.name ?? ""})`}`;
  const y = j.forwardRef(h);
  return y[i6] = a, y;
}
function c6({ layoutId: a }) {
  const e = j.useContext(Zd).id;
  return e && a !== void 0 ? e + "-" + a : a;
}
function f6(a, e) {
  j.useContext(Qd).strict;
}
function d6(a) {
  const e = X2(), { drag: l, layout: s } = e;
  if (!l && !s)
    return {};
  const r = { ...l, ...s };
  return {
    MeasureLayout: l?.isEnabled(a) || s?.isEnabled(a) ? r.MeasureLayout : void 0,
    ProjectionNode: r.ProjectionNode
  };
}
function Sh(a, e) {
  return u6(a, e);
}
const h6 = /* @__PURE__ */ Sh("button"), el = /* @__PURE__ */ Sh("div"), m6 = /* @__PURE__ */ Sh("span");
var p6 = {
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
function y6({
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
    const v = p6[p], b = Math.min(
      ...v.map((T) => {
        const w = h[T.corner];
        if (g === 0 && w === 0)
          return 0;
        const S = f[T.corner], E = T.side === "top" || T.side === "bottom" ? r : c;
        return S >= 0 ? E - S : g / (g + w) * E;
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
function us(a) {
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
var Ss = {
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
var g6 = ({
  cornerRadius: a,
  roundingAndSmoothingBudget: e
}) => {
  const l = Math.min(a, e);
  return l <= 0 ? Ss : {
    p: l,
    pathSegment: (s) => {
      const r = mn(l, l, s), c = pn(l, l, s);
      return Ze`a ${l} ${l} 0 0 1 ${r} ${c}`;
    }
  };
};
function wh({
  cornerRadius: a,
  cornerSmoothing: e,
  preserveSmoothing: l,
  roundingAndSmoothingBudget: s
}) {
  if (a <= 0)
    return { a: 0, b: 0, c: 0, d: 0, p: 0, arcSectionLength: 0, cornerRadius: 0 };
  let r = (1 + e) * a;
  if (!l) {
    const w = s / a - 1;
    e = Math.min(e, w), r = Math.min(r, s);
  }
  const c = 90 * (1 - e), f = Math.sin(us(c / 2)) * a * Math.sqrt(2), h = (90 - c) / 2, y = a * Math.tan(us(h / 2)), p = 45 * e, g = y * Math.cos(us(p)), v = g * Math.tan(us(p));
  let b = (r - f - g - v) / 3, T = 2 * b;
  if (l && r > s) {
    const w = s - v - f - g, S = w / 6, E = w - S;
    b = Math.min(b, E), T = w - b, r = Math.min(r, s);
  }
  return { a: T, b, c: g, d: v, p: r, arcSectionLength: f, cornerRadius: a };
}
var v6 = ({
  cornerRadius: a,
  smoothing: e,
  preserveSmoothing: l,
  roundingAndSmoothingBudget: s
}) => {
  const r = wh({
    cornerRadius: a,
    cornerSmoothing: e,
    preserveSmoothing: l,
    roundingAndSmoothingBudget: s
  });
  return r.cornerRadius <= 0 ? Ss : {
    p: r.p,
    pathSegment: (c) => {
      switch (c) {
        case "TR":
          return b6(r);
        case "BR":
          return x6(r);
        case "BL":
          return S6(r);
        case "TL":
          return w6(r);
      }
    }
  };
};
function b6({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Ze`c ${e} 0 ${e + l} 0 ${e + l + s} ${r} a ${a} ${a} 0 0 1 ${c} ${c} c ${r} ${s} ${r} ${l + s} ${r} ${e + l + s}`;
}
function x6({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Ze`c 0 ${e} 0 ${e + l} ${-r} ${e + l + s} a ${a} ${a} 0 0 1 -${c} ${c} c ${-s} ${r} ${-(l + s)} ${r} ${-(e + l + s)} ${r}`;
}
function S6({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Ze`c ${-e} 0 ${-(e + l)} 0 ${-(e + l + s)} ${-r} a ${a} ${a} 0 0 1 -${c} -${c} c ${-r} ${-s} ${-r} ${-(l + s)} ${-r} ${-(e + l + s)}`;
}
function w6({
  cornerRadius: a,
  a: e,
  b: l,
  c: s,
  d: r,
  arcSectionLength: c
}) {
  return Ze`c 0 ${-e} 0 ${-(e + l)} ${r} ${-(e + l + s)} a ${a} ${a} 0 0 1 ${c} -${c} c ${s} ${-r} ${l + s} ${-r} ${e + l + s} ${-r}`;
}
var T6 = ({
  cornerRadius: a,
  exponent: e,
  roundingAndSmoothingBudget: l
}) => {
  const s = Math.min(a, l);
  if (s <= 0) return Ss;
  const r = Number.isFinite(e) ? Math.max(2, e) : 4, c = 2 / r, f = r === 2 ? (b) => b : r === 4 ? Math.sqrt : r === 8 ? (b) => Math.sqrt(Math.sqrt(b)) : (b) => Math.pow(b, c), h = c - 1, y = r === 2 ? () => 1 : r === 4 ? (b) => 1 / Math.sqrt(b) : (b) => Math.pow(b, h), p = [0, Math.PI / 6, Math.PI / 3, Math.PI / 2], g = p.map((b, T) => {
    if (T === 0) return [0, 0];
    if (T === p.length - 1) return [s, s];
    const w = Math.sin(b), S = Math.cos(b);
    return [s * f(w), s * (1 - f(S))];
  }), v = p.map((b, T) => {
    if (T === 0) return [1, 0];
    if (T === p.length - 1) return [0, 1];
    const w = Math.sin(b), S = Math.cos(b), E = c * y(w) * S * s, M = c * y(S) * w * s, R = Math.hypot(E, M) || 1;
    return [E / R, M / R];
  });
  return {
    p: s,
    pathSegment: (b) => {
      const T = [];
      for (let w = 0; w < p.length - 1; w++) {
        const [S, E] = g[w], [M, R] = g[w + 1], [D, N] = v[w], [V, z] = v[w + 1], A = (p[w] + p[w + 1]) / 2, H = Math.sin(A), G = Math.cos(A), K = s * f(H), nt = s * (1 - f(G)), at = 8 / 3 * (K - (S + M) / 2), tt = 8 / 3 * (nt - (E + R) / 2), Z = V * N - z * D, it = Z !== 0 ? (-z * at + V * tt) / Z : 0, L = Z !== 0 ? (D * tt - N * at) / Z : 0, $ = S + it * D, et = E + it * N, st = M - L * V, J = R - L * z, _ = $ - S, U = et - E, I = st - S, lt = J - E, ft = M - S, pt = R - E, vt = mn(_, U, b), Rt = pn(_, U, b), Mt = mn(I, lt, b), Pt = pn(I, lt, b), Kt = mn(ft, pt, b), pe = pn(ft, pt, b);
        T.push(Ze`c ${vt} ${Rt} ${Mt} ${Pt} ${Kt} ${pe}`);
      }
      return T.join(" ");
    }
  };
};
function hg(a, e, l, s) {
  if (s <= 0) return { x: 0, y: 0, theta: a };
  const c = s / 32;
  let f = 0, h = 0;
  for (let p = 1; p <= 32; p++) {
    const g = (p - 1) * c, v = g + c, b = (g + v) / 2, T = a + e * g + l / 2 * g * g, w = a + e * v + l / 2 * v * v, S = a + e * b + l / 2 * b * b;
    f += c / 6 * (Math.cos(T) + 4 * Math.cos(S) + Math.cos(w)), h += c / 6 * (Math.sin(T) + 4 * Math.sin(S) + Math.sin(w));
  }
  const y = a + e * s + l / 2 * s * s;
  return { x: f, y: h, theta: y };
}
var C6 = 1e-6, j6 = ({
  cornerRadius: a,
  smoothing: e,
  roundingAndSmoothingBudget: l
}) => {
  if (a <= 0) return Ss;
  const s = Math.max(0, Math.min(1, e)), r = a, c = Math.PI / 4 * s, f = Math.PI / 2 * r * s, h = f > 0 ? 1 / (r * f) : 0, { x: y, y: p } = f > 0 ? hg(0, 0, h, f) : { x: 0, y: 0 }, { x: g, y: v } = f > 0 ? hg(0, 0, h, f / 2) : { x: 0, y: 0 }, b = y - r * Math.sin(c), T = p + r * Math.cos(c), w = b + T;
  let S = w, E = r, M = y, R = p, D = g, N = v;
  if (w > l && w > 0) {
    const G = l / w;
    S = l, E = r * G, M = y * G, R = p * G, D = g * G, N = v * G;
  }
  if (S <= 0)
    return Ss;
  let V = 0, z = 0;
  if (f > 0) {
    const G = Math.cos(c), K = Math.sin(c);
    K > 1e-12 && (z = 8 / 3 * (R / 2 - N) / K), V = 8 / 3 * (D - M / 2) + z * G;
  }
  const A = Math.PI / 2 - 2 * c, H = Math.abs(A) > C6;
  return {
    p: S,
    pathSegment: (G) => {
      const K = [];
      if (f > 0) {
        const nt = V, at = 0, tt = M - z * Math.cos(c), Z = R - z * Math.sin(c), it = M, L = R, $ = mn(nt, at, G), et = pn(nt, at, G), st = mn(tt, Z, G), J = pn(tt, Z, G), _ = mn(it, L, G), U = pn(it, L, G);
        K.push(Ze`c ${$} ${et} ${st} ${J} ${_} ${U}`);
      }
      if (H) {
        const nt = S - M - R, at = S - M - R, tt = mn(nt, at, G), Z = pn(nt, at, G);
        K.push(Ze`a ${E} ${E} 0 0 1 ${tt} ${Z}`);
      }
      if (f > 0) {
        const nt = z * Math.sin(c), at = z * Math.cos(c), tt = R, Z = M - V, it = R, L = M, $ = mn(nt, at, G), et = pn(nt, at, G), st = mn(tt, Z, G), J = pn(tt, Z, G), _ = mn(it, L, G), U = pn(it, L, G);
        K.push(Ze`c ${$} ${et} ${st} ${J} ${_} ${U}`);
      }
      return K.join(" ");
    }
  };
}, E6 = 4, A6 = {
  arc: g6,
  squircle: v6,
  superellipse: T6,
  clothoid: j6
};
function M6(a) {
  return A6[a];
}
var _6 = 64, Za = /* @__PURE__ */ new Map();
function D6(a, e) {
  return a + "|" + e.cornerRadius + "|" + e.smoothing + "|" + e.exponent + "|" + (e.preserveSmoothing ? 1 : 0) + "|" + e.roundingAndSmoothingBudget;
}
function R6(a) {
  return !Number.isFinite(a.cornerRadius) || !Number.isFinite(a.smoothing) || !Number.isFinite(a.exponent) || !Number.isFinite(a.roundingAndSmoothingBudget);
}
function N6(a) {
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
function O6(a, e, l) {
  if (R6(l)) return e(l);
  const s = D6(a, l), r = Za.get(s);
  if (r)
    return Za.delete(s), Za.set(s, r), r;
  const c = N6(e(l));
  if (Za.size >= _6) {
    const f = Za.keys().next().value;
    f !== void 0 && Za.delete(f);
  }
  return Za.set(s, c), c;
}
function Io(a, e, l, s) {
  const r = Math.min(e, s / a - 1), c = wh({
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
function z6({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Ze`c ${a} 0 ${a + e} 0 ${r} ${s} a ${h} ${h} 0 0 1 ${c} ${f} a ${h} ${h} 0 0 1 ${-c} ${f} c ${-l} ${s} ${-(e + l)} ${s} ${-r} ${s}`;
}
function B6({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Ze`c ${-a} 0 ${-(a + e)} 0 ${-r} ${-s} a ${h} ${h} 0 0 1 ${-c} ${-f} a ${h} ${h} 0 0 1 ${c} ${-f} c ${l} ${-s} ${e + l} ${-s} ${r} ${-s}`;
}
function L6({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Ze`c 0 ${-a} 0 ${-(a + e)} ${s} ${-r} a ${h} ${h} 0 0 1 ${f} ${-c} a ${h} ${h} 0 0 1 ${f} ${c} c ${s} ${l} ${s} ${e + l} ${s} ${r}`;
}
function V6({ a, b: e, c: l, d: s, e: r, ax: c, ay: f, R: h }) {
  return Ze`c 0 ${a} 0 ${a + e} ${-s} ${r} a ${h} ${h} 0 0 1 ${-f} ${c} a ${h} ${h} 0 0 1 ${-f} ${-c} c ${-s} ${-l} ${-s} ${-(e + l)} ${-s} ${-r}`;
}
function mg(a, e, l, s) {
  const r = wh({
    cornerRadius: a,
    cornerSmoothing: e,
    preserveSmoothing: l,
    roundingAndSmoothingBudget: s
  }), c = us(45 * e);
  return {
    a: r.a,
    b: r.b,
    p: r.p,
    sin: Math.sin(c),
    cos: Math.cos(c)
  };
}
var pg = (a, e, l) => Math.max(0, Math.min(a / e - 1, l)), he = (a) => (Object.is(a, -0) ? 0 : a).toFixed(4);
function k6(a, e, l, s, r) {
  const c = mg(l, pg(a / 2, l, s), r, a / 2), f = mg(l, pg(e / 2, l, s), r, e / 2), h = (b, T, w, S, E, M) => {
    const R = S === 0 ? c : f, D = M === 0 ? c : f, N = b + (w + E) * l, V = T + (S + M) * l, z = N - E * l * R.cos - w * l * R.sin, A = V - M * l * R.cos - S * l * R.sin, H = N - w * l * D.cos - E * l * D.sin, G = V - S * l * D.cos - M * l * D.sin, K = b + w * R.p, nt = T + S * R.p, at = Math.hypot(H - z, G - A) > 1e-6, tt = at ? H : z, Z = at ? G : A, it = b + E * D.p, L = T + M * D.p;
    let $ = `L ${he(K)} ${he(nt)} `;
    return $ += `c ${he(-w * R.a)} ${he(-S * R.a)} ${he(-w * (R.a + R.b))} ${he(-S * (R.a + R.b))} ${he(z - K)} ${he(A - nt)} `, at && ($ += `a ${he(l)} ${he(l)} 0 0 1 ${he(H - z)} ${he(G - A)} `), $ += `c ${he(it - E * (D.a + D.b) - tt)} ${he(L - M * (D.a + D.b) - Z)} ${he(it - E * D.a - tt)} ${he(L - M * D.a - Z)} ${he(it - tt)} ${he(L - Z)}`, $;
  }, y = h(a, 0, -1, 0, 0, 1), p = h(a, e, 0, -1, -1, 0), g = h(0, e, 1, 0, 0, -1), v = h(0, 0, 0, 1, 1, 0);
  return `M ${he(c.p)} 0 ${y} ${p} ${g} ${v} Z`;
}
var U6 = 0.6, H6 = !0, $6 = "squircle";
function Z2(a) {
  return {
    radius: a.radius,
    curve: a.curve ?? $6,
    smoothing: a.smoothing ?? U6,
    exponent: a.exponent ?? E6,
    preserveSmoothing: a.preserveSmoothing ?? H6
  };
}
function tr(a) {
  return Z2(typeof a == "number" ? { radius: a } : a ?? { radius: 0 });
}
function q6(a) {
  if ("radius" in a) {
    const e = Z2(a);
    return { topLeft: e, topRight: e, bottomRight: e, bottomLeft: e };
  }
  return {
    topLeft: tr(a.topLeft),
    topRight: tr(a.topRight),
    bottomRight: tr(a.bottomRight),
    bottomLeft: tr(a.bottomLeft)
  };
}
function Q2(a, e, l) {
  if (a <= 0 || e <= 0)
    return "M 0 0 H 0 V 0 H 0 Z";
  const s = q6(l);
  if (s.topLeft.radius <= 0 && s.topRight.radius <= 0 && s.bottomRight.radius <= 0 && s.bottomLeft.radius <= 0)
    return `M 0 0 H ${a} V ${e} H 0 Z`;
  const r = y6({
    topLeftCornerRadius: s.topLeft.radius,
    topRightCornerRadius: s.topRight.radius,
    bottomRightCornerRadius: s.bottomRight.radius,
    bottomLeftCornerRadius: s.bottomLeft.radius,
    width: a,
    height: e
  }), c = (R) => {
    const D = s[R], N = M6(D.curve);
    return O6(D.curve, N, {
      cornerRadius: r[R].radius,
      smoothing: D.smoothing,
      exponent: D.exponent,
      preserveSmoothing: D.preserveSmoothing,
      roundingAndSmoothingBudget: r[R].roundingAndSmoothingBudget
    });
  }, f = (R) => {
    let D;
    return () => D ?? (D = c(R));
  }, h = f("topLeft"), y = f("topRight"), p = f("bottomRight"), g = f("bottomLeft"), v = (R) => R.toFixed(4), b = (R) => R.length > 0 ? " " + R : "", T = s.topLeft;
  if (Y6(s)) {
    const R = Math.min(T.radius, a / 2, e / 2), D = Math.min(a, e) / 2, N = 1e-9;
    if (R > 0 && D > R + N && D < (1 + T.smoothing) * R - N)
      return k6(a, e, R, T.smoothing, T.preserveSmoothing);
  }
  const w = 1e-9, S = a >= e, E = S ? e / 2 : a / 2, M = (R, D) => {
    const N = s[R], V = s[D];
    return N.curve === "squircle" && V.curve === "squircle" && Math.abs(r[R].radius - E) < w && Math.abs(r[D].radius - E) < w && N.smoothing === V.smoothing && N.preserveSmoothing === V.preserveSmoothing;
  };
  if (S) {
    const R = M("topRight", "bottomRight"), D = M("topLeft", "bottomLeft");
    if (R || D) {
      const N = a / 2, V = R ? Io(E, s.topRight.smoothing, s.topRight.preserveSmoothing, N) : null, z = D ? Io(E, s.topLeft.smoothing, s.topLeft.preserveSmoothing, N) : null;
      let A = "M " + v(z ? z.p : h().p) + " 0";
      return A += " L " + v(a - (V ? V.p : y().p)) + " 0", V ? A += " " + z6(V) : (A += b(y().pathSegment("TR")), A += " L " + v(a) + " " + v(p().p), A += " L " + v(a) + " " + v(e - p().p), A += b(p().pathSegment("BR"))), z ? (A += " L " + v(z.p) + " " + v(e), A += " " + B6(z)) : (A += " L " + v(a - g().p) + " " + v(e), A += " L " + v(g().p) + " " + v(e), A += b(g().pathSegment("BL")), A += " L 0 " + v(e - h().p), A += " L 0 " + v(h().p), A += b(h().pathSegment("TL"))), A + " Z";
    }
  } else {
    const R = M("topLeft", "topRight"), D = M("bottomLeft", "bottomRight");
    if (R || D) {
      const N = e / 2, V = R ? Io(E, s.topLeft.smoothing, s.topLeft.preserveSmoothing, N) : null, z = D ? Io(E, s.bottomLeft.smoothing, s.bottomLeft.preserveSmoothing, N) : null;
      let A;
      return V ? A = "M 0 " + v(V.p) + " " + L6(V) : (A = "M " + v(h().p) + " 0", A += " L " + v(a - y().p) + " 0", A += b(y().pathSegment("TR"))), A += " L " + v(a) + " " + v(e - (z ? z.p : p().p)), z ? A += " " + V6(z) : (A += b(p().pathSegment("BR")), A += " L " + v(g().p) + " " + v(e), A += b(g().pathSegment("BL"))), V ? A += " L 0 " + v(V.p) : (A += " L 0 " + v(e - h().p), A += " L 0 " + v(h().p), A += b(h().pathSegment("TL"))), A + " Z";
    }
  }
  return "M " + v(h().p) + " 0 L " + v(a - y().p) + " 0" + b(y().pathSegment("TR")) + " L " + v(a) + " " + v(p().p) + " L " + v(a) + " " + v(e - p().p) + b(p().pathSegment("BR")) + " L " + v(a - g().p) + " " + v(e) + " L " + v(g().p) + " " + v(e) + b(g().pathSegment("BL")) + " L 0 " + v(e - h().p) + " L 0 " + v(h().p) + b(h().pathSegment("TL")) + " Z";
}
function Y6(a) {
  const e = a.topLeft;
  return e.curve === "squircle" && [a.topRight, a.bottomRight, a.bottomLeft].every(
    (l) => l.curve === "squircle" && l.radius === e.radius && l.smoothing === e.smoothing && l.preserveSmoothing === e.preserveSmoothing
  );
}
function G6(a, e, l) {
  return `path("${Q2(a, e, l)}")`;
}
var $t = "http://www.w3.org/2000/svg", X6 = 0;
function Th() {
  return ++X6;
}
function F2(a) {
  const e = a.replace("#", "");
  return e.length === 3 ? "#" + e[0] + e[0] + e[1] + e[1] + e[2] + e[2] : "#" + e;
}
function J2(a) {
  const e = F2(a).replace("#", "");
  return `rgb(${parseInt(e.substring(0, 2), 16)},${parseInt(e.substring(2, 4), 16)},${parseInt(e.substring(4, 6), 16)})`;
}
var P6 = {
  offsetX: 0,
  offsetY: 0,
  blur: 0,
  spread: 0,
  color: "#000",
  opacity: 0
};
function W2(a) {
  const e = /* @__PURE__ */ new Map(), l = JSON.stringify(a);
  return (s, r, c, f) => {
    const h = `${s}:${r}:${f}:${l}`;
    let y = e.get(h);
    return y === void 0 && (y = Q2(s, r, c), e.set(h, y)), y;
  };
}
function I2(a, e) {
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
function jd(a) {
  const e = F2(a).replace("#", ""), l = parseInt(e.substring(0, 2), 16), s = parseInt(e.substring(2, 4), 16), r = parseInt(e.substring(4, 6), 16);
  if (l === 0 && s === 0 && r === 0) return "#4c4c4c";
  const c = Math.round(l * 2 / 3), f = Math.round(s * 2 / 3), h = Math.round(r * 2 / 3);
  return "#" + (1 << 24 | c << 16 | f << 8 | h).toString(16).slice(1);
}
function Ed(a) {
  return typeof a == "object" && a !== null && "type" in a;
}
function K6(a) {
  const e = (90 - a) * Math.PI / 180;
  return {
    x1: 0.5 - 0.5 * Math.cos(e),
    y1: 0.5 + 0.5 * Math.sin(e),
    x2: 0.5 + 0.5 * Math.cos(e),
    y2: 0.5 - 0.5 * Math.sin(e)
  };
}
function tb(a, e) {
  for (; a.lastChild; ) a.removeChild(a.lastChild);
  for (const l of e) {
    const s = document.createElementNS($t, "stop");
    s.setAttribute("offset", String(l.offset)), s.setAttribute("stop-color", l.color), l.opacity !== void 0 && l.opacity !== 1 && s.setAttribute("stop-opacity", String(l.opacity)), a.appendChild(s);
  }
}
function Z6(a, e, l) {
  const s = e.type === "linear" ? "linearGradient" : "radialGradient", r = document.createElementNS($t, s);
  return r.setAttribute("id", l), eb(r, e), tb(r, e.stops), a.appendChild(r), r;
}
function Q6(a, e) {
  eb(a, e), tb(a, e.stops);
}
function eb(a, e) {
  if (e.type === "linear") {
    const l = K6(e.angle ?? 0);
    a.setAttribute("x1", String(l.x1)), a.setAttribute("y1", String(l.y1)), a.setAttribute("x2", String(l.x2)), a.setAttribute("y2", String(l.y2));
  } else
    a.setAttribute("cx", String(e.cx ?? 0.5)), a.setAttribute("cy", String(e.cy ?? 0.5)), a.setAttribute("r", String(e.r ?? 0.5));
}
function yg(a) {
  return { ...a, stops: a.stops.map((e) => ({ ...e, color: jd(e.color) })) };
}
function Ad(a, e, l, s) {
  a.setAttribute("x", String(-e)), a.setAttribute("y", String(-e)), a.setAttribute("width", String(l + e * 2)), a.setAttribute("height", String(s + e * 2));
}
function er(a, e, l, s, r) {
  Ad(a, l, s, r), Ad(e, l, s, r);
}
function zf(a, e, l) {
  const s = document.createElementNS($t, "mask");
  s.setAttribute("id", a), l && s.setAttribute("maskUnits", "userSpaceOnUse");
  const r = document.createElementNS($t, "rect");
  r.setAttribute("fill", "white");
  const c = document.createElementNS($t, "path");
  return c.setAttribute("fill", "none"), c.setAttribute("stroke", "black"), s.appendChild(r), s.appendChild(c), e.appendChild(s), { mask: s, rect: r, knockout: c };
}
function Bf(a) {
  const e = document.createElementNS($t, "g"), l = document.createElementNS($t, "path");
  l.setAttribute("fill", "none"), a && l.setAttribute(a.attr, a.value), l.style.display = "none", e.appendChild(l);
  const s = document.createElementNS($t, "path");
  return s.setAttribute("fill", "none"), a && s.setAttribute(a.attr, a.value), s.style.display = "none", e.appendChild(s), { group: e, strokePath: l, grooveOverlay: s };
}
function wr(a, e) {
  const l = e === "main" ? "gradientEl" : "overlayGradientEl";
  a[l]?.remove(), a[l] = null;
}
function nr(a, e, l) {
  if (!Ed(a))
    return wr(e, l), a;
  const s = l === "main" ? "gradientEl" : "overlayGradientEl", r = l === "main" ? e.gradientId : e.overlayGradientId;
  return e[s] ? Q6(e[s], a) : e[s] = Z6(e.defs, a, r), `url(#${r})`;
}
function Lf(a, e, l, s, r) {
  if (!a || a.width <= 0 || a.opacity <= 0) {
    r.strokePath.style.display = "none", r.strokeGroup.removeAttribute("mask"), r.grooveOverlay.style.display = "none", wr(r, "main"), wr(r, "overlay");
    return;
  }
  const c = r.strokeMultiplier;
  r.strokePath.style.display = "", r.strokePath.setAttribute("d", e), r.strokePath.setAttribute("stroke", nr(a.color, r, "main")), r.strokePath.setAttribute("stroke-width", String(a.width * c)), r.strokePath.setAttribute("stroke-opacity", String(a.opacity));
  const f = a.style ?? "solid";
  switch (r.strokeGroup.removeAttribute("mask"), r.grooveOverlay.style.display = "none", r.strokePath.removeAttribute("stroke-dasharray"), r.strokePath.setAttribute("stroke-linecap", "butt"), f !== "groove" && f !== "ridge" && wr(r, "overlay"), f) {
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
      const h = Ed(a.color) ? yg(a.color) : jd(a.color);
      r.strokePath.setAttribute("stroke", nr(h, r, "main")), r.grooveOverlay.style.display = "", r.grooveOverlay.setAttribute("d", e), r.grooveOverlay.setAttribute("stroke", nr(a.color, r, "overlay")), r.grooveOverlay.setAttribute("stroke-width", String(a.width * c / 2)), r.grooveOverlay.setAttribute("stroke-opacity", String(a.opacity));
      break;
    }
    case "ridge": {
      const h = Ed(a.color) ? yg(a.color) : jd(a.color);
      r.grooveOverlay.style.display = "", r.grooveOverlay.setAttribute("d", e), r.grooveOverlay.setAttribute("stroke", nr(h, r, "overlay")), r.grooveOverlay.setAttribute("stroke-width", String(a.width * c / 2)), r.grooveOverlay.setAttribute("stroke-opacity", String(a.opacity));
      break;
    }
  }
}
function F6(a, e) {
  const l = Th(), s = `sc-ishadow-mask-${l}`, r = document.createElementNS($t, "mask");
  r.setAttribute("id", s), r.setAttribute("maskUnits", "userSpaceOnUse");
  const c = document.createElementNS($t, "rect");
  c.setAttribute("fill", "white");
  const f = document.createElementNS($t, "path");
  f.setAttribute("fill", "black"), r.appendChild(c), r.appendChild(f), a.appendChild(r);
  const h = `sc-ishadow-blur-${l}`, y = document.createElementNS($t, "filter");
  y.setAttribute("id", h), y.setAttribute("x", "-200%"), y.setAttribute("y", "-200%"), y.setAttribute("width", "500%"), y.setAttribute("height", "500%"), y.setAttribute("color-interpolation-filters", "sRGB");
  const p = document.createElementNS($t, "feGaussianBlur");
  p.setAttribute("stdDeviation", "0"), y.appendChild(p), a.appendChild(y);
  const g = document.createElementNS($t, "g"), v = document.createElementNS($t, "rect");
  return v.setAttribute("mask", `url(#${s})`), v.style.display = "none", g.appendChild(v), e.appendChild(g), { maskId: s, mask: r, maskRect: c, maskCutout: f, filterId: h, filter: y, feBlur: p, blurGroup: g, rect: v };
}
function J6(a) {
  a.mask.remove(), a.filter.remove(), a.blurGroup.remove();
}
function W6(a) {
  const e = Th(), l = `sc-clip-${e}`, s = `sc-mask-${e}`, r = document.createElementNS($t, "svg");
  r.style.position = "absolute", r.style.inset = "0", r.style.pointerEvents = "none", r.style.overflow = "visible", r.style.zIndex = "1", r.setAttribute("aria-hidden", "true");
  const c = document.createElementNS($t, "defs"), f = document.createElementNS($t, "clipPath");
  f.setAttribute("id", l);
  const h = document.createElementNS($t, "path");
  f.appendChild(h), c.appendChild(f);
  const y = document.createElementNS($t, "mask");
  y.setAttribute("id", s), y.setAttribute("maskUnits", "userSpaceOnUse");
  const p = document.createElementNS($t, "rect");
  p.setAttribute("fill", "white");
  const g = document.createElementNS($t, "path");
  g.setAttribute("fill", "black"), y.appendChild(p), y.appendChild(g), c.appendChild(y);
  const v = `sc-dbl-inner-${e}`, { rect: b, knockout: T } = zf(v, c, !1), w = `sc-dbl-outer-${e}`, { mask: S, rect: E, knockout: M } = zf(w, c, !0), R = `sc-dbl-middle-${e}`, { mask: D, rect: N, knockout: V } = zf(R, c, !0);
  r.appendChild(c);
  const z = document.createElementNS($t, "g");
  z.setAttribute("clip-path", `url(#${l})`), r.appendChild(z);
  const A = [], { group: H, strokePath: G, grooveOverlay: K } = Bf({ attr: "clip-path", value: `url(#${l})` });
  r.appendChild(H);
  const { group: nt, strokePath: at, grooveOverlay: tt } = Bf({ attr: "mask", value: `url(#${s})` });
  r.appendChild(nt);
  const { group: Z, strokePath: it, grooveOverlay: L } = Bf();
  r.appendChild(Z), a.appendChild(r);
  const $ = {
    strokePath: G,
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
  }, et = {
    strokePath: at,
    grooveOverlay: tt,
    strokeGroup: nt,
    dblMaskId: w,
    dblKnockout: M,
    dblRect: E,
    strokeMultiplier: 2,
    defs: c,
    gradientEl: null,
    gradientId: `sc-grad-outer-${e}`,
    overlayGradientEl: null,
    overlayGradientId: `sc-grad-outer-ov-${e}`,
    padDblMask: (J, _, U) => er(S, E, J, _, U)
  }, st = {
    strokePath: it,
    grooveOverlay: L,
    strokeGroup: Z,
    dblMaskId: R,
    dblKnockout: V,
    dblRect: N,
    strokeMultiplier: 1,
    defs: c,
    gradientEl: null,
    gradientId: `sc-grad-middle-${e}`,
    overlayGradientEl: null,
    overlayGradientId: `sc-grad-middle-ov-${e}`,
    padDblMask: (J, _, U) => er(D, N, J, _, U)
  };
  return {
    update(J, _, U, I) {
      if (U <= 0 || I <= 0) return;
      r.setAttribute("width", String(U)), r.setAttribute("height", String(I)), r.setAttribute("viewBox", `0 0 ${U} ${I}`);
      const lt = W2(J), ft = lt(U, I, J, 0);
      h.setAttribute("d", ft), g.setAttribute("d", ft), p.setAttribute("width", String(U)), p.setAttribute("height", String(I)), Lf(_.innerBorder, ft, U, I, $);
      const pt = _.outerBorder;
      pt && pt.width > 0 && pt.opacity > 0 && er(y, p, pt.width, U, I), Lf(pt, ft, U, I, et), Lf(_.middleBorder, ft, U, I, st);
      const vt = _.innerShadow, Rt = vt == null ? [] : Array.isArray(vt) ? vt : [vt];
      for (; A.length < Rt.length; )
        A.push(F6(c, z));
      for (; A.length > Rt.length; )
        J6(A.pop());
      for (let Mt = 0; Mt < Rt.length; Mt++) {
        const Pt = Rt[Mt], Kt = A[Mt];
        if (Pt.opacity <= 0) {
          Kt.rect.style.display = "none";
          continue;
        }
        Kt.rect.style.display = "";
        const pe = Pt.spread, Ae = Math.max(Pt.blur * 3, 20) + Math.max(Math.abs(Pt.offsetX), Math.abs(Pt.offsetY)) + Math.abs(pe);
        er(Kt.mask, Kt.maskRect, Ae, U, I);
        const Qe = Math.max(1, U - pe * 2), Qn = Math.max(1, I - pe * 2), Ma = pe !== 0 ? I2(J, -pe) : J;
        Kt.maskCutout.setAttribute("d", lt(Qe, Qn, Ma, -pe)), Kt.maskCutout.setAttribute(
          "transform",
          `translate(${Pt.offsetX + pe},${Pt.offsetY + pe})`
        ), Pt.blur > 0 ? (Kt.feBlur.setAttribute("stdDeviation", String(Pt.blur)), Kt.blurGroup.setAttribute("filter", `url(#${Kt.filterId})`)) : Kt.blurGroup.removeAttribute("filter"), Ad(Kt.rect, Ae, U, I), Kt.rect.setAttribute("fill", J2(Pt.color)), Kt.rect.setAttribute("fill-opacity", String(Pt.opacity));
      }
    },
    destroy() {
      r.remove();
    }
  };
}
function I6(a, e) {
  return Math.ceil(3 * a + Math.abs(e) + 1);
}
function tT(a, e, l, s) {
  a.setAttribute("x", String(-s)), a.setAttribute("y", String(-s)), a.setAttribute("width", String(e + 2 * s)), a.setAttribute("height", String(l + 2 * s));
}
function eT(a, e) {
  const l = `sc-shadow-${Th()}`, s = document.createElementNS($t, "filter");
  s.setAttribute("id", l), s.setAttribute("filterUnits", "userSpaceOnUse"), s.setAttribute("color-interpolation-filters", "sRGB");
  const r = document.createElementNS($t, "feGaussianBlur");
  r.setAttribute("stdDeviation", "0"), s.appendChild(r), a.appendChild(s);
  const c = document.createElementNS($t, "path");
  return e.appendChild(c), { filterId: l, filterEl: s, feBlur: r, pathEl: c };
}
function nT(a) {
  a.filterEl.remove(), a.pathEl.remove();
}
function aT(a) {
  const e = a.style.isolation;
  a.style.isolation = "isolate";
  const l = document.createElementNS($t, "svg");
  l.style.cssText = "position:absolute;inset:0;overflow:visible;pointer-events:none;z-index:-1", l.setAttribute("width", "100%"), l.setAttribute("height", "100%"), l.setAttribute("aria-hidden", "true");
  const s = document.createElementNS($t, "defs");
  l.appendChild(s), a.appendChild(l);
  const r = [];
  return {
    update(c, f, h, y) {
      const p = Array.isArray(f) ? f : [f];
      if (!(h > 0 && y > 0 && p.some((T) => T.opacity > 0))) {
        l.style.display = "none";
        return;
      }
      for (; r.length < p.length; ) r.push(eT(s, l));
      for (; r.length > p.length; ) nT(r.pop());
      const v = W2(c);
      let b = !1;
      for (let T = 0; T < p.length; T++) {
        const w = p[T], S = r[p.length - 1 - T];
        if (w.opacity <= 0) {
          S.pathEl.style.display = "none";
          continue;
        }
        const E = w.spread, M = h + E * 2, R = y + E * 2;
        if (M <= 0 || R <= 0) {
          S.pathEl.style.display = "none";
          continue;
        }
        b = !0, S.pathEl.style.display = "";
        const D = J2(w.color), N = I2(c, E);
        if (S.pathEl.setAttribute("d", v(M, R, N, E)), S.pathEl.setAttribute("transform", `translate(${w.offsetX - E},${w.offsetY - E})`), S.pathEl.setAttribute("fill", D), S.pathEl.setAttribute("fill-opacity", String(w.opacity)), w.blur > 0) {
          const V = I6(w.blur, E);
          tT(S.filterEl, M, R, V), S.feBlur.setAttribute("stdDeviation", String(w.blur)), S.pathEl.setAttribute("filter", `url(#${S.filterId})`);
        } else
          S.pathEl.removeAttribute("filter");
      }
      l.style.display = b ? "" : "none";
    },
    destroy() {
      l.remove(), a.style.isolation = e;
    }
  };
}
var ps = null, wa, cs = /* @__PURE__ */ new Map(), ws = /* @__PURE__ */ new Set();
function nb() {
  wa = void 0;
  const a = [...ws];
  ws.clear();
  for (const e of a) {
    const l = cs.get(e);
    if (l) for (const s of [...l]) s();
  }
}
function iT() {
  return ps || (ps = new ResizeObserver((a) => {
    for (const e of a)
      ws.add(e.target);
    wa === void 0 && (wa = requestAnimationFrame(nb));
  })), ps;
}
function lT(a, e) {
  if (typeof ResizeObserver > "u") return () => {
  };
  const l = iT();
  let s = cs.get(a);
  return s || (s = /* @__PURE__ */ new Set(), cs.set(a, s), l.observe(a)), s.add(e), ws.add(a), wa === void 0 && (wa = requestAnimationFrame(nb)), () => {
    s.delete(e), s.size === 0 && (cs.delete(a), l.unobserve(a)), cs.size === 0 && (wa !== void 0 && (cancelAnimationFrame(wa), wa = void 0), ws.clear(), ps?.disconnect(), ps = null);
  };
}
function sT(a) {
  const e = window.getComputedStyle(a), l = (p) => p.endsWith("px") ? parseFloat(p) : NaN, s = l(e.width), r = l(e.height);
  if (Number.isNaN(s) || Number.isNaN(r))
    return { width: a.offsetWidth, height: a.offsetHeight };
  if (e.boxSizing === "border-box")
    return { width: s, height: r };
  const c = (parseFloat(e.paddingLeft) || 0) + (parseFloat(e.paddingRight) || 0), f = (parseFloat(e.paddingTop) || 0) + (parseFloat(e.paddingBottom) || 0), h = (parseFloat(e.borderLeftWidth) || 0) + (parseFloat(e.borderRightWidth) || 0), y = (parseFloat(e.borderTopWidth) || 0) + (parseFloat(e.borderBottomWidth) || 0);
  return { width: s + c + h, height: r + f + y };
}
function ab(a) {
  const e = a.match(
    /^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)(?:\s*[,/]\s*([\d.]+))?\s*\)$/
  );
  if (!e) return;
  const l = Number(e[1]), s = Number(e[2]), r = Number(e[3]), c = e[4] !== void 0 ? Number(e[4]) : 1;
  return { hex: "#" + (1 << 24 | l << 16 | s << 8 | r).toString(16).slice(1), opacity: c };
}
function oT(a) {
  const e = getComputedStyle(a), l = e.borderTopStyle;
  if (l === "none" || l === "hidden") return;
  const s = parseFloat(e.borderTopWidth);
  if (s <= 0 || isNaN(s)) return;
  const r = ab(e.borderTopColor);
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
function rT(a) {
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
    const g = ab(p[0]);
    if (!g || g.opacity <= 0) continue;
    const b = y.replace(p[0], "").trim().split(/\s+/).map(parseFloat).filter((w) => !isNaN(w));
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
function gg(a) {
  const e = {
    border: a.style.border,
    boxShadow: a.style.boxShadow,
    paddingTop: a.style.paddingTop,
    paddingRight: a.style.paddingRight,
    paddingBottom: a.style.paddingBottom,
    paddingLeft: a.style.paddingLeft
  }, l = oT(a), s = getComputedStyle(a), { shadow: r, innerShadow: c } = rT(s.boxShadow), f = s.boxSizing, h = parseFloat(s.borderTopWidth) || 0, y = parseFloat(s.borderRightWidth) || 0, p = parseFloat(s.borderBottomWidth) || 0, g = parseFloat(s.borderLeftWidth) || 0, v = parseFloat(s.paddingTop) || 0, b = parseFloat(s.paddingRight) || 0, T = parseFloat(s.paddingBottom) || 0, w = parseFloat(s.paddingLeft) || 0;
  l && (a.style.border = "0"), (r || c) && (a.style.boxShadow = "none"), l && f === "content-box" && (h > 0 || y > 0 || p > 0 || g > 0) && (a.style.paddingTop = v + h + "px", a.style.paddingRight = b + y + "px", a.style.paddingBottom = T + p + "px", a.style.paddingLeft = w + g + "px");
  const S = {};
  return l && (S.innerBorder = l), r && (S.shadow = r), c && (S.innerShadow = c), { effects: S, savedStyles: e };
}
function Ch(a) {
  return a ? !!(a.innerBorder || a.outerBorder || a.middleBorder || a.innerShadow || a.shadow) : !1;
}
function ib(a, e) {
  return { ...a?.effects, ...e };
}
function vg(a, e) {
  a.style.border = e.border, a.style.boxShadow = e.boxShadow, a.style.paddingTop = e.paddingTop, a.style.paddingRight = e.paddingRight, a.style.paddingBottom = e.paddingBottom, a.style.paddingLeft = e.paddingLeft;
}
var Qi = /* @__PURE__ */ new WeakMap();
function uT(a) {
  const e = Qi.get(a) ?? 0;
  if (e > 0)
    return Qi.set(a, e + 1), !0;
  const l = getComputedStyle(a).position;
  return l !== "static" && l !== "" ? !1 : (Qi.set(a, 1), a.style.position = "relative", !0);
}
function cT(a) {
  const e = Qi.get(a);
  e !== void 0 && (e <= 1 ? (Qi.delete(a), a.style.position = "") : Qi.set(a, e - 1));
}
var ar = typeof window < "u" ? j.useLayoutEffect : j.useEffect;
function fT(a, e, l, s, r, c) {
  l.update(a, e, r, c), s?.update(a, e.shadow ?? P6, r, c);
}
function Vf(a, e) {
  const l = ib(a.extracted, e.effectsPropRef.current);
  Ch(l) && lb(a, l, e.wrapperRefRef.current, e.skipShadowHandleRef.current);
  const { width: s, height: r } = sT(a.el);
  if (s <= 0 || r <= 0) return;
  const c = e.syncKeyRef.current;
  s === a.lastWidth && r === a.lastHeight && c === a.lastSyncKey || (a.lastWidth = s, a.lastHeight = r, a.lastSyncKey = c, a.el.style.clipPath = G6(s, r, e.optionsRef.current), a.el.setAttribute("data-state", "ready"), a.effectsHandle && fT(e.optionsRef.current, l, a.effectsHandle, a.shadowHandle, s, r));
}
function lb(a, e, l, s) {
  if (!a.anchor) {
    const r = l?.current ?? a.el.parentElement;
    if (!r) return;
    a.anchor = r, a.didAcquire = uT(r);
  }
  a.effectsHandle || (a.effectsHandle = W6(a.anchor)), !a.shadowHandle && e.shadow && !s && (a.shadowHandle = aT(a.anchor));
}
function sb(a, e, l) {
  const { wrapperRef: s, effects: r, autoEffects: c, skipShadowHandle: f, onExtractedShadow: h } = l ?? {}, y = j.useRef(e);
  y.current = e;
  const p = j.useRef(r);
  p.current = r;
  const g = j.useRef(s);
  g.current = s;
  const v = j.useRef(f ?? !1);
  v.current = f ?? !1;
  const b = j.useRef(h);
  b.current = h;
  const T = JSON.stringify(e), w = JSON.stringify(r ?? null), S = c ?? !0, E = f ?? !1, M = j.useRef("");
  M.current = `${T}|${w}`;
  const R = j.useRef({
    optionsRef: y,
    effectsPropRef: p,
    wrapperRefRef: g,
    skipShadowHandleRef: v,
    onExtractedShadowRef: b,
    syncKeyRef: M
  }), D = j.useRef(null);
  ar(() => {
    const N = a.current;
    if (!N) return;
    const V = N.style.clipPath;
    N.setAttribute("data-slot", "smooth-corners"), N.setAttribute("data-state", "pending");
    const z = S ? gg(N) : void 0, A = {
      el: N,
      savedClipPath: V,
      extracted: z,
      effectsHandle: void 0,
      shadowHandle: void 0,
      anchor: null,
      didAcquire: !1,
      lastWidth: 0,
      lastHeight: 0,
      lastSyncKey: null
    };
    D.current = A;
    const H = ib(A.extracted, p.current);
    Ch(H) && lb(A, H, g.current, v.current), b.current?.(A.extracted?.effects.shadow);
    const G = lT(N, () => Vf(A, R.current));
    return () => {
      G(), A.effectsHandle?.destroy(), A.shadowHandle?.destroy(), A.extracted && vg(N, A.extracted.savedStyles), b.current?.(void 0), A.didAcquire && A.anchor && cT(A.anchor), D.current = null, N.style.clipPath = V, N.removeAttribute("data-slot"), N.removeAttribute("data-state");
    };
  }, [a]), ar(() => {
    const N = D.current;
    N && Vf(N, R.current);
  }), ar(() => {
    if (!E) return;
    const N = D.current;
    !N || !N.shadowHandle || (N.shadowHandle.destroy(), N.shadowHandle = void 0, N.lastSyncKey = null);
  }, [E]), ar(() => {
    const N = D.current;
    if (!N) return;
    const V = N.extracted !== void 0;
    if (S && !V)
      N.extracted = gg(N.el);
    else if (!S && V)
      vg(N.el, N.extracted.savedStyles), N.extracted = void 0;
    else
      return;
    b.current?.(N.extracted?.effects.shadow), N.lastSyncKey = null, Vf(N, R.current);
  }, [S]);
}
function ob(...a) {
  return (e) => {
    for (const l of a)
      l && (typeof l == "function" ? l(e) : l.current = e);
  };
}
function dT(a, e) {
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
function hT(a, e) {
  const { children: l, ...s } = a, r = j.Children.toArray(l);
  if (r.length === 0)
    throw new Error("Slot: `asChild` expects a single child element, received none.");
  if (r.length > 1)
    throw new Error(
      "Slot: `asChild` expects a single child element, received " + r.length + "."
    );
  const c = r[0];
  if (!j.isValidElement(c))
    throw new Error(
      "Slot: `asChild` expects a React element as its child (e.g. <button>), not a " + (typeof c == "string" ? "string." : typeof c + ".")
    );
  if (c.type === j.Fragment)
    throw new Error(
      "Slot: `asChild` expects a single element as its child, not a Fragment. Unwrap the Fragment so Slot can merge props onto a real element."
    );
  const f = c, h = f.props ?? {}, y = h.ref ?? f.ref, p = dT(s, h);
  return j.cloneElement(f, {
    ...p,
    ref: ob(e, y)
  });
}
var mT = j.forwardRef(hT);
function pT(a) {
  const e = Array.isArray(a) ? a : [a], l = [];
  for (const s of e) {
    if (s.opacity <= 0) continue;
    const { offsetX: r, offsetY: c, blur: f, spread: h, color: y, opacity: p } = s, g = yT(y);
    l.push(
      `${r}px ${c}px ${f}px ${h}px rgba(${g.r},${g.g},${g.b},${p})`
    );
  }
  return l.join(", ");
}
function yT(a) {
  const e = a.replace("#", ""), l = e.length === 3 ? e[0] + e[0] + e[1] + e[1] + e[2] + e[2] : e;
  return {
    r: parseInt(l.substring(0, 2), 16),
    g: parseInt(l.substring(2, 4), 16),
    b: parseInt(l.substring(4, 6), 16)
  };
}
function gT(a) {
  if ("radius" in a) return `${a.radius}px`;
  const e = (f) => f === void 0 ? 0 : typeof f == "number" ? f : f.radius, l = e(a.topLeft), s = e(a.topRight), r = e(a.bottomRight), c = e(a.bottomLeft);
  return `${l}px ${s}px ${r}px ${c}px`;
}
function vT(a, e) {
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
  } = a, w = l ?? "div", S = j.useRef(null), E = j.useRef(null), M = j.useMemo(
    () => ob(S, e),
    [e]
  ), R = c ?? { radius: 0 }, D = b === "box-shadow", N = D ? void 0 : g, [V, z] = j.useState(void 0), A = j.useCallback(
    (it) => z(it),
    []
  ), H = {
    innerBorder: f,
    outerBorder: h,
    middleBorder: y,
    innerShadow: p,
    shadow: N
  }, G = Ch(H), K = D ? g ?? V : void 0, nt = (v ?? !0) || G || K !== void 0;
  sb(S, R, {
    wrapperRef: nt ? E : void 0,
    effects: G ? H : void 0,
    autoEffects: v,
    skipShadowHandle: D,
    onExtractedShadow: D ? A : void 0
  });
  const tt = s ? j.createElement(mT, { ...T, ref: M }, r) : j.createElement(w, { ...T, ref: M }, r);
  if (!nt) return tt;
  let Z = null;
  if (D && K !== void 0) {
    const it = pT(K);
    if (it !== "") {
      const L = {
        position: "absolute",
        inset: 0,
        borderRadius: gT(R),
        boxShadow: it,
        pointerEvents: "none",
        zIndex: -1
      };
      Z = j.createElement("div", {
        "aria-hidden": !0,
        "data-slot": "smooth-corners-box-shadow",
        style: L
      });
    }
  }
  return j.createElement(
    "div",
    {
      ref: E,
      style: {
        position: "relative",
        // `isolation: isolate` keeps the z-index:-1 sibling from sinking
        // behind ancestors — same trick the SVG path uses.
        ...Z ? { isolation: "isolate" } : {}
      }
    },
    Z,
    tt
  );
}
j.forwardRef(vT);
function bg(a, e) {
  if (typeof a == "function")
    return a(e);
  a != null && (a.current = e);
}
function bT(...a) {
  return (e) => {
    let l = !1;
    const s = a.map((r) => {
      const c = bg(r, e);
      return !l && typeof c == "function" && (l = !0), c;
    });
    if (l)
      return () => {
        for (let r = 0; r < s.length; r++) {
          const c = s[r];
          typeof c == "function" ? c() : bg(a[r], null);
        }
      };
  };
}
function xT(...a) {
  return j.useCallback(bT(...a), a);
}
class ST extends j.Component {
  getSnapshotBeforeUpdate(e) {
    const l = this.props.childRef.current;
    if (mr(l) && e.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const s = l.offsetParent, r = mr(s) && s.offsetWidth || 0, c = mr(s) && s.offsetHeight || 0, f = getComputedStyle(l), h = this.props.sizeRef.current;
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
function wT({ children: a, isPresent: e, anchorX: l, anchorY: s, root: r, pop: c }) {
  const f = j.useId(), h = j.useRef(null), y = j.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    direction: "ltr"
  }), { nonce: p } = j.useContext(Fd), g = a.props?.ref ?? a?.ref, v = xT(h, g);
  return j.useInsertionEffect(() => {
    const { width: b, height: T, top: w, left: S, right: E, bottom: M, direction: R } = y.current;
    if (e || c === !1 || !h.current || !b || !T)
      return;
    const D = R === "rtl", N = l === "left" ? D ? `right: ${E}` : `left: ${S}` : D ? `left: ${S}` : `right: ${E}`, V = s === "bottom" ? `bottom: ${M}` : `top: ${w}`;
    h.current.dataset.motionPopId = f;
    const z = document.createElement("style");
    p && (z.nonce = p);
    const A = r ?? document.head;
    return A.appendChild(z), z.sheet && z.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${b}px !important;
            height: ${T}px !important;
            ${N}px !important;
            ${V}px !important;
          }
        `), () => {
      h.current?.removeAttribute("data-motion-pop-id"), A.contains(z) && A.removeChild(z);
    };
  }, [e]), m.jsx(ST, { isPresent: e, childRef: h, sizeRef: y, pop: c, children: c === !1 ? a : j.cloneElement(a, { ref: v }) });
}
const TT = ({ children: a, initial: e, isPresent: l, onExitComplete: s, custom: r, presenceAffectsLayout: c, mode: f, anchorX: h, anchorY: y, root: p }) => {
  const g = bh(CT), v = j.useId(), b = j.useRef(l), T = j.useRef(s);
  xh(() => {
    b.current = l, T.current = s;
  });
  let w = !0, S = j.useMemo(() => (w = !1, {
    id: v,
    initial: e,
    isPresent: l,
    custom: r,
    onExitComplete: (E) => {
      g.set(E, !0);
      for (const M of g.values())
        if (!M)
          return;
      s && s();
    },
    register: (E) => (g.set(E, !1), () => {
      g.delete(E), !b.current && !g.size && T.current?.();
    })
  }), [l, g, s]);
  return c && w && (S = { ...S }), j.useMemo(() => {
    g.forEach((E, M) => g.set(M, !1));
  }, [l]), j.useEffect(() => {
    !l && !g.size && s && s();
  }, [l]), a = m.jsx(wT, { pop: f === "popLayout", isPresent: l, anchorX: h, anchorY: y, root: p, children: a }), m.jsx(Yr.Provider, { value: S, children: a });
};
function CT() {
  return /* @__PURE__ */ new Map();
}
function rb(a = !0) {
  const e = j.useContext(Yr);
  if (e === null)
    return [!0, null];
  const { isPresent: l, onExitComplete: s, register: r } = e, c = j.useId();
  j.useEffect(() => {
    if (a)
      return r(c);
  }, [a]);
  const f = j.useCallback(() => a && s && s(c), [c, s, a]);
  return !l && s ? [!1, f] : [!0];
}
const ir = (a) => a.key || "";
function xg(a) {
  const e = [];
  return j.Children.forEach(a, (l) => {
    j.isValidElement(l) && e.push(l);
  }), e;
}
const jT = ({ children: a, custom: e, initial: l = !0, onExitComplete: s, presenceAffectsLayout: r = !0, mode: c = "sync", propagate: f = !1, anchorX: h = "left", anchorY: y = "top", root: p }) => {
  const [g, v] = rb(f), b = j.useMemo(() => xg(a), [a]), T = f && !g ? [] : b.map(ir), w = j.useRef(!0), S = j.useRef(b), E = bh(() => /* @__PURE__ */ new Map()), M = j.useRef(/* @__PURE__ */ new Set()), [R, D] = j.useState(b), [N, V] = j.useState(b);
  xh(() => {
    w.current = !1, S.current = b;
    for (let H = 0; H < N.length; H++) {
      const G = ir(N[H]);
      T.includes(G) ? (E.delete(G), M.current.delete(G)) : E.get(G) !== !0 && E.set(G, !1);
    }
  }, [N, T.length, T.join("-")]);
  const z = [];
  if (b !== R) {
    let H = [...b];
    for (let G = 0; G < N.length; G++) {
      const K = N[G], nt = ir(K);
      T.includes(nt) || (H.splice(G, 0, K), z.push(K));
    }
    return c === "wait" && z.length && (H = z), V(xg(H)), D(b), null;
  }
  const { forceRender: A } = j.useContext(Zd);
  return m.jsx(m.Fragment, { children: N.map((H) => {
    const G = ir(H), K = f && !g ? !1 : b === N || T.includes(G), nt = () => {
      if (M.current.has(G))
        return;
      if (E.has(G))
        M.current.add(G), E.set(G, !0);
      else
        return;
      let at = !0;
      E.forEach((tt) => {
        tt || (at = !1);
      }), at && (A?.(), V(S.current), f && v?.(), s && s());
    };
    return m.jsx(TT, { isPresent: K, initial: !w.current || l ? void 0 : !1, custom: e, presenceAffectsLayout: r, mode: c, root: p, onExitComplete: K ? void 0 : nt, anchorX: h, anchorY: y, children: H }, G);
  }) });
};
function ET({ children: a, features: e, strict: l = !1 }) {
  const [, s] = j.useState(!kf(e)), r = j.useRef(void 0);
  if (!kf(e)) {
    const { renderer: c, ...f } = e;
    r.current = c, dg(f);
  }
  return j.useEffect(() => {
    kf(e) && e().then(({ renderer: c, ...f }) => {
      dg(f), r.current = c, s(!0);
    });
  }, []), m.jsx(Qd.Provider, { value: { renderer: r.current, strict: l }, children: a });
}
function kf(a) {
  return typeof a == "function";
}
const AT = (a, e) => e.isSVG ?? vh(a) ? new Qw(e) : new Yw(e, {
  allowProjection: a !== j.Fragment
});
class MT extends Aa {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(e) {
    super(e), e.animationState || (e.animationState = t9(e));
  }
  updateAnimationControlsSubscription() {
    const { animate: e } = this.node.getProps();
    $r(e) && (this.unmountControls = e.subscribe(this.node));
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
let _T = 0;
class DT extends Aa {
  constructor() {
    super(...arguments), this.id = _T++, this.isExitComplete = !1;
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
          const h = ii(this.node, c, f);
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
const RT = {
  animation: {
    Feature: MT
  },
  exit: {
    Feature: DT
  }
};
function _s(a) {
  return {
    point: {
      x: a.pageX,
      y: a.pageY
    }
  };
}
const NT = (a) => (e) => ch(e) && a(e, _s(e));
function ys(a, e, l, s) {
  return xs(a, e, NT(l), s);
}
const ub = ({ current: a }) => a ? a.ownerDocument.defaultView : null, Sg = (a, e) => Math.abs(a - e);
function OT(a, e) {
  const l = Sg(a.x, e.x), s = Sg(a.y, e.y);
  return Math.sqrt(l ** 2 + s ** 2);
}
const wg = /* @__PURE__ */ new Set(["auto", "scroll"]);
class cb {
  constructor(e, l, { transformPagePoint: s, contextWindow: r = window, dragSnapToOrigin: c = !1, distanceThreshold: f = 3, element: h } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (w) => {
      this.handleScroll(w.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = lr(this.lastRawMoveEventInfo, this.transformPagePoint));
      const w = Uf(this.lastMoveEventInfo, this.history), S = this.startEvent !== null, E = OT(w.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!S && !E)
        return;
      const { point: M } = w, { timestamp: R } = Te;
      this.history.push({ ...M, timestamp: R });
      const { onStart: D, onMove: N } = this.handlers;
      S || (D && D(this.lastMoveEvent, w), this.startEvent = this.lastMoveEvent), N && N(this.lastMoveEvent, w);
    }, this.handlePointerMove = (w, S) => {
      this.lastMoveEvent = w, this.lastRawMoveEventInfo = S, this.lastMoveEventInfo = lr(S, this.transformPagePoint), Xt.update(this.updatePoint, !0);
    }, this.handlePointerUp = (w, S) => {
      this.end();
      const { onEnd: E, onSessionEnd: M, resumeAnimation: R } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && R && R(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const D = Uf(w.type === "pointercancel" ? this.lastMoveEventInfo : lr(S, this.transformPagePoint), this.history);
      this.startEvent && E && E(w, D), M && M(w, D);
    }, !ch(e))
      return;
    this.dragSnapToOrigin = c, this.handlers = l, this.transformPagePoint = s, this.distanceThreshold = f, this.contextWindow = r || window;
    const y = _s(e), p = lr(y, this.transformPagePoint), { point: g } = p, { timestamp: v } = Te;
    this.history = [{ ...g, timestamp: v }];
    const { onSessionStart: b } = l;
    b && b(e, Uf(p, this.history));
    const T = { passive: !0, capture: !0 };
    this.removeListeners = Es(ys(this.contextWindow, "pointermove", this.handlePointerMove, T), ys(this.contextWindow, "pointerup", this.handlePointerUp, T), ys(this.contextWindow, "pointercancel", this.handlePointerUp, T)), h && this.startScrollTracking(h);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(e) {
    let l = e.parentElement;
    for (; l; ) {
      const s = getComputedStyle(l);
      (wg.has(s.overflowX) || wg.has(s.overflowY)) && this.scrollPositions.set(l, {
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
    c.x === 0 && c.y === 0 || (s ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += c.x, this.lastMoveEventInfo.point.y += c.y) : this.history.length > 0 && (this.history[0].x -= c.x, this.history[0].y -= c.y), this.scrollPositions.set(e, r), Xt.update(this.updatePoint, !0));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), ja(this.updatePoint);
  }
}
function lr(a, e) {
  return e ? { point: e(a.point) } : a;
}
function Tg(a, e) {
  return { x: a.x - e.x, y: a.y - e.y };
}
function Uf({ point: a }, e) {
  return {
    point: a,
    delta: Tg(a, fb(e)),
    offset: Tg(a, zT(e)),
    velocity: BT(e, 0.1)
  };
}
function zT(a) {
  return a[0];
}
function fb(a) {
  return a[a.length - 1];
}
function BT(a, e) {
  if (a.length < 2)
    return { x: 0, y: 0 };
  let l = a.length - 1, s = null;
  const r = fb(a);
  for (; l >= 0 && (s = a[l], !(r.timestamp - s.timestamp > /* @__PURE__ */ Ke(e))); )
    l--;
  if (!s)
    return { x: 0, y: 0 };
  s === a[0] && a.length > 2 && r.timestamp - s.timestamp > /* @__PURE__ */ Ke(e) * 2 && (s = a[1]);
  const c = /* @__PURE__ */ on(r.timestamp - s.timestamp);
  if (c === 0)
    return { x: 0, y: 0 };
  const f = {
    x: (r.x - s.x) / c,
    y: (r.y - s.y) / c
  };
  return f.x === 1 / 0 && (f.x = 0), f.y === 1 / 0 && (f.y = 0), f;
}
function LT(a, { min: e, max: l }, s) {
  return e !== void 0 && a < e ? a = s ? Gt(e, a, s.min) : Math.max(a, e) : l !== void 0 && a > l && (a = s ? Gt(l, a, s.max) : Math.min(a, l)), a;
}
function Cg(a, e, l) {
  return {
    min: e !== void 0 ? a.min + e : void 0,
    max: l !== void 0 ? a.max + l - (a.max - a.min) : void 0
  };
}
function VT(a, { top: e, left: l, bottom: s, right: r }) {
  return {
    x: Cg(a.x, l, r),
    y: Cg(a.y, e, s)
  };
}
function jg(a, e) {
  let l = e.min - a.min, s = e.max - a.max;
  return e.max - e.min < a.max - a.min && ([l, s] = [s, l]), { min: l, max: s };
}
function kT(a, e) {
  return {
    x: jg(a.x, e.x),
    y: jg(a.y, e.y)
  };
}
function UT(a, e) {
  let l = 0.5;
  const s = De(a), r = De(e);
  return r > s ? l = /* @__PURE__ */ gs(e.min, e.max - s, a.min) : s > r && (l = /* @__PURE__ */ gs(a.min, a.max - r, e.min)), Mn(0, 1, l);
}
function HT(a, e) {
  const l = {};
  return e.min !== void 0 && (l.min = e.min - a.min), e.max !== void 0 && (l.max = e.max - a.min), l;
}
const Md = 0.35;
function $T(a = Md) {
  return a === !1 ? a = 0 : a === !0 && (a = Md), {
    x: Eg(a, "left", "right"),
    y: Eg(a, "top", "bottom")
  };
}
function Eg(a, e, l) {
  return {
    min: Ag(a, e),
    max: Ag(a, l)
  };
}
function Ag(a, e) {
  return typeof a == "number" ? a : a[e] || 0;
}
const qT = /* @__PURE__ */ new WeakMap();
class YT {
  constructor(e) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = me(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = e;
  }
  start(e, { snapToCursor: l = !1, distanceThreshold: s } = {}) {
    const { presenceContext: r } = this.visualElement;
    if (r && r.isPresent === !1)
      return;
    const c = (v) => {
      l && this.snapToCursor(_s(v).point), this.stopAnimation();
    }, f = (v, b) => {
      const { drag: T, dragPropagation: w, onDragStart: S } = this.getProps();
      if (T && !w && (this.openDragLock && this.openDragLock(), this.openDragLock = uw(T), !this.openDragLock))
        return;
      this.latestPointerEvent = v, this.latestPanInfo = b, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), jn((M) => {
        let R = this.getAxisMotionValue(M).get() || 0;
        if (An.test(R)) {
          const { projection: D } = this.visualElement;
          if (D && D.layout) {
            const N = D.layout.layoutBox[M];
            N && (R = De(N) * (parseFloat(R) / 100));
          }
        }
        this.originPoint[M] = R;
      }), S && Xt.update(() => S(v, b), !1, !0), yd(this.visualElement, "transform");
      const { animationState: E } = this.visualElement;
      E && E.setActive("whileDrag", !0);
    }, h = (v, b) => {
      this.latestPointerEvent = v, this.latestPanInfo = b;
      const { dragPropagation: T, dragDirectionLock: w, onDirectionLock: S, onDrag: E } = this.getProps();
      if (!T && !this.openDragLock)
        return;
      const { offset: M } = b;
      if (w && this.currentDirection === null) {
        this.currentDirection = XT(M), this.currentDirection !== null && S && S(this.currentDirection);
        return;
      }
      this.updateAxis("x", b.point, M), this.updateAxis("y", b.point, M), this.visualElement.render(), E && Xt.update(() => E(v, b), !1, !0);
    }, y = (v, b) => {
      this.latestPointerEvent = v, this.latestPanInfo = b, this.stop(v, b), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, p = () => {
      const { dragSnapToOrigin: v } = this.getProps();
      (v || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: g } = this.getProps();
    this.panSession = new cb(e, {
      onSessionStart: c,
      onStart: f,
      onMove: h,
      onSessionEnd: y,
      resumeAnimation: p
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: g,
      distanceThreshold: s,
      contextWindow: ub(this.visualElement),
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
    h && Xt.postRender(() => h(s, r));
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
    if (!s || !sr(e, r, this.currentDirection))
      return;
    const c = this.getAxisMotionValue(e);
    let f = this.originPoint[e] + s[e];
    this.constraints && this.constraints[e] && (f = LT(f, this.constraints[e], this.elastic[e])), c.set(f);
  }
  resolveConstraints() {
    const { dragConstraints: e, dragElastic: l } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, r = this.constraints;
    e && Gi(e) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : e && s ? this.constraints = VT(s.layoutBox, e) : this.constraints = !1, this.elastic = $T(l), r !== this.constraints && !Gi(e) && s && this.constraints && !this.hasMutatedConstraints && jn((c) => {
      this.constraints !== !1 && this.getAxisMotionValue(c) && (this.constraints[c] = HT(s.layoutBox[c], this.constraints[c]));
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
    const c = Vw(s, r.root, this.visualElement.getTransformPagePoint());
    let f = kT(r.layout.layoutBox, c);
    if (l) {
      const h = l(zw(f));
      this.hasMutatedConstraints = !!h, h && (f = x2(h));
    }
    return f;
  }
  startAnimation(e) {
    const { drag: l, dragMomentum: s, dragElastic: r, dragTransition: c, dragSnapToOrigin: f, onDragTransitionEnd: h } = this.getProps(), y = this.constraints || {}, p = jn((g) => {
      if (!sr(g, l, this.currentDirection))
        return;
      let v = y && y[g] || {};
      (f === !0 || f === g) && (v = { min: 0, max: 0 });
      const b = r ? 200 : 1e6, T = r ? 40 : 1e7, w = {
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
      return this.startAxisValueAnimation(g, w);
    });
    return Promise.all(p).then(h);
  }
  startAxisValueAnimation(e, l) {
    const s = this.getAxisMotionValue(e);
    return yd(this.visualElement, e), s.start(lh(e, s, 0, l, this.visualElement, !1));
  }
  stopAnimation() {
    jn((e) => this.getAxisMotionValue(e).stop());
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
    jn((l) => {
      const { drag: s } = this.getProps();
      if (!sr(l, s, this.currentDirection))
        return;
      const { projection: r } = this.visualElement, c = this.getAxisMotionValue(l);
      if (r && r.layout) {
        const { min: f, max: h } = r.layout.layoutBox[l], y = c.get() || 0;
        c.set(e[l] - Gt(f, h, 0.5) + y);
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
    jn((f) => {
      const h = this.getAxisMotionValue(f);
      if (h && this.constraints !== !1) {
        const y = h.get();
        r[f] = UT({ min: y, max: y }, this.constraints[f]);
      }
    });
    const { transformTemplate: c } = this.visualElement.getProps();
    this.visualElement.current.style.transform = c ? c({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.constraints = !1, this.resolveConstraints(), jn((f) => {
      if (!sr(f, e, null))
        return;
      const h = this.getAxisMotionValue(f), { min: y, max: p } = this.constraints[f];
      h.set(Gt(y, p, r[f]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    qT.set(this.visualElement, this);
    const e = this.visualElement.current, l = ys(e, "pointerdown", (p) => {
      const { drag: g, dragListener: v = !0 } = this.getProps(), b = p.target, T = b !== e && pw(b);
      g && v && !T && this.start(p);
    });
    let s;
    const r = () => {
      const { dragConstraints: p } = this.getProps();
      Gi(p) && p.current && (this.constraints = this.resolveRefConstraints(), s || (s = GT(e, p.current, () => this.scalePositionWithinConstraints())));
    }, { projection: c } = this.visualElement, f = c.addEventListener("measure", r);
    c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()), Xt.read(r);
    const h = xs(window, "resize", () => this.scalePositionWithinConstraints()), y = c.addEventListener("didUpdate", (({ delta: p, hasLayoutChanged: g }) => {
      this.isDragging && g && (jn((v) => {
        const b = this.getAxisMotionValue(v);
        b && (this.originPoint[v] += p[v].translate, b.set(b.get() + p[v].translate));
      }), this.visualElement.render());
    }));
    return () => {
      h(), l(), f(), y && y(), s && s();
    };
  }
  getProps() {
    const e = this.visualElement.getProps(), { drag: l = !1, dragDirectionLock: s = !1, dragPropagation: r = !1, dragConstraints: c = !1, dragElastic: f = Md, dragMomentum: h = !0 } = e;
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
function Mg(a) {
  let e = !0;
  return () => {
    if (e) {
      e = !1;
      return;
    }
    a();
  };
}
function GT(a, e, l) {
  const s = My(a, Mg(l)), r = My(e, Mg(l));
  return () => {
    s(), r();
  };
}
function sr(a, e, l) {
  return (e === !0 || e === a) && (l === null || l === a);
}
function XT(a, e = 10) {
  let l = null;
  return Math.abs(a.y) > e ? l = "y" : Math.abs(a.x) > e && (l = "x"), l;
}
class PT extends Aa {
  constructor(e) {
    super(e), this.removeGroupControls = rn, this.removeListeners = rn, this.controls = new YT(e);
  }
  mount() {
    const { dragControls: e } = this.node.getProps();
    e && (this.removeGroupControls = e.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || rn;
  }
  update() {
    const { dragControls: e } = this.node.getProps(), { dragControls: l } = this.node.prevProps || {};
    e !== l && (this.removeGroupControls(), e && (this.removeGroupControls = e.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const Hf = (a) => (e, l) => {
  a && Xt.update(() => a(e, l), !1, !0);
};
class KT extends Aa {
  constructor() {
    super(...arguments), this.removePointerDownListener = rn;
  }
  onPointerDown(e) {
    this.session = new cb(e, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: ub(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: e, onPanStart: l, onPan: s, onPanEnd: r } = this.node.getProps();
    return {
      onSessionStart: Hf(e),
      onStart: Hf(l),
      onMove: Hf(s),
      onEnd: (c, f) => {
        delete this.session, r && Xt.postRender(() => r(c, f));
      }
    };
  }
  mount() {
    this.removePointerDownListener = ys(this.node.current, "pointerdown", (e) => this.onPointerDown(e));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let $f = !1;
class ZT extends j.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: e, layoutGroup: l, switchLayoutGroup: s, layoutId: r } = this.props, { projection: c } = e;
    c && (l.group && l.group.add(c), s && s.register && r && s.register(c), $f && c.root.didUpdate(), c.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), c.setOptions({
      ...c.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), Sr.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(e) {
    const { layoutDependency: l, visualElement: s, drag: r, isPresent: c } = this.props, { projection: f } = s;
    return f && (f.isPresent = c, e.layoutDependency !== l && f.setOptions({
      ...f.options,
      layoutDependency: l
    }), $f = !0, r || e.layoutDependency !== l || l === void 0 || e.isPresent !== c ? f.willUpdate() : this.safeToRemove(), e.isPresent !== c && (c ? f.promote() : f.relegate() || Xt.postRender(() => {
      const h = f.getStack();
      (!h || !h.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: e, layoutAnchor: l } = this.props, { projection: s } = e;
    s && (s.options.layoutAnchor = l, s.root.didUpdate(), uh.postRender(() => {
      !s.currentAnimation && s.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: e, layoutGroup: l, switchLayoutGroup: s } = this.props, { projection: r } = e;
    $f = !0, r && (r.scheduleCheckAfterUnmount(), l && l.group && l.group.remove(r), s && s.deregister && s.deregister(r));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e && e();
  }
  render() {
    return null;
  }
}
function db(a) {
  const [e, l] = rb(), s = j.useContext(Zd);
  return m.jsx(ZT, { ...a, layoutGroup: s, switchLayoutGroup: j.useContext(P2), isPresent: e, safeToRemove: l });
}
const QT = {
  pan: {
    Feature: KT
  },
  drag: {
    Feature: PT,
    ProjectionNode: H2,
    MeasureLayout: db
  }
};
function _g(a, e, l) {
  const { props: s } = a;
  a.animationState && s.whileHover && a.animationState.setActive("whileHover", l === "Start");
  const r = "onHover" + l, c = s[r];
  c && Xt.postRender(() => c(e, _s(e)));
}
class FT extends Aa {
  mount() {
    const { current: e } = this.node;
    e && (this.unmount = fw(e, (l, s) => (_g(this.node, s, "Start"), (r) => _g(this.node, r, "End"))));
  }
  unmount() {
  }
}
class JT extends Aa {
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
    this.unmount = Es(xs(this.node.current, "focus", () => this.onFocus()), xs(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Dg(a, e, l) {
  const { props: s } = a;
  if (a.current instanceof HTMLButtonElement && a.current.disabled)
    return;
  a.animationState && s.whileTap && a.animationState.setActive("whileTap", l === "Start");
  const r = "onTap" + (l === "End" ? "" : l), c = s[r];
  c && Xt.postRender(() => c(e, _s(e)));
}
class WT extends Aa {
  mount() {
    const { current: e } = this.node;
    if (!e)
      return;
    const { globalTapTarget: l, propagate: s } = this.node.props;
    this.unmount = gw(e, (r, c) => (Dg(this.node, c, "Start"), (f, { success: h }) => Dg(this.node, f, h ? "End" : "Cancel")), {
      useGlobalTarget: l,
      stopPropagation: s?.tap === !1
    });
  }
  unmount() {
  }
}
const _d = /* @__PURE__ */ new WeakMap(), qf = /* @__PURE__ */ new WeakMap(), IT = (a) => {
  const e = _d.get(a.target);
  e && e(a);
}, tC = (a) => {
  a.forEach(IT);
};
function eC({ root: a, ...e }) {
  const l = a || document;
  qf.has(l) || qf.set(l, {});
  const s = qf.get(l), r = JSON.stringify(e);
  return s[r] || (s[r] = new IntersectionObserver(tC, { root: a, ...e })), s[r];
}
function nC(a, e, l) {
  const s = eC(e);
  return _d.set(a, l), s.observe(a), () => {
    _d.delete(a), s.unobserve(a);
  };
}
const aC = {
  some: 0,
  all: 1
};
class iC extends Aa {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: e = {} } = this.node.getProps(), { root: l, margin: s, amount: r = "some", once: c } = e, f = {
      root: l ? l.current : void 0,
      rootMargin: s,
      threshold: typeof r == "number" ? r : aC[r]
    }, h = (y) => {
      const { isIntersecting: p } = y;
      if (this.isInView === p || (this.isInView = p, c && !p && this.hasEnteredView))
        return;
      p && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", p);
      const { onViewportEnter: g, onViewportLeave: v } = this.node.getProps(), b = p ? g : v;
      b && b(y);
    };
    this.stopObserver = nC(this.node.current, f, h);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: e, prevProps: l } = this.node;
    ["amount", "margin", "root"].some(lC(e, l)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function lC({ viewport: a = {} }, { viewport: e = {} } = {}) {
  return (l) => a[l] !== e[l];
}
const sC = {
  inView: {
    Feature: iC
  },
  tap: {
    Feature: WT
  },
  focus: {
    Feature: JT
  },
  hover: {
    Feature: FT
  }
}, oC = {
  layout: {
    ProjectionNode: H2,
    MeasureLayout: db
  }
}, rC = {
  renderer: AT,
  ...RT,
  ...sC
}, uC = {
  ...rC,
  ...QT,
  ...oC
};
function cC() {
  !mh.current && g2();
  const [a] = j.useState(_r.current);
  return a;
}
var Gr = pv();
function fC(a, e) {
  if (a instanceof RegExp) return { keys: !1, pattern: a };
  var l, s, r, c, f = [], h = "", y = a.split("/");
  for (y[0] || y.shift(); r = y.shift(); )
    l = r[0], l === "*" ? (f.push(l), h += r[1] === "?" ? "(?:/(.*))?" : "/(.*)") : l === ":" ? (s = r.indexOf("?", 1), c = r.indexOf(".", 1), f.push(r.substring(1, ~s ? s : ~c ? c : r.length)), h += ~s && !~c ? "(?:/([^/]+?))?" : "/([^/]+?)", ~c && (h += (~s ? "?" : "") + "\\" + r.substring(c))) : h += "/" + r;
  return {
    keys: f,
    pattern: new RegExp("^" + h + (e ? "(?=$|/)" : "/?$"), "i")
  };
}
const dC = "popstate", jh = "pushState", Eh = "replaceState", hC = "hashchange", Rg = [
  dC,
  jh,
  Eh,
  hC
], mC = (a) => {
  for (const e of Rg)
    addEventListener(e, a);
  return () => {
    for (const e of Rg)
      removeEventListener(e, a);
  };
}, hb = (a, e) => e4.useSyncExternalStore(mC, a, e), Ng = () => location.search, pC = ({ ssrSearch: a } = {}) => hb(
  Ng,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrSearch="?foo",
  // client hydrates with just <Router /> and reads from location.search
  a != null ? () => a : Ng
), Og = () => location.pathname, yC = ({ ssrPath: a } = {}) => hb(
  Og,
  // != null checks for both null and undefined, but allows empty string ""
  // This allows proper hydration: server renders with ssrPath="/foo",
  // client hydrates with just <Router /> and reads from location.pathname
  a != null ? () => a : Og
), gC = (a, { replace: e = !1, state: l = null } = {}) => history[e ? Eh : jh](l, "", a), vC = (a = {}) => [yC(a), gC], zg = Symbol.for("wouter_v3");
if (typeof history < "u" && typeof window[zg] > "u") {
  for (const a of [jh, Eh]) {
    const e = history[a];
    history[a] = function() {
      const l = e.apply(this, arguments), s = new Event(a);
      return s.arguments = arguments, dispatchEvent(s), l;
    };
  }
  Object.defineProperty(window, zg, { value: !0 });
}
const bC = (a, e) => e.toLowerCase().indexOf(a.toLowerCase()) ? "~" + e : e.slice(a.length) || "/", mb = (a = "") => a === "/" ? "" : a, xC = (a, e) => a[0] === "~" ? a.slice(1) : mb(e) + a, SC = (a = "", e) => bC(Bg(mb(a)), Bg(e)), Bg = (a) => {
  try {
    return decodeURI(a);
  } catch {
    return a;
  }
}, wC = {
  hook: vC,
  searchHook: pC,
  parser: fC,
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
}, TC = j.createContext(wC), CC = () => j.useContext(TC), jC = {};
j.createContext(jC);
const EC = (a) => {
  const [e, l] = a.hook(a);
  return [
    SC(a.base, e),
    yv(
      (s, r) => a.aroundNav(l, xC(s, a.base), r)
    )
  ];
}, AC = j.forwardRef((a, e) => {
  const l = CC(), [s, r] = EC(l), {
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
    ...w
  } = a, S = yv((M) => {
    M.ctrlKey || M.metaKey || M.altKey || M.shiftKey || M.button !== 0 || (h?.(M), M.defaultPrevented || (M.preventDefault(), r(f, a)));
  }), E = l.hrefs(
    f[0] === "~" ? f.slice(1) : l.base + f,
    l
    // pass router as a second argument for convinience
  );
  return y && j.isValidElement(p) ? j.cloneElement(p, { onClick: S, href: E }) : j.createElement("a", {
    ...w,
    onClick: S,
    href: E,
    // `className` can be a function to apply the class if this link is active
    className: g?.call ? g(s === f) : g,
    children: p,
    ref: e
  });
}), Ah = Object.freeze({
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
}), Xr = Object.freeze({
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
}), MC = "_root_xunnd_1", Lg = "_glassBackground_xunnd_5", Vg = "_glassShadow_xunnd_25", _C = "_glassBorder_1y4zy_1", DC = "_muted_1y4zy_15", Ts = (a) => {
  const e = wt.c(2), {
    className: l,
    muted: s
  } = a, r = `${_C} ${s !== void 0 && s ? DC : ""} ${l === void 0 ? "" : l}`;
  let c;
  return e[0] !== r ? (c = /* @__PURE__ */ m.jsx("div", {
    className: r,
    "aria-hidden": "true"
  }), e[0] = r, e[1] = c) : c = e[1], c;
}, Mh = (a) => {
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
    let w;
    return e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (w = /* @__PURE__ */ m.jsxs(m.Fragment, {
      children: [/* @__PURE__ */ m.jsx("div", {
        className: Lg,
        "aria-hidden": "true"
      }), /* @__PURE__ */ m.jsx("div", {
        className: Vg,
        "aria-hidden": "true"
      }), /* @__PURE__ */ m.jsx(Ts, {})]
    }), e[7] = w) : w = e[7], w;
  }
  const p = `${MC} ${f}`;
  let g, v, b;
  e[8] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (g = /* @__PURE__ */ m.jsx("div", {
    className: Lg,
    "aria-hidden": "true"
  }), v = /* @__PURE__ */ m.jsx("div", {
    className: Vg,
    "aria-hidden": "true"
  }), b = /* @__PURE__ */ m.jsx(Ts, {}), e[8] = g, e[9] = v, e[10] = b) : (g = e[8], v = e[9], b = e[10]);
  let T;
  return e[11] !== l || e[12] !== s || e[13] !== y || e[14] !== p ? (T = /* @__PURE__ */ m.jsxs("div", {
    className: p,
    style: y,
    ...s,
    children: [g, v, b, l]
  }), e[11] = l, e[12] = s, e[13] = y, e[14] = p, e[15] = T) : T = e[15], T;
}, RC = (a) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/arrow-down" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", d: "M11.2482 20.3129C11.6466 20.7682 12.3556 20.7682 12.7541 20.3129L17.5499 14.8314C18.1155 14.1849 17.6561 13.1732 16.797 13.1732H13.5011V5.67324C13.5011 4.84481 12.8295 4.17324 12.0011 4.17324C11.1727 4.17324 10.5011 4.84481 10.5011 5.67324V13.1732H7.20522C6.34614 13.1732 5.88678 14.1849 6.45229 14.8314L11.2482 20.3129Z", fill: "#3D3C3A" }))), NC = (a) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/arrow-up" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", d: "M11.2483 3.85905C11.6467 3.40376 12.3558 3.40375 12.7542 3.85905L17.5501 9.3405C18.1158 9.98708 17.6563 10.9997 16.7971 10.9997H13.5012V18.4997C13.501 19.3279 12.8295 19.9997 12.0012 19.9997C11.1729 19.9997 10.5014 19.3279 10.5012 18.4997V10.9997H7.20535C6.34619 10.9997 5.88666 9.98708 6.45242 9.3405L11.2483 3.85905Z", fill: "#3D3C3A" }))), OC = (a) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/star" }, /* @__PURE__ */ j.createElement("path", { id: "Vector 234255911", d: "M11 16L15 12L11 8", stroke: "#3D3C3A", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }))), pb = "_redaction_dcm1f_1", yb = "_active_dcm1f_19", zC = "_sized_dcm1f_29", Yf = 1800, BC = 1.3, gb = /* @__PURE__ */ j.createContext(null), _h = () => j.useContext(gb);
let zr = [];
const LC = () => {
  const a = zr;
  zr = [];
  const e = performance.now(), l = a.map((s) => {
    const r = s.getBoundingClientRect().top + window.scrollY;
    return -(((e - r * BC) % Yf + Yf) % Yf);
  });
  a.forEach((s, r) => {
    s.style.setProperty("--wave-phase", `${Math.round(l[r])}ms`);
  });
}, Dh = (a) => {
  a && (zr.length === 0 && requestAnimationFrame(LC), zr.push(a));
}, vb = (a) => a ? `${pb} ${yb}` : "", VC = 10, ni = (a) => {
  const e = wt.c(7), {
    active: l,
    width: s,
    children: r
  } = a, c = r != null && r !== "", f = s ?? (!c && l ? VC : void 0), h = l ? Dh : void 0, y = `
                ${pb}
                ${l ? yb : ""}
                ${f ? zC : ""}`;
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
  const e = wt.c(6), {
    className: l,
    as: s,
    active: r
  } = a, c = l === void 0 ? "" : l, f = s === void 0 ? "div" : s, h = _h(), y = r ?? h ?? !0, p = vb(y), g = y ? Dh : void 0, v = `${c} ${p}`;
  let b;
  e[0] !== v ? (b = v.trim(), e[0] = v, e[1] = b) : b = e[1];
  let T;
  return e[2] !== f || e[3] !== g || e[4] !== b ? (T = /* @__PURE__ */ m.jsx(f, {
    ref: g,
    className: b
  }), e[2] = f, e[3] = g, e[4] = b, e[5] = T) : T = e[5], T;
}, bb = (a) => {
  const e = wt.c(3), {
    active: l,
    children: s
  } = a, r = !!(l === void 0 || l);
  let c;
  return e[0] !== s || e[1] !== r ? (c = /* @__PURE__ */ m.jsx(gb.Provider, {
    value: r,
    children: s
  }), e[0] = s, e[1] = r, e[2] = c) : c = e[2], c;
}, Rh = "_text_9l4iv_1", Br = "_icon_9l4iv_28", xb = "_title32_9l4iv_34", Sb = "_title24_9l4iv_35", wb = "_title20_9l4iv_36", Tb = "_body_9l4iv_56", Cb = "_subtitle_9l4iv_63", jb = "_caption_9l4iv_70", kC = {
  text: Rh,
  icon: Br,
  title32: xb,
  title24: Sb,
  title20: wb,
  body: Tb,
  subtitle: Cb,
  caption: jb
}, UC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  body: Tb,
  caption: jb,
  default: kC,
  icon: Br,
  subtitle: Cb,
  text: Rh,
  title20: wb,
  title24: Sb,
  title32: xb
}, Symbol.toStringTag, { value: "Module" })), HC = {
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
}, rt = (a) => {
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
  const T = v === void 0 ? "body" : v, w = _h(), S = l || "div", E = g !== void 0 ? !!g : !!w, M = g !== void 0 || w !== null, R = typeof g == "number" ? g : void 0;
  let D;
  e[12] !== E || e[13] !== f || e[14] !== M || e[15] !== R ? (D = M ? /* @__PURE__ */ m.jsx(ni, {
    active: E,
    width: R,
    children: f
  }) : f, e[12] = E, e[13] = f, e[14] = M, e[15] = R, e[16] = D) : D = e[16];
  const N = D, V = s?.direction === "down" ? RC : NC, z = `${Rh} ${UC[HC[T] || "body"]} ${h || ""}`, A = p || void 0, H = r || void 0, G = E || void 0;
  let K;
  e[17] !== V || e[18] !== s?.direction ? (K = s?.direction && /* @__PURE__ */ m.jsx(V, {
    className: Br
  }), e[17] = V, e[18] = s?.direction, e[19] = K) : K = e[19];
  let nt;
  e[20] !== c ? (nt = c && /* @__PURE__ */ m.jsx(OC, {
    className: Br
  }), e[20] = c, e[21] = nt) : nt = e[21];
  let at;
  return e[22] !== S || e[23] !== N || e[24] !== y || e[25] !== z || e[26] !== A || e[27] !== H || e[28] !== G || e[29] !== K || e[30] !== nt || e[31] !== T || e[32] !== b ? (at = /* @__PURE__ */ m.jsxs(S, {
    ...y,
    className: z,
    "data-variant": T,
    "data-weight": b,
    "data-rounded": A,
    "data-caps": H,
    "data-skeleton": G,
    children: [K, N, nt]
  }), e[22] = S, e[23] = N, e[24] = y, e[25] = z, e[26] = A, e[27] = H, e[28] = G, e[29] = K, e[30] = nt, e[31] = T, e[32] = b, e[33] = at) : at = e[33], at;
}, Nh = {
  skin: "apple",
  isApple: !0,
  isMaterial: !1,
  setSkin: () => {
  }
}, Eb = /* @__PURE__ */ j.createContext(Nh), Ds = () => j.useContext(Eb) || Nh;
function $C(a) {
  const e = wt.c(3), {
    children: l
  } = a;
  let s;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (s = [], e[0] = s) : s = e[0], j.useEffect(qC, s);
  let r;
  return e[1] !== l ? (r = /* @__PURE__ */ m.jsx(Eb.Provider, {
    value: Nh,
    children: l
  }), e[1] = l, e[2] = r) : r = e[2], r;
}
function qC() {
  document.body.classList.remove("material", "skin-switcher-active"), document.body.classList.add("apple");
}
const Oh = "_button_1d7yf_1", Ab = "_regular_1d7yf_21", Mb = "_overlay_1d7yf_35", _b = "_secondary_1d7yf_42", Db = "_accent_1d7yf_47", zh = "_icon_1d7yf_53", Bh = "_label_1d7yf_57", Lh = "_content_1d7yf_61", YC = {
  button: Oh,
  regular: Ab,
  overlay: Mb,
  secondary: _b,
  accent: Db,
  icon: zh,
  label: Bh,
  content: Lh
}, GC = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accent: Db,
  button: Oh,
  content: Lh,
  default: YC,
  icon: zh,
  label: Bh,
  overlay: Mb,
  regular: Ab,
  secondary: _b
}, Symbol.toStringTag, { value: "Module" })), kg = (a) => {
  const e = wt.c(16), {
    children: l,
    onClick: s,
    variant: r,
    ariaLabel: c,
    title: f
  } = a, h = r === void 0 ? "regular" : r, y = typeof l == "string", p = h === "regular" || h === "overlay", g = `${Oh} ${GC[h]} ${y ? Bh : zh}`;
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
  e[2] !== p ? (T = p && /* @__PURE__ */ m.jsx(Ts, {
    muted: !0
  }), e[2] = p, e[3] = T) : T = e[3];
  let w;
  e[4] !== l || e[5] !== y ? (w = y ? /* @__PURE__ */ m.jsx(rt, {
    variant: "body",
    weight: "medium",
    children: l
  }) : l, e[4] = l, e[5] = y, e[6] = w) : w = e[6];
  let S;
  e[7] !== w ? (S = /* @__PURE__ */ m.jsx("span", {
    className: Lh,
    children: w
  }), e[7] = w, e[8] = S) : S = e[8];
  let E;
  return e[9] !== c || e[10] !== s || e[11] !== g || e[12] !== T || e[13] !== S || e[14] !== f ? (E = /* @__PURE__ */ m.jsxs(h6, {
    type: "button",
    className: g,
    onClick: s,
    "aria-label": c,
    title: f,
    whileTap: v,
    transition: b,
    children: [T, S]
  }), e[9] = c, e[10] = s, e[11] = g, e[12] = T, e[13] = S, e[14] = f, e[15] = E) : E = e[15], E;
}, XC = /* @__PURE__ */ j.createContext(!1), PC = "_root_125i3_1", Ug = "_side_125i3_9", KC = "_trailing_125i3_18", ZC = "_middle_125i3_22", QC = "_middleOverlay_125i3_31", FC = "_titlePill_125i3_35", JC = "_titleContent_125i3_45", WC = "_inModal_125i3_59", IC = (a) => {
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
    children: w
  } = a, S = b === void 0 ? !1 : b, E = T === void 0 ? !1 : T, {
    isApple: M
  } = Ds(), R = j.useContext(XC), D = S ? "overlay" : "regular";
  let N;
  e[0] !== w ? (N = /* @__PURE__ */ m.jsx(rt, {
    variant: "body",
    weight: "semibold",
    children: w
  }), e[0] = w, e[1] = N) : N = e[1];
  const V = N, z = `${PC} ${R ? WC : ""}`;
  let A;
  e[2] !== D || e[3] !== l || e[4] !== c || e[5] !== f || e[6] !== r || e[7] !== s ? (A = l != null && /* @__PURE__ */ m.jsx(kg, {
    onClick: s,
    variant: r ?? D,
    ariaLabel: c,
    title: f,
    children: l
  }), e[2] = D, e[3] = l, e[4] = c, e[5] = f, e[6] = r, e[7] = s, e[8] = A) : A = e[8];
  let H;
  e[9] !== A ? (H = /* @__PURE__ */ m.jsx("div", {
    className: Ug,
    children: A
  }), e[9] = A, e[10] = H) : H = e[10];
  let G;
  e[11] !== D || e[12] !== y || e[13] !== h || e[14] !== g || e[15] !== v || e[16] !== p ? (G = h != null && /* @__PURE__ */ m.jsx(kg, {
    onClick: y,
    variant: p ?? D,
    ariaLabel: g,
    title: v,
    children: h
  }), e[11] = D, e[12] = y, e[13] = h, e[14] = g, e[15] = v, e[16] = p, e[17] = G) : G = e[17];
  let K;
  e[18] !== G ? (K = /* @__PURE__ */ m.jsx("div", {
    className: `${Ug} ${KC}`,
    children: G
  }), e[18] = G, e[19] = K) : K = e[19];
  const nt = `${ZC} ${S ? QC : ""}`;
  let at;
  e[20] !== M || e[21] !== V || e[22] !== E ? (at = M && E ? /* @__PURE__ */ m.jsxs("div", {
    className: FC,
    children: [/* @__PURE__ */ m.jsx(Mh, {}), /* @__PURE__ */ m.jsx("span", {
      className: JC,
      children: V
    })]
  }) : V, e[20] = M, e[21] = V, e[22] = E, e[23] = at) : at = e[23];
  let tt;
  e[24] !== at || e[25] !== nt ? (tt = /* @__PURE__ */ m.jsx("div", {
    className: nt,
    children: at
  }), e[24] = at, e[25] = nt, e[26] = tt) : tt = e[26];
  let Z;
  return e[27] !== tt || e[28] !== z || e[29] !== H || e[30] !== K ? (Z = /* @__PURE__ */ m.jsxs("div", {
    className: z,
    "data-modal-drag": "",
    children: [H, K, tt]
  }), e[27] = tt, e[28] = z, e[29] = H, e[30] = K, e[31] = Z) : Z = e[31], Z;
}, t8 = /* @__PURE__ */ j.createContext({
  inDetailPane: !1
}), e8 = () => j.useContext(t8), Wt = () => {
}, or = () => ({
  show: Wt,
  hide: Wt,
  enable: Wt,
  disable: Wt,
  showProgress: Wt,
  hideProgress: Wt,
  setParams: Wt,
  setText: Wt,
  onClick: Wt,
  offClick: Wt
}), n8 = {
  initData: "",
  themeParams: {},
  viewportHeight: 0,
  BackButton: or(),
  SettingsButton: or(),
  MainButton: or(),
  SecondaryButton: or(),
  HapticFeedback: {
    impactOccurred: Wt,
    notificationOccurred: Wt,
    selectionChanged: Wt
  },
  onEvent: Wt,
  offEvent: Wt,
  expand: Wt,
  setHeaderColor: Wt,
  setBackgroundColor: Wt,
  setBottomBarColor: Wt,
  disableVerticalSwipes: Wt,
  enableVerticalSwipes: Wt,
  requestFullscreen: Wt,
  exitFullscreen: Wt,
  shareToStory: Wt
}, Ea = globalThis.Telegram?.WebApp ?? n8;
function a8(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var Gf = { exports: {} }, Xf, Hg;
function i8() {
  if (Hg) return Xf;
  Hg = 1;
  var a = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Xf = a, Xf;
}
var Pf, $g;
function l8() {
  if ($g) return Pf;
  $g = 1;
  var a = /* @__PURE__ */ i8();
  function e() {
  }
  function l() {
  }
  return l.resetWarningCache = e, Pf = function() {
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
  }, Pf;
}
var qg;
function s8() {
  return qg || (qg = 1, Gf.exports = /* @__PURE__ */ l8()()), Gf.exports;
}
var o8 = /* @__PURE__ */ s8();
const yn = /* @__PURE__ */ a8(o8);
yn.func;
const Vh = "_button_124dm_1", Rb = "_filled_124dm_9", Nb = "_tinted_124dm_14", Ob = "_plain_124dm_19", zb = "_outlined_124dm_24", Bb = "_gray_124dm_28", Lb = "_disabled_124dm_33", kh = "_skeleton_124dm_38", Vb = "_wave_124dm_1", r8 = {
  button: Vh,
  filled: Rb,
  tinted: Nb,
  plain: Ob,
  outlined: zb,
  gray: Bb,
  disabled: Lb,
  skeleton: kh,
  wave: Vb
}, u8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  button: Vh,
  default: r8,
  disabled: Lb,
  filled: Rb,
  gray: Bb,
  outlined: zb,
  plain: Ob,
  skeleton: kh,
  tinted: Nb,
  wave: Vb
}, Symbol.toStringTag, { value: "Module" })), It = (a) => {
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
  } = Ds(), g = !!_h(), v = vb(g);
  let b;
  e[6] !== y ? (b = y && {
    "data-fill": !0
  }, e[6] = y, e[7] = b) : b = e[7];
  let T;
  e[8] !== h || e[9] !== g || e[10] !== f ? (T = f === "filled" && h && !g && {
    "data-shine": !0
  }, e[8] = h, e[9] = g, e[10] = f, e[11] = T) : T = e[11];
  let w;
  e[12] !== b || e[13] !== T ? (w = {
    ...b,
    ...T
  }, e[12] = b, e[13] = T, e[14] = w) : w = e[14];
  const S = w;
  let E;
  e[15] !== l ? (E = /* @__PURE__ */ m.jsx(rt, {
    variant: "body",
    weight: "semibold",
    children: l
  }), e[15] = l, e[16] = E) : E = e[16];
  const M = E, R = g ? Dh : void 0, D = `${Vh} ${u8[f]} ${g ? kh : ""} ${v}`;
  let N;
  e[17] !== p || e[18] !== g ? (N = p && !g && {
    whileTap: {
      scale: 1.02
    }
  }, e[17] = p, e[18] = g, e[19] = N) : N = e[19];
  let V;
  e[20] !== g || e[21] !== f ? (V = f === "filled" && !g && /* @__PURE__ */ m.jsx(Ts, {}), e[20] = g, e[21] = f, e[22] = V) : V = e[22];
  let z;
  e[23] !== M || e[24] !== g ? (z = g ? /* @__PURE__ */ m.jsx(bb, {
    active: !1,
    children: M
  }) : M, e[23] = M, e[24] = g, e[25] = z) : z = e[25];
  let A;
  return e[26] !== S || e[27] !== s || e[28] !== V || e[29] !== z || e[30] !== R || e[31] !== D || e[32] !== N ? (A = /* @__PURE__ */ m.jsxs(el, {
    ref: R,
    className: D,
    ...N,
    ...S,
    ...s,
    children: [V, z]
  }), e[26] = S, e[27] = s, e[28] = V, e[29] = z, e[30] = R, e[31] = D, e[32] = N, e[33] = A) : A = e[33], A;
};
function kb(a) {
  var e, l, s = "";
  if (typeof a == "string" || typeof a == "number") s += a;
  else if (typeof a == "object") if (Array.isArray(a)) {
    var r = a.length;
    for (e = 0; e < r; e++) a[e] && (l = kb(a[e])) && (s && (s += " "), s += l);
  } else for (l in a) a[l] && (s && (s += " "), s += l);
  return s;
}
function c8() {
  for (var a, e, l = 0, s = "", r = arguments.length; l < r; l++) (a = arguments[l]) && (e = kb(a)) && (s && (s += " "), s += e);
  return s;
}
const f8 = (...a) => c8(...a), d8 = {
  SNACKBAR: {
    type: "spring",
    stiffness: 280,
    damping: 26
  }
}, Ub = "_overlay_qo6yx_1", Hb = "_opacity_qo6yx_2", Uh = "_fadeIn_qo6yx_6", Hh = "_fadeOut_qo6yx_10", h8 = {
  overlay: Ub,
  opacity: Hb,
  fadeIn: Uh,
  fadeOut: Hh,
  "overlay-out": "_overlay-out_qo6yx_1",
  "opacity-out": "_opacity-out_qo6yx_1"
}, m8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: h8,
  fadeIn: Uh,
  fadeOut: Hh,
  opacity: Hb,
  overlay: Ub
}, Symbol.toStringTag, { value: "Module" })), p8 = typeof window < "u" && "ontouchstart" in window, y8 = 250;
function g8(a) {
  const e = wt.c(21);
  let l;
  e[0] !== a ? (l = a === void 0 ? {} : a, e[0] = a, e[1] = l) : l = e[1];
  const {
    onTap: s,
    onTapOut: r,
    mode: c,
    disabled: f
  } = l, h = m8[c === void 0 ? "overlay" : c], [y, p] = j.useState(!1);
  let g;
  e[2] !== h ? (g = [h], e[2] = h, e[3] = g) : g = e[3];
  const [v, b] = j.useState(g), T = j.useRef();
  let w;
  e[4] !== h || e[5] !== r ? (w = () => {
    p(!1), b([h, Hh]), r?.(), T.current = window.setTimeout(() => {
      b([h]);
    }, y8);
  }, e[4] = h, e[5] = r, e[6] = w) : w = e[6];
  const S = w;
  let E;
  e[7] !== h || e[8] !== s ? (E = (A) => {
    clearTimeout(T.current), p(!0), b([h, Uh]), s?.(A);
  }, e[7] = h, e[8] = s, e[9] = E) : E = e[9];
  const M = E;
  let R, D;
  e[10] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (R = () => () => clearTimeout(T.current), D = [], e[10] = R, e[11] = D) : (R = e[10], D = e[11]), j.useEffect(R, D);
  let N;
  e[12] !== f || e[13] !== M || e[14] !== S || e[15] !== y ? (N = p8 ? {
    onTouchStart: (A) => {
      f || (A.touches.length === 1 ? M({
        target: A.currentTarget,
        clientX: A.touches[0].clientX,
        clientY: A.touches[0].clientY
      }) : S());
    },
    onTouchEnd: () => {
      f || y && S();
    },
    onPointerMove: (A) => {
      y && A.pointerType === "touch" && (A.movementY !== 0 || A.movementX !== 0) && S();
    },
    onTouchCancel: () => {
      y && S();
    }
  } : {
    onMouseLeave: () => {
      y && S();
    },
    onMouseDown: (A) => {
      f || M({
        target: A.currentTarget,
        clientX: A.clientX,
        clientY: A.clientY
      });
    },
    onMouseUp: () => {
      f || y && S();
    },
    onContextMenu: () => {
      y && S();
    }
  }, e[12] = f, e[13] = M, e[14] = S, e[15] = y, e[16] = N) : N = e[16];
  const V = N;
  let z;
  return e[17] !== V || e[18] !== y || e[19] !== v ? (z = [y, V, v], e[17] = V, e[18] = y, e[19] = v, e[20] = z) : z = e[20], z;
}
const v8 = "_root_1oiyj_1", b8 = "_fade_1oiyj_22", x8 = "_ripples_1oiyj_30", S8 = "_ripple_1oiyj_30", w8 = "_tapped_1oiyj_47", rr = (...a) => a.filter(Boolean).join(" "), T8 = (a, e) => {
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
}, je = ({
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
  } = Ds(), [y, p] = j.useState({}), [g, v, b] = g8({
    mode: s,
    disabled: r,
    onTap: ({
      target: S,
      clientX: E,
      clientY: M
    }) => {
      if (!h || !S) return;
      const {
        x: R,
        y: D,
        width: N,
        height: V
      } = S.getBoundingClientRect(), z = Math.max(N * 2, V * 2);
      p((A) => ({
        ...A,
        [`${performance.now()}`]: [E - R - z / 2, M - D - z / 2, z]
      }));
    }
  }), T = s === "opacity", w = T8(c, v);
  return /* @__PURE__ */ m.jsxs(a, {
    ...w,
    disabled: r || void 0,
    className: rr(v8, l, T && rr(...b)),
    children: [e, f && !T && /* @__PURE__ */ m.jsx("div", {
      className: rr(b8, ...b)
    }), h && /* @__PURE__ */ m.jsx("div", {
      className: x8,
      children: Object.entries(y).map(([S, E]) => /* @__PURE__ */ m.jsx("span", {
        className: rr(S8, g && w8),
        style: {
          left: E[0],
          top: E[1],
          width: E[2],
          height: E[2]
        },
        onAnimationEnd: () => {
          g || p((M) => {
            const R = {
              ...M
            };
            return delete R[S], R;
          });
        }
      }, S))
    })]
  });
}, C8 = "_label_1w5sq_1", j8 = "_accent_1w5sq_6", E8 = "_description_1w5sq_10", Yg = "_caption_1w5sq_14", A8 = (a) => {
  const e = wt.c(15), {
    type: l,
    title: s,
    description: r,
    caption: c,
    bold: f
  } = a, h = f ? "medium" : "regular", y = `${C8} ${l === "Accent" ? j8 : ""}`;
  let p;
  e[0] !== s || e[1] !== h ? (p = /* @__PURE__ */ m.jsx(rt, {
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
    className: c ? E8 : Yg,
    children: /* @__PURE__ */ m.jsx(rt, {
      variant: c ? "subheadline1" : "subheadline2",
      weight: "regular",
      children: r
    })
  }), e[6] = c, e[7] = r, e[8] = v) : v = e[8];
  let b;
  e[9] !== c ? (b = c && /* @__PURE__ */ m.jsx("div", {
    className: Yg,
    children: /* @__PURE__ */ m.jsx(rt, {
      variant: "subheadline2",
      weight: "regular",
      children: c
    })
  }), e[9] = c, e[10] = b) : b = e[10];
  let T;
  return e[11] !== g || e[12] !== v || e[13] !== b ? (T = /* @__PURE__ */ m.jsxs(m.Fragment, {
    children: [g, v, b]
  }), e[11] = g, e[12] = v, e[13] = b, e[14] = T) : T = e[14], T;
}, $b = "_chevron_en74z_1", qb = "_dropdown_en74z_8", $h = "_colorpicker_en74z_12", qh = "_picker_en74z_63", M8 = {
  chevron: $b,
  dropdown: qb,
  colorpicker: $h,
  picker: qh
}, Gg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  chevron: $b,
  colorpicker: $h,
  default: M8,
  dropdown: qb,
  picker: qh
}, Symbol.toStringTag, { value: "Module" })), _8 = (a) => {
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
    let R;
    return e[0] !== r ? (R = /* @__PURE__ */ m.jsx("div", {
      className: qh,
      children: /* @__PURE__ */ m.jsx(rt, {
        variant: "body",
        weight: "regular",
        children: r
      })
    }), e[0] = r, e[1] = R) : R = e[1], R;
  }
  if (l === "ColorPicker") {
    const R = y || v;
    let D;
    e[2] !== R || e[3] !== h || e[4] !== v || e[5] !== f || e[6] !== c ? (D = /* @__PURE__ */ m.jsx("input", {
      ref: h,
      type: "color",
      value: c,
      onChange: f,
      name: v,
      id: R
    }), e[2] = R, e[3] = h, e[4] = v, e[5] = f, e[6] = c, e[7] = D) : D = e[7];
    let N;
    e[8] !== R || e[9] !== b || e[10] !== c ? (N = b && /* @__PURE__ */ m.jsx("label", {
      htmlFor: R,
      children: /* @__PURE__ */ m.jsx(rt, {
        variant: "body",
        weight: "regular",
        children: c
      })
    }), e[8] = R, e[9] = b, e[10] = c, e[11] = N) : N = e[11];
    let V;
    return e[12] !== D || e[13] !== N ? (V = /* @__PURE__ */ m.jsxs("div", {
      className: $h,
      children: [D, N]
    }), e[12] = D, e[13] = N, e[14] = V) : V = e[14], V;
  }
  const T = Gg[l.toLowerCase()], w = Gg[s];
  let S;
  e[15] !== T || e[16] !== w ? (S = [T, w].filter(Boolean), e[15] = T, e[16] = w, e[17] = S) : S = e[17];
  const E = S.join(" ");
  let M;
  return e[18] !== r || e[19] !== E ? (M = /* @__PURE__ */ m.jsx("div", {
    className: E,
    children: r
  }), e[18] = r, e[19] = E, e[20] = M) : M = e[20], M;
}, D8 = (a) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5ZM15.1016 9.01953C14.7891 8.70711 14.2821 8.70711 13.9697 9.01953L12.001 10.9873L10.0342 9.02051C9.72176 8.70809 9.21574 8.70809 8.90332 9.02051C8.5909 9.33293 8.5909 9.83895 8.90332 10.1514L10.8701 12.1191L9.02051 13.9697C8.70809 14.2821 8.70809 14.7882 9.02051 15.1006C9.33293 15.413 9.83895 15.413 10.1514 15.1006L12.001 13.25L13.8525 15.1016C14.165 15.414 14.672 15.414 14.9844 15.1016C15.2968 14.7891 15.2968 14.2821 14.9844 13.9697L13.1328 12.1182L15.1016 10.1514C15.414 9.83895 15.414 9.33195 15.1016 9.01953Z", fill: "#3D3C3A" }))), R8 = "_root_9aal5_1", N8 = "_input_9aal5_5", O8 = "_inputWithClearButton_9aal5_25", z8 = "_clearButtonIcon_9aal5_29", B8 = "_empty_9aal5_49", L8 = "_icon_9aal5_61", V8 = /* @__PURE__ */ j.forwardRef((a, e) => {
  const l = wt.c(24);
  let s, r, c, f, h, y;
  l[0] !== a ? ({
    label: s,
    value: y,
    onChange: r,
    onClear: c,
    ...f
  } = a, h = (R) => {
    r(R.target.value);
  }, l[0] = a, l[1] = s, l[2] = r, l[3] = c, l[4] = f, l[5] = h, l[6] = y) : (s = l[1], r = l[2], c = l[3], f = l[4], h = l[5], y = l[6]);
  const p = h, g = !y && B8;
  let v;
  l[7] !== g ? (v = [R8, g].filter(Boolean), l[7] = g, l[8] = v) : v = l[8];
  const b = v.join(" "), T = `${N8} ${c ? O8 : ""}`, w = !r;
  let S;
  l[9] !== p || l[10] !== s || l[11] !== e || l[12] !== f || l[13] !== T || l[14] !== w || l[15] !== y ? (S = /* @__PURE__ */ m.jsx("input", {
    "aria-label": s,
    onChange: p,
    type: "text",
    className: T,
    placeholder: s,
    value: y,
    readOnly: w,
    ref: e,
    ...f
  }), l[9] = p, l[10] = s, l[11] = e, l[12] = f, l[13] = T, l[14] = w, l[15] = y, l[16] = S) : S = l[16];
  let E;
  l[17] !== s || l[18] !== c ? (E = c && /* @__PURE__ */ m.jsx("button", {
    type: "button",
    className: [L8, z8].filter(Boolean).join(" "),
    onClick: c,
    "aria-label": `Clear ${s}`,
    children: /* @__PURE__ */ m.jsx(D8, {})
  }), l[17] = s, l[18] = c, l[19] = E) : E = l[19];
  let M;
  return l[20] !== b || l[21] !== S || l[22] !== E ? (M = /* @__PURE__ */ m.jsxs(rt, {
    variant: "body",
    weight: "regular",
    className: b,
    children: [S, E]
  }), l[20] = b, l[21] = S, l[22] = E, l[23] = M) : M = l[23], M;
}), Xg = "_root_1aqfj_1";
function k8(a) {
  const e = wt.c(15), {
    value: l,
    defaultValue: s,
    onChange: r,
    disabled: c,
    className: f
  } = a, h = s === void 0 ? !1 : s, y = c === void 0 ? !1 : c, p = l !== void 0, [g, v] = j.useState(h), b = p ? l : g;
  let T;
  e[0] !== r ? (T = (A) => {
    r && r(A);
  }, e[0] = r, e[1] = T) : T = e[1];
  const w = T;
  let S;
  e[2] !== b || e[3] !== w || e[4] !== p ? (S = () => {
    if (Ea.HapticFeedback.selectionChanged(), p) {
      w(!b);
      return;
    }
    v((A) => {
      const H = !A;
      return w(H), H;
    });
  }, e[2] = b, e[3] = w, e[4] = p, e[5] = S) : S = e[5];
  const E = S;
  let M;
  e[6] !== y || e[7] !== E ? (M = (A) => {
    A.stopPropagation(), !y && E();
  }, e[6] = y, e[7] = E, e[8] = M) : M = e[8];
  const R = M, D = f ? `${Xg} ${f}` : Xg, N = y || void 0, V = y || void 0;
  let z;
  return e[9] !== b || e[10] !== D || e[11] !== R || e[12] !== N || e[13] !== V ? (z = /* @__PURE__ */ m.jsx("div", {
    className: D,
    "data-state": b,
    "data-disabled": N,
    onClick: R,
    role: "switch",
    "aria-checked": b,
    "aria-disabled": V
  }), e[9] = b, e[10] = D, e[11] = R, e[12] = N, e[13] = V, e[14] = z) : z = e[14], z;
}
const U8 = (a) => {
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
  const p = f === void 0 ? !1 : f, g = h === void 0 ? !1 : h, v = y !== void 0, [b, T] = j.useState(p), w = v ? y : b;
  let S;
  e[8] !== s ? (S = (A) => {
    s && s(A);
  }, e[8] = s, e[9] = S) : S = e[9];
  const E = S;
  let M;
  e[10] !== E || e[11] !== v ? (M = (A) => {
    v || T(A), E(A);
  }, e[10] = E, e[11] = v, e[12] = M) : M = e[12];
  const R = M;
  let D;
  e[13] !== w || e[14] !== g || e[15] !== E || e[16] !== R || e[17] !== v ? (D = () => {
    if (!g) {
      if (Ea.HapticFeedback.selectionChanged(), v) {
        R(!w);
        return;
      }
      T((A) => {
        const H = !A;
        return E(H), H;
      });
    }
  }, e[13] = w, e[14] = g, e[15] = E, e[16] = R, e[17] = v, e[18] = D) : D = e[18];
  const N = D;
  let V;
  e[19] !== w || e[20] !== g || e[21] !== R ? (V = /* @__PURE__ */ m.jsx(Zn.Part, {
    type: "Switch",
    children: /* @__PURE__ */ m.jsx(k8, {
      value: w,
      onChange: R,
      disabled: g
    })
  }), e[19] = w, e[20] = g, e[21] = R, e[22] = V) : V = e[22];
  let z;
  return e[23] !== l || e[24] !== N || e[25] !== r || e[26] !== c || e[27] !== V ? (z = /* @__PURE__ */ m.jsx(Zn, {
    start: c,
    end: V,
    onClick: N,
    ...r,
    children: l
  }), e[23] = l, e[24] = N, e[25] = r, e[26] = c, e[27] = V, e[28] = z) : z = e[28], z;
}, Pg = "_root_146xt_10", H8 = "_start_146xt_32", $8 = "_image_146xt_37", q8 = "_icon_146xt_45", Y8 = "_body_146xt_57", G8 = "_end_146xt_65", X8 = "_caption_146xt_76", P8 = "_label_146xt_80", K8 = (a) => {
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
    className: H8,
    children: f
  }), e[8] = f, e[9] = v) : v = e[9];
  let b;
  e[10] !== l ? (b = /* @__PURE__ */ m.jsx("div", {
    className: Y8,
    children: l
  }), e[10] = l, e[11] = b) : b = e[11];
  let T;
  e[12] !== s ? (T = s && /* @__PURE__ */ m.jsx("div", {
    className: G8,
    children: s
  }), e[12] = s, e[13] = T) : T = e[13];
  let w;
  e[14] !== v || e[15] !== b || e[16] !== T ? (w = /* @__PURE__ */ m.jsxs(m.Fragment, {
    children: [v, b, T]
  }), e[14] = v, e[15] = b, e[16] = T, e[17] = w) : w = e[17];
  const S = w;
  if (!g) {
    let M;
    return e[18] !== p || e[19] !== S || e[20] !== r || e[21] !== c ? (M = /* @__PURE__ */ m.jsx(p, {
      className: Pg,
      onClick: r,
      ...c,
      children: S
    }), e[18] = p, e[19] = S, e[20] = r, e[21] = c, e[22] = M) : M = e[22], M;
  }
  let E;
  return e[23] !== p || e[24] !== S || e[25] !== r || e[26] !== c ? (E = /* @__PURE__ */ m.jsx(je, {
    as: p,
    className: Pg,
    onClick: r,
    ...c,
    children: S
  }), e[23] = p, e[24] = S, e[25] = r, e[26] = c, e[27] = E) : E = e[27], E;
}, Z8 = (a) => {
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
        className: $8
      }), e[0] = c, e[1] = p) : p = e[1], h = p;
      break t;
    }
    case "Icon": {
      let p;
      e[2] !== f ? (p = /* @__PURE__ */ m.jsx("div", {
        className: q8,
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
}, Q8 = (a) => {
  const e = wt.c(7), {
    label: l,
    caption: s
  } = a;
  let r;
  e[0] !== l ? (r = /* @__PURE__ */ m.jsx("div", {
    className: P8,
    children: /* @__PURE__ */ m.jsx(rt, {
      variant: "body",
      weight: "regular",
      children: l
    })
  }), e[0] = l, e[1] = r) : r = e[1];
  let c;
  e[2] !== s ? (c = s && /* @__PURE__ */ m.jsx("div", {
    className: X8,
    children: /* @__PURE__ */ m.jsx(rt, {
      variant: "subheadline2",
      weight: "regular",
      children: s
    })
  }), e[2] = s, e[3] = c) : c = e[3];
  let f;
  return e[4] !== r || e[5] !== c ? (f = /* @__PURE__ */ m.jsxs(m.Fragment, {
    children: [r, c]
  }), e[4] = r, e[5] = c, e[6] = f) : f = e[6], f;
}, Zn = Object.assign(K8, {
  Start: Z8,
  End: Q8,
  Part: _8,
  Text: A8,
  Editable: V8,
  Switch: U8
});
Xr.section;
Ah[16];
function F8(a, e, l) {
  const s = wt.c(8);
  let r;
  s[0] !== l ? (r = {}, s[0] = l, s[1] = r) : r = s[1];
  const {
    enabled: c
  } = r, f = c === void 0 ? !0 : c, h = j.useRef(e);
  let y;
  s[2] !== e ? (y = () => {
    h.current = e;
  }, s[2] = e, s[3] = y) : y = s[3], j.useEffect(y);
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
  }, g = [a, f], s[4] = f, s[5] = a, s[6] = p, s[7] = g) : (p = s[6], g = s[7]), j.useEffect(p, g);
}
const Kf = (a, e, l) => Math.min(Math.max(a, e), l), J8 = /* @__PURE__ */ j.createContext({
  colorScheme: "light",
  setColorScheme: () => {
  },
  toggleColorScheme: () => {
  }
}), W8 = ["light", "dark"], Dd = (a) => W8.includes(a), Rd = () => {
  if (typeof window > "u" || typeof document > "u")
    return null;
  const a = window.getComputedStyle(document.documentElement).getPropertyValue("--tg-color-scheme").trim();
  return Dd(a) ? a : null;
}, Yb = () => typeof window > "u" || !window.matchMedia ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light", I8 = () => Rd() ?? Yb(), tj = typeof window > "u" ? j.useEffect : j.useLayoutEffect, ej = (a) => {
  const e = wt.c(20), {
    children: l,
    defaultColorScheme: s,
    onColorSchemeChange: r
  } = a, [c, f] = j.useState(I8);
  let h;
  e[0] !== s ? (h = () => Dd(s) ? s : null, e[0] = s, e[1] = h) : h = e[1];
  const [y, p] = j.useState(h), g = y ?? c;
  let v;
  e[2] !== g || e[3] !== r ? (v = (z) => {
    const A = typeof z == "function" ? z(g) : z;
    Dd(A) && (p(A), r?.(A));
  }, e[2] = g, e[3] = r, e[4] = v) : v = e[4];
  const b = v;
  let T;
  e[5] !== g || e[6] !== b ? (T = () => {
    b(g === "dark" ? "light" : "dark");
  }, e[5] = g, e[6] = b, e[7] = T) : T = e[7];
  const w = T;
  let S, E;
  e[8] !== g ? (S = () => {
    document.documentElement.dataset.colorScheme = g, document.body.dataset.colorScheme = g;
  }, E = [g], e[8] = g, e[9] = S, e[10] = E) : (S = e[9], E = e[10]), tj(S, E);
  let M, R;
  e[11] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (M = () => {
    const z = () => {
      const G = Rd();
      if (G) {
        f(G);
        return;
      }
      f(Yb());
    }, A = (G) => {
      Rd() || f(G.matches ? "dark" : "light");
    };
    z();
    const H = window.matchMedia("(prefers-color-scheme: dark)");
    return Ea.onEvent("themeChanged", z), H.addEventListener("change", A), () => {
      Ea.offEvent("themeChanged", z), H.removeEventListener("change", A);
    };
  }, R = [], e[11] = M, e[12] = R) : (M = e[11], R = e[12]), j.useEffect(M, R);
  let D;
  e[13] !== g || e[14] !== b || e[15] !== w ? (D = {
    colorScheme: g,
    setColorScheme: b,
    toggleColorScheme: w
  }, e[13] = g, e[14] = b, e[15] = w, e[16] = D) : D = e[16];
  const N = D;
  let V;
  return e[17] !== l || e[18] !== N ? (V = /* @__PURE__ */ m.jsx(J8.Provider, {
    value: N,
    children: l
  }), e[17] = l, e[18] = N, e[19] = V) : V = e[19], V;
}, nj = /* @__PURE__ */ j.forwardRef((a, e) => {
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
  return l[5] !== s || l[6] !== h || l[7] !== r || l[8] !== e || l[9] !== f ? (y = /* @__PURE__ */ m.jsx(AC, {
    ref: e,
    href: f,
    onClick: h,
    ...r,
    children: s
  }), l[5] = s, l[6] = h, l[7] = r, l[8] = e, l[9] = f, l[10] = y) : y = l[10], y;
});
nj.displayName = "TransitionLink";
const Gb = ({
  children: a
}) => a;
Gb.isModalPage = !0;
Gb.propTypes = {
  id: yn.string.isRequired,
  children: yn.node
};
Xr.modal;
Ah[16];
const aj = (a) => {
  const e = wt.c(2), {
    children: l
  } = a;
  let s;
  return e[0] !== l ? (s = /* @__PURE__ */ m.jsx(ET, {
    features: uC,
    strict: !0,
    children: l
  }), e[0] = l, e[1] = s) : s = e[1], s;
}, {
  setHeaderColor: ij,
  setBackgroundColor: lj
} = Ea, sl = (a) => {
  const e = wt.c(18), {
    children: l,
    mode: s,
    headerColor: r,
    backgroundColor: c,
    expandOnMount: f
  } = a, h = s === void 0 ? "secondary" : s, {
    inDetailPane: y,
    setPaneBackground: p
  } = e8();
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
  const T = b, w = r ? `#${r}` : v[h], S = c ? `#${c}` : v[h], E = c ? `#${c}` : `var(${T[h]})`;
  let M, R;
  e[2] !== f ? (M = () => {
    f && Ea.expand();
  }, R = [f], e[2] = f, e[3] = M, e[4] = R) : (M = e[3], R = e[4]), j.useEffect(M, R);
  let D, N;
  e[5] !== E || e[6] !== y || e[7] !== S || e[8] !== w ? (D = () => {
    y || (Ea.initData ? (lj(S), ij(w)) : document.body.style.backgroundColor = E, document.body.style.setProperty("--page-background", E));
  }, N = [S, w, E, y], e[5] = E, e[6] = y, e[7] = S, e[8] = w, e[9] = D, e[10] = N) : (D = e[9], N = e[10]), j.useEffect(D, N);
  let V, z;
  e[11] !== E || e[12] !== y || e[13] !== p ? (V = () => {
    !y || !p || p(E);
  }, z = [y, p, E], e[11] = E, e[12] = y, e[13] = p, e[14] = V, e[15] = z) : (V = e[14], z = e[15]), j.useEffect(V, z);
  let A;
  return e[16] !== l ? (A = /* @__PURE__ */ m.jsx(m.Fragment, {
    children: l
  }), e[16] = l, e[17] = A) : A = e[17], A;
};
sl.propTypes = {
  children: yn.node,
  mode: yn.oneOf(["primary", "secondary"]),
  headerColor: yn.string,
  backgroundColor: yn.string,
  expandOnMount: yn.bool
};
const sj = "_root_125s3_1", oj = "_card_125s3_16", rj = "_container_125s3_22", Zf = "flex justify-between gap-compact px-content py-10 text-section";
function Kg(a) {
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
      e[5] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (f = f8(Zf, "text-foreground"), e[5] = f) : f = e[5];
      let h;
      e[6] !== s ? (h = /* @__PURE__ */ m.jsx(rt, {
        variant: "title3",
        weight: "bold",
        children: s
      }), e[6] = s, e[7] = h) : h = e[7];
      let y;
      e[8] !== c ? (y = c && /* @__PURE__ */ m.jsx(rt, {
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
      e[14] !== s ? (f = /* @__PURE__ */ m.jsx(rt, {
        variant: "footnote",
        children: s
      }), e[14] = s, e[15] = f) : f = e[15];
      let h;
      return e[16] !== l || e[17] !== f ? (h = /* @__PURE__ */ m.jsx("div", {
        className: Zf,
        ...l,
        children: f
      }), e[16] = l, e[17] = f, e[18] = h) : h = e[18], h;
    }
    default: {
      let f;
      e[19] !== s ? (f = /* @__PURE__ */ m.jsx(rt, {
        variant: "body",
        weight: "semibold",
        children: s
      }), e[19] = s, e[20] = f) : f = e[20];
      let h;
      e[21] !== c ? (h = c && /* @__PURE__ */ m.jsx(rt, {
        variant: "footnote",
        children: c
      }), e[21] = c, e[22] = h) : h = e[22];
      let y;
      return e[23] !== l || e[24] !== f || e[25] !== h ? (y = /* @__PURE__ */ m.jsxs("div", {
        className: Zf,
        ...l,
        children: [f, h]
      }), e[23] = l, e[24] = f, e[25] = h, e[26] = y) : y = e[26], y;
    }
  }
}
const uj = Xr.section, cj = Ah[16], fj = 0.6, yt = (a) => {
  const e = wt.c(6);
  let l, s;
  e[0] !== a ? ({
    children: l,
    ...s
  } = a, e[0] = a, e[1] = l, e[2] = s) : (l = e[1], s = e[2]);
  let r;
  return e[3] !== l || e[4] !== s ? (r = /* @__PURE__ */ m.jsx("section", {
    className: sj,
    ...s,
    children: l
  }), e[3] = l, e[4] = s, e[5] = r) : r = e[5], r;
}, dj = (a) => {
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
  } = Ds(), h = j.useRef(null), y = j.useRef(null), p = f ? uj : cj;
  let g;
  e[5] !== p ? (g = {
    radius: p,
    smoothing: fj
  }, e[5] = p, e[6] = g) : g = e[6];
  let v;
  e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = {
    autoEffects: !1
  }, e[7] = v) : v = e[7], sb(f ? y : h, g, v);
  let b;
  e[8] !== r ? (b = r && /* @__PURE__ */ m.jsx(Kg, {
    title: r
  }), e[8] = r, e[9] = b) : b = e[9];
  let T;
  e[10] !== l ? (T = /* @__PURE__ */ m.jsx("div", {
    ref: y,
    className: rj,
    children: l
  }), e[10] = l, e[11] = T) : T = e[11];
  let w;
  e[12] !== b || e[13] !== T ? (w = /* @__PURE__ */ m.jsxs("div", {
    ref: h,
    className: oj,
    children: [b, T]
  }), e[12] = b, e[13] = T, e[14] = w) : w = e[14];
  let S;
  e[15] !== s ? (S = s && /* @__PURE__ */ m.jsx(Kg, {
    type: "Footer",
    title: s
  }), e[15] = s, e[16] = S) : S = e[16];
  let E;
  return e[17] !== c || e[18] !== w || e[19] !== S ? (E = /* @__PURE__ */ m.jsxs("section", {
    ...c,
    children: [w, S]
  }), e[17] = c, e[18] = w, e[19] = S, e[20] = E) : E = e[20], E;
};
yt.Item = dj;
const hj = "_root_cnxqv_1", mj = "_icon_cnxqv_17", pj = "_content_cnxqv_42", yj = "_title_cnxqv_55", gj = "_description_cnxqv_56", vj = "_action_cnxqv_61", bj = "_link_cnxqv_61", xj = "_host_cnxqv_92", Sj = "_host_top_cnxqv_105", wj = "_host_bottom_cnxqv_109", Tj = "_item_cnxqv_114", Cj = (a) => {
  const e = wt.c(19), {
    icon: l,
    title: s,
    description: r,
    link: c,
    action: f
  } = a, h = !!r;
  let y;
  e[0] !== l ? (y = l ? /* @__PURE__ */ m.jsx("div", {
    className: mj,
    "aria-hidden": "true",
    children: l
  }) : null, e[0] = l, e[1] = y) : y = e[1];
  const p = h ? "semibold" : void 0;
  let g;
  e[2] !== p || e[3] !== s ? (g = /* @__PURE__ */ m.jsx(rt, {
    as: "p",
    className: yj,
    variant: "subheadline2",
    weight: p,
    children: s
  }), e[2] = p, e[3] = s, e[4] = g) : g = e[4];
  let v;
  e[5] !== r ? (v = r ? /* @__PURE__ */ m.jsx(rt, {
    as: "p",
    className: gj,
    variant: "subheadline2",
    children: r
  }) : null, e[5] = r, e[6] = v) : v = e[6];
  let b;
  e[7] !== c ? (b = c ? /* @__PURE__ */ m.jsx("button", {
    type: "button",
    className: bj,
    onClick: c.onClick,
    children: /* @__PURE__ */ m.jsx(rt, {
      as: "span",
      variant: "subheadline2",
      children: c.label
    })
  }) : null, e[7] = c, e[8] = b) : b = e[8];
  let T;
  e[9] !== g || e[10] !== v || e[11] !== b ? (T = /* @__PURE__ */ m.jsxs("div", {
    className: pj,
    children: [g, v, b]
  }), e[9] = g, e[10] = v, e[11] = b, e[12] = T) : T = e[12];
  let w;
  e[13] !== f ? (w = f ? /* @__PURE__ */ m.jsx("button", {
    type: "button",
    className: vj,
    onClick: f.onClick,
    children: /* @__PURE__ */ m.jsx(rt, {
      as: "span",
      variant: "body",
      children: f.label
    })
  }) : null, e[13] = f, e[14] = w) : w = e[14];
  let S;
  return e[15] !== y || e[16] !== T || e[17] !== w ? (S = /* @__PURE__ */ m.jsxs("div", {
    className: hj,
    role: "status",
    "aria-live": "polite",
    children: [y, T, w]
  }), e[15] = y, e[16] = T, e[17] = w, e[18] = S) : S = e[18], S;
};
yn.shape({
  label: yn.node.isRequired,
  onClick: yn.func
});
const jj = 4e3, Ej = 100, Aj = 500, Mj = (a) => {
  if (a)
    try {
      Ea.HapticFeedback?.notificationOccurred(a);
    } catch {
    }
}, _j = (a) => {
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
  } = l, T = g === void 0 ? "bottom" : g, w = v === void 0 ? jj : v, S = cC(), [E, M] = j.useState(!1), [R, D] = j.useState(0);
  let N;
  e[0] !== r || e[1] !== s ? (N = () => s(r), e[0] = r, e[1] = s, e[2] = N) : N = e[2];
  const V = N;
  let z, A;
  e[3] !== b ? (z = () => {
    Mj(b);
  }, A = [b], e[3] = b, e[4] = z, e[5] = A) : (z = e[4], A = e[5]), j.useEffect(z, A);
  let H, G;
  e[6] !== V || e[7] !== w || e[8] !== E ? (H = () => {
    if (!w || E)
      return;
    const Rt = setTimeout(V, w);
    return () => clearTimeout(Rt);
  }, G = [w, E, V], e[6] = V, e[7] = w, e[8] = E, e[9] = H, e[10] = G) : (H = e[9], G = e[10]), j.useEffect(H, G);
  const K = T === "top" ? -32 : 32, nt = b === "error";
  let at;
  e[11] !== S || e[12] !== K ? (at = S ? {
    opacity: 0
  } : {
    opacity: 0,
    y: K,
    scale: 0.96
  }, e[11] = S, e[12] = K, e[13] = at) : at = e[13];
  const tt = at;
  let Z;
  e[14] !== nt || e[15] !== S ? (Z = S ? {
    opacity: 1
  } : {
    opacity: 1,
    y: 0,
    scale: 1,
    x: nt ? [0, -10, 10, -7, 7, -3, 3, 0] : 0,
    transition: {
      default: d8.SNACKBAR,
      ...nt && {
        x: {
          duration: 0.45,
          ease: "easeOut",
          delay: 0.18
        }
      }
    }
  }, e[14] = nt, e[15] = S, e[16] = Z) : Z = e[16];
  const it = Z;
  let L;
  e[17] !== R || e[18] !== S || e[19] !== K ? (L = S ? {
    opacity: 0,
    transition: {
      duration: 0.15
    }
  } : {
    opacity: 0,
    x: R * 400,
    y: R === 0 ? K : 0,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }, e[17] = R, e[18] = S, e[19] = K, e[20] = L) : L = e[20];
  const $ = L;
  let et;
  e[21] !== V ? (et = (Rt, Mt) => {
    M(!1);
    const Pt = Mt.offset.x, Kt = Mt.velocity.x;
    (Math.abs(Pt) > Ej || Math.abs(Kt) > Aj) && (D(Pt >= 0 ? 1 : -1), V());
  }, e[21] = V, e[22] = et) : et = e[22];
  const st = et;
  let J;
  e[23] !== V ? (J = (Rt) => {
    if (Rt)
      return {
        ...Rt,
        onClick: () => {
          Rt.onClick?.(), V();
        }
      };
  }, e[23] = V, e[24] = J) : J = e[24];
  const _ = J, U = S ? !1 : "x";
  let I;
  e[25] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (I = () => M(!0), e[25] = I) : I = e[25];
  let lt;
  e[26] !== y || e[27] !== _ ? (lt = _(y), e[26] = y, e[27] = _, e[28] = lt) : lt = e[28];
  let ft;
  e[29] !== p || e[30] !== _ ? (ft = _(p), e[29] = p, e[30] = _, e[31] = ft) : ft = e[31];
  let pt;
  e[32] !== h || e[33] !== c || e[34] !== lt || e[35] !== ft || e[36] !== f ? (pt = /* @__PURE__ */ m.jsx(Cj, {
    icon: c,
    title: f,
    description: h,
    link: lt,
    action: ft
  }), e[32] = h, e[33] = c, e[34] = lt, e[35] = ft, e[36] = f, e[37] = pt) : pt = e[37];
  let vt;
  return e[38] !== it || e[39] !== $ || e[40] !== st || e[41] !== tt || e[42] !== U || e[43] !== pt ? (vt = /* @__PURE__ */ m.jsx(el, {
    className: Tj,
    initial: tt,
    animate: it,
    exit: $,
    layout: !0,
    drag: U,
    dragSnapToOrigin: !0,
    dragElastic: 0.6,
    dragMomentum: !1,
    onDragStart: I,
    onDragEnd: st,
    children: pt
  }), e[38] = it, e[39] = $, e[40] = st, e[41] = tt, e[42] = U, e[43] = pt, e[44] = vt) : vt = e[44], vt;
}, Xb = {
  top: Sj,
  bottom: wj
}, Dj = Object.keys(Xb), Rj = (a) => {
  const e = wt.c(5), {
    snackbars: l,
    onDismiss: s
  } = a;
  let r;
  e[0] !== s || e[1] !== l ? (r = Dj.map((f) => {
    const h = l.filter((y) => (y.position ?? "bottom") === f);
    return /* @__PURE__ */ m.jsx("div", {
      className: `${xj} ${Xb[f]}`,
      children: /* @__PURE__ */ m.jsx(jT, {
        initial: !1,
        children: h.map((y) => /* @__PURE__ */ m.jsx(_j, {
          item: y,
          onDismiss: s
        }, y.id))
      })
    }, f);
  }), e[0] = s, e[1] = l, e[2] = r) : r = e[2];
  let c;
  return e[3] !== r ? (c = /* @__PURE__ */ Gr.createPortal(/* @__PURE__ */ m.jsx(m.Fragment, {
    children: r
  }), document.body), e[3] = r, e[4] = c) : c = e[4], c;
}, Pb = /* @__PURE__ */ j.createContext(null), Nj = () => {
  const a = j.useContext(Pb);
  if (!a)
    throw new Error("useSnackbar must be used inside <SnackbarProvider>");
  return a;
}, Kb = (a) => {
  const e = wt.c(9), {
    children: l
  } = a;
  let s;
  e[0] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (s = [], e[0] = s) : s = e[0];
  const [r, c] = j.useState(s), f = j.useRef(0);
  let h;
  e[1] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (h = (w) => {
    c((S) => S.filter((E) => E.id !== w));
  }, e[1] = h) : h = e[1];
  const y = h;
  let p;
  e[2] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (p = (w) => {
    f.current = f.current + 1;
    const S = f.current;
    return c((E) => [...E, {
      id: S,
      ...w
    }]), S;
  }, e[2] = p) : p = e[2];
  const g = p;
  let v;
  e[3] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (v = {
    show: g,
    dismiss: y
  }, e[3] = v) : v = e[3];
  let b;
  e[4] !== r ? (b = /* @__PURE__ */ m.jsx(Rj, {
    snackbars: r,
    onDismiss: y
  }), e[4] = r, e[5] = b) : b = e[5];
  let T;
  return e[6] !== l || e[7] !== b ? (T = /* @__PURE__ */ m.jsxs(Pb.Provider, {
    value: v,
    children: [l, b]
  }), e[6] = l, e[7] = b, e[8] = T) : T = e[8], T;
}, Oj = (a) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/loader" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", d: "M12 3.02148C16.9704 3.02148 20.9997 7.07957 21 12.0859C21 17.0925 16.9706 21.1514 12 21.1514C7.02944 21.1514 3 17.0925 3 12.0859C3.00026 11.5299 3.44787 11.0791 4 11.0791C4.55213 11.0791 4.99974 11.5299 5 12.0859C5 15.9799 8.13401 19.1367 12 19.1367C15.866 19.1367 19 15.9799 19 12.0859C18.9997 8.19215 15.8658 5.03613 12 5.03613C9.64439 5.03613 7.56033 6.20674 6.29004 8.00684C5.97018 8.46016 5.34566 8.56708 4.89551 8.24512C4.44533 7.92286 4.33924 7.29328 4.65918 6.83984C6.28848 4.53074 8.96935 3.02148 12 3.02148Z", fill: "#3D3C3A" }))), zj = "_centered_1ma1e_1", Bj = "_spinner_1ma1e_8", Yh = (a) => {
  const e = wt.c(15);
  let l, s, r, c;
  e[0] !== a ? ({
    centered: l,
    className: s,
    size: c,
    ...r
  } = a, e[0] = a, e[1] = l, e[2] = s, e[3] = r, e[4] = c) : (l = e[1], s = e[2], r = e[3], c = e[4]);
  let f;
  e[5] !== s ? (f = [Bj, s].filter(Boolean), e[5] = s, e[6] = f) : f = e[6];
  const h = f.join(" ");
  let y;
  e[7] !== c ? (y = c ? {
    width: c,
    height: c
  } : void 0, e[7] = c, e[8] = y) : y = e[8];
  const p = y;
  let g;
  e[9] !== h || e[10] !== r || e[11] !== p ? (g = /* @__PURE__ */ m.jsx(Oj, {
    ...r,
    className: h,
    style: p
  }), e[9] = h, e[10] = r, e[11] = p, e[12] = g) : g = e[12];
  const v = g;
  if (l) {
    let b;
    return e[13] !== v ? (b = /* @__PURE__ */ m.jsx("div", {
      className: zj,
      children: v
    }), e[13] = v, e[14] = b) : b = e[14], b;
  }
  return v;
}, Lj = "_root_warzp_1", Vj = "_gradient_warzp_71", kj = "_clipPathContainer_warzp_113", Uj = "_tab_1mynw_1", Hj = "_icon_1mynw_37", $j = "_active_1mynw_62", Zb = (a) => {
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
  const g = `${Uj} ${s ? $j : ""} ${y}`;
  let v;
  e[8] !== g ? (v = g.trim(), e[8] = g, e[9] = v) : v = e[9];
  let b;
  e[10] !== l ? (b = /* @__PURE__ */ m.jsx(el, {
    layout: !0,
    className: Hj,
    children: l
  }), e[10] = l, e[11] = b) : b = e[11];
  let T;
  e[12] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (T = {
    display: "inline-block"
  }, e[12] = T) : T = e[12];
  let w;
  e[13] !== r ? (w = /* @__PURE__ */ m.jsx(m6, {
    layout: !0,
    style: T,
    children: r
  }), e[13] = r, e[14] = w) : w = e[14];
  let S;
  return e[15] !== c || e[16] !== f || e[17] !== v || e[18] !== b || e[19] !== w ? (S = /* @__PURE__ */ m.jsxs(el, {
    layout: !0,
    transition: p,
    ...f,
    className: v,
    onClick: c,
    children: [b, w]
  }), e[15] = c, e[16] = f, e[17] = v, e[18] = b, e[19] = w, e[20] = S) : S = e[20], S;
};
function qj({
  tabsLength: a,
  activeIndex: e,
  onSnapToSame: l,
  onSnapToNew: s,
  spring: r
}) {
  const c = j.useRef(null), [f, h] = j.useState(!1), [y, p] = j.useState(null), g = j.useRef(null), v = j.useRef(!1), b = j.useRef(null), T = j.useRef(0), w = 6, S = 100 / a, E = `calc(${S}% + 7.33px - 4px)`, M = `calc(${S * e}% - ${3.67 * e}px)`, R = M, D = `calc(100% - (${M} + ${E}) - 2.33px * ${e})`, N = f && y != null ? `inset(0 ${100 - (y + S)}% 0 ${y}% round 100px)` : `inset(0 ${D} 0 ${R} round 100px)`, V = f ? {
    clipPath: {
      duration: 0
    }
  } : {
    clipPath: r
  }, z = (tt) => {
    const Z = c.current;
    if (!Z) return;
    const it = Z.getBoundingClientRect(), L = tt - it.left, $ = it.width;
    if ($ <= 0) return;
    const et = L / $ * 100, st = Kf(et - S / 2, 0, 100 - S);
    p(st);
  }, A = (tt) => {
    v.current = !0, b.current = tt.pointerId, T.current = tt.clientX;
  }, H = (tt) => {
    if (!(b.current != null && tt.pointerId !== b.current)) {
      if (!f) {
        if (!v.current) return;
        if (Math.abs(tt.clientX - T.current) >= w) {
          try {
            tt.currentTarget.setPointerCapture?.(tt.pointerId), g.current = tt.pointerId;
          } catch {
          }
          h(!0), z(tt.clientX), tt.preventDefault();
        }
        return;
      }
      g.current != null && tt.pointerId !== g.current || (z(tt.clientX), tt.preventDefault());
    }
  }, G = (tt) => {
    const Z = c.current;
    let it = e;
    if (Z && typeof tt == "number") {
      const L = Z.getBoundingClientRect(), $ = tt - L.left, et = L.width;
      if (et > 0) {
        const st = et / a;
        it = Kf(Math.round($ / st - 0.5), 0, a - 1);
      }
    } else if (y != null) {
      const L = 100 / a;
      it = Kf(Math.round(y / L), 0, a - 1);
    }
    it === e ? l?.() : s?.(it), h(!1), p(null), g.current = null;
  }, K = (tt) => {
    if (v.current = !1, b.current = null, !!f && !(g.current != null && tt.pointerId !== g.current)) {
      try {
        tt.currentTarget.releasePointerCapture?.(tt.pointerId);
      } catch {
      }
      G(tt.clientX), tt.preventDefault();
    }
  }, nt = (tt) => {
    v.current = !1, b.current = null, f && (G(tt?.clientX), tt.preventDefault?.());
  }, at = (tt) => {
    f && G(tt?.clientX);
  };
  return j.useEffect(() => {
    const tt = () => {
      h(!1), p(null), g.current = null, v.current = !1, b.current = null;
    };
    return window.addEventListener("blur", tt), () => window.removeEventListener("blur", tt);
  }, []), {
    overlayRef: c,
    isDragging: f,
    animate: {
      clipPath: N
    },
    transition: V,
    handlers: {
      onPointerDown: A,
      onPointerMove: H,
      onPointerUp: K,
      onPointerCancel: nt,
      onPointerLeave: at
    }
  };
}
function Yj(a) {
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
  const y = h, p = c === void 0 ? 64 : c, g = j.useId();
  if (!l || !s)
    return null;
  const {
    top: v,
    right: b,
    bottom: T,
    left: w
  } = y, S = l + w + b, E = p + v + T, M = Math.max(0, S - w - b), R = Math.min(p / 2, M / 2, 999), D = `grad-${g}`, N = `mask-${g}`, V = Math.max(w, b), z = Math.max(v, T), A = `0 0 ${S} ${E}`;
  let H;
  e[2] !== f ? (H = [Vj, f].filter(Boolean), e[2] = f, e[3] = H) : H = e[3];
  const G = H.join(" "), K = `${V}px`, nt = `${z}px`;
  let at;
  e[4] !== K || e[5] !== nt ? (at = {
    "--overlay-padding-x": K,
    "--overlay-padding-y": nt
  }, e[4] = K, e[5] = nt, e[6] = at) : at = e[6];
  let tt, Z;
  e[7] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (tt = /* @__PURE__ */ m.jsx("stop", {
    offset: "0%",
    stopColor: "var(--mask-color)",
    stopOpacity: "var(--mask-opacity-top)"
  }), Z = /* @__PURE__ */ m.jsx("stop", {
    offset: "100%",
    stopColor: "var(--mask-color)",
    stopOpacity: "var(--mask-opacity-bottom)"
  }), e[7] = tt, e[8] = Z) : (tt = e[7], Z = e[8]);
  let it;
  e[9] !== D ? (it = /* @__PURE__ */ m.jsxs("linearGradient", {
    id: D,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1",
    children: [tt, Z]
  }), e[9] = D, e[10] = it) : it = e[10];
  let L;
  e[11] !== E || e[12] !== S ? (L = /* @__PURE__ */ m.jsx("rect", {
    x: "0",
    y: "0",
    width: S,
    height: E,
    fill: "var(--ui-static-white)"
  }), e[11] = E, e[12] = S, e[13] = L) : L = e[13];
  let $;
  e[14] !== p || e[15] !== M || e[16] !== w || e[17] !== R || e[18] !== v ? ($ = /* @__PURE__ */ m.jsx("rect", {
    x: w,
    y: v,
    width: M,
    height: p,
    rx: R,
    ry: R,
    fill: "var(--ui-static-black)"
  }), e[14] = p, e[15] = M, e[16] = w, e[17] = R, e[18] = v, e[19] = $) : $ = e[19];
  let et;
  e[20] !== N || e[21] !== L || e[22] !== $ ? (et = /* @__PURE__ */ m.jsxs("mask", {
    id: N,
    maskUnits: "userSpaceOnUse",
    children: [L, $]
  }), e[20] = N, e[21] = L, e[22] = $, e[23] = et) : et = e[23];
  let st;
  e[24] !== it || e[25] !== et ? (st = /* @__PURE__ */ m.jsxs("defs", {
    children: [it, et]
  }), e[24] = it, e[25] = et, e[26] = st) : st = e[26];
  const J = `url(#${D})`, _ = `url(#${N})`;
  let U;
  e[27] !== E || e[28] !== S || e[29] !== J || e[30] !== _ ? (U = /* @__PURE__ */ m.jsx("rect", {
    width: S,
    height: E,
    fill: J,
    mask: _
  }), e[27] = E, e[28] = S, e[29] = J, e[30] = _, e[31] = U) : U = e[31];
  let I;
  return e[32] !== E || e[33] !== S || e[34] !== st || e[35] !== U || e[36] !== A || e[37] !== G || e[38] !== at ? (I = /* @__PURE__ */ m.jsxs("svg", {
    width: S,
    height: E,
    viewBox: A,
    preserveAspectRatio: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: G,
    style: at,
    "aria-hidden": !0,
    children: [st, U]
  }), e[32] = E, e[33] = S, e[34] = st, e[35] = U, e[36] = A, e[37] = G, e[38] = at, e[39] = I) : I = e[39], I;
}
const Gj = (a) => {
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
  } = qj(f);
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
  let w;
  e[9] !== p.clipPath ? (w = {
    default: T,
    clipPath: p.clipPath
  }, e[9] = p.clipPath, e[10] = w) : w = e[10];
  let S;
  if (e[11] !== s || e[12] !== r || e[13] !== l) {
    let M;
    e[15] !== s || e[16] !== r ? (M = (R, D) => /* @__PURE__ */ m.jsx(Zb, {
      isActive: D === s,
      onClick: () => r(D),
      "data-overlay": !0,
      ...R
    }, D), e[15] = s, e[16] = r, e[17] = M) : M = e[17], S = l.map(M), e[11] = s, e[12] = r, e[13] = l, e[14] = S;
  } else
    S = e[14];
  let E;
  return e[18] !== g || e[19] !== h || e[20] !== b || e[21] !== w || e[22] !== S ? (E = /* @__PURE__ */ m.jsx(el, {
    className: kj,
    ref: h,
    ...g,
    initial: v,
    animate: b,
    transition: w,
    children: S
  }), e[18] = g, e[19] = h, e[20] = b, e[21] = w, e[22] = S, e[23] = E) : E = e[23], E;
}, Xj = (a) => {
  const e = wt.c(43), {
    tabs: l,
    onChange: s,
    defaultIndex: r
  } = a, c = r === void 0 ? 0 : r, {
    isApple: f
  } = Ds(), [h, y] = j.useState(c);
  let p, g;
  e[0] !== c ? (p = () => {
    y(c);
  }, g = [c], e[0] = c, e[1] = p, e[2] = g) : (p = e[1], g = e[2]), j.useEffect(p, g);
  let v, b;
  e[3] !== l.length ? (v = () => {
    y((st) => Math.min(st, l.length - 1));
  }, b = [l.length], e[3] = l.length, e[4] = v, e[5] = b) : (v = e[4], b = e[5]), j.useEffect(v, b);
  let T;
  e[6] !== h || e[7] !== s ? (T = (st) => {
    st !== h && (y(st), s?.(st));
  }, e[6] = h, e[7] = s, e[8] = T) : T = e[8];
  const w = T, S = j.useRef(null), [E, M] = j.useState(0);
  let R;
  e[9] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (R = (st) => {
    M(st.contentRect.width);
  }, e[9] = R) : R = e[9], F8(S, R);
  const D = l.length === 3 ? 54 : 21;
  let N;
  e[10] !== f || e[11] !== D ? (N = f ? {
    left: D,
    right: D,
    width: `calc(100% - ${D * 2}px)`
  } : {}, e[10] = f, e[11] = D, e[12] = N) : N = e[12];
  const V = N;
  let z;
  e[13] !== D ? (z = {
    top: 21,
    bottom: 21,
    left: D,
    right: D
  }, e[13] = D, e[14] = z) : z = e[14];
  const A = z;
  let H, G;
  e[15] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (H = {
    scale: 1.02
  }, G = {
    scale: {
      type: "spring",
      stiffness: 800,
      damping: 40
    }
  }, e[15] = H, e[16] = G) : (H = e[15], G = e[16]);
  let K;
  e[17] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (K = {
    display: "flex",
    width: "100%",
    position: "relative",
    zIndex: 1
  }, e[17] = K) : K = e[17];
  let nt;
  if (e[18] !== h || e[19] !== w || e[20] !== l) {
    let st;
    e[22] !== h || e[23] !== w ? (st = (J, _) => /* @__PURE__ */ m.jsx(Zb, {
      isActive: _ === h,
      onClick: () => w(_),
      ...J
    }, _), e[22] = h, e[23] = w, e[24] = st) : st = e[24], nt = l.map(st), e[18] = h, e[19] = w, e[20] = l, e[21] = nt;
  } else
    nt = e[21];
  let at;
  e[25] !== nt ? (at = /* @__PURE__ */ m.jsx("div", {
    style: K,
    children: nt
  }), e[25] = nt, e[26] = at) : at = e[26];
  let tt;
  e[27] !== h || e[28] !== w || e[29] !== l ? (tt = /* @__PURE__ */ m.jsx(Gj, {
    tabs: l,
    activeIndex: h,
    onChange: w
  }), e[27] = h, e[28] = w, e[29] = l, e[30] = tt) : tt = e[30];
  const Z = f ? "visible" : "hidden";
  let it;
  e[31] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel") ? (it = /* @__PURE__ */ m.jsx(Ts, {}), e[31] = it) : it = e[31];
  let L;
  e[32] !== A || e[33] !== E ? (L = /* @__PURE__ */ m.jsx(Yj, {
    width: E,
    height: 64,
    insets: A
  }), e[32] = A, e[33] = E, e[34] = L) : L = e[34];
  let $;
  e[35] !== Z || e[36] !== L ? ($ = /* @__PURE__ */ m.jsxs(j.Activity, {
    mode: Z,
    children: [it, L]
  }), e[35] = Z, e[36] = L, e[37] = $) : $ = e[37];
  let et;
  return e[38] !== V || e[39] !== at || e[40] !== tt || e[41] !== $ ? (et = /* @__PURE__ */ m.jsxs(el, {
    ref: S,
    className: Lj,
    whileTap: H,
    transition: G,
    style: V,
    layout: !0,
    children: [at, tt, $]
  }), e[38] = V, e[39] = at, e[40] = tt, e[41] = $, e[42] = et) : et = e[42], et;
}, Gh = "_badge_dqs9c_1", Qb = "_filled_dqs9c_19", Fb = "_tinted_dqs9c_24", Jb = "_gray_dqs9c_29", Wb = "_media_dqs9c_34", Ib = "_outlined_dqs9c_39", Pj = {
  badge: Gh,
  filled: Qb,
  tinted: Fb,
  gray: Jb,
  media: Wb,
  outlined: Ib
}, Kj = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  badge: Gh,
  default: Pj,
  filled: Qb,
  gray: Jb,
  media: Wb,
  outlined: Ib,
  tinted: Fb
}, Symbol.toStringTag, { value: "Module" })), Zj = (a) => {
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
  let w;
  e[9] !== b ? (w = b && {
    "data-circled": !0
  }, e[9] = b, e[10] = w) : w = e[10];
  let S;
  e[11] !== T ? (S = T && {
    "data-squared": !0
  }, e[11] = T, e[12] = S) : S = e[12];
  let E;
  e[13] !== w || e[14] !== S ? (E = {
    ...w,
    ...S
  }, e[13] = w, e[14] = S, e[15] = E) : E = e[15];
  const M = E, R = r?.background || r?.backgroundColor || null;
  let D = r;
  if (g === "filled") {
    const z = R || "var(--tg-theme-button-color)";
    let A;
    e[16] !== r ? (A = r?.color && {
      "--badge-text-color": r.color
    }, e[16] = r, e[17] = A) : A = e[17];
    let H;
    e[18] !== r || e[19] !== z || e[20] !== A ? (H = {
      ...r,
      "--badge-background": z,
      ...A
    }, e[18] = r, e[19] = z, e[20] = A, e[21] = H) : H = e[21], D = H;
  } else if (g === "tinted") {
    const z = r.color || R || "var(--tg-theme-button-color)";
    let A;
    e[22] !== r.color ? (A = r?.color && {
      "--badge-text-color": r.color
    }, e[22] = r.color, e[23] = A) : A = e[23];
    let H;
    e[24] !== r || e[25] !== A || e[26] !== z ? (H = {
      ...r,
      "--badge-background": z,
      ...A
    }, e[24] = r, e[25] = A, e[26] = z, e[27] = H) : H = e[27], D = H;
  }
  const N = `${Gh} ${Kj[g]} ${s || ""}`;
  let V;
  return e[28] !== D || e[29] !== l || e[30] !== M || e[31] !== N || e[32] !== p || e[33] !== v ? (V = /* @__PURE__ */ m.jsx(rt, {
    variant: v,
    className: N,
    style: D,
    ...M,
    ...p,
    children: l
  }), e[28] = D, e[29] = l, e[30] = M, e[31] = N, e[32] = p, e[33] = v, e[34] = V) : V = e[34], V;
};
Xr["tooltip-surface"];
const ol = (a) => {
  const e = wt.c(2), {
    children: l
  } = a;
  let s;
  return e[0] !== l ? (s = /* @__PURE__ */ m.jsx(aj, {
    children: /* @__PURE__ */ m.jsx($C, {
      children: /* @__PURE__ */ m.jsx(ej, {
        children: /* @__PURE__ */ m.jsx(Kb, {
          children: l
        })
      })
    })
  }), e[0] = l, e[1] = s) : s = e[1], s;
}, Qj = (a) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/home" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", d: "M11.2921 3.10288C11.7572 2.98914 12.243 2.98915 12.7081 3.10288C13.2396 3.23288 13.709 3.55457 14.2432 3.92027L19.2442 7.33335C19.6706 7.62361 20.0467 7.87916 20.3282 8.22788C20.5749 8.53357 20.7603 8.88486 20.8731 9.26206C21.0018 9.69232 21.0007 10.1491 21.0001 10.6673V16.9613C21.0001 17.4921 21.0004 17.9503 20.9698 18.3275C20.9375 18.7256 20.8656 19.1213 20.6729 19.5023C20.3853 20.0709 19.9269 20.5339 19.3624 20.8236C18.9841 21.0177 18.5907 21.0889 18.1954 21.1214C17.8209 21.1523 17.366 21.1527 16.8389 21.1527H7.16121C6.63427 21.1527 6.17922 21.1523 5.80476 21.1214C5.40975 21.0889 5.01682 21.0175 4.63875 20.8236C4.07426 20.5339 3.61484 20.0709 3.32722 19.5023C3.13458 19.1213 3.06265 18.7255 3.03035 18.3275C2.99975 17.9503 3.00006 17.4921 3.00008 16.9613V10.6673C2.99948 10.1491 2.99933 9.69232 3.12801 9.26206C3.24091 8.8848 3.42612 8.53359 3.67293 8.22788C3.95441 7.87922 4.32962 7.62355 4.75593 7.33335L9.75691 3.92027C10.2911 3.55462 10.7606 3.23292 11.2921 3.10288ZM10.5001 12.0882C9.94779 12.0882 9.50008 12.5359 9.50008 13.0882V16.1244C9.50008 16.6767 9.94779 17.1244 10.5001 17.1244H13.5001C14.0524 17.1244 14.5001 16.6767 14.5001 16.1244V13.0882C14.5001 12.5359 14.0524 12.0882 13.5001 12.0882H10.5001Z", fill: "currentColor" }))), Fj = (a) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/calendar" }, /* @__PURE__ */ j.createElement("path", { id: "Union", d: "M19.6748 10.7998C19.9782 10.7998 20.1303 10.7997 20.2441 10.8633C20.3246 10.9083 20.3915 10.9752 20.4365 11.0557C20.5001 11.1695 20.5 11.3216 20.5 11.625V13.9004C20.5 16.329 20.5 17.5435 19.9902 18.4541C19.6298 19.0977 19.0977 19.6298 18.4541 19.9902C17.5435 20.5 16.329 20.5 13.9004 20.5H10.0996C7.67103 20.5 6.4565 20.5 5.5459 19.9902C4.90227 19.6298 4.37022 19.0977 4.00977 18.4541C3.5 17.5435 3.5 16.329 3.5 13.9004V11.625C3.5 11.3216 3.49986 11.1695 3.56348 11.0557C3.60853 10.9752 3.67541 10.9083 3.75586 10.8633C3.86967 10.7997 4.02177 10.7998 4.3252 10.7998H19.6748ZM16 1.5C16.5523 1.5 17 1.94772 17 2.5V3.58984C17.5949 3.66023 18.0539 3.78571 18.4541 4.00977C19.0977 4.37022 19.6298 4.90227 19.9902 5.5459C20.3615 6.20916 20.4605 7.03367 20.4873 8.37109C20.4933 8.67145 20.4965 8.8223 20.4336 8.93848C20.3896 9.01965 20.3215 9.08906 20.2412 9.13477C20.1263 9.20009 19.9733 9.2002 19.668 9.2002H4.33203C4.02672 9.2002 3.87368 9.20009 3.75879 9.13477C3.67854 9.08906 3.61044 9.01965 3.56641 8.93848C3.50351 8.8223 3.50669 8.67145 3.5127 8.37109C3.53947 7.03367 3.63847 6.20916 4.00977 5.5459C4.37022 4.90227 4.90227 4.37022 5.5459 4.00977C5.94613 3.78571 6.40508 3.66023 7 3.58984V2.5C7 1.94772 7.44772 1.5 8 1.5C8.55228 1.5 9 1.94772 9 2.5V3.50488C9.33664 3.50264 9.70183 3.5 10.0996 3.5H13.9004C14.2982 3.5 14.6634 3.50264 15 3.50488V2.5C15 1.94772 15.4477 1.5 16 1.5Z", fill: "#3D3C3A" }))), Pr = (a) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "#3D3C3A" }), /* @__PURE__ */ j.createElement("path", { id: "Vector 234255039", d: "M9 12.439L11.1818 14.8564L13.0909 11.8347L14.0455 10.3238L14.5227 9.56836", stroke: "white", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }))), Nd = (a) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "#3D3C3A" }), /* @__PURE__ */ j.createElement("path", { id: "Vector 234255931", d: "M12 12.5V8", stroke: "white", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ j.createElement("circle", { id: "Ellipse 253668", cx: 1, cy: 1, r: 1, transform: "matrix(1 0 0 -1 11 17)", fill: "white" }))), Jj = (a) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/heart" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", fillRule: "evenodd", clipRule: "evenodd", d: "M12 6.34213C13.1016 4.86137 14.8294 3.86287 16.9203 4.05233C19.9439 4.3263 22.0001 6.73448 22.0001 9.87524C22.0001 12.7458 20.4285 15.1633 18.5183 16.9571C16.6026 18.756 14.2269 20.0464 12.319 20.6691C12.1117 20.7368 11.8884 20.7368 11.6811 20.6691C9.77325 20.0464 7.39752 18.756 5.48179 16.9571C3.57156 15.1633 2 12.7458 2 9.87524C2 6.73448 4.05617 4.3263 7.07975 4.05233C9.17073 3.86287 10.8984 4.86142 12 6.34213Z", fill: "currentColor" }))), Wj = (a) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/cup" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", fillRule: "evenodd", clipRule: "evenodd", d: "M12.9992 3.02148C17.9698 3.02148 21.9992 5.27629 21.9992 8.05772C21.9992 12.0867 20.9992 21.1519 12.9992 21.1519C9.14215 21.1518 6.91501 19.043 5.63991 16.4088L4.98464 16.5417C2.90427 16.9606 0.88686 15.5799 0.507098 13.4776C0.136993 11.4266 1.46695 9.45421 3.49635 9.04529L4.01491 8.94004C4.0039 8.6258 3.99928 8.33024 3.99928 8.05772C3.99928 5.27633 8.02884 3.02156 12.9992 3.02148ZM3.88796 11.0204C2.92844 11.2139 2.30006 12.1467 2.47487 13.1166C2.65441 14.111 3.60814 14.7636 4.59206 14.5654L4.89284 14.5045C4.52286 13.3122 4.29975 12.0906 4.16823 10.9634L3.88796 11.0204ZM12.9992 5.03598C9.13341 5.03604 5.99928 6.38889 5.99928 8.05772C5.99928 9.72654 9.13341 11.0794 12.9992 11.0795C16.8652 11.0795 19.9992 9.72657 19.9992 8.05772C19.9992 6.38886 16.8652 5.03598 12.9992 5.03598Z", fill: "currentColor" }))), Ij = (a) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ j.createElement("path", { id: "Vector 234255937", d: "M3.52765 9.90413C0.911528 15.9537 3.96635 21.1957 8.35342 22.5511C8.84167 22.702 9.19067 22.0789 8.92321 21.6434C8.19965 20.4654 7.47887 18.5753 8.56051 16.6478C8.64224 16.5022 8.85072 16.5146 8.93197 16.6605C9.95802 18.5031 10.9317 18.5031 10.9317 18.5031C10.9317 18.5031 8.86679 14.8896 11.7788 12.1893C11.8911 12.0851 12.0723 12.1349 12.1315 12.2762C13.3539 15.1909 17.8248 17.3143 14.8582 21.9344C14.6119 22.3181 14.8717 22.8388 15.3226 22.7712C20.4424 22.0038 22.208 16.0069 20.1757 11.4342C18.0862 6.73288 13.4876 7.04975 11.6828 2.26117C11.5637 1.9453 11.198 1.78379 10.9122 1.96333C7.99596 3.79495 6.34996 7.94875 7.37329 13.0655C6.01592 12.7262 5.08207 11.1162 4.57178 9.95361C4.37654 9.50881 3.72046 9.45827 3.52765 9.90413Z", fill: "currentColor" }))), tx = (a) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/cross" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", d: "M16.2929 6.06242C16.6834 5.6719 17.3164 5.67191 17.707 6.06242C18.0975 6.45295 18.0975 7.08596 17.707 7.47649L13.414 11.7695L17.707 16.0624C18.0975 16.4529 18.0975 17.086 17.707 17.4765C17.3164 17.867 16.6834 17.867 16.2929 17.4765L11.9999 13.1835L7.70696 17.4765C7.31643 17.867 6.68342 17.867 6.29289 17.4765C5.90238 17.086 5.90237 16.4529 6.29289 16.0624L10.5859 11.7695L6.29289 7.47649C5.90237 7.08596 5.90237 6.45295 6.29289 6.06242C6.68342 5.6719 7.31643 5.6719 7.70696 6.06242L11.9999 10.3554L16.2929 6.06242Z", fill: "#3D3C3A" }))), ex = (a) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/circle-plus" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", d: "M12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C6.75329 21.5 2.5 17.2467 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5Z", fill: "currentColor" }), /* @__PURE__ */ j.createElement("path", { id: "Vector 234255931", d: "M12 12V16", stroke: "var(--background)", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }), /* @__PURE__ */ j.createElement("circle", { id: "Ellipse 253668", cx: 12, cy: 8.5, r: 1, fill: "var(--background)" }))), Kr = (a) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ j.createElement("g", { id: "24_icon-fill/plus" }, /* @__PURE__ */ j.createElement("path", { id: "Vector", transform: "translate(5 4.769)", d: "M6 13C6 13 6 8 6 8C6 8 1 8 1 8C0.448 8 0 7.552 0 7C0 6.448 0.448 6 1 6C1 6 6 6 6 6C6 6 6 1 6 1C6 0.448 6.448 0 7 0C7.552 0 8 0.448 8 1C8 1 8 6 8 6C8 6 13 6 13 6C13.552 6 14 6.448 14 7C14 7.552 13.552 8 13 8C13 8 8 8 8 8C8 8 8 13 8 13C8 13.552 7.552 14 7 14C6.448 14 6 13.552 6 13Z", fill: "currentColor" }))), tE = (a) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ j.createElement("path", { d: "M16.5791 4.53223C18.0851 4.53223 18.8049 4.65337 19.5361 5.04297C20.1593 5.3751 20.654 5.86826 20.9873 6.48926C21.3783 7.21793 21.5 7.93502 21.5 9.43555V14.7383C21.5 16.2388 21.3783 16.9559 20.9873 17.6846C20.654 18.3056 20.1593 18.7987 19.5361 19.1309C18.8049 19.5205 18.0851 19.6416 16.5791 19.6416H7.4209C5.91493 19.6416 5.19509 19.5205 4.46387 19.1309C3.84066 18.7987 3.34603 18.3056 3.0127 17.6846C2.62169 16.9559 2.50002 16.2388 2.5 14.7383V9.43555C2.50003 7.93502 2.62167 7.21793 3.0127 6.48926C3.34603 5.86826 3.84066 5.3751 4.46387 5.04297C5.19509 4.65337 5.91494 4.53223 7.4209 4.53223H16.5791ZM10.1436 9.44043C9.76724 8.73388 8.75424 8.73388 8.37793 9.44043L5.78223 14.3125C5.42805 14.9784 5.91082 15.7829 6.66504 15.7832H17.0791C17.8878 15.7831 18.3617 14.8726 17.8984 14.21L16.2656 11.877C15.8829 11.3303 15.0819 11.3051 14.665 11.8262L12.998 13.9092C12.8634 14.0774 12.6005 14.0532 12.499 13.8633L10.1436 9.44043Z", fill: "currentColor" })), eE = (a) => /* @__PURE__ */ j.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...a }, /* @__PURE__ */ j.createElement("path", { d: "M14.0996 3.5C16.3398 3.5 17.4608 3.49957 18.3164 3.93555C19.0689 4.31902 19.681 4.93109 20.0645 5.68359C20.5004 6.53924 20.5 7.66018 20.5 9.90039V14.0996C20.5 16.3398 20.5004 17.4608 20.0645 18.3164C19.681 19.0689 19.0689 19.681 18.3164 20.0645C17.4608 20.5004 16.3398 20.5 14.0996 20.5H9.90039C7.66018 20.5 6.53924 20.5004 5.68359 20.0645C4.93109 19.681 4.31902 19.0689 3.93555 18.3164C3.49957 17.4608 3.5 16.3398 3.5 14.0996V9.90039C3.5 7.66018 3.49957 6.53924 3.93555 5.68359C4.31902 4.93109 4.93109 4.31902 5.68359 3.93555C6.53924 3.49957 7.66018 3.5 9.90039 3.5H14.0996ZM9.5 8.2002C9.05817 8.2002 8.7002 8.55817 8.7002 9C8.7002 9.44183 9.05817 9.7998 9.5 9.7998H11.2002V15.5C11.2002 15.9418 11.5582 16.2998 12 16.2998C12.4418 16.2998 12.7998 15.9418 12.7998 15.5V9.7998H14.5C14.9418 9.7998 15.2998 9.44183 15.2998 9C15.2998 8.55817 14.9418 8.2002 14.5 8.2002H9.5Z", fill: "currentColor" })), nE = {
  success: Pr,
  error: Nd,
  warning: Nd,
  info: ex
};
let Lr = null, Zg = !1;
const Od = [];
function aE() {
  const a = Nj();
  return j.useEffect(() => (Lr = a.show, Od.length && Od.splice(0).forEach((e) => a.show(e)), () => {
    Lr = null;
  })), null;
}
function iE() {
  if (Zg || typeof document > "u") return;
  Zg = !0;
  const a = document.createElement("div");
  a.setAttribute("data-aiwa-toast-host", ""), document.body.appendChild(a), Yi.createRoot(a).render(
    /* @__PURE__ */ m.jsx(Kb, { children: /* @__PURE__ */ m.jsx(aE, {}) })
  );
}
function nx(a, e = {}) {
  const l = typeof a == "string" ? { title: a, ...e } : { ...a };
  if (l.type && !l.icon) {
    const s = nE[l.type];
    s && (l.icon = /* @__PURE__ */ m.jsx(s, {}));
  }
  return iE(), Lr ? Lr(l) : (Od.push(l), null);
}
function lE() {
  typeof window < "u" && (window.aiwaToast = nx);
}
const vn = (a, ...e) => {
  const l = window[a];
  typeof l == "function" && l(...e);
}, Yt = (a, ...e) => {
  const l = window[a];
  return typeof l == "function" ? l(...e) : null;
}, Lt = (a, e = {}) => {
  const l = Yt("aiwaApi", a, e);
  return l && typeof l.then == "function" ? l : Promise.reject(new Error("API bridge is unavailable"));
}, Ot = (a, e = {}) => nx(a, e), zd = (a) => `${Math.round(Number(a) || 0).toLocaleString("ru-RU")} ккал`, ax = (a) => vn("track", a), sE = () => {
  const a = window.Telegram?.WebApp;
  a?.close && a.close();
}, nl = async ({ nudge: a = !0, topic: e = "" } = {}) => {
  a && await Promise.race([
    Lt("/api/nudge", e ? { topic: e } : {}).catch(() => null),
    new Promise((c) => setTimeout(c, 2e3))
  ]);
  const l = window.Telegram?.WebApp, s = Yt("aiwaData")?.bot_username, r = typeof l?.openTelegramLink == "function" && (typeof l.isVersionAtLeast != "function" || l.isVersionAtLeast("6.1"));
  s && r && l.openTelegramLink(`https://t.me/${s}`), sE();
}, oE = () => {
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
function ix() {
  const a = window.Telegram?.WebApp;
  if (Ot("Выписка готова и отправлена в чат бота.", { type: "success" }), typeof a?.showPopup == "function")
    try {
      a.showPopup({
        title: "Выписка готова",
        message: "PDF уже отправлен в чат. Нажми «ОК», чтобы вернуться к нему.",
        buttons: [{ id: "ok", type: "ok" }]
      }, () => a.close?.());
      return;
    } catch {
    }
  setTimeout(() => {
    try {
      a?.close?.();
    } catch {
    }
  }, 2200);
}
function Xh({ title: a, size: e = "regular", ...l }) {
  return e === "large" ? /* @__PURE__ */ m.jsx("div", { className: "aiwa-panel-header is-large", children: /* @__PURE__ */ m.jsx(rt, { as: "h1", variant: "title1", weight: "bold", children: a }) }) : /* @__PURE__ */ m.jsx("div", { className: "aiwa-panel-header", children: /* @__PURE__ */ m.jsx(IC, { ...l, children: a }) });
}
const Qg = (a, e = "") => [
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
function lx({
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
    /* @__PURE__ */ m.jsx(rt, { className: "aiwa-date-cell-number", variant: "body", weight: "regular", children: a.date }),
    f ? /* @__PURE__ */ m.jsx(
      "span",
      {
        className: `aiwa-date-cell-radio${p ? " is-heart" : ""}${h ? " is-checked" : ""}`,
        "aria-hidden": "true",
        children: p ? /* @__PURE__ */ m.jsx(Jj, {}) : h ? /* @__PURE__ */ m.jsx(Pr, {}) : null
      }
    ) : null,
    !f && a.phase && !a.actualPeriod && !a.predictedPeriod ? /* @__PURE__ */ m.jsx("span", { className: "aiwa-date-cell-dot", "aria-hidden": "true" }) : null,
    !f && a.intimacy ? /* @__PURE__ */ m.jsx("span", { className: "aiwa-date-cell-heart", "aria-hidden": "true", children: "♥" }) : null,
    s && a.today && !f ? /* @__PURE__ */ m.jsx(rt, { className: "aiwa-date-cell-today", variant: "caption1", weight: "regular", children: "Сегодня" }) : null
  ] });
  if (!e)
    return /* @__PURE__ */ m.jsx("div", { className: Qg(v, g), "data-iso": a.iso, "aria-label": `${a.label || "День"}, ${a.date}`, children: b });
  const T = l || a.monthLabel || "", w = T ? `${a.date} ${T}` : `${a.label || "День"}, ${a.date}`, S = f ? h ? ", отмечено" : "" : `${a.actualPeriod ? ", отмечены месячные" : ""}${a.predictedPeriod ? ", прогноз месячных" : ""}${a.intimacy ? ", отмечена близость" : ""}`;
  return /* @__PURE__ */ m.jsx(
    je,
    {
      as: "button",
      type: "button",
      mode: "opacity",
      disabled: a.disabled,
      "aria-label": `${w}${S}`,
      "aria-pressed": f ? h : typeof a.selected == "boolean" ? a.selected : void 0,
      className: Qg(v, ["aiwa-calendar-day", g].filter(Boolean).join(" ")),
      "data-iso": a.iso,
      onClick: () => c ? c(a) : vn("aiwaCalendarDay", a.iso),
      children: b
    }
  );
}
function sx(a, ...e) {
  j.useEffect(() => {
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
const rE = 140;
function Fg(a, e) {
  const l = a.scrollWidth - a.clientWidth, s = e.offsetLeft - (a.clientWidth - e.offsetWidth) / 2;
  return Math.min(l, Math.max(0, s));
}
function uE(a) {
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
function Ph({ days: a, selectedIso: e = "", onSelect: l = null }) {
  const s = typeof l == "function", r = j.useRef(null), c = j.useRef(null);
  c.current = { days: a, selectedIso: e, onSelect: l };
  const f = j.useRef("");
  return sx(r, a?.length), j.useLayoutEffect(() => {
    const h = r.current;
    if (!h) return;
    const y = f.current;
    if (f.current = "", y && y === e || h.scrollWidth - h.clientWidth <= 0) return;
    const g = h.querySelector(e ? `[data-iso="${e}"]` : ".is-today");
    g && (h.scrollLeft = Fg(h, g));
  }, [e, a?.length]), j.useEffect(() => {
    const h = r.current;
    if (!h || !s) return;
    let y = 0, p = !1, g = !1;
    const v = () => {
      if (y = 0, p || !g) return;
      g = !1;
      const M = uE(h);
      if (!M) return;
      const { days: R, selectedIso: D, onSelect: N } = c.current, V = R?.find((A) => A.iso === M.dataset.iso);
      if (!V) return;
      V.iso !== D && (f.current = V.iso, N(V));
      const z = Fg(h, M);
      if (Math.abs(z - h.scrollLeft) > 0.5) {
        const A = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        h.scrollTo({ left: z, behavior: A ? "auto" : "smooth" });
      }
    }, b = () => {
      y && clearTimeout(y), y = setTimeout(v, rE);
    }, T = () => {
      p && (g = !0), b();
    }, w = () => {
      p = !0;
    }, S = () => {
      p = !1, b();
    }, E = () => {
      g = !0;
    };
    return h.addEventListener("scroll", T, { passive: !0 }), h.addEventListener("touchstart", w, { passive: !0 }), h.addEventListener("touchend", S, { passive: !0 }), h.addEventListener("touchcancel", S, { passive: !0 }), h.addEventListener("wheel", E, { passive: !0 }), () => {
      y && clearTimeout(y), h.removeEventListener("scroll", T), h.removeEventListener("touchstart", w), h.removeEventListener("touchend", S), h.removeEventListener("touchcancel", S), h.removeEventListener("wheel", E);
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
        lx,
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
const Zr = [
  ["Боль", [["cramps", "Спазмы"], ["head", "Голова"], ["breast", "Грудь"]]],
  ["Настроение", [["irrit", "Раздражительность"], ["anx", "Тревога"], ["low", "Апатия"]]],
  ["Тело", [["tired", "Усталость"], ["bloat", "Вздутие"], ["sweet", "Тянет на сладкое"]]],
  ["Кожа и сон", [["skin", "Высыпания"], ["insomnia", "Плохой сон"]]]
], Bd = {
  // One line each at the bar width: a wrapped hint pushes the bar over the grid.
  period: { label: "Месячные", hint: "нажми на день, чтобы отметить месячные", checked: (a) => a.actualPeriod },
  symptoms: { label: "Симптомы", hint: "нажми на день, чтобы записать симптомы", checked: (a) => a.logged },
  intimacy: { label: "Близость", hint: "нажми на день, чтобы отметить близость", checked: (a) => a.intimacy }
}, cE = (a) => a.map((e) => ({ value: e, label: Bd[e].label })), fE = [
  { label: "Месячные", variant: "tinted", token: "--aiwa-phase-menstrual" },
  { label: "Прогноз", variant: "outlined", token: "--aiwa-phase-menstrual" },
  { label: "Овуляция", variant: "tinted", token: "--aiwa-phase-ovulation" },
  { label: "Фолликулярная", variant: "tinted", token: "--aiwa-phase-follicular" },
  { label: "Лютеиновая", variant: "tinted", token: "--aiwa-phase-luteal" },
  { label: "Близость", variant: "tinted", token: "--aiwa-intimacy" }
], ox = [[1, "Низкая"], [2, "Средняя"], [3, "Высокая"]], rx = [[1, "Плохое"], [2, "Нормальное"], [3, "Хорошее"]], ux = [
  { value: "breakfast", label: "Завтрак" },
  { value: "lunch", label: "Обед" },
  { value: "snack", label: "Перекус" },
  { value: "dinner", label: "Ужин" }
], dE = (a) => ({
  title: a?.title || "",
  kcal: String(a?.kcal ?? ""),
  grams: String(a?.grams ?? ""),
  protein: String(a?.protein ?? ""),
  fat: String(a?.fat ?? ""),
  carbs: String(a?.carbs ?? ""),
  slot: a?.slot || "snack"
}), Jg = ["Силовая", "Кардио", "Пилатес", "Йога", "Ходьба", "Плавание", "Своё"], Qa = {
  Ноги: ["Присед", "Жим ногами", "Выпады", "Болгарские", "Румынская тяга", "Разгибания", "Сгибания", "Икры"],
  Спина: ["Вертикальная тяга", "Горизонтальная тяга", "Тяга в наклоне", "Становая", "Подтягивания", "Гиперэкстензия"],
  Грудь: ["Жим лёжа", "Жим гантелей", "Жим в наклоне", "Сведения", "Отжимания"],
  Плечи: ["Жим стоя", "Махи в стороны", "Махи в наклоне", "Протяжка"],
  Ягодицы: ["Ягодичный мост", "Отведение бедра", "Мах ногой", "Плие-присед"],
  Руки: ["Бицепс", "Молоток", "Разгибания трицепс", "Французский жим"],
  Кор: ["Планка", "Скручивания", "Подъём ног", "Русский твист"]
}, hE = {
  Силовая: [],
  Кардио: ["Бег", "Велотренажёр", "Эллипс", "Гребля", "Скакалка"],
  Пилатес: ["Мат", "Реформер", "Мобилити", "Кор"],
  Йога: ["Виньяса", "Хатха", "Растяжка", "Дыхание"],
  Ходьба: ["Прогулка", "Скандинавская", "Быстрая ходьба"],
  Плавание: ["Кроль", "Брасс", "На спине"],
  Своё: []
}, mE = [
  { value: "cycle", label: "Регулярный цикл" },
  { value: "irregular", label: "Нерегулярный" },
  { value: "preg", label: "Беременность" },
  { value: "meno", label: "Менопауза" },
  { value: "none", label: "Нет месячных" },
  { value: "male", label: "Мужской режим" }
], Wg = "custom:";
function pE(a) {
  const e = a?.length ? a.flatMap(([, l]) => l) : Zr.flatMap(([, l]) => l.flat());
  return new Map(e);
}
function yE({ title: a = "Сегодня", checkin: e, symptomGroups: l, onSelect: s }) {
  const r = e?.symptoms ?? [], c = j.useRef(null);
  if (sx(c, r.length), !r.length) return null;
  const f = pE(l), h = s ?? (() => vn("openHomePanel", "journal"));
  return /* @__PURE__ */ m.jsxs("div", { className: "aiwa-today", children: [
    /* @__PURE__ */ m.jsx(rt, { className: "aiwa-today-title", variant: "body", weight: "semibold", children: a }),
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-today-chips", role: "group", "aria-label": a, ref: c, children: r.map((y) => {
      const p = y.startsWith(Wg) ? y.slice(Wg.length) : f.get(y) ?? y;
      return /* @__PURE__ */ m.jsx(
        je,
        {
          as: "button",
          type: "button",
          mode: "opacity",
          className: "aiwa-today-chip",
          onClick: () => h(y),
          title: p,
          children: /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "regular", children: p })
        },
        y
      );
    }) })
  ] });
}
const gE = 5e3, cx = (a, e) => Array.from(
  { length: e },
  (l, s) => `/assets/${a}/frame-${String(s).padStart(3, "0")}.png`
), vE = cx("aiwa-sequence", 182), Kh = cx("aiwa-card-sequence", 193);
function Zh({ size: a, frames: e = vE, pauseMs: l = gE }) {
  return /* @__PURE__ */ m.jsx(
    "span",
    {
      className: "aiwa-sequence",
      style: { "--aiwa-sequence-size": `${a}px` },
      "data-aiwa-sequence": "true",
      "data-sequence": e === Kh ? "card" : "default",
      "data-pause-ms": l,
      "data-frame": 0,
      "aria-hidden": "true",
      children: /* @__PURE__ */ m.jsx("img", { src: e[0], alt: "", draggable: "false", decoding: "sync" })
    }
  );
}
function bE() {
  return /* @__PURE__ */ m.jsxs("div", { className: "aiwa-paper-ai-heading", children: [
    /* @__PURE__ */ m.jsx(Zh, { size: 58, frames: Kh, pauseMs: 0 }),
    /* @__PURE__ */ m.jsx("div", { children: /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "semibold", children: "Айва AI" }) })
  ] });
}
function xE(a) {
  return /* @__PURE__ */ m.jsx(Zn, { ...a, "data-aiwa-cell": "true" });
}
const ht = Object.assign(xE, {
  Start: Zn.Start,
  End: Zn.End,
  Part: Zn.Part,
  Text: Zn.Text,
  Editable: Zn.Editable,
  Switch: Zn.Switch
});
function Cs({
  message: a,
  detail: e,
  onDiscuss: l,
  chip: s = "",
  className: r = ""
}) {
  return /* @__PURE__ */ m.jsx(yt.Item, { className: `aiwa-insight-section ${r}`.trim(), children: /* @__PURE__ */ m.jsx(ht, { "data-aiwa-insight-cell": "true", tappable: !1, children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-insight-content", children: [
    /* @__PURE__ */ m.jsx(bE, {}),
    s ? /* @__PURE__ */ m.jsx("span", { className: "aiwa-insight-chip", children: s }) : null,
    /* @__PURE__ */ m.jsx(rt, { className: "aiwa-insight-message", variant: "body", weight: "regular", children: a }),
    e ? /* @__PURE__ */ m.jsx(rt, { className: "aiwa-insight-detail", variant: "body", weight: "regular", children: e }) : null,
    l ? /* @__PURE__ */ m.jsx(
      It,
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
function SE({ aiText: a, aiChip: e = "" }) {
  return /* @__PURE__ */ m.jsx(
    Cs,
    {
      message: a,
      chip: e,
      onDiscuss: () => nl()
    }
  );
}
function wE({ delay: a }) {
  return a ? /* @__PURE__ */ m.jsxs(yt.Item, { header: a.title, children: [
    /* @__PURE__ */ m.jsx(ht, { tappable: !1, children: /* @__PURE__ */ m.jsx(ht.Text, { title: a.message, description: a.hint }) }),
    a.canSwitchToPregnancy ? /* @__PURE__ */ m.jsx(ht, { tappable: !1, children: /* @__PURE__ */ m.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ m.jsx(
      It,
      {
        variant: "filled",
        label: "Перейти в режим беременности",
        isFill: !0,
        ...se("Перейти в режим беременности", () => vn("switchPreg"))
      }
    ) }) }) : null
  ] }) : null;
}
function TE({ ok: a }) {
  const e = a ? Pr : Nd;
  return /* @__PURE__ */ m.jsx("span", { className: a ? "aiwa-status is-ok" : "aiwa-status is-alert", "aria-label": a ? "В пределах нормы" : "Требует внимания", children: /* @__PURE__ */ m.jsx(e, {}) });
}
function CE({ label: a, value: e, ok: l }) {
  return /* @__PURE__ */ m.jsx(ht, { "data-aiwa-metric-cell": "true", tappable: !1, end: /* @__PURE__ */ m.jsx(TE, { ok: l }), children: /* @__PURE__ */ m.jsx(ht.Text, { title: a, description: e }) });
}
function jE({ metrics: a, title: e = "Статистика" }) {
  return a?.length ? /* @__PURE__ */ m.jsx(yt.Item, { header: e, children: a.map((l) => /* @__PURE__ */ m.jsx(CE, { ...l }, l.label)) }) : null;
}
const EE = j.lazy(() => import("./AiwaWebUiChart-aiwa-v179.js?v=r27").then((a) => ({
  default: a.AiwaWebUiChart
})));
function AE() {
  return /* @__PURE__ */ m.jsx("div", { className: "aiwa-area-chart-state is-loading", role: "status", "aria-label": "График загружается", children: /* @__PURE__ */ m.jsx("span", { className: "aiwa-area-chart-skeleton", "aria-hidden": "true" }) });
}
function ME({
  data: a,
  series: e,
  xKey: l,
  band: s = null,
  loading: r = !1,
  title: c = "Динамика цикла",
  emptyText: f = "Добавь ещё один завершённый цикл — здесь появится график."
}) {
  return /* @__PURE__ */ m.jsx(yt.Item, { header: c, children: /* @__PURE__ */ m.jsx(j.Suspense, { fallback: /* @__PURE__ */ m.jsx(AE, {}), children: /* @__PURE__ */ m.jsx(
    EE,
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
function _E({
  history: a,
  title: e = "История цикла",
  emptyTitle: l = "История пока пуста",
  emptyDescription: s = "Она появится после первой сохранённой менструации."
}) {
  const [r, c] = j.useState(!1), f = a || [], h = r ? f : f.slice(0, 3);
  return /* @__PURE__ */ m.jsxs(yt.Item, { header: e, children: [
    h.length ? h.map((y) => /* @__PURE__ */ m.jsx(ht, { "data-aiwa-history-cell": "true", tappable: !1, children: /* @__PURE__ */ m.jsx(ht.Text, { title: y.title, description: y.description }) }, y.key)) : /* @__PURE__ */ m.jsx(ht, { "data-aiwa-history-cell": "true", tappable: !1, children: /* @__PURE__ */ m.jsx(ht.Text, { title: l, description: s }) }),
    f.length > 3 ? /* @__PURE__ */ m.jsx(
      ht,
      {
        as: "button",
        type: "button",
        onClick: () => c((y) => !y),
        end: /* @__PURE__ */ m.jsx(ht.Part, { type: "Chevron" }),
        children: /* @__PURE__ */ m.jsx(ht.Text, { type: "Accent", title: r ? "Свернуть" : "Показать все" })
      }
    ) : null
  ] });
}
const DE = Object.fromEntries(
  Zr.flatMap(([, a]) => a)
), RE = { 1: "низкая энергия", 2: "средняя энергия", 3: "высокая энергия" }, NE = { 1: "плохое настроение", 2: "нормальное настроение", 3: "хорошее настроение" }, OE = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }), zE = (a) => {
  const l = DE[a] || String(a).split(":").pop().replace(/_/g, " ").trim();
  return l ? l[0].toUpperCase() + l.slice(1) : "";
}, BE = (a) => [
  ...(a.symptoms || []).map(zE),
  RE[a.energy],
  NE[a.mood]
].filter(Boolean).map((l) => l[0].toUpperCase() + l.slice(1)).join(" • ") || "Без деталей", LE = (a) => {
  const e = /* @__PURE__ */ new Date(`${a}T12:00:00`);
  return Number.isNaN(e.getTime()) ? a : OE.format(e);
};
function VE() {
  const [a, e] = j.useState(null), [l, s] = j.useState(!1), [r, c] = j.useState(!1);
  j.useEffect(() => {
    Lt("/api/log_history", {}).then((y) => e(y?.items || [])).catch(() => e([]));
  }, []);
  const f = async () => {
    if (!r) {
      c(!0);
      try {
        const y = await Lt("/api/report", { period: "all" }).catch(() => null);
        y?.ok && y?.delivered ? ix() : Ot(y?.text || "Выписка временно недоступна", { type: "error" });
      } finally {
        c(!1);
      }
    }
  };
  if (!a) return null;
  const h = l ? a : a.slice(0, 3);
  return /* @__PURE__ */ m.jsxs(yt.Item, { header: "Журнал симптомов", children: [
    h.length ? h.map((y) => /* @__PURE__ */ m.jsx(ht, { tappable: !1, children: /* @__PURE__ */ m.jsx(ht.Text, { title: LE(y.d), description: BE(y) }) }, y.d)) : /* @__PURE__ */ m.jsx(ht, { tappable: !1, children: /* @__PURE__ */ m.jsx(ht.Text, { title: "Записей пока нет", description: "Отмечай самочувствие в журнале — здесь появится история." }) }),
    a.length > 3 ? /* @__PURE__ */ m.jsx(
      ht,
      {
        as: "button",
        type: "button",
        onClick: () => s((y) => !y),
        end: /* @__PURE__ */ m.jsx(ht.Part, { type: "Chevron" }),
        children: /* @__PURE__ */ m.jsx(ht.Text, { type: "Accent", title: l ? "Свернуть" : "Показать все" })
      }
    ) : null,
    /* @__PURE__ */ m.jsx(ht, { tappable: !1, children: /* @__PURE__ */ m.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ m.jsx(
      It,
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
const Qf = {
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
}, kE = (a) => {
  let e = Math.min(Math.max(Math.round(a) || 4, 4), 40);
  for (; e > 4 && !Qf[e]; ) e -= 1;
  return { week: e, name: Qf[e][0], size: Qf[e][1] };
};
function UE({ pregnancy: a }) {
  const [e, l] = j.useState({});
  j.useEffect(() => {
    fetch("/assets/preg/manifest.json?v=1").then((h) => h.ok ? h.json() : {}).then((h) => l(h || {})).catch(() => {
    });
  }, []);
  const s = Math.min(Math.max(Number(a?.week) || 4, 1), 40), r = kE(s), c = e[String(r.week)], f = Math.min(100, Math.max(2, s / 40 * 100));
  return /* @__PURE__ */ m.jsx(yt.Item, { header: "Срок и малыш", children: /* @__PURE__ */ m.jsx(ht, { tappable: !1, children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-preg-progress", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-preg-track", role: "img", "aria-label": `${s} неделя из 40`, children: [
      /* @__PURE__ */ m.jsx("div", { className: "aiwa-preg-fill", style: { width: `${f}%` } }),
      /* @__PURE__ */ m.jsx("span", { className: "aiwa-preg-marker", style: { left: `${f}%` } })
    ] }),
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-preg-trimesters", children: [1, 2, 3].map((h) => /* @__PURE__ */ m.jsxs(
      rt,
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
        /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "semibold", children: `${s} неделя` }),
        /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "regular", children: `Малыш размером с ${r.name}, ${r.size}` })
      ] })
    ] })
  ] }) }) });
}
const Ji = [];
let Ig = !1;
const fx = () => typeof window < "u" ? window.Telegram?.WebApp?.BackButton : null, HE = () => Ji[Ji.length - 1]?.(), tv = () => {
  const a = fx();
  a && (Ji.length ? a.show?.() : a.hide?.());
}, $E = (a) => {
  const e = fx();
  return e && !Ig && (e.onClick?.(HE), Ig = !0), Ji.push(a), tv(), () => {
    const l = Ji.lastIndexOf(a);
    l !== -1 && Ji.splice(l, 1), tv();
  };
};
function dx(a, e) {
  const l = j.useRef(e);
  l.current = e, j.useEffect(() => {
    if (a)
      return $E(() => l.current?.());
  }, [a]);
}
function bn({ isOpen: a, onClose: e, onBack: l, children: s, ...r }) {
  return dx(a, l || e), j.useEffect(() => {
    if (!a) return;
    const c = document.body.style.overflow;
    return document.body.style.overflow = "hidden", () => {
      document.body.style.overflow = c;
    };
  }, [a]), a ? Gr.createPortal(
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-page", role: "dialog", "aria-modal": "true", ...r, children: s }),
    document.body
  ) : null;
}
function Qr({
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
    je,
    {
      as: "button",
      type: "button",
      mode: "opacity",
      className: `aiwa-chip${s ? " is-fill" : ""}${c ? ` ${c}` : ""}`,
      "aria-pressed": e,
      onClick: l,
      ...f,
      children: /* @__PURE__ */ m.jsx(It, { variant: e ? "tinted" : "gray", label: h, isFill: s })
    }
  );
}
function Ld({ label: a, active: e, onChange: l, variant: s = "default" }) {
  return /* @__PURE__ */ m.jsx(
    Qr,
    {
      className: `aiwa-log-toggle is-${s}-toggle`,
      label: a,
      active: e,
      isFill: !0,
      "aria-label": `${a}: ${e ? "да" : "нет"}`,
      onClick: () => l(!e),
      end: /* @__PURE__ */ m.jsx("span", { className: "aiwa-log-toggle-mark", "aria-hidden": "true", children: e ? /* @__PURE__ */ m.jsx(Pr, {}) : null })
    }
  );
}
function hx({ label: a, children: e }) {
  return /* @__PURE__ */ m.jsxs("div", { className: "aiwa-log-group", children: [
    /* @__PURE__ */ m.jsx(rt, { className: "aiwa-log-label", variant: "subheadline1", weight: "regular", children: a }),
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-log-choices", role: "group", "aria-label": a, children: e })
  ] });
}
function Vr({ label: a, options: e, value: l, onChange: s }) {
  return /* @__PURE__ */ m.jsx(hx, { label: a, children: e.map(([r, c]) => /* @__PURE__ */ m.jsx(
    Qr,
    {
      label: c,
      active: l === r,
      onClick: () => s(r)
    },
    r
  )) });
}
function mx({ label: a, options: e, symptoms: l, onToggle: s }) {
  return /* @__PURE__ */ m.jsx(hx, { label: a, children: e.map(([r, c]) => /* @__PURE__ */ m.jsx(
    Qr,
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
    /* @__PURE__ */ m.jsx(rt, { variant: "caption1", weight: "regular", children: a }),
    f ? /* @__PURE__ */ m.jsx("textarea", { ...p }) : /* @__PURE__ */ m.jsx("input", { type: r, ...p })
  ] });
}
function px({ value: a, onChange: e }) {
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
function Fr() {
  const a = typeof window.aiwaData == "function" ? window.aiwaData() : window.aiwaData, e = String(a?.today || "");
  if (/^\d{4}-\d{2}-\d{2}$/.test(e)) return e;
  const l = Object.fromEntries(
    new Intl.DateTimeFormat("en", { timeZone: "Europe/Moscow", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(/* @__PURE__ */ new Date()).filter((s) => s.type !== "literal").map((s) => [s.type, s.value])
  );
  return `${l.year}-${l.month}-${l.day}`;
}
function qE({ isOpen: a, onClose: e, checkin: l, symptomGroups: s, mode: r, dayIso: c }) {
  const f = Fr(), h = !!(c && c !== f), [y, p] = j.useState(l.symptoms || []), [g, v] = j.useState(l.energy || 0), [b, T] = j.useState(l.mood || 0), [w, S] = j.useState(!!l.period), [E, M] = j.useState(!!l.intimacy), [R, D] = j.useState(""), [N, V] = j.useState(!1);
  j.useEffect(() => {
    a && (p(l.symptoms || []), v(l.energy || 0), T(l.mood || 0), S(!!l.period), M(!!l.intimacy), D(""), V(!1));
  }, [a]);
  const z = (G) => {
    p((K) => K.includes(G) ? K.filter((nt) => nt !== G) : [...K, G]);
  }, A = s?.length ? s : Zr, H = async () => {
    if (N) return;
    const G = l.symptoms || [], K = R.trim();
    V(!0);
    try {
      let nt = !1;
      !h && w !== !!l.period && (await Yt("toggleTodayPeriod"), nt = !0), g !== (l.energy || 0) && (h ? await Yt("setDayCheckin", c, "energy", g) : await Yt("setCheckin", "energy", g), nt = !0), b !== (l.mood || 0) && (h ? await Yt("setDayCheckin", c, "mood", b) : await Yt("setCheckin", "mood", b), nt = !0);
      for (const at of y.filter((tt) => !G.includes(tt)))
        h ? await Yt("toggleDaySym", c, at) : await Yt("toggleSym", at);
      for (const at of G.filter((tt) => !y.includes(tt)))
        h ? await Yt("toggleDaySym", c, at) : await Yt("toggleSym", at);
      E !== !!l.intimacy && (h ? await Yt("markPA", c) : await Yt("toggleTodayIntimacy")), K && (h ? await Yt("addDayCustomSym", c, K) : await Yt("addCustomSym", K), nt = !0), nt || Ot("Сохранено", { type: "success" }), e();
    } catch (nt) {
      Ot(nt?.message || "Не удалось сохранить", { type: "error" });
    } finally {
      V(!1);
    }
  };
  return /* @__PURE__ */ m.jsxs(
    bn,
    {
      isOpen: a,
      onClose: e,
      "data-aiwa-log-modal": "true",
      children: [
        /* @__PURE__ */ m.jsx(Xh, { size: "large", title: h ? `Журнал за ${(/* @__PURE__ */ new Date(c + "T00:00:00")).toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}` : "Занести в журнал" }),
        /* @__PURE__ */ m.jsx("div", { className: "aiwa-log-scroll", children: /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-log-sections", children: [
          r !== "preg" && r !== "meno" && !h ? /* @__PURE__ */ m.jsx(yt.Item, { children: r === "male" ? null : /* @__PURE__ */ m.jsx(Ld, { label: "Месячные", variant: "period", active: w, onChange: S }) }) : null,
          /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(
            Vr,
            {
              label: "Энергия",
              options: ox,
              value: g,
              onChange: v
            }
          ) }),
          /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(
            Vr,
            {
              label: "Настроение",
              options: rx,
              value: b,
              onChange: T
            }
          ) }),
          A.map(([G, K]) => /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(mx, { label: G, options: K, symptoms: y, onToggle: z }) }, G)),
          /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(px, { value: R, onChange: D }) }),
          /* @__PURE__ */ m.jsx(yt.Item, { children: r === "male" ? null : /* @__PURE__ */ m.jsx(Ld, { label: "Близость", active: E, onChange: M }) })
        ] }) }),
        /* @__PURE__ */ m.jsx("div", { className: "aiwa-log-footer", children: /* @__PURE__ */ m.jsx(
          It,
          {
            variant: "filled",
            label: N ? "Сохраняю…" : "Сохранить",
            isFill: !0,
            ...se("Сохранить", H)
          }
        ) })
      ]
    }
  );
}
function YE({ icon: a, label: e, onClick: l, className: s = "", ...r }) {
  return /* @__PURE__ */ m.jsx(
    je,
    {
      as: "button",
      type: "button",
      mode: "opacity",
      "aria-label": e,
      className: `aiwa-fab${s ? ` ${s}` : ""}`,
      onClick: l,
      ...r,
      children: /* @__PURE__ */ m.jsx(Mh, { className: "aiwa-fab-surface", children: /* @__PURE__ */ m.jsx("span", { className: "aiwa-fab-icon", "aria-hidden": "true", children: a }) })
    }
  );
}
const ss = 8, ev = 6;
function GE(a, e, l) {
  const s = window.innerWidth, r = window.innerHeight;
  let c = l === "end" ? a.right - e.width : a.left;
  c = Math.min(c, s - e.width - ss), c = Math.max(ss, c);
  const f = a.bottom + ev, h = a.top - ev - e.height, y = f + e.height <= r - ss, p = y || h < ss ? f : h, g = y || h < ss ? "top" : "bottom";
  return { top: p, left: c, originY: g };
}
function yx({ items: a, trigger: e, align: l = "start", className: s = "" }) {
  const [r, c] = j.useState(!1), [f, h] = j.useState({ top: 0, left: 0, originY: "top" }), y = j.useRef(null), p = j.useRef(null), g = j.useCallback(() => {
    c(!1);
  }, []);
  j.useLayoutEffect(() => {
    if (!r || !p.current || !y.current) return;
    const b = () => {
      const T = y.current.getBoundingClientRect(), w = { width: p.current.offsetWidth, height: p.current.offsetHeight };
      h(GE(T, w, l));
    };
    return b(), window.addEventListener("resize", b), window.addEventListener("scroll", b, !0), () => {
      window.removeEventListener("resize", b), window.removeEventListener("scroll", b, !0);
    };
  }, [r, l]), j.useEffect(() => {
    if (!r) return;
    const b = (w) => {
      p.current?.contains(w.target) || y.current?.contains(w.target) || g();
    }, T = (w) => {
      w.key === "Escape" && g();
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
    r && Gr.createPortal(
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
                /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "regular", children: b.label })
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
function XE({ options: a, value: e, onChange: l, hint: s }) {
  return /* @__PURE__ */ m.jsxs(Mh, { className: "aiwa-mark-bar", role: "group", "aria-label": "Что отмечаем", children: [
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-mark-bar-chips", children: a.map((r) => /* @__PURE__ */ m.jsx(
      Qr,
      {
        label: r.label,
        active: e === r.value,
        onClick: () => l(r.value)
      },
      r.value
    )) }),
    s ? /* @__PURE__ */ m.jsx(rt, { className: "aiwa-mark-bar-hint", variant: "footnote", weight: "regular", role: "status", children: s }) : null
  ] });
}
function PE({ iso: a, label: e, open: l, onClose: s, symptomGroups: r, showIntimacy: c = !0 }) {
  const [f, h] = j.useState({}), [y, p] = j.useState([]), [g, v] = j.useState(0), [b, T] = j.useState(0), [w, S] = j.useState(!1), [E, M] = j.useState(""), [R, D] = j.useState(!1);
  j.useEffect(() => {
    if (!a || !l) return;
    const A = Yt("getAiwaDayCheckin", a) || {};
    h(A), p(A.symptoms || []), v(A.energy || 0), T(A.mood || 0), S(!!A.intimacy), M(""), D(!1);
  }, [a, l]);
  const N = (A) => {
    p((H) => H.includes(A) ? H.filter((G) => G !== A) : [...H, A]);
  }, V = r?.length ? r : Zr, z = async () => {
    if (R) return;
    const A = f.symptoms || [], H = E.trim();
    D(!0);
    try {
      g !== (f.energy || 0) && await Yt("setDayCheckin", a, "energy", g), b !== (f.mood || 0) && await Yt("setDayCheckin", a, "mood", b);
      for (const G of y.filter((K) => !A.includes(K)))
        await Yt("toggleDaySym", a, G);
      for (const G of A.filter((K) => !y.includes(K)))
        await Yt("toggleDaySym", a, G);
      w !== !!f.intimacy && await Yt("markPA", a), H ? await Yt("addDayCustomSym", a, H) : Ot("Сохранено", { type: "success" }), s();
    } catch (G) {
      Ot(G?.message || "Не удалось сохранить", { type: "error" });
    } finally {
      D(!1);
    }
  };
  return /* @__PURE__ */ m.jsxs(
    bn,
    {
      isOpen: l,
      onClose: s,
      "data-aiwa-day-log-modal": "true",
      children: [
        /* @__PURE__ */ m.jsx(Xh, { size: "large", title: e || "Занести в журнал" }),
        /* @__PURE__ */ m.jsx("div", { className: "aiwa-log-scroll", children: /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-log-sections", children: [
          /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(
            Vr,
            {
              label: "Энергия",
              options: ox,
              value: g,
              onChange: v
            }
          ) }),
          /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(
            Vr,
            {
              label: "Настроение",
              options: rx,
              value: b,
              onChange: T
            }
          ) }),
          V.map(([A, H]) => /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(mx, { label: A, options: H, symptoms: y, onToggle: N }) }, A)),
          /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(px, { value: E, onChange: M }) }),
          c ? /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(Ld, { label: "Близость", active: w, onChange: S }) }) : null
        ] }) }),
        /* @__PURE__ */ m.jsx("div", { className: "aiwa-log-footer", children: /* @__PURE__ */ m.jsx(
          It,
          {
            variant: "filled",
            label: R ? "Сохраняю…" : "Сохранить",
            isFill: !0,
            ...se("Сохранить", z)
          }
        ) })
      ]
    }
  );
}
function KE({ isOpen: a, onClose: e, mode: l, revision: s, symptomGroups: r }) {
  const [c, f] = j.useState(!1), [h, y] = j.useState(null), [p, g] = j.useState(!1), [v, b] = j.useState("period"), [T, w] = j.useState({}), S = j.useRef(Promise.resolve()), E = j.useRef(0), M = Array.from({ length: 20 }, (Z, it) => Yt("getAiwaCalendarMonth", it - 12)).filter(Boolean), R = l !== "preg" && l !== "meno" && l !== "male", D = cE(R ? ["period", "symptoms", "intimacy"] : ["symptoms", "intimacy"]), N = Bd[v] || Bd.symptoms, V = oE(), z = () => {
    g(!1), w({});
  }, A = (Z) => {
    b(Z), f(!1), g(!0);
  }, H = D.map((Z) => ({
    label: Z.label,
    onSelect: () => A(Z.value)
  }));
  dx(a, p ? z : e);
  const G = j.useRef(null);
  j.useEffect(() => {
    if (!a) return;
    const Z = G.current, it = Z?.querySelector('[data-current-month="true"]');
    Z && it && (Z.scrollTop = Math.max(0, it.offsetTop - 8));
  }, [a]), j.useEffect(() => {
    a || (f(!1), y(null), g(!1), w({})), b(R ? "period" : "symptoms");
  }, [a, R]);
  const K = (Z) => {
    const it = T[`${v}:${Z.iso}`];
    return typeof it == "boolean" ? it : !!N.checked(Z);
  }, nt = (Z, it) => {
    const L = () => Yt(Z, it);
    E.current += 1, S.current = S.current.then(L, L).then(() => {
      E.current -= 1, E.current === 0 && w({});
    });
  }, at = (() => {
    const Z = /* @__PURE__ */ new Date();
    return `${Z.getFullYear()}-${String(Z.getMonth() + 1).padStart(2, "0")}-${String(Z.getDate()).padStart(2, "0")}`;
  })(), tt = (Z, it) => {
    if (!p) {
      Z.iso && Z.iso <= at && y({ iso: Z.iso, label: `${Z.date} ${it}` });
      return;
    }
    if (v === "symptoms") {
      y({ iso: Z.iso, label: `${Z.date} ${it}` });
      return;
    }
    w((L) => ({ ...L, [`${v}:${Z.iso}`]: !K(Z) })), nt(v === "period" ? "toggleCalendarPeriodDay" : "markPA", Z.iso);
  };
  return a ? Gr.createPortal(
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
                je,
                {
                  as: "button",
                  type: "button",
                  mode: "opacity",
                  className: "aiwa-calendar-legend-toggle",
                  "aria-pressed": c,
                  "aria-label": c ? "Скрыть обозначения" : "Показать обозначения календаря",
                  onClick: () => f((Z) => !Z),
                  children: [
                    /* @__PURE__ */ m.jsx(ex, {}),
                    /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "semibold", children: "Обозначения" })
                  ]
                }
              ),
              p ? /* @__PURE__ */ m.jsx(
                je,
                {
                  as: "button",
                  type: "button",
                  mode: "opacity",
                  className: "aiwa-calendar-done",
                  "aria-label": "Закончить отметки",
                  onClick: z,
                  children: /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "semibold", children: "Готово" })
                }
              ) : null
            ] }),
            c ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-calendar-help", role: "status", children: [
              /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "semibold", children: "Обозначения" }),
              /* @__PURE__ */ m.jsx("div", { className: "aiwa-calendar-legend", children: fE.map(({ label: Z, variant: it, token: L }) => /* @__PURE__ */ m.jsx(
                Zj,
                {
                  variant: it,
                  textVariant: "caption1",
                  weight: "semibold",
                  style: { color: `var(${L})` },
                  children: Z
                },
                Z
              )) })
            ] }) : null,
            /* @__PURE__ */ m.jsx("div", { className: "aiwa-calendar-scroll", ref: G, children: /* @__PURE__ */ m.jsx("div", { className: "aiwa-calendar-months", children: M.map((Z) => /* @__PURE__ */ m.jsxs(
              "section",
              {
                className: "aiwa-calendar-month",
                "aria-label": Z.label,
                "data-current-month": Z.days.some((it) => it.today) ? "true" : void 0,
                children: [
                  /* @__PURE__ */ m.jsx(rt, { className: "aiwa-calendar-month-title", variant: "body", weight: "semibold", children: Z.label || Z.name }),
                  /* @__PURE__ */ m.jsx("div", { className: "aiwa-calendar-grid", children: Z.days.map((it) => it.empty ? /* @__PURE__ */ m.jsx("span", { className: "aiwa-calendar-empty", "aria-hidden": "true" }, it.key) : /* @__PURE__ */ m.jsx(
                    lx,
                    {
                      day: it,
                      interactive: p || !!(it.iso && it.iso <= at),
                      marking: p,
                      checked: p && K(it),
                      markVariant: v === "intimacy" ? "heart" : "radio",
                      monthLabel: Z.label,
                      onSelect: (L) => tt(L, Z.name || Z.label)
                    },
                    it.key
                  )) })
                ]
              },
              Z.key || Z.label
            )) }) })
          ] }),
          p && !V ? /* @__PURE__ */ m.jsx(
            XE,
            {
              options: D,
              value: v,
              onChange: b,
              hint: N.hint
            }
          ) : null,
          p ? null : /* @__PURE__ */ m.jsx(
            yx,
            {
              className: "aiwa-calendar-fab",
              align: "end",
              items: H,
              trigger: /* @__PURE__ */ m.jsx(YE, { icon: /* @__PURE__ */ m.jsx(Kr, {}), label: "Отметить день" })
            }
          ),
          /* @__PURE__ */ m.jsx(
            PE,
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
function ZE({ panel: a, onClose: e, checkin: l, symptomGroups: s, mode: r, revision: c, dayIso: f }) {
  return /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
    /* @__PURE__ */ m.jsx(qE, { isOpen: a === "journal", onClose: e, checkin: l, symptomGroups: s, mode: r, dayIso: f }),
    /* @__PURE__ */ m.jsx(KE, { isOpen: a === "calendar", onClose: e, mode: r, revision: c, symptomGroups: s })
  ] });
}
function Qh() {
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
function Zt({
  title: a,
  description: e,
  onClick: l,
  trailing: s,
  muted: r = !1,
  start: c,
  image: f,
  loading: h = !1
}) {
  const y = s !== void 0 ? s : l ? /* @__PURE__ */ m.jsx(ht.Part, { type: "Chevron" }) : null, p = h ? /* @__PURE__ */ m.jsx("span", { className: "aiwa-cell-thumb aiwa-cell-thumb-loading", children: /* @__PURE__ */ m.jsx(Yh, { size: 22 }) }) : f ? /* @__PURE__ */ m.jsx("span", { className: "aiwa-cell-thumb", children: /* @__PURE__ */ m.jsx("img", { src: f, alt: "", loading: "lazy" }) }) : c;
  return /* @__PURE__ */ m.jsx(
    ht,
    {
      start: p,
      end: y,
      onClick: l,
      tappable: !!l,
      as: l ? "button" : "div",
      type: l ? "button" : void 0,
      "aria-label": a,
      style: r ? { opacity: 0.65 } : void 0,
      children: /* @__PURE__ */ m.jsx(ht.Text, { title: a, description: e || void 0 })
    }
  );
}
function Wi({ label: a, options: e, value: l, onChange: s }) {
  return /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-group", children: [
    a ? /* @__PURE__ */ m.jsx(rt, { className: "aiwa-form-label", variant: "body", weight: "semibold", children: a }) : null,
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-choice-pills", role: "group", "aria-label": a, children: e.map((r) => {
      const c = typeof r == "string" ? { value: r, label: r } : r;
      return /* @__PURE__ */ m.jsx(
        je,
        {
          as: "button",
          type: "button",
          mode: "opacity",
          className: l === c.value ? "aiwa-choice-pill is-active" : "aiwa-choice-pill",
          "aria-pressed": l === c.value,
          onClick: () => s(c.value),
          children: /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "regular", children: c.label })
        },
        c.value
      );
    }) })
  ] });
}
function Fh({ isOpen: a, onClose: e }) {
  const [l, s] = j.useState("main"), [r, c] = j.useState(() => Yt("aiwaData") || {}), [f, h] = j.useState(null), [y, p] = j.useState("3"), [g, v] = j.useState({}), [b, T] = j.useState(!1);
  j.useEffect(() => {
    if (!a) return;
    const z = Yt("aiwaData") || {};
    c(z), s("main"), h(null), v({
      height: String(z.profile?.height || ""),
      weight: String(z.profile?.weight || ""),
      age: String(z.profile?.age || ""),
      cycle_len: String(z.cycle_len || ""),
      diet_note: z.profile?.diet_note || z.diet_note || "",
      kcal_goal: String(z.profile?.kcal_goal || z.kcal_goal || ""),
      send_time: z.send_time || "08:00",
      daily_summary_enabled: z.daily_summary_enabled !== !1,
      proactive_enabled: z.proactive_enabled !== !1
    });
  }, [a]);
  const w = async () => {
    s("partner");
    const z = await Lt("/api/partner", {}).catch(() => null);
    h(z || {});
  }, S = async () => {
    const z = await Lt("/api/profile", {
      height: g.height,
      weight: g.weight,
      age: g.age,
      ...r.mode === "cycle" ? { cycle_len: g.cycle_len } : {}
    }).catch(() => null), A = await Lt("/api/prefs", {
      diet_note: g.diet_note,
      kcal_goal: g.kcal_goal
    }).catch(() => null), H = await Lt("/api/settime", { time: g.send_time }).catch(() => null);
    z?.ok && A?.ok && H?.ok ? (Ot("Данные сохранены", { type: "success" }), vn("reloadAfterEdit"), s("main")) : Ot(z?.text || "Проверь рост, вес, возраст и время", { type: "error" });
  }, E = async () => {
    if (!b) {
      T(!0);
      try {
        const z = await Lt("/api/report", { period: y }).catch(() => null);
        z?.ok && z?.delivered ? ix() : Ot(z?.text || "Выписка временно недоступна", { type: "error" });
      } finally {
        T(!1);
      }
    }
  }, M = async (z) => {
    const A = g.proactive_enabled !== !1;
    v((G) => ({ ...G, proactive_enabled: z })), (await Lt("/api/proactive", { enabled: z }).catch(() => null))?.ok || (v((G) => ({ ...G, proactive_enabled: A })), Ot("Не получилось изменить настройку", { type: "error" }));
  }, R = async (z) => {
    const A = g.daily_summary_enabled !== !1;
    v((G) => ({ ...G, daily_summary_enabled: z })), (await Lt("/api/daily-summary", { enabled: z }).catch(() => null))?.ok || (v((G) => ({ ...G, daily_summary_enabled: A })), Ot("Не получилось изменить настройку", { type: "error" }));
  }, D = (z) => {
    e(), vn("chooseMode", z);
  }, N = async () => {
    if (f?.link)
      try {
        await navigator.clipboard.writeText(f.link), Ot("Ссылка скопирована", { type: "success" });
      } catch {
        Ot("Ссылка готова — выдели и скопируй");
      }
  }, V = async () => {
    (await Lt("/api/partner", { action: "unlink" }).catch(() => null))?.ok && (h({ linked: !1 }), Ot("Партнёр отключён", { type: "success" }));
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
            /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "semibold", children: "Режим" }),
            /* @__PURE__ */ m.jsx("div", { className: "aiwa-choice-pills", children: mE.map((z) => /* @__PURE__ */ m.jsx(
              je,
              {
                as: "button",
                type: "button",
                mode: "opacity",
                className: r.mode === z.value ? "aiwa-choice-pill is-active" : "aiwa-choice-pill",
                "aria-pressed": r.mode === z.value,
                onClick: () => D(z.value),
                children: /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "regular", children: z.label })
              },
              z.value
            )) })
          ] }),
          /* @__PURE__ */ m.jsx(yt, { className: "aiwa-tma-blocks", children: /* @__PURE__ */ m.jsxs(yt.Item, { children: [
            /* @__PURE__ */ m.jsx(Zt, { title: r.mode === "male" ? "Выписка по самочувствию" : "Выписка для врача", description: "PDF в чат бота", onClick: () => s("report") }),
            /* @__PURE__ */ m.jsx(Zt, { title: "Предпочтения по питанию", description: "ограничения и цель калорий", onClick: () => s("data") }),
            /* @__PURE__ */ m.jsx(Zt, { title: "Мои данные", description: r.mode === "male" ? "рост · вес · возраст" : "рост · вес · возраст · цикл", onClick: () => s("data") }),
            /* @__PURE__ */ m.jsx(Zt, { title: "Утренняя сводка", description: g.daily_summary_enabled === !1 ? "выключена" : `${g.send_time || "08:00"} · МСК`, onClick: () => s("summary") }),
            /* @__PURE__ */ m.jsx(
              ht.Switch,
              {
                value: g.proactive_enabled !== !1,
                onChange: M,
                children: /* @__PURE__ */ m.jsx(
                  ht.Text,
                  {
                    title: "Проактивные сообщения",
                    description: g.proactive_enabled === !1 ? "выключены" : "не больше одного в день"
                  }
                )
              }
            ),
            r.mode === "male" ? null : /* @__PURE__ */ m.jsx(Zt, { title: "Партнёр и близкие", description: "короткая бережная сводка", onClick: w })
          ] }) })
        ] }) : null,
        l === "data" ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-stack", children: [
          /* @__PURE__ */ m.jsx(rt, { variant: "title3", weight: "semibold", children: "Параметры тела" }),
          /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-grid", children: [
            /* @__PURE__ */ m.jsx(ae, { label: "Рост, см", value: g.height || "", onChange: (z) => v((A) => ({ ...A, height: z })), inputMode: "decimal" }),
            /* @__PURE__ */ m.jsx(ae, { label: "Вес, кг", value: g.weight || "", onChange: (z) => v((A) => ({ ...A, weight: z })), inputMode: "decimal" }),
            /* @__PURE__ */ m.jsx(ae, { label: "Возраст", value: g.age || "", onChange: (z) => v((A) => ({ ...A, age: z })), inputMode: "numeric" }),
            r.mode === "cycle" ? /* @__PURE__ */ m.jsx(ae, { label: "Длина цикла", value: g.cycle_len || "", onChange: (z) => v((A) => ({ ...A, cycle_len: z })), inputMode: "numeric" }) : null
          ] }),
          /* @__PURE__ */ m.jsx(rt, { variant: "title3", weight: "semibold", children: "Питание" }),
          /* @__PURE__ */ m.jsx(
            ae,
            {
              label: "Предпочтения и ограничения",
              value: g.diet_note || "",
              onChange: (z) => v((A) => ({ ...A, diet_note: z })),
              placeholder: "Например: без свинины, аллергия на орехи",
              multiline: !0
            }
          ),
          /* @__PURE__ */ m.jsx(ae, { label: "Желаемые калории", value: g.kcal_goal || "", onChange: (z) => v((A) => ({ ...A, kcal_goal: z })), inputMode: "numeric" }),
          /* @__PURE__ */ m.jsx(It, { variant: "filled", label: "Сохранить", isFill: !0, ...se("Сохранить данные", S) })
        ] }) : null,
        l === "summary" ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-stack", children: [
          /* @__PURE__ */ m.jsx(rt, { variant: "title3", weight: "semibold", children: "Утренняя сводка" }),
          /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "regular", children: "Каждое утро Айва присылает сводку дня в чат — выбери удобное время (МСК)." }),
          /* @__PURE__ */ m.jsx(ht.Switch, { value: g.daily_summary_enabled !== !1, onChange: R, children: /* @__PURE__ */ m.jsx(ht.Text, { title: "Присылать утром", description: g.daily_summary_enabled === !1 ? "выключено" : "включено" }) }),
          /* @__PURE__ */ m.jsx(ae, { label: "Время утренней сводки", type: "time", value: g.send_time || "08:00", onChange: (z) => v((A) => ({ ...A, send_time: z })) }),
          /* @__PURE__ */ m.jsx(It, { variant: "filled", label: "Сохранить", isFill: !0, ...se("Сохранить время сводки", S) })
        ] }) : null,
        l === "report" ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-stack", children: [
          /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "regular", children: r.mode === "male" ? "Динамика энергии и дневник самочувствия придут PDF-файлом в чат бота." : "Циклы, динамика и дневник симптомов придут PDF-файлом в чат бота." }),
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
          /* @__PURE__ */ m.jsx(It, { variant: "filled", label: b ? "Собираю…" : "Собрать выписку", isFill: !0, disabled: b, ...se("Собрать выписку", E) })
        ] }) : null,
        l === "partner" ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-stack", children: [
          /* @__PURE__ */ m.jsxs("div", { className: "aiwa-paper-card", children: [
            /* @__PURE__ */ m.jsx(rt, { variant: "title3", weight: "semibold", children: "Бережная сводка для близкого" }),
            /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "regular", children: "Айва расскажет, когда особенно нужны поддержка и отдых — без интимных и медицинских деталей." })
          ] }),
          f === null ? /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "regular", children: "Готовлю ссылку…" }) : null,
          f?.linked ? /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
            /* @__PURE__ */ m.jsx("div", { className: "aiwa-sheet-card", children: /* @__PURE__ */ m.jsx(Zt, { title: "Партнёр подключён", description: "Получает только бережную сводку без календаря и приватных заметок." }) }),
            /* @__PURE__ */ m.jsx(It, { variant: "filled", label: "Отключить партнёра", isFill: !0, ...se("Отключить партнёра", V) })
          ] }) : null,
          f?.link ? /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
            /* @__PURE__ */ m.jsx(ae, { label: "Ссылка-приглашение", value: f.link, readOnly: !0, multiline: !0 }),
            /* @__PURE__ */ m.jsx(It, { variant: "filled", label: "Скопировать ссылку", isFill: !0, ...se("Скопировать ссылку", N) })
          ] }) : null,
          f && !f.linked && !f.link ? /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "regular", children: "Ссылка доступна после запуска из Telegram. В боте можно использовать команду /partner." }) : null
        ] }) : null
      ] }) })
    }
  );
}
function QE(a) {
  return /* @__PURE__ */ m.jsx(ol, { children: /* @__PURE__ */ m.jsx(sl, { mode: "secondary", children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-deslop-home", children: [
    /* @__PURE__ */ m.jsx(
      Xh,
      {
        title: a.dateText,
        left: /* @__PURE__ */ m.jsx(Qh, {}),
        onLeft: () => window.AiwaDeslop?.openProfile?.(),
        leftAriaLabel: "Открыть профиль",
        right: /* @__PURE__ */ m.jsx(Fj, {}),
        onRight: () => vn("openHomePanel", "calendar"),
        rightAriaLabel: "Открыть календарь"
      }
    ),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-overview", children: [
      /* @__PURE__ */ m.jsx(
        Ph,
        {
          days: a.week,
          selectedIso: a.selectedIso,
          onSelect: a.onSelectDay ?? ((e) => vn("aiwaSelectDay", e.iso))
        }
      ),
      /* @__PURE__ */ m.jsxs("div", { className: "aiwa-countdown", children: [
        /* @__PURE__ */ m.jsx(rt, { variant: "title1", weight: "semibold", children: a.heroValue || `${a.countdown} дней` }),
        /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "regular", children: a.countdownLabel })
      ] }),
      /* @__PURE__ */ m.jsx(
        It,
        {
          variant: "filled",
          label: /* @__PURE__ */ m.jsxs("span", { className: "aiwa-btn-icon-label", children: [
            /* @__PURE__ */ m.jsx(Kr, {}),
            " Занести в журнал"
          ] }),
          ...se("Занести в журнал", () => vn("openHomePanel", "journal"))
        }
      )
    ] }),
    /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-tma-blocks", children: [
      /* @__PURE__ */ m.jsx(yE, { title: a.dayTitle, checkin: a.dayCheckin ?? a.checkin, symptomGroups: a.symptomGroups }),
      /* @__PURE__ */ m.jsx(SE, { aiText: a.aiText }),
      /* @__PURE__ */ m.jsx(wE, { delay: a.delay }),
      /* @__PURE__ */ m.jsx(jE, { metrics: a.metrics, title: a.statsTitle }),
      a.pregnancy ? /* @__PURE__ */ m.jsx(UE, { pregnancy: a.pregnancy }) : /* @__PURE__ */ m.jsx(
        ME,
        {
          data: a.chartData,
          series: a.chartSeries,
          title: a.chartTitle,
          band: a.chartBand,
          emptyText: a.chartEmptyText
        }
      ),
      a.mode === "meno" || a.mode === "preg" ? null : /* @__PURE__ */ m.jsx(
        _E,
        {
          history: a.history,
          title: a.historyTitle,
          emptyTitle: a.historyEmptyTitle,
          emptyDescription: a.historyEmptyDescription
        }
      ),
      /* @__PURE__ */ m.jsx(VE, {})
    ] }),
    /* @__PURE__ */ m.jsx(
      ZE,
      {
        panel: a.panel,
        onClose: a.onPanelClose,
        checkin: a.dayCheckin ?? a.checkin,
        dayIso: a.selectedIso,
        symptomGroups: a.symptomGroups,
        mode: a.mode,
        revision: a.panelRevision
      }
    ),
    /* @__PURE__ */ m.jsx(Fh, { isOpen: a.profileOpen, onClose: a.onProfileClose })
  ] }) }) });
}
const nv = {
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
}, Vd = (a) => Array.from({ length: a }, (e, l) => l);
function FE({ kind: a }) {
  return a === "week" ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-overview", children: [
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-week", children: Vd(7).map((e) => /* @__PURE__ */ m.jsx(Fi, { className: "aiwa-skeleton-day" }, e)) }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-countdown", children: [
      /* @__PURE__ */ m.jsx(ni, { active: !0, width: 2 }),
      /* @__PURE__ */ m.jsx(ni, { active: !0, width: 18 })
    ] })
  ] }) : /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
    /* @__PURE__ */ m.jsx(Fi, { className: "aiwa-skeleton-gauge" }),
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-macro-grid", children: Vd(3).map((e) => /* @__PURE__ */ m.jsx(Fi, { className: "aiwa-skeleton-macro" }, e)) })
  ] });
}
function gx({ title: a, variant: e = "food" }) {
  const { hero: l, sections: s } = nv[e] || nv.food;
  return /* @__PURE__ */ m.jsx(ol, { children: /* @__PURE__ */ m.jsx(sl, { mode: "secondary", children: /* @__PURE__ */ m.jsxs("div", { className: `aiwa-paper-screen aiwa-screen-skeleton aiwa-${e}-screen`, children: [
    /* @__PURE__ */ m.jsx(rt, { className: "aiwa-screen-title", variant: "title1", weight: "semibold", children: a }),
    /* @__PURE__ */ m.jsxs(bb, { active: !0, children: [
      /* @__PURE__ */ m.jsx(FE, { kind: l }),
      /* @__PURE__ */ m.jsx("div", { className: "aiwa-screen-cta", children: /* @__PURE__ */ m.jsx(Fi, { className: "aiwa-skeleton-cta" }) }),
      /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-tma-blocks", children: [
        /* @__PURE__ */ m.jsx(yt.Item, { className: "aiwa-insight-section", children: /* @__PURE__ */ m.jsx(ht, { tappable: !1, children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-insight-content", children: [
          /* @__PURE__ */ m.jsx(ni, { active: !0, width: 30 }),
          /* @__PURE__ */ m.jsx(ni, { active: !0, width: 26 }),
          /* @__PURE__ */ m.jsx(Fi, { className: "aiwa-skeleton-insight-cta" })
        ] }) }) }),
        s.map((r) => /* @__PURE__ */ m.jsx(yt.Item, { header: r.header, children: Vd(r.rows).map((c) => /* @__PURE__ */ m.jsx(
          ht,
          {
            tappable: !1,
            start: r.media ? /* @__PURE__ */ m.jsx(Fi, { className: "aiwa-skeleton-thumb" }) : void 0,
            children: /* @__PURE__ */ m.jsx(
              ht.Text,
              {
                title: /* @__PURE__ */ m.jsx(ni, { active: !0, width: 13 }),
                description: /* @__PURE__ */ m.jsx(ni, { active: !0, width: 22 })
              }
            )
          },
          c
        )) }, r.header))
      ] })
    ] })
  ] }) }) });
}
function Ff({ label: a, value: e, target: l, macro: s, color: r }) {
  const c = l ? Math.min(100, Math.round(Number(e || 0) / Number(l) * 100)) : 0, f = r || (s ? `var(--aiwa-macro-${s})` : "var(--aiwa-accent)");
  return /* @__PURE__ */ m.jsxs("div", { className: "aiwa-macro-card", children: [
    /* @__PURE__ */ m.jsxs(rt, { variant: "body", weight: "semibold", children: [
      Math.round(e || 0),
      l ? null : " г",
      l ? /* @__PURE__ */ m.jsxs("span", { children: [
        " / ",
        Math.round(l),
        " г"
      ] }) : null
    ] }),
    /* @__PURE__ */ m.jsx(rt, { variant: "caption1", weight: "regular", children: a }),
    /* @__PURE__ */ m.jsx("span", { className: "aiwa-macro-track", style: { "--macro-color": f }, children: /* @__PURE__ */ m.jsx("span", { style: { width: `${c}%` } }) })
  ] });
}
const av = "M 11 169 A 158 158 0 0 1 327 169", iv = Math.PI * 158, JE = 500, WE = (a) => 1 - (1 - a) ** 3;
function IE(a) {
  const [e, l] = j.useState(0), s = j.useRef(0), r = j.useRef(0);
  return j.useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      s.current = a, l(a);
      return;
    }
    const f = s.current, h = performance.now(), y = (p) => {
      const g = Math.min(1, (p - h) / JE), v = f + (a - f) * WE(g);
      s.current = v, l(v), g < 1 && (r.current = requestAnimationFrame(y));
    };
    return r.current = requestAnimationFrame(y), () => cancelAnimationFrame(r.current);
  }, [a]), e;
}
function tA({ kcal: a, kcalTarget: e }) {
  const l = Number(a || 0), s = Number(e || 0), r = IE(Math.min(1, l / Math.max(1, s))), c = r * Math.PI, f = 169 - 158 * Math.cos(c), h = 169 - 158 * Math.sin(c);
  return /* @__PURE__ */ m.jsxs("div", { className: "aiwa-food-gauge", children: [
    /* @__PURE__ */ m.jsxs("svg", { className: "aiwa-food-gauge-arc", viewBox: "0 0 338 180", width: "338", height: "180", fill: "none", children: [
      /* @__PURE__ */ m.jsx("path", { className: "aiwa-food-gauge-track", d: av }),
      /* @__PURE__ */ m.jsx(
        "path",
        {
          className: "aiwa-food-gauge-progress",
          d: av,
          strokeDasharray: iv,
          strokeDashoffset: iv * (1 - r)
        }
      ),
      /* @__PURE__ */ m.jsx("circle", { className: "aiwa-food-gauge-knob", cx: f, cy: h, r: "11" })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-food-gauge-center", children: [
      /* @__PURE__ */ m.jsx(rt, { variant: "title1", weight: "semibold", children: zd(l) }),
      /* @__PURE__ */ m.jsxs(rt, { variant: "body", weight: "regular", children: [
        "из ",
        zd(s)
      ] })
    ] })
  ] });
}
function lv({ meal: a, onSaved: e, onClose: l }) {
  const [s, r] = j.useState(() => dE(a)), [c, f] = j.useState(!1), h = (p, g) => r((v) => ({ ...v, [p]: g })), y = async () => {
    if (!s.title.trim() && !String(s.kcal).trim()) {
      Ot("Укажи название или калории", { type: "error" });
      return;
    }
    f(!0);
    try {
      const p = await Lt(a ? "/api/diary_edit" : "/api/food_manual", {
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
    /* @__PURE__ */ m.jsx(Wi, { label: "Приём пищи", options: ux, value: s.slot, onChange: (p) => h("slot", p) }),
    /* @__PURE__ */ m.jsx(
      It,
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
function eA({ isOpen: a, onClose: e, onSaved: l, editingMeal: s = null }) {
  const [r, c] = j.useState("text"), [f, h] = j.useState(""), [y, p] = j.useState(!1);
  j.useEffect(() => {
    a && (ax("food"), c(s ? "manual" : "text"), h(""));
  }, [s, a]);
  const g = async () => {
    if (f.trim()) {
      p(!0);
      try {
        const b = await Lt("/api/food_text", { text: f.trim() });
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
  return /* @__PURE__ */ m.jsx(bn, { isOpen: a, onClose: e, children: /* @__PURE__ */ m.jsx("div", { children: /* @__PURE__ */ m.jsx("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: s ? /* @__PURE__ */ m.jsx(lv, { meal: s, onSaved: l, onClose: e }) : /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
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
      y ? /* @__PURE__ */ m.jsx(Yh, { size: 28 }) : null,
      /* @__PURE__ */ m.jsx(rt, { variant: "title3", weight: "semibold", children: y ? "Разбираю фото…" : "Сфотографировать еду" }),
      /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "regular", children: y ? "Айва считает КБЖУ, это займёт несколько секунд." : "Айва распознает блюдо и посчитает КБЖУ." }),
      /* @__PURE__ */ m.jsx("input", { type: "file", accept: "image/*", capture: "environment", disabled: y, onChange: (b) => v(b.target.files?.[0]) })
    ] }) : null,
    r === "text" ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-stack", children: [
      /* @__PURE__ */ m.jsx(
        ae,
        {
          label: "Что было в приёме пищи?",
          value: f,
          onChange: h,
          placeholder: "Например: 200 г творога и банан",
          multiline: !0
        }
      ),
      /* @__PURE__ */ m.jsx(
        It,
        {
          variant: "filled",
          label: y ? "Считаю…" : "Добавить приём",
          isFill: !0,
          disabled: y || !f.trim(),
          ...se("Добавить приём", g)
        }
      )
    ] }) : null,
    r === "manual" ? /* @__PURE__ */ m.jsx(lv, { meal: null, onSaved: l, onClose: e }) : null
  ] }) }) }) });
}
function nA({ isOpen: a, onClose: e, diary: l, onAdd: s, onEdit: r, onDelete: c, onReco: f, canAdd: h = !0 }) {
  const y = l?.meals || [], p = l?.totals || {}, g = l?.target || {};
  return /* @__PURE__ */ m.jsx(bn, { isOpen: a, onClose: e, children: /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-tma-blocks", children: [
    /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(ht, { tappable: !1, children: /* @__PURE__ */ m.jsx(
      ht.Text,
      {
        title: `${Math.round(p.kcal || 0)} ккал`,
        description: `из ${Math.round(g.kcal || 0) || "—"} ккал`,
        bold: !0
      }
    ) }) }),
    ux.map((v) => {
      const b = y.filter((T) => (T.slot || "snack") === v.value);
      return /* @__PURE__ */ m.jsx(yt.Item, { header: v.label, children: b.length ? b.map((T) => /* @__PURE__ */ m.jsx(
        Zt,
        {
          title: T.title,
          description: `${Math.round(T.kcal || 0)} ккал`,
          onClick: () => r(T),
          trailing: /* @__PURE__ */ m.jsx(
            je,
            {
              as: "button",
              type: "button",
              mode: "opacity",
              "aria-label": `Удалить ${T.title}`,
              onClick: (w) => {
                w.stopPropagation(), c(T.id);
              },
              children: /* @__PURE__ */ m.jsx(tx, {})
            }
          )
        },
        T.id
      )) : h ? /* @__PURE__ */ m.jsx(ht, { as: "button", type: "button", onClick: s, end: /* @__PURE__ */ m.jsx(ht.Part, { type: "Chevron" }), children: /* @__PURE__ */ m.jsx(ht.Text, { type: "Accent", title: "Добавить" }) }) : /* @__PURE__ */ m.jsx(ht, { tappable: !1, children: /* @__PURE__ */ m.jsx(ht.Text, { title: "Нет записей" }) }) }, v.value);
    }),
    /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(ht, { tappable: !1, children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-cell-actions", children: [
      h ? /* @__PURE__ */ m.jsx(It, { variant: "filled", label: "Добавить приём", isFill: !0, ...se("Добавить приём", s) }) : null,
      /* @__PURE__ */ m.jsx(It, { variant: "filled", label: "Совет по дневнику", isFill: !0, ...se("Совет по дневнику", f) })
    ] }) }) })
  ] }) });
}
function aA({ isOpen: a, meal: e, slotLabel: l = "", onClose: s, onAdd: r, busy: c = !1 }) {
  const [f, h] = j.useState(null), [y, p] = j.useState(!1), g = e?.dish || "";
  j.useEffect(() => {
    if (!a || !g) return;
    h(null), p(!1);
    let w = !0;
    return Lt("/api/recipe", { dish: g }).then((S) => {
      w && (S?.steps?.length ? h(S) : p(!0));
    }).catch(() => w && p(!0)), () => {
      w = !1;
    };
  }, [a, g]);
  const v = f?.macros || {}, b = [v.protein && `Б ${v.protein}`, v.fat && `Ж ${v.fat}`, v.carbs && `У ${v.carbs}`].filter(Boolean).join(" · "), T = [l, e?.kcal, f?.time].filter(Boolean).join(" · ");
  return /* @__PURE__ */ m.jsx(bn, { isOpen: a, onClose: s, children: /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-tma-blocks", children: [
    /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(ht, { tappable: !1, children: /* @__PURE__ */ m.jsx(ht.Text, { title: g, description: T || e?.note || "", bold: !0 }) }) }),
    !f && !y ? /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(ht, { tappable: !1, children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-cell-actions", "aria-label": "Готовлю рецепт", children: [
      /* @__PURE__ */ m.jsx(Yh, { size: "m" }),
      /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "regular", children: "Айва пишет рецепт…" })
    ] }) }) }) : null,
    y ? /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(ht, { tappable: !1, children: /* @__PURE__ */ m.jsx(ht.Text, { title: "Рецепт не собрался", description: "Попробуй открыть блюдо ещё раз." }) }) }) : null,
    f ? /* @__PURE__ */ m.jsx(yt.Item, { header: "Питательность", children: /* @__PURE__ */ m.jsx(ht, { tappable: !1, children: /* @__PURE__ */ m.jsx(
      ht.Text,
      {
        title: [f.kcal, b].filter(Boolean).join(" · ") || "—",
        description: (f.micros || []).join("; ")
      }
    ) }) }) : null,
    f?.ingredients?.length ? /* @__PURE__ */ m.jsx(yt.Item, { header: "Ингредиенты", children: f.ingredients.map((w) => /* @__PURE__ */ m.jsx(ht, { tappable: !1, children: /* @__PURE__ */ m.jsx(ht.Text, { title: w }) }, w)) }) : null,
    f?.steps?.length ? /* @__PURE__ */ m.jsx(yt.Item, { header: "Приготовление", children: f.steps.map((w, S) => /* @__PURE__ */ m.jsx(ht, { tappable: !1, children: /* @__PURE__ */ m.jsx(ht.Text, { title: `${S + 1}. ${w}` }) }, w)) }) : null,
    /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(ht, { tappable: !1, children: /* @__PURE__ */ m.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ m.jsx(
      It,
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
const vx = {
  foodSection: () => Lt("/api/section", { kind: "food" }),
  diary: () => Lt("/api/diary", {}),
  trainingSection: () => Lt("/api/section", { kind: "training" }),
  train: () => Lt("/api/train", {})
}, Zi = /* @__PURE__ */ new Map(), ur = /* @__PURE__ */ new Map(), kd = /* @__PURE__ */ new Map(), cr = (a) => Object.fromEntries(a.map((e) => [e, Zi.get(e) ?? null])), Ud = (a, { force: e = !1, maxAgeMs: l = 1500 } = {}) => {
  if (!e) {
    const r = ur.get(a);
    if (r) return r;
    if (Zi.has(a) && Date.now() - (kd.get(a) || 0) <= l)
      return Promise.resolve(Zi.get(a));
  }
  const s = vx[a]().catch(() => null).then((r) => (r && (Zi.set(a, r), kd.set(a, Date.now())), ur.get(a) === s && ur.delete(a), Zi.get(a) ?? null));
  return ur.set(a, s), s;
}, iA = () => {
  Object.keys(vx).forEach((a) => {
    Ud(a);
  });
};
function bx(a, e) {
  const [l, s] = j.useState(() => cr(a)), r = j.useRef(!1), c = j.useCallback(async (...h) => {
    const y = h.length ? h : a;
    await Promise.all(y.map((p) => Ud(p, { force: !0 }))), s(cr(a));
  }, [a]), f = j.useCallback((h, y) => {
    Zi.set(h, y), kd.set(h, Date.now()), s(cr(a));
  }, [a]);
  return j.useEffect(() => {
    let h = !0;
    const y = r.current;
    return r.current = !0, Promise.all(a.map((p) => Ud(p, { force: y }))).then(() => {
      h && s(cr(a));
    }), () => {
      h = !1;
    };
  }, e), [l, c, f];
}
const lA = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"], xx = (a = 30) => {
  const e = [];
  for (let l = a - 1; l >= 0; l -= 1) {
    const s = /* @__PURE__ */ new Date(`${Fr()}T12:00:00`);
    s.setDate(s.getDate() - l);
    const r = `${s.getFullYear()}-${String(s.getMonth() + 1).padStart(2, "0")}-${String(s.getDate()).padStart(2, "0")}`;
    e.push({ iso: r, date: String(s.getDate()), label: lA[s.getDay()], today: l === 0 });
  }
  return e;
}, sA = ["foodSection", "diary"], Sx = "/assets/food/meal-placeholder.svg", kr = (a) => String(a || "").toLowerCase().replace(/ё/g, "е").replace(/\s+/g, " ").trim(), sv = "?v=2", ov = (a, e) => {
  const l = kr(e);
  if (!a || !l) return null;
  const s = a[String(e || "").trim()];
  if (s) return s + sv;
  for (const [r, c] of Object.entries(a))
    if (kr(r) === l) return c + sv;
  return null;
}, oA = (a) => {
  const e = kr([
    a?.title,
    ...Array.isArray(a?.items) ? a.items.map((s) => s?.name) : []
  ].filter(Boolean).join(" "));
  return kr(a?.fclass) === "напиток" || /(кофе|чай|какао|вода|сок|напит|латте|капуч|морс|компот)/.test(e) ? "/assets/food/drink-cup.svg?v=1" : Sx;
}, rA = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" });
function rv({ mode: a, revision: e = 0 }) {
  const [l, s, r] = bx(sA, [a, e]), f = (typeof window.aiwaData == "function" ? window.aiwaData() : window.aiwaData)?.mode === "male", [h, y] = j.useState(!1), [p, g] = j.useState({}), [v, b] = j.useState(""), [T, w] = j.useState(null), [S, E] = j.useState(null), [M, R] = j.useState(!1), [D, N] = j.useState(null), [V, z] = j.useState(!1), [A, H] = j.useState(""), [G, K] = j.useState(null), [nt, at] = j.useState(!1), tt = j.useRef(null), Z = !!l.foodSection?.refreshing, it = j.useRef(0);
  j.useEffect(() => {
    if (!Z) {
      it.current = 0;
      return;
    }
    if (it.current >= 3) return;
    const ot = Math.max(5e3, Number(l.foodSection?.retry_after_ms || 8e3)) + Math.floor(Math.random() * 2500), Vt = setTimeout(() => {
      document.visibilityState === "visible" && (it.current += 1, s("foodSection"));
    }, ot);
    return () => clearTimeout(Vt);
  }, [Z, l.foodSection]);
  const L = j.useRef({ revision: null, attempts: 0 }), et = [
    ...l.foodSection?.menu?.meals || [],
    ...l.diary?.meals || [],
    ...Object.values(l.diary?.recent || {}).flatMap((ot) => ot?.meals || [])
  ].some((ot) => ot?.asset_state === "missing" || ot?.image_source === "catalog_family" || ot?.image_source === "catalog_canonical"), st = Math.max(
    Number(l.foodSection?.asset_revision || 0),
    Number(l.diary?.asset_revision || 0)
  );
  j.useEffect(() => {
    if (!et) {
      L.current = { revision: null, attempts: 0 };
      return;
    }
    L.current.revision === null && (L.current.revision = st);
    let ot = !0, Vt = null;
    const xn = async () => {
      if (!(!ot || L.current.attempts >= 30)) {
        if (document.visibilityState === "visible") {
          const Ns = await Lt("/api/food-assets/revision", {}).catch(() => null), Fn = Number(Ns?.revision);
          if (Number.isFinite(Fn)) {
            const Os = L.current.revision;
            L.current.revision = Fn, Os !== null && Fn !== Os && await s("foodSection", "diary");
          }
          L.current.attempts += 1;
        }
        ot && L.current.attempts < 30 && (Vt = setTimeout(xn, 6e4 + Math.floor(Math.random() * 2e4)));
      }
    };
    return Vt = setTimeout(xn, 15e3 + Math.floor(Math.random() * 2e4)), () => {
      ot = !1, Vt && clearTimeout(Vt);
    };
  }, [et, st]), j.useEffect(() => {
    fetch("/assets/food/manifest.json?v=3").then((ot) => ot.ok ? ot.json() : {}).then((ot) => g(ot || {})).catch(() => {
    });
  }, []);
  const J = () => s("diary");
  if (!l.foodSection || !l.diary) return /* @__PURE__ */ m.jsx(gx, { title: "Питание", variant: "food" });
  const _ = l.foodSection, U = l.diary, I = U.totals || {}, lt = U.target || {}, ft = _.menu?.meals || [], vt = [
    { index: 0, value: "breakfast", label: "Завтрак" },
    { index: 1, value: "lunch", label: "Обед" },
    { index: ft.length >= 4 ? 3 : 2, value: "dinner", label: "Ужин" }
  ].map((ot) => ({ ...ot, meal: ft[ot.index] })).filter((ot) => ot.meal), Rt = Number(lt.kcal || _.kcal || 0), Mt = Number(I.kcal || 0), Pt = (ot) => Number(I[ot] || 0), Kt = xx(30), pe = Kt[Kt.length - 1].iso, Ae = !!(v && v !== pe), Qe = Ae ? T?.meals || [] : (U.meals || []).slice().reverse();
  let Qn = "Прошедшие приёмы";
  if (Ae) {
    const ot = /* @__PURE__ */ new Date(`${v}T12:00:00`);
    Qn = Number.isNaN(ot.getTime()) ? "Приёмы за день" : `Приёмы за ${rA.format(ot)}`;
  }
  const Ma = async () => {
    if (!V) {
      z(!0);
      try {
        const ot = await Lt("/api/week_food_review", {}).catch(() => null);
        ot?.review?.summary ? N(ot.review) : N({ summary: ot?.text || "Не получилось собрать разбор, попробуй чуть позже.", gaps: [], tips: [] });
      } finally {
        z(!1);
      }
    }
  }, Jr = async (ot) => {
    const Vt = typeof ot == "string" ? ot : ot?.iso || "";
    if (b(Vt), !Vt || Vt === pe) {
      w(null);
      return;
    }
    w(null);
    const xn = await Lt("/api/diary", { d: Vt }).catch(() => null);
    w(xn || { meals: [] });
  }, Rs = async (ot, Vt) => {
    if (!M) {
      R(!0);
      try {
        const xn = await Lt("/api/food_text", { text: ot.dish || ot.title, slot: Vt }).catch(() => null);
        xn?.ok ? (Ot("Добавлено в дневник", { type: "success" }), E(null), await J()) : Ot(xn?.message || "Не получилось добавить", { type: "error" });
      } finally {
        R(!1);
      }
    }
  }, rl = async (ot) => {
    const Vt = await Lt("/api/diary_del", { id: ot }).catch(() => null);
    Vt && !Vt.error && (r("diary", { meals: Vt.meals || [], totals: Vt.totals || {}, target: Vt.target || lt }), Ot("Приём удалён", { type: "success" }));
  }, ul = () => {
    K(null), H("add");
  }, cl = async (ot) => {
    if (!(!ot || nt)) {
      at(!0);
      try {
        const Vt = window.aiwaUploadFoodPhoto;
        if (typeof Vt != "function") throw new Error("Загрузка фото недоступна");
        await Vt(ot), await J();
      } catch (Vt) {
        Ot(Vt.message || "Не получилось разобрать фото", { type: "error" });
      } finally {
        at(!1);
      }
    }
  }, Wr = async () => {
    await Lt("/api/food_prompt", {}).catch(() => null), nl({ nudge: !1 });
  }, Ir = [
    { label: "Фото", icon: /* @__PURE__ */ m.jsx(tE, {}), onSelect: () => tt.current?.click() },
    { label: "Текстом", icon: /* @__PURE__ */ m.jsx(eE, {}), onSelect: Wr }
  ];
  return /* @__PURE__ */ m.jsx(ol, { children: /* @__PURE__ */ m.jsx(sl, { mode: "secondary", children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-paper-screen aiwa-food-screen", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-screen-titlebar", children: [
      /* @__PURE__ */ m.jsx(rt, { className: "aiwa-screen-title", variant: "title1", weight: "semibold", children: "Питание" }),
      f ? /* @__PURE__ */ m.jsx(
        "button",
        {
          type: "button",
          className: "aiwa-avatar-initial aiwa-screen-profile",
          "aria-label": "Открыть профиль",
          onClick: () => y(!0),
          children: /* @__PURE__ */ m.jsx(Qh, {})
        }
      ) : null
    ] }),
    /* @__PURE__ */ m.jsx(tA, { kcal: Mt, kcalTarget: Rt }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-macro-grid", children: [
      /* @__PURE__ */ m.jsx(Ff, { label: "Жиры", value: Pt("fat"), target: lt.fat, macro: "fat" }),
      /* @__PURE__ */ m.jsx(Ff, { label: "Белки", value: Pt("protein"), target: lt.protein, macro: "protein" }),
      /* @__PURE__ */ m.jsx(Ff, { label: "Углеводы", value: Pt("carbs"), target: lt.carbs, macro: "carbs" })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-screen-cta", children: [
      /* @__PURE__ */ m.jsx(
        yx,
        {
          items: Ir,
          trigger: /* @__PURE__ */ m.jsx(
            It,
            {
              variant: "filled",
              "aria-label": "Добавить приём",
              label: /* @__PURE__ */ m.jsxs("span", { className: "aiwa-btn-icon-label", children: [
                /* @__PURE__ */ m.jsx(Kr, {}),
                " Добавить приём"
              ] })
            }
          )
        }
      ),
      /* @__PURE__ */ m.jsx(
        "input",
        {
          ref: tt,
          type: "file",
          accept: "image/*",
          hidden: !0,
          onChange: (ot) => {
            cl(ot.target.files?.[0]), ot.target.value = "";
          }
        }
      )
    ] }),
    /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-tma-blocks", children: [
      /* @__PURE__ */ m.jsx(
        Cs,
        {
          message: _.text || "Выбираем простую еду с белком в каждом приёме.",
          onDiscuss: () => nl({ topic: "food" })
        }
      ),
      Z ? /* @__PURE__ */ m.jsx(yt.Item, { header: "Меню на сегодня", children: /* @__PURE__ */ m.jsx(Zt, { loading: !0, title: "Айва собирает меню…", description: "Завтрак, обед и ужин под фазу" }) }) : null,
      vt.length ? /* @__PURE__ */ m.jsx(yt.Item, { header: "Меню на сегодня", children: vt.map((ot) => /* @__PURE__ */ m.jsx(
        Zt,
        {
          image: ot.meal.image_url || ot.meal.image || ov(p, ot.meal.dish) || Sx,
          title: ot.meal.dish || "Рекомендация Айвы",
          description: [ot.label, ot.meal.kcal, ot.meal.note].filter(Boolean).join(" · "),
          onClick: () => E(ot)
        },
        ot.value
      )) }) : null,
      /* @__PURE__ */ m.jsxs(yt.Item, { header: Qn, children: [
        /* @__PURE__ */ m.jsx("div", { className: "aiwa-food-history-week", children: /* @__PURE__ */ m.jsx(Ph, { days: Kt, selectedIso: v || pe, onSelect: Jr }) }),
        nt ? /* @__PURE__ */ m.jsx(Zt, { loading: !0, title: "Разбираю фото…", description: "Айва считает КБЖУ" }) : null,
        Ae && !T ? /* @__PURE__ */ m.jsx(Zt, { loading: !0, title: "Загружаю…", description: "Дневник за выбранный день" }) : null,
        Qe.length ? Qe.map((ot) => /* @__PURE__ */ m.jsx(
          Zt,
          {
            image: ot.image_url || ov(p, ot.title) || oA(ot),
            title: ot.title,
            description: `${zd(ot.kcal)} · Б${Math.round(ot.protein || 0)} · Ж${Math.round(ot.fat || 0)} · У${Math.round(ot.carbs || 0)}`,
            onClick: () => H("diary")
          },
          ot.id
        )) : nt || Ae && !T ? null : /* @__PURE__ */ m.jsx(
          Zt,
          {
            title: Ae ? "В этот день записей нет" : "Дневник пока пуст",
            description: Ae ? "Дневник за этот день пуст." : "Добавь первый приём — фото, текстом или вручную.",
            onClick: Ae ? void 0 : () => H("diary")
          }
        ),
        D ? /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
          /* @__PURE__ */ m.jsx(Cs, { message: D.summary }),
          D.gaps?.length ? /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
            /* @__PURE__ */ m.jsx(Zt, { title: "Чего не хватает", description: "" }),
            D.gaps.map((ot) => /* @__PURE__ */ m.jsx(Zt, { title: ot }, ot))
          ] }) : null,
          D.tips?.length ? /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
            /* @__PURE__ */ m.jsx(Zt, { title: "Советы на неделю", description: "" }),
            D.tips.map((ot, Vt) => /* @__PURE__ */ m.jsx(Zt, { title: `${Vt + 1}. ${ot}` }, ot))
          ] }) : null
        ] }) : null,
        /* @__PURE__ */ m.jsx("div", { className: "aiwa-cell-actions aiwa-week-review-cta", children: /* @__PURE__ */ m.jsx(
          It,
          {
            variant: "filled",
            label: V ? "Разбираю неделю…" : "Разобрать питание за неделю",
            isFill: !0,
            disabled: V,
            ...se("Разобрать питание за неделю", Ma)
          }
        ) })
      ] })
    ] }),
    f ? /* @__PURE__ */ m.jsx(Fh, { isOpen: h, onClose: () => y(!1) }) : null,
    /* @__PURE__ */ m.jsx(
      eA,
      {
        isOpen: A === "add",
        onClose: () => H(""),
        onSaved: J,
        editingMeal: G
      }
    ),
    /* @__PURE__ */ m.jsx(
      aA,
      {
        isOpen: !!S,
        meal: S?.meal,
        slotLabel: S?.label,
        busy: M,
        onClose: () => E(null),
        onAdd: () => S && Rs(S.meal, S.value)
      }
    ),
    /* @__PURE__ */ m.jsx(
      nA,
      {
        isOpen: A === "diary",
        onClose: () => H(""),
        diary: Ae ? T || { meals: [], totals: {}, target: lt } : U,
        canAdd: !Ae,
        onAdd: ul,
        onEdit: (ot) => {
          K(ot), H("add");
        },
        onDelete: rl,
        onReco: async () => {
          const ot = await Lt("/api/diary_reco", {}).catch(() => null);
          Ot(ot?.text || "Не удалось собрать совет");
        }
      }
    )
  ] }) }) });
}
function uA({ isOpen: a, onClose: e, onSaved: l, suggested: s, favoriteTypes: r }) {
  const c = [
    ...Jg.filter((J) => J !== "Своё"),
    ...(r || []).filter((J) => !Jg.includes(J)),
    "Своё"
  ], f = Fr(), [h, y] = j.useState(f), [p, g] = j.useState("Силовая"), [v, b] = j.useState("45 мин"), [T, w] = j.useState("Нормально"), [S, E] = j.useState([]), [M, R] = j.useState({}), [D, N] = j.useState(""), [V, z] = j.useState(""), [A, H] = j.useState(!1), [G, K] = j.useState(""), [nt, at] = j.useState(null);
  j.useEffect(() => {
    if (!a) return;
    ax("workout");
    const J = s?.name || "", _ = (s?.exercises || []).filter((lt) => lt?.name), U = /ход|прогул/i.test(J) ? "Ходьба" : /пилатес/i.test(J) ? "Пилатес" : /йог|мобил|релиз|растяж/i.test(J) ? "Йога" : /кардио|бег|вело/i.test(J) ? "Кардио" : /плав/i.test(J) ? "Плавание" : "Силовая";
    g(U), _.length ? (E(_.map((lt) => lt.name)), R(Object.fromEntries(_.map((lt) => [lt.name, { sets: lt.sets || "", reps: lt.reps || "" }])))) : (E(J ? [J] : []), R({})), N(""), z("");
    const I = (s?.exercises || []).find((lt) => lt?.name)?.name;
    K(I && Object.keys(Qa).find((lt) => Qa[lt].includes(I)) || ""), at(null), y(f);
  }, [a, s, f]);
  const tt = (J) => E((_) => _.includes(J) ? _.filter((U) => U !== J) : [..._, J]), Z = p === "Силовая", it = (J) => Object.keys(Qa).find((_) => Qa[_].includes(J)) || null, L = (J, _, U) => R((I) => ({ ...I, [J]: { ...I[J], [_]: U } })), $ = (J, _) => {
    const U = String(M[J]?.[_] ?? "").replace(",", ".").trim(), I = Number(U);
    return U && Number.isFinite(I) && I > 0 ? I : null;
  }, et = async () => {
    const J = [...S, ...D.trim() ? [D.trim()] : []];
    H(!0);
    try {
      const _ = await Lt("/api/workout", {
        date: h,
        type: p === "Своё" ? V.trim() || "Своё" : p,
        duration: v,
        rpe: T,
        items: J.map((U) => ({
          name: U,
          weight: Z ? $(U, "w") : null,
          sets: Z ? $(U, "sets") : null,
          reps: Z ? $(U, "reps") : null,
          group: Z ? it(U) : null
        }))
      });
      if (!_?.ok) throw new Error(_?.text || "Не получилось сохранить тренировку");
      await l(), at({ text: _.review || "", calories: _.calories || 0 });
    } catch (_) {
      Ot(_.message || "Не получилось сохранить", { type: "error" });
    } finally {
      H(!1);
    }
  }, st = (J) => /* @__PURE__ */ m.jsxs("div", { children: [
    /* @__PURE__ */ m.jsxs(
      je,
      {
        as: "button",
        type: "button",
        mode: "opacity",
        className: "aiwa-exercise-row",
        "aria-pressed": S.includes(J),
        onClick: () => tt(J),
        children: [
          /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "regular", children: J }),
          /* @__PURE__ */ m.jsx("span", { className: S.includes(J) ? "aiwa-check is-active" : "aiwa-check", children: S.includes(J) ? "✓" : "+" })
        ]
      }
    ),
    Z && S.includes(J) ? /* @__PURE__ */ m.jsxs("div", { className: "aiwa-exercise-nums", children: [
      /* @__PURE__ */ m.jsx(
        "input",
        {
          inputMode: "decimal",
          placeholder: "кг",
          "aria-label": `${J}: вес`,
          value: M[J]?.w ?? "",
          onChange: (_) => L(J, "w", _.target.value)
        }
      ),
      /* @__PURE__ */ m.jsx(
        "input",
        {
          inputMode: "numeric",
          placeholder: "подходы",
          "aria-label": `${J}: подходы`,
          value: M[J]?.sets ?? "",
          onChange: (_) => L(J, "sets", _.target.value)
        }
      ),
      /* @__PURE__ */ m.jsx(
        "input",
        {
          inputMode: "numeric",
          placeholder: "повторы",
          "aria-label": `${J}: повторы`,
          value: M[J]?.reps ?? "",
          onChange: (_) => L(J, "reps", _.target.value)
        }
      )
    ] }) : null
  ] }, J);
  return nt ? /* @__PURE__ */ m.jsx(bn, { isOpen: a, onClose: e, children: /* @__PURE__ */ m.jsx("div", { children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-sheet-card aiwa-workout-review", children: [
      /* @__PURE__ */ m.jsx(rt, { variant: "title2", weight: "semibold", children: "Тренировка сохранена" }),
      /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "regular", children: `Сожжено примерно ${nt.calories} ккал.` }),
      nt.text ? /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "regular", children: nt.text }) : null
    ] }),
    /* @__PURE__ */ m.jsx(It, { variant: "filled", label: "Понятно", isFill: !0, ...se("Закрыть разбор", e) })
  ] }) }) }) : /* @__PURE__ */ m.jsx(bn, { isOpen: a, onClose: e, children: /* @__PURE__ */ m.jsx("div", { children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ m.jsx(ae, { label: "Когда", type: "date", value: h, onChange: y }),
    /* @__PURE__ */ m.jsx(Wi, { label: "Что делала", options: c, value: p, onChange: (J) => {
      g(J), E([]);
    } }),
    p === "Своё" ? /* @__PURE__ */ m.jsx(ae, { label: "Название тренировки", value: V, onChange: z, placeholder: "Напр. Сквош" }) : null,
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-form-group", children: [
      /* @__PURE__ */ m.jsx(rt, { className: "aiwa-form-label", variant: "body", weight: "semibold", children: "Упражнения" }),
      /* @__PURE__ */ m.jsxs("div", { className: "aiwa-sheet-card", children: [
        Z ? Object.keys(Qa).map((J) => {
          const _ = Qa[J].filter((I) => S.includes(I)).length, U = G === J;
          return /* @__PURE__ */ m.jsxs("div", { children: [
            /* @__PURE__ */ m.jsxs(
              je,
              {
                as: "button",
                type: "button",
                mode: "opacity",
                className: "aiwa-exercise-row aiwa-exercise-group",
                "aria-expanded": U,
                onClick: () => K(U ? "" : J),
                children: [
                  /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "semibold", children: J }),
                  /* @__PURE__ */ m.jsx(rt, { variant: "caption1", weight: "regular", children: _ ? `выбрано ${_}` : U ? "—" : "+" })
                ]
              }
            ),
            U ? Qa[J].map(st) : null
          ] }, J);
        }) : (hE[p] || []).map(st),
        /* @__PURE__ */ m.jsx(ae, { label: "Добавить своё", value: D, onChange: N, placeholder: "Название упражнения" })
      ] })
    ] }),
    /* @__PURE__ */ m.jsx(Wi, { label: "Длительность", options: ["30 мин", "45 мин", "60+ мин"], value: v, onChange: b }),
    /* @__PURE__ */ m.jsx(Wi, { label: "Как ощущалось", options: ["Легко", "Нормально", "Тяжело"], value: T, onChange: w }),
    /* @__PURE__ */ m.jsx(
      It,
      {
        variant: "filled",
        label: A ? "Сохраняю…" : "Сохранить и разобрать",
        isFill: !0,
        disabled: A,
        ...se("Сохранить и разобрать", et)
      }
    )
  ] }) }) });
}
function cA({ isOpen: a, onClose: e, options: l, onSelect: s }) {
  return /* @__PURE__ */ m.jsx(bn, { isOpen: a, onClose: e, children: /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-tma-blocks", children: [
    /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(ht, { tappable: !1, children: /* @__PURE__ */ m.jsx(
      ht.Text,
      {
        title: "Рекомендация на сегодня",
        description: "Выбери вариант, после которого останется запас сил."
      }
    ) }) }),
    /* @__PURE__ */ m.jsx(yt.Item, { children: l.map((r, c) => /* @__PURE__ */ m.jsx(
      Zt,
      {
        title: r.name || `Вариант ${c + 1}`,
        description: r.how || r.benefit || r.detail,
        onClick: () => s(r)
      },
      r.name || c
    )) })
  ] }) });
}
function fA({ isOpen: a, onClose: e, state: l, onAdd: s }) {
  const r = l?.today || [];
  return /* @__PURE__ */ m.jsx(bn, { isOpen: a, onClose: e, children: /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-tma-blocks", children: [
    l?.last_review ? /* @__PURE__ */ m.jsx(
      Cs,
      {
        message: l.last_review.text || l.last_review,
        onDiscuss: () => nl({ topic: "train" })
      }
    ) : null,
    /* @__PURE__ */ m.jsx(yt.Item, { header: "Неделя", children: (l?.week || []).map((c) => /* @__PURE__ */ m.jsx(
      Zt,
      {
        title: c.dow,
        description: c.count ? `${c.type || "Тренировка"} · ${c.count}` : "Без тренировки",
        muted: !c.count
      },
      c.d
    )) }),
    r.length ? /* @__PURE__ */ m.jsx(yt.Item, { header: "Сегодня", children: r.map((c) => /* @__PURE__ */ m.jsx(
      Zt,
      {
        title: c.type || "Тренировка",
        description: `${c.duration || "—"} · ${String(c.rpe || "").toLowerCase()}`
      },
      c.id
    )) }) : null,
    /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(ht, { tappable: !1, children: /* @__PURE__ */ m.jsx("div", { className: "aiwa-cell-actions", children: /* @__PURE__ */ m.jsx(
      It,
      {
        variant: "filled",
        label: "Отметить тренировку",
        isFill: !0,
        ...se("Отметить тренировку", s)
      }
    ) }) }) })
  ] }) });
}
function dA({ isOpen: a, onClose: e, profile: l, onSaved: s }) {
  const [r, c] = j.useState(l || {});
  j.useEffect(() => {
    a && c(l || {});
  }, [a, l]);
  const f = (y, p) => c((g) => ({ ...g, [y]: p })), h = async () => {
    (await Lt("/api/train_profile", r).catch(() => null))?.ok ? (Ot("Тренировочный профиль сохранён", { type: "success" }), await s(), e()) : Ot("Не получилось сохранить", { type: "error" });
  };
  return /* @__PURE__ */ m.jsx(bn, { isOpen: a, onClose: e, children: /* @__PURE__ */ m.jsx("div", { children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-sheet-scroll aiwa-form-stack", children: [
    /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "regular", children: "Расскажи, чем занимаешься и что важно беречь. Айва учтёт это в рекомендациях и разборе нагрузки." }),
    /* @__PURE__ */ m.jsx(ae, { label: "Формат", value: r.format || "", onChange: (y) => f("format", y), placeholder: "Зал и прогулки" }),
    /* @__PURE__ */ m.jsx(ae, { label: "Цель", value: r.goal || "", onChange: (y) => f("goal", y), placeholder: "Тонус и больше энергии" }),
    /* @__PURE__ */ m.jsx(ae, { label: "Ограничения", value: r.limits || "", onChange: (y) => f("limits", y), placeholder: "Например, бережём поясницу" }),
    /* @__PURE__ */ m.jsx(It, { variant: "filled", label: "Сохранить", isFill: !0, ...se("Сохранить профиль", h) })
  ] }) }) });
}
const hA = ["trainingSection", "train"], mA = (a) => {
  const e = a % 100, l = a % 10;
  return e >= 11 && e <= 14 ? "тренировок" : l === 1 ? "тренировка" : l >= 2 && l <= 4 ? "тренировки" : "тренировок";
}, pA = (a) => {
  const e = new Set((a || []).filter((l) => l.count).map((l) => l.d));
  return xx(30).map((l) => ({ ...l, workout: e.has(l.iso) }));
}, yA = [
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
  ["пилатес", "Пилатес"],
  ["плава", "Плавание"],
  ["бассейн", "Плавание"],
  ["отдых", "Отдых"],
  ["восстанов", "Отдых"]
], uv = (a, ...e) => {
  if (!a) return null;
  for (const s of e) {
    const r = a[String(s || "").trim()];
    if (r) return r + "?v=1";
  }
  const l = e.filter(Boolean).join(" ").toLowerCase();
  for (const [s, r] of Object.entries(a))
    if (l.includes(s.toLowerCase())) return r + "?v=1";
  for (const [s, r] of yA)
    if (l.includes(s) && a[r]) return a[r] + "?v=1";
  return a.Силовая && /трениров/.test(l) ? a.Силовая + "?v=1" : null;
};
function gA({ mode: a, revision: e = 0 }) {
  const [l, s] = bx(hA, [a, e]), c = (typeof window.aiwaData == "function" ? window.aiwaData() : window.aiwaData)?.mode === "male", [f, h] = j.useState(!1), [y, p] = j.useState(""), [g, v] = j.useState(null), [b, T] = j.useState({}), [w, S] = j.useState(""), [E, M] = j.useState(null);
  j.useEffect(() => {
    fetch("/assets/train/manifest.json?v=2").then(($) => $.ok ? $.json() : {}).then(($) => T($ || {})).catch(() => {
    });
  }, []);
  const R = () => s("train");
  if (!l.trainingSection || !l.train) return /* @__PURE__ */ m.jsx(gx, { title: "Нагрузка", variant: "activity" });
  const D = l.trainingSection, N = l.train, V = D.training || {}, z = (V.options || []).slice(0, 4), A = N.today || [], H = N.week || [], G = H.filter(($) => $.count).slice(-3).reverse(), K = H.reduce(($, et) => $ + (et.count || 0), 0), nt = ($ = null) => {
    v($), p("workout");
  }, at = Fr(), tt = !!(w && w !== at), Z = async ($) => {
    const et = typeof $ == "string" ? $ : $?.iso || "";
    if (S(et), !et || et === at) {
      M(null);
      return;
    }
    M(null);
    const st = await Lt("/api/train_day", { d: et }).catch(() => null);
    M(st?.workouts || []);
  }, it = (() => {
    if (!tt) return "Прошедшие тренировки";
    const $ = /* @__PURE__ */ new Date(`${w}T12:00:00`);
    return Number.isNaN($.getTime()) ? "Тренировки за день" : `Тренировки за ${new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }).format($)}`;
  })(), L = tt ? E || [] : A.slice().reverse();
  return /* @__PURE__ */ m.jsx(ol, { children: /* @__PURE__ */ m.jsx(sl, { mode: "secondary", children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-paper-screen aiwa-activity-screen", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-screen-titlebar", children: [
      /* @__PURE__ */ m.jsx(rt, { className: "aiwa-screen-title", variant: "title1", weight: "semibold", children: "Нагрузка" }),
      c ? /* @__PURE__ */ m.jsx(
        "button",
        {
          type: "button",
          className: "aiwa-avatar-initial aiwa-screen-profile",
          "aria-label": "Открыть профиль",
          onClick: () => h(!0),
          children: /* @__PURE__ */ m.jsx(Qh, {})
        }
      ) : null
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-overview", children: [
      /* @__PURE__ */ m.jsx(Ph, { days: pA(H), selectedIso: w || at, onSelect: Z }),
      /* @__PURE__ */ m.jsxs("div", { className: "aiwa-countdown", children: [
        /* @__PURE__ */ m.jsx(rt, { variant: "title1", weight: "semibold", children: K }),
        /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "regular", children: `${mA(K)} на этой неделе` })
      ] }),
      /* @__PURE__ */ m.jsx(
        It,
        {
          variant: "filled",
          label: /* @__PURE__ */ m.jsxs("span", { className: "aiwa-btn-icon-label", children: [
            /* @__PURE__ */ m.jsx(Kr, {}),
            " Отметить тренировку"
          ] }),
          ...se("Отметить тренировку", () => nt())
        }
      )
    ] }),
    /* @__PURE__ */ m.jsxs(yt, { className: "aiwa-tma-blocks", children: [
      /* @__PURE__ */ m.jsx(
        Cs,
        {
          message: V.summary || D.text || "Выбирай нагрузку, после которой станет легче, а не хуже.",
          detail: V.why,
          onDiscuss: () => nl({ topic: "train" })
        }
      ),
      z.length ? /* @__PURE__ */ m.jsx(yt.Item, { header: "Варианты", children: z.map(($, et) => /* @__PURE__ */ m.jsx(
        Zt,
        {
          image: uv(b, $.name),
          title: [$.name || `Вариант ${et + 1}`, $.duration].filter(Boolean).join(" · "),
          description: [
            ($.exercises || []).map((st) => [st.name, st.sets && st.reps ? `${st.sets}×${st.reps}` : ""].filter(Boolean).join(" ")).join(", "),
            $.tip || $.benefit || $.how || $.detail
          ].filter(Boolean).join(" — "),
          onClick: () => nt($)
        },
        $.name || et
      )) }) : null,
      /* @__PURE__ */ m.jsxs(yt.Item, { header: it, children: [
        tt && !E ? /* @__PURE__ */ m.jsx(Zt, { loading: !0, title: "Загружаю…", description: "Тренировки за выбранный день" }) : null,
        L.length ? L.map(($) => /* @__PURE__ */ m.jsx(
          Zt,
          {
            image: uv(b, $.type),
            title: $.type || "Тренировка",
            description: [
              tt ? "" : "сегодня",
              $.duration,
              $.kcal ? `${Math.round($.kcal)} ккал` : "",
              String($.rpe || "").toLowerCase()
            ].filter(Boolean).join(" · "),
            onClick: () => p("history")
          },
          $.id
        )) : tt && !E ? null : tt ? /* @__PURE__ */ m.jsx(Zt, { title: "В этот день тренировок нет", description: "Выбери другой день или отметь тренировку." }) : G.length ? G.map(($) => /* @__PURE__ */ m.jsx(
          Zt,
          {
            title: $.type || "Тренировка",
            description: `${$.d} · ${$.count} запись`,
            onClick: () => p("history")
          },
          $.d
        )) : /* @__PURE__ */ m.jsx(
          Zt,
          {
            title: "История пока пуста",
            description: "Отметь первую тренировку — Айва подготовит разбор.",
            onClick: () => p("history")
          }
        )
      ] }),
      /* @__PURE__ */ m.jsx(yt.Item, { children: /* @__PURE__ */ m.jsx(
        ht,
        {
          as: "button",
          type: "button",
          onClick: () => p("profile"),
          end: /* @__PURE__ */ m.jsx(ht.Part, { type: "Chevron" }),
          children: /* @__PURE__ */ m.jsx(ht.Text, { title: "Настроить тренировочный профиль", bold: !0 })
        }
      ) })
    ] }),
    c ? /* @__PURE__ */ m.jsx(Fh, { isOpen: f, onClose: () => h(!1) }) : null,
    /* @__PURE__ */ m.jsx(uA, { isOpen: y === "workout", onClose: () => p(""), onSaved: R, suggested: g, favoriteTypes: N.favorite_types || [] }),
    /* @__PURE__ */ m.jsx(
      cA,
      {
        isOpen: y === "variants",
        onClose: () => p(""),
        options: z,
        onSelect: ($) => nt($)
      }
    ),
    /* @__PURE__ */ m.jsx(fA, { isOpen: y === "history", onClose: () => p(""), state: N, onAdd: () => nt() }),
    /* @__PURE__ */ m.jsx(dA, { isOpen: y === "profile", onClose: () => p(""), profile: N.profile, onSaved: R })
  ] }) }) });
}
function vA({ initialMessages: a = [] }) {
  const [e, l] = j.useState(() => a.map((S, E) => ({
    id: `initial-${E}`,
    role: S.role === "user" ? "user" : "assistant",
    text: S.text || "",
    suggestions: []
  }))), [s, r] = j.useState(""), [c, f] = j.useState(!1), [h, y] = j.useState(!1), p = nd.useRef(null), g = (typeof window.aiwaData == "function" ? window.aiwaData() : window.aiwaData)?.mode === "male", v = nd.useRef(null);
  j.useEffect(() => {
    e.length || l([{
      id: "hello",
      role: "assistant",
      text: g ? "Привет! Спроси меня о питании, тренировках или самочувствии. Я отвечу с учётом твоих данных." : "Привет! Спроси меня о цикле, питании, тренировках или самочувствии. Я отвечу с учётом твоих данных.",
      suggestions: ["Можно ли тренироваться?", "Что съесть сегодня?", "Как моё самочувствие?"]
    }]);
  }, []), j.useEffect(() => {
    v.current?.scrollIntoView({ block: "end" });
  }, [e, c]);
  const b = async (S = s) => {
    const E = String(S || "").trim();
    if (!E || c) return;
    r(""), l((R) => [...R, { id: `user-${Date.now()}`, role: "user", text: E, suggestions: [] }]), f(!0);
    const M = await Lt("/api/chat", { message: E }).catch(() => null);
    l((R) => [...R, {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      text: M?.answer || "Не получилось ответить, попробуй ещё раз.",
      suggestions: M?.suggestions || []
    }]), f(!1);
  }, T = async (S, E) => {
    f(!0);
    const M = new FormData();
    M.append("initData", window.aiwaInit || ""), M.append("audio", S, E?.includes("mp4") ? "voice.mp4" : "voice.webm");
    try {
      const D = await (await fetch("/api/voice", { method: "POST", body: M })).json();
      D.transcript && l((N) => [...N, { id: `voice-${Date.now()}`, role: "user", text: D.transcript, suggestions: [] }]), l((N) => [...N, {
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
  }, w = async () => {
    if (h) {
      p.current?.stop();
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      Ot("Голос недоступен в этом клиенте", { type: "error" });
      return;
    }
    try {
      const S = await navigator.mediaDevices.getUserMedia({ audio: !0 }), E = [], M = new MediaRecorder(S);
      p.current = M, M.ondataavailable = (R) => {
        R.data?.size && E.push(R.data);
      }, M.onstop = () => {
        y(!1), S.getTracks().forEach((D) => D.stop());
        const R = new Blob(E, { type: M.mimeType || "audio/webm" });
        R.size > 900 && T(R, M.mimeType);
      }, M.start(), y(!0);
    } catch {
      Ot("Нет доступа к микрофону", { type: "error" });
    }
  };
  return /* @__PURE__ */ m.jsx(ol, { children: /* @__PURE__ */ m.jsx(sl, { mode: "secondary", children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-chat-screen", children: [
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-chat-header", children: [
      /* @__PURE__ */ m.jsx(Zh, { size: 50, frames: Kh, pauseMs: 0 }),
      /* @__PURE__ */ m.jsxs("div", { children: [
        /* @__PURE__ */ m.jsx(rt, { variant: "title3", weight: "semibold", children: "Айва" }),
        /* @__PURE__ */ m.jsx(rt, { variant: "caption1", weight: "regular", children: "учитывает твои данные" })
      ] }),
      /* @__PURE__ */ m.jsx(je, { as: "button", type: "button", mode: "opacity", className: "aiwa-sheet-close", "aria-label": "Закрыть чат", onClick: () => vn("go", "today"), children: /* @__PURE__ */ m.jsx(tx, {}) })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-chat-messages", children: [
      e.map((S) => /* @__PURE__ */ m.jsxs("div", { className: S.role === "user" ? "aiwa-chat-bubble is-user" : "aiwa-chat-bubble is-ai", children: [
        /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "regular", children: S.text }),
        S.suggestions?.length ? /* @__PURE__ */ m.jsx("div", { className: "aiwa-chat-suggestions", children: S.suggestions.slice(0, 3).map((E) => /* @__PURE__ */ m.jsx(je, { as: "button", type: "button", mode: "opacity", onClick: () => b(E), children: /* @__PURE__ */ m.jsx(rt, { variant: "caption1", weight: "semibold", children: E }) }, E)) }) : null
      ] }, S.id)),
      c ? /* @__PURE__ */ m.jsx("div", { className: "aiwa-chat-bubble is-ai", children: /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "regular", children: "Айва думает…" }) }) : null,
      /* @__PURE__ */ m.jsx("span", { ref: v })
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "aiwa-chat-composer", children: [
      /* @__PURE__ */ m.jsx(
        "input",
        {
          value: s,
          placeholder: "Спроси Айву…",
          onChange: (S) => r(S.target.value),
          onKeyDown: (S) => {
            S.key === "Enter" && b();
          }
        }
      ),
      /* @__PURE__ */ m.jsx(je, { as: "button", type: "button", mode: "opacity", className: h ? "aiwa-chat-icon is-recording" : "aiwa-chat-icon", "aria-label": "Голос", onClick: w, children: /* @__PURE__ */ m.jsx(rt, { variant: "body", weight: "semibold", children: h ? "■" : "Голос" }) }),
      /* @__PURE__ */ m.jsx(je, { as: "button", type: "button", mode: "opacity", className: "aiwa-chat-send", "aria-label": "Отправить", onClick: () => b(), children: /* @__PURE__ */ m.jsx(rt, { variant: "title3", weight: "semibold", children: "↑" }) })
    ] })
  ] }) }) });
}
const bA = [
  { id: "today", label: "Главная", icon: /* @__PURE__ */ m.jsx(Qj, {}) },
  { id: "food", label: "Питание", icon: /* @__PURE__ */ m.jsx(Wj, {}) },
  { id: "train", label: "Нагрузка", icon: /* @__PURE__ */ m.jsx(Ij, {}) }
];
function xA({ active: a }) {
  const e = bA, l = a === "stats" ? "today" : a, s = Math.max(0, e.findIndex((r) => r.id === l));
  return /* @__PURE__ */ m.jsx(ol, { children: /* @__PURE__ */ m.jsxs("div", { className: "aiwa-nav-root", "data-aiwa-nav": "true", children: [
    /* @__PURE__ */ m.jsx("div", { className: "aiwa-nav-tabbar-layer", children: /* @__PURE__ */ m.jsx(
      Xj,
      {
        tabs: e.map(({ label: r, icon: c }) => ({ label: r, icon: c })),
        defaultIndex: s,
        onChange: (r) => vn("go", e[r].id)
      }
    ) }),
    /* @__PURE__ */ m.jsx(
      je,
      {
        as: "button",
        type: "button",
        mode: "opacity",
        className: "aiwa-nav-mascot",
        "aria-label": "Открыть Айву",
        onClick: () => nl(),
        children: /* @__PURE__ */ m.jsx(Zh, { size: 67 })
      }
    )
  ] }) });
}
let Wa = null, Jf = null, Ia = null, fs = "", Hd = !1, $d = 0, Wf = null, cv = null, os = null, If = null, fr = {}, dr = 0, td = null, fv = null, dv = {}, hv = 0, ed = null, mv = null;
const Fa = () => {
  !Wa || !Ia || Wa.render(
    /* @__PURE__ */ m.jsx(
      QE,
      {
        ...Ia,
        panel: fs,
        panelRevision: $d,
        profileOpen: Hd,
        onPanelClose: () => qd.closePanel(),
        onProfileClose: () => qd.closeProfile()
      }
    )
  );
}, qd = {
  renderHome(a, e) {
    a && (Jf !== a && (Wa?.unmount(), Jf = a, Wa = Yi.createRoot(a)), Ia = e, fs = e.panel || fs, Fa());
  },
  patchHome(a) {
    !Wa || !Ia || (Ia = { ...Ia, ...a }, Fa());
  },
  openPanel(a) {
    fs = a, window.HOME_PANEL = a, $d += 1, Fa();
  },
  closePanel() {
    fs = "", window.HOME_PANEL = "", Fa();
  },
  openProfile() {
    Hd = !0, Fa();
  },
  closeProfile() {
    Hd = !1, Fa();
  },
  refreshPanel() {
    $d += 1, Fa();
  },
  unmountHome() {
    Wa?.unmount(), Wa = null, Jf = null, Ia = null;
  },
  // Повторный вызов для уже смонтированного экрана = «перечитай данные»:
  // так host сбрасывает loadedFood/loadedTrain после правок профиля.
  renderFood(a, e = {}) {
    a && (If !== a ? (os?.unmount(), If = a, os = Yi.createRoot(a)) : dr += 1, fr = e, os.render(/* @__PURE__ */ m.jsx(rv, { ...fr, revision: dr })));
  },
  renderActivity(a, e = {}) {
    a && (fv !== a ? (td?.unmount(), fv = a, td = Yi.createRoot(a)) : hv += 1, dv = e, td.render(/* @__PURE__ */ m.jsx(gA, { ...dv, revision: hv })));
  },
  renderChat(a, e = {}) {
    a && (mv !== a && (ed?.unmount(), mv = a, ed = Yi.createRoot(a)), ed.render(/* @__PURE__ */ m.jsx(vA, { initialMessages: e.messages || [] })));
  },
  refreshFood() {
    !If || !os || (dr += 1, os.render(/* @__PURE__ */ m.jsx(rv, { ...fr, mode: Yt("aiwaMode") || fr.mode, revision: dr })));
  },
  /** Прогрев данных «Питания» и «Нагрузки» на старте — чтобы табы открывались сразу. */
  prefetch() {
    iA();
  },
  renderNav(a, e) {
    a && (cv !== a && (Wf?.unmount(), cv = a, Wf = Yi.createRoot(a)), Wf.render(/* @__PURE__ */ m.jsx(xA, { active: e })));
  }
};
function SA() {
  window.AiwaDeslop = qd, lE(), window.dispatchEvent(new CustomEvent("aiwa:deslop-ready"));
}
SA();
export {
  X3 as R,
  js as a,
  t4 as b,
  Gr as c,
  $3 as g,
  m as j,
  j as r
};
