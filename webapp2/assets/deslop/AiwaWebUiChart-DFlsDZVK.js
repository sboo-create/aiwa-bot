import { r as h, a as gv, b as Fy, c as Zl, g as Wy, R as Uy, j as U } from "./deslop-main-CHbfSilT.js";
function yv(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var i = e.length;
    for (t = 0; t < i; t++) e[t] && (r = yv(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function J() {
  for (var e, t, r = 0, n = "", i = arguments.length; r < i; r++) (e = arguments[r]) && (t = yv(e)) && (n && (n += " "), n += t);
  return n;
}
var Ky = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"];
function Ql(e) {
  if (typeof e != "string")
    return !1;
  var t = Ky;
  return t.includes(e);
}
var Hy = [
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
], Gy = new Set(Hy);
function bv(e) {
  return typeof e != "string" ? !1 : Gy.has(e);
}
function wv(e) {
  return typeof e == "string" && e.startsWith("data-");
}
function ht(e) {
  if (typeof e != "object" || e === null)
    return {};
  var t = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (bv(r) || wv(r)) && (t[r] = e[r]);
  return t;
}
function Da(e) {
  if (e == null)
    return null;
  if (/* @__PURE__ */ h.isValidElement(e) && typeof e.props == "object" && e.props !== null) {
    var t = e.props;
    return ht(t);
  }
  return typeof e == "object" && !Array.isArray(e) ? ht(e) : null;
}
function Ze(e) {
  var t = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (bv(r) || wv(r) || Ql(r)) && (t[r] = e[r]);
  return t;
}
function qy(e) {
  return e == null ? null : /* @__PURE__ */ h.isValidElement(e) ? Ze(e.props) : typeof e == "object" && !Array.isArray(e) ? Ze(e) : null;
}
var Yy = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function Xo() {
  return Xo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Xo.apply(null, arguments);
}
function Vy(e, t) {
  if (e == null) return {};
  var r, n, i = Xy(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function Xy(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var Jl = /* @__PURE__ */ h.forwardRef((e, t) => {
  var {
    children: r,
    width: n,
    height: i,
    viewBox: a,
    className: o,
    style: l,
    title: u,
    desc: s
  } = e, c = Vy(e, Yy), f = a || {
    width: n,
    height: i,
    x: 0,
    y: 0
  }, d = J("recharts-surface", o);
  return /* @__PURE__ */ h.createElement("svg", Xo({}, Ze(c), {
    className: d,
    width: n,
    height: i,
    style: l,
    viewBox: "".concat(f.x, " ").concat(f.y, " ").concat(f.width, " ").concat(f.height),
    ref: t
  }), /* @__PURE__ */ h.createElement("title", null, u), /* @__PURE__ */ h.createElement("desc", null, s), r);
}), Zy = ["children", "className"];
function Zo() {
  return Zo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Zo.apply(null, arguments);
}
function Qy(e, t) {
  if (e == null) return {};
  var r, n, i = Jy(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function Jy(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var _t = /* @__PURE__ */ h.forwardRef((e, t) => {
  var {
    children: r,
    className: n
  } = e, i = Qy(e, Zy), a = J("recharts-layer", n);
  return /* @__PURE__ */ h.createElement("g", Zo({
    className: a
  }, Ze(i), {
    ref: t
  }), r);
}), xv = /* @__PURE__ */ h.createContext(null), eb = () => h.useContext(xv);
function te(e) {
  return function() {
    return e;
  };
}
const Pv = Math.cos, zi = Math.sin, pt = Math.sqrt, Bi = Math.PI, Na = 2 * Bi, Qo = Math.PI, Jo = 2 * Qo, gr = 1e-6, tb = Jo - gr;
function Ov(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t)
    this._ += arguments[t] + e[t];
}
function rb(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return Ov;
  const r = 10 ** t;
  return function(n) {
    this._ += n[0];
    for (let i = 1, a = n.length; i < a; ++i)
      this._ += Math.round(arguments[i] * r) / r + n[i];
  };
}
class nb {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? Ov : rb(t);
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
      let v = n - o, p = i - l, g = u * u + s * s, m = v * v + p * p, y = Math.sqrt(g), w = Math.sqrt(d), b = a * Math.tan((Qo - Math.acos((g + d - m) / (2 * y * w))) / 2), x = b / w, O = b / y;
      Math.abs(x - 1) > gr && this._append`L${t + x * c},${r + x * f}`, this._append`A${a},${a},0,0,${+(f * v > c * p)},${this._x1 = t + O * u},${this._y1 = r + O * s}`;
    }
  }
  arc(t, r, n, i, a, o) {
    if (t = +t, r = +r, n = +n, o = !!o, n < 0) throw new Error(`negative radius: ${n}`);
    let l = n * Math.cos(i), u = n * Math.sin(i), s = t + l, c = r + u, f = 1 ^ o, d = o ? i - a : a - i;
    this._x1 === null ? this._append`M${s},${c}` : (Math.abs(this._x1 - s) > gr || Math.abs(this._y1 - c) > gr) && this._append`L${s},${c}`, n && (d < 0 && (d = d % Jo + Jo), d > tb ? this._append`A${n},${n},0,1,${f},${t - l},${r - u}A${n},${n},0,1,${f},${this._x1 = s},${this._y1 = c}` : d > gr && this._append`A${n},${n},0,${+(d >= Qo)},${f},${this._x1 = t + n * Math.cos(a)},${this._y1 = r + n * Math.sin(a)}`);
  }
  rect(t, r, n, i) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}h${n = +n}v${+i}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function eu(e) {
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
  }, () => new nb(t);
}
function tu(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Av(e) {
  this._context = e;
}
Av.prototype = {
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
function $a(e) {
  return new Av(e);
}
function Sv(e) {
  return e[0];
}
function _v(e) {
  return e[1];
}
function kv(e, t) {
  var r = te(!0), n = null, i = $a, a = null, o = eu(l);
  e = typeof e == "function" ? e : e === void 0 ? Sv : te(e), t = typeof t == "function" ? t : t === void 0 ? _v : te(t);
  function l(u) {
    var s, c = (u = tu(u)).length, f, d = !1, v;
    for (n == null && (a = i(v = o())), s = 0; s <= c; ++s)
      !(s < c && r(f = u[s], s, u)) === d && ((d = !d) ? a.lineStart() : a.lineEnd()), d && a.point(+e(f, s, u), +t(f, s, u));
    if (v) return a = null, v + "" || null;
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
function pi(e, t, r) {
  var n = null, i = te(!0), a = null, o = $a, l = null, u = eu(s);
  e = typeof e == "function" ? e : e === void 0 ? Sv : te(+e), t = typeof t == "function" ? t : te(t === void 0 ? 0 : +t), r = typeof r == "function" ? r : r === void 0 ? _v : te(+r);
  function s(f) {
    var d, v, p, g = (f = tu(f)).length, m, y = !1, w, b = new Array(g), x = new Array(g);
    for (a == null && (l = o(w = u())), d = 0; d <= g; ++d) {
      if (!(d < g && i(m = f[d], d, f)) === y)
        if (y = !y)
          v = d, l.areaStart(), l.lineStart();
        else {
          for (l.lineEnd(), l.lineStart(), p = d - 1; p >= v; --p)
            l.point(b[p], x[p]);
          l.lineEnd(), l.areaEnd();
        }
      y && (b[d] = +e(m, d, f), x[d] = +t(m, d, f), l.point(n ? +n(m, d, f) : b[d], r ? +r(m, d, f) : x[d]));
    }
    if (w) return l = null, w + "" || null;
  }
  function c() {
    return kv().defined(i).curve(o).context(a);
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
class Ev {
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
function ib(e) {
  return new Ev(e, !0);
}
function ab(e) {
  return new Ev(e, !1);
}
const ru = {
  draw(e, t) {
    const r = pt(t / Bi);
    e.moveTo(r, 0), e.arc(0, 0, r, 0, Na);
  }
}, ob = {
  draw(e, t) {
    const r = pt(t / 5) / 2;
    e.moveTo(-3 * r, -r), e.lineTo(-r, -r), e.lineTo(-r, -3 * r), e.lineTo(r, -3 * r), e.lineTo(r, -r), e.lineTo(3 * r, -r), e.lineTo(3 * r, r), e.lineTo(r, r), e.lineTo(r, 3 * r), e.lineTo(-r, 3 * r), e.lineTo(-r, r), e.lineTo(-3 * r, r), e.closePath();
  }
}, Cv = pt(1 / 3), lb = Cv * 2, ub = {
  draw(e, t) {
    const r = pt(t / lb), n = r * Cv;
    e.moveTo(0, -r), e.lineTo(n, 0), e.lineTo(0, r), e.lineTo(-n, 0), e.closePath();
  }
}, sb = {
  draw(e, t) {
    const r = pt(t), n = -r / 2;
    e.rect(n, n, r, r);
  }
}, cb = 0.8908130915292852, jv = zi(Bi / 10) / zi(7 * Bi / 10), fb = zi(Na / 10) * jv, db = -Pv(Na / 10) * jv, vb = {
  draw(e, t) {
    const r = pt(t * cb), n = fb * r, i = db * r;
    e.moveTo(0, -r), e.lineTo(n, i);
    for (let a = 1; a < 5; ++a) {
      const o = Na * a / 5, l = Pv(o), u = zi(o);
      e.lineTo(u * r, -l * r), e.lineTo(l * n - u * i, u * n + l * i);
    }
    e.closePath();
  }
}, wo = pt(3), hb = {
  draw(e, t) {
    const r = -pt(t / (wo * 3));
    e.moveTo(0, r * 2), e.lineTo(-wo * r, -r), e.lineTo(wo * r, -r), e.closePath();
  }
}, et = -0.5, tt = pt(3) / 2, el = 1 / pt(12), pb = (el / 2 + 1) * 3, mb = {
  draw(e, t) {
    const r = pt(t / pb), n = r / 2, i = r * el, a = n, o = r * el + r, l = -a, u = o;
    e.moveTo(n, i), e.lineTo(a, o), e.lineTo(l, u), e.lineTo(et * n - tt * i, tt * n + et * i), e.lineTo(et * a - tt * o, tt * a + et * o), e.lineTo(et * l - tt * u, tt * l + et * u), e.lineTo(et * n + tt * i, et * i - tt * n), e.lineTo(et * a + tt * o, et * o - tt * a), e.lineTo(et * l + tt * u, et * u - tt * l), e.closePath();
  }
};
function gb(e, t) {
  let r = null, n = eu(i);
  e = typeof e == "function" ? e : te(e || ru), t = typeof t == "function" ? t : te(t === void 0 ? 64 : +t);
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
function Fi() {
}
function Wi(e, t, r) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + r) / 6
  );
}
function Iv(e) {
  this._context = e;
}
Iv.prototype = {
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
        Wi(this, this._x1, this._y1);
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
        Wi(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function yb(e) {
  return new Iv(e);
}
function Mv(e) {
  this._context = e;
}
Mv.prototype = {
  areaStart: Fi,
  areaEnd: Fi,
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
        Wi(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function bb(e) {
  return new Mv(e);
}
function Tv(e) {
  this._context = e;
}
Tv.prototype = {
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
        Wi(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function wb(e) {
  return new Tv(e);
}
function Dv(e) {
  this._context = e;
}
Dv.prototype = {
  areaStart: Fi,
  areaEnd: Fi,
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
function xb(e) {
  return new Dv(e);
}
function Ds(e) {
  return e < 0 ? -1 : 1;
}
function Ns(e, t, r) {
  var n = e._x1 - e._x0, i = t - e._x1, a = (e._y1 - e._y0) / (n || i < 0 && -0), o = (r - e._y1) / (i || n < 0 && -0), l = (a * i + o * n) / (n + i);
  return (Ds(a) + Ds(o)) * Math.min(Math.abs(a), Math.abs(o), 0.5 * Math.abs(l)) || 0;
}
function $s(e, t) {
  var r = e._x1 - e._x0;
  return r ? (3 * (e._y1 - e._y0) / r - t) / 2 : t;
}
function xo(e, t, r) {
  var n = e._x0, i = e._y0, a = e._x1, o = e._y1, l = (a - n) / 3;
  e._context.bezierCurveTo(n + l, i + l * t, a - l, o - l * r, a, o);
}
function Ui(e) {
  this._context = e;
}
Ui.prototype = {
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
        xo(this, this._t0, $s(this, this._t0));
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
          this._point = 3, xo(this, $s(this, r = Ns(this, e, t)), r);
          break;
        default:
          xo(this, this._t0, r = Ns(this, e, t));
          break;
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = r;
    }
  }
};
function Nv(e) {
  this._context = new $v(e);
}
(Nv.prototype = Object.create(Ui.prototype)).point = function(e, t) {
  Ui.prototype.point.call(this, t, e);
};
function $v(e) {
  this._context = e;
}
$v.prototype = {
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
function Pb(e) {
  return new Ui(e);
}
function Ob(e) {
  return new Nv(e);
}
function Lv(e) {
  this._context = e;
}
Lv.prototype = {
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
function Ab(e) {
  return new Lv(e);
}
function La(e, t) {
  this._context = e, this._t = t;
}
La.prototype = {
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
function Sb(e) {
  return new La(e, 0.5);
}
function _b(e) {
  return new La(e, 0);
}
function kb(e) {
  return new La(e, 1);
}
function Cr(e, t) {
  if ((o = e.length) > 1)
    for (var r = 1, n, i, a = e[t[0]], o, l = a.length; r < o; ++r)
      for (i = a, a = e[t[r]], n = 0; n < l; ++n)
        a[n][1] += a[n][0] = isNaN(i[n][1]) ? i[n][0] : i[n][1];
}
function tl(e) {
  for (var t = e.length, r = new Array(t); --t >= 0; ) r[t] = t;
  return r;
}
function Eb(e, t) {
  return e[t];
}
function Cb(e) {
  const t = [];
  return t.key = e, t;
}
function jb() {
  var e = te([]), t = tl, r = Cr, n = Eb;
  function i(a) {
    var o = Array.from(e.apply(this, arguments), Cb), l, u = o.length, s = -1, c;
    for (const f of a)
      for (l = 0, ++s; l < u; ++l)
        (o[l][s] = [0, +n(f, o[l].key, s, a)]).data = f;
    for (l = 0, c = tu(t(o)); l < u; ++l)
      o[c[l]].index = l;
    return r(o, c), o;
  }
  return i.keys = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : te(Array.from(a)), i) : e;
  }, i.value = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : te(+a), i) : n;
  }, i.order = function(a) {
    return arguments.length ? (t = a == null ? tl : typeof a == "function" ? a : te(Array.from(a)), i) : t;
  }, i.offset = function(a) {
    return arguments.length ? (r = a ?? Cr, i) : r;
  }, i;
}
function Ib(e, t) {
  if ((n = e.length) > 0) {
    for (var r, n, i = 0, a = e[0].length, o; i < a; ++i) {
      for (o = r = 0; r < n; ++r) o += e[r][i][1] || 0;
      if (o) for (r = 0; r < n; ++r) e[r][i][1] /= o;
    }
    Cr(e, t);
  }
}
function Mb(e, t) {
  if ((i = e.length) > 0) {
    for (var r = 0, n = e[t[0]], i, a = n.length; r < a; ++r) {
      for (var o = 0, l = 0; o < i; ++o) l += e[o][r][1] || 0;
      n[r][1] += n[r][0] = -l / 2;
    }
    Cr(e, t);
  }
}
function Tb(e, t) {
  if (!(!((o = e.length) > 0) || !((a = (i = e[t[0]]).length) > 0))) {
    for (var r = 0, n = 1, i, a, o; n < a; ++n) {
      for (var l = 0, u = 0, s = 0; l < o; ++l) {
        for (var c = e[t[l]], f = c[n][1] || 0, d = c[n - 1][1] || 0, v = (f - d) / 2, p = 0; p < l; ++p) {
          var g = e[t[p]], m = g[n][1] || 0, y = g[n - 1][1] || 0;
          v += m - y;
        }
        u += f, s += v * f;
      }
      i[n - 1][1] += i[n - 1][0] = r, u && (r -= s / u);
    }
    i[n - 1][1] += i[n - 1][0] = r, Cr(e, t);
  }
}
function rl(e) {
  return e === "__proto__";
}
function Rv(e) {
  switch (typeof e) {
    case "number":
    case "symbol":
      return !1;
    case "string":
      return e.includes(".") || e.includes("[") || e.includes("]");
  }
}
function nu(e) {
  return typeof e == "string" || typeof e == "symbol" ? e : Object.is(e?.valueOf?.(), -0) ? "-0" : String(e);
}
function zv(e) {
  if (e == null) return "";
  if (typeof e == "string") return e;
  if (Array.isArray(e)) return e.map(zv).join(",");
  const t = String(e);
  return t === "0" && Object.is(Number(e), -0) ? "-0" : t;
}
function iu(e) {
  if (Array.isArray(e)) return e.map(nu);
  if (typeof e == "symbol") return [e];
  e = zv(e);
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
      if (rl(t)) return r;
      const n = e[t];
      return n === void 0 ? Rv(t) && !Object.hasOwn(e, t) ? $r(e, iu(t), r) : r : n;
    }
    case "number":
    case "symbol": {
      typeof t == "number" && (t = nu(t));
      const n = e[t];
      return n === void 0 ? r : n;
    }
    default: {
      if (Array.isArray(t)) return Db(e, t, r);
      if (Object.is(t?.valueOf(), -0) ? t = "-0" : t = String(t), rl(t)) return r;
      const n = e[t];
      return n === void 0 ? r : n;
    }
  }
}
function Db(e, t, r) {
  if (t.length === 0) return r;
  let n = e;
  for (let i = 0; i < t.length; i++) {
    if (n == null || rl(t[i])) return r;
    n = n[t[i]];
  }
  return n === void 0 ? r : n;
}
var Nb = 4;
function ir(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Nb, r = 10 ** t, n = Math.round(e * r) / r;
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
var it = (e) => e === 0 ? 0 : e > 0 ? 1 : -1, kt = (e) => typeof e == "number" && e != +e, jr = (e) => typeof e == "string" && e.indexOf("%") === e.length - 1, R = (e) => (typeof e == "number" || e instanceof Number) && !kt(e), Et = (e) => R(e) || typeof e == "string", $b = 0, Dn = (e) => {
  var t = ++$b;
  return "".concat(e || "").concat(t);
}, lr = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (!R(t) && typeof t != "string")
    return n;
  var a;
  if (jr(t)) {
    if (r == null)
      return n;
    var o = t.indexOf("%");
    a = r * parseFloat(t.slice(0, o)) / 100;
  } else
    a = +t;
  return kt(a) && (a = n), i && r != null && a > r && (a = r), a;
}, Bv = (e) => {
  if (!Array.isArray(e))
    return !1;
  for (var t = e.length, r = {}, n = 0; n < t; n++)
    if (!r[String(e[n])])
      r[String(e[n])] = !0;
    else
      return !0;
  return !1;
};
function xt(e, t, r) {
  return R(e) && R(t) ? ir(e + r * (t - e)) : t;
}
function Fv(e, t, r) {
  if (!(!e || !e.length))
    return e.find((n) => n && (typeof t == "function" ? t(n) : $r(n, t)) === r);
}
var Ie = (e) => e === null || typeof e > "u", Xn = (e) => Ie(e) ? e : "".concat(e.charAt(0).toUpperCase()).concat(e.slice(1));
function We(e) {
  return e != null;
}
function Lr() {
}
var Lb = ["type", "size", "sizeType"];
function nl() {
  return nl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, nl.apply(null, arguments);
}
function Rs(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function zs(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Rs(Object(r), !0).forEach(function(n) {
      Rb(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Rs(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Rb(e, t, r) {
  return (t = zb(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function zb(e) {
  var t = Bb(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Bb(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Fb(e, t) {
  if (e == null) return {};
  var r, n, i = Wb(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function Wb(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var Wv = {
  symbolCircle: ru,
  symbolCross: ob,
  symbolDiamond: ub,
  symbolSquare: sb,
  symbolStar: vb,
  symbolTriangle: hb,
  symbolWye: mb
}, Ub = Math.PI / 180, Kb = (e) => {
  var t = "symbol".concat(Xn(e));
  return Wv[t] || ru;
}, Hb = (e, t, r) => {
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
      var n = 18 * Ub;
      return 1.25 * e * e * (Math.tan(n) - Math.tan(n * 2) * Math.tan(n) ** 2);
    }
    case "triangle":
      return Math.sqrt(3) * e * e / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * e * e / 8;
    default:
      return Math.PI * e * e / 4;
  }
}, Gb = (e, t) => {
  Wv["symbol".concat(Xn(e))] = t;
}, Uv = (e) => {
  var {
    type: t = "circle",
    size: r = 64,
    sizeType: n = "area"
  } = e, i = Fb(e, Lb), a = zs(zs({}, i), {}, {
    type: t,
    size: r,
    sizeType: n
  }), o = "circle";
  typeof t == "string" && (o = t);
  var l = () => {
    var d = Kb(o), v = gb().type(d).size(Hb(r, n, o)), p = v();
    if (p !== null)
      return p;
  }, {
    className: u,
    cx: s,
    cy: c
  } = a, f = Ze(a);
  return R(s) && R(c) && R(r) ? /* @__PURE__ */ h.createElement("path", nl({}, f, {
    className: J("recharts-symbols", u),
    transform: "translate(".concat(s, ", ").concat(c, ")"),
    d: l()
  })) : null;
};
Uv.registerSymbol = Gb;
var Kv = (e) => "radius" in e && "startAngle" in e && "endAngle" in e, au = (e, t) => {
  if (!e || typeof e == "function" || typeof e == "boolean")
    return null;
  var r = e;
  if (/* @__PURE__ */ h.isValidElement(e) && (r = e.props), typeof r != "object" && typeof r != "function")
    return null;
  var n = {};
  return Object.keys(r).forEach((i) => {
    Ql(i) && typeof r[i] == "function" && (n[i] = ((a) => r[i](r, a)));
  }), n;
}, qb = (e, t, r) => (n) => (e(t, r, n), null), Hv = (e, t, r) => {
  if (e === null || typeof e != "object" && typeof e != "function")
    return null;
  var n = null;
  return Object.keys(e).forEach((i) => {
    var a = e[i];
    Ql(i) && typeof a == "function" && (n || (n = {}), n[i] = qb(a, t, r));
  }), n;
};
function Bs(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Yb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Bs(Object(r), !0).forEach(function(n) {
      Vb(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Bs(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Vb(e, t, r) {
  return (t = Xb(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Xb(e) {
  var t = Zb(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Zb(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ke(e, t) {
  var r = Yb({}, e), n = t, i = Object.keys(t), a = i.reduce((o, l) => (o[l] === void 0 && n[l] !== void 0 && (o[l] = n[l]), o), r);
  return a;
}
function Ki() {
  return Ki = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ki.apply(null, arguments);
}
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
function Gv(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Fs(Object(r), !0).forEach(function(n) {
      Qb(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Fs(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Qb(e, t, r) {
  return (t = Jb(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Jb(e) {
  var t = e0(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function e0(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var nt = 32, t0 = {
  align: "center",
  iconSize: 14,
  inactiveColor: "#ccc",
  layout: "horizontal",
  verticalAlign: "middle",
  labelStyle: {}
};
function r0(e) {
  if (typeof e == "object" && e !== null && "strokeDasharray" in e)
    return String(e.strokeDasharray);
}
function n0(e) {
  var {
    data: t,
    iconType: r,
    inactiveColor: n
  } = e, i = nt / 2, a = nt / 6, o = nt / 3, l = t.inactive ? n : t.color, u = r ?? t.type;
  if (u === "none")
    return null;
  if (u === "plainline")
    return /* @__PURE__ */ h.createElement("line", {
      strokeWidth: 4,
      fill: "none",
      stroke: l,
      strokeDasharray: r0(t.payload),
      x1: 0,
      y1: i,
      x2: nt,
      y2: i,
      className: "recharts-legend-icon"
    });
  if (u === "line")
    return /* @__PURE__ */ h.createElement("path", {
      strokeWidth: 4,
      fill: "none",
      stroke: l,
      d: "M0,".concat(i, "h").concat(o, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(2 * o, ",").concat(i, `
            H`).concat(nt, "M").concat(2 * o, ",").concat(i, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(o, ",").concat(i),
      className: "recharts-legend-icon"
    });
  if (u === "rect")
    return /* @__PURE__ */ h.createElement("path", {
      stroke: "none",
      fill: l,
      d: "M0,".concat(nt / 8, "h").concat(nt, "v").concat(nt * 3 / 4, "h").concat(-nt, "z"),
      className: "recharts-legend-icon"
    });
  if (/* @__PURE__ */ h.isValidElement(t.legendIcon)) {
    var s = Gv({}, t);
    return delete s.legendIcon, /* @__PURE__ */ h.cloneElement(t.legendIcon, s);
  }
  return /* @__PURE__ */ h.createElement(Uv, {
    fill: l,
    cx: i,
    cy: i,
    size: nt,
    sizeType: "diameter",
    type: u
  });
}
function i0(e) {
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
    width: nt,
    height: nt
  }, s = {
    display: n === "horizontal" ? "inline-block" : "block",
    marginRight: 10
  }, c = {
    display: "inline-block",
    verticalAlign: "middle",
    marginRight: 4
  };
  return t.map((f, d) => {
    var v = f.formatter || i, p = J({
      "recharts-legend-item": !0,
      ["legend-item-".concat(d)]: !0,
      inactive: f.inactive
    });
    if (f.type === "none")
      return null;
    var g = typeof l == "object" ? Gv({}, l) : {};
    g.color = f.inactive ? a : g.color || f.color;
    var m = v ? v(f.value, f, d) : f.value;
    return /* @__PURE__ */ h.createElement("li", Ki({
      className: p,
      style: s,
      key: "legend-item-".concat(d)
    }, Hv(e, f, d)), /* @__PURE__ */ h.createElement(Jl, {
      width: r,
      height: r,
      viewBox: u,
      style: c,
      "aria-label": "".concat(m, " legend icon")
    }, /* @__PURE__ */ h.createElement(n0, {
      data: f,
      iconType: o,
      inactiveColor: a
    })), /* @__PURE__ */ h.createElement("span", {
      className: "recharts-legend-item-text",
      style: g
    }, m));
  });
}
var a0 = (e) => {
  var t = Ke(e, t0), {
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
  return /* @__PURE__ */ h.createElement("ul", {
    className: "recharts-default-legend",
    style: a
  }, /* @__PURE__ */ h.createElement(i0, Ki({}, t, {
    payload: r
  })));
};
function o0(e, t) {
  const r = /* @__PURE__ */ new Map();
  for (let n = 0; n < e.length; n++) {
    const i = e[n], a = t(i, n, e);
    r.has(a) || r.set(a, i);
  }
  return Array.from(r.values());
}
function l0(e, t) {
  return function(...r) {
    return e.apply(this, r.slice(0, t));
  };
}
function qv(e) {
  return e;
}
function u0(e) {
  return function(t) {
    return $r(t, e);
  };
}
function il(e) {
  return e == null || typeof e != "object" && typeof e != "function";
}
function s0(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function c0(e) {
  return Object.getOwnPropertySymbols(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
function ou(e) {
  return e == null ? e === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
}
const f0 = "[object RegExp]", Yv = "[object String]", Vv = "[object Number]", Xv = "[object Boolean]", Zv = "[object Arguments]", d0 = "[object Symbol]", v0 = "[object Date]", h0 = "[object Map]", p0 = "[object Set]", m0 = "[object Array]", g0 = "[object ArrayBuffer]", y0 = "[object Object]", b0 = "[object DataView]", w0 = "[object Uint8Array]", x0 = "[object Uint8ClampedArray]", P0 = "[object Uint16Array]", O0 = "[object Uint32Array]", A0 = "[object Int8Array]", S0 = "[object Int16Array]", _0 = "[object Int32Array]", k0 = "[object Float32Array]", E0 = "[object Float64Array]", Ws = typeof globalThis == "object" && globalThis || typeof window == "object" && window || typeof self == "object" && self || typeof global == "object" && global || /* @__PURE__ */ (function() {
  return this;
})();
function C0(e) {
  return typeof Ws.Buffer < "u" && Ws.Buffer.isBuffer(e);
}
function j0(e, t) {
  return wr(e, void 0, e, /* @__PURE__ */ new Map(), t);
}
function wr(e, t, r, n = /* @__PURE__ */ new Map(), i = void 0) {
  const a = i?.(e, t, r, n);
  if (a !== void 0) return a;
  if (il(e)) return e;
  if (n.has(e)) return n.get(e);
  if (Array.isArray(e)) {
    const o = new Array(e.length);
    n.set(e, o);
    for (let l = 0; l < e.length; l++) o[l] = wr(e[l], l, r, n, i);
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
    for (const [l, u] of e) o.set(l, wr(u, l, r, n, i));
    return o;
  }
  if (e instanceof Set) {
    const o = /* @__PURE__ */ new Set();
    n.set(e, o);
    for (const l of e) o.add(wr(l, void 0, r, n, i));
    return o;
  }
  if (C0(e)) return e.subarray();
  if (s0(e)) {
    const o = new (Object.getPrototypeOf(e)).constructor(e.length);
    n.set(e, o);
    for (let l = 0; l < e.length; l++) o[l] = wr(e[l], l, r, n, i);
    return o;
  }
  if (e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer) return e.slice(0);
  if (e instanceof DataView) {
    const o = new DataView(e.buffer.slice(0), e.byteOffset, e.byteLength);
    return n.set(e, o), ct(o, e, r, n, i), o;
  }
  if (typeof File < "u" && e instanceof File) {
    const o = new File([e], e.name, { type: e.type });
    return n.set(e, o), ct(o, e, r, n, i), o;
  }
  if (typeof Blob < "u" && e instanceof Blob) {
    const o = new Blob([e], { type: e.type });
    return n.set(e, o), ct(o, e, r, n, i), o;
  }
  if (e instanceof Error) {
    const o = structuredClone(e);
    return n.set(e, o), o.message = e.message, o.name = e.name, o.stack = e.stack, o.cause = e.cause, o.constructor = e.constructor, ct(o, e, r, n, i), o;
  }
  if (e instanceof Boolean) {
    const o = new Boolean(e.valueOf());
    return n.set(e, o), ct(o, e, r, n, i), o;
  }
  if (e instanceof Number) {
    const o = new Number(e.valueOf());
    return n.set(e, o), ct(o, e, r, n, i), o;
  }
  if (e instanceof String) {
    const o = new String(e.valueOf());
    return n.set(e, o), ct(o, e, r, n, i), o;
  }
  if (typeof e == "object" && I0(e)) {
    const o = Object.create(Object.getPrototypeOf(e));
    return n.set(e, o), ct(o, e, r, n, i), o;
  }
  return e;
}
function ct(e, t, r = e, n, i) {
  const a = [...Object.keys(t), ...c0(t)];
  for (let o = 0; o < a.length; o++) {
    const l = a[o], u = Object.getOwnPropertyDescriptor(e, l);
    (u == null || u.writable) && (e[l] = wr(t[l], l, r, n, i));
  }
}
function I0(e) {
  switch (ou(e)) {
    case Zv:
    case m0:
    case g0:
    case b0:
    case Xv:
    case v0:
    case k0:
    case E0:
    case A0:
    case S0:
    case _0:
    case h0:
    case Vv:
    case y0:
    case f0:
    case p0:
    case Yv:
    case d0:
    case w0:
    case x0:
    case P0:
    case O0:
      return !0;
    default:
      return !1;
  }
}
function M0(e) {
  return wr(e, void 0, e, /* @__PURE__ */ new Map(), void 0);
}
function Ti(e, t) {
  return e === t || Number.isNaN(e) && Number.isNaN(t);
}
function Qv(e) {
  return e !== null && (typeof e == "object" || typeof e == "function");
}
function Jv(e, t, r) {
  return typeof r != "function" ? Jv(e, t, () => {
  }) : al(e, t, function n(i, a, o, l, u, s) {
    const c = r(i, a, o, l, u, s);
    return c !== void 0 ? !!c : al(i, a, n, s, !1);
  }, /* @__PURE__ */ new Map(), !0);
}
function al(e, t, r, n, i = !1) {
  if (t === e) return !0;
  switch (typeof t) {
    case "object":
      return T0(e, t, r, n);
    case "function":
      return Object.keys(t).length > 0 ? al(e, { ...t }, r, n, i) : Ti(e, t);
    default:
      return Qv(e) && i ? typeof t == "string" ? t === "" : !0 : Ti(e, t);
  }
}
function T0(e, t, r, n) {
  if (t == null) return !0;
  if (Array.isArray(t)) return eh(e, t, r, n);
  if (t instanceof Map) return D0(e, t, r, n);
  if (t instanceof Set) return N0(e, t, r, n);
  const i = Object.keys(t);
  if (e == null || il(e)) return i.length === 0;
  if (i.length === 0) return !0;
  if (n?.has(t)) return n.get(t) === e;
  n?.set(t, e);
  try {
    for (let a = 0; a < i.length; a++) {
      const o = i[a];
      if (!il(e) && !(o in e) || t[o] === void 0 && e[o] !== void 0 || t[o] === null && e[o] !== null || !r(e[o], t[o], o, e, t, n)) return !1;
    }
    return !0;
  } finally {
    n?.delete(t);
  }
}
function D0(e, t, r, n) {
  if (t.size === 0) return !0;
  if (!(e instanceof Map)) return !1;
  for (const [i, a] of t.entries()) if (r(e.get(i), a, i, e, t, n) === !1) return !1;
  return !0;
}
function eh(e, t, r, n) {
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
function N0(e, t, r, n) {
  return t.size === 0 ? !0 : e instanceof Set ? eh([...e], [...t], r, n) : !1;
}
function th(e, t) {
  return Jv(e, t, () => {
  });
}
function $0(e) {
  return e = M0(e), (t) => th(t, e);
}
function L0(e, t) {
  return j0(e, (r, n, i, a) => {
    if (typeof e == "object") {
      if (ou(e) === "[object Object]" && typeof e.constructor != "function") {
        const o = {};
        return a.set(e, o), ct(o, e, i, a), o;
      }
      switch (Object.prototype.toString.call(e)) {
        case Vv:
        case Yv:
        case Xv: {
          const o = new e.constructor(e?.valueOf());
          return ct(o, e), o;
        }
        case Zv: {
          const o = {};
          return ct(o, e), o.length = e.length, o[Symbol.iterator] = e[Symbol.iterator], o;
        }
        default:
          return;
      }
    }
  });
}
function R0(e) {
  return L0(e);
}
const z0 = /^(?:0|[1-9]\d*)$/;
function rh(e, t = Number.MAX_SAFE_INTEGER) {
  switch (typeof e) {
    case "number":
      return Number.isInteger(e) && e >= 0 && e < t;
    case "symbol":
      return !1;
    case "string":
      return z0.test(e);
  }
}
function B0(e) {
  return e !== null && typeof e == "object" && ou(e) === "[object Arguments]";
}
function F0(e, t) {
  let r;
  if (Array.isArray(t) ? r = t : typeof t == "string" && Rv(t) && e?.[t] == null ? r = iu(t) : r = [t], r.length === 0) return !1;
  let n = e;
  for (let i = 0; i < r.length; i++) {
    const a = r[i];
    if ((n == null || !Object.hasOwn(n, a)) && !((Array.isArray(n) || B0(n)) && rh(a) && a < n.length))
      return !1;
    n = n[a];
  }
  return !0;
}
function W0(e, t) {
  switch (typeof e) {
    case "object":
      Object.is(e?.valueOf(), -0) && (e = "-0");
      break;
    case "number":
      e = nu(e);
      break;
  }
  return t = R0(t), function(r) {
    const n = $r(r, e);
    return n === void 0 ? F0(r, e) : t === void 0 ? n === void 0 : th(n, t);
  };
}
function U0(e) {
  if (e == null) return qv;
  switch (typeof e) {
    case "function":
      return e;
    case "object":
      return Array.isArray(e) && e.length === 2 ? W0(e[0], e[1]) : $0(e);
    case "string":
    case "symbol":
    case "number":
      return u0(e);
  }
}
function K0(e) {
  return Number.isSafeInteger(e) && e >= 0;
}
function nh(e) {
  return e != null && typeof e != "function" && K0(e.length);
}
function H0(e) {
  return typeof e == "object" && e !== null;
}
function G0(e) {
  return H0(e) && nh(e);
}
function Us(e, t = qv) {
  return G0(e) ? o0(Array.from(e), l0(U0(t), 1)) : [];
}
function ih(e, t, r) {
  return t === !0 ? Us(e, r) : typeof t == "function" ? Us(e, t) : e;
}
var Po = { exports: {} }, Oo = {};
var Ks;
function q0() {
  if (Ks) return Oo;
  Ks = 1;
  var e = gv(), t = Fy();
  function r(s, c) {
    return s === c && (s !== 0 || 1 / s === 1 / c) || s !== s && c !== c;
  }
  var n = typeof Object.is == "function" ? Object.is : r, i = t.useSyncExternalStore, a = e.useRef, o = e.useEffect, l = e.useMemo, u = e.useDebugValue;
  return Oo.useSyncExternalStoreWithSelector = function(s, c, f, d, v) {
    var p = a(null);
    if (p.current === null) {
      var g = { hasValue: !1, value: null };
      p.current = g;
    } else g = p.current;
    p = l(
      function() {
        function y(P) {
          if (!w) {
            if (w = !0, b = P, P = d(P), v !== void 0 && g.hasValue) {
              var _ = g.value;
              if (v(_, P))
                return x = _;
            }
            return x = P;
          }
          if (_ = x, n(b, P)) return _;
          var A = d(P);
          return v !== void 0 && v(_, A) ? (b = P, _) : (b = P, x = A);
        }
        var w = !1, b, x, O = f === void 0 ? null : f;
        return [
          function() {
            return y(c());
          },
          O === null ? void 0 : function() {
            return y(O());
          }
        ];
      },
      [c, f, d, v]
    );
    var m = i(s, p[0], p[1]);
    return o(
      function() {
        g.hasValue = !0, g.value = m;
      },
      [m]
    ), u(m), m;
  }, Oo;
}
var Hs;
function Y0() {
  return Hs || (Hs = 1, Po.exports = q0()), Po.exports;
}
var V0 = Y0(), lu = /* @__PURE__ */ h.createContext(null), X0 = (e) => e, ce = () => {
  var e = h.useContext(lu);
  return e ? e.store.dispatch : X0;
}, Di = () => {
}, Z0 = () => Di, Q0 = (e, t) => e === t;
function z(e) {
  var t = h.useContext(lu), r = h.useMemo(() => t ? (n) => {
    if (n != null)
      return e(n);
  } : Di, [t, e]);
  return V0.useSyncExternalStoreWithSelector(t ? t.subscription.addNestedSub : Z0, t ? t.store.getState : Di, t ? t.store.getState : Di, r, Q0);
}
function J0(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function ew(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object")
    throw new TypeError(t);
}
function tw(e, t = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((r) => typeof r == "function")) {
    const r = e.map(
      (n) => typeof n == "function" ? `function ${n.name || "unnamed"}()` : typeof n
    ).join(", ");
    throw new TypeError(`${t}[${r}]`);
  }
}
var Gs = (e) => Array.isArray(e) ? e : [e];
function rw(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return tw(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function nw(e, t) {
  const r = [], { length: n } = e;
  for (let i = 0; i < n; i++)
    r.push(e[i].apply(null, t));
  return r;
}
var iw = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, aw = typeof WeakRef < "u" ? WeakRef : iw, ow = 0, qs = 1;
function mi() {
  return {
    s: ow,
    v: void 0,
    o: null,
    p: null
  };
}
function ah(e, t = {}) {
  let r = mi();
  const { resultEqualityCheck: n } = t;
  let i, a = 0;
  function o() {
    let l = r;
    const { length: u } = arguments;
    for (let f = 0, d = u; f < d; f++) {
      const v = arguments[f];
      if (typeof v == "function" || typeof v == "object" && v !== null) {
        let p = l.o;
        p === null && (l.o = p = /* @__PURE__ */ new WeakMap());
        const g = p.get(v);
        g === void 0 ? (l = mi(), p.set(v, l)) : l = g;
      } else {
        let p = l.p;
        p === null && (l.p = p = /* @__PURE__ */ new Map());
        const g = p.get(v);
        g === void 0 ? (l = mi(), p.set(v, l)) : l = g;
      }
    }
    const s = l;
    let c;
    if (l.s === qs)
      c = l.v;
    else if (c = e.apply(null, arguments), a++, n) {
      const f = i?.deref?.() ?? i;
      f != null && n(f, c) && (c = f, a !== 0 && a--), i = typeof c == "object" && c !== null || typeof c == "function" ? new aw(c) : c;
    }
    return s.s = qs, s.v = c, c;
  }
  return o.clearCache = () => {
    r = mi(), o.resetResultsCount();
  }, o.resultsCount = () => a, o.resetResultsCount = () => {
    a = 0;
  }, o;
}
function lw(e, ...t) {
  const r = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e, n = (...i) => {
    let a = 0, o = 0, l, u = {}, s = i.pop();
    typeof s == "object" && (u = s, s = i.pop()), J0(
      s,
      `createSelector expects an output function after the inputs, but received: [${typeof s}]`
    );
    const c = {
      ...r,
      ...u
    }, {
      memoize: f,
      memoizeOptions: d = [],
      argsMemoize: v = ah,
      argsMemoizeOptions: p = []
    } = c, g = Gs(d), m = Gs(p), y = rw(i), w = f(function() {
      return a++, s.apply(
        null,
        arguments
      );
    }, ...g), b = v(function() {
      o++;
      const O = nw(
        y,
        arguments
      );
      return l = w.apply(null, O), l;
    }, ...m);
    return Object.assign(b, {
      resultFunc: s,
      memoizedResultFunc: w,
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
      argsMemoize: v
    });
  };
  return Object.assign(n, {
    withTypes: () => n
  }), n;
}
var S = /* @__PURE__ */ lw(ah), uw = Object.assign(
  (e, t = S) => {
    ew(
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
  { withTypes: () => uw }
);
function sw(e, t = 1) {
  const r = [], n = Math.floor(t), i = (a, o) => {
    for (let l = 0; l < a.length; l++) {
      const u = a[l];
      Array.isArray(u) && o < n ? i(u, o + 1) : r.push(u);
    }
  };
  return i(e, 0), r;
}
function ol(e, t, r) {
  return Qv(r) && (typeof t == "number" && nh(r) && rh(t) && t < r.length || typeof t == "string" && t in r) ? Ti(r[t], e) : !1;
}
function Ys(e) {
  return typeof e == "symbol" ? 1 : e === null ? 2 : e === void 0 ? 3 : e !== e ? 4 : 0;
}
const cw = (e, t, r) => {
  if (e !== t) {
    const n = Ys(e), i = Ys(t);
    if (n === i && n === 0) {
      if (e < t) return r === "desc" ? 1 : -1;
      if (e > t) return r === "desc" ? -1 : 1;
    }
    return r === "desc" ? i - n : n - i;
  }
  return 0;
};
function oh(e) {
  return typeof e == "symbol" || e instanceof Symbol;
}
const fw = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, dw = /^\w*$/;
function vw(e, t) {
  return Array.isArray(e) ? !1 : typeof e == "number" || typeof e == "boolean" || e == null || oh(e) ? !0 : typeof e == "string" && (dw.test(e) || !fw.test(e)) || t != null;
}
function hw(e, t, r, n) {
  if (e == null) return [];
  r = r, Array.isArray(e) || (e = Object.values(e)), Array.isArray(t) || (t = t == null ? [null] : [t]), t.length === 0 && (t = [null]), Array.isArray(r) || (r = r == null ? [] : [r]), r = r.map((l) => String(l));
  const i = (l, u) => {
    let s = l;
    for (let c = 0; c < u.length && s != null; ++c) s = s[u[c]];
    return s;
  }, a = (l, u) => u == null || l == null ? u : typeof l == "object" && "key" in l ? Object.hasOwn(u, l.key) ? u[l.key] : i(u, l.path) : typeof l == "function" ? l(u) : Array.isArray(l) ? i(u, l) : typeof u == "object" ? u[l] : u, o = t.map((l) => (Array.isArray(l) && l.length === 1 && (l = l[0]), l == null || typeof l == "function" || Array.isArray(l) || vw(l) ? l : {
    key: l,
    path: iu(l)
  }));
  return e.map((l) => ({
    original: l,
    criteria: o.map((u) => a(u, l))
  })).slice().sort((l, u) => {
    for (let s = 0; s < o.length; s++) {
      const c = cw(l.criteria[s], u.criteria[s], r[s]);
      if (c !== 0) return c;
    }
    return 0;
  }).map((l) => l.original);
}
function Ra(e, ...t) {
  const r = t.length;
  return r > 1 && ol(e, t[0], t[1]) ? t = [] : r > 2 && ol(t[0], t[1], t[2]) && (t = [t[0]]), hw(e, sw(t), ["asc"]);
}
var lh = (e) => e.legend.settings, pw = (e) => e.legend.size, mw = (e) => e.legend.payload, gw = S([mw, lh], (e, t) => {
  var {
    itemSorter: r
  } = t, n = e.flat(1);
  return r ? Ra(n, r) : n;
});
function yw() {
  return z(gw);
}
var gi = 1;
function uh() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], [t, r] = h.useState({
    height: 0,
    left: 0,
    top: 0,
    width: 0
  }), n = h.useCallback(
    (i) => {
      if (i != null) {
        var a = i.getBoundingClientRect(), o = {
          height: a.height,
          left: a.left,
          top: a.top,
          width: a.width
        };
        (Math.abs(o.height - t.height) > gi || Math.abs(o.left - t.left) > gi || Math.abs(o.top - t.top) > gi || Math.abs(o.width - t.width) > gi) && r({
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
var bw = typeof Symbol == "function" && Symbol.observable || "@@observable", Vs = bw, Ao = () => Math.random().toString(36).substring(7).split("").join("."), ww = {
  INIT: `@@redux/INIT${/* @__PURE__ */ Ao()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ Ao()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${Ao()}`
}, Hi = ww;
function uu(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function sh(e, t, r) {
  if (typeof e != "function")
    throw new Error(_e(2));
  if (typeof t == "function" && typeof r == "function" || typeof r == "function" && typeof arguments[3] == "function")
    throw new Error(_e(0));
  if (typeof t == "function" && typeof r > "u" && (r = t, t = void 0), typeof r < "u") {
    if (typeof r != "function")
      throw new Error(_e(1));
    return r(sh)(e, t);
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
    const w = l++;
    return o.set(w, m), function() {
      if (y) {
        if (u)
          throw new Error(_e(6));
        y = !1, s(), o.delete(w), a = null;
      }
    };
  }
  function d(m) {
    if (!uu(m))
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
    return (a = o).forEach((w) => {
      w();
    }), m;
  }
  function v(m) {
    if (typeof m != "function")
      throw new Error(_e(10));
    n = m, d({
      type: Hi.REPLACE
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
        function w() {
          const x = y;
          x.next && x.next(c());
        }
        return w(), {
          unsubscribe: m(w)
        };
      },
      [Vs]() {
        return this;
      }
    };
  }
  return d({
    type: Hi.INIT
  }), {
    dispatch: d,
    subscribe: f,
    getState: c,
    replaceReducer: v,
    [Vs]: p
  };
}
function xw(e) {
  Object.keys(e).forEach((t) => {
    const r = e[t];
    if (typeof r(void 0, {
      type: Hi.INIT
    }) > "u")
      throw new Error(_e(12));
    if (typeof r(void 0, {
      type: Hi.PROBE_UNKNOWN_ACTION()
    }) > "u")
      throw new Error(_e(13));
  });
}
function ch(e) {
  const t = Object.keys(e), r = {};
  for (let a = 0; a < t.length; a++) {
    const o = t[a];
    typeof e[o] == "function" && (r[o] = e[o]);
  }
  const n = Object.keys(r);
  let i;
  try {
    xw(r);
  } catch (a) {
    i = a;
  }
  return function(o = {}, l) {
    if (i)
      throw i;
    let u = !1;
    const s = {};
    for (let c = 0; c < n.length; c++) {
      const f = n[c], d = r[f], v = o[f], p = d(v, l);
      if (typeof p > "u")
        throw l && l.type, new Error(_e(14));
      s[f] = p, u = u || p !== v;
    }
    return u = u || n.length !== Object.keys(o).length, u ? s : o;
  };
}
function Gi(...e) {
  return e.length === 0 ? (t) => t : e.length === 1 ? e[0] : e.reduce((t, r) => (...n) => t(r(...n)));
}
function Pw(...e) {
  return (t) => (r, n) => {
    const i = t(r, n);
    let a = () => {
      throw new Error(_e(15));
    };
    const o = {
      getState: i.getState,
      dispatch: (u, ...s) => a(u, ...s)
    }, l = e.map((u) => u(o));
    return a = Gi(...l)(i.dispatch), {
      ...i,
      dispatch: a
    };
  };
}
function fh(e) {
  return uu(e) && "type" in e && typeof e.type == "string";
}
var dh = Symbol.for("immer-nothing"), Xs = Symbol.for("immer-draftable"), Ne = Symbol.for("immer-state");
function ft(e, ...t) {
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var Ve = Object, tn = Ve.getPrototypeOf, qi = "constructor", za = "prototype", ll = "configurable", Yi = "enumerable", Ni = "writable", Nn = "value", Bt = (e) => !!e && !!e[Ne];
function lt(e) {
  return e ? vh(e) || Fa(e) || !!e[Xs] || !!e[qi]?.[Xs] || Wa(e) || Ua(e) : !1;
}
var Ow = Ve[za][qi].toString(), Zs = /* @__PURE__ */ new WeakMap();
function vh(e) {
  if (!e || !su(e))
    return !1;
  const t = tn(e);
  if (t === null || t === Ve[za])
    return !0;
  const r = Ve.hasOwnProperty.call(t, qi) && t[qi];
  if (r === Object)
    return !0;
  if (!Yr(r))
    return !1;
  let n = Zs.get(r);
  return n === void 0 && (n = Function.toString.call(r), Zs.set(r, n)), n === Ow;
}
function Ba(e, t, r = !0) {
  Zn(e) === 0 ? (r ? Reflect.ownKeys(e) : Ve.keys(e)).forEach((i) => {
    t(i, e[i], e);
  }) : e.forEach((n, i) => t(i, n, e));
}
function Zn(e) {
  const t = e[Ne];
  return t ? t.type_ : Fa(e) ? 1 : Wa(e) ? 2 : Ua(e) ? 3 : 0;
}
var So = (e, t, r = Zn(e)) => r === 2 ? e.has(t) : Ve[za].hasOwnProperty.call(e, t), ul = (e, t, r = Zn(e)) => (
  // @ts-ignore
  r === 2 ? e.get(t) : e[t]
), Vi = (e, t, r, n = Zn(e)) => {
  n === 2 ? e.set(t, r) : n === 3 ? e.add(r) : e[t] = r;
};
function Aw(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
var Fa = Array.isArray, Wa = (e) => e instanceof Map, Ua = (e) => e instanceof Set, su = (e) => typeof e == "object", Yr = (e) => typeof e == "function", _o = (e) => typeof e == "boolean";
function Sw(e) {
  const t = +e;
  return Number.isInteger(t) && String(t) === e;
}
var Tt = (e) => e.copy_ || e.base_, cu = (e) => e.modified_ ? e.copy_ : e.base_;
function sl(e, t) {
  if (Wa(e))
    return new Map(e);
  if (Ua(e))
    return new Set(e);
  if (Fa(e))
    return Array[za].slice.call(e);
  const r = vh(e);
  if (t === !0 || t === "class_only" && !r) {
    const n = Ve.getOwnPropertyDescriptors(e);
    delete n[Ne];
    let i = Reflect.ownKeys(n);
    for (let a = 0; a < i.length; a++) {
      const o = i[a], l = n[o];
      l[Ni] === !1 && (l[Ni] = !0, l[ll] = !0), (l.get || l.set) && (n[o] = {
        [ll]: !0,
        [Ni]: !0,
        // could live with !!desc.set as well here...
        [Yi]: l[Yi],
        [Nn]: e[o]
      });
    }
    return Ve.create(tn(e), n);
  } else {
    const n = tn(e);
    if (n !== null && r)
      return { ...e };
    const i = Ve.create(n);
    return Ve.assign(i, e);
  }
}
function fu(e, t = !1) {
  return Ka(e) || Bt(e) || !lt(e) || (Zn(e) > 1 && Ve.defineProperties(e, {
    set: yi,
    add: yi,
    clear: yi,
    delete: yi
  }), Ve.freeze(e), t && Ba(
    e,
    (r, n) => {
      fu(n, !0);
    },
    !1
  )), e;
}
function _w() {
  ft(2);
}
var yi = {
  [Nn]: _w
};
function Ka(e) {
  return e === null || !su(e) ? !0 : Ve.isFrozen(e);
}
var Xi = "MapSet", cl = "Patches", Qs = "ArrayMethods", hh = {};
function Ir(e) {
  const t = hh[e];
  return t || ft(0, e), t;
}
var Js = (e) => !!hh[e], $n, ph = () => $n, kw = (e, t) => ({
  drafts_: [],
  parent_: e,
  immer_: t,
  // Whenever the modified draft contains a draft from another scope, we
  // need to prevent auto-freezing so the unowned draft can be finalized.
  canAutoFreeze_: !0,
  unfinalizedDrafts_: 0,
  handledSet_: /* @__PURE__ */ new Set(),
  processedForPatches_: /* @__PURE__ */ new Set(),
  mapSetPlugin_: Js(Xi) ? Ir(Xi) : void 0,
  arrayMethodsPlugin_: Js(Qs) ? Ir(Qs) : void 0
});
function ec(e, t) {
  t && (e.patchPlugin_ = Ir(cl), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function fl(e) {
  dl(e), e.drafts_.forEach(Ew), e.drafts_ = null;
}
function dl(e) {
  e === $n && ($n = e.parent_);
}
var tc = (e) => $n = kw($n, e);
function Ew(e) {
  const t = e[Ne];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function rc(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const r = t.drafts_[0];
  if (e !== void 0 && e !== r) {
    r[Ne].modified_ && (fl(t), ft(4)), lt(e) && (e = nc(t, e));
    const { patchPlugin_: i } = t;
    i && i.generateReplacementPatches_(
      r[Ne].base_,
      e,
      t
    );
  } else
    e = nc(t, r);
  return Cw(t, e, !0), fl(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== dh ? e : void 0;
}
function nc(e, t) {
  if (Ka(t))
    return t;
  const r = t[Ne];
  if (!r)
    return Zi(t, e.handledSet_, e);
  if (!Ha(r, e))
    return t;
  if (!r.modified_)
    return r.base_;
  if (!r.finalized_) {
    const { callbacks_: n } = r;
    if (n)
      for (; n.length > 0; )
        n.pop()(e);
    yh(r, e);
  }
  return r.copy_;
}
function Cw(e, t, r = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && fu(t, r);
}
function mh(e) {
  e.finalized_ = !0, e.scope_.unfinalizedDrafts_--;
}
var Ha = (e, t) => e.scope_ === t, jw = [];
function gh(e, t, r, n) {
  const i = Tt(e), a = e.type_;
  if (n !== void 0 && ul(i, n, a) === t) {
    Vi(i, n, r, a);
    return;
  }
  if (!e.draftLocations_) {
    const l = e.draftLocations_ = /* @__PURE__ */ new Map();
    Ba(i, (u, s) => {
      if (Bt(s)) {
        const c = l.get(s) || [];
        c.push(u), l.set(s, c);
      }
    });
  }
  const o = e.draftLocations_.get(t) ?? jw;
  for (const l of o)
    Vi(i, l, r, a);
}
function Iw(e, t, r) {
  e.callbacks_.push(function(i) {
    const a = t;
    if (!a || !Ha(a, i))
      return;
    i.mapSetPlugin_?.fixSetContents(a);
    const o = cu(a);
    gh(e, a.draft_ ?? a, o, r), yh(a, i);
  });
}
function yh(e, t) {
  if (e.modified_ && !e.finalized_ && (e.type_ === 3 || e.type_ === 1 && e.allIndicesReassigned_ || (e.assigned_?.size ?? 0) > 0)) {
    const { patchPlugin_: n } = t;
    if (n) {
      const i = n.getPath(e);
      i && n.generatePatches_(e, i, t);
    }
    mh(e);
  }
}
function Mw(e, t, r) {
  const { scope_: n } = e;
  if (Bt(r)) {
    const i = r[Ne];
    Ha(i, n) && i.callbacks_.push(function() {
      $i(e);
      const o = cu(i);
      gh(e, r, o, t);
    });
  } else lt(r) && e.callbacks_.push(function() {
    const a = Tt(e);
    e.type_ === 3 ? a.has(r) && Zi(r, n.handledSet_, n) : ul(a, t, e.type_) === r && n.drafts_.length > 1 && (e.assigned_.get(t) ?? !1) === !0 && e.copy_ && Zi(
      ul(e.copy_, t, e.type_),
      n.handledSet_,
      n
    );
  });
}
function Zi(e, t, r) {
  return !r.immer_.autoFreeze_ && r.unfinalizedDrafts_ < 1 || Bt(e) || t.has(e) || !lt(e) || Ka(e) || (t.add(e), Ba(e, (n, i) => {
    if (Bt(i)) {
      const a = i[Ne];
      if (Ha(a, r)) {
        const o = cu(a);
        Vi(e, n, o, e.type_), mh(a);
      }
    } else lt(i) && Zi(i, t, r);
  })), e;
}
function Tw(e, t) {
  const r = Fa(e), n = {
    type_: r ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : ph(),
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
  let i = n, a = Qi;
  r && (i = [n], a = Ln);
  const { revoke: o, proxy: l } = Proxy.revocable(i, a);
  return n.draft_ = l, n.revoke_ = o, [l, n];
}
var Qi = {
  get(e, t) {
    if (t === Ne)
      return e;
    let r = e.scope_.arrayMethodsPlugin_;
    const n = e.type_ === 1 && typeof t == "string";
    if (n && r?.isArrayOperationMethod(t))
      return r.createMethodInterceptor(e, t);
    const i = Tt(e);
    if (!So(i, t, e.type_))
      return Nw(e, i, t);
    const a = i[t];
    if (e.finalized_ || !lt(a) || n && e.operationMethod && r?.isMutatingArrayMethod(
      e.operationMethod
    ) && Sw(t))
      return a;
    if (a === ko(e.base_, t) || Dw(e, t, a)) {
      $i(e);
      const o = e.type_ === 1 ? +t : t, l = hl(e.scope_, a, e, o);
      return e.copy_[o] = l;
    }
    return a;
  },
  has(e, t) {
    return t in Tt(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(Tt(e));
  },
  set(e, t, r) {
    const n = bh(Tt(e), t);
    if (n?.set)
      return n.set.call(e.draft_, r), !0;
    if (!e.modified_) {
      const i = ko(Tt(e), t), a = i?.[Ne];
      if (a && a.base_ === r)
        return e.copy_[t] = r, e.assigned_.set(t, !1), !0;
      if (Aw(r, i) && (r !== void 0 || So(e.base_, t, e.type_)))
        return !0;
      $i(e), vl(e);
    }
    return e.copy_[t] === r && // special case: handle new props with value 'undefined'
    (r !== void 0 || So(e.copy_, t, e.type_)) || // special case: NaN
    Number.isNaN(r) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = r, e.assigned_.set(t, !0), Mw(e, t, r)), !0;
  },
  deleteProperty(e, t) {
    return $i(e), ko(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_.set(t, !1), vl(e)) : e.assigned_.delete(t), e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const r = Tt(e), n = Reflect.getOwnPropertyDescriptor(r, t);
    return n && {
      [Ni]: !0,
      [ll]: e.type_ !== 1 || t !== "length",
      [Yi]: n[Yi],
      [Nn]: r[t]
    };
  },
  defineProperty() {
    ft(11);
  },
  getPrototypeOf(e) {
    return tn(e.base_);
  },
  setPrototypeOf() {
    ft(12);
  }
}, Ln = {};
for (let e in Qi) {
  let t = Qi[e];
  Ln[e] = function() {
    const r = arguments;
    return r[0] = r[0][0], t.apply(this, r);
  };
}
Ln.deleteProperty = function(e, t) {
  return Ln.set.call(this, e, t, void 0);
};
Ln.set = function(e, t, r) {
  return Qi.set.call(this, e[0], t, r, e[0]);
};
function ko(e, t) {
  const r = e[Ne];
  return (r ? Tt(r) : e)[t];
}
function Dw(e, t, r) {
  return e.type_ !== 1 || !e.allIndicesReassigned_ || e.assigned_?.get(t) || !lt(r) || r[Ne] ? !1 : e.baseRefs_.has(r);
}
function Nw(e, t, r) {
  const n = bh(t, r);
  return n ? Nn in n ? n[Nn] : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    n.get?.call(e.draft_)
  ) : void 0;
}
function bh(e, t) {
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
function vl(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && vl(e.parent_));
}
function $i(e) {
  e.copy_ || (e.assigned_ = /* @__PURE__ */ new Map(), e.copy_ = sl(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var $w = class {
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
      Yr(n) || ft(6), i !== void 0 && !Yr(i) && ft(7);
      let a;
      if (lt(r)) {
        const o = tc(this), l = hl(o, r, void 0);
        let u = !0;
        try {
          a = n(l), u = !1;
        } finally {
          u ? fl(o) : dl(o);
        }
        return ec(o, i), rc(a, o);
      } else if (!r || !su(r)) {
        if (a = n(r), a === void 0 && (a = r), a === dh && (a = void 0), this.autoFreeze_ && fu(a, !0), i) {
          const o = [], l = [];
          Ir(cl).generateReplacementPatches_(r, a, {
            patches_: o,
            inversePatches_: l
          }), i(o, l);
        }
        return a;
      } else
        ft(1, r);
    }, this.produceWithPatches = (r, n) => {
      if (Yr(r))
        return (l, ...u) => this.produceWithPatches(l, (s) => r(s, ...u));
      let i, a;
      return [this.produce(r, n, (l, u) => {
        i = l, a = u;
      }), i, a];
    }, _o(t?.autoFreeze) && this.setAutoFreeze(t.autoFreeze), _o(t?.useStrictShallowCopy) && this.setUseStrictShallowCopy(t.useStrictShallowCopy), _o(t?.useStrictIteration) && this.setUseStrictIteration(t.useStrictIteration);
  }
  createDraft(t) {
    lt(t) || ft(8), Bt(t) && (t = at(t));
    const r = tc(this), n = hl(r, t, void 0);
    return n[Ne].isManual_ = !0, dl(r), n;
  }
  finishDraft(t, r) {
    const n = t && t[Ne];
    (!n || !n.isManual_) && ft(9);
    const { scope_: i } = n;
    return ec(i, r), rc(void 0, i);
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
    const i = Ir(cl).applyPatches_;
    return Bt(t) ? i(t, r) : this.produce(
      t,
      (a) => i(a, r)
    );
  }
};
function hl(e, t, r, n) {
  const [i, a] = Wa(t) ? Ir(Xi).proxyMap_(t, r) : Ua(t) ? Ir(Xi).proxySet_(t, r) : Tw(t, r);
  return (r?.scope_ ?? ph()).drafts_.push(i), a.callbacks_ = r?.callbacks_ ?? [], a.key_ = n, r && n !== void 0 ? Iw(r, a, n) : a.callbacks_.push(function(u) {
    u.mapSetPlugin_?.fixSetContents(a);
    const { patchPlugin_: s } = u;
    a.modified_ && s && s.generatePatches_(a, [], u);
  }), i;
}
function at(e) {
  return Bt(e) || ft(10, e), wh(e);
}
function wh(e) {
  if (!lt(e) || Ka(e))
    return e;
  const t = e[Ne];
  let r, n = !0;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, r = sl(e, t.scope_.immer_.useStrictShallowCopy_), n = t.scope_.immer_.shouldUseStrictIteration();
  } else
    r = sl(e, !0);
  return Ba(
    r,
    (i, a) => {
      Vi(r, i, wh(a));
    },
    n
  ), t && (t.finalized_ = !1), r;
}
var Lw = new $w(), xh = Lw.produce;
function Ph(e) {
  return ({ dispatch: r, getState: n }) => (i) => (a) => typeof a == "function" ? a(r, n, e) : i(a);
}
var Rw = Ph(), zw = Ph, Bw = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length !== 0)
    return typeof arguments[0] == "object" ? Gi : Gi.apply(null, arguments);
};
function Qe(e, t) {
  function r(...n) {
    if (t) {
      let i = t(...n);
      if (!i)
        throw new Error(Xe(0));
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
  return r.toString = () => `${e}`, r.type = e, r.match = (n) => fh(n) && n.type === e, r;
}
var Oh = class Cn extends Array {
  constructor(...t) {
    super(...t), Object.setPrototypeOf(this, Cn.prototype);
  }
  static get [Symbol.species]() {
    return Cn;
  }
  concat(...t) {
    return super.concat.apply(this, t);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0]) ? new Cn(...t[0].concat(this)) : new Cn(...t.concat(this));
  }
};
function ic(e) {
  return lt(e) ? xh(e, () => {
  }) : e;
}
function bi(e, t, r) {
  return e.has(t) ? e.get(t) : e.set(t, r(t)).get(t);
}
function Fw(e) {
  return typeof e == "boolean";
}
var Ww = () => function(t) {
  const {
    thunk: r = !0,
    immutableCheck: n = !0,
    serializableCheck: i = !0,
    actionCreatorCheck: a = !0
  } = t ?? {};
  let o = new Oh();
  return r && (Fw(r) ? o.push(Rw) : o.push(zw(r.extraArgument))), o;
}, Ah = "RTK_autoBatch", ie = () => (e) => ({
  payload: e,
  meta: {
    [Ah]: !0
  }
}), ac = (e) => (t) => {
  setTimeout(t, e);
}, Uw = (e, t) => (r) => {
  let n = !1;
  const i = () => {
    n || (n = !0, cancelAnimationFrame(a), clearTimeout(o), r());
  }, a = e(i), o = setTimeout(i, t);
}, Sh = (e = {
  type: "raf"
}) => (t) => (...r) => {
  const n = t(...r);
  let i = !0, a = !1, o = !1;
  const l = /* @__PURE__ */ new Set(), u = e.type === "tick" ? queueMicrotask : e.type === "raf" ? (
    // requestAnimationFrame won't exist in SSR environments. Fall back to a vague approximation just to keep from erroring.
    typeof window < "u" && window.requestAnimationFrame ? Uw(window.requestAnimationFrame, 100) : ac(10)
  ) : e.type === "callback" ? e.queueNotification : ac(e.timeout), s = () => {
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
        return i = !c?.meta?.[Ah], a = !i, a && (o || (o = !0, u(s))), n.dispatch(c);
      } finally {
        i = !0;
      }
    }
  });
}, Kw = (e) => function(r) {
  const {
    autoBatch: n = !0
  } = r ?? {};
  let i = new Oh(e);
  return n && i.push(Sh(typeof n == "object" ? n : void 0)), i;
};
function Hw(e) {
  const t = Ww(), {
    reducer: r = void 0,
    middleware: n,
    devTools: i = !0,
    preloadedState: a = void 0,
    enhancers: o = void 0
  } = e || {};
  let l;
  if (typeof r == "function")
    l = r;
  else if (uu(r))
    l = ch(r);
  else
    throw new Error(Xe(1));
  let u;
  typeof n == "function" ? u = n(t) : u = t();
  let s = Gi;
  i && (s = Bw({
    // Enable capture of stack traces for dispatched Redux actions
    trace: !1,
    ...typeof i == "object" && i
  }));
  const c = Pw(...u), f = Kw(c);
  let d = typeof o == "function" ? o(f) : f();
  const v = s(...d);
  return sh(l, a, v);
}
function _h(e) {
  const t = {}, r = [];
  let n;
  const i = {
    addCase(a, o) {
      const l = typeof a == "string" ? a : a.type;
      if (!l)
        throw new Error(Xe(28));
      if (l in t)
        throw new Error(Xe(29));
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
function Gw(e) {
  return typeof e == "function";
}
function qw(e, t) {
  let [r, n, i] = _h(t), a;
  if (Gw(e))
    a = () => ic(e());
  else {
    const l = ic(e);
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
        if (Bt(c)) {
          const v = f(c, u);
          return v === void 0 ? c : v;
        } else {
          if (lt(c))
            return xh(c, (d) => f(d, u));
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
var Yw = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", Vw = (e = 21) => {
  let t = "", r = e;
  for (; r--; )
    t += Yw[Math.random() * 64 | 0];
  return t;
}, Xw = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function Zw(e, t) {
  return `${e}/${t}`;
}
function Qw({
  creators: e
} = {}) {
  const t = e?.asyncThunk?.[Xw];
  return function(n) {
    const {
      name: i,
      reducerPath: a = i
    } = n;
    if (!i)
      throw new Error(Xe(11));
    const o = (typeof n.reducers == "function" ? n.reducers(ex()) : n.reducers) || {}, l = Object.keys(o), u = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, s = {
      addCase(b, x) {
        const O = typeof b == "string" ? b : b.type;
        if (!O)
          throw new Error(Xe(12));
        if (O in u.sliceCaseReducersByType)
          throw new Error(Xe(13));
        return u.sliceCaseReducersByType[O] = x, s;
      },
      addMatcher(b, x) {
        return u.sliceMatchers.push({
          matcher: b,
          reducer: x
        }), s;
      },
      exposeAction(b, x) {
        return u.actionCreators[b] = x, s;
      },
      exposeCaseReducer(b, x) {
        return u.sliceCaseReducersByName[b] = x, s;
      }
    };
    l.forEach((b) => {
      const x = o[b], O = {
        reducerName: b,
        type: Zw(i, b),
        createNotation: typeof n.reducers == "function"
      };
      rx(x) ? ix(O, x, s, t) : tx(O, x, s);
    });
    function c() {
      const [b = {}, x = [], O = void 0] = typeof n.extraReducers == "function" ? _h(n.extraReducers) : [n.extraReducers], P = {
        ...b,
        ...u.sliceCaseReducersByType
      };
      return qw(n.initialState, (_) => {
        for (let A in P)
          _.addCase(A, P[A]);
        for (let A of u.sliceMatchers)
          _.addMatcher(A.matcher, A.reducer);
        for (let A of x)
          _.addMatcher(A.matcher, A.reducer);
        O && _.addDefaultCase(O);
      });
    }
    const f = (b) => b, d = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new WeakMap();
    let p;
    function g(b, x) {
      return p || (p = c()), p(b, x);
    }
    function m() {
      return p || (p = c()), p.getInitialState();
    }
    function y(b, x = !1) {
      function O(_) {
        let A = _[b];
        return typeof A > "u" && x && (A = bi(v, O, m)), A;
      }
      function P(_ = f) {
        const A = bi(d, x, () => /* @__PURE__ */ new WeakMap());
        return bi(A, _, () => {
          const C = {};
          for (const [T, I] of Object.entries(n.selectors ?? {}))
            C[T] = Jw(I, _, () => bi(v, _, m), x);
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
    const w = {
      name: i,
      reducer: g,
      actions: u.actionCreators,
      caseReducers: u.sliceCaseReducersByName,
      getInitialState: m,
      ...y(a),
      injectInto(b, {
        reducerPath: x,
        ...O
      } = {}) {
        const P = x ?? a;
        return b.inject({
          reducerPath: P,
          reducer: g
        }, O), {
          ...w,
          ...y(P, !0)
        };
      }
    };
    return w;
  };
}
function Jw(e, t, r, n) {
  function i(a, ...o) {
    let l = t(a);
    return typeof l > "u" && n && (l = r()), e(l, ...o);
  }
  return i.unwrapped = e, i;
}
var $e = /* @__PURE__ */ Qw();
function ex() {
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
function tx({
  type: e,
  reducerName: t,
  createNotation: r
}, n, i) {
  let a, o;
  if ("reducer" in n) {
    if (r && !nx(n))
      throw new Error(Xe(17));
    a = n.reducer, o = n.prepare;
  } else
    a = n;
  i.addCase(e, a).exposeCaseReducer(t, a).exposeAction(t, o ? Qe(e, o) : Qe(e));
}
function rx(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function nx(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function ix({
  type: e,
  reducerName: t
}, r, n, i) {
  if (!i)
    throw new Error(Xe(18));
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
var ax = "task", kh = "listener", Eh = "completed", du = "cancelled", ox = `task-${du}`, lx = `task-${Eh}`, pl = `${kh}-${du}`, ux = `${kh}-${Eh}`, Ga = class {
  constructor(e) {
    this.code = e, this.message = `${ax} ${du} (reason: ${e})`;
  }
  code;
  name = "TaskAbortError";
  message;
}, vu = (e, t) => {
  if (typeof e != "function")
    throw new TypeError(Xe(32));
}, Ji = () => {
}, Ch = (e, t = Ji) => (e.catch(t), e), jh = (e, t) => (e.addEventListener("abort", t, {
  once: !0
}), () => e.removeEventListener("abort", t)), Sr = (e) => {
  if (e.aborted)
    throw new Ga(e.reason);
};
function Ih(e, t) {
  let r = Ji;
  return new Promise((n, i) => {
    const a = () => i(new Ga(e.reason));
    if (e.aborted) {
      a();
      return;
    }
    r = jh(e, a), t.finally(() => r()).then(n, i);
  }).finally(() => {
    r = Ji;
  });
}
var sx = async (e, t) => {
  try {
    return await Promise.resolve(), {
      status: "ok",
      value: await e()
    };
  } catch (r) {
    return {
      status: r instanceof Ga ? "cancelled" : "rejected",
      error: r
    };
  } finally {
    t?.();
  }
}, ea = (e) => (t) => Ch(Ih(e, t).then((r) => (Sr(e), r))), Mh = (e) => {
  const t = ea(e);
  return (r) => t(new Promise((n) => setTimeout(n, r)));
}, {
  assign: Qr
} = Object, oc = {}, qa = "listenerMiddleware", cx = (e, t) => {
  const r = (n) => jh(e, () => n.abort(e.reason));
  return (n, i) => {
    vu(n);
    const a = new AbortController();
    r(a);
    const o = sx(async () => {
      Sr(e), Sr(a.signal);
      const l = await n({
        pause: ea(a.signal),
        delay: Mh(a.signal),
        signal: a.signal
      });
      return Sr(a.signal), l;
    }, () => a.abort(lx));
    return i?.autoJoin && t.push(o.catch(Ji)), {
      result: ea(e)(o),
      cancel() {
        a.abort(ox);
      }
    };
  };
}, fx = (e, t) => {
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
      const u = await Ih(t, Promise.race(l));
      return Sr(t), u;
    } finally {
      a();
    }
  };
  return ((n, i) => Ch(r(n, i)));
}, Th = (e) => {
  let {
    type: t,
    actionCreator: r,
    matcher: n,
    predicate: i,
    effect: a
  } = e;
  if (t)
    i = Qe(t).match;
  else if (r)
    t = r.type, i = r.match;
  else if (n)
    i = n;
  else if (!i) throw new Error(Xe(21));
  return vu(a), {
    predicate: i,
    type: t,
    effect: a
  };
}, Dh = /* @__PURE__ */ Qr((e) => {
  const {
    type: t,
    predicate: r,
    effect: n
  } = Th(e);
  return {
    id: Vw(),
    effect: n,
    type: t,
    predicate: r,
    pending: /* @__PURE__ */ new Set(),
    unsubscribe: () => {
      throw new Error(Xe(22));
    }
  };
}, {
  withTypes: () => Dh
}), lc = (e, t) => {
  const {
    type: r,
    effect: n,
    predicate: i
  } = Th(t);
  return Array.from(e.values()).find((a) => (typeof r == "string" ? a.type === r : a.predicate === i) && a.effect === n);
}, ml = (e) => {
  e.pending.forEach((t) => {
    t.abort(pl);
  });
}, dx = (e, t) => () => {
  for (const r of t.keys())
    ml(r);
  e.clear();
}, uc = (e, t, r) => {
  try {
    e(t, r);
  } catch (n) {
    setTimeout(() => {
      throw n;
    }, 0);
  }
}, Nh = /* @__PURE__ */ Qr(/* @__PURE__ */ Qe(`${qa}/add`), {
  withTypes: () => Nh
}), vx = /* @__PURE__ */ Qe(`${qa}/removeAll`), $h = /* @__PURE__ */ Qr(/* @__PURE__ */ Qe(`${qa}/remove`), {
  withTypes: () => $h
}), hx = (...e) => {
  console.error(`${qa}/error`, ...e);
}, Qn = (e = {}) => {
  const t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), n = (v) => {
    const p = r.get(v) ?? 0;
    r.set(v, p + 1);
  }, i = (v) => {
    const p = r.get(v) ?? 1;
    p === 1 ? r.delete(v) : r.set(v, p - 1);
  }, {
    extra: a,
    onError: o = hx
  } = e;
  vu(o);
  const l = (v) => (v.unsubscribe = () => t.delete(v.id), t.set(v.id, v), (p) => {
    v.unsubscribe(), p?.cancelActive && ml(v);
  }), u = ((v) => {
    const p = lc(t, v) ?? Dh(v);
    return l(p);
  });
  Qr(u, {
    withTypes: () => u
  });
  const s = (v) => {
    const p = lc(t, v);
    return p && (p.unsubscribe(), v.cancelActive && ml(p)), !!p;
  };
  Qr(s, {
    withTypes: () => s
  });
  const c = async (v, p, g, m) => {
    const y = new AbortController(), w = fx(u, y.signal), b = [];
    try {
      v.pending.add(y), n(v), await Promise.resolve(v.effect(
        p,
        // Use assign() rather than ... to avoid extra helper functions added to bundle
        Qr({}, g, {
          getOriginalState: m,
          condition: (x, O) => w(x, O).then(Boolean),
          take: w,
          delay: Mh(y.signal),
          pause: ea(y.signal),
          extra: a,
          signal: y.signal,
          fork: cx(y.signal, b),
          unsubscribe: v.unsubscribe,
          subscribe: () => {
            t.set(v.id, v);
          },
          cancelActiveListeners: () => {
            v.pending.forEach((x, O, P) => {
              x !== y && (x.abort(pl), P.delete(x));
            });
          },
          cancel: () => {
            y.abort(pl), v.pending.delete(y);
          },
          throwIfCancelled: () => {
            Sr(y.signal);
          }
        })
      ));
    } catch (x) {
      x instanceof Ga || uc(o, x, {
        raisedBy: "effect"
      });
    } finally {
      await Promise.all(b), y.abort(ux), i(v), v.pending.delete(y);
    }
  }, f = dx(t, r);
  return {
    middleware: (v) => (p) => (g) => {
      if (!fh(g))
        return p(g);
      if (Nh.match(g))
        return u(g.payload);
      if (vx.match(g)) {
        f();
        return;
      }
      if ($h.match(g))
        return s(g.payload);
      let m = v.getState();
      const y = () => {
        if (m === oc)
          throw new Error(Xe(23));
        return m;
      };
      let w;
      try {
        if (w = p(g), t.size > 0) {
          const b = v.getState(), x = Array.from(t.values());
          for (const O of x) {
            let P = !1;
            try {
              P = O.predicate(g, b, m);
            } catch (_) {
              P = !1, uc(o, _, {
                raisedBy: "predicate"
              });
            }
            P && c(O, g, v, y);
          }
        }
      } finally {
        m = oc;
      }
      return w;
    },
    startListening: u,
    stopListening: s,
    clearListeners: f
  };
};
function Xe(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var px = {
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
}, Lh = $e({
  name: "chartLayout",
  initialState: px,
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
  setMargin: mx,
  setLayout: gx,
  setChartSize: yx,
  setScale: bx
} = Lh.actions, wx = Lh.reducer;
function Rh(e, t, r) {
  return Array.isArray(e) && e && t + r !== 0 ? e.slice(t, r + 1) : e;
}
function G(e) {
  return Number.isFinite(e);
}
function Ct(e) {
  return typeof e == "number" && e > 0 && Number.isFinite(e);
}
function sc(e, t) {
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
    t % 2 ? sc(Object(r), !0).forEach(function(n) {
      xx(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : sc(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function xx(e, t, r) {
  return (t = Px(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Px(e) {
  var t = Ox(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Ox(e, t) {
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
  return Ie(e) || Ie(t) ? r : Et(t) ? $r(e, t, r) : typeof t == "function" ? t(e) : r;
}
var Ax = (e, t, r) => {
  if (t && r) {
    var {
      width: n,
      height: i
    } = r, {
      align: a,
      verticalAlign: o,
      layout: l
    } = t;
    if ((l === "vertical" || l === "horizontal" && o === "middle") && a !== "center" && R(e[a]))
      return Vr(Vr({}, e), {}, {
        [a]: e[a] + (n || 0)
      });
    if ((l === "horizontal" || l === "vertical" && a === "center") && o !== "middle" && R(e[o]))
      return Vr(Vr({}, e), {}, {
        [o]: e[o] + (i || 0)
      });
  }
  return e;
}, It = (e, t) => e === "horizontal" && t === "xAxis" || e === "vertical" && t === "yAxis" || e === "centric" && t === "angleAxis" || e === "radial" && t === "radiusAxis", zh = (e, t, r, n) => {
  if (n)
    return e.map((l) => l.coordinate);
  var i, a, o = e.map((l) => (l.coordinate === t && (i = !0), l.coordinate === r && (a = !0), l.coordinate));
  return i || o.push(t), a || o.push(r), o;
}, Bh = (e, t, r) => {
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
    axisType: v
  } = e;
  if (!o)
    return null;
  var p = l === "scaleBand" && o.bandwidth ? o.bandwidth() / 2 : 2, g = i === "category" && o.bandwidth ? o.bandwidth() / p : 0;
  if (g = v === "angleAxis" && a && a.length >= 2 ? it(a[0] - a[1]) * 2 * g : g, f || d) {
    var m = (f || d || []).map((y, w) => {
      var b = n ? n.indexOf(y) : y, x = o.map(b);
      return G(x) ? {
        // If the scaleContent is not a number, the coordinate will be NaN.
        // That could be the case for example with a PointScale and a string as domain.
        coordinate: x + g,
        value: y,
        offset: g,
        index: w
      } : null;
    }).filter(We);
    return m;
  }
  return u && s ? s.map((y, w) => {
    var b = o.map(y);
    return G(b) ? {
      coordinate: b + g,
      value: y,
      index: w,
      offset: g
    } : null;
  }).filter(We) : o.ticks && c != null ? o.ticks(c).map((y, w) => {
    var b = o.map(y);
    return G(b) ? {
      coordinate: b + g,
      value: y,
      index: w,
      offset: g
    } : null;
  }).filter(We) : o.domain().map((y, w) => {
    var b = o.map(y);
    return G(b) ? {
      coordinate: b + g,
      // @ts-expect-error can't use Date as an index
      value: n ? n[y] : y,
      index: w,
      offset: g
    } : null;
  }).filter(We);
}, Sx = (e) => {
  var t, r = e.length;
  if (!(r <= 0)) {
    var n = (t = e[0]) === null || t === void 0 ? void 0 : t.length;
    if (!(n == null || n <= 0))
      for (var i = 0; i < n; ++i)
        for (var a = 0, o = 0, l = 0; l < r; ++l) {
          var u = e[l], s = u?.[i];
          if (s != null) {
            var c = s[1], f = s[0], d = kt(c) ? f : c;
            d >= 0 ? (s[0] = a, a += d, s[1] = a) : (s[0] = o, o += d, s[1] = o);
          }
        }
  }
}, _x = (e) => {
  var t, r = e.length;
  if (!(r <= 0)) {
    var n = (t = e[0]) === null || t === void 0 ? void 0 : t.length;
    if (!(n == null || n <= 0))
      for (var i = 0; i < n; ++i)
        for (var a = 0, o = 0; o < r; ++o) {
          var l = e[o], u = l?.[i];
          if (u != null) {
            var s = kt(u[1]) ? u[0] : u[1];
            s >= 0 ? (u[0] = a, a += s, u[1] = a) : (u[0] = 0, u[1] = 0);
          }
        }
  }
}, kx = {
  sign: Sx,
  // @ts-expect-error definitelytyped types are incorrect
  expand: Ib,
  // @ts-expect-error definitelytyped types are incorrect
  none: Cr,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: Mb,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: Tb,
  positive: _x
}, Ex = (e, t, r) => {
  var n, i = (n = kx[r]) !== null && n !== void 0 ? n : Cr, a = jb().keys(t).value((l, u) => Number(je(l, u, 0))).order(tl).offset(i), o = a(e);
  return o.forEach((l, u) => {
    l.forEach((s, c) => {
      var f = je(e[c], t[u], 0);
      Array.isArray(f) && f.length === 2 && R(f[0]) && R(f[1]) && (s[0] = f[0], s[1] = f[1]);
    });
  }), o;
};
function Cx(e) {
  return e == null ? void 0 : String(e);
}
function cc(e) {
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
      var l = Fv(r, "value", i[t.dataKey]);
      if (l)
        return l.coordinate + n / 2;
    }
    return r != null && r[a] ? r[a].coordinate + n / 2 : null;
  }
  var u = je(i, Ie(o) ? t.dataKey : o), s = t.scale.map(u);
  return R(s) ? s : null;
}
var jx = (e) => {
  var t = e.flat(2).filter(R);
  return [Math.min(...t), Math.max(...t)];
}, Ix = (e) => [e[0] === 1 / 0 ? 0 : e[0], e[1] === -1 / 0 ? 0 : e[1]], Mx = (e, t, r) => {
  if (e != null)
    return Ix(Object.keys(e).reduce((n, i) => {
      var a = e[i];
      if (!a)
        return n;
      var {
        stackedData: o
      } = a, l = o.reduce((u, s) => {
        var c = Rh(s, t, r), f = jx(c);
        return !G(f[0]) || !G(f[1]) ? u : [Math.min(u[0], f[0]), Math.max(u[1], f[1])];
      }, [1 / 0, -1 / 0]);
      return [Math.min(l[0], n[0]), Math.max(l[1], n[1])];
    }, [1 / 0, -1 / 0]));
}, fc = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, dc = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, ta = (e, t, r) => {
  if (e && e.scale && e.scale.bandwidth) {
    var n = e.scale.bandwidth();
    if (!r || n > 0)
      return n;
  }
  if (e && t && t.length >= 2) {
    for (var i = Ra(t, (c) => c.coordinate), a = 1 / 0, o = 1, l = i.length; o < l; o++) {
      var u = i[o], s = i[o - 1];
      a = Math.min((u?.coordinate || 0) - (s?.coordinate || 0), a);
    }
    return a === 1 / 0 ? 0 : a;
  }
  return r ? void 0 : 0;
};
function vc(e) {
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
function Fh(e, t) {
  if (e)
    return String(e);
  if (typeof t == "string")
    return t;
}
var Tx = (e, t) => {
  if (t === "horizontal")
    return e.relativeX;
  if (t === "vertical")
    return e.relativeY;
}, Dx = (e, t) => t === "centric" ? e.angle : e.radius, Ht = (e) => e.layout.width, Gt = (e) => e.layout.height, Nx = (e) => e.layout.scale, Wh = (e) => e.layout.margin, Ya = S((e) => e.cartesianAxis.xAxis, (e) => Object.values(e)), Va = S((e) => e.cartesianAxis.yAxis, (e) => Object.values(e)), $x = "data-recharts-item-index", Lx = "data-recharts-item-id", Jn = 60;
function hc(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function xi(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? hc(Object(r), !0).forEach(function(n) {
      Rx(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : hc(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Rx(e, t, r) {
  return (t = zx(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function zx(e) {
  var t = Bx(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Bx(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Fx = (e) => e.brush.height;
function Wx(e) {
  var t = Va(e);
  return t.reduce((r, n) => {
    if (n.orientation === "left" && !n.mirror && !n.hide) {
      var i = typeof n.width == "number" ? n.width : Jn;
      return r + i;
    }
    return r;
  }, 0);
}
function Ux(e) {
  var t = Va(e);
  return t.reduce((r, n) => {
    if (n.orientation === "right" && !n.mirror && !n.hide) {
      var i = typeof n.width == "number" ? n.width : Jn;
      return r + i;
    }
    return r;
  }, 0);
}
function Kx(e) {
  var t = Ya(e);
  return t.reduce((r, n) => n.orientation === "top" && !n.mirror && !n.hide ? r + n.height : r, 0);
}
function Hx(e) {
  var t = Ya(e);
  return t.reduce((r, n) => n.orientation === "bottom" && !n.mirror && !n.hide ? r + n.height : r, 0);
}
var Me = S([Ht, Gt, Wh, Fx, Wx, Ux, Kx, Hx, lh, pw], (e, t, r, n, i, a, o, l, u, s) => {
  var c = {
    left: (r.left || 0) + i,
    right: (r.right || 0) + a
  }, f = {
    top: (r.top || 0) + o,
    bottom: (r.bottom || 0) + l
  }, d = xi(xi({}, f), c), v = d.bottom;
  d.bottom += n, d = Ax(d, u, s);
  var p = e - d.left - d.right, g = t - d.top - d.bottom;
  return xi(xi({
    brushBottom: v
  }, d), {}, {
    // never return negative values for height and width
    width: Math.max(p, 0),
    height: Math.max(g, 0)
  });
}), Gx = S(Me, (e) => ({
  x: e.left,
  y: e.top,
  width: e.width,
  height: e.height
})), Uh = S(Ht, Gt, (e, t) => ({
  x: 0,
  y: 0,
  width: e,
  height: t
})), qx = /* @__PURE__ */ h.createContext(null), He = () => h.useContext(qx) != null, Xa = (e) => e.brush, Za = S([Xa, Me, Wh], (e, t, r) => ({
  height: e.height,
  x: R(e.x) ? e.x : t.left,
  y: R(e.y) ? e.y : t.top + t.height + t.brushBottom - (r?.bottom || 0),
  width: R(e.width) ? e.width : t.width
}));
function Yx(e, t, { signal: r, edges: n } = {}) {
  let i, a = null;
  const o = n != null && n.includes("leading"), l = n == null || n.includes("trailing"), u = () => {
    a !== null && (e.apply(i, a), i = void 0, a = null);
  }, s = () => {
    l && u(), v();
  };
  let c = null;
  const f = () => {
    c != null && clearTimeout(c), c = setTimeout(() => {
      c = null, s();
    }, t);
  }, d = () => {
    c !== null && (clearTimeout(c), c = null);
  }, v = () => {
    d(), i = void 0, a = null;
  }, p = () => {
    u();
  }, g = function(...m) {
    if (r?.aborted) return;
    i = this, a = m;
    const y = c == null;
    f(), o && y && u();
  };
  return g.schedule = f, g.cancel = v, g.flush = p, r?.addEventListener("abort", v, { once: !0 }), g;
}
function Vx(e, t = 0, r = {}) {
  typeof r != "object" && (r = {});
  const { leading: n = !1, trailing: i = !0, maxWait: a } = r, o = Array(2);
  n && (o[0] = "leading"), i && (o[1] = "trailing");
  let l, u = null;
  const s = Yx(function(...d) {
    l = e.apply(this, d), u = null;
  }, t, { edges: o }), c = function(...d) {
    return a != null && (u === null && (u = Date.now()), Date.now() - u >= a) ? (l = e.apply(this, d), u = Date.now(), s.cancel(), s.schedule(), l) : (s.apply(this, d), l);
  }, f = () => (s.flush(), l);
  return c.cancel = s.cancel, c.flush = f, c;
}
function Xx(e, t = 0, r = {}) {
  const { leading: n = !0, trailing: i = !0 } = r;
  return Vx(e, t, {
    leading: n,
    maxWait: t,
    trailing: i
  });
}
var ra = function(t, r) {
  for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++)
    i[a - 2] = arguments[a];
  if (typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
    if (r === void 0)
      console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    else {
      var o = 0;
      console.warn(r.replace(/%s/g, () => i[o++]));
    }
}, Pt = {
  width: "100%",
  height: "100%",
  debounce: 0,
  minWidth: 0,
  initialDimension: {
    width: -1,
    height: -1
  }
}, Kh = (e, t, r) => {
  var {
    width: n = Pt.width,
    height: i = Pt.height,
    aspect: a,
    maxHeight: o
  } = r, l = jr(n) ? e : Number(n), u = jr(i) ? t : Number(i);
  return a && a > 0 && (l ? u = l / a : u && (l = u * a), o && u != null && u > o && (u = o)), {
    calculatedWidth: l,
    calculatedHeight: u
  };
}, Zx = {
  width: 0,
  height: 0,
  overflow: "visible"
}, Qx = {
  width: 0,
  overflowX: "visible"
}, Jx = {
  height: 0,
  overflowY: "visible"
}, e1 = {}, t1 = (e) => {
  var {
    width: t,
    height: r
  } = e, n = jr(t), i = jr(r);
  return n && i ? Zx : n ? Qx : i ? Jx : e1;
};
function r1(e) {
  var {
    width: t,
    height: r,
    aspect: n
  } = e, i = t, a = r;
  return i === void 0 && a === void 0 ? (i = Pt.width, a = Pt.height) : i === void 0 ? i = n && n > 0 ? void 0 : Pt.width : a === void 0 && (a = n && n > 0 ? void 0 : Pt.height), {
    width: i,
    height: a
  };
}
function gl() {
  return gl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, gl.apply(null, arguments);
}
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
function mc(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? pc(Object(r), !0).forEach(function(n) {
      n1(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : pc(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function n1(e, t, r) {
  return (t = i1(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function i1(e) {
  var t = a1(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function a1(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Hh = /* @__PURE__ */ h.createContext(Pt.initialDimension);
function o1(e) {
  return Ct(e.width) && Ct(e.height);
}
function Gh(e) {
  var {
    children: t,
    width: r,
    height: n
  } = e, i = h.useMemo(() => ({
    width: r,
    height: n
  }), [r, n]);
  return o1(i) ? /* @__PURE__ */ h.createElement(Hh.Provider, {
    value: i
  }, t) : null;
}
var hu = () => h.useContext(Hh), l1 = /* @__PURE__ */ h.forwardRef((e, t) => {
  var {
    aspect: r,
    initialDimension: n = Pt.initialDimension,
    width: i,
    height: a,
    /*
     * default min-width to 0 if not specified - 'auto' causes issues with flexbox
     * https://github.com/recharts/recharts/issues/172
     */
    minWidth: o = Pt.minWidth,
    minHeight: l,
    maxHeight: u,
    children: s,
    debounce: c = Pt.debounce,
    id: f,
    className: d,
    onResize: v,
    style: p = {}
  } = e, g = h.useRef(null), m = h.useRef();
  m.current = v, h.useImperativeHandle(t, () => g.current);
  var [y, w] = h.useState({
    containerWidth: n.width,
    containerHeight: n.height
  }), b = h.useCallback((A, C) => {
    w((T) => {
      var I = Math.round(A), k = Math.round(C);
      return T.containerWidth === I && T.containerHeight === k ? T : {
        containerWidth: I,
        containerHeight: k
      };
    });
  }, []);
  h.useEffect(() => {
    if (g.current == null || typeof ResizeObserver > "u")
      return Lr;
    var A = (k) => {
      var B, F = k[0];
      if (F != null) {
        var {
          width: W,
          height: q
        } = F.contentRect;
        b(W, q), (B = m.current) === null || B === void 0 || B.call(m, W, q);
      }
    };
    c > 0 && (A = Xx(A, c, {
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
    containerWidth: x,
    containerHeight: O
  } = y;
  ra(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
  var {
    calculatedWidth: P,
    calculatedHeight: _
  } = Kh(x, O, {
    width: i,
    height: a,
    aspect: r,
    maxHeight: u
  });
  return ra(P != null && P > 0 || _ != null && _ > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, P, _, i, a, o, l, r), /* @__PURE__ */ h.createElement("div", {
    id: f ? "".concat(f) : void 0,
    className: J("recharts-responsive-container", d),
    style: mc(mc({}, p), {}, {
      width: i,
      height: a,
      minWidth: o,
      minHeight: l,
      maxHeight: u
    }),
    ref: g
  }, /* @__PURE__ */ h.createElement("div", {
    style: t1({
      width: i,
      height: a
    })
  }, /* @__PURE__ */ h.createElement(Gh, {
    width: P,
    height: _
  }, s)));
}), u1 = /* @__PURE__ */ h.forwardRef((e, t) => {
  var r = hu();
  if (Ct(r.width) && Ct(r.height))
    return e.children;
  var {
    width: n,
    height: i
  } = r1({
    width: e.width,
    height: e.height,
    aspect: e.aspect
  }), {
    calculatedWidth: a,
    calculatedHeight: o
  } = Kh(void 0, void 0, {
    width: n,
    height: i,
    aspect: e.aspect,
    maxHeight: e.maxHeight
  });
  return R(a) && R(o) ? /* @__PURE__ */ h.createElement(Gh, {
    width: a,
    height: o
  }, e.children) : /* @__PURE__ */ h.createElement(l1, gl({}, e, {
    width: n,
    height: i,
    ref: t
  }));
});
function pu(e) {
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
var Qa = () => {
  var e, t = He(), r = z(Gx), n = z(Za), i = (e = z(Xa)) === null || e === void 0 ? void 0 : e.padding;
  return !t || !n || !i ? r : {
    width: n.width - i.left - i.right,
    height: n.height - i.top - i.bottom,
    x: i.left,
    y: i.top
  };
}, s1 = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 0,
  height: 0,
  brushBottom: 0
}, qh = () => {
  var e;
  return (e = z(Me)) !== null && e !== void 0 ? e : s1;
}, mu = () => z(Ht), gu = () => z(Gt), c1 = () => z((e) => e.layout.margin), le = (e) => e.layout.layoutType, un = () => z(le), yu = () => {
  var e = un();
  if (e === "horizontal" || e === "vertical")
    return e;
}, Yh = (e) => {
  var t = e.layout.layoutType;
  if (t === "centric" || t === "radial")
    return t;
}, f1 = () => {
  var e = un();
  return e !== void 0;
}, ei = (e) => {
  var t = ce(), r = He(), {
    width: n,
    height: i
  } = e, a = hu(), o = n, l = i;
  return a && (o = a.width > 0 ? a.width : n, l = a.height > 0 ? a.height : i), h.useEffect(() => {
    !r && Ct(o) && Ct(l) && t(yx({
      width: o,
      height: l
    }));
  }, [t, r, o, l]), null;
}, Vh = Symbol.for("immer-nothing"), gc = Symbol.for("immer-draftable"), Je = Symbol.for("immer-state");
function dt(e, ...t) {
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var Rn = Object.getPrototypeOf;
function rn(e) {
  return !!e && !!e[Je];
}
function Mr(e) {
  return e ? Xh(e) || Array.isArray(e) || !!e[gc] || !!e.constructor?.[gc] || ti(e) || eo(e) : !1;
}
var d1 = Object.prototype.constructor.toString(), yc = /* @__PURE__ */ new WeakMap();
function Xh(e) {
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
  let n = yc.get(r);
  return n === void 0 && (n = Function.toString.call(r), yc.set(r, n)), n === d1;
}
function na(e, t, r = !0) {
  Ja(e) === 0 ? (r ? Reflect.ownKeys(e) : Object.keys(e)).forEach((i) => {
    t(i, e[i], e);
  }) : e.forEach((n, i) => t(i, n, e));
}
function Ja(e) {
  const t = e[Je];
  return t ? t.type_ : Array.isArray(e) ? 1 : ti(e) ? 2 : eo(e) ? 3 : 0;
}
function yl(e, t) {
  return Ja(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function Zh(e, t, r) {
  const n = Ja(e);
  n === 2 ? e.set(t, r) : n === 3 ? e.add(r) : e[t] = r;
}
function v1(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function ti(e) {
  return e instanceof Map;
}
function eo(e) {
  return e instanceof Set;
}
function yr(e) {
  return e.copy_ || e.base_;
}
function bl(e, t) {
  if (ti(e))
    return new Map(e);
  if (eo(e))
    return new Set(e);
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  const r = Xh(e);
  if (t === !0 || t === "class_only" && !r) {
    const n = Object.getOwnPropertyDescriptors(e);
    delete n[Je];
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
    return Object.create(Rn(e), n);
  } else {
    const n = Rn(e);
    if (n !== null && r)
      return { ...e };
    const i = Object.create(n);
    return Object.assign(i, e);
  }
}
function bu(e, t = !1) {
  return to(e) || rn(e) || !Mr(e) || (Ja(e) > 1 && Object.defineProperties(e, {
    set: Pi,
    add: Pi,
    clear: Pi,
    delete: Pi
  }), Object.freeze(e), t && Object.values(e).forEach((r) => bu(r, !0))), e;
}
function h1() {
  dt(2);
}
var Pi = {
  value: h1
};
function to(e) {
  return e === null || typeof e != "object" ? !0 : Object.isFrozen(e);
}
var p1 = {};
function Tr(e) {
  const t = p1[e];
  return t || dt(0, e), t;
}
var zn;
function Qh() {
  return zn;
}
function m1(e, t) {
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
function bc(e, t) {
  t && (Tr("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function wl(e) {
  xl(e), e.drafts_.forEach(g1), e.drafts_ = null;
}
function xl(e) {
  e === zn && (zn = e.parent_);
}
function wc(e) {
  return zn = m1(zn, e);
}
function g1(e) {
  const t = e[Je];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function xc(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const r = t.drafts_[0];
  return e !== void 0 && e !== r ? (r[Je].modified_ && (wl(t), dt(4)), Mr(e) && (e = ia(t, e), t.parent_ || aa(t, e)), t.patches_ && Tr("Patches").generateReplacementPatches_(
    r[Je].base_,
    e,
    t.patches_,
    t.inversePatches_
  )) : e = ia(t, r, []), wl(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== Vh ? e : void 0;
}
function ia(e, t, r) {
  if (to(t))
    return t;
  const n = e.immer_.shouldUseStrictIteration(), i = t[Je];
  if (!i)
    return na(
      t,
      (a, o) => Pc(e, i, t, a, o, r),
      n
    ), t;
  if (i.scope_ !== e)
    return t;
  if (!i.modified_)
    return aa(e, i.base_, !0), i.base_;
  if (!i.finalized_) {
    i.finalized_ = !0, i.scope_.unfinalizedDrafts_--;
    const a = i.copy_;
    let o = a, l = !1;
    i.type_ === 3 && (o = new Set(a), a.clear(), l = !0), na(
      o,
      (u, s) => Pc(
        e,
        i,
        a,
        u,
        s,
        r,
        l
      ),
      n
    ), aa(e, a, !1), r && e.patches_ && Tr("Patches").generatePatches_(
      i,
      r,
      e.patches_,
      e.inversePatches_
    );
  }
  return i.copy_;
}
function Pc(e, t, r, n, i, a, o) {
  if (i == null || typeof i != "object" && !o)
    return;
  const l = to(i);
  if (!(l && !o)) {
    if (rn(i)) {
      const u = a && t && t.type_ !== 3 && // Set objects are atomic since they have no keys.
      !yl(t.assigned_, n) ? a.concat(n) : void 0, s = ia(e, i, u);
      if (Zh(r, n, s), rn(s))
        e.canAutoFreeze_ = !1;
      else
        return;
    } else o && r.add(i);
    if (Mr(i) && !l) {
      if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1 || t && t.base_ && t.base_[n] === i && l)
        return;
      ia(e, i), (!t || !t.scope_.parent_) && typeof n != "symbol" && (ti(r) ? r.has(n) : Object.prototype.propertyIsEnumerable.call(r, n)) && aa(e, i);
    }
  }
}
function aa(e, t, r = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && bu(t, r);
}
function y1(e, t) {
  const r = Array.isArray(e), n = {
    type_: r ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : Qh(),
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
  r && (i = [n], a = Bn);
  const { revoke: o, proxy: l } = Proxy.revocable(i, a);
  return n.draft_ = l, n.revoke_ = o, l;
}
var wu = {
  get(e, t) {
    if (t === Je)
      return e;
    const r = yr(e);
    if (!yl(r, t))
      return b1(e, r, t);
    const n = r[t];
    return e.finalized_ || !Mr(n) ? n : n === Eo(e.base_, t) ? (Co(e), e.copy_[t] = Ol(n, e)) : n;
  },
  has(e, t) {
    return t in yr(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(yr(e));
  },
  set(e, t, r) {
    const n = Jh(yr(e), t);
    if (n?.set)
      return n.set.call(e.draft_, r), !0;
    if (!e.modified_) {
      const i = Eo(yr(e), t), a = i?.[Je];
      if (a && a.base_ === r)
        return e.copy_[t] = r, e.assigned_[t] = !1, !0;
      if (v1(r, i) && (r !== void 0 || yl(e.base_, t)))
        return !0;
      Co(e), Pl(e);
    }
    return e.copy_[t] === r && // special case: handle new props with value 'undefined'
    (r !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(r) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = r, e.assigned_[t] = !0), !0;
  },
  deleteProperty(e, t) {
    return Eo(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_[t] = !1, Co(e), Pl(e)) : delete e.assigned_[t], e.copy_ && delete e.copy_[t], !0;
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
    dt(11);
  },
  getPrototypeOf(e) {
    return Rn(e.base_);
  },
  setPrototypeOf() {
    dt(12);
  }
}, Bn = {};
na(wu, (e, t) => {
  Bn[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
Bn.deleteProperty = function(e, t) {
  return Bn.set.call(this, e, t, void 0);
};
Bn.set = function(e, t, r) {
  return wu.set.call(this, e[0], t, r, e[0]);
};
function Eo(e, t) {
  const r = e[Je];
  return (r ? yr(r) : e)[t];
}
function b1(e, t, r) {
  const n = Jh(t, r);
  return n ? "value" in n ? n.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    n.get?.call(e.draft_)
  ) : void 0;
}
function Jh(e, t) {
  if (!(t in e))
    return;
  let r = Rn(e);
  for (; r; ) {
    const n = Object.getOwnPropertyDescriptor(r, t);
    if (n)
      return n;
    r = Rn(r);
  }
}
function Pl(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && Pl(e.parent_));
}
function Co(e) {
  e.copy_ || (e.copy_ = bl(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var w1 = class {
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
      typeof r != "function" && dt(6), n !== void 0 && typeof n != "function" && dt(7);
      let i;
      if (Mr(t)) {
        const a = wc(this), o = Ol(t, void 0);
        let l = !0;
        try {
          i = r(o), l = !1;
        } finally {
          l ? wl(a) : xl(a);
        }
        return bc(a, n), xc(i, a);
      } else if (!t || typeof t != "object") {
        if (i = r(t), i === void 0 && (i = t), i === Vh && (i = void 0), this.autoFreeze_ && bu(i, !0), n) {
          const a = [], o = [];
          Tr("Patches").generateReplacementPatches_(t, i, a, o), n(a, o);
        }
        return i;
      } else
        dt(1, t);
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
    Mr(e) || dt(8), rn(e) && (e = x1(e));
    const t = wc(this), r = Ol(e, void 0);
    return r[Je].isManual_ = !0, xl(t), r;
  }
  finishDraft(e, t) {
    const r = e && e[Je];
    (!r || !r.isManual_) && dt(9);
    const { scope_: n } = r;
    return bc(n, t), xc(void 0, n);
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
function Ol(e, t) {
  const r = ti(e) ? Tr("MapSet").proxyMap_(e, t) : eo(e) ? Tr("MapSet").proxySet_(e, t) : y1(e, t);
  return (t ? t.scope_ : Qh()).drafts_.push(r), r;
}
function x1(e) {
  return rn(e) || dt(10, e), ep(e);
}
function ep(e) {
  if (!Mr(e) || to(e))
    return e;
  const t = e[Je];
  let r, n = !0;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, r = bl(e, t.scope_.immer_.useStrictShallowCopy_), n = t.scope_.immer_.shouldUseStrictIteration();
  } else
    r = bl(e, !0);
  return na(
    r,
    (i, a) => {
      Zh(r, i, ep(a));
    },
    n
  ), t && (t.finalized_ = !1), r;
}
var P1 = new w1();
P1.produce;
var O1 = {
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
}, tp = $e({
  name: "legend",
  initialState: O1,
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
        } = t.payload, i = at(e).payload.indexOf(r);
        i > -1 && (e.payload[i] = n);
      },
      prepare: ie()
    },
    removeLegendPayload: {
      reducer(e, t) {
        var r = at(e).payload.indexOf(t.payload);
        r > -1 && e.payload.splice(r, 1);
      },
      prepare: ie()
    }
  }
}), {
  setLegendSize: Oc,
  setLegendSettings: A1,
  addLegendPayload: S1,
  replaceLegendPayload: _1,
  removeLegendPayload: k1
} = tp.actions, E1 = tp.reducer, jo = { exports: {} }, Io = {};
var Ac;
function C1() {
  if (Ac) return Io;
  Ac = 1;
  var e = gv();
  function t(u, s) {
    return u === s && (u !== 0 || 1 / u === 1 / s) || u !== u && s !== s;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useSyncExternalStore, i = e.useRef, a = e.useEffect, o = e.useMemo, l = e.useDebugValue;
  return Io.useSyncExternalStoreWithSelector = function(u, s, c, f, d) {
    var v = i(null);
    if (v.current === null) {
      var p = { hasValue: !1, value: null };
      v.current = p;
    } else p = v.current;
    v = o(
      function() {
        function m(O) {
          if (!y) {
            if (y = !0, w = O, O = f(O), d !== void 0 && p.hasValue) {
              var P = p.value;
              if (d(P, O))
                return b = P;
            }
            return b = O;
          }
          if (P = b, r(w, O)) return P;
          var _ = f(O);
          return d !== void 0 && d(P, _) ? (w = O, P) : (w = O, b = _);
        }
        var y = !1, w, b, x = c === void 0 ? null : c;
        return [
          function() {
            return m(s());
          },
          x === null ? void 0 : function() {
            return m(x());
          }
        ];
      },
      [s, c, f, d]
    );
    var g = n(u, v[0], v[1]);
    return a(
      function() {
        p.hasValue = !0, p.value = g;
      },
      [g]
    ), l(g), g;
  }, Io;
}
var Sc;
function j1() {
  return Sc || (Sc = 1, jo.exports = C1()), jo.exports;
}
j1();
function I1(e) {
  e();
}
function M1() {
  let e = null, t = null;
  return {
    clear() {
      e = null, t = null;
    },
    notify() {
      I1(() => {
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
var _c = {
  notify() {
  },
  get: () => []
};
function T1(e, t) {
  let r, n = _c, i = 0, a = !1;
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
    i++, r || (r = e.subscribe(u), n = M1());
  }
  function f() {
    i--, r && i === 0 && (r(), r = void 0, n.clear(), n = _c);
  }
  function d() {
    a || (a = !0, c());
  }
  function v() {
    a && (a = !1, f());
  }
  const p = {
    addNestedSub: o,
    notifyNestedSubs: l,
    handleChangeWrapper: u,
    isSubscribed: s,
    trySubscribe: d,
    tryUnsubscribe: v,
    getListeners: () => n
  };
  return p;
}
var D1 = () => typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", N1 = /* @__PURE__ */ D1(), $1 = () => typeof navigator < "u" && navigator.product === "ReactNative", L1 = /* @__PURE__ */ $1(), R1 = () => N1 || L1 ? h.useLayoutEffect : h.useEffect, z1 = /* @__PURE__ */ R1();
function kc(e, t) {
  return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function B1(e, t) {
  if (kc(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  const r = Object.keys(e), n = Object.keys(t);
  if (r.length !== n.length) return !1;
  for (let i = 0; i < r.length; i++)
    if (!Object.prototype.hasOwnProperty.call(t, r[i]) || !kc(e[r[i]], t[r[i]]))
      return !1;
  return !0;
}
var F1 = /* @__PURE__ */ Symbol.for("react-redux-context"), W1 = typeof globalThis < "u" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function U1() {
  if (!h.createContext) return {};
  const e = W1[F1] ??= /* @__PURE__ */ new Map();
  let t = e.get(h.createContext);
  return t || (t = h.createContext(
    null
  ), e.set(h.createContext, t)), t;
}
var K1 = /* @__PURE__ */ U1();
function H1(e) {
  const { children: t, context: r, serverState: n, store: i } = e, a = h.useMemo(() => {
    const u = T1(i);
    return {
      store: i,
      subscription: u,
      getServerState: n ? () => n : void 0
    };
  }, [i, n]), o = h.useMemo(() => i.getState(), [i]);
  z1(() => {
    const { subscription: u } = a;
    return u.onStateChange = u.notifyNestedSubs, u.trySubscribe(), o !== i.getState() && u.notifyNestedSubs(), () => {
      u.tryUnsubscribe(), u.onStateChange = void 0;
    };
  }, [a, o]);
  const l = r || K1;
  return /* @__PURE__ */ h.createElement(l.Provider, { value: a }, t);
}
var G1 = H1, q1 = /* @__PURE__ */ new Set([
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
function Y1(e, t) {
  return e == null && t == null ? !0 : typeof e == "number" && typeof t == "number" ? e === t || e !== e && t !== t : e === t;
}
function ri(e, t) {
  var r = /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)]);
  for (var n of r)
    if (q1.has(n)) {
      if (e[n] == null && t[n] == null)
        continue;
      if (!B1(e[n], t[n]))
        return !1;
    } else if (!Y1(e[n], t[n]))
      return !1;
  return !0;
}
var V1 = ["contextPayload"];
function Al() {
  return Al = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Al.apply(null, arguments);
}
function Ec(e, t) {
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
    t % 2 ? Ec(Object(r), !0).forEach(function(n) {
      X1(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ec(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function X1(e, t, r) {
  return (t = Z1(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Z1(e) {
  var t = Q1(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Q1(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function J1(e, t) {
  if (e == null) return {};
  var r, n, i = eP(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function eP(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function tP(e) {
  return e.value;
}
function rP(e) {
  var {
    contextPayload: t
  } = e, r = J1(e, V1), n = ih(t, e.payloadUniqBy, tP), i = nn(nn({}, r), {}, {
    payload: n
  });
  return /* @__PURE__ */ h.isValidElement(e.content) ? /* @__PURE__ */ h.cloneElement(e.content, i) : typeof e.content == "function" ? /* @__PURE__ */ h.createElement(e.content, i) : /* @__PURE__ */ h.createElement(a0, i);
}
function nP(e, t, r, n, i, a) {
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
function iP(e) {
  var t = ce();
  return h.useEffect(() => {
    t(A1(e));
  }, [t, e]), null;
}
function aP(e) {
  var t = ce();
  return h.useEffect(() => (t(Oc(e)), () => {
    t(Oc({
      width: 0,
      height: 0
    }));
  }), [t, e]), null;
}
function oP(e, t, r, n) {
  return e === "vertical" && t != null ? {
    height: t
  } : e === "horizontal" ? {
    width: r || n
  } : null;
}
var lP = {
  align: "center",
  iconSize: 14,
  inactiveColor: "#ccc",
  itemSorter: "value",
  layout: "horizontal",
  verticalAlign: "bottom"
};
function uP(e) {
  var t = Ke(e, lP), r = yw(), n = eb(), i = c1(), {
    width: a,
    height: o,
    wrapperStyle: l,
    portal: u
  } = t, [s, c] = uh([r]), f = mu(), d = gu();
  if (f == null || d == null)
    return null;
  var v = f - (i?.left || 0) - (i?.right || 0), p = oP(t.layout, o, a, v), g = u ? l : nn(nn({
    position: "absolute",
    width: p?.width || a || "auto",
    height: p?.height || o || "auto"
  }, nP(l, t, i, f, d, s)), l), m = u ?? n;
  if (m == null || r == null)
    return null;
  var y = /* @__PURE__ */ h.createElement("div", {
    className: "recharts-legend-wrapper",
    style: g,
    ref: c
  }, /* @__PURE__ */ h.createElement(iP, {
    layout: t.layout,
    align: t.align,
    verticalAlign: t.verticalAlign,
    itemSorter: t.itemSorter
  }), !u && /* @__PURE__ */ h.createElement(aP, {
    width: s.width,
    height: s.height
  }), /* @__PURE__ */ h.createElement(rP, Al({}, t, p, {
    margin: i,
    chartWidth: f,
    chartHeight: d,
    contextPayload: r
  })));
  return /* @__PURE__ */ Zl.createPortal(y, m);
}
var rp = /* @__PURE__ */ h.memo(uP, ri);
rp.displayName = "Legend";
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
function yn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Cc(Object(r), !0).forEach(function(n) {
      sP(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Cc(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function sP(e, t, r) {
  return (t = cP(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function cP(e) {
  var t = fP(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function fP(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function dP(e) {
  return Array.isArray(e) && Et(e[0]) && Et(e[1]) ? e.join(" ~ ") : e;
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
function vP(e, t) {
  return t == null ? e : Ra(e, t);
}
var hP = (e) => {
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
  } = e, v = () => {
    if (a && a.length) {
      var O = {
        padding: 0,
        margin: 0
      }, P = vP(a, l), _ = P.map((A, C) => {
        if (A.type === "none")
          return null;
        var T = A.formatter || o || dP, {
          value: I,
          name: k
        } = A, B = I, F = k;
        if (T) {
          var W = T(I, k, A, C, a);
          if (Array.isArray(W))
            [B, F] = W;
          else if (W != null)
            B = W;
          else
            return null;
        }
        var q = yn(yn({}, Fr.itemStyle), {}, {
          color: A.color || Fr.itemStyle.color
        }, n);
        return /* @__PURE__ */ h.createElement("li", {
          className: "recharts-tooltip-item",
          key: "tooltip-item-".concat(C),
          style: q
        }, Et(F) ? /* @__PURE__ */ h.createElement("span", {
          className: "recharts-tooltip-item-name"
        }, F) : null, Et(F) ? /* @__PURE__ */ h.createElement("span", {
          className: "recharts-tooltip-item-separator"
        }, t) : null, /* @__PURE__ */ h.createElement("span", {
          className: "recharts-tooltip-item-value"
        }, B), /* @__PURE__ */ h.createElement("span", {
          className: "recharts-tooltip-item-unit"
        }, A.unit || ""));
      });
      return /* @__PURE__ */ h.createElement("ul", {
        className: "recharts-tooltip-item-list",
        style: O
      }, _);
    }
    return null;
  }, p = yn(yn({}, Fr.contentStyle), r), g = yn({
    margin: 0
  }, i), m = !Ie(c), y = m ? c : "", w = J("recharts-default-tooltip", u), b = J("recharts-tooltip-label", s);
  m && f && a !== void 0 && a !== null && (y = f(c, a));
  var x = d ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return /* @__PURE__ */ h.createElement("div", Sl({
    className: w,
    style: p
  }, x), /* @__PURE__ */ h.createElement("p", {
    className: b,
    style: g
  }, /* @__PURE__ */ h.isValidElement(y) ? y : "".concat(y)), v());
}, bn = "recharts-tooltip-wrapper", pP = {
  visibility: "hidden"
};
function mP(e) {
  var {
    coordinate: t,
    translateX: r,
    translateY: n
  } = e;
  return J(bn, {
    ["".concat(bn, "-right")]: R(r) && t && R(t.x) && r >= t.x,
    ["".concat(bn, "-left")]: R(r) && t && R(t.x) && r < t.x,
    ["".concat(bn, "-bottom")]: R(n) && t && R(t.y) && n >= t.y,
    ["".concat(bn, "-top")]: R(n) && t && R(t.y) && n < t.y
  });
}
function jc(e) {
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
  if (a && R(a[n]))
    return a[n];
  var c = r[n] - l - (i > 0 ? i : 0), f = r[n] + i;
  if (t[n])
    return o[n] ? c : f;
  var d = u[n];
  if (d == null)
    return 0;
  if (o[n]) {
    var v = c, p = d;
    return v < p ? Math.max(f, d) : Math.max(c, d);
  }
  if (s == null)
    return 0;
  var g = f + l, m = d + s;
  return g > m ? Math.max(c, d) : Math.max(f, d);
}
function gP(e) {
  var {
    translateX: t,
    translateY: r,
    useTranslate3d: n
  } = e;
  return {
    transform: n ? "translate3d(".concat(t, "px, ").concat(r, "px, 0)") : "translate(".concat(t, "px, ").concat(r, "px)")
  };
}
function yP(e) {
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
  return l.height > 0 && l.width > 0 && r ? (f = jc({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "x",
    offset: i,
    position: a,
    reverseDirection: o,
    tooltipDimension: l.width,
    viewBox: s,
    viewBoxDimension: s.width
  }), d = jc({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "y",
    offset: n,
    position: a,
    reverseDirection: o,
    tooltipDimension: l.height,
    viewBox: s,
    viewBoxDimension: s.height
  }), c = gP({
    translateX: f,
    translateY: d,
    useTranslate3d: u
  })) : c = pP, {
    cssProperties: c,
    cssClasses: mP({
      translateX: f,
      translateY: d,
      coordinate: r
    })
  };
}
var bP = () => !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout), ni = {
  isSsr: bP()
};
function np() {
  var [e, t] = h.useState(() => ni.isSsr || !window.matchMedia ? !1 : window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  return h.useEffect(() => {
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
function Ic(e, t) {
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
    t % 2 ? Ic(Object(r), !0).forEach(function(n) {
      wP(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ic(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function wP(e, t, r) {
  return (t = xP(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function xP(e) {
  var t = PP(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function PP(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function OP(e) {
  if (!(e.prefersReducedMotion && e.isAnimationActive === "auto") && e.isAnimationActive && e.active)
    return "transform ".concat(e.animationDuration, "ms ").concat(e.animationEasing);
}
function AP(e) {
  var t, r, n, i, a, o, l = np(), [u, s] = h.useState(() => ({
    dismissed: !1,
    dismissedAtCoordinate: {
      x: 0,
      y: 0
    }
  }));
  h.useEffect(() => {
    var p = (g) => {
      if (g.key === "Escape") {
        var m, y, w, b;
        s({
          dismissed: !0,
          dismissedAtCoordinate: {
            x: (m = (y = e.coordinate) === null || y === void 0 ? void 0 : y.x) !== null && m !== void 0 ? m : 0,
            y: (w = (b = e.coordinate) === null || b === void 0 ? void 0 : b.y) !== null && w !== void 0 ? w : 0
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
  } = yP({
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
    transition: OP({
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
  }), v = Wr(Wr({}, d), {}, {
    visibility: !u.dismissed && e.active && e.hasPayload ? "visible" : "hidden"
  }, e.wrapperStyle);
  return /* @__PURE__ */ h.createElement("div", {
    // @ts-expect-error typescript library does not recognize xmlns attribute, but it's required for an HTML chunk inside SVG.
    xmlns: "http://www.w3.org/1999/xhtml",
    tabIndex: -1,
    className: c,
    style: v,
    ref: e.innerRef
  }, e.children);
}
var SP = /* @__PURE__ */ h.memo(AP), ip = () => {
  var e;
  return (e = z((t) => t.rootProps.accessibilityLayer)) !== null && e !== void 0 ? e : !0;
};
function _l() {
  return _l = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, _l.apply(null, arguments);
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
function Tc(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Mc(Object(r), !0).forEach(function(n) {
      _P(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Mc(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function _P(e, t, r) {
  return (t = kP(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function kP(e) {
  var t = EP(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function EP(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Dc = {
  curveBasisClosed: bb,
  curveBasisOpen: wb,
  curveBasis: yb,
  curveBumpX: ib,
  curveBumpY: ab,
  curveLinearClosed: xb,
  curveLinear: $a,
  curveMonotoneX: Pb,
  curveMonotoneY: Ob,
  curveNatural: Ab,
  curveStep: Sb,
  curveStepAfter: kb,
  curveStepBefore: _b
}, oa = (e) => G(e.x) && G(e.y), Nc = (e) => e.base != null && oa(e.base) && oa(e), wn = (e) => e.x, xn = (e) => e.y, CP = (e, t) => {
  if (typeof e == "function")
    return e;
  var r = "curve".concat(Xn(e));
  if ((r === "curveMonotone" || r === "curveBump") && t) {
    var n = Dc["".concat(r).concat(t === "vertical" ? "Y" : "X")];
    if (n)
      return n;
  }
  return Dc[r] || $a;
}, $c = {
  connectNulls: !1,
  type: "linear"
}, jP = (e) => {
  var {
    type: t = $c.type,
    points: r = [],
    baseLine: n,
    layout: i,
    connectNulls: a = $c.connectNulls
  } = e, o = CP(t, i), l = a ? r.filter(oa) : r;
  if (Array.isArray(n)) {
    var u, s = r.map((p, g) => Tc(Tc({}, p), {}, {
      base: n[g]
    }));
    i === "vertical" ? u = pi().y(xn).x1(wn).x0((p) => p.base.x) : u = pi().x(wn).y1(xn).y0((p) => p.base.y);
    var c = u.defined(Nc).curve(o), f = a ? s.filter(Nc) : s;
    return c(f);
  }
  var d;
  i === "vertical" && R(n) ? d = pi().y(xn).x1(wn).x0(n) : R(n) ? d = pi().x(wn).y1(xn).y0(n) : d = kv().x(wn).y(xn);
  var v = d.defined(oa).curve(o);
  return v(l);
}, Li = (e) => {
  var {
    className: t,
    points: r,
    path: n,
    pathRef: i
  } = e, a = un();
  if ((!r || !r.length) && !n)
    return null;
  var o = {
    type: e.type,
    points: e.points,
    baseLine: e.baseLine,
    layout: e.layout || a,
    connectNulls: e.connectNulls
  }, l = r && r.length ? jP(o) : n;
  return /* @__PURE__ */ h.createElement("path", _l({}, ht(e), au(e), {
    className: J("recharts-curve", t),
    d: l === null ? void 0 : l,
    ref: i
  }));
}, IP = ["x", "y", "top", "left", "width", "height", "className"];
function kl() {
  return kl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, kl.apply(null, arguments);
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
function MP(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Lc(Object(r), !0).forEach(function(n) {
      TP(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Lc(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function TP(e, t, r) {
  return (t = DP(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function DP(e) {
  var t = NP(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function NP(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function $P(e, t) {
  if (e == null) return {};
  var r, n, i = LP(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function LP(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var RP = (e, t, r, n, i, a) => "M".concat(e, ",").concat(i, "v").concat(n, "M").concat(a, ",").concat(t, "h").concat(r), zP = (e) => {
  var {
    x: t = 0,
    y: r = 0,
    top: n = 0,
    left: i = 0,
    width: a = 0,
    height: o = 0,
    className: l
  } = e, u = $P(e, IP), s = MP({
    x: t,
    y: r,
    top: n,
    left: i,
    width: a,
    height: o
  }, u);
  return !R(t) || !R(r) || !R(a) || !R(o) || !R(n) || !R(i) ? null : /* @__PURE__ */ h.createElement("path", kl({}, Ze(s), {
    className: J("recharts-cross", l),
    d: RP(t, r, a, o, n, i)
  }));
};
function BP(e, t, r, n) {
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
function Rc(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function zc(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Rc(Object(r), !0).forEach(function(n) {
      FP(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Rc(Object(r)).forEach(function(n) {
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
var KP = (e) => e.replace(/([A-Z])/g, (t) => "-".concat(t.toLowerCase())), HP = (e, t, r) => e.map((n) => "".concat(KP(n), " ").concat(t, "ms ").concat(r)).join(","), GP = (e, t) => [Object.keys(e), Object.keys(t)].reduce((r, n) => r.filter((i) => n.includes(i))), Fn = (e, t) => Object.keys(t).reduce((r, n) => zc(zc({}, r), {}, {
  [n]: e(n, t[n])
}), {});
function Bc(e, t) {
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
    t % 2 ? Bc(Object(r), !0).forEach(function(n) {
      qP(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Bc(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function qP(e, t, r) {
  return (t = YP(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function YP(e) {
  var t = VP(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function VP(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var la = (e, t, r) => e + (t - e) * r, El = (e) => {
  var {
    from: t,
    to: r
  } = e;
  return t !== r;
}, ap = (e, t, r) => {
  var n = Fn((i, a) => {
    if (El(a)) {
      var [o, l] = e(a.from, a.to, a.velocity);
      return me(me({}, a), {}, {
        from: o,
        velocity: l
      });
    }
    return a;
  }, t);
  return r < 1 ? Fn((i, a) => El(a) && n[i] != null ? me(me({}, a), {}, {
    velocity: la(a.velocity, n[i].velocity, r),
    from: la(a.from, n[i].from, r)
  }) : a, t) : ap(e, n, r - 1);
};
function XP(e, t, r, n, i, a) {
  var o, l = n.reduce((d, v) => me(me({}, d), {}, {
    [v]: {
      from: e[v],
      velocity: 0,
      to: t[v]
    }
  }), {}), u = () => Fn((d, v) => v.from, l), s = () => !Object.values(l).filter(El).length, c = null, f = (d) => {
    o || (o = d);
    var v = d - o, p = v / r.dt;
    l = ap(r, l, p), i(me(me(me({}, e), t), u())), o = d, s() || (c = a.setTimeout(f));
  };
  return () => (c = a.setTimeout(f), () => {
    var d;
    (d = c) === null || d === void 0 || d();
  });
}
function ZP(e, t, r, n, i, a, o) {
  var l = null, u = i.reduce((f, d) => {
    var v = e[d], p = t[d];
    return v == null || p == null ? f : me(me({}, f), {}, {
      [d]: [v, p]
    });
  }, {}), s, c = (f) => {
    s || (s = f);
    var d = (f - s) / n, v = Fn((g, m) => la(...m, r(d)), u);
    if (a(me(me(me({}, e), t), v)), d < 1)
      l = o.setTimeout(c);
    else {
      var p = Fn((g, m) => la(...m, r(1)), u);
      a(me(me(me({}, e), t), p));
    }
  };
  return () => (l = o.setTimeout(c), () => {
    var f;
    (f = l) === null || f === void 0 || f();
  });
}
const QP = (e, t, r, n, i, a) => {
  var o = GP(e, t);
  return r == null ? () => (i(me(me({}, e), t)), () => {
  }) : r.isStepper === !0 ? XP(e, t, r, o, i, a) : ZP(e, t, r, n, o, i, a);
};
var ua = 1e-4, op = (e, t) => [0, 3 * e, 3 * t - 6 * e, 3 * e - 3 * t + 1], lp = (e, t) => e.map((r, n) => r * t ** n).reduce((r, n) => r + n), Fc = (e, t) => (r) => {
  var n = op(e, t);
  return lp(n, r);
}, JP = (e, t) => (r) => {
  var n = op(e, t), i = [...n.map((a, o) => a * o).slice(1), 0];
  return lp(i, r);
}, eO = (e) => {
  var t, r = e.split("(");
  if (r.length !== 2 || r[0] !== "cubic-bezier")
    return null;
  var n = (t = r[1]) === null || t === void 0 || (t = t.split(")")[0]) === null || t === void 0 ? void 0 : t.split(",");
  if (n == null || n.length !== 4)
    return null;
  var i = n.map((a) => parseFloat(a));
  return [i[0], i[1], i[2], i[3]];
}, tO = function() {
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
        var i = eO(r[0]);
        if (i)
          return i;
      }
    }
  return r.length === 4 ? r : [0, 0, 1, 1];
}, rO = (e, t, r, n) => {
  var i = Fc(e, r), a = Fc(t, n), o = JP(e, r), l = (s) => s > 1 ? 1 : s < 0 ? 0 : s, u = (s) => {
    for (var c = s > 1 ? 1 : s, f = c, d = 0; d < 8; ++d) {
      var v = i(f) - c, p = o(f);
      if (Math.abs(v - c) < ua || p < ua)
        return a(f);
      f = l(f - v / p);
    }
    return a(f);
  };
  return u.isStepper = !1, u;
}, Wc = function() {
  return rO(...tO(...arguments));
}, nO = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, {
    stiff: r = 100,
    damping: n = 8,
    dt: i = 17
  } = t, a = (o, l, u) => {
    var s = -(o - l) * r, c = u * n, f = u + (s - c) * i / 1e3, d = u * i / 1e3 + o;
    return Math.abs(d - l) < ua && Math.abs(f) < ua ? [l, 0] : [d, f];
  };
  return a.isStepper = !0, a.dt = i, a;
}, iO = (e) => {
  if (typeof e == "string")
    switch (e) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return Wc(e);
      case "spring":
        return nO();
      default:
        if (e.split("(")[0] === "cubic-bezier")
          return Wc(e);
    }
  return typeof e == "function" ? e : null;
};
function aO(e) {
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
class oO {
  setTimeout(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = performance.now(), i = null, a = (o) => {
      o - n >= r ? t(o) : typeof requestAnimationFrame == "function" && (i = requestAnimationFrame(a));
    };
    return i = requestAnimationFrame(a), () => {
      i != null && cancelAnimationFrame(i);
    };
  }
}
function lO() {
  return aO(new oO());
}
var uO = /* @__PURE__ */ h.createContext(lO);
function sO(e, t) {
  var r = h.useContext(uO);
  return h.useMemo(() => t ?? r(e), [e, t, r]);
}
var cO = {
  begin: 0,
  duration: 1e3,
  easing: "ease",
  isActive: !0,
  canBegin: !0,
  onAnimationEnd: () => {
  },
  onAnimationStart: () => {
  }
}, Uc = {
  t: 0
}, Mo = {
  t: 1
};
function up(e) {
  var t = Ke(e, cO), {
    isActive: r,
    canBegin: n,
    duration: i,
    easing: a,
    begin: o,
    onAnimationEnd: l,
    onAnimationStart: u,
    children: s
  } = t, c = np(), f = r === "auto" ? !ni.isSsr && !c : r, d = sO(t.animationId, t.animationManager), [v, p] = h.useState(f ? Uc : Mo), g = h.useRef(null);
  return h.useEffect(() => {
    f || p(Mo);
  }, [f]), h.useEffect(() => {
    if (!f || !n)
      return Lr;
    var m = QP(Uc, Mo, iO(a), i, p, d.getTimeoutController()), y = () => {
      g.current = m();
    };
    return d.start([u, o, y, i, l]), () => {
      d.stop(), g.current && g.current(), l();
    };
  }, [f, n, i, a, o, u, l, d]), s(v.t);
}
function sp(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "animation-", r = h.useRef(Dn(t)), n = h.useRef(e);
  return n.current !== e && (r.current = Dn(t), n.current = e), r.current;
}
var fO = ["radius"], dO = ["radius"], Kc, Hc, Gc, qc, Yc, Vc, Xc, Zc, Qc, Jc;
function ef(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function tf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ef(Object(r), !0).forEach(function(n) {
      vO(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ef(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function vO(e, t, r) {
  return (t = hO(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function hO(e) {
  var t = pO(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function pO(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function sa() {
  return sa = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, sa.apply(null, arguments);
}
function rf(e, t) {
  if (e == null) return {};
  var r, n, i = mO(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function mO(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function gt(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var nf = (e, t, r, n, i) => {
  var a = ir(r), o = ir(n), l = Math.min(Math.abs(a) / 2, Math.abs(o) / 2), u = o >= 0 ? 1 : -1, s = a >= 0 ? 1 : -1, c = o >= 0 && a >= 0 || o < 0 && a < 0 ? 1 : 0, f;
  if (l > 0 && Array.isArray(i)) {
    for (var d = [0, 0, 0, 0], v = 0, p = 4; v < p; v++) {
      var g, m = (g = i[v]) !== null && g !== void 0 ? g : 0;
      d[v] = m > l ? l : m;
    }
    f = ke(Kc || (Kc = gt(["M", ",", ""])), e, t + u * d[0]), d[0] > 0 && (f += ke(Hc || (Hc = gt(["A ", ",", ",0,0,", ",", ",", ""])), d[0], d[0], c, e + s * d[0], t)), f += ke(Gc || (Gc = gt(["L ", ",", ""])), e + r - s * d[1], t), d[1] > 0 && (f += ke(qc || (qc = gt(["A ", ",", ",0,0,", `,
        `, ",", ""])), d[1], d[1], c, e + r, t + u * d[1])), f += ke(Yc || (Yc = gt(["L ", ",", ""])), e + r, t + n - u * d[2]), d[2] > 0 && (f += ke(Vc || (Vc = gt(["A ", ",", ",0,0,", `,
        `, ",", ""])), d[2], d[2], c, e + r - s * d[2], t + n)), f += ke(Xc || (Xc = gt(["L ", ",", ""])), e + s * d[3], t + n), d[3] > 0 && (f += ke(Zc || (Zc = gt(["A ", ",", ",0,0,", `,
        `, ",", ""])), d[3], d[3], c, e, t + n - u * d[3])), f += "Z";
  } else if (l > 0 && i === +i && i > 0) {
    var y = Math.min(l, i);
    f = ke(Qc || (Qc = gt(["M ", ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", " Z"])), e, t + u * y, y, y, c, e + s * y, t, e + r - s * y, t, y, y, c, e + r, t + u * y, e + r, t + n - u * y, y, y, c, e + r - s * y, t + n, e + s * y, t + n, y, y, c, e, t + n - u * y);
  } else
    f = ke(Jc || (Jc = gt(["M ", ",", " h ", " v ", " h ", " Z"])), e, t, r, n, -r);
  return f;
}, af = {
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
}, gO = (e) => {
  var t = Ke(e, af), r = h.useRef(null), [n, i] = h.useState(-1);
  h.useEffect(() => {
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
    animationBegin: v,
    isAnimationActive: p,
    isUpdateAnimationActive: g
  } = t, m = h.useRef(l), y = h.useRef(u), w = h.useRef(a), b = h.useRef(o), x = h.useMemo(() => ({
    x: a,
    y: o,
    width: l,
    height: u,
    radius: s
  }), [a, o, l, u, s]), O = sp(x, "rectangle-");
  if (a !== +a || o !== +o || l !== +l || u !== +u || l === 0 || u === 0)
    return null;
  var P = J("recharts-rectangle", c);
  if (!g) {
    var _ = Ze(t), {
      radius: A
    } = _, C = rf(_, fO);
    return /* @__PURE__ */ h.createElement("path", sa({}, C, {
      x: ir(a),
      y: ir(o),
      width: ir(l),
      height: ir(u),
      radius: typeof s == "number" ? s : void 0,
      className: P,
      d: nf(a, o, l, u, s)
    }));
  }
  var T = m.current, I = y.current, k = w.current, B = b.current, F = "0px ".concat(n === -1 ? 1 : n, "px"), W = "".concat(n, "px ").concat(n, "px"), q = HP(["strokeDasharray"], d, typeof f == "string" ? f : af.animationEasing);
  return /* @__PURE__ */ h.createElement(up, {
    animationId: O,
    key: O,
    canBegin: n > 0,
    duration: d,
    easing: f,
    isActive: g,
    begin: v
  }, (V) => {
    var re = xt(T, l, V), Q = xt(I, u, V), M = xt(k, a, V), Le = xt(B, o, V);
    r.current && (m.current = re, y.current = Q, w.current = M, b.current = Le);
    var ue;
    p ? V > 0 ? ue = {
      transition: q,
      strokeDasharray: W
    } : ue = {
      strokeDasharray: F
    } : ue = {
      strokeDasharray: W
    };
    var Fe = Ze(t), {
      radius: be
    } = Fe, ne = rf(Fe, dO);
    return /* @__PURE__ */ h.createElement("path", sa({}, ne, {
      radius: typeof s == "number" ? s : void 0,
      className: P,
      d: nf(M, Le, re, Q, s),
      ref: r,
      style: tf(tf({}, ue), t.style)
    }));
  });
};
function of(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function lf(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? of(Object(r), !0).forEach(function(n) {
      yO(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : of(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function yO(e, t, r) {
  return (t = bO(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function bO(e) {
  var t = wO(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function wO(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ca = Math.PI / 180, xO = (e) => e * 180 / Math.PI, Ce = (e, t, r, n) => ({
  x: e + Math.cos(-ca * n) * r,
  y: t + Math.sin(-ca * n) * r
}), PO = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  return Math.min(Math.abs(t - (n.left || 0) - (n.right || 0)), Math.abs(r - (n.top || 0) - (n.bottom || 0))) / 2;
}, OO = (e, t) => {
  var {
    x: r,
    y: n
  } = e, {
    x: i,
    y: a
  } = t;
  return Math.sqrt((r - i) ** 2 + (n - a) ** 2);
}, AO = (e, t) => {
  var {
    x: r,
    y: n
  } = e, {
    cx: i,
    cy: a
  } = t, o = OO({
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
    angle: xO(u),
    angleInRadian: u
  };
}, SO = (e) => {
  var {
    startAngle: t,
    endAngle: r
  } = e, n = Math.floor(t / 360), i = Math.floor(r / 360), a = Math.min(n, i);
  return {
    startAngle: t - a * 360,
    endAngle: r - a * 360
  };
}, _O = (e, t) => {
  var {
    startAngle: r,
    endAngle: n
  } = t, i = Math.floor(r / 360), a = Math.floor(n / 360), o = Math.min(i, a);
  return e + o * 360;
}, kO = (e, t) => {
  var {
    relativeX: r,
    relativeY: n
  } = e, {
    radius: i,
    angle: a
  } = AO({
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
  } = SO(t), c = a, f;
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
  return f ? lf(lf({}, t), {}, {
    radius: i,
    angle: _O(c, t)
  }) : null;
};
function cp(e) {
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
var uf, sf, cf, ff, df, vf, hf;
function Cl() {
  return Cl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Cl.apply(null, arguments);
}
function xr(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var EO = (e, t) => {
  var r = it(t - e), n = Math.min(Math.abs(t - e), 359.999);
  return r * n;
}, Oi = (e) => {
  var {
    cx: t,
    cy: r,
    radius: n,
    angle: i,
    sign: a,
    isExternal: o,
    cornerRadius: l,
    cornerIsExternal: u
  } = e, s = l * (o ? 1 : -1) + n, c = Math.asin(l / s) / ca, f = u ? i : i + a * c, d = Ce(t, r, s, f), v = Ce(t, r, n, f), p = u ? i - a * c : i, g = Ce(t, r, s * Math.cos(c * ca), p);
  return {
    center: d,
    circleTangency: v,
    lineTangency: g,
    theta: c
  };
}, fp = (e) => {
  var {
    cx: t,
    cy: r,
    innerRadius: n,
    outerRadius: i,
    startAngle: a,
    endAngle: o
  } = e, l = EO(a, o), u = a + l, s = Ce(t, r, i, a), c = Ce(t, r, i, u), f = ke(uf || (uf = xr(["M ", ",", `
    A `, ",", `,0,
    `, ",", `,
    `, ",", `
  `])), s.x, s.y, i, i, +(Math.abs(l) > 180), +(a > u), c.x, c.y);
  if (n > 0) {
    var d = Ce(t, r, n, a), v = Ce(t, r, n, u);
    f += ke(sf || (sf = xr(["L ", ",", `
            A `, ",", `,0,
            `, ",", `,
            `, ",", " Z"])), v.x, v.y, n, n, +(Math.abs(l) > 180), +(a <= u), d.x, d.y);
  } else
    f += ke(cf || (cf = xr(["L ", ",", " Z"])), t, r);
  return f;
}, CO = (e) => {
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
  } = e, c = it(s - u), {
    circleTangency: f,
    lineTangency: d,
    theta: v
  } = Oi({
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
  } = Oi({
    cx: t,
    cy: r,
    radius: i,
    angle: s,
    sign: -c,
    cornerRadius: a,
    cornerIsExternal: l
  }), y = l ? Math.abs(u - s) : Math.abs(u - s) - v - m;
  if (y < 0)
    return o ? ke(ff || (ff = xr(["M ", ",", `
        a`, ",", ",0,0,1,", `,0
        a`, ",", ",0,0,1,", `,0
      `])), d.x, d.y, a, a, a * 2, a, a, -a * 2) : fp({
      cx: t,
      cy: r,
      innerRadius: n,
      outerRadius: i,
      startAngle: u,
      endAngle: s
    });
  var w = ke(df || (df = xr(["M ", ",", `
    A`, ",", ",0,0,", ",", ",", `
    A`, ",", ",0,", ",", ",", ",", `
    A`, ",", ",0,0,", ",", ",", `
  `])), d.x, d.y, a, a, +(c < 0), f.x, f.y, i, i, +(y > 180), +(c < 0), p.x, p.y, a, a, +(c < 0), g.x, g.y);
  if (n > 0) {
    var {
      circleTangency: b,
      lineTangency: x,
      theta: O
    } = Oi({
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
    } = Oi({
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
      return "".concat(w, "L").concat(t, ",").concat(r, "Z");
    w += ke(vf || (vf = xr(["L", ",", `
      A`, ",", ",0,0,", ",", ",", `
      A`, ",", ",0,", ",", ",", ",", `
      A`, ",", ",0,0,", ",", ",", "Z"])), _.x, _.y, a, a, +(c < 0), P.x, P.y, n, n, +(C > 180), +(c > 0), b.x, b.y, a, a, +(c < 0), x.x, x.y);
  } else
    w += ke(hf || (hf = xr(["L", ",", "Z"])), t, r);
  return w;
}, jO = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: !1,
  cornerIsExternal: !1
}, IO = (e) => {
  var t = Ke(e, jO), {
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
  var d = J("recharts-sector", f), v = a - i, p = lr(o, v, 0, !0), g;
  return p > 0 && Math.abs(s - c) < 360 ? g = CO({
    cx: r,
    cy: n,
    innerRadius: i,
    outerRadius: a,
    cornerRadius: Math.min(p, v / 2),
    forceCornerRadius: l,
    cornerIsExternal: u,
    startAngle: s,
    endAngle: c
  }) : g = fp({
    cx: r,
    cy: n,
    innerRadius: i,
    outerRadius: a,
    startAngle: s,
    endAngle: c
  }), /* @__PURE__ */ h.createElement("path", Cl({}, Ze(t), {
    className: d,
    d: g
  }));
};
function MO(e, t, r) {
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
  if (Kv(t)) {
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
    return cp(t);
  }
}
function TO(e) {
  return oh(e) ? NaN : Number(e);
}
function To(e) {
  return e ? (e = TO(e), e === 1 / 0 || e === -1 / 0 ? (e < 0 ? -1 : 1) * Number.MAX_VALUE : e === e ? e : 0) : e === 0 ? e : 0;
}
function dp(e, t, r) {
  r && typeof r != "number" && ol(e, t, r) && (t = r = void 0), e = To(e), t === void 0 ? (t = e, e = 0) : t = To(t), r = r === void 0 ? e < t ? 1 : -1 : To(r);
  const n = Math.max(Math.ceil((t - e) / (r || 1)), 0), i = new Array(n);
  for (let a = 0; a < n; a++)
    i[a] = e, e += r;
  return i;
}
var qt = (e) => e.chartData, vp = S([qt], (e) => {
  var t = e.chartData != null ? e.chartData.length - 1 : 0;
  return {
    chartData: e.chartData,
    computedData: e.computedData,
    dataEndIndex: t,
    dataStartIndex: 0
  };
}), hp = (e, t, r, n) => n ? vp(e) : qt(e), DO = (e, t, r) => r ? vp(e) : qt(e);
function At(e) {
  if (Array.isArray(e) && e.length === 2) {
    var [t, r] = e;
    if (G(t) && G(r))
      return !0;
  }
  return !1;
}
function pf(e, t, r) {
  return r ? e : [Math.min(e[0], t[0]), Math.max(e[1], t[1])];
}
function pp(e, t) {
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
    if (At(o))
      return o;
  }
}
function NO(e, t, r) {
  if (!(!r && t == null)) {
    if (typeof e == "function" && t != null)
      try {
        var n = e(t, r);
        if (At(n))
          return pf(n, t, r);
      } catch {
      }
    if (Array.isArray(e) && e.length === 2) {
      var [i, a] = e, o, l;
      if (i === "auto")
        t != null && (o = Math.min(...t));
      else if (R(i))
        o = i;
      else if (typeof i == "function")
        try {
          t != null && (o = i(t?.[0]));
        } catch {
        }
      else if (typeof i == "string" && fc.test(i)) {
        var u = fc.exec(i);
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
      else if (R(a))
        l = a;
      else if (typeof a == "function")
        try {
          t != null && (l = a(t?.[1]));
        } catch {
        }
      else if (typeof a == "string" && dc.test(a)) {
        var c = dc.exec(a);
        if (c == null || c[1] == null || t == null)
          l = void 0;
        else {
          var f = +c[1];
          l = t[1] + f;
        }
      } else
        l = t?.[1];
      var d = [o, l];
      if (At(d))
        return t == null ? d : pf(d, t, r);
    }
  }
}
var sn = 1e9, $O = {
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
}, Pu, oe = !0, ut = "[DecimalError] ", _r = ut + "Invalid argument: ", xu = ut + "Exponent out of range: ", cn = Math.floor, br = Math.pow, LO = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Ye, xe = 1e7, ae = 7, mp = 9007199254740991, fa = cn(mp / ae), L = {};
L.absoluteValue = L.abs = function() {
  var e = new this.constructor(this);
  return e.s && (e.s = 1), e;
};
L.comparedTo = L.cmp = function(e) {
  var t, r, n, i, a = this;
  if (e = new a.constructor(e), a.s !== e.s) return a.s || -e.s;
  if (a.e !== e.e) return a.e > e.e ^ a.s < 0 ? 1 : -1;
  for (n = a.d.length, i = e.d.length, t = 0, r = n < i ? n : i; t < r; ++t)
    if (a.d[t] !== e.d[t]) return a.d[t] > e.d[t] ^ a.s < 0 ? 1 : -1;
  return n === i ? 0 : n > i ^ a.s < 0 ? 1 : -1;
};
L.decimalPlaces = L.dp = function() {
  var e = this, t = e.d.length - 1, r = (t - e.e) * ae;
  if (t = e.d[t], t) for (; t % 10 == 0; t /= 10) r--;
  return r < 0 ? 0 : r;
};
L.dividedBy = L.div = function(e) {
  return Rt(this, new this.constructor(e));
};
L.dividedToIntegerBy = L.idiv = function(e) {
  var t = this, r = t.constructor;
  return ee(Rt(t, new r(e), 0, 1), r.precision);
};
L.equals = L.eq = function(e) {
  return !this.cmp(e);
};
L.exponent = function() {
  return de(this);
};
L.greaterThan = L.gt = function(e) {
  return this.cmp(e) > 0;
};
L.greaterThanOrEqualTo = L.gte = function(e) {
  return this.cmp(e) >= 0;
};
L.isInteger = L.isint = function() {
  return this.e > this.d.length - 2;
};
L.isNegative = L.isneg = function() {
  return this.s < 0;
};
L.isPositive = L.ispos = function() {
  return this.s > 0;
};
L.isZero = function() {
  return this.s === 0;
};
L.lessThan = L.lt = function(e) {
  return this.cmp(e) < 0;
};
L.lessThanOrEqualTo = L.lte = function(e) {
  return this.cmp(e) < 1;
};
L.logarithm = L.log = function(e) {
  var t, r = this, n = r.constructor, i = n.precision, a = i + 5;
  if (e === void 0)
    e = new n(10);
  else if (e = new n(e), e.s < 1 || e.eq(Ye)) throw Error(ut + "NaN");
  if (r.s < 1) throw Error(ut + (r.s ? "NaN" : "-Infinity"));
  return r.eq(Ye) ? new n(0) : (oe = !1, t = Rt(Wn(r, a), Wn(e, a), a), oe = !0, ee(t, i));
};
L.minus = L.sub = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? bp(t, e) : gp(t, (e.s = -e.s, e));
};
L.modulo = L.mod = function(e) {
  var t, r = this, n = r.constructor, i = n.precision;
  if (e = new n(e), !e.s) throw Error(ut + "NaN");
  return r.s ? (oe = !1, t = Rt(r, e, 0, 1).times(e), oe = !0, r.minus(t)) : ee(new n(r), i);
};
L.naturalExponential = L.exp = function() {
  return yp(this);
};
L.naturalLogarithm = L.ln = function() {
  return Wn(this);
};
L.negated = L.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s || 0, e;
};
L.plus = L.add = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? gp(t, e) : bp(t, (e.s = -e.s, e));
};
L.precision = L.sd = function(e) {
  var t, r, n, i = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(_r + e);
  if (t = de(i) + 1, n = i.d.length - 1, r = n * ae + 1, n = i.d[n], n) {
    for (; n % 10 == 0; n /= 10) r--;
    for (n = i.d[0]; n >= 10; n /= 10) r++;
  }
  return e && t > r ? t : r;
};
L.squareRoot = L.sqrt = function() {
  var e, t, r, n, i, a, o, l = this, u = l.constructor;
  if (l.s < 1) {
    if (!l.s) return new u(0);
    throw Error(ut + "NaN");
  }
  for (e = de(l), oe = !1, i = Math.sqrt(+l), i == 0 || i == 1 / 0 ? (t = Ot(l.d), (t.length + e) % 2 == 0 && (t += "0"), i = Math.sqrt(t), e = cn((e + 1) / 2) - (e < 0 || e % 2), i == 1 / 0 ? t = "5e" + e : (t = i.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new u(t)) : n = new u(i.toString()), r = u.precision, i = o = r + 3; ; )
    if (a = n, n = a.plus(Rt(l, a, o + 2)).times(0.5), Ot(a.d).slice(0, o) === (t = Ot(n.d)).slice(0, o)) {
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
L.times = L.mul = function(e) {
  var t, r, n, i, a, o, l, u, s, c = this, f = c.constructor, d = c.d, v = (e = new f(e)).d;
  if (!c.s || !e.s) return new f(0);
  for (e.s *= c.s, r = c.e + e.e, u = d.length, s = v.length, u < s && (a = d, d = v, v = a, o = u, u = s, s = o), a = [], o = u + s, n = o; n--; ) a.push(0);
  for (n = s; --n >= 0; ) {
    for (t = 0, i = u + n; i > n; )
      l = a[i] + v[n] * d[i - n - 1] + t, a[i--] = l % xe | 0, t = l / xe | 0;
    a[i] = (a[i] + t) % xe | 0;
  }
  for (; !a[--o]; ) a.pop();
  return t ? ++r : a.shift(), e.d = a, e.e = r, oe ? ee(e, f.precision) : e;
};
L.toDecimalPlaces = L.todp = function(e, t) {
  var r = this, n = r.constructor;
  return r = new n(r), e === void 0 ? r : (jt(e, 0, sn), t === void 0 ? t = n.rounding : jt(t, 0, 8), ee(r, e + de(r) + 1, t));
};
L.toExponential = function(e, t) {
  var r, n = this, i = n.constructor;
  return e === void 0 ? r = Dr(n, !0) : (jt(e, 0, sn), t === void 0 ? t = i.rounding : jt(t, 0, 8), n = ee(new i(n), e + 1, t), r = Dr(n, !0, e + 1)), r;
};
L.toFixed = function(e, t) {
  var r, n, i = this, a = i.constructor;
  return e === void 0 ? Dr(i) : (jt(e, 0, sn), t === void 0 ? t = a.rounding : jt(t, 0, 8), n = ee(new a(i), e + de(i) + 1, t), r = Dr(n.abs(), !1, e + de(n) + 1), i.isneg() && !i.isZero() ? "-" + r : r);
};
L.toInteger = L.toint = function() {
  var e = this, t = e.constructor;
  return ee(new t(e), de(e) + 1, t.rounding);
};
L.toNumber = function() {
  return +this;
};
L.toPower = L.pow = function(e) {
  var t, r, n, i, a, o, l = this, u = l.constructor, s = 12, c = +(e = new u(e));
  if (!e.s) return new u(Ye);
  if (l = new u(l), !l.s) {
    if (e.s < 1) throw Error(ut + "Infinity");
    return l;
  }
  if (l.eq(Ye)) return l;
  if (n = u.precision, e.eq(Ye)) return ee(l, n);
  if (t = e.e, r = e.d.length - 1, o = t >= r, a = l.s, o) {
    if ((r = c < 0 ? -c : c) <= mp) {
      for (i = new u(Ye), t = Math.ceil(n / ae + 4), oe = !1; r % 2 && (i = i.times(l), gf(i.d, t)), r = cn(r / 2), r !== 0; )
        l = l.times(l), gf(l.d, t);
      return oe = !0, e.s < 0 ? new u(Ye).div(i) : ee(i, n);
    }
  } else if (a < 0) throw Error(ut + "NaN");
  return a = a < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1, l.s = 1, oe = !1, i = e.times(Wn(l, n + s)), oe = !0, i = yp(i), i.s = a, i;
};
L.toPrecision = function(e, t) {
  var r, n, i = this, a = i.constructor;
  return e === void 0 ? (r = de(i), n = Dr(i, r <= a.toExpNeg || r >= a.toExpPos)) : (jt(e, 1, sn), t === void 0 ? t = a.rounding : jt(t, 0, 8), i = ee(new a(i), e, t), r = de(i), n = Dr(i, e <= r || r <= a.toExpNeg, e)), n;
};
L.toSignificantDigits = L.tosd = function(e, t) {
  var r = this, n = r.constructor;
  return e === void 0 ? (e = n.precision, t = n.rounding) : (jt(e, 1, sn), t === void 0 ? t = n.rounding : jt(t, 0, 8)), ee(new n(r), e, t);
};
L.toString = L.valueOf = L.val = L.toJSON = L[Symbol.for("nodejs.util.inspect.custom")] = function() {
  var e = this, t = de(e), r = e.constructor;
  return Dr(e, t <= r.toExpNeg || t >= r.toExpPos);
};
function gp(e, t) {
  var r, n, i, a, o, l, u, s, c = e.constructor, f = c.precision;
  if (!e.s || !t.s)
    return t.s || (t = new c(e)), oe ? ee(t, f) : t;
  if (u = e.d, s = t.d, o = e.e, i = t.e, u = u.slice(), a = o - i, a) {
    for (a < 0 ? (n = u, a = -a, l = s.length) : (n = s, i = o, l = u.length), o = Math.ceil(f / ae), l = o > l ? o + 1 : l + 1, a > l && (a = l, n.length = 1), n.reverse(); a--; ) n.push(0);
    n.reverse();
  }
  for (l = u.length, a = s.length, l - a < 0 && (a = l, n = s, s = u, u = n), r = 0; a; )
    r = (u[--a] = u[a] + s[a] + r) / xe | 0, u[a] %= xe;
  for (r && (u.unshift(r), ++i), l = u.length; u[--l] == 0; ) u.pop();
  return t.d = u, t.e = i, oe ? ee(t, f) : t;
}
function jt(e, t, r) {
  if (e !== ~~e || e < t || e > r)
    throw Error(_r + e);
}
function Ot(e) {
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
var Rt = /* @__PURE__ */ (function() {
  function e(n, i) {
    var a, o = 0, l = n.length;
    for (n = n.slice(); l--; )
      a = n[l] * i + o, n[l] = a % xe | 0, o = a / xe | 0;
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
      n[a] -= o, o = n[a] < i[a] ? 1 : 0, n[a] = o * xe + n[a] - i[a];
    for (; !n[0] && n.length > 1; ) n.shift();
  }
  return function(n, i, a, o) {
    var l, u, s, c, f, d, v, p, g, m, y, w, b, x, O, P, _, A, C = n.constructor, T = n.s == i.s ? 1 : -1, I = n.d, k = i.d;
    if (!n.s) return new C(n);
    if (!i.s) throw Error(ut + "Division by zero");
    for (u = n.e - i.e, _ = k.length, O = I.length, v = new C(T), p = v.d = [], s = 0; k[s] == (I[s] || 0); ) ++s;
    if (k[s] > (I[s] || 0) && --u, a == null ? w = a = C.precision : o ? w = a + (de(n) - de(i)) + 1 : w = a, w < 0) return new C(0);
    if (w = w / ae + 2 | 0, s = 0, _ == 1)
      for (c = 0, k = k[0], w++; (s < O || c) && w--; s++)
        b = c * xe + (I[s] || 0), p[s] = b / k | 0, c = b % k | 0;
    else {
      for (c = xe / (k[0] + 1) | 0, c > 1 && (k = e(k, c), I = e(I, c), _ = k.length, O = I.length), x = _, g = I.slice(0, _), m = g.length; m < _; ) g[m++] = 0;
      A = k.slice(), A.unshift(0), P = k[0], k[1] >= xe / 2 && ++P;
      do
        c = 0, l = t(k, g, _, m), l < 0 ? (y = g[0], _ != m && (y = y * xe + (g[1] || 0)), c = y / P | 0, c > 1 ? (c >= xe && (c = xe - 1), f = e(k, c), d = f.length, m = g.length, l = t(f, g, d, m), l == 1 && (c--, r(f, _ < d ? A : k, d))) : (c == 0 && (l = c = 1), f = k.slice()), d = f.length, d < m && f.unshift(0), r(g, f, m), l == -1 && (m = g.length, l = t(k, g, _, m), l < 1 && (c++, r(g, _ < m ? A : k, m))), m = g.length) : l === 0 && (c++, g = [0]), p[s++] = c, l && g[0] ? g[m++] = I[x] || 0 : (g = [I[x]], m = 1);
      while ((x++ < O || g[0] !== void 0) && w--);
    }
    return p[0] || p.shift(), v.e = u, ee(v, o ? a + de(v) + 1 : a);
  };
})();
function yp(e, t) {
  var r, n, i, a, o, l, u = 0, s = 0, c = e.constructor, f = c.precision;
  if (de(e) > 16) throw Error(xu + de(e));
  if (!e.s) return new c(Ye);
  for (oe = !1, l = f, o = new c(0.03125); e.abs().gte(0.1); )
    e = e.times(o), s += 5;
  for (n = Math.log(br(2, s)) / Math.LN10 * 2 + 5 | 0, l += n, r = i = a = new c(Ye), c.precision = l; ; ) {
    if (i = ee(i.times(e), l), r = r.times(++u), o = a.plus(Rt(i, r, l)), Ot(o.d).slice(0, l) === Ot(a.d).slice(0, l)) {
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
function Do(e, t, r) {
  if (t > e.LN10.sd())
    throw oe = !0, r && (e.precision = r), Error(ut + "LN10 precision limit exceeded");
  return ee(new e(e.LN10), t);
}
function tr(e) {
  for (var t = ""; e--; ) t += "0";
  return t;
}
function Wn(e, t) {
  var r, n, i, a, o, l, u, s, c, f = 1, d = 10, v = e, p = v.d, g = v.constructor, m = g.precision;
  if (v.s < 1) throw Error(ut + (v.s ? "NaN" : "-Infinity"));
  if (v.eq(Ye)) return new g(0);
  if (t == null ? (oe = !1, s = m) : s = t, v.eq(10))
    return t == null && (oe = !0), Do(g, s);
  if (s += d, g.precision = s, r = Ot(p), n = r.charAt(0), a = de(v), Math.abs(a) < 15e14) {
    for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; )
      v = v.times(e), r = Ot(v.d), n = r.charAt(0), f++;
    a = de(v), n > 1 ? (v = new g("0." + r), a++) : v = new g(n + "." + r.slice(1));
  } else
    return u = Do(g, s + 2, m).times(a + ""), v = Wn(new g(n + "." + r.slice(1)), s - d).plus(u), g.precision = m, t == null ? (oe = !0, ee(v, m)) : v;
  for (l = o = v = Rt(v.minus(Ye), v.plus(Ye), s), c = ee(v.times(v), s), i = 3; ; ) {
    if (o = ee(o.times(c), s), u = l.plus(Rt(o, new g(i), s)), Ot(u.d).slice(0, s) === Ot(l.d).slice(0, s))
      return l = l.times(2), a !== 0 && (l = l.plus(Do(g, s + 2, m).times(a + ""))), l = Rt(l, new g(f), s), g.precision = m, t == null ? (oe = !0, ee(l, m)) : l;
    l = u, i += 2;
  }
}
function mf(e, t) {
  var r, n, i;
  for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; ) ++n;
  for (i = t.length; t.charCodeAt(i - 1) === 48; ) --i;
  if (t = t.slice(n, i), t) {
    if (i -= n, r = r - n - 1, e.e = cn(r / ae), e.d = [], n = (r + 1) % ae, r < 0 && (n += ae), n < i) {
      for (n && e.d.push(+t.slice(0, n)), i -= ae; n < i; ) e.d.push(+t.slice(n, n += ae));
      t = t.slice(n), n = ae - t.length;
    } else
      n -= i;
    for (; n--; ) t += "0";
    if (e.d.push(+t), oe && (e.e > fa || e.e < -fa)) throw Error(xu + r);
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
    return u ? (a = de(e), f.length = 1, t = t - a - 1, f[0] = br(10, (ae - t % ae) % ae), e.e = cn(-t / ae) || 0) : (f.length = 1, f[0] = e.e = e.s = 0), e;
  if (n == 0 ? (f.length = c, a = 1, c--) : (f.length = c + 1, a = br(10, ae - n), f[c] = i > 0 ? (s / br(10, o - i) % br(10, i) | 0) * a : 0), u)
    for (; ; )
      if (c == 0) {
        (f[0] += a) == xe && (f[0] = 1, ++e.e);
        break;
      } else {
        if (f[c] += a, f[c] != xe) break;
        f[c--] = 0, a = 1;
      }
  for (n = f.length; f[--n] === 0; ) f.pop();
  if (oe && (e.e > fa || e.e < -fa))
    throw Error(xu + de(e));
  return e;
}
function bp(e, t) {
  var r, n, i, a, o, l, u, s, c, f, d = e.constructor, v = d.precision;
  if (!e.s || !t.s)
    return t.s ? t.s = -t.s : t = new d(e), oe ? ee(t, v) : t;
  if (u = e.d, f = t.d, n = t.e, s = e.e, u = u.slice(), o = s - n, o) {
    for (c = o < 0, c ? (r = u, o = -o, l = f.length) : (r = f, n = s, l = u.length), i = Math.max(Math.ceil(v / ae), l) + 2, o > i && (o = i, r.length = 1), r.reverse(), i = o; i--; ) r.push(0);
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
      for (a = i; a && u[--a] === 0; ) u[a] = xe - 1;
      --u[a], u[i] += xe;
    }
    u[i] -= f[i];
  }
  for (; u[--l] === 0; ) u.pop();
  for (; u[0] === 0; u.shift()) --n;
  return u[0] ? (t.d = u, t.e = n, oe ? ee(t, v) : t) : new d(0);
}
function Dr(e, t, r) {
  var n, i = de(e), a = Ot(e.d), o = a.length;
  return t ? (r && (n = r - o) > 0 ? a = a.charAt(0) + "." + a.slice(1) + tr(n) : o > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (i < 0 ? "e" : "e+") + i) : i < 0 ? (a = "0." + tr(-i - 1) + a, r && (n = r - o) > 0 && (a += tr(n))) : i >= o ? (a += tr(i + 1 - o), r && (n = r - i - 1) > 0 && (a = a + "." + tr(n))) : ((n = i + 1) < o && (a = a.slice(0, n) + "." + a.slice(n)), r && (n = r - o) > 0 && (i + 1 === o && (a += "."), a += tr(n))), e.s < 0 ? "-" + a : a;
}
function gf(e, t) {
  if (e.length > t)
    return e.length = t, !0;
}
function wp(e) {
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
      return mf(o, a.toString());
    } else if (typeof a != "string")
      throw Error(_r + a);
    if (a.charCodeAt(0) === 45 ? (a = a.slice(1), o.s = -1) : o.s = 1, LO.test(a)) mf(o, a);
    else throw Error(_r + a);
  }
  if (i.prototype = L, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = wp, i.config = i.set = RO, e === void 0 && (e = {}), e)
    for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length; ) e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
  return i.config(e), i;
}
function RO(e) {
  if (!e || typeof e != "object")
    throw Error(ut + "Object expected");
  var t, r, n, i = [
    "precision",
    1,
    sn,
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
      if (cn(n) === n && n >= i[t + 1] && n <= i[t + 2]) this[r] = n;
      else throw Error(_r + r + ": " + n);
  if ((n = e[r = "LN10"]) !== void 0)
    if (n == Math.LN10) this[r] = new this(n);
    else throw Error(_r + r + ": " + n);
  return this;
}
var Pu = wp($O);
Ye = new Pu(1);
const Y = Pu;
function xp(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new Y(e).abs().log(10).toNumber()) + 1, t;
}
function Pp(e, t, r) {
  for (var n = new Y(e), i = 0, a = []; n.lt(t) && i < 1e5; )
    a.push(n.toNumber()), n = n.add(r), i++;
  return a;
}
var Op = (e) => {
  var [t, r] = e, [n, i] = [t, r];
  return t > r && ([n, i] = [r, t]), [n, i];
}, Ou = (e, t, r) => {
  if (e.lte(0))
    return new Y(0);
  var n = xp(e.toNumber()), i = new Y(10).pow(n), a = e.div(i), o = n !== 1 ? 0.05 : 0.1, l = new Y(Math.ceil(a.div(o).toNumber())).add(r).mul(o), u = l.mul(i);
  return t ? new Y(u.toNumber()) : new Y(Math.ceil(u.toNumber()));
}, Ap = (e, t, r) => {
  var n;
  if (e.lte(0))
    return new Y(0);
  var i = [1, 2, 2.5, 5], a = e.toNumber(), o = Math.floor(new Y(a).abs().log(10).toNumber()), l = new Y(10).pow(o), u = e.div(l).toNumber(), s = i.findIndex((v) => v >= u - 1e-10);
  if (s === -1 && (l = l.mul(10), s = 0), s += r, s >= i.length) {
    var c = Math.floor(s / i.length);
    s %= i.length, l = l.mul(new Y(10).pow(c));
  }
  var f = (n = i[s]) !== null && n !== void 0 ? n : 1, d = new Y(f).mul(l);
  return t ? d : new Y(Math.ceil(d.toNumber()));
}, zO = (e, t, r) => {
  var n = new Y(1), i = new Y(e);
  if (!i.isint() && r) {
    var a = Math.abs(e);
    a < 1 ? (n = new Y(10).pow(xp(e) - 1), i = new Y(Math.floor(i.div(n).toNumber())).mul(n)) : a > 1 && (i = new Y(Math.floor(e)));
  } else e === 0 ? i = new Y(Math.floor((t - 1) / 2)) : r || (i = new Y(Math.floor(e)));
  for (var o = Math.floor((t - 1) / 2), l = [], u = 0; u < t; u++)
    l.push(i.add(new Y(u - o).mul(n)).toNumber());
  return l;
}, Sp = function(t, r, n, i) {
  var a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0, o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : Ou;
  if (!Number.isFinite((r - t) / (n - 1)))
    return {
      step: new Y(0),
      tickMin: new Y(0),
      tickMax: new Y(0)
    };
  var l = o(new Y(r).sub(t).div(n - 1), i, a), u;
  t <= 0 && r >= 0 ? u = new Y(0) : (u = new Y(t).add(r).div(2), u = u.sub(new Y(u).mod(l)));
  var s = Math.ceil(u.sub(t).div(l).toNumber()), c = Math.ceil(new Y(r).sub(u).div(l).toNumber()), f = s + c + 1;
  return f > n ? Sp(t, r, n, i, a + 1, o) : (f < n && (c = r > 0 ? c + (n - f) : c, s = r > 0 ? s : s + (n - f)), {
    step: l,
    tickMin: u.sub(new Y(s).mul(l)),
    tickMax: u.add(new Y(c).mul(l))
  });
}, yf = function(t) {
  var [r, n] = t, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", l = Math.max(i, 2), [u, s] = Op([r, n]);
  if (u === -1 / 0 || s === 1 / 0) {
    var c = s === 1 / 0 ? [u, ...Array(i - 1).fill(1 / 0)] : [...Array(i - 1).fill(-1 / 0), s];
    return r > n ? c.reverse() : c;
  }
  if (u === s)
    return zO(u, i, a);
  var f = o === "snap125" ? Ap : Ou, {
    step: d,
    tickMin: v,
    tickMax: p
  } = Sp(u, s, l, a, 0, f), g = Pp(v, p.add(new Y(0.1).mul(d)), d);
  return r > n ? g.reverse() : g;
}, bf = function(t, r) {
  var [n, i] = t, a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", [l, u] = Op([n, i]);
  if (l === -1 / 0 || u === 1 / 0)
    return [n, i];
  if (l === u)
    return [l];
  var s = o === "snap125" ? Ap : Ou, c = Math.max(r, 2), f = s(new Y(u).sub(l).div(c - 1), a, 0), d = [...Pp(new Y(l), new Y(u), f), u];
  return a === !1 && (d = d.map((v) => Math.round(v))), n > i ? d.reverse() : d;
}, BO = (e) => e.rootProps.barCategoryGap, ro = (e) => e.rootProps.stackOffset, _p = (e) => e.rootProps.reverseStackOrder, Au = (e) => e.options.chartName, Su = (e) => e.rootProps.syncId, kp = (e) => e.rootProps.syncMethod, _u = (e) => e.options.eventEmitter, FO = (e) => e.rootProps.baseValue, Re = {
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
}, yt = {
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
}, no = (e, t) => {
  if (!(!e || !t))
    return e != null && e.reversed ? [t[1], t[0]] : t;
};
function io(e, t, r) {
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
function da(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? wf(Object(r), !0).forEach(function(n) {
      WO(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : wf(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function WO(e, t, r) {
  return (t = UO(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function UO(e) {
  var t = KO(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function KO(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var xf = {
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
}, Pf = {
  allowDataOverflow: yt.allowDataOverflow,
  allowDecimals: yt.allowDecimals,
  allowDuplicatedCategory: yt.allowDuplicatedCategory,
  dataKey: void 0,
  domain: void 0,
  id: yt.radiusAxisId,
  includeHidden: yt.includeHidden,
  name: void 0,
  reversed: yt.reversed,
  scale: yt.scale,
  tick: yt.tick,
  tickCount: yt.tickCount,
  ticks: void 0,
  type: yt.type,
  unit: void 0,
  niceTicks: "auto"
}, HO = (e, t) => {
  if (t != null)
    return e.polarAxis.angleAxis[t];
}, ku = S([HO, Yh], (e, t) => {
  var r;
  if (e != null)
    return e;
  var n = (r = io(t, "angleAxis", xf.type)) !== null && r !== void 0 ? r : "category";
  return da(da({}, xf), {}, {
    type: n
  });
}), GO = (e, t) => e.polarAxis.radiusAxis[t], Eu = S([GO, Yh], (e, t) => {
  var r;
  if (e != null)
    return e;
  var n = (r = io(t, "radiusAxis", Pf.type)) !== null && r !== void 0 ? r : "category";
  return da(da({}, Pf), {}, {
    type: n
  });
}), ao = (e) => e.polarOptions, Cu = S([Ht, Gt, Me], PO), Ep = S([ao, Cu], (e, t) => {
  if (e != null)
    return lr(e.innerRadius, t, 0);
}), Cp = S([ao, Cu], (e, t) => {
  if (e != null)
    return lr(e.outerRadius, t, t * 0.8);
}), qO = (e) => {
  if (e == null)
    return [0, 0];
  var {
    startAngle: t,
    endAngle: r
  } = e;
  return [t, r];
}, jp = S([ao], qO);
S([ku, jp], no);
var Ip = S([Cu, Ep, Cp], (e, t, r) => {
  if (!(e == null || t == null || r == null))
    return [t, r];
});
S([Eu, Ip], no);
var Mp = S([le, ao, Ep, Cp, Ht, Gt], (e, t, r, n, i, a) => {
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
}), Pe = (e, t) => t, oo = (e, t, r) => r;
function ju(e) {
  return e?.id;
}
function Tp(e, t, r) {
  var {
    chartData: n = []
  } = t, {
    allowDuplicatedCategory: i,
    dataKey: a
  } = r, o = /* @__PURE__ */ new Map();
  return e.forEach((l) => {
    var u, s = (u = l.data) !== null && u !== void 0 ? u : n;
    if (!(s == null || s.length === 0)) {
      var c = ju(l);
      s.forEach((f, d) => {
        var v = a == null || i ? d : String(je(f, a, null)), p = je(f, l.dataKey, 0), g;
        o.has(v) ? g = o.get(v) : g = {}, Object.assign(g, {
          [c]: p
        }), o.set(v, g);
      });
    }
  }), Array.from(o.values());
}
function Iu(e) {
  return "stackId" in e && e.stackId != null && e.dataKey != null;
}
var lo = (e, t) => e === t ? !0 : e == null || t == null ? !1 : e[0] === t[0] && e[1] === t[1];
function uo(e, t) {
  return Array.isArray(e) && Array.isArray(t) && e.length === 0 && t.length === 0 ? !0 : e === t;
}
function YO(e, t) {
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
}, fn = (e) => e.tooltip.settings.axisId;
function Mu(e) {
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
var VO = (e, t) => {
  if (t != null)
    switch (e) {
      case "linear": {
        if (!At(t)) {
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
function XO(e, t) {
  return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function Tu(e) {
  let t, r, n;
  e.length !== 2 ? (t = ar, r = (l, u) => ar(e(l), u), n = (l, u) => e(l) - u) : (t = e === ar || e === XO ? e : ZO, r = e, n = e);
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
function ZO() {
  return 0;
}
function Dp(e) {
  return e === null ? NaN : +e;
}
function* QO(e, t) {
  for (let r of e)
    r != null && (r = +r) >= r && (yield r);
}
const JO = Tu(ar), ii = JO.right;
Tu(Dp).center;
class Of extends Map {
  constructor(t, r = rA) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: r } }), t != null) for (const [n, i] of t) this.set(n, i);
  }
  get(t) {
    return super.get(Af(this, t));
  }
  has(t) {
    return super.has(Af(this, t));
  }
  set(t, r) {
    return super.set(eA(this, t), r);
  }
  delete(t) {
    return super.delete(tA(this, t));
  }
}
function Af({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : r;
}
function eA({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : (e.set(n, r), r);
}
function tA({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) && (r = e.get(n), e.delete(n)), r;
}
function rA(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
function nA(e = ar) {
  if (e === ar) return Np;
  if (typeof e != "function") throw new TypeError("compare is not a function");
  return (t, r) => {
    const n = e(t, r);
    return n || n === 0 ? n : (e(r, r) === 0) - (e(t, t) === 0);
  };
}
function Np(e, t) {
  return (e == null || !(e >= e)) - (t == null || !(t >= t)) || (e < t ? -1 : e > t ? 1 : 0);
}
const iA = Math.sqrt(50), aA = Math.sqrt(10), oA = Math.sqrt(2);
function va(e, t, r) {
  const n = (t - e) / Math.max(0, r), i = Math.floor(Math.log10(n)), a = n / Math.pow(10, i), o = a >= iA ? 10 : a >= aA ? 5 : a >= oA ? 2 : 1;
  let l, u, s;
  return i < 0 ? (s = Math.pow(10, -i) / o, l = Math.round(e * s), u = Math.round(t * s), l / s < e && ++l, u / s > t && --u, s = -s) : (s = Math.pow(10, i) * o, l = Math.round(e / s), u = Math.round(t / s), l * s < e && ++l, u * s > t && --u), u < l && 0.5 <= r && r < 2 ? va(e, t, r * 2) : [l, u, s];
}
function jl(e, t, r) {
  if (t = +t, e = +e, r = +r, !(r > 0)) return [];
  if (e === t) return [e];
  const n = t < e, [i, a, o] = n ? va(t, e, r) : va(e, t, r);
  if (!(a >= i)) return [];
  const l = a - i + 1, u = new Array(l);
  if (n)
    if (o < 0) for (let s = 0; s < l; ++s) u[s] = (a - s) / -o;
    else for (let s = 0; s < l; ++s) u[s] = (a - s) * o;
  else if (o < 0) for (let s = 0; s < l; ++s) u[s] = (i + s) / -o;
  else for (let s = 0; s < l; ++s) u[s] = (i + s) * o;
  return u;
}
function Il(e, t, r) {
  return t = +t, e = +e, r = +r, va(e, t, r)[2];
}
function Ml(e, t, r) {
  t = +t, e = +e, r = +r;
  const n = t < e, i = n ? Il(t, e, r) : Il(e, t, r);
  return (n ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function Sf(e, t) {
  let r;
  for (const n of e)
    n != null && (r < n || r === void 0 && n >= n) && (r = n);
  return r;
}
function _f(e, t) {
  let r;
  for (const n of e)
    n != null && (r > n || r === void 0 && n >= n) && (r = n);
  return r;
}
function $p(e, t, r = 0, n = 1 / 0, i) {
  if (t = Math.floor(t), r = Math.floor(Math.max(0, r)), n = Math.floor(Math.min(e.length - 1, n)), !(r <= t && t <= n)) return e;
  for (i = i === void 0 ? Np : nA(i); n > r; ) {
    if (n - r > 600) {
      const u = n - r + 1, s = t - r + 1, c = Math.log(u), f = 0.5 * Math.exp(2 * c / 3), d = 0.5 * Math.sqrt(c * f * (u - f) / u) * (s - u / 2 < 0 ? -1 : 1), v = Math.max(r, Math.floor(t - s * f / u + d)), p = Math.min(n, Math.floor(t + (u - s) * f / u + d));
      $p(e, t, v, p, i);
    }
    const a = e[t];
    let o = r, l = n;
    for (Pn(e, r, t), i(e[n], a) > 0 && Pn(e, r, n); o < l; ) {
      for (Pn(e, o, l), ++o, --l; i(e[o], a) < 0; ) ++o;
      for (; i(e[l], a) > 0; ) --l;
    }
    i(e[r], a) === 0 ? Pn(e, r, l) : (++l, Pn(e, l, n)), l <= t && (r = l + 1), t <= l && (n = l - 1);
  }
  return e;
}
function Pn(e, t, r) {
  const n = e[t];
  e[t] = e[r], e[r] = n;
}
function lA(e, t, r) {
  if (e = Float64Array.from(QO(e)), !(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return _f(e);
    if (t >= 1) return Sf(e);
    var n, i = (n - 1) * t, a = Math.floor(i), o = Sf($p(e, a).subarray(0, a + 1)), l = _f(e.subarray(a + 1));
    return o + (l - o) * (i - a);
  }
}
function uA(e, t, r = Dp) {
  if (!(!(n = e.length) || isNaN(t = +t))) {
    if (t <= 0 || n < 2) return +r(e[0], 0, e);
    if (t >= 1) return +r(e[n - 1], n - 1, e);
    var n, i = (n - 1) * t, a = Math.floor(i), o = +r(e[a], a, e), l = +r(e[a + 1], a + 1, e);
    return o + (l - o) * (i - a);
  }
}
function sA(e, t, r) {
  e = +e, t = +t, r = (i = arguments.length) < 2 ? (t = e, e = 0, 1) : i < 3 ? 1 : +r;
  for (var n = -1, i = Math.max(0, Math.ceil((t - e) / r)) | 0, a = new Array(i); ++n < i; )
    a[n] = e + n * r;
  return a;
}
function st(e, t) {
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
function Yt(e, t) {
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
const Tl = Symbol("implicit");
function Du() {
  var e = new Of(), t = [], r = [], n = Tl;
  function i(a) {
    let o = e.get(a);
    if (o === void 0) {
      if (n !== Tl) return n;
      e.set(a, o = t.push(a) - 1);
    }
    return r[o % r.length];
  }
  return i.domain = function(a) {
    if (!arguments.length) return t.slice();
    t = [], e = new Of();
    for (const o of a)
      e.has(o) || e.set(o, t.push(o) - 1);
    return i;
  }, i.range = function(a) {
    return arguments.length ? (r = Array.from(a), i) : r.slice();
  }, i.unknown = function(a) {
    return arguments.length ? (n = a, i) : n;
  }, i.copy = function() {
    return Du(t, r).unknown(n);
  }, st.apply(i, arguments), i;
}
function Nu() {
  var e = Du().unknown(void 0), t = e.domain, r = e.range, n = 0, i = 1, a, o, l = !1, u = 0, s = 0, c = 0.5;
  delete e.unknown;
  function f() {
    var d = t().length, v = i < n, p = v ? i : n, g = v ? n : i;
    a = (g - p) / Math.max(1, d - u + s * 2), l && (a = Math.floor(a)), p += (g - p - a * (d - u)) * c, o = a * (1 - u), l && (p = Math.round(p), o = Math.round(o));
    var m = sA(d).map(function(y) {
      return p + a * y;
    });
    return r(v ? m.reverse() : m);
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
    return Nu(t(), [n, i]).round(l).paddingInner(u).paddingOuter(s).align(c);
  }, st.apply(f(), arguments);
}
function Lp(e) {
  var t = e.copy;
  return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
    return Lp(t());
  }, e;
}
function cA() {
  return Lp(Nu.apply(null, arguments).paddingInner(1));
}
function $u(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e;
}
function Rp(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r;
}
function ai() {
}
var Un = 0.7, ha = 1 / Un, Jr = "\\s*([+-]?\\d+)\\s*", Kn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", St = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", fA = /^#([0-9a-f]{3,8})$/, dA = new RegExp(`^rgb\\(${Jr},${Jr},${Jr}\\)$`), vA = new RegExp(`^rgb\\(${St},${St},${St}\\)$`), hA = new RegExp(`^rgba\\(${Jr},${Jr},${Jr},${Kn}\\)$`), pA = new RegExp(`^rgba\\(${St},${St},${St},${Kn}\\)$`), mA = new RegExp(`^hsl\\(${Kn},${St},${St}\\)$`), gA = new RegExp(`^hsla\\(${Kn},${St},${St},${Kn}\\)$`), kf = {
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
$u(ai, Hn, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Ef,
  // Deprecated! Use color.formatHex.
  formatHex: Ef,
  formatHex8: yA,
  formatHsl: bA,
  formatRgb: Cf,
  toString: Cf
});
function Ef() {
  return this.rgb().formatHex();
}
function yA() {
  return this.rgb().formatHex8();
}
function bA() {
  return zp(this).formatHsl();
}
function Cf() {
  return this.rgb().formatRgb();
}
function Hn(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = fA.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? jf(t) : r === 3 ? new Ue(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? Ai(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? Ai(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = dA.exec(e)) ? new Ue(t[1], t[2], t[3], 1) : (t = vA.exec(e)) ? new Ue(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = hA.exec(e)) ? Ai(t[1], t[2], t[3], t[4]) : (t = pA.exec(e)) ? Ai(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = mA.exec(e)) ? Tf(t[1], t[2] / 100, t[3] / 100, 1) : (t = gA.exec(e)) ? Tf(t[1], t[2] / 100, t[3] / 100, t[4]) : kf.hasOwnProperty(e) ? jf(kf[e]) : e === "transparent" ? new Ue(NaN, NaN, NaN, 0) : null;
}
function jf(e) {
  return new Ue(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Ai(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new Ue(e, t, r, n);
}
function wA(e) {
  return e instanceof ai || (e = Hn(e)), e ? (e = e.rgb(), new Ue(e.r, e.g, e.b, e.opacity)) : new Ue();
}
function Dl(e, t, r, n) {
  return arguments.length === 1 ? wA(e) : new Ue(e, t, r, n ?? 1);
}
function Ue(e, t, r, n) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +n;
}
$u(Ue, Dl, Rp(ai, {
  brighter(e) {
    return e = e == null ? ha : Math.pow(ha, e), new Ue(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Un : Math.pow(Un, e), new Ue(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Ue(kr(this.r), kr(this.g), kr(this.b), pa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: If,
  // Deprecated! Use color.formatHex.
  formatHex: If,
  formatHex8: xA,
  formatRgb: Mf,
  toString: Mf
}));
function If() {
  return `#${Pr(this.r)}${Pr(this.g)}${Pr(this.b)}`;
}
function xA() {
  return `#${Pr(this.r)}${Pr(this.g)}${Pr(this.b)}${Pr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Mf() {
  const e = pa(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${kr(this.r)}, ${kr(this.g)}, ${kr(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function pa(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function kr(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Pr(e) {
  return e = kr(e), (e < 16 ? "0" : "") + e.toString(16);
}
function Tf(e, t, r, n) {
  return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new vt(e, t, r, n);
}
function zp(e) {
  if (e instanceof vt) return new vt(e.h, e.s, e.l, e.opacity);
  if (e instanceof ai || (e = Hn(e)), !e) return new vt();
  if (e instanceof vt) return e;
  e = e.rgb();
  var t = e.r / 255, r = e.g / 255, n = e.b / 255, i = Math.min(t, r, n), a = Math.max(t, r, n), o = NaN, l = a - i, u = (a + i) / 2;
  return l ? (t === a ? o = (r - n) / l + (r < n) * 6 : r === a ? o = (n - t) / l + 2 : o = (t - r) / l + 4, l /= u < 0.5 ? a + i : 2 - a - i, o *= 60) : l = u > 0 && u < 1 ? 0 : o, new vt(o, l, u, e.opacity);
}
function PA(e, t, r, n) {
  return arguments.length === 1 ? zp(e) : new vt(e, t, r, n ?? 1);
}
function vt(e, t, r, n) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +n;
}
$u(vt, PA, Rp(ai, {
  brighter(e) {
    return e = e == null ? ha : Math.pow(ha, e), new vt(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Un : Math.pow(Un, e), new vt(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, n = r + (r < 0.5 ? r : 1 - r) * t, i = 2 * r - n;
    return new Ue(
      No(e >= 240 ? e - 240 : e + 120, i, n),
      No(e, i, n),
      No(e < 120 ? e + 240 : e - 120, i, n),
      this.opacity
    );
  },
  clamp() {
    return new vt(Df(this.h), Si(this.s), Si(this.l), pa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = pa(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${Df(this.h)}, ${Si(this.s) * 100}%, ${Si(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function Df(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Si(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function No(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255;
}
const Lu = (e) => () => e;
function OA(e, t) {
  return function(r) {
    return e + r * t;
  };
}
function AA(e, t, r) {
  return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r, function(n) {
    return Math.pow(e + n * t, r);
  };
}
function SA(e) {
  return (e = +e) == 1 ? Bp : function(t, r) {
    return r - t ? AA(t, r, e) : Lu(isNaN(t) ? r : t);
  };
}
function Bp(e, t) {
  var r = t - e;
  return r ? OA(e, r) : Lu(isNaN(e) ? t : e);
}
const Nf = (function e(t) {
  var r = SA(t);
  function n(i, a) {
    var o = r((i = Dl(i)).r, (a = Dl(a)).r), l = r(i.g, a.g), u = r(i.b, a.b), s = Bp(i.opacity, a.opacity);
    return function(c) {
      return i.r = o(c), i.g = l(c), i.b = u(c), i.opacity = s(c), i + "";
    };
  }
  return n.gamma = e, n;
})(1);
function _A(e, t) {
  t || (t = []);
  var r = e ? Math.min(t.length, e.length) : 0, n = t.slice(), i;
  return function(a) {
    for (i = 0; i < r; ++i) n[i] = e[i] * (1 - a) + t[i] * a;
    return n;
  };
}
function kA(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function EA(e, t) {
  var r = t ? t.length : 0, n = e ? Math.min(r, e.length) : 0, i = new Array(n), a = new Array(r), o;
  for (o = 0; o < n; ++o) i[o] = dn(e[o], t[o]);
  for (; o < r; ++o) a[o] = t[o];
  return function(l) {
    for (o = 0; o < n; ++o) a[o] = i[o](l);
    return a;
  };
}
function CA(e, t) {
  var r = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(n) {
    return r.setTime(e * (1 - n) + t * n), r;
  };
}
function ma(e, t) {
  return e = +e, t = +t, function(r) {
    return e * (1 - r) + t * r;
  };
}
function jA(e, t) {
  var r = {}, n = {}, i;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (i in t)
    i in e ? r[i] = dn(e[i], t[i]) : n[i] = t[i];
  return function(a) {
    for (i in r) n[i] = r[i](a);
    return n;
  };
}
var Nl = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, $o = new RegExp(Nl.source, "g");
function IA(e) {
  return function() {
    return e;
  };
}
function MA(e) {
  return function(t) {
    return e(t) + "";
  };
}
function TA(e, t) {
  var r = Nl.lastIndex = $o.lastIndex = 0, n, i, a, o = -1, l = [], u = [];
  for (e = e + "", t = t + ""; (n = Nl.exec(e)) && (i = $o.exec(t)); )
    (a = i.index) > r && (a = t.slice(r, a), l[o] ? l[o] += a : l[++o] = a), (n = n[0]) === (i = i[0]) ? l[o] ? l[o] += i : l[++o] = i : (l[++o] = null, u.push({ i: o, x: ma(n, i) })), r = $o.lastIndex;
  return r < t.length && (a = t.slice(r), l[o] ? l[o] += a : l[++o] = a), l.length < 2 ? u[0] ? MA(u[0].x) : IA(t) : (t = u.length, function(s) {
    for (var c = 0, f; c < t; ++c) l[(f = u[c]).i] = f.x(s);
    return l.join("");
  });
}
function dn(e, t) {
  var r = typeof t, n;
  return t == null || r === "boolean" ? Lu(t) : (r === "number" ? ma : r === "string" ? (n = Hn(t)) ? (t = n, Nf) : TA : t instanceof Hn ? Nf : t instanceof Date ? CA : kA(t) ? _A : Array.isArray(t) ? EA : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? jA : ma)(e, t);
}
function Ru(e, t) {
  return e = +e, t = +t, function(r) {
    return Math.round(e * (1 - r) + t * r);
  };
}
function DA(e, t) {
  t === void 0 && (t = e, e = dn);
  for (var r = 0, n = t.length - 1, i = t[0], a = new Array(n < 0 ? 0 : n); r < n; ) a[r] = e(i, i = t[++r]);
  return function(o) {
    var l = Math.max(0, Math.min(n - 1, Math.floor(o *= n)));
    return a[l](o - l);
  };
}
function NA(e) {
  return function() {
    return e;
  };
}
function ga(e) {
  return +e;
}
var $f = [0, 1];
function ze(e) {
  return e;
}
function $l(e, t) {
  return (t -= e = +e) ? function(r) {
    return (r - e) / t;
  } : NA(isNaN(t) ? NaN : 0.5);
}
function $A(e, t) {
  var r;
  return e > t && (r = e, e = t, t = r), function(n) {
    return Math.max(e, Math.min(t, n));
  };
}
function LA(e, t, r) {
  var n = e[0], i = e[1], a = t[0], o = t[1];
  return i < n ? (n = $l(i, n), a = r(o, a)) : (n = $l(n, i), a = r(a, o)), function(l) {
    return a(n(l));
  };
}
function RA(e, t, r) {
  var n = Math.min(e.length, t.length) - 1, i = new Array(n), a = new Array(n), o = -1;
  for (e[n] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++o < n; )
    i[o] = $l(e[o], e[o + 1]), a[o] = r(t[o], t[o + 1]);
  return function(l) {
    var u = ii(e, l, 1, n) - 1;
    return a[u](i[u](l));
  };
}
function oi(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function so() {
  var e = $f, t = $f, r = dn, n, i, a, o = ze, l, u, s;
  function c() {
    var d = Math.min(e.length, t.length);
    return o !== ze && (o = $A(e[0], e[d - 1])), l = d > 2 ? RA : LA, u = s = null, f;
  }
  function f(d) {
    return d == null || isNaN(d = +d) ? a : (u || (u = l(e.map(n), t, r)))(n(o(d)));
  }
  return f.invert = function(d) {
    return o(i((s || (s = l(t, e.map(n), ma)))(d)));
  }, f.domain = function(d) {
    return arguments.length ? (e = Array.from(d, ga), c()) : e.slice();
  }, f.range = function(d) {
    return arguments.length ? (t = Array.from(d), c()) : t.slice();
  }, f.rangeRound = function(d) {
    return t = Array.from(d), r = Ru, c();
  }, f.clamp = function(d) {
    return arguments.length ? (o = d ? !0 : ze, c()) : o !== ze;
  }, f.interpolate = function(d) {
    return arguments.length ? (r = d, c()) : r;
  }, f.unknown = function(d) {
    return arguments.length ? (a = d, f) : a;
  }, function(d, v) {
    return n = d, i = v, c();
  };
}
function zu() {
  return so()(ze, ze);
}
function zA(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function ya(e, t) {
  if (!isFinite(e) || e === 0) return null;
  var r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e"), n = e.slice(0, r);
  return [
    n.length > 1 ? n[0] + n.slice(2) : n,
    +e.slice(r + 1)
  ];
}
function an(e) {
  return e = ya(Math.abs(e)), e ? e[1] : NaN;
}
function BA(e, t) {
  return function(r, n) {
    for (var i = r.length, a = [], o = 0, l = e[0], u = 0; i > 0 && l > 0 && (u + l + 1 > n && (l = Math.max(1, n - u)), a.push(r.substring(i -= l, i + l)), !((u += l + 1) > n)); )
      l = e[o = (o + 1) % e.length];
    return a.reverse().join(t);
  };
}
function FA(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(r) {
      return e[+r];
    });
  };
}
var WA = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function Gn(e) {
  if (!(t = WA.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new Bu({
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
Gn.prototype = Bu.prototype;
function Bu(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
Bu.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function UA(e) {
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
var ba;
function KA(e, t) {
  var r = ya(e, t);
  if (!r) return ba = void 0, e.toPrecision(t);
  var n = r[0], i = r[1], a = i - (ba = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, o = n.length;
  return a === o ? n : a > o ? n + new Array(a - o + 1).join("0") : a > 0 ? n.slice(0, a) + "." + n.slice(a) : "0." + new Array(1 - a).join("0") + ya(e, Math.max(0, t + a - 1))[0];
}
function Lf(e, t) {
  var r = ya(e, t);
  if (!r) return e + "";
  var n = r[0], i = r[1];
  return i < 0 ? "0." + new Array(-i).join("0") + n : n.length > i + 1 ? n.slice(0, i + 1) + "." + n.slice(i + 1) : n + new Array(i - n.length + 2).join("0");
}
const Rf = {
  "%": (e, t) => (e * 100).toFixed(t),
  b: (e) => Math.round(e).toString(2),
  c: (e) => e + "",
  d: zA,
  e: (e, t) => e.toExponential(t),
  f: (e, t) => e.toFixed(t),
  g: (e, t) => e.toPrecision(t),
  o: (e) => Math.round(e).toString(8),
  p: (e, t) => Lf(e * 100, t),
  r: Lf,
  s: KA,
  X: (e) => Math.round(e).toString(16).toUpperCase(),
  x: (e) => Math.round(e).toString(16)
};
function zf(e) {
  return e;
}
var Bf = Array.prototype.map, Ff = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function HA(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? zf : BA(Bf.call(e.grouping, Number), e.thousands + ""), r = e.currency === void 0 ? "" : e.currency[0] + "", n = e.currency === void 0 ? "" : e.currency[1] + "", i = e.decimal === void 0 ? "." : e.decimal + "", a = e.numerals === void 0 ? zf : FA(Bf.call(e.numerals, String)), o = e.percent === void 0 ? "%" : e.percent + "", l = e.minus === void 0 ? "−" : e.minus + "", u = e.nan === void 0 ? "NaN" : e.nan + "";
  function s(f, d) {
    f = Gn(f);
    var v = f.fill, p = f.align, g = f.sign, m = f.symbol, y = f.zero, w = f.width, b = f.comma, x = f.precision, O = f.trim, P = f.type;
    P === "n" ? (b = !0, P = "g") : Rf[P] || (x === void 0 && (x = 12), O = !0, P = "g"), (y || v === "0" && p === "=") && (y = !0, v = "0", p = "=");
    var _ = (d && d.prefix !== void 0 ? d.prefix : "") + (m === "$" ? r : m === "#" && /[boxX]/.test(P) ? "0" + P.toLowerCase() : ""), A = (m === "$" ? n : /[%p]/.test(P) ? o : "") + (d && d.suffix !== void 0 ? d.suffix : ""), C = Rf[P], T = /[defgprs%]/.test(P);
    x = x === void 0 ? 6 : /[gprs]/.test(P) ? Math.max(1, Math.min(21, x)) : Math.max(0, Math.min(20, x));
    function I(k) {
      var B = _, F = A, W, q, V;
      if (P === "c")
        F = C(k) + F, k = "";
      else {
        k = +k;
        var re = k < 0 || 1 / k < 0;
        if (k = isNaN(k) ? u : C(Math.abs(k), x), O && (k = UA(k)), re && +k == 0 && g !== "+" && (re = !1), B = (re ? g === "(" ? g : l : g === "-" || g === "(" ? "" : g) + B, F = (P === "s" && !isNaN(k) && ba !== void 0 ? Ff[8 + ba / 3] : "") + F + (re && g === "(" ? ")" : ""), T) {
          for (W = -1, q = k.length; ++W < q; )
            if (V = k.charCodeAt(W), 48 > V || V > 57) {
              F = (V === 46 ? i + k.slice(W + 1) : k.slice(W)) + F, k = k.slice(0, W);
              break;
            }
        }
      }
      b && !y && (k = t(k, 1 / 0));
      var Q = B.length + k.length + F.length, M = Q < w ? new Array(w - Q + 1).join(v) : "";
      switch (b && y && (k = t(M + k, M.length ? w - F.length : 1 / 0), M = ""), p) {
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
    var v = Math.max(-8, Math.min(8, Math.floor(an(d) / 3))) * 3, p = Math.pow(10, -v), g = s((f = Gn(f), f.type = "f", f), { suffix: Ff[8 + v / 3] });
    return function(m) {
      return g(p * m);
    };
  }
  return {
    format: s,
    formatPrefix: c
  };
}
var _i, Fu, Fp;
GA({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function GA(e) {
  return _i = HA(e), Fu = _i.format, Fp = _i.formatPrefix, _i;
}
function qA(e) {
  return Math.max(0, -an(Math.abs(e)));
}
function YA(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(an(t) / 3))) * 3 - an(Math.abs(e)));
}
function VA(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, an(t) - an(e)) + 1;
}
function Wp(e, t, r, n) {
  var i = Ml(e, t, r), a;
  switch (n = Gn(n ?? ",f"), n.type) {
    case "s": {
      var o = Math.max(Math.abs(e), Math.abs(t));
      return n.precision == null && !isNaN(a = YA(i, o)) && (n.precision = a), Fp(n, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(a = VA(i, Math.max(Math.abs(e), Math.abs(t)))) && (n.precision = a - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(a = qA(i)) && (n.precision = a - (n.type === "%") * 2);
      break;
    }
  }
  return Fu(n);
}
function ur(e) {
  var t = e.domain;
  return e.ticks = function(r) {
    var n = t();
    return jl(n[0], n[n.length - 1], r ?? 10);
  }, e.tickFormat = function(r, n) {
    var i = t();
    return Wp(i[0], i[i.length - 1], r ?? 10, n);
  }, e.nice = function(r) {
    r == null && (r = 10);
    var n = t(), i = 0, a = n.length - 1, o = n[i], l = n[a], u, s, c = 10;
    for (l < o && (s = o, o = l, l = s, s = i, i = a, a = s); c-- > 0; ) {
      if (s = Il(o, l, r), s === u)
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
function Up() {
  var e = zu();
  return e.copy = function() {
    return oi(e, Up());
  }, st.apply(e, arguments), ur(e);
}
function Kp(e) {
  var t;
  function r(n) {
    return n == null || isNaN(n = +n) ? t : n;
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (e = Array.from(n, ga), r) : e.slice();
  }, r.unknown = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.copy = function() {
    return Kp(e).unknown(t);
  }, e = arguments.length ? Array.from(e, ga) : [0, 1], ur(r);
}
function Hp(e, t) {
  e = e.slice();
  var r = 0, n = e.length - 1, i = e[r], a = e[n], o;
  return a < i && (o = r, r = n, n = o, o = i, i = a, a = o), e[r] = t.floor(i), e[n] = t.ceil(a), e;
}
function Wf(e) {
  return Math.log(e);
}
function Uf(e) {
  return Math.exp(e);
}
function XA(e) {
  return -Math.log(-e);
}
function ZA(e) {
  return -Math.exp(-e);
}
function QA(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function JA(e) {
  return e === 10 ? QA : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function eS(e) {
  return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function Kf(e) {
  return (t, r) => -e(-t, r);
}
function Wu(e) {
  const t = e(Wf, Uf), r = t.domain;
  let n = 10, i, a;
  function o() {
    return i = eS(n), a = JA(n), r()[0] < 0 ? (i = Kf(i), a = Kf(a), e(XA, ZA)) : e(Wf, Uf), t;
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
    let d = i(s), v = i(c), p, g;
    const m = l == null ? 10 : +l;
    let y = [];
    if (!(n % 1) && v - d < m) {
      if (d = Math.floor(d), v = Math.ceil(v), s > 0) {
        for (; d <= v; ++d)
          for (p = 1; p < n; ++p)
            if (g = d < 0 ? p / a(-d) : p * a(d), !(g < s)) {
              if (g > c) break;
              y.push(g);
            }
      } else for (; d <= v; ++d)
        for (p = n - 1; p >= 1; --p)
          if (g = d > 0 ? p / a(-d) : p * a(d), !(g < s)) {
            if (g > c) break;
            y.push(g);
          }
      y.length * 2 < m && (y = jl(s, c, m));
    } else
      y = jl(d, v, Math.min(v - d, m)).map(a);
    return f ? y.reverse() : y;
  }, t.tickFormat = (l, u) => {
    if (l == null && (l = 10), u == null && (u = n === 10 ? "s" : ","), typeof u != "function" && (!(n % 1) && (u = Gn(u)).precision == null && (u.trim = !0), u = Fu(u)), l === 1 / 0) return u;
    const s = Math.max(1, n * l / t.ticks().length);
    return (c) => {
      let f = c / a(Math.round(i(c)));
      return f * n < n - 0.5 && (f *= n), f <= s ? u(c) : "";
    };
  }, t.nice = () => r(Hp(r(), {
    floor: (l) => a(Math.floor(i(l))),
    ceil: (l) => a(Math.ceil(i(l)))
  })), t;
}
function Gp() {
  const e = Wu(so()).domain([1, 10]);
  return e.copy = () => oi(e, Gp()).base(e.base()), st.apply(e, arguments), e;
}
function Hf(e) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function Gf(e) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function Uu(e) {
  var t = 1, r = e(Hf(t), Gf(t));
  return r.constant = function(n) {
    return arguments.length ? e(Hf(t = +n), Gf(t)) : t;
  }, ur(r);
}
function qp() {
  var e = Uu(so());
  return e.copy = function() {
    return oi(e, qp()).constant(e.constant());
  }, st.apply(e, arguments);
}
function qf(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function tS(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function rS(e) {
  return e < 0 ? -e * e : e * e;
}
function Ku(e) {
  var t = e(ze, ze), r = 1;
  function n() {
    return r === 1 ? e(ze, ze) : r === 0.5 ? e(tS, rS) : e(qf(r), qf(1 / r));
  }
  return t.exponent = function(i) {
    return arguments.length ? (r = +i, n()) : r;
  }, ur(t);
}
function Hu() {
  var e = Ku(so());
  return e.copy = function() {
    return oi(e, Hu()).exponent(e.exponent());
  }, st.apply(e, arguments), e;
}
function nS() {
  return Hu.apply(null, arguments).exponent(0.5);
}
function Yf(e) {
  return Math.sign(e) * e * e;
}
function iS(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function Yp() {
  var e = zu(), t = [0, 1], r = !1, n;
  function i(a) {
    var o = iS(e(a));
    return isNaN(o) ? n : r ? Math.round(o) : o;
  }
  return i.invert = function(a) {
    return e.invert(Yf(a));
  }, i.domain = function(a) {
    return arguments.length ? (e.domain(a), i) : e.domain();
  }, i.range = function(a) {
    return arguments.length ? (e.range((t = Array.from(a, ga)).map(Yf)), i) : t.slice();
  }, i.rangeRound = function(a) {
    return i.range(a).round(!0);
  }, i.round = function(a) {
    return arguments.length ? (r = !!a, i) : r;
  }, i.clamp = function(a) {
    return arguments.length ? (e.clamp(a), i) : e.clamp();
  }, i.unknown = function(a) {
    return arguments.length ? (n = a, i) : n;
  }, i.copy = function() {
    return Yp(e.domain(), t).round(r).clamp(e.clamp()).unknown(n);
  }, st.apply(i, arguments), ur(i);
}
function Vp() {
  var e = [], t = [], r = [], n;
  function i() {
    var o = 0, l = Math.max(1, t.length);
    for (r = new Array(l - 1); ++o < l; ) r[o - 1] = uA(e, o / l);
    return a;
  }
  function a(o) {
    return o == null || isNaN(o = +o) ? n : t[ii(r, o)];
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
    return Vp().domain(e).range(t).unknown(n);
  }, st.apply(a, arguments);
}
function Xp() {
  var e = 0, t = 1, r = 1, n = [0.5], i = [0, 1], a;
  function o(u) {
    return u != null && u <= u ? i[ii(n, u, 0, r)] : a;
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
    return Xp().domain([e, t]).range(i).unknown(a);
  }, st.apply(ur(o), arguments);
}
function Zp() {
  var e = [0.5], t = [0, 1], r, n = 1;
  function i(a) {
    return a != null && a <= a ? t[ii(e, a, 0, n)] : r;
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
    return Zp().domain(e).range(t).unknown(r);
  }, st.apply(i, arguments);
}
const Lo = /* @__PURE__ */ new Date(), Ro = /* @__PURE__ */ new Date();
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
  }), r && (i.count = (a, o) => (Lo.setTime(+a), Ro.setTime(+o), e(Lo), e(Ro), Math.floor(r(Lo, Ro))), i.every = (a) => (a = Math.floor(a), !isFinite(a) || !(a > 0) ? null : a > 1 ? i.filter(n ? (o) => n(o) % a === 0 : (o) => i.count(0, o) % a === 0) : i)), i;
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
const $t = 1e3, ot = $t * 60, Lt = ot * 60, Ft = Lt * 24, Gu = Ft * 7, Vf = Ft * 30, zo = Ft * 365, Or = ge((e) => {
  e.setTime(e - e.getMilliseconds());
}, (e, t) => {
  e.setTime(+e + t * $t);
}, (e, t) => (t - e) / $t, (e) => e.getUTCSeconds());
Or.range;
const qu = ge((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * $t);
}, (e, t) => {
  e.setTime(+e + t * ot);
}, (e, t) => (t - e) / ot, (e) => e.getMinutes());
qu.range;
const Yu = ge((e) => {
  e.setUTCSeconds(0, 0);
}, (e, t) => {
  e.setTime(+e + t * ot);
}, (e, t) => (t - e) / ot, (e) => e.getUTCMinutes());
Yu.range;
const Vu = ge((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * $t - e.getMinutes() * ot);
}, (e, t) => {
  e.setTime(+e + t * Lt);
}, (e, t) => (t - e) / Lt, (e) => e.getHours());
Vu.range;
const Xu = ge((e) => {
  e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
  e.setTime(+e + t * Lt);
}, (e, t) => (t - e) / Lt, (e) => e.getUTCHours());
Xu.range;
const li = ge(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * ot) / Ft,
  (e) => e.getDate() - 1
);
li.range;
const co = ge((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / Ft, (e) => e.getUTCDate() - 1);
co.range;
const Qp = ge((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / Ft, (e) => Math.floor(e / Ft));
Qp.range;
function Rr(e) {
  return ge((t) => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setDate(t.getDate() + r * 7);
  }, (t, r) => (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * ot) / Gu);
}
const fo = Rr(0), xa = Rr(1), aS = Rr(2), oS = Rr(3), on = Rr(4), lS = Rr(5), uS = Rr(6);
fo.range;
xa.range;
aS.range;
oS.range;
on.range;
lS.range;
uS.range;
function zr(e) {
  return ge((t) => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setUTCDate(t.getUTCDate() + r * 7);
  }, (t, r) => (r - t) / Gu);
}
const vo = zr(0), Pa = zr(1), sS = zr(2), cS = zr(3), ln = zr(4), fS = zr(5), dS = zr(6);
vo.range;
Pa.range;
sS.range;
cS.range;
ln.range;
fS.range;
dS.range;
const Zu = ge((e) => {
  e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
Zu.range;
const Qu = ge((e) => {
  e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
Qu.range;
const Wt = ge((e) => {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setFullYear(e.getFullYear() + t);
}, (e, t) => t.getFullYear() - e.getFullYear(), (e) => e.getFullYear());
Wt.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : ge((t) => {
  t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, r) => {
  t.setFullYear(t.getFullYear() + r * e);
});
Wt.range;
const Ut = ge((e) => {
  e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCFullYear(e.getUTCFullYear() + t);
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), (e) => e.getUTCFullYear());
Ut.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : ge((t) => {
  t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, r) => {
  t.setUTCFullYear(t.getUTCFullYear() + r * e);
});
Ut.range;
function Jp(e, t, r, n, i, a) {
  const o = [
    [Or, 1, $t],
    [Or, 5, 5 * $t],
    [Or, 15, 15 * $t],
    [Or, 30, 30 * $t],
    [a, 1, ot],
    [a, 5, 5 * ot],
    [a, 15, 15 * ot],
    [a, 30, 30 * ot],
    [i, 1, Lt],
    [i, 3, 3 * Lt],
    [i, 6, 6 * Lt],
    [i, 12, 12 * Lt],
    [n, 1, Ft],
    [n, 2, 2 * Ft],
    [r, 1, Gu],
    [t, 1, Vf],
    [t, 3, 3 * Vf],
    [e, 1, zo]
  ];
  function l(s, c, f) {
    const d = c < s;
    d && ([s, c] = [c, s]);
    const v = f && typeof f.range == "function" ? f : u(s, c, f), p = v ? v.range(s, +c + 1) : [];
    return d ? p.reverse() : p;
  }
  function u(s, c, f) {
    const d = Math.abs(c - s) / f, v = Tu(([, , m]) => m).right(o, d);
    if (v === o.length) return e.every(Ml(s / zo, c / zo, f));
    if (v === 0) return wa.every(Math.max(Ml(s, c, f), 1));
    const [p, g] = o[d / o[v - 1][2] < o[v][2] / d ? v - 1 : v];
    return p.every(g);
  }
  return [l, u];
}
const [vS, hS] = Jp(Ut, Qu, vo, Qp, Xu, Yu), [pS, mS] = Jp(Wt, Zu, fo, li, Vu, qu);
function Bo(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function Fo(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function On(e, t, r) {
  return { y: e, m: t, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function gS(e) {
  var t = e.dateTime, r = e.date, n = e.time, i = e.periods, a = e.days, o = e.shortDays, l = e.months, u = e.shortMonths, s = An(i), c = Sn(i), f = An(a), d = Sn(a), v = An(o), p = Sn(o), g = An(l), m = Sn(l), y = An(u), w = Sn(u), b = {
    a: V,
    A: re,
    b: Q,
    B: M,
    c: null,
    d: td,
    e: td,
    f: BS,
    g: XS,
    G: QS,
    H: LS,
    I: RS,
    j: zS,
    L: em,
    m: FS,
    M: WS,
    p: Le,
    q: ue,
    Q: id,
    s: ad,
    S: US,
    u: KS,
    U: HS,
    V: GS,
    w: qS,
    W: YS,
    x: null,
    X: null,
    y: VS,
    Y: ZS,
    Z: JS,
    "%": nd
  }, x = {
    a: Fe,
    A: be,
    b: ne,
    B: fe,
    c: null,
    d: rd,
    e: rd,
    f: n_,
    g: v_,
    G: p_,
    H: e_,
    I: t_,
    j: r_,
    L: rm,
    m: i_,
    M: a_,
    p: mt,
    q: Se,
    Q: id,
    s: ad,
    S: o_,
    u: l_,
    U: u_,
    V: s_,
    w: c_,
    W: f_,
    x: null,
    X: null,
    y: d_,
    Y: h_,
    Z: m_,
    "%": nd
  }, O = {
    a: T,
    A: I,
    b: k,
    B,
    c: F,
    d: Jf,
    e: Jf,
    f: TS,
    g: Qf,
    G: Zf,
    H: ed,
    I: ed,
    j: CS,
    L: MS,
    m: ES,
    M: jS,
    p: C,
    q: kS,
    Q: NS,
    s: $S,
    S: IS,
    u: PS,
    U: OS,
    V: AS,
    w: xS,
    W: SS,
    x: W,
    X: q,
    y: Qf,
    Y: Zf,
    Z: _S,
    "%": DS
  };
  b.x = P(r, b), b.X = P(n, b), b.c = P(t, b), x.x = P(r, x), x.X = P(n, x), x.c = P(t, x);
  function P(j, D) {
    return function(H) {
      var E = [], we = -1, Z = 0, Ge = j.length, qe, fr, Ts;
      for (H instanceof Date || (H = /* @__PURE__ */ new Date(+H)); ++we < Ge; )
        j.charCodeAt(we) === 37 && (E.push(j.slice(Z, we)), (fr = Xf[qe = j.charAt(++we)]) != null ? qe = j.charAt(++we) : fr = qe === "e" ? " " : "0", (Ts = D[qe]) && (qe = Ts(H, fr)), E.push(qe), Z = we + 1);
      return E.push(j.slice(Z, we)), E.join("");
    };
  }
  function _(j, D) {
    return function(H) {
      var E = On(1900, void 0, 1), we = A(E, j, H += "", 0), Z, Ge;
      if (we != H.length) return null;
      if ("Q" in E) return new Date(E.Q);
      if ("s" in E) return new Date(E.s * 1e3 + ("L" in E ? E.L : 0));
      if (D && !("Z" in E) && (E.Z = 0), "p" in E && (E.H = E.H % 12 + E.p * 12), E.m === void 0 && (E.m = "q" in E ? E.q : 0), "V" in E) {
        if (E.V < 1 || E.V > 53) return null;
        "w" in E || (E.w = 1), "Z" in E ? (Z = Fo(On(E.y, 0, 1)), Ge = Z.getUTCDay(), Z = Ge > 4 || Ge === 0 ? Pa.ceil(Z) : Pa(Z), Z = co.offset(Z, (E.V - 1) * 7), E.y = Z.getUTCFullYear(), E.m = Z.getUTCMonth(), E.d = Z.getUTCDate() + (E.w + 6) % 7) : (Z = Bo(On(E.y, 0, 1)), Ge = Z.getDay(), Z = Ge > 4 || Ge === 0 ? xa.ceil(Z) : xa(Z), Z = li.offset(Z, (E.V - 1) * 7), E.y = Z.getFullYear(), E.m = Z.getMonth(), E.d = Z.getDate() + (E.w + 6) % 7);
      } else ("W" in E || "U" in E) && ("w" in E || (E.w = "u" in E ? E.u % 7 : "W" in E ? 1 : 0), Ge = "Z" in E ? Fo(On(E.y, 0, 1)).getUTCDay() : Bo(On(E.y, 0, 1)).getDay(), E.m = 0, E.d = "W" in E ? (E.w + 6) % 7 + E.W * 7 - (Ge + 5) % 7 : E.w + E.U * 7 - (Ge + 6) % 7);
      return "Z" in E ? (E.H += E.Z / 100 | 0, E.M += E.Z % 100, Fo(E)) : Bo(E);
    };
  }
  function A(j, D, H, E) {
    for (var we = 0, Z = D.length, Ge = H.length, qe, fr; we < Z; ) {
      if (E >= Ge) return -1;
      if (qe = D.charCodeAt(we++), qe === 37) {
        if (qe = D.charAt(we++), fr = O[qe in Xf ? D.charAt(we++) : qe], !fr || (E = fr(j, H, E)) < 0) return -1;
      } else if (qe != H.charCodeAt(E++))
        return -1;
    }
    return E;
  }
  function C(j, D, H) {
    var E = s.exec(D.slice(H));
    return E ? (j.p = c.get(E[0].toLowerCase()), H + E[0].length) : -1;
  }
  function T(j, D, H) {
    var E = v.exec(D.slice(H));
    return E ? (j.w = p.get(E[0].toLowerCase()), H + E[0].length) : -1;
  }
  function I(j, D, H) {
    var E = f.exec(D.slice(H));
    return E ? (j.w = d.get(E[0].toLowerCase()), H + E[0].length) : -1;
  }
  function k(j, D, H) {
    var E = y.exec(D.slice(H));
    return E ? (j.m = w.get(E[0].toLowerCase()), H + E[0].length) : -1;
  }
  function B(j, D, H) {
    var E = g.exec(D.slice(H));
    return E ? (j.m = m.get(E[0].toLowerCase()), H + E[0].length) : -1;
  }
  function F(j, D, H) {
    return A(j, t, D, H);
  }
  function W(j, D, H) {
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
  function ue(j) {
    return 1 + ~~(j.getMonth() / 3);
  }
  function Fe(j) {
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
  function mt(j) {
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
      var D = P(j += "", x);
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
var Xf = { "-": "", _: " ", 0: "0" }, Ae = /^\s*\d+/, yS = /^%/, bS = /[\\^$*+?|[\]().{}]/g;
function X(e, t, r) {
  var n = e < 0 ? "-" : "", i = (n ? -e : e) + "", a = i.length;
  return n + (a < r ? new Array(r - a + 1).join(t) + i : i);
}
function wS(e) {
  return e.replace(bS, "\\$&");
}
function An(e) {
  return new RegExp("^(?:" + e.map(wS).join("|") + ")", "i");
}
function Sn(e) {
  return new Map(e.map((t, r) => [t.toLowerCase(), r]));
}
function xS(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 1));
  return n ? (e.w = +n[0], r + n[0].length) : -1;
}
function PS(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 1));
  return n ? (e.u = +n[0], r + n[0].length) : -1;
}
function OS(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.U = +n[0], r + n[0].length) : -1;
}
function AS(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.V = +n[0], r + n[0].length) : -1;
}
function SS(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.W = +n[0], r + n[0].length) : -1;
}
function Zf(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 4));
  return n ? (e.y = +n[0], r + n[0].length) : -1;
}
function Qf(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1;
}
function _S(e, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
  return n ? (e.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1;
}
function kS(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 1));
  return n ? (e.q = n[0] * 3 - 3, r + n[0].length) : -1;
}
function ES(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.m = n[0] - 1, r + n[0].length) : -1;
}
function Jf(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.d = +n[0], r + n[0].length) : -1;
}
function CS(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 3));
  return n ? (e.m = 0, e.d = +n[0], r + n[0].length) : -1;
}
function ed(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.H = +n[0], r + n[0].length) : -1;
}
function jS(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.M = +n[0], r + n[0].length) : -1;
}
function IS(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 2));
  return n ? (e.S = +n[0], r + n[0].length) : -1;
}
function MS(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 3));
  return n ? (e.L = +n[0], r + n[0].length) : -1;
}
function TS(e, t, r) {
  var n = Ae.exec(t.slice(r, r + 6));
  return n ? (e.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1;
}
function DS(e, t, r) {
  var n = yS.exec(t.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function NS(e, t, r) {
  var n = Ae.exec(t.slice(r));
  return n ? (e.Q = +n[0], r + n[0].length) : -1;
}
function $S(e, t, r) {
  var n = Ae.exec(t.slice(r));
  return n ? (e.s = +n[0], r + n[0].length) : -1;
}
function td(e, t) {
  return X(e.getDate(), t, 2);
}
function LS(e, t) {
  return X(e.getHours(), t, 2);
}
function RS(e, t) {
  return X(e.getHours() % 12 || 12, t, 2);
}
function zS(e, t) {
  return X(1 + li.count(Wt(e), e), t, 3);
}
function em(e, t) {
  return X(e.getMilliseconds(), t, 3);
}
function BS(e, t) {
  return em(e, t) + "000";
}
function FS(e, t) {
  return X(e.getMonth() + 1, t, 2);
}
function WS(e, t) {
  return X(e.getMinutes(), t, 2);
}
function US(e, t) {
  return X(e.getSeconds(), t, 2);
}
function KS(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function HS(e, t) {
  return X(fo.count(Wt(e) - 1, e), t, 2);
}
function tm(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? on(e) : on.ceil(e);
}
function GS(e, t) {
  return e = tm(e), X(on.count(Wt(e), e) + (Wt(e).getDay() === 4), t, 2);
}
function qS(e) {
  return e.getDay();
}
function YS(e, t) {
  return X(xa.count(Wt(e) - 1, e), t, 2);
}
function VS(e, t) {
  return X(e.getFullYear() % 100, t, 2);
}
function XS(e, t) {
  return e = tm(e), X(e.getFullYear() % 100, t, 2);
}
function ZS(e, t) {
  return X(e.getFullYear() % 1e4, t, 4);
}
function QS(e, t) {
  var r = e.getDay();
  return e = r >= 4 || r === 0 ? on(e) : on.ceil(e), X(e.getFullYear() % 1e4, t, 4);
}
function JS(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + X(t / 60 | 0, "0", 2) + X(t % 60, "0", 2);
}
function rd(e, t) {
  return X(e.getUTCDate(), t, 2);
}
function e_(e, t) {
  return X(e.getUTCHours(), t, 2);
}
function t_(e, t) {
  return X(e.getUTCHours() % 12 || 12, t, 2);
}
function r_(e, t) {
  return X(1 + co.count(Ut(e), e), t, 3);
}
function rm(e, t) {
  return X(e.getUTCMilliseconds(), t, 3);
}
function n_(e, t) {
  return rm(e, t) + "000";
}
function i_(e, t) {
  return X(e.getUTCMonth() + 1, t, 2);
}
function a_(e, t) {
  return X(e.getUTCMinutes(), t, 2);
}
function o_(e, t) {
  return X(e.getUTCSeconds(), t, 2);
}
function l_(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function u_(e, t) {
  return X(vo.count(Ut(e) - 1, e), t, 2);
}
function nm(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? ln(e) : ln.ceil(e);
}
function s_(e, t) {
  return e = nm(e), X(ln.count(Ut(e), e) + (Ut(e).getUTCDay() === 4), t, 2);
}
function c_(e) {
  return e.getUTCDay();
}
function f_(e, t) {
  return X(Pa.count(Ut(e) - 1, e), t, 2);
}
function d_(e, t) {
  return X(e.getUTCFullYear() % 100, t, 2);
}
function v_(e, t) {
  return e = nm(e), X(e.getUTCFullYear() % 100, t, 2);
}
function h_(e, t) {
  return X(e.getUTCFullYear() % 1e4, t, 4);
}
function p_(e, t) {
  var r = e.getUTCDay();
  return e = r >= 4 || r === 0 ? ln(e) : ln.ceil(e), X(e.getUTCFullYear() % 1e4, t, 4);
}
function m_() {
  return "+0000";
}
function nd() {
  return "%";
}
function id(e) {
  return +e;
}
function ad(e) {
  return Math.floor(+e / 1e3);
}
var Ur, im, am;
g_({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function g_(e) {
  return Ur = gS(e), im = Ur.format, Ur.parse, am = Ur.utcFormat, Ur.utcParse, Ur;
}
function y_(e) {
  return new Date(e);
}
function b_(e) {
  return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function Ju(e, t, r, n, i, a, o, l, u, s) {
  var c = zu(), f = c.invert, d = c.domain, v = s(".%L"), p = s(":%S"), g = s("%I:%M"), m = s("%I %p"), y = s("%a %d"), w = s("%b %d"), b = s("%B"), x = s("%Y");
  function O(P) {
    return (u(P) < P ? v : l(P) < P ? p : o(P) < P ? g : a(P) < P ? m : n(P) < P ? i(P) < P ? y : w : r(P) < P ? b : x)(P);
  }
  return c.invert = function(P) {
    return new Date(f(P));
  }, c.domain = function(P) {
    return arguments.length ? d(Array.from(P, b_)) : d().map(y_);
  }, c.ticks = function(P) {
    var _ = d();
    return e(_[0], _[_.length - 1], P ?? 10);
  }, c.tickFormat = function(P, _) {
    return _ == null ? O : s(_);
  }, c.nice = function(P) {
    var _ = d();
    return (!P || typeof P.range != "function") && (P = t(_[0], _[_.length - 1], P ?? 10)), P ? d(Hp(_, P)) : c;
  }, c.copy = function() {
    return oi(c, Ju(e, t, r, n, i, a, o, l, u, s));
  }, c;
}
function w_() {
  return st.apply(Ju(pS, mS, Wt, Zu, fo, li, Vu, qu, Or, im).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function x_() {
  return st.apply(Ju(vS, hS, Ut, Qu, vo, co, Xu, Yu, Or, am).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
function ho() {
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
      var v, p;
      return arguments.length ? ([v, p] = d, o = f(v, p), s) : [o(0), o(1)];
    };
  }
  return s.range = c(dn), s.rangeRound = c(Ru), s.unknown = function(f) {
    return arguments.length ? (u = f, s) : u;
  }, function(f) {
    return a = f, r = f(e), n = f(t), i = r === n ? 0 : 1 / (n - r), s;
  };
}
function sr(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function om() {
  var e = ur(ho()(ze));
  return e.copy = function() {
    return sr(e, om());
  }, Yt.apply(e, arguments);
}
function lm() {
  var e = Wu(ho()).domain([1, 10]);
  return e.copy = function() {
    return sr(e, lm()).base(e.base());
  }, Yt.apply(e, arguments);
}
function um() {
  var e = Uu(ho());
  return e.copy = function() {
    return sr(e, um()).constant(e.constant());
  }, Yt.apply(e, arguments);
}
function es() {
  var e = Ku(ho());
  return e.copy = function() {
    return sr(e, es()).exponent(e.exponent());
  }, Yt.apply(e, arguments);
}
function P_() {
  return es.apply(null, arguments).exponent(0.5);
}
function sm() {
  var e = [], t = ze;
  function r(n) {
    if (n != null && !isNaN(n = +n)) return t((ii(e, n, 1) - 1) / (e.length - 1));
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
    return Array.from({ length: n + 1 }, (i, a) => lA(e, a / n));
  }, r.copy = function() {
    return sm(t).domain(e);
  }, Yt.apply(r, arguments);
}
function po() {
  var e = 0, t = 0.5, r = 1, n = 1, i, a, o, l, u, s = ze, c, f = !1, d;
  function v(g) {
    return isNaN(g = +g) ? d : (g = 0.5 + ((g = +c(g)) - a) * (n * g < n * a ? l : u), s(f ? Math.max(0, Math.min(1, g)) : g));
  }
  v.domain = function(g) {
    return arguments.length ? ([e, t, r] = g, i = c(e = +e), a = c(t = +t), o = c(r = +r), l = i === a ? 0 : 0.5 / (a - i), u = a === o ? 0 : 0.5 / (o - a), n = a < i ? -1 : 1, v) : [e, t, r];
  }, v.clamp = function(g) {
    return arguments.length ? (f = !!g, v) : f;
  }, v.interpolator = function(g) {
    return arguments.length ? (s = g, v) : s;
  };
  function p(g) {
    return function(m) {
      var y, w, b;
      return arguments.length ? ([y, w, b] = m, s = DA(g, [y, w, b]), v) : [s(0), s(0.5), s(1)];
    };
  }
  return v.range = p(dn), v.rangeRound = p(Ru), v.unknown = function(g) {
    return arguments.length ? (d = g, v) : d;
  }, function(g) {
    return c = g, i = g(e), a = g(t), o = g(r), l = i === a ? 0 : 0.5 / (a - i), u = a === o ? 0 : 0.5 / (o - a), n = a < i ? -1 : 1, v;
  };
}
function cm() {
  var e = ur(po()(ze));
  return e.copy = function() {
    return sr(e, cm());
  }, Yt.apply(e, arguments);
}
function fm() {
  var e = Wu(po()).domain([0.1, 1, 10]);
  return e.copy = function() {
    return sr(e, fm()).base(e.base());
  }, Yt.apply(e, arguments);
}
function dm() {
  var e = Uu(po());
  return e.copy = function() {
    return sr(e, dm()).constant(e.constant());
  }, Yt.apply(e, arguments);
}
function ts() {
  var e = Ku(po());
  return e.copy = function() {
    return sr(e, ts()).exponent(e.exponent());
  }, Yt.apply(e, arguments);
}
function O_() {
  return ts.apply(null, arguments).exponent(0.5);
}
const jn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  scaleBand: Nu,
  scaleDiverging: cm,
  scaleDivergingLog: fm,
  scaleDivergingPow: ts,
  scaleDivergingSqrt: O_,
  scaleDivergingSymlog: dm,
  scaleIdentity: Kp,
  scaleImplicit: Tl,
  scaleLinear: Up,
  scaleLog: Gp,
  scaleOrdinal: Du,
  scalePoint: cA,
  scalePow: Hu,
  scaleQuantile: Vp,
  scaleQuantize: Xp,
  scaleRadial: Yp,
  scaleSequential: om,
  scaleSequentialLog: lm,
  scaleSequentialPow: es,
  scaleSequentialQuantile: sm,
  scaleSequentialSqrt: P_,
  scaleSequentialSymlog: um,
  scaleSqrt: nS,
  scaleSymlog: qp,
  scaleThreshold: Zp,
  scaleTime: w_,
  scaleUtc: x_,
  tickFormat: Wp
}, Symbol.toStringTag, { value: "Module" }));
function A_(e) {
  if (e in jn)
    return jn[e]();
  var t = "scale".concat(Xn(e));
  if (t in jn)
    return jn[t]();
}
function od(e, t, r) {
  if (typeof e == "function")
    return e.copy().domain(t).range(r);
  if (e != null) {
    var n = A_(e);
    if (n != null)
      return n.domain(t).range(r), n;
  }
}
function rs(e, t, r, n) {
  if (!(r == null || n == null))
    return typeof e.scale == "function" ? od(e.scale, r, n) : od(t, r, n);
}
function S_(e) {
  return "scale".concat(Xn(e));
}
function __(e) {
  return S_(e) in jn;
}
var vm = (e, t, r) => {
  if (e != null) {
    var {
      scale: n,
      type: i
    } = e;
    if (n === "auto")
      return i === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !t) ? "point" : i === "category" ? "band" : "linear";
    if (typeof n == "string")
      return __(n) ? n : "point";
  }
};
function k_(e, t) {
  for (var r = 0, n = e.length, i = e[0] < e[e.length - 1]; r < n; ) {
    var a = Math.floor((r + n) / 2);
    (i ? e[a] < t : e[a] > t) ? r = a + 1 : n = a;
  }
  return r;
}
function hm(e, t) {
  if (e) {
    var r = t ?? e.domain(), n = r.map((a) => {
      var o;
      return (o = e(a)) !== null && o !== void 0 ? o : 0;
    }), i = e.range();
    if (!(r.length === 0 || i.length < 2))
      return (a) => {
        var o, l, u = k_(n, a);
        if (u <= 0)
          return r[0];
        if (u >= r.length)
          return r[r.length - 1];
        var s = (o = n[u - 1]) !== null && o !== void 0 ? o : 0, c = (l = n[u]) !== null && l !== void 0 ? l : 0;
        return Math.abs(a - s) <= Math.abs(a - c) ? r[u - 1] : r[u];
      };
  }
}
function E_(e) {
  if (e != null)
    return "invert" in e && typeof e.invert == "function" ? e.invert.bind(e) : hm(e, void 0);
}
function ld(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Oa(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ld(Object(r), !0).forEach(function(n) {
      C_(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ld(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function C_(e, t, r) {
  return (t = j_(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function j_(e) {
  var t = I_(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function I_(e, t) {
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
}, pm = (e, t) => e.cartesianAxis.xAxis[t], Vt = (e, t) => {
  var r = pm(e, t);
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
  width: Jn
}, mm = (e, t) => e.cartesianAxis.yAxis[t], Xt = (e, t) => {
  var r = mm(e, t);
  return r ?? pe;
}, M_ = {
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
}, ns = (e, t) => {
  var r = e.cartesianAxis.zAxis[t];
  return r ?? M_;
}, Be = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return Vt(e, r);
    case "yAxis":
      return Xt(e, r);
    case "zAxis":
      return ns(e, r);
    case "angleAxis":
      return ku(e, r);
    case "radiusAxis":
      return Eu(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, T_ = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return Vt(e, r);
    case "yAxis":
      return Xt(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, ui = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return Vt(e, r);
    case "yAxis":
      return Xt(e, r);
    case "angleAxis":
      return ku(e, r);
    case "radiusAxis":
      return Eu(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, gm = (e) => e.graphicalItems.cartesianItems.some((t) => t.type === "bar") || e.graphicalItems.polarItems.some((t) => t.type === "radialBar");
function ym(e, t) {
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
var bm = (e) => e.graphicalItems.cartesianItems, D_ = S([Pe, oo], ym), wm = (e, t, r) => e.filter(r).filter((n) => t?.includeHidden === !0 ? !0 : !n.hide), si = S([bm, Be, D_], wm, {
  memoizeOptions: {
    resultEqualityCheck: uo
  }
}), xm = S([si], (e) => e.filter((t) => t.type === "area" || t.type === "bar").filter(Iu)), Pm = (e) => e.filter((t) => !("stackId" in t) || t.stackId === void 0), N_ = S([si], Pm), Om = (e) => e.map((t) => t.data).filter(Boolean).flat(1), $_ = S([si], Om, {
  memoizeOptions: {
    resultEqualityCheck: uo
  }
}), Am = (e, t) => {
  var {
    chartData: r = [],
    dataStartIndex: n,
    dataEndIndex: i
  } = t;
  return e.length > 0 ? e : r.slice(n, i + 1);
}, is = S([$_, hp], Am), Sm = (e, t, r) => t?.dataKey != null ? e.map((n) => ({
  value: je(n, t.dataKey)
})) : r.length > 0 ? r.map((n) => n.dataKey).flatMap((n) => e.map((i) => ({
  value: je(i, n)
}))) : e.map((n) => ({
  value: n
})), ci = S([is, Be, si], Sm);
function en(e) {
  if (Et(e) || e instanceof Date) {
    var t = Number(e);
    if (G(t))
      return t;
  }
}
function ud(e) {
  if (Array.isArray(e)) {
    var t = [en(e[0]), en(e[1])];
    return At(t) ? t : void 0;
  }
  var r = en(e);
  if (r != null)
    return [r, r];
}
function Kt(e) {
  return e.map(en).filter(We);
}
function L_(e, t) {
  var r = en(e), n = en(t);
  return r == null && n == null ? 0 : r == null ? -1 : n == null ? 1 : r - n;
}
var R_ = S([ci], (e) => e?.map((t) => t.value).sort(L_));
function _m(e, t) {
  switch (e) {
    case "xAxis":
      return t.direction === "x";
    case "yAxis":
      return t.direction === "y";
    default:
      return !1;
  }
}
function z_(e, t, r) {
  return !r || typeof t != "number" || kt(t) ? [] : r.length ? Kt(r.flatMap((n) => {
    var i = je(e, n.dataKey), a, o;
    if (Array.isArray(i) ? [a, o] = i : a = o = i, !(!G(a) || !G(o)))
      return [t - a, t + o];
  })) : [];
}
var ye = (e) => {
  var t = Oe(e), r = fn(e);
  return ui(e, t, r);
}, fi = S([ye], (e) => e?.dataKey), B_ = S([xm, hp, ye], Tp), km = (e, t, r, n) => {
  var i = {}, a = t.reduce((o, l) => {
    if (l.stackId == null)
      return o;
    var u = o[l.stackId];
    return u == null && (u = []), u.push(l), o[l.stackId] = u, o;
  }, i);
  return Object.fromEntries(Object.entries(a).map((o) => {
    var [l, u] = o, s = n ? [...u].reverse() : u, c = s.map(ju);
    return [l, {
      // @ts-expect-error getStackedData requires that the input is array of objects, Recharts does not test for that
      stackedData: Ex(e, c, r),
      graphicalItems: s
    }];
  }));
}, Em = S([B_, xm, ro, _p], km), Cm = (e, t, r, n) => {
  var {
    dataStartIndex: i,
    dataEndIndex: a
  } = t;
  if (n == null && r !== "zAxis") {
    var o = Mx(e, i, a);
    if (!(o != null && o[0] === 0 && o[1] === 0))
      return o;
  }
}, F_ = S([Be], (e) => e.allowDataOverflow), as = (e) => {
  var t;
  if (e == null || !("domain" in e))
    return Ll;
  if (e.domain != null)
    return e.domain;
  if ("ticks" in e && e.ticks != null) {
    if (e.type === "number") {
      var r = Kt(e.ticks);
      return [Math.min(...r), Math.max(...r)];
    }
    if (e.type === "category")
      return e.ticks.map(String);
  }
  return (t = e?.domain) !== null && t !== void 0 ? t : Ll;
}, jm = S([Be], as), Im = S([jm, F_], pp), W_ = S([Em, qt, Pe, Im], Cm, {
  memoizeOptions: {
    resultEqualityCheck: lo
  }
}), os = (e) => e.errorBars, U_ = (e, t, r) => e.flatMap((n) => t[n.id]).filter(Boolean).filter((n) => _m(r, n)), Aa = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var i = r.filter(Boolean);
  if (i.length !== 0) {
    var a = i.flat(), o = Math.min(...a), l = Math.max(...a);
    return [o, l];
  }
}, Mm = (e, t, r, n, i) => {
  var a, o;
  if (r.length > 0 && e.forEach((l) => {
    r.forEach((u) => {
      var s, c, f = (s = n[u.id]) === null || s === void 0 ? void 0 : s.filter((y) => _m(i, y)), d = je(l, (c = t.dataKey) !== null && c !== void 0 ? c : u.dataKey), v = z_(l, d, f);
      if (v.length >= 2) {
        var p = Math.min(...v), g = Math.max(...v);
        (a == null || p < a) && (a = p), (o == null || g > o) && (o = g);
      }
      var m = ud(d);
      m != null && (a = a == null ? m[0] : Math.min(a, m[0]), o = o == null ? m[1] : Math.max(o, m[1]));
    });
  }), t?.dataKey != null && e.forEach((l) => {
    var u = ud(je(l, t.dataKey));
    u != null && (a = a == null ? u[0] : Math.min(a, u[0]), o = o == null ? u[1] : Math.max(o, u[1]));
  }), G(a) && G(o))
    return [a, o];
}, K_ = S([is, Be, N_, os, Pe], Mm, {
  memoizeOptions: {
    resultEqualityCheck: lo
  }
});
function H_(e) {
  var {
    value: t
  } = e;
  if (Et(t) || t instanceof Date)
    return t;
}
var G_ = (e, t, r) => {
  var n = e.map(H_).filter((i) => i != null);
  return r && (t.dataKey == null || t.allowDuplicatedCategory && Bv(n)) ? dp(0, e.length) : t.allowDuplicatedCategory ? n : Array.from(new Set(n));
}, Tm = (e) => e.referenceElements.dots, vn = (e, t, r) => e.filter((n) => n.ifOverflow === "extendDomain").filter((n) => t === "xAxis" ? n.xAxisId === r : n.yAxisId === r), q_ = S([Tm, Pe, oo], vn), Dm = (e) => e.referenceElements.areas, Y_ = S([Dm, Pe, oo], vn), Nm = (e) => e.referenceElements.lines, V_ = S([Nm, Pe, oo], vn), $m = (e, t) => {
  if (e != null) {
    var r = Kt(e.map((n) => t === "xAxis" ? n.x : n.y));
    if (r.length !== 0)
      return [Math.min(...r), Math.max(...r)];
  }
}, X_ = S(q_, Pe, $m), Lm = (e, t) => {
  if (e != null) {
    var r = Kt(e.flatMap((n) => [t === "xAxis" ? n.x1 : n.y1, t === "xAxis" ? n.x2 : n.y2]));
    if (r.length !== 0)
      return [Math.min(...r), Math.max(...r)];
  }
}, Z_ = S([Y_, Pe], Lm);
function Q_(e) {
  var t;
  if (e.x != null)
    return Kt([e.x]);
  var r = (t = e.segment) === null || t === void 0 ? void 0 : t.map((n) => n.x);
  return r == null || r.length === 0 ? [] : Kt(r);
}
function J_(e) {
  var t;
  if (e.y != null)
    return Kt([e.y]);
  var r = (t = e.segment) === null || t === void 0 ? void 0 : t.map((n) => n.y);
  return r == null || r.length === 0 ? [] : Kt(r);
}
var Rm = (e, t) => {
  if (e != null) {
    var r = e.flatMap((n) => t === "xAxis" ? Q_(n) : J_(n));
    if (r.length !== 0)
      return [Math.min(...r), Math.max(...r)];
  }
}, ek = S([V_, Pe], Rm), tk = S(X_, ek, Z_, (e, t, r) => Aa(e, r, t)), zm = (e, t, r, n, i, a, o, l) => {
  if (r != null)
    return r;
  var u = o === "vertical" && l === "xAxis" || o === "horizontal" && l === "yAxis", s = u ? Aa(n, a, i) : Aa(a, i);
  return NO(t, s, e.allowDataOverflow);
}, rk = S([Be, jm, Im, W_, K_, tk, le, Pe], zm, {
  memoizeOptions: {
    resultEqualityCheck: lo
  }
}), nk = [0, 1], Bm = (e, t, r, n, i, a, o) => {
  if (!((e == null || r == null || r.length === 0) && o === void 0)) {
    var {
      dataKey: l,
      type: u
    } = e, s = It(t, a);
    if (s && l == null) {
      var c;
      return dp(0, (c = r?.length) !== null && c !== void 0 ? c : 0);
    }
    return u === "category" ? G_(n, e, s) : i === "expand" ? nk : o;
  }
}, ls = S([Be, le, is, ci, ro, Pe, rk], Bm), hn = S([Be, gm, Au], vm), Fm = (e, t, r) => {
  var {
    niceTicks: n
  } = t;
  if (n !== "none") {
    var i = as(t), a = Array.isArray(i) && (i[0] === "auto" || i[1] === "auto");
    if ((n === "snap125" || n === "adaptive") && t != null && t.tickCount && At(e)) {
      if (a)
        return yf(e, t.tickCount, t.allowDecimals, n);
      if (t.type === "number")
        return bf(e, t.tickCount, t.allowDecimals, n);
    }
    if (n === "auto" && r === "linear" && t != null && t.tickCount) {
      if (a && At(e))
        return yf(e, t.tickCount, t.allowDecimals, "adaptive");
      if (t.type === "number" && At(e))
        return bf(e, t.tickCount, t.allowDecimals, "adaptive");
    }
  }
}, us = S([ls, ui, hn], Fm), Wm = (e, t, r, n) => {
  if (
    /*
     * Angle axis for some reason uses nice ticks when rendering axis tick labels,
     * but doesn't use nice ticks for extending domain like all the other axes do.
     * Not really sure why? Is there a good reason,
     * or is it just because someone added support for nice ticks to the other axes and forgot this one?
     */
    n !== "angleAxis" && e?.type === "number" && At(t) && Array.isArray(r) && r.length > 0
  ) {
    var i, a, o = t[0], l = (i = r[0]) !== null && i !== void 0 ? i : 0, u = t[1], s = (a = r[r.length - 1]) !== null && a !== void 0 ? a : 0;
    return [Math.min(o, l), Math.max(u, s)];
  }
  return t;
}, ik = S([Be, ls, us, Pe], Wm), ak = S(ci, Be, (e, t) => {
  if (!(!t || t.type !== "number")) {
    var r = 1 / 0, n = Array.from(Kt(e.map((f) => f.value))).sort((f, d) => f - d), i = n[0], a = n[n.length - 1];
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
}), Um = S(ak, le, BO, Me, (e, t, r, n, i) => i, (e, t, r, n, i) => {
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
}), ok = (e, t, r) => {
  var n = Vt(e, t);
  return n == null || typeof n.padding != "string" ? 0 : Um(e, "xAxis", t, r, n.padding);
}, lk = (e, t, r) => {
  var n = Xt(e, t);
  return n == null || typeof n.padding != "string" ? 0 : Um(e, "yAxis", t, r, n.padding);
}, uk = S(Vt, ok, (e, t) => {
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
}), sk = S(Xt, lk, (e, t) => {
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
}), ck = S([Me, uk, Za, Xa, (e, t, r) => r], (e, t, r, n, i) => {
  var {
    padding: a
  } = n;
  return i ? [a.left, r.width - a.right] : [e.left + t.left, e.left + e.width - t.right];
}), fk = S([Me, le, sk, Za, Xa, (e, t, r) => r], (e, t, r, n, i, a) => {
  var {
    padding: o
  } = i;
  return a ? [n.height - o.bottom, o.top] : t === "horizontal" ? [e.top + e.height - r.bottom, e.top + r.top] : [e.top + r.top, e.top + e.height - r.bottom];
}), di = (e, t, r, n) => {
  var i;
  switch (t) {
    case "xAxis":
      return ck(e, r, n);
    case "yAxis":
      return fk(e, r, n);
    case "zAxis":
      return (i = ns(e, r)) === null || i === void 0 ? void 0 : i.range;
    case "angleAxis":
      return jp(e);
    case "radiusAxis":
      return Ip(e, r);
    default:
      return;
  }
}, Km = S([Be, di], no), dk = S([hn, ik], VO), ss = S([Be, hn, dk, Km], rs), Hm = (e, t, r, n) => {
  if (!(r == null || r.dataKey == null)) {
    var {
      type: i,
      scale: a
    } = r, o = It(e, n);
    if (o && (i === "number" || a !== "auto"))
      return t.map((l) => l.value);
  }
}, cs = S([le, ci, ui, Pe], Hm), mo = S([ss], Mu);
S([ss], E_);
S([ss, R_], hm);
S([si, os, Pe], U_);
function Gm(e, t) {
  return e.id < t.id ? -1 : e.id > t.id ? 1 : 0;
}
var go = (e, t) => t, yo = (e, t, r) => r, vk = S(Ya, go, yo, (e, t, r) => e.filter((n) => n.orientation === t).filter((n) => n.mirror === r).sort(Gm)), hk = S(Va, go, yo, (e, t, r) => e.filter((n) => n.orientation === t).filter((n) => n.mirror === r).sort(Gm)), qm = (e, t) => ({
  width: e.width,
  height: t.height
}), pk = (e, t) => {
  var r = typeof t.width == "number" ? t.width : Jn;
  return {
    width: r,
    height: e.height
  };
}, mk = S(Me, Vt, qm), gk = (e, t, r) => {
  switch (t) {
    case "top":
      return e.top;
    case "bottom":
      return r - e.bottom;
    default:
      return 0;
  }
}, yk = (e, t, r) => {
  switch (t) {
    case "left":
      return e.left;
    case "right":
      return r - e.right;
    default:
      return 0;
  }
}, bk = S(Gt, Me, vk, go, yo, (e, t, r, n, i) => {
  var a = {}, o;
  return r.forEach((l) => {
    var u = qm(t, l);
    o == null && (o = gk(t, n, e));
    var s = n === "top" && !i || n === "bottom" && i;
    a[l.id] = o - Number(s) * u.height, o += (s ? -1 : 1) * u.height;
  }), a;
}), wk = S(Ht, Me, hk, go, yo, (e, t, r, n, i) => {
  var a = {}, o;
  return r.forEach((l) => {
    var u = pk(t, l);
    o == null && (o = yk(t, n, e));
    var s = n === "left" && !i || n === "right" && i;
    a[l.id] = o - Number(s) * u.width, o += (s ? -1 : 1) * u.width;
  }), a;
}), xk = (e, t) => {
  var r = Vt(e, t);
  if (r != null)
    return bk(e, r.orientation, r.mirror);
}, Pk = S([Me, Vt, xk, (e, t) => t], (e, t, r, n) => {
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
}), Ok = (e, t) => {
  var r = Xt(e, t);
  if (r != null)
    return wk(e, r.orientation, r.mirror);
}, Ak = S([Me, Xt, Ok, (e, t) => t], (e, t, r, n) => {
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
}), Sk = S(Me, Xt, (e, t) => {
  var r = typeof t.width == "number" ? t.width : Jn;
  return {
    width: r,
    height: e.height
  };
}), Ym = (e, t, r, n) => {
  if (r != null) {
    var {
      allowDuplicatedCategory: i,
      type: a,
      dataKey: o
    } = r, l = It(e, n), u = t.map((s) => s.value);
    if (o && l && a === "category" && i && Bv(u))
      return u;
  }
}, fs = S([le, ci, Be, Pe], Ym), sd = S([le, T_, hn, mo, fs, cs, di, us, Pe], (e, t, r, n, i, a, o, l, u) => {
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
}), _k = (e, t, r, n, i, a, o, l, u) => {
  if (!(t == null || n == null)) {
    var s = It(e, u), {
      type: c,
      ticks: f,
      tickCount: d
    } = t, v = (
      // @ts-expect-error This is testing for `scaleBand` but for band axis the type is reported as `band` so this looks like a dead code with a workaround elsewhere?
      r === "scaleBand" && typeof n.bandwidth == "function" ? n.bandwidth() / 2 : 2
    ), p = c === "category" && n.bandwidth ? n.bandwidth() / v : 0;
    p = u === "angleAxis" && a != null && a.length >= 2 ? it(a[0] - a[1]) * 2 * p : p;
    var g = f || i;
    return g ? g.map((m, y) => {
      var w = o ? o.indexOf(m) : m, b = n.map(w);
      return G(b) ? {
        index: y,
        coordinate: b + p,
        value: m,
        offset: p
      } : null;
    }).filter(We) : s && l ? l.map((m, y) => {
      var w = n.map(m);
      return G(w) ? {
        coordinate: w + p,
        value: m,
        index: y,
        offset: p
      } : null;
    }).filter(We) : n.ticks ? n.ticks(d).map((m, y) => {
      var w = n.map(m);
      return G(w) ? {
        coordinate: w + p,
        value: m,
        index: y,
        offset: p
      } : null;
    }).filter(We) : n.domain().map((m, y) => {
      var w = n.map(m);
      return G(w) ? {
        coordinate: w + p,
        // @ts-expect-error can't use Date as index
        value: o ? o[m] : m,
        index: y,
        offset: p
      } : null;
    }).filter(We);
  }
}, Vm = S([le, ui, hn, mo, us, di, fs, cs, Pe], _k), kk = (e, t, r, n, i, a, o) => {
  if (!(t == null || r == null || n == null || n[0] === n[1])) {
    var l = It(e, o), {
      tickCount: u
    } = t, s = 0;
    return s = o === "angleAxis" && n?.length >= 2 ? it(n[0] - n[1]) * 2 * s : s, l && a ? a.map((c, f) => {
      var d = r.map(c);
      return G(d) ? {
        coordinate: d + s,
        value: c,
        index: f,
        offset: s
      } : null;
    }).filter(We) : r.ticks ? r.ticks(u).map((c, f) => {
      var d = r.map(c);
      return G(d) ? {
        coordinate: d + s,
        value: c,
        index: f,
        offset: s
      } : null;
    }).filter(We) : r.domain().map((c, f) => {
      var d = r.map(c);
      return G(d) ? {
        coordinate: d + s,
        // @ts-expect-error can't use unknown as index
        value: i ? i[c] : c,
        index: f,
        offset: s
      } : null;
    }).filter(We);
  }
}, Xm = S([le, ui, mo, di, fs, cs, Pe], kk), Zm = S(Be, mo, (e, t) => {
  if (!(e == null || t == null))
    return Oa(Oa({}, e), {}, {
      scale: t
    });
}), Ek = S([Be, hn, ls, Km], rs), Ck = S([Ek], Mu);
S((e, t, r) => ns(e, r), Ck, (e, t) => {
  if (!(e == null || t == null))
    return Oa(Oa({}, e), {}, {
      scale: t
    });
});
var jk = S([le, Ya, Va], (e, t, r) => {
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
}), Ik = (e, t, r) => {
  var n;
  return (n = e.renderedTicks[t]) === null || n === void 0 ? void 0 : n[r];
};
S([Ik], (e) => {
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
var Qm = (e) => e.options.defaultTooltipEventType, Jm = (e) => e.options.validateTooltipEventTypes;
function eg(e, t, r) {
  if (e == null)
    return t;
  var n = e ? "axis" : "item";
  return r == null ? t : r.includes(n) ? n : t;
}
function ds(e, t) {
  var r = Qm(e), n = Jm(e);
  return eg(t, r, n);
}
function Mk(e) {
  return z((t) => ds(t, e));
}
var tg = (e, t) => {
  var r, n = Number(t);
  if (!(kt(n) || t == null))
    return n >= 0 ? e == null || (r = e[n]) === null || r === void 0 ? void 0 : r.value : void 0;
}, Tk = (e) => e.tooltip.settings, nr = {
  active: !1,
  index: null,
  dataKey: void 0,
  graphicalItemId: void 0,
  coordinate: void 0
}, Dk = {
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
}, rg = $e({
  name: "tooltip",
  initialState: Dk,
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
        } = t.payload, i = at(e).tooltipItemPayloads.indexOf(r);
        i > -1 && (e.tooltipItemPayloads[i] = n);
      },
      prepare: ie()
    },
    removeTooltipEntrySettings: {
      reducer(e, t) {
        var r = at(e).tooltipItemPayloads.indexOf(t.payload);
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
  addTooltipEntrySettings: Nk,
  replaceTooltipEntrySettings: $k,
  removeTooltipEntrySettings: Lk,
  setTooltipSettingsState: Rk,
  setActiveMouseOverItemIndex: zk,
  mouseLeaveItem: qN,
  mouseLeaveChart: ng,
  setActiveClickItemIndex: YN,
  setMouseOverAxisIndex: ig,
  setMouseClickAxisIndex: Bk,
  setSyncInteraction: Rl,
  setKeyboardInteraction: Sa
} = rg.actions, Fk = rg.reducer;
function cd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ki(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? cd(Object(r), !0).forEach(function(n) {
      Wk(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : cd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Wk(e, t, r) {
  return (t = Uk(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Uk(e) {
  var t = Kk(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Kk(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Hk(e, t, r) {
  return t === "axis" ? r === "click" ? e.axisInteraction.click : e.axisInteraction.hover : r === "click" ? e.itemInteraction.click : e.itemInteraction.hover;
}
function Gk(e) {
  return e.index != null;
}
var ag = (e, t, r, n) => {
  if (t == null)
    return nr;
  var i = Hk(e, t, r);
  if (i == null)
    return nr;
  if (i.active)
    return i;
  if (e.keyboardInteraction.active)
    return e.keyboardInteraction;
  if (e.syncInteraction.active && e.syncInteraction.index != null)
    return e.syncInteraction;
  var a = e.settings.active === !0;
  if (Gk(i)) {
    if (a)
      return ki(ki({}, i), {}, {
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
  return ki(ki({}, nr), {}, {
    coordinate: i.coordinate
  });
};
function qk(e) {
  if (typeof e == "number")
    return Number.isFinite(e) ? e : void 0;
  if (e instanceof Date) {
    var t = e.valueOf();
    return Number.isFinite(t) ? t : void 0;
  }
  var r = Number(e);
  return Number.isFinite(r) ? r : void 0;
}
function Yk(e, t) {
  var r = qk(e), n = t[0], i = t[1];
  if (r === void 0)
    return !1;
  var a = Math.min(n, i), o = Math.max(n, i);
  return r >= a && r <= o;
}
function Vk(e, t, r) {
  if (r == null || t == null)
    return !0;
  var n = je(e, t);
  return n == null || !At(r) ? !0 : Yk(n, r);
}
var vs = (e, t, r, n) => {
  var i = e?.index;
  if (i == null)
    return null;
  var a = Number(i);
  if (!G(a))
    return i;
  var o = 0, l = 1 / 0;
  t.length > 0 && (l = t.length - 1);
  var u = Math.max(o, Math.min(a, l)), s = t[u];
  return s == null || Vk(s, r, n) ? String(u) : null;
}, og = (e, t, r, n, i, a, o) => {
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
}, lg = (e, t, r, n) => {
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
}, ug = (e) => e.options.tooltipPayloadSearcher, pn = (e) => e.tooltip;
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
function dd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? fd(Object(r), !0).forEach(function(n) {
      Xk(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : fd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Xk(e, t, r) {
  return (t = Zk(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Zk(e) {
  var t = Qk(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Qk(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Jk(e) {
  if (typeof e == "string" || typeof e == "number")
    return e;
}
function eE(e) {
  if (typeof e == "string" || typeof e == "number" || typeof e == "boolean")
    return e;
}
function tE(e) {
  if (typeof e == "string" || typeof e == "number")
    return e;
  if (typeof e == "function")
    return (t) => e(t);
}
function vd(e) {
  if (typeof e == "string")
    return e;
}
function rE(e) {
  if (!(e == null || typeof e != "object")) {
    var t = "name" in e ? Jk(e.name) : void 0, r = "unit" in e ? eE(e.unit) : void 0, n = "dataKey" in e ? tE(e.dataKey) : void 0, i = "payload" in e ? e.payload : void 0, a = "color" in e ? vd(e.color) : void 0, o = "fill" in e ? vd(e.fill) : void 0;
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
function nE(e, t) {
  return e ?? t;
}
var sg = (e, t, r, n, i, a, o) => {
  if (!(t == null || a == null)) {
    var {
      chartData: l,
      computedData: u,
      dataStartIndex: s,
      dataEndIndex: c
    } = r, f = [];
    return e.reduce((d, v) => {
      var p, {
        dataDefinedOnItem: g,
        settings: m
      } = v, y = nE(g, l), w = Array.isArray(y) ? Rh(y, s, c) : y, b = (p = m?.dataKey) !== null && p !== void 0 ? p : n, x = m?.nameKey, O;
      if (n && Array.isArray(w) && /*
       * findEntryInArray won't work for Scatter because Scatter provides an array of arrays
       * as tooltip payloads and findEntryInArray is not prepared to handle that.
       * Sad but also ScatterChart only allows 'item' tooltipEventType
       * and also this is only a problem if there are multiple Scatters and each has its own data array
       * so let's fix that some other time.
       */
      !Array.isArray(w[0]) && /*
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
      o === "axis" ? O = Fv(w, n, i) : O = a(w, t, u, x), Array.isArray(O))
        O.forEach((_) => {
          var A, C, T = rE(_), I = T?.name, k = T?.dataKey, B = T?.payload, F = dd(dd({}, m), {}, {
            name: I,
            unit: T?.unit,
            // Preserve item-level color/fill from graphical items.
            color: (A = T?.color) !== null && A !== void 0 ? A : m?.color,
            fill: (C = T?.fill) !== null && C !== void 0 ? C : m?.fill
          });
          d.push(vc({
            tooltipEntrySettings: F,
            dataKey: k,
            payload: B,
            value: je(B, k),
            name: I == null ? void 0 : String(I)
          }));
        });
      else {
        var P;
        d.push(vc({
          tooltipEntrySettings: m,
          dataKey: b,
          payload: O,
          // getValueByDataKey does not validate the output type
          value: je(O, b),
          // getValueByDataKey does not validate the output type
          name: (P = je(O, x)) !== null && P !== void 0 ? P : m?.name
        }));
      }
      return d;
    }, f);
  }
}, hs = S([ye, gm, Au], vm), iE = S([(e) => e.graphicalItems.cartesianItems, (e) => e.graphicalItems.polarItems], (e, t) => [...e, ...t]), aE = S([Oe, fn], ym), mn = S([iE, ye, aE], wm, {
  memoizeOptions: {
    resultEqualityCheck: uo
  }
}), oE = S([mn], (e) => e.filter(Iu)), lE = S([mn], Om, {
  memoizeOptions: {
    resultEqualityCheck: uo
  }
}), gn = S([lE, qt], Am), uE = S([oE, qt, ye], Tp), ps = S([gn, ye, mn], Sm), cg = S([ye], as), sE = S([ye], (e) => e.allowDataOverflow), fg = S([cg, sE], pp), cE = S([mn], (e) => e.filter(Iu)), fE = S([uE, cE, ro, _p], km), dE = S([fE, qt, Oe, fg], Cm), vE = S([mn], Pm), hE = S([gn, ye, vE, os, Oe], Mm, {
  memoizeOptions: {
    resultEqualityCheck: lo
  }
}), pE = S([Tm, Oe, fn], vn), mE = S([pE, Oe], $m), gE = S([Dm, Oe, fn], vn), yE = S([gE, Oe], Lm), bE = S([Nm, Oe, fn], vn), wE = S([bE, Oe], Rm), xE = S([mE, wE, yE], Aa), PE = S([ye, cg, fg, dE, hE, xE, le, Oe], zm), vi = S([ye, le, gn, ps, ro, Oe, PE], Bm), OE = S([vi, ye, hs], Fm), AE = S([ye, vi, OE, Oe], Wm), dg = (e) => {
  var t = Oe(e), r = fn(e), n = !1;
  return di(e, t, r, n);
}, vg = S([ye, dg], no), SE = S([ye, hs, AE, vg], rs), hg = S([SE], Mu), _E = S([le, ps, ye, Oe], Ym), kE = S([le, ps, ye, Oe], Hm), EE = (e, t, r, n, i, a, o, l) => {
  if (t) {
    var {
      type: u
    } = t, s = It(e, l);
    if (n) {
      var c = r === "scaleBand" && n.bandwidth ? n.bandwidth() / 2 : 2, f = u === "category" && n.bandwidth ? n.bandwidth() / c : 0;
      return f = l === "angleAxis" && i != null && i?.length >= 2 ? it(i[0] - i[1]) * 2 * f : f, s && o ? o.map((d, v) => {
        var p = n.map(d);
        return G(p) ? {
          coordinate: p + f,
          value: d,
          index: v,
          offset: f
        } : null;
      }).filter(We) : n.domain().map((d, v) => {
        var p = n.map(d);
        return G(p) ? {
          coordinate: p + f,
          // @ts-expect-error can't use Date as an index
          value: a ? a[d] : d,
          index: v,
          offset: f
        } : null;
      }).filter(We);
    }
  }
}, Zt = S([le, ye, hs, hg, dg, _E, kE, Oe], EE), ms = S([Qm, Jm, Tk], (e, t, r) => eg(r.shared, e, t)), pg = (e) => e.tooltip.settings.trigger, gs = (e) => e.tooltip.settings.defaultIndex, hi = S([pn, ms, pg, gs], ag), qn = S([hi, gn, fi, vi], vs), mg = S([Zt, qn], tg), CE = S([hi], (e) => {
  if (e)
    return e.dataKey;
}), jE = S([hi], (e) => {
  if (e)
    return e.graphicalItemId;
}), gg = S([pn, ms, pg, gs], lg), IE = S([Ht, Gt, le, Me, Zt, gs, gg], og), ME = S([hi, IE], (e, t) => e != null && e.coordinate ? e.coordinate : t), TE = S([hi], (e) => {
  var t;
  return (t = e?.active) !== null && t !== void 0 ? t : !1;
}), DE = S([gg, qn, qt, fi, mg, ug, ms], sg), NE = S([DE], (e) => {
  if (e != null) {
    var t = e.map((r) => r.payload).filter((r) => r != null);
    return Array.from(new Set(t));
  }
});
function hd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function pd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? hd(Object(r), !0).forEach(function(n) {
      $E(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : hd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function $E(e, t, r) {
  return (t = LE(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function LE(e) {
  var t = RE(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function RE(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var zE = () => z(ye), BE = () => {
  var e = zE(), t = z(Zt), r = z(hg);
  return ta(!e || !r ? void 0 : pd(pd({}, e), {}, {
    scale: r
  }), t);
};
function md(e, t) {
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
    t % 2 ? md(Object(r), !0).forEach(function(n) {
      FE(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : md(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function FE(e, t, r) {
  return (t = WE(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function WE(e) {
  var t = UE(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function UE(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var KE = (e, t, r, n) => {
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
}, HE = (e, t, r, n) => {
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
function GE(e, t) {
  var {
    relativeX: r,
    relativeY: n
  } = e;
  return r >= t.left && r <= t.left + t.width && n >= t.top && n <= t.top + t.height;
}
var yg = (e, t, r, n, i) => {
  var a, o = (a = t?.length) !== null && a !== void 0 ? a : 0;
  if (o <= 1 || e == null)
    return 0;
  if (n === "angleAxis" && i != null && Math.abs(Math.abs(i[1] - i[0]) - 360) <= 1e-6)
    for (var l = 0; l < o; l++) {
      var u, s, c, f, d, v = l > 0 ? (u = r[l - 1]) === null || u === void 0 ? void 0 : u.coordinate : (s = r[o - 1]) === null || s === void 0 ? void 0 : s.coordinate, p = (c = r[l]) === null || c === void 0 ? void 0 : c.coordinate, g = l >= o - 1 ? (f = r[0]) === null || f === void 0 ? void 0 : f.coordinate : (d = r[l + 1]) === null || d === void 0 ? void 0 : d.coordinate, m = void 0;
      if (!(v == null || p == null || g == null))
        if (it(p - v) !== it(g - p)) {
          var y = [];
          if (it(g - p) === it(i[1] - i[0])) {
            m = g;
            var w = p + i[1] - i[0];
            y[0] = Math.min(w, (w + v) / 2), y[1] = Math.max(w, (w + v) / 2);
          } else {
            m = v;
            var b = g + i[1] - i[0];
            y[0] = Math.min(p, (b + p) / 2), y[1] = Math.max(p, (b + p) / 2);
          }
          var x = [Math.min(p, (m + p) / 2), Math.max(p, (m + p) / 2)];
          if (e > x[0] && e <= x[1] || e >= y[0] && e <= y[1]) {
            var O;
            return (O = r[l]) === null || O === void 0 ? void 0 : O.index;
          }
        } else {
          var P = Math.min(v, g), _ = Math.max(v, g);
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
}, bg = () => z(Au), ys = (e, t) => t, wg = (e, t, r) => r, bs = (e, t, r, n) => n, qE = S(Zt, (e) => Ra(e, (t) => t.coordinate)), ws = S([pn, ys, wg, bs], ag), xs = S([ws, gn, fi, vi], vs), YE = (e, t, r) => {
  if (t != null) {
    var n = pn(e);
    return t === "axis" ? r === "hover" ? n.axisInteraction.hover.dataKey : n.axisInteraction.click.dataKey : r === "hover" ? n.itemInteraction.hover.dataKey : n.itemInteraction.click.dataKey;
  }
}, xg = S([pn, ys, wg, bs], lg), _a = S([Ht, Gt, le, Me, Zt, bs, xg], og), VE = S([ws, _a], (e, t) => {
  var r;
  return (r = e.coordinate) !== null && r !== void 0 ? r : t;
}), Pg = S([Zt, xs], tg), XE = S([xg, xs, qt, fi, Pg, ug, ys], sg), ZE = S([ws, xs], (e, t) => ({
  isActive: e.active && t != null,
  activeIndex: t
})), QE = (e, t, r, n, i, a, o) => {
  if (!(!e || !r || !n || !i) && GE(e, o)) {
    var l = Tx(e, t), u = yg(l, a, i, r, n), s = KE(t, i, u, e);
    return {
      activeIndex: String(u),
      activeCoordinate: s
    };
  }
}, JE = (e, t, r, n, i, a, o) => {
  if (!(!e || !n || !i || !a || !r)) {
    var l = kO(e, r);
    if (l) {
      var u = Dx(l, t), s = yg(u, o, a, n, i), c = HE(t, a, s, l);
      return {
        activeIndex: String(s),
        activeCoordinate: c
      };
    }
  }
}, eC = (e, t, r, n, i, a, o, l) => {
  if (!(!e || !t || !n || !i || !a))
    return t === "horizontal" || t === "vertical" ? QE(e, t, n, i, a, o, l) : JE(e, t, r, n, i, a, o);
}, tC = S((e) => e.zIndex.zIndexMap, (e, t) => t, (e, t, r) => r, (e, t, r) => {
  if (t != null) {
    var n = e[t];
    if (n != null)
      return r ? n.panoramaElement : n.element;
  }
}), rC = S((e) => e.zIndex.zIndexMap, (e) => {
  var t = Object.keys(e).map((n) => parseInt(n, 10)).concat(Object.values(Re)), r = Array.from(new Set(t));
  return r.sort((n, i) => n - i);
}, {
  memoizeOptions: {
    resultEqualityCheck: YO
  }
});
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
function yd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? gd(Object(r), !0).forEach(function(n) {
      nC(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : gd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function nC(e, t, r) {
  return (t = iC(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function iC(e) {
  var t = aC(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function aC(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var oC = {}, lC = {
  zIndexMap: Object.values(Re).reduce((e, t) => yd(yd({}, e), {}, {
    [t]: {
      element: void 0,
      panoramaElement: void 0,
      consumers: 0
    }
  }), oC)
}, uC = new Set(Object.values(Re));
function sC(e) {
  return uC.has(e);
}
var Og = $e({
  name: "zIndex",
  initialState: lC,
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
        e.zIndexMap[r] && (e.zIndexMap[r].consumers -= 1, e.zIndexMap[r].consumers <= 0 && !sC(r) && delete e.zIndexMap[r]);
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
  registerZIndexPortal: cC,
  unregisterZIndexPortal: fC,
  registerZIndexPortalElement: dC,
  unregisterZIndexPortalElement: vC
} = Og.actions, hC = Og.reducer;
function Qt(e) {
  var {
    zIndex: t,
    children: r
  } = e, n = f1(), i = n && t !== void 0 && t !== 0, a = He(), o = ce();
  h.useLayoutEffect(() => i ? (o(cC({
    zIndex: t
  })), () => {
    o(fC({
      zIndex: t
    }));
  }) : Lr, [o, t, i]);
  var l = z((u) => tC(u, t, a));
  return i ? l ? /* @__PURE__ */ Zl.createPortal(r, l) : null : r;
}
function zl() {
  return zl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, zl.apply(null, arguments);
}
function bd(e, t) {
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
    t % 2 ? bd(Object(r), !0).forEach(function(n) {
      pC(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : bd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function pC(e, t, r) {
  return (t = mC(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function mC(e) {
  var t = gC(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function gC(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function yC(e) {
  var {
    cursor: t,
    cursorComp: r,
    cursorProps: n
  } = e;
  return /* @__PURE__ */ h.isValidElement(t) ? /* @__PURE__ */ h.cloneElement(t, n) : /* @__PURE__ */ h.createElement(r, n);
}
function bC(e) {
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
  } = e, f = r, d = n, v = i;
  if (!u || !f || c !== "ScatterChart" && s !== "axis")
    return null;
  var p, g, m;
  if (c === "ScatterChart")
    p = f, g = zP, m = Re.cursorLine;
  else if (c === "BarChart")
    p = BP(l, f, a, o), g = gO, m = Re.cursorRectangle;
  else if (l === "radial" && Kv(f)) {
    var {
      cx: y,
      cy: w,
      radius: b,
      startAngle: x,
      endAngle: O
    } = cp(f);
    p = {
      cx: y,
      cy: w,
      startAngle: x,
      endAngle: O,
      innerRadius: b,
      outerRadius: b
    }, g = IO, m = Re.cursorLine;
  } else
    p = {
      points: MO(l, f, a)
    }, g = Li, m = Re.cursorLine;
  var P = typeof u == "object" && "className" in u ? u.className : void 0, _ = Ei(Ei(Ei(Ei({
    stroke: "#ccc",
    pointerEvents: "none"
  }, a), p), Da(u)), {}, {
    payload: d,
    payloadIndex: v,
    className: J("recharts-tooltip-cursor", P)
  });
  return /* @__PURE__ */ h.createElement(Qt, {
    zIndex: (t = e.zIndex) !== null && t !== void 0 ? t : m
  }, /* @__PURE__ */ h.createElement(yC, {
    cursor: u,
    cursorComp: g,
    cursorProps: _
  }));
}
function wC(e) {
  var t = BE(), r = qh(), n = un(), i = bg();
  return t == null || r == null || n == null || i == null ? null : /* @__PURE__ */ h.createElement(bC, zl({}, e, {
    offset: r,
    layout: n,
    tooltipAxisBandSize: t,
    chartName: i
  }));
}
var Ag = /* @__PURE__ */ h.createContext(null), xC = () => h.useContext(Ag), Wo = { exports: {} }, wd;
function PC() {
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
      var v = new i(c, f || u, d), p = r ? r + s : s;
      return u._events[p] ? u._events[p].fn ? u._events[p] = [u._events[p], v] : u._events[p].push(v) : (u._events[p] = v, u._eventsCount++), u;
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
      for (var d = 0, v = f.length, p = new Array(v); d < v; d++)
        p[d] = f[d].fn;
      return p;
    }, l.prototype.listenerCount = function(s) {
      var c = r ? r + s : s, f = this._events[c];
      return f ? f.fn ? 1 : f.length : 0;
    }, l.prototype.emit = function(s, c, f, d, v, p) {
      var g = r ? r + s : s;
      if (!this._events[g]) return !1;
      var m = this._events[g], y = arguments.length, w, b;
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
            return m.fn.call(m.context, c, f, d, v), !0;
          case 6:
            return m.fn.call(m.context, c, f, d, v, p), !0;
        }
        for (b = 1, w = new Array(y - 1); b < y; b++)
          w[b - 1] = arguments[b];
        m.fn.apply(m.context, w);
      } else {
        var x = m.length, O;
        for (b = 0; b < x; b++)
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
              if (!w) for (O = 1, w = new Array(y - 1); O < y; O++)
                w[O - 1] = arguments[O];
              m[b].fn.apply(m[b].context, w);
          }
      }
      return !0;
    }, l.prototype.on = function(s, c, f) {
      return a(this, s, c, f, !1);
    }, l.prototype.once = function(s, c, f) {
      return a(this, s, c, f, !0);
    }, l.prototype.removeListener = function(s, c, f, d) {
      var v = r ? r + s : s;
      if (!this._events[v]) return this;
      if (!c)
        return o(this, v), this;
      var p = this._events[v];
      if (p.fn)
        p.fn === c && (!d || p.once) && (!f || p.context === f) && o(this, v);
      else {
        for (var g = 0, m = [], y = p.length; g < y; g++)
          (p[g].fn !== c || d && !p[g].once || f && p[g].context !== f) && m.push(p[g]);
        m.length ? this._events[v] = m.length === 1 ? m[0] : m : o(this, v);
      }
      return this;
    }, l.prototype.removeAllListeners = function(s) {
      var c;
      return s ? (c = r ? r + s : s, this._events[c] && o(this, c)) : (this._events = new n(), this._eventsCount = 0), this;
    }, l.prototype.off = l.prototype.removeListener, l.prototype.addListener = l.prototype.on, l.prefixed = r, l.EventEmitter = l, e.exports = l;
  })(Wo)), Wo.exports;
}
var OC = PC();
const AC = /* @__PURE__ */ Wy(OC);
var Yn = new AC(), Bl = "recharts.syncEvent.tooltip", xd = "recharts.syncEvent.brush", SC = (e, t) => {
  if (t && Array.isArray(e)) {
    var r = Number.parseInt(t, 10);
    if (!kt(r))
      return e[r];
  }
}, _C = {
  chartName: "",
  tooltipPayloadSearcher: () => {
  },
  eventEmitter: void 0,
  defaultTooltipEventType: "axis"
}, Sg = $e({
  name: "options",
  initialState: _C,
  reducers: {
    createEventEmitter: (e) => {
      e.eventEmitter == null && (e.eventEmitter = Symbol("rechartsEventEmitter"));
    }
  }
}), kC = Sg.reducer, {
  createEventEmitter: EC
} = Sg.actions;
function CC(e) {
  return e.tooltip.syncInteraction;
}
var jC = {
  chartData: void 0,
  computedData: void 0,
  dataStartIndex: 0,
  dataEndIndex: 0
}, _g = $e({
  name: "chartData",
  initialState: jC,
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
  setChartData: Pd,
  setDataStartEndIndexes: IC,
  setComputedData: VN
} = _g.actions, MC = _g.reducer, TC = ["x", "y"];
function Od(e, t) {
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
    t % 2 ? Od(Object(r), !0).forEach(function(n) {
      DC(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Od(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function DC(e, t, r) {
  return (t = NC(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function NC(e) {
  var t = $C(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function $C(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function LC(e, t) {
  if (e == null) return {};
  var r, n, i = RC(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function RC(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function zC() {
  var e = z(Su), t = z(_u), r = ce(), n = z(kp), i = z(Zt), a = un(), o = Qa(), l = z((u) => u.rootProps.className);
  h.useEffect(() => {
    if (e == null)
      return Lr;
    var u = (s, c, f) => {
      if (t !== f && e === s) {
        if (n === "index") {
          var d;
          if (o && c !== null && c !== void 0 && (d = c.payload) !== null && d !== void 0 && d.coordinate && c.payload.sourceViewBox) {
            var v = c.payload.coordinate, {
              x: p,
              y: g
            } = v, m = LC(v, TC), {
              x: y,
              y: w,
              width: b,
              height: x
            } = c.payload.sourceViewBox, O = Hr(Hr({}, m), {}, {
              x: o.x + (b ? (p - y) / b : 0) * o.width,
              y: o.y + (x ? (g - w) / x : 0) * o.height
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
            r(Rl({
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
          }, W = Rl({
            active: c.payload.active,
            coordinate: F,
            dataKey: c.payload.dataKey,
            index: String(P.index),
            label: c.payload.label,
            sourceViewBox: c.payload.sourceViewBox,
            graphicalItemId: c.payload.graphicalItemId
          });
          r(W);
        }
      }
    };
    return Yn.on(Bl, u), () => {
      Yn.off(Bl, u);
    };
  }, [l, r, t, e, n, i, a, o]);
}
function BC() {
  var e = z(Su), t = z(_u), r = ce();
  h.useEffect(() => {
    if (e == null)
      return Lr;
    var n = (i, a, o) => {
      t !== o && e === i && r(IC(a));
    };
    return Yn.on(xd, n), () => {
      Yn.off(xd, n);
    };
  }, [r, t, e]);
}
function FC() {
  var e = ce();
  h.useEffect(() => {
    e(EC());
  }, [e]), zC(), BC();
}
function WC(e, t, r, n, i, a) {
  var o = z((p) => YE(p, e, t)), l = z(jE), u = z(_u), s = z(Su), c = z(kp), f = z(CC), d = f?.active, v = Qa();
  h.useEffect(() => {
    if (!d && s != null && u != null) {
      var p = Rl({
        active: a,
        coordinate: r,
        dataKey: o,
        index: i,
        label: typeof n == "number" ? String(n) : n,
        sourceViewBox: v,
        graphicalItemId: l
      });
      Yn.emit(Bl, s, p, u);
    }
  }, [d, r, o, l, i, n, u, s, c, a, v]);
}
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
function Sd(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ad(Object(r), !0).forEach(function(n) {
      UC(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ad(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function UC(e, t, r) {
  return (t = KC(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function KC(e) {
  var t = HC(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function HC(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function GC(e) {
  return e.dataKey;
}
function qC(e, t) {
  return /* @__PURE__ */ h.isValidElement(e) ? /* @__PURE__ */ h.cloneElement(e, t) : typeof e == "function" ? /* @__PURE__ */ h.createElement(e, t) : /* @__PURE__ */ h.createElement(hP, t);
}
var _d = [], YC = {
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
function VC(e) {
  var t, r, n = Ke(e, YC), {
    active: i,
    allowEscapeViewBox: a,
    animationDuration: o,
    animationEasing: l,
    content: u,
    filterNull: s,
    isAnimationActive: c,
    offset: f,
    payloadUniqBy: d,
    position: v,
    reverseDirection: p,
    useTranslate3d: g,
    wrapperStyle: m,
    cursor: y,
    shared: w,
    trigger: b,
    defaultIndex: x,
    portal: O,
    axisId: P
  } = n, _ = ce(), A = typeof x == "number" ? String(x) : x;
  h.useEffect(() => {
    _(Rk({
      shared: w,
      trigger: b,
      axisId: P,
      active: i,
      defaultIndex: A
    }));
  }, [_, w, b, P, i, A]);
  var C = Qa(), T = ip(), I = Mk(w), {
    activeIndex: k,
    isActive: B
  } = (t = z((Se) => ZE(Se, I, b, A))) !== null && t !== void 0 ? t : {}, F = z((Se) => XE(Se, I, b, A)), W = z((Se) => Pg(Se, I, b, A)), q = z((Se) => VE(Se, I, b, A)), V = F, re = xC(), Q = (r = i ?? B) !== null && r !== void 0 ? r : !1, [M, Le] = uh([V, Q]), ue = I === "axis" ? W : void 0;
  WC(I, b, q, ue, k, Q);
  var Fe = O ?? re;
  if (Fe == null || C == null || I == null)
    return null;
  var be = V ?? _d;
  Q || (be = _d), s && be.length && (be = ih(be.filter((Se) => Se.value != null && (Se.hide !== !0 || n.includeHidden)), d, GC));
  var ne = be.length > 0, fe = Sd(Sd({}, n), {}, {
    payload: be,
    label: ue,
    active: Q,
    activeIndex: k,
    coordinate: q,
    accessibilityLayer: T
  }), mt = /* @__PURE__ */ h.createElement(SP, {
    allowEscapeViewBox: a,
    animationDuration: o,
    animationEasing: l,
    isAnimationActive: c,
    active: Q,
    coordinate: q,
    hasPayload: ne,
    offset: f,
    position: v,
    reverseDirection: p,
    useTranslate3d: g,
    viewBox: C,
    wrapperStyle: m,
    lastBoundingBox: M,
    innerRef: Le,
    hasPortalFromProps: !!O
  }, qC(u, fe));
  return /* @__PURE__ */ h.createElement(h.Fragment, null, /* @__PURE__ */ Zl.createPortal(mt, Fe), Q && /* @__PURE__ */ h.createElement(wC, {
    cursor: y,
    tooltipEventType: I,
    coordinate: q,
    payload: be,
    index: k
  }));
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
class JC {
  constructor(t) {
    XC(this, "cache", /* @__PURE__ */ new Map()), this.maxSize = t;
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
function kd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ej(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? kd(Object(r), !0).forEach(function(n) {
      tj(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : kd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function tj(e, t, r) {
  return (t = rj(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function rj(e) {
  var t = nj(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function nj(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ij = {
  cacheSize: 2e3,
  enableCache: !0
}, kg = ej({}, ij), Ed = new JC(kg.cacheSize), aj = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
}, Cd = "recharts_measurement_span";
function oj(e, t) {
  var r = t.fontSize || "", n = t.fontFamily || "", i = t.fontWeight || "", a = t.fontStyle || "", o = t.letterSpacing || "", l = t.textTransform || "";
  return "".concat(e, "|").concat(r, "|").concat(n, "|").concat(i, "|").concat(a, "|").concat(o, "|").concat(l);
}
var jd = (e, t) => {
  try {
    var r = document.getElementById(Cd);
    r || (r = document.createElement("span"), r.setAttribute("id", Cd), r.setAttribute("aria-hidden", "true"), document.body.appendChild(r)), Object.assign(r.style, aj, t), r.textContent = "".concat(e);
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
}, Mn = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (t == null || ni.isSsr)
    return {
      width: 0,
      height: 0
    };
  if (!kg.enableCache)
    return jd(t, r);
  var n = oj(t, r), i = Ed.get(n);
  if (i)
    return i;
  var a = jd(t, r);
  return Ed.set(n, a), a;
}, Eg;
function lj(e, t, r) {
  return (t = uj(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function uj(e) {
  var t = sj(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function sj(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Id = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, Md = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, cj = /^(px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q)$/, fj = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, dj = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  in: 96,
  Q: 96 / (2.54 * 40),
  px: 1
}, vj = ["cm", "mm", "pt", "pc", "in", "Q", "px"];
function hj(e) {
  return vj.includes(e);
}
var Xr = "NaN";
function pj(e, t) {
  return e * dj[t];
}
class Ee {
  static parse(t) {
    var r, [, n, i] = (r = fj.exec(t)) !== null && r !== void 0 ? r : [];
    return n == null ? Ee.NaN : new Ee(parseFloat(n), i ?? "");
  }
  constructor(t, r) {
    this.num = t, this.unit = r, this.num = t, this.unit = r, kt(t) && (this.unit = ""), r !== "" && !cj.test(r) && (this.num = NaN, this.unit = ""), hj(r) && (this.num = pj(t, r), this.unit = "px");
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
    return kt(this.num);
  }
}
Eg = Ee;
lj(Ee, "NaN", new Eg(NaN, ""));
function Cg(e) {
  if (e == null || e.includes(Xr))
    return Xr;
  for (var t = e; t.includes("*") || t.includes("/"); ) {
    var r, [, n, i, a] = (r = Id.exec(t)) !== null && r !== void 0 ? r : [], o = Ee.parse(n ?? ""), l = Ee.parse(a ?? ""), u = i === "*" ? o.multiply(l) : o.divide(l);
    if (u.isNaN())
      return Xr;
    t = t.replace(Id, u.toString());
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t); ) {
    var s, [, c, f, d] = (s = Md.exec(t)) !== null && s !== void 0 ? s : [], v = Ee.parse(c ?? ""), p = Ee.parse(d ?? ""), g = f === "+" ? v.add(p) : v.subtract(p);
    if (g.isNaN())
      return Xr;
    t = t.replace(Md, g.toString());
  }
  return t;
}
var Td = /\(([^()]*)\)/;
function mj(e) {
  for (var t = e, r; (r = Td.exec(t)) != null; ) {
    var [, n] = r;
    t = t.replace(Td, Cg(n));
  }
  return t;
}
function gj(e) {
  var t = e.replace(/\s+/g, "");
  return t = mj(t), t = Cg(t), t;
}
function yj(e) {
  try {
    return gj(e);
  } catch {
    return Xr;
  }
}
function Uo(e) {
  var t = yj(e.slice(5, -1));
  return t === Xr ? "" : t;
}
var bj = ["x", "y", "lineHeight", "capHeight", "fill", "scaleToFit", "textAnchor", "verticalAnchor"], wj = ["dx", "dy", "angle", "className", "breakAll"];
function Fl() {
  return Fl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Fl.apply(null, arguments);
}
function Dd(e, t) {
  if (e == null) return {};
  var r, n, i = xj(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function xj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var jg = /[ \f\n\r\t\v\u2028\u2029]+/, Ig = (e) => {
  var {
    children: t,
    breakAll: r,
    style: n
  } = e;
  try {
    var i = [];
    Ie(t) || (r ? i = t.toString().split("") : i = t.toString().split(jg));
    var a = i.map((l) => ({
      word: l,
      width: Mn(l, n).width
    })), o = r ? 0 : Mn(" ", n).width;
    return {
      wordsWithComputedWidth: a,
      spaceWidth: o
    };
  } catch {
    return null;
  }
};
function Mg(e) {
  return e === "start" || e === "middle" || e === "end" || e === "inherit";
}
function Pj(e) {
  return Ie(e) || typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
var Tg = (e, t, r, n) => e.reduce((i, a) => {
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
}, []), Dg = (e) => e.reduce((t, r) => t.width > r.width ? t : r), Oj = "…", Nd = (e, t, r, n, i, a, o, l) => {
  var u = e.slice(0, t), s = Ig({
    breakAll: r,
    style: n,
    children: u + Oj
  });
  if (!s)
    return [!1, []];
  var c = Tg(s.wordsWithComputedWidth, a, o, l), f = c.length > i || Dg(c).width > Number(a);
  return [f, c];
}, Aj = (e, t, r, n, i) => {
  var {
    maxLines: a,
    children: o,
    style: l,
    breakAll: u
  } = e, s = R(a), c = String(o), f = Tg(t, n, r, i);
  if (!s || i)
    return f;
  var d = f.length > a || Dg(f).width > Number(n);
  if (!d)
    return f;
  for (var v = 0, p = c.length - 1, g = 0, m; v <= p && g <= c.length - 1; ) {
    var y = Math.floor((v + p) / 2), w = y - 1, [b, x] = Nd(c, w, u, l, a, n, r, i), [O] = Nd(c, y, u, l, a, n, r, i);
    if (!b && !O && (v = y + 1), b && O && (p = y - 1), !b && O) {
      m = x;
      break;
    }
    g++;
  }
  return m || f;
}, $d = (e) => {
  var t = Ie(e) ? [] : e.toString().split(jg);
  return [{
    words: t,
    width: void 0
  }];
}, Sj = (e) => {
  var {
    width: t,
    scaleToFit: r,
    children: n,
    style: i,
    breakAll: a,
    maxLines: o
  } = e;
  if ((t || r) && !ni.isSsr) {
    var l, u, s = Ig({
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
      return $d(n);
    return Aj({
      breakAll: a,
      children: n,
      maxLines: o,
      style: i
    }, l, u, t, !!r);
  }
  return $d(n);
}, Ng = "#808080", _j = {
  angle: 0,
  breakAll: !1,
  // Magic number from d3
  capHeight: "0.71em",
  fill: Ng,
  lineHeight: "1em",
  scaleToFit: !1,
  textAnchor: "start",
  // Maintain compat with existing charts / default SVG behavior
  verticalAnchor: "end",
  x: 0,
  y: 0
}, Ps = /* @__PURE__ */ h.forwardRef((e, t) => {
  var r = Ke(e, _j), {
    x: n,
    y: i,
    lineHeight: a,
    capHeight: o,
    fill: l,
    scaleToFit: u,
    textAnchor: s,
    verticalAnchor: c
  } = r, f = Dd(r, bj), d = h.useMemo(() => Sj({
    breakAll: f.breakAll,
    children: f.children,
    maxLines: f.maxLines,
    scaleToFit: u,
    style: f.style,
    width: f.width
  }), [f.breakAll, f.children, f.maxLines, u, f.style, f.width]), {
    dx: v,
    dy: p,
    angle: g,
    className: m,
    breakAll: y
  } = f, w = Dd(f, wj);
  if (!Et(n) || !Et(i) || d.length === 0)
    return null;
  var b = Number(n) + (R(v) ? v : 0), x = Number(i) + (R(p) ? p : 0);
  if (!G(b) || !G(x))
    return null;
  var O;
  switch (c) {
    case "start":
      O = Uo("calc(".concat(o, ")"));
      break;
    case "middle":
      O = Uo("calc(".concat((d.length - 1) / 2, " * -").concat(a, " + (").concat(o, " / 2))"));
      break;
    default:
      O = Uo("calc(".concat(d.length - 1, " * -").concat(a, ")"));
      break;
  }
  var P = [], _ = d[0];
  if (u && _ != null) {
    var A = _.width, {
      width: C
    } = f;
    P.push("scale(".concat(R(C) && R(A) ? C / A : 1, ")"));
  }
  return g && P.push("rotate(".concat(g, ", ").concat(b, ", ").concat(x, ")")), P.length && (w.transform = P.join(" ")), /* @__PURE__ */ h.createElement("text", Fl({}, Ze(w), {
    ref: t,
    x: b,
    y: x,
    className: J("recharts-text", m),
    textAnchor: s,
    fill: l.includes("url") ? Ng : l
  }), d.map((T, I) => {
    var k = T.words.join(y ? "" : " ");
    return (
      // duplicate words will cause duplicate keys which is why we add the array index here
      /* @__PURE__ */ h.createElement("tspan", {
        x: b,
        dy: I === 0 ? O : a,
        key: "".concat(k, "-").concat(I)
      }, k)
    );
  }));
});
Ps.displayName = "Text";
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
function bt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ld(Object(r), !0).forEach(function(n) {
      kj(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ld(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function kj(e, t, r) {
  return (t = Ej(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Ej(e) {
  var t = Cj(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Cj(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var jj = (e) => {
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
  } = pu(t), c = a, f = a + (u - s) / 2, d = (c + f) / 2, v = (u + s) / 2, p = c + u / 2, g = l >= 0 ? 1 : -1, m = g * n, y = g > 0 ? "end" : "start", w = g > 0 ? "start" : "end", b = u >= 0 ? 1 : -1, x = b * n, O = b > 0 ? "end" : "start", P = b > 0 ? "start" : "end", _ = i;
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
      verticalAnchor: w
    };
    return _ && (C.height = Math.max(_.y + _.height - (o + l), 0), C.width = s), C;
  }
  if (r === "left") {
    var T = {
      x: d - x,
      y: o + l / 2,
      horizontalAnchor: O,
      verticalAnchor: "middle"
    };
    return _ && (T.width = Math.max(T.x - _.x, 0), T.height = l), T;
  }
  if (r === "right") {
    var I = {
      x: d + v + x,
      y: o + l / 2,
      horizontalAnchor: P,
      verticalAnchor: "middle"
    };
    return _ && (I.width = Math.max(_.x + _.width - I.x, 0), I.height = l), I;
  }
  var k = _ ? {
    width: v,
    height: l
  } : {};
  return r === "insideLeft" ? bt({
    x: d + x,
    y: o + l / 2,
    horizontalAnchor: P,
    verticalAnchor: "middle"
  }, k) : r === "insideRight" ? bt({
    x: d + v - x,
    y: o + l / 2,
    horizontalAnchor: O,
    verticalAnchor: "middle"
  }, k) : r === "insideTop" ? bt({
    x: c + u / 2,
    y: o + m,
    horizontalAnchor: "middle",
    verticalAnchor: w
  }, k) : r === "insideBottom" ? bt({
    x: f + s / 2,
    y: o + l - m,
    horizontalAnchor: "middle",
    verticalAnchor: y
  }, k) : r === "insideTopLeft" ? bt({
    x: c + x,
    y: o + m,
    horizontalAnchor: P,
    verticalAnchor: w
  }, k) : r === "insideTopRight" ? bt({
    x: c + u - x,
    y: o + m,
    horizontalAnchor: O,
    verticalAnchor: w
  }, k) : r === "insideBottomLeft" ? bt({
    x: f + x,
    y: o + l - m,
    horizontalAnchor: P,
    verticalAnchor: y
  }, k) : r === "insideBottomRight" ? bt({
    x: f + s - x,
    y: o + l - m,
    horizontalAnchor: O,
    verticalAnchor: y
  }, k) : r && typeof r == "object" && (R(r.x) || jr(r.x)) && (R(r.y) || jr(r.y)) ? bt({
    x: a + lr(r.x, v),
    y: o + lr(r.y, l),
    horizontalAnchor: "end",
    verticalAnchor: "end"
  }, k) : bt({
    x: p,
    y: o + l / 2,
    horizontalAnchor: "middle",
    verticalAnchor: "middle"
  }, k);
}, Ij = ["labelRef"], Mj = ["content"];
function Rd(e, t) {
  if (e == null) return {};
  var r, n, i = Tj(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function Tj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function zd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function In(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zd(Object(r), !0).forEach(function(n) {
      Dj(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : zd(Object(r)).forEach(function(n) {
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
function Nt() {
  return Nt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Nt.apply(null, arguments);
}
var $g = /* @__PURE__ */ h.createContext(null), Lj = (e) => {
  var {
    x: t,
    y: r,
    upperWidth: n,
    lowerWidth: i,
    width: a,
    height: o,
    children: l
  } = e, u = h.useMemo(() => ({
    x: t,
    y: r,
    upperWidth: n,
    lowerWidth: i,
    width: a,
    height: o
  }), [t, r, n, i, a, o]);
  return /* @__PURE__ */ h.createElement($g.Provider, {
    value: u
  }, l);
}, Lg = () => {
  var e = h.useContext($g), t = Qa();
  return e || (t ? pu(t) : void 0);
}, Rj = /* @__PURE__ */ h.createContext(null), zj = () => {
  var e = h.useContext(Rj), t = z(Mp);
  return e || t;
}, Bj = (e) => {
  var {
    value: t,
    formatter: r
  } = e, n = Ie(e.children) ? t : e.children;
  return typeof r == "function" ? r(n) : n;
}, Os = (e) => e != null && typeof e == "function", Fj = (e, t) => {
  var r = it(t - e), n = Math.min(Math.abs(t - e), 360);
  return r * n;
}, Wj = (e, t, r, n, i) => {
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
    clockWise: v
  } = i, p = (s + c) / 2, g = Fj(f, d), m = g >= 0 ? 1 : -1, y, w;
  switch (t) {
    case "insideStart":
      y = f + m * a, w = v;
      break;
    case "insideEnd":
      y = d - m * a, w = !v;
      break;
    case "end":
      y = d + m * a, w = v;
      break;
    default:
      throw new Error("Unsupported position ".concat(t));
  }
  w = g <= 0 ? w : !w;
  var b = Ce(l, u, p, y), x = Ce(l, u, p, y + (w ? 1 : -1) * 359), O = "M".concat(b.x, ",").concat(b.y, `
    A`).concat(p, ",").concat(p, ",0,1,").concat(w ? 0 : 1, `,
    `).concat(x.x, ",").concat(x.y), P = Ie(e.id) ? Dn("recharts-radial-line-") : e.id;
  return /* @__PURE__ */ h.createElement("text", Nt({}, n, {
    dominantBaseline: "central",
    className: J("recharts-radial-bar-label", o)
  }), /* @__PURE__ */ h.createElement("defs", null, /* @__PURE__ */ h.createElement("path", {
    id: P,
    d: O
  })), /* @__PURE__ */ h.createElement("textPath", {
    xlinkHref: "#".concat(P)
  }, r));
}, Uj = (e, t, r) => {
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
    x: v,
    y: p
  } = Ce(n, i, d, s);
  return {
    x: v,
    y: p,
    textAnchor: "middle",
    verticalAnchor: "middle"
  };
}, Ri = (e) => e != null && "cx" in e && R(e.cx), Kj = {
  angle: 0,
  offset: 5,
  zIndex: Re.label,
  position: "middle",
  textBreakAll: !1
};
function Hj(e) {
  if (!Ri(e))
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
  var t = Ke(e, Kj), {
    viewBox: r,
    parentViewBox: n,
    position: i,
    value: a,
    children: o,
    content: l,
    className: u = "",
    textBreakAll: s,
    labelRef: c
  } = t, f = zj(), d = Lg(), v = i === "center" ? d : f ?? d, p, g, m;
  r == null ? p = v : Ri(r) ? p = r : p = pu(r);
  var y = Hj(p);
  if (!p || Ie(a) && Ie(o) && !/* @__PURE__ */ h.isValidElement(l) && typeof l != "function")
    return null;
  var w = In(In({}, t), {}, {
    viewBox: p
  });
  if (/* @__PURE__ */ h.isValidElement(l)) {
    var {
      labelRef: b
    } = w, x = Rd(w, Ij);
    return /* @__PURE__ */ h.cloneElement(l, x);
  }
  if (typeof l == "function") {
    var {
      content: O
    } = w, P = Rd(w, Mj);
    if (g = /* @__PURE__ */ h.createElement(l, P), /* @__PURE__ */ h.isValidElement(g))
      return g;
  } else
    g = Bj(t);
  var _ = Ze(t);
  if (Ri(p)) {
    if (i === "insideStart" || i === "insideEnd" || i === "end")
      return Wj(t, i, g, _, p);
    m = Uj(p, t.offset, t.position);
  } else {
    if (!y)
      return null;
    var A = jj({
      viewBox: y,
      position: i,
      offset: t.offset,
      parentViewBox: Ri(n) ? void 0 : n
    });
    m = In(In({
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
  return /* @__PURE__ */ h.createElement(Qt, {
    zIndex: t.zIndex
  }, /* @__PURE__ */ h.createElement(Ps, Nt({
    ref: c,
    className: J("recharts-label", u)
  }, _, m, {
    /*
     * textAnchor is decided by default based on the `position`
     * but we allow overriding via props for precise control.
     */
    textAnchor: Mg(_.textAnchor) ? _.textAnchor : m.textAnchor,
    breakAll: s
  }), g));
}
rr.displayName = "Label";
var Gj = (e, t, r) => {
  if (!e)
    return null;
  var n = {
    viewBox: t,
    labelRef: r
  };
  return e === !0 ? /* @__PURE__ */ h.createElement(rr, Nt({
    key: "label-implicit"
  }, n)) : Et(e) ? /* @__PURE__ */ h.createElement(rr, Nt({
    key: "label-implicit",
    value: e
  }, n)) : /* @__PURE__ */ h.isValidElement(e) ? e.type === rr ? /* @__PURE__ */ h.cloneElement(e, In({
    key: "label-implicit"
  }, n)) : /* @__PURE__ */ h.createElement(rr, Nt({
    key: "label-implicit",
    content: e
  }, n)) : Os(e) ? /* @__PURE__ */ h.createElement(rr, Nt({
    key: "label-implicit",
    content: e
  }, n)) : e && typeof e == "object" ? /* @__PURE__ */ h.createElement(rr, Nt({}, e, {
    key: "label-implicit"
  }, n)) : null;
};
function qj(e) {
  var {
    label: t,
    labelRef: r
  } = e, n = Lg();
  return Gj(t, n, r) || null;
}
var Yj = ["valueAccessor"], Vj = ["dataKey", "clockWise", "id", "textBreakAll", "zIndex"];
function ka() {
  return ka = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ka.apply(null, arguments);
}
function Bd(e, t) {
  if (e == null) return {};
  var r, n, i = Xj(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function Xj(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var Zj = (e) => {
  var t = Array.isArray(e.value) ? e.value[e.value.length - 1] : e.value;
  if (Pj(t))
    return t;
}, Rg = /* @__PURE__ */ h.createContext(void 0), Qj = Rg.Provider, zg = /* @__PURE__ */ h.createContext(void 0);
zg.Provider;
function Jj() {
  return h.useContext(Rg);
}
function eI() {
  return h.useContext(zg);
}
function Tn(e) {
  var {
    valueAccessor: t = Zj
  } = e, r = Bd(e, Yj), {
    dataKey: n,
    clockWise: i,
    id: a,
    textBreakAll: o,
    zIndex: l
  } = r, u = Bd(r, Vj), s = Jj(), c = eI(), f = s || c;
  return !f || !f.length ? null : /* @__PURE__ */ h.createElement(Qt, {
    zIndex: l ?? Re.label
  }, /* @__PURE__ */ h.createElement(_t, {
    className: "recharts-label-list"
  }, f.map((d, v) => {
    var p, g = Ie(n) ? t(d, v) : je(d.payload, n), m = Ie(a) ? {} : {
      id: "".concat(a, "-").concat(v)
    };
    return /* @__PURE__ */ h.createElement(rr, ka({
      key: "label-".concat(v)
    }, Ze(d), u, m, {
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
      index: v,
      zIndex: 0
    }));
  })));
}
Tn.displayName = "LabelList";
function tI(e) {
  var {
    label: t
  } = e;
  return t ? t === !0 ? /* @__PURE__ */ h.createElement(Tn, {
    key: "labelList-implicit"
  }) : /* @__PURE__ */ h.isValidElement(t) || Os(t) ? /* @__PURE__ */ h.createElement(Tn, {
    key: "labelList-implicit",
    content: t
  }) : typeof t == "object" ? /* @__PURE__ */ h.createElement(Tn, ka({
    key: "labelList-implicit"
  }, t, {
    type: String(t.type)
  })) : null : null;
}
function Wl() {
  return Wl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Wl.apply(null, arguments);
}
var Bg = (e) => {
  var {
    cx: t,
    cy: r,
    r: n,
    className: i
  } = e, a = J("recharts-dot", i);
  return R(t) && R(r) && R(n) ? /* @__PURE__ */ h.createElement("circle", Wl({}, ht(e), au(e), {
    className: a,
    cx: t,
    cy: r,
    r: n
  })) : null;
}, rI = {
  radiusAxis: {},
  angleAxis: {}
}, Fg = $e({
  name: "polarAxis",
  initialState: rI,
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
  addRadiusAxis: XN,
  removeRadiusAxis: ZN,
  addAngleAxis: QN,
  removeAngleAxis: JN
} = Fg.actions, nI = Fg.reducer;
function iI(e) {
  return e && typeof e == "object" && "className" in e && typeof e.className == "string" ? e.className : "";
}
var Wg = (e) => e && typeof e == "object" && "clipDot" in e ? !!e.clipDot : !0;
function aI(e) {
  var {
    tooltipEntrySettings: t
  } = e, r = ce(), n = He(), i = h.useRef(null);
  return h.useLayoutEffect(() => {
    n || (i.current === null ? r(Nk(t)) : i.current !== t && r($k({
      prev: i.current,
      next: t
    })), i.current = t);
  }, [t, r, n]), h.useLayoutEffect(() => () => {
    i.current && (r(Lk(i.current)), i.current = null);
  }, [r]), null;
}
function oI(e) {
  var {
    legendPayload: t
  } = e, r = ce(), n = He(), i = h.useRef(null);
  return h.useLayoutEffect(() => {
    n || (i.current === null ? r(S1(t)) : i.current !== t && r(_1({
      prev: i.current,
      next: t
    })), i.current = t);
  }, [r, n, t]), h.useLayoutEffect(() => () => {
    i.current && (r(k1(i.current)), i.current = null);
  }, [r]), null;
}
var Ko, lI = () => {
  var [e] = h.useState(() => Dn("uid-"));
  return e;
}, uI = (Ko = Uy.useId) !== null && Ko !== void 0 ? Ko : lI;
function sI(e, t) {
  var r = uI();
  return t || (e ? "".concat(e, "-").concat(r) : r);
}
var cI = /* @__PURE__ */ h.createContext(void 0), fI = (e) => {
  var {
    id: t,
    type: r,
    children: n
  } = e, i = sI("recharts-".concat(r), t);
  return /* @__PURE__ */ h.createElement(cI.Provider, {
    value: i
  }, n(i));
}, dI = {
  cartesianItems: [],
  polarItems: []
}, Ug = $e({
  name: "graphicalItems",
  initialState: dI,
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
        } = t.payload, i = at(e).cartesianItems.indexOf(r);
        i > -1 && (e.cartesianItems[i] = n);
      },
      prepare: ie()
    },
    removeCartesianGraphicalItem: {
      reducer(e, t) {
        var r = at(e).cartesianItems.indexOf(t.payload);
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
        var r = at(e).polarItems.indexOf(t.payload);
        r > -1 && e.polarItems.splice(r, 1);
      },
      prepare: ie()
    },
    replacePolarGraphicalItem: {
      reducer(e, t) {
        var {
          prev: r,
          next: n
        } = t.payload, i = at(e).polarItems.indexOf(r);
        i > -1 && (e.polarItems[i] = n);
      },
      prepare: ie()
    }
  }
}), {
  addCartesianGraphicalItem: vI,
  replaceCartesianGraphicalItem: hI,
  removeCartesianGraphicalItem: pI,
  addPolarGraphicalItem: e2,
  removePolarGraphicalItem: t2,
  replacePolarGraphicalItem: r2
} = Ug.actions, mI = Ug.reducer, gI = (e) => {
  var t = ce(), r = h.useRef(null);
  return h.useLayoutEffect(() => {
    r.current === null ? t(vI(e)) : r.current !== e && t(hI({
      prev: r.current,
      next: e
    })), r.current = e;
  }, [t, e]), h.useLayoutEffect(() => () => {
    r.current && (t(pI(r.current)), r.current = null);
  }, [t]), null;
}, yI = /* @__PURE__ */ h.memo(gI), bI = ["points"];
function Fd(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ho(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Fd(Object(r), !0).forEach(function(n) {
      wI(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Fd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function wI(e, t, r) {
  return (t = xI(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function xI(e) {
  var t = PI(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function PI(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ea() {
  return Ea = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ea.apply(null, arguments);
}
function OI(e, t) {
  if (e == null) return {};
  var r, n, i = AI(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function AI(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function SI(e) {
  var {
    option: t,
    dotProps: r,
    className: n
  } = e;
  if (/* @__PURE__ */ h.isValidElement(t))
    return /* @__PURE__ */ h.cloneElement(t, r);
  if (typeof t == "function")
    return t(r);
  var i = J(n, typeof t != "boolean" ? t.className : ""), a = r ?? {}, {
    points: o
  } = a, l = OI(a, bI);
  return /* @__PURE__ */ h.createElement(Bg, Ea({}, l, {
    className: i
  }));
}
function _I(e, t) {
  return e == null ? !1 : t ? !0 : e.length === 1;
}
function kI(e) {
  var {
    points: t,
    dot: r,
    className: n,
    dotClassName: i,
    dataKey: a,
    baseProps: o,
    needClip: l,
    clipPathId: u,
    zIndex: s = Re.scatter
  } = e;
  if (!_I(t, r))
    return null;
  var c = Wg(r), f = qy(r), d = t.map((p, g) => {
    var m, y, w = Ho(Ho(Ho({
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
    return /* @__PURE__ */ h.createElement(SI, {
      key: "dot-".concat(g),
      option: r,
      dotProps: w,
      className: i
    });
  }), v = {};
  return l && u != null && (v.clipPath = "url(#clipPath-".concat(c ? "" : "dots-").concat(u, ")")), /* @__PURE__ */ h.createElement(Qt, {
    zIndex: s
  }, /* @__PURE__ */ h.createElement(_t, Ea({
    className: n
  }, v), d));
}
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
function Ud(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Wd(Object(r), !0).forEach(function(n) {
      EI(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Wd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function EI(e, t, r) {
  return (t = CI(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function CI(e) {
  var t = jI(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function jI(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Kg = 0, II = {
  xAxis: {},
  yAxis: {},
  zAxis: {}
}, Hg = $e({
  name: "cartesianAxis",
  initialState: II,
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
        e.yAxis[r] = Ud(Ud({}, i), {}, {
          width: n,
          widthHistory: l
        });
      }
    }
  }
}), {
  addXAxis: MI,
  replaceXAxis: TI,
  removeXAxis: DI,
  addYAxis: NI,
  replaceYAxis: $I,
  removeYAxis: LI,
  addZAxis: n2,
  replaceZAxis: i2,
  removeZAxis: a2,
  updateYAxisWidth: RI
} = Hg.actions, zI = Hg.reducer, BI = S([Me], (e) => ({
  top: e.top,
  bottom: e.bottom,
  left: e.left,
  right: e.right
})), FI = S([BI, Ht, Gt], (e, t, r) => {
  if (!(!e || t == null || r == null))
    return {
      x: e.left,
      y: e.top,
      width: Math.max(0, t - e.left - e.right),
      height: Math.max(0, r - e.top - e.bottom)
    };
}), As = () => z(FI), WI = () => z(NE);
function Kd(e, t) {
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
    t % 2 ? Kd(Object(r), !0).forEach(function(n) {
      UI(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Kd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function UI(e, t, r) {
  return (t = KI(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function KI(e) {
  var t = HI(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function HI(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var GI = (e) => {
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
  }, u = Go(Go(Go({}, l), Da(i)), au(i)), s;
  return /* @__PURE__ */ h.isValidElement(i) ? s = /* @__PURE__ */ h.cloneElement(i, u) : typeof i == "function" ? s = i(u) : s = /* @__PURE__ */ h.createElement(Bg, u), /* @__PURE__ */ h.createElement(_t, {
    className: "recharts-active-dot",
    clipPath: o
  }, s);
};
function Hd(e) {
  var {
    points: t,
    mainColor: r,
    activeDot: n,
    itemDataKey: i,
    clipPath: a,
    zIndex: o = Re.activeDot
  } = e, l = z(qn), u = WI();
  if (t == null || u == null)
    return null;
  var s = t.find((c) => u.includes(c.payload));
  return Ie(s) ? null : /* @__PURE__ */ h.createElement(Qt, {
    zIndex: o
  }, /* @__PURE__ */ h.createElement(GI, {
    point: s,
    childIndex: Number(l),
    mainColor: r,
    dataKey: i,
    activeDot: n,
    clipPath: a
  }));
}
var qI = (e) => {
  var {
    chartData: t
  } = e, r = ce(), n = He();
  return h.useEffect(() => n ? () => {
  } : (r(Pd(t)), () => {
    r(Pd(void 0));
  }), [t, r, n]), null;
}, Gd = {
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
}, Gg = $e({
  name: "brush",
  initialState: Gd,
  reducers: {
    setBrushSettings(e, t) {
      return t.payload == null ? Gd : t.payload;
    }
  }
}), {
  setBrushSettings: o2
} = Gg.actions, YI = Gg.reducer;
function VI(e) {
  return (e % 180 + 180) % 180;
}
var XI = function(t) {
  var {
    width: r,
    height: n
  } = t, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, a = VI(i), o = a * Math.PI / 180, l = Math.atan(n / r), u = o > l && o < Math.PI - l ? n / Math.sin(o) : r / Math.cos(o);
  return Math.abs(u);
}, ZI = {
  dots: [],
  areas: [],
  lines: []
}, qg = $e({
  name: "referenceElements",
  initialState: ZI,
  reducers: {
    addDot: (e, t) => {
      e.dots.push(t.payload);
    },
    removeDot: (e, t) => {
      var r = at(e).dots.findIndex((n) => n === t.payload);
      r !== -1 && e.dots.splice(r, 1);
    },
    addArea: (e, t) => {
      e.areas.push(t.payload);
    },
    removeArea: (e, t) => {
      var r = at(e).areas.findIndex((n) => n === t.payload);
      r !== -1 && e.areas.splice(r, 1);
    },
    addLine: (e, t) => {
      e.lines.push(t.payload);
    },
    removeLine: (e, t) => {
      var r = at(e).lines.findIndex((n) => n === t.payload);
      r !== -1 && e.lines.splice(r, 1);
    }
  }
}), {
  addDot: l2,
  removeDot: u2,
  addArea: s2,
  removeArea: c2,
  addLine: f2,
  removeLine: d2
} = qg.actions, QI = qg.reducer, JI = /* @__PURE__ */ h.createContext(void 0), eM = (e) => {
  var {
    children: t
  } = e, [r] = h.useState("".concat(Dn("recharts"), "-clip")), n = As();
  if (n == null)
    return null;
  var {
    x: i,
    y: a,
    width: o,
    height: l
  } = n;
  return /* @__PURE__ */ h.createElement(JI.Provider, {
    value: r
  }, /* @__PURE__ */ h.createElement("defs", null, /* @__PURE__ */ h.createElement("clipPath", {
    id: r
  }, /* @__PURE__ */ h.createElement("rect", {
    x: i,
    y: a,
    height: l,
    width: o
  }))), t);
};
function Yg(e, t) {
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
function tM(e, t, r) {
  var n = {
    width: e.width + t.width,
    height: e.height + t.height
  };
  return XI(n, r);
}
function rM(e, t, r) {
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
function Vn(e, t, r, n, i) {
  if (e * t < e * n || e * t > e * i)
    return !1;
  var a = r();
  return e * (t - e * a / 2 - n) >= 0 && e * (t + e * a / 2 - i) <= 0;
}
function nM(e, t) {
  return Yg(e, t + 1);
}
function iM(e, t, r, n, i) {
  for (var a = (n || []).slice(), {
    start: o,
    end: l
  } = t, u = 0, s = 1, c = o, f = function() {
    var p = n?.[u];
    if (p === void 0)
      return {
        v: Yg(n, s)
      };
    var g = u, m, y = () => (m === void 0 && (m = r(p, g)), m), w = p.coordinate, b = u === 0 || Vn(e, w, y, c, l);
    b || (u = 0, c = o, s += 1), b && (c = w + e * (y() / 2 + i), u += s);
  }, d; s <= a.length; )
    if (d = f(), d) return d.v;
  return [];
}
function aM(e, t, r, n, i) {
  var a = (n || []).slice(), o = a.length;
  if (o === 0)
    return [];
  for (var {
    start: l,
    end: u
  } = t, s = 1; s <= o; s++) {
    for (var c = (o - 1) % s, f = l, d = !0, v = function() {
      var x = n[g];
      if (x == null)
        return 0;
      var O = g, P, _ = () => (P === void 0 && (P = r(x, O)), P), A = x.coordinate, C = g === c || Vn(e, A, _, f, u);
      if (!C)
        return d = !1, 1;
      C && (f = A + e * (_() / 2 + i));
    }, p, g = c; g < o && (p = v(), !(p !== 0 && p === 1)); g += s)
      ;
    if (d) {
      for (var m = [], y = c; y < o; y += s) {
        var w = n[y];
        w != null && m.push(w);
      }
      return m;
    }
  }
  return [];
}
function qd(e, t) {
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
    t % 2 ? qd(Object(r), !0).forEach(function(n) {
      oM(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : qd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function oM(e, t, r) {
  return (t = lM(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function lM(e) {
  var t = uM(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function uM(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function sM(e, t, r, n, i) {
  for (var a = (n || []).slice(), o = a.length, {
    start: l
  } = t, {
    end: u
  } = t, s = function(d) {
    var v = a[d];
    if (v == null)
      return 1;
    var p = v, g, m = () => (g === void 0 && (g = r(v, d)), g);
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
      var w = Vn(e, p.tickCoord, m, l, u);
      w && (u = p.tickCoord - e * (m() / 2 + i), a[d] = Te(Te({}, p), {}, {
        isShow: !0
      }));
    }
  }, c = o - 1; c >= 0; c--)
    s(c);
  return a;
}
function cM(e, t, r, n, i, a) {
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
        var v = Vn(e, c.tickCoord, () => f, u, s);
        v && (s = c.tickCoord - e * (f / 2 + i), o[l - 1] = Te(Te({}, c), {}, {
          isShow: !0
        }));
      }
    }
  }
  for (var p = a ? l - 1 : l, g = function(w) {
    var b = o[w];
    if (b == null)
      return 1;
    var x = b, O, P = () => (O === void 0 && (O = r(b, w)), O);
    if (w === 0) {
      var _ = e * (x.coordinate - e * P() / 2 - u);
      o[w] = x = Te(Te({}, x), {}, {
        tickCoord: _ < 0 ? x.coordinate - _ * e : x.coordinate
      });
    } else
      o[w] = x = Te(Te({}, x), {}, {
        tickCoord: x.coordinate
      });
    if (x.tickCoord != null) {
      var A = Vn(e, x.tickCoord, P, u, s);
      A && (u = x.tickCoord + e * (P() / 2 + i), o[w] = Te(Te({}, x), {}, {
        isShow: !0
      }));
    }
  }, m = 0; m < p; m++)
    g(m);
  return o;
}
function Ss(e, t, r) {
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
  if (R(u) || ni.isSsr) {
    var d;
    return (d = nM(i, R(u) ? u : 0)) !== null && d !== void 0 ? d : [];
  }
  var v = [], p = l === "top" || l === "bottom" ? "width" : "height", g = c && p === "width" ? Mn(c, {
    fontSize: t,
    letterSpacing: r
  }) : {
    width: 0,
    height: 0
  }, m = (O, P) => {
    var _ = typeof s == "function" ? s(O.value, P) : O.value;
    return p === "width" ? tM(Mn(_, {
      fontSize: t,
      letterSpacing: r
    }), g, f) : Mn(_, {
      fontSize: t,
      letterSpacing: r
    })[p];
  }, y = i[0], w = i[1], b = i.length >= 2 && y != null && w != null ? it(w.coordinate - y.coordinate) : 1, x = rM(a, b, p);
  return u === "equidistantPreserveStart" ? iM(b, x, m, i, o) : u === "equidistantPreserveEnd" ? aM(b, x, m, i, o) : (u === "preserveStart" || u === "preserveStartEnd" ? v = cM(b, x, m, i, o, u === "preserveStartEnd") : v = sM(b, x, m, i, o), v.filter((O) => O.isShow));
}
var fM = (e) => {
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
}, dM = {
  xAxis: {},
  yAxis: {}
}, Vg = $e({
  name: "renderedTicks",
  initialState: dM,
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
  setRenderedTicks: vM,
  removeRenderedTicks: hM
} = Vg.actions, pM = Vg.reducer, mM = ["axisLine", "width", "height", "className", "hide", "ticks", "axisType", "axisId"];
function gM(e, t) {
  if (e == null) return {};
  var r, n, i = yM(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function yM(e, t) {
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
function se(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Yd(Object(r), !0).forEach(function(n) {
      bM(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Yd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function bM(e, t, r) {
  return (t = wM(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function wM(e) {
  var t = xM(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function xM(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var zt = {
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
  zIndex: Re.axis
};
function PM(e) {
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
  var s = se(se(se({}, u), ht(l)), {}, {
    fill: "none"
  });
  if (a === "top" || a === "bottom") {
    var c = +(a === "top" && !o || a === "bottom" && o);
    s = se(se({}, s), {}, {
      x1: t,
      y1: r + c * i,
      x2: t + n,
      y2: r + c * i
    });
  } else {
    var f = +(a === "left" && !o || a === "right" && o);
    s = se(se({}, s), {}, {
      x1: t + f * n,
      y1: r,
      x2: t + f * n,
      y2: r + i
    });
  }
  return /* @__PURE__ */ h.createElement("line", Nr({}, s, {
    className: J("recharts-cartesian-axis-line", $r(l, "className"))
  }));
}
function OM(e, t, r, n, i, a, o, l, u) {
  var s, c, f, d, v, p, g = l ? -1 : 1, m = e.tickSize || o, y = R(e.tickCoord) ? e.tickCoord : e.coordinate;
  switch (a) {
    case "top":
      s = c = e.coordinate, d = r + +!l * i, f = d - g * m, p = f - g * u, v = y;
      break;
    case "left":
      f = d = e.coordinate, c = t + +!l * n, s = c - g * m, v = s - g * u, p = y;
      break;
    case "right":
      f = d = e.coordinate, c = t + +l * n, s = c + g * m, v = s + g * u, p = y;
      break;
    default:
      s = c = e.coordinate, d = r + +l * i, f = d + g * m, p = f + g * u, v = y;
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
      x: v,
      y: p
    }
  };
}
function AM(e, t) {
  switch (e) {
    case "left":
      return t ? "start" : "end";
    case "right":
      return t ? "end" : "start";
    default:
      return "middle";
  }
}
function SM(e, t) {
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
function _M(e) {
  var {
    option: t,
    tickProps: r,
    value: n
  } = e, i, a = J(r.className, "recharts-cartesian-axis-tick-value");
  if (/* @__PURE__ */ h.isValidElement(t))
    i = /* @__PURE__ */ h.cloneElement(t, se(se({}, r), {}, {
      className: a
    }));
  else if (typeof t == "function")
    i = t(se(se({}, r), {}, {
      className: a
    }));
  else {
    var o = "recharts-cartesian-axis-tick-value";
    typeof t != "boolean" && (o = J(o, iI(t))), i = /* @__PURE__ */ h.createElement(Ps, Nr({}, r, {
      className: o
    }), n);
  }
  return i;
}
function kM(e) {
  var {
    ticks: t,
    axisType: r,
    axisId: n
  } = e, i = ce();
  return h.useEffect(() => {
    if (n == null || r == null)
      return Lr;
    var a = t.map((o) => ({
      value: o.value,
      coordinate: o.coordinate,
      offset: o.offset,
      index: o.index
    }));
    return i(vM({
      ticks: a,
      axisId: n,
      axisType: r
    })), () => {
      i(hM({
        axisId: n,
        axisType: r
      }));
    };
  }, [i, t, n, r]), null;
}
var EM = /* @__PURE__ */ h.forwardRef((e, t) => {
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
    y: v,
    width: p,
    height: g,
    tickSize: m,
    tickMargin: y,
    fontSize: w,
    letterSpacing: b,
    getTicksConfig: x,
    events: O,
    axisType: P,
    axisId: _
  } = e, A = Ss(se(se({}, x), {}, {
    ticks: r
  }), w, b), C = ht(x), T = Da(n), I = Mg(C.textAnchor) ? C.textAnchor : AM(c, f), k = SM(c, f), B = {};
  typeof i == "object" && (B = i);
  var F = se(se({}, C), {}, {
    fill: "none"
  }, B), W = A.map((re) => se({
    entry: re
  }, OM(re, d, v, p, g, c, m, f, y))), q = W.map((re) => {
    var {
      entry: Q,
      line: M
    } = re;
    return /* @__PURE__ */ h.createElement(_t, {
      className: "recharts-cartesian-axis-tick",
      key: "tick-".concat(Q.value, "-").concat(Q.coordinate, "-").concat(Q.tickCoord)
    }, i && /* @__PURE__ */ h.createElement("line", Nr({}, F, M, {
      className: J("recharts-cartesian-axis-tick-line", $r(i, "className"))
    })));
  }), V = W.map((re, Q) => {
    var M, Le, {
      entry: ue,
      tick: Fe
    } = re, be = se(se(se(se({
      verticalAnchor: k
    }, C), {}, {
      textAnchor: I,
      stroke: "none",
      fill: a
    }, Fe), {}, {
      index: Q,
      payload: ue,
      visibleTicksCount: A.length,
      tickFormatter: o,
      padding: u
    }, s), {}, {
      angle: (M = (Le = s?.angle) !== null && Le !== void 0 ? Le : C.angle) !== null && M !== void 0 ? M : 0
    }), ne = se(se({}, be), T);
    return /* @__PURE__ */ h.createElement(_t, Nr({
      className: "recharts-cartesian-axis-tick-label",
      key: "tick-label-".concat(ue.value, "-").concat(ue.coordinate, "-").concat(ue.tickCoord)
    }, Hv(O, ue, Q)), n && /* @__PURE__ */ h.createElement(_M, {
      option: n,
      tickProps: ne,
      value: "".concat(typeof o == "function" ? o(ue.value, Q) : ue.value).concat(l || "")
    }));
  });
  return /* @__PURE__ */ h.createElement("g", {
    className: "recharts-cartesian-axis-ticks recharts-".concat(P, "-ticks")
  }, /* @__PURE__ */ h.createElement(kM, {
    ticks: A,
    axisId: _,
    axisType: P
  }), V.length > 0 && /* @__PURE__ */ h.createElement(Qt, {
    zIndex: Re.label
  }, /* @__PURE__ */ h.createElement("g", {
    className: "recharts-cartesian-axis-tick-labels recharts-".concat(P, "-tick-labels"),
    ref: t
  }, V)), q.length > 0 && /* @__PURE__ */ h.createElement("g", {
    className: "recharts-cartesian-axis-tick-lines recharts-".concat(P, "-tick-lines")
  }, q));
}), CM = /* @__PURE__ */ h.forwardRef((e, t) => {
  var {
    axisLine: r,
    width: n,
    height: i,
    className: a,
    hide: o,
    ticks: l,
    axisType: u,
    axisId: s
  } = e, c = gM(e, mM), [f, d] = h.useState(""), [v, p] = h.useState(""), g = h.useRef(null);
  h.useImperativeHandle(t, () => ({
    getCalculatedWidth: () => {
      var y;
      return fM({
        ticks: g.current,
        label: (y = e.labelRef) === null || y === void 0 ? void 0 : y.current,
        labelGapWithTick: 5,
        tickSize: e.tickSize,
        tickMargin: e.tickMargin
      });
    }
  }));
  var m = h.useCallback((y) => {
    if (y) {
      var w = y.getElementsByClassName("recharts-cartesian-axis-tick-value");
      g.current = w;
      var b = w[0];
      if (b) {
        var x = window.getComputedStyle(b), O = x.fontSize, P = x.letterSpacing;
        (O !== f || P !== v) && (d(O), p(P));
      }
    }
  }, [f, v]);
  return o || n != null && n <= 0 || i != null && i <= 0 ? null : /* @__PURE__ */ h.createElement(Qt, {
    zIndex: e.zIndex
  }, /* @__PURE__ */ h.createElement(_t, {
    className: J("recharts-cartesian-axis", a)
  }, /* @__PURE__ */ h.createElement(PM, {
    x: e.x,
    y: e.y,
    width: n,
    height: i,
    orientation: e.orientation,
    mirror: e.mirror,
    axisLine: r,
    otherSvgProps: ht(e)
  }), /* @__PURE__ */ h.createElement(EM, {
    ref: m,
    axisType: u,
    events: c,
    fontSize: f,
    getTicksConfig: e,
    height: e.height,
    letterSpacing: v,
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
  }), /* @__PURE__ */ h.createElement(Lj, {
    x: e.x,
    y: e.y,
    width: e.width,
    height: e.height,
    lowerWidth: e.width,
    upperWidth: e.width
  }, /* @__PURE__ */ h.createElement(qj, {
    label: e.label,
    labelRef: e.labelRef
  }), e.children)));
}), _s = /* @__PURE__ */ h.forwardRef((e, t) => {
  var r = Ke(e, zt);
  return /* @__PURE__ */ h.createElement(CM, Nr({}, r, {
    ref: t
  }));
});
_s.displayName = "CartesianAxis";
var jM = ["x1", "y1", "x2", "y2", "key"], IM = ["offset"], MM = ["xAxisId", "yAxisId"], TM = ["xAxisId", "yAxisId"];
function Vd(e, t) {
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
    t % 2 ? Vd(Object(r), !0).forEach(function(n) {
      DM(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Vd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function DM(e, t, r) {
  return (t = NM(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function NM(e) {
  var t = $M(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function $M(e, t) {
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
function Ca(e, t) {
  if (e == null) return {};
  var r, n, i = LM(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function LM(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var RM = (e) => {
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
  return /* @__PURE__ */ h.createElement("rect", {
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
function Xg(e) {
  var {
    option: t,
    lineItemProps: r
  } = e, n;
  if (/* @__PURE__ */ h.isValidElement(t))
    n = /* @__PURE__ */ h.cloneElement(t, r);
  else if (typeof t == "function")
    n = t(r);
  else {
    var i, {
      x1: a,
      y1: o,
      x2: l,
      y2: u,
      key: s
    } = r, c = Ca(r, jM), f = (i = ht(c)) !== null && i !== void 0 ? i : {}, {
      offset: d
    } = f, v = Ca(f, IM);
    n = /* @__PURE__ */ h.createElement("line", Ar({}, v, {
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
function zM(e) {
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
  } = e, l = Ca(e, MM), u = i.map((s, c) => {
    var f = De(De({}, l), {}, {
      x1: t,
      y1: s,
      x2: t + r,
      y2: s,
      key: "line-".concat(c),
      index: c
    });
    return /* @__PURE__ */ h.createElement(Xg, {
      key: "line-".concat(c),
      option: n,
      lineItemProps: f
    });
  });
  return /* @__PURE__ */ h.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, u);
}
function BM(e) {
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
  } = e, l = Ca(e, TM), u = i.map((s, c) => {
    var f = De(De({}, l), {}, {
      x1: s,
      y1: t,
      x2: s,
      y2: t + r,
      key: "line-".concat(c),
      index: c
    });
    return /* @__PURE__ */ h.createElement(Xg, {
      option: n,
      lineItemProps: f,
      key: "line-".concat(c)
    });
  });
  return /* @__PURE__ */ h.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, u);
}
function FM(e) {
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
    var v = s[d + 1], p = v == null, g = p ? i + o - f : v - f;
    if (g <= 0)
      return null;
    var m = d % t.length;
    return /* @__PURE__ */ h.createElement("rect", {
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
  return /* @__PURE__ */ h.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, c);
}
function WM(e) {
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
    var v = s[d + 1], p = v == null, g = p ? i + o - f : v - f;
    if (g <= 0)
      return null;
    var m = d % r.length;
    return /* @__PURE__ */ h.createElement("rect", {
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
  return /* @__PURE__ */ h.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, c);
}
var UM = (e, t) => {
  var {
    xAxis: r,
    width: n,
    height: i,
    offset: a
  } = e;
  return zh(Ss(De(De(De({}, zt), r), {}, {
    ticks: Bh(r),
    viewBox: {
      x: 0,
      y: 0,
      width: n,
      height: i
    }
  })), a.left, a.left + a.width, t);
}, KM = (e, t) => {
  var {
    yAxis: r,
    width: n,
    height: i,
    offset: a
  } = e;
  return zh(Ss(De(De(De({}, zt), r), {}, {
    ticks: Bh(r),
    viewBox: {
      x: 0,
      y: 0,
      width: n,
      height: i
    }
  })), a.top, a.top + a.height, t);
}, HM = {
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
  zIndex: Re.grid
};
function Zg(e) {
  var t = mu(), r = gu(), n = qh(), i = De(De({}, Ke(e, HM)), {}, {
    x: R(e.x) ? e.x : n.left,
    y: R(e.y) ? e.y : n.top,
    width: R(e.width) ? e.width : n.width,
    height: R(e.height) ? e.height : n.height
  }), {
    xAxisId: a,
    yAxisId: o,
    x: l,
    y: u,
    width: s,
    height: c,
    syncWithTicks: f,
    horizontalValues: d,
    verticalValues: v
  } = i, p = He(), g = z((C) => sd(C, "xAxis", a, p)), m = z((C) => sd(C, "yAxis", o, p));
  if (!Ct(s) || !Ct(c) || !R(l) || !R(u))
    return null;
  var y = i.verticalCoordinatesGenerator || UM, w = i.horizontalCoordinatesGenerator || KM, {
    horizontalPoints: b,
    verticalPoints: x
  } = i;
  if ((!b || !b.length) && typeof w == "function") {
    var O = d && d.length, P = w({
      yAxis: m ? De(De({}, m), {}, {
        ticks: O ? d : m.ticks
      }) : void 0,
      width: t ?? s,
      height: r ?? c,
      offset: n
    }, O ? !0 : f);
    ra(Array.isArray(P), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(typeof P, "]")), Array.isArray(P) && (b = P);
  }
  if ((!x || !x.length) && typeof y == "function") {
    var _ = v && v.length, A = y({
      xAxis: g ? De(De({}, g), {}, {
        ticks: _ ? v : g.ticks
      }) : void 0,
      width: t ?? s,
      height: r ?? c,
      offset: n
    }, _ ? !0 : f);
    ra(Array.isArray(A), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(typeof A, "]")), Array.isArray(A) && (x = A);
  }
  return /* @__PURE__ */ h.createElement(Qt, {
    zIndex: i.zIndex
  }, /* @__PURE__ */ h.createElement("g", {
    className: "recharts-cartesian-grid"
  }, /* @__PURE__ */ h.createElement(RM, {
    fill: i.fill,
    fillOpacity: i.fillOpacity,
    x: i.x,
    y: i.y,
    width: i.width,
    height: i.height,
    ry: i.ry
  }), /* @__PURE__ */ h.createElement(FM, Ar({}, i, {
    horizontalPoints: b
  })), /* @__PURE__ */ h.createElement(WM, Ar({}, i, {
    verticalPoints: x
  })), /* @__PURE__ */ h.createElement(zM, Ar({}, i, {
    offset: n,
    horizontalPoints: b,
    xAxis: g,
    yAxis: m
  })), /* @__PURE__ */ h.createElement(BM, Ar({}, i, {
    offset: n,
    verticalPoints: x,
    xAxis: g,
    yAxis: m
  }))));
}
Zg.displayName = "CartesianGrid";
var GM = {}, Qg = $e({
  name: "errorBars",
  initialState: GM,
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
  addErrorBar: v2,
  replaceErrorBar: h2,
  removeErrorBar: p2
} = Qg.actions, qM = Qg.reducer;
function Jg(e, t) {
  var r, n, i = z((s) => Vt(s, e)), a = z((s) => Xt(s, t)), o = (r = i?.allowDataOverflow) !== null && r !== void 0 ? r : he.allowDataOverflow, l = (n = a?.allowDataOverflow) !== null && n !== void 0 ? n : pe.allowDataOverflow, u = o || l;
  return {
    needClip: u,
    needClipX: o,
    needClipY: l
  };
}
function YM(e) {
  var {
    xAxisId: t,
    yAxisId: r,
    clipPathId: n
  } = e, i = As(), {
    needClipX: a,
    needClipY: o,
    needClip: l
  } = Jg(t, r);
  if (!l || !i)
    return null;
  var {
    x: u,
    y: s,
    width: c,
    height: f
  } = i;
  return /* @__PURE__ */ h.createElement("clipPath", {
    id: "clipPath-".concat(n)
  }, /* @__PURE__ */ h.createElement("rect", {
    x: a ? u : u - c / 2,
    y: o ? s : s - f / 2,
    width: a ? c : c * 2,
    height: o ? f : f * 2
  }));
}
function VM(e) {
  var t = Da(e), r = 3, n = 2;
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
function ks(e, t) {
  var r, n;
  return (r = (n = e.graphicalItems.cartesianItems.find((i) => i.id === t)) === null || n === void 0 ? void 0 : n.xAxisId) !== null && r !== void 0 ? r : Kg;
}
function Es(e, t) {
  var r, n;
  return (r = (n = e.graphicalItems.cartesianItems.find((i) => i.id === t)) === null || n === void 0 ? void 0 : n.yAxisId) !== null && r !== void 0 ? r : Kg;
}
var ey = (e, t, r) => Zm(e, "xAxis", ks(e, t), r), ty = (e, t, r) => Xm(e, "xAxis", ks(e, t), r), ry = (e, t, r) => Zm(e, "yAxis", Es(e, t), r), ny = (e, t, r) => Xm(e, "yAxis", Es(e, t), r), XM = S([le, ey, ry, ty, ny], (e, t, r, n, i) => It(e, "xAxis") ? ta(t, n, !1) : ta(r, i, !1)), ZM = (e, t) => t, iy = S([bm, ZM], (e, t) => e.filter((r) => r.type === "area").find((r) => r.id === t)), ay = (e) => {
  var t = le(e), r = It(t, "xAxis");
  return r ? "yAxis" : "xAxis";
}, QM = (e, t) => {
  var r = ay(e);
  return r === "yAxis" ? Es(e, t) : ks(e, t);
}, JM = (e, t, r) => Em(e, ay(e), QM(e, t), r), eT = S([iy, JM], (e, t) => {
  var r;
  if (!(e == null || t == null)) {
    var {
      stackId: n
    } = e, i = ju(e);
    if (!(n == null || i == null)) {
      var a = (r = t[n]) === null || r === void 0 ? void 0 : r.stackedData, o = a?.find((l) => l.key === i);
      if (o != null)
        return o.map((l) => [l[0], l[1]]);
    }
  }
}), tT = S([le, ey, ry, ty, ny, eT, DO, XM, iy, FO], (e, t, r, n, i, a, o, l, u, s) => {
  var {
    chartData: c,
    dataStartIndex: f,
    dataEndIndex: d
  } = o;
  if (!(u == null || e !== "horizontal" && e !== "vertical" || t == null || r == null || n == null || i == null || n.length === 0 || i.length === 0 || l == null)) {
    var {
      data: v
    } = u, p;
    if (v && v.length > 0 ? p = v : p = c?.slice(f, d + 1), p != null)
      return xT({
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
}), rT = ["id"], nT = ["activeDot", "animationBegin", "animationDuration", "animationEasing", "connectNulls", "dot", "fill", "fillOpacity", "hide", "isAnimationActive", "legendType", "stroke", "xAxisId", "yAxisId"];
function Er() {
  return Er = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Er.apply(null, arguments);
}
function oy(e, t) {
  if (e == null) return {};
  var r, n, i = iT(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function iT(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
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
function Zr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Xd(Object(r), !0).forEach(function(n) {
      aT(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Xd(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function aT(e, t, r) {
  return (t = oT(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function oT(e) {
  var t = lT(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function lT(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ja(e, t) {
  return e && e !== "none" ? e : t;
}
var uT = (e) => {
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
    color: ja(n, i),
    value: Fh(r, t),
    payload: e
  }];
}, sT = /* @__PURE__ */ h.memo((e) => {
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
    getPosition: Lr,
    settings: {
      stroke: n,
      strokeWidth: i,
      fill: a,
      dataKey: t,
      nameKey: void 0,
      name: Fh(o, t),
      hide: l,
      type: s,
      color: ja(n, a),
      unit: u,
      graphicalItemId: c
    }
  };
  return /* @__PURE__ */ h.createElement(aI, {
    tooltipEntrySettings: f
  });
});
function cT(e) {
  var {
    clipPathId: t,
    points: r,
    props: n
  } = e, {
    needClip: i,
    dot: a,
    dataKey: o
  } = n, l = ht(n);
  return /* @__PURE__ */ h.createElement(kI, {
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
function fT(e) {
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
  return /* @__PURE__ */ h.createElement(Qj, {
    value: t ? i : void 0
  }, r);
}
function Zd(e) {
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
  } = a, d = oy(a, rT), v = ht(d), p = Ze(d);
  return /* @__PURE__ */ h.createElement(h.Fragment, null, t?.length > 1 && /* @__PURE__ */ h.createElement(_t, {
    clipPath: n ? "url(#clipPath-".concat(i, ")") : void 0
  }, /* @__PURE__ */ h.createElement(Li, Er({}, p, {
    id: f,
    points: t,
    connectNulls: s,
    type: l,
    baseLine: r,
    layout: o,
    stroke: "none",
    className: "recharts-area-area"
  })), u !== "none" && /* @__PURE__ */ h.createElement(Li, Er({}, v, {
    className: "recharts-area-curve",
    layout: o,
    type: l,
    connectNulls: s,
    fill: "none",
    points: t
  })), u !== "none" && c && Array.isArray(r) && /* @__PURE__ */ h.createElement(Li, Er({}, v, {
    className: "recharts-area-curve",
    layout: o,
    type: l,
    connectNulls: s,
    fill: "none",
    points: r
  }))), /* @__PURE__ */ h.createElement(cT, {
    points: t,
    props: d,
    clipPathId: i
  }));
}
function dT(e) {
  var t, r, {
    alpha: n,
    baseLine: i,
    points: a,
    strokeWidth: o
  } = e, l = (t = a[0]) === null || t === void 0 ? void 0 : t.y, u = (r = a[a.length - 1]) === null || r === void 0 ? void 0 : r.y;
  if (!G(l) || !G(u))
    return null;
  var s = n * Math.abs(l - u), c = Math.max(...a.map((f) => f.x || 0));
  return R(i) ? c = Math.max(i, c) : i && Array.isArray(i) && i.length && (c = Math.max(...i.map((f) => f.x || 0), c)), R(c) ? /* @__PURE__ */ h.createElement("rect", {
    x: 0,
    y: l < u ? l : l - s,
    width: c + (o ? parseInt("".concat(o), 10) : 1),
    height: Math.floor(s)
  }) : null;
}
function vT(e) {
  var t, r, {
    alpha: n,
    baseLine: i,
    points: a,
    strokeWidth: o
  } = e, l = (t = a[0]) === null || t === void 0 ? void 0 : t.x, u = (r = a[a.length - 1]) === null || r === void 0 ? void 0 : r.x;
  if (!G(l) || !G(u))
    return null;
  var s = n * Math.abs(l - u), c = Math.max(...a.map((f) => f.y || 0));
  return R(i) ? c = Math.max(i, c) : i && Array.isArray(i) && i.length && (c = Math.max(...i.map((f) => f.y || 0), c)), R(c) ? /* @__PURE__ */ h.createElement("rect", {
    x: l < u ? l : l - s,
    y: 0,
    width: s,
    height: Math.floor(c + (o ? parseInt("".concat(o), 10) : 1))
  }) : null;
}
function hT(e) {
  var {
    alpha: t,
    layout: r,
    points: n,
    baseLine: i,
    strokeWidth: a
  } = e;
  return r === "vertical" ? /* @__PURE__ */ h.createElement(dT, {
    alpha: t,
    points: n,
    baseLine: i,
    strokeWidth: a
  }) : /* @__PURE__ */ h.createElement(vT, {
    alpha: t,
    points: n,
    baseLine: i,
    strokeWidth: a
  });
}
function pT(e) {
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
    onAnimationEnd: v
  } = n, p = h.useMemo(() => ({
    points: o,
    baseLine: l
  }), [o, l]), g = sp(p, "recharts-area-"), m = yu(), [y, w] = h.useState(!1), b = !y, x = h.useCallback(() => {
    typeof v == "function" && v(), w(!1);
  }, [v]), O = h.useCallback(() => {
    typeof d == "function" && d(), w(!0);
  }, [d]);
  if (m == null)
    return null;
  var P = i.current, _ = a.current;
  return /* @__PURE__ */ h.createElement(fT, {
    showLabels: b,
    points: o
  }, n.children, /* @__PURE__ */ h.createElement(up, {
    animationId: g,
    begin: s,
    duration: c,
    isActive: u,
    easing: f,
    onAnimationEnd: x,
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
            var W = P[F];
            return Zr(Zr({}, k), {}, {
              x: xt(W.x, k.x, A),
              y: xt(W.y, k.y, A)
            });
          }
          return k;
        })
      ), I;
      return R(l) ? I = xt(_, l, A) : Ie(l) || kt(l) ? I = xt(_, 0, A) : I = l.map((k, B) => {
        var F = Math.floor(B * C);
        if (Array.isArray(_) && _[F]) {
          var W = _[F];
          return Zr(Zr({}, k), {}, {
            x: xt(W.x, k.x, A),
            y: xt(W.y, k.y, A)
          });
        }
        return k;
      }), A > 0 && (i.current = T, a.current = I), /* @__PURE__ */ h.createElement(Zd, {
        points: T,
        baseLine: I,
        needClip: t,
        clipPathId: r,
        props: n
      });
    }
    return A > 0 && (i.current = o, a.current = l), /* @__PURE__ */ h.createElement(_t, null, u && /* @__PURE__ */ h.createElement("defs", null, /* @__PURE__ */ h.createElement("clipPath", {
      id: "animationClipPath-".concat(r)
    }, /* @__PURE__ */ h.createElement(hT, {
      alpha: A,
      points: o,
      baseLine: l,
      layout: m,
      strokeWidth: n.strokeWidth
    }))), /* @__PURE__ */ h.createElement(_t, {
      clipPath: "url(#animationClipPath-".concat(r, ")")
    }, /* @__PURE__ */ h.createElement(Zd, {
      points: o,
      baseLine: l,
      needClip: t,
      clipPathId: r,
      props: n
    })));
  }), /* @__PURE__ */ h.createElement(tI, {
    label: n.label
  }));
}
function mT(e) {
  var {
    needClip: t,
    clipPathId: r,
    props: n
  } = e, i = h.useRef(null), a = h.useRef();
  return /* @__PURE__ */ h.createElement(pT, {
    needClip: t,
    clipPathId: r,
    props: n,
    previousPointsRef: i,
    previousBaselineRef: a
  });
}
class gT extends h.PureComponent {
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
      baseLine: v,
      zIndex: p
    } = this.props;
    if (t)
      return null;
    var g = J("recharts-area", i), m = d, {
      r: y,
      strokeWidth: w
    } = VM(r), b = Wg(r), x = y * 2 + w, O = l ? "url(#clipPath-".concat(b ? "" : "dots-").concat(m, ")") : void 0;
    return /* @__PURE__ */ h.createElement(Qt, {
      zIndex: p
    }, /* @__PURE__ */ h.createElement(_t, {
      className: g
    }, l && /* @__PURE__ */ h.createElement("defs", null, /* @__PURE__ */ h.createElement(YM, {
      clipPathId: m,
      xAxisId: u,
      yAxisId: s
    }), !b && /* @__PURE__ */ h.createElement("clipPath", {
      id: "clipPath-dots-".concat(m)
    }, /* @__PURE__ */ h.createElement("rect", {
      x: o - x / 2,
      y: a - x / 2,
      width: c + x,
      height: f + x
    }))), /* @__PURE__ */ h.createElement(mT, {
      needClip: l,
      clipPathId: m,
      props: this.props
    })), /* @__PURE__ */ h.createElement(Hd, {
      points: n,
      mainColor: ja(this.props.stroke, this.props.fill),
      itemDataKey: this.props.dataKey,
      activeDot: this.props.activeDot,
      clipPath: O
    }), this.props.isRange && Array.isArray(v) && /* @__PURE__ */ h.createElement(Hd, {
      points: v,
      mainColor: ja(this.props.stroke, this.props.fill),
      itemDataKey: this.props.dataKey,
      activeDot: this.props.activeDot,
      clipPath: O
    }));
  }
}
var yT = {
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
  zIndex: Re.area
};
function bT(e) {
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
    stroke: v,
    xAxisId: p,
    yAxisId: g
  } = e, m = oy(e, nT), y = un(), w = bg(), {
    needClip: b
  } = Jg(p, g), x = He(), {
    points: O,
    isRange: P,
    baseLine: _
  } = (t = z((B) => tT(B, e.id, x))) !== null && t !== void 0 ? t : {}, A = As();
  if (y !== "horizontal" && y !== "vertical" || A == null || w !== "AreaChart" && w !== "ComposedChart")
    return null;
  var {
    height: C,
    width: T,
    x: I,
    y: k
  } = A;
  return !O || !O.length ? null : /* @__PURE__ */ h.createElement(gT, Er({}, m, {
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
    stroke: v,
    width: T,
    left: I,
    top: k,
    xAxisId: p,
    yAxisId: g
  }));
}
var wT = (e, t, r, n, i) => {
  var a = r ?? t;
  if (R(a))
    return a;
  var o = e === "horizontal" ? i : n, l = o.scale.domain();
  if (o.type === "number") {
    var u = Math.max(l[0], l[1]), s = Math.min(l[0], l[1]);
    return a === "dataMin" ? s : a === "dataMax" || u < 0 ? u : Math.max(Math.min(l[0], l[1]), 0);
  }
  return a === "dataMin" ? l[0] : a === "dataMax" ? l[1] : l[0];
};
function xT(e) {
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
    bandSize: v
  } = e, p = i && i.length, g = wT(a, o, r, l, u), m = a === "horizontal", y = !1, w = s.map((x, O) => {
    var P, _, A, C;
    if (p)
      C = i[c + O];
    else {
      var T = je(x, n);
      Array.isArray(T) ? (C = T, y = !0) : C = [g, T];
    }
    var I = (P = (_ = C) === null || _ === void 0 ? void 0 : _[1]) !== null && P !== void 0 ? P : null, k = I == null || p && !t && je(x, n) == null;
    if (m) {
      var B;
      return {
        x: cc({
          axis: l,
          ticks: f,
          bandSize: v,
          entry: x,
          index: O
        }),
        y: k ? null : (B = u.scale.map(I)) !== null && B !== void 0 ? B : null,
        value: C,
        payload: x
      };
    }
    return {
      x: k ? null : (A = l.scale.map(I)) !== null && A !== void 0 ? A : null,
      y: cc({
        axis: u,
        ticks: d,
        bandSize: v,
        entry: x,
        index: O
      }),
      value: C,
      payload: x
    };
  }), b;
  return p || y ? b = w.map((x) => {
    var O, P = Array.isArray(x.value) ? x.value[0] : null;
    if (m) {
      var _;
      return {
        x: x.x,
        y: P != null && x.y != null && (_ = u.scale.map(P)) !== null && _ !== void 0 ? _ : null,
        payload: x.payload
      };
    }
    return {
      x: P != null && (O = l.scale.map(P)) !== null && O !== void 0 ? O : null,
      y: x.y,
      payload: x.payload
    };
  }) : b = m ? u.scale.map(g) : l.scale.map(g), {
    points: w,
    baseLine: b ?? 0,
    isRange: y
  };
}
function PT(e) {
  var t = Ke(e, yT), r = He();
  return /* @__PURE__ */ h.createElement(fI, {
    id: t.id,
    type: "area"
  }, (n) => /* @__PURE__ */ h.createElement(h.Fragment, null, /* @__PURE__ */ h.createElement(oI, {
    legendPayload: uT(t)
  }), /* @__PURE__ */ h.createElement(sT, {
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
  }), /* @__PURE__ */ h.createElement(yI, {
    type: "area",
    id: n,
    data: t.data,
    dataKey: t.dataKey,
    xAxisId: t.xAxisId,
    yAxisId: t.yAxisId,
    zAxisId: 0,
    stackId: Cx(t.stackId),
    hide: t.hide,
    barSize: void 0,
    baseValue: t.baseValue,
    isPanorama: r,
    connectNulls: t.connectNulls
  }), /* @__PURE__ */ h.createElement(bT, Er({}, t, {
    id: n
  }))));
}
var ly = /* @__PURE__ */ h.memo(PT, ri);
ly.displayName = "Area";
var OT = ["domain", "range"], AT = ["domain", "range"];
function Qd(e, t) {
  if (e == null) return {};
  var r, n, i = ST(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function ST(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Jd(e, t) {
  return e === t ? !0 : Array.isArray(e) && e.length === 2 && Array.isArray(t) && t.length === 2 ? e[0] === t[0] && e[1] === t[1] : !1;
}
function uy(e, t) {
  if (e === t)
    return !0;
  var {
    domain: r,
    range: n
  } = e, i = Qd(e, OT), {
    domain: a,
    range: o
  } = t, l = Qd(t, AT);
  return !Jd(r, a) || !Jd(n, o) ? !1 : ri(i, l);
}
var _T = ["type"], kT = ["dangerouslySetInnerHTML", "ticks", "scale"], ET = ["id", "scale"];
function Ul() {
  return Ul = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ul.apply(null, arguments);
}
function ev(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function tv(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ev(Object(r), !0).forEach(function(n) {
      CT(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ev(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function CT(e, t, r) {
  return (t = jT(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function jT(e) {
  var t = IT(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function IT(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Kl(e, t) {
  if (e == null) return {};
  var r, n, i = MT(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function MT(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function TT(e) {
  var t = ce(), r = h.useRef(null), n = yu(), {
    type: i
  } = e, a = Kl(e, _T), o = io(n, "xAxis", i), l = h.useMemo(() => {
    if (o != null)
      return tv(tv({}, a), {}, {
        type: o
      });
  }, [a, o]);
  return h.useLayoutEffect(() => {
    l != null && (r.current === null ? t(MI(l)) : r.current !== l && t(TI({
      prev: r.current,
      next: l
    })), r.current = l);
  }, [l, t]), h.useLayoutEffect(() => () => {
    r.current && (t(DI(r.current)), r.current = null);
  }, [t]), null;
}
var DT = (e) => {
  var {
    xAxisId: t,
    className: r
  } = e, n = z(Uh), i = He(), a = "xAxis", o = z((y) => Vm(y, a, t, i)), l = z((y) => mk(y, t)), u = z((y) => Pk(y, t)), s = z((y) => pm(y, t));
  if (l == null || u == null || s == null)
    return null;
  var {
    dangerouslySetInnerHTML: c,
    ticks: f,
    scale: d
  } = e, v = Kl(e, kT), {
    id: p,
    scale: g
  } = s, m = Kl(s, ET);
  return /* @__PURE__ */ h.createElement(_s, Ul({}, v, m, {
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
}, NT = {
  allowDataOverflow: he.allowDataOverflow,
  allowDecimals: he.allowDecimals,
  allowDuplicatedCategory: he.allowDuplicatedCategory,
  angle: he.angle,
  axisLine: zt.axisLine,
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
  tickLine: zt.tickLine,
  tickSize: zt.tickSize,
  type: he.type,
  niceTicks: he.niceTicks,
  xAxisId: 0
}, $T = (e) => {
  var t = Ke(e, NT);
  return /* @__PURE__ */ h.createElement(h.Fragment, null, /* @__PURE__ */ h.createElement(TT, {
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
  }), /* @__PURE__ */ h.createElement(DT, t));
}, sy = /* @__PURE__ */ h.memo($T, uy);
sy.displayName = "XAxis";
var LT = ["type"], RT = ["dangerouslySetInnerHTML", "ticks", "scale"], zT = ["id", "scale"];
function Hl() {
  return Hl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Hl.apply(null, arguments);
}
function rv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function nv(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? rv(Object(r), !0).forEach(function(n) {
      BT(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : rv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function BT(e, t, r) {
  return (t = FT(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function FT(e) {
  var t = WT(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function WT(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Gl(e, t) {
  if (e == null) return {};
  var r, n, i = UT(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function UT(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function KT(e) {
  var t = ce(), r = h.useRef(null), n = yu(), {
    type: i
  } = e, a = Gl(e, LT), o = io(n, "yAxis", i), l = h.useMemo(() => {
    if (o != null)
      return nv(nv({}, a), {}, {
        type: o
      });
  }, [o, a]);
  return h.useLayoutEffect(() => {
    l != null && (r.current === null ? t(NI(l)) : r.current !== l && t($I({
      prev: r.current,
      next: l
    })), r.current = l);
  }, [l, t]), h.useLayoutEffect(() => () => {
    r.current && (t(LI(r.current)), r.current = null);
  }, [t]), null;
}
function HT(e) {
  var {
    yAxisId: t,
    className: r,
    width: n,
    label: i
  } = e, a = h.useRef(null), o = h.useRef(null), l = z(Uh), u = He(), s = ce(), c = "yAxis", f = z((P) => Sk(P, t)), d = z((P) => Ak(P, t)), v = z((P) => Vm(P, c, t, u)), p = z((P) => mm(P, t));
  if (h.useLayoutEffect(() => {
    if (!(n !== "auto" || !f || Os(i) || /* @__PURE__ */ h.isValidElement(i) || p == null)) {
      var P = a.current;
      if (P) {
        var _ = P.getCalculatedWidth();
        Math.round(f.width) !== Math.round(_) && s(RI({
          id: t,
          width: _
        }));
      }
    }
  }, [
    // The dependency on cartesianAxisRef.current is not needed because useLayoutEffect will run after every render.
    // The ref will be populated by then.
    // To re-run this effect when ticks change, we can depend on the ticks array from the store.
    v,
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
  } = e, w = Gl(e, RT), {
    id: b,
    scale: x
  } = p, O = Gl(p, zT);
  return /* @__PURE__ */ h.createElement(_s, Hl({}, w, O, {
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
    ticks: v,
    axisType: c,
    axisId: t
  }));
}
var GT = {
  allowDataOverflow: pe.allowDataOverflow,
  allowDecimals: pe.allowDecimals,
  allowDuplicatedCategory: pe.allowDuplicatedCategory,
  angle: pe.angle,
  axisLine: zt.axisLine,
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
  tickLine: zt.tickLine,
  tickSize: zt.tickSize,
  type: pe.type,
  niceTicks: pe.niceTicks,
  width: pe.width,
  yAxisId: 0
}, qT = (e) => {
  var t = Ke(e, GT);
  return /* @__PURE__ */ h.createElement(h.Fragment, null, /* @__PURE__ */ h.createElement(KT, {
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
  }), /* @__PURE__ */ h.createElement(HT, t));
}, cy = /* @__PURE__ */ h.memo(qT, uy);
cy.displayName = "YAxis";
var YT = (e, t) => t, Cs = S([YT, le, Mp, Oe, vg, Zt, qE, Me], eC);
function VT(e) {
  return "getBBox" in e.currentTarget && typeof e.currentTarget.getBBox == "function";
}
function js(e) {
  var t = e.currentTarget.getBoundingClientRect(), r, n;
  if (VT(e)) {
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
var fy = Qe("mouseClick"), dy = Qn();
dy.startListening({
  actionCreator: fy,
  effect: (e, t) => {
    var r = e.payload, n = Cs(t.getState(), js(r));
    n?.activeIndex != null && t.dispatch(Bk({
      activeIndex: n.activeIndex,
      activeDataKey: void 0,
      activeCoordinate: n.activeCoordinate
    }));
  }
});
var ql = Qe("mouseMove"), vy = Qn(), Gr = null, vr = null, qo = null;
vy.startListening({
  actionCreator: ql,
  effect: (e, t) => {
    var r = e.payload, n = t.getState(), {
      throttleDelay: i,
      throttledEvents: a
    } = n.eventSettings, o = a === "all" || a?.includes("mousemove");
    Gr !== null && (cancelAnimationFrame(Gr), Gr = null), vr !== null && (typeof i != "number" || !o) && (clearTimeout(vr), vr = null), qo = js(r);
    var l = () => {
      var u = t.getState(), s = ds(u, u.tooltip.settings.shared);
      if (!qo) {
        Gr = null, vr = null;
        return;
      }
      if (s === "axis") {
        var c = Cs(u, qo);
        c?.activeIndex != null ? t.dispatch(ig({
          activeIndex: c.activeIndex,
          activeDataKey: void 0,
          activeCoordinate: c.activeCoordinate
        })) : t.dispatch(ng());
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
function XT(e, t) {
  return t instanceof HTMLElement ? "HTMLElement <".concat(t.tagName, ' class="').concat(t.className, '">') : t === window ? "global.window" : e === "children" && typeof t == "object" && t !== null ? "<<CHILDREN>>" : t;
}
var iv = {
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
}, hy = $e({
  name: "rootProps",
  initialState: iv,
  reducers: {
    updateOptions: (e, t) => {
      var r;
      e.accessibilityLayer = t.payload.accessibilityLayer, e.barCategoryGap = t.payload.barCategoryGap, e.barGap = (r = t.payload.barGap) !== null && r !== void 0 ? r : iv.barGap, e.barSize = t.payload.barSize, e.maxBarSize = t.payload.maxBarSize, e.stackOffset = t.payload.stackOffset, e.syncId = t.payload.syncId, e.syncMethod = t.payload.syncMethod, e.className = t.payload.className, e.baseValue = t.payload.baseValue, e.reverseStackOrder = t.payload.reverseStackOrder;
    }
  }
}), ZT = hy.reducer, {
  updateOptions: QT
} = hy.actions, JT = null, eD = {
  updatePolarOptions: (e, t) => e === null ? t.payload : (e.startAngle = t.payload.startAngle, e.endAngle = t.payload.endAngle, e.cx = t.payload.cx, e.cy = t.payload.cy, e.innerRadius = t.payload.innerRadius, e.outerRadius = t.payload.outerRadius, e)
}, py = $e({
  name: "polarOptions",
  initialState: JT,
  reducers: eD
}), {
  updatePolarOptions: m2
} = py.actions, tD = py.reducer, my = Qe("keyDown"), gy = Qe("focus"), yy = Qe("blur"), bo = Qn(), qr = null, hr = null, Ci = null;
bo.startListening({
  actionCreator: my,
  effect: (e, t) => {
    Ci = e.payload, qr !== null && (cancelAnimationFrame(qr), qr = null);
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
        } = l.tooltip, c = Ci;
        if (c !== "ArrowRight" && c !== "ArrowLeft" && c !== "Enter")
          return;
        var f = vs(s, gn(l), fi(l), vi(l)), d = f == null ? -1 : Number(f);
        if (!Number.isFinite(d) || d < 0)
          return;
        var v = Zt(l);
        if (c === "Enter") {
          var p = _a(l, "axis", "hover", String(s.index));
          t.dispatch(Sa({
            active: !s.active,
            activeIndex: s.index,
            activeCoordinate: p
          }));
          return;
        }
        var g = jk(l), m = g === "left-to-right" ? 1 : -1, y = c === "ArrowRight" ? 1 : -1, w = d + y * m;
        if (v == null || w >= v.length || w < 0)
          return;
        var b = _a(l, "axis", "hover", String(w));
        t.dispatch(Sa({
          active: !0,
          activeIndex: w.toString(),
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
    n === "raf" ? qr = requestAnimationFrame(o) : typeof n == "number" && hr === null && (o(), Ci = null, hr = setTimeout(() => {
      Ci ? o() : (hr = null, qr = null);
    }, n));
  }
});
bo.startListening({
  actionCreator: gy,
  effect: (e, t) => {
    var r = t.getState(), n = r.rootProps.accessibilityLayer !== !1;
    if (n) {
      var {
        keyboardInteraction: i
      } = r.tooltip;
      if (!i.active && i.index == null) {
        var a = "0", o = _a(r, "axis", "hover", String(a));
        t.dispatch(Sa({
          active: !0,
          activeIndex: a,
          activeCoordinate: o
        }));
      }
    }
  }
});
bo.startListening({
  actionCreator: yy,
  effect: (e, t) => {
    var r = t.getState(), n = r.rootProps.accessibilityLayer !== !1;
    if (n) {
      var {
        keyboardInteraction: i
      } = r.tooltip;
      i.active && t.dispatch(Sa({
        active: !1,
        activeIndex: i.index,
        activeCoordinate: i.coordinate
      }));
    }
  }
});
function by(e) {
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
var rt = Qe("externalEvent"), wy = Qn(), ji = /* @__PURE__ */ new Map(), _n = /* @__PURE__ */ new Map(), Yo = /* @__PURE__ */ new Map();
wy.startListening({
  actionCreator: rt,
  effect: (e, t) => {
    var {
      handler: r,
      reactEvent: n
    } = e.payload;
    if (r != null) {
      var i = n.type, a = by(n);
      Yo.set(i, {
        handler: r,
        reactEvent: a
      });
      var o = ji.get(i);
      o !== void 0 && (cancelAnimationFrame(o), ji.delete(i));
      var l = t.getState(), {
        throttleDelay: u,
        throttledEvents: s
      } = l.eventSettings, c = s, f = c === "all" || c?.includes(i), d = _n.get(i);
      d !== void 0 && (typeof u != "number" || !f) && (clearTimeout(d), _n.delete(i));
      var v = () => {
        var m = Yo.get(i);
        try {
          if (!m)
            return;
          var {
            handler: y,
            reactEvent: w
          } = m, b = t.getState(), x = {
            activeCoordinate: ME(b),
            activeDataKey: CE(b),
            activeIndex: qn(b),
            activeLabel: mg(b),
            activeTooltipIndex: qn(b),
            isTooltipActive: TE(b)
          };
          y && y(x, w);
        } finally {
          ji.delete(i), _n.delete(i), Yo.delete(i);
        }
      };
      if (!f) {
        v();
        return;
      }
      if (u === "raf") {
        var p = requestAnimationFrame(v);
        ji.set(i, p);
      } else if (typeof u == "number") {
        if (!_n.has(i)) {
          v();
          var g = setTimeout(v, u);
          _n.set(i, g);
        }
      } else
        v();
    }
  }
});
var rD = S([pn], (e) => e.tooltipItemPayloads), nD = S([rD, (e, t) => t, (e, t, r) => r], (e, t, r) => {
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
}), xy = Qe("touchMove"), Py = Qn(), pr = null, Jt = null, av = null, kn = null;
Py.startListening({
  actionCreator: xy,
  effect: (e, t) => {
    var r = e.payload;
    if (!(r.touches == null || r.touches.length === 0)) {
      kn = by(r);
      var n = t.getState(), {
        throttleDelay: i,
        throttledEvents: a
      } = n.eventSettings, o = a === "all" || a.includes("touchmove");
      pr !== null && (cancelAnimationFrame(pr), pr = null), Jt !== null && (typeof i != "number" || !o) && (clearTimeout(Jt), Jt = null), av = Array.from(r.touches).map((u) => js({
        clientX: u.clientX,
        clientY: u.clientY,
        currentTarget: r.currentTarget
      }));
      var l = () => {
        if (kn != null) {
          var u = t.getState(), s = ds(u, u.tooltip.settings.shared);
          if (s === "axis") {
            var c, f = (c = av) === null || c === void 0 ? void 0 : c[0];
            if (f == null) {
              pr = null, Jt = null;
              return;
            }
            var d = Cs(u, f);
            d?.activeIndex != null && t.dispatch(ig({
              activeIndex: d.activeIndex,
              activeDataKey: void 0,
              activeCoordinate: d.activeCoordinate
            }));
          } else if (s === "item") {
            var v, p = kn.touches[0];
            if (document.elementFromPoint == null || p == null)
              return;
            var g = document.elementFromPoint(p.clientX, p.clientY);
            if (!g || !g.getAttribute)
              return;
            var m = g.getAttribute($x), y = (v = g.getAttribute(Lx)) !== null && v !== void 0 ? v : void 0, w = mn(u).find((O) => O.id === y);
            if (m == null || w == null || y == null)
              return;
            var {
              dataKey: b
            } = w, x = nD(u, m, y);
            t.dispatch(zk({
              activeDataKey: b,
              activeIndex: m,
              activeCoordinate: x,
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
      i === "raf" ? pr = requestAnimationFrame(l) : typeof i == "number" && Jt === null && (l(), kn = null, Jt = setTimeout(() => {
        kn ? l() : (Jt = null, pr = null);
      }, i));
    }
  }
});
var Oy = {
  throttleDelay: "raf",
  throttledEvents: ["mousemove", "touchmove", "pointermove", "scroll", "wheel"]
}, Ay = $e({
  name: "eventSettings",
  initialState: Oy,
  reducers: {
    setEventSettings: (e, t) => {
      t.payload.throttleDelay != null && (e.throttleDelay = t.payload.throttleDelay), t.payload.throttledEvents != null && (e.throttledEvents = t.payload.throttledEvents);
    }
  }
}), {
  setEventSettings: iD
} = Ay.actions, aD = Ay.reducer, oD = ch({
  brush: YI,
  cartesianAxis: zI,
  chartData: MC,
  errorBars: qM,
  eventSettings: aD,
  graphicalItems: mI,
  layout: wx,
  legend: E1,
  options: kC,
  polarAxis: nI,
  polarOptions: tD,
  referenceElements: QI,
  renderedTicks: pM,
  rootProps: ZT,
  tooltip: Fk,
  zIndex: hC
}), lD = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Chart";
  return Hw({
    reducer: oD,
    // redux-toolkit v1 types are unhappy with the preloadedState type. Remove the `as any` when bumping to v2
    preloadedState: t,
    // @ts-expect-error redux-toolkit v1 types are unhappy with the middleware array. Remove this comment when bumping to v2
    middleware: (n) => {
      var i;
      return n({
        serializableCheck: !1,
        immutableCheck: !["commonjs", "es6", "production"].includes((i = "es6") !== null && i !== void 0 ? i : "")
      }).concat([dy.middleware, vy.middleware, bo.middleware, wy.middleware, Py.middleware]);
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
      return typeof n == "function" && (i = n()), i.concat(Sh({
        type: "raf"
      }));
    },
    devTools: {
      serialize: {
        replacer: XT
      },
      name: "recharts-".concat(r)
    }
  });
};
function uD(e) {
  var {
    preloadedState: t,
    children: r,
    reduxStoreName: n
  } = e, i = He(), a = h.useRef(null);
  if (i)
    return r;
  a.current == null && (a.current = lD(t, n));
  var o = lu;
  return /* @__PURE__ */ h.createElement(G1, {
    context: o,
    store: a.current
  }, r);
}
function sD(e) {
  var {
    layout: t,
    margin: r
  } = e, n = ce(), i = He();
  return h.useEffect(() => {
    i || (n(gx(t)), n(mx(r)));
  }, [n, i, t, r]), null;
}
var cD = /* @__PURE__ */ h.memo(sD, ri);
function fD(e) {
  var t = ce();
  return h.useEffect(() => {
    t(QT(e));
  }, [t, e]), null;
}
var dD = (e) => {
  var t = ce();
  return h.useEffect(() => {
    t(iD(e));
  }, [t, e]), null;
}, vD = /* @__PURE__ */ h.memo(dD, ri);
function ov(e) {
  var {
    zIndex: t,
    isPanorama: r
  } = e, n = h.useRef(null), i = ce();
  return h.useLayoutEffect(() => (n.current && i(dC({
    zIndex: t,
    element: n.current,
    isPanorama: r
  })), () => {
    i(vC({
      zIndex: t,
      isPanorama: r
    }));
  }), [i, t, r]), /* @__PURE__ */ h.createElement("g", {
    tabIndex: -1,
    ref: n,
    className: "recharts-zIndex-layer_".concat(t)
  });
}
function lv(e) {
  var {
    children: t,
    isPanorama: r
  } = e, n = z(rC);
  if (!n || n.length === 0)
    return t;
  var i = n.filter((o) => o < 0), a = n.filter((o) => o > 0);
  return /* @__PURE__ */ h.createElement(h.Fragment, null, i.map((o) => /* @__PURE__ */ h.createElement(ov, {
    key: o,
    zIndex: o,
    isPanorama: r
  })), t, a.map((o) => /* @__PURE__ */ h.createElement(ov, {
    key: o,
    zIndex: o,
    isPanorama: r
  })));
}
var hD = ["children"];
function pD(e, t) {
  if (e == null) return {};
  var r, n, i = mD(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function mD(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Ia() {
  return Ia = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ia.apply(null, arguments);
}
var gD = {
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
}, yD = /* @__PURE__ */ h.forwardRef((e, t) => {
  var r = mu(), n = gu(), i = ip();
  if (!Ct(r) || !Ct(n))
    return null;
  var {
    children: a,
    otherAttributes: o,
    title: l,
    desc: u
  } = e, s, c;
  return o != null && (typeof o.tabIndex == "number" ? s = o.tabIndex : s = i ? 0 : void 0, typeof o.role == "string" ? c = o.role : c = i ? "application" : void 0), /* @__PURE__ */ h.createElement(Jl, Ia({}, o, {
    title: l,
    desc: u,
    role: c,
    tabIndex: s,
    width: r,
    height: n,
    style: gD,
    ref: t
  }), a);
}), bD = (e) => {
  var {
    children: t
  } = e, r = z(Za);
  if (!r)
    return null;
  var {
    width: n,
    height: i,
    y: a,
    x: o
  } = r;
  return /* @__PURE__ */ h.createElement(Jl, {
    width: n,
    height: i,
    x: o,
    y: a
  }, t);
}, uv = /* @__PURE__ */ h.forwardRef((e, t) => {
  var {
    children: r
  } = e, n = pD(e, hD), i = He();
  return i ? /* @__PURE__ */ h.createElement(bD, null, /* @__PURE__ */ h.createElement(lv, {
    isPanorama: !0
  }, r)) : /* @__PURE__ */ h.createElement(yD, Ia({
    ref: t
  }, n), /* @__PURE__ */ h.createElement(lv, {
    isPanorama: !1
  }, r));
});
function wD() {
  var e = ce(), [t, r] = h.useState(null), n = z(Nx);
  return h.useEffect(() => {
    if (t != null) {
      var i = t.getBoundingClientRect(), a = i.width / t.offsetWidth;
      G(a) && a !== n && e(bx(a));
    }
  }, [t, e, n]), r;
}
function sv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function xD(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? sv(Object(r), !0).forEach(function(n) {
      PD(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : sv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function PD(e, t, r) {
  return (t = OD(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function OD(e) {
  var t = AD(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function AD(e, t) {
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
var SD = () => (FC(), null);
function Ma(e) {
  if (typeof e == "number")
    return e;
  if (typeof e == "string") {
    var t = parseFloat(e);
    if (!Number.isNaN(t))
      return t;
  }
  return 0;
}
var _D = /* @__PURE__ */ h.forwardRef((e, t) => {
  var r, n, i = h.useRef(null), [a, o] = h.useState({
    containerWidth: Ma((r = e.style) === null || r === void 0 ? void 0 : r.width),
    containerHeight: Ma((n = e.style) === null || n === void 0 ? void 0 : n.height)
  }), l = h.useCallback((s, c) => {
    o((f) => {
      var d = Math.round(s), v = Math.round(c);
      return f.containerWidth === d && f.containerHeight === v ? f : {
        containerWidth: d,
        containerHeight: v
      };
    });
  }, []), u = h.useCallback((s) => {
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
      }, v = new ResizeObserver(d);
      v.observe(s), i.current = v;
    }
  }, [t, l]);
  return h.useEffect(() => () => {
    var s = i.current;
    s?.disconnect();
  }, [l]), /* @__PURE__ */ h.createElement(h.Fragment, null, /* @__PURE__ */ h.createElement(ei, {
    width: a.containerWidth,
    height: a.containerHeight
  }), /* @__PURE__ */ h.createElement("div", or({
    ref: u
  }, e)));
}), kD = /* @__PURE__ */ h.forwardRef((e, t) => {
  var {
    width: r,
    height: n
  } = e, [i, a] = h.useState({
    containerWidth: Ma(r),
    containerHeight: Ma(n)
  }), o = h.useCallback((u, s) => {
    a((c) => {
      var f = Math.round(u), d = Math.round(s);
      return c.containerWidth === f && c.containerHeight === d ? c : {
        containerWidth: f,
        containerHeight: d
      };
    });
  }, []), l = h.useCallback((u) => {
    if (typeof t == "function" && t(u), u != null) {
      var {
        width: s,
        height: c
      } = u.getBoundingClientRect();
      o(s, c);
    }
  }, [t, o]);
  return /* @__PURE__ */ h.createElement(h.Fragment, null, /* @__PURE__ */ h.createElement(ei, {
    width: i.containerWidth,
    height: i.containerHeight
  }), /* @__PURE__ */ h.createElement("div", or({
    ref: l
  }, e)));
}), ED = /* @__PURE__ */ h.forwardRef((e, t) => {
  var {
    width: r,
    height: n
  } = e;
  return /* @__PURE__ */ h.createElement(h.Fragment, null, /* @__PURE__ */ h.createElement(ei, {
    width: r,
    height: n
  }), /* @__PURE__ */ h.createElement("div", or({
    ref: t
  }, e)));
}), CD = /* @__PURE__ */ h.forwardRef((e, t) => {
  var {
    width: r,
    height: n
  } = e;
  return typeof r == "string" || typeof n == "string" ? /* @__PURE__ */ h.createElement(kD, or({}, e, {
    ref: t
  })) : typeof r == "number" && typeof n == "number" ? /* @__PURE__ */ h.createElement(ED, or({}, e, {
    width: r,
    height: n,
    ref: t
  })) : /* @__PURE__ */ h.createElement(h.Fragment, null, /* @__PURE__ */ h.createElement(ei, {
    width: r,
    height: n
  }), /* @__PURE__ */ h.createElement("div", or({
    ref: t
  }, e)));
});
function jD(e) {
  return e ? _D : CD;
}
var ID = /* @__PURE__ */ h.forwardRef((e, t) => {
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
    onTouchEnd: v,
    onTouchMove: p,
    onTouchStart: g,
    style: m,
    width: y,
    responsive: w,
    dispatchTouchEvents: b = !0
  } = e, x = h.useRef(null), O = ce(), [P, _] = h.useState(null), [A, C] = h.useState(null), T = wD(), I = hu(), k = I?.width > 0 ? I.width : y, B = I?.height > 0 ? I.height : i, F = h.useCallback((D) => {
    T(D), typeof t == "function" && t(D), _(D), C(D), D != null && (x.current = D);
  }, [T, t, _, C]), W = h.useCallback((D) => {
    O(fy(D)), O(rt({
      handler: a,
      reactEvent: D
    }));
  }, [O, a]), q = h.useCallback((D) => {
    O(ql(D)), O(rt({
      handler: s,
      reactEvent: D
    }));
  }, [O, s]), V = h.useCallback((D) => {
    O(ng()), O(rt({
      handler: c,
      reactEvent: D
    }));
  }, [O, c]), re = h.useCallback((D) => {
    O(ql(D)), O(rt({
      handler: f,
      reactEvent: D
    }));
  }, [O, f]), Q = h.useCallback(() => {
    O(gy());
  }, [O]), M = h.useCallback(() => {
    O(yy());
  }, [O]), Le = h.useCallback((D) => {
    O(my(D.key));
  }, [O]), ue = h.useCallback((D) => {
    O(rt({
      handler: o,
      reactEvent: D
    }));
  }, [O, o]), Fe = h.useCallback((D) => {
    O(rt({
      handler: l,
      reactEvent: D
    }));
  }, [O, l]), be = h.useCallback((D) => {
    O(rt({
      handler: u,
      reactEvent: D
    }));
  }, [O, u]), ne = h.useCallback((D) => {
    O(rt({
      handler: d,
      reactEvent: D
    }));
  }, [O, d]), fe = h.useCallback((D) => {
    O(rt({
      handler: g,
      reactEvent: D
    }));
  }, [O, g]), mt = h.useCallback((D) => {
    b && O(xy(D)), O(rt({
      handler: p,
      reactEvent: D
    }));
  }, [O, b, p]), Se = h.useCallback((D) => {
    O(rt({
      handler: v,
      reactEvent: D
    }));
  }, [O, v]), j = jD(w);
  return /* @__PURE__ */ h.createElement(Ag.Provider, {
    value: P
  }, /* @__PURE__ */ h.createElement(xv.Provider, {
    value: A
  }, /* @__PURE__ */ h.createElement(j, {
    width: k ?? m?.width,
    height: B ?? m?.height,
    className: J("recharts-wrapper", n),
    style: xD({
      position: "relative",
      cursor: "default",
      width: k,
      height: B
    }, m),
    onClick: W,
    onContextMenu: ue,
    onDoubleClick: Fe,
    onFocus: Q,
    onBlur: M,
    onKeyDown: Le,
    onMouseDown: be,
    onMouseEnter: q,
    onMouseLeave: V,
    onMouseMove: re,
    onMouseUp: ne,
    onTouchEnd: Se,
    onTouchMove: mt,
    onTouchStart: fe,
    ref: F
  }, /* @__PURE__ */ h.createElement(SD, null), r)));
}), MD = ["width", "height", "responsive", "children", "className", "style", "compact", "title", "desc"];
function TD(e, t) {
  if (e == null) return {};
  var r, n, i = DD(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function DD(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var ND = /* @__PURE__ */ h.forwardRef((e, t) => {
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
  } = e, f = TD(e, MD), d = ht(f);
  return u ? /* @__PURE__ */ h.createElement(h.Fragment, null, /* @__PURE__ */ h.createElement(ei, {
    width: r,
    height: n
  }), /* @__PURE__ */ h.createElement(uv, {
    otherAttributes: d,
    title: s,
    desc: c
  }, a)) : /* @__PURE__ */ h.createElement(ID, {
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
  }, /* @__PURE__ */ h.createElement(uv, {
    otherAttributes: d,
    title: s,
    desc: c,
    ref: t
  }, /* @__PURE__ */ h.createElement(eM, null, a)));
});
function Yl() {
  return Yl = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Yl.apply(null, arguments);
}
function cv(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function $D(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? cv(Object(r), !0).forEach(function(n) {
      LD(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : cv(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function LD(e, t, r) {
  return (t = RD(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function RD(e) {
  var t = zD(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function zD(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var BD = {
  top: 5,
  right: 5,
  bottom: 5,
  left: 5
}, FD = $D({
  accessibilityLayer: !0,
  barCategoryGap: "10%",
  barGap: 4,
  layout: "horizontal",
  margin: BD,
  responsive: !1,
  reverseStackOrder: !1,
  stackOffset: "none",
  syncMethod: "index"
}, Oy), WD = /* @__PURE__ */ h.forwardRef(function(t, r) {
  var n, i = Ke(t.categoricalChartProps, FD), {
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
  return /* @__PURE__ */ h.createElement(uD, {
    preloadedState: {
      options: c
    },
    reduxStoreName: (n = s.id) !== null && n !== void 0 ? n : a
  }, /* @__PURE__ */ h.createElement(qI, {
    chartData: s.data
  }), /* @__PURE__ */ h.createElement(cD, {
    layout: i.layout,
    margin: i.margin
  }), /* @__PURE__ */ h.createElement(vD, {
    throttleDelay: i.throttleDelay,
    throttledEvents: i.throttledEvents
  }), /* @__PURE__ */ h.createElement(fD, {
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
  }), /* @__PURE__ */ h.createElement(ND, Yl({}, i, {
    ref: r
  })));
}), UD = ["axis"], KD = /* @__PURE__ */ h.forwardRef((e, t) => /* @__PURE__ */ h.createElement(WD, {
  chartName: "AreaChart",
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: UD,
  tooltipPayloadSearcher: SC,
  categoricalChartProps: e,
  ref: t
}));
const HD = (e, t) => {
  const r = new Array(e.length + t.length);
  for (let n = 0; n < e.length; n++)
    r[n] = e[n];
  for (let n = 0; n < t.length; n++)
    r[e.length + n] = t[n];
  return r;
}, GD = (e, t) => ({
  classGroupId: e,
  validator: t
}), Sy = (e = /* @__PURE__ */ new Map(), t = null, r) => ({
  nextPart: e,
  validators: t,
  classGroupId: r
}), Ta = "-", fv = [], qD = "arbitrary..", YD = (e) => {
  const t = XD(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: n
  } = e;
  return {
    getClassGroupId: (o) => {
      if (o.startsWith("[") && o.endsWith("]"))
        return VD(o);
      const l = o.split(Ta), u = l[0] === "" && l.length > 1 ? 1 : 0;
      return _y(l, u, t);
    },
    getConflictingClassGroupIds: (o, l) => {
      if (l) {
        const u = n[o], s = r[o];
        return u ? s ? HD(s, u) : u : s || fv;
      }
      return r[o] || fv;
    }
  };
}, _y = (e, t, r) => {
  if (e.length - t === 0)
    return r.classGroupId;
  const i = e[t], a = r.nextPart.get(i);
  if (a) {
    const s = _y(e, t + 1, a);
    if (s) return s;
  }
  const o = r.validators;
  if (o === null)
    return;
  const l = t === 0 ? e.join(Ta) : e.slice(t).join(Ta), u = o.length;
  for (let s = 0; s < u; s++) {
    const c = o[s];
    if (c.validator(l))
      return c.classGroupId;
  }
}, VD = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const t = e.slice(1, -1), r = t.indexOf(":"), n = t.slice(0, r);
  return n ? qD + n : void 0;
})(), XD = (e) => {
  const {
    theme: t,
    classGroups: r
  } = e;
  return ZD(r, t);
}, ZD = (e, t) => {
  const r = Sy();
  for (const n in e) {
    const i = e[n];
    Is(i, r, n, t);
  }
  return r;
}, Is = (e, t, r, n) => {
  const i = e.length;
  for (let a = 0; a < i; a++) {
    const o = e[a];
    QD(o, t, r, n);
  }
}, QD = (e, t, r, n) => {
  if (typeof e == "string") {
    JD(e, t, r);
    return;
  }
  if (typeof e == "function") {
    eN(e, t, r, n);
    return;
  }
  tN(e, t, r, n);
}, JD = (e, t, r) => {
  const n = e === "" ? t : ky(t, e);
  n.classGroupId = r;
}, eN = (e, t, r, n) => {
  if (rN(e)) {
    Is(e(n), t, r, n);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push(GD(r, e));
}, tN = (e, t, r, n) => {
  const i = Object.entries(e), a = i.length;
  for (let o = 0; o < a; o++) {
    const [l, u] = i[o];
    Is(u, ky(t, l), r, n);
  }
}, ky = (e, t) => {
  let r = e;
  const n = t.split(Ta), i = n.length;
  for (let a = 0; a < i; a++) {
    const o = n[a];
    let l = r.nextPart.get(o);
    l || (l = Sy(), r.nextPart.set(o, l)), r = l;
  }
  return r;
}, rN = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, nN = (e) => {
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
}, Vl = "!", dv = ":", iN = [], vv = (e, t, r, n, i) => ({
  modifiers: e,
  hasImportantModifier: t,
  baseClassName: r,
  maybePostfixModifierPosition: n,
  isExternal: i
}), aN = (e) => {
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
        if (m === dv) {
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
    let d = f, v = !1;
    f.endsWith(Vl) ? (d = f.slice(0, -1), v = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      f.startsWith(Vl) && (d = f.slice(1), v = !0)
    );
    const p = s && s > u ? s - u : void 0;
    return vv(a, v, d, p);
  };
  if (t) {
    const i = t + dv, a = n;
    n = (o) => o.startsWith(i) ? a(o.slice(i.length)) : vv(iN, !1, o, void 0, !0);
  }
  if (r) {
    const i = n;
    n = (a) => r({
      className: a,
      parseClassName: i
    });
  }
  return n;
}, oN = (e) => {
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
}, lN = (e) => ({
  cache: nN(e.cacheSize),
  parseClassName: aN(e),
  sortModifiers: oN(e),
  postfixLookupClassGroupIds: uN(e),
  ...YD(e)
}), uN = (e) => {
  const t = /* @__PURE__ */ Object.create(null), r = e.postfixLookupClassGroups;
  if (r)
    for (let n = 0; n < r.length; n++)
      t[r[n]] = !0;
  return t;
}, sN = /\s+/, cN = (e, t) => {
  const {
    parseClassName: r,
    getClassGroupId: n,
    getConflictingClassGroupIds: i,
    sortModifiers: a,
    postfixLookupClassGroupIds: o
  } = t, l = [], u = e.trim().split(sN);
  let s = "";
  for (let c = u.length - 1; c >= 0; c -= 1) {
    const f = u[c], {
      isExternal: d,
      modifiers: v,
      hasImportantModifier: p,
      baseClassName: g,
      maybePostfixModifierPosition: m
    } = r(f);
    if (d) {
      s = f + (s.length > 0 ? " " + s : s);
      continue;
    }
    let y = !!m, w;
    if (y) {
      const _ = g.substring(0, m);
      w = n(_);
      const A = w && o[w] ? n(g) : void 0;
      A && A !== w && (w = A, y = !1);
    } else
      w = n(g);
    if (!w) {
      if (!y) {
        s = f + (s.length > 0 ? " " + s : s);
        continue;
      }
      if (w = n(g), !w) {
        s = f + (s.length > 0 ? " " + s : s);
        continue;
      }
      y = !1;
    }
    const b = v.length === 0 ? "" : v.length === 1 ? v[0] : a(v).join(":"), x = p ? b + Vl : b, O = x + w;
    if (l.indexOf(O) > -1)
      continue;
    l.push(O);
    const P = i(w, y);
    for (let _ = 0; _ < P.length; ++_) {
      const A = P[_];
      l.push(x + A);
    }
    s = f + (s.length > 0 ? " " + s : s);
  }
  return s;
}, fN = (...e) => {
  let t = 0, r, n, i = "";
  for (; t < e.length; )
    (r = e[t++]) && (n = Ey(r)) && (i && (i += " "), i += n);
  return i;
}, Ey = (e) => {
  if (typeof e == "string")
    return e;
  let t, r = "";
  for (let n = 0; n < e.length; n++)
    e[n] && (t = Ey(e[n])) && (r && (r += " "), r += t);
  return r;
}, dN = (e, ...t) => {
  let r, n, i, a;
  const o = (u) => {
    const s = t.reduce((c, f) => f(c), e());
    return r = lN(s), n = r.cache.get, i = r.cache.set, a = l, l(u);
  }, l = (u) => {
    const s = n(u);
    if (s)
      return s;
    const c = cN(u, r);
    return i(u, c), c;
  };
  return a = o, (...u) => a(fN(...u));
}, vN = [], ve = (e) => {
  const t = (r) => r[e] || vN;
  return t.isThemeGetter = !0, t;
}, Cy = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, jy = /^\((?:(\w[\w-]*):)?(.+)\)$/i, hN = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, pN = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, mN = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, gN = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, yN = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, bN = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, er = (e) => hN.test(e), K = (e) => !!e && !Number.isNaN(Number(e)), wt = (e) => !!e && Number.isInteger(Number(e)), Vo = (e) => e.endsWith("%") && K(e.slice(0, -1)), Mt = (e) => pN.test(e), Iy = () => !0, wN = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  mN.test(e) && !gN.test(e)
), Ms = () => !1, xN = (e) => yN.test(e), PN = (e) => bN.test(e), ON = (e) => !N(e) && !$(e), AN = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), SN = (e) => cr(e, Dy, Ms), N = (e) => Cy.test(e), mr = (e) => cr(e, Ny, wN), hv = (e) => cr(e, TN, K), _N = (e) => cr(e, Ly, Iy), kN = (e) => cr(e, $y, Ms), pv = (e) => cr(e, My, Ms), EN = (e) => cr(e, Ty, PN), Ii = (e) => cr(e, Ry, xN), $ = (e) => jy.test(e), En = (e) => Br(e, Ny), CN = (e) => Br(e, $y), mv = (e) => Br(e, My), jN = (e) => Br(e, Dy), IN = (e) => Br(e, Ty), Mi = (e) => Br(e, Ry, !0), MN = (e) => Br(e, Ly, !0), cr = (e, t, r) => {
  const n = Cy.exec(e);
  return n ? n[1] ? t(n[1]) : r(n[2]) : !1;
}, Br = (e, t, r = !1) => {
  const n = jy.exec(e);
  return n ? n[1] ? t(n[1]) : r : !1;
}, My = (e) => e === "position" || e === "percentage", Ty = (e) => e === "image" || e === "url", Dy = (e) => e === "length" || e === "size" || e === "bg-size", Ny = (e) => e === "length", TN = (e) => e === "number", $y = (e) => e === "family-name", Ly = (e) => e === "number" || e === "weight", Ry = (e) => e === "shadow", DN = () => {
  const e = ve("color"), t = ve("font"), r = ve("text"), n = ve("font-weight"), i = ve("tracking"), a = ve("leading"), o = ve("breakpoint"), l = ve("container"), u = ve("spacing"), s = ve("radius"), c = ve("shadow"), f = ve("inset-shadow"), d = ve("text-shadow"), v = ve("drop-shadow"), p = ve("blur"), g = ve("perspective"), m = ve("aspect"), y = ve("ease"), w = ve("animate"), b = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], x = () => [
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
  ], O = () => [...x(), $, N], P = () => ["auto", "hidden", "clip", "visible", "scroll"], _ = () => ["auto", "contain", "none"], A = () => [$, N, u], C = () => [er, "full", "auto", ...A()], T = () => [wt, "none", "subgrid", $, N], I = () => ["auto", {
    span: ["full", wt, $, N]
  }, wt, $, N], k = () => [wt, "auto", $, N], B = () => ["auto", "min", "max", "fr", $, N], F = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], W = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], q = () => ["auto", ...A()], V = () => [er, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...A()], re = () => [er, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...A()], Q = () => [er, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...A()], M = () => [e, $, N], Le = () => [...x(), mv, pv, {
    position: [$, N]
  }], ue = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], Fe = () => ["auto", "cover", "contain", jN, SN, {
    size: [$, N]
  }], be = () => [Vo, En, mr], ne = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    s,
    $,
    N
  ], fe = () => ["", K, En, mr], mt = () => ["solid", "dashed", "dotted", "double"], Se = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], j = () => [K, Vo, mv, pv], D = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    p,
    $,
    N
  ], H = () => ["none", K, $, N], E = () => ["none", K, $, N], we = () => [K, $, N], Z = () => [er, "full", ...A()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Mt],
      breakpoint: [Mt],
      color: [Iy],
      container: [Mt],
      "drop-shadow": [Mt],
      ease: ["in", "out", "in-out"],
      font: [ON],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Mt],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Mt],
      shadow: [Mt],
      spacing: ["px", K],
      text: [Mt],
      "text-shadow": [Mt],
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
      "container-named": [AN],
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
        z: [wt, "auto", $, N]
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
        order: [wt, "first", "last", "none", $, N]
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
        "justify-items": [...W(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...W()]
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
        items: [...W(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...W(), {
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
        "place-items": [...W(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...W()]
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
        text: ["base", r, En, mr]
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
        font: [n, MN, _N]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Vo, N]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [CN, kN, t]
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
        "line-clamp": [K, "none", $, hv]
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
        decoration: [...mt(), "wavy"]
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
        tab: [wt, $, N]
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
        bg: ue()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: Fe()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, wt, $, N],
          radial: ["", $, N],
          conic: [wt, $, N]
        }, IN, EN]
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
        border: [...mt(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...mt(), "hidden", "none"]
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
        outline: [...mt(), "none", "hidden"]
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
        outline: ["", K, En, mr]
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
          Mi,
          Ii
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
        "inset-shadow": ["none", f, Mi, Ii]
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
        "text-shadow": ["none", d, Mi, Ii]
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
        "mask-radial-at": x()
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
        mask: ue()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: Fe()
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
          v,
          Mi,
          Ii
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
        animate: ["none", w, $, N]
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
        skew: we()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": we()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": we()
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
        zoom: [wt, $, N]
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
        stroke: [K, En, mr, hv]
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
}, NN = /* @__PURE__ */ dN(DN);
function Dt(...e) {
  return NN(J(e));
}
const $N = { light: "", dark: ".dark" }, LN = { width: 320, height: 200 }, zy = h.createContext(null);
function By() {
  const e = h.useContext(zy);
  if (!e)
    throw new Error("useChart must be used within a <ChartContainer />");
  return e;
}
function RN({
  id: e,
  className: t,
  children: r,
  config: n,
  initialDimension: i = LN,
  ...a
}) {
  const o = h.useId(), l = `chart-${e ?? o.replace(/:/g, "")}`;
  return /* @__PURE__ */ U.jsx(zy.Provider, { value: { config: n }, children: /* @__PURE__ */ U.jsxs(
    "div",
    {
      "data-slot": "chart",
      "data-chart": l,
      className: Dt(
        "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
        t
      ),
      ...a,
      children: [
        /* @__PURE__ */ U.jsx(zN, { id: l, config: n }),
        /* @__PURE__ */ U.jsx(
          u1,
          {
            initialDimension: i,
            children: r
          }
        )
      ]
    }
  ) });
}
const zN = ({ id: e, config: t }) => {
  const r = Object.entries(t).filter(
    ([, n]) => n.theme ?? n.color
  );
  return r.length ? /* @__PURE__ */ U.jsx(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries($N).map(
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
}, BN = VC;
function FN({
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
  const { config: v } = By(), p = h.useMemo(() => {
    if (i || !t?.length)
      return null;
    const [m] = t, y = `${d ?? m?.dataKey ?? m?.name ?? "value"}`, w = Xl(v, m, y), b = !d && typeof o == "string" ? v[o]?.label ?? o : w?.label;
    return l ? /* @__PURE__ */ U.jsx("div", { className: Dt("font-medium", u), children: l(b, t) }) : b ? /* @__PURE__ */ U.jsx("div", { className: Dt("font-medium", u), children: b }) : null;
  }, [
    o,
    l,
    t,
    i,
    u,
    v,
    d
  ]);
  if (!e || !t?.length)
    return null;
  const g = t.length === 1 && n !== "dot";
  return /* @__PURE__ */ U.jsxs(
    "div",
    {
      className: Dt(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs shadow-xl",
        r
      ),
      children: [
        g ? null : p,
        /* @__PURE__ */ U.jsx("div", { className: "grid gap-1.5", children: t.filter((m) => m.type !== "none").map((m, y) => {
          const w = `${f ?? m.name ?? m.dataKey ?? "value"}`, b = Xl(v, m, w), x = c ?? m.payload?.fill ?? m.color;
          return /* @__PURE__ */ U.jsx(
            "div",
            {
              className: Dt(
                "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                n === "dot" && "items-center"
              ),
              children: s && m?.value !== void 0 && m.name ? s(m.value, m.name, m, y, m.payload) : /* @__PURE__ */ U.jsxs(U.Fragment, { children: [
                b?.icon ? /* @__PURE__ */ U.jsx(b.icon, {}) : !a && /* @__PURE__ */ U.jsx(
                  "div",
                  {
                    className: Dt(
                      "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                      {
                        "h-2.5 w-2.5": n === "dot",
                        "w-1": n === "line",
                        "w-0 border-[1.5px] border-dashed bg-transparent": n === "dashed",
                        "my-0.5": g && n === "dashed"
                      }
                    ),
                    style: {
                      "--color-bg": x,
                      "--color-border": x
                    }
                  }
                ),
                /* @__PURE__ */ U.jsxs(
                  "div",
                  {
                    className: Dt(
                      "flex flex-1 justify-between leading-none",
                      g ? "items-end" : "items-center"
                    ),
                    children: [
                      /* @__PURE__ */ U.jsxs("div", { className: "grid gap-1.5", children: [
                        g ? p : null,
                        /* @__PURE__ */ U.jsx("span", { className: "text-muted-foreground", children: b?.label ?? m.name })
                      ] }),
                      m.value != null && /* @__PURE__ */ U.jsx("span", { className: "font-mono font-medium text-foreground tabular-nums", children: typeof m.value == "number" ? m.value.toLocaleString() : String(m.value) })
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
const WN = rp;
function UN({
  className: e,
  hideIcon: t = !1,
  payload: r,
  verticalAlign: n = "bottom",
  nameKey: i
}) {
  const { config: a } = By();
  return r?.length ? /* @__PURE__ */ U.jsx(
    "div",
    {
      className: Dt(
        "flex items-center justify-center gap-4",
        n === "top" ? "pb-3" : "pt-3",
        e
      ),
      children: r.filter((o) => o.type !== "none").map((o, l) => {
        const u = `${i ?? o.dataKey ?? "value"}`, s = Xl(a, o, u);
        return /* @__PURE__ */ U.jsxs(
          "div",
          {
            className: Dt(
              "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
            ),
            children: [
              s?.icon && !t ? /* @__PURE__ */ U.jsx(s.icon, {}) : /* @__PURE__ */ U.jsx(
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
function Xl(e, t, r) {
  if (typeof t != "object" || t === null)
    return;
  const n = "payload" in t && typeof t.payload == "object" && t.payload !== null ? t.payload : void 0;
  let i = r;
  return r in t && typeof t[r] == "string" ? i = t[r] : n && r in n && typeof n[r] == "string" && (i = n[r]), i in e ? e[i] : e[r];
}
const KN = [
  {
    key: "value",
    label: "Значение",
    color: "var(--aiwa-accent)"
  }
];
function g2({
  data: e = [],
  series: t = KN,
  xKey: r = "label",
  ariaLabel: n = "График динамики",
  emptyText: i = "Пока недостаточно данных для графика.",
  loading: a = !1,
  showLegend: o = t.length > 1
}) {
  const l = h.useId().replaceAll(":", ""), u = t.filter((m) => m?.key && e.some((y) => y?.[m.key] != null)), s = Object.fromEntries(u.map((m) => [
    m.key,
    {
      label: m.label || m.key,
      color: m.color || "var(--aiwa-accent)"
    }
  ])), c = e.flatMap((m) => u.map((y) => Number(m?.[y.key])).filter(Number.isFinite)), f = c.length ? Math.min(...c) : 0, d = c.length ? Math.max(...c) : 1, v = d - f, p = Math.max(1, v * 0.35, Math.abs(d) * 0.04), g = [
    f >= 0 ? Math.max(0, Math.floor(f - p)) : Math.floor(f - p),
    Math.ceil(d + p)
  ];
  return a ? /* @__PURE__ */ U.jsx("div", { className: "aiwa-area-chart-state is-loading", role: "status", "aria-label": "График загружается", children: /* @__PURE__ */ U.jsx("span", { className: "aiwa-area-chart-skeleton", "aria-hidden": "true" }) }) : !e.length || !u.length ? /* @__PURE__ */ U.jsx("div", { className: "aiwa-area-chart-state", role: "status", children: i }) : /* @__PURE__ */ U.jsx(
    RN,
    {
      config: s,
      className: "h-64 w-full",
      role: "img",
      "aria-label": n,
      children: /* @__PURE__ */ U.jsxs(
        KD,
        {
          accessibilityLayer: !0,
          data: e,
          margin: { top: 20, left: 4, right: 12 },
          children: [
            /* @__PURE__ */ U.jsx("defs", { children: u.map((m, y) => /* @__PURE__ */ U.jsxs(
              "linearGradient",
              {
                id: `${l}-${m.key}`,
                x1: "0",
                y1: "0",
                x2: "0",
                y2: "1",
                children: [
                  /* @__PURE__ */ U.jsx(
                    "stop",
                    {
                      offset: "5%",
                      stopColor: `var(--color-${m.key})`,
                      stopOpacity: y === 0 ? 0.35 : 0.28
                    }
                  ),
                  /* @__PURE__ */ U.jsx(
                    "stop",
                    {
                      offset: "95%",
                      stopColor: `var(--color-${m.key})`,
                      stopOpacity: y === 0 ? 0.06 : 0.04
                    }
                  )
                ]
              },
              m.key
            )) }),
            /* @__PURE__ */ U.jsx(Zg, { vertical: !1 }),
            /* @__PURE__ */ U.jsx(
              sy,
              {
                dataKey: r,
                tickLine: !1,
                axisLine: !1,
                tickMargin: 8,
                padding: { left: 22, right: 22 },
                interval: 0
              }
            ),
            /* @__PURE__ */ U.jsx(cy, { hide: !0, domain: g }),
            /* @__PURE__ */ U.jsx(
              BN,
              {
                cursor: !1,
                content: /* @__PURE__ */ U.jsx(FN, { indicator: "line" })
              }
            ),
            o ? /* @__PURE__ */ U.jsx(WN, { content: /* @__PURE__ */ U.jsx(UN, {}) }) : null,
            u.map((m, y) => /* @__PURE__ */ U.jsx(
              ly,
              {
                dataKey: m.key,
                type: "natural",
                fill: `url(#${l}-${m.key})`,
                fillOpacity: 1,
                stroke: `var(--color-${m.key})`,
                strokeOpacity: 0.55,
                stackId: m.stacked ? "values" : void 0,
                strokeDasharray: m.dashed ? "5 5" : void 0,
                dot: {
                  r: 4,
                  fill: `var(--color-${m.key})`,
                  stroke: "var(--aiwa-surface)",
                  strokeWidth: 3
                },
                activeDot: {
                  r: 5,
                  fill: `var(--color-${m.key})`,
                  stroke: "var(--aiwa-surface)",
                  strokeWidth: 3
                },
                isAnimationActive: !0,
                animationDuration: 240,
                animationBegin: y * 30,
                children: /* @__PURE__ */ U.jsx(
                  Tn,
                  {
                    dataKey: m.key,
                    position: "top",
                    offset: 12 + y * 10,
                    fill: "var(--aiwa-ink)",
                    fontSize: 12,
                    fontWeight: 600
                  }
                )
              },
              m.key
            ))
          ]
        }
      )
    }
  );
}
export {
  g2 as AiwaWebUiChart
};
