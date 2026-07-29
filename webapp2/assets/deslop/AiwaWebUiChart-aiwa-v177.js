import { r as v, a as xv, b as Vy, c as Ql, g as Xy, R as Zy, j as W } from "./deslop-main-aiwa-v177.js?v=r24";
function wv(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var i = e.length;
    for (t = 0; t < i; t++) e[t] && (r = wv(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function J() {
  for (var e, t, r = 0, n = "", i = arguments.length; r < i; r++) (e = arguments[r]) && (t = wv(e)) && (n && (n += " "), n += t);
  return n;
}
var Qy = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"];
function Jl(e) {
  if (typeof e != "string")
    return !1;
  var t = Qy;
  return t.includes(e);
}
var Jy = [
  "aria-activedescendant",
  "aria-atomic",
  "aria-autocomplete",
  "aria-busy",
  "aria-checked",
  "aria-colcount",
  "aria-colindex",
  "aria-colspan",
  "aria-controls",
  "aria-current",
  "aria-describedby",
  "aria-details",
  "aria-disabled",
  "aria-errormessage",
  "aria-expanded",
  "aria-flowto",
  "aria-haspopup",
  "aria-hidden",
  "aria-invalid",
  "aria-keyshortcuts",
  "aria-label",
  "aria-labelledby",
  "aria-level",
  "aria-live",
  "aria-modal",
  "aria-multiline",
  "aria-multiselectable",
  "aria-orientation",
  "aria-owns",
  "aria-placeholder",
  "aria-posinset",
  "aria-pressed",
  "aria-readonly",
  "aria-relevant",
  "aria-required",
  "aria-roledescription",
  "aria-rowcount",
  "aria-rowindex",
  "aria-rowspan",
  "aria-selected",
  "aria-setsize",
  "aria-sort",
  "aria-valuemax",
  "aria-valuemin",
  "aria-valuenow",
  "aria-valuetext",
  "className",
  "color",
  "height",
  "id",
  "lang",
  "max",
  "media",
  "method",
  "min",
  "name",
  "style",
  /*
   * removed 'type' SVGElementPropKey because we do not currently use any SVG elements
   * that can use it, and it conflicts with the recharts prop 'type'
   * https://github.com/recharts/recharts/pull/3327
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/type
   */
  // 'type',
  "target",
  "width",
  "role",
  "tabIndex",
  "accentHeight",
  "accumulate",
  "additive",
  "alignmentBaseline",
  "allowReorder",
  "alphabetic",
  "amplitude",
  "arabicForm",
  "ascent",
  "attributeName",
  "attributeType",
  "autoReverse",
  "azimuth",
  "baseFrequency",
  "baselineShift",
  "baseProfile",
  "bbox",
  "begin",
  "bias",
  "by",
  "calcMode",
  "capHeight",
  "clip",
  "clipPath",
  "clipPathUnits",
  "clipRule",
  "colorInterpolation",
  "colorInterpolationFilters",
  "colorProfile",
  "colorRendering",
  "contentScriptType",
  "contentStyleType",
  "cursor",
  "cx",
  "cy",
  "d",
  "decelerate",
  "descent",
  "diffuseConstant",
  "direction",
  "display",
  "divisor",
  "dominantBaseline",
  "dur",
  "dx",
  "dy",
  "edgeMode",
  "elevation",
  "enableBackground",
  "end",
  "exponent",
  "externalResourcesRequired",
  "fill",
  "fillOpacity",
  "fillRule",
  "filter",
  "filterRes",
  "filterUnits",
  "floodColor",
  "floodOpacity",
  "focusable",
  "fontFamily",
  "fontSize",
  "fontSizeAdjust",
  "fontStretch",
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "format",
  "from",
  "fx",
  "fy",
  "g1",
  "g2",
  "glyphName",
  "glyphOrientationHorizontal",
  "glyphOrientationVertical",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "hanging",
  "horizAdvX",
  "horizOriginX",
  "href",
  "ideographic",
  "imageRendering",
  "in2",
  "in",
  "intercept",
  "k1",
  "k2",
  "k3",
  "k4",
  "k",
  "kernelMatrix",
  "kernelUnitLength",
  "kerning",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "letterSpacing",
  "lightingColor",
  "limitingConeAngle",
  "local",
  "markerEnd",
  "markerHeight",
  "markerMid",
  "markerStart",
  "markerUnits",
  "markerWidth",
  "mask",
  "maskContentUnits",
  "maskUnits",
  "mathematical",
  "mode",
  "numOctaves",
  "offset",
  "opacity",
  "operator",
  "order",
  "orient",
  "orientation",
  "origin",
  "overflow",
  "overlinePosition",
  "overlineThickness",
  "paintOrder",
  "panose1",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointerEvents",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "r",
  "radius",
  "refX",
  "refY",
  "renderingIntent",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "restart",
  "result",
  "rotate",
  "rx",
  "ry",
  "seed",
  "shapeRendering",
  "slope",
  "spacing",
  "specularConstant",
  "specularExponent",
  "speed",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stemh",
  "stemv",
  "stitchTiles",
  "stopColor",
  "stopOpacity",
  "strikethroughPosition",
  "strikethroughThickness",
  "string",
  "stroke",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textAnchor",
  "textDecoration",
  "textLength",
  "textRendering",
  "to",
  "transform",
  "u1",
  "u2",
  "underlinePosition",
  "underlineThickness",
  "unicode",
  "unicodeBidi",
  "unicodeRange",
  "unitsPerEm",
  "vAlphabetic",
  "values",
  "vectorEffect",
  "version",
  "vertAdvY",
  "vertOriginX",
  "vertOriginY",
  "vHanging",
  "vIdeographic",
  "viewTarget",
  "visibility",
  "vMathematical",
  "widths",
  "wordSpacing",
  "writingMode",
  "x1",
  "x2",
  "x",
  "xChannelSelector",
  "xHeight",
  "xlinkActuate",
  "xlinkArcrole",
  "xlinkHref",
  "xlinkRole",
  "xlinkShow",
  "xlinkTitle",
  "xlinkType",
  "xmlBase",
  "xmlLang",
  "xmlns",
  "xmlnsXlink",
  "xmlSpace",
  "y1",
  "y2",
  "y",
  "yChannelSelector",
  "z",
  "zoomAndPan",
  "ref",
  "key",
  "angle"
], eb = new Set(Jy);
function Pv(e) {
  return typeof e != "string" ? !1 : eb.has(e);
}
function Ov(e) {
  return typeof e == "string" && e.startsWith("data-");
}
function pt(e) {
  if (typeof e != "object" || e === null)
    return {};
  var t = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (Pv(r) || Ov(r)) && (t[r] = e[r]);
  return t;
}
function $a(e) {
  if (e == null)
    return null;
  if (/* @__PURE__ */ v.isValidElement(e) && typeof e.props == "object" && e.props !== null) {
    var t = e.props;
    return pt(t);
  }
  return typeof e == "object" && !Array.isArray(e) ? pt(e) : null;
}
function qe(e) {
  var t = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (Pv(r) || Ov(r) || Jl(r)) && (t[r] = e[r]);
  return t;
}
function tb(e) {
  return e == null ? null : /* @__PURE__ */ v.isValidElement(e) ? qe(e.props) : typeof e == "object" && !Array.isArray(e) ? qe(e) : null;
}
var rb = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function Zo() {
  return Zo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Zo.apply(null, arguments);
}
function nb(e, t) {
  if (e == null) return {};
  var r, n, i = ib(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function ib(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var eu = /* @__PURE__ */ v.forwardRef((e, t) => {
  var {
    children: r,
    width: n,
    height: i,
    viewBox: a,
    className: o,
    style: l,
    title: u,
    desc: s
  } = e, c = nb(e, rb), f = a || {
    width: n,
    height: i,
    x: 0,
    y: 0
  }, d = J("recharts-surface", o);
  return /* @__PURE__ */ v.createElement("svg", Zo({}, qe(c), {
    className: d,
    width: n,
    height: i,
    style: l,
    viewBox: "".concat(f.x, " ").concat(f.y, " ").concat(f.width, " ").concat(f.height),
    ref: t
  }), /* @__PURE__ */ v.createElement("title", null, u), /* @__PURE__ */ v.createElement("desc", null, s), r);
}), ab = ["children", "className"];
function Qo() {
  return Qo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Qo.apply(null, arguments);
}
function ob(e, t) {
  if (e == null) return {};
  var r, n, i = lb(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function lb(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var mt = /* @__PURE__ */ v.forwardRef((e, t) => {
  var {
    children: r,
    className: n
  } = e, i = ob(e, ab), a = J("recharts-layer", n);
  return /* @__PURE__ */ v.createElement("g", Qo({
    className: a
  }, qe(i), {
    ref: t
  }), r);
}), Av = /* @__PURE__ */ v.createContext(null), ub = () => v.useContext(Av);
function te(e) {
  return function() {
    return e;
  };
}
const Sv = Math.cos, Bi = Math.sin, gt = Math.sqrt, Fi = Math.PI, Ra = 2 * Fi, Jo = Math.PI, el = 2 * Jo, gr = 1e-6, sb = el - gr;
function _v(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t)
    this._ += arguments[t] + e[t];
}
function cb(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return _v;
  const r = 10 ** t;
  return function(n) {
    this._ += n[0];
    for (let i = 1, a = n.length; i < a; ++i)
      this._ += Math.round(arguments[i] * r) / r + n[i];
  };
}
class fb {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? _v : cb(t);
  }
  moveTo(t, r) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(t, r) {
    this._append`L${this._x1 = +t},${this._y1 = +r}`;
  }
  quadraticCurveTo(t, r, n, i) {
    this._append`Q${+t},${+r},${this._x1 = +n},${this._y1 = +i}`;
  }
  bezierCurveTo(t, r, n, i, a, o) {
    this._append`C${+t},${+r},${+n},${+i},${this._x1 = +a},${this._y1 = +o}`;
  }
  arcTo(t, r, n, i, a) {
    if (t = +t, r = +r, n = +n, i = +i, a = +a, a < 0) throw new Error(`negative radius: ${a}`);
    let o = this._x1, l = this._y1, u = n - t, s = i - r, c = o - t, f = l - r, d = c * c + f * f;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = r}`;
    else if (d > gr) if (!(Math.abs(f * u - s * c) > gr) || !a)
      this._append`L${this._x1 = t},${this._y1 = r}`;
    else {
      let h = n - o, p = i - l, g = u * u + s * s, m = h * h + p * p, y = Math.sqrt(g), x = Math.sqrt(d), b = a * Math.tan((Jo - Math.acos((g + d - m) / (2 * y * x))) / 2), w = b / x, O = b / y;
      Math.abs(w - 1) > gr && this._append`L${t + w * c},${r + w * f}`, this._append`A${a},${a},0,0,${+(f * h > c * p)},${this._x1 = t + O * u},${this._y1 = r + O * s}`;
    }
  }
  arc(t, r, n, i, a, o) {
    if (t = +t, r = +r, n = +n, o = !!o, n < 0) throw new Error(`negative radius: ${n}`);
    let l = n * Math.cos(i), u = n * Math.sin(i), s = t + l, c = r + u, f = 1 ^ o, d = o ? i - a : a - i;
    this._x1 === null ? this._append`M${s},${c}` : (Math.abs(this._x1 - s) > gr || Math.abs(this._y1 - c) > gr) && this._append`L${s},${c}`, n && (d < 0 && (d = d % el + el), d > sb ? this._append`A${n},${n},0,1,${f},${t - l},${r - u}A${n},${n},0,1,${f},${this._x1 = s},${this._y1 = c}` : d > gr && this._append`A${n},${n},0,${+(d >= Jo)},${f},${this._x1 = t + n * Math.cos(a)},${this._y1 = r + n * Math.sin(a)}`);
  }
  rect(t, r, n, i) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}h${n = +n}v${+i}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function tu(e) {
  let t = 3;
  return e.digits = function(r) {
    if (!arguments.length) return t;
    if (r == null)
      t = null;
    else {
      const n = Math.floor(r);
      if (!(n >= 0)) throw new RangeError(`invalid digits: ${r}`);
      t = n;
    }
    return e;
  }, () => new fb(t);
}
function ru(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function kv(e) {
  this._context = e;
}
kv.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      // falls through
      default:
        this._context.lineTo(e, t);
        break;
    }
  }
};
function La(e) {
  return new kv(e);
}
function Ev(e) {
  return e[0];
}
function Cv(e) {
  return e[1];
}
function jv(e, t) {
  var r = te(!0), n = null, i = La, a = null, o = tu(l);
  e = typeof e == "function" ? e : e === void 0 ? Ev : te(e), t = typeof t == "function" ? t : t === void 0 ? Cv : te(t);
  function l(u) {
    var s, c = (u = ru(u)).length, f, d = !1, h;
    for (n == null && (a = i(h = o())), s = 0; s <= c; ++s)
      !(s < c && r(f = u[s], s, u)) === d && ((d = !d) ? a.lineStart() : a.lineEnd()), d && a.point(+e(f, s, u), +t(f, s, u));
    if (h) return a = null, h + "" || null;
  }
  return l.x = function(u) {
    return arguments.length ? (e = typeof u == "function" ? u : te(+u), l) : e;
  }, l.y = function(u) {
    return arguments.length ? (t = typeof u == "function" ? u : te(+u), l) : t;
  }, l.defined = function(u) {
    return arguments.length ? (r = typeof u == "function" ? u : te(!!u), l) : r;
  }, l.curve = function(u) {
    return arguments.length ? (i = u, n != null && (a = i(n)), l) : i;
  }, l.context = function(u) {
    return arguments.length ? (u == null ? n = a = null : a = i(n = u), l) : n;
  }, l;
}
function mi(e, t, r) {
  var n = null, i = te(!0), a = null, o = La, l = null, u = tu(s);
  e = typeof e == "function" ? e : e === void 0 ? Ev : te(+e), t = typeof t == "function" ? t : te(t === void 0 ? 0 : +t), r = typeof r == "function" ? r : r === void 0 ? Cv : te(+r);
  function s(f) {
    var d, h, p, g = (f = ru(f)).length, m, y = !1, x, b = new Array(g), w = new Array(g);
    for (a == null && (l = o(x = u())), d = 0; d <= g; ++d) {
      if (!(d < g && i(m = f[d], d, f)) === y)
        if (y = !y)
          h = d, l.areaStart(), l.lineStart();
        else {
          for (l.lineEnd(), l.lineStart(), p = d - 1; p >= h; --p)
            l.point(b[p], w[p]);
          l.lineEnd(), l.areaEnd();
        }
      y && (b[d] = +e(m, d, f), w[d] = +t(m, d, f), l.point(n ? +n(m, d, f) : b[d], r ? +r(m, d, f) : w[d]));
    }
    if (x) return l = null, x + "" || null;
  }
  function c() {
    return jv().defined(i).curve(o).context(a);
  }
  return s.x = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : te(+f), n = null, s) : e;
  }, s.x0 = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : te(+f), s) : e;
  }, s.x1 = function(f) {
    return arguments.length ? (n = f == null ? null : typeof f == "function" ? f : te(+f), s) : n;
  }, s.y = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : te(+f), r = null, s) : t;
  }, s.y0 = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : te(+f), s) : t;
  }, s.y1 = function(f) {
    return arguments.length ? (r = f == null ? null : typeof f == "function" ? f : te(+f), s) : r;
  }, s.lineX0 = s.lineY0 = function() {
    return c().x(e).y(t);
  }, s.lineY1 = function() {
    return c().x(e).y(r);
  }, s.lineX1 = function() {
    return c().x(n).y(t);
  }, s.defined = function(f) {
    return arguments.length ? (i = typeof f == "function" ? f : te(!!f), s) : i;
  }, s.curve = function(f) {
    return arguments.length ? (o = f, a != null && (l = o(a)), s) : o;
  }, s.context = function(f) {
    return arguments.length ? (f == null ? a = l = null : l = o(a = f), s) : a;
  }, s;
}
class Iv {
  constructor(t, r) {
    this._context = t, this._x = r;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }
  point(t, r) {
    switch (t = +t, r = +r, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(t, r) : this._context.moveTo(t, r);
        break;
      }
      case 1:
        this._point = 2;
      // falls through
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + t) / 2, this._y0, this._x0, r, t, r) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + r) / 2, t, this._y0, t, r);
        break;
      }
    }
    this._x0 = t, this._y0 = r;
  }
}
function db(e) {
  return new Iv(e, !0);
}
function vb(e) {
  return new Iv(e, !1);
}
const nu = {
  draw(e, t) {
    const r = gt(t / Fi);
    e.moveTo(r, 0), e.arc(0, 0, r, 0, Ra);
  }
}, hb = {
  draw(e, t) {
    const r = gt(t / 5) / 2;
    e.moveTo(-3 * r, -r), e.lineTo(-r, -r), e.lineTo(-r, -3 * r), e.lineTo(r, -3 * r), e.lineTo(r, -r), e.lineTo(3 * r, -r), e.lineTo(3 * r, r), e.lineTo(r, r), e.lineTo(r, 3 * r), e.lineTo(-r, 3 * r), e.lineTo(-r, r), e.lineTo(-3 * r, r), e.closePath();
  }
}, Mv = gt(1 / 3), pb = Mv * 2, mb = {
  draw(e, t) {
    const r = gt(t / pb), n = r * Mv;
    e.moveTo(0, -r), e.lineTo(n, 0), e.lineTo(0, r), e.lineTo(-n, 0), e.closePath();
  }
}, gb = {
  draw(e, t) {
    const r = gt(t), n = -r / 2;
    e.rect(n, n, r, r);
  }
}, yb = 0.8908130915292852, Tv = Bi(Fi / 10) / Bi(7 * Fi / 10), bb = Bi(Ra / 10) * Tv, xb = -Sv(Ra / 10) * Tv, wb = {
  draw(e, t) {
    const r = gt(t * yb), n = bb * r, i = xb * r;
    e.moveTo(0, -r), e.lineTo(n, i);
    for (let a = 1; a < 5; ++a) {
      const o = Ra * a / 5, l = Sv(o), u = Bi(o);
      e.lineTo(u * r, -l * r), e.lineTo(l * n - u * i, u * n + l * i);
    }
    e.closePath();
  }
}, wo = gt(3), Pb = {
  draw(e, t) {
    const r = -gt(t / (wo * 3));
    e.moveTo(0, r * 2), e.lineTo(-wo * r, -r), e.lineTo(wo * r, -r), e.closePath();
  }
}, tt = -0.5, rt = gt(3) / 2, tl = 1 / gt(12), Ob = (tl / 2 + 1) * 3, Ab = {
  draw(e, t) {
    const r = gt(t / Ob), n = r / 2, i = r * tl, a = n, o = r * tl + r, l = -a, u = o;
    e.moveTo(n, i), e.lineTo(a, o), e.lineTo(l, u), e.lineTo(tt * n - rt * i, rt * n + tt * i), e.lineTo(tt * a - rt * o, rt * a + tt * o), e.lineTo(tt * l - rt * u, rt * l + tt * u), e.lineTo(tt * n + rt * i, tt * i - rt * n), e.lineTo(tt * a + rt * o, tt * o - rt * a), e.lineTo(tt * l + rt * u, tt * u - rt * l), e.closePath();
  }
};
function Sb(e, t) {
  let r = null, n = tu(i);
  e = typeof e == "function" ? e : te(e || nu), t = typeof t == "function" ? t : te(t === void 0 ? 64 : +t);
  function i() {
    let a;
    if (r || (r = a = n()), e.apply(this, arguments).draw(r, +t.apply(this, arguments)), a) return r = null, a + "" || null;
  }
  return i.type = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : te(a), i) : e;
  }, i.size = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : te(+a), i) : t;
  }, i.context = function(a) {
    return arguments.length ? (r = a ?? null, i) : r;
  }, i;
}
function Wi() {
}
function Ui(e, t, r) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + r) / 6
  );
}
function Dv(e) {
  this._context = e;
}
Dv.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        Ui(this, this._x1, this._y1);
      // falls through
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      // falls through
      default:
        Ui(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function _b(e) {
  return new Dv(e);
}
function Nv(e) {
  this._context = e;
}
Nv.prototype = {
  areaStart: Wi,
  areaEnd: Wi,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2), this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._x2 = e, this._y2 = t;
        break;
      case 1:
        this._point = 2, this._x3 = e, this._y3 = t;
        break;
      case 2:
        this._point = 3, this._x4 = e, this._y4 = t, this._context.moveTo((this._x0 + 4 * this._x1 + e) / 6, (this._y0 + 4 * this._y1 + t) / 6);
        break;
      default:
        Ui(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function kb(e) {
  return new Nv(e);
}
function $v(e) {
  this._context = e;
}
$v.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var r = (this._x0 + 4 * this._x1 + e) / 6, n = (this._y0 + 4 * this._y1 + t) / 6;
        this._line ? this._context.lineTo(r, n) : this._context.moveTo(r, n);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        Ui(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function Eb(e) {
  return new $v(e);
}
function Rv(e) {
  this._context = e;
}
Rv.prototype = {
  areaStart: Wi,
  areaEnd: Wi,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    this._point && this._context.closePath();
  },
  point: function(e, t) {
    e = +e, t = +t, this._point ? this._context.lineTo(e, t) : (this._point = 1, this._context.moveTo(e, t));
  }
};
function Cb(e) {
  return new Rv(e);
}
function Ns(e) {
  return e < 0 ? -1 : 1;
}
function $s(e, t, r) {
  var n = e._x1 - e._x0, i = t - e._x1, a = (e._y1 - e._y0) / (n || i < 0 && -0), o = (r - e._y1) / (i || n < 0 && -0), l = (a * i + o * n) / (n + i);
  return (Ns(a) + Ns(o)) * Math.min(Math.abs(a), Math.abs(o), 0.5 * Math.abs(l)) || 0;
}
function Rs(e, t) {
  var r = e._x1 - e._x0;
  return r ? (3 * (e._y1 - e._y0) / r - t) / 2 : t;
}
function Po(e, t, r) {
  var n = e._x0, i = e._y0, a = e._x1, o = e._y1, l = (a - n) / 3;
  e._context.bezierCurveTo(n + l, i + l * t, a - l, o - l * r, a, o);
}
function Ki(e) {
  this._context = e;
}
Ki.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        Po(this, this._t0, Rs(this, this._t0));
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    var r = NaN;
    if (e = +e, t = +t, !(e === this._x1 && t === this._y1)) {
      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, Po(this, Rs(this, r = $s(this, e, t)), r);
          break;
        default:
          Po(this, this._t0, r = $s(this, e, t));
          break;
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = r;
    }
  }
};
function Lv(e) {
  this._context = new zv(e);
}
(Lv.prototype = Object.create(Ki.prototype)).point = function(e, t) {
  Ki.prototype.point.call(this, t, e);
};
function zv(e) {
  this._context = e;
}
zv.prototype = {
  moveTo: function(e, t) {
    this._context.moveTo(t, e);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(e, t) {
    this._context.lineTo(t, e);
  },
  bezierCurveTo: function(e, t, r, n, i, a) {
    this._context.bezierCurveTo(t, e, n, r, a, i);
  }
};
function jb(e) {
  return new Ki(e);
}
function Ib(e) {
  return new Lv(e);
}
function Bv(e) {
  this._context = e;
}
Bv.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [], this._y = [];
  },
  lineEnd: function() {
    var e = this._x, t = this._y, r = e.length;
    if (r)
      if (this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), r === 2)
        this._context.lineTo(e[1], t[1]);
      else
        for (var n = Ls(e), i = Ls(t), a = 0, o = 1; o < r; ++a, ++o)
          this._context.bezierCurveTo(n[0][a], i[0][a], n[1][a], i[1][a], e[o], t[o]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  }
};
function Ls(e) {
  var t, r = e.length - 1, n, i = new Array(r), a = new Array(r), o = new Array(r);
  for (i[0] = 0, a[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t) i[t] = 1, a[t] = 4, o[t] = 4 * e[t] + 2 * e[t + 1];
  for (i[r - 1] = 2, a[r - 1] = 7, o[r - 1] = 8 * e[r - 1] + e[r], t = 1; t < r; ++t) n = i[t] / a[t - 1], a[t] -= n, o[t] -= n * o[t - 1];
  for (i[r - 1] = o[r - 1] / a[r - 1], t = r - 2; t >= 0; --t) i[t] = (o[t] - i[t + 1]) / a[t];
  for (a[r - 1] = (e[r] + i[r - 1]) / 2, t = 0; t < r - 1; ++t) a[t] = 2 * e[t + 1] - i[t + 1];
  return [i, a];
}
function Mb(e) {
  return new Bv(e);
}
function za(e, t) {
  this._context = e, this._t = t;
}
za.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN, this._point = 0;
  },
  lineEnd: function() {
    0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      // falls through
      default: {
        if (this._t <= 0)
          this._context.lineTo(this._x, t), this._context.lineTo(e, t);
        else {
          var r = this._x * (1 - this._t) + e * this._t;
          this._context.lineTo(r, this._y), this._context.lineTo(r, t);
        }
        break;
      }
    }
    this._x = e, this._y = t;
  }
};
function Tb(e) {
  return new za(e, 0.5);
}
function Db(e) {
  return new za(e, 0);
}
function Nb(e) {
  return new za(e, 1);
}
function Cr(e, t) {
  if ((o = e.length) > 1)
    for (var r = 1, n, i, a = e[t[0]], o, l = a.length; r < o; ++r)
      for (i = a, a = e[t[r]], n = 0; n < l; ++n)
        a[n][1] += a[n][0] = isNaN(i[n][1]) ? i[n][0] : i[n][1];
}
function rl(e) {
  for (var t = e.length, r = new Array(t); --t >= 0; ) r[t] = t;
  return r;
}
function $b(e, t) {
  return e[t];
}
function Rb(e) {
  const t = [];
  return t.key = e, t;
}
function Lb() {
  var e = te([]), t = rl, r = Cr, n = $b;
  function i(a) {
    var o = Array.from(e.apply(this, arguments), Rb), l, u = o.length, s = -1, c;
    for (const f of a)
      for (l = 0, ++s; l < u; ++l)
        (o[l][s] = [0, +n(f, o[l].key, s, a)]).data = f;
    for (l = 0, c = ru(t(o)); l < u; ++l)
      o[c[l]].index = l;
    return r(o, c), o;
  }
  return i.keys = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : te(Array.from(a)), i) : e;
  }, i.value = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : te(+a), i) : n;
  }, i.order = function(a) {
    return arguments.length ? (t = a == null ? rl : typeof a == "function" ? a : te(Array.from(a)), i) : t;
  }, i.offset = function(a) {
    return arguments.length ? (r = a ?? Cr, i) : r;
  }, i;
}
function zb(e, t) {
  if ((n = e.length) > 0) {
    for (var r, n, i = 0, a = e[0].length, o; i < a; ++i) {
      for (o = r = 0; r < n; ++r) o += e[r][i][1] || 0;
      if (o) for (r = 0; r < n; ++r) e[r][i][1] /= o;
    }
    Cr(e, t);
  }
}
function Bb(e, t) {
  if ((i = e.length) > 0) {
    for (var r = 0, n = e[t[0]], i, a = n.length; r < a; ++r) {
      for (var o = 0, l = 0; o < i; ++o) l += e[o][r][1] || 0;
      n[r][1] += n[r][0] = -l / 2;
    }
    Cr(e, t);
  }
}
function Fb(e, t) {
  if (!(!((o = e.length) > 0) || !((a = (i = e[t[0]]).length) > 0))) {
    for (var r = 0, n = 1, i, a, o; n < a; ++n) {
      for (var l = 0, u = 0, s = 0; l < o; ++l) {
        for (var c = e[t[l]], f = c[n][1] || 0, d = c[n - 1][1] || 0, h = (f - d) / 2, p = 0; p < l; ++p) {
          var g = e[t[p]], m = g[n][1] || 0, y = g[n - 1][1] || 0;
          h += m - y;
        }
        u += f, s += h * f;
      }
      i[n - 1][1] += i[n - 1][0] = r, u && (r -= s / u);
    }
    i[n - 1][1] += i[n - 1][0] = r, Cr(e, t);
  }
}
function nl(e) {
  return e === "__proto__";
}
function Fv(e) {
  switch (typeof e) {
    case "number":
    case "symbol":
      return !1;
    case "string":
      return e.includes(".") || e.includes("[") || e.includes("]");
  }
}
function iu(e) {
  return typeof e == "string" || typeof e == "symbol" ? e : Object.is(e?.valueOf?.(), -0) ? "-0" : String(e);
}
function Wv(e) {
  if (e == null) return "";
  if (typeof e == "string") return e;
  if (Array.isArray(e)) return e.map(Wv).join(",");
  const t = String(e);
  return t === "0" && Object.is(Number(e), -0) ? "-0" : t;
}
function au(e) {
  if (Array.isArray(e)) return e.map(iu);
  if (typeof e == "symbol") return [e];
  e = Wv(e);
  const t = [], r = e.length;
  if (r === 0) return t;
  let n = 0, i = "", a = "", o = !1;
  for (e.charCodeAt(0) === 46 && t.push(""); n < r; ) {
    const l = e[n];
    if (a) l === "\\" && n + 1 < r ? (n++, i += e[n]) : l === a ? a = "" : i += l;
    else if (o) l === '"' || l === "'" ? a = l : l === "]" ? (o = !1, t.push(i), i = "") : i += l;
    else if (l === "[")
      o = !0, i && (t.push(i), i = "");
    else if (l === ".") {
      i && (t.push(i), i = "");
      const u = e[n + 1];
      (u === void 0 || u === ".") && t.push("");
    } else i += l;
    n++;
  }
  return i && t.push(i), t;
}
function $r(e, t, r) {
  if (e == null) return r;
  switch (typeof t) {
    case "string": {
      if (nl(t)) return r;
      const n = e[t];
      return n === void 0 ? Fv(t) && !Object.hasOwn(e, t) ? $r(e, au(t), r) : r : n;
    }
    case "number":
    case "symbol": {
      typeof t == "number" && (t = iu(t));
      const n = e[t];
      return n === void 0 ? r : n;
    }
    default: {
      if (Array.isArray(t)) return Wb(e, t, r);
      if (Object.is(t?.valueOf(), -0) ? t = "-0" : t = String(t), nl(t)) return r;
      const n = e[t];
      return n === void 0 ? r : n;
    }
  }
}
function Wb(e, t, r) {
  if (t.length === 0) return r;
  let n = e;
  for (let i = 0; i < t.length; i++) {
    if (n == null || nl(t[i])) return r;
    n = n[t[i]];
  }
  return n === void 0 ? r : n;
}
var Ub = 4;
function ir(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ub, r = 10 ** t, n = Math.round(e * r) / r;
  return Object.is(n, -0) ? 0 : n;
}
function ke(e) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    r[n - 1] = arguments[n];
  return e.reduce((i, a, o) => {
    var l = r[o - 1];
    return typeof l == "string" ? i + l + a : l !== void 0 ? i + ir(l) + a : i + a;
  }, "");
}
var at = (e) => e === 0 ? 0 : e > 0 ? 1 : -1, Et = (e) => typeof e == "number" && e != +e, jr = (e) => typeof e == "string" && e.indexOf("%") === e.length - 1, L = (e) => (typeof e == "number" || e instanceof Number) && !Et(e), Ke = (e) => L(e) || typeof e == "string", Kb = 0, Nn = (e) => {
  var t = ++Kb;
  return "".concat(e || "").concat(t);
}, lr = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (!L(t) && typeof t != "string")
    return n;
  var a;
  if (jr(t)) {
    if (r == null)
      return n;
    var o = t.indexOf("%");
    a = r * parseFloat(t.slice(0, o)) / 100;
  } else
    a = +t;
  return Et(a) && (a = n), i && r != null && a > r && (a = r), a;
}, Uv = (e) => {
  if (!Array.isArray(e))
    return !1;
  for (var t = e.length, r = {}, n = 0; n < t; n++)
    if (!r[String(e[n])])
      r[String(e[n])] = !0;
    else
      return !0;
  return !1;
};
function Ot(e, t, r) {
  return L(e) && L(t) ? ir(e + r * (t - e)) : t;
}
function Kv(e, t, r) {
  if (!(!e || !e.length))
    return e.find((n) => n && (typeof t == "function" ? t(n) : $r(n, t)) === r);
}
var Ie = (e) => e === null || typeof e > "u", Zn = (e) => Ie(e) ? e : "".concat(e.charAt(0).toUpperCase()).concat(e.slice(1));
function He(e) {
  return e != null;
}
function Rr() {
}
var Hb = ["type", "size", "sizeType"];
function il() {
  return il = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, il.apply(null, arguments);
}
function zs(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Bs(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zs(Object(r), !0).forEach(function(n) {
      Gb(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : zs(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Gb(e, t, r) {
  return (t = qb(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function qb(e) {
  var t = Yb(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Yb(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Vb(e, t) {
  if (e == null) return {};
  var r, n, i = Xb(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function Xb(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var Hv = {
  symbolCircle: nu,
  symbolCross: hb,
  symbolDiamond: mb,
  symbolSquare: gb,
  symbolStar: wb,
  symbolTriangle: Pb,
  symbolWye: Ab
}, Zb = Math.PI / 180, Qb = (e) => {
  var t = "symbol".concat(Zn(e));
  return Hv[t] || nu;
}, Jb = (e, t, r) => {
  if (t === "area")
    return e;
  switch (r) {
    case "cross":
      return 5 * e * e / 9;
    case "diamond":
      return 0.5 * e * e / Math.sqrt(3);
    case "square":
      return e * e;
    case "star": {
      var n = 18 * Zb;
      return 1.25 * e * e * (Math.tan(n) - Math.tan(n * 2) * Math.tan(n) ** 2);
    }
    case "triangle":
      return Math.sqrt(3) * e * e / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * e * e / 8;
    default:
      return Math.PI * e * e / 4;
  }
}, e0 = (e, t) => {
  Hv["symbol".concat(Zn(e))] = t;
}, Gv = (e) => {
  var {
    type: t = "circle",
    size: r = 64,
    sizeType: n = "area"
  } = e, i = Vb(e, Hb), a = Bs(Bs({}, i), {}, {
    type: t,
    size: r,
    sizeType: n
  }), o = "circle";
  typeof t == "string" && (o = t);
  var l = () => {
    var d = Qb(o), h = Sb().type(d).size(Jb(r, n, o)), p = h();
    if (p !== null)
      return p;
  }, {
    className: u,
    cx: s,
    cy: c
  } = a, f = qe(a);
  return L(s) && L(c) && L(r) ? /* @__PURE__ */ v.createElement("path", il({}, f, {
    className: J("recharts-symbols", u),
    transform: "translate(".concat(s, ", ").concat(c, ")"),
    d: l()
  })) : null;
};
Gv.registerSymbol = e0;
var qv = (e) => "radius" in e && "startAngle" in e && "endAngle" in e, ou = (e, t) => {
  if (!e || typeof e == "function" || typeof e == "boolean")
    return null;
  var r = e;
  if (/* @__PURE__ */ v.isValidElement(e) && (r = e.props), typeof r != "object" && typeof r != "function")
    return null;
  var n = {};
  return Object.keys(r).forEach((i) => {
    Jl(i) && typeof r[i] == "function" && (n[i] = ((a) => r[i](r, a)));
  }), n;
}, t0 = (e, t, r) => (n) => (e(t, r, n), null), Yv = (e, t, r) => {
  if (e === null || typeof e != "object" && typeof e != "function")
    return null;
  var n = null;
  return Object.keys(e).forEach((i) => {
    var a = e[i];
    Jl(i) && typeof a == "function" && (n || (n = {}), n[i] = t0(a, t, r));
  }), n;
};
function Fs(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function r0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Fs(Object(r), !0).forEach(function(n) {
      n0(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Fs(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function n0(e, t, r) {
  return (t = i0(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function i0(e) {
  var t = a0(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function a0(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Be(e, t) {
  var r = r0({}, e), n = t, i = Object.keys(t), a = i.reduce((o, l) => (o[l] === void 0 && n[l] !== void 0 && (o[l] = n[l]), o), r);
  return a;
}
function Hi() {
  return Hi = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Hi.apply(null, arguments);
}
function Ws(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Vv(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ws(Object(r), !0).forEach(function(n) {
      o0(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ws(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function o0(e, t, r) {
  return (t = l0(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function l0(e) {
  var t = u0(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function u0(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var it = 32, s0 = {
  align: "center",
  iconSize: 14,
  inactiveColor: "#ccc",
  layout: "horizontal",
  verticalAlign: "middle",
  labelStyle: {}
};
function c0(e) {
  if (typeof e == "object" && e !== null && "strokeDasharray" in e)
    return String(e.strokeDasharray);
}
function f0(e) {
  var {
    data: t,
    iconType: r,
    inactiveColor: n
  } = e, i = it / 2, a = it / 6, o = it / 3, l = t.inactive ? n : t.color, u = r ?? t.type;
  if (u === "none")
    return null;
  if (u === "plainline")
    return /* @__PURE__ */ v.createElement("line", {
      strokeWidth: 4,
      fill: "none",
      stroke: l,
      strokeDasharray: c0(t.payload),
      x1: 0,
      y1: i,
      x2: it,
      y2: i,
      className: "recharts-legend-icon"
    });
  if (u === "line")
    return /* @__PURE__ */ v.createElement("path", {
      strokeWidth: 4,
      fill: "none",
      stroke: l,
      d: "M0,".concat(i, "h").concat(o, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(2 * o, ",").concat(i, `
            H`).concat(it, "M").concat(2 * o, ",").concat(i, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(o, ",").concat(i),
      className: "recharts-legend-icon"
    });
  if (u === "rect")
    return /* @__PURE__ */ v.createElement("path", {
      stroke: "none",
      fill: l,
      d: "M0,".concat(it / 8, "h").concat(it, "v").concat(it * 3 / 4, "h").concat(-it, "z"),
      className: "recharts-legend-icon"
    });
  if (/* @__PURE__ */ v.isValidElement(t.legendIcon)) {
    var s = Vv({}, t);
    return delete s.legendIcon, /* @__PURE__ */ v.cloneElement(t.legendIcon, s);
  }
  return /* @__PURE__ */ v.createElement(Gv, {
    fill: l,
    cx: i,
    cy: i,
    size: it,
    sizeType: "diameter",
    type: u
  });
}
function d0(e) {
  var {
    payload: t,
    iconSize: r,
    layout: n,
    formatter: i,
    inactiveColor: a,
    iconType: o,
    labelStyle: l
  } = e, u = {
    x: 0,
    y: 0,
    width: it,
    height: it
  }, s = {
    display: n === "horizontal" ? "inline-block" : "block",
    marginRight: 10
  }, c = {
    display: "inline-block",
    verticalAlign: "middle",
    marginRight: 4
  };
  return t.map((f, d) => {
    var h = f.formatter || i, p = J({
      "recharts-legend-item": !0,
      ["legend-item-".concat(d)]: !0,
      inactive: f.inactive
    });
    if (f.type === "none")
      return null;
    var g = typeof l == "object" ? Vv({}, l) : {};
    g.color = f.inactive ? a : g.color || f.color;
    var m = h ? h(f.value, f, d) : f.value;
    return /* @__PURE__ */ v.createElement("li", Hi({
      className: p,
      style: s,
      key: "legend-item-".concat(d)
    }, Yv(e, f, d)), /* @__PURE__ */ v.createElement(eu, {
      width: r,
      height: r,
      viewBox: u,
      style: c,
      "aria-label": "".concat(m, " legend icon")
    }, /* @__PURE__ */ v.createElement(f0, {
      data: f,
      iconType: o,
      inactiveColor: a
    })), /* @__PURE__ */ v.createElement("span", {
      className: "recharts-legend-item-text",
      style: g
    }, m));
  });
}
var v0 = (e) => {
  var t = Be(e, s0), {
    payload: r,
    layout: n,
    align: i
  } = t;
  if (!r || !r.length)
    return null;
  var a = {
    padding: 0,
    margin: 0,
    textAlign: n === "horizontal" ? i : "left"
  };
  return /* @__PURE__ */ v.createElement("ul", {
    className: "recharts-default-legend",
    style: a
  }, /* @__PURE__ */ v.createElement(d0, Hi({}, t, {
    payload: r
  })));
};
function h0(e, t) {
  const r = /* @__PURE__ */ new Map();
  for (let n = 0; n < e.length; n++) {
    const i = e[n], a = t(i, n, e);
    r.has(a) || r.set(a, i);
  }
  return Array.from(r.values());
}
function p0(e, t) {
  return function(...r) {
    return e.apply(this, r.slice(0, t));
  };
}
function Xv(e) {
  return e;
}
function m0(e) {
  return function(t) {
    return $r(t, e);
  };
}
function al(e) {
  return e == null || typeof e != "object" && typeof e != "function";
}
function g0(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function y0(e) {
  return Object.getOwnPropertySymbols(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
function lu(e) {
  return e == null ? e === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
}
const b0 = "[object RegExp]", Zv = "[object String]", Qv = "[object Number]", Jv = "[object Boolean]", eh = "[object Arguments]", x0 = "[object Symbol]", w0 = "[object Date]", P0 = "[object Map]", O0 = "[object Set]", A0 = "[object Array]", S0 = "[object ArrayBuffer]", _0 = "[object Object]", k0 = "[object DataView]", E0 = "[object Uint8Array]", C0 = "[object Uint8ClampedArray]", j0 = "[object Uint16Array]", I0 = "[object Uint32Array]", M0 = "[object Int8Array]", T0 = "[object Int16Array]", D0 = "[object Int32Array]", N0 = "[object Float32Array]", $0 = "[object Float64Array]", Us = typeof globalThis == "object" && globalThis || typeof window == "object" && window || typeof self == "object" && self || typeof global == "object" && global || /* @__PURE__ */ (function() {
  return this;
})();
function R0(e) {
  return typeof Us.Buffer < "u" && Us.Buffer.isBuffer(e);
}
function L0(e, t) {
  return xr(e, void 0, e, /* @__PURE__ */ new Map(), t);
}
function xr(e, t, r, n = /* @__PURE__ */ new Map(), i = void 0) {
  const a = i?.(e, t, r, n);
  if (a !== void 0) return a;
  if (al(e)) return e;
  if (n.has(e)) return n.get(e);
  if (Array.isArray(e)) {
    const o = new Array(e.length);
    n.set(e, o);
    for (let l = 0; l < e.length; l++) o[l] = xr(e[l], l, r, n, i);
    return Object.hasOwn(e, "index") && (o.index = e.index), Object.hasOwn(e, "input") && (o.input = e.input), o;
  }
  if (e instanceof Date) return new Date(e.getTime());
  if (e instanceof RegExp) {
    const o = new RegExp(e.source, e.flags);
    return o.lastIndex = e.lastIndex, o;
  }
  if (e instanceof Map) {
    const o = /* @__PURE__ */ new Map();
    n.set(e, o);
    for (const [l, u] of e) o.set(l, xr(u, l, r, n, i));
    return o;
  }
  if (e instanceof Set) {
    const o = /* @__PURE__ */ new Set();
    n.set(e, o);
    for (const l of e) o.add(xr(l, void 0, r, n, i));
    return o;
  }
  if (R0(e)) return e.subarray();
  if (g0(e)) {
    const o = new (Object.getPrototypeOf(e)).constructor(e.length);
    n.set(e, o);
    for (let l = 0; l < e.length; l++) o[l] = xr(e[l], l, r, n, i);
    return o;
  }
  if (e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer) return e.slice(0);
  if (e instanceof DataView) {
    const o = new DataView(e.buffer.slice(0), e.byteOffset, e.byteLength);
    return n.set(e, o), ft(o, e, r, n, i), o;
  }
  if (typeof File < "u" && e instanceof File) {
    const o = new File([e], e.name, { type: e.type });
    return n.set(e, o), ft(o, e, r, n, i), o;
  }
  if (typeof Blob < "u" && e instanceof Blob) {
    const o = new Blob([e], { type: e.type });
    return n.set(e, o), ft(o, e, r, n, i), o;
  }
  if (e instanceof Error) {
    const o = structuredClone(e);
    return n.set(e, o), o.message = e.message, o.name = e.name, o.stack = e.stack, o.cause = e.cause, o.constructor = e.constructor, ft(o, e, r, n, i), o;
  }
  if (e instanceof Boolean) {
    const o = new Boolean(e.valueOf());
    return n.set(e, o), ft(o, e, r, n, i), o;
  }
  if (e instanceof Number) {
    const o = new Number(e.valueOf());
    return n.set(e, o), ft(o, e, r, n, i), o;
  }
  if (e instanceof String) {
    const o = new String(e.valueOf());
    return n.set(e, o), ft(o, e, r, n, i), o;
  }
  if (typeof e == "object" && z0(e)) {
    const o = Object.create(Object.getPrototypeOf(e));
    return n.set(e, o), ft(o, e, r, n, i), o;
  }
  return e;
}
function ft(e, t, r = e, n, i) {
  const a = [...Object.keys(t), ...y0(t)];
  for (let o = 0; o < a.length; o++) {
    const l = a[o], u = Object.getOwnPropertyDescriptor(e, l);
    (u == null || u.writable) && (e[l] = xr(t[l], l, r, n, i));
  }
}
function z0(e) {
  switch (lu(e)) {
    case eh:
    case A0:
    case S0:
    case k0:
    case Jv:
    case w0:
    case N0:
    case $0:
    case M0:
    case T0:
    case D0:
    case P0:
    case Qv:
    case _0:
    case b0:
    case O0:
    case Zv:
    case x0:
    case E0:
    case C0:
    case j0:
    case I0:
      return !0;
    default:
      return !1;
  }
}
function B0(e) {
  return xr(e, void 0, e, /* @__PURE__ */ new Map(), void 0);
}
function Di(e, t) {
  return e === t || Number.isNaN(e) && Number.isNaN(t);
}
function th(e) {
  return e !== null && (typeof e == "object" || typeof e == "function");
}
function rh(e, t, r) {
  return typeof r != "function" ? rh(e, t, () => {
  }) : ol(e, t, function n(i, a, o, l, u, s) {
    const c = r(i, a, o, l, u, s);
    return c !== void 0 ? !!c : ol(i, a, n, s, !1);
  }, /* @__PURE__ */ new Map(), !0);
}
function ol(e, t, r, n, i = !1) {
  if (t === e) return !0;
  switch (typeof t) {
    case "object":
      return F0(e, t, r, n);
    case "function":
      return Object.keys(t).length > 0 ? ol(e, { ...t }, r, n, i) : Di(e, t);
    default:
      return th(e) && i ? typeof t == "string" ? t === "" : !0 : Di(e, t);
  }
}
function F0(e, t, r, n) {
  if (t == null) return !0;
  if (Array.isArray(t)) return nh(e, t, r, n);
  if (t instanceof Map) return W0(e, t, r, n);
  if (t instanceof Set) return U0(e, t, r, n);
  const i = Object.keys(t);
  if (e == null || al(e)) return i.length === 0;
  if (i.length === 0) return !0;
  if (n?.has(t)) return n.get(t) === e;
  n?.set(t, e);
  try {
    for (let a = 0; a < i.length; a++) {
      const o = i[a];
      if (!al(e) && !(o in e) || t[o] === void 0 && e[o] !== void 0 || t[o] === null && e[o] !== null || !r(e[o], t[o], o, e, t, n)) return !1;
    }
    return !0;
  } finally {
    n?.delete(t);
  }
}
function W0(e, t, r, n) {
  if (t.size === 0) return !0;
  if (!(e instanceof Map)) return !1;
  for (const [i, a] of t.entries()) if (r(e.get(i), a, i, e, t, n) === !1) return !1;
  return !0;
}
function nh(e, t, r, n) {
  if (t.length === 0) return !0;
  if (!Array.isArray(e)) return !1;
  const i = /* @__PURE__ */ new Set();
  for (let a = 0; a < t.length; a++) {
    const o = t[a];
    let l = !1;
    for (let u = 0; u < e.length; u++) {
      if (i.has(u)) continue;
      const s = e[u];
      let c = !1;
      if (r(s, o, a, e, t, n) && (c = !0), c) {
        i.add(u), l = !0;
        break;
      }
    }
    if (!l) return !1;
  }
  return !0;
}
function U0(e, t, r, n) {
  return t.size === 0 ? !0 : e instanceof Set ? nh([...e], [...t], r, n) : !1;
}
function ih(e, t) {
  return rh(e, t, () => {
  });
}
function K0(e) {
  return e = B0(e), (t) => ih(t, e);
}
function H0(e, t) {
  return L0(e, (r, n, i, a) => {
    if (typeof e == "object") {
      if (lu(e) === "[object Object]" && typeof e.constructor != "function") {
        const o = {};
        return a.set(e, o), ft(o, e, i, a), o;
      }
      switch (Object.prototype.toString.call(e)) {
        case Qv:
        case Zv:
        case Jv: {
          const o = new e.constructor(e?.valueOf());
          return ft(o, e), o;
        }
        case eh: {
          const o = {};
          return ft(o, e), o.length = e.length, o[Symbol.iterator] = e[Symbol.iterator], o;
        }
        default:
          return;
      }
    }
  });
}
function G0(e) {
  return H0(e);
}
const q0 = /^(?:0|[1-9]\d*)$/;
function ah(e, t = Number.MAX_SAFE_INTEGER) {
  switch (typeof e) {
    case "number":
      return Number.isInteger(e) && e >= 0 && e < t;
    case "symbol":
      return !1;
    case "string":
      return q0.test(e);
  }
}
function Y0(e) {
  return e !== null && typeof e == "object" && lu(e) === "[object Arguments]";
}
function V0(e, t) {
  let r;
  if (Array.isArray(t) ? r = t : typeof t == "string" && Fv(t) && e?.[t] == null ? r = au(t) : r = [t], r.length === 0) return !1;
  let n = e;
  for (let i = 0; i < r.length; i++) {
    const a = r[i];
    if ((n == null || !Object.hasOwn(n, a)) && !((Array.isArray(n) || Y0(n)) && ah(a) && a < n.length))
      return !1;
    n = n[a];
  }
  return !0;
}
function X0(e, t) {
  switch (typeof e) {
    case "object":
      Object.is(e?.valueOf(), -0) && (e = "-0");
      break;
    case "number":
      e = iu(e);
      break;
  }
  return t = G0(t), function(r) {
    const n = $r(r, e);
    return n === void 0 ? V0(r, e) : t === void 0 ? n === void 0 : ih(n, t);
  };
}
function Z0(e) {
  if (e == null) return Xv;
  switch (typeof e) {
    case "function":
      return e;
    case "object":
      return Array.isArray(e) && e.length === 2 ? X0(e[0], e[1]) : K0(e);
    case "string":
    case "symbol":
    case "number":
      return m0(e);
  }
}
function Q0(e) {
  return Number.isSafeInteger(e) && e >= 0;
}
function oh(e) {
  return e != null && typeof e != "function" && Q0(e.length);
}
function J0(e) {
  return typeof e == "object" && e !== null;
}
function ex(e) {
  return J0(e) && oh(e);
}
function Ks(e, t = Xv) {
  return ex(e) ? h0(Array.from(e), p0(Z0(t), 1)) : [];
}
function lh(e, t, r) {
  return t === !0 ? Ks(e, r) : typeof t == "function" ? Ks(e, t) : e;
}
var Oo = { exports: {} }, Ao = {};
var Hs;
function tx() {
  if (Hs) return Ao;
  Hs = 1;
  var e = xv(), t = Vy();
  function r(s, c) {
    return s === c && (s !== 0 || 1 / s === 1 / c) || s !== s && c !== c;
  }
  var n = typeof Object.is == "function" ? Object.is : r, i = t.useSyncExternalStore, a = e.useRef, o = e.useEffect, l = e.useMemo, u = e.useDebugValue;
  return Ao.useSyncExternalStoreWithSelector = function(s, c, f, d, h) {
    var p = a(null);
    if (p.current === null) {
      var g = { hasValue: !1, value: null };
      p.current = g;
    } else g = p.current;
    p = l(
      function() {
        function y(P) {
          if (!x) {
            if (x = !0, b = P, P = d(P), h !== void 0 && g.hasValue) {
              var _ = g.value;
              if (h(_, P))
                return w = _;
            }
            return w = P;
          }
          if (_ = w, n(b, P)) return _;
          var A = d(P);
          return h !== void 0 && h(_, A) ? (b = P, _) : (b = P, w = A);
        }
        var x = !1, b, w, O = f === void 0 ? null : f;
        return [
          function() {
            return y(c());
          },
          O === null ? void 0 : function() {
            return y(O());
          }
        ];
      },
      [c, f, d, h]
    );
    var m = i(s, p[0], p[1]);
    return o(
      function() {
        g.hasValue = !0, g.value = m;
      },
      [m]
    ), u(m), m;
  }, Ao;
}
var Gs;
function rx() {
  return Gs || (Gs = 1, Oo.exports = tx()), Oo.exports;
}
var nx = rx(), uu = /* @__PURE__ */ v.createContext(null), ix = (e) => e, ue = () => {
  var e = v.useContext(uu);
  return e ? e.store.dispatch : ix;
}, Ni = () => {
}, ax = () => Ni, ox = (e, t) => e === t;
function z(e) {
  var t = v.useContext(uu), r = v.useMemo(() => t ? (n) => {
    if (n != null)
      return e(n);
  } : Ni, [t, e]);
  return nx.useSyncExternalStoreWithSelector(t ? t.subscription.addNestedSub : ax, t ? t.store.getState : Ni, t ? t.store.getState : Ni, r, ox);
}
function lx(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function ux(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object")
    throw new TypeError(t);
}
function sx(e, t = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((r) => typeof r == "function")) {
    const r = e.map(
      (n) => typeof n == "function" ? `function ${n.name || "unnamed"}()` : typeof n
    ).join(", ");
    throw new TypeError(`${t}[${r}]`);
  }
}
var qs = (e) => Array.isArray(e) ? e : [e];
function cx(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return sx(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function fx(e, t) {
  const r = [], { length: n } = e;
  for (let i = 0; i < n; i++)
    r.push(e[i].apply(null, t));
  return r;
}
var dx = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, vx = typeof WeakRef < "u" ? WeakRef : dx, hx = 0, Ys = 1;
function gi() {
  return {
    s: hx,
    v: void 0,
    o: null,
    p: null
  };
}
function uh(e, t = {}) {
  let r = gi();
  const { resultEqualityCheck: n } = t;
  let i, a = 0;
  function o() {
    let l = r;
    const { length: u } = arguments;
    for (let f = 0, d = u; f < d; f++) {
      const h = arguments[f];
      if (typeof h == "function" || typeof h == "object" && h !== null) {
        let p = l.o;
        p === null && (l.o = p = /* @__PURE__ */ new WeakMap());
        const g = p.get(h);
        g === void 0 ? (l = gi(), p.set(h, l)) : l = g;
      } else {
        let p = l.p;
        p === null && (l.p = p = /* @__PURE__ */ new Map());
        const g = p.get(h);
        g === void 0 ? (l = gi(), p.set(h, l)) : l = g;
      }
    }
    const s = l;
    let c;
    if (l.s === Ys)
      c = l.v;
    else if (c = e.apply(null, arguments), a++, n) {
      const f = i?.deref?.() ?? i;
      f != null && n(f, c) && (c = f, a !== 0 && a--), i = typeof c == "object" && c !== null || typeof c == "function" ? new vx(c) : c;
    }
    return s.s = Ys, s.v = c, c;
  }
  return o.clearCache = () => {
    r = gi(), o.resetResultsCount();
  }, o.resultsCount = () => a, o.resetResultsCount = () => {
    a = 0;
  }, o;
}
function px(e, ...t) {
  const r = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e, n = (...i) => {
    let a = 0, o = 0, l, u = {}, s = i.pop();
    typeof s == "object" && (u = s, s = i.pop()), lx(
      s,
      `createSelector expects an output function after the inputs, but received: [${typeof s}]`
    );
    const c = {
      ...r,
      ...u
    }, {
      memoize: f,
      memoizeOptions: d = [],
      argsMemoize: h = uh,
      argsMemoizeOptions: p = []
    } = c, g = qs(d), m = qs(p), y = cx(i), x = f(function() {
      return a++, s.apply(
        null,
        arguments
      );
    }, ...g), b = h(function() {
      o++;
      const O = fx(
        y,
        arguments
      );
      return l = x.apply(null, O), l;
    }, ...m);
    return Object.assign(b, {
      resultFunc: s,
      memoizedResultFunc: x,
      dependencies: y,
      dependencyRecomputations: () => o,
      resetDependencyRecomputations: () => {
        o = 0;
      },
      lastResult: () => l,
      recomputations: () => a,
      resetRecomputations: () => {
        a = 0;
      },
      memoize: f,
      argsMemoize: h
    });
  };
  return Object.assign(n, {
    withTypes: () => n
  }), n;
}
var S = /* @__PURE__ */ px(uh), mx = Object.assign(
  (e, t = S) => {
    ux(
      e,
      `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`
    );
    const r = Object.keys(e), n = r.map(
      (a) => e[a]
    );
    return t(
      n,
      (...a) => a.reduce((o, l, u) => (o[r[u]] = l, o), {})
    );
  },
  { withTypes: () => mx }
);
function gx(e, t = 1) {
  const r = [], n = Math.floor(t), i = (a, o) => {
    for (let l = 0; l < a.length; l++) {
      const u = a[l];
      Array.isArray(u) && o < n ? i(u, o + 1) : r.push(u);
    }
  };
  return i(e, 0), r;
}
function ll(e, t, r) {
  return th(r) && (typeof t == "number" && oh(r) && ah(t) && t < r.length || typeof t == "string" && t in r) ? Di(r[t], e) : !1;
}
function Vs(e) {
  return typeof e == "symbol" ? 1 : e === null ? 2 : e === void 0 ? 3 : e !== e ? 4 : 0;
}
const yx = (e, t, r) => {
  if (e !== t) {
    const n = Vs(e), i = Vs(t);
    if (n === i && n === 0) {
      if (e < t) return r === "desc" ? 1 : -1;
      if (e > t) return r === "desc" ? -1 : 1;
    }
    return r === "desc" ? i - n : n - i;
  }
  return 0;
};
function sh(e) {
  return typeof e == "symbol" || e instanceof Symbol;
}
const bx = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, xx = /^\w*$/;
function wx(e, t) {
  return Array.isArray(e) ? !1 : typeof e == "number" || typeof e == "boolean" || e == null || sh(e) ? !0 : typeof e == "string" && (xx.test(e) || !bx.test(e)) || t != null;
}
function Px(e, t, r, n) {
  if (e == null) return [];
  r = r, Array.isArray(e) || (e = Object.values(e)), Array.isArray(t) || (t = t == null ? [null] : [t]), t.length === 0 && (t = [null]), Array.isArray(r) || (r = r == null ? [] : [r]), r = r.map((l) => String(l));
  const i = (l, u) => {
    let s = l;
    for (let c = 0; c < u.length && s != null; ++c) s = s[u[c]];
    return s;
  }, a = (l, u) => u == null || l == null ? u : typeof l == "object" && "key" in l ? Object.hasOwn(u, l.key) ? u[l.key] : i(u, l.path) : typeof l == "function" ? l(u) : Array.isArray(l) ? i(u, l) : typeof u == "object" ? u[l] : u, o = t.map((l) => (Array.isArray(l) && l.length === 1 && (l = l[0]), l == null || typeof l == "function" || Array.isArray(l) || wx(l) ? l : {
    key: l,
    path: au(l)
  }));
  return e.map((l) => ({
    original: l,
    criteria: o.map((u) => a(u, l))
  })).slice().sort((l, u) => {
    for (let s = 0; s < o.length; s++) {
      const c = yx(l.criteria[s], u.criteria[s], r[s]);
      if (c !== 0) return c;
    }
    return 0;
  }).map((l) => l.original);
}
function Ba(e, ...t) {
  const r = t.length;
  return r > 1 && ll(e, t[0], t[1]) ? t = [] : r > 2 && ll(t[0], t[1], t[2]) && (t = [t[0]]), Px(e, gx(t), ["asc"]);
}
var ch = (e) => e.legend.settings, Ox = (e) => e.legend.size, Ax = (e) => e.legend.payload, Sx = S([Ax, ch], (e, t) => {
  var {
    itemSorter: r
  } = t, n = e.flat(1);
  return r ? Ba(n, r) : n;
});
function _x() {
  return z(Sx);
}
var yi = 1;
function fh() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], [t, r] = v.useState({
    height: 0,
    left: 0,
    top: 0,
    width: 0
  }), n = v.useCallback(
    (i) => {
      if (i != null) {
        var a = i.getBoundingClientRect(), o = {
          height: a.height,
          left: a.left,
          top: a.top,
          width: a.width
        };
        (Math.abs(o.height - t.height) > yi || Math.abs(o.left - t.left) > yi || Math.abs(o.top - t.top) > yi || Math.abs(o.width - t.width) > yi) && r({
          height: o.height,
          left: o.left,
          top: o.top,
          width: o.width
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t.width, t.height, t.top, t.left, ...e]
  );
  return [t, n];
}
function _e(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var kx = typeof Symbol == "function" && Symbol.observable || "@@observable", Xs = kx, So = () => Math.random().toString(36).substring(7).split("").join("."), Ex = {
  INIT: `@@redux/INIT${/* @__PURE__ */ So()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ So()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${So()}`
}, Gi = Ex;
function su(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function dh(e, t, r) {
  if (typeof e != "function")
    throw new Error(_e(2));
  if (typeof t == "function" && typeof r == "function" || typeof r == "function" && typeof arguments[3] == "function")
    throw new Error(_e(0));
  if (typeof t == "function" && typeof r > "u" && (r = t, t = void 0), typeof r < "u") {
    if (typeof r != "function")
      throw new Error(_e(1));
    return r(dh)(e, t);
  }
  let n = e, i = t, a = /* @__PURE__ */ new Map(), o = a, l = 0, u = !1;
  function s() {
    o === a && (o = /* @__PURE__ */ new Map(), a.forEach((m, y) => {
      o.set(y, m);
    }));
  }
  function c() {
    if (u)
      throw new Error(_e(3));
    return i;
  }
  function f(m) {
    if (typeof m != "function")
      throw new Error(_e(4));
    if (u)
      throw new Error(_e(5));
    let y = !0;
    s();
    const x = l++;
    return o.set(x, m), function() {
      if (y) {
        if (u)
          throw new Error(_e(6));
        y = !1, s(), o.delete(x), a = null;
      }
    };
  }
  function d(m) {
    if (!su(m))
      throw new Error(_e(7));
    if (typeof m.type > "u")
      throw new Error(_e(8));
    if (typeof m.type != "string")
      throw new Error(_e(17));
    if (u)
      throw new Error(_e(9));
    try {
      u = !0, i = n(i, m);
    } finally {
      u = !1;
    }
    return (a = o).forEach((x) => {
      x();
    }), m;
  }
  function h(m) {
    if (typeof m != "function")
      throw new Error(_e(10));
    n = m, d({
      type: Gi.REPLACE
    });
  }
  function p() {
    const m = f;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(y) {
        if (typeof y != "object" || y === null)
          throw new Error(_e(11));
        function x() {
          const w = y;
          w.next && w.next(c());
        }
        return x(), {
          unsubscribe: m(x)
        };
      },
      [Xs]() {
        return this;
      }
    };
  }
  return d({
    type: Gi.INIT
  }), {
    dispatch: d,
    subscribe: f,
    getState: c,
    replaceReducer: h,
    [Xs]: p
  };
}
function Cx(e) {
  Object.keys(e).forEach((t) => {
    const r = e[t];
    if (typeof r(void 0, {
      type: Gi.INIT
    }) > "u")
      throw new Error(_e(12));
    if (typeof r(void 0, {
      type: Gi.PROBE_UNKNOWN_ACTION()
    }) > "u")
      throw new Error(_e(13));
  });
}
function vh(e) {
  const t = Object.keys(e), r = {};
  for (let a = 0; a < t.length; a++) {
    const o = t[a];
    typeof e[o] == "function" && (r[o] = e[o]);
  }
  const n = Object.keys(r);
  let i;
  try {
    Cx(r);
  } catch (a) {
    i = a;
  }
  return function(o = {}, l) {
    if (i)
      throw i;
    let u = !1;
    const s = {};
    for (let c = 0; c < n.length; c++) {
      const f = n[c], d = r[f], h = o[f], p = d(h, l);
      if (typeof p > "u")
        throw l && l.type, new Error(_e(14));
      s[f] = p, u = u || p !== h;
    }
    return u = u || n.length !== Object.keys(o).length, u ? s : o;
  };
}
function qi(...e) {
  return e.length === 0 ? (t) => t : e.length === 1 ? e[0] : e.reduce((t, r) => (...n) => t(r(...n)));
}
function jx(...e) {
  return (t) => (r, n) => {
    const i = t(r, n);
    let a = () => {
      throw new Error(_e(15));
    };
    const o = {
      getState: i.getState,
      dispatch: (u, ...s) => a(u, ...s)
    }, l = e.map((u) => u(o));
    return a = qi(...l)(i.dispatch), {
      ...i,
      dispatch: a
    };
  };
}
function hh(e) {
  return su(e) && "type" in e && typeof e.type == "string";
}
var ph = Symbol.for("immer-nothing"), Zs = Symbol.for("immer-draftable"), $e = Symbol.for("immer-state");
function dt(e, ...t) {
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var Ze = Object, tn = Ze.getPrototypeOf, Yi = "constructor", Fa = "prototype", ul = "configurable", Vi = "enumerable", $i = "writable", $n = "value", Ft = (e) => !!e && !!e[$e];
function ut(e) {
  return e ? mh(e) || Ua(e) || !!e[Zs] || !!e[Yi]?.[Zs] || Ka(e) || Ha(e) : !1;
}
var Ix = Ze[Fa][Yi].toString(), Qs = /* @__PURE__ */ new WeakMap();
function mh(e) {
  if (!e || !cu(e))
    return !1;
  const t = tn(e);
  if (t === null || t === Ze[Fa])
    return !0;
  const r = Ze.hasOwnProperty.call(t, Yi) && t[Yi];
  if (r === Object)
    return !0;
  if (!Yr(r))
    return !1;
  let n = Qs.get(r);
  return n === void 0 && (n = Function.toString.call(r), Qs.set(r, n)), n === Ix;
}
function Wa(e, t, r = !0) {
  Qn(e) === 0 ? (r ? Reflect.ownKeys(e) : Ze.keys(e)).forEach((i) => {
    t(i, e[i], e);
  }) : e.forEach((n, i) => t(i, n, e));
}
function Qn(e) {
  const t = e[$e];
  return t ? t.type_ : Ua(e) ? 1 : Ka(e) ? 2 : Ha(e) ? 3 : 0;
}
var _o = (e, t, r = Qn(e)) => r === 2 ? e.has(t) : Ze[Fa].hasOwnProperty.call(e, t), sl = (e, t, r = Qn(e)) => (
  // @ts-ignore
  r === 2 ? e.get(t) : e[t]
), Xi = (e, t, r, n = Qn(e)) => {
  n === 2 ? e.set(t, r) : n === 3 ? e.add(r) : e[t] = r;
};
function Mx(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
var Ua = Array.isArray, Ka = (e) => e instanceof Map, Ha = (e) => e instanceof Set, cu = (e) => typeof e == "object", Yr = (e) => typeof e == "function", ko = (e) => typeof e == "boolean";
function Tx(e) {
  const t = +e;
  return Number.isInteger(t) && String(t) === e;
}
var Dt = (e) => e.copy_ || e.base_, fu = (e) => e.modified_ ? e.copy_ : e.base_;
function cl(e, t) {
  if (Ka(e))
    return new Map(e);
  if (Ha(e))
    return new Set(e);
  if (Ua(e))
    return Array[Fa].slice.call(e);
  const r = mh(e);
  if (t === !0 || t === "class_only" && !r) {
    const n = Ze.getOwnPropertyDescriptors(e);
    delete n[$e];
    let i = Reflect.ownKeys(n);
    for (let a = 0; a < i.length; a++) {
      const o = i[a], l = n[o];
      l[$i] === !1 && (l[$i] = !0, l[ul] = !0), (l.get || l.set) && (n[o] = {
        [ul]: !0,
        [$i]: !0,
        // could live with !!desc.set as well here...
        [Vi]: l[Vi],
        [$n]: e[o]
      });
    }
    return Ze.create(tn(e), n);
  } else {
    const n = tn(e);
    if (n !== null && r)
      return { ...e };
    const i = Ze.create(n);
    return Ze.assign(i, e);
  }
}
function du(e, t = !1) {
  return Ga(e) || Ft(e) || !ut(e) || (Qn(e) > 1 && Ze.defineProperties(e, {
    set: bi,
    add: bi,
    clear: bi,
    delete: bi
  }), Ze.freeze(e), t && Wa(
    e,
    (r, n) => {
      du(n, !0);
    },
    !1
  )), e;
}
function Dx() {
  dt(2);
}
var bi = {
  [$n]: Dx
};
function Ga(e) {
  return e === null || !cu(e) ? !0 : Ze.isFrozen(e);
}
var Zi = "MapSet", fl = "Patches", Js = "ArrayMethods", gh = {};
function Ir(e) {
  const t = gh[e];
  return t || dt(0, e), t;
}
var ec = (e) => !!gh[e], Rn, yh = () => Rn, Nx = (e, t) => ({
  drafts_: [],
  parent_: e,
  immer_: t,
  // Whenever the modified draft contains a draft from another scope, we
  // need to prevent auto-freezing so the unowned draft can be finalized.
  canAutoFreeze_: !0,
  unfinalizedDrafts_: 0,
  handledSet_: /* @__PURE__ */ new Set(),
  processedForPatches_: /* @__PURE__ */ new Set(),
  mapSetPlugin_: ec(Zi) ? Ir(Zi) : void 0,
  arrayMethodsPlugin_: ec(Js) ? Ir(Js) : void 0
});
function tc(e, t) {
  t && (e.patchPlugin_ = Ir(fl), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function dl(e) {
  vl(e), e.drafts_.forEach($x), e.drafts_ = null;
}
function vl(e) {
  e === Rn && (Rn = e.parent_);
}
var rc = (e) => Rn = Nx(Rn, e);
function $x(e) {
  const t = e[$e];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function nc(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const r = t.drafts_[0];
  if (e !== void 0 && e !== r) {
    r[$e].modified_ && (dl(t), dt(4)), ut(e) && (e = ic(t, e));
    const { patchPlugin_: i } = t;
    i && i.generateReplacementPatches_(
      r[$e].base_,
      e,
      t
    );
  } else
    e = ic(t, r);
  return Rx(t, e, !0), dl(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== ph ? e : void 0;
}
function ic(e, t) {
  if (Ga(t))
    return t;
  const r = t[$e];
  if (!r)
    return Qi(t, e.handledSet_, e);
  if (!qa(r, e))
    return t;
  if (!r.modified_)
    return r.base_;
  if (!r.finalized_) {
    const { callbacks_: n } = r;
    if (n)
      for (; n.length > 0; )
        n.pop()(e);
    wh(r, e);
  }
  return r.copy_;
}
function Rx(e, t, r = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && du(t, r);
}
function bh(e) {
  e.finalized_ = !0, e.scope_.unfinalizedDrafts_--;
}
var qa = (e, t) => e.scope_ === t, Lx = [];
function xh(e, t, r, n) {
  const i = Dt(e), a = e.type_;
  if (n !== void 0 && sl(i, n, a) === t) {
    Xi(i, n, r, a);
    return;
  }
  if (!e.draftLocations_) {
    const l = e.draftLocations_ = /* @__PURE__ */ new Map();
    Wa(i, (u, s) => {
      if (Ft(s)) {
        const c = l.get(s) || [];
        c.push(u), l.set(s, c);
      }
    });
  }
  const o = e.draftLocations_.get(t) ?? Lx;
  for (const l of o)
    Xi(i, l, r, a);
}
function zx(e, t, r) {
  e.callbacks_.push(function(i) {
    const a = t;
    if (!a || !qa(a, i))
      return;
    i.mapSetPlugin_?.fixSetContents(a);
    const o = fu(a);
    xh(e, a.draft_ ?? a, o, r), wh(a, i);
  });
}
function wh(e, t) {
  if (e.modified_ && !e.finalized_ && (e.type_ === 3 || e.type_ === 1 && e.allIndicesReassigned_ || (e.assigned_?.size ?? 0) > 0)) {
    const { patchPlugin_: n } = t;
    if (n) {
      const i = n.getPath(e);
      i && n.generatePatches_(e, i, t);
    }
    bh(e);
  }
}
function Bx(e, t, r) {
  const { scope_: n } = e;
  if (Ft(r)) {
    const i = r[$e];
    qa(i, n) && i.callbacks_.push(function() {
      Ri(e);
      const o = fu(i);
      xh(e, r, o, t);
    });
  } else ut(r) && e.callbacks_.push(function() {
    const a = Dt(e);
    e.type_ === 3 ? a.has(r) && Qi(r, n.handledSet_, n) : sl(a, t, e.type_) === r && n.drafts_.length > 1 && (e.assigned_.get(t) ?? !1) === !0 && e.copy_ && Qi(
      sl(e.copy_, t, e.type_),
      n.handledSet_,
      n
    );
  });
}
function Qi(e, t, r) {
  return !r.immer_.autoFreeze_ && r.unfinalizedDrafts_ < 1 || Ft(e) || t.has(e) || !ut(e) || Ga(e) || (t.add(e), Wa(e, (n, i) => {
    if (Ft(i)) {
      const a = i[$e];
      if (qa(a, r)) {
        const o = fu(a);
        Xi(e, n, o, e.type_), bh(a);
      }
    } else ut(i) && Qi(i, t, r);
  })), e;
}
function Fx(e, t) {
  const r = Ua(e), n = {
    type_: r ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : yh(),
    // True for both shallow and deep changes.
    modified_: !1,
    // Used during finalization.
    finalized_: !1,
    // Track which properties have been assigned (true) or deleted (false).
    // actually instantiated in `prepareCopy()`
    assigned_: void 0,
    // The parent draft state.
    parent_: t,
    // The base state.
    base_: e,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: !1,
    // `callbacks` actually gets assigned in `createProxy`
    callbacks_: void 0
  };
  let i = n, a = Ji;
  r && (i = [n], a = Ln);
  const { revoke: o, proxy: l } = Proxy.revocable(i, a);
  return n.draft_ = l, n.revoke_ = o, [l, n];
}
var Ji = {
  get(e, t) {
    if (t === $e)
      return e;
    let r = e.scope_.arrayMethodsPlugin_;
    const n = e.type_ === 1 && typeof t == "string";
    if (n && r?.isArrayOperationMethod(t))
      return r.createMethodInterceptor(e, t);
    const i = Dt(e);
    if (!_o(i, t, e.type_))
      return Ux(e, i, t);
    const a = i[t];
    if (e.finalized_ || !ut(a) || n && e.operationMethod && r?.isMutatingArrayMethod(
      e.operationMethod
    ) && Tx(t))
      return a;
    if (a === Eo(e.base_, t) || Wx(e, t, a)) {
      Ri(e);
      const o = e.type_ === 1 ? +t : t, l = pl(e.scope_, a, e, o);
      return e.copy_[o] = l;
    }
    return a;
  },
  has(e, t) {
    return t in Dt(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(Dt(e));
  },
  set(e, t, r) {
    const n = Ph(Dt(e), t);
    if (n?.set)
      return n.set.call(e.draft_, r), !0;
    if (!e.modified_) {
      const i = Eo(Dt(e), t), a = i?.[$e];
      if (a && a.base_ === r)
        return e.copy_[t] = r, e.assigned_.set(t, !1), !0;
      if (Mx(r, i) && (r !== void 0 || _o(e.base_, t, e.type_)))
        return !0;
      Ri(e), hl(e);
    }
    return e.copy_[t] === r && // special case: handle new props with value 'undefined'
    (r !== void 0 || _o(e.copy_, t, e.type_)) || // special case: NaN
    Number.isNaN(r) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = r, e.assigned_.set(t, !0), Bx(e, t, r)), !0;
  },
  deleteProperty(e, t) {
    return Ri(e), Eo(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_.set(t, !1), hl(e)) : e.assigned_.delete(t), e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const r = Dt(e), n = Reflect.getOwnPropertyDescriptor(r, t);
    return n && {
      [$i]: !0,
      [ul]: e.type_ !== 1 || t !== "length",
      [Vi]: n[Vi],
      [$n]: r[t]
    };
  },
  defineProperty() {
    dt(11);
  },
  getPrototypeOf(e) {
    return tn(e.base_);
  },
  setPrototypeOf() {
    dt(12);
  }
}, Ln = {};
for (let e in Ji) {
  let t = Ji[e];
  Ln[e] = function() {
    const r = arguments;
    return r[0] = r[0][0], t.apply(this, r);
  };
}
Ln.deleteProperty = function(e, t) {
  return Ln.set.call(this, e, t, void 0);
};
Ln.set = function(e, t, r) {
  return Ji.set.call(this, e[0], t, r, e[0]);
};
function Eo(e, t) {
  const r = e[$e];
  return (r ? Dt(r) : e)[t];
}
function Wx(e, t, r) {
  return e.type_ !== 1 || !e.allIndicesReassigned_ || e.assigned_?.get(t) || !ut(r) || r[$e] ? !1 : e.baseRefs_.has(r);
}
function Ux(e, t, r) {
  const n = Ph(t, r);
  return n ? $n in n ? n[$n] : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    n.get?.call(e.draft_)
  ) : void 0;
}
function Ph(e, t) {
  if (!(t in e))
    return;
  let r = tn(e);
  for (; r; ) {
    const n = Object.getOwnPropertyDescriptor(r, t);
    if (n)
      return n;
    r = tn(r);
  }
}
function hl(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && hl(e.parent_));
}
function Ri(e) {
  e.copy_ || (e.assigned_ = /* @__PURE__ */ new Map(), e.copy_ = cl(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var Kx = class {
  constructor(t) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.useStrictIteration_ = !1, this.produce = (r, n, i) => {
      if (Yr(r) && !Yr(n)) {
        const o = n;
        n = r;
        const l = this;
        return function(s = o, ...c) {
          return l.produce(s, (f) => n.call(this, f, ...c));
        };
      }
      Yr(n) || dt(6), i !== void 0 && !Yr(i) && dt(7);
      let a;
      if (ut(r)) {
        const o = rc(this), l = pl(o, r, void 0);
        let u = !0;
        try {
          a = n(l), u = !1;
        } finally {
          u ? dl(o) : vl(o);
        }
        return tc(o, i), nc(a, o);
      } else if (!r || !cu(r)) {
        if (a = n(r), a === void 0 && (a = r), a === ph && (a = void 0), this.autoFreeze_ && du(a, !0), i) {
          const o = [], l = [];
          Ir(fl).generateReplacementPatches_(r, a, {
            patches_: o,
            inversePatches_: l
          }), i(o, l);
        }
        return a;
      } else
        dt(1, r);
    }, this.produceWithPatches = (r, n) => {
      if (Yr(r))
        return (l, ...u) => this.produceWithPatches(l, (s) => r(s, ...u));
      let i, a;
      return [this.produce(r, n, (l, u) => {
        i = l, a = u;
      }), i, a];
    }, ko(t?.autoFreeze) && this.setAutoFreeze(t.autoFreeze), ko(t?.useStrictShallowCopy) && this.setUseStrictShallowCopy(t.useStrictShallowCopy), ko(t?.useStrictIteration) && this.setUseStrictIteration(t.useStrictIteration);
  }
  createDraft(t) {
    ut(t) || dt(8), Ft(t) && (t = ot(t));
    const r = rc(this), n = pl(r, t, void 0);
    return n[$e].isManual_ = !0, vl(r), n;
  }
  finishDraft(t, r) {
    const n = t && t[$e];
    (!n || !n.isManual_) && dt(9);
    const { scope_: i } = n;
    return tc(i, r), nc(void 0, i);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(t) {
    this.autoFreeze_ = t;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(t) {
    this.useStrictShallowCopy_ = t;
  }
  /**
   * Pass false to use faster iteration that skips non-enumerable properties
   * but still handles symbols for compatibility.
   *
   * By default, strict iteration is enabled (includes all own properties).
   */
  setUseStrictIteration(t) {
    this.useStrictIteration_ = t;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(t, r) {
    let n;
    for (n = r.length - 1; n >= 0; n--) {
      const a = r[n];
      if (a.path.length === 0 && a.op === "replace") {
        t = a.value;
        break;
      }
    }
    n > -1 && (r = r.slice(n + 1));
    const i = Ir(fl).applyPatches_;
    return Ft(t) ? i(t, r) : this.produce(
      t,
      (a) => i(a, r)
    );
  }
};
function pl(e, t, r, n) {
  const [i, a] = Ka(t) ? Ir(Zi).proxyMap_(t, r) : Ha(t) ? Ir(Zi).proxySet_(t, r) : Fx(t, r);
  return (r?.scope_ ?? yh()).drafts_.push(i), a.callbacks_ = r?.callbacks_ ?? [], a.key_ = n, r && n !== void 0 ? zx(r, a, n) : a.callbacks_.push(function(u) {
    u.mapSetPlugin_?.fixSetContents(a);
    const { patchPlugin_: s } = u;
    a.modified_ && s && s.generatePatches_(a, [], u);
  }), i;
}
function ot(e) {
  return Ft(e) || dt(10, e), Oh(e);
}
function Oh(e) {
  if (!ut(e) || Ga(e))
    return e;
  const t = e[$e];
  let r, n = !0;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, r = cl(e, t.scope_.immer_.useStrictShallowCopy_), n = t.scope_.immer_.shouldUseStrictIteration();
  } else
    r = cl(e, !0);
  return Wa(
    r,
    (i, a) => {
      Xi(r, i, Oh(a));
    },
    n
  ), t && (t.finalized_ = !1), r;
}
var Hx = new Kx(), Ah = Hx.produce;
function Sh(e) {
  return ({ dispatch: r, getState: n }) => (i) => (a) => typeof a == "function" ? a(r, n, e) : i(a);
}
var Gx = Sh(), qx = Sh, Yx = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length !== 0)
    return typeof arguments[0] == "object" ? qi : qi.apply(null, arguments);
};
function Je(e, t) {
  function r(...n) {
    if (t) {
      let i = t(...n);
      if (!i)
        throw new Error(Qe(0));
      return {
        type: e,
        payload: i.payload,
        ..."meta" in i && {
          meta: i.meta
        },
        ..."error" in i && {
          error: i.error
        }
      };
    }
    return {
      type: e,
      payload: n[0]
    };
  }
  return r.toString = () => `${e}`, r.type = e, r.match = (n) => hh(n) && n.type === e, r;
}
var _h = class jn extends Array {
  constructor(...t) {
    super(...t), Object.setPrototypeOf(this, jn.prototype);
  }
  static get [Symbol.species]() {
    return jn;
  }
  concat(...t) {
    return super.concat.apply(this, t);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0]) ? new jn(...t[0].concat(this)) : new jn(...t.concat(this));
  }
};
function ac(e) {
  return ut(e) ? Ah(e, () => {
  }) : e;
}
function xi(e, t, r) {
  return e.has(t) ? e.get(t) : e.set(t, r(t)).get(t);
}
function Vx(e) {
  return typeof e == "boolean";
}
var Xx = () => function(t) {
  const {
    thunk: r = !0,
    immutableCheck: n = !0,
    serializableCheck: i = !0,
    actionCreatorCheck: a = !0
  } = t ?? {};
  let o = new _h();
  return r && (Vx(r) ? o.push(Gx) : o.push(qx(r.extraArgument))), o;
}, kh = "RTK_autoBatch", ie = () => (e) => ({
  payload: e,
  meta: {
    [kh]: !0
  }
}), oc = (e) => (t) => {
  setTimeout(t, e);
}, Zx = (e, t) => (r) => {
  let n = !1;
  const i = () => {
    n || (n = !0, cancelAnimationFrame(a), clearTimeout(o), r());
  }, a = e(i), o = setTimeout(i, t);
}, Eh = (e = {
  type: "raf"
}) => (t) => (...r) => {
  const n = t(...r);
  let i = !0, a = !1, o = !1;
  const l = /* @__PURE__ */ new Set(), u = e.type === "tick" ? queueMicrotask : e.type === "raf" ? (
    // requestAnimationFrame won't exist in SSR environments. Fall back to a vague approximation just to keep from erroring.
    typeof window < "u" && window.requestAnimationFrame ? Zx(window.requestAnimationFrame, 100) : oc(10)
  ) : e.type === "callback" ? e.queueNotification : oc(e.timeout), s = () => {
    o = !1, a && (a = !1, l.forEach((c) => c()));
  };
  return Object.assign({}, n, {
    // Override the base `store.subscribe` method to keep original listeners
    // from running if we're delaying notifications
    subscribe(c) {
      const f = () => i && c(), d = n.subscribe(f);
      return l.add(c), () => {
        d(), l.delete(c);
      };
    },
    // Override the base `store.dispatch` method so that we can check actions
    // for the `shouldAutoBatch` flag and determine if batching is active
    dispatch(c) {
      try {
        return i = !c?.meta?.[kh], a = !i, a && (o || (o = !0, u(s))), n.dispatch(c);
      } finally {
        i = !0;
      }
    }
  });
}, Qx = (e) => function(r) {
  const {
    autoBatch: n = !0
  } = r ?? {};
  let i = new _h(e);
  return n && i.push(Eh(typeof n == "object" ? n : void 0)), i;
};
function Jx(e) {
  const t = Xx(), {
    reducer: r = void 0,
    middleware: n,
    devTools: i = !0,
    preloadedState: a = void 0,
    enhancers: o = void 0
  } = e || {};
  let l;
  if (typeof r == "function")
    l = r;
  else if (su(r))
    l = vh(r);
  else
    throw new Error(Qe(1));
  let u;
  typeof n == "function" ? u = n(t) : u = t();
  let s = qi;
  i && (s = Yx({
    // Enable capture of stack traces for dispatched Redux actions
    trace: !1,
    ...typeof i == "object" && i
  }));
  const c = jx(...u), f = Qx(c);
  let d = typeof o == "function" ? o(f) : f();
  const h = s(...d);
  return dh(l, a, h);
}
function Ch(e) {
  const t = {}, r = [];
  let n;
  const i = {
    addCase(a, o) {
      const l = typeof a == "string" ? a : a.type;
      if (!l)
        throw new Error(Qe(28));
      if (l in t)
        throw new Error(Qe(29));
      return t[l] = o, i;
    },
    addAsyncThunk(a, o) {
      return o.pending && (t[a.pending.type] = o.pending), o.rejected && (t[a.rejected.type] = o.rejected), o.fulfilled && (t[a.fulfilled.type] = o.fulfilled), o.settled && r.push({
        matcher: a.settled,
        reducer: o.settled
      }), i;
    },
    addMatcher(a, o) {
      return r.push({
        matcher: a,
        reducer: o
      }), i;
    },
    addDefaultCase(a) {
      return n = a, i;
    }
  };
  return e(i), [t, r, n];
}
function ew(e) {
  return typeof e == "function";
}
function tw(e, t) {
  let [r, n, i] = Ch(t), a;
  if (ew(e))
    a = () => ac(e());
  else {
    const l = ac(e);
    a = () => l;
  }
  function o(l = a(), u) {
    let s = [r[u.type], ...n.filter(({
      matcher: c
    }) => c(u)).map(({
      reducer: c
    }) => c)];
    return s.filter((c) => !!c).length === 0 && (s = [i]), s.reduce((c, f) => {
      if (f)
        if (Ft(c)) {
          const h = f(c, u);
          return h === void 0 ? c : h;
        } else {
          if (ut(c))
            return Ah(c, (d) => f(d, u));
          {
            const d = f(c, u);
            if (d === void 0) {
              if (c === null)
                return c;
              throw Error("A case reducer on a non-draftable value must not return undefined");
            }
            return d;
          }
        }
      return c;
    }, l);
  }
  return o.getInitialState = a, o;
}
var rw = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", nw = (e = 21) => {
  let t = "", r = e;
  for (; r--; )
    t += rw[Math.random() * 64 | 0];
  return t;
}, iw = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function aw(e, t) {
  return `${e}/${t}`;
}
function ow({
  creators: e
} = {}) {
  const t = e?.asyncThunk?.[iw];
  return function(n) {
    const {
      name: i,
      reducerPath: a = i
    } = n;
    if (!i)
      throw new Error(Qe(11));
    const o = (typeof n.reducers == "function" ? n.reducers(uw()) : n.reducers) || {}, l = Object.keys(o), u = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, s = {
      addCase(b, w) {
        const O = typeof b == "string" ? b : b.type;
        if (!O)
          throw new Error(Qe(12));
        if (O in u.sliceCaseReducersByType)
          throw new Error(Qe(13));
        return u.sliceCaseReducersByType[O] = w, s;
      },
      addMatcher(b, w) {
        return u.sliceMatchers.push({
          matcher: b,
          reducer: w
        }), s;
      },
      exposeAction(b, w) {
        return u.actionCreators[b] = w, s;
      },
      exposeCaseReducer(b, w) {
        return u.sliceCaseReducersByName[b] = w, s;
      }
    };
    l.forEach((b) => {
      const w = o[b], O = {
        reducerName: b,
        type: aw(i, b),
        createNotation: typeof n.reducers == "function"
      };
      cw(w) ? dw(O, w, s, t) : sw(O, w, s);
    });
    function c() {
      const [b = {}, w = [], O = void 0] = typeof n.extraReducers == "function" ? Ch(n.extraReducers) : [n.extraReducers], P = {
        ...b,
        ...u.sliceCaseReducersByType
      };
      return tw(n.initialState, (_) => {
        for (let A in P)
          _.addCase(A, P[A]);
        for (let A of u.sliceMatchers)
          _.addMatcher(A.matcher, A.reducer);
        for (let A of w)
          _.addMatcher(A.matcher, A.reducer);
        O && _.addDefaultCase(O);
      });
    }
    const f = (b) => b, d = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new WeakMap();
    let p;
    function g(b, w) {
      return p || (p = c()), p(b, w);
    }
    function m() {
      return p || (p = c()), p.getInitialState();
    }
    function y(b, w = !1) {
      function O(_) {
        let A = _[b];
        return typeof A > "u" && w && (A = xi(h, O, m)), A;
      }
      function P(_ = f) {
        const A = xi(d, w, () => /* @__PURE__ */ new WeakMap());
        return xi(A, _, () => {
          const C = {};
          for (const [T, I] of Object.entries(n.selectors ?? {}))
            C[T] = lw(I, _, () => xi(h, _, m), w);
          return C;
        });
      }
      return {
        reducerPath: b,
        getSelectors: P,
        get selectors() {
          return P(O);
        },
        selectSlice: O
      };
    }
    const x = {
      name: i,
      reducer: g,
      actions: u.actionCreators,
      caseReducers: u.sliceCaseReducersByName,
      getInitialState: m,
      ...y(a),
      injectInto(b, {
        reducerPath: w,
        ...O
      } = {}) {
        const P = w ?? a;
        return b.inject({
          reducerPath: P,
          reducer: g
        }, O), {
          ...x,
          ...y(P, !0)
        };
      }
    };
    return x;
  };
}
function lw(e, t, r, n) {
  function i(a, ...o) {
    let l = t(a);
    return typeof l > "u" && n && (l = r()), e(l, ...o);
  }
  return i.unwrapped = e, i;
}
var Re = /* @__PURE__ */ ow();
function uw() {
  function e(t, r) {
    return {
      _reducerDefinitionType: "asyncThunk",
      payloadCreator: t,
      ...r
    };
  }
  return e.withTypes = () => e, {
    reducer(t) {
      return Object.assign({
        // hack so the wrapping function has the same name as the original
        // we need to create a wrapper so the `reducerDefinitionType` is not assigned to the original
        [t.name](...r) {
          return t(...r);
        }
      }[t.name], {
        _reducerDefinitionType: "reducer"
        /* reducer */
      });
    },
    preparedReducer(t, r) {
      return {
        _reducerDefinitionType: "reducerWithPrepare",
        prepare: t,
        reducer: r
      };
    },
    asyncThunk: e
  };
}
function sw({
  type: e,
  reducerName: t,
  createNotation: r
}, n, i) {
  let a, o;
  if ("reducer" in n) {
    if (r && !fw(n))
      throw new Error(Qe(17));
    a = n.reducer, o = n.prepare;
  } else
    a = n;
  i.addCase(e, a).exposeCaseReducer(t, a).exposeAction(t, o ? Je(e, o) : Je(e));
}
function cw(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function fw(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function dw({
  type: e,
  reducerName: t
}, r, n, i) {
  if (!i)
    throw new Error(Qe(18));
  const {
    payloadCreator: a,
    fulfilled: o,
    pending: l,
    rejected: u,
    settled: s,
    options: c
  } = r, f = i(e, a, c);
  n.exposeAction(t, f), o && n.addCase(f.fulfilled, o), l && n.addCase(f.pending, l), u && n.addCase(f.rejected, u), s && n.addMatcher(f.settled, s), n.exposeCaseReducer(t, {
    fulfilled: o || wi,
    pending: l || wi,
    rejected: u || wi,
    settled: s || wi
  });
}
function wi() {
}
var vw = "task", jh = "listener", Ih = "completed", vu = "cancelled", hw = `task-${vu}`, pw = `task-${Ih}`, ml = `${jh}-${vu}`, mw = `${jh}-${Ih}`, Ya = class {
  constructor(e) {
    this.code = e, this.message = `${vw} ${vu} (reason: ${e})`;
  }
  code;
  name = "TaskAbortError";
  message;
}, hu = (e, t) => {
  if (typeof e != "function")
    throw new TypeError(Qe(32));
}, ea = () => {
}, Mh = (e, t = ea) => (e.catch(t), e), Th = (e, t) => (e.addEventListener("abort", t, {
  once: !0
}), () => e.removeEventListener("abort", t)), Sr = (e) => {
  if (e.aborted)
    throw new Ya(e.reason);
};
function Dh(e, t) {
  let r = ea;
  return new Promise((n, i) => {
    const a = () => i(new Ya(e.reason));
    if (e.aborted) {
      a();
      return;
    }
    r = Th(e, a), t.finally(() => r()).then(n, i);
  }).finally(() => {
    r = ea;
  });
}
var gw = async (e, t) => {
  try {
    return await Promise.resolve(), {
      status: "ok",
      value: await e()
    };
  } catch (r) {
    return {
      status: r instanceof Ya ? "cancelled" : "rejected",
      error: r
    };
  } finally {
    t?.();
  }
}, ta = (e) => (t) => Mh(Dh(e, t).then((r) => (Sr(e), r))), Nh = (e) => {
  const t = ta(e);
  return (r) => t(new Promise((n) => setTimeout(n, r)));
}, {
  assign: Qr
} = Object, lc = {}, Va = "listenerMiddleware", yw = (e, t) => {
  const r = (n) => Th(e, () => n.abort(e.reason));
  return (n, i) => {
    hu(n);
    const a = new AbortController();
    r(a);
    const o = gw(async () => {
      Sr(e), Sr(a.signal);
      const l = await n({
        pause: ta(a.signal),
        delay: Nh(a.signal),
        signal: a.signal
      });
      return Sr(a.signal), l;
    }, () => a.abort(pw));
    return i?.autoJoin && t.push(o.catch(ea)), {
      result: ta(e)(o),
      cancel() {
        a.abort(hw);
      }
    };
  };
}, bw = (e, t) => {
  const r = async (n, i) => {
    Sr(t);
    let a = () => {
    };
    const l = [new Promise((u, s) => {
      let c = e({
        predicate: n,
        effect: (f, d) => {
          d.unsubscribe(), u([f, d.getState(), d.getOriginalState()]);
        }
      });
      a = () => {
        c(), s();
      };
    })];
    i != null && l.push(new Promise((u) => setTimeout(u, i, null)));
    try {
      const u = await Dh(t, Promise.race(l));
      return Sr(t), u;
    } finally {
      a();
    }
  };
  return ((n, i) => Mh(r(n, i)));
}, $h = (e) => {
  let {
    type: t,
    actionCreator: r,
    matcher: n,
    predicate: i,
    effect: a
  } = e;
  if (t)
    i = Je(t).match;
  else if (r)
    t = r.type, i = r.match;
  else if (n)
    i = n;
  else if (!i) throw new Error(Qe(21));
  return hu(a), {
    predicate: i,
    type: t,
    effect: a
  };
}, Rh = /* @__PURE__ */ Qr((e) => {
  const {
    type: t,
    predicate: r,
    effect: n
  } = $h(e);
  return {
    id: nw(),
    effect: n,
    type: t,
    predicate: r,
    pending: /* @__PURE__ */ new Set(),
    unsubscribe: () => {
      throw new Error(Qe(22));
    }
  };
}, {
  withTypes: () => Rh
}), uc = (e, t) => {
  const {
    type: r,
    effect: n,
    predicate: i
  } = $h(t);
  return Array.from(e.values()).find((a) => (typeof r == "string" ? a.type === r : a.predicate === i) && a.effect === n);
}, gl = (e) => {
  e.pending.forEach((t) => {
    t.abort(ml);
  });
}, xw = (e, t) => () => {
  for (const r of t.keys())
    gl(r);
  e.clear();
}, sc = (e, t, r) => {
  try {
    e(t, r);
  } catch (n) {
    setTimeout(() => {
      throw n;
    }, 0);
  }
}, Lh = /* @__PURE__ */ Qr(/* @__PURE__ */ Je(`${Va}/add`), {
  withTypes: () => Lh
}), ww = /* @__PURE__ */ Je(`${Va}/removeAll`), zh = /* @__PURE__ */ Qr(/* @__PURE__ */ Je(`${Va}/remove`), {
  withTypes: () => zh
}), Pw = (...e) => {
  console.error(`${Va}/error`, ...e);
}, Jn = (e = {}) => {
  const t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), n = (h) => {
    const p = r.get(h) ?? 0;
    r.set(h, p + 1);
  }, i = (h) => {
    const p = r.get(h) ?? 1;
    p === 1 ? r.delete(h) : r.set(h, p - 1);
  }, {
    extra: a,
    onError: o = Pw
  } = e;
  hu(o);
  const l = (h) => (h.unsubscribe = () => t.delete(h.id), t.set(h.id, h), (p) => {
    h.unsubscribe(), p?.cancelActive && gl(h);
  }), u = ((h) => {
    const p = uc(t, h) ?? Rh(h);
    return l(p);
  });
  Qr(u, {
    withTypes: () => u
  });
  const s = (h) => {
    const p = uc(t, h);
    return p && (p.unsubscribe(), h.cancelActive && gl(p)), !!p;
  };
  Qr(s, {
    withTypes: () => s
  });
  const c = async (h, p, g, m) => {
    const y = new AbortController(), x = bw(u, y.signal), b = [];
    try {
      h.pending.add(y), n(h), await Promise.resolve(h.effect(
        p,
        // Use assign() rather than ... to avoid extra helper functions added to bundle
        Qr({}, g, {
          getOriginalState: m,
          condition: (w, O) => x(w, O).then(Boolean),
          take: x,
          delay: Nh(y.signal),
          pause: ta(y.signal),
          extra: a,
          signal: y.signal,
          fork: yw(y.signal, b),
          unsubscribe: h.unsubscribe,
          subscribe: () => {
            t.set(h.id, h);
          },
          cancelActiveListeners: () => {
            h.pending.forEach((w, O, P) => {
              w !== y && (w.abort(ml), P.delete(w));
            });
          },
          cancel: () => {
            y.abort(ml), h.pending.delete(y);
          },
          throwIfCancelled: () => {
            Sr(y.signal);
          }
        })
      ));
    } catch (w) {
      w instanceof Ya || sc(o, w, {
        raisedBy: "effect"
      });
    } finally {
      await Promise.all(b), y.abort(mw), i(h), h.pending.delete(y);
    }
  }, f = xw(t, r);
  return {
    middleware: (h) => (p) => (g) => {
      if (!hh(g))
        return p(g);
      if (Lh.match(g))
        return u(g.payload);
      if (ww.match(g)) {
        f();
        return;
      }
      if (zh.match(g))
        return s(g.payload);
      let m = h.getState();
      const y = () => {
        if (m === lc)
          throw new Error(Qe(23));
        return m;
      };
      let x;
      try {
        if (x = p(g), t.size > 0) {
          const b = h.getState(), w = Array.from(t.values());
          for (const O of w) {
            let P = !1;
            try {
              P = O.predicate(g, b, m);
            } catch (_) {
              P = !1, sc(o, _, {
                raisedBy: "predicate"
              });
            }
            P && c(O, g, h, y);
          }
        }
      } finally {
        m = lc;
      }
      return x;
    },
    startListening: u,
    stopListening: s,
    clearListeners: f
  };
};
function Qe(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var Ow = {
  layoutType: "horizontal",
  width: 0,
  height: 0,
  margin: {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5
  },
  scale: 1
}, Bh = Re({
  name: "chartLayout",
  initialState: Ow,
  reducers: {
    setLayout(e, t) {
      e.layoutType = t.payload;
    },
    setChartSize(e, t) {
      e.width = t.payload.width, e.height = t.payload.height;
    },
    setMargin(e, t) {
      var r, n, i, a;
      e.margin.top = (r = t.payload.top) !== null && r !== void 0 ? r : 0, e.margin.right = (n = t.payload.right) !== null && n !== void 0 ? n : 0, e.margin.bottom = (i = t.payload.bottom) !== null && i !== void 0 ? i : 0, e.margin.left = (a = t.payload.left) !== null && a !== void 0 ? a : 0;
    },
    setScale(e, t) {
      e.scale = t.payload;
    }
  }
}), {
  setMargin: Aw,
  setLayout: Sw,
  setChartSize: _w,
  setScale: kw
} = Bh.actions, Ew = Bh.reducer;
function Fh(e, t, r) {
  return Array.isArray(e) && e && t + r !== 0 ? e.slice(t, r + 1) : e;
}
function G(e) {
  return Number.isFinite(e);
}
function Ct(e) {
  return typeof e == "number" && e > 0 && Number.isFinite(e);
}
function cc(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Vr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? cc(Object(r), !0).forEach(function(n) {
      Cw(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : cc(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Cw(e, t, r) {
  return (t = jw(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function jw(e) {
  var t = Iw(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Iw(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function je(e, t, r) {
  return Ie(e) || Ie(t) ? r : Ke(t) ? $r(e, t, r) : typeof t == "function" ? t(e) : r;
}
var Mw = (e, t, r) => {
  if (t && r) {
    var {
      width: n,
      height: i
    } = r, {
      align: a,
      verticalAlign: o,
      layout: l
    } = t;
    if ((l === "vertical" || l === "horizontal" && o === "middle") && a !== "center" && L(e[a]))
      return Vr(Vr({}, e), {}, {
        [a]: e[a] + (n || 0)
      });
    if ((l === "horizontal" || l === "vertical" && a === "center") && o !== "middle" && L(e[o]))
      return Vr(Vr({}, e), {}, {
        [o]: e[o] + (i || 0)
      });
  }
  return e;
}, It = (e, t) => e === "horizontal" && t === "xAxis" || e === "vertical" && t === "yAxis" || e === "centric" && t === "angleAxis" || e === "radial" && t === "radiusAxis", Wh = (e, t, r, n) => {
  if (n)
    return e.map((l) => l.coordinate);
  var i, a, o = e.map((l) => (l.coordinate === t && (i = !0), l.coordinate === r && (a = !0), l.coordinate));
  return i || o.push(t), a || o.push(r), o;
}, Uh = (e, t, r) => {
  if (!e)
    return null;
  var {
    duplicateDomain: n,
    type: i,
    range: a,
    scale: o,
    realScaleType: l,
    isCategorical: u,
    categoricalDomain: s,
    tickCount: c,
    ticks: f,
    niceTicks: d,
    axisType: h
  } = e;
  if (!o)
    return null;
  var p = l === "scaleBand" && o.bandwidth ? o.bandwidth() / 2 : 2, g = i === "category" && o.bandwidth ? o.bandwidth() / p : 0;
  if (g = h === "angleAxis" && a && a.length >= 2 ? at(a[0] - a[1]) * 2 * g : g, f || d) {
    var m = (f || d || []).map((y, x) => {
      var b = n ? n.indexOf(y) : y, w = o.map(b);
      return G(w) ? {
        // If the scaleContent is not a number, the coordinate will be NaN.
        // That could be the case for example with a PointScale and a string as domain.
        coordinate: w + g,
        value: y,
        offset: g,
        index: x
      } : null;
    }).filter(He);
    return m;
  }
  return u && s ? s.map((y, x) => {
    var b = o.map(y);
    return G(b) ? {
      coordinate: b + g,
      value: y,
      index: x,
      offset: g
    } : null;
  }).filter(He) : o.ticks && c != null ? o.ticks(c).map((y, x) => {
    var b = o.map(y);
    return G(b) ? {
      coordinate: b + g,
      value: y,
      index: x,
      offset: g
    } : null;
  }).filter(He) : o.domain().map((y, x) => {
    var b = o.map(y);
    return G(b) ? {
      coordinate: b + g,
      // @ts-expect-error can't use Date as an index
      value: n ? n[y] : y,
      index: x,
      offset: g
    } : null;
  }).filter(He);
}, Tw = (e) => {
  var t, r = e.length;
  if (!(r <= 0)) {
    var n = (t = e[0]) === null || t === void 0 ? void 0 : t.length;
    if (!(n == null || n <= 0))
      for (var i = 0; i < n; ++i)
        for (var a = 0, o = 0, l = 0; l < r; ++l) {
          var u = e[l], s = u?.[i];
          if (s != null) {
            var c = s[1], f = s[0], d = Et(c) ? f : c;
            d >= 0 ? (s[0] = a, a += d, s[1] = a) : (s[0] = o, o += d, s[1] = o);
          }
        }
  }
}, Dw = (e) => {
  var t, r = e.length;
  if (!(r <= 0)) {
    var n = (t = e[0]) === null || t === void 0 ? void 0 : t.length;
    if (!(n == null || n <= 0))
      for (var i = 0; i < n; ++i)
        for (var a = 0, o = 0; o < r; ++o) {
          var l = e[o], u = l?.[i];
          if (u != null) {
            var s = Et(u[1]) ? u[0] : u[1];
            s >= 0 ? (u[0] = a, a += s, u[1] = a) : (u[0] = 0, u[1] = 0);
          }
        }
  }
}, Nw = {
  sign: Tw,
  // @ts-expect-error definitelytyped types are incorrect
  expand: zb,
  // @ts-expect-error definitelytyped types are incorrect
  none: Cr,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: Bb,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: Fb,
  positive: Dw
}, $w = (e, t, r) => {
  var n, i = (n = Nw[r]) !== null && n !== void 0 ? n : Cr, a = Lb().keys(t).value((l, u) => Number(je(l, u, 0))).order(rl).offset(i), o = a(e);
  return o.forEach((l, u) => {
    l.forEach((s, c) => {
      var f = je(e[c], t[u], 0);
      Array.isArray(f) && f.length === 2 && L(f[0]) && L(f[1]) && (s[0] = f[0], s[1] = f[1]);
    });
  }), o;
};
function Rw(e) {
  return e == null ? void 0 : String(e);
}
function fc(e) {
  var {
    axis: t,
    ticks: r,
    bandSize: n,
    entry: i,
    index: a,
    dataKey: o
  } = e;
  if (t.type === "category") {
    if (!t.allowDuplicatedCategory && t.dataKey && !Ie(i[t.dataKey])) {
      var l = Kv(r, "value", i[t.dataKey]);
      if (l)
        return l.coordinate + n / 2;
    }
    return r != null && r[a] ? r[a].coordinate + n / 2 : null;
  }
  var u = je(i, Ie(o) ? t.dataKey : o), s = t.scale.map(u);
  return L(s) ? s : null;
}
var Lw = (e) => {
  var t = e.flat(2).filter(L);
  return [Math.min(...t), Math.max(...t)];
}, zw = (e) => [e[0] === 1 / 0 ? 0 : e[0], e[1] === -1 / 0 ? 0 : e[1]], Bw = (e, t, r) => {
  if (e != null)
    return zw(Object.keys(e).reduce((n, i) => {
      var a = e[i];
      if (!a)
        return n;
      var {
        stackedData: o
      } = a, l = o.reduce((u, s) => {
        var c = Fh(s, t, r), f = Lw(c);
        return !G(f[0]) || !G(f[1]) ? u : [Math.min(u[0], f[0]), Math.max(u[1], f[1])];
      }, [1 / 0, -1 / 0]);
      return [Math.min(l[0], n[0]), Math.max(l[1], n[1])];
    }, [1 / 0, -1 / 0]));
}, dc = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, vc = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, ra = (e, t, r) => {
  if (e && e.scale && e.scale.bandwidth) {
    var n = e.scale.bandwidth();
    if (!r || n > 0)
      return n;
  }
  if (e && t && t.length >= 2) {
    for (var i = Ba(t, (c) => c.coordinate), a = 1 / 0, o = 1, l = i.length; o < l; o++) {
      var u = i[o], s = i[o - 1];
      a = Math.min((u?.coordinate || 0) - (s?.coordinate || 0), a);
    }
    return a === 1 / 0 ? 0 : a;
  }
  return r ? void 0 : 0;
};
function hc(e) {
  var {
    tooltipEntrySettings: t,
    dataKey: r,
    payload: n,
    value: i,
    name: a
  } = e;
  return Vr(Vr({}, t), {}, {
    dataKey: r,
    payload: n,
    value: i,
    name: a
  });
}
function Kh(e, t) {
  if (e)
    return String(e);
  if (typeof t == "string")
    return t;
}
var Fw = (e, t) => {
  if (t === "horizontal")
    return e.relativeX;
  if (t === "vertical")
    return e.relativeY;
}, Ww = (e, t) => t === "centric" ? e.angle : e.radius, Gt = (e) => e.layout.width, qt = (e) => e.layout.height, Uw = (e) => e.layout.scale, Hh = (e) => e.layout.margin, Xa = S((e) => e.cartesianAxis.xAxis, (e) => Object.values(e)), Za = S((e) => e.cartesianAxis.yAxis, (e) => Object.values(e)), Kw = "data-recharts-item-index", Hw = "data-recharts-item-id", ei = 60;
function pc(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Pi(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? pc(Object(r), !0).forEach(function(n) {
      Gw(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : pc(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Gw(e, t, r) {
  return (t = qw(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function qw(e) {
  var t = Yw(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Yw(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Vw = (e) => e.brush.height;
function Xw(e) {
  var t = Za(e);
  return t.reduce((r, n) => {
    if (n.orientation === "left" && !n.mirror && !n.hide) {
      var i = typeof n.width == "number" ? n.width : ei;
      return r + i;
    }
    return r;
  }, 0);
}
function Zw(e) {
  var t = Za(e);
  return t.reduce((r, n) => {
    if (n.orientation === "right" && !n.mirror && !n.hide) {
      var i = typeof n.width == "number" ? n.width : ei;
      return r + i;
    }
    return r;
  }, 0);
}
function Qw(e) {
  var t = Xa(e);
  return t.reduce((r, n) => n.orientation === "top" && !n.mirror && !n.hide ? r + n.height : r, 0);
}
function Jw(e) {
  var t = Xa(e);
  return t.reduce((r, n) => n.orientation === "bottom" && !n.mirror && !n.hide ? r + n.height : r, 0);
}
var Me = S([Gt, qt, Hh, Vw, Xw, Zw, Qw, Jw, ch, Ox], (e, t, r, n, i, a, o, l, u, s) => {
  var c = {
    left: (r.left || 0) + i,
    right: (r.right || 0) + a
  }, f = {
    top: (r.top || 0) + o,
    bottom: (r.bottom || 0) + l
  }, d = Pi(Pi({}, f), c), h = d.bottom;
  d.bottom += n, d = Mw(d, u, s);
  var p = e - d.left - d.right, g = t - d.top - d.bottom;
  return Pi(Pi({
    brushBottom: h
  }, d), {}, {
    // never return negative values for height and width
    width: Math.max(p, 0),
    height: Math.max(g, 0)
  });
}), e1 = S(Me, (e) => ({
  x: e.left,
  y: e.top,
  width: e.width,
  height: e.height
})), Gh = S(Gt, qt, (e, t) => ({
  x: 0,
  y: 0,
  width: e,
  height: t
})), t1 = /* @__PURE__ */ v.createContext(null), Fe = () => v.useContext(t1) != null, Qa = (e) => e.brush, Ja = S([Qa, Me, Hh], (e, t, r) => ({
  height: e.height,
  x: L(e.x) ? e.x : t.left,
  y: L(e.y) ? e.y : t.top + t.height + t.brushBottom - (r?.bottom || 0),
  width: L(e.width) ? e.width : t.width
}));
function r1(e, t, { signal: r, edges: n } = {}) {
  let i, a = null;
  const o = n != null && n.includes("leading"), l = n == null || n.includes("trailing"), u = () => {
    a !== null && (e.apply(i, a), i = void 0, a = null);
  }, s = () => {
    l && u(), h();
  };
  let c = null;
  const f = () => {
    c != null && clearTimeout(c), c = setTimeout(() => {
      c = null, s();
    }, t);
  }, d = () => {
    c !== null && (clearTimeout(c), c = null);
  }, h = () => {
    d(), i = void 0, a = null;
  }, p = () => {
    u();
  }, g = function(...m) {
    if (r?.aborted) return;
    i = this, a = m;
    const y = c == null;
    f(), o && y && u();
  };
  return g.schedule = f, g.cancel = h, g.flush = p, r?.addEventListener("abort", h, { once: !0 }), g;
}
function n1(e, t = 0, r = {}) {
  typeof r != "object" && (r = {});
  const { leading: n = !1, trailing: i = !0, maxWait: a } = r, o = Array(2);
  n && (o[0] = "leading"), i && (o[1] = "trailing");
  let l, u = null;
  const s = r1(function(...d) {
    l = e.apply(this, d), u = null;
  }, t, { edges: o }), c = function(...d) {
    return a != null && (u === null && (u = Date.now()), Date.now() - u >= a) ? (l = e.apply(this, d), u = Date.now(), s.cancel(), s.schedule(), l) : (s.apply(this, d), l);
  }, f = () => (s.flush(), l);
  return c.cancel = s.cancel, c.flush = f, c;
}
function i1(e, t = 0, r = {}) {
  const { leading: n = !0, trailing: i = !0 } = r;
  return n1(e, t, {
    leading: n,
    maxWait: t,
    trailing: i
  });
}
var na = function(t, r) {
  for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++)
    i[a - 2] = arguments[a];
  if (typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
    if (r === void 0)
      console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    else {
      var o = 0;
      console.warn(r.replace(/%s/g, () => i[o++]));
    }
}, At = {
  width: "100%",
  height: "100%",
  debounce: 0,
  minWidth: 0,
  initialDimension: {
    width: -1,
    height: -1
  }
}, qh = (e, t, r) => {
  var {
    width: n = At.width,
    height: i = At.height,
    aspect: a,
    maxHeight: o
  } = r, l = jr(n) ? e : Number(n), u = jr(i) ? t : Number(i);
  return a && a > 0 && (l ? u = l / a : u && (l = u * a), o && u != null && u > o && (u = o)), {
    calculatedWidth: l,
    calculatedHeight: u
  };
}, a1 = {
  width: 0,
  height: 0,
  overflow: "visible"
}, o1 = {
  width: 0,
  overflowX: "visible"
}, l1 = {
  height: 0,
  overflowY: "visible"
}, u1 = {}, s1 = (e) => {
  var {
    width: t,
    height: r
  } = e, n = jr(t), i = jr(r);
  return n && i ? a1 : n ? o1 : i ? l1 : u1;
};
function c1(e) {
  var {
    width: t,
    height: r,
    aspect: n
  } = e, i = t, a = r;
  return i === void 0 && a === void 0 ? (i = At.width, a = At.height) : i === void 0 ? i = n && n > 0 ? void 0 : At.width : a === void 0 && (a = n && n > 0 ? void 0 : At.height), {
    width: i,
    height: a
  };
}
function yl() {
  return yl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, yl.apply(null, arguments);
}
function mc(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function gc(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? mc(Object(r), !0).forEach(function(n) {
      f1(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : mc(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function f1(e, t, r) {
  return (t = d1(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function d1(e) {
  var t = v1(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function v1(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Yh = /* @__PURE__ */ v.createContext(At.initialDimension);
function h1(e) {
  return Ct(e.width) && Ct(e.height);
}
function Vh(e) {
  var {
    children: t,
    width: r,
    height: n
  } = e, i = v.useMemo(() => ({
    width: r,
    height: n
  }), [r, n]);
  return h1(i) ? /* @__PURE__ */ v.createElement(Yh.Provider, {
    value: i
  }, t) : null;
}
var pu = () => v.useContext(Yh), p1 = /* @__PURE__ */ v.forwardRef((e, t) => {
  var {
    aspect: r,
    initialDimension: n = At.initialDimension,
    width: i,
    height: a,
    /*
     * default min-width to 0 if not specified - 'auto' causes issues with flexbox
     * https://github.com/recharts/recharts/issues/172
     */
    minWidth: o = At.minWidth,
    minHeight: l,
    maxHeight: u,
    children: s,
    debounce: c = At.debounce,
    id: f,
    className: d,
    onResize: h,
    style: p = {}
  } = e, g = v.useRef(null), m = v.useRef();
  m.current = h, v.useImperativeHandle(t, () => g.current);
  var [y, x] = v.useState({
    containerWidth: n.width,
    containerHeight: n.height
  }), b = v.useCallback((A, C) => {
    x((T) => {
      var I = Math.round(A), k = Math.round(C);
      return T.containerWidth === I && T.containerHeight === k ? T : {
        containerWidth: I,
        containerHeight: k
      };
    });
  }, []);
  v.useEffect(() => {
    if (g.current == null || typeof ResizeObserver > "u")
      return Rr;
    var A = (k) => {
      var B, F = k[0];
      if (F != null) {
        var {
          width: U,
          height: q
        } = F.contentRect;
        b(U, q), (B = m.current) === null || B === void 0 || B.call(m, U, q);
      }
    };
    c > 0 && (A = i1(A, c, {
      trailing: !0,
      leading: !1
    }));
    var C = new ResizeObserver(A), {
      width: T,
      height: I
    } = g.current.getBoundingClientRect();
    return b(T, I), C.observe(g.current), () => {
      C.disconnect();
    };
  }, [b, c]);
  var {
    containerWidth: w,
    containerHeight: O
  } = y;
  na(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
  var {
    calculatedWidth: P,
    calculatedHeight: _
  } = qh(w, O, {
    width: i,
    height: a,
    aspect: r,
    maxHeight: u
  });
  return na(P != null && P > 0 || _ != null && _ > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, P, _, i, a, o, l, r), /* @__PURE__ */ v.createElement("div", {
    id: f ? "".concat(f) : void 0,
    className: J("recharts-responsive-container", d),
    style: gc(gc({}, p), {}, {
      width: i,
      height: a,
      minWidth: o,
      minHeight: l,
      maxHeight: u
    }),
    ref: g
  }, /* @__PURE__ */ v.createElement("div", {
    style: s1({
      width: i,
      height: a
    })
  }, /* @__PURE__ */ v.createElement(Vh, {
    width: P,
    height: _
  }, s)));
}), m1 = /* @__PURE__ */ v.forwardRef((e, t) => {
  var r = pu();
  if (Ct(r.width) && Ct(r.height))
    return e.children;
  var {
    width: n,
    height: i
  } = c1({
    width: e.width,
    height: e.height,
    aspect: e.aspect
  }), {
    calculatedWidth: a,
    calculatedHeight: o
  } = qh(void 0, void 0, {
    width: n,
    height: i,
    aspect: e.aspect,
    maxHeight: e.maxHeight
  });
  return L(a) && L(o) ? /* @__PURE__ */ v.createElement(Vh, {
    width: a,
    height: o
  }, e.children) : /* @__PURE__ */ v.createElement(p1, yl({}, e, {
    width: n,
    height: i,
    ref: t
  }));
});
function mu(e) {
  if (e)
    return {
      x: e.x,
      y: e.y,
      upperWidth: "upperWidth" in e ? e.upperWidth : e.width,
      lowerWidth: "lowerWidth" in e ? e.lowerWidth : e.width,
      width: e.width,
      height: e.height
    };
}
var eo = () => {
  var e, t = Fe(), r = z(e1), n = z(Ja), i = (e = z(Qa)) === null || e === void 0 ? void 0 : e.padding;
  return !t || !n || !i ? r : {
    width: n.width - i.left - i.right,
    height: n.height - i.top - i.bottom,
    x: i.left,
    y: i.top
  };
}, g1 = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 0,
  height: 0,
  brushBottom: 0
}, Xh = () => {
  var e;
  return (e = z(Me)) !== null && e !== void 0 ? e : g1;
}, gu = () => z(Gt), yu = () => z(qt), y1 = () => z((e) => e.layout.margin), le = (e) => e.layout.layoutType, sn = () => z(le), bu = () => {
  var e = sn();
  if (e === "horizontal" || e === "vertical")
    return e;
}, Zh = (e) => {
  var t = e.layout.layoutType;
  if (t === "centric" || t === "radial")
    return t;
}, b1 = () => {
  var e = sn();
  return e !== void 0;
}, ti = (e) => {
  var t = ue(), r = Fe(), {
    width: n,
    height: i
  } = e, a = pu(), o = n, l = i;
  return a && (o = a.width > 0 ? a.width : n, l = a.height > 0 ? a.height : i), v.useEffect(() => {
    !r && Ct(o) && Ct(l) && t(_w({
      width: o,
      height: l
    }));
  }, [t, r, o, l]), null;
}, Qh = Symbol.for("immer-nothing"), yc = Symbol.for("immer-draftable"), et = Symbol.for("immer-state");
function vt(e, ...t) {
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var zn = Object.getPrototypeOf;
function rn(e) {
  return !!e && !!e[et];
}
function Mr(e) {
  return e ? Jh(e) || Array.isArray(e) || !!e[yc] || !!e.constructor?.[yc] || ri(e) || ro(e) : !1;
}
var x1 = Object.prototype.constructor.toString(), bc = /* @__PURE__ */ new WeakMap();
function Jh(e) {
  if (!e || typeof e != "object")
    return !1;
  const t = Object.getPrototypeOf(e);
  if (t === null || t === Object.prototype)
    return !0;
  const r = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  if (r === Object)
    return !0;
  if (typeof r != "function")
    return !1;
  let n = bc.get(r);
  return n === void 0 && (n = Function.toString.call(r), bc.set(r, n)), n === x1;
}
function ia(e, t, r = !0) {
  to(e) === 0 ? (r ? Reflect.ownKeys(e) : Object.keys(e)).forEach((i) => {
    t(i, e[i], e);
  }) : e.forEach((n, i) => t(i, n, e));
}
function to(e) {
  const t = e[et];
  return t ? t.type_ : Array.isArray(e) ? 1 : ri(e) ? 2 : ro(e) ? 3 : 0;
}
function bl(e, t) {
  return to(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function ep(e, t, r) {
  const n = to(e);
  n === 2 ? e.set(t, r) : n === 3 ? e.add(r) : e[t] = r;
}
function w1(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function ri(e) {
  return e instanceof Map;
}
function ro(e) {
  return e instanceof Set;
}
function yr(e) {
  return e.copy_ || e.base_;
}
function xl(e, t) {
  if (ri(e))
    return new Map(e);
  if (ro(e))
    return new Set(e);
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  const r = Jh(e);
  if (t === !0 || t === "class_only" && !r) {
    const n = Object.getOwnPropertyDescriptors(e);
    delete n[et];
    let i = Reflect.ownKeys(n);
    for (let a = 0; a < i.length; a++) {
      const o = i[a], l = n[o];
      l.writable === !1 && (l.writable = !0, l.configurable = !0), (l.get || l.set) && (n[o] = {
        configurable: !0,
        writable: !0,
        // could live with !!desc.set as well here...
        enumerable: l.enumerable,
        value: e[o]
      });
    }
    return Object.create(zn(e), n);
  } else {
    const n = zn(e);
    if (n !== null && r)
      return { ...e };
    const i = Object.create(n);
    return Object.assign(i, e);
  }
}
function xu(e, t = !1) {
  return no(e) || rn(e) || !Mr(e) || (to(e) > 1 && Object.defineProperties(e, {
    set: Oi,
    add: Oi,
    clear: Oi,
    delete: Oi
  }), Object.freeze(e), t && Object.values(e).forEach((r) => xu(r, !0))), e;
}
function P1() {
  vt(2);
}
var Oi = {
  value: P1
};
function no(e) {
  return e === null || typeof e != "object" ? !0 : Object.isFrozen(e);
}
var O1 = {};
function Tr(e) {
  const t = O1[e];
  return t || vt(0, e), t;
}
var Bn;
function tp() {
  return Bn;
}
function A1(e, t) {
  return {
    drafts_: [],
    parent_: e,
    immer_: t,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0
  };
}
function xc(e, t) {
  t && (Tr("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function wl(e) {
  Pl(e), e.drafts_.forEach(S1), e.drafts_ = null;
}
function Pl(e) {
  e === Bn && (Bn = e.parent_);
}
function wc(e) {
  return Bn = A1(Bn, e);
}
function S1(e) {
  const t = e[et];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function Pc(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const r = t.drafts_[0];
  return e !== void 0 && e !== r ? (r[et].modified_ && (wl(t), vt(4)), Mr(e) && (e = aa(t, e), t.parent_ || oa(t, e)), t.patches_ && Tr("Patches").generateReplacementPatches_(
    r[et].base_,
    e,
    t.patches_,
    t.inversePatches_
  )) : e = aa(t, r, []), wl(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== Qh ? e : void 0;
}
function aa(e, t, r) {
  if (no(t))
    return t;
  const n = e.immer_.shouldUseStrictIteration(), i = t[et];
  if (!i)
    return ia(
      t,
      (a, o) => Oc(e, i, t, a, o, r),
      n
    ), t;
  if (i.scope_ !== e)
    return t;
  if (!i.modified_)
    return oa(e, i.base_, !0), i.base_;
  if (!i.finalized_) {
    i.finalized_ = !0, i.scope_.unfinalizedDrafts_--;
    const a = i.copy_;
    let o = a, l = !1;
    i.type_ === 3 && (o = new Set(a), a.clear(), l = !0), ia(
      o,
      (u, s) => Oc(
        e,
        i,
        a,
        u,
        s,
        r,
        l
      ),
      n
    ), oa(e, a, !1), r && e.patches_ && Tr("Patches").generatePatches_(
      i,
      r,
      e.patches_,
      e.inversePatches_
    );
  }
  return i.copy_;
}
function Oc(e, t, r, n, i, a, o) {
  if (i == null || typeof i != "object" && !o)
    return;
  const l = no(i);
  if (!(l && !o)) {
    if (rn(i)) {
      const u = a && t && t.type_ !== 3 && // Set objects are atomic since they have no keys.
      !bl(t.assigned_, n) ? a.concat(n) : void 0, s = aa(e, i, u);
      if (ep(r, n, s), rn(s))
        e.canAutoFreeze_ = !1;
      else
        return;
    } else o && r.add(i);
    if (Mr(i) && !l) {
      if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1 || t && t.base_ && t.base_[n] === i && l)
        return;
      aa(e, i), (!t || !t.scope_.parent_) && typeof n != "symbol" && (ri(r) ? r.has(n) : Object.prototype.propertyIsEnumerable.call(r, n)) && oa(e, i);
    }
  }
}
function oa(e, t, r = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && xu(t, r);
}
function _1(e, t) {
  const r = Array.isArray(e), n = {
    type_: r ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : tp(),
    // True for both shallow and deep changes.
    modified_: !1,
    // Used during finalization.
    finalized_: !1,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: t,
    // The base state.
    base_: e,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: !1
  };
  let i = n, a = wu;
  r && (i = [n], a = Fn);
  const { revoke: o, proxy: l } = Proxy.revocable(i, a);
  return n.draft_ = l, n.revoke_ = o, l;
}
var wu = {
  get(e, t) {
    if (t === et)
      return e;
    const r = yr(e);
    if (!bl(r, t))
      return k1(e, r, t);
    const n = r[t];
    return e.finalized_ || !Mr(n) ? n : n === Co(e.base_, t) ? (jo(e), e.copy_[t] = Al(n, e)) : n;
  },
  has(e, t) {
    return t in yr(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(yr(e));
  },
  set(e, t, r) {
    const n = rp(yr(e), t);
    if (n?.set)
      return n.set.call(e.draft_, r), !0;
    if (!e.modified_) {
      const i = Co(yr(e), t), a = i?.[et];
      if (a && a.base_ === r)
        return e.copy_[t] = r, e.assigned_[t] = !1, !0;
      if (w1(r, i) && (r !== void 0 || bl(e.base_, t)))
        return !0;
      jo(e), Ol(e);
    }
    return e.copy_[t] === r && // special case: handle new props with value 'undefined'
    (r !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(r) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = r, e.assigned_[t] = !0), !0;
  },
  deleteProperty(e, t) {
    return Co(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_[t] = !1, jo(e), Ol(e)) : delete e.assigned_[t], e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const r = yr(e), n = Reflect.getOwnPropertyDescriptor(r, t);
    return n && {
      writable: !0,
      configurable: e.type_ !== 1 || t !== "length",
      enumerable: n.enumerable,
      value: r[t]
    };
  },
  defineProperty() {
    vt(11);
  },
  getPrototypeOf(e) {
    return zn(e.base_);
  },
  setPrototypeOf() {
    vt(12);
  }
}, Fn = {};
ia(wu, (e, t) => {
  Fn[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
Fn.deleteProperty = function(e, t) {
  return Fn.set.call(this, e, t, void 0);
};
Fn.set = function(e, t, r) {
  return wu.set.call(this, e[0], t, r, e[0]);
};
function Co(e, t) {
  const r = e[et];
  return (r ? yr(r) : e)[t];
}
function k1(e, t, r) {
  const n = rp(t, r);
  return n ? "value" in n ? n.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    n.get?.call(e.draft_)
  ) : void 0;
}
function rp(e, t) {
  if (!(t in e))
    return;
  let r = zn(e);
  for (; r; ) {
    const n = Object.getOwnPropertyDescriptor(r, t);
    if (n)
      return n;
    r = zn(r);
  }
}
function Ol(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && Ol(e.parent_));
}
function jo(e) {
  e.copy_ || (e.copy_ = xl(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var E1 = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.useStrictIteration_ = !0, this.produce = (t, r, n) => {
      if (typeof t == "function" && typeof r != "function") {
        const a = r;
        r = t;
        const o = this;
        return function(u = a, ...s) {
          return o.produce(u, (c) => r.call(this, c, ...s));
        };
      }
      typeof r != "function" && vt(6), n !== void 0 && typeof n != "function" && vt(7);
      let i;
      if (Mr(t)) {
        const a = wc(this), o = Al(t, void 0);
        let l = !0;
        try {
          i = r(o), l = !1;
        } finally {
          l ? wl(a) : Pl(a);
        }
        return xc(a, n), Pc(i, a);
      } else if (!t || typeof t != "object") {
        if (i = r(t), i === void 0 && (i = t), i === Qh && (i = void 0), this.autoFreeze_ && xu(i, !0), n) {
          const a = [], o = [];
          Tr("Patches").generateReplacementPatches_(t, i, a, o), n(a, o);
        }
        return i;
      } else
        vt(1, t);
    }, this.produceWithPatches = (t, r) => {
      if (typeof t == "function")
        return (o, ...l) => this.produceWithPatches(o, (u) => t(u, ...l));
      let n, i;
      return [this.produce(t, r, (o, l) => {
        n = o, i = l;
      }), n, i];
    }, typeof e?.autoFreeze == "boolean" && this.setAutoFreeze(e.autoFreeze), typeof e?.useStrictShallowCopy == "boolean" && this.setUseStrictShallowCopy(e.useStrictShallowCopy), typeof e?.useStrictIteration == "boolean" && this.setUseStrictIteration(e.useStrictIteration);
  }
  createDraft(e) {
    Mr(e) || vt(8), rn(e) && (e = C1(e));
    const t = wc(this), r = Al(e, void 0);
    return r[et].isManual_ = !0, Pl(t), r;
  }
  finishDraft(e, t) {
    const r = e && e[et];
    (!r || !r.isManual_) && vt(9);
    const { scope_: n } = r;
    return xc(n, t), Pc(void 0, n);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  /**
   * Pass false to use faster iteration that skips non-enumerable properties
   * but still handles symbols for compatibility.
   *
   * By default, strict iteration is enabled (includes all own properties).
   */
  setUseStrictIteration(e) {
    this.useStrictIteration_ = e;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(e, t) {
    let r;
    for (r = t.length - 1; r >= 0; r--) {
      const i = t[r];
      if (i.path.length === 0 && i.op === "replace") {
        e = i.value;
        break;
      }
    }
    r > -1 && (t = t.slice(r + 1));
    const n = Tr("Patches").applyPatches_;
    return rn(e) ? n(e, t) : this.produce(
      e,
      (i) => n(i, t)
    );
  }
};
function Al(e, t) {
  const r = ri(e) ? Tr("MapSet").proxyMap_(e, t) : ro(e) ? Tr("MapSet").proxySet_(e, t) : _1(e, t);
  return (t ? t.scope_ : tp()).drafts_.push(r), r;
}
function C1(e) {
  return rn(e) || vt(10, e), np(e);
}
function np(e) {
  if (!Mr(e) || no(e))
    return e;
  const t = e[et];
  let r, n = !0;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, r = xl(e, t.scope_.immer_.useStrictShallowCopy_), n = t.scope_.immer_.shouldUseStrictIteration();
  } else
    r = xl(e, !0);
  return ia(
    r,
    (i, a) => {
      ep(r, i, np(a));
    },
    n
  ), t && (t.finalized_ = !1), r;
}
var j1 = new E1();
j1.produce;
var I1 = {
  settings: {
    layout: "horizontal",
    align: "center",
    verticalAlign: "middle",
    itemSorter: "value"
  },
  size: {
    width: 0,
    height: 0
  },
  payload: []
}, ip = Re({
  name: "legend",
  initialState: I1,
  reducers: {
    setLegendSize(e, t) {
      e.size.width = t.payload.width, e.size.height = t.payload.height;
    },
    setLegendSettings(e, t) {
      e.settings.align = t.payload.align, e.settings.layout = t.payload.layout, e.settings.verticalAlign = t.payload.verticalAlign, e.settings.itemSorter = t.payload.itemSorter;
    },
    addLegendPayload: {
      reducer(e, t) {
        e.payload.push(t.payload);
      },
      prepare: ie()
    },
    replaceLegendPayload: {
      reducer(e, t) {
        var {
          prev: r,
          next: n
        } = t.payload, i = ot(e).payload.indexOf(r);
        i > -1 && (e.payload[i] = n);
      },
      prepare: ie()
    },
    removeLegendPayload: {
      reducer(e, t) {
        var r = ot(e).payload.indexOf(t.payload);
        r > -1 && e.payload.splice(r, 1);
      },
      prepare: ie()
    }
  }
}), {
  setLegendSize: Ac,
  setLegendSettings: M1,
  addLegendPayload: T1,
  replaceLegendPayload: D1,
  removeLegendPayload: N1
} = ip.actions, $1 = ip.reducer, Io = { exports: {} }, Mo = {};
var Sc;
function R1() {
  if (Sc) return Mo;
  Sc = 1;
  var e = xv();
  function t(u, s) {
    return u === s && (u !== 0 || 1 / u === 1 / s) || u !== u && s !== s;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useSyncExternalStore, i = e.useRef, a = e.useEffect, o = e.useMemo, l = e.useDebugValue;
  return Mo.useSyncExternalStoreWithSelector = function(u, s, c, f, d) {
    var h = i(null);
    if (h.current === null) {
      var p = { hasValue: !1, value: null };
      h.current = p;
    } else p = h.current;
    h = o(
      function() {
        function m(O) {
          if (!y) {
            if (y = !0, x = O, O = f(O), d !== void 0 && p.hasValue) {
              var P = p.value;
              if (d(P, O))
                return b = P;
            }
            return b = O;
          }
          if (P = b, r(x, O)) return P;
          var _ = f(O);
          return d !== void 0 && d(P, _) ? (x = O, P) : (x = O, b = _);
        }
        var y = !1, x, b, w = c === void 0 ? null : c;
        return [
          function() {
            return m(s());
          },
          w === null ? void 0 : function() {
            return m(w());
          }
        ];
      },
      [s, c, f, d]
    );
    var g = n(u, h[0], h[1]);
    return a(
      function() {
        p.hasValue = !0, p.value = g;
      },
      [g]
    ), l(g), g;
  }, Mo;
}
var _c;
function L1() {
  return _c || (_c = 1, Io.exports = R1()), Io.exports;
}
L1();
function z1(e) {
  e();
}
function B1() {
  let e = null, t = null;
  return {
    clear() {
      e = null, t = null;
    },
    notify() {
      z1(() => {
        let r = e;
        for (; r; )
          r.callback(), r = r.next;
      });
    },
    get() {
      const r = [];
      let n = e;
      for (; n; )
        r.push(n), n = n.next;
      return r;
    },
    subscribe(r) {
      let n = !0;
      const i = t = {
        callback: r,
        next: null,
        prev: t
      };
      return i.prev ? i.prev.next = i : e = i, function() {
        !n || e === null || (n = !1, i.next ? i.next.prev = i.prev : t = i.prev, i.prev ? i.prev.next = i.next : e = i.next);
      };
    }
  };
}
var kc = {
  notify() {
  },
  get: () => []
};
function F1(e, t) {
  let r, n = kc, i = 0, a = !1;
  function o(g) {
    c();
    const m = n.subscribe(g);
    let y = !1;
    return () => {
      y || (y = !0, m(), f());
    };
  }
  function l() {
    n.notify();
  }
  function u() {
    p.onStateChange && p.onStateChange();
  }
  function s() {
    return a;
  }
  function c() {
    i++, r || (r = e.subscribe(u), n = B1());
  }
  function f() {
    i--, r && i === 0 && (r(), r = void 0, n.clear(), n = kc);
  }
  function d() {
    a || (a = !0, c());
  }
  function h() {
    a && (a = !1, f());
  }
  const p = {
    addNestedSub: o,
    notifyNestedSubs: l,
    handleChangeWrapper: u,
    isSubscribed: s,
    trySubscribe: d,
    tryUnsubscribe: h,
    getListeners: () => n
  };
  return p;
}
var W1 = () => typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", U1 = /* @__PURE__ */ W1(), K1 = () => typeof navigator < "u" && navigator.product === "ReactNative", H1 = /* @__PURE__ */ K1(), G1 = () => U1 || H1 ? v.useLayoutEffect : v.useEffect, q1 = /* @__PURE__ */ G1();
function Ec(e, t) {
  return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function Y1(e, t) {
  if (Ec(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  const r = Object.keys(e), n = Object.keys(t);
  if (r.length !== n.length) return !1;
  for (let i = 0; i < r.length; i++)
    if (!Object.prototype.hasOwnProperty.call(t, r[i]) || !Ec(e[r[i]], t[r[i]]))
      return !1;
  return !0;
}
var V1 = /* @__PURE__ */ Symbol.for("react-redux-context"), X1 = typeof globalThis < "u" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function Z1() {
  if (!v.createContext) return {};
  const e = X1[V1] ??= /* @__PURE__ */ new Map();
  let t = e.get(v.createContext);
  return t || (t = v.createContext(
    null
  ), e.set(v.createContext, t)), t;
}
var Q1 = /* @__PURE__ */ Z1();
function J1(e) {
  const { children: t, context: r, serverState: n, store: i } = e, a = v.useMemo(() => {
    const u = F1(i);
    return {
      store: i,
      subscription: u,
      getServerState: n ? () => n : void 0
    };
  }, [i, n]), o = v.useMemo(() => i.getState(), [i]);
  q1(() => {
    const { subscription: u } = a;
    return u.onStateChange = u.notifyNestedSubs, u.trySubscribe(), o !== i.getState() && u.notifyNestedSubs(), () => {
      u.tryUnsubscribe(), u.onStateChange = void 0;
    };
  }, [a, o]);
  const l = r || Q1;
  return /* @__PURE__ */ v.createElement(l.Provider, { value: a }, t);
}
var eP = J1, tP = /* @__PURE__ */ new Set([
  "axisLine",
  "tickLine",
  "activeBar",
  "activeDot",
  "activeLabel",
  "activeShape",
  "allowEscapeViewBox",
  "background",
  "cursor",
  "dot",
  "label",
  "line",
  "margin",
  "padding",
  "position",
  "shape",
  "style",
  "tick",
  "wrapperStyle",
  // radius can be an array of 4 numbers, easy to compare shallowly
  "radius",
  "throttledEvents"
]);
function rP(e, t) {
  return e == null && t == null ? !0 : typeof e == "number" && typeof t == "number" ? e === t || e !== e && t !== t : e === t;
}
function ni(e, t) {
  var r = /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)]);
  for (var n of r)
    if (tP.has(n)) {
      if (e[n] == null && t[n] == null)
        continue;
      if (!Y1(e[n], t[n]))
        return !1;
    } else if (!rP(e[n], t[n]))
      return !1;
  return !0;
}
var nP = ["contextPayload"];
function Sl() {
  return Sl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Sl.apply(null, arguments);
}
function Cc(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function nn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Cc(Object(r), !0).forEach(function(n) {
      iP(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Cc(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function iP(e, t, r) {
  return (t = aP(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function aP(e) {
  var t = oP(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function oP(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function lP(e, t) {
  if (e == null) return {};
  var r, n, i = uP(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function uP(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function sP(e) {
  return e.value;
}
function cP(e) {
  var {
    contextPayload: t
  } = e, r = lP(e, nP), n = lh(t, e.payloadUniqBy, sP), i = nn(nn({}, r), {}, {
    payload: n
  });
  return /* @__PURE__ */ v.isValidElement(e.content) ? /* @__PURE__ */ v.cloneElement(e.content, i) : typeof e.content == "function" ? /* @__PURE__ */ v.createElement(e.content, i) : /* @__PURE__ */ v.createElement(v0, i);
}
function fP(e, t, r, n, i, a) {
  var {
    layout: o,
    align: l,
    verticalAlign: u
  } = t, s, c;
  return (!e || (e.left === void 0 || e.left === null) && (e.right === void 0 || e.right === null)) && (l === "center" && o === "vertical" ? s = {
    left: ((n || 0) - a.width) / 2
  } : s = l === "right" ? {
    right: r && r.right || 0
  } : {
    left: r && r.left || 0
  }), (!e || (e.top === void 0 || e.top === null) && (e.bottom === void 0 || e.bottom === null)) && (u === "middle" ? c = {
    top: ((i || 0) - a.height) / 2
  } : c = u === "bottom" ? {
    bottom: r && r.bottom || 0
  } : {
    top: r && r.top || 0
  }), nn(nn({}, s), c);
}
function dP(e) {
  var t = ue();
  return v.useEffect(() => {
    t(M1(e));
  }, [t, e]), null;
}
function vP(e) {
  var t = ue();
  return v.useEffect(() => (t(Ac(e)), () => {
    t(Ac({
      width: 0,
      height: 0
    }));
  }), [t, e]), null;
}
function hP(e, t, r, n) {
  return e === "vertical" && t != null ? {
    height: t
  } : e === "horizontal" ? {
    width: r || n
  } : null;
}
var pP = {
  align: "center",
  iconSize: 14,
  inactiveColor: "#ccc",
  itemSorter: "value",
  layout: "horizontal",
  verticalAlign: "bottom"
};
function mP(e) {
  var t = Be(e, pP), r = _x(), n = ub(), i = y1(), {
    width: a,
    height: o,
    wrapperStyle: l,
    portal: u
  } = t, [s, c] = fh([r]), f = gu(), d = yu();
  if (f == null || d == null)
    return null;
  var h = f - (i?.left || 0) - (i?.right || 0), p = hP(t.layout, o, a, h), g = u ? l : nn(nn({
    position: "absolute",
    width: p?.width || a || "auto",
    height: p?.height || o || "auto"
  }, fP(l, t, i, f, d, s)), l), m = u ?? n;
  if (m == null || r == null)
    return null;
  var y = /* @__PURE__ */ v.createElement("div", {
    className: "recharts-legend-wrapper",
    style: g,
    ref: c
  }, /* @__PURE__ */ v.createElement(dP, {
    layout: t.layout,
    align: t.align,
    verticalAlign: t.verticalAlign,
    itemSorter: t.itemSorter
  }), !u && /* @__PURE__ */ v.createElement(vP, {
    width: s.width,
    height: s.height
  }), /* @__PURE__ */ v.createElement(cP, Sl({}, t, p, {
    margin: i,
    chartWidth: f,
    chartHeight: d,
    contextPayload: r
  })));
  return /* @__PURE__ */ Ql.createPortal(y, m);
}
var ap = /* @__PURE__ */ v.memo(mP, ni);
ap.displayName = "Legend";
function _l() {
  return _l = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, _l.apply(null, arguments);
}
function jc(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function bn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? jc(Object(r), !0).forEach(function(n) {
      gP(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : jc(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function gP(e, t, r) {
  return (t = yP(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function yP(e) {
  var t = bP(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function bP(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function xP(e) {
  return Array.isArray(e) && Ke(e[0]) && Ke(e[1]) ? e.join(" ~ ") : e;
}
var Fr = {
  separator: " : ",
  contentStyle: {
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap"
  },
  itemStyle: {
    display: "block",
    paddingTop: 4,
    paddingBottom: 4,
    color: "#000"
  },
  labelStyle: {},
  accessibilityLayer: !1
};
function wP(e, t) {
  return t == null ? e : Ba(e, t);
}
var PP = (e) => {
  var {
    separator: t = Fr.separator,
    contentStyle: r,
    itemStyle: n,
    labelStyle: i = Fr.labelStyle,
    payload: a,
    formatter: o,
    itemSorter: l,
    wrapperClassName: u,
    labelClassName: s,
    label: c,
    labelFormatter: f,
    accessibilityLayer: d = Fr.accessibilityLayer
  } = e, h = () => {
    if (a && a.length) {
      var O = {
        padding: 0,
        margin: 0
      }, P = wP(a, l), _ = P.map((A, C) => {
        if (A.type === "none")
          return null;
        var T = A.formatter || o || xP, {
          value: I,
          name: k
        } = A, B = I, F = k;
        if (T) {
          var U = T(I, k, A, C, a);
          if (Array.isArray(U))
            [B, F] = U;
          else if (U != null)
            B = U;
          else
            return null;
        }
        var q = bn(bn({}, Fr.itemStyle), {}, {
          color: A.color || Fr.itemStyle.color
        }, n);
        return /* @__PURE__ */ v.createElement("li", {
          className: "recharts-tooltip-item",
          key: "tooltip-item-".concat(C),
          style: q
        }, Ke(F) ? /* @__PURE__ */ v.createElement("span", {
          className: "recharts-tooltip-item-name"
        }, F) : null, Ke(F) ? /* @__PURE__ */ v.createElement("span", {
          className: "recharts-tooltip-item-separator"
        }, t) : null, /* @__PURE__ */ v.createElement("span", {
          className: "recharts-tooltip-item-value"
        }, B), /* @__PURE__ */ v.createElement("span", {
          className: "recharts-tooltip-item-unit"
        }, A.unit || ""));
      });
      return /* @__PURE__ */ v.createElement("ul", {
        className: "recharts-tooltip-item-list",
        style: O
      }, _);
    }
    return null;
  }, p = bn(bn({}, Fr.contentStyle), r), g = bn({
    margin: 0
  }, i), m = !Ie(c), y = m ? c : "", x = J("recharts-default-tooltip", u), b = J("recharts-tooltip-label", s);
  m && f && a !== void 0 && a !== null && (y = f(c, a));
  var w = d ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return /* @__PURE__ */ v.createElement("div", _l({
    className: x,
    style: p
  }, w), /* @__PURE__ */ v.createElement("p", {
    className: b,
    style: g
  }, /* @__PURE__ */ v.isValidElement(y) ? y : "".concat(y)), h());
}, xn = "recharts-tooltip-wrapper", OP = {
  visibility: "hidden"
};
function AP(e) {
  var {
    coordinate: t,
    translateX: r,
    translateY: n
  } = e;
  return J(xn, {
    ["".concat(xn, "-right")]: L(r) && t && L(t.x) && r >= t.x,
    ["".concat(xn, "-left")]: L(r) && t && L(t.x) && r < t.x,
    ["".concat(xn, "-bottom")]: L(n) && t && L(t.y) && n >= t.y,
    ["".concat(xn, "-top")]: L(n) && t && L(t.y) && n < t.y
  });
}
function Ic(e) {
  var {
    allowEscapeViewBox: t,
    coordinate: r,
    key: n,
    offset: i,
    position: a,
    reverseDirection: o,
    tooltipDimension: l,
    viewBox: u,
    viewBoxDimension: s
  } = e;
  if (a && L(a[n]))
    return a[n];
  var c = r[n] - l - (i > 0 ? i : 0), f = r[n] + i;
  if (t[n])
    return o[n] ? c : f;
  var d = u[n];
  if (d == null)
    return 0;
  if (o[n]) {
    var h = c, p = d;
    return h < p ? Math.max(f, d) : Math.max(c, d);
  }
  if (s == null)
    return 0;
  var g = f + l, m = d + s;
  return g > m ? Math.max(c, d) : Math.max(f, d);
}
function SP(e) {
  var {
    translateX: t,
    translateY: r,
    useTranslate3d: n
  } = e;
  return {
    transform: n ? "translate3d(".concat(t, "px, ").concat(r, "px, 0)") : "translate(".concat(t, "px, ").concat(r, "px)")
  };
}
function _P(e) {
  var {
    allowEscapeViewBox: t,
    coordinate: r,
    offsetTop: n,
    offsetLeft: i,
    position: a,
    reverseDirection: o,
    tooltipBox: l,
    useTranslate3d: u,
    viewBox: s
  } = e, c, f, d;
  return l.height > 0 && l.width > 0 && r ? (f = Ic({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "x",
    offset: i,
    position: a,
    reverseDirection: o,
    tooltipDimension: l.width,
    viewBox: s,
    viewBoxDimension: s.width
  }), d = Ic({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "y",
    offset: n,
    position: a,
    reverseDirection: o,
    tooltipDimension: l.height,
    viewBox: s,
    viewBoxDimension: s.height
  }), c = SP({
    translateX: f,
    translateY: d,
    useTranslate3d: u
  })) : c = OP, {
    cssProperties: c,
    cssClasses: AP({
      translateX: f,
      translateY: d,
      coordinate: r
    })
  };
}
var kP = () => !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout), ii = {
  isSsr: kP()
};
function op() {
  var [e, t] = v.useState(() => ii.isSsr || !window.matchMedia ? !1 : window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  return v.useEffect(() => {
    if (window.matchMedia) {
      var r = window.matchMedia("(prefers-reduced-motion: reduce)"), n = () => {
        t(r.matches);
      };
      return r.addEventListener("change", n), () => {
        r.removeEventListener("change", n);
      };
    }
  }, []), e;
}
function Mc(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Wr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Mc(Object(r), !0).forEach(function(n) {
      EP(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Mc(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function EP(e, t, r) {
  return (t = CP(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function CP(e) {
  var t = jP(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function jP(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function IP(e) {
  if (!(e.prefersReducedMotion && e.isAnimationActive === "auto") && e.isAnimationActive && e.active)
    return "transform ".concat(e.animationDuration, "ms ").concat(e.animationEasing);
}
function MP(e) {
  var t, r, n, i, a, o, l = op(), [u, s] = v.useState(() => ({
    dismissed: !1,
    dismissedAtCoordinate: {
      x: 0,
      y: 0
    }
  }));
  v.useEffect(() => {
    var p = (g) => {
      if (g.key === "Escape") {
        var m, y, x, b;
        s({
          dismissed: !0,
          dismissedAtCoordinate: {
            x: (m = (y = e.coordinate) === null || y === void 0 ? void 0 : y.x) !== null && m !== void 0 ? m : 0,
            y: (x = (b = e.coordinate) === null || b === void 0 ? void 0 : b.y) !== null && x !== void 0 ? x : 0
          }
        });
      }
    };
    return document.addEventListener("keydown", p), () => {
      document.removeEventListener("keydown", p);
    };
  }, [(t = e.coordinate) === null || t === void 0 ? void 0 : t.x, (r = e.coordinate) === null || r === void 0 ? void 0 : r.y]), u.dismissed && (((n = (i = e.coordinate) === null || i === void 0 ? void 0 : i.x) !== null && n !== void 0 ? n : 0) !== u.dismissedAtCoordinate.x || ((a = (o = e.coordinate) === null || o === void 0 ? void 0 : o.y) !== null && a !== void 0 ? a : 0) !== u.dismissedAtCoordinate.y) && s(Wr(Wr({}, u), {}, {
    dismissed: !1
  }));
  var {
    cssClasses: c,
    cssProperties: f
  } = _P({
    allowEscapeViewBox: e.allowEscapeViewBox,
    coordinate: e.coordinate,
    offsetLeft: typeof e.offset == "number" ? e.offset : e.offset.x,
    offsetTop: typeof e.offset == "number" ? e.offset : e.offset.y,
    position: e.position,
    reverseDirection: e.reverseDirection,
    tooltipBox: {
      height: e.lastBoundingBox.height,
      width: e.lastBoundingBox.width
    },
    useTranslate3d: e.useTranslate3d,
    viewBox: e.viewBox
  }), d = e.hasPortalFromProps ? {} : Wr(Wr({
    transition: IP({
      prefersReducedMotion: l,
      isAnimationActive: e.isAnimationActive,
      active: e.active,
      animationDuration: e.animationDuration,
      animationEasing: e.animationEasing
    })
  }, f), {}, {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: 0
  }), h = Wr(Wr({}, d), {}, {
    visibility: !u.dismissed && e.active && e.hasPayload ? "visible" : "hidden"
  }, e.wrapperStyle);
  return /* @__PURE__ */ v.createElement("div", {
    // @ts-expect-error typescript library does not recognize xmlns attribute, but it's required for an HTML chunk inside SVG.
    xmlns: "http://www.w3.org/1999/xhtml",
    tabIndex: -1,
    className: c,
    style: h,
    ref: e.innerRef
  }, e.children);
}
var TP = /* @__PURE__ */ v.memo(MP), lp = () => {
  var e;
  return (e = z((t) => t.rootProps.accessibilityLayer)) !== null && e !== void 0 ? e : !0;
};
function kl() {
  return kl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, kl.apply(null, arguments);
}
function Tc(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Dc(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Tc(Object(r), !0).forEach(function(n) {
      DP(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Tc(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function DP(e, t, r) {
  return (t = NP(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function NP(e) {
  var t = $P(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function $P(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Nc = {
  curveBasisClosed: kb,
  curveBasisOpen: Eb,
  curveBasis: _b,
  curveBumpX: db,
  curveBumpY: vb,
  curveLinearClosed: Cb,
  curveLinear: La,
  curveMonotoneX: jb,
  curveMonotoneY: Ib,
  curveNatural: Mb,
  curveStep: Tb,
  curveStepAfter: Nb,
  curveStepBefore: Db
}, la = (e) => G(e.x) && G(e.y), $c = (e) => e.base != null && la(e.base) && la(e), wn = (e) => e.x, Pn = (e) => e.y, RP = (e, t) => {
  if (typeof e == "function")
    return e;
  var r = "curve".concat(Zn(e));
  if ((r === "curveMonotone" || r === "curveBump") && t) {
    var n = Nc["".concat(r).concat(t === "vertical" ? "Y" : "X")];
    if (n)
      return n;
  }
  return Nc[r] || La;
}, Rc = {
  connectNulls: !1,
  type: "linear"
}, LP = (e) => {
  var {
    type: t = Rc.type,
    points: r = [],
    baseLine: n,
    layout: i,
    connectNulls: a = Rc.connectNulls
  } = e, o = RP(t, i), l = a ? r.filter(la) : r;
  if (Array.isArray(n)) {
    var u, s = r.map((p, g) => Dc(Dc({}, p), {}, {
      base: n[g]
    }));
    i === "vertical" ? u = mi().y(Pn).x1(wn).x0((p) => p.base.x) : u = mi().x(wn).y1(Pn).y0((p) => p.base.y);
    var c = u.defined($c).curve(o), f = a ? s.filter($c) : s;
    return c(f);
  }
  var d;
  i === "vertical" && L(n) ? d = mi().y(Pn).x1(wn).x0(n) : L(n) ? d = mi().x(wn).y1(Pn).y0(n) : d = jv().x(wn).y(Pn);
  var h = d.defined(la).curve(o);
  return h(l);
}, Li = (e) => {
  var {
    className: t,
    points: r,
    path: n,
    pathRef: i
  } = e, a = sn();
  if ((!r || !r.length) && !n)
    return null;
  var o = {
    type: e.type,
    points: e.points,
    baseLine: e.baseLine,
    layout: e.layout || a,
    connectNulls: e.connectNulls
  }, l = r && r.length ? LP(o) : n;
  return /* @__PURE__ */ v.createElement("path", kl({}, pt(e), ou(e), {
    className: J("recharts-curve", t),
    d: l === null ? void 0 : l,
    ref: i
  }));
}, zP = ["x", "y", "top", "left", "width", "height", "className"];
function El() {
  return El = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, El.apply(null, arguments);
}
function Lc(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function BP(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Lc(Object(r), !0).forEach(function(n) {
      FP(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Lc(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function FP(e, t, r) {
  return (t = WP(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function WP(e) {
  var t = UP(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function UP(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function KP(e, t) {
  if (e == null) return {};
  var r, n, i = HP(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function HP(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var GP = (e, t, r, n, i, a) => "M".concat(e, ",").concat(i, "v").concat(n, "M").concat(a, ",").concat(t, "h").concat(r), qP = (e) => {
  var {
    x: t = 0,
    y: r = 0,
    top: n = 0,
    left: i = 0,
    width: a = 0,
    height: o = 0,
    className: l
  } = e, u = KP(e, zP), s = BP({
    x: t,
    y: r,
    top: n,
    left: i,
    width: a,
    height: o
  }, u);
  return !L(t) || !L(r) || !L(a) || !L(o) || !L(n) || !L(i) ? null : /* @__PURE__ */ v.createElement("path", El({}, qe(s), {
    className: J("recharts-cross", l),
    d: GP(t, r, a, o, n, i)
  }));
};
function YP(e, t, r, n) {
  var i = n / 2;
  return {
    stroke: "none",
    fill: "#ccc",
    x: e === "horizontal" ? t.x - i : r.left + 0.5,
    y: e === "horizontal" ? r.top + 0.5 : t.y - i,
    width: e === "horizontal" ? n : r.width - 1,
    height: e === "horizontal" ? r.height - 1 : n
  };
}
function zc(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Bc(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zc(Object(r), !0).forEach(function(n) {
      VP(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : zc(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function VP(e, t, r) {
  return (t = XP(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function XP(e) {
  var t = ZP(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function ZP(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var QP = (e) => e.replace(/([A-Z])/g, (t) => "-".concat(t.toLowerCase())), JP = (e, t, r) => e.map((n) => "".concat(QP(n), " ").concat(t, "ms ").concat(r)).join(","), eO = (e, t) => [Object.keys(e), Object.keys(t)].reduce((r, n) => r.filter((i) => n.includes(i))), Wn = (e, t) => Object.keys(t).reduce((r, n) => Bc(Bc({}, r), {}, {
  [n]: e(n, t[n])
}), {});
function Fc(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function me(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Fc(Object(r), !0).forEach(function(n) {
      tO(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Fc(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function tO(e, t, r) {
  return (t = rO(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function rO(e) {
  var t = nO(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function nO(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ua = (e, t, r) => e + (t - e) * r, Cl = (e) => {
  var {
    from: t,
    to: r
  } = e;
  return t !== r;
}, up = (e, t, r) => {
  var n = Wn((i, a) => {
    if (Cl(a)) {
      var [o, l] = e(a.from, a.to, a.velocity);
      return me(me({}, a), {}, {
        from: o,
        velocity: l
      });
    }
    return a;
  }, t);
  return r < 1 ? Wn((i, a) => Cl(a) && n[i] != null ? me(me({}, a), {}, {
    velocity: ua(a.velocity, n[i].velocity, r),
    from: ua(a.from, n[i].from, r)
  }) : a, t) : up(e, n, r - 1);
};
function iO(e, t, r, n, i, a) {
  var o, l = n.reduce((d, h) => me(me({}, d), {}, {
    [h]: {
      from: e[h],
      velocity: 0,
      to: t[h]
    }
  }), {}), u = () => Wn((d, h) => h.from, l), s = () => !Object.values(l).filter(Cl).length, c = null, f = (d) => {
    o || (o = d);
    var h = d - o, p = h / r.dt;
    l = up(r, l, p), i(me(me(me({}, e), t), u())), o = d, s() || (c = a.setTimeout(f));
  };
  return () => (c = a.setTimeout(f), () => {
    var d;
    (d = c) === null || d === void 0 || d();
  });
}
function aO(e, t, r, n, i, a, o) {
  var l = null, u = i.reduce((f, d) => {
    var h = e[d], p = t[d];
    return h == null || p == null ? f : me(me({}, f), {}, {
      [d]: [h, p]
    });
  }, {}), s, c = (f) => {
    s || (s = f);
    var d = (f - s) / n, h = Wn((g, m) => ua(...m, r(d)), u);
    if (a(me(me(me({}, e), t), h)), d < 1)
      l = o.setTimeout(c);
    else {
      var p = Wn((g, m) => ua(...m, r(1)), u);
      a(me(me(me({}, e), t), p));
    }
  };
  return () => (l = o.setTimeout(c), () => {
    var f;
    (f = l) === null || f === void 0 || f();
  });
}
const oO = (e, t, r, n, i, a) => {
  var o = eO(e, t);
  return r == null ? () => (i(me(me({}, e), t)), () => {
  }) : r.isStepper === !0 ? iO(e, t, r, o, i, a) : aO(e, t, r, n, o, i, a);
};
var sa = 1e-4, sp = (e, t) => [0, 3 * e, 3 * t - 6 * e, 3 * e - 3 * t + 1], cp = (e, t) => e.map((r, n) => r * t ** n).reduce((r, n) => r + n), Wc = (e, t) => (r) => {
  var n = sp(e, t);
  return cp(n, r);
}, lO = (e, t) => (r) => {
  var n = sp(e, t), i = [...n.map((a, o) => a * o).slice(1), 0];
  return cp(i, r);
}, uO = (e) => {
  var t, r = e.split("(");
  if (r.length !== 2 || r[0] !== "cubic-bezier")
    return null;
  var n = (t = r[1]) === null || t === void 0 || (t = t.split(")")[0]) === null || t === void 0 ? void 0 : t.split(",");
  if (n == null || n.length !== 4)
    return null;
  var i = n.map((a) => parseFloat(a));
  return [i[0], i[1], i[2], i[3]];
}, sO = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  if (r.length === 1)
    switch (r[0]) {
      case "linear":
        return [0, 0, 1, 1];
      case "ease":
        return [0.25, 0.1, 0.25, 1];
      case "ease-in":
        return [0.42, 0, 1, 1];
      case "ease-out":
        return [0.42, 0, 0.58, 1];
      case "ease-in-out":
        return [0, 0, 0.58, 1];
      default: {
        var i = uO(r[0]);
        if (i)
          return i;
      }
    }
  return r.length === 4 ? r : [0, 0, 1, 1];
}, cO = (e, t, r, n) => {
  var i = Wc(e, r), a = Wc(t, n), o = lO(e, r), l = (s) => s > 1 ? 1 : s < 0 ? 0 : s, u = (s) => {
    for (var c = s > 1 ? 1 : s, f = c, d = 0; d < 8; ++d) {
      var h = i(f) - c, p = o(f);
      if (Math.abs(h - c) < sa || p < sa)
        return a(f);
      f = l(f - h / p);
    }
    return a(f);
  };
  return u.isStepper = !1, u;
}, Uc = function() {
  return cO(...sO(...arguments));
}, fO = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, {
    stiff: r = 100,
    damping: n = 8,
    dt: i = 17
  } = t, a = (o, l, u) => {
    var s = -(o - l) * r, c = u * n, f = u + (s - c) * i / 1e3, d = u * i / 1e3 + o;
    return Math.abs(d - l) < sa && Math.abs(f) < sa ? [l, 0] : [d, f];
  };
  return a.isStepper = !0, a.dt = i, a;
}, dO = (e) => {
  if (typeof e == "string")
    switch (e) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return Uc(e);
      case "spring":
        return fO();
      default:
        if (e.split("(")[0] === "cubic-bezier")
          return Uc(e);
    }
  return typeof e == "function" ? e : null;
};
function vO(e) {
  var t, r = () => null, n = !1, i = null, a = (o) => {
    if (!n) {
      if (Array.isArray(o)) {
        if (!o.length)
          return;
        var l = o, [u, ...s] = l;
        if (typeof u == "number") {
          i = e.setTimeout(a.bind(null, s), u);
          return;
        }
        a(u), i = e.setTimeout(a.bind(null, s));
        return;
      }
      typeof o == "string" && (t = o, r(t)), typeof o == "object" && (t = o, r(t)), typeof o == "function" && o();
    }
  };
  return {
    stop: () => {
      n = !0;
    },
    start: (o) => {
      n = !1, i && (i(), i = null), a(o);
    },
    subscribe: (o) => (r = o, () => {
      r = () => null;
    }),
    getTimeoutController: () => e
  };
}
class hO {
  setTimeout(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = performance.now(), i = null, a = (o) => {
      o - n >= r ? t(o) : typeof requestAnimationFrame == "function" && (i = requestAnimationFrame(a));
    };
    return i = requestAnimationFrame(a), () => {
      i != null && cancelAnimationFrame(i);
    };
  }
}
function pO() {
  return vO(new hO());
}
var mO = /* @__PURE__ */ v.createContext(pO);
function gO(e, t) {
  var r = v.useContext(mO);
  return v.useMemo(() => t ?? r(e), [e, t, r]);
}
var yO = {
  begin: 0,
  duration: 1e3,
  easing: "ease",
  isActive: !0,
  canBegin: !0,
  onAnimationEnd: () => {
  },
  onAnimationStart: () => {
  }
}, Kc = {
  t: 0
}, To = {
  t: 1
};
function fp(e) {
  var t = Be(e, yO), {
    isActive: r,
    canBegin: n,
    duration: i,
    easing: a,
    begin: o,
    onAnimationEnd: l,
    onAnimationStart: u,
    children: s
  } = t, c = op(), f = r === "auto" ? !ii.isSsr && !c : r, d = gO(t.animationId, t.animationManager), [h, p] = v.useState(f ? Kc : To), g = v.useRef(null);
  return v.useEffect(() => {
    f || p(To);
  }, [f]), v.useEffect(() => {
    if (!f || !n)
      return Rr;
    var m = oO(Kc, To, dO(a), i, p, d.getTimeoutController()), y = () => {
      g.current = m();
    };
    return d.start([u, o, y, i, l]), () => {
      d.stop(), g.current && g.current(), l();
    };
  }, [f, n, i, a, o, u, l, d]), s(h.t);
}
function dp(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "animation-", r = v.useRef(Nn(t)), n = v.useRef(e);
  return n.current !== e && (r.current = Nn(t), n.current = e), r.current;
}
var bO = ["radius"], xO = ["radius"], Hc, Gc, qc, Yc, Vc, Xc, Zc, Qc, Jc, ef;
function tf(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function rf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? tf(Object(r), !0).forEach(function(n) {
      wO(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : tf(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function wO(e, t, r) {
  return (t = PO(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function PO(e) {
  var t = OO(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function OO(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ca() {
  return ca = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ca.apply(null, arguments);
}
function nf(e, t) {
  if (e == null) return {};
  var r, n, i = AO(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function AO(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function bt(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var af = (e, t, r, n, i) => {
  var a = ir(r), o = ir(n), l = Math.min(Math.abs(a) / 2, Math.abs(o) / 2), u = o >= 0 ? 1 : -1, s = a >= 0 ? 1 : -1, c = o >= 0 && a >= 0 || o < 0 && a < 0 ? 1 : 0, f;
  if (l > 0 && Array.isArray(i)) {
    for (var d = [0, 0, 0, 0], h = 0, p = 4; h < p; h++) {
      var g, m = (g = i[h]) !== null && g !== void 0 ? g : 0;
      d[h] = m > l ? l : m;
    }
    f = ke(Hc || (Hc = bt(["M", ",", ""])), e, t + u * d[0]), d[0] > 0 && (f += ke(Gc || (Gc = bt(["A ", ",", ",0,0,", ",", ",", ""])), d[0], d[0], c, e + s * d[0], t)), f += ke(qc || (qc = bt(["L ", ",", ""])), e + r - s * d[1], t), d[1] > 0 && (f += ke(Yc || (Yc = bt(["A ", ",", ",0,0,", `,
        `, ",", ""])), d[1], d[1], c, e + r, t + u * d[1])), f += ke(Vc || (Vc = bt(["L ", ",", ""])), e + r, t + n - u * d[2]), d[2] > 0 && (f += ke(Xc || (Xc = bt(["A ", ",", ",0,0,", `,
        `, ",", ""])), d[2], d[2], c, e + r - s * d[2], t + n)), f += ke(Zc || (Zc = bt(["L ", ",", ""])), e + s * d[3], t + n), d[3] > 0 && (f += ke(Qc || (Qc = bt(["A ", ",", ",0,0,", `,
        `, ",", ""])), d[3], d[3], c, e, t + n - u * d[3])), f += "Z";
  } else if (l > 0 && i === +i && i > 0) {
    var y = Math.min(l, i);
    f = ke(Jc || (Jc = bt(["M ", ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", " Z"])), e, t + u * y, y, y, c, e + s * y, t, e + r - s * y, t, y, y, c, e + r, t + u * y, e + r, t + n - u * y, y, y, c, e + r - s * y, t + n, e + s * y, t + n, y, y, c, e, t + n - u * y);
  } else
    f = ke(ef || (ef = bt(["M ", ",", " h ", " v ", " h ", " Z"])), e, t, r, n, -r);
  return f;
}, of = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  radius: 0,
  isAnimationActive: !1,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, vp = (e) => {
  var t = Be(e, of), r = v.useRef(null), [n, i] = v.useState(-1);
  v.useEffect(() => {
    if (r.current && r.current.getTotalLength)
      try {
        var V = r.current.getTotalLength();
        V && i(V);
      } catch {
      }
  }, []);
  var {
    x: a,
    y: o,
    width: l,
    height: u,
    radius: s,
    className: c
  } = t, {
    animationEasing: f,
    animationDuration: d,
    animationBegin: h,
    isAnimationActive: p,
    isUpdateAnimationActive: g
  } = t, m = v.useRef(l), y = v.useRef(u), x = v.useRef(a), b = v.useRef(o), w = v.useMemo(() => ({
    x: a,
    y: o,
    width: l,
    height: u,
    radius: s
  }), [a, o, l, u, s]), O = dp(w, "rectangle-");
  if (a !== +a || o !== +o || l !== +l || u !== +u || l === 0 || u === 0)
    return null;
  var P = J("recharts-rectangle", c);
  if (!g) {
    var _ = qe(t), {
      radius: A
    } = _, C = nf(_, bO);
    return /* @__PURE__ */ v.createElement("path", ca({}, C, {
      x: ir(a),
      y: ir(o),
      width: ir(l),
      height: ir(u),
      radius: typeof s == "number" ? s : void 0,
      className: P,
      d: af(a, o, l, u, s)
    }));
  }
  var T = m.current, I = y.current, k = x.current, B = b.current, F = "0px ".concat(n === -1 ? 1 : n, "px"), U = "".concat(n, "px ").concat(n, "px"), q = JP(["strokeDasharray"], d, typeof f == "string" ? f : of.animationEasing);
  return /* @__PURE__ */ v.createElement(fp, {
    animationId: O,
    key: O,
    canBegin: n > 0,
    duration: d,
    easing: f,
    isActive: g,
    begin: h
  }, (V) => {
    var re = Ot(T, l, V), Q = Ot(I, u, V), M = Ot(k, a, V), Le = Ot(B, o, V);
    r.current && (m.current = re, y.current = Q, x.current = M, b.current = Le);
    var se;
    p ? V > 0 ? se = {
      transition: q,
      strokeDasharray: U
    } : se = {
      strokeDasharray: F
    } : se = {
      strokeDasharray: U
    };
    var Ue = qe(t), {
      radius: be
    } = Ue, ne = nf(Ue, xO);
    return /* @__PURE__ */ v.createElement("path", ca({}, ne, {
      radius: typeof s == "number" ? s : void 0,
      className: P,
      d: af(M, Le, re, Q, s),
      ref: r,
      style: rf(rf({}, se), t.style)
    }));
  });
};
function lf(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function uf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? lf(Object(r), !0).forEach(function(n) {
      SO(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : lf(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function SO(e, t, r) {
  return (t = _O(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function _O(e) {
  var t = kO(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function kO(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var fa = Math.PI / 180, EO = (e) => e * 180 / Math.PI, Ce = (e, t, r, n) => ({
  x: e + Math.cos(-fa * n) * r,
  y: t + Math.sin(-fa * n) * r
}), CO = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  return Math.min(Math.abs(t - (n.left || 0) - (n.right || 0)), Math.abs(r - (n.top || 0) - (n.bottom || 0))) / 2;
}, jO = (e, t) => {
  var {
    x: r,
    y: n
  } = e, {
    x: i,
    y: a
  } = t;
  return Math.sqrt((r - i) ** 2 + (n - a) ** 2);
}, IO = (e, t) => {
  var {
    x: r,
    y: n
  } = e, {
    cx: i,
    cy: a
  } = t, o = jO({
    x: r,
    y: n
  }, {
    x: i,
    y: a
  });
  if (o <= 0)
    return {
      radius: o,
      angle: 0
    };
  var l = (r - i) / o, u = Math.acos(l);
  return n > a && (u = 2 * Math.PI - u), {
    radius: o,
    angle: EO(u),
    angleInRadian: u
  };
}, MO = (e) => {
  var {
    startAngle: t,
    endAngle: r
  } = e, n = Math.floor(t / 360), i = Math.floor(r / 360), a = Math.min(n, i);
  return {
    startAngle: t - a * 360,
    endAngle: r - a * 360
  };
}, TO = (e, t) => {
  var {
    startAngle: r,
    endAngle: n
  } = t, i = Math.floor(r / 360), a = Math.floor(n / 360), o = Math.min(i, a);
  return e + o * 360;
}, DO = (e, t) => {
  var {
    relativeX: r,
    relativeY: n
  } = e, {
    radius: i,
    angle: a
  } = IO({
    x: r,
    y: n
  }, t), {
    innerRadius: o,
    outerRadius: l
  } = t;
  if (i < o || i > l || i === 0)
    return null;
  var {
    startAngle: u,
    endAngle: s
  } = MO(t), c = a, f;
  if (u <= s) {
    for (; c > s; )
      c -= 360;
    for (; c < u; )
      c += 360;
    f = c >= u && c <= s;
  } else {
    for (; c > u; )
      c -= 360;
    for (; c < s; )
      c += 360;
    f = c >= s && c <= u;
  }
  return f ? uf(uf({}, t), {}, {
    radius: i,
    angle: TO(c, t)
  }) : null;
};
function hp(e) {
  var {
    cx: t,
    cy: r,
    radius: n,
    startAngle: i,
    endAngle: a
  } = e, o = Ce(t, r, n, i), l = Ce(t, r, n, a);
  return {
    points: [o, l],
    cx: t,
    cy: r,
    radius: n,
    startAngle: i,
    endAngle: a
  };
}
var sf, cf, ff, df, vf, hf, pf;
function jl() {
  return jl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, jl.apply(null, arguments);
}
function wr(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var NO = (e, t) => {
  var r = at(t - e), n = Math.min(Math.abs(t - e), 359.999);
  return r * n;
}, Ai = (e) => {
  var {
    cx: t,
    cy: r,
    radius: n,
    angle: i,
    sign: a,
    isExternal: o,
    cornerRadius: l,
    cornerIsExternal: u
  } = e, s = l * (o ? 1 : -1) + n, c = Math.asin(l / s) / fa, f = u ? i : i + a * c, d = Ce(t, r, s, f), h = Ce(t, r, n, f), p = u ? i - a * c : i, g = Ce(t, r, s * Math.cos(c * fa), p);
  return {
    center: d,
    circleTangency: h,
    lineTangency: g,
    theta: c
  };
}, pp = (e) => {
  var {
    cx: t,
    cy: r,
    innerRadius: n,
    outerRadius: i,
    startAngle: a,
    endAngle: o
  } = e, l = NO(a, o), u = a + l, s = Ce(t, r, i, a), c = Ce(t, r, i, u), f = ke(sf || (sf = wr(["M ", ",", `
    A `, ",", `,0,
    `, ",", `,
    `, ",", `
  `])), s.x, s.y, i, i, +(Math.abs(l) > 180), +(a > u), c.x, c.y);
  if (n > 0) {
    var d = Ce(t, r, n, a), h = Ce(t, r, n, u);
    f += ke(cf || (cf = wr(["L ", ",", `
            A `, ",", `,0,
            `, ",", `,
            `, ",", " Z"])), h.x, h.y, n, n, +(Math.abs(l) > 180), +(a <= u), d.x, d.y);
  } else
    f += ke(ff || (ff = wr(["L ", ",", " Z"])), t, r);
  return f;
}, $O = (e) => {
  var {
    cx: t,
    cy: r,
    innerRadius: n,
    outerRadius: i,
    cornerRadius: a,
    forceCornerRadius: o,
    cornerIsExternal: l,
    startAngle: u,
    endAngle: s
  } = e, c = at(s - u), {
    circleTangency: f,
    lineTangency: d,
    theta: h
  } = Ai({
    cx: t,
    cy: r,
    radius: i,
    angle: u,
    sign: c,
    cornerRadius: a,
    cornerIsExternal: l
  }), {
    circleTangency: p,
    lineTangency: g,
    theta: m
  } = Ai({
    cx: t,
    cy: r,
    radius: i,
    angle: s,
    sign: -c,
    cornerRadius: a,
    cornerIsExternal: l
  }), y = l ? Math.abs(u - s) : Math.abs(u - s) - h - m;
  if (y < 0)
    return o ? ke(df || (df = wr(["M ", ",", `
        a`, ",", ",0,0,1,", `,0
        a`, ",", ",0,0,1,", `,0
      `])), d.x, d.y, a, a, a * 2, a, a, -a * 2) : pp({
      cx: t,
      cy: r,
      innerRadius: n,
      outerRadius: i,
      startAngle: u,
      endAngle: s
    });
  var x = ke(vf || (vf = wr(["M ", ",", `
    A`, ",", ",0,0,", ",", ",", `
    A`, ",", ",0,", ",", ",", ",", `
    A`, ",", ",0,0,", ",", ",", `
  `])), d.x, d.y, a, a, +(c < 0), f.x, f.y, i, i, +(y > 180), +(c < 0), p.x, p.y, a, a, +(c < 0), g.x, g.y);
  if (n > 0) {
    var {
      circleTangency: b,
      lineTangency: w,
      theta: O
    } = Ai({
      cx: t,
      cy: r,
      radius: n,
      angle: u,
      sign: c,
      isExternal: !0,
      cornerRadius: a,
      cornerIsExternal: l
    }), {
      circleTangency: P,
      lineTangency: _,
      theta: A
    } = Ai({
      cx: t,
      cy: r,
      radius: n,
      angle: s,
      sign: -c,
      isExternal: !0,
      cornerRadius: a,
      cornerIsExternal: l
    }), C = l ? Math.abs(u - s) : Math.abs(u - s) - O - A;
    if (C < 0 && a === 0)
      return "".concat(x, "L").concat(t, ",").concat(r, "Z");
    x += ke(hf || (hf = wr(["L", ",", `
      A`, ",", ",0,0,", ",", ",", `
      A`, ",", ",0,", ",", ",", ",", `
      A`, ",", ",0,0,", ",", ",", "Z"])), _.x, _.y, a, a, +(c < 0), P.x, P.y, n, n, +(C > 180), +(c > 0), b.x, b.y, a, a, +(c < 0), w.x, w.y);
  } else
    x += ke(pf || (pf = wr(["L", ",", "Z"])), t, r);
  return x;
}, RO = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: !1,
  cornerIsExternal: !1
}, LO = (e) => {
  var t = Be(e, RO), {
    cx: r,
    cy: n,
    innerRadius: i,
    outerRadius: a,
    cornerRadius: o,
    forceCornerRadius: l,
    cornerIsExternal: u,
    startAngle: s,
    endAngle: c,
    className: f
  } = t;
  if (a < i || s === c)
    return null;
  var d = J("recharts-sector", f), h = a - i, p = lr(o, h, 0, !0), g;
  return p > 0 && Math.abs(s - c) < 360 ? g = $O({
    cx: r,
    cy: n,
    innerRadius: i,
    outerRadius: a,
    cornerRadius: Math.min(p, h / 2),
    forceCornerRadius: l,
    cornerIsExternal: u,
    startAngle: s,
    endAngle: c
  }) : g = pp({
    cx: r,
    cy: n,
    innerRadius: i,
    outerRadius: a,
    startAngle: s,
    endAngle: c
  }), /* @__PURE__ */ v.createElement("path", jl({}, qe(t), {
    className: d,
    d: g
  }));
};
function zO(e, t, r) {
  if (e === "horizontal")
    return [{
      x: t.x,
      y: r.top
    }, {
      x: t.x,
      y: r.top + r.height
    }];
  if (e === "vertical")
    return [{
      x: r.left,
      y: t.y
    }, {
      x: r.left + r.width,
      y: t.y
    }];
  if (qv(t)) {
    if (e === "centric") {
      var {
        cx: n,
        cy: i,
        innerRadius: a,
        outerRadius: o,
        angle: l
      } = t, u = Ce(n, i, a, l), s = Ce(n, i, o, l);
      return [{
        x: u.x,
        y: u.y
      }, {
        x: s.x,
        y: s.y
      }];
    }
    return hp(t);
  }
}
function BO(e) {
  return sh(e) ? NaN : Number(e);
}
function Do(e) {
  return e ? (e = BO(e), e === 1 / 0 || e === -1 / 0 ? (e < 0 ? -1 : 1) * Number.MAX_VALUE : e === e ? e : 0) : e === 0 ? e : 0;
}
function mp(e, t, r) {
  r && typeof r != "number" && ll(e, t, r) && (t = r = void 0), e = Do(e), t === void 0 ? (t = e, e = 0) : t = Do(t), r = r === void 0 ? e < t ? 1 : -1 : Do(r);
  const n = Math.max(Math.ceil((t - e) / (r || 1)), 0), i = new Array(n);
  for (let a = 0; a < n; a++)
    i[a] = e, e += r;
  return i;
}
var Yt = (e) => e.chartData, gp = S([Yt], (e) => {
  var t = e.chartData != null ? e.chartData.length - 1 : 0;
  return {
    chartData: e.chartData,
    computedData: e.computedData,
    dataEndIndex: t,
    dataStartIndex: 0
  };
}), yp = (e, t, r, n) => n ? gp(e) : Yt(e), FO = (e, t, r) => r ? gp(e) : Yt(e);
function _t(e) {
  if (Array.isArray(e) && e.length === 2) {
    var [t, r] = e;
    if (G(t) && G(r))
      return !0;
  }
  return !1;
}
function mf(e, t, r) {
  return r ? e : [Math.min(e[0], t[0]), Math.max(e[1], t[1])];
}
function bp(e, t) {
  if (t && typeof e != "function" && Array.isArray(e) && e.length === 2) {
    var [r, n] = e, i, a;
    if (G(r))
      i = r;
    else if (typeof r == "function")
      return;
    if (G(n))
      a = n;
    else if (typeof n == "function")
      return;
    var o = [i, a];
    if (_t(o))
      return o;
  }
}
function WO(e, t, r) {
  if (!(!r && t == null)) {
    if (typeof e == "function" && t != null)
      try {
        var n = e(t, r);
        if (_t(n))
          return mf(n, t, r);
      } catch {
      }
    if (Array.isArray(e) && e.length === 2) {
      var [i, a] = e, o, l;
      if (i === "auto")
        t != null && (o = Math.min(...t));
      else if (L(i))
        o = i;
      else if (typeof i == "function")
        try {
          t != null && (o = i(t?.[0]));
        } catch {
        }
      else if (typeof i == "string" && dc.test(i)) {
        var u = dc.exec(i);
        if (u == null || u[1] == null || t == null)
          o = void 0;
        else {
          var s = +u[1];
          o = t[0] - s;
        }
      } else
        o = t?.[0];
      if (a === "auto")
        t != null && (l = Math.max(...t));
      else if (L(a))
        l = a;
      else if (typeof a == "function")
        try {
          t != null && (l = a(t?.[1]));
        } catch {
        }
      else if (typeof a == "string" && vc.test(a)) {
        var c = vc.exec(a);
        if (c == null || c[1] == null || t == null)
          l = void 0;
        else {
          var f = +c[1];
          l = t[1] + f;
        }
      } else
        l = t?.[1];
      var d = [o, l];
      if (_t(d))
        return t == null ? d : mf(d, t, r);
    }
  }
}
var cn = 1e9, UO = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed during run-time using `Decimal.config`.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used by default by `toInteger`, `toDecimalPlaces`, `toExponential`,
  // `toFixed`, `toPrecision` and `toSignificantDigits`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -MAX_E
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to MAX_E
  // The natural logarithm of 10.
  // 115 digits
  LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"
}, Ou, oe = !0, st = "[DecimalError] ", _r = st + "Invalid argument: ", Pu = st + "Exponent out of range: ", fn = Math.floor, br = Math.pow, KO = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Xe, we = 1e7, ae = 7, xp = 9007199254740991, da = fn(xp / ae), R = {};
R.absoluteValue = R.abs = function() {
  var e = new this.constructor(this);
  return e.s && (e.s = 1), e;
};
R.comparedTo = R.cmp = function(e) {
  var t, r, n, i, a = this;
  if (e = new a.constructor(e), a.s !== e.s) return a.s || -e.s;
  if (a.e !== e.e) return a.e > e.e ^ a.s < 0 ? 1 : -1;
  for (n = a.d.length, i = e.d.length, t = 0, r = n < i ? n : i; t < r; ++t)
    if (a.d[t] !== e.d[t]) return a.d[t] > e.d[t] ^ a.s < 0 ? 1 : -1;
  return n === i ? 0 : n > i ^ a.s < 0 ? 1 : -1;
};
R.decimalPlaces = R.dp = function() {
  var e = this, t = e.d.length - 1, r = (t - e.e) * ae;
  if (t = e.d[t], t) for (; t % 10 == 0; t /= 10) r--;
  return r < 0 ? 0 : r;
};
R.dividedBy = R.div = function(e) {
  return zt(this, new this.constructor(e));
};
R.dividedToIntegerBy = R.idiv = function(e) {
  var t = this, r = t.constructor;
  return ee(zt(t, new r(e), 0, 1), r.precision);
};
R.equals = R.eq = function(e) {
  return !this.cmp(e);
};
R.exponent = function() {
  return de(this);
};
R.greaterThan = R.gt = function(e) {
  return this.cmp(e) > 0;
};
R.greaterThanOrEqualTo = R.gte = function(e) {
  return this.cmp(e) >= 0;
};
R.isInteger = R.isint = function() {
  return this.e > this.d.length - 2;
};
R.isNegative = R.isneg = function() {
  return this.s < 0;
};
R.isPositive = R.ispos = function() {
  return this.s > 0;
};
R.isZero = function() {
  return this.s === 0;
};
R.lessThan = R.lt = function(e) {
  return this.cmp(e) < 0;
};
R.lessThanOrEqualTo = R.lte = function(e) {
  return this.cmp(e) < 1;
};
R.logarithm = R.log = function(e) {
  var t, r = this, n = r.constructor, i = n.precision, a = i + 5;
  if (e === void 0)
    e = new n(10);
  else if (e = new n(e), e.s < 1 || e.eq(Xe)) throw Error(st + "NaN");
  if (r.s < 1) throw Error(st + (r.s ? "NaN" : "-Infinity"));
  return r.eq(Xe) ? new n(0) : (oe = !1, t = zt(Un(r, a), Un(e, a), a), oe = !0, ee(t, i));
};
R.minus = R.sub = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? Op(t, e) : wp(t, (e.s = -e.s, e));
};
R.modulo = R.mod = function(e) {
  var t, r = this, n = r.constructor, i = n.precision;
  if (e = new n(e), !e.s) throw Error(st + "NaN");
  return r.s ? (oe = !1, t = zt(r, e, 0, 1).times(e), oe = !0, r.minus(t)) : ee(new n(r), i);
};
R.naturalExponential = R.exp = function() {
  return Pp(this);
};
R.naturalLogarithm = R.ln = function() {
  return Un(this);
};
R.negated = R.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s || 0, e;
};
R.plus = R.add = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? wp(t, e) : Op(t, (e.s = -e.s, e));
};
R.precision = R.sd = function(e) {
  var t, r, n, i = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(_r + e);
  if (t = de(i) + 1, n = i.d.length - 1, r = n * ae + 1, n = i.d[n], n) {
    for (; n % 10 == 0; n /= 10) r--;
    for (n = i.d[0]; n >= 10; n /= 10) r++;
  }
  return e && t > r ? t : r;
};
R.squareRoot = R.sqrt = function() {
  var e, t, r, n, i, a, o, l = this, u = l.constructor;
  if (l.s < 1) {
    if (!l.s) return new u(0);
    throw Error(st + "NaN");
  }
  for (e = de(l), oe = !1, i = Math.sqrt(+l), i == 0 || i == 1 / 0 ? (t = St(l.d), (t.length + e) % 2 == 0 && (t += "0"), i = Math.sqrt(t), e = fn((e + 1) / 2) - (e < 0 || e % 2), i == 1 / 0 ? t = "5e" + e : (t = i.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new u(t)) : n = new u(i.toString()), r = u.precision, i = o = r + 3; ; )
    if (a = n, n = a.plus(zt(l, a, o + 2)).times(0.5), St(a.d).slice(0, o) === (t = St(n.d)).slice(0, o)) {
      if (t = t.slice(o - 3, o + 1), i == o && t == "4999") {
        if (ee(a, r + 1, 0), a.times(a).eq(l)) {
          n = a;
          break;
        }
      } else if (t != "9999")
        break;
      o += 4;
    }
  return oe = !0, ee(n, r);
};
R.times = R.mul = function(e) {
  var t, r, n, i, a, o, l, u, s, c = this, f = c.constructor, d = c.d, h = (e = new f(e)).d;
  if (!c.s || !e.s) return new f(0);
  for (e.s *= c.s, r = c.e + e.e, u = d.length, s = h.length, u < s && (a = d, d = h, h = a, o = u, u = s, s = o), a = [], o = u + s, n = o; n--; ) a.push(0);
  for (n = s; --n >= 0; ) {
    for (t = 0, i = u + n; i > n; )
      l = a[i] + h[n] * d[i - n - 1] + t, a[i--] = l % we | 0, t = l / we | 0;
    a[i] = (a[i] + t) % we | 0;
  }
  for (; !a[--o]; ) a.pop();
  return t ? ++r : a.shift(), e.d = a, e.e = r, oe ? ee(e, f.precision) : e;
};
R.toDecimalPlaces = R.todp = function(e, t) {
  var r = this, n = r.constructor;
  return r = new n(r), e === void 0 ? r : (jt(e, 0, cn), t === void 0 ? t = n.rounding : jt(t, 0, 8), ee(r, e + de(r) + 1, t));
};
R.toExponential = function(e, t) {
  var r, n = this, i = n.constructor;
  return e === void 0 ? r = Dr(n, !0) : (jt(e, 0, cn), t === void 0 ? t = i.rounding : jt(t, 0, 8), n = ee(new i(n), e + 1, t), r = Dr(n, !0, e + 1)), r;
};
R.toFixed = function(e, t) {
  var r, n, i = this, a = i.constructor;
  return e === void 0 ? Dr(i) : (jt(e, 0, cn), t === void 0 ? t = a.rounding : jt(t, 0, 8), n = ee(new a(i), e + de(i) + 1, t), r = Dr(n.abs(), !1, e + de(n) + 1), i.isneg() && !i.isZero() ? "-" + r : r);
};
R.toInteger = R.toint = function() {
  var e = this, t = e.constructor;
  return ee(new t(e), de(e) + 1, t.rounding);
};
R.toNumber = function() {
  return +this;
};
R.toPower = R.pow = function(e) {
  var t, r, n, i, a, o, l = this, u = l.constructor, s = 12, c = +(e = new u(e));
  if (!e.s) return new u(Xe);
  if (l = new u(l), !l.s) {
    if (e.s < 1) throw Error(st + "Infinity");
    return l;
  }
  if (l.eq(Xe)) return l;
  if (n = u.precision, e.eq(Xe)) return ee(l, n);
  if (t = e.e, r = e.d.length - 1, o = t >= r, a = l.s, o) {
    if ((r = c < 0 ? -c : c) <= xp) {
      for (i = new u(Xe), t = Math.ceil(n / ae + 4), oe = !1; r % 2 && (i = i.times(l), yf(i.d, t)), r = fn(r / 2), r !== 0; )
        l = l.times(l), yf(l.d, t);
      return oe = !0, e.s < 0 ? new u(Xe).div(i) : ee(i, n);
    }
  } else if (a < 0) throw Error(st + "NaN");
  return a = a < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1, l.s = 1, oe = !1, i = e.times(Un(l, n + s)), oe = !0, i = Pp(i), i.s = a, i;
};
R.toPrecision = function(e, t) {
  var r, n, i = this, a = i.constructor;
  return e === void 0 ? (r = de(i), n = Dr(i, r <= a.toExpNeg || r >= a.toExpPos)) : (jt(e, 1, cn), t === void 0 ? t = a.rounding : jt(t, 0, 8), i = ee(new a(i), e, t), r = de(i), n = Dr(i, e <= r || r <= a.toExpNeg, e)), n;
};
R.toSignificantDigits = R.tosd = function(e, t) {
  var r = this, n = r.constructor;
  return e === void 0 ? (e = n.precision, t = n.rounding) : (jt(e, 1, cn), t === void 0 ? t = n.rounding : jt(t, 0, 8)), ee(new n(r), e, t);
};
R.toString = R.valueOf = R.val = R.toJSON = R[Symbol.for("nodejs.util.inspect.custom")] = function() {
  var e = this, t = de(e), r = e.constructor;
  return Dr(e, t <= r.toExpNeg || t >= r.toExpPos);
};
function wp(e, t) {
  var r, n, i, a, o, l, u, s, c = e.constructor, f = c.precision;
  if (!e.s || !t.s)
    return t.s || (t = new c(e)), oe ? ee(t, f) : t;
  if (u = e.d, s = t.d, o = e.e, i = t.e, u = u.slice(), a = o - i, a) {
    for (a < 0 ? (n = u, a = -a, l = s.length) : (n = s, i = o, l = u.length), o = Math.ceil(f / ae), l = o > l ? o + 1 : l + 1, a > l && (a = l, n.length = 1), n.reverse(); a--; ) n.push(0);
    n.reverse();
  }
  for (l = u.length, a = s.length, l - a < 0 && (a = l, n = s, s = u, u = n), r = 0; a; )
    r = (u[--a] = u[a] + s[a] + r) / we | 0, u[a] %= we;
  for (r && (u.unshift(r), ++i), l = u.length; u[--l] == 0; ) u.pop();
  return t.d = u, t.e = i, oe ? ee(t, f) : t;
}
function jt(e, t, r) {
  if (e !== ~~e || e < t || e > r)
    throw Error(_r + e);
}
function St(e) {
  var t, r, n, i = e.length - 1, a = "", o = e[0];
  if (i > 0) {
    for (a += o, t = 1; t < i; t++)
      n = e[t] + "", r = ae - n.length, r && (a += tr(r)), a += n;
    o = e[t], n = o + "", r = ae - n.length, r && (a += tr(r));
  } else if (o === 0)
    return "0";
  for (; o % 10 === 0; ) o /= 10;
  return a + o;
}
var zt = /* @__PURE__ */ (function() {
  function e(n, i) {
    var a, o = 0, l = n.length;
    for (n = n.slice(); l--; )
      a = n[l] * i + o, n[l] = a % we | 0, o = a / we | 0;
    return o && n.unshift(o), n;
  }
  function t(n, i, a, o) {
    var l, u;
    if (a != o)
      u = a > o ? 1 : -1;
    else
      for (l = u = 0; l < a; l++)
        if (n[l] != i[l]) {
          u = n[l] > i[l] ? 1 : -1;
          break;
        }
    return u;
  }
  function r(n, i, a) {
    for (var o = 0; a--; )
      n[a] -= o, o = n[a] < i[a] ? 1 : 0, n[a] = o * we + n[a] - i[a];
    for (; !n[0] && n.length > 1; ) n.shift();
  }
  return function(n, i, a, o) {
    var l, u, s, c, f, d, h, p, g, m, y, x, b, w, O, P, _, A, C = n.constructor, T = n.s == i.s ? 1 : -1, I = n.d, k = i.d;
    if (!n.s) return new C(n);
    if (!i.s) throw Error(st + "Division by zero");
    for (u = n.e - i.e, _ = k.length, O = I.length, h = new C(T), p = h.d = [], s = 0; k[s] == (I[s] || 0); ) ++s;
    if (k[s] > (I[s] || 0) && --u, a == null ? x = a = C.precision : o ? x = a + (de(n) - de(i)) + 1 : x = a, x < 0) return new C(0);
    if (x = x / ae + 2 | 0, s = 0, _ == 1)
      for (c = 0, k = k[0], x++; (s < O || c) && x--; s++)
        b = c * we + (I[s] || 0), p[s] = b / k | 0, c = b % k | 0;
    else {
      for (c = we / (k[0] + 1) | 0, c > 1 && (k = e(k, c), I = e(I, c), _ = k.length, O = I.length), w = _, g = I.slice(0, _), m = g.length; m < _; ) g[m++] = 0;
      A = k.slice(), A.unshift(0), P = k[0], k[1] >= we / 2 && ++P;
      do
        c = 0, l = t(k, g, _, m), l < 0 ? (y = g[0], _ != m && (y = y * we + (g[1] || 0)), c = y / P | 0, c > 1 ? (c >= we && (c = we - 1), f = e(k, c), d = f.length, m = g.length, l = t(f, g, d, m), l == 1 && (c--, r(f, _ < d ? A : k, d))) : (c == 0 && (l = c = 1), f = k.slice()), d = f.length, d < m && f.unshift(0), r(g, f, m), l == -1 && (m = g.length, l = t(k, g, _, m), l < 1 && (c++, r(g, _ < m ? A : k, m))), m = g.length) : l === 0 && (c++, g = [0]), p[s++] = c, l && g[0] ? g[m++] = I[w] || 0 : (g = [I[w]], m = 1);
      while ((w++ < O || g[0] !== void 0) && x--);
    }
    return p[0] || p.shift(), h.e = u, ee(h, o ? a + de(h) + 1 : a);
  };
})();
function Pp(e, t) {
  var r, n, i, a, o, l, u = 0, s = 0, c = e.constructor, f = c.precision;
  if (de(e) > 16) throw Error(Pu + de(e));
  if (!e.s) return new c(Xe);
  for (oe = !1, l = f, o = new c(0.03125); e.abs().gte(0.1); )
    e = e.times(o), s += 5;
  for (n = Math.log(br(2, s)) / Math.LN10 * 2 + 5 | 0, l += n, r = i = a = new c(Xe), c.precision = l; ; ) {
    if (i = ee(i.times(e), l), r = r.times(++u), o = a.plus(zt(i, r, l)), St(o.d).slice(0, l) === St(a.d).slice(0, l)) {
      for (; s--; ) a = ee(a.times(a), l);
      return c.precision = f, t == null ? (oe = !0, ee(a, f)) : a;
    }
    a = o;
  }
}
function de(e) {
  for (var t = e.e * ae, r = e.d[0]; r >= 10; r /= 10) t++;
  return t;
}
function No(e, t, r) {
  if (t > e.LN10.sd())
    throw oe = !0, r && (e.precision = r), Error(st + "LN10 precision limit exceeded");
  return ee(new e(e.LN10), t);
}
function tr(e) {
  for (var t = ""; e--; ) t += "0";
  return t;
}
function Un(e, t) {
  var r, n, i, a, o, l, u, s, c, f = 1, d = 10, h = e, p = h.d, g = h.constructor, m = g.precision;
  if (h.s < 1) throw Error(st + (h.s ? "NaN" : "-Infinity"));
  if (h.eq(Xe)) return new g(0);
  if (t == null ? (oe = !1, s = m) : s = t, h.eq(10))
    return t == null && (oe = !0), No(g, s);
  if (s += d, g.precision = s, r = St(p), n = r.charAt(0), a = de(h), Math.abs(a) < 15e14) {
    for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; )
      h = h.times(e), r = St(h.d), n = r.charAt(0), f++;
    a = de(h), n > 1 ? (h = new g("0." + r), a++) : h = new g(n + "." + r.slice(1));
  } else
    return u = No(g, s + 2, m).times(a + ""), h = Un(new g(n + "." + r.slice(1)), s - d).plus(u), g.precision = m, t == null ? (oe = !0, ee(h, m)) : h;
  for (l = o = h = zt(h.minus(Xe), h.plus(Xe), s), c = ee(h.times(h), s), i = 3; ; ) {
    if (o = ee(o.times(c), s), u = l.plus(zt(o, new g(i), s)), St(u.d).slice(0, s) === St(l.d).slice(0, s))
      return l = l.times(2), a !== 0 && (l = l.plus(No(g, s + 2, m).times(a + ""))), l = zt(l, new g(f), s), g.precision = m, t == null ? (oe = !0, ee(l, m)) : l;
    l = u, i += 2;
  }
}
function gf(e, t) {
  var r, n, i;
  for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; ) ++n;
  for (i = t.length; t.charCodeAt(i - 1) === 48; ) --i;
  if (t = t.slice(n, i), t) {
    if (i -= n, r = r - n - 1, e.e = fn(r / ae), e.d = [], n = (r + 1) % ae, r < 0 && (n += ae), n < i) {
      for (n && e.d.push(+t.slice(0, n)), i -= ae; n < i; ) e.d.push(+t.slice(n, n += ae));
      t = t.slice(n), n = ae - t.length;
    } else
      n -= i;
    for (; n--; ) t += "0";
    if (e.d.push(+t), oe && (e.e > da || e.e < -da)) throw Error(Pu + r);
  } else
    e.s = 0, e.e = 0, e.d = [0];
  return e;
}
function ee(e, t, r) {
  var n, i, a, o, l, u, s, c, f = e.d;
  for (o = 1, a = f[0]; a >= 10; a /= 10) o++;
  if (n = t - o, n < 0)
    n += ae, i = t, s = f[c = 0];
  else {
    if (c = Math.ceil((n + 1) / ae), a = f.length, c >= a) return e;
    for (s = a = f[c], o = 1; a >= 10; a /= 10) o++;
    n %= ae, i = n - ae + o;
  }
  if (r !== void 0 && (a = br(10, o - i - 1), l = s / a % 10 | 0, u = t < 0 || f[c + 1] !== void 0 || s % a, u = r < 4 ? (l || u) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : l > 5 || l == 5 && (r == 4 || u || r == 6 && // Check whether the digit to the left of the rounding digit is odd.
  (n > 0 ? i > 0 ? s / br(10, o - i) : 0 : f[c - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7))), t < 1 || !f[0])
    return u ? (a = de(e), f.length = 1, t = t - a - 1, f[0] = br(10, (ae - t % ae) % ae), e.e = fn(-t / ae) || 0) : (f.length = 1, f[0] = e.e = e.s = 0), e;
  if (n == 0 ? (f.length = c, a = 1, c--) : (f.length = c + 1, a = br(10, ae - n), f[c] = i > 0 ? (s / br(10, o - i) % br(10, i) | 0) * a : 0), u)
    for (; ; )
      if (c == 0) {
        (f[0] += a) == we && (f[0] = 1, ++e.e);
        break;
      } else {
        if (f[c] += a, f[c] != we) break;
        f[c--] = 0, a = 1;
      }
  for (n = f.length; f[--n] === 0; ) f.pop();
  if (oe && (e.e > da || e.e < -da))
    throw Error(Pu + de(e));
  return e;
}
function Op(e, t) {
  var r, n, i, a, o, l, u, s, c, f, d = e.constructor, h = d.precision;
  if (!e.s || !t.s)
    return t.s ? t.s = -t.s : t = new d(e), oe ? ee(t, h) : t;
  if (u = e.d, f = t.d, n = t.e, s = e.e, u = u.slice(), o = s - n, o) {
    for (c = o < 0, c ? (r = u, o = -o, l = f.length) : (r = f, n = s, l = u.length), i = Math.max(Math.ceil(h / ae), l) + 2, o > i && (o = i, r.length = 1), r.reverse(), i = o; i--; ) r.push(0);
    r.reverse();
  } else {
    for (i = u.length, l = f.length, c = i < l, c && (l = i), i = 0; i < l; i++)
      if (u[i] != f[i]) {
        c = u[i] < f[i];
        break;
      }
    o = 0;
  }
  for (c && (r = u, u = f, f = r, t.s = -t.s), l = u.length, i = f.length - l; i > 0; --i) u[l++] = 0;
  for (i = f.length; i > o; ) {
    if (u[--i] < f[i]) {
      for (a = i; a && u[--a] === 0; ) u[a] = we - 1;
      --u[a], u[i] += we;
    }
    u[i] -= f[i];
  }
  for (; u[--l] === 0; ) u.pop();
  for (; u[0] === 0; u.shift()) --n;
  return u[0] ? (t.d = u, t.e = n, oe ? ee(t, h) : t) : new d(0);
}
function Dr(e, t, r) {
  var n, i = de(e), a = St(e.d), o = a.length;
  return t ? (r && (n = r - o) > 0 ? a = a.charAt(0) + "." + a.slice(1) + tr(n) : o > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (i < 0 ? "e" : "e+") + i) : i < 0 ? (a = "0." + tr(-i - 1) + a, r && (n = r - o) > 0 && (a += tr(n))) : i >= o ? (a += tr(i + 1 - o), r && (n = r - i - 1) > 0 && (a = a + "." + tr(n))) : ((n = i + 1) < o && (a = a.slice(0, n) + "." + a.slice(n)), r && (n = r - o) > 0 && (i + 1 === o && (a += "."), a += tr(n))), e.s < 0 ? "-" + a : a;
}
function yf(e, t) {
  if (e.length > t)
    return e.length = t, !0;
}
function Ap(e) {
  var t, r, n;
  function i(a) {
    var o = this;
    if (!(o instanceof i)) return new i(a);
    if (o.constructor = i, a instanceof i) {
      o.s = a.s, o.e = a.e, o.d = (a = a.d) ? a.slice() : a;
      return;
    }
    if (typeof a == "number") {
      if (a * 0 !== 0)
        throw Error(_r + a);
      if (a > 0)
        o.s = 1;
      else if (a < 0)
        a = -a, o.s = -1;
      else {
        o.s = 0, o.e = 0, o.d = [0];
        return;
      }
      if (a === ~~a && a < 1e7) {
        o.e = 0, o.d = [a];
        return;
      }
      return gf(o, a.toString());
    } else if (typeof a != "string")
      throw Error(_r + a);
    if (a.charCodeAt(0) === 45 ? (a = a.slice(1), o.s = -1) : o.s = 1, KO.test(a)) gf(o, a);
    else throw Error(_r + a);
  }
  if (i.prototype = R, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = Ap, i.config = i.set = HO, e === void 0 && (e = {}), e)
    for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length; ) e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
  return i.config(e), i;
}
function HO(e) {
  if (!e || typeof e != "object")
    throw Error(st + "Object expected");
  var t, r, n, i = [
    "precision",
    1,
    cn,
    "rounding",
    0,
    8,
    "toExpNeg",
    -1 / 0,
    0,
    "toExpPos",
    0,
    1 / 0
  ];
  for (t = 0; t < i.length; t += 3)
    if ((n = e[r = i[t]]) !== void 0)
      if (fn(n) === n && n >= i[t + 1] && n <= i[t + 2]) this[r] = n;
      else throw Error(_r + r + ": " + n);
  if ((n = e[r = "LN10"]) !== void 0)
    if (n == Math.LN10) this[r] = new this(n);
    else throw Error(_r + r + ": " + n);
  return this;
}
var Ou = Ap(UO);
Xe = new Ou(1);
const Y = Ou;
function Sp(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new Y(e).abs().log(10).toNumber()) + 1, t;
}
function _p(e, t, r) {
  for (var n = new Y(e), i = 0, a = []; n.lt(t) && i < 1e5; )
    a.push(n.toNumber()), n = n.add(r), i++;
  return a;
}
var kp = (e) => {
  var [t, r] = e, [n, i] = [t, r];
  return t > r && ([n, i] = [r, t]), [n, i];
}, Au = (e, t, r) => {
  if (e.lte(0))
    return new Y(0);
  var n = Sp(e.toNumber()), i = new Y(10).pow(n), a = e.div(i), o = n !== 1 ? 0.05 : 0.1, l = new Y(Math.ceil(a.div(o).toNumber())).add(r).mul(o), u = l.mul(i);
  return t ? new Y(u.toNumber()) : new Y(Math.ceil(u.toNumber()));
}, Ep = (e, t, r) => {
  var n;
  if (e.lte(0))
    return new Y(0);
  var i = [1, 2, 2.5, 5], a = e.toNumber(), o = Math.floor(new Y(a).abs().log(10).toNumber()), l = new Y(10).pow(o), u = e.div(l).toNumber(), s = i.findIndex((h) => h >= u - 1e-10);
  if (s === -1 && (l = l.mul(10), s = 0), s += r, s >= i.length) {
    var c = Math.floor(s / i.length);
    s %= i.length, l = l.mul(new Y(10).pow(c));
  }
  var f = (n = i[s]) !== null && n !== void 0 ? n : 1, d = new Y(f).mul(l);
  return t ? d : new Y(Math.ceil(d.toNumber()));
}, GO = (e, t, r) => {
  var n = new Y(1), i = new Y(e);
  if (!i.isint() && r) {
    var a = Math.abs(e);
    a < 1 ? (n = new Y(10).pow(Sp(e) - 1), i = new Y(Math.floor(i.div(n).toNumber())).mul(n)) : a > 1 && (i = new Y(Math.floor(e)));
  } else e === 0 ? i = new Y(Math.floor((t - 1) / 2)) : r || (i = new Y(Math.floor(e)));
  for (var o = Math.floor((t - 1) / 2), l = [], u = 0; u < t; u++)
    l.push(i.add(new Y(u - o).mul(n)).toNumber());
  return l;
}, Cp = function(t, r, n, i) {
  var a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0, o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : Au;
  if (!Number.isFinite((r - t) / (n - 1)))
    return {
      step: new Y(0),
      tickMin: new Y(0),
      tickMax: new Y(0)
    };
  var l = o(new Y(r).sub(t).div(n - 1), i, a), u;
  t <= 0 && r >= 0 ? u = new Y(0) : (u = new Y(t).add(r).div(2), u = u.sub(new Y(u).mod(l)));
  var s = Math.ceil(u.sub(t).div(l).toNumber()), c = Math.ceil(new Y(r).sub(u).div(l).toNumber()), f = s + c + 1;
  return f > n ? Cp(t, r, n, i, a + 1, o) : (f < n && (c = r > 0 ? c + (n - f) : c, s = r > 0 ? s : s + (n - f)), {
    step: l,
    tickMin: u.sub(new Y(s).mul(l)),
    tickMax: u.add(new Y(c).mul(l))
  });
}, bf = function(t) {
  var [r, n] = t, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", l = Math.max(i, 2), [u, s] = kp([r, n]);
  if (u === -1 / 0 || s === 1 / 0) {
    var c = s === 1 / 0 ? [u, ...Array(i - 1).fill(1 / 0)] : [...Array(i - 1).fill(-1 / 0), s];
    return r > n ? c.reverse() : c;
  }
  if (u === s)
    return GO(u, i, a);
  var f = o === "snap125" ? Ep : Au, {
    step: d,
    tickMin: h,
    tickMax: p
  } = Cp(u, s, l, a, 0, f), g = _p(h, p.add(new Y(0.1).mul(d)), d);
  return r > n ? g.reverse() : g;
}, xf = function(t, r) {
  var [n, i] = t, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", [l, u] = kp([n, i]);
  if (l === -1 / 0 || u === 1 / 0)
    return [n, i];
  if (l === u)
    return [l];
  var s = o === "snap125" ? Ep : Au, c = Math.max(r, 2), f = s(new Y(u).sub(l).div(c - 1), a, 0), d = [..._p(new Y(l), new Y(u), f), u];
  return a === !1 && (d = d.map((h) => Math.round(h))), n > i ? d.reverse() : d;
}, qO = (e) => e.rootProps.barCategoryGap, io = (e) => e.rootProps.stackOffset, jp = (e) => e.rootProps.reverseStackOrder, Su = (e) => e.options.chartName, _u = (e) => e.rootProps.syncId, Ip = (e) => e.rootProps.syncMethod, ku = (e) => e.options.eventEmitter, YO = (e) => e.rootProps.baseValue, Ne = {
  /**
   * CartesianGrid and PolarGrid
   */
  grid: -100,
  /**
   * Background of Bar and RadialBar.
   * This is not visible by default but can be enabled by setting background={true} on Bar or RadialBar.
   */
  barBackground: -50,
  /*
   * other chart elements or custom elements without specific zIndex
   * render in here, at zIndex 0
   */
  /**
   * Area, Pie, Radar, and ReferenceArea
   */
  area: 100,
  /**
   * Cursor is embedded inside Tooltip and controlled by it.
   * The Tooltip itself has a separate portal and is not included in the zIndex system;
   * Cursor is the decoration inside the chart area. CursorRectangle is a rectangle box.
   * It renders below bar so that in a stacked bar chart the cursor rectangle does not hide the other bars.
   */
  cursorRectangle: 200,
  /**
   * Bar and RadialBar
   */
  bar: 300,
  /**
   * Line and ReferenceLine, and ErrorBor
   */
  line: 400,
  /**
   * XAxis and YAxis and PolarAngleAxis and PolarRadiusAxis ticks and lines and children
   */
  axis: 500,
  /**
   * Scatter and ReferenceDot,
   * and Dots of Line and Area and Radar if they have dot=true
   */
  scatter: 600,
  /**
   * Hovering over a Bar or RadialBar renders a highlight rectangle
   */
  activeBar: 1e3,
  /**
   * Cursor is embedded inside Tooltip and controlled by it.
   * The Tooltip itself has a separate portal and is not included in the zIndex system;
   * Cursor is the decoration inside the chart area, usually a cross or a box.
   * CursorLine is a line cursor rendered in Line, Area, Scatter, Radar charts.
   * It renders above the Line and Scatter so that it is always visible.
   * It renders below active dot so that the dot is always visible and shows the current point.
   * We're also assuming that the active dot is small enough that it does not fully cover the cursor line.
   *
   * This also applies to the radial cursor in RadialBarChart.
   */
  cursorLine: 1100,
  /**
   * Hovering over a Point in Line, Area, Scatter, Radar renders a highlight dot
   */
  activeDot: 1200,
  /**
   * LabelList and Label, including Axis labels
   */
  label: 2e3
}, dr = {
  allowDecimals: !1,
  // if I set this to false then Tooltip synchronisation stops working in Radar, wtf
  allowDataOverflow: !1,
  angleAxisId: 0,
  reversed: !1,
  scale: "auto",
  tick: !0,
  type: "auto"
}, xt = {
  allowDataOverflow: !1,
  allowDecimals: !1,
  allowDuplicatedCategory: !0,
  includeHidden: !1,
  radiusAxisId: 0,
  reversed: !1,
  scale: "auto",
  tick: !0,
  tickCount: 5,
  type: "auto"
}, ao = (e, t) => {
  if (!(!e || !t))
    return e != null && e.reversed ? [t[1], t[0]] : t;
};
function oo(e, t, r) {
  if (r !== "auto")
    return r;
  if (e != null)
    return It(e, t) ? "category" : "number";
}
function wf(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function va(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wf(Object(r), !0).forEach(function(n) {
      VO(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : wf(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function VO(e, t, r) {
  return (t = XO(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function XO(e) {
  var t = ZO(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function ZO(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Pf = {
  allowDataOverflow: dr.allowDataOverflow,
  allowDecimals: dr.allowDecimals,
  allowDuplicatedCategory: !1,
  // defaultPolarAngleAxisProps.allowDuplicatedCategory has it set to true but the actual axis rendering ignores the prop because reasons,
  dataKey: void 0,
  domain: void 0,
  id: dr.angleAxisId,
  includeHidden: !1,
  name: void 0,
  reversed: dr.reversed,
  scale: dr.scale,
  tick: dr.tick,
  tickCount: void 0,
  ticks: void 0,
  type: dr.type,
  unit: void 0,
  niceTicks: "auto"
}, Of = {
  allowDataOverflow: xt.allowDataOverflow,
  allowDecimals: xt.allowDecimals,
  allowDuplicatedCategory: xt.allowDuplicatedCategory,
  dataKey: void 0,
  domain: void 0,
  id: xt.radiusAxisId,
  includeHidden: xt.includeHidden,
  name: void 0,
  reversed: xt.reversed,
  scale: xt.scale,
  tick: xt.tick,
  tickCount: xt.tickCount,
  ticks: void 0,
  type: xt.type,
  unit: void 0,
  niceTicks: "auto"
}, QO = (e, t) => {
  if (t != null)
    return e.polarAxis.angleAxis[t];
}, Eu = S([QO, Zh], (e, t) => {
  var r;
  if (e != null)
    return e;
  var n = (r = oo(t, "angleAxis", Pf.type)) !== null && r !== void 0 ? r : "category";
  return va(va({}, Pf), {}, {
    type: n
  });
}), JO = (e, t) => e.polarAxis.radiusAxis[t], Cu = S([JO, Zh], (e, t) => {
  var r;
  if (e != null)
    return e;
  var n = (r = oo(t, "radiusAxis", Of.type)) !== null && r !== void 0 ? r : "category";
  return va(va({}, Of), {}, {
    type: n
  });
}), lo = (e) => e.polarOptions, ju = S([Gt, qt, Me], CO), Mp = S([lo, ju], (e, t) => {
  if (e != null)
    return lr(e.innerRadius, t, 0);
}), Tp = S([lo, ju], (e, t) => {
  if (e != null)
    return lr(e.outerRadius, t, t * 0.8);
}), eA = (e) => {
  if (e == null)
    return [0, 0];
  var {
    startAngle: t,
    endAngle: r
  } = e;
  return [t, r];
}, Dp = S([lo], eA);
S([Eu, Dp], ao);
var Np = S([ju, Mp, Tp], (e, t, r) => {
  if (!(e == null || t == null || r == null))
    return [t, r];
});
S([Cu, Np], ao);
var $p = S([le, lo, Mp, Tp, Gt, qt], (e, t, r, n, i, a) => {
  if (!(e !== "centric" && e !== "radial" || t == null || r == null || n == null)) {
    var {
      cx: o,
      cy: l,
      startAngle: u,
      endAngle: s
    } = t;
    return {
      cx: lr(o, i, i / 2),
      cy: lr(l, a, a / 2),
      innerRadius: r,
      outerRadius: n,
      startAngle: u,
      endAngle: s,
      clockWise: !1
      // this property look useful, why not use it?
    };
  }
}), Pe = (e, t) => t, uo = (e, t, r) => r;
function Iu(e) {
  return e?.id;
}
function Rp(e, t, r) {
  var {
    chartData: n = []
  } = t, {
    allowDuplicatedCategory: i,
    dataKey: a
  } = r, o = /* @__PURE__ */ new Map();
  return e.forEach((l) => {
    var u, s = (u = l.data) !== null && u !== void 0 ? u : n;
    if (!(s == null || s.length === 0)) {
      var c = Iu(l);
      s.forEach((f, d) => {
        var h = a == null || i ? d : String(je(f, a, null)), p = je(f, l.dataKey, 0), g;
        o.has(h) ? g = o.get(h) : g = {}, Object.assign(g, {
          [c]: p
        }), o.set(h, g);
      });
    }
  }), Array.from(o.values());
}
function Mu(e) {
  return "stackId" in e && e.stackId != null && e.dataKey != null;
}
var so = (e, t) => e === t ? !0 : e == null || t == null ? !1 : e[0] === t[0] && e[1] === t[1];
function co(e, t) {
  return Array.isArray(e) && Array.isArray(t) && e.length === 0 && t.length === 0 ? !0 : e === t;
}
function tA(e, t) {
  if (e.length === t.length) {
    for (var r = 0; r < e.length; r++)
      if (e[r] !== t[r])
        return !1;
    return !0;
  }
  return !1;
}
var Oe = (e) => {
  var t = le(e);
  return t === "horizontal" ? "xAxis" : t === "vertical" ? "yAxis" : t === "centric" ? "angleAxis" : "radiusAxis";
}, dn = (e) => e.tooltip.settings.axisId;
function Tu(e) {
  if (e != null) {
    var t = e.ticks, r = e.bandwidth, n = e.range(), i = [Math.min(...n), Math.max(...n)];
    return {
      domain: () => e.domain(),
      range: (function(a) {
        function o() {
          return a.apply(this, arguments);
        }
        return o.toString = function() {
          return a.toString();
        }, o;
      })(() => i),
      rangeMin: () => i[0],
      rangeMax: () => i[1],
      isInRange(a) {
        var o = i[0], l = i[1];
        return o <= l ? a >= o && a <= l : a >= l && a <= o;
      },
      bandwidth: r ? () => r.call(e) : void 0,
      ticks: t ? (a) => t.call(e, a) : void 0,
      map: (a, o) => {
        var l = e(a);
        if (l != null) {
          if (e.bandwidth && o !== null && o !== void 0 && o.position) {
            var u = e.bandwidth();
            switch (o.position) {
              case "middle":
                l += u / 2;
                break;
              case "end":
                l += u;
                break;
            }
          }
          return l;
        }
      }
    };
  }
}
var rA = (e, t) => {
  if (t != null)
    switch (e) {
      case "linear": {
        if (!_t(t)) {
          for (var r, n, i = 0; i < t.length; i++) {
            var a = t[i];
            G(a) && ((r === void 0 || a < r) && (r = a), (n === void 0 || a > n) && (n = a));
          }
          return r !== void 0 && n !== void 0 ? [r, n] : void 0;
        }
        return t;
      }
      default:
        return t;
    }
};
function ar(e, t) {
  return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function nA(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Du(e) {
  let t, r, n;
  e.length !== 2 ? (t = ar, r = (l, u) => ar(e(l), u), n = (l, u) => e(l) - u) : (t = e === ar || e === nA ? e : iA, r = e, n = e);
  function i(l, u, s = 0, c = l.length) {
    if (s < c) {
      if (t(u, u) !== 0) return c;
      do {
        const f = s + c >>> 1;
        r(l[f], u) < 0 ? s = f + 1 : c = f;
      } while (s < c);
    }
    return s;
  }
  function a(l, u, s = 0, c = l.length) {
    if (s < c) {
      if (t(u, u) !== 0) return c;
      do {
        const f = s + c >>> 1;
        r(l[f], u) <= 0 ? s = f + 1 : c = f;
      } while (s < c);
    }
    return s;
  }
  function o(l, u, s = 0, c = l.length) {
    const f = i(l, u, s, c - 1);
    return f > s && n(l[f - 1], u) > -n(l[f], u) ? f - 1 : f;
  }
  return { left: i, center: o, right: a };
}
function iA() {
  return 0;
}
function Lp(e) {
  return e === null ? NaN : +e;
}
function* aA(e, t) {
  for (let r of e)
    r != null && (r = +r) >= r && (yield r);
}
const oA = Du(ar), ai = oA.right;
Du(Lp).center;
class Af extends Map {
  constructor(t, r = sA) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: r } }), t != null) for (const [n, i] of t) this.set(n, i);
  }
  get(t) {
    return super.get(Sf(this, t));
  }
  has(t) {
    return super.has(Sf(this, t));
  }
  set(t, r) {
    return super.set(lA(this, t), r);
  }
  delete(t) {
    return super.delete(uA(this, t));
  }
}
function Sf({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : r;
}
function lA({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : (e.set(n, r), r);
}
function uA({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) && (r = e.get(n), e.delete(n)), r;
}
function sA(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
function cA(e = ar) {
  if (e === ar) return zp;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, r) => {
    const n = e(t, r);
    return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0);
  };
}
function zp(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0);
}
const fA = Math.sqrt(50), dA = Math.sqrt(10), vA = Math.sqrt(2);
function ha(e, t, r) {
  const n = (t - e) / Math.max(0, r), i = Math.floor(Math.log10(n)), a = n / Math.pow(10, i), o = a >= fA ? 10 : a >= dA ? 5 : a >= vA ? 2 : 1;
  let l, u, s;
  return i < 0 ? (s = Math.pow(10, -i) / o, l = Math.round(e * s), u = Math.round(t * s), l / s < e && ++l, u / s > t && --u, s = -s) : (s = Math.pow(10, i) * o, l = Math.round(e / s), u = Math.round(t / s), l * s < e && ++l, u * s > t && --u), u < l && 0.5 <= r && r < 2 ? ha(e, t, r * 2) : [l, u, s];
}
function Il(e, t, r) {
  if (t = +t, e = +e, r = +r, !(r > 0)) return [];
  if (e === t) return [e];
  const n = t < e, [i, a, o] = n ? ha(t, e, r) : ha(e, t, r);
  if (!(a >= i)) return [];
  const l = a - i + 1, u = new Array(l);
  if (n)
    if (o < 0) for (let s = 0; s < l; ++s) u[s] = (a - s) / -o;
    else for (let s = 0; s < l; ++s) u[s] = (a - s) * o;
  else if (o < 0) for (let s = 0; s < l; ++s) u[s] = (i + s) / -o;
  else for (let s = 0; s < l; ++s) u[s] = (i + s) * o;
  return u;
}
function Ml(e, t, r) {
  return t = +t, e = +e, r = +r, ha(e, t, r)[2];
}
function Tl(e, t, r) {
  t = +t, e = +e, r = +r;
  const n = t < e, i = n ? Ml(t, e, r) : Ml(e, t, r);
  return (n ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function _f(e, t) {
  let r;
  for (const n of e)
    n != null && (r < n || r === void 0 && n >= n) && (r = n);
  return r;
}
function kf(e, t) {
  let r;
  for (const n of e)
    n != null && (r > n || r === void 0 && n >= n) && (r = n);
  return r;
}
function Bp(e, t, r = 0, n = 1 / 0, i) {
  if (t = Math.floor(t), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(e.length - 1, n)), !(r <= t && t <= n)) return e;
  for (i = i === void 0 ? zp : cA(i); n > r; ) {
    if (n - r > 600) {
      const u = n - r + 1, s = t - r + 1, c = Math.log(u), f = 0.5 * Math.exp(2 * c / 3), d = 0.5 * Math.sqrt(c * f * (u - f) / u) * (s - u / 2 < 0 ? -1 : 1), h = Math.max(r, Math.floor(t - s * f / u + d)), p = Math.min(n, Math.floor(t + (u - s) * f / u + d));
      Bp(e, t, h, p, i);
    }
    const a = e[t];
    let o = r, l = n;
    for (On(e, r, t), i(e[n], a) > 0 && On(e, r, n); o < l; ) {
      for (On(e, o, l), ++o, --l; i(e[o], a) < 0; ) ++o;
      for (; i(e[l], a) > 0; ) --l;
    }
    i(e[r], a) === 0 ? On(e, r, l) : (++l, On(e, l, n)), l <= t && (r = l + 1), t <= l && (n = l - 1);
  }
  return e;
}
function On(e, t, r) {
  const n = e[t];
  e[t] = e[r], e[r] = n;
}
function hA(e, t, r) {
  if (e = Float64Array.from(aA(e)), !(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return kf(e);
    if (t >= 1) return _f(e);
    var n, i = (n - 1) * t, a = Math.floor(i), o = _f(Bp(e, a).subarray(0, a + 1)), l = kf(e.subarray(a + 1));
    return o + (l - o) * (i - a);
  }
}
function pA(e, t, r = Lp) {
  if (!(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return +r(e[0], 0, e);
    if (t >= 1) return +r(e[n - 1], n - 1, e);
    var n, i = (n - 1) * t, a = Math.floor(i), o = +r(e[a], a, e), l = +r(e[a + 1], a + 1, e);
    return o + (l - o) * (i - a);
  }
}
function mA(e, t, r) {
  e = +e, t = +t, r = (i = arguments.length) < 2 ? (t = e, e = 0, 1) : i < 3 ? 1 : +r;
  for (var n = -1, i = Math.max(0, Math.ceil((t - e) / r)) | 0, a = new Array(i); ++n < i; )
    a[n] = e + n * r;
  return a;
}
function ct(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e);
      break;
    default:
      this.range(t).domain(e);
      break;
  }
  return this;
}
function Vt(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      typeof e == "function" ? this.interpolator(e) : this.range(e);
      break;
    }
    default: {
      this.domain(e), typeof t == "function" ? this.interpolator(t) : this.range(t);
      break;
    }
  }
  return this;
}
const Dl = Symbol("implicit");
function Nu() {
  var e = new Af(), t = [], r = [], n = Dl;
  function i(a) {
    let o = e.get(a);
    if (o === void 0) {
      if (n !== Dl) return n;
      e.set(a, o = t.push(a) - 1);
    }
    return r[o % r.length];
  }
  return i.domain = function(a) {
    if (!arguments.length) return t.slice();
    t = [], e = new Af();
    for (const o of a)
      e.has(o) || e.set(o, t.push(o) - 1);
    return i;
  }, i.range = function(a) {
    return arguments.length ? (r = Array.from(a), i) : r.slice();
  }, i.unknown = function(a) {
    return arguments.length ? (n = a, i) : n;
  }, i.copy = function() {
    return Nu(t, r).unknown(n);
  }, ct.apply(i, arguments), i;
}
function $u() {
  var e = Nu().unknown(void 0), t = e.domain, r = e.range, n = 0, i = 1, a, o, l = !1, u = 0, s = 0, c = 0.5;
  delete e.unknown;
  function f() {
    var d = t().length, h = i < n, p = h ? i : n, g = h ? n : i;
    a = (g - p) / Math.max(1, d - u + s * 2), l && (a = Math.floor(a)), p += (g - p - a * (d - u)) * c, o = a * (1 - u), l && (p = Math.round(p), o = Math.round(o));
    var m = mA(d).map(function(y) {
      return p + a * y;
    });
    return r(h ? m.reverse() : m);
  }
  return e.domain = function(d) {
    return arguments.length ? (t(d), f()) : t();
  }, e.range = function(d) {
    return arguments.length ? ([n, i] = d, n = +n, i = +i, f()) : [n, i];
  }, e.rangeRound = function(d) {
    return [n, i] = d, n = +n, i = +i, l = !0, f();
  }, e.bandwidth = function() {
    return o;
  }, e.step = function() {
    return a;
  }, e.round = function(d) {
    return arguments.length ? (l = !!d, f()) : l;
  }, e.padding = function(d) {
    return arguments.length ? (u = Math.min(1, s = +d), f()) : u;
  }, e.paddingInner = function(d) {
    return arguments.length ? (u = Math.min(1, d), f()) : u;
  }, e.paddingOuter = function(d) {
    return arguments.length ? (s = +d, f()) : s;
  }, e.align = function(d) {
    return arguments.length ? (c = Math.max(0, Math.min(1, d)), f()) : c;
  }, e.copy = function() {
    return $u(t(), [n, i]).round(l).paddingInner(u).paddingOuter(s).align(c);
  }, ct.apply(f(), arguments);
}
function Fp(e) {
  var t = e.copy;
  return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
    return Fp(t());
  }, e;
}
function gA() {
  return Fp($u.apply(null, arguments).paddingInner(1));
}
function Ru(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e;
}
function Wp(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r;
}
function oi() {
}
var Kn = 0.7, pa = 1 / Kn, Jr = "\\s*([+-]?\\d+)\\s*", Hn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", kt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", yA = /^#([0-9a-f]{3,8})$/, bA = new RegExp(`^rgb\\(${Jr},${Jr},${Jr}\\)$`), xA = new RegExp(`^rgb\\(${kt},${kt},${kt}\\)$`), wA = new RegExp(`^rgba\\(${Jr},${Jr},${Jr},${Hn}\\)$`), PA = new RegExp(`^rgba\\(${kt},${kt},${kt},${Hn}\\)$`), OA = new RegExp(`^hsl\\(${Hn},${kt},${kt}\\)$`), AA = new RegExp(`^hsla\\(${Hn},${kt},${kt},${Hn}\\)$`), Ef = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
Ru(oi, Gn, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Cf,
  // Deprecated! Use color.formatHex.
  formatHex: Cf,
  formatHex8: SA,
  formatHsl: _A,
  formatRgb: jf,
  toString: jf
});
function Cf() {
  return this.rgb().formatHex();
}
function SA() {
  return this.rgb().formatHex8();
}
function _A() {
  return Up(this).formatHsl();
}
function jf() {
  return this.rgb().formatRgb();
}
function Gn(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = yA.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? If(t) : r === 3 ? new Ge(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? Si(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? Si(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = bA.exec(e)) ? new Ge(t[1], t[2], t[3], 1) : (t = xA.exec(e)) ? new Ge(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = wA.exec(e)) ? Si(t[1], t[2], t[3], t[4]) : (t = PA.exec(e)) ? Si(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = OA.exec(e)) ? Df(t[1], t[2] / 100, t[3] / 100, 1) : (t = AA.exec(e)) ? Df(t[1], t[2] / 100, t[3] / 100, t[4]) : Ef.hasOwnProperty(e) ? If(Ef[e]) : e === "transparent" ? new Ge(NaN, NaN, NaN, 0) : null;
}
function If(e) {
  return new Ge(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Si(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new Ge(e, t, r, n);
}
function kA(e) {
  return e instanceof oi || (e = Gn(e)), e ? (e = e.rgb(), new Ge(e.r, e.g, e.b, e.opacity)) : new Ge();
}
function Nl(e, t, r, n) {
  return arguments.length === 1 ? kA(e) : new Ge(e, t, r, n ?? 1);
}
function Ge(e, t, r, n) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +n;
}
Ru(Ge, Nl, Wp(oi, {
  brighter(e) {
    return e = e == null ? pa : Math.pow(pa, e), new Ge(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Kn : Math.pow(Kn, e), new Ge(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Ge(kr(this.r), kr(this.g), kr(this.b), ma(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Mf,
  // Deprecated! Use color.formatHex.
  formatHex: Mf,
  formatHex8: EA,
  formatRgb: Tf,
  toString: Tf
}));
function Mf() {
  return `#${Pr(this.r)}${Pr(this.g)}${Pr(this.b)}`;
}
function EA() {
  return `#${Pr(this.r)}${Pr(this.g)}${Pr(this.b)}${Pr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Tf() {
  const e = ma(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${kr(this.r)}, ${kr(this.g)}, ${kr(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function ma(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function kr(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Pr(e) {
  return e = kr(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Df(e, t, r, n) {
  return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new ht(e, t, r, n);
}
function Up(e) {
  if (e instanceof ht) return new ht(e.h, e.s, e.l, e.opacity);
  if (e instanceof oi || (e = Gn(e)), !e) return new ht();
  if (e instanceof ht) return e;
  e = e.rgb();
  var t = e.r / 255, r = e.g / 255, n = e.b / 255, i = Math.min(t, r, n), a = Math.max(t, r, n), o = NaN, l = a - i, u = (a + i) / 2;
  return l ? (t === a ? o = (r - n) / l + (r < n) * 6 : r === a ? o = (n - t) / l + 2 : o = (t - r) / l + 4, l /= u < 0.5 ? a + i : 2 - a - i, o *= 60) : l = u > 0 && u < 1 ? 0 : o, new ht(o, l, u, e.opacity);
}
function CA(e, t, r, n) {
  return arguments.length === 1 ? Up(e) : new ht(e, t, r, n ?? 1);
}
function ht(e, t, r, n) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +n;
}
Ru(ht, CA, Wp(oi, {
  brighter(e) {
    return e = e == null ? pa : Math.pow(pa, e), new ht(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Kn : Math.pow(Kn, e), new ht(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, n = r + (r < 0.5 ? r : 1 - r) * t, i = 2 * r - n;
    return new Ge(
      $o(e >= 240 ? e - 240 : e + 120, i, n),
      $o(e, i, n),
      $o(e < 120 ? e + 240 : e - 120, i, n),
      this.opacity
    );
  },
  clamp() {
    return new ht(Nf(this.h), _i(this.s), _i(this.l), ma(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = ma(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Nf(this.h)}, ${_i(this.s) * 100}%, ${_i(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Nf(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function _i(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function $o(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255;
}
const Lu = (e) => () => e;
function jA(e, t) {
  return function(r) {
    return e + r * t;
  };
}
function IA(e, t, r) {
  return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r, function(n) {
    return Math.pow(e + n * t, r);
  };
}
function MA(e) {
  return (e = +e) == 1 ? Kp : function(t, r) {
    return r - t ? IA(t, r, e) : Lu(isNaN(t) ? r : t);
  };
}
function Kp(e, t) {
  var r = t - e;
  return r ? jA(e, r) : Lu(isNaN(e) ? t : e);
}
const $f = (function e(t) {
  var r = MA(t);
  function n(i, a) {
    var o = r((i = Nl(i)).r, (a = Nl(a)).r), l = r(i.g, a.g), u = r(i.b, a.b), s = Kp(i.opacity, a.opacity);
    return function(c) {
      return i.r = o(c), i.g = l(c), i.b = u(c), i.opacity = s(c), i + "";
    };
  }
  return n.gamma = e, n;
})(1);
function TA(e, t) {
  t || (t = []);
  var r = e ? Math.min(t.length, e.length) : 0, n = t.slice(), i;
  return function(a) {
    for (i = 0; i < r; ++i) n[i] = e[i] * (1 - a) + t[i] * a;
    return n;
  };
}
function DA(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function NA(e, t) {
  var r = t ? t.length : 0, n = e ? Math.min(r, e.length) : 0, i = new Array(n), a = new Array(r), o;
  for (o = 0; o < n; ++o) i[o] = vn(e[o], t[o]);
  for (; o < r; ++o) a[o] = t[o];
  return function(l) {
    for (o = 0; o < n; ++o) a[o] = i[o](l);
    return a;
  };
}
function $A(e, t) {
  var r = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(n) {
    return r.setTime(e * (1 - n) + t * n), r;
  };
}
function ga(e, t) {
  return e = +e, t = +t, function(r) {
    return e * (1 - r) + t * r;
  };
}
function RA(e, t) {
  var r = {}, n = {}, i;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (i in t)
    i in e ? r[i] = vn(e[i], t[i]) : n[i] = t[i];
  return function(a) {
    for (i in r) n[i] = r[i](a);
    return n;
  };
}
var $l = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ro = new RegExp($l.source, "g");
function LA(e) {
  return function() {
    return e;
  };
}
function zA(e) {
  return function(t) {
    return e(t) + "";
  };
}
function BA(e, t) {
  var r = $l.lastIndex = Ro.lastIndex = 0, n, i, a, o = -1, l = [], u = [];
  for (e = e + "", t = t + ""; (n = $l.exec(e)) && (i = Ro.exec(t)); )
    (a = i.index) > r && (a = t.slice(r, a), l[o] ? l[o] += a : l[++o] = a), (n = n[0]) === (i = i[0]) ? l[o] ? l[o] += i : l[++o] = i : (l[++o] = null, u.push({ i: o, x: ga(n, i) })), r = Ro.lastIndex;
  return r < t.length && (a = t.slice(r), l[o] ? l[o] += a : l[++o] = a), l.length < 2 ? u[0] ? zA(u[0].x) : LA(t) : (t = u.length, function(s) {
    for (var c = 0, f; c < t; ++c) l[(f = u[c]).i] = f.x(s);
    return l.join("");
  });
}
function vn(e, t) {
  var r = typeof t, n;
  return t == null || r === "boolean" ? Lu(t) : (r === "number" ? ga : r === "string" ? (n = Gn(t)) ? (t = n, $f) : BA : t instanceof Gn ? $f : t instanceof Date ? $A : DA(t) ? TA : Array.isArray(t) ? NA : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? RA : ga)(e, t);
}
function zu(e, t) {
  return e = +e, t = +t, function(r) {
    return Math.round(e * (1 - r) + t * r);
  };
}
function FA(e, t) {
  t === void 0 && (t = e, e = vn);
  for (var r = 0, n = t.length - 1, i = t[0], a = new Array(n < 0 ? 0 : n); r < n; ) a[r] = e(i, i = t[++r]);
  return function(o) {
    var l = Math.max(0, Math.min(n - 1, Math.floor(o *= n)));
    return a[l](o - l);
  };
}
function WA(e) {
  return function() {
    return e;
  };
}
function ya(e) {
  return +e;
}
var Rf = [0, 1];
function ze(e) {
  return e;
}
function Rl(e, t) {
  return (t -= e = +e) ? function(r) {
    return (r - e) / t;
  } : WA(isNaN(t) ? NaN : 0.5);
}
function UA(e, t) {
  var r;
  return e > t && (r = e, e = t, t = r), function(n) {
    return Math.max(e, Math.min(t, n));
  };
}
function KA(e, t, r) {
  var n = e[0], i = e[1], a = t[0], o = t[1];
  return i < n ? (n = Rl(i, n), a = r(o, a)) : (n = Rl(n, i), a = r(a, o)), function(l) {
    return a(n(l));
  };
}
function HA(e, t, r) {
  var n = Math.min(e.length, t.length) - 1, i = new Array(n), a = new Array(n), o = -1;
  for (e[n] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++o < n; )
    i[o] = Rl(e[o], e[o + 1]), a[o] = r(t[o], t[o + 1]);
  return function(l) {
    var u = ai(e, l, 1, n) - 1;
    return a[u](i[u](l));
  };
}
function li(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function fo() {
  var e = Rf, t = Rf, r = vn, n, i, a, o = ze, l, u, s;
  function c() {
    var d = Math.min(e.length, t.length);
    return o !== ze && (o = UA(e[0], e[d - 1])), l = d > 2 ? HA : KA, u = s = null, f;
  }
  function f(d) {
    return d == null || isNaN(d = +d) ? a : (u || (u = l(e.map(n), t, r)))(n(o(d)));
  }
  return f.invert = function(d) {
    return o(i((s || (s = l(t, e.map(n), ga)))(d)));
  }, f.domain = function(d) {
    return arguments.length ? (e = Array.from(d, ya), c()) : e.slice();
  }, f.range = function(d) {
    return arguments.length ? (t = Array.from(d), c()) : t.slice();
  }, f.rangeRound = function(d) {
    return t = Array.from(d), r = zu, c();
  }, f.clamp = function(d) {
    return arguments.length ? (o = d ? !0 : ze, c()) : o !== ze;
  }, f.interpolate = function(d) {
    return arguments.length ? (r = d, c()) : r;
  }, f.unknown = function(d) {
    return arguments.length ? (a = d, f) : a;
  }, function(d, h) {
    return n = d, i = h, c();
  };
}
function Bu() {
  return fo()(ze, ze);
}
function GA(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function ba(e, t) {
  if (!isFinite(e) || e === 0) return null;
  var r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"), n = e.slice(0, r);
  return [
    n.length > 1 ? n[0] + n.slice(2) : n,
    +e.slice(r + 1)
  ];
}
function an(e) {
  return e = ba(Math.abs(e)), e ? e[1] : NaN;
}
function qA(e, t) {
  return function(r, n) {
    for (var i = r.length, a = [], o = 0, l = e[0], u = 0; i > 0 && l > 0 && (u + l + 1 > n && (l = Math.max(1, n - u)), a.push(r.substring(i -= l, i + l)), !((u += l + 1) > n)); )
      l = e[o = (o + 1) % e.length];
    return a.reverse().join(t);
  };
}
function YA(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(r) {
      return e[+r];
    });
  };
}
var VA = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function qn(e) {
  if (!(t = VA.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new Fu({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10]
  });
}
qn.prototype = Fu.prototype;
function Fu(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
Fu.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function XA(e) {
  e: for (var t = e.length, r = 1, n = -1, i; r < t; ++r)
    switch (e[r]) {
      case ".":
        n = i = r;
        break;
      case "0":
        n === 0 && (n = r), i = r;
        break;
      default:
        if (!+e[r]) break e;
        n > 0 && (n = 0);
        break;
    }
  return n > 0 ? e.slice(0, n) + e.slice(i + 1) : e;
}
var xa;
function ZA(e, t) {
  var r = ba(e, t);
  if (!r) return xa = void 0, e.toPrecision(t);
  var n = r[0], i = r[1], a = i - (xa = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, o = n.length;
  return a === o ? n : a > o ? n + new Array(a - o + 1).join("0") : a > 0 ? n.slice(0, a) + "." + n.slice(a) : "0." + new Array(1 - a).join("0") + ba(e, Math.max(0, t + a - 1))[0];
}
function Lf(e, t) {
  var r = ba(e, t);
  if (!r) return e + "";
  var n = r[0], i = r[1];
  return i < 0 ? "0." + new Array(-i).join("0") + n : n.length > i + 1 ? n.slice(0, i + 1) + "." + n.slice(i + 1) : n + new Array(i - n.length + 2).join("0");
}
const zf = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: GA,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => Lf(e * 100, t),
  r: Lf,
  s: ZA,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16)
};
function Bf(e) {
  return e;
}
var Ff = Array.prototype.map, Wf = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function QA(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? Bf : qA(Ff.call(e.grouping, Number), e.thousands + ""), r = e.currency === void 0 ? "" : e.currency[0] + "", n = e.currency === void 0 ? "" : e.currency[1] + "", i = e.decimal === void 0 ? "." : e.decimal + "", a = e.numerals === void 0 ? Bf : YA(Ff.call(e.numerals, String)), o = e.percent === void 0 ? "%" : e.percent + "", l = e.minus === void 0 ? "−" : e.minus + "", u = e.nan === void 0 ? "NaN" : e.nan + "";
  function s(f, d) {
    f = qn(f);
    var h = f.fill, p = f.align, g = f.sign, m = f.symbol, y = f.zero, x = f.width, b = f.comma, w = f.precision, O = f.trim, P = f.type;
    P === "n" ? (b = !0, P = "g") : zf[P] || (w === void 0 && (w = 12), O = !0, P = "g"), (y || h === "0" && p === "=") && (y = !0, h = "0", p = "=");
    var _ = (d && d.prefix !== void 0 ? d.prefix : "") + (m === "$" ? r : m === "#" && /[boxX]/.test(P) ? "0" + P.toLowerCase() : ""), A = (m === "$" ? n : /[%p]/.test(P) ? o : "") + (d && d.suffix !== void 0 ? d.suffix : ""), C = zf[P], T = /[defgprs%]/.test(P);
    w = w === void 0 ? 6 : /[gprs]/.test(P) ? Math.max(1, Math.min(21, w)) : Math.max(0, Math.min(20, w));
    function I(k) {
      var B = _, F = A, U, q, V;
      if (P === "c")
        F = C(k) + F, k = "";
      else {
        k = +k;
        var re = k < 0 || 1 / k < 0;
        if (k = isNaN(k) ? u : C(Math.abs(k), w), O && (k = XA(k)), re && +k == 0 && g !== "+" && (re = !1), B = (re ? g === "(" ? g : l : g === "-" || g === "(" ? "" : g) + B, F = (P === "s" && !isNaN(k) && xa !== void 0 ? Wf[8 + xa / 3] : "") + F + (re && g === "(" ? ")" : ""), T) {
          for (U = -1, q = k.length; ++U < q; )
            if (V = k.charCodeAt(U), 48 > V || V > 57) {
              F = (V === 46 ? i + k.slice(U + 1) : k.slice(U)) + F, k = k.slice(0, U);
              break;
            }
        }
      }
      b && !y && (k = t(k, 1 / 0));
      var Q = B.length + k.length + F.length, M = Q < x ? new Array(x - Q + 1).join(h) : "";
      switch (b && y && (k = t(M + k, M.length ? x - F.length : 1 / 0), M = ""), p) {
        case "<":
          k = B + k + F + M;
          break;
        case "=":
          k = B + M + k + F;
          break;
        case "^":
          k = M.slice(0, Q = M.length >> 1) + B + k + F + M.slice(Q);
          break;
        default:
          k = M + B + k + F;
          break;
      }
      return a(k);
    }
    return I.toString = function() {
      return f + "";
    }, I;
  }
  function c(f, d) {
    var h = Math.max(-8, Math.min(8, Math.floor(an(d) / 3))) * 3, p = Math.pow(10, -h), g = s((f = qn(f), f.type = "f", f), { suffix: Wf[8 + h / 3] });
    return function(m) {
      return g(p * m);
    };
  }
  return {
    format: s,
    formatPrefix: c
  };
}
var ki, Wu, Hp;
JA({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function JA(e) {
  return ki = QA(e), Wu = ki.format, Hp = ki.formatPrefix, ki;
}
function eS(e) {
  return Math.max(0, -an(Math.abs(e)));
}
function tS(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(an(t) / 3))) * 3 - an(Math.abs(e)));
}
function rS(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, an(t) - an(e)) + 1;
}
function Gp(e, t, r, n) {
  var i = Tl(e, t, r), a;
  switch (n = qn(n ?? ",f"), n.type) {
    case "s": {
      var o = Math.max(Math.abs(e), Math.abs(t));
      return n.precision == null && !isNaN(a = tS(i, o)) && (n.precision = a), Hp(n, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(a = rS(i, Math.max(Math.abs(e), Math.abs(t)))) && (n.precision = a - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(a = eS(i)) && (n.precision = a - (n.type === "%") * 2);
      break;
    }
  }
  return Wu(n);
}
function ur(e) {
  var t = e.domain;
  return e.ticks = function(r) {
    var n = t();
    return Il(n[0], n[n.length - 1], r ?? 10);
  }, e.tickFormat = function(r, n) {
    var i = t();
    return Gp(i[0], i[i.length - 1], r ?? 10, n);
  }, e.nice = function(r) {
    r == null && (r = 10);
    var n = t(), i = 0, a = n.length - 1, o = n[i], l = n[a], u, s, c = 10;
    for (l < o && (s = o, o = l, l = s, s = i, i = a, a = s); c-- > 0; ) {
      if (s = Ml(o, l, r), s === u)
        return n[i] = o, n[a] = l, t(n);
      if (s > 0)
        o = Math.floor(o / s) * s, l = Math.ceil(l / s) * s;
      else if (s < 0)
        o = Math.ceil(o * s) / s, l = Math.floor(l * s) / s;
      else
        break;
      u = s;
    }
    return e;
  }, e;
}
function qp() {
  var e = Bu();
  return e.copy = function() {
    return li(e, qp());
  }, ct.apply(e, arguments), ur(e);
}
function Yp(e) {
  var t;
  function r(n) {
    return n == null || isNaN(n = +n) ? t : n;
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (e = Array.from(n, ya), r) : e.slice();
  }, r.unknown = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.copy = function() {
    return Yp(e).unknown(t);
  }, e = arguments.length ? Array.from(e, ya) : [0, 1], ur(r);
}
function Vp(e, t) {
  e = e.slice();
  var r = 0, n = e.length - 1, i = e[r], a = e[n], o;
  return a < i && (o = r, r = n, n = o, o = i, i = a, a = o), e[r] = t.floor(i), e[n] = t.ceil(a), e;
}
function Uf(e) {
  return Math.log(e);
}
function Kf(e) {
  return Math.exp(e);
}
function nS(e) {
  return -Math.log(-e);
}
function iS(e) {
  return -Math.exp(-e);
}
function aS(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function oS(e) {
  return e === 10 ? aS : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function lS(e) {
  return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function Hf(e) {
  return (t, r) => -e(-t, r);
}
function Uu(e) {
  const t = e(Uf, Kf), r = t.domain;
  let n = 10, i, a;
  function o() {
    return i = lS(n), a = oS(n), r()[0] < 0 ? (i = Hf(i), a = Hf(a), e(nS, iS)) : e(Uf, Kf), t;
  }
  return t.base = function(l) {
    return arguments.length ? (n = +l, o()) : n;
  }, t.domain = function(l) {
    return arguments.length ? (r(l), o()) : r();
  }, t.ticks = (l) => {
    const u = r();
    let s = u[0], c = u[u.length - 1];
    const f = c < s;
    f && ([s, c] = [c, s]);
    let d = i(s), h = i(c), p, g;
    const m = l == null ? 10 : +l;
    let y = [];
    if (!(n % 1) && h - d < m) {
      if (d = Math.floor(d), h = Math.ceil(h), s > 0) {
        for (; d <= h; ++d)
          for (p = 1; p < n; ++p)
            if (g = d < 0 ? p / a(-d) : p * a(d), !(g < s)) {
              if (g > c) break;
              y.push(g);
            }
      } else for (; d <= h; ++d)
        for (p = n - 1; p >= 1; --p)
          if (g = d > 0 ? p / a(-d) : p * a(d), !(g < s)) {
            if (g > c) break;
            y.push(g);
          }
      y.length * 2 < m && (y = Il(s, c, m));
    } else
      y = Il(d, h, Math.min(h - d, m)).map(a);
    return f ? y.reverse() : y;
  }, t.tickFormat = (l, u) => {
    if (l == null && (l = 10), u == null && (u = n === 10 ? "s" : ","), typeof u != "function" && (!(n % 1) && (u = qn(u)).precision == null && (u.trim = !0), u = Wu(u)), l === 1 / 0) return u;
    const s = Math.max(1, n * l / t.ticks().length);
    return (c) => {
      let f = c / a(Math.round(i(c)));
      return f * n < n - 0.5 && (f *= n), f <= s ? u(c) : "";
    };
  }, t.nice = () => r(Vp(r(), {
    floor: (l) => a(Math.floor(i(l))),
    ceil: (l) => a(Math.ceil(i(l)))
  })), t;
}
function Xp() {
  const e = Uu(fo()).domain([1, 10]);
  return e.copy = () => li(e, Xp()).base(e.base()), ct.apply(e, arguments), e;
}
function Gf(e) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function qf(e) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function Ku(e) {
  var t = 1, r = e(Gf(t), qf(t));
  return r.constant = function(n) {
    return arguments.length ? e(Gf(t = +n), qf(t)) : t;
  }, ur(r);
}
function Zp() {
  var e = Ku(fo());
  return e.copy = function() {
    return li(e, Zp()).constant(e.constant());
  }, ct.apply(e, arguments);
}
function Yf(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function uS(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function sS(e) {
  return e < 0 ? -e * e : e * e;
}
function Hu(e) {
  var t = e(ze, ze), r = 1;
  function n() {
    return r === 1 ? e(ze, ze) : r === 0.5 ? e(uS, sS) : e(Yf(r), Yf(1 / r));
  }
  return t.exponent = function(i) {
    return arguments.length ? (r = +i, n()) : r;
  }, ur(t);
}
function Gu() {
  var e = Hu(fo());
  return e.copy = function() {
    return li(e, Gu()).exponent(e.exponent());
  }, ct.apply(e, arguments), e;
}
function cS() {
  return Gu.apply(null, arguments).exponent(0.5);
}
function Vf(e) {
  return Math.sign(e) * e * e;
}
function fS(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function Qp() {
  var e = Bu(), t = [0, 1], r = !1, n;
  function i(a) {
    var o = fS(e(a));
    return isNaN(o) ? n : r ? Math.round(o) : o;
  }
  return i.invert = function(a) {
    return e.invert(Vf(a));
  }, i.domain = function(a) {
    return arguments.length ? (e.domain(a), i) : e.domain();
  }, i.range = function(a) {
    return arguments.length ? (e.range((t = Array.from(a, ya)).map(Vf)), i) : t.slice();
  }, i.rangeRound = function(a) {
    return i.range(a).round(!0);
  }, i.round = function(a) {
    return arguments.length ? (r = !!a, i) : r;
  }, i.clamp = function(a) {
    return arguments.length ? (e.clamp(a), i) : e.clamp();
  }, i.unknown = function(a) {
    return arguments.length ? (n = a, i) : n;
  }, i.copy = function() {
    return Qp(e.domain(), t).round(r).clamp(e.clamp()).unknown(n);
  }, ct.apply(i, arguments), ur(i);
}
function Jp() {
  var e = [], t = [], r = [], n;
  function i() {
    var o = 0, l = Math.max(1, t.length);
    for (r = new Array(l - 1); ++o < l; ) r[o - 1] = pA(e, o / l);
    return a;
  }
  function a(o) {
    return o == null || isNaN(o = +o) ? n : t[ai(r, o)];
  }
  return a.invertExtent = function(o) {
    var l = t.indexOf(o);
    return l < 0 ? [NaN, NaN] : [
      l > 0 ? r[l - 1] : e[0],
      l < r.length ? r[l] : e[e.length - 1]
    ];
  }, a.domain = function(o) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let l of o) l != null && !isNaN(l = +l) && e.push(l);
    return e.sort(ar), i();
  }, a.range = function(o) {
    return arguments.length ? (t = Array.from(o), i()) : t.slice();
  }, a.unknown = function(o) {
    return arguments.length ? (n = o, a) : n;
  }, a.quantiles = function() {
    return r.slice();
  }, a.copy = function() {
    return Jp().domain(e).range(t).unknown(n);
  }, ct.apply(a, arguments);
}
function em() {
  var e = 0, t = 1, r = 1, n = [0.5], i = [0, 1], a;
  function o(u) {
    return u != null && u <= u ? i[ai(n, u, 0, r)] : a;
  }
  function l() {
    var u = -1;
    for (n = new Array(r); ++u < r; ) n[u] = ((u + 1) * t - (u - r) * e) / (r + 1);
    return o;
  }
  return o.domain = function(u) {
    return arguments.length ? ([e, t] = u, e = +e, t = +t, l()) : [e, t];
  }, o.range = function(u) {
    return arguments.length ? (r = (i = Array.from(u)).length - 1, l()) : i.slice();
  }, o.invertExtent = function(u) {
    var s = i.indexOf(u);
    return s < 0 ? [NaN, NaN] : s < 1 ? [e, n[0]] : s >= r ? [n[r - 1], t] : [n[s - 1], n[s]];
  }, o.unknown = function(u) {
    return arguments.length && (a = u), o;
  }, o.thresholds = function() {
    return n.slice();
  }, o.copy = function() {
    return em().domain([e, t]).range(i).unknown(a);
  }, ct.apply(ur(o), arguments);
}
function tm() {
  var e = [0.5], t = [0, 1], r, n = 1;
  function i(a) {
    return a != null && a <= a ? t[ai(e, a, 0, n)] : r;
  }
  return i.domain = function(a) {
    return arguments.length ? (e = Array.from(a), n = Math.min(e.length, t.length - 1), i) : e.slice();
  }, i.range = function(a) {
    return arguments.length ? (t = Array.from(a), n = Math.min(e.length, t.length - 1), i) : t.slice();
  }, i.invertExtent = function(a) {
    var o = t.indexOf(a);
    return [e[o - 1], e[o]];
  }, i.unknown = function(a) {
    return arguments.length ? (r = a, i) : r;
  }, i.copy = function() {
    return tm().domain(e).range(t).unknown(r);
  }, ct.apply(i, arguments);
}
const Lo = /* @__PURE__ */ new Date(), zo = /* @__PURE__ */ new Date();
function ge(e, t, r, n) {
  function i(a) {
    return e(a = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+a)), a;
  }
  return i.floor = (a) => (e(a = /* @__PURE__ */ new Date(+a)), a), i.ceil = (a) => (e(a = new Date(a - 1)), t(a, 1), e(a), a), i.round = (a) => {
    const o = i(a), l = i.ceil(a);
    return a - o < l - a ? o : l;
  }, i.offset = (a, o) => (t(a = /* @__PURE__ */ new Date(+a), o == null ? 1 : Math.floor(o)), a), i.range = (a, o, l) => {
    const u = [];
    if (a = i.ceil(a), l = l == null ? 1 : Math.floor(l), !(a < o) || !(l > 0)) return u;
    let s;
    do
      u.push(s = /* @__PURE__ */ new Date(+a)), t(a, l), e(a);
    while (s < a && a < o);
    return u;
  }, i.filter = (a) => ge((o) => {
    if (o >= o) for (; e(o), !a(o); ) o.setTime(o - 1);
  }, (o, l) => {
    if (o >= o)
      if (l < 0) for (; ++l <= 0; )
        for (; t(o, -1), !a(o); )
          ;
      else for (; --l >= 0; )
        for (; t(o, 1), !a(o); )
          ;
  }), r && (i.count = (a, o) => (Lo.setTime(+a), zo.setTime(+o), e(Lo), e(zo), Math.floor(r(Lo, zo))), i.every = (a) => (a = Math.floor(a), !isFinite(a) || !(a > 0) ? null : a > 1 ? i.filter(n ? (o) => n(o) % a === 0 : (o) => i.count(0, o) % a === 0) : i)), i;
}
const wa = ge(() => {
}, (e, t) => {
  e.setTime(+e + t);
}, (e, t) => t - e);
wa.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? ge((t) => {
  t.setTime(Math.floor(t / e) * e);
}, (t, r) => {
  t.setTime(+t + r * e);
}, (t, r) => (r - t) / e) : wa);
wa.range;
const Rt = 1e3, lt = Rt * 60, Lt = lt * 60, Wt = Lt * 24, qu = Wt * 7, Xf = Wt * 30, Bo = Wt * 365, Or = ge((e) => {
  e.setTime(e - e.getMilliseconds());
}, (e, t) => {
  e.setTime(+e + t * Rt);
}, (e, t) => (t - e) / Rt, (e) => e.getUTCSeconds());
Or.range;
const Yu = ge((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * Rt);
}, (e, t) => {
  e.setTime(+e + t * lt);
}, (e, t) => (t - e) / lt, (e) => e.getMinutes());
Yu.range;
const Vu = ge((e) => {
  e.setUTCSeconds(0, 0);
}, (e, t) => {
  e.setTime(+e + t * lt);
}, (e, t) => (t - e) / lt, (e) => e.getUTCMinutes());
Vu.range;
const Xu = ge((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * Rt - e.getMinutes() * lt);
}, (e, t) => {
  e.setTime(+e + t * Lt);
}, (e, t) => (t - e) / Lt, (e) => e.getHours());
Xu.range;
const Zu = ge((e) => {
  e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
  e.setTime(+e + t * Lt);
}, (e, t) => (t - e) / Lt, (e) => e.getUTCHours());
Zu.range;
const ui = ge(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * lt) / Wt,
  (e) => e.getDate() - 1
);
ui.range;
const vo = ge((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / Wt, (e) => e.getUTCDate() - 1);
vo.range;
const rm = ge((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / Wt, (e) => Math.floor(e / Wt));
rm.range;
function Lr(e) {
  return ge((t) => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setDate(t.getDate() + r * 7);
  }, (t, r) => (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * lt) / qu);
}
const ho = Lr(0), Pa = Lr(1), dS = Lr(2), vS = Lr(3), on = Lr(4), hS = Lr(5), pS = Lr(6);
ho.range;
Pa.range;
dS.range;
vS.range;
on.range;
hS.range;
pS.range;
function zr(e) {
  return ge((t) => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setUTCDate(t.getUTCDate() + r * 7);
  }, (t, r) => (r - t) / qu);
}
const po = zr(0), Oa = zr(1), mS = zr(2), gS = zr(3), ln = zr(4), yS = zr(5), bS = zr(6);
po.range;
Oa.range;
mS.range;
gS.range;
ln.range;
yS.range;
bS.range;
const Qu = ge((e) => {
  e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
Qu.range;
const Ju = ge((e) => {
  e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
Ju.range;
const Ut = ge((e) => {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setFullYear(e.getFullYear() + t);
}, (e, t) => t.getFullYear() - e.getFullYear(), (e) => e.getFullYear());
Ut.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : ge((t) => {
  t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, r) => {
  t.setFullYear(t.getFullYear() + r * e);
});
Ut.range;
const Kt = ge((e) => {
  e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCFullYear(e.getUTCFullYear() + t);
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), (e) => e.getUTCFullYear());
Kt.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : ge((t) => {
  t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, r) => {
  t.setUTCFullYear(t.getUTCFullYear() + r * e);
});
Kt.range;
function nm(e, t, r, n, i, a) {
  const o = [
    [Or, 1, Rt],
    [Or, 5, 5 * Rt],
    [Or, 15, 15 * Rt],
    [Or, 30, 30 * Rt],
    [a, 1, lt],
    [a, 5, 5 * lt],
    [a, 15, 15 * lt],
    [a, 30, 30 * lt],
    [i, 1, Lt],
    [i, 3, 3 * Lt],
    [i, 6, 6 * Lt],
    [i, 12, 12 * Lt],
    [n, 1, Wt],
    [n, 2, 2 * Wt],
    [r, 1, qu],
    [t, 1, Xf],
    [t, 3, 3 * Xf],
    [e, 1, Bo]
  ];
  function l(s, c, f) {
    const d = c < s;
    d && ([s, c] = [c, s]);
    const h = f && typeof f.range == "function" ? f : u(s, c, f), p = h ? h.range(s, +c + 1) : [];
    return d ? p.reverse() : p;
  }
  function u(s, c, f) {
    const d = Math.abs(c - s) / f, h = Du(([, , m]) => m).right(o, d);
    if (h === o.length) return e.every(Tl(s / Bo, c / Bo, f));
    if (h === 0) return wa.every(Math.max(Tl(s, c, f), 1));
    const [p, g] = o[d / o[h - 1][2] < o[h][2] / d ? h - 1 : h];
    return p.every(g);
  }
  return [l, u];
}
const [xS, wS] = nm(Kt, Ju, po, rm, Zu, Vu), [PS, OS] = nm(Ut, Qu, ho, ui, Xu, Yu);
function Fo(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function Wo(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function An(e, t, r) {
  return { y: e, m: t, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function AS(e) {
  var t = e.dateTime, r = e.date, n = e.time, i = e.periods, a = e.days, o = e.shortDays, l = e.months, u = e.shortMonths, s = Sn(i), c = _n(i), f = Sn(a), d = _n(a), h = Sn(o), p = _n(o), g = Sn(l), m = _n(l), y = Sn(u), x = _n(u), b = {
    a: V,
    A: re,
    b: Q,
    B: M,
    c: null,
    d: rd,
    e: rd,
    f: qS,
    g: n_,
    G: a_,
    H: KS,
    I: HS,
    j: GS,
    L: im,
    m: YS,
    M: VS,
    p: Le,
    q: se,
    Q: ad,
    s: od,
    S: XS,
    u: ZS,
    U: QS,
    V: JS,
    w: e_,
    W: t_,
    x: null,
    X: null,
    y: r_,
    Y: i_,
    Z: o_,
    "%": id
  }, w = {
    a: Ue,
    A: be,
    b: ne,
    B: fe,
    c: null,
    d: nd,
    e: nd,
    f: c_,
    g: x_,
    G: P_,
    H: l_,
    I: u_,
    j: s_,
    L: om,
    m: f_,
    M: d_,
    p: yt,
    q: Se,
    Q: ad,
    s: od,
    S: v_,
    u: h_,
    U: p_,
    V: m_,
    w: g_,
    W: y_,
    x: null,
    X: null,
    y: b_,
    Y: w_,
    Z: O_,
    "%": id
  }, O = {
    a: T,
    A: I,
    b: k,
    B,
    c: F,
    d: ed,
    e: ed,
    f: BS,
    g: Jf,
    G: Qf,
    H: td,
    I: td,
    j: $S,
    L: zS,
    m: NS,
    M: RS,
    p: C,
    q: DS,
    Q: WS,
    s: US,
    S: LS,
    u: CS,
    U: jS,
    V: IS,
    w: ES,
    W: MS,
    x: U,
    X: q,
    y: Jf,
    Y: Qf,
    Z: TS,
    "%": FS
  };
  b.x = P(r, b), b.X = P(n, b), b.c = P(t, b), w.x = P(r, w), w.X = P(n, w), w.c = P(t, w);
  function P(j, D) {
    return function(H) {
      var E = [], xe = -1, Z = 0, Ye = j.length, Ve, fr, Ds;
      for (H instanceof Date || (H = /* @__PURE__ */ new Date(+H)); ++xe < Ye; )
        j.charCodeAt(xe) === 37 && (E.push(j.slice(Z, xe)), (fr = Zf[Ve = j.charAt(++xe)]) != null ? Ve = j.charAt(++xe) : fr = Ve === "e" ? " " : "0", (Ds = D[Ve]) && (Ve = Ds(H, fr)), E.push(Ve), Z = xe + 1);
      return E.push(j.slice(Z, xe)), E.join("");
    };
  }
  function _(j, D) {
    return function(H) {
      var E = An(1900, void 0, 1), xe = A(E, j, H += "", 0), Z, Ye;
      if (xe != H.length) return null;
      if ("Q" in E) return new Date(E.Q);
      if ("s" in E) return new Date(E.s * 1e3 + ("L" in E ? E.L : 0));
      if (D && !("Z" in E) && (E.Z = 0), "p" in E && (E.H = E.H % 12 + E.p * 12), E.m === void 0 && (E.m = "q" in E ? E.q : 0), "V" in E) {
        if (E.V < 1 || E.V > 53) return null;
        "w" in E || (E.w = 1), "Z" in E ? (Z = Wo(An(E.y, 0, 1)), Ye = Z.getUTCDay(), Z = Ye > 4 || Ye === 0 ? Oa.ceil(Z) : Oa(Z), Z = vo.offset(Z, (E.V - 1) * 7), E.y = Z.getUTCFullYear(), E.m = Z.getUTCMonth(), E.d = Z.getUTCDate() + (E.w + 6) % 7) : (Z = Fo(An(E.y, 0, 1)), Ye = Z.getDay(), Z = Ye > 4 || Ye === 0 ? Pa.ceil(Z) : Pa(Z), Z = ui.offset(Z, (E.V - 1) * 7), E.y = Z.getFullYear(), E.m = Z.getMonth(), E.d = Z.getDate() + (E.w + 6) % 7);
      } else ("W" in E || "U" in E) && ("w" in E || (E.w = "u" in E ? E.u % 7 : "W" in E ? 1 : 0), Ye = "Z" in E ? Wo(An(E.y, 0, 1)).getUTCDay() : Fo(An(E.y, 0, 1)).getDay(), E.m = 0, E.d = "W" in E ? (E.w + 6) % 7 + E.W * 7 - (Ye + 5) % 7 : E.w + E.U * 7 - (Ye + 6) % 7);
      return "Z" in E ? (E.H += E.Z / 100 | 0, E.M += E.Z % 100, Wo(E)) : Fo(E);
    };
  }
  function A(j, D, H, E) {
    for (var xe = 0, Z = D.length, Ye = H.length, Ve, fr; xe < Z; ) {
      if (E >= Ye) return -1;
      if (Ve = D.charCodeAt(xe++), Ve === 37) {
        if (Ve = D.charAt(xe++), fr = O[Ve in Zf ? D.charAt(xe++) : Ve], !fr || (E = fr(j, H, E)) < 0) return -1;
      } else if (Ve != H.charCodeAt(E++))
        return -1;
    }
    return E;
  }
  function C(j, D, H) {
    var E = s.exec(D.slice(H));
    return E ? (j.p = c.get(E[0].toLowerCase()), H + E[0].length) : -1;
  }
  function T(j, D, H) {
    var E = h.exec(D.slice(H));
    return E ? (j.w = p.get(E[0].toLowerCase()), H + E[0].length) : -1;
  }
  function I(j, D, H) {
    var E = f.exec(D.slice(H));
    return E ? (j.w = d.get(E[0].toLowerCase()), H + E[0].length) : -1;
  }
  function k(j, D, H) {
    var E = y.exec(D.slice(H));
    return E ? (j.m = x.get(E[0].toLowerCase()), H + E[0].length) : -1;
  }
  function B(j, D, H) {
    var E = g.exec(D.slice(H));
    return E ? (j.m = m.get(E[0].toLowerCase()), H + E[0].length) : -1;
  }
  function F(j, D, H) {
    return A(j, t, D, H);
  }
  function U(j, D, H) {
    return A(j, r, D, H);
  }
  function q(j, D, H) {
    return A(j, n, D, H);
  }
  function V(j) {
    return o[j.getDay()];
  }
  function re(j) {
    return a[j.getDay()];
  }
  function Q(j) {
    return u[j.getMonth()];
  }
  function M(j) {
    return l[j.getMonth()];
  }
  function Le(j) {
    return i[+(j.getHours() >= 12)];
  }
  function se(j) {
    return 1 + ~~(j.getMonth() / 3);
  }
  function Ue(j) {
    return o[j.getUTCDay()];
  }
  function be(j) {
    return a[j.getUTCDay()];
  }
  function ne(j) {
    return u[j.getUTCMonth()];
  }
  function fe(j) {
    return l[j.getUTCMonth()];
  }
  function yt(j) {
    return i[+(j.getUTCHours() >= 12)];
  }
  function Se(j) {
    return 1 + ~~(j.getUTCMonth() / 3);
  }
  return {
    format: function(j) {
      var D = P(j += "", b);
      return D.toString = function() {
        return j;
      }, D;
    },
    parse: function(j) {
      var D = _(j += "", !1);
      return D.toString = function() {
        return j;
      }, D;
    },
    utcFormat: function(j) {
      var D = P(j += "", w);
      return D.toString = function() {
        return j;
      }, D;
    },
    utcParse: function(j) {
      var D = _(j += "", !0);
      return D.toString = function() {
        return j;
      }, D;
    }
  };
}
var Zf = { "-": "", _: " ", 0: "0" }, Ae = /^\s*\d+/, SS = /^%/, _S = /[\\^$*+?|[\]().{}]/g;
function X(e, t, r) {
  var n = e < 0 ? "-" : "", i = (n ? -e : e) + "", a = i.length;
  return n + (a < r ? new Array(r - a + 1).join(t) + i : i);
}
function kS(e) {
  return e.replace(_S, "\\$&");
}
function Sn(e) {
  return new RegExp("^(?:" + e.map(kS).join("|") + ")", "i");
}
function _n(e) {
  return new Map(e.map((t, r) => [t.toLowerCase(), r]));
}
function ES(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 1));
  return n ? (e.w = +n[0], r + n[0].length) : -1;
}
function CS(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 1));
  return n ? (e.u = +n[0], r + n[0].length) : -1;
}
function jS(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.U = +n[0], r + n[0].length) : -1;
}
function IS(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.V = +n[0], r + n[0].length) : -1;
}
function MS(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.W = +n[0], r + n[0].length) : -1;
}
function Qf(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 4));
  return n ? (e.y = +n[0], r + n[0].length) : -1;
}
function Jf(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1;
}
function TS(e, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
  return n ? (e.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1;
}
function DS(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 1));
  return n ? (e.q = n[0] * 3 - 3, r + n[0].length) : -1;
}
function NS(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.m = n[0] - 1, r + n[0].length) : -1;
}
function ed(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.d = +n[0], r + n[0].length) : -1;
}
function $S(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 3));
  return n ? (e.m = 0, e.d = +n[0], r + n[0].length) : -1;
}
function td(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.H = +n[0], r + n[0].length) : -1;
}
function RS(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.M = +n[0], r + n[0].length) : -1;
}
function LS(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.S = +n[0], r + n[0].length) : -1;
}
function zS(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 3));
  return n ? (e.L = +n[0], r + n[0].length) : -1;
}
function BS(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 6));
  return n ? (e.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1;
}
function FS(e, t, r) {
  var n = SS.exec(t.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function WS(e, t, r) {
  var n = Ae.exec(t.slice(r));
  return n ? (e.Q = +n[0], r + n[0].length) : -1;
}
function US(e, t, r) {
  var n = Ae.exec(t.slice(r));
  return n ? (e.s = +n[0], r + n[0].length) : -1;
}
function rd(e, t) {
  return X(e.getDate(), t, 2);
}
function KS(e, t) {
  return X(e.getHours(), t, 2);
}
function HS(e, t) {
  return X(e.getHours() % 12 || 12, t, 2);
}
function GS(e, t) {
  return X(1 + ui.count(Ut(e), e), t, 3);
}
function im(e, t) {
  return X(e.getMilliseconds(), t, 3);
}
function qS(e, t) {
  return im(e, t) + "000";
}
function YS(e, t) {
  return X(e.getMonth() + 1, t, 2);
}
function VS(e, t) {
  return X(e.getMinutes(), t, 2);
}
function XS(e, t) {
  return X(e.getSeconds(), t, 2);
}
function ZS(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function QS(e, t) {
  return X(ho.count(Ut(e) - 1, e), t, 2);
}
function am(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? on(e) : on.ceil(e);
}
function JS(e, t) {
  return e = am(e), X(on.count(Ut(e), e) + (Ut(e).getDay() === 4), t, 2);
}
function e_(e) {
  return e.getDay();
}
function t_(e, t) {
  return X(Pa.count(Ut(e) - 1, e), t, 2);
}
function r_(e, t) {
  return X(e.getFullYear() % 100, t, 2);
}
function n_(e, t) {
  return e = am(e), X(e.getFullYear() % 100, t, 2);
}
function i_(e, t) {
  return X(e.getFullYear() % 1e4, t, 4);
}
function a_(e, t) {
  var r = e.getDay();
  return e = r >= 4 || r === 0 ? on(e) : on.ceil(e), X(e.getFullYear() % 1e4, t, 4);
}
function o_(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + X(t / 60 | 0, "0", 2) + X(t % 60, "0", 2);
}
function nd(e, t) {
  return X(e.getUTCDate(), t, 2);
}
function l_(e, t) {
  return X(e.getUTCHours(), t, 2);
}
function u_(e, t) {
  return X(e.getUTCHours() % 12 || 12, t, 2);
}
function s_(e, t) {
  return X(1 + vo.count(Kt(e), e), t, 3);
}
function om(e, t) {
  return X(e.getUTCMilliseconds(), t, 3);
}
function c_(e, t) {
  return om(e, t) + "000";
}
function f_(e, t) {
  return X(e.getUTCMonth() + 1, t, 2);
}
function d_(e, t) {
  return X(e.getUTCMinutes(), t, 2);
}
function v_(e, t) {
  return X(e.getUTCSeconds(), t, 2);
}
function h_(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function p_(e, t) {
  return X(po.count(Kt(e) - 1, e), t, 2);
}
function lm(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? ln(e) : ln.ceil(e);
}
function m_(e, t) {
  return e = lm(e), X(ln.count(Kt(e), e) + (Kt(e).getUTCDay() === 4), t, 2);
}
function g_(e) {
  return e.getUTCDay();
}
function y_(e, t) {
  return X(Oa.count(Kt(e) - 1, e), t, 2);
}
function b_(e, t) {
  return X(e.getUTCFullYear() % 100, t, 2);
}
function x_(e, t) {
  return e = lm(e), X(e.getUTCFullYear() % 100, t, 2);
}
function w_(e, t) {
  return X(e.getUTCFullYear() % 1e4, t, 4);
}
function P_(e, t) {
  var r = e.getUTCDay();
  return e = r >= 4 || r === 0 ? ln(e) : ln.ceil(e), X(e.getUTCFullYear() % 1e4, t, 4);
}
function O_() {
  return "+0000";
}
function id() {
  return "%";
}
function ad(e) {
  return +e;
}
function od(e) {
  return Math.floor(+e / 1e3);
}
var Ur, um, sm;
A_({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function A_(e) {
  return Ur = AS(e), um = Ur.format, Ur.parse, sm = Ur.utcFormat, Ur.utcParse, Ur;
}
function S_(e) {
  return new Date(e);
}
function __(e) {
  return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function es(e, t, r, n, i, a, o, l, u, s) {
  var c = Bu(), f = c.invert, d = c.domain, h = s(".%L"), p = s(":%S"), g = s("%I:%M"), m = s("%I %p"), y = s("%a %d"), x = s("%b %d"), b = s("%B"), w = s("%Y");
  function O(P) {
    return (u(P) < P ? h : l(P) < P ? p : o(P) < P ? g : a(P) < P ? m : n(P) < P ? i(P) < P ? y : x : r(P) < P ? b : w)(P);
  }
  return c.invert = function(P) {
    return new Date(f(P));
  }, c.domain = function(P) {
    return arguments.length ? d(Array.from(P, __)) : d().map(S_);
  }, c.ticks = function(P) {
    var _ = d();
    return e(_[0], _[_.length - 1], P ?? 10);
  }, c.tickFormat = function(P, _) {
    return _ == null ? O : s(_);
  }, c.nice = function(P) {
    var _ = d();
    return (!P || typeof P.range != "function") && (P = t(_[0], _[_.length - 1], P ?? 10)), P ? d(Vp(_, P)) : c;
  }, c.copy = function() {
    return li(c, es(e, t, r, n, i, a, o, l, u, s));
  }, c;
}
function k_() {
  return ct.apply(es(PS, OS, Ut, Qu, ho, ui, Xu, Yu, Or, um).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function E_() {
  return ct.apply(es(xS, wS, Kt, Ju, po, vo, Zu, Vu, Or, sm).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
function mo() {
  var e = 0, t = 1, r, n, i, a, o = ze, l = !1, u;
  function s(f) {
    return f == null || isNaN(f = +f) ? u : o(i === 0 ? 0.5 : (f = (a(f) - r) * i, l ? Math.max(0, Math.min(1, f)) : f));
  }
  s.domain = function(f) {
    return arguments.length ? ([e, t] = f, r = a(e = +e), n = a(t = +t), i = r === n ? 0 : 1 / (n - r), s) : [e, t];
  }, s.clamp = function(f) {
    return arguments.length ? (l = !!f, s) : l;
  }, s.interpolator = function(f) {
    return arguments.length ? (o = f, s) : o;
  };
  function c(f) {
    return function(d) {
      var h, p;
      return arguments.length ? ([h, p] = d, o = f(h, p), s) : [o(0), o(1)];
    };
  }
  return s.range = c(vn), s.rangeRound = c(zu), s.unknown = function(f) {
    return arguments.length ? (u = f, s) : u;
  }, function(f) {
    return a = f, r = f(e), n = f(t), i = r === n ? 0 : 1 / (n - r), s;
  };
}
function sr(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function cm() {
  var e = ur(mo()(ze));
  return e.copy = function() {
    return sr(e, cm());
  }, Vt.apply(e, arguments);
}
function fm() {
  var e = Uu(mo()).domain([1, 10]);
  return e.copy = function() {
    return sr(e, fm()).base(e.base());
  }, Vt.apply(e, arguments);
}
function dm() {
  var e = Ku(mo());
  return e.copy = function() {
    return sr(e, dm()).constant(e.constant());
  }, Vt.apply(e, arguments);
}
function ts() {
  var e = Hu(mo());
  return e.copy = function() {
    return sr(e, ts()).exponent(e.exponent());
  }, Vt.apply(e, arguments);
}
function C_() {
  return ts.apply(null, arguments).exponent(0.5);
}
function vm() {
  var e = [], t = ze;
  function r(n) {
    if (n != null && !isNaN(n = +n)) return t((ai(e, n, 1) - 1) / (e.length - 1));
  }
  return r.domain = function(n) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let i of n) i != null && !isNaN(i = +i) && e.push(i);
    return e.sort(ar), r;
  }, r.interpolator = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.range = function() {
    return e.map((n, i) => t(i / (e.length - 1)));
  }, r.quantiles = function(n) {
    return Array.from({ length: n + 1 }, (i, a) => hA(e, a / n));
  }, r.copy = function() {
    return vm(t).domain(e);
  }, Vt.apply(r, arguments);
}
function go() {
  var e = 0, t = 0.5, r = 1, n = 1, i, a, o, l, u, s = ze, c, f = !1, d;
  function h(g) {
    return isNaN(g = +g) ? d : (g = 0.5 + ((g = +c(g)) - a) * (n * g < n * a ? l : u), s(f ? Math.max(0, Math.min(1, g)) : g));
  }
  h.domain = function(g) {
    return arguments.length ? ([e, t, r] = g, i = c(e = +e), a = c(t = +t), o = c(r = +r), l = i === a ? 0 : 0.5 / (a - i), u = a === o ? 0 : 0.5 / (o - a), n = a < i ? -1 : 1, h) : [e, t, r];
  }, h.clamp = function(g) {
    return arguments.length ? (f = !!g, h) : f;
  }, h.interpolator = function(g) {
    return arguments.length ? (s = g, h) : s;
  };
  function p(g) {
    return function(m) {
      var y, x, b;
      return arguments.length ? ([y, x, b] = m, s = FA(g, [y, x, b]), h) : [s(0), s(0.5), s(1)];
    };
  }
  return h.range = p(vn), h.rangeRound = p(zu), h.unknown = function(g) {
    return arguments.length ? (d = g, h) : d;
  }, function(g) {
    return c = g, i = g(e), a = g(t), o = g(r), l = i === a ? 0 : 0.5 / (a - i), u = a === o ? 0 : 0.5 / (o - a), n = a < i ? -1 : 1, h;
  };
}
function hm() {
  var e = ur(go()(ze));
  return e.copy = function() {
    return sr(e, hm());
  }, Vt.apply(e, arguments);
}
function pm() {
  var e = Uu(go()).domain([0.1, 1, 10]);
  return e.copy = function() {
    return sr(e, pm()).base(e.base());
  }, Vt.apply(e, arguments);
}
function mm() {
  var e = Ku(go());
  return e.copy = function() {
    return sr(e, mm()).constant(e.constant());
  }, Vt.apply(e, arguments);
}
function rs() {
  var e = Hu(go());
  return e.copy = function() {
    return sr(e, rs()).exponent(e.exponent());
  }, Vt.apply(e, arguments);
}
function j_() {
  return rs.apply(null, arguments).exponent(0.5);
}
const In = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  scaleBand: $u,
  scaleDiverging: hm,
  scaleDivergingLog: pm,
  scaleDivergingPow: rs,
  scaleDivergingSqrt: j_,
  scaleDivergingSymlog: mm,
  scaleIdentity: Yp,
  scaleImplicit: Dl,
  scaleLinear: qp,
  scaleLog: Xp,
  scaleOrdinal: Nu,
  scalePoint: gA,
  scalePow: Gu,
  scaleQuantile: Jp,
  scaleQuantize: em,
  scaleRadial: Qp,
  scaleSequential: cm,
  scaleSequentialLog: fm,
  scaleSequentialPow: ts,
  scaleSequentialQuantile: vm,
  scaleSequentialSqrt: C_,
  scaleSequentialSymlog: dm,
  scaleSqrt: cS,
  scaleSymlog: Zp,
  scaleThreshold: tm,
  scaleTime: k_,
  scaleUtc: E_,
  tickFormat: Gp
}, Symbol.toStringTag, { value: "Module" }));
function I_(e) {
  if (e in In)
    return In[e]();
  var t = "scale".concat(Zn(e));
  if (t in In)
    return In[t]();
}
function ld(e, t, r) {
  if (typeof e == "function")
    return e.copy().domain(t).range(r);
  if (e != null) {
    var n = I_(e);
    if (n != null)
      return n.domain(t).range(r), n;
  }
}
function ns(e, t, r, n) {
  if (!(r == null || n == null))
    return typeof e.scale == "function" ? ld(e.scale, r, n) : ld(t, r, n);
}
function M_(e) {
  return "scale".concat(Zn(e));
}
function T_(e) {
  return M_(e) in In;
}
var gm = (e, t, r) => {
  if (e != null) {
    var {
      scale: n,
      type: i
    } = e;
    if (n === "auto")
      return i === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !t) ? "point" : i === "category" ? "band" : "linear";
    if (typeof n == "string")
      return T_(n) ? n : "point";
  }
};
function D_(e, t) {
  for (var r = 0, n = e.length, i = e[0] < e[e.length - 1]; r < n; ) {
    var a = Math.floor((r + n) / 2);
    (i ? e[a] < t : e[a] > t) ? r = a + 1 : n = a;
  }
  return r;
}
function ym(e, t) {
  if (e) {
    var r = t ?? e.domain(), n = r.map((a) => {
      var o;
      return (o = e(a)) !== null && o !== void 0 ? o : 0;
    }), i = e.range();
    if (!(r.length === 0 || i.length < 2))
      return (a) => {
        var o, l, u = D_(n, a);
        if (u <= 0)
          return r[0];
        if (u >= r.length)
          return r[r.length - 1];
        var s = (o = n[u - 1]) !== null && o !== void 0 ? o : 0, c = (l = n[u]) !== null && l !== void 0 ? l : 0;
        return Math.abs(a - s) <= Math.abs(a - c) ? r[u - 1] : r[u];
      };
  }
}
function N_(e) {
  if (e != null)
    return "invert" in e && typeof e.invert == "function" ? e.invert.bind(e) : ym(e, void 0);
}
function ud(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Aa(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ud(Object(r), !0).forEach(function(n) {
      $_(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ud(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function $_(e, t, r) {
  return (t = R_(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function R_(e) {
  var t = L_(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function L_(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Ll = [0, "auto"], he = {
  allowDataOverflow: !1,
  allowDecimals: !0,
  allowDuplicatedCategory: !0,
  angle: 0,
  dataKey: void 0,
  domain: void 0,
  height: 30,
  hide: !0,
  id: 0,
  includeHidden: !1,
  interval: "preserveEnd",
  minTickGap: 5,
  mirror: !1,
  name: void 0,
  orientation: "bottom",
  padding: {
    left: 0,
    right: 0
  },
  reversed: !1,
  scale: "auto",
  tick: !0,
  tickCount: 5,
  tickFormatter: void 0,
  ticks: void 0,
  type: "category",
  unit: void 0,
  niceTicks: "auto"
}, bm = (e, t) => e.cartesianAxis.xAxis[t], Xt = (e, t) => {
  var r = bm(e, t);
  return r ?? he;
}, pe = {
  allowDataOverflow: !1,
  allowDecimals: !0,
  allowDuplicatedCategory: !0,
  angle: 0,
  dataKey: void 0,
  domain: Ll,
  hide: !0,
  id: 0,
  includeHidden: !1,
  interval: "preserveEnd",
  minTickGap: 5,
  mirror: !1,
  name: void 0,
  orientation: "left",
  padding: {
    top: 0,
    bottom: 0
  },
  reversed: !1,
  scale: "auto",
  tick: !0,
  tickCount: 5,
  tickFormatter: void 0,
  ticks: void 0,
  type: "number",
  unit: void 0,
  niceTicks: "auto",
  width: ei
}, xm = (e, t) => e.cartesianAxis.yAxis[t], Zt = (e, t) => {
  var r = xm(e, t);
  return r ?? pe;
}, z_ = {
  domain: [0, "auto"],
  includeHidden: !1,
  reversed: !1,
  allowDataOverflow: !1,
  allowDuplicatedCategory: !1,
  dataKey: void 0,
  id: 0,
  name: "",
  range: [64, 64],
  scale: "auto",
  type: "number",
  unit: ""
}, is = (e, t) => {
  var r = e.cartesianAxis.zAxis[t];
  return r ?? z_;
}, We = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return Xt(e, r);
    case "yAxis":
      return Zt(e, r);
    case "zAxis":
      return is(e, r);
    case "angleAxis":
      return Eu(e, r);
    case "radiusAxis":
      return Cu(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, B_ = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return Xt(e, r);
    case "yAxis":
      return Zt(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, si = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return Xt(e, r);
    case "yAxis":
      return Zt(e, r);
    case "angleAxis":
      return Eu(e, r);
    case "radiusAxis":
      return Cu(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, wm = (e) => e.graphicalItems.cartesianItems.some((t) => t.type === "bar") || e.graphicalItems.polarItems.some((t) => t.type === "radialBar");
function Pm(e, t) {
  return (r) => {
    switch (e) {
      case "xAxis":
        return "xAxisId" in r && r.xAxisId === t;
      case "yAxis":
        return "yAxisId" in r && r.yAxisId === t;
      case "zAxis":
        return "zAxisId" in r && r.zAxisId === t;
      case "angleAxis":
        return "angleAxisId" in r && r.angleAxisId === t;
      case "radiusAxis":
        return "radiusAxisId" in r && r.radiusAxisId === t;
      default:
        return !1;
    }
  };
}
var Om = (e) => e.graphicalItems.cartesianItems, F_ = S([Pe, uo], Pm), Am = (e, t, r) => e.filter(r).filter((n) => t?.includeHidden === !0 ? !0 : !n.hide), ci = S([Om, We, F_], Am, {
  memoizeOptions: {
    resultEqualityCheck: co
  }
}), Sm = S([ci], (e) => e.filter((t) => t.type === "area" || t.type === "bar").filter(Mu)), _m = (e) => e.filter((t) => !("stackId" in t) || t.stackId === void 0), W_ = S([ci], _m), km = (e) => e.map((t) => t.data).filter(Boolean).flat(1), U_ = S([ci], km, {
  memoizeOptions: {
    resultEqualityCheck: co
  }
}), Em = (e, t) => {
  var {
    chartData: r = [],
    dataStartIndex: n,
    dataEndIndex: i
  } = t;
  return e.length > 0 ? e : r.slice(n, i + 1);
}, as = S([U_, yp], Em), Cm = (e, t, r) => t?.dataKey != null ? e.map((n) => ({
  value: je(n, t.dataKey)
})) : r.length > 0 ? r.map((n) => n.dataKey).flatMap((n) => e.map((i) => ({
  value: je(i, n)
}))) : e.map((n) => ({
  value: n
})), fi = S([as, We, ci], Cm);
function en(e) {
  if (Ke(e) || e instanceof Date) {
    var t = Number(e);
    if (G(t))
      return t;
  }
}
function sd(e) {
  if (Array.isArray(e)) {
    var t = [en(e[0]), en(e[1])];
    return _t(t) ? t : void 0;
  }
  var r = en(e);
  if (r != null)
    return [r, r];
}
function Ht(e) {
  return e.map(en).filter(He);
}
function K_(e, t) {
  var r = en(e), n = en(t);
  return r == null && n == null ? 0 : r == null ? -1 : n == null ? 1 : r - n;
}
var H_ = S([fi], (e) => e?.map((t) => t.value).sort(K_));
function jm(e, t) {
  switch (e) {
    case "xAxis":
      return t.direction === "x";
    case "yAxis":
      return t.direction === "y";
    default:
      return !1;
  }
}
function G_(e, t, r) {
  return !r || typeof t != "number" || Et(t) ? [] : r.length ? Ht(r.flatMap((n) => {
    var i = je(e, n.dataKey), a, o;
    if (Array.isArray(i) ? [a, o] = i : a = o = i, !(!G(a) || !G(o)))
      return [t - a, t + o];
  })) : [];
}
var ye = (e) => {
  var t = Oe(e), r = dn(e);
  return si(e, t, r);
}, di = S([ye], (e) => e?.dataKey), q_ = S([Sm, yp, ye], Rp), Im = (e, t, r, n) => {
  var i = {}, a = t.reduce((o, l) => {
    if (l.stackId == null)
      return o;
    var u = o[l.stackId];
    return u == null && (u = []), u.push(l), o[l.stackId] = u, o;
  }, i);
  return Object.fromEntries(Object.entries(a).map((o) => {
    var [l, u] = o, s = n ? [...u].reverse() : u, c = s.map(Iu);
    return [l, {
      // @ts-expect-error getStackedData requires that the input is array of objects, Recharts does not test for that
      stackedData: $w(e, c, r),
      graphicalItems: s
    }];
  }));
}, Mm = S([q_, Sm, io, jp], Im), Tm = (e, t, r, n) => {
  var {
    dataStartIndex: i,
    dataEndIndex: a
  } = t;
  if (n == null && r !== "zAxis") {
    var o = Bw(e, i, a);
    if (!(o != null && o[0] === 0 && o[1] === 0))
      return o;
  }
}, Y_ = S([We], (e) => e.allowDataOverflow), os = (e) => {
  var t;
  if (e == null || !("domain" in e))
    return Ll;
  if (e.domain != null)
    return e.domain;
  if ("ticks" in e && e.ticks != null) {
    if (e.type === "number") {
      var r = Ht(e.ticks);
      return [Math.min(...r), Math.max(...r)];
    }
    if (e.type === "category")
      return e.ticks.map(String);
  }
  return (t = e?.domain) !== null && t !== void 0 ? t : Ll;
}, Dm = S([We], os), Nm = S([Dm, Y_], bp), V_ = S([Mm, Yt, Pe, Nm], Tm, {
  memoizeOptions: {
    resultEqualityCheck: so
  }
}), ls = (e) => e.errorBars, X_ = (e, t, r) => e.flatMap((n) => t[n.id]).filter(Boolean).filter((n) => jm(r, n)), Sa = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var i = r.filter(Boolean);
  if (i.length !== 0) {
    var a = i.flat(), o = Math.min(...a), l = Math.max(...a);
    return [o, l];
  }
}, $m = (e, t, r, n, i) => {
  var a, o;
  if (r.length > 0 && e.forEach((l) => {
    r.forEach((u) => {
      var s, c, f = (s = n[u.id]) === null || s === void 0 ? void 0 : s.filter((y) => jm(i, y)), d = je(l, (c = t.dataKey) !== null && c !== void 0 ? c : u.dataKey), h = G_(l, d, f);
      if (h.length >= 2) {
        var p = Math.min(...h), g = Math.max(...h);
        (a == null || p < a) && (a = p), (o == null || g > o) && (o = g);
      }
      var m = sd(d);
      m != null && (a = a == null ? m[0] : Math.min(a, m[0]), o = o == null ? m[1] : Math.max(o, m[1]));
    });
  }), t?.dataKey != null && e.forEach((l) => {
    var u = sd(je(l, t.dataKey));
    u != null && (a = a == null ? u[0] : Math.min(a, u[0]), o = o == null ? u[1] : Math.max(o, u[1]));
  }), G(a) && G(o))
    return [a, o];
}, Z_ = S([as, We, W_, ls, Pe], $m, {
  memoizeOptions: {
    resultEqualityCheck: so
  }
});
function Q_(e) {
  var {
    value: t
  } = e;
  if (Ke(t) || t instanceof Date)
    return t;
}
var J_ = (e, t, r) => {
  var n = e.map(Q_).filter((i) => i != null);
  return r && (t.dataKey == null || t.allowDuplicatedCategory && Uv(n)) ? mp(0, e.length) : t.allowDuplicatedCategory ? n : Array.from(new Set(n));
}, Rm = (e) => e.referenceElements.dots, hn = (e, t, r) => e.filter((n) => n.ifOverflow === "extendDomain").filter((n) => t === "xAxis" ? n.xAxisId === r : n.yAxisId === r), ek = S([Rm, Pe, uo], hn), Lm = (e) => e.referenceElements.areas, tk = S([Lm, Pe, uo], hn), zm = (e) => e.referenceElements.lines, rk = S([zm, Pe, uo], hn), Bm = (e, t) => {
  if (e != null) {
    var r = Ht(e.map((n) => t === "xAxis" ? n.x : n.y));
    if (r.length !== 0)
      return [Math.min(...r), Math.max(...r)];
  }
}, nk = S(ek, Pe, Bm), Fm = (e, t) => {
  if (e != null) {
    var r = Ht(e.flatMap((n) => [t === "xAxis" ? n.x1 : n.y1, t === "xAxis" ? n.x2 : n.y2]));
    if (r.length !== 0)
      return [Math.min(...r), Math.max(...r)];
  }
}, ik = S([tk, Pe], Fm);
function ak(e) {
  var t;
  if (e.x != null)
    return Ht([e.x]);
  var r = (t = e.segment) === null || t === void 0 ? void 0 : t.map((n) => n.x);
  return r == null || r.length === 0 ? [] : Ht(r);
}
function ok(e) {
  var t;
  if (e.y != null)
    return Ht([e.y]);
  var r = (t = e.segment) === null || t === void 0 ? void 0 : t.map((n) => n.y);
  return r == null || r.length === 0 ? [] : Ht(r);
}
var Wm = (e, t) => {
  if (e != null) {
    var r = e.flatMap((n) => t === "xAxis" ? ak(n) : ok(n));
    if (r.length !== 0)
      return [Math.min(...r), Math.max(...r)];
  }
}, lk = S([rk, Pe], Wm), uk = S(nk, lk, ik, (e, t, r) => Sa(e, r, t)), Um = (e, t, r, n, i, a, o, l) => {
  if (r != null)
    return r;
  var u = o === "vertical" && l === "xAxis" || o === "horizontal" && l === "yAxis", s = u ? Sa(n, a, i) : Sa(a, i);
  return WO(t, s, e.allowDataOverflow);
}, sk = S([We, Dm, Nm, V_, Z_, uk, le, Pe], Um, {
  memoizeOptions: {
    resultEqualityCheck: so
  }
}), ck = [0, 1], Km = (e, t, r, n, i, a, o) => {
  if (!((e == null || r == null || r.length === 0) && o === void 0)) {
    var {
      dataKey: l,
      type: u
    } = e, s = It(t, a);
    if (s && l == null) {
      var c;
      return mp(0, (c = r?.length) !== null && c !== void 0 ? c : 0);
    }
    return u === "category" ? J_(n, e, s) : i === "expand" ? ck : o;
  }
}, us = S([We, le, as, fi, io, Pe, sk], Km), pn = S([We, wm, Su], gm), Hm = (e, t, r) => {
  var {
    niceTicks: n
  } = t;
  if (n !== "none") {
    var i = os(t), a = Array.isArray(i) && (i[0] === "auto" || i[1] === "auto");
    if ((n === "snap125" || n === "adaptive") && t != null && t.tickCount && _t(e)) {
      if (a)
        return bf(e, t.tickCount, t.allowDecimals, n);
      if (t.type === "number")
        return xf(e, t.tickCount, t.allowDecimals, n);
    }
    if (n === "auto" && r === "linear" && t != null && t.tickCount) {
      if (a && _t(e))
        return bf(e, t.tickCount, t.allowDecimals, "adaptive");
      if (t.type === "number" && _t(e))
        return xf(e, t.tickCount, t.allowDecimals, "adaptive");
    }
  }
}, ss = S([us, si, pn], Hm), Gm = (e, t, r, n) => {
  if (
    /*
     * Angle axis for some reason uses nice ticks when rendering axis tick labels,
     * but doesn't use nice ticks for extending domain like all the other axes do.
     * Not really sure why? Is there a good reason,
     * or is it just because someone added support for nice ticks to the other axes and forgot this one?
     */
    n !== "angleAxis" && e?.type === "number" && _t(t) && Array.isArray(r) && r.length > 0
  ) {
    var i, a, o = t[0], l = (i = r[0]) !== null && i !== void 0 ? i : 0, u = t[1], s = (a = r[r.length - 1]) !== null && a !== void 0 ? a : 0;
    return [Math.min(o, l), Math.max(u, s)];
  }
  return t;
}, fk = S([We, us, ss, Pe], Gm), dk = S(fi, We, (e, t) => {
  if (!(!t || t.type !== "number")) {
    var r = 1 / 0, n = Array.from(Ht(e.map((f) => f.value))).sort((f, d) => f - d), i = n[0], a = n[n.length - 1];
    if (i == null || a == null)
      return 1 / 0;
    var o = a - i;
    if (o === 0)
      return 1 / 0;
    for (var l = 0; l < n.length - 1; l++) {
      var u = n[l], s = n[l + 1];
      if (!(u == null || s == null)) {
        var c = s - u;
        r = Math.min(r, c);
      }
    }
    return r / o;
  }
}), qm = S(dk, le, qO, Me, (e, t, r, n, i) => i, (e, t, r, n, i) => {
  if (!G(e))
    return 0;
  var a = t === "vertical" ? n.height : n.width;
  if (i === "gap")
    return e * a / 2;
  if (i === "no-gap") {
    var o = lr(r, e * a), l = e * a / 2;
    return l - o - (l - o) / a * o;
  }
  return 0;
}), vk = (e, t, r) => {
  var n = Xt(e, t);
  return n == null || typeof n.padding != "string" ? 0 : qm(e, "xAxis", t, r, n.padding);
}, hk = (e, t, r) => {
  var n = Zt(e, t);
  return n == null || typeof n.padding != "string" ? 0 : qm(e, "yAxis", t, r, n.padding);
}, pk = S(Xt, vk, (e, t) => {
  var r, n;
  if (e == null)
    return {
      left: 0,
      right: 0
    };
  var {
    padding: i
  } = e;
  return typeof i == "string" ? {
    left: t,
    right: t
  } : {
    left: ((r = i.left) !== null && r !== void 0 ? r : 0) + t,
    right: ((n = i.right) !== null && n !== void 0 ? n : 0) + t
  };
}), mk = S(Zt, hk, (e, t) => {
  var r, n;
  if (e == null)
    return {
      top: 0,
      bottom: 0
    };
  var {
    padding: i
  } = e;
  return typeof i == "string" ? {
    top: t,
    bottom: t
  } : {
    top: ((r = i.top) !== null && r !== void 0 ? r : 0) + t,
    bottom: ((n = i.bottom) !== null && n !== void 0 ? n : 0) + t
  };
}), gk = S([Me, pk, Ja, Qa, (e, t, r) => r], (e, t, r, n, i) => {
  var {
    padding: a
  } = n;
  return i ? [a.left, r.width - a.right] : [e.left + t.left, e.left + e.width - t.right];
}), yk = S([Me, le, mk, Ja, Qa, (e, t, r) => r], (e, t, r, n, i, a) => {
  var {
    padding: o
  } = i;
  return a ? [n.height - o.bottom, o.top] : t === "horizontal" ? [e.top + e.height - r.bottom, e.top + r.top] : [e.top + r.top, e.top + e.height - r.bottom];
}), vi = (e, t, r, n) => {
  var i;
  switch (t) {
    case "xAxis":
      return gk(e, r, n);
    case "yAxis":
      return yk(e, r, n);
    case "zAxis":
      return (i = is(e, r)) === null || i === void 0 ? void 0 : i.range;
    case "angleAxis":
      return Dp(e);
    case "radiusAxis":
      return Np(e, r);
    default:
      return;
  }
}, Ym = S([We, vi], ao), bk = S([pn, fk], rA), cs = S([We, pn, bk, Ym], ns), Vm = (e, t, r, n) => {
  if (!(r == null || r.dataKey == null)) {
    var {
      type: i,
      scale: a
    } = r, o = It(e, n);
    if (o && (i === "number" || a !== "auto"))
      return t.map((l) => l.value);
  }
}, fs = S([le, fi, si, Pe], Vm), un = S([cs], Tu);
S([cs], N_);
S([cs, H_], ym);
S([ci, ls, Pe], X_);
function Xm(e, t) {
  return e.id < t.id ? -1 : e.id > t.id ? 1 : 0;
}
var yo = (e, t) => t, bo = (e, t, r) => r, xk = S(Xa, yo, bo, (e, t, r) => e.filter((n) => n.orientation === t).filter((n) => n.mirror === r).sort(Xm)), wk = S(Za, yo, bo, (e, t, r) => e.filter((n) => n.orientation === t).filter((n) => n.mirror === r).sort(Xm)), Zm = (e, t) => ({
  width: e.width,
  height: t.height
}), Pk = (e, t) => {
  var r = typeof t.width == "number" ? t.width : ei;
  return {
    width: r,
    height: e.height
  };
}, Ok = S(Me, Xt, Zm), Ak = (e, t, r) => {
  switch (t) {
    case "top":
      return e.top;
    case "bottom":
      return r - e.bottom;
    default:
      return 0;
  }
}, Sk = (e, t, r) => {
  switch (t) {
    case "left":
      return e.left;
    case "right":
      return r - e.right;
    default:
      return 0;
  }
}, _k = S(qt, Me, xk, yo, bo, (e, t, r, n, i) => {
  var a = {}, o;
  return r.forEach((l) => {
    var u = Zm(t, l);
    o == null && (o = Ak(t, n, e));
    var s = n === "top" && !i || n === "bottom" && i;
    a[l.id] = o - Number(s) * u.height, o += (s ? -1 : 1) * u.height;
  }), a;
}), kk = S(Gt, Me, wk, yo, bo, (e, t, r, n, i) => {
  var a = {}, o;
  return r.forEach((l) => {
    var u = Pk(t, l);
    o == null && (o = Sk(t, n, e));
    var s = n === "left" && !i || n === "right" && i;
    a[l.id] = o - Number(s) * u.width, o += (s ? -1 : 1) * u.width;
  }), a;
}), Ek = (e, t) => {
  var r = Xt(e, t);
  if (r != null)
    return _k(e, r.orientation, r.mirror);
}, Ck = S([Me, Xt, Ek, (e, t) => t], (e, t, r, n) => {
  if (t != null) {
    var i = r?.[n];
    return i == null ? {
      x: e.left,
      y: 0
    } : {
      x: e.left,
      y: i
    };
  }
}), jk = (e, t) => {
  var r = Zt(e, t);
  if (r != null)
    return kk(e, r.orientation, r.mirror);
}, Ik = S([Me, Zt, jk, (e, t) => t], (e, t, r, n) => {
  if (t != null) {
    var i = r?.[n];
    return i == null ? {
      x: 0,
      y: e.top
    } : {
      x: i,
      y: e.top
    };
  }
}), Mk = S(Me, Zt, (e, t) => {
  var r = typeof t.width == "number" ? t.width : ei;
  return {
    width: r,
    height: e.height
  };
}), Qm = (e, t, r, n) => {
  if (r != null) {
    var {
      allowDuplicatedCategory: i,
      type: a,
      dataKey: o
    } = r, l = It(e, n), u = t.map((s) => s.value);
    if (o && l && a === "category" && i && Uv(u))
      return u;
  }
}, ds = S([le, fi, We, Pe], Qm), cd = S([le, B_, pn, un, ds, fs, vi, ss, Pe], (e, t, r, n, i, a, o, l, u) => {
  if (t != null) {
    var s = It(e, u);
    return {
      angle: t.angle,
      interval: t.interval,
      minTickGap: t.minTickGap,
      orientation: t.orientation,
      tick: t.tick,
      tickCount: t.tickCount,
      tickFormatter: t.tickFormatter,
      ticks: t.ticks,
      type: t.type,
      unit: t.unit,
      axisType: u,
      categoricalDomain: a,
      duplicateDomain: i,
      isCategorical: s,
      niceTicks: l,
      range: o,
      realScaleType: r,
      scale: n
    };
  }
}), Tk = (e, t, r, n, i, a, o, l, u) => {
  if (!(t == null || n == null)) {
    var s = It(e, u), {
      type: c,
      ticks: f,
      tickCount: d
    } = t, h = (
      // @ts-expect-error This is testing for `scaleBand` but for band axis the type is reported as `band` so this looks like a dead code with a workaround elsewhere?
      r === "scaleBand" && typeof n.bandwidth == "function" ? n.bandwidth() / 2 : 2
    ), p = c === "category" && n.bandwidth ? n.bandwidth() / h : 0;
    p = u === "angleAxis" && a != null && a.length >= 2 ? at(a[0] - a[1]) * 2 * p : p;
    var g = f || i;
    return g ? g.map((m, y) => {
      var x = o ? o.indexOf(m) : m, b = n.map(x);
      return G(b) ? {
        index: y,
        coordinate: b + p,
        value: m,
        offset: p
      } : null;
    }).filter(He) : s && l ? l.map((m, y) => {
      var x = n.map(m);
      return G(x) ? {
        coordinate: x + p,
        value: m,
        index: y,
        offset: p
      } : null;
    }).filter(He) : n.ticks ? n.ticks(d).map((m, y) => {
      var x = n.map(m);
      return G(x) ? {
        coordinate: x + p,
        value: m,
        index: y,
        offset: p
      } : null;
    }).filter(He) : n.domain().map((m, y) => {
      var x = n.map(m);
      return G(x) ? {
        coordinate: x + p,
        // @ts-expect-error can't use Date as index
        value: o ? o[m] : m,
        index: y,
        offset: p
      } : null;
    }).filter(He);
  }
}, Jm = S([le, si, pn, un, ss, vi, ds, fs, Pe], Tk), Dk = (e, t, r, n, i, a, o) => {
  if (!(t == null || r == null || n == null || n[0] === n[1])) {
    var l = It(e, o), {
      tickCount: u
    } = t, s = 0;
    return s = o === "angleAxis" && n?.length >= 2 ? at(n[0] - n[1]) * 2 * s : s, l && a ? a.map((c, f) => {
      var d = r.map(c);
      return G(d) ? {
        coordinate: d + s,
        value: c,
        index: f,
        offset: s
      } : null;
    }).filter(He) : r.ticks ? r.ticks(u).map((c, f) => {
      var d = r.map(c);
      return G(d) ? {
        coordinate: d + s,
        value: c,
        index: f,
        offset: s
      } : null;
    }).filter(He) : r.domain().map((c, f) => {
      var d = r.map(c);
      return G(d) ? {
        coordinate: d + s,
        // @ts-expect-error can't use unknown as index
        value: i ? i[c] : c,
        index: f,
        offset: s
      } : null;
    }).filter(He);
  }
}, eg = S([le, si, un, vi, ds, fs, Pe], Dk), tg = S(We, un, (e, t) => {
  if (!(e == null || t == null))
    return Aa(Aa({}, e), {}, {
      scale: t
    });
}), Nk = S([We, pn, us, Ym], ns), $k = S([Nk], Tu);
S((e, t, r) => is(e, r), $k, (e, t) => {
  if (!(e == null || t == null))
    return Aa(Aa({}, e), {}, {
      scale: t
    });
});
var Rk = S([le, Xa, Za], (e, t, r) => {
  switch (e) {
    case "horizontal":
      return t.some((n) => n.reversed) ? "right-to-left" : "left-to-right";
    case "vertical":
      return r.some((n) => n.reversed) ? "bottom-to-top" : "top-to-bottom";
    // TODO: make this better. For now, right arrow triggers "forward", left arrow "back"
    // however, the tooltip moves an unintuitive direction because of how the indices are rendered
    case "centric":
    case "radial":
      return "left-to-right";
    default:
      return;
  }
}), Lk = (e, t, r) => {
  var n;
  return (n = e.renderedTicks[t]) === null || n === void 0 ? void 0 : n[r];
};
S([Lk], (e) => {
  if (!(!e || e.length === 0))
    return (t) => {
      var r, n = 1 / 0, i = e[0];
      for (var a of e) {
        var o = Math.abs(a.coordinate - t);
        o < n && (n = o, i = a);
      }
      return (r = i) === null || r === void 0 ? void 0 : r.value;
    };
});
var rg = (e) => e.options.defaultTooltipEventType, ng = (e) => e.options.validateTooltipEventTypes;
function ig(e, t, r) {
  if (e == null)
    return t;
  var n = e ? "axis" : "item";
  return r == null ? t : r.includes(n) ? n : t;
}
function vs(e, t) {
  var r = rg(e), n = ng(e);
  return ig(t, r, n);
}
function zk(e) {
  return z((t) => vs(t, e));
}
var ag = (e, t) => {
  var r, n = Number(t);
  if (!(Et(n) || t == null))
    return n >= 0 ? e == null || (r = e[n]) === null || r === void 0 ? void 0 : r.value : void 0;
}, Bk = (e) => e.tooltip.settings, nr = {
  active: !1,
  index: null,
  dataKey: void 0,
  graphicalItemId: void 0,
  coordinate: void 0
}, Fk = {
  itemInteraction: {
    click: nr,
    hover: nr
  },
  axisInteraction: {
    click: nr,
    hover: nr
  },
  keyboardInteraction: nr,
  syncInteraction: {
    active: !1,
    index: null,
    dataKey: void 0,
    label: void 0,
    coordinate: void 0,
    sourceViewBox: void 0,
    graphicalItemId: void 0
  },
  tooltipItemPayloads: [],
  settings: {
    shared: void 0,
    trigger: "hover",
    axisId: 0,
    active: !1,
    defaultIndex: void 0
  }
}, og = Re({
  name: "tooltip",
  initialState: Fk,
  reducers: {
    addTooltipEntrySettings: {
      reducer(e, t) {
        e.tooltipItemPayloads.push(t.payload);
      },
      prepare: ie()
    },
    replaceTooltipEntrySettings: {
      reducer(e, t) {
        var {
          prev: r,
          next: n
        } = t.payload, i = ot(e).tooltipItemPayloads.indexOf(r);
        i > -1 && (e.tooltipItemPayloads[i] = n);
      },
      prepare: ie()
    },
    removeTooltipEntrySettings: {
      reducer(e, t) {
        var r = ot(e).tooltipItemPayloads.indexOf(t.payload);
        r > -1 && e.tooltipItemPayloads.splice(r, 1);
      },
      prepare: ie()
    },
    setTooltipSettingsState(e, t) {
      e.settings = t.payload;
    },
    setActiveMouseOverItemIndex(e, t) {
      e.syncInteraction.active = !1, e.keyboardInteraction.active = !1, e.itemInteraction.hover.active = !0, e.itemInteraction.hover.index = t.payload.activeIndex, e.itemInteraction.hover.dataKey = t.payload.activeDataKey, e.itemInteraction.hover.graphicalItemId = t.payload.activeGraphicalItemId, e.itemInteraction.hover.coordinate = t.payload.activeCoordinate;
    },
    mouseLeaveChart(e) {
      e.itemInteraction.hover.active = !1, e.axisInteraction.hover.active = !1;
    },
    mouseLeaveItem(e) {
      e.itemInteraction.hover.active = !1;
    },
    setActiveClickItemIndex(e, t) {
      e.syncInteraction.active = !1, e.itemInteraction.click.active = !0, e.keyboardInteraction.active = !1, e.itemInteraction.click.index = t.payload.activeIndex, e.itemInteraction.click.dataKey = t.payload.activeDataKey, e.itemInteraction.click.graphicalItemId = t.payload.activeGraphicalItemId, e.itemInteraction.click.coordinate = t.payload.activeCoordinate;
    },
    setMouseOverAxisIndex(e, t) {
      e.syncInteraction.active = !1, e.axisInteraction.hover.active = !0, e.keyboardInteraction.active = !1, e.axisInteraction.hover.index = t.payload.activeIndex, e.axisInteraction.hover.dataKey = t.payload.activeDataKey, e.axisInteraction.hover.coordinate = t.payload.activeCoordinate;
    },
    setMouseClickAxisIndex(e, t) {
      e.syncInteraction.active = !1, e.keyboardInteraction.active = !1, e.axisInteraction.click.active = !0, e.axisInteraction.click.index = t.payload.activeIndex, e.axisInteraction.click.dataKey = t.payload.activeDataKey, e.axisInteraction.click.coordinate = t.payload.activeCoordinate;
    },
    setSyncInteraction(e, t) {
      e.syncInteraction = t.payload;
    },
    setKeyboardInteraction(e, t) {
      e.keyboardInteraction.active = t.payload.active, e.keyboardInteraction.index = t.payload.activeIndex, e.keyboardInteraction.coordinate = t.payload.activeCoordinate;
    }
  }
}), {
  addTooltipEntrySettings: Wk,
  replaceTooltipEntrySettings: Uk,
  removeTooltipEntrySettings: Kk,
  setTooltipSettingsState: Hk,
  setActiveMouseOverItemIndex: Gk,
  mouseLeaveItem: c2,
  mouseLeaveChart: lg,
  setActiveClickItemIndex: f2,
  setMouseOverAxisIndex: ug,
  setMouseClickAxisIndex: qk,
  setSyncInteraction: zl,
  setKeyboardInteraction: _a
} = og.actions, Yk = og.reducer;
function fd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ei(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? fd(Object(r), !0).forEach(function(n) {
      Vk(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : fd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Vk(e, t, r) {
  return (t = Xk(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Xk(e) {
  var t = Zk(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Zk(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Qk(e, t, r) {
  return t === "axis" ? r === "click" ? e.axisInteraction.click : e.axisInteraction.hover : r === "click" ? e.itemInteraction.click : e.itemInteraction.hover;
}
function Jk(e) {
  return e.index != null;
}
var sg = (e, t, r, n) => {
  if (t == null)
    return nr;
  var i = Qk(e, t, r);
  if (i == null)
    return nr;
  if (i.active)
    return i;
  if (e.keyboardInteraction.active)
    return e.keyboardInteraction;
  if (e.syncInteraction.active && e.syncInteraction.index != null)
    return e.syncInteraction;
  var a = e.settings.active === !0;
  if (Jk(i)) {
    if (a)
      return Ei(Ei({}, i), {}, {
        active: !0
      });
  } else if (n != null)
    return {
      active: !0,
      coordinate: void 0,
      dataKey: void 0,
      index: n,
      graphicalItemId: void 0
    };
  return Ei(Ei({}, nr), {}, {
    coordinate: i.coordinate
  });
};
function eE(e) {
  if (typeof e == "number")
    return Number.isFinite(e) ? e : void 0;
  if (e instanceof Date) {
    var t = e.valueOf();
    return Number.isFinite(t) ? t : void 0;
  }
  var r = Number(e);
  return Number.isFinite(r) ? r : void 0;
}
function tE(e, t) {
  var r = eE(e), n = t[0], i = t[1];
  if (r === void 0)
    return !1;
  var a = Math.min(n, i), o = Math.max(n, i);
  return r >= a && r <= o;
}
function rE(e, t, r) {
  if (r == null || t == null)
    return !0;
  var n = je(e, t);
  return n == null || !_t(r) ? !0 : tE(n, r);
}
var hs = (e, t, r, n) => {
  var i = e?.index;
  if (i == null)
    return null;
  var a = Number(i);
  if (!G(a))
    return i;
  var o = 0, l = 1 / 0;
  t.length > 0 && (l = t.length - 1);
  var u = Math.max(o, Math.min(a, l)), s = t[u];
  return s == null || rE(s, r, n) ? String(u) : null;
}, cg = (e, t, r, n, i, a, o) => {
  if (a != null) {
    var l = o[0], u = l?.getPosition(a);
    if (u != null)
      return u;
    var s = i?.[Number(a)];
    if (s)
      switch (r) {
        case "horizontal":
          return {
            x: s.coordinate,
            y: (n.top + t) / 2
          };
        default:
          return {
            x: (n.left + e) / 2,
            y: s.coordinate
          };
      }
  }
}, fg = (e, t, r, n) => {
  if (t === "axis")
    return e.tooltipItemPayloads;
  if (e.tooltipItemPayloads.length === 0)
    return [];
  var i;
  if (r === "hover" ? i = e.itemInteraction.hover.graphicalItemId : i = e.itemInteraction.click.graphicalItemId, e.syncInteraction.active && i == null)
    return e.tooltipItemPayloads;
  if (i == null && n != null) {
    var a = e.tooltipItemPayloads[0];
    return a != null ? [a] : [];
  }
  return e.tooltipItemPayloads.filter((o) => {
    var l;
    return ((l = o.settings) === null || l === void 0 ? void 0 : l.graphicalItemId) === i;
  });
}, dg = (e) => e.options.tooltipPayloadSearcher, mn = (e) => e.tooltip;
function dd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function vd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? dd(Object(r), !0).forEach(function(n) {
      nE(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : dd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function nE(e, t, r) {
  return (t = iE(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function iE(e) {
  var t = aE(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function aE(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function oE(e) {
  if (typeof e == "string" || typeof e == "number")
    return e;
}
function lE(e) {
  if (typeof e == "string" || typeof e == "number" || typeof e == "boolean")
    return e;
}
function uE(e) {
  if (typeof e == "string" || typeof e == "number")
    return e;
  if (typeof e == "function")
    return (t) => e(t);
}
function hd(e) {
  if (typeof e == "string")
    return e;
}
function sE(e) {
  if (!(e == null || typeof e != "object")) {
    var t = "name" in e ? oE(e.name) : void 0, r = "unit" in e ? lE(e.unit) : void 0, n = "dataKey" in e ? uE(e.dataKey) : void 0, i = "payload" in e ? e.payload : void 0, a = "color" in e ? hd(e.color) : void 0, o = "fill" in e ? hd(e.fill) : void 0;
    return {
      name: t,
      unit: r,
      dataKey: n,
      payload: i,
      color: a,
      fill: o
    };
  }
}
function cE(e, t) {
  return e ?? t;
}
var vg = (e, t, r, n, i, a, o) => {
  if (!(t == null || a == null)) {
    var {
      chartData: l,
      computedData: u,
      dataStartIndex: s,
      dataEndIndex: c
    } = r, f = [];
    return e.reduce((d, h) => {
      var p, {
        dataDefinedOnItem: g,
        settings: m
      } = h, y = cE(g, l), x = Array.isArray(y) ? Fh(y, s, c) : y, b = (p = m?.dataKey) !== null && p !== void 0 ? p : n, w = m?.nameKey, O;
      if (n && Array.isArray(x) && /*
       * findEntryInArray won't work for Scatter because Scatter provides an array of arrays
       * as tooltip payloads and findEntryInArray is not prepared to handle that.
       * Sad but also ScatterChart only allows 'item' tooltipEventType
       * and also this is only a problem if there are multiple Scatters and each has its own data array
       * so let's fix that some other time.
       */
      !Array.isArray(x[0]) && /*
       * If the tooltipEventType is 'axis', we should search for the dataKey in the sliced data
       * because thanks to allowDuplicatedCategory=false, the order of elements in the array
       * no longer matches the order of elements in the original data
       * and so we need to search by the active dataKey + label rather than by index.
       *
       * The same happens if multiple graphical items are present in the chart
       * and each of them has its own data array. Those arrays get concatenated
       * and again the tooltip index no longer matches the original data.
       *
       * On the other hand the tooltipEventType 'item' should always search by index
       * because we get the index from interacting over the individual elements
       * which is always accurate, irrespective of the allowDuplicatedCategory setting.
       */
      o === "axis" ? O = Kv(x, n, i) : O = a(x, t, u, w), Array.isArray(O))
        O.forEach((_) => {
          var A, C, T = sE(_), I = T?.name, k = T?.dataKey, B = T?.payload, F = vd(vd({}, m), {}, {
            name: I,
            unit: T?.unit,
            // Preserve item-level color/fill from graphical items.
            color: (A = T?.color) !== null && A !== void 0 ? A : m?.color,
            fill: (C = T?.fill) !== null && C !== void 0 ? C : m?.fill
          });
          d.push(hc({
            tooltipEntrySettings: F,
            dataKey: k,
            payload: B,
            value: je(B, k),
            name: I == null ? void 0 : String(I)
          }));
        });
      else {
        var P;
        d.push(hc({
          tooltipEntrySettings: m,
          dataKey: b,
          payload: O,
          // getValueByDataKey does not validate the output type
          value: je(O, b),
          // getValueByDataKey does not validate the output type
          name: (P = je(O, w)) !== null && P !== void 0 ? P : m?.name
        }));
      }
      return d;
    }, f);
  }
}, ps = S([ye, wm, Su], gm), fE = S([(e) => e.graphicalItems.cartesianItems, (e) => e.graphicalItems.polarItems], (e, t) => [...e, ...t]), dE = S([Oe, dn], Pm), gn = S([fE, ye, dE], Am, {
  memoizeOptions: {
    resultEqualityCheck: co
  }
}), vE = S([gn], (e) => e.filter(Mu)), hE = S([gn], km, {
  memoizeOptions: {
    resultEqualityCheck: co
  }
}), yn = S([hE, Yt], Em), pE = S([vE, Yt, ye], Rp), ms = S([yn, ye, gn], Cm), hg = S([ye], os), mE = S([ye], (e) => e.allowDataOverflow), pg = S([hg, mE], bp), gE = S([gn], (e) => e.filter(Mu)), yE = S([pE, gE, io, jp], Im), bE = S([yE, Yt, Oe, pg], Tm), xE = S([gn], _m), wE = S([yn, ye, xE, ls, Oe], $m, {
  memoizeOptions: {
    resultEqualityCheck: so
  }
}), PE = S([Rm, Oe, dn], hn), OE = S([PE, Oe], Bm), AE = S([Lm, Oe, dn], hn), SE = S([AE, Oe], Fm), _E = S([zm, Oe, dn], hn), kE = S([_E, Oe], Wm), EE = S([OE, kE, SE], Sa), CE = S([ye, hg, pg, bE, wE, EE, le, Oe], Um), hi = S([ye, le, yn, ms, io, Oe, CE], Km), jE = S([hi, ye, ps], Hm), IE = S([ye, hi, jE, Oe], Gm), mg = (e) => {
  var t = Oe(e), r = dn(e), n = !1;
  return vi(e, t, r, n);
}, gg = S([ye, mg], ao), ME = S([ye, ps, IE, gg], ns), yg = S([ME], Tu), TE = S([le, ms, ye, Oe], Qm), DE = S([le, ms, ye, Oe], Vm), NE = (e, t, r, n, i, a, o, l) => {
  if (t) {
    var {
      type: u
    } = t, s = It(e, l);
    if (n) {
      var c = r === "scaleBand" && n.bandwidth ? n.bandwidth() / 2 : 2, f = u === "category" && n.bandwidth ? n.bandwidth() / c : 0;
      return f = l === "angleAxis" && i != null && i?.length >= 2 ? at(i[0] - i[1]) * 2 * f : f, s && o ? o.map((d, h) => {
        var p = n.map(d);
        return G(p) ? {
          coordinate: p + f,
          value: d,
          index: h,
          offset: f
        } : null;
      }).filter(He) : n.domain().map((d, h) => {
        var p = n.map(d);
        return G(p) ? {
          coordinate: p + f,
          // @ts-expect-error can't use Date as an index
          value: a ? a[d] : d,
          index: h,
          offset: f
        } : null;
      }).filter(He);
    }
  }
}, Qt = S([le, ye, ps, yg, mg, TE, DE, Oe], NE), gs = S([rg, ng, Bk], (e, t, r) => ig(r.shared, e, t)), bg = (e) => e.tooltip.settings.trigger, ys = (e) => e.tooltip.settings.defaultIndex, pi = S([mn, gs, bg, ys], sg), Yn = S([pi, yn, di, hi], hs), xg = S([Qt, Yn], ag), $E = S([pi], (e) => {
  if (e)
    return e.dataKey;
}), RE = S([pi], (e) => {
  if (e)
    return e.graphicalItemId;
}), wg = S([mn, gs, bg, ys], fg), LE = S([Gt, qt, le, Me, Qt, ys, wg], cg), zE = S([pi, LE], (e, t) => e != null && e.coordinate ? e.coordinate : t), BE = S([pi], (e) => {
  var t;
  return (t = e?.active) !== null && t !== void 0 ? t : !1;
}), FE = S([wg, Yn, Yt, di, xg, dg, gs], vg), WE = S([FE], (e) => {
  if (e != null) {
    var t = e.map((r) => r.payload).filter((r) => r != null);
    return Array.from(new Set(t));
  }
});
function pd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function md(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? pd(Object(r), !0).forEach(function(n) {
      UE(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : pd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function UE(e, t, r) {
  return (t = KE(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function KE(e) {
  var t = HE(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function HE(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var GE = () => z(ye), qE = () => {
  var e = GE(), t = z(Qt), r = z(yg);
  return ra(!e || !r ? void 0 : md(md({}, e), {}, {
    scale: r
  }), t);
};
function gd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Kr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gd(Object(r), !0).forEach(function(n) {
      YE(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : gd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function YE(e, t, r) {
  return (t = VE(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function VE(e) {
  var t = XE(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function XE(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ZE = (e, t, r, n) => {
  var i = t.find((a) => a && a.index === r);
  if (i) {
    if (e === "horizontal")
      return {
        x: i.coordinate,
        y: n.relativeY
      };
    if (e === "vertical")
      return {
        x: n.relativeX,
        y: i.coordinate
      };
  }
  return {
    x: 0,
    y: 0
  };
}, QE = (e, t, r, n) => {
  var i = t.find((s) => s && s.index === r);
  if (i) {
    if (e === "centric") {
      var a = i.coordinate, {
        radius: o
      } = n;
      return Kr(Kr(Kr({}, n), Ce(n.cx, n.cy, o, a)), {}, {
        angle: a,
        radius: o
      });
    }
    var l = i.coordinate, {
      angle: u
    } = n;
    return Kr(Kr(Kr({}, n), Ce(n.cx, n.cy, l, u)), {}, {
      angle: u,
      radius: l
    });
  }
  return {
    angle: 0,
    clockWise: !1,
    cx: 0,
    cy: 0,
    endAngle: 0,
    innerRadius: 0,
    outerRadius: 0,
    radius: 0,
    startAngle: 0,
    x: 0,
    y: 0
  };
};
function JE(e, t) {
  var {
    relativeX: r,
    relativeY: n
  } = e;
  return r >= t.left && r <= t.left + t.width && n >= t.top && n <= t.top + t.height;
}
var Pg = (e, t, r, n, i) => {
  var a, o = (a = t?.length) !== null && a !== void 0 ? a : 0;
  if (o <= 1 || e == null)
    return 0;
  if (n === "angleAxis" && i != null && Math.abs(Math.abs(i[1] - i[0]) - 360) <= 1e-6)
    for (var l = 0; l < o; l++) {
      var u, s, c, f, d, h = l > 0 ? (u = r[l - 1]) === null || u === void 0 ? void 0 : u.coordinate : (s = r[o - 1]) === null || s === void 0 ? void 0 : s.coordinate, p = (c = r[l]) === null || c === void 0 ? void 0 : c.coordinate, g = l >= o - 1 ? (f = r[0]) === null || f === void 0 ? void 0 : f.coordinate : (d = r[l + 1]) === null || d === void 0 ? void 0 : d.coordinate, m = void 0;
      if (!(h == null || p == null || g == null))
        if (at(p - h) !== at(g - p)) {
          var y = [];
          if (at(g - p) === at(i[1] - i[0])) {
            m = g;
            var x = p + i[1] - i[0];
            y[0] = Math.min(x, (x + h) / 2), y[1] = Math.max(x, (x + h) / 2);
          } else {
            m = h;
            var b = g + i[1] - i[0];
            y[0] = Math.min(p, (b + p) / 2), y[1] = Math.max(p, (b + p) / 2);
          }
          var w = [Math.min(p, (m + p) / 2), Math.max(p, (m + p) / 2)];
          if (e > w[0] && e <= w[1] || e >= y[0] && e <= y[1]) {
            var O;
            return (O = r[l]) === null || O === void 0 ? void 0 : O.index;
          }
        } else {
          var P = Math.min(h, g), _ = Math.max(h, g);
          if (e > (P + p) / 2 && e <= (_ + p) / 2) {
            var A;
            return (A = r[l]) === null || A === void 0 ? void 0 : A.index;
          }
        }
    }
  else if (t)
    for (var C = 0; C < o; C++) {
      var T = t[C];
      if (T != null) {
        var I = t[C + 1], k = t[C - 1];
        if (C === 0 && I != null && e <= (T.coordinate + I.coordinate) / 2 || C === o - 1 && k != null && e > (T.coordinate + k.coordinate) / 2 || C > 0 && C < o - 1 && k != null && I != null && e > (T.coordinate + k.coordinate) / 2 && e <= (T.coordinate + I.coordinate) / 2)
          return T.index;
      }
    }
  return -1;
}, Og = () => z(Su), bs = (e, t) => t, Ag = (e, t, r) => r, xs = (e, t, r, n) => n, eC = S(Qt, (e) => Ba(e, (t) => t.coordinate)), ws = S([mn, bs, Ag, xs], sg), Ps = S([ws, yn, di, hi], hs), tC = (e, t, r) => {
  if (t != null) {
    var n = mn(e);
    return t === "axis" ? r === "hover" ? n.axisInteraction.hover.dataKey : n.axisInteraction.click.dataKey : r === "hover" ? n.itemInteraction.hover.dataKey : n.itemInteraction.click.dataKey;
  }
}, Sg = S([mn, bs, Ag, xs], fg), ka = S([Gt, qt, le, Me, Qt, xs, Sg], cg), rC = S([ws, ka], (e, t) => {
  var r;
  return (r = e.coordinate) !== null && r !== void 0 ? r : t;
}), _g = S([Qt, Ps], ag), nC = S([Sg, Ps, Yt, di, _g, dg, bs], vg), iC = S([ws, Ps], (e, t) => ({
  isActive: e.active && t != null,
  activeIndex: t
})), aC = (e, t, r, n, i, a, o) => {
  if (!(!e || !r || !n || !i) && JE(e, o)) {
    var l = Fw(e, t), u = Pg(l, a, i, r, n), s = ZE(t, i, u, e);
    return {
      activeIndex: String(u),
      activeCoordinate: s
    };
  }
}, oC = (e, t, r, n, i, a, o) => {
  if (!(!e || !n || !i || !a || !r)) {
    var l = DO(e, r);
    if (l) {
      var u = Ww(l, t), s = Pg(u, o, a, n, i), c = QE(t, a, s, l);
      return {
        activeIndex: String(s),
        activeCoordinate: c
      };
    }
  }
}, lC = (e, t, r, n, i, a, o, l) => {
  if (!(!e || !t || !n || !i || !a))
    return t === "horizontal" || t === "vertical" ? aC(e, t, n, i, a, o, l) : oC(e, t, r, n, i, a, o);
}, uC = S((e) => e.zIndex.zIndexMap, (e, t) => t, (e, t, r) => r, (e, t, r) => {
  if (t != null) {
    var n = e[t];
    if (n != null)
      return r ? n.panoramaElement : n.element;
  }
}), sC = S((e) => e.zIndex.zIndexMap, (e) => {
  var t = Object.keys(e).map((n) => parseInt(n, 10)).concat(Object.values(Ne)), r = Array.from(new Set(t));
  return r.sort((n, i) => n - i);
}, {
  memoizeOptions: {
    resultEqualityCheck: tA
  }
});
function yd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function bd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? yd(Object(r), !0).forEach(function(n) {
      cC(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : yd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function cC(e, t, r) {
  return (t = fC(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function fC(e) {
  var t = dC(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function dC(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var vC = {}, hC = {
  zIndexMap: Object.values(Ne).reduce((e, t) => bd(bd({}, e), {}, {
    [t]: {
      element: void 0,
      panoramaElement: void 0,
      consumers: 0
    }
  }), vC)
}, pC = new Set(Object.values(Ne));
function mC(e) {
  return pC.has(e);
}
var kg = Re({
  name: "zIndex",
  initialState: hC,
  reducers: {
    registerZIndexPortal: {
      reducer: (e, t) => {
        var {
          zIndex: r
        } = t.payload;
        e.zIndexMap[r] ? e.zIndexMap[r].consumers += 1 : e.zIndexMap[r] = {
          consumers: 1,
          element: void 0,
          panoramaElement: void 0
        };
      },
      prepare: ie()
    },
    unregisterZIndexPortal: {
      reducer: (e, t) => {
        var {
          zIndex: r
        } = t.payload;
        e.zIndexMap[r] && (e.zIndexMap[r].consumers -= 1, e.zIndexMap[r].consumers <= 0 && !mC(r) && delete e.zIndexMap[r]);
      },
      prepare: ie()
    },
    registerZIndexPortalElement: {
      reducer: (e, t) => {
        var {
          zIndex: r,
          element: n,
          isPanorama: i
        } = t.payload;
        e.zIndexMap[r] ? i ? e.zIndexMap[r].panoramaElement = n : e.zIndexMap[r].element = n : e.zIndexMap[r] = {
          consumers: 0,
          element: i ? void 0 : n,
          panoramaElement: i ? n : void 0
        };
      },
      prepare: ie()
    },
    unregisterZIndexPortalElement: {
      reducer: (e, t) => {
        var {
          zIndex: r
        } = t.payload;
        e.zIndexMap[r] && (t.payload.isPanorama ? e.zIndexMap[r].panoramaElement = void 0 : e.zIndexMap[r].element = void 0);
      },
      prepare: ie()
    }
  }
}), {
  registerZIndexPortal: gC,
  unregisterZIndexPortal: yC,
  registerZIndexPortalElement: bC,
  unregisterZIndexPortalElement: xC
} = kg.actions, wC = kg.reducer;
function Mt(e) {
  var {
    zIndex: t,
    children: r
  } = e, n = b1(), i = n && t !== void 0 && t !== 0, a = Fe(), o = ue();
  v.useLayoutEffect(() => i ? (o(gC({
    zIndex: t
  })), () => {
    o(yC({
      zIndex: t
    }));
  }) : Rr, [o, t, i]);
  var l = z((u) => uC(u, t, a));
  return i ? l ? /* @__PURE__ */ Ql.createPortal(r, l) : null : r;
}
function Bl() {
  return Bl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Bl.apply(null, arguments);
}
function xd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ci(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? xd(Object(r), !0).forEach(function(n) {
      PC(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : xd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function PC(e, t, r) {
  return (t = OC(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function OC(e) {
  var t = AC(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function AC(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function SC(e) {
  var {
    cursor: t,
    cursorComp: r,
    cursorProps: n
  } = e;
  return /* @__PURE__ */ v.isValidElement(t) ? /* @__PURE__ */ v.cloneElement(t, n) : /* @__PURE__ */ v.createElement(r, n);
}
function _C(e) {
  var t, {
    coordinate: r,
    payload: n,
    index: i,
    offset: a,
    tooltipAxisBandSize: o,
    layout: l,
    cursor: u,
    tooltipEventType: s,
    chartName: c
  } = e, f = r, d = n, h = i;
  if (!u || !f || c !== "ScatterChart" && s !== "axis")
    return null;
  var p, g, m;
  if (c === "ScatterChart")
    p = f, g = qP, m = Ne.cursorLine;
  else if (c === "BarChart")
    p = YP(l, f, a, o), g = vp, m = Ne.cursorRectangle;
  else if (l === "radial" && qv(f)) {
    var {
      cx: y,
      cy: x,
      radius: b,
      startAngle: w,
      endAngle: O
    } = hp(f);
    p = {
      cx: y,
      cy: x,
      startAngle: w,
      endAngle: O,
      innerRadius: b,
      outerRadius: b
    }, g = LO, m = Ne.cursorLine;
  } else
    p = {
      points: zO(l, f, a)
    }, g = Li, m = Ne.cursorLine;
  var P = typeof u == "object" && "className" in u ? u.className : void 0, _ = Ci(Ci(Ci(Ci({
    stroke: "#ccc",
    pointerEvents: "none"
  }, a), p), $a(u)), {}, {
    payload: d,
    payloadIndex: h,
    className: J("recharts-tooltip-cursor", P)
  });
  return /* @__PURE__ */ v.createElement(Mt, {
    zIndex: (t = e.zIndex) !== null && t !== void 0 ? t : m
  }, /* @__PURE__ */ v.createElement(SC, {
    cursor: u,
    cursorComp: g,
    cursorProps: _
  }));
}
function kC(e) {
  var t = qE(), r = Xh(), n = sn(), i = Og();
  return t == null || r == null || n == null || i == null ? null : /* @__PURE__ */ v.createElement(_C, Bl({}, e, {
    offset: r,
    layout: n,
    tooltipAxisBandSize: t,
    chartName: i
  }));
}
var Eg = /* @__PURE__ */ v.createContext(null), EC = () => v.useContext(Eg), Uo = { exports: {} }, wd;
function CC() {
  return wd || (wd = 1, (function(e) {
    var t = Object.prototype.hasOwnProperty, r = "~";
    function n() {
    }
    Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (r = !1));
    function i(u, s, c) {
      this.fn = u, this.context = s, this.once = c || !1;
    }
    function a(u, s, c, f, d) {
      if (typeof c != "function")
        throw new TypeError("The listener must be a function");
      var h = new i(c, f || u, d), p = r ? r + s : s;
      return u._events[p] ? u._events[p].fn ? u._events[p] = [u._events[p], h] : u._events[p].push(h) : (u._events[p] = h, u._eventsCount++), u;
    }
    function o(u, s) {
      --u._eventsCount === 0 ? u._events = new n() : delete u._events[s];
    }
    function l() {
      this._events = new n(), this._eventsCount = 0;
    }
    l.prototype.eventNames = function() {
      var s = [], c, f;
      if (this._eventsCount === 0) return s;
      for (f in c = this._events)
        t.call(c, f) && s.push(r ? f.slice(1) : f);
      return Object.getOwnPropertySymbols ? s.concat(Object.getOwnPropertySymbols(c)) : s;
    }, l.prototype.listeners = function(s) {
      var c = r ? r + s : s, f = this._events[c];
      if (!f) return [];
      if (f.fn) return [f.fn];
      for (var d = 0, h = f.length, p = new Array(h); d < h; d++)
        p[d] = f[d].fn;
      return p;
    }, l.prototype.listenerCount = function(s) {
      var c = r ? r + s : s, f = this._events[c];
      return f ? f.fn ? 1 : f.length : 0;
    }, l.prototype.emit = function(s, c, f, d, h, p) {
      var g = r ? r + s : s;
      if (!this._events[g]) return !1;
      var m = this._events[g], y = arguments.length, x, b;
      if (m.fn) {
        switch (m.once && this.removeListener(s, m.fn, void 0, !0), y) {
          case 1:
            return m.fn.call(m.context), !0;
          case 2:
            return m.fn.call(m.context, c), !0;
          case 3:
            return m.fn.call(m.context, c, f), !0;
          case 4:
            return m.fn.call(m.context, c, f, d), !0;
          case 5:
            return m.fn.call(m.context, c, f, d, h), !0;
          case 6:
            return m.fn.call(m.context, c, f, d, h, p), !0;
        }
        for (b = 1, x = new Array(y - 1); b < y; b++)
          x[b - 1] = arguments[b];
        m.fn.apply(m.context, x);
      } else {
        var w = m.length, O;
        for (b = 0; b < w; b++)
          switch (m[b].once && this.removeListener(s, m[b].fn, void 0, !0), y) {
            case 1:
              m[b].fn.call(m[b].context);
              break;
            case 2:
              m[b].fn.call(m[b].context, c);
              break;
            case 3:
              m[b].fn.call(m[b].context, c, f);
              break;
            case 4:
              m[b].fn.call(m[b].context, c, f, d);
              break;
            default:
              if (!x) for (O = 1, x = new Array(y - 1); O < y; O++)
                x[O - 1] = arguments[O];
              m[b].fn.apply(m[b].context, x);
          }
      }
      return !0;
    }, l.prototype.on = function(s, c, f) {
      return a(this, s, c, f, !1);
    }, l.prototype.once = function(s, c, f) {
      return a(this, s, c, f, !0);
    }, l.prototype.removeListener = function(s, c, f, d) {
      var h = r ? r + s : s;
      if (!this._events[h]) return this;
      if (!c)
        return o(this, h), this;
      var p = this._events[h];
      if (p.fn)
        p.fn === c && (!d || p.once) && (!f || p.context === f) && o(this, h);
      else {
        for (var g = 0, m = [], y = p.length; g < y; g++)
          (p[g].fn !== c || d && !p[g].once || f && p[g].context !== f) && m.push(p[g]);
        m.length ? this._events[h] = m.length === 1 ? m[0] : m : o(this, h);
      }
      return this;
    }, l.prototype.removeAllListeners = function(s) {
      var c;
      return s ? (c = r ? r + s : s, this._events[c] && o(this, c)) : (this._events = new n(), this._eventsCount = 0), this;
    }, l.prototype.off = l.prototype.removeListener, l.prototype.addListener = l.prototype.on, l.prefixed = r, l.EventEmitter = l, e.exports = l;
  })(Uo)), Uo.exports;
}
var jC = CC();
const IC = /* @__PURE__ */ Xy(jC);
var Vn = new IC(), Fl = "recharts.syncEvent.tooltip", Pd = "recharts.syncEvent.brush", MC = (e, t) => {
  if (t && Array.isArray(e)) {
    var r = Number.parseInt(t, 10);
    if (!Et(r))
      return e[r];
  }
}, TC = {
  chartName: "",
  tooltipPayloadSearcher: () => {
  },
  eventEmitter: void 0,
  defaultTooltipEventType: "axis"
}, Cg = Re({
  name: "options",
  initialState: TC,
  reducers: {
    createEventEmitter: (e) => {
      e.eventEmitter == null && (e.eventEmitter = Symbol("rechartsEventEmitter"));
    }
  }
}), DC = Cg.reducer, {
  createEventEmitter: NC
} = Cg.actions;
function $C(e) {
  return e.tooltip.syncInteraction;
}
var RC = {
  chartData: void 0,
  computedData: void 0,
  dataStartIndex: 0,
  dataEndIndex: 0
}, jg = Re({
  name: "chartData",
  initialState: RC,
  reducers: {
    setChartData(e, t) {
      if (e.chartData = t.payload, t.payload == null) {
        e.dataStartIndex = 0, e.dataEndIndex = 0;
        return;
      }
      t.payload.length > 0 && e.dataEndIndex !== t.payload.length - 1 && (e.dataEndIndex = t.payload.length - 1);
    },
    setComputedData(e, t) {
      e.computedData = t.payload;
    },
    setDataStartEndIndexes(e, t) {
      var {
        startIndex: r,
        endIndex: n
      } = t.payload;
      r != null && (e.dataStartIndex = r), n != null && (e.dataEndIndex = n);
    }
  }
}), {
  setChartData: Od,
  setDataStartEndIndexes: LC,
  setComputedData: d2
} = jg.actions, zC = jg.reducer, BC = ["x", "y"];
function Ad(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Hr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ad(Object(r), !0).forEach(function(n) {
      FC(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ad(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function FC(e, t, r) {
  return (t = WC(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function WC(e) {
  var t = UC(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function UC(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function KC(e, t) {
  if (e == null) return {};
  var r, n, i = HC(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function HC(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function GC() {
  var e = z(_u), t = z(ku), r = ue(), n = z(Ip), i = z(Qt), a = sn(), o = eo(), l = z((u) => u.rootProps.className);
  v.useEffect(() => {
    if (e == null)
      return Rr;
    var u = (s, c, f) => {
      if (t !== f && e === s) {
        if (n === "index") {
          var d;
          if (o && c !== null && c !== void 0 && (d = c.payload) !== null && d !== void 0 && d.coordinate && c.payload.sourceViewBox) {
            var h = c.payload.coordinate, {
              x: p,
              y: g
            } = h, m = KC(h, BC), {
              x: y,
              y: x,
              width: b,
              height: w
            } = c.payload.sourceViewBox, O = Hr(Hr({}, m), {}, {
              x: o.x + (b ? (p - y) / b : 0) * o.width,
              y: o.y + (w ? (g - x) / w : 0) * o.height
            });
            r(Hr(Hr({}, c), {}, {
              payload: Hr(Hr({}, c.payload), {}, {
                coordinate: O
              })
            }));
          } else
            r(c);
          return;
        }
        if (i != null) {
          var P;
          if (typeof n == "function") {
            var _ = {
              activeTooltipIndex: c.payload.index == null ? void 0 : Number(c.payload.index),
              isTooltipActive: c.payload.active,
              activeIndex: c.payload.index == null ? void 0 : Number(c.payload.index),
              activeLabel: c.payload.label,
              activeDataKey: c.payload.dataKey,
              activeCoordinate: c.payload.coordinate
            }, A = n(i, _);
            P = i[A];
          } else n === "value" && (P = i.find((q) => String(q.value) === c.payload.label));
          var {
            coordinate: C
          } = c.payload;
          if (P == null || c.payload.active === !1 || C == null || o == null) {
            r(zl({
              active: !1,
              coordinate: void 0,
              dataKey: void 0,
              index: null,
              label: void 0,
              sourceViewBox: void 0,
              graphicalItemId: void 0
            }));
            return;
          }
          var {
            x: T,
            y: I
          } = C, k = Math.min(T, o.x + o.width), B = Math.min(I, o.y + o.height), F = {
            x: a === "horizontal" ? P.coordinate : k,
            y: a === "horizontal" ? B : P.coordinate
          }, U = zl({
            active: c.payload.active,
            coordinate: F,
            dataKey: c.payload.dataKey,
            index: String(P.index),
            label: c.payload.label,
            sourceViewBox: c.payload.sourceViewBox,
            graphicalItemId: c.payload.graphicalItemId
          });
          r(U);
        }
      }
    };
    return Vn.on(Fl, u), () => {
      Vn.off(Fl, u);
    };
  }, [l, r, t, e, n, i, a, o]);
}
function qC() {
  var e = z(_u), t = z(ku), r = ue();
  v.useEffect(() => {
    if (e == null)
      return Rr;
    var n = (i, a, o) => {
      t !== o && e === i && r(LC(a));
    };
    return Vn.on(Pd, n), () => {
      Vn.off(Pd, n);
    };
  }, [r, t, e]);
}
function YC() {
  var e = ue();
  v.useEffect(() => {
    e(NC());
  }, [e]), GC(), qC();
}
function VC(e, t, r, n, i, a) {
  var o = z((p) => tC(p, e, t)), l = z(RE), u = z(ku), s = z(_u), c = z(Ip), f = z($C), d = f?.active, h = eo();
  v.useEffect(() => {
    if (!d && s != null && u != null) {
      var p = zl({
        active: a,
        coordinate: r,
        dataKey: o,
        index: i,
        label: typeof n == "number" ? String(n) : n,
        sourceViewBox: h,
        graphicalItemId: l
      });
      Vn.emit(Fl, s, p, u);
    }
  }, [d, r, o, l, i, n, u, s, c, a, h]);
}
function Sd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function _d(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Sd(Object(r), !0).forEach(function(n) {
      XC(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Sd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function XC(e, t, r) {
  return (t = ZC(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function ZC(e) {
  var t = QC(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function QC(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function JC(e) {
  return e.dataKey;
}
function ej(e, t) {
  return /* @__PURE__ */ v.isValidElement(e) ? /* @__PURE__ */ v.cloneElement(e, t) : typeof e == "function" ? /* @__PURE__ */ v.createElement(e, t) : /* @__PURE__ */ v.createElement(PP, t);
}
var kd = [], tj = {
  allowEscapeViewBox: {
    x: !1,
    y: !1
  },
  animationDuration: 400,
  animationEasing: "ease",
  axisId: 0,
  contentStyle: {},
  cursor: !0,
  filterNull: !0,
  includeHidden: !1,
  isAnimationActive: "auto",
  itemSorter: "name",
  itemStyle: {},
  labelStyle: {},
  offset: 10,
  reverseDirection: {
    x: !1,
    y: !1
  },
  separator: " : ",
  trigger: "hover",
  useTranslate3d: !1,
  wrapperStyle: {}
};
function rj(e) {
  var t, r, n = Be(e, tj), {
    active: i,
    allowEscapeViewBox: a,
    animationDuration: o,
    animationEasing: l,
    content: u,
    filterNull: s,
    isAnimationActive: c,
    offset: f,
    payloadUniqBy: d,
    position: h,
    reverseDirection: p,
    useTranslate3d: g,
    wrapperStyle: m,
    cursor: y,
    shared: x,
    trigger: b,
    defaultIndex: w,
    portal: O,
    axisId: P
  } = n, _ = ue(), A = typeof w == "number" ? String(w) : w;
  v.useEffect(() => {
    _(Hk({
      shared: x,
      trigger: b,
      axisId: P,
      active: i,
      defaultIndex: A
    }));
  }, [_, x, b, P, i, A]);
  var C = eo(), T = lp(), I = zk(x), {
    activeIndex: k,
    isActive: B
  } = (t = z((Se) => iC(Se, I, b, A))) !== null && t !== void 0 ? t : {}, F = z((Se) => nC(Se, I, b, A)), U = z((Se) => _g(Se, I, b, A)), q = z((Se) => rC(Se, I, b, A)), V = F, re = EC(), Q = (r = i ?? B) !== null && r !== void 0 ? r : !1, [M, Le] = fh([V, Q]), se = I === "axis" ? U : void 0;
  VC(I, b, q, se, k, Q);
  var Ue = O ?? re;
  if (Ue == null || C == null || I == null)
    return null;
  var be = V ?? kd;
  Q || (be = kd), s && be.length && (be = lh(be.filter((Se) => Se.value != null && (Se.hide !== !0 || n.includeHidden)), d, JC));
  var ne = be.length > 0, fe = _d(_d({}, n), {}, {
    payload: be,
    label: se,
    active: Q,
    activeIndex: k,
    coordinate: q,
    accessibilityLayer: T
  }), yt = /* @__PURE__ */ v.createElement(TP, {
    allowEscapeViewBox: a,
    animationDuration: o,
    animationEasing: l,
    isAnimationActive: c,
    active: Q,
    coordinate: q,
    hasPayload: ne,
    offset: f,
    position: h,
    reverseDirection: p,
    useTranslate3d: g,
    viewBox: C,
    wrapperStyle: m,
    lastBoundingBox: M,
    innerRef: Le,
    hasPortalFromProps: !!O
  }, ej(u, fe));
  return /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ Ql.createPortal(yt, Ue), Q && /* @__PURE__ */ v.createElement(kC, {
    cursor: y,
    tooltipEventType: I,
    coordinate: q,
    payload: be,
    index: k
  }));
}
function nj(e, t, r) {
  return (t = ij(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function ij(e) {
  var t = aj(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function aj(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
class oj {
  constructor(t) {
    nj(this, "cache", /* @__PURE__ */ new Map()), this.maxSize = t;
  }
  get(t) {
    var r = this.cache.get(t);
    return r !== void 0 && (this.cache.delete(t), this.cache.set(t, r)), r;
  }
  set(t, r) {
    if (this.cache.has(t))
      this.cache.delete(t);
    else if (this.cache.size >= this.maxSize) {
      var n = this.cache.keys().next().value;
      n != null && this.cache.delete(n);
    }
    this.cache.set(t, r);
  }
  clear() {
    this.cache.clear();
  }
  size() {
    return this.cache.size;
  }
}
function Ed(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function lj(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ed(Object(r), !0).forEach(function(n) {
      uj(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ed(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function uj(e, t, r) {
  return (t = sj(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function sj(e) {
  var t = cj(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function cj(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var fj = {
  cacheSize: 2e3,
  enableCache: !0
}, Ig = lj({}, fj), Cd = new oj(Ig.cacheSize), dj = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
}, jd = "recharts_measurement_span";
function vj(e, t) {
  var r = t.fontSize || "", n = t.fontFamily || "", i = t.fontWeight || "", a = t.fontStyle || "", o = t.letterSpacing || "", l = t.textTransform || "";
  return "".concat(e, "|").concat(r, "|").concat(n, "|").concat(i, "|").concat(a, "|").concat(o, "|").concat(l);
}
var Id = (e, t) => {
  try {
    var r = document.getElementById(jd);
    r || (r = document.createElement("span"), r.setAttribute("id", jd), r.setAttribute("aria-hidden", "true"), document.body.appendChild(r)), Object.assign(r.style, dj, t), r.textContent = "".concat(e);
    var n = r.getBoundingClientRect();
    return {
      width: n.width,
      height: n.height
    };
  } catch {
    return {
      width: 0,
      height: 0
    };
  }
}, Tn = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (t == null || ii.isSsr)
    return {
      width: 0,
      height: 0
    };
  if (!Ig.enableCache)
    return Id(t, r);
  var n = vj(t, r), i = Cd.get(n);
  if (i)
    return i;
  var a = Id(t, r);
  return Cd.set(n, a), a;
}, Mg;
function hj(e, t, r) {
  return (t = pj(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function pj(e) {
  var t = mj(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function mj(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Md = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, Td = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, gj = /^(px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q)$/, yj = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, bj = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  in: 96,
  Q: 96 / (2.54 * 40),
  px: 1
}, xj = ["cm", "mm", "pt", "pc", "in", "Q", "px"];
function wj(e) {
  return xj.includes(e);
}
var Xr = "NaN";
function Pj(e, t) {
  return e * bj[t];
}
class Ee {
  static parse(t) {
    var r, [, n, i] = (r = yj.exec(t)) !== null && r !== void 0 ? r : [];
    return n == null ? Ee.NaN : new Ee(parseFloat(n), i ?? "");
  }
  constructor(t, r) {
    this.num = t, this.unit = r, this.num = t, this.unit = r, Et(t) && (this.unit = ""), r !== "" && !gj.test(r) && (this.num = NaN, this.unit = ""), wj(r) && (this.num = Pj(t, r), this.unit = "px");
  }
  add(t) {
    return this.unit !== t.unit ? new Ee(NaN, "") : new Ee(this.num + t.num, this.unit);
  }
  subtract(t) {
    return this.unit !== t.unit ? new Ee(NaN, "") : new Ee(this.num - t.num, this.unit);
  }
  multiply(t) {
    return this.unit !== "" && t.unit !== "" && this.unit !== t.unit ? new Ee(NaN, "") : new Ee(this.num * t.num, this.unit || t.unit);
  }
  divide(t) {
    return this.unit !== "" && t.unit !== "" && this.unit !== t.unit ? new Ee(NaN, "") : new Ee(this.num / t.num, this.unit || t.unit);
  }
  toString() {
    return "".concat(this.num).concat(this.unit);
  }
  isNaN() {
    return Et(this.num);
  }
}
Mg = Ee;
hj(Ee, "NaN", new Mg(NaN, ""));
function Tg(e) {
  if (e == null || e.includes(Xr))
    return Xr;
  for (var t = e; t.includes("*") || t.includes("/"); ) {
    var r, [, n, i, a] = (r = Md.exec(t)) !== null && r !== void 0 ? r : [], o = Ee.parse(n ?? ""), l = Ee.parse(a ?? ""), u = i === "*" ? o.multiply(l) : o.divide(l);
    if (u.isNaN())
      return Xr;
    t = t.replace(Md, u.toString());
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t); ) {
    var s, [, c, f, d] = (s = Td.exec(t)) !== null && s !== void 0 ? s : [], h = Ee.parse(c ?? ""), p = Ee.parse(d ?? ""), g = f === "+" ? h.add(p) : h.subtract(p);
    if (g.isNaN())
      return Xr;
    t = t.replace(Td, g.toString());
  }
  return t;
}
var Dd = /\(([^()]*)\)/;
function Oj(e) {
  for (var t = e, r; (r = Dd.exec(t)) != null; ) {
    var [, n] = r;
    t = t.replace(Dd, Tg(n));
  }
  return t;
}
function Aj(e) {
  var t = e.replace(/\s+/g, "");
  return t = Oj(t), t = Tg(t), t;
}
function Sj(e) {
  try {
    return Aj(e);
  } catch {
    return Xr;
  }
}
function Ko(e) {
  var t = Sj(e.slice(5, -1));
  return t === Xr ? "" : t;
}
var _j = ["x", "y", "lineHeight", "capHeight", "fill", "scaleToFit", "textAnchor", "verticalAnchor"], kj = ["dx", "dy", "angle", "className", "breakAll"];
function Wl() {
  return Wl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Wl.apply(null, arguments);
}
function Nd(e, t) {
  if (e == null) return {};
  var r, n, i = Ej(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function Ej(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var Dg = /[ \f\n\r\t\v\u2028\u2029]+/, Ng = (e) => {
  var {
    children: t,
    breakAll: r,
    style: n
  } = e;
  try {
    var i = [];
    Ie(t) || (r ? i = t.toString().split("") : i = t.toString().split(Dg));
    var a = i.map((l) => ({
      word: l,
      width: Tn(l, n).width
    })), o = r ? 0 : Tn(" ", n).width;
    return {
      wordsWithComputedWidth: a,
      spaceWidth: o
    };
  } catch {
    return null;
  }
};
function $g(e) {
  return e === "start" || e === "middle" || e === "end" || e === "inherit";
}
function Cj(e) {
  return Ie(e) || typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
var Rg = (e, t, r, n) => e.reduce((i, a) => {
  var {
    word: o,
    width: l
  } = a, u = i[i.length - 1];
  if (u && l != null && (t == null || n || u.width + l + r < Number(t)))
    u.words.push(o), u.width += l + r;
  else {
    var s = {
      words: [o],
      width: l
    };
    i.push(s);
  }
  return i;
}, []), Lg = (e) => e.reduce((t, r) => t.width > r.width ? t : r), jj = "…", $d = (e, t, r, n, i, a, o, l) => {
  var u = e.slice(0, t), s = Ng({
    breakAll: r,
    style: n,
    children: u + jj
  });
  if (!s)
    return [!1, []];
  var c = Rg(s.wordsWithComputedWidth, a, o, l), f = c.length > i || Lg(c).width > Number(a);
  return [f, c];
}, Ij = (e, t, r, n, i) => {
  var {
    maxLines: a,
    children: o,
    style: l,
    breakAll: u
  } = e, s = L(a), c = String(o), f = Rg(t, n, r, i);
  if (!s || i)
    return f;
  var d = f.length > a || Lg(f).width > Number(n);
  if (!d)
    return f;
  for (var h = 0, p = c.length - 1, g = 0, m; h <= p && g <= c.length - 1; ) {
    var y = Math.floor((h + p) / 2), x = y - 1, [b, w] = $d(c, x, u, l, a, n, r, i), [O] = $d(c, y, u, l, a, n, r, i);
    if (!b && !O && (h = y + 1), b && O && (p = y - 1), !b && O) {
      m = w;
      break;
    }
    g++;
  }
  return m || f;
}, Rd = (e) => {
  var t = Ie(e) ? [] : e.toString().split(Dg);
  return [{
    words: t,
    width: void 0
  }];
}, Mj = (e) => {
  var {
    width: t,
    scaleToFit: r,
    children: n,
    style: i,
    breakAll: a,
    maxLines: o
  } = e;
  if ((t || r) && !ii.isSsr) {
    var l, u, s = Ng({
      breakAll: a,
      children: n,
      style: i
    });
    if (s) {
      var {
        wordsWithComputedWidth: c,
        spaceWidth: f
      } = s;
      l = c, u = f;
    } else
      return Rd(n);
    return Ij({
      breakAll: a,
      children: n,
      maxLines: o,
      style: i
    }, l, u, t, !!r);
  }
  return Rd(n);
}, zg = "#808080", Tj = {
  angle: 0,
  breakAll: !1,
  // Magic number from d3
  capHeight: "0.71em",
  fill: zg,
  lineHeight: "1em",
  scaleToFit: !1,
  textAnchor: "start",
  // Maintain compat with existing charts / default SVG behavior
  verticalAnchor: "end",
  x: 0,
  y: 0
}, Os = /* @__PURE__ */ v.forwardRef((e, t) => {
  var r = Be(e, Tj), {
    x: n,
    y: i,
    lineHeight: a,
    capHeight: o,
    fill: l,
    scaleToFit: u,
    textAnchor: s,
    verticalAnchor: c
  } = r, f = Nd(r, _j), d = v.useMemo(() => Mj({
    breakAll: f.breakAll,
    children: f.children,
    maxLines: f.maxLines,
    scaleToFit: u,
    style: f.style,
    width: f.width
  }), [f.breakAll, f.children, f.maxLines, u, f.style, f.width]), {
    dx: h,
    dy: p,
    angle: g,
    className: m,
    breakAll: y
  } = f, x = Nd(f, kj);
  if (!Ke(n) || !Ke(i) || d.length === 0)
    return null;
  var b = Number(n) + (L(h) ? h : 0), w = Number(i) + (L(p) ? p : 0);
  if (!G(b) || !G(w))
    return null;
  var O;
  switch (c) {
    case "start":
      O = Ko("calc(".concat(o, ")"));
      break;
    case "middle":
      O = Ko("calc(".concat((d.length - 1) / 2, " * -").concat(a, " + (").concat(o, " / 2))"));
      break;
    default:
      O = Ko("calc(".concat(d.length - 1, " * -").concat(a, ")"));
      break;
  }
  var P = [], _ = d[0];
  if (u && _ != null) {
    var A = _.width, {
      width: C
    } = f;
    P.push("scale(".concat(L(C) && L(A) ? C / A : 1, ")"));
  }
  return g && P.push("rotate(".concat(g, ", ").concat(b, ", ").concat(w, ")")), P.length && (x.transform = P.join(" ")), /* @__PURE__ */ v.createElement("text", Wl({}, qe(x), {
    ref: t,
    x: b,
    y: w,
    className: J("recharts-text", m),
    textAnchor: s,
    fill: l.includes("url") ? zg : l
  }), d.map((T, I) => {
    var k = T.words.join(y ? "" : " ");
    return (
      // duplicate words will cause duplicate keys which is why we add the array index here
      /* @__PURE__ */ v.createElement("tspan", {
        x: b,
        dy: I === 0 ? O : a,
        key: "".concat(k, "-").concat(I)
      }, k)
    );
  }));
});
Os.displayName = "Text";
function Ld(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function wt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ld(Object(r), !0).forEach(function(n) {
      Dj(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ld(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Dj(e, t, r) {
  return (t = Nj(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Nj(e) {
  var t = $j(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function $j(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Rj = (e) => {
  var {
    viewBox: t,
    position: r,
    offset: n = 0,
    parentViewBox: i
  } = e, {
    x: a,
    y: o,
    height: l,
    upperWidth: u,
    lowerWidth: s
  } = mu(t), c = a, f = a + (u - s) / 2, d = (c + f) / 2, h = (u + s) / 2, p = c + u / 2, g = l >= 0 ? 1 : -1, m = g * n, y = g > 0 ? "end" : "start", x = g > 0 ? "start" : "end", b = u >= 0 ? 1 : -1, w = b * n, O = b > 0 ? "end" : "start", P = b > 0 ? "start" : "end", _ = i;
  if (r === "top") {
    var A = {
      x: c + u / 2,
      y: o - m,
      horizontalAnchor: "middle",
      verticalAnchor: y
    };
    return _ && (A.height = Math.max(o - _.y, 0), A.width = u), A;
  }
  if (r === "bottom") {
    var C = {
      x: f + s / 2,
      y: o + l + m,
      horizontalAnchor: "middle",
      verticalAnchor: x
    };
    return _ && (C.height = Math.max(_.y + _.height - (o + l), 0), C.width = s), C;
  }
  if (r === "left") {
    var T = {
      x: d - w,
      y: o + l / 2,
      horizontalAnchor: O,
      verticalAnchor: "middle"
    };
    return _ && (T.width = Math.max(T.x - _.x, 0), T.height = l), T;
  }
  if (r === "right") {
    var I = {
      x: d + h + w,
      y: o + l / 2,
      horizontalAnchor: P,
      verticalAnchor: "middle"
    };
    return _ && (I.width = Math.max(_.x + _.width - I.x, 0), I.height = l), I;
  }
  var k = _ ? {
    width: h,
    height: l
  } : {};
  return r === "insideLeft" ? wt({
    x: d + w,
    y: o + l / 2,
    horizontalAnchor: P,
    verticalAnchor: "middle"
  }, k) : r === "insideRight" ? wt({
    x: d + h - w,
    y: o + l / 2,
    horizontalAnchor: O,
    verticalAnchor: "middle"
  }, k) : r === "insideTop" ? wt({
    x: c + u / 2,
    y: o + m,
    horizontalAnchor: "middle",
    verticalAnchor: x
  }, k) : r === "insideBottom" ? wt({
    x: f + s / 2,
    y: o + l - m,
    horizontalAnchor: "middle",
    verticalAnchor: y
  }, k) : r === "insideTopLeft" ? wt({
    x: c + w,
    y: o + m,
    horizontalAnchor: P,
    verticalAnchor: x
  }, k) : r === "insideTopRight" ? wt({
    x: c + u - w,
    y: o + m,
    horizontalAnchor: O,
    verticalAnchor: x
  }, k) : r === "insideBottomLeft" ? wt({
    x: f + w,
    y: o + l - m,
    horizontalAnchor: P,
    verticalAnchor: y
  }, k) : r === "insideBottomRight" ? wt({
    x: f + s - w,
    y: o + l - m,
    horizontalAnchor: O,
    verticalAnchor: y
  }, k) : r && typeof r == "object" && (L(r.x) || jr(r.x)) && (L(r.y) || jr(r.y)) ? wt({
    x: a + lr(r.x, h),
    y: o + lr(r.y, l),
    horizontalAnchor: "end",
    verticalAnchor: "end"
  }, k) : wt({
    x: p,
    y: o + l / 2,
    horizontalAnchor: "middle",
    verticalAnchor: "middle"
  }, k);
}, Lj = ["labelRef"], zj = ["content"];
function zd(e, t) {
  if (e == null) return {};
  var r, n, i = Bj(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function Bj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Bd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Mn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Bd(Object(r), !0).forEach(function(n) {
      Fj(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Bd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Fj(e, t, r) {
  return (t = Wj(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Wj(e) {
  var t = Uj(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Uj(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function $t() {
  return $t = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, $t.apply(null, arguments);
}
var Bg = /* @__PURE__ */ v.createContext(null), Fg = (e) => {
  var {
    x: t,
    y: r,
    upperWidth: n,
    lowerWidth: i,
    width: a,
    height: o,
    children: l
  } = e, u = v.useMemo(() => ({
    x: t,
    y: r,
    upperWidth: n,
    lowerWidth: i,
    width: a,
    height: o
  }), [t, r, n, i, a, o]);
  return /* @__PURE__ */ v.createElement(Bg.Provider, {
    value: u
  }, l);
}, Wg = () => {
  var e = v.useContext(Bg), t = eo();
  return e || (t ? mu(t) : void 0);
}, Kj = /* @__PURE__ */ v.createContext(null), Hj = () => {
  var e = v.useContext(Kj), t = z($p);
  return e || t;
}, Gj = (e) => {
  var {
    value: t,
    formatter: r
  } = e, n = Ie(e.children) ? t : e.children;
  return typeof r == "function" ? r(n) : n;
}, As = (e) => e != null && typeof e == "function", qj = (e, t) => {
  var r = at(t - e), n = Math.min(Math.abs(t - e), 360);
  return r * n;
}, Yj = (e, t, r, n, i) => {
  var {
    offset: a,
    className: o
  } = e, {
    cx: l,
    cy: u,
    innerRadius: s,
    outerRadius: c,
    startAngle: f,
    endAngle: d,
    clockWise: h
  } = i, p = (s + c) / 2, g = qj(f, d), m = g >= 0 ? 1 : -1, y, x;
  switch (t) {
    case "insideStart":
      y = f + m * a, x = h;
      break;
    case "insideEnd":
      y = d - m * a, x = !h;
      break;
    case "end":
      y = d + m * a, x = h;
      break;
    default:
      throw new Error("Unsupported position ".concat(t));
  }
  x = g <= 0 ? x : !x;
  var b = Ce(l, u, p, y), w = Ce(l, u, p, y + (x ? 1 : -1) * 359), O = "M".concat(b.x, ",").concat(b.y, `
    A`).concat(p, ",").concat(p, ",0,1,").concat(x ? 0 : 1, `,
    `).concat(w.x, ",").concat(w.y), P = Ie(e.id) ? Nn("recharts-radial-line-") : e.id;
  return /* @__PURE__ */ v.createElement("text", $t({}, n, {
    dominantBaseline: "central",
    className: J("recharts-radial-bar-label", o)
  }), /* @__PURE__ */ v.createElement("defs", null, /* @__PURE__ */ v.createElement("path", {
    id: P,
    d: O
  })), /* @__PURE__ */ v.createElement("textPath", {
    xlinkHref: "#".concat(P)
  }, r));
}, Vj = (e, t, r) => {
  var {
    cx: n,
    cy: i,
    innerRadius: a,
    outerRadius: o,
    startAngle: l,
    endAngle: u
  } = e, s = (l + u) / 2;
  if (r === "outside") {
    var {
      x: c,
      y: f
    } = Ce(n, i, o + t, s);
    return {
      x: c,
      y: f,
      textAnchor: c >= n ? "start" : "end",
      verticalAnchor: "middle"
    };
  }
  if (r === "center")
    return {
      x: n,
      y: i,
      textAnchor: "middle",
      verticalAnchor: "middle"
    };
  if (r === "centerTop")
    return {
      x: n,
      y: i,
      textAnchor: "middle",
      verticalAnchor: "start"
    };
  if (r === "centerBottom")
    return {
      x: n,
      y: i,
      textAnchor: "middle",
      verticalAnchor: "end"
    };
  var d = (a + o) / 2, {
    x: h,
    y: p
  } = Ce(n, i, d, s);
  return {
    x: h,
    y: p,
    textAnchor: "middle",
    verticalAnchor: "middle"
  };
}, zi = (e) => e != null && "cx" in e && L(e.cx), Xj = {
  angle: 0,
  offset: 5,
  zIndex: Ne.label,
  position: "middle",
  textBreakAll: !1
};
function Zj(e) {
  if (!zi(e))
    return e;
  var {
    cx: t,
    cy: r,
    outerRadius: n
  } = e, i = n * 2;
  return {
    x: t - n,
    y: r - n,
    width: i,
    upperWidth: i,
    lowerWidth: i,
    height: i
  };
}
function rr(e) {
  var t = Be(e, Xj), {
    viewBox: r,
    parentViewBox: n,
    position: i,
    value: a,
    children: o,
    content: l,
    className: u = "",
    textBreakAll: s,
    labelRef: c
  } = t, f = Hj(), d = Wg(), h = i === "center" ? d : f ?? d, p, g, m;
  r == null ? p = h : zi(r) ? p = r : p = mu(r);
  var y = Zj(p);
  if (!p || Ie(a) && Ie(o) && !/* @__PURE__ */ v.isValidElement(l) && typeof l != "function")
    return null;
  var x = Mn(Mn({}, t), {}, {
    viewBox: p
  });
  if (/* @__PURE__ */ v.isValidElement(l)) {
    var {
      labelRef: b
    } = x, w = zd(x, Lj);
    return /* @__PURE__ */ v.cloneElement(l, w);
  }
  if (typeof l == "function") {
    var {
      content: O
    } = x, P = zd(x, zj);
    if (g = /* @__PURE__ */ v.createElement(l, P), /* @__PURE__ */ v.isValidElement(g))
      return g;
  } else
    g = Gj(t);
  var _ = qe(t);
  if (zi(p)) {
    if (i === "insideStart" || i === "insideEnd" || i === "end")
      return Yj(t, i, g, _, p);
    m = Vj(p, t.offset, t.position);
  } else {
    if (!y)
      return null;
    var A = Rj({
      viewBox: y,
      position: i,
      offset: t.offset,
      parentViewBox: zi(n) ? void 0 : n
    });
    m = Mn(Mn({
      x: A.x,
      y: A.y,
      textAnchor: A.horizontalAnchor,
      verticalAnchor: A.verticalAnchor
    }, A.width !== void 0 ? {
      width: A.width
    } : {}), A.height !== void 0 ? {
      height: A.height
    } : {});
  }
  return /* @__PURE__ */ v.createElement(Mt, {
    zIndex: t.zIndex
  }, /* @__PURE__ */ v.createElement(Os, $t({
    ref: c,
    className: J("recharts-label", u)
  }, _, m, {
    /*
     * textAnchor is decided by default based on the `position`
     * but we allow overriding via props for precise control.
     */
    textAnchor: $g(_.textAnchor) ? _.textAnchor : m.textAnchor,
    breakAll: s
  }), g));
}
rr.displayName = "Label";
var Qj = (e, t, r) => {
  if (!e)
    return null;
  var n = {
    viewBox: t,
    labelRef: r
  };
  return e === !0 ? /* @__PURE__ */ v.createElement(rr, $t({
    key: "label-implicit"
  }, n)) : Ke(e) ? /* @__PURE__ */ v.createElement(rr, $t({
    key: "label-implicit",
    value: e
  }, n)) : /* @__PURE__ */ v.isValidElement(e) ? e.type === rr ? /* @__PURE__ */ v.cloneElement(e, Mn({
    key: "label-implicit"
  }, n)) : /* @__PURE__ */ v.createElement(rr, $t({
    key: "label-implicit",
    content: e
  }, n)) : As(e) ? /* @__PURE__ */ v.createElement(rr, $t({
    key: "label-implicit",
    content: e
  }, n)) : e && typeof e == "object" ? /* @__PURE__ */ v.createElement(rr, $t({}, e, {
    key: "label-implicit"
  }, n)) : null;
};
function Ug(e) {
  var {
    label: t,
    labelRef: r
  } = e, n = Wg();
  return Qj(t, n, r) || null;
}
var Jj = ["valueAccessor"], eI = ["dataKey", "clockWise", "id", "textBreakAll", "zIndex"];
function Ea() {
  return Ea = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ea.apply(null, arguments);
}
function Fd(e, t) {
  if (e == null) return {};
  var r, n, i = tI(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function tI(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var rI = (e) => {
  var t = Array.isArray(e.value) ? e.value[e.value.length - 1] : e.value;
  if (Cj(t))
    return t;
}, Kg = /* @__PURE__ */ v.createContext(void 0), nI = Kg.Provider, Hg = /* @__PURE__ */ v.createContext(void 0);
Hg.Provider;
function iI() {
  return v.useContext(Kg);
}
function aI() {
  return v.useContext(Hg);
}
function Dn(e) {
  var {
    valueAccessor: t = rI
  } = e, r = Fd(e, Jj), {
    dataKey: n,
    clockWise: i,
    id: a,
    textBreakAll: o,
    zIndex: l
  } = r, u = Fd(r, eI), s = iI(), c = aI(), f = s || c;
  return !f || !f.length ? null : /* @__PURE__ */ v.createElement(Mt, {
    zIndex: l ?? Ne.label
  }, /* @__PURE__ */ v.createElement(mt, {
    className: "recharts-label-list"
  }, f.map((d, h) => {
    var p, g = Ie(n) ? t(d, h) : je(d.payload, n), m = Ie(a) ? {} : {
      id: "".concat(a, "-").concat(h)
    };
    return /* @__PURE__ */ v.createElement(rr, Ea({
      key: "label-".concat(h)
    }, qe(d), u, m, {
      /*
       * Prefer to use the explicit fill from LabelList props.
       * Only in an absence of that, fall back to the fill of the entry.
       * The entry fill can be quite difficult to see especially in Bar, Pie, RadialBar in inside positions.
       * On the other hand it's quite convenient in Scatter, Line, or when the position is outside the Bar, Pie filled shapes.
       */
      fill: (p = r.fill) !== null && p !== void 0 ? p : d.fill,
      parentViewBox: d.parentViewBox,
      value: g,
      textBreakAll: o,
      viewBox: d.viewBox,
      index: h,
      zIndex: 0
    }));
  })));
}
Dn.displayName = "LabelList";
function oI(e) {
  var {
    label: t
  } = e;
  return t ? t === !0 ? /* @__PURE__ */ v.createElement(Dn, {
    key: "labelList-implicit"
  }) : /* @__PURE__ */ v.isValidElement(t) || As(t) ? /* @__PURE__ */ v.createElement(Dn, {
    key: "labelList-implicit",
    content: t
  }) : typeof t == "object" ? /* @__PURE__ */ v.createElement(Dn, Ea({
    key: "labelList-implicit"
  }, t, {
    type: String(t.type)
  })) : null : null;
}
function Ul() {
  return Ul = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ul.apply(null, arguments);
}
var Gg = (e) => {
  var {
    cx: t,
    cy: r,
    r: n,
    className: i
  } = e, a = J("recharts-dot", i);
  return L(t) && L(r) && L(n) ? /* @__PURE__ */ v.createElement("circle", Ul({}, pt(e), ou(e), {
    className: a,
    cx: t,
    cy: r,
    r: n
  })) : null;
}, lI = {
  radiusAxis: {},
  angleAxis: {}
}, qg = Re({
  name: "polarAxis",
  initialState: lI,
  reducers: {
    addRadiusAxis(e, t) {
      e.radiusAxis[t.payload.id] = t.payload;
    },
    removeRadiusAxis(e, t) {
      delete e.radiusAxis[t.payload.id];
    },
    addAngleAxis(e, t) {
      e.angleAxis[t.payload.id] = t.payload;
    },
    removeAngleAxis(e, t) {
      delete e.angleAxis[t.payload.id];
    }
  }
}), {
  addRadiusAxis: v2,
  removeRadiusAxis: h2,
  addAngleAxis: p2,
  removeAngleAxis: m2
} = qg.actions, uI = qg.reducer;
function sI(e) {
  return e && typeof e == "object" && "className" in e && typeof e.className == "string" ? e.className : "";
}
var Yg = (e) => e && typeof e == "object" && "clipDot" in e ? !!e.clipDot : !0;
function cI(e) {
  var {
    tooltipEntrySettings: t
  } = e, r = ue(), n = Fe(), i = v.useRef(null);
  return v.useLayoutEffect(() => {
    n || (i.current === null ? r(Wk(t)) : i.current !== t && r(Uk({
      prev: i.current,
      next: t
    })), i.current = t);
  }, [t, r, n]), v.useLayoutEffect(() => () => {
    i.current && (r(Kk(i.current)), i.current = null);
  }, [r]), null;
}
function fI(e) {
  var {
    legendPayload: t
  } = e, r = ue(), n = Fe(), i = v.useRef(null);
  return v.useLayoutEffect(() => {
    n || (i.current === null ? r(T1(t)) : i.current !== t && r(D1({
      prev: i.current,
      next: t
    })), i.current = t);
  }, [r, n, t]), v.useLayoutEffect(() => () => {
    i.current && (r(N1(i.current)), i.current = null);
  }, [r]), null;
}
var Ho, dI = () => {
  var [e] = v.useState(() => Nn("uid-"));
  return e;
}, vI = (Ho = Zy.useId) !== null && Ho !== void 0 ? Ho : dI;
function hI(e, t) {
  var r = vI();
  return t || (e ? "".concat(e, "-").concat(r) : r);
}
var pI = /* @__PURE__ */ v.createContext(void 0), mI = (e) => {
  var {
    id: t,
    type: r,
    children: n
  } = e, i = hI("recharts-".concat(r), t);
  return /* @__PURE__ */ v.createElement(pI.Provider, {
    value: i
  }, n(i));
}, gI = {
  cartesianItems: [],
  polarItems: []
}, Vg = Re({
  name: "graphicalItems",
  initialState: gI,
  reducers: {
    addCartesianGraphicalItem: {
      reducer(e, t) {
        e.cartesianItems.push(t.payload);
      },
      prepare: ie()
    },
    replaceCartesianGraphicalItem: {
      reducer(e, t) {
        var {
          prev: r,
          next: n
        } = t.payload, i = ot(e).cartesianItems.indexOf(r);
        i > -1 && (e.cartesianItems[i] = n);
      },
      prepare: ie()
    },
    removeCartesianGraphicalItem: {
      reducer(e, t) {
        var r = ot(e).cartesianItems.indexOf(t.payload);
        r > -1 && e.cartesianItems.splice(r, 1);
      },
      prepare: ie()
    },
    addPolarGraphicalItem: {
      reducer(e, t) {
        e.polarItems.push(t.payload);
      },
      prepare: ie()
    },
    removePolarGraphicalItem: {
      reducer(e, t) {
        var r = ot(e).polarItems.indexOf(t.payload);
        r > -1 && e.polarItems.splice(r, 1);
      },
      prepare: ie()
    },
    replacePolarGraphicalItem: {
      reducer(e, t) {
        var {
          prev: r,
          next: n
        } = t.payload, i = ot(e).polarItems.indexOf(r);
        i > -1 && (e.polarItems[i] = n);
      },
      prepare: ie()
    }
  }
}), {
  addCartesianGraphicalItem: yI,
  replaceCartesianGraphicalItem: bI,
  removeCartesianGraphicalItem: xI,
  addPolarGraphicalItem: g2,
  removePolarGraphicalItem: y2,
  replacePolarGraphicalItem: b2
} = Vg.actions, wI = Vg.reducer, PI = (e) => {
  var t = ue(), r = v.useRef(null);
  return v.useLayoutEffect(() => {
    r.current === null ? t(yI(e)) : r.current !== e && t(bI({
      prev: r.current,
      next: e
    })), r.current = e;
  }, [t, e]), v.useLayoutEffect(() => () => {
    r.current && (t(xI(r.current)), r.current = null);
  }, [t]), null;
}, OI = /* @__PURE__ */ v.memo(PI), AI = ["points"];
function Wd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Go(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Wd(Object(r), !0).forEach(function(n) {
      SI(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Wd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function SI(e, t, r) {
  return (t = _I(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function _I(e) {
  var t = kI(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function kI(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ca() {
  return Ca = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ca.apply(null, arguments);
}
function EI(e, t) {
  if (e == null) return {};
  var r, n, i = CI(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function CI(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function jI(e) {
  var {
    option: t,
    dotProps: r,
    className: n
  } = e;
  if (/* @__PURE__ */ v.isValidElement(t))
    return /* @__PURE__ */ v.cloneElement(t, r);
  if (typeof t == "function")
    return t(r);
  var i = J(n, typeof t != "boolean" ? t.className : ""), a = r ?? {}, {
    points: o
  } = a, l = EI(a, AI);
  return /* @__PURE__ */ v.createElement(Gg, Ca({}, l, {
    className: i
  }));
}
function II(e, t) {
  return e == null ? !1 : t ? !0 : e.length === 1;
}
function MI(e) {
  var {
    points: t,
    dot: r,
    className: n,
    dotClassName: i,
    dataKey: a,
    baseProps: o,
    needClip: l,
    clipPathId: u,
    zIndex: s = Ne.scatter
  } = e;
  if (!II(t, r))
    return null;
  var c = Yg(r), f = tb(r), d = t.map((p, g) => {
    var m, y, x = Go(Go(Go({
      r: 3
    }, o), f), {}, {
      index: g,
      cx: (m = p.x) !== null && m !== void 0 ? m : void 0,
      cy: (y = p.y) !== null && y !== void 0 ? y : void 0,
      dataKey: a,
      value: p.value,
      payload: p.payload,
      points: t
    });
    return /* @__PURE__ */ v.createElement(jI, {
      key: "dot-".concat(g),
      option: r,
      dotProps: x,
      className: i
    });
  }), h = {};
  return l && u != null && (h.clipPath = "url(#clipPath-".concat(c ? "" : "dots-").concat(u, ")")), /* @__PURE__ */ v.createElement(Mt, {
    zIndex: s
  }, /* @__PURE__ */ v.createElement(mt, Ca({
    className: n
  }, h), d));
}
function Ud(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Kd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ud(Object(r), !0).forEach(function(n) {
      TI(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ud(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function TI(e, t, r) {
  return (t = DI(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function DI(e) {
  var t = NI(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function NI(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Xg = 0, $I = {
  xAxis: {},
  yAxis: {},
  zAxis: {}
}, Zg = Re({
  name: "cartesianAxis",
  initialState: $I,
  reducers: {
    addXAxis: {
      reducer(e, t) {
        e.xAxis[t.payload.id] = t.payload;
      },
      prepare: ie()
    },
    replaceXAxis: {
      reducer(e, t) {
        var {
          prev: r,
          next: n
        } = t.payload;
        e.xAxis[r.id] !== void 0 && (r.id !== n.id && delete e.xAxis[r.id], e.xAxis[n.id] = n);
      },
      prepare: ie()
    },
    removeXAxis: {
      reducer(e, t) {
        delete e.xAxis[t.payload.id];
      },
      prepare: ie()
    },
    addYAxis: {
      reducer(e, t) {
        e.yAxis[t.payload.id] = t.payload;
      },
      prepare: ie()
    },
    replaceYAxis: {
      reducer(e, t) {
        var {
          prev: r,
          next: n
        } = t.payload;
        e.yAxis[r.id] !== void 0 && (r.id !== n.id && delete e.yAxis[r.id], e.yAxis[n.id] = n);
      },
      prepare: ie()
    },
    removeYAxis: {
      reducer(e, t) {
        delete e.yAxis[t.payload.id];
      },
      prepare: ie()
    },
    addZAxis: {
      reducer(e, t) {
        e.zAxis[t.payload.id] = t.payload;
      },
      prepare: ie()
    },
    replaceZAxis: {
      reducer(e, t) {
        var {
          prev: r,
          next: n
        } = t.payload;
        e.zAxis[r.id] !== void 0 && (r.id !== n.id && delete e.zAxis[r.id], e.zAxis[n.id] = n);
      },
      prepare: ie()
    },
    removeZAxis: {
      reducer(e, t) {
        delete e.zAxis[t.payload.id];
      },
      prepare: ie()
    },
    updateYAxisWidth(e, t) {
      var {
        id: r,
        width: n
      } = t.payload, i = e.yAxis[r];
      if (i) {
        var a, o = i.widthHistory || [];
        if (o.length === 3 && o[0] === o[2] && n === o[1] && n !== i.width && Math.abs(n - ((a = o[0]) !== null && a !== void 0 ? a : 0)) <= 1)
          return;
        var l = [...o, n].slice(-3);
        e.yAxis[r] = Kd(Kd({}, i), {}, {
          width: n,
          widthHistory: l
        });
      }
    }
  }
}), {
  addXAxis: RI,
  replaceXAxis: LI,
  removeXAxis: zI,
  addYAxis: BI,
  replaceYAxis: FI,
  removeYAxis: WI,
  addZAxis: x2,
  replaceZAxis: w2,
  removeZAxis: P2,
  updateYAxisWidth: UI
} = Zg.actions, KI = Zg.reducer, HI = S([Me], (e) => ({
  top: e.top,
  bottom: e.bottom,
  left: e.left,
  right: e.right
})), GI = S([HI, Gt, qt], (e, t, r) => {
  if (!(!e || t == null || r == null))
    return {
      x: e.left,
      y: e.top,
      width: Math.max(0, t - e.left - e.right),
      height: Math.max(0, r - e.top - e.bottom)
    };
}), Ss = () => z(GI), qI = () => z(WE);
function Hd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function qo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Hd(Object(r), !0).forEach(function(n) {
      YI(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Hd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function YI(e, t, r) {
  return (t = VI(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function VI(e) {
  var t = XI(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function XI(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ZI = (e) => {
  var {
    point: t,
    childIndex: r,
    mainColor: n,
    activeDot: i,
    dataKey: a,
    clipPath: o
  } = e;
  if (i === !1 || t.x == null || t.y == null)
    return null;
  var l = {
    index: r,
    dataKey: a,
    cx: t.x,
    cy: t.y,
    r: 4,
    fill: n ?? "none",
    strokeWidth: 2,
    stroke: "#fff",
    payload: t.payload,
    value: t.value
  }, u = qo(qo(qo({}, l), $a(i)), ou(i)), s;
  return /* @__PURE__ */ v.isValidElement(i) ? s = /* @__PURE__ */ v.cloneElement(i, u) : typeof i == "function" ? s = i(u) : s = /* @__PURE__ */ v.createElement(Gg, u), /* @__PURE__ */ v.createElement(mt, {
    className: "recharts-active-dot",
    clipPath: o
  }, s);
};
function Gd(e) {
  var {
    points: t,
    mainColor: r,
    activeDot: n,
    itemDataKey: i,
    clipPath: a,
    zIndex: o = Ne.activeDot
  } = e, l = z(Yn), u = qI();
  if (t == null || u == null)
    return null;
  var s = t.find((c) => u.includes(c.payload));
  return Ie(s) ? null : /* @__PURE__ */ v.createElement(Mt, {
    zIndex: o
  }, /* @__PURE__ */ v.createElement(ZI, {
    point: s,
    childIndex: Number(l),
    mainColor: r,
    dataKey: i,
    activeDot: n,
    clipPath: a
  }));
}
var QI = (e) => {
  var {
    chartData: t
  } = e, r = ue(), n = Fe();
  return v.useEffect(() => n ? () => {
  } : (r(Od(t)), () => {
    r(Od(void 0));
  }), [t, r, n]), null;
}, qd = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
}, Qg = Re({
  name: "brush",
  initialState: qd,
  reducers: {
    setBrushSettings(e, t) {
      return t.payload == null ? qd : t.payload;
    }
  }
}), {
  setBrushSettings: O2
} = Qg.actions, JI = Qg.reducer, eM = (e, t) => {
  var {
    x: r,
    y: n
  } = e, {
    x: i,
    y: a
  } = t;
  return {
    x: Math.min(r, i),
    y: Math.min(n, a),
    width: Math.abs(i - r),
    height: Math.abs(a - n)
  };
};
function tM(e) {
  return (e % 180 + 180) % 180;
}
var rM = function(t) {
  var {
    width: r,
    height: n
  } = t, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = tM(i), o = a * Math.PI / 180, l = Math.atan(n / r), u = o > l && o < Math.PI - l ? n / Math.sin(o) : r / Math.cos(o);
  return Math.abs(u);
}, nM = {
  dots: [],
  areas: [],
  lines: []
}, Jg = Re({
  name: "referenceElements",
  initialState: nM,
  reducers: {
    addDot: (e, t) => {
      e.dots.push(t.payload);
    },
    removeDot: (e, t) => {
      var r = ot(e).dots.findIndex((n) => n === t.payload);
      r !== -1 && e.dots.splice(r, 1);
    },
    addArea: (e, t) => {
      e.areas.push(t.payload);
    },
    removeArea: (e, t) => {
      var r = ot(e).areas.findIndex((n) => n === t.payload);
      r !== -1 && e.areas.splice(r, 1);
    },
    addLine: (e, t) => {
      e.lines.push(t.payload);
    },
    removeLine: (e, t) => {
      var r = ot(e).lines.findIndex((n) => n === t.payload);
      r !== -1 && e.lines.splice(r, 1);
    }
  }
}), {
  addDot: A2,
  removeDot: S2,
  addArea: iM,
  removeArea: aM,
  addLine: _2,
  removeLine: k2
} = Jg.actions, oM = Jg.reducer, ey = /* @__PURE__ */ v.createContext(void 0), lM = (e) => {
  var {
    children: t
  } = e, [r] = v.useState("".concat(Nn("recharts"), "-clip")), n = Ss();
  if (n == null)
    return null;
  var {
    x: i,
    y: a,
    width: o,
    height: l
  } = n;
  return /* @__PURE__ */ v.createElement(ey.Provider, {
    value: r
  }, /* @__PURE__ */ v.createElement("defs", null, /* @__PURE__ */ v.createElement("clipPath", {
    id: r
  }, /* @__PURE__ */ v.createElement("rect", {
    x: i,
    y: a,
    height: l,
    width: o
  }))), t);
}, uM = () => v.useContext(ey);
class sM {
  constructor(t) {
    var {
      x: r,
      y: n
    } = t;
    this.xAxisScale = r, this.yAxisScale = n;
  }
  map(t, r) {
    var n, i, {
      position: a
    } = r;
    return {
      x: (n = this.xAxisScale.map(t.x, {
        position: a
      })) !== null && n !== void 0 ? n : 0,
      y: (i = this.yAxisScale.map(t.y, {
        position: a
      })) !== null && i !== void 0 ? i : 0
    };
  }
  mapWithFallback(t, r) {
    var n, i, {
      position: a,
      fallback: o
    } = r, l, u;
    return o === "rangeMin" ? l = this.yAxisScale.rangeMin() : o === "rangeMax" ? l = this.yAxisScale.rangeMax() : l = 0, o === "rangeMin" ? u = this.xAxisScale.rangeMin() : o === "rangeMax" ? u = this.xAxisScale.rangeMax() : u = 0, {
      x: (n = this.xAxisScale.map(t.x, {
        position: a
      })) !== null && n !== void 0 ? n : u,
      y: (i = this.yAxisScale.map(t.y, {
        position: a
      })) !== null && i !== void 0 ? i : l
    };
  }
  isInRange(t) {
    var {
      x: r,
      y: n
    } = t, i = r == null || this.xAxisScale.isInRange(r), a = n == null || this.yAxisScale.isInRange(n);
    return i && a;
  }
}
function Yd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Vd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Yd(Object(r), !0).forEach(function(n) {
      cM(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Yd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function cM(e, t, r) {
  return (t = fM(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function fM(e) {
  var t = dM(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function dM(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ja() {
  return ja = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ja.apply(null, arguments);
}
var vM = (e, t, r, n, i, a, o) => {
  var l, u, s, c, {
    x1: f,
    x2: d,
    y1: h,
    y2: p
  } = o;
  if (i == null || a == null)
    return null;
  var g = new sM({
    x: i,
    y: a
  }), m = {
    x: e ? (l = i.map(f, {
      position: "start"
    })) !== null && l !== void 0 ? l : null : i.rangeMin(),
    y: r ? (u = a.map(h, {
      position: "start"
    })) !== null && u !== void 0 ? u : null : a.rangeMin()
  }, y = {
    x: t ? (s = i.map(d, {
      position: "end"
    })) !== null && s !== void 0 ? s : null : i.rangeMax(),
    y: n ? (c = a.map(p, {
      position: "end"
    })) !== null && c !== void 0 ? c : null : a.rangeMax()
  };
  return o.ifOverflow === "discard" && (!g.isInRange(m) || !g.isInRange(y)) ? null : eM(m, y);
}, hM = (e, t) => {
  var r;
  return /* @__PURE__ */ v.isValidElement(e) ? r = /* @__PURE__ */ v.cloneElement(e, t) : typeof e == "function" ? r = e(t) : r = /* @__PURE__ */ v.createElement(vp, ja({}, t, {
    className: "recharts-reference-area-rect"
  })), r;
};
function pM(e) {
  var t = ue();
  return v.useEffect(() => (t(iM(e)), () => {
    t(aM(e));
  })), null;
}
function mM(e) {
  var {
    x1: t,
    x2: r,
    y1: n,
    y2: i,
    className: a,
    shape: o,
    xAxisId: l,
    yAxisId: u
  } = e, s = uM(), c = Fe(), f = z((w) => un(w, "xAxis", l, c)), d = z((w) => un(w, "yAxis", u, c));
  if (f == null || d == null)
    return null;
  var h = Ke(t), p = Ke(r), g = Ke(n), m = Ke(i);
  if (!h && !p && !g && !m && !o)
    return null;
  var y = vM(h, p, g, m, f, d, e);
  if (!y && !o)
    return null;
  var x = e.ifOverflow === "hidden", b = x ? "url(#".concat(s, ")") : void 0;
  return /* @__PURE__ */ v.createElement(Mt, {
    zIndex: e.zIndex
  }, /* @__PURE__ */ v.createElement(mt, {
    className: J("recharts-reference-area", a)
  }, hM(o, Vd(Vd({
    clipPath: b
  }, qe(e)), y)), y != null && /* @__PURE__ */ v.createElement(Fg, ja({}, y, {
    lowerWidth: y.width,
    upperWidth: y.width
  }), /* @__PURE__ */ v.createElement(Ug, {
    label: e.label
  }), e.children)));
}
var gM = {
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  radius: 0,
  fill: "#ccc",
  label: !1,
  fillOpacity: 0.5,
  stroke: "none",
  strokeWidth: 1,
  zIndex: Ne.area
};
function ty(e) {
  var t = Be(e, gM);
  return /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ v.createElement(pM, {
    yAxisId: t.yAxisId,
    xAxisId: t.xAxisId,
    ifOverflow: t.ifOverflow,
    x1: t.x1,
    x2: t.x2,
    y1: t.y1,
    y2: t.y2
  }), /* @__PURE__ */ v.createElement(mM, t));
}
ty.displayName = "ReferenceArea";
function ry(e, t) {
  if (t < 1)
    return [];
  if (t === 1)
    return e;
  for (var r = [], n = 0; n < e.length; n += t) {
    var i = e[n];
    i !== void 0 && r.push(i);
  }
  return r;
}
function yM(e, t, r) {
  var n = {
    width: e.width + t.width,
    height: e.height + t.height
  };
  return rM(n, r);
}
function bM(e, t, r) {
  var n = r === "width", {
    x: i,
    y: a,
    width: o,
    height: l
  } = e;
  return t === 1 ? {
    start: n ? i : a,
    end: n ? i + o : a + l
  } : {
    start: n ? i + o : a + l,
    end: n ? i : a
  };
}
function Xn(e, t, r, n, i) {
  if (e * t < e * n || e * t > e * i)
    return !1;
  var a = r();
  return e * (t - e * a / 2 - n) >= 0 && e * (t + e * a / 2 - i) <= 0;
}
function xM(e, t) {
  return ry(e, t + 1);
}
function wM(e, t, r, n, i) {
  for (var a = (n || []).slice(), {
    start: o,
    end: l
  } = t, u = 0, s = 1, c = o, f = function() {
    var p = n?.[u];
    if (p === void 0)
      return {
        v: ry(n, s)
      };
    var g = u, m, y = () => (m === void 0 && (m = r(p, g)), m), x = p.coordinate, b = u === 0 || Xn(e, x, y, c, l);
    b || (u = 0, c = o, s += 1), b && (c = x + e * (y() / 2 + i), u += s);
  }, d; s <= a.length; )
    if (d = f(), d) return d.v;
  return [];
}
function PM(e, t, r, n, i) {
  var a = (n || []).slice(), o = a.length;
  if (o === 0)
    return [];
  for (var {
    start: l,
    end: u
  } = t, s = 1; s <= o; s++) {
    for (var c = (o - 1) % s, f = l, d = !0, h = function() {
      var w = n[g];
      if (w == null)
        return 0;
      var O = g, P, _ = () => (P === void 0 && (P = r(w, O)), P), A = w.coordinate, C = g === c || Xn(e, A, _, f, u);
      if (!C)
        return d = !1, 1;
      C && (f = A + e * (_() / 2 + i));
    }, p, g = c; g < o && (p = h(), !(p !== 0 && p === 1)); g += s)
      ;
    if (d) {
      for (var m = [], y = c; y < o; y += s) {
        var x = n[y];
        x != null && m.push(x);
      }
      return m;
    }
  }
  return [];
}
function Xd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Te(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Xd(Object(r), !0).forEach(function(n) {
      OM(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Xd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function OM(e, t, r) {
  return (t = AM(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function AM(e) {
  var t = SM(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function SM(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function _M(e, t, r, n, i) {
  for (var a = (n || []).slice(), o = a.length, {
    start: l
  } = t, {
    end: u
  } = t, s = function(d) {
    var h = a[d];
    if (h == null)
      return 1;
    var p = h, g, m = () => (g === void 0 && (g = r(h, d)), g);
    if (d === o - 1) {
      var y = e * (p.coordinate + e * m() / 2 - u);
      a[d] = p = Te(Te({}, p), {}, {
        tickCoord: y > 0 ? p.coordinate - y * e : p.coordinate
      });
    } else
      a[d] = p = Te(Te({}, p), {}, {
        tickCoord: p.coordinate
      });
    if (p.tickCoord != null) {
      var x = Xn(e, p.tickCoord, m, l, u);
      x && (u = p.tickCoord - e * (m() / 2 + i), a[d] = Te(Te({}, p), {}, {
        isShow: !0
      }));
    }
  }, c = o - 1; c >= 0; c--)
    s(c);
  return a;
}
function kM(e, t, r, n, i, a) {
  var o = (n || []).slice(), l = o.length, {
    start: u,
    end: s
  } = t;
  if (a) {
    var c = n[l - 1];
    if (c != null) {
      var f = r(c, l - 1), d = e * (c.coordinate + e * f / 2 - s);
      if (o[l - 1] = c = Te(Te({}, c), {}, {
        tickCoord: d > 0 ? c.coordinate - d * e : c.coordinate
      }), c.tickCoord != null) {
        var h = Xn(e, c.tickCoord, () => f, u, s);
        h && (s = c.tickCoord - e * (f / 2 + i), o[l - 1] = Te(Te({}, c), {}, {
          isShow: !0
        }));
      }
    }
  }
  for (var p = a ? l - 1 : l, g = function(x) {
    var b = o[x];
    if (b == null)
      return 1;
    var w = b, O, P = () => (O === void 0 && (O = r(b, x)), O);
    if (x === 0) {
      var _ = e * (w.coordinate - e * P() / 2 - u);
      o[x] = w = Te(Te({}, w), {}, {
        tickCoord: _ < 0 ? w.coordinate - _ * e : w.coordinate
      });
    } else
      o[x] = w = Te(Te({}, w), {}, {
        tickCoord: w.coordinate
      });
    if (w.tickCoord != null) {
      var A = Xn(e, w.tickCoord, P, u, s);
      A && (u = w.tickCoord + e * (P() / 2 + i), o[x] = Te(Te({}, w), {}, {
        isShow: !0
      }));
    }
  }, m = 0; m < p; m++)
    g(m);
  return o;
}
function _s(e, t, r) {
  var {
    tick: n,
    ticks: i,
    viewBox: a,
    minTickGap: o,
    orientation: l,
    interval: u,
    tickFormatter: s,
    unit: c,
    angle: f
  } = e;
  if (!i || !i.length || !n)
    return [];
  if (L(u) || ii.isSsr) {
    var d;
    return (d = xM(i, L(u) ? u : 0)) !== null && d !== void 0 ? d : [];
  }
  var h = [], p = l === "top" || l === "bottom" ? "width" : "height", g = c && p === "width" ? Tn(c, {
    fontSize: t,
    letterSpacing: r
  }) : {
    width: 0,
    height: 0
  }, m = (O, P) => {
    var _ = typeof s == "function" ? s(O.value, P) : O.value;
    return p === "width" ? yM(Tn(_, {
      fontSize: t,
      letterSpacing: r
    }), g, f) : Tn(_, {
      fontSize: t,
      letterSpacing: r
    })[p];
  }, y = i[0], x = i[1], b = i.length >= 2 && y != null && x != null ? at(x.coordinate - y.coordinate) : 1, w = bM(a, b, p);
  return u === "equidistantPreserveStart" ? wM(b, w, m, i, o) : u === "equidistantPreserveEnd" ? PM(b, w, m, i, o) : (u === "preserveStart" || u === "preserveStartEnd" ? h = kM(b, w, m, i, o, u === "preserveStartEnd") : h = _M(b, w, m, i, o), h.filter((O) => O.isShow));
}
var EM = (e) => {
  var {
    ticks: t,
    label: r,
    labelGapWithTick: n = 5,
    // Default gap between label and tick
    tickSize: i = 0,
    tickMargin: a = 0
  } = e, o = 0;
  if (t) {
    Array.from(t).forEach((c) => {
      if (c) {
        var f = c.getBoundingClientRect();
        f.width > o && (o = f.width);
      }
    });
    var l = r ? r.getBoundingClientRect().width : 0, u = i + a, s = o + u + l + (r ? n : 0);
    return Math.round(s);
  }
  return 0;
}, CM = {
  xAxis: {},
  yAxis: {}
}, ny = Re({
  name: "renderedTicks",
  initialState: CM,
  reducers: {
    setRenderedTicks: (e, t) => {
      var {
        axisType: r,
        axisId: n,
        ticks: i
      } = t.payload;
      e[r][n] = i;
    },
    removeRenderedTicks: (e, t) => {
      var {
        axisType: r,
        axisId: n
      } = t.payload;
      delete e[r][n];
    }
  }
}), {
  setRenderedTicks: jM,
  removeRenderedTicks: IM
} = ny.actions, MM = ny.reducer, TM = ["axisLine", "width", "height", "className", "hide", "ticks", "axisType", "axisId"];
function DM(e, t) {
  if (e == null) return {};
  var r, n, i = NM(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function NM(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Nr() {
  return Nr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Nr.apply(null, arguments);
}
function Zd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ce(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Zd(Object(r), !0).forEach(function(n) {
      $M(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Zd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function $M(e, t, r) {
  return (t = RM(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function RM(e) {
  var t = LM(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function LM(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Bt = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  // The orientation of axis
  orientation: "bottom",
  // The ticks
  ticks: [],
  stroke: "#666",
  tickLine: !0,
  axisLine: !0,
  tick: !0,
  mirror: !1,
  minTickGap: 5,
  // The width or height of tick
  tickSize: 6,
  tickMargin: 2,
  interval: "preserveEnd",
  zIndex: Ne.axis
};
function zM(e) {
  var {
    x: t,
    y: r,
    width: n,
    height: i,
    orientation: a,
    mirror: o,
    axisLine: l,
    otherSvgProps: u
  } = e;
  if (!l)
    return null;
  var s = ce(ce(ce({}, u), pt(l)), {}, {
    fill: "none"
  });
  if (a === "top" || a === "bottom") {
    var c = +(a === "top" && !o || a === "bottom" && o);
    s = ce(ce({}, s), {}, {
      x1: t,
      y1: r + c * i,
      x2: t + n,
      y2: r + c * i
    });
  } else {
    var f = +(a === "left" && !o || a === "right" && o);
    s = ce(ce({}, s), {}, {
      x1: t + f * n,
      y1: r,
      x2: t + f * n,
      y2: r + i
    });
  }
  return /* @__PURE__ */ v.createElement("line", Nr({}, s, {
    className: J("recharts-cartesian-axis-line", $r(l, "className"))
  }));
}
function BM(e, t, r, n, i, a, o, l, u) {
  var s, c, f, d, h, p, g = l ? -1 : 1, m = e.tickSize || o, y = L(e.tickCoord) ? e.tickCoord : e.coordinate;
  switch (a) {
    case "top":
      s = c = e.coordinate, d = r + +!l * i, f = d - g * m, p = f - g * u, h = y;
      break;
    case "left":
      f = d = e.coordinate, c = t + +!l * n, s = c - g * m, h = s - g * u, p = y;
      break;
    case "right":
      f = d = e.coordinate, c = t + +l * n, s = c + g * m, h = s + g * u, p = y;
      break;
    default:
      s = c = e.coordinate, d = r + +l * i, f = d + g * m, p = f + g * u, h = y;
      break;
  }
  return {
    line: {
      x1: s,
      y1: f,
      x2: c,
      y2: d
    },
    tick: {
      x: h,
      y: p
    }
  };
}
function FM(e, t) {
  switch (e) {
    case "left":
      return t ? "start" : "end";
    case "right":
      return t ? "end" : "start";
    default:
      return "middle";
  }
}
function WM(e, t) {
  switch (e) {
    case "left":
    case "right":
      return "middle";
    case "top":
      return t ? "start" : "end";
    default:
      return t ? "end" : "start";
  }
}
function UM(e) {
  var {
    option: t,
    tickProps: r,
    value: n
  } = e, i, a = J(r.className, "recharts-cartesian-axis-tick-value");
  if (/* @__PURE__ */ v.isValidElement(t))
    i = /* @__PURE__ */ v.cloneElement(t, ce(ce({}, r), {}, {
      className: a
    }));
  else if (typeof t == "function")
    i = t(ce(ce({}, r), {}, {
      className: a
    }));
  else {
    var o = "recharts-cartesian-axis-tick-value";
    typeof t != "boolean" && (o = J(o, sI(t))), i = /* @__PURE__ */ v.createElement(Os, Nr({}, r, {
      className: o
    }), n);
  }
  return i;
}
function KM(e) {
  var {
    ticks: t,
    axisType: r,
    axisId: n
  } = e, i = ue();
  return v.useEffect(() => {
    if (n == null || r == null)
      return Rr;
    var a = t.map((o) => ({
      value: o.value,
      coordinate: o.coordinate,
      offset: o.offset,
      index: o.index
    }));
    return i(jM({
      ticks: a,
      axisId: n,
      axisType: r
    })), () => {
      i(IM({
        axisId: n,
        axisType: r
      }));
    };
  }, [i, t, n, r]), null;
}
var HM = /* @__PURE__ */ v.forwardRef((e, t) => {
  var {
    ticks: r = [],
    tick: n,
    tickLine: i,
    stroke: a,
    tickFormatter: o,
    unit: l,
    padding: u,
    tickTextProps: s,
    orientation: c,
    mirror: f,
    x: d,
    y: h,
    width: p,
    height: g,
    tickSize: m,
    tickMargin: y,
    fontSize: x,
    letterSpacing: b,
    getTicksConfig: w,
    events: O,
    axisType: P,
    axisId: _
  } = e, A = _s(ce(ce({}, w), {}, {
    ticks: r
  }), x, b), C = pt(w), T = $a(n), I = $g(C.textAnchor) ? C.textAnchor : FM(c, f), k = WM(c, f), B = {};
  typeof i == "object" && (B = i);
  var F = ce(ce({}, C), {}, {
    fill: "none"
  }, B), U = A.map((re) => ce({
    entry: re
  }, BM(re, d, h, p, g, c, m, f, y))), q = U.map((re) => {
    var {
      entry: Q,
      line: M
    } = re;
    return /* @__PURE__ */ v.createElement(mt, {
      className: "recharts-cartesian-axis-tick",
      key: "tick-".concat(Q.value, "-").concat(Q.coordinate, "-").concat(Q.tickCoord)
    }, i && /* @__PURE__ */ v.createElement("line", Nr({}, F, M, {
      className: J("recharts-cartesian-axis-tick-line", $r(i, "className"))
    })));
  }), V = U.map((re, Q) => {
    var M, Le, {
      entry: se,
      tick: Ue
    } = re, be = ce(ce(ce(ce({
      verticalAnchor: k
    }, C), {}, {
      textAnchor: I,
      stroke: "none",
      fill: a
    }, Ue), {}, {
      index: Q,
      payload: se,
      visibleTicksCount: A.length,
      tickFormatter: o,
      padding: u
    }, s), {}, {
      angle: (M = (Le = s?.angle) !== null && Le !== void 0 ? Le : C.angle) !== null && M !== void 0 ? M : 0
    }), ne = ce(ce({}, be), T);
    return /* @__PURE__ */ v.createElement(mt, Nr({
      className: "recharts-cartesian-axis-tick-label",
      key: "tick-label-".concat(se.value, "-").concat(se.coordinate, "-").concat(se.tickCoord)
    }, Yv(O, se, Q)), n && /* @__PURE__ */ v.createElement(UM, {
      option: n,
      tickProps: ne,
      value: "".concat(typeof o == "function" ? o(se.value, Q) : se.value).concat(l || "")
    }));
  });
  return /* @__PURE__ */ v.createElement("g", {
    className: "recharts-cartesian-axis-ticks recharts-".concat(P, "-ticks")
  }, /* @__PURE__ */ v.createElement(KM, {
    ticks: A,
    axisId: _,
    axisType: P
  }), V.length > 0 && /* @__PURE__ */ v.createElement(Mt, {
    zIndex: Ne.label
  }, /* @__PURE__ */ v.createElement("g", {
    className: "recharts-cartesian-axis-tick-labels recharts-".concat(P, "-tick-labels"),
    ref: t
  }, V)), q.length > 0 && /* @__PURE__ */ v.createElement("g", {
    className: "recharts-cartesian-axis-tick-lines recharts-".concat(P, "-tick-lines")
  }, q));
}), GM = /* @__PURE__ */ v.forwardRef((e, t) => {
  var {
    axisLine: r,
    width: n,
    height: i,
    className: a,
    hide: o,
    ticks: l,
    axisType: u,
    axisId: s
  } = e, c = DM(e, TM), [f, d] = v.useState(""), [h, p] = v.useState(""), g = v.useRef(null);
  v.useImperativeHandle(t, () => ({
    getCalculatedWidth: () => {
      var y;
      return EM({
        ticks: g.current,
        label: (y = e.labelRef) === null || y === void 0 ? void 0 : y.current,
        labelGapWithTick: 5,
        tickSize: e.tickSize,
        tickMargin: e.tickMargin
      });
    }
  }));
  var m = v.useCallback((y) => {
    if (y) {
      var x = y.getElementsByClassName("recharts-cartesian-axis-tick-value");
      g.current = x;
      var b = x[0];
      if (b) {
        var w = window.getComputedStyle(b), O = w.fontSize, P = w.letterSpacing;
        (O !== f || P !== h) && (d(O), p(P));
      }
    }
  }, [f, h]);
  return o || n != null && n <= 0 || i != null && i <= 0 ? null : /* @__PURE__ */ v.createElement(Mt, {
    zIndex: e.zIndex
  }, /* @__PURE__ */ v.createElement(mt, {
    className: J("recharts-cartesian-axis", a)
  }, /* @__PURE__ */ v.createElement(zM, {
    x: e.x,
    y: e.y,
    width: n,
    height: i,
    orientation: e.orientation,
    mirror: e.mirror,
    axisLine: r,
    otherSvgProps: pt(e)
  }), /* @__PURE__ */ v.createElement(HM, {
    ref: m,
    axisType: u,
    events: c,
    fontSize: f,
    getTicksConfig: e,
    height: e.height,
    letterSpacing: h,
    mirror: e.mirror,
    orientation: e.orientation,
    padding: e.padding,
    stroke: e.stroke,
    tick: e.tick,
    tickFormatter: e.tickFormatter,
    tickLine: e.tickLine,
    tickMargin: e.tickMargin,
    tickSize: e.tickSize,
    tickTextProps: e.tickTextProps,
    ticks: l,
    unit: e.unit,
    width: e.width,
    x: e.x,
    y: e.y,
    axisId: s
  }), /* @__PURE__ */ v.createElement(Fg, {
    x: e.x,
    y: e.y,
    width: e.width,
    height: e.height,
    lowerWidth: e.width,
    upperWidth: e.width
  }, /* @__PURE__ */ v.createElement(Ug, {
    label: e.label,
    labelRef: e.labelRef
  }), e.children)));
}), ks = /* @__PURE__ */ v.forwardRef((e, t) => {
  var r = Be(e, Bt);
  return /* @__PURE__ */ v.createElement(GM, Nr({}, r, {
    ref: t
  }));
});
ks.displayName = "CartesianAxis";
var qM = ["x1", "y1", "x2", "y2", "key"], YM = ["offset"], VM = ["xAxisId", "yAxisId"], XM = ["xAxisId", "yAxisId"];
function Qd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function De(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Qd(Object(r), !0).forEach(function(n) {
      ZM(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Qd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ZM(e, t, r) {
  return (t = QM(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function QM(e) {
  var t = JM(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function JM(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ar() {
  return Ar = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ar.apply(null, arguments);
}
function Ia(e, t) {
  if (e == null) return {};
  var r, n, i = eT(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function eT(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var tT = (e) => {
  var {
    fill: t
  } = e;
  if (!t || t === "none")
    return null;
  var {
    fillOpacity: r,
    x: n,
    y: i,
    width: a,
    height: o,
    ry: l
  } = e;
  return /* @__PURE__ */ v.createElement("rect", {
    x: n,
    y: i,
    ry: l,
    width: a,
    height: o,
    stroke: "none",
    fill: t,
    fillOpacity: r,
    className: "recharts-cartesian-grid-bg"
  });
};
function iy(e) {
  var {
    option: t,
    lineItemProps: r
  } = e, n;
  if (/* @__PURE__ */ v.isValidElement(t))
    n = /* @__PURE__ */ v.cloneElement(t, r);
  else if (typeof t == "function")
    n = t(r);
  else {
    var i, {
      x1: a,
      y1: o,
      x2: l,
      y2: u,
      key: s
    } = r, c = Ia(r, qM), f = (i = pt(c)) !== null && i !== void 0 ? i : {}, {
      offset: d
    } = f, h = Ia(f, YM);
    n = /* @__PURE__ */ v.createElement("line", Ar({}, h, {
      x1: a,
      y1: o,
      x2: l,
      y2: u,
      fill: "none",
      key: s
    }));
  }
  return n;
}
function rT(e) {
  var {
    x: t,
    width: r,
    horizontal: n = !0,
    horizontalPoints: i
  } = e;
  if (!n || !i || !i.length)
    return null;
  var {
    xAxisId: a,
    yAxisId: o
  } = e, l = Ia(e, VM), u = i.map((s, c) => {
    var f = De(De({}, l), {}, {
      x1: t,
      y1: s,
      x2: t + r,
      y2: s,
      key: "line-".concat(c),
      index: c
    });
    return /* @__PURE__ */ v.createElement(iy, {
      key: "line-".concat(c),
      option: n,
      lineItemProps: f
    });
  });
  return /* @__PURE__ */ v.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, u);
}
function nT(e) {
  var {
    y: t,
    height: r,
    vertical: n = !0,
    verticalPoints: i
  } = e;
  if (!n || !i || !i.length)
    return null;
  var {
    xAxisId: a,
    yAxisId: o
  } = e, l = Ia(e, XM), u = i.map((s, c) => {
    var f = De(De({}, l), {}, {
      x1: s,
      y1: t,
      x2: s,
      y2: t + r,
      key: "line-".concat(c),
      index: c
    });
    return /* @__PURE__ */ v.createElement(iy, {
      option: n,
      lineItemProps: f,
      key: "line-".concat(c)
    });
  });
  return /* @__PURE__ */ v.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, u);
}
function iT(e) {
  var {
    horizontalFill: t,
    fillOpacity: r,
    x: n,
    y: i,
    width: a,
    height: o,
    horizontalPoints: l,
    horizontal: u = !0
  } = e;
  if (!u || !t || !t.length || l == null)
    return null;
  var s = l.map((f) => Math.round(f + i - i)).sort((f, d) => f - d);
  i !== s[0] && s.unshift(0);
  var c = s.map((f, d) => {
    var h = s[d + 1], p = h == null, g = p ? i + o - f : h - f;
    if (g <= 0)
      return null;
    var m = d % t.length;
    return /* @__PURE__ */ v.createElement("rect", {
      key: "react-".concat(d),
      y: f,
      x: n,
      height: g,
      width: a,
      stroke: "none",
      fill: t[m],
      fillOpacity: r,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ v.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, c);
}
function aT(e) {
  var {
    vertical: t = !0,
    verticalFill: r,
    fillOpacity: n,
    x: i,
    y: a,
    width: o,
    height: l,
    verticalPoints: u
  } = e;
  if (!t || !r || !r.length)
    return null;
  var s = u.map((f) => Math.round(f + i - i)).sort((f, d) => f - d);
  i !== s[0] && s.unshift(0);
  var c = s.map((f, d) => {
    var h = s[d + 1], p = h == null, g = p ? i + o - f : h - f;
    if (g <= 0)
      return null;
    var m = d % r.length;
    return /* @__PURE__ */ v.createElement("rect", {
      key: "react-".concat(d),
      x: f,
      y: a,
      width: g,
      height: l,
      stroke: "none",
      fill: r[m],
      fillOpacity: n,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ v.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, c);
}
var oT = (e, t) => {
  var {
    xAxis: r,
    width: n,
    height: i,
    offset: a
  } = e;
  return Wh(_s(De(De(De({}, Bt), r), {}, {
    ticks: Uh(r),
    viewBox: {
      x: 0,
      y: 0,
      width: n,
      height: i
    }
  })), a.left, a.left + a.width, t);
}, lT = (e, t) => {
  var {
    yAxis: r,
    width: n,
    height: i,
    offset: a
  } = e;
  return Wh(_s(De(De(De({}, Bt), r), {}, {
    ticks: Uh(r),
    viewBox: {
      x: 0,
      y: 0,
      width: n,
      height: i
    }
  })), a.top, a.top + a.height, t);
}, uT = {
  horizontal: !0,
  vertical: !0,
  // The ordinates of horizontal grid lines
  horizontalPoints: [],
  // The abscissas of vertical grid lines
  verticalPoints: [],
  stroke: "#ccc",
  fill: "none",
  // The fill of colors of grid lines
  verticalFill: [],
  horizontalFill: [],
  xAxisId: 0,
  yAxisId: 0,
  syncWithTicks: !1,
  zIndex: Ne.grid
};
function ay(e) {
  var t = gu(), r = yu(), n = Xh(), i = De(De({}, Be(e, uT)), {}, {
    x: L(e.x) ? e.x : n.left,
    y: L(e.y) ? e.y : n.top,
    width: L(e.width) ? e.width : n.width,
    height: L(e.height) ? e.height : n.height
  }), {
    xAxisId: a,
    yAxisId: o,
    x: l,
    y: u,
    width: s,
    height: c,
    syncWithTicks: f,
    horizontalValues: d,
    verticalValues: h
  } = i, p = Fe(), g = z((C) => cd(C, "xAxis", a, p)), m = z((C) => cd(C, "yAxis", o, p));
  if (!Ct(s) || !Ct(c) || !L(l) || !L(u))
    return null;
  var y = i.verticalCoordinatesGenerator || oT, x = i.horizontalCoordinatesGenerator || lT, {
    horizontalPoints: b,
    verticalPoints: w
  } = i;
  if ((!b || !b.length) && typeof x == "function") {
    var O = d && d.length, P = x({
      yAxis: m ? De(De({}, m), {}, {
        ticks: O ? d : m.ticks
      }) : void 0,
      width: t ?? s,
      height: r ?? c,
      offset: n
    }, O ? !0 : f);
    na(Array.isArray(P), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(typeof P, "]")), Array.isArray(P) && (b = P);
  }
  if ((!w || !w.length) && typeof y == "function") {
    var _ = h && h.length, A = y({
      xAxis: g ? De(De({}, g), {}, {
        ticks: _ ? h : g.ticks
      }) : void 0,
      width: t ?? s,
      height: r ?? c,
      offset: n
    }, _ ? !0 : f);
    na(Array.isArray(A), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(typeof A, "]")), Array.isArray(A) && (w = A);
  }
  return /* @__PURE__ */ v.createElement(Mt, {
    zIndex: i.zIndex
  }, /* @__PURE__ */ v.createElement("g", {
    className: "recharts-cartesian-grid"
  }, /* @__PURE__ */ v.createElement(tT, {
    fill: i.fill,
    fillOpacity: i.fillOpacity,
    x: i.x,
    y: i.y,
    width: i.width,
    height: i.height,
    ry: i.ry
  }), /* @__PURE__ */ v.createElement(iT, Ar({}, i, {
    horizontalPoints: b
  })), /* @__PURE__ */ v.createElement(aT, Ar({}, i, {
    verticalPoints: w
  })), /* @__PURE__ */ v.createElement(rT, Ar({}, i, {
    offset: n,
    horizontalPoints: b,
    xAxis: g,
    yAxis: m
  })), /* @__PURE__ */ v.createElement(nT, Ar({}, i, {
    offset: n,
    verticalPoints: w,
    xAxis: g,
    yAxis: m
  }))));
}
ay.displayName = "CartesianGrid";
var sT = {}, oy = Re({
  name: "errorBars",
  initialState: sT,
  reducers: {
    addErrorBar: (e, t) => {
      var {
        itemId: r,
        errorBar: n
      } = t.payload;
      e[r] || (e[r] = []), e[r].push(n);
    },
    replaceErrorBar: (e, t) => {
      var {
        itemId: r,
        prev: n,
        next: i
      } = t.payload;
      e[r] && (e[r] = e[r].map((a) => a.dataKey === n.dataKey && a.direction === n.direction ? i : a));
    },
    removeErrorBar: (e, t) => {
      var {
        itemId: r,
        errorBar: n
      } = t.payload;
      e[r] && (e[r] = e[r].filter((i) => i.dataKey !== n.dataKey || i.direction !== n.direction));
    }
  }
}), {
  addErrorBar: E2,
  replaceErrorBar: C2,
  removeErrorBar: j2
} = oy.actions, cT = oy.reducer;
function ly(e, t) {
  var r, n, i = z((s) => Xt(s, e)), a = z((s) => Zt(s, t)), o = (r = i?.allowDataOverflow) !== null && r !== void 0 ? r : he.allowDataOverflow, l = (n = a?.allowDataOverflow) !== null && n !== void 0 ? n : pe.allowDataOverflow, u = o || l;
  return {
    needClip: u,
    needClipX: o,
    needClipY: l
  };
}
function fT(e) {
  var {
    xAxisId: t,
    yAxisId: r,
    clipPathId: n
  } = e, i = Ss(), {
    needClipX: a,
    needClipY: o,
    needClip: l
  } = ly(t, r);
  if (!l || !i)
    return null;
  var {
    x: u,
    y: s,
    width: c,
    height: f
  } = i;
  return /* @__PURE__ */ v.createElement("clipPath", {
    id: "clipPath-".concat(n)
  }, /* @__PURE__ */ v.createElement("rect", {
    x: a ? u : u - c / 2,
    y: o ? s : s - f / 2,
    width: a ? c : c * 2,
    height: o ? f : f * 2
  }));
}
function dT(e) {
  var t = $a(e), r = 3, n = 2;
  if (t != null) {
    var {
      r: i,
      strokeWidth: a
    } = t, o = Number(i), l = Number(a);
    return (Number.isNaN(o) || o < 0) && (o = r), (Number.isNaN(l) || l < 0) && (l = n), {
      r: o,
      strokeWidth: l
    };
  }
  return {
    r,
    strokeWidth: n
  };
}
function Es(e, t) {
  var r, n;
  return (r = (n = e.graphicalItems.cartesianItems.find((i) => i.id === t)) === null || n === void 0 ? void 0 : n.xAxisId) !== null && r !== void 0 ? r : Xg;
}
function Cs(e, t) {
  var r, n;
  return (r = (n = e.graphicalItems.cartesianItems.find((i) => i.id === t)) === null || n === void 0 ? void 0 : n.yAxisId) !== null && r !== void 0 ? r : Xg;
}
var uy = (e, t, r) => tg(e, "xAxis", Es(e, t), r), sy = (e, t, r) => eg(e, "xAxis", Es(e, t), r), cy = (e, t, r) => tg(e, "yAxis", Cs(e, t), r), fy = (e, t, r) => eg(e, "yAxis", Cs(e, t), r), vT = S([le, uy, cy, sy, fy], (e, t, r, n, i) => It(e, "xAxis") ? ra(t, n, !1) : ra(r, i, !1)), hT = (e, t) => t, dy = S([Om, hT], (e, t) => e.filter((r) => r.type === "area").find((r) => r.id === t)), vy = (e) => {
  var t = le(e), r = It(t, "xAxis");
  return r ? "yAxis" : "xAxis";
}, pT = (e, t) => {
  var r = vy(e);
  return r === "yAxis" ? Cs(e, t) : Es(e, t);
}, mT = (e, t, r) => Mm(e, vy(e), pT(e, t), r), gT = S([dy, mT], (e, t) => {
  var r;
  if (!(e == null || t == null)) {
    var {
      stackId: n
    } = e, i = Iu(e);
    if (!(n == null || i == null)) {
      var a = (r = t[n]) === null || r === void 0 ? void 0 : r.stackedData, o = a?.find((l) => l.key === i);
      if (o != null)
        return o.map((l) => [l[0], l[1]]);
    }
  }
}), yT = S([le, uy, cy, sy, fy, gT, FO, vT, dy, YO], (e, t, r, n, i, a, o, l, u, s) => {
  var {
    chartData: c,
    dataStartIndex: f,
    dataEndIndex: d
  } = o;
  if (!(u == null || e !== "horizontal" && e !== "vertical" || t == null || r == null || n == null || i == null || n.length === 0 || i.length === 0 || l == null)) {
    var {
      data: h
    } = u, p;
    if (h && h.length > 0 ? p = h : p = c?.slice(f, d + 1), p != null)
      return LT({
        layout: e,
        xAxis: t,
        yAxis: r,
        xAxisTicks: n,
        yAxisTicks: i,
        dataStartIndex: f,
        areaSettings: u,
        stackedData: a,
        displayedData: p,
        chartBaseValue: s,
        bandSize: l
      });
  }
}), bT = ["id"], xT = ["activeDot", "animationBegin", "animationDuration", "animationEasing", "connectNulls", "dot", "fill", "fillOpacity", "hide", "isAnimationActive", "legendType", "stroke", "xAxisId", "yAxisId"];
function Er() {
  return Er = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Er.apply(null, arguments);
}
function hy(e, t) {
  if (e == null) return {};
  var r, n, i = wT(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function wT(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Jd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Zr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Jd(Object(r), !0).forEach(function(n) {
      PT(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Jd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function PT(e, t, r) {
  return (t = OT(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function OT(e) {
  var t = AT(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function AT(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ma(e, t) {
  return e && e !== "none" ? e : t;
}
var ST = (e) => {
  var {
    dataKey: t,
    name: r,
    stroke: n,
    fill: i,
    legendType: a,
    hide: o
  } = e;
  return [{
    inactive: o,
    dataKey: t,
    type: a,
    color: Ma(n, i),
    value: Kh(r, t),
    payload: e
  }];
}, _T = /* @__PURE__ */ v.memo((e) => {
  var {
    dataKey: t,
    data: r,
    stroke: n,
    strokeWidth: i,
    fill: a,
    name: o,
    hide: l,
    unit: u,
    tooltipType: s,
    id: c
  } = e, f = {
    dataDefinedOnItem: r,
    getPosition: Rr,
    settings: {
      stroke: n,
      strokeWidth: i,
      fill: a,
      dataKey: t,
      nameKey: void 0,
      name: Kh(o, t),
      hide: l,
      type: s,
      color: Ma(n, a),
      unit: u,
      graphicalItemId: c
    }
  };
  return /* @__PURE__ */ v.createElement(cI, {
    tooltipEntrySettings: f
  });
});
function kT(e) {
  var {
    clipPathId: t,
    points: r,
    props: n
  } = e, {
    needClip: i,
    dot: a,
    dataKey: o
  } = n, l = pt(n);
  return /* @__PURE__ */ v.createElement(MI, {
    points: r,
    dot: a,
    className: "recharts-area-dots",
    dotClassName: "recharts-area-dot",
    dataKey: o,
    baseProps: l,
    needClip: i,
    clipPathId: t
  });
}
function ET(e) {
  var {
    showLabels: t,
    children: r,
    points: n
  } = e, i = n.map((a) => {
    var o, l, u = {
      x: (o = a.x) !== null && o !== void 0 ? o : 0,
      y: (l = a.y) !== null && l !== void 0 ? l : 0,
      width: 0,
      lowerWidth: 0,
      upperWidth: 0,
      height: 0
    };
    return Zr(Zr({}, u), {}, {
      value: a.value,
      payload: a.payload,
      parentViewBox: void 0,
      viewBox: u,
      fill: void 0
    });
  });
  return /* @__PURE__ */ v.createElement(nI, {
    value: t ? i : void 0
  }, r);
}
function ev(e) {
  var {
    points: t,
    baseLine: r,
    needClip: n,
    clipPathId: i,
    props: a
  } = e, {
    layout: o,
    type: l,
    stroke: u,
    connectNulls: s,
    isRange: c
  } = a, {
    id: f
  } = a, d = hy(a, bT), h = pt(d), p = qe(d);
  return /* @__PURE__ */ v.createElement(v.Fragment, null, t?.length > 1 && /* @__PURE__ */ v.createElement(mt, {
    clipPath: n ? "url(#clipPath-".concat(i, ")") : void 0
  }, /* @__PURE__ */ v.createElement(Li, Er({}, p, {
    id: f,
    points: t,
    connectNulls: s,
    type: l,
    baseLine: r,
    layout: o,
    stroke: "none",
    className: "recharts-area-area"
  })), u !== "none" && /* @__PURE__ */ v.createElement(Li, Er({}, h, {
    className: "recharts-area-curve",
    layout: o,
    type: l,
    connectNulls: s,
    fill: "none",
    points: t
  })), u !== "none" && c && Array.isArray(r) && /* @__PURE__ */ v.createElement(Li, Er({}, h, {
    className: "recharts-area-curve",
    layout: o,
    type: l,
    connectNulls: s,
    fill: "none",
    points: r
  }))), /* @__PURE__ */ v.createElement(kT, {
    points: t,
    props: d,
    clipPathId: i
  }));
}
function CT(e) {
  var t, r, {
    alpha: n,
    baseLine: i,
    points: a,
    strokeWidth: o
  } = e, l = (t = a[0]) === null || t === void 0 ? void 0 : t.y, u = (r = a[a.length - 1]) === null || r === void 0 ? void 0 : r.y;
  if (!G(l) || !G(u))
    return null;
  var s = n * Math.abs(l - u), c = Math.max(...a.map((f) => f.x || 0));
  return L(i) ? c = Math.max(i, c) : i && Array.isArray(i) && i.length && (c = Math.max(...i.map((f) => f.x || 0), c)), L(c) ? /* @__PURE__ */ v.createElement("rect", {
    x: 0,
    y: l < u ? l : l - s,
    width: c + (o ? parseInt("".concat(o), 10) : 1),
    height: Math.floor(s)
  }) : null;
}
function jT(e) {
  var t, r, {
    alpha: n,
    baseLine: i,
    points: a,
    strokeWidth: o
  } = e, l = (t = a[0]) === null || t === void 0 ? void 0 : t.x, u = (r = a[a.length - 1]) === null || r === void 0 ? void 0 : r.x;
  if (!G(l) || !G(u))
    return null;
  var s = n * Math.abs(l - u), c = Math.max(...a.map((f) => f.y || 0));
  return L(i) ? c = Math.max(i, c) : i && Array.isArray(i) && i.length && (c = Math.max(...i.map((f) => f.y || 0), c)), L(c) ? /* @__PURE__ */ v.createElement("rect", {
    x: l < u ? l : l - s,
    y: 0,
    width: s,
    height: Math.floor(c + (o ? parseInt("".concat(o), 10) : 1))
  }) : null;
}
function IT(e) {
  var {
    alpha: t,
    layout: r,
    points: n,
    baseLine: i,
    strokeWidth: a
  } = e;
  return r === "vertical" ? /* @__PURE__ */ v.createElement(CT, {
    alpha: t,
    points: n,
    baseLine: i,
    strokeWidth: a
  }) : /* @__PURE__ */ v.createElement(jT, {
    alpha: t,
    points: n,
    baseLine: i,
    strokeWidth: a
  });
}
function MT(e) {
  var {
    needClip: t,
    clipPathId: r,
    props: n,
    previousPointsRef: i,
    previousBaselineRef: a
  } = e, {
    points: o,
    baseLine: l,
    isAnimationActive: u,
    animationBegin: s,
    animationDuration: c,
    animationEasing: f,
    onAnimationStart: d,
    onAnimationEnd: h
  } = n, p = v.useMemo(() => ({
    points: o,
    baseLine: l
  }), [o, l]), g = dp(p, "recharts-area-"), m = bu(), [y, x] = v.useState(!1), b = !y, w = v.useCallback(() => {
    typeof h == "function" && h(), x(!1);
  }, [h]), O = v.useCallback(() => {
    typeof d == "function" && d(), x(!0);
  }, [d]);
  if (m == null)
    return null;
  var P = i.current, _ = a.current;
  return /* @__PURE__ */ v.createElement(ET, {
    showLabels: b,
    points: o
  }, n.children, /* @__PURE__ */ v.createElement(fp, {
    animationId: g,
    begin: s,
    duration: c,
    isActive: u,
    easing: f,
    onAnimationEnd: w,
    onAnimationStart: O,
    key: g
  }, (A) => {
    if (P) {
      var C = P.length / o.length, T = (
        /*
         * Here it is important that at the very end of the animation, on the last frame,
         * we render the original points without any interpolation.
         * This is needed because the code above is checking for reference equality to decide if the animation should run
         * and if we create a new array instance (even if the numbers were the same)
         * then we would break animations.
         */
        A === 1 ? o : o.map((k, B) => {
          var F = Math.floor(B * C);
          if (P[F]) {
            var U = P[F];
            return Zr(Zr({}, k), {}, {
              x: Ot(U.x, k.x, A),
              y: Ot(U.y, k.y, A)
            });
          }
          return k;
        })
      ), I;
      return L(l) ? I = Ot(_, l, A) : Ie(l) || Et(l) ? I = Ot(_, 0, A) : I = l.map((k, B) => {
        var F = Math.floor(B * C);
        if (Array.isArray(_) && _[F]) {
          var U = _[F];
          return Zr(Zr({}, k), {}, {
            x: Ot(U.x, k.x, A),
            y: Ot(U.y, k.y, A)
          });
        }
        return k;
      }), A > 0 && (i.current = T, a.current = I), /* @__PURE__ */ v.createElement(ev, {
        points: T,
        baseLine: I,
        needClip: t,
        clipPathId: r,
        props: n
      });
    }
    return A > 0 && (i.current = o, a.current = l), /* @__PURE__ */ v.createElement(mt, null, u && /* @__PURE__ */ v.createElement("defs", null, /* @__PURE__ */ v.createElement("clipPath", {
      id: "animationClipPath-".concat(r)
    }, /* @__PURE__ */ v.createElement(IT, {
      alpha: A,
      points: o,
      baseLine: l,
      layout: m,
      strokeWidth: n.strokeWidth
    }))), /* @__PURE__ */ v.createElement(mt, {
      clipPath: "url(#animationClipPath-".concat(r, ")")
    }, /* @__PURE__ */ v.createElement(ev, {
      points: o,
      baseLine: l,
      needClip: t,
      clipPathId: r,
      props: n
    })));
  }), /* @__PURE__ */ v.createElement(oI, {
    label: n.label
  }));
}
function TT(e) {
  var {
    needClip: t,
    clipPathId: r,
    props: n
  } = e, i = v.useRef(null), a = v.useRef();
  return /* @__PURE__ */ v.createElement(MT, {
    needClip: t,
    clipPathId: r,
    props: n,
    previousPointsRef: i,
    previousBaselineRef: a
  });
}
class DT extends v.PureComponent {
  render() {
    var {
      hide: t,
      dot: r,
      points: n,
      className: i,
      top: a,
      left: o,
      needClip: l,
      xAxisId: u,
      yAxisId: s,
      width: c,
      height: f,
      id: d,
      baseLine: h,
      zIndex: p
    } = this.props;
    if (t)
      return null;
    var g = J("recharts-area", i), m = d, {
      r: y,
      strokeWidth: x
    } = dT(r), b = Yg(r), w = y * 2 + x, O = l ? "url(#clipPath-".concat(b ? "" : "dots-").concat(m, ")") : void 0;
    return /* @__PURE__ */ v.createElement(Mt, {
      zIndex: p
    }, /* @__PURE__ */ v.createElement(mt, {
      className: g
    }, l && /* @__PURE__ */ v.createElement("defs", null, /* @__PURE__ */ v.createElement(fT, {
      clipPathId: m,
      xAxisId: u,
      yAxisId: s
    }), !b && /* @__PURE__ */ v.createElement("clipPath", {
      id: "clipPath-dots-".concat(m)
    }, /* @__PURE__ */ v.createElement("rect", {
      x: o - w / 2,
      y: a - w / 2,
      width: c + w,
      height: f + w
    }))), /* @__PURE__ */ v.createElement(TT, {
      needClip: l,
      clipPathId: m,
      props: this.props
    })), /* @__PURE__ */ v.createElement(Gd, {
      points: n,
      mainColor: Ma(this.props.stroke, this.props.fill),
      itemDataKey: this.props.dataKey,
      activeDot: this.props.activeDot,
      clipPath: O
    }), this.props.isRange && Array.isArray(h) && /* @__PURE__ */ v.createElement(Gd, {
      points: h,
      mainColor: Ma(this.props.stroke, this.props.fill),
      itemDataKey: this.props.dataKey,
      activeDot: this.props.activeDot,
      clipPath: O
    }));
  }
}
var NT = {
  activeDot: !0,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  connectNulls: !1,
  dot: !1,
  fill: "#3182bd",
  fillOpacity: 0.6,
  hide: !1,
  isAnimationActive: "auto",
  legendType: "line",
  stroke: "#3182bd",
  strokeWidth: 1,
  type: "linear",
  label: !1,
  xAxisId: 0,
  yAxisId: 0,
  zIndex: Ne.area
};
function $T(e) {
  var t, {
    activeDot: r,
    animationBegin: n,
    animationDuration: i,
    animationEasing: a,
    connectNulls: o,
    dot: l,
    fill: u,
    fillOpacity: s,
    hide: c,
    isAnimationActive: f,
    legendType: d,
    stroke: h,
    xAxisId: p,
    yAxisId: g
  } = e, m = hy(e, xT), y = sn(), x = Og(), {
    needClip: b
  } = ly(p, g), w = Fe(), {
    points: O,
    isRange: P,
    baseLine: _
  } = (t = z((B) => yT(B, e.id, w))) !== null && t !== void 0 ? t : {}, A = Ss();
  if (y !== "horizontal" && y !== "vertical" || A == null || x !== "AreaChart" && x !== "ComposedChart")
    return null;
  var {
    height: C,
    width: T,
    x: I,
    y: k
  } = A;
  return !O || !O.length ? null : /* @__PURE__ */ v.createElement(DT, Er({}, m, {
    activeDot: r,
    animationBegin: n,
    animationDuration: i,
    animationEasing: a,
    baseLine: _,
    connectNulls: o,
    dot: l,
    fill: u,
    fillOpacity: s,
    height: C,
    hide: c,
    layout: y,
    isAnimationActive: f,
    isRange: P,
    legendType: d,
    needClip: b,
    points: O,
    stroke: h,
    width: T,
    left: I,
    top: k,
    xAxisId: p,
    yAxisId: g
  }));
}
var RT = (e, t, r, n, i) => {
  var a = r ?? t;
  if (L(a))
    return a;
  var o = e === "horizontal" ? i : n, l = o.scale.domain();
  if (o.type === "number") {
    var u = Math.max(l[0], l[1]), s = Math.min(l[0], l[1]);
    return a === "dataMin" ? s : a === "dataMax" || u < 0 ? u : Math.max(Math.min(l[0], l[1]), 0);
  }
  return a === "dataMin" ? l[0] : a === "dataMax" ? l[1] : l[0];
};
function LT(e) {
  var {
    areaSettings: {
      connectNulls: t,
      baseValue: r,
      dataKey: n
    },
    stackedData: i,
    layout: a,
    chartBaseValue: o,
    xAxis: l,
    yAxis: u,
    displayedData: s,
    dataStartIndex: c,
    xAxisTicks: f,
    yAxisTicks: d,
    bandSize: h
  } = e, p = i && i.length, g = RT(a, o, r, l, u), m = a === "horizontal", y = !1, x = s.map((w, O) => {
    var P, _, A, C;
    if (p)
      C = i[c + O];
    else {
      var T = je(w, n);
      Array.isArray(T) ? (C = T, y = !0) : C = [g, T];
    }
    var I = (P = (_ = C) === null || _ === void 0 ? void 0 : _[1]) !== null && P !== void 0 ? P : null, k = I == null || p && !t && je(w, n) == null;
    if (m) {
      var B;
      return {
        x: fc({
          axis: l,
          ticks: f,
          bandSize: h,
          entry: w,
          index: O
        }),
        y: k ? null : (B = u.scale.map(I)) !== null && B !== void 0 ? B : null,
        value: C,
        payload: w
      };
    }
    return {
      x: k ? null : (A = l.scale.map(I)) !== null && A !== void 0 ? A : null,
      y: fc({
        axis: u,
        ticks: d,
        bandSize: h,
        entry: w,
        index: O
      }),
      value: C,
      payload: w
    };
  }), b;
  return p || y ? b = x.map((w) => {
    var O, P = Array.isArray(w.value) ? w.value[0] : null;
    if (m) {
      var _;
      return {
        x: w.x,
        y: P != null && w.y != null && (_ = u.scale.map(P)) !== null && _ !== void 0 ? _ : null,
        payload: w.payload
      };
    }
    return {
      x: P != null && (O = l.scale.map(P)) !== null && O !== void 0 ? O : null,
      y: w.y,
      payload: w.payload
    };
  }) : b = m ? u.scale.map(g) : l.scale.map(g), {
    points: x,
    baseLine: b ?? 0,
    isRange: y
  };
}
function zT(e) {
  var t = Be(e, NT), r = Fe();
  return /* @__PURE__ */ v.createElement(mI, {
    id: t.id,
    type: "area"
  }, (n) => /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ v.createElement(fI, {
    legendPayload: ST(t)
  }), /* @__PURE__ */ v.createElement(_T, {
    dataKey: t.dataKey,
    data: t.data,
    stroke: t.stroke,
    strokeWidth: t.strokeWidth,
    fill: t.fill,
    name: t.name,
    hide: t.hide,
    unit: t.unit,
    tooltipType: t.tooltipType,
    id: n
  }), /* @__PURE__ */ v.createElement(OI, {
    type: "area",
    id: n,
    data: t.data,
    dataKey: t.dataKey,
    xAxisId: t.xAxisId,
    yAxisId: t.yAxisId,
    zAxisId: 0,
    stackId: Rw(t.stackId),
    hide: t.hide,
    barSize: void 0,
    baseValue: t.baseValue,
    isPanorama: r,
    connectNulls: t.connectNulls
  }), /* @__PURE__ */ v.createElement($T, Er({}, t, {
    id: n
  }))));
}
var py = /* @__PURE__ */ v.memo(zT, ni);
py.displayName = "Area";
var BT = ["domain", "range"], FT = ["domain", "range"];
function tv(e, t) {
  if (e == null) return {};
  var r, n, i = WT(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function WT(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function rv(e, t) {
  return e === t ? !0 : Array.isArray(e) && e.length === 2 && Array.isArray(t) && t.length === 2 ? e[0] === t[0] && e[1] === t[1] : !1;
}
function my(e, t) {
  if (e === t)
    return !0;
  var {
    domain: r,
    range: n
  } = e, i = tv(e, BT), {
    domain: a,
    range: o
  } = t, l = tv(t, FT);
  return !rv(r, a) || !rv(n, o) ? !1 : ni(i, l);
}
var UT = ["type"], KT = ["dangerouslySetInnerHTML", "ticks", "scale"], HT = ["id", "scale"];
function Kl() {
  return Kl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Kl.apply(null, arguments);
}
function nv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function iv(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? nv(Object(r), !0).forEach(function(n) {
      GT(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : nv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function GT(e, t, r) {
  return (t = qT(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function qT(e) {
  var t = YT(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function YT(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Hl(e, t) {
  if (e == null) return {};
  var r, n, i = VT(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function VT(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function XT(e) {
  var t = ue(), r = v.useRef(null), n = bu(), {
    type: i
  } = e, a = Hl(e, UT), o = oo(n, "xAxis", i), l = v.useMemo(() => {
    if (o != null)
      return iv(iv({}, a), {}, {
        type: o
      });
  }, [a, o]);
  return v.useLayoutEffect(() => {
    l != null && (r.current === null ? t(RI(l)) : r.current !== l && t(LI({
      prev: r.current,
      next: l
    })), r.current = l);
  }, [l, t]), v.useLayoutEffect(() => () => {
    r.current && (t(zI(r.current)), r.current = null);
  }, [t]), null;
}
var ZT = (e) => {
  var {
    xAxisId: t,
    className: r
  } = e, n = z(Gh), i = Fe(), a = "xAxis", o = z((y) => Jm(y, a, t, i)), l = z((y) => Ok(y, t)), u = z((y) => Ck(y, t)), s = z((y) => bm(y, t));
  if (l == null || u == null || s == null)
    return null;
  var {
    dangerouslySetInnerHTML: c,
    ticks: f,
    scale: d
  } = e, h = Hl(e, KT), {
    id: p,
    scale: g
  } = s, m = Hl(s, HT);
  return /* @__PURE__ */ v.createElement(ks, Kl({}, h, m, {
    x: u.x,
    y: u.y,
    width: l.width,
    height: l.height,
    className: J("recharts-".concat(a, " ").concat(a), r),
    viewBox: n,
    ticks: o,
    axisType: a,
    axisId: t
  }));
}, QT = {
  allowDataOverflow: he.allowDataOverflow,
  allowDecimals: he.allowDecimals,
  allowDuplicatedCategory: he.allowDuplicatedCategory,
  angle: he.angle,
  axisLine: Bt.axisLine,
  height: he.height,
  hide: !1,
  includeHidden: he.includeHidden,
  interval: he.interval,
  label: !1,
  minTickGap: he.minTickGap,
  mirror: he.mirror,
  orientation: he.orientation,
  padding: he.padding,
  reversed: he.reversed,
  scale: he.scale,
  tick: he.tick,
  tickCount: he.tickCount,
  tickLine: Bt.tickLine,
  tickSize: Bt.tickSize,
  type: he.type,
  niceTicks: he.niceTicks,
  xAxisId: 0
}, JT = (e) => {
  var t = Be(e, QT);
  return /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ v.createElement(XT, {
    allowDataOverflow: t.allowDataOverflow,
    allowDecimals: t.allowDecimals,
    allowDuplicatedCategory: t.allowDuplicatedCategory,
    angle: t.angle,
    dataKey: t.dataKey,
    domain: t.domain,
    height: t.height,
    hide: t.hide,
    id: t.xAxisId,
    includeHidden: t.includeHidden,
    interval: t.interval,
    minTickGap: t.minTickGap,
    mirror: t.mirror,
    name: t.name,
    orientation: t.orientation,
    padding: t.padding,
    reversed: t.reversed,
    scale: t.scale,
    tick: t.tick,
    tickCount: t.tickCount,
    tickFormatter: t.tickFormatter,
    ticks: t.ticks,
    type: t.type,
    unit: t.unit,
    niceTicks: t.niceTicks
  }), /* @__PURE__ */ v.createElement(ZT, t));
}, gy = /* @__PURE__ */ v.memo(JT, my);
gy.displayName = "XAxis";
var eD = ["type"], tD = ["dangerouslySetInnerHTML", "ticks", "scale"], rD = ["id", "scale"];
function Gl() {
  return Gl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Gl.apply(null, arguments);
}
function av(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ov(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? av(Object(r), !0).forEach(function(n) {
      nD(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : av(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function nD(e, t, r) {
  return (t = iD(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function iD(e) {
  var t = aD(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function aD(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ql(e, t) {
  if (e == null) return {};
  var r, n, i = oD(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function oD(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function lD(e) {
  var t = ue(), r = v.useRef(null), n = bu(), {
    type: i
  } = e, a = ql(e, eD), o = oo(n, "yAxis", i), l = v.useMemo(() => {
    if (o != null)
      return ov(ov({}, a), {}, {
        type: o
      });
  }, [o, a]);
  return v.useLayoutEffect(() => {
    l != null && (r.current === null ? t(BI(l)) : r.current !== l && t(FI({
      prev: r.current,
      next: l
    })), r.current = l);
  }, [l, t]), v.useLayoutEffect(() => () => {
    r.current && (t(WI(r.current)), r.current = null);
  }, [t]), null;
}
function uD(e) {
  var {
    yAxisId: t,
    className: r,
    width: n,
    label: i
  } = e, a = v.useRef(null), o = v.useRef(null), l = z(Gh), u = Fe(), s = ue(), c = "yAxis", f = z((P) => Mk(P, t)), d = z((P) => Ik(P, t)), h = z((P) => Jm(P, c, t, u)), p = z((P) => xm(P, t));
  if (v.useLayoutEffect(() => {
    if (!(n !== "auto" || !f || As(i) || /* @__PURE__ */ v.isValidElement(i) || p == null)) {
      var P = a.current;
      if (P) {
        var _ = P.getCalculatedWidth();
        Math.round(f.width) !== Math.round(_) && s(UI({
          id: t,
          width: _
        }));
      }
    }
  }, [
    // The dependency on cartesianAxisRef.current is not needed because useLayoutEffect will run after every render.
    // The ref will be populated by then.
    // To re-run this effect when ticks change, we can depend on the ticks array from the store.
    h,
    f,
    s,
    i,
    t,
    n,
    p
  ]), f == null || d == null || p == null)
    return null;
  var {
    dangerouslySetInnerHTML: g,
    ticks: m,
    scale: y
  } = e, x = ql(e, tD), {
    id: b,
    scale: w
  } = p, O = ql(p, rD);
  return /* @__PURE__ */ v.createElement(ks, Gl({}, x, O, {
    ref: a,
    labelRef: o,
    x: d.x,
    y: d.y,
    tickTextProps: n === "auto" ? {
      width: void 0
    } : {
      width: n
    },
    width: f.width,
    height: f.height,
    className: J("recharts-".concat(c, " ").concat(c), r),
    viewBox: l,
    ticks: h,
    axisType: c,
    axisId: t
  }));
}
var sD = {
  allowDataOverflow: pe.allowDataOverflow,
  allowDecimals: pe.allowDecimals,
  allowDuplicatedCategory: pe.allowDuplicatedCategory,
  angle: pe.angle,
  axisLine: Bt.axisLine,
  hide: !1,
  includeHidden: pe.includeHidden,
  interval: pe.interval,
  label: !1,
  minTickGap: pe.minTickGap,
  mirror: pe.mirror,
  orientation: pe.orientation,
  padding: pe.padding,
  reversed: pe.reversed,
  scale: pe.scale,
  tick: pe.tick,
  tickCount: pe.tickCount,
  tickLine: Bt.tickLine,
  tickSize: Bt.tickSize,
  type: pe.type,
  niceTicks: pe.niceTicks,
  width: pe.width,
  yAxisId: 0
}, cD = (e) => {
  var t = Be(e, sD);
  return /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ v.createElement(lD, {
    interval: t.interval,
    id: t.yAxisId,
    scale: t.scale,
    type: t.type,
    domain: t.domain,
    allowDataOverflow: t.allowDataOverflow,
    dataKey: t.dataKey,
    allowDuplicatedCategory: t.allowDuplicatedCategory,
    allowDecimals: t.allowDecimals,
    tickCount: t.tickCount,
    padding: t.padding,
    includeHidden: t.includeHidden,
    reversed: t.reversed,
    ticks: t.ticks,
    width: t.width,
    orientation: t.orientation,
    mirror: t.mirror,
    hide: t.hide,
    unit: t.unit,
    name: t.name,
    angle: t.angle,
    minTickGap: t.minTickGap,
    tick: t.tick,
    tickFormatter: t.tickFormatter,
    niceTicks: t.niceTicks
  }), /* @__PURE__ */ v.createElement(uD, t));
}, yy = /* @__PURE__ */ v.memo(cD, my);
yy.displayName = "YAxis";
var fD = (e, t) => t, js = S([fD, le, $p, Oe, gg, Qt, eC, Me], lC);
function dD(e) {
  return "getBBox" in e.currentTarget && typeof e.currentTarget.getBBox == "function";
}
function Is(e) {
  var t = e.currentTarget.getBoundingClientRect(), r, n;
  if (dD(e)) {
    var i = e.currentTarget.getBBox();
    r = i.width > 0 ? t.width / i.width : 1, n = i.height > 0 ? t.height / i.height : 1;
  } else {
    var a = e.currentTarget;
    r = a.offsetWidth > 0 ? t.width / a.offsetWidth : 1, n = a.offsetHeight > 0 ? t.height / a.offsetHeight : 1;
  }
  var o = (l, u) => ({
    /*
     * Here it's important to use:
     * - event.clientX and event.clientY to get the mouse position relative to the viewport, including scroll.
     * - pageX and pageY are not used because they are relative to the whole document, and ignore scroll.
     * - rect.left and rect.top are used to get the position of the chart relative to the viewport.
     * - offsetX and offsetY are not used because they are relative to the offset parent
     *  which may or may not be the same as the clientX and clientY, depending on the position of the chart in the DOM
     *  and surrounding element styles. CSS position: relative, absolute, fixed, will change the offset parent.
     * - scaleX and scaleY are necessary for when the chart element is scaled using CSS `transform: scale(N)`.
     */
    relativeX: Math.round((l - t.left) / r),
    relativeY: Math.round((u - t.top) / n)
  });
  return "touches" in e ? Array.from(e.touches).map((l) => o(l.clientX, l.clientY)) : o(e.clientX, e.clientY);
}
var by = Je("mouseClick"), xy = Jn();
xy.startListening({
  actionCreator: by,
  effect: (e, t) => {
    var r = e.payload, n = js(t.getState(), Is(r));
    n?.activeIndex != null && t.dispatch(qk({
      activeIndex: n.activeIndex,
      activeDataKey: void 0,
      activeCoordinate: n.activeCoordinate
    }));
  }
});
var Yl = Je("mouseMove"), wy = Jn(), Gr = null, vr = null, Yo = null;
wy.startListening({
  actionCreator: Yl,
  effect: (e, t) => {
    var r = e.payload, n = t.getState(), {
      throttleDelay: i,
      throttledEvents: a
    } = n.eventSettings, o = a === "all" || a?.includes("mousemove");
    Gr !== null && (cancelAnimationFrame(Gr), Gr = null), vr !== null && (typeof i != "number" || !o) && (clearTimeout(vr), vr = null), Yo = Is(r);
    var l = () => {
      var u = t.getState(), s = vs(u, u.tooltip.settings.shared);
      if (!Yo) {
        Gr = null, vr = null;
        return;
      }
      if (s === "axis") {
        var c = js(u, Yo);
        c?.activeIndex != null ? t.dispatch(ug({
          activeIndex: c.activeIndex,
          activeDataKey: void 0,
          activeCoordinate: c.activeCoordinate
        })) : t.dispatch(lg());
      }
      Gr = null, vr = null;
    };
    if (!o) {
      l();
      return;
    }
    i === "raf" ? Gr = requestAnimationFrame(l) : typeof i == "number" && vr === null && (vr = setTimeout(l, i));
  }
});
function vD(e, t) {
  return t instanceof HTMLElement ? "HTMLElement <".concat(t.tagName, ' class="').concat(t.className, '">') : t === window ? "global.window" : e === "children" && typeof t == "object" && t !== null ? "<<CHILDREN>>" : t;
}
var lv = {
  accessibilityLayer: !0,
  barCategoryGap: "10%",
  barGap: 4,
  barSize: void 0,
  className: void 0,
  maxBarSize: void 0,
  stackOffset: "none",
  syncId: void 0,
  syncMethod: "index",
  baseValue: void 0,
  reverseStackOrder: !1
}, Py = Re({
  name: "rootProps",
  initialState: lv,
  reducers: {
    updateOptions: (e, t) => {
      var r;
      e.accessibilityLayer = t.payload.accessibilityLayer, e.barCategoryGap = t.payload.barCategoryGap, e.barGap = (r = t.payload.barGap) !== null && r !== void 0 ? r : lv.barGap, e.barSize = t.payload.barSize, e.maxBarSize = t.payload.maxBarSize, e.stackOffset = t.payload.stackOffset, e.syncId = t.payload.syncId, e.syncMethod = t.payload.syncMethod, e.className = t.payload.className, e.baseValue = t.payload.baseValue, e.reverseStackOrder = t.payload.reverseStackOrder;
    }
  }
}), hD = Py.reducer, {
  updateOptions: pD
} = Py.actions, mD = null, gD = {
  updatePolarOptions: (e, t) => e === null ? t.payload : (e.startAngle = t.payload.startAngle, e.endAngle = t.payload.endAngle, e.cx = t.payload.cx, e.cy = t.payload.cy, e.innerRadius = t.payload.innerRadius, e.outerRadius = t.payload.outerRadius, e)
}, Oy = Re({
  name: "polarOptions",
  initialState: mD,
  reducers: gD
}), {
  updatePolarOptions: I2
} = Oy.actions, yD = Oy.reducer, Ay = Je("keyDown"), Sy = Je("focus"), _y = Je("blur"), xo = Jn(), qr = null, hr = null, ji = null;
xo.startListening({
  actionCreator: Ay,
  effect: (e, t) => {
    ji = e.payload, qr !== null && (cancelAnimationFrame(qr), qr = null);
    var r = t.getState(), {
      throttleDelay: n,
      throttledEvents: i
    } = r.eventSettings, a = i === "all" || i.includes("keydown");
    hr !== null && (typeof n != "number" || !a) && (clearTimeout(hr), hr = null);
    var o = () => {
      try {
        var l = t.getState(), u = l.rootProps.accessibilityLayer !== !1;
        if (!u)
          return;
        var {
          keyboardInteraction: s
        } = l.tooltip, c = ji;
        if (c !== "ArrowRight" && c !== "ArrowLeft" && c !== "Enter")
          return;
        var f = hs(s, yn(l), di(l), hi(l)), d = f == null ? -1 : Number(f);
        if (!Number.isFinite(d) || d < 0)
          return;
        var h = Qt(l);
        if (c === "Enter") {
          var p = ka(l, "axis", "hover", String(s.index));
          t.dispatch(_a({
            active: !s.active,
            activeIndex: s.index,
            activeCoordinate: p
          }));
          return;
        }
        var g = Rk(l), m = g === "left-to-right" ? 1 : -1, y = c === "ArrowRight" ? 1 : -1, x = d + y * m;
        if (h == null || x >= h.length || x < 0)
          return;
        var b = ka(l, "axis", "hover", String(x));
        t.dispatch(_a({
          active: !0,
          activeIndex: x.toString(),
          activeCoordinate: b
        }));
      } finally {
        qr = null, hr = null;
      }
    };
    if (!a) {
      o();
      return;
    }
    n === "raf" ? qr = requestAnimationFrame(o) : typeof n == "number" && hr === null && (o(), ji = null, hr = setTimeout(() => {
      ji ? o() : (hr = null, qr = null);
    }, n));
  }
});
xo.startListening({
  actionCreator: Sy,
  effect: (e, t) => {
    var r = t.getState(), n = r.rootProps.accessibilityLayer !== !1;
    if (n) {
      var {
        keyboardInteraction: i
      } = r.tooltip;
      if (!i.active && i.index == null) {
        var a = "0", o = ka(r, "axis", "hover", String(a));
        t.dispatch(_a({
          active: !0,
          activeIndex: a,
          activeCoordinate: o
        }));
      }
    }
  }
});
xo.startListening({
  actionCreator: _y,
  effect: (e, t) => {
    var r = t.getState(), n = r.rootProps.accessibilityLayer !== !1;
    if (n) {
      var {
        keyboardInteraction: i
      } = r.tooltip;
      i.active && t.dispatch(_a({
        active: !1,
        activeIndex: i.index,
        activeCoordinate: i.coordinate
      }));
    }
  }
});
function ky(e) {
  e.persist();
  var {
    currentTarget: t
  } = e;
  return new Proxy(e, {
    get: (r, n) => {
      if (n === "currentTarget")
        return t;
      var i = Reflect.get(r, n);
      return typeof i == "function" ? i.bind(r) : i;
    }
  });
}
var nt = Je("externalEvent"), Ey = Jn(), Ii = /* @__PURE__ */ new Map(), kn = /* @__PURE__ */ new Map(), Vo = /* @__PURE__ */ new Map();
Ey.startListening({
  actionCreator: nt,
  effect: (e, t) => {
    var {
      handler: r,
      reactEvent: n
    } = e.payload;
    if (r != null) {
      var i = n.type, a = ky(n);
      Vo.set(i, {
        handler: r,
        reactEvent: a
      });
      var o = Ii.get(i);
      o !== void 0 && (cancelAnimationFrame(o), Ii.delete(i));
      var l = t.getState(), {
        throttleDelay: u,
        throttledEvents: s
      } = l.eventSettings, c = s, f = c === "all" || c?.includes(i), d = kn.get(i);
      d !== void 0 && (typeof u != "number" || !f) && (clearTimeout(d), kn.delete(i));
      var h = () => {
        var m = Vo.get(i);
        try {
          if (!m)
            return;
          var {
            handler: y,
            reactEvent: x
          } = m, b = t.getState(), w = {
            activeCoordinate: zE(b),
            activeDataKey: $E(b),
            activeIndex: Yn(b),
            activeLabel: xg(b),
            activeTooltipIndex: Yn(b),
            isTooltipActive: BE(b)
          };
          y && y(w, x);
        } finally {
          Ii.delete(i), kn.delete(i), Vo.delete(i);
        }
      };
      if (!f) {
        h();
        return;
      }
      if (u === "raf") {
        var p = requestAnimationFrame(h);
        Ii.set(i, p);
      } else if (typeof u == "number") {
        if (!kn.has(i)) {
          h();
          var g = setTimeout(h, u);
          kn.set(i, g);
        }
      } else
        h();
    }
  }
});
var bD = S([mn], (e) => e.tooltipItemPayloads), xD = S([bD, (e, t) => t, (e, t, r) => r], (e, t, r) => {
  if (t != null) {
    var n = e.find((a) => a.settings.graphicalItemId === r);
    if (n != null) {
      var {
        getPosition: i
      } = n;
      if (i != null)
        return i(t);
    }
  }
}), Cy = Je("touchMove"), jy = Jn(), pr = null, Jt = null, uv = null, En = null;
jy.startListening({
  actionCreator: Cy,
  effect: (e, t) => {
    var r = e.payload;
    if (!(r.touches == null || r.touches.length === 0)) {
      En = ky(r);
      var n = t.getState(), {
        throttleDelay: i,
        throttledEvents: a
      } = n.eventSettings, o = a === "all" || a.includes("touchmove");
      pr !== null && (cancelAnimationFrame(pr), pr = null), Jt !== null && (typeof i != "number" || !o) && (clearTimeout(Jt), Jt = null), uv = Array.from(r.touches).map((u) => Is({
        clientX: u.clientX,
        clientY: u.clientY,
        currentTarget: r.currentTarget
      }));
      var l = () => {
        if (En != null) {
          var u = t.getState(), s = vs(u, u.tooltip.settings.shared);
          if (s === "axis") {
            var c, f = (c = uv) === null || c === void 0 ? void 0 : c[0];
            if (f == null) {
              pr = null, Jt = null;
              return;
            }
            var d = js(u, f);
            d?.activeIndex != null && t.dispatch(ug({
              activeIndex: d.activeIndex,
              activeDataKey: void 0,
              activeCoordinate: d.activeCoordinate
            }));
          } else if (s === "item") {
            var h, p = En.touches[0];
            if (document.elementFromPoint == null || p == null)
              return;
            var g = document.elementFromPoint(p.clientX, p.clientY);
            if (!g || !g.getAttribute)
              return;
            var m = g.getAttribute(Kw), y = (h = g.getAttribute(Hw)) !== null && h !== void 0 ? h : void 0, x = gn(u).find((O) => O.id === y);
            if (m == null || x == null || y == null)
              return;
            var {
              dataKey: b
            } = x, w = xD(u, m, y);
            t.dispatch(Gk({
              activeDataKey: b,
              activeIndex: m,
              activeCoordinate: w,
              activeGraphicalItemId: y
            }));
          }
          pr = null, Jt = null;
        }
      };
      if (!o) {
        l();
        return;
      }
      i === "raf" ? pr = requestAnimationFrame(l) : typeof i == "number" && Jt === null && (l(), En = null, Jt = setTimeout(() => {
        En ? l() : (Jt = null, pr = null);
      }, i));
    }
  }
});
var Iy = {
  throttleDelay: "raf",
  throttledEvents: ["mousemove", "touchmove", "pointermove", "scroll", "wheel"]
}, My = Re({
  name: "eventSettings",
  initialState: Iy,
  reducers: {
    setEventSettings: (e, t) => {
      t.payload.throttleDelay != null && (e.throttleDelay = t.payload.throttleDelay), t.payload.throttledEvents != null && (e.throttledEvents = t.payload.throttledEvents);
    }
  }
}), {
  setEventSettings: wD
} = My.actions, PD = My.reducer, OD = vh({
  brush: JI,
  cartesianAxis: KI,
  chartData: zC,
  errorBars: cT,
  eventSettings: PD,
  graphicalItems: wI,
  layout: Ew,
  legend: $1,
  options: DC,
  polarAxis: uI,
  polarOptions: yD,
  referenceElements: oM,
  renderedTicks: MM,
  rootProps: hD,
  tooltip: Yk,
  zIndex: wC
}), AD = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Chart";
  return Jx({
    reducer: OD,
    // redux-toolkit v1 types are unhappy with the preloadedState type. Remove the `as any` when bumping to v2
    preloadedState: t,
    // @ts-expect-error redux-toolkit v1 types are unhappy with the middleware array. Remove this comment when bumping to v2
    middleware: (n) => {
      var i;
      return n({
        serializableCheck: !1,
        immutableCheck: !["commonjs", "es6", "production"].includes((i = "es6") !== null && i !== void 0 ? i : "")
      }).concat([xy.middleware, wy.middleware, xo.middleware, Ey.middleware, jy.middleware]);
    },
    /*
     * I can't find out how to satisfy typescript here.
     * We return `EnhancerArray<[StoreEnhancer<{}, {}>, StoreEnhancer]>` from this function,
     * but the types say we should return `EnhancerArray<StoreEnhancer<{}, {}>`.
     * Looks like it's badly inferred generics, but it won't allow me to provide the correct type manually either.
     * So let's just ignore the error for now.
     */
    // @ts-expect-error mismatched generics
    enhancers: (n) => {
      var i = n;
      return typeof n == "function" && (i = n()), i.concat(Eh({
        type: "raf"
      }));
    },
    devTools: {
      serialize: {
        replacer: vD
      },
      name: "recharts-".concat(r)
    }
  });
};
function SD(e) {
  var {
    preloadedState: t,
    children: r,
    reduxStoreName: n
  } = e, i = Fe(), a = v.useRef(null);
  if (i)
    return r;
  a.current == null && (a.current = AD(t, n));
  var o = uu;
  return /* @__PURE__ */ v.createElement(eP, {
    context: o,
    store: a.current
  }, r);
}
function _D(e) {
  var {
    layout: t,
    margin: r
  } = e, n = ue(), i = Fe();
  return v.useEffect(() => {
    i || (n(Sw(t)), n(Aw(r)));
  }, [n, i, t, r]), null;
}
var kD = /* @__PURE__ */ v.memo(_D, ni);
function ED(e) {
  var t = ue();
  return v.useEffect(() => {
    t(pD(e));
  }, [t, e]), null;
}
var CD = (e) => {
  var t = ue();
  return v.useEffect(() => {
    t(wD(e));
  }, [t, e]), null;
}, jD = /* @__PURE__ */ v.memo(CD, ni);
function sv(e) {
  var {
    zIndex: t,
    isPanorama: r
  } = e, n = v.useRef(null), i = ue();
  return v.useLayoutEffect(() => (n.current && i(bC({
    zIndex: t,
    element: n.current,
    isPanorama: r
  })), () => {
    i(xC({
      zIndex: t,
      isPanorama: r
    }));
  }), [i, t, r]), /* @__PURE__ */ v.createElement("g", {
    tabIndex: -1,
    ref: n,
    className: "recharts-zIndex-layer_".concat(t)
  });
}
function cv(e) {
  var {
    children: t,
    isPanorama: r
  } = e, n = z(sC);
  if (!n || n.length === 0)
    return t;
  var i = n.filter((o) => o < 0), a = n.filter((o) => o > 0);
  return /* @__PURE__ */ v.createElement(v.Fragment, null, i.map((o) => /* @__PURE__ */ v.createElement(sv, {
    key: o,
    zIndex: o,
    isPanorama: r
  })), t, a.map((o) => /* @__PURE__ */ v.createElement(sv, {
    key: o,
    zIndex: o,
    isPanorama: r
  })));
}
var ID = ["children"];
function MD(e, t) {
  if (e == null) return {};
  var r, n, i = TD(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function TD(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Ta() {
  return Ta = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ta.apply(null, arguments);
}
var DD = {
  width: "100%",
  height: "100%",
  /*
   * display: block is necessary here because the default for an SVG is display: inline,
   * which in some browsers (Chrome) adds a little bit of extra space above and below the SVG
   * to make space for the descender of letters like "g" and "y". This throws off the height calculation
   * and causes the container to grow indefinitely on each render with responsive=true.
   * Display: block removes that extra space.
   *
   * Interestingly, Firefox does not have this problem, but it doesn't hurt to add the style anyway.
   */
  display: "block"
}, ND = /* @__PURE__ */ v.forwardRef((e, t) => {
  var r = gu(), n = yu(), i = lp();
  if (!Ct(r) || !Ct(n))
    return null;
  var {
    children: a,
    otherAttributes: o,
    title: l,
    desc: u
  } = e, s, c;
  return o != null && (typeof o.tabIndex == "number" ? s = o.tabIndex : s = i ? 0 : void 0, typeof o.role == "string" ? c = o.role : c = i ? "application" : void 0), /* @__PURE__ */ v.createElement(eu, Ta({}, o, {
    title: l,
    desc: u,
    role: c,
    tabIndex: s,
    width: r,
    height: n,
    style: DD,
    ref: t
  }), a);
}), $D = (e) => {
  var {
    children: t
  } = e, r = z(Ja);
  if (!r)
    return null;
  var {
    width: n,
    height: i,
    y: a,
    x: o
  } = r;
  return /* @__PURE__ */ v.createElement(eu, {
    width: n,
    height: i,
    x: o,
    y: a
  }, t);
}, fv = /* @__PURE__ */ v.forwardRef((e, t) => {
  var {
    children: r
  } = e, n = MD(e, ID), i = Fe();
  return i ? /* @__PURE__ */ v.createElement($D, null, /* @__PURE__ */ v.createElement(cv, {
    isPanorama: !0
  }, r)) : /* @__PURE__ */ v.createElement(ND, Ta({
    ref: t
  }, n), /* @__PURE__ */ v.createElement(cv, {
    isPanorama: !1
  }, r));
});
function RD() {
  var e = ue(), [t, r] = v.useState(null), n = z(Uw);
  return v.useEffect(() => {
    if (t != null) {
      var i = t.getBoundingClientRect(), a = i.width / t.offsetWidth;
      G(a) && a !== n && e(kw(a));
    }
  }, [t, e, n]), r;
}
function dv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function LD(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? dv(Object(r), !0).forEach(function(n) {
      zD(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : dv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function zD(e, t, r) {
  return (t = BD(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function BD(e) {
  var t = FD(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function FD(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function or() {
  return or = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, or.apply(null, arguments);
}
var WD = () => (YC(), null);
function Da(e) {
  if (typeof e == "number")
    return e;
  if (typeof e == "string") {
    var t = parseFloat(e);
    if (!Number.isNaN(t))
      return t;
  }
  return 0;
}
var UD = /* @__PURE__ */ v.forwardRef((e, t) => {
  var r, n, i = v.useRef(null), [a, o] = v.useState({
    containerWidth: Da((r = e.style) === null || r === void 0 ? void 0 : r.width),
    containerHeight: Da((n = e.style) === null || n === void 0 ? void 0 : n.height)
  }), l = v.useCallback((s, c) => {
    o((f) => {
      var d = Math.round(s), h = Math.round(c);
      return f.containerWidth === d && f.containerHeight === h ? f : {
        containerWidth: d,
        containerHeight: h
      };
    });
  }, []), u = v.useCallback((s) => {
    if (typeof t == "function" && t(s), s != null && typeof ResizeObserver < "u") {
      var {
        width: c,
        height: f
      } = s.getBoundingClientRect();
      l(c, f);
      var d = (p) => {
        var g = p[0];
        if (g != null) {
          var {
            width: m,
            height: y
          } = g.contentRect;
          l(m, y);
        }
      }, h = new ResizeObserver(d);
      h.observe(s), i.current = h;
    }
  }, [t, l]);
  return v.useEffect(() => () => {
    var s = i.current;
    s?.disconnect();
  }, [l]), /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ v.createElement(ti, {
    width: a.containerWidth,
    height: a.containerHeight
  }), /* @__PURE__ */ v.createElement("div", or({
    ref: u
  }, e)));
}), KD = /* @__PURE__ */ v.forwardRef((e, t) => {
  var {
    width: r,
    height: n
  } = e, [i, a] = v.useState({
    containerWidth: Da(r),
    containerHeight: Da(n)
  }), o = v.useCallback((u, s) => {
    a((c) => {
      var f = Math.round(u), d = Math.round(s);
      return c.containerWidth === f && c.containerHeight === d ? c : {
        containerWidth: f,
        containerHeight: d
      };
    });
  }, []), l = v.useCallback((u) => {
    if (typeof t == "function" && t(u), u != null) {
      var {
        width: s,
        height: c
      } = u.getBoundingClientRect();
      o(s, c);
    }
  }, [t, o]);
  return /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ v.createElement(ti, {
    width: i.containerWidth,
    height: i.containerHeight
  }), /* @__PURE__ */ v.createElement("div", or({
    ref: l
  }, e)));
}), HD = /* @__PURE__ */ v.forwardRef((e, t) => {
  var {
    width: r,
    height: n
  } = e;
  return /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ v.createElement(ti, {
    width: r,
    height: n
  }), /* @__PURE__ */ v.createElement("div", or({
    ref: t
  }, e)));
}), GD = /* @__PURE__ */ v.forwardRef((e, t) => {
  var {
    width: r,
    height: n
  } = e;
  return typeof r == "string" || typeof n == "string" ? /* @__PURE__ */ v.createElement(KD, or({}, e, {
    ref: t
  })) : typeof r == "number" && typeof n == "number" ? /* @__PURE__ */ v.createElement(HD, or({}, e, {
    width: r,
    height: n,
    ref: t
  })) : /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ v.createElement(ti, {
    width: r,
    height: n
  }), /* @__PURE__ */ v.createElement("div", or({
    ref: t
  }, e)));
});
function qD(e) {
  return e ? UD : GD;
}
var YD = /* @__PURE__ */ v.forwardRef((e, t) => {
  var {
    children: r,
    className: n,
    height: i,
    onClick: a,
    onContextMenu: o,
    onDoubleClick: l,
    onMouseDown: u,
    onMouseEnter: s,
    onMouseLeave: c,
    onMouseMove: f,
    onMouseUp: d,
    onTouchEnd: h,
    onTouchMove: p,
    onTouchStart: g,
    style: m,
    width: y,
    responsive: x,
    dispatchTouchEvents: b = !0
  } = e, w = v.useRef(null), O = ue(), [P, _] = v.useState(null), [A, C] = v.useState(null), T = RD(), I = pu(), k = I?.width > 0 ? I.width : y, B = I?.height > 0 ? I.height : i, F = v.useCallback((D) => {
    T(D), typeof t == "function" && t(D), _(D), C(D), D != null && (w.current = D);
  }, [T, t, _, C]), U = v.useCallback((D) => {
    O(by(D)), O(nt({
      handler: a,
      reactEvent: D
    }));
  }, [O, a]), q = v.useCallback((D) => {
    O(Yl(D)), O(nt({
      handler: s,
      reactEvent: D
    }));
  }, [O, s]), V = v.useCallback((D) => {
    O(lg()), O(nt({
      handler: c,
      reactEvent: D
    }));
  }, [O, c]), re = v.useCallback((D) => {
    O(Yl(D)), O(nt({
      handler: f,
      reactEvent: D
    }));
  }, [O, f]), Q = v.useCallback(() => {
    O(Sy());
  }, [O]), M = v.useCallback(() => {
    O(_y());
  }, [O]), Le = v.useCallback((D) => {
    O(Ay(D.key));
  }, [O]), se = v.useCallback((D) => {
    O(nt({
      handler: o,
      reactEvent: D
    }));
  }, [O, o]), Ue = v.useCallback((D) => {
    O(nt({
      handler: l,
      reactEvent: D
    }));
  }, [O, l]), be = v.useCallback((D) => {
    O(nt({
      handler: u,
      reactEvent: D
    }));
  }, [O, u]), ne = v.useCallback((D) => {
    O(nt({
      handler: d,
      reactEvent: D
    }));
  }, [O, d]), fe = v.useCallback((D) => {
    O(nt({
      handler: g,
      reactEvent: D
    }));
  }, [O, g]), yt = v.useCallback((D) => {
    b && O(Cy(D)), O(nt({
      handler: p,
      reactEvent: D
    }));
  }, [O, b, p]), Se = v.useCallback((D) => {
    O(nt({
      handler: h,
      reactEvent: D
    }));
  }, [O, h]), j = qD(x);
  return /* @__PURE__ */ v.createElement(Eg.Provider, {
    value: P
  }, /* @__PURE__ */ v.createElement(Av.Provider, {
    value: A
  }, /* @__PURE__ */ v.createElement(j, {
    width: k ?? m?.width,
    height: B ?? m?.height,
    className: J("recharts-wrapper", n),
    style: LD({
      position: "relative",
      cursor: "default",
      width: k,
      height: B
    }, m),
    onClick: U,
    onContextMenu: se,
    onDoubleClick: Ue,
    onFocus: Q,
    onBlur: M,
    onKeyDown: Le,
    onMouseDown: be,
    onMouseEnter: q,
    onMouseLeave: V,
    onMouseMove: re,
    onMouseUp: ne,
    onTouchEnd: Se,
    onTouchMove: yt,
    onTouchStart: fe,
    ref: F
  }, /* @__PURE__ */ v.createElement(WD, null), r)));
}), VD = ["width", "height", "responsive", "children", "className", "style", "compact", "title", "desc"];
function XD(e, t) {
  if (e == null) return {};
  var r, n, i = ZD(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function ZD(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var QD = /* @__PURE__ */ v.forwardRef((e, t) => {
  var {
    width: r,
    height: n,
    responsive: i,
    children: a,
    className: o,
    style: l,
    compact: u,
    title: s,
    desc: c
  } = e, f = XD(e, VD), d = pt(f);
  return u ? /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ v.createElement(ti, {
    width: r,
    height: n
  }), /* @__PURE__ */ v.createElement(fv, {
    otherAttributes: d,
    title: s,
    desc: c
  }, a)) : /* @__PURE__ */ v.createElement(YD, {
    className: o,
    style: l,
    width: r,
    height: n,
    responsive: i ?? !1,
    onClick: e.onClick,
    onMouseLeave: e.onMouseLeave,
    onMouseEnter: e.onMouseEnter,
    onMouseMove: e.onMouseMove,
    onMouseDown: e.onMouseDown,
    onMouseUp: e.onMouseUp,
    onContextMenu: e.onContextMenu,
    onDoubleClick: e.onDoubleClick,
    onTouchStart: e.onTouchStart,
    onTouchMove: e.onTouchMove,
    onTouchEnd: e.onTouchEnd
  }, /* @__PURE__ */ v.createElement(fv, {
    otherAttributes: d,
    title: s,
    desc: c,
    ref: t
  }, /* @__PURE__ */ v.createElement(lM, null, a)));
});
function Vl() {
  return Vl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Vl.apply(null, arguments);
}
function vv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function JD(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? vv(Object(r), !0).forEach(function(n) {
      eN(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : vv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function eN(e, t, r) {
  return (t = tN(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function tN(e) {
  var t = rN(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function rN(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var nN = {
  top: 5,
  right: 5,
  bottom: 5,
  left: 5
}, iN = JD({
  accessibilityLayer: !0,
  barCategoryGap: "10%",
  barGap: 4,
  layout: "horizontal",
  margin: nN,
  responsive: !1,
  reverseStackOrder: !1,
  stackOffset: "none",
  syncMethod: "index"
}, Iy), aN = /* @__PURE__ */ v.forwardRef(function(t, r) {
  var n, i = Be(t.categoricalChartProps, iN), {
    chartName: a,
    defaultTooltipEventType: o,
    validateTooltipEventTypes: l,
    tooltipPayloadSearcher: u,
    categoricalChartProps: s
  } = t, c = {
    chartName: a,
    defaultTooltipEventType: o,
    validateTooltipEventTypes: l,
    tooltipPayloadSearcher: u,
    eventEmitter: void 0
  };
  return /* @__PURE__ */ v.createElement(SD, {
    preloadedState: {
      options: c
    },
    reduxStoreName: (n = s.id) !== null && n !== void 0 ? n : a
  }, /* @__PURE__ */ v.createElement(QI, {
    chartData: s.data
  }), /* @__PURE__ */ v.createElement(kD, {
    layout: i.layout,
    margin: i.margin
  }), /* @__PURE__ */ v.createElement(jD, {
    throttleDelay: i.throttleDelay,
    throttledEvents: i.throttledEvents
  }), /* @__PURE__ */ v.createElement(ED, {
    baseValue: i.baseValue,
    accessibilityLayer: i.accessibilityLayer,
    barCategoryGap: i.barCategoryGap,
    maxBarSize: i.maxBarSize,
    stackOffset: i.stackOffset,
    barGap: i.barGap,
    barSize: i.barSize,
    syncId: i.syncId,
    syncMethod: i.syncMethod,
    className: i.className,
    reverseStackOrder: i.reverseStackOrder
  }), /* @__PURE__ */ v.createElement(QD, Vl({}, i, {
    ref: r
  })));
}), oN = ["axis"], lN = /* @__PURE__ */ v.forwardRef((e, t) => /* @__PURE__ */ v.createElement(aN, {
  chartName: "AreaChart",
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: oN,
  tooltipPayloadSearcher: MC,
  categoricalChartProps: e,
  ref: t
}));
const uN = (e, t) => {
  const r = new Array(e.length + t.length);
  for (let n = 0; n < e.length; n++)
    r[n] = e[n];
  for (let n = 0; n < t.length; n++)
    r[e.length + n] = t[n];
  return r;
}, sN = (e, t) => ({
  classGroupId: e,
  validator: t
}), Ty = (e = /* @__PURE__ */ new Map(), t = null, r) => ({
  nextPart: e,
  validators: t,
  classGroupId: r
}), Na = "-", hv = [], cN = "arbitrary..", fN = (e) => {
  const t = vN(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: n
  } = e;
  return {
    getClassGroupId: (o) => {
      if (o.startsWith("[") && o.endsWith("]"))
        return dN(o);
      const l = o.split(Na), u = l[0] === "" && l.length > 1 ? 1 : 0;
      return Dy(l, u, t);
    },
    getConflictingClassGroupIds: (o, l) => {
      if (l) {
        const u = n[o], s = r[o];
        return u ? s ? uN(s, u) : u : s || hv;
      }
      return r[o] || hv;
    }
  };
}, Dy = (e, t, r) => {
  if (e.length - t === 0)
    return r.classGroupId;
  const i = e[t], a = r.nextPart.get(i);
  if (a) {
    const s = Dy(e, t + 1, a);
    if (s) return s;
  }
  const o = r.validators;
  if (o === null)
    return;
  const l = t === 0 ? e.join(Na) : e.slice(t).join(Na), u = o.length;
  for (let s = 0; s < u; s++) {
    const c = o[s];
    if (c.validator(l))
      return c.classGroupId;
  }
}, dN = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const t = e.slice(1, -1), r = t.indexOf(":"), n = t.slice(0, r);
  return n ? cN + n : void 0;
})(), vN = (e) => {
  const {
    theme: t,
    classGroups: r
  } = e;
  return hN(r, t);
}, hN = (e, t) => {
  const r = Ty();
  for (const n in e) {
    const i = e[n];
    Ms(i, r, n, t);
  }
  return r;
}, Ms = (e, t, r, n) => {
  const i = e.length;
  for (let a = 0; a < i; a++) {
    const o = e[a];
    pN(o, t, r, n);
  }
}, pN = (e, t, r, n) => {
  if (typeof e == "string") {
    mN(e, t, r);
    return;
  }
  if (typeof e == "function") {
    gN(e, t, r, n);
    return;
  }
  yN(e, t, r, n);
}, mN = (e, t, r) => {
  const n = e === "" ? t : Ny(t, e);
  n.classGroupId = r;
}, gN = (e, t, r, n) => {
  if (bN(e)) {
    Ms(e(n), t, r, n);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push(sN(r, e));
}, yN = (e, t, r, n) => {
  const i = Object.entries(e), a = i.length;
  for (let o = 0; o < a; o++) {
    const [l, u] = i[o];
    Ms(u, Ny(t, l), r, n);
  }
}, Ny = (e, t) => {
  let r = e;
  const n = t.split(Na), i = n.length;
  for (let a = 0; a < i; a++) {
    const o = n[a];
    let l = r.nextPart.get(o);
    l || (l = Ty(), r.nextPart.set(o, l)), r = l;
  }
  return r;
}, bN = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, xN = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, r = /* @__PURE__ */ Object.create(null), n = /* @__PURE__ */ Object.create(null);
  const i = (a, o) => {
    r[a] = o, t++, t > e && (t = 0, n = r, r = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(a) {
      let o = r[a];
      if (o !== void 0)
        return o;
      if ((o = n[a]) !== void 0)
        return i(a, o), o;
    },
    set(a, o) {
      a in r ? r[a] = o : i(a, o);
    }
  };
}, Xl = "!", pv = ":", wN = [], mv = (e, t, r, n, i) => ({
  modifiers: e,
  hasImportantModifier: t,
  baseClassName: r,
  maybePostfixModifierPosition: n,
  isExternal: i
}), PN = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: r
  } = e;
  let n = (i) => {
    const a = [];
    let o = 0, l = 0, u = 0, s;
    const c = i.length;
    for (let g = 0; g < c; g++) {
      const m = i[g];
      if (o === 0 && l === 0) {
        if (m === pv) {
          a.push(i.slice(u, g)), u = g + 1;
          continue;
        }
        if (m === "/") {
          s = g;
          continue;
        }
      }
      m === "[" ? o++ : m === "]" ? o-- : m === "(" ? l++ : m === ")" && l--;
    }
    const f = a.length === 0 ? i : i.slice(u);
    let d = f, h = !1;
    f.endsWith(Xl) ? (d = f.slice(0, -1), h = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      f.startsWith(Xl) && (d = f.slice(1), h = !0)
    );
    const p = s && s > u ? s - u : void 0;
    return mv(a, h, d, p);
  };
  if (t) {
    const i = t + pv, a = n;
    n = (o) => o.startsWith(i) ? a(o.slice(i.length)) : mv(wN, !1, o, void 0, !0);
  }
  if (r) {
    const i = n;
    n = (a) => r({
      className: a,
      parseClassName: i
    });
  }
  return n;
}, ON = (e) => {
  const t = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((r, n) => {
    t.set(r, 1e6 + n);
  }), (r) => {
    const n = [];
    let i = [];
    for (let a = 0; a < r.length; a++) {
      const o = r[a], l = o[0] === "[", u = t.has(o);
      l || u ? (i.length > 0 && (i.sort(), n.push(...i), i = []), n.push(o)) : i.push(o);
    }
    return i.length > 0 && (i.sort(), n.push(...i)), n;
  };
}, AN = (e) => ({
  cache: xN(e.cacheSize),
  parseClassName: PN(e),
  sortModifiers: ON(e),
  postfixLookupClassGroupIds: SN(e),
  ...fN(e)
}), SN = (e) => {
  const t = /* @__PURE__ */ Object.create(null), r = e.postfixLookupClassGroups;
  if (r)
    for (let n = 0; n < r.length; n++)
      t[r[n]] = !0;
  return t;
}, _N = /\s+/, kN = (e, t) => {
  const {
    parseClassName: r,
    getClassGroupId: n,
    getConflictingClassGroupIds: i,
    sortModifiers: a,
    postfixLookupClassGroupIds: o
  } = t, l = [], u = e.trim().split(_N);
  let s = "";
  for (let c = u.length - 1; c >= 0; c -= 1) {
    const f = u[c], {
      isExternal: d,
      modifiers: h,
      hasImportantModifier: p,
      baseClassName: g,
      maybePostfixModifierPosition: m
    } = r(f);
    if (d) {
      s = f + (s.length > 0 ? " " + s : s);
      continue;
    }
    let y = !!m, x;
    if (y) {
      const _ = g.substring(0, m);
      x = n(_);
      const A = x && o[x] ? n(g) : void 0;
      A && A !== x && (x = A, y = !1);
    } else
      x = n(g);
    if (!x) {
      if (!y) {
        s = f + (s.length > 0 ? " " + s : s);
        continue;
      }
      if (x = n(g), !x) {
        s = f + (s.length > 0 ? " " + s : s);
        continue;
      }
      y = !1;
    }
    const b = h.length === 0 ? "" : h.length === 1 ? h[0] : a(h).join(":"), w = p ? b + Xl : b, O = w + x;
    if (l.indexOf(O) > -1)
      continue;
    l.push(O);
    const P = i(x, y);
    for (let _ = 0; _ < P.length; ++_) {
      const A = P[_];
      l.push(w + A);
    }
    s = f + (s.length > 0 ? " " + s : s);
  }
  return s;
}, EN = (...e) => {
  let t = 0, r, n, i = "";
  for (; t < e.length; )
    (r = e[t++]) && (n = $y(r)) && (i && (i += " "), i += n);
  return i;
}, $y = (e) => {
  if (typeof e == "string")
    return e;
  let t, r = "";
  for (let n = 0; n < e.length; n++)
    e[n] && (t = $y(e[n])) && (r && (r += " "), r += t);
  return r;
}, CN = (e, ...t) => {
  let r, n, i, a;
  const o = (u) => {
    const s = t.reduce((c, f) => f(c), e());
    return r = AN(s), n = r.cache.get, i = r.cache.set, a = l, l(u);
  }, l = (u) => {
    const s = n(u);
    if (s)
      return s;
    const c = kN(u, r);
    return i(u, c), c;
  };
  return a = o, (...u) => a(EN(...u));
}, jN = [], ve = (e) => {
  const t = (r) => r[e] || jN;
  return t.isThemeGetter = !0, t;
}, Ry = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Ly = /^\((?:(\w[\w-]*):)?(.+)\)$/i, IN = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, MN = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, TN = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, DN = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, NN = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, $N = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, er = (e) => IN.test(e), K = (e) => !!e && !Number.isNaN(Number(e)), Pt = (e) => !!e && Number.isInteger(Number(e)), Xo = (e) => e.endsWith("%") && K(e.slice(0, -1)), Tt = (e) => MN.test(e), zy = () => !0, RN = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  TN.test(e) && !DN.test(e)
), Ts = () => !1, LN = (e) => NN.test(e), zN = (e) => $N.test(e), BN = (e) => !N(e) && !$(e), FN = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), WN = (e) => cr(e, Wy, Ts), N = (e) => Ry.test(e), mr = (e) => cr(e, Uy, RN), gv = (e) => cr(e, XN, K), UN = (e) => cr(e, Hy, zy), KN = (e) => cr(e, Ky, Ts), yv = (e) => cr(e, By, Ts), HN = (e) => cr(e, Fy, zN), Mi = (e) => cr(e, Gy, LN), $ = (e) => Ly.test(e), Cn = (e) => Br(e, Uy), GN = (e) => Br(e, Ky), bv = (e) => Br(e, By), qN = (e) => Br(e, Wy), YN = (e) => Br(e, Fy), Ti = (e) => Br(e, Gy, !0), VN = (e) => Br(e, Hy, !0), cr = (e, t, r) => {
  const n = Ry.exec(e);
  return n ? n[1] ? t(n[1]) : r(n[2]) : !1;
}, Br = (e, t, r = !1) => {
  const n = Ly.exec(e);
  return n ? n[1] ? t(n[1]) : r : !1;
}, By = (e) => e === "position" || e === "percentage", Fy = (e) => e === "image" || e === "url", Wy = (e) => e === "length" || e === "size" || e === "bg-size", Uy = (e) => e === "length", XN = (e) => e === "number", Ky = (e) => e === "family-name", Hy = (e) => e === "number" || e === "weight", Gy = (e) => e === "shadow", ZN = () => {
  const e = ve("color"), t = ve("font"), r = ve("text"), n = ve("font-weight"), i = ve("tracking"), a = ve("leading"), o = ve("breakpoint"), l = ve("container"), u = ve("spacing"), s = ve("radius"), c = ve("shadow"), f = ve("inset-shadow"), d = ve("text-shadow"), h = ve("drop-shadow"), p = ve("blur"), g = ve("perspective"), m = ve("aspect"), y = ve("ease"), x = ve("animate"), b = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], w = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], O = () => [...w(), $, N], P = () => ["auto", "hidden", "clip", "visible", "scroll"], _ = () => ["auto", "contain", "none"], A = () => [$, N, u], C = () => [er, "full", "auto", ...A()], T = () => [Pt, "none", "subgrid", $, N], I = () => ["auto", {
    span: ["full", Pt, $, N]
  }, Pt, $, N], k = () => [Pt, "auto", $, N], B = () => ["auto", "min", "max", "fr", $, N], F = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], U = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], q = () => ["auto", ...A()], V = () => [er, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...A()], re = () => [er, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...A()], Q = () => [er, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...A()], M = () => [e, $, N], Le = () => [...w(), bv, yv, {
    position: [$, N]
  }], se = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], Ue = () => ["auto", "cover", "contain", qN, WN, {
    size: [$, N]
  }], be = () => [Xo, Cn, mr], ne = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    s,
    $,
    N
  ], fe = () => ["", K, Cn, mr], yt = () => ["solid", "dashed", "dotted", "double"], Se = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], j = () => [K, Xo, bv, yv], D = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    p,
    $,
    N
  ], H = () => ["none", K, $, N], E = () => ["none", K, $, N], xe = () => [K, $, N], Z = () => [er, "full", ...A()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Tt],
      breakpoint: [Tt],
      color: [zy],
      container: [Tt],
      "drop-shadow": [Tt],
      ease: ["in", "out", "in-out"],
      font: [BN],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Tt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Tt],
      shadow: [Tt],
      spacing: ["px", K],
      text: [Tt],
      "text-shadow": [Tt],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", er, N, $, m]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Container Type
       * @see https://tailwindcss.com/docs/responsive-design#container-queries
       */
      "container-type": [{
        "@container": ["", "normal", "size", $, N]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [FN],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [K, N, $, l]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": b()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": b()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: O()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: P()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": P()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": P()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: _()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": _()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": _()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: C()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": C()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": C()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": C(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: C()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": C(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: C()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": C()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": C()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: C()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: C()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: C()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: C()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [Pt, "auto", $, N]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [er, "full", "auto", l, ...A()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [K, er, "auto", "initial", "none", N]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", K, $, N]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", K, $, N]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Pt, "first", "last", "none", $, N]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": T()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: I()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": k()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": k()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": T()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: I()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": k()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": k()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": B()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": B()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: A()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": A()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": A()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...F(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...U(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...U()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...F()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...U(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...U(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": F()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...U(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...U()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: A()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: A()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: A()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: A()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: A()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: A()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: A()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: A()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: A()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: A()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: A()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: q()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: q()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: q()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: q()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: q()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: q()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: q()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: q()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: q()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: q()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: q()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": A()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": A()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: V()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...re()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...re()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...re()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...Q()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...Q()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...Q()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [l, "screen", ...V()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          l,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...V()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          l,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [o]
          },
          ...V()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...V()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...V()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...V()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, Cn, mr]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [n, VN, UN]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Xo, N]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [GN, KN, t]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [N]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [i, $, N]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [K, "none", $, gv]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          a,
          ...A()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", $, N]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", $, N]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: M()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: M()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...yt(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [K, "from-font", "auto", $, mr]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: M()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [K, "auto", $, N]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: A()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [Pt, $, N]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", $, N]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", $, N]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: Le()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: se()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: Ue()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Pt, $, N],
          radial: ["", $, N],
          conic: [Pt, $, N]
        }, YN, HN]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: M()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: be()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: be()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: be()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: M()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: M()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: M()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: ne()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": ne()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": ne()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": ne()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": ne()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": ne()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": ne()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": ne()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": ne()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": ne()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": ne()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": ne()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": ne()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": ne()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": ne()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: fe()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": fe()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": fe()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": fe()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": fe()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": fe()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": fe()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": fe()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": fe()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": fe()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": fe()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": fe()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": fe()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...yt(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...yt(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: M()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": M()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": M()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": M()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": M()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": M()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": M()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": M()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": M()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": M()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": M()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: M()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...yt(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [K, $, N]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", K, Cn, mr]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: M()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          c,
          Ti,
          Mi
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: M()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", f, Ti, Mi]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": M()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: fe()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: M()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [K, mr]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": M()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": fe()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": M()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", d, Ti, Mi]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": M()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [K, $, N]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Se(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Se()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [K]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": j()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": j()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": M()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": M()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": j()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": j()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": M()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": M()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": j()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": j()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": M()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": M()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": j()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": j()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": M()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": M()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": j()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": j()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": M()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": M()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": j()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": j()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": M()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": M()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": j()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": j()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": M()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": M()
      }],
      "mask-image-radial": [{
        "mask-radial": [$, N]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": j()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": j()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": M()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": M()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": w()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [K]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": j()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": j()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": M()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": M()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: Le()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: se()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: Ue()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", $, N]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          $,
          N
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: D()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [K, $, N]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [K, $, N]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          h,
          Ti,
          Mi
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": M()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", K, $, N]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [K, $, N]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", K, $, N]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [K, $, N]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", K, $, N]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          $,
          N
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": D()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [K, $, N]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [K, $, N]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", K, $, N]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [K, $, N]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", K, $, N]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [K, $, N]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [K, $, N]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", K, $, N]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": A()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": A()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": A()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", $, N]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [K, "initial", $, N]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", y, $, N]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [K, $, N]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", x, $, N]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [g, $, N]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": O()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: H()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": H()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": H()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": H()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: E()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": E()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": E()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": E()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: xe()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": xe()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": xe()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [$, N, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: O()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: Z()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": Z()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": Z()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": Z()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      /**
       * Zoom
       * @see https://tailwindcss.com/docs/zoom
       */
      zoom: [{
        zoom: [Pt, $, N]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: M()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: M()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", $, N]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scrollbar Thumb Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-thumb-color": [{
        "scrollbar-thumb": M()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": M()
      }],
      /**
       * Scrollbar Gutter
       * @see https://tailwindcss.com/docs/scrollbar-gutter
       */
      "scrollbar-gutter": [{
        "scrollbar-gutter": ["auto", "stable", "both"]
      }],
      /**
       * Scrollbar Width
       * @see https://tailwindcss.com/docs/scrollbar-width
       */
      "scrollbar-w": [{
        scrollbar: ["auto", "thin", "none"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": A()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": A()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": A()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": A()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": A()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": A()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": A()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": A()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": A()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": A()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": A()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": A()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": A()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": A()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": A()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": A()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": A()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": A()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": A()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": A()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": A()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": A()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", $, N]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...M()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [K, Cn, mr, gv]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...M()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      "container-named": ["container-type"],
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    postfixLookupClassGroups: ["container-type"],
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, QN = /* @__PURE__ */ CN(ZN);
function Nt(...e) {
  return QN(J(e));
}
const JN = { light: "", dark: ".dark" }, e2 = { width: 320, height: 200 }, qy = v.createContext(null);
function Yy() {
  const e = v.useContext(qy);
  if (!e)
    throw new Error("useChart must be used within a <ChartContainer />");
  return e;
}
function t2({
  id: e,
  className: t,
  children: r,
  config: n,
  initialDimension: i = e2,
  ...a
}) {
  const o = v.useId(), l = `chart-${e ?? o.replace(/:/g, "")}`;
  return /* @__PURE__ */ W.jsx(qy.Provider, { value: { config: n }, children: /* @__PURE__ */ W.jsxs(
    "div",
    {
      "data-slot": "chart",
      "data-chart": l,
      className: Nt(
        "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
        t
      ),
      ...a,
      children: [
        /* @__PURE__ */ W.jsx(r2, { id: l, config: n }),
        /* @__PURE__ */ W.jsx(
          m1,
          {
            initialDimension: i,
            children: r
          }
        )
      ]
    }
  ) });
}
const r2 = ({ id: e, config: t }) => {
  const r = Object.entries(t).filter(
    ([, n]) => n.theme ?? n.color
  );
  return r.length ? /* @__PURE__ */ W.jsx(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(JN).map(
          ([n, i]) => `
${i} [data-chart=${e}] {
${r.map(([a, o]) => {
            const l = o.theme?.[n] ?? o.color;
            return l ? `  --color-${a}: ${l};` : null;
          }).join(`
`)}
}
`
        ).join(`
`)
      }
    }
  ) : null;
}, n2 = rj;
function i2({
  active: e,
  payload: t,
  className: r,
  indicator: n = "dot",
  hideLabel: i = !1,
  hideIndicator: a = !1,
  label: o,
  labelFormatter: l,
  labelClassName: u,
  formatter: s,
  color: c,
  nameKey: f,
  labelKey: d
}) {
  const { config: h } = Yy(), p = v.useMemo(() => {
    if (i || !t?.length)
      return null;
    const [m] = t, y = `${d ?? m?.dataKey ?? m?.name ?? "value"}`, x = Zl(h, m, y), b = !d && typeof o == "string" ? h[o]?.label ?? o : x?.label;
    return l ? /* @__PURE__ */ W.jsx("div", { className: Nt("font-medium", u), children: l(b, t) }) : b ? /* @__PURE__ */ W.jsx("div", { className: Nt("font-medium", u), children: b }) : null;
  }, [
    o,
    l,
    t,
    i,
    u,
    h,
    d
  ]);
  if (!e || !t?.length)
    return null;
  const g = t.length === 1 && n !== "dot";
  return /* @__PURE__ */ W.jsxs(
    "div",
    {
      className: Nt(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs shadow-xl",
        r
      ),
      children: [
        g ? null : p,
        /* @__PURE__ */ W.jsx("div", { className: "grid gap-1.5", children: t.filter((m) => m.type !== "none").map((m, y) => {
          const x = `${f ?? m.name ?? m.dataKey ?? "value"}`, b = Zl(h, m, x), w = c ?? m.payload?.fill ?? m.color;
          return /* @__PURE__ */ W.jsx(
            "div",
            {
              className: Nt(
                "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                n === "dot" && "items-center"
              ),
              children: s && m?.value !== void 0 && m.name ? s(m.value, m.name, m, y, m.payload) : /* @__PURE__ */ W.jsxs(W.Fragment, { children: [
                b?.icon ? /* @__PURE__ */ W.jsx(b.icon, {}) : !a && /* @__PURE__ */ W.jsx(
                  "div",
                  {
                    className: Nt(
                      "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                      {
                        "h-2.5 w-2.5": n === "dot",
                        "w-1": n === "line",
                        "w-0 border-[1.5px] border-dashed bg-transparent": n === "dashed",
                        "my-0.5": g && n === "dashed"
                      }
                    ),
                    style: {
                      "--color-bg": w,
                      "--color-border": w
                    }
                  }
                ),
                /* @__PURE__ */ W.jsxs(
                  "div",
                  {
                    className: Nt(
                      "flex flex-1 justify-between leading-none",
                      g ? "items-end" : "items-center"
                    ),
                    children: [
                      /* @__PURE__ */ W.jsxs("div", { className: "grid gap-1.5", children: [
                        g ? p : null,
                        /* @__PURE__ */ W.jsx("span", { className: "text-muted-foreground", children: b?.label ?? m.name })
                      ] }),
                      m.value != null && /* @__PURE__ */ W.jsx("span", { className: "font-mono font-medium text-foreground tabular-nums", children: typeof m.value == "number" ? m.value.toLocaleString() : String(m.value) })
                    ]
                  }
                )
              ] })
            },
            y
          );
        }) })
      ]
    }
  );
}
const a2 = ap;
function o2({
  className: e,
  hideIcon: t = !1,
  payload: r,
  verticalAlign: n = "bottom",
  nameKey: i
}) {
  const { config: a } = Yy();
  return r?.length ? /* @__PURE__ */ W.jsx(
    "div",
    {
      className: Nt(
        "flex items-center justify-center gap-4",
        n === "top" ? "pb-3" : "pt-3",
        e
      ),
      children: r.filter((o) => o.type !== "none").map((o, l) => {
        const u = `${i ?? o.dataKey ?? "value"}`, s = Zl(a, o, u);
        return /* @__PURE__ */ W.jsxs(
          "div",
          {
            className: Nt(
              "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
            ),
            children: [
              s?.icon && !t ? /* @__PURE__ */ W.jsx(s.icon, {}) : /* @__PURE__ */ W.jsx(
                "div",
                {
                  className: "h-2 w-2 shrink-0 rounded-[2px]",
                  style: {
                    backgroundColor: o.color
                  }
                }
              ),
              s?.label
            ]
          },
          l
        );
      })
    }
  ) : null;
}
function Zl(e, t, r) {
  if (typeof t != "object" || t === null)
    return;
  const n = "payload" in t && typeof t.payload == "object" && t.payload !== null ? t.payload : void 0;
  let i = r;
  return r in t && typeof t[r] == "string" ? i = t[r] : n && r in n && typeof n[r] == "string" && (i = n[r]), i in e ? e[i] : e[r];
}
const l2 = [
  {
    key: "value",
    label: "Значение",
    color: "var(--aiwa-accent)"
  }
];
function M2({
  data: e = [],
  series: t = l2,
  xKey: r = "label",
  ariaLabel: n = "График динамики",
  emptyText: i = "Пока недостаточно данных для графика.",
  loading: a = !1,
  showLegend: o = t.length > 1,
  band: l = null
}) {
  const u = v.useId().replaceAll(":", ""), s = v.useRef(null);
  v.useEffect(() => {
    const b = s.current;
    b && (b.scrollLeft = b.scrollWidth);
  }, [e.length]);
  const c = t.filter((b) => b?.key && e.some((w) => w?.[b.key] != null)), f = Object.fromEntries(c.map((b) => [
    b.key,
    {
      label: b.label || b.key,
      color: b.color || "var(--aiwa-accent)"
    }
  ])), d = e.flatMap((b) => c.map((w) => Number(b?.[w.key])).filter(Number.isFinite)), h = d.length ? Math.min(...d) : 0, p = d.length ? Math.max(...d) : 1, g = p - h, m = Math.max(1, g * 0.35, Math.abs(p) * 0.04), y = [
    Math.min(l ? l[0] - 1 : 1 / 0, h >= 0 ? Math.max(0, Math.floor(h - m)) : Math.floor(h - m)),
    Math.max(l ? l[1] + 1 : -1 / 0, Math.ceil(p + m))
  ];
  if (a)
    return /* @__PURE__ */ W.jsx("div", { className: "aiwa-area-chart-state is-loading", role: "status", "aria-label": "График загружается", children: /* @__PURE__ */ W.jsx("span", { className: "aiwa-area-chart-skeleton", "aria-hidden": "true" }) });
  if (!e.length || !c.length)
    return /* @__PURE__ */ W.jsx("div", { className: "aiwa-area-chart-state", role: "status", children: i });
  const x = Math.max(e.length * 56, 320);
  return /* @__PURE__ */ W.jsx("div", { className: "aiwa-chart-scroll", "data-band": l ? l.join("-") : "none", ref: s, children: /* @__PURE__ */ W.jsx("div", { style: { minWidth: `${x}px` }, children: /* @__PURE__ */ W.jsx(
    t2,
    {
      config: f,
      className: "h-64 w-full",
      role: "img",
      "aria-label": n,
      children: /* @__PURE__ */ W.jsxs(
        lN,
        {
          accessibilityLayer: !0,
          data: e,
          margin: { top: 20, left: 4, right: 12 },
          children: [
            /* @__PURE__ */ W.jsx("defs", { children: c.map((b, w) => /* @__PURE__ */ W.jsxs(
              "linearGradient",
              {
                id: `${u}-${b.key}`,
                x1: "0",
                y1: "0",
                x2: "0",
                y2: "1",
                children: [
                  /* @__PURE__ */ W.jsx(
                    "stop",
                    {
                      offset: "5%",
                      stopColor: `var(--color-${b.key})`,
                      stopOpacity: w === 0 ? 0.35 : 0.28
                    }
                  ),
                  /* @__PURE__ */ W.jsx(
                    "stop",
                    {
                      offset: "95%",
                      stopColor: `var(--color-${b.key})`,
                      stopOpacity: w === 0 ? 0.06 : 0.04
                    }
                  )
                ]
              },
              b.key
            )) }),
            /* @__PURE__ */ W.jsx(ay, { vertical: !1 }),
            l ? /* @__PURE__ */ W.jsx(
              ty,
              {
                y1: l[0],
                y2: l[1],
                ifOverflow: "extendDomain",
                fill: "var(--aiwa-hint-color, #8e8e93)",
                fillOpacity: 0.12,
                stroke: "none"
              }
            ) : null,
            /* @__PURE__ */ W.jsx(
              gy,
              {
                dataKey: r,
                tickLine: !1,
                axisLine: !1,
                tickMargin: 8,
                padding: { left: 22, right: 22 },
                interval: 0
              }
            ),
            /* @__PURE__ */ W.jsx(yy, { hide: !0, domain: y }),
            /* @__PURE__ */ W.jsx(
              n2,
              {
                cursor: !1,
                content: /* @__PURE__ */ W.jsx(i2, { indicator: "line" })
              }
            ),
            o ? /* @__PURE__ */ W.jsx(a2, { content: /* @__PURE__ */ W.jsx(o2, {}) }) : null,
            c.map((b, w) => /* @__PURE__ */ W.jsx(
              py,
              {
                dataKey: b.key,
                type: "natural",
                fill: `url(#${u}-${b.key})`,
                fillOpacity: 1,
                stroke: `var(--color-${b.key})`,
                strokeOpacity: 0.55,
                stackId: b.stacked ? "values" : void 0,
                strokeDasharray: b.dashed ? "5 5" : void 0,
                dot: {
                  r: 4,
                  fill: `var(--color-${b.key})`,
                  stroke: "var(--aiwa-surface)",
                  strokeWidth: 3
                },
                activeDot: {
                  r: 5,
                  fill: `var(--color-${b.key})`,
                  stroke: "var(--aiwa-surface)",
                  strokeWidth: 3
                },
                isAnimationActive: !0,
                animationDuration: 240,
                animationBegin: w * 30,
                children: /* @__PURE__ */ W.jsx(
                  Dn,
                  {
                    dataKey: b.key,
                    position: "top",
                    offset: 12 + w * 10,
                    fill: "var(--aiwa-ink)",
                    fontSize: 12,
                    fontWeight: 600
                  }
                )
              },
              b.key
            ))
          ]
        }
      )
    }
  ) }) });
}
export {
  M2 as AiwaWebUiChart
};
